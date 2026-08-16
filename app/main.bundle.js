var Kc=Object.create;var qs=Object.defineProperty;var Zc=Object.getOwnPropertyDescriptor;var Xc=Object.getOwnPropertyNames;var Qc=Object.getPrototypeOf,Jc=Object.prototype.hasOwnProperty;var ed=(e,t,r)=>t in e?qs(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var Bs=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var td=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of Xc(t))!Jc.call(e,s)&&s!==r&&qs(e,s,{get:()=>t[s],enumerable:!(n=Zc(t,s))||n.enumerable});return e};var rd=(e,t,r)=>(r=e!=null?Kc(Qc(e)):{},td(t||!e||!e.__esModule?qs(r,"default",{value:e,enumerable:!0}):r,e));var Ke=(e,t,r)=>ed(e,typeof t!="symbol"?t+"":t,r);var Ia=Bs((A_,Ra)=>{var Nr=1e3,Fr=Nr*60,qr=Fr*60,Er=qr*24,od=Er*7,ad=Er*365.25;Ra.exports=function(e,t){t=t||{};var r=typeof e;if(r==="string"&&e.length>0)return id(e);if(r==="number"&&isFinite(e))return t.long?cd(e):ld(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function id(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var r=parseFloat(t[1]),n=(t[2]||"ms").toLowerCase();switch(n){case"years":case"year":case"yrs":case"yr":case"y":return r*ad;case"weeks":case"week":case"w":return r*od;case"days":case"day":case"d":return r*Er;case"hours":case"hour":case"hrs":case"hr":case"h":return r*qr;case"minutes":case"minute":case"mins":case"min":case"m":return r*Fr;case"seconds":case"second":case"secs":case"sec":case"s":return r*Nr;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r;default:return}}}}function ld(e){var t=Math.abs(e);return t>=Er?Math.round(e/Er)+"d":t>=qr?Math.round(e/qr)+"h":t>=Fr?Math.round(e/Fr)+"m":t>=Nr?Math.round(e/Nr)+"s":e+"ms"}function cd(e){var t=Math.abs(e);return t>=Er?Un(e,t,Er,"day"):t>=qr?Un(e,t,qr,"hour"):t>=Fr?Un(e,t,Fr,"minute"):t>=Nr?Un(e,t,Nr,"second"):e+" ms"}function Un(e,t,r,n){var s=t>=r*1.5;return Math.round(e/r)+" "+n+(s?"s":"")}});var Oa=Bs((T_,La)=>{function dd(e){r.debug=r,r.default=r,r.coerce=l,r.disable=a,r.enable=s,r.enabled=c,r.humanize=Ia(),r.destroy=u,Object.keys(e).forEach(f=>{r[f]=e[f]}),r.names=[],r.skips=[],r.formatters={};function t(f){let _=0;for(let b=0;b<f.length;b++)_=(_<<5)-_+f.charCodeAt(b),_|=0;return r.colors[Math.abs(_)%r.colors.length]}r.selectColor=t;function r(f){let _,b=null,A,x;function L(...q){if(!L.enabled)return;let S=L,B=Number(new Date),Z=B-(_||B);S.diff=Z,S.prev=_,S.curr=B,_=B,q[0]=r.coerce(q[0]),typeof q[0]!="string"&&q.unshift("%O");let y=0;q[0]=q[0].replace(/%([a-zA-Z%])/g,(T,X)=>{if(T==="%%")return"%";y++;let Y=r.formatters[X];if(typeof Y=="function"){let ne=q[y];T=Y.call(S,ne),q.splice(y,1),y--}return T}),r.formatArgs.call(S,q),(S.log||r.log).apply(S,q)}return L.namespace=f,L.useColors=r.useColors(),L.color=r.selectColor(f),L.extend=n,L.destroy=r.destroy,Object.defineProperty(L,"enabled",{enumerable:!0,configurable:!1,get:()=>b!==null?b:(A!==r.namespaces&&(A=r.namespaces,x=r.enabled(f)),x),set:q=>{b=q}}),typeof r.init=="function"&&r.init(L),L}function n(f,_){let b=r(this.namespace+(typeof _>"u"?":":_)+f);return b.log=this.log,b}function s(f){r.save(f),r.namespaces=f,r.names=[],r.skips=[];let _=(typeof f=="string"?f:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let b of _)b[0]==="-"?r.skips.push(b.slice(1)):r.names.push(b)}function o(f,_){let b=0,A=0,x=-1,L=0;for(;b<f.length;)if(A<_.length&&(_[A]===f[b]||_[A]==="*"))_[A]==="*"?(x=A,L=b,A++):(b++,A++);else if(x!==-1)A=x+1,L++,b=L;else return!1;for(;A<_.length&&_[A]==="*";)A++;return A===_.length}function a(){let f=[...r.names,...r.skips.map(_=>"-"+_)].join(",");return r.enable(""),f}function c(f){for(let _ of r.skips)if(o(f,_))return!1;for(let _ of r.names)if(o(f,_))return!0;return!1}function l(f){return f instanceof Error?f.stack||f.message:f}function u(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return r.enable(r.load()),r}La.exports=dd});var Da=Bs((kt,jn)=>{kt.formatArgs=pd;kt.save=fd;kt.load=_d;kt.useColors=ud;kt.storage=md();kt.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();kt.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function ud(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function pd(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+jn.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let r=0,n=0;e[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(r++,s==="%c"&&(n=r))}),e.splice(n,0,t)}kt.log=console.debug||console.log||(()=>{});function fd(e){try{e?kt.storage.setItem("debug",e):kt.storage.removeItem("debug")}catch{}}function _d(){let e;try{e=kt.storage.getItem("debug")||kt.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function md(){try{return localStorage}catch{}}jn.exports=Oa()(kt);var{formatters:gd}=jn.exports;gd.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var Jr=globalThis,Pn=Jr.trustedTypes,ma=Pn?Pn.createPolicy("lit-html",{createHTML:e=>e}):void 0,js="$lit$",rr=`lit$${Math.random().toFixed(9).slice(2)}$`,Ws="?"+rr,nd=`<${Ws}>`,xr=document,en=()=>xr.createComment(""),tn=e=>e===null||typeof e!="object"&&typeof e!="function",zs=Array.isArray,ya=e=>zs(e)||typeof e?.[Symbol.iterator]=="function",Us=`[ 	
\f\r]`,Qr=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ga=/-->/g,ha=/>/g,kr=RegExp(`>|${Us}(?:([^\\s"'>=/]+)(${Us}*=${Us}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ba=/'/g,va=/"/g,ka=/^(?:script|style|textarea|title)$/i,Hs=e=>(t,...r)=>({_$litType$:e,strings:t,values:r}),i=Hs(1),fr=Hs(2),v_=Hs(3),Rt=Symbol.for("lit-noChange"),st=Symbol.for("lit-nothing"),wa=new WeakMap,$r=xr.createTreeWalker(xr,129);function $a(e,t){if(!zs(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return ma!==void 0?ma.createHTML(t):t}var xa=(e,t)=>{let r=e.length-1,n=[],s,o=t===2?"<svg>":t===3?"<math>":"",a=Qr;for(let c=0;c<r;c++){let l=e[c],u,f,_=-1,b=0;for(;b<l.length&&(a.lastIndex=b,f=a.exec(l),f!==null);)b=a.lastIndex,a===Qr?f[1]==="!--"?a=ga:f[1]!==void 0?a=ha:f[2]!==void 0?(ka.test(f[2])&&(s=RegExp("</"+f[2],"g")),a=kr):f[3]!==void 0&&(a=kr):a===kr?f[0]===">"?(a=s??Qr,_=-1):f[1]===void 0?_=-2:(_=a.lastIndex-f[2].length,u=f[1],a=f[3]===void 0?kr:f[3]==='"'?va:ba):a===va||a===ba?a=kr:a===ga||a===ha?a=Qr:(a=kr,s=void 0);let A=a===kr&&e[c+1].startsWith("/>")?" ":"";o+=a===Qr?l+nd:_>=0?(n.push(u),l.slice(0,_)+js+l.slice(_)+rr+A):l+rr+(_===-2?c:A)}return[$a(e,o+(e[r]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),n]},rn=class e{constructor({strings:t,_$litType$:r},n){let s;this.parts=[];let o=0,a=0,c=t.length-1,l=this.parts,[u,f]=xa(t,r);if(this.el=e.createElement(u,n),$r.currentNode=this.el.content,r===2||r===3){let _=this.el.content.firstChild;_.replaceWith(..._.childNodes)}for(;(s=$r.nextNode())!==null&&l.length<c;){if(s.nodeType===1){if(s.hasAttributes())for(let _ of s.getAttributeNames())if(_.endsWith(js)){let b=f[a++],A=s.getAttribute(_).split(rr),x=/([.?@])?(.*)/.exec(b);l.push({type:1,index:o,name:x[2],strings:A,ctor:x[1]==="."?Nn:x[1]==="?"?Fn:x[1]==="@"?qn:Ar}),s.removeAttribute(_)}else _.startsWith(rr)&&(l.push({type:6,index:o}),s.removeAttribute(_));if(ka.test(s.tagName)){let _=s.textContent.split(rr),b=_.length-1;if(b>0){s.textContent=Pn?Pn.emptyScript:"";for(let A=0;A<b;A++)s.append(_[A],en()),$r.nextNode(),l.push({type:2,index:++o});s.append(_[b],en())}}}else if(s.nodeType===8)if(s.data===Ws)l.push({type:2,index:o});else{let _=-1;for(;(_=s.data.indexOf(rr,_+1))!==-1;)l.push({type:7,index:o}),_+=rr.length-1}o++}}static createElement(t,r){let n=xr.createElement("template");return n.innerHTML=t,n}};function Sr(e,t,r=e,n){if(t===Rt)return t;let s=n!==void 0?r._$Co?.[n]:r._$Cl,o=tn(t)?void 0:t._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(e),s._$AT(e,r,n)),n!==void 0?(r._$Co??(r._$Co=[]))[n]=s:r._$Cl=s),s!==void 0&&(t=Sr(e,s._$AS(e,t.values),s,n)),t}var Mn=class{constructor(t,r){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:r},parts:n}=this._$AD,s=(t?.creationScope??xr).importNode(r,!0);$r.currentNode=s;let o=$r.nextNode(),a=0,c=0,l=n[0];for(;l!==void 0;){if(a===l.index){let u;l.type===2?u=new Mr(o,o.nextSibling,this,t):l.type===1?u=new l.ctor(o,l.name,l.strings,this,t):l.type===6&&(u=new Bn(o,this,t)),this._$AV.push(u),l=n[++c]}a!==l?.index&&(o=$r.nextNode(),a++)}return $r.currentNode=xr,s}p(t){let r=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(t,n,r),r+=n.strings.length-2):n._$AI(t[r])),r++}},Mr=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,r,n,s){this.type=2,this._$AH=st,this._$AN=void 0,this._$AA=t,this._$AB=r,this._$AM=n,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,r=this._$AM;return r!==void 0&&t?.nodeType===11&&(t=r.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,r=this){t=Sr(this,t,r),tn(t)?t===st||t==null||t===""?(this._$AH!==st&&this._$AR(),this._$AH=st):t!==this._$AH&&t!==Rt&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):ya(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==st&&tn(this._$AH)?this._$AA.nextSibling.data=t:this.T(xr.createTextNode(t)),this._$AH=t}$(t){let{values:r,_$litType$:n}=t,s=typeof n=="number"?this._$AC(t):(n.el===void 0&&(n.el=rn.createElement($a(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===s)this._$AH.p(r);else{let o=new Mn(s,this),a=o.u(this.options);o.p(r),this.T(a),this._$AH=o}}_$AC(t){let r=wa.get(t.strings);return r===void 0&&wa.set(t.strings,r=new rn(t)),r}k(t){zs(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,n,s=0;for(let o of t)s===r.length?r.push(n=new e(this.O(en()),this.O(en()),this,this.options)):n=r[s],n._$AI(o),s++;s<r.length&&(this._$AR(n&&n._$AB.nextSibling,s),r.length=s)}_$AR(t=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);t!==this._$AB;){let n=t.nextSibling;t.remove(),t=n}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},Ar=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,r,n,s,o){this.type=1,this._$AH=st,this._$AN=void 0,this.element=t,this.name=r,this._$AM=s,this.options=o,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=st}_$AI(t,r=this,n,s){let o=this.strings,a=!1;if(o===void 0)t=Sr(this,t,r,0),a=!tn(t)||t!==this._$AH&&t!==Rt,a&&(this._$AH=t);else{let c=t,l,u;for(t=o[0],l=0;l<o.length-1;l++)u=Sr(this,c[n+l],r,l),u===Rt&&(u=this._$AH[l]),a||(a=!tn(u)||u!==this._$AH[l]),u===st?t=st:t!==st&&(t+=(u??"")+o[l+1]),this._$AH[l]=u}a&&!s&&this.j(t)}j(t){t===st?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Nn=class extends Ar{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===st?void 0:t}},Fn=class extends Ar{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==st)}},qn=class extends Ar{constructor(t,r,n,s,o){super(t,r,n,s,o),this.type=5}_$AI(t,r=this){if((t=Sr(this,t,r,0)??st)===Rt)return;let n=this._$AH,s=t===st&&n!==st||t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive,o=t!==st&&(n===st||s);s&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Bn=class{constructor(t,r,n){this.element=t,this.type=6,this._$AN=void 0,this._$AM=r,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(t){Sr(this,t)}},Sa={M:js,P:rr,A:Ws,C:1,L:xa,R:Mn,D:ya,V:Sr,I:Mr,H:Ar,N:Fn,U:qn,B:Nn,F:Bn},sd=Jr.litHtmlPolyfillSupport;sd?.(rn,Mr),(Jr.litHtmlVersions??(Jr.litHtmlVersions=[])).push("3.3.1");var Fe=(e,t,r)=>{let n=r?.renderBefore??t,s=n._$litPart$;if(s===void 0){let o=r?.renderBefore??null;n._$litPart$=s=new Mr(t.insertBefore(en(),o),o,void 0,r??{})}return s._$AI(e),s};var xt="today",Yt=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}];function It(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function Tr(e,t=Date.now()){switch(e){case"today":{let r=new Date(t);return r.setHours(0,0,0,0),r.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function Aa(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Ta(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Ea(){let e=null,t=[],r=new Set;function n(){for(let s of Array.from(r))try{s()}catch{}}return{get(){return e},getWorkspacesState(){return t},set(s,o){e=Array.isArray(s)?s:null,t=Array.isArray(o)?o:[],n()},clear(){e=null,t=[],n()},subscribe(s){return r.add(s),()=>r.delete(s)}}}function Ca(){let e=new Map,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{set(n,s,o=null){e.set(n,{lines:Array.isArray(s)?[...s]:[],last_event_at:typeof o=="number"?o:null}),r()},append(n,s){let o=e.get(n)||{lines:[],last_event_at:null};o.lines=[...o.lines,s],o.last_event_at=Date.now(),e.set(n,o),r()},get(n){return e.get(n)||null},clear(n){typeof n=="string"?e.delete(n):e.clear(),r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}var Pa=rd(Da(),1);function nt(e){return(0,Pa.default)(`beads-ui:${e}`)}function Ft(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function Cr(e,t){let r=Ft(e.created_at),n=Ft(t.created_at);if(r!==n)return r<n?1:-1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,c=t.id;return a<c?-1:a>c?1:0}function Fa(e,t){let r=Ft(e.created_at),n=Ft(t.created_at);if(r!==n)return r<n?-1:1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,c=t.id;return a<c?-1:a>c?1:0}function qa(e,t){let r=Ft(e.updated_at),n=Ft(t.updated_at);if(r!==n)return r<n?1:-1;let s=e.id,o=t.id;return s<o?-1:s>o?1:0}function Ba(e,t){let r=e.priority??2,n=t.priority??2;if(r!==n)return r-n;let s=Ft(e.created_at),o=Ft(t.created_at);if(s!==o)return s<o?1:-1;let a=e.id,c=t.id;return a<c?-1:a>c?1:0}function Ua(e,t){let r=e.closed_at??0,n=t.closed_at??0;if(r!==n)return r<n?1:-1;let s=e?.id,o=t?.id;return s<o?-1:s>o?1:0}var hd=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function Ma(e){let t=e&&e.metadata,r=t?t.task_order:void 0;if(r==null||r==="")return Number.POSITIVE_INFINITY;let n=Number(r);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function Na(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let r=hd.exec(t);if(!r)return Number.POSITIVE_INFINITY;let n=Number(r[1]);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function ja(e,t){let r=Ma(e),n=Ma(t);if(r!==n)return r<n?-1:1;let s=Na(e),o=Na(t);if(s!==o)return s<o?-1:1;let a=Ft(e&&e.created_at),c=Ft(t&&t.created_at);if(a!==c)return a<c?-1:1;let l=e&&e.id,u=t&&t.id;return l===u?0:String(l)<String(u)?-1:1}var Gs=2**20;function Br(e,t){let r=e&&e.id;return t&&typeof r=="string"&&Object.prototype.hasOwnProperty.call(t,r)&&typeof t[r]=="number"&&Number.isFinite(t[r])?t[r]:-Ft(e&&e.created_at)}function Wn(e){return(t,r)=>{let n=Br(t,e),s=Br(r,e);if(n!==s)return n<s?-1:1;let o=t?.id,a=r?.id;return o<a?-1:o>a?1:0}}function Vs(e,t,r){let n=Array.isArray(e)?e:[],s=n.length,o=Math.max(0,Math.min(t,s-1)),a=o-1>=0?n[o-1]:null,c=o+1<s?n[o+1]:null;if(!a&&!c)return{rank:0};if(!a)return{rank:Br(c,r)-Gs};if(!c)return{rank:Br(a,r)+Gs};let l=Br(a,r),u=Br(c,r),f=(l+u)/2;return l<f&&f<u?{rank:f}:{renormalize:n.map((_,b)=>({bead_id:_.id,rank:b*Gs}))}}function Ys(e,t={}){let r=nt(`issue-store:${e}`),n=new Map,s=[],o=0,a=new Set,c=!1,l=t.sort||Cr;function u(){for(let b of Array.from(a))try{b()}catch{}}function f(){s=Array.from(n.values()).sort(l)}function _(b){if(c||!b||b.id!==e)return;let A=Number(b.revision)||0;if(r("apply %s rev=%d",b.type,A),!(A<=o&&b.type!=="snapshot")){if(b.type==="snapshot"){if(A<=o)return;n.clear();let x=Array.isArray(b.issues)?b.issues:[];for(let L of x)L&&typeof L.id=="string"&&L.id.length>0&&n.set(L.id,L);f(),o=A,u();return}if(b.type==="upsert"){let x=b.issue;if(x&&typeof x.id=="string"&&x.id.length>0){let L=n.get(x.id);if(!L)n.set(x.id,x);else{let q=Number.isFinite(L.updated_at)?L.updated_at:0,S=Number.isFinite(x.updated_at)?x.updated_at:0;if(q<=S){for(let B of Object.keys(L))B in x||delete L[B];for(let[B,Z]of Object.entries(x))L[B]=Z}}f()}o=A,u()}else if(b.type==="delete"){let x=String(b.issue_id||"");x&&(n.delete(x),f()),o=A,u()}}}return{id:e,subscribe(b){return a.add(b),()=>{a.delete(b)}},applyPush:_,snapshot(){return s},size(){return n.size},getById(b){return n.get(b)},dispose(){c=!0,n.clear(),s=[],a.clear(),o=0}}}function zn(e){let t=String(e.type||"").trim(),r={};if(e.params&&typeof e.params=="object"){let s=Object.keys(e.params).sort();for(let o of s){let a=e.params[o];r[o]=String(a)}}let n=new URLSearchParams(r).toString();return n.length>0?`${t}?${n}`:t}function Wa(e){let t=nt("subs"),r=new Map,n=new Map;function s(c,l){t("applyDelta %s +%d ~%d -%d",c,(l.added||[]).length,(l.updated||[]).length,(l.removed||[]).length);let u=n.get(c);if(!u||u.size===0)return;let f=Array.isArray(l.added)?l.added:[],_=Array.isArray(l.updated)?l.updated:[],b=Array.isArray(l.removed)?l.removed:[];for(let A of Array.from(u)){let x=r.get(A);if(!x)continue;let L=x.itemsById;for(let q of f)typeof q=="string"&&q.length>0&&L.set(q,!0);for(let q of _)typeof q=="string"&&q.length>0&&L.set(q,!0);for(let q of b)typeof q=="string"&&q.length>0&&L.delete(q)}}async function o(c,l){let u=zn(l);if(t("subscribe %s key=%s",c,u),!r.has(c))r.set(c,{key:u,itemsById:new Map});else{let _=r.get(c);if(_&&_.key!==u){let b=n.get(_.key);b&&(b.delete(c),b.size===0&&n.delete(_.key)),r.set(c,{key:u,itemsById:new Map})}}n.has(u)||n.set(u,new Set);let f=n.get(u);f&&f.add(c);try{await e("subscribe-list",{id:c,type:l.type,params:l.params})}catch(_){let b=r.get(c)||null;if(b){let A=n.get(b.key);A&&(A.delete(c),A.size===0&&n.delete(b.key))}throw r.delete(c),_}return async()=>{t("unsubscribe %s key=%s",c,u);try{await e("unsubscribe-list",{id:c})}catch{}let _=r.get(c)||null;if(_){let b=n.get(_.key);b&&(b.delete(c),b.size===0&&n.delete(_.key))}r.delete(c)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:zn,selectors:{getIds(c){let l=r.get(c);return l?Array.from(l.itemsById.keys()):[]},has(c,l){let u=r.get(c);return u?u.itemsById.has(l):!1},count(c){let l=r.get(c);return l?l.itemsById.size:0},getItemsById(c){let l=r.get(c),u={};if(!l)return u;for(let f of l.itemsById.keys())u[f]=!0;return u}}}}function za(){let e=nt("issue-stores"),t=new Map,r=new Map,n=new Set,s=new Map;function o(){for(let l of Array.from(n))try{l()}catch{}}function a(l,u,f){let _=u?zn(u):"",b=r.get(l)||"",A=t.has(l);if(e("register %s key=%s (prev=%s)",l,_,b),A&&b&&_&&b!==_){let x=t.get(l);if(x)try{x.dispose()}catch{}let L=s.get(l);if(L){try{L()}catch{}s.delete(l)}let q=Ys(l,f);t.set(l,q);let S=q.subscribe(()=>o());s.set(l,S)}else if(!A){let x=Ys(l,f);t.set(l,x);let L=x.subscribe(()=>o());s.set(l,L)}return r.set(l,_),()=>c(l)}function c(l){e("unregister %s",l),r.delete(l);let u=t.get(l);u&&(u.dispose(),t.delete(l));let f=s.get(l);if(f){try{f()}catch{}s.delete(l)}}return{register:a,unregister:c,getStore(l){return t.get(l)||null},snapshotFor(l){let u=t.get(l);return u?u.snapshot().slice():[]},subscribe(l){return n.add(l),()=>n.delete(l)}}}function Ha(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Ga(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Ks(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function bd(e){let t=String(e||""),r=t.startsWith("#")?t.slice(1):t,n=r.indexOf("?"),s=n>=0?r.slice(n+1):"";if(s){let c=new URLSearchParams(s).get("issue");if(c)return decodeURIComponent(c)}let o=/^\/issue\/([^\s?#]+)/.exec(r);return o&&o[1]?decodeURIComponent(o[1]):null}function vd(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function Va(e){let t=nt("router"),r=()=>{let n=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(n),o=s&&s[1]?decodeURIComponent(s[1]):bd(n),a=vd(n);if(t("hash change \u2192 view=%s id=%s",a,o),e.setState({selected_id:a==="worker"?null:o,view:a,worker:{selected_parent_id:a==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(n)){let l=o?`#/${a}?issue=${encodeURIComponent(o)}`:`#/${a}`;window.location.hash!==l&&(window.location.hash=l)}};return{start(){window.addEventListener("hashchange",r),r()},stop(){window.removeEventListener("hashchange",r)},gotoIssue(n){let s=e.getState?e.getState():{view:"board"},o=s.view==="worker"||s.view==="monitor"?s.view:"board",a=Ks(o,n);t("goto issue %s (view=%s)",n,o),window.location.hash!==a?window.location.hash=a:e.setState({selected_id:o==="worker"?null:n,view:o,worker:{selected_parent_id:o==="worker"?n:null}})},gotoView(n){let s=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},o=n==="worker"?s.worker?.selected_parent_id:s.selected_id,a=o?Ks(n,o):`#/${n}`;t("goto view %s (id=%s)",n,o||""),window.location.hash!==a?window.location.hash=a:e.setState({view:n,selected_id:n==="worker"?null:s.selected_id})}}}var wd=Object.freeze({workspace_config:{default_workspace:null}});function Ya(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:wd.workspace_config.default_workspace}}}function Ka(e={}){let t=nt("state"),r={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:Ya(e.config)},n=new Set;function s(){for(let o of Array.from(n))try{o(r)}catch{}}return{getState(){return r},setState(o){let a={...r,...o,filters:{...r.filters,...o.filters||{}},board:{...r.board,...o.board||{}},worker:{...r.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:r.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:r.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:r.workspace.hidden},config:o.config!==void 0?Ya(o.config):r.config},c=a.workspace.current?.path!==r.workspace.current?.path||a.workspace.available.length!==r.workspace.available.length||a.workspace.hidden.length!==r.workspace.hidden.length||a.workspace.hidden.some((u,f)=>u!==r.workspace.hidden[f]),l=a.config.workspace_config.default_workspace!==r.config.workspace_config.default_workspace;a.selected_id===r.selected_id&&a.view===r.view&&a.filters.status===r.filters.status&&a.filters.search===r.filters.search&&a.filters.type===r.filters.type&&a.board.closed_filter===r.board.closed_filter&&a.worker.selected_parent_id===r.worker.selected_parent_id&&a.worker.show_closed_children.length===r.worker.show_closed_children.length&&a.worker.show_closed_children.every((u,f)=>u===r.worker.show_closed_children[f])&&!c&&!l||(r=a,t("state change %o",{selected_id:r.selected_id,view:r.view,filters:r.filters,board:r.board,worker:r.worker,workspace:r.workspace.current?.path,config:{default_workspace:r.config.workspace_config.default_workspace}}),s())},subscribe(o){return n.add(o),()=>n.delete(o)}}}function Za(e){let t=nt("activity"),r=0,n=new Map,s=1;function o(){if(!e)return;let u=r>0;e.toggleAttribute("hidden",!u),e.setAttribute("aria-busy",u?"true":"false")}function a(){r+=1,t("start count=%d",r),o()}function c(){let u=r;r=Math.max(0,r-1),u<=0?t("done called but count was already %d",u):t("done count=%d\u2192%d",u,r),o()}function l(u){return async(_,b)=>{let A=s++,x=Date.now();n.set(A,{type:_,start_ts:x}),t("request start id=%d type=%s count=%d",A,_,r+1),a();let L=!1,q=()=>{L||(L=!0,n.delete(A),c())},S=setTimeout(()=>{L||(t("request TIMEOUT id=%d type=%s elapsed=%dms",A,_,Date.now()-x),q())},3e4);try{let B=await u(_,b),Z=Date.now()-x;return t("request done id=%d type=%s elapsed=%dms",A,_,Z),B}catch(B){let Z=Date.now()-x;throw t("request error id=%d type=%s elapsed=%dms err=%o",A,_,Z,B),B}finally{clearTimeout(S),q()}}}return o(),{wrapSend:l,start:a,done:c,getCount:()=>r,getActiveRequests:()=>{let u=Date.now();return Array.from(n.entries()).map(([f,_])=>({id:f,type:_.type,elapsed_ms:u-_.start_ts}))}}}function re(e,t="info",r=2800){let n=document.createElement("div");n.className="toast",n.textContent=e,n.style.position="fixed",n.style.right="12px",n.style.bottom="12px",n.style.zIndex="1000",n.style.color="#fff",n.style.padding="8px 10px",n.style.borderRadius="4px",n.style.fontSize="12px",t==="success"?n.style.background="#156d36":t==="warning"?n.style.background="#a36a00":t==="error"?n.style.background="#9f2011":n.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(n),setTimeout(()=>{try{n.remove()}catch{}},r)}function Hn(e=void 0,t=void 0){function r(){if(!t||typeof t.get!="function")return null;let o=t.get();return o&&o.order?o.order:{}}function n(o,a,c){let l=e&&e.snapshotFor?e.snapshotFor(o).slice():[];if(a==="closed")return l.sort(Ua),l;switch(c){case"created_desc":return l.sort(Cr),l;case"created_asc":return l.sort(Fa),l;case"updated_desc":return l.sort(qa),l;case"priority":return l.sort(Ba),l;case"manual":default:{let u=r();return u?l.sort(Wn(u)):l.sort(Cr),l}}}function s(o){let a=[];return e&&typeof e.subscribe=="function"&&a.push(e.subscribe(o)),t&&typeof t.subscribe=="function"&&a.push(t.subscribe(o)),()=>{for(let c of a)try{c()}catch{}}}return{selectBoardColumn:n,subscribe:s}}function nr(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function dt(e){let t=nr(e);if(t===null)return"";let r=new Date(t),n=s=>String(s).padStart(2,"0");return`${r.getFullYear()}-${n(r.getMonth()+1)}-${n(r.getDate())} ${n(r.getHours())}:${n(r.getMinutes())}`}function St(e,t){let r=nr(e);if(r===null)return"";let s=(typeof t=="number"?t:Date.now())-r;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let a=Math.floor(s/36e5);if(a<24)return`${a}\uC2DC\uAC04 \uC804`;let c=Math.floor(s/864e5);if(c<7)return`${c}\uC77C \uC804`;let l=Math.floor(c/7);if(c<30)return`${l}\uC8FC \uC804`;let u=Math.floor(c/30);return u<12?`${u}\uAC1C\uC6D4 \uC804`:`${Math.floor(c/365)}\uB144 \uC804`}function Gn(e){if(!Array.isArray(e))return null;let t=null,r=-1;for(let n of e){if(!n||n.status!=="in_progress")continue;let s=nr(n.updated_at)??0;if(t===null||s>r){t=n,r=s;continue}s===r&&String(n.id)<String(t.id)&&(t=n)}return t}function Vn(e){let t=e.transport,r=e.uiOrderStore;function n(a,c){return"renormalize"in a?a.renormalize:[{bead_id:c,rank:a.rank}]}function s(a,c){let l={...a.order};for(let u of c)l[u.bead_id]=u.rank;r&&r.set({revision:a.revision,order:l})}async function o(a,c,l){if(!t||!r)return;let u=r.get()||{revision:0,order:{}},f=n(Vs(c,l,u.order),a);s(u,f);let _=await t("ui-order-set",{expected_revision:u.revision,entries:f});if(_&&_.conflict){let b={revision:typeof _.revision=="number"?_.revision:0,order:_.order||{}};r.set(b);let A=n(Vs(c,l,b.order),a);s(b,A);let x=await t("ui-order-set",{expected_revision:b.revision,entries:A});x&&x.applied&&r.set({revision:typeof x.revision=="number"?x.revision:0,order:x.order||{}})}else _&&_.applied&&r.set({revision:typeof _.revision=="number"?_.revision:0,order:_.order||{}})}return{applyReorder:o}}function Yn(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Zs(e,t){return!t||typeof e!="string"||e.length===0||Yn(t.visible_labels).includes(e)?!0:Yn(t.hidden_labels).includes(e)?!1:!Yn(t.hidden_prefixes).some(r=>r.length>0&&e.startsWith(r))}function Kn(e,t){return Yn(e).filter(r=>Zs(r,t))}function _r(e,t){let r=e&&e.chips?e.chips[t]:void 0;return typeof r=="boolean"?r:!0}var yd={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},Qa={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},Xa={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},kd={review:"\u2713",skip:"\u2298"},mr={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function $d(e,t,r){if(!(r==="in_progress"||r==="resolved"))return null;for(let s of e){let o=t[s];if(o&&o.fill==="dim"&&o.stale!==!0)return s}return null}function Ja(e){let t=e&&e.fill||"none";return t==="none"?mr.none:e&&e.stale===!0?mr.stale:t==="dim"?mr.dim:e&&e.glyph==="review"?mr.review:e&&e.glyph==="skip"?mr.skip:mr.done}function xd(e){if(!e||e.fill==="none"||!e.approval_state)return Ja(e);let t=[];return e.glyph==="review"?t.push(mr.review):e.glyph==="skip"&&t.push(mr.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function Sd(e,t,r){let n=yd[e]||e,s=t&&t.fill||"none",o=!!t&&t.stale===!0,a=kd[t&&t.glyph||""]||"",c="bar";s==="dim"?c+=` b-${n} dim`:s==="full"&&(c+=` b-${n} full`),o&&(c+=" stale"),r&&(c+=" cur");let l=s==="none"?"lbl":`lbl l-${n} on`,u=r?`color: var(--stage-${n}-on)`:"";return i`
    <div class="seg">
      <div class=${c} style=${u}>${a}</div>
      <div class=${l}>
        ${Qa[e]||e}
      </div>
    </div>
  `}function Zn(e,t){if(!e||!e.stages)return"";let r=Xa[e.route]||Xa.spec_backed,n=e.stages,s=$d(r,n,String(t||"open")),o=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${r.map(a=>`${Qa[a]||a} ${a==="plan"?xd(n[a]||{}):Ja(n[a]||{})}`).join(" \xB7 ")}`;return i`
    <div class="stp" role="img" aria-label=${o}>
      ${r.map(a=>Sd(a,n[a]||{},a===s))}
    </div>
  `}function Ad(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var ei=2;function Td(e){if(!e)return[];let t=[];if(e.external){let n=e.reason?`\u23F8 blocked: ${e.reason}`:"\u23F8 blocked";t.push(i`<span class="ctl-chip ctl-chip--blocked">${n}</span>`)}let r=Array.isArray(e.blockers)?e.blockers:[];if(r.length>0){let n=r.slice(0,ei).join(", "),s=r.length-ei,o=`\u26D3 blocked: ${n}${s>0?` +${s}`:""}`;t.push(i`<span class="ctl-chip ctl-chip--blocked-dep">${o}</span>`)}return t}function Ed(e,t){let r=t.policy||null,n=e.workflow&&e.workflow.chips||{},s=[];if(n.route&&_r(r,"route")){let a=n.route_source==="derived";s.push(i`<span
        class="ctl-chip ctl-chip--route${a?" is-derived":""}"
        title=${a?"route \uBBF8\uD540 (metadata unset)":"route"}
        >${a?"unset":n.route}</span
      >`)}if(n.fast_track&&_r(r,"fast_track")&&s.push(i`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),n.pr&&_r(r,"pr")){let a=n.pr.number;s.push(i`<span class="ctl-chip ctl-chip--pr"
        >${`PR${a!=null?` #${a}`:""}`}</span
      >`)}if(n.exec_receipt){let a=n.exec_receipt;s.push(i`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${a.kind}:${a.actor}@${a.sha}`}
        >${`exec ${a.kind==="delegated"?a.actor:`main:${a.actor}`} \xB7 ${a.sha.slice(0,7)}`}</span
      >`)}if(n.impl_entry){let a=n.impl_entry;s.push(i`<span
        class="ctl-chip ctl-chip--impl-entry"
        title=${`impl_entry ${a.actor}@${a.sha}`}
        >${`impl ${a.actor} \xB7 ${a.sha.slice(0,7)}`}</span
      >`)}for(let a of Kn(e.labels,r))s.push(i`<span class="ctl-chip ctl-chip--label">${a}</span>`);return e.from_id&&_r(r,"from")&&s.push(i`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${a=>{a.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(a,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),_r(r,"blocked")&&s.push(...Td(e.blocked_info)),t.cleanupFailureFor&&t.cleanupFailureFor(e.id)&&_r(r,"blocked")&&s.push(i`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 멈춤</span>`),s.length===0?"":i`<div class="board-card__chips">${s}</div>`}function Cd(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function Rd(e){let t=St(e.created_at),r=St(e.updated_at);return!t&&!r?"":i`<span class="board-card__times">
    ${t?i`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${dt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}
    ${t&&r?i`<span class="board-card__time-sep">·</span>`:""}
    ${r?i`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${dt(e.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </span>`}function Id(e,t){let r=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]},n=r.total||0,s=t.isExpanded?t.isExpanded(e.id):!0,o=n>0?r.children.slice().sort(ja):r.children;return i`
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
        ${Rd(e)}
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
                  @click=${l=>t.onChildClick&&t.onChildClick(l,a.id)}
                >
                  <span class=${Cd(a.status)}>●</span>
                  <span class="board-card__roll-child-ord">${c+1}</span>
                  <span class="board-card__roll-child-title"
                    >${a.title||a.id}</span
                  >
                </button>`)}
          </div>`:""}
    </div>
  `}function Xn(e,t){let r=Ad(e.priority);return i`
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
      ${Ed(e,t)}
      ${e.workflow&&_r(t.policy||null,"stepper")?Zn(e.workflow,e.status):""}
      ${Id(e,t)}
    </article>
  `}function Ur(e,t){let r=Array.isArray(e.items)?e.items.length:0,n=e.is_closed===!0;return i`
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
              ${Yt.map(o=>i`<option
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
        ${e.items.map(o=>Xn(o,t))}
      </div>
    </section>
  `}function ti(e,t,r){return i`
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
          ${e.items.length===0?i`<div class="deferred-popup__empty">Deferred 이슈 없음</div>`:e.items.map(n=>Xn(n,t))}
        </div>
      </div>
    </dialog>
  `}var Ld=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],Od=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],Dd=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function Pd(e,t,r){let n=e.labels.length,s=n>0?`\uB77C\uBCA8 ${n}`:"\uB77C\uBCA8";return i`
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
  `}function ri(e,t,r){return i`
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
        ${Ld.map(n=>i`<option
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
        ${Od.map(n=>i`<option
              value=${n.value}
              ?selected=${e.type===n.value}
            >
              ${n.label}
            </option>`)}
      </select>
      ${Pd(e,t,r)}
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
        ${Dd.map(n=>i`<option
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
  `}var Md=200,Nd={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},Fd=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),ni="beads-ui.board.sort",si=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function qd(){try{let e=window.localStorage.getItem(ni);if(e&&si.has(e))return e}catch{}return"created_desc"}function oi(e,t){let r=nt("views:board"),n=t.gotoIssue,s=t.issueStores,o=t.transport,a=t.uiOrderStore,c=t.displayPolicyStore,l=t.workerQueueStore,u=t.onClosedRangeChange,f=t.onNewIssue,_=t.closedRange||xt,b=s?Hn(s,a):null,A=Vn({transport:o,uiOrderStore:a}),x=[],L=[],q=[],S=[],B=[],Z=[],y=!1,k=0,T=qd(),X=new Map,Y=new Map,ne=new Map,be=new Set,J={search:"",priority:"",type:"",labels:[]},ee=!1,Ee=null;function je(F){return String(F.status||"open")==="open"}function et(F){let V=String(F.status||"open");return V==="open"||V==="blocked"}function Ne(F){let V=J.search.trim().toLowerCase(),_e=J.priority,G=J.type,we=J.labels;return F.filter(Ae=>{if(V){let qe=String(Ae.id||"").toLowerCase(),Xe=String(Ae.title||"").toLowerCase();if(!qe.includes(V)&&!Xe.includes(V))return!1}if(_e!==""&&String(Ae.priority)!==_e||G!==""&&String(Ae.issue_type||"")!==G)return!1;if(we.length>0){let qe=Array.isArray(Ae.labels)?Ae.labels:[];if(!we.some(Xe=>qe.includes(Xe)))return!1}return!0})}function We(){let F=new Set;for(let V of[x,L,q,S,B,Z])for(let _e of V){let G=Array.isArray(_e.labels)?_e.labels:[];for(let we of G)typeof we=="string"&&we.length>0&&F.add(we)}return Array.from(F).sort()}function Ce(){return J.search.trim()!==""||J.priority!==""||J.type!==""||J.labels.length>0}function fe(){try{if(b){let F=b.selectBoardColumn("tab:board:in-progress","in_progress",T),V=b.selectBoardColumn("tab:board:blocked","blocked",T).filter(et),_e=new Set(F.map($e=>$e.id)),G=b.selectBoardColumn("tab:board:ready","ready",T).filter($e=>je($e)&&!_e.has($e.id)),we=b.selectBoardColumn("tab:board:resolved","resolved",T),Ae=b.selectBoardColumn("tab:board:deferred","deferred",T),qe=b.selectBoardColumn("tab:board:closed","closed").slice(0,Md),Xe=[...V,...G,...F,...we,...qe];Se(Xe);let ye=new Set;for(let $e of Xe)$e&&$e.id&&!Xs($e)&&ye.add($e.id);let ze=!Ce();x=ze?nn(V,ye):V,L=ze?nn(G,ye):G,q=ze?nn(F,ye):F,S=ze?nn(we,ye):we,B=Ae,k=Ae.length,Z=ze?nn(qe,ye):qe,X=new Map;for(let $e of x)X.set($e.id,"open");for(let $e of L)X.set($e.id,"open");for(let $e of q)X.set($e.id,"in_progress");for(let $e of S)X.set($e.id,"resolved");for(let $e of B)X.set($e.id,"deferred");for(let $e of Z)X.set($e.id,"closed");Y=new Map;for(let $e of x)Y.set($e.id,"blocked-col");for(let $e of L)Y.set($e.id,"ready-col");for(let $e of q)Y.set($e.id,"in-progress-col");for(let $e of S)Y.set($e.id,"resolved-col");for(let $e of Z)Y.set($e.id,"closed-col")}Qe()}catch{x=[],L=[],q=[],S=[],B=[],Z=[],ne=new Map,Qe()}}function Se(F){let V=new Map;for(let G of F)G&&G.id&&!V.has(G.id)&&V.set(G.id,G);let _e=new Map;for(let G of V.values()){let we=Xs(G);if(!we)continue;let Ae=_e.get(we);Ae||(Ae=[],_e.set(we,Ae)),Ae.push({id:G.id,title:G.title,status:G.status,metadata:G.metadata,created_at:G.created_at,updated_at:G.updated_at})}ne=_e}function he(F){let V=ne.get(F)||[],_e=0;for(let we of V)(we.status==="resolved"||we.status==="closed")&&(_e+=1);let G=Gn(V);return{total:V.length,count:_e,current:G,children:V}}function H(F){return!be.has(F)}function z(F,V){F.preventDefault(),F.stopPropagation(),be.has(V)?be.delete(V):be.add(V),Qe()}function Ie(F,V){F.preventDefault(),F.stopPropagation(),n(V)}function ie(F,V){F.preventDefault(),F.stopPropagation(),n(V)}function se(F,V){Ee||n(V)}function E(F,V){F.preventDefault(),F.stopPropagation(),Bd(V).then(_e=>{_e&&re("\uBCF5\uC0AC\uB428","success",1200)})}function N(F,V){Ee=V,F.dataTransfer&&(F.dataTransfer.setData("text/plain",V),F.dataTransfer.effectAllowed="move"),F.target.classList.add("board-card--dragging")}function ue(F){F.target.classList.remove("board-card--dragging"),$t(),setTimeout(()=>{Ee=null},0)}function Pe(F){let V=String(F.target.value||"");!V||V===_||(_=V,u&&u(V),Qe())}function R(){return c?c.get():null}function U(F){let V=l?l.get():null,_e=V?V.cleanup_failed:null;if(!_e||typeof _e!="object"||Array.isArray(_e))return null;let G=_e[F];return!G||typeof G!="object"||Array.isArray(G)?null:G}let C={onCardClick:se,onCopyId:E,onDragStart:N,onDragEnd:ue,onClosedRangeChange:Pe,rollupFor:he,isExpanded:H,onRollupToggle:z,onChildClick:Ie,onFromChipClick:ie,cleanupFailureFor:U,get policy(){return R()}};function Q(F,V){Ee||(Le(),n(V))}function ae(F,V){F.preventDefault(),F.stopPropagation(),Le(),n(V)}let te={...C,onCardClick:Q,onChildClick:ae,onFromChipClick:ae,get policy(){return R()}};function le(F){let V=F.target,_e=e.querySelector(".board-filter__labels");V&&_e&&_e.contains(V)||K()}function ve(F){F.key==="Escape"&&K()}function I(){ee||(ee=!0,document.addEventListener("mousedown",le),document.addEventListener("keydown",ve),Qe())}function K(){ee&&(ee=!1,document.removeEventListener("mousedown",le),document.removeEventListener("keydown",ve),Qe())}function pe(F){F.key==="Escape"&&Le()}function Re(){y||(y=!0,document.addEventListener("keydown",pe),Qe())}function Le(){y&&(y=!1,document.removeEventListener("keydown",pe),Qe())}let Me={onClose:Le,onOverlayClick(F){F.target===F.currentTarget&&Le()}},tt={onSearchInput(F){J.search=String(F.target.value||""),fe()},onPriorityChange(F){J.priority=String(F.target.value||""),fe()},onTypeChange(F){J.type=String(F.target.value||""),fe()},onSortChange(F){let V=String(F.target.value||"");if(!(!si.has(V)||V===T)){T=V;try{window.localStorage.setItem(ni,V)}catch{}fe()}},onDeferredToggle(){y?Le():Re()},onLabelMenuToggle(){ee?K():I()},onLabelToggle(F){let V=J.labels.indexOf(F);V===-1?J.labels.push(F):J.labels.splice(V,1),fe()},onLabelClear(){J.labels.length!==0&&(J.labels=[],fe())},onNewIssue(){f&&f()}};function Ye(){return i`
      <div class="board-view">
        ${ri(J,tt,{sort_mode:T,deferred_popup_open:y,deferred_count:k,label_options:We(),label_menu_open:ee})}
        <div class="board-root">
          ${Ur({title:"Blocked",id:"blocked-col",items:Ne(x)},C)}
          ${Ur({title:"Ready",id:"ready-col",items:Ne(L)},C)}
          ${Ur({title:"In progress",id:"in-progress-col",items:Ne(q)},C)}
          ${Ur({title:"Resolved",id:"resolved-col",items:Ne(S)},C)}
          ${Ur({title:"Closed",id:"closed-col",items:Ne(Z),is_closed:!0,closed_range:_},C)}
        </div>
        ${y?ti({items:Ne(B),count:k},te,Me):""}
      </div>
    `}function Qe(){Fe(Ye(),e),At()}function At(){try{let F=e.querySelector("#deferred-popup");F&&!F.open&&(typeof F.showModal=="function"?F.showModal():F.setAttribute("open",""));let V=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let _e of V)Array.from(_e.querySelectorAll(".board-card")).forEach((we,Ae)=>{we.tabIndex=Ae===0?0:-1})}catch{}}async function Tt(F,V){if(!o){re("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:F,status:V}),re("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(_e){r("update-status failed: %o",_e),re("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function lt(F){switch(F){case"blocked-col":return x;case"ready-col":return L;case"in-progress-col":return q;case"resolved-col":return S;default:return[]}}function yt(F,V,_e){if(!o||!a)return;let G=lt(F),we=G.find(ze=>ze.id===V);if(!we)return;let Ae=G.filter(ze=>ze.id!==V),qe=_e.closest?_e.closest(".board-card"):null,Xe=Ae.length;if(qe){let ze=qe.getAttribute("data-issue-id");if(ze===V)return;let $e=Ae.findIndex(ct=>ct.id===ze);$e>=0&&(Xe=$e)}let ye=Ae.slice();ye.splice(Xe,0,we),A.applyReorder(V,ye,Xe)}function $t(){for(let F of Array.from(e.querySelectorAll(".board-column--drag-over")))F.classList.remove("board-column--drag-over")}let rt=null;e.addEventListener("dragover",F=>{F.preventDefault(),F.dataTransfer&&(F.dataTransfer.dropEffect="move");let _e=F.target.closest(".board-column");_e&&_e!==rt&&(rt&&rt.classList.remove("board-column--drag-over"),_e.classList.add("board-column--drag-over"),rt=_e)}),e.addEventListener("dragleave",F=>{let V=F.relatedTarget;(!V||!e.contains(V))&&rt&&(rt.classList.remove("board-column--drag-over"),rt=null)}),e.addEventListener("drop",F=>{F.preventDefault(),rt&&(rt.classList.remove("board-column--drag-over"),rt=null);let V=F.target,_e=V.closest(".board-column");if(!_e)return;let G=F.dataTransfer?.getData("text/plain")||"";if(!G)return;let we=_e.id,Ae=Y.get(G);if(Ae&&Ae===we){if(Fd.has(we)){if(T!=="manual"){re("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}yt(we,G,V)}return}let qe=Nd[we];if(!qe){re("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}X.get(G)!==qe&&Tt(G,qe)}),e.addEventListener("keydown",F=>{let V=F.target;if(!(V instanceof HTMLElement))return;let _e=String(V.tagName||"").toLowerCase();if(_e==="input"||_e==="textarea"||_e==="select"||_e==="button"||_e==="a"||V.isContentEditable===!0)return;let G=V.closest(".board-card");if(!G)return;let we=String(F.key||"");if(we==="Enter"||we===" "){F.preventDefault();let ye=G.getAttribute("data-issue-id");ye&&n(ye);return}if(we!=="ArrowUp"&&we!=="ArrowDown"&&we!=="ArrowLeft"&&we!=="ArrowRight")return;F.preventDefault();let Ae=G.closest(".board-column");if(!Ae)return;let qe=Array.from(Ae.querySelectorAll(".board-card")),Xe=qe.indexOf(G);if(we==="ArrowDown"&&Xe<qe.length-1){ot(G,qe[Xe+1]);return}if(we==="ArrowUp"&&Xe>0){ot(G,qe[Xe-1]);return}if(we==="ArrowLeft"||we==="ArrowRight"){let ye=Array.from(e.querySelectorAll(".board-column")),ze=ye.indexOf(Ae),$e=we==="ArrowRight"?1:-1,ct=ze+$e;for(;ct>=0&&ct<ye.length;){let mt=ye[ct].querySelector(".board-card");if(mt){ot(G,mt);return}ct+=$e}}});function ot(F,V){try{F.tabIndex=-1,V.tabIndex=0,V.focus()}catch{}}let Ze=null;b&&b.subscribe&&(Ze=b.subscribe(()=>{try{fe()}catch{}}));let at=null;c&&c.subscribe&&(at=c.subscribe(()=>{try{fe()}catch{}}));let pt=null;return l&&l.subscribe&&(pt=l.subscribe(()=>{Qe()})),{async load(){r("load"),fe()},clear(){K(),Le(),Ze&&(Ze(),Ze=null),at&&(at(),at=null),pt&&(pt(),pt=null),e.replaceChildren(),x=[],L=[],q=[],S=[],B=[],Z=[],X=new Map,Y=new Map}}}function Xs(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function nn(e,t){return e.filter(r=>{let n=Xs(r);return!(n&&t.has(n))})}async function Bd(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let r=!1;try{r=document.execCommand("copy")}finally{t.remove()}return r}catch{return!1}}async function Rr(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let r=document.createElement("textarea");r.value=t,r.style.position="fixed",r.style.left="-9999px",document.body.appendChild(r),r.select();let n=!1;try{n=document.execCommand("copy")}finally{r.remove()}return n}catch{return!1}}function Kt(e){return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,e.speed==="fast"?"Fast":null].filter(Boolean).join(" \xB7 ")}function gr(e){return typeof e.resumed_from!="string"||e.resumed_from.length===0?null:`${e.continuation_mode==="session"?"session \uC774\uC5B4\uBC1B\uC74C":e.continuation_mode==="fresh"?"\uC0C8 session\uC73C\uB85C \uC774\uC5B4\uBC1B\uC74C":"\uC774\uC804 attempt\uC5D0\uC11C \uC774\uC5B4\uBC1B\uC74C"} (from ${e.resumed_from})`}function Ud(e,t=document){let r=t.createElement("dialog");r.className="continuation-dialog";let n=t.createElement("button"),s=t.createElement("button"),o=t.createElement("button"),a=t.createElement("h2"),c=t.createElement("p");return a.textContent="\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4",c.textContent=`${Kt(e.prior||{})||"\uC774\uC804 \uC124\uC815"} \u2192 ${Kt(e.current||{})||"\uD604\uC7AC \uC124\uC815"}`,n.type="button",n.textContent="\uAE30\uC874 session \uC774\uC5B4\uD558\uAE30",n.disabled=e.prior_available===!1,s.type="button",s.textContent="\uD604\uC7AC preset\uC73C\uB85C \uC0C8 session",o.type="button",o.textContent="\uCDE8\uC18C",r.append(a,c,n,s,o),t.body.append(r),new Promise(l=>{let u=f=>{typeof r.close=="function"&&r.close(),r.remove(),l(f)};n.addEventListener("click",()=>u("prior_session")),s.addEventListener("click",()=>u("fresh_current")),o.addEventListener("click",()=>u(null)),r.addEventListener("cancel",f=>{f.preventDefault(),u(null)}),typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")})}async function sr(e,t,r={}){let n=e;for(r.onResult?.(n);n?.continuation_mismatch;){let s=n.continuation_mismatch,o=await Ud(s);if(o===null)return n;n=await t(o,s.decision_token),r.onResult?.(n),n?.conflict&&r.refresh&&(n=await r.refresh(n),r.onResult?.(n))}return n}var di="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function ut(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var or=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],sn=[...or,"reasoning_output_tokens"],jd=["implementation","review-consult"];function Qs(e){let t=0;for(let r of or)t+=ut(e?.[r]);return t}function Wd(e){return!e||typeof e!="object"?!1:or.some(t=>Number.isFinite(e[t]))}function ai(e){return!e||typeof e!="object"?!1:sn.some(t=>Number.isFinite(e[t]))}function zd(e){let t={};for(let r of sn)e&&Number.isFinite(e[r])&&(t[r]=e[r]);return t}function ii(e){let t={};for(let r of sn)Number.isFinite(e[r])&&(t[r]=e[r]);return e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function li(e,t){return e==="codex"?ut(t.input_tokens)+ut(t.output_tokens):Qs(t)}function Hd(e){return e==="claude"?"Claude":"Codex"}function Gd(e){return`\u03C4 ${ui(e)}`}function Vd(e,t){let r=t.breakdown||{},n=[`\uC785\uB825 ${ut(r.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${ut(r.output_tokens).toLocaleString("en-US")}`];e==="claude"?n.push(`\uCE90\uC2DC\uC77D\uAE30 ${ut(r.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${ut(r.cache_creation_input_tokens).toLocaleString("en-US")}`):(n.push(`\uCE90\uC2DC\uC77D\uAE30 ${ut(r.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${ut(r.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(r.reasoning_output_tokens)&&n.push(`\uCD94\uB860\uCD9C\uB825 ${ut(r.reasoning_output_tokens).toLocaleString("en-US")}`));let o=[e==="claude"?"Claude subtotal = \uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"Codex subtotal = \uC785\uB825 + \uCD9C\uB825; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset",`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,n.join(" \xB7 ")];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&o.push(`$${t.total_cost_usd.toFixed(2)}`),t.replayed&&o.push(di),o.join(`
`)}function _t(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let r of["claude","codex"]){let n=e.providers[r];n&&t.push({provider:r,label:`${Hd(r)} ${Gd(n.subtotal)}${typeof n.total_cost_usd=="number"&&Number.isFinite(n.total_cost_usd)?` \xB7 $${n.total_cost_usd.toFixed(2)}`:""}`,tooltip:Vd(r,n)})}return t}function Jn(e){let t={},r={claude:!0,codex:!1},n={claude:0,codex:0};for(let s of e)if(!(!s||!s.providers))for(let o of["claude","codex"]){let a=s.providers[o];if(!a)continue;let c=t[o];c||(c={subtotal:0,breakdown:{}},t[o]=c),c.subtotal+=a.subtotal;for(let l of sn)Number.isFinite(a.breakdown[l])&&(c.breakdown[l]=ut(c.breakdown[l])+ut(a.breakdown[l]));a.replayed&&(c.replayed=!0),o==="claude"&&(typeof a.total_cost_usd=="number"&&Number.isFinite(a.total_cost_usd)?n.claude+=a.total_cost_usd:r.claude=!1)}return t.claude&&r.claude&&(t.claude.total_cost_usd=n.claude),Object.keys(t).length===0?null:{providers:t,roles:{}}}function Js(e){return!e||typeof e!="object"?null:Lt({attempt:{...e,bead_id:"__attempt__"}},"__attempt__")}function Yd(e){return e==="codex"?"codex":"claude"}function hr(){return{subtotal:0,breakdown:zd(null),legs:[],replayed:!1,outer_count:0,outer_cost:0,outer_cost_count:0}}function Qn(e,t,r){e.subtotal+=t.subtotal;for(let n of sn)Number.isFinite(t.usage[n])&&(e.breakdown[n]=ut(e.breakdown[n])+ut(t.usage[n]));e.legs.push(t),t.replayed===!0&&(e.replayed=!0),r&&(e.outer_count+=1,typeof t.usage.total_cost_usd=="number"&&Number.isFinite(t.usage.total_cost_usd)&&(e.outer_cost+=t.usage.total_cost_usd,e.outer_cost_count+=1))}function ci(e,t){let r={subtotal:e.subtotal,breakdown:e.breakdown};return t&&(r.legs=e.legs),e.replayed&&(r.replayed=!0),r}function ui(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function jr(e){return Wd(e)?`\u03C4 ${ui(Qs(e))}`:null}function qt(e){let t=jr(e);if(!t)return null;let r=e?.total_cost_usd;return typeof r=="number"&&Number.isFinite(r)?`${t} \xB7 $${r.toFixed(2)}`:t}function Wr(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${ut(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${ut(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${ut(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${ut(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let r=[`\uCD1D ${Qs(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&r.push(di),r.join(`
`)}function Lt(e,t){let r={claude:hr(),codex:hr()},n={orchestrator:{claude:hr(),codex:hr()},implementation:{claude:hr(),codex:hr()},"review-consult":{claude:hr(),codex:hr()}},s=new Set;for(let c of Object.values(e||{})){if(!c||c.bead_id!==t)continue;let l=c.usage;if(ai(l)){let f=Yd(c.runner),_=ii(l),b={provider:f,role:"orchestrator",attempt_id:String(c.attempt_id||""),usage:_,subtotal:li(f,_)};_.replayed===!0&&(b.replayed=!0),typeof c.model=="string"&&(b.model=c.model),typeof c.session_id=="string"&&(b.session_id=c.session_id),Qn(r[f],b,!0),Qn(n.orchestrator[f],b,!0)}let u=Array.isArray(c.usage_legs)?c.usage_legs:[];for(let f of u){if(!f||f.provider!=="codex"||!jd.includes(f.role)||!ai(f.usage))continue;let _=typeof f.receipt_id=="string"&&f.receipt_id.length>0?f.receipt_id:null;if(!_||s.has(_))continue;s.add(_);let b=ii(f.usage),A={provider:"codex",role:f.role,attempt_id:String(c.attempt_id||""),usage:b,subtotal:li("codex",b)};A.receipt_id=_,typeof f.model=="string"&&(A.model=f.model),typeof f.session_id=="string"?A.session_id=f.session_id:typeof f.thread_id=="string"&&(A.session_id=f.thread_id),typeof f.turn_id=="string"&&(A.turn_id=f.turn_id),typeof f.completed_at=="string"&&(A.completed_at=f.completed_at),b.replayed===!0&&(A.replayed=!0),Qn(r.codex,A,!1),Qn(n[A.role].codex,A,!1)}}let o={};for(let c of["claude","codex"]){let l=r[c];if(l.legs.length===0)continue;let u=ci(l,!1);c==="claude"&&l.outer_count>0&&l.outer_cost_count===l.outer_count&&(u.total_cost_usd=l.outer_cost),o[c]=u}if(Object.keys(o).length===0)return null;let a={};for(let c of["orchestrator","implementation","review-consult"]){let l={};for(let u of["claude","codex"]){let f=n[c][u];f.legs.length>0&&(l[u]={...ci(f,!0),legs:f.legs})}Object.keys(l).length>0&&(a[c]=l)}return{providers:o,roles:a}}var{entries:wi,setPrototypeOf:pi,isFrozen:Kd,getPrototypeOf:Zd,getOwnPropertyDescriptor:Xd}=Object,{freeze:bt,seal:Ot,create:ao}=Object,{apply:io,construct:lo}=typeof Reflect<"u"&&Reflect;bt||(bt=function(t){return t});Ot||(Ot=function(t){return t});io||(io=function(t,r){for(var n=arguments.length,s=new Array(n>2?n-2:0),o=2;o<n;o++)s[o-2]=arguments[o];return t.apply(r,s)});lo||(lo=function(t){for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return new t(...n)});var es=vt(Array.prototype.forEach),Qd=vt(Array.prototype.lastIndexOf),fi=vt(Array.prototype.pop),on=vt(Array.prototype.push),Jd=vt(Array.prototype.splice),rs=vt(String.prototype.toLowerCase),eo=vt(String.prototype.toString),to=vt(String.prototype.match),an=vt(String.prototype.replace),eu=vt(String.prototype.indexOf),tu=vt(String.prototype.trim),Bt=vt(Object.prototype.hasOwnProperty),ht=vt(RegExp.prototype.test),ln=ru(TypeError);function vt(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return io(e,t,n)}}function ru(e){return function(){for(var t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];return lo(e,r)}}function De(e,t){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:rs;pi&&pi(e,null);let n=t.length;for(;n--;){let s=t[n];if(typeof s=="string"){let o=r(s);o!==s&&(Kd(t)||(t[n]=o),s=o)}e[s]=!0}return e}function nu(e){for(let t=0;t<e.length;t++)Bt(e,t)||(e[t]=null);return e}function ar(e){let t=ao(null);for(let[r,n]of wi(e))Bt(e,r)&&(Array.isArray(n)?t[r]=nu(n):n&&typeof n=="object"&&n.constructor===Object?t[r]=ar(n):t[r]=n);return t}function cn(e,t){for(;e!==null;){let n=Xd(e,t);if(n){if(n.get)return vt(n.get);if(typeof n.value=="function")return vt(n.value)}e=Zd(e)}function r(){return null}return r}var _i=bt(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),ro=bt(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),no=bt(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),su=bt(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),so=bt(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),ou=bt(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),mi=bt(["#text"]),gi=bt(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),oo=bt(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),hi=bt(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),ts=bt(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),au=Ot(/\{\{[\w\W]*|[\w\W]*\}\}/gm),iu=Ot(/<%[\w\W]*|[\w\W]*%>/gm),lu=Ot(/\$\{[\w\W]*/gm),cu=Ot(/^data-[\-\w.\u00B7-\uFFFF]+$/),du=Ot(/^aria-[\-\w]+$/),yi=Ot(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),uu=Ot(/^(?:\w+script|data):/i),pu=Ot(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),ki=Ot(/^html$/i),fu=Ot(/^[a-z][.\w]*(-[.\w]+)+$/i),bi=Object.freeze({__proto__:null,ARIA_ATTR:du,ATTR_WHITESPACE:pu,CUSTOM_ELEMENT:fu,DATA_ATTR:cu,DOCTYPE_NAME:ki,ERB_EXPR:iu,IS_ALLOWED_URI:yi,IS_SCRIPT_OR_DATA:uu,MUSTACHE_EXPR:au,TMPLIT_EXPR:lu}),dn={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},_u=function(){return typeof window>"u"?null:window},mu=function(t,r){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let n=null,s="data-tt-policy-suffix";r&&r.hasAttribute(s)&&(n=r.getAttribute(s));let o="dompurify"+(n?"#"+n:"");try{return t.createPolicy(o,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},vi=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function $i(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:_u(),t=j=>$i(j);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==dn.document||!e.Element)return t.isSupported=!1,t;let{document:r}=e,n=r,s=n.currentScript,{DocumentFragment:o,HTMLTemplateElement:a,Node:c,Element:l,NodeFilter:u,NamedNodeMap:f=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:_,DOMParser:b,trustedTypes:A}=e,x=l.prototype,L=cn(x,"cloneNode"),q=cn(x,"remove"),S=cn(x,"nextSibling"),B=cn(x,"childNodes"),Z=cn(x,"parentNode");if(typeof a=="function"){let j=r.createElement("template");j.content&&j.content.ownerDocument&&(r=j.content.ownerDocument)}let y,k="",{implementation:T,createNodeIterator:X,createDocumentFragment:Y,getElementsByTagName:ne}=r,{importNode:be}=n,J=vi();t.isSupported=typeof wi=="function"&&typeof Z=="function"&&T&&T.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:ee,ERB_EXPR:Ee,TMPLIT_EXPR:je,DATA_ATTR:et,ARIA_ATTR:Ne,IS_SCRIPT_OR_DATA:We,ATTR_WHITESPACE:Ce,CUSTOM_ELEMENT:fe}=bi,{IS_ALLOWED_URI:Se}=bi,he=null,H=De({},[..._i,...ro,...no,...so,...mi]),z=null,Ie=De({},[...gi,...oo,...hi,...ts]),ie=Object.seal(ao(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),se=null,E=null,N=Object.seal(ao(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),ue=!0,Pe=!0,R=!1,U=!0,C=!1,Q=!0,ae=!1,te=!1,le=!1,ve=!1,I=!1,K=!1,pe=!0,Re=!1,Le="user-content-",Me=!0,tt=!1,Ye={},Qe=null,At=De({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),Tt=null,lt=De({},["audio","video","img","source","image","track"]),yt=null,$t=De({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),rt="http://www.w3.org/1998/Math/MathML",ot="http://www.w3.org/2000/svg",Ze="http://www.w3.org/1999/xhtml",at=Ze,pt=!1,F=null,V=De({},[rt,ot,Ze],eo),_e=De({},["mi","mo","mn","ms","mtext"]),G=De({},["annotation-xml"]),we=De({},["title","style","font","a","script"]),Ae=null,qe=["application/xhtml+xml","text/html"],Xe="text/html",ye=null,ze=null,$e=r.createElement("form"),ct=function(g){return g instanceof RegExp||g instanceof Function},mt=function(){let g=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(ze&&ze===g)){if((!g||typeof g!="object")&&(g={}),g=ar(g),Ae=qe.indexOf(g.PARSER_MEDIA_TYPE)===-1?Xe:g.PARSER_MEDIA_TYPE,ye=Ae==="application/xhtml+xml"?eo:rs,he=Bt(g,"ALLOWED_TAGS")?De({},g.ALLOWED_TAGS,ye):H,z=Bt(g,"ALLOWED_ATTR")?De({},g.ALLOWED_ATTR,ye):Ie,F=Bt(g,"ALLOWED_NAMESPACES")?De({},g.ALLOWED_NAMESPACES,eo):V,yt=Bt(g,"ADD_URI_SAFE_ATTR")?De(ar($t),g.ADD_URI_SAFE_ATTR,ye):$t,Tt=Bt(g,"ADD_DATA_URI_TAGS")?De(ar(lt),g.ADD_DATA_URI_TAGS,ye):lt,Qe=Bt(g,"FORBID_CONTENTS")?De({},g.FORBID_CONTENTS,ye):At,se=Bt(g,"FORBID_TAGS")?De({},g.FORBID_TAGS,ye):ar({}),E=Bt(g,"FORBID_ATTR")?De({},g.FORBID_ATTR,ye):ar({}),Ye=Bt(g,"USE_PROFILES")?g.USE_PROFILES:!1,ue=g.ALLOW_ARIA_ATTR!==!1,Pe=g.ALLOW_DATA_ATTR!==!1,R=g.ALLOW_UNKNOWN_PROTOCOLS||!1,U=g.ALLOW_SELF_CLOSE_IN_ATTR!==!1,C=g.SAFE_FOR_TEMPLATES||!1,Q=g.SAFE_FOR_XML!==!1,ae=g.WHOLE_DOCUMENT||!1,ve=g.RETURN_DOM||!1,I=g.RETURN_DOM_FRAGMENT||!1,K=g.RETURN_TRUSTED_TYPE||!1,le=g.FORCE_BODY||!1,pe=g.SANITIZE_DOM!==!1,Re=g.SANITIZE_NAMED_PROPS||!1,Me=g.KEEP_CONTENT!==!1,tt=g.IN_PLACE||!1,Se=g.ALLOWED_URI_REGEXP||yi,at=g.NAMESPACE||Ze,_e=g.MATHML_TEXT_INTEGRATION_POINTS||_e,G=g.HTML_INTEGRATION_POINTS||G,ie=g.CUSTOM_ELEMENT_HANDLING||{},g.CUSTOM_ELEMENT_HANDLING&&ct(g.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(ie.tagNameCheck=g.CUSTOM_ELEMENT_HANDLING.tagNameCheck),g.CUSTOM_ELEMENT_HANDLING&&ct(g.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(ie.attributeNameCheck=g.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),g.CUSTOM_ELEMENT_HANDLING&&typeof g.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(ie.allowCustomizedBuiltInElements=g.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),C&&(Pe=!1),I&&(ve=!0),Ye&&(he=De({},mi),z=[],Ye.html===!0&&(De(he,_i),De(z,gi)),Ye.svg===!0&&(De(he,ro),De(z,oo),De(z,ts)),Ye.svgFilters===!0&&(De(he,no),De(z,oo),De(z,ts)),Ye.mathMl===!0&&(De(he,so),De(z,hi),De(z,ts))),g.ADD_TAGS&&(typeof g.ADD_TAGS=="function"?N.tagCheck=g.ADD_TAGS:(he===H&&(he=ar(he)),De(he,g.ADD_TAGS,ye))),g.ADD_ATTR&&(typeof g.ADD_ATTR=="function"?N.attributeCheck=g.ADD_ATTR:(z===Ie&&(z=ar(z)),De(z,g.ADD_ATTR,ye))),g.ADD_URI_SAFE_ATTR&&De(yt,g.ADD_URI_SAFE_ATTR,ye),g.FORBID_CONTENTS&&(Qe===At&&(Qe=ar(Qe)),De(Qe,g.FORBID_CONTENTS,ye)),Me&&(he["#text"]=!0),ae&&De(he,["html","head","body"]),he.table&&(De(he,["tbody"]),delete se.tbody),g.TRUSTED_TYPES_POLICY){if(typeof g.TRUSTED_TYPES_POLICY.createHTML!="function")throw ln('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof g.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw ln('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');y=g.TRUSTED_TYPES_POLICY,k=y.createHTML("")}else y===void 0&&(y=mu(A,s)),y!==null&&typeof k=="string"&&(k=y.createHTML(""));bt&&bt(g),ze=g}},Ht=De({},[...ro,...no,...su]),Qt=De({},[...so,...ou]),Jt=function(g){let P=Z(g);(!P||!P.tagName)&&(P={namespaceURI:at,tagName:"template"});let W=rs(g.tagName),xe=rs(P.tagName);return F[g.namespaceURI]?g.namespaceURI===ot?P.namespaceURI===Ze?W==="svg":P.namespaceURI===rt?W==="svg"&&(xe==="annotation-xml"||_e[xe]):!!Ht[W]:g.namespaceURI===rt?P.namespaceURI===Ze?W==="math":P.namespaceURI===ot?W==="math"&&G[xe]:!!Qt[W]:g.namespaceURI===Ze?P.namespaceURI===ot&&!G[xe]||P.namespaceURI===rt&&!_e[xe]?!1:!Qt[W]&&(we[W]||!Ht[W]):!!(Ae==="application/xhtml+xml"&&F[g.namespaceURI]):!1},ft=function(g){on(t.removed,{element:g});try{Z(g).removeChild(g)}catch{q(g)}},gt=function(g,P){try{on(t.removed,{attribute:P.getAttributeNode(g),from:P})}catch{on(t.removed,{attribute:null,from:P})}if(P.removeAttribute(g),g==="is")if(ve||I)try{ft(P)}catch{}else try{P.setAttribute(g,"")}catch{}},Mt=function(g){let P=null,W=null;if(le)g="<remove></remove>"+g;else{let Be=to(g,/^[\r\n\t ]+/);W=Be&&Be[0]}Ae==="application/xhtml+xml"&&at===Ze&&(g='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+g+"</body></html>");let xe=y?y.createHTML(g):g;if(at===Ze)try{P=new b().parseFromString(xe,Ae)}catch{}if(!P||!P.documentElement){P=T.createDocument(at,"template",null);try{P.documentElement.innerHTML=pt?k:xe}catch{}}let Ge=P.body||P.documentElement;return g&&W&&Ge.insertBefore(r.createTextNode(W),Ge.childNodes[0]||null),at===Ze?ne.call(P,ae?"html":"body")[0]:ae?P.documentElement:Ge},Gt=function(g){return X.call(g.ownerDocument||g,g,u.SHOW_ELEMENT|u.SHOW_COMMENT|u.SHOW_TEXT|u.SHOW_PROCESSING_INSTRUCTION|u.SHOW_CDATA_SECTION,null)},Et=function(g){return g instanceof _&&(typeof g.nodeName!="string"||typeof g.textContent!="string"||typeof g.removeChild!="function"||!(g.attributes instanceof f)||typeof g.removeAttribute!="function"||typeof g.setAttribute!="function"||typeof g.namespaceURI!="string"||typeof g.insertBefore!="function"||typeof g.hasChildNodes!="function")},er=function(g){return typeof c=="function"&&g instanceof c};function Te(j,g,P){es(j,W=>{W.call(t,g,P,ze)})}let p=function(g){let P=null;if(Te(J.beforeSanitizeElements,g,null),Et(g))return ft(g),!0;let W=ye(g.nodeName);if(Te(J.uponSanitizeElement,g,{tagName:W,allowedTags:he}),Q&&g.hasChildNodes()&&!er(g.firstElementChild)&&ht(/<[/\w!]/g,g.innerHTML)&&ht(/<[/\w!]/g,g.textContent)||g.nodeType===dn.progressingInstruction||Q&&g.nodeType===dn.comment&&ht(/<[/\w]/g,g.data))return ft(g),!0;if(!(N.tagCheck instanceof Function&&N.tagCheck(W))&&(!he[W]||se[W])){if(!se[W]&&O(W)&&(ie.tagNameCheck instanceof RegExp&&ht(ie.tagNameCheck,W)||ie.tagNameCheck instanceof Function&&ie.tagNameCheck(W)))return!1;if(Me&&!Qe[W]){let xe=Z(g)||g.parentNode,Ge=B(g)||g.childNodes;if(Ge&&xe){let Be=Ge.length;for(let m=Be-1;m>=0;--m){let d=L(Ge[m],!0);d.__removalCount=(g.__removalCount||0)+1,xe.insertBefore(d,S(g))}}}return ft(g),!0}return g instanceof l&&!Jt(g)||(W==="noscript"||W==="noembed"||W==="noframes")&&ht(/<\/no(script|embed|frames)/i,g.innerHTML)?(ft(g),!0):(C&&g.nodeType===dn.text&&(P=g.textContent,es([ee,Ee,je],xe=>{P=an(P,xe," ")}),g.textContent!==P&&(on(t.removed,{element:g.cloneNode()}),g.textContent=P)),Te(J.afterSanitizeElements,g,null),!1)},v=function(g,P,W){if(pe&&(P==="id"||P==="name")&&(W in r||W in $e))return!1;if(!(Pe&&!E[P]&&ht(et,P))){if(!(ue&&ht(Ne,P))){if(!(N.attributeCheck instanceof Function&&N.attributeCheck(P,g))){if(!z[P]||E[P]){if(!(O(g)&&(ie.tagNameCheck instanceof RegExp&&ht(ie.tagNameCheck,g)||ie.tagNameCheck instanceof Function&&ie.tagNameCheck(g))&&(ie.attributeNameCheck instanceof RegExp&&ht(ie.attributeNameCheck,P)||ie.attributeNameCheck instanceof Function&&ie.attributeNameCheck(P,g))||P==="is"&&ie.allowCustomizedBuiltInElements&&(ie.tagNameCheck instanceof RegExp&&ht(ie.tagNameCheck,W)||ie.tagNameCheck instanceof Function&&ie.tagNameCheck(W))))return!1}else if(!yt[P]){if(!ht(Se,an(W,Ce,""))){if(!((P==="src"||P==="xlink:href"||P==="href")&&g!=="script"&&eu(W,"data:")===0&&Tt[g])){if(!(R&&!ht(We,an(W,Ce,"")))){if(W)return!1}}}}}}}return!0},O=function(g){return g!=="annotation-xml"&&to(g,fe)},ce=function(g){Te(J.beforeSanitizeAttributes,g,null);let{attributes:P}=g;if(!P||Et(g))return;let W={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:z,forceKeepAttr:void 0},xe=P.length;for(;xe--;){let Ge=P[xe],{name:Be,namespaceURI:m,value:d}=Ge,$=ye(Be),w=d,M=Be==="value"?w:tu(w);if(W.attrName=$,W.attrValue=M,W.keepAttr=!0,W.forceKeepAttr=void 0,Te(J.uponSanitizeAttribute,g,W),M=W.attrValue,Re&&($==="id"||$==="name")&&(gt(Be,g),M=Le+M),Q&&ht(/((--!?|])>)|<\/(style|title|textarea)/i,M)){gt(Be,g);continue}if($==="attributename"&&to(M,"href")){gt(Be,g);continue}if(W.forceKeepAttr)continue;if(!W.keepAttr){gt(Be,g);continue}if(!U&&ht(/\/>/i,M)){gt(Be,g);continue}C&&es([ee,Ee,je],ke=>{M=an(M,ke," ")});let de=ye(g.nodeName);if(!v(de,$,M)){gt(Be,g);continue}if(y&&typeof A=="object"&&typeof A.getAttributeType=="function"&&!m)switch(A.getAttributeType(de,$)){case"TrustedHTML":{M=y.createHTML(M);break}case"TrustedScriptURL":{M=y.createScriptURL(M);break}}if(M!==w)try{m?g.setAttributeNS(m,Be,M):g.setAttribute(Be,M),Et(g)?ft(g):fi(t.removed)}catch{gt(Be,g)}}Te(J.afterSanitizeAttributes,g,null)},ge=function j(g){let P=null,W=Gt(g);for(Te(J.beforeSanitizeShadowDOM,g,null);P=W.nextNode();)Te(J.uponSanitizeShadowNode,P,null),p(P),ce(P),P.content instanceof o&&j(P.content);Te(J.afterSanitizeShadowDOM,g,null)};return t.sanitize=function(j){let g=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},P=null,W=null,xe=null,Ge=null;if(pt=!j,pt&&(j="<!-->"),typeof j!="string"&&!er(j))if(typeof j.toString=="function"){if(j=j.toString(),typeof j!="string")throw ln("dirty is not a string, aborting")}else throw ln("toString is not a function");if(!t.isSupported)return j;if(te||mt(g),t.removed=[],typeof j=="string"&&(tt=!1),tt){if(j.nodeName){let d=ye(j.nodeName);if(!he[d]||se[d])throw ln("root node is forbidden and cannot be sanitized in-place")}}else if(j instanceof c)P=Mt("<!---->"),W=P.ownerDocument.importNode(j,!0),W.nodeType===dn.element&&W.nodeName==="BODY"||W.nodeName==="HTML"?P=W:P.appendChild(W);else{if(!ve&&!C&&!ae&&j.indexOf("<")===-1)return y&&K?y.createHTML(j):j;if(P=Mt(j),!P)return ve?null:K?k:""}P&&le&&ft(P.firstChild);let Be=Gt(tt?j:P);for(;xe=Be.nextNode();)p(xe),ce(xe),xe.content instanceof o&&ge(xe.content);if(tt)return j;if(ve){if(I)for(Ge=Y.call(P.ownerDocument);P.firstChild;)Ge.appendChild(P.firstChild);else Ge=P;return(z.shadowroot||z.shadowrootmode)&&(Ge=be.call(n,Ge,!0)),Ge}let m=ae?P.outerHTML:P.innerHTML;return ae&&he["!doctype"]&&P.ownerDocument&&P.ownerDocument.doctype&&P.ownerDocument.doctype.name&&ht(ki,P.ownerDocument.doctype.name)&&(m="<!DOCTYPE "+P.ownerDocument.doctype.name+`>
`+m),C&&es([ee,Ee,je],d=>{m=an(m,d," ")}),y&&K?y.createHTML(m):m},t.setConfig=function(){let j=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};mt(j),te=!0},t.clearConfig=function(){ze=null,te=!1},t.isValidAttribute=function(j,g,P){ze||mt({});let W=ye(j),xe=ye(g);return v(W,xe,P)},t.addHook=function(j,g){typeof g=="function"&&on(J[j],g)},t.removeHook=function(j,g){if(g!==void 0){let P=Qd(J[j],g);return P===-1?void 0:Jd(J[j],P,1)[0]}return fi(J[j])},t.removeHooks=function(j){J[j]=[]},t.removeAllHooks=function(){J=vi()},t}var xi=$i();var ir={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},ns=e=>(...t)=>({_$litDirective$:e,values:t}),zr=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,r,n){this._$Ct=t,this._$AM=r,this._$Ci=n}_$AS(t,r){return this.update(t,r)}update(t,r){return this.render(...r)}};var un=class extends zr{constructor(t){if(super(t),this.it=st,t.type!==ir.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===st||t==null)return this._t=void 0,this.it=t;if(t===Rt)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let r=[t];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}};un.directiveName="unsafeHTML",un.resultType=1;var Si=ns(un);function fo(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Lr=fo();function Li(e){Lr=e}var mn={exec:()=>null};function Ue(e,t=""){let r=typeof e=="string"?e:e.source,n={replace:(s,o)=>{let a=typeof o=="string"?o:o.source;return a=a.replace(wt.caret,"$1"),r=r.replace(s,a),n},getRegex:()=>new RegExp(r,t)};return n}var gu=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),wt={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},hu=/^(?:[ \t]*(?:\n|$))+/,bu=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,vu=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,gn=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,wu=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,_o=/(?:[*+-]|\d{1,9}[.)])/,Oi=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Di=Ue(Oi).replace(/bull/g,_o).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),yu=Ue(Oi).replace(/bull/g,_o).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),mo=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,ku=/^[^\n]+/,go=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,$u=Ue(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",go).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),xu=Ue(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,_o).getRegex(),cs="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",ho=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Su=Ue("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",ho).replace("tag",cs).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Pi=Ue(mo).replace("hr",gn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",cs).getRegex(),Au=Ue(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Pi).getRegex(),bo={blockquote:Au,code:bu,def:$u,fences:vu,heading:wu,hr:gn,html:Su,lheading:Di,list:xu,newline:hu,paragraph:Pi,table:mn,text:ku},Ai=Ue("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",gn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",cs).getRegex(),Tu={...bo,lheading:yu,table:Ai,paragraph:Ue(mo).replace("hr",gn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Ai).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",cs).getRegex()},Eu={...bo,html:Ue(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",ho).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:mn,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:Ue(mo).replace("hr",gn).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Di).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Cu=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Ru=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Mi=/^( {2,}|\\)\n(?!\s*$)/,Iu=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,ds=/[\p{P}\p{S}]/u,vo=/[\s\p{P}\p{S}]/u,Ni=/[^\s\p{P}\p{S}]/u,Lu=Ue(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,vo).getRegex(),Fi=/(?!~)[\p{P}\p{S}]/u,Ou=/(?!~)[\s\p{P}\p{S}]/u,Du=/(?:[^\s\p{P}\p{S}]|~)/u,Pu=Ue(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",gu?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),qi=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,Mu=Ue(qi,"u").replace(/punct/g,ds).getRegex(),Nu=Ue(qi,"u").replace(/punct/g,Fi).getRegex(),Bi="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Fu=Ue(Bi,"gu").replace(/notPunctSpace/g,Ni).replace(/punctSpace/g,vo).replace(/punct/g,ds).getRegex(),qu=Ue(Bi,"gu").replace(/notPunctSpace/g,Du).replace(/punctSpace/g,Ou).replace(/punct/g,Fi).getRegex(),Bu=Ue("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,Ni).replace(/punctSpace/g,vo).replace(/punct/g,ds).getRegex(),Uu=Ue(/\\(punct)/,"gu").replace(/punct/g,ds).getRegex(),ju=Ue(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Wu=Ue(ho).replace("(?:-->|$)","-->").getRegex(),zu=Ue("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Wu).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),as=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,Hu=Ue(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",as).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Ui=Ue(/^!?\[(label)\]\[(ref)\]/).replace("label",as).replace("ref",go).getRegex(),ji=Ue(/^!?\[(ref)\](?:\[\])?/).replace("ref",go).getRegex(),Gu=Ue("reflink|nolink(?!\\()","g").replace("reflink",Ui).replace("nolink",ji).getRegex(),Ti=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,wo={_backpedal:mn,anyPunctuation:Uu,autolink:ju,blockSkip:Pu,br:Mi,code:Ru,del:mn,emStrongLDelim:Mu,emStrongRDelimAst:Fu,emStrongRDelimUnd:Bu,escape:Cu,link:Hu,nolink:ji,punctuation:Lu,reflink:Ui,reflinkSearch:Gu,tag:zu,text:Iu,url:mn},Vu={...wo,link:Ue(/^!?\[(label)\]\((.*?)\)/).replace("label",as).getRegex(),reflink:Ue(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",as).getRegex()},co={...wo,emStrongRDelimAst:qu,emStrongLDelim:Nu,url:Ue(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",Ti).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:Ue(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",Ti).getRegex()},Yu={...co,br:Ue(Mi).replace("{2,}","*").getRegex(),text:Ue(co.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},ss={normal:bo,gfm:Tu,pedantic:Eu},pn={normal:wo,gfm:co,breaks:Yu,pedantic:Vu},Ku={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Ei=e=>Ku[e];function lr(e,t){if(t){if(wt.escapeTest.test(e))return e.replace(wt.escapeReplace,Ei)}else if(wt.escapeTestNoEncode.test(e))return e.replace(wt.escapeReplaceNoEncode,Ei);return e}function Ci(e){try{e=encodeURI(e).replace(wt.percentDecode,"%")}catch{return null}return e}function Ri(e,t){let r=e.replace(wt.findPipe,(o,a,c)=>{let l=!1,u=a;for(;--u>=0&&c[u]==="\\";)l=!l;return l?"|":" |"}),n=r.split(wt.splitPipe),s=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),t)if(n.length>t)n.splice(t);else for(;n.length<t;)n.push("");for(;s<n.length;s++)n[s]=n[s].trim().replace(wt.slashPipe,"|");return n}function fn(e,t,r){let n=e.length;if(n===0)return"";let s=0;for(;s<n;){let o=e.charAt(n-s-1);if(o===t&&!r)s++;else if(o!==t&&r)s++;else break}return e.slice(0,n-s)}function Zu(e,t){if(e.indexOf(t[1])===-1)return-1;let r=0;for(let n=0;n<e.length;n++)if(e[n]==="\\")n++;else if(e[n]===t[0])r++;else if(e[n]===t[1]&&(r--,r<0))return n;return r>0?-2:-1}function Ii(e,t,r,n,s){let o=t.href,a=t.title||null,c=e[1].replace(s.other.outputLinkReplace,"$1");n.state.inLink=!0;let l={type:e[0].charAt(0)==="!"?"image":"link",raw:r,href:o,title:a,text:c,tokens:n.inlineTokens(c)};return n.state.inLink=!1,l}function Xu(e,t,r){let n=e.match(r.other.indentCodeCompensation);if(n===null)return t;let s=n[1];return t.split(`
`).map(o=>{let a=o.match(r.other.beginningSpace);if(a===null)return o;let[c]=a;return c.length>=s.length?o.slice(s.length):o}).join(`
`)}var is=class{constructor(e){Ke(this,"options");Ke(this,"rules");Ke(this,"lexer");this.options=e||Lr}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let r=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?r:fn(r,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let r=t[0],n=Xu(r,t[3]||"",this.rules);return{type:"code",raw:r,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:n}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let r=t[2].trim();if(this.rules.other.endingHash.test(r)){let n=fn(r,"#");(this.options.pedantic||!n||this.rules.other.endingSpaceChar.test(n))&&(r=n.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:fn(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let r=fn(t[0],`
`).split(`
`),n="",s="",o=[];for(;r.length>0;){let a=!1,c=[],l;for(l=0;l<r.length;l++)if(this.rules.other.blockquoteStart.test(r[l]))c.push(r[l]),a=!0;else if(!a)c.push(r[l]);else break;r=r.slice(l);let u=c.join(`
`),f=u.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");n=n?`${n}
${u}`:u,s=s?`${s}
${f}`:f;let _=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(f,o,!0),this.lexer.state.top=_,r.length===0)break;let b=o.at(-1);if(b?.type==="code")break;if(b?.type==="blockquote"){let A=b,x=A.raw+`
`+r.join(`
`),L=this.blockquote(x);o[o.length-1]=L,n=n.substring(0,n.length-A.raw.length)+L.raw,s=s.substring(0,s.length-A.text.length)+L.text;break}else if(b?.type==="list"){let A=b,x=A.raw+`
`+r.join(`
`),L=this.list(x);o[o.length-1]=L,n=n.substring(0,n.length-b.raw.length)+L.raw,s=s.substring(0,s.length-A.raw.length)+L.raw,r=x.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:n,tokens:o,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let r=t[1].trim(),n=r.length>1,s={type:"list",raw:"",ordered:n,start:n?+r.slice(0,-1):"",loose:!1,items:[]};r=n?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=n?r:"[*+-]");let o=this.rules.other.listItemRegex(r),a=!1;for(;e;){let l=!1,u="",f="";if(!(t=o.exec(e))||this.rules.block.hr.test(e))break;u=t[0],e=e.substring(u.length);let _=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,L=>" ".repeat(3*L.length)),b=e.split(`
`,1)[0],A=!_.trim(),x=0;if(this.options.pedantic?(x=2,f=_.trimStart()):A?x=t[1].length+1:(x=t[2].search(this.rules.other.nonSpaceChar),x=x>4?1:x,f=_.slice(x),x+=t[1].length),A&&this.rules.other.blankLine.test(b)&&(u+=b+`
`,e=e.substring(b.length+1),l=!0),!l){let L=this.rules.other.nextBulletRegex(x),q=this.rules.other.hrRegex(x),S=this.rules.other.fencesBeginRegex(x),B=this.rules.other.headingBeginRegex(x),Z=this.rules.other.htmlBeginRegex(x);for(;e;){let y=e.split(`
`,1)[0],k;if(b=y,this.options.pedantic?(b=b.replace(this.rules.other.listReplaceNesting,"  "),k=b):k=b.replace(this.rules.other.tabCharGlobal,"    "),S.test(b)||B.test(b)||Z.test(b)||L.test(b)||q.test(b))break;if(k.search(this.rules.other.nonSpaceChar)>=x||!b.trim())f+=`
`+k.slice(x);else{if(A||_.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||S.test(_)||B.test(_)||q.test(_))break;f+=`
`+b}!A&&!b.trim()&&(A=!0),u+=y+`
`,e=e.substring(y.length+1),_=k.slice(x)}}s.loose||(a?s.loose=!0:this.rules.other.doubleBlankLine.test(u)&&(a=!0)),s.items.push({type:"list_item",raw:u,task:!!this.options.gfm&&this.rules.other.listIsTask.test(f),loose:!1,text:f,tokens:[]}),s.raw+=u}let c=s.items.at(-1);if(c)c.raw=c.raw.trimEnd(),c.text=c.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let l of s.items){if(this.lexer.state.top=!1,l.tokens=this.lexer.blockTokens(l.text,[]),l.task){if(l.text=l.text.replace(this.rules.other.listReplaceTask,""),l.tokens[0]?.type==="text"||l.tokens[0]?.type==="paragraph"){l.tokens[0].raw=l.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),l.tokens[0].text=l.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let f=this.lexer.inlineQueue.length-1;f>=0;f--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[f].src)){this.lexer.inlineQueue[f].src=this.lexer.inlineQueue[f].src.replace(this.rules.other.listReplaceTask,"");break}}let u=this.rules.other.listTaskCheckbox.exec(l.raw);if(u){let f={type:"checkbox",raw:u[0]+" ",checked:u[0]!=="[ ]"};l.checked=f.checked,s.loose?l.tokens[0]&&["paragraph","text"].includes(l.tokens[0].type)&&"tokens"in l.tokens[0]&&l.tokens[0].tokens?(l.tokens[0].raw=f.raw+l.tokens[0].raw,l.tokens[0].text=f.raw+l.tokens[0].text,l.tokens[0].tokens.unshift(f)):l.tokens.unshift({type:"paragraph",raw:f.raw,text:f.raw,tokens:[f]}):l.tokens.unshift(f)}}if(!s.loose){let u=l.tokens.filter(_=>_.type==="space"),f=u.length>0&&u.some(_=>this.rules.other.anyLine.test(_.raw));s.loose=f}}if(s.loose)for(let l of s.items){l.loose=!0;for(let u of l.tokens)u.type==="text"&&(u.type="paragraph")}return s}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let r=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),n=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:r,raw:t[0],href:n,title:s}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let r=Ri(t[1]),n=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(r.length===n.length){for(let a of n)this.rules.other.tableAlignRight.test(a)?o.align.push("right"):this.rules.other.tableAlignCenter.test(a)?o.align.push("center"):this.rules.other.tableAlignLeft.test(a)?o.align.push("left"):o.align.push(null);for(let a=0;a<r.length;a++)o.header.push({text:r[a],tokens:this.lexer.inline(r[a]),header:!0,align:o.align[a]});for(let a of s)o.rows.push(Ri(a,o.header.length).map((c,l)=>({text:c,tokens:this.lexer.inline(c),header:!1,align:o.align[l]})));return o}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let r=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:r,tokens:this.lexer.inline(r)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let r=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;let o=fn(r.slice(0,-1),"\\");if((r.length-o.length)%2===0)return}else{let o=Zu(t[2],"()");if(o===-2)return;if(o>-1){let a=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,a).trim(),t[3]=""}}let n=t[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(n);o&&(n=o[1],s=o[3])}else s=t[3]?t[3].slice(1,-1):"";return n=n.trim(),this.rules.other.startAngleBracket.test(n)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?n=n.slice(1):n=n.slice(1,-1)),Ii(t,{href:n&&n.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let r;if((r=this.rules.inline.reflink.exec(e))||(r=this.rules.inline.nolink.exec(e))){let n=(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[n.toLowerCase()];if(!s){let o=r[0].charAt(0);return{type:"text",raw:o,text:o}}return Ii(r,s,r[0],this.lexer,this.rules)}}emStrong(e,t,r=""){let n=this.rules.inline.emStrongLDelim.exec(e);if(!(!n||n[3]&&r.match(this.rules.other.unicodeAlphaNumeric))&&(!(n[1]||n[2])||!r||this.rules.inline.punctuation.exec(r))){let s=[...n[0]].length-1,o,a,c=s,l=0,u=n[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(u.lastIndex=0,t=t.slice(-1*e.length+s);(n=u.exec(t))!=null;){if(o=n[1]||n[2]||n[3]||n[4]||n[5]||n[6],!o)continue;if(a=[...o].length,n[3]||n[4]){c+=a;continue}else if((n[5]||n[6])&&s%3&&!((s+a)%3)){l+=a;continue}if(c-=a,c>0)continue;a=Math.min(a,a+c+l);let f=[...n[0]][0].length,_=e.slice(0,s+n.index+f+a);if(Math.min(s,a)%2){let A=_.slice(1,-1);return{type:"em",raw:_,text:A,tokens:this.lexer.inlineTokens(A)}}let b=_.slice(2,-2);return{type:"strong",raw:_,text:b,tokens:this.lexer.inlineTokens(b)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let r=t[2].replace(this.rules.other.newLineCharGlobal," "),n=this.rules.other.nonSpaceChar.test(r),s=this.rules.other.startingSpaceChar.test(r)&&this.rules.other.endingSpaceChar.test(r);return n&&s&&(r=r.substring(1,r.length-1)),{type:"codespan",raw:t[0],text:r}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let r,n;return t[2]==="@"?(r=t[1],n="mailto:"+r):(r=t[1],n=r),{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let r,n;if(t[2]==="@")r=t[0],n="mailto:"+r;else{let s;do s=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(s!==t[0]);r=t[0],t[1]==="www."?n="http://"+t[0]:n=t[0]}return{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let r=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:r}}}},Ut=class uo{constructor(t){Ke(this,"tokens");Ke(this,"options");Ke(this,"state");Ke(this,"inlineQueue");Ke(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||Lr,this.options.tokenizer=this.options.tokenizer||new is,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let r={other:wt,block:ss.normal,inline:pn.normal};this.options.pedantic?(r.block=ss.pedantic,r.inline=pn.pedantic):this.options.gfm&&(r.block=ss.gfm,this.options.breaks?r.inline=pn.breaks:r.inline=pn.gfm),this.tokenizer.rules=r}static get rules(){return{block:ss,inline:pn}}static lex(t,r){return new uo(r).lex(t)}static lexInline(t,r){return new uo(r).inlineTokens(t)}lex(t){t=t.replace(wt.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let r=0;r<this.inlineQueue.length;r++){let n=this.inlineQueue[r];this.inlineTokens(n.src,n.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,r=[],n=!1){for(this.options.pedantic&&(t=t.replace(wt.tabCharGlobal,"    ").replace(wt.spaceLine,""));t;){let s;if(this.options.extensions?.block?.some(a=>(s=a.call({lexer:this},t,r))?(t=t.substring(s.raw.length),r.push(s),!0):!1))continue;if(s=this.tokenizer.space(t)){t=t.substring(s.raw.length);let a=r.at(-1);s.raw.length===1&&a!==void 0?a.raw+=`
`:r.push(s);continue}if(s=this.tokenizer.code(t)){t=t.substring(s.raw.length);let a=r.at(-1);a?.type==="paragraph"||a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.at(-1).src=a.text):r.push(s);continue}if(s=this.tokenizer.fences(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.heading(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.hr(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.blockquote(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.list(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.html(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.def(t)){t=t.substring(s.raw.length);let a=r.at(-1);a?.type==="paragraph"||a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.raw,this.inlineQueue.at(-1).src=a.text):this.tokens.links[s.tag]||(this.tokens.links[s.tag]={href:s.href,title:s.title},r.push(s));continue}if(s=this.tokenizer.table(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.lheading(t)){t=t.substring(s.raw.length),r.push(s);continue}let o=t;if(this.options.extensions?.startBlock){let a=1/0,c=t.slice(1),l;this.options.extensions.startBlock.forEach(u=>{l=u.call({lexer:this},c),typeof l=="number"&&l>=0&&(a=Math.min(a,l))}),a<1/0&&a>=0&&(o=t.substring(0,a+1))}if(this.state.top&&(s=this.tokenizer.paragraph(o))){let a=r.at(-1);n&&a?.type==="paragraph"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):r.push(s),n=o.length!==t.length,t=t.substring(s.raw.length);continue}if(s=this.tokenizer.text(t)){t=t.substring(s.raw.length);let a=r.at(-1);a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):r.push(s);continue}if(t){let a="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(a);break}else throw new Error(a)}}return this.state.top=!0,r}inline(t,r=[]){return this.inlineQueue.push({src:t,tokens:r}),r}inlineTokens(t,r=[]){let n=t,s=null;if(this.tokens.links){let l=Object.keys(this.tokens.links);if(l.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(n))!=null;)l.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(n=n.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(n))!=null;)n=n.slice(0,s.index)+"++"+n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(n))!=null;)o=s[2]?s[2].length:0,n=n.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let a=!1,c="";for(;t;){a||(c=""),a=!1;let l;if(this.options.extensions?.inline?.some(f=>(l=f.call({lexer:this},t,r))?(t=t.substring(l.raw.length),r.push(l),!0):!1))continue;if(l=this.tokenizer.escape(t)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.tag(t)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.link(t)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(l.raw.length);let f=r.at(-1);l.type==="text"&&f?.type==="text"?(f.raw+=l.raw,f.text+=l.text):r.push(l);continue}if(l=this.tokenizer.emStrong(t,n,c)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.codespan(t)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.br(t)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.del(t)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.autolink(t)){t=t.substring(l.raw.length),r.push(l);continue}if(!this.state.inLink&&(l=this.tokenizer.url(t))){t=t.substring(l.raw.length),r.push(l);continue}let u=t;if(this.options.extensions?.startInline){let f=1/0,_=t.slice(1),b;this.options.extensions.startInline.forEach(A=>{b=A.call({lexer:this},_),typeof b=="number"&&b>=0&&(f=Math.min(f,b))}),f<1/0&&f>=0&&(u=t.substring(0,f+1))}if(l=this.tokenizer.inlineText(u)){t=t.substring(l.raw.length),l.raw.slice(-1)!=="_"&&(c=l.raw.slice(-1)),a=!0;let f=r.at(-1);f?.type==="text"?(f.raw+=l.raw,f.text+=l.text):r.push(l);continue}if(t){let f="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(f);break}else throw new Error(f)}}return r}},ls=class{constructor(e){Ke(this,"options");Ke(this,"parser");this.options=e||Lr}space(e){return""}code({text:e,lang:t,escaped:r}){let n=(t||"").match(wt.notSpaceStart)?.[0],s=e.replace(wt.endingNewline,"")+`
`;return n?'<pre><code class="language-'+lr(n)+'">'+(r?s:lr(s,!0))+`</code></pre>
`:"<pre><code>"+(r?s:lr(s,!0))+`</code></pre>
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${lr(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:r}){let n=this.parser.parseInline(r),s=Ci(e);if(s===null)return n;e=s;let o='<a href="'+e+'"';return t&&(o+=' title="'+lr(t)+'"'),o+=">"+n+"</a>",o}image({href:e,title:t,text:r,tokens:n}){n&&(r=this.parser.parseInline(n,this.parser.textRenderer));let s=Ci(e);if(s===null)return lr(r);e=s;let o=`<img src="${e}" alt="${r}"`;return t&&(o+=` title="${lr(t)}"`),o+=">",o}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:lr(e.text)}},yo=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},jt=class po{constructor(t){Ke(this,"options");Ke(this,"renderer");Ke(this,"textRenderer");this.options=t||Lr,this.options.renderer=this.options.renderer||new ls,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new yo}static parse(t,r){return new po(r).parse(t)}static parseInline(t,r){return new po(r).parseInline(t)}parse(t){let r="";for(let n=0;n<t.length;n++){let s=t[n];if(this.options.extensions?.renderers?.[s.type]){let a=s,c=this.options.extensions.renderers[a.type].call({parser:this},a);if(c!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(a.type)){r+=c||"";continue}}let o=s;switch(o.type){case"space":{r+=this.renderer.space(o);break}case"hr":{r+=this.renderer.hr(o);break}case"heading":{r+=this.renderer.heading(o);break}case"code":{r+=this.renderer.code(o);break}case"table":{r+=this.renderer.table(o);break}case"blockquote":{r+=this.renderer.blockquote(o);break}case"list":{r+=this.renderer.list(o);break}case"checkbox":{r+=this.renderer.checkbox(o);break}case"html":{r+=this.renderer.html(o);break}case"def":{r+=this.renderer.def(o);break}case"paragraph":{r+=this.renderer.paragraph(o);break}case"text":{r+=this.renderer.text(o);break}default:{let a='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return r}parseInline(t,r=this.renderer){let n="";for(let s=0;s<t.length;s++){let o=t[s];if(this.options.extensions?.renderers?.[o.type]){let c=this.options.extensions.renderers[o.type].call({parser:this},o);if(c!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){n+=c||"";continue}}let a=o;switch(a.type){case"escape":{n+=r.text(a);break}case"html":{n+=r.html(a);break}case"link":{n+=r.link(a);break}case"image":{n+=r.image(a);break}case"checkbox":{n+=r.checkbox(a);break}case"strong":{n+=r.strong(a);break}case"em":{n+=r.em(a);break}case"codespan":{n+=r.codespan(a);break}case"br":{n+=r.br(a);break}case"del":{n+=r.del(a);break}case"text":{n+=r.text(a);break}default:{let c='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(c),"";throw new Error(c)}}}return n}},os,_n=(os=class{constructor(e){Ke(this,"options");Ke(this,"block");this.options=e||Lr}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?Ut.lex:Ut.lexInline}provideParser(){return this.block?jt.parse:jt.parseInline}},Ke(os,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),Ke(os,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),os),Qu=class{constructor(...e){Ke(this,"defaults",fo());Ke(this,"options",this.setOptions);Ke(this,"parse",this.parseMarkdown(!0));Ke(this,"parseInline",this.parseMarkdown(!1));Ke(this,"Parser",jt);Ke(this,"Renderer",ls);Ke(this,"TextRenderer",yo);Ke(this,"Lexer",Ut);Ke(this,"Tokenizer",is);Ke(this,"Hooks",_n);this.use(...e)}walkTokens(e,t){let r=[];for(let n of e)switch(r=r.concat(t.call(this,n)),n.type){case"table":{let s=n;for(let o of s.header)r=r.concat(this.walkTokens(o.tokens,t));for(let o of s.rows)for(let a of o)r=r.concat(this.walkTokens(a.tokens,t));break}case"list":{let s=n;r=r.concat(this.walkTokens(s.items,t));break}default:{let s=n;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let a=s[o].flat(1/0);r=r.concat(this.walkTokens(a,t))}):s.tokens&&(r=r.concat(this.walkTokens(s.tokens,t)))}}return r}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(r=>{let n={...r};if(n.async=this.defaults.async||n.async||!1,r.extensions&&(r.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=t.renderers[s.name];o?t.renderers[s.name]=function(...a){let c=s.renderer.apply(this,a);return c===!1&&(c=o.apply(this,a)),c}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=t[s.level];o?o.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),n.extensions=t),r.renderer){let s=this.defaults.renderer||new ls(this.defaults);for(let o in r.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let a=o,c=r.renderer[a],l=s[a];s[a]=(...u)=>{let f=c.apply(s,u);return f===!1&&(f=l.apply(s,u)),f||""}}n.renderer=s}if(r.tokenizer){let s=this.defaults.tokenizer||new is(this.defaults);for(let o in r.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let a=o,c=r.tokenizer[a],l=s[a];s[a]=(...u)=>{let f=c.apply(s,u);return f===!1&&(f=l.apply(s,u)),f}}n.tokenizer=s}if(r.hooks){let s=this.defaults.hooks||new _n;for(let o in r.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let a=o,c=r.hooks[a],l=s[a];_n.passThroughHooks.has(o)?s[a]=u=>{if(this.defaults.async&&_n.passThroughHooksRespectAsync.has(o))return(async()=>{let _=await c.call(s,u);return l.call(s,_)})();let f=c.call(s,u);return l.call(s,f)}:s[a]=(...u)=>{if(this.defaults.async)return(async()=>{let _=await c.apply(s,u);return _===!1&&(_=await l.apply(s,u)),_})();let f=c.apply(s,u);return f===!1&&(f=l.apply(s,u)),f}}n.hooks=s}if(r.walkTokens){let s=this.defaults.walkTokens,o=r.walkTokens;n.walkTokens=function(a){let c=[];return c.push(o.call(this,a)),s&&(c=c.concat(s.call(this,a))),c}}this.defaults={...this.defaults,...n}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Ut.lex(e,t??this.defaults)}parser(e,t){return jt.parse(e,t??this.defaults)}parseMarkdown(e){return(t,r)=>{let n={...r},s={...this.defaults,...n},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&n.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=e),s.async)return(async()=>{let a=s.hooks?await s.hooks.preprocess(t):t,c=await(s.hooks?await s.hooks.provideLexer():e?Ut.lex:Ut.lexInline)(a,s),l=s.hooks?await s.hooks.processAllTokens(c):c;s.walkTokens&&await Promise.all(this.walkTokens(l,s.walkTokens));let u=await(s.hooks?await s.hooks.provideParser():e?jt.parse:jt.parseInline)(l,s);return s.hooks?await s.hooks.postprocess(u):u})().catch(o);try{s.hooks&&(t=s.hooks.preprocess(t));let a=(s.hooks?s.hooks.provideLexer():e?Ut.lex:Ut.lexInline)(t,s);s.hooks&&(a=s.hooks.processAllTokens(a)),s.walkTokens&&this.walkTokens(a,s.walkTokens);let c=(s.hooks?s.hooks.provideParser():e?jt.parse:jt.parseInline)(a,s);return s.hooks&&(c=s.hooks.postprocess(c)),c}catch(a){return o(a)}}}onError(e,t){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let n="<p>An error occurred:</p><pre>"+lr(r.message+"",!0)+"</pre>";return t?Promise.resolve(n):n}if(t)return Promise.reject(r);throw r}}},Ir=new Qu;function Ve(e,t){return Ir.parse(e,t)}Ve.options=Ve.setOptions=function(e){return Ir.setOptions(e),Ve.defaults=Ir.defaults,Li(Ve.defaults),Ve};Ve.getDefaults=fo;Ve.defaults=Lr;Ve.use=function(...e){return Ir.use(...e),Ve.defaults=Ir.defaults,Li(Ve.defaults),Ve};Ve.walkTokens=function(e,t){return Ir.walkTokens(e,t)};Ve.parseInline=Ir.parseInline;Ve.Parser=jt;Ve.parser=jt.parse;Ve.Renderer=ls;Ve.TextRenderer=yo;Ve.Lexer=Ut;Ve.lexer=Ut.lex;Ve.Tokenizer=is;Ve.Hooks=_n;Ve.parse=Ve;var jm=Ve.options,Wm=Ve.setOptions,zm=Ve.use,Hm=Ve.walkTokens,Gm=Ve.parseInline;var Vm=jt.parse,Ym=Ut.lex;function br(e){let t=Ve.parse(e),r=xi.sanitize(t);return Si(r)}function cr(e,t){return i`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function Hr(e){return e.loading?i`<div class="prompt-block__status">불러오는 중…</div>`:e.error?i`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function us(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=n=>String(n).padStart(2,"0");return`${t.getFullYear()}-${r(t.getMonth()+1)}-${r(t.getDate())} ${r(t.getHours())}:${r(t.getMinutes())}`}var Ju={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},ep=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,tp=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function vr(e){return!!e&&typeof e=="object"}function ko(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function Wi(e,t){let r=ko(e),n=ko(t),s=new Map;for(let c of r)s.set(c,(s.get(c)||0)+1);let o=0;for(let c of n){let l=s.get(c)||0;l>0?s.set(c,l-1):o+=1}let a=0;for(let c of s.values())a+=c;return{added:o,removed:a}}function rp(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(s=>vr(s)&&typeof s.text=="string"?s.text:"").join(""):vr(e)&&typeof e.text=="string"&&(t=e.text);let n=(String(t).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return n.length>120?`${n.slice(0,117)}\u2026`:n}function np(e){let t=String(e.name||""),r=e.input||{},n={kind:"tool",tool:t,icon:Ju[t]||"\u{1F527}",input:r,expandable:!0};if((t==="Read"||t==="Write")&&(n.path=String(r.file_path||r.path||"")),t==="Write"&&(n.added=ko(r.content).length),t==="Edit"){n.path=String(r.file_path||r.path||"");let{added:s,removed:o}=Wi(r.old_string,r.new_string);n.added=s,n.removed=o}if(t==="MultiEdit"){n.path=String(r.file_path||r.path||"");let s=0,o=0,a=Array.isArray(r.edits)?r.edits:[];for(let c of a){let l=Wi(vr(c)?c.old_string:"",vr(c)?c.new_string:"");s+=l.added,o+=l.removed}n.added=s,n.removed=o}return t==="Bash"&&(n.command=String(r.command||"")),(t==="Grep"||t==="Glob")&&(n.command=String(r.pattern||r.query||"")),n}function zi(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}function Hi(e){let t=e.split(/\r?\n/).find(n=>n.trim().length>0)||"",r=ep.exec(t);return r?{kind:"gate",gate:r[2]==="implementation"?"impl":r[2],reviewer:r[3],verdict:r[4],time:r[5]?r[5].trim():void 0,text:t.trim()}:tp.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function sp(e,t){if(e.type==="assistant"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[],s=[];for(let o of n)if(vr(o)){if(o.type==="text"&&typeof o.text=="string")s.push(Hi(o.text));else if(o.type==="thinking"){let a=zi(o.thinking);a&&s.push(a)}else if(o.type==="tool_use"){let a=np(o);typeof o.id=="string"&&t.set(o.id,a),s.push(a)}}return s}if(e.type==="user"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[];for(let s of n)if(vr(s)&&s.type==="tool_result"){let o=t.get(String(s.tool_use_id));if(o){let a=rp(s.content);o.result=a,o.output=typeof s.content=="string"?s.content:a}}return[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success";return[{kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""}]}return[]}function op(e){if(e.type==="item.completed"&&vr(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[Hi(t.text)];if(t.type==="reasoning"){let r=zi(t.text);return r?[r]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function ap(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function Gi(e){let t=[],r=new Map,n=Array.isArray(e)?e:[];for(let s of n){let o=s;if(typeof s=="string"){let c=s.trim();if(c.length===0)continue;try{o=JSON.parse(c)}catch{continue}}if(!vr(o))continue;let a=ap(o)?op(o):sp(o,r);for(let c of a)t.push(c)}return t}var ip=5,lp=10,cp=/Task\s+#(\d+)/,dp=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,up=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function ps(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function pp(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function fp(e){for(let t=e.length-1;t>=0;t-=1){let r=e[t];if(r.kind==="phase"||r.kind==="gate")return r.text||null}return null}function _p(e){let t=new Map,r=0;for(let s of e){if(s.kind!=="tool")continue;r+=1;let o=s.input||{};if(s.tool==="TaskCreate"){let l=cp.exec(s.output||s.result||""),u=String(o.activeForm||o.subject||"").trim();if(!l||u.length===0)continue;t.set(l[1],{label:u,active:o.status==="in_progress"?r:0});continue}if(s.tool!=="TaskUpdate")continue;let a=t.get(String(o.taskId??""));if(!a)continue;let c=o.activeForm||o.subject;typeof c=="string"&&c.trim().length>0&&(a.label=c.trim()),typeof o.status=="string"&&(a.active=o.status==="in_progress"?r:0)}let n=null;for(let s of t.values())s.active>0&&(!n||s.active>n.active)&&(n=s);return n?n.label:null}function mp(e){if(e.tool==="Bash"){let t=e.command||"";return dp.test(t)?"~ PR/\uAC8C\uC2DC \uC911":up.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function gp(e){let t=e.filter(s=>s.kind==="tool").slice(-lp),r=new Map;t.forEach((s,o)=>{let a=mp(s);if(!a)return;let c=r.get(a)||{count:0,last:-1};c.count+=1,c.last=o,r.set(a,c)});let n=null;for(let[s,o]of r)(!n||o.count>n.count||o.count===n.count&&o.last>n.last)&&(n={label:s,count:o.count,last:o.last});return n?n.label:null}function hp(e){let t=fp(e);if(t)return{text:t,guess:!1};let r=_p(e);if(r)return{text:r,guess:!1};let n=gp(e);return n?{text:n,guess:!0}:null}function bp(e,t){if(typeof e!="number")return"";let r=Math.max(0,Math.floor((t-e)/1e3));return r<60?`${r}\uCD08 \uC804`:St(e,t)}function fs(e,t={}){let{transport:r,sessionLogStore:n,onClose:s}=t,o=null,a={},c=!0,l=new Set,u=new Set,f=null,_=null,b=!1,A=!1,x=!1,L=null,q=null;function S(){b=!1,A=!1,x=!1,L=null,q=null}async function B(E){if(r){A=!0,x=!1,Ce();try{let N=await Promise.resolve(r("get-attempt-prompt",{attempt_id:E}));if(o!==E)return;!N||typeof N!="object"||Array.isArray(N)?x=!0:(L=N,q=E)}catch{o===E&&(x=!0)}finally{o===E&&(A=!1,Ce())}}}function Z(){if(b=!b,b&&o&&q!==o){B(o);return}Ce()}function y(){if(!b)return"";let E=Hr({loading:A,error:x});if(E)return i`<div class="sv__prompt" data-seam="attempt-prompt">
        ${E}
      </div>`;if(!L)return"";if(L.missing)return i`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let N=us(L.recorded_at);return i`<div class="sv__prompt" data-seam="attempt-prompt">
      ${N?i`<div class="prompt-block__meta">${N} 발송</div>`:""}
      ${typeof L.task_prompt=="string"?cr("\uACFC\uC5C5 (user)",L.task_prompt):""}
      ${typeof L.system_prompt=="string"?cr("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",L.system_prompt):""}
    </div>`}function k(){if(!o||!n)return[];let E=n.get(o);return Gi(E?E.lines:[])}function T(){if(!o||!n)return null;let E=n.get(o),N=E?E.last_event_at:null;return typeof N=="number"?N:null}function X(){return a.status==="running"}function Y(){if(X()&&o){_||(_=setInterval(()=>Ce(),1e3));return}ne()}function ne(){_&&(clearInterval(_),_=null)}function be(E){let N=[],ue=0;for(;ue<E.length;){let Pe=E[ue];if(Pe.kind==="tool"){let R=ue;for(;R<E.length&&E[R].kind==="tool"&&E[R].tool===Pe.tool;)R+=1;if(R-ue>=ip&&!u.has(ue)){N.push({kind:"group",idx:ue,tool:Pe.tool||"",lines:E.slice(ue,R).map((U,C)=>({idx:ue+C,line:U}))}),ue=R;continue}}N.push({kind:"line",idx:ue,line:Pe}),ue+=1}return N}function J(E){for(let N=E.length-1;N>=0;N-=1){let ue=E[N];if(ue.kind==="result"||ue.kind==="error")return null;if(ue.kind==="tool"&&!Object.hasOwn(ue,"result"))return ue}return null}function ee(E){for(let N=E.length-1;N>=0;N-=1)if(E[N].kind==="thinking")return E[N];return null}function Ee(E,N){if(N.kind==="gate")return i`<div class="sv__gate">${N.text}</div>`;if(N.kind==="phase")return i`<div class="sv__phase">${N.text}</div>`;if(N.kind==="result")return i`<div
        class="sv__result${N.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${N.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${br(N.text||(N.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(N.kind==="thinking"){let ue=l.has(E);return i`<div
        class="sv__think${ue?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>Se(E)}
      >
        <span class="sv__think-line">💭 ${ps(N.text)}</span>
        ${ue?i`<pre class="sv__think-expand">${N.text}</pre>`:""}
      </div>`}if(N.kind==="error")return i`<div class="sv__error">⛔ ${N.text}</div>`;if(N.kind==="blocker")return i`<div class="sv__error">⛔ ${N.text}</div>`;if(N.kind==="tool"){let ue=l.has(E),Pe=N.tool==="Bash"?pp(N.command):0,R=N.tool==="Bash"?Pe>1?ps(N.command):N.command:N.path||N.command||"";return i`<div
        class="sv__tool${ue?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>Se(E)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${N.icon}</span>
          <span class="sv__tool-name">${N.tool}</span>
          ${R?i`<span class="sv__tool-detail">${R}</span>`:""}
          ${Pe>1?i`<span class="sv__tool-more">⋯ ${Pe}줄</span>`:""}
          ${typeof N.added=="number"?i`<span class="sv__diff-add">+${N.added}</span>`:""}
          ${typeof N.removed=="number"?i`<span class="sv__diff-del">−${N.removed}</span>`:""}
          ${N.result?i`<span class="sv__tool-ok">→ ${N.result}</span>`:""}
        </span>
        ${ue?i`<pre class="sv__tool-expand">${je(N)}</pre>`:""}
      </div>`}return i`<div class="sv__as">${br(N.text||"")}</div>`}function je(E){let N=[];if(E.tool==="Bash"&&typeof E.command=="string"&&E.command.length>0)N.push(E.command);else if(E.input!==void 0)try{N.push(`input: ${JSON.stringify(E.input,null,2)}`)}catch{}return typeof E.output=="string"&&E.output.length>0&&N.push(`output:
${E.output}`),N.join(`

`)}function et(){if(!o)return i``;let E=k(),N=[a.runner,a.model,a.effort].filter(Boolean).join(" \xB7 "),ue=a.session_id||"",Pe=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${c?"ON":"OFF"}`,R=X(),U=R?bp(T(),Date.now()):"",C=R?J(E):null,Q=R?ee(E):null,ae=hp(E);return i`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id">${o}</span>
        ${ae?i`<span
              class="sv__stage${ae.guess?" sv__stage--guess":""}"
              title=${ae.text}
              >${ae.text}</span
            >`:""}
        ${R?i`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${U?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${U}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${U?i`<span class="sv__live-ago">${U}</span>`:""}</span
            >`:""}
        ${ue?i`<button
              type="button"
              class="sv__session"
              title=${ue}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${ue}`}
              @click=${()=>H(ue)}
            >
              ⧉ ${ue.slice(0,8)}
            </button>`:""}
        ${N?i`<span class="sv__meta">${N}</span>`:""}
        ${a.worktree?i`<span class="sv__wt" title=${a.worktree}
              >${a.worktree}</span
            >`:""}
        <button
          type="button"
          class="sv__prompt-toggle${b?" sv__prompt-toggle--on":""}"
          data-seam="attempt-prompt-toggle"
          aria-pressed=${b?"true":"false"}
          aria-label="발송 프롬프트 보기"
          title="이 세션에 실제로 보낸 시스템·과업 프롬프트"
          @click=${Z}
        >
          ✉ 프롬프트
        </button>
        <button
          type="button"
          class="sv__follow${c?" sv__follow--on":""}"
          aria-pressed=${c?"true":"false"}
          aria-label=${Pe}
          @click=${he}
        >
          <span class="sv__follow-full">⇣ ${Pe}</span>
          <span class="sv__follow-short">⇣ ${c?"ON":"OFF"}</span>
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
      ${y()}
      <div class="sv__body">
        ${E.length===0?i`<div class="sv__empty">세션 로그 없음</div>`:be(E).map(te=>te.kind==="group"?Ne(te):Ee(te.idx,te.line))}
      </div>
      ${C||Q?i`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${C?i`<span class="sv__now-icon">${C.icon}</span>
                  <span class="sv__now-name">${C.tool}</span>
                  <span class="sv__now-detail"
                    >${C.tool==="Bash"?ps(C.command):C.path||C.command||""}</span
                  >`:""}
            ${Q?i`<span class="sv__now-think"
                  >💭 ${ps(Q.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function Ne(E){return i`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>We(E.idx)}
    >
      <span class="sv__group-icon">${E.lines[0].line.icon}</span>
      <span class="sv__group-name">${E.tool}</span>
      <span class="sv__group-count">${E.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function We(E){u.add(E),Ce()}function Ce(){Fe(et(),e),Y(),c&&fe()}function fe(){let E=e.querySelector(".sv__body");E&&(E.scrollTop=E.scrollHeight)}function Se(E){l.has(E)?l.delete(E):l.add(E),Ce()}function he(){c=!c,Ce()}function H(E){Rr(E).then(N=>{N?re("\uBCF5\uC0AC\uB428","success",1200):re("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function z(E){!o||!E||(a={...a,...E},Ce())}function Ie(E){let N=E.target;if(!N||!N.classList||!N.classList.contains("sv__body"))return;!(N.scrollHeight-N.scrollTop-N.clientHeight<=4)&&c&&(c=!1,Ce())}e.addEventListener("scroll",Ie,!0);function ie(E){let N=E&&E.attempt_id;N&&(o=N,a=E.meta||{},c=!0,l.clear(),u.clear(),S(),!f&&n&&(f=n.subscribe(Ce)),r&&Promise.resolve(r("subscribe-session-log",{id:`session-log:${o}`,attempt_id:o})).catch(()=>{}),Ce())}function se(){let E=o;o=null,l.clear(),u.clear(),S(),ne(),r&&E&&Promise.resolve(r("unsubscribe-session-log",{id:`session-log:${E}`})).catch(()=>{}),Fe(i``,e),s&&s()}return{open:ie,updateMeta:z,close:se,isOpen(){return o!==null},destroy(){ne(),f&&(f(),f=null),e.removeEventListener("scroll",Ie,!0),o=null,Fe(i``,e)}}}function hn(e){let t=e&&typeof e=="object"?e:{},r=t.metadata&&typeof t.metadata=="object"?t.metadata:{},n=Vi(t.spec_id),s=Vi(r.spec_id);return n?{path:n,source:"native",conflict:s.length>0&&s!==n}:s?{path:s,source:"metadata",conflict:!1}:{path:"",source:"none",conflict:!1}}function Vi(e){return typeof e=="string"?e.trim():""}function vp(e){return["plan_review","plan_approval","plan_check"].some(t=>{let r=e[t];return typeof r=="string"&&r.trim().length>0})}function wp(e){let t=e&&e.metadata||{},r=hn(e),n=[];return r.path&&n.push({kind:"spec",path:r.path,missing_state:null}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&n.push({kind:"plan",path:t.plan_path.trim(),missing_state:vp(t)?null:"plan_pending"}),n}function Yi(e,t){let r=wp(e);return i`
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
  `}var yp="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",kp=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,$p=/^\*\*결론\*\* — (.+)$/;function _s(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==yp)return null;let r=kp.exec(t[1]||"");if(!r)return null;let n=r[1].split(" ")[0],s=r[2],o=r[3],a=2;for(;a<t.length&&t[a].trim().length===0;)a+=1;let c=a<t.length?$p.exec(t[a]):null,l=c?c[1].replace(/\s+/g," ").trim():"",u=c?a+1:a;return{lane:n,identifier:s,timestamp:o,conclusion:l,body:t.slice(u).join(`
`).trim()}}var Ki=20;function Zi(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let r=String(t.getMonth()+1).padStart(2,"0"),n=String(t.getDate()).padStart(2,"0"),s=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0");return`${r}-${n} ${s}:${o}`}function xp(e){return e.length>Ki?`${e.slice(0,Ki)}\u2026`:e}function Sp(e,t,r,n){let s=`${t.lane} ${xp(t.identifier)}`;return i`<div class="detail-report">
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
        <span class="detail-report__time">${Zi(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${n&&t.body.length>0?i`<div class="detail-report__body">
          ${br(t.body)}
        </div>`:""}
  </div>`}function Ap(e){return i`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${Zi(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${br(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function Xi(e,t={},r={}){let n=Array.isArray(e)?e.filter(Boolean):[],s=r.expanded||new Set,o=typeof r.draft=="string"?r.draft:"",a=r.sending===!0,c=n.slice().sort((l,u)=>String(u.created_at||"").localeCompare(String(l.created_at||"")));return i`
    <div class="detail-section-label">댓글 (${n.length})</div>
    ${r.error?i`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:c.length===0?i`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:i`<div class="detail-comments" data-seam="comments">
            ${c.map(l=>{let u=_s(typeof l.text=="string"?l.text:"");return u?Sp(l,u,t,s.has(l.id)):Ap(l)})}
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
  `}var{I:Tg}=Sa;var Qi=e=>e.strings===void 0;var Tp={},Ji=(e,t=Tp)=>e._$AH=t;var Gr=ns(class extends zr{constructor(e){if(super(e),e.type!==ir.PROPERTY&&e.type!==ir.ATTRIBUTE&&e.type!==ir.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!Qi(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===Rt||t===st)return t;let r=e.element,n=e.name;if(e.type===ir.PROPERTY){if(t===r[n])return Rt}else if(e.type===ir.BOOLEAN_ATTRIBUTE){if(!!t===r.hasAttribute(n))return Rt}else if(e.type===ir.ATTRIBUTE&&r.getAttribute(n)===t+"")return Rt;return Ji(e),t}});var $o=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"],ms=["orchestration_model","orchestration_effort","orchestration_speed"];var gs=["delegated","main"],hs=["inherit","claude","codex"],bn=["default","fast"],bs=["standard","fast_track"],vn=["codex","opus","fable","self","skip"],vs=["codex","fable","skip"],ws=["low","medium","high","xhigh"],Dt="auto";function dr(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function el(e){if(!dr(e)||!dr(e.runners))return[];let t=[];for(let[r,n]of Object.entries(e.runners))dr(n)&&dr(n.models)&&t.push([r,Object.keys(n.models)]);return t}function tl(e){return e?.impl_dispatch==="main"}function ys(e,t){let r=el(e),n=t&&t!=="inherit"?r.filter(([s])=>s===t):r;return[Dt,...n.flatMap(([,s])=>s)]}function Vr(e,t,r){if(!dr(e)||!dr(e.runners))return[Dt];let n=[];for(let[s,o]of Object.entries(e.runners))if(!(!dr(o)||!dr(o.models))&&!(t&&t!=="inherit"&&s!==t))for(let[a,c]of Object.entries(o.models)){if(r&&r!==Dt&&a!==r)continue;let l=dr(c)?c.efforts:null;if(Array.isArray(l))for(let u of l)typeof u=="string"&&!n.includes(u)&&n.push(u)}return[Dt,...n]}function ks(e,t){let r=el(e);return(t?r.filter(([s])=>s===t):r).flatMap(([,s])=>s)}function rl(e,t){let r={};for(let n of $o){let s=e?.[n],o=t?.[n];s!==o&&(r[n]=typeof o=="string"&&o.length>0?o:null)}return r}function nl(e,t){let r={};for(let n of ms){let s=e?.[n]??null,o=t?.[n]??null;s!==o&&(r[n]=typeof o=="string"&&o.length>0?o:null)}return r}var xo=[{id:"workflow",label:"\uC6CC\uD06C\uD50C\uB85C\uC6B0",keys:["workflow_mode"]},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort"]},{id:"implementation",label:"\uAD6C\uD604",keys:["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]},{id:"worker",label:"Worker",keys:[...ms]}],So={workflow_mode:"\uBAA8\uB4DC",spec_review_model:"\uC0AC\uC591 \uB9AC\uBDF0",spec_review_effort:"\uC0AC\uC591 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_dispatch:"\uC2E4\uD589 \uBC29\uC2DD",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uBAA8\uB378",impl_effort:"effort",impl_speed:"\uC18D\uB3C4",orchestration_model:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",orchestration_effort:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",orchestration_speed:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4"},ol={pin:"\uD540",global:"\uC804\uC5ED",base:"\uAE30\uBCF8"};function sl(e){return typeof e=="string"&&e.length>0?e:null}function Ep(e,t,r){let n=sl(t?.[e]);if(n!==null)return{value:n,source:"pin"};let s=sl(r?.[e]);return s!==null?{value:s,source:"global"}:{value:null,source:"base"}}function $s(e,t,r){return e.map(n=>({key:n,...Ep(n,t,r)}))}function al(e,t,r){let n={pin:0,global:0,base:0};for(let s of $s(e,t,r))n[s.source]+=1;return n}function il(e,t,r){return{id:e,key:t,value:typeof r=="string"?r:""}}function ll(e,t,r){return typeof t!="string"||t.length===0?null:{id:e,preset_id:t,expected_revision:r}}var Mg=[...$o,...ms];var Cp=[{id:"spec",label:"spec \uB9AC\uBDF0",receipt:"spec_review"},{id:"impl",label:"\uAD6C\uD604",receipt:null},{id:"impl_review",label:"impl \uB9AC\uBDF0",receipt:"impl_review"},{id:"pr",label:"PR",receipt:null}],Rp={pin:"pin",global:"global",base:"base"};function Ip(e){return i`<span
    class=${`detail-layer-rail detail-layer-rail--${Rp[e]}`}
    data-source=${e}
    aria-hidden="true"
    ><i></i><i></i><i></i
  ></span>`}function Lp(e,t,r){switch(e){case"workflow_mode":return bs;case"spec_review_model":case"impl_review_model":return vn;case"plan_review_model":return vs;case"spec_review_effort":case"plan_review_effort":case"impl_review_effort":return ws;case"impl_dispatch":return gs;case"impl_runtime":return hs;case"impl_model":return ys(r,t.impl_runtime);case"impl_effort":return Vr(r,t.impl_runtime,t.impl_model);case"impl_speed":case"orchestration_speed":return bn;case"orchestration_model":return ks(r,null);case"orchestration_effort":return Vr(r,void 0,t.orchestration_model||Dt).filter(n=>n!==Dt);default:return[]}}function Op(e,t){return i`<div class="detail-effective__row" data-key=${e.key}>
    ${Ip(e.source)}
    <span class="detail-effective__k"
      >${So[e.key]||e.key}</span
    >
    <span
      class=${`detail-effective__v${e.source==="base"?" detail-effective__v--dim":""}`}
      >${e.value??"(harness \uAE30\uBCF8)"}</span
    >
    <span
      class=${`detail-effective__badge detail-effective__badge--${e.source}`}
      >${ol[e.source]}</span
    >
    ${t.expanded?i`<select
          class="detail-effective__edit"
          data-edit-key=${e.key}
          aria-label=${`${So[e.key]||e.key} \uD3B8\uC9D1`}
          @change=${r=>{let n=String(r.target.value);t.onEdit(e.key,n.length===0?null:n)}}
        >
          <option value="" ?selected=${e.source!=="pin"}>(기본)</option>
          ${t.options.map(r=>i`<option
                value=${r}
                ?selected=${e.source==="pin"&&e.value===r}
              >
                ${r===Dt?"\uC790\uB3D9":r}
              </option>`)}
        </select>`:""}
  </div>`}function cl(e,t){let r=xo.flatMap(o=>o.keys),n=al(r,e.metadata,e.workspace_values),s={};for(let o of $s(r,e.metadata,e.workspace_values))o.value!==null&&(s[o.key]=o.value);return i`<section
    class=${`detail-effective${e.expanded?" detail-effective--open":""}`}
    data-seam="effective-settings"
  >
    <button
      type="button"
      class="detail-effective__head"
      data-seam="effective-settings-toggle"
      aria-expanded=${e.expanded?"true":"false"}
      @click=${t.onToggle}
    >
      <span class="detail-effective__t">유효 실행 설정</span>
      <span class="detail-effective__summary">${Dp(s)}</span>
      <span class="detail-effective__counts">
        <span class="detail-effective__count detail-effective__count--pin"
          >핀 ${n.pin}</span
        >
        <span class="detail-effective__count detail-effective__count--global"
          >전역 ${n.global}</span
        >
      </span>
      <span class="detail-effective__chev">▸</span>
    </button>
    <div class="detail-effective__body">
      ${xo.map(o=>i`
          <div class="detail-effective__subhead">${o.label}</div>
          ${$s(o.keys,e.metadata,e.workspace_values).map(a=>Op(a,{expanded:e.expanded,options:Lp(a.key,s,e.catalog),onEdit:t.onEdit}))}
        `)}
      <div class="detail-effective__foot">
        <select
          data-impl-preset-select
          aria-label="구현 프리셋"
          .value=${Gr(e.preset_id)}
          ?disabled=${e.preset_busy}
          @change=${o=>t.onPresetSelect(String(o.target.value))}
        >
          <option value="" ?selected=${e.preset_id===""}>
            구현 프리셋…
          </option>
          ${e.presets.map(o=>i`<option
                value=${o.id}
                ?selected=${o.id===e.preset_id}
              >
                ${o.name}${o.compatible===!1?" (\uBE44\uD638\uD658)":""}
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
        <span class="detail-effective__hint">구현 키 5개를 핀으로 기록</span>
      </div>
    </div>
  </section>`}function Dp(e){let t=e.workflow_mode||"standard",r=e.impl_dispatch==="main"?"\uBA54\uC778":"\uC704\uC784",n=e.impl_runtime||"inherit",s=e.impl_model||"auto";return`${t} \xB7 ${r} ${n} \xB7 ${s}`}function dl(e){let t=e&&typeof e.metadata=="object"&&e.metadata?e.metadata:{},r=e&&typeof e.workflow=="object"&&e.workflow?e.workflow:{},n=r.stages||{},s=r.route||t.route||null,o=typeof t.pr_url=="string"?t.pr_url:"",a=typeof t.exec_receipt=="string"?t.exec_receipt:"";return i`<section class="detail-summary" data-seam="detail-summary">
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
      ${a?i`<span
            class="detail-summary__chip detail-summary__chip--receipt"
            title=${a}
            >${a.split("@")[0]}</span
          >`:""}
    </div>
    <div class="detail-summary__gates">
      ${Cp.map(c=>{let l=c.receipt&&typeof t[c.receipt]=="string"?String(t[c.receipt]):"",u=n[c.id],f=l.length>0||u?.done===!0,_=u?.stale===!0;return i`<span
          class=${`detail-summary__gate${f?" detail-summary__gate--on":""}${_?" detail-summary__gate--stale":""}`}
          data-gate=${c.id}
        >
          <span class="detail-summary__gate-pill">${c.label}</span>
          ${l?i`<span class="detail-summary__gate-sha"
                >${l.split("@")[1]?.slice(0,7)||""}</span
              >`:""}
        </span>`})}
    </div>
  </section>`}var ul=["orchestration_model","orchestration_effort","orchestration_speed","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_runtime","impl_model","impl_effort"];function wn(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function xs(e){if(!wn(e)||!wn(e.runners))return null;let t=Object.entries(e.runners).filter(([,r])=>wn(r)&&wn(r.models));return t.length>0?t:null}function Ao(e,t){let r=xs(e);if(!r||!t)return null;for(let[n,s]of r)if(Object.hasOwn(s.models,t))return n;return null}function pl(e,t){return wn(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function fl(e,t){let r=xs(e);if(!r||!t)return[];for(let[,n]of r)if(Object.hasOwn(n.models,t))return pl(n,n.models[t]);return[]}function Pp(e){let t=xs(e);if(!t)return[];let r=[];for(let[,n]of t)for(let s of Object.values(n.models))for(let o of pl(n,s))r.includes(o)||r.push(o);return r}function Mp(e,t){if(!t)return Pp(e);let n=xs(e)?.find(([o])=>o===t)?.[1];if(!n)return[];let s=[];for(let o of Object.keys(n.models))for(let a of fl(e,o))s.includes(a)||s.push(a);return s}function _l(e,t,r){let n={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},s=n.impl_runtime==="inherit"?r:n.impl_runtime==="claude"||n.impl_runtime==="codex"?n.impl_runtime:null;if(n.impl_runtime==="inherit"&&!s)return n.impl_model="",n.impl_effort="",n;let o=Ao(t,n.impl_model);if(n.impl_model&&(!s||o!==s))return n.impl_model="",n.impl_effort="",n;let a=n.impl_model?fl(t,n.impl_model):Mp(t,s);return n.impl_effort&&a.length>0&&!a.includes(n.impl_effort)&&(n.impl_effort=""),n}function Np(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function ml(e,t){let r=t.getWorkspacePath,n=t.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",a="",c="";function l(x){x.key==="Escape"&&s&&(x.preventDefault(),b())}document.addEventListener("keydown",l);function u(){return s?i`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>b()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${Np(s)}</span
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
            ${o==="loading"?i`<div class="mv__status">불러오는 중…</div>`:o==="pending"?i`<div class="mv__status">${c}</div>`:o==="error"?i`<div class="mv__status mv__status--error">
                      ${c||"\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}
                    </div>`:br(a)}
          </div>
        </div>
      </div>
    `:i``}function f(){Fe(u(),e)}async function _(x,L={}){s=x,o="loading",a="",c="",f();let q=r?r():"";if(!q){o="error",c="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",f();return}if(!n){o="error",c="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",f();return}let S="/api/doc?workspace="+encodeURIComponent(q)+"&path="+encodeURIComponent(x);try{let B=await n(S),Z=await B.json().catch(()=>({}));if(!B.ok||!Z||Z.ok!==!0){if(Z?.error==="not_found"&&L.missing_state==="plan_pending"){o="pending",c="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",f();return}o="error",c="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(Z&&Z.error||B.status)+")",f();return}a=String(Z.content||""),o="ready",f()}catch{o="error",c="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",f()}}function b(){s=null,Fe(i``,e)}function A(){document.removeEventListener("keydown",l),b()}return{open:_,close:b,destroy:A}}var Fp=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],bl="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function qp(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function Bp(e){let t=_t(e);if(t.length>0)return t.map(s=>i`<span class="detail-usage-total" title=${s.tooltip}
          >${s.label}</span
        >`);let r=jr(e);if(!r||!e)return"";let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return i`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${r.replace(/^τ /,"\u03C4 \uCD1D ")}${n}</span
    >${e.replayed?i`<span class="detail-usage-partial" title=${bl}
          >부분 집계</span
        >`:""}`}function gl(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function hl(e){if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?vl(t):""}function Up(e){return e?["implementation","review-consult"].flatMap(r=>{let n=e.roles[r]?.codex;return n?n.legs.map(s=>{let a=_t({providers:{codex:{subtotal:s.subtotal,breakdown:s.usage,...s.replayed?{replayed:!0}:{}}},roles:{}})[0];return i`<div class="detail-session__leg detail-session__usage-detail">
        <span class="detail-session__leg-role detail-session__usage-label"
          >${r}</span
        >
        <span class="detail-session__leg-meta detail-session__usage-value"
          >${[s.provider,s.model].filter(Boolean).join(" \xB7 ")}</span
        >
        ${s.session_id?i`<span
              class="detail-session__leg-sid detail-session__sid"
              title=${s.session_id}
              >${s.session_id.slice(0,8)}</span
            >`:""}
        ${hl(s.completed_at)?i`<span class="detail-session__leg-time detail-session__time"
              >${hl(s.completed_at)}</span
            >`:""}
        ${a?i`<span class="detail-session__usage" title=${a.tooltip}
              >${a.label}</span
            >`:""}
      </div>`}):[]}):""}function jp(e,t){let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,n=[...Fp,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return i`<div class="detail-session__usage-detail">
    ${n.map(s=>i`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${s.label}</span
          ><span class="detail-session__usage-value"
            >${qp(e[s.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${r===null?"":i`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${r.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?i`<span class="detail-session__usage-note">${bl}</span>`:""}
  </div>`}var Wp={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function vl(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=String(t.getHours()).padStart(2,"0"),n=String(t.getMinutes()).padStart(2,"0");return`${r}:${n}`}function zp(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,n])=>typeof n=="string"&&n.length>0).map(([n,s])=>`${n}=${s}`).join(" \xB7 "):"",r=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return i`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${r}</span>
    ${t?i`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}function wl(e,t={},r={}){let n=Array.isArray(e)?e:[],s=r.expanded||new Set;if(n.length===0)return i`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let o=new Set;for(let u of n)u&&typeof u.resumed_from=="string"&&u.resumed_from.length>0&&o.add(u.resumed_from);let a=u=>{if(!(u.status==="failed"||u.status==="orphaned"))return"";let _=typeof u.session_id=="string"&&u.session_id.length>0,b=o.has(u.attempt_id),A=_&&!b,x=_?b?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return i`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${u.attempt_id}
      ?disabled=${!A}
      title=${x}
      @click=${L=>{L.stopPropagation(),A&&t.onResume&&t.onResume(u.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},c=u=>{if(!(u.status==="failed"||u.status==="orphaned")||typeof u.cause!="string"||u.cause==="")return"";let _=u.cause_detail,b=_&&typeof _.reason=="string"&&_.reason.length>0?typeof _.command=="string"&&_.command.length>0?`${_.reason} \xB7 ${_.command}`:_.reason:u.cause;return i`<div class="detail-session__cause" title=${b}>
      ${u.cause}
    </div>`},l=u=>{let f=gl(Js(u));if(_t(f).length===0&&!jr(u.usage))return"";let _=s.has(u.attempt_id);return i`<button
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
      세션 이력${Bp(r.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${n.map(u=>{let f=Js(u),_=gl(f),b=_t(_);return i`<div class="detail-session-row">
          <button
            type="button"
            class="detail-session detail-session--${u.status||"unknown"}"
            data-attempt-id=${u.attempt_id}
            @click=${()=>t.onOpen&&t.onOpen(u.attempt_id)}
          >
            <span class="detail-session__glyph"
              >${Wp[u.status||""]||"\xB7"}</span
            >
            <span class="detail-session__id">${u.attempt_id}</span>
            ${gr(u)?i`<span
                  class="detail-session__resumed"
                  title=${gr(u)}
                  >↻</span
                >`:""}
            <span class="detail-session__meta">${Kt(u)}</span>
            ${b.length>0?i`<span class="detail-session__role">orchestrator</span>`:""}
            ${u.session_id?i`<span class="detail-session__sid" title=${u.session_id}
                  >${String(u.session_id).slice(0,8)}</span
                >`:""}
            ${b.length>0?b.map(A=>i`<span
                      class="detail-session__usage"
                      title=${A.tooltip}
                      >${A.label}</span
                    >`):jr(u.usage)?i`<span class="detail-session__usage"
                    >${jr(u.usage)}</span
                  >`:""}
            <span class="detail-session__time">${vl(u.started_at)}</span>
          </button>
          ${l(u)} ${a(u)} ${c(u)} ${zp(u)}
          ${s.has(u.attempt_id)&&u.usage?jp(u.usage,u.runner==="codex"?"codex":"claude"):""}
          ${Up(f)}
        </div>`})}
    </div>
  `}function yl(e,t={}){return i`
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
          ${Hp(e)}
        </div>`:""}
  `}function Hp(e){let t=Hr(e);if(t)return t;let r=e.data;if(!r)return"";if(r.missing)return i`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof r.default_task_prompt=="string"?cr("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",r.default_task_prompt):""}`;let n=us(r.recorded_at);return i`<div class="detail-prompt__meta">
      ${r.attempt_id}${n?` \xB7 ${n}`:""}
    </div>
    ${typeof r.task_prompt=="string"?cr("\uACFC\uC5C5 (user)",r.task_prompt):""}
    ${typeof r.system_prompt=="string"?cr("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",r.system_prompt):""}`}var Gp=["open","in_progress","deferred","resolved","closed"],Vp=[0,1,2,3,4];function kl(e,t){let r=t.issueStores,n=t.onClose,s=t.transport,o=t.onNavigate,a=t.queueStore,c=t.execPresetStore,l=t.sessionLogStore,u=null,f=null,_={},b="",A=!1,x=!1,L={},q=!1,S=!1,B="",Z="",y="";function k(){q=!1,S=!1,B="",Z="",y=""}let T=[],X=null,Y=null,ne=!1,be="",J=!1,ee=0,Ee=new Set;function je(){T=[],X=null,Y=null,ne=!1,be="",J=!1,ee+=1,Ee.clear()}async function et(d){if(!s)return;let $=++ee;try{let w=await Promise.resolve(s("get-comments",{id:d}));if($!==ee||d!==u)return;T=Array.isArray(w)?w:[],ne=!1}catch{if($!==ee||d!==u)return;ne=!0}m()}function Ne(){if(!s||!u)return;let d=f&&typeof f.comment_count=="number"?f.comment_count:null;if(X!==u){X=u,Y=d,et(u);return}d!==null&&d!==Y&&(Y=d,et(u))}function We(d){Ee.has(d)?Ee.delete(d):Ee.add(d),m()}function Ce(d){let $=be.trim().length===0;be=d,$!==(d.trim().length===0)&&m()}async function fe(){let d=be.trim();if(!s||!u||d.length===0||J)return;let $=u;J=!0,m();let w=!1;try{let M=await Promise.resolve(s("add-comment",{id:$,text:d}));Array.isArray(M)&&M.length>0&&(w=!0,$===u&&(T=M,ne=!1,be="",Y=M.length))}catch{w=!1}w||re("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),$===u&&(J=!1),m()}let Se={onToggle:We,onDraftInput:Ce,onSubmit:fe},he=document.createElement("div");he.className="md-viewer-root",document.body.appendChild(he);let H=ml(he,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),z=document.createElement("div");z.className="session-log-root",document.body.appendChild(z);let Ie=fs(z,{transport:s?(d,$)=>Promise.resolve(s(d,$)):void 0,sessionLogStore:l}),ie=!1,se=!1,E=!1,N=null,ue=null,Pe=0;function R(d){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${d}`}function U(){ie=!1,se=!1,E=!1,N=null,ue=null,Pe+=1}async function C(d){if(!s)return;let $=++Pe;se=!0,E=!1,m();try{let w=await Promise.resolve(s("get-bead-prompt",{bead_id:d}));if($!==Pe)return;!w||typeof w!="object"||Array.isArray(w)?E=!0:(N=w,ue=R(d))}catch{$===Pe&&(E=!0)}finally{$===Pe&&(se=!1,m())}}function Q(){if(ie=!ie,ie&&u&&ue!==R(u)){N=null,C(u);return}m()}function ae(){if(!a||!u)return[];let d=a.get();return(d&&d.attempts?Object.values(d.attempts):[]).filter(w=>w&&w.bead_id===u).sort((w,M)=>(M.started_at||0)-(w.started_at||0)).map(w=>({attempt_id:w.attempt_id,bead_id:w.bead_id,status:w.status,started_at:typeof w.started_at=="number"?w.started_at:null,runner:w.runner||null,model:w.model||null,effort:w.effort||null,speed:w.speed||null,session_id:w.session_id||null,resumed_from:w.resumed_from||null,continuation_mode:w.continuation_mode||null,dismissed_at:typeof w.dismissed_at=="number"?w.dismissed_at:null,cause:typeof w.cause=="string"?w.cause:null,cause_detail:w.cause_detail||null,exec_default_preset_id:typeof w.exec_default_preset_id=="string"?w.exec_default_preset_id:null,exec_default_preset_revision:typeof w.exec_default_preset_revision=="number"?w.exec_default_preset_revision:null,exec_values:w.exec_values&&typeof w.exec_values=="object"?w.exec_values:null,usage:w.usage||null,usage_legs:Array.isArray(w.usage_legs)?w.usage_legs:[]}))}function te(){if(!a||!u)return null;let d=a.get();return Lt(d&&d.attempts||{},u)}let le=new Set;function ve(d){le.has(d)?le.delete(d):le.add(d),m()}function I(d){let $=a?a.get():null,w=$&&$.attempts?$.attempts[d]:null;Ie.open({attempt_id:d,meta:w?{runner:w.runner||void 0,model:w.model||void 0,effort:w.effort||void 0,status:w.status||void 0,session_id:w.session_id||void 0}:{}})}async function K(d){if(!s||!d)return;let $=()=>{let ke=a?a.get():null;return ke&&typeof ke.revision=="number"?ke.revision:0},w=async(ke={})=>await s("worker-attempt-resume",{attempt_id:d,expected_revision:$(),...ke}),M=ke=>{ke?.queue&&a?.set&&a.set(ke.queue)},de=await w();if(M(de),de&&de.conflict){let ke=de.queue&&typeof de.queue.revision=="number"?de.queue.revision:$();de=await s("worker-attempt-resume",{attempt_id:d,expected_revision:ke}),M(de)}de=await sr(de,(ke,it)=>w({continuation:ke,decision_token:it}),{onResult:M,refresh:()=>w()}),de&&de.resumed===!1&&!de.conflict&&de.reason&&re(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${de.reason}`,"error",2400)}let pe={onOpen:I,onResume:K,onToggleUsage:ve};function Re(){let d=a?a.get():null,$={...L};for(let w of["orchestration_model","orchestration_effort","orchestration_speed"]){let M=d&&d[w];typeof M=="string"&&($[w]=M)}return $}async function Le(){if(s){try{let d=await Promise.resolve(s("get-session-defaults",{}));L=d&&d.values&&typeof d.values=="object"?d.values:{}}catch{L={}}m()}}function Me(){let d=a?a.get():null;return d&&d.runner_catalog||null}function tt(){let d=f?.metadata&&typeof f.metadata=="object"?f.metadata:{},w=(Object.hasOwn(_,"orchestration_model")?_.orchestration_model:void 0)||(typeof d.orchestration_model=="string"?d.orchestration_model:"")||(typeof Re().orchestration_model=="string"?Re().orchestration_model:"")||"opus";return Ao(Me(),w)}function Ye(){let d=c?c.get():null;return!d||typeof d.revision!="number"?null:{revision:d.revision,presets:Array.isArray(d.presets)?d.presets:[]}}function Qe(d){return d?.compatible===!1}function At(d){c&&d&&typeof d.revision=="number"&&Array.isArray(d.presets)&&c.set({revision:d.revision,presets:d.presets})}async function Tt(){let d=Ye(),$=d?.presets.find(w=>w.id===b);if(!(!s||!u||!d||!$||Qe($)||A)){A=!0,m();try{let w=await Promise.resolve(s("apply-impl-preset",ll(u,$.id,d.revision)));if(w&&w.conflict){At(w),re("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let M=w&&Array.isArray(w.issue)?w.issue[0]:w?.issue;if(w&&w.applied&&M&&typeof M=="object"){f=M;for(let de of ul)delete _[de];re("\uAD6C\uD604 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",2400);return}w&&w.error==="bd_readback_failed"?re("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):re("\uAD6C\uD604 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(w){w&&typeof w=="object"&&w.code==="bd_readback_failed"?re("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):re("\uAD6C\uD604 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{A=!1,m()}}}let lt=null;r&&r.subscribe&&(lt=r.subscribe(()=>ot()));let yt=null;a&&typeof a.subscribe=="function"&&(yt=a.subscribe(()=>{u&&m()}));let $t=null;c&&typeof c.subscribe=="function"&&($t=c.subscribe(()=>{u&&m()}));function rt(d){d.key==="Escape"&&u&&(d.preventDefault(),n())}document.addEventListener("keydown",rt);function ot(){if(u){if(r&&typeof r.snapshotFor=="function"){let d=r.snapshotFor("detail:"+u)||[];f=d.find(w=>w&&w.id===u)||d[0]||f}Ne(),m()}}function Ze(d){Rr(d).then($=>{$?re("\uBCF5\uC0AC\uB428","success",1200):re("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function at(d){d.preventDefault(),d.stopPropagation(),u&&Ze(u)}function pt(d,$){d.preventDefault(),d.stopPropagation(),Ze($)}function F(d,$,w){d.preventDefault(),d.stopPropagation(),H.open($,{missing_state:w})}function V(d,$){_[d]=$,m(),!(!s||!u)&&Promise.resolve(s("update-exec-settings",il(u,d,$.length===0?null:$))).catch(()=>{re("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}function _e(d,$){let w=f||{},M=w.metadata&&typeof w.metadata=="object"?w.metadata:{},de={};for(let Oe of["impl_runtime","impl_model","impl_effort"])de[Oe]=Object.hasOwn(_,Oe)?_[Oe]:typeof M[Oe]=="string"?M[Oe]:"";de[d]=$;let ke=_l(de,Me(),tt()),it={};for(let Oe of["impl_runtime","impl_model","impl_effort"])it[Oe]=_[Oe],_[Oe]=ke[Oe]||"";m(),!(!s||!u)&&Promise.resolve(s("update-impl-target",{id:u,...ke,orchestration_runtime:tt()})).then(Oe=>{let me=Array.isArray(Oe)?Oe[0]:Oe;if(!me||typeof me!="object"||!me.id)throw new Error("implementation target readback failed");f=me;for(let Je of["impl_runtime","impl_model","impl_effort"])delete _[Je];m()}).catch(()=>{for(let Oe of["impl_runtime","impl_model","impl_effort"])it[Oe]===void 0?delete _[Oe]:_[Oe]=it[Oe];m(),re("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error")})}async function G(d,$,w){if(!s||!u)return!1;try{let M=await Promise.resolve(s(d,$)),de=Array.isArray(M)?M[0]:M;return de&&typeof de=="object"&&de.id?(f=de,!0):(re(w,"error"),!1)}catch{return re(w,"error"),!1}}function we(d){setTimeout(()=>{try{let $=e.querySelector(d);$&&typeof $.focus=="function"&&$.focus()}catch{}},0)}function Ae(){q=!0,B=f&&f.title||"",m(),we('.detail-edit__input[data-edit="title"]')}function qe(d){B=d.target.value}function Xe(){q=!1,B="",m()}function ye(){G("edit-text",{id:u,field:"title",value:B},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then($=>{$&&(q=!1,B=""),m()})}function ze(){S=!0,Z=f&&f.description||"",m(),we('.detail-edit__textarea[data-edit="description"]')}function $e(d){Z=d.target.value}function ct(){S=!1,Z="",m()}function mt(){G("edit-text",{id:u,field:"description",value:Z},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then($=>{$&&(S=!1,Z=""),m()})}function Ht(d,$,w,M){if(d.key==="Escape"){d.stopPropagation(),w();return}d.key==="Enter"&&(!M||d.ctrlKey||d.metaKey)&&(d.preventDefault(),$())}function Qt(d){let $=d.target.value;G("update-status",{id:u,status:$},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>m())}function Jt(d){let $=Number(d.target.value);G("update-priority",{id:u,priority:$},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>m())}function ft(d){y=d.target.value}function gt(){let d=y.trim();d.length!==0&&G("label-add",{id:u,label:d},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then($=>{$&&(y=""),m()})}function Mt(d){if(d.key==="Escape"){d.stopPropagation(),y="",m();return}d.key==="Enter"&&(d.preventDefault(),gt())}function Gt(d){G("label-remove",{id:u,label:d},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>m())}let Et={onCopyPath:pt,onOpenDoc:F};function er(d){return typeof d=="string"?d:d&&typeof d=="object"?String(d.id||d.to||d.issue_id||d.depends_on||""):""}function Te(d){switch(d&&typeof d=="object"?String(d.dependency_type||d.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function p(d){let w=(Array.isArray(d.dependencies)?d.dependencies:[]).map(M=>({id:er(M),icon:Te(M)})).filter(M=>M.id.length>0);return i`
      <div class="detail-section-label">의존성</div>
      ${w.length===0?i`<div class="detail-empty">의존성 없음</div>`:i`<div class="detail-deps">
            ${w.map(M=>o?i`<button
                    type="button"
                    class="detail-dep detail-dep--link"
                    @click=${()=>o(M.id)}
                  >
                    ${M.icon?`${M.icon} `:""}${M.id}
                  </button>`:i`<span class="detail-dep"
                    >${M.icon?`${M.icon} `:""}${M.id}</span
                  >`)}
          </div>`}
    `}function v(d){let $=d.metadata||{},w=d.workflow||{},M=w.stages||{},de=M.spec&&M.spec.stale,ke=M.impl&&M.impl.stale,it=M.plan||null,Oe=w.route_source==="derived",me=w.route||$.route||"\u2014";return i`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${Oe?" detail-kv__v--derived":""}"
          title=${Oe?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${Oe?"unset":me}</span
        >
      </div>
      ${w.route!=="quick_fix"||Object.hasOwn($,"spec_review")?i`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${$.spec_review||"\uC5C6\uC74C"}${de?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${w.route==="full_plan"?i`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${it?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${it?.approval_receipt||"\uC5C6\uC74C"}${it?.approval_state==="stale"?" \xB7 stale":it?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${w.route!=="quick_fix"||Object.hasOwn($,"impl_review")?i`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${$.impl_review||"\uC5C6\uC74C"}${ke?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${w.exec_receipt?i`<div class="detail-kv">
            <span class="detail-kv__k">exec_receipt</span>
            <span class="detail-kv__v detail-kv__v--wrap"
              >${`${w.exec_receipt.kind}:${w.exec_receipt.actor}@${w.exec_receipt.sha}`}</span
            >
          </div>`:""}
      ${w.impl_entry?i`<div class="detail-kv">
            <span class="detail-kv__k">impl_entry</span>
            <span class="detail-kv__v"
              >${`${w.impl_entry.actor}@${w.impl_entry.sha}`}</span
            >
          </div>`:""}
      ${$.pr_url?i`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${$.pr_url}</span>
          </div>`:""}
    `}let O={route:["quick_fix","spec_backed","full_plan"]};async function ce(d,$){let w=$.target.value;if(d==="route"&&f&&f.metadata&&f.metadata.route==="full_plan"&&w!=="full_plan"&&!window.confirm(`full_plan \u2192 ${w||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){m();return}await G("update-workflow-meta",{id:u,key:d,value:w},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),m()}function ge(d){let $=d.metadata||{};return i` ${((M,de)=>{let ke=O[M],it=typeof $[M]=="string"?$[M]:"";return i`<div class="detail-kv">
        <span class="detail-kv__k">${M}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${M}
          data-edit=${`wfmeta-${M}`}
          @change=${Oe=>ce(M,Oe)}
        >
          <option value="" ?selected=${!ke.includes(it)}>
            ${de}
          </option>
          ${ke.map(Oe=>i`<option value=${Oe} ?selected=${it===Oe}>${Oe}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function j(d,$){return q?i`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${B}
            @input=${qe}
            @keydown=${w=>Ht(w,ye,Xe,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${ye}
            >
              저장
            </button>
            <button
              type="button"
              class="detail-edit__cancel"
              data-edit="title-cancel"
              @click=${Xe}
            >
              취소
            </button>
          </div>
        </div>
      `:i`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${d}</h2>
        ${_t($).map(w=>i`<span class="detail-usage-total" title=${w.tooltip}
              >${w.label}</span
            >`)}
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${Ae}
        >
          ✎
        </button>
      </div>
    `}function g(d){let $=dt(d.created_at),w=dt(d.updated_at);return!$&&!w?i``:i`
      ${$?i`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${$}</span>
          </div>`:""}
      ${w?i`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${w}</span>
          </div>`:""}
    `}function P(d,$){return i`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${Qt}
        >
          ${Gp.map(w=>i`<option value=${w} ?selected=${w===d}>${w}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${Jt}
        >
          ${Vp.map(w=>i`<option value=${String(w)} ?selected=${w===$}>
                P${w}
              </option>`)}
        </select>
      </div>
    `}function W(d){return i`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${S?"":i`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${ze}
            >
              ✎
            </button>`}
      </div>
      ${S?i`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${Z}
              @input=${$e}
              @keydown=${$=>Ht($,mt,ct,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${mt}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${ct}
              >
                취소
              </button>
            </div>
          </div>`:i`<div class="detail-overlay__desc">
            ${d||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function xe(d){let $=typeof d.notes=="string"?d.notes:"";return $.trim().length===0?i``:i`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${$}</div>
    `}function Ge(d){let $=Array.isArray(d.labels)?d.labels:[];return i`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${$.map(w=>i`<span class="detail-label-chip"
              >${w}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${w}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+w}
                @click=${()=>Gt(w)}
              >
                ×
              </button></span
            >`)}
        <span class="detail-label-add">
          <input
            class="detail-label-add__input"
            aria-label="라벨 추가"
            placeholder="라벨 추가"
            .value=${y}
            @input=${ft}
            @keydown=${Mt}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${gt}
          >
            추가
          </button>
        </span>
      </div>
    `}function Be(){if(!u)return i``;let d=f||{},$=String(d.id||u),w=d.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",M=te(),de=d.status||"open",ke=typeof d.priority=="number"?Math.max(0,Math.min(4,d.priority)):"",it=d.description||"",Oe={...d,metadata:{...d.metadata||{},..._}};return i`
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
            @click=${at}
          >
            ${$}
          </button>
          ${j(w,M)}
          ${dl(Oe)}
          ${cl({metadata:Oe.metadata,workspace_values:Re(),catalog:Me(),expanded:x,presets:Ye()?.presets||[],preset_id:b,preset_busy:A},{onToggle:()=>{x=!x,m()},onEdit:(me,Je)=>{if(me==="impl_runtime"||me==="impl_model"||me==="impl_effort"){_e(me,Je??"");return}V(me,Je??"")},onPresetSelect:me=>{b=me,m()},onPresetApply:()=>{Tt()}})}
          ${P(de,ke)} ${g(d)}
          ${W(it)}
          ${Xi(T,Se,{expanded:Ee,draft:be,sending:J,error:ne})}
          ${xe(d)} ${Ge(d)} ${p(d)}
          ${v(d)} ${ge(d)}
          ${Yi(d,Et)}
          ${yl({expanded:ie,loading:se,error:E,data:N},{onToggle:Q})}
          ${wl(ae(),pe,{total:M,expanded:le})}
        </div>
      </div>
    `}function m(){Fe(Be(),e)}return{load(d){d!==u&&(_={},b="",x=!1,k(),je(),U()),u=d,f=null,ot(),Le()},clear(){u=null,f=null,_={},b="",A=!1,k(),je(),U(),H.close(),Ie.close(),Fe(i``,e)},destroy(){lt&&(lt(),lt=null),yt&&(yt(),yt=null),$t&&($t(),$t=null),document.removeEventListener("keydown",rt),H.destroy(),he.parentNode&&he.parentNode.removeChild(he),Ie.destroy(),z.parentNode&&z.parentNode.removeChild(z),u=null,f=null,b="",A=!1,je(),U(),Fe(i``,e)}}}function $l(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let r=t.querySelector("#fatal-error-title"),n=t.querySelector("#fatal-error-message"),s=t.querySelector("#fatal-error-detail"),o=t.querySelector("#fatal-error-reload"),a=t.querySelector("#fatal-error-close"),c=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},l=(u,f,_="")=>{r&&(r.textContent=u||"Unexpected Error"),n&&(n.textContent=f||"An unrecoverable error occurred.");let b=typeof _=="string"?_.trim():"";if(s&&(b.length>0?(s.textContent=b,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),a&&a.addEventListener("click",()=>c()),t.addEventListener("cancel",u=>{u.preventDefault(),c()}),{open:l,close:c,getElement(){return t}}}function Ss(e){return typeof e=="string"&&e.length>=7?e.slice(0,7):"\u2014"}function To(e){if(typeof e!="number"||!Number.isFinite(e)||e<0)return"\u2014";if(e<1e3)return`${Math.round(e)}ms`;let t=e/1e3;if(t<60)return`${t.toFixed(1)}\uCD08`;let r=Math.floor(t/60);return`${r}\uBD84 ${Math.round(t-r*60)}\uCD08`}function As(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";let t=new Date(e);return`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`}function Yp(e,t){let r=Array.isArray(e)?e:[],n=Array.isArray(t)?t:[];if(r.length===0&&n.length===0)return null;let s=null;for(let c of r)c.kind!=="deploy"||c.state!=="succeeded"||typeof c.target_sha!="string"||(!s||(typeof c.finished_at=="number"?c.finished_at:0)>(typeof s.finished_at=="number"?s.finished_at:0))&&(s=c);let o=r.filter(c=>c.state==="failed"&&!c.dismissed&&!c.superseded_by).length+n.length,a=r.some(c=>c.state==="repairing");return{deploy:s?{sha:Ss(s.target_sha),at:typeof s.finished_at=="number"?s.finished_at:null,elapsed_ms:typeof s.elapsed_ms=="number"?s.elapsed_ms:null}:null,unresolved:o,repairing:a,badge:o>0?{tone:"act",label:`\uD574\uACB0 \uD544\uC694 ${o}`}:a?{tone:"live",label:"\uC790\uB3D9 \uD574\uACB0 \uC911"}:{tone:"quiet",label:"\uBAA8\uB450 \uC815\uC0C1"}}}function xl(e,t){let r=Yp(e,t);return r?i`<button
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
            title=${r.deploy.at?dt(r.deploy.at):""}
            >${As(r.deploy.at)}${r.deploy.elapsed_ms!==null?` \xB7 ${To(r.deploy.elapsed_ms)}`:""}</span
          >
        </span>`:""}
    <span class="worker-repo-strip__spacer"></span>
    <span
      class="worker-repo-strip__badge worker-repo-strip__badge--${r.badge.tone}"
      >${r.badge.label}</span
    >
  </button>`:""}function Yr(e){let t=St(e.created_at),r=St(e.updated_at);return!t&&!r?"":i`<div class="worker-mini__meta">
    ${t?i`<span title=${`\uC0DD\uC131 ${dt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&r?i`<span>·</span>`:""}${r?i`<span title=${`\uC218\uC815 ${dt(e.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </div>`}function Kp(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function yn(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function Ts(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function Zt(e,t,r={}){let s=Object.values(e&&typeof e=="object"?e:{}).filter(f=>f&&f.bead_id===t&&f.phase!=="done").sort((f,_)=>(f.requested_at||0)-(_.requested_at||0)).at(-1),o=typeof r.attempt_id=="string"&&r.attempt_id.length>0?r.attempt_id:typeof s?.attempt_id=="string"?s.attempt_id:null,a=r.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":r.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":r.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,c=typeof s?.last_error=="string"?s.last_error:null,l=s?Kp(s.phase):null,u=r.merged||s?.mode==="merged_revert"?"merged":"unmerged";return{action:!r.external&&!r.done,enabled:!a&&(!s||!!c),label:c?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:a||(c?`\uD3D0\uAE30 \uC2E4\uD328: ${c} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:s?`${l||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:u==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:o,operation:s||null,progress:l,error:c,confirmation:u}}function ur(e){let t=e.discard;if(!t||!t.operation)return"";let r=t.operation,n=r.backup?.path,s=r.original_pr,o=r.revert_pr;return i`<div
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
  </div>`}function Eo(e){let t=e.draggable&&!e.done,r=Array.isArray(e.badges)?e.badges:[],n=_t(e.usage),s=qt(e.usage),o=e.merge_step||null,a=e.lane==="pr_wait"||!!e.revise_action,c=e.lane==="done"&&!a,l=c?St(e.done_at):"",u=e.selectable?i`<input
        class="worker-mini__select"
        type="checkbox"
        data-bead-id=${e.id}
        aria-label=${`${e.id} \uC120\uD0DD`}
        .checked=${e.selected===!0}
      />`:"",f=t?i`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",_=e.worker_serial===!0?i`<span class="worker-mini__serial">머지까지 단독</span>`:e.worker_serial===null?i`<span class="worker-mini__serial worker-mini__serial--unknown"
            >실행 방식 확인 중</span
          >`:"",b=e.workspace_name?i`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",A=i`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,x=i`<span class="worker-mini__title">${e.title}</span>`,L=e.pr_url&&e.pr_number?i`<a
          class="worker-mini__pr"
          href=${e.pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="PR 열기"
          >#${e.pr_number} ↗</a
        >`:"",q=e.completion_repair_pr_url&&e.completion_repair_pr_number?i`<a
          class="worker-mini__pr worker-mini__repair-pr"
          href=${e.completion_repair_pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="repair PR 열기"
          >repair #${e.completion_repair_pr_number} ↗</a
        >`:"",S=r.map(ee=>ee===e.live_badge?i`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${ee}</span
        >`:i`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${ee===e.completion_badge&&e.completion_title||""}
          >${ee}</span
        >`),B=e.reason?i`<span class="worker-mini__reason">${e.reason}</span>`:"",Z=n.length>0?n.map(ee=>i`<span class="worker-usage" title=${ee.tooltip}
              >${ee.label}</span
            >`):s?i`<span class="worker-usage" title=${Wr(e.usage)}
            >${s}</span
          >`:"",y=o?i`<span class="merge-step"
        >${o.label}<span class="merge-step__n"
          >${o.index}/${o.total}</span
        ></span
      >`:"",k=e.merge_action?i`<button
        type="button"
        class="worker-mini__merge"
        data-bead-id=${e.id}
        ?disabled=${e.merge_enabled===!1}
        title=${e.merge_title||""}
      >
        ${e.merge_label||"\uBA38\uC9C0"}
      </button>`:"",T=e.cancel_action?i`<button
        type="button"
        class="worker-mini__merge-cancel"
        data-bead-id=${e.id}
        ?disabled=${e.cancel_enabled===!1}
        title=${e.cancel_title||""}
      >
        취소
      </button>`:"",X=e.timeline_action?i`<button
        type="button"
        class="worker-mini__timeline"
        data-bead-id=${e.id}
        title="저장소 작업이 끝나지 않아 머지 액션이 잠겼습니다 — 타임라인에서 원인과 해결 버튼을 볼 수 있습니다"
      >
        저장소 작업 보기
      </button>`:"",Y=e.discard,ne=Y?.action||e.discard_action?i`<button
          type="button"
          class="worker-mini__discard"
          data-bead-id=${e.id}
          data-attempt-id=${Y?.attempt_id||""}
          data-operation-id=${Y?.operation?.operation_id||""}
          data-discard-mode=${Y?.confirmation||"unmerged"}
          ?disabled=${Y?!Y.enabled:e.discard_enabled===!1}
          title=${Y?Y.title:e.discard_enabled===!1?e.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
        >
          ${Y?.label||"\uD3D0\uAE30"}
        </button>`:"",be=e.revise_action?i`<button
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
        </button>`:"",J=!!(s||o||e.merge_action||e.cancel_action||e.timeline_action||e.discard_action||Y?.operation||e.revise_action);return i`<div
    class="worker-mini${a?" worker-mini--card":""}${e.selected?" worker-mini--selected":""}${t?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${o?" worker-mini--merging":""}${e.external?" worker-mini--external":""}"
    style=${o?`--progress: ${o.percent}%`:""}
    draggable=${t?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${c?i`<div class="worker-mini__row1">${b}${A}${x}</div>
          <div class="worker-mini__row2">
            ${Z}${l?i`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${dt(e.done_at)}`}
                  >완료 ${l}</span
                >`:""}${S}${y}
            <span class="worker-mini__actions"
              >${k}${T}${X}${ne}</span
            >
            ${Yr(e)}
          </div>`:a?i`<div class="worker-mini__head">
              ${u}${f}${b}${A}${L}${q}${S}${_}${B}
            </div>
            <div class="worker-mini__body">${x}</div>
            ${J?i`<div class="worker-mini__foot">
                  ${Z}${y}
                  <span class="worker-mini__actions"
                    >${k}${T}${X}${ne}${be}</span
                  >
                  ${ur(e)}
                </div>`:""}
            ${Yr(e)}`:i`<div class="worker-mini__line">
              ${u}${f}${b}${A}${x}${L}${q}${S}${_}${B}${Z}${y}${k}${T}${X}${ne}
            </div>
            ${ur(e)} ${Yr(e)}`}
  </div>`}function Zp(e){let t=e.draggable&&!e.done,r=e.workflow,n=r&&r.chips||{},s=n.route||r&&r.route,o=n.route_source==="derived"||!!(r&&r.route_source==="derived"),a=e.is_quick_fix===!0||!!r&&r.route==="quick_fix",c=typeof e.reason=="string"&&e.reason.startsWith("\u26D4");return i`<div
    class="worker-card${t?"":" worker-card--static"}"
    draggable=${t?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    <div class="worker-card__head">
      ${t?i`<span class="worker-card__grip" aria-hidden="true">⠿</span>`:""}
      ${e.workspace_name?i`<span class="worker-card__repo" title=${e.root_dir||""}
            >${e.workspace_name}</span
          >`:""}
      <span class="worker-card__id" title="클릭하면 ID 복사">${e.id}</span>
      ${r&&s?i`<span
            class="ctl-chip ctl-chip--route${o?" is-derived":""}"
            title=${o?"route \uBBF8\uD540 (metadata unset)":"route"}
            >${o?"unset":s}</span
          >`:""}
    </div>
    <div class="worker-card__title">${e.title}</div>
    ${r?Zn(r,e.status):""}
    <div
      class="worker-card__foot${e.reason?"":" worker-card__foot--actions-only"}"
    >
      ${e.reason?i`<span
            class="worker-card__reason${c?" worker-card__reason--danger":""}"
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
    ${Yr(e)}
  </div>`}function Xt(e){let t=!!e.collapsible&&!!e.collapsed,r=i`<span
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
                  </div>`:e.items.map(n=>e.lane==="candidate"?Zp(n):Eo(n))}
          </div>`}
  </section>`}var Sl=[{step:"merging",label:"\uBA38\uC9C0 \uC911",index:1},{step:"base_containment",label:"base \uD3EC\uD568 \uD655\uC778",index:2},{step:"repo_operations",label:"\uC800\uC7A5\uC18C \uC791\uC5C5",index:3},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC",index:4},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC",index:5},{step:"parent_close",label:"\uBD80\uBAA8 close",index:6}],kn=Sl.filter(e=>e.step!=="merging").map(e=>({step:e.step,label:e.label}));function Co(e){if(typeof e!="string"||e.length===0)return null;let t=6,r=Sl.find(n=>n.step===e);return r?{label:r.label,index:r.index,total:t,percent:Math.round(r.index/t*100)}:{label:e,index:0,total:t,percent:0}}function Al(e){let t=kn.findIndex(r=>r.step===e);return kn.map((r,n)=>({step:r.step,label:r.label,state:t<0?"todo":n<t?"done":n===t?"stall":"todo"}))}function Or(e){let t=kn.find(r=>r.step===e);return t?t.label:typeof e=="string"?e:""}function Xp(e){let t=kn.findIndex(r=>r.step===e);return t<0?null:{index:t+1,total:kn.length}}function Es(e){let t=Xp(e);return t?`\uBA38\uC9C0 \uC644\uB8CC \xB7 \uC815\uB9AC ${t.total}\uB2E8\uACC4 \uC911 ${t.index}\uB2E8\uACC4\uC5D0\uC11C \uBA48\uCDA4`:"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644"}var Tl={verify_failed:"\uAC80\uC99D \uC2E4\uD328",verify_cmd_failed:"\uAC80\uC99D \uC2E4\uD328",verify_script_failure:"\uAC80\uC99D \uC2E4\uD328",deploy_failed:"\uBC30\uD3EC \uC2E4\uD328",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328",interrupted_without_terminal_exit:"\uC911\uB2E8\uB428"},El={repo_ops_worktree_unowned:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uAC00 \uC544\uC9C1 Worker \uC18C\uC720\uAC00 \uC544\uB2C8\uC5B4\uC11C \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804\uC5D0 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",verify_cmd_failed:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D \uBA85\uB839\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",gh_observation_failed:"GitHub\uC5D0\uC11C PR \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_script_failure:"\uAC80\uC99D \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",deploy_script_failure:"\uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",interrupted_without_terminal_exit:"\uC791\uC5C5\uC774 \uC885\uB8CC \uAE30\uB85D \uC5C6\uC774 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4."};function Cl(e){return typeof e!="string"||e.length===0?[]:e.split(":").filter(t=>t.length>0)}function Ro(e){for(let t of Cl(e))if(Object.hasOwn(Tl,t))return Tl[t];return null}function Io(e){let t=null;for(let r of Cl(e))Object.hasOwn(El,r)&&(t=El[r]);return t}function Cs(e){let t=Ro(e),r=Io(e);return t&&r?`${t} \u2014 ${r}`:t||r?t||r:typeof e=="string"?e:""}function Rl(e,t){let r=Ro(e)??Ro(t),n=Io(t)??Io(e);return r&&n?`${r} \u2014 ${n}`:r||n?r||n:typeof t=="string"?t:""}var Il=160;function Qp(e){return e.length>Il?`${e.slice(0,Il)}\u2026`:e}function Jp(e){return!e||!e.reason?"":i`<div class="worker-banner__detail">
    가드:
    ${e.reason}${e.command?i` · <code>${Qp(e.command)}</code>`:""}
  </div>`}function ef(e){return e?i`<details class="worker-banner__raw">
    <summary>세부</summary>
    <dl class="worker-banner__kv">
      <div>
        <dt>실패 코드</dt>
        <dd>${e}</dd>
      </div>
    </dl>
  </details>`:""}function Lo(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),r=Math.floor(t/60),n=t%60;return r>0?`${r}m ${String(n).padStart(2,"0")}s`:`${n}s`}function Ll(e){let t=e.failure?Cs(e.failure.reason):"";return i`<div class="worker-banners">
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
                title="이 실패를 처리 완료로 표시하고 배너를 닫습니다"
                aria-label="배너 닫기"
              >
                ✕
              </button>`:""}
          ${Jp(e.failure.cause_detail)}
          ${ef(e.failure.reason)}
          ${ur({discard:e.failure.discard})}
        </div>`:""}
  </div>`}function tf(e,t,r=null){let n=e.failed===!0,s=!!e.paused,o=n?e.status_label||(e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):s?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?Lo(t-e.started_at):"\u2014",a=Kt(e),c=gr(e),l=_t(e.usage),u=qt(e.usage),f=e.conflict_resolution?s?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,_=e.base_exception||null,b=e.attempt_id&&e.attempt_id===r,A=e.discard?.action?i`<button
        type="button"
        class="rtile__discard"
        data-operation-id=${e.discard.operation?.operation_id||""}
        ?disabled=${!e.discard.enabled}
        title=${e.discard.title}
        aria-label=${e.discard.label}
      >
        ${e.discard.label}
      </button>`:"";return i`<div
    class="rtile${b?" rtile--sel":""}${s?" rtile--paused":""}${n?" rtile--failed":""}"
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
              title="실패 기록 닫기"
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
    ${a||l.length>0||u||f||_?i`<div class="rtile__meta">
          ${f?i`<span class="worker-mini__badge">${f}</span>`:""}
          ${_?i`<span
                class="worker-mini__badge"
                title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
                >${_}</span
              >`:""}
          ${a?i`<span class="rtile__runner">${a}</span>`:""}
          ${l.length>0?l.map(x=>i`<span class="worker-usage" title=${x.tooltip}
                    >${x.label}</span
                  >`):u?i`<span
                  class="worker-usage"
                  title=${Wr(e.usage)}
                  >${u}</span
                >`:""}
        </div>`:""}
    ${Yr(e)} ${ur(e)}
    <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일): 큐
         스냅샷에는 페이즈명도 진행률도 없으므로 진행 바는 만들지 않는다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
    ${n||s?"":i`<div class="rtile__accent" aria-hidden="true"></div>`}
  </div>`}function Oo(e,t=Date.now(),r=null){let n=Array.isArray(e)?e:[];return i`<div class="worker-rungrid" id="worker-rungrid">
    ${n.length===0?i`<div class="worker-rungrid__empty">실행 세션 없음</div>`:n.map(s=>tf(s,t,r))}
  </div>`}function Dr(e){return i`<svg
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
  </svg>`}function Do(){return Dr(fr`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function Po(){return Dr(fr`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function Ol(){return Dr(fr`<rect x="4.3" y="4.3" width="7.4" height="7.4" rx="1.2" />`)}function Dl(){return Dr(fr`<path d="M4.4 4.4 11.6 11.6M11.6 4.4 4.4 11.6" />`)}function Pl(){return Dr(fr`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function Ml(){return Dr(fr`<rect x="2.6" y="2.6" width="7.4" height="7.4" rx="1.2" />
    <path d="M6 13.4h6a1.4 1.4 0 0 0 1.4-1.4V6" />`)}function Nl(){return Dr(fr`<path d="M3 3.6 8.2 8 3 12.4z" />
    <path d="M8.8 3.6 14 8l-5.2 4.4z" />`)}var $n=1,rf=6e4,nf={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328"},sf=new Set(["auto_merge","merged","merge","done"]),Fl={running:3,paused:2,failed:1};function of(e,t){let r=null,n=-1/0;for(let s of Object.values(e)){if(!s||s.bead_id!==t||s.status==="running")continue;let o=typeof s.finished_at=="number"?s.finished_at:typeof s.started_at=="number"?s.started_at:0;o>=n&&(n=o,r=s)}return r}function af(e,t){let r=Object.values(e||{}),n=new Set,s=new Map;for(let a of r)!a||typeof a.bead_id!="string"||(typeof a.resumed_from=="string"&&a.resumed_from.length>0&&n.add(a.resumed_from),s.set(a.bead_id,a.attempt_id));let o=new Map;for(let a of r){if(!a||typeof a.bead_id!="string"||a.bead_id.length===0)continue;let c=null;if(a.status==="running")c="running";else if(a.status==="paused"&&!n.has(a.attempt_id))c="paused";else if(a.status==="failed"||a.status==="orphaned"){let _=t.get(a.bead_id),b=typeof _=="number"&&_>0&&typeof a.finished_at=="number"&&_>=a.finished_at;s.get(a.bead_id)===a.attempt_id&&!b&&typeof a.dismissed_at!="number"&&(c="failed")}if(!c)continue;let l=typeof a.started_at=="number"?a.started_at:null,u=o.get(a.bead_id);if(u){let _=Fl[u.run_state],b=Fl[c];if(_>b||_===b&&(u.started_at??0)>(l??0))continue}let f=typeof a.session_id=="string"&&a.session_id.length>0;o.set(a.bead_id,{attempt_id:typeof a.attempt_id=="string"?a.attempt_id:"",run_state:c,started_at:l,last_event_at:typeof a.last_event_at=="number"?a.last_event_at:null,runner:typeof a.runner=="string"?a.runner:null,model:typeof a.model=="string"?a.model:null,effort:typeof a.effort=="string"?a.effort:null,speed:typeof a.speed=="string"?a.speed:null,resumed_from:typeof a.resumed_from=="string"?a.resumed_from:null,continuation_mode:a.continuation_mode==="session"||a.continuation_mode==="fresh"?a.continuation_mode:null,usage:Lt(e,a.bead_id),can_pause:c==="running"&&f,can_resume:c!=="running"&&f&&!n.has(a.attempt_id)})}return o}function ql(e,t){let r=e[t];if(!r)return"";if(r.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let n=typeof r.reason=="string"?r.reason:"",s=n.indexOf(":");return s>0&&s<n.length-1?`\u26D4 ${n.slice(0,s)} (${n.slice(s+1)})`:`\u26D4 ${n}`}function Pt(e){return e&&typeof e=="object"?e:{}}function Mo(e,t,r){let n=Array.isArray(e)?e:[],s=Array.isArray(t)?t:[],o=r&&typeof r.done_since=="number"?r.done_since:void 0,a=new Map;for(let S of s)S&&typeof S.root_dir=="string"&&a.set(S.root_dir,S);let c=[],l=[],u=[],f=[],_=[],b=new Map;for(let S of n){if(!S||typeof S.root_dir!="string")continue;let B=S.root_dir,Z=S.name||B,y=a.get(B),k=y&&typeof y.revision=="number"?y.revision:typeof S.revision=="number"?S.revision:0,T=Pt(S.attempts),X=Pt(S.bead_titles),Y=Pt(S.pr_observations),ne=Pt(S.admission),be=Pt(S.revise_parked),J=Pt(S.merge_queue_state),ee=Pt(S.cleanup_failed),Ee=Pt(S.discard_operations),je=Array.isArray(S.merge_queue)?S.merge_queue:[],et=new Set(je.filter(H=>H&&typeof H.bead_id=="string").map(H=>H.bead_id)),Ne=new Map(je.filter(H=>H&&typeof H.bead_id=="string").map(H=>[H.bead_id,H])),We=Array.isArray(S.queue)?S.queue:[],Ce=Array.isArray(S.done)?S.done:[],fe=new Map;for(let H of Ce)H&&typeof H.bead_id=="string"&&typeof H.added_at=="number"&&fe.set(H.bead_id,H.added_at);let Se=H=>({id:H,title:X[H]||H,root_dir:B,workspace_name:Z,expected_revision:k,draggable:!1}),he=new Set;for(let[H,z]of af(T,fe))he.add(H),l.push({...Se(H),lane:"running",attempt_id:z.attempt_id,run_state:z.run_state,can_pause:z.can_pause,can_resume:z.can_resume,started_at:z.started_at,last_event_at:z.last_event_at,runner:z.runner,model:z.model,effort:z.effort,speed:z.speed,resumed_from:z.resumed_from,continuation_mode:z.continuation_mode,usage:z.usage,discard:Zt(Ee,H,{attempt_id:z.attempt_id}),badges:z.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:z.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:[],alert:z.run_state==="failed"});for(let H of Array.isArray(S.pr_wait)?S.pr_wait:[]){let z=H&&H.bead_id;if(typeof z!="string"||he.has(z))continue;he.add(z);let Ie=Pt(Y[z]),ie=Pt(Ie.pr),se=Ie.gate?Pt(Ie.gate):null,E=et.has(z),N=Ne.get(z)?.continuation_action||null,ue=!!N&&N.continuation===null,Pe=J.active===z,R=H.external===!0,U=ee[z]||null,C=!!se&&se.base_badge==="\uCDA9\uB3CC",Q=!!U&&["child_sweep","branch_cleanup","parent_close"].includes(U.step)&&!!se&&se.tier==="merged",ae=R&&!!U&&!!se&&se.tier==="merged",te=!!se&&["closed_unmerged","review","undecidable"].includes(se.tier),le=Zt(Ee,z,{external:R,merge_active:Pe,merge_queued:E,merged:!!U||se?.tier==="merged"}),ve=!!le.operation;u.push({...Se(z),lane:"pr_wait",pr_number:typeof ie.number=="number"?ie.number:null,pr_url:typeof ie.url=="string"?ie.url:void 0,external:R,usage:Lt(T,z),badges:ue?["\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"]:U?[Or(U.step)?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${Or(U.step)}`:"\uC815\uB9AC \uBA48\uCDA4"]:typeof se?.gate_badge=="string"&&se.gate_badge.length>0?[se.gate_badge]:[],alert:!!U||te,reason:U?Es(U.step):"PR \uB300\uAE30",merge_action:!E||ue,merge_enabled:!ve&&(ue||se?.enabled===!0||C||Q||ae),merge_label:ue?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":ae||Q?"\uC815\uB9AC \uC7AC\uAC1C":C&&!Q?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:ue?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":ve?le.error?`\uD3D0\uAE30 \uC2E4\uD328: ${le.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${le.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:ae?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Q?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":C?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":se?.enabled===!0?`\uBA38\uC9C0 (${se.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${se?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:E&&!ue,cancel_enabled:!Pe,continuation_mismatch:N?.mismatch||null,discard:le,discard_action:le.action,discard_enabled:le.enabled,discard_title:le.title})}for(let H=0;H<We.length;H++){let z=We[H],Ie=z&&z.bead_id;if(typeof Ie!="string"||he.has(Ie))continue;he.add(Ie);let ie=be[Ie],se=Zt(Ee,Ie),E=se.operation?se:null,N={...Se(Ie),lane:"queue",draggable:!E,discard:E||void 0,reason:ql(ne,Ie),queue_position:H+1,queue_index:H,queue_length:We.length,badges:ie?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!ie,revise_action:!!ie,revise_enabled:!!ie&&!E,revise_title:ie?ie.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${ie.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""};f.push(N);let ue=b.get(B);ue?ue.push(N):b.set(B,[N])}for(let H of Array.isArray(S.runnable)?S.runnable:[]){let z=H&&H.bead_id;typeof z!="string"||he.has(z)||(he.add(z),c.push({...Se(z),title:H.title||X[z]||z,lane:"runnable",draggable:!0,reason:ql(ne,z),created_at:H.created_at??void 0,updated_at:H.updated_at??void 0,labels:Array.isArray(H.labels)?H.labels:[],spec_reviewer:typeof H.spec_reviewer=="string"?H.spec_reviewer:void 0,plan_state:H.plan_state==="approved"||H.plan_state==="authored"?H.plan_state:"none",workflow:H.route?{route:H.route,chips:{route:H.route}}:null,place_index:We.length}))}for(let H of Ce){let z=H&&H.bead_id;if(typeof z!="string"||he.has(z)||(he.add(z),o!==void 0&&typeof H.added_at=="number"&&H.added_at<o))continue;let Ie=of(T,z);_.push({...Se(z),lane:"done",done:!0,usage:Lt(T,z),done_at:typeof H.added_at=="number"?H.added_at:void 0,done_kind:Ie&&typeof Ie.done_kind=="string"?Ie.done_kind:null})}}let A=new Map;s.forEach((S,B)=>{S&&typeof S.root_dir=="string"&&A.set(S.root_dir,B)});let x=r&&r.running_sort==="repo"?"repo":"started";l.sort((S,B)=>{if(x==="repo"){let k=A.get(S.root_dir)??Number.MAX_SAFE_INTEGER,T=A.get(B.root_dir)??Number.MAX_SAFE_INTEGER;if(k!==T)return k-T}let Z=typeof S.started_at=="number"&&Number.isFinite(S.started_at)?S.started_at:null,y=typeof B.started_at=="number"&&Number.isFinite(B.started_at)?B.started_at:null;return Z!==null&&y!==null&&Z!==y?Z-y:Z===null&&y!==null?1:Z!==null&&y===null?-1:S.id.localeCompare(B.id)}),_.sort((S,B)=>(B.done_at??0)-(S.done_at??0));let L=s.length>0?s:n.map(S=>({root_dir:S&&S.root_dir,name:S&&S.name,auto_advance:S&&S.auto_advance,auto_merge:S&&S.auto_merge,slots:S&&S.slots,revision:S&&S.revision,runner_catalog:S&&S.runner_catalog})),q=[];for(let S of L)!S||typeof S.root_dir!="string"||q.push({root_dir:S.root_dir,name:S.name||S.root_dir,auto_advance:S.auto_advance===!0,auto_merge:S.auto_merge===!0,slots:typeof S.slots=="number"&&S.slots>=$n?S.slots:$n,revision:typeof S.revision=="number"?S.revision:0,runner_catalog:Pt(S.runner_catalog),items:b.get(S.root_dir)||[]});return{runnable:c,queue:f,queue_groups:q,running:l,pr_wait:u,done:_,automation:{total:q.length,both_on:q.filter(S=>S.auto_advance&&S.auto_merge).length}}}function lf(e,t){if(typeof e!="number"||!Number.isFinite(e))return"";let n=t-e<rf;return i`<span
    class="mon-beat${n?" mon-beat--live":""}"
    title=${`\uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${dt(e)}`}
    ><span class="mon-beat__dot" aria-hidden="true"></span>${n?"":i`<span class="mon-beat__age"
          >${St(e,t)}</span
        >`}</span
  >`}function xn(e){return i`<div class="mon-c__title">${e.title}</div>`}function Sn(e){return i`<span class="mon-c__id" title="클릭하면 상세로 이동"
    >${e.id}</span
  >`}function Rs(e){return e.workspace_name?i`<span class="mon-c__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:""}function No(e){let t=_t(e.usage),r=qt(e.usage);return t.length>0?t.map(n=>i`<span class="mon-c__usage" title=${n.tooltip}
          >${n.label}</span
        >`):r?i`<span class="mon-c__usage" title=${Wr(e.usage)}
        >${r}</span
      >`:""}function Fo(e){return(Array.isArray(e.badges)?e.badges:[]).map(r=>i`<span class="mon-c__badge${e.alert?" mon-c__badge--alert":""}"
        >${r}</span
      >`)}function cf(e){return i`<span class="mon-c__ops">
    ${e.run_state==="running"?i`<button
          type="button"
          class="mon-op mon-op--pause"
          ?disabled=${e.can_pause===!1}
          aria-label="일시정지"
          title="일시정지 — 세션을 끊고 이어하기 가능 상태로 둡니다"
        >
          ${Po()}
        </button>`:i`<button
          type="button"
          class="mon-op mon-op--resume"
          ?disabled=${e.can_resume===!1}
          aria-label="이어하기"
          title="이어하기"
        >
          ${Do()}
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
          ${Dl()}
        </button>`:""}
  </span>`}function df(e,t){let r=typeof e.started_at=="number"?Lo(t-e.started_at):"";return i`${xn(e)}
    <div class="mon-c__meta">
      ${Fo(e)}${lf(e.last_event_at,t)}${Sn(e)}${Rs(e)}
      ${Kt(e)?i`<span class="mon-c__model">${Kt(e)}</span>`:""}
      ${gr(e)?i`<span
            class="rtile__resumed"
            title=${gr(e)}
            >↻</span
          >`:""}
      ${r?i`<span class="mon-live__elapsed">${r}</span>`:""}
      ${No(e)}${cf(e)}${ur(e)}
    </div>`}function uf(e){let t=e.workflow,n=(t&&t.chips||{}).route||t&&t.route,s=typeof e.spec_reviewer=="string"?e.spec_reviewer:"",o=e.plan_state==="approved"?"plan \u2713":e.plan_state==="authored"?"plan \u270E":"plan \u2013",a=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),c=St(e.updated_at);return i`${xn(e)}
    <div class="mon-c__meta">
      <span class="mon-c__grip" aria-hidden="true">⠿</span>${Sn(e)}
      ${n?i`<span class="ctl-chip ctl-chip--route">${n}</span>`:""}
      ${s?i`<span
            class="ctl-chip mon-c__review${s==="skipped"?" mon-c__review--dim":""}"
            >spec:${s}</span
          >`:""}
      ${n==="full_plan"?i`<span
            class="ctl-chip mon-c__plan${e.plan_state==="none"?" mon-c__review--dim":""}"
            >${o}</span
          >`:""}
      ${Kn(e.labels,null).map(l=>i`<span class="ctl-chip ctl-chip--label">${l}</span>`)}
      ${Rs(e)}
      ${c?i`<span title=${`\uC218\uC815 ${dt(e.updated_at)}`}
            >수정 ${c}</span
          >`:""}
      ${e.reason?i`<span
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
    </div>`}function pf(e){let t=!!e.discard?.operation;return i`${xn(e)}
    <div class="mon-c__meta">
      <span class="mon-c__grip" aria-hidden="true">⠿</span>
      <span class="mon-live__pos">#${e.queue_position}</span>${Sn(e)}
      ${Fo(e)}
      ${e.reason?i`<span class="mon-c__reason">${e.reason}</span>`:""}
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
    ${ur(e)}
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
        </div>`:""}`}function ff(e){let t=!!(qt(e.usage)||e.merge_action||e.cancel_action||e.discard_action);return i`${xn(e)}
    <div class="mon-c__meta">
      ${Sn(e)}${Rs(e)}
      ${e.pr_url&&e.pr_number?i`<a
            class="mon-c__pr"
            href=${e.pr_url}
            target="_blank"
            rel="noreferrer noopener"
            title="PR 열기"
            >#${e.pr_number} ↗</a
          >`:""}
      ${Fo(e)}
      ${e.reason?i`<span class="mon-c__reason">${e.reason}</span>`:""}
    </div>
    ${t?i`<div class="mon-c__tail">
          ${No(e)}
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
          ${ur(e)}
        </div>`:""}`}function _f(e,t){let r=e.done_kind||"",n=r?nf[r]||r:"",s=St(e.done_at,t);return i`${xn(e)}
    <div class="mon-c__meta">
      ${Sn(e)}${Rs(e)}
      ${n?i`<span
            class="mon-live__kind${sf.has(r)?" mon-live__kind--ok":" mon-live__kind--warn"}"
            >${n}</span
          >`:""}
      ${No(e)}
      ${s?i`<span title=${`\uC644\uB8CC ${dt(e.done_at)}`}
            >완료 ${s}</span
          >`:""}
    </div>`}function Bl(e,t){return e.lane==="running"?df(e,t):e.lane==="runnable"?uf(e):e.lane==="queue"?pf(e):e.lane==="pr_wait"?ff(e):_f(e,t)}function Ul(e){let t=String(e.revision);return i`<header
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
        ${e.auto_advance?Po():Do()}
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
        ${Pl()}
        <span class="mon-ctl__label">머지</span>
      </button>
      <label class="mon-ctl mon-ctl--slots" title="동시에 실행할 세션 수">
        ${Ml()}
        <span class="mon-ctl__label">슬롯</span>
        <input
          type="number"
          class="mon-slots__input"
          min=${$n}
          step="1"
          data-root-dir=${e.root_dir}
          data-revision=${t}
          aria-label=${`${e.name} \uB3D9\uC2DC \uC2E4\uD589 \uC2AC\uB86F`}
          .value=${String(e.slots)}
        />
      </label>
    </span>
  </header>`}function jl(e){let{total:t,both_on:r}=e.automation,n=t>0&&r===t,s=e.running_sort==="repo"?"repo":"started",o=Yt.find(c=>c.value===e.done_range)?.label||"",a=Array.isArray(e.token_total)?e.token_total:e.token_total?[{label:e.token_total,tooltip:e.token_tooltip}]:[];return i`<div class="mon-top">
    <button
      type="button"
      class="mon-auto-all${n?" is-active":""}"
      data-on=${n?"false":"true"}
      aria-pressed=${n?"true":"false"}
      ?disabled=${t===0}
      title=${n?"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uB055\uB2C8\uB2E4 (\uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4)":"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uCF2D\uB2C8\uB2E4"}
    >
      ${n?Ol():Nl()}
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
        ${Yt.map(c=>i`<option
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
  </div>`}function Wl(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function zl(e){let t=(Array.isArray(e)?e:[]).map(c=>c&&c.usage).filter(c=>c&&typeof c=="object"&&"providers"in c);if(t.length>0)return _t(Jn(t));let r={};for(let c of or)r[c]=0;let n=!1,s=0,o=0,a=0;for(let c of Array.isArray(e)?e:[]){let l=c&&c.usage;if(l&&typeof l=="object"){let u=!1;for(let f of or){let _=l[f];typeof _=="number"&&Number.isFinite(_)&&(r[f]+=_,n=!0,u=!0)}if(u){o+=1;let f=l.total_cost_usd;typeof f=="number"&&Number.isFinite(f)&&(s+=f,a+=1)}}}return o>0&&a===o&&(r.total_cost_usd=s),n?qt(r):null}var Gl="bdui.monitor.done-range",Vl="bdui.monitor.running_sort";function mf(){try{let e=window.localStorage.getItem(Gl);return It(e)?e:xt}catch{return xt}}function gf(e){try{window.localStorage.setItem(Gl,e)}catch{}}function hf(){try{return window.localStorage.getItem(Vl)==="repo"?"repo":"started"}catch{return"started"}}function bf(e){try{window.localStorage.setItem(Vl,e)}catch{}}var Yl="tab:monitor:pipeline",vf=1e3,wf=[{lane:"runnable",pane:"candidate",title:"\uC2E4\uD589\uAC00\uB2A5",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589\uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}];function Hl(e,t){let r=(e.lane==="runnable"||e.lane==="queue")&&e.draggable!==!1;return i`<div
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
    ${Bl(e,t)}
  </div>`}function Kl(e,t){let r=nt("views:monitor"),n=t.gotoIssue,s=t.pipelineStore,o=t.transport,a=t.getWorkspacePath,c=t.switchWorkspace,l=t.now||(()=>Date.now()),u=t.confirm||(R=>typeof globalThis.confirm!="function"||globalThis.confirm(R)),f=mf(),_=hf();function b(){let R=Yt.find(U=>U.value===f);return R?R.label:""}let A=document.createElement("div");A.className="mon",e.appendChild(A);let x=Mo(null,null),L=new Map,q=null,S=null;async function B(R,U,C,Q,ae=!0){if(!o||!C)return null;let te=await o(R,{...U,root_dir:C,expected_revision:Q});if(te&&te.conflict&&ae){te.queue&&L.set(C,te.queue);let le=te.queue&&typeof te.queue.revision=="number"?te.queue.revision:Q;te=await o(R,{...U,root_dir:C,expected_revision:le})}return te&&te.queue&&C&&L.set(C,te.queue),te}function Z(R,U){let C=L.get(R),Q=s&&s.get?s.get():null,ae=(Array.isArray(Q)?Q:[]).find(le=>le?.root_dir===R);return(C||ae)?.merge_queue?.find(le=>le.bead_id===U)?.continuation_action}async function y(R,U,C,Q){let ae=await B(R,U,C,Q),te=L.get(C)?.revision??ae?.queue?.revision??Q;return sr(ae,(le,ve)=>B(R,{...U,continuation:le,decision_token:ve},C,te,!1),{refresh:le=>B(R,U,C,le?.queue?.revision??L.get(C)?.revision??te,!1)})}async function k(R,U,C,Q){let ae=await sr({continuation_mismatch:Q},(le,ve)=>B("worker-merge-queue-add",{bead_id:U,continuation:le,decision_token:ve},R,C,!1)),te=ae?.queue?.merge_queue?.find(le=>le.bead_id===U)?.continuation_action;ae?.applied!==!0&&te?.continuation===null&&te.mismatch&&await k(R,U,ae.queue.revision,te.mismatch)}async function T(R,U,C){let Q=await B("worker-discard",R,U,C);if(Q&&Q.discarded===!0){re(Ts(Q),"success",5e3);return}if(Q&&Q.reason){re(`\uD3D0\uAE30 \uC2E4\uD328: ${Q.reason}`,"error");return}if(Q&&Q.accepted&&Q.pending==="merged_revert"){re("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if(Q&&Q.accepted){re(`\uD3D0\uAE30 \uC9C4\uD589: ${Q.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}Q&&!Q.conflict&&re("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function X(R,U,C){return!o||!C?null:await o(R,{...U,root_dir:C})}async function Y(R){if(!o||!R&&!u("\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB055\uB2C8\uB2E4. \uAC01 \uB808\uD3EC\uC758 \uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uD568\uAED8 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?"))return;let U=await o("monitor-auto-toggle",{on:R}),C=U&&Array.isArray(U.failed)?U.failed:[];C.length>0&&re(`\uC790\uB3D9\uD654 ${R?"\uCF1C\uAE30":"\uB044\uAE30"} \uC77C\uBD80 \uC2E4\uD328: ${C.map(Q=>Q.root_dir).join(", ")}`,"error",3200)}async function ne(){let R=new Map;for(let U of x.pr_wait)R.has(U.root_dir)||R.set(U.root_dir,U.expected_revision);for(let[U,C]of R)await B("worker-merge-queue-add-all",{},U,C)}let be=null,J=!1,ee=null;function Ee(){ee!==null&&clearTimeout(ee),ee=setTimeout(()=>{ee=null,J=!1},0)}function je(R){let U=R.target;return typeof U?.closest=="function"?U.closest(".mon-group"):null}function et(R){let U=je(R);return!U||!be?null:(U.getAttribute("data-root-dir")||"")===be.root_dir?U:null}function Ne(){for(let R of Array.from(A.querySelectorAll(".mon-group--drag-over")))R.classList.remove("mon-group--drag-over")}function We(R){let U=R.target,C=typeof U?.closest=="function"?U.closest('.mon-card[draggable="true"]'):null;if(C){be={bead_id:C.getAttribute("data-issue-id")||"",lane:C.getAttribute("data-lane")||"",root_dir:C.getAttribute("data-root-dir")||"",revision:Number(C.getAttribute("data-revision")||0)||0,queue_index:Number(C.getAttribute("data-queue-index")),queue_length:Number(C.getAttribute("data-queue-length")),place_index:Number(C.getAttribute("data-place-index"))},J=!0;try{R.dataTransfer?.setData("text/plain",be.bead_id),R.dataTransfer&&(R.dataTransfer.effectAllowed="move")}catch{}}}function Ce(R){let U=et(R);U&&(R.preventDefault(),R.dataTransfer&&(R.dataTransfer.dropEffect="move"),U.classList.add("mon-group--drag-over"))}function fe(R){je(R)?.classList.remove("mon-group--drag-over")}function Se(){be=null,Ne(),Ee()}function he(R){let U=et(R),C=be;if(be=null,Ne(),!U||!C||!C.bead_id)return;R.preventDefault();let Q=R.target,ae=typeof Q?.closest=="function"?Q.closest('.mon-card[data-lane="queue"]'):null,te=ae&&U.contains(ae)?Number(ae.getAttribute("data-queue-index")):NaN;if(C.lane==="runnable"){let I=Number.isFinite(te)?te:C.place_index;if(!Number.isFinite(I))return;B("worker-queue-place",{bead_id:C.bead_id,index:I},C.root_dir,C.revision);return}if(C.lane!=="queue"||ae&&ae.getAttribute("data-issue-id")===C.bead_id)return;let le=C.queue_index,ve=Number.isFinite(te)?le>te?te:te-1:C.queue_length-1;!Number.isFinite(ve)||ve<0||ve===le||B("worker-queue-reorder",{bead_id:C.bead_id,to_index:ve},C.root_dir,C.revision)}function H(R){let U={runnable:x.runnable,queue:x.queue,running:x.running,pr_wait:x.pr_wait,done:x.done};return i`${jl({automation:x.automation,counts:{running:x.running.length,queue:x.queue.length,pr_wait:x.pr_wait.length},running_sort:_,done_range:f,token_total:zl(x.done),token_tooltip:Wl(b())})}
      <div class="worker-lanes mon-lanes">
        ${wf.map(C=>{let Q=U[C.lane],ae=C.lane==="queue"?x.queue_groups.length>0?i`${x.queue_groups.map(te=>i`<div
                        class="mon-group"
                        data-root-dir=${te.root_dir}
                      >
                        ${Ul(te)}
                        <div class="mon-group__list">
                          ${te.items.map(le=>Hl(le,R))}
                        </div>
                      </div>`)}`:void 0:Q.length>0?i`${Q.map(te=>Hl(te,R))}`:void 0;return Xt({id:`monitor-${C.lane}`,lane:C.pane,title:C.lane==="done"?`\uC644\uB8CC\xB7${b()}`:C.title,items:Q,empty:C.empty,body:ae,live:C.lane==="running"&&Q.length>0,header_control:C.lane==="pr_wait"&&Q.length>0?i`<button
                    type="button"
                    class="mon-lane-op mon-merge-all"
                    title="자격이 생기는 PR을 각 레포의 머지 큐에 한 번에 넣습니다"
                  >
                    일괄 머지
                  </button>`:""})})}
      </div>`}function z(){let R=s&&s.get?s.get():null,U=s&&s.getWorkspacesState?s.getWorkspacesState():[],C=l();x=Mo(R,U,{done_since:Tr(f,C),running_sort:_}),Fe(H(C),A)}function Ie(R,U){let C=a?a():void 0;if(!U||!C||U===C||!c){n(R);return}c(U).then(()=>{n(R)}).catch(Q=>{r("workspace switch for %s failed: %o",U,Q)})}function ie(R){return{root_dir:R.getAttribute("data-root-dir")||"",revision:Number(R.getAttribute("data-revision")||0)||0}}function se(R,U){let{root_dir:C,revision:Q}=ie(R),ae=R.getAttribute("data-issue-id")||"",te=U.dataset.attemptId||R.getAttribute("data-attempt-id")||"",le=U.classList;if(le.contains("worker-card__place")){B("worker-queue-place",{bead_id:ae,index:Number(R.getAttribute("data-place-index")||0)||0},C,Q);return}if(le.contains("mon-op--up")||le.contains("mon-op--down")){let ve=Number(R.getAttribute("data-queue-index")||0)||0,I=le.contains("mon-op--up")?ve-1:ve+1;if(I<0)return;B("worker-queue-reorder",{bead_id:ae,to_index:I},C,Q);return}if(le.contains("mon-op--remove")){B("worker-queue-remove",{bead_id:ae},C,Q);return}if(le.contains("mon-op--pause")){X("worker-attempt-pause",{attempt_id:te},C);return}if(le.contains("mon-op--discard")){if(!u(yn(ae,"unmerged")))return;T({bead_id:ae,...te?{attempt_id:te}:{},...U.dataset.operationId?{operation_id:U.dataset.operationId}:{}},C,Q);return}if(le.contains("mon-op--resume")){y("worker-attempt-resume",{attempt_id:te},C,Q);return}if(le.contains("mon-op--dismiss")){B("worker-attempt-dismiss",{attempt_id:te},C,Q);return}if(le.contains("worker-mini__merge")){let ve=Z(C,ae);ve?.mismatch&&ve.continuation===null?k(C,ae,Q,ve.mismatch):B("worker-merge-queue-add",{bead_id:ae},C,Q);return}if(le.contains("worker-mini__merge-cancel")){B("worker-merge-queue-remove",{bead_id:ae},C,Q);return}if(le.contains("worker-mini__discard")){let ve=U.dataset.discardMode==="merged"?"merged":"unmerged";if(!u(yn(ae,ve)))return;T({bead_id:ae,...te?{attempt_id:te}:{},...U.dataset.operationId?{operation_id:U.dataset.operationId}:{}},C,Q);return}if(le.contains("worker-mini__revise-fix")){y("worker-revise-fix",{bead_id:ae},C,Q);return}le.contains("worker-mini__revise-approve")&&B("worker-revise-approve",{bead_id:ae},C,Q)}function E(R){let U=J;J=!1;let C=R.target;if(!C||typeof C.closest!="function"||C.closest("dialog")||C.closest("a"))return;let Q=C.closest(".mon-running-sort");if(Q){R.preventDefault(),_=Q.getAttribute("data-sort")==="repo"?"repo":"started",bf(_),z();return}let ae=C.closest(".mon-auto-all");if(ae){R.preventDefault(),Y(ae.getAttribute("data-on")==="true");return}if(C.closest(".mon-merge-all")){R.preventDefault(),ne();return}let le=C.closest(".mon-ctl--advance");if(le){R.preventDefault();let{root_dir:Re,revision:Le}=ie(le);B("worker-automation-toggle",{on:le.getAttribute("data-on")==="true"},Re,Le);return}let ve=C.closest(".mon-ctl--merge-auto");if(ve){R.preventDefault();let{root_dir:Re,revision:Le}=ie(ve);B("worker-merge-auto-toggle",{on:ve.getAttribute("data-on")==="true"},Re,Le);return}let I=C.closest(".mon-card");if(!I)return;let K=C.closest("button");if(K){R.preventDefault(),se(I,K);return}let pe=I.getAttribute("data-issue-id");pe&&!U&&(R.preventDefault(),Ie(pe,I.getAttribute("data-root-dir")||""))}function N(R){let U=R.target;if(!U||typeof U.closest!="function")return;let C=U.closest(".mon-done-range");if(C){f=It(C.value)?C.value:xt,gf(f),z();return}let Q=U.closest(".mon-slots__input");if(!Q)return;let{root_dir:ae,revision:te}=ie(Q),le=Number(Q.value);if(!Number.isFinite(le))return;let ve=Math.max($n,Math.floor(le));B("worker-queue-set-slots",{slots:ve},ae,te)}e.addEventListener("click",E),e.addEventListener("change",N),e.addEventListener("dragstart",We),e.addEventListener("dragover",Ce),e.addEventListener("dragleave",fe),e.addEventListener("drop",he),e.addEventListener("dragend",Se),s&&typeof s.subscribe=="function"&&(q=s.subscribe(()=>{try{L.clear(),z()}catch{}}));function ue(){S!==null&&(clearInterval(S),S=null)}function Pe(){ee!==null&&(clearTimeout(ee),ee=null)}return{load(){r("load"),z(),S===null&&(S=setInterval(()=>{try{z()}catch{}},vf))},pause(){ue()},clear(){ue(),Pe(),q&&(q(),q=null),e.removeEventListener("click",E),e.removeEventListener("change",N),e.removeEventListener("dragstart",We),e.removeEventListener("dragover",Ce),e.removeEventListener("dragleave",fe),e.removeEventListener("drop",he),e.removeEventListener("dragend",Se),e.replaceChildren()}}}function Zl(e,t,r){let n=nt("views:nav"),s=null;function o(l){return u=>{u.preventDefault(),n("click tab %s",l),r.gotoView(l)}}function a(){let l=t.getState(),u=l.view==="worker"||l.view==="monitor"?l.view:"board";return i`
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
    `}function c(){Fe(a(),e)}return c(),s=t.subscribe(()=>c()),{destroy(){s&&(s(),s=null),Fe(i``,e)}}}var Xl=["bug","feature","task","epic","chore"];function Ql(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var Jl=["Critical","High","Medium","Low","Backlog"];function ec(e,t){let r=document.createElement("dialog");r.id="new-issue-dialog",r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true"),r.innerHTML=`
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
  `,e.appendChild(r);let n=r.querySelector("#new-issue-form"),s=r.querySelector("#new-title"),o=r.querySelector("#new-type"),a=r.querySelector("#new-priority"),c=r.querySelector("#new-labels"),l=r.querySelector("#new-description"),u=r.querySelector("#new-issue-error"),f=r.querySelector("#btn-cancel"),_=r.querySelector("#btn-create"),b=r.querySelector(".new-issue__close");function A(){o.replaceChildren();let k=document.createElement("option");k.value="",k.textContent="\u2014 Select \u2014",o.appendChild(k);for(let T of Xl){let X=document.createElement("option");X.value=T,X.textContent=Ql(T),o.appendChild(X)}a.replaceChildren();for(let T=0;T<=4;T+=1){let X=document.createElement("option");X.value=String(T);let Y=Jl[T]||"Medium";X.textContent=`${T} \u2013 ${Y}`,a.appendChild(X)}}A();function x(){try{typeof r.close=="function"?r.close():r.removeAttribute("open")}catch{r.removeAttribute("open")}}function L(k){s.disabled=k,o.disabled=k,a.disabled=k,c.disabled=k,l.disabled=k,f.disabled=k,_.disabled=k,_.textContent=k?"Creating\u2026":"Create"}function q(){u.textContent=""}function S(k){u.textContent=k}function B(){try{let k=window.localStorage.getItem("beads-ui.new.type");k?o.value=k:o.value="";let T=window.localStorage.getItem("beads-ui.new.priority");T&&/^\d$/.test(T)?a.value=T:a.value="2"}catch{o.value="",a.value="2"}}function Z(){let k=o.value||"",T=a.value||"";k.length>0&&window.localStorage.setItem("beads-ui.new.type",k),T.length>0&&window.localStorage.setItem("beads-ui.new.priority",T)}async function y(){q();let k=String(s.value||"").trim();if(k.length===0){S("Title is required"),s.focus();return}let T=Number(a.value||"2");if(!(T>=0&&T<=4)){S("Priority must be 0..4"),a.focus();return}let X=String(o.value||""),Y=String(l.value||""),ne={title:k};X.length>0&&(ne.type=X),String(T).length>0&&(ne.priority=T),Y.length>0&&(ne.description=Y),L(!0);try{await t("create-issue",ne)}catch{L(!1),S("Failed to create issue");return}Z(),L(!1),x()}return r.addEventListener("cancel",k=>{k.preventDefault(),x()}),b.addEventListener("click",()=>x()),f.addEventListener("click",()=>x()),r.addEventListener("keydown",k=>{k.key==="Enter"&&(k.ctrlKey||k.metaKey)&&(k.preventDefault(),y())}),n.addEventListener("submit",k=>{k.preventDefault(),y()}),{open(){n.reset(),q(),B();try{"showModal"in r&&typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")}catch{r.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){x()}}}var yf=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function kf(e,t){return Zs(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function tc(e,t,r){return i`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">라벨 표시</div>
      <p class="settings-dialog__hint-block">
        라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을 누르면
        그 라벨만 예외로 다시 표시됩니다.
      </p>
      ${t.length===0?i`<div class="settings-dialog__empty">라벨 없음</div>`:i`<div class="settings-dialog__pills">
            ${t.map(n=>{let s=kf(n,e);return i`<button
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
  `}function rc(e,t,r){return i`
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
  `}function nc(e,t){return i`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">카드 표시 요소</div>
      <div class="settings-dialog__toggles">
        ${yf.map(([r,n])=>i`<label class="settings-dialog__toggle">
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
  `}var $f=[{id:"session",label:"\uC138\uC158",glyph:"\u25C6"},{id:"worker",label:"Worker",glyph:"\u25A4"},{id:"display",label:"\uD45C\uC2DC",glyph:"\u25EB"}],Wt="";function zt(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function sc(e,t){let{transport:r,policyStore:n,labelOptions:s}=t,o=t.notify||(I=>re(I,"error",4e3)),a=document.createElement("dialog");a.id="settings-dialog",a.className="settings-dialog",a.setAttribute("role","dialog"),a.setAttribute("aria-modal","true"),a.setAttribute("aria-label","\uC124\uC815"),e.appendChild(a);let c="session",l=!1,u="",f={},_={},b=[],A=!1,x=null,L={},q="",S=!1,B=!1,Z=!1,y=null;function k(){let I=t.queueStore?.get();return zt(I)?I.runner_catalog:null}function T(){let I=t.implPresetStore?.get();return zt(I)&&Array.isArray(I.presets)?I:null}async function X(){A=!0,R();try{let I=await r("get-session-defaults",{});f=zt(I?.values)?{...I.values}:{},_={...f},b=Array.isArray(I?.warnings)?I.warnings:[]}catch(I){b=["kv_read_failed"],o(`\uC138\uC158 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${I instanceof Error?I.message:String(I)}`)}finally{A=!1,R()}}async function Y(){let I=rl(f,_);if(Object.keys(I).length!==0){try{let K=await r("set-session-defaults",{values:I});f=zt(K?.values)?{...K.values}:{},_={...f},b=Array.isArray(K?.warnings)?K.warnings:[]}catch(K){o(`\uC138\uC158 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${K instanceof Error?K.message:String(K)}`)}R()}}function ne(I,K){K===Wt?delete _[I]:_[I]=K,R(),Y()}async function be(){let I=t.queueStore?.get();if(!zt(I))return;let K={orchestration_model:I.orchestration_model??null,orchestration_effort:I.orchestration_effort??null,orchestration_speed:I.orchestration_speed??null},pe=nl(K,{...K,...L});if(Object.keys(pe).length!==0){try{let Re=await r("worker-queue-set-orchestration-defaults",{expected_revision:I.revision,values:pe});if(Re&&Re.applied===!1){o("Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC");return}L={}}catch(Re){o(`Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${Re instanceof Error?Re.message:String(Re)}`)}R()}}function J(I,K){L[I]=K===Wt?null:K,R(),be()}async function ee(I){let K=t.queueStore?.get();if(!(!zt(K)||I<1)){try{await r("worker-queue-set-slots",{expected_revision:K.revision,slots:I})}catch(pe){o(`slots \uC800\uC7A5 \uC2E4\uD328: ${pe instanceof Error?pe.message:String(pe)}`)}R()}}async function Ee(){let I=T();if(!(!I||q.length===0)){try{let K=await r("apply-impl-preset-global",{preset_id:q,expected_revision:I.revision});K&&K.applied?(f=zt(K.values)?{...K.values}:{},_={...f},b=Array.isArray(K.warnings)?K.warnings:[]):K&&K.conflict&&o("\uAD6C\uD604 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: \uD504\uB9AC\uC14B\uC774 \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4")}catch(K){o(`\uAD6C\uD604 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: ${K instanceof Error?K.message:String(K)}`)}R()}}async function je(){B=!0,Z=!1,R();try{let I=await r("get-worker-system-prompt",{});!I||typeof I!="object"||Array.isArray(I)?Z=!0:y=I}catch{Z=!0}finally{B=!1,R()}}function et(){if(S=!S,S&&!y){je();return}R()}function Ne(){let I=Hr({loading:B,error:Z});if(I)return I;if(!y)return"";let K=Array.isArray(y.variants)?y.variants:[];return i`<div class="settings-dialog__sp-body">
      ${y.target_base_placeholder?i`<div class="prompt-block__meta">
            \`${y.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${K.map(pe=>i`<div class="settings-dialog__sp-variant" data-variant=${pe.key}>
            <div class="settings-dialog__sp-cond">${pe.condition}</div>
            ${cr(pe.label,pe.system_prompt)}
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
        aria-expanded=${S?"true":"false"}
        @click=${et}
      >
        ${S?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
      </button>
      ${S?Ne():""}
    </section>`}function Ce(I,K,pe,Re,Le,Me){let tt=Le[I]??Wt;return i`<select
      class=${tt===Wt?"settings-dialog__unset":""}
      data-key=${I}
      aria-label=${K}
      ?disabled=${Me===!0}
      .value=${Gr(String(tt))}
      @change=${Ye=>Re(I,String(Ye.target.value))}
    >
      <option value=${Wt} ?selected=${tt===Wt}>(기본)</option>
      ${pe.map(Ye=>i`<option value=${Ye} ?selected=${Ye===tt}>
            ${Ye===Dt?"\uC790\uB3D9":Ye}
          </option>`)}
    </select>`}function fe(I,K,pe,Re,Le,Me=!1){return i`<div
      class=${`settings-dialog__row${Me?" settings-dialog__row--off":""}`}
    >
      <span class="settings-dialog__row-label">${K}</span>
      <span class="settings-dialog__controls">
        ${Ce(I,K,pe,Re,Le,Me)}
      </span>
    </div>`}function Se(I,K,pe,Re,Le){return i`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">
        <i
          class="settings-dialog__stage-dot"
          style=${`background: var(--stage-${K}-on)`}
        ></i>
        ${I}
      </span>
      <span class="settings-dialog__controls">
        ${Ce(pe,`${I} \uBAA8\uB378`,Re,ne,_,!1)}
        ${Ce(Le,`${I} effort`,ws,ne,_,!1)}
      </span>
    </div>`}function he(){let I=k(),K=tl(_),pe=_.impl_runtime,Re=_.impl_model,Le=T();return i`
      <section
        class=${`settings-dialog__pane${c==="session"?" settings-dialog__pane--active":""}`}
        role="tabpanel"
        id="settings-pane-session"
        aria-label="세션 기본값"
      >
        <header class="settings-dialog__pane-head"><h2>세션 기본값</h2></header>
        <p class="settings-dialog__pane-sub">
          모든 세션(터미널 대화형 포함)이 따르는 전역 기본값입니다. 이슈에 핀이
          있으면 핀이 우선합니다.
        </p>
        ${b.length>0?i`<div class="settings-dialog__banner" role="alert">
              워크스페이스 기본값을 일부 읽지 못했습니다 —
              ${b.join(", ")}
            </div>`:""}
        ${A?i`<div class="settings-dialog__empty">불러오는 중…</div>`:i`
              <div class="settings-dialog__group">
                <div class="settings-dialog__group-title">워크플로우</div>
                <div class="settings-dialog__row">
                  <span class="settings-dialog__row-label">모드</span>
                  <span class="settings-dialog__controls">
                    <span class="settings-dialog__seg" role="group">
                      <button
                        type="button"
                        data-mode=${Wt}
                        aria-pressed=${String(!_.workflow_mode)}
                        @click=${()=>ne("workflow_mode",Wt)}
                      >
                        (기본)
                      </button>
                      ${bs.map(Me=>i`<button
                            type="button"
                            data-mode=${Me}
                            aria-pressed=${String(_.workflow_mode===Me)}
                            @click=${()=>ne("workflow_mode",Me)}
                          >
                            ${Me}
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
                ${Se("\uC0AC\uC591 \uB9AC\uBDF0","spec","spec_review_model",vn,"spec_review_effort")}
                ${Se("\uACC4\uD68D \uB9AC\uBDF0","plan","plan_review_model",vs,"plan_review_effort")}
                ${Se("\uAD6C\uD604 \uB9AC\uBDF0","impl","impl_review_model",vn,"impl_review_effort")}
              </div>

              <div class="settings-dialog__group">
                <div class="settings-dialog__group-title">
                  구현
                  <span class="settings-dialog__hint"
                    >이슈 핀이 있으면 핀이 우선합니다</span
                  >
                </div>
                ${fe("impl_dispatch","\uC2E4\uD589 \uBC29\uC2DD",gs,ne,_)}
                ${fe("impl_runtime","\uC704\uC784 \uB300\uC0C1",hs,ne,_,K)}
                ${fe("impl_model","\uBAA8\uB378",ys(I,pe),ne,_,K)}
                ${fe("impl_effort","effort",Vr(I,pe,Re),ne,_,K)}
                ${fe("impl_speed","\uC18D\uB3C4",bn,ne,_,K)}
              </div>

              <div class="settings-dialog__preset-bar">
                <select
                  aria-label="구현 프리셋"
                  .value=${Gr(q)}
                  @change=${Me=>{q=String(Me.target.value),R()}}
                >
                  <option value="" ?selected=${q===""}>
                    구현 프리셋…
                  </option>
                  ${(Le?.presets||[]).map(Me=>i`<option
                        value=${Me.id}
                        ?selected=${Me.id===q}
                      >
                        ${Me.name}
                      </option>`)}
                </select>
                <button
                  type="button"
                  class="settings-dialog__btn settings-dialog__btn--primary"
                  ?disabled=${q.length===0}
                  @click=${Ee}
                >
                  전역 기본값으로 적용
                </button>
              </div>
            `}
      </section>
    `}function H(){let I=t.queueStore?.get(),K=k(),pe={orchestration_model:L.orchestration_model??(zt(I)?I.orchestration_model:null),orchestration_effort:L.orchestration_effort??(zt(I)?I.orchestration_effort:null),orchestration_speed:L.orchestration_speed??(zt(I)?I.orchestration_speed:null)},Re=ks(K,x),Le=Vr(K,x||void 0,pe.orchestration_model||Dt).filter(tt=>tt!==Dt),Me=zt(I)&&typeof I.slots=="number"?I.slots:2;return i`
      <section
        class=${`settings-dialog__pane${c==="worker"?" settings-dialog__pane--active":""}`}
        role="tabpanel"
        id="settings-pane-worker"
        aria-label="Worker 설정"
      >
        <header class="settings-dialog__pane-head"><h2>Worker 설정</h2></header>
        <p class="settings-dialog__pane-sub">
          Worker가 세션을 띄울 때 쓰는 오케스트레이션 설정과 동시 실행 수입니다.
        </p>
        <div class="settings-dialog__group">
          <div class="settings-dialog__group-title">오케스트레이션</div>
          <div class="settings-dialog__row">
            <span class="settings-dialog__row-label">런타임</span>
            <span class="settings-dialog__controls">
              <select
                aria-label="런타임"
                data-key="orchestration_runtime_filter"
                .value=${Gr(x||Wt)}
                @change=${tt=>{let Ye=String(tt.target.value);x=Ye===Wt?null:Ye,R()}}
              >
                <option value=${Wt} ?selected=${!x}>
                  전체
                </option>
                <option
                  value="claude"
                  ?selected=${x==="claude"}
                >
                  claude
                </option>
                <option
                  value="codex"
                  ?selected=${x==="codex"}
                >
                  codex
                </option>
              </select>
              <span class="settings-dialog__hint">모델 목록을 좁힙니다</span>
            </span>
          </div>
          ${fe("orchestration_model","\uBAA8\uB378",Re,J,pe)}
          ${fe("orchestration_effort","effort",Le,J,pe)}
          ${fe("orchestration_speed","\uC18D\uB3C4",bn,J,pe)}
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
                  @click=${()=>ee(Me-1)}
                >
                  −
                </button>
                <span class="settings-dialog__stepper-value">${Me}</span>
                <button
                  type="button"
                  aria-label="slots 증가"
                  @click=${()=>ee(Me+1)}
                >
                  +
                </button>
              </span>
            </span>
          </div>
        </div>
        ${We()}
      </section>
    `}function z(){let I=n.get();return i`
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
        ${I?i`
              ${tc(I,s(),E)}
              ${rc(I,u,{onDraft:K=>{u=K},onAdd:N,onRemove:ue})}
              ${nc(I,Pe)}
            `:i`<div class="settings-dialog__empty">
              표시 정책을 불러오는 중…
            </div>`}
      </section>
    `}async function Ie(I){let K=n.get();if(K)try{let pe=await r("display-policy-set",{expected_revision:K.revision,policy:I(K)});ie(pe),pe&&pe.conflict&&pe.policy&&(pe=await r("display-policy-set",{expected_revision:pe.policy.revision,policy:I(pe.policy)}),ie(pe)),pe&&pe.conflict&&o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC")}catch{o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328")}}function ie(I){I&&I.policy&&typeof I.policy=="object"&&n.set(I.policy)}function se(I){Ie(I)}function E(I){let K=n.get();if(!K)return;let pe=!xf(I,K);se(Re=>Sf(I,Re,pe))}function N(){let I=u.trim();I.length!==0&&(u="",se(K=>K.hidden_prefixes.includes(I)?{hidden_prefixes:K.hidden_prefixes}:{hidden_prefixes:[...K.hidden_prefixes,I]}),R())}function ue(I){se(K=>({hidden_prefixes:K.hidden_prefixes.filter(pe=>pe!==I)}))}function Pe(I){let K=n.get();if(!K)return;let pe=K.chips[I]===!1;se(()=>({chips:{[I]:pe}}))}function R(){Fe(i`
        <div class="settings-dialog__container">
          <nav
            class="settings-dialog__rail"
            role="tablist"
            aria-orientation="vertical"
          >
            <div class="settings-dialog__rail-title">설정</div>
            ${$f.map(I=>i`<button
                  type="button"
                  class="settings-dialog__tab"
                  role="tab"
                  data-tab=${I.id}
                  aria-selected=${String(c===I.id)}
                  aria-controls=${`settings-pane-${I.id}`}
                  @click=${()=>U(I.id)}
                >
                  <span class="settings-dialog__glyph">${I.glyph}</span>
                  ${I.label}
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
            ${he()} ${H()} ${z()}
          </div>
        </div>
      `,a)}function U(I){c=I,R()}let C=()=>{l=!1};a.addEventListener("close",C),a.addEventListener("cancel",C);let Q=I=>{I.target===a&&ve()};a.addEventListener("click",Q);let ae=null;n.subscribe&&(ae=n.subscribe(()=>{l&&R()}));let te=null;t.implPresetStore?.subscribe&&(te=t.implPresetStore.subscribe(()=>{l&&R()}));function le(I="session"){l||(l=!0,c=I,u="",L={},R(),typeof a.showModal=="function"?a.showModal():a.setAttribute("open",""),X())}function ve(){l&&(l=!1,typeof a.close=="function"?a.close():a.removeAttribute("open"))}return{open:le,close:ve,sessionDraft:()=>({..._}),destroy(){l=!1,a.removeEventListener("close",C),a.removeEventListener("cancel",C),a.removeEventListener("click",Q),ae&&(ae(),ae=null),te&&(te(),te=null),a.remove()}}}function xf(e,t){return t.visible_labels.includes(e)?!0:t.hidden_labels.includes(e)?!1:!t.hidden_prefixes.some(r=>r.length>0&&e.startsWith(r))}function Sf(e,t,r){if(!r)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(o=>o!==e)};let n=t.hidden_labels.filter(o=>o!==e);return t.hidden_prefixes.some(o=>o.length>0&&e.startsWith(o))?{hidden_labels:n,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:n}}var Af=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function oc(e){return String(e).padStart(2,"0")}function Tf(e,t){let r=Math.max(0,Math.ceil((e-t)/6e4)),n=Math.floor(r/1440),s=Math.floor(r%1440/60),o=r%60;return n>0?`${n}d${s>0?` ${s}h`:""}`:s>0?`${s}h${o>0?` ${o}m`:""}`:`${o}m`}function Ef(e,t=Date.now()){let r=Date.parse(e);if(!Number.isFinite(r))return"";let n=new Date(r),s=new Date(t),o=`${oc(n.getHours())}:${oc(n.getMinutes())}`,c=n.getFullYear()===s.getFullYear()&&n.getMonth()===s.getMonth()&&n.getDate()===s.getDate()?o:`${Af[n.getMonth()]} ${n.getDate()} ${o}`;return`${Tf(r,t)} \xB7 ${c}`}function Cf(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}var ac=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage"}];function ic(e){let t=!1,r=null,n=new Map;function s(){Fe(i``,e),e.hidden=!0}function o(){let l=ac.filter(f=>n.has(f.key));if(l.length===0){s();return}let u=Date.now();Fe(i`<div class="usage-meter" aria-label="Usage">
        ${l.map(f=>{let _=n.get(f.key),b=typeof _.ageSeconds=="number"&&_.ageSeconds>600,A=b?`${Math.floor(_.ageSeconds/60)}\uBD84 \uC804 \uCE21\uC815`:"";return i`<span
            class="usage-meter__group${b?" usage-meter__group--stale":""}"
            aria-label=${`${f.label} usage`}
          >
            <span class="usage-meter__provider">${f.label}</span>
            ${_.windows.map(x=>{let L=typeof x.pct=="number"&&Number.isFinite(x.pct)?x.pct:0,q=Math.min(100,Math.max(0,L)),B=`resets ${Ef(x.resetsAt,u)}${b?` \xB7 ${A}`:""}`;return i`<span
                class="usage-meter__window ${Cf(q)}"
                style=${`--progress: ${q}%`}
                title=${B}
              >
                <span class="usage-meter__label">${x.key}</span>
                <span class="usage-meter__track" aria-hidden="true">
                  <span class="usage-meter__fill"></span>
                </span>
                <span class="usage-meter__pct">${q}%</span>
              </span>`})}
          </span>`})}
      </div>`,e),e.hidden=!1}async function a(l){try{let u=await fetch(l.endpoint);if(!u.ok)return null;let f=await u.json();return!f||f.available!==!0||!Array.isArray(f.windows)?null:f}catch{return null}}async function c(){let l=await Promise.all(ac.map(async u=>({provider:u,payload:await a(u)})));if(!t){for(let u of l)u.payload?n.set(u.provider.key,u.payload):n.delete(u.provider.key);o()}}return s(),c(),r=setInterval(()=>{c()},6e4),{destroy(){t=!0,r!==null&&(clearInterval(r),r=null),s()}}}var Rf="worker-ineligible";function qo(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function lc(e){return qo(e).includes(Rf)}var Bo="worker-serial";function An(e){return qo(e).includes(Bo)}function If(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";if(e<6e4)return`${Math.round(e/1e3)}\uCD08`;let t=e/6e4;return`${Number.isInteger(t)?t:Math.round(t*10)/10}\uBD84`}function Lf(e){return Array.isArray(e)?e.filter(t=>typeof t=="string").join(" "):""}function cc(e){let t=e.queueStore,r=e.transport,n=e.getWorkspacePath,s=e.onChanged||(()=>{});function o(){return t&&t.get()||{}}function a(){let y=o();return typeof y.revision=="number"?y.revision:0}function c(y){t&&y&&y.queue&&typeof y.queue=="object"&&t.set(y.queue)}function l(){let y=o().workspace_info;return y&&typeof y=="object"?y:{}}function u(y,k){return i`<span
      class="worker-repo-ops__vd-badge worker-repo-ops__vd-badge--${y}"
      >${k}</span
    >`}function f(y){let k=y?Lf(y.cmd):"",T=y?If(y.timeout_ms):"",X=n&&n()||"<workspace \uACBD\uB85C>";return i`<div class="worker-repo-ops__vd-group" data-vd="verify">
      <div class="worker-repo-ops__vd-label">머지 전 검증 (verify)</div>
      ${k?i`<div class="worker-repo-ops__vd-line">
            <span class="worker-repo-ops__vd-cmd">${k}</span>
            ${u("config","config")}
            ${T?i`<span class="worker-repo-ops__vd-meta"
                  >timeout ${T}</span
                >`:""}
          </div>`:i`<div class="worker-repo-ops__vd-line worker-repo-ops__vd-absent">
            ${u("absent","\uC548 \uD568")} 검증 없음 —
            <span class="worker-repo-ops__vd-cmd"
              >[worker.verify."${X}"]</span
            >
            섹션으로 정의
          </div>`}
    </div>`}function _(y){if(typeof y!="number"||!Number.isFinite(y))return"";let k=y/6e4;return Number.isInteger(k)?`timeout ${k}\uBD84`:`timeout ${Math.round(y/1e3)}\uCD08`}function b(y){let k=_(y);return k?u("config",k):""}function A(y){let k=typeof y.base_sha=="string"?y.base_sha:"",T=`${y.source_path||"repo-ops/config.toml"} @ ${y.base_ref||"?"}${k?`@${k.slice(0,7)}`:""}`;return i`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">
        저장소 작업 선언
        <span class="worker-repo-ops__vd-src">${T}</span>
      </p>
      <div class="worker-repo-ops__lane" data-lane="verify">
        <span class="worker-repo-ops__lane-k">머지 전 검증</span>
        <span class="worker-repo-ops__lane-v"
          >${y.verify?i`<code class="worker-repo-ops__vd-cmd"
                  >${y.verify.script}</code
                >${b(y.verify.timeout_ms)}`:i`선언 없음${u("absent","verify \uC5C6\uC774 \uD310\uC815")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${y.verify?"\uBA38\uC9C0 \uC804\uC5D0 \uC774 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uD1B5\uACFC\uD574\uC57C \uC790\uACA9\uC744 \uC5BB\uC2B5\uB2C8\uB2E4.":"\uBA38\uC9C0 \uC790\uACA9\uC740 PR/base/head \uC2E0\uC120\uB3C4\xB7mergeability\xB7\uB9AC\uBDF0 \uC601\uC218\uC99D\uC73C\uB85C\uB9CC \uD310\uC815\uD569\uB2C8\uB2E4."}</span
        >
      </div>
      <div class="worker-repo-ops__lane" data-lane="deploy">
        <span class="worker-repo-ops__lane-k">머지 후 배포</span>
        <span class="worker-repo-ops__lane-v"
          >${y.deploy?i`<code class="worker-repo-ops__vd-cmd"
                  >${y.deploy.script}</code
                >${b(y.deploy.timeout_ms)}`:i`선언 없음${u("absent","\uBC30\uD3EC \uC5C6\uC74C")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${y.deploy?i`Worker가 <code>.worktrees/.repo-ops-deploy</code>에서 대상
                SHA로 정렬한 뒤 1회 실행합니다.`:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC \uB2E8\uACC4 \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4."}</span
        >
      </div>
    </section>`}function x(y){let k=y.repo_ops&&typeof y.repo_ops=="object"?y.repo_ops:null;return k&&k.status==="resolved"?A(k):k&&(k.status==="pending"||k.status==="error")?i`<section class="worker-repo-ops__vd" data-seam="repo-ops">
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
          ${k.status==="pending"?"\uC120\uC5B8 \uD655\uC778 \uC911":i`선언 읽기
              실패${k.error_code?i` — <code>${k.error_code}</code>`:""}`}
        </div>
      </section>`:i`<section class="worker-repo-ops__vd">
      <p class="worker-repo-ops__vd-title">
        검증 설정
        <span class="worker-repo-ops__vd-ro">읽기 전용 — config에서 정의</span>
      </p>
      ${f(y.verify_cmd)}
    </section>`}async function L(y){if(!r)return;let k=await r("worker-auto-repair-toggle",{on:y,expected_revision:a()});if(c(k),k&&k.conflict){let T=await r("worker-auto-repair-toggle",{on:y,expected_revision:a()});c(T)}s()}let q={owned_deploy_worktree_fetch_detached_alignment_recreate:"\uC804\uC6A9 \uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC \uC815\uB82C\xB7\uBCF5\uAD6C",recovered_pre_execution_fetch_timeout_retry_once:"fetch \uD0C0\uC784\uC544\uC6C3 1\uD68C \uBCF5\uAD6C",repo_serial_lock_wait:"\uC800\uC7A5\uC18C \uC21C\uCC28 \uC2E4\uD589 \uB300\uAE30",restart_operation_adoption:"\uC7AC\uC2DC\uC791 \uD6C4 \uC791\uC5C5 \uC778\uACC4",exact_input_exit_zero_evidence_adoption:"\uB3D9\uC77C \uC785\uB825 \uC131\uACF5 \uC99D\uAC70 \uC778\uACC4",descendant_success_covers_ancestor_rows:"\uCD5C\uC2E0 SHA \uC131\uACF5\uC774 \uC774\uC804 \uD589 \uCEE4\uBC84",owned_verify_candidate_cleanup:"\uAC80\uC99D \uC784\uC2DC \uCCB4\uD06C\uC544\uC6C3 \uC815\uB9AC",script_retry:"\uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4",auto_repair_session:"\uC790\uB3D9 \uD574\uACB0 \uC138\uC158",user_triggered_session:"\uC0AC\uC6A9\uC790 \uD574\uACB0 \uC138\uC158",automatic:"\uC790\uB3D9",user_action_only:"\uC0AC\uC6A9\uC790 \uD074\uB9AD",script_identity_present:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC788\uC744 \uB54C\uB9CC",per_completion_chain:"\uC644\uB8CC \uCCB4\uC778\uB2F9",unbounded:"\uD69F\uC218 \uC81C\uD55C \uC5C6\uC74C",bounded_single_script_retry_exceeded:"\uB2E8\uC77C \uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4 \uD55C\uB3C4 \uCD08\uACFC",baseline_failure_ignore:"\uAE30\uC874 \uC2E4\uD328 \uBB34\uC2DC",config_or_script_deletion_to_bypass_gate:"\uC124\uC815\xB7\uC2A4\uD06C\uB9BD\uD2B8 \uC0AD\uC81C\uB85C \uAC8C\uC774\uD2B8 \uC6B0\uD68C",credential_entry:"\uC790\uACA9\uC99D\uBA85 \uC785\uB825\xB7\uCD9C\uB825",destructive_action:"\uD30C\uAD34\uC801 \uC791\uC5C5",history_rewrite:"\uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131",agent_self_report_as_success:"\uC138\uC158 \uC790\uAE30\uBCF4\uACE0\uB97C \uC131\uACF5 \uCC98\uB9AC",unbounded_repair_session_retry:"\uBB34\uD55C \uD574\uACB0 \uC138\uC158 \uBC18\uBCF5"};function S(y,k,T){return i`<div class="worker-repo-ops__policy-group" data-policy=${T}>
      <div class="worker-repo-ops__policy-label">${y}</div>
      <ul class="worker-repo-ops__policy-list">
        ${k.map(X=>i`<li data-token=${X}>
              ${q[X]||X}
            </li>`)}
      </ul>
    </div>`}function B(y){return i`<div
      class="worker-repo-ops__policy-group"
      data-policy="resolution-ladder"
    >
      <div class="worker-repo-ops__policy-label">해결 사다리</div>
      <ol class="worker-repo-ops__policy-list">
        ${y.map(k=>{let T=[q[k.trigger]||k.trigger];return Number.isInteger(k.attempts_per_operation_attempt)?T.push(`operation\uB2F9 ${k.attempts_per_operation_attempt}\uD68C`):Number.isInteger(k.attempts)?T.push(`${q[k.budget]||k.budget} ${k.attempts}\uD68C`):Number.isInteger(k.sessions_per_user_action)&&T.push(`${k.sessions_per_user_action}\uD68C`,q[k.user_actions]||k.user_actions),k.applies_when&&T.push(q[k.applies_when]||k.applies_when),i`<li data-token=${k.id}>
            <strong>${q[k.id]||k.id}</strong>
            <span>${T.filter(Boolean).join(" \xB7 ")}</span>
          </li>`})}
      </ol>
    </div>`}function Z(){let y=o(),k=y.auto_repair!==!1,T=y.repo_operation_policy&&typeof y.repo_operation_policy=="object"?y.repo_operation_policy:null,X=Array.isArray(y.repo_operations)?y.repo_operations:[],Y=X.find(ee=>ee.state==="repairing"),ne=X.filter(ee=>ee.state==="failed"||ee.state==="repairing"),be=ne.length?Math.min(...ne.map(ee=>typeof ee.repair?.remaining=="number"?ee.repair.remaining:0)):T?.auto_repair?.resolution_ladder?.find(ee=>ee.id==="auto_repair_session")?.attempts??1,J=Array.isArray(T?.auto_repair?.resolution_ladder)?T.auto_repair.resolution_ladder:[];return i`<section
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
          .checked=${k}
          @change=${ee=>{L(ee.target.checked)}}
        />
        검증·배포 실패를 자동으로 해결 시도
      </label>
      <div class="worker-repo-ops__repair-state">
        <span
          class="worker-repo-ops__repair-value"
          data-seam="auto-repair-value"
          >${k?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}</span
        >
        <span
          class="worker-repo-ops__repair-budget"
          data-seam="auto-repair-budget"
          >남은 자동 해결 ${be}회</span
        >
        <span
          class="worker-repo-ops__repair-session"
          data-seam="auto-repair-session"
          >${Y?`\uD574\uACB0 \uC138\uC158 \uC2E4\uD589 \uC911 \xB7 ${Y.repair?.owner_bead||Y.operation_id}`:"\uC2E4\uD589 \uC911\uC778 \uD574\uACB0 \uC138\uC158 \uC5C6\uC74C"}</span
        >
      </div>
      ${T?i`<details
            class="worker-repo-ops__policy"
            data-seam="policy-lists"
          >
            <summary>
              Worker 자동 처리 기준
              <span class="worker-repo-ops__policy-count"
                >자동 ${(T.worker_automatic||[]).length} · 해결 사다리
                ${J.length} · 금지
                ${(T.never_automatic||[]).length}</span
              >
            </summary>
            ${S("Worker\uAC00 \uC790\uB3D9 \uCC98\uB9AC",T.worker_automatic||[],"worker-automatic")}
            ${T.supported===!1||T.schema_version!==2?i`<div
                  class="worker-repo-ops__policy-group"
                  data-policy="resolution-ladder"
                >
                  ${`\uACC4\uC57D \uC2A4\uD0A4\uB9C8 \uBD88\uC77C\uCE58 \u2014 \uC790\uB3D9 \uD574\uACB0\uC774 \uC815\uC9C0\uB418\uC5C8\uC2B5\uB2C8\uB2E4 (v${T.schema_version})`}
                </div>`:B(J)}
            ${S("\uC790\uB3D9\uC73C\uB85C \uD558\uC9C0 \uC54A\uC74C",T.never_automatic||[],"never-automatic")}
          </details>`:""}
    </section>`}return{template(){return i`<details class="worker-repo-ops-settings">
        <summary class="worker-repo-ops-settings__summary">
          저장소 작업 · 검증/배포 선언 · 자동 해결
        </summary>
        ${x(l())} ${Z()}
      </details>`}}}var Of=20,dc={verify:"\uBA38\uC9C0 \uC804 \uAC80\uC99D",deploy:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC"},uc={verify_script_failure:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0",verify_script_failure_pre_merge:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0 \uD6C4 \uBA38\uC9C0",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328 \uD574\uACB0",interrupted_without_terminal_exit:"\uC911\uB2E8\uB41C \uC791\uC5C5 \uC9C4\uB2E8"};function Df(e,t,r=Of){let n=[];for(let s of Array.isArray(e)?e:[])!s||typeof s!="object"||n.push({type:"operation",id:s.operation_id,at:typeof s.finished_at=="number"?s.finished_at:typeof s.requested_at=="number"?s.requested_at:null,operation:s});for(let s of Array.isArray(t)?t:[])!s||typeof s!="object"||n.push({type:"cleanup",id:s.bead_id,at:typeof s.at=="number"?s.at:null,cleanup:s});return n.sort((s,o)=>s.at===null&&o.at===null?String(s.id||"").localeCompare(String(o.id||"")):s.at===null?1:o.at===null?-1:o.at-s.at),n.slice(0,Math.max(0,r))}function pc(e){if(e.type==="cleanup")return"warn";let t=e.operation.state;return t==="succeeded"?"ok":t==="failed"?"fail":"live"}function Pf(e){if(e.type==="cleanup")return"\uBA48\uCDA4";switch(e.operation.state){case"succeeded":return"\uC131\uACF5";case"failed":return"\uC2E4\uD328";case"repairing":return"\uC790\uB3D9 \uD574\uACB0 \uC911";case"retry_pending":return"\uC7AC\uC2DC\uB3C4 \uC911";case"running":return"\uC2E4\uD589 \uC911";default:return"\uB300\uAE30"}}function fc(e){let t=e.filter(r=>r.value);return t.length===0?"":i`<details class="worker-ev__details">
    <summary>세부</summary>
    <dl class="worker-ev__kv">
      ${t.map(r=>i`<div>
            <dt>${r.term}</dt>
            <dd>${r.value}</dd>
          </div>`)}
    </dl>
  </details>`}function _c(e,t="",r=!1){return!e&&!t?"":i`<p
    class="worker-ev__explain${r?" worker-ev__explain--warn":""}"
  >
    <span class="worker-ev__cause">${e}</span>${t?i`<br />${t}`:""}
  </p>`}function Mf(e){if(e.state!=="failed"||e.superseded_by)return"";let t=e.repair||{},r=typeof t.remaining=="number"?t.remaining:0,n=e.failure_kind==="verify_script_failure"&&e.verify_stage==="pre_merge"?"verify_script_failure_pre_merge":e.failure_kind||"",s=r<=0;return i`<div class="worker-ev__acts">
    <button
      type="button"
      class="worker-ev__btn worker-ev__btn--primary worker-repo-op__resolve"
      data-operation-id=${e.operation_id}
      data-failure-kind=${e.failure_kind||""}
      title="해결 세션을 엽니다"
    >
      ${Object.hasOwn(uc,n)?uc[n]:"\uC2E4\uD328 \uD574\uACB0 \uC138\uC158 \uC2DC\uC791"}
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
  </div>`}function Nf(e){let t=e.operation,r=t.state==="failed",n=t.failure?t.failure.code:"";return i`<li
    class="worker-ev"
    data-operation-id=${t.operation_id}
    data-state=${t.state}
  >
    <span
      class="worker-ev__t"
      title=${e.at?dt(e.at):""}
      >${As(e.at)||"\u2014"}</span
    >
    <span class="worker-ev__node" aria-hidden="true"
      ><span class="worker-ev__dot worker-ev__dot--${pc(e)}"></span
    ></span>
    <div class="worker-ev__body">
      <div class="worker-ev__line1">
        <span class="worker-ev__what"
          >${Object.hasOwn(dc,t.kind)?dc[t.kind]:t.kind}</span
        >
        <span class="worker-ev__meta"
          >${t.target_base}@${Ss(t.target_sha)}${typeof t.elapsed_ms=="number"?` \xB7 ${To(t.elapsed_ms)}`:""}</span
        >
        <span class="worker-ev__st worker-ev__st--${pc(e)}"
          >${Pf(e)}</span
        >
        ${t.dismissed?i`<span class="worker-ev__st worker-ev__st--quiet">접수됨</span>`:""}
        ${t.superseded_by?i`<span class="worker-ev__st worker-ev__st--quiet">덮임</span>`:""}
      </div>
      ${r?_c(Rl(t.failure_kind,n)):""}
      ${Mf(t)}
      ${fc([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:r?n:""},{term:"script",value:[t.script_path||"",t.script_blob_sha?`blob ${Ss(t.script_blob_sha)}`:"",Number.isInteger(t.exit_code)?`exit ${t.exit_code}`:""].filter(Boolean).join(" \xB7 ")},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function Ff(e){let t=e.cleanup,r=Or(t.step);return i`<li
    class="worker-ev"
    data-bead-id=${t.bead_id}
    data-state="cleanup_stalled"
  >
    <span
      class="worker-ev__t"
      title=${e.at?dt(e.at):""}
      >${As(e.at)||"\u2014"}</span
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
        ${Al(t.step).map(n=>i`<li
              class="worker-step worker-step--${n.state}"
              data-step=${n.step}
            >
              <span class="worker-step__pip" aria-hidden="true"></span>
              <span class="worker-step__lb">${n.label}</span>
            </li>`)}
      </ol>
      ${_c(Cs(t.reason),typeof t.retry_count=="number"&&t.retry_count>0?`${t.retry_count}\uD68C \uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uD6C4\uC5D0\uB3C4 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.`:"\uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.",!0)}
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
      ${fc([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:t.reason||""},{term:"\uC9C4\uB2E8",value:t.detail||""},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function qf(e){return i`<section class="worker-repo-drawer" data-seam="repo-ops-timeline">
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
          ${e.events.map(t=>t.type==="cleanup"?Ff(t):Nf(t))}
        </ul>`}
  </section>`}function mc(e,t={}){let r=null;function n(){Fe(r?qf(r):i``,e)}e.addEventListener("click",a=>{a.target?.closest?.('[data-seam="repo-ops-close"]')&&o()});function s(a){r={events:Df(a.operations,a.cleanup_failures),repo:a.repo||""},n()}function o(){r!==null&&(r=null,n(),t.onClose&&t.onClose())}return{open:s,close:o,isOpen:()=>r!==null,refresh(a){r&&s(a)}}}var Bf="tab:worker:ready",Uf="tab:worker:blocked",jf="tab:worker:in-progress",Wf="tab:worker:closed",Tn=1,zf=new Set(["done","failed","orphaned","stopped","discarded"]);function gc(e){return hn(e).path.length>0}var vc="beads-ui.worker.candidate-filter",Uo={show_blocked:!1,spec:"all"};function Hf(){try{let e=window.localStorage.getItem(vc);if(!e)return{...Uo};let t=JSON.parse(e);if(!t||typeof t!="object")return{...Uo};let r=t.spec;return{show_blocked:t.show_blocked===!0,spec:r==="with"||r==="without"?r:"all"}}catch{return{...Uo}}}function Gf(e){try{window.localStorage.setItem(vc,JSON.stringify(e))}catch{}}function Vf(e,t){let r=c=>t.show_blocked||!c.blocked,n=c=>t.spec==="all"||(t.spec==="with"?c.has_spec:!c.has_spec),s=[],o=0,a=0;for(let c of e){let l=r(c),u=n(c);l&&u?s.push(c):!l&&u?o+=1:l&&!u&&(a+=1)}return{visible:s,hidden_blocked:o,hidden_spec:a}}var Yf=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],wc="bdui.worker.candidate_sort",Kf=[{value:"spec",label:"spec \uC6B0\uC120"},{value:"board",label:"Board \uC21C\uC11C"},{value:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131\uC21C"}],Is="spec";function Zf(){try{let e=window.localStorage.getItem(wc);return e==="board"||e==="created"||e==="spec"?e:Is}catch{return Is}}function Xf(e){try{window.localStorage.setItem(wc,e)}catch{}}var yc="bdui.worker.done-range";function Qf(){try{let e=window.localStorage.getItem(yc);return It(e)?e:xt}catch{return xt}}function Jf(e){try{window.localStorage.setItem(yc,e)}catch{}}var e_="(max-width: 640px)",kc="beads-ui.worker.lane-collapsed",En={queue:!0,done:!0};function t_(){try{let e=window.localStorage.getItem(kc);if(!e)return{...En};let t=JSON.parse(e);return!t||typeof t!="object"?{...En}:{queue:typeof t.queue=="boolean"?t.queue:En.queue,done:typeof t.done=="boolean"?t.done:En.done}}catch{return{...En}}}function r_(e){try{window.localStorage.setItem(kc,JSON.stringify(e))}catch{}}function hc(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let r=typeof t.title=="string"?t.title:t.id||"";return r.length>22?`${r.slice(0,22)}\u2026`:r}function n_(e,t,r){let n=Array.isArray(e)?e.slice():[];return t==="created"?n.sort(Cr):(n.sort(Wn(r)),t==="board"?n:[...n.filter(gc),...n.filter(s=>!gc(s))])}function s_(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function o_(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function a_(e){let r=(Array.isArray(e?.dependencies)?e.dependencies:[]).map(n=>typeof n=="string"?n:n&&n.id).filter(Boolean);return r.length>0?`\u{1F512} ${r.join(", ")}`:"\u{1F512} blocked"}var i_=["closed_unmerged","review","undecidable"],l_=[{from:"\uAD00\uCE21 \uB300\uAE30",activity:"checking",to:"\uD655\uC778\uC911"},{from:"\uAC80\uC99D \uB300\uAE30",activity:"verifying",to:"\uAC80\uC99D \uC911"}];function c_(e,t){for(let r of l_)if(e===r.from&&t===r.activity)return{label:r.to,live:!0};return{label:e,live:!1}}function bc(e){switch(e){case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";default:return e}}function d_(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}function jo(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}function u_(e){if(!e||typeof e!="object")return null;let t=Number.isInteger(e.repair_sessions_used)?Math.max(0,e.repair_sessions_used):0,r=Number.isInteger(e.repair_session_cap)?Math.max(0,e.repair_session_cap):0,n=e.current_repair&&typeof e.current_repair=="object"?e.current_repair:null,s=n&&typeof n.pr_number=="number"?n.pr_number:null,o="";switch(e.phase){case"gating":o="root \uC7AC\uAC80\uC99D \uC911";break;case"repairing":o=e.subject_role==="root"?`\uC790\uB3D9\uBCF5\uAD6C ${t}/${r} \xB7 \uC6D0 PR \uC218\uC815 \uC911`:`\uC790\uB3D9\uBCF5\uAD6C ${t}/${r} \xB7 repair PR \uC900\uBE44 \uC911`;break;case"waiting_repair_pr":o=s?`repair PR #${s} \uB300\uAE30`:"repair PR \uB300\uAE30";break;case"merging":o=e.subject_role==="repair"?s?`repair PR #${s} \uBA38\uC9C0 \uC911`:"repair PR \uBA38\uC9C0 \uC911":"root \uBA38\uC9C0 \uC911";break;case"cleaning":o="\uC815\uB9AC \uBCF5\uAD6C \uC911";break;case"paused":o="\uC790\uB3D9\uBCF5\uAD6C \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":o=`\uC0AC\uB78C \uD655\uC778 \uD544\uC694 \xB7 ${e.terminal_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`;break;case"completed":return null;default:return null}let a=[`\uBCF5\uAD6C \uC138\uC158 ${t}/${r}`];return e.head_sha&&a.push(`head ${e.head_sha}`),e.base_sha&&a.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&a.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`),e.active_attempt_id&&a.push(`attempt ${e.active_attempt_id}`),n&&typeof n.bead_id=="string"&&a.push(`repair ${n.bead_id}`),e.evidence&&a.push(e.evidence),e.log_path&&a.push(e.log_path),{badge:o,title:a.join(`
`),alert:e.phase==="needs_human",lock_actions:e.phase!=="paused"&&e.phase!=="needs_human",repair_pr_url:n&&typeof n.pr_url=="string"?n.pr_url:"",repair_pr_number:s}}function p_(e,t,r,n,s=null,o=null,a=null,c=!1,l=null,u=!0,f=null,_=null,b=null,A={},x=!1){let L=!!l&&l.position>0,q=!!l?.continuation_action&&l.continuation_action.continuation===null,S=!!l&&l.active===!0,B=l&&l.failure||null,Z=r[e]||null,y=Z&&Z.gate?Z.gate:null,k=Z&&Z.pr?Z.pr:null,T=u_(b),X=d_(l?l.resolution:null),Y=[];c&&Y.push("\uC138\uC158");let ne=a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":X?X.badge:a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":null,be=c_(c&&y&&y.tier==="closed_unmerged"?"\uB2EB\uD798":y&&y.gate_badge||"",ne?null:o&&o.activity||null);if(ne&&Y.push(ne),be.label&&Y.push(be.label),y&&y.base_badge&&y.base_badge!==y.gate_badge&&Y.push(y.base_badge),_&&Y.push(_),n){let Se=Or(n.step);Y.push(Se?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${Se}`:"\uC815\uB9AC \uBA48\uCDA4")}T&&Y.push(T.badge),L&&!S&&Y.push(`\uBA38\uC9C0 \uB300\uAE30 #${l.position}`),B&&Y.push(`\uC77C\uAD04 \uBA38\uC9C0 \uC2E4\uD328: ${bc(B)}`),q&&Y.push("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"),f&&Y.push(`\uC790\uB3D9 \uC81C\uC678: ${bc(f)}`);let J=!!y&&y.base_badge==="\uCDA9\uB3CC",ee=!!y&&y.enabled===!0,Ee=Co(o&&o.merge_progress?o.merge_progress.step:null),je=!!n&&["child_sweep","branch_cleanup","parent_close"].includes(n.step)&&!!y&&y.tier==="merged",et=c&&!!n&&!!y&&y.tier==="merged",Ne=c&&J&&u===!1,We=Zt(A,e,{external:c,merge_active:S||!!Ee,merge_queued:L,conflict_active:!!a,cleanup_active:!1,merged:!!n||y?.tier==="merged"}),Ce=!!We.operation,fe=!je&&!!n&&n.step==="repo_operations";return{id:e,title:t,reason:n?Es(n.step):"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",worker_serial:x,external:c,pr_number:k&&typeof k.number=="number"?k.number:null,pr_url:k&&typeof k.url=="string"?k.url:"",completion_badge:T?T.badge:null,completion_title:T?T.title:"",completion_repair_pr_url:T?T.repair_pr_url:"",completion_repair_pr_number:T?T.repair_pr_number:null,badges:Y,live_badge:a==="paused"?null:X?.live||a==="running"?ne:be.live?be.label:null,usage:s,alert:!!y&&i_.includes(y.tier)||!!n||!!B||!!(T&&T.alert),merge_action:fe?!1:!L||q,timeline_action:fe,cancel_action:L&&!q,cancel_enabled:!S&&!(T&&T.lock_actions),cancel_title:T&&T.lock_actions?"\uC790\uB3D9\uBCF5\uAD6C \uC911 \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694":S?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:We,discard_action:We.action,merge_step:Ee,discard_enabled:We.enabled,discard_title:We.title,merge_enabled:!Ee&&!a&&!Ce&&!(T&&T.lock_actions)&&!Ne&&!fe&&(ee||J||je||et),merge_label:q?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":je||et?"\uC815\uB9AC \uC7AC\uAC1C":J&&!Ee&&!je?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:Ce?We.error?`\uD3D0\uAE30 \uC2E4\uD328: ${We.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${We.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:q?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":Ee?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${Ee.label}`:et?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Ne?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":je?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":J?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":ee?`\uBA38\uC9C0 (${y.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:y&&y.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${y&&y.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function Wo(e,t={}){let{transport:r,issueStores:n,queueStore:s,sessionLogStore:o,uiOrderStore:a,gotoIssue:c,getWorkspacePath:l,doneRange:u,onDoneRangeChange:f}=t,_=n?Hn(n,a):null,b=Vn({transport:r,uiOrderStore:a}),A=null,x=[],L=Hf(),q=Zf(),S=It(u)?u:Qf(),B=new Map;function Z(){let p=Yt.find(v=>v.value===S);return p?p.label:"\uC624\uB298"}let y=t_(),k=!1,T=new Set,X=new Set,Y=new Set,ne=new Set,be="ordinary",J=!1,ee=new Map,Ee=[],je=document.createElement("div");je.className="worker-console";let et=document.createElement("div");et.className="worker-top";let Ne=document.createElement("div");Ne.className="worker-drawer-overlay",Ne.hidden=!0;let We=document.createElement("div");We.className="worker-drawer-overlay__backdrop";let Ce=document.createElement("div");Ce.className="worker-drawer-host";let fe=document.createElement("div");fe.className="worker-drawer-host",fe.hidden=!0,Ne.append(We,Ce,fe);let Se=document.createElement("div");Se.className="worker-lanes-host",je.append(et,Ne,Se),e.appendChild(je);let he=null,H=fs(Ce,{transport:r,sessionLogStore:o,onClose:()=>{he=null,Ne.hidden=!0,G()}}),z=mc(fe,{onClose:()=>{fe.hidden=!0,Ne.hidden=!0,G()}}),Ie=cc({queueStore:s,transport:r,getWorkspacePath:l,onChanged:()=>G()});function ie(){return s&&s.get()||{revision:0,auto_advance:!1,auto_merge:!1,pr_wait_holds_slot:!1,slots:Tn,queue:[],pr_wait:[],done:[]}}function se(){let p=ie();return typeof p.revision=="number"?p.revision:0}function E(p){p&&p.queue&&s&&s.set(p.queue)}function N(){let p=ie().queue;return Array.isArray(p)?p.length:0}async function ue(p,v){if(!r)return;let O=await r("worker-queue-place",{bead_id:p,index:v,expected_revision:se()});E(O),O&&O.conflict&&await r("worker-queue-place",{bead_id:p,index:v,expected_revision:se()}).then(E)}async function Pe(p,v){if(!r)return;let O=await r("worker-queue-reorder",{bead_id:p,to_index:v,expected_revision:se()});E(O),O&&O.conflict&&await r("worker-queue-reorder",{bead_id:p,to_index:v,expected_revision:se()}).then(E)}async function R(p){if(!r)return;let v=await r("worker-queue-remove",{bead_id:p,expected_revision:se()});E(v),v&&v.conflict&&await r("worker-queue-remove",{bead_id:p,expected_revision:se()}).then(E)}async function U(){if(!r||J)return;let v=(Array.isArray(ie().queue)?ie().queue:[]).map(g=>g.bead_id).filter(g=>ne.has(g));if(v.length===0)return;if(v.some(g=>{let P=ee.get(g);return P!==!0&&P!==!1})){re("\uC2E4\uD589 \uBC29\uC2DD \uD655\uC778 \uC911","warning");return}let O=be==="serial",ce=v.filter(g=>ee.get(g)!==O);if(ce.length===0){ne.clear(),G(),re("\uC774\uBBF8 \uAC19\uC740 \uC2E4\uD589 \uBC29\uC2DD\uC785\uB2C8\uB2E4","info");return}J=!0,G();let ge=[],j=0;try{for(let g of ce){let P=await Promise.resolve(r(O?"label-add":"label-remove",{id:g,label:Bo})).catch(()=>[]),W=Array.isArray(P)?P[0]:P,xe=W&&typeof W=="object"?W.labels:null;W&&typeof W=="object"&&W.id===g&&Array.isArray(xe)&&An(xe)===O?j+=1:ge.push(g)}if(ge.length===0){ne.clear(),re(`${j}\uAC1C \uC2E4\uD589 \uBC29\uC2DD \uBCC0\uACBD`,"success");return}ne.clear();for(let g of ge)ne.add(g);re(`${ce.length}\uAC1C \uC911 ${j}\uAC1C \uBCC0\uACBD \xB7 ${ge.length}\uAC1C \uC2E4\uD328 (${ge.join(", ")})`,"error")}finally{J=!1,G()}}async function C(p){if(!r||!p)return;let v=await r("worker-attempt-pause",{attempt_id:p});v&&v.paused===!1&&v.reason&&re(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${v.reason}`,"error",2400)}async function Q(p){if(!r||!p)return;let v=async(ce={})=>await r("worker-attempt-resume",{attempt_id:p,expected_revision:se(),...ce}),O=await v();E(O),O&&O.conflict&&(O=await r("worker-attempt-resume",{attempt_id:p,expected_revision:se()}),E(O)),O=await sr(O,(ce,ge)=>v({continuation:ce,decision_token:ge}),{onResult:E,refresh:()=>v()}),O&&O.resumed===!1&&!O.conflict&&O.reason&&re(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${O.reason}`,"error",2400)}async function ae(p){if(!r||!p)return;let v=await r("worker-attempt-dismiss",{attempt_id:p,expected_revision:se()});E(v),v&&v.conflict&&(v=await r("worker-attempt-dismiss",{attempt_id:p,expected_revision:se()}),E(v)),v&&v.dismissed===!1&&!v.conflict&&v.reason&&re(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${v.reason}`,"error",2400)}async function te(p,v,O=!0){if(!r)return null;let ce=r,ge=await ce(p,{...v,expected_revision:se()});return E(ge),ge&&ge.conflict&&O&&(ge=await ce(p,{...v,expected_revision:se()}),E(ge)),ge}async function le(p){if(!r||!p)return;let v=ie().merge_queue?.find(ce=>ce.bead_id===p)?.continuation_action;if(v?.mismatch&&v.continuation===null){await I(p,v.mismatch);return}T.add(p),G();let O;try{O=await te("worker-merge-queue-add",{bead_id:p})}finally{T.delete(p),G()}!O||O.conflict||O.applied||re("\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)","error",2400)}async function ve(p){if(!(!r||!p||X.has(p))){X.add(p),G();try{let v=await r("worker-cleanup-retry",{bead_id:p,expected_revision:se()});E(v),v&&!v.retried&&!v.conflict&&v.reason&&re(`\uC815\uB9AC \uC7AC\uAC1C \uAC70\uBD80: ${v.reason}`,"error",2400)}finally{X.delete(p),G()}}}async function I(p,v){let O=await sr({continuation_mismatch:v},(ge,j)=>te("worker-merge-queue-add",{bead_id:p,continuation:ge,decision_token:j},!1)),ce=O?.queue?.merge_queue?.find(ge=>ge.bead_id===p)?.continuation_action;if(O?.applied!==!0&&ce?.continuation===null&&ce.mismatch){await I(p,ce.mismatch);return}O&&O.applied===!1&&!O.conflict&&re("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD\uC774 \uCD5C\uC2E0 \uC0C1\uD0DC\uC640 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4","error",2800)}async function K(p){if(!r)return;let v=await te("worker-merge-auto-toggle",{on:p});!v||v.conflict||re(p?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",p?"success":"info",2400)}async function pe(p){if(!r||!p)return;let v=await te("worker-merge-queue-remove",{bead_id:p});v&&!v.conflict&&!v.applied&&v.reason==="merge_active"&&re("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function Re(){await te("worker-merge-queue-remove",{all:!0})}async function Le(p,v=null,O="unmerged",ce=null){if(!r||!p)return;let ge=yn(p,O);if(!(typeof globalThis.confirm!="function"||globalThis.confirm(ge)))return;let g=await r("worker-discard",{bead_id:p,...v?{attempt_id:v}:{},...ce?{operation_id:ce}:{},expected_revision:se()});if(E(g),g&&g.conflict&&(g=await r("worker-discard",{bead_id:p,...v?{attempt_id:v}:{},...ce?{operation_id:ce}:{},expected_revision:se()}),E(g)),g&&g.discarded===!0){re(Ts(g),"success",5e3);return}if(g&&g.reason){re(`\uD3D0\uAE30 \uC2E4\uD328: ${g.reason}`,"error",2800);return}if(g&&g.accepted&&g.pending==="merged_revert"){re("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(g&&g.accepted&&!g.discarded){re(`\uD3D0\uAE30 \uC9C4\uD589: ${g.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}g&&!g.conflict&&re("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function Me(p,v){if(!r||!v||Y.has(v))return;Y.add(v),G();let O;try{let ce=async(ge={})=>await r(p,{bead_id:v,expected_revision:se(),...ge});O=await ce(),E(O),O&&O.conflict&&(O=await r(p,{bead_id:v,expected_revision:se()}),E(O)),p==="worker-revise-fix"&&(O=await sr(O,(ge,j)=>ce({continuation:ge,decision_token:j}),{onResult:E,refresh:()=>ce()}))}finally{Y.delete(v),G()}if(!(!O||O.conflict)){if(O.ok){re(p==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}re(`\uCC98\uBD84 \uAC70\uBD80: ${O.reason||""}`,"error",3e3)}}async function tt(p){if(!r)return;let v=await r("worker-automation-toggle",{on:p,expected_revision:se()});E(v),v&&v.conflict&&await r("worker-automation-toggle",{on:p,expected_revision:se()}).then(E)}async function Ye(p){if(!r||!p)return;let v=await r("worker-repo-operation-repair",{operation_id:p});if(E(v),v&&v.ok===!1){re(`\uD574\uACB0 \uC138\uC158 \uAC70\uBD80: ${v.reason||""}`,"error",3e3);return}v&&v.ok===!0&&re("\uD574\uACB0 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4","success",2400)}async function Qe(p){if(!r||!p)return;let v=await r("worker-repo-operation-dismiss",{operation_id:p});E(v),v&&v.ok===!1&&re(`\uAE30\uB85D \uB2EB\uAE30 \uAC70\uBD80: ${v.reason||""}`,"error",3e3)}async function At(p){if(!r||!Number.isFinite(p))return;let v=Math.max(Tn,Math.floor(p)),O=await r("worker-queue-set-slots",{slots:v,expected_revision:se()});E(O),O&&O.conflict&&await r("worker-queue-set-slots",{slots:v,expected_revision:se()}).then(E)}async function Tt(p){if(!r)return;let v=await r("worker-queue-set-pr-wait-hold",{on:p,expected_revision:se()});E(v),v&&v.conflict&&await r("worker-queue-set-pr-wait-hold",{on:p,expected_revision:se()}).then(E)}function lt(){let p=ie(),v=_?_.selectBoardColumn(Bf,"ready"):[],O=_?_.selectBoardColumn(Uf,"blocked"):[],ce=_?_.selectBoardColumn(Wf,"closed"):[],ge=_?_.selectBoardColumn(jf,"in_progress"):[],j=new Map;for(let h of ge){let D=o_(h);if(!D)continue;let oe=j.get(D);oe?oe.push(h):j.set(D,[h])}let g=h=>{let D=Gn(j.get(h)||[]);return D?D.title||D.id:null},P=p.bead_titles||{},W=new Map;for(let[h,D]of Object.entries(P))typeof D=="string"&&D.length>0&&W.set(h,D);for(let h of[...v,...O])W.set(h.id,h.title||h.id);ee.clear();let xe=p.bead_times&&typeof p.bead_times=="object"&&!Array.isArray(p.bead_times)?p.bead_times:{},Ge=p.bead_labels&&typeof p.bead_labels=="object"&&!Array.isArray(p.bead_labels)?p.bead_labels:{};for(let[h,D]of Object.entries(Ge))Array.isArray(D)&&ee.set(h,An(D));for(let h of[...v,...O]){let D=h.labels;if(!Array.isArray(D))continue;if(!ee.has(h.id)){ee.set(h.id,An(D));continue}let oe=xe[h.id],He=nr(oe&&typeof oe=="object"?oe.updated_at:null),Vt=nr(h.updated_at);Vt!==null&&He!==null&&Vt>He&&ee.set(h.id,An(D))}let Be=new Map;for(let[h,D]of Object.entries(xe))D&&typeof D=="object"&&Be.set(h,D);for(let h of[...v,...O])Be.set(h.id,{created_at:h.created_at,updated_at:h.updated_at});let m=h=>Be.get(h)||{},d=p.pr_wait||[],$=p.pr_observations||{},w=p.pr_activity||{},M=p.cleanup_failed||{},de=Object.entries(M).map(([h,D])=>({bead_id:h,step:D&&D.step?D.step:"",reason:D&&D.reason?D.reason:"",at:D&&typeof D.at=="number"?D.at:null,detail:D&&typeof D.detail=="string"?D.detail:null,output_tail:D&&typeof D.output_tail=="string"&&D.output_tail?D.output_tail:void 0,log_path:D&&typeof D.log_path=="string"&&D.log_path?D.log_path:void 0,retry_count:D&&typeof D.retry_count=="number"&&Number.isInteger(D.retry_count)&&D.retry_count>0?D.retry_count:0,failure_code:D&&typeof D.failure_code=="string"?D.failure_code:void 0,subject_id:D&&typeof D.subject_id=="string"?D.subject_id:void 0,repair_eligible:!!(D&&D.repair_eligible),repair:D&&D.repair?D.repair:void 0})),ke=p.queue||[],it=new Set(ke.map(h=>h.bead_id));for(let h of ne)it.has(h)||ne.delete(h);let Oe=new Set([...ke.map(h=>h.bead_id),...d.map(h=>h.bead_id),...p.done.map(h=>h.bead_id)]),me=new Set(O.map(h=>h.id)),Je=a?a.get()?.order||{}:{},Pr=new Set,Vo=[];for(let h of[...v,...O])Oe.has(h.id)||Pr.has(h.id)||s_(h)||lc(h.labels)||(Pr.add(h.id),Vo.push(h));x=n_(Vo,q,Je);let Dc=p.admission||{},Yo=h=>{let D=Dc[h];if(!D)return"";if(D.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let oe=typeof D.reason=="string"?D.reason:"",He=oe.indexOf(":");return He>0&&He<oe.length-1?`\u26D4 ${oe.slice(0,He)} (${oe.slice(He+1)})`:`\u26D4 ${oe}`},Pc=x.map(h=>{let D=hn(h),oe=D.path.length>0,He=h.workflow?.route==="quick_fix"||h.metadata&&h.metadata.route==="quick_fix",Vt=!He&&oe&&!D.conflict,pr=me.has(h.id),Ct=[];pr&&Ct.push(a_(h)),He?Ct.push("quick_fix \xB7 \uC6CC\uCEE4 \uBE44\uB300\uC0C1"):D.conflict?Ct.push("spec_id_conflict"):oe||Ct.push("spec \uC5C6\uC74C");let Dn=Yo(h.id);return Dn&&Ct.push(Dn),{id:h.id,title:h.title||h.id,reason:Ct.join(" \xB7 "),draggable:Vt,lane:"candidate",created_at:h.created_at,updated_at:h.updated_at,workflow:h.workflow,is_quick_fix:He,status:h.status,blocked:pr,has_spec:oe}}),Ls=Vf(Pc,L),Mc=Ls.visible,Nc=p.revise_parked||{},Kr=p.discard_operations&&typeof p.discard_operations=="object"&&!Array.isArray(p.discard_operations)?p.discard_operations:{},Ko=(h,D)=>h.map(oe=>{let He=D==="queue"?Nc[oe.bead_id]:null,Vt=D==="queue"?Zt(Kr,oe.bead_id):null,pr=Vt?.operation?Vt:null,Ct=D==="queue"?ee.has(oe.bead_id)?ee.get(oe.bead_id)||!1:null:!1,Dn=Ct===!0&&(Object.values(p.attempts||{}).some(tr=>tr&&tr.bead_id!==oe.bead_id&&!zf.has(tr.status))||d.some(tr=>tr.bead_id!==oe.bead_id)||Object.values(Kr).some(tr=>tr&&tr.bead_id!==oe.bead_id&&tr.phase!=="done")),_a=D==="done"?[]:[Yo(oe.bead_id)];return Dn&&_a.unshift("\uB2E4\uB978 \uC791\uC5C5 \uC885\uB8CC \uB300\uAE30 \xB7 \uBA38\uC9C0\uAE4C\uC9C0 \uB2E8\uB3C5"),{id:oe.bead_id,title:W.get(oe.bead_id)||oe.bead_id,reason:_a.filter(Boolean).join(" \xB7 "),draggable:D!=="done"&&!pr,done:D==="done",lane:D,selectable:D==="queue",selected:D==="queue"&&ne.has(oe.bead_id),worker_serial:Ct,discard:pr,badges:He?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!He,revise_action:!!He,revise_enabled:!!He&&!pr&&!Y.has(oe.bead_id),revise_title:He?He.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${He.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":"",usage:D==="done"?Lt(p.attempts||{},oe.bead_id):null,done_at:D==="done"&&typeof oe.added_at=="number"?oe.added_at:void 0,...m(oe.bead_id)}}),Zo=new Map;for(let h of p.done)h&&typeof h.bead_id=="string"&&typeof h.added_at=="number"&&Zo.set(h.bead_id,h.added_at);let Zr=p.attempts?Object.values(p.attempts):[],Os=new Set;for(let h of Zr)h&&typeof h.resumed_from=="string"&&h.resumed_from.length>0&&Os.add(h.resumed_from);let Ds=new Map;for(let h of Zr)Ds.set(h.bead_id,h.attempt_id);let Ps=new Map;for(let h of Zr)Ps.set(h.attempt_id,h);function Ms(h){let D=new Set,oe=h;for(;oe&&!D.has(oe.attempt_id);){if(oe.conflict_resolution===!0)return!0;D.add(oe.attempt_id),oe=typeof oe.resumed_from=="string"&&oe.resumed_from.length>0&&Ps.get(oe.resumed_from)||null}return!1}let Cn=typeof p.declared_base=="string"?p.declared_base:null;function Fc(h){let D=null;for(let oe of Zr)!oe||oe.bead_id!==h||Ms(oe)||(D===null||(typeof oe.started_at=="number"?oe.started_at:0)>=(typeof D.started_at=="number"?D.started_at:0))&&(D=oe);return D&&typeof D.target_base=="string"?D.target_base:null}let Xo=[],Qo=[],qc=h=>{let D=Ds.get(h.bead_id)!==h.attempt_id,oe=Zo.get(h.bead_id),He=typeof oe=="number"&&oe>0&&typeof h.finished_at=="number"&&oe>=h.finished_at;return!D&&!He&&typeof h.dismissed_at!="number"},Jo=h=>{let D=typeof h.session_id=="string"&&h.session_id.length>0,oe=Os.has(h.attempt_id);return{eligible:D&&!oe,reason:D?oe?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}},Nt=null;for(let h of Zr){let D=h.status==="paused"&&!Os.has(h.attempt_id);if(h.status==="running"||D)Qo.push({bead_id:h.bead_id,attempt_id:h.attempt_id,title:W.get(h.bead_id)||h.bead_id,runner:h.runner||null,model:h.model||null,effort:h.effort||null,speed:h.speed||null,continuation_mode:h.continuation_mode||null,started_at:typeof h.started_at=="number"?h.started_at:null,resumed_from:h.resumed_from||null,paused:D,conflict_resolution:Ms(h),base_exception:jo(Cn,h.target_base),can_pause:typeof h.session_id=="string"&&h.session_id.length>0,discard:Zt(Kr,h.bead_id,{attempt_id:h.attempt_id}),usage:Lt(p.attempts||{},h.bead_id),current_child:g(h.bead_id),...m(h.bead_id)});else if((h.status==="failed"||h.status==="orphaned")&&qc(h)){let oe=Jo(h);Xo.push({bead_id:h.bead_id,attempt_id:h.attempt_id,title:W.get(h.bead_id)||h.bead_id,runner:h.runner||null,model:h.model||null,effort:h.effort||null,speed:h.speed||null,continuation_mode:h.continuation_mode||null,started_at:typeof h.started_at=="number"?h.started_at:null,resumed_from:h.resumed_from||null,failed:!0,status:h.status,status_label:h.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328",discard:Zt(Kr,h.bead_id,{attempt_id:h.attempt_id}),resume_eligible:oe.eligible,resume_reason:oe.reason,conflict_resolution:Ms(h),base_exception:jo(Cn,h.target_base),usage:Lt(p.attempts||{},h.bead_id),current_child:g(h.bead_id),...m(h.bead_id)}),Nt=h}}let Rn=[...Xo,...Qo],ea=null;if(Nt){let h=Jo(Nt),D=Nt.cause_detail;ea={bead_id:Nt.bead_id,repo:Nt.repo||"",reason:Nt.cause||Nt.status,cause_detail:D&&typeof D.reason=="string"?{reason:D.reason,command:typeof D.command=="string"?D.command:null}:null,resume_attempt_id:Nt.attempt_id,resume_eligible:h.eligible,resume_reason:h.reason,discard:Zt(Kr,Nt.bead_id,{attempt_id:Nt.attempt_id})}}let Bc=new Set(Rn.map(h=>h.bead_id)),Ns=Array.isArray(p.merge_queue)?p.merge_queue:[],ta=new Map,ra=new Map,na=new Map;Ns.forEach((h,D)=>{h&&typeof h.bead_id=="string"&&(ta.set(h.bead_id,D+1),ra.set(h.bead_id,h.resolution),na.set(h.bead_id,h.continuation_action||null))});let sa=p.merge_queue_state||{active:null,failures:{}},Uc=sa.failures||{},jc=p.auto_merge_skips||{},oa=h=>{let D=jc[h];if(!D)return null;let oe=$[h],He=oe&&oe.pr?oe.pr.head_sha:null;return He&&He===D.head_sha?D.reason||"":null},In=new Map;for(let h of Rn)h.failed!==!0&&h.conflict_resolution&&(h.paused?In.has(h.bead_id)||In.set(h.bead_id,"paused"):In.set(h.bead_id,"running"));let aa=Rn.filter(h=>!h.paused&&h.failed!==!0).length,ia=(p.workspace_info||{}).slots,Wc=typeof ia=="number"?ia:typeof p.slots=="number"?p.slots:Tn,la=p.pr_wait_holds_slot===!0?Tn:Wc,zc=aa>la,Ln=Tr(S),Hc=(Array.isArray(p.done)?p.done.slice():[]).filter(h=>Ln===void 0||typeof h.added_at!="number"||h.added_at>=Ln).sort((h,D)=>(D.added_at||0)-(h.added_at||0)),Xr=Ko(Hc,"done"),Gc=new Set((Array.isArray(p.done)?p.done:[]).map(h=>h?.bead_id).filter(h=>typeof h=="string")),ca=[],Vc=l?.()||"";for(let h of ce){let D=nr(h.closed_at);if(typeof h.id!="string"||Gc.has(h.id)||D===null||Ln!==void 0&&D<Ln||typeof h.comment_count!="number"||h.comment_count<=0)continue;let oe=`${Vc}\0${h.id}\0${String(h.updated_at)}\0${h.comment_count}`,He=B.get(oe);He===void 0&&r&&(B.set(oe,"pending"),Promise.resolve(r("get-comments",{id:h.id})).then(Vt=>{let pr=Array.isArray(Vt)&&Vt.some(Ct=>_s(typeof Ct?.text=="string"?Ct.text:"")?.lane==="session");B.set(oe,pr?"session":"not-session"),G()}).catch(()=>{B.set(oe,"failed"),G()})),He==="session"&&ca.push({id:h.id,title:h.title||h.id,reason:"",draggable:!1,done:!0,lane:"done",selectable:!1,selected:!1,worker_serial:!1,badges:["\uC138\uC158 \uC791\uC5C5"],alert:!1,usage:null,done_at:D,created_at:h.created_at,updated_at:h.updated_at})}Xr.push(...ca),Xr.sort((h,D)=>(D.done_at||0)-(h.done_at||0));let On={};for(let h of or)On[h]=0;let da=!1,ua=0,Fs=0,pa=0;for(let h of Xr){let D=h.usage;if(D&&typeof D=="object"){let oe=!1;for(let He of or)Number.isFinite(D[He])&&(On[He]+=D[He],da=!0,oe=!0);oe&&(Fs+=1,Number.isFinite(D.total_cost_usd)&&(ua+=D.total_cost_usd,pa+=1))}}Fs>0&&pa===Fs&&(On.total_cost_usd=ua);let fa=Xr.map(h=>h.usage).filter(h=>h&&typeof h=="object"&&h.providers),Yc=fa.length>0?_t(Jn(fa)):da?qt(On):null;return{queue:p,idToTitle:W,candidates:Mc,candidate_hidden:{blocked:Ls.hidden_blocked,spec:Ls.hidden_spec},running:Rn,live_count:aa,slots:la,over_cap:zc,failure:ea,waiting:Ko(ke.filter(h=>!Bc.has(h.bead_id)),"queue"),pr_wait:d.map(h=>p_(h.bead_id,W.get(h.bead_id)||h.bead_id,$,M[h.bead_id]||null,Lt(p.attempts||{},h.bead_id),w[h.bead_id]||(T.has(h.bead_id)||X.has(h.bead_id)?{activity:null,merge_progress:{step:"merging"}}:null),In.get(h.bead_id)||null,h.external===!0,{position:ta.get(h.bead_id)||0,active:sa.active===h.bead_id,failure:Uc[h.bead_id]||null,resolution:ra.get(h.bead_id),continuation_action:na.get(h.bead_id)},h.wt_present!==!1,p.auto_merge===!0?oa(h.bead_id):null,jo(Cn,Fc(h.bead_id)),p.completion_status&&typeof p.completion_status=="object"&&!Array.isArray(p.completion_status)&&p.completion_status[h.bead_id]||null,p.discard_operations&&typeof p.discard_operations=="object"&&!Array.isArray(p.discard_operations)?p.discard_operations:{},Ps.get(Ds.get(h.bead_id)||"")?.worker_serial===!0)).map(h=>({...h,...m(h.id)})),merge_queue_length:Ns.length,merge_queue_running:Ns.length>0,auto_excluded:d.map(h=>h.bead_id).filter(h=>oa(h)!==null),verify_cmd_present:!!(p.workspace_info||{}).verify_cmd,declared_base:Cn,done:Xr,token_total:Yc,cleanup_failures:de,repo_operations:Array.isArray(p.repo_operations)?p.repo_operations:[]}}function yt(p){let v=p.waiting.length>0?p.waiting[0].id:"\u2014",O=i`<button
      type="button"
      class="worker-play${p.queue.auto_advance?" is-active":""}"
    >
      ${p.queue.auto_advance?"\u23F8 \uC790\uB3D9\uD654 \uBA48\uCDA4":"\u25B6 \uC790\uB3D9\uD654"}
    </button>`,ce=F(p),ge=p.over_cap?i`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",j=i`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${p.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${p.pr_wait.length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${Z()} 완료 <b>${p.done.length}</b></span
      >`,g=i`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${p.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${p.declared_base||"?"}</span
    >`,P=i`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${Tn}
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
      </label> `,W=Ll({failure:p.failure}),xe=xl(p.repo_operations,p.cleanup_failures);return k?i`<div class="worker-ribbon">
          ${O} ${ce}
          <div class="worker-kpi worker-kpi--ribbon">${ge}${j}</div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${P}</div>
          <div class="worker-kpi">${g}</div>
        </div>
        ${xe}${Ie.template()}${W}`:i`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${O}${ce}${P}</div>
        <div class="worker-kpi">
          ${ge}${j}${g}
          ${(Array.isArray(p.token_total)?p.token_total:p.token_total?[{label:p.token_total,tooltip:`${Z()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(Ge=>i`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${Ge.tooltip}
                >${Z()} 완료 · 누적 ${Ge.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${v}</b></span
          >
        </div>
      </div>
      ${xe}${Ie.template()}${W}`}function $t(p){if(p.running.length===0&&p.pr_wait.length===0)return"";let v=p.running.some(O=>!O.paused&&O.failed!==!0);return i`<section
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
      ${p.running.length>0?Oo(p.running,Date.now(),he):""}
      ${p.pr_wait.map(O=>Eo(O))}
    </section>`}function rt(p){let v=p.candidate_hidden;return i`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${L.show_blocked}
        />
        🔒 blocked${v.blocked>0?` ${v.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${Yf.map(O=>i`<button
              type="button"
              class="worker-filter__chip${L.spec===O.value?" is-active":""}"
              data-spec=${O.value}
              aria-pressed=${L.spec===O.value?"true":"false"}
            >
              ${O.label}
            </button>`)}
        ${v.spec>0?i`<span class="worker-filter__hidden">숨김 ${v.spec}</span>`:""}
      </div>
    </div>`}function ot(){return i`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${q}
    >
      ${Kf.map(p=>i`<option value=${p.value} ?selected=${q===p.value}>
            ${p.label}
          </option>`)}
    </select>`}function Ze(){return i`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${S}
      >
        ${Yt.map(p=>i`<option value=${p.value} ?selected=${S===p.value}>
              ${p.label}
            </option>`)}
      </select>
    </div>`}function at(){if(ne.size===0)return"";let p=Array.from(ne),v=p.some(O=>{let ce=ee.get(O);return ce!==!0&&ce!==!1});return i`<div
      class="worker-bulk"
      role="group"
      aria-label="실행 방식 일괄 변경"
    >
      <span class="worker-bulk__count">${p.length}개 선택</span>
      <select
        class="worker-bulk__mode"
        aria-label="실행 방식"
        .value=${be}
        ?disabled=${J}
      >
        <option value="ordinary">일반 병렬</option>
        <option value="serial">🔒 머지까지 단독</option>
      </select>
      <button
        type="button"
        class="worker-bulk__apply"
        ?disabled=${v||J}
        title=${v?"\uC120\uD0DD\uD55C \uC791\uC5C5\uC758 \uC2E4\uD589 \uBC29\uC2DD\uC744 \uD655\uC778\uD558\uB294 \uC911\uC785\uB2C8\uB2E4":J?"\uC2E4\uD589 \uBC29\uC2DD \uBCC0\uACBD \uC911\uC785\uB2C8\uB2E4":"\uC120\uD0DD\uD55C \uC791\uC5C5\uC5D0 \uC801\uC6A9"}
      >
        적용
      </button>
      <span class="worker-bulk__hint">선택한 대기 작업에만 적용됩니다</span>
    </div>`}function pt(p){let v=(p.queue.pr_wait||[]).filter(j=>j&&j.external!==!0&&typeof j.bead_id=="string"),O=new Set(p.running.filter(j=>!j.paused&&j.failed!==!0).map(j=>j.bead_id));for(let j of v)O.add(j.bead_id);let ce=!(p.queue.pr_wait_holds_slot!==!0||p.queue.auto_advance!==!0||p.queue.auto_merge===!0||v.length===0||p.waiting.length===0||O.size<p.slots),ge=p.pr_wait.some(j=>j.worker_serial===!0);if(!(!ce&&!(ge&&p.queue.auto_merge!==!0)))return i`${ce?i`<div class="worker-stat worker-pr-wait-hint">
          PR 머지 대기 중 — 다음 이슈는 머지·정리 완료 후 시작됩니다 (자동 머지
          꺼짐)
        </div>`:""}${ge&&p.queue.auto_merge!==!0?i`<div
          class="worker-stat worker-pr-wait-hint worker-pr-wait-hint--serial"
        >
          단독 실행 작업의 PR 머지·정리가 끝날 때까지 다음 작업이 시작되지
          않습니다 (자동 머지 꺼짐)
        </div>`:""}`}function F(p){let v=p.queue.auto_merge===!0;if(p.merge_queue_running)return i`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop${v?" is-active":""}"
        title=${v?"\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB044\uACE0 \uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)":"\uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)"}
      >
        ${v?"\u23F8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8":"\uC77C\uAD04 \uBA38\uC9C0 \uC911\uB2E8"} ${p.merge_queue_length}
      </button>`;if(v)return i`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop is-active"
        title="자동 머지 켜짐 — 자격이 생기는 PR을 계속 큐에 넣습니다. 클릭하면 끕니다"
      >
        ⏸ 자동 머지
      </button>`;let O=new Set(p.auto_excluded),ce=p.pr_wait.filter(ge=>ge.merge_action&&ge.merge_enabled&&!O.has(ge.id)).length;return i`<button
      type="button"
      class="worker-merge-all"
      title=${p.verify_cmd_present?"\uCF1C \uB450\uBA74 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uCDA9\uB3CC \uD574\uC18C\xB7\uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uCF1C \uB450\uBA74 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uCDA9\uB3CC \uD574\uC18C\xB7\uBA38\uC9C0\uD569\uB2C8\uB2E4 \u2014 \uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uB294 verify \uC120\uC5B8\uC774 \uC5C6\uC5B4 \uCD94\uAC00 \uAC80\uC99D \uC5C6\uC774 \uBA38\uC9C0\uB429\uB2C8\uB2E4"}
    >
      ▶ 자동 머지${ce>0?` ${ce}`:""}
    </button>`}function V(p){let v=Xt({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:p.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:ot(),controls:rt(p)});return k?i`<div class="worker-lanes worker-lanes--mobile">
        ${$t(p)}
        ${Xt({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:p.waiting,empty:"\uB4DC\uB798\uADF8 \uB610\uB294 [\uB300\uAE30\uB85C \u21B4]\uB85C \uBC30\uCE58",controls:i`${at()}${pt(p)}`,collapsible:!0,collapsed:y.queue,preview:hc(p.waiting)})}
        ${v}
        ${Xt({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:p.done,empty:`${Z()} \uC644\uB8CC \uC5C6\uC74C`,controls:Ze(),collapsible:!0,collapsed:y.done,preview:Array.isArray(p.token_total)?p.token_total.map(O=>O.label).join(" \xB7 "):p.token_total||hc(p.done)})}
      </div>`:i`<div class="worker-lanes">
      ${v}
      ${Xt({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:p.waiting,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58",controls:i`${at()}${pt(p)}`})}
      ${Xt({id:"worker-pane-running",lane:"running",title:`\uC2E4\uD589 \uC911 \xB7 \uC2AC\uB86F ${p.slots}`,items:p.running,live:p.running.some(O=>!O.paused&&O.failed!==!0),body:Oo(p.running,Date.now(),he)})}
      ${Xt({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:p.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C"})}
      ${Xt({id:"worker-pane-done",lane:"done",title:`\uC644\uB8CC \xB7 ${Z()} ${p.done.length}`,items:p.done,empty:`${Z()} \uC644\uB8CC \uC5C6\uC74C`,controls:Ze()})}
    </div>`}function _e(p){y={...y,[p]:!y[p]},r_(y),G()}function G(){let p=lt();Fe(yt(p),et),Fe(V(p),Se)}function we(){let p=document.querySelector(".app-header");if(!p)return;let v=()=>{let O=Math.round(p.getBoundingClientRect().height);je.style.setProperty("--worker-ribbon-top",`${O}px`)};if(v(),typeof ResizeObserver=="function"){let O=new ResizeObserver(v);O.observe(p),Ee.push(()=>O.disconnect())}else window.addEventListener("resize",v),Ee.push(()=>window.removeEventListener("resize",v))}function Ae(){if(typeof window.matchMedia!="function")return;let p=window.matchMedia(e_);k=!!p.matches;let v=O=>{let ce=!!(O&&typeof O.matches=="boolean"?O.matches:p.matches);ce!==k&&(k=ce,G())};typeof p.addEventListener=="function"?(p.addEventListener("change",v),Ee.push(()=>p.removeEventListener("change",v))):typeof p.addListener=="function"&&(p.addListener(v),Ee.push(()=>p.removeListener(v)))}let qe=null;function Xe(p){qe=p.target instanceof Element?p.target:null}function ye(p){let O=p.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!O)return;if(qe&&O.contains(qe)&&qe.closest("input, button, a")){p.preventDefault();return}let ce=O.dataset.beadId||"",ge=O.dataset.lane||"";A={bead_id:ce,from_lane:ge};try{p.dataTransfer?.setData("text/plain",ce),p.dataTransfer&&(p.dataTransfer.effectAllowed="move")}catch{}}function ze(p){let v=p.target?.closest?.(".worker-pane");if(!v)return;let O=v.dataset.lane||"";O!=="candidate"&&O!=="queue"||(p.preventDefault(),p.dataTransfer&&(p.dataTransfer.dropEffect="move"),v.classList.add("worker-pane--drag-over"))}function $e(p){p.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function ct(p,v){let O=x.find(g=>g.id===p);if(!O)return;let ce=x.filter(g=>g.id!==p),ge=ce.length;if(v){let g=v.dataset.beadId;if(g===p)return;let P=ce.findIndex(W=>W.id===g);P>=0&&(ge=P)}let j=ce.slice();j.splice(ge,0,O),b.applyReorder(p,j,ge)}function mt(p){let v=p.target?.closest?.(".worker-pane");if(!v)return;p.preventDefault(),v.classList.remove("worker-pane--drag-over");let O=v.dataset.lane||"",ce=A?.bead_id||p.dataTransfer?.getData("text/plain")||"",ge=A?.from_lane||"";if(A=null,!ce)return;let j=p.target?.closest?.(".worker-mini, .worker-card"),g=Array.from(v.querySelectorAll(".worker-mini, .worker-card")),P=g.length;if(j){let W=g.indexOf(j);W>=0&&(P=W)}if(v.classList.contains("worker-pane--collapsed")&&(P=N()),O==="candidate"){if(ge==="candidate"){ct(ce,j);return}ge==="queue"&&R(ce);return}O==="queue"&&(ge==="queue"?Pe(ce,P):ue(ce,P))}function Ht(p){L=p,Gf(p),G()}function Qt(p){q=p==="board"||p==="created"||p==="spec"?p:Is,Xf(q),G()}function Jt(p){S=It(p)?p:xt,Jf(S),f?.(S),G()}function ft(p){let v=p.target?.closest?.(".worker-mini__select");if(v){let xe=v.dataset.beadId||"";xe&&(v.checked?ne.add(xe):ne.delete(xe),G());return}let O=p.target?.closest?.(".worker-bulk__mode");if(O){be=O.value==="serial"?"serial":"ordinary";return}let ce=p.target?.closest?.(".worker-filter__blocked");if(ce){Ht({...L,show_blocked:ce.checked});return}let ge=p.target?.closest?.(".worker-done-range");if(ge){Jt(ge.value);return}let j=p.target?.closest?.(".worker-sort");if(j){Qt(j.value||Is);return}let g=p.target?.closest?.(".worker-pr-wait-hold");if(g){Tt(g.checked);return}let P=p.target?.closest?.(".worker-slots__input");if(!P)return;let W=Number.parseInt(P.value,10);if(!Number.isFinite(W)){G();return}At(W).then(G)}function gt(p){return p?{runner:p.runner||void 0,model:p.model||void 0,effort:p.effort||void 0,worktree:p.worktree||void 0,status:p.status||void 0,session_id:p.session_id||void 0}:{}}function Mt(){let p=lt();return{operations:p.repo_operations,cleanup_failures:p.cleanup_failures,repo:l&&l()||""}}function Gt(){he&&H.close(),fe.hidden=!1,Ne.hidden=!1,z.open(Mt()),G()}function Et(p){let v=ie(),O=v.attempts?v.attempts[p]:null;he=p,z.close(),fe.hidden=!0,Ne.hidden=!1,H.open({attempt_id:p,meta:gt(O)}),G()}function er(){if(z.isOpen()&&z.refresh(Mt()),!he)return;let p=ie(),v=p.attempts?p.attempts[he]:null;if(v){H.updateMeta(gt(v));return}H.close()}function Te(p){let v=p.target,O=v?.closest?.(".worker-bulk__apply");if(O){O.disabled||U();return}if(v?.closest?.(".worker-mini__select, .worker-mini__serial, .worker-mini__grip"))return;if(v?.closest?.(".worker-repo-strip")||v?.closest?.(".worker-mini__timeline")){Gt();return}let ce=v?.closest?.(".worker-repo-op__session");if(ce){let me=ce.dataset.attemptId;me&&Et(me);return}let ge=v?.closest?.(".worker-repo-op__resolve");if(ge){Ye(ge.dataset.operationId||"");return}let j=v?.closest?.(".worker-repo-op__dismiss");if(j){Qe(j.dataset.operationId||"");return}let g=v?.closest?.(".worker-cleanup__resume");if(g){let me=g.dataset.beadId;me&&ve(me);return}let P=v?.closest?.(".worker-banner__resume");if(P){let me=P.dataset.attemptId;me&&Q(me);return}let W=v?.closest?.(".worker-banner__discard");if(W){let me=W.dataset.confirmation==="merged"?"merged":"unmerged";Le(W.dataset.beadId||"",W.dataset.attemptId||null,me,W.dataset.operationId||null);return}let xe=v?.closest?.(".worker-banner__dismiss");if(xe){let me=xe.dataset.attemptId;me&&ae(me);return}if(v?.closest?.(".worker-play")){tt(!ie().auto_advance);return}let Ge=v?.closest?.(".worker-merge-all");if(Ge){Ge.classList.contains("worker-merge-all--stop")?ie().auto_merge===!0?K(!1):Re():K(!0);return}let Be=v?.closest?.(".worker-pane__hd--toggle");if(Be){let me=Be.dataset.lane;(me==="queue"||me==="done")&&_e(me);return}let m=v?.closest?.(".worker-card__place");if(m){let me=m.dataset.beadId;me&&!m.disabled&&ue(me,N());return}let d=v?.closest?.(".worker-filter__chip");if(d){let me=d.dataset.spec;(me==="all"||me==="with"||me==="without")&&Ht({...L,spec:me});return}let $=v?.closest?.(".worker-mini__merge");if($){let me=$.dataset.beadId||"";ie().cleanup_failed?.[me]?ve(me):le(me);return}let w=v?.closest?.(".worker-mini__merge-cancel");if(w){pe(w.dataset.beadId||"");return}let M=v?.closest?.(".worker-mini__discard");if(M){Le(M.dataset.beadId||"",M.dataset.attemptId||null,M.dataset.discardMode==="merged"?"merged":"unmerged",M.dataset.operationId||null);return}let de=v?.closest?.(".worker-mini__revise-fix");if(de){Me("worker-revise-fix",de.dataset.beadId||"");return}let ke=v?.closest?.(".worker-mini__revise-approve");if(ke){Me("worker-revise-approve",ke.dataset.beadId||"");return}if(v?.closest?.(".worker-mini__pr"))return;if(v?.closest?.(".rtile__discard")){let me=v?.closest?.(".rtile"),Je=me?.dataset?.beadId,Pr=me?.dataset?.attemptId;Je&&Le(Je,Pr||null,"unmerged",v?.closest?.(".rtile__discard")?.dataset.operationId||null);return}if(v?.closest?.(".rtile__dismiss")){let Je=v?.closest?.(".rtile")?.dataset?.attemptId;Je&&ae(Je);return}if(v?.closest?.(".rtile__pause")){let Je=v?.closest?.(".rtile")?.dataset?.attemptId;Je&&C(Je);return}if(v?.closest?.(".rtile__resume")){let Je=v?.closest?.(".rtile")?.dataset?.attemptId;Je&&Q(Je);return}if(v?.closest?.(".rtile__session")){let Je=v?.closest?.(".rtile")?.dataset?.attemptId;Je&&Et(Je);return}if(v?.closest?.(".worker-drawer-overlay__backdrop")){z.close(),H.close();return}if(v?.closest?.(".worker-drawer-host"))return;let it=v?.closest?.(".rtile");if(it){if(v?.closest?.(".rtile__id")){let Je=it.dataset.beadId;Je&&Rr(Je).then(Pr=>{Pr?re("\uBCF5\uC0AC\uB428","success",1200):re("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let me=it.dataset.beadId;me&&c&&c(me);return}let Oe=v?.closest?.(".worker-mini, .worker-card");if(Oe){let me=Oe.dataset.beadId;if(v?.closest?.(".worker-mini__id, .worker-card__id")){me&&Rr(me).then(Je=>{Je?re("\uBCF5\uC0AC\uB428","success",1200):re("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}me&&c&&c(me)}}return e.addEventListener("pointerdown",Xe),e.addEventListener("dragstart",ye),e.addEventListener("dragover",ze),e.addEventListener("dragleave",$e),e.addEventListener("drop",mt),e.addEventListener("click",Te),e.addEventListener("change",ft),Ae(),we(),_&&Ee.push(_.subscribe(()=>{for(let[p,v]of B)v==="failed"&&B.delete(p);G()})),s&&Ee.push(s.subscribe(()=>{G(),er()})),G(),{load(){G()},destroy(){for(let p of Ee.splice(0))try{p()}catch{}e.removeEventListener("pointerdown",Xe),e.removeEventListener("dragstart",ye),e.removeEventListener("dragover",ze),e.removeEventListener("dragleave",$e),e.removeEventListener("drop",mt),e.removeEventListener("click",Te),e.removeEventListener("change",ft);try{H.destroy()}catch{}Ne.hidden=!0,Fe(i``,e)}}}function zo(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function $c(e,t,r,n=async()=>{},s=async()=>{}){let o=nt("views:workspace-picker"),a=null,c=!1,l=!1,u=!1;async function f(T){let Y=T.target.value,be=t.getState().workspace?.current?.path||"";if(Y&&Y!==be){o("switching workspace to %s",Y),c=!0,k();try{await r(Y)}catch(J){o("workspace switch failed: %o",J)}finally{c=!1,k()}}}async function _(){let T=t.getState(),X=T.workspace?.current?.path||T.workspace?.available?.[0]?.path||"";if(!(!X||l)){o("git-pulling workspace %s",X),l=!0,k();try{await n(X)}catch(Y){o("workspace git pull failed: %o",Y)}finally{l=!1,k()}}}function b(T){let X=T.target;X&&e.contains(X)||L()}function A(T){T.key==="Escape"&&L()}function x(){u||(u=!0,document.addEventListener("mousedown",b),document.addEventListener("keydown",A),k())}function L(){u&&(u=!1,document.removeEventListener("mousedown",b),document.removeEventListener("keydown",A),k())}function q(){u?L():x()}async function S(T){let X=T.target,Y=X.value,ne=X.checked;o("toggling visibility %s \u2192 %s",Y,String(ne));try{await s(Y,ne)}catch(be){o("workspace visibility toggle failed: %o",be)}}function B(T){return T?i`
      <button
        type="button"
        class="workspace-picker__git-pull-button"
        @click=${_}
        ?disabled=${c||l}
        aria-label="Git Pull"
        title="Git Pull"
      >
        <span aria-hidden="true">⬇</span>
      </button>
    `:i``}function Z(T,X){return i`
      <div class="workspace-picker__manage">
        <button
          type="button"
          class="workspace-picker__manage-button"
          @click=${q}
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
                ${T.map(Y=>i`
                    <label
                      class="workspace-picker__manage-row"
                      title="${Y.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${Y.path}"
                        .checked=${!X.has(Y.path)}
                        @change=${S}
                      />
                      <span class="workspace-picker__manage-name"
                        >${zo(Y.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function y(){let T=t.getState(),X=T.workspace?.current,Y=T.workspace?.available||[],ne=new Set(T.workspace?.hidden||[]),be=X?.path||Y[0]?.path||"";if(Y.length===0)return i``;let J=Y.filter(ee=>!ne.has(ee.path)||ee.path===be);if(J.length<=1){let ee=J[0]||Y[0],Ee=zo(ee.path);return i`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${ee.path}"
            >${Ee}</span
          >
          ${Z(Y,ne)}
          ${B(be)}
          ${l?i`<span
                class="workspace-picker__loading"
                aria-hidden="true"
              ></span>`:""}
        </div>
      `}return i`
      <div class="workspace-picker">
        <select
          class="workspace-picker__select"
          @change=${f}
          ?disabled=${c||l}
          aria-label="Select project workspace"
        >
          ${J.map(ee=>i`
              <option
                value="${ee.path}"
                ?selected=${ee.path===be}
                title="${ee.path}"
              >
                ${zo(ee.path)}
              </option>
            `)}
        </select>
        ${Z(Y,ne)}
        ${B(be)}
        ${c||l?i`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function k(){Fe(y(),e)}return k(),a=t.subscribe(()=>k()),{destroy(){a&&(a(),a=null),document.removeEventListener("mousedown",b),document.removeEventListener("keydown",A),Fe(i``,e)}}}var xc=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","get-session-defaults","set-session-defaults","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-automation-toggle","worker-auto-repair-toggle","worker-repo-operation-repair","worker-repo-operation-dismiss","worker-queue-set-slots","worker-queue-set-pr-wait-hold","worker-queue-set-orchestration-defaults","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-cleanup-retry","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-worker-system-prompt","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-impl-presets","unsubscribe-impl-presets","impl-presets-snapshot","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","monitor-auto-toggle"];function Ho(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function Sc(e,t,r=Ho()){return{id:r,type:e,payload:t}}function Ac(e={}){let t=nt("ws"),r={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},n=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",a=0,c=null,l=!0,u=new Map,f=[],_=new Map,b=new Set;function A(y){for(let k of Array.from(b))try{k(y)}catch{}}function x(){if(!l||c)return;o="reconnecting",t("ws reconnecting\u2026"),A(o);let y=Math.min(r.maxMs||0,(r.initialMs||0)*Math.pow(r.factor||1,a)),k=(r.jitterRatio||0)*y,T=Math.max(0,Math.round(y+(Math.random()*2-1)*k));t("ws retry in %d ms (attempt %d)",T,a+1),c=setTimeout(()=>{c=null,Z()},T)}function L(y){try{s?.send(JSON.stringify(y))}catch(k){t("ws send failed",k)}}function q(){for(o="open",t("ws open"),A(o),a=0;f.length;){let y=f.shift();y&&L(y)}}function S(y){let k;try{k=JSON.parse(String(y.data))}catch{t("ws received non-JSON message");return}if(!k||typeof k.id!="string"||typeof k.type!="string"){t("ws received invalid envelope");return}if(u.has(k.id)){let X=u.get(k.id);u.delete(k.id),k.ok?X?.resolve(k.payload):X?.reject(k.error||new Error("ws error"));return}let T=_.get(k.type);if(T&&T.size>0)for(let X of Array.from(T))try{X(k.payload)}catch(Y){t("ws event handler error",Y)}else t("ws received unhandled message type: %s",k.type)}function B(){o="closed",t("ws closed"),A(o);for(let[y,k]of u.entries())k.reject(new Error("ws disconnected")),u.delete(y);a+=1,x()}function Z(){if(!l)return;let y=n();try{s=new WebSocket(y),t("ws connecting %s",y),o="connecting",A(o),s.addEventListener("open",q),s.addEventListener("message",S),s.addEventListener("error",()=>{}),s.addEventListener("close",B)}catch(k){t("ws connect failed %o",k),x()}}return Z(),{send(y,k){if(!xc.includes(y))return Promise.reject(new Error(`unknown message type: ${y}`));let T=Ho(),X=Sc(y,k,T);return t("send %s id=%s",y,T),new Promise((Y,ne)=>{u.set(T,{resolve:Y,reject:ne,type:y}),s&&s.readyState===s.OPEN?L(X):(t("queue %s id=%s (state=%s)",y,T,o),f.push(X))})},on(y,k){_.has(y)||_.set(y,new Set);let T=_.get(y);return T?.add(k),()=>{T?.delete(k)}},onConnection(y){return b.add(y),()=>{b.delete(y)}},reconnect(){l=!0,c&&(clearTimeout(c),c=null),a=0,Z()},close(){l=!1,c&&(clearTimeout(c),c=null);try{s?.close()}catch{}},getState(){return o}}}function f_(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function __(e,t){try{let n=await(await fetch("/api/config")).json();e.setState({config:n})}catch(r){t("config refresh failed",r)}}var Go=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],Tc=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"],["tab:worker:closed","closed-issues"]],wr="tab:worker:closed",m_="bdui.worker.done-range",Ec=Yl,Cc="worker:queue",Rc="ui:order",Ic="ui:display-policy",Lc="exec:presets",yr="tab:board:closed",Oc="beads-ui.board.closed-range";function g_(e){let t=nt("main");t("bootstrap start");let r=i`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;Fe(r,e);let n=document.getElementById("top-nav"),s=document.getElementById("usage-meter"),o=document.getElementById("board-root"),a=document.getElementById("worker-root"),c=document.getElementById("monitor-root"),l=document.getElementById("detail-panel");if(s&&ic(s),o&&a&&c&&l){let Ce=function(m,d){let $="Request failed",w="";if(m&&typeof m=="object"){let de=m;if(typeof de.message=="string"&&de.message.length>0&&($=de.message),typeof de.details=="string")w=de.details;else if(de.details&&typeof de.details=="object")try{w=JSON.stringify(de.details,null,2)}catch{w=""}}else typeof m=="string"&&m.length>0&&($=m);let M=d&&d.length>0?`Failed to load ${d}`:"Request failed";We.open(M,$,w)},le=function(m){return`${Te.getState().workspace.current?.path||""}\0${m}`},ve=function(){ue&&(ue().catch(()=>{}),ue=null),Pe=null,R=null},K=function(m){U=m;let d=()=>{U!==m||Te.getState().selected_id!==m||(U=null,I(m))};if(!ae){Q.then(d);return}d()},Me=function(m,d,$,w,M){return $!==Le[d]?(M().catch(()=>{}),!1):(m.set(w,M),!0)},tt=function(){let m=Te.getState();lt(m.view==="board"),at(m.view==="worker"),G(m.view==="monitor"),F(m.view==="board"||m.view==="worker"||!!m.selected_id)},At=function(){let m=Tr(Ye);return m===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:m}}},Tt=function(){let m=Tr(Qe);return m===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:m}}},lt=function(m){if(m)for(let[d,$]of Go){if(pe.has(d)||Re.has(d))continue;let w=d===yr?At():{type:$};try{H.register(d,w)}catch(ke){t("register %s store failed: %o",d,ke)}Re.add(d);let M=Le.board,de=!1;he.subscribeList(d,w).then(ke=>{de=!Me(pe,"board",M,d,ke)}).catch(ke=>{t("subscribe %s failed: %o",d,ke),Ce(ke,"board")}).finally(()=>{Re.delete(d),de&&tt()})}else rt()},rt=function(){Le.board+=1;for(let[m]of Go){let d=pe.get(m);d&&(d().catch(()=>{}),pe.delete(m));try{H.unregister(m)}catch($){t("unregister %s failed: %o",m,$)}}},at=function(m){if(!m){pt();return}for(let[d,$]of Tc){if(ot.has(d)||Re.has(d))continue;let w=d===wr?Tt():{type:$};try{H.register(d,w)}catch(ke){t("register %s store failed: %o",d,ke)}Re.add(d);let M=Le.worker,de=!1;he.subscribeList(d,w).then(ke=>{de=!Me(ot,"worker",M,d,ke)}).catch(ke=>{t("subscribe %s failed: %o",d,ke),Ce(ke,"worker")}).finally(()=>{Re.delete(d),de&&tt()})}},pt=function(){Le.worker+=1;for(let[m]of Tc){let d=ot.get(m);d&&(d().catch(()=>{}),ot.delete(m));try{H.unregister(m)}catch($){t("unregister %s failed: %o",m,$)}}},F=function(m){if(!m){V();return}Ze||(Se("subscribe-worker-queue",{id:Cc}).catch(d=>{t("subscribe-worker-queue failed: %o",d)}),Ze=()=>Se("unsubscribe-worker-queue",{id:Cc}))},V=function(){Ze&&(Ze().catch(()=>{}),Ze=null)},G=function(m){if(!m){we();return}_e||(Se("subscribe-monitor-pipeline",{id:Ec}).catch(d=>{t("subscribe-monitor-pipeline failed: %o",d)}),_e=()=>Se("unsubscribe-monitor-pipeline",{id:Ec}))},we=function(){_e&&(_e().catch(()=>{}),_e=null)},qe=function(){Ae||(Se("subscribe-ui-order",{id:Rc}).catch(m=>{t("subscribe-ui-order failed: %o",m)}),Ae=()=>Se("unsubscribe-ui-order",{id:Rc}))},Xe=function(){Ae&&(Ae().catch(()=>{}),Ae=null),ie.clear()},ze=function(){ye||(Se("subscribe-display-policy",{id:Ic}).catch(m=>{t("subscribe-display-policy failed: %o",m)}),ye=()=>Se("unsubscribe-display-policy",{id:Ic}))},$e=function(){ye&&(ye().catch(()=>{}),ye=null),se.clear()},mt=function(){ct||(Se("subscribe-impl-presets",{id:Lc}).catch(m=>{t("subscribe-impl-presets failed: %o",m)}),ct=()=>Se("unsubscribe-impl-presets",{id:Lc}))},Mt=function(m){if(!m)return"Unknown";let d=m.split("/").filter(Boolean);return d.length>0?d[d.length-1]:"Unknown"};var u=Ce,f=le,_=ve,b=K,A=Me,x=tt,L=At,q=Tt,S=lt,B=rt,Z=at,y=pt,k=F,T=V,X=G,Y=we,ne=qe,be=Xe,J=ze,ee=$e,Ee=mt,je=Mt;let et=document.getElementById("header-loading"),Ne=Za(et),We=$l(e),fe=Ac(),Se=Ne.wrapSend((m,d)=>fe.send(m,d)),he=Wa(Se),H=za(),z=Ga(),Ie=Ea(),ie=Ha(),se=Aa(),E=Ta(),N=Ca();fe.on("impl-presets-snapshot",m=>{let d=m;d&&typeof d.revision=="number"&&Array.isArray(d.presets)&&E.set({revision:d.revision,presets:d.presets})}),fe.on("monitor-pipeline-snapshot",m=>{let d=m;if(!(!d||!Array.isArray(d.workspaces)))try{Ie.set(d.workspaces,d.workspaces_state)}catch{}}),fe.on("ui-order-snapshot",m=>{let d=m;if(d&&typeof d.revision=="number")try{ie.set({revision:d.revision,order:d.order&&typeof d.order=="object"?d.order:{}})}catch{}}),fe.on("display-policy-snapshot",m=>{let d=m;if(d&&d.policy&&typeof d.policy=="object")try{se.set(d.policy)}catch{}}),fe.on("session-log-snapshot",m=>{let d=m;if(d&&typeof d.attempt_id=="string")try{N.set(d.attempt_id,Array.isArray(d.lines)?d.lines:[],typeof d.last_event_at=="number"?d.last_event_at:null)}catch{}}),fe.on("session-log-append",m=>{let d=m;if(d&&typeof d.attempt_id=="string")try{N.append(d.attempt_id,d.event)}catch{}}),fe.on("snapshot",m=>{let d=m,$=d&&typeof d.id=="string"?d.id:"",w=$?H.getStore($):null;if(w&&d&&d.type==="snapshot")try{w.applyPush(d)}catch{}}),fe.on("upsert",m=>{let d=m,$=d&&typeof d.id=="string"?d.id:"",w=$?H.getStore($):null;if(w&&d&&d.type==="upsert")try{w.applyPush(d)}catch{}}),fe.on("delete",m=>{let d=m,$=d&&typeof d.id=="string"?d.id:"",w=$?H.getStore($):null;if(w&&d&&d.type==="delete")try{w.applyPush(d)}catch{}});let ue=null,Pe=null,R=null,U=null,C=()=>{},Q=new Promise(m=>{C=()=>m(void 0)}),ae=!1,te=!1;async function I(m){let d=le(m);if(d===Pe||d===R)return;R=d;let $=`detail:${m}`,w={type:"issue-detail",params:{id:m}};try{H.register($,w)}catch(M){t("register detail store failed: %o",M)}try{let M=await he.subscribeList($,w);if(Te.getState().selected_id!==m||le(m)!==d){await M().catch(()=>{});return}ue&&await ue().catch(()=>{}),ue=M,Pe=d}catch(M){t("detail subscribe failed: %o",M),Ce(M,"issue details")}finally{R===d&&(R=null)}}let pe=new Map,Re=new Set,Le={board:0,worker:0},Ye=xt;try{let m=window.localStorage.getItem(Oc);It(m)&&(Ye=m)}catch{}let Qe=xt;try{let m=window.localStorage.getItem(m_);It(m)&&(Qe=m)}catch{}async function yt(m){if(!It(m)||m===Ye)return;Ye=m;try{window.localStorage.setItem(Oc,m)}catch{}let d=pe.get(yr);if(!d)return;pe.delete(yr),await d().catch(()=>{});let $=At();try{H.register(yr,$)}catch(w){t("register %s store failed: %o",yr,w)}try{let w=await he.subscribeList(yr,$);pe.set(yr,w)}catch(w){t("re-subscribe %s failed: %o",yr,w),Ce(w,"board")}}async function $t(m){if(!It(m)||m===Qe)return;Qe=m;let d=ot.get(wr);if(!d)return;ot.delete(wr),await d().catch(()=>{});let $=Tt();try{H.register(wr,$)}catch(w){t("register %s store failed: %o",wr,w)}try{let w=await he.subscribeList(wr,$);ot.set(wr,w)}catch(w){t("re-subscribe %s failed: %o",wr,w),Ce(w,"worker")}}let ot=new Map,Ze=null,_e=null,Ae=null,ye=null,ct=null;async function Ht(){ye=null,se.clear(),ct=null,E.clear(),Ze=null,_e=null,pe.clear(),ot.clear(),Le.board+=1,Le.worker+=1,mt();let m=Te.getState().workspace.current?.path;if(m)try{await fe.send("set-workspace",{path:m})}catch($){t("workspace restore after reconnect failed: %o",$);return}ze();let d=Te.getState();lt(d.view==="board"),at(d.view==="worker"),G(d.view==="monitor"),F(d.view==="board"||d.view==="worker"||!!d.selected_id)}async function Qt(){t("clearing all subscriptions for workspace switch"),rt(),pt(),V(),z.clear(),Xe(),qe(),$e(),ze(),ve();let m=Te.getState();if(m.selected_id)try{H.unregister(`detail:${m.selected_id}`)}catch{}let d=Te.getState();lt(d.view==="board"),at(d.view==="worker"),G(d.view==="monitor"),F(d.view==="board"||d.view==="worker"||!!d.selected_id),d.selected_id&&K(d.selected_id)}async function Jt(m){t("requesting workspace switch to %s",m),te=!0;try{let d=await fe.send("set-workspace",{path:m});t("workspace switch result: %o",d),d&&d.workspace&&(Te.setState({workspace:{current:{path:d.workspace.root_dir,database:d.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",m),d.changed&&(await Qt(),re("Switched to "+Mt(m),"success",2e3)))}catch(d){throw t("workspace switch failed: %o",d),re("Failed to switch workspace","error",3e3),d}finally{te=!1}}async function ft(m){t("requesting workspace git pull for %s",m);try{let d=await fe.send("git-pull-workspace",{});t("workspace git pull result: %o",d);let $=d?.status;if($==="up_to_date"){re("Already up to date","success",2e3);return}if($==="stash_pop_conflict"){re("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}re("Git pulled "+Mt(m),"success",2e3)}catch(d){t("workspace git pull failed: %o",d);let $=d?.code,w=d?.message;if($==="rebase_conflict"){re("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if($==="rebase_conflict_abort_failed"){re("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if($==="busy"){re("Git pull skipped: another operation is running","warning",3e3);return}let M=w?`: ${w}`:"";throw re(`Git pull failed${M}`,"error",3e3),d}}async function gt(m,d){t("setting workspace visibility %s \u2192 %s",m,String(d));try{await fe.send("set-workspace-visibility",{path:m,visible:d}),await Gt()}catch($){t("workspace visibility update failed: %o",$),re("Failed to update project visibility","error",3e3)}}async function Gt(){try{let m=await fe.send("list-workspaces",{});if(t("workspaces loaded: %o",m),m&&Array.isArray(m.workspaces)){let d=m.workspaces.map(de=>({path:de.path,database:de.database,pid:de.pid,version:de.version})),$=m.current?{path:m.current.root_dir,database:m.current.db_path}:null,w=Array.isArray(m.hidden)?m.hidden.filter(de=>typeof de=="string"):[];Te.setState({workspace:{current:$,available:d,hidden:w}});let M=window.localStorage.getItem("beads-ui.workspace");M&&(!d.some(ke=>ke.path===M)||w.includes(M)?window.localStorage.removeItem("beads-ui.workspace"):$&&M!==$.path&&(t("restoring saved workspace preference: %s",M),await Jt(M)))}}catch(m){t("failed to load workspaces: %o",m)}}fe.on("workspace-changed",m=>{t("workspace-changed event: %o",m),m&&m.root_dir&&(Te.setState({workspace:{current:{path:m.root_dir,database:m.db_path}}}),Gt(),Qt())});let Et=!1;if(typeof fe.onConnection=="function"){let m=d=>{t("ws state %s",d),d==="reconnecting"||d==="closed"?(Et=!0,re("Connection lost. Reconnecting\u2026","error",4e3)):d==="open"&&Et&&(Et=!1,re("Reconnected","success",2200),__(Te,($,w)=>{t(`${$}: %o`,w)}),Ht())};fe.onConnection(m)}let er="board";try{let m=window.localStorage.getItem("beads-ui.view");(m==="board"||m==="worker"||m==="monitor")&&(er=m)}catch(m){t("view parse error: %o",m)}let Te=Ka({config:f_(),view:er});fe.on("worker-queue-snapshot",m=>{let d=m;if(!d||!d.queue)return;let $=Te.getState().workspace.current?.path;if(typeof $=="string"&&$.length>0&&d.root_dir!==$){t("dropping worker-queue snapshot for %s",String(d.root_dir));return}try{z.set(d.queue)}catch{}});let p=Va(Te);p.start();let v=new Set(["get-comments","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","get-session-defaults","set-session-defaults"]),O=async(m,d)=>{try{return await Se(m,d)}catch($){if(v.has(m))throw $;return[]}};n&&Zl(n,Te,p);let ce=document.getElementById("workspace-picker");ce&&$c(ce,Te,Jt,ft,gt);let ge=ec(e,(m,d)=>Se(m,d));try{let m=document.getElementById("new-issue-btn");m&&m.addEventListener("click",()=>ge.open())}catch{}let j=sc(e,{policyStore:se,queueStore:z,implPresetStore:E,transport:(m,d)=>Se(m,d),labelOptions:()=>{let m=new Set;for(let[d]of Go)for(let $ of H.snapshotFor(d)||[]){let w=$.labels;if(Array.isArray(w))for(let M of w)typeof M=="string"&&M.length>0&&m.add(M)}return Array.from(m).sort()}});try{let m=document.getElementById("display-settings-btn");m&&(m.setAttribute("aria-label","\uC124\uC815"),m.setAttribute("title","\uC124\uC815"),m.addEventListener("click",()=>j.open()))}catch{}let g=oi(o,{gotoIssue:m=>p.gotoIssue(m),issueStores:H,transport:O,workerQueueStore:z,uiOrderStore:ie,displayPolicyStore:se,closedRange:Ye,onClosedRangeChange:m=>{yt(m)},onNewIssue:()=>ge.open()}),P=Wo(a,{transport:O,issueStores:H,queueStore:z,execPresetStore:E,sessionLogStore:N,uiOrderStore:ie,gotoIssue:m=>Te.setState({selected_id:m}),getWorkspacePath:()=>Te.getState().workspace.current?.path,doneRange:Qe,onDoneRangeChange:m=>{$t(m)}}),W=Kl(c,{transport:O,pipelineStore:Ie,execPresetStore:E,gotoIssue:m=>p.gotoIssue(m),getWorkspacePath:()=>Te.getState().workspace.current?.path,switchWorkspace:m=>Jt(m)}),xe=kl(l,{issueStores:H,transport:O,queueStore:z,execPresetStore:E,sessionLogStore:N,getWorkspacePath:()=>Te.getState().workspace.current?.path,onNavigate:m=>{Te.getState().view==="worker"?Te.setState({selected_id:m}):p.gotoIssue(m)},onClose:()=>{let m=Te.getState();Te.setState({selected_id:null});try{p.gotoView(m.view==="worker"||m.view==="monitor"?m.view:"board")}catch{}},onOpenExecPresets:()=>{j.open("session")}}),Ge=Te.getState().selected_id;Ge&&(l.hidden=!1,xe.load(Ge),K(Ge)),Te.subscribe(m=>{let d=m.selected_id;d?(l.hidden=!1,xe.load(d),te||K(d)):(xe.clear(),l.hidden=!0,ve())});let Be=m=>{o.hidden=m.view!=="board",a.hidden=m.view!=="worker",c.hidden=m.view!=="monitor",lt(m.view==="board"),at(m.view==="worker"),G(m.view==="monitor"),F(m.view==="board"||m.view==="worker"||!!m.selected_id),!m.selected_id&&m.view==="board"&&g.load(),m.view==="worker"&&P.load(),m.view==="monitor"?W.load():W.pause(),window.localStorage.setItem("beads-ui.view",m.view)};Te.subscribe(Be),Be(Te.getState()),qe(),ze(),mt(),Gt().finally(()=>{ae=!0,C()}),window.addEventListener("keydown",m=>{let d=m.ctrlKey||m.metaKey,$=String(m.key||"").toLowerCase(),w=m.target,M=w&&w.tagName?String(w.tagName).toLowerCase():"",de=M==="input"||M==="textarea"||M==="select"||w&&typeof w.isContentEditable=="boolean"&&w.isContentEditable;d&&$==="n"&&(de||(m.preventDefault(),ge.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let r=window.localStorage.getItem("beads-ui.theme"),n=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=r==="dark"||r==="light"?r:n?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let r=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",r),window.localStorage.setItem("beads-ui.theme",r)});let t=document.getElementById("app");t&&g_(t)});export{g_ as bootstrap,f_ as readBootstrapConfig,__ as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
