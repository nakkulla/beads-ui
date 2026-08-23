var pp=Object.create;var No=Object.defineProperty;var fp=Object.getOwnPropertyDescriptor;var _p=Object.getOwnPropertyNames;var mp=Object.getPrototypeOf,gp=Object.prototype.hasOwnProperty;var bp=(e,t,r)=>t in e?No(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var qo=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var hp=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of _p(t))!gp.call(e,s)&&s!==r&&No(e,s,{get:()=>t[s],enumerable:!(n=fp(t,s))||n.enumerable});return e};var yp=(e,t,r)=>(r=e!=null?pp(mp(e)):{},hp(t||!e||!e.__esModule?No(r,"default",{value:e,enumerable:!0}):r,e));var ft=(e,t,r)=>bp(e,typeof t!="symbol"?t+"":t,r);var Qi=qo((zb,Xi)=>{var gn=1e3,bn=gn*60,hn=bn*60,Qr=hn*24,kp=Qr*7,$p=Qr*365.25;Xi.exports=function(e,t){t=t||{};var r=typeof e;if(r==="string"&&e.length>0)return xp(e);if(r==="number"&&isFinite(e))return t.long?Sp(e):Ap(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function xp(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var r=parseFloat(t[1]),n=(t[2]||"ms").toLowerCase();switch(n){case"years":case"year":case"yrs":case"yr":case"y":return r*$p;case"weeks":case"week":case"w":return r*kp;case"days":case"day":case"d":return r*Qr;case"hours":case"hour":case"hrs":case"hr":case"h":return r*hn;case"minutes":case"minute":case"mins":case"min":case"m":return r*bn;case"seconds":case"second":case"secs":case"sec":case"s":return r*gn;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r;default:return}}}}function Ap(e){var t=Math.abs(e);return t>=Qr?Math.round(e/Qr)+"d":t>=hn?Math.round(e/hn)+"h":t>=bn?Math.round(e/bn)+"m":t>=gn?Math.round(e/gn)+"s":e+"ms"}function Sp(e){var t=Math.abs(e);return t>=Qr?Ss(e,t,Qr,"day"):t>=hn?Ss(e,t,hn,"hour"):t>=bn?Ss(e,t,bn,"minute"):t>=gn?Ss(e,t,gn,"second"):e+" ms"}function Ss(e,t,r,n){var s=t>=r*1.5;return Math.round(e/r)+" "+n+(s?"s":"")}});var el=qo((Hb,Ji)=>{function Ep(e){r.debug=r,r.default=r,r.coerce=c,r.disable=a,r.enable=s,r.enabled=l,r.humanize=Qi(),r.destroy=u,Object.keys(e).forEach(d=>{r[d]=e[d]}),r.names=[],r.skips=[],r.formatters={};function t(d){let _=0;for(let b=0;b<d.length;b++)_=(_<<5)-_+d.charCodeAt(b),_|=0;return r.colors[Math.abs(_)%r.colors.length]}r.selectColor=t;function r(d){let _,b=null,x,A;function L(...G){if(!L.enabled)return;let ne=L,re=Number(new Date),F=re-(_||re);ne.diff=F,ne.prev=_,ne.curr=re,_=re,G[0]=r.coerce(G[0]),typeof G[0]!="string"&&G.unshift("%O");let q=0;G[0]=G[0].replace(/%([a-zA-Z%])/g,(B,m)=>{if(B==="%%")return"%";q++;let S=r.formatters[m];if(typeof S=="function"){let Z=G[q];B=S.call(ne,Z),G.splice(q,1),q--}return B}),r.formatArgs.call(ne,G),(ne.log||r.log).apply(ne,G)}return L.namespace=d,L.useColors=r.useColors(),L.color=r.selectColor(d),L.extend=n,L.destroy=r.destroy,Object.defineProperty(L,"enabled",{enumerable:!0,configurable:!1,get:()=>b!==null?b:(x!==r.namespaces&&(x=r.namespaces,A=r.enabled(d)),A),set:G=>{b=G}}),typeof r.init=="function"&&r.init(L),L}function n(d,_){let b=r(this.namespace+(typeof _>"u"?":":_)+d);return b.log=this.log,b}function s(d){r.save(d),r.namespaces=d,r.names=[],r.skips=[];let _=(typeof d=="string"?d:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let b of _)b[0]==="-"?r.skips.push(b.slice(1)):r.names.push(b)}function o(d,_){let b=0,x=0,A=-1,L=0;for(;b<d.length;)if(x<_.length&&(_[x]===d[b]||_[x]==="*"))_[x]==="*"?(A=x,L=b,x++):(b++,x++);else if(A!==-1)x=A+1,L++,b=L;else return!1;for(;x<_.length&&_[x]==="*";)x++;return x===_.length}function a(){let d=[...r.names,...r.skips.map(_=>"-"+_)].join(",");return r.enable(""),d}function l(d){for(let _ of r.skips)if(o(d,_))return!1;for(let _ of r.names)if(o(d,_))return!0;return!1}function c(d){return d instanceof Error?d.stack||d.message:d}function u(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return r.enable(r.load()),r}Ji.exports=Ep});var tl=qo((Bt,Es)=>{Bt.formatArgs=Cp;Bt.save=Rp;Bt.load=Ip;Bt.useColors=Tp;Bt.storage=Lp();Bt.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();Bt.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function Tp(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function Cp(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+Es.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let r=0,n=0;e[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(r++,s==="%c"&&(n=r))}),e.splice(n,0,t)}Bt.log=console.debug||console.log||(()=>{});function Rp(e){try{e?Bt.storage.setItem("debug",e):Bt.storage.removeItem("debug")}catch{}}function Ip(){let e;try{e=Bt.storage.getItem("debug")||Bt.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function Lp(){try{return localStorage}catch{}}Es.exports=el()(Bt);var{formatters:Op}=Es.exports;Op.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var On=globalThis,vs=On.trustedTypes,Di=vs?vs.createPolicy("lit-html",{createHTML:e=>e}):void 0,jo="$lit$",kr=`lit$${Math.random().toFixed(9).slice(2)}$`,Bo="?"+kr,vp=`<${Bo}>`,Kr=document,Mn=()=>Kr.createComment(""),Pn=e=>e===null||typeof e!="object"&&typeof e!="function",Uo=Array.isArray,Ui=e=>Uo(e)||typeof e?.[Symbol.iterator]=="function",Fo=`[ 	
\f\r]`,Ln=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ni=/-->/g,qi=/>/g,Gr=RegExp(`>|${Fo}(?:([^\\s"'>=/]+)(${Fo}*=${Fo}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Fi=/'/g,ji=/"/g,Wi=/^(?:script|style|textarea|title)$/i,Wo=e=>(t,...r)=>({_$litType$:e,strings:t,values:r}),i=Wo(1),Or=Wo(2),Nb=Wo(3),Xt=Symbol.for("lit-noChange"),kt=Symbol.for("lit-nothing"),Bi=new WeakMap,Vr=Kr.createTreeWalker(Kr,129);function zi(e,t){if(!Uo(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return Di!==void 0?Di.createHTML(t):t}var Hi=(e,t)=>{let r=e.length-1,n=[],s,o=t===2?"<svg>":t===3?"<math>":"",a=Ln;for(let l=0;l<r;l++){let c=e[l],u,d,_=-1,b=0;for(;b<c.length&&(a.lastIndex=b,d=a.exec(c),d!==null);)b=a.lastIndex,a===Ln?d[1]==="!--"?a=Ni:d[1]!==void 0?a=qi:d[2]!==void 0?(Wi.test(d[2])&&(s=RegExp("</"+d[2],"g")),a=Gr):d[3]!==void 0&&(a=Gr):a===Gr?d[0]===">"?(a=s??Ln,_=-1):d[1]===void 0?_=-2:(_=a.lastIndex-d[2].length,u=d[1],a=d[3]===void 0?Gr:d[3]==='"'?ji:Fi):a===ji||a===Fi?a=Gr:a===Ni||a===qi?a=Ln:(a=Gr,s=void 0);let x=a===Gr&&e[l+1].startsWith("/>")?" ":"";o+=a===Ln?c+vp:_>=0?(n.push(u),c.slice(0,_)+jo+c.slice(_)+kr+x):c+kr+(_===-2?l:x)}return[zi(e,o+(e[r]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),n]},Dn=class e{constructor({strings:t,_$litType$:r},n){let s;this.parts=[];let o=0,a=0,l=t.length-1,c=this.parts,[u,d]=Hi(t,r);if(this.el=e.createElement(u,n),Vr.currentNode=this.el.content,r===2||r===3){let _=this.el.content.firstChild;_.replaceWith(..._.childNodes)}for(;(s=Vr.nextNode())!==null&&c.length<l;){if(s.nodeType===1){if(s.hasAttributes())for(let _ of s.getAttributeNames())if(_.endsWith(jo)){let b=d[a++],x=s.getAttribute(_).split(kr),A=/([.?@])?(.*)/.exec(b);c.push({type:1,index:o,name:A[2],strings:x,ctor:A[1]==="."?ks:A[1]==="?"?$s:A[1]==="@"?xs:Zr}),s.removeAttribute(_)}else _.startsWith(kr)&&(c.push({type:6,index:o}),s.removeAttribute(_));if(Wi.test(s.tagName)){let _=s.textContent.split(kr),b=_.length-1;if(b>0){s.textContent=vs?vs.emptyScript:"";for(let x=0;x<b;x++)s.append(_[x],Mn()),Vr.nextNode(),c.push({type:2,index:++o});s.append(_[b],Mn())}}}else if(s.nodeType===8)if(s.data===Bo)c.push({type:2,index:o});else{let _=-1;for(;(_=s.data.indexOf(kr,_+1))!==-1;)c.push({type:7,index:o}),_+=kr.length-1}o++}}static createElement(t,r){let n=Kr.createElement("template");return n.innerHTML=t,n}};function Yr(e,t,r=e,n){if(t===Xt)return t;let s=n!==void 0?r._$Co?.[n]:r._$Cl,o=Pn(t)?void 0:t._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(e),s._$AT(e,r,n)),n!==void 0?(r._$Co??(r._$Co=[]))[n]=s:r._$Cl=s),s!==void 0&&(t=Yr(e,s._$AS(e,t.values),s,n)),t}var ws=class{constructor(t,r){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:r},parts:n}=this._$AD,s=(t?.creationScope??Kr).importNode(r,!0);Vr.currentNode=s;let o=Vr.nextNode(),a=0,l=0,c=n[0];for(;c!==void 0;){if(a===c.index){let u;c.type===2?u=new mn(o,o.nextSibling,this,t):c.type===1?u=new c.ctor(o,c.name,c.strings,this,t):c.type===6&&(u=new As(o,this,t)),this._$AV.push(u),c=n[++l]}a!==c?.index&&(o=Vr.nextNode(),a++)}return Vr.currentNode=Kr,s}p(t){let r=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(t,n,r),r+=n.strings.length-2):n._$AI(t[r])),r++}},mn=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,r,n,s){this.type=2,this._$AH=kt,this._$AN=void 0,this._$AA=t,this._$AB=r,this._$AM=n,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,r=this._$AM;return r!==void 0&&t?.nodeType===11&&(t=r.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,r=this){t=Yr(this,t,r),Pn(t)?t===kt||t==null||t===""?(this._$AH!==kt&&this._$AR(),this._$AH=kt):t!==this._$AH&&t!==Xt&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Ui(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==kt&&Pn(this._$AH)?this._$AA.nextSibling.data=t:this.T(Kr.createTextNode(t)),this._$AH=t}$(t){let{values:r,_$litType$:n}=t,s=typeof n=="number"?this._$AC(t):(n.el===void 0&&(n.el=Dn.createElement(zi(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===s)this._$AH.p(r);else{let o=new ws(s,this),a=o.u(this.options);o.p(r),this.T(a),this._$AH=o}}_$AC(t){let r=Bi.get(t.strings);return r===void 0&&Bi.set(t.strings,r=new Dn(t)),r}k(t){Uo(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,n,s=0;for(let o of t)s===r.length?r.push(n=new e(this.O(Mn()),this.O(Mn()),this,this.options)):n=r[s],n._$AI(o),s++;s<r.length&&(this._$AR(n&&n._$AB.nextSibling,s),r.length=s)}_$AR(t=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);t!==this._$AB;){let n=t.nextSibling;t.remove(),t=n}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},Zr=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,r,n,s,o){this.type=1,this._$AH=kt,this._$AN=void 0,this.element=t,this.name=r,this._$AM=s,this.options=o,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=kt}_$AI(t,r=this,n,s){let o=this.strings,a=!1;if(o===void 0)t=Yr(this,t,r,0),a=!Pn(t)||t!==this._$AH&&t!==Xt,a&&(this._$AH=t);else{let l=t,c,u;for(t=o[0],c=0;c<o.length-1;c++)u=Yr(this,l[n+c],r,c),u===Xt&&(u=this._$AH[c]),a||(a=!Pn(u)||u!==this._$AH[c]),u===kt?t=kt:t!==kt&&(t+=(u??"")+o[c+1]),this._$AH[c]=u}a&&!s&&this.j(t)}j(t){t===kt?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},ks=class extends Zr{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===kt?void 0:t}},$s=class extends Zr{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==kt)}},xs=class extends Zr{constructor(t,r,n,s,o){super(t,r,n,s,o),this.type=5}_$AI(t,r=this){if((t=Yr(this,t,r,0)??kt)===Xt)return;let n=this._$AH,s=t===kt&&n!==kt||t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive,o=t!==kt&&(n===kt||s);s&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},As=class{constructor(t,r,n){this.element=t,this.type=6,this._$AN=void 0,this._$AM=r,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(t){Yr(this,t)}},Gi={M:jo,P:kr,A:Bo,C:1,L:Hi,R:ws,D:Ui,V:Yr,I:mn,H:Zr,N:$s,U:xs,B:ks,F:As},wp=On.litHtmlPolyfillSupport;wp?.(Dn,mn),(On.litHtmlVersions??(On.litHtmlVersions=[])).push("3.3.1");var Ze=(e,t,r)=>{let n=r?.renderBefore??t,s=n._$litPart$;if(s===void 0){let o=r?.renderBefore??null;n._$litPart$=s=new mn(t.insertBefore(Mn(),o),o,void 0,r??{})}return s._$AI(e),s};var Ht="today",mr=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}];function Qt(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function Xr(e,t=Date.now()){switch(e){case"today":{let r=new Date(t);return r.setHours(0,0,0,0),r.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function Vi(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Ki(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Yi(){let e=null,t=[],r=new Set;function n(){for(let s of Array.from(r))try{s()}catch{}}return{get(){return e},getWorkspacesState(){return t},set(s,o){e=Array.isArray(s)?s:null,t=Array.isArray(o)?o:[],n()},clear(){e=null,t=[],n()},subscribe(s){return r.add(s),()=>r.delete(s)}}}function Zi(){let e=new Map,t=new Set;function r(s){return s.startsWith("session-log:")?s:`session-log:${s}`}function n(){for(let s of Array.from(t))try{s()}catch{}}return{set(s,o,a=null){e.set(r(s),{lines:Array.isArray(o)?[...o]:[],last_event_at:typeof a=="number"?a:null}),n()},append(s,o){let a=r(s),l=e.get(a)||{lines:[],last_event_at:null};l.lines=[...l.lines,o],l.last_event_at=Date.now(),e.set(a,l),n()},get(s){return e.get(r(s))||null},clear(s){typeof s=="string"?e.delete(r(s)):e.clear(),n()},subscribe(s){return t.add(s),()=>t.delete(s)}}}var rl=yp(tl(),1);function ht(e){return(0,rl.default)(`beads-ui:${e}`)}function or(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function Jr(e,t){let r=or(e.created_at),n=or(t.created_at);if(r!==n)return r<n?1:-1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,l=t.id;return a<l?-1:a>l?1:0}function ol(e,t){let r=or(e.created_at),n=or(t.created_at);if(r!==n)return r<n?-1:1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,l=t.id;return a<l?-1:a>l?1:0}function al(e,t){let r=or(e.updated_at),n=or(t.updated_at);if(r!==n)return r<n?1:-1;let s=e.id,o=t.id;return s<o?-1:s>o?1:0}function il(e,t){let r=e.priority??2,n=t.priority??2;if(r!==n)return r-n;let s=or(e.created_at),o=or(t.created_at);if(s!==o)return s<o?1:-1;let a=e.id,l=t.id;return a<l?-1:a>l?1:0}function ll(e,t){let r=e.closed_at??0,n=t.closed_at??0;if(r!==n)return r<n?1:-1;let s=e?.id,o=t?.id;return s<o?-1:s>o?1:0}var Mp=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function nl(e){let t=e&&e.metadata,r=t?t.task_order:void 0;if(r==null||r==="")return Number.POSITIVE_INFINITY;let n=Number(r);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function sl(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let r=Mp.exec(t);if(!r)return Number.POSITIVE_INFINITY;let n=Number(r[1]);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function cl(e,t){let r=nl(e),n=nl(t);if(r!==n)return r<n?-1:1;let s=sl(e),o=sl(t);if(s!==o)return s<o?-1:1;let a=or(e&&e.created_at),l=or(t&&t.created_at);if(a!==l)return a<l?-1:1;let c=e&&e.id,u=t&&t.id;return c===u?0:String(c)<String(u)?-1:1}var zo=2**20;function yn(e,t){let r=e&&e.id;return t&&typeof r=="string"&&Object.prototype.hasOwnProperty.call(t,r)&&typeof t[r]=="number"&&Number.isFinite(t[r])?t[r]:-or(e&&e.created_at)}function Ts(e){return(t,r)=>{let n=yn(t,e),s=yn(r,e);if(n!==s)return n<s?-1:1;let o=t?.id,a=r?.id;return o<a?-1:o>a?1:0}}function Ho(e,t,r){let n=Array.isArray(e)?e:[],s=n.length,o=Math.max(0,Math.min(t,s-1)),a=o-1>=0?n[o-1]:null,l=o+1<s?n[o+1]:null;if(!a&&!l)return{rank:0};if(!a)return{rank:yn(l,r)-zo};if(!l)return{rank:yn(a,r)+zo};let c=yn(a,r),u=yn(l,r),d=(c+u)/2;return c<d&&d<u?{rank:d}:{renormalize:n.map((_,b)=>({bead_id:_.id,rank:b*zo}))}}function Go(e,t={}){let r=ht(`issue-store:${e}`),n=new Map,s=[],o=0,a=new Set,l=!1,c=t.sort||Jr;function u(){for(let b of Array.from(a))try{b()}catch{}}function d(){s=Array.from(n.values()).sort(c)}function _(b){if(l||!b||b.id!==e)return;let x=Number(b.revision)||0;if(r("apply %s rev=%d",b.type,x),!(x<=o&&b.type!=="snapshot")){if(b.type==="snapshot"){if(x<=o)return;n.clear();let A=Array.isArray(b.issues)?b.issues:[];for(let L of A)L&&typeof L.id=="string"&&L.id.length>0&&n.set(L.id,L);d(),o=x,u();return}if(b.type==="upsert"){let A=b.issue;if(A&&typeof A.id=="string"&&A.id.length>0){let L=n.get(A.id);if(!L)n.set(A.id,A);else{let G=Number.isFinite(L.updated_at)?L.updated_at:0,ne=Number.isFinite(A.updated_at)?A.updated_at:0;if(G<=ne){for(let re of Object.keys(L))re in A||delete L[re];for(let[re,F]of Object.entries(A))L[re]=F}}d()}o=x,u()}else if(b.type==="delete"){let A=String(b.issue_id||"");A&&(n.delete(A),d()),o=x,u()}}}return{id:e,subscribe(b){return a.add(b),()=>{a.delete(b)}},applyPush:_,snapshot(){return s},size(){return n.size},getById(b){return n.get(b)},dispose(){l=!0,n.clear(),s=[],a.clear(),o=0}}}function Cs(e){let t=String(e.type||"").trim(),r={};if(e.params&&typeof e.params=="object"){let s=Object.keys(e.params).sort();for(let o of s){let a=e.params[o];r[o]=String(a)}}let n=new URLSearchParams(r).toString();return n.length>0?`${t}?${n}`:t}function ul(e){let t=ht("subs"),r=new Map,n=new Map;function s(l,c){t("applyDelta %s +%d ~%d -%d",l,(c.added||[]).length,(c.updated||[]).length,(c.removed||[]).length);let u=n.get(l);if(!u||u.size===0)return;let d=Array.isArray(c.added)?c.added:[],_=Array.isArray(c.updated)?c.updated:[],b=Array.isArray(c.removed)?c.removed:[];for(let x of Array.from(u)){let A=r.get(x);if(!A)continue;let L=A.itemsById;for(let G of d)typeof G=="string"&&G.length>0&&L.set(G,!0);for(let G of _)typeof G=="string"&&G.length>0&&L.set(G,!0);for(let G of b)typeof G=="string"&&G.length>0&&L.delete(G)}}async function o(l,c){let u=Cs(c);if(t("subscribe %s key=%s",l,u),!r.has(l))r.set(l,{key:u,itemsById:new Map});else{let _=r.get(l);if(_&&_.key!==u){let b=n.get(_.key);b&&(b.delete(l),b.size===0&&n.delete(_.key)),r.set(l,{key:u,itemsById:new Map})}}n.has(u)||n.set(u,new Set);let d=n.get(u);d&&d.add(l);try{await e("subscribe-list",{id:l,type:c.type,params:c.params})}catch(_){let b=r.get(l)||null;if(b){let x=n.get(b.key);x&&(x.delete(l),x.size===0&&n.delete(b.key))}throw r.delete(l),_}return async()=>{t("unsubscribe %s key=%s",l,u);try{await e("unsubscribe-list",{id:l})}catch{}let _=r.get(l)||null;if(_){let b=n.get(_.key);b&&(b.delete(l),b.size===0&&n.delete(_.key))}r.delete(l)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:Cs,selectors:{getIds(l){let c=r.get(l);return c?Array.from(c.itemsById.keys()):[]},has(l,c){let u=r.get(l);return u?u.itemsById.has(c):!1},count(l){let c=r.get(l);return c?c.itemsById.size:0},getItemsById(l){let c=r.get(l),u={};if(!c)return u;for(let d of c.itemsById.keys())u[d]=!0;return u}}}}function dl(){let e=ht("issue-stores"),t=new Map,r=new Map,n=new Set,s=new Map;function o(){for(let c of Array.from(n))try{c()}catch{}}function a(c,u,d){let _=u?Cs(u):"",b=r.get(c)||"",x=t.has(c);if(e("register %s key=%s (prev=%s)",c,_,b),x&&b&&_&&b!==_){let A=t.get(c);if(A)try{A.dispose()}catch{}let L=s.get(c);if(L){try{L()}catch{}s.delete(c)}let G=Go(c,d);t.set(c,G);let ne=G.subscribe(()=>o());s.set(c,ne)}else if(!x){let A=Go(c,d);t.set(c,A);let L=A.subscribe(()=>o());s.set(c,L)}return r.set(c,_),()=>l(c)}function l(c){e("unregister %s",c),r.delete(c);let u=t.get(c);u&&(u.dispose(),t.delete(c));let d=s.get(c);if(d){try{d()}catch{}s.delete(c)}}return{register:a,unregister:l,getStore(c){return t.get(c)||null},snapshotFor(c){let u=t.get(c);return u?u.snapshot().slice():[]},subscribe(c){return n.add(c),()=>n.delete(c)}}}function pl(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function fl(){let e=null,t=!1,r=new Set;function n(){for(let s of Array.from(r))try{s()}catch{}}return{get(){return e},set(s){e=s,n()},isPending(){return t},setPending(s){let o=s===!0;o!==t&&(t=o,n())},clear(){e=null,t=!1,n()},subscribe(s){return r.add(s),()=>r.delete(s)}}}function _l(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Vo(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function Pp(e){let t=String(e||""),r=t.startsWith("#")?t.slice(1):t,n=r.indexOf("?"),s=n>=0?r.slice(n+1):"";if(s){let l=new URLSearchParams(s).get("issue");if(l)return decodeURIComponent(l)}let o=/^\/issue\/([^\s?#]+)/.exec(r);return o&&o[1]?decodeURIComponent(o[1]):null}function Dp(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function ml(e){let t=ht("router"),r=()=>{let n=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(n),o=s&&s[1]?decodeURIComponent(s[1]):Pp(n),a=Dp(n);if(t("hash change \u2192 view=%s id=%s",a,o),e.setState({selected_id:a==="worker"?null:o,view:a,worker:{selected_parent_id:a==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(n)){let c=o?`#/${a}?issue=${encodeURIComponent(o)}`:`#/${a}`;window.location.hash!==c&&(window.location.hash=c)}};return{start(){window.addEventListener("hashchange",r),r()},stop(){window.removeEventListener("hashchange",r)},gotoIssue(n){let s=e.getState?e.getState():{view:"board"},o=s.view==="worker"||s.view==="monitor"?s.view:"board",a=Vo(o,n);t("goto issue %s (view=%s)",n,o),window.location.hash!==a?window.location.hash=a:e.setState({selected_id:o==="worker"?null:n,view:o,worker:{selected_parent_id:o==="worker"?n:null}})},gotoView(n){let s=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},o=n==="worker"?s.worker?.selected_parent_id:s.selected_id,a=o?Vo(n,o):`#/${n}`;t("goto view %s (id=%s)",n,o||""),window.location.hash!==a?window.location.hash=a:e.setState({view:n,selected_id:n==="worker"?null:s.selected_id})}}}var Np=Object.freeze({workspace_config:{default_workspace:null}});function gl(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:Np.workspace_config.default_workspace}}}function bl(e={}){let t=ht("state"),r={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:gl(e.config)},n=new Set;function s(){for(let o of Array.from(n))try{o(r)}catch{}}return{getState(){return r},setState(o){let a={...r,...o,filters:{...r.filters,...o.filters||{}},board:{...r.board,...o.board||{}},worker:{...r.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:r.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:r.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:r.workspace.hidden},config:o.config!==void 0?gl(o.config):r.config},l=a.workspace.current?.path!==r.workspace.current?.path||a.workspace.available.length!==r.workspace.available.length||a.workspace.hidden.length!==r.workspace.hidden.length||a.workspace.hidden.some((u,d)=>u!==r.workspace.hidden[d]),c=a.config.workspace_config.default_workspace!==r.config.workspace_config.default_workspace;a.selected_id===r.selected_id&&a.view===r.view&&a.filters.status===r.filters.status&&a.filters.search===r.filters.search&&a.filters.type===r.filters.type&&a.board.closed_filter===r.board.closed_filter&&a.worker.selected_parent_id===r.worker.selected_parent_id&&a.worker.show_closed_children.length===r.worker.show_closed_children.length&&a.worker.show_closed_children.every((u,d)=>u===r.worker.show_closed_children[d])&&!l&&!c||(r=a,t("state change %o",{selected_id:r.selected_id,view:r.view,filters:r.filters,board:r.board,worker:r.worker,workspace:r.workspace.current?.path,config:{default_workspace:r.config.workspace_config.default_workspace}}),s())},subscribe(o){return n.add(o),()=>n.delete(o)}}}function hl(e){let t=ht("activity"),r=0,n=new Map,s=1;function o(){if(!e)return;let u=r>0;e.toggleAttribute("hidden",!u),e.setAttribute("aria-busy",u?"true":"false")}function a(){r+=1,t("start count=%d",r),o()}function l(){let u=r;r=Math.max(0,r-1),u<=0?t("done called but count was already %d",u):t("done count=%d\u2192%d",u,r),o()}function c(u){return async(_,b)=>{let x=s++,A=Date.now();n.set(x,{type:_,start_ts:A}),t("request start id=%d type=%s count=%d",x,_,r+1),a();let L=!1,G=()=>{L||(L=!0,n.delete(x),l())},ne=setTimeout(()=>{L||(t("request TIMEOUT id=%d type=%s elapsed=%dms",x,_,Date.now()-A),G())},3e4);try{let re=await u(_,b),F=Date.now()-A;return t("request done id=%d type=%s elapsed=%dms",x,_,F),re}catch(re){let F=Date.now()-A;throw t("request error id=%d type=%s elapsed=%dms err=%o",x,_,F,re),re}finally{clearTimeout(ne),G()}}}return o(),{wrapSend:c,start:a,done:l,getCount:()=>r,getActiveRequests:()=>{let u=Date.now();return Array.from(n.entries()).map(([d,_])=>({id:d,type:_.type,elapsed_ms:u-_.start_ts}))}}}function ce(e,t="info",r=2800){let n=document.createElement("div");n.className="toast",n.textContent=e,n.style.position="fixed",n.style.right="12px",n.style.bottom="12px",n.style.zIndex="1000",n.style.color="#fff",n.style.padding="8px 10px",n.style.borderRadius="4px",n.style.fontSize="12px",t==="success"?n.style.background="#156d36":t==="warning"?n.style.background="#a36a00":t==="error"?n.style.background="#9f2011":n.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(n),setTimeout(()=>{try{n.remove()}catch{}},r)}function Rs(e=void 0,t=void 0){function r(){if(!t||typeof t.get!="function")return null;let o=t.get();return o&&o.order?o.order:{}}function n(o,a,l){let c=e&&e.snapshotFor?e.snapshotFor(o).slice():[];if(a==="closed")return c.sort(ll),c;switch(l){case"created_desc":return c.sort(Jr),c;case"created_asc":return c.sort(ol),c;case"updated_desc":return c.sort(al),c;case"priority":return c.sort(il),c;case"manual":default:{let u=r();return u?c.sort(Ts(u)):c.sort(Jr),c}}}function s(o){let a=[];return e&&typeof e.subscribe=="function"&&a.push(e.subscribe(o)),t&&typeof t.subscribe=="function"&&a.push(t.subscribe(o)),()=>{for(let l of a)try{l()}catch{}}}return{selectBoardColumn:n,subscribe:s}}function en(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function It(e){let t=en(e);if(t===null)return"";let r=new Date(t),n=s=>String(s).padStart(2,"0");return`${r.getFullYear()}-${n(r.getMonth()+1)}-${n(r.getDate())} ${n(r.getHours())}:${n(r.getMinutes())}`}function Gt(e,t){let r=en(e);if(r===null)return"";let s=(typeof t=="number"?t:Date.now())-r;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let a=Math.floor(s/36e5);if(a<24)return`${a}\uC2DC\uAC04 \uC804`;let l=Math.floor(s/864e5);if(l<7)return`${l}\uC77C \uC804`;let c=Math.floor(l/7);if(l<30)return`${c}\uC8FC \uC804`;let u=Math.floor(l/30);return u<12?`${u}\uAC1C\uC6D4 \uC804`:`${Math.floor(l/365)}\uB144 \uC804`}function yl(e){if(!Array.isArray(e))return null;let t=null,r=-1;for(let n of e){if(!n||n.status!=="in_progress")continue;let s=en(n.updated_at)??0;if(t===null||s>r){t=n,r=s;continue}s===r&&String(n.id)<String(t.id)&&(t=n)}return t}function Is(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function Ls(e){let t=new Map;for(let n of e)n&&n.id&&!t.has(n.id)&&t.set(n.id,n);let r=new Map;for(let n of t.values()){let s=Is(n);if(!s)continue;let o=r.get(s);o||(o=[],r.set(s,o)),o.push({id:n.id,title:n.title,status:n.status,metadata:n.metadata,workflow:n.workflow,created_at:n.created_at,updated_at:n.updated_at})}return r}function Os(e,t){let r=e.get(t)||[],n=0;for(let o of r)(o.status==="resolved"||o.status==="closed")&&(n+=1);let s=yl(r);return{total:r.length,count:n,current:s,children:r}}function Ms(e){let t=e.transport,r=e.uiOrderStore;function n(a,l){return"renormalize"in a?a.renormalize:[{bead_id:l,rank:a.rank}]}function s(a,l){let c={...a.order};for(let u of l)c[u.bead_id]=u.rank;r&&r.set({revision:a.revision,order:c})}async function o(a,l,c){if(!t||!r)return;let u=r.get()||{revision:0,order:{}},d=n(Ho(l,c,u.order),a);s(u,d);let _=await t("ui-order-set",{expected_revision:u.revision,entries:d});if(_&&_.conflict){let b={revision:typeof _.revision=="number"?_.revision:0,order:_.order||{}};r.set(b);let x=n(Ho(l,c,b.order),a);s(b,x);let A=await t("ui-order-set",{expected_revision:b.revision,entries:x});A&&A.applied&&r.set({revision:typeof A.revision=="number"?A.revision:0,order:A.order||{}})}else _&&_.applied&&r.set({revision:typeof _.revision=="number"?_.revision:0,order:_.order||{}})}return{applyReorder:o}}function Ps(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Ko(e,t){return!t||typeof e!="string"||e.length===0||Ps(t.visible_labels).includes(e)?!0:Ps(t.hidden_labels).includes(e)?!1:!Ps(t.hidden_prefixes).some(r=>r.length>0&&e.startsWith(r))}function Ds(e,t){return Ps(e).filter(r=>Ko(r,t))}function Mr(e,t){let r=e&&e.chips?e.chips[t]:void 0;return typeof r=="boolean"?r:!0}function qp(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function Fp(e,t,r,n,s){return i`<button
    type="button"
    class="board-card__roll-toggle"
    data-roll-parent=${e}
    aria-expanded=${n?"true":"false"}
    @click=${s}
  >
    children ${t}/${r} ${n?"\u25B4":"\u25BE"}
  </button>`}function jp(e,t,r,n){return i`<button
    type="button"
    class="board-card__roll-child"
    data-child-id=${e.id}
    @click=${n?s=>n(s,e.id):void 0}
  >
    <span class=${qp(e.status)}>●</span>
    <span class="board-card__roll-child-ord">${t}</span>
    <span class="board-card__roll-child-title">${e.title||e.id}</span>
    ${r}
  </button>`}function Ns(e,t){let r=e.total||0,n=!!t.expanded,s=t.trailing??"",o=typeof t.empty_label=="string"&&t.empty_label.length>0?t.empty_label:null;if(r===0&&o===null)return"";let a=Array.isArray(e.children)?e.children:[],l=r>0?a.slice().sort(cl):a;return i`
    <div class="board-card__roll">
      <div class="board-card__roll-meta">
        ${r>0?Fp(t.parent_id,e.count,r,n,t.onToggle):i`<span class="board-card__roll-none">${o}</span>`}
        ${s}
      </div>
      ${r>0&&e.current?i`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${e.current.title||e.current.id}</span
            >
          </div>`:""}
      ${n&&r>0?i`<div class="board-card__roll-list">
            ${l.map((c,u)=>jp(c,u+1,t.childChips?t.childChips(c):null,t.onChildClick))}
          </div>`:""}
    </div>
  `}var Bp={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},wl={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},vl={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},Up={review:"\u2713",skip:"\u2298"},Pr={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function Wp(e,t,r){if(!(r==="in_progress"||r==="resolved"))return null;for(let s of e){let o=t[s];if(o&&o.fill==="dim"&&o.stale!==!0)return s}return null}function kl(e){let t=e&&e.fill||"none";return t==="none"?Pr.none:e&&e.stale===!0?Pr.stale:t==="dim"?Pr.dim:e&&e.glyph==="review"?Pr.review:e&&e.glyph==="skip"?Pr.skip:Pr.done}function zp(e){if(!e||e.fill==="none"||!e.approval_state)return kl(e);let t=[];return e.glyph==="review"?t.push(Pr.review):e.glyph==="skip"&&t.push(Pr.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function Hp(e,t,r){let n=Bp[e]||e,s=t&&t.fill||"none",o=!!t&&t.stale===!0,a=Up[t&&t.glyph||""]||"",l="bar";s==="dim"?l+=` b-${n} dim`:s==="full"&&(l+=` b-${n} full`),o&&(l+=" stale"),r&&(l+=" cur");let c=s==="none"?"lbl":`lbl l-${n} on`,u=r?`color: var(--stage-${n}-on)`:"";return i`
    <div class="seg">
      <div class=${l} style=${u}>${a}</div>
      <div class=${c}>
        ${wl[e]||e}
      </div>
    </div>
  `}function qs(e,t){if(!e||!e.stages)return"";let r=vl[e.route]||vl.spec_backed,n=e.stages,s=Wp(r,n,String(t||"open")),o=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${r.map(a=>`${wl[a]||a} ${a==="plan"?zp(n[a]||{}):kl(n[a]||{})}`).join(" \xB7 ")}`;return i`
    <div class="stp" role="img" aria-label=${o}>
      ${r.map(a=>Hp(a,n[a]||{},a===s))}
    </div>
  `}function Gp(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var $l=2;function Vp(e){if(!e)return[];let t=[];if(e.external){let n=e.reason?`\u23F8 blocked: ${e.reason}`:"\u23F8 blocked";t.push(i`<span class="ctl-chip ctl-chip--blocked">${n}</span>`)}let r=Array.isArray(e.blockers)?e.blockers:[];if(r.length>0){let n=r.slice(0,$l).join(", "),s=r.length-$l,o=`\u26D3 blocked: ${n}${s>0?` +${s}`:""}`;t.push(i`<span class="ctl-chip ctl-chip--blocked-dep">${o}</span>`)}return t}function Yo(e){return e==="delegated"?"\uC704\uC784":e==="main"?"\uBA54\uC778":null}function xl(e){return e.effort?`${e.actor}:${e.effort}`:e.actor}function tn(e){return`${e.kind}:${xl(e)}@${e.sha}`}function Fs(e,t){if(!e)return null;let r=Yo(e.kind),n=e.reason,s=e.kind==="delegated"?n===null:typeof n=="string"&&n.trim().length>0&&!/[\r\n]/.test(n);if(!r||!s)return null;let o=Yo(t?.kind),a=o!==null&&t?.kind!==e.kind,l=`\uACC4\uD68D \xB7 ${r}${a?` \u2192 ${o}`:""}`,c=`planned_execution ${e.kind}${typeof n=="string"?`:${n}`:""}`,u=t?` \xB7 exec_receipt ${tn(t)}`:"";return{kind:e.kind,label:l,title:`${c}${u}`}}function Al(e,t){let r=Fs(e,t);return r?i`<span
        class="ctl-chip ctl-chip--planned"
        data-kind=${r.kind}
        title=${r.title}
        >${r.label}</span
      >`:null}function Kp(e){if(!e)return null;let t=Yo(e.kind);return t?i`<span
    class="ctl-chip ctl-chip--exec-receipt"
    title=${`exec_receipt ${tn(e)}`}
    >${`\uC2E4\uD589 \xB7 ${t}`}</span
  >`:null}function Yp(e,t){let r=t.policy||null,n=e.workflow&&e.workflow.chips||{},s=[];if(n.route&&Mr(r,"route")){let l=n.route_source==="derived";s.push(i`<span
        class="ctl-chip ctl-chip--route${l?" is-derived":""}"
        title=${l?"route \uBBF8\uD540 (metadata unset)":"route"}
        >${l?"unset":n.route}</span
      >`)}if(n.fast_track&&Mr(r,"fast_track")&&s.push(i`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),n.pr&&Mr(r,"pr")){let l=n.pr.number;s.push(i`<span class="ctl-chip ctl-chip--pr"
        >${`PR${l!=null?` #${l}`:""}`}</span
      >`)}let o=Al(n.planned_execution,n.exec_receipt);if(o&&s.push(o),n.exec_receipt){let l=n.exec_receipt;s.push(i`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${tn(l)}`}
        >${`exec ${l.kind==="delegated"?xl(l):`main:${l.actor}`} \xB7 ${l.sha.slice(0,7)}`}</span
      >`)}if(n.impl_entry){let l=n.impl_entry;s.push(i`<span
        class="ctl-chip ctl-chip--impl-entry"
        title=${`impl_entry ${l.actor}@${l.sha}`}
        >${`impl ${l.actor} \xB7 ${l.sha.slice(0,7)}`}</span
      >`)}for(let l of Ds(e.labels,r))s.push(i`<span class="ctl-chip ctl-chip--label">${l}</span>`);return e.from_id&&Mr(r,"from")&&s.push(i`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${l=>{l.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(l,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),Mr(r,"blocked")&&s.push(...Vp(e.blocked_info)),t.cleanupFailureFor&&t.cleanupFailureFor(e.id)&&Mr(r,"blocked")&&s.push(i`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 멈춤</span>`),s.length===0?"":i`<div class="board-card__chips">${s}</div>`}function Zp(e){let t=Gt(e.created_at),r=Gt(e.updated_at);return!t&&!r?"":i`<span class="board-card__times">
    ${t?i`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${It(e.created_at)}`}
          >생성 ${t}</span
        >`:""}
    ${t&&r?i`<span class="board-card__time-sep">·</span>`:""}
    ${r?i`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${It(e.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </span>`}function Xp(e,t){let r=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]};return Ns(r,{parent_id:e.id,expanded:t.isExpanded?t.isExpanded(e.id):!0,trailing:Zp(e),empty_label:"children \uC5C6\uC74C",childChips:Zo,onToggle:n=>t.onRollupToggle&&t.onRollupToggle(n,e.id),onChildClick:(n,s)=>t.onChildClick&&t.onChildClick(n,s)})}function Zo(e){let t=e?.workflow?.chips?.planned_execution,r=e?.workflow?.chips?.exec_receipt;return Fs(t,r)?i`<span class="board-card__roll-child-chips">
    ${Al(t,r)}
    ${Kp(r)}
  </span>`:null}function js(e,t){let r=Gp(e.priority);return i`
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
      ${Yp(e,t)}
      ${e.workflow&&Mr(t.policy||null,"stepper")?qs(e.workflow,e.status):""}
      ${Xp(e,t)}
    </article>
  `}function vn(e,t){let r=Array.isArray(e.items)?e.items.length:0,n=e.is_closed===!0;return i`
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
              ${mr.map(o=>i`<option
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
        ${e.items.map(o=>js(o,t))}
      </div>
    </section>
  `}function Sl(e,t,r){return i`
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
          ${e.items.length===0?i`<div class="deferred-popup__empty">Deferred 이슈 없음</div>`:e.items.map(n=>js(n,t))}
        </div>
      </div>
    </dialog>
  `}var Qp=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],Jp=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],ef=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function tf(e,t,r){let n=e.labels.length,s=n>0?`\uB77C\uBCA8 ${n}`:"\uB77C\uBCA8";return i`
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
  `}function El(e,t,r){return i`
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
        ${Qp.map(n=>i`<option
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
        ${Jp.map(n=>i`<option
              value=${n.value}
              ?selected=${e.type===n.value}
            >
              ${n.label}
            </option>`)}
      </select>
      ${tf(e,t,r)}
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
        ${ef.map(n=>i`<option
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
  `}var rf=200,nf={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},sf=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),Tl="beads-ui.board.sort",Cl=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function of(){try{let e=window.localStorage.getItem(Tl);if(e&&Cl.has(e))return e}catch{}return"created_desc"}function Rl(e,t){let r=ht("views:board"),n=t.gotoIssue,s=t.issueStores,o=t.transport,a=t.uiOrderStore,l=t.displayPolicyStore,c=t.workerQueueStore,u=t.onClosedRangeChange,d=t.onNewIssue,_=t.closedRange||Ht,b=s?Rs(s,a):null,x=Ms({transport:o,uiOrderStore:a}),A=[],L=[],G=[],ne=[],re=[],F=[],q=!1,I=0,B=of(),m=new Map,S=new Map,Z=new Map,ie=new Set,D={search:"",priority:"",type:"",labels:[]},U=!1,_e=null;function we(z){return String(z.status||"open")==="open"}function ke(z){let ee=String(z.status||"open");return ee==="open"||ee==="blocked"}function xe(z){let ee=D.search.trim().toLowerCase(),ge=D.priority,k=D.type,E=D.labels;return z.filter(O=>{if(ee){let J=String(O.id||"").toLowerCase(),Ee=String(O.title||"").toLowerCase();if(!J.includes(ee)&&!Ee.includes(ee))return!1}if(ge!==""&&String(O.priority)!==ge||k!==""&&String(O.issue_type||"")!==k)return!1;if(E.length>0){let J=Array.isArray(O.labels)?O.labels:[];if(!E.some(Ee=>J.includes(Ee)))return!1}return!0})}function We(){let z=new Set;for(let ee of[A,L,G,ne,re,F])for(let ge of ee){let k=Array.isArray(ge.labels)?ge.labels:[];for(let E of k)typeof E=="string"&&E.length>0&&z.add(E)}return Array.from(z).sort()}function rt(){return D.search.trim()!==""||D.priority!==""||D.type!==""||D.labels.length>0}function Ne(){try{if(b){let z=b.selectBoardColumn("tab:board:in-progress","in_progress",B),ee=b.selectBoardColumn("tab:board:blocked","blocked",B).filter(ke),ge=new Set(z.map(De=>De.id)),k=b.selectBoardColumn("tab:board:ready","ready",B).filter(De=>we(De)&&!ge.has(De.id)),E=b.selectBoardColumn("tab:board:resolved","resolved",B),O=b.selectBoardColumn("tab:board:deferred","deferred",B),J=b.selectBoardColumn("tab:board:closed","closed").slice(0,rf),Ee=[...ee,...k,...z,...E,...J];He(Ee);let be=new Set;for(let De of Ee)De&&De.id&&!Is(De)&&be.add(De.id);let Te=!rt();A=Te?Nn(ee,be):ee,L=Te?Nn(k,be):k,G=Te?Nn(z,be):z,ne=Te?Nn(E,be):E,re=O,I=O.length,F=Te?Nn(J,be):J,m=new Map;for(let De of A)m.set(De.id,"open");for(let De of L)m.set(De.id,"open");for(let De of G)m.set(De.id,"in_progress");for(let De of ne)m.set(De.id,"resolved");for(let De of re)m.set(De.id,"deferred");for(let De of F)m.set(De.id,"closed");S=new Map;for(let De of A)S.set(De.id,"blocked-col");for(let De of L)S.set(De.id,"ready-col");for(let De of G)S.set(De.id,"in-progress-col");for(let De of ne)S.set(De.id,"resolved-col");for(let De of F)S.set(De.id,"closed-col")}V()}catch{A=[],L=[],G=[],ne=[],re=[],F=[],Z=new Map,V()}}function He(z){Z=Ls(z)}function ue(z){return Os(Z,z)}function Fe(z){return!ie.has(z)}function Le(z,ee){z.preventDefault(),z.stopPropagation(),ie.has(ee)?ie.delete(ee):ie.add(ee),V()}function Ge(z,ee){z.preventDefault(),z.stopPropagation(),n(ee)}function Ie(z,ee){z.preventDefault(),z.stopPropagation(),n(ee)}function Ve(z,ee){_e||n(ee)}function st(z,ee){z.preventDefault(),z.stopPropagation(),af(ee).then(ge=>{ge&&ce("\uBCF5\uC0AC\uB428","success",1200)})}function Ce(z,ee){_e=ee,z.dataTransfer&&(z.dataTransfer.setData("text/plain",ee),z.dataTransfer.effectAllowed="move"),z.target.classList.add("board-card--dragging")}function Xe(z){z.target.classList.remove("board-card--dragging"),fe(),setTimeout(()=>{_e=null},0)}function K(z){let ee=String(z.target.value||"");!ee||ee===_||(_=ee,u&&u(ee),V())}function X(){return l?l.get():null}function $e(z){let ee=c?c.get():null,ge=ee?ee.cleanup_failed:null;if(!ge||typeof ge!="object"||Array.isArray(ge))return null;let k=ge[z];return!k||typeof k!="object"||Array.isArray(k)?null:k}let Oe={onCardClick:Ve,onCopyId:st,onDragStart:Ce,onDragEnd:Xe,onClosedRangeChange:K,rollupFor:ue,isExpanded:Fe,onRollupToggle:Le,onChildClick:Ge,onFromChipClick:Ie,cleanupFailureFor:$e,get policy(){return X()}};function je(z,ee){_e||(ve(),n(ee))}function ze(z,ee){z.preventDefault(),z.stopPropagation(),ve(),n(ee)}let Ue={...Oe,onCardClick:je,onChildClick:ze,onFromChipClick:ze,get policy(){return X()}};function lt(z){let ee=z.target,ge=e.querySelector(".board-filter__labels");ee&&ge&&ge.contains(ee)||Y()}function ut(z){z.key==="Escape"&&Y()}function W(){U||(U=!0,document.addEventListener("mousedown",lt),document.addEventListener("keydown",ut),V())}function Y(){U&&(U=!1,document.removeEventListener("mousedown",lt),document.removeEventListener("keydown",ut),V())}function ye(z){z.key==="Escape"&&ve()}function nt(){q||(q=!0,document.addEventListener("keydown",ye),V())}function ve(){q&&(q=!1,document.removeEventListener("keydown",ye),V())}let T={onClose:ve,onOverlayClick(z){z.target===z.currentTarget&&ve()}},M={onSearchInput(z){D.search=String(z.target.value||""),Ne()},onPriorityChange(z){D.priority=String(z.target.value||""),Ne()},onTypeChange(z){D.type=String(z.target.value||""),Ne()},onSortChange(z){let ee=String(z.target.value||"");if(!(!Cl.has(ee)||ee===B)){B=ee;try{window.localStorage.setItem(Tl,ee)}catch{}Ne()}},onDeferredToggle(){q?ve():nt()},onLabelMenuToggle(){U?Y():W()},onLabelToggle(z){let ee=D.labels.indexOf(z);ee===-1?D.labels.push(z):D.labels.splice(ee,1),Ne()},onLabelClear(){D.labels.length!==0&&(D.labels=[],Ne())},onNewIssue(){d&&d()}};function P(){return i`
      <div class="board-view">
        ${El(D,M,{sort_mode:B,deferred_popup_open:q,deferred_count:I,label_options:We(),label_menu_open:U})}
        <div class="board-root">
          ${vn({title:"Blocked",id:"blocked-col",items:xe(A)},Oe)}
          ${vn({title:"Ready",id:"ready-col",items:xe(L)},Oe)}
          ${vn({title:"In progress",id:"in-progress-col",items:xe(G)},Oe)}
          ${vn({title:"Resolved",id:"resolved-col",items:xe(ne)},Oe)}
          ${vn({title:"Closed",id:"closed-col",items:xe(F),is_closed:!0,closed_range:_},Oe)}
        </div>
        ${q?Sl({items:xe(re),count:I},Ue,T):""}
      </div>
    `}function V(){Ze(P(),e),oe()}function oe(){try{let z=e.querySelector("#deferred-popup");z&&!z.open&&(typeof z.showModal=="function"?z.showModal():z.setAttribute("open",""));let ee=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let ge of ee)Array.from(ge.querySelectorAll(".board-card")).forEach((E,O)=>{E.tabIndex=O===0?0:-1})}catch{}}async function y(z,ee){if(!o){ce("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:z,status:ee}),ce("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(ge){r("update-status failed: %o",ge),ce("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function R(z){switch(z){case"blocked-col":return A;case"ready-col":return L;case"in-progress-col":return G;case"resolved-col":return ne;default:return[]}}function N(z,ee,ge){if(!o||!a)return;let k=R(z),E=k.find(Te=>Te.id===ee);if(!E)return;let O=k.filter(Te=>Te.id!==ee),J=ge.closest?ge.closest(".board-card"):null,Ee=O.length;if(J){let Te=J.getAttribute("data-issue-id");if(Te===ee)return;let De=O.findIndex(Et=>Et.id===Te);De>=0&&(Ee=De)}let be=O.slice();be.splice(Ee,0,E),x.applyReorder(ee,be,Ee)}function fe(){for(let z of Array.from(e.querySelectorAll(".board-column--drag-over")))z.classList.remove("board-column--drag-over")}let de=null;e.addEventListener("dragover",z=>{z.preventDefault(),z.dataTransfer&&(z.dataTransfer.dropEffect="move");let ge=z.target.closest(".board-column");ge&&ge!==de&&(de&&de.classList.remove("board-column--drag-over"),ge.classList.add("board-column--drag-over"),de=ge)}),e.addEventListener("dragleave",z=>{let ee=z.relatedTarget;(!ee||!e.contains(ee))&&de&&(de.classList.remove("board-column--drag-over"),de=null)}),e.addEventListener("drop",z=>{z.preventDefault(),de&&(de.classList.remove("board-column--drag-over"),de=null);let ee=z.target,ge=ee.closest(".board-column");if(!ge)return;let k=z.dataTransfer?.getData("text/plain")||"";if(!k)return;let E=ge.id,O=S.get(k);if(O&&O===E){if(sf.has(E)){if(B!=="manual"){ce("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}N(E,k,ee)}return}let J=nf[E];if(!J){ce("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}m.get(k)!==J&&y(k,J)}),e.addEventListener("keydown",z=>{let ee=z.target;if(!(ee instanceof HTMLElement))return;let ge=String(ee.tagName||"").toLowerCase();if(ge==="input"||ge==="textarea"||ge==="select"||ge==="button"||ge==="a"||ee.isContentEditable===!0)return;let k=ee.closest(".board-card");if(!k)return;let E=String(z.key||"");if(E==="Enter"||E===" "){z.preventDefault();let be=k.getAttribute("data-issue-id");be&&n(be);return}if(E!=="ArrowUp"&&E!=="ArrowDown"&&E!=="ArrowLeft"&&E!=="ArrowRight")return;z.preventDefault();let O=k.closest(".board-column");if(!O)return;let J=Array.from(O.querySelectorAll(".board-card")),Ee=J.indexOf(k);if(E==="ArrowDown"&&Ee<J.length-1){Se(k,J[Ee+1]);return}if(E==="ArrowUp"&&Ee>0){Se(k,J[Ee-1]);return}if(E==="ArrowLeft"||E==="ArrowRight"){let be=Array.from(e.querySelectorAll(".board-column")),Te=be.indexOf(O),De=E==="ArrowRight"?1:-1,Et=Te+De;for(;Et>=0&&Et<be.length;){let bt=be[Et].querySelector(".board-card");if(bt){Se(k,bt);return}Et+=De}}});function Se(z,ee){try{z.tabIndex=-1,ee.tabIndex=0,ee.focus()}catch{}}let Pe=null;b&&b.subscribe&&(Pe=b.subscribe(()=>{try{Ne()}catch{}}));let Ke=null;l&&l.subscribe&&(Ke=l.subscribe(()=>{try{Ne()}catch{}}));let Ye=null;return c&&c.subscribe&&(Ye=c.subscribe(()=>{V()})),{async load(){r("load"),Ne()},clear(){Y(),ve(),Pe&&(Pe(),Pe=null),Ke&&(Ke(),Ke=null),Ye&&(Ye(),Ye=null),e.replaceChildren(),A=[],L=[],G=[],ne=[],re=[],F=[],m=new Map,S=new Map}}}function Nn(e,t){return e.filter(r=>{let n=Is(r);return!(n&&t.has(n))})}async function af(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let r=!1;try{r=document.execCommand("copy")}finally{t.remove()}return r}catch{return!1}}async function ar(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let r=document.createElement("textarea");r.value=t,r.style.position="fixed",r.style.left="-9999px",document.body.appendChild(r),r.select();let n=!1;try{n=document.execCommand("copy")}finally{r.remove()}return n}catch{return!1}}function gr(e){return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,e.speed==="fast"?"Fast":null].filter(Boolean).join(" \xB7 ")}function Dr(e){return typeof e.resumed_from!="string"||e.resumed_from.length===0?null:`${e.continuation_mode==="session"?"session \uC774\uC5B4\uBC1B\uC74C":e.continuation_mode==="fresh"?"\uC0C8 session\uC73C\uB85C \uC774\uC5B4\uBC1B\uC74C":"\uC774\uC804 attempt\uC5D0\uC11C \uC774\uC5B4\uBC1B\uC74C"} (from ${e.resumed_from})`}function lf(e,t=document){let r=t.createElement("dialog");r.className="continuation-dialog";let n=t.createElement("button"),s=t.createElement("button"),o=t.createElement("button"),a=t.createElement("h2"),l=t.createElement("p");return a.textContent="\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4",l.textContent=`${gr(e.prior||{})||"\uC774\uC804 \uC124\uC815"} \u2192 ${gr(e.current||{})||"\uD604\uC7AC \uC124\uC815"}`,n.type="button",n.textContent="\uAE30\uC874 session \uC774\uC5B4\uD558\uAE30",n.disabled=e.prior_available===!1,s.type="button",s.textContent="\uD604\uC7AC preset\uC73C\uB85C \uC0C8 session",o.type="button",o.textContent="\uCDE8\uC18C",r.append(a,l,n,s,o),t.body.append(r),new Promise(c=>{let u=d=>{typeof r.close=="function"&&r.close(),r.remove(),c(d)};n.addEventListener("click",()=>u("prior_session")),s.addEventListener("click",()=>u("fresh_current")),o.addEventListener("click",()=>u(null)),r.addEventListener("cancel",d=>{d.preventDefault(),u(null)}),typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")})}async function $r(e,t,r={}){let n=e;for(r.onResult?.(n);n?.continuation_mismatch;){let s=n.continuation_mismatch,o=await lf(s);if(o===null)return n;n=await t(o,s.decision_token),r.onResult?.(n),n?.conflict&&r.refresh&&(n=await r.refresh(n),r.onResult?.(n))}return n}var cf=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed","quick_fix_impl_model","orchestration_model","orchestration_effort","orchestration_speed"],Il={spec_review_effort:"spec_review_model",plan_review_effort:"plan_review_model",impl_review_effort:"impl_review_model"},uf=new Set(["native-fixed-posture","unsupported","claude-runner-model-default","catalog-validated","provider-tier-or-runtime-model-default","actual-effort"]);function St(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function vt(e){return typeof e=="string"&&e.length>0?e:null}function wn(e){return e.startsWith("gpt-")?e.slice(4):e}function gt(e,t,r,n,s){return{value:e,source:t,display:r,full_value:n,resolution:s}}function Ol(e,t,r){let n=vt(t[e]);if(n!==null)return{value:n,source:"pin"};let s=vt(r[e]);return s===null?null:{value:s,source:"global"}}function qn(e,t,r,n){return Ol(e,t,r)||{value:n,source:"base"}}function Xo(e,t,r,n){let s=r?.implementation?.model_catalog;if(t&&St(s?.[t])){let a=vt(s[t][e]);if(a!==null)return a}if(t&&Array.isArray(s?.[t])&&s[t].includes(e))return e;if(!t&&St(s)){for(let a of Object.values(s))if(St(a)){let l=vt(a[e]);if(l!==null)return l}else if(Array.isArray(a)&&a.includes(e))return e}let o=n?.model_index?.[e];return vt(n?.runners?.[o]?.models?.[e]?.id)||e}function df(e,t){return vt(t?.review?.reviewers?.[e]?.model)||e}function kn(e,t,r=!1){if(e==="default")return gt(e,t,`default (\uC77C\uBC18 \xB7 ${t==="pin"?"\uD540":"\uC804\uC5ED \uACE0\uC815"})`,e,"explicit");let n=r?wn(e):e;return gt(e,t,n,e,"explicit")}function Ml(e,t,r){let n=t?.implementation?.model_catalog?.[e],s=[];St(n)?s.push(...Object.keys(n)):Array.isArray(n)&&s.push(...n.filter(a=>typeof a=="string"));let o=r?.runners?.[e]?.models;if(St(o))for(let a of Object.keys(o))s.includes(a)||s.push(a);return s}function pf(e,t){let r=[],n=e?.implementation?.model_catalog;St(n)&&r.push(...Object.keys(n));let s=t?.runners;if(St(s))for(let o of Object.keys(s))r.includes(o)||r.push(o);return r}function ff(e,t,r){if(e===null)return{runtime:null,offered:!1};let n=!1;for(let s of pf(t,r)){let o=Ml(s,t,r);if(o.length>0&&(n=!0),o.includes(e))return{runtime:s,offered:!0}}return{runtime:null,offered:n}}function Qo(e){return gt(e.value,e.source,`${e.value} (\uBE44\uD638\uD658)`,e.value,"incompatible")}function Ll(e,t,r){let n=Ol(e,t,r);return n?kn(n.value,n.source):gt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable")}function br(e){let t=St(e.pin)?e.pin:{},r=St(e.global)?e.global:{},n=St(e.execution_defaults)?e.execution_defaults:null,s=n?.supported===!0&&St(n.session)?n.session:null,o=n?.supported===!0&&St(n.orchestration)?n.orchestration:null,a=St(e.runner_catalog)?e.runner_catalog:null,l=vt(r.quick_fix_impl_model),c=ff(l,s,a),u={};if(s){let d=qn("workflow_mode",t,r,vt(s.workflow_mode_default));u.workflow_mode=d.source==="base"?gt(d.value,"base",d.value||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",d.value,"default"):kn(d.value,d.source);for(let F of["spec_review","plan_review","impl_review"]){let q=`${F}_model`,I=vt(F==="plan_review"?d.value==="fast_track"?s.plan_review?.fast_track_default:s.plan_review?.standard_recommended:s.review?.default),B=qn(q,t,r,I);if(B.value===null)u[q]=gt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");else if(B.value!=="self"&&B.value!=="skip"&&!St(s.review?.reviewers?.[B.value]))u[q]=Qo(gt(B.value,B.source,"",null,"explicit"));else{let m=df(B.value,s);u[q]=gt(B.value,B.source,wn(m),m,B.source==="base"?"default":"explicit")}}for(let[F,q]of Object.entries(Il)){let I=u[q].value;if(I==="self"||I==="skip"){u[F]=gt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable");continue}let B=vt(s.review?.reviewers?.[I||""]?.effort),m=qn(F,t,r,B);u[F]=m.value===null?gt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):gt(m.value,m.source,m.value,m.value,m.source==="base"?"default":"explicit")}let _=St(s.implementation?.default)?s.implementation.default:{},b=vt(e.route),x=b!==null&&["quick_fix","spec_backed","full_plan"].includes(b),A=St(s.implementation?.route_defaults)?s.implementation.route_defaults:{},L=x&&St(A[b])?A[b]:{};for(let F of["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]){let q=qn(F,t,r,F==="impl_dispatch"?vt(L.dispatch)||vt(_.dispatch):vt(_[F.replace("impl_","")]));u[F]=q.value===null?gt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):gt(q.value,q.source,q.value,q.value,q.source==="base"?"default":"explicit")}let G=vt(t.impl_runtime),ne=G==="inherit"?vt(e.controller_runtime):G,re=b==="quick_fix"&&vt(t.impl_dispatch)===null&&c.runtime!==null&&(G===null||ne===c.runtime);if(re){let F=c.runtime,q=l;u.impl_dispatch=gt("delegated","global","\uC704\uC784 (\uC804\uC5ED quick_fix)","delegated","explicit"),G===null&&(u.impl_runtime=gt(F,"global",`${F} (\uC720\uB3C4)`,F,"explicit")),vt(t.impl_model)===null&&(u.impl_model=gt(q,"global",q,q,"explicit"))}if(u.impl_dispatch.value==="main"){u.impl_dispatch.display="\uBA54\uC778";for(let F of["impl_runtime","impl_model","impl_effort","impl_speed"])u[F]=gt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else{if(u.impl_dispatch.value==="delegated"&&!re&&(u.impl_dispatch.display="\uC704\uC784"),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_model.value!==null){let F=u.impl_runtime.value==="inherit"?vt(e.controller_runtime):u.impl_runtime.value,q=F?Ml(F,s,a):[];if(u.impl_model.value!=="auto"&&q.length>0&&!q.includes(u.impl_model.value))u.impl_model=Qo(u.impl_model);else{let I=Xo(u.impl_model.value,F,s,a);u.impl_model.display=wn(I),u.impl_model.full_value=I}}if(u.impl_effort.value==="auto"){let F=vt(e.transport)||(u.impl_runtime.value==="codex"?"codex-native-spawn":u.impl_runtime.value==="claude"?"implement-claude":null),q=F?vt(s.implementation?.effort_by_transport?.[F]?.auto):null;q&&!uf.has(q)?(u.impl_effort.display=`${q} (\uBE44\uD638\uD658)`,u.impl_effort.full_value=q,u.impl_effort.resolution="incompatible"):(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}u.impl_speed.value==="default"&&(u.impl_speed=u.impl_speed.source==="base"?gt("default","base","default (\uC77C\uBC18)","default","default"):kn("default",u.impl_speed.source))}}else for(let d of cf.filter(_=>!_.startsWith("orchestration_")))u[d]=Ll(d,t,r);if(!s){for(let[d,_]of Object.entries(Il))(u[_].value==="self"||u[_].value==="skip")&&(u[d]=gt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable"));if(u.impl_dispatch.value==="main"){u.impl_dispatch.display="\uBA54\uC778";for(let d of["impl_runtime","impl_model","impl_effort","impl_speed"])u[d]=gt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else u.impl_dispatch.value==="delegated"&&(u.impl_dispatch.display="\uC704\uC784"),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_effort.value==="auto"&&(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}for(let d of["orchestration_model","orchestration_effort","orchestration_speed"]){if(!o){u[d]=Ll(d,t,r);continue}let _=d.replace("orchestration_",""),b=vt(o[_]),x=qn(d,t,r,b);if(d==="orchestration_effort"&&x.source==="base"){u[d]=gt(null,"base","CLI \uAE30\uBCF8 (\uBBF8\uC9C0\uC815)",null,"default");continue}if(x.value===null){u[d]=gt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");continue}if(d==="orchestration_model"){let A=x.source==="base"?vt(o.model_id)||x.value:Xo(x.value,null,s,a);u[d]=gt(x.value,x.source,wn(A),A,x.source==="base"?"default":"explicit");continue}if(x.value==="default"){u[d]=x.source==="base"?gt("default","base","default (\uC77C\uBC18)","default","default"):kn("default",x.source);continue}u[d]=kn(x.value,x.source)}if(s)if(l===null){let d=u.orchestration_model.full_value;u.quick_fix_impl_model=gt(null,"base",d===null?"\uBA54\uC778":`\uBA54\uC778 (orchestration ${wn(d)})`,null,"default")}else if(c.runtime!==null){let d=Xo(l,c.runtime,s,a);u.quick_fix_impl_model=gt(l,"global",wn(d),d,"explicit")}else c.offered?u.quick_fix_impl_model=Qo(gt(l,"global","",null,"explicit")):u.quick_fix_impl_model=kn(l,"global");return u}function _f(e,t){let r=t&&e.value==="default"?"default (\uC77C\uBC18)":e.display;if(!t||e.source==="pin")return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${e.display}`;let n=e.source==="global"?"\uC804\uC5ED":"harness";return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${r} (${n})`}function Bs(e){let t=St(e.pin)?e.pin:{},r=St(e.global)?e.global:{},n=St(e.resolution_global)?{...e.resolution_global}:{};delete n[e.key];let s=_=>{let b={...n,..._};return br({pin:e.layer==="pin"?b:t,global:e.layer==="pin"?r:b,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog,route:e.route,controller_runtime:e.controller_runtime})},o=e.layer==="pin"?t:r,a={...o};delete a[e.key];let l=s(a)[e.key],c=s(o)[e.key],u=vt(o[e.key]),d=[...e.choices];return u!==null&&!d.includes(u)&&d.unshift(u),{unset_label:_f(l,e.layer==="pin"),full_value:l.full_value,unavailable:l.resolution==="unavailable",disabled:c?.resolution==="not_applicable",options:d.map(_=>{let b=s({...o,[e.key]:_})[e.key];return{value:_,label:b.display,full_value:b.full_value}})}}function $n(e=document){let t=e.createElement("dialog");t.className="resume-instructions-dialog";let r=e.createElement("h2"),n=e.createElement("textarea"),s=e.createElement("div"),o=e.createElement("button"),a=e.createElement("button");return r.textContent="\uC138\uC158 \uC774\uC5B4\uD558\uAE30",n.placeholder="\uCD94\uAC00 \uC9C0\uCE68 (\uC120\uD0DD) \u2014 \uBE44\uC6CC\uB450\uBA74 \uAE30\uBCF8 \uC808\uCC28\uB85C \uC7AC\uAC1C",n.maxLength=4e3,s.className="resume-instructions-dialog__actions",o.type="button",o.textContent="\uC774\uC5B4\uD558\uAE30",a.type="button",a.textContent="\uCDE8\uC18C",s.append(o,a),t.append(r,n,s),e.body.append(t),new Promise(l=>{let c=!1,u=_=>{c||(c=!0,typeof t.close=="function"&&t.close(),t.remove(),l(_))},d=()=>u(n.value.trim());o.addEventListener("click",d),a.addEventListener("click",()=>u(null)),n.addEventListener("keydown",_=>{_.key==="Enter"&&(_.ctrlKey||_.metaKey)&&(_.preventDefault(),d())}),t.addEventListener("cancel",_=>{_.preventDefault(),u(null)}),typeof t.showModal=="function"?t.showModal():t.setAttribute("open",""),n.focus()})}var Fl="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function Lt(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var xr=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],Fn=[...xr,"reasoning_output_tokens"],mf=["implementation","review-consult"];function Jo(e){let t=0;for(let r of xr)t+=Lt(e?.[r]);return t}function gf(e){return!e||typeof e!="object"?!1:xr.some(t=>Number.isFinite(e[t]))}function Pl(e){return!e||typeof e!="object"?!1:Fn.some(t=>Number.isFinite(e[t]))}function bf(e){let t={};for(let r of Fn)e&&Number.isFinite(e[r])&&(t[r]=e[r]);return t}function Dl(e){let t={};for(let r of Fn)Number.isFinite(e[r])&&(t[r]=e[r]);return e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function Nl(e,t){return e==="codex"?Lt(t.input_tokens)+Lt(t.output_tokens):Jo(t)}function hf(e){return e==="claude"?"Claude":"Codex"}function yf(e){return`\u03C4 ${jl(e)}`}function vf(e,t){let r=t.breakdown||{},n=[`\uC785\uB825 ${Lt(r.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Lt(r.output_tokens).toLocaleString("en-US")}`];e==="claude"?n.push(`\uCE90\uC2DC\uC77D\uAE30 ${Lt(r.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Lt(r.cache_creation_input_tokens).toLocaleString("en-US")}`):(n.push(`\uCE90\uC2DC\uC77D\uAE30 ${Lt(r.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${Lt(r.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(r.reasoning_output_tokens)&&n.push(`\uCD94\uB860\uCD9C\uB825 ${Lt(r.reasoning_output_tokens).toLocaleString("en-US")}`));let o=[e==="claude"?"Claude subtotal = \uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"Codex subtotal = \uC785\uB825 + \uCD9C\uB825; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset",`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,n.join(" \xB7 ")];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&o.push(`$${t.total_cost_usd.toFixed(2)}`),t.replayed&&o.push(Fl),o.join(`
`)}function Ot(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let r of["claude","codex"]){let n=e.providers[r];n&&t.push({provider:r,label:`${hf(r)} ${yf(n.subtotal)}${typeof n.total_cost_usd=="number"&&Number.isFinite(n.total_cost_usd)?` \xB7 $${n.total_cost_usd.toFixed(2)}`:""}`,tooltip:vf(r,n)})}return t}function Ws(e){let t={},r={claude:!0,codex:!1},n={claude:0,codex:0};for(let s of e)if(!(!s||!s.providers))for(let o of["claude","codex"]){let a=s.providers[o];if(!a)continue;let l=t[o];l||(l={subtotal:0,breakdown:{}},t[o]=l),l.subtotal+=a.subtotal;for(let c of Fn)Number.isFinite(a.breakdown[c])&&(l.breakdown[c]=Lt(l.breakdown[c])+Lt(a.breakdown[c]));a.replayed&&(l.replayed=!0),o==="claude"&&(typeof a.total_cost_usd=="number"&&Number.isFinite(a.total_cost_usd)?n.claude+=a.total_cost_usd:r.claude=!1)}return t.claude&&r.claude&&(t.claude.total_cost_usd=n.claude),Object.keys(t).length===0?null:{providers:t,roles:{}}}function ea(e){return!e||typeof e!="object"?null:Jt({attempt:{...e,bead_id:"__attempt__"}},"__attempt__")}function wf(e){return e==="codex"?"codex":"claude"}function Nr(){return{subtotal:0,breakdown:bf(null),legs:[],replayed:!1,outer_count:0,outer_cost:0,outer_cost_count:0}}function Us(e,t,r){e.subtotal+=t.subtotal;for(let n of Fn)Number.isFinite(t.usage[n])&&(e.breakdown[n]=Lt(e.breakdown[n])+Lt(t.usage[n]));e.legs.push(t),t.replayed===!0&&(e.replayed=!0),r&&(e.outer_count+=1,typeof t.usage.total_cost_usd=="number"&&Number.isFinite(t.usage.total_cost_usd)&&(e.outer_cost+=t.usage.total_cost_usd,e.outer_cost_count+=1))}function ql(e,t){let r={subtotal:e.subtotal,breakdown:e.breakdown};return t&&(r.legs=e.legs),e.replayed&&(r.replayed=!0),r}function jl(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function xn(e){return gf(e)?`\u03C4 ${jl(Jo(e))}`:null}function ir(e){let t=xn(e);if(!t)return null;let r=e?.total_cost_usd;return typeof r=="number"&&Number.isFinite(r)?`${t} \xB7 $${r.toFixed(2)}`:t}function An(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${Lt(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Lt(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${Lt(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Lt(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let r=[`\uCD1D ${Jo(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&r.push(Fl),r.join(`
`)}function Jt(e,t){let r={claude:Nr(),codex:Nr()},n={orchestrator:{claude:Nr(),codex:Nr()},implementation:{claude:Nr(),codex:Nr()},"review-consult":{claude:Nr(),codex:Nr()}},s=new Set;for(let l of Object.values(e||{})){if(!l||l.bead_id!==t)continue;let c=l.usage;if(Pl(c)){let d=wf(l.runner),_=Dl(c),b={provider:d,role:"orchestrator",attempt_id:String(l.attempt_id||""),usage:_,subtotal:Nl(d,_)};_.replayed===!0&&(b.replayed=!0),typeof l.model=="string"&&(b.model=l.model),typeof l.session_id=="string"&&(b.session_id=l.session_id),Us(r[d],b,!0),Us(n.orchestrator[d],b,!0)}let u=Array.isArray(l.usage_legs)?l.usage_legs:[];for(let d of u){if(!d||d.provider!=="codex"||!mf.includes(d.role)||!Pl(d.usage))continue;let _=typeof d.receipt_id=="string"&&d.receipt_id.length>0?d.receipt_id:null;if(!_||s.has(_))continue;s.add(_);let b=Dl(d.usage),x={provider:"codex",role:d.role,attempt_id:String(l.attempt_id||""),usage:b,subtotal:Nl("codex",b)};x.receipt_id=_,typeof d.model=="string"&&(x.model=d.model),typeof d.effort=="string"&&d.effort.trim().length>0&&(x.effort=d.effort),typeof d.session_id=="string"?x.session_id=d.session_id:typeof d.thread_id=="string"&&(x.session_id=d.thread_id),typeof d.turn_id=="string"&&(x.turn_id=d.turn_id),typeof d.completed_at=="string"&&(x.completed_at=d.completed_at),b.replayed===!0&&(x.replayed=!0),Us(r.codex,x,!1),Us(n[x.role].codex,x,!1)}}let o={};for(let l of["claude","codex"]){let c=r[l];if(c.legs.length===0)continue;let u=ql(c,!1);l==="claude"&&c.outer_count>0&&c.outer_cost_count===c.outer_count&&(u.total_cost_usd=c.outer_cost),o[l]=u}if(Object.keys(o).length===0)return null;let a={};for(let l of["orchestrator","implementation","review-consult"]){let c={};for(let u of["claude","codex"]){let d=n[l][u];d.legs.length>0&&(c[u]={...ql(d,!0),legs:d.legs})}Object.keys(c).length>0&&(a[l]=c)}return{providers:o,roles:a}}var{entries:Yl,setPrototypeOf:Bl,isFrozen:kf,getPrototypeOf:$f,getOwnPropertyDescriptor:xf}=Object,{freeze:Nt,seal:er,create:ia}=Object,{apply:la,construct:ca}=typeof Reflect<"u"&&Reflect;Nt||(Nt=function(t){return t});er||(er=function(t){return t});la||(la=function(t,r){for(var n=arguments.length,s=new Array(n>2?n-2:0),o=2;o<n;o++)s[o-2]=arguments[o];return t.apply(r,s)});ca||(ca=function(t){for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return new t(...n)});var zs=qt(Array.prototype.forEach),Af=qt(Array.prototype.lastIndexOf),Ul=qt(Array.prototype.pop),jn=qt(Array.prototype.push),Sf=qt(Array.prototype.splice),Gs=qt(String.prototype.toLowerCase),ta=qt(String.prototype.toString),ra=qt(String.prototype.match),Bn=qt(String.prototype.replace),Ef=qt(String.prototype.indexOf),Tf=qt(String.prototype.trim),lr=qt(Object.prototype.hasOwnProperty),Dt=qt(RegExp.prototype.test),Un=Cf(TypeError);function qt(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return la(e,t,n)}}function Cf(e){return function(){for(var t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];return ca(e,r)}}function tt(e,t){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Gs;Bl&&Bl(e,null);let n=t.length;for(;n--;){let s=t[n];if(typeof s=="string"){let o=r(s);o!==s&&(kf(t)||(t[n]=o),s=o)}e[s]=!0}return e}function Rf(e){for(let t=0;t<e.length;t++)lr(e,t)||(e[t]=null);return e}function Ar(e){let t=ia(null);for(let[r,n]of Yl(e))lr(e,r)&&(Array.isArray(n)?t[r]=Rf(n):n&&typeof n=="object"&&n.constructor===Object?t[r]=Ar(n):t[r]=n);return t}function Wn(e,t){for(;e!==null;){let n=xf(e,t);if(n){if(n.get)return qt(n.get);if(typeof n.value=="function")return qt(n.value)}e=$f(e)}function r(){return null}return r}var Wl=Nt(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),na=Nt(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),sa=Nt(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),If=Nt(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),oa=Nt(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Lf=Nt(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),zl=Nt(["#text"]),Hl=Nt(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),aa=Nt(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Gl=Nt(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Hs=Nt(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Of=er(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Mf=er(/<%[\w\W]*|[\w\W]*%>/gm),Pf=er(/\$\{[\w\W]*/gm),Df=er(/^data-[\-\w.\u00B7-\uFFFF]+$/),Nf=er(/^aria-[\-\w]+$/),Zl=er(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),qf=er(/^(?:\w+script|data):/i),Ff=er(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Xl=er(/^html$/i),jf=er(/^[a-z][.\w]*(-[.\w]+)+$/i),Vl=Object.freeze({__proto__:null,ARIA_ATTR:Nf,ATTR_WHITESPACE:Ff,CUSTOM_ELEMENT:jf,DATA_ATTR:Df,DOCTYPE_NAME:Xl,ERB_EXPR:Mf,IS_ALLOWED_URI:Zl,IS_SCRIPT_OR_DATA:qf,MUSTACHE_EXPR:Of,TMPLIT_EXPR:Pf}),zn={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},Bf=function(){return typeof window>"u"?null:window},Uf=function(t,r){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let n=null,s="data-tt-policy-suffix";r&&r.hasAttribute(s)&&(n=r.getAttribute(s));let o="dompurify"+(n?"#"+n:"");try{return t.createPolicy(o,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},Kl=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Ql(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Bf(),t=Ae=>Ql(Ae);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==zn.document||!e.Element)return t.isSupported=!1,t;let{document:r}=e,n=r,s=n.currentScript,{DocumentFragment:o,HTMLTemplateElement:a,Node:l,Element:c,NodeFilter:u,NamedNodeMap:d=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:_,DOMParser:b,trustedTypes:x}=e,A=c.prototype,L=Wn(A,"cloneNode"),G=Wn(A,"remove"),ne=Wn(A,"nextSibling"),re=Wn(A,"childNodes"),F=Wn(A,"parentNode");if(typeof a=="function"){let Ae=r.createElement("template");Ae.content&&Ae.content.ownerDocument&&(r=Ae.content.ownerDocument)}let q,I="",{implementation:B,createNodeIterator:m,createDocumentFragment:S,getElementsByTagName:Z}=r,{importNode:ie}=n,D=Kl();t.isSupported=typeof Yl=="function"&&typeof F=="function"&&B&&B.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:U,ERB_EXPR:_e,TMPLIT_EXPR:we,DATA_ATTR:ke,ARIA_ATTR:xe,IS_SCRIPT_OR_DATA:We,ATTR_WHITESPACE:rt,CUSTOM_ELEMENT:Ne}=Vl,{IS_ALLOWED_URI:He}=Vl,ue=null,Fe=tt({},[...Wl,...na,...sa,...oa,...zl]),Le=null,Ge=tt({},[...Hl,...aa,...Gl,...Hs]),Ie=Object.seal(ia(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Ve=null,st=null,Ce=Object.seal(ia(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),Xe=!0,K=!0,X=!1,$e=!0,Oe=!1,je=!0,ze=!1,Ue=!1,lt=!1,ut=!1,W=!1,Y=!1,ye=!0,nt=!1,ve="user-content-",T=!0,M=!1,P={},V=null,oe=tt({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),y=null,R=tt({},["audio","video","img","source","image","track"]),N=null,fe=tt({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),de="http://www.w3.org/1998/Math/MathML",Se="http://www.w3.org/2000/svg",Pe="http://www.w3.org/1999/xhtml",Ke=Pe,Ye=!1,z=null,ee=tt({},[de,Se,Pe],ta),ge=tt({},["mi","mo","mn","ms","mtext"]),k=tt({},["annotation-xml"]),E=tt({},["title","style","font","a","script"]),O=null,J=["application/xhtml+xml","text/html"],Ee="text/html",be=null,Te=null,De=r.createElement("form"),Et=function($){return $ instanceof RegExp||$ instanceof Function},bt=function(){let $=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(Te&&Te===$)){if((!$||typeof $!="object")&&($={}),$=Ar($),O=J.indexOf($.PARSER_MEDIA_TYPE)===-1?Ee:$.PARSER_MEDIA_TYPE,be=O==="application/xhtml+xml"?ta:Gs,ue=lr($,"ALLOWED_TAGS")?tt({},$.ALLOWED_TAGS,be):Fe,Le=lr($,"ALLOWED_ATTR")?tt({},$.ALLOWED_ATTR,be):Ge,z=lr($,"ALLOWED_NAMESPACES")?tt({},$.ALLOWED_NAMESPACES,ta):ee,N=lr($,"ADD_URI_SAFE_ATTR")?tt(Ar(fe),$.ADD_URI_SAFE_ATTR,be):fe,y=lr($,"ADD_DATA_URI_TAGS")?tt(Ar(R),$.ADD_DATA_URI_TAGS,be):R,V=lr($,"FORBID_CONTENTS")?tt({},$.FORBID_CONTENTS,be):oe,Ve=lr($,"FORBID_TAGS")?tt({},$.FORBID_TAGS,be):Ar({}),st=lr($,"FORBID_ATTR")?tt({},$.FORBID_ATTR,be):Ar({}),P=lr($,"USE_PROFILES")?$.USE_PROFILES:!1,Xe=$.ALLOW_ARIA_ATTR!==!1,K=$.ALLOW_DATA_ATTR!==!1,X=$.ALLOW_UNKNOWN_PROTOCOLS||!1,$e=$.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Oe=$.SAFE_FOR_TEMPLATES||!1,je=$.SAFE_FOR_XML!==!1,ze=$.WHOLE_DOCUMENT||!1,ut=$.RETURN_DOM||!1,W=$.RETURN_DOM_FRAGMENT||!1,Y=$.RETURN_TRUSTED_TYPE||!1,lt=$.FORCE_BODY||!1,ye=$.SANITIZE_DOM!==!1,nt=$.SANITIZE_NAMED_PROPS||!1,T=$.KEEP_CONTENT!==!1,M=$.IN_PLACE||!1,He=$.ALLOWED_URI_REGEXP||Zl,Ke=$.NAMESPACE||Pe,ge=$.MATHML_TEXT_INTEGRATION_POINTS||ge,k=$.HTML_INTEGRATION_POINTS||k,Ie=$.CUSTOM_ELEMENT_HANDLING||{},$.CUSTOM_ELEMENT_HANDLING&&Et($.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(Ie.tagNameCheck=$.CUSTOM_ELEMENT_HANDLING.tagNameCheck),$.CUSTOM_ELEMENT_HANDLING&&Et($.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(Ie.attributeNameCheck=$.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),$.CUSTOM_ELEMENT_HANDLING&&typeof $.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(Ie.allowCustomizedBuiltInElements=$.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Oe&&(K=!1),W&&(ut=!0),P&&(ue=tt({},zl),Le=[],P.html===!0&&(tt(ue,Wl),tt(Le,Hl)),P.svg===!0&&(tt(ue,na),tt(Le,aa),tt(Le,Hs)),P.svgFilters===!0&&(tt(ue,sa),tt(Le,aa),tt(Le,Hs)),P.mathMl===!0&&(tt(ue,oa),tt(Le,Gl),tt(Le,Hs))),$.ADD_TAGS&&(typeof $.ADD_TAGS=="function"?Ce.tagCheck=$.ADD_TAGS:(ue===Fe&&(ue=Ar(ue)),tt(ue,$.ADD_TAGS,be))),$.ADD_ATTR&&(typeof $.ADD_ATTR=="function"?Ce.attributeCheck=$.ADD_ATTR:(Le===Ge&&(Le=Ar(Le)),tt(Le,$.ADD_ATTR,be))),$.ADD_URI_SAFE_ATTR&&tt(N,$.ADD_URI_SAFE_ATTR,be),$.FORBID_CONTENTS&&(V===oe&&(V=Ar(V)),tt(V,$.FORBID_CONTENTS,be)),T&&(ue["#text"]=!0),ze&&tt(ue,["html","head","body"]),ue.table&&(tt(ue,["tbody"]),delete Ve.tbody),$.TRUSTED_TYPES_POLICY){if(typeof $.TRUSTED_TYPES_POLICY.createHTML!="function")throw Un('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof $.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Un('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');q=$.TRUSTED_TYPES_POLICY,I=q.createHTML("")}else q===void 0&&(q=Uf(x,s)),q!==null&&typeof I=="string"&&(I=q.createHTML(""));Nt&&Nt($),Te=$}},et=tt({},[...na,...sa,...If]),Pt=tt({},[...oa,...Lf]),vr=function($){let te=F($);(!te||!te.tagName)&&(te={namespaceURI:Ke,tagName:"template"});let he=Gs($.tagName),dt=Gs(te.tagName);return z[$.namespaceURI]?$.namespaceURI===Se?te.namespaceURI===Pe?he==="svg":te.namespaceURI===de?he==="svg"&&(dt==="annotation-xml"||ge[dt]):!!et[he]:$.namespaceURI===de?te.namespaceURI===Pe?he==="math":te.namespaceURI===Se?he==="math"&&k[dt]:!!Pt[he]:$.namespaceURI===Pe?te.namespaceURI===Se&&!k[dt]||te.namespaceURI===de&&!ge[dt]?!1:!Pt[he]&&(E[he]||!et[he]):!!(O==="application/xhtml+xml"&&z[$.namespaceURI]):!1},Me=function($){jn(t.removed,{element:$});try{F($).removeChild($)}catch{G($)}},jt=function($,te){try{jn(t.removed,{attribute:te.getAttributeNode($),from:te})}catch{jn(t.removed,{attribute:null,from:te})}if(te.removeAttribute($),$==="is")if(ut||W)try{Me(te)}catch{}else try{te.setAttribute($,"")}catch{}},wr=function($){let te=null,he=null;if(lt)$="<remove></remove>"+$;else{let _t=ra($,/^[\r\n\t ]+/);he=_t&&_t[0]}O==="application/xhtml+xml"&&Ke===Pe&&($='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+$+"</body></html>");let dt=q?q.createHTML($):$;if(Ke===Pe)try{te=new b().parseFromString(dt,O)}catch{}if(!te||!te.documentElement){te=B.createDocument(Ke,"template",null);try{te.documentElement.innerHTML=Ye?I:dt}catch{}}let wt=te.body||te.documentElement;return $&&he&&wt.insertBefore(r.createTextNode(he),wt.childNodes[0]||null),Ke===Pe?Z.call(te,ze?"html":"body")[0]:ze?te.documentElement:wt},zt=function($){return m.call($.ownerDocument||$,$,u.SHOW_ELEMENT|u.SHOW_COMMENT|u.SHOW_TEXT|u.SHOW_PROCESSING_INSTRUCTION|u.SHOW_CDATA_SECTION,null)},tr=function($){return $ instanceof _&&(typeof $.nodeName!="string"||typeof $.textContent!="string"||typeof $.removeChild!="function"||!($.attributes instanceof d)||typeof $.removeAttribute!="function"||typeof $.setAttribute!="function"||typeof $.namespaceURI!="string"||typeof $.insertBefore!="function"||typeof $.hasChildNodes!="function")},pr=function($){return typeof l=="function"&&$ instanceof l};function Tt(Ae,$,te){zs(Ae,he=>{he.call(t,$,te,Te)})}let rr=function($){let te=null;if(Tt(D.beforeSanitizeElements,$,null),tr($))return Me($),!0;let he=be($.nodeName);if(Tt(D.uponSanitizeElement,$,{tagName:he,allowedTags:ue}),je&&$.hasChildNodes()&&!pr($.firstElementChild)&&Dt(/<[/\w!]/g,$.innerHTML)&&Dt(/<[/\w!]/g,$.textContent)||$.nodeType===zn.progressingInstruction||je&&$.nodeType===zn.comment&&Dt(/<[/\w]/g,$.data))return Me($),!0;if(!(Ce.tagCheck instanceof Function&&Ce.tagCheck(he))&&(!ue[he]||Ve[he])){if(!Ve[he]&&_r(he)&&(Ie.tagNameCheck instanceof RegExp&&Dt(Ie.tagNameCheck,he)||Ie.tagNameCheck instanceof Function&&Ie.tagNameCheck(he)))return!1;if(T&&!V[he]){let dt=F($)||$.parentNode,wt=re($)||$.childNodes;if(wt&&dt){let _t=wt.length;for(let $t=_t-1;$t>=0;--$t){let Rt=L(wt[$t],!0);Rt.__removalCount=($.__removalCount||0)+1,dt.insertBefore(Rt,ne($))}}}return Me($),!0}return $ instanceof c&&!vr($)||(he==="noscript"||he==="noembed"||he==="noframes")&&Dt(/<\/no(script|embed|frames)/i,$.innerHTML)?(Me($),!0):(Oe&&$.nodeType===zn.text&&(te=$.textContent,zs([U,_e,we],dt=>{te=Bn(te,dt," ")}),$.textContent!==te&&(jn(t.removed,{element:$.cloneNode()}),$.textContent=te)),Tt(D.afterSanitizeElements,$,null),!1)},fr=function($,te,he){if(ye&&(te==="id"||te==="name")&&(he in r||he in De))return!1;if(!(K&&!st[te]&&Dt(ke,te))){if(!(Xe&&Dt(xe,te))){if(!(Ce.attributeCheck instanceof Function&&Ce.attributeCheck(te,$))){if(!Le[te]||st[te]){if(!(_r($)&&(Ie.tagNameCheck instanceof RegExp&&Dt(Ie.tagNameCheck,$)||Ie.tagNameCheck instanceof Function&&Ie.tagNameCheck($))&&(Ie.attributeNameCheck instanceof RegExp&&Dt(Ie.attributeNameCheck,te)||Ie.attributeNameCheck instanceof Function&&Ie.attributeNameCheck(te,$))||te==="is"&&Ie.allowCustomizedBuiltInElements&&(Ie.tagNameCheck instanceof RegExp&&Dt(Ie.tagNameCheck,he)||Ie.tagNameCheck instanceof Function&&Ie.tagNameCheck(he))))return!1}else if(!N[te]){if(!Dt(He,Bn(he,rt,""))){if(!((te==="src"||te==="xlink:href"||te==="href")&&$!=="script"&&Ef(he,"data:")===0&&y[$])){if(!(X&&!Dt(We,Bn(he,rt,"")))){if(he)return!1}}}}}}}return!0},_r=function($){return $!=="annotation-xml"&&ra($,Ne)},Je=function($){Tt(D.beforeSanitizeAttributes,$,null);let{attributes:te}=$;if(!te||tr($))return;let he={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:Le,forceKeepAttr:void 0},dt=te.length;for(;dt--;){let wt=te[dt],{name:_t,namespaceURI:$t,value:Rt}=wt,p=be(_t),w=Rt,f=_t==="value"?w:Tf(w);if(he.attrName=p,he.attrValue=f,he.keepAttr=!0,he.forceKeepAttr=void 0,Tt(D.uponSanitizeAttribute,$,he),f=he.attrValue,nt&&(p==="id"||p==="name")&&(jt(_t,$),f=ve+f),je&&Dt(/((--!?|])>)|<\/(style|title|textarea)/i,f)){jt(_t,$);continue}if(p==="attributename"&&ra(f,"href")){jt(_t,$);continue}if(he.forceKeepAttr)continue;if(!he.keepAttr){jt(_t,$);continue}if(!$e&&Dt(/\/>/i,f)){jt(_t,$);continue}Oe&&zs([U,_e,we],H=>{f=Bn(f,H," ")});let g=be($.nodeName);if(!fr(g,p,f)){jt(_t,$);continue}if(q&&typeof x=="object"&&typeof x.getAttributeType=="function"&&!$t)switch(x.getAttributeType(g,p)){case"TrustedHTML":{f=q.createHTML(f);break}case"TrustedScriptURL":{f=q.createScriptURL(f);break}}if(f!==w)try{$t?$.setAttributeNS($t,_t,f):$.setAttribute(_t,f),tr($)?Me($):Ul(t.removed)}catch{jt(_t,$)}}Tt(D.afterSanitizeAttributes,$,null)},Yt=function Ae($){let te=null,he=zt($);for(Tt(D.beforeSanitizeShadowDOM,$,null);te=he.nextNode();)Tt(D.uponSanitizeShadowNode,te,null),rr(te),Je(te),te.content instanceof o&&Ae(te.content);Tt(D.afterSanitizeShadowDOM,$,null)};return t.sanitize=function(Ae){let $=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},te=null,he=null,dt=null,wt=null;if(Ye=!Ae,Ye&&(Ae="<!-->"),typeof Ae!="string"&&!pr(Ae))if(typeof Ae.toString=="function"){if(Ae=Ae.toString(),typeof Ae!="string")throw Un("dirty is not a string, aborting")}else throw Un("toString is not a function");if(!t.isSupported)return Ae;if(Ue||bt($),t.removed=[],typeof Ae=="string"&&(M=!1),M){if(Ae.nodeName){let Rt=be(Ae.nodeName);if(!ue[Rt]||Ve[Rt])throw Un("root node is forbidden and cannot be sanitized in-place")}}else if(Ae instanceof l)te=wr("<!---->"),he=te.ownerDocument.importNode(Ae,!0),he.nodeType===zn.element&&he.nodeName==="BODY"||he.nodeName==="HTML"?te=he:te.appendChild(he);else{if(!ut&&!Oe&&!ze&&Ae.indexOf("<")===-1)return q&&Y?q.createHTML(Ae):Ae;if(te=wr(Ae),!te)return ut?null:Y?I:""}te&&lt&&Me(te.firstChild);let _t=zt(M?Ae:te);for(;dt=_t.nextNode();)rr(dt),Je(dt),dt.content instanceof o&&Yt(dt.content);if(M)return Ae;if(ut){if(W)for(wt=S.call(te.ownerDocument);te.firstChild;)wt.appendChild(te.firstChild);else wt=te;return(Le.shadowroot||Le.shadowrootmode)&&(wt=ie.call(n,wt,!0)),wt}let $t=ze?te.outerHTML:te.innerHTML;return ze&&ue["!doctype"]&&te.ownerDocument&&te.ownerDocument.doctype&&te.ownerDocument.doctype.name&&Dt(Xl,te.ownerDocument.doctype.name)&&($t="<!DOCTYPE "+te.ownerDocument.doctype.name+`>
`+$t),Oe&&zs([U,_e,we],Rt=>{$t=Bn($t,Rt," ")}),q&&Y?q.createHTML($t):$t},t.setConfig=function(){let Ae=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};bt(Ae),Ue=!0},t.clearConfig=function(){Te=null,Ue=!1},t.isValidAttribute=function(Ae,$,te){Te||bt({});let he=be(Ae),dt=be($);return fr(he,dt,te)},t.addHook=function(Ae,$){typeof $=="function"&&jn(D[Ae],$)},t.removeHook=function(Ae,$){if($!==void 0){let te=Af(D[Ae],$);return te===-1?void 0:Sf(D[Ae],te,1)[0]}return Ul(D[Ae])},t.removeHooks=function(Ae){D[Ae]=[]},t.removeAllHooks=function(){D=Kl()},t}var Jl=Ql();var Sr={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Vs=e=>(...t)=>({_$litDirective$:e,values:t}),Sn=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,r,n){this._$Ct=t,this._$AM=r,this._$Ci=n}_$AS(t,r){return this.update(t,r)}update(t,r){return this.render(...r)}};var Hn=class extends Sn{constructor(t){if(super(t),this.it=kt,t.type!==Sr.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===kt||t==null)return this._t=void 0,this.it=t;if(t===Xt)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let r=[t];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}};Hn.directiveName="unsafeHTML",Hn.resultType=1;var ec=Vs(Hn);function fa(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var nn=fa();function ic(e){nn=e}var Yn={exec:()=>null};function ct(e,t=""){let r=typeof e=="string"?e:e.source,n={replace:(s,o)=>{let a=typeof o=="string"?o:o.source;return a=a.replace(Ft.caret,"$1"),r=r.replace(s,a),n},getRegex:()=>new RegExp(r,t)};return n}var Wf=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),Ft={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},zf=/^(?:[ \t]*(?:\n|$))+/,Hf=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Gf=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,Zn=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Vf=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,_a=/(?:[*+-]|\d{1,9}[.)])/,lc=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,cc=ct(lc).replace(/bull/g,_a).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Kf=ct(lc).replace(/bull/g,_a).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),ma=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Yf=/^[^\n]+/,ga=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,Zf=ct(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",ga).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Xf=ct(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,_a).getRegex(),Js="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",ba=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Qf=ct("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",ba).replace("tag",Js).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),uc=ct(ma).replace("hr",Zn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Js).getRegex(),Jf=ct(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",uc).getRegex(),ha={blockquote:Jf,code:Hf,def:Zf,fences:Gf,heading:Vf,hr:Zn,html:Qf,lheading:cc,list:Xf,newline:zf,paragraph:uc,table:Yn,text:Yf},tc=ct("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",Zn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Js).getRegex(),e_={...ha,lheading:Kf,table:tc,paragraph:ct(ma).replace("hr",Zn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",tc).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Js).getRegex()},t_={...ha,html:ct(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",ba).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Yn,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:ct(ma).replace("hr",Zn).replace("heading",` *#{1,6} *[^
]`).replace("lheading",cc).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},r_=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,n_=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,dc=/^( {2,}|\\)\n(?!\s*$)/,s_=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,eo=/[\p{P}\p{S}]/u,ya=/[\s\p{P}\p{S}]/u,pc=/[^\s\p{P}\p{S}]/u,o_=ct(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,ya).getRegex(),fc=/(?!~)[\p{P}\p{S}]/u,a_=/(?!~)[\s\p{P}\p{S}]/u,i_=/(?:[^\s\p{P}\p{S}]|~)/u,l_=ct(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",Wf?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),_c=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,c_=ct(_c,"u").replace(/punct/g,eo).getRegex(),u_=ct(_c,"u").replace(/punct/g,fc).getRegex(),mc="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",d_=ct(mc,"gu").replace(/notPunctSpace/g,pc).replace(/punctSpace/g,ya).replace(/punct/g,eo).getRegex(),p_=ct(mc,"gu").replace(/notPunctSpace/g,i_).replace(/punctSpace/g,a_).replace(/punct/g,fc).getRegex(),f_=ct("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,pc).replace(/punctSpace/g,ya).replace(/punct/g,eo).getRegex(),__=ct(/\\(punct)/,"gu").replace(/punct/g,eo).getRegex(),m_=ct(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),g_=ct(ba).replace("(?:-->|$)","-->").getRegex(),b_=ct("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",g_).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Zs=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,h_=ct(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Zs).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),gc=ct(/^!?\[(label)\]\[(ref)\]/).replace("label",Zs).replace("ref",ga).getRegex(),bc=ct(/^!?\[(ref)\](?:\[\])?/).replace("ref",ga).getRegex(),y_=ct("reflink|nolink(?!\\()","g").replace("reflink",gc).replace("nolink",bc).getRegex(),rc=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,va={_backpedal:Yn,anyPunctuation:__,autolink:m_,blockSkip:l_,br:dc,code:n_,del:Yn,emStrongLDelim:c_,emStrongRDelimAst:d_,emStrongRDelimUnd:f_,escape:r_,link:h_,nolink:bc,punctuation:o_,reflink:gc,reflinkSearch:y_,tag:b_,text:s_,url:Yn},v_={...va,link:ct(/^!?\[(label)\]\((.*?)\)/).replace("label",Zs).getRegex(),reflink:ct(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Zs).getRegex()},ua={...va,emStrongRDelimAst:p_,emStrongLDelim:u_,url:ct(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",rc).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:ct(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",rc).getRegex()},w_={...ua,br:ct(dc).replace("{2,}","*").getRegex(),text:ct(ua.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Ks={normal:ha,gfm:e_,pedantic:t_},Gn={normal:va,gfm:ua,breaks:w_,pedantic:v_},k_={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},nc=e=>k_[e];function Er(e,t){if(t){if(Ft.escapeTest.test(e))return e.replace(Ft.escapeReplace,nc)}else if(Ft.escapeTestNoEncode.test(e))return e.replace(Ft.escapeReplaceNoEncode,nc);return e}function sc(e){try{e=encodeURI(e).replace(Ft.percentDecode,"%")}catch{return null}return e}function oc(e,t){let r=e.replace(Ft.findPipe,(o,a,l)=>{let c=!1,u=a;for(;--u>=0&&l[u]==="\\";)c=!c;return c?"|":" |"}),n=r.split(Ft.splitPipe),s=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),t)if(n.length>t)n.splice(t);else for(;n.length<t;)n.push("");for(;s<n.length;s++)n[s]=n[s].trim().replace(Ft.slashPipe,"|");return n}function Vn(e,t,r){let n=e.length;if(n===0)return"";let s=0;for(;s<n;){let o=e.charAt(n-s-1);if(o===t&&!r)s++;else if(o!==t&&r)s++;else break}return e.slice(0,n-s)}function $_(e,t){if(e.indexOf(t[1])===-1)return-1;let r=0;for(let n=0;n<e.length;n++)if(e[n]==="\\")n++;else if(e[n]===t[0])r++;else if(e[n]===t[1]&&(r--,r<0))return n;return r>0?-2:-1}function ac(e,t,r,n,s){let o=t.href,a=t.title||null,l=e[1].replace(s.other.outputLinkReplace,"$1");n.state.inLink=!0;let c={type:e[0].charAt(0)==="!"?"image":"link",raw:r,href:o,title:a,text:l,tokens:n.inlineTokens(l)};return n.state.inLink=!1,c}function x_(e,t,r){let n=e.match(r.other.indentCodeCompensation);if(n===null)return t;let s=n[1];return t.split(`
`).map(o=>{let a=o.match(r.other.beginningSpace);if(a===null)return o;let[l]=a;return l.length>=s.length?o.slice(s.length):o}).join(`
`)}var Xs=class{constructor(e){ft(this,"options");ft(this,"rules");ft(this,"lexer");this.options=e||nn}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let r=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?r:Vn(r,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let r=t[0],n=x_(r,t[3]||"",this.rules);return{type:"code",raw:r,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:n}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let r=t[2].trim();if(this.rules.other.endingHash.test(r)){let n=Vn(r,"#");(this.options.pedantic||!n||this.rules.other.endingSpaceChar.test(n))&&(r=n.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:Vn(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let r=Vn(t[0],`
`).split(`
`),n="",s="",o=[];for(;r.length>0;){let a=!1,l=[],c;for(c=0;c<r.length;c++)if(this.rules.other.blockquoteStart.test(r[c]))l.push(r[c]),a=!0;else if(!a)l.push(r[c]);else break;r=r.slice(c);let u=l.join(`
`),d=u.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");n=n?`${n}
${u}`:u,s=s?`${s}
${d}`:d;let _=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(d,o,!0),this.lexer.state.top=_,r.length===0)break;let b=o.at(-1);if(b?.type==="code")break;if(b?.type==="blockquote"){let x=b,A=x.raw+`
`+r.join(`
`),L=this.blockquote(A);o[o.length-1]=L,n=n.substring(0,n.length-x.raw.length)+L.raw,s=s.substring(0,s.length-x.text.length)+L.text;break}else if(b?.type==="list"){let x=b,A=x.raw+`
`+r.join(`
`),L=this.list(A);o[o.length-1]=L,n=n.substring(0,n.length-b.raw.length)+L.raw,s=s.substring(0,s.length-x.raw.length)+L.raw,r=A.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:n,tokens:o,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let r=t[1].trim(),n=r.length>1,s={type:"list",raw:"",ordered:n,start:n?+r.slice(0,-1):"",loose:!1,items:[]};r=n?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=n?r:"[*+-]");let o=this.rules.other.listItemRegex(r),a=!1;for(;e;){let c=!1,u="",d="";if(!(t=o.exec(e))||this.rules.block.hr.test(e))break;u=t[0],e=e.substring(u.length);let _=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,L=>" ".repeat(3*L.length)),b=e.split(`
`,1)[0],x=!_.trim(),A=0;if(this.options.pedantic?(A=2,d=_.trimStart()):x?A=t[1].length+1:(A=t[2].search(this.rules.other.nonSpaceChar),A=A>4?1:A,d=_.slice(A),A+=t[1].length),x&&this.rules.other.blankLine.test(b)&&(u+=b+`
`,e=e.substring(b.length+1),c=!0),!c){let L=this.rules.other.nextBulletRegex(A),G=this.rules.other.hrRegex(A),ne=this.rules.other.fencesBeginRegex(A),re=this.rules.other.headingBeginRegex(A),F=this.rules.other.htmlBeginRegex(A);for(;e;){let q=e.split(`
`,1)[0],I;if(b=q,this.options.pedantic?(b=b.replace(this.rules.other.listReplaceNesting,"  "),I=b):I=b.replace(this.rules.other.tabCharGlobal,"    "),ne.test(b)||re.test(b)||F.test(b)||L.test(b)||G.test(b))break;if(I.search(this.rules.other.nonSpaceChar)>=A||!b.trim())d+=`
`+I.slice(A);else{if(x||_.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||ne.test(_)||re.test(_)||G.test(_))break;d+=`
`+b}!x&&!b.trim()&&(x=!0),u+=q+`
`,e=e.substring(q.length+1),_=I.slice(A)}}s.loose||(a?s.loose=!0:this.rules.other.doubleBlankLine.test(u)&&(a=!0)),s.items.push({type:"list_item",raw:u,task:!!this.options.gfm&&this.rules.other.listIsTask.test(d),loose:!1,text:d,tokens:[]}),s.raw+=u}let l=s.items.at(-1);if(l)l.raw=l.raw.trimEnd(),l.text=l.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let c of s.items){if(this.lexer.state.top=!1,c.tokens=this.lexer.blockTokens(c.text,[]),c.task){if(c.text=c.text.replace(this.rules.other.listReplaceTask,""),c.tokens[0]?.type==="text"||c.tokens[0]?.type==="paragraph"){c.tokens[0].raw=c.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),c.tokens[0].text=c.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let d=this.lexer.inlineQueue.length-1;d>=0;d--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[d].src)){this.lexer.inlineQueue[d].src=this.lexer.inlineQueue[d].src.replace(this.rules.other.listReplaceTask,"");break}}let u=this.rules.other.listTaskCheckbox.exec(c.raw);if(u){let d={type:"checkbox",raw:u[0]+" ",checked:u[0]!=="[ ]"};c.checked=d.checked,s.loose?c.tokens[0]&&["paragraph","text"].includes(c.tokens[0].type)&&"tokens"in c.tokens[0]&&c.tokens[0].tokens?(c.tokens[0].raw=d.raw+c.tokens[0].raw,c.tokens[0].text=d.raw+c.tokens[0].text,c.tokens[0].tokens.unshift(d)):c.tokens.unshift({type:"paragraph",raw:d.raw,text:d.raw,tokens:[d]}):c.tokens.unshift(d)}}if(!s.loose){let u=c.tokens.filter(_=>_.type==="space"),d=u.length>0&&u.some(_=>this.rules.other.anyLine.test(_.raw));s.loose=d}}if(s.loose)for(let c of s.items){c.loose=!0;for(let u of c.tokens)u.type==="text"&&(u.type="paragraph")}return s}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let r=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),n=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:r,raw:t[0],href:n,title:s}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let r=oc(t[1]),n=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(r.length===n.length){for(let a of n)this.rules.other.tableAlignRight.test(a)?o.align.push("right"):this.rules.other.tableAlignCenter.test(a)?o.align.push("center"):this.rules.other.tableAlignLeft.test(a)?o.align.push("left"):o.align.push(null);for(let a=0;a<r.length;a++)o.header.push({text:r[a],tokens:this.lexer.inline(r[a]),header:!0,align:o.align[a]});for(let a of s)o.rows.push(oc(a,o.header.length).map((l,c)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:o.align[c]})));return o}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let r=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:r,tokens:this.lexer.inline(r)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let r=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;let o=Vn(r.slice(0,-1),"\\");if((r.length-o.length)%2===0)return}else{let o=$_(t[2],"()");if(o===-2)return;if(o>-1){let a=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,a).trim(),t[3]=""}}let n=t[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(n);o&&(n=o[1],s=o[3])}else s=t[3]?t[3].slice(1,-1):"";return n=n.trim(),this.rules.other.startAngleBracket.test(n)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?n=n.slice(1):n=n.slice(1,-1)),ac(t,{href:n&&n.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let r;if((r=this.rules.inline.reflink.exec(e))||(r=this.rules.inline.nolink.exec(e))){let n=(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[n.toLowerCase()];if(!s){let o=r[0].charAt(0);return{type:"text",raw:o,text:o}}return ac(r,s,r[0],this.lexer,this.rules)}}emStrong(e,t,r=""){let n=this.rules.inline.emStrongLDelim.exec(e);if(!(!n||n[3]&&r.match(this.rules.other.unicodeAlphaNumeric))&&(!(n[1]||n[2])||!r||this.rules.inline.punctuation.exec(r))){let s=[...n[0]].length-1,o,a,l=s,c=0,u=n[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(u.lastIndex=0,t=t.slice(-1*e.length+s);(n=u.exec(t))!=null;){if(o=n[1]||n[2]||n[3]||n[4]||n[5]||n[6],!o)continue;if(a=[...o].length,n[3]||n[4]){l+=a;continue}else if((n[5]||n[6])&&s%3&&!((s+a)%3)){c+=a;continue}if(l-=a,l>0)continue;a=Math.min(a,a+l+c);let d=[...n[0]][0].length,_=e.slice(0,s+n.index+d+a);if(Math.min(s,a)%2){let x=_.slice(1,-1);return{type:"em",raw:_,text:x,tokens:this.lexer.inlineTokens(x)}}let b=_.slice(2,-2);return{type:"strong",raw:_,text:b,tokens:this.lexer.inlineTokens(b)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let r=t[2].replace(this.rules.other.newLineCharGlobal," "),n=this.rules.other.nonSpaceChar.test(r),s=this.rules.other.startingSpaceChar.test(r)&&this.rules.other.endingSpaceChar.test(r);return n&&s&&(r=r.substring(1,r.length-1)),{type:"codespan",raw:t[0],text:r}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let r,n;return t[2]==="@"?(r=t[1],n="mailto:"+r):(r=t[1],n=r),{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let r,n;if(t[2]==="@")r=t[0],n="mailto:"+r;else{let s;do s=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(s!==t[0]);r=t[0],t[1]==="www."?n="http://"+t[0]:n=t[0]}return{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let r=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:r}}}},cr=class da{constructor(t){ft(this,"tokens");ft(this,"options");ft(this,"state");ft(this,"inlineQueue");ft(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||nn,this.options.tokenizer=this.options.tokenizer||new Xs,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let r={other:Ft,block:Ks.normal,inline:Gn.normal};this.options.pedantic?(r.block=Ks.pedantic,r.inline=Gn.pedantic):this.options.gfm&&(r.block=Ks.gfm,this.options.breaks?r.inline=Gn.breaks:r.inline=Gn.gfm),this.tokenizer.rules=r}static get rules(){return{block:Ks,inline:Gn}}static lex(t,r){return new da(r).lex(t)}static lexInline(t,r){return new da(r).inlineTokens(t)}lex(t){t=t.replace(Ft.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let r=0;r<this.inlineQueue.length;r++){let n=this.inlineQueue[r];this.inlineTokens(n.src,n.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,r=[],n=!1){for(this.options.pedantic&&(t=t.replace(Ft.tabCharGlobal,"    ").replace(Ft.spaceLine,""));t;){let s;if(this.options.extensions?.block?.some(a=>(s=a.call({lexer:this},t,r))?(t=t.substring(s.raw.length),r.push(s),!0):!1))continue;if(s=this.tokenizer.space(t)){t=t.substring(s.raw.length);let a=r.at(-1);s.raw.length===1&&a!==void 0?a.raw+=`
`:r.push(s);continue}if(s=this.tokenizer.code(t)){t=t.substring(s.raw.length);let a=r.at(-1);a?.type==="paragraph"||a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.at(-1).src=a.text):r.push(s);continue}if(s=this.tokenizer.fences(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.heading(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.hr(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.blockquote(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.list(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.html(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.def(t)){t=t.substring(s.raw.length);let a=r.at(-1);a?.type==="paragraph"||a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.raw,this.inlineQueue.at(-1).src=a.text):this.tokens.links[s.tag]||(this.tokens.links[s.tag]={href:s.href,title:s.title},r.push(s));continue}if(s=this.tokenizer.table(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.lheading(t)){t=t.substring(s.raw.length),r.push(s);continue}let o=t;if(this.options.extensions?.startBlock){let a=1/0,l=t.slice(1),c;this.options.extensions.startBlock.forEach(u=>{c=u.call({lexer:this},l),typeof c=="number"&&c>=0&&(a=Math.min(a,c))}),a<1/0&&a>=0&&(o=t.substring(0,a+1))}if(this.state.top&&(s=this.tokenizer.paragraph(o))){let a=r.at(-1);n&&a?.type==="paragraph"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):r.push(s),n=o.length!==t.length,t=t.substring(s.raw.length);continue}if(s=this.tokenizer.text(t)){t=t.substring(s.raw.length);let a=r.at(-1);a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):r.push(s);continue}if(t){let a="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(a);break}else throw new Error(a)}}return this.state.top=!0,r}inline(t,r=[]){return this.inlineQueue.push({src:t,tokens:r}),r}inlineTokens(t,r=[]){let n=t,s=null;if(this.tokens.links){let c=Object.keys(this.tokens.links);if(c.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(n))!=null;)c.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(n=n.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(n))!=null;)n=n.slice(0,s.index)+"++"+n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(n))!=null;)o=s[2]?s[2].length:0,n=n.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let a=!1,l="";for(;t;){a||(l=""),a=!1;let c;if(this.options.extensions?.inline?.some(d=>(c=d.call({lexer:this},t,r))?(t=t.substring(c.raw.length),r.push(c),!0):!1))continue;if(c=this.tokenizer.escape(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.tag(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.link(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(c.raw.length);let d=r.at(-1);c.type==="text"&&d?.type==="text"?(d.raw+=c.raw,d.text+=c.text):r.push(c);continue}if(c=this.tokenizer.emStrong(t,n,l)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.codespan(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.br(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.del(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.autolink(t)){t=t.substring(c.raw.length),r.push(c);continue}if(!this.state.inLink&&(c=this.tokenizer.url(t))){t=t.substring(c.raw.length),r.push(c);continue}let u=t;if(this.options.extensions?.startInline){let d=1/0,_=t.slice(1),b;this.options.extensions.startInline.forEach(x=>{b=x.call({lexer:this},_),typeof b=="number"&&b>=0&&(d=Math.min(d,b))}),d<1/0&&d>=0&&(u=t.substring(0,d+1))}if(c=this.tokenizer.inlineText(u)){t=t.substring(c.raw.length),c.raw.slice(-1)!=="_"&&(l=c.raw.slice(-1)),a=!0;let d=r.at(-1);d?.type==="text"?(d.raw+=c.raw,d.text+=c.text):r.push(c);continue}if(t){let d="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(d);break}else throw new Error(d)}}return r}},Qs=class{constructor(e){ft(this,"options");ft(this,"parser");this.options=e||nn}space(e){return""}code({text:e,lang:t,escaped:r}){let n=(t||"").match(Ft.notSpaceStart)?.[0],s=e.replace(Ft.endingNewline,"")+`
`;return n?'<pre><code class="language-'+Er(n)+'">'+(r?s:Er(s,!0))+`</code></pre>
`:"<pre><code>"+(r?s:Er(s,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}def(e){return""}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return`<hr>
`}list(e){let t=e.ordered,r=e.start,n="";for(let a=0;a<e.items.length;a++){let l=e.items[a];n+=this.listitem(l)}let s=t?"ol":"ul",o=t&&r!==1?' start="'+r+'"':"";return"<"+s+o+`>
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${Er(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:r}){let n=this.parser.parseInline(r),s=sc(e);if(s===null)return n;e=s;let o='<a href="'+e+'"';return t&&(o+=' title="'+Er(t)+'"'),o+=">"+n+"</a>",o}image({href:e,title:t,text:r,tokens:n}){n&&(r=this.parser.parseInline(n,this.parser.textRenderer));let s=sc(e);if(s===null)return Er(r);e=s;let o=`<img src="${e}" alt="${r}"`;return t&&(o+=` title="${Er(t)}"`),o+=">",o}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:Er(e.text)}},wa=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},ur=class pa{constructor(t){ft(this,"options");ft(this,"renderer");ft(this,"textRenderer");this.options=t||nn,this.options.renderer=this.options.renderer||new Qs,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new wa}static parse(t,r){return new pa(r).parse(t)}static parseInline(t,r){return new pa(r).parseInline(t)}parse(t){let r="";for(let n=0;n<t.length;n++){let s=t[n];if(this.options.extensions?.renderers?.[s.type]){let a=s,l=this.options.extensions.renderers[a.type].call({parser:this},a);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(a.type)){r+=l||"";continue}}let o=s;switch(o.type){case"space":{r+=this.renderer.space(o);break}case"hr":{r+=this.renderer.hr(o);break}case"heading":{r+=this.renderer.heading(o);break}case"code":{r+=this.renderer.code(o);break}case"table":{r+=this.renderer.table(o);break}case"blockquote":{r+=this.renderer.blockquote(o);break}case"list":{r+=this.renderer.list(o);break}case"checkbox":{r+=this.renderer.checkbox(o);break}case"html":{r+=this.renderer.html(o);break}case"def":{r+=this.renderer.def(o);break}case"paragraph":{r+=this.renderer.paragraph(o);break}case"text":{r+=this.renderer.text(o);break}default:{let a='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return r}parseInline(t,r=this.renderer){let n="";for(let s=0;s<t.length;s++){let o=t[s];if(this.options.extensions?.renderers?.[o.type]){let l=this.options.extensions.renderers[o.type].call({parser:this},o);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){n+=l||"";continue}}let a=o;switch(a.type){case"escape":{n+=r.text(a);break}case"html":{n+=r.html(a);break}case"link":{n+=r.link(a);break}case"image":{n+=r.image(a);break}case"checkbox":{n+=r.checkbox(a);break}case"strong":{n+=r.strong(a);break}case"em":{n+=r.em(a);break}case"codespan":{n+=r.codespan(a);break}case"br":{n+=r.br(a);break}case"del":{n+=r.del(a);break}case"text":{n+=r.text(a);break}default:{let l='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return n}},Ys,Kn=(Ys=class{constructor(e){ft(this,"options");ft(this,"block");this.options=e||nn}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?cr.lex:cr.lexInline}provideParser(){return this.block?ur.parse:ur.parseInline}},ft(Ys,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),ft(Ys,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),Ys),A_=class{constructor(...e){ft(this,"defaults",fa());ft(this,"options",this.setOptions);ft(this,"parse",this.parseMarkdown(!0));ft(this,"parseInline",this.parseMarkdown(!1));ft(this,"Parser",ur);ft(this,"Renderer",Qs);ft(this,"TextRenderer",wa);ft(this,"Lexer",cr);ft(this,"Tokenizer",Xs);ft(this,"Hooks",Kn);this.use(...e)}walkTokens(e,t){let r=[];for(let n of e)switch(r=r.concat(t.call(this,n)),n.type){case"table":{let s=n;for(let o of s.header)r=r.concat(this.walkTokens(o.tokens,t));for(let o of s.rows)for(let a of o)r=r.concat(this.walkTokens(a.tokens,t));break}case"list":{let s=n;r=r.concat(this.walkTokens(s.items,t));break}default:{let s=n;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let a=s[o].flat(1/0);r=r.concat(this.walkTokens(a,t))}):s.tokens&&(r=r.concat(this.walkTokens(s.tokens,t)))}}return r}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(r=>{let n={...r};if(n.async=this.defaults.async||n.async||!1,r.extensions&&(r.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=t.renderers[s.name];o?t.renderers[s.name]=function(...a){let l=s.renderer.apply(this,a);return l===!1&&(l=o.apply(this,a)),l}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=t[s.level];o?o.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),n.extensions=t),r.renderer){let s=this.defaults.renderer||new Qs(this.defaults);for(let o in r.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let a=o,l=r.renderer[a],c=s[a];s[a]=(...u)=>{let d=l.apply(s,u);return d===!1&&(d=c.apply(s,u)),d||""}}n.renderer=s}if(r.tokenizer){let s=this.defaults.tokenizer||new Xs(this.defaults);for(let o in r.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let a=o,l=r.tokenizer[a],c=s[a];s[a]=(...u)=>{let d=l.apply(s,u);return d===!1&&(d=c.apply(s,u)),d}}n.tokenizer=s}if(r.hooks){let s=this.defaults.hooks||new Kn;for(let o in r.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let a=o,l=r.hooks[a],c=s[a];Kn.passThroughHooks.has(o)?s[a]=u=>{if(this.defaults.async&&Kn.passThroughHooksRespectAsync.has(o))return(async()=>{let _=await l.call(s,u);return c.call(s,_)})();let d=l.call(s,u);return c.call(s,d)}:s[a]=(...u)=>{if(this.defaults.async)return(async()=>{let _=await l.apply(s,u);return _===!1&&(_=await c.apply(s,u)),_})();let d=l.apply(s,u);return d===!1&&(d=c.apply(s,u)),d}}n.hooks=s}if(r.walkTokens){let s=this.defaults.walkTokens,o=r.walkTokens;n.walkTokens=function(a){let l=[];return l.push(o.call(this,a)),s&&(l=l.concat(s.call(this,a))),l}}this.defaults={...this.defaults,...n}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return cr.lex(e,t??this.defaults)}parser(e,t){return ur.parse(e,t??this.defaults)}parseMarkdown(e){return(t,r)=>{let n={...r},s={...this.defaults,...n},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&n.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=e),s.async)return(async()=>{let a=s.hooks?await s.hooks.preprocess(t):t,l=await(s.hooks?await s.hooks.provideLexer():e?cr.lex:cr.lexInline)(a,s),c=s.hooks?await s.hooks.processAllTokens(l):l;s.walkTokens&&await Promise.all(this.walkTokens(c,s.walkTokens));let u=await(s.hooks?await s.hooks.provideParser():e?ur.parse:ur.parseInline)(c,s);return s.hooks?await s.hooks.postprocess(u):u})().catch(o);try{s.hooks&&(t=s.hooks.preprocess(t));let a=(s.hooks?s.hooks.provideLexer():e?cr.lex:cr.lexInline)(t,s);s.hooks&&(a=s.hooks.processAllTokens(a)),s.walkTokens&&this.walkTokens(a,s.walkTokens);let l=(s.hooks?s.hooks.provideParser():e?ur.parse:ur.parseInline)(a,s);return s.hooks&&(l=s.hooks.postprocess(l)),l}catch(a){return o(a)}}}onError(e,t){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let n="<p>An error occurred:</p><pre>"+Er(r.message+"",!0)+"</pre>";return t?Promise.resolve(n):n}if(t)return Promise.reject(r);throw r}}},rn=new A_;function pt(e,t){return rn.parse(e,t)}pt.options=pt.setOptions=function(e){return rn.setOptions(e),pt.defaults=rn.defaults,ic(pt.defaults),pt};pt.getDefaults=fa;pt.defaults=nn;pt.use=function(...e){return rn.use(...e),pt.defaults=rn.defaults,ic(pt.defaults),pt};pt.walkTokens=function(e,t){return rn.walkTokens(e,t)};pt.parseInline=rn.parseInline;pt.Parser=ur;pt.parser=ur.parse;pt.Renderer=Qs;pt.TextRenderer=wa;pt.Lexer=cr;pt.lexer=cr.lex;pt.Tokenizer=Xs;pt.Hooks=Kn;pt.parse=pt;var _y=pt.options,my=pt.setOptions,gy=pt.use,by=pt.walkTokens,hy=pt.parseInline;var yy=ur.parse,vy=cr.lex;function qr(e){let t=pt.parse(e),r=Jl.sanitize(t);return ec(r)}function Tr(e,t){return i`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function En(e){return e.loading?i`<div class="prompt-block__status">불러오는 중…</div>`:e.error?i`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function to(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=n=>String(n).padStart(2,"0");return`${t.getFullYear()}-${r(t.getMonth()+1)}-${r(t.getDate())} ${r(t.getHours())}:${r(t.getMinutes())}`}var S_={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},E_={command_execution:"\uBA85\uB839 \uC2E4\uD589",file_change:"\uD30C\uC77C \uBCC0\uACBD",mcp_call:"MCP \uD638\uCD9C",web_search:"\uC6F9 \uAC80\uC0C9",plan:"\uACC4\uD68D"},T_=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,C_=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function hr(e){return!!e&&typeof e=="object"}function ka(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function hc(e,t){let r=ka(e),n=ka(t),s=new Map;for(let l of r)s.set(l,(s.get(l)||0)+1);let o=0;for(let l of n){let c=s.get(l)||0;c>0?s.set(l,c-1):o+=1}let a=0;for(let l of s.values())a+=l;return{added:o,removed:a}}function R_(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(s=>hr(s)&&typeof s.text=="string"?s.text:"").join(""):hr(e)&&typeof e.text=="string"&&(t=e.text);let n=(String(t).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return n.length>120?`${n.slice(0,117)}\u2026`:n}function I_(e){let t=String(e.name||""),r=e.input||{},n={kind:"tool",tool:t,icon:S_[t]||"\u{1F527}",input:r,expandable:!0};if((t==="Read"||t==="Write")&&(n.path=String(r.file_path||r.path||"")),t==="Write"&&(n.added=ka(r.content).length),t==="Edit"){n.path=String(r.file_path||r.path||"");let{added:s,removed:o}=hc(r.old_string,r.new_string);n.added=s,n.removed=o}if(t==="MultiEdit"){n.path=String(r.file_path||r.path||"");let s=0,o=0,a=Array.isArray(r.edits)?r.edits:[];for(let l of a){let c=hc(hr(l)?l.old_string:"",hr(l)?l.new_string:"");s+=c.added,o+=c.removed}n.added=s,n.removed=o}return t==="Bash"&&(n.command=String(r.command||"")),(t==="Grep"||t==="Glob")&&(n.command=String(r.pattern||r.query||"")),n}function $a(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}function xa(e){let t=e.split(/\r?\n/).find(n=>n.trim().length>0)||"",r=T_.exec(t);return r?{kind:"gate",gate:r[2]==="implementation"?"impl":r[2],reviewer:r[3],verdict:r[4],time:r[5]?r[5].trim():void 0,text:t.trim()}:C_.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function L_(e,t){if(e.type==="assistant"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[],s=[];for(let o of n)if(hr(o)){if(o.type==="text"&&typeof o.text=="string")s.push(xa(o.text));else if(o.type==="thinking"){let a=$a(o.thinking);a&&s.push(a)}else if(o.type==="tool_use"){let a=I_(o);typeof o.id=="string"&&t.set(o.id,a),s.push(a)}}return s}if(e.type==="user"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[];for(let s of n)if(hr(s)&&s.type==="tool_result"){let o=t.get(String(s.tool_use_id));if(o){let a=R_(s.content);o.result=a,o.output=typeof s.content=="string"?s.content:a}}return[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success";return[{kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""}]}return[]}function O_(e){if(e.type==="item.completed"&&hr(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[xa(t.text)];if(t.type==="reasoning"){let r=$a(t.text);return r?[r]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function M_(e){if(e.schema!=="codex-delegation-monitor-v1"||!hr(e.event))return[];let t=e.event;if(t.type==="session.started"||t.type==="turn.started")return[];if((t.type==="item.started"||t.type==="item.completed")&&hr(t.item)){let r=t.item;if(typeof r.id!="string"||r.id.length===0)return[];if(t.type==="item.completed"&&r.kind==="agent_message"&&typeof r.text=="string"&&r.text.trim().length>0)return[xa(r.text)];if(t.type==="item.completed"&&r.kind==="reasoning"){let l=$a(r.text);return l?[l]:[]}if(r.kind!=="activity"||typeof r.activity!="string")return[];let n=E_[r.activity];if(!n)return[];let s="\uC2DC\uC791",o="\u2026",a={kind:"tool",tool:"",icon:o,expandable:!1};if(t.type==="item.completed"){if(r.status==="completed")s="\uC644\uB8CC",o="\u2713";else if(r.status==="failed")s="\uC2E4\uD328",o="\u2717";else return[];a.result=""}return a.tool=`${n} \xB7 ${s}`,a.icon=o,[a]}return t.type==="turn.completed"&&t.status==="completed"?[{kind:"result",success:!0,text:"DONE"}]:t.type==="turn.failed"&&(t.status==="failed"||t.status==="interrupted")&&typeof t.error_code=="string"&&t.error_code.length>0?[{kind:"error",text:t.error_code}]:[]}function P_(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function yc(e){let t=[],r=new Map,n=Array.isArray(e)?e:[];for(let s of n){let o=s;if(typeof s=="string"){let l=s.trim();if(l.length===0)continue;try{o=JSON.parse(l)}catch{continue}}if(!hr(o))continue;let a=o.schema==="codex-delegation-monitor-v1"?M_(o):P_(o)?O_(o):L_(o,r);for(let l of a)t.push(l)}return t}var D_=5,N_=10,q_=/Task\s+#(\d+)/,F_=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,j_=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function ro(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function B_(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function U_(e){for(let t=e.length-1;t>=0;t-=1){let r=e[t];if(r.kind==="phase"||r.kind==="gate")return r.text||null}return null}function W_(e){let t=new Map,r=0;for(let s of e){if(s.kind!=="tool")continue;r+=1;let o=s.input||{};if(s.tool==="TaskCreate"){let c=q_.exec(s.output||s.result||""),u=String(o.activeForm||o.subject||"").trim();if(!c||u.length===0)continue;t.set(c[1],{label:u,active:o.status==="in_progress"?r:0});continue}if(s.tool!=="TaskUpdate")continue;let a=t.get(String(o.taskId??""));if(!a)continue;let l=o.activeForm||o.subject;typeof l=="string"&&l.trim().length>0&&(a.label=l.trim()),typeof o.status=="string"&&(a.active=o.status==="in_progress"?r:0)}let n=null;for(let s of t.values())s.active>0&&(!n||s.active>n.active)&&(n=s);return n?n.label:null}function z_(e){if(e.tool==="Bash"){let t=e.command||"";return F_.test(t)?"~ PR/\uAC8C\uC2DC \uC911":j_.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function H_(e){let t=e.filter(s=>s.kind==="tool").slice(-N_),r=new Map;t.forEach((s,o)=>{let a=z_(s);if(!a)return;let l=r.get(a)||{count:0,last:-1};l.count+=1,l.last=o,r.set(a,l)});let n=null;for(let[s,o]of r)(!n||o.count>n.count||o.count===n.count&&o.last>n.last)&&(n={label:s,count:o.count,last:o.last});return n?n.label:null}function G_(e){let t=U_(e);if(t)return{text:t,guess:!1};let r=W_(e);if(r)return{text:r,guess:!1};let n=H_(e);return n?{text:n,guess:!0}:null}function V_(e,t){if(typeof e!="number")return"";let r=Math.max(0,Math.floor((t-e)/1e3));return r<60?`${r}\uCD08 \uC804`:Gt(e,t)}function no(e,t={}){let{transport:r,sessionLogStore:n,onClose:s}=t,o=null,a=null,l=null,c=!1,u={},d=!0,_=new Set,b=new Set,x=null,A=null,L=!1,G=!1,ne=!1,re=null,F=null;function q(){L=!1,G=!1,ne=!1,re=null,F=null}async function I(K){if(r){G=!0,ne=!1,ue();try{let X=await Promise.resolve(r("get-attempt-prompt",{attempt_id:K}));if(o!==K)return;!X||typeof X!="object"||Array.isArray(X)?ne=!0:(re=X,F=K)}catch{o===K&&(ne=!0)}finally{o===K&&(G=!1,ue())}}}function B(){if(L=!L,L&&o&&F!==o){I(o);return}ue()}function m(){if(!L)return"";let K=En({loading:G,error:ne});if(K)return i`<div class="sv__prompt" data-seam="attempt-prompt">
        ${K}
      </div>`;if(!re)return"";if(re.missing)return i`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let X=to(re.recorded_at);return i`<div class="sv__prompt" data-seam="attempt-prompt">
      ${X?i`<div class="prompt-block__meta">${X} 발송</div>`:""}
      ${typeof re.task_prompt=="string"?Tr("\uACFC\uC5C5 (user)",re.task_prompt):""}
      ${typeof re.system_prompt=="string"?Tr("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",re.system_prompt):""}
    </div>`}function S(){if(!l||!n)return[];let K=n.get(l);return yc(K?K.lines:[])}function Z(){if(!l||!n)return null;let K=n.get(l),X=K?K.last_event_at:null;return typeof X=="number"?X:null}function ie(){return u.status==="running"}function D(){if(ie()&&o){A||(A=setInterval(()=>ue(),1e3));return}U()}function U(){A&&(clearInterval(A),A=null)}function _e(K){let X=[],$e=0;for(;$e<K.length;){let Oe=K[$e];if(Oe.kind==="tool"){let je=$e;for(;je<K.length&&K[je].kind==="tool"&&K[je].tool===Oe.tool;)je+=1;if(je-$e>=D_&&!b.has($e)){X.push({kind:"group",idx:$e,tool:Oe.tool||"",lines:K.slice($e,je).map((ze,Ue)=>({idx:$e+Ue,line:ze}))}),$e=je;continue}}X.push({kind:"line",idx:$e,line:Oe}),$e+=1}return X}function we(K){for(let X=K.length-1;X>=0;X-=1){let $e=K[X];if($e.kind==="result"||$e.kind==="error")return null;if($e.kind==="tool"&&!Object.hasOwn($e,"result"))return $e}return null}function ke(K){for(let X=K.length-1;X>=0;X-=1)if(K[X].kind==="thinking")return K[X];return null}function xe(K,X){if(X.kind==="gate")return i`<div class="sv__gate">${X.text}</div>`;if(X.kind==="phase")return i`<div class="sv__phase">${X.text}</div>`;if(X.kind==="result")return i`<div
        class="sv__result${X.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${X.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${qr(X.text||(X.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(X.kind==="thinking"){let $e=_.has(K);return i`<div
        class="sv__think${$e?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>Le(K)}
      >
        <span class="sv__think-line">💭 ${ro(X.text)}</span>
        ${$e?i`<pre class="sv__think-expand">${X.text}</pre>`:""}
      </div>`}if(X.kind==="error")return i`<div class="sv__error">⛔ ${X.text}</div>`;if(X.kind==="blocker")return i`<div class="sv__error">⛔ ${X.text}</div>`;if(X.kind==="tool"){let $e=_.has(K),Oe=X.tool==="Bash"?B_(X.command):0,je=X.tool==="Bash"?Oe>1?ro(X.command):X.command:X.path||X.command||"";return i`<div
        class="sv__tool${$e?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>Le(K)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${X.icon}</span>
          <span class="sv__tool-name">${X.tool}</span>
          ${je?i`<span class="sv__tool-detail">${je}</span>`:""}
          ${Oe>1?i`<span class="sv__tool-more">⋯ ${Oe}줄</span>`:""}
          ${typeof X.added=="number"?i`<span class="sv__diff-add">+${X.added}</span>`:""}
          ${typeof X.removed=="number"?i`<span class="sv__diff-del">−${X.removed}</span>`:""}
          ${X.result?i`<span class="sv__tool-ok">→ ${X.result}</span>`:""}
        </span>
        ${$e?i`<pre class="sv__tool-expand">${We(X)}</pre>`:""}
      </div>`}return i`<div class="sv__as">${qr(X.text||"")}</div>`}function We(K){let X=[];if(K.tool==="Bash"&&typeof K.command=="string"&&K.command.length>0)X.push(K.command);else if(K.input!==void 0)try{X.push(`input: ${JSON.stringify(K.input,null,2)}`)}catch{}return typeof K.output=="string"&&K.output.length>0&&X.push(`output:
${K.output}`),X.join(`

`)}function rt(){if(!o)return i``;let K=S(),X=(a?[u.model,u.effort]:[u.runner,u.model,u.effort]).filter(Boolean).join(" \xB7 "),$e=u.session_id||"",Oe=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${d?"ON":"OFF"}`,je=ie(),ze=je?V_(Z(),Date.now()):"",Ue=je?we(K):null,lt=je?ke(K):null,ut=G_(K);return i`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id">${a?u.role||"":o}</span>
        ${ut?i`<span
              class="sv__stage${ut.guess?" sv__stage--guess":""}"
              title=${ut.text}
              >${ut.text}</span
            >`:""}
        ${je?i`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${ze?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${ze}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${ze?i`<span class="sv__live-ago">${ze}</span>`:""}</span
            >`:""}
        ${$e?i`<button
              type="button"
              class="sv__session"
              title=${$e}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${$e}`}
              @click=${()=>Ie($e)}
            >
              ⧉ ${$e.slice(0,8)}
            </button>`:""}
        ${X?i`<span class="sv__meta">${X}</span>`:""}
        ${u.worktree?i`<span class="sv__wt" title=${u.worktree}
              >${u.worktree}</span
            >`:""}
        ${a||c?"":i`<button
              type="button"
              class="sv__prompt-toggle${L?" sv__prompt-toggle--on":""}"
              data-seam="attempt-prompt-toggle"
              aria-pressed=${L?"true":"false"}
              aria-label="발송 프롬프트 보기"
              title="이 세션에 실제로 보낸 시스템·과업 프롬프트"
              @click=${B}
            >
              ✉ 프롬프트
            </button>`}
        <button
          type="button"
          class="sv__follow${d?" sv__follow--on":""}"
          aria-pressed=${d?"true":"false"}
          aria-label=${Oe}
          @click=${Ge}
        >
          <span class="sv__follow-full">⇣ ${Oe}</span>
          <span class="sv__follow-short">⇣ ${d?"ON":"OFF"}</span>
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
      ${a||c?"":m()}
      <div class="sv__body">
        ${K.length===0?i`<div class="sv__empty">세션 로그 없음</div>`:_e(K).map(W=>W.kind==="group"?Ne(W):xe(W.idx,W.line))}
      </div>
      ${Ue||lt?i`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${Ue?i`<span class="sv__now-icon">${Ue.icon}</span>
                  <span class="sv__now-name">${Ue.tool}</span>
                  <span class="sv__now-detail"
                    >${Ue.tool==="Bash"?ro(Ue.command):Ue.path||Ue.command||""}</span
                  >`:""}
            ${lt?i`<span class="sv__now-think"
                  >💭 ${ro(lt.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function Ne(K){return i`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>He(K.idx)}
    >
      <span class="sv__group-icon">${K.lines[0].line.icon}</span>
      <span class="sv__group-name">${K.tool}</span>
      <span class="sv__group-count">${K.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function He(K){b.add(K),ue()}function ue(){Ze(rt(),e),D(),d&&Fe()}function Fe(){let K=e.querySelector(".sv__body");K&&(K.scrollTop=K.scrollHeight)}function Le(K){_.has(K)?_.delete(K):_.add(K),ue()}function Ge(){d=!d,ue()}function Ie(K){ar(K).then(X=>{X?ce("\uBCF5\uC0AC\uB428","success",1200):ce("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function Ve(K){!o||!K||(u={...u,...K},ue())}function st(K){let X=K.target;if(!X||!X.classList||!X.classList.contains("sv__body"))return;!(X.scrollHeight-X.scrollTop-X.clientHeight<=4)&&d&&(d=!1,ue())}e.addEventListener("scroll",st,!0);function Ce(K){let X=K&&K.attempt_id;if(!X)return;let $e=l;o=X,a=typeof K.launch_id=="string"&&K.launch_id.length>0?K.launch_id:null,l=a?`session-log:${o}:${a}`:`session-log:${o}`,r&&$e&&$e!==l&&Promise.resolve(r("unsubscribe-session-log",{id:$e})).catch(()=>{}),u=K.meta||{},c=K.hide_prompt===!0,d=!0,_.clear(),b.clear(),q(),!x&&n&&(x=n.subscribe(ue)),r&&Promise.resolve(r("subscribe-session-log",{id:l,attempt_id:o,...a?{launch_id:a}:{}})).catch(()=>{}),ue()}function Xe(){let K=l;o=null,a=null,l=null,c=!1,_.clear(),b.clear(),q(),U(),r&&K&&Promise.resolve(r("unsubscribe-session-log",{id:K})).catch(()=>{}),Ze(i``,e),s&&s()}return{open:Ce,updateMeta:Ve,close:Xe,isOpen(){return o!==null},destroy(){U(),x&&(x(),x=null),e.removeEventListener("scroll",st,!0),o=null,a=null,l=null,c=!1,Ze(i``,e)}}}function so(e){let t=e&&typeof e=="object"?e:{},r=t.metadata&&typeof t.metadata=="object"?t.metadata:{},n=Aa(t.spec_id),s=Aa(r.spec_id);return n?{path:n,source:"native",conflict:s.length>0&&s!==n}:s?{path:s,source:"metadata",conflict:!1}:{path:"",source:"none",conflict:!1}}function Aa(e){return typeof e=="string"?e.trim():""}function vc(e){let t=so(e);if(t.path)return t;let r=Aa(K_(e).spec_path);return r?{path:r,source:"draft",conflict:!1}:t}function K_(e){let t=e&&typeof e=="object"?e:{};return t.metadata&&typeof t.metadata=="object"?t.metadata:{}}function Y_(e){return["plan_review","plan_approval","plan_check"].some(t=>{let r=e[t];return typeof r=="string"&&r.trim().length>0})}function Z_(e){let t=e&&e.metadata||{},r=vc(e),n=[];return r.path&&n.push({kind:"spec",path:r.path,missing_state:r.source==="draft"?"spec_draft":null}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&n.push({kind:"plan",path:t.plan_path.trim(),missing_state:Y_(t)?null:"plan_pending"}),n}function wc(e,t){let r=Z_(e);return i`
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
  `}var X_="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",Q_=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,J_=/^\*\*결론\*\* — (.+)$/;function oo(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==X_)return null;let r=Q_.exec(t[1]||"");if(!r)return null;let n=r[1].split(" ")[0],s=r[2],o=r[3],a=2;for(;a<t.length&&t[a].trim().length===0;)a+=1;let l=a<t.length?J_.exec(t[a]):null,c=l?l[1].replace(/\s+/g," ").trim():"",u=l?a+1:a;return{lane:n,identifier:s,timestamp:o,conclusion:c,body:t.slice(u).join(`
`).trim()}}var kc=20;function $c(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let r=String(t.getMonth()+1).padStart(2,"0"),n=String(t.getDate()).padStart(2,"0"),s=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0");return`${r}-${n} ${s}:${o}`}function em(e){return e.length>kc?`${e.slice(0,kc)}\u2026`:e}function tm(e,t,r,n){let s=`${t.lane} ${em(t.identifier)}`;return i`<div class="detail-report">
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
        <span class="detail-report__time">${$c(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${n&&t.body.length>0?i`<div class="detail-report__body">
          ${qr(t.body)}
        </div>`:""}
  </div>`}function rm(e){return i`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${$c(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${qr(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function xc(e,t={},r={}){let n=Array.isArray(e)?e.filter(Boolean):[],s=r.expanded||new Set,o=typeof r.draft=="string"?r.draft:"",a=r.sending===!0,l=n.slice().sort((c,u)=>String(u.created_at||"").localeCompare(String(c.created_at||"")));return i`
    <div class="detail-section-label">댓글 (${n.length})</div>
    ${r.error?i`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:l.length===0?i`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:i`<div class="detail-comments" data-seam="comments">
            ${l.map(c=>{let u=oo(typeof c.text=="string"?c.text:"");return u?tm(c,u,t,s.has(c.id)):rm(c)})}
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
  `}var{I:Jy}=Gi;var Ac=e=>e.strings===void 0;var nm={},Sc=(e,t=nm)=>e._$AH=t;var sn=Vs(class extends Sn{constructor(e){if(super(e),e.type!==Sr.PROPERTY&&e.type!==Sr.ATTRIBUTE&&e.type!==Sr.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!Ac(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===Xt||t===kt)return t;let r=e.element,n=e.name;if(e.type===Sr.PROPERTY){if(t===r[n])return Xt}else if(e.type===Sr.BOOLEAN_ATTRIBUTE){if(!!t===r.hasAttribute(n))return Xt}else if(e.type===Sr.ATTRIBUTE&&r.getAttribute(n)===t+"")return Xt;return Sc(e),t}});var ao=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"],Ea=[...ao.filter(e=>e!=="impl_dispatch"),"quick_fix_impl_model"],Cr=["orchestration_model","orchestration_effort","orchestration_speed"],io=[...ao,...Cr],sm=Ea.filter(e=>io.includes(e)),Ec=["delegated","main"],lo=["inherit","claude","codex"],Xn=["default","fast"],Qn=["standard","fast_track"],Jn=["codex","opus","fable","self","skip"],co=["codex","fable","skip"],uo=["low","medium","high","xhigh"],Kt="auto";function Vt(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Tc(e){if(!Vt(e)||!Vt(e.runners))return[];let t=[];for(let[r,n]of Object.entries(e.runners))Vt(n)&&Vt(n.models)&&t.push([r,Object.keys(n.models)]);return t}function Tn(e,t){let r=Tc(e),n=t&&t!=="inherit"?r.filter(([s])=>s===t):r;return[Kt,...n.flatMap(([,s])=>s)]}function Cc(e,t,r,n){if(!Vt(e)||!Vt(e.runners))return[Kt];let s=[];for(let[o,a]of Object.entries(e.runners))if(!(!Vt(a)||!Vt(a.models))&&!(t&&t!=="inherit"&&o!==t))for(let[l,c]of Object.entries(a.models)){if(r&&r!==Kt&&l!==r)continue;let u=n(a,c);if(Array.isArray(u))for(let d of u)typeof d=="string"&&!s.includes(d)&&s.push(d)}return[Kt,...s]}function Cn(e,t,r){return Cc(e,t,r,(n,s)=>Vt(s)&&Array.isArray(s.efforts)?s.efforts:n.efforts)}function Ta(e,t,r){return Cc(e,t,r,(n,s)=>Vt(s)&&Array.isArray(s.orchestration_efforts)?s.orchestration_efforts:Vt(s)&&Array.isArray(s.efforts)?s.efforts:n.efforts)}function es(e,t){let r=Tc(e);return(t?r.filter(([s])=>s===t):r).flatMap(([,s])=>s)}function Rc(e,t,r){let n={impl_runtime:e?.impl_runtime,impl_model:e?.impl_model,impl_effort:e?.impl_effort},s=n.impl_runtime==="claude"||n.impl_runtime==="codex"?n.impl_runtime:n.impl_runtime==="inherit"?r:null;return s&&(n.impl_model&&!Tn(t,s).includes(n.impl_model)&&(n.impl_model=void 0),n.impl_effort&&!Cn(t,s,n.impl_model||Kt).includes(n.impl_effort)&&(n.impl_effort=void 0)),n}var om={workflow_mode:"\uC6CC\uD06C\uD50C\uB85C \uBAA8\uB4DC",spec_review_model:"\uC2A4\uD399 \uB9AC\uBDF0\uC5B4",spec_review_effort:"\uC2A4\uD399 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0\uC5B4",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0\uC5B4",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uAD6C\uD604 \uBAA8\uB378",impl_effort:"\uAD6C\uD604 effort",impl_speed:"\uAD6C\uD604 \uC18D\uB3C4",orchestration_model:"\uC6CC\uCEE4 \uBAA8\uB378",orchestration_effort:"\uC6CC\uCEE4 effort",orchestration_speed:"\uC6CC\uCEE4 \uC18D\uB3C4"},Sa=[...sm,...Cr],am=[...io,...Ea].filter((e,t,r)=>r.indexOf(e)===t&&!Sa.includes(e));function Ic(e,t){let r=Vt(e)?e:{},n=Vt(t)?t:{},s=[];for(let a of Sa){let l=r[a]??null,c=n[a]??null;l!==c&&s.push({key:a,label:om[a]||a,before:l,after:c,kind:l===null?"added":c===null?"removed":"changed"})}let o=[];for(let a of[...am,...Object.keys(n)])!Sa.includes(a)&&!o.includes(a)&&Object.hasOwn(n,a)&&o.push(a);return{rows:s,ignored_keys:o}}function Ca(e,t,r,n,s,o){return Bs({key:e,choices:t,layer:"global",global:r,resolution_global:o,execution_defaults:n,runner_catalog:s})}function Lc(e,t){let r={};for(let n of Ea){let s=e?.[n],o=t?.[n];s!==o&&(r[n]=typeof o=="string"&&o.length>0?o:null)}return r}function Oc(e,t){let r={};for(let n of Cr){let s=e?.[n]??null,o=t?.[n]??null;s!==o&&(r[n]=typeof o=="string"&&o.length>0?o:null)}return r}var Ra=[{id:"workflow",label:"\uC6CC\uD06C\uD50C\uB85C\uC6B0",keys:["workflow_mode"]},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort"]},{id:"implementation",label:"\uAD6C\uD604",keys:["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]},{id:"worker",label:"Worker",keys:[...Cr]}],Fr={workflow_mode:"\uBAA8\uB4DC",spec_review_model:"\uC0AC\uC591 \uB9AC\uBDF0",spec_review_effort:"\uC0AC\uC591 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_dispatch:"\uC2E4\uD589 \uBC29\uC2DD",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uBAA8\uB378",impl_effort:"effort",impl_speed:"\uC18D\uB3C4",orchestration_model:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",orchestration_effort:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",orchestration_speed:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4"},po={pin:"\uD540",global:"\uC804\uC5ED",base:"\uAE30\uBCF8"};function Ia(e,t,r,n,s,o=null){let a=br({pin:t,global:r,execution_defaults:n,runner_catalog:s,route:t&&typeof t.route=="string"?t.route:null,controller_runtime:o});return e.map(l=>({key:l,...a[l]}))}function Mc(e,t,r,n,s,o=null){let a={pin:0,global:0,base:0};for(let l of Ia(e,t,r,n,s,o))a[l.source]+=1;return a}function Pc(e,t,r){return{id:e,key:t,value:typeof r=="string"?r:""}}function Dc(e,t,r){return typeof t!="string"||t.length===0?null:{id:e,preset_id:t,expected_revision:r}}var uv=[...ao,...Cr];var im=[{id:"spec",label:"spec \uB9AC\uBDF0",receipt:"spec_review"},{id:"impl",label:"\uAD6C\uD604",receipt:null},{id:"impl_review",label:"impl \uB9AC\uBDF0",receipt:"impl_review"},{id:"pr",label:"PR",receipt:null}],lm={pin:"pin",global:"global",base:"base"};function cm(e){return i`<span
    class=${`detail-layer-rail detail-layer-rail--${lm[e]}`}
    data-source=${e}
    aria-hidden="true"
    ><i></i><i></i><i></i
  ></span>`}function um(e,t,r){switch(e){case"workflow_mode":return Qn;case"spec_review_model":case"impl_review_model":return Jn;case"plan_review_model":return co;case"spec_review_effort":case"plan_review_effort":case"impl_review_effort":return uo;case"impl_dispatch":return Ec;case"impl_runtime":return lo;case"impl_model":return Tn(r,t.impl_runtime);case"impl_effort":return Cn(r,t.impl_runtime,t.impl_model);case"impl_speed":case"orchestration_speed":return Xn;case"orchestration_model":return es(r,null);case"orchestration_effort":return Cn(r,void 0,t.orchestration_model||Kt).filter(n=>n!==Kt);default:return[]}}function dm(e,t){return i`<div class="detail-effective__row" data-key=${e.key}>
    ${cm(e.source)}
    <span class="detail-effective__k"
      >${Fr[e.key]||e.key}</span
    >
    <span
      class=${`detail-effective__v${e.source==="base"?" detail-effective__v--dim":""}`}
      title=${e.full_value||""}
      >${e.display}</span
    >
    <span
      class=${`detail-effective__badge detail-effective__badge--${e.source}`}
      >${po[e.source]}</span
    >
    ${t.expanded?i`<select
          class="detail-effective__edit"
          data-edit-key=${e.key}
          aria-label=${`${Fr[e.key]||e.key} \uD3B8\uC9D1`}
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
  </div>`}function Nc(e,t){let r=Ra.flatMap(c=>c.keys),n=Ia(r,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),s=Mc(r,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),o=Object.fromEntries(n.map(c=>[c.key,c])),a=Object.fromEntries(n.filter(c=>c.value!==null).map(c=>[c.key,c.value])),l=n.filter(c=>c.full_value&&c.display!==c.full_value).map(c=>c.full_value).join(" \xB7 ");return i`<details
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
      <span class="detail-effective__summary" title=${l}
        >${pm(o)}</span
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
          ${Ra.map(c=>i`
              <div class="detail-effective__subhead">${c.label}</div>
              ${n.filter(u=>c.keys.includes(u.key)).map(u=>{let d=Bs({key:u.key,choices:um(u.key,a,e.catalog),layer:"pin",pin:e.metadata,global:e.workspace_values,execution_defaults:e.execution_defaults,runner_catalog:e.catalog,route:typeof e.metadata?.route=="string"?e.metadata.route:null,controller_runtime:e.controller_runtime||null});return dm(u,{expanded:e.expanded,options:d.options,default_label:d.unset_label,default_full_value:d.full_value,onEdit:t.onEdit})})}
            `)}
          <div class="detail-effective__foot">
            <select
              data-impl-preset-select
              aria-label="실행 프리셋"
              .value=${sn(e.preset_id)}
              ?disabled=${e.preset_busy}
              @change=${c=>t.onPresetSelect(String(c.target.value))}
            >
              <option value="" ?selected=${e.preset_id===""}>
                실행 프리셋…
              </option>
              ${e.presets.map(c=>i`<option
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
            ${(e.skipped_orchestration_keys||[]).length>0?i`<span
                  class="detail-effective__hint"
                  data-preset-skip-notice
                  >오케스트레이션 3키는 Bead에 핀할 수 없어 건너뜀</span
                >`:""}
          </div>
        </div>`:""}
  </details>`}function pm(e){let t=[];if(e.workflow_mode&&t.push(e.workflow_mode.display),e.impl_dispatch?.value==="main")t.push("\uBA54\uC778");else if(e.impl_dispatch?.value==="delegated"){let r=e.impl_runtime?` ${e.impl_runtime.display}`:"";t.push(`\uC704\uC784${r}`)}for(let r of["impl_model","impl_effort","impl_speed"])e[r]?.resolution!=="not_applicable"&&t.push(e[r]?.display||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00");return t.join(" \xB7 ")}function fm(e){if(!e||typeof e!="object")return null;let{kind:t,actor:r,effort:n,sha:s}=e;return typeof t!="string"||typeof r!="string"||typeof s!="string"?null:{kind:t,actor:r,effort:typeof n=="string"?n:null,sha:s}}function qc(e){let t=e&&typeof e.metadata=="object"&&e.metadata?e.metadata:{},r=e&&typeof e.workflow=="object"&&e.workflow?e.workflow:{},n=r.stages||{},s=r.route||t.route||null,o=typeof t.pr_url=="string"?t.pr_url:"",a=typeof t.exec_receipt=="string"?t.exec_receipt:"",l=fm(r.exec_receipt),c=l?tn(l):a,u=l?`${l.kind}:${l.actor}`:a.split("@")[0],d=Fs(r.planned_execution,r.exec_receipt);return i`<section class="detail-summary" data-seam="detail-summary">
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
      ${d?i`<span
            class="detail-summary__chip detail-summary__chip--planned ctl-chip--planned"
            data-kind=${d.kind}
            title=${d.title}
            >${d.label}</span
          >`:""}
      ${c?i`<span
            class="detail-summary__chip detail-summary__chip--receipt"
            title=${c}
            >${u}${l?.effort?i`${" "}<span
                    class="detail-summary__chip-effort"
                    data-seam="exec-receipt-effort"
                    >${l.effort}</span
                  >`:""}</span
          >`:""}
    </div>
    <div class="detail-summary__gates">
      ${im.map(_=>{let b=_.receipt&&typeof t[_.receipt]=="string"?String(t[_.receipt]):"",x=n[_.id],A=b.length>0||x?.fill==="full",L=!A&&x?.fill==="dim",G=x?.stale===!0;return i`<span
          class=${`detail-summary__gate${A?" detail-summary__gate--on":""}${L?" detail-summary__gate--current":""}${G?" detail-summary__gate--stale":""}`}
          data-gate=${_.id}
        >
          <span class="detail-summary__gate-pill">${_.label}</span>
          ${b?i`<span class="detail-summary__gate-sha"
                >${b.split("@")[1]?.slice(0,7)||""}</span
              >`:""}
        </span>`})}
    </div>
  </section>`}function Uc(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Fc(e){return Uc(e)&&typeof e.key=="string"&&e.key.length>0&&typeof e.email=="string"&&e.email.length>0}function jc(e,t){let r=e&&e[t];if(!Uc(r)||!Array.isArray(r.accounts))return null;let n=r.accounts.filter(Fc),s=Fc(r.active)?r.active:null;return{accounts:n,active:s||n.find(o=>o.active===!0)||null}}function Wc(e){return typeof e.alias=="string"&&e.alias.length>0?` (${e.alias})`:""}function _m(e){let t=typeof e.status=="string"&&e.status!=="ok"?` \xB7 ${e.status}`:"";return`${e.email}${Wc(e)}${t}`}function zc(e){let t=typeof e.plan=="string"&&e.plan.length>0?e.plan:"plan \uD655\uC778 \uBD88\uAC00";return`${e.email} \xB7 ${t}${Wc(e)}`}function mm(e,t){return t?t.active?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${e==="claude"?t.active.email:zc({...t.active,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)":"(\uAE30\uBCF8)"}function Bc(e){let t=e.provider_key==="claude"?_m:zc,r=!!e.provider?.accounts.some(n=>n.key===e.selected);return i`<div class="detail-kv" data-exec-account-row=${e.key}>
    <span class="detail-kv__k">${e.title}</span>
    <span class="detail-kv__vgroup">
      <select
        class=${e.selected?"detail-kv__v detail-kv__v--sel":"detail-kv__v"}
        aria-label=${e.title}
        data-exec-key=${e.key}
        @change=${n=>e.handlers.onExecChange(e.key,n.target.value)}
      >
        <option value="" ?selected=${e.selected.length===0}>
          ${mm(e.provider_key,e.provider)}
        </option>
        ${e.selected&&!r?i`<option value=${e.selected} selected>
              ${e.selected} (목록에 없음)
            </option>`:""}
        ${e.provider?.accounts.map(n=>i`<option
              value=${n.key}
              ?selected=${n.key===e.selected}
            >
              ${t(n)}
            </option>`)||""}
      </select>
      ${e.hint?i`<small class="detail-effective__hint">${e.hint}</small>`:""}
      ${e.provider?"":i`<small class="detail-effective__hint"
            >계정 목록을 불러올 수 없습니다</small
          >`}
    </span>
  </div>`}function Hc({md:e,catalog:t,handlers:r}){let n=typeof e.claude_account=="string"?e.claude_account:"",s=typeof e.codex_account=="string"?e.codex_account:"";return i`<section class="exec-accounts" data-exec-accounts>
    <div class="detail-section-label">실행 계정</div>
    <div class="exec-settings-core">
      ${Bc({key:"claude_account",title:"Claude \uACC4\uC815",provider_key:"claude",provider:jc(t,"claude"),selected:n,handlers:r,hint:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uB7F0\uD0C0\uC784\uC774 claude\uC77C \uB54C \uC801\uC6A9\uB429\uB2C8\uB2E4"})}
      ${Bc({key:"codex_account",title:"Codex \uACC4\uC815",provider_key:"codex",provider:jc(t,"codex"),selected:s,handlers:r})}
    </div>
  </section>`}var Gc=["orchestration_model","orchestration_effort","orchestration_speed","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_runtime","impl_model","impl_effort"];function ts(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function fo(e){if(!ts(e)||!ts(e.runners))return null;let t=Object.entries(e.runners).filter(([,r])=>ts(r)&&ts(r.models));return t.length>0?t:null}function Rr(e,t){let r=fo(e);if(!r||!t)return null;for(let[n,s]of r)if(Object.hasOwn(s.models,t))return n;return null}function Vc(e,t){return ts(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function Kc(e,t){let r=fo(e);if(!r||!t)return[];for(let[,n]of r)if(Object.hasOwn(n.models,t))return Vc(n,n.models[t]);return[]}function gm(e){let t=fo(e);if(!t)return[];let r=[];for(let[,n]of t)for(let s of Object.values(n.models))for(let o of Vc(n,s))r.includes(o)||r.push(o);return r}function bm(e,t){if(!t)return gm(e);let n=fo(e)?.find(([o])=>o===t)?.[1];if(!n)return[];let s=[];for(let o of Object.keys(n.models))for(let a of Kc(e,o))s.includes(a)||s.push(a);return s}function Yc(e,t,r){let n={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},s=n.impl_runtime==="inherit"?r:n.impl_runtime==="claude"||n.impl_runtime==="codex"?n.impl_runtime:null;if(n.impl_runtime==="inherit"&&!s)return n.impl_model="",n.impl_effort="",n;let o=Rr(t,n.impl_model);if(n.impl_model&&(!s||o!==s))return n.impl_model="",n.impl_effort="",n;let a=n.impl_model?Kc(t,n.impl_model):bm(t,s);return n.impl_effort&&a.length>0&&!a.includes(n.impl_effort)&&(n.impl_effort=""),n}function hm(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function Zc(e,t){let r=t.getWorkspacePath,n=t.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",a="",l="";function c(A){A.key==="Escape"&&s&&(A.preventDefault(),b())}document.addEventListener("keydown",c);function u(){return s?i`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>b()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${hm(s)}</span
            >
            <button
              type="button"
              class="mv__close"
              aria-label="닫기"
              @click=${()=>b()}
            >
              ✕
            </button>
          </div>
          <div class="mv__body">
            ${o==="loading"?i`<div class="mv__status">불러오는 중…</div>`:o==="pending"?i`<div class="mv__status">${l}</div>`:o==="error"?i`<div class="mv__status mv__status--error">
                      ${l||"\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}
                    </div>`:qr(a)}
          </div>
        </div>
      </div>
    `:i``}function d(){Ze(u(),e)}async function _(A,L={}){s=A,o="loading",a="",l="",d();let G=r?r():"";if(!G){o="error",l="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",d();return}if(!n){o="error",l="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",d();return}let ne="/api/doc?workspace="+encodeURIComponent(G)+"&path="+encodeURIComponent(A);try{let re=await n(ne),F=await re.json().catch(()=>({}));if(!re.ok||!F||F.ok!==!0){if(F?.error==="not_found"&&L.missing_state==="plan_pending"){o="pending",l="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",d();return}o="error",l="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(F&&F.error||re.status)+")",d();return}a=String(F.content||""),o="ready",d()}catch{o="error",l="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",d()}}function b(){s=null,Ze(i``,e)}function x(){document.removeEventListener("keydown",c),b()}return{open:_,close:b,destroy:x}}var ym=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],Qc="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",_o=["implementation","review-consult"],vm=["running","done","failed","interrupted"],wm={running:"\u25CF",done:"\u2713",failed:"\u2717",interrupted:"\u26A0"};function km(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function $m(e){let t=Ot(e);if(t.length>0)return t.map(s=>i`<span class="detail-usage-total" title=${s.tooltip}
          >${s.label}</span
        >`);let r=xn(e);if(!r||!e)return"";let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return i`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${r.replace(/^τ /,"\u03C4 \uCD1D ")}${n}</span
    >${e.replayed?i`<span class="detail-usage-partial" title=${Qc}
          >부분 집계</span
        >`:""}`}function Xc(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function La(e){if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?Oa(t):""}function xm(e){if(!e||typeof e!="object"||Array.isArray(e))return null;let t=e;return typeof t.launch_id!="string"||t.launch_id.length===0||t.provider!=="codex"||!_o.includes(t.role)||typeof t.model!="string"||t.model.length===0||!(!("effort"in t)||t.effort===null||typeof t.effort=="string"&&t.effort.trim().length>0)||typeof t.session_id!="string"||t.session_id.length===0||!vm.includes(t.status)||typeof t.started_at!="number"||!Number.isFinite(t.started_at)||typeof t.last_event_at!="number"||!Number.isFinite(t.last_event_at)||!(t.completed_at===null||typeof t.completed_at=="string"&&Number.isFinite(Date.parse(t.completed_at)))||!(t.turn_id===null||typeof t.turn_id=="string")?null:t}function Am(e,t){let n=Ot({providers:{codex:{subtotal:t.subtotal,breakdown:t.usage,...t.replayed?{replayed:!0}:{}}},roles:{}})[0];return i`<div class="detail-session__leg detail-session__usage-detail">
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
    ${La(t.completed_at)?i`<span class="detail-session__leg-time detail-session__time"
          >${La(t.completed_at)}</span
        >`:""}
    ${n?i`<span class="detail-session__usage" title=${n.tooltip}
          >${n.label}</span
        >`:""}
  </div>`}function Sm(e,t,r,n){let s=e.status==="running"?null:t,a=(s?Ot({providers:{codex:{subtotal:s.subtotal,breakdown:s.usage,...s.replayed?{replayed:!0}:{}}},roles:{}}):[])[0],l=e.status==="running"?Oa(e.last_event_at):s?La(s.completed_at):"";return i`<button
    type="button"
    class="detail-session__leg detail-session__usage-detail detail-session__leg--${e.status}"
    data-launch-id=${e.launch_id}
    @click=${()=>n.onOpenDelegation&&n.onOpenDelegation(r,e.launch_id)}
  >
    <span class="detail-session__leg-glyph" aria-hidden="true"
      >${wm[e.status]}</span
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
    ${l?i`<span class="detail-session__leg-time detail-session__time"
          >${l}</span
        >`:""}
    ${a?i`<span class="detail-session__usage" title=${a.tooltip}
          >${a.label}</span
        >`:""}
  </button>`}function Em(e,t){return e.role===t.role&&e.model===t.model&&e.session_id===t.session_id}function Tm(e,t,r){let n=[],s=new Set,o=Array.isArray(e.delegation_sessions)?e.delegation_sessions:[];for(let d of o){let _=xm(d);!_||s.has(_.launch_id)||(s.add(_.launch_id),n.push(_))}n.sort((d,_)=>d.started_at-_.started_at);let a={implementation:[],"review-consult":[]};if(t)for(let d of _o){let _=t.roles[d]?.codex;a[d]=_?[..._.legs]:[]}let l=_o.flatMap(d=>a[d]),c=new Set,u=[];for(let d of _o){for(let _ of n.filter(b=>b.role===d)){let b=l.find(x=>x.receipt_id===_.launch_id)||null;b&&!Em(_,b)||(b&&c.add(b.receipt_id),u.push(Sm(_,b,e.attempt_id,r)))}for(let _ of a[d])c.has(_.receipt_id)||u.push(Am(d,_))}return u}function Cm(e,t){let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,n=[...ym,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return i`<div class="detail-session__usage-detail">
    ${n.map(s=>i`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${s.label}</span
          ><span class="detail-session__usage-value"
            >${km(e[s.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${r===null?"":i`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${r.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?i`<span class="detail-session__usage-note">${Qc}</span>`:""}
  </div>`}var Rm={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function Oa(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=String(t.getHours()).padStart(2,"0"),n=String(t.getMinutes()).padStart(2,"0");return`${r}:${n}`}function Im(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,n])=>typeof n=="string"&&n.length>0).map(([n,s])=>`${n}=${s}`).join(" \xB7 "):"",r=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return i`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${r}</span>
    ${t?i`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}function Jc(e,t={},r={}){let n=Array.isArray(e)?e:[],s=r.expanded||new Set;if(n.length===0)return i`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let o=new Set;for(let u of n)u&&typeof u.resumed_from=="string"&&u.resumed_from.length>0&&o.add(u.resumed_from);let a=u=>{if(!(u.status==="failed"||u.status==="orphaned"))return"";let _=typeof u.session_id=="string"&&u.session_id.length>0,b=o.has(u.attempt_id),x=_&&!b,A=_?b?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return i`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${u.attempt_id}
      ?disabled=${!x}
      title=${A}
      @click=${L=>{L.stopPropagation(),x&&t.onResume&&t.onResume(u.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},l=u=>{if(!(u.status==="failed"||u.status==="orphaned")||typeof u.cause!="string"||u.cause==="")return"";let _=u.cause_detail,b=_&&typeof _.reason=="string"&&_.reason.length>0?typeof _.command=="string"&&_.command.length>0?`${_.reason} \xB7 ${_.command}`:_.reason:u.cause;return i`<div class="detail-session__cause" title=${b}>
      ${u.cause}
    </div>`},c=u=>{let d=Xc(ea(u));if(Ot(d).length===0&&!xn(u.usage))return"";let _=s.has(u.attempt_id);return i`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${u.attempt_id}
      aria-expanded=${_?"true":"false"}
      title=${_?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${b=>{b.stopPropagation(),t.onToggleUsage&&t.onToggleUsage(u.attempt_id)}}
    >
      τ 자세히
    </button>`};return i`
    <div class="detail-section-label">
      세션 이력${$m(r.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${n.map(u=>{let d=ea(u),_=Xc(d),b=Ot(_);return i`<div class="detail-session-row">
          <button
            type="button"
            class="detail-session detail-session--${u.status||"unknown"}"
            data-attempt-id=${u.attempt_id}
            @click=${()=>t.onOpen&&t.onOpen(u.attempt_id)}
          >
            <span class="detail-session__glyph"
              >${Rm[u.status||""]||"\xB7"}</span
            >
            <span class="detail-session__id">${u.attempt_id}</span>
            ${Dr(u)?i`<span
                  class="detail-session__resumed"
                  title=${Dr(u)}
                  >↻</span
                >`:""}
            <span class="detail-session__meta">${gr(u)}</span>
            ${b.length>0?i`<span class="detail-session__role">orchestrator</span>`:""}
            ${u.session_id?i`<span class="detail-session__sid" title=${u.session_id}
                  >${String(u.session_id).slice(0,8)}</span
                >`:""}
            ${b.length>0?b.map(x=>i`<span
                      class="detail-session__usage"
                      title=${x.tooltip}
                      >${x.label}</span
                    >`):xn(u.usage)?i`<span class="detail-session__usage"
                    >${xn(u.usage)}</span
                  >`:""}
            <span class="detail-session__time">${Oa(u.started_at)}</span>
          </button>
          ${c(u)} ${a(u)} ${l(u)} ${Im(u)}
          ${s.has(u.attempt_id)&&u.usage?Cm(u.usage,u.runner==="codex"?"codex":"claude"):""}
          ${Tm(u,d,t)}
        </div>`})}
    </div>
  `}function eu(e,t={}){return i`
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
          ${Lm(e)}
        </div>`:""}
  `}function Lm(e){let t=En(e);if(t)return t;let r=e.data;if(!r)return"";if(r.missing)return i`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof r.default_task_prompt=="string"?Tr("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",r.default_task_prompt):""}`;let n=to(r.recorded_at);return i`<div class="detail-prompt__meta">
      ${r.attempt_id}${n?` \xB7 ${n}`:""}
    </div>
    ${typeof r.task_prompt=="string"?Tr("\uACFC\uC5C5 (user)",r.task_prompt):""}
    ${typeof r.system_prompt=="string"?Tr("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",r.system_prompt):""}`}var Om=["open","in_progress","deferred","resolved","closed"],Mm=[0,1,2,3,4];function tu(e,t){let r=t.issueStores,n=t.onClose,s=t.transport,o=t.onNavigate,a=t.queueStore,l=t.execPresetStore,c=t.sessionLogStore,u=null,d=null,_={},b="",x=!1,A=[],L=!1,G={},ne={claude:null,codex:null},re=null,F=0,q=!1,I=!1,B="",m="",S="";function Z(){q=!1,I=!1,B="",m="",S=""}function ie(){ne={claude:null,codex:null},re=null,F+=1}async function D(v){try{let Q=await fetch(v);if(!Q.ok)return null;let C=await Q.json();if(!C||typeof C!="object"||!Array.isArray(C.accounts))return null;let me=C.accounts.filter(it=>it!==null&&typeof it=="object"&&!Array.isArray(it));return{accounts:me,active:me.find(it=>it.active===!0)||null}}catch{return null}}async function U(v){re=v;let Q=++F,[C,me]=await Promise.all([D("/api/claude-usage"),D("/api/codex-usage")]);Q!==F||v!==u||(ne={claude:C,codex:me},le())}let _e=[],we=null,ke=null,xe=!1,We="",rt=!1,Ne=0,He=new Set;function ue(){_e=[],we=null,ke=null,xe=!1,We="",rt=!1,Ne+=1,He.clear()}async function Fe(v){if(!s)return;let Q=++Ne;try{let C=await Promise.resolve(s("get-comments",{id:v}));if(Q!==Ne||v!==u)return;_e=Array.isArray(C)?C:[],xe=!1}catch{if(Q!==Ne||v!==u)return;xe=!0}le()}function Le(){if(!s||!u)return;let v=d&&typeof d.comment_count=="number"?d.comment_count:null;if(we!==u){we=u,ke=v,Fe(u);return}v!==null&&v!==ke&&(ke=v,Fe(u))}function Ge(v){He.has(v)?He.delete(v):He.add(v),le()}function Ie(v){let Q=We.trim().length===0;We=v,Q!==(v.trim().length===0)&&le()}async function Ve(){let v=We.trim();if(!s||!u||v.length===0||rt)return;let Q=u;rt=!0,le();let C=!1;try{let me=await Promise.resolve(s("add-comment",{id:Q,text:v}));Array.isArray(me)&&me.length>0&&(C=!0,Q===u&&(_e=me,xe=!1,We="",ke=me.length))}catch{C=!1}C||ce("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),Q===u&&(rt=!1),le()}let st={onToggle:Ge,onDraftInput:Ie,onSubmit:Ve},Ce=document.createElement("div");Ce.className="md-viewer-root",document.body.appendChild(Ce);let Xe=Zc(Ce,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),K=document.createElement("div");K.className="session-log-root",document.body.appendChild(K);let X=no(K,{transport:s?(v,Q)=>Promise.resolve(s(v,Q)):void 0,sessionLogStore:c}),$e=!1,Oe=!1,je=!1,ze=null,Ue=null,lt=0;function ut(v){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${v}`}function W(){$e=!1,Oe=!1,je=!1,ze=null,Ue=null,lt+=1}async function Y(v){if(!s)return;let Q=++lt;Oe=!0,je=!1,le();try{let C=await Promise.resolve(s("get-bead-prompt",{bead_id:v}));if(Q!==lt)return;!C||typeof C!="object"||Array.isArray(C)?je=!0:(ze=C,Ue=ut(v))}catch{Q===lt&&(je=!0)}finally{Q===lt&&(Oe=!1,le())}}function ye(){if($e=!$e,$e&&u&&Ue!==ut(u)){ze=null,Y(u);return}le()}function nt(){if(!a||!u)return[];let v=a.get();return(v&&v.attempts?Object.values(v.attempts):[]).filter(C=>C&&C.bead_id===u).sort((C,me)=>(me.started_at||0)-(C.started_at||0)).map(C=>({attempt_id:C.attempt_id,bead_id:C.bead_id,status:C.status,started_at:typeof C.started_at=="number"?C.started_at:null,runner:C.runner||null,model:C.model||null,effort:C.effort||C.observed_effort||null,speed:C.speed||null,session_id:C.session_id||null,resumed_from:C.resumed_from||null,continuation_mode:C.continuation_mode||null,dismissed_at:typeof C.dismissed_at=="number"?C.dismissed_at:null,cause:typeof C.cause=="string"?C.cause:null,cause_detail:C.cause_detail||null,exec_default_preset_id:typeof C.exec_default_preset_id=="string"?C.exec_default_preset_id:null,exec_default_preset_revision:typeof C.exec_default_preset_revision=="number"?C.exec_default_preset_revision:null,exec_values:C.exec_values&&typeof C.exec_values=="object"?C.exec_values:null,usage:C.usage||null,usage_legs:Array.isArray(C.usage_legs)?C.usage_legs:[],delegation_sessions:Array.isArray(C.delegation_sessions)?C.delegation_sessions:[]}))}function ve(){if(!a||!u)return null;let v=a.get();return Jt(v&&v.attempts||{},u)}let T=new Set;function M(v){T.has(v)?T.delete(v):T.add(v),le()}function P(v){let Q=a?a.get():null,C=Q&&Q.attempts?Q.attempts[v]:null;X.open({attempt_id:v,meta:C?{runner:C.runner||void 0,model:C.model||void 0,effort:C.effort||void 0,status:C.status||void 0,session_id:C.session_id||void 0}:{}})}function V(v,Q){let C=a?a.get():null,me=C&&C.attempts?C.attempts[v]:null,Qe=(me&&Array.isArray(me.delegation_sessions)?me.delegation_sessions:[]).find(ot=>ot&&typeof ot=="object"&&ot.launch_id===Q);Qe&&X.open({attempt_id:v,launch_id:Q,meta:{runner:"codex",role:Qe.role,model:Qe.model,effort:Qe.effort,session_id:Qe.session_id,status:Qe.status}})}async function oe(v){if(!s||!v)return;let Q=await $n();if(Q===null)return;let C=()=>{let ot=a?a.get():null;return ot&&typeof ot.revision=="number"?ot.revision:0},me=async(ot={},Be=C())=>await s("worker-attempt-resume",{attempt_id:v,expected_revision:Be,...Q!==""?{instructions:Q}:{},...ot}),it=ot=>{ot?.queue&&a?.set&&a.set(ot.queue)},Qe=await me();if(it(Qe),Qe&&Qe.conflict){let ot=Qe.queue&&typeof Qe.queue.revision=="number"?Qe.queue.revision:C();Qe=await me({},ot),it(Qe)}Qe=await $r(Qe,(ot,Be)=>me({continuation:ot,decision_token:Be}),{onResult:it,refresh:()=>me()}),Qe&&Qe.resumed===!1&&!Qe.conflict&&Qe.reason&&ce(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${Qe.reason}`,"error",2400)}let y={onOpen:P,onOpenDelegation:V,onResume:oe,onToggleUsage:M};function R(){let v=a?a.get():null,Q={...G};for(let C of["orchestration_model","orchestration_effort","orchestration_speed"]){let me=v&&v[C];typeof me=="string"&&(Q[C]=me)}return Q}async function N(){if(s){try{let v=await Promise.resolve(s("get-session-defaults",{}));G=v&&v.values&&typeof v.values=="object"?v.values:{}}catch{G={}}le()}}function fe(){let v=a?a.get():null;return v&&v.runner_catalog||null}function de(){let v=a?a.get():null;return v&&typeof v.execution_defaults=="object"?v.execution_defaults:null}function Se(){let v=d?.metadata&&typeof d.metadata=="object"?d.metadata:{},C=br({pin:{...v,..._},global:R(),execution_defaults:de(),runner_catalog:fe(),route:typeof v.route=="string"?v.route:null}).orchestration_model.value||"";return Rr(fe(),C)}function Pe(){let v=l?l.get():null;return!v||typeof v.revision!="number"?null:{revision:v.revision,presets:Array.isArray(v.presets)?v.presets:[]}}function Ke(v){return v?.compatible===!1}function Ye(v){l&&v&&typeof v.revision=="number"&&Array.isArray(v.presets)&&l.set({revision:v.revision,presets:v.presets})}async function z(){let v=Pe(),Q=v?.presets.find(C=>C.id===b);if(!(!s||!u||!v||!Q||Ke(Q)||x)){x=!0,A=[],le();try{let C=await Promise.resolve(s("apply-impl-preset",Dc(u,Q.id,v.revision)));if(C&&C.conflict){Ye(C),ce("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let me=C&&Array.isArray(C.issue)?C.issue[0]:C?.issue;if(C&&C.applied&&me&&typeof me=="object"){d=me,A=Array.isArray(C.skipped_orchestration_keys)?C.skipped_orchestration_keys.filter(it=>typeof it=="string"):[];for(let it of Gc)delete _[it];ce(A.length>0?"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4. \uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 3\uD0A4\uB294 Bead\uC5D0 \uD540\uD560 \uC218 \uC5C6\uC5B4 \uAC74\uB108\uB6F0\uC5C8\uC2B5\uB2C8\uB2E4.":"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",4e3);return}C&&C.error==="bd_readback_failed"?ce("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):ce("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(C){C&&typeof C=="object"&&C.code==="bd_readback_failed"?ce("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):ce("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{x=!1,le()}}}let ee=null;r&&r.subscribe&&(ee=r.subscribe(()=>O()));let ge=null;a&&typeof a.subscribe=="function"&&(ge=a.subscribe(()=>{u&&le()}));let k=null;l&&typeof l.subscribe=="function"&&(k=l.subscribe(()=>{u&&le()}));function E(v){v.key==="Escape"&&u&&(v.preventDefault(),n())}document.addEventListener("keydown",E);function O(){if(u){if(r&&typeof r.snapshotFor=="function"){let v=r.snapshotFor("detail:"+u)||[];d=v.find(C=>C&&C.id===u)||v[0]||d}Le(),le()}}function J(v){ar(v).then(Q=>{Q?ce("\uBCF5\uC0AC\uB428","success",1200):ce("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function Ee(v){v.preventDefault(),v.stopPropagation(),u&&J(u)}function be(v,Q){v.preventDefault(),v.stopPropagation(),J(Q)}function Te(v,Q,C){v.preventDefault(),v.stopPropagation(),Xe.open(Q,{missing_state:C})}function De(v,Q){_[v]=Q,le(),!(!s||!u)&&Promise.resolve(s("update-exec-settings",Pc(u,v,Q.length===0?null:Q))).catch(()=>{ce("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}function Et(v,Q){let C=d||{},me=C.metadata&&typeof C.metadata=="object"?C.metadata:{},it={};for(let Be of["impl_runtime","impl_model","impl_effort"])it[Be]=Object.hasOwn(_,Be)?_[Be]:typeof me[Be]=="string"?me[Be]:"";it[v]=Q;let Qe=Yc(it,fe(),Se()),ot={};for(let Be of["impl_runtime","impl_model","impl_effort"])ot[Be]=_[Be],_[Be]=Qe[Be]||"";le(),!(!s||!u)&&Promise.resolve(s("update-impl-target",{id:u,...Qe,orchestration_runtime:Se()})).then(Be=>{let xt=Array.isArray(Be)?Be[0]:Be;if(!xt||typeof xt!="object"||!xt.id)throw new Error("implementation target readback failed");d=xt;for(let Zt of["impl_runtime","impl_model","impl_effort"])delete _[Zt];le()}).catch(()=>{for(let Be of["impl_runtime","impl_model","impl_effort"])ot[Be]===void 0?delete _[Be]:_[Be]=ot[Be];le(),ce("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error")})}async function bt(v,Q,C){if(!s||!u)return!1;try{let me=await Promise.resolve(s(v,Q)),it=Array.isArray(me)?me[0]:me;return it&&typeof it=="object"&&it.id?(d=it,!0):(ce(C,"error"),!1)}catch{return ce(C,"error"),!1}}function et(v){setTimeout(()=>{try{let Q=e.querySelector(v);Q&&typeof Q.focus=="function"&&Q.focus()}catch{}},0)}function Pt(){q=!0,B=d&&d.title||"",le(),et('.detail-edit__input[data-edit="title"]')}function vr(v){B=v.target.value}function Me(){q=!1,B="",le()}function jt(){bt("edit-text",{id:u,field:"title",value:B},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(Q=>{Q&&(q=!1,B=""),le()})}function wr(){I=!0,m=d&&d.description||"",le(),et('.detail-edit__textarea[data-edit="description"]')}function zt(v){m=v.target.value}function tr(){I=!1,m="",le()}function pr(){bt("edit-text",{id:u,field:"description",value:m},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(Q=>{Q&&(I=!1,m=""),le()})}function Tt(v,Q,C,me){if(v.key==="Escape"){v.stopPropagation(),C();return}v.key==="Enter"&&(!me||v.ctrlKey||v.metaKey)&&(v.preventDefault(),Q())}function rr(v){let Q=v.target.value;bt("update-status",{id:u,status:Q},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>le())}function fr(v){let Q=Number(v.target.value);bt("update-priority",{id:u,priority:Q},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>le())}function _r(v){S=v.target.value}function Je(){let v=S.trim();v.length!==0&&bt("label-add",{id:u,label:v},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(Q=>{Q&&(S=""),le()})}function Yt(v){if(v.key==="Escape"){v.stopPropagation(),S="",le();return}v.key==="Enter"&&(v.preventDefault(),Je())}function Ae(v){bt("label-remove",{id:u,label:v},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>le())}let $={onCopyPath:be,onOpenDoc:Te};function te(v){return typeof v=="string"?v:v&&typeof v=="object"?String(v.id||v.to||v.issue_id||v.depends_on||""):""}function he(v){switch(v&&typeof v=="object"?String(v.dependency_type||v.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function dt(v){let C=(Array.isArray(v.dependencies)?v.dependencies:[]).map(me=>({id:te(me),icon:he(me)})).filter(me=>me.id.length>0);return i`
      <div class="detail-section-label">의존성</div>
      ${C.length===0?i`<div class="detail-empty">의존성 없음</div>`:i`<div class="detail-deps">
            ${C.map(me=>o?i`<button
                    type="button"
                    class="detail-dep detail-dep--link"
                    @click=${()=>o(me.id)}
                  >
                    ${me.icon?`${me.icon} `:""}${me.id}
                  </button>`:i`<span class="detail-dep"
                    >${me.icon?`${me.icon} `:""}${me.id}</span
                  >`)}
          </div>`}
    `}function wt(v){let Q=v.metadata||{},C=v.workflow||{},me=C.stages||{},it=me.spec&&me.spec.stale,Qe=me.impl&&me.impl.stale,ot=me.plan||null,Be=C.route_source==="derived",xt=C.route||Q.route||"\u2014";return i`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${Be?" detail-kv__v--derived":""}"
          title=${Be?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${Be?"unset":xt}</span
        >
      </div>
      ${C.route!=="quick_fix"||Object.hasOwn(Q,"spec_review")?i`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${Q.spec_review||"\uC5C6\uC74C"}${it?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${C.route==="full_plan"?i`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${ot?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${ot?.approval_receipt||"\uC5C6\uC74C"}${ot?.approval_state==="stale"?" \xB7 stale":ot?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${C.route!=="quick_fix"||Object.hasOwn(Q,"impl_review")?i`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${Q.impl_review||"\uC5C6\uC74C"}${Qe?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${C.planned_execution?i`<div class="detail-kv">
              <span class="detail-kv__k">planned_execution</span>
              <span class="detail-kv__v">${C.planned_execution.kind}</span>
            </div>
            ${C.planned_execution.kind==="main"?i`<div class="detail-kv">
                  <span class="detail-kv__k">planned_execution_reason</span>
                  <span class="detail-kv__v detail-kv__v--wrap"
                    >${C.planned_execution.reason}</span
                  >
                </div>`:""}`:""}
      ${C.exec_receipt?i`<div class="detail-kv">
            <span class="detail-kv__k">exec_receipt</span>
            <span class="detail-kv__v detail-kv__v--wrap"
              >${tn(C.exec_receipt)}</span
            >
          </div>`:""}
      ${C.impl_entry?i`<div class="detail-kv">
            <span class="detail-kv__k">impl_entry</span>
            <span class="detail-kv__v"
              >${`${C.impl_entry.actor}@${C.impl_entry.sha}`}</span
            >
          </div>`:""}
      ${Q.pr_url?i`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${Q.pr_url}</span>
          </div>`:""}
    `}let _t={route:["quick_fix","spec_backed","full_plan"]};async function $t(v,Q){let C=Q.target.value;if(v==="route"&&d&&d.metadata&&d.metadata.route==="full_plan"&&C!=="full_plan"&&!window.confirm(`full_plan \u2192 ${C||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){le();return}await bt("update-workflow-meta",{id:u,key:v,value:C},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),le()}function Rt(v){let Q=v.metadata||{};return i` ${((me,it)=>{let Qe=_t[me],ot=typeof Q[me]=="string"?Q[me]:"";return i`<div class="detail-kv">
        <span class="detail-kv__k">${me}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${me}
          data-edit=${`wfmeta-${me}`}
          @change=${Be=>$t(me,Be)}
        >
          <option value="" ?selected=${!Qe.includes(ot)}>
            ${it}
          </option>
          ${Qe.map(Be=>i`<option value=${Be} ?selected=${ot===Be}>${Be}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function p(v,Q){return q?i`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${B}
            @input=${vr}
            @keydown=${C=>Tt(C,jt,Me,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${jt}
            >
              저장
            </button>
            <button
              type="button"
              class="detail-edit__cancel"
              data-edit="title-cancel"
              @click=${Me}
            >
              취소
            </button>
          </div>
        </div>
      `:i`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${v}</h2>
        ${Ot(Q).map(C=>i`<span class="detail-usage-total" title=${C.tooltip}
              >${C.label}</span
            >`)}
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${Pt}
        >
          ✎
        </button>
      </div>
    `}function w(v){let Q=It(v.created_at),C=It(v.updated_at);return!Q&&!C?i``:i`
      ${Q?i`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${Q}</span>
          </div>`:""}
      ${C?i`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${C}</span>
          </div>`:""}
    `}function f(v,Q){return i`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${rr}
        >
          ${Om.map(C=>i`<option value=${C} ?selected=${C===v}>${C}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${fr}
        >
          ${Mm.map(C=>i`<option value=${String(C)} ?selected=${C===Q}>
                P${C}
              </option>`)}
        </select>
      </div>
    `}function g(v){return i`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${I?"":i`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${wr}
            >
              ✎
            </button>`}
      </div>
      ${I?i`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${m}
              @input=${zt}
              @keydown=${Q=>Tt(Q,pr,tr,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${pr}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${tr}
              >
                취소
              </button>
            </div>
          </div>`:i`<div class="detail-overlay__desc">
            ${v||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function H(v){let Q=typeof v.notes=="string"?v.notes:"";return Q.trim().length===0?i``:i`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${Q}</div>
    `}function ae(v){let Q=Array.isArray(v.labels)?v.labels:[];return i`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${Q.map(C=>i`<span class="detail-label-chip"
              >${C}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${C}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+C}
                @click=${()=>Ae(C)}
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
            @input=${_r}
            @keydown=${Yt}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${Je}
          >
            추가
          </button>
        </span>
      </div>
    `}function pe(){if(!u)return i``;let v=d||{},Q=String(v.id||u),C=v.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",me=ve(),it=v.status||"open",Qe=typeof v.priority=="number"?Math.max(0,Math.min(4,v.priority)):"",ot=v.description||"",Be={...v,metadata:{...v.metadata||{},..._}};return i`
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
            @click=${Ee}
          >
            ${Q}
          </button>
          ${p(C,me)}
          ${qc(Be)}
          ${Nc({metadata:Be.metadata,workspace_values:R(),catalog:fe(),execution_defaults:de(),expanded:L,presets:Pe()?.presets||[],preset_id:b,preset_busy:x,skipped_orchestration_keys:A},{onToggle:xt=>{L=xt,le()},onEdit:(xt,Zt)=>{if(xt==="impl_runtime"||xt==="impl_model"||xt==="impl_effort"){Et(xt,Zt??"");return}De(xt,Zt??"")},onPresetSelect:xt=>{b=xt,A=[],le()},onPresetApply:()=>{z()}})}
          ${Hc({md:Be.metadata,catalog:ne,handlers:{onExecChange:De}})}
          ${f(it,Qe)} ${w(v)}
          ${g(ot)}
          ${xc(_e,st,{expanded:He,draft:We,sending:rt,error:xe})}
          ${H(v)} ${ae(v)} ${dt(v)}
          ${wt(v)} ${Rt(v)}
          ${wc(v,$)}
          ${eu({expanded:$e,loading:Oe,error:je,data:ze},{onToggle:ye})}
          ${Jc(nt(),y,{total:me,expanded:T})}
        </div>
      </div>
    `}function le(){Ze(pe(),e)}return{load(v){v!==u&&(_={},b="",A=[],L=!1,Z(),ue(),W(),ie()),u=v,d=null,O(),N(),re!==v&&U(v)},clear(){u=null,d=null,_={},b="",x=!1,A=[],L=!1,Z(),ue(),W(),ie(),Xe.close(),X.close(),Ze(i``,e)},destroy(){ee&&(ee(),ee=null),ge&&(ge(),ge=null),k&&(k(),k=null),document.removeEventListener("keydown",E),Xe.destroy(),Ce.parentNode&&Ce.parentNode.removeChild(Ce),X.destroy(),K.parentNode&&K.parentNode.removeChild(K),u=null,d=null,ie(),b="",x=!1,A=[],ue(),W(),Ze(i``,e)}}}function ru(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let r=t.querySelector("#fatal-error-title"),n=t.querySelector("#fatal-error-message"),s=t.querySelector("#fatal-error-detail"),o=t.querySelector("#fatal-error-reload"),a=t.querySelector("#fatal-error-close"),l=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},c=(u,d,_="")=>{r&&(r.textContent=u||"Unexpected Error"),n&&(n.textContent=d||"An unrecoverable error occurred.");let b=typeof _=="string"?_.trim():"";if(s&&(b.length>0?(s.textContent=b,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),a&&a.addEventListener("click",()=>l()),t.addEventListener("cancel",u=>{u.preventDefault(),l()}),{open:c,close:l,getElement(){return t}}}function mo(e){return typeof e=="string"&&e.length>=7?e.slice(0,7):"\u2014"}function go(e){if(typeof e!="number"||!Number.isFinite(e)||e<0)return"\u2014";if(e<1e3)return`${Math.round(e)}ms`;let t=e/1e3;if(t<60)return`${t.toFixed(1)}\uCD08`;let r=Math.floor(t/60);if(r<60)return`${r}\uBD84 ${Math.round(t-r*60)}\uCD08`;let n=Math.floor(r/60),s=r%60;return`${n}\uC2DC\uAC04 ${s}\uBD84`}function nu(e,t){if(typeof e!="object"||e===null)return null;let r=0,n=!1;for(let s of Object.values(e)){if(typeof s!="object"||s===null)continue;let o=s;if(o.bead_id!==t)continue;let a=o.started_at,l=o.finished_at;typeof a!="number"||typeof l!="number"||!Number.isFinite(a)||!Number.isFinite(l)||l<a||(r+=l-a,n=!0)}return n?r:null}function bo(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";let t=new Date(e);return`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`}function Pm(e,t){let r=Array.isArray(e)?e:[],n=Array.isArray(t)?t:[];if(r.length===0&&n.length===0)return null;let s=null;for(let l of r)l.kind!=="deploy"||l.state!=="succeeded"||typeof l.target_sha!="string"||(!s||(typeof l.finished_at=="number"?l.finished_at:0)>(typeof s.finished_at=="number"?s.finished_at:0))&&(s=l);let o=r.filter(l=>l.state==="failed"&&!l.dismissed&&!l.superseded_by).length+n.length,a=r.some(l=>l.state==="repairing");return{deploy:s?{sha:mo(s.target_sha),at:typeof s.finished_at=="number"?s.finished_at:null,elapsed_ms:typeof s.elapsed_ms=="number"?s.elapsed_ms:null}:null,unresolved:o,repairing:a,badge:o>0?{tone:"act",label:`\uD574\uACB0 \uD544\uC694 ${o}`}:a?{tone:"live",label:"\uC790\uB3D9 \uD574\uACB0 \uC911"}:{tone:"quiet",label:"\uBAA8\uB450 \uC815\uC0C1"}}}function su(e,t){let r=Pm(e,t);return r?i`<button
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
            title=${r.deploy.at?It(r.deploy.at):""}
            >${bo(r.deploy.at)}${r.deploy.elapsed_ms!==null?` \xB7 ${go(r.deploy.elapsed_ms)}`:""}</span
          >
        </span>`:""}
    <span class="worker-repo-strip__spacer"></span>
    <span
      class="worker-repo-strip__badge worker-repo-strip__badge--${r.badge.tone}"
      >${r.badge.label}</span
    >
  </button>`:""}function Rn(e){let t=Gt(e.created_at),r=Gt(e.updated_at);return!t&&!r?"":i`<div class="worker-mini__meta">
    ${t?i`<span title=${`\uC0DD\uC131 ${It(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&r?i`<span>·</span>`:""}${r?i`<span title=${`\uC218\uC815 ${It(e.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </div>`}function Dm(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function rs(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function ho(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function yr(e,t,r={}){let s=Object.values(e&&typeof e=="object"?e:{}).filter(_=>_&&_.bead_id===t&&_.phase!=="done").sort((_,b)=>(_.requested_at||0)-(b.requested_at||0)).at(-1),o=typeof r.attempt_id=="string"&&r.attempt_id.length>0?r.attempt_id:typeof s?.attempt_id=="string"?s.attempt_id:null,a=r.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":r.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":r.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,l=typeof s?.last_error=="string"?s.last_error:null,c=s?Dm(s.phase):null,u=s?.kind==="stale_work_backup_fresh",d=r.merged||s?.mode==="merged_revert"?"merged":"unmerged";return{action:!r.external&&!r.done,enabled:!a&&(!s||!!l),label:u?l?"\uBC31\uC5C5 \uC815\uB9AC \uC7AC\uC2DC\uB3C4":"\uBC31\uC5C5 \uD6C4 \uC0C8\uB85C \uC2DC\uC791":l?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:a||(l?u?`\uBC31\uC5C5 \uB4A4 \uC815\uB9AC \uC2E4\uD328: ${l} \u2014 \uC6D0\uBCF8\uACFC \uAC80\uC99D \uC601\uC218\uC99D\uC744 \uBCF4\uC874\uD55C \uCC44 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:`\uD3D0\uAE30 \uC2E4\uD328: ${l} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:s?`${c||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:d==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:o,operation:s||null,progress:c,error:l,confirmation:d}}function Ir(e){let t=e.discard;if(!t||!t.operation)return"";let r=t.operation,n=r.kind==="stale_work_backup_fresh"&&!t.error?null:r.backup?.path,s=r.original_pr,o=r.revert_pr;return i`<div
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
  </div>`}var Nm={dirty_unique:"\uCD5C\uC2E0 base\uC5D0 \uC5C6\uB294 \uB85C\uCEEC \uBCC0\uACBD\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",untracked_present:"\uCD94\uC801\uB418\uC9C0 \uC54A\uC740 \uD30C\uC77C\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",branch_ahead:"\uB85C\uCEEC branch\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",head_ahead:"worktree HEAD\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_not_contained:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 \uCD5C\uC2E0 base\uC5D0 \uD3EC\uD568\uB410\uC74C\uC744 \uC99D\uBA85\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ahead_merge_commit:"\uB85C\uCEEC branch\uC5D0 \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 merge commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_submodule_path:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 submodule \uACBD\uB85C\uB97C \uBCC0\uACBD\uD569\uB2C8\uB2E4",archive_failed:"\uACE0\uC720 commit \uBC31\uC5C5\uC744 \uC548\uC804\uD558\uAC8C \uAC80\uC99D\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ref_delete_failed:"\uD655\uC778\uB41C local branch\uB97C \uC548\uC804\uD558\uAC8C \uC0AD\uC81C\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",resume_available:"\uC774\uC5B4\uAC08 \uC218 \uC788\uB294 \uC774\uC804 Worker session\uC774 \uC788\uC2B5\uB2C8\uB2E4",observe_failed:"Git \uC0C1\uD0DC\uB97C \uC548\uC804\uD558\uAC8C \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",identity_changed:"\uD655\uC778 \uC911 worktree \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4",ownership_unknown:"Worker \uC18C\uC720 worktree\uC778\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"};function ou(e,t=!1){if(!e||typeof e!="object")return null;let r=e;if(r.reason!=="worktree_stale_work"||!r.stale_work||typeof r.stale_work!="object")return null;let n=r.stale_work,s=n.residue==="branch"?"branch":"worktree",o=n.state==="unique"?"unique":"unknown",a=n.summary&&typeof n.summary=="object"?n.summary:{};function l(u){return Number.isInteger(a[u])?Number(a[u]):0}let c=typeof n.cause=="string"?n.cause:"observe_failed";return{residue:s,state:o,title:s==="branch"?"\uC774\uC804 \uBE0C\uB79C\uCE58 \uBCF4\uC874\uB428":o==="unique"?"\uC774\uC804 \uC791\uC5C5 \uBCF4\uC874\uB428":"\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",cause:Nm[c]||"\uC548\uC804\uD558\uAC8C \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 \uC774\uC804 \uC791\uC5C5\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",summary:s==="branch"?`\uACE0\uC720 commit ${l("branch_ahead")}`:[`staged ${l("staged_count")}`,`unstaged ${l("unstaged_count")}`,`untracked ${l("untracked_count")}`,`branch ahead ${l("branch_ahead")}`,`HEAD ahead ${l("head_ahead")}`].join(" \xB7 "),action_id:typeof n.action_id=="string"?n.action_id:"",can_resume:n.can_resume===!0,can_continue:n.can_continue===!0,can_backup_fresh:n.can_backup_fresh===!0,can_recheck:n.can_recheck===!0,locked:t}}function yo(e){return!e||!e.orchestration&&!e.worker?"":i`${e.orchestration?i`<span
        class="exec-chip exec-chip--orch"
        title=${e.orchestration.title}
        ><span class="exec-chip__k">오케</span
        ><span class="exec-chip__v">${e.orchestration.text}</span></span
      >`:""}${e.worker?i`<span class="exec-chip exec-chip--worker" title=${e.worker.title}
        ><span class="exec-chip__k">워커</span
        ><span class="exec-chip__v">${e.worker.text}</span></span
      >`:""}`}function Ma(e){let t=e.draggable&&!e.done,r=Array.isArray(e.badges)?e.badges:[],n=Ot(e.usage),s=ir(e.usage),o=e.merge_step||null,a=e.lane==="pr_wait"||!!e.revise_action||!!e.stale_work,l=e.lane==="done"&&!a,c=l?Gt(e.done_at):"",u=t?i`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",d=typeof e.seq=="number"?i`<span class="worker-mini__seq" aria-hidden="true"
          >${e.seq}</span
        >`:"",_=e.worker_serial===!0?i`<span
          class="worker-mini__serial worker-mini__serial--legacy"
          title="legacy worker-serial 라벨 잔재 — 스케줄링에 사용되지 않습니다"
          >worker-serial</span
        >`:"",b=e.workspace_name?i`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",x=i`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,A=i`<span class="worker-mini__title">${e.title}</span>`,L=e.pr_url&&e.pr_number?i`<a
          class="worker-mini__pr"
          href=${e.pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="PR 열기"
          >#${e.pr_number} ↗</a
        >`:"",G=e.completion_repair_pr_url&&e.completion_repair_pr_number?i`<a
          class="worker-mini__pr worker-mini__repair-pr"
          href=${e.completion_repair_pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="repair PR 열기"
          >repair #${e.completion_repair_pr_number} ↗</a
        >`:"",ne=r.map(xe=>xe===e.live_badge?i`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${xe}</span
        >`:i`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${xe===e.completion_badge&&e.completion_title||""}
          >${xe}</span
        >`),re=e.reason?i`<span class="worker-mini__reason">${e.reason}</span>`:"",F=n.length>0?n.map(xe=>i`<span class="worker-usage" title=${xe.tooltip}
              >${xe.label}</span
            >`):s?i`<span class="worker-usage" title=${An(e.usage)}
            >${s}</span
          >`:"",q=o?i`<span
        class="merge-step${o.failed?" merge-step--failed":""}"
        style=${`--progress: ${o.percent}%`}
        >${o.label}${o.index>0?i`<span class="merge-step__n"
              >${o.index}/${o.total}</span
            >`:""}</span
      >`:"",I=e.merge_action?i`<button
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
      </button>`:"",S=e.discard,Z=S?.action||e.discard_action?i`<button
          type="button"
          class="worker-mini__discard"
          data-bead-id=${e.id}
          data-attempt-id=${S?.attempt_id||""}
          data-operation-id=${S?.operation?.operation_id||""}
          data-discard-mode=${S?.confirmation||"unmerged"}
          ?disabled=${S?!S.enabled:e.discard_enabled===!1}
          title=${S?S.title:e.discard_enabled===!1?e.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
        >
          ${S?.label||"\uD3D0\uAE30"}
        </button>`:"",ie=e.stale_work||null,D=ie?i`${ie.can_resume||ie.can_continue?i`<button
            type="button"
            class="worker-mini__stale-continue"
            data-bead-id=${e.id}
            data-action-id=${ie.action_id}
            ?disabled=${ie.locked}
          >
            기존 작업 이어가기
          </button>`:""}${ie.can_backup_fresh?i`<button
            type="button"
            class="worker-mini__stale-backup"
            data-bead-id=${e.id}
            data-action-id=${ie.action_id}
            ?disabled=${ie.locked}
          >
            백업 후 새로 시작
          </button>`:""}${ie.can_recheck?i`<button
            type="button"
            class="worker-mini__stale-recheck"
            data-bead-id=${e.id}
            data-action-id=${ie.action_id}
            ?disabled=${ie.locked}
          >
            다시 확인
          </button>`:""}`:"",U=ie?i`<div class="worker-mini__stale">
        <strong>${ie.title}</strong>
        <span>${ie.summary}</span>
        <span>${ie.cause}</span>
        ${ie.can_backup_fresh?i`<small
              >Git-ignored dependency/build output은 archive에 포함되지
              않습니다</small
            >`:""}
      </div>`:"",_e=e.revise_action?i`<button
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
        </button>`:"",we=e.lane!=="pr_wait"&&!e.done&&e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)?i`<div class="worker-mini__exec">
          ${yo(e.exec_chips)}
        </div>`:"",ke=!!(s||o||e.merge_action||e.cancel_action||e.timeline_action||e.discard_action||S?.operation||e.revise_action||ie);return i`<div
    class="worker-mini${a?" worker-mini--card":""}${t?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${e.ghost?" worker-mini--ghost":""}${o?" worker-mini--merging":""}${o?.failed?" worker-mini--merge-failed":""}${e.external?" worker-mini--external":""}"
    style=${o?`--progress: ${o.percent}%`:""}
    draggable=${t?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${l?i`<div class="worker-mini__row1">${b}${x}${A}</div>
          <div class="worker-mini__row2">
            ${F}${c?i`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${It(e.done_at)}`}
                  >완료 ${c}</span
                >`:""}${typeof e.work_ms=="number"?i`<span
                  class="worker-mini__work"
                  title="attempt 실행 시간 합산 (재개 세션 포함)"
                  >작업 ${go(e.work_ms)}</span
                >`:""}${ne}${q}
            <span class="worker-mini__actions"
              >${I}${B}${m}${Z}</span
            >
            ${Rn(e)}
          </div>`:a?i`<div class="worker-mini__head">
              ${u}${d}${b}${x}${L}${G}${ne}${_}${re}
            </div>
            <div class="worker-mini__body">${A}${U}</div>
            ${we}${ke?i`<div class="worker-mini__foot">
                  ${F}${q}
                  <span class="worker-mini__actions"
                    >${I}${B}${m}${Z}${_e}${D}</span
                  >
                  ${Ir(e)}
                </div>`:""}
            ${Rn(e)}`:i`<div class="worker-mini__line">
              ${u}${d}${b}${x}${A}${L}${G}${ne}${_}${re}${F}${q}${I}${B}${m}${Z}
            </div>
            ${we}${Ir(e)} ${Rn(e)}`}
  </div>`}function qm(e,t=null){let r=e.worker_ineligible===!0,n=e.draggable&&!e.done&&!r,s=n&&t&&t.bead_id===e.id,o=e.workflow,a=o&&o.chips||{},l=a.route||o&&o.route,c=a.route_source==="derived"||!!(o&&o.route_source==="derived"),u=typeof e.reason=="string"&&e.reason.split(" \xB7 ").includes("missing_description"),d=typeof e.reason=="string"&&e.reason.startsWith("\u26D4");return i`<div
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
      ${o&&l?i`<span
            class="ctl-chip ctl-chip--route${c?" is-derived":""}"
            title=${c?"route \uBBF8\uD540 (metadata unset)":"route"}
            >${c?"unset":l}</span
          >`:""}
    </div>
    <div class="worker-card__title">${e.title}</div>
    ${o?qs(o,e.status):""}
    ${e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)?i`<div class="worker-mini__exec">
          ${yo(e.exec_chips)}
        </div>`:""}
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
                  class="worker-card__reason${d?" worker-card__reason--danger":""}"
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
              title=${n?"\uB300\uAE30 \uD050 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00":r?"worker-ineligible label\uB85C \uC6CC\uCEE4\uC5D0\uC11C \uC2E4\uD589\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":u?"description\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"spec\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}
            >
              대기로 ↴
            </button>`}
    </div>
    ${Rn(e)}
  </div>`}function dr(e){let t=!!e.collapsible&&!!e.collapsed,r=i`<span
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
                  </div>`:e.items.map(n=>e.lane==="candidate"?qm(n,e.place_menu):Ma(n))}
          </div>`}
  </section>`}function Pa(e,t){return`${e}\0${t}`}function Da(e){let t=new Map;for(let r of Array.isArray(e?.running)?e.running:[])t.set(r.id,{root_dir:r.root_dir,workspace_name:r.workspace_name,lane:"running",state:"running"});for(let r of Array.isArray(e?.pr_wait)?e.pr_wait:[])t.set(r.id,{root_dir:r.root_dir,workspace_name:r.workspace_name,lane:"pr_wait",state:"pr_wait"});for(let r of Array.isArray(e?.queue_groups)?e.queue_groups:[]){let n=Array.isArray(r.sublanes?.parallel)?r.sublanes.parallel:Array.isArray(r.items)?r.items:[];for(let s of n)t.set(s.id,{root_dir:s.root_dir,workspace_name:s.workspace_name,lane:"parallel",position:s.queue_position});for(let s of Array.isArray(r.sublanes?.serial)?r.sublanes.serial:[])for(let o of s.items)t.set(o.id,{root_dir:o.root_dir,workspace_name:o.workspace_name,lane:s.id,position:o.queue_position})}for(let r of Array.isArray(e?.runnable)?e.runnable:[])t.set(r.id,{root_dir:r.root_dir,workspace_name:r.workspace_name,lane:"runnable",state:"runnable"});for(let r of Array.isArray(e?.done)?e.done:[])t.set(r.id,{root_dir:r.root_dir,workspace_name:r.workspace_name,lane:"done",state:"done"});return t}function Fm(e,t){let r=Array.isArray(t)?t:[],n=e.indexOf("-"),s=n>0?e.slice(0,n):e;return r.some(o=>typeof o?.issue_prefix=="string"&&o.issue_prefix===s)?"internal":r.length>0&&r.every(o=>typeof o?.issue_prefix=="string")?"external":"unknown"}function jm(e,t){return e==="internal"&&t===void 0}function au(e){if(e.state==="running")return"\uC2E4\uD589\uC911";if(e.state==="pr_wait")return"PR \uB300\uAE30";if(e.state==="runnable")return"\uC2E4\uD589\uAC00\uB2A5";if(e.state==="done")return"\uC644\uB8CC";let t=e.lane==="parallel"?"\uBCD1\uB82C":e.lane;return`${e.workspace_name} \xB7 ${t} #${e.position}`}function iu(e,t,r,n){let s=r.get(e);if(!!(s&&t&&s.root_dir===t.root_dir&&s.lane===t.lane&&typeof s.position=="number"&&typeof t.position=="number"&&s.position<t.position))return{id:e,label:`\u{1F512} ${e} (\uAC19\uC740 \uB808\uC778 \uC55E)`,scope:null,same_lane_ahead:!0,missing_internal:!1};if(s)return{id:e,label:`\u{1F512} ${e} (${au(s)})`,scope:null,same_lane_ahead:!1,missing_internal:!1};let a=Fm(e,n);return{id:e,label:`\u{1F512} ${e} (${a==="internal"?"\uBBF8\uC801\uC7AC":a==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778"})`,scope:a,same_lane_ahead:!1,missing_internal:jm(a,s)}}function lu(e){let t=Array.isArray(e)?e:[],r=new Map,n=new Map,s=new Map;for(let l of t)for(let c of Array.isArray(l.sublanes?.serial)?l.sublanes.serial:[]){let u=Pa(l.root_dir,c.id);r.set(u,{root_dir:l.root_dir,workspace_name:l.name,lane:c.id}),s.set(u,[]);for(let d of Array.isArray(c.items)?c.items:[])n.set(d.id,u)}for(let l of t)for(let c of Array.isArray(l.sublanes?.serial)?l.sublanes.serial:[]){let u=Pa(l.root_dir,c.id),d=Array.isArray(c.items)?c.items[0]:null,b=!!d&&d.queue_index===0&&(!Array.isArray(c.occupied_by)||c.occupied_by.length===0)&&Array.isArray(d.blocked_by)?d.blocked_by:[],x=s.get(u);if(x)for(let A of b){let L=n.get(A);L&&L!==u&&!x.includes(L)&&x.push(L)}}let o=(l,c)=>{let u=new Set,d=[l];for(;d.length>0;){let _=d.pop();if(_===c)return!0;!_||u.has(_)||(u.add(_),d.push(...s.get(_)||[]))}return!1},a=new Map;for(let[l,c]of s){let u=[];for(let d of c){let _=r.get(d);o(d,l)&&_&&u.push(_)}u.length>0&&a.set(l,u)}return a}function cu(e){let t=Da(e),r=new Map;for(let n of[...Array.isArray(e?.runnable)?e.runnable:[],...Array.isArray(e?.queue)?e.queue:[],...Array.isArray(e?.running)?e.running:[],...Array.isArray(e?.pr_wait)?e.pr_wait:[]])r.has(n.id)||r.set(n.id,n);return Array.from(r.values()).map(n=>({id:n.id,title:n.title,root_dir:n.root_dir,workspace_name:n.workspace_name,location:t.has(n.id)?(()=>{let s=t.get(n.id),o=au(s);return s.state?`${s.workspace_name} \xB7 ${o}`:o})():""}))}function uu(e,t){return Pa(e,t)}var du=[{step:"merge",label:"\uBA38\uC9C0",index:1},{step:"base",label:"base",index:2},{step:"verify",label:"\uAC80\uC99D",index:3},{step:"deploy",label:"\uBC30\uD3EC",index:4},{step:"child",label:"\uC790\uC2DD",index:5},{step:"branch",label:"\uBE0C\uB79C\uCE58",index:6},{step:"close",label:"close",index:7}],ns=[{step:"base_containment",label:"base \uD3EC\uD568 \uD655\uC778"},{step:"repo_operations",label:"\uC800\uC7A5\uC18C \uC791\uC5C5"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"}];function vo(e,t){let r=du.find(s=>s.step===e);if(!r)return null;let n=du.length;return{step:r.step,label:t,index:r.index,total:n,percent:Math.round(r.index/n*100)}}function pu(e){let t=ns.findIndex(r=>r.step===e);return ns.map((r,n)=>({step:r.step,label:r.label,state:t<0?"todo":n<t?"done":n===t?"stall":"todo"}))}function on(e){let t=ns.find(r=>r.step===e);return t?t.label:typeof e=="string"?e:""}function Bm(e){let t=ns.findIndex(r=>r.step===e);return t<0?null:{index:t+1,total:ns.length}}function wo(e){let t=Bm(e);return t?`\uBA38\uC9C0 \uC644\uB8CC \xB7 \uC815\uB9AC ${t.total}\uB2E8\uACC4 \uC911 ${t.index}\uB2E8\uACC4\uC5D0\uC11C \uBA48\uCDA4`:"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644"}var qa=new Set(["queued","running","retry_pending","repairing"]),fu=new Set(["failed","succeeded"]),Um={queued:"\uB300\uAE30",running:"\uC911",retry_pending:"\uC7AC\uC2DC\uB3C4 \uB300\uAE30",repairing:"\uC790\uB3D9 \uD574\uACB0 \uC911",failed:"\uC2E4\uD328",succeeded:"\uC644\uB8CC \xB7 \uC815\uB9AC \uC7AC\uAC1C \uB300\uAE30"},ss={base_containment:{step:"base",label:"base \uD655\uC778 \uC911"},child_sweep:{step:"child",label:"\uC790\uC2DD \uC815\uB9AC \uC911"},branch_cleanup:{step:"branch",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC \uC911"},parent_close:{step:"close",label:"\uBD80\uBAA8 close \uC911"}},Wm={merging:{step:"merge",label:"\uBA38\uC9C0 \uC911"},base_containment:ss.base_containment,child_sweep:ss.child_sweep,branch_cleanup:ss.branch_cleanup,parent_close:ss.parent_close};function zm(e){return typeof e=="string"&&/^[0-9a-f]{40}$/.test(e)}function Hm(e,t,r){return!["verify","deploy"].includes(e.kind)||![...qa,...fu].includes(e.state)||![null,void 0,""].includes(e.superseded_by)||!Array.isArray(e.subjects)?!1:e.subjects.some(n=>n&&typeof n=="object"&&n.bead_id===t&&n.merged_sha===r)}function Gm(e,t){let r=(t.kind==="deploy"?2:1)-(e.kind==="deploy"?2:1);if(r!==0)return r;let n=u=>u.state==="succeeded"?1:2,s=n(t)-n(e);if(s!==0)return s;let o=typeof e.requested_at=="number"?e.requested_at:0,a=typeof t.requested_at=="number"?t.requested_at:0;if(o!==a)return a-o;let l=typeof e.operation_id=="string"?e.operation_id:"",c=typeof t.operation_id=="string"?t.operation_id:"";return l.localeCompare(c)}function Na(e,t=!1){let r=e.kind,n=r==="verify"?"\uAC80\uC99D":"\uBC30\uD3EC",s=t?"failed":e.state,o=Um[s];if(!o)return null;let a=vo(r,`${n} ${o}`);return a?{...a,active:qa.has(s),failed:s==="failed"}:null}function Vm(e){return!e||typeof e!="object"?null:Wm[e.step]||null}function os(e){if(!e||typeof e.bead_id!="string")return null;let t=e.bead_id,r=e.merge_progress&&typeof e.merge_progress=="object"?e.merge_progress:{},n=Vm(r),s=e.cleanup_failed&&typeof e.cleanup_failed=="object"?e.cleanup_failed:null,o=["child_sweep","branch_cleanup","parent_close"].includes(typeof e.cleanup_cursor=="string"?e.cleanup_cursor:""),a=!o&&(e.cleanup_cursor==="repo_operations"||r.step==="repo_operations"),l=zm(e.merge_sha)?e.merge_sha:null,c=!o&&l&&Array.isArray(e.repo_operations)?e.repo_operations.filter(A=>A&&typeof A=="object"&&Hm(A,t,l)).sort(Gm):[],u=a?c:[],d=u.find(A=>qa.has(A.state));if(d)return Na(d);if(s)return s.step==="repo_operations"&&c[0]?Na(c[0],!0):null;let _=u.find(A=>fu.has(A.state)?A.state!=="succeeded"||e.cleanup_cursor==="repo_operations":!1);if(_)return Na(_);if(n){let A=vo(n.step,n.label);return A?{...A,active:!0,failed:!1}:null}let b=typeof e.cleanup_cursor=="string"?ss[e.cleanup_cursor]:null;if(!b)return null;let x=vo(b.step,b.label);return x?{...x,active:!0,failed:!1}:null}function ko(e){return!!e&&e.step!=="merge"&&e.failed!==!0}var _u={verify_failed:"\uAC80\uC99D \uC2E4\uD328",verify_cmd_failed:"\uAC80\uC99D \uC2E4\uD328",verify_script_failure:"\uAC80\uC99D \uC2E4\uD328",deploy_failed:"\uBC30\uD3EC \uC2E4\uD328",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328",interrupted_without_terminal_exit:"\uC911\uB2E8\uB428"},mu={repo_ops_worktree_unowned:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uAC00 \uC544\uC9C1 Worker \uC18C\uC720\uAC00 \uC544\uB2C8\uC5B4\uC11C \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804\uC5D0 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",verify_cmd_failed:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D \uBA85\uB839\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",gh_observation_failed:"GitHub\uC5D0\uC11C PR \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_script_failure:"\uAC80\uC99D \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",deploy_script_failure:"\uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",interrupted_without_terminal_exit:"\uC791\uC5C5\uC774 \uC885\uB8CC \uAE30\uB85D \uC5C6\uC774 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",base_unresolved:"PR\uC774 \uC5B4\uB290 base \uBE0C\uB79C\uCE58\uB85C \uBA38\uC9C0\uB418\uB294\uC9C0 \uD655\uC815\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ref_unobserved:"PR\uC758 base \uBE0C\uB79C\uCE58\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",merge_sha_unobserved:"\uBA38\uC9C0 \uCEE4\uBC0B SHA\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_fetch_failed:"\uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uB97C fetch\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_rev_unavailable:"fetch\uD55C \uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uC758 \uCEE4\uBC0B\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ff_diverged:"\uB85C\uCEEC base \uBE0C\uB79C\uCE58\uAC00 \uC6D0\uACA9\uACFC \uAC08\uB77C\uC838 fast-forward\uB85C \uC815\uB82C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",deployment_target_not_covering_merge:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",deployment_candidate_ancestry_check_failed:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uB294\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."};function gu(e){return typeof e!="string"||e.length===0?[]:e.split(":").filter(t=>t.length>0)}function Fa(e){for(let t of gu(e))if(Object.hasOwn(_u,t))return _u[t];return null}function ja(e){let t=null;for(let r of gu(e))Object.hasOwn(mu,r)&&(t=mu[r]);return t}function $o(e){let t=Fa(e),r=ja(e);return t&&r?`${t} \u2014 ${r}`:t||r?t||r:typeof e=="string"?e:""}function bu(e,t){let r=Fa(e)??Fa(t),n=ja(t)??ja(e);return r&&n?`${r} \u2014 ${n}`:r||n?r||n:typeof t=="string"?t:""}var hu=160;function Km(e){return e.length>hu?`${e.slice(0,hu)}\u2026`:e}function Ym(e){return!e||!e.reason?"":i`<div class="worker-banner__detail">
    가드:
    ${e.reason}${e.command?i` · <code>${Km(e.command)}</code>`:""}
  </div>`}function Zm(e){return e?i`<details class="worker-banner__raw">
    <summary>세부</summary>
    <dl class="worker-banner__kv">
      <div>
        <dt>실패 코드</dt>
        <dd>${e}</dd>
      </div>
    </dl>
  </details>`:""}function Ba(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),r=Math.floor(t/60),n=t%60;return r>0?`${r}m ${String(n).padStart(2,"0")}s`:`${n}s`}function yu(e){let t=e.failure?$o(e.failure.reason):"";return i`<div class="worker-banners">
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
          ${Ym(e.failure.cause_detail)}
          ${Zm(e.failure.reason)}
          ${Ir({discard:e.failure.discard})}
        </div>`:""}
  </div>`}function Xm(e,t,r=null){let n=e.failed===!0,s=!!e.paused,o=n?e.status_label||(e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):s?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?Ba(t-e.started_at):"\u2014",a=e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)?e.exec_chips:null,l=Dr(e),c=Ot(e.usage),u=ir(e.usage),d=e.conflict_resolution?s?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,_=e.base_exception||null,b=e.landing,x=e.attempt_id&&e.attempt_id===r,A=e.discard?.action?i`<button
        type="button"
        class="rtile__discard"
        data-operation-id=${e.discard.operation?.operation_id||""}
        ?disabled=${!e.discard.enabled}
        title=${e.discard.title}
        aria-label=${e.discard.label}
      >
        ${e.discard.label}
      </button>`:"";return i`<div
    class="rtile${x?" rtile--sel":""}${s?" rtile--paused":""}${n?" rtile--failed":""}"
    data-bead-id=${e.bead_id}
    data-attempt-id=${e.attempt_id||""}
  >
    <div class="rtile__hd">
      <span class="rtile__dot" aria-hidden="true"></span>
      <span class="rtile__id" title="클릭하면 ID 복사">${e.bead_id}</span>
      ${l?i`<span class="rtile__resumed" title=${l}>↻</span>`:""}
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
    ${e.rollup?Ns(e.rollup,{parent_id:e.bead_id,expanded:e.rollup_expanded===!0,childChips:Zo}):""}
    ${b?i`<div class="rtile__landing">
          <span
            class="merge-step${b.failed?" merge-step--failed":""}"
            style=${`--progress: ${b.percent}%`}
            >${b.label}${b.index>0?i`<span class="merge-step__n"
                  >${b.index}/${b.total}</span
                >`:""}</span
          >
        </div>`:""}
    ${a||c.length>0||u||d||_?i`<div class="rtile__meta">
          ${d?i`<span class="worker-mini__badge">${d}</span>`:""}
          ${_?i`<span
                class="worker-mini__badge"
                title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
                >${_}</span
              >`:""}
          ${yo(e.exec_chips)}
          ${c.length>0?c.map(L=>i`<span class="worker-usage" title=${L.tooltip}
                    >${L.label}</span
                  >`):u?i`<span
                  class="worker-usage"
                  title=${An(e.usage)}
                  >${u}</span
                >`:""}
        </div>`:""}
    ${Rn(e)} ${Ir(e)}
    <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일).
         quick_fix landing의 실제 진행은 위의 별도 진행 줄이 소유한다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
    ${n||s?"":i`<div class="rtile__accent" aria-hidden="true"></div>`}
  </div>`}function Ua(e,t=Date.now(),r=null){let n=Array.isArray(e)?e:[];return i`<div class="worker-rungrid" id="worker-rungrid">
    ${n.length===0?i`<div class="worker-rungrid__empty">실행 세션 없음</div>`:n.map(s=>Xm(s,t,r))}
  </div>`}function an(e){return i`<svg
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
  </svg>`}function Wa(){return an(Or`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function za(){return an(Or`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function vu(){return an(Or`<rect x="4.3" y="4.3" width="7.4" height="7.4" rx="1.2" />`)}function wu(){return an(Or`<path d="M4.4 4.4 11.6 11.6M11.6 4.4 4.4 11.6" />`)}function ku(){return an(Or`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function $u(){return an(Or`<rect x="2.6" y="2.6" width="7.4" height="7.4" rx="1.2" />
    <path d="M6 13.4h6a1.4 1.4 0 0 0 1.4-1.4V6" />`)}function xu(){return an(Or`<path d="M3 3.6 8.2 8 3 12.4z" />
    <path d="M8.8 3.6 14 8l-5.2 4.4z" />`)}var as=1,Qm=6e4,Jm={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328"},eg=new Set(["auto_merge","merged","merge","done"]),Au={running:3,paused:2,failed:1};function tg(e,t){let r=null,n=-1/0;for(let s of Object.values(e)){if(!s||s.bead_id!==t||s.status==="running")continue;let o=typeof s.finished_at=="number"?s.finished_at:typeof s.started_at=="number"?s.started_at:0;o>=n&&(n=o,r=s)}return r}function rg(e,t){let r=Object.values(e||{}),n=new Set,s=new Map;for(let a of r)!a||typeof a.bead_id!="string"||(typeof a.resumed_from=="string"&&a.resumed_from.length>0&&n.add(a.resumed_from),s.set(a.bead_id,a.attempt_id));let o=new Map;for(let a of r){if(!a||typeof a.bead_id!="string"||a.bead_id.length===0)continue;let l=null;if(a.status==="running")l="running";else if(a.status==="paused"&&!n.has(a.attempt_id))l="paused";else if(a.status==="failed"||a.status==="orphaned"){let _=t.get(a.bead_id),b=typeof _=="number"&&_>0&&typeof a.finished_at=="number"&&_>=a.finished_at;s.get(a.bead_id)===a.attempt_id&&!b&&typeof a.dismissed_at!="number"&&(l="failed")}if(!l)continue;let c=typeof a.started_at=="number"?a.started_at:null,u=o.get(a.bead_id);if(u){let _=Au[u.run_state],b=Au[l];if(_>b||_===b&&(u.started_at??0)>(c??0))continue}let d=typeof a.session_id=="string"&&a.session_id.length>0;o.set(a.bead_id,{attempt_id:typeof a.attempt_id=="string"?a.attempt_id:"",run_state:l,started_at:c,last_event_at:typeof a.last_event_at=="number"?a.last_event_at:null,runner:typeof a.runner=="string"?a.runner:null,model:typeof a.model=="string"?a.model:null,effort:typeof a.effort=="string"?a.effort:null,speed:typeof a.speed=="string"?a.speed:null,resumed_from:typeof a.resumed_from=="string"?a.resumed_from:null,continuation_mode:a.continuation_mode==="session"||a.continuation_mode==="fresh"?a.continuation_mode:null,usage:Jt(e,a.bead_id),can_pause:l==="running"&&d,can_resume:l!=="running"&&d&&!n.has(a.attempt_id)})}return o}function Su(e,t){let r=e[t];if(!r)return"";if(r.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let n=typeof r.reason=="string"?r.reason:"",s=n.indexOf(":");return s>0&&s<n.length-1?`\u26D4 ${n.slice(0,s)} (${n.slice(s+1)})`:`\u26D4 ${n}`}function Mt(e){return e&&typeof e=="object"?e:{}}function Ha(e,t,r){let n=Array.isArray(e)?e:[],s=Array.isArray(t)?t:[],o=r&&typeof r.done_since=="number"?r.done_since:void 0,a=new Map;for(let m of s)m&&typeof m.root_dir=="string"&&a.set(m.root_dir,m);let l=[],c=[],u=[],d=[],_=[],b=[],x=new Map,A=new Map,L=new Map;for(let m of n){if(!m||typeof m.root_dir!="string")continue;let S=m.root_dir,Z=m.name||S,ie=a.get(S),D=ie&&typeof ie.revision=="number"?ie.revision:typeof m.revision=="number"?m.revision:0,U=Mt(m.attempts),_e=Mt(m.bead_titles),we=Mt(m.pr_observations),ke=Mt(m.admission),xe=Mt(m.revise_parked),We=Mt(m.merge_queue_state),rt=Mt(m.cleanup_failed),Ne=Mt(m.discard_operations),He=Mt(m.bead_blocked_by),ue=Mt(m.pr_activity),Fe=Array.isArray(m.repo_operations)?m.repo_operations:[],Le=Array.isArray(m.merge_queue)?m.merge_queue:[],Ge=new Set(Le.filter(W=>W&&typeof W.bead_id=="string").map(W=>W.bead_id)),Ie=new Map(Le.filter(W=>W&&typeof W.bead_id=="string").map(W=>[W.bead_id,W])),Ve=Array.isArray(m.queue)?m.queue:[],st=(Array.isArray(m.serial_lanes)?m.serial_lanes:[]).filter(W=>W&&/^s[1-5]$/.test(W.id)&&Array.isArray(W.entries)),Ce=Mt(m.lane_states),Xe=typeof m.serial_lane_count=="number"?Math.max(0,Math.min(5,Math.floor(m.serial_lane_count))):Math.min(5,st.length);L.set(S,Xe);let K=new Map(st.map(W=>[W.id,W])),X=new Map;for(let W of st)for(let Y of W.entries)Y&&typeof Y.bead_id=="string"&&X.set(Y.bead_id,W.id);let $e=Array.isArray(m.done)?m.done:[];for(let W of $e)W&&typeof W.bead_id=="string"&&b.push({id:W.bead_id,root_dir:S,workspace_name:Z});let Oe=new Map;for(let W of $e)W&&typeof W.bead_id=="string"&&typeof W.added_at=="number"&&Oe.set(W.bead_id,W.added_at);let je=W=>({id:W,title:_e[W]||W,root_dir:S,workspace_name:Z,expected_revision:D,draggable:!1}),ze=new Set;for(let[W,Y]of rg(U,Oe))ze.add(W),c.push({...je(W),lane:"running",...X.has(W)?{serial_lane_id:X.get(W)}:{},attempt_id:Y.attempt_id,run_state:Y.run_state,can_pause:Y.can_pause,can_resume:Y.can_resume,started_at:Y.started_at,last_event_at:Y.last_event_at,runner:Y.runner,model:Y.model,effort:Y.effort,speed:Y.speed,resumed_from:Y.resumed_from,continuation_mode:Y.continuation_mode,usage:Y.usage,discard:yr(Ne,W,{attempt_id:Y.attempt_id}),badges:Y.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:Y.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:[],alert:Y.run_state==="failed"});for(let W of Array.isArray(m.pr_wait)?m.pr_wait:[]){let Y=W&&W.bead_id;if(typeof Y!="string"||ze.has(Y))continue;ze.add(Y);let ye=Mt(we[Y]),nt=Mt(ye.pr),ve=ye.gate?Mt(ye.gate):null,T=Ge.has(Y),M=Ie.get(Y)?.continuation_action||null,P=!!M&&M.continuation===null,V=We.active===Y,oe=W.external===!0,y=rt[Y]||null,R=Mt(ue[Y]),N=os({bead_id:Y,merge_sha:W.merge_sha,cleanup_cursor:W.cleanup_cursor,merge_progress:R.merge_progress||null,cleanup_failed:y,repo_operations:Fe}),fe=ko(N),de=!!ve&&ve.base_badge==="\uCDA9\uB3CC",Se=!!y&&["child_sweep","branch_cleanup","parent_close"].includes(y.step)&&!!ve&&ve.tier==="merged",Pe=oe&&!!y&&!!ve&&ve.tier==="merged",Ke=!!ve&&["closed_unmerged","review","undecidable"].includes(ve.tier),Ye=yr(Ne,Y,{external:oe,merge_active:V||N?.step==="merge",merge_queued:T,cleanup_active:fe,merged:!!y||ve?.tier==="merged"}),z=!!Ye.operation;u.push({...je(Y),lane:"pr_wait",pr_number:typeof nt.number=="number"?nt.number:null,pr_url:typeof nt.url=="string"?nt.url:void 0,external:oe,usage:Jt(U,Y),merge_step:N,badges:P?["\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"]:N?[ve?.tier==="merged"?"\uBA38\uC9C0\uB428":"\uBA38\uC9C0 \uC911"]:y?[on(y.step)?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${on(y.step)}`:"\uC815\uB9AC \uBA48\uCDA4"]:typeof ve?.gate_badge=="string"&&ve.gate_badge.length>0?[ve.gate_badge]:[],alert:N?N.failed===!0:!!y||Ke,reason:y&&N?.active!==!0?wo(y.step):"PR \uB300\uAE30",merge_action:ve?.tier==="merged"&&!Se&&!Pe?!1:!T||P,merge_enabled:!z&&(P||ve?.enabled===!0||de||Se||Pe),merge_label:P?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":Pe||Se?"\uC815\uB9AC \uC7AC\uAC1C":de&&!Se?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:P?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":z?Ye.error?`\uD3D0\uAE30 \uC2E4\uD328: ${Ye.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${Ye.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:Pe?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Se?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":de?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":ve?.enabled===!0?`\uBA38\uC9C0 (${ve.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${ve?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:T&&!P,cancel_enabled:!V,continuation_mismatch:M?.mismatch||null,discard:Ye,discard_action:Ye.action,discard_enabled:Ye.enabled,discard_title:Ye.title})}let Ue=(W,Y,ye,nt)=>{let ve=W&&W.bead_id;if(typeof ve!="string"||ze.has(ve))return null;ze.add(ve);let T=xe[ve],M=yr(Ne,ve),P=M.operation?M:null,V={...je(ve),lane:Y,draggable:!P,discard:P||void 0,reason:Su(ke,ve),queue_position:ye+1,queue_index:ye,queue_length:nt,badges:T?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!T,revise_action:!!T,revise_enabled:!!T&&!P,revise_title:T?T.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${T.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""};return Object.hasOwn(He,ve)&&(V.blocked_by=Array.isArray(He[ve])?He[ve].filter(oe=>typeof oe=="string"&&oe.length>0):[]),V};for(let W=0;W<Ve.length;W++){let Y=Ue(Ve[W],"queue",W,Ve.length);if(!Y)continue;d.push(Y);let ye=x.get(S);ye?ye.push(Y):x.set(S,[Y])}let lt=[];for(let W=0;W<st.length;W++){let Y=st[W],ye=[];for(let ve=0;ve<Y.entries.length;ve++){let T=Ue(Y.entries[ve],Y.id,ve,Y.entries.length);T&&(ye.push(T),d.push(T))}if(ye.length===0)continue;let nt=Mt(Ce[Y.id]);lt.push({id:Y.id,index:W,items:ye,occupied_by:Array.isArray(nt.occupied_by)?nt.occupied_by.filter(ve=>typeof ve=="string"):[],corrections:Array.isArray(nt.corrections)?nt.corrections.length:0,cycle:nt.cycle===!0})}A.set(S,lt);let ut=Array.from({length:Xe},(W,Y)=>{let ye=`s${Y+1}`,nt=K.get(ye),ve=nt&&Array.isArray(nt.entries)?nt.entries:[],T=Mt(Ce[ye]);return{id:ye,index:ve.length,length:ve.length,occupied_by:Array.isArray(T.occupied_by)?T.occupied_by.filter(M=>typeof M=="string"):[]}});for(let W of Array.isArray(m.runnable)?m.runnable:[]){let Y=W&&W.bead_id;typeof Y!="string"||ze.has(Y)||(ze.add(Y),l.push({...je(Y),title:W.title||_e[Y]||Y,lane:"runnable",draggable:!0,reason:Su(ke,Y),created_at:W.created_at??void 0,updated_at:W.updated_at??void 0,labels:Array.isArray(W.labels)?W.labels:[],spec_reviewer:typeof W.spec_reviewer=="string"?W.spec_reviewer:void 0,plan_state:W.plan_state==="approved"||W.plan_state==="authored"?W.plan_state:"none",workflow:W.route?{route:W.route,chips:{route:W.route}}:null,blocked:W.blocked===!0,...Array.isArray(W.blocked_by)?{blocked_by:W.blocked_by.filter(ye=>typeof ye=="string"&&ye.length>0)}:{},place_index:Ve.length,place_lanes:ut}))}for(let W of $e){let Y=W&&W.bead_id;if(typeof Y!="string"||ze.has(Y)||(ze.add(Y),o!==void 0&&typeof W.added_at=="number"&&W.added_at<o))continue;let ye=tg(U,Y);_.push({...je(Y),lane:"done",done:!0,usage:Jt(U,Y),done_at:typeof W.added_at=="number"?W.added_at:void 0,done_kind:ye&&typeof ye.done_kind=="string"?ye.done_kind:null})}}let G=new Map;s.forEach((m,S)=>{m&&typeof m.root_dir=="string"&&G.set(m.root_dir,S)});let ne=r&&r.running_sort==="repo"?"repo":"started";c.sort((m,S)=>{if(ne==="repo"){let D=G.get(m.root_dir)??Number.MAX_SAFE_INTEGER,U=G.get(S.root_dir)??Number.MAX_SAFE_INTEGER;if(D!==U)return D-U}let Z=typeof m.started_at=="number"&&Number.isFinite(m.started_at)?m.started_at:null,ie=typeof S.started_at=="number"&&Number.isFinite(S.started_at)?S.started_at:null;return Z!==null&&ie!==null&&Z!==ie?Z-ie:Z===null&&ie!==null?1:Z!==null&&ie===null?-1:m.id.localeCompare(S.id)}),_.sort((m,S)=>(S.done_at??0)-(m.done_at??0));let re=s.length>0?s:n.map(m=>({root_dir:m&&m.root_dir,name:m&&m.name,auto_advance:m&&m.auto_advance,auto_merge:m&&m.auto_merge,slots:m&&m.slots,revision:m&&m.revision,runner_catalog:m&&m.runner_catalog})),F=[];for(let m of re){if(!m||typeof m.root_dir!="string")continue;let S=x.get(m.root_dir)||[],Z=A.get(m.root_dir)||[];F.push({root_dir:m.root_dir,name:m.name||m.root_dir,auto_advance:m.auto_advance===!0,auto_merge:m.auto_merge===!0,slots:typeof m.slots=="number"&&m.slots>=as?m.slots:as,revision:typeof m.revision=="number"?m.revision:0,runner_catalog:Mt(m.runner_catalog),items:S,sublanes:{parallel:S,serial:Z},serial_lane_count:L.get(m.root_dir)||0})}let q={runnable:l,queue:d,queue_groups:F,running:c,pr_wait:u,done:_,automation:{total:F.length,both_on:F.filter(m=>m.auto_advance&&m.auto_merge).length}},I=Da(q);for(let m of b)I.has(m.id)||I.set(m.id,{root_dir:m.root_dir,workspace_name:m.workspace_name,lane:"done",state:"done"});for(let m of[...q.queue,...q.runnable]){if(!Object.hasOwn(m,"blocked_by"))continue;let S=I.get(m.id);m.blockers=(m.blocked_by||[]).map(Z=>iu(Z,S,I,s)),m.blocker_warnings=m.blockers.filter(Z=>Z.missing_internal).map(Z=>`\u26A0 \uC120\uD589 ${Z.id}\uAC00 \uC5B4\uB290 \uB808\uC778\uC5D0\uB3C4 \uC5C6\uACE0 \uC2E4\uD589 \uC911\uB3C4 \uC544\uB2D8 \u2014 \uC218\uB3D9 \uAC1C\uC785 \uC804\uAE4C\uC9C0 \uC774 \uC790\uB9AC\uC5D0\uC11C \uC815\uC9C0`),m.blocker_warnings.length>0&&(m.alert=!0)}let B=lu(q.queue_groups);for(let m of q.queue_groups)for(let S of m.sublanes.serial){let Z=B.get(uu(m.root_dir,S.id));Z&&(S.cross_wait_peers=Z)}return q}function ng(e,t){if(typeof e!="number"||!Number.isFinite(e))return"";let n=t-e<Qm;return i`<span
    class="mon-beat${n?" mon-beat--live":""}"
    title=${`\uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${It(e)}`}
    ><span class="mon-beat__dot" aria-hidden="true"></span>${n?"":i`<span class="mon-beat__age"
          >${Gt(e,t)}</span
        >`}</span
  >`}function is(e){return i`<div class="mon-c__title">${e.title}</div>`}function ls(e){return i`<span class="mon-c__id" title="클릭하면 상세로 이동"
    >${e.id}</span
  >`}function xo(e){return e.workspace_name?i`<span class="mon-c__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:""}function Ga(e){let t=Ot(e.usage),r=ir(e.usage);return t.length>0?t.map(n=>i`<span class="mon-c__usage" title=${n.tooltip}
          >${n.label}</span
        >`):r?i`<span class="mon-c__usage" title=${An(e.usage)}
        >${r}</span
      >`:""}function Va(e){return(Array.isArray(e.badges)?e.badges:[]).map(r=>i`<span class="mon-c__badge${e.alert?" mon-c__badge--alert":""}"
        >${r}</span
      >`)}function sg(e){return i`<span class="mon-c__ops">
    ${e.run_state==="running"?i`<button
          type="button"
          class="mon-op mon-op--pause"
          ?disabled=${e.can_pause===!1}
          aria-label="일시정지"
          title="일시정지 — 세션을 끊고 이어하기 가능 상태로 둡니다"
        >
          ${za()}
        </button>`:i`<button
          type="button"
          class="mon-op mon-op--resume"
          ?disabled=${e.can_resume===!1}
          aria-label="이어하기"
          title="이어하기"
        >
          ${Wa()}
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
          ${wu()}
        </button>`:""}
  </span>`}function Eu(e){if(!Object.hasOwn(e,"blocked_by"))return"";let t=Array.isArray(e.blockers)?e.blockers:[];return t.length===0?e.blocked?i`<span class="mon-blocker">🔒 blocked</span>`:"":t.map(r=>i`<span
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
      </span>`)}function Tu(e){let t=Array.isArray(e.blocker_warnings)?e.blocker_warnings:[];return t.length>0?i`<div class="mon-blocker-warnings">
        ${t.map(r=>i`<div class="mon-blocker-warning">${r}</div>`)}
      </div>`:""}function Cu(){return i`<span class="mon-link mon-popover-owner">
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
  </span>`}function og(e,t){let r=typeof e.started_at=="number"?Ba(t-e.started_at):"";return i`${is(e)}
    <div class="mon-c__meta">
      ${Va(e)}${ng(e.last_event_at,t)}${ls(e)}${xo(e)}
      ${gr(e)?i`<span class="mon-c__model">${gr(e)}</span>`:""}
      ${Dr(e)?i`<span
            class="rtile__resumed"
            title=${Dr(e)}
            >↻</span
          >`:""}
      ${e.serial_lane_id?i`<span class="mon-c__lane">${e.serial_lane_id}</span>`:""}
      ${r?i`<span class="mon-live__elapsed">${r}</span>`:""}
      ${Ga(e)}${sg(e)}${Ir(e)}
    </div>`}function ag(e){let t=e.workflow,n=(t&&t.chips||{}).route||t&&t.route,s=typeof e.spec_reviewer=="string"?e.spec_reviewer:"",o=e.plan_state==="approved"?"plan \u2713":e.plan_state==="authored"?"plan \u270E":"plan \u2013",a=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),l=Gt(e.updated_at);return i`${is(e)}
    <div class="mon-c__meta">
      <span class="mon-c__grip" aria-hidden="true">⠿</span>${ls(e)}
      ${n?i`<span class="ctl-chip ctl-chip--route">${n}</span>`:""}
      ${s?i`<span
            class="ctl-chip mon-c__review${s==="skipped"?" mon-c__review--dim":""}"
            >spec:${s}</span
          >`:""}
      ${n==="full_plan"?i`<span
            class="ctl-chip mon-c__plan${e.plan_state==="none"?" mon-c__review--dim":""}"
            >${o}</span
          >`:""}
      ${Ds(e.labels,null).map(c=>i`<span class="ctl-chip ctl-chip--label">${c}</span>`)}
      ${xo(e)}
      ${l?i`<span title=${`\uC218\uC815 ${It(e.updated_at)}`}
            >수정 ${l}</span
          >`:""}
      ${e.reason?i`<span
            class="mon-c__reason${a?" mon-c__reason--danger":""}"
            >${e.reason}</span
          >`:""}
      ${Eu(e)}
      <span class="mon-c__ops">
        ${Cu()}
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
            ${(e.place_lanes||[]).map(c=>i`<button
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
    ${Tu(e)}`}function ig(e){let t=!!e.discard?.operation;return i`${is(e)}
    <div class="mon-c__meta">
      <span class="mon-c__grip" aria-hidden="true">⠿</span>
      <span class="mon-live__pos">#${e.queue_position}</span>${ls(e)}
      ${Va(e)}
      ${e.reason?i`<span class="mon-c__reason">${e.reason}</span>`:""}
      ${Eu(e)}
      <span class="mon-c__ops">
        ${Cu()}
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
    ${Tu(e)} ${Ir(e)}
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
        </div>`:""}`}function lg(e){let t=e.merge_step||null,r=!!(ir(e.usage)||t||e.merge_action||e.cancel_action||e.discard_action);return i`${is(e)}
    <div class="mon-c__meta">
      ${ls(e)}${xo(e)}
      ${e.pr_url&&e.pr_number?i`<a
            class="mon-c__pr"
            href=${e.pr_url}
            target="_blank"
            rel="noreferrer noopener"
            title="PR 열기"
            >#${e.pr_number} ↗</a
          >`:""}
      ${Va(e)}
      ${e.reason?i`<span class="mon-c__reason">${e.reason}</span>`:""}
    </div>
    ${r?i`<div class="mon-c__tail">
          ${Ga(e)}${t?i`<span
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
          ${Ir(e)}
        </div>`:""}`}function cg(e,t){let r=e.done_kind||"",n=r?Jm[r]||r:"",s=Gt(e.done_at,t);return i`${is(e)}
    <div class="mon-c__meta">
      ${ls(e)}${xo(e)}
      ${n?i`<span
            class="mon-live__kind${eg.has(r)?" mon-live__kind--ok":" mon-live__kind--warn"}"
            >${n}</span
          >`:""}
      ${Ga(e)}
      ${s?i`<span title=${`\uC644\uB8CC ${It(e.done_at)}`}
            >완료 ${s}</span
          >`:""}
    </div>`}function Ru(e,t){return e.lane==="running"?og(e,t):e.lane==="runnable"?ag(e):e.lane==="queue"||/^s[1-5]$/.test(e.lane)?ig(e):e.lane==="pr_wait"?lg(e):cg(e,t)}function Iu(e){let t=String(e.revision),r=e.sublanes?e.sublanes.parallel.length+e.sublanes.serial.reduce((n,s)=>n+s.items.length,0):e.items.length;return i`<header
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
        ${e.auto_advance?za():Wa()}
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
        ${ku()}
        <span class="mon-ctl__label">머지</span>
      </button>
      <label class="mon-ctl mon-ctl--slots" title="동시에 실행할 세션 수">
        ${$u()}
        <span class="mon-ctl__label">슬롯</span>
        <input
          type="number"
          class="mon-slots__input"
          min=${as}
          step="1"
          data-root-dir=${e.root_dir}
          data-revision=${t}
          aria-label=${`${e.name} \uB3D9\uC2DC \uC2E4\uD589 \uC2AC\uB86F`}
          .value=${String(e.slots)}
        />
      </label>
    </span>
  </header>`}function Lu(e){let{total:t,both_on:r}=e.automation,n=t>0&&r===t,s=e.running_sort==="repo"?"repo":"started",o=mr.find(l=>l.value===e.done_range)?.label||"",a=Array.isArray(e.token_total)?e.token_total:e.token_total?[{label:e.token_total,tooltip:e.token_tooltip}]:[];return i`<div class="mon-top">
    <button
      type="button"
      class="mon-auto-all${n?" is-active":""}"
      data-on=${n?"false":"true"}
      aria-pressed=${n?"true":"false"}
      ?disabled=${t===0}
      title=${n?"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uB055\uB2C8\uB2E4 (\uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4)":"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uCF2D\uB2C8\uB2E4"}
    >
      ${n?vu():xu()}
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
        ${mr.map(l=>i`<option
              value=${l.value}
              ?selected=${e.done_range===l.value}
            >
              ${l.label}
            </option>`)}
      </select>
      ${a.map(l=>i`<span
            class="mon-kpi__chip mon-kpi__chip--tokens"
            title=${l.tooltip}
            >${o} 완료 · 누적 ${l.label}</span
          >`)}
    </div>
  </div>`}function Ou(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function Mu(e){let t=(Array.isArray(e)?e:[]).map(l=>l&&l.usage).filter(l=>l&&typeof l=="object"&&"providers"in l);if(t.length>0)return Ot(Ws(t));let r={};for(let l of xr)r[l]=0;let n=!1,s=0,o=0,a=0;for(let l of Array.isArray(e)?e:[]){let c=l&&l.usage;if(c&&typeof c=="object"){let u=!1;for(let d of xr){let _=c[d];typeof _=="number"&&Number.isFinite(_)&&(r[d]+=_,n=!0,u=!0)}if(u){o+=1;let d=c.total_cost_usd;typeof d=="number"&&Number.isFinite(d)&&(s+=d,a+=1)}}}return o>0&&a===o&&(r.total_cost_usd=s),n?ir(r):null}var Pu="bdui.monitor.done-range",Du="bdui.monitor.running_sort",Nu="beads-ui.monitor.candidate-filter",Ka={show_blocked:!1};function ug(){try{let e=window.localStorage.getItem(Nu);if(!e)return{...Ka};let t=JSON.parse(e);return!t||typeof t!="object"?{...Ka}:{show_blocked:t.show_blocked===!0}}catch{return{...Ka}}}function dg(e){try{window.localStorage.setItem(Nu,JSON.stringify({show_blocked:e.show_blocked}))}catch{}}function pg(e,t){if(t.show_blocked)return{visible:e,hidden_blocked:0};let r=e.filter(n=>n.blocked!==!0);return{visible:r,hidden_blocked:e.length-r.length}}function fg(){try{let e=window.localStorage.getItem(Pu);return Qt(e)?e:Ht}catch{return Ht}}function _g(e){try{window.localStorage.setItem(Pu,e)}catch{}}function mg(){try{return window.localStorage.getItem(Du)==="repo"?"repo":"started"}catch{return"started"}}function gg(e){try{window.localStorage.setItem(Du,e)}catch{}}var qu="tab:monitor:pipeline",bg=1e3,hg=[{lane:"runnable",pane:"candidate",title:"\uC2E4\uD589\uAC00\uB2A5",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589\uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}];function Ao(e,t){let r=(e.lane==="runnable"||e.lane==="queue")&&e.draggable!==!1;return i`<div
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
    ${Ru(e,t)}
  </div>`}function yg(e,t){let r=e.serial_lane_count>0||e.sublanes.serial.length>0,n=r?i`<section class="mon-sublane mon-sublane--parallel">
        <header class="mon-sublane__hd">
          <span class="mon-sublane__name">병렬</span>
          <span class="mon-sublane__count"
            >대기 ${e.sublanes.parallel.length}</span
          >
        </header>
        <div class="mon-group__list">
          ${e.sublanes.parallel.map(s=>Ao(s,t))}
        </div>
      </section>`:i`<div class="mon-group__list">
        ${e.items.map(s=>Ao(s,t))}
      </div>`;return i`<div class="mon-group" data-root-dir=${e.root_dir}>
    ${Iu(e)} ${n}
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
                ${s.items.map(o=>Ao(o,t))}
              </div>
            </section>`):""}
  </div>`}function Fu(e,t){let r=ht("views:monitor"),n=t.gotoIssue,s=t.pipelineStore,o=t.transport,a=t.getWorkspacePath,l=t.switchWorkspace,c=t.now||(()=>Date.now()),u=t.confirm||(T=>typeof globalThis.confirm!="function"||globalThis.confirm(T)),d=fg(),_=mg(),b=ug();function x(){let T=mr.find(M=>M.value===d);return T?T.label:""}let A=document.createElement("div");A.className="mon",e.appendChild(A);let L=Ha(null,null),G=new Map,ne=null,re=null;async function F(T,M,P,V,oe=!0){if(!o||!P)return null;let y=await o(T,{...M,root_dir:P,expected_revision:V});if(y&&y.conflict&&oe){y.queue&&G.set(P,y.queue);let R=y.queue&&typeof y.queue.revision=="number"?y.queue.revision:V;y=await o(T,{...M,root_dir:P,expected_revision:R})}return y&&y.queue&&P&&G.set(P,y.queue),y}function q(T,M){let P=G.get(T),V=s&&s.get?s.get():null,oe=(Array.isArray(V)?V:[]).find(R=>R?.root_dir===T);return(P||oe)?.merge_queue?.find(R=>R.bead_id===M)?.continuation_action}async function I(T,M,P,V){let oe=await F(T,M,P,V),y=G.get(P)?.revision??oe?.queue?.revision??V;return $r(oe,(R,N)=>F(T,{...M,continuation:R,decision_token:N},P,y,!1),{refresh:R=>F(T,M,P,R?.queue?.revision??G.get(P)?.revision??y,!1)})}async function B(T,M,P,V){let oe=await $r({continuation_mismatch:V},(R,N)=>F("worker-merge-queue-add",{bead_id:M,continuation:R,decision_token:N},T,P,!1)),y=oe?.queue?.merge_queue?.find(R=>R.bead_id===M)?.continuation_action;oe?.applied!==!0&&y?.continuation===null&&y.mismatch&&await B(T,M,oe.queue.revision,y.mismatch)}async function m(T,M,P){let V=await F("worker-discard",T,M,P);if(V&&V.discarded===!0){ce(ho(V),"success",5e3);return}if(V&&V.reason){ce(`\uD3D0\uAE30 \uC2E4\uD328: ${V.reason}`,"error");return}if(V&&V.accepted&&V.pending==="merged_revert"){ce("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if(V&&V.accepted){ce(`\uD3D0\uAE30 \uC9C4\uD589: ${V.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}V&&!V.conflict&&ce("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function S(T,M,P){return!o||!P?null:await o(T,{...M,root_dir:P})}async function Z(T){if(!o||!T&&!u("\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB055\uB2C8\uB2E4. \uAC01 \uB808\uD3EC\uC758 \uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uD568\uAED8 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?"))return;let M=await o("monitor-auto-toggle",{on:T}),P=M&&Array.isArray(M.failed)?M.failed:[];P.length>0&&ce(`\uC790\uB3D9\uD654 ${T?"\uCF1C\uAE30":"\uB044\uAE30"} \uC77C\uBD80 \uC2E4\uD328: ${P.map(V=>V.root_dir).join(", ")}`,"error",3200)}async function ie(){let T=new Map;for(let M of L.pr_wait)T.has(M.root_dir)||T.set(M.root_dir,M.expected_revision);for(let[M,P]of T)await F("worker-merge-queue-add-all",{},M,P)}let D=null,U=!1,_e=null;function we(){_e!==null&&clearTimeout(_e),_e=setTimeout(()=>{_e=null,U=!1},0)}function ke(T){let M=T.target;return typeof M?.closest=="function"?M.closest(".mon-group"):null}function xe(T){let M=ke(T);return!M||!D?null:(M.getAttribute("data-root-dir")||"")===D.root_dir?M:null}function We(){for(let T of Array.from(A.querySelectorAll(".mon-group--drag-over")))T.classList.remove("mon-group--drag-over")}function rt(T){let M=T.target,P=typeof M?.closest=="function"?M.closest('.mon-card[draggable="true"]'):null;if(P){D={bead_id:P.getAttribute("data-issue-id")||"",lane:P.getAttribute("data-lane")||"",root_dir:P.getAttribute("data-root-dir")||"",revision:Number(P.getAttribute("data-revision")||0)||0,queue_index:Number(P.getAttribute("data-queue-index")),queue_length:Number(P.getAttribute("data-queue-length")),place_index:Number(P.getAttribute("data-place-index"))},U=!0;try{T.dataTransfer?.setData("text/plain",D.bead_id),T.dataTransfer&&(T.dataTransfer.effectAllowed="move")}catch{}}}function Ne(T){let M=xe(T);M&&(T.preventDefault(),T.dataTransfer&&(T.dataTransfer.dropEffect="move"),M.classList.add("mon-group--drag-over"))}function He(T){ke(T)?.classList.remove("mon-group--drag-over")}function ue(){D=null,We(),we()}function Fe(T){let M=xe(T),P=D;if(D=null,We(),!M||!P||!P.bead_id)return;T.preventDefault();let V=T.target,oe=typeof V?.closest=="function"?V.closest('.mon-card[data-lane="queue"]'):null,y=oe&&M.contains(oe)?Number(oe.getAttribute("data-queue-index")):NaN;if(P.lane==="runnable"){let fe=Number.isFinite(y)?y:P.place_index;if(!Number.isFinite(fe))return;F("worker-queue-place",{bead_id:P.bead_id,index:fe},P.root_dir,P.revision);return}if(P.lane!=="queue"||oe&&oe.getAttribute("data-issue-id")===P.bead_id)return;let R=P.queue_index,N=Number.isFinite(y)?R>y?y:y-1:P.queue_length-1;!Number.isFinite(N)||N<0||N===R||F("worker-queue-reorder",{bead_id:P.bead_id,to_index:N},P.root_dir,P.revision)}function Le(T){let M=pg(L.runnable,b),P={runnable:M.visible,queue:L.queue,running:L.running,pr_wait:L.pr_wait,done:L.done};return i`${Lu({automation:L.automation,counts:{running:L.running.length,queue:L.queue.length,pr_wait:L.pr_wait.length},running_sort:_,done_range:d,token_total:Mu(L.done),token_tooltip:Ou(x())})}
      <div class="worker-lanes mon-lanes">
        ${hg.map(V=>{let oe=P[V.lane],y=V.lane==="queue"?L.queue_groups.length>0?i`${L.queue_groups.map(R=>yg(R,T))}`:void 0:oe.length>0?i`${oe.map(R=>Ao(R,T))}`:void 0;return dr({id:`monitor-${V.lane}`,lane:V.pane,title:V.lane==="done"?`\uC644\uB8CC\xB7${x()}`:V.title,items:oe,empty:V.empty,body:y,live:V.lane==="running"&&oe.length>0,header_control:V.lane==="runnable"?i`<span class="mon-candidate-filter">
                    <label
                      class="worker-filter__tgl"
                      title="blocked 이슈 표시 (기본 숨김)"
                    >
                      <input
                        type="checkbox"
                        class="mon-filter__blocked"
                        .checked=${b.show_blocked}
                      />
                      🔒 blocked
                    </label>
                    ${M.hidden_blocked>0?i`<span class="worker-filter__hidden"
                          >숨김 ${M.hidden_blocked}건</span
                        >`:""}
                  </span>`:V.lane==="pr_wait"&&oe.length>0?i`<button
                      type="button"
                      class="mon-lane-op mon-merge-all"
                      title="자격이 생기는 PR을 각 레포의 머지 큐에 한 번에 넣습니다"
                    >
                      일괄 머지
                    </button>`:""})})}
      </div>`}function Ge(){let T=s&&s.get?s.get():null,M=s&&s.getWorkspacesState?s.getWorkspacesState():[],P=c();L=Ha(T,M,{done_since:Xr(d,P),running_sort:_}),Ze(Le(P),A)}function Ie(T,M){let P=a?a():void 0;if(!M||!P||M===P||!l){n(T);return}l(M).then(()=>{n(T)}).catch(V=>{r("workspace switch for %s failed: %o",M,V)})}function Ve(T){return{root_dir:T.getAttribute("data-root-dir")||"",revision:Number(T.getAttribute("data-revision")||0)||0}}function st(T){if(typeof T=="string"&&T.length>0)return T;if(T&&typeof T=="object"){let M=T;if(typeof M.message=="string"&&M.message.length>0)return M.message;if(typeof M.error=="string"&&M.error.length>0)return M.error;if(M.error&&typeof M.error=="object"&&typeof M.error.message=="string")return M.error.message}return"\uC5F0\uACB0\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4"}function Ce(T,M){let P=T.querySelector(".mon-link__trigger"),V=T.querySelector(".mon-link__popover"),oe=T.querySelector(".mon-link__error");!P||!V||!oe||(Oe(),V.hidden=!1,P.setAttribute("aria-expanded","true"),oe.textContent=M,oe.hidden=!1)}async function Xe(T,M,P){let V=M.getAttribute("data-root-dir")||"",oe=M.getAttribute("data-issue-id")||"";if(!(!oe||!P||P===oe))try{await S(T,{a:oe,b:P},V),Oe()}catch(y){Ce(M,st(y))}}function K(T,M){let{root_dir:P,revision:V}=Ve(T),oe=T.getAttribute("data-issue-id")||"",y=M.dataset.attemptId||T.getAttribute("data-attempt-id")||"",R=M.classList;if(R.contains("mon-link__trigger")){ze(M);return}if(R.contains("mon-link__candidate")||R.contains("mon-link__direct")){let N=M.dataset.targetId||"";Xe("dep-add",T,N);return}if(R.contains("mon-blocker__remove")){let N=M.dataset.blockerId||"";Xe("dep-remove",T,N);return}if(R.contains("mon-place__choice")){let N=M.dataset.lane||"parallel",fe=Number(M.dataset.placeIndex||0)||0;Oe(),F("worker-queue-place",{bead_id:oe,...N==="parallel"?{}:{lane:N},index:fe},P,V);return}if(R.contains("worker-card__place")){je(M);return}if(R.contains("mon-op--up")||R.contains("mon-op--down")){let N=Number(T.getAttribute("data-queue-index")||0)||0,fe=R.contains("mon-op--up")?N-1:N+1;if(fe<0)return;F("worker-queue-reorder",{bead_id:oe,.../^s[1-5]$/.test(T.dataset.lane||"")?{lane:T.dataset.lane}:{},to_index:fe},P,V);return}if(R.contains("mon-op--remove")){F("worker-queue-remove",{bead_id:oe},P,V);return}if(R.contains("mon-op--pause")){S("worker-attempt-pause",{attempt_id:y},P);return}if(R.contains("mon-op--discard")){if(!u(rs(oe,"unmerged")))return;m({bead_id:oe,...y?{attempt_id:y}:{},...M.dataset.operationId?{operation_id:M.dataset.operationId}:{}},P,V);return}if(R.contains("mon-op--resume")){$n().then(N=>{if(N!==null)return I("worker-attempt-resume",{attempt_id:y,...N!==""?{instructions:N}:{}},P,V)});return}if(R.contains("mon-op--dismiss")){F("worker-attempt-dismiss",{attempt_id:y},P,V);return}if(R.contains("worker-mini__merge")){let N=q(P,oe);N?.mismatch&&N.continuation===null?B(P,oe,V,N.mismatch):F("worker-merge-queue-add",{bead_id:oe},P,V);return}if(R.contains("worker-mini__merge-cancel")){F("worker-merge-queue-remove",{bead_id:oe},P,V);return}if(R.contains("worker-mini__discard")){let N=M.dataset.discardMode==="merged"?"merged":"unmerged";if(!u(rs(oe,N)))return;m({bead_id:oe,...y?{attempt_id:y}:{},...M.dataset.operationId?{operation_id:M.dataset.operationId}:{}},P,V);return}if(R.contains("worker-mini__revise-fix")){I("worker-revise-fix",{bead_id:oe},P,V);return}R.contains("worker-mini__revise-approve")&&F("worker-revise-approve",{bead_id:oe},P,V)}function X(T){T.querySelector(".mon-link__list")?.replaceChildren();let P=T.querySelector(".mon-link__search");P&&(P.value="");let V=T.querySelector(".mon-link__direct");V&&(V.hidden=!0,V.dataset.targetId="",V.textContent="");let oe=T.querySelector(".mon-link__empty");oe&&(oe.hidden=!0);let y=T.querySelector(".mon-link__error");y&&(y.hidden=!0,y.textContent="")}function $e(T,M){let P=T.querySelector(".mon-link__list");if(!P)return;let V=document.createDocumentFragment(),oe=cu(L).filter(y=>y.id!==M);for(let y of oe){let R=document.createElement("button");R.type="button",R.className="mon-link__candidate",R.dataset.targetId=y.id,R.dataset.search=`${y.id} ${y.title} ${y.location}`.toLocaleLowerCase();let N=document.createElement("strong");N.textContent=y.id;let fe=document.createElement("span");fe.textContent=y.title;let de=document.createElement("small");de.textContent=y.location,R.append(N,fe,de),V.append(R)}P.replaceChildren(V)}function Oe(){for(let T of Array.from(A.querySelectorAll(".mon-card-popover"))){let M=T;M.hidden=!0,M.classList.contains("mon-link__popover")&&X(M)}for(let T of Array.from(A.querySelectorAll('[aria-expanded="true"]')))T.setAttribute("aria-expanded","false")}function je(T){let P=T.closest(".mon-place")?.querySelector(".mon-place__popover")||null;if(!P)return;let V=P.hidden;Oe(),V&&(P.hidden=!1,T.setAttribute("aria-expanded","true"))}function ze(T){let P=T.closest(".mon-link")?.querySelector(".mon-link__popover")||null;if(!P)return;let V=P.hidden;if(Oe(),V){let oe=T.closest(".mon-card");$e(P,oe?.getAttribute("data-issue-id")||""),P.hidden=!1,T.setAttribute("aria-expanded","true");let y=P.querySelector(".mon-link__search");y&&(Ue(y),y.focus())}}function Ue(T){let M=T.closest(".mon-link__popover"),P=T.closest(".mon-card");if(!M||!P)return;let V=T.value.trim(),oe=V.toLocaleLowerCase(),y=0,R=!1;for(let Pe of Array.from(M.querySelectorAll(".mon-link__candidate"))){let Ke=Pe,Ye=Ke.dataset.targetId||"",z=oe.length===0||(Ke.dataset.search||"").includes(oe);Ke.hidden=!z,z&&(y+=1),Ye.toLocaleLowerCase()===oe&&(R=!0)}let N=M.querySelector(".mon-link__direct"),fe=P.getAttribute("data-issue-id")||"";if(N){let Pe=V.length>0&&!R&&oe!==fe.toLocaleLowerCase();N.hidden=!Pe,N.dataset.targetId=Pe?V:"",N.textContent=Pe?`\uC9C1\uC811 \uC785\uB825 \xB7 ${V}`:"",Pe&&(y+=1)}let de=M.querySelector(".mon-link__empty");de&&(de.hidden=y>0);let Se=M.querySelector(".mon-link__error");Se&&(Se.hidden=!0,Se.textContent="")}function lt(T){let M=T.target;M&&A.contains(M)&&typeof M.closest=="function"&&M.closest(".mon-popover-owner")||Oe()}function ut(T){if(T.key!=="Escape")return;let M=A.querySelector('[aria-expanded="true"]');Oe(),M?.focus()}function W(T){let M=U;U=!1;let P=T.target;if(!P||typeof P.closest!="function"||P.closest("dialog")||P.closest("a"))return;let V=P.closest(".mon-running-sort");if(V){T.preventDefault(),_=V.getAttribute("data-sort")==="repo"?"repo":"started",gg(_),Ge();return}let oe=P.closest(".mon-auto-all");if(oe){T.preventDefault(),Z(oe.getAttribute("data-on")==="true");return}if(P.closest(".mon-merge-all")){T.preventDefault(),ie();return}let R=P.closest(".mon-ctl--advance");if(R){T.preventDefault();let{root_dir:Pe,revision:Ke}=Ve(R);F("worker-automation-toggle",{on:R.getAttribute("data-on")==="true"},Pe,Ke);return}let N=P.closest(".mon-ctl--merge-auto");if(N){T.preventDefault();let{root_dir:Pe,revision:Ke}=Ve(N);F("worker-merge-auto-toggle",{on:N.getAttribute("data-on")==="true"},Pe,Ke);return}let fe=P.closest(".mon-card");if(!fe)return;let de=P.closest("button");if(de){T.preventDefault(),K(fe,de);return}let Se=fe.getAttribute("data-issue-id");Se&&!M&&(T.preventDefault(),Ie(Se,fe.getAttribute("data-root-dir")||""))}function Y(T){let M=T.target;if(!M||typeof M.closest!="function")return;let P=M.closest(".mon-filter__blocked");if(P){b={show_blocked:P.checked},dg(b),Ge();return}let V=M.closest(".mon-done-range");if(V){d=Qt(V.value)?V.value:Ht,_g(d),Ge();return}let oe=M.closest(".mon-slots__input");if(!oe)return;let{root_dir:y,revision:R}=Ve(oe),N=Number(oe.value);if(!Number.isFinite(N))return;let fe=Math.max(as,Math.floor(N));F("worker-queue-set-slots",{slots:fe},y,R)}function ye(T){let M=T.target;M?.classList.contains("mon-link__search")&&Ue(M)}e.addEventListener("click",W),e.addEventListener("change",Y),e.addEventListener("input",ye),e.addEventListener("dragstart",rt),e.addEventListener("dragover",Ne),e.addEventListener("dragleave",He),e.addEventListener("drop",Fe),e.addEventListener("dragend",ue),document.addEventListener("click",lt),document.addEventListener("keydown",ut),s&&typeof s.subscribe=="function"&&(ne=s.subscribe(()=>{try{G.clear(),Ge()}catch{}}));function nt(){re!==null&&(clearInterval(re),re=null)}function ve(){_e!==null&&(clearTimeout(_e),_e=null)}return{load(){r("load"),Ge(),re===null&&(re=setInterval(()=>{try{if(A.querySelector(".mon-card-popover:not([hidden])"))return;Ge()}catch{}},bg))},pause(){nt()},clear(){nt(),ve(),ne&&(ne(),ne=null),e.removeEventListener("click",W),e.removeEventListener("change",Y),e.removeEventListener("input",ye),e.removeEventListener("dragstart",rt),e.removeEventListener("dragover",Ne),e.removeEventListener("dragleave",He),e.removeEventListener("drop",Fe),e.removeEventListener("dragend",ue),document.removeEventListener("click",lt),document.removeEventListener("keydown",ut),e.replaceChildren()}}}function ju(e,t,r){let n=ht("views:nav"),{global_element:s,repo_element:o}=e,a=null;function l(b){return x=>{x.preventDefault(),n("click tab %s",b),r.gotoView(b)}}function c(){let b=t.getState();return b.view==="worker"||b.view==="monitor"?b.view:"board"}function u(){let b=c();return i`
      <a
        href="#/monitor"
        class="ctl-tab ctl-tab--monitor ${b==="monitor"?"is-active":""}"
        @click=${l("monitor")}
      >
        <span class="ctl-tab__dots" aria-hidden="true"
          ><i></i><i></i><i></i><i></i
        ></span>
        Monitor
      </a>
    `}function d(){let b=c();return i`
      <div class="ctl-tabs">
        <a
          href="#/board"
          class="ctl-tab ${b==="board"?"is-active":""}"
          @click=${l("board")}
          >Board</a
        >
        <a
          href="#/worker"
          class="ctl-tab ${b==="worker"?"is-active":""}"
          @click=${l("worker")}
          >Worker</a
        >
      </div>
    `}function _(){s&&Ze(u(),s),o&&Ze(d(),o)}return _(),a=t.subscribe(()=>_()),{destroy(){a&&(a(),a=null),s&&Ze(i``,s),o&&Ze(i``,o)}}}var Bu=["bug","feature","task","epic","chore"];function Uu(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var Wu=["Critical","High","Medium","Low","Backlog"];function zu(e,t){let r=document.createElement("dialog");r.id="new-issue-dialog",r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true"),r.innerHTML=`
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
  `,e.appendChild(r);let n=r.querySelector("#new-issue-form"),s=r.querySelector("#new-title"),o=r.querySelector("#new-type"),a=r.querySelector("#new-priority"),l=r.querySelector("#new-labels"),c=r.querySelector("#new-description"),u=r.querySelector("#new-issue-error"),d=r.querySelector("#btn-cancel"),_=r.querySelector("#btn-create"),b=r.querySelector(".new-issue__close");function x(){o.replaceChildren();let I=document.createElement("option");I.value="",I.textContent="\u2014 Select \u2014",o.appendChild(I);for(let B of Bu){let m=document.createElement("option");m.value=B,m.textContent=Uu(B),o.appendChild(m)}a.replaceChildren();for(let B=0;B<=4;B+=1){let m=document.createElement("option");m.value=String(B);let S=Wu[B]||"Medium";m.textContent=`${B} \u2013 ${S}`,a.appendChild(m)}}x();function A(){try{typeof r.close=="function"?r.close():r.removeAttribute("open")}catch{r.removeAttribute("open")}}function L(I){s.disabled=I,o.disabled=I,a.disabled=I,l.disabled=I,c.disabled=I,d.disabled=I,_.disabled=I,_.textContent=I?"Creating\u2026":"Create"}function G(){u.textContent=""}function ne(I){u.textContent=I}function re(){try{let I=window.localStorage.getItem("beads-ui.new.type");I?o.value=I:o.value="";let B=window.localStorage.getItem("beads-ui.new.priority");B&&/^\d$/.test(B)?a.value=B:a.value="2"}catch{o.value="",a.value="2"}}function F(){let I=o.value||"",B=a.value||"";I.length>0&&window.localStorage.setItem("beads-ui.new.type",I),B.length>0&&window.localStorage.setItem("beads-ui.new.priority",B)}async function q(){G();let I=String(s.value||"").trim();if(I.length===0){ne("Title is required"),s.focus();return}let B=Number(a.value||"2");if(!(B>=0&&B<=4)){ne("Priority must be 0..4"),a.focus();return}let m=String(o.value||""),S=String(c.value||""),Z={title:I};m.length>0&&(Z.type=m),String(B).length>0&&(Z.priority=B),S.length>0&&(Z.description=S),L(!0);try{await t("create-issue",Z)}catch{L(!1),ne("Failed to create issue");return}F(),L(!1),A()}return r.addEventListener("cancel",I=>{I.preventDefault(),A()}),b.addEventListener("click",()=>A()),d.addEventListener("click",()=>A()),r.addEventListener("keydown",I=>{I.key==="Enter"&&(I.ctrlKey||I.metaKey)&&(I.preventDefault(),q())}),n.addEventListener("submit",I=>{I.preventDefault(),q()}),{open(){n.reset(),G(),re();try{"showModal"in r&&typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")}catch{r.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){A()}}}var vg=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function wg(e,t){return Ko(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function Hu(e,t,r){return i`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">라벨 표시</div>
      <p class="settings-dialog__hint-block">
        라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을 누르면
        그 라벨만 예외로 다시 표시됩니다.
      </p>
      ${t.length===0?i`<div class="settings-dialog__empty">라벨 없음</div>`:i`<div class="settings-dialog__pills">
            ${t.map(n=>{let s=wg(n,e);return i`<button
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
  `}function Gu(e,t,r){return i`
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
  `}function Vu(e,t){return i`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">카드 표시 요소</div>
      <div class="settings-dialog__toggles">
        ${vg.map(([r,n])=>i`<label class="settings-dialog__toggle">
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
  `}var kg=[{id:"execution",label:"\uC2E4\uD589",glyph:"\u25C6"},{id:"display",label:"\uD45C\uC2DC",glyph:"\u25EB"}],Ut="",$g=["impl_runtime","impl_model","impl_effort"];function Wt(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Ku(e,t){let{transport:r,policyStore:n,labelOptions:s}=t,o=t.notify||(y=>ce(y,"error",4e3)),a=document.createElement("dialog");a.id="settings-dialog",a.className="settings-dialog",a.setAttribute("role","dialog"),a.setAttribute("aria-modal","true"),a.setAttribute("aria-label","\uC124\uC815"),e.appendChild(a);let l="execution",c=!1,u="",d={},_={},b=[],x=!1,A=null,L={},G="",ne="",re=!1,F=!1,q=!1,I=null;function B(){let y=t.queueStore?.get();return Wt(y)?y.runner_catalog:null}function m(){let y=t.queueStore?.get();return Wt(y)&&Wt(y.execution_defaults)?y.execution_defaults:null}function S(){let y=t.implPresetStore?.get();return Wt(y)&&Array.isArray(y.presets)?y:null}async function Z(){x=!0,ye();try{let y=await r("get-session-defaults",{});d=Wt(y?.values)?{...y.values}:{},_={...d},b=Array.isArray(y?.warnings)?y.warnings:[]}catch(y){b=["kv_read_failed"],o(`\uC138\uC158 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${y instanceof Error?y.message:String(y)}`)}finally{x=!1,ye()}}async function ie(){let y=Lc(d,_);if(Object.keys(y).length!==0){try{let R=await r("set-session-defaults",{values:y});d=Wt(R?.values)?{...R.values}:{},_={...d},b=Array.isArray(R?.warnings)?R.warnings:[]}catch(R){o(`\uC138\uC158 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${R instanceof Error?R.message:String(R)}`)}ye()}}function D(y,R){if($g.includes(y)){we(y,R);return}R===Ut?delete _[y]:_[y]=R,ye(),ie()}function U(){let y=X().orchestration_model,R=br({global:{orchestration_model:y??void 0},execution_defaults:m(),runner_catalog:B()}).orchestration_model.value;return R?Rr(B(),R):null}function _e(y,R){typeof R=="string"&&R.length>0?_[y]=R:delete _[y]}function we(y,R){let N=R===Ut?void 0:R,fe=Rc({impl_runtime:y==="impl_runtime"?N:_.impl_runtime,impl_model:y==="impl_model"?N:_.impl_model,impl_effort:y==="impl_effort"?N:_.impl_effort},B(),U());_e("impl_runtime",fe.impl_runtime),_e("impl_model",fe.impl_model),_e("impl_effort",fe.impl_effort),ye(),ie()}async function ke(){let y=t.queueStore?.get();if(!Wt(y))return;let R={orchestration_model:y.orchestration_model??null,orchestration_effort:y.orchestration_effort??null,orchestration_speed:y.orchestration_speed??null},N=Oc(R,{...R,...L});if(Object.keys(N).length!==0){try{let fe=await r("worker-queue-set-orchestration-defaults",{expected_revision:y.revision,values:N});if(fe&&fe.applied===!1){o("Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC");return}L={}}catch(fe){o(`Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${fe instanceof Error?fe.message:String(fe)}`)}ye()}}function xe(y,R){L[y]=R===Ut?null:R,ye(),ke()}function We(y){if(A=y,!y){ye();return}let R=B(),N=X(),fe=N.orchestration_model;fe&&!es(R,y).includes(fe)&&(L.orchestration_model=null,fe=null);let de=N.orchestration_effort;de&&!Ta(R,y,fe||Kt).includes(de)&&(L.orchestration_effort=null),ye(),ke()}async function rt(y){let R=t.queueStore?.get();if(!(!Wt(R)||y<1)){try{await r("worker-queue-set-slots",{expected_revision:R.revision,slots:y})}catch(N){o(`slots \uC800\uC7A5 \uC2E4\uD328: ${N instanceof Error?N.message:String(N)}`)}ye()}}function Ne(){let y={},R=X();for(let N of io){let fe=Cr.includes(N)?R[N]:_[N];typeof fe=="string"&&fe.length>0&&(y[N]=fe)}return y}async function He(){let y=S();if(!y)return;let R=Ne();if(Object.keys(R).length===0){o("\uC800\uC7A5\uD560 \uC2E4\uD589 \uC124\uC815\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uBA3C\uC800 \uC2E4\uD589 \uAC12\uC744 \uC120\uD0DD\uD558\uC138\uC694");return}let N=(y.presets||[]).find(de=>de.id===G),fe=ne.trim()||(N?N.name:"");if(!fe){o("\uD504\uB9AC\uC14B \uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694");return}try{let de=N?await r("impl-preset-update",{expected_revision:y.revision,id:N.id,name:fe,settings:R}):await r("impl-preset-create",{expected_revision:y.revision,name:fe,settings:R});if(de&&de.applied){if(ne="",!N&&Array.isArray(de.presets)){let Se=de.presets.find(Pe=>Pe.name===fe);G=Se?Se.id:G}ye()}else o("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),ye()}catch(de){o(`\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: ${de instanceof Error?de.message:String(de)}`)}}async function ue(){let y=S();if(!(!y||G.length===0))try{let R=await r("impl-preset-delete",{expected_revision:y.revision,id:G});R&&R.applied?(G="",ye()):(o("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),ye())}catch(R){o(`\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: ${R instanceof Error?R.message:String(R)}`)}}async function Fe(){let y=S(),R=t.queueStore?.get();if(!(!y||!Wt(R)||G.length===0)){try{let N=await r("apply-impl-preset-global",{preset_id:G,expected_revision:y.revision,expected_queue_revision:R.revision});N&&N.applied?(d=Wt(N.values)?{...N.values}:{},_={...d},b=Array.isArray(N.warnings)?N.warnings:[],Wt(N.queue)&&(t.queueStore?.set?.(N.queue),L={}),N.queue_applied===!1&&o("\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uAC12\uC740 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694")):N&&N.conflict&&o("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: \uD504\uB9AC\uC14B\uC774 \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4")}catch(N){o(`\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: ${N instanceof Error?N.message:String(N)}`)}ye()}}async function Le(){F=!0,q=!1,ye();try{let y=await r("get-worker-system-prompt",{});!y||typeof y!="object"||Array.isArray(y)?q=!0:I=y}catch{q=!0}finally{F=!1,ye()}}function Ge(){if(re=!re,re&&!I){Le();return}ye()}function Ie(){let y=En({loading:F,error:q});if(y)return y;if(!I)return"";let R=Array.isArray(I.variants)?I.variants:[];return i`<div class="settings-dialog__sp-body">
      ${I.target_base_placeholder?i`<div class="prompt-block__meta">
            \`${I.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${R.map(N=>i`<div class="settings-dialog__sp-variant" data-variant=${N.key}>
            <div class="settings-dialog__sp-cond">${N.condition}</div>
            ${Tr(N.label,N.system_prompt)}
          </div>`)}
    </div>`}function Ve(){return i`<section
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
        aria-expanded=${re?"true":"false"}
        @click=${Ge}
      >
        ${re?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
      </button>
      ${re?Ie():""}
    </section>`}function st(y,R,N,fe,de,Se,Pe){let Ke=de[y]??Ut,Ye=Ca(y,N,de,m(),B(),Pe),z=Ye.options.find(ge=>ge.value===Ke),ee=Ke===Ut?Ye.full_value:z?.full_value;return i`<select
        class=${Ke===Ut?"settings-dialog__unset":""}
        data-key=${y}
        aria-label=${R}
        title=${ee||""}
        ?disabled=${Se===!0||Ye.disabled}
        .value=${sn(String(Ke))}
        @change=${ge=>fe(y,String(ge.target.value))}
      >
        <option value=${Ut} ?selected=${Ke===Ut}>
          ${Ye.unset_label}
        </option>
        ${Ye.options.map(ge=>i`<option
              value=${ge.value}
              title=${ge.full_value||""}
              ?selected=${ge.value===Ke}
            >
              ${ge.label}
            </option>`)}
      </select>
      ${Ke===Ut?i`<span class="settings-dialog__source-badge">기본</span>`:""}`}function Ce(y,R,N,fe,de,Se=!1,Pe){return i`<div
      class=${`settings-dialog__row${Se?" settings-dialog__row--off":""}`}
    >
      <span class="settings-dialog__row-label">${R}</span>
      <span class="settings-dialog__controls">
        ${st(y,R,N,fe,de,Se,Pe)}
      </span>
    </div>`}function Xe(y,R,N,fe,de){return i`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">
        <i
          class="settings-dialog__stage-dot"
          style=${`background: var(--stage-${R}-on)`}
        ></i>
        ${y}
      </span>
      <span class="settings-dialog__controls">
        ${st(N,`${y} \uBAA8\uB378`,fe,D,_,!1)}
        ${st(de,`${y} effort`,uo,D,_,!1)}
      </span>
    </div>`}function K(y){return i`<div class="settings-dialog__preset-diff" data-preset-diff>
      <div class="settings-dialog__preset-diff-head">
        ${y.rows.length>0?`\uBCC0\uACBD ${y.rows.length}\uAC1C \xB7 \uC801\uC6A9\uD558\uBA74 \uC544\uB798\uC640 \uAC19\uC774 \uBC14\uB01D\uB2C8\uB2E4`:"\uD604\uC7AC \uC124\uC815\uACFC \uAC19\uC2B5\uB2C8\uB2E4 \u2014 \uC801\uC6A9\uD560 \uBCC0\uACBD\uC774 \uC5C6\uC2B5\uB2C8\uB2E4"}
      </div>
      ${y.rows.map(R=>i`<div
            class="settings-dialog__preset-diff-row"
            data-diff-kind=${R.kind}
          >
            <span class="settings-dialog__preset-diff-label">${R.label}</span>
            <span class="settings-dialog__preset-diff-value"
              >${R.before??"\uAE30\uBCF8"}</span
            >
            <span class="settings-dialog__preset-diff-arrow">→</span>
            <span
              class="settings-dialog__preset-diff-value settings-dialog__preset-diff-after"
              >${R.after??"\uAE30\uBCF8(\uD574\uC81C)"}</span
            >
          </div>`)}
      ${y.ignored_keys.length>0?i`<div class="settings-dialog__preset-diff-note">
            ${y.ignored_keys.join(", ")}은(는) 전역 적용이 쓰지 않는 키라
            무시됩니다
          </div>`:""}
    </div>`}function X(){let y=t.queueStore?.get(),R={};for(let N of Cr)R[N]=Object.prototype.hasOwnProperty.call(L,N)?L[N]:Wt(y)&&typeof y[N]=="string"?y[N]:null;return R}function $e(){let y=B(),R=_.impl_runtime,N=_.impl_model,fe=S(),de=t.queueStore?.get(),Se=X(),Pe=es(y,A),Ke=Tn(y,void 0).filter(O=>O!==Kt),Ye=Ta(y,A,Se.orchestration_model||Kt).filter(O=>O!==Kt),z=G?(fe?.presets||[]).find(O=>O.id===G):null,ee=z?Ic(Ne(),Wt(z.settings)?z.settings:{}):null,ge=Wt(de)&&typeof de.slots=="number"?de.slots:2,k=m()?.supported===!0,E=Ca("workflow_mode",Qn,_,m(),y);return i`
      <section
        class=${`settings-dialog__pane${l==="execution"?" settings-dialog__pane--active":""}`}
        role="tabpanel"
        id="settings-pane-execution"
        aria-label="실행 설정"
      >
        <header class="settings-dialog__pane-head"><h2>실행 설정</h2></header>
        <p class="settings-dialog__pane-sub">
          세션 기본값과 Worker 오케스트레이션을 한곳에서 편집합니다. 저장소와
          저장 경로는 설정 그룹별로 유지됩니다.
        </p>
        ${b.length>0?i`<div class="settings-dialog__banner" role="alert">
              워크스페이스 기본값을 일부 읽지 못했습니다 —
              ${b.join(", ")}
            </div>`:""}
        ${k?"":i`<div
              class="settings-dialog__banner settings-dialog__banner--projection"
              data-execution-defaults-warning
              role="alert"
            >
              실행 기본값 projection을 확인할 수 없습니다 — 기본값 확인 불가
            </div>`}
        ${x?i`<div class="settings-dialog__empty">불러오는 중…</div>`:i`
              <div class="settings-dialog__preset-bar">
                <select
                  aria-label="실행 프리셋"
                  .value=${sn(G)}
                  @change=${O=>{G=String(O.target.value),ye()}}
                >
                  <option value="" ?selected=${G===""}>
                    실행 프리셋…
                  </option>
                  ${(fe?.presets||[]).map(O=>i`<option
                        value=${O.id}
                        ?selected=${O.id===G}
                      >
                        ${O.name}
                      </option>`)}
                </select>
                <button
                  type="button"
                  class="settings-dialog__btn settings-dialog__btn--primary"
                  data-preset-apply-global
                  ?disabled=${!ee||ee.rows.length===0}
                  @click=${Fe}
                >
                  적용
                </button>
                <input
                  type="text"
                  class="settings-dialog__preset-name"
                  placeholder=${G?"\uC774\uB984 (\uBE44\uC6B0\uBA74 \uC720\uC9C0)":"\uC0C8 \uD504\uB9AC\uC14B \uC774\uB984"}
                  aria-label="프리셋 이름"
                  .value=${sn(ne)}
                  @input=${O=>{ne=String(O.target.value)}}
                />
                <button
                  type="button"
                  class="settings-dialog__btn"
                  data-preset-save
                  title=${G?"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC774 \uD504\uB9AC\uC14B\uC5D0 \uC800\uC7A5\uD569\uB2C8\uB2E4 (\uD504\uB9AC\uC14B \u2192 \uC124\uC815 \uBC29\uD5A5\uC774 \uC544\uB2D8)":"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC0C8 \uD504\uB9AC\uC14B\uC73C\uB85C \uC800\uC7A5\uD569\uB2C8\uB2E4"}
                  @click=${He}
                >
                  ${G?"\uD604\uC7AC \uC124\uC815\uC73C\uB85C \uB36E\uC5B4\uC4F0\uAE30":"\uC0C8 \uD504\uB9AC\uC14B \uC800\uC7A5"}
                </button>
                <button
                  type="button"
                  class="settings-dialog__btn"
                  data-preset-delete
                  ?disabled=${G.length===0}
                  @click=${ue}
                >
                  삭제
                </button>
              </div>
              ${ee?K(ee):""}

              <div class="settings-dialog__group">
                <div class="settings-dialog__group-title">오케스트레이션</div>
                <div class="settings-dialog__row">
                  <span class="settings-dialog__row-label">런타임</span>
                  <span class="settings-dialog__controls">
                    <select
                      aria-label="런타임"
                      data-key="orchestration_runtime_filter"
                      .value=${sn(A||Ut)}
                      @change=${O=>{let J=String(O.target.value);We(J===Ut?null:J)}}
                    >
                      <option
                        value=${Ut}
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
                ${Ce("orchestration_model","\uBAA8\uB378",Pe,xe,Se)}
                ${Ce("orchestration_effort","effort",Ye,xe,Se)}
                ${Ce("orchestration_speed","\uC18D\uB3C4",Xn,xe,Se)}
              </div>

              <div class="settings-dialog__group">
                <div class="settings-dialog__group-title">워크플로우</div>
                <div class="settings-dialog__row">
                  <span class="settings-dialog__row-label">모드</span>
                  <span class="settings-dialog__controls">
                    <span class="settings-dialog__seg" role="group">
                      <button
                        type="button"
                        data-mode=${Ut}
                        aria-pressed=${String(!_.workflow_mode)}
                        @click=${()=>D("workflow_mode",Ut)}
                      >
                        ${E.unset_label}
                      </button>
                      ${_.workflow_mode?"":i`<span class="settings-dialog__source-badge"
                            >기본</span
                          >`}
                      ${Qn.map(O=>i`<button
                            type="button"
                            data-mode=${O}
                            aria-pressed=${String(_.workflow_mode===O)}
                            @click=${()=>D("workflow_mode",O)}
                          >
                            ${O}
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
                ${Xe("\uC0AC\uC591 \uB9AC\uBDF0","spec","spec_review_model",Jn,"spec_review_effort")}
                ${Xe("\uACC4\uD68D \uB9AC\uBDF0","plan","plan_review_model",co,"plan_review_effort")}
                ${Xe("\uAD6C\uD604 \uB9AC\uBDF0","impl","impl_review_model",Jn,"impl_review_effort")}
              </div>

              <div class="settings-dialog__group">
                <div class="settings-dialog__group-title">
                  구현
                  <span class="settings-dialog__hint"
                    >이슈 핀이 있으면 핀이 우선합니다</span
                  >
                </div>
                ${Ce("impl_runtime","\uC704\uC784 \uB300\uC0C1",lo,D,_)}
                ${Ce("impl_model","\uBAA8\uB378",Tn(y,R),D,_)}
                ${Ce("impl_effort","effort",Cn(y,R,N),D,_)}
                ${Ce("impl_speed","\uC18D\uB3C4",Xn,D,_)}
                ${Ce("quick_fix_impl_model","quick_fix \uAD6C\uD604 \uBAA8\uB378",Ke,D,_,!1,{..._,...Se})}
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
                        @click=${()=>rt(ge-1)}
                      >
                        −
                      </button>
                      <span class="settings-dialog__stepper-value"
                        >${ge}</span
                      >
                      <button
                        type="button"
                        aria-label="slots 증가"
                        @click=${()=>rt(ge+1)}
                      >
                        +
                      </button>
                    </span>
                  </span>
                </div>
              </div>
              ${Ve()}
            `}
      </section>
    `}function Oe(){let y=n.get();return i`
      <section
        class=${`settings-dialog__pane${l==="display"?" settings-dialog__pane--active":""}`}
        role="tabpanel"
        id="settings-pane-display"
        aria-label="표시 설정"
      >
        <header class="settings-dialog__pane-head"><h2>표시 설정</h2></header>
        <p class="settings-dialog__pane-sub">
          이 워크스페이스의 라벨·칩 표시 정책입니다.
        </p>
        ${y?i`
              ${Hu(y,s(),lt)}
              ${Gu(y,u,{onDraft:R=>{u=R},onAdd:ut,onRemove:W})}
              ${Vu(y,Y)}
            `:i`<div class="settings-dialog__empty">
              표시 정책을 불러오는 중…
            </div>`}
      </section>
    `}async function je(y){let R=n.get();if(R)try{let N=await r("display-policy-set",{expected_revision:R.revision,policy:y(R)});ze(N),N&&N.conflict&&N.policy&&(N=await r("display-policy-set",{expected_revision:N.policy.revision,policy:y(N.policy)}),ze(N)),N&&N.conflict&&o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC")}catch{o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328")}}function ze(y){y&&y.policy&&typeof y.policy=="object"&&n.set(y.policy)}function Ue(y){je(y)}function lt(y){let R=n.get();if(!R)return;let N=!xg(y,R);Ue(fe=>Ag(y,fe,N))}function ut(){let y=u.trim();y.length!==0&&(u="",Ue(R=>R.hidden_prefixes.includes(y)?{hidden_prefixes:R.hidden_prefixes}:{hidden_prefixes:[...R.hidden_prefixes,y]}),ye())}function W(y){Ue(R=>({hidden_prefixes:R.hidden_prefixes.filter(N=>N!==y)}))}function Y(y){let R=n.get();if(!R)return;let N=R.chips[y]===!1;Ue(()=>({chips:{[y]:N}}))}function ye(){Ze(i`
        <div class="settings-dialog__container">
          <nav
            class="settings-dialog__rail"
            role="tablist"
            aria-orientation="vertical"
          >
            <div class="settings-dialog__rail-title">설정</div>
            ${kg.map(y=>i`<button
                  type="button"
                  class="settings-dialog__tab"
                  role="tab"
                  data-tab=${y.id}
                  aria-selected=${String(l===y.id)}
                  aria-controls=${`settings-pane-${y.id}`}
                  @click=${()=>nt(y.id)}
                >
                  <span class="settings-dialog__glyph">${y.glyph}</span>
                  ${y.label}
                </button>`)}
            <button
              type="button"
              class="settings-dialog__close"
              aria-label="닫기"
              @click=${oe}
            >
              닫기
            </button>
          </nav>
          <div class="settings-dialog__panes">
            ${$e()} ${Oe()}
          </div>
        </div>
      `,a)}function nt(y){l=y,ye()}let ve=()=>{c=!1,t.onOpenChange?.(!1)};a.addEventListener("close",ve),a.addEventListener("cancel",ve);let T=y=>{y.target===a&&oe()};a.addEventListener("click",T);let M=null;n.subscribe&&(M=n.subscribe(()=>{c&&ye()}));let P=null;t.implPresetStore?.subscribe&&(P=t.implPresetStore.subscribe(()=>{c&&ye()}));function V(y="execution"){c||(c=!0,t.onOpenChange?.(!0),l=y,u="",L={},ye(),typeof a.showModal=="function"?a.showModal():a.setAttribute("open",""),Z())}function oe(){c&&(c=!1,t.onOpenChange?.(!1),typeof a.close=="function"?a.close():a.removeAttribute("open"))}return{open:V,close:oe,sessionDraft:()=>({..._}),destroy(){c=!1,a.removeEventListener("close",ve),a.removeEventListener("cancel",ve),a.removeEventListener("click",T),M&&(M(),M=null),P&&(P(),P=null),a.remove()}}}function xg(e,t){return t.visible_labels.includes(e)?!0:t.hidden_labels.includes(e)?!1:!t.hidden_prefixes.some(r=>r.length>0&&e.startsWith(r))}function Ag(e,t,r){if(!r)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(o=>o!==e)};let n=t.hidden_labels.filter(o=>o!==e);return t.hidden_prefixes.some(o=>o.length>0&&e.startsWith(o))?{hidden_labels:n,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:n}}var Sg=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],Yu="usage-meter-card",Zu=600,Eg=["token_expired","relogin_required"];function Xu(e){return String(e).padStart(2,"0")}function Tg(e,t){let r=Math.max(0,Math.ceil((e-t)/6e4)),n=Math.floor(r/1440),s=Math.floor(r%1440/60),o=r%60;return n>0?`${n}d${s>0?` ${s}h`:""}`:s>0?`${s}h${o>0?` ${o}m`:""}`:`${o}m`}function Qu(e,t=Date.now()){let r=Date.parse(e);if(!Number.isFinite(r))return"";let n=new Date(r),s=new Date(t),o=`${Xu(n.getHours())}:${Xu(n.getMinutes())}`,l=n.getFullYear()===s.getFullYear()&&n.getMonth()===s.getMonth()&&n.getDate()===s.getDate()?o:`${Sg[n.getMonth()]} ${n.getDate()} ${o}`;return`${Tg(r,t)} \xB7 ${l}`}function Cg(e){let t=Math.max(0,Math.floor(e));return t<60?`${t}\uCD08 \uC804`:t<3600?`${Math.floor(t/60)}\uBD84 \uC804`:`${Math.floor(t/3600)}\uC2DC\uAC04 \uC804`}function Ju(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}function ed(e){let t=typeof e=="number"&&Number.isFinite(e)?e:0;return Math.min(100,Math.max(0,t))}var td=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage",switch_endpoint:"/api/claude-account/switch",tool:"cswap"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage",switch_endpoint:"/api/codex-account/switch",tool:"codex-auth"}];function nd(e){let t=[];for(let r of e){if(!r||typeof r!="object")continue;let n=r;typeof n.key!="string"||n.key.length===0||typeof n.pct!="number"||!Number.isFinite(n.pct)||t.push({key:n.key,pct:n.pct,resetsAt:typeof n.resetsAt=="string"?n.resetsAt:""})}return t}function Rg(e){if(!e||typeof e!="object")return null;let t=e;return!Number.isInteger(t.number)||t.number<=0||typeof t.email!="string"||t.email.length===0||typeof t.status!="string"||t.status.length===0||typeof t.active!="boolean"||!Array.isArray(t.windows)?null:{number:t.number,email:t.email,alias:typeof t.alias=="string"&&t.alias.length>0?t.alias:null,plan:typeof t.plan=="string"&&t.plan.length>0?t.plan:null,active:t.active,status:t.status,windows:nd(t.windows),fetchedAt:typeof t.fetchedAt=="string"?t.fetchedAt:null,ageSeconds:typeof t.ageSeconds=="number"&&Number.isFinite(t.ageSeconds)?t.ageSeconds:null}}function Ig(e){if(!e||typeof e!="object")return null;let t=e,r=[];if(Array.isArray(t.accounts))for(let s of t.accounts){let o=Rg(s);o&&r.push(o)}let n=t.available===!0&&Array.isArray(t.windows);return!n&&r.length===0?null:{available:n,windows:n?nd(t.windows):[],ageSeconds:typeof t.ageSeconds=="number"&&Number.isFinite(t.ageSeconds)?t.ageSeconds:null,accounts:r}}function rd(e,t){return`${e}:${t}`}function sd(e){let t=!1,r=null,n=new Map,s=null,o=new Map,a=new Map,l=0;function c(){Ze(i``,e),e.hidden=!0}function u(D){r!==D&&(r===null&&(document.addEventListener("mousedown",_),document.addEventListener("keydown",b)),r=D)}function d(){r!==null&&(r=null,document.removeEventListener("mousedown",_),document.removeEventListener("keydown",b))}function _(D){let U=D.target;U&&e.contains(U)||(d(),S())}function b(D){D.key==="Escape"&&(d(),S())}function x(D){r===D?d():u(D),S()}function A(){d(),S()}async function L(D,U){if(n.has(D.key))return;let _e=rd(D.key,U);n.set(D.key,U),a.delete(_e),S();let we=null;try{we=await(await fetch(D.switch_endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({number:U})})).json()}catch{we=null}if(t)return;if(n.delete(D.key),!we||we.ok!==!0){let xe=we&&typeof we.error=="string"&&we.error.length>0?we.error:"network_error";a.set(_e,{kind:"error",text:`\uC804\uD658 \uC2E4\uD328 \u2014 ${xe}`}),S();return}let ke=Array.isArray(we.warnings)?we.warnings.filter(xe=>typeof xe=="string"&&xe.length>0):[];ke.length>0&&a.set(_e,{kind:"warn",text:ke.join(" \xB7 ")}),S(),await ie()}function G(D,U,_e,we){let ke=ed(D.pct),We=`resets ${Qu(D.resetsAt,we)}${U?` \xB7 ${_e}`:""}`;return i`<span
      class="usage-meter__window ${Ju(ke)}"
      style=${`--progress: ${ke}%`}
      title=${We}
    >
      <span class="usage-meter__label">${D.key}</span>
      <span class="usage-meter__track" aria-hidden="true">
        <span class="usage-meter__fill"></span>
      </span>
      <span class="usage-meter__pct">${ke}%</span>
    </span>`}function ne(D,U,_e){let we=U.available&&typeof U.ageSeconds=="number"&&U.ageSeconds>Zu,ke=we&&typeof U.ageSeconds=="number"?`${Math.floor(U.ageSeconds/60)}\uBD84 \uC804 \uCE21\uC815`:"",xe=U.accounts.filter(He=>!He.active).length,We=`usage-meter__group${we?" usage-meter__group--stale":""}`,rt=i`<span class="usage-meter__provider"
        >${D.label}</span
      >
      ${U.available?U.windows.map(He=>G(He,we,ke,_e)):i`<span class="usage-meter__empty">사용량 없음</span>`}
      ${xe>0?i`<span class="usage-meter__badge">+${xe}</span>`:""}`;if(U.accounts.length===0)return i`<span
        class=${We}
        aria-label=${`${D.label} usage`}
        >${rt}</span
      >`;let Ne=r===D.key;return i`<button
      type="button"
      class=${`usage-meter__toggle ${We}`}
      aria-label=${`${D.label} usage`}
      aria-expanded=${Ne?"true":"false"}
      aria-controls=${Yu}
      @click=${()=>x(D.key)}
    >
      ${rt}
    </button>`}function re(D,U){return i`<span class="usage-meter" aria-label="Usage">
      ${D.map(_e=>ne(_e.provider,_e.snapshot,U))}
    </span>`}function F(D,U){let _e=ed(D.pct),we=Qu(D.resetsAt,U);return i`<span
      class="usage-meter__account-window ${Ju(_e)}"
      style=${`--progress: ${_e}%`}
    >
      <span class="usage-meter__account-key">${D.key}</span>
      <span class="usage-meter__account-track" aria-hidden="true">
        <span class="usage-meter__account-fill"></span>
      </span>
      <span class="usage-meter__account-pct">${_e}%</span>
      <span class="usage-meter__account-reset"
        >${we.length>0?`\u21BB ${we}`:""}</span
      >
    </span>`}function q(D,U){return Eg.includes(U)?`\uD1A0\uD070 \uB9CC\uB8CC \u2014 ${D.tool} \uC7AC\uB85C\uADF8\uC778 \uD544\uC694`:"\uC0AC\uC6A9\uB7C9 \uC5C6\uC74C"}function I(D,U,_e){let we=U.status==="ok",ke=typeof U.ageSeconds=="number"&&U.ageSeconds>Zu,xe=a.get(rd(D.key,U.number)),We=n.get(D.key),rt=We!==void 0,Ne=We===U.number,He=["usage-meter__account"];return U.active&&He.push("usage-meter__account--active"),we||He.push("usage-meter__account--unavailable"),ke&&He.push("usage-meter__account--stale"),i`<div class=${He.join(" ")}>
      <div class="usage-meter__account-head">
        <span class="usage-meter__account-label" title=${U.email}
          >${U.alias===null?U.email:U.alias}</span
        >
        ${U.plan===null?"":i`<span class="usage-meter__account-tag">${U.plan}</span>`}
        ${U.active?i`<span
              class="usage-meter__account-tag usage-meter__account-tag--active"
              >active</span
            >`:""}
        ${U.ageSeconds===null?"":i`<span class="usage-meter__account-age"
              >${Cg(U.ageSeconds)}</span
            >`}
        ${U.active?"":i`<button
              type="button"
              class="usage-meter__switch"
              ?disabled=${rt}
              @click=${()=>{L(D,U.number)}}
            >
              ${Ne?"\uC804\uD658 \uC911\u2026":"\uC804\uD658"}
            </button>`}
      </div>
      ${we?i`<div class="usage-meter__account-windows">
            ${U.windows.map(ue=>F(ue,_e))}
          </div>`:i`<div class="usage-meter__account-status">
            ${q(D,U.status)}
          </div>`}
      ${xe===void 0?"":i`<div
            class="usage-meter__account-message usage-meter__account-message--${xe.kind}"
          >
            ${xe.text}
          </div>`}
    </div>`}function B(D,U,_e){let we=U.accounts.filter(ke=>ke.active).length;return i`<section class="usage-meter__section">
      <h2 class="usage-meter__section-title">
        ${D.label} · 활성 ${we} / 전체
        ${U.accounts.length}
      </h2>
      ${U.accounts.map(ke=>I(D,ke,_e))}
    </section>`}function m(D,U){return i`<div
      class="usage-meter__card"
      id=${Yu}
      role="dialog"
      aria-label=${`${D.provider.label} \uACC4\uC815 \uC0AC\uC6A9\uB7C9`}
    >
      ${B(D.provider,D.snapshot,U)}
      <p class="usage-meter__note">전환은 새로 시작하는 세션부터 적용됩니다.</p>
    </div>`}function S(){let D=[];for(let we of td){let ke=o.get(we.key);ke&&D.push({provider:we,snapshot:ke})}if(D.length===0){d(),c();return}let U=D.find(we=>we.provider.key===r&&we.snapshot.accounts.length>0);U||d();let _e=Date.now();Ze(i`${re(D,_e)}
      ${U?i`<div
              class="usage-meter__scrim"
              aria-hidden="true"
              @mousedown=${A}
            ></div>
            ${m(U,_e)}`:""}`,e),e.hidden=!1}async function Z(D){try{let U=await fetch(D.endpoint);return U.ok?Ig(await U.json()):null}catch{return null}}async function ie(){l+=1;let D=l,U=await Promise.all(td.map(async _e=>({provider:_e,snapshot:await Z(_e)})));if(!(t||D!==l)){for(let _e of U)_e.snapshot?o.set(_e.provider.key,_e.snapshot):o.delete(_e.provider.key);S()}}return c(),ie(),s=setInterval(()=>{ie()},6e4),{destroy(){t=!0,s!==null&&(clearInterval(s),s=null),d(),c()}}}function od(e){let t=e.attempts?Object.values(e.attempts):[],r=new Map;for(let s of t)s&&r.set(s.bead_id,s.attempt_id);let n=new Map;for(let s of e.done||[])s&&typeof s.bead_id=="string"&&typeof s.added_at=="number"&&n.set(s.bead_id,s.added_at);return s=>{let o=r.get(s.bead_id)!==s.attempt_id,a=n.get(s.bead_id),l=typeof a=="number"&&a>0&&typeof s.finished_at=="number"&&a>=s.finished_at;return!o&&!l&&typeof s.dismissed_at!="number"}}var Ya=new Set(["unavailable","not_applicable"]);function jr(e,t){if(typeof e!="object"||e===null)return null;let r=e[t];return typeof r=="object"&&r!==null?r:null}function ad(e){return e.filter(t=>t!==null).join(" \xB7 ")}function Br(e,t){return t===null?null:`${Fr[e]}: ${t.display} (${po[t.source]})`}function Za(e){return e.filter(t=>t!==null).join(`
`)}function id(e){if(typeof e!="object"||e===null)return null;let t=gr(e);if(t==="")return null;let r=(n,s)=>typeof s=="string"&&s.length>0?`${n}: ${s}`:null;return{text:t,title:Za(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uC774 attempt\uC5D0 \uAE30\uB85D\uB41C \uC2E4\uD589\uAC12",r("runner",e.runner),r(Fr.orchestration_model,e.model),r(Fr.orchestration_effort,e.effort),r(Fr.orchestration_speed,e.speed)])}}function ld(e,t){let r=jr(e,"orchestration_model");if(r===null||r.resolution==="unavailable")return null;let n=jr(e,"orchestration_effort"),s=jr(e,"orchestration_speed"),o=ad([Rr(t,r.value??""),r.display,n!==null&&n.value!==null?n.display:null,s!==null&&s.value==="fast"?"Fast":null]);return o===""?null:{text:o,title:Za(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uD050 \uAE30\uBCF8\uAC12)",Br("orchestration_model",r),Br("orchestration_effort",n),Br("orchestration_speed",s)])}}function Lg(e,t){return e===null||e.value===null||Ya.has(e.resolution)?null:e.value!=="inherit"?e.value:t?`inherit\u2192${t}`:"inherit"}function Og(e){return e===null||Ya.has(e.resolution)?null:e.value==="auto"?"auto":e.display}function Mg(e){return e===null?null:e.value==="auto"?"auto":Ya.has(e.resolution)?null:e.display}function Xa(e,t){if(typeof e!="object"||e===null)return null;let r=jr(e,"impl_dispatch"),n=jr(e,"impl_runtime"),s=jr(e,"impl_model"),o=jr(e,"impl_effort"),a=jr(e,"impl_speed"),l=r!==null&&r.value==="main"?"\uBA54\uC778":ad([Lg(n,t??null),Og(s),Mg(o),a!==null&&a.value==="fast"?"Fast":null]);return l===""?null:{text:l,title:Za(["\uC6CC\uCEE4(\uAD6C\uD604 \uC704\uC784) \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uC804\uC5ED kv > \uAE30\uBCF8). \uC2E4\uD589 \uC911\uC774\uBA74 \uC138\uC158\uC774 \uC2DC\uC791 \uC2DC \uACE0\uC815\uD55C \uAC12\uACFC \uB2E4\uB97C \uC218 \uC788\uC74C",Br("impl_dispatch",r),Br("impl_runtime",n),Br("impl_model",s),Br("impl_effort",o),Br("impl_speed",a)])}}var Pg="worker-ineligible";function Qa(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function cd(e){return Qa(e).includes(Pg)}var Dg="worker-serial";function Ja(e){return Qa(e).includes(Dg)}function ei(e,t,r){if(typeof t!="string"||typeof r!="string")return[];let n=e?.runners;if(!n||!Object.hasOwn(n,t))return[];let s=n[t],o=s?.models;if(!o||!Object.hasOwn(o,r))return[];let a=o[r]?.efforts;return Array.isArray(a)?a.slice():Array.isArray(s.efforts)?s.efforts.slice():[]}var Ng=new Set(["done","failed","orphaned","stopped","discarded"]),qg={spec_missing:"\uC2A4\uD399 \uC5C6\uC74C",route:"route \uBBF8\uB2EC",spec_review:"\uC2A4\uD399 \uB9AC\uBDF0 \uC5C6\uC74C",spec_conflict:"\uC2A4\uD399 \uCDA9\uB3CC",phase_child:"phase child",worker_ineligible:"worker \uC81C\uC678"},Fg={running:"\uC2E4\uD589 \uC911",success:"\uC131\uACF5",failure:"\uC2E4\uD328",cancelled:"\uCDE8\uC18C",interrupted:"\uC911\uB2E8"},jg={running:"running",success:"done",failure:"failed",cancelled:"stopped",interrupted:"orphaned"};function ti(e){return{runner:e.runner||void 0,model:e.model||void 0,effort:e.effort||void 0,status:jg[e.outcome]||(typeof e.job_id=="string"?"running":void 0),session_id:e.session_id||void 0}}function ud(e,t){let{queueStore:r,analysisStore:n,transport:s,getWorkspacePath:o,onOpenTranscript:a}=t,l=document.createElement("dialog");l.id="worker-parallel-analysis-dialog",l.className="pa",l.setAttribute("role","dialog"),l.setAttribute("aria-modal","true"),e.appendChild(l);let c=new Map,u=new Map,d=!1,_=null,b=null,x=null,A=new Set,L=!1,G=0,ne=null,re=new Set;function F(){return r&&r.get()||{revision:0,queue:[],serial_lanes:[],serial_lane_count:0,attempts:{},pr_wait:[]}}function q(){return n&&n.get()||{settings:{revision:0,runner:null,model:null,effort:null},job:null,runs:[],last_good:null}}function I(){return o&&o()||""}async function B(){if(!s)return;let k=++G;L=!0,x=null,A.clear(),de();try{let E=await s("worker-parallel-analysis-targets",{root_dir:I()});if(k!==G||!Se)return;let O=Array.isArray(E?.qualified)?E.qualified:[],J=Array.isArray(E?.excluded)?E.excluded:[];x={qualified:O,excluded:J};for(let Ee of O)Ee&&typeof Ee.id=="string"&&A.add(Ee.id)}catch{k===G&&Se&&(x={qualified:[],excluded:[]},ce("\uBD84\uC11D \uB300\uC0C1\uC744 \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4","error",2800))}finally{k===G&&(L=!1,Se&&de())}}function m(k){return Array.isArray(k.runs)?k.runs:[]}function S(){let k=F(),E=new Set;for(let O of Object.values(k.attempts||{})){let J=O;J&&typeof J.bead_id=="string"&&!Ng.has(J.status)&&E.add(J.bead_id)}for(let O of Array.isArray(k.pr_wait)?k.pr_wait:[])O&&typeof O.bead_id=="string"&&E.add(O.bead_id);for(let O of Object.values(k.discard_operations||{})){let J=O;J&&J.phase!=="done"&&typeof J.bead_id=="string"&&E.add(J.bead_id)}return E}function Z(k){return k.filter(E=>ie(E)===null)}function ie(k){let E=F();for(let O of Array.isArray(E.serial_lanes)?E.serial_lanes:[])if(Array.isArray(O?.entries)&&O.entries.some(J=>J.bead_id===k))return O.id;return(Array.isArray(E.queue)?E.queue:[]).some(O=>O.bead_id===k)?"parallel":null}function D(k,E){let O=c.get(k);return O||[...E.order]}function U(k){if(k.length<2)return!1;let E=ie(k[0]);if(!E||E==="parallel")return!1;let O=F(),J=(Array.isArray(O.serial_lanes)?O.serial_lanes:[]).find(be=>be.id===E)?.entries.map(be=>be.bead_id);if(!Array.isArray(J))return!1;let Ee=k.map(be=>J.indexOf(be));return Ee.every(be=>be>=0)&&Ee.every((be,Te)=>Te===0||be>Ee[Te-1])}function _e(){let k=F(),E=Array.isArray(k.serial_lanes)?k.serial_lanes:[],O=E.find(J=>Array.isArray(J.entries)&&J.entries.length===0);return O?O.id:E[0]?.id||"s1"}function we(k){let E=F().bead_titles||{};return typeof E[k]=="string"?E[k]:k}async function ke(k,E){if(!s||d)return null;d=!0,de();try{return await s(k,E)}finally{d=!1,de()}}async function xe(k){n?.setPending?.(!0);try{let E=await ke("worker-parallel-analysis-start",{force:k,target_ids:Array.from(A)});E&&E.applied===!1&&E.reason&&(E.reason==="target_not_qualified"&&Array.isArray(E.detail)?ce(`\uBD84\uC11D \uB300\uC0C1 \uC790\uACA9 \uBCC0\uACBD: ${E.detail.join(", ")}`,"error",3200):ce(`\uBD84\uC11D \uC2E4\uD328: ${E.reason}`,"error",2800))}finally{n?.setPending?.(!1)}}async function We(){let k=q().job;!s||!k||await s("worker-parallel-analysis-cancel",{job_id:k.job_id})}async function rt(k){if(!(!s||re.has(k))){re.add(k),de();try{let E=await s("worker-parallel-analysis-prompt",{root_dir:I(),run_id:k});if(!Se)return;if(E?.ok===!0&&typeof E.prompt=="string"){ne={run_id:k,prompt:E.prompt};return}ce(E?.reason==="not_found"?"\uC800\uC7A5\uB41C \uBD84\uC11D \uD504\uB86C\uD504\uD2B8\uB97C \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBD84\uC11D \uD504\uB86C\uD504\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4","error",2800)}finally{re.delete(k),de()}}}function Ne(){ne=null,de()}async function He(){if(!ne)return;let k=await ar(ne.prompt);ce(k?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",k?"success":"error",1400)}function ue(k,E){a&&a(k,ti(E))}function Fe(){return F().runner_catalog}function Le(k){return Object.keys(Fe()?.runners?.[k]?.models||{})}function Ge(k){let E=Le(k),O=Fe()?.runners?.[k]?.default_model;return typeof O=="string"&&E.includes(O)?O:E[0]||""}function Ie(){let k=q().settings,E=_||k.runner||"claude",O=Le(E),J=_?Ge(E):k.model||O[0]||"",Ee=ei(Fe(),E,J),be=k.effort||"",Te=Ee.includes(be)?be:Ee[0]||"";return{runner:E,model:J,effort:Te,models:O,efforts:Ee}}async function Ve(k){let E=q().settings,O=await ke("worker-parallel-analysis-settings-update",{expected_revision:E.revision,runner:k.runner,model:k.model,effort:k.effort});(!O||O.applied!==!0)&&(_=null,de(),O&&O.reason&&ce(`\uBD84\uC11D \uC124\uC815 \uAC70\uBD80: ${O.reason}`,"error",2800))}function st(k){_=k,de();let E=Ie();Ve({runner:k,model:E.model,effort:E.effort})}function Ce(k){let E=Ie(),O=ei(Fe(),E.runner,k);Ve({runner:E.runner,model:k,effort:O.includes(E.effort)?E.effort:O[0]||""})}function Xe(k){let E=Ie();Ve({runner:E.runner,model:E.model,effort:k})}async function K(k,E){if(!s||d)return;let O=D(k,E),J=q();if(O.length<2||!J.last_good){ce("\uC81C\uCD9C\uD558\uB824\uBA74 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4","warning");return}let Ee=u.get(k)||_e(),be=()=>({snapshot_digest:J.last_good.identity_digest,group_index:k,lane:Ee,ordered_bead_ids:O,expected_revision:F().revision});d=!0,de();try{let Te=await s("worker-parallel-analysis-submit",be());Te&&Te.queue&&r&&r.set(Te.queue),Te&&Te.applied!==!0&&Te.conflict===!0&&(Te=await s("worker-parallel-analysis-submit",be()),Te&&Te.queue&&r&&r.set(Te.queue)),Te&&Te.applied===!0?(c.delete(k),ce(`\uC9C1\uB82C \uB808\uC778 ${Ee}\uC5D0 ${O.length}\uAC1C \uBC30\uCE58`,"success")):ce(`\uC81C\uCD9C \uAC70\uBD80: ${Te?.reason||"conflict"} (\uD050 \uBB34\uBCC0\uACBD)`,"error",2800)}finally{d=!1,de()}}function X(k,E,O){c.set(k,D(k,E).filter(J=>J!==O)),de()}function $e(k){c.delete(k),de()}function Oe(k,E,O,J){let Ee=[...D(k,E)],be=Ee.indexOf(O),Te=be+J;be<0||Te<0||Te>=Ee.length||(Ee.splice(Te,0,...Ee.splice(be,1)),c.set(k,Ee),de())}function je(){let k=q().settings,E=Object.keys(Fe()?.runners||{}),O=Ie();return i`<div class="pa-settings">
      <label class="pa-settings__field"
        >러너
        <select
          class="pa-settings__runner"
          aria-label="분석 러너"
          @change=${J=>st(J.target.value)}
        >
          ${E.map(J=>i`<option
                value=${J}
                ?selected=${O.runner===J}
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
          @change=${J=>Ce(J.target.value)}
        >
          ${O.models.map(J=>i`<option
                value=${J}
                ?selected=${O.model===J}
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
          @change=${J=>Xe(J.target.value)}
        >
          ${O.efforts.map(J=>i`<option
                value=${J}
                ?selected=${O.effort===J}
              >
                ${J}
              </option>`)}
        </select>
      </label>
      ${ze(k)}
    </div>`}function ze(k){return!lt(k)||Ue(k)?i`<span class="pa-settings__unset">분석 모델 설정 필요</span>`:k.compatible===!1?i`<span class="pa-settings__incompatible"
        >설정 비호환 — 저장된 ${k.runner}/${k.model} · effort
        ${k.effort} 을(를) 카탈로그가 더는 제공하지 않습니다</span
      >`:k.is_default===!0?i`<span class="pa-settings__default">기본값</span>`:""}function Ue(k){return k.is_default===!0&&k.compatible===!1}function lt(k){return!!(k.runner&&k.model&&k.effort)}function ut(k){return lt(k)&&k.compatible!==!1}function W(k){let E=Math.max(0,Math.floor(k/1e3)),O=Math.floor(E/60),J=E%60;return`${O}:${String(J).padStart(2,"0")}`}function Y(k){let E=k.job;if(E){let O=typeof E.started_at=="number"?E.started_at:0,J=`${E.runner||"?"}/${E.model||"?"}`,Ee=O?` \xB7 \uACBD\uACFC ${W(Date.now()-O)}`:"",be=typeof E.session_id=="string"?E.session_id:"",Te=m(k).find(De=>De.run_id===E.job_id);return i`<span class="pa-meta__progress">
        <span
          >분석 중 — ${J} · effort ${E.effort||"?"}${Ee}</span
        >
        ${be?i`<code class="pa-session-id" title=${be}
              >${be.slice(0,8)}</code
            >`:""}
        <button
          type="button"
          class="pa-monitor"
          @click=${()=>ue(E.job_id,Te||E)}
        >
          모니터링
        </button>
        <button
          type="button"
          class="pa-prompt-open"
          ?disabled=${Te?.prompt_saved!==!0||re.has(E.job_id)}
          @click=${()=>{rt(E.job_id)}}
        >
          프롬프트
        </button>
      </span>`}return ye()?i`<span class="pa-meta__progress"
          >준비 중 — 대상과 아티팩트 수집 중</span
        >`:""}function ye(){return n?.isPending?.()===!0}function nt(k){let E=!!k.job,O=ut(k.settings),J=x!==null&&A.size===0,Ee=E||d||ye()||L;return i`<div class="pa-meta">
      ${k.last_good?i`<span class="pa-meta__at"
            >분석 ${new Date(k.last_good.at||0).toLocaleString()}</span
          >`:i`<span class="pa-meta__at">분석 결과 없음</span>`}
      ${Y(k)}
      <button
        type="button"
        class="pa-run"
        ?disabled=${!O||Ee||J}
        @click=${()=>{xe(!1)}}
      >
        ✳ 분석
      </button>
      <button
        type="button"
        class="pa-rerun"
        ?disabled=${!O||Ee||J}
        @click=${()=>{xe(!0)}}
      >
        재분석
      </button>
      <button
        type="button"
        class="pa-cancel"
        ?disabled=${!E}
        @click=${()=>{We()}}
      >
        취소
      </button>
    </div>`}function ve(k){return typeof k=="string"&&k.length>0?k:"\uBBF8\uBC30\uCE58"}function T(k,E){E?A.add(k):A.delete(k),de()}function M(k){let E=Array.isArray(k.scope)?k.scope:[],O=Array.isArray(k.overlaps)?k.overlaps:[];return E.length===0&&O.length===0?i``:i`<span class="pa-target__signals">
      ${E.length>0?i`<details class="pa-target__scope" title=${E.join(`
`)}>
            <summary>scope ${E.length}</summary>
            <ul>
              ${E.map(J=>i`<li><code>${J}</code></li>`)}
            </ul>
          </details>`:""}
      ${O.length>0?i`<span
            class="pa-target__overlaps"
            title=${`\uACB9\uCE68: ${O.join(", ")}`}
            >겹침 ${O.join(", ")}</span
          >`:""}
    </span>`}function P(){let k=x?.qualified||[],E=x?.excluded||[];return i`<section class="pa-targets">
      <header class="pa-targets__header">
        <strong>분석 대상</strong>
        <span class="pa-targets__summary"
          >${L?"\uC870\uD68C \uC911\u2026":`\uC790\uACA9 ${k.length} \xB7 \uC81C\uC678 ${E.length}`}</span
        >
      </header>
      ${x&&k.length>0?i`<ul class="pa-targets__list">
            ${k.map(O=>i`<li class="pa-target">
                  <label class="pa-target__label">
                    <input
                      type="checkbox"
                      class="pa-target__check"
                      data-target-id=${O.id}
                      .checked=${A.has(O.id)}
                      @change=${J=>T(O.id,J.target.checked)}
                    />
                    <span class="pa-target__title">${O.title}</span>
                  </label>
                  <span class="pa-target__meta">
                    ${M(O)}
                    <span class="pa-target__route">${O.route}</span>
                    <span class="pa-target__lane"
                      >${ve(O.lane)}</span
                    >
                  </span>
                </li>`)}
          </ul>`:x&&k.length===0?i`<p class="pa-empty">자격 있는 분석 대상이 없습니다</p>`:""}
      ${x&&E.length>0?i`<details class="pa-targets__excluded">
            <summary>제외 대상 ${E.length}</summary>
            <ul class="pa-targets__list">
              ${E.map(O=>i`<li class="pa-target pa-target--excluded">
                    <label class="pa-target__label">
                      <input type="checkbox" disabled />
                      <span class="pa-target__title">${O.title}</span>
                    </label>
                    <span class="pa-target__meta">
                      <span class="pa-target__reason"
                        >${qg[O.reason]||O.reason}</span
                      >
                      <span class="pa-target__lane"
                        >${ve(O.lane)}</span
                      >
                    </span>
                  </li>`)}
            </ul>
          </details>`:""}
    </section>`}function V(k){let E=typeof k.session_id=="string"&&k.session_id.length>0,O=E?k.session_id:"";return i`<li class="pa-run-row">
      <span class="pa-run-row__status pa-run-row__status--${k.outcome}"
        >${Fg[k.outcome]||k.outcome}</span
      >
      <time class="pa-run-row__time"
        >${new Date(k.started_at||0).toLocaleString()}</time
      >
      <span class="pa-run-row__identity"
        >${k.runner||"?"} / ${k.model||"?"} / ${k.effort||"?"}</span
      >
      ${E?i`<code class="pa-session-id" title=${O}
            >${O.slice(0,8)}</code
          >`:i`<span class="pa-run-row__no-session">세션 없음</span>`}
      ${k.outcome==="failure"&&k.reason?i`<span class="pa-run-row__reason">${k.reason}</span>`:""}
      <span class="pa-run-row__actions">
        <button
          type="button"
          class="pa-run-row__monitor"
          @click=${()=>ue(k.run_id,k)}
        >
          모니터링
        </button>
        <button
          type="button"
          class="pa-run-row__prompt"
          ?disabled=${k.prompt_saved!==!0||re.has(k.run_id)}
          @click=${()=>{rt(k.run_id)}}
        >
          프롬프트
        </button>
      </span>
    </li>`}function oe(k){return i`<section class="pa-runs">
      <header class="pa-runs__header"><strong>최근 실행</strong></header>
      ${k.length>0?i`<ul class="pa-runs__list">
            ${k.map(E=>V(E))}
          </ul>`:i`<p class="pa-empty">실행 이력 없음</p>`}
    </section>`}function y(){return ne?i`<div
      class="pa-prompt-popup"
      role="dialog"
      aria-modal="true"
      aria-label="분석 프롬프트"
    >
      <div class="pa-prompt-popup__backdrop" @click=${Ne}></div>
      <section class="pa-prompt-popup__panel">
        <header class="pa-prompt-popup__header">
          <div class="pa-prompt-popup__identity">
            <strong>분석 프롬프트</strong>
            <code>${ne.run_id}</code>
          </div>
          <div class="pa-prompt-popup__actions">
            <button type="button" @click=${()=>{He()}}>
              복사
            </button>
            <button
              type="button"
              class="pa-prompt-popup__close"
              aria-label="분석 프롬프트 팝업 닫기"
              @click=${Ne}
            >
              ✕
            </button>
          </div>
        </header>
        <pre class="pa-prompt-popup__content" tabindex="0">
${ne.prompt}</pre
        >
      </section>
    </div>`:""}function R(k,E){let O=D(k,E),J=S(),Ee=O.filter(et=>J.has(et)),be=Z(O),Te=U(O),De=Array.isArray(F().serial_lanes)?F().serial_lanes:[],Et=u.get(k)||_e(),bt=E.eligible!==!0||O.length<2||Ee.length>0||be.length>0||Te||d;return i`<section class="pa-group" data-group-index=${String(k)}>
      <header class="pa-group__head">
        <span class="pa-group__confidence">${E.confidence}</span>
        ${E.categories.map(et=>i`<span class="pa-group__category">${et}</span>`)}
        ${Te?i`<span class="pa-group__applied">✓ 이미 반영됨</span>`:""}
        ${E.eligible===!0?"":i`<span class="pa-group__weak">근거 부족 — 제출 불가</span>`}
        ${be.length>0?i`<span class="pa-group__stale"
              >stale — ${be.join(", ")} 대기 영역 이탈</span
            >`:""}
      </header>
      <p class="pa-group__reason">${E.reason}</p>
      <ol class="pa-group__members">
        ${O.map((et,Pt)=>i`<li class="pa-member" data-bead-id=${et}>
              <span class="pa-member__seq">${Pt+1}</span>
              <span class="pa-member__title">${we(et)}</span>
              ${J.has(et)?i`<span class="pa-member__active">실행 중</span>`:""}
              <button
                type="button"
                class="pa-member__up"
                data-bead-id=${et}
                ?disabled=${Pt===0}
                aria-label=${`${et} \uC704\uB85C`}
                @click=${()=>Oe(k,E,et,-1)}
              >
                ↑
              </button>
              <button
                type="button"
                class="pa-member__down"
                data-bead-id=${et}
                ?disabled=${Pt===O.length-1}
                aria-label=${`${et} \uC544\uB798\uB85C`}
                @click=${()=>Oe(k,E,et,1)}
              >
                ↓
              </button>
              <button
                type="button"
                class="pa-member__exclude"
                data-bead-id=${et}
                aria-label=${`${et} \uC81C\uC678`}
                @click=${()=>X(k,E,et)}
              >
                ✕
              </button>
            </li>`)}
      </ol>
      <ul class="pa-group__evidence">
        ${E.evidence.map(et=>i`<li class="pa-evidence">
              <code>${et.path}</code>
              <span class="pa-evidence__locator">${et.locator}</span>
            </li>`)}
      </ul>
      <footer class="pa-group__foot">
        <button
          type="button"
          class="pa-group__restore"
          @click=${()=>$e(k)}
        >
          제안으로 되돌리기
        </button>
        <label class="pa-group__lane-field"
          >제출
          <select
            class="pa-group__lane"
            aria-label="제출 대상 레인"
            @change=${et=>{u.set(k,et.target.value),de()}}
          >
            ${De.map((et,Pt)=>i`<option
                  value=${et.id}
                  ?selected=${Et===et.id}
                >
                  직렬 ${Pt+1}
                </option>`)}
          </select>
        </label>
        <button
          type="button"
          class="pa-group__submit"
          ?disabled=${bt}
          @click=${()=>{K(k,E)}}
        >
          제출
        </button>
      </footer>
    </section>`}function N(k){let E=Array.isArray(k.issues)?k.issues:[],O=E.filter(Ee=>Ee.verdict==="parallel_ok").length,J=E.filter(Ee=>Ee.verdict==="uncertain").length;return i`<div class="pa-summary">
      <span>parallel_ok ${O}</span>
      <span>uncertain ${J}</span>
    </div>`}function fe(){let k=Se&&!!q().job;if(k&&b===null){b=setInterval(()=>de(),1e3);return}!k&&b!==null&&(clearInterval(b),b=null)}function de(){let k=q();_&&k.settings.runner===_&&(_=null);let E=k.last_good?.result;fe(),Ze(i`
        <div class="pa__container">
          <header class="pa__header">
            <div class="pa__title">병렬성 분석</div>
            <button
              type="button"
              class="pa__close"
              aria-label="닫기"
              @click=${ge}
            >
              ×
            </button>
          </header>
          <div class="pa__body">
            ${je()} ${nt(k)} ${P()}
            ${E?i`${E.groups.map((O,J)=>R(J,O))}
                ${E.groups.length===0?i`<p class="pa-empty">직렬 권장 그룹 없음</p>`:""}
                ${N(E)}`:i`<p class="pa-empty">
                  아직 분석 결과가 없습니다 — [✳ 분석]을 눌러 시작하세요
                </p>`}
            ${oe(m(k))}
          </div>
        </div>
        ${y()}
      `,l)}let Se=!1,Pe=()=>{Se=!1,ne=null,G+=1,fe()},Ke=k=>{k.target===k.currentTarget&&ge()};l.addEventListener("close",Pe),l.addEventListener("cancel",Pe),l.addEventListener("click",Ke);let Ye=null;r&&r.subscribe&&(Ye=r.subscribe(()=>{Se&&de()}));let z=null;n&&n.subscribe&&(z=n.subscribe(()=>{Se&&de()}));function ee(){Se||(Se=!0,de(),B(),typeof l.showModal=="function"?l.showModal():l.setAttribute("open",""))}function ge(){Se&&(Se=!1,ne=null,G+=1,fe(),typeof l.close=="function"?l.close():l.removeAttribute("open"))}return{open:ee,close:ge,destroy(){Se=!1,b!==null&&(clearInterval(b),b=null),l.removeEventListener("close",Pe),l.removeEventListener("cancel",Pe),l.removeEventListener("click",Ke),Ye&&(Ye(),Ye=null),z&&(z(),z=null),l.remove()}}}var dd=new Set(["sh","bash","zsh","dash","ksh"]),pd=/('(?:[^']*)'|"(?:\\.|[^"\\])*"|#.*|\$(?:\{[^}\n]*\}|[A-Za-z_][A-Za-z0-9_]*|[?#@*!$0-9-])|\b(?:if|then|else|elif|fi|for|while|until|do|done|case|esac|in|function|select|time)\b)/g;function fd(e){let t=e.split("/");return t[t.length-1]||""}function Bg(e){let t=e.split(`
`,1)[0];if(!t.startsWith("#!"))return!1;let r=t.slice(2).trim().split(/\s+/).filter(Boolean);if(r.length===0)return!1;let n=fd(r[0]);if(n!=="env")return dd.has(n);let s=r.slice(1).find(o=>!o.startsWith("-")&&!o.includes("="));return s!==void 0&&dd.has(fd(s))}function Ug(e){return e.startsWith("#")?"comment":e.startsWith("'")||e.startsWith('"')?"string":e.startsWith("$")?"variable":"keyword"}function Wg(e){let t=[],r=0;pd.lastIndex=0;for(let n of e.matchAll(pd)){let s=n.index;s>r&&t.push({text:e.slice(r,s),kind:"plain"}),t.push({text:n[0],kind:Ug(n[0])}),r=s+n[0].length}return r<e.length&&t.push({text:e.slice(r),kind:"plain"}),t.length===0&&t.push({text:e,kind:"plain"}),t}function zg(e){return{bad_request:"\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",forbidden:"\uB4F1\uB85D\uB418\uC9C0 \uC54A\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB294 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",lane_not_declared:"\uD604\uC7AC \uACE0\uC815 \uC120\uC5B8\uC5D0 \uD574\uB2F9 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",stale_declaration:"\uC800\uC7A5\uC18C \uC791\uC5C5 \uC120\uC5B8\uC774 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uD654\uBA74\uC5D0\uC11C \uB2E4\uC2DC \uC5F4\uC5B4 \uC8FC\uC138\uC694.",too_large:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uB108\uBB34 \uCEE4\uC11C \uD654\uBA74\uC5D0 \uD45C\uC2DC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",unsupported_content:"\uD14D\uC2A4\uD2B8 \uD615\uC2DD\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB9CC \uD45C\uC2DC\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",unreadable:"\uACE0\uC815\uB41C \uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."}[e]||"\uC2A4\uD06C\uB9BD\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."}function _d(e){let t=e.getWorkspacePath,r=e.fetchImpl||globalThis.fetch?.bind(globalThis),n=document.createElement("div");n.className="repo-ops-script-viewer-root",document.body.appendChild(n);let s=null,o="loading",a="",l="",c=0,u=null,d=!1;function _(I,B){return B?Wg(I).map(m=>m.kind==="plain"?m.text:i`<span
            class="repo-ops-script-viewer__token repo-ops-script-viewer__token--${m.kind}"
            >${m.text}</span
          >`):I}function b(){if(!s)return i``;let I=o==="ready"&&Bg(a),B=o==="ready"?a.split(`
`):[];return i`<div
      class="repo-ops-script-viewer"
      role="dialog"
      aria-modal="true"
      aria-label=${`\uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9: ${s.path}`}
    >
      <div
        class="repo-ops-script-viewer__backdrop"
        @click=${()=>F()}
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
              @click=${()=>F()}
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
                  ${l}
                </div>`:i`<div class="repo-ops-script-viewer__code" tabindex="0">
                  ${B.map((m,S)=>i`<div class="repo-ops-script-viewer__row">
                        <span
                          class="repo-ops-script-viewer__line-number"
                          aria-hidden="true"
                          >${S+1}</span
                        ><code class="repo-ops-script-viewer__code-line"
                          >${_(m,I)}</code
                        >
                      </div>`)}
                </div>`}
        </div>
      </section>
    </div>`}function x(){Ze(b(),n)}async function A(){if(o!=="ready")return;let I=await ar(a);ce(I?"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC\uB428":"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC \uC2E4\uD328",I?"success":"error")}function L(I){I.key==="Escape"&&s&&(I.preventDefault(),F())}function G(){d||(document.addEventListener("keydown",L),d=!0)}function ne(){d&&(document.removeEventListener("keydown",L),d=!1)}async function re(I,B=null){let m=++c;G(),s={...I},u=B||(document.activeElement instanceof HTMLElement?document.activeElement:null),o="loading",a="",l="",x(),n.querySelector(".repo-ops-script-viewer__close")?.focus();let Z=t?t():"";if(!Z){o="error",l="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",x();return}if(!r){o="error",l="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD \uAE30\uB2A5\uC744 \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",x();return}let ie="/api/repo-ops-script?workspace="+encodeURIComponent(Z)+"&lane="+encodeURIComponent(I.lane)+"&base_sha="+encodeURIComponent(I.base_sha);try{let D=await r(ie),U=await D.json().catch(()=>({}));if(m!==c)return;if((t?t():"")!==Z){F();return}if(!D.ok||!U||U.ok!==!0){o="error",l=zg(U&&typeof U.error=="string"?U.error:""),x();return}s={lane:U.lane,base_sha:U.base_sha,path:U.path,base_ref:U.base_ref},a=String(U.content),o="ready",x()}catch{if(m!==c)return;o="error",l="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",x()}}function F(){c+=1,ne(),s=null,a="",x();let I=u;u=null,I?.isConnected&&I.focus()}function q(){F(),n.remove()}return{open:re,close:F,destroy:q}}function md(e){let t=e.queueStore,r=e.transport,n=e.onChanged||(()=>{}),s=e.onOpenScript;function o(){return t&&t.get()||{}}function a(){let m=o();return typeof m.revision=="number"?m.revision:0}function l(m){t&&m&&m.queue&&typeof m.queue=="object"&&t.set(m.queue)}function c(){let m=o().workspace_info;return m&&typeof m=="object"?m:{}}function u(m,S){return i`<span
      class="worker-repo-ops__vd-badge worker-repo-ops__vd-badge--${m}"
      >${S}</span
    >`}function d(m){if(typeof m!="number"||!Number.isFinite(m))return"";let S=m/6e4;return Number.isInteger(S)?`timeout ${S}\uBD84`:`timeout ${Math.round(m/1e3)}\uCD08`}function _(m){let S=d(m);return S?u("config",S):""}function b(m,S,Z){return i`<button
      type="button"
      class="worker-repo-ops__vd-cmd worker-repo-ops__vd-cmd--link"
      .textContent=${Z.script}
      @click=${ie=>{s&&s({lane:m,base_sha:S.base_sha,path:Z.script,base_ref:S.base_ref},ie.currentTarget)}}
    ></button>`}function x(){let m=o().repo_ops_opt_out;return{verify:m?.verify===!0,deploy:m?.deploy===!0}}function A(m,S){return i`<label class="worker-repo-ops__lane-run">
      <input
        type="checkbox"
        .checked=${!S}
        @change=${Z=>{re(m,!Z.target.checked)}}
      />
      이 workspace에서 실행
    </label>`}function L(m){let S=typeof m.base_sha=="string"?m.base_sha:"",Z=`${m.source_path||"repo-ops/config.toml"} @ ${m.base_ref||"?"}${S?`@${S.slice(0,7)}`:""}`,ie=x(),D=!!m.verify&&ie.verify,U=!!m.deploy&&ie.deploy;return i`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">
        저장소 작업 선언
        <span class="worker-repo-ops__vd-src">${Z}</span>
      </p>
      <div
        class="worker-repo-ops__lane${D?" worker-repo-ops__lane--skipped":""}"
        data-lane="verify"
      >
        <span class="worker-repo-ops__lane-k">머지 전 검증</span>
        <span class="worker-repo-ops__lane-v"
          >${m.verify?i`${b("verify",m,m.verify)}
              ${_(m.verify.timeout_ms)}
              ${D?u("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):""}`:i`선언 없음${u("absent","verify \uC5C6\uC774 \uD310\uC815")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${D?"\uC774 workspace\uC5D0\uC11C\uB294 \uAC80\uC99D \uC5C6\uC774 \uD310\uC815\uD569\uB2C8\uB2E4.":m.verify?"\uBA38\uC9C0 \uC804\uC5D0 \uC774 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uD1B5\uACFC\uD574\uC57C \uC790\uACA9\uC744 \uC5BB\uC2B5\uB2C8\uB2E4.":"\uBA38\uC9C0 \uC790\uACA9\uC740 PR/base/head \uC2E0\uC120\uB3C4\xB7mergeability\xB7\uB9AC\uBDF0 \uC601\uC218\uC99D\uC73C\uB85C\uB9CC \uD310\uC815\uD569\uB2C8\uB2E4."}</span
        >
        ${m.verify?A("verify",ie.verify):""}
      </div>
      <div
        class="worker-repo-ops__lane${U?" worker-repo-ops__lane--skipped":""}"
        data-lane="deploy"
      >
        <span class="worker-repo-ops__lane-k">머지 후 배포</span>
        <span class="worker-repo-ops__lane-v"
          >${m.deploy?i`${b("deploy",m,m.deploy)}
              ${_(m.deploy.timeout_ms)}
              ${U?u("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):""}`:i`선언 없음${u("absent","\uBC30\uD3EC \uC5C6\uC74C")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${U?"\uC774 workspace\uC5D0\uC11C\uB294 \uBC30\uD3EC \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4.":m.deploy?i`Worker가 <code>.worktrees/.repo-ops-deploy</code>에서 대상
                  SHA로 정렬한 뒤 1회 실행합니다.`:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC \uB2E8\uACC4 \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4."}</span
        >
        ${m.deploy?A("deploy",ie.deploy):""}
      </div>
    </section>`}function G(m){let S=m.repo_ops&&typeof m.repo_ops=="object"?m.repo_ops:null;return S&&(S.status==="resolved"||S.status==="absent")?L(S):S&&(S.status==="pending"||S.status==="error")?i`<section class="worker-repo-ops__vd" data-seam="repo-ops">
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
          ${S.status==="pending"?"\uC120\uC5B8 \uD655\uC778 \uC911":i`선언 읽기
              실패${S.error_code?i` — <code>${S.error_code}</code>`:""}`}
        </div>
      </section>`:i`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">저장소 작업 선언</p>
      <div class="worker-repo-ops__vd-line worker-repo-ops__vd-absent">
        선언 확인 중
      </div>
    </section>`}async function ne(m){if(!r)return;let S=await r("worker-auto-repair-toggle",{on:m,expected_revision:a()});if(l(S),S&&S.conflict){let Z=await r("worker-auto-repair-toggle",{on:m,expected_revision:a()});l(Z)}n()}async function re(m,S){if(!r)return;let Z=await r("worker-repo-ops-opt-out-toggle",{kind:m,opted_out:S,expected_revision:a()});if(l(Z),Z&&Z.conflict){let ie=await r("worker-repo-ops-opt-out-toggle",{kind:m,opted_out:S,expected_revision:a()});l(ie)}n()}let F={owned_deploy_worktree_fetch_detached_alignment_recreate:"\uC804\uC6A9 \uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC \uC815\uB82C\xB7\uBCF5\uAD6C",recovered_pre_execution_fetch_timeout_retry_once:"fetch \uD0C0\uC784\uC544\uC6C3 1\uD68C \uBCF5\uAD6C",repo_serial_lock_wait:"\uC800\uC7A5\uC18C \uC21C\uCC28 \uC2E4\uD589 \uB300\uAE30",restart_operation_adoption:"\uC7AC\uC2DC\uC791 \uD6C4 \uC791\uC5C5 \uC778\uACC4",exact_input_exit_zero_evidence_adoption:"\uB3D9\uC77C \uC785\uB825 \uC131\uACF5 \uC99D\uAC70 \uC778\uACC4",descendant_success_covers_ancestor_rows:"\uCD5C\uC2E0 SHA \uC131\uACF5\uC774 \uC774\uC804 \uD589 \uCEE4\uBC84",owned_verify_candidate_cleanup:"\uAC80\uC99D \uC784\uC2DC \uCCB4\uD06C\uC544\uC6C3 \uC815\uB9AC",script_retry:"\uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4",auto_repair_session:"\uC790\uB3D9 \uD574\uACB0 \uC138\uC158",user_triggered_session:"\uC0AC\uC6A9\uC790 \uD574\uACB0 \uC138\uC158",automatic:"\uC790\uB3D9",user_action_only:"\uC0AC\uC6A9\uC790 \uD074\uB9AD",script_identity_present:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC788\uC744 \uB54C\uB9CC",per_completion_chain:"\uC644\uB8CC \uCCB4\uC778\uB2F9",unbounded:"\uD69F\uC218 \uC81C\uD55C \uC5C6\uC74C",bounded_single_script_retry_exceeded:"\uB2E8\uC77C \uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4 \uD55C\uB3C4 \uCD08\uACFC",baseline_failure_ignore:"\uAE30\uC874 \uC2E4\uD328 \uBB34\uC2DC",config_or_script_deletion_to_bypass_gate:"\uC124\uC815\xB7\uC2A4\uD06C\uB9BD\uD2B8 \uC0AD\uC81C\uB85C \uAC8C\uC774\uD2B8 \uC6B0\uD68C",credential_entry:"\uC790\uACA9\uC99D\uBA85 \uC785\uB825\xB7\uCD9C\uB825",destructive_action:"\uD30C\uAD34\uC801 \uC791\uC5C5",history_rewrite:"\uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131",agent_self_report_as_success:"\uC138\uC158 \uC790\uAE30\uBCF4\uACE0\uB97C \uC131\uACF5 \uCC98\uB9AC",unbounded_repair_session_retry:"\uBB34\uD55C \uD574\uACB0 \uC138\uC158 \uBC18\uBCF5"};function q(m,S,Z){return i`<div class="worker-repo-ops__policy-group" data-policy=${Z}>
      <div class="worker-repo-ops__policy-label">${m}</div>
      <ul class="worker-repo-ops__policy-list">
        ${S.map(ie=>i`<li data-token=${ie}>
              ${F[ie]||ie}
            </li>`)}
      </ul>
    </div>`}function I(m){return i`<div
      class="worker-repo-ops__policy-group"
      data-policy="resolution-ladder"
    >
      <div class="worker-repo-ops__policy-label">해결 사다리</div>
      <ol class="worker-repo-ops__policy-list">
        ${m.map(S=>{let Z=[F[S.trigger]||S.trigger];return Number.isInteger(S.attempts_per_operation_attempt)?Z.push(`operation\uB2F9 ${S.attempts_per_operation_attempt}\uD68C`):Number.isInteger(S.attempts)?Z.push(`${F[S.budget]||S.budget} ${S.attempts}\uD68C`):Number.isInteger(S.sessions_per_user_action)&&Z.push(`${S.sessions_per_user_action}\uD68C`,F[S.user_actions]||S.user_actions),S.applies_when&&Z.push(F[S.applies_when]||S.applies_when),i`<li data-token=${S.id}>
            <strong>${F[S.id]||S.id}</strong>
            <span>${Z.filter(Boolean).join(" \xB7 ")}</span>
          </li>`})}
      </ol>
    </div>`}function B(){let m=o(),S=m.auto_repair!==!1,Z=m.repo_operation_policy&&typeof m.repo_operation_policy=="object"?m.repo_operation_policy:null,ie=Array.isArray(m.repo_operations)?m.repo_operations:[],D=ie.find(ke=>ke.state==="repairing"),U=ie.filter(ke=>ke.state==="failed"||ke.state==="repairing"),_e=U.length?Math.min(...U.map(ke=>typeof ke.repair?.remaining=="number"?ke.repair.remaining:0)):Z?.auto_repair?.resolution_ladder?.find(ke=>ke.id==="auto_repair_session")?.attempts??1,we=Array.isArray(Z?.auto_repair?.resolution_ladder)?Z.auto_repair.resolution_ladder:[];return i`<section
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
          @change=${ke=>{ne(ke.target.checked)}}
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
          >남은 자동 해결 ${_e}회</span
        >
        <span
          class="worker-repo-ops__repair-session"
          data-seam="auto-repair-session"
          >${D?`\uD574\uACB0 \uC138\uC158 \uC2E4\uD589 \uC911 \xB7 ${D.repair?.owner_bead||D.operation_id}`:"\uC2E4\uD589 \uC911\uC778 \uD574\uACB0 \uC138\uC158 \uC5C6\uC74C"}</span
        >
      </div>
      ${Z?i`<details
            class="worker-repo-ops__policy"
            data-seam="policy-lists"
          >
            <summary>
              Worker 자동 처리 기준
              <span class="worker-repo-ops__policy-count"
                >자동 ${(Z.worker_automatic||[]).length} · 해결 사다리
                ${we.length} · 금지
                ${(Z.never_automatic||[]).length}</span
              >
            </summary>
            ${q("Worker\uAC00 \uC790\uB3D9 \uCC98\uB9AC",Z.worker_automatic||[],"worker-automatic")}
            ${Z.supported===!1||Z.schema_version!==2?i`<div
                  class="worker-repo-ops__policy-group"
                  data-policy="resolution-ladder"
                >
                  ${`\uACC4\uC57D \uC2A4\uD0A4\uB9C8 \uBD88\uC77C\uCE58 \u2014 \uC790\uB3D9 \uD574\uACB0\uC774 \uC815\uC9C0\uB418\uC5C8\uC2B5\uB2C8\uB2E4 (v${Z.schema_version})`}
                </div>`:I(we)}
            ${q("\uC790\uB3D9\uC73C\uB85C \uD558\uC9C0 \uC54A\uC74C",Z.never_automatic||[],"never-automatic")}
          </details>`:""}
    </section>`}return{template(){return i`<details class="worker-repo-ops-settings">
        <summary class="worker-repo-ops-settings__summary">
          저장소 작업 · 검증/배포 선언 · 자동 해결
        </summary>
        ${G(c())} ${B()}
      </details>`}}}var yd=20,Hg=5,Gg=new Set(["failed","repairing","running","queued","retry_pending"]),gd={verify:"\uBA38\uC9C0 \uC804 \uAC80\uC99D",deploy:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC"},bd={verify_script_failure:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0",verify_script_failure_pre_merge:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0 \uD6C4 \uBA38\uC9C0",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328 \uD574\uACB0",interrupted_without_terminal_exit:"\uC911\uB2E8\uB41C \uC791\uC5C5 \uC9C4\uB2E8"};function Vg(e,t,r=yd){let n=[];for(let s of Array.isArray(e)?e:[])!s||typeof s!="object"||n.push({type:"operation",id:s.operation_id,at:typeof s.finished_at=="number"?s.finished_at:typeof s.requested_at=="number"?s.requested_at:null,operation:s});for(let s of Array.isArray(t)?t:[])!s||typeof s!="object"||n.push({type:"cleanup",id:s.bead_id,at:typeof s.at=="number"?s.at:null,cleanup:s});return n.sort((s,o)=>s.at===null&&o.at===null?String(s.id||"").localeCompare(String(o.id||"")):s.at===null?1:o.at===null?-1:o.at-s.at),n.slice(0,Math.max(0,r))}function Kg(e){if(e.type==="cleanup")return!0;let t=e.operation;return Gg.has(t.state)&&!t.dismissed&&!t.superseded_by}function Yg(e,t,r={}){let n=Vg(e,t,1/0),s=r.expanded===!0?yd:Hg,o=new Set(n.slice(0,s)),a=n.filter(l=>o.has(l)||Kg(l));return{visible:a,hidden:n.length-a.length}}function hd(e){if(e.type==="cleanup")return"warn";let t=e.operation.state;return t==="succeeded"?"ok":t==="failed"?"fail":"live"}function Zg(e){if(e.type==="cleanup")return"\uBA48\uCDA4";switch(e.operation.state){case"succeeded":return"\uC131\uACF5";case"failed":return"\uC2E4\uD328";case"repairing":return"\uC790\uB3D9 \uD574\uACB0 \uC911";case"retry_pending":return"\uC7AC\uC2DC\uB3C4 \uC911";case"running":return"\uC2E4\uD589 \uC911";default:return"\uB300\uAE30"}}function vd(e){let t=e.filter(r=>r.value);return t.length===0?"":i`<details class="worker-ev__details">
    <summary>세부</summary>
    <dl class="worker-ev__kv">
      ${t.map(r=>i`<div>
            <dt>${r.term}</dt>
            <dd>${r.value}</dd>
          </div>`)}
    </dl>
  </details>`}function wd(e,t="",r=!1){return!e&&!t?"":i`<p
    class="worker-ev__explain${r?" worker-ev__explain--warn":""}"
  >
    <span class="worker-ev__cause">${e}</span>${t?i`<br />${t}`:""}
  </p>`}function Xg(e){if(e.state!=="failed"||e.superseded_by)return"";let t=e.repair||{},r=typeof t.remaining=="number"?t.remaining:0,n=e.failure_kind==="verify_script_failure"&&e.verify_stage==="pre_merge"?"verify_script_failure_pre_merge":e.failure_kind||"",s=r<=0;return i`<div class="worker-ev__acts">
    <button
      type="button"
      class="worker-ev__btn worker-ev__btn--primary worker-repo-op__resolve"
      data-operation-id=${e.operation_id}
      data-failure-kind=${e.failure_kind||""}
      title="해결 세션을 엽니다"
    >
      ${Object.hasOwn(bd,n)?bd[n]:"\uC2E4\uD328 \uD574\uACB0 \uC138\uC158 \uC2DC\uC791"}
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
  </div>`}function Qg(e){let t=e.operation,r=t.state==="failed",n=t.failure?t.failure.code:"";return i`<li
    class="worker-ev"
    data-operation-id=${t.operation_id}
    data-state=${t.state}
  >
    <span
      class="worker-ev__t"
      title=${e.at?It(e.at):""}
      >${bo(e.at)||"\u2014"}</span
    >
    <span class="worker-ev__node" aria-hidden="true"
      ><span class="worker-ev__dot worker-ev__dot--${hd(e)}"></span
    ></span>
    <div class="worker-ev__body">
      <div class="worker-ev__line1">
        <span class="worker-ev__what"
          >${Object.hasOwn(gd,t.kind)?gd[t.kind]:t.kind}</span
        >
        <span class="worker-ev__meta"
          >${t.target_base}@${mo(t.target_sha)}${typeof t.elapsed_ms=="number"?` \xB7 ${go(t.elapsed_ms)}`:""}</span
        >
        <span class="worker-ev__st worker-ev__st--${hd(e)}"
          >${Zg(e)}</span
        >
        ${t.dismissed?i`<span class="worker-ev__st worker-ev__st--quiet">접수됨</span>`:""}
        ${t.superseded_by?i`<span class="worker-ev__st worker-ev__st--quiet">덮임</span>`:""}
      </div>
      ${r?wd(bu(t.failure_kind,n)):""}
      ${Xg(t)}
      ${vd([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:r?n:""},{term:"script",value:[t.script_path||"",t.script_blob_sha?`blob ${mo(t.script_blob_sha)}`:"",Number.isInteger(t.exit_code)?`exit ${t.exit_code}`:""].filter(Boolean).join(" \xB7 ")},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function Jg(e){let t=e.cleanup,r=on(t.step);return i`<li
    class="worker-ev"
    data-bead-id=${t.bead_id}
    data-state="cleanup_stalled"
  >
    <span
      class="worker-ev__t"
      title=${e.at?It(e.at):""}
      >${bo(e.at)||"\u2014"}</span
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
        ${pu(t.step).map(n=>i`<li
              class="worker-step worker-step--${n.state}"
              data-step=${n.step}
            >
              <span class="worker-step__pip" aria-hidden="true"></span>
              <span class="worker-step__lb">${n.label}</span>
            </li>`)}
      </ol>
      ${wd($o(t.reason),typeof t.retry_count=="number"&&t.retry_count>0?`${t.retry_count}\uD68C \uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uD6C4\uC5D0\uB3C4 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.`:"\uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.",!0)}
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
      ${vd([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:t.reason||""},{term:"\uC9C4\uB2E8",value:t.detail||""},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function eb(e){let t=typeof e.hidden=="number"?e.hidden:0,r=e.expanded===!0;return i`<section class="worker-repo-drawer" data-seam="repo-ops-timeline">
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
          ${e.events.map(n=>n.type==="cleanup"?Jg(n):Qg(n))}
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
  </section>`}function kd(e,t={}){let r=null;function n(){if(r===null){Ze(i``,e);return}let a=Yg(r.operations,r.cleanup_failures,{expanded:r.expanded});Ze(eb({events:a.visible,hidden:a.hidden,expanded:r.expanded,repo:r.repo}),e)}e.addEventListener("click",a=>{let l=a.target;if(l?.closest?.('[data-seam="repo-ops-close"]')){o();return}l?.closest?.('[data-seam="repo-ops-more"]')&&r&&(r.expanded=!r.expanded,n())});function s(a){r={operations:a.operations,cleanup_failures:a.cleanup_failures,repo:a.repo||"",expanded:!1},n()}function o(){r!==null&&(r=null,n(),t.onClose&&t.onClose())}return{open:s,close:o,isOpen:()=>r!==null,refresh(a){r&&(r={operations:a.operations,cleanup_failures:a.cleanup_failures,repo:a.repo||"",expanded:r.expanded},n())}}}var tb=ht("views:worker"),rb="tab:worker:ready",nb="tab:worker:blocked",sb="tab:worker:in-progress",ob="tab:worker:resolved",ab="tab:worker:closed",So=1,$d=5;function xd(e){return so(e).path.length>0}var ib=new Set(["quick_fix","spec_backed","full_plan"]);function Ad(e){return typeof e=="string"&&ib.has(e)}var Cd="beads-ui.worker.candidate-filter",ri={show_blocked:!1,spec:"all"};function lb(){try{let e=window.localStorage.getItem(Cd);if(!e)return{...ri};let t=JSON.parse(e);if(!t||typeof t!="object")return{...ri};let r=t.spec;return{show_blocked:t.show_blocked===!0,spec:r==="with"||r==="without"?r:"all"}}catch{return{...ri}}}function cb(e){try{window.localStorage.setItem(Cd,JSON.stringify(e))}catch{}}function ub(e,t){let r=l=>t.show_blocked||!l.blocked,n=l=>t.spec==="all"||(t.spec==="with"?l.has_spec:!l.has_spec),s=[],o=0,a=0;for(let l of e){let c=r(l),u=n(l);c&&u?s.push(l):!c&&u?o+=1:c&&!u&&(a+=1)}return{visible:s,hidden_blocked:o,hidden_spec:a}}var db=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],Rd="bdui.worker.candidate_sort",pb=[{value:"spec",label:"spec \uC6B0\uC120"},{value:"board",label:"Board \uC21C\uC11C"},{value:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131\uC21C"}],Eo="spec";function fb(){try{let e=window.localStorage.getItem(Rd);return e==="board"||e==="created"||e==="spec"?e:Eo}catch{return Eo}}function _b(e){try{window.localStorage.setItem(Rd,e)}catch{}}var Id="bdui.worker.done-range";function mb(){try{let e=window.localStorage.getItem(Id);return Qt(e)?e:Ht}catch{return Ht}}function gb(e){try{window.localStorage.setItem(Id,e)}catch{}}var bb="(max-width: 640px)",Ld="beads-ui.worker.lane-collapsed",cs={queue:!0,done:!0};function hb(){try{let e=window.localStorage.getItem(Ld);if(!e)return{...cs};let t=JSON.parse(e);return!t||typeof t!="object"?{...cs}:{queue:typeof t.queue=="boolean"?t.queue:cs.queue,done:typeof t.done=="boolean"?t.done:cs.done}}catch{return{...cs}}}function yb(e){try{window.localStorage.setItem(Ld,JSON.stringify(e))}catch{}}function Sd(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let r=typeof t.title=="string"?t.title:t.id||"";return r.length>22?`${r.slice(0,22)}\u2026`:r}function vb(e,t,r){let n=Array.isArray(e)?e.slice():[];return t==="created"?n.sort(Jr):(n.sort(Ts(r)),t==="board"?n:[...n.filter(xd),...n.filter(s=>!xd(s))])}function wb(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function kb(e){let t=e?.blocked_info;if(t&&typeof t=="object"){let s=Array.isArray(t.blockers)?t.blockers.filter(o=>typeof o=="string"&&o.length>0):[];return s.length>0?`\u{1F512} ${s.join(", ")}`:"\u{1F512} blocked"}let n=(Array.isArray(e?.dependencies)?e.dependencies:[]).map(s=>{if(typeof s=="string")return s;if(!s||typeof s!="object")return"";let o=s.type??s.dependency_type;return o!==void 0&&o!=="blocks"?"":s.depends_on_id||s.id||""}).filter(Boolean);return n.length>0?`\u{1F512} ${n.join(", ")}`:"\u{1F512} blocked"}function Ed(e){switch(e){case"not_in_pr_wait":return"PR \uB300\uAE30 \uC0C1\uD0DC \uB3D9\uAE30\uD654 \uC2E4\uD328";case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";case"spec_id_missing":return"\uC2A4\uD399 ID \uAE30\uB85D \uC5C6\uC74C";default:return e}}function $b(e){if(e==="lane_occupied")return"\uC2E4\uD589 \uB808\uC778\uC5D0 \uB0A8\uC544 \uC788\uC5B4 \uBA38\uC9C0 \uB300\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4";let t="\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)";return typeof e=="string"&&e.length>0?`${t}: ${e}`:t}function xb(e,t=null){if(e==="worker_sessions_busy")return"\uD574\uC18C \uB300\uAE30 \u2014 \uC2E4\uD589 \uC2AC\uB86F \uB300\uAE30 \uC911";if(typeof e!="string"||!e.startsWith("completion_waiting:"))return null;let r=e.slice(19);if(r.length===0)return null;switch(r){case"gating":{let n=t?.repair_sessions_used;return typeof n=="number"&&n>0?"\uC218\uC815 \uACB0\uACFC \uC7AC\uD655\uC778 \uC911":"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911"}case"repairing":return"\uC790\uB3D9 \uC218\uC815 \uC911";case"waiting_repair_pr":return"\uC218\uC815 PR \uB300\uAE30 \uC911";case"merging":return"\uBA38\uC9C0 \uC911";case"cleaning":return"\uB9C8\uBB34\uB9AC \uC911";case"paused":return"\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";case"needs_human":return"\uD655\uC778 \uD544\uC694";default:return null}}function Ab(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}function Sb(e){if(!e||typeof e!="object")return null;switch(e.state){case"pending":return{badge:"implementation review \uB300\uAE30",live:!1,alert:!1};case"reviewing":return{badge:"implementation review \uC911",live:!0,alert:!1};case"revising":return{badge:"review \uC218\uC815 \uC911 \xB7 1\uD68C",live:!0,alert:!1};case"failed":{let r=(typeof e.failure_reason=="string"?e.failure_reason:"").replace(/[\u0000-\u001f\u007f]/g," ").slice(0,120);return{badge:r.trim().length>0?`review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328: ${r.trim()}`:"review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328",live:!1,alert:!0}}default:return null}}function ni(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}function Eb(e){if(!e||typeof e!="object")return null;let t=Number.isInteger(e.repair_sessions_used)?Math.max(0,e.repair_sessions_used):0,r=Number.isInteger(e.repair_session_cap)?Math.max(0,e.repair_session_cap):0,n=e.current_repair&&typeof e.current_repair=="object"?e.current_repair:null,s=n&&typeof n.pr_number=="number"?n.pr_number:null,o="";switch(e.phase){case"gating":o=t>0?"\uC218\uC815 \uACB0\uACFC \uC7AC\uD655\uC778 \uC911":"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";break;case"repairing":o="\uC790\uB3D9 \uC218\uC815 \uC911";break;case"waiting_repair_pr":o=s?`\uC218\uC815 PR #${s} \uB300\uAE30 \uC911`:"\uC218\uC815 PR \uB300\uAE30 \uC911";break;case"merging":o=e.subject_role==="repair"?s?`\uC218\uC815 PR #${s} \uBA38\uC9C0 \uC911`:"\uC218\uC815 PR \uBA38\uC9C0 \uC911":"\uBA38\uC9C0 \uC911";break;case"cleaning":o="\uB9C8\uBB34\uB9AC \uC911";break;case"paused":o="\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":o="\uD655\uC778 \uD544\uC694";break;case"completed":return null;default:return null}let a=[o,`\uC790\uB3D9 \uC218\uC815 \uD69F\uC218 ${t}/${r}`];return e.head_sha&&a.push(`head ${e.head_sha}`),e.base_sha&&a.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&a.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`),e.active_attempt_id&&a.push(`attempt ${e.active_attempt_id}`),n&&typeof n.bead_id=="string"&&a.push(`repair ${n.bead_id}`),e.evidence&&a.push(e.evidence),e.log_path&&a.push(e.log_path),{badge:o,title:a.join(`
`),alert:e.phase==="needs_human",lock_actions:e.phase!=="paused"&&e.phase!=="needs_human",repair_pr_url:n&&typeof n.pr_url=="string"?n.pr_url:"",repair_pr_number:s}}function Td(e){if(!e||typeof e!="object")return[];let t=e.blocking_codes;return Array.isArray(t)?t.filter(r=>typeof r=="string"&&r.length>0):[]}function Tb(e){let t=e.queue_failure?`\uBA38\uC9C0 \uC2E4\uD328 \uC6D0\uBB38: ${e.queue_failure}`:e.auto_skip?`\uC790\uB3D9 \uC81C\uC678 \uC6D0\uBB38: ${e.auto_skip}`:"",r=(n,s={})=>{let o=[s.title||"",t].filter(Boolean);return{label:n,title:o.join(`
`),live:s.live===!0,alert:s.alert===!0}};return e.continuation_required?r("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694",{alert:!0}):e.merge_step?e.gate?.tier==="merged"?r("\uBA38\uC9C0\uB428",{title:e.merge_step.label,alert:e.merge_step.failed===!0}):r("\uBA38\uC9C0 \uC911",{title:e.merge_step.label,live:!0}):e.conflict_badge?r(e.conflict_badge,{live:e.conflict_live===!0}):e.head_review&&e.head_review.state!=="failed"?r("\uB9AC\uBDF0 \uC9C4\uD589 \uC911",{title:e.head_review.badge,live:e.head_review.live===!0}):e.recovery?.lock_actions?r(e.recovery.badge,{title:e.recovery.title,live:!0}):e.cleanup_failed?r(e.cleanup_label?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${e.cleanup_label}`:"\uC815\uB9AC \uBA48\uCDA4",{title:e.cleanup_failed.reason||"",alert:!0}):e.base_exception?r("\uB2E4\uB978 base \uB300\uC0C1",{title:e.base_exception,alert:!0}):e.conflicting?r("\uCDA9\uB3CC \uD574\uACB0 \uD544\uC694",{alert:!0}):e.gate?.reason==="base_behind"?r("base \uAC31\uC2E0 \uD544\uC694",{alert:!0}):e.gate?.reason==="review_receipt_missing"||e.gate?.reason==="review_receipt_stale"?r("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694",{title:e.gate.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2C8\uAC70\uB098 \uC870\uC0C1 \uD655\uC778\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131\xB7\uBE0C\uB79C\uCE58 \uB9AC\uC14B \uBCF5\uAD6C \uACBD\uB85C\uB85C, \uAD00\uCE21\uB41C \uCD5C\uC885 head \uC804\uCCB4\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uD569\uB2C8\uB2E4":"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uAD00\uCE21\uB41C \uCD5C\uC885 head \uC804\uCCB4\uB97C \uB9AC\uBDF0\uD574\uC57C \uBA38\uC9C0\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4",alert:!0}):e.gate?.reason==="spec_id_missing"?r("\uC2A4\uD399 ID \uB204\uB77D",{title:"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id \uD544\uC694",alert:!0}):e.gate?.reason==="review_receipt_invalid"?r("\uB9AC\uBDF0 \uAE30\uB85D \uC624\uB958",{title:"review_receipt_invalid",alert:!0}):Td(e.receipt_check).length>0?r("\uC601\uC218\uC99D \uD655\uC778 \uD544\uC694",{title:`\uC131\uB9BD\uD558\uC9C0 \uC54A\uB294 \uC2E4\uD589 \uC601\uC218\uC99D \u2014 ${Td(e.receipt_check).join(", ")}`,alert:!0}):e.head_review?.state==="failed"?r("\uB9AC\uBDF0 \uC2E4\uD328",{title:e.head_review.failure_reason||"",alert:!0}):e.recovery?r(e.recovery.badge,{title:e.recovery.title,alert:!0}):e.gate?.tier==="verify"&&e.gate.gate_badge==="\uAC80\uC99D \uC2E4\uD328"?r("\uAC80\uC99D \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.queue_failure?r(`\uBA38\uC9C0 \uC2E4\uD328 \u2014 ${Ed(e.queue_failure)}`,{title:e.queue_failure,alert:!0}):e.auto_skip?r(`\uC790\uB3D9 \uC81C\uC678 \u2014 ${Ed(e.auto_skip)}`,{title:e.auto_skip,alert:!0}):e.queued&&!e.queue_active?r(`\uBA38\uC9C0 \uB300\uAE30 #${e.queue_position}`):e.gate?.enabled===!0?r("\uBA38\uC9C0 \uAC00\uB2A5"):e.gate?.tier==="merged"?r("\uBA38\uC9C0\uB428"):e.gate?.tier==="closed_unmerged"?r("\uB2EB\uD798",{alert:!0}):e.activity?r("\uD655\uC778 \uC911",{live:!0}):e.gate?.tier==="undecidable"||e.gate?.reason==="mergeability_unknown"?r("\uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.gate?.tier==="unobserved"||e.gate?.tier==="verify"||e.gate?.gate_badge==="\uAD00\uCE21 \uB300\uAE30"?r("\uD655\uC778 \uC911"):e.gate?.gate_badge?r(e.gate.gate_badge,{title:e.gate.reason||"",alert:e.gate.enabled!==!0}):null}function Cb(e,t,r,n,s=null,o=null,a=null,l=!1,c=null,u=!0,d=null,_=null,b=null,x={},A=!1,L=!1,G={}){let ne=!!c&&c.position>0,re=!!c?.continuation_action&&c.continuation_action.continuation===null,F=!!c&&c.active===!0,q=c&&c.failure||null,I=xb(c?c.waiting:null,b),B=r[e]||null,m=B&&B.gate?B.gate:null,S=B&&B.pr?B.pr:null,Z=Eb(b),ie=Ab(c?c.resolution:null),D=Sb(c?c.head_review:null),U=c&&c.head_review||null,_e=c&&c.authority||null,we=!!U&&["pending","reviewing","revising"].includes(U.state),ke=ne&&!F&&(U?.state==="failed"||!_e||_e.source==="automatic"&&!L),xe=a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":ie?ie.badge:a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":I,We=!!m&&m.base_badge==="\uCDA9\uB3CC",rt=!!m&&m.enabled===!0,Ne=os({bead_id:e,merge_sha:G.merge_sha,cleanup_cursor:G.cleanup_cursor,merge_progress:o&&o.merge_progress?o.merge_progress:null,cleanup_failed:n,repo_operations:G.repo_operations}),He=ko(Ne),ue=!!n&&["child_sweep","branch_cleanup","parent_close"].includes(n.step)&&!!m&&m.tier==="merged",Fe=l&&!!n&&!!m&&m.tier==="merged",Le=ke&&(rt||We||m?.reason==="base_behind"||m?.reason==="review_receipt_missing"||m?.reason==="review_receipt_stale"||ue||Fe),Ge=l&&We&&u===!1,Ie=yr(x,e,{external:l,merge_active:F||Ne?.step==="merge",merge_queued:ne,conflict_active:!!a,cleanup_active:He,merged:!!n||m?.tier==="merged"}),Ve=!!Ie.operation,st=!ue&&!!n&&n.step==="repo_operations",Ce=Tb({continuation_required:re,merge_step:Ne,conflict_badge:xe,conflict_live:ie?.live===!0||a==="running",head_review:U&&D?{...D,state:U.state,failure_reason:U.failure_reason}:null,recovery:Z,cleanup_failed:n,cleanup_label:n?on(n.step):null,base_exception:_,conflicting:We,gate:m,receipt_check:B&&B.receipt_check?B.receipt_check:null,queue_failure:q,auto_skip:d,queued:ne,queue_active:F,queue_position:c?c.position:0,activity:xe?null:o&&o.activity||null}),Xe=Ce?.live===!0&&Ce.title?i`<span title=${Ce.title}>${Ce.label}</span>`:Ce?.label||null;return{id:e,title:l?i`${t}<span class="muted"> · 세션</span>`:t,reason:n&&Ne?.active!==!0?wo(n.step):"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",worker_serial:A,external:l,pr_number:S&&typeof S.number=="number"?S.number:null,pr_url:S&&typeof S.url=="string"?S.url:"",completion_badge:Ce?.live!==!0&&Ce?.title?Ce.label:null,completion_title:Ce?.title||"",completion_repair_pr_url:Z?Z.repair_pr_url:"",completion_repair_pr_number:Z?Z.repair_pr_number:null,badges:Xe?[Xe]:[],live_badge:Ce?.live===!0?Xe:null,usage:s,alert:Ce?.alert===!0,merge_action:m?.tier==="merged"&&!ue&&!Fe||st?!1:!ne||re||ke,timeline_action:st,cancel_action:ne&&!re,cancel_enabled:(!F||we)&&!(Z&&Z.lock_actions),cancel_title:Z&&Z.lock_actions?`${Z.badge} \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694`:F&&!we?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":we?"review \uC9C4\uD589\uC744 \uCDE8\uC18C\uD558\uACE0 \uBA38\uC9C0 \uAD8C\uD55C\uC744 \uD3D0\uAE30\uD569\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:Ie,discard_action:Ie.action,merge_step:Ne,discard_enabled:Ie.enabled,discard_title:Ie.title,merge_enabled:!Ne&&!a&&!Ve&&!_&&!(Z&&Z.lock_actions)&&!Ge&&!st&&(rt||We||m?.reason==="base_behind"||m?.reason==="review_receipt_missing"||m?.reason==="review_receipt_stale"||ue||Fe||Le),merge_label:re?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":ue||Fe?"\uC815\uB9AC \uC7AC\uAC1C":We&&!Ne&&!ue?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":m?.reason==="base_behind"?"base \uAC31\uC2E0 \uD6C4 \uBA38\uC9C0":m?.reason==="review_receipt_missing"||m?.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0":ke?"\uB2E4\uC2DC \uBA38\uC9C0":void 0,merge_title:Ve?Ie.error?`\uD3D0\uAE30 \uC2E4\uD328: ${Ie.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${Ie.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:re?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":Ne?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${Ne.label}`:Fe?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Ge?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":ue?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":We?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":m?.reason==="base_behind"?"base\uB97C \uC790\uB3D9 \uAC31\uC2E0\uD55C \uB4A4 \uBA38\uC9C0\uD569\uB2C8\uB2E4":m?.reason==="review_receipt_missing"||m?.reason==="review_receipt_stale"?"\uC790\uB3D9 \uB9AC\uBDF0 \uC138\uC158 \uD6C4 \uC2B9\uC778\uB418\uBA74 \uBA38\uC9C0\uD569\uB2C8\uB2E4":m?.reason==="spec_id_missing"?"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id\uB85C \uAE30\uB85D\uD55C \uB4A4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":rt?`\uBA38\uC9C0 (${m.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:m&&m.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${m&&m.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function si(e,t={}){let{transport:r,issueStores:n,queueStore:s,analysisStore:o,sessionLogStore:a,uiOrderStore:l,gotoIssue:c,getWorkspacePath:u,doneRange:d,onDoneRangeChange:_}=t,b=n?Rs(n,l):null,x=Ms({transport:r,uiOrderStore:l}),A=null,L=[],G=lb(),ne=null,re=fb(),F=Qt(d)?d:mb(),q=new Map;function I(){let p=mr.find(w=>w.value===F);return p?p.label:"\uC624\uB298"}let B=hb(),m=!1,S=new Set,Z=new Set,ie=new Set,D=new Set,U=new Set,_e={},we=null,ke=0,xe=null,We=[];function rt(p){return we===p?_e:{}}async function Ne(){if(!r)return;let p=u?.()||"";if(we===p||xe&&xe.key===p&&xe.generation===ke)return;let w=++ke;xe={key:p,generation:w};let f=null;try{f=await Promise.resolve(r("get-session-defaults",{}))}catch(g){if(w!==ke)return;xe=null,tb("get-session-defaults failed: %o",g),Me();return}w===ke&&(_e=f&&typeof f.values=="object"&&f.values!==null?{...f.values}:{},we=p,xe=null,Me())}function He(){we=null,ke+=1,Ne()}let ue=document.createElement("div");ue.className="worker-console";let Fe=document.createElement("div");Fe.className="worker-top";let Le=document.createElement("div");Le.className="worker-drawer-overlay",Le.hidden=!0;let Ge=document.createElement("div");Ge.className="worker-drawer-overlay__backdrop";let Ie=document.createElement("div");Ie.className="worker-drawer-host";let Ve=document.createElement("div");Ve.className="worker-drawer-host",Ve.hidden=!0,Le.append(Ge,Ie,Ve);let st=document.createElement("div");st.className="worker-lanes-host",ue.append(Fe,Le,st),e.appendChild(ue);let Ce=null,Xe=null,K=no(Ie,{transport:r,sessionLogStore:a,onClose:()=>{Ce=null,Xe=null,Le.hidden=!0,Me()}}),X=kd(Ve,{onClose:()=>{Ve.hidden=!0,Le.hidden=!0,Me()}}),$e=_d({getWorkspacePath:u||(()=>"")}),Oe=u&&u()||"",je=md({queueStore:s,transport:r,onChanged:()=>Me(),onOpenScript:(p,w)=>{$e.open(p,w)}}),ze=o?ud(ue,{queueStore:s,analysisStore:o,transport:r,getWorkspacePath:u,onOpenTranscript:(p,w)=>_t(p,w)}):null;function Ue(){return s&&s.get()||{revision:0,auto_advance:!1,auto_merge:!1,slots:So,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]}}function lt(){let p=Ue(),w=typeof p.serial_lane_count=="number"&&Number.isInteger(p.serial_lane_count)&&p.serial_lane_count>0?Math.min(p.serial_lane_count,5):0,f=Array.isArray(p.serial_lanes)?p.serial_lanes:[],g=[];for(let ae of f){if(g.length>=w)break;!ae||typeof ae.id!="string"||!/^s[1-5]$/.test(ae.id)||!Array.isArray(ae.entries)||g.push({id:ae.id,label:`\uC9C1\uB82C ${ae.id.slice(1)}`,count:ae.entries.length})}return g.length===0?null:[{id:"parallel",label:"\uBCD1\uB82C",count:(Array.isArray(p.queue)?p.queue:[]).length},...g]}function ut(p){if(!ne||!p.some(f=>f.id===ne))return null;let w=lt();return w?{bead_id:ne,lanes:w}:null}function W(){let p=Ue();return typeof p.revision=="number"?p.revision:0}function Y(p){p&&p.queue&&s&&s.set(p.queue)}function ye(){let p=Ue().queue;return Array.isArray(p)?p.length:0}async function nt(p,w,f){if(!r)return;let g=()=>({bead_id:p,...w==="parallel"?{}:{lane:w},...f===void 0?{}:{index:f},expected_revision:W()}),H=await r("worker-queue-place",g());Y(H),H&&H.conflict&&await r("worker-queue-place",g()).then(Y)}async function ve(p,w,f){if(!r)return;let g=()=>({bead_id:p,...w==="parallel"?{}:{lane:w},to_index:f,expected_revision:W()}),H=await r("worker-queue-reorder",g());Y(H),H&&H.conflict&&await r("worker-queue-reorder",g()).then(Y)}async function T(p){if(!r)return;let w=await r("worker-queue-remove",{bead_id:p,expected_revision:W()});Y(w),w&&w.conflict&&await r("worker-queue-remove",{bead_id:p,expected_revision:W()}).then(Y)}async function M(p){if(!r||!p)return;let w=await r("worker-attempt-pause",{attempt_id:p});w&&w.paused===!1&&w.reason&&ce(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${w.reason}`,"error",2400)}async function P(p){if(!r||!p)return;let w=await $n();if(w===null)return;let f=async(H={})=>await r("worker-attempt-resume",{attempt_id:p,expected_revision:W(),...w!==""?{instructions:w}:{},...H}),g=await f();Y(g),g&&g.conflict&&(g=await f(),Y(g)),g=await $r(g,(H,ae)=>f({continuation:H,decision_token:ae}),{onResult:Y,refresh:()=>f()}),g&&g.resumed===!1&&!g.conflict&&g.reason&&ce(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${g.reason}`,"error",2400)}async function V(p){if(!r||!p)return;let w=await r("worker-attempt-dismiss",{attempt_id:p,expected_revision:W()});Y(w),w&&w.conflict&&(w=await r("worker-attempt-dismiss",{attempt_id:p,expected_revision:W()}),Y(w)),w&&w.dismissed===!1&&!w.conflict&&w.reason&&ce(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${w.reason}`,"error",2400)}async function oe(p,w,f=!0){if(!r)return null;let g=r,H=await g(p,{...w,expected_revision:W()});return Y(H),H&&H.conflict&&f&&(H=await g(p,{...w,expected_revision:W()}),Y(H)),H}async function y(p){if(!r||!p)return;let w=Ue().merge_queue?.find(g=>g.bead_id===p)?.continuation_action;if(w?.mismatch&&w.continuation===null){await N(p,w.mismatch);return}S.add(p),Me();let f;try{f=await oe("worker-merge-queue-add",{bead_id:p})}finally{S.delete(p),Me()}!f||f.conflict||f.applied||ce($b(f.reason),"error",2400)}async function R(p){if(!(!r||!p||Z.has(p))){Z.add(p),Me();try{let w=await r("worker-cleanup-retry",{bead_id:p,expected_revision:W()});Y(w),w&&!w.retried&&!w.conflict&&w.reason&&ce(`\uC815\uB9AC \uC7AC\uAC1C \uAC70\uBD80: ${w.reason}`,"error",2400)}finally{Z.delete(p),Me()}}}async function N(p,w){let f=await $r({continuation_mismatch:w},(H,ae)=>oe("worker-merge-queue-add",{bead_id:p,continuation:H,decision_token:ae},!1)),g=f?.queue?.merge_queue?.find(H=>H.bead_id===p)?.continuation_action;if(f?.applied!==!0&&g?.continuation===null&&g.mismatch){await N(p,g.mismatch);return}f&&f.applied===!1&&!f.conflict&&ce("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD\uC774 \uCD5C\uC2E0 \uC0C1\uD0DC\uC640 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4","error",2800)}async function fe(p){if(!r)return;let w=await oe("worker-merge-auto-toggle",{on:p});!w||w.conflict||ce(p?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",p?"success":"info",2400)}async function de(p){if(!r||!p)return;let w=await oe("worker-merge-queue-remove",{bead_id:p});w&&!w.conflict&&!w.applied&&w.reason==="merge_active"&&ce("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function Se(){await oe("worker-merge-queue-remove",{all:!0})}async function Pe(p,w=null,f="unmerged",g=null){if(!r||!p)return;let H=rs(p,f);if(!(!!g||typeof globalThis.confirm!="function"||globalThis.confirm(H)))return;let pe=await r("worker-discard",{bead_id:p,...w?{attempt_id:w}:{},...g?{operation_id:g}:{},expected_revision:W()});if(Y(pe),pe&&pe.conflict&&(pe=await r("worker-discard",{bead_id:p,...w?{attempt_id:w}:{},...g?{operation_id:g}:{},expected_revision:W()}),Y(pe)),pe&&pe.discarded===!0){ce(ho(pe),"success",5e3);return}if(pe&&pe.reason){ce(`\uD3D0\uAE30 \uC2E4\uD328: ${pe.reason}`,"error",2800);return}if(pe&&pe.accepted&&pe.pending==="merged_revert"){ce("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(pe&&pe.accepted&&!pe.discarded){ce(`\uD3D0\uAE30 \uC9C4\uD589: ${pe.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}pe&&!pe.conflict&&ce("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function Ke(p,w,f){if(!(!r||!w||!f||D.has(w))){D.add(w),Me();try{let g=await r(p,{bead_id:w,action_id:f,expected_revision:W()});Y(g),g?.conflict?ce("\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694.","error",2800):!g?.ok&&g?.reason&&ce(`\uC774\uC804 \uC791\uC5C5 \uCC98\uB9AC \uAC70\uBD80: ${String(g.reason)}`,"error",2800)}finally{D.delete(w),Me()}}}async function Ye(p,w){if(!r||!w||ie.has(w))return;ie.add(w),Me();let f;try{let g=async(H={})=>await r(p,{bead_id:w,expected_revision:W(),...H});f=await g(),Y(f),f&&f.conflict&&(f=await r(p,{bead_id:w,expected_revision:W()}),Y(f)),p==="worker-revise-fix"&&(f=await $r(f,(H,ae)=>g({continuation:H,decision_token:ae}),{onResult:Y,refresh:()=>g()}))}finally{ie.delete(w),Me()}if(!(!f||f.conflict)){if(f.ok){ce(p==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}ce(`\uCC98\uBD84 \uAC70\uBD80: ${f.reason||""}`,"error",3e3)}}async function z(p){if(!r)return;let w=await r("worker-automation-toggle",{on:p,expected_revision:W()});Y(w),w&&w.conflict&&await r("worker-automation-toggle",{on:p,expected_revision:W()}).then(Y)}async function ee(p){if(!r||!p)return;let w=await r("worker-repo-operation-repair",{operation_id:p});if(Y(w),w&&w.ok===!1){ce(`\uD574\uACB0 \uC138\uC158 \uAC70\uBD80: ${w.reason||""}`,"error",3e3);return}w&&w.ok===!0&&ce("\uD574\uACB0 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4","success",2400)}async function ge(p){if(!r||!p)return;let w=await r("worker-repo-operation-dismiss",{operation_id:p});Y(w),w&&w.ok===!1&&ce(`\uAE30\uB85D \uB2EB\uAE30 \uAC70\uBD80: ${w.reason||""}`,"error",3e3)}async function k(p){if(!r||!Number.isFinite(p))return;let w=Math.max(So,Math.floor(p)),f=await r("worker-queue-set-slots",{slots:w,expected_revision:W()});Y(f),f&&f.conflict&&await r("worker-queue-set-slots",{slots:w,expected_revision:W()}).then(Y)}async function E(p){if(!r||!Number.isInteger(p)||p<1||p>$d)return;let w=Ue(),f=(Array.isArray(w.serial_lanes)?w.serial_lanes:[]).slice(p).reduce((ae,pe)=>ae+(Array.isArray(pe?.entries)?pe.entries.length:0),0),g=()=>({count:p,expected_revision:W()}),H=await r("worker-queue-set-serial-lane-count",g());Y(H),H&&H.conflict&&(H=await r("worker-queue-set-serial-lane-count",g()),Y(H)),H&&H.applied&&f>0&&ce(`\uC9C1\uB82C \uB808\uC778 \uCD95\uC18C \u2014 ${f}\uAC1C \uD56D\uBAA9\uC774 \uBCD1\uB82C \uB300\uAE30\uB85C \uC774\uB3D9`)}function O(){let p=Ue(),w=b?b.selectBoardColumn(rb,"ready"):[],f=b?b.selectBoardColumn(nb,"blocked"):[],g=b?b.selectBoardColumn(ab,"closed"):[],H=b?b.selectBoardColumn(sb,"in_progress"):[],ae=b?b.selectBoardColumn(ob,"resolved"):[],pe=Ls([...w,...f,...H,...ae,...g]),le=new Map;for(let h of[...w,...f,...H])h&&h.id&&!le.has(h.id)&&le.set(h.id,h);let v={...rt(u?.()||"")};for(let h of["orchestration_model","orchestration_effort","orchestration_speed"]){let j=p[h];typeof j=="string"&&(v[h]=j)}function Q(h,j){let se=le.get(h);if(!se)return null;let qe=se.metadata&&typeof se.metadata=="object"?se.metadata:{},at=se.workflow?.route,Ct=qe.route,At=Ad(at)?at:Ad(Ct)?Ct:null;return br({pin:qe,global:v,execution_defaults:p.execution_defaults??null,runner_catalog:p.runner_catalog??null,route:At,controller_runtime:j})}function C(h){let j=h.runner||null,se=Q(h.bead_id,j),qe=id(h),at=se?Xa(se,j):null;return qe||at?{orchestration:qe,worker:at}:null}let me=new Map;function it(h){if(me.has(h))return me.get(h)??null;let j=Q(h,null),se=null;if(j){let qe=Rr(p.runner_catalog??null,j.orchestration_model.value??""),at=qe===null?j:Q(h,qe),Ct=ld(at,p.runner_catalog??null),At=Xa(at,qe);se=Ct||At?{orchestration:Ct,worker:At}:null}return me.set(h,se),se}function Qe(h){let j=Os(pe,h);return j.total===0?null:j}let ot=p.bead_titles||{},Be=new Map;for(let[h,j]of Object.entries(ot))typeof j=="string"&&j.length>0&&Be.set(h,j);for(let h of[...w,...f])Be.set(h.id,h.title||h.id);let xt=p.bead_times&&typeof p.bead_times=="object"&&!Array.isArray(p.bead_times)?p.bead_times:{},Zt=p.bead_labels&&typeof p.bead_labels=="object"&&!Array.isArray(p.bead_labels)?p.bead_labels:{},Lr=new Map;for(let[h,j]of Object.entries(Zt))Array.isArray(j)&&Lr.set(h,Ja(j));for(let h of[...w,...f]){let j=h.labels;Array.isArray(j)&&!Lr.has(h.id)&&Lr.set(h.id,Ja(j))}let ln=new Map,cn=o?.get()?.last_good?.result?.groups;for(let h of Array.isArray(cn)?cn:[]){if(h?.eligible!==!0||!Array.isArray(h.members))continue;let j=h.members.map(qe=>{let at=(Array.isArray(p.serial_lanes)?p.serial_lanes:[]).find(Ct=>Ct.entries.some(At=>At.bead_id===qe));return at?at.id:null});if(!(j.every(qe=>qe!==null)&&new Set(j).size===1))for(let qe of h.members)ln.set(qe,h.members.filter(at=>at!==qe))}let us=p.bead_blocked_by&&typeof p.bead_blocked_by=="object"&&!Array.isArray(p.bead_blocked_by)?p.bead_blocked_by:{},un=new Map;for(let[h,j]of Object.entries(xt))j&&typeof j=="object"&&un.set(h,j);for(let h of[...w,...f])un.set(h.id,{created_at:h.created_at,updated_at:h.updated_at});let zr=h=>un.get(h)||{},Hr=p.pr_wait||[],dn=p.pr_observations||{},ds=p.pr_activity||{},Re=p.cleanup_failed||{},yt=Object.entries(Re).map(([h,j])=>({bead_id:h,step:j&&j.step?j.step:"",reason:j&&j.reason?j.reason:"",at:j&&typeof j.at=="number"?j.at:null,detail:j&&typeof j.detail=="string"?j.detail:null,output_tail:j&&typeof j.output_tail=="string"&&j.output_tail?j.output_tail:void 0,log_path:j&&typeof j.log_path=="string"&&j.log_path?j.log_path:void 0,retry_count:j&&typeof j.retry_count=="number"&&Number.isInteger(j.retry_count)&&j.retry_count>0?j.retry_count:0,failure_code:j&&typeof j.failure_code=="string"?j.failure_code:void 0,subject_id:j&&typeof j.subject_id=="string"?j.subject_id:void 0,repair_eligible:!!(j&&j.repair_eligible),repair:j&&j.repair?j.repair:void 0})),pn=p.queue||[],Hd=new Set([...pn.map(h=>h.bead_id),...(Array.isArray(p.serial_lanes)?p.serial_lanes:[]).flatMap(h=>(Array.isArray(h?.entries)?h.entries:[]).map(j=>j.bead_id)),...Hr.map(h=>h.bead_id),...p.done.map(h=>h.bead_id)]),Gd=new Set(f.map(h=>h.id)),Vd=l?l.get()?.order||{}:{},li=new Set,ci=[];for(let h of[...w,...f])Hd.has(h.id)||li.has(h.id)||wb(h)||(li.add(h.id),ci.push(h));L=vb(ci,re,Vd);let Kd=p.admission||{},ui=h=>{let j=Kd[h];if(!j)return"";if(j.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let se=typeof j.reason=="string"?j.reason:"",qe=se.indexOf(":");return qe>0&&qe<se.length-1?`\u26D4 ${se.slice(0,qe)} (${se.slice(qe+1)})`:`\u26D4 ${se}`},Yd=L.map(h=>{let j=so(h),se=j.path.length>0,qe=h.workflow?.route==="quick_fix"||h.metadata&&h.metadata.route==="quick_fix",at=!Object.hasOwn(h,"description")||typeof h.description=="string"&&h.description.trim().length>0,Ct=Object.hasOwn(h,"labels")&&cd(h.labels),At=!Ct&&(qe?at:se&&!j.conflict),mt=Gd.has(h.id),sr=[];mt&&sr.push(kb(h)),qe&&!at?sr.push("missing_description"):!qe&&j.conflict?sr.push("spec_id_conflict"):!qe&&!se&&sr.push("spec \uC5C6\uC74C");let ys=ui(h.id);return ys&&sr.push(ys),{id:h.id,title:h.title||h.id,reason:sr.join(" \xB7 "),draggable:At,lane:"candidate",created_at:h.created_at,updated_at:h.updated_at,workflow:h.workflow,is_quick_fix:qe,status:h.status,worker_ineligible:Ct,blocked:mt,has_spec:se,exec_chips:it(h.id)}}),To=ub(Yd,G),Zd=To.visible,Xd=p.revise_parked||{},ps=p.discard_operations&&typeof p.discard_operations=="object"&&!Array.isArray(p.discard_operations)?p.discard_operations:{},Co=(h,j)=>h.map((se,qe)=>{let at=j!=="done",Ct=j!=="done"&&j!=="queue",At=at?Xd[se.bead_id]:null,mt=at?yr(ps,se.bead_id):null,sr=mt?.operation?mt:null,ys=at&&Lr.get(se.bead_id)===!0,Mi=us[se.bead_id]||[],Mo=p.admission&&typeof p.admission=="object"?p.admission[se.bead_id]:null,Po=at?ou(Mo,!!sr||D.has(se.bead_id)):null,up=at&&!Po?ui(se.bead_id):null,dp=at?[up]:[],Pi=at&&Mi.length>0&&typeof Mo?.reason=="string"&&Mo.reason.startsWith("not_ready")?[`\u23F8 ${Mi.join(", ")} \uC644\uB8CC \uB300\uAE30 (blocks)`]:[],Do=at?ln.get(se.bead_id):void 0;return Do&&Do.length>0&&Pi.push(`\u2733 serial \uAD8C\uC7A5 \xB7 ${Do.join(", ")}\uC640`),{id:se.bead_id,title:Be.get(se.bead_id)||se.bead_id,reason:dp.filter(Boolean).join(" \xB7 "),draggable:at&&!sr&&!Po,done:j==="done",lane:j,seq:Ct?qe+1:void 0,worker_serial:ys,discard:sr,stale_work:Po,badges:[...Pi,...At?["\u23F8 REVISE \uD30C\uD0B9"]:[]],alert:!!At,revise_action:!!At,revise_enabled:!!At&&!sr&&!ie.has(se.bead_id),revise_title:At?At.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${At.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":"",usage:j==="done"?Jt(p.attempts||{},se.bead_id):null,work_ms:j==="done"?nu(p.attempts||{},se.bead_id):null,done_at:j==="done"&&typeof se.added_at=="number"?se.added_at:void 0,exec_chips:at?it(se.bead_id):null,...zr(se.bead_id)}}),fn=p.attempts?Object.values(p.attempts):[],Ro=new Set;for(let h of fn)h&&typeof h.resumed_from=="string"&&h.resumed_from.length>0&&Ro.add(h.resumed_from);let di=new Map;for(let h of fn)di.set(h.bead_id,h.attempt_id);let fs=new Map;for(let h of fn)fs.set(h.attempt_id,h);function Io(h){let j=new Set,se=h;for(;se&&!j.has(se.attempt_id);){if(se.conflict_resolution===!0)return!0;j.add(se.attempt_id),se=typeof se.resumed_from=="string"&&se.resumed_from.length>0&&fs.get(se.resumed_from)||null}return!1}let _s=typeof p.declared_base=="string"?p.declared_base:null;function Qd(h){let j=null;for(let se of fn)!se||se.bead_id!==h||Io(se)||(j===null||(typeof se.started_at=="number"?se.started_at:0)>=(typeof j.started_at=="number"?j.started_at:0))&&(j=se);return j&&typeof j.target_base=="string"?j.target_base:null}let pi=[],fi=[],Jd=od(p),_i=h=>{let j=typeof h.session_id=="string"&&h.session_id.length>0,se=Ro.has(h.attempt_id);return{eligible:j&&!se,reason:j?se?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}},nr=null;for(let h of fn){let j=h.status==="paused"&&!Ro.has(h.attempt_id);if(h.status==="running"||j)fi.push({bead_id:h.bead_id,attempt_id:h.attempt_id,title:Be.get(h.bead_id)||h.bead_id,runner:h.runner||null,model:h.model||null,effort:h.effort||null,speed:h.speed||null,continuation_mode:h.continuation_mode||null,started_at:typeof h.started_at=="number"?h.started_at:null,resumed_from:h.resumed_from||null,paused:j,conflict_resolution:Io(h),base_exception:ni(_s,h.target_base),can_pause:typeof h.session_id=="string"&&h.session_id.length>0,discard:yr(ps,h.bead_id,{attempt_id:h.attempt_id}),usage:Jt(p.attempts||{},h.bead_id),rollup:Qe(h.bead_id),rollup_expanded:U.has(h.bead_id),exec_chips:C(h),...zr(h.bead_id)});else if((h.status==="failed"||h.status==="orphaned")&&Jd(h)){let se=_i(h);pi.push({bead_id:h.bead_id,attempt_id:h.attempt_id,title:Be.get(h.bead_id)||h.bead_id,runner:h.runner||null,model:h.model||null,effort:h.effort||null,speed:h.speed||null,continuation_mode:h.continuation_mode||null,started_at:typeof h.started_at=="number"?h.started_at:null,resumed_from:h.resumed_from||null,failed:!0,status:h.status,status_label:h.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328",discard:yr(ps,h.bead_id,{attempt_id:h.attempt_id}),resume_eligible:se.eligible,resume_reason:se.reason,conflict_resolution:Io(h),base_exception:ni(_s,h.target_base),usage:Jt(p.attempts||{},h.bead_id),rollup:Qe(h.bead_id),rollup_expanded:U.has(h.bead_id),exec_chips:C(h),...zr(h.bead_id)}),nr=h}}let ms=[...pi,...fi].map(h=>{let j=fs.get(h.attempt_id),se=j?.quickfix_landing;if(j?.quickfix_lane!==!0||!se||typeof se!="object")return h;let qe=typeof se.reason=="string"&&se.reason.length>0?se.reason:null,at=os({bead_id:j.bead_id,merge_sha:se.head_sha,cleanup_cursor:se.cursor,cleanup_failed:qe?{step:se.cursor,reason:qe}:null,repo_operations:Array.isArray(p.repo_operations)?p.repo_operations:[]});return at?{...h,landing:at}:h}),mi=null;if(nr){let h=_i(nr),j=nr.cause_detail;mi={bead_id:nr.bead_id,repo:nr.repo||"",reason:nr.cause||nr.status,cause_detail:j&&typeof j.reason=="string"?{reason:j.reason,command:typeof j.command=="string"?j.command:null}:null,resume_attempt_id:nr.attempt_id,resume_eligible:h.eligible,resume_reason:h.reason,discard:yr(ps,nr.bead_id,{attempt_id:nr.attempt_id})}}let gi=new Set(ms.map(h=>h.bead_id)),Lo=Array.isArray(p.merge_queue)?p.merge_queue:[],bi=new Map,hi=new Map,yi=new Map,vi=new Map,wi=new Map;Lo.forEach((h,j)=>{h&&typeof h.bead_id=="string"&&(bi.set(h.bead_id,j+1),hi.set(h.bead_id,h.resolution),yi.set(h.bead_id,h.continuation_action||null),vi.set(h.bead_id,h.head_review||null),wi.set(h.bead_id,h.authority||null))});let _n=p.merge_queue_state||{active:null,failures:{}},ep=_n.failures||{},ki=_n.waiting&&typeof _n.waiting.bead_id=="string"&&typeof _n.waiting.reason=="string"?_n.waiting:null,tp=p.auto_merge_skips||{},$i=h=>{let j=tp[h];if(!j)return null;let se=dn[h],qe=se&&se.pr?se.pr.head_sha:null;return qe&&qe===j.head_sha?j.reason||"":null},gs=new Map;for(let h of ms)h.failed!==!0&&h.conflict_resolution&&(h.paused?gs.has(h.bead_id)||gs.set(h.bead_id,"paused"):gs.set(h.bead_id,"running"));let xi=ms.filter(h=>!h.paused&&h.failed!==!0).length,Ai=(p.workspace_info||{}).slots,Si=typeof Ai=="number"?Ai:typeof p.slots=="number"?p.slots:So,rp=xi>Si,bs=Xr(F),np=(Array.isArray(p.done)?p.done.slice():[]).filter(h=>bs===void 0||typeof h.added_at!="number"||h.added_at>=bs).sort((h,j)=>(j.added_at||0)-(h.added_at||0)),In=Co(np,"done"),sp=new Set((Array.isArray(p.done)?p.done:[]).map(h=>h?.bead_id).filter(h=>typeof h=="string")),Ei=[],op=u?.()||"";for(let h of g){let j=en(h.closed_at);if(typeof h.id!="string"||sp.has(h.id)||j===null||bs!==void 0&&j<bs||typeof h.comment_count!="number"||h.comment_count<=0)continue;let se=`${op}\0${h.id}\0${String(h.updated_at)}\0${h.comment_count}`,qe=q.get(se);qe===void 0&&r&&(q.set(se,"pending"),Promise.resolve(r("get-comments",{id:h.id})).then(at=>{let Ct=Array.isArray(at)&&at.some(At=>oo(typeof At?.text=="string"?At.text:"")?.lane==="session");q.set(se,Ct?"session":"not-session"),Me()}).catch(()=>{q.set(se,"failed"),Me()})),qe==="session"&&Ei.push({id:h.id,title:h.title||h.id,reason:"",draggable:!1,done:!0,lane:"done",selectable:!1,selected:!1,worker_serial:!1,badges:["\uC138\uC158 \uC791\uC5C5"],alert:!1,usage:null,work_ms:null,done_at:j,created_at:h.created_at,updated_at:h.updated_at})}In.push(...Ei),In.sort((h,j)=>(j.done_at||0)-(h.done_at||0));let hs={};for(let h of xr)hs[h]=0;let Ti=!1,Ci=0,Oo=0,Ri=0;for(let h of In){let j=h.usage;if(j&&typeof j=="object"){let se=!1;for(let qe of xr)Number.isFinite(j[qe])&&(hs[qe]+=j[qe],Ti=!0,se=!0);se&&(Oo+=1,Number.isFinite(j.total_cost_usd)&&(Ci+=j.total_cost_usd,Ri+=1))}}Oo>0&&Ri===Oo&&(hs.total_cost_usd=Ci);let Ii=In.map(h=>h.usage).filter(h=>h&&typeof h=="object"&&h.providers),ap=Ii.length>0?Ot(Ws(Ii)):Ti?ir(hs):null,ip=p.lane_states&&typeof p.lane_states=="object"&&!Array.isArray(p.lane_states)?p.lane_states:{},lp=Array.isArray(p.serial_lanes)?p.serial_lanes:[],Li=h=>{if(Hr.some(qe=>qe.bead_id===h))return"PR \uB300\uAE30 \xB7 \uC810\uC720";let j=fn.filter(qe=>qe&&qe.bead_id===h),se=j.length>0?j[j.length-1].status:null;return se==="failed"||se==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":se==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720"},Oi=lp.filter(h=>h&&typeof h.id=="string"&&Array.isArray(h.entries)).map((h,j)=>{let se=ip[h.id]||{},qe=new Map((Array.isArray(se.corrections)?se.corrections:[]).filter(mt=>mt&&typeof mt.bead_id=="string"&&typeof mt.after=="string").map(mt=>[mt.bead_id,mt.after])),at=Co(h.entries.filter(mt=>!gi.has(mt.bead_id)),h.id).map(mt=>qe.has(mt.id)?{...mt,badges:[`\u{1F517} ${qe.get(mt.id)} \uB4A4 (blocks \uC790\uB3D9)`,...mt.badges]}:mt),Ct=Array.isArray(se.occupied_by)?se.occupied_by.filter(mt=>typeof mt=="string"):[],At=Ct.map(mt=>({id:mt,title:Be.get(mt)||mt,draggable:!1,lane:h.id,ghost:!0,badges:[Li(mt)]}));return{id:h.id,index:j+1,rows:[...At,...at],occupied:Ct.length>0,badge:Ct.length>0?Li(Ct[0]):"\uB300\uAE30",cycle:se.cycle===!0}}),cp=typeof p.serial_lane_count=="number"?p.serial_lane_count:Oi.length;return{queue:p,idToTitle:Be,candidates:Zd,candidate_hidden:{blocked:To.hidden_blocked,spec:To.hidden_spec},running:ms,live_count:xi,slots:Si,over_cap:rp,failure:mi,waiting:Co(pn.filter(h=>!gi.has(h.bead_id)),"queue"),serial_lanes:Oi,serial_lane_count:cp,pr_wait:Hr.map(h=>Cb(h.bead_id,Be.get(h.bead_id)||h.bead_id,dn,Re[h.bead_id]||null,Jt(p.attempts||{},h.bead_id),ds[h.bead_id]||(S.has(h.bead_id)||Z.has(h.bead_id)?{activity:null,merge_progress:{step:"merging"}}:null),gs.get(h.bead_id)||null,h.external===!0,{position:bi.get(h.bead_id)||0,active:_n.active===h.bead_id,failure:ep[h.bead_id]||null,waiting:ki?.bead_id===h.bead_id?ki.reason:null,resolution:hi.get(h.bead_id),continuation_action:yi.get(h.bead_id),head_review:vi.get(h.bead_id)||null,authority:wi.get(h.bead_id)||null},h.wt_present!==!1,p.auto_merge===!0?$i(h.bead_id):null,ni(_s,Qd(h.bead_id)),p.completion_status&&typeof p.completion_status=="object"&&!Array.isArray(p.completion_status)&&p.completion_status[h.bead_id]||null,p.discard_operations&&typeof p.discard_operations=="object"&&!Array.isArray(p.discard_operations)?p.discard_operations:{},fs.get(di.get(h.bead_id)||"")?.worker_serial===!0,p.auto_merge===!0,{merge_sha:h.merge_sha,cleanup_cursor:h.cleanup_cursor,repo_operations:Array.isArray(p.repo_operations)?p.repo_operations:[]})).map(h=>({...h,...zr(h.id)})),merge_queue_length:Lo.length,merge_queue_running:Lo.length>0,auto_excluded:Hr.map(h=>h.bead_id).filter(h=>$i(h)!==null),declared_base:_s,done:In,token_total:ap,cleanup_failures:yt,repo_operations:Array.isArray(p.repo_operations)?p.repo_operations:[]}}function J(){let w=!!o?.get()?.job,f=!w&&o?.isPending?.()===!0,g=w?"\uBD84\uC11D \uC911":f?"\uC900\uBE44 \uC911":"";return i`<button
      type="button"
      class=${g?"worker-analysis-btn worker-analysis-btn--running":"worker-analysis-btn"}
      aria-busy=${g?"true":"false"}
      title="대기 이슈의 병렬 실행 가능성을 분석해 직렬 그룹을 제안합니다 (클릭할 때만 실행)"
    >
      ✳ 병렬성
      분석${g?i`<span class="worker-analysis-btn__badge">${g}</span>`:""}
    </button>`}function Ee(p){let w=p.waiting.length>0?p.waiting[0].id:"\u2014",f=i`<button
      type="button"
      class="worker-play${p.queue.auto_advance?" is-active":""}"
    >
      ${p.queue.auto_advance?"\u23F8 \uC790\uB3D9\uD654 \uBA48\uCDA4":"\u25B6 \uC790\uB3D9\uD654"}
    </button>`,g=et(p),H=p.over_cap?i`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",ae=i`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${p.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${p.pr_wait.length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${I()} 완료 <b>${p.done.length}</b></span
      >`,pe=i`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${p.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${p.declared_base||"?"}</span
    >`,le=i`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${So}
          step="1"
          .value=${String(p.slots)}
          title="동시에 실행할 세션 수 (최소 1 = 순차 실행)"
      /></label>
      <label
        class="worker-tgl worker-serial-lanes"
        title="고정 직렬 레인 수 (1~5). 축소 시 잘린 레인의 대기 항목은 병렬 대기로 돌아갑니다"
        >직렬 레인
        <select class="worker-serial-lane-count" aria-label="직렬 레인 수">
          ${Array.from({length:$d},(C,me)=>me+1).map(C=>i`<option
                value=${String(C)}
                ?selected=${p.serial_lane_count===C}
              >
                ${C}
              </option>`)}
        </select>
      </label>
      ${o?J():""} `,v=yu({failure:p.failure}),Q=su(p.repo_operations,p.cleanup_failures);return m?i`<div class="worker-ribbon">
          ${f} ${g}
          <div class="worker-kpi worker-kpi--ribbon">${H}${ae}</div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${le}</div>
          <div class="worker-kpi">${pe}</div>
        </div>
        ${Q}${je.template()}${v}`:i`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${f}${g}${le}</div>
        <div class="worker-kpi">
          ${H}${ae}${pe}
          ${(Array.isArray(p.token_total)?p.token_total:p.token_total?[{label:p.token_total,tooltip:`${I()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(C=>i`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${C.tooltip}
                >${I()} 완료 · 누적 ${C.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${w}</b></span
          >
        </div>
      </div>
      ${Q}${je.template()}${v}`}function be(p){if(p.running.length===0&&p.pr_wait.length===0)return"";let w=p.running.some(f=>!f.paused&&f.failed!==!0);return i`<section
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
          >${p.running.length+p.pr_wait.length}</span
        >
      </header>
      ${p.running.length>0?Ua(p.running,Date.now(),Ce):""}
      ${p.pr_wait.map(f=>Ma(f))}
    </section>`}function Te(p){let w=p.candidate_hidden;return i`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${G.show_blocked}
        />
        🔒 blocked${w.blocked>0?` ${w.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${db.map(f=>i`<button
              type="button"
              class="worker-filter__chip${G.spec===f.value?" is-active":""}"
              data-spec=${f.value}
              aria-pressed=${G.spec===f.value?"true":"false"}
            >
              ${f.label}
            </button>`)}
        ${w.spec>0?i`<span class="worker-filter__hidden">숨김 ${w.spec}</span>`:""}
      </div>
    </div>`}function De(){return i`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${re}
    >
      ${pb.map(p=>i`<option value=${p.value} ?selected=${re===p.value}>
            ${p.label}
          </option>`)}
    </select>`}function Et(){return i`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${F}
      >
        ${mr.map(p=>i`<option value=${p.value} ?selected=${F===p.value}>
              ${p.label}
            </option>`)}
      </select>
    </div>`}function bt(p){let w=i`<span
      class="worker-lane__badge${p.occupied?" worker-lane__badge--held":""}"
      >${p.badge}</span
    >`,f=p.cycle?i`<div class="worker-lane__cycle">
          ⚠ blocks 순환 감지 — 자동 정렬을 생략했습니다
        </div>`:"";return dr({id:`worker-pane-lane-${p.id}`,lane:p.id,title:`\uC9C1\uB82C ${p.index}`,items:p.rows,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uD589\uC744 \uC5EC\uAE30\uB85C \uB4DC\uB798\uADF8",header_control:w,controls:f})}function et(p){let w=p.queue.auto_merge===!0;if(p.merge_queue_running)return i`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop${w?" is-active":""}"
        title=${w?"\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB044\uACE0 \uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)":"\uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)"}
      >
        ${w?"\u23F8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8":"\uC77C\uAD04 \uBA38\uC9C0 \uC911\uB2E8"} ${p.merge_queue_length}
      </button>`;if(w)return i`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop is-active"
        title="자동 머지 켜짐 — 자격이 생기는 PR을 계속 큐에 넣습니다. 클릭하면 끕니다"
      >
        ⏸ 자동 머지
      </button>`;let f=new Set(p.auto_excluded),g=p.pr_wait.filter(H=>H.merge_action&&H.merge_enabled&&!f.has(H.id)).length;return i`<button
      type="button"
      class="worker-merge-all"
      title="켜 두면 자격이 생기는 PR을 계속 큐에 넣어 순서대로 충돌 해소·머지합니다"
    >
      ▶ 자동 머지${g>0?` ${g}`:""}
    </button>`}function Pt(p){let w=dr({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:p.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:De(),controls:Te(p),place_menu:ut(p.candidates)});return m?i`<div class="worker-lanes worker-lanes--mobile">
        ${be(p)}
        ${dr({id:"worker-pane-queue",lane:"queue",title:"\uBCD1\uB82C \uB300\uAE30",items:p.waiting,empty:"\uB4DC\uB798\uADF8 \uB610\uB294 [\uB300\uAE30\uB85C \u21B4]\uB85C \uBC30\uCE58",collapsible:!0,collapsed:B.queue,preview:Sd(p.waiting)})}
        ${p.serial_lanes.map(f=>bt(f))}
        ${w}
        ${dr({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:p.done,empty:`${I()} \uC644\uB8CC \uC5C6\uC74C`,controls:Et(),collapsible:!0,collapsed:B.done,preview:Array.isArray(p.token_total)?p.token_total.map(f=>f.label).join(" \xB7 "):p.token_total||Sd(p.done)})}
      </div>`:i`<div class="worker-lanes">
      ${w}
      <div class="worker-wait">
        ${dr({id:"worker-pane-queue",lane:"queue",title:"\uBCD1\uB82C \uB300\uAE30",items:p.waiting,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58"})}
        ${p.serial_lanes.map(f=>bt(f))}
      </div>
      ${dr({id:"worker-pane-running",lane:"running",title:`\uC2E4\uD589 \uC911 \xB7 \uC2AC\uB86F ${p.slots}`,items:p.running,live:p.running.some(f=>!f.paused&&f.failed!==!0),body:Ua(p.running,Date.now(),Ce)})}
      ${dr({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:p.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C"})}
      ${dr({id:"worker-pane-done",lane:"done",title:`\uC644\uB8CC \xB7 ${I()} ${p.done.length}`,items:p.done,empty:`${I()} \uC644\uB8CC \uC5C6\uC74C`,controls:Et()})}
    </div>`}function vr(p){B={...B,[p]:!B[p]},yb(B),Me()}function Me(){let p=O();Ze(Ee(p),Fe),Ze(Pt(p),st)}function jt(){let p=document.querySelector(".app-header");if(!p)return;let w=()=>{let f=Math.round(p.getBoundingClientRect().height);ue.style.setProperty("--worker-ribbon-top",`${f}px`)};if(w(),typeof ResizeObserver=="function"){let f=new ResizeObserver(w);f.observe(p),We.push(()=>f.disconnect())}else window.addEventListener("resize",w),We.push(()=>window.removeEventListener("resize",w))}function wr(){if(typeof window.matchMedia!="function")return;let p=window.matchMedia(bb);m=!!p.matches;let w=f=>{let g=!!(f&&typeof f.matches=="boolean"?f.matches:p.matches);g!==m&&(m=g,Me())};typeof p.addEventListener=="function"?(p.addEventListener("change",w),We.push(()=>p.removeEventListener("change",w))):typeof p.addListener=="function"&&(p.addListener(w),We.push(()=>p.removeListener(w)))}let zt=null;function tr(p){zt=p.target instanceof Element?p.target:null}function pr(p){let f=p.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!f)return;if(zt&&f.contains(zt)&&zt.closest("input, button, a")){p.preventDefault();return}let g=f.dataset.beadId||"",H=f.dataset.lane||"";A={bead_id:g,from_lane:H};try{p.dataTransfer?.setData("text/plain",g),p.dataTransfer&&(p.dataTransfer.effectAllowed="move")}catch{}}function Tt(p){let w=p.target?.closest?.(".worker-pane");if(!w)return;let f=w.dataset.lane||"";f!=="candidate"&&f!=="queue"&&!/^s[1-5]$/.test(f)||(p.preventDefault(),p.dataTransfer&&(p.dataTransfer.dropEffect="move"),w.classList.add("worker-pane--drag-over"))}function rr(p){p.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function fr(p,w){let f=L.find(pe=>pe.id===p);if(!f)return;let g=L.filter(pe=>pe.id!==p),H=g.length;if(w){let pe=w.dataset.beadId;if(pe===p)return;let le=g.findIndex(v=>v.id===pe);le>=0&&(H=le)}let ae=g.slice();ae.splice(H,0,f),x.applyReorder(p,ae,H)}function _r(p){let w=p.target?.closest?.(".worker-pane");if(!w)return;p.preventDefault(),w.classList.remove("worker-pane--drag-over");let f=w.dataset.lane||"",g=A?.bead_id||p.dataTransfer?.getData("text/plain")||"",H=A?.from_lane||"";if(A=null,!g)return;let ae=p.target?.closest?.(".worker-mini, .worker-card"),pe=Array.from(w.querySelectorAll(".worker-mini, .worker-card")),le=pe.length;if(ae){let v=pe.indexOf(ae);v>=0&&(le=v)}if(le=Math.max(0,le-w.querySelectorAll(".worker-mini--ghost").length),w.classList.contains("worker-pane--collapsed")&&(le=ye()),f==="candidate"){if(H==="candidate"){fr(g,ae);return}(H==="queue"||/^s[1-5]$/.test(H))&&T(g);return}if(f==="queue"||/^s[1-5]$/.test(f)){let v=f==="queue"?"parallel":f;H===f?ve(g,v,le):nt(g,v)}}function Je(p){G=p,cb(p),Me()}function Yt(p){re=p==="board"||p==="created"||p==="spec"?p:Eo,_b(re),Me()}function Ae(p){F=Qt(p)?p:Ht,gb(F),_?.(F),Me()}function $(p){let w=p.target?.closest?.(".worker-serial-lane-count");if(w){let le=Number.parseInt(w.value,10);Number.isFinite(le)&&E(le).then(Me);return}let f=p.target?.closest?.(".worker-filter__blocked");if(f){Je({...G,show_blocked:f.checked});return}let g=p.target?.closest?.(".worker-done-range");if(g){Ae(g.value);return}let H=p.target?.closest?.(".worker-sort");if(H){Yt(H.value||Eo);return}let ae=p.target?.closest?.(".worker-slots__input");if(!ae)return;let pe=Number.parseInt(ae.value,10);if(!Number.isFinite(pe)){Me();return}k(pe).then(Me)}function te(p){return p?{runner:p.runner||void 0,model:p.model||void 0,effort:p.effort||void 0,worktree:p.worktree||void 0,status:p.status||void 0,session_id:p.session_id||void 0}:{}}function he(){let p=O();return{operations:p.repo_operations,cleanup_failures:p.cleanup_failures,repo:u&&u()||""}}function dt(){Ce&&K.close(),Ve.hidden=!1,Le.hidden=!1,X.open(he()),Me()}function wt(p){let w=Ue(),f=w.attempts?w.attempts[p]:null;Ce=p,Xe=null,X.close(),Ve.hidden=!0,Le.hidden=!1,K.open({attempt_id:p,meta:te(f)}),Me()}function _t(p,w){Ce=null,Xe=p,X.close(),Ve.hidden=!0,Le.hidden=!1,K.open({attempt_id:p,meta:w,hide_prompt:!0}),Me()}function $t(){if(X.isOpen()&&X.refresh(he()),Xe){let f=(o?.get()?.runs||[]).find(g=>g.run_id===Xe);f?K.updateMeta(ti(f)):K.close();return}if(!Ce)return;let p=Ue(),w=p.attempts?p.attempts[Ce]:null;if(w){K.updateMeta(te(w));return}K.close()}function Rt(p){let w=p.target;if(w?.closest?.(".worker-mini__serial, .worker-mini__grip")||w?.closest?.("#worker-parallel-analysis-dialog"))return;if(w?.closest?.(".worker-analysis-btn")){ze?.open();return}if(w?.closest?.(".worker-repo-strip")||w?.closest?.(".worker-mini__timeline")){dt();return}let f=w?.closest?.(".worker-repo-op__session");if(f){let Re=f.dataset.attemptId;Re&&wt(Re);return}let g=w?.closest?.(".worker-repo-op__resolve");if(g){ee(g.dataset.operationId||"");return}let H=w?.closest?.(".worker-repo-op__dismiss");if(H){ge(H.dataset.operationId||"");return}let ae=w?.closest?.(".worker-cleanup__resume");if(ae){let Re=ae.dataset.beadId;Re&&R(Re);return}let pe=w?.closest?.(".worker-banner__resume");if(pe){let Re=pe.dataset.attemptId;Re&&P(Re);return}let le=w?.closest?.(".worker-banner__discard");if(le){let Re=le.dataset.confirmation==="merged"?"merged":"unmerged";Pe(le.dataset.beadId||"",le.dataset.attemptId||null,Re,le.dataset.operationId||null);return}let v=w?.closest?.(".worker-banner__dismiss");if(v){let Re=v.dataset.attemptId;Re&&V(Re);return}if(w?.closest?.(".worker-play")){z(!Ue().auto_advance);return}let Q=w?.closest?.(".worker-merge-all");if(Q){Q.classList.contains("worker-merge-all--stop")?Ue().auto_merge===!0?fe(!1):Se():fe(!0);return}let C=w?.closest?.(".worker-pane__hd--toggle");if(C){let Re=C.dataset.lane;(Re==="queue"||Re==="done")&&vr(Re);return}let me=w?.closest?.(".worker-card__place-lane");if(me){let Re=me.dataset.beadId,yt=me.dataset.lane;Re&&(yt==="parallel"||/^s[1-5]$/.test(yt||""))&&(ne=null,Me(),nt(Re,yt));return}if(w?.closest?.(".worker-card__place-cancel")){ne=null,Me();return}let Qe=w?.closest?.(".worker-card__place");if(Qe){let Re=Qe.dataset.beadId;Re&&!Qe.disabled&&(lt()?(ne=Re,Me()):nt(Re,"parallel"));return}let ot=w?.closest?.(".worker-filter__chip");if(ot){let Re=ot.dataset.spec;(Re==="all"||Re==="with"||Re==="without")&&Je({...G,spec:Re});return}let Be=w?.closest?.(".worker-mini__merge");if(Be){let Re=Be.dataset.beadId||"";Ue().cleanup_failed?.[Re]?R(Re):y(Re);return}let xt=w?.closest?.(".worker-mini__merge-cancel");if(xt){de(xt.dataset.beadId||"");return}let Zt=w?.closest?.(".worker-mini__discard");if(Zt){Pe(Zt.dataset.beadId||"",Zt.dataset.attemptId||null,Zt.dataset.discardMode==="merged"?"merged":"unmerged",Zt.dataset.operationId||null);return}let Lr=w?.closest?.(".worker-mini__stale-continue");if(Lr){Ke("worker-stale-work-continue",Lr.dataset.beadId||"",Lr.dataset.actionId||"");return}let ln=w?.closest?.(".worker-mini__stale-backup");if(ln){Ke("worker-stale-work-backup-fresh",ln.dataset.beadId||"",ln.dataset.actionId||"");return}let cn=w?.closest?.(".worker-mini__stale-recheck");if(cn){Ke("worker-stale-work-recheck",cn.dataset.beadId||"",cn.dataset.actionId||"");return}let us=w?.closest?.(".worker-mini__revise-fix");if(us){Ye("worker-revise-fix",us.dataset.beadId||"");return}let un=w?.closest?.(".worker-mini__revise-approve");if(un){Ye("worker-revise-approve",un.dataset.beadId||"");return}if(w?.closest?.(".worker-mini__pr"))return;if(w?.closest?.(".rtile__discard")){let Re=w?.closest?.(".rtile"),yt=Re?.dataset?.beadId,pn=Re?.dataset?.attemptId;yt&&Pe(yt,pn||null,"unmerged",w?.closest?.(".rtile__discard")?.dataset.operationId||null);return}if(w?.closest?.(".rtile__dismiss")){let yt=w?.closest?.(".rtile")?.dataset?.attemptId;yt&&V(yt);return}if(w?.closest?.(".rtile__pause")){let yt=w?.closest?.(".rtile")?.dataset?.attemptId;yt&&M(yt);return}if(w?.closest?.(".rtile__resume")){let yt=w?.closest?.(".rtile")?.dataset?.attemptId;yt&&P(yt);return}if(w?.closest?.(".rtile__session")){let yt=w?.closest?.(".rtile")?.dataset?.attemptId;yt&&wt(yt);return}if(w?.closest?.(".worker-drawer-overlay__backdrop")){X.close(),K.close();return}if(w?.closest?.(".worker-drawer-host"))return;let zr=w?.closest?.(".rtile .board-card__roll-toggle");if(zr){let Re=zr.dataset.rollParent;Re&&(U.has(Re)?U.delete(Re):U.add(Re),Me());return}let Hr=w?.closest?.(".rtile .board-card__roll-child");if(Hr){let Re=Hr.dataset.childId;Re&&c&&c(Re);return}let dn=w?.closest?.(".rtile");if(dn){if(w?.closest?.(".rtile__id")){let yt=dn.dataset.beadId;yt&&ar(yt).then(pn=>{pn?ce("\uBCF5\uC0AC\uB428","success",1200):ce("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let Re=dn.dataset.beadId;Re&&c&&c(Re);return}let ds=w?.closest?.(".worker-mini, .worker-card");if(ds){let Re=ds.dataset.beadId;if(w?.closest?.(".worker-mini__id, .worker-card__id")){Re&&ar(Re).then(yt=>{yt?ce("\uBCF5\uC0AC\uB428","success",1200):ce("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}Re&&c&&c(Re)}}return e.addEventListener("pointerdown",tr),e.addEventListener("dragstart",pr),e.addEventListener("dragover",Tt),e.addEventListener("dragleave",rr),e.addEventListener("drop",_r),e.addEventListener("click",Rt),e.addEventListener("change",$),wr(),jt(),b&&We.push(b.subscribe(()=>{for(let[p,w]of q)w==="failed"&&q.delete(p);Me()})),s&&We.push(s.subscribe(()=>{let p=u&&u()||"";p!==Oe&&(Oe=p,$e.close()),Me(),$t()})),o&&typeof o.subscribe=="function"&&We.push(o.subscribe(()=>{$t(),Me()})),Me(),{load(){Ne(),Me()},refreshSessionDefaults:He,destroy(){for(let p of We.splice(0))try{p()}catch{}e.removeEventListener("pointerdown",tr),e.removeEventListener("dragstart",pr),e.removeEventListener("dragover",Tt),e.removeEventListener("dragleave",rr),e.removeEventListener("drop",_r),e.removeEventListener("click",Rt),e.removeEventListener("change",$);try{K.destroy()}catch{}Le.hidden=!0;try{ze?.destroy()}catch{}try{$e.destroy()}catch{}Ze(i``,e)}}}function oi(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function Od(e,t,r,n=async()=>{},s=async()=>{}){let o=ht("views:workspace-picker"),a=null,l=!1,c=!1,u=!1;async function d(B){let S=B.target.value,ie=t.getState().workspace?.current?.path||"";if(S&&S!==ie){o("switching workspace to %s",S),l=!0,I();try{await r(S)}catch(D){o("workspace switch failed: %o",D)}finally{l=!1,I()}}}async function _(){let B=t.getState(),m=B.workspace?.current?.path||B.workspace?.available?.[0]?.path||"";if(!(!m||c)){o("git-pulling workspace %s",m),c=!0,I();try{await n(m)}catch(S){o("workspace git pull failed: %o",S)}finally{c=!1,I()}}}function b(B){let m=B.target;m&&e.contains(m)||L()}function x(B){B.key==="Escape"&&L()}function A(){u||(u=!0,document.addEventListener("mousedown",b),document.addEventListener("keydown",x),I())}function L(){u&&(u=!1,document.removeEventListener("mousedown",b),document.removeEventListener("keydown",x),I())}function G(){u?L():A()}async function ne(B){let m=B.target,S=m.value,Z=m.checked;o("toggling visibility %s \u2192 %s",S,String(Z));try{await s(S,Z)}catch(ie){o("workspace visibility toggle failed: %o",ie)}}function re(B){return B?i`
      <button
        type="button"
        class="workspace-picker__git-pull-button"
        @click=${_}
        ?disabled=${l||c}
        aria-label="Git Pull"
        title="Git Pull"
      >
        <span aria-hidden="true">⬇</span>
      </button>
    `:i``}function F(B,m){return i`
      <div class="workspace-picker__manage">
        <button
          type="button"
          class="workspace-picker__manage-button"
          @click=${G}
          aria-haspopup="true"
          aria-expanded=${u?"true":"false"}
          aria-label="프로젝트 관리"
        >
          프로젝트 관리
        </button>
        ${u?i`
              <div
                class="workspace-picker__manage-popover"
                role="menu"
                aria-label="프로젝트 표시 선택"
              >
                ${B.map(S=>i`
                    <label
                      class="workspace-picker__manage-row"
                      title="${S.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${S.path}"
                        .checked=${!m.has(S.path)}
                        @change=${ne}
                      />
                      <span class="workspace-picker__manage-name"
                        >${oi(S.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function q(){let B=t.getState(),m=B.workspace?.current,S=B.workspace?.available||[],Z=new Set(B.workspace?.hidden||[]),ie=m?.path||S[0]?.path||"";if(S.length===0)return i``;let D=S.filter(U=>!Z.has(U.path)||U.path===ie);if(D.length<=1){let U=D[0]||S[0],_e=oi(U.path);return i`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${U.path}"
            >${_e}</span
          >
          ${F(S,Z)}
          ${re(ie)}
          ${c?i`<span
                class="workspace-picker__loading"
                aria-hidden="true"
              ></span>`:""}
        </div>
      `}return i`
      <div class="workspace-picker">
        <select
          class="workspace-picker__select"
          @change=${d}
          ?disabled=${l||c}
          aria-label="Select project workspace"
        >
          ${D.map(U=>i`
              <option
                value="${U.path}"
                ?selected=${U.path===ie}
                title="${U.path}"
              >
                ${oi(U.path)}
              </option>
            `)}
        </select>
        ${F(S,Z)}
        ${re(ie)}
        ${l||c?i`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function I(){Ze(q(),e)}return I(),a=t.subscribe(()=>I()),{destroy(){a&&(a(),a=null),document.removeEventListener("mousedown",b),document.removeEventListener("keydown",x),Ze(i``,e)}}}var Md=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","get-session-defaults","set-session-defaults","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-automation-toggle","worker-auto-repair-toggle","worker-repo-ops-opt-out-toggle","worker-repo-operation-repair","worker-repo-operation-dismiss","worker-queue-set-slots","worker-queue-set-serial-lane-count","subscribe-worker-parallel-analysis","unsubscribe-worker-parallel-analysis","worker-parallel-analysis-snapshot","worker-parallel-analysis-targets","worker-parallel-analysis-prompt","worker-parallel-analysis-start","worker-parallel-analysis-cancel","worker-parallel-analysis-settings-update","worker-parallel-analysis-submit","worker-queue-set-orchestration-defaults","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-cleanup-retry","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-stale-work-continue","worker-stale-work-backup-fresh","worker-stale-work-recheck","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-worker-system-prompt","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-impl-presets","unsubscribe-impl-presets","impl-presets-snapshot","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","monitor-auto-toggle"];function ai(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function Pd(e,t,r=ai()){return{id:r,type:e,payload:t}}function Dd(e={}){let t=ht("ws"),r={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},n=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",a=0,l=null,c=!0,u=new Map,d=[],_=new Map,b=new Set;function x(q){for(let I of Array.from(b))try{I(q)}catch{}}function A(){if(!c||l)return;o="reconnecting",t("ws reconnecting\u2026"),x(o);let q=Math.min(r.maxMs||0,(r.initialMs||0)*Math.pow(r.factor||1,a)),I=(r.jitterRatio||0)*q,B=Math.max(0,Math.round(q+(Math.random()*2-1)*I));t("ws retry in %d ms (attempt %d)",B,a+1),l=setTimeout(()=>{l=null,F()},B)}function L(q){try{s?.send(JSON.stringify(q))}catch(I){t("ws send failed",I)}}function G(){for(o="open",t("ws open"),x(o),a=0;d.length;){let q=d.shift();q&&L(q)}}function ne(q){let I;try{I=JSON.parse(String(q.data))}catch{t("ws received non-JSON message");return}if(!I||typeof I.id!="string"||typeof I.type!="string"){t("ws received invalid envelope");return}if(u.has(I.id)){let m=u.get(I.id);u.delete(I.id),I.ok?m?.resolve(I.payload):m?.reject(I.error||new Error("ws error"));return}let B=_.get(I.type);if(B&&B.size>0)for(let m of Array.from(B))try{m(I.payload)}catch(S){t("ws event handler error",S)}else t("ws received unhandled message type: %s",I.type)}function re(){o="closed",t("ws closed"),x(o);for(let[q,I]of u.entries())I.reject(new Error("ws disconnected")),u.delete(q);a+=1,A()}function F(){if(!c)return;let q=n();try{s=new WebSocket(q),t("ws connecting %s",q),o="connecting",x(o),s.addEventListener("open",G),s.addEventListener("message",ne),s.addEventListener("error",()=>{}),s.addEventListener("close",re)}catch(I){t("ws connect failed %o",I),A()}}return F(),{send(q,I){if(!Md.includes(q))return Promise.reject(new Error(`unknown message type: ${q}`));let B=ai(),m=Pd(q,I,B);return t("send %s id=%s",q,B),new Promise((S,Z)=>{u.set(B,{resolve:S,reject:Z,type:q}),s&&s.readyState===s.OPEN?L(m):(t("queue %s id=%s (state=%s)",q,B,o),d.push(m))})},on(q,I){_.has(q)||_.set(q,new Set);let B=_.get(q);return B?.add(I),()=>{B?.delete(I)}},onConnection(q){return b.add(q),()=>{b.delete(q)}},reconnect(){c=!0,l&&(clearTimeout(l),l=null),a=0,F()},close(){c=!1,l&&(clearTimeout(l),l=null);try{s?.close()}catch{}},getState(){return o}}}function Rb(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function Ib(e,t){try{let n=await(await fetch("/api/config")).json();e.setState({config:n})}catch(r){t("config refresh failed",r)}}var ii=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],Nd=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"],["tab:worker:resolved","resolved-issues"],["tab:worker:closed","closed-issues"]],Ur="tab:worker:closed",Lb="bdui.worker.done-range",qd=qu,Fd="worker:queue",jd="worker:parallel-analysis",Bd="ui:order",Ud="ui:display-policy",Wd="exec:presets",Wr="tab:board:closed",zd="beads-ui.board.closed-range";function Ob(e){let t=ht("main");t("bootstrap start");let r=i`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;Ze(r,e);let n=document.getElementById("global-nav"),s=document.getElementById("top-nav"),o=document.getElementById("repo-scope"),a=document.getElementById("usage-meter"),l=document.getElementById("board-root"),c=document.getElementById("worker-root"),u=document.getElementById("monitor-root"),d=document.getElementById("detail-panel");if(a&&sd(a),l&&c&&u&&d){let He=function(f,g){let H="Request failed",ae="";if(f&&typeof f=="object"){let le=f;if(typeof le.message=="string"&&le.message.length>0&&(H=le.message),typeof le.details=="string")ae=le.details;else if(le.details&&typeof le.details=="object")try{ae=JSON.stringify(le.details,null,2)}catch{ae=""}}else typeof f=="string"&&f.length>0&&(H=f);let pe=g&&g.length>0?`Failed to load ${g}`:"Request failed";Ne.open(pe,H,ae)},Y=function(f){return`${Je.getState().workspace.current?.path||""}\0${f}`},ye=function(){$e&&($e().catch(()=>{}),$e=null),Oe=null,je=null},ve=function(f){ze=f;let g=()=>{ze!==f||Je.getState().selected_id!==f||(ze=null,nt(f))};if(!ut){lt.then(g);return}g()},V=function(f,g,H,ae,pe){return H!==P[g]?(pe().catch(()=>{}),!1):(f.set(ae,pe),!0)},y=function(){let f=Je.getState();Se(f.view==="board"),ge(f.view==="worker"),Ee(f.view==="monitor"),E(f.view==="board"||f.view==="worker"||oe||!!f.selected_id)},fe=function(){let f=Xr(R);return f===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:f}}},de=function(){let f=Xr(N);return f===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:f}}},Se=function(f){if(f)for(let[g,H]of ii){if(T.has(g)||M.has(g))continue;let ae=g===Wr?fe():{type:H};try{Ge.register(g,ae)}catch(v){t("register %s store failed: %o",g,v)}M.add(g);let pe=P.board,le=!1;Le.subscribeList(g,ae).then(v=>{le=!V(T,"board",pe,g,v)}).catch(v=>{t("subscribe %s failed: %o",g,v),He(v,"board")}).finally(()=>{M.delete(g),le&&y()})}else Ye()},Ye=function(){P.board+=1;for(let[f]of ii){let g=T.get(f);g&&(g().catch(()=>{}),T.delete(f));try{Ge.unregister(f)}catch(H){t("unregister %s failed: %o",f,H)}}},ge=function(f){if(!f){k();return}for(let[g,H]of Nd){if(z.has(g)||M.has(g))continue;let ae=g===Ur?de():{type:H};try{Ge.register(g,ae)}catch(v){t("register %s store failed: %o",g,v)}M.add(g);let pe=P.worker,le=!1;Le.subscribeList(g,ae).then(v=>{le=!V(z,"worker",pe,g,v)}).catch(v=>{t("subscribe %s failed: %o",g,v),He(v,"worker")}).finally(()=>{M.delete(g),le&&y()})}},k=function(){P.worker+=1;for(let[f]of Nd){let g=z.get(f);g&&(g().catch(()=>{}),z.delete(f));try{Ge.unregister(f)}catch(H){t("unregister %s failed: %o",f,H)}}},E=function(f){if(!f){O();return}ee||(Fe("subscribe-worker-queue",{id:Fd}).catch(g=>{t("subscribe-worker-queue failed: %o",g)}),Fe("subscribe-worker-parallel-analysis",{id:jd}).catch(g=>{t("subscribe-worker-parallel-analysis failed: %o",g)}),ee=()=>(Fe("unsubscribe-worker-parallel-analysis",{id:jd}),Fe("unsubscribe-worker-queue",{id:Fd})))},O=function(){ee&&(ee().catch(()=>{}),ee=null),Ve.clear()},Ee=function(f){if(!f){be();return}J||(Fe("subscribe-monitor-pipeline",{id:qd}).catch(g=>{t("subscribe-monitor-pipeline failed: %o",g)}),J=()=>Fe("unsubscribe-monitor-pipeline",{id:qd}))},be=function(){J&&(J().catch(()=>{}),J=null)},De=function(){Te||(Fe("subscribe-ui-order",{id:Bd}).catch(f=>{t("subscribe-ui-order failed: %o",f)}),Te=()=>Fe("unsubscribe-ui-order",{id:Bd}))},Et=function(){Te&&(Te().catch(()=>{}),Te=null),Ce.clear()},et=function(){bt||(Fe("subscribe-display-policy",{id:Ud}).catch(f=>{t("subscribe-display-policy failed: %o",f)}),bt=()=>Fe("unsubscribe-display-policy",{id:Ud}))},Pt=function(){bt&&(bt().catch(()=>{}),bt=null),Xe.clear()},Me=function(){vr||(Fe("subscribe-impl-presets",{id:Wd}).catch(f=>{t("subscribe-impl-presets failed: %o",f)}),vr=()=>Fe("unsubscribe-impl-presets",{id:Wd}))},Tt=function(f){if(!f)return"Unknown";let g=f.split("/").filter(Boolean);return g.length>0?g[g.length-1]:"Unknown"};var _=He,b=Y,x=ye,A=ve,L=V,G=y,ne=fe,re=de,F=Se,q=Ye,I=ge,B=k,m=E,S=O,Z=Ee,ie=be,D=De,U=Et,_e=et,we=Pt,ke=Me,xe=Tt;let We=document.getElementById("header-loading"),rt=hl(We),Ne=ru(e),ue=Dd(),Fe=rt.wrapSend((f,g)=>ue.send(f,g)),Le=ul(Fe),Ge=dl(),Ie=_l(),Ve=fl(),st=Yi(),Ce=pl(),Xe=Vi(),K=Ki(),X=Zi();ue.on("impl-presets-snapshot",f=>{let g=f;g&&typeof g.revision=="number"&&Array.isArray(g.presets)&&K.set({revision:g.revision,presets:g.presets})}),ue.on("monitor-pipeline-snapshot",f=>{let g=f;if(!(!g||!Array.isArray(g.workspaces)))try{st.set(g.workspaces,g.workspaces_state)}catch{}}),ue.on("ui-order-snapshot",f=>{let g=f;if(g&&typeof g.revision=="number")try{Ce.set({revision:g.revision,order:g.order&&typeof g.order=="object"?g.order:{}})}catch{}}),ue.on("display-policy-snapshot",f=>{let g=f;if(g&&g.policy&&typeof g.policy=="object")try{Xe.set(g.policy)}catch{}}),ue.on("session-log-snapshot",f=>{let g=f;if(g&&typeof g.id=="string")try{X.set(g.id,Array.isArray(g.lines)?g.lines:[],typeof g.last_event_at=="number"?g.last_event_at:null)}catch{}}),ue.on("session-log-append",f=>{let g=f;if(g&&typeof g.id=="string")try{X.append(g.id,g.event)}catch{}}),ue.on("snapshot",f=>{let g=f,H=g&&typeof g.id=="string"?g.id:"",ae=H?Ge.getStore(H):null;if(ae&&g&&g.type==="snapshot")try{ae.applyPush(g)}catch{}}),ue.on("upsert",f=>{let g=f,H=g&&typeof g.id=="string"?g.id:"",ae=H?Ge.getStore(H):null;if(ae&&g&&g.type==="upsert")try{ae.applyPush(g)}catch{}}),ue.on("delete",f=>{let g=f,H=g&&typeof g.id=="string"?g.id:"",ae=H?Ge.getStore(H):null;if(ae&&g&&g.type==="delete")try{ae.applyPush(g)}catch{}});let $e=null,Oe=null,je=null,ze=null,Ue=()=>{},lt=new Promise(f=>{Ue=()=>f(void 0)}),ut=!1,W=!1;async function nt(f){let g=Y(f);if(g===Oe||g===je)return;je=g;let H=`detail:${f}`,ae={type:"issue-detail",params:{id:f}};try{Ge.register(H,ae)}catch(pe){t("register detail store failed: %o",pe)}try{let pe=await Le.subscribeList(H,ae);if(Je.getState().selected_id!==f||Y(f)!==g){await pe().catch(()=>{});return}$e&&await $e().catch(()=>{}),$e=pe,Oe=g}catch(pe){t("detail subscribe failed: %o",pe),He(pe,"issue details")}finally{je===g&&(je=null)}}let T=new Map,M=new Set,P={board:0,worker:0},oe=!1,R=Ht;try{let f=window.localStorage.getItem(zd);Qt(f)&&(R=f)}catch{}let N=Ht;try{let f=window.localStorage.getItem(Lb);Qt(f)&&(N=f)}catch{}async function Pe(f){if(!Qt(f)||f===R)return;R=f;try{window.localStorage.setItem(zd,f)}catch{}let g=T.get(Wr);if(!g)return;T.delete(Wr),await g().catch(()=>{});let H=fe();try{Ge.register(Wr,H)}catch(ae){t("register %s store failed: %o",Wr,ae)}try{let ae=await Le.subscribeList(Wr,H);T.set(Wr,ae)}catch(ae){t("re-subscribe %s failed: %o",Wr,ae),He(ae,"board")}}async function Ke(f){if(!Qt(f)||f===N)return;N=f;let g=z.get(Ur);if(!g)return;z.delete(Ur),await g().catch(()=>{});let H=de();try{Ge.register(Ur,H)}catch(ae){t("register %s store failed: %o",Ur,ae)}try{let ae=await Le.subscribeList(Ur,H);z.set(Ur,ae)}catch(ae){t("re-subscribe %s failed: %o",Ur,ae),He(ae,"worker")}}let z=new Map,ee=null,J=null,Te=null,bt=null,vr=null;async function jt(){bt=null,Xe.clear(),vr=null,K.clear(),ee=null,J=null,T.clear(),z.clear(),P.board+=1,P.worker+=1,Me();let f=Je.getState().workspace.current?.path;if(f)try{await ue.send("set-workspace",{path:f})}catch(H){t("workspace restore after reconnect failed: %o",H);return}et();let g=Je.getState();Se(g.view==="board"),ge(g.view==="worker"),Ee(g.view==="monitor"),E(g.view==="board"||g.view==="worker"||!!g.selected_id)}async function wr(){t("clearing all subscriptions for workspace switch"),Ye(),k(),O(),Ie.clear(),Et(),De(),Pt(),et(),ye();let f=Je.getState();if(f.selected_id)try{Ge.unregister(`detail:${f.selected_id}`)}catch{}let g=Je.getState();Se(g.view==="board"),ge(g.view==="worker"),Ee(g.view==="monitor"),E(g.view==="board"||g.view==="worker"||!!g.selected_id),g.selected_id&&ve(g.selected_id)}async function zt(f){t("requesting workspace switch to %s",f),W=!0;try{let g=await ue.send("set-workspace",{path:f});t("workspace switch result: %o",g),g&&g.workspace&&(Je.setState({workspace:{current:{path:g.workspace.root_dir,database:g.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",f),g.changed&&(await wr(),ce("Switched to "+Tt(f),"success",2e3)))}catch(g){throw t("workspace switch failed: %o",g),ce("Failed to switch workspace","error",3e3),g}finally{W=!1}}async function tr(f){t("requesting workspace git pull for %s",f);try{let g=await ue.send("git-pull-workspace",{});t("workspace git pull result: %o",g);let H=g?.status;if(H==="up_to_date"){ce("Already up to date","success",2e3);return}if(H==="stash_pop_conflict"){ce("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}ce("Git pulled "+Tt(f),"success",2e3)}catch(g){t("workspace git pull failed: %o",g);let H=g?.code,ae=g?.message;if(H==="rebase_conflict"){ce("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(H==="rebase_conflict_abort_failed"){ce("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(H==="busy"){ce("Git pull skipped: another operation is running","warning",3e3);return}let pe=ae?`: ${ae}`:"";throw ce(`Git pull failed${pe}`,"error",3e3),g}}async function pr(f,g){t("setting workspace visibility %s \u2192 %s",f,String(g));try{await ue.send("set-workspace-visibility",{path:f,visible:g}),await rr()}catch(H){t("workspace visibility update failed: %o",H),ce("Failed to update project visibility","error",3e3)}}async function rr(){try{let f=await ue.send("list-workspaces",{});if(t("workspaces loaded: %o",f),f&&Array.isArray(f.workspaces)){let g=f.workspaces.map(le=>({path:le.path,database:le.database,pid:le.pid,version:le.version})),H=f.current?{path:f.current.root_dir,database:f.current.db_path}:null,ae=Array.isArray(f.hidden)?f.hidden.filter(le=>typeof le=="string"):[];Je.setState({workspace:{current:H,available:g,hidden:ae}});let pe=window.localStorage.getItem("beads-ui.workspace");pe&&(!g.some(v=>v.path===pe)||ae.includes(pe)?window.localStorage.removeItem("beads-ui.workspace"):H&&pe!==H.path&&(t("restoring saved workspace preference: %s",pe),await zt(pe)))}}catch(f){t("failed to load workspaces: %o",f)}}ue.on("workspace-changed",f=>{t("workspace-changed event: %o",f),f&&f.root_dir&&(Je.setState({workspace:{current:{path:f.root_dir,database:f.db_path}}}),rr(),wr())});let fr=!1;if(typeof ue.onConnection=="function"){let f=g=>{t("ws state %s",g),g==="reconnecting"||g==="closed"?(fr=!0,ce("Connection lost. Reconnecting\u2026","error",4e3)):g==="open"&&fr&&(fr=!1,ce("Reconnected","success",2200),Ib(Je,(H,ae)=>{t(`${H}: %o`,ae)}),jt())};ue.onConnection(f)}let _r="board";try{let f=window.localStorage.getItem("beads-ui.view");(f==="board"||f==="worker"||f==="monitor")&&(_r=f)}catch(f){t("view parse error: %o",f)}let Je=bl({config:Rb(),view:_r});ue.on("worker-queue-snapshot",f=>{let g=f;if(!g||!g.queue)return;let H=Je.getState().workspace.current?.path;if(typeof H=="string"&&H.length>0&&g.root_dir!==H){t("dropping worker-queue snapshot for %s",String(g.root_dir));return}try{Ie.set(g.queue)}catch{}}),ue.on("worker-parallel-analysis-snapshot",f=>{let g=f;if(!g)return;let H=Je.getState().workspace.current?.path;if(!(typeof H=="string"&&H.length>0&&typeof g.root_dir=="string"&&g.root_dir!==H))try{Ve.set({settings:g.settings,job:g.job??null,runs:Array.isArray(g.runs)?g.runs:[],last_good:g.last_good??null})}catch{}});let Yt=ml(Je);Yt.start();let Ae=new Set(["get-comments","dep-add","dep-remove","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","get-session-defaults","set-session-defaults"]),$=async(f,g)=>{try{return await Fe(f,g)}catch(H){if(Ae.has(f))throw H;return[]}};ju({global_element:n,repo_element:s},Je,Yt);let te=document.getElementById("workspace-picker");te&&Od(te,Je,zt,tr,pr);let he=zu(e,(f,g)=>Fe(f,g));try{let f=document.getElementById("new-issue-btn");f&&f.addEventListener("click",()=>he.open())}catch{}let dt=Ku(e,{policyStore:Xe,queueStore:Ie,implPresetStore:K,transport:(f,g)=>Fe(f,g),onOpenChange:f=>{let g=oe;oe=f,y(),g&&f===!1&&_t.refreshSessionDefaults()},labelOptions:()=>{let f=new Set;for(let[g]of ii)for(let H of Ge.snapshotFor(g)||[]){let ae=H.labels;if(Array.isArray(ae))for(let pe of ae)typeof pe=="string"&&pe.length>0&&f.add(pe)}return Array.from(f).sort()}});try{let f=document.getElementById("display-settings-btn");f&&(f.setAttribute("aria-label","\uC124\uC815"),f.setAttribute("title","\uC124\uC815"),f.addEventListener("click",()=>dt.open()))}catch{}let wt=Rl(l,{gotoIssue:f=>Yt.gotoIssue(f),issueStores:Ge,transport:$,workerQueueStore:Ie,uiOrderStore:Ce,displayPolicyStore:Xe,closedRange:R,onClosedRangeChange:f=>{Pe(f)},onNewIssue:()=>he.open()}),_t=si(c,{transport:$,issueStores:Ge,queueStore:Ie,analysisStore:Ve,sessionLogStore:X,uiOrderStore:Ce,gotoIssue:f=>Je.setState({selected_id:f}),getWorkspacePath:()=>Je.getState().workspace.current?.path,doneRange:N,onDoneRangeChange:f=>{Ke(f)}}),$t=Fu(u,{transport:$,pipelineStore:st,execPresetStore:K,gotoIssue:f=>Yt.gotoIssue(f),getWorkspacePath:()=>Je.getState().workspace.current?.path,switchWorkspace:f=>zt(f)}),Rt=tu(d,{issueStores:Ge,transport:$,queueStore:Ie,execPresetStore:K,sessionLogStore:X,getWorkspacePath:()=>Je.getState().workspace.current?.path,onNavigate:f=>{Je.getState().view==="worker"?Je.setState({selected_id:f}):Yt.gotoIssue(f)},onClose:()=>{let f=Je.getState();Je.setState({selected_id:null});try{Yt.gotoView(f.view==="worker"||f.view==="monitor"?f.view:"board")}catch{}},onOpenExecPresets:()=>{dt.open("execution")}}),p=Je.getState().selected_id;p&&(d.hidden=!1,Rt.load(p),ve(p)),Je.subscribe(f=>{let g=f.selected_id;g?(d.hidden=!1,Rt.load(g),W||ve(g)):(Rt.clear(),d.hidden=!0,ye())});let w=f=>{l.hidden=f.view!=="board",c.hidden=f.view!=="worker",u.hidden=f.view!=="monitor",o&&o.classList.toggle("is-quiet",f.view==="monitor"),Se(f.view==="board"),ge(f.view==="worker"),Ee(f.view==="monitor"),E(f.view==="board"||f.view==="worker"||oe||!!f.selected_id),!f.selected_id&&f.view==="board"&&wt.load(),f.view==="worker"&&_t.load(),f.view==="monitor"?$t.load():$t.pause(),window.localStorage.setItem("beads-ui.view",f.view)};Je.subscribe(w),w(Je.getState()),De(),et(),Me(),rr().finally(()=>{ut=!0,Ue()}),window.addEventListener("keydown",f=>{let g=f.ctrlKey||f.metaKey,H=String(f.key||"").toLowerCase(),ae=f.target,pe=ae&&ae.tagName?String(ae.tagName).toLowerCase():"",le=pe==="input"||pe==="textarea"||pe==="select"||ae&&typeof ae.isContentEditable=="boolean"&&ae.isContentEditable;g&&H==="n"&&(le||(f.preventDefault(),he.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let r=window.localStorage.getItem("beads-ui.theme"),n=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=r==="dark"||r==="light"?r:n?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let r=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",r),window.localStorage.setItem("beads-ui.theme",r)});let t=document.getElementById("app");t&&Ob(t)});export{Ob as bootstrap,Rb as readBootstrapConfig,Ib as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
