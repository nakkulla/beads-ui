var Qc=Object.create;var qs=Object.defineProperty;var Jc=Object.getOwnPropertyDescriptor;var ed=Object.getOwnPropertyNames;var td=Object.getPrototypeOf,rd=Object.prototype.hasOwnProperty;var nd=(e,t,r)=>t in e?qs(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var Bs=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var sd=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of ed(t))!rd.call(e,s)&&s!==r&&qs(e,s,{get:()=>t[s],enumerable:!(n=Jc(t,s))||n.enumerable});return e};var od=(e,t,r)=>(r=e!=null?Qc(td(e)):{},sd(t||!e||!e.__esModule?qs(r,"default",{value:e,enumerable:!0}):r,e));var Ze=(e,t,r)=>nd(e,typeof t!="symbol"?t+"":t,r);var Oa=Bs((E_,La)=>{var Fr=1e3,qr=Fr*60,Br=qr*60,Er=Br*24,ld=Er*7,cd=Er*365.25;La.exports=function(e,t){t=t||{};var r=typeof e;if(r==="string"&&e.length>0)return dd(e);if(r==="number"&&isFinite(e))return t.long?pd(e):ud(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function dd(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var r=parseFloat(t[1]),n=(t[2]||"ms").toLowerCase();switch(n){case"years":case"year":case"yrs":case"yr":case"y":return r*cd;case"weeks":case"week":case"w":return r*ld;case"days":case"day":case"d":return r*Er;case"hours":case"hour":case"hrs":case"hr":case"h":return r*Br;case"minutes":case"minute":case"mins":case"min":case"m":return r*qr;case"seconds":case"second":case"secs":case"sec":case"s":return r*Fr;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r;default:return}}}}function ud(e){var t=Math.abs(e);return t>=Er?Math.round(e/Er)+"d":t>=Br?Math.round(e/Br)+"h":t>=qr?Math.round(e/qr)+"m":t>=Fr?Math.round(e/Fr)+"s":e+"ms"}function pd(e){var t=Math.abs(e);return t>=Er?Un(e,t,Er,"day"):t>=Br?Un(e,t,Br,"hour"):t>=qr?Un(e,t,qr,"minute"):t>=Fr?Un(e,t,Fr,"second"):e+" ms"}function Un(e,t,r,n){var s=t>=r*1.5;return Math.round(e/r)+" "+n+(s?"s":"")}});var Pa=Bs((C_,Da)=>{function fd(e){r.debug=r,r.default=r,r.coerce=l,r.disable=a,r.enable=s,r.enabled=d,r.humanize=Oa(),r.destroy=u,Object.keys(e).forEach(f=>{r[f]=e[f]}),r.names=[],r.skips=[],r.formatters={};function t(f){let m=0;for(let b=0;b<f.length;b++)m=(m<<5)-m+f.charCodeAt(b),m|=0;return r.colors[Math.abs(m)%r.colors.length]}r.selectColor=t;function r(f){let m,b=null,S,y;function I(...N){if(!I.enabled)return;let $=I,k=Number(new Date),L=k-(m||k);$.diff=L,$.prev=m,$.curr=k,m=k,N[0]=r.coerce(N[0]),typeof N[0]!="string"&&N.unshift("%O");let E=0;N[0]=N[0].replace(/%([a-zA-Z%])/g,(F,V)=>{if(F==="%%")return"%";E++;let Q=r.formatters[V];if(typeof Q=="function"){let ce=N[E];F=Q.call($,ce),N.splice(E,1),E--}return F}),r.formatArgs.call($,N),($.log||r.log).apply($,N)}return I.namespace=f,I.useColors=r.useColors(),I.color=r.selectColor(f),I.extend=n,I.destroy=r.destroy,Object.defineProperty(I,"enabled",{enumerable:!0,configurable:!1,get:()=>b!==null?b:(S!==r.namespaces&&(S=r.namespaces,y=r.enabled(f)),y),set:N=>{b=N}}),typeof r.init=="function"&&r.init(I),I}function n(f,m){let b=r(this.namespace+(typeof m>"u"?":":m)+f);return b.log=this.log,b}function s(f){r.save(f),r.namespaces=f,r.names=[],r.skips=[];let m=(typeof f=="string"?f:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let b of m)b[0]==="-"?r.skips.push(b.slice(1)):r.names.push(b)}function o(f,m){let b=0,S=0,y=-1,I=0;for(;b<f.length;)if(S<m.length&&(m[S]===f[b]||m[S]==="*"))m[S]==="*"?(y=S,I=b,S++):(b++,S++);else if(y!==-1)S=y+1,I++,b=I;else return!1;for(;S<m.length&&m[S]==="*";)S++;return S===m.length}function a(){let f=[...r.names,...r.skips.map(m=>"-"+m)].join(",");return r.enable(""),f}function d(f){for(let m of r.skips)if(o(f,m))return!1;for(let m of r.names)if(o(f,m))return!0;return!1}function l(f){return f instanceof Error?f.stack||f.message:f}function u(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return r.enable(r.load()),r}Da.exports=fd});var Ma=Bs((xt,jn)=>{xt.formatArgs=md;xt.save=gd;xt.load=hd;xt.useColors=_d;xt.storage=bd();xt.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();xt.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function _d(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function md(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+jn.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let r=0,n=0;e[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(r++,s==="%c"&&(n=r))}),e.splice(n,0,t)}xt.log=console.debug||console.log||(()=>{});function gd(e){try{e?xt.storage.setItem("debug",e):xt.storage.removeItem("debug")}catch{}}function hd(){let e;try{e=xt.storage.getItem("debug")||xt.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function bd(){try{return localStorage}catch{}}jn.exports=Pa()(xt);var{formatters:vd}=jn.exports;vd.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var Jr=globalThis,Pn=Jr.trustedTypes,ha=Pn?Pn.createPolicy("lit-html",{createHTML:e=>e}):void 0,js="$lit$",er=`lit$${Math.random().toFixed(9).slice(2)}$`,Ws="?"+er,ad=`<${Ws}>`,xr=document,en=()=>xr.createComment(""),tn=e=>e===null||typeof e!="object"&&typeof e!="function",zs=Array.isArray,$a=e=>zs(e)||typeof e?.[Symbol.iterator]=="function",Us=`[ 	
\f\r]`,Qr=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ba=/-->/g,va=/>/g,kr=RegExp(`>|${Us}(?:([^\\s"'>=/]+)(${Us}*=${Us}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),wa=/'/g,ya=/"/g,xa=/^(?:script|style|textarea|title)$/i,Hs=e=>(t,...r)=>({_$litType$:e,strings:t,values:r}),i=Hs(1),fr=Hs(2),y_=Hs(3),It=Symbol.for("lit-noChange"),it=Symbol.for("lit-nothing"),ka=new WeakMap,$r=xr.createTreeWalker(xr,129);function Sa(e,t){if(!zs(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return ha!==void 0?ha.createHTML(t):t}var Aa=(e,t)=>{let r=e.length-1,n=[],s,o=t===2?"<svg>":t===3?"<math>":"",a=Qr;for(let d=0;d<r;d++){let l=e[d],u,f,m=-1,b=0;for(;b<l.length&&(a.lastIndex=b,f=a.exec(l),f!==null);)b=a.lastIndex,a===Qr?f[1]==="!--"?a=ba:f[1]!==void 0?a=va:f[2]!==void 0?(xa.test(f[2])&&(s=RegExp("</"+f[2],"g")),a=kr):f[3]!==void 0&&(a=kr):a===kr?f[0]===">"?(a=s??Qr,m=-1):f[1]===void 0?m=-2:(m=a.lastIndex-f[2].length,u=f[1],a=f[3]===void 0?kr:f[3]==='"'?ya:wa):a===ya||a===wa?a=kr:a===ba||a===va?a=Qr:(a=kr,s=void 0);let S=a===kr&&e[d+1].startsWith("/>")?" ":"";o+=a===Qr?l+ad:m>=0?(n.push(u),l.slice(0,m)+js+l.slice(m)+er+S):l+er+(m===-2?d:S)}return[Sa(e,o+(e[r]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),n]},rn=class e{constructor({strings:t,_$litType$:r},n){let s;this.parts=[];let o=0,a=0,d=t.length-1,l=this.parts,[u,f]=Aa(t,r);if(this.el=e.createElement(u,n),$r.currentNode=this.el.content,r===2||r===3){let m=this.el.content.firstChild;m.replaceWith(...m.childNodes)}for(;(s=$r.nextNode())!==null&&l.length<d;){if(s.nodeType===1){if(s.hasAttributes())for(let m of s.getAttributeNames())if(m.endsWith(js)){let b=f[a++],S=s.getAttribute(m).split(er),y=/([.?@])?(.*)/.exec(b);l.push({type:1,index:o,name:y[2],strings:S,ctor:y[1]==="."?Nn:y[1]==="?"?Fn:y[1]==="@"?qn:Ar}),s.removeAttribute(m)}else m.startsWith(er)&&(l.push({type:6,index:o}),s.removeAttribute(m));if(xa.test(s.tagName)){let m=s.textContent.split(er),b=m.length-1;if(b>0){s.textContent=Pn?Pn.emptyScript:"";for(let S=0;S<b;S++)s.append(m[S],en()),$r.nextNode(),l.push({type:2,index:++o});s.append(m[b],en())}}}else if(s.nodeType===8)if(s.data===Ws)l.push({type:2,index:o});else{let m=-1;for(;(m=s.data.indexOf(er,m+1))!==-1;)l.push({type:7,index:o}),m+=er.length-1}o++}}static createElement(t,r){let n=xr.createElement("template");return n.innerHTML=t,n}};function Sr(e,t,r=e,n){if(t===It)return t;let s=n!==void 0?r._$Co?.[n]:r._$Cl,o=tn(t)?void 0:t._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(e),s._$AT(e,r,n)),n!==void 0?(r._$Co??(r._$Co=[]))[n]=s:r._$Cl=s),s!==void 0&&(t=Sr(e,s._$AS(e,t.values),s,n)),t}var Mn=class{constructor(t,r){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:r},parts:n}=this._$AD,s=(t?.creationScope??xr).importNode(r,!0);$r.currentNode=s;let o=$r.nextNode(),a=0,d=0,l=n[0];for(;l!==void 0;){if(a===l.index){let u;l.type===2?u=new Nr(o,o.nextSibling,this,t):l.type===1?u=new l.ctor(o,l.name,l.strings,this,t):l.type===6&&(u=new Bn(o,this,t)),this._$AV.push(u),l=n[++d]}a!==l?.index&&(o=$r.nextNode(),a++)}return $r.currentNode=xr,s}p(t){let r=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(t,n,r),r+=n.strings.length-2):n._$AI(t[r])),r++}},Nr=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,r,n,s){this.type=2,this._$AH=it,this._$AN=void 0,this._$AA=t,this._$AB=r,this._$AM=n,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,r=this._$AM;return r!==void 0&&t?.nodeType===11&&(t=r.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,r=this){t=Sr(this,t,r),tn(t)?t===it||t==null||t===""?(this._$AH!==it&&this._$AR(),this._$AH=it):t!==this._$AH&&t!==It&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):$a(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==it&&tn(this._$AH)?this._$AA.nextSibling.data=t:this.T(xr.createTextNode(t)),this._$AH=t}$(t){let{values:r,_$litType$:n}=t,s=typeof n=="number"?this._$AC(t):(n.el===void 0&&(n.el=rn.createElement(Sa(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===s)this._$AH.p(r);else{let o=new Mn(s,this),a=o.u(this.options);o.p(r),this.T(a),this._$AH=o}}_$AC(t){let r=ka.get(t.strings);return r===void 0&&ka.set(t.strings,r=new rn(t)),r}k(t){zs(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,n,s=0;for(let o of t)s===r.length?r.push(n=new e(this.O(en()),this.O(en()),this,this.options)):n=r[s],n._$AI(o),s++;s<r.length&&(this._$AR(n&&n._$AB.nextSibling,s),r.length=s)}_$AR(t=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);t!==this._$AB;){let n=t.nextSibling;t.remove(),t=n}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},Ar=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,r,n,s,o){this.type=1,this._$AH=it,this._$AN=void 0,this.element=t,this.name=r,this._$AM=s,this.options=o,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=it}_$AI(t,r=this,n,s){let o=this.strings,a=!1;if(o===void 0)t=Sr(this,t,r,0),a=!tn(t)||t!==this._$AH&&t!==It,a&&(this._$AH=t);else{let d=t,l,u;for(t=o[0],l=0;l<o.length-1;l++)u=Sr(this,d[n+l],r,l),u===It&&(u=this._$AH[l]),a||(a=!tn(u)||u!==this._$AH[l]),u===it?t=it:t!==it&&(t+=(u??"")+o[l+1]),this._$AH[l]=u}a&&!s&&this.j(t)}j(t){t===it?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Nn=class extends Ar{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===it?void 0:t}},Fn=class extends Ar{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==it)}},qn=class extends Ar{constructor(t,r,n,s,o){super(t,r,n,s,o),this.type=5}_$AI(t,r=this){if((t=Sr(this,t,r,0)??it)===It)return;let n=this._$AH,s=t===it&&n!==it||t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive,o=t!==it&&(n===it||s);s&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Bn=class{constructor(t,r,n){this.element=t,this.type=6,this._$AN=void 0,this._$AM=r,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(t){Sr(this,t)}},Ta={M:js,P:er,A:Ws,C:1,L:Aa,R:Mn,D:$a,V:Sr,I:Nr,H:Ar,N:Fn,U:qn,B:Nn,F:Bn},id=Jr.litHtmlPolyfillSupport;id?.(rn,Nr),(Jr.litHtmlVersions??(Jr.litHtmlVersions=[])).push("3.3.1");var Be=(e,t,r)=>{let n=r?.renderBefore??t,s=n._$litPart$;if(s===void 0){let o=r?.renderBefore??null;n._$litPart$=s=new Nr(t.insertBefore(en(),o),o,void 0,r??{})}return s._$AI(e),s};var At="today",Yt=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}];function Lt(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function Tr(e,t=Date.now()){switch(e){case"today":{let r=new Date(t);return r.setHours(0,0,0,0),r.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function Ea(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Ca(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Ra(){let e=null,t=[],r=new Set;function n(){for(let s of Array.from(r))try{s()}catch{}}return{get(){return e},getWorkspacesState(){return t},set(s,o){e=Array.isArray(s)?s:null,t=Array.isArray(o)?o:[],n()},clear(){e=null,t=[],n()},subscribe(s){return r.add(s),()=>r.delete(s)}}}function Ia(){let e=new Map,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{set(n,s,o=null){e.set(n,{lines:Array.isArray(s)?[...s]:[],last_event_at:typeof o=="number"?o:null}),r()},append(n,s){let o=e.get(n)||{lines:[],last_event_at:null};o.lines=[...o.lines,s],o.last_event_at=Date.now(),e.set(n,o),r()},get(n){return e.get(n)||null},clear(n){typeof n=="string"?e.delete(n):e.clear(),r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}var Na=od(Ma(),1);function nt(e){return(0,Na.default)(`beads-ui:${e}`)}function Ft(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function Cr(e,t){let r=Ft(e.created_at),n=Ft(t.created_at);if(r!==n)return r<n?1:-1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,d=t.id;return a<d?-1:a>d?1:0}function Ba(e,t){let r=Ft(e.created_at),n=Ft(t.created_at);if(r!==n)return r<n?-1:1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,d=t.id;return a<d?-1:a>d?1:0}function Ua(e,t){let r=Ft(e.updated_at),n=Ft(t.updated_at);if(r!==n)return r<n?1:-1;let s=e.id,o=t.id;return s<o?-1:s>o?1:0}function ja(e,t){let r=e.priority??2,n=t.priority??2;if(r!==n)return r-n;let s=Ft(e.created_at),o=Ft(t.created_at);if(s!==o)return s<o?1:-1;let a=e.id,d=t.id;return a<d?-1:a>d?1:0}function Wa(e,t){let r=e.closed_at??0,n=t.closed_at??0;if(r!==n)return r<n?1:-1;let s=e?.id,o=t?.id;return s<o?-1:s>o?1:0}var wd=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function Fa(e){let t=e&&e.metadata,r=t?t.task_order:void 0;if(r==null||r==="")return Number.POSITIVE_INFINITY;let n=Number(r);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function qa(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let r=wd.exec(t);if(!r)return Number.POSITIVE_INFINITY;let n=Number(r[1]);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function za(e,t){let r=Fa(e),n=Fa(t);if(r!==n)return r<n?-1:1;let s=qa(e),o=qa(t);if(s!==o)return s<o?-1:1;let a=Ft(e&&e.created_at),d=Ft(t&&t.created_at);if(a!==d)return a<d?-1:1;let l=e&&e.id,u=t&&t.id;return l===u?0:String(l)<String(u)?-1:1}var Gs=2**20;function Ur(e,t){let r=e&&e.id;return t&&typeof r=="string"&&Object.prototype.hasOwnProperty.call(t,r)&&typeof t[r]=="number"&&Number.isFinite(t[r])?t[r]:-Ft(e&&e.created_at)}function Wn(e){return(t,r)=>{let n=Ur(t,e),s=Ur(r,e);if(n!==s)return n<s?-1:1;let o=t?.id,a=r?.id;return o<a?-1:o>a?1:0}}function Vs(e,t,r){let n=Array.isArray(e)?e:[],s=n.length,o=Math.max(0,Math.min(t,s-1)),a=o-1>=0?n[o-1]:null,d=o+1<s?n[o+1]:null;if(!a&&!d)return{rank:0};if(!a)return{rank:Ur(d,r)-Gs};if(!d)return{rank:Ur(a,r)+Gs};let l=Ur(a,r),u=Ur(d,r),f=(l+u)/2;return l<f&&f<u?{rank:f}:{renormalize:n.map((m,b)=>({bead_id:m.id,rank:b*Gs}))}}function Ys(e,t={}){let r=nt(`issue-store:${e}`),n=new Map,s=[],o=0,a=new Set,d=!1,l=t.sort||Cr;function u(){for(let b of Array.from(a))try{b()}catch{}}function f(){s=Array.from(n.values()).sort(l)}function m(b){if(d||!b||b.id!==e)return;let S=Number(b.revision)||0;if(r("apply %s rev=%d",b.type,S),!(S<=o&&b.type!=="snapshot")){if(b.type==="snapshot"){if(S<=o)return;n.clear();let y=Array.isArray(b.issues)?b.issues:[];for(let I of y)I&&typeof I.id=="string"&&I.id.length>0&&n.set(I.id,I);f(),o=S,u();return}if(b.type==="upsert"){let y=b.issue;if(y&&typeof y.id=="string"&&y.id.length>0){let I=n.get(y.id);if(!I)n.set(y.id,y);else{let N=Number.isFinite(I.updated_at)?I.updated_at:0,$=Number.isFinite(y.updated_at)?y.updated_at:0;if(N<=$){for(let k of Object.keys(I))k in y||delete I[k];for(let[k,L]of Object.entries(y))I[k]=L}}f()}o=S,u()}else if(b.type==="delete"){let y=String(b.issue_id||"");y&&(n.delete(y),f()),o=S,u()}}}return{id:e,subscribe(b){return a.add(b),()=>{a.delete(b)}},applyPush:m,snapshot(){return s},size(){return n.size},getById(b){return n.get(b)},dispose(){d=!0,n.clear(),s=[],a.clear(),o=0}}}function zn(e){let t=String(e.type||"").trim(),r={};if(e.params&&typeof e.params=="object"){let s=Object.keys(e.params).sort();for(let o of s){let a=e.params[o];r[o]=String(a)}}let n=new URLSearchParams(r).toString();return n.length>0?`${t}?${n}`:t}function Ha(e){let t=nt("subs"),r=new Map,n=new Map;function s(d,l){t("applyDelta %s +%d ~%d -%d",d,(l.added||[]).length,(l.updated||[]).length,(l.removed||[]).length);let u=n.get(d);if(!u||u.size===0)return;let f=Array.isArray(l.added)?l.added:[],m=Array.isArray(l.updated)?l.updated:[],b=Array.isArray(l.removed)?l.removed:[];for(let S of Array.from(u)){let y=r.get(S);if(!y)continue;let I=y.itemsById;for(let N of f)typeof N=="string"&&N.length>0&&I.set(N,!0);for(let N of m)typeof N=="string"&&N.length>0&&I.set(N,!0);for(let N of b)typeof N=="string"&&N.length>0&&I.delete(N)}}async function o(d,l){let u=zn(l);if(t("subscribe %s key=%s",d,u),!r.has(d))r.set(d,{key:u,itemsById:new Map});else{let m=r.get(d);if(m&&m.key!==u){let b=n.get(m.key);b&&(b.delete(d),b.size===0&&n.delete(m.key)),r.set(d,{key:u,itemsById:new Map})}}n.has(u)||n.set(u,new Set);let f=n.get(u);f&&f.add(d);try{await e("subscribe-list",{id:d,type:l.type,params:l.params})}catch(m){let b=r.get(d)||null;if(b){let S=n.get(b.key);S&&(S.delete(d),S.size===0&&n.delete(b.key))}throw r.delete(d),m}return async()=>{t("unsubscribe %s key=%s",d,u);try{await e("unsubscribe-list",{id:d})}catch{}let m=r.get(d)||null;if(m){let b=n.get(m.key);b&&(b.delete(d),b.size===0&&n.delete(m.key))}r.delete(d)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:zn,selectors:{getIds(d){let l=r.get(d);return l?Array.from(l.itemsById.keys()):[]},has(d,l){let u=r.get(d);return u?u.itemsById.has(l):!1},count(d){let l=r.get(d);return l?l.itemsById.size:0},getItemsById(d){let l=r.get(d),u={};if(!l)return u;for(let f of l.itemsById.keys())u[f]=!0;return u}}}}function Ga(){let e=nt("issue-stores"),t=new Map,r=new Map,n=new Set,s=new Map;function o(){for(let l of Array.from(n))try{l()}catch{}}function a(l,u,f){let m=u?zn(u):"",b=r.get(l)||"",S=t.has(l);if(e("register %s key=%s (prev=%s)",l,m,b),S&&b&&m&&b!==m){let y=t.get(l);if(y)try{y.dispose()}catch{}let I=s.get(l);if(I){try{I()}catch{}s.delete(l)}let N=Ys(l,f);t.set(l,N);let $=N.subscribe(()=>o());s.set(l,$)}else if(!S){let y=Ys(l,f);t.set(l,y);let I=y.subscribe(()=>o());s.set(l,I)}return r.set(l,m),()=>d(l)}function d(l){e("unregister %s",l),r.delete(l);let u=t.get(l);u&&(u.dispose(),t.delete(l));let f=s.get(l);if(f){try{f()}catch{}s.delete(l)}}return{register:a,unregister:d,getStore(l){return t.get(l)||null},snapshotFor(l){let u=t.get(l);return u?u.snapshot().slice():[]},subscribe(l){return n.add(l),()=>n.delete(l)}}}function Va(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Ya(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Ks(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function yd(e){let t=String(e||""),r=t.startsWith("#")?t.slice(1):t,n=r.indexOf("?"),s=n>=0?r.slice(n+1):"";if(s){let d=new URLSearchParams(s).get("issue");if(d)return decodeURIComponent(d)}let o=/^\/issue\/([^\s?#]+)/.exec(r);return o&&o[1]?decodeURIComponent(o[1]):null}function kd(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function Ka(e){let t=nt("router"),r=()=>{let n=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(n),o=s&&s[1]?decodeURIComponent(s[1]):yd(n),a=kd(n);if(t("hash change \u2192 view=%s id=%s",a,o),e.setState({selected_id:a==="worker"?null:o,view:a,worker:{selected_parent_id:a==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(n)){let l=o?`#/${a}?issue=${encodeURIComponent(o)}`:`#/${a}`;window.location.hash!==l&&(window.location.hash=l)}};return{start(){window.addEventListener("hashchange",r),r()},stop(){window.removeEventListener("hashchange",r)},gotoIssue(n){let s=e.getState?e.getState():{view:"board"},o=s.view==="worker"||s.view==="monitor"?s.view:"board",a=Ks(o,n);t("goto issue %s (view=%s)",n,o),window.location.hash!==a?window.location.hash=a:e.setState({selected_id:o==="worker"?null:n,view:o,worker:{selected_parent_id:o==="worker"?n:null}})},gotoView(n){let s=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},o=n==="worker"?s.worker?.selected_parent_id:s.selected_id,a=o?Ks(n,o):`#/${n}`;t("goto view %s (id=%s)",n,o||""),window.location.hash!==a?window.location.hash=a:e.setState({view:n,selected_id:n==="worker"?null:s.selected_id})}}}var $d=Object.freeze({workspace_config:{default_workspace:null}});function Za(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:$d.workspace_config.default_workspace}}}function Xa(e={}){let t=nt("state"),r={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:Za(e.config)},n=new Set;function s(){for(let o of Array.from(n))try{o(r)}catch{}}return{getState(){return r},setState(o){let a={...r,...o,filters:{...r.filters,...o.filters||{}},board:{...r.board,...o.board||{}},worker:{...r.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:r.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:r.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:r.workspace.hidden},config:o.config!==void 0?Za(o.config):r.config},d=a.workspace.current?.path!==r.workspace.current?.path||a.workspace.available.length!==r.workspace.available.length||a.workspace.hidden.length!==r.workspace.hidden.length||a.workspace.hidden.some((u,f)=>u!==r.workspace.hidden[f]),l=a.config.workspace_config.default_workspace!==r.config.workspace_config.default_workspace;a.selected_id===r.selected_id&&a.view===r.view&&a.filters.status===r.filters.status&&a.filters.search===r.filters.search&&a.filters.type===r.filters.type&&a.board.closed_filter===r.board.closed_filter&&a.worker.selected_parent_id===r.worker.selected_parent_id&&a.worker.show_closed_children.length===r.worker.show_closed_children.length&&a.worker.show_closed_children.every((u,f)=>u===r.worker.show_closed_children[f])&&!d&&!l||(r=a,t("state change %o",{selected_id:r.selected_id,view:r.view,filters:r.filters,board:r.board,worker:r.worker,workspace:r.workspace.current?.path,config:{default_workspace:r.config.workspace_config.default_workspace}}),s())},subscribe(o){return n.add(o),()=>n.delete(o)}}}function Qa(e){let t=nt("activity"),r=0,n=new Map,s=1;function o(){if(!e)return;let u=r>0;e.toggleAttribute("hidden",!u),e.setAttribute("aria-busy",u?"true":"false")}function a(){r+=1,t("start count=%d",r),o()}function d(){let u=r;r=Math.max(0,r-1),u<=0?t("done called but count was already %d",u):t("done count=%d\u2192%d",u,r),o()}function l(u){return async(m,b)=>{let S=s++,y=Date.now();n.set(S,{type:m,start_ts:y}),t("request start id=%d type=%s count=%d",S,m,r+1),a();let I=!1,N=()=>{I||(I=!0,n.delete(S),d())},$=setTimeout(()=>{I||(t("request TIMEOUT id=%d type=%s elapsed=%dms",S,m,Date.now()-y),N())},3e4);try{let k=await u(m,b),L=Date.now()-y;return t("request done id=%d type=%s elapsed=%dms",S,m,L),k}catch(k){let L=Date.now()-y;throw t("request error id=%d type=%s elapsed=%dms err=%o",S,m,L,k),k}finally{clearTimeout($),N()}}}return o(),{wrapSend:l,start:a,done:d,getCount:()=>r,getActiveRequests:()=>{let u=Date.now();return Array.from(n.entries()).map(([f,m])=>({id:f,type:m.type,elapsed_ms:u-m.start_ts}))}}}function ee(e,t="info",r=2800){let n=document.createElement("div");n.className="toast",n.textContent=e,n.style.position="fixed",n.style.right="12px",n.style.bottom="12px",n.style.zIndex="1000",n.style.color="#fff",n.style.padding="8px 10px",n.style.borderRadius="4px",n.style.fontSize="12px",t==="success"?n.style.background="#156d36":t==="warning"?n.style.background="#a36a00":t==="error"?n.style.background="#9f2011":n.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(n),setTimeout(()=>{try{n.remove()}catch{}},r)}function Hn(e=void 0,t=void 0){function r(){if(!t||typeof t.get!="function")return null;let o=t.get();return o&&o.order?o.order:{}}function n(o,a,d){let l=e&&e.snapshotFor?e.snapshotFor(o).slice():[];if(a==="closed")return l.sort(Wa),l;switch(d){case"created_desc":return l.sort(Cr),l;case"created_asc":return l.sort(Ba),l;case"updated_desc":return l.sort(Ua),l;case"priority":return l.sort(ja),l;case"manual":default:{let u=r();return u?l.sort(Wn(u)):l.sort(Cr),l}}}function s(o){let a=[];return e&&typeof e.subscribe=="function"&&a.push(e.subscribe(o)),t&&typeof t.subscribe=="function"&&a.push(t.subscribe(o)),()=>{for(let d of a)try{d()}catch{}}}return{selectBoardColumn:n,subscribe:s}}function tr(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function pt(e){let t=tr(e);if(t===null)return"";let r=new Date(t),n=s=>String(s).padStart(2,"0");return`${r.getFullYear()}-${n(r.getMonth()+1)}-${n(r.getDate())} ${n(r.getHours())}:${n(r.getMinutes())}`}function Tt(e,t){let r=tr(e);if(r===null)return"";let s=(typeof t=="number"?t:Date.now())-r;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let a=Math.floor(s/36e5);if(a<24)return`${a}\uC2DC\uAC04 \uC804`;let d=Math.floor(s/864e5);if(d<7)return`${d}\uC77C \uC804`;let l=Math.floor(d/7);if(d<30)return`${l}\uC8FC \uC804`;let u=Math.floor(d/30);return u<12?`${u}\uAC1C\uC6D4 \uC804`:`${Math.floor(d/365)}\uB144 \uC804`}function Gn(e){if(!Array.isArray(e))return null;let t=null,r=-1;for(let n of e){if(!n||n.status!=="in_progress")continue;let s=tr(n.updated_at)??0;if(t===null||s>r){t=n,r=s;continue}s===r&&String(n.id)<String(t.id)&&(t=n)}return t}function Vn(e){let t=e.transport,r=e.uiOrderStore;function n(a,d){return"renormalize"in a?a.renormalize:[{bead_id:d,rank:a.rank}]}function s(a,d){let l={...a.order};for(let u of d)l[u.bead_id]=u.rank;r&&r.set({revision:a.revision,order:l})}async function o(a,d,l){if(!t||!r)return;let u=r.get()||{revision:0,order:{}},f=n(Vs(d,l,u.order),a);s(u,f);let m=await t("ui-order-set",{expected_revision:u.revision,entries:f});if(m&&m.conflict){let b={revision:typeof m.revision=="number"?m.revision:0,order:m.order||{}};r.set(b);let S=n(Vs(d,l,b.order),a);s(b,S);let y=await t("ui-order-set",{expected_revision:b.revision,entries:S});y&&y.applied&&r.set({revision:typeof y.revision=="number"?y.revision:0,order:y.order||{}})}else m&&m.applied&&r.set({revision:typeof m.revision=="number"?m.revision:0,order:m.order||{}})}return{applyReorder:o}}function Yn(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Zs(e,t){return!t||typeof e!="string"||e.length===0||Yn(t.visible_labels).includes(e)?!0:Yn(t.hidden_labels).includes(e)?!1:!Yn(t.hidden_prefixes).some(r=>r.length>0&&e.startsWith(r))}function Kn(e,t){return Yn(e).filter(r=>Zs(r,t))}function _r(e,t){let r=e&&e.chips?e.chips[t]:void 0;return typeof r=="boolean"?r:!0}var xd={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},ei={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},Ja={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},Sd={review:"\u2713",skip:"\u2298"},mr={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function Ad(e,t,r){if(!(r==="in_progress"||r==="resolved"))return null;for(let s of e){let o=t[s];if(o&&o.fill==="dim"&&o.stale!==!0)return s}return null}function ti(e){let t=e&&e.fill||"none";return t==="none"?mr.none:e&&e.stale===!0?mr.stale:t==="dim"?mr.dim:e&&e.glyph==="review"?mr.review:e&&e.glyph==="skip"?mr.skip:mr.done}function Td(e){if(!e||e.fill==="none"||!e.approval_state)return ti(e);let t=[];return e.glyph==="review"?t.push(mr.review):e.glyph==="skip"&&t.push(mr.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function Ed(e,t,r){let n=xd[e]||e,s=t&&t.fill||"none",o=!!t&&t.stale===!0,a=Sd[t&&t.glyph||""]||"",d="bar";s==="dim"?d+=` b-${n} dim`:s==="full"&&(d+=` b-${n} full`),o&&(d+=" stale"),r&&(d+=" cur");let l=s==="none"?"lbl":`lbl l-${n} on`,u=r?`color: var(--stage-${n}-on)`:"";return i`
    <div class="seg">
      <div class=${d} style=${u}>${a}</div>
      <div class=${l}>
        ${ei[e]||e}
      </div>
    </div>
  `}function Zn(e,t){if(!e||!e.stages)return"";let r=Ja[e.route]||Ja.spec_backed,n=e.stages,s=Ad(r,n,String(t||"open")),o=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${r.map(a=>`${ei[a]||a} ${a==="plan"?Td(n[a]||{}):ti(n[a]||{})}`).join(" \xB7 ")}`;return i`
    <div class="stp" role="img" aria-label=${o}>
      ${r.map(a=>Ed(a,n[a]||{},a===s))}
    </div>
  `}function Cd(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var ri=2;function Rd(e){if(!e)return[];let t=[];if(e.external){let n=e.reason?`\u23F8 blocked: ${e.reason}`:"\u23F8 blocked";t.push(i`<span class="ctl-chip ctl-chip--blocked">${n}</span>`)}let r=Array.isArray(e.blockers)?e.blockers:[];if(r.length>0){let n=r.slice(0,ri).join(", "),s=r.length-ri,o=`\u26D3 blocked: ${n}${s>0?` +${s}`:""}`;t.push(i`<span class="ctl-chip ctl-chip--blocked-dep">${o}</span>`)}return t}function Id(e,t){let r=t.policy||null,n=e.workflow&&e.workflow.chips||{},s=[];if(n.route&&_r(r,"route")){let a=n.route_source==="derived";s.push(i`<span
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
      </button>`),_r(r,"blocked")&&s.push(...Rd(e.blocked_info)),t.cleanupFailureFor&&t.cleanupFailureFor(e.id)&&_r(r,"blocked")&&s.push(i`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 멈춤</span>`),s.length===0?"":i`<div class="board-card__chips">${s}</div>`}function Ld(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function Od(e){let t=Tt(e.created_at),r=Tt(e.updated_at);return!t&&!r?"":i`<span class="board-card__times">
    ${t?i`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${pt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}
    ${t&&r?i`<span class="board-card__time-sep">·</span>`:""}
    ${r?i`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${pt(e.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </span>`}function Dd(e,t){let r=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]},n=r.total||0,s=t.isExpanded?t.isExpanded(e.id):!0,o=n>0?r.children.slice().sort(za):r.children;return i`
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
        ${Od(e)}
      </div>
      ${n>0&&r.current?i`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${r.current.title||r.current.id}</span
            >
          </div>`:""}
      ${s&&n>0?i`<div class="board-card__roll-list">
            ${o.map((a,d)=>i`<button
                  type="button"
                  class="board-card__roll-child"
                  @click=${l=>t.onChildClick&&t.onChildClick(l,a.id)}
                >
                  <span class=${Ld(a.status)}>●</span>
                  <span class="board-card__roll-child-ord">${d+1}</span>
                  <span class="board-card__roll-child-title"
                    >${a.title||a.id}</span
                  >
                </button>`)}
          </div>`:""}
    </div>
  `}function Xn(e,t){let r=Cd(e.priority);return i`
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
      ${Id(e,t)}
      ${e.workflow&&_r(t.policy||null,"stepper")?Zn(e.workflow,e.status):""}
      ${Dd(e,t)}
    </article>
  `}function jr(e,t){let r=Array.isArray(e.items)?e.items.length:0,n=e.is_closed===!0;return i`
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
  `}function ni(e,t,r){return i`
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
  `}var Pd=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],Md=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],Nd=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function Fd(e,t,r){let n=e.labels.length,s=n>0?`\uB77C\uBCA8 ${n}`:"\uB77C\uBCA8";return i`
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
  `}function si(e,t,r){return i`
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
        ${Pd.map(n=>i`<option
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
        ${Md.map(n=>i`<option
              value=${n.value}
              ?selected=${e.type===n.value}
            >
              ${n.label}
            </option>`)}
      </select>
      ${Fd(e,t,r)}
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
        ${Nd.map(n=>i`<option
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
  `}var qd=200,Bd={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},Ud=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),oi="beads-ui.board.sort",ai=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function jd(){try{let e=window.localStorage.getItem(oi);if(e&&ai.has(e))return e}catch{}return"created_desc"}function ii(e,t){let r=nt("views:board"),n=t.gotoIssue,s=t.issueStores,o=t.transport,a=t.uiOrderStore,d=t.displayPolicyStore,l=t.workerQueueStore,u=t.onClosedRangeChange,f=t.onNewIssue,m=t.closedRange||At,b=s?Hn(s,a):null,S=Vn({transport:o,uiOrderStore:a}),y=[],I=[],N=[],$=[],k=[],L=[],E=!1,x=0,F=jd(),V=new Map,Q=new Map,ce=new Map,de=new Set,ie={search:"",priority:"",type:"",labels:[]},ue=!1,Ce=null;function Le(U){return String(U.status||"open")==="open"}function Je(U){let Y=String(U.status||"open");return Y==="open"||Y==="blocked"}function Fe(U){let Y=ie.search.trim().toLowerCase(),ge=ie.priority,K=ie.type,we=ie.labels;return U.filter(Ie=>{if(Y){let qe=String(Ie.id||"").toLowerCase(),Ke=String(Ie.title||"").toLowerCase();if(!qe.includes(Y)&&!Ke.includes(Y))return!1}if(ge!==""&&String(Ie.priority)!==ge||K!==""&&String(Ie.issue_type||"")!==K)return!1;if(we.length>0){let qe=Array.isArray(Ie.labels)?Ie.labels:[];if(!we.some(Ke=>qe.includes(Ke)))return!1}return!0})}function Xe(){let U=new Set;for(let Y of[y,I,N,$,k,L])for(let ge of Y){let K=Array.isArray(ge.labels)?ge.labels:[];for(let we of K)typeof we=="string"&&we.length>0&&U.add(we)}return Array.from(U).sort()}function Re(){return ie.search.trim()!==""||ie.priority!==""||ie.type!==""||ie.labels.length>0}function be(){try{if(b){let U=b.selectBoardColumn("tab:board:in-progress","in_progress",F),Y=b.selectBoardColumn("tab:board:blocked","blocked",F).filter(Je),ge=new Set(U.map(ye=>ye.id)),K=b.selectBoardColumn("tab:board:ready","ready",F).filter(ye=>Le(ye)&&!ge.has(ye.id)),we=b.selectBoardColumn("tab:board:resolved","resolved",F),Ie=b.selectBoardColumn("tab:board:deferred","deferred",F),qe=b.selectBoardColumn("tab:board:closed","closed").slice(0,qd),Ke=[...Y,...K,...U,...we,...qe];xe(Ke);let Ae=new Set;for(let ye of Ke)ye&&ye.id&&!Xs(ye)&&Ae.add(ye.id);let Ue=!Re();y=Ue?nn(Y,Ae):Y,I=Ue?nn(K,Ae):K,N=Ue?nn(U,Ae):U,$=Ue?nn(we,Ae):we,k=Ie,x=Ie.length,L=Ue?nn(qe,Ae):qe,V=new Map;for(let ye of y)V.set(ye.id,"open");for(let ye of I)V.set(ye.id,"open");for(let ye of N)V.set(ye.id,"in_progress");for(let ye of $)V.set(ye.id,"resolved");for(let ye of k)V.set(ye.id,"deferred");for(let ye of L)V.set(ye.id,"closed");Q=new Map;for(let ye of y)Q.set(ye.id,"blocked-col");for(let ye of I)Q.set(ye.id,"ready-col");for(let ye of N)Q.set(ye.id,"in-progress-col");for(let ye of $)Q.set(ye.id,"resolved-col");for(let ye of L)Q.set(ye.id,"closed-col")}$e()}catch{y=[],I=[],N=[],$=[],k=[],L=[],ce=new Map,$e()}}function xe(U){let Y=new Map;for(let K of U)K&&K.id&&!Y.has(K.id)&&Y.set(K.id,K);let ge=new Map;for(let K of Y.values()){let we=Xs(K);if(!we)continue;let Ie=ge.get(we);Ie||(Ie=[],ge.set(we,Ie)),Ie.push({id:K.id,title:K.title,status:K.status,metadata:K.metadata,created_at:K.created_at,updated_at:K.updated_at})}ce=ge}function fe(U){let Y=ce.get(U)||[],ge=0;for(let we of Y)(we.status==="resolved"||we.status==="closed")&&(ge+=1);let K=Gn(Y);return{total:Y.length,count:ge,current:K,children:Y}}function z(U){return!de.has(U)}function q(U,Y){U.preventDefault(),U.stopPropagation(),de.has(Y)?de.delete(Y):de.add(Y),$e()}function Te(U,Y){U.preventDefault(),U.stopPropagation(),n(Y)}function te(U,Y){U.preventDefault(),U.stopPropagation(),n(Y)}function re(U,Y){Ce||n(Y)}function C(U,Y){U.preventDefault(),U.stopPropagation(),Wd(Y).then(ge=>{ge&&ee("\uBCF5\uC0AC\uB428","success",1200)})}function B(U,Y){Ce=Y,U.dataTransfer&&(U.dataTransfer.setData("text/plain",Y),U.dataTransfer.effectAllowed="move"),U.target.classList.add("board-card--dragging")}function pe(U){U.target.classList.remove("board-card--dragging"),St(),setTimeout(()=>{Ce=null},0)}function Oe(U){let Y=String(U.target.value||"");!Y||Y===m||(m=Y,u&&u(Y),$e())}function M(){return d?d.get():null}function j(U){let Y=l?l.get():null,ge=Y?Y.cleanup_failed:null;if(!ge||typeof ge!="object"||Array.isArray(ge))return null;let K=ge[U];return!K||typeof K!="object"||Array.isArray(K)?null:K}let R={onCardClick:re,onCopyId:C,onDragStart:B,onDragEnd:pe,onClosedRangeChange:Oe,rollupFor:fe,isExpanded:z,onRollupToggle:q,onChildClick:Te,onFromChipClick:te,cleanupFailureFor:j,get policy(){return M()}};function X(U,Y){Ce||(A(),n(Y))}function Z(U,Y){U.preventDefault(),U.stopPropagation(),A(),n(Y)}let oe={...R,onCardClick:X,onChildClick:Z,onFromChipClick:Z,get policy(){return M()}};function ne(U){let Y=U.target,ge=e.querySelector(".board-filter__labels");Y&&ge&&ge.contains(Y)||Qe()}function ke(U){U.key==="Escape"&&Qe()}function Ve(){ue||(ue=!0,document.addEventListener("mousedown",ne),document.addEventListener("keydown",ke),$e())}function Qe(){ue&&(ue=!1,document.removeEventListener("mousedown",ne),document.removeEventListener("keydown",ke),$e())}function st(U){U.key==="Escape"&&A()}function rt(){E||(E=!0,document.addEventListener("keydown",st),$e())}function A(){E&&(E=!1,document.removeEventListener("keydown",st),$e())}let H={onClose:A,onOverlayClick(U){U.target===U.currentTarget&&A()}},le={onSearchInput(U){ie.search=String(U.target.value||""),be()},onPriorityChange(U){ie.priority=String(U.target.value||""),be()},onTypeChange(U){ie.type=String(U.target.value||""),be()},onSortChange(U){let Y=String(U.target.value||"");if(!(!ai.has(Y)||Y===F)){F=Y;try{window.localStorage.setItem(oi,Y)}catch{}be()}},onDeferredToggle(){E?A():rt()},onLabelMenuToggle(){ue?Qe():Ve()},onLabelToggle(U){let Y=ie.labels.indexOf(U);Y===-1?ie.labels.push(U):ie.labels.splice(Y,1),be()},onLabelClear(){ie.labels.length!==0&&(ie.labels=[],be())},onNewIssue(){f&&f()}};function Ee(){return i`
      <div class="board-view">
        ${si(ie,le,{sort_mode:F,deferred_popup_open:E,deferred_count:x,label_options:Xe(),label_menu_open:ue})}
        <div class="board-root">
          ${jr({title:"Blocked",id:"blocked-col",items:Fe(y)},R)}
          ${jr({title:"Ready",id:"ready-col",items:Fe(I)},R)}
          ${jr({title:"In progress",id:"in-progress-col",items:Fe(N)},R)}
          ${jr({title:"Resolved",id:"resolved-col",items:Fe($)},R)}
          ${jr({title:"Closed",id:"closed-col",items:Fe(L),is_closed:!0,closed_range:m},R)}
        </div>
        ${E?ni({items:Fe(k),count:x},oe,H):""}
      </div>
    `}function $e(){Be(Ee(),e),De()}function De(){try{let U=e.querySelector("#deferred-popup");U&&!U.open&&(typeof U.showModal=="function"?U.showModal():U.setAttribute("open",""));let Y=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let ge of Y)Array.from(ge.querySelectorAll(".board-card")).forEach((we,Ie)=>{we.tabIndex=Ie===0?0:-1})}catch{}}async function ot(U,Y){if(!o){ee("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:U,status:Y}),ee("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(ge){r("update-status failed: %o",ge),ee("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function et(U){switch(U){case"blocked-col":return y;case"ready-col":return I;case"in-progress-col":return N;case"resolved-col":return $;default:return[]}}function ut(U,Y,ge){if(!o||!a)return;let K=et(U),we=K.find(Ue=>Ue.id===Y);if(!we)return;let Ie=K.filter(Ue=>Ue.id!==Y),qe=ge.closest?ge.closest(".board-card"):null,Ke=Ie.length;if(qe){let Ue=qe.getAttribute("data-issue-id");if(Ue===Y)return;let ye=Ie.findIndex(mt=>mt.id===Ue);ye>=0&&(Ke=ye)}let Ae=Ie.slice();Ae.splice(Ke,0,we),S.applyReorder(Y,Ae,Ke)}function St(){for(let U of Array.from(e.querySelectorAll(".board-column--drag-over")))U.classList.remove("board-column--drag-over")}let lt=null;e.addEventListener("dragover",U=>{U.preventDefault(),U.dataTransfer&&(U.dataTransfer.dropEffect="move");let ge=U.target.closest(".board-column");ge&&ge!==lt&&(lt&&lt.classList.remove("board-column--drag-over"),ge.classList.add("board-column--drag-over"),lt=ge)}),e.addEventListener("dragleave",U=>{let Y=U.relatedTarget;(!Y||!e.contains(Y))&&lt&&(lt.classList.remove("board-column--drag-over"),lt=null)}),e.addEventListener("drop",U=>{U.preventDefault(),lt&&(lt.classList.remove("board-column--drag-over"),lt=null);let Y=U.target,ge=Y.closest(".board-column");if(!ge)return;let K=U.dataTransfer?.getData("text/plain")||"";if(!K)return;let we=ge.id,Ie=Q.get(K);if(Ie&&Ie===we){if(Ud.has(we)){if(F!=="manual"){ee("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}ut(we,K,Y)}return}let qe=Bd[we];if(!qe){ee("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}V.get(K)!==qe&&ot(K,qe)}),e.addEventListener("keydown",U=>{let Y=U.target;if(!(Y instanceof HTMLElement))return;let ge=String(Y.tagName||"").toLowerCase();if(ge==="input"||ge==="textarea"||ge==="select"||ge==="button"||ge==="a"||Y.isContentEditable===!0)return;let K=Y.closest(".board-card");if(!K)return;let we=String(U.key||"");if(we==="Enter"||we===" "){U.preventDefault();let Ae=K.getAttribute("data-issue-id");Ae&&n(Ae);return}if(we!=="ArrowUp"&&we!=="ArrowDown"&&we!=="ArrowLeft"&&we!=="ArrowRight")return;U.preventDefault();let Ie=K.closest(".board-column");if(!Ie)return;let qe=Array.from(Ie.querySelectorAll(".board-card")),Ke=qe.indexOf(K);if(we==="ArrowDown"&&Ke<qe.length-1){_t(K,qe[Ke+1]);return}if(we==="ArrowUp"&&Ke>0){_t(K,qe[Ke-1]);return}if(we==="ArrowLeft"||we==="ArrowRight"){let Ae=Array.from(e.querySelectorAll(".board-column")),Ue=Ae.indexOf(Ie),ye=we==="ArrowRight"?1:-1,mt=Ue+ye;for(;mt>=0&&mt<Ae.length;){let bt=Ae[mt].querySelector(".board-card");if(bt){_t(K,bt);return}mt+=ye}}});function _t(U,Y){try{U.tabIndex=-1,Y.tabIndex=0,Y.focus()}catch{}}let Ye=null;b&&b.subscribe&&(Ye=b.subscribe(()=>{try{be()}catch{}}));let at=null;d&&d.subscribe&&(at=d.subscribe(()=>{try{be()}catch{}}));let ct=null;return l&&l.subscribe&&(ct=l.subscribe(()=>{$e()})),{async load(){r("load"),be()},clear(){Qe(),A(),Ye&&(Ye(),Ye=null),at&&(at(),at=null),ct&&(ct(),ct=null),e.replaceChildren(),y=[],I=[],N=[],$=[],k=[],L=[],V=new Map,Q=new Map}}}function Xs(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function nn(e,t){return e.filter(r=>{let n=Xs(r);return!(n&&t.has(n))})}async function Wd(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let r=!1;try{r=document.execCommand("copy")}finally{t.remove()}return r}catch{return!1}}async function Rr(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let r=document.createElement("textarea");r.value=t,r.style.position="fixed",r.style.left="-9999px",document.body.appendChild(r),r.select();let n=!1;try{n=document.execCommand("copy")}finally{r.remove()}return n}catch{return!1}}function Kt(e){return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,e.speed==="fast"?"Fast":null].filter(Boolean).join(" \xB7 ")}function gr(e){return typeof e.resumed_from!="string"||e.resumed_from.length===0?null:`${e.continuation_mode==="session"?"session \uC774\uC5B4\uBC1B\uC74C":e.continuation_mode==="fresh"?"\uC0C8 session\uC73C\uB85C \uC774\uC5B4\uBC1B\uC74C":"\uC774\uC804 attempt\uC5D0\uC11C \uC774\uC5B4\uBC1B\uC74C"} (from ${e.resumed_from})`}function zd(e,t=document){let r=t.createElement("dialog");r.className="continuation-dialog";let n=t.createElement("button"),s=t.createElement("button"),o=t.createElement("button"),a=t.createElement("h2"),d=t.createElement("p");return a.textContent="\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4",d.textContent=`${Kt(e.prior||{})||"\uC774\uC804 \uC124\uC815"} \u2192 ${Kt(e.current||{})||"\uD604\uC7AC \uC124\uC815"}`,n.type="button",n.textContent="\uAE30\uC874 session \uC774\uC5B4\uD558\uAE30",n.disabled=e.prior_available===!1,s.type="button",s.textContent="\uD604\uC7AC preset\uC73C\uB85C \uC0C8 session",o.type="button",o.textContent="\uCDE8\uC18C",r.append(a,d,n,s,o),t.body.append(r),new Promise(l=>{let u=f=>{typeof r.close=="function"&&r.close(),r.remove(),l(f)};n.addEventListener("click",()=>u("prior_session")),s.addEventListener("click",()=>u("fresh_current")),o.addEventListener("click",()=>u(null)),r.addEventListener("cancel",f=>{f.preventDefault(),u(null)}),typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")})}async function rr(e,t,r={}){let n=e;for(r.onResult?.(n);n?.continuation_mismatch;){let s=n.continuation_mismatch,o=await zd(s);if(o===null)return n;n=await t(o,s.decision_token),r.onResult?.(n),n?.conflict&&r.refresh&&(n=await r.refresh(n),r.onResult?.(n))}return n}var pi="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function ft(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var nr=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],sn=[...nr,"reasoning_output_tokens"],Hd=["implementation","review-consult"];function Qs(e){let t=0;for(let r of nr)t+=ft(e?.[r]);return t}function Gd(e){return!e||typeof e!="object"?!1:nr.some(t=>Number.isFinite(e[t]))}function li(e){return!e||typeof e!="object"?!1:sn.some(t=>Number.isFinite(e[t]))}function Vd(e){let t={};for(let r of sn)e&&Number.isFinite(e[r])&&(t[r]=e[r]);return t}function ci(e){let t={};for(let r of sn)Number.isFinite(e[r])&&(t[r]=e[r]);return e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function di(e,t){return e==="codex"?ft(t.input_tokens)+ft(t.output_tokens):Qs(t)}function Yd(e){return e==="claude"?"Claude":"Codex"}function Kd(e){return`\u03C4 ${fi(e)}`}function Zd(e,t){let r=t.breakdown||{},n=[`\uC785\uB825 ${ft(r.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${ft(r.output_tokens).toLocaleString("en-US")}`];e==="claude"?n.push(`\uCE90\uC2DC\uC77D\uAE30 ${ft(r.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${ft(r.cache_creation_input_tokens).toLocaleString("en-US")}`):(n.push(`\uCE90\uC2DC\uC77D\uAE30 ${ft(r.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${ft(r.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(r.reasoning_output_tokens)&&n.push(`\uCD94\uB860\uCD9C\uB825 ${ft(r.reasoning_output_tokens).toLocaleString("en-US")}`));let o=[e==="claude"?"Claude subtotal = \uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"Codex subtotal = \uC785\uB825 + \uCD9C\uB825; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset",`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,n.join(" \xB7 ")];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&o.push(`$${t.total_cost_usd.toFixed(2)}`),t.replayed&&o.push(pi),o.join(`
`)}function ht(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let r of["claude","codex"]){let n=e.providers[r];n&&t.push({provider:r,label:`${Yd(r)} ${Kd(n.subtotal)}${typeof n.total_cost_usd=="number"&&Number.isFinite(n.total_cost_usd)?` \xB7 $${n.total_cost_usd.toFixed(2)}`:""}`,tooltip:Zd(r,n)})}return t}function Jn(e){let t={},r={claude:!0,codex:!1},n={claude:0,codex:0};for(let s of e)if(!(!s||!s.providers))for(let o of["claude","codex"]){let a=s.providers[o];if(!a)continue;let d=t[o];d||(d={subtotal:0,breakdown:{}},t[o]=d),d.subtotal+=a.subtotal;for(let l of sn)Number.isFinite(a.breakdown[l])&&(d.breakdown[l]=ft(d.breakdown[l])+ft(a.breakdown[l]));a.replayed&&(d.replayed=!0),o==="claude"&&(typeof a.total_cost_usd=="number"&&Number.isFinite(a.total_cost_usd)?n.claude+=a.total_cost_usd:r.claude=!1)}return t.claude&&r.claude&&(t.claude.total_cost_usd=n.claude),Object.keys(t).length===0?null:{providers:t,roles:{}}}function Js(e){return!e||typeof e!="object"?null:Ot({attempt:{...e,bead_id:"__attempt__"}},"__attempt__")}function Xd(e){return e==="codex"?"codex":"claude"}function hr(){return{subtotal:0,breakdown:Vd(null),legs:[],replayed:!1,outer_count:0,outer_cost:0,outer_cost_count:0}}function Qn(e,t,r){e.subtotal+=t.subtotal;for(let n of sn)Number.isFinite(t.usage[n])&&(e.breakdown[n]=ft(e.breakdown[n])+ft(t.usage[n]));e.legs.push(t),t.replayed===!0&&(e.replayed=!0),r&&(e.outer_count+=1,typeof t.usage.total_cost_usd=="number"&&Number.isFinite(t.usage.total_cost_usd)&&(e.outer_cost+=t.usage.total_cost_usd,e.outer_cost_count+=1))}function ui(e,t){let r={subtotal:e.subtotal,breakdown:e.breakdown};return t&&(r.legs=e.legs),e.replayed&&(r.replayed=!0),r}function fi(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function Wr(e){return Gd(e)?`\u03C4 ${fi(Qs(e))}`:null}function qt(e){let t=Wr(e);if(!t)return null;let r=e?.total_cost_usd;return typeof r=="number"&&Number.isFinite(r)?`${t} \xB7 $${r.toFixed(2)}`:t}function zr(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${ft(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${ft(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${ft(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${ft(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let r=[`\uCD1D ${Qs(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&r.push(pi),r.join(`
`)}function Ot(e,t){let r={claude:hr(),codex:hr()},n={orchestrator:{claude:hr(),codex:hr()},implementation:{claude:hr(),codex:hr()},"review-consult":{claude:hr(),codex:hr()}},s=new Set;for(let d of Object.values(e||{})){if(!d||d.bead_id!==t)continue;let l=d.usage;if(li(l)){let f=Xd(d.runner),m=ci(l),b={provider:f,role:"orchestrator",attempt_id:String(d.attempt_id||""),usage:m,subtotal:di(f,m)};m.replayed===!0&&(b.replayed=!0),typeof d.model=="string"&&(b.model=d.model),typeof d.session_id=="string"&&(b.session_id=d.session_id),Qn(r[f],b,!0),Qn(n.orchestrator[f],b,!0)}let u=Array.isArray(d.usage_legs)?d.usage_legs:[];for(let f of u){if(!f||f.provider!=="codex"||!Hd.includes(f.role)||!li(f.usage))continue;let m=typeof f.receipt_id=="string"&&f.receipt_id.length>0?f.receipt_id:null;if(!m||s.has(m))continue;s.add(m);let b=ci(f.usage),S={provider:"codex",role:f.role,attempt_id:String(d.attempt_id||""),usage:b,subtotal:di("codex",b)};S.receipt_id=m,typeof f.model=="string"&&(S.model=f.model),typeof f.session_id=="string"?S.session_id=f.session_id:typeof f.thread_id=="string"&&(S.session_id=f.thread_id),typeof f.turn_id=="string"&&(S.turn_id=f.turn_id),typeof f.completed_at=="string"&&(S.completed_at=f.completed_at),b.replayed===!0&&(S.replayed=!0),Qn(r.codex,S,!1),Qn(n[S.role].codex,S,!1)}}let o={};for(let d of["claude","codex"]){let l=r[d];if(l.legs.length===0)continue;let u=ui(l,!1);d==="claude"&&l.outer_count>0&&l.outer_cost_count===l.outer_count&&(u.total_cost_usd=l.outer_cost),o[d]=u}if(Object.keys(o).length===0)return null;let a={};for(let d of["orchestrator","implementation","review-consult"]){let l={};for(let u of["claude","codex"]){let f=n[d][u];f.legs.length>0&&(l[u]={...ui(f,!0),legs:f.legs})}Object.keys(l).length>0&&(a[d]=l)}return{providers:o,roles:a}}var{entries:ki,setPrototypeOf:_i,isFrozen:Qd,getPrototypeOf:Jd,getOwnPropertyDescriptor:eu}=Object,{freeze:yt,seal:Dt,create:ao}=Object,{apply:io,construct:lo}=typeof Reflect<"u"&&Reflect;yt||(yt=function(t){return t});Dt||(Dt=function(t){return t});io||(io=function(t,r){for(var n=arguments.length,s=new Array(n>2?n-2:0),o=2;o<n;o++)s[o-2]=arguments[o];return t.apply(r,s)});lo||(lo=function(t){for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return new t(...n)});var es=kt(Array.prototype.forEach),tu=kt(Array.prototype.lastIndexOf),mi=kt(Array.prototype.pop),on=kt(Array.prototype.push),ru=kt(Array.prototype.splice),rs=kt(String.prototype.toLowerCase),eo=kt(String.prototype.toString),to=kt(String.prototype.match),an=kt(String.prototype.replace),nu=kt(String.prototype.indexOf),su=kt(String.prototype.trim),Bt=kt(Object.prototype.hasOwnProperty),wt=kt(RegExp.prototype.test),ln=ou(TypeError);function kt(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return io(e,t,n)}}function ou(e){return function(){for(var t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];return lo(e,r)}}function Ne(e,t){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:rs;_i&&_i(e,null);let n=t.length;for(;n--;){let s=t[n];if(typeof s=="string"){let o=r(s);o!==s&&(Qd(t)||(t[n]=o),s=o)}e[s]=!0}return e}function au(e){for(let t=0;t<e.length;t++)Bt(e,t)||(e[t]=null);return e}function sr(e){let t=ao(null);for(let[r,n]of ki(e))Bt(e,r)&&(Array.isArray(n)?t[r]=au(n):n&&typeof n=="object"&&n.constructor===Object?t[r]=sr(n):t[r]=n);return t}function cn(e,t){for(;e!==null;){let n=eu(e,t);if(n){if(n.get)return kt(n.get);if(typeof n.value=="function")return kt(n.value)}e=Jd(e)}function r(){return null}return r}var gi=yt(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),ro=yt(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),no=yt(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),iu=yt(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),so=yt(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),lu=yt(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),hi=yt(["#text"]),bi=yt(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),oo=yt(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),vi=yt(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),ts=yt(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),cu=Dt(/\{\{[\w\W]*|[\w\W]*\}\}/gm),du=Dt(/<%[\w\W]*|[\w\W]*%>/gm),uu=Dt(/\$\{[\w\W]*/gm),pu=Dt(/^data-[\-\w.\u00B7-\uFFFF]+$/),fu=Dt(/^aria-[\-\w]+$/),$i=Dt(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),_u=Dt(/^(?:\w+script|data):/i),mu=Dt(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),xi=Dt(/^html$/i),gu=Dt(/^[a-z][.\w]*(-[.\w]+)+$/i),wi=Object.freeze({__proto__:null,ARIA_ATTR:fu,ATTR_WHITESPACE:mu,CUSTOM_ELEMENT:gu,DATA_ATTR:pu,DOCTYPE_NAME:xi,ERB_EXPR:du,IS_ALLOWED_URI:$i,IS_SCRIPT_OR_DATA:_u,MUSTACHE_EXPR:cu,TMPLIT_EXPR:uu}),dn={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},hu=function(){return typeof window>"u"?null:window},bu=function(t,r){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let n=null,s="data-tt-policy-suffix";r&&r.hasAttribute(s)&&(n=r.getAttribute(s));let o="dompurify"+(n?"#"+n:"");try{return t.createPolicy(o,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},yi=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Si(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:hu(),t=W=>Si(W);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==dn.document||!e.Element)return t.isSupported=!1,t;let{document:r}=e,n=r,s=n.currentScript,{DocumentFragment:o,HTMLTemplateElement:a,Node:d,Element:l,NodeFilter:u,NamedNodeMap:f=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:m,DOMParser:b,trustedTypes:S}=e,y=l.prototype,I=cn(y,"cloneNode"),N=cn(y,"remove"),$=cn(y,"nextSibling"),k=cn(y,"childNodes"),L=cn(y,"parentNode");if(typeof a=="function"){let W=r.createElement("template");W.content&&W.content.ownerDocument&&(r=W.content.ownerDocument)}let E,x="",{implementation:F,createNodeIterator:V,createDocumentFragment:Q,getElementsByTagName:ce}=r,{importNode:de}=n,ie=yi();t.isSupported=typeof ki=="function"&&typeof L=="function"&&F&&F.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:ue,ERB_EXPR:Ce,TMPLIT_EXPR:Le,DATA_ATTR:Je,ARIA_ATTR:Fe,IS_SCRIPT_OR_DATA:Xe,ATTR_WHITESPACE:Re,CUSTOM_ELEMENT:be}=wi,{IS_ALLOWED_URI:xe}=wi,fe=null,z=Ne({},[...gi,...ro,...no,...so,...hi]),q=null,Te=Ne({},[...bi,...oo,...vi,...ts]),te=Object.seal(ao(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),re=null,C=null,B=Object.seal(ao(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),pe=!0,Oe=!0,M=!1,j=!0,R=!1,X=!0,Z=!1,oe=!1,ne=!1,ke=!1,Ve=!1,Qe=!1,st=!0,rt=!1,A="user-content-",H=!0,le=!1,Ee={},$e=null,De=Ne({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),ot=null,et=Ne({},["audio","video","img","source","image","track"]),ut=null,St=Ne({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),lt="http://www.w3.org/1998/Math/MathML",_t="http://www.w3.org/2000/svg",Ye="http://www.w3.org/1999/xhtml",at=Ye,ct=!1,U=null,Y=Ne({},[lt,_t,Ye],eo),ge=Ne({},["mi","mo","mn","ms","mtext"]),K=Ne({},["annotation-xml"]),we=Ne({},["title","style","font","a","script"]),Ie=null,qe=["application/xhtml+xml","text/html"],Ke="text/html",Ae=null,Ue=null,ye=r.createElement("form"),mt=function(g){return g instanceof RegExp||g instanceof Function},bt=function(){let g=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(Ue&&Ue===g)){if((!g||typeof g!="object")&&(g={}),g=sr(g),Ie=qe.indexOf(g.PARSER_MEDIA_TYPE)===-1?Ke:g.PARSER_MEDIA_TYPE,Ae=Ie==="application/xhtml+xml"?eo:rs,fe=Bt(g,"ALLOWED_TAGS")?Ne({},g.ALLOWED_TAGS,Ae):z,q=Bt(g,"ALLOWED_ATTR")?Ne({},g.ALLOWED_ATTR,Ae):Te,U=Bt(g,"ALLOWED_NAMESPACES")?Ne({},g.ALLOWED_NAMESPACES,eo):Y,ut=Bt(g,"ADD_URI_SAFE_ATTR")?Ne(sr(St),g.ADD_URI_SAFE_ATTR,Ae):St,ot=Bt(g,"ADD_DATA_URI_TAGS")?Ne(sr(et),g.ADD_DATA_URI_TAGS,Ae):et,$e=Bt(g,"FORBID_CONTENTS")?Ne({},g.FORBID_CONTENTS,Ae):De,re=Bt(g,"FORBID_TAGS")?Ne({},g.FORBID_TAGS,Ae):sr({}),C=Bt(g,"FORBID_ATTR")?Ne({},g.FORBID_ATTR,Ae):sr({}),Ee=Bt(g,"USE_PROFILES")?g.USE_PROFILES:!1,pe=g.ALLOW_ARIA_ATTR!==!1,Oe=g.ALLOW_DATA_ATTR!==!1,M=g.ALLOW_UNKNOWN_PROTOCOLS||!1,j=g.ALLOW_SELF_CLOSE_IN_ATTR!==!1,R=g.SAFE_FOR_TEMPLATES||!1,X=g.SAFE_FOR_XML!==!1,Z=g.WHOLE_DOCUMENT||!1,ke=g.RETURN_DOM||!1,Ve=g.RETURN_DOM_FRAGMENT||!1,Qe=g.RETURN_TRUSTED_TYPE||!1,ne=g.FORCE_BODY||!1,st=g.SANITIZE_DOM!==!1,rt=g.SANITIZE_NAMED_PROPS||!1,H=g.KEEP_CONTENT!==!1,le=g.IN_PLACE||!1,xe=g.ALLOWED_URI_REGEXP||$i,at=g.NAMESPACE||Ye,ge=g.MATHML_TEXT_INTEGRATION_POINTS||ge,K=g.HTML_INTEGRATION_POINTS||K,te=g.CUSTOM_ELEMENT_HANDLING||{},g.CUSTOM_ELEMENT_HANDLING&&mt(g.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(te.tagNameCheck=g.CUSTOM_ELEMENT_HANDLING.tagNameCheck),g.CUSTOM_ELEMENT_HANDLING&&mt(g.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(te.attributeNameCheck=g.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),g.CUSTOM_ELEMENT_HANDLING&&typeof g.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(te.allowCustomizedBuiltInElements=g.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),R&&(Oe=!1),Ve&&(ke=!0),Ee&&(fe=Ne({},hi),q=[],Ee.html===!0&&(Ne(fe,gi),Ne(q,bi)),Ee.svg===!0&&(Ne(fe,ro),Ne(q,oo),Ne(q,ts)),Ee.svgFilters===!0&&(Ne(fe,no),Ne(q,oo),Ne(q,ts)),Ee.mathMl===!0&&(Ne(fe,so),Ne(q,vi),Ne(q,ts))),g.ADD_TAGS&&(typeof g.ADD_TAGS=="function"?B.tagCheck=g.ADD_TAGS:(fe===z&&(fe=sr(fe)),Ne(fe,g.ADD_TAGS,Ae))),g.ADD_ATTR&&(typeof g.ADD_ATTR=="function"?B.attributeCheck=g.ADD_ATTR:(q===Te&&(q=sr(q)),Ne(q,g.ADD_ATTR,Ae))),g.ADD_URI_SAFE_ATTR&&Ne(ut,g.ADD_URI_SAFE_ATTR,Ae),g.FORBID_CONTENTS&&($e===De&&($e=sr($e)),Ne($e,g.FORBID_CONTENTS,Ae)),H&&(fe["#text"]=!0),Z&&Ne(fe,["html","head","body"]),fe.table&&(Ne(fe,["tbody"]),delete re.tbody),g.TRUSTED_TYPES_POLICY){if(typeof g.TRUSTED_TYPES_POLICY.createHTML!="function")throw ln('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof g.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw ln('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');E=g.TRUSTED_TYPES_POLICY,x=E.createHTML("")}else E===void 0&&(E=bu(S,s)),E!==null&&typeof x=="string"&&(x=E.createHTML(""));yt&&yt(g),Ue=g}},Et=Ne({},[...ro,...no,...iu]),dr=Ne({},[...so,...lu]),ur=function(g){let P=L(g);(!P||!P.tagName)&&(P={namespaceURI:at,tagName:"template"});let G=rs(g.tagName),Se=rs(P.tagName);return U[g.namespaceURI]?g.namespaceURI===_t?P.namespaceURI===Ye?G==="svg":P.namespaceURI===lt?G==="svg"&&(Se==="annotation-xml"||ge[Se]):!!Et[G]:g.namespaceURI===lt?P.namespaceURI===Ye?G==="math":P.namespaceURI===_t?G==="math"&&K[Se]:!!dr[G]:g.namespaceURI===Ye?P.namespaceURI===_t&&!K[Se]||P.namespaceURI===lt&&!ge[Se]?!1:!dr[G]&&(we[G]||!Et[G]):!!(Ie==="application/xhtml+xml"&&U[g.namespaceURI]):!1},dt=function(g){on(t.removed,{element:g});try{L(g).removeChild(g)}catch{N(g)}},vt=function(g,P){try{on(t.removed,{attribute:P.getAttributeNode(g),from:P})}catch{on(t.removed,{attribute:null,from:P})}if(P.removeAttribute(g),g==="is")if(ke||Ve)try{dt(P)}catch{}else try{P.setAttribute(g,"")}catch{}},Qt=function(g){let P=null,G=null;if(ne)g="<remove></remove>"+g;else{let je=to(g,/^[\r\n\t ]+/);G=je&&je[0]}Ie==="application/xhtml+xml"&&at===Ye&&(g='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+g+"</body></html>");let Se=E?E.createHTML(g):g;if(at===Ye)try{P=new b().parseFromString(Se,Ie)}catch{}if(!P||!P.documentElement){P=F.createDocument(at,"template",null);try{P.documentElement.innerHTML=ct?x:Se}catch{}}let He=P.body||P.documentElement;return g&&G&&He.insertBefore(r.createTextNode(G),He.childNodes[0]||null),at===Ye?ce.call(P,Z?"html":"body")[0]:Z?P.documentElement:He},Ht=function(g){return V.call(g.ownerDocument||g,g,u.SHOW_ELEMENT|u.SHOW_COMMENT|u.SHOW_TEXT|u.SHOW_PROCESSING_INSTRUCTION|u.SHOW_CDATA_SECTION,null)},Ct=function(g){return g instanceof m&&(typeof g.nodeName!="string"||typeof g.textContent!="string"||typeof g.removeChild!="function"||!(g.attributes instanceof f)||typeof g.removeAttribute!="function"||typeof g.setAttribute!="function"||typeof g.namespaceURI!="string"||typeof g.insertBefore!="function"||typeof g.hasChildNodes!="function")},Gt=function(g){return typeof d=="function"&&g instanceof d};function gt(W,g,P){es(W,G=>{G.call(t,g,P,Ue)})}let p=function(g){let P=null;if(gt(ie.beforeSanitizeElements,g,null),Ct(g))return dt(g),!0;let G=Ae(g.nodeName);if(gt(ie.uponSanitizeElement,g,{tagName:G,allowedTags:fe}),X&&g.hasChildNodes()&&!Gt(g.firstElementChild)&&wt(/<[/\w!]/g,g.innerHTML)&&wt(/<[/\w!]/g,g.textContent)||g.nodeType===dn.progressingInstruction||X&&g.nodeType===dn.comment&&wt(/<[/\w]/g,g.data))return dt(g),!0;if(!(B.tagCheck instanceof Function&&B.tagCheck(G))&&(!fe[G]||re[G])){if(!re[G]&&D(G)&&(te.tagNameCheck instanceof RegExp&&wt(te.tagNameCheck,G)||te.tagNameCheck instanceof Function&&te.tagNameCheck(G)))return!1;if(H&&!$e[G]){let Se=L(g)||g.parentNode,He=k(g)||g.childNodes;if(He&&Se){let je=He.length;for(let _e=je-1;_e>=0;--_e){let c=I(He[_e],!0);c.__removalCount=(g.__removalCount||0)+1,Se.insertBefore(c,$(g))}}}return dt(g),!0}return g instanceof l&&!ur(g)||(G==="noscript"||G==="noembed"||G==="noframes")&&wt(/<\/no(script|embed|frames)/i,g.innerHTML)?(dt(g),!0):(R&&g.nodeType===dn.text&&(P=g.textContent,es([ue,Ce,Le],Se=>{P=an(P,Se," ")}),g.textContent!==P&&(on(t.removed,{element:g.cloneNode()}),g.textContent=P)),gt(ie.afterSanitizeElements,g,null),!1)},v=function(g,P,G){if(st&&(P==="id"||P==="name")&&(G in r||G in ye))return!1;if(!(Oe&&!C[P]&&wt(Je,P))){if(!(pe&&wt(Fe,P))){if(!(B.attributeCheck instanceof Function&&B.attributeCheck(P,g))){if(!q[P]||C[P]){if(!(D(g)&&(te.tagNameCheck instanceof RegExp&&wt(te.tagNameCheck,g)||te.tagNameCheck instanceof Function&&te.tagNameCheck(g))&&(te.attributeNameCheck instanceof RegExp&&wt(te.attributeNameCheck,P)||te.attributeNameCheck instanceof Function&&te.attributeNameCheck(P,g))||P==="is"&&te.allowCustomizedBuiltInElements&&(te.tagNameCheck instanceof RegExp&&wt(te.tagNameCheck,G)||te.tagNameCheck instanceof Function&&te.tagNameCheck(G))))return!1}else if(!ut[P]){if(!wt(xe,an(G,Re,""))){if(!((P==="src"||P==="xlink:href"||P==="href")&&g!=="script"&&nu(G,"data:")===0&&ot[g])){if(!(M&&!wt(Xe,an(G,Re,"")))){if(G)return!1}}}}}}}return!0},D=function(g){return g!=="annotation-xml"&&to(g,be)},ae=function(g){gt(ie.beforeSanitizeAttributes,g,null);let{attributes:P}=g;if(!P||Ct(g))return;let G={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:q,forceKeepAttr:void 0},Se=P.length;for(;Se--;){let He=P[Se],{name:je,namespaceURI:_e,value:c}=He,_=Ae(je),w=c,T=je==="value"?w:su(w);if(G.attrName=_,G.attrValue=T,G.keepAttr=!0,G.forceKeepAttr=void 0,gt(ie.uponSanitizeAttribute,g,G),T=G.attrValue,rt&&(_==="id"||_==="name")&&(vt(je,g),T=A+T),X&&wt(/((--!?|])>)|<\/(style|title|textarea)/i,T)){vt(je,g);continue}if(_==="attributename"&&to(T,"href")){vt(je,g);continue}if(G.forceKeepAttr)continue;if(!G.keepAttr){vt(je,g);continue}if(!j&&wt(/\/>/i,T)){vt(je,g);continue}R&&es([ue,Ce,Le],ve=>{T=an(T,ve," ")});let J=Ae(g.nodeName);if(!v(J,_,T)){vt(je,g);continue}if(E&&typeof S=="object"&&typeof S.getAttributeType=="function"&&!_e)switch(S.getAttributeType(J,_)){case"TrustedHTML":{T=E.createHTML(T);break}case"TrustedScriptURL":{T=E.createScriptURL(T);break}}if(T!==w)try{_e?g.setAttributeNS(_e,je,T):g.setAttribute(je,T),Ct(g)?dt(g):mi(t.removed)}catch{vt(je,g)}}gt(ie.afterSanitizeAttributes,g,null)},he=function W(g){let P=null,G=Ht(g);for(gt(ie.beforeSanitizeShadowDOM,g,null);P=G.nextNode();)gt(ie.uponSanitizeShadowNode,P,null),p(P),ae(P),P.content instanceof o&&W(P.content);gt(ie.afterSanitizeShadowDOM,g,null)};return t.sanitize=function(W){let g=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},P=null,G=null,Se=null,He=null;if(ct=!W,ct&&(W="<!-->"),typeof W!="string"&&!Gt(W))if(typeof W.toString=="function"){if(W=W.toString(),typeof W!="string")throw ln("dirty is not a string, aborting")}else throw ln("toString is not a function");if(!t.isSupported)return W;if(oe||bt(g),t.removed=[],typeof W=="string"&&(le=!1),le){if(W.nodeName){let c=Ae(W.nodeName);if(!fe[c]||re[c])throw ln("root node is forbidden and cannot be sanitized in-place")}}else if(W instanceof d)P=Qt("<!---->"),G=P.ownerDocument.importNode(W,!0),G.nodeType===dn.element&&G.nodeName==="BODY"||G.nodeName==="HTML"?P=G:P.appendChild(G);else{if(!ke&&!R&&!Z&&W.indexOf("<")===-1)return E&&Qe?E.createHTML(W):W;if(P=Qt(W),!P)return ke?null:Qe?x:""}P&&ne&&dt(P.firstChild);let je=Ht(le?W:P);for(;Se=je.nextNode();)p(Se),ae(Se),Se.content instanceof o&&he(Se.content);if(le)return W;if(ke){if(Ve)for(He=Q.call(P.ownerDocument);P.firstChild;)He.appendChild(P.firstChild);else He=P;return(q.shadowroot||q.shadowrootmode)&&(He=de.call(n,He,!0)),He}let _e=Z?P.outerHTML:P.innerHTML;return Z&&fe["!doctype"]&&P.ownerDocument&&P.ownerDocument.doctype&&P.ownerDocument.doctype.name&&wt(xi,P.ownerDocument.doctype.name)&&(_e="<!DOCTYPE "+P.ownerDocument.doctype.name+`>
`+_e),R&&es([ue,Ce,Le],c=>{_e=an(_e,c," ")}),E&&Qe?E.createHTML(_e):_e},t.setConfig=function(){let W=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};bt(W),oe=!0},t.clearConfig=function(){Ue=null,oe=!1},t.isValidAttribute=function(W,g,P){Ue||bt({});let G=Ae(W),Se=Ae(g);return v(G,Se,P)},t.addHook=function(W,g){typeof g=="function"&&on(ie[W],g)},t.removeHook=function(W,g){if(g!==void 0){let P=tu(ie[W],g);return P===-1?void 0:ru(ie[W],P,1)[0]}return mi(ie[W])},t.removeHooks=function(W){ie[W]=[]},t.removeAllHooks=function(){ie=yi()},t}var Ai=Si();var or={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},ns=e=>(...t)=>({_$litDirective$:e,values:t}),Hr=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,r,n){this._$Ct=t,this._$AM=r,this._$Ci=n}_$AS(t,r){return this.update(t,r)}update(t,r){return this.render(...r)}};var un=class extends Hr{constructor(t){if(super(t),this.it=it,t.type!==or.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===it||t==null)return this._t=void 0,this.it=t;if(t===It)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let r=[t];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}};un.directiveName="unsafeHTML",un.resultType=1;var Ti=ns(un);function fo(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Lr=fo();function Di(e){Lr=e}var mn={exec:()=>null};function We(e,t=""){let r=typeof e=="string"?e:e.source,n={replace:(s,o)=>{let a=typeof o=="string"?o:o.source;return a=a.replace($t.caret,"$1"),r=r.replace(s,a),n},getRegex:()=>new RegExp(r,t)};return n}var vu=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),$t={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},wu=/^(?:[ \t]*(?:\n|$))+/,yu=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,ku=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,gn=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,$u=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,_o=/(?:[*+-]|\d{1,9}[.)])/,Pi=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Mi=We(Pi).replace(/bull/g,_o).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),xu=We(Pi).replace(/bull/g,_o).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),mo=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Su=/^[^\n]+/,go=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,Au=We(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",go).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Tu=We(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,_o).getRegex(),cs="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",ho=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Eu=We("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",ho).replace("tag",cs).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Ni=We(mo).replace("hr",gn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",cs).getRegex(),Cu=We(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Ni).getRegex(),bo={blockquote:Cu,code:yu,def:Au,fences:ku,heading:$u,hr:gn,html:Eu,lheading:Mi,list:Tu,newline:wu,paragraph:Ni,table:mn,text:Su},Ei=We("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",gn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",cs).getRegex(),Ru={...bo,lheading:xu,table:Ei,paragraph:We(mo).replace("hr",gn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Ei).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",cs).getRegex()},Iu={...bo,html:We(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",ho).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:mn,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:We(mo).replace("hr",gn).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Mi).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Lu=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Ou=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Fi=/^( {2,}|\\)\n(?!\s*$)/,Du=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,ds=/[\p{P}\p{S}]/u,vo=/[\s\p{P}\p{S}]/u,qi=/[^\s\p{P}\p{S}]/u,Pu=We(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,vo).getRegex(),Bi=/(?!~)[\p{P}\p{S}]/u,Mu=/(?!~)[\s\p{P}\p{S}]/u,Nu=/(?:[^\s\p{P}\p{S}]|~)/u,Fu=We(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",vu?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),Ui=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,qu=We(Ui,"u").replace(/punct/g,ds).getRegex(),Bu=We(Ui,"u").replace(/punct/g,Bi).getRegex(),ji="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Uu=We(ji,"gu").replace(/notPunctSpace/g,qi).replace(/punctSpace/g,vo).replace(/punct/g,ds).getRegex(),ju=We(ji,"gu").replace(/notPunctSpace/g,Nu).replace(/punctSpace/g,Mu).replace(/punct/g,Bi).getRegex(),Wu=We("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,qi).replace(/punctSpace/g,vo).replace(/punct/g,ds).getRegex(),zu=We(/\\(punct)/,"gu").replace(/punct/g,ds).getRegex(),Hu=We(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Gu=We(ho).replace("(?:-->|$)","-->").getRegex(),Vu=We("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Gu).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),as=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,Yu=We(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",as).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Wi=We(/^!?\[(label)\]\[(ref)\]/).replace("label",as).replace("ref",go).getRegex(),zi=We(/^!?\[(ref)\](?:\[\])?/).replace("ref",go).getRegex(),Ku=We("reflink|nolink(?!\\()","g").replace("reflink",Wi).replace("nolink",zi).getRegex(),Ci=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,wo={_backpedal:mn,anyPunctuation:zu,autolink:Hu,blockSkip:Fu,br:Fi,code:Ou,del:mn,emStrongLDelim:qu,emStrongRDelimAst:Uu,emStrongRDelimUnd:Wu,escape:Lu,link:Yu,nolink:zi,punctuation:Pu,reflink:Wi,reflinkSearch:Ku,tag:Vu,text:Du,url:mn},Zu={...wo,link:We(/^!?\[(label)\]\((.*?)\)/).replace("label",as).getRegex(),reflink:We(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",as).getRegex()},co={...wo,emStrongRDelimAst:ju,emStrongLDelim:Bu,url:We(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",Ci).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:We(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",Ci).getRegex()},Xu={...co,br:We(Fi).replace("{2,}","*").getRegex(),text:We(co.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},ss={normal:bo,gfm:Ru,pedantic:Iu},pn={normal:wo,gfm:co,breaks:Xu,pedantic:Zu},Qu={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Ri=e=>Qu[e];function ar(e,t){if(t){if($t.escapeTest.test(e))return e.replace($t.escapeReplace,Ri)}else if($t.escapeTestNoEncode.test(e))return e.replace($t.escapeReplaceNoEncode,Ri);return e}function Ii(e){try{e=encodeURI(e).replace($t.percentDecode,"%")}catch{return null}return e}function Li(e,t){let r=e.replace($t.findPipe,(o,a,d)=>{let l=!1,u=a;for(;--u>=0&&d[u]==="\\";)l=!l;return l?"|":" |"}),n=r.split($t.splitPipe),s=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),t)if(n.length>t)n.splice(t);else for(;n.length<t;)n.push("");for(;s<n.length;s++)n[s]=n[s].trim().replace($t.slashPipe,"|");return n}function fn(e,t,r){let n=e.length;if(n===0)return"";let s=0;for(;s<n;){let o=e.charAt(n-s-1);if(o===t&&!r)s++;else if(o!==t&&r)s++;else break}return e.slice(0,n-s)}function Ju(e,t){if(e.indexOf(t[1])===-1)return-1;let r=0;for(let n=0;n<e.length;n++)if(e[n]==="\\")n++;else if(e[n]===t[0])r++;else if(e[n]===t[1]&&(r--,r<0))return n;return r>0?-2:-1}function Oi(e,t,r,n,s){let o=t.href,a=t.title||null,d=e[1].replace(s.other.outputLinkReplace,"$1");n.state.inLink=!0;let l={type:e[0].charAt(0)==="!"?"image":"link",raw:r,href:o,title:a,text:d,tokens:n.inlineTokens(d)};return n.state.inLink=!1,l}function ep(e,t,r){let n=e.match(r.other.indentCodeCompensation);if(n===null)return t;let s=n[1];return t.split(`
`).map(o=>{let a=o.match(r.other.beginningSpace);if(a===null)return o;let[d]=a;return d.length>=s.length?o.slice(s.length):o}).join(`
`)}var is=class{constructor(e){Ze(this,"options");Ze(this,"rules");Ze(this,"lexer");this.options=e||Lr}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let r=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?r:fn(r,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let r=t[0],n=ep(r,t[3]||"",this.rules);return{type:"code",raw:r,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:n}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let r=t[2].trim();if(this.rules.other.endingHash.test(r)){let n=fn(r,"#");(this.options.pedantic||!n||this.rules.other.endingSpaceChar.test(n))&&(r=n.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:fn(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let r=fn(t[0],`
`).split(`
`),n="",s="",o=[];for(;r.length>0;){let a=!1,d=[],l;for(l=0;l<r.length;l++)if(this.rules.other.blockquoteStart.test(r[l]))d.push(r[l]),a=!0;else if(!a)d.push(r[l]);else break;r=r.slice(l);let u=d.join(`
`),f=u.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");n=n?`${n}
${u}`:u,s=s?`${s}
${f}`:f;let m=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(f,o,!0),this.lexer.state.top=m,r.length===0)break;let b=o.at(-1);if(b?.type==="code")break;if(b?.type==="blockquote"){let S=b,y=S.raw+`
`+r.join(`
`),I=this.blockquote(y);o[o.length-1]=I,n=n.substring(0,n.length-S.raw.length)+I.raw,s=s.substring(0,s.length-S.text.length)+I.text;break}else if(b?.type==="list"){let S=b,y=S.raw+`
`+r.join(`
`),I=this.list(y);o[o.length-1]=I,n=n.substring(0,n.length-b.raw.length)+I.raw,s=s.substring(0,s.length-S.raw.length)+I.raw,r=y.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:n,tokens:o,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let r=t[1].trim(),n=r.length>1,s={type:"list",raw:"",ordered:n,start:n?+r.slice(0,-1):"",loose:!1,items:[]};r=n?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=n?r:"[*+-]");let o=this.rules.other.listItemRegex(r),a=!1;for(;e;){let l=!1,u="",f="";if(!(t=o.exec(e))||this.rules.block.hr.test(e))break;u=t[0],e=e.substring(u.length);let m=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,I=>" ".repeat(3*I.length)),b=e.split(`
`,1)[0],S=!m.trim(),y=0;if(this.options.pedantic?(y=2,f=m.trimStart()):S?y=t[1].length+1:(y=t[2].search(this.rules.other.nonSpaceChar),y=y>4?1:y,f=m.slice(y),y+=t[1].length),S&&this.rules.other.blankLine.test(b)&&(u+=b+`
`,e=e.substring(b.length+1),l=!0),!l){let I=this.rules.other.nextBulletRegex(y),N=this.rules.other.hrRegex(y),$=this.rules.other.fencesBeginRegex(y),k=this.rules.other.headingBeginRegex(y),L=this.rules.other.htmlBeginRegex(y);for(;e;){let E=e.split(`
`,1)[0],x;if(b=E,this.options.pedantic?(b=b.replace(this.rules.other.listReplaceNesting,"  "),x=b):x=b.replace(this.rules.other.tabCharGlobal,"    "),$.test(b)||k.test(b)||L.test(b)||I.test(b)||N.test(b))break;if(x.search(this.rules.other.nonSpaceChar)>=y||!b.trim())f+=`
`+x.slice(y);else{if(S||m.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||$.test(m)||k.test(m)||N.test(m))break;f+=`
`+b}!S&&!b.trim()&&(S=!0),u+=E+`
`,e=e.substring(E.length+1),m=x.slice(y)}}s.loose||(a?s.loose=!0:this.rules.other.doubleBlankLine.test(u)&&(a=!0)),s.items.push({type:"list_item",raw:u,task:!!this.options.gfm&&this.rules.other.listIsTask.test(f),loose:!1,text:f,tokens:[]}),s.raw+=u}let d=s.items.at(-1);if(d)d.raw=d.raw.trimEnd(),d.text=d.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let l of s.items){if(this.lexer.state.top=!1,l.tokens=this.lexer.blockTokens(l.text,[]),l.task){if(l.text=l.text.replace(this.rules.other.listReplaceTask,""),l.tokens[0]?.type==="text"||l.tokens[0]?.type==="paragraph"){l.tokens[0].raw=l.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),l.tokens[0].text=l.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let f=this.lexer.inlineQueue.length-1;f>=0;f--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[f].src)){this.lexer.inlineQueue[f].src=this.lexer.inlineQueue[f].src.replace(this.rules.other.listReplaceTask,"");break}}let u=this.rules.other.listTaskCheckbox.exec(l.raw);if(u){let f={type:"checkbox",raw:u[0]+" ",checked:u[0]!=="[ ]"};l.checked=f.checked,s.loose?l.tokens[0]&&["paragraph","text"].includes(l.tokens[0].type)&&"tokens"in l.tokens[0]&&l.tokens[0].tokens?(l.tokens[0].raw=f.raw+l.tokens[0].raw,l.tokens[0].text=f.raw+l.tokens[0].text,l.tokens[0].tokens.unshift(f)):l.tokens.unshift({type:"paragraph",raw:f.raw,text:f.raw,tokens:[f]}):l.tokens.unshift(f)}}if(!s.loose){let u=l.tokens.filter(m=>m.type==="space"),f=u.length>0&&u.some(m=>this.rules.other.anyLine.test(m.raw));s.loose=f}}if(s.loose)for(let l of s.items){l.loose=!0;for(let u of l.tokens)u.type==="text"&&(u.type="paragraph")}return s}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let r=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),n=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:r,raw:t[0],href:n,title:s}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let r=Li(t[1]),n=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(r.length===n.length){for(let a of n)this.rules.other.tableAlignRight.test(a)?o.align.push("right"):this.rules.other.tableAlignCenter.test(a)?o.align.push("center"):this.rules.other.tableAlignLeft.test(a)?o.align.push("left"):o.align.push(null);for(let a=0;a<r.length;a++)o.header.push({text:r[a],tokens:this.lexer.inline(r[a]),header:!0,align:o.align[a]});for(let a of s)o.rows.push(Li(a,o.header.length).map((d,l)=>({text:d,tokens:this.lexer.inline(d),header:!1,align:o.align[l]})));return o}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let r=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:r,tokens:this.lexer.inline(r)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let r=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;let o=fn(r.slice(0,-1),"\\");if((r.length-o.length)%2===0)return}else{let o=Ju(t[2],"()");if(o===-2)return;if(o>-1){let a=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,a).trim(),t[3]=""}}let n=t[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(n);o&&(n=o[1],s=o[3])}else s=t[3]?t[3].slice(1,-1):"";return n=n.trim(),this.rules.other.startAngleBracket.test(n)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?n=n.slice(1):n=n.slice(1,-1)),Oi(t,{href:n&&n.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let r;if((r=this.rules.inline.reflink.exec(e))||(r=this.rules.inline.nolink.exec(e))){let n=(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[n.toLowerCase()];if(!s){let o=r[0].charAt(0);return{type:"text",raw:o,text:o}}return Oi(r,s,r[0],this.lexer,this.rules)}}emStrong(e,t,r=""){let n=this.rules.inline.emStrongLDelim.exec(e);if(!(!n||n[3]&&r.match(this.rules.other.unicodeAlphaNumeric))&&(!(n[1]||n[2])||!r||this.rules.inline.punctuation.exec(r))){let s=[...n[0]].length-1,o,a,d=s,l=0,u=n[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(u.lastIndex=0,t=t.slice(-1*e.length+s);(n=u.exec(t))!=null;){if(o=n[1]||n[2]||n[3]||n[4]||n[5]||n[6],!o)continue;if(a=[...o].length,n[3]||n[4]){d+=a;continue}else if((n[5]||n[6])&&s%3&&!((s+a)%3)){l+=a;continue}if(d-=a,d>0)continue;a=Math.min(a,a+d+l);let f=[...n[0]][0].length,m=e.slice(0,s+n.index+f+a);if(Math.min(s,a)%2){let S=m.slice(1,-1);return{type:"em",raw:m,text:S,tokens:this.lexer.inlineTokens(S)}}let b=m.slice(2,-2);return{type:"strong",raw:m,text:b,tokens:this.lexer.inlineTokens(b)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let r=t[2].replace(this.rules.other.newLineCharGlobal," "),n=this.rules.other.nonSpaceChar.test(r),s=this.rules.other.startingSpaceChar.test(r)&&this.rules.other.endingSpaceChar.test(r);return n&&s&&(r=r.substring(1,r.length-1)),{type:"codespan",raw:t[0],text:r}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let r,n;return t[2]==="@"?(r=t[1],n="mailto:"+r):(r=t[1],n=r),{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let r,n;if(t[2]==="@")r=t[0],n="mailto:"+r;else{let s;do s=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(s!==t[0]);r=t[0],t[1]==="www."?n="http://"+t[0]:n=t[0]}return{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let r=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:r}}}},Ut=class uo{constructor(t){Ze(this,"tokens");Ze(this,"options");Ze(this,"state");Ze(this,"inlineQueue");Ze(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||Lr,this.options.tokenizer=this.options.tokenizer||new is,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let r={other:$t,block:ss.normal,inline:pn.normal};this.options.pedantic?(r.block=ss.pedantic,r.inline=pn.pedantic):this.options.gfm&&(r.block=ss.gfm,this.options.breaks?r.inline=pn.breaks:r.inline=pn.gfm),this.tokenizer.rules=r}static get rules(){return{block:ss,inline:pn}}static lex(t,r){return new uo(r).lex(t)}static lexInline(t,r){return new uo(r).inlineTokens(t)}lex(t){t=t.replace($t.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let r=0;r<this.inlineQueue.length;r++){let n=this.inlineQueue[r];this.inlineTokens(n.src,n.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,r=[],n=!1){for(this.options.pedantic&&(t=t.replace($t.tabCharGlobal,"    ").replace($t.spaceLine,""));t;){let s;if(this.options.extensions?.block?.some(a=>(s=a.call({lexer:this},t,r))?(t=t.substring(s.raw.length),r.push(s),!0):!1))continue;if(s=this.tokenizer.space(t)){t=t.substring(s.raw.length);let a=r.at(-1);s.raw.length===1&&a!==void 0?a.raw+=`
`:r.push(s);continue}if(s=this.tokenizer.code(t)){t=t.substring(s.raw.length);let a=r.at(-1);a?.type==="paragraph"||a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.at(-1).src=a.text):r.push(s);continue}if(s=this.tokenizer.fences(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.heading(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.hr(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.blockquote(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.list(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.html(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.def(t)){t=t.substring(s.raw.length);let a=r.at(-1);a?.type==="paragraph"||a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.raw,this.inlineQueue.at(-1).src=a.text):this.tokens.links[s.tag]||(this.tokens.links[s.tag]={href:s.href,title:s.title},r.push(s));continue}if(s=this.tokenizer.table(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.lheading(t)){t=t.substring(s.raw.length),r.push(s);continue}let o=t;if(this.options.extensions?.startBlock){let a=1/0,d=t.slice(1),l;this.options.extensions.startBlock.forEach(u=>{l=u.call({lexer:this},d),typeof l=="number"&&l>=0&&(a=Math.min(a,l))}),a<1/0&&a>=0&&(o=t.substring(0,a+1))}if(this.state.top&&(s=this.tokenizer.paragraph(o))){let a=r.at(-1);n&&a?.type==="paragraph"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):r.push(s),n=o.length!==t.length,t=t.substring(s.raw.length);continue}if(s=this.tokenizer.text(t)){t=t.substring(s.raw.length);let a=r.at(-1);a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):r.push(s);continue}if(t){let a="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(a);break}else throw new Error(a)}}return this.state.top=!0,r}inline(t,r=[]){return this.inlineQueue.push({src:t,tokens:r}),r}inlineTokens(t,r=[]){let n=t,s=null;if(this.tokens.links){let l=Object.keys(this.tokens.links);if(l.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(n))!=null;)l.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(n=n.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(n))!=null;)n=n.slice(0,s.index)+"++"+n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(n))!=null;)o=s[2]?s[2].length:0,n=n.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let a=!1,d="";for(;t;){a||(d=""),a=!1;let l;if(this.options.extensions?.inline?.some(f=>(l=f.call({lexer:this},t,r))?(t=t.substring(l.raw.length),r.push(l),!0):!1))continue;if(l=this.tokenizer.escape(t)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.tag(t)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.link(t)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(l.raw.length);let f=r.at(-1);l.type==="text"&&f?.type==="text"?(f.raw+=l.raw,f.text+=l.text):r.push(l);continue}if(l=this.tokenizer.emStrong(t,n,d)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.codespan(t)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.br(t)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.del(t)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.autolink(t)){t=t.substring(l.raw.length),r.push(l);continue}if(!this.state.inLink&&(l=this.tokenizer.url(t))){t=t.substring(l.raw.length),r.push(l);continue}let u=t;if(this.options.extensions?.startInline){let f=1/0,m=t.slice(1),b;this.options.extensions.startInline.forEach(S=>{b=S.call({lexer:this},m),typeof b=="number"&&b>=0&&(f=Math.min(f,b))}),f<1/0&&f>=0&&(u=t.substring(0,f+1))}if(l=this.tokenizer.inlineText(u)){t=t.substring(l.raw.length),l.raw.slice(-1)!=="_"&&(d=l.raw.slice(-1)),a=!0;let f=r.at(-1);f?.type==="text"?(f.raw+=l.raw,f.text+=l.text):r.push(l);continue}if(t){let f="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(f);break}else throw new Error(f)}}return r}},ls=class{constructor(e){Ze(this,"options");Ze(this,"parser");this.options=e||Lr}space(e){return""}code({text:e,lang:t,escaped:r}){let n=(t||"").match($t.notSpaceStart)?.[0],s=e.replace($t.endingNewline,"")+`
`;return n?'<pre><code class="language-'+ar(n)+'">'+(r?s:ar(s,!0))+`</code></pre>
`:"<pre><code>"+(r?s:ar(s,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}def(e){return""}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return`<hr>
`}list(e){let t=e.ordered,r=e.start,n="";for(let a=0;a<e.items.length;a++){let d=e.items[a];n+=this.listitem(d)}let s=t?"ol":"ul",o=t&&r!==1?' start="'+r+'"':"";return"<"+s+o+`>
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${ar(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:r}){let n=this.parser.parseInline(r),s=Ii(e);if(s===null)return n;e=s;let o='<a href="'+e+'"';return t&&(o+=' title="'+ar(t)+'"'),o+=">"+n+"</a>",o}image({href:e,title:t,text:r,tokens:n}){n&&(r=this.parser.parseInline(n,this.parser.textRenderer));let s=Ii(e);if(s===null)return ar(r);e=s;let o=`<img src="${e}" alt="${r}"`;return t&&(o+=` title="${ar(t)}"`),o+=">",o}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:ar(e.text)}},yo=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},jt=class po{constructor(t){Ze(this,"options");Ze(this,"renderer");Ze(this,"textRenderer");this.options=t||Lr,this.options.renderer=this.options.renderer||new ls,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new yo}static parse(t,r){return new po(r).parse(t)}static parseInline(t,r){return new po(r).parseInline(t)}parse(t){let r="";for(let n=0;n<t.length;n++){let s=t[n];if(this.options.extensions?.renderers?.[s.type]){let a=s,d=this.options.extensions.renderers[a.type].call({parser:this},a);if(d!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(a.type)){r+=d||"";continue}}let o=s;switch(o.type){case"space":{r+=this.renderer.space(o);break}case"hr":{r+=this.renderer.hr(o);break}case"heading":{r+=this.renderer.heading(o);break}case"code":{r+=this.renderer.code(o);break}case"table":{r+=this.renderer.table(o);break}case"blockquote":{r+=this.renderer.blockquote(o);break}case"list":{r+=this.renderer.list(o);break}case"checkbox":{r+=this.renderer.checkbox(o);break}case"html":{r+=this.renderer.html(o);break}case"def":{r+=this.renderer.def(o);break}case"paragraph":{r+=this.renderer.paragraph(o);break}case"text":{r+=this.renderer.text(o);break}default:{let a='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return r}parseInline(t,r=this.renderer){let n="";for(let s=0;s<t.length;s++){let o=t[s];if(this.options.extensions?.renderers?.[o.type]){let d=this.options.extensions.renderers[o.type].call({parser:this},o);if(d!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){n+=d||"";continue}}let a=o;switch(a.type){case"escape":{n+=r.text(a);break}case"html":{n+=r.html(a);break}case"link":{n+=r.link(a);break}case"image":{n+=r.image(a);break}case"checkbox":{n+=r.checkbox(a);break}case"strong":{n+=r.strong(a);break}case"em":{n+=r.em(a);break}case"codespan":{n+=r.codespan(a);break}case"br":{n+=r.br(a);break}case"del":{n+=r.del(a);break}case"text":{n+=r.text(a);break}default:{let d='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(d),"";throw new Error(d)}}}return n}},os,_n=(os=class{constructor(e){Ze(this,"options");Ze(this,"block");this.options=e||Lr}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?Ut.lex:Ut.lexInline}provideParser(){return this.block?jt.parse:jt.parseInline}},Ze(os,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),Ze(os,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),os),tp=class{constructor(...e){Ze(this,"defaults",fo());Ze(this,"options",this.setOptions);Ze(this,"parse",this.parseMarkdown(!0));Ze(this,"parseInline",this.parseMarkdown(!1));Ze(this,"Parser",jt);Ze(this,"Renderer",ls);Ze(this,"TextRenderer",yo);Ze(this,"Lexer",Ut);Ze(this,"Tokenizer",is);Ze(this,"Hooks",_n);this.use(...e)}walkTokens(e,t){let r=[];for(let n of e)switch(r=r.concat(t.call(this,n)),n.type){case"table":{let s=n;for(let o of s.header)r=r.concat(this.walkTokens(o.tokens,t));for(let o of s.rows)for(let a of o)r=r.concat(this.walkTokens(a.tokens,t));break}case"list":{let s=n;r=r.concat(this.walkTokens(s.items,t));break}default:{let s=n;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let a=s[o].flat(1/0);r=r.concat(this.walkTokens(a,t))}):s.tokens&&(r=r.concat(this.walkTokens(s.tokens,t)))}}return r}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(r=>{let n={...r};if(n.async=this.defaults.async||n.async||!1,r.extensions&&(r.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=t.renderers[s.name];o?t.renderers[s.name]=function(...a){let d=s.renderer.apply(this,a);return d===!1&&(d=o.apply(this,a)),d}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=t[s.level];o?o.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),n.extensions=t),r.renderer){let s=this.defaults.renderer||new ls(this.defaults);for(let o in r.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let a=o,d=r.renderer[a],l=s[a];s[a]=(...u)=>{let f=d.apply(s,u);return f===!1&&(f=l.apply(s,u)),f||""}}n.renderer=s}if(r.tokenizer){let s=this.defaults.tokenizer||new is(this.defaults);for(let o in r.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let a=o,d=r.tokenizer[a],l=s[a];s[a]=(...u)=>{let f=d.apply(s,u);return f===!1&&(f=l.apply(s,u)),f}}n.tokenizer=s}if(r.hooks){let s=this.defaults.hooks||new _n;for(let o in r.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let a=o,d=r.hooks[a],l=s[a];_n.passThroughHooks.has(o)?s[a]=u=>{if(this.defaults.async&&_n.passThroughHooksRespectAsync.has(o))return(async()=>{let m=await d.call(s,u);return l.call(s,m)})();let f=d.call(s,u);return l.call(s,f)}:s[a]=(...u)=>{if(this.defaults.async)return(async()=>{let m=await d.apply(s,u);return m===!1&&(m=await l.apply(s,u)),m})();let f=d.apply(s,u);return f===!1&&(f=l.apply(s,u)),f}}n.hooks=s}if(r.walkTokens){let s=this.defaults.walkTokens,o=r.walkTokens;n.walkTokens=function(a){let d=[];return d.push(o.call(this,a)),s&&(d=d.concat(s.call(this,a))),d}}this.defaults={...this.defaults,...n}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Ut.lex(e,t??this.defaults)}parser(e,t){return jt.parse(e,t??this.defaults)}parseMarkdown(e){return(t,r)=>{let n={...r},s={...this.defaults,...n},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&n.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=e),s.async)return(async()=>{let a=s.hooks?await s.hooks.preprocess(t):t,d=await(s.hooks?await s.hooks.provideLexer():e?Ut.lex:Ut.lexInline)(a,s),l=s.hooks?await s.hooks.processAllTokens(d):d;s.walkTokens&&await Promise.all(this.walkTokens(l,s.walkTokens));let u=await(s.hooks?await s.hooks.provideParser():e?jt.parse:jt.parseInline)(l,s);return s.hooks?await s.hooks.postprocess(u):u})().catch(o);try{s.hooks&&(t=s.hooks.preprocess(t));let a=(s.hooks?s.hooks.provideLexer():e?Ut.lex:Ut.lexInline)(t,s);s.hooks&&(a=s.hooks.processAllTokens(a)),s.walkTokens&&this.walkTokens(a,s.walkTokens);let d=(s.hooks?s.hooks.provideParser():e?jt.parse:jt.parseInline)(a,s);return s.hooks&&(d=s.hooks.postprocess(d)),d}catch(a){return o(a)}}}onError(e,t){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let n="<p>An error occurred:</p><pre>"+ar(r.message+"",!0)+"</pre>";return t?Promise.resolve(n):n}if(t)return Promise.reject(r);throw r}}},Ir=new tp;function Ge(e,t){return Ir.parse(e,t)}Ge.options=Ge.setOptions=function(e){return Ir.setOptions(e),Ge.defaults=Ir.defaults,Di(Ge.defaults),Ge};Ge.getDefaults=fo;Ge.defaults=Lr;Ge.use=function(...e){return Ir.use(...e),Ge.defaults=Ir.defaults,Di(Ge.defaults),Ge};Ge.walkTokens=function(e,t){return Ir.walkTokens(e,t)};Ge.parseInline=Ir.parseInline;Ge.Parser=jt;Ge.parser=jt.parse;Ge.Renderer=ls;Ge.TextRenderer=yo;Ge.Lexer=Ut;Ge.lexer=Ut.lex;Ge.Tokenizer=is;Ge.Hooks=_n;Ge.parse=Ge;var zm=Ge.options,Hm=Ge.setOptions,Gm=Ge.use,Vm=Ge.walkTokens,Ym=Ge.parseInline;var Km=jt.parse,Zm=Ut.lex;function br(e){let t=Ge.parse(e),r=Ai.sanitize(t);return Ti(r)}function ir(e,t){return i`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function Gr(e){return e.loading?i`<div class="prompt-block__status">불러오는 중…</div>`:e.error?i`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function us(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=n=>String(n).padStart(2,"0");return`${t.getFullYear()}-${r(t.getMonth()+1)}-${r(t.getDate())} ${r(t.getHours())}:${r(t.getMinutes())}`}var rp={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},np=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,sp=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function vr(e){return!!e&&typeof e=="object"}function ko(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function Hi(e,t){let r=ko(e),n=ko(t),s=new Map;for(let d of r)s.set(d,(s.get(d)||0)+1);let o=0;for(let d of n){let l=s.get(d)||0;l>0?s.set(d,l-1):o+=1}let a=0;for(let d of s.values())a+=d;return{added:o,removed:a}}function op(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(s=>vr(s)&&typeof s.text=="string"?s.text:"").join(""):vr(e)&&typeof e.text=="string"&&(t=e.text);let n=(String(t).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return n.length>120?`${n.slice(0,117)}\u2026`:n}function ap(e){let t=String(e.name||""),r=e.input||{},n={kind:"tool",tool:t,icon:rp[t]||"\u{1F527}",input:r,expandable:!0};if((t==="Read"||t==="Write")&&(n.path=String(r.file_path||r.path||"")),t==="Write"&&(n.added=ko(r.content).length),t==="Edit"){n.path=String(r.file_path||r.path||"");let{added:s,removed:o}=Hi(r.old_string,r.new_string);n.added=s,n.removed=o}if(t==="MultiEdit"){n.path=String(r.file_path||r.path||"");let s=0,o=0,a=Array.isArray(r.edits)?r.edits:[];for(let d of a){let l=Hi(vr(d)?d.old_string:"",vr(d)?d.new_string:"");s+=l.added,o+=l.removed}n.added=s,n.removed=o}return t==="Bash"&&(n.command=String(r.command||"")),(t==="Grep"||t==="Glob")&&(n.command=String(r.pattern||r.query||"")),n}function Gi(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}function Vi(e){let t=e.split(/\r?\n/).find(n=>n.trim().length>0)||"",r=np.exec(t);return r?{kind:"gate",gate:r[2]==="implementation"?"impl":r[2],reviewer:r[3],verdict:r[4],time:r[5]?r[5].trim():void 0,text:t.trim()}:sp.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function ip(e,t){if(e.type==="assistant"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[],s=[];for(let o of n)if(vr(o)){if(o.type==="text"&&typeof o.text=="string")s.push(Vi(o.text));else if(o.type==="thinking"){let a=Gi(o.thinking);a&&s.push(a)}else if(o.type==="tool_use"){let a=ap(o);typeof o.id=="string"&&t.set(o.id,a),s.push(a)}}return s}if(e.type==="user"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[];for(let s of n)if(vr(s)&&s.type==="tool_result"){let o=t.get(String(s.tool_use_id));if(o){let a=op(s.content);o.result=a,o.output=typeof s.content=="string"?s.content:a}}return[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success";return[{kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""}]}return[]}function lp(e){if(e.type==="item.completed"&&vr(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[Vi(t.text)];if(t.type==="reasoning"){let r=Gi(t.text);return r?[r]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function cp(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function Yi(e){let t=[],r=new Map,n=Array.isArray(e)?e:[];for(let s of n){let o=s;if(typeof s=="string"){let d=s.trim();if(d.length===0)continue;try{o=JSON.parse(d)}catch{continue}}if(!vr(o))continue;let a=cp(o)?lp(o):ip(o,r);for(let d of a)t.push(d)}return t}var dp=5,up=10,pp=/Task\s+#(\d+)/,fp=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,_p=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function ps(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function mp(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function gp(e){for(let t=e.length-1;t>=0;t-=1){let r=e[t];if(r.kind==="phase"||r.kind==="gate")return r.text||null}return null}function hp(e){let t=new Map,r=0;for(let s of e){if(s.kind!=="tool")continue;r+=1;let o=s.input||{};if(s.tool==="TaskCreate"){let l=pp.exec(s.output||s.result||""),u=String(o.activeForm||o.subject||"").trim();if(!l||u.length===0)continue;t.set(l[1],{label:u,active:o.status==="in_progress"?r:0});continue}if(s.tool!=="TaskUpdate")continue;let a=t.get(String(o.taskId??""));if(!a)continue;let d=o.activeForm||o.subject;typeof d=="string"&&d.trim().length>0&&(a.label=d.trim()),typeof o.status=="string"&&(a.active=o.status==="in_progress"?r:0)}let n=null;for(let s of t.values())s.active>0&&(!n||s.active>n.active)&&(n=s);return n?n.label:null}function bp(e){if(e.tool==="Bash"){let t=e.command||"";return fp.test(t)?"~ PR/\uAC8C\uC2DC \uC911":_p.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function vp(e){let t=e.filter(s=>s.kind==="tool").slice(-up),r=new Map;t.forEach((s,o)=>{let a=bp(s);if(!a)return;let d=r.get(a)||{count:0,last:-1};d.count+=1,d.last=o,r.set(a,d)});let n=null;for(let[s,o]of r)(!n||o.count>n.count||o.count===n.count&&o.last>n.last)&&(n={label:s,count:o.count,last:o.last});return n?n.label:null}function wp(e){let t=gp(e);if(t)return{text:t,guess:!1};let r=hp(e);if(r)return{text:r,guess:!1};let n=vp(e);return n?{text:n,guess:!0}:null}function yp(e,t){if(typeof e!="number")return"";let r=Math.max(0,Math.floor((t-e)/1e3));return r<60?`${r}\uCD08 \uC804`:Tt(e,t)}function fs(e,t={}){let{transport:r,sessionLogStore:n,onClose:s}=t,o=null,a={},d=!0,l=new Set,u=new Set,f=null,m=null,b=!1,S=!1,y=!1,I=null,N=null;function $(){b=!1,S=!1,y=!1,I=null,N=null}async function k(C){if(r){S=!0,y=!1,Re();try{let B=await Promise.resolve(r("get-attempt-prompt",{attempt_id:C}));if(o!==C)return;!B||typeof B!="object"||Array.isArray(B)?y=!0:(I=B,N=C)}catch{o===C&&(y=!0)}finally{o===C&&(S=!1,Re())}}}function L(){if(b=!b,b&&o&&N!==o){k(o);return}Re()}function E(){if(!b)return"";let C=Gr({loading:S,error:y});if(C)return i`<div class="sv__prompt" data-seam="attempt-prompt">
        ${C}
      </div>`;if(!I)return"";if(I.missing)return i`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let B=us(I.recorded_at);return i`<div class="sv__prompt" data-seam="attempt-prompt">
      ${B?i`<div class="prompt-block__meta">${B} 발송</div>`:""}
      ${typeof I.task_prompt=="string"?ir("\uACFC\uC5C5 (user)",I.task_prompt):""}
      ${typeof I.system_prompt=="string"?ir("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",I.system_prompt):""}
    </div>`}function x(){if(!o||!n)return[];let C=n.get(o);return Yi(C?C.lines:[])}function F(){if(!o||!n)return null;let C=n.get(o),B=C?C.last_event_at:null;return typeof B=="number"?B:null}function V(){return a.status==="running"}function Q(){if(V()&&o){m||(m=setInterval(()=>Re(),1e3));return}ce()}function ce(){m&&(clearInterval(m),m=null)}function de(C){let B=[],pe=0;for(;pe<C.length;){let Oe=C[pe];if(Oe.kind==="tool"){let M=pe;for(;M<C.length&&C[M].kind==="tool"&&C[M].tool===Oe.tool;)M+=1;if(M-pe>=dp&&!u.has(pe)){B.push({kind:"group",idx:pe,tool:Oe.tool||"",lines:C.slice(pe,M).map((j,R)=>({idx:pe+R,line:j}))}),pe=M;continue}}B.push({kind:"line",idx:pe,line:Oe}),pe+=1}return B}function ie(C){for(let B=C.length-1;B>=0;B-=1){let pe=C[B];if(pe.kind==="result"||pe.kind==="error")return null;if(pe.kind==="tool"&&!Object.hasOwn(pe,"result"))return pe}return null}function ue(C){for(let B=C.length-1;B>=0;B-=1)if(C[B].kind==="thinking")return C[B];return null}function Ce(C,B){if(B.kind==="gate")return i`<div class="sv__gate">${B.text}</div>`;if(B.kind==="phase")return i`<div class="sv__phase">${B.text}</div>`;if(B.kind==="result")return i`<div
        class="sv__result${B.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${B.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${br(B.text||(B.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(B.kind==="thinking"){let pe=l.has(C);return i`<div
        class="sv__think${pe?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>xe(C)}
      >
        <span class="sv__think-line">💭 ${ps(B.text)}</span>
        ${pe?i`<pre class="sv__think-expand">${B.text}</pre>`:""}
      </div>`}if(B.kind==="error")return i`<div class="sv__error">⛔ ${B.text}</div>`;if(B.kind==="blocker")return i`<div class="sv__error">⛔ ${B.text}</div>`;if(B.kind==="tool"){let pe=l.has(C),Oe=B.tool==="Bash"?mp(B.command):0,M=B.tool==="Bash"?Oe>1?ps(B.command):B.command:B.path||B.command||"";return i`<div
        class="sv__tool${pe?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>xe(C)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${B.icon}</span>
          <span class="sv__tool-name">${B.tool}</span>
          ${M?i`<span class="sv__tool-detail">${M}</span>`:""}
          ${Oe>1?i`<span class="sv__tool-more">⋯ ${Oe}줄</span>`:""}
          ${typeof B.added=="number"?i`<span class="sv__diff-add">+${B.added}</span>`:""}
          ${typeof B.removed=="number"?i`<span class="sv__diff-del">−${B.removed}</span>`:""}
          ${B.result?i`<span class="sv__tool-ok">→ ${B.result}</span>`:""}
        </span>
        ${pe?i`<pre class="sv__tool-expand">${Le(B)}</pre>`:""}
      </div>`}return i`<div class="sv__as">${br(B.text||"")}</div>`}function Le(C){let B=[];if(C.tool==="Bash"&&typeof C.command=="string"&&C.command.length>0)B.push(C.command);else if(C.input!==void 0)try{B.push(`input: ${JSON.stringify(C.input,null,2)}`)}catch{}return typeof C.output=="string"&&C.output.length>0&&B.push(`output:
${C.output}`),B.join(`

`)}function Je(){if(!o)return i``;let C=x(),B=[a.runner,a.model,a.effort].filter(Boolean).join(" \xB7 "),pe=a.session_id||"",Oe=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${d?"ON":"OFF"}`,M=V(),j=M?yp(F(),Date.now()):"",R=M?ie(C):null,X=M?ue(C):null,Z=wp(C);return i`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id">${o}</span>
        ${Z?i`<span
              class="sv__stage${Z.guess?" sv__stage--guess":""}"
              title=${Z.text}
              >${Z.text}</span
            >`:""}
        ${M?i`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${j?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${j}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${j?i`<span class="sv__live-ago">${j}</span>`:""}</span
            >`:""}
        ${pe?i`<button
              type="button"
              class="sv__session"
              title=${pe}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${pe}`}
              @click=${()=>z(pe)}
            >
              ⧉ ${pe.slice(0,8)}
            </button>`:""}
        ${B?i`<span class="sv__meta">${B}</span>`:""}
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
          @click=${L}
        >
          ✉ 프롬프트
        </button>
        <button
          type="button"
          class="sv__follow${d?" sv__follow--on":""}"
          aria-pressed=${d?"true":"false"}
          aria-label=${Oe}
          @click=${fe}
        >
          <span class="sv__follow-full">⇣ ${Oe}</span>
          <span class="sv__follow-short">⇣ ${d?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>re()}
        >
          ✕
        </button>
      </div>
      ${E()}
      <div class="sv__body">
        ${C.length===0?i`<div class="sv__empty">세션 로그 없음</div>`:de(C).map(oe=>oe.kind==="group"?Fe(oe):Ce(oe.idx,oe.line))}
      </div>
      ${R||X?i`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${R?i`<span class="sv__now-icon">${R.icon}</span>
                  <span class="sv__now-name">${R.tool}</span>
                  <span class="sv__now-detail"
                    >${R.tool==="Bash"?ps(R.command):R.path||R.command||""}</span
                  >`:""}
            ${X?i`<span class="sv__now-think"
                  >💭 ${ps(X.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function Fe(C){return i`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>Xe(C.idx)}
    >
      <span class="sv__group-icon">${C.lines[0].line.icon}</span>
      <span class="sv__group-name">${C.tool}</span>
      <span class="sv__group-count">${C.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function Xe(C){u.add(C),Re()}function Re(){Be(Je(),e),Q(),d&&be()}function be(){let C=e.querySelector(".sv__body");C&&(C.scrollTop=C.scrollHeight)}function xe(C){l.has(C)?l.delete(C):l.add(C),Re()}function fe(){d=!d,Re()}function z(C){Rr(C).then(B=>{B?ee("\uBCF5\uC0AC\uB428","success",1200):ee("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function q(C){!o||!C||(a={...a,...C},Re())}function Te(C){let B=C.target;if(!B||!B.classList||!B.classList.contains("sv__body"))return;!(B.scrollHeight-B.scrollTop-B.clientHeight<=4)&&d&&(d=!1,Re())}e.addEventListener("scroll",Te,!0);function te(C){let B=C&&C.attempt_id;B&&(o=B,a=C.meta||{},d=!0,l.clear(),u.clear(),$(),!f&&n&&(f=n.subscribe(Re)),r&&Promise.resolve(r("subscribe-session-log",{id:`session-log:${o}`,attempt_id:o})).catch(()=>{}),Re())}function re(){let C=o;o=null,l.clear(),u.clear(),$(),ce(),r&&C&&Promise.resolve(r("unsubscribe-session-log",{id:`session-log:${C}`})).catch(()=>{}),Be(i``,e),s&&s()}return{open:te,updateMeta:q,close:re,isOpen(){return o!==null},destroy(){ce(),f&&(f(),f=null),e.removeEventListener("scroll",Te,!0),o=null,Be(i``,e)}}}function hn(e){let t=e&&typeof e=="object"?e:{},r=t.metadata&&typeof t.metadata=="object"?t.metadata:{},n=Ki(t.spec_id),s=Ki(r.spec_id);return n?{path:n,source:"native",conflict:s.length>0&&s!==n}:s?{path:s,source:"metadata",conflict:!1}:{path:"",source:"none",conflict:!1}}function Ki(e){return typeof e=="string"?e.trim():""}function kp(e){return["plan_review","plan_approval","plan_check"].some(t=>{let r=e[t];return typeof r=="string"&&r.trim().length>0})}function $p(e){let t=e&&e.metadata||{},r=hn(e),n=[];return r.path&&n.push({kind:"spec",path:r.path,missing_state:null}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&n.push({kind:"plan",path:t.plan_path.trim(),missing_state:kp(t)?null:"plan_pending"}),n}function Zi(e,t){let r=$p(e);return i`
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
  `}var xp="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",Sp=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,Ap=/^\*\*결론\*\* — (.+)$/;function _s(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==xp)return null;let r=Sp.exec(t[1]||"");if(!r)return null;let n=r[1].split(" ")[0],s=r[2],o=r[3],a=2;for(;a<t.length&&t[a].trim().length===0;)a+=1;let d=a<t.length?Ap.exec(t[a]):null,l=d?d[1].replace(/\s+/g," ").trim():"",u=d?a+1:a;return{lane:n,identifier:s,timestamp:o,conclusion:l,body:t.slice(u).join(`
`).trim()}}var Xi=20;function Qi(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let r=String(t.getMonth()+1).padStart(2,"0"),n=String(t.getDate()).padStart(2,"0"),s=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0");return`${r}-${n} ${s}:${o}`}function Tp(e){return e.length>Xi?`${e.slice(0,Xi)}\u2026`:e}function Ep(e,t,r,n){let s=`${t.lane} ${Tp(t.identifier)}`;return i`<div class="detail-report">
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
        <span class="detail-report__time">${Qi(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${n&&t.body.length>0?i`<div class="detail-report__body">
          ${br(t.body)}
        </div>`:""}
  </div>`}function Cp(e){return i`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${Qi(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${br(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function Ji(e,t={},r={}){let n=Array.isArray(e)?e.filter(Boolean):[],s=r.expanded||new Set,o=typeof r.draft=="string"?r.draft:"",a=r.sending===!0,d=n.slice().sort((l,u)=>String(u.created_at||"").localeCompare(String(l.created_at||"")));return i`
    <div class="detail-section-label">댓글 (${n.length})</div>
    ${r.error?i`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:d.length===0?i`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:i`<div class="detail-comments" data-seam="comments">
            ${d.map(l=>{let u=_s(typeof l.text=="string"?l.text:"");return u?Ep(l,u,t,s.has(l.id)):Cp(l)})}
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
  `}var{I:Cg}=Ta;var el=e=>e.strings===void 0;var Rp={},tl=(e,t=Rp)=>e._$AH=t;var Or=ns(class extends Hr{constructor(e){if(super(e),e.type!==or.PROPERTY&&e.type!==or.ATTRIBUTE&&e.type!==or.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!el(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===It||t===it)return t;let r=e.element,n=e.name;if(e.type===or.PROPERTY){if(t===r[n])return It}else if(e.type===or.BOOLEAN_ATTRIBUTE){if(!!t===r.hasAttribute(n))return It}else if(e.type===or.ATTRIBUTE&&r.getAttribute(n)===t+"")return It;return tl(e),t}});var $o=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"],ms=["orchestration_model","orchestration_effort","orchestration_speed"],rl=["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"],gs=["delegated","main"],hs=["inherit","claude","codex"],bn=["default","fast"],bs=["standard","fast_track"],vn=["codex","opus","fable","self","skip"],vs=["codex","fable","skip"],ws=["low","medium","high","xhigh"],Pt="auto";function lr(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function nl(e){if(!lr(e)||!lr(e.runners))return[];let t=[];for(let[r,n]of Object.entries(e.runners))lr(n)&&lr(n.models)&&t.push([r,Object.keys(n.models)]);return t}function sl(e){return e?.impl_dispatch==="main"}function ys(e,t){let r=nl(e),n=t&&t!=="inherit"?r.filter(([s])=>s===t):r;return[Pt,...n.flatMap(([,s])=>s)]}function Vr(e,t,r){if(!lr(e)||!lr(e.runners))return[Pt];let n=[];for(let[s,o]of Object.entries(e.runners))if(!(!lr(o)||!lr(o.models))&&!(t&&t!=="inherit"&&s!==t))for(let[a,d]of Object.entries(o.models)){if(r&&r!==Pt&&a!==r)continue;let l=lr(d)?d.efforts:null;if(Array.isArray(l))for(let u of l)typeof u=="string"&&!n.includes(u)&&n.push(u)}return[Pt,...n]}function ks(e,t){let r=nl(e);return(t?r.filter(([s])=>s===t):r).flatMap(([,s])=>s)}function ol(e,t){let r={};for(let n of $o){let s=e?.[n],o=t?.[n];s!==o&&(r[n]=typeof o=="string"&&o.length>0?o:null)}return r}function al(e,t){let r={};for(let n of ms){let s=e?.[n]??null,o=t?.[n]??null;s!==o&&(r[n]=typeof o=="string"&&o.length>0?o:null)}return r}var xo=[{id:"workflow",label:"\uC6CC\uD06C\uD50C\uB85C\uC6B0",keys:["workflow_mode"]},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort"]},{id:"implementation",label:"\uAD6C\uD604",keys:["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]},{id:"worker",label:"Worker",keys:[...ms]}],So={workflow_mode:"\uBAA8\uB4DC",spec_review_model:"\uC0AC\uC591 \uB9AC\uBDF0",spec_review_effort:"\uC0AC\uC591 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_dispatch:"\uC2E4\uD589 \uBC29\uC2DD",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uBAA8\uB378",impl_effort:"effort",impl_speed:"\uC18D\uB3C4",orchestration_model:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",orchestration_effort:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",orchestration_speed:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4"},ll={pin:"\uD540",global:"\uC804\uC5ED",base:"\uAE30\uBCF8"};function il(e){return typeof e=="string"&&e.length>0?e:null}function Ip(e,t,r){let n=il(t?.[e]);if(n!==null)return{value:n,source:"pin"};let s=il(r?.[e]);return s!==null?{value:s,source:"global"}:{value:null,source:"base"}}function $s(e,t,r){return e.map(n=>({key:n,...Ip(n,t,r)}))}function cl(e,t,r){let n={pin:0,global:0,base:0};for(let s of $s(e,t,r))n[s.source]+=1;return n}function dl(e,t,r){return{id:e,key:t,value:typeof r=="string"?r:""}}function ul(e,t,r){return typeof t!="string"||t.length===0?null:{id:e,preset_id:t,expected_revision:r}}var Fg=[...$o,...ms];var Lp=[{id:"spec",label:"spec \uB9AC\uBDF0",receipt:"spec_review"},{id:"impl",label:"\uAD6C\uD604",receipt:null},{id:"impl_review",label:"impl \uB9AC\uBDF0",receipt:"impl_review"},{id:"pr",label:"PR",receipt:null}],Op={pin:"pin",global:"global",base:"base"};function Dp(e){return i`<span
    class=${`detail-layer-rail detail-layer-rail--${Op[e]}`}
    data-source=${e}
    aria-hidden="true"
    ><i></i><i></i><i></i
  ></span>`}function Pp(e,t,r){switch(e){case"workflow_mode":return bs;case"spec_review_model":case"impl_review_model":return vn;case"plan_review_model":return vs;case"spec_review_effort":case"plan_review_effort":case"impl_review_effort":return ws;case"impl_dispatch":return gs;case"impl_runtime":return hs;case"impl_model":return ys(r,t.impl_runtime);case"impl_effort":return Vr(r,t.impl_runtime,t.impl_model);case"impl_speed":case"orchestration_speed":return bn;case"orchestration_model":return ks(r,null);case"orchestration_effort":return Vr(r,void 0,t.orchestration_model||Pt).filter(n=>n!==Pt);default:return[]}}function Mp(e,t){return i`<div class="detail-effective__row" data-key=${e.key}>
    ${Dp(e.source)}
    <span class="detail-effective__k"
      >${So[e.key]||e.key}</span
    >
    <span
      class=${`detail-effective__v${e.source==="base"?" detail-effective__v--dim":""}`}
      >${e.value??"(harness \uAE30\uBCF8)"}</span
    >
    <span
      class=${`detail-effective__badge detail-effective__badge--${e.source}`}
      >${ll[e.source]}</span
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
                ${r===Pt?"\uC790\uB3D9":r}
              </option>`)}
        </select>`:""}
  </div>`}function pl(e,t){let r=xo.flatMap(o=>o.keys),n=cl(r,e.metadata,e.workspace_values),s={};for(let o of $s(r,e.metadata,e.workspace_values))o.value!==null&&(s[o.key]=o.value);return i`<section
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
      <span class="detail-effective__summary">${Np(s)}</span>
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
          ${$s(o.keys,e.metadata,e.workspace_values).map(a=>Mp(a,{expanded:e.expanded,options:Pp(a.key,s,e.catalog),onEdit:t.onEdit}))}
        `)}
      <div class="detail-effective__foot">
        <select
          data-impl-preset-select
          aria-label="구현 프리셋"
          .value=${Or(e.preset_id)}
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
  </section>`}function Np(e){let t=[];if(typeof e.workflow_mode=="string"&&t.push(String(e.workflow_mode)),e.impl_dispatch==="main")t.push("\uBA54\uC778");else if(e.impl_dispatch==="delegated"){let r=typeof e.impl_runtime=="string"?` ${e.impl_runtime}`:"";t.push(`\uC704\uC784${r}`)}else typeof e.impl_runtime=="string"&&t.push(`\uC704\uC784 ${e.impl_runtime}`);return typeof e.impl_model=="string"&&t.push(String(e.impl_model)),t.length>0?t.join(" \xB7 "):"\uAE30\uBCF8"}function fl(e){let t=e&&typeof e.metadata=="object"&&e.metadata?e.metadata:{},r=e&&typeof e.workflow=="object"&&e.workflow?e.workflow:{},n=r.stages||{},s=r.route||t.route||null,o=typeof t.pr_url=="string"?t.pr_url:"",a=typeof t.exec_receipt=="string"?t.exec_receipt:"";return i`<section class="detail-summary" data-seam="detail-summary">
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
      ${Lp.map(d=>{let l=d.receipt&&typeof t[d.receipt]=="string"?String(t[d.receipt]):"",u=n[d.id],f=l.length>0||u?.fill==="full",m=!f&&u?.fill==="dim",b=u?.stale===!0;return i`<span
          class=${`detail-summary__gate${f?" detail-summary__gate--on":""}${m?" detail-summary__gate--current":""}${b?" detail-summary__gate--stale":""}`}
          data-gate=${d.id}
        >
          <span class="detail-summary__gate-pill">${d.label}</span>
          ${l?i`<span class="detail-summary__gate-sha"
                >${l.split("@")[1]?.slice(0,7)||""}</span
              >`:""}
        </span>`})}
    </div>
  </section>`}var _l=["orchestration_model","orchestration_effort","orchestration_speed","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_runtime","impl_model","impl_effort"];function wn(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function xs(e){if(!wn(e)||!wn(e.runners))return null;let t=Object.entries(e.runners).filter(([,r])=>wn(r)&&wn(r.models));return t.length>0?t:null}function Ao(e,t){let r=xs(e);if(!r||!t)return null;for(let[n,s]of r)if(Object.hasOwn(s.models,t))return n;return null}function ml(e,t){return wn(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function gl(e,t){let r=xs(e);if(!r||!t)return[];for(let[,n]of r)if(Object.hasOwn(n.models,t))return ml(n,n.models[t]);return[]}function Fp(e){let t=xs(e);if(!t)return[];let r=[];for(let[,n]of t)for(let s of Object.values(n.models))for(let o of ml(n,s))r.includes(o)||r.push(o);return r}function qp(e,t){if(!t)return Fp(e);let n=xs(e)?.find(([o])=>o===t)?.[1];if(!n)return[];let s=[];for(let o of Object.keys(n.models))for(let a of gl(e,o))s.includes(a)||s.push(a);return s}function hl(e,t,r){let n={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},s=n.impl_runtime==="inherit"?r:n.impl_runtime==="claude"||n.impl_runtime==="codex"?n.impl_runtime:null;if(n.impl_runtime==="inherit"&&!s)return n.impl_model="",n.impl_effort="",n;let o=Ao(t,n.impl_model);if(n.impl_model&&(!s||o!==s))return n.impl_model="",n.impl_effort="",n;let a=n.impl_model?gl(t,n.impl_model):qp(t,s);return n.impl_effort&&a.length>0&&!a.includes(n.impl_effort)&&(n.impl_effort=""),n}function Bp(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function bl(e,t){let r=t.getWorkspacePath,n=t.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",a="",d="";function l(y){y.key==="Escape"&&s&&(y.preventDefault(),b())}document.addEventListener("keydown",l);function u(){return s?i`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>b()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${Bp(s)}</span
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
            ${o==="loading"?i`<div class="mv__status">불러오는 중…</div>`:o==="pending"?i`<div class="mv__status">${d}</div>`:o==="error"?i`<div class="mv__status mv__status--error">
                      ${d||"\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}
                    </div>`:br(a)}
          </div>
        </div>
      </div>
    `:i``}function f(){Be(u(),e)}async function m(y,I={}){s=y,o="loading",a="",d="",f();let N=r?r():"";if(!N){o="error",d="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",f();return}if(!n){o="error",d="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",f();return}let $="/api/doc?workspace="+encodeURIComponent(N)+"&path="+encodeURIComponent(y);try{let k=await n($),L=await k.json().catch(()=>({}));if(!k.ok||!L||L.ok!==!0){if(L?.error==="not_found"&&I.missing_state==="plan_pending"){o="pending",d="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",f();return}o="error",d="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(L&&L.error||k.status)+")",f();return}a=String(L.content||""),o="ready",f()}catch{o="error",d="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",f()}}function b(){s=null,Be(i``,e)}function S(){document.removeEventListener("keydown",l),b()}return{open:m,close:b,destroy:S}}var Up=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],yl="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function jp(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function Wp(e){let t=ht(e);if(t.length>0)return t.map(s=>i`<span class="detail-usage-total" title=${s.tooltip}
          >${s.label}</span
        >`);let r=Wr(e);if(!r||!e)return"";let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return i`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${r.replace(/^τ /,"\u03C4 \uCD1D ")}${n}</span
    >${e.replayed?i`<span class="detail-usage-partial" title=${yl}
          >부분 집계</span
        >`:""}`}function vl(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function wl(e){if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?kl(t):""}function zp(e){return e?["implementation","review-consult"].flatMap(r=>{let n=e.roles[r]?.codex;return n?n.legs.map(s=>{let a=ht({providers:{codex:{subtotal:s.subtotal,breakdown:s.usage,...s.replayed?{replayed:!0}:{}}},roles:{}})[0];return i`<div class="detail-session__leg detail-session__usage-detail">
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
        ${wl(s.completed_at)?i`<span class="detail-session__leg-time detail-session__time"
              >${wl(s.completed_at)}</span
            >`:""}
        ${a?i`<span class="detail-session__usage" title=${a.tooltip}
              >${a.label}</span
            >`:""}
      </div>`}):[]}):""}function Hp(e,t){let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,n=[...Up,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return i`<div class="detail-session__usage-detail">
    ${n.map(s=>i`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${s.label}</span
          ><span class="detail-session__usage-value"
            >${jp(e[s.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${r===null?"":i`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${r.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?i`<span class="detail-session__usage-note">${yl}</span>`:""}
  </div>`}var Gp={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function kl(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=String(t.getHours()).padStart(2,"0"),n=String(t.getMinutes()).padStart(2,"0");return`${r}:${n}`}function Vp(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,n])=>typeof n=="string"&&n.length>0).map(([n,s])=>`${n}=${s}`).join(" \xB7 "):"",r=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return i`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${r}</span>
    ${t?i`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}function $l(e,t={},r={}){let n=Array.isArray(e)?e:[],s=r.expanded||new Set;if(n.length===0)return i`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let o=new Set;for(let u of n)u&&typeof u.resumed_from=="string"&&u.resumed_from.length>0&&o.add(u.resumed_from);let a=u=>{if(!(u.status==="failed"||u.status==="orphaned"))return"";let m=typeof u.session_id=="string"&&u.session_id.length>0,b=o.has(u.attempt_id),S=m&&!b,y=m?b?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return i`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${u.attempt_id}
      ?disabled=${!S}
      title=${y}
      @click=${I=>{I.stopPropagation(),S&&t.onResume&&t.onResume(u.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},d=u=>{if(!(u.status==="failed"||u.status==="orphaned")||typeof u.cause!="string"||u.cause==="")return"";let m=u.cause_detail,b=m&&typeof m.reason=="string"&&m.reason.length>0?typeof m.command=="string"&&m.command.length>0?`${m.reason} \xB7 ${m.command}`:m.reason:u.cause;return i`<div class="detail-session__cause" title=${b}>
      ${u.cause}
    </div>`},l=u=>{let f=vl(Js(u));if(ht(f).length===0&&!Wr(u.usage))return"";let m=s.has(u.attempt_id);return i`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${u.attempt_id}
      aria-expanded=${m?"true":"false"}
      title=${m?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${b=>{b.stopPropagation(),t.onToggleUsage&&t.onToggleUsage(u.attempt_id)}}
    >
      τ 자세히
    </button>`};return i`
    <div class="detail-section-label">
      세션 이력${Wp(r.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${n.map(u=>{let f=Js(u),m=vl(f),b=ht(m);return i`<div class="detail-session-row">
          <button
            type="button"
            class="detail-session detail-session--${u.status||"unknown"}"
            data-attempt-id=${u.attempt_id}
            @click=${()=>t.onOpen&&t.onOpen(u.attempt_id)}
          >
            <span class="detail-session__glyph"
              >${Gp[u.status||""]||"\xB7"}</span
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
            ${b.length>0?b.map(S=>i`<span
                      class="detail-session__usage"
                      title=${S.tooltip}
                      >${S.label}</span
                    >`):Wr(u.usage)?i`<span class="detail-session__usage"
                    >${Wr(u.usage)}</span
                  >`:""}
            <span class="detail-session__time">${kl(u.started_at)}</span>
          </button>
          ${l(u)} ${a(u)} ${d(u)} ${Vp(u)}
          ${s.has(u.attempt_id)&&u.usage?Hp(u.usage,u.runner==="codex"?"codex":"claude"):""}
          ${zp(f)}
        </div>`})}
    </div>
  `}function xl(e,t={}){return i`
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
          ${Yp(e)}
        </div>`:""}
  `}function Yp(e){let t=Gr(e);if(t)return t;let r=e.data;if(!r)return"";if(r.missing)return i`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof r.default_task_prompt=="string"?ir("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",r.default_task_prompt):""}`;let n=us(r.recorded_at);return i`<div class="detail-prompt__meta">
      ${r.attempt_id}${n?` \xB7 ${n}`:""}
    </div>
    ${typeof r.task_prompt=="string"?ir("\uACFC\uC5C5 (user)",r.task_prompt):""}
    ${typeof r.system_prompt=="string"?ir("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",r.system_prompt):""}`}var Kp=["open","in_progress","deferred","resolved","closed"],Zp=[0,1,2,3,4];function Sl(e,t){let r=t.issueStores,n=t.onClose,s=t.transport,o=t.onNavigate,a=t.queueStore,d=t.execPresetStore,l=t.sessionLogStore,u=null,f=null,m={},b="",S=!1,y=!1,I={},N=!1,$=!1,k="",L="",E="";function x(){N=!1,$=!1,k="",L="",E=""}let F=[],V=null,Q=null,ce=!1,de="",ie=!1,ue=0,Ce=new Set;function Le(){F=[],V=null,Q=null,ce=!1,de="",ie=!1,ue+=1,Ce.clear()}async function Je(c){if(!s)return;let _=++ue;try{let w=await Promise.resolve(s("get-comments",{id:c}));if(_!==ue||c!==u)return;F=Array.isArray(w)?w:[],ce=!1}catch{if(_!==ue||c!==u)return;ce=!0}_e()}function Fe(){if(!s||!u)return;let c=f&&typeof f.comment_count=="number"?f.comment_count:null;if(V!==u){V=u,Q=c,Je(u);return}c!==null&&c!==Q&&(Q=c,Je(u))}function Xe(c){Ce.has(c)?Ce.delete(c):Ce.add(c),_e()}function Re(c){let _=de.trim().length===0;de=c,_!==(c.trim().length===0)&&_e()}async function be(){let c=de.trim();if(!s||!u||c.length===0||ie)return;let _=u;ie=!0,_e();let w=!1;try{let T=await Promise.resolve(s("add-comment",{id:_,text:c}));Array.isArray(T)&&T.length>0&&(w=!0,_===u&&(F=T,ce=!1,de="",Q=T.length))}catch{w=!1}w||ee("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),_===u&&(ie=!1),_e()}let xe={onToggle:Xe,onDraftInput:Re,onSubmit:be},fe=document.createElement("div");fe.className="md-viewer-root",document.body.appendChild(fe);let z=bl(fe,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),q=document.createElement("div");q.className="session-log-root",document.body.appendChild(q);let Te=fs(q,{transport:s?(c,_)=>Promise.resolve(s(c,_)):void 0,sessionLogStore:l}),te=!1,re=!1,C=!1,B=null,pe=null,Oe=0;function M(c){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${c}`}function j(){te=!1,re=!1,C=!1,B=null,pe=null,Oe+=1}async function R(c){if(!s)return;let _=++Oe;re=!0,C=!1,_e();try{let w=await Promise.resolve(s("get-bead-prompt",{bead_id:c}));if(_!==Oe)return;!w||typeof w!="object"||Array.isArray(w)?C=!0:(B=w,pe=M(c))}catch{_===Oe&&(C=!0)}finally{_===Oe&&(re=!1,_e())}}function X(){if(te=!te,te&&u&&pe!==M(u)){B=null,R(u);return}_e()}function Z(){if(!a||!u)return[];let c=a.get();return(c&&c.attempts?Object.values(c.attempts):[]).filter(w=>w&&w.bead_id===u).sort((w,T)=>(T.started_at||0)-(w.started_at||0)).map(w=>({attempt_id:w.attempt_id,bead_id:w.bead_id,status:w.status,started_at:typeof w.started_at=="number"?w.started_at:null,runner:w.runner||null,model:w.model||null,effort:w.effort||null,speed:w.speed||null,session_id:w.session_id||null,resumed_from:w.resumed_from||null,continuation_mode:w.continuation_mode||null,dismissed_at:typeof w.dismissed_at=="number"?w.dismissed_at:null,cause:typeof w.cause=="string"?w.cause:null,cause_detail:w.cause_detail||null,exec_default_preset_id:typeof w.exec_default_preset_id=="string"?w.exec_default_preset_id:null,exec_default_preset_revision:typeof w.exec_default_preset_revision=="number"?w.exec_default_preset_revision:null,exec_values:w.exec_values&&typeof w.exec_values=="object"?w.exec_values:null,usage:w.usage||null,usage_legs:Array.isArray(w.usage_legs)?w.usage_legs:[]}))}function oe(){if(!a||!u)return null;let c=a.get();return Ot(c&&c.attempts||{},u)}let ne=new Set;function ke(c){ne.has(c)?ne.delete(c):ne.add(c),_e()}function Ve(c){let _=a?a.get():null,w=_&&_.attempts?_.attempts[c]:null;Te.open({attempt_id:c,meta:w?{runner:w.runner||void 0,model:w.model||void 0,effort:w.effort||void 0,status:w.status||void 0,session_id:w.session_id||void 0}:{}})}async function Qe(c){if(!s||!c)return;let _=()=>{let ve=a?a.get():null;return ve&&typeof ve.revision=="number"?ve.revision:0},w=async(ve={})=>await s("worker-attempt-resume",{attempt_id:c,expected_revision:_(),...ve}),T=ve=>{ve?.queue&&a?.set&&a.set(ve.queue)},J=await w();if(T(J),J&&J.conflict){let ve=J.queue&&typeof J.queue.revision=="number"?J.queue.revision:_();J=await s("worker-attempt-resume",{attempt_id:c,expected_revision:ve}),T(J)}J=await rr(J,(ve,Pe)=>w({continuation:ve,decision_token:Pe}),{onResult:T,refresh:()=>w()}),J&&J.resumed===!1&&!J.conflict&&J.reason&&ee(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${J.reason}`,"error",2400)}let st={onOpen:Ve,onResume:Qe,onToggleUsage:ke};function rt(){let c=a?a.get():null,_={...I};for(let w of["orchestration_model","orchestration_effort","orchestration_speed"]){let T=c&&c[w];typeof T=="string"&&(_[w]=T)}return _}async function A(){if(s){try{let c=await Promise.resolve(s("get-session-defaults",{}));I=c&&c.values&&typeof c.values=="object"?c.values:{}}catch{I={}}_e()}}function H(){let c=a?a.get():null;return c&&c.runner_catalog||null}function le(){let c=f?.metadata&&typeof f.metadata=="object"?f.metadata:{},w=(Object.hasOwn(m,"orchestration_model")?m.orchestration_model:void 0)||(typeof c.orchestration_model=="string"?c.orchestration_model:"")||(typeof rt().orchestration_model=="string"?rt().orchestration_model:"")||"opus";return Ao(H(),w)}function Ee(){let c=d?d.get():null;return!c||typeof c.revision!="number"?null:{revision:c.revision,presets:Array.isArray(c.presets)?c.presets:[]}}function $e(c){return c?.compatible===!1}function De(c){d&&c&&typeof c.revision=="number"&&Array.isArray(c.presets)&&d.set({revision:c.revision,presets:c.presets})}async function ot(){let c=Ee(),_=c?.presets.find(w=>w.id===b);if(!(!s||!u||!c||!_||$e(_)||S)){S=!0,_e();try{let w=await Promise.resolve(s("apply-impl-preset",ul(u,_.id,c.revision)));if(w&&w.conflict){De(w),ee("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let T=w&&Array.isArray(w.issue)?w.issue[0]:w?.issue;if(w&&w.applied&&T&&typeof T=="object"){f=T;for(let J of _l)delete m[J];ee("\uAD6C\uD604 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",2400);return}w&&w.error==="bd_readback_failed"?ee("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):ee("\uAD6C\uD604 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(w){w&&typeof w=="object"&&w.code==="bd_readback_failed"?ee("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):ee("\uAD6C\uD604 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{S=!1,_e()}}}let et=null;r&&r.subscribe&&(et=r.subscribe(()=>_t()));let ut=null;a&&typeof a.subscribe=="function"&&(ut=a.subscribe(()=>{u&&_e()}));let St=null;d&&typeof d.subscribe=="function"&&(St=d.subscribe(()=>{u&&_e()}));function lt(c){c.key==="Escape"&&u&&(c.preventDefault(),n())}document.addEventListener("keydown",lt);function _t(){if(u){if(r&&typeof r.snapshotFor=="function"){let c=r.snapshotFor("detail:"+u)||[];f=c.find(w=>w&&w.id===u)||c[0]||f}Fe(),_e()}}function Ye(c){Rr(c).then(_=>{_?ee("\uBCF5\uC0AC\uB428","success",1200):ee("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function at(c){c.preventDefault(),c.stopPropagation(),u&&Ye(u)}function ct(c,_){c.preventDefault(),c.stopPropagation(),Ye(_)}function U(c,_,w){c.preventDefault(),c.stopPropagation(),z.open(_,{missing_state:w})}function Y(c,_){m[c]=_,_e(),!(!s||!u)&&Promise.resolve(s("update-exec-settings",dl(u,c,_.length===0?null:_))).catch(()=>{ee("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}function ge(c,_){let w=f||{},T=w.metadata&&typeof w.metadata=="object"?w.metadata:{},J={};for(let Me of["impl_runtime","impl_model","impl_effort"])J[Me]=Object.hasOwn(m,Me)?m[Me]:typeof T[Me]=="string"?T[Me]:"";J[c]=_;let ve=hl(J,H(),le()),Pe={};for(let Me of["impl_runtime","impl_model","impl_effort"])Pe[Me]=m[Me],m[Me]=ve[Me]||"";_e(),!(!s||!u)&&Promise.resolve(s("update-impl-target",{id:u,...ve,orchestration_runtime:le()})).then(Me=>{let me=Array.isArray(Me)?Me[0]:Me;if(!me||typeof me!="object"||!me.id)throw new Error("implementation target readback failed");f=me;for(let tt of["impl_runtime","impl_model","impl_effort"])delete m[tt];_e()}).catch(()=>{for(let Me of["impl_runtime","impl_model","impl_effort"])Pe[Me]===void 0?delete m[Me]:m[Me]=Pe[Me];_e(),ee("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error")})}async function K(c,_,w){if(!s||!u)return!1;try{let T=await Promise.resolve(s(c,_)),J=Array.isArray(T)?T[0]:T;return J&&typeof J=="object"&&J.id?(f=J,!0):(ee(w,"error"),!1)}catch{return ee(w,"error"),!1}}function we(c){setTimeout(()=>{try{let _=e.querySelector(c);_&&typeof _.focus=="function"&&_.focus()}catch{}},0)}function Ie(){N=!0,k=f&&f.title||"",_e(),we('.detail-edit__input[data-edit="title"]')}function qe(c){k=c.target.value}function Ke(){N=!1,k="",_e()}function Ae(){K("edit-text",{id:u,field:"title",value:k},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(_=>{_&&(N=!1,k=""),_e()})}function Ue(){$=!0,L=f&&f.description||"",_e(),we('.detail-edit__textarea[data-edit="description"]')}function ye(c){L=c.target.value}function mt(){$=!1,L="",_e()}function bt(){K("edit-text",{id:u,field:"description",value:L},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(_=>{_&&($=!1,L=""),_e()})}function Et(c,_,w,T){if(c.key==="Escape"){c.stopPropagation(),w();return}c.key==="Enter"&&(!T||c.ctrlKey||c.metaKey)&&(c.preventDefault(),_())}function dr(c){let _=c.target.value;K("update-status",{id:u,status:_},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>_e())}function ur(c){let _=Number(c.target.value);K("update-priority",{id:u,priority:_},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>_e())}function dt(c){E=c.target.value}function vt(){let c=E.trim();c.length!==0&&K("label-add",{id:u,label:c},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(_=>{_&&(E=""),_e()})}function Qt(c){if(c.key==="Escape"){c.stopPropagation(),E="",_e();return}c.key==="Enter"&&(c.preventDefault(),vt())}function Ht(c){K("label-remove",{id:u,label:c},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>_e())}let Ct={onCopyPath:ct,onOpenDoc:U};function Gt(c){return typeof c=="string"?c:c&&typeof c=="object"?String(c.id||c.to||c.issue_id||c.depends_on||""):""}function gt(c){switch(c&&typeof c=="object"?String(c.dependency_type||c.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function p(c){let w=(Array.isArray(c.dependencies)?c.dependencies:[]).map(T=>({id:Gt(T),icon:gt(T)})).filter(T=>T.id.length>0);return i`
      <div class="detail-section-label">의존성</div>
      ${w.length===0?i`<div class="detail-empty">의존성 없음</div>`:i`<div class="detail-deps">
            ${w.map(T=>o?i`<button
                    type="button"
                    class="detail-dep detail-dep--link"
                    @click=${()=>o(T.id)}
                  >
                    ${T.icon?`${T.icon} `:""}${T.id}
                  </button>`:i`<span class="detail-dep"
                    >${T.icon?`${T.icon} `:""}${T.id}</span
                  >`)}
          </div>`}
    `}function v(c){let _=c.metadata||{},w=c.workflow||{},T=w.stages||{},J=T.spec&&T.spec.stale,ve=T.impl&&T.impl.stale,Pe=T.plan||null,Me=w.route_source==="derived",me=w.route||_.route||"\u2014";return i`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${Me?" detail-kv__v--derived":""}"
          title=${Me?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${Me?"unset":me}</span
        >
      </div>
      ${w.route!=="quick_fix"||Object.hasOwn(_,"spec_review")?i`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${_.spec_review||"\uC5C6\uC74C"}${J?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${w.route==="full_plan"?i`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${Pe?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${Pe?.approval_receipt||"\uC5C6\uC74C"}${Pe?.approval_state==="stale"?" \xB7 stale":Pe?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${w.route!=="quick_fix"||Object.hasOwn(_,"impl_review")?i`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${_.impl_review||"\uC5C6\uC74C"}${ve?" \xB7 stale":""}</span
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
      ${_.pr_url?i`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${_.pr_url}</span>
          </div>`:""}
    `}let D={route:["quick_fix","spec_backed","full_plan"]};async function ae(c,_){let w=_.target.value;if(c==="route"&&f&&f.metadata&&f.metadata.route==="full_plan"&&w!=="full_plan"&&!window.confirm(`full_plan \u2192 ${w||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){_e();return}await K("update-workflow-meta",{id:u,key:c,value:w},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),_e()}function he(c){let _=c.metadata||{};return i` ${((T,J)=>{let ve=D[T],Pe=typeof _[T]=="string"?_[T]:"";return i`<div class="detail-kv">
        <span class="detail-kv__k">${T}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${T}
          data-edit=${`wfmeta-${T}`}
          @change=${Me=>ae(T,Me)}
        >
          <option value="" ?selected=${!ve.includes(Pe)}>
            ${J}
          </option>
          ${ve.map(Me=>i`<option value=${Me} ?selected=${Pe===Me}>${Me}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function W(c,_){return N?i`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${k}
            @input=${qe}
            @keydown=${w=>Et(w,Ae,Ke,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${Ae}
            >
              저장
            </button>
            <button
              type="button"
              class="detail-edit__cancel"
              data-edit="title-cancel"
              @click=${Ke}
            >
              취소
            </button>
          </div>
        </div>
      `:i`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${c}</h2>
        ${ht(_).map(w=>i`<span class="detail-usage-total" title=${w.tooltip}
              >${w.label}</span
            >`)}
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${Ie}
        >
          ✎
        </button>
      </div>
    `}function g(c){let _=pt(c.created_at),w=pt(c.updated_at);return!_&&!w?i``:i`
      ${_?i`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${_}</span>
          </div>`:""}
      ${w?i`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${w}</span>
          </div>`:""}
    `}function P(c,_){return i`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${dr}
        >
          ${Kp.map(w=>i`<option value=${w} ?selected=${w===c}>${w}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${ur}
        >
          ${Zp.map(w=>i`<option value=${String(w)} ?selected=${w===_}>
                P${w}
              </option>`)}
        </select>
      </div>
    `}function G(c){return i`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${$?"":i`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${Ue}
            >
              ✎
            </button>`}
      </div>
      ${$?i`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${L}
              @input=${ye}
              @keydown=${_=>Et(_,bt,mt,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${bt}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${mt}
              >
                취소
              </button>
            </div>
          </div>`:i`<div class="detail-overlay__desc">
            ${c||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function Se(c){let _=typeof c.notes=="string"?c.notes:"";return _.trim().length===0?i``:i`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${_}</div>
    `}function He(c){let _=Array.isArray(c.labels)?c.labels:[];return i`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${_.map(w=>i`<span class="detail-label-chip"
              >${w}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${w}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+w}
                @click=${()=>Ht(w)}
              >
                ×
              </button></span
            >`)}
        <span class="detail-label-add">
          <input
            class="detail-label-add__input"
            aria-label="라벨 추가"
            placeholder="라벨 추가"
            .value=${E}
            @input=${dt}
            @keydown=${Qt}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${vt}
          >
            추가
          </button>
        </span>
      </div>
    `}function je(){if(!u)return i``;let c=f||{},_=String(c.id||u),w=c.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",T=oe(),J=c.status||"open",ve=typeof c.priority=="number"?Math.max(0,Math.min(4,c.priority)):"",Pe=c.description||"",Me={...c,metadata:{...c.metadata||{},...m}};return i`
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
            ${_}
          </button>
          ${W(w,T)}
          ${fl(Me)}
          ${pl({metadata:Me.metadata,workspace_values:rt(),catalog:H(),expanded:y,presets:Ee()?.presets||[],preset_id:b,preset_busy:S},{onToggle:()=>{y=!y,_e()},onEdit:(me,tt)=>{if(me==="impl_runtime"||me==="impl_model"||me==="impl_effort"){ge(me,tt??"");return}Y(me,tt??"")},onPresetSelect:me=>{b=me,_e()},onPresetApply:()=>{ot()}})}
          ${P(J,ve)} ${g(c)}
          ${G(Pe)}
          ${Ji(F,xe,{expanded:Ce,draft:de,sending:ie,error:ce})}
          ${Se(c)} ${He(c)} ${p(c)}
          ${v(c)} ${he(c)}
          ${Zi(c,Ct)}
          ${xl({expanded:te,loading:re,error:C,data:B},{onToggle:X})}
          ${$l(Z(),st,{total:T,expanded:ne})}
        </div>
      </div>
    `}function _e(){Be(je(),e)}return{load(c){c!==u&&(m={},b="",y=!1,x(),Le(),j()),u=c,f=null,_t(),A()},clear(){u=null,f=null,m={},b="",S=!1,x(),Le(),j(),z.close(),Te.close(),Be(i``,e)},destroy(){et&&(et(),et=null),ut&&(ut(),ut=null),St&&(St(),St=null),document.removeEventListener("keydown",lt),z.destroy(),fe.parentNode&&fe.parentNode.removeChild(fe),Te.destroy(),q.parentNode&&q.parentNode.removeChild(q),u=null,f=null,b="",S=!1,Le(),j(),Be(i``,e)}}}function Al(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let r=t.querySelector("#fatal-error-title"),n=t.querySelector("#fatal-error-message"),s=t.querySelector("#fatal-error-detail"),o=t.querySelector("#fatal-error-reload"),a=t.querySelector("#fatal-error-close"),d=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},l=(u,f,m="")=>{r&&(r.textContent=u||"Unexpected Error"),n&&(n.textContent=f||"An unrecoverable error occurred.");let b=typeof m=="string"?m.trim():"";if(s&&(b.length>0?(s.textContent=b,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),a&&a.addEventListener("click",()=>d()),t.addEventListener("cancel",u=>{u.preventDefault(),d()}),{open:l,close:d,getElement(){return t}}}function Ss(e){return typeof e=="string"&&e.length>=7?e.slice(0,7):"\u2014"}function To(e){if(typeof e!="number"||!Number.isFinite(e)||e<0)return"\u2014";if(e<1e3)return`${Math.round(e)}ms`;let t=e/1e3;if(t<60)return`${t.toFixed(1)}\uCD08`;let r=Math.floor(t/60);return`${r}\uBD84 ${Math.round(t-r*60)}\uCD08`}function As(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";let t=new Date(e);return`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`}function Xp(e,t){let r=Array.isArray(e)?e:[],n=Array.isArray(t)?t:[];if(r.length===0&&n.length===0)return null;let s=null;for(let d of r)d.kind!=="deploy"||d.state!=="succeeded"||typeof d.target_sha!="string"||(!s||(typeof d.finished_at=="number"?d.finished_at:0)>(typeof s.finished_at=="number"?s.finished_at:0))&&(s=d);let o=r.filter(d=>d.state==="failed"&&!d.dismissed&&!d.superseded_by).length+n.length,a=r.some(d=>d.state==="repairing");return{deploy:s?{sha:Ss(s.target_sha),at:typeof s.finished_at=="number"?s.finished_at:null,elapsed_ms:typeof s.elapsed_ms=="number"?s.elapsed_ms:null}:null,unresolved:o,repairing:a,badge:o>0?{tone:"act",label:`\uD574\uACB0 \uD544\uC694 ${o}`}:a?{tone:"live",label:"\uC790\uB3D9 \uD574\uACB0 \uC911"}:{tone:"quiet",label:"\uBAA8\uB450 \uC815\uC0C1"}}}function Tl(e,t){let r=Xp(e,t);return r?i`<button
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
            title=${r.deploy.at?pt(r.deploy.at):""}
            >${As(r.deploy.at)}${r.deploy.elapsed_ms!==null?` \xB7 ${To(r.deploy.elapsed_ms)}`:""}</span
          >
        </span>`:""}
    <span class="worker-repo-strip__spacer"></span>
    <span
      class="worker-repo-strip__badge worker-repo-strip__badge--${r.badge.tone}"
      >${r.badge.label}</span
    >
  </button>`:""}function Yr(e){let t=Tt(e.created_at),r=Tt(e.updated_at);return!t&&!r?"":i`<div class="worker-mini__meta">
    ${t?i`<span title=${`\uC0DD\uC131 ${pt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&r?i`<span>·</span>`:""}${r?i`<span title=${`\uC218\uC815 ${pt(e.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </div>`}function Qp(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function yn(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function Ts(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function Zt(e,t,r={}){let s=Object.values(e&&typeof e=="object"?e:{}).filter(f=>f&&f.bead_id===t&&f.phase!=="done").sort((f,m)=>(f.requested_at||0)-(m.requested_at||0)).at(-1),o=typeof r.attempt_id=="string"&&r.attempt_id.length>0?r.attempt_id:typeof s?.attempt_id=="string"?s.attempt_id:null,a=r.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":r.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":r.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,d=typeof s?.last_error=="string"?s.last_error:null,l=s?Qp(s.phase):null,u=r.merged||s?.mode==="merged_revert"?"merged":"unmerged";return{action:!r.external&&!r.done,enabled:!a&&(!s||!!d),label:d?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:a||(d?`\uD3D0\uAE30 \uC2E4\uD328: ${d} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:s?`${l||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:u==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:o,operation:s||null,progress:l,error:d,confirmation:u}}function cr(e){let t=e.discard;if(!t||!t.operation)return"";let r=t.operation,n=r.backup?.path,s=r.original_pr,o=r.revert_pr;return i`<div
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
  </div>`}function Eo(e){let t=e.draggable&&!e.done,r=Array.isArray(e.badges)?e.badges:[],n=ht(e.usage),s=qt(e.usage),o=e.merge_step||null,a=e.lane==="pr_wait"||!!e.revise_action,d=e.lane==="done"&&!a,l=d?Tt(e.done_at):"",u=e.selectable?i`<input
        class="worker-mini__select"
        type="checkbox"
        data-bead-id=${e.id}
        aria-label=${`${e.id} \uC120\uD0DD`}
        .checked=${e.selected===!0}
      />`:"",f=t?i`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",m=e.worker_serial===!0?i`<span class="worker-mini__serial">머지까지 단독</span>`:e.worker_serial===null?i`<span class="worker-mini__serial worker-mini__serial--unknown"
            >실행 방식 확인 중</span
          >`:"",b=e.workspace_name?i`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",S=i`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,y=i`<span class="worker-mini__title">${e.title}</span>`,I=e.pr_url&&e.pr_number?i`<a
          class="worker-mini__pr"
          href=${e.pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="PR 열기"
          >#${e.pr_number} ↗</a
        >`:"",N=e.completion_repair_pr_url&&e.completion_repair_pr_number?i`<a
          class="worker-mini__pr worker-mini__repair-pr"
          href=${e.completion_repair_pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="repair PR 열기"
          >repair #${e.completion_repair_pr_number} ↗</a
        >`:"",$=r.map(ue=>ue===e.live_badge?i`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${ue}</span
        >`:i`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${ue===e.completion_badge&&e.completion_title||""}
          >${ue}</span
        >`),k=e.reason?i`<span class="worker-mini__reason">${e.reason}</span>`:"",L=n.length>0?n.map(ue=>i`<span class="worker-usage" title=${ue.tooltip}
              >${ue.label}</span
            >`):s?i`<span class="worker-usage" title=${zr(e.usage)}
            >${s}</span
          >`:"",E=o?i`<span class="merge-step"
        >${o.label}<span class="merge-step__n"
          >${o.index}/${o.total}</span
        ></span
      >`:"",x=e.merge_action?i`<button
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
      </button>`:"",V=e.timeline_action?i`<button
        type="button"
        class="worker-mini__timeline"
        data-bead-id=${e.id}
        title="저장소 작업이 끝나지 않아 머지 액션이 잠겼습니다 — 타임라인에서 원인과 해결 버튼을 볼 수 있습니다"
      >
        저장소 작업 보기
      </button>`:"",Q=e.discard,ce=Q?.action||e.discard_action?i`<button
          type="button"
          class="worker-mini__discard"
          data-bead-id=${e.id}
          data-attempt-id=${Q?.attempt_id||""}
          data-operation-id=${Q?.operation?.operation_id||""}
          data-discard-mode=${Q?.confirmation||"unmerged"}
          ?disabled=${Q?!Q.enabled:e.discard_enabled===!1}
          title=${Q?Q.title:e.discard_enabled===!1?e.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
        >
          ${Q?.label||"\uD3D0\uAE30"}
        </button>`:"",de=e.revise_action?i`<button
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
        </button>`:"",ie=!!(s||o||e.merge_action||e.cancel_action||e.timeline_action||e.discard_action||Q?.operation||e.revise_action);return i`<div
    class="worker-mini${a?" worker-mini--card":""}${e.selected?" worker-mini--selected":""}${t?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${o?" worker-mini--merging":""}${e.external?" worker-mini--external":""}"
    style=${o?`--progress: ${o.percent}%`:""}
    draggable=${t?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${d?i`<div class="worker-mini__row1">${b}${S}${y}</div>
          <div class="worker-mini__row2">
            ${L}${l?i`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${pt(e.done_at)}`}
                  >완료 ${l}</span
                >`:""}${$}${E}
            <span class="worker-mini__actions"
              >${x}${F}${V}${ce}</span
            >
            ${Yr(e)}
          </div>`:a?i`<div class="worker-mini__head">
              ${u}${f}${b}${S}${I}${N}${$}${m}${k}
            </div>
            <div class="worker-mini__body">${y}</div>
            ${ie?i`<div class="worker-mini__foot">
                  ${L}${E}
                  <span class="worker-mini__actions"
                    >${x}${F}${V}${ce}${de}</span
                  >
                  ${cr(e)}
                </div>`:""}
            ${Yr(e)}`:i`<div class="worker-mini__line">
              ${u}${f}${b}${S}${y}${I}${N}${$}${m}${k}${L}${E}${x}${F}${V}${ce}
            </div>
            ${cr(e)} ${Yr(e)}`}
  </div>`}function Jp(e){let t=e.draggable&&!e.done,r=e.workflow,n=r&&r.chips||{},s=n.route||r&&r.route,o=n.route_source==="derived"||!!(r&&r.route_source==="derived"),a=e.is_quick_fix===!0||!!r&&r.route==="quick_fix",d=typeof e.reason=="string"&&e.reason.startsWith("\u26D4");return i`<div
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
                  </div>`:e.items.map(n=>e.lane==="candidate"?Jp(n):Eo(n))}
          </div>`}
  </section>`}var El=[{step:"merging",label:"\uBA38\uC9C0 \uC911",index:1},{step:"base_containment",label:"base \uD3EC\uD568 \uD655\uC778",index:2},{step:"repo_operations",label:"\uC800\uC7A5\uC18C \uC791\uC5C5",index:3},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC",index:4},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC",index:5},{step:"parent_close",label:"\uBD80\uBAA8 close",index:6}],kn=El.filter(e=>e.step!=="merging").map(e=>({step:e.step,label:e.label}));function Co(e){if(typeof e!="string"||e.length===0)return null;let t=6,r=El.find(n=>n.step===e);return r?{label:r.label,index:r.index,total:t,percent:Math.round(r.index/t*100)}:{label:e,index:0,total:t,percent:0}}function Cl(e){let t=kn.findIndex(r=>r.step===e);return kn.map((r,n)=>({step:r.step,label:r.label,state:t<0?"todo":n<t?"done":n===t?"stall":"todo"}))}function Dr(e){let t=kn.find(r=>r.step===e);return t?t.label:typeof e=="string"?e:""}function ef(e){let t=kn.findIndex(r=>r.step===e);return t<0?null:{index:t+1,total:kn.length}}function Es(e){let t=ef(e);return t?`\uBA38\uC9C0 \uC644\uB8CC \xB7 \uC815\uB9AC ${t.total}\uB2E8\uACC4 \uC911 ${t.index}\uB2E8\uACC4\uC5D0\uC11C \uBA48\uCDA4`:"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644"}var Rl={verify_failed:"\uAC80\uC99D \uC2E4\uD328",verify_cmd_failed:"\uAC80\uC99D \uC2E4\uD328",verify_script_failure:"\uAC80\uC99D \uC2E4\uD328",deploy_failed:"\uBC30\uD3EC \uC2E4\uD328",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328",interrupted_without_terminal_exit:"\uC911\uB2E8\uB428"},Il={repo_ops_worktree_unowned:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uAC00 \uC544\uC9C1 Worker \uC18C\uC720\uAC00 \uC544\uB2C8\uC5B4\uC11C \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804\uC5D0 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",verify_cmd_failed:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D \uBA85\uB839\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",gh_observation_failed:"GitHub\uC5D0\uC11C PR \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_script_failure:"\uAC80\uC99D \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",deploy_script_failure:"\uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",interrupted_without_terminal_exit:"\uC791\uC5C5\uC774 \uC885\uB8CC \uAE30\uB85D \uC5C6\uC774 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4."};function Ll(e){return typeof e!="string"||e.length===0?[]:e.split(":").filter(t=>t.length>0)}function Ro(e){for(let t of Ll(e))if(Object.hasOwn(Rl,t))return Rl[t];return null}function Io(e){let t=null;for(let r of Ll(e))Object.hasOwn(Il,r)&&(t=Il[r]);return t}function Cs(e){let t=Ro(e),r=Io(e);return t&&r?`${t} \u2014 ${r}`:t||r?t||r:typeof e=="string"?e:""}function Ol(e,t){let r=Ro(e)??Ro(t),n=Io(t)??Io(e);return r&&n?`${r} \u2014 ${n}`:r||n?r||n:typeof t=="string"?t:""}var Dl=160;function tf(e){return e.length>Dl?`${e.slice(0,Dl)}\u2026`:e}function rf(e){return!e||!e.reason?"":i`<div class="worker-banner__detail">
    가드:
    ${e.reason}${e.command?i` · <code>${tf(e.command)}</code>`:""}
  </div>`}function nf(e){return e?i`<details class="worker-banner__raw">
    <summary>세부</summary>
    <dl class="worker-banner__kv">
      <div>
        <dt>실패 코드</dt>
        <dd>${e}</dd>
      </div>
    </dl>
  </details>`:""}function Lo(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),r=Math.floor(t/60),n=t%60;return r>0?`${r}m ${String(n).padStart(2,"0")}s`:`${n}s`}function Pl(e){let t=e.failure?Cs(e.failure.reason):"";return i`<div class="worker-banners">
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
          ${rf(e.failure.cause_detail)}
          ${nf(e.failure.reason)}
          ${cr({discard:e.failure.discard})}
        </div>`:""}
  </div>`}function sf(e,t,r=null){let n=e.failed===!0,s=!!e.paused,o=n?e.status_label||(e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):s?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?Lo(t-e.started_at):"\u2014",a=Kt(e),d=gr(e),l=ht(e.usage),u=qt(e.usage),f=e.conflict_resolution?s?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,m=e.base_exception||null,b=e.attempt_id&&e.attempt_id===r,S=e.discard?.action?i`<button
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
      ${d?i`<span class="rtile__resumed" title=${d}>↻</span>`:""}
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
            ${S}`}
    </div>
    <div class="rtile__title">${e.title}</div>
    ${e.current_child?i`<div class="rtile__child" title="현재 진행중 child">
          └ ${e.current_child}
        </div>`:""}
    ${a||l.length>0||u||f||m?i`<div class="rtile__meta">
          ${f?i`<span class="worker-mini__badge">${f}</span>`:""}
          ${m?i`<span
                class="worker-mini__badge"
                title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
                >${m}</span
              >`:""}
          ${a?i`<span class="rtile__runner">${a}</span>`:""}
          ${l.length>0?l.map(y=>i`<span class="worker-usage" title=${y.tooltip}
                    >${y.label}</span
                  >`):u?i`<span
                  class="worker-usage"
                  title=${zr(e.usage)}
                  >${u}</span
                >`:""}
        </div>`:""}
    ${Yr(e)} ${cr(e)}
    <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일): 큐
         스냅샷에는 페이즈명도 진행률도 없으므로 진행 바는 만들지 않는다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
    ${n||s?"":i`<div class="rtile__accent" aria-hidden="true"></div>`}
  </div>`}function Oo(e,t=Date.now(),r=null){let n=Array.isArray(e)?e:[];return i`<div class="worker-rungrid" id="worker-rungrid">
    ${n.length===0?i`<div class="worker-rungrid__empty">실행 세션 없음</div>`:n.map(s=>sf(s,t,r))}
  </div>`}function Pr(e){return i`<svg
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
  </svg>`}function Do(){return Pr(fr`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function Po(){return Pr(fr`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function Ml(){return Pr(fr`<rect x="4.3" y="4.3" width="7.4" height="7.4" rx="1.2" />`)}function Nl(){return Pr(fr`<path d="M4.4 4.4 11.6 11.6M11.6 4.4 4.4 11.6" />`)}function Fl(){return Pr(fr`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function ql(){return Pr(fr`<rect x="2.6" y="2.6" width="7.4" height="7.4" rx="1.2" />
    <path d="M6 13.4h6a1.4 1.4 0 0 0 1.4-1.4V6" />`)}function Bl(){return Pr(fr`<path d="M3 3.6 8.2 8 3 12.4z" />
    <path d="M8.8 3.6 14 8l-5.2 4.4z" />`)}var $n=1,of=6e4,af={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328"},lf=new Set(["auto_merge","merged","merge","done"]),Ul={running:3,paused:2,failed:1};function cf(e,t){let r=null,n=-1/0;for(let s of Object.values(e)){if(!s||s.bead_id!==t||s.status==="running")continue;let o=typeof s.finished_at=="number"?s.finished_at:typeof s.started_at=="number"?s.started_at:0;o>=n&&(n=o,r=s)}return r}function df(e,t){let r=Object.values(e||{}),n=new Set,s=new Map;for(let a of r)!a||typeof a.bead_id!="string"||(typeof a.resumed_from=="string"&&a.resumed_from.length>0&&n.add(a.resumed_from),s.set(a.bead_id,a.attempt_id));let o=new Map;for(let a of r){if(!a||typeof a.bead_id!="string"||a.bead_id.length===0)continue;let d=null;if(a.status==="running")d="running";else if(a.status==="paused"&&!n.has(a.attempt_id))d="paused";else if(a.status==="failed"||a.status==="orphaned"){let m=t.get(a.bead_id),b=typeof m=="number"&&m>0&&typeof a.finished_at=="number"&&m>=a.finished_at;s.get(a.bead_id)===a.attempt_id&&!b&&typeof a.dismissed_at!="number"&&(d="failed")}if(!d)continue;let l=typeof a.started_at=="number"?a.started_at:null,u=o.get(a.bead_id);if(u){let m=Ul[u.run_state],b=Ul[d];if(m>b||m===b&&(u.started_at??0)>(l??0))continue}let f=typeof a.session_id=="string"&&a.session_id.length>0;o.set(a.bead_id,{attempt_id:typeof a.attempt_id=="string"?a.attempt_id:"",run_state:d,started_at:l,last_event_at:typeof a.last_event_at=="number"?a.last_event_at:null,runner:typeof a.runner=="string"?a.runner:null,model:typeof a.model=="string"?a.model:null,effort:typeof a.effort=="string"?a.effort:null,speed:typeof a.speed=="string"?a.speed:null,resumed_from:typeof a.resumed_from=="string"?a.resumed_from:null,continuation_mode:a.continuation_mode==="session"||a.continuation_mode==="fresh"?a.continuation_mode:null,usage:Ot(e,a.bead_id),can_pause:d==="running"&&f,can_resume:d!=="running"&&f&&!n.has(a.attempt_id)})}return o}function jl(e,t){let r=e[t];if(!r)return"";if(r.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let n=typeof r.reason=="string"?r.reason:"",s=n.indexOf(":");return s>0&&s<n.length-1?`\u26D4 ${n.slice(0,s)} (${n.slice(s+1)})`:`\u26D4 ${n}`}function Mt(e){return e&&typeof e=="object"?e:{}}function Mo(e,t,r){let n=Array.isArray(e)?e:[],s=Array.isArray(t)?t:[],o=r&&typeof r.done_since=="number"?r.done_since:void 0,a=new Map;for(let $ of s)$&&typeof $.root_dir=="string"&&a.set($.root_dir,$);let d=[],l=[],u=[],f=[],m=[],b=new Map;for(let $ of n){if(!$||typeof $.root_dir!="string")continue;let k=$.root_dir,L=$.name||k,E=a.get(k),x=E&&typeof E.revision=="number"?E.revision:typeof $.revision=="number"?$.revision:0,F=Mt($.attempts),V=Mt($.bead_titles),Q=Mt($.pr_observations),ce=Mt($.admission),de=Mt($.revise_parked),ie=Mt($.merge_queue_state),ue=Mt($.cleanup_failed),Ce=Mt($.discard_operations),Le=Array.isArray($.merge_queue)?$.merge_queue:[],Je=new Set(Le.filter(z=>z&&typeof z.bead_id=="string").map(z=>z.bead_id)),Fe=new Map(Le.filter(z=>z&&typeof z.bead_id=="string").map(z=>[z.bead_id,z])),Xe=Array.isArray($.queue)?$.queue:[],Re=Array.isArray($.done)?$.done:[],be=new Map;for(let z of Re)z&&typeof z.bead_id=="string"&&typeof z.added_at=="number"&&be.set(z.bead_id,z.added_at);let xe=z=>({id:z,title:V[z]||z,root_dir:k,workspace_name:L,expected_revision:x,draggable:!1}),fe=new Set;for(let[z,q]of df(F,be))fe.add(z),l.push({...xe(z),lane:"running",attempt_id:q.attempt_id,run_state:q.run_state,can_pause:q.can_pause,can_resume:q.can_resume,started_at:q.started_at,last_event_at:q.last_event_at,runner:q.runner,model:q.model,effort:q.effort,speed:q.speed,resumed_from:q.resumed_from,continuation_mode:q.continuation_mode,usage:q.usage,discard:Zt(Ce,z,{attempt_id:q.attempt_id}),badges:q.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:q.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:[],alert:q.run_state==="failed"});for(let z of Array.isArray($.pr_wait)?$.pr_wait:[]){let q=z&&z.bead_id;if(typeof q!="string"||fe.has(q))continue;fe.add(q);let Te=Mt(Q[q]),te=Mt(Te.pr),re=Te.gate?Mt(Te.gate):null,C=Je.has(q),B=Fe.get(q)?.continuation_action||null,pe=!!B&&B.continuation===null,Oe=ie.active===q,M=z.external===!0,j=ue[q]||null,R=!!re&&re.base_badge==="\uCDA9\uB3CC",X=!!j&&["child_sweep","branch_cleanup","parent_close"].includes(j.step)&&!!re&&re.tier==="merged",Z=M&&!!j&&!!re&&re.tier==="merged",oe=!!re&&["closed_unmerged","review","undecidable"].includes(re.tier),ne=Zt(Ce,q,{external:M,merge_active:Oe,merge_queued:C,merged:!!j||re?.tier==="merged"}),ke=!!ne.operation;u.push({...xe(q),lane:"pr_wait",pr_number:typeof te.number=="number"?te.number:null,pr_url:typeof te.url=="string"?te.url:void 0,external:M,usage:Ot(F,q),badges:pe?["\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"]:j?[Dr(j.step)?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${Dr(j.step)}`:"\uC815\uB9AC \uBA48\uCDA4"]:typeof re?.gate_badge=="string"&&re.gate_badge.length>0?[re.gate_badge]:[],alert:!!j||oe,reason:j?Es(j.step):"PR \uB300\uAE30",merge_action:!C||pe,merge_enabled:!ke&&(pe||re?.enabled===!0||R||X||Z),merge_label:pe?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":Z||X?"\uC815\uB9AC \uC7AC\uAC1C":R&&!X?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:pe?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":ke?ne.error?`\uD3D0\uAE30 \uC2E4\uD328: ${ne.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${ne.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:Z?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":X?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":R?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":re?.enabled===!0?`\uBA38\uC9C0 (${re.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${re?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:C&&!pe,cancel_enabled:!Oe,continuation_mismatch:B?.mismatch||null,discard:ne,discard_action:ne.action,discard_enabled:ne.enabled,discard_title:ne.title})}for(let z=0;z<Xe.length;z++){let q=Xe[z],Te=q&&q.bead_id;if(typeof Te!="string"||fe.has(Te))continue;fe.add(Te);let te=de[Te],re=Zt(Ce,Te),C=re.operation?re:null,B={...xe(Te),lane:"queue",draggable:!C,discard:C||void 0,reason:jl(ce,Te),queue_position:z+1,queue_index:z,queue_length:Xe.length,badges:te?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!te,revise_action:!!te,revise_enabled:!!te&&!C,revise_title:te?te.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${te.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""};f.push(B);let pe=b.get(k);pe?pe.push(B):b.set(k,[B])}for(let z of Array.isArray($.runnable)?$.runnable:[]){let q=z&&z.bead_id;typeof q!="string"||fe.has(q)||(fe.add(q),d.push({...xe(q),title:z.title||V[q]||q,lane:"runnable",draggable:!0,reason:jl(ce,q),created_at:z.created_at??void 0,updated_at:z.updated_at??void 0,labels:Array.isArray(z.labels)?z.labels:[],spec_reviewer:typeof z.spec_reviewer=="string"?z.spec_reviewer:void 0,plan_state:z.plan_state==="approved"||z.plan_state==="authored"?z.plan_state:"none",workflow:z.route?{route:z.route,chips:{route:z.route}}:null,place_index:Xe.length}))}for(let z of Re){let q=z&&z.bead_id;if(typeof q!="string"||fe.has(q)||(fe.add(q),o!==void 0&&typeof z.added_at=="number"&&z.added_at<o))continue;let Te=cf(F,q);m.push({...xe(q),lane:"done",done:!0,usage:Ot(F,q),done_at:typeof z.added_at=="number"?z.added_at:void 0,done_kind:Te&&typeof Te.done_kind=="string"?Te.done_kind:null})}}let S=new Map;s.forEach(($,k)=>{$&&typeof $.root_dir=="string"&&S.set($.root_dir,k)});let y=r&&r.running_sort==="repo"?"repo":"started";l.sort(($,k)=>{if(y==="repo"){let x=S.get($.root_dir)??Number.MAX_SAFE_INTEGER,F=S.get(k.root_dir)??Number.MAX_SAFE_INTEGER;if(x!==F)return x-F}let L=typeof $.started_at=="number"&&Number.isFinite($.started_at)?$.started_at:null,E=typeof k.started_at=="number"&&Number.isFinite(k.started_at)?k.started_at:null;return L!==null&&E!==null&&L!==E?L-E:L===null&&E!==null?1:L!==null&&E===null?-1:$.id.localeCompare(k.id)}),m.sort(($,k)=>(k.done_at??0)-($.done_at??0));let I=s.length>0?s:n.map($=>({root_dir:$&&$.root_dir,name:$&&$.name,auto_advance:$&&$.auto_advance,auto_merge:$&&$.auto_merge,slots:$&&$.slots,revision:$&&$.revision,runner_catalog:$&&$.runner_catalog})),N=[];for(let $ of I)!$||typeof $.root_dir!="string"||N.push({root_dir:$.root_dir,name:$.name||$.root_dir,auto_advance:$.auto_advance===!0,auto_merge:$.auto_merge===!0,slots:typeof $.slots=="number"&&$.slots>=$n?$.slots:$n,revision:typeof $.revision=="number"?$.revision:0,runner_catalog:Mt($.runner_catalog),items:b.get($.root_dir)||[]});return{runnable:d,queue:f,queue_groups:N,running:l,pr_wait:u,done:m,automation:{total:N.length,both_on:N.filter($=>$.auto_advance&&$.auto_merge).length}}}function uf(e,t){if(typeof e!="number"||!Number.isFinite(e))return"";let n=t-e<of;return i`<span
    class="mon-beat${n?" mon-beat--live":""}"
    title=${`\uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${pt(e)}`}
    ><span class="mon-beat__dot" aria-hidden="true"></span>${n?"":i`<span class="mon-beat__age"
          >${Tt(e,t)}</span
        >`}</span
  >`}function xn(e){return i`<div class="mon-c__title">${e.title}</div>`}function Sn(e){return i`<span class="mon-c__id" title="클릭하면 상세로 이동"
    >${e.id}</span
  >`}function Rs(e){return e.workspace_name?i`<span class="mon-c__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:""}function No(e){let t=ht(e.usage),r=qt(e.usage);return t.length>0?t.map(n=>i`<span class="mon-c__usage" title=${n.tooltip}
          >${n.label}</span
        >`):r?i`<span class="mon-c__usage" title=${zr(e.usage)}
        >${r}</span
      >`:""}function Fo(e){return(Array.isArray(e.badges)?e.badges:[]).map(r=>i`<span class="mon-c__badge${e.alert?" mon-c__badge--alert":""}"
        >${r}</span
      >`)}function pf(e){return i`<span class="mon-c__ops">
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
          ${Nl()}
        </button>`:""}
  </span>`}function ff(e,t){let r=typeof e.started_at=="number"?Lo(t-e.started_at):"";return i`${xn(e)}
    <div class="mon-c__meta">
      ${Fo(e)}${uf(e.last_event_at,t)}${Sn(e)}${Rs(e)}
      ${Kt(e)?i`<span class="mon-c__model">${Kt(e)}</span>`:""}
      ${gr(e)?i`<span
            class="rtile__resumed"
            title=${gr(e)}
            >↻</span
          >`:""}
      ${r?i`<span class="mon-live__elapsed">${r}</span>`:""}
      ${No(e)}${pf(e)}${cr(e)}
    </div>`}function _f(e){let t=e.workflow,n=(t&&t.chips||{}).route||t&&t.route,s=typeof e.spec_reviewer=="string"?e.spec_reviewer:"",o=e.plan_state==="approved"?"plan \u2713":e.plan_state==="authored"?"plan \u270E":"plan \u2013",a=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),d=Tt(e.updated_at);return i`${xn(e)}
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
      ${d?i`<span title=${`\uC218\uC815 ${pt(e.updated_at)}`}
            >수정 ${d}</span
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
    </div>`}function mf(e){let t=!!e.discard?.operation;return i`${xn(e)}
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
    ${cr(e)}
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
        </div>`:""}`}function gf(e){let t=!!(qt(e.usage)||e.merge_action||e.cancel_action||e.discard_action);return i`${xn(e)}
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
          ${cr(e)}
        </div>`:""}`}function hf(e,t){let r=e.done_kind||"",n=r?af[r]||r:"",s=Tt(e.done_at,t);return i`${xn(e)}
    <div class="mon-c__meta">
      ${Sn(e)}${Rs(e)}
      ${n?i`<span
            class="mon-live__kind${lf.has(r)?" mon-live__kind--ok":" mon-live__kind--warn"}"
            >${n}</span
          >`:""}
      ${No(e)}
      ${s?i`<span title=${`\uC644\uB8CC ${pt(e.done_at)}`}
            >완료 ${s}</span
          >`:""}
    </div>`}function Wl(e,t){return e.lane==="running"?ff(e,t):e.lane==="runnable"?_f(e):e.lane==="queue"?mf(e):e.lane==="pr_wait"?gf(e):hf(e,t)}function zl(e){let t=String(e.revision);return i`<header
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
        ${Fl()}
        <span class="mon-ctl__label">머지</span>
      </button>
      <label class="mon-ctl mon-ctl--slots" title="동시에 실행할 세션 수">
        ${ql()}
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
  </header>`}function Hl(e){let{total:t,both_on:r}=e.automation,n=t>0&&r===t,s=e.running_sort==="repo"?"repo":"started",o=Yt.find(d=>d.value===e.done_range)?.label||"",a=Array.isArray(e.token_total)?e.token_total:e.token_total?[{label:e.token_total,tooltip:e.token_tooltip}]:[];return i`<div class="mon-top">
    <button
      type="button"
      class="mon-auto-all${n?" is-active":""}"
      data-on=${n?"false":"true"}
      aria-pressed=${n?"true":"false"}
      ?disabled=${t===0}
      title=${n?"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uB055\uB2C8\uB2E4 (\uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4)":"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uCF2D\uB2C8\uB2E4"}
    >
      ${n?Ml():Bl()}
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
        ${Yt.map(d=>i`<option
              value=${d.value}
              ?selected=${e.done_range===d.value}
            >
              ${d.label}
            </option>`)}
      </select>
      ${a.map(d=>i`<span
            class="mon-kpi__chip mon-kpi__chip--tokens"
            title=${d.tooltip}
            >${o} 완료 · 누적 ${d.label}</span
          >`)}
    </div>
  </div>`}function Gl(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function Vl(e){let t=(Array.isArray(e)?e:[]).map(d=>d&&d.usage).filter(d=>d&&typeof d=="object"&&"providers"in d);if(t.length>0)return ht(Jn(t));let r={};for(let d of nr)r[d]=0;let n=!1,s=0,o=0,a=0;for(let d of Array.isArray(e)?e:[]){let l=d&&d.usage;if(l&&typeof l=="object"){let u=!1;for(let f of nr){let m=l[f];typeof m=="number"&&Number.isFinite(m)&&(r[f]+=m,n=!0,u=!0)}if(u){o+=1;let f=l.total_cost_usd;typeof f=="number"&&Number.isFinite(f)&&(s+=f,a+=1)}}}return o>0&&a===o&&(r.total_cost_usd=s),n?qt(r):null}var Kl="bdui.monitor.done-range",Zl="bdui.monitor.running_sort";function bf(){try{let e=window.localStorage.getItem(Kl);return Lt(e)?e:At}catch{return At}}function vf(e){try{window.localStorage.setItem(Kl,e)}catch{}}function wf(){try{return window.localStorage.getItem(Zl)==="repo"?"repo":"started"}catch{return"started"}}function yf(e){try{window.localStorage.setItem(Zl,e)}catch{}}var Xl="tab:monitor:pipeline",kf=1e3,$f=[{lane:"runnable",pane:"candidate",title:"\uC2E4\uD589\uAC00\uB2A5",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589\uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}];function Yl(e,t){let r=(e.lane==="runnable"||e.lane==="queue")&&e.draggable!==!1;return i`<div
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
    ${Wl(e,t)}
  </div>`}function Ql(e,t){let r=nt("views:monitor"),n=t.gotoIssue,s=t.pipelineStore,o=t.transport,a=t.getWorkspacePath,d=t.switchWorkspace,l=t.now||(()=>Date.now()),u=t.confirm||(M=>typeof globalThis.confirm!="function"||globalThis.confirm(M)),f=bf(),m=wf();function b(){let M=Yt.find(j=>j.value===f);return M?M.label:""}let S=document.createElement("div");S.className="mon",e.appendChild(S);let y=Mo(null,null),I=new Map,N=null,$=null;async function k(M,j,R,X,Z=!0){if(!o||!R)return null;let oe=await o(M,{...j,root_dir:R,expected_revision:X});if(oe&&oe.conflict&&Z){oe.queue&&I.set(R,oe.queue);let ne=oe.queue&&typeof oe.queue.revision=="number"?oe.queue.revision:X;oe=await o(M,{...j,root_dir:R,expected_revision:ne})}return oe&&oe.queue&&R&&I.set(R,oe.queue),oe}function L(M,j){let R=I.get(M),X=s&&s.get?s.get():null,Z=(Array.isArray(X)?X:[]).find(ne=>ne?.root_dir===M);return(R||Z)?.merge_queue?.find(ne=>ne.bead_id===j)?.continuation_action}async function E(M,j,R,X){let Z=await k(M,j,R,X),oe=I.get(R)?.revision??Z?.queue?.revision??X;return rr(Z,(ne,ke)=>k(M,{...j,continuation:ne,decision_token:ke},R,oe,!1),{refresh:ne=>k(M,j,R,ne?.queue?.revision??I.get(R)?.revision??oe,!1)})}async function x(M,j,R,X){let Z=await rr({continuation_mismatch:X},(ne,ke)=>k("worker-merge-queue-add",{bead_id:j,continuation:ne,decision_token:ke},M,R,!1)),oe=Z?.queue?.merge_queue?.find(ne=>ne.bead_id===j)?.continuation_action;Z?.applied!==!0&&oe?.continuation===null&&oe.mismatch&&await x(M,j,Z.queue.revision,oe.mismatch)}async function F(M,j,R){let X=await k("worker-discard",M,j,R);if(X&&X.discarded===!0){ee(Ts(X),"success",5e3);return}if(X&&X.reason){ee(`\uD3D0\uAE30 \uC2E4\uD328: ${X.reason}`,"error");return}if(X&&X.accepted&&X.pending==="merged_revert"){ee("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if(X&&X.accepted){ee(`\uD3D0\uAE30 \uC9C4\uD589: ${X.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}X&&!X.conflict&&ee("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function V(M,j,R){return!o||!R?null:await o(M,{...j,root_dir:R})}async function Q(M){if(!o||!M&&!u("\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB055\uB2C8\uB2E4. \uAC01 \uB808\uD3EC\uC758 \uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uD568\uAED8 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?"))return;let j=await o("monitor-auto-toggle",{on:M}),R=j&&Array.isArray(j.failed)?j.failed:[];R.length>0&&ee(`\uC790\uB3D9\uD654 ${M?"\uCF1C\uAE30":"\uB044\uAE30"} \uC77C\uBD80 \uC2E4\uD328: ${R.map(X=>X.root_dir).join(", ")}`,"error",3200)}async function ce(){let M=new Map;for(let j of y.pr_wait)M.has(j.root_dir)||M.set(j.root_dir,j.expected_revision);for(let[j,R]of M)await k("worker-merge-queue-add-all",{},j,R)}let de=null,ie=!1,ue=null;function Ce(){ue!==null&&clearTimeout(ue),ue=setTimeout(()=>{ue=null,ie=!1},0)}function Le(M){let j=M.target;return typeof j?.closest=="function"?j.closest(".mon-group"):null}function Je(M){let j=Le(M);return!j||!de?null:(j.getAttribute("data-root-dir")||"")===de.root_dir?j:null}function Fe(){for(let M of Array.from(S.querySelectorAll(".mon-group--drag-over")))M.classList.remove("mon-group--drag-over")}function Xe(M){let j=M.target,R=typeof j?.closest=="function"?j.closest('.mon-card[draggable="true"]'):null;if(R){de={bead_id:R.getAttribute("data-issue-id")||"",lane:R.getAttribute("data-lane")||"",root_dir:R.getAttribute("data-root-dir")||"",revision:Number(R.getAttribute("data-revision")||0)||0,queue_index:Number(R.getAttribute("data-queue-index")),queue_length:Number(R.getAttribute("data-queue-length")),place_index:Number(R.getAttribute("data-place-index"))},ie=!0;try{M.dataTransfer?.setData("text/plain",de.bead_id),M.dataTransfer&&(M.dataTransfer.effectAllowed="move")}catch{}}}function Re(M){let j=Je(M);j&&(M.preventDefault(),M.dataTransfer&&(M.dataTransfer.dropEffect="move"),j.classList.add("mon-group--drag-over"))}function be(M){Le(M)?.classList.remove("mon-group--drag-over")}function xe(){de=null,Fe(),Ce()}function fe(M){let j=Je(M),R=de;if(de=null,Fe(),!j||!R||!R.bead_id)return;M.preventDefault();let X=M.target,Z=typeof X?.closest=="function"?X.closest('.mon-card[data-lane="queue"]'):null,oe=Z&&j.contains(Z)?Number(Z.getAttribute("data-queue-index")):NaN;if(R.lane==="runnable"){let Ve=Number.isFinite(oe)?oe:R.place_index;if(!Number.isFinite(Ve))return;k("worker-queue-place",{bead_id:R.bead_id,index:Ve},R.root_dir,R.revision);return}if(R.lane!=="queue"||Z&&Z.getAttribute("data-issue-id")===R.bead_id)return;let ne=R.queue_index,ke=Number.isFinite(oe)?ne>oe?oe:oe-1:R.queue_length-1;!Number.isFinite(ke)||ke<0||ke===ne||k("worker-queue-reorder",{bead_id:R.bead_id,to_index:ke},R.root_dir,R.revision)}function z(M){let j={runnable:y.runnable,queue:y.queue,running:y.running,pr_wait:y.pr_wait,done:y.done};return i`${Hl({automation:y.automation,counts:{running:y.running.length,queue:y.queue.length,pr_wait:y.pr_wait.length},running_sort:m,done_range:f,token_total:Vl(y.done),token_tooltip:Gl(b())})}
      <div class="worker-lanes mon-lanes">
        ${$f.map(R=>{let X=j[R.lane],Z=R.lane==="queue"?y.queue_groups.length>0?i`${y.queue_groups.map(oe=>i`<div
                        class="mon-group"
                        data-root-dir=${oe.root_dir}
                      >
                        ${zl(oe)}
                        <div class="mon-group__list">
                          ${oe.items.map(ne=>Yl(ne,M))}
                        </div>
                      </div>`)}`:void 0:X.length>0?i`${X.map(oe=>Yl(oe,M))}`:void 0;return Xt({id:`monitor-${R.lane}`,lane:R.pane,title:R.lane==="done"?`\uC644\uB8CC\xB7${b()}`:R.title,items:X,empty:R.empty,body:Z,live:R.lane==="running"&&X.length>0,header_control:R.lane==="pr_wait"&&X.length>0?i`<button
                    type="button"
                    class="mon-lane-op mon-merge-all"
                    title="자격이 생기는 PR을 각 레포의 머지 큐에 한 번에 넣습니다"
                  >
                    일괄 머지
                  </button>`:""})})}
      </div>`}function q(){let M=s&&s.get?s.get():null,j=s&&s.getWorkspacesState?s.getWorkspacesState():[],R=l();y=Mo(M,j,{done_since:Tr(f,R),running_sort:m}),Be(z(R),S)}function Te(M,j){let R=a?a():void 0;if(!j||!R||j===R||!d){n(M);return}d(j).then(()=>{n(M)}).catch(X=>{r("workspace switch for %s failed: %o",j,X)})}function te(M){return{root_dir:M.getAttribute("data-root-dir")||"",revision:Number(M.getAttribute("data-revision")||0)||0}}function re(M,j){let{root_dir:R,revision:X}=te(M),Z=M.getAttribute("data-issue-id")||"",oe=j.dataset.attemptId||M.getAttribute("data-attempt-id")||"",ne=j.classList;if(ne.contains("worker-card__place")){k("worker-queue-place",{bead_id:Z,index:Number(M.getAttribute("data-place-index")||0)||0},R,X);return}if(ne.contains("mon-op--up")||ne.contains("mon-op--down")){let ke=Number(M.getAttribute("data-queue-index")||0)||0,Ve=ne.contains("mon-op--up")?ke-1:ke+1;if(Ve<0)return;k("worker-queue-reorder",{bead_id:Z,to_index:Ve},R,X);return}if(ne.contains("mon-op--remove")){k("worker-queue-remove",{bead_id:Z},R,X);return}if(ne.contains("mon-op--pause")){V("worker-attempt-pause",{attempt_id:oe},R);return}if(ne.contains("mon-op--discard")){if(!u(yn(Z,"unmerged")))return;F({bead_id:Z,...oe?{attempt_id:oe}:{},...j.dataset.operationId?{operation_id:j.dataset.operationId}:{}},R,X);return}if(ne.contains("mon-op--resume")){E("worker-attempt-resume",{attempt_id:oe},R,X);return}if(ne.contains("mon-op--dismiss")){k("worker-attempt-dismiss",{attempt_id:oe},R,X);return}if(ne.contains("worker-mini__merge")){let ke=L(R,Z);ke?.mismatch&&ke.continuation===null?x(R,Z,X,ke.mismatch):k("worker-merge-queue-add",{bead_id:Z},R,X);return}if(ne.contains("worker-mini__merge-cancel")){k("worker-merge-queue-remove",{bead_id:Z},R,X);return}if(ne.contains("worker-mini__discard")){let ke=j.dataset.discardMode==="merged"?"merged":"unmerged";if(!u(yn(Z,ke)))return;F({bead_id:Z,...oe?{attempt_id:oe}:{},...j.dataset.operationId?{operation_id:j.dataset.operationId}:{}},R,X);return}if(ne.contains("worker-mini__revise-fix")){E("worker-revise-fix",{bead_id:Z},R,X);return}ne.contains("worker-mini__revise-approve")&&k("worker-revise-approve",{bead_id:Z},R,X)}function C(M){let j=ie;ie=!1;let R=M.target;if(!R||typeof R.closest!="function"||R.closest("dialog")||R.closest("a"))return;let X=R.closest(".mon-running-sort");if(X){M.preventDefault(),m=X.getAttribute("data-sort")==="repo"?"repo":"started",yf(m),q();return}let Z=R.closest(".mon-auto-all");if(Z){M.preventDefault(),Q(Z.getAttribute("data-on")==="true");return}if(R.closest(".mon-merge-all")){M.preventDefault(),ce();return}let ne=R.closest(".mon-ctl--advance");if(ne){M.preventDefault();let{root_dir:rt,revision:A}=te(ne);k("worker-automation-toggle",{on:ne.getAttribute("data-on")==="true"},rt,A);return}let ke=R.closest(".mon-ctl--merge-auto");if(ke){M.preventDefault();let{root_dir:rt,revision:A}=te(ke);k("worker-merge-auto-toggle",{on:ke.getAttribute("data-on")==="true"},rt,A);return}let Ve=R.closest(".mon-card");if(!Ve)return;let Qe=R.closest("button");if(Qe){M.preventDefault(),re(Ve,Qe);return}let st=Ve.getAttribute("data-issue-id");st&&!j&&(M.preventDefault(),Te(st,Ve.getAttribute("data-root-dir")||""))}function B(M){let j=M.target;if(!j||typeof j.closest!="function")return;let R=j.closest(".mon-done-range");if(R){f=Lt(R.value)?R.value:At,vf(f),q();return}let X=j.closest(".mon-slots__input");if(!X)return;let{root_dir:Z,revision:oe}=te(X),ne=Number(X.value);if(!Number.isFinite(ne))return;let ke=Math.max($n,Math.floor(ne));k("worker-queue-set-slots",{slots:ke},Z,oe)}e.addEventListener("click",C),e.addEventListener("change",B),e.addEventListener("dragstart",Xe),e.addEventListener("dragover",Re),e.addEventListener("dragleave",be),e.addEventListener("drop",fe),e.addEventListener("dragend",xe),s&&typeof s.subscribe=="function"&&(N=s.subscribe(()=>{try{I.clear(),q()}catch{}}));function pe(){$!==null&&(clearInterval($),$=null)}function Oe(){ue!==null&&(clearTimeout(ue),ue=null)}return{load(){r("load"),q(),$===null&&($=setInterval(()=>{try{q()}catch{}},kf))},pause(){pe()},clear(){pe(),Oe(),N&&(N(),N=null),e.removeEventListener("click",C),e.removeEventListener("change",B),e.removeEventListener("dragstart",Xe),e.removeEventListener("dragover",Re),e.removeEventListener("dragleave",be),e.removeEventListener("drop",fe),e.removeEventListener("dragend",xe),e.replaceChildren()}}}function Jl(e,t,r){let n=nt("views:nav"),s=null;function o(l){return u=>{u.preventDefault(),n("click tab %s",l),r.gotoView(l)}}function a(){let l=t.getState(),u=l.view==="worker"||l.view==="monitor"?l.view:"board";return i`
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
    `}function d(){Be(a(),e)}return d(),s=t.subscribe(()=>d()),{destroy(){s&&(s(),s=null),Be(i``,e)}}}var ec=["bug","feature","task","epic","chore"];function tc(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var rc=["Critical","High","Medium","Low","Backlog"];function nc(e,t){let r=document.createElement("dialog");r.id="new-issue-dialog",r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true"),r.innerHTML=`
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
  `,e.appendChild(r);let n=r.querySelector("#new-issue-form"),s=r.querySelector("#new-title"),o=r.querySelector("#new-type"),a=r.querySelector("#new-priority"),d=r.querySelector("#new-labels"),l=r.querySelector("#new-description"),u=r.querySelector("#new-issue-error"),f=r.querySelector("#btn-cancel"),m=r.querySelector("#btn-create"),b=r.querySelector(".new-issue__close");function S(){o.replaceChildren();let x=document.createElement("option");x.value="",x.textContent="\u2014 Select \u2014",o.appendChild(x);for(let F of ec){let V=document.createElement("option");V.value=F,V.textContent=tc(F),o.appendChild(V)}a.replaceChildren();for(let F=0;F<=4;F+=1){let V=document.createElement("option");V.value=String(F);let Q=rc[F]||"Medium";V.textContent=`${F} \u2013 ${Q}`,a.appendChild(V)}}S();function y(){try{typeof r.close=="function"?r.close():r.removeAttribute("open")}catch{r.removeAttribute("open")}}function I(x){s.disabled=x,o.disabled=x,a.disabled=x,d.disabled=x,l.disabled=x,f.disabled=x,m.disabled=x,m.textContent=x?"Creating\u2026":"Create"}function N(){u.textContent=""}function $(x){u.textContent=x}function k(){try{let x=window.localStorage.getItem("beads-ui.new.type");x?o.value=x:o.value="";let F=window.localStorage.getItem("beads-ui.new.priority");F&&/^\d$/.test(F)?a.value=F:a.value="2"}catch{o.value="",a.value="2"}}function L(){let x=o.value||"",F=a.value||"";x.length>0&&window.localStorage.setItem("beads-ui.new.type",x),F.length>0&&window.localStorage.setItem("beads-ui.new.priority",F)}async function E(){N();let x=String(s.value||"").trim();if(x.length===0){$("Title is required"),s.focus();return}let F=Number(a.value||"2");if(!(F>=0&&F<=4)){$("Priority must be 0..4"),a.focus();return}let V=String(o.value||""),Q=String(l.value||""),ce={title:x};V.length>0&&(ce.type=V),String(F).length>0&&(ce.priority=F),Q.length>0&&(ce.description=Q),I(!0);try{await t("create-issue",ce)}catch{I(!1),$("Failed to create issue");return}L(),I(!1),y()}return r.addEventListener("cancel",x=>{x.preventDefault(),y()}),b.addEventListener("click",()=>y()),f.addEventListener("click",()=>y()),r.addEventListener("keydown",x=>{x.key==="Enter"&&(x.ctrlKey||x.metaKey)&&(x.preventDefault(),E())}),n.addEventListener("submit",x=>{x.preventDefault(),E()}),{open(){n.reset(),N(),k();try{"showModal"in r&&typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")}catch{r.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){y()}}}var xf=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function Sf(e,t){return Zs(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function sc(e,t,r){return i`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">라벨 표시</div>
      <p class="settings-dialog__hint-block">
        라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을 누르면
        그 라벨만 예외로 다시 표시됩니다.
      </p>
      ${t.length===0?i`<div class="settings-dialog__empty">라벨 없음</div>`:i`<div class="settings-dialog__pills">
            ${t.map(n=>{let s=Sf(n,e);return i`<button
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
  `}function oc(e,t,r){return i`
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
  `}function ac(e,t){return i`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">카드 표시 요소</div>
      <div class="settings-dialog__toggles">
        ${xf.map(([r,n])=>i`<label class="settings-dialog__toggle">
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
  `}var Af=[{id:"session",label:"\uC138\uC158",glyph:"\u25C6"},{id:"worker",label:"Worker",glyph:"\u25A4"},{id:"display",label:"\uD45C\uC2DC",glyph:"\u25EB"}],Wt="";function zt(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function ic(e,t){let{transport:r,policyStore:n,labelOptions:s}=t,o=t.notify||(A=>ee(A,"error",4e3)),a=document.createElement("dialog");a.id="settings-dialog",a.className="settings-dialog",a.setAttribute("role","dialog"),a.setAttribute("aria-modal","true"),a.setAttribute("aria-label","\uC124\uC815"),e.appendChild(a);let d="session",l=!1,u="",f={},m={},b=[],S=!1,y=null,I={},N="",$="",k=!1,L=!1,E=!1,x=null;function F(){let A=t.queueStore?.get();return zt(A)?A.runner_catalog:null}function V(){let A=t.implPresetStore?.get();return zt(A)&&Array.isArray(A.presets)?A:null}async function Q(){S=!0,Z();try{let A=await r("get-session-defaults",{});f=zt(A?.values)?{...A.values}:{},m={...f},b=Array.isArray(A?.warnings)?A.warnings:[]}catch(A){b=["kv_read_failed"],o(`\uC138\uC158 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${A instanceof Error?A.message:String(A)}`)}finally{S=!1,Z()}}async function ce(){let A=ol(f,m);if(Object.keys(A).length!==0){try{let H=await r("set-session-defaults",{values:A});f=zt(H?.values)?{...H.values}:{},m={...f},b=Array.isArray(H?.warnings)?H.warnings:[]}catch(H){o(`\uC138\uC158 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${H instanceof Error?H.message:String(H)}`)}Z()}}function de(A,H){H===Wt?delete m[A]:m[A]=H,Z(),ce()}async function ie(){let A=t.queueStore?.get();if(!zt(A))return;let H={orchestration_model:A.orchestration_model??null,orchestration_effort:A.orchestration_effort??null,orchestration_speed:A.orchestration_speed??null},le=al(H,{...H,...I});if(Object.keys(le).length!==0){try{let Ee=await r("worker-queue-set-orchestration-defaults",{expected_revision:A.revision,values:le});if(Ee&&Ee.applied===!1){o("Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC");return}I={}}catch(Ee){o(`Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${Ee instanceof Error?Ee.message:String(Ee)}`)}Z()}}function ue(A,H){I[A]=H===Wt?null:H,Z(),ie()}async function Ce(A){let H=t.queueStore?.get();if(!(!zt(H)||A<1)){try{await r("worker-queue-set-slots",{expected_revision:H.revision,slots:A})}catch(le){o(`slots \uC800\uC7A5 \uC2E4\uD328: ${le instanceof Error?le.message:String(le)}`)}Z()}}function Le(){let A={};for(let H of rl){let le=m[H];typeof le=="string"&&le.length>0&&(A[H]=le)}return A}async function Je(){let A=V();if(!A)return;let H=Le();if(Object.keys(H).length===0){o("\uC800\uC7A5\uD560 \uAD6C\uD604 \uAC12\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uBA3C\uC800 \uAD6C\uD604 \uADF8\uB8F9\uC744 \uC120\uD0DD\uD558\uC138\uC694");return}let le=(A.presets||[]).find($e=>$e.id===N),Ee=$.trim()||(le?le.name:"");if(!Ee){o("\uD504\uB9AC\uC14B \uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694");return}try{let $e=le?await r("impl-preset-update",{expected_revision:A.revision,id:le.id,name:Ee,settings:H}):await r("impl-preset-create",{expected_revision:A.revision,name:Ee,settings:H});if($e&&$e.applied){if($="",!le&&Array.isArray($e.presets)){let De=$e.presets.find(ot=>ot.name===Ee);N=De?De.id:N}Z()}else o("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),Z()}catch($e){o(`\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: ${$e instanceof Error?$e.message:String($e)}`)}}async function Fe(){let A=V();if(!(!A||N.length===0))try{let H=await r("impl-preset-delete",{expected_revision:A.revision,id:N});H&&H.applied?(N="",Z()):(o("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),Z())}catch(H){o(`\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: ${H instanceof Error?H.message:String(H)}`)}}async function Xe(){let A=V();if(!(!A||N.length===0)){try{let H=await r("apply-impl-preset-global",{preset_id:N,expected_revision:A.revision});H&&H.applied?(f=zt(H.values)?{...H.values}:{},m={...f},b=Array.isArray(H.warnings)?H.warnings:[]):H&&H.conflict&&o("\uAD6C\uD604 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: \uD504\uB9AC\uC14B\uC774 \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4")}catch(H){o(`\uAD6C\uD604 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: ${H instanceof Error?H.message:String(H)}`)}Z()}}async function Re(){L=!0,E=!1,Z();try{let A=await r("get-worker-system-prompt",{});!A||typeof A!="object"||Array.isArray(A)?E=!0:x=A}catch{E=!0}finally{L=!1,Z()}}function be(){if(k=!k,k&&!x){Re();return}Z()}function xe(){let A=Gr({loading:L,error:E});if(A)return A;if(!x)return"";let H=Array.isArray(x.variants)?x.variants:[];return i`<div class="settings-dialog__sp-body">
      ${x.target_base_placeholder?i`<div class="prompt-block__meta">
            \`${x.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${H.map(le=>i`<div class="settings-dialog__sp-variant" data-variant=${le.key}>
            <div class="settings-dialog__sp-cond">${le.condition}</div>
            ${ir(le.label,le.system_prompt)}
          </div>`)}
    </div>`}function fe(){return i`<section
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
        aria-expanded=${k?"true":"false"}
        @click=${be}
      >
        ${k?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
      </button>
      ${k?xe():""}
    </section>`}function z(A,H,le,Ee,$e,De){let ot=$e[A]??Wt;return i`<select
      class=${ot===Wt?"settings-dialog__unset":""}
      data-key=${A}
      aria-label=${H}
      ?disabled=${De===!0}
      .value=${Or(String(ot))}
      @change=${et=>Ee(A,String(et.target.value))}
    >
      <option value=${Wt} ?selected=${ot===Wt}>(기본)</option>
      ${le.map(et=>i`<option value=${et} ?selected=${et===ot}>
            ${et===Pt?"\uC790\uB3D9":et}
          </option>`)}
    </select>`}function q(A,H,le,Ee,$e,De=!1){return i`<div
      class=${`settings-dialog__row${De?" settings-dialog__row--off":""}`}
    >
      <span class="settings-dialog__row-label">${H}</span>
      <span class="settings-dialog__controls">
        ${z(A,H,le,Ee,$e,De)}
      </span>
    </div>`}function Te(A,H,le,Ee,$e){return i`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">
        <i
          class="settings-dialog__stage-dot"
          style=${`background: var(--stage-${H}-on)`}
        ></i>
        ${A}
      </span>
      <span class="settings-dialog__controls">
        ${z(le,`${A} \uBAA8\uB378`,Ee,de,m,!1)}
        ${z($e,`${A} effort`,ws,de,m,!1)}
      </span>
    </div>`}function te(){let A=F(),H=sl(m),le=m.impl_runtime,Ee=m.impl_model,$e=V();return i`
      <section
        class=${`settings-dialog__pane${d==="session"?" settings-dialog__pane--active":""}`}
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
        ${S?i`<div class="settings-dialog__empty">불러오는 중…</div>`:i`
              <div class="settings-dialog__group">
                <div class="settings-dialog__group-title">워크플로우</div>
                <div class="settings-dialog__row">
                  <span class="settings-dialog__row-label">모드</span>
                  <span class="settings-dialog__controls">
                    <span class="settings-dialog__seg" role="group">
                      <button
                        type="button"
                        data-mode=${Wt}
                        aria-pressed=${String(!m.workflow_mode)}
                        @click=${()=>de("workflow_mode",Wt)}
                      >
                        (기본)
                      </button>
                      ${bs.map(De=>i`<button
                            type="button"
                            data-mode=${De}
                            aria-pressed=${String(m.workflow_mode===De)}
                            @click=${()=>de("workflow_mode",De)}
                          >
                            ${De}
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
                ${Te("\uC0AC\uC591 \uB9AC\uBDF0","spec","spec_review_model",vn,"spec_review_effort")}
                ${Te("\uACC4\uD68D \uB9AC\uBDF0","plan","plan_review_model",vs,"plan_review_effort")}
                ${Te("\uAD6C\uD604 \uB9AC\uBDF0","impl","impl_review_model",vn,"impl_review_effort")}
              </div>

              <div class="settings-dialog__group">
                <div class="settings-dialog__group-title">
                  구현
                  <span class="settings-dialog__hint"
                    >이슈 핀이 있으면 핀이 우선합니다</span
                  >
                </div>
                ${q("impl_dispatch","\uC2E4\uD589 \uBC29\uC2DD",gs,de,m)}
                ${q("impl_runtime","\uC704\uC784 \uB300\uC0C1",hs,de,m,H)}
                ${q("impl_model","\uBAA8\uB378",ys(A,le),de,m,H)}
                ${q("impl_effort","effort",Vr(A,le,Ee),de,m,H)}
                ${q("impl_speed","\uC18D\uB3C4",bn,de,m,H)}
              </div>

              <div class="settings-dialog__preset-bar">
                <select
                  aria-label="구현 프리셋"
                  .value=${Or(N)}
                  @change=${De=>{N=String(De.target.value),Z()}}
                >
                  <option value="" ?selected=${N===""}>
                    구현 프리셋…
                  </option>
                  ${($e?.presets||[]).map(De=>i`<option
                        value=${De.id}
                        ?selected=${De.id===N}
                      >
                        ${De.name}
                      </option>`)}
                </select>
                <button
                  type="button"
                  class="settings-dialog__btn settings-dialog__btn--primary"
                  ?disabled=${N.length===0}
                  @click=${Xe}
                >
                  전역 기본값으로 적용
                </button>
                <input
                  type="text"
                  class="settings-dialog__preset-name"
                  placeholder=${N?"\uC774\uB984 (\uBE44\uC6B0\uBA74 \uC720\uC9C0)":"\uC0C8 \uD504\uB9AC\uC14B \uC774\uB984"}
                  aria-label="프리셋 이름"
                  .value=${Or($)}
                  @input=${De=>{$=String(De.target.value)}}
                />
                <button
                  type="button"
                  class="settings-dialog__btn"
                  data-preset-save
                  @click=${Je}
                >
                  ${N?"\uAC31\uC2E0":"\uC800\uC7A5"}
                </button>
                <button
                  type="button"
                  class="settings-dialog__btn"
                  data-preset-delete
                  ?disabled=${N.length===0}
                  @click=${Fe}
                >
                  삭제
                </button>
              </div>
            `}
      </section>
    `}function re(){let A=t.queueStore?.get(),H=F(),le={orchestration_model:I.orchestration_model??(zt(A)?A.orchestration_model:null),orchestration_effort:I.orchestration_effort??(zt(A)?A.orchestration_effort:null),orchestration_speed:I.orchestration_speed??(zt(A)?A.orchestration_speed:null)},Ee=ks(H,y),$e=Vr(H,y||void 0,le.orchestration_model||Pt).filter(ot=>ot!==Pt),De=zt(A)&&typeof A.slots=="number"?A.slots:2;return i`
      <section
        class=${`settings-dialog__pane${d==="worker"?" settings-dialog__pane--active":""}`}
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
                .value=${Or(y||Wt)}
                @change=${ot=>{let et=String(ot.target.value);y=et===Wt?null:et,Z()}}
              >
                <option value=${Wt} ?selected=${!y}>
                  전체
                </option>
                <option
                  value="claude"
                  ?selected=${y==="claude"}
                >
                  claude
                </option>
                <option
                  value="codex"
                  ?selected=${y==="codex"}
                >
                  codex
                </option>
              </select>
              <span class="settings-dialog__hint">모델 목록을 좁힙니다</span>
            </span>
          </div>
          ${q("orchestration_model","\uBAA8\uB378",Ee,ue,le)}
          ${q("orchestration_effort","effort",$e,ue,le)}
          ${q("orchestration_speed","\uC18D\uB3C4",bn,ue,le)}
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
                  @click=${()=>Ce(De-1)}
                >
                  −
                </button>
                <span class="settings-dialog__stepper-value">${De}</span>
                <button
                  type="button"
                  aria-label="slots 증가"
                  @click=${()=>Ce(De+1)}
                >
                  +
                </button>
              </span>
            </span>
          </div>
        </div>
        ${fe()}
      </section>
    `}function C(){let A=n.get();return i`
      <section
        class=${`settings-dialog__pane${d==="display"?" settings-dialog__pane--active":""}`}
        role="tabpanel"
        id="settings-pane-display"
        aria-label="표시 설정"
      >
        <header class="settings-dialog__pane-head"><h2>표시 설정</h2></header>
        <p class="settings-dialog__pane-sub">
          이 워크스페이스의 라벨·칩 표시 정책입니다.
        </p>
        ${A?i`
              ${sc(A,s(),M)}
              ${oc(A,u,{onDraft:H=>{u=H},onAdd:j,onRemove:R})}
              ${ac(A,X)}
            `:i`<div class="settings-dialog__empty">
              표시 정책을 불러오는 중…
            </div>`}
      </section>
    `}async function B(A){let H=n.get();if(H)try{let le=await r("display-policy-set",{expected_revision:H.revision,policy:A(H)});pe(le),le&&le.conflict&&le.policy&&(le=await r("display-policy-set",{expected_revision:le.policy.revision,policy:A(le.policy)}),pe(le)),le&&le.conflict&&o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC")}catch{o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328")}}function pe(A){A&&A.policy&&typeof A.policy=="object"&&n.set(A.policy)}function Oe(A){B(A)}function M(A){let H=n.get();if(!H)return;let le=!Tf(A,H);Oe(Ee=>Ef(A,Ee,le))}function j(){let A=u.trim();A.length!==0&&(u="",Oe(H=>H.hidden_prefixes.includes(A)?{hidden_prefixes:H.hidden_prefixes}:{hidden_prefixes:[...H.hidden_prefixes,A]}),Z())}function R(A){Oe(H=>({hidden_prefixes:H.hidden_prefixes.filter(le=>le!==A)}))}function X(A){let H=n.get();if(!H)return;let le=H.chips[A]===!1;Oe(()=>({chips:{[A]:le}}))}function Z(){Be(i`
        <div class="settings-dialog__container">
          <nav
            class="settings-dialog__rail"
            role="tablist"
            aria-orientation="vertical"
          >
            <div class="settings-dialog__rail-title">설정</div>
            ${Af.map(A=>i`<button
                  type="button"
                  class="settings-dialog__tab"
                  role="tab"
                  data-tab=${A.id}
                  aria-selected=${String(d===A.id)}
                  aria-controls=${`settings-pane-${A.id}`}
                  @click=${()=>oe(A.id)}
                >
                  <span class="settings-dialog__glyph">${A.glyph}</span>
                  ${A.label}
                </button>`)}
            <button
              type="button"
              class="settings-dialog__close"
              aria-label="닫기"
              @click=${rt}
            >
              닫기
            </button>
          </nav>
          <div class="settings-dialog__panes">
            ${te()} ${re()} ${C()}
          </div>
        </div>
      `,a)}function oe(A){d=A,Z()}let ne=()=>{l=!1,t.onOpenChange?.(!1)};a.addEventListener("close",ne),a.addEventListener("cancel",ne);let ke=A=>{A.target===a&&rt()};a.addEventListener("click",ke);let Ve=null;n.subscribe&&(Ve=n.subscribe(()=>{l&&Z()}));let Qe=null;t.implPresetStore?.subscribe&&(Qe=t.implPresetStore.subscribe(()=>{l&&Z()}));function st(A="session"){l||(l=!0,t.onOpenChange?.(!0),d=A,u="",I={},Z(),typeof a.showModal=="function"?a.showModal():a.setAttribute("open",""),Q())}function rt(){l&&(l=!1,t.onOpenChange?.(!1),typeof a.close=="function"?a.close():a.removeAttribute("open"))}return{open:st,close:rt,sessionDraft:()=>({...m}),destroy(){l=!1,a.removeEventListener("close",ne),a.removeEventListener("cancel",ne),a.removeEventListener("click",ke),Ve&&(Ve(),Ve=null),Qe&&(Qe(),Qe=null),a.remove()}}}function Tf(e,t){return t.visible_labels.includes(e)?!0:t.hidden_labels.includes(e)?!1:!t.hidden_prefixes.some(r=>r.length>0&&e.startsWith(r))}function Ef(e,t,r){if(!r)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(o=>o!==e)};let n=t.hidden_labels.filter(o=>o!==e);return t.hidden_prefixes.some(o=>o.length>0&&e.startsWith(o))?{hidden_labels:n,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:n}}var Cf=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function lc(e){return String(e).padStart(2,"0")}function Rf(e,t){let r=Math.max(0,Math.ceil((e-t)/6e4)),n=Math.floor(r/1440),s=Math.floor(r%1440/60),o=r%60;return n>0?`${n}d${s>0?` ${s}h`:""}`:s>0?`${s}h${o>0?` ${o}m`:""}`:`${o}m`}function If(e,t=Date.now()){let r=Date.parse(e);if(!Number.isFinite(r))return"";let n=new Date(r),s=new Date(t),o=`${lc(n.getHours())}:${lc(n.getMinutes())}`,d=n.getFullYear()===s.getFullYear()&&n.getMonth()===s.getMonth()&&n.getDate()===s.getDate()?o:`${Cf[n.getMonth()]} ${n.getDate()} ${o}`;return`${Rf(r,t)} \xB7 ${d}`}function Lf(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}var cc=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage"}];function dc(e){let t=!1,r=null,n=new Map;function s(){Be(i``,e),e.hidden=!0}function o(){let l=cc.filter(f=>n.has(f.key));if(l.length===0){s();return}let u=Date.now();Be(i`<div class="usage-meter" aria-label="Usage">
        ${l.map(f=>{let m=n.get(f.key),b=typeof m.ageSeconds=="number"&&m.ageSeconds>600,S=b?`${Math.floor(m.ageSeconds/60)}\uBD84 \uC804 \uCE21\uC815`:"";return i`<span
            class="usage-meter__group${b?" usage-meter__group--stale":""}"
            aria-label=${`${f.label} usage`}
          >
            <span class="usage-meter__provider">${f.label}</span>
            ${m.windows.map(y=>{let I=typeof y.pct=="number"&&Number.isFinite(y.pct)?y.pct:0,N=Math.min(100,Math.max(0,I)),k=`resets ${If(y.resetsAt,u)}${b?` \xB7 ${S}`:""}`;return i`<span
                class="usage-meter__window ${Lf(N)}"
                style=${`--progress: ${N}%`}
                title=${k}
              >
                <span class="usage-meter__label">${y.key}</span>
                <span class="usage-meter__track" aria-hidden="true">
                  <span class="usage-meter__fill"></span>
                </span>
                <span class="usage-meter__pct">${N}%</span>
              </span>`})}
          </span>`})}
      </div>`,e),e.hidden=!1}async function a(l){try{let u=await fetch(l.endpoint);if(!u.ok)return null;let f=await u.json();return!f||f.available!==!0||!Array.isArray(f.windows)?null:f}catch{return null}}async function d(){let l=await Promise.all(cc.map(async u=>({provider:u,payload:await a(u)})));if(!t){for(let u of l)u.payload?n.set(u.provider.key,u.payload):n.delete(u.provider.key);o()}}return s(),d(),r=setInterval(()=>{d()},6e4),{destroy(){t=!0,r!==null&&(clearInterval(r),r=null),s()}}}var Of="worker-ineligible";function qo(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function uc(e){return qo(e).includes(Of)}var Bo="worker-serial";function An(e){return qo(e).includes(Bo)}function pc(e){let t=e.queueStore,r=e.transport,n=e.onChanged||(()=>{});function s(){return t&&t.get()||{}}function o(){let k=s();return typeof k.revision=="number"?k.revision:0}function a(k){t&&k&&k.queue&&typeof k.queue=="object"&&t.set(k.queue)}function d(){let k=s().workspace_info;return k&&typeof k=="object"?k:{}}function l(k,L){return i`<span
      class="worker-repo-ops__vd-badge worker-repo-ops__vd-badge--${k}"
      >${L}</span
    >`}function u(k){if(typeof k!="number"||!Number.isFinite(k))return"";let L=k/6e4;return Number.isInteger(L)?`timeout ${L}\uBD84`:`timeout ${Math.round(k/1e3)}\uCD08`}function f(k){let L=u(k);return L?l("config",L):""}function m(k){let L=typeof k.base_sha=="string"?k.base_sha:"",E=`${k.source_path||"repo-ops/config.toml"} @ ${k.base_ref||"?"}${L?`@${L.slice(0,7)}`:""}`;return i`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">
        저장소 작업 선언
        <span class="worker-repo-ops__vd-src">${E}</span>
      </p>
      <div class="worker-repo-ops__lane" data-lane="verify">
        <span class="worker-repo-ops__lane-k">머지 전 검증</span>
        <span class="worker-repo-ops__lane-v"
          >${k.verify?i`<code class="worker-repo-ops__vd-cmd"
                  >${k.verify.script}</code
                >${f(k.verify.timeout_ms)}`:i`선언 없음${l("absent","verify \uC5C6\uC774 \uD310\uC815")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${k.verify?"\uBA38\uC9C0 \uC804\uC5D0 \uC774 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uD1B5\uACFC\uD574\uC57C \uC790\uACA9\uC744 \uC5BB\uC2B5\uB2C8\uB2E4.":"\uBA38\uC9C0 \uC790\uACA9\uC740 PR/base/head \uC2E0\uC120\uB3C4\xB7mergeability\xB7\uB9AC\uBDF0 \uC601\uC218\uC99D\uC73C\uB85C\uB9CC \uD310\uC815\uD569\uB2C8\uB2E4."}</span
        >
      </div>
      <div class="worker-repo-ops__lane" data-lane="deploy">
        <span class="worker-repo-ops__lane-k">머지 후 배포</span>
        <span class="worker-repo-ops__lane-v"
          >${k.deploy?i`<code class="worker-repo-ops__vd-cmd"
                  >${k.deploy.script}</code
                >${f(k.deploy.timeout_ms)}`:i`선언 없음${l("absent","\uBC30\uD3EC \uC5C6\uC74C")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${k.deploy?i`Worker가 <code>.worktrees/.repo-ops-deploy</code>에서 대상
                SHA로 정렬한 뒤 1회 실행합니다.`:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC \uB2E8\uACC4 \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4."}</span
        >
      </div>
    </section>`}function b(k){let L=k.repo_ops&&typeof k.repo_ops=="object"?k.repo_ops:null;return L&&(L.status==="resolved"||L.status==="absent")?m(L):L&&(L.status==="pending"||L.status==="error")?i`<section class="worker-repo-ops__vd" data-seam="repo-ops">
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
          ${L.status==="pending"?"\uC120\uC5B8 \uD655\uC778 \uC911":i`선언 읽기
              실패${L.error_code?i` — <code>${L.error_code}</code>`:""}`}
        </div>
      </section>`:i`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">저장소 작업 선언</p>
      <div class="worker-repo-ops__vd-line worker-repo-ops__vd-absent">
        선언 확인 중
      </div>
    </section>`}async function S(k){if(!r)return;let L=await r("worker-auto-repair-toggle",{on:k,expected_revision:o()});if(a(L),L&&L.conflict){let E=await r("worker-auto-repair-toggle",{on:k,expected_revision:o()});a(E)}n()}let y={owned_deploy_worktree_fetch_detached_alignment_recreate:"\uC804\uC6A9 \uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC \uC815\uB82C\xB7\uBCF5\uAD6C",recovered_pre_execution_fetch_timeout_retry_once:"fetch \uD0C0\uC784\uC544\uC6C3 1\uD68C \uBCF5\uAD6C",repo_serial_lock_wait:"\uC800\uC7A5\uC18C \uC21C\uCC28 \uC2E4\uD589 \uB300\uAE30",restart_operation_adoption:"\uC7AC\uC2DC\uC791 \uD6C4 \uC791\uC5C5 \uC778\uACC4",exact_input_exit_zero_evidence_adoption:"\uB3D9\uC77C \uC785\uB825 \uC131\uACF5 \uC99D\uAC70 \uC778\uACC4",descendant_success_covers_ancestor_rows:"\uCD5C\uC2E0 SHA \uC131\uACF5\uC774 \uC774\uC804 \uD589 \uCEE4\uBC84",owned_verify_candidate_cleanup:"\uAC80\uC99D \uC784\uC2DC \uCCB4\uD06C\uC544\uC6C3 \uC815\uB9AC",script_retry:"\uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4",auto_repair_session:"\uC790\uB3D9 \uD574\uACB0 \uC138\uC158",user_triggered_session:"\uC0AC\uC6A9\uC790 \uD574\uACB0 \uC138\uC158",automatic:"\uC790\uB3D9",user_action_only:"\uC0AC\uC6A9\uC790 \uD074\uB9AD",script_identity_present:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC788\uC744 \uB54C\uB9CC",per_completion_chain:"\uC644\uB8CC \uCCB4\uC778\uB2F9",unbounded:"\uD69F\uC218 \uC81C\uD55C \uC5C6\uC74C",bounded_single_script_retry_exceeded:"\uB2E8\uC77C \uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4 \uD55C\uB3C4 \uCD08\uACFC",baseline_failure_ignore:"\uAE30\uC874 \uC2E4\uD328 \uBB34\uC2DC",config_or_script_deletion_to_bypass_gate:"\uC124\uC815\xB7\uC2A4\uD06C\uB9BD\uD2B8 \uC0AD\uC81C\uB85C \uAC8C\uC774\uD2B8 \uC6B0\uD68C",credential_entry:"\uC790\uACA9\uC99D\uBA85 \uC785\uB825\xB7\uCD9C\uB825",destructive_action:"\uD30C\uAD34\uC801 \uC791\uC5C5",history_rewrite:"\uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131",agent_self_report_as_success:"\uC138\uC158 \uC790\uAE30\uBCF4\uACE0\uB97C \uC131\uACF5 \uCC98\uB9AC",unbounded_repair_session_retry:"\uBB34\uD55C \uD574\uACB0 \uC138\uC158 \uBC18\uBCF5"};function I(k,L,E){return i`<div class="worker-repo-ops__policy-group" data-policy=${E}>
      <div class="worker-repo-ops__policy-label">${k}</div>
      <ul class="worker-repo-ops__policy-list">
        ${L.map(x=>i`<li data-token=${x}>
              ${y[x]||x}
            </li>`)}
      </ul>
    </div>`}function N(k){return i`<div
      class="worker-repo-ops__policy-group"
      data-policy="resolution-ladder"
    >
      <div class="worker-repo-ops__policy-label">해결 사다리</div>
      <ol class="worker-repo-ops__policy-list">
        ${k.map(L=>{let E=[y[L.trigger]||L.trigger];return Number.isInteger(L.attempts_per_operation_attempt)?E.push(`operation\uB2F9 ${L.attempts_per_operation_attempt}\uD68C`):Number.isInteger(L.attempts)?E.push(`${y[L.budget]||L.budget} ${L.attempts}\uD68C`):Number.isInteger(L.sessions_per_user_action)&&E.push(`${L.sessions_per_user_action}\uD68C`,y[L.user_actions]||L.user_actions),L.applies_when&&E.push(y[L.applies_when]||L.applies_when),i`<li data-token=${L.id}>
            <strong>${y[L.id]||L.id}</strong>
            <span>${E.filter(Boolean).join(" \xB7 ")}</span>
          </li>`})}
      </ol>
    </div>`}function $(){let k=s(),L=k.auto_repair!==!1,E=k.repo_operation_policy&&typeof k.repo_operation_policy=="object"?k.repo_operation_policy:null,x=Array.isArray(k.repo_operations)?k.repo_operations:[],F=x.find(de=>de.state==="repairing"),V=x.filter(de=>de.state==="failed"||de.state==="repairing"),Q=V.length?Math.min(...V.map(de=>typeof de.repair?.remaining=="number"?de.repair.remaining:0)):E?.auto_repair?.resolution_ladder?.find(de=>de.id==="auto_repair_session")?.attempts??1,ce=Array.isArray(E?.auto_repair?.resolution_ladder)?E.auto_repair.resolution_ladder:[];return i`<section
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
          .checked=${L}
          @change=${de=>{S(de.target.checked)}}
        />
        검증·배포 실패를 자동으로 해결 시도
      </label>
      <div class="worker-repo-ops__repair-state">
        <span
          class="worker-repo-ops__repair-value"
          data-seam="auto-repair-value"
          >${L?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}</span
        >
        <span
          class="worker-repo-ops__repair-budget"
          data-seam="auto-repair-budget"
          >남은 자동 해결 ${Q}회</span
        >
        <span
          class="worker-repo-ops__repair-session"
          data-seam="auto-repair-session"
          >${F?`\uD574\uACB0 \uC138\uC158 \uC2E4\uD589 \uC911 \xB7 ${F.repair?.owner_bead||F.operation_id}`:"\uC2E4\uD589 \uC911\uC778 \uD574\uACB0 \uC138\uC158 \uC5C6\uC74C"}</span
        >
      </div>
      ${E?i`<details
            class="worker-repo-ops__policy"
            data-seam="policy-lists"
          >
            <summary>
              Worker 자동 처리 기준
              <span class="worker-repo-ops__policy-count"
                >자동 ${(E.worker_automatic||[]).length} · 해결 사다리
                ${ce.length} · 금지
                ${(E.never_automatic||[]).length}</span
              >
            </summary>
            ${I("Worker\uAC00 \uC790\uB3D9 \uCC98\uB9AC",E.worker_automatic||[],"worker-automatic")}
            ${E.supported===!1||E.schema_version!==2?i`<div
                  class="worker-repo-ops__policy-group"
                  data-policy="resolution-ladder"
                >
                  ${`\uACC4\uC57D \uC2A4\uD0A4\uB9C8 \uBD88\uC77C\uCE58 \u2014 \uC790\uB3D9 \uD574\uACB0\uC774 \uC815\uC9C0\uB418\uC5C8\uC2B5\uB2C8\uB2E4 (v${E.schema_version})`}
                </div>`:N(ce)}
            ${I("\uC790\uB3D9\uC73C\uB85C \uD558\uC9C0 \uC54A\uC74C",E.never_automatic||[],"never-automatic")}
          </details>`:""}
    </section>`}return{template(){return i`<details class="worker-repo-ops-settings">
        <summary class="worker-repo-ops-settings__summary">
          저장소 작업 · 검증/배포 선언 · 자동 해결
        </summary>
        ${b(d())} ${$()}
      </details>`}}}var Df=20,fc={verify:"\uBA38\uC9C0 \uC804 \uAC80\uC99D",deploy:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC"},_c={verify_script_failure:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0",verify_script_failure_pre_merge:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0 \uD6C4 \uBA38\uC9C0",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328 \uD574\uACB0",interrupted_without_terminal_exit:"\uC911\uB2E8\uB41C \uC791\uC5C5 \uC9C4\uB2E8"};function Pf(e,t,r=Df){let n=[];for(let s of Array.isArray(e)?e:[])!s||typeof s!="object"||n.push({type:"operation",id:s.operation_id,at:typeof s.finished_at=="number"?s.finished_at:typeof s.requested_at=="number"?s.requested_at:null,operation:s});for(let s of Array.isArray(t)?t:[])!s||typeof s!="object"||n.push({type:"cleanup",id:s.bead_id,at:typeof s.at=="number"?s.at:null,cleanup:s});return n.sort((s,o)=>s.at===null&&o.at===null?String(s.id||"").localeCompare(String(o.id||"")):s.at===null?1:o.at===null?-1:o.at-s.at),n.slice(0,Math.max(0,r))}function mc(e){if(e.type==="cleanup")return"warn";let t=e.operation.state;return t==="succeeded"?"ok":t==="failed"?"fail":"live"}function Mf(e){if(e.type==="cleanup")return"\uBA48\uCDA4";switch(e.operation.state){case"succeeded":return"\uC131\uACF5";case"failed":return"\uC2E4\uD328";case"repairing":return"\uC790\uB3D9 \uD574\uACB0 \uC911";case"retry_pending":return"\uC7AC\uC2DC\uB3C4 \uC911";case"running":return"\uC2E4\uD589 \uC911";default:return"\uB300\uAE30"}}function gc(e){let t=e.filter(r=>r.value);return t.length===0?"":i`<details class="worker-ev__details">
    <summary>세부</summary>
    <dl class="worker-ev__kv">
      ${t.map(r=>i`<div>
            <dt>${r.term}</dt>
            <dd>${r.value}</dd>
          </div>`)}
    </dl>
  </details>`}function hc(e,t="",r=!1){return!e&&!t?"":i`<p
    class="worker-ev__explain${r?" worker-ev__explain--warn":""}"
  >
    <span class="worker-ev__cause">${e}</span>${t?i`<br />${t}`:""}
  </p>`}function Nf(e){if(e.state!=="failed"||e.superseded_by)return"";let t=e.repair||{},r=typeof t.remaining=="number"?t.remaining:0,n=e.failure_kind==="verify_script_failure"&&e.verify_stage==="pre_merge"?"verify_script_failure_pre_merge":e.failure_kind||"",s=r<=0;return i`<div class="worker-ev__acts">
    <button
      type="button"
      class="worker-ev__btn worker-ev__btn--primary worker-repo-op__resolve"
      data-operation-id=${e.operation_id}
      data-failure-kind=${e.failure_kind||""}
      title="해결 세션을 엽니다"
    >
      ${Object.hasOwn(_c,n)?_c[n]:"\uC2E4\uD328 \uD574\uACB0 \uC138\uC158 \uC2DC\uC791"}
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
  </div>`}function Ff(e){let t=e.operation,r=t.state==="failed",n=t.failure?t.failure.code:"";return i`<li
    class="worker-ev"
    data-operation-id=${t.operation_id}
    data-state=${t.state}
  >
    <span
      class="worker-ev__t"
      title=${e.at?pt(e.at):""}
      >${As(e.at)||"\u2014"}</span
    >
    <span class="worker-ev__node" aria-hidden="true"
      ><span class="worker-ev__dot worker-ev__dot--${mc(e)}"></span
    ></span>
    <div class="worker-ev__body">
      <div class="worker-ev__line1">
        <span class="worker-ev__what"
          >${Object.hasOwn(fc,t.kind)?fc[t.kind]:t.kind}</span
        >
        <span class="worker-ev__meta"
          >${t.target_base}@${Ss(t.target_sha)}${typeof t.elapsed_ms=="number"?` \xB7 ${To(t.elapsed_ms)}`:""}</span
        >
        <span class="worker-ev__st worker-ev__st--${mc(e)}"
          >${Mf(e)}</span
        >
        ${t.dismissed?i`<span class="worker-ev__st worker-ev__st--quiet">접수됨</span>`:""}
        ${t.superseded_by?i`<span class="worker-ev__st worker-ev__st--quiet">덮임</span>`:""}
      </div>
      ${r?hc(Ol(t.failure_kind,n)):""}
      ${Nf(t)}
      ${gc([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:r?n:""},{term:"script",value:[t.script_path||"",t.script_blob_sha?`blob ${Ss(t.script_blob_sha)}`:"",Number.isInteger(t.exit_code)?`exit ${t.exit_code}`:""].filter(Boolean).join(" \xB7 ")},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function qf(e){let t=e.cleanup,r=Dr(t.step);return i`<li
    class="worker-ev"
    data-bead-id=${t.bead_id}
    data-state="cleanup_stalled"
  >
    <span
      class="worker-ev__t"
      title=${e.at?pt(e.at):""}
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
        ${Cl(t.step).map(n=>i`<li
              class="worker-step worker-step--${n.state}"
              data-step=${n.step}
            >
              <span class="worker-step__pip" aria-hidden="true"></span>
              <span class="worker-step__lb">${n.label}</span>
            </li>`)}
      </ol>
      ${hc(Cs(t.reason),typeof t.retry_count=="number"&&t.retry_count>0?`${t.retry_count}\uD68C \uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uD6C4\uC5D0\uB3C4 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.`:"\uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.",!0)}
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
      ${gc([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:t.reason||""},{term:"\uC9C4\uB2E8",value:t.detail||""},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function Bf(e){return i`<section class="worker-repo-drawer" data-seam="repo-ops-timeline">
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
          ${e.events.map(t=>t.type==="cleanup"?qf(t):Ff(t))}
        </ul>`}
  </section>`}function bc(e,t={}){let r=null;function n(){Be(r?Bf(r):i``,e)}e.addEventListener("click",a=>{a.target?.closest?.('[data-seam="repo-ops-close"]')&&o()});function s(a){r={events:Pf(a.operations,a.cleanup_failures),repo:a.repo||""},n()}function o(){r!==null&&(r=null,n(),t.onClose&&t.onClose())}return{open:s,close:o,isOpen:()=>r!==null,refresh(a){r&&s(a)}}}var Uf="tab:worker:ready",jf="tab:worker:blocked",Wf="tab:worker:in-progress",zf="tab:worker:closed",Tn=1,Hf=new Set(["done","failed","orphaned","stopped","discarded"]);function vc(e){return hn(e).path.length>0}var kc="beads-ui.worker.candidate-filter",Uo={show_blocked:!1,spec:"all"};function Gf(){try{let e=window.localStorage.getItem(kc);if(!e)return{...Uo};let t=JSON.parse(e);if(!t||typeof t!="object")return{...Uo};let r=t.spec;return{show_blocked:t.show_blocked===!0,spec:r==="with"||r==="without"?r:"all"}}catch{return{...Uo}}}function Vf(e){try{window.localStorage.setItem(kc,JSON.stringify(e))}catch{}}function Yf(e,t){let r=d=>t.show_blocked||!d.blocked,n=d=>t.spec==="all"||(t.spec==="with"?d.has_spec:!d.has_spec),s=[],o=0,a=0;for(let d of e){let l=r(d),u=n(d);l&&u?s.push(d):!l&&u?o+=1:l&&!u&&(a+=1)}return{visible:s,hidden_blocked:o,hidden_spec:a}}var Kf=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],$c="bdui.worker.candidate_sort",Zf=[{value:"spec",label:"spec \uC6B0\uC120"},{value:"board",label:"Board \uC21C\uC11C"},{value:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131\uC21C"}],Is="spec";function Xf(){try{let e=window.localStorage.getItem($c);return e==="board"||e==="created"||e==="spec"?e:Is}catch{return Is}}function Qf(e){try{window.localStorage.setItem($c,e)}catch{}}var xc="bdui.worker.done-range";function Jf(){try{let e=window.localStorage.getItem(xc);return Lt(e)?e:At}catch{return At}}function e_(e){try{window.localStorage.setItem(xc,e)}catch{}}var t_="(max-width: 640px)",Sc="beads-ui.worker.lane-collapsed",En={queue:!0,done:!0};function r_(){try{let e=window.localStorage.getItem(Sc);if(!e)return{...En};let t=JSON.parse(e);return!t||typeof t!="object"?{...En}:{queue:typeof t.queue=="boolean"?t.queue:En.queue,done:typeof t.done=="boolean"?t.done:En.done}}catch{return{...En}}}function n_(e){try{window.localStorage.setItem(Sc,JSON.stringify(e))}catch{}}function wc(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let r=typeof t.title=="string"?t.title:t.id||"";return r.length>22?`${r.slice(0,22)}\u2026`:r}function s_(e,t,r){let n=Array.isArray(e)?e.slice():[];return t==="created"?n.sort(Cr):(n.sort(Wn(r)),t==="board"?n:[...n.filter(vc),...n.filter(s=>!vc(s))])}function o_(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function a_(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function i_(e){let r=(Array.isArray(e?.dependencies)?e.dependencies:[]).map(n=>typeof n=="string"?n:n&&n.id).filter(Boolean);return r.length>0?`\u{1F512} ${r.join(", ")}`:"\u{1F512} blocked"}var l_=["closed_unmerged","review","undecidable"],c_=[{from:"\uAD00\uCE21 \uB300\uAE30",activity:"checking",to:"\uD655\uC778\uC911"},{from:"\uAC80\uC99D \uB300\uAE30",activity:"verifying",to:"\uAC80\uC99D \uC911"}];function d_(e,t){for(let r of c_)if(e===r.from&&t===r.activity)return{label:r.to,live:!0};return{label:e,live:!1}}function yc(e){switch(e){case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";default:return e}}function u_(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}function p_(e){if(!e||typeof e!="object")return null;switch(e.state){case"pending":return{badge:"implementation review \uB300\uAE30",live:!1,alert:!1};case"reviewing":return{badge:"implementation review \uC911",live:!0,alert:!1};case"revising":return{badge:"review \uC218\uC815 \uC911 \xB7 1\uD68C",live:!0,alert:!1};case"failed":{let r=(typeof e.failure_reason=="string"?e.failure_reason:"").replace(/[\u0000-\u001f\u007f]/g," ").slice(0,120);return{badge:r.trim().length>0?`review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328: ${r.trim()}`:"review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328",live:!1,alert:!0}}default:return null}}function jo(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}function f_(e){if(!e||typeof e!="object")return null;let t=Number.isInteger(e.repair_sessions_used)?Math.max(0,e.repair_sessions_used):0,r=Number.isInteger(e.repair_session_cap)?Math.max(0,e.repair_session_cap):0,n=e.current_repair&&typeof e.current_repair=="object"?e.current_repair:null,s=n&&typeof n.pr_number=="number"?n.pr_number:null,o="";switch(e.phase){case"gating":o="root \uC7AC\uAC80\uC99D \uC911";break;case"repairing":o=e.subject_role==="root"?`\uC790\uB3D9\uBCF5\uAD6C ${t}/${r} \xB7 \uC6D0 PR \uC218\uC815 \uC911`:`\uC790\uB3D9\uBCF5\uAD6C ${t}/${r} \xB7 repair PR \uC900\uBE44 \uC911`;break;case"waiting_repair_pr":o=s?`repair PR #${s} \uB300\uAE30`:"repair PR \uB300\uAE30";break;case"merging":o=e.subject_role==="repair"?s?`repair PR #${s} \uBA38\uC9C0 \uC911`:"repair PR \uBA38\uC9C0 \uC911":"root \uBA38\uC9C0 \uC911";break;case"cleaning":o="\uC815\uB9AC \uBCF5\uAD6C \uC911";break;case"paused":o="\uC790\uB3D9\uBCF5\uAD6C \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":o=`\uC0AC\uB78C \uD655\uC778 \uD544\uC694 \xB7 ${e.terminal_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`;break;case"completed":return null;default:return null}let a=[`\uBCF5\uAD6C \uC138\uC158 ${t}/${r}`];return e.head_sha&&a.push(`head ${e.head_sha}`),e.base_sha&&a.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&a.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`),e.active_attempt_id&&a.push(`attempt ${e.active_attempt_id}`),n&&typeof n.bead_id=="string"&&a.push(`repair ${n.bead_id}`),e.evidence&&a.push(e.evidence),e.log_path&&a.push(e.log_path),{badge:o,title:a.join(`
`),alert:e.phase==="needs_human",lock_actions:e.phase!=="paused"&&e.phase!=="needs_human",repair_pr_url:n&&typeof n.pr_url=="string"?n.pr_url:"",repair_pr_number:s}}function __(e,t,r,n,s=null,o=null,a=null,d=!1,l=null,u=!0,f=null,m=null,b=null,S={},y=!1,I=!1){let N=!!l&&l.position>0,$=!!l?.continuation_action&&l.continuation_action.continuation===null,k=!!l&&l.active===!0,L=l&&l.failure||null,E=r[e]||null,x=E&&E.gate?E.gate:null,F=E&&E.pr?E.pr:null,V=f_(b),Q=u_(l?l.resolution:null),ce=p_(l?l.head_review:null),de=l&&l.head_review||null,ie=l&&l.authority||null,ue=!!de&&["pending","reviewing","revising"].includes(de.state),Ce=N&&!k&&(de?.state==="failed"||!ie||ie.source==="automatic"&&!I),Le=[];d&&Le.push("\uC138\uC158");let Je=a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":Q?Q.badge:a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":null,Fe=d_(d&&x&&x.tier==="closed_unmerged"?"\uB2EB\uD798":x&&x.gate_badge||"",Je?null:o&&o.activity||null);if(Je&&Le.push(Je),ce&&Le.push(ce.badge),Fe.label&&Le.push(Fe.label),x&&x.base_badge&&x.base_badge!==x.gate_badge&&Le.push(x.base_badge),m&&Le.push(m),n){let re=Dr(n.step);Le.push(re?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${re}`:"\uC815\uB9AC \uBA48\uCDA4")}V&&Le.push(V.badge),N&&!k&&Le.push(`\uBA38\uC9C0 \uB300\uAE30 #${l.position}`),L&&Le.push(`\uC77C\uAD04 \uBA38\uC9C0 \uC2E4\uD328: ${yc(L)}`),$&&Le.push("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"),f&&Le.push(`\uC790\uB3D9 \uC81C\uC678: ${yc(f)}`);let Xe=!!x&&x.base_badge==="\uCDA9\uB3CC",Re=!!x&&x.enabled===!0,be=Co(o&&o.merge_progress?o.merge_progress.step:null),xe=!!n&&["child_sweep","branch_cleanup","parent_close"].includes(n.step)&&!!x&&x.tier==="merged",fe=d&&!!n&&!!x&&x.tier==="merged",z=d&&Xe&&u===!1,q=Zt(S,e,{external:d,merge_active:k||!!be,merge_queued:N,conflict_active:!!a,cleanup_active:!1,merged:!!n||x?.tier==="merged"}),Te=!!q.operation,te=!xe&&!!n&&n.step==="repo_operations";return{id:e,title:t,reason:n?Es(n.step):"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",worker_serial:y,external:d,pr_number:F&&typeof F.number=="number"?F.number:null,pr_url:F&&typeof F.url=="string"?F.url:"",completion_badge:V?V.badge:null,completion_title:V?V.title:"",completion_repair_pr_url:V?V.repair_pr_url:"",completion_repair_pr_number:V?V.repair_pr_number:null,badges:Le,live_badge:a==="paused"?null:Q?.live||a==="running"?Je:ce?.live?ce.badge:Fe.live?Fe.label:null,usage:s,alert:!!x&&l_.includes(x.tier)||!!n||!!L||!!(ce&&ce.alert)||!!(V&&V.alert),merge_action:te?!1:!N||$||Ce,timeline_action:te,cancel_action:N&&!$,cancel_enabled:(!k||ue)&&!(V&&V.lock_actions),cancel_title:V&&V.lock_actions?"\uC790\uB3D9\uBCF5\uAD6C \uC911 \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694":k&&!ue?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":ue?"review \uC9C4\uD589\uC744 \uCDE8\uC18C\uD558\uACE0 \uBA38\uC9C0 \uAD8C\uD55C\uC744 \uD3D0\uAE30\uD569\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:q,discard_action:q.action,merge_step:be,discard_enabled:q.enabled,discard_title:q.title,merge_enabled:!be&&!a&&!Te&&!(V&&V.lock_actions)&&!z&&!te&&(Re||Xe||xe||fe||Ce),merge_label:$?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":xe||fe?"\uC815\uB9AC \uC7AC\uAC1C":Xe&&!be&&!xe?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":Ce?"\uB2E4\uC2DC \uBA38\uC9C0":void 0,merge_title:Te?q.error?`\uD3D0\uAE30 \uC2E4\uD328: ${q.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${q.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:$?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":be?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${be.label}`:fe?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":z?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":xe?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Xe?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":Re?`\uBA38\uC9C0 (${x.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:x&&x.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${x&&x.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function Wo(e,t={}){let{transport:r,issueStores:n,queueStore:s,sessionLogStore:o,uiOrderStore:a,gotoIssue:d,getWorkspacePath:l,doneRange:u,onDoneRangeChange:f}=t,m=n?Hn(n,a):null,b=Vn({transport:r,uiOrderStore:a}),S=null,y=[],I=Gf(),N=Xf(),$=Lt(u)?u:Jf(),k=new Map;function L(){let p=Yt.find(v=>v.value===$);return p?p.label:"\uC624\uB298"}let E=r_(),x=!1,F=new Set,V=new Set,Q=new Set,ce=new Set,de="ordinary",ie=!1,ue=new Map,Ce=[],Le=document.createElement("div");Le.className="worker-console";let Je=document.createElement("div");Je.className="worker-top";let Fe=document.createElement("div");Fe.className="worker-drawer-overlay",Fe.hidden=!0;let Xe=document.createElement("div");Xe.className="worker-drawer-overlay__backdrop";let Re=document.createElement("div");Re.className="worker-drawer-host";let be=document.createElement("div");be.className="worker-drawer-host",be.hidden=!0,Fe.append(Xe,Re,be);let xe=document.createElement("div");xe.className="worker-lanes-host",Le.append(Je,Fe,xe),e.appendChild(Le);let fe=null,z=fs(Re,{transport:r,sessionLogStore:o,onClose:()=>{fe=null,Fe.hidden=!0,K()}}),q=bc(be,{onClose:()=>{be.hidden=!0,Fe.hidden=!0,K()}}),Te=pc({queueStore:s,transport:r,onChanged:()=>K()});function te(){return s&&s.get()||{revision:0,auto_advance:!1,auto_merge:!1,pr_wait_holds_slot:!1,slots:Tn,queue:[],pr_wait:[],done:[]}}function re(){let p=te();return typeof p.revision=="number"?p.revision:0}function C(p){p&&p.queue&&s&&s.set(p.queue)}function B(){let p=te().queue;return Array.isArray(p)?p.length:0}async function pe(p,v){if(!r)return;let D=await r("worker-queue-place",{bead_id:p,index:v,expected_revision:re()});C(D),D&&D.conflict&&await r("worker-queue-place",{bead_id:p,index:v,expected_revision:re()}).then(C)}async function Oe(p,v){if(!r)return;let D=await r("worker-queue-reorder",{bead_id:p,to_index:v,expected_revision:re()});C(D),D&&D.conflict&&await r("worker-queue-reorder",{bead_id:p,to_index:v,expected_revision:re()}).then(C)}async function M(p){if(!r)return;let v=await r("worker-queue-remove",{bead_id:p,expected_revision:re()});C(v),v&&v.conflict&&await r("worker-queue-remove",{bead_id:p,expected_revision:re()}).then(C)}async function j(){if(!r||ie)return;let v=(Array.isArray(te().queue)?te().queue:[]).map(g=>g.bead_id).filter(g=>ce.has(g));if(v.length===0)return;if(v.some(g=>{let P=ue.get(g);return P!==!0&&P!==!1})){ee("\uC2E4\uD589 \uBC29\uC2DD \uD655\uC778 \uC911","warning");return}let D=de==="serial",ae=v.filter(g=>ue.get(g)!==D);if(ae.length===0){ce.clear(),K(),ee("\uC774\uBBF8 \uAC19\uC740 \uC2E4\uD589 \uBC29\uC2DD\uC785\uB2C8\uB2E4","info");return}ie=!0,K();let he=[],W=0;try{for(let g of ae){let P=await Promise.resolve(r(D?"label-add":"label-remove",{id:g,label:Bo})).catch(()=>[]),G=Array.isArray(P)?P[0]:P,Se=G&&typeof G=="object"?G.labels:null;G&&typeof G=="object"&&G.id===g&&Array.isArray(Se)&&An(Se)===D?W+=1:he.push(g)}if(he.length===0){ce.clear(),ee(`${W}\uAC1C \uC2E4\uD589 \uBC29\uC2DD \uBCC0\uACBD`,"success");return}ce.clear();for(let g of he)ce.add(g);ee(`${ae.length}\uAC1C \uC911 ${W}\uAC1C \uBCC0\uACBD \xB7 ${he.length}\uAC1C \uC2E4\uD328 (${he.join(", ")})`,"error")}finally{ie=!1,K()}}async function R(p){if(!r||!p)return;let v=await r("worker-attempt-pause",{attempt_id:p});v&&v.paused===!1&&v.reason&&ee(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${v.reason}`,"error",2400)}async function X(p){if(!r||!p)return;let v=async(ae={})=>await r("worker-attempt-resume",{attempt_id:p,expected_revision:re(),...ae}),D=await v();C(D),D&&D.conflict&&(D=await r("worker-attempt-resume",{attempt_id:p,expected_revision:re()}),C(D)),D=await rr(D,(ae,he)=>v({continuation:ae,decision_token:he}),{onResult:C,refresh:()=>v()}),D&&D.resumed===!1&&!D.conflict&&D.reason&&ee(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${D.reason}`,"error",2400)}async function Z(p){if(!r||!p)return;let v=await r("worker-attempt-dismiss",{attempt_id:p,expected_revision:re()});C(v),v&&v.conflict&&(v=await r("worker-attempt-dismiss",{attempt_id:p,expected_revision:re()}),C(v)),v&&v.dismissed===!1&&!v.conflict&&v.reason&&ee(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${v.reason}`,"error",2400)}async function oe(p,v,D=!0){if(!r)return null;let ae=r,he=await ae(p,{...v,expected_revision:re()});return C(he),he&&he.conflict&&D&&(he=await ae(p,{...v,expected_revision:re()}),C(he)),he}async function ne(p){if(!r||!p)return;let v=te().merge_queue?.find(ae=>ae.bead_id===p)?.continuation_action;if(v?.mismatch&&v.continuation===null){await Ve(p,v.mismatch);return}F.add(p),K();let D;try{D=await oe("worker-merge-queue-add",{bead_id:p})}finally{F.delete(p),K()}!D||D.conflict||D.applied||ee("\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)","error",2400)}async function ke(p){if(!(!r||!p||V.has(p))){V.add(p),K();try{let v=await r("worker-cleanup-retry",{bead_id:p,expected_revision:re()});C(v),v&&!v.retried&&!v.conflict&&v.reason&&ee(`\uC815\uB9AC \uC7AC\uAC1C \uAC70\uBD80: ${v.reason}`,"error",2400)}finally{V.delete(p),K()}}}async function Ve(p,v){let D=await rr({continuation_mismatch:v},(he,W)=>oe("worker-merge-queue-add",{bead_id:p,continuation:he,decision_token:W},!1)),ae=D?.queue?.merge_queue?.find(he=>he.bead_id===p)?.continuation_action;if(D?.applied!==!0&&ae?.continuation===null&&ae.mismatch){await Ve(p,ae.mismatch);return}D&&D.applied===!1&&!D.conflict&&ee("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD\uC774 \uCD5C\uC2E0 \uC0C1\uD0DC\uC640 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4","error",2800)}async function Qe(p){if(!r)return;let v=await oe("worker-merge-auto-toggle",{on:p});!v||v.conflict||ee(p?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",p?"success":"info",2400)}async function st(p){if(!r||!p)return;let v=await oe("worker-merge-queue-remove",{bead_id:p});v&&!v.conflict&&!v.applied&&v.reason==="merge_active"&&ee("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function rt(){await oe("worker-merge-queue-remove",{all:!0})}async function A(p,v=null,D="unmerged",ae=null){if(!r||!p)return;let he=yn(p,D);if(!(typeof globalThis.confirm!="function"||globalThis.confirm(he)))return;let g=await r("worker-discard",{bead_id:p,...v?{attempt_id:v}:{},...ae?{operation_id:ae}:{},expected_revision:re()});if(C(g),g&&g.conflict&&(g=await r("worker-discard",{bead_id:p,...v?{attempt_id:v}:{},...ae?{operation_id:ae}:{},expected_revision:re()}),C(g)),g&&g.discarded===!0){ee(Ts(g),"success",5e3);return}if(g&&g.reason){ee(`\uD3D0\uAE30 \uC2E4\uD328: ${g.reason}`,"error",2800);return}if(g&&g.accepted&&g.pending==="merged_revert"){ee("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(g&&g.accepted&&!g.discarded){ee(`\uD3D0\uAE30 \uC9C4\uD589: ${g.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}g&&!g.conflict&&ee("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function H(p,v){if(!r||!v||Q.has(v))return;Q.add(v),K();let D;try{let ae=async(he={})=>await r(p,{bead_id:v,expected_revision:re(),...he});D=await ae(),C(D),D&&D.conflict&&(D=await r(p,{bead_id:v,expected_revision:re()}),C(D)),p==="worker-revise-fix"&&(D=await rr(D,(he,W)=>ae({continuation:he,decision_token:W}),{onResult:C,refresh:()=>ae()}))}finally{Q.delete(v),K()}if(!(!D||D.conflict)){if(D.ok){ee(p==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}ee(`\uCC98\uBD84 \uAC70\uBD80: ${D.reason||""}`,"error",3e3)}}async function le(p){if(!r)return;let v=await r("worker-automation-toggle",{on:p,expected_revision:re()});C(v),v&&v.conflict&&await r("worker-automation-toggle",{on:p,expected_revision:re()}).then(C)}async function Ee(p){if(!r||!p)return;let v=await r("worker-repo-operation-repair",{operation_id:p});if(C(v),v&&v.ok===!1){ee(`\uD574\uACB0 \uC138\uC158 \uAC70\uBD80: ${v.reason||""}`,"error",3e3);return}v&&v.ok===!0&&ee("\uD574\uACB0 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4","success",2400)}async function $e(p){if(!r||!p)return;let v=await r("worker-repo-operation-dismiss",{operation_id:p});C(v),v&&v.ok===!1&&ee(`\uAE30\uB85D \uB2EB\uAE30 \uAC70\uBD80: ${v.reason||""}`,"error",3e3)}async function De(p){if(!r||!Number.isFinite(p))return;let v=Math.max(Tn,Math.floor(p)),D=await r("worker-queue-set-slots",{slots:v,expected_revision:re()});C(D),D&&D.conflict&&await r("worker-queue-set-slots",{slots:v,expected_revision:re()}).then(C)}async function ot(p){if(!r)return;let v=await r("worker-queue-set-pr-wait-hold",{on:p,expected_revision:re()});C(v),v&&v.conflict&&await r("worker-queue-set-pr-wait-hold",{on:p,expected_revision:re()}).then(C)}function et(){let p=te(),v=m?m.selectBoardColumn(Uf,"ready"):[],D=m?m.selectBoardColumn(jf,"blocked"):[],ae=m?m.selectBoardColumn(zf,"closed"):[],he=m?m.selectBoardColumn(Wf,"in_progress"):[],W=new Map;for(let h of he){let O=a_(h);if(!O)continue;let se=W.get(O);se?se.push(h):W.set(O,[h])}let g=h=>{let O=Gn(W.get(h)||[]);return O?O.title||O.id:null},P=p.bead_titles||{},G=new Map;for(let[h,O]of Object.entries(P))typeof O=="string"&&O.length>0&&G.set(h,O);for(let h of[...v,...D])G.set(h.id,h.title||h.id);ue.clear();let Se=p.bead_times&&typeof p.bead_times=="object"&&!Array.isArray(p.bead_times)?p.bead_times:{},He=p.bead_labels&&typeof p.bead_labels=="object"&&!Array.isArray(p.bead_labels)?p.bead_labels:{};for(let[h,O]of Object.entries(He))Array.isArray(O)&&ue.set(h,An(O));for(let h of[...v,...D]){let O=h.labels;if(!Array.isArray(O))continue;if(!ue.has(h.id)){ue.set(h.id,An(O));continue}let se=Se[h.id],ze=tr(se&&typeof se=="object"?se.updated_at:null),Vt=tr(h.updated_at);Vt!==null&&ze!==null&&Vt>ze&&ue.set(h.id,An(O))}let je=new Map;for(let[h,O]of Object.entries(Se))O&&typeof O=="object"&&je.set(h,O);for(let h of[...v,...D])je.set(h.id,{created_at:h.created_at,updated_at:h.updated_at});let _e=h=>je.get(h)||{},c=p.pr_wait||[],_=p.pr_observations||{},w=p.pr_activity||{},T=p.cleanup_failed||{},J=Object.entries(T).map(([h,O])=>({bead_id:h,step:O&&O.step?O.step:"",reason:O&&O.reason?O.reason:"",at:O&&typeof O.at=="number"?O.at:null,detail:O&&typeof O.detail=="string"?O.detail:null,output_tail:O&&typeof O.output_tail=="string"&&O.output_tail?O.output_tail:void 0,log_path:O&&typeof O.log_path=="string"&&O.log_path?O.log_path:void 0,retry_count:O&&typeof O.retry_count=="number"&&Number.isInteger(O.retry_count)&&O.retry_count>0?O.retry_count:0,failure_code:O&&typeof O.failure_code=="string"?O.failure_code:void 0,subject_id:O&&typeof O.subject_id=="string"?O.subject_id:void 0,repair_eligible:!!(O&&O.repair_eligible),repair:O&&O.repair?O.repair:void 0})),ve=p.queue||[],Pe=new Set(ve.map(h=>h.bead_id));for(let h of ce)Pe.has(h)||ce.delete(h);let Me=new Set([...ve.map(h=>h.bead_id),...c.map(h=>h.bead_id),...p.done.map(h=>h.bead_id)]),me=new Set(D.map(h=>h.id)),tt=a?a.get()?.order||{}:{},Mr=new Set,Vo=[];for(let h of[...v,...D])Me.has(h.id)||Mr.has(h.id)||o_(h)||uc(h.labels)||(Mr.add(h.id),Vo.push(h));y=s_(Vo,N,tt);let Nc=p.admission||{},Yo=h=>{let O=Nc[h];if(!O)return"";if(O.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let se=typeof O.reason=="string"?O.reason:"",ze=se.indexOf(":");return ze>0&&ze<se.length-1?`\u26D4 ${se.slice(0,ze)} (${se.slice(ze+1)})`:`\u26D4 ${se}`},Fc=y.map(h=>{let O=hn(h),se=O.path.length>0,ze=h.workflow?.route==="quick_fix"||h.metadata&&h.metadata.route==="quick_fix",Vt=!ze&&se&&!O.conflict,pr=me.has(h.id),Rt=[];pr&&Rt.push(i_(h)),ze?Rt.push("quick_fix \xB7 \uC6CC\uCEE4 \uBE44\uB300\uC0C1"):O.conflict?Rt.push("spec_id_conflict"):se||Rt.push("spec \uC5C6\uC74C");let Dn=Yo(h.id);return Dn&&Rt.push(Dn),{id:h.id,title:h.title||h.id,reason:Rt.join(" \xB7 "),draggable:Vt,lane:"candidate",created_at:h.created_at,updated_at:h.updated_at,workflow:h.workflow,is_quick_fix:ze,status:h.status,blocked:pr,has_spec:se}}),Ls=Yf(Fc,I),qc=Ls.visible,Bc=p.revise_parked||{},Kr=p.discard_operations&&typeof p.discard_operations=="object"&&!Array.isArray(p.discard_operations)?p.discard_operations:{},Ko=(h,O)=>h.map(se=>{let ze=O==="queue"?Bc[se.bead_id]:null,Vt=O==="queue"?Zt(Kr,se.bead_id):null,pr=Vt?.operation?Vt:null,Rt=O==="queue"?ue.has(se.bead_id)?ue.get(se.bead_id)||!1:null:!1,Dn=Rt===!0&&(Object.values(p.attempts||{}).some(Jt=>Jt&&Jt.bead_id!==se.bead_id&&!Hf.has(Jt.status))||c.some(Jt=>Jt.bead_id!==se.bead_id)||Object.values(Kr).some(Jt=>Jt&&Jt.bead_id!==se.bead_id&&Jt.phase!=="done")),ga=O==="done"?[]:[Yo(se.bead_id)];return Dn&&ga.unshift("\uB2E4\uB978 \uC791\uC5C5 \uC885\uB8CC \uB300\uAE30 \xB7 \uBA38\uC9C0\uAE4C\uC9C0 \uB2E8\uB3C5"),{id:se.bead_id,title:G.get(se.bead_id)||se.bead_id,reason:ga.filter(Boolean).join(" \xB7 "),draggable:O!=="done"&&!pr,done:O==="done",lane:O,selectable:O==="queue",selected:O==="queue"&&ce.has(se.bead_id),worker_serial:Rt,discard:pr,badges:ze?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!ze,revise_action:!!ze,revise_enabled:!!ze&&!pr&&!Q.has(se.bead_id),revise_title:ze?ze.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${ze.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":"",usage:O==="done"?Ot(p.attempts||{},se.bead_id):null,done_at:O==="done"&&typeof se.added_at=="number"?se.added_at:void 0,..._e(se.bead_id)}}),Zo=new Map;for(let h of p.done)h&&typeof h.bead_id=="string"&&typeof h.added_at=="number"&&Zo.set(h.bead_id,h.added_at);let Zr=p.attempts?Object.values(p.attempts):[],Os=new Set;for(let h of Zr)h&&typeof h.resumed_from=="string"&&h.resumed_from.length>0&&Os.add(h.resumed_from);let Ds=new Map;for(let h of Zr)Ds.set(h.bead_id,h.attempt_id);let Ps=new Map;for(let h of Zr)Ps.set(h.attempt_id,h);function Ms(h){let O=new Set,se=h;for(;se&&!O.has(se.attempt_id);){if(se.conflict_resolution===!0)return!0;O.add(se.attempt_id),se=typeof se.resumed_from=="string"&&se.resumed_from.length>0&&Ps.get(se.resumed_from)||null}return!1}let Cn=typeof p.declared_base=="string"?p.declared_base:null;function Uc(h){let O=null;for(let se of Zr)!se||se.bead_id!==h||Ms(se)||(O===null||(typeof se.started_at=="number"?se.started_at:0)>=(typeof O.started_at=="number"?O.started_at:0))&&(O=se);return O&&typeof O.target_base=="string"?O.target_base:null}let Xo=[],Qo=[],jc=h=>{let O=Ds.get(h.bead_id)!==h.attempt_id,se=Zo.get(h.bead_id),ze=typeof se=="number"&&se>0&&typeof h.finished_at=="number"&&se>=h.finished_at;return!O&&!ze&&typeof h.dismissed_at!="number"},Jo=h=>{let O=typeof h.session_id=="string"&&h.session_id.length>0,se=Os.has(h.attempt_id);return{eligible:O&&!se,reason:O?se?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}},Nt=null;for(let h of Zr){let O=h.status==="paused"&&!Os.has(h.attempt_id);if(h.status==="running"||O)Qo.push({bead_id:h.bead_id,attempt_id:h.attempt_id,title:G.get(h.bead_id)||h.bead_id,runner:h.runner||null,model:h.model||null,effort:h.effort||null,speed:h.speed||null,continuation_mode:h.continuation_mode||null,started_at:typeof h.started_at=="number"?h.started_at:null,resumed_from:h.resumed_from||null,paused:O,conflict_resolution:Ms(h),base_exception:jo(Cn,h.target_base),can_pause:typeof h.session_id=="string"&&h.session_id.length>0,discard:Zt(Kr,h.bead_id,{attempt_id:h.attempt_id}),usage:Ot(p.attempts||{},h.bead_id),current_child:g(h.bead_id),..._e(h.bead_id)});else if((h.status==="failed"||h.status==="orphaned")&&jc(h)){let se=Jo(h);Xo.push({bead_id:h.bead_id,attempt_id:h.attempt_id,title:G.get(h.bead_id)||h.bead_id,runner:h.runner||null,model:h.model||null,effort:h.effort||null,speed:h.speed||null,continuation_mode:h.continuation_mode||null,started_at:typeof h.started_at=="number"?h.started_at:null,resumed_from:h.resumed_from||null,failed:!0,status:h.status,status_label:h.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328",discard:Zt(Kr,h.bead_id,{attempt_id:h.attempt_id}),resume_eligible:se.eligible,resume_reason:se.reason,conflict_resolution:Ms(h),base_exception:jo(Cn,h.target_base),usage:Ot(p.attempts||{},h.bead_id),current_child:g(h.bead_id),..._e(h.bead_id)}),Nt=h}}let Rn=[...Xo,...Qo],ea=null;if(Nt){let h=Jo(Nt),O=Nt.cause_detail;ea={bead_id:Nt.bead_id,repo:Nt.repo||"",reason:Nt.cause||Nt.status,cause_detail:O&&typeof O.reason=="string"?{reason:O.reason,command:typeof O.command=="string"?O.command:null}:null,resume_attempt_id:Nt.attempt_id,resume_eligible:h.eligible,resume_reason:h.reason,discard:Zt(Kr,Nt.bead_id,{attempt_id:Nt.attempt_id})}}let Wc=new Set(Rn.map(h=>h.bead_id)),Ns=Array.isArray(p.merge_queue)?p.merge_queue:[],ta=new Map,ra=new Map,na=new Map,sa=new Map,oa=new Map;Ns.forEach((h,O)=>{h&&typeof h.bead_id=="string"&&(ta.set(h.bead_id,O+1),ra.set(h.bead_id,h.resolution),na.set(h.bead_id,h.continuation_action||null),sa.set(h.bead_id,h.head_review||null),oa.set(h.bead_id,h.authority||null))});let aa=p.merge_queue_state||{active:null,failures:{}},zc=aa.failures||{},Hc=p.auto_merge_skips||{},ia=h=>{let O=Hc[h];if(!O)return null;let se=_[h],ze=se&&se.pr?se.pr.head_sha:null;return ze&&ze===O.head_sha?O.reason||"":null},In=new Map;for(let h of Rn)h.failed!==!0&&h.conflict_resolution&&(h.paused?In.has(h.bead_id)||In.set(h.bead_id,"paused"):In.set(h.bead_id,"running"));let la=Rn.filter(h=>!h.paused&&h.failed!==!0).length,ca=(p.workspace_info||{}).slots,Gc=typeof ca=="number"?ca:typeof p.slots=="number"?p.slots:Tn,da=p.pr_wait_holds_slot===!0?Tn:Gc,Vc=la>da,Ln=Tr($),Yc=(Array.isArray(p.done)?p.done.slice():[]).filter(h=>Ln===void 0||typeof h.added_at!="number"||h.added_at>=Ln).sort((h,O)=>(O.added_at||0)-(h.added_at||0)),Xr=Ko(Yc,"done"),Kc=new Set((Array.isArray(p.done)?p.done:[]).map(h=>h?.bead_id).filter(h=>typeof h=="string")),ua=[],Zc=l?.()||"";for(let h of ae){let O=tr(h.closed_at);if(typeof h.id!="string"||Kc.has(h.id)||O===null||Ln!==void 0&&O<Ln||typeof h.comment_count!="number"||h.comment_count<=0)continue;let se=`${Zc}\0${h.id}\0${String(h.updated_at)}\0${h.comment_count}`,ze=k.get(se);ze===void 0&&r&&(k.set(se,"pending"),Promise.resolve(r("get-comments",{id:h.id})).then(Vt=>{let pr=Array.isArray(Vt)&&Vt.some(Rt=>_s(typeof Rt?.text=="string"?Rt.text:"")?.lane==="session");k.set(se,pr?"session":"not-session"),K()}).catch(()=>{k.set(se,"failed"),K()})),ze==="session"&&ua.push({id:h.id,title:h.title||h.id,reason:"",draggable:!1,done:!0,lane:"done",selectable:!1,selected:!1,worker_serial:!1,badges:["\uC138\uC158 \uC791\uC5C5"],alert:!1,usage:null,done_at:O,created_at:h.created_at,updated_at:h.updated_at})}Xr.push(...ua),Xr.sort((h,O)=>(O.done_at||0)-(h.done_at||0));let On={};for(let h of nr)On[h]=0;let pa=!1,fa=0,Fs=0,_a=0;for(let h of Xr){let O=h.usage;if(O&&typeof O=="object"){let se=!1;for(let ze of nr)Number.isFinite(O[ze])&&(On[ze]+=O[ze],pa=!0,se=!0);se&&(Fs+=1,Number.isFinite(O.total_cost_usd)&&(fa+=O.total_cost_usd,_a+=1))}}Fs>0&&_a===Fs&&(On.total_cost_usd=fa);let ma=Xr.map(h=>h.usage).filter(h=>h&&typeof h=="object"&&h.providers),Xc=ma.length>0?ht(Jn(ma)):pa?qt(On):null;return{queue:p,idToTitle:G,candidates:qc,candidate_hidden:{blocked:Ls.hidden_blocked,spec:Ls.hidden_spec},running:Rn,live_count:la,slots:da,over_cap:Vc,failure:ea,waiting:Ko(ve.filter(h=>!Wc.has(h.bead_id)),"queue"),pr_wait:c.map(h=>__(h.bead_id,G.get(h.bead_id)||h.bead_id,_,T[h.bead_id]||null,Ot(p.attempts||{},h.bead_id),w[h.bead_id]||(F.has(h.bead_id)||V.has(h.bead_id)?{activity:null,merge_progress:{step:"merging"}}:null),In.get(h.bead_id)||null,h.external===!0,{position:ta.get(h.bead_id)||0,active:aa.active===h.bead_id,failure:zc[h.bead_id]||null,resolution:ra.get(h.bead_id),continuation_action:na.get(h.bead_id),head_review:sa.get(h.bead_id)||null,authority:oa.get(h.bead_id)||null},h.wt_present!==!1,p.auto_merge===!0?ia(h.bead_id):null,jo(Cn,Uc(h.bead_id)),p.completion_status&&typeof p.completion_status=="object"&&!Array.isArray(p.completion_status)&&p.completion_status[h.bead_id]||null,p.discard_operations&&typeof p.discard_operations=="object"&&!Array.isArray(p.discard_operations)?p.discard_operations:{},Ps.get(Ds.get(h.bead_id)||"")?.worker_serial===!0,p.auto_merge===!0)).map(h=>({...h,..._e(h.id)})),merge_queue_length:Ns.length,merge_queue_running:Ns.length>0,auto_excluded:c.map(h=>h.bead_id).filter(h=>ia(h)!==null),declared_base:Cn,done:Xr,token_total:Xc,cleanup_failures:J,repo_operations:Array.isArray(p.repo_operations)?p.repo_operations:[]}}function ut(p){let v=p.waiting.length>0?p.waiting[0].id:"\u2014",D=i`<button
      type="button"
      class="worker-play${p.queue.auto_advance?" is-active":""}"
    >
      ${p.queue.auto_advance?"\u23F8 \uC790\uB3D9\uD654 \uBA48\uCDA4":"\u25B6 \uC790\uB3D9\uD654"}
    </button>`,ae=U(p),he=p.over_cap?i`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",W=i`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${p.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${p.pr_wait.length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${L()} 완료 <b>${p.done.length}</b></span
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
      </label> `,G=Pl({failure:p.failure}),Se=Tl(p.repo_operations,p.cleanup_failures);return x?i`<div class="worker-ribbon">
          ${D} ${ae}
          <div class="worker-kpi worker-kpi--ribbon">${he}${W}</div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${P}</div>
          <div class="worker-kpi">${g}</div>
        </div>
        ${Se}${Te.template()}${G}`:i`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${D}${ae}${P}</div>
        <div class="worker-kpi">
          ${he}${W}${g}
          ${(Array.isArray(p.token_total)?p.token_total:p.token_total?[{label:p.token_total,tooltip:`${L()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(He=>i`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${He.tooltip}
                >${L()} 완료 · 누적 ${He.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${v}</b></span
          >
        </div>
      </div>
      ${Se}${Te.template()}${G}`}function St(p){if(p.running.length===0&&p.pr_wait.length===0)return"";let v=p.running.some(D=>!D.paused&&D.failed!==!0);return i`<section
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
      ${p.running.length>0?Oo(p.running,Date.now(),fe):""}
      ${p.pr_wait.map(D=>Eo(D))}
    </section>`}function lt(p){let v=p.candidate_hidden;return i`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${I.show_blocked}
        />
        🔒 blocked${v.blocked>0?` ${v.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${Kf.map(D=>i`<button
              type="button"
              class="worker-filter__chip${I.spec===D.value?" is-active":""}"
              data-spec=${D.value}
              aria-pressed=${I.spec===D.value?"true":"false"}
            >
              ${D.label}
            </button>`)}
        ${v.spec>0?i`<span class="worker-filter__hidden">숨김 ${v.spec}</span>`:""}
      </div>
    </div>`}function _t(){return i`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${N}
    >
      ${Zf.map(p=>i`<option value=${p.value} ?selected=${N===p.value}>
            ${p.label}
          </option>`)}
    </select>`}function Ye(){return i`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${$}
      >
        ${Yt.map(p=>i`<option value=${p.value} ?selected=${$===p.value}>
              ${p.label}
            </option>`)}
      </select>
    </div>`}function at(){if(ce.size===0)return"";let p=Array.from(ce),v=p.some(D=>{let ae=ue.get(D);return ae!==!0&&ae!==!1});return i`<div
      class="worker-bulk"
      role="group"
      aria-label="실행 방식 일괄 변경"
    >
      <span class="worker-bulk__count">${p.length}개 선택</span>
      <select
        class="worker-bulk__mode"
        aria-label="실행 방식"
        .value=${de}
        ?disabled=${ie}
      >
        <option value="ordinary">일반 병렬</option>
        <option value="serial">🔒 머지까지 단독</option>
      </select>
      <button
        type="button"
        class="worker-bulk__apply"
        ?disabled=${v||ie}
        title=${v?"\uC120\uD0DD\uD55C \uC791\uC5C5\uC758 \uC2E4\uD589 \uBC29\uC2DD\uC744 \uD655\uC778\uD558\uB294 \uC911\uC785\uB2C8\uB2E4":ie?"\uC2E4\uD589 \uBC29\uC2DD \uBCC0\uACBD \uC911\uC785\uB2C8\uB2E4":"\uC120\uD0DD\uD55C \uC791\uC5C5\uC5D0 \uC801\uC6A9"}
      >
        적용
      </button>
      <span class="worker-bulk__hint">선택한 대기 작업에만 적용됩니다</span>
    </div>`}function ct(p){let v=(p.queue.pr_wait||[]).filter(W=>W&&W.external!==!0&&typeof W.bead_id=="string"),D=new Set(p.running.filter(W=>!W.paused&&W.failed!==!0).map(W=>W.bead_id));for(let W of v)D.add(W.bead_id);let ae=!(p.queue.pr_wait_holds_slot!==!0||p.queue.auto_advance!==!0||p.queue.auto_merge===!0||v.length===0||p.waiting.length===0||D.size<p.slots),he=p.pr_wait.some(W=>W.worker_serial===!0);if(!(!ae&&!(he&&p.queue.auto_merge!==!0)))return i`${ae?i`<div class="worker-stat worker-pr-wait-hint">
          PR 머지 대기 중 — 다음 이슈는 머지·정리 완료 후 시작됩니다 (자동 머지
          꺼짐)
        </div>`:""}${he&&p.queue.auto_merge!==!0?i`<div
          class="worker-stat worker-pr-wait-hint worker-pr-wait-hint--serial"
        >
          단독 실행 작업의 PR 머지·정리가 끝날 때까지 다음 작업이 시작되지
          않습니다 (자동 머지 꺼짐)
        </div>`:""}`}function U(p){let v=p.queue.auto_merge===!0;if(p.merge_queue_running)return i`<button
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
      </button>`;let D=new Set(p.auto_excluded),ae=p.pr_wait.filter(he=>he.merge_action&&he.merge_enabled&&!D.has(he.id)).length;return i`<button
      type="button"
      class="worker-merge-all"
      title="켜 두면 자격이 생기는 PR을 계속 큐에 넣어 순서대로 충돌 해소·머지합니다"
    >
      ▶ 자동 머지${ae>0?` ${ae}`:""}
    </button>`}function Y(p){let v=Xt({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:p.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:_t(),controls:lt(p)});return x?i`<div class="worker-lanes worker-lanes--mobile">
        ${St(p)}
        ${Xt({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:p.waiting,empty:"\uB4DC\uB798\uADF8 \uB610\uB294 [\uB300\uAE30\uB85C \u21B4]\uB85C \uBC30\uCE58",controls:i`${at()}${ct(p)}`,collapsible:!0,collapsed:E.queue,preview:wc(p.waiting)})}
        ${v}
        ${Xt({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:p.done,empty:`${L()} \uC644\uB8CC \uC5C6\uC74C`,controls:Ye(),collapsible:!0,collapsed:E.done,preview:Array.isArray(p.token_total)?p.token_total.map(D=>D.label).join(" \xB7 "):p.token_total||wc(p.done)})}
      </div>`:i`<div class="worker-lanes">
      ${v}
      ${Xt({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:p.waiting,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58",controls:i`${at()}${ct(p)}`})}
      ${Xt({id:"worker-pane-running",lane:"running",title:`\uC2E4\uD589 \uC911 \xB7 \uC2AC\uB86F ${p.slots}`,items:p.running,live:p.running.some(D=>!D.paused&&D.failed!==!0),body:Oo(p.running,Date.now(),fe)})}
      ${Xt({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:p.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C"})}
      ${Xt({id:"worker-pane-done",lane:"done",title:`\uC644\uB8CC \xB7 ${L()} ${p.done.length}`,items:p.done,empty:`${L()} \uC644\uB8CC \uC5C6\uC74C`,controls:Ye()})}
    </div>`}function ge(p){E={...E,[p]:!E[p]},n_(E),K()}function K(){let p=et();Be(ut(p),Je),Be(Y(p),xe)}function we(){let p=document.querySelector(".app-header");if(!p)return;let v=()=>{let D=Math.round(p.getBoundingClientRect().height);Le.style.setProperty("--worker-ribbon-top",`${D}px`)};if(v(),typeof ResizeObserver=="function"){let D=new ResizeObserver(v);D.observe(p),Ce.push(()=>D.disconnect())}else window.addEventListener("resize",v),Ce.push(()=>window.removeEventListener("resize",v))}function Ie(){if(typeof window.matchMedia!="function")return;let p=window.matchMedia(t_);x=!!p.matches;let v=D=>{let ae=!!(D&&typeof D.matches=="boolean"?D.matches:p.matches);ae!==x&&(x=ae,K())};typeof p.addEventListener=="function"?(p.addEventListener("change",v),Ce.push(()=>p.removeEventListener("change",v))):typeof p.addListener=="function"&&(p.addListener(v),Ce.push(()=>p.removeListener(v)))}let qe=null;function Ke(p){qe=p.target instanceof Element?p.target:null}function Ae(p){let D=p.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!D)return;if(qe&&D.contains(qe)&&qe.closest("input, button, a")){p.preventDefault();return}let ae=D.dataset.beadId||"",he=D.dataset.lane||"";S={bead_id:ae,from_lane:he};try{p.dataTransfer?.setData("text/plain",ae),p.dataTransfer&&(p.dataTransfer.effectAllowed="move")}catch{}}function Ue(p){let v=p.target?.closest?.(".worker-pane");if(!v)return;let D=v.dataset.lane||"";D!=="candidate"&&D!=="queue"||(p.preventDefault(),p.dataTransfer&&(p.dataTransfer.dropEffect="move"),v.classList.add("worker-pane--drag-over"))}function ye(p){p.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function mt(p,v){let D=y.find(g=>g.id===p);if(!D)return;let ae=y.filter(g=>g.id!==p),he=ae.length;if(v){let g=v.dataset.beadId;if(g===p)return;let P=ae.findIndex(G=>G.id===g);P>=0&&(he=P)}let W=ae.slice();W.splice(he,0,D),b.applyReorder(p,W,he)}function bt(p){let v=p.target?.closest?.(".worker-pane");if(!v)return;p.preventDefault(),v.classList.remove("worker-pane--drag-over");let D=v.dataset.lane||"",ae=S?.bead_id||p.dataTransfer?.getData("text/plain")||"",he=S?.from_lane||"";if(S=null,!ae)return;let W=p.target?.closest?.(".worker-mini, .worker-card"),g=Array.from(v.querySelectorAll(".worker-mini, .worker-card")),P=g.length;if(W){let G=g.indexOf(W);G>=0&&(P=G)}if(v.classList.contains("worker-pane--collapsed")&&(P=B()),D==="candidate"){if(he==="candidate"){mt(ae,W);return}he==="queue"&&M(ae);return}D==="queue"&&(he==="queue"?Oe(ae,P):pe(ae,P))}function Et(p){I=p,Vf(p),K()}function dr(p){N=p==="board"||p==="created"||p==="spec"?p:Is,Qf(N),K()}function ur(p){$=Lt(p)?p:At,e_($),f?.($),K()}function dt(p){let v=p.target?.closest?.(".worker-mini__select");if(v){let Se=v.dataset.beadId||"";Se&&(v.checked?ce.add(Se):ce.delete(Se),K());return}let D=p.target?.closest?.(".worker-bulk__mode");if(D){de=D.value==="serial"?"serial":"ordinary";return}let ae=p.target?.closest?.(".worker-filter__blocked");if(ae){Et({...I,show_blocked:ae.checked});return}let he=p.target?.closest?.(".worker-done-range");if(he){ur(he.value);return}let W=p.target?.closest?.(".worker-sort");if(W){dr(W.value||Is);return}let g=p.target?.closest?.(".worker-pr-wait-hold");if(g){ot(g.checked);return}let P=p.target?.closest?.(".worker-slots__input");if(!P)return;let G=Number.parseInt(P.value,10);if(!Number.isFinite(G)){K();return}De(G).then(K)}function vt(p){return p?{runner:p.runner||void 0,model:p.model||void 0,effort:p.effort||void 0,worktree:p.worktree||void 0,status:p.status||void 0,session_id:p.session_id||void 0}:{}}function Qt(){let p=et();return{operations:p.repo_operations,cleanup_failures:p.cleanup_failures,repo:l&&l()||""}}function Ht(){fe&&z.close(),be.hidden=!1,Fe.hidden=!1,q.open(Qt()),K()}function Ct(p){let v=te(),D=v.attempts?v.attempts[p]:null;fe=p,q.close(),be.hidden=!0,Fe.hidden=!1,z.open({attempt_id:p,meta:vt(D)}),K()}function Gt(){if(q.isOpen()&&q.refresh(Qt()),!fe)return;let p=te(),v=p.attempts?p.attempts[fe]:null;if(v){z.updateMeta(vt(v));return}z.close()}function gt(p){let v=p.target,D=v?.closest?.(".worker-bulk__apply");if(D){D.disabled||j();return}if(v?.closest?.(".worker-mini__select, .worker-mini__serial, .worker-mini__grip"))return;if(v?.closest?.(".worker-repo-strip")||v?.closest?.(".worker-mini__timeline")){Ht();return}let ae=v?.closest?.(".worker-repo-op__session");if(ae){let me=ae.dataset.attemptId;me&&Ct(me);return}let he=v?.closest?.(".worker-repo-op__resolve");if(he){Ee(he.dataset.operationId||"");return}let W=v?.closest?.(".worker-repo-op__dismiss");if(W){$e(W.dataset.operationId||"");return}let g=v?.closest?.(".worker-cleanup__resume");if(g){let me=g.dataset.beadId;me&&ke(me);return}let P=v?.closest?.(".worker-banner__resume");if(P){let me=P.dataset.attemptId;me&&X(me);return}let G=v?.closest?.(".worker-banner__discard");if(G){let me=G.dataset.confirmation==="merged"?"merged":"unmerged";A(G.dataset.beadId||"",G.dataset.attemptId||null,me,G.dataset.operationId||null);return}let Se=v?.closest?.(".worker-banner__dismiss");if(Se){let me=Se.dataset.attemptId;me&&Z(me);return}if(v?.closest?.(".worker-play")){le(!te().auto_advance);return}let He=v?.closest?.(".worker-merge-all");if(He){He.classList.contains("worker-merge-all--stop")?te().auto_merge===!0?Qe(!1):rt():Qe(!0);return}let je=v?.closest?.(".worker-pane__hd--toggle");if(je){let me=je.dataset.lane;(me==="queue"||me==="done")&&ge(me);return}let _e=v?.closest?.(".worker-card__place");if(_e){let me=_e.dataset.beadId;me&&!_e.disabled&&pe(me,B());return}let c=v?.closest?.(".worker-filter__chip");if(c){let me=c.dataset.spec;(me==="all"||me==="with"||me==="without")&&Et({...I,spec:me});return}let _=v?.closest?.(".worker-mini__merge");if(_){let me=_.dataset.beadId||"";te().cleanup_failed?.[me]?ke(me):ne(me);return}let w=v?.closest?.(".worker-mini__merge-cancel");if(w){st(w.dataset.beadId||"");return}let T=v?.closest?.(".worker-mini__discard");if(T){A(T.dataset.beadId||"",T.dataset.attemptId||null,T.dataset.discardMode==="merged"?"merged":"unmerged",T.dataset.operationId||null);return}let J=v?.closest?.(".worker-mini__revise-fix");if(J){H("worker-revise-fix",J.dataset.beadId||"");return}let ve=v?.closest?.(".worker-mini__revise-approve");if(ve){H("worker-revise-approve",ve.dataset.beadId||"");return}if(v?.closest?.(".worker-mini__pr"))return;if(v?.closest?.(".rtile__discard")){let me=v?.closest?.(".rtile"),tt=me?.dataset?.beadId,Mr=me?.dataset?.attemptId;tt&&A(tt,Mr||null,"unmerged",v?.closest?.(".rtile__discard")?.dataset.operationId||null);return}if(v?.closest?.(".rtile__dismiss")){let tt=v?.closest?.(".rtile")?.dataset?.attemptId;tt&&Z(tt);return}if(v?.closest?.(".rtile__pause")){let tt=v?.closest?.(".rtile")?.dataset?.attemptId;tt&&R(tt);return}if(v?.closest?.(".rtile__resume")){let tt=v?.closest?.(".rtile")?.dataset?.attemptId;tt&&X(tt);return}if(v?.closest?.(".rtile__session")){let tt=v?.closest?.(".rtile")?.dataset?.attemptId;tt&&Ct(tt);return}if(v?.closest?.(".worker-drawer-overlay__backdrop")){q.close(),z.close();return}if(v?.closest?.(".worker-drawer-host"))return;let Pe=v?.closest?.(".rtile");if(Pe){if(v?.closest?.(".rtile__id")){let tt=Pe.dataset.beadId;tt&&Rr(tt).then(Mr=>{Mr?ee("\uBCF5\uC0AC\uB428","success",1200):ee("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let me=Pe.dataset.beadId;me&&d&&d(me);return}let Me=v?.closest?.(".worker-mini, .worker-card");if(Me){let me=Me.dataset.beadId;if(v?.closest?.(".worker-mini__id, .worker-card__id")){me&&Rr(me).then(tt=>{tt?ee("\uBCF5\uC0AC\uB428","success",1200):ee("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}me&&d&&d(me)}}return e.addEventListener("pointerdown",Ke),e.addEventListener("dragstart",Ae),e.addEventListener("dragover",Ue),e.addEventListener("dragleave",ye),e.addEventListener("drop",bt),e.addEventListener("click",gt),e.addEventListener("change",dt),Ie(),we(),m&&Ce.push(m.subscribe(()=>{for(let[p,v]of k)v==="failed"&&k.delete(p);K()})),s&&Ce.push(s.subscribe(()=>{K(),Gt()})),K(),{load(){K()},destroy(){for(let p of Ce.splice(0))try{p()}catch{}e.removeEventListener("pointerdown",Ke),e.removeEventListener("dragstart",Ae),e.removeEventListener("dragover",Ue),e.removeEventListener("dragleave",ye),e.removeEventListener("drop",bt),e.removeEventListener("click",gt),e.removeEventListener("change",dt);try{z.destroy()}catch{}Fe.hidden=!0,Be(i``,e)}}}function zo(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function Ac(e,t,r,n=async()=>{},s=async()=>{}){let o=nt("views:workspace-picker"),a=null,d=!1,l=!1,u=!1;async function f(F){let Q=F.target.value,de=t.getState().workspace?.current?.path||"";if(Q&&Q!==de){o("switching workspace to %s",Q),d=!0,x();try{await r(Q)}catch(ie){o("workspace switch failed: %o",ie)}finally{d=!1,x()}}}async function m(){let F=t.getState(),V=F.workspace?.current?.path||F.workspace?.available?.[0]?.path||"";if(!(!V||l)){o("git-pulling workspace %s",V),l=!0,x();try{await n(V)}catch(Q){o("workspace git pull failed: %o",Q)}finally{l=!1,x()}}}function b(F){let V=F.target;V&&e.contains(V)||I()}function S(F){F.key==="Escape"&&I()}function y(){u||(u=!0,document.addEventListener("mousedown",b),document.addEventListener("keydown",S),x())}function I(){u&&(u=!1,document.removeEventListener("mousedown",b),document.removeEventListener("keydown",S),x())}function N(){u?I():y()}async function $(F){let V=F.target,Q=V.value,ce=V.checked;o("toggling visibility %s \u2192 %s",Q,String(ce));try{await s(Q,ce)}catch(de){o("workspace visibility toggle failed: %o",de)}}function k(F){return F?i`
      <button
        type="button"
        class="workspace-picker__git-pull-button"
        @click=${m}
        ?disabled=${d||l}
        aria-label="Git Pull"
        title="Git Pull"
      >
        <span aria-hidden="true">⬇</span>
      </button>
    `:i``}function L(F,V){return i`
      <div class="workspace-picker__manage">
        <button
          type="button"
          class="workspace-picker__manage-button"
          @click=${N}
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
                ${F.map(Q=>i`
                    <label
                      class="workspace-picker__manage-row"
                      title="${Q.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${Q.path}"
                        .checked=${!V.has(Q.path)}
                        @change=${$}
                      />
                      <span class="workspace-picker__manage-name"
                        >${zo(Q.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function E(){let F=t.getState(),V=F.workspace?.current,Q=F.workspace?.available||[],ce=new Set(F.workspace?.hidden||[]),de=V?.path||Q[0]?.path||"";if(Q.length===0)return i``;let ie=Q.filter(ue=>!ce.has(ue.path)||ue.path===de);if(ie.length<=1){let ue=ie[0]||Q[0],Ce=zo(ue.path);return i`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${ue.path}"
            >${Ce}</span
          >
          ${L(Q,ce)}
          ${k(de)}
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
          ?disabled=${d||l}
          aria-label="Select project workspace"
        >
          ${ie.map(ue=>i`
              <option
                value="${ue.path}"
                ?selected=${ue.path===de}
                title="${ue.path}"
              >
                ${zo(ue.path)}
              </option>
            `)}
        </select>
        ${L(Q,ce)}
        ${k(de)}
        ${d||l?i`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function x(){Be(E(),e)}return x(),a=t.subscribe(()=>x()),{destroy(){a&&(a(),a=null),document.removeEventListener("mousedown",b),document.removeEventListener("keydown",S),Be(i``,e)}}}var Tc=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","get-session-defaults","set-session-defaults","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-automation-toggle","worker-auto-repair-toggle","worker-repo-operation-repair","worker-repo-operation-dismiss","worker-queue-set-slots","worker-queue-set-pr-wait-hold","worker-queue-set-orchestration-defaults","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-cleanup-retry","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-worker-system-prompt","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-impl-presets","unsubscribe-impl-presets","impl-presets-snapshot","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","monitor-auto-toggle"];function Ho(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function Ec(e,t,r=Ho()){return{id:r,type:e,payload:t}}function Cc(e={}){let t=nt("ws"),r={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},n=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",a=0,d=null,l=!0,u=new Map,f=[],m=new Map,b=new Set;function S(E){for(let x of Array.from(b))try{x(E)}catch{}}function y(){if(!l||d)return;o="reconnecting",t("ws reconnecting\u2026"),S(o);let E=Math.min(r.maxMs||0,(r.initialMs||0)*Math.pow(r.factor||1,a)),x=(r.jitterRatio||0)*E,F=Math.max(0,Math.round(E+(Math.random()*2-1)*x));t("ws retry in %d ms (attempt %d)",F,a+1),d=setTimeout(()=>{d=null,L()},F)}function I(E){try{s?.send(JSON.stringify(E))}catch(x){t("ws send failed",x)}}function N(){for(o="open",t("ws open"),S(o),a=0;f.length;){let E=f.shift();E&&I(E)}}function $(E){let x;try{x=JSON.parse(String(E.data))}catch{t("ws received non-JSON message");return}if(!x||typeof x.id!="string"||typeof x.type!="string"){t("ws received invalid envelope");return}if(u.has(x.id)){let V=u.get(x.id);u.delete(x.id),x.ok?V?.resolve(x.payload):V?.reject(x.error||new Error("ws error"));return}let F=m.get(x.type);if(F&&F.size>0)for(let V of Array.from(F))try{V(x.payload)}catch(Q){t("ws event handler error",Q)}else t("ws received unhandled message type: %s",x.type)}function k(){o="closed",t("ws closed"),S(o);for(let[E,x]of u.entries())x.reject(new Error("ws disconnected")),u.delete(E);a+=1,y()}function L(){if(!l)return;let E=n();try{s=new WebSocket(E),t("ws connecting %s",E),o="connecting",S(o),s.addEventListener("open",N),s.addEventListener("message",$),s.addEventListener("error",()=>{}),s.addEventListener("close",k)}catch(x){t("ws connect failed %o",x),y()}}return L(),{send(E,x){if(!Tc.includes(E))return Promise.reject(new Error(`unknown message type: ${E}`));let F=Ho(),V=Ec(E,x,F);return t("send %s id=%s",E,F),new Promise((Q,ce)=>{u.set(F,{resolve:Q,reject:ce,type:E}),s&&s.readyState===s.OPEN?I(V):(t("queue %s id=%s (state=%s)",E,F,o),f.push(V))})},on(E,x){m.has(E)||m.set(E,new Set);let F=m.get(E);return F?.add(x),()=>{F?.delete(x)}},onConnection(E){return b.add(E),()=>{b.delete(E)}},reconnect(){l=!0,d&&(clearTimeout(d),d=null),a=0,L()},close(){l=!1,d&&(clearTimeout(d),d=null);try{s?.close()}catch{}},getState(){return o}}}function m_(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function g_(e,t){try{let n=await(await fetch("/api/config")).json();e.setState({config:n})}catch(r){t("config refresh failed",r)}}var Go=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],Rc=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"],["tab:worker:closed","closed-issues"]],wr="tab:worker:closed",h_="bdui.worker.done-range",Ic=Xl,Lc="worker:queue",Oc="ui:order",Dc="ui:display-policy",Pc="exec:presets",yr="tab:board:closed",Mc="beads-ui.board.closed-range";function b_(e){let t=nt("main");t("bootstrap start");let r=i`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;Be(r,e);let n=document.getElementById("top-nav"),s=document.getElementById("usage-meter"),o=document.getElementById("board-root"),a=document.getElementById("worker-root"),d=document.getElementById("monitor-root"),l=document.getElementById("detail-panel");if(s&&dc(s),o&&a&&d&&l){let Re=function(c,_){let w="Request failed",T="";if(c&&typeof c=="object"){let ve=c;if(typeof ve.message=="string"&&ve.message.length>0&&(w=ve.message),typeof ve.details=="string")T=ve.details;else if(ve.details&&typeof ve.details=="object")try{T=JSON.stringify(ve.details,null,2)}catch{T=""}}else typeof c=="string"&&c.length>0&&(w=c);let J=_&&_.length>0?`Failed to load ${_}`:"Request failed";Xe.open(J,w,T)},ne=function(c){return`${p.getState().workspace.current?.path||""}\0${c}`},ke=function(){pe&&(pe().catch(()=>{}),pe=null),Oe=null,M=null},Qe=function(c){j=c;let _=()=>{j!==c||p.getState().selected_id!==c||(j=null,Ve(c))};if(!Z){X.then(_);return}_()},H=function(c,_,w,T,J){return w!==A[_]?(J().catch(()=>{}),!1):(c.set(T,J),!0)},Ee=function(){let c=p.getState();ut(c.view==="board"),ct(c.view==="worker"),we(c.view==="monitor"),Y(c.view==="board"||c.view==="worker"||le||!!c.selected_id)},ot=function(){let c=Tr($e);return c===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:c}}},et=function(){let c=Tr(De);return c===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:c}}},ut=function(c){if(c)for(let[_,w]of Go){if(st.has(_)||rt.has(_))continue;let T=_===yr?ot():{type:w};try{z.register(_,T)}catch(Pe){t("register %s store failed: %o",_,Pe)}rt.add(_);let J=A.board,ve=!1;fe.subscribeList(_,T).then(Pe=>{ve=!H(st,"board",J,_,Pe)}).catch(Pe=>{t("subscribe %s failed: %o",_,Pe),Re(Pe,"board")}).finally(()=>{rt.delete(_),ve&&Ee()})}else _t()},_t=function(){A.board+=1;for(let[c]of Go){let _=st.get(c);_&&(_().catch(()=>{}),st.delete(c));try{z.unregister(c)}catch(w){t("unregister %s failed: %o",c,w)}}},ct=function(c){if(!c){U();return}for(let[_,w]of Rc){if(Ye.has(_)||rt.has(_))continue;let T=_===wr?et():{type:w};try{z.register(_,T)}catch(Pe){t("register %s store failed: %o",_,Pe)}rt.add(_);let J=A.worker,ve=!1;fe.subscribeList(_,T).then(Pe=>{ve=!H(Ye,"worker",J,_,Pe)}).catch(Pe=>{t("subscribe %s failed: %o",_,Pe),Re(Pe,"worker")}).finally(()=>{rt.delete(_),ve&&Ee()})}},U=function(){A.worker+=1;for(let[c]of Rc){let _=Ye.get(c);_&&(_().catch(()=>{}),Ye.delete(c));try{z.unregister(c)}catch(w){t("unregister %s failed: %o",c,w)}}},Y=function(c){if(!c){ge();return}at||(xe("subscribe-worker-queue",{id:Lc}).catch(_=>{t("subscribe-worker-queue failed: %o",_)}),at=()=>xe("unsubscribe-worker-queue",{id:Lc}))},ge=function(){at&&(at().catch(()=>{}),at=null)},we=function(c){if(!c){Ie();return}K||(xe("subscribe-monitor-pipeline",{id:Ic}).catch(_=>{t("subscribe-monitor-pipeline failed: %o",_)}),K=()=>xe("unsubscribe-monitor-pipeline",{id:Ic}))},Ie=function(){K&&(K().catch(()=>{}),K=null)},Ke=function(){qe||(xe("subscribe-ui-order",{id:Oc}).catch(c=>{t("subscribe-ui-order failed: %o",c)}),qe=()=>xe("unsubscribe-ui-order",{id:Oc}))},Ae=function(){qe&&(qe().catch(()=>{}),qe=null),te.clear()},ye=function(){Ue||(xe("subscribe-display-policy",{id:Dc}).catch(c=>{t("subscribe-display-policy failed: %o",c)}),Ue=()=>xe("unsubscribe-display-policy",{id:Dc}))},mt=function(){Ue&&(Ue().catch(()=>{}),Ue=null),re.clear()},Et=function(){bt||(xe("subscribe-impl-presets",{id:Pc}).catch(c=>{t("subscribe-impl-presets failed: %o",c)}),bt=()=>xe("unsubscribe-impl-presets",{id:Pc}))},Ht=function(c){if(!c)return"Unknown";let _=c.split("/").filter(Boolean);return _.length>0?_[_.length-1]:"Unknown"};var u=Re,f=ne,m=ke,b=Qe,S=H,y=Ee,I=ot,N=et,$=ut,k=_t,L=ct,E=U,x=Y,F=ge,V=we,Q=Ie,ce=Ke,de=Ae,ie=ye,ue=mt,Ce=Et,Le=Ht;let Je=document.getElementById("header-loading"),Fe=Qa(Je),Xe=Al(e),be=Cc(),xe=Fe.wrapSend((c,_)=>be.send(c,_)),fe=Ha(xe),z=Ga(),q=Ya(),Te=Ra(),te=Va(),re=Ea(),C=Ca(),B=Ia();be.on("impl-presets-snapshot",c=>{let _=c;_&&typeof _.revision=="number"&&Array.isArray(_.presets)&&C.set({revision:_.revision,presets:_.presets})}),be.on("monitor-pipeline-snapshot",c=>{let _=c;if(!(!_||!Array.isArray(_.workspaces)))try{Te.set(_.workspaces,_.workspaces_state)}catch{}}),be.on("ui-order-snapshot",c=>{let _=c;if(_&&typeof _.revision=="number")try{te.set({revision:_.revision,order:_.order&&typeof _.order=="object"?_.order:{}})}catch{}}),be.on("display-policy-snapshot",c=>{let _=c;if(_&&_.policy&&typeof _.policy=="object")try{re.set(_.policy)}catch{}}),be.on("session-log-snapshot",c=>{let _=c;if(_&&typeof _.attempt_id=="string")try{B.set(_.attempt_id,Array.isArray(_.lines)?_.lines:[],typeof _.last_event_at=="number"?_.last_event_at:null)}catch{}}),be.on("session-log-append",c=>{let _=c;if(_&&typeof _.attempt_id=="string")try{B.append(_.attempt_id,_.event)}catch{}}),be.on("snapshot",c=>{let _=c,w=_&&typeof _.id=="string"?_.id:"",T=w?z.getStore(w):null;if(T&&_&&_.type==="snapshot")try{T.applyPush(_)}catch{}}),be.on("upsert",c=>{let _=c,w=_&&typeof _.id=="string"?_.id:"",T=w?z.getStore(w):null;if(T&&_&&_.type==="upsert")try{T.applyPush(_)}catch{}}),be.on("delete",c=>{let _=c,w=_&&typeof _.id=="string"?_.id:"",T=w?z.getStore(w):null;if(T&&_&&_.type==="delete")try{T.applyPush(_)}catch{}});let pe=null,Oe=null,M=null,j=null,R=()=>{},X=new Promise(c=>{R=()=>c(void 0)}),Z=!1,oe=!1;async function Ve(c){let _=ne(c);if(_===Oe||_===M)return;M=_;let w=`detail:${c}`,T={type:"issue-detail",params:{id:c}};try{z.register(w,T)}catch(J){t("register detail store failed: %o",J)}try{let J=await fe.subscribeList(w,T);if(p.getState().selected_id!==c||ne(c)!==_){await J().catch(()=>{});return}pe&&await pe().catch(()=>{}),pe=J,Oe=_}catch(J){t("detail subscribe failed: %o",J),Re(J,"issue details")}finally{M===_&&(M=null)}}let st=new Map,rt=new Set,A={board:0,worker:0},le=!1,$e=At;try{let c=window.localStorage.getItem(Mc);Lt(c)&&($e=c)}catch{}let De=At;try{let c=window.localStorage.getItem(h_);Lt(c)&&(De=c)}catch{}async function St(c){if(!Lt(c)||c===$e)return;$e=c;try{window.localStorage.setItem(Mc,c)}catch{}let _=st.get(yr);if(!_)return;st.delete(yr),await _().catch(()=>{});let w=ot();try{z.register(yr,w)}catch(T){t("register %s store failed: %o",yr,T)}try{let T=await fe.subscribeList(yr,w);st.set(yr,T)}catch(T){t("re-subscribe %s failed: %o",yr,T),Re(T,"board")}}async function lt(c){if(!Lt(c)||c===De)return;De=c;let _=Ye.get(wr);if(!_)return;Ye.delete(wr),await _().catch(()=>{});let w=et();try{z.register(wr,w)}catch(T){t("register %s store failed: %o",wr,T)}try{let T=await fe.subscribeList(wr,w);Ye.set(wr,T)}catch(T){t("re-subscribe %s failed: %o",wr,T),Re(T,"worker")}}let Ye=new Map,at=null,K=null,qe=null,Ue=null,bt=null;async function dr(){Ue=null,re.clear(),bt=null,C.clear(),at=null,K=null,st.clear(),Ye.clear(),A.board+=1,A.worker+=1,Et();let c=p.getState().workspace.current?.path;if(c)try{await be.send("set-workspace",{path:c})}catch(w){t("workspace restore after reconnect failed: %o",w);return}ye();let _=p.getState();ut(_.view==="board"),ct(_.view==="worker"),we(_.view==="monitor"),Y(_.view==="board"||_.view==="worker"||!!_.selected_id)}async function ur(){t("clearing all subscriptions for workspace switch"),_t(),U(),ge(),q.clear(),Ae(),Ke(),mt(),ye(),ke();let c=p.getState();if(c.selected_id)try{z.unregister(`detail:${c.selected_id}`)}catch{}let _=p.getState();ut(_.view==="board"),ct(_.view==="worker"),we(_.view==="monitor"),Y(_.view==="board"||_.view==="worker"||!!_.selected_id),_.selected_id&&Qe(_.selected_id)}async function dt(c){t("requesting workspace switch to %s",c),oe=!0;try{let _=await be.send("set-workspace",{path:c});t("workspace switch result: %o",_),_&&_.workspace&&(p.setState({workspace:{current:{path:_.workspace.root_dir,database:_.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",c),_.changed&&(await ur(),ee("Switched to "+Ht(c),"success",2e3)))}catch(_){throw t("workspace switch failed: %o",_),ee("Failed to switch workspace","error",3e3),_}finally{oe=!1}}async function vt(c){t("requesting workspace git pull for %s",c);try{let _=await be.send("git-pull-workspace",{});t("workspace git pull result: %o",_);let w=_?.status;if(w==="up_to_date"){ee("Already up to date","success",2e3);return}if(w==="stash_pop_conflict"){ee("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}ee("Git pulled "+Ht(c),"success",2e3)}catch(_){t("workspace git pull failed: %o",_);let w=_?.code,T=_?.message;if(w==="rebase_conflict"){ee("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(w==="rebase_conflict_abort_failed"){ee("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(w==="busy"){ee("Git pull skipped: another operation is running","warning",3e3);return}let J=T?`: ${T}`:"";throw ee(`Git pull failed${J}`,"error",3e3),_}}async function Qt(c,_){t("setting workspace visibility %s \u2192 %s",c,String(_));try{await be.send("set-workspace-visibility",{path:c,visible:_}),await Ct()}catch(w){t("workspace visibility update failed: %o",w),ee("Failed to update project visibility","error",3e3)}}async function Ct(){try{let c=await be.send("list-workspaces",{});if(t("workspaces loaded: %o",c),c&&Array.isArray(c.workspaces)){let _=c.workspaces.map(ve=>({path:ve.path,database:ve.database,pid:ve.pid,version:ve.version})),w=c.current?{path:c.current.root_dir,database:c.current.db_path}:null,T=Array.isArray(c.hidden)?c.hidden.filter(ve=>typeof ve=="string"):[];p.setState({workspace:{current:w,available:_,hidden:T}});let J=window.localStorage.getItem("beads-ui.workspace");J&&(!_.some(Pe=>Pe.path===J)||T.includes(J)?window.localStorage.removeItem("beads-ui.workspace"):w&&J!==w.path&&(t("restoring saved workspace preference: %s",J),await dt(J)))}}catch(c){t("failed to load workspaces: %o",c)}}be.on("workspace-changed",c=>{t("workspace-changed event: %o",c),c&&c.root_dir&&(p.setState({workspace:{current:{path:c.root_dir,database:c.db_path}}}),Ct(),ur())});let Gt=!1;if(typeof be.onConnection=="function"){let c=_=>{t("ws state %s",_),_==="reconnecting"||_==="closed"?(Gt=!0,ee("Connection lost. Reconnecting\u2026","error",4e3)):_==="open"&&Gt&&(Gt=!1,ee("Reconnected","success",2200),g_(p,(w,T)=>{t(`${w}: %o`,T)}),dr())};be.onConnection(c)}let gt="board";try{let c=window.localStorage.getItem("beads-ui.view");(c==="board"||c==="worker"||c==="monitor")&&(gt=c)}catch(c){t("view parse error: %o",c)}let p=Xa({config:m_(),view:gt});be.on("worker-queue-snapshot",c=>{let _=c;if(!_||!_.queue)return;let w=p.getState().workspace.current?.path;if(typeof w=="string"&&w.length>0&&_.root_dir!==w){t("dropping worker-queue snapshot for %s",String(_.root_dir));return}try{q.set(_.queue)}catch{}});let v=Ka(p);v.start();let D=new Set(["get-comments","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","get-session-defaults","set-session-defaults"]),ae=async(c,_)=>{try{return await xe(c,_)}catch(w){if(D.has(c))throw w;return[]}};n&&Jl(n,p,v);let he=document.getElementById("workspace-picker");he&&Ac(he,p,dt,vt,Qt);let W=nc(e,(c,_)=>xe(c,_));try{let c=document.getElementById("new-issue-btn");c&&c.addEventListener("click",()=>W.open())}catch{}let g=ic(e,{policyStore:re,queueStore:q,implPresetStore:C,transport:(c,_)=>xe(c,_),onOpenChange:c=>{le=c,Ee()},labelOptions:()=>{let c=new Set;for(let[_]of Go)for(let w of z.snapshotFor(_)||[]){let T=w.labels;if(Array.isArray(T))for(let J of T)typeof J=="string"&&J.length>0&&c.add(J)}return Array.from(c).sort()}});try{let c=document.getElementById("display-settings-btn");c&&(c.setAttribute("aria-label","\uC124\uC815"),c.setAttribute("title","\uC124\uC815"),c.addEventListener("click",()=>g.open()))}catch{}let P=ii(o,{gotoIssue:c=>v.gotoIssue(c),issueStores:z,transport:ae,workerQueueStore:q,uiOrderStore:te,displayPolicyStore:re,closedRange:$e,onClosedRangeChange:c=>{St(c)},onNewIssue:()=>W.open()}),G=Wo(a,{transport:ae,issueStores:z,queueStore:q,execPresetStore:C,sessionLogStore:B,uiOrderStore:te,gotoIssue:c=>p.setState({selected_id:c}),getWorkspacePath:()=>p.getState().workspace.current?.path,doneRange:De,onDoneRangeChange:c=>{lt(c)}}),Se=Ql(d,{transport:ae,pipelineStore:Te,execPresetStore:C,gotoIssue:c=>v.gotoIssue(c),getWorkspacePath:()=>p.getState().workspace.current?.path,switchWorkspace:c=>dt(c)}),He=Sl(l,{issueStores:z,transport:ae,queueStore:q,execPresetStore:C,sessionLogStore:B,getWorkspacePath:()=>p.getState().workspace.current?.path,onNavigate:c=>{p.getState().view==="worker"?p.setState({selected_id:c}):v.gotoIssue(c)},onClose:()=>{let c=p.getState();p.setState({selected_id:null});try{v.gotoView(c.view==="worker"||c.view==="monitor"?c.view:"board")}catch{}},onOpenExecPresets:()=>{g.open("session")}}),je=p.getState().selected_id;je&&(l.hidden=!1,He.load(je),Qe(je)),p.subscribe(c=>{let _=c.selected_id;_?(l.hidden=!1,He.load(_),oe||Qe(_)):(He.clear(),l.hidden=!0,ke())});let _e=c=>{o.hidden=c.view!=="board",a.hidden=c.view!=="worker",d.hidden=c.view!=="monitor",ut(c.view==="board"),ct(c.view==="worker"),we(c.view==="monitor"),Y(c.view==="board"||c.view==="worker"||le||!!c.selected_id),!c.selected_id&&c.view==="board"&&P.load(),c.view==="worker"&&G.load(),c.view==="monitor"?Se.load():Se.pause(),window.localStorage.setItem("beads-ui.view",c.view)};p.subscribe(_e),_e(p.getState()),Ke(),ye(),Et(),Ct().finally(()=>{Z=!0,R()}),window.addEventListener("keydown",c=>{let _=c.ctrlKey||c.metaKey,w=String(c.key||"").toLowerCase(),T=c.target,J=T&&T.tagName?String(T.tagName).toLowerCase():"",ve=J==="input"||J==="textarea"||J==="select"||T&&typeof T.isContentEditable=="boolean"&&T.isContentEditable;_&&w==="n"&&(ve||(c.preventDefault(),W.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let r=window.localStorage.getItem("beads-ui.theme"),n=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=r==="dark"||r==="light"?r:n?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let r=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",r),window.localStorage.setItem("beads-ui.theme",r)});let t=document.getElementById("app");t&&b_(t)});export{b_ as bootstrap,m_ as readBootstrapConfig,g_ as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
