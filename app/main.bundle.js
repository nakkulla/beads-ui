var Si=Object.create;var Sr=Object.defineProperty;var Ai=Object.getOwnPropertyDescriptor;var Ti=Object.getOwnPropertyNames;var Ei=Object.getPrototypeOf,Ci=Object.prototype.hasOwnProperty;var Ri=(e,t,n)=>t in e?Sr(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var Ar=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var Ii=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of Ti(t))!Ci.call(e,s)&&s!==n&&Sr(e,s,{get:()=>t[s],enumerable:!(r=Ai(t,s))||r.enumerable});return e};var Li=(e,t,n)=>(n=e!=null?Si(Ei(e)):{},Ii(t||!e||!e.__esModule?Sr(n,"default",{value:e,enumerable:!0}):n,e));var He=(e,t,n)=>Ri(e,typeof t!="symbol"?t+"":t,n);var ro=Ar((gu,no)=>{var un=1e3,pn=un*60,fn=pn*60,Xt=fn*24,Pi=Xt*7,Fi=Xt*365.25;no.exports=function(e,t){t=t||{};var n=typeof e;if(n==="string"&&e.length>0)return qi(e);if(n==="number"&&isFinite(e))return t.long?Ui(e):Bi(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function qi(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var n=parseFloat(t[1]),r=(t[2]||"ms").toLowerCase();switch(r){case"years":case"year":case"yrs":case"yr":case"y":return n*Fi;case"weeks":case"week":case"w":return n*Pi;case"days":case"day":case"d":return n*Xt;case"hours":case"hour":case"hrs":case"hr":case"h":return n*fn;case"minutes":case"minute":case"mins":case"min":case"m":return n*pn;case"seconds":case"second":case"secs":case"sec":case"s":return n*un;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return n;default:return}}}}function Bi(e){var t=Math.abs(e);return t>=Xt?Math.round(e/Xt)+"d":t>=fn?Math.round(e/fn)+"h":t>=pn?Math.round(e/pn)+"m":t>=un?Math.round(e/un)+"s":e+"ms"}function Ui(e){var t=Math.abs(e);return t>=Xt?Zn(e,t,Xt,"day"):t>=fn?Zn(e,t,fn,"hour"):t>=pn?Zn(e,t,pn,"minute"):t>=un?Zn(e,t,un,"second"):e+" ms"}function Zn(e,t,n,r){var s=t>=n*1.5;return Math.round(e/n)+" "+r+(s?"s":"")}});var oo=Ar((bu,so)=>{function zi(e){n.debug=n,n.default=n,n.coerce=i,n.disable=a,n.enable=s,n.enabled=l,n.humanize=ro(),n.destroy=d,Object.keys(e).forEach(f=>{n[f]=e[f]}),n.names=[],n.skips=[],n.formatters={};function t(f){let _=0;for(let b=0;b<f.length;b++)_=(_<<5)-_+f.charCodeAt(b),_|=0;return n.colors[Math.abs(_)%n.colors.length]}n.selectColor=t;function n(f){let _,b=null,y,$;function g(...R){if(!g.enabled)return;let H=g,z=Number(new Date),Y=z-(_||z);H.diff=Y,H.prev=_,H.curr=z,_=z,R[0]=n.coerce(R[0]),typeof R[0]!="string"&&R.unshift("%O");let M=0;R[0]=R[0].replace(/%([a-zA-Z%])/g,(S,L)=>{if(S==="%%")return"%";M++;let x=n.formatters[L];if(typeof x=="function"){let G=R[M];S=x.call(H,G),R.splice(M,1),M--}return S}),n.formatArgs.call(H,R),(H.log||n.log).apply(H,R)}return g.namespace=f,g.useColors=n.useColors(),g.color=n.selectColor(f),g.extend=r,g.destroy=n.destroy,Object.defineProperty(g,"enabled",{enumerable:!0,configurable:!1,get:()=>b!==null?b:(y!==n.namespaces&&(y=n.namespaces,$=n.enabled(f)),$),set:R=>{b=R}}),typeof n.init=="function"&&n.init(g),g}function r(f,_){let b=n(this.namespace+(typeof _>"u"?":":_)+f);return b.log=this.log,b}function s(f){n.save(f),n.namespaces=f,n.names=[],n.skips=[];let _=(typeof f=="string"?f:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let b of _)b[0]==="-"?n.skips.push(b.slice(1)):n.names.push(b)}function o(f,_){let b=0,y=0,$=-1,g=0;for(;b<f.length;)if(y<_.length&&(_[y]===f[b]||_[y]==="*"))_[y]==="*"?($=y,g=b,y++):(b++,y++);else if($!==-1)y=$+1,g++,b=g;else return!1;for(;y<_.length&&_[y]==="*";)y++;return y===_.length}function a(){let f=[...n.names,...n.skips.map(_=>"-"+_)].join(",");return n.enable(""),f}function l(f){for(let _ of n.skips)if(o(f,_))return!1;for(let _ of n.names)if(o(f,_))return!0;return!1}function i(f){return f instanceof Error?f.stack||f.message:f}function d(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return n.enable(n.load()),n}so.exports=zi});var ao=Ar((bt,Xn)=>{bt.formatArgs=Wi;bt.save=Gi;bt.load=ji;bt.useColors=Hi;bt.storage=Yi();bt.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();bt.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function Hi(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function Wi(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+Xn.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let n=0,r=0;e[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(n++,s==="%c"&&(r=n))}),e.splice(r,0,t)}bt.log=console.debug||console.log||(()=>{});function Gi(e){try{e?bt.storage.setItem("debug",e):bt.storage.removeItem("debug")}catch{}}function ji(){let e;try{e=bt.storage.getItem("debug")||bt.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function Yi(){try{return localStorage}catch{}}Xn.exports=oo()(bt);var{formatters:Vi}=Xn.exports;Vi.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var yn=globalThis,Kn=yn.trustedTypes,Hs=Kn?Kn.createPolicy("lit-html",{createHTML:e=>e}):void 0,Ks="$lit$",Ut=`lit$${Math.random().toFixed(9).slice(2)}$`,Zs="?"+Ut,Di=`<${Zs}>`,Kt=document,$n=()=>Kt.createComment(""),xn=e=>e===null||typeof e!="object"&&typeof e!="function",Dr=Array.isArray,Oi=e=>Dr(e)||typeof e?.[Symbol.iterator]=="function",Tr=`[ 	
\f\r]`,kn=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ws=/-->/g,Gs=/>/g,Yt=RegExp(`>|${Tr}(?:([^\\s"'>=/]+)(${Tr}*=${Tr}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),js=/'/g,Ys=/"/g,Xs=/^(?:script|style|textarea|title)$/i,Or=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),c=Or(1),Ot=Or(2),uu=Or(3),Zt=Symbol.for("lit-noChange"),Je=Symbol.for("lit-nothing"),Vs=new WeakMap,Vt=Kt.createTreeWalker(Kt,129);function Qs(e,t){if(!Dr(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return Hs!==void 0?Hs.createHTML(t):t}var Mi=(e,t)=>{let n=e.length-1,r=[],s,o=t===2?"<svg>":t===3?"<math>":"",a=kn;for(let l=0;l<n;l++){let i=e[l],d,f,_=-1,b=0;for(;b<i.length&&(a.lastIndex=b,f=a.exec(i),f!==null);)b=a.lastIndex,a===kn?f[1]==="!--"?a=Ws:f[1]!==void 0?a=Gs:f[2]!==void 0?(Xs.test(f[2])&&(s=RegExp("</"+f[2],"g")),a=Yt):f[3]!==void 0&&(a=Yt):a===Yt?f[0]===">"?(a=s??kn,_=-1):f[1]===void 0?_=-2:(_=a.lastIndex-f[2].length,d=f[1],a=f[3]===void 0?Yt:f[3]==='"'?Ys:js):a===Ys||a===js?a=Yt:a===Ws||a===Gs?a=kn:(a=Yt,s=void 0);let y=a===Yt&&e[l+1].startsWith("/>")?" ":"";o+=a===kn?i+Di:_>=0?(r.push(d),i.slice(0,_)+Ks+i.slice(_)+Ut+y):i+Ut+(_===-2?l:y)}return[Qs(e,o+(e[n]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),r]},Sn=class e{constructor({strings:t,_$litType$:n},r){let s;this.parts=[];let o=0,a=0,l=t.length-1,i=this.parts,[d,f]=Mi(t,n);if(this.el=e.createElement(d,r),Vt.currentNode=this.el.content,n===2||n===3){let _=this.el.content.firstChild;_.replaceWith(..._.childNodes)}for(;(s=Vt.nextNode())!==null&&i.length<l;){if(s.nodeType===1){if(s.hasAttributes())for(let _ of s.getAttributeNames())if(_.endsWith(Ks)){let b=f[a++],y=s.getAttribute(_).split(Ut),$=/([.?@])?(.*)/.exec(b);i.push({type:1,index:o,name:$[2],strings:y,ctor:$[1]==="."?Cr:$[1]==="?"?Rr:$[1]==="@"?Ir:cn}),s.removeAttribute(_)}else _.startsWith(Ut)&&(i.push({type:6,index:o}),s.removeAttribute(_));if(Xs.test(s.tagName)){let _=s.textContent.split(Ut),b=_.length-1;if(b>0){s.textContent=Kn?Kn.emptyScript:"";for(let y=0;y<b;y++)s.append(_[y],$n()),Vt.nextNode(),i.push({type:2,index:++o});s.append(_[b],$n())}}}else if(s.nodeType===8)if(s.data===Zs)i.push({type:2,index:o});else{let _=-1;for(;(_=s.data.indexOf(Ut,_+1))!==-1;)i.push({type:7,index:o}),_+=Ut.length-1}o++}}static createElement(t,n){let r=Kt.createElement("template");return r.innerHTML=t,r}};function ln(e,t,n=e,r){if(t===Zt)return t;let s=r!==void 0?n._$Co?.[r]:n._$Cl,o=xn(t)?void 0:t._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(e),s._$AT(e,n,r)),r!==void 0?(n._$Co??(n._$Co=[]))[r]=s:n._$Cl=s),s!==void 0&&(t=ln(e,s._$AS(e,t.values),s,r)),t}var Er=class{constructor(t,n){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:n},parts:r}=this._$AD,s=(t?.creationScope??Kt).importNode(n,!0);Vt.currentNode=s;let o=Vt.nextNode(),a=0,l=0,i=r[0];for(;i!==void 0;){if(a===i.index){let d;i.type===2?d=new An(o,o.nextSibling,this,t):i.type===1?d=new i.ctor(o,i.name,i.strings,this,t):i.type===6&&(d=new Lr(o,this,t)),this._$AV.push(d),i=r[++l]}a!==i?.index&&(o=Vt.nextNode(),a++)}return Vt.currentNode=Kt,s}p(t){let n=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,n),n+=r.strings.length-2):r._$AI(t[n])),n++}},An=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,n,r,s){this.type=2,this._$AH=Je,this._$AN=void 0,this._$AA=t,this._$AB=n,this._$AM=r,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,n=this._$AM;return n!==void 0&&t?.nodeType===11&&(t=n.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,n=this){t=ln(this,t,n),xn(t)?t===Je||t==null||t===""?(this._$AH!==Je&&this._$AR(),this._$AH=Je):t!==this._$AH&&t!==Zt&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Oi(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==Je&&xn(this._$AH)?this._$AA.nextSibling.data=t:this.T(Kt.createTextNode(t)),this._$AH=t}$(t){let{values:n,_$litType$:r}=t,s=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=Sn.createElement(Qs(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===s)this._$AH.p(n);else{let o=new Er(s,this),a=o.u(this.options);o.p(n),this.T(a),this._$AH=o}}_$AC(t){let n=Vs.get(t.strings);return n===void 0&&Vs.set(t.strings,n=new Sn(t)),n}k(t){Dr(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,s=0;for(let o of t)s===n.length?n.push(r=new e(this.O($n()),this.O($n()),this,this.options)):r=n[s],r._$AI(o),s++;s<n.length&&(this._$AR(r&&r._$AB.nextSibling,s),n.length=s)}_$AR(t=this._$AA.nextSibling,n){for(this._$AP?.(!1,!0,n);t!==this._$AB;){let r=t.nextSibling;t.remove(),t=r}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},cn=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,n,r,s,o){this.type=1,this._$AH=Je,this._$AN=void 0,this.element=t,this.name=n,this._$AM=s,this.options=o,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=Je}_$AI(t,n=this,r,s){let o=this.strings,a=!1;if(o===void 0)t=ln(this,t,n,0),a=!xn(t)||t!==this._$AH&&t!==Zt,a&&(this._$AH=t);else{let l=t,i,d;for(t=o[0],i=0;i<o.length-1;i++)d=ln(this,l[r+i],n,i),d===Zt&&(d=this._$AH[i]),a||(a=!xn(d)||d!==this._$AH[i]),d===Je?t=Je:t!==Je&&(t+=(d??"")+o[i+1]),this._$AH[i]=d}a&&!s&&this.j(t)}j(t){t===Je?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Cr=class extends cn{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Je?void 0:t}},Rr=class extends cn{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==Je)}},Ir=class extends cn{constructor(t,n,r,s,o){super(t,n,r,s,o),this.type=5}_$AI(t,n=this){if((t=ln(this,t,n,0)??Je)===Zt)return;let r=this._$AH,s=t===Je&&r!==Je||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,o=t!==Je&&(r===Je||s);s&&this.element.removeEventListener(this.name,this,r),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Lr=class{constructor(t,n,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=n,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){ln(this,t)}};var Ni=yn.litHtmlPolyfillSupport;Ni?.(Sn,An),(yn.litHtmlVersions??(yn.litHtmlVersions=[])).push("3.3.1");var Le=(e,t,n)=>{let r=n?.renderBefore??t,s=r._$litPart$;if(s===void 0){let o=n?.renderBefore??null;r._$litPart$=s=new An(t.insertBefore($n(),o),o,void 0,n??{})}return s._$AI(e),s};var kt="today",Rt=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}];function Mt(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function dn(e,t=Date.now()){switch(e){case"today":{let n=new Date(t);return n.setHours(0,0,0,0),n.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function Js(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function eo(){let e=null,t=[],n=new Set;function r(){for(let s of Array.from(n))try{s()}catch{}}return{get(){return e},getWorkspacesState(){return t},set(s,o){e=Array.isArray(s)?s:null,t=Array.isArray(o)?o:[],r()},clear(){e=null,t=[],r()},subscribe(s){return n.add(s),()=>n.delete(s)}}}function to(){let e=new Map,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{set(r,s,o=null){e.set(r,{lines:Array.isArray(s)?[...s]:[],last_event_at:typeof o=="number"?o:null}),n()},append(r,s){let o=e.get(r)||{lines:[],last_event_at:null};o.lines=[...o.lines,s],o.last_event_at=Date.now(),e.set(r,o),n()},get(r){return e.get(r)||null},clear(r){typeof r=="string"?e.delete(r):e.clear(),n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}var io=Li(ao(),1);function Ve(e){return(0,io.default)(`beads-ui:${e}`)}function $t(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function Qt(e,t){let n=$t(e.created_at),r=$t(t.created_at);if(n!==r)return n<r?1:-1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,l=t.id;return a<l?-1:a>l?1:0}function uo(e,t){let n=$t(e.created_at),r=$t(t.created_at);if(n!==r)return n<r?-1:1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,l=t.id;return a<l?-1:a>l?1:0}function po(e,t){let n=$t(e.updated_at),r=$t(t.updated_at);if(n!==r)return n<r?1:-1;let s=e.id,o=t.id;return s<o?-1:s>o?1:0}function fo(e,t){let n=e.priority??2,r=t.priority??2;if(n!==r)return n-r;let s=$t(e.created_at),o=$t(t.created_at);if(s!==o)return s<o?1:-1;let a=e.id,l=t.id;return a<l?-1:a>l?1:0}function _o(e,t){let n=e.closed_at??0,r=t.closed_at??0;if(n!==r)return n<r?1:-1;let s=e?.id,o=t?.id;return s<o?-1:s>o?1:0}var Ki=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function lo(e){let t=e&&e.metadata,n=t?t.task_order:void 0;if(n==null||n==="")return Number.POSITIVE_INFINITY;let r=Number(n);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function co(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let n=Ki.exec(t);if(!n)return Number.POSITIVE_INFINITY;let r=Number(n[1]);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function ho(e,t){let n=lo(e),r=lo(t);if(n!==r)return n<r?-1:1;let s=co(e),o=co(t);if(s!==o)return s<o?-1:1;let a=$t(e&&e.created_at),l=$t(t&&t.created_at);if(a!==l)return a<l?-1:1;let i=e&&e.id,d=t&&t.id;return i===d?0:String(i)<String(d)?-1:1}var Mr=2**20;function _n(e,t){let n=e&&e.id;return t&&typeof n=="string"&&Object.prototype.hasOwnProperty.call(t,n)&&typeof t[n]=="number"&&Number.isFinite(t[n])?t[n]:-$t(e&&e.created_at)}function Qn(e){return(t,n)=>{let r=_n(t,e),s=_n(n,e);if(r!==s)return r<s?-1:1;let o=t?.id,a=n?.id;return o<a?-1:o>a?1:0}}function Nr(e,t,n){let r=Array.isArray(e)?e:[],s=r.length,o=Math.max(0,Math.min(t,s-1)),a=o-1>=0?r[o-1]:null,l=o+1<s?r[o+1]:null;if(!a&&!l)return{rank:0};if(!a)return{rank:_n(l,n)-Mr};if(!l)return{rank:_n(a,n)+Mr};let i=_n(a,n),d=_n(l,n),f=(i+d)/2;return i<f&&f<d?{rank:f}:{renormalize:r.map((_,b)=>({bead_id:_.id,rank:b*Mr}))}}function Pr(e,t={}){let n=Ve(`issue-store:${e}`),r=new Map,s=[],o=0,a=new Set,l=!1,i=t.sort||Qt;function d(){for(let b of Array.from(a))try{b()}catch{}}function f(){s=Array.from(r.values()).sort(i)}function _(b){if(l||!b||b.id!==e)return;let y=Number(b.revision)||0;if(n("apply %s rev=%d",b.type,y),!(y<=o&&b.type!=="snapshot")){if(b.type==="snapshot"){if(y<=o)return;r.clear();let $=Array.isArray(b.issues)?b.issues:[];for(let g of $)g&&typeof g.id=="string"&&g.id.length>0&&r.set(g.id,g);f(),o=y,d();return}if(b.type==="upsert"){let $=b.issue;if($&&typeof $.id=="string"&&$.id.length>0){let g=r.get($.id);if(!g)r.set($.id,$);else{let R=Number.isFinite(g.updated_at)?g.updated_at:0,H=Number.isFinite($.updated_at)?$.updated_at:0;if(R<=H){for(let z of Object.keys(g))z in $||delete g[z];for(let[z,Y]of Object.entries($))g[z]=Y}}f()}o=y,d()}else if(b.type==="delete"){let $=String(b.issue_id||"");$&&(r.delete($),f()),o=y,d()}}}return{id:e,subscribe(b){return a.add(b),()=>{a.delete(b)}},applyPush:_,snapshot(){return s},size(){return r.size},getById(b){return r.get(b)},dispose(){l=!0,r.clear(),s=[],a.clear(),o=0}}}function Jn(e){let t=String(e.type||"").trim(),n={};if(e.params&&typeof e.params=="object"){let s=Object.keys(e.params).sort();for(let o of s){let a=e.params[o];n[o]=String(a)}}let r=new URLSearchParams(n).toString();return r.length>0?`${t}?${r}`:t}function mo(e){let t=Ve("subs"),n=new Map,r=new Map;function s(l,i){t("applyDelta %s +%d ~%d -%d",l,(i.added||[]).length,(i.updated||[]).length,(i.removed||[]).length);let d=r.get(l);if(!d||d.size===0)return;let f=Array.isArray(i.added)?i.added:[],_=Array.isArray(i.updated)?i.updated:[],b=Array.isArray(i.removed)?i.removed:[];for(let y of Array.from(d)){let $=n.get(y);if(!$)continue;let g=$.itemsById;for(let R of f)typeof R=="string"&&R.length>0&&g.set(R,!0);for(let R of _)typeof R=="string"&&R.length>0&&g.set(R,!0);for(let R of b)typeof R=="string"&&R.length>0&&g.delete(R)}}async function o(l,i){let d=Jn(i);if(t("subscribe %s key=%s",l,d),!n.has(l))n.set(l,{key:d,itemsById:new Map});else{let _=n.get(l);if(_&&_.key!==d){let b=r.get(_.key);b&&(b.delete(l),b.size===0&&r.delete(_.key)),n.set(l,{key:d,itemsById:new Map})}}r.has(d)||r.set(d,new Set);let f=r.get(d);f&&f.add(l);try{await e("subscribe-list",{id:l,type:i.type,params:i.params})}catch(_){let b=n.get(l)||null;if(b){let y=r.get(b.key);y&&(y.delete(l),y.size===0&&r.delete(b.key))}throw n.delete(l),_}return async()=>{t("unsubscribe %s key=%s",l,d);try{await e("unsubscribe-list",{id:l})}catch{}let _=n.get(l)||null;if(_){let b=r.get(_.key);b&&(b.delete(l),b.size===0&&r.delete(_.key))}n.delete(l)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:Jn,selectors:{getIds(l){let i=n.get(l);return i?Array.from(i.itemsById.keys()):[]},has(l,i){let d=n.get(l);return d?d.itemsById.has(i):!1},count(l){let i=n.get(l);return i?i.itemsById.size:0},getItemsById(l){let i=n.get(l),d={};if(!i)return d;for(let f of i.itemsById.keys())d[f]=!0;return d}}}}function go(){let e=Ve("issue-stores"),t=new Map,n=new Map,r=new Set,s=new Map;function o(){for(let i of Array.from(r))try{i()}catch{}}function a(i,d,f){let _=d?Jn(d):"",b=n.get(i)||"",y=t.has(i);if(e("register %s key=%s (prev=%s)",i,_,b),y&&b&&_&&b!==_){let $=t.get(i);if($)try{$.dispose()}catch{}let g=s.get(i);if(g){try{g()}catch{}s.delete(i)}let R=Pr(i,f);t.set(i,R);let H=R.subscribe(()=>o());s.set(i,H)}else if(!y){let $=Pr(i,f);t.set(i,$);let g=$.subscribe(()=>o());s.set(i,g)}return n.set(i,_),()=>l(i)}function l(i){e("unregister %s",i),n.delete(i);let d=t.get(i);d&&(d.dispose(),t.delete(i));let f=s.get(i);if(f){try{f()}catch{}s.delete(i)}}return{register:a,unregister:l,getStore(i){return t.get(i)||null},snapshotFor(i){let d=t.get(i);return d?d.snapshot().slice():[]},subscribe(i){return r.add(i),()=>r.delete(i)}}}function bo(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function vo(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Fr(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function Zi(e){let t=String(e||""),n=t.startsWith("#")?t.slice(1):t,r=n.indexOf("?"),s=r>=0?n.slice(r+1):"";if(s){let l=new URLSearchParams(s).get("issue");if(l)return decodeURIComponent(l)}let o=/^\/issue\/([^\s?#]+)/.exec(n);return o&&o[1]?decodeURIComponent(o[1]):null}function Xi(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function wo(e){let t=Ve("router"),n=()=>{let r=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(r),o=s&&s[1]?decodeURIComponent(s[1]):Zi(r),a=Xi(r);if(t("hash change \u2192 view=%s id=%s",a,o),e.setState({selected_id:a==="worker"?null:o,view:a,worker:{selected_parent_id:a==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(r)){let i=o?`#/${a}?issue=${encodeURIComponent(o)}`:`#/${a}`;window.location.hash!==i&&(window.location.hash=i)}};return{start(){window.addEventListener("hashchange",n),n()},stop(){window.removeEventListener("hashchange",n)},gotoIssue(r){let s=e.getState?e.getState():{view:"board"},o=s.view==="worker"||s.view==="monitor"?s.view:"board",a=Fr(o,r);t("goto issue %s (view=%s)",r,o),window.location.hash!==a?window.location.hash=a:e.setState({selected_id:o==="worker"?null:r,view:o,worker:{selected_parent_id:o==="worker"?r:null}})},gotoView(r){let s=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},o=r==="worker"?s.worker?.selected_parent_id:s.selected_id,a=o?Fr(r,o):`#/${r}`;t("goto view %s (id=%s)",r,o||""),window.location.hash!==a?window.location.hash=a:e.setState({view:r,selected_id:r==="worker"?null:s.selected_id})}}}var Qi=Object.freeze({workspace_config:{default_workspace:null}});function ko(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:Qi.workspace_config.default_workspace}}}function yo(e={}){let t=Ve("state"),n={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today",show_deferred_column:e.board?.show_deferred_column===!0},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:ko(e.config)},r=new Set;function s(){for(let o of Array.from(r))try{o(n)}catch{}}return{getState(){return n},setState(o){let a={...n,...o,filters:{...n.filters,...o.filters||{}},board:{...n.board,...o.board||{}},worker:{...n.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:n.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:n.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:n.workspace.hidden},config:o.config!==void 0?ko(o.config):n.config},l=a.workspace.current?.path!==n.workspace.current?.path||a.workspace.available.length!==n.workspace.available.length||a.workspace.hidden.length!==n.workspace.hidden.length||a.workspace.hidden.some((d,f)=>d!==n.workspace.hidden[f]),i=a.config.workspace_config.default_workspace!==n.config.workspace_config.default_workspace;a.selected_id===n.selected_id&&a.view===n.view&&a.filters.status===n.filters.status&&a.filters.search===n.filters.search&&a.filters.type===n.filters.type&&a.board.closed_filter===n.board.closed_filter&&a.board.show_deferred_column===n.board.show_deferred_column&&a.worker.selected_parent_id===n.worker.selected_parent_id&&a.worker.show_closed_children.length===n.worker.show_closed_children.length&&a.worker.show_closed_children.every((d,f)=>d===n.worker.show_closed_children[f])&&!l&&!i||(n=a,t("state change %o",{selected_id:n.selected_id,view:n.view,filters:n.filters,board:n.board,worker:n.worker,workspace:n.workspace.current?.path,config:{default_workspace:n.config.workspace_config.default_workspace}}),s())},subscribe(o){return r.add(o),()=>r.delete(o)}}}function $o(e){let t=Ve("activity"),n=0,r=new Map,s=1;function o(){if(!e)return;let d=n>0;e.toggleAttribute("hidden",!d),e.setAttribute("aria-busy",d?"true":"false")}function a(){n+=1,t("start count=%d",n),o()}function l(){let d=n;n=Math.max(0,n-1),d<=0?t("done called but count was already %d",d):t("done count=%d\u2192%d",d,n),o()}function i(d){return async(_,b)=>{let y=s++,$=Date.now();r.set(y,{type:_,start_ts:$}),t("request start id=%d type=%s count=%d",y,_,n+1),a();let g=!1,R=()=>{g||(g=!0,r.delete(y),l())},H=setTimeout(()=>{g||(t("request TIMEOUT id=%d type=%s elapsed=%dms",y,_,Date.now()-$),R())},3e4);try{let z=await d(_,b),Y=Date.now()-$;return t("request done id=%d type=%s elapsed=%dms",y,_,Y),z}catch(z){let Y=Date.now()-$;throw t("request error id=%d type=%s elapsed=%dms err=%o",y,_,Y,z),z}finally{clearTimeout(H),R()}}}return o(),{wrapSend:i,start:a,done:l,getCount:()=>n,getActiveRequests:()=>{let d=Date.now();return Array.from(r.entries()).map(([f,_])=>({id:f,type:_.type,elapsed_ms:d-_.start_ts}))}}}function ie(e,t="info",n=2800){let r=document.createElement("div");r.className="toast",r.textContent=e,r.style.position="fixed",r.style.right="12px",r.style.bottom="12px",r.style.zIndex="1000",r.style.color="#fff",r.style.padding="8px 10px",r.style.borderRadius="4px",r.style.fontSize="12px",t==="success"?r.style.background="#156d36":t==="warning"?r.style.background="#a36a00":t==="error"?r.style.background="#9f2011":r.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(r),setTimeout(()=>{try{r.remove()}catch{}},n)}function er(e=void 0,t=void 0){function n(){if(!t||typeof t.get!="function")return null;let o=t.get();return o&&o.order?o.order:{}}function r(o,a,l){let i=e&&e.snapshotFor?e.snapshotFor(o).slice():[];if(a==="closed")return i.sort(_o),i;switch(l){case"created_desc":return i.sort(Qt),i;case"created_asc":return i.sort(uo),i;case"updated_desc":return i.sort(po),i;case"priority":return i.sort(fo),i;case"manual":default:{let d=n();return d?i.sort(Qn(d)):i.sort(Qt),i}}}function s(o){let a=[];return e&&typeof e.subscribe=="function"&&a.push(e.subscribe(o)),t&&typeof t.subscribe=="function"&&a.push(t.subscribe(o)),()=>{for(let l of a)try{l()}catch{}}}return{selectBoardColumn:r,subscribe:s}}function Tn(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function dt(e){let t=Tn(e);if(t===null)return"";let n=new Date(t),r=s=>String(s).padStart(2,"0");return`${n.getFullYear()}-${r(n.getMonth()+1)}-${r(n.getDate())} ${r(n.getHours())}:${r(n.getMinutes())}`}function wt(e,t){let n=Tn(e);if(n===null)return"";let s=(typeof t=="number"?t:Date.now())-n;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let a=Math.floor(s/36e5);if(a<24)return`${a}\uC2DC\uAC04 \uC804`;let l=Math.floor(s/864e5);if(l<7)return`${l}\uC77C \uC804`;let i=Math.floor(l/7);if(l<30)return`${i}\uC8FC \uC804`;let d=Math.floor(l/30);return d<12?`${d}\uAC1C\uC6D4 \uC804`:`${Math.floor(l/365)}\uB144 \uC804`}function tr(e){if(!Array.isArray(e))return null;let t=null,n=-1;for(let r of e){if(!r||r.status!=="in_progress")continue;let s=Tn(r.updated_at)??0;if(t===null||s>n){t=r,n=s;continue}s===n&&String(r.id)<String(t.id)&&(t=r)}return t}function nr(e){let t=e.transport,n=e.uiOrderStore;function r(a,l){return"renormalize"in a?a.renormalize:[{bead_id:l,rank:a.rank}]}function s(a,l){let i={...a.order};for(let d of l)i[d.bead_id]=d.rank;n&&n.set({revision:a.revision,order:i})}async function o(a,l,i){if(!t||!n)return;let d=n.get()||{revision:0,order:{}},f=r(Nr(l,i,d.order),a);s(d,f);let _=await t("ui-order-set",{expected_revision:d.revision,entries:f});if(_&&_.conflict){let b={revision:typeof _.revision=="number"?_.revision:0,order:_.order||{}};n.set(b);let y=r(Nr(l,i,b.order),a);s(b,y);let $=await t("ui-order-set",{expected_revision:b.revision,entries:y});$&&$.applied&&n.set({revision:typeof $.revision=="number"?$.revision:0,order:$.order||{}})}else _&&_.applied&&n.set({revision:typeof _.revision=="number"?_.revision:0,order:_.order||{}})}return{applyReorder:o}}function rr(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function qr(e,t){return!t||typeof e!="string"||e.length===0||rr(t.visible_labels).includes(e)?!0:rr(t.hidden_labels).includes(e)?!1:!rr(t.hidden_prefixes).some(n=>n.length>0&&e.startsWith(n))}function xo(e,t){return rr(e).filter(n=>qr(n,t))}function Jt(e,t){let n=e&&e.chips?e.chips[t]:void 0;return typeof n=="boolean"?n:!0}var Ji={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg"},So={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge"},el={spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},tl={review:"\u2713",skip:"\u2298"},hn={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function nl(e,t,n){if(!(n==="in_progress"||n==="resolved"))return null;for(let s of e){let o=t[s];if(o&&o.fill==="dim"&&o.stale!==!0)return s}return null}function rl(e){let t=e&&e.fill||"none";return t==="none"?hn.none:e&&e.stale===!0?hn.stale:t==="dim"?hn.dim:e&&e.glyph==="review"?hn.review:e&&e.glyph==="skip"?hn.skip:hn.done}function sl(e,t,n){let r=Ji[e]||e,s=t&&t.fill||"none",o=!!t&&t.stale===!0,a=tl[t&&t.glyph||""]||"",l="bar";s==="dim"?l+=` b-${r} dim`:s==="full"&&(l+=` b-${r} full`),o&&(l+=" stale"),n&&(l+=" cur");let i=s==="none"?"lbl":`lbl l-${r} on`,d=n?`color: var(--stage-${r}-on)`:"";return c`
    <div class="seg">
      <div class=${l} style=${d}>${a}</div>
      <div class=${i}>
        ${So[e]||e}
      </div>
    </div>
  `}function sr(e,t){if(!e||!e.stages)return"";let n=e.route==="full_plan"?"full_plan":"spec_backed",r=el[n],s=e.stages,o=nl(r,s,String(t||"open")),a=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${r.map(l=>`${So[l]||l} ${rl(s[l]||{})}`).join(" \xB7 ")}`;return c`
    <div class="stp" role="img" aria-label=${a}>
      ${r.map(l=>sl(l,s[l]||{},l===o))}
    </div>
  `}function ol(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var Ao=2;function al(e){if(!e)return[];let t=[];if(e.external){let r=e.reason?`\u23F8 blocked: ${e.reason}`:"\u23F8 blocked";t.push(c`<span class="ctl-chip ctl-chip--blocked">${r}</span>`)}let n=Array.isArray(e.blockers)?e.blockers:[];if(n.length>0){let r=n.slice(0,Ao).join(", "),s=n.length-Ao,o=`\u26D3 blocked: ${r}${s>0?` +${s}`:""}`;t.push(c`<span class="ctl-chip ctl-chip--blocked-dep">${o}</span>`)}return t}function il(e,t){let n=t.policy||null,r=e.workflow&&e.workflow.chips||{},s=[];if(r.route&&Jt(n,"route")){let o=r.route_source==="derived";s.push(c`<span
        class="ctl-chip ctl-chip--route${o?" is-derived":""}"
        title=${o?"route \uCD94\uB860\uAC12 (metadata \uBBF8\uD540)":"route"}
        >${o?`${r.route} ?`:r.route}</span
      >`)}if(r.fast_track&&Jt(n,"fast_track")&&s.push(c`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),r.pr&&Jt(n,"pr")){let o=r.pr.number;s.push(c`<span class="ctl-chip ctl-chip--pr"
        >${`PR${o!=null?` #${o}`:""}`}</span
      >`)}for(let o of xo(e.labels,n))s.push(c`<span class="ctl-chip ctl-chip--label">${o}</span>`);return e.from_id&&Jt(n,"from")&&s.push(c`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${o=>{o.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(o,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),Jt(n,"blocked")&&s.push(...al(e.blocked_info)),s.length===0?"":c`<div class="board-card__chips">${s}</div>`}function ll(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function cl(e){let t=wt(e.created_at),n=wt(e.updated_at);return!t&&!n?"":c`<span class="board-card__times">
    ${t?c`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${dt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}
    ${t&&n?c`<span class="board-card__time-sep">·</span>`:""}
    ${n?c`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${dt(e.updated_at)}`}
          >수정 ${n}</span
        >`:""}
  </span>`}function dl(e,t){let n=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]},r=n.total||0,s=t.isExpanded?t.isExpanded(e.id):!0,o=r>0?n.children.slice().sort(ho):n.children;return c`
    <div class="board-card__roll">
      <div class="board-card__roll-meta">
        ${r>0?c`<button
              type="button"
              class="board-card__roll-toggle"
              aria-expanded=${s?"true":"false"}
              @click=${a=>t.onRollupToggle&&t.onRollupToggle(a,e.id)}
            >
              children ${n.count}/${r} ${s?"\u25B4":"\u25BE"}
            </button>`:c`<span class="board-card__roll-none">children 없음</span>`}
        ${cl(e)}
      </div>
      ${r>0&&n.current?c`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${n.current.title||n.current.id}</span
            >
          </div>`:""}
      ${s&&r>0?c`<div class="board-card__roll-list">
            ${o.map((a,l)=>c`<button
                  type="button"
                  class="board-card__roll-child"
                  @click=${i=>t.onChildClick&&t.onChildClick(i,a.id)}
                >
                  <span class=${ll(a.status)}>●</span>
                  <span class="board-card__roll-child-ord">${l+1}</span>
                  <span class="board-card__roll-child-title"
                    >${a.title||a.id}</span
                  >
                </button>`)}
          </div>`:""}
    </div>
  `}function To(e,t){let n=ol(e.priority);return c`
    <article
      class="board-card"
      data-issue-id=${e.id}
      role="listitem"
      tabindex="-1"
      draggable="true"
      @click=${r=>t.onCardClick(r,e.id)}
      @dragstart=${r=>t.onDragStart(r,e.id)}
      @dragend=${t.onDragEnd}
    >
      <div class="board-card__head">
        <button
          type="button"
          class="board-card__id"
          title="ID 복사"
          aria-label=${`\uC774\uC288 ID ${e.id} \uBCF5\uC0AC`}
          @click=${r=>t.onCopyId(r,e.id)}
        >
          ${e.id}
        </button>
        ${n?c`<span class="board-card__pri">${n}</span>`:""}
      </div>
      <div class="board-card__title">${e.title||"(\uC81C\uBAA9 \uC5C6\uC74C)"}</div>
      ${il(e,t)}
      ${e.workflow&&Jt(t.policy||null,"stepper")?sr(e.workflow,e.status):""}
      ${dl(e,t)}
    </article>
  `}function en(e,t){let n=Array.isArray(e.items)?e.items.length:0,r=e.is_closed===!0;return c`
    <section class=${r?"board-column board-column--closed":"board-column"} id=${e.id}>
      <header
        class="board-column__header"
        id=${e.id+"-header"}
        role="heading"
        aria-level="2"
      >
        <div class="board-column__title">
          <span class="board-column__title-text">${e.title}</span>
          <span class="board-column__count" aria-label=${`${n}\uAC74`}
            >${n}</span
          >
        </div>
        ${r?c`<select
              class="board-column__closed-range"
              aria-label="Closed period"
              @change=${t.onClosedRangeChange}
            >
              ${Rt.map(o=>c`<option
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
        ${e.items.map(o=>To(o,t))}
      </div>
    </section>
  `}var ul=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],pl=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],fl=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function _l(e,t,n){let r=e.labels.length,s=r>0?`\uB77C\uBCA8 ${r}`:"\uB77C\uBCA8";return c`
    <div class="board-filter__labels">
      <button
        type="button"
        class=${r>0?"board-filter__label-btn is-on":"board-filter__label-btn"}
        aria-haspopup="true"
        aria-expanded=${n.label_menu_open?"true":"false"}
        @click=${t.onLabelMenuToggle}
      >
        ${s} ▾
      </button>
      ${n.label_menu_open?c`<div class="board-filter__label-menu" role="group">
            ${n.label_options.length===0?c`<div class="board-filter__label-empty">라벨 없음</div>`:n.label_options.map(o=>c`<label class="board-filter__label-row">
                      <input
                        type="checkbox"
                        .checked=${e.labels.includes(o)}
                        @change=${()=>t.onLabelToggle(o)}
                      />
                      <span>${o}</span>
                    </label>`)}
            ${r>0?c`<button
                  type="button"
                  class="board-filter__label-clear"
                  @click=${t.onLabelClear}
                >
                  선택 해제
                </button>`:""}
          </div>`:""}
    </div>
  `}function Eo(e,t,n){return c`
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
        ${ul.map(r=>c`<option
              value=${r.value}
              ?selected=${e.priority===r.value}
            >
              ${r.label}
            </option>`)}
      </select>
      <select
        class="board-filter__select"
        aria-label="타입 필터"
        @change=${t.onTypeChange}
      >
        ${pl.map(r=>c`<option
              value=${r.value}
              ?selected=${e.type===r.value}
            >
              ${r.label}
            </option>`)}
      </select>
      ${_l(e,t,n)}
      <span class="board-filter__spacer"></span>
      <button
        type="button"
        class=${n.show_deferred?"board-filter__deferred is-on":"board-filter__deferred"}
        aria-pressed=${n.show_deferred?"true":"false"}
        @click=${t.onDeferredToggle}
      >
        Deferred ${n.deferred_count}
      </button>
      <select
        class="board-filter__select board-filter__sort"
        aria-label="정렬 규칙"
        @change=${t.onSortChange}
      >
        ${fl.map(r=>c`<option
              value=${r.value}
              ?selected=${n.sort_mode===r.value}
            >
              ${r.label}
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
  `}var hl=200,ml={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","deferred-col":"deferred","closed-col":"closed"},gl=new Set(["blocked-col","ready-col","in-progress-col","resolved-col","deferred-col"]),Co="beads-ui.board.sort",Ro=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function bl(){try{let e=window.localStorage.getItem(Co);if(e&&Ro.has(e))return e}catch{}return"created_desc"}function Io(e,t){let n=Ve("views:board"),r=t.gotoIssue,s=t.issueStores,o=t.transport,a=t.uiOrderStore,l=t.displayPolicyStore,i=t.onClosedRangeChange,d=t.onNewIssue,f=t.closedRange||kt,_=s?er(s,a):null,b=nr({transport:o,uiOrderStore:a}),y=[],$=[],g=[],R=[],H=[],z=[],Y=!1,M=0,E=bl(),S=new Map,L=new Map,x=new Map,G=new Set,V={search:"",priority:"",type:"",labels:[]},Z=!1,ce=null;function Ne(D){return String(D.status||"open")==="open"}function Ze(D){let B=String(D.status||"open");return B==="open"||B==="blocked"}function xe(D){let B=V.search.trim().toLowerCase(),oe=V.priority,re=V.type,ae=V.labels;return D.filter(ke=>{if(B){let $e=String(ke.id||"").toLowerCase(),Ee=String(ke.title||"").toLowerCase();if(!$e.includes(B)&&!Ee.includes(B))return!1}if(oe!==""&&String(ke.priority)!==oe||re!==""&&String(ke.issue_type||"")!==re)return!1;if(ae.length>0){let $e=Array.isArray(ke.labels)?ke.labels:[];if(!ae.some(Ee=>$e.includes(Ee)))return!1}return!0})}function Q(){let D=new Set;for(let B of[y,$,g,R,H,z])for(let oe of B){let re=Array.isArray(oe.labels)?oe.labels:[];for(let ae of re)typeof ae=="string"&&ae.length>0&&D.add(ae)}return Array.from(D).sort()}function ee(){return V.search.trim()!==""||V.priority!==""||V.type!==""||V.labels.length>0}function A(){try{if(_){let D=_.selectBoardColumn("tab:board:in-progress","in_progress",E),B=_.selectBoardColumn("tab:board:blocked","blocked",E).filter(Ze),oe=new Set(D.map(ue=>ue.id)),re=_.selectBoardColumn("tab:board:ready","ready",E).filter(ue=>Ne(ue)&&!oe.has(ue.id)),ae=_.selectBoardColumn("tab:board:resolved","resolved",E),ke=_.selectBoardColumn("tab:board:deferred","deferred",E),$e=Y?ke:[],Ee=_.selectBoardColumn("tab:board:closed","closed").slice(0,hl),Fe=[...B,...re,...D,...ae,...$e,...Ee];T(Fe);let Se=new Set;for(let ue of Fe)ue&&ue.id&&!Br(ue)&&Se.add(ue.id);let je=!ee();y=je?mn(B,Se):B,$=je?mn(re,Se):re,g=je?mn(D,Se):D,R=je?mn(ae,Se):ae,H=je?mn($e,Se):$e,M=ke.length,z=je?mn(Ee,Se):Ee,S=new Map;for(let ue of y)S.set(ue.id,"open");for(let ue of $)S.set(ue.id,"open");for(let ue of g)S.set(ue.id,"in_progress");for(let ue of R)S.set(ue.id,"resolved");for(let ue of H)S.set(ue.id,"deferred");for(let ue of z)S.set(ue.id,"closed");L=new Map;for(let ue of y)L.set(ue.id,"blocked-col");for(let ue of $)L.set(ue.id,"ready-col");for(let ue of g)L.set(ue.id,"in-progress-col");for(let ue of R)L.set(ue.id,"resolved-col");for(let ue of H)L.set(ue.id,"deferred-col");for(let ue of z)L.set(ue.id,"closed-col")}te()}catch{y=[],$=[],g=[],R=[],H=[],z=[],x=new Map,te()}}function T(D){let B=new Map;for(let re of D)re&&re.id&&!B.has(re.id)&&B.set(re.id,re);let oe=new Map;for(let re of B.values()){let ae=Br(re);if(!ae)continue;let ke=oe.get(ae);ke||(ke=[],oe.set(ae,ke)),ke.push({id:re.id,title:re.title,status:re.status,metadata:re.metadata,created_at:re.created_at,updated_at:re.updated_at})}x=oe}function X(D){let B=x.get(D)||[],oe=0;for(let ae of B)(ae.status==="resolved"||ae.status==="closed")&&(oe+=1);let re=tr(B);return{total:B.length,count:oe,current:re,children:B}}function ne(D){return!G.has(D)}function de(D,B){D.preventDefault(),D.stopPropagation(),G.has(B)?G.delete(B):G.add(B),te()}function fe(D,B){D.preventDefault(),D.stopPropagation(),r(B)}function De(D,B){D.preventDefault(),D.stopPropagation(),r(B)}function _e(D,B){ce||r(B)}function Re(D,B){D.preventDefault(),D.stopPropagation(),vl(B).then(oe=>{oe&&ie("\uBCF5\uC0AC\uB428","success",1200)})}function We(D,B){ce=B,D.dataTransfer&&(D.dataTransfer.setData("text/plain",B),D.dataTransfer.effectAllowed="move"),D.target.classList.add("board-card--dragging")}function qe(D){D.target.classList.remove("board-card--dragging"),et(),setTimeout(()=>{ce=null},0)}function Xe(D){let B=String(D.target.value||"");!B||B===f||(f=B,i&&i(B),te())}let st={onCardClick:_e,onCopyId:Re,onDragStart:We,onDragEnd:qe,onClosedRangeChange:Xe,rollupFor:X,isExpanded:ne,onRollupToggle:de,onChildClick:fe,onFromChipClick:De,get policy(){return l?l.get():null}};function q(D){let B=D.target,oe=e.querySelector(".board-filter__labels");B&&oe&&oe.contains(B)||se()}function W(D){D.key==="Escape"&&se()}function O(){Z||(Z=!0,document.addEventListener("mousedown",q),document.addEventListener("keydown",W),te())}function se(){Z&&(Z=!1,document.removeEventListener("mousedown",q),document.removeEventListener("keydown",W),te())}let pe={onSearchInput(D){V.search=String(D.target.value||""),A()},onPriorityChange(D){V.priority=String(D.target.value||""),A()},onTypeChange(D){V.type=String(D.target.value||""),A()},onSortChange(D){let B=String(D.target.value||"");if(!(!Ro.has(B)||B===E)){E=B;try{window.localStorage.setItem(Co,B)}catch{}A()}},onDeferredToggle(){Y=!Y,A()},onLabelMenuToggle(){Z?se():O()},onLabelToggle(D){let B=V.labels.indexOf(D);B===-1?V.labels.push(D):V.labels.splice(B,1),A()},onLabelClear(){V.labels.length!==0&&(V.labels=[],A())},onNewIssue(){d&&d()}};function be(){let D=Y?"board-root board-root--deferred":"board-root";return c`
      <div class="board-view">
        ${Eo(V,pe,{sort_mode:E,show_deferred:Y,deferred_count:M,label_options:Q(),label_menu_open:Z})}
        <div class=${D}>
          ${en({title:"Blocked",id:"blocked-col",items:xe(y)},st)}
          ${en({title:"Ready",id:"ready-col",items:xe($)},st)}
          ${en({title:"In progress",id:"in-progress-col",items:xe(g)},st)}
          ${en({title:"Resolved",id:"resolved-col",items:xe(R)},st)}
          ${Y?en({title:"Deferred",id:"deferred-col",items:xe(H)},st):""}
          ${en({title:"Closed",id:"closed-col",items:xe(z),is_closed:!0,closed_range:f},st)}
        </div>
      </div>
    `}function te(){Le(be(),e),Ae()}function Ae(){try{let D=Array.from(e.querySelectorAll(".board-column"));for(let B of D)Array.from(B.querySelectorAll(".board-card")).forEach((re,ae)=>{re.tabIndex=ae===0?0:-1})}catch{}}async function Pe(D,B){if(!o){ie("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:D,status:B}),ie("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(oe){n("update-status failed: %o",oe),ie("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function it(D){switch(D){case"blocked-col":return y;case"ready-col":return $;case"in-progress-col":return g;case"resolved-col":return R;case"deferred-col":return H;default:return[]}}function lt(D,B,oe){if(!o||!a)return;let re=it(D),ae=re.find(Se=>Se.id===B);if(!ae)return;let ke=re.filter(Se=>Se.id!==B),$e=oe.closest?oe.closest(".board-card"):null,Ee=ke.length;if($e){let Se=$e.getAttribute("data-issue-id");if(Se===B)return;let je=ke.findIndex(ue=>ue.id===Se);je>=0&&(Ee=je)}let Fe=ke.slice();Fe.splice(Ee,0,ae),b.applyReorder(B,Fe,Ee)}function et(){for(let D of Array.from(e.querySelectorAll(".board-column--drag-over")))D.classList.remove("board-column--drag-over")}let Ye=null;e.addEventListener("dragover",D=>{D.preventDefault(),D.dataTransfer&&(D.dataTransfer.dropEffect="move");let oe=D.target.closest(".board-column");oe&&oe!==Ye&&(Ye&&Ye.classList.remove("board-column--drag-over"),oe.classList.add("board-column--drag-over"),Ye=oe)}),e.addEventListener("dragleave",D=>{let B=D.relatedTarget;(!B||!e.contains(B))&&Ye&&(Ye.classList.remove("board-column--drag-over"),Ye=null)}),e.addEventListener("drop",D=>{D.preventDefault(),Ye&&(Ye.classList.remove("board-column--drag-over"),Ye=null);let B=D.target,oe=B.closest(".board-column");if(!oe)return;let re=D.dataTransfer?.getData("text/plain")||"";if(!re)return;let ae=oe.id,ke=L.get(re);if(ke&&ke===ae){if(gl.has(ae)){if(E!=="manual"){ie("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}lt(ae,re,B)}return}let $e=ml[ae];if(!$e){ie("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}S.get(re)!==$e&&Pe(re,$e)}),e.addEventListener("keydown",D=>{let B=D.target;if(!(B instanceof HTMLElement))return;let oe=String(B.tagName||"").toLowerCase();if(oe==="input"||oe==="textarea"||oe==="select"||oe==="button"||oe==="a"||B.isContentEditable===!0)return;let re=B.closest(".board-card");if(!re)return;let ae=String(D.key||"");if(ae==="Enter"||ae===" "){D.preventDefault();let Fe=re.getAttribute("data-issue-id");Fe&&r(Fe);return}if(ae!=="ArrowUp"&&ae!=="ArrowDown"&&ae!=="ArrowLeft"&&ae!=="ArrowRight")return;D.preventDefault();let ke=re.closest(".board-column");if(!ke)return;let $e=Array.from(ke.querySelectorAll(".board-card")),Ee=$e.indexOf(re);if(ae==="ArrowDown"&&Ee<$e.length-1){ct(re,$e[Ee+1]);return}if(ae==="ArrowUp"&&Ee>0){ct(re,$e[Ee-1]);return}if(ae==="ArrowLeft"||ae==="ArrowRight"){let Fe=Array.from(e.querySelectorAll(".board-column")),Se=Fe.indexOf(ke),je=ae==="ArrowRight"?1:-1,ue=Se+je;for(;ue>=0&&ue<Fe.length;){let ut=Fe[ue].querySelector(".board-card");if(ut){ct(re,ut);return}ue+=je}}});function ct(D,B){try{D.tabIndex=-1,B.tabIndex=0,B.focus()}catch{}}let Te=null;_&&_.subscribe&&(Te=_.subscribe(()=>{try{A()}catch{}}));let tt=null;return l&&l.subscribe&&(tt=l.subscribe(()=>{try{A()}catch{}})),{async load(){n("load"),A()},clear(){se(),Te&&(Te(),Te=null),tt&&(tt(),tt=null),e.replaceChildren(),y=[],$=[],g=[],R=[],H=[],z=[],S=new Map,L=new Map}}}function Br(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function mn(e,t){return e.filter(n=>{let r=Br(n);return!(r&&t.has(r))})}async function vl(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let n=!1;try{n=document.execCommand("copy")}finally{t.remove()}return n}catch{return!1}}async function tn(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let n=document.createElement("textarea");n.value=t,n.style.position="fixed",n.style.left="-9999px",document.body.appendChild(n),n.select();let r=!1;try{r=document.execCommand("copy")}finally{n.remove()}return r}catch{return!1}}var wl="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function nn(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var Nt=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"];function Lo(e){let t=0;for(let n of Nt)t+=nn(e?.[n]);return t}function Do(e){return!e||typeof e!="object"?!1:Nt.some(t=>Number.isFinite(e[t]))}function kl(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function gn(e){return Do(e)?`\u03C4 ${kl(Lo(e))}`:null}function xt(e){let t=gn(e);if(!t)return null;let n=e?.total_cost_usd;return typeof n=="number"&&Number.isFinite(n)?`${t} \xB7 $${n.toFixed(2)}`:t}function bn(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${nn(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${nn(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${nn(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${nn(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let n=[`\uCD1D ${Lo(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&n.push(wl),n.join(`
`)}function It(e,t){let n={input_tokens:0,output_tokens:0,cache_read_input_tokens:0,cache_creation_input_tokens:0},r=0,s=0,o=0,a=!1;for(let l of Object.values(e||{})){if(!l||l.bead_id!==t)continue;let i=l.usage;if(Do(i)){r+=1;for(let d of Nt)n[d]=nn(n[d])+nn(i[d]);typeof i.total_cost_usd=="number"&&Number.isFinite(i.total_cost_usd)&&(s+=i.total_cost_usd,o+=1),i.replayed===!0&&(a=!0)}}return r===0?null:(o===r&&(n.total_cost_usd=s),a&&(n.replayed=!0),n)}var{entries:zo,setPrototypeOf:Oo,isFrozen:yl,getPrototypeOf:$l,getOwnPropertyDescriptor:xl}=Object,{freeze:_t,seal:yt,create:Yr}=Object,{apply:Vr,construct:Kr}=typeof Reflect<"u"&&Reflect;_t||(_t=function(t){return t});yt||(yt=function(t){return t});Vr||(Vr=function(t,n){for(var r=arguments.length,s=new Array(r>2?r-2:0),o=2;o<r;o++)s[o-2]=arguments[o];return t.apply(n,s)});Kr||(Kr=function(t){for(var n=arguments.length,r=new Array(n>1?n-1:0),s=1;s<n;s++)r[s-1]=arguments[s];return new t(...r)});var or=ht(Array.prototype.forEach),Sl=ht(Array.prototype.lastIndexOf),Mo=ht(Array.prototype.pop),En=ht(Array.prototype.push),Al=ht(Array.prototype.splice),ir=ht(String.prototype.toLowerCase),Ur=ht(String.prototype.toString),zr=ht(String.prototype.match),Cn=ht(String.prototype.replace),Tl=ht(String.prototype.indexOf),El=ht(String.prototype.trim),St=ht(Object.prototype.hasOwnProperty),ft=ht(RegExp.prototype.test),Rn=Cl(TypeError);function ht(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,r=new Array(n>1?n-1:0),s=1;s<n;s++)r[s-1]=arguments[s];return Vr(e,t,r)}}function Cl(e){return function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return Kr(e,n)}}function ye(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:ir;Oo&&Oo(e,null);let r=t.length;for(;r--;){let s=t[r];if(typeof s=="string"){let o=n(s);o!==s&&(yl(t)||(t[r]=o),s=o)}e[s]=!0}return e}function Rl(e){for(let t=0;t<e.length;t++)St(e,t)||(e[t]=null);return e}function Pt(e){let t=Yr(null);for(let[n,r]of zo(e))St(e,n)&&(Array.isArray(r)?t[n]=Rl(r):r&&typeof r=="object"&&r.constructor===Object?t[n]=Pt(r):t[n]=r);return t}function In(e,t){for(;e!==null;){let r=xl(e,t);if(r){if(r.get)return ht(r.get);if(typeof r.value=="function")return ht(r.value)}e=$l(e)}function n(){return null}return n}var No=_t(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Hr=_t(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Wr=_t(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Il=_t(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Gr=_t(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Ll=_t(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Po=_t(["#text"]),Fo=_t(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),jr=_t(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),qo=_t(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),ar=_t(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Dl=yt(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Ol=yt(/<%[\w\W]*|[\w\W]*%>/gm),Ml=yt(/\$\{[\w\W]*/gm),Nl=yt(/^data-[\-\w.\u00B7-\uFFFF]+$/),Pl=yt(/^aria-[\-\w]+$/),Ho=yt(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Fl=yt(/^(?:\w+script|data):/i),ql=yt(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Wo=yt(/^html$/i),Bl=yt(/^[a-z][.\w]*(-[.\w]+)+$/i),Bo=Object.freeze({__proto__:null,ARIA_ATTR:Pl,ATTR_WHITESPACE:ql,CUSTOM_ELEMENT:Bl,DATA_ATTR:Nl,DOCTYPE_NAME:Wo,ERB_EXPR:Ol,IS_ALLOWED_URI:Ho,IS_SCRIPT_OR_DATA:Fl,MUSTACHE_EXPR:Dl,TMPLIT_EXPR:Ml}),Ln={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},Ul=function(){return typeof window>"u"?null:window},zl=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let r=null,s="data-tt-policy-suffix";n&&n.hasAttribute(s)&&(r=n.getAttribute(s));let o="dompurify"+(r?"#"+r:"");try{return t.createPolicy(o,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},Uo=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Go(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Ul(),t=I=>Go(I);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==Ln.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e,r=n,s=r.currentScript,{DocumentFragment:o,HTMLTemplateElement:a,Node:l,Element:i,NodeFilter:d,NamedNodeMap:f=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:_,DOMParser:b,trustedTypes:y}=e,$=i.prototype,g=In($,"cloneNode"),R=In($,"remove"),H=In($,"nextSibling"),z=In($,"childNodes"),Y=In($,"parentNode");if(typeof a=="function"){let I=n.createElement("template");I.content&&I.content.ownerDocument&&(n=I.content.ownerDocument)}let M,E="",{implementation:S,createNodeIterator:L,createDocumentFragment:x,getElementsByTagName:G}=n,{importNode:V}=r,Z=Uo();t.isSupported=typeof zo=="function"&&typeof Y=="function"&&S&&S.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:ce,ERB_EXPR:Ne,TMPLIT_EXPR:Ze,DATA_ATTR:xe,ARIA_ATTR:Q,IS_SCRIPT_OR_DATA:ee,ATTR_WHITESPACE:A,CUSTOM_ELEMENT:T}=Bo,{IS_ALLOWED_URI:X}=Bo,ne=null,de=ye({},[...No,...Hr,...Wr,...Gr,...Po]),fe=null,De=ye({},[...Fo,...jr,...qo,...ar]),_e=Object.seal(Yr(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Re=null,We=null,qe=Object.seal(Yr(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),Xe=!0,st=!0,q=!1,W=!0,O=!1,se=!0,pe=!1,be=!1,te=!1,Ae=!1,Pe=!1,it=!1,lt=!0,et=!1,Ye="user-content-",ct=!0,Te=!1,tt={},D=null,B=ye({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),oe=null,re=ye({},["audio","video","img","source","image","track"]),ae=null,ke=ye({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),$e="http://www.w3.org/1998/Math/MathML",Ee="http://www.w3.org/2000/svg",Fe="http://www.w3.org/1999/xhtml",Se=Fe,je=!1,ue=null,ut=ye({},[$e,Ee,Fe],Ur),gt=ye({},["mi","mo","mn","ms","mtext"]),u=ye({},["annotation-xml"]),w=ye({},["title","style","font","a","script"]),P=null,me=["application/xhtml+xml","text/html"],Oe="text/html",ve=null,Ie=null,Be=n.createElement("form"),Qe=function(p){return p instanceof RegExp||p instanceof Function},we=function(){let p=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(Ie&&Ie===p)){if((!p||typeof p!="object")&&(p={}),p=Pt(p),P=me.indexOf(p.PARSER_MEDIA_TYPE)===-1?Oe:p.PARSER_MEDIA_TYPE,ve=P==="application/xhtml+xml"?Ur:ir,ne=St(p,"ALLOWED_TAGS")?ye({},p.ALLOWED_TAGS,ve):de,fe=St(p,"ALLOWED_ATTR")?ye({},p.ALLOWED_ATTR,ve):De,ue=St(p,"ALLOWED_NAMESPACES")?ye({},p.ALLOWED_NAMESPACES,Ur):ut,ae=St(p,"ADD_URI_SAFE_ATTR")?ye(Pt(ke),p.ADD_URI_SAFE_ATTR,ve):ke,oe=St(p,"ADD_DATA_URI_TAGS")?ye(Pt(re),p.ADD_DATA_URI_TAGS,ve):re,D=St(p,"FORBID_CONTENTS")?ye({},p.FORBID_CONTENTS,ve):B,Re=St(p,"FORBID_TAGS")?ye({},p.FORBID_TAGS,ve):Pt({}),We=St(p,"FORBID_ATTR")?ye({},p.FORBID_ATTR,ve):Pt({}),tt=St(p,"USE_PROFILES")?p.USE_PROFILES:!1,Xe=p.ALLOW_ARIA_ATTR!==!1,st=p.ALLOW_DATA_ATTR!==!1,q=p.ALLOW_UNKNOWN_PROTOCOLS||!1,W=p.ALLOW_SELF_CLOSE_IN_ATTR!==!1,O=p.SAFE_FOR_TEMPLATES||!1,se=p.SAFE_FOR_XML!==!1,pe=p.WHOLE_DOCUMENT||!1,Ae=p.RETURN_DOM||!1,Pe=p.RETURN_DOM_FRAGMENT||!1,it=p.RETURN_TRUSTED_TYPE||!1,te=p.FORCE_BODY||!1,lt=p.SANITIZE_DOM!==!1,et=p.SANITIZE_NAMED_PROPS||!1,ct=p.KEEP_CONTENT!==!1,Te=p.IN_PLACE||!1,X=p.ALLOWED_URI_REGEXP||Ho,Se=p.NAMESPACE||Fe,gt=p.MATHML_TEXT_INTEGRATION_POINTS||gt,u=p.HTML_INTEGRATION_POINTS||u,_e=p.CUSTOM_ELEMENT_HANDLING||{},p.CUSTOM_ELEMENT_HANDLING&&Qe(p.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(_e.tagNameCheck=p.CUSTOM_ELEMENT_HANDLING.tagNameCheck),p.CUSTOM_ELEMENT_HANDLING&&Qe(p.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(_e.attributeNameCheck=p.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),p.CUSTOM_ELEMENT_HANDLING&&typeof p.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(_e.allowCustomizedBuiltInElements=p.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),O&&(st=!1),Pe&&(Ae=!0),tt&&(ne=ye({},Po),fe=[],tt.html===!0&&(ye(ne,No),ye(fe,Fo)),tt.svg===!0&&(ye(ne,Hr),ye(fe,jr),ye(fe,ar)),tt.svgFilters===!0&&(ye(ne,Wr),ye(fe,jr),ye(fe,ar)),tt.mathMl===!0&&(ye(ne,Gr),ye(fe,qo),ye(fe,ar))),p.ADD_TAGS&&(typeof p.ADD_TAGS=="function"?qe.tagCheck=p.ADD_TAGS:(ne===de&&(ne=Pt(ne)),ye(ne,p.ADD_TAGS,ve))),p.ADD_ATTR&&(typeof p.ADD_ATTR=="function"?qe.attributeCheck=p.ADD_ATTR:(fe===De&&(fe=Pt(fe)),ye(fe,p.ADD_ATTR,ve))),p.ADD_URI_SAFE_ATTR&&ye(ae,p.ADD_URI_SAFE_ATTR,ve),p.FORBID_CONTENTS&&(D===B&&(D=Pt(D)),ye(D,p.FORBID_CONTENTS,ve)),ct&&(ne["#text"]=!0),pe&&ye(ne,["html","head","body"]),ne.table&&(ye(ne,["tbody"]),delete Re.tbody),p.TRUSTED_TYPES_POLICY){if(typeof p.TRUSTED_TYPES_POLICY.createHTML!="function")throw Rn('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof p.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Rn('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');M=p.TRUSTED_TYPES_POLICY,E=M.createHTML("")}else M===void 0&&(M=zl(y,s)),M!==null&&typeof E=="string"&&(E=M.createHTML(""));_t&&_t(p),Ie=p}},h=ye({},[...Hr,...Wr,...Il]),F=ye({},[...Gr,...Ll]),N=function(p){let C=Y(p);(!C||!C.tagName)&&(C={namespaceURI:Se,tagName:"template"});let j=ir(p.tagName),Ge=ir(C.tagName);return ue[p.namespaceURI]?p.namespaceURI===Ee?C.namespaceURI===Fe?j==="svg":C.namespaceURI===$e?j==="svg"&&(Ge==="annotation-xml"||gt[Ge]):!!h[j]:p.namespaceURI===$e?C.namespaceURI===Fe?j==="math":C.namespaceURI===Ee?j==="math"&&u[Ge]:!!F[j]:p.namespaceURI===Fe?C.namespaceURI===Ee&&!u[Ge]||C.namespaceURI===$e&&!gt[Ge]?!1:!F[j]&&(w[j]||!h[j]):!!(P==="application/xhtml+xml"&&ue[p.namespaceURI]):!1},K=function(p){En(t.removed,{element:p});try{Y(p).removeChild(p)}catch{R(p)}},Ue=function(p,C){try{En(t.removed,{attribute:C.getAttributeNode(p),from:C})}catch{En(t.removed,{attribute:null,from:C})}if(C.removeAttribute(p),p==="is")if(Ae||Pe)try{K(C)}catch{}else try{C.setAttribute(p,"")}catch{}},he=function(p){let C=null,j=null;if(te)p="<remove></remove>"+p;else{let Ke=zr(p,/^[\r\n\t ]+/);j=Ke&&Ke[0]}P==="application/xhtml+xml"&&Se===Fe&&(p='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+p+"</body></html>");let Ge=M?M.createHTML(p):p;if(Se===Fe)try{C=new b().parseFromString(Ge,P)}catch{}if(!C||!C.documentElement){C=S.createDocument(Se,"template",null);try{C.documentElement.innerHTML=je?E:Ge}catch{}}let ot=C.body||C.documentElement;return p&&j&&ot.insertBefore(n.createTextNode(j),ot.childNodes[0]||null),Se===Fe?G.call(C,pe?"html":"body")[0]:pe?C.documentElement:ot},ge=function(p){return L.call(p.ownerDocument||p,p,d.SHOW_ELEMENT|d.SHOW_COMMENT|d.SHOW_TEXT|d.SHOW_PROCESSING_INSTRUCTION|d.SHOW_CDATA_SECTION,null)},at=function(p){return p instanceof _&&(typeof p.nodeName!="string"||typeof p.textContent!="string"||typeof p.removeChild!="function"||!(p.attributes instanceof f)||typeof p.removeAttribute!="function"||typeof p.setAttribute!="function"||typeof p.namespaceURI!="string"||typeof p.insertBefore!="function"||typeof p.hasChildNodes!="function")},qt=function(p){return typeof l=="function"&&p instanceof l};function pt(I,p,C){or(I,j=>{j.call(t,p,C,Ie)})}let Bt=function(p){let C=null;if(pt(Z.beforeSanitizeElements,p,null),at(p))return K(p),!0;let j=ve(p.nodeName);if(pt(Z.uponSanitizeElement,p,{tagName:j,allowedTags:ne}),se&&p.hasChildNodes()&&!qt(p.firstElementChild)&&ft(/<[/\w!]/g,p.innerHTML)&&ft(/<[/\w!]/g,p.textContent)||p.nodeType===Ln.progressingInstruction||se&&p.nodeType===Ln.comment&&ft(/<[/\w]/g,p.data))return K(p),!0;if(!(qe.tagCheck instanceof Function&&qe.tagCheck(j))&&(!ne[j]||Re[j])){if(!Re[j]&&m(j)&&(_e.tagNameCheck instanceof RegExp&&ft(_e.tagNameCheck,j)||_e.tagNameCheck instanceof Function&&_e.tagNameCheck(j)))return!1;if(ct&&!D[j]){let Ge=Y(p)||p.parentNode,ot=z(p)||p.childNodes;if(ot&&Ge){let Ke=ot.length;for(let nt=Ke-1;nt>=0;--nt){let vt=g(ot[nt],!0);vt.__removalCount=(p.__removalCount||0)+1,Ge.insertBefore(vt,H(p))}}}return K(p),!0}return p instanceof i&&!N(p)||(j==="noscript"||j==="noembed"||j==="noframes")&&ft(/<\/no(script|embed|frames)/i,p.innerHTML)?(K(p),!0):(O&&p.nodeType===Ln.text&&(C=p.textContent,or([ce,Ne,Ze],Ge=>{C=Cn(C,Ge," ")}),p.textContent!==C&&(En(t.removed,{element:p.cloneNode()}),p.textContent=C)),pt(Z.afterSanitizeElements,p,null),!1)},jt=function(p,C,j){if(lt&&(C==="id"||C==="name")&&(j in n||j in Be))return!1;if(!(st&&!We[C]&&ft(xe,C))){if(!(Xe&&ft(Q,C))){if(!(qe.attributeCheck instanceof Function&&qe.attributeCheck(C,p))){if(!fe[C]||We[C]){if(!(m(p)&&(_e.tagNameCheck instanceof RegExp&&ft(_e.tagNameCheck,p)||_e.tagNameCheck instanceof Function&&_e.tagNameCheck(p))&&(_e.attributeNameCheck instanceof RegExp&&ft(_e.attributeNameCheck,C)||_e.attributeNameCheck instanceof Function&&_e.attributeNameCheck(C,p))||C==="is"&&_e.allowCustomizedBuiltInElements&&(_e.tagNameCheck instanceof RegExp&&ft(_e.tagNameCheck,j)||_e.tagNameCheck instanceof Function&&_e.tagNameCheck(j))))return!1}else if(!ae[C]){if(!ft(X,Cn(j,A,""))){if(!((C==="src"||C==="xlink:href"||C==="href")&&p!=="script"&&Tl(j,"data:")===0&&oe[p])){if(!(q&&!ft(ee,Cn(j,A,"")))){if(j)return!1}}}}}}}return!0},m=function(p){return p!=="annotation-xml"&&zr(p,T)},v=function(p){pt(Z.beforeSanitizeAttributes,p,null);let{attributes:C}=p;if(!C||at(p))return;let j={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:fe,forceKeepAttr:void 0},Ge=C.length;for(;Ge--;){let ot=C[Ge],{name:Ke,namespaceURI:nt,value:vt}=ot,Dt=ve(Ke),on=vt,rt=Ke==="value"?on:El(on);if(j.attrName=Dt,j.attrValue=rt,j.keepAttr=!0,j.forceKeepAttr=void 0,pt(Z.uponSanitizeAttribute,p,j),rt=j.attrValue,et&&(Dt==="id"||Dt==="name")&&(Ue(Ke,p),rt=Ye+rt),se&&ft(/((--!?|])>)|<\/(style|title|textarea)/i,rt)){Ue(Ke,p);continue}if(Dt==="attributename"&&zr(rt,"href")){Ue(Ke,p);continue}if(j.forceKeepAttr)continue;if(!j.keepAttr){Ue(Ke,p);continue}if(!W&&ft(/\/>/i,rt)){Ue(Ke,p);continue}O&&or([ce,Ne,Ze],Gn=>{rt=Cn(rt,Gn," ")});let an=ve(p.nodeName);if(!jt(an,Dt,rt)){Ue(Ke,p);continue}if(M&&typeof y=="object"&&typeof y.getAttributeType=="function"&&!nt)switch(y.getAttributeType(an,Dt)){case"TrustedHTML":{rt=M.createHTML(rt);break}case"TrustedScriptURL":{rt=M.createScriptURL(rt);break}}if(rt!==on)try{nt?p.setAttributeNS(nt,Ke,rt):p.setAttribute(Ke,rt),at(p)?K(p):Mo(t.removed)}catch{Ue(Ke,p)}}pt(Z.afterSanitizeAttributes,p,null)},J=function I(p){let C=null,j=ge(p);for(pt(Z.beforeSanitizeShadowDOM,p,null);C=j.nextNode();)pt(Z.uponSanitizeShadowNode,C,null),Bt(C),v(C),C.content instanceof o&&I(C.content);pt(Z.afterSanitizeShadowDOM,p,null)};return t.sanitize=function(I){let p=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},C=null,j=null,Ge=null,ot=null;if(je=!I,je&&(I="<!-->"),typeof I!="string"&&!qt(I))if(typeof I.toString=="function"){if(I=I.toString(),typeof I!="string")throw Rn("dirty is not a string, aborting")}else throw Rn("toString is not a function");if(!t.isSupported)return I;if(be||we(p),t.removed=[],typeof I=="string"&&(Te=!1),Te){if(I.nodeName){let vt=ve(I.nodeName);if(!ne[vt]||Re[vt])throw Rn("root node is forbidden and cannot be sanitized in-place")}}else if(I instanceof l)C=he("<!---->"),j=C.ownerDocument.importNode(I,!0),j.nodeType===Ln.element&&j.nodeName==="BODY"||j.nodeName==="HTML"?C=j:C.appendChild(j);else{if(!Ae&&!O&&!pe&&I.indexOf("<")===-1)return M&&it?M.createHTML(I):I;if(C=he(I),!C)return Ae?null:it?E:""}C&&te&&K(C.firstChild);let Ke=ge(Te?I:C);for(;Ge=Ke.nextNode();)Bt(Ge),v(Ge),Ge.content instanceof o&&J(Ge.content);if(Te)return I;if(Ae){if(Pe)for(ot=x.call(C.ownerDocument);C.firstChild;)ot.appendChild(C.firstChild);else ot=C;return(fe.shadowroot||fe.shadowrootmode)&&(ot=V.call(r,ot,!0)),ot}let nt=pe?C.outerHTML:C.innerHTML;return pe&&ne["!doctype"]&&C.ownerDocument&&C.ownerDocument.doctype&&C.ownerDocument.doctype.name&&ft(Wo,C.ownerDocument.doctype.name)&&(nt="<!DOCTYPE "+C.ownerDocument.doctype.name+`>
`+nt),O&&or([ce,Ne,Ze],vt=>{nt=Cn(nt,vt," ")}),M&&it?M.createHTML(nt):nt},t.setConfig=function(){let I=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};we(I),be=!0},t.clearConfig=function(){Ie=null,be=!1},t.isValidAttribute=function(I,p,C){Ie||we({});let j=ve(I),Ge=ve(p);return jt(j,Ge,C)},t.addHook=function(I,p){typeof p=="function"&&En(Z[I],p)},t.removeHook=function(I,p){if(p!==void 0){let C=Sl(Z[I],p);return C===-1?void 0:Al(Z[I],C,1)[0]}return Mo(Z[I])},t.removeHooks=function(I){Z[I]=[]},t.removeAllHooks=function(){Z=Uo()},t}var jo=Go();var Yo={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Vo=e=>(...t)=>({_$litDirective$:e,values:t}),lr=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,n,r){this._$Ct=t,this._$AM=n,this._$Ci=r}_$AS(t,n){return this.update(t,n)}update(t,n){return this.render(...n)}};var Dn=class extends lr{constructor(t){if(super(t),this.it=Je,t.type!==Yo.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===Je||t==null)return this._t=void 0,this.it=t;if(t===Zt)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let n=[t];return n.raw=n,this._t={_$litType$:this.constructor.resultType,strings:n,values:[]}}};Dn.directiveName="unsafeHTML",Dn.resultType=1;var Ko=Vo(Dn);function Jr(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var sn=Jr();function na(e){sn=e}var Pn={exec:()=>null};function Ce(e,t=""){let n=typeof e=="string"?e:e.source,r={replace:(s,o)=>{let a=typeof o=="string"?o:o.source;return a=a.replace(mt.caret,"$1"),n=n.replace(s,a),r},getRegex:()=>new RegExp(n,t)};return r}var Hl=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),mt={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},Wl=/^(?:[ \t]*(?:\n|$))+/,Gl=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,jl=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,Fn=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Yl=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,es=/(?:[*+-]|\d{1,9}[.)])/,ra=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,sa=Ce(ra).replace(/bull/g,es).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Vl=Ce(ra).replace(/bull/g,es).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),ts=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Kl=/^[^\n]+/,ns=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,Zl=Ce(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",ns).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Xl=Ce(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,es).getRegex(),_r="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",rs=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Ql=Ce("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",rs).replace("tag",_r).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),oa=Ce(ts).replace("hr",Fn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",_r).getRegex(),Jl=Ce(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",oa).getRegex(),ss={blockquote:Jl,code:Gl,def:Zl,fences:jl,heading:Yl,hr:Fn,html:Ql,lheading:sa,list:Xl,newline:Wl,paragraph:oa,table:Pn,text:Kl},Zo=Ce("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",Fn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",_r).getRegex(),ec={...ss,lheading:Vl,table:Zo,paragraph:Ce(ts).replace("hr",Fn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Zo).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",_r).getRegex()},tc={...ss,html:Ce(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",rs).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Pn,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:Ce(ts).replace("hr",Fn).replace("heading",` *#{1,6} *[^
]`).replace("lheading",sa).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},nc=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,rc=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,aa=/^( {2,}|\\)\n(?!\s*$)/,sc=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,hr=/[\p{P}\p{S}]/u,os=/[\s\p{P}\p{S}]/u,ia=/[^\s\p{P}\p{S}]/u,oc=Ce(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,os).getRegex(),la=/(?!~)[\p{P}\p{S}]/u,ac=/(?!~)[\s\p{P}\p{S}]/u,ic=/(?:[^\s\p{P}\p{S}]|~)/u,lc=Ce(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",Hl?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),ca=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,cc=Ce(ca,"u").replace(/punct/g,hr).getRegex(),dc=Ce(ca,"u").replace(/punct/g,la).getRegex(),da="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",uc=Ce(da,"gu").replace(/notPunctSpace/g,ia).replace(/punctSpace/g,os).replace(/punct/g,hr).getRegex(),pc=Ce(da,"gu").replace(/notPunctSpace/g,ic).replace(/punctSpace/g,ac).replace(/punct/g,la).getRegex(),fc=Ce("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,ia).replace(/punctSpace/g,os).replace(/punct/g,hr).getRegex(),_c=Ce(/\\(punct)/,"gu").replace(/punct/g,hr).getRegex(),hc=Ce(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),mc=Ce(rs).replace("(?:-->|$)","-->").getRegex(),gc=Ce("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",mc).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),ur=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,bc=Ce(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",ur).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),ua=Ce(/^!?\[(label)\]\[(ref)\]/).replace("label",ur).replace("ref",ns).getRegex(),pa=Ce(/^!?\[(ref)\](?:\[\])?/).replace("ref",ns).getRegex(),vc=Ce("reflink|nolink(?!\\()","g").replace("reflink",ua).replace("nolink",pa).getRegex(),Xo=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,as={_backpedal:Pn,anyPunctuation:_c,autolink:hc,blockSkip:lc,br:aa,code:rc,del:Pn,emStrongLDelim:cc,emStrongRDelimAst:uc,emStrongRDelimUnd:fc,escape:nc,link:bc,nolink:pa,punctuation:oc,reflink:ua,reflinkSearch:vc,tag:gc,text:sc,url:Pn},wc={...as,link:Ce(/^!?\[(label)\]\((.*?)\)/).replace("label",ur).getRegex(),reflink:Ce(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",ur).getRegex()},Zr={...as,emStrongRDelimAst:pc,emStrongLDelim:dc,url:Ce(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",Xo).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:Ce(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",Xo).getRegex()},kc={...Zr,br:Ce(aa).replace("{2,}","*").getRegex(),text:Ce(Zr.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},cr={normal:ss,gfm:ec,pedantic:tc},On={normal:as,gfm:Zr,breaks:kc,pedantic:wc},yc={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Qo=e=>yc[e];function Ft(e,t){if(t){if(mt.escapeTest.test(e))return e.replace(mt.escapeReplace,Qo)}else if(mt.escapeTestNoEncode.test(e))return e.replace(mt.escapeReplaceNoEncode,Qo);return e}function Jo(e){try{e=encodeURI(e).replace(mt.percentDecode,"%")}catch{return null}return e}function ea(e,t){let n=e.replace(mt.findPipe,(o,a,l)=>{let i=!1,d=a;for(;--d>=0&&l[d]==="\\";)i=!i;return i?"|":" |"}),r=n.split(mt.splitPipe),s=0;if(r[0].trim()||r.shift(),r.length>0&&!r.at(-1)?.trim()&&r.pop(),t)if(r.length>t)r.splice(t);else for(;r.length<t;)r.push("");for(;s<r.length;s++)r[s]=r[s].trim().replace(mt.slashPipe,"|");return r}function Mn(e,t,n){let r=e.length;if(r===0)return"";let s=0;for(;s<r;){let o=e.charAt(r-s-1);if(o===t&&!n)s++;else if(o!==t&&n)s++;else break}return e.slice(0,r-s)}function $c(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let r=0;r<e.length;r++)if(e[r]==="\\")r++;else if(e[r]===t[0])n++;else if(e[r]===t[1]&&(n--,n<0))return r;return n>0?-2:-1}function ta(e,t,n,r,s){let o=t.href,a=t.title||null,l=e[1].replace(s.other.outputLinkReplace,"$1");r.state.inLink=!0;let i={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:o,title:a,text:l,tokens:r.inlineTokens(l)};return r.state.inLink=!1,i}function xc(e,t,n){let r=e.match(n.other.indentCodeCompensation);if(r===null)return t;let s=r[1];return t.split(`
`).map(o=>{let a=o.match(n.other.beginningSpace);if(a===null)return o;let[l]=a;return l.length>=s.length?o.slice(s.length):o}).join(`
`)}var pr=class{constructor(e){He(this,"options");He(this,"rules");He(this,"lexer");this.options=e||sn}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:Mn(n,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let n=t[0],r=xc(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:r}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){let r=Mn(n,"#");(this.options.pedantic||!r||this.rules.other.endingSpaceChar.test(r))&&(n=r.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:Mn(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let n=Mn(t[0],`
`).split(`
`),r="",s="",o=[];for(;n.length>0;){let a=!1,l=[],i;for(i=0;i<n.length;i++)if(this.rules.other.blockquoteStart.test(n[i]))l.push(n[i]),a=!0;else if(!a)l.push(n[i]);else break;n=n.slice(i);let d=l.join(`
`),f=d.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");r=r?`${r}
${d}`:d,s=s?`${s}
${f}`:f;let _=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(f,o,!0),this.lexer.state.top=_,n.length===0)break;let b=o.at(-1);if(b?.type==="code")break;if(b?.type==="blockquote"){let y=b,$=y.raw+`
`+n.join(`
`),g=this.blockquote($);o[o.length-1]=g,r=r.substring(0,r.length-y.raw.length)+g.raw,s=s.substring(0,s.length-y.text.length)+g.text;break}else if(b?.type==="list"){let y=b,$=y.raw+`
`+n.join(`
`),g=this.list($);o[o.length-1]=g,r=r.substring(0,r.length-b.raw.length)+g.raw,s=s.substring(0,s.length-y.raw.length)+g.raw,n=$.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:r,tokens:o,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim(),r=n.length>1,s={type:"list",raw:"",ordered:r,start:r?+n.slice(0,-1):"",loose:!1,items:[]};n=r?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=r?n:"[*+-]");let o=this.rules.other.listItemRegex(n),a=!1;for(;e;){let i=!1,d="",f="";if(!(t=o.exec(e))||this.rules.block.hr.test(e))break;d=t[0],e=e.substring(d.length);let _=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,g=>" ".repeat(3*g.length)),b=e.split(`
`,1)[0],y=!_.trim(),$=0;if(this.options.pedantic?($=2,f=_.trimStart()):y?$=t[1].length+1:($=t[2].search(this.rules.other.nonSpaceChar),$=$>4?1:$,f=_.slice($),$+=t[1].length),y&&this.rules.other.blankLine.test(b)&&(d+=b+`
`,e=e.substring(b.length+1),i=!0),!i){let g=this.rules.other.nextBulletRegex($),R=this.rules.other.hrRegex($),H=this.rules.other.fencesBeginRegex($),z=this.rules.other.headingBeginRegex($),Y=this.rules.other.htmlBeginRegex($);for(;e;){let M=e.split(`
`,1)[0],E;if(b=M,this.options.pedantic?(b=b.replace(this.rules.other.listReplaceNesting,"  "),E=b):E=b.replace(this.rules.other.tabCharGlobal,"    "),H.test(b)||z.test(b)||Y.test(b)||g.test(b)||R.test(b))break;if(E.search(this.rules.other.nonSpaceChar)>=$||!b.trim())f+=`
`+E.slice($);else{if(y||_.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||H.test(_)||z.test(_)||R.test(_))break;f+=`
`+b}!y&&!b.trim()&&(y=!0),d+=M+`
`,e=e.substring(M.length+1),_=E.slice($)}}s.loose||(a?s.loose=!0:this.rules.other.doubleBlankLine.test(d)&&(a=!0)),s.items.push({type:"list_item",raw:d,task:!!this.options.gfm&&this.rules.other.listIsTask.test(f),loose:!1,text:f,tokens:[]}),s.raw+=d}let l=s.items.at(-1);if(l)l.raw=l.raw.trimEnd(),l.text=l.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let i of s.items){if(this.lexer.state.top=!1,i.tokens=this.lexer.blockTokens(i.text,[]),i.task){if(i.text=i.text.replace(this.rules.other.listReplaceTask,""),i.tokens[0]?.type==="text"||i.tokens[0]?.type==="paragraph"){i.tokens[0].raw=i.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),i.tokens[0].text=i.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let f=this.lexer.inlineQueue.length-1;f>=0;f--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[f].src)){this.lexer.inlineQueue[f].src=this.lexer.inlineQueue[f].src.replace(this.rules.other.listReplaceTask,"");break}}let d=this.rules.other.listTaskCheckbox.exec(i.raw);if(d){let f={type:"checkbox",raw:d[0]+" ",checked:d[0]!=="[ ]"};i.checked=f.checked,s.loose?i.tokens[0]&&["paragraph","text"].includes(i.tokens[0].type)&&"tokens"in i.tokens[0]&&i.tokens[0].tokens?(i.tokens[0].raw=f.raw+i.tokens[0].raw,i.tokens[0].text=f.raw+i.tokens[0].text,i.tokens[0].tokens.unshift(f)):i.tokens.unshift({type:"paragraph",raw:f.raw,text:f.raw,tokens:[f]}):i.tokens.unshift(f)}}if(!s.loose){let d=i.tokens.filter(_=>_.type==="space"),f=d.length>0&&d.some(_=>this.rules.other.anyLine.test(_.raw));s.loose=f}}if(s.loose)for(let i of s.items){i.loose=!0;for(let d of i.tokens)d.type==="text"&&(d.type="paragraph")}return s}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),r=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:r,title:s}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let n=ea(t[1]),r=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===r.length){for(let a of r)this.rules.other.tableAlignRight.test(a)?o.align.push("right"):this.rules.other.tableAlignCenter.test(a)?o.align.push("center"):this.rules.other.tableAlignLeft.test(a)?o.align.push("left"):o.align.push(null);for(let a=0;a<n.length;a++)o.header.push({text:n[a],tokens:this.lexer.inline(n[a]),header:!0,align:o.align[a]});for(let a of s)o.rows.push(ea(a,o.header.length).map((l,i)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:o.align[i]})));return o}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;let o=Mn(n.slice(0,-1),"\\");if((n.length-o.length)%2===0)return}else{let o=$c(t[2],"()");if(o===-2)return;if(o>-1){let a=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,a).trim(),t[3]=""}}let r=t[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(r);o&&(r=o[1],s=o[3])}else s=t[3]?t[3].slice(1,-1):"";return r=r.trim(),this.rules.other.startAngleBracket.test(r)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?r=r.slice(1):r=r.slice(1,-1)),ta(t,{href:r&&r.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let r=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[r.toLowerCase()];if(!s){let o=n[0].charAt(0);return{type:"text",raw:o,text:o}}return ta(n,s,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let r=this.rules.inline.emStrongLDelim.exec(e);if(!(!r||r[3]&&n.match(this.rules.other.unicodeAlphaNumeric))&&(!(r[1]||r[2])||!n||this.rules.inline.punctuation.exec(n))){let s=[...r[0]].length-1,o,a,l=s,i=0,d=r[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(d.lastIndex=0,t=t.slice(-1*e.length+s);(r=d.exec(t))!=null;){if(o=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!o)continue;if(a=[...o].length,r[3]||r[4]){l+=a;continue}else if((r[5]||r[6])&&s%3&&!((s+a)%3)){i+=a;continue}if(l-=a,l>0)continue;a=Math.min(a,a+l+i);let f=[...r[0]][0].length,_=e.slice(0,s+r.index+f+a);if(Math.min(s,a)%2){let y=_.slice(1,-1);return{type:"em",raw:_,text:y,tokens:this.lexer.inlineTokens(y)}}let b=_.slice(2,-2);return{type:"strong",raw:_,text:b,tokens:this.lexer.inlineTokens(b)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," "),r=this.rules.other.nonSpaceChar.test(n),s=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return r&&s&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let n,r;return t[2]==="@"?(n=t[1],r="mailto:"+n):(n=t[1],r=n),{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let n,r;if(t[2]==="@")n=t[0],r="mailto:"+n;else{let s;do s=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(s!==t[0]);n=t[0],t[1]==="www."?r="http://"+t[0]:r=t[0]}return{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},At=class Xr{constructor(t){He(this,"tokens");He(this,"options");He(this,"state");He(this,"inlineQueue");He(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||sn,this.options.tokenizer=this.options.tokenizer||new pr,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let n={other:mt,block:cr.normal,inline:On.normal};this.options.pedantic?(n.block=cr.pedantic,n.inline=On.pedantic):this.options.gfm&&(n.block=cr.gfm,this.options.breaks?n.inline=On.breaks:n.inline=On.gfm),this.tokenizer.rules=n}static get rules(){return{block:cr,inline:On}}static lex(t,n){return new Xr(n).lex(t)}static lexInline(t,n){return new Xr(n).inlineTokens(t)}lex(t){t=t.replace(mt.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){let r=this.inlineQueue[n];this.inlineTokens(r.src,r.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,n=[],r=!1){for(this.options.pedantic&&(t=t.replace(mt.tabCharGlobal,"    ").replace(mt.spaceLine,""));t;){let s;if(this.options.extensions?.block?.some(a=>(s=a.call({lexer:this},t,n))?(t=t.substring(s.raw.length),n.push(s),!0):!1))continue;if(s=this.tokenizer.space(t)){t=t.substring(s.raw.length);let a=n.at(-1);s.raw.length===1&&a!==void 0?a.raw+=`
`:n.push(s);continue}if(s=this.tokenizer.code(t)){t=t.substring(s.raw.length);let a=n.at(-1);a?.type==="paragraph"||a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.at(-1).src=a.text):n.push(s);continue}if(s=this.tokenizer.fences(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.heading(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.hr(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.blockquote(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.list(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.html(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.def(t)){t=t.substring(s.raw.length);let a=n.at(-1);a?.type==="paragraph"||a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.raw,this.inlineQueue.at(-1).src=a.text):this.tokens.links[s.tag]||(this.tokens.links[s.tag]={href:s.href,title:s.title},n.push(s));continue}if(s=this.tokenizer.table(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.lheading(t)){t=t.substring(s.raw.length),n.push(s);continue}let o=t;if(this.options.extensions?.startBlock){let a=1/0,l=t.slice(1),i;this.options.extensions.startBlock.forEach(d=>{i=d.call({lexer:this},l),typeof i=="number"&&i>=0&&(a=Math.min(a,i))}),a<1/0&&a>=0&&(o=t.substring(0,a+1))}if(this.state.top&&(s=this.tokenizer.paragraph(o))){let a=n.at(-1);r&&a?.type==="paragraph"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):n.push(s),r=o.length!==t.length,t=t.substring(s.raw.length);continue}if(s=this.tokenizer.text(t)){t=t.substring(s.raw.length);let a=n.at(-1);a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):n.push(s);continue}if(t){let a="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(a);break}else throw new Error(a)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){let r=t,s=null;if(this.tokens.links){let i=Object.keys(this.tokens.links);if(i.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(r))!=null;)i.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(r=r.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(r))!=null;)r=r.slice(0,s.index)+"++"+r.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(r))!=null;)o=s[2]?s[2].length:0,r=r.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+r.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);r=this.options.hooks?.emStrongMask?.call({lexer:this},r)??r;let a=!1,l="";for(;t;){a||(l=""),a=!1;let i;if(this.options.extensions?.inline?.some(f=>(i=f.call({lexer:this},t,n))?(t=t.substring(i.raw.length),n.push(i),!0):!1))continue;if(i=this.tokenizer.escape(t)){t=t.substring(i.raw.length),n.push(i);continue}if(i=this.tokenizer.tag(t)){t=t.substring(i.raw.length),n.push(i);continue}if(i=this.tokenizer.link(t)){t=t.substring(i.raw.length),n.push(i);continue}if(i=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(i.raw.length);let f=n.at(-1);i.type==="text"&&f?.type==="text"?(f.raw+=i.raw,f.text+=i.text):n.push(i);continue}if(i=this.tokenizer.emStrong(t,r,l)){t=t.substring(i.raw.length),n.push(i);continue}if(i=this.tokenizer.codespan(t)){t=t.substring(i.raw.length),n.push(i);continue}if(i=this.tokenizer.br(t)){t=t.substring(i.raw.length),n.push(i);continue}if(i=this.tokenizer.del(t)){t=t.substring(i.raw.length),n.push(i);continue}if(i=this.tokenizer.autolink(t)){t=t.substring(i.raw.length),n.push(i);continue}if(!this.state.inLink&&(i=this.tokenizer.url(t))){t=t.substring(i.raw.length),n.push(i);continue}let d=t;if(this.options.extensions?.startInline){let f=1/0,_=t.slice(1),b;this.options.extensions.startInline.forEach(y=>{b=y.call({lexer:this},_),typeof b=="number"&&b>=0&&(f=Math.min(f,b))}),f<1/0&&f>=0&&(d=t.substring(0,f+1))}if(i=this.tokenizer.inlineText(d)){t=t.substring(i.raw.length),i.raw.slice(-1)!=="_"&&(l=i.raw.slice(-1)),a=!0;let f=n.at(-1);f?.type==="text"?(f.raw+=i.raw,f.text+=i.text):n.push(i);continue}if(t){let f="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(f);break}else throw new Error(f)}}return n}},fr=class{constructor(e){He(this,"options");He(this,"parser");this.options=e||sn}space(e){return""}code({text:e,lang:t,escaped:n}){let r=(t||"").match(mt.notSpaceStart)?.[0],s=e.replace(mt.endingNewline,"")+`
`;return r?'<pre><code class="language-'+Ft(r)+'">'+(n?s:Ft(s,!0))+`</code></pre>
`:"<pre><code>"+(n?s:Ft(s,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}def(e){return""}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return`<hr>
`}list(e){let t=e.ordered,n=e.start,r="";for(let a=0;a<e.items.length;a++){let l=e.items[a];r+=this.listitem(l)}let s=t?"ol":"ul",o=t&&n!==1?' start="'+n+'"':"";return"<"+s+o+`>
`+r+"</"+s+`>
`}listitem(e){return`<li>${this.parser.parse(e.tokens)}</li>
`}checkbox({checked:e}){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox"> '}paragraph({tokens:e}){return`<p>${this.parser.parseInline(e)}</p>
`}table(e){let t="",n="";for(let s=0;s<e.header.length;s++)n+=this.tablecell(e.header[s]);t+=this.tablerow({text:n});let r="";for(let s=0;s<e.rows.length;s++){let o=e.rows[s];n="";for(let a=0;a<o.length;a++)n+=this.tablecell(o[a]);r+=this.tablerow({text:n})}return r&&(r=`<tbody>${r}</tbody>`),`<table>
<thead>
`+t+`</thead>
`+r+`</table>
`}tablerow({text:e}){return`<tr>
${e}</tr>
`}tablecell(e){let t=this.parser.parseInline(e.tokens),n=e.header?"th":"td";return(e.align?`<${n} align="${e.align}">`:`<${n}>`)+t+`</${n}>
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${Ft(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){let r=this.parser.parseInline(n),s=Jo(e);if(s===null)return r;e=s;let o='<a href="'+e+'"';return t&&(o+=' title="'+Ft(t)+'"'),o+=">"+r+"</a>",o}image({href:e,title:t,text:n,tokens:r}){r&&(n=this.parser.parseInline(r,this.parser.textRenderer));let s=Jo(e);if(s===null)return Ft(n);e=s;let o=`<img src="${e}" alt="${n}"`;return t&&(o+=` title="${Ft(t)}"`),o+=">",o}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:Ft(e.text)}},is=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},Tt=class Qr{constructor(t){He(this,"options");He(this,"renderer");He(this,"textRenderer");this.options=t||sn,this.options.renderer=this.options.renderer||new fr,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new is}static parse(t,n){return new Qr(n).parse(t)}static parseInline(t,n){return new Qr(n).parseInline(t)}parse(t){let n="";for(let r=0;r<t.length;r++){let s=t[r];if(this.options.extensions?.renderers?.[s.type]){let a=s,l=this.options.extensions.renderers[a.type].call({parser:this},a);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(a.type)){n+=l||"";continue}}let o=s;switch(o.type){case"space":{n+=this.renderer.space(o);break}case"hr":{n+=this.renderer.hr(o);break}case"heading":{n+=this.renderer.heading(o);break}case"code":{n+=this.renderer.code(o);break}case"table":{n+=this.renderer.table(o);break}case"blockquote":{n+=this.renderer.blockquote(o);break}case"list":{n+=this.renderer.list(o);break}case"checkbox":{n+=this.renderer.checkbox(o);break}case"html":{n+=this.renderer.html(o);break}case"def":{n+=this.renderer.def(o);break}case"paragraph":{n+=this.renderer.paragraph(o);break}case"text":{n+=this.renderer.text(o);break}default:{let a='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return n}parseInline(t,n=this.renderer){let r="";for(let s=0;s<t.length;s++){let o=t[s];if(this.options.extensions?.renderers?.[o.type]){let l=this.options.extensions.renderers[o.type].call({parser:this},o);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){r+=l||"";continue}}let a=o;switch(a.type){case"escape":{r+=n.text(a);break}case"html":{r+=n.html(a);break}case"link":{r+=n.link(a);break}case"image":{r+=n.image(a);break}case"checkbox":{r+=n.checkbox(a);break}case"strong":{r+=n.strong(a);break}case"em":{r+=n.em(a);break}case"codespan":{r+=n.codespan(a);break}case"br":{r+=n.br(a);break}case"del":{r+=n.del(a);break}case"text":{r+=n.text(a);break}default:{let l='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return r}},dr,Nn=(dr=class{constructor(e){He(this,"options");He(this,"block");this.options=e||sn}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?At.lex:At.lexInline}provideParser(){return this.block?Tt.parse:Tt.parseInline}},He(dr,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),He(dr,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),dr),Sc=class{constructor(...e){He(this,"defaults",Jr());He(this,"options",this.setOptions);He(this,"parse",this.parseMarkdown(!0));He(this,"parseInline",this.parseMarkdown(!1));He(this,"Parser",Tt);He(this,"Renderer",fr);He(this,"TextRenderer",is);He(this,"Lexer",At);He(this,"Tokenizer",pr);He(this,"Hooks",Nn);this.use(...e)}walkTokens(e,t){let n=[];for(let r of e)switch(n=n.concat(t.call(this,r)),r.type){case"table":{let s=r;for(let o of s.header)n=n.concat(this.walkTokens(o.tokens,t));for(let o of s.rows)for(let a of o)n=n.concat(this.walkTokens(a.tokens,t));break}case"list":{let s=r;n=n.concat(this.walkTokens(s.items,t));break}default:{let s=r;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let a=s[o].flat(1/0);n=n.concat(this.walkTokens(a,t))}):s.tokens&&(n=n.concat(this.walkTokens(s.tokens,t)))}}return n}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{let r={...n};if(r.async=this.defaults.async||r.async||!1,n.extensions&&(n.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=t.renderers[s.name];o?t.renderers[s.name]=function(...a){let l=s.renderer.apply(this,a);return l===!1&&(l=o.apply(this,a)),l}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=t[s.level];o?o.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),r.extensions=t),n.renderer){let s=this.defaults.renderer||new fr(this.defaults);for(let o in n.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let a=o,l=n.renderer[a],i=s[a];s[a]=(...d)=>{let f=l.apply(s,d);return f===!1&&(f=i.apply(s,d)),f||""}}r.renderer=s}if(n.tokenizer){let s=this.defaults.tokenizer||new pr(this.defaults);for(let o in n.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let a=o,l=n.tokenizer[a],i=s[a];s[a]=(...d)=>{let f=l.apply(s,d);return f===!1&&(f=i.apply(s,d)),f}}r.tokenizer=s}if(n.hooks){let s=this.defaults.hooks||new Nn;for(let o in n.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let a=o,l=n.hooks[a],i=s[a];Nn.passThroughHooks.has(o)?s[a]=d=>{if(this.defaults.async&&Nn.passThroughHooksRespectAsync.has(o))return(async()=>{let _=await l.call(s,d);return i.call(s,_)})();let f=l.call(s,d);return i.call(s,f)}:s[a]=(...d)=>{if(this.defaults.async)return(async()=>{let _=await l.apply(s,d);return _===!1&&(_=await i.apply(s,d)),_})();let f=l.apply(s,d);return f===!1&&(f=i.apply(s,d)),f}}r.hooks=s}if(n.walkTokens){let s=this.defaults.walkTokens,o=n.walkTokens;r.walkTokens=function(a){let l=[];return l.push(o.call(this,a)),s&&(l=l.concat(s.call(this,a))),l}}this.defaults={...this.defaults,...r}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return At.lex(e,t??this.defaults)}parser(e,t){return Tt.parse(e,t??this.defaults)}parseMarkdown(e){return(t,n)=>{let r={...n},s={...this.defaults,...r},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&r.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=e),s.async)return(async()=>{let a=s.hooks?await s.hooks.preprocess(t):t,l=await(s.hooks?await s.hooks.provideLexer():e?At.lex:At.lexInline)(a,s),i=s.hooks?await s.hooks.processAllTokens(l):l;s.walkTokens&&await Promise.all(this.walkTokens(i,s.walkTokens));let d=await(s.hooks?await s.hooks.provideParser():e?Tt.parse:Tt.parseInline)(i,s);return s.hooks?await s.hooks.postprocess(d):d})().catch(o);try{s.hooks&&(t=s.hooks.preprocess(t));let a=(s.hooks?s.hooks.provideLexer():e?At.lex:At.lexInline)(t,s);s.hooks&&(a=s.hooks.processAllTokens(a)),s.walkTokens&&this.walkTokens(a,s.walkTokens);let l=(s.hooks?s.hooks.provideParser():e?Tt.parse:Tt.parseInline)(a,s);return s.hooks&&(l=s.hooks.postprocess(l)),l}catch(a){return o(a)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let r="<p>An error occurred:</p><pre>"+Ft(n.message+"",!0)+"</pre>";return t?Promise.resolve(r):r}if(t)return Promise.reject(n);throw n}}},rn=new Sc;function Me(e,t){return rn.parse(e,t)}Me.options=Me.setOptions=function(e){return rn.setOptions(e),Me.defaults=rn.defaults,na(Me.defaults),Me};Me.getDefaults=Jr;Me.defaults=sn;Me.use=function(...e){return rn.use(...e),Me.defaults=rn.defaults,na(Me.defaults),Me};Me.walkTokens=function(e,t){return rn.walkTokens(e,t)};Me.parseInline=rn.parseInline;Me.Parser=Tt;Me.parser=Tt.parse;Me.Renderer=fr;Me.TextRenderer=is;Me.Lexer=At;Me.lexer=At.lex;Me.Tokenizer=pr;Me.Hooks=Nn;Me.parse=Me;var Ap=Me.options,Tp=Me.setOptions,Ep=Me.use,Cp=Me.walkTokens,Rp=Me.parseInline;var Ip=Tt.parse,Lp=At.lex;function zt(e){let t=Me.parse(e),n=jo.sanitize(t);return Ko(n)}var Ac={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},Tc=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,Ec=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function Ht(e){return!!e&&typeof e=="object"}function ls(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function fa(e,t){let n=ls(e),r=ls(t),s=new Map;for(let l of n)s.set(l,(s.get(l)||0)+1);let o=0;for(let l of r){let i=s.get(l)||0;i>0?s.set(l,i-1):o+=1}let a=0;for(let l of s.values())a+=l;return{added:o,removed:a}}function Cc(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(s=>Ht(s)&&typeof s.text=="string"?s.text:"").join(""):Ht(e)&&typeof e.text=="string"&&(t=e.text);let r=(String(t).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return r.length>120?`${r.slice(0,117)}\u2026`:r}function Rc(e){let t=String(e.name||""),n=e.input||{},r={kind:"tool",tool:t,icon:Ac[t]||"\u{1F527}",input:n,expandable:!0};if((t==="Read"||t==="Write")&&(r.path=String(n.file_path||n.path||"")),t==="Write"&&(r.added=ls(n.content).length),t==="Edit"){r.path=String(n.file_path||n.path||"");let{added:s,removed:o}=fa(n.old_string,n.new_string);r.added=s,r.removed=o}if(t==="MultiEdit"){r.path=String(n.file_path||n.path||"");let s=0,o=0,a=Array.isArray(n.edits)?n.edits:[];for(let l of a){let i=fa(Ht(l)?l.old_string:"",Ht(l)?l.new_string:"");s+=i.added,o+=i.removed}r.added=s,r.removed=o}return t==="Bash"&&(r.command=String(n.command||"")),(t==="Grep"||t==="Glob")&&(r.command=String(n.pattern||n.query||"")),r}function _a(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}function ha(e){let t=e.split(/\r?\n/).find(r=>r.trim().length>0)||"",n=Tc.exec(t);return n?{kind:"gate",gate:n[2]==="implementation"?"impl":n[2],reviewer:n[3],verdict:n[4],time:n[5]?n[5].trim():void 0,text:t.trim()}:Ec.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function Ic(e,t){if(e.type==="assistant"){let n=e.message,r=n&&Array.isArray(n.content)?n.content:[],s=[];for(let o of r)if(Ht(o)){if(o.type==="text"&&typeof o.text=="string")s.push(ha(o.text));else if(o.type==="thinking"){let a=_a(o.thinking);a&&s.push(a)}else if(o.type==="tool_use"){let a=Rc(o);typeof o.id=="string"&&t.set(o.id,a),s.push(a)}}return s}if(e.type==="user"){let n=e.message,r=n&&Array.isArray(n.content)?n.content:[];for(let s of r)if(Ht(s)&&s.type==="tool_result"){let o=t.get(String(s.tool_use_id));if(o){let a=Cc(s.content);o.result=a,o.output=typeof s.content=="string"?s.content:a}}return[]}if(e.type==="result"){let n=e.is_error===!1&&e.subtype==="success";return[{kind:"result",success:n,text:typeof e.result=="string"?e.result:n?"DONE":""}]}return[]}function Lc(e){if(e.type==="item.completed"&&Ht(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[ha(t.text)];if(t.type==="reasoning"){let n=_a(t.text);return n?[n]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function Dc(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function ma(e){let t=[],n=new Map,r=Array.isArray(e)?e:[];for(let s of r){let o=s;if(typeof s=="string"){let l=s.trim();if(l.length===0)continue;try{o=JSON.parse(l)}catch{continue}}if(!Ht(o))continue;let a=Dc(o)?Lc(o):Ic(o,n);for(let l of a)t.push(l)}return t}var Oc=5,Mc=10,Nc=/Task\s+#(\d+)/,Pc=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,Fc=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function mr(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function qc(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function Bc(e){for(let t=e.length-1;t>=0;t-=1){let n=e[t];if(n.kind==="phase"||n.kind==="gate")return n.text||null}return null}function Uc(e){let t=new Map,n=0;for(let s of e){if(s.kind!=="tool")continue;n+=1;let o=s.input||{};if(s.tool==="TaskCreate"){let i=Nc.exec(s.output||s.result||""),d=String(o.activeForm||o.subject||"").trim();if(!i||d.length===0)continue;t.set(i[1],{label:d,active:o.status==="in_progress"?n:0});continue}if(s.tool!=="TaskUpdate")continue;let a=t.get(String(o.taskId??""));if(!a)continue;let l=o.activeForm||o.subject;typeof l=="string"&&l.trim().length>0&&(a.label=l.trim()),typeof o.status=="string"&&(a.active=o.status==="in_progress"?n:0)}let r=null;for(let s of t.values())s.active>0&&(!r||s.active>r.active)&&(r=s);return r?r.label:null}function zc(e){if(e.tool==="Bash"){let t=e.command||"";return Pc.test(t)?"~ PR/\uAC8C\uC2DC \uC911":Fc.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function Hc(e){let t=e.filter(s=>s.kind==="tool").slice(-Mc),n=new Map;t.forEach((s,o)=>{let a=zc(s);if(!a)return;let l=n.get(a)||{count:0,last:-1};l.count+=1,l.last=o,n.set(a,l)});let r=null;for(let[s,o]of n)(!r||o.count>r.count||o.count===r.count&&o.last>r.last)&&(r={label:s,count:o.count,last:o.last});return r?r.label:null}function Wc(e){let t=Bc(e);if(t)return{text:t,guess:!1};let n=Uc(e);if(n)return{text:n,guess:!1};let r=Hc(e);return r?{text:r,guess:!0}:null}function Gc(e,t){if(typeof e!="number")return"";let n=Math.max(0,Math.floor((t-e)/1e3));return n<60?`${n}\uCD08 \uC804`:wt(e,t)}function gr(e,t={}){let{transport:n,sessionLogStore:r,onClose:s}=t,o=null,a={},l=!0,i=new Set,d=new Set,f=null,_=null;function b(){if(!o||!r)return[];let A=r.get(o);return ma(A?A.lines:[])}function y(){if(!o||!r)return null;let A=r.get(o),T=A?A.last_event_at:null;return typeof T=="number"?T:null}function $(){return a.status==="running"}function g(){if($()&&o){_||(_=setInterval(()=>G(),1e3));return}R()}function R(){_&&(clearInterval(_),_=null)}function H(A){let T=[],X=0;for(;X<A.length;){let ne=A[X];if(ne.kind==="tool"){let de=X;for(;de<A.length&&A[de].kind==="tool"&&A[de].tool===ne.tool;)de+=1;if(de-X>=Oc&&!d.has(X)){T.push({kind:"group",idx:X,tool:ne.tool||"",lines:A.slice(X,de).map((fe,De)=>({idx:X+De,line:fe}))}),X=de;continue}}T.push({kind:"line",idx:X,line:ne}),X+=1}return T}function z(A){for(let T=A.length-1;T>=0;T-=1){let X=A[T];if(X.kind==="result"||X.kind==="error")return null;if(X.kind==="tool"&&!Object.hasOwn(X,"result"))return X}return null}function Y(A){for(let T=A.length-1;T>=0;T-=1)if(A[T].kind==="thinking")return A[T];return null}function M(A,T){if(T.kind==="gate")return c`<div class="sv__gate">${T.text}</div>`;if(T.kind==="phase")return c`<div class="sv__phase">${T.text}</div>`;if(T.kind==="result")return c`<div
        class="sv__result${T.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${T.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${zt(T.text||(T.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(T.kind==="thinking"){let X=i.has(A);return c`<div
        class="sv__think${X?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>Z(A)}
      >
        <span class="sv__think-line">💭 ${mr(T.text)}</span>
        ${X?c`<pre class="sv__think-expand">${T.text}</pre>`:""}
      </div>`}if(T.kind==="error")return c`<div class="sv__error">⛔ ${T.text}</div>`;if(T.kind==="blocker")return c`<div class="sv__error">⛔ ${T.text}</div>`;if(T.kind==="tool"){let X=i.has(A),ne=T.tool==="Bash"?qc(T.command):0,de=T.tool==="Bash"?ne>1?mr(T.command):T.command:T.path||T.command||"";return c`<div
        class="sv__tool${X?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>Z(A)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${T.icon}</span>
          <span class="sv__tool-name">${T.tool}</span>
          ${de?c`<span class="sv__tool-detail">${de}</span>`:""}
          ${ne>1?c`<span class="sv__tool-more">⋯ ${ne}줄</span>`:""}
          ${typeof T.added=="number"?c`<span class="sv__diff-add">+${T.added}</span>`:""}
          ${typeof T.removed=="number"?c`<span class="sv__diff-del">−${T.removed}</span>`:""}
          ${T.result?c`<span class="sv__tool-ok">→ ${T.result}</span>`:""}
        </span>
        ${X?c`<pre class="sv__tool-expand">${E(T)}</pre>`:""}
      </div>`}return c`<div class="sv__as">${zt(T.text||"")}</div>`}function E(A){let T=[];if(A.tool==="Bash"&&typeof A.command=="string"&&A.command.length>0)T.push(A.command);else if(A.input!==void 0)try{T.push(`input: ${JSON.stringify(A.input,null,2)}`)}catch{}return typeof A.output=="string"&&A.output.length>0&&T.push(`output:
${A.output}`),T.join(`

`)}function S(){if(!o)return c``;let A=b(),T=[a.runner,a.model,a.effort].filter(Boolean).join(" \xB7 "),X=a.session_id||"",ne=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${l?"ON":"OFF"}`,de=$(),fe=de?Gc(y(),Date.now()):"",De=de?z(A):null,_e=de?Y(A):null,Re=Wc(A);return c`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id">${o}</span>
        ${Re?c`<span
              class="sv__stage${Re.guess?" sv__stage--guess":""}"
              title=${Re.text}
              >${Re.text}</span
            >`:""}
        ${de?c`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${fe?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${fe}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${fe?c`<span class="sv__live-ago">${fe}</span>`:""}</span
            >`:""}
        ${X?c`<button
              type="button"
              class="sv__session"
              title=${X}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${X}`}
              @click=${()=>Ne(X)}
            >
              ⧉ ${X.slice(0,8)}
            </button>`:""}
        ${T?c`<span class="sv__meta">${T}</span>`:""}
        ${a.worktree?c`<span class="sv__wt" title=${a.worktree}
              >${a.worktree}</span
            >`:""}
        <button
          type="button"
          class="sv__follow${l?" sv__follow--on":""}"
          aria-pressed=${l?"true":"false"}
          aria-label=${ne}
          @click=${ce}
        >
          <span class="sv__follow-full">⇣ ${ne}</span>
          <span class="sv__follow-short">⇣ ${l?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>ee()}
        >
          ✕
        </button>
      </div>
      <div class="sv__body">
        ${A.length===0?c`<div class="sv__empty">세션 로그 없음</div>`:H(A).map(We=>We.kind==="group"?L(We):M(We.idx,We.line))}
      </div>
      ${De||_e?c`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${De?c`<span class="sv__now-icon">${De.icon}</span>
                  <span class="sv__now-name">${De.tool}</span>
                  <span class="sv__now-detail"
                    >${De.tool==="Bash"?mr(De.command):De.path||De.command||""}</span
                  >`:""}
            ${_e?c`<span class="sv__now-think"
                  >💭 ${mr(_e.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function L(A){return c`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>x(A.idx)}
    >
      <span class="sv__group-icon">${A.lines[0].line.icon}</span>
      <span class="sv__group-name">${A.tool}</span>
      <span class="sv__group-count">${A.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function x(A){d.add(A),G()}function G(){Le(S(),e),g(),l&&V()}function V(){let A=e.querySelector(".sv__body");A&&(A.scrollTop=A.scrollHeight)}function Z(A){i.has(A)?i.delete(A):i.add(A),G()}function ce(){l=!l,G()}function Ne(A){tn(A).then(T=>{T?ie("\uBCF5\uC0AC\uB428","success",1200):ie("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function Ze(A){!o||!A||(a={...a,...A},G())}function xe(A){let T=A.target;if(!T||!T.classList||!T.classList.contains("sv__body"))return;!(T.scrollHeight-T.scrollTop-T.clientHeight<=4)&&l&&(l=!1,G())}e.addEventListener("scroll",xe,!0);function Q(A){let T=A&&A.attempt_id;T&&(o=T,a=A.meta||{},l=!0,i.clear(),d.clear(),!f&&r&&(f=r.subscribe(G)),n&&Promise.resolve(n("subscribe-session-log",{id:`session-log:${o}`,attempt_id:o})).catch(()=>{}),G())}function ee(){let A=o;o=null,i.clear(),d.clear(),R(),n&&A&&Promise.resolve(n("unsubscribe-session-log",{id:`session-log:${A}`})).catch(()=>{}),Le(c``,e),s&&s()}return{open:Q,updateMeta:Ze,close:ee,isOpen(){return o!==null},destroy(){R(),f&&(f(),f=null),e.removeEventListener("scroll",xe,!0),o=null,Le(c``,e)}}}function jc(e){let t=e&&e.metadata||{},n=[];return typeof t.spec_id=="string"&&t.spec_id.trim().length>0&&n.push({kind:"spec",path:t.spec_id.trim()}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&n.push({kind:"plan",path:t.plan_path.trim()}),n}function ga(e,t){let n=jc(e);return c`
    <div class="detail-section-label">Artifacts</div>
    ${n.length===0?c`<div class="detail-empty">산출물 없음</div>`:c`
          ${n.map(r=>c`<div class="detail-art">
                <span class="detail-art__ic" aria-hidden="true">▤</span>
                <button
                  type="button"
                  class="detail-art__path"
                  title=${`${r.path} \xB7 \uD074\uB9AD\uD558\uBA74 \uBCF5\uC0AC`}
                  @click=${s=>t.onCopyPath(s,r.path)}
                >
                  ${r.path}
                </button>
                <button
                  type="button"
                  class="detail-art__op"
                  @click=${s=>t.onOpenDoc(s,r.path)}
                >
                  열기
                </button>
              </div>`)}
          <div class="detail-art__cap">경로 클릭 = 복사 · 열기 = 뷰어</div>
        `}
  `}var Yc="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",Vc=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,Kc=/^\*\*결론\*\* — (.+)$/;function ba(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(`
`);if((t[0]||"").trimEnd()!==Yc)return null;let n=Vc.exec((t[1]||"").trimEnd());if(!n)return null;let r=n[1].split(" ")[0],s=n[2],o=n[3],a=2;for(;a<t.length&&t[a].trim().length===0;)a+=1;let l=a<t.length?Kc.exec(t[a].trim()):null,i=l?l[1].replace(/\s+/g," ").trim():"",d=l?a+1:a;return{lane:r,identifier:s,timestamp:o,conclusion:i,body:t.slice(d).join(`
`).trim()}}var va=20;function wa(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let n=String(t.getMonth()+1).padStart(2,"0"),r=String(t.getDate()).padStart(2,"0"),s=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0");return`${n}-${r} ${s}:${o}`}function Zc(e){return e.length>va?`${e.slice(0,va)}\u2026`:e}function Xc(e,t,n,r){let s=`${t.lane} ${Zc(t.identifier)}`;return c`<div class="detail-report">
    <button
      type="button"
      class="detail-report__head"
      data-comment-id=${e.id}
      aria-expanded=${r?"true":"false"}
      @click=${()=>n.onToggle&&n.onToggle(e.id)}
    >
      <span class="detail-report__tri">${r?"\u25BE":"\u25B8"}</span>
      <span class="detail-report__glyph">🤖</span>
      <span class="detail-report__meta">
        <span class="detail-report__kind">작업 보고서</span>
        <span
          class="detail-report__lane${t.lane==="worker"?" detail-report__lane--worker":""}"
          title=${`${t.lane} ${t.identifier} \xB7 ${t.timestamp}`}
          >${s}</span
        >
        <span class="detail-report__time">${wa(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${r&&t.body.length>0?c`<div class="detail-report__body">
          ${zt(t.body)}
        </div>`:""}
  </div>`}function Qc(e){return c`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${wa(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${zt(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function ka(e,t={},n={}){let r=Array.isArray(e)?e.filter(Boolean):[],s=n.expanded||new Set,o=typeof n.draft=="string"?n.draft:"",a=n.sending===!0,l=r.slice().sort((i,d)=>String(d.created_at||"").localeCompare(String(i.created_at||"")));return c`
    <div class="detail-section-label">댓글 (${r.length})</div>
    ${n.error?c`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:l.length===0?c`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:c`<div class="detail-comments" data-seam="comments">
            ${l.map(i=>{let d=ba(typeof i.text=="string"?i.text:"");return d?Xc(i,d,t,s.has(i.id)):Qc(i)})}
          </div>`}
    <div class="detail-comment-compose">
      <textarea
        class="detail-comment-compose__input"
        aria-label="댓글 추가"
        placeholder="댓글 추가"
        rows="3"
        ?disabled=${a}
        .value=${o}
        @input=${i=>t.onDraftInput&&t.onDraftInput(i.target.value)}
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
  `}var cs=["opus","sonnet","haiku","fable"],ds=["low","medium","high","xhigh"],us=["codex","opus","fable","self","skip"],ps=["opus","fable","sonnet","haiku"],Jc=["standard","fast_track"],fs={orchestration_model:"(\uAE30\uBCF8: opus)",orchestration_effort:"(\uAE30\uBCF8: CLI \uAE30\uBCF8)",review_model:"(\uAE30\uBCF8: codex)",impl_model:"(\uAE30\uBCF8: \uD2F0\uC5B4 \uC790\uB3D9)"};function br(e,t){let n=t&&t[e];return typeof n=="string"&&n.length>0?`(\uAE30\uBCF8: ${n} \u2014 \uC804\uC5ED)`:fs[e]||"(\uAE30\uBCF8)"}function qn(e,t,n,r,s,o){return c`
    <div class="detail-kv">
      <span class="detail-kv__k">${t}</span>
      <select
        class=${s?"detail-kv__v detail-kv__v--sel":"detail-kv__v"}
        aria-label=${t}
        data-key=${e}
        @change=${a=>o.onChange(e,a.target.value)}
      >
        ${n.map(a=>c`<option value=${a.value} ?selected=${a.value===r}>
              ${a.label}
            </option>`)}
      </select>
    </div>
  `}function Bn(e,t){let n=e.map(r=>({value:r,label:r}));return typeof t=="string"?[{value:"",label:t},...n]:n}function ya(e,t,n){let r=e&&e.metadata||{},s=n&&typeof n=="object"?n:{},o=r.workflow_mode==="fast_track"?"fast_track":"standard";return c`
    <div class="detail-section-label">실행 설정 (수정 가능)</div>
    ${qn("orchestration_model","orchestration_model",Bn(cs,br("orchestration_model",s)),r.orchestration_model||"",!1,t)}
    ${qn("orchestration_effort","orchestration_effort",Bn(ds,br("orchestration_effort",s)),r.orchestration_effort||"",!1,t)}
    ${qn("review_model","review_model",Bn(us,br("review_model",s)),r.review_model||"",!1,t)}
    ${qn("impl_model","impl_model",Bn(ps,br("impl_model",s)),r.impl_model||"",!1,t)}
    ${qn("workflow_mode","workflow_mode",Bn(Jc),o,r.workflow_mode==="fast_track",t)}
  `}function ed(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function $a(e,t){let n=t.getWorkspacePath,r=t.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",a="",l="";function i($){$.key==="Escape"&&s&&($.preventDefault(),b())}document.addEventListener("keydown",i);function d(){return s?c`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>b()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${ed(s)}</span
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
            ${o==="loading"?c`<div class="mv__status">불러오는 중…</div>`:o==="error"?c`<div class="mv__status mv__status--error">
                    ${l||"\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}
                  </div>`:zt(a)}
          </div>
        </div>
      </div>
    `:c``}function f(){Le(d(),e)}async function _($){s=$,o="loading",a="",l="",f();let g=n?n():"";if(!g){o="error",l="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",f();return}if(!r){o="error",l="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",f();return}let R="/api/doc?workspace="+encodeURIComponent(g)+"&path="+encodeURIComponent($);try{let H=await r(R),z=await H.json().catch(()=>({}));if(!H.ok||!z||z.ok!==!0){o="error",l="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(z&&z.error||H.status)+")",f();return}a=String(z.content||""),o="ready",f()}catch{o="error",l="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",f()}}function b(){s=null,Le(c``,e)}function y(){document.removeEventListener("keydown",i),b()}return{open:_,close:b,destroy:y}}var td=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"},{key:"cache_creation_input_tokens",label:"\uCE90\uC2DC \uC0DD\uC131"}],xa="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function nd(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function rd(e){let t=gn(e);if(!t||!e)return"";let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return c`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${t.replace(/^τ /,"\u03C4 \uCD1D ")}${n}</span
    >${e.replayed?c`<span class="detail-usage-partial" title=${xa}
          >부분 집계</span
        >`:""}`}function sd(e){let t=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null;return c`<div class="detail-session__usage-detail">
    ${td.map(n=>c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${n.label}</span
          ><span class="detail-session__usage-value"
            >${nd(e[n.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${t===null?"":c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${t.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?c`<span class="detail-session__usage-note">${xa}</span>`:""}
  </div>`}var od={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function ad(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=String(t.getHours()).padStart(2,"0"),r=String(t.getMinutes()).padStart(2,"0");return`${n}:${r}`}function Sa(e,t={},n={}){let r=Array.isArray(e)?e:[],s=n.expanded||new Set;if(r.length===0)return c`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let o=new Set;for(let d of r)d&&typeof d.resumed_from=="string"&&d.resumed_from.length>0&&o.add(d.resumed_from);let a=d=>{if(!(d.status==="failed"||d.status==="orphaned"))return"";let _=typeof d.session_id=="string"&&d.session_id.length>0,b=o.has(d.attempt_id),y=_&&!b,$=_?b?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return c`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${d.attempt_id}
      ?disabled=${!y}
      title=${$}
      @click=${g=>{g.stopPropagation(),y&&t.onResume&&t.onResume(d.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},l=d=>{if(!(d.status==="failed"||d.status==="orphaned")||typeof d.cause!="string"||d.cause==="")return"";let _=d.cause_detail,b=_&&typeof _.reason=="string"&&_.reason.length>0?typeof _.command=="string"&&_.command.length>0?`${_.reason} \xB7 ${_.command}`:_.reason:d.cause;return c`<div class="detail-session__cause" title=${b}>
      ${d.cause}
    </div>`},i=d=>{if(!gn(d.usage))return"";let f=s.has(d.attempt_id);return c`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${d.attempt_id}
      aria-expanded=${f?"true":"false"}
      title=${f?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${_=>{_.stopPropagation(),t.onToggleUsage&&t.onToggleUsage(d.attempt_id)}}
    >
      τ 자세히
    </button>`};return c`
    <div class="detail-section-label">
      세션 이력${rd(n.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${r.map(d=>c`<div class="detail-session-row">
            <button
              type="button"
              class="detail-session detail-session--${d.status||"unknown"}"
              data-attempt-id=${d.attempt_id}
              @click=${()=>t.onOpen&&t.onOpen(d.attempt_id)}
            >
              <span class="detail-session__glyph"
                >${od[d.status||""]||"\xB7"}</span
              >
              <span class="detail-session__id">${d.attempt_id}</span>
              ${d.resumed_from?c`<span
                    class="detail-session__resumed"
                    title=${`\uC774\uC5B4\uBC1B\uC740 \uC138\uC158 (from ${d.resumed_from})`}
                    >↻</span
                  >`:""}
              <span class="detail-session__meta"
                >${[d.runner,d.model].filter(Boolean).join(" \xB7 ")}</span
              >
              ${d.session_id?c`<span class="detail-session__sid" title=${d.session_id}
                    >${String(d.session_id).slice(0,8)}</span
                  >`:""}
              ${gn(d.usage)?c`<span class="detail-session__usage"
                    >${gn(d.usage)}</span
                  >`:""}
              <span class="detail-session__time"
                >${ad(d.started_at)}</span
              >
            </button>
            ${i(d)} ${a(d)} ${l(d)}
            ${s.has(d.attempt_id)&&d.usage?sd(d.usage):""}
          </div>`)}
    </div>
  `}var id=["open","in_progress","deferred","resolved","closed"],ld=[0,1,2,3,4];function Aa(e,t){let n=t.issueStores,r=t.onClose,s=t.transport,o=t.onNavigate,a=t.queueStore,l=t.sessionLogStore,i=null,d=null,f={},_=!1,b=!1,y="",$="",g="";function R(){_=!1,b=!1,y="",$="",g=""}let H=[],z=null,Y=null,M=!1,E="",S=!1,L=0,x=new Set;function G(){H=[],z=null,Y=null,M=!1,E="",S=!1,L+=1,x.clear()}async function V(h){if(!s)return;let F=++L;try{let N=await Promise.resolve(s("get-comments",{id:h}));if(F!==L||h!==i)return;H=Array.isArray(N)?N:[],M=!1}catch{if(F!==L||h!==i)return;M=!0}we()}function Z(){if(!s||!i)return;let h=d&&typeof d.comment_count=="number"?d.comment_count:null;if(z!==i){z=i,Y=h,V(i);return}h!==null&&h!==Y&&(Y=h,V(i))}function ce(h){x.has(h)?x.delete(h):x.add(h),we()}function Ne(h){let F=E.trim().length===0;E=h,F!==(h.trim().length===0)&&we()}async function Ze(){let h=E.trim();if(!s||!i||h.length===0||S)return;let F=i;S=!0,we();let N=!1;try{let K=await Promise.resolve(s("add-comment",{id:F,text:h}));Array.isArray(K)&&K.length>0&&(N=!0,F===i&&(H=K,M=!1,E="",Y=K.length))}catch{N=!1}N||ie("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),F===i&&(S=!1),we()}let xe={onToggle:ce,onDraftInput:Ne,onSubmit:Ze},Q=document.createElement("div");Q.className="md-viewer-root",document.body.appendChild(Q);let ee=$a(Q,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),A=document.createElement("div");A.className="session-log-root",document.body.appendChild(A);let T=gr(A,{transport:s?(h,F)=>Promise.resolve(s(h,F)):void 0,sessionLogStore:l});function X(){if(!a||!i)return[];let h=a.get();return(h&&h.attempts?Object.values(h.attempts):[]).filter(N=>N&&N.bead_id===i).sort((N,K)=>(K.started_at||0)-(N.started_at||0)).map(N=>({attempt_id:N.attempt_id,bead_id:N.bead_id,status:N.status,started_at:typeof N.started_at=="number"?N.started_at:null,runner:N.runner||null,model:N.model||null,session_id:N.session_id||null,resumed_from:N.resumed_from||null,dismissed_at:typeof N.dismissed_at=="number"?N.dismissed_at:null,cause:typeof N.cause=="string"?N.cause:null,cause_detail:N.cause_detail||null,usage:N.usage||null}))}function ne(){if(!a||!i)return null;let h=a.get();return It(h&&h.attempts||{},i)}let de=new Set;function fe(h){de.has(h)?de.delete(h):de.add(h),we()}function De(h){let F=a?a.get():null,N=F&&F.attempts?F.attempts[h]:null;T.open({attempt_id:h,meta:N?{runner:N.runner||void 0,model:N.model||void 0,effort:N.effort||void 0,status:N.status||void 0,session_id:N.session_id||void 0}:{}})}async function _e(h){if(!s||!h)return;let F=()=>{let K=a?a.get():null;return K&&typeof K.revision=="number"?K.revision:0},N=await s("worker-attempt-resume",{attempt_id:h,expected_revision:F()});if(N&&N.conflict){let K=N.queue&&typeof N.queue.revision=="number"?N.queue.revision:F();N=await s("worker-attempt-resume",{attempt_id:h,expected_revision:K})}N&&N.resumed===!1&&!N.conflict&&N.reason&&ie(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${N.reason}`,"error",2400)}let Re={onOpen:De,onResume:_e,onToggleUsage:fe};function We(){let h=a?a.get():null,F=h&&h.exec_defaults;return F&&typeof F=="object"?F:{}}let qe=null;n&&n.subscribe&&(qe=n.subscribe(()=>q()));let Xe=null;a&&typeof a.subscribe=="function"&&(Xe=a.subscribe(()=>{i&&we()}));function st(h){h.key==="Escape"&&i&&(h.preventDefault(),r())}document.addEventListener("keydown",st);function q(){if(i){if(n&&typeof n.snapshotFor=="function"){let h=n.snapshotFor("detail:"+i)||[];d=h.find(N=>N&&N.id===i)||h[0]||d}Z(),we()}}function W(h){tn(h).then(F=>{F?ie("\uBCF5\uC0AC\uB428","success",1200):ie("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function O(h){h.preventDefault(),h.stopPropagation(),i&&W(i)}function se(h,F){h.preventDefault(),h.stopPropagation(),W(F)}function pe(h,F){h.preventDefault(),h.stopPropagation(),ee.open(F)}function be(h,F){f[h]=F,we(),!(!s||!i)&&Promise.resolve(s("update-exec-settings",{id:i,key:h,value:F})).catch(()=>{ie("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}async function te(h,F,N){if(!s||!i)return!1;try{let K=await Promise.resolve(s(h,F)),Ue=Array.isArray(K)?K[0]:K;return Ue&&typeof Ue=="object"&&Ue.id?(d=Ue,!0):(ie(N,"error"),!1)}catch{return ie(N,"error"),!1}}function Ae(h){setTimeout(()=>{try{let F=e.querySelector(h);F&&typeof F.focus=="function"&&F.focus()}catch{}},0)}function Pe(){_=!0,y=d&&d.title||"",we(),Ae('.detail-edit__input[data-edit="title"]')}function it(h){y=h.target.value}function lt(){_=!1,y="",we()}function et(){te("edit-text",{id:i,field:"title",value:y},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(F=>{F&&(_=!1,y=""),we()})}function Ye(){b=!0,$=d&&d.description||"",we(),Ae('.detail-edit__textarea[data-edit="description"]')}function ct(h){$=h.target.value}function Te(){b=!1,$="",we()}function tt(){te("edit-text",{id:i,field:"description",value:$},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(F=>{F&&(b=!1,$=""),we()})}function D(h,F,N,K){if(h.key==="Escape"){h.stopPropagation(),N();return}h.key==="Enter"&&(!K||h.ctrlKey||h.metaKey)&&(h.preventDefault(),F())}function B(h){let F=h.target.value;te("update-status",{id:i,status:F},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>we())}function oe(h){let F=Number(h.target.value);te("update-priority",{id:i,priority:F},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>we())}function re(h){g=h.target.value}function ae(){let h=g.trim();h.length!==0&&te("label-add",{id:i,label:h},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(F=>{F&&(g=""),we()})}function ke(h){if(h.key==="Escape"){h.stopPropagation(),g="",we();return}h.key==="Enter"&&(h.preventDefault(),ae())}function $e(h){te("label-remove",{id:i,label:h},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>we())}let Ee={onCopyPath:se,onOpenDoc:pe},Fe={onChange:be};function Se(h){return typeof h=="string"?h:h&&typeof h=="object"?String(h.id||h.to||h.issue_id||h.depends_on||""):""}function je(h){switch(h&&typeof h=="object"?String(h.dependency_type||h.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function ue(h){let N=(Array.isArray(h.dependencies)?h.dependencies:[]).map(K=>({id:Se(K),icon:je(K)})).filter(K=>K.id.length>0);return c`
      <div class="detail-section-label">의존성</div>
      ${N.length===0?c`<div class="detail-empty">의존성 없음</div>`:c`<div class="detail-deps">
            ${N.map(K=>o?c`<button
                    type="button"
                    class="detail-dep detail-dep--link"
                    @click=${()=>o(K.id)}
                  >
                    ${K.icon?`${K.icon} `:""}${K.id}
                  </button>`:c`<span class="detail-dep"
                    >${K.icon?`${K.icon} `:""}${K.id}</span
                  >`)}
          </div>`}
    `}function ut(h){let F=h.metadata||{},N=h.workflow||{},K=N.stages||{},Ue=K.spec&&K.spec.stale,he=K.impl&&K.impl.stale,ge=N.route_source==="derived",at=N.route||F.route||"\u2014";return c`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${ge?" detail-kv__v--derived":""}"
          title=${ge?"route \uCD94\uB860\uAC12 (metadata \uBBF8\uD540)":"route"}
          >${ge&&N.route?`${at} ? (\uCD94\uB860)`:at}</span
        >
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">spec_review</span>
        <span class="detail-kv__v"
          >${F.spec_review||"\uC5C6\uC74C"}${Ue?" \xB7 stale":""}</span
        >
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">impl_review</span>
        <span class="detail-kv__v"
          >${F.impl_review||"\uC5C6\uC74C"}${he?" \xB7 stale":""}</span
        >
      </div>
      ${F.pr_url?c`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${F.pr_url}</span>
          </div>`:""}
    `}let gt={route:["spec_backed","full_plan"]};async function u(h,F){let N=F.target.value;if(h==="route"&&d&&d.metadata&&d.metadata.route==="full_plan"&&N!=="full_plan"&&!window.confirm(`full_plan \u2192 ${N||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){we();return}await te("update-workflow-meta",{id:i,key:h,value:N},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),we()}function w(h){let F=h.metadata||{};return c` ${((K,Ue)=>{let he=gt[K],ge=typeof F[K]=="string"?F[K]:"";return c`<div class="detail-kv">
        <span class="detail-kv__k">${K}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${K}
          data-edit=${`wfmeta-${K}`}
          @change=${at=>u(K,at)}
        >
          <option value="" ?selected=${!he.includes(ge)}>
            ${Ue}
          </option>
          ${he.map(at=>c`<option value=${at} ?selected=${ge===at}>${at}</option>`)}
        </select>
      </div>`})("route","(\uBBF8\uC124\uC815 \xB7 \uCD94\uB860)")} `}function P(h){return _?c`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${y}
            @input=${it}
            @keydown=${F=>D(F,et,lt,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${et}
            >
              저장
            </button>
            <button
              type="button"
              class="detail-edit__cancel"
              data-edit="title-cancel"
              @click=${lt}
            >
              취소
            </button>
          </div>
        </div>
      `:c`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${h}</h2>
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${Pe}
        >
          ✎
        </button>
      </div>
    `}function me(h){let F=dt(h.created_at),N=dt(h.updated_at);return!F&&!N?c``:c`
      ${F?c`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${F}</span>
          </div>`:""}
      ${N?c`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${N}</span>
          </div>`:""}
    `}function Oe(h,F){return c`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${B}
        >
          ${id.map(N=>c`<option value=${N} ?selected=${N===h}>${N}</option>`)}
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
          ${ld.map(N=>c`<option value=${String(N)} ?selected=${N===F}>
                P${N}
              </option>`)}
        </select>
      </div>
    `}function ve(h){return c`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${b?"":c`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${Ye}
            >
              ✎
            </button>`}
      </div>
      ${b?c`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${$}
              @input=${ct}
              @keydown=${F=>D(F,tt,Te,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${tt}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${Te}
              >
                취소
              </button>
            </div>
          </div>`:c`<div class="detail-overlay__desc">
            ${h||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function Ie(h){let F=typeof h.notes=="string"?h.notes:"";return F.trim().length===0?c``:c`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${F}</div>
    `}function Be(h){let F=Array.isArray(h.labels)?h.labels:[];return c`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${F.map(N=>c`<span class="detail-label-chip"
              >${N}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${N}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+N}
                @click=${()=>$e(N)}
              >
                ×
              </button></span
            >`)}
        <span class="detail-label-add">
          <input
            class="detail-label-add__input"
            aria-label="라벨 추가"
            placeholder="라벨 추가"
            .value=${g}
            @input=${re}
            @keydown=${ke}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${ae}
          >
            추가
          </button>
        </span>
      </div>
    `}function Qe(){if(!i)return c``;let h=d||{},F=String(h.id||i),N=h.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",K=h.status||"open",Ue=typeof h.priority=="number"?Math.max(0,Math.min(4,h.priority)):"",he=h.description||"",ge={...h,metadata:{...h.metadata||{},...f}};return c`
      <div class="detail-overlay" role="dialog" aria-modal="true">
        <div class="detail-overlay__backdrop" @click=${()=>r()}></div>
        <div class="detail-overlay__panel">
          <button
            type="button"
            class="detail-overlay__close"
            aria-label="닫기"
            @click=${()=>r()}
          >
            ✕
          </button>
          <button
            type="button"
            class="detail-overlay__id"
            title="ID 복사"
            @click=${O}
          >
            ${F}
          </button>
          ${P(N)} ${Oe(K,Ue)}
          ${me(h)} ${ve(he)}
          ${ka(H,xe,{expanded:x,draft:E,sending:S,error:M})}
          ${Ie(h)} ${Be(h)} ${ue(h)}
          ${ut(h)} ${w(h)}
          ${ga(h,Ee)}
          ${ya(ge,Fe,We())}
          ${Sa(X(),Re,{total:ne(),expanded:de})}
        </div>
      </div>
    `}function we(){Le(Qe(),e)}return{load(h){h!==i&&(f={},R(),G()),i=h,d=null,q()},clear(){i=null,d=null,f={},R(),G(),ee.close(),T.close(),Le(c``,e)},destroy(){qe&&(qe(),qe=null),Xe&&(Xe(),Xe=null),document.removeEventListener("keydown",st),ee.destroy(),Q.parentNode&&Q.parentNode.removeChild(Q),T.destroy(),A.parentNode&&A.parentNode.removeChild(A),i=null,d=null,G(),Le(c``,e)}}}var cd=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function Ta(e,t){return qr(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function dd(e,t,n){if(!n)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(o=>o!==e)};let r=t.hidden_labels.filter(o=>o!==e);return t.hidden_prefixes.some(o=>o.length>0&&e.startsWith(o))?{hidden_labels:r,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:r}}function Ea(e,t){let{policyStore:n,transport:r,labelOptions:s}=t,o=document.createElement("dialog");o.id="display-settings-dialog",o.className="display-settings",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),e.appendChild(o);let a="";async function l(S){let L=n.get();if(L)try{let x=await r("display-policy-set",{expected_revision:L.revision,policy:S(L)});i(x),x&&x.conflict&&x.policy&&(x=await r("display-policy-set",{expected_revision:x.policy.revision,policy:S(x.policy)}),i(x)),x&&x.conflict&&ie("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC","error",4e3)}catch{ie("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function i(S){S&&S.policy&&typeof S.policy=="object"&&n.set(S.policy)}function d(S){let L=n.get();if(!L)return;let x=Ta(S,L)!=="shown";l(G=>dd(S,G,x))}function f(){let S=a.trim();S.length!==0&&(a="",l(L=>L.hidden_prefixes.includes(S)?{hidden_prefixes:L.hidden_prefixes}:{hidden_prefixes:[...L.hidden_prefixes,S]}),R())}function _(S){l(L=>({hidden_prefixes:L.hidden_prefixes.filter(x=>x!==S)}))}function b(S){let L=n.get();if(!L)return;let x=L.chips[S]===!1;l(()=>({chips:{[S]:x}}))}function y(S){let L=s();return c`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">라벨 표시</h3>
        <p class="display-settings__hint">
          라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을
          누르면 그 라벨만 예외로 다시 표시됩니다.
        </p>
        ${L.length===0?c`<div class="display-settings__empty">라벨 없음</div>`:c`<div class="display-settings__pills">
              ${L.map(x=>{let G=Ta(x,S);return c`<button
                  type="button"
                  class=${`display-settings__pill display-settings__pill--${G}`}
                  data-label=${x}
                  data-state=${G}
                  @click=${()=>d(x)}
                >
                  ${x}
                </button>`})}
            </div>`}
      </section>
    `}function $(S){return c`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">숨김 prefix</h3>
        <div class="display-settings__prefixes">
          ${S.hidden_prefixes.map(L=>c`<span class="display-settings__prefix">
                ${L}
                <button
                  type="button"
                  class="display-settings__prefix-remove"
                  aria-label=${`${L} \uADDC\uCE59 \uC81C\uAC70`}
                  @click=${()=>_(L)}
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
            @input=${L=>{a=String(L.target.value||"")}}
          />
          <button type="button" @click=${f}>추가</button>
        </div>
      </section>
    `}function g(S){return c`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">카드 표시 요소</h3>
        <div class="display-settings__toggles">
          ${cd.map(([L,x])=>c`<label class="display-settings__toggle">
                <input
                  type="checkbox"
                  data-chip=${L}
                  .checked=${S.chips[L]!==!1}
                  @change=${()=>b(L)}
                />
                <span>${x}</span>
              </label>`)}
        </div>
      </section>
    `}function R(){let S=n.get();Le(c`
        <div class="display-settings__container">
          <header class="display-settings__header">
            <div class="display-settings__title">표시 설정</div>
            <button
              type="button"
              class="display-settings__close"
              aria-label="닫기"
              @click=${E}
            >
              ×
            </button>
          </header>
          <div class="display-settings__body">
            ${S?c`${y(S)} ${$(S)}
                ${g(S)}`:c`<div class="display-settings__empty">
                  표시 정책을 불러오는 중…
                </div>`}
          </div>
        </div>
      `,o)}let H=!1,z=()=>{H=!1};o.addEventListener("close",z),o.addEventListener("cancel",z);let Y=null;n.subscribe&&(Y=n.subscribe(()=>{H&&R()}));function M(){H||(a="",H=!0,R(),typeof o.showModal=="function"?o.showModal():o.setAttribute("open",""))}function E(){H&&(H=!1,typeof o.close=="function"?o.close():o.removeAttribute("open"))}return{open:M,close:E,destroy(){H=!1,o.removeEventListener("close",z),o.removeEventListener("cancel",z),Y&&(Y(),Y=null),o.remove()}}}function Ca(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let n=t.querySelector("#fatal-error-title"),r=t.querySelector("#fatal-error-message"),s=t.querySelector("#fatal-error-detail"),o=t.querySelector("#fatal-error-reload"),a=t.querySelector("#fatal-error-close"),l=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},i=(d,f,_="")=>{n&&(n.textContent=d||"Unexpected Error"),r&&(r.textContent=f||"An unrecoverable error occurred.");let b=typeof _=="string"?_.trim():"";if(s&&(b.length>0?(s.textContent=b,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),a&&a.addEventListener("click",()=>l()),t.addEventListener("cancel",d=>{d.preventDefault(),l()}),{open:i,close:l,getElement(){return t}}}function Ra(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";if(e<6e4)return`${Math.round(e/1e3)}\uCD08`;let t=e/6e4;return`${Number.isInteger(t)?t:Math.round(t*10)/10}\uBD84`}function Ia(e){return Array.isArray(e)?e.filter(t=>typeof t=="string").join(" "):""}var ud={deployed:{modifier:"ok",label:"\uC131\uACF5"},launched:{modifier:"launched",label:"\uBC1C\uC0AC\uB428 \xB7 \uACB0\uACFC \uBBF8\uAD00\uCE21"},failed:{modifier:"fail",label:"\uC2E4\uD328"}},La=160;function pd(e){return e.length>La?`${e.slice(0,La)}\u2026`:e}var fd=[{key:"orchestration_model",values:()=>cs},{key:"orchestration_effort",values:()=>ds},{key:"review_model",values:()=>us},{key:"impl_model",values:()=>ps}];function vr(e,t){let{queueStore:n,transport:r,getWorkspacePath:s}=t,o=document.createElement("dialog");o.id="worker-exec-defaults-dialog",o.className="exec-defaults",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),e.appendChild(o);function a(){return n&&n.get()||{revision:0,exec_defaults:{}}}function l(){let x=a();return typeof x.revision=="number"?x.revision:0}function i(){let x=a().exec_defaults;return x&&typeof x=="object"?x:{}}function d(x){x&&x.queue&&n&&n.set(x.queue)}async function f(x,G){if(!r)return;let V={key:x,value:G||null};try{let Z=await r("worker-queue-set-exec-default",{...V,expected_revision:l()});d(Z),Z&&Z.conflict&&(Z=await r("worker-queue-set-exec-default",{...V,expected_revision:l()}),d(Z)),Z&&Z.conflict&&ie("\uC804\uC5ED \uC2E4\uD589 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC","error",4e3)}catch{ie("\uC804\uC5ED \uC2E4\uD589 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function _(x,G,V){let Z=!!V&&!G.includes(V);return c`<div class="exec-defaults__row">
      <span class="exec-defaults__k">${x}</span>
      <select
        class="exec-defaults__sel"
        aria-label=${`\uC804\uC5ED ${x}`}
        data-key=${x}
        @change=${ce=>{f(x,ce.target.value)}}
      >
        <option value="" ?selected=${!V}>
          ${fs[x]||"(\uAE30\uBCF8)"}
        </option>
        ${Z?c`<option value=${V} ?selected=${!0}>
              ${V} (비호환)
            </option>`:""}
        ${G.map(ce=>c`<option value=${ce} ?selected=${V===ce}>${ce}</option>`)}
      </select>
    </div>`}function b(){let x=a().workspace_info;return x&&typeof x=="object"?x:{}}function y(x,G){return c`<span
      class="exec-defaults__vd-badge exec-defaults__vd-badge--${x}"
      >${G}</span
    >`}function $(x){let G=x?Ia(x.cmd):"",V=x?Ra(x.timeout_ms):"",Z=s&&s()||"<workspace \uACBD\uB85C>";return c`<div class="exec-defaults__vd-group" data-vd="verify">
      <div class="exec-defaults__vd-label">머지 전 검증 (verify)</div>
      ${G?c`<div class="exec-defaults__vd-line">
            <span class="exec-defaults__vd-cmd">${G}</span>
            ${y("config","config")}
            ${V?c`<span class="exec-defaults__vd-meta"
                  >timeout ${V}</span
                >`:""}
          </div>`:c`<div class="exec-defaults__vd-line exec-defaults__vd-absent">
            검증 없음 —
            <span class="exec-defaults__vd-cmd"
              >[worker.verify."${Z}"]</span
            >
            섹션으로 정의
          </div>`}
    </div>`}function g(x){let G=x?Ia(x.cmd):"",V=x?Ra(x.timeout_ms):"",Z=V?`timeout ${V} \xB7 verify \uD1B5\uACFC \uC2DC\uC5D0\uB9CC \uC2E4\uD589`:"verify \uD1B5\uACFC \uC2DC\uC5D0\uB9CC \uC2E4\uD589",ce=s&&s()||"<workspace \uACBD\uB85C>";return c`<div class="exec-defaults__vd-group" data-vd="deploy">
      <div class="exec-defaults__vd-label">머지 후 배포 (deploy)</div>
      ${G?c`<div class="exec-defaults__vd-line">
            <span class="exec-defaults__vd-cmd">${G}</span>
            ${y("config","config")}
            ${x.detached===!0?y("detached","detached"):""}
            <span class="exec-defaults__vd-meta">${Z}</span>
          </div>`:c`<div class="exec-defaults__vd-line exec-defaults__vd-absent">
            배포 없음 —
            <span class="exec-defaults__vd-cmd"
              >[worker.deploy."${ce}"]</span
            >
            섹션으로 정의
          </div>`}
    </div>`}function R(x){if(!x||typeof x!="object")return"";let G=ud[String(x.outcome)];if(!G)return"";let V=x.outcome==="failed"&&x.reason?`${G.label} \xB7 ${x.reason}`:G.label,Z=[dt(x.at),typeof x.bead_id=="string"?x.bead_id:"",typeof x.base_sha=="string"?x.base_sha.slice(0,7):""].filter(Ze=>Ze.length>0).join(" \xB7 "),ce=typeof x.detail=="string"&&x.detail.length>0?pd(x.detail):"",Ne=typeof x.log_path=="string"&&x.log_path.length>0?x.log_path:"";return c`<div class="exec-defaults__vd-group" data-vd="last-deploy">
      <div class="exec-defaults__vd-label">마지막 배포</div>
      <div class="exec-defaults__vd-line">
        ${y(G.modifier,V)}
        ${Z?c`<span class="exec-defaults__vd-meta">${Z}</span>`:""}
      </div>
      ${ce?c`<div class="exec-defaults__vd-line" data-vd-part="detail">
            <code class="exec-defaults__vd-cmd">${ce}</code>
          </div>`:""}
      ${Ne?c`<div class="exec-defaults__vd-line" data-vd-part="log-path">
            전체 로그:
            <code class="exec-defaults__vd-cmd">${Ne}</code>
          </div>`:""}
    </div>`}function H(x){return c`<section class="exec-defaults__vd">
      <p class="exec-defaults__vd-title">
        검증·배포 설정
        <span class="exec-defaults__vd-ro"
          >읽기 전용 — config.toml에서 정의</span
        >
      </p>
      ${$(x.verify_cmd)} ${g(x.deploy_cmd)}
      ${R(x.last_deploy)}
    </section>`}function z(){let x=i();Le(c`
        <div class="exec-defaults__container">
          <header class="exec-defaults__header">
            <div class="exec-defaults__title">전역 실행 설정</div>
            <button
              type="button"
              class="exec-defaults__close"
              aria-label="닫기"
              @click=${L}
            >
              ×
            </button>
          </header>
          <div class="exec-defaults__body">
            <p class="exec-defaults__hint">
              워크스페이스 전역 기본값입니다. bead metadata가 우선하며, '(기본:
              …)'은 이 전역값도 미설정일 때 실제 적용되는 하드코딩·CLI·워크플로
              기본입니다.
            </p>
            ${fd.map(G=>_(G.key,G.values(),x[G.key]||""))}
            ${H(b())}
          </div>
        </div>
      `,o)}let Y=!1,M=()=>{Y=!1};o.addEventListener("close",M),o.addEventListener("cancel",M);let E=null;n&&n.subscribe&&(E=n.subscribe(()=>{Y&&z()}));function S(){Y||(Y=!0,z(),typeof o.showModal=="function"?o.showModal():o.setAttribute("open",""))}function L(){Y&&(Y=!1,typeof o.close=="function"?o.close():o.removeAttribute("open"))}return{open:S,close:L,destroy(){Y=!1,o.removeEventListener("close",M),o.removeEventListener("cancel",M),E&&(E(),E=null),o.remove()}}}function vn(e){let t=wt(e.created_at),n=wt(e.updated_at);return!t&&!n?"":c`<div class="worker-mini__meta">
    ${t?c`<span title=${`\uC0DD\uC131 ${dt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&n?c`<span>·</span>`:""}${n?c`<span title=${`\uC218\uC815 ${dt(e.updated_at)}`}
          >수정 ${n}</span
        >`:""}
  </div>`}function _s(e){let t=e.draggable&&!e.done,n=Array.isArray(e.badges)?e.badges:[],r=xt(e.usage),s=e.merge_step||null,o=e.lane==="pr_wait"||!!e.revise_action,a=e.lane==="done"&&!o,l=a?wt(e.done_at):"",i=t?c`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",d=e.workspace_name?c`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",f=c`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,_=c`<span class="worker-mini__title">${e.title}</span>`,b=e.pr_url&&e.pr_number?c`<a
          class="worker-mini__pr"
          href=${e.pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="PR 열기"
          >#${e.pr_number} ↗</a
        >`:"",y=n.map(S=>S===e.live_badge?c`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${S}</span
        >`:c`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          >${S}</span
        >`),$=e.reason?c`<span class="worker-mini__reason">${e.reason}</span>`:"",g=r?c`<span class="worker-usage" title=${bn(e.usage)}
        >${r}</span
      >`:"",R=s?c`<span class="merge-step"
        >${s.label}<span class="merge-step__n"
          >${s.index}/${s.total}</span
        ></span
      >`:"",H=e.merge_action?c`<button
        type="button"
        class="worker-mini__merge"
        data-bead-id=${e.id}
        ?disabled=${e.merge_enabled===!1}
        title=${e.merge_title||""}
      >
        ${e.merge_label||"\uBA38\uC9C0"}
      </button>`:"",z=e.cancel_action?c`<button
        type="button"
        class="worker-mini__merge-cancel"
        data-bead-id=${e.id}
        ?disabled=${e.cancel_enabled===!1}
        title=${e.cancel_title||""}
      >
        취소
      </button>`:"",Y=e.discard_action?c`<button
        type="button"
        class="worker-mini__discard"
        data-bead-id=${e.id}
        ?disabled=${e.discard_enabled===!1}
        title=${e.discard_enabled===!1?e.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
      >
        폐기
      </button>`:"",M=e.revise_action?c`<button
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
        </button>`:"",E=!!(r||s||e.merge_action||e.cancel_action||e.discard_action||e.revise_action);return c`<div
    class="worker-mini${o?" worker-mini--card":""}${t?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${s?" worker-mini--merging":""}${e.external?" worker-mini--external":""}"
    style=${s?`--progress: ${s.percent}%`:""}
    draggable=${t?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${a?c`<div class="worker-mini__row1">${d}${f}${_}</div>
          <div class="worker-mini__row2">
            ${g}${l?c`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${dt(e.done_at)}`}
                  >완료 ${l}</span
                >`:""}${y}${R}
            <span class="worker-mini__actions"
              >${H}${z}${Y}</span
            >
            ${vn(e)}
          </div>`:o?c`<div class="worker-mini__head">
              ${i}${d}${f}${b}${y}${$}
            </div>
            <div class="worker-mini__body">${_}</div>
            ${E?c`<div class="worker-mini__foot">
                  ${g}${R}
                  <span class="worker-mini__actions"
                    >${H}${z}${Y}${M}</span
                  >
                </div>`:""}
            ${vn(e)}`:c`<div class="worker-mini__line">
              ${i}${d}${f}${_}${b}${y}${$}${g}${R}${H}${z}${Y}
            </div>
            ${vn(e)}`}
  </div>`}function _d(e){let t=e.draggable&&!e.done,n=e.workflow,r=n&&n.chips||{},s=r.route||n&&n.route,o=r.route_source==="derived"||!!(n&&n.route_source==="derived"),a=typeof e.reason=="string"&&e.reason.startsWith("\u26D4");return c`<div
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
      ${n&&s?c`<span
            class="ctl-chip ctl-chip--route${o?" is-derived":""}"
            title=${o?"route \uCD94\uB860\uAC12 (metadata \uBBF8\uD540)":"route"}
            >${o?`${s} ?`:s}</span
          >`:""}
    </div>
    <div class="worker-card__title">${e.title}</div>
    ${n?sr(n,e.status):""}
    <div
      class="worker-card__foot${e.reason?"":" worker-card__foot--actions-only"}"
    >
      ${e.reason?c`<span
            class="worker-card__reason${a?" worker-card__reason--danger":""}"
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
        title=${t?"\uB300\uAE30 \uD050 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00":"spec\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}
      >
        대기로 ↴
      </button>
    </div>
    ${vn(e)}
  </div>`}function Lt(e){let t=!!e.collapsible&&!!e.collapsed,n=c`<span
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
          ${n}
          <span class="worker-pane__caret" aria-hidden="true"
            >${t?"\u25B8":"\u25BE"}</span
          >
        </button>`:c`<header class="worker-pane__hd">
          ${n}${e.header_control?e.header_control:""}
        </header>`}
    ${t?"":c`${e.controls?e.controls:""}
          <div class="worker-pane__body">
            ${e.body?e.body:e.items.length===0?c`<div class="worker-pane__empty">
                    ${e.empty||""}
                  </div>`:e.items.map(r=>e.lane==="candidate"?_d(r):_s(r))}
          </div>`}
  </section>`}var Da=160;function hs(e){return e.length>Da?`${e.slice(0,Da)}\u2026`:e}function hd(e){return!e||!e.reason?"":c`<div class="worker-banner__detail">
    가드:
    ${e.reason}${e.command?c` · <code>${hs(e.command)}</code>`:""}
  </div>`}function md(e){return e?c`<details class="worker-banner__tail">
    <summary>출력 tail</summary>
    <pre>${e}</pre>
  </details>`:""}function gd(e){return e?c`<div class="worker-banner__log-path">
    전체 로그: <code>${e}</code>
  </div>`:""}function ms(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),n=Math.floor(t/60),r=t%60;return n>0?`${n}m ${String(r).padStart(2,"0")}s`:`${r}s`}function bd(e){if(!e||!e.reason)return"";let t=e.reason.startsWith("export_removal_failed:");return c`<div
    class="worker-banner worker-banner--ship"
    role="alert"
    data-bead-id=${e.bead_id||""}
  >
    ⚠ ${e.bead_id||"(bead \uBBF8\uC0C1)"} 머지 완료 — capability 발행이
    실패했습니다 (${e.reason}). bead는 closed지만
    ${t?c`취소 처분된 자손의 <code>export:</code> 라벨이 남아 있어 다음
          스윕이 이를 다시 발행 대상으로 읽습니다.`:c`<code>provides:</code> 라벨이 없어 이 capability에 걸린 external
          의존은 계속 막혀 있습니다.`}
    ${e.detail?c`<div class="worker-banner__detail">
          남은 작업: <code>${hs(e.detail)}</code>
        </div>`:""}
    <div class="worker-banner__detail">
      ${t?c`수동 복구:
            <code
              >bd -C &lt;워크스페이스&gt; label remove &lt;id&gt;
              export:&lt;capability&gt;</code
            >
            실행 후 <code>bd show &lt;id&gt; --json</code>으로 라벨이 사라졌는지
            확인하세요 — 이 자손은 ship하지 마세요.`:c`수동 복구:
            <code>bd -C &lt;워크스페이스&gt; ship &lt;capability&gt;</code> 실행
            후 <code>bd show &lt;id&gt; --json</code>으로
            <code>provides:</code> 라벨을 확인하세요.`}
    </div>
    ${e.pr_url?c`<div class="worker-banner__detail">
          <code>${e.pr_url}</code>
        </div>`:""}
  </div>`}function Oa(e){let t=Array.isArray(e.cleanupFailures)?e.cleanupFailures:[];return c`<div class="worker-banners">
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
          ${e.failure.resume_attempt_id?c`<button
                type="button"
                class="worker-banner__dismiss"
                data-attempt-id=${e.failure.resume_attempt_id}
                title="이 실패를 처리 완료로 표시하고 배너를 닫습니다"
                aria-label="배너 닫기"
              >
                ✕
              </button>`:""}
          ${hd(e.failure.cause_detail)}
        </div>`:""}
    ${t.map(n=>c`<div
          class="worker-banner worker-banner--cleanup"
          role="alert"
          data-bead-id=${n.bead_id}
        >
          ⚠ ${n.bead_id} 머지 완료 — 머지 후 정리가 <b>${n.step}</b> 단계에서
          멈췄습니다 (${n.reason}).
          <!-- capability 발행은 close 뒤에 오는 유일한 단계라 실패해도 close를
               롤백하지 않는다 (UI-4ii4). "resolved로 남아 있다"는 다른 모든
               단계에만 참이므로 여기서만 문안을 바꾼다. -->
          ${n.step==="ship_exported_capabilities"?"bead\uB294 closed\uB85C \uB0A8\uC544 \uC788\uACE0(close\uB294 \uB864\uBC31\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4)":"bead\uB294 resolved\uB85C \uB0A8\uC544 \uC788\uACE0"}
          자동 재시도는 하지 않습니다 — 정리를 사람이 마무리하세요.
          ${n.detail?c`<div class="worker-banner__detail">
                <code>${hs(n.detail)}</code>
              </div>`:""}
          ${gd(n.log_path)} ${md(n.output_tail)}
        </div>`)}
    ${bd(e.shipFailure)}
  </div>`}function vd(e,t,n=null){let r=!!e.paused,s=r?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?ms(t-e.started_at):"\u2014",o=[e.runner,e.model].filter(Boolean).join(" \xB7 "),a=xt(e.usage),l=e.conflict_resolution?r?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,i=e.base_exception||null,d=e.attempt_id&&e.attempt_id===n;return c`<div
    class="rtile${d?" rtile--sel":""}${r?" rtile--paused":""}"
    data-bead-id=${e.bead_id}
    data-attempt-id=${e.attempt_id||""}
  >
    <div class="rtile__hd">
      <span class="rtile__dot" aria-hidden="true"></span>
      <span class="rtile__id" title="클릭하면 ID 복사">${e.bead_id}</span>
      ${e.resumed_from?c`<span
            class="rtile__resumed"
            title=${`\uC774\uC5B4\uBC1B\uC740 \uC138\uC158 (from ${e.resumed_from})`}
            >↻</span
          >`:""}
      <span class="rtile__elapsed">${s}</span>
      <button
        type="button"
        class="rtile__session"
        title="라이브 세션 열기"
        aria-label="라이브 세션 열기"
      >
        ▤ 세션
      </button>
      ${r?c`<button
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
      <button type="button" class="rtile__stop" title="폐기" aria-label="폐기">
        ■
      </button>
    </div>
    <div class="rtile__title">${e.title}</div>
    ${e.current_child?c`<div class="rtile__child" title="현재 진행중 child">
          └ ${e.current_child}
        </div>`:""}
    ${o||a||l||i?c`<div class="rtile__meta">
          ${l?c`<span class="worker-mini__badge">${l}</span>`:""}
          ${i?c`<span
                class="worker-mini__badge"
                title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
                >${i}</span
              >`:""}
          ${o?c`<span class="rtile__runner">${o}</span>`:""}
          ${a?c`<span class="worker-usage" title=${bn(e.usage)}
                >${a}</span
              >`:""}
        </div>`:""}
    ${vn(e)}
    <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일): 큐
         스냅샷에는 페이즈명도 진행률도 없으므로 진행 바는 만들지 않는다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
    ${r?"":c`<div class="rtile__accent" aria-hidden="true"></div>`}
  </div>`}function gs(e,t=Date.now(),n=null){let r=Array.isArray(e)?e:[];return c`<div class="worker-rungrid" id="worker-rungrid">
    ${r.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:r.map(s=>vd(s,t,n))}
  </div>`}function Wt(e){return c`<svg
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
  </svg>`}function bs(){return Wt(Ot`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function vs(){return Wt(Ot`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function ws(){return Wt(Ot`<rect x="4.3" y="4.3" width="7.4" height="7.4" rx="1.2" />`)}function Ma(){return Wt(Ot`<path d="M4.4 4.4 11.6 11.6M11.6 4.4 4.4 11.6" />`)}function Na(){return Wt(Ot`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function Pa(){return Wt(Ot`<rect x="2.6" y="2.6" width="7.4" height="7.4" rx="1.2" />
    <path d="M6 13.4h6a1.4 1.4 0 0 0 1.4-1.4V6" />`)}function Fa(){return Wt(Ot`<circle cx="8" cy="8" r="2.1" />
    <path
      d="M8 1.9v1.8M8 12.3v1.8M1.9 8h1.8M12.3 8h1.8M3.7 3.7l1.3 1.3M11 11l1.3 1.3M12.3 3.7 11 5M5 11l-1.3 1.3"
    />`)}function qa(){return Wt(Ot`<path d="M3 3.6 8.2 8 3 12.4z" />
    <path d="M8.8 3.6 14 8l-5.2 4.4z" />`)}var Un=1,wd=6e4,kd={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328"},yd=new Set(["auto_merge","merged","merge","done"]),Ba={running:3,paused:2,failed:1};function $d(e,t){let n=null,r=-1/0;for(let s of Object.values(e)){if(!s||s.bead_id!==t||s.status==="running")continue;let o=typeof s.finished_at=="number"?s.finished_at:typeof s.started_at=="number"?s.started_at:0;o>=r&&(r=o,n=s)}return n}function xd(e,t){let n=Object.values(e||{}),r=new Set,s=new Map;for(let a of n)!a||typeof a.bead_id!="string"||(typeof a.resumed_from=="string"&&a.resumed_from.length>0&&r.add(a.resumed_from),s.set(a.bead_id,a.attempt_id));let o=new Map;for(let a of n){if(!a||typeof a.bead_id!="string"||a.bead_id.length===0)continue;let l=null;if(a.status==="running")l="running";else if(a.status==="paused"&&!r.has(a.attempt_id))l="paused";else if(a.status==="failed"||a.status==="orphaned"){let _=t.get(a.bead_id),b=typeof _=="number"&&_>0&&typeof a.finished_at=="number"&&_>=a.finished_at;s.get(a.bead_id)===a.attempt_id&&!b&&typeof a.dismissed_at!="number"&&(l="failed")}if(!l)continue;let i=typeof a.started_at=="number"?a.started_at:null,d=o.get(a.bead_id);if(d){let _=Ba[d.run_state],b=Ba[l];if(_>b||_===b&&(d.started_at??0)>(i??0))continue}let f=typeof a.session_id=="string"&&a.session_id.length>0;o.set(a.bead_id,{attempt_id:typeof a.attempt_id=="string"?a.attempt_id:"",run_state:l,started_at:i,last_event_at:typeof a.last_event_at=="number"?a.last_event_at:null,model:typeof a.model=="string"?a.model:null,usage:It(e,a.bead_id),can_pause:l==="running"&&f,can_resume:l!=="running"&&f&&!r.has(a.attempt_id)})}return o}function Ua(e,t){let n=e[t];if(!n)return"";if(n.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let r=typeof n.reason=="string"?n.reason:"",s=r.indexOf(":");return s>0&&s<r.length-1?`\u26D4 ${r.slice(0,s)} (${r.slice(s+1)})`:`\u26D4 ${r}`}function Et(e){return e&&typeof e=="object"?e:{}}function ks(e,t,n){let r=Array.isArray(e)?e:[],s=Array.isArray(t)?t:[],o=n&&typeof n.done_since=="number"?n.done_since:void 0,a=new Map;for(let g of s)g&&typeof g.root_dir=="string"&&a.set(g.root_dir,g);let l=[],i=[],d=[],f=[],_=[],b=new Map;for(let g of r){if(!g||typeof g.root_dir!="string")continue;let R=g.root_dir,H=g.name||R,z=a.get(R),Y=z&&typeof z.revision=="number"?z.revision:typeof g.revision=="number"?g.revision:0,M=Et(g.attempts),E=Et(g.bead_titles),S=Et(g.pr_observations),L=Et(g.admission),x=Et(g.revise_parked),G=Et(g.merge_queue_state),V=Et(g.cleanup_failed),Z=Array.isArray(g.merge_queue)?g.merge_queue:[],ce=new Set(Z.filter(A=>A&&typeof A.bead_id=="string").map(A=>A.bead_id)),Ne=Array.isArray(g.queue)?g.queue:[],Ze=Array.isArray(g.done)?g.done:[],xe=new Map;for(let A of Ze)A&&typeof A.bead_id=="string"&&typeof A.added_at=="number"&&xe.set(A.bead_id,A.added_at);let Q=A=>({id:A,title:E[A]||A,root_dir:R,workspace_name:H,expected_revision:Y,draggable:!1}),ee=new Set;for(let[A,T]of xd(M,xe))ee.add(A),i.push({...Q(A),lane:"running",attempt_id:T.attempt_id,run_state:T.run_state,can_pause:T.can_pause,can_resume:T.can_resume,started_at:T.started_at,last_event_at:T.last_event_at,model:T.model,usage:T.usage,badges:T.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:T.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:[],alert:T.run_state==="failed"});for(let A of Array.isArray(g.pr_wait)?g.pr_wait:[]){let T=A&&A.bead_id;if(typeof T!="string"||ee.has(T))continue;ee.add(T);let X=Et(S[T]),ne=Et(X.pr),de=X.gate?Et(X.gate):null,fe=ce.has(T),De=G.active===T,_e=A.external===!0,Re=V[T]||null,We=!!de&&de.base_badge==="\uCDA9\uB3CC",qe=!!Re&&!!de&&de.tier==="merged",Xe=_e&&!!de&&de.tier==="merged";d.push({...Q(T),lane:"pr_wait",pr_number:typeof ne.number=="number"?ne.number:null,pr_url:typeof ne.url=="string"?ne.url:void 0,external:_e,usage:It(M,T),badges:Re?["\uC815\uB9AC \uC2E4\uD328"]:[],alert:!!Re,reason:Re?"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644":"PR \uB300\uAE30",merge_action:!fe,merge_enabled:de?.enabled===!0||We||qe||Xe,merge_label:Xe?"\uC815\uB9AC":We&&!qe?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:Xe?"\uBA38\uC9C0\uB428 \u2014 \uD074\uB9AD\uD558\uBA74 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC\uB97C \uC218\uD589\uD569\uB2C8\uB2E4":qe?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uCC98\uC74C\uBD80\uD130 \uB2E4\uC2DC \uC218\uD589\uD569\uB2C8\uB2E4":We?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":de?.enabled===!0?`\uBA38\uC9C0 (${de.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${de?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:fe,cancel_enabled:!De,discard_action:!_e&&!Re&&!(de&&de.tier==="merged"),discard_enabled:!De&&!fe,discard_title:fe?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":void 0})}for(let A=0;A<Ne.length;A++){let T=Ne[A],X=T&&T.bead_id;if(typeof X!="string"||ee.has(X))continue;ee.add(X);let ne=x[X],de={...Q(X),lane:"queue",reason:Ua(L,X),queue_position:A+1,queue_index:A,queue_length:Ne.length,badges:ne?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!ne,revise_action:!!ne,revise_enabled:!!ne,revise_title:ne?ne.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${ne.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""};f.push(de);let fe=b.get(R);fe?fe.push(de):b.set(R,[de])}for(let A of Array.isArray(g.runnable)?g.runnable:[]){let T=A&&A.bead_id;typeof T!="string"||ee.has(T)||(ee.add(T),l.push({...Q(T),title:A.title||E[T]||T,lane:"runnable",draggable:!0,reason:Ua(L,T),created_at:A.created_at??void 0,updated_at:A.updated_at??void 0,workflow:A.route?{route:A.route,chips:{route:A.route}}:null,place_index:Ne.length}))}for(let A of Ze){let T=A&&A.bead_id;if(typeof T!="string"||ee.has(T)||(ee.add(T),o!==void 0&&typeof A.added_at=="number"&&A.added_at<o))continue;let X=$d(M,T);_.push({...Q(T),lane:"done",done:!0,usage:It(M,T),done_at:typeof A.added_at=="number"?A.added_at:void 0,done_kind:X&&typeof X.done_kind=="string"?X.done_kind:null})}}i.sort((g,R)=>(R.last_event_at??0)-(g.last_event_at??0)),_.sort((g,R)=>(R.done_at??0)-(g.done_at??0));let y=s.length>0?s:r.map(g=>({root_dir:g&&g.root_dir,name:g&&g.name,auto_advance:g&&g.auto_advance,auto_merge:g&&g.auto_merge,slots:g&&g.slots,revision:g&&g.revision,exec_defaults:g&&g.exec_defaults})),$=[];for(let g of y)!g||typeof g.root_dir!="string"||$.push({root_dir:g.root_dir,name:g.name||g.root_dir,auto_advance:g.auto_advance===!0,auto_merge:g.auto_merge===!0,slots:typeof g.slots=="number"&&g.slots>=Un?g.slots:Un,revision:typeof g.revision=="number"?g.revision:0,exec_defaults:Et(g.exec_defaults),items:b.get(g.root_dir)||[]});return{runnable:l,queue:f,queue_groups:$,running:i,pr_wait:d,done:_,automation:{total:$.length,both_on:$.filter(g=>g.auto_advance&&g.auto_merge).length}}}function Sd(e,t){if(typeof e!="number"||!Number.isFinite(e))return"";let r=t-e<wd;return c`<span
    class="mon-beat${r?" mon-beat--live":""}"
    title=${`\uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${dt(e)}`}
    ><span class="mon-beat__dot" aria-hidden="true"></span>${r?"":c`<span class="mon-beat__age"
          >${wt(e,t)}</span
        >`}</span
  >`}function zn(e){return c`<div class="mon-c__title">${e.title}</div>`}function Hn(e){return c`<span class="mon-c__id" title="클릭하면 상세로 이동"
    >${e.id}</span
  >`}function wr(e){return e.workspace_name?c`<span class="mon-c__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:""}function ys(e){let t=xt(e.usage);return t?c`<span class="mon-c__usage" title=${bn(e.usage)}
        >${t}</span
      >`:""}function $s(e){return(Array.isArray(e.badges)?e.badges:[]).map(n=>c`<span class="mon-c__badge${e.alert?" mon-c__badge--alert":""}"
        >${n}</span
      >`)}function Ad(e){return c`<span class="mon-c__ops">
    ${e.run_state==="running"?c`<button
          type="button"
          class="mon-op mon-op--pause"
          ?disabled=${e.can_pause===!1}
          aria-label="일시정지"
          title="일시정지 — 세션을 끊고 이어하기 가능 상태로 둡니다"
        >
          ${vs()}
        </button>`:c`<button
          type="button"
          class="mon-op mon-op--resume"
          ?disabled=${e.can_resume===!1}
          aria-label="이어하기"
          title="이어하기"
        >
          ${bs()}
        </button>`}
    <button
      type="button"
      class="mon-op mon-op--stop"
      aria-label="중단"
      title="중단 — 세션을 죽이고 대기 큐에서 뺍니다"
    >
      ${ws()}
    </button>
    ${e.run_state==="failed"?c`<button
          type="button"
          class="mon-op mon-op--dismiss"
          aria-label="실패 기록 닫기"
          title="실패 기록 닫기"
        >
          ${Ma()}
        </button>`:""}
  </span>`}function Td(e,t){let n=typeof e.started_at=="number"?ms(t-e.started_at):"";return c`${zn(e)}
    <div class="mon-c__meta">
      ${$s(e)}${Sd(e.last_event_at,t)}${Hn(e)}${wr(e)}
      ${e.model?c`<span class="mon-c__model">${e.model}</span>`:""}
      ${n?c`<span class="mon-live__elapsed">${n}</span>`:""}
      ${ys(e)}${Ad(e)}
    </div>`}function Ed(e){let t=e.workflow,r=(t&&t.chips||{}).route||t&&t.route,s=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),o=wt(e.updated_at);return c`${zn(e)}
    <div class="mon-c__meta">
      <span class="mon-c__grip" aria-hidden="true">⠿</span>${Hn(e)}
      ${r?c`<span class="ctl-chip ctl-chip--route">${r}</span>`:""}
      ${wr(e)}
      ${o?c`<span title=${`\uC218\uC815 ${dt(e.updated_at)}`}
            >수정 ${o}</span
          >`:""}
      ${e.reason?c`<span
            class="mon-c__reason${s?" mon-c__reason--danger":""}"
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
    </div>`}function Cd(e){return c`${zn(e)}
    <div class="mon-c__meta">
      <span class="mon-c__grip" aria-hidden="true">⠿</span>
      <span class="mon-live__pos">#${e.queue_position}</span>${Hn(e)}
      ${$s(e)}
      ${e.reason?c`<span class="mon-c__reason">${e.reason}</span>`:""}
      <span class="mon-c__ops">
        <button
          type="button"
          class="mon-op mon-op--up"
          ?disabled=${(e.queue_position??1)<=1}
          aria-label="한 칸 앞으로"
          title="한 칸 앞으로"
        >
          ↑
        </button>
        <button
          type="button"
          class="mon-op mon-op--down"
          ?disabled=${(e.queue_index??0)>=(e.queue_length??1)-1}
          aria-label="한 칸 뒤로"
          title="한 칸 뒤로"
        >
          ↓
        </button>
        <button
          type="button"
          class="mon-op mon-op--remove"
          aria-label="대기 큐에서 제거"
          title="대기 큐에서 제거"
        >
          ✕
        </button>
      </span>
    </div>
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
        </div>`:""}`}function Rd(e){let t=!!(xt(e.usage)||e.merge_action||e.cancel_action||e.discard_action);return c`${zn(e)}
    <div class="mon-c__meta">
      ${Hn(e)}${wr(e)}
      ${e.pr_url&&e.pr_number?c`<a
            class="mon-c__pr"
            href=${e.pr_url}
            target="_blank"
            rel="noreferrer noopener"
            title="PR 열기"
            >#${e.pr_number} ↗</a
          >`:""}
      ${$s(e)}
      ${e.reason?c`<span class="mon-c__reason">${e.reason}</span>`:""}
    </div>
    ${t?c`<div class="mon-c__tail">
          ${ys(e)}
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
                ?disabled=${e.discard_enabled===!1}
                title=${e.discard_enabled===!1?e.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C)"}
              >
                폐기
              </button>`:""}
        </div>`:""}`}function Id(e,t){let n=e.done_kind||"",r=n?kd[n]||n:"",s=wt(e.done_at,t);return c`${zn(e)}
    <div class="mon-c__meta">
      ${Hn(e)}${wr(e)}
      ${r?c`<span
            class="mon-live__kind${yd.has(n)?" mon-live__kind--ok":" mon-live__kind--warn"}"
            >${r}</span
          >`:""}
      ${ys(e)}
      ${s?c`<span title=${`\uC644\uB8CC ${dt(e.done_at)}`}
            >완료 ${s}</span
          >`:""}
    </div>`}function za(e,t){return e.lane==="running"?Td(e,t):e.lane==="runnable"?Ed(e):e.lane==="queue"?Cd(e):e.lane==="pr_wait"?Rd(e):Id(e,t)}function Ha(e){let t=String(e.revision);return c`<header
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
        ${e.auto_advance?vs():bs()}
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
        ${Na()}
        <span class="mon-ctl__label">머지</span>
      </button>
      <label class="mon-ctl mon-ctl--slots" title="동시에 실행할 세션 수">
        ${Pa()}
        <span class="mon-ctl__label">슬롯</span>
        <input
          type="number"
          class="mon-slots__input"
          min=${Un}
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
        ${Fa()}
        <span class="mon-ctl__label">설정</span>
      </button>
    </span>
  </header>`}function Wa(e){let{total:t,both_on:n}=e.automation,r=t>0&&n===t,s=Rt.find(o=>o.value===e.done_range)?.label||"";return c`<div class="mon-top">
    <button
      type="button"
      class="mon-auto-all${r?" is-active":""}"
      data-on=${r?"false":"true"}
      aria-pressed=${r?"true":"false"}
      ?disabled=${t===0}
      title=${r?"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uB055\uB2C8\uB2E4 (\uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4)":"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uCF2D\uB2C8\uB2E4"}
    >
      ${r?ws():qa()}
      <span class="mon-auto-all__label"
        >${r?"\uC804\uCCB4 \uC790\uB3D9\uD654 \uBA48\uCDA4":`\uC804\uCCB4 \uC790\uB3D9\uD654 ${n}/${t}`}</span
      >
    </button>
    <div class="mon-kpi">
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
        ${Rt.map(o=>c`<option
              value=${o.value}
              ?selected=${e.done_range===o.value}
            >
              ${o.label}
            </option>`)}
      </select>
      ${e.token_total?c`<span
            class="mon-kpi__chip mon-kpi__chip--tokens"
            title=${e.token_tooltip}
            >${s} 완료 · 누적 ${e.token_total}</span
          >`:""}
    </div>
  </div>`}function Ga(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function ja(e){let t={};for(let a of Nt)t[a]=0;let n=!1,r=0,s=0,o=0;for(let a of Array.isArray(e)?e:[]){let l=a&&a.usage;if(l&&typeof l=="object"){let i=!1;for(let d of Nt){let f=l[d];typeof f=="number"&&Number.isFinite(f)&&(t[d]+=f,n=!0,i=!0)}if(i){s+=1;let d=l.total_cost_usd;typeof d=="number"&&Number.isFinite(d)&&(r+=d,o+=1)}}}return s>0&&o===s&&(t.total_cost_usd=r),n?xt(t):null}var Va="bdui.monitor.done-range";function Ld(){try{let e=window.localStorage.getItem(Va);return Mt(e)?e:kt}catch{return kt}}function Dd(e){try{window.localStorage.setItem(Va,e)}catch{}}var Ka="tab:monitor:pipeline",Od=1e3,Md=[{lane:"runnable",pane:"candidate",title:"\uC2E4\uD589\uAC00\uB2A5",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589\uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}];function Ya(e,t){let n=e.lane==="runnable"||e.lane==="queue";return c`<div
    class="mon-card mon-card--${e.lane}${e.alert?" mon-card--alert":""}"
    draggable=${n?"true":"false"}
    data-issue-id=${e.id}
    data-root-dir=${e.root_dir}
    data-revision=${String(e.expected_revision)}
    data-lane=${e.lane}
    data-attempt-id=${e.attempt_id||""}
    data-place-index=${String(e.place_index??"")}
    data-queue-index=${String(e.queue_index??"")}
    data-queue-length=${String(e.queue_length??"")}
  >
    ${za(e,t)}
  </div>`}function Za(e,t){let n=Ve("views:monitor"),r=t.gotoIssue,s=t.pipelineStore,o=t.transport,a=t.getWorkspacePath,l=t.switchWorkspace,i=t.now||(()=>Date.now()),d=t.confirm||(q=>typeof globalThis.confirm!="function"||globalThis.confirm(q)),f=Ld();function _(){let q=Rt.find(W=>W.value===f);return q?q.label:""}let b=document.createElement("div");b.className="mon",e.appendChild(b);let y=ks(null,null),$=null,g=new Map,R=new Set;function H(q){return y.queue_groups.find(W=>W.root_dir===q)||null}let Y=vr(e,{queueStore:{get(){if(!$)return{revision:0,exec_defaults:{}};let q=g.get($);if(q)return q;let W=H($),O=s&&s.get?s.get():null,se=(Array.isArray(O)?O:[]).find(pe=>pe&&pe.root_dir===$);return{revision:W?W.revision:0,exec_defaults:W?W.exec_defaults:{},workspace_info:se?se.workspace_info:void 0}},set(q){$&&g.set($,q);for(let W of Array.from(R))W()},subscribe(q){return R.add(q),()=>R.delete(q)}},transport:o?(q,W)=>o(q,{...W||{},root_dir:$}):void 0,getWorkspacePath:()=>$||void 0}),M=null,E=null;async function S(q,W,O,se){if(!o||!O)return null;let pe=await o(q,{...W,root_dir:O,expected_revision:se});if(pe&&pe.conflict){let be=pe.queue&&typeof pe.queue.revision=="number"?pe.queue.revision:se;pe=await o(q,{...W,root_dir:O,expected_revision:be})}return pe&&pe.queue&&O&&g.set(O,pe.queue),pe}async function L(q,W,O){return!o||!O?null:await o(q,{...W,root_dir:O})}async function x(q){if(!o||!q&&!d("\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB055\uB2C8\uB2E4. \uAC01 \uB808\uD3EC\uC758 \uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uD568\uAED8 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?"))return;let W=await o("monitor-auto-toggle",{on:q}),O=W&&Array.isArray(W.failed)?W.failed:[];O.length>0&&ie(`\uC790\uB3D9\uD654 ${q?"\uCF1C\uAE30":"\uB044\uAE30"} \uC77C\uBD80 \uC2E4\uD328: ${O.map(se=>se.root_dir).join(", ")}`,"error",3200)}async function G(){let q=new Map;for(let W of y.pr_wait)q.has(W.root_dir)||q.set(W.root_dir,W.expected_revision);for(let[W,O]of q)await S("worker-merge-queue-add-all",{},W,O)}let V=null,Z=!1,ce=null;function Ne(){ce!==null&&clearTimeout(ce),ce=setTimeout(()=>{ce=null,Z=!1},0)}function Ze(q){let W=q.target;return typeof W?.closest=="function"?W.closest(".mon-group"):null}function xe(q){let W=Ze(q);return!W||!V?null:(W.getAttribute("data-root-dir")||"")===V.root_dir?W:null}function Q(){for(let q of Array.from(b.querySelectorAll(".mon-group--drag-over")))q.classList.remove("mon-group--drag-over")}function ee(q){let W=q.target,O=typeof W?.closest=="function"?W.closest('.mon-card[draggable="true"]'):null;if(O){V={bead_id:O.getAttribute("data-issue-id")||"",lane:O.getAttribute("data-lane")||"",root_dir:O.getAttribute("data-root-dir")||"",revision:Number(O.getAttribute("data-revision")||0)||0,queue_index:Number(O.getAttribute("data-queue-index")),queue_length:Number(O.getAttribute("data-queue-length")),place_index:Number(O.getAttribute("data-place-index"))},Z=!0;try{q.dataTransfer?.setData("text/plain",V.bead_id),q.dataTransfer&&(q.dataTransfer.effectAllowed="move")}catch{}}}function A(q){let W=xe(q);W&&(q.preventDefault(),q.dataTransfer&&(q.dataTransfer.dropEffect="move"),W.classList.add("mon-group--drag-over"))}function T(q){Ze(q)?.classList.remove("mon-group--drag-over")}function X(){V=null,Q(),Ne()}function ne(q){let W=xe(q),O=V;if(V=null,Q(),!W||!O||!O.bead_id)return;q.preventDefault();let se=q.target,pe=typeof se?.closest=="function"?se.closest('.mon-card[data-lane="queue"]'):null,be=pe&&W.contains(pe)?Number(pe.getAttribute("data-queue-index")):NaN;if(O.lane==="runnable"){let Pe=Number.isFinite(be)?be:O.place_index;if(!Number.isFinite(Pe))return;S("worker-queue-place",{bead_id:O.bead_id,index:Pe},O.root_dir,O.revision);return}if(O.lane!=="queue"||pe&&pe.getAttribute("data-issue-id")===O.bead_id)return;let te=O.queue_index,Ae=Number.isFinite(be)?te>be?be:be-1:O.queue_length-1;!Number.isFinite(Ae)||Ae<0||Ae===te||S("worker-queue-reorder",{bead_id:O.bead_id,to_index:Ae},O.root_dir,O.revision)}function de(q){let W={runnable:y.runnable,queue:y.queue,running:y.running,pr_wait:y.pr_wait,done:y.done};return c`${Wa({automation:y.automation,counts:{running:y.running.length,queue:y.queue.length,pr_wait:y.pr_wait.length},done_range:f,token_total:ja(y.done),token_tooltip:Ga(_())})}
      <div class="worker-lanes mon-lanes">
        ${Md.map(O=>{let se=W[O.lane],pe=O.lane==="queue"?y.queue_groups.length>0?c`${y.queue_groups.map(be=>c`<div
                        class="mon-group"
                        data-root-dir=${be.root_dir}
                      >
                        ${Ha(be)}
                        <div class="mon-group__list">
                          ${be.items.map(te=>Ya(te,q))}
                        </div>
                      </div>`)}`:void 0:se.length>0?c`${se.map(be=>Ya(be,q))}`:void 0;return Lt({id:`monitor-${O.lane}`,lane:O.pane,title:O.lane==="done"?`\uC644\uB8CC\xB7${_()}`:O.title,items:se,empty:O.empty,body:pe,live:O.lane==="running"&&se.length>0,header_control:O.lane==="pr_wait"&&se.length>0?c`<button
                    type="button"
                    class="mon-lane-op mon-merge-all"
                    title="자격이 생기는 PR을 각 레포의 머지 큐에 한 번에 넣습니다"
                  >
                    일괄 머지
                  </button>`:""})})}
      </div>`}function fe(){let q=s&&s.get?s.get():null,W=s&&s.getWorkspacesState?s.getWorkspacesState():[],O=i();y=ks(q,W,{done_since:dn(f,O)}),Le(de(O),b)}function De(q,W){let O=a?a():void 0;if(!W||!O||W===O||!l){r(q);return}l(W).then(()=>{r(q)}).catch(se=>{n("workspace switch for %s failed: %o",W,se)})}function _e(q){return{root_dir:q.getAttribute("data-root-dir")||"",revision:Number(q.getAttribute("data-revision")||0)||0}}function Re(q,W){let{root_dir:O,revision:se}=_e(q),pe=q.getAttribute("data-issue-id")||"",be=q.getAttribute("data-attempt-id")||"",te=W.classList;if(te.contains("worker-card__place")){S("worker-queue-place",{bead_id:pe,index:Number(q.getAttribute("data-place-index")||0)||0},O,se);return}if(te.contains("mon-op--up")||te.contains("mon-op--down")){let Ae=Number(q.getAttribute("data-queue-index")||0)||0,Pe=te.contains("mon-op--up")?Ae-1:Ae+1;if(Pe<0)return;S("worker-queue-reorder",{bead_id:pe,to_index:Pe},O,se);return}if(te.contains("mon-op--remove")){S("worker-queue-remove",{bead_id:pe},O,se);return}if(te.contains("mon-op--pause")){L("worker-attempt-pause",{attempt_id:be},O);return}if(te.contains("mon-op--stop")){L("worker-attempt-stop",{attempt_id:be},O);return}if(te.contains("mon-op--resume")){S("worker-attempt-resume",{attempt_id:be},O,se);return}if(te.contains("mon-op--dismiss")){S("worker-attempt-dismiss",{attempt_id:be},O,se);return}if(te.contains("worker-mini__merge")){S("worker-merge-queue-add",{bead_id:pe},O,se);return}if(te.contains("worker-mini__merge-cancel")){S("worker-merge-queue-remove",{bead_id:pe},O,se);return}if(te.contains("worker-mini__discard")){if(!d(`${pe}: PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4. \uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`))return;S("worker-pr-discard",{bead_id:pe},O,se);return}if(te.contains("worker-mini__revise-fix")){S("worker-revise-fix",{bead_id:pe},O,se);return}te.contains("worker-mini__revise-approve")&&S("worker-revise-approve",{bead_id:pe},O,se)}function We(q){let W=Z;Z=!1;let O=q.target;if(!O||typeof O.closest!="function"||O.closest("dialog")||O.closest("a"))return;let se=O.closest(".mon-auto-all");if(se){q.preventDefault(),x(se.getAttribute("data-on")==="true");return}if(O.closest(".mon-merge-all")){q.preventDefault(),G();return}let be=O.closest(".mon-ctl--advance");if(be){q.preventDefault();let{root_dir:et,revision:Ye}=_e(be);S("worker-queue-toggle",{on:be.getAttribute("data-on")==="true"},et,Ye);return}let te=O.closest(".mon-ctl--merge-auto");if(te){q.preventDefault();let{root_dir:et,revision:Ye}=_e(te);S("worker-merge-auto-toggle",{on:te.getAttribute("data-on")==="true"},et,Ye);return}let Ae=O.closest(".mon-ctl--exec");if(Ae){q.preventDefault(),$=Ae.getAttribute("data-root-dir")||null,g.delete($||""),Y.open();return}let Pe=O.closest(".mon-card");if(!Pe)return;let it=O.closest("button");if(it){q.preventDefault(),Re(Pe,it);return}let lt=Pe.getAttribute("data-issue-id");lt&&!W&&(q.preventDefault(),De(lt,Pe.getAttribute("data-root-dir")||""))}function qe(q){let W=q.target;if(!W||typeof W.closest!="function")return;let O=W.closest(".mon-done-range");if(O){f=Mt(O.value)?O.value:kt,Dd(f),fe();return}let se=W.closest(".mon-slots__input");if(!se)return;let{root_dir:pe,revision:be}=_e(se),te=Number(se.value);if(!Number.isFinite(te))return;let Ae=Math.max(Un,Math.floor(te));S("worker-queue-set-slots",{slots:Ae},pe,be)}e.addEventListener("click",We),e.addEventListener("change",qe),e.addEventListener("dragstart",ee),e.addEventListener("dragover",A),e.addEventListener("dragleave",T),e.addEventListener("drop",ne),e.addEventListener("dragend",X),s&&typeof s.subscribe=="function"&&(M=s.subscribe(()=>{try{g.clear(),fe();for(let q of Array.from(R))q()}catch{}}));function Xe(){E!==null&&(clearInterval(E),E=null)}function st(){ce!==null&&(clearTimeout(ce),ce=null)}return{load(){n("load"),fe(),E===null&&(E=setInterval(()=>{try{fe()}catch{}},Od))},pause(){Xe()},clear(){Xe(),st(),M&&(M(),M=null),e.removeEventListener("click",We),e.removeEventListener("change",qe),e.removeEventListener("dragstart",ee),e.removeEventListener("dragover",A),e.removeEventListener("dragleave",T),e.removeEventListener("drop",ne),e.removeEventListener("dragend",X),Y.destroy(),R.clear(),e.replaceChildren()}}}function Xa(e,t,n){let r=Ve("views:nav"),s=null;function o(i){return d=>{d.preventDefault(),r("click tab %s",i),n.gotoView(i)}}function a(){let i=t.getState(),d=i.view==="worker"||i.view==="monitor"?i.view:"board";return c`
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
    `}function l(){Le(a(),e)}return l(),s=t.subscribe(()=>l()),{destroy(){s&&(s(),s=null),Le(c``,e)}}}var Qa=["bug","feature","task","epic","chore"];function Ja(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var ei=["Critical","High","Medium","Low","Backlog"];function ti(e,t){let n=document.createElement("dialog");n.id="new-issue-dialog",n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true"),n.innerHTML=`
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
  `,e.appendChild(n);let r=n.querySelector("#new-issue-form"),s=n.querySelector("#new-title"),o=n.querySelector("#new-type"),a=n.querySelector("#new-priority"),l=n.querySelector("#new-labels"),i=n.querySelector("#new-description"),d=n.querySelector("#new-issue-error"),f=n.querySelector("#btn-cancel"),_=n.querySelector("#btn-create"),b=n.querySelector(".new-issue__close");function y(){o.replaceChildren();let E=document.createElement("option");E.value="",E.textContent="\u2014 Select \u2014",o.appendChild(E);for(let S of Qa){let L=document.createElement("option");L.value=S,L.textContent=Ja(S),o.appendChild(L)}a.replaceChildren();for(let S=0;S<=4;S+=1){let L=document.createElement("option");L.value=String(S);let x=ei[S]||"Medium";L.textContent=`${S} \u2013 ${x}`,a.appendChild(L)}}y();function $(){try{typeof n.close=="function"?n.close():n.removeAttribute("open")}catch{n.removeAttribute("open")}}function g(E){s.disabled=E,o.disabled=E,a.disabled=E,l.disabled=E,i.disabled=E,f.disabled=E,_.disabled=E,_.textContent=E?"Creating\u2026":"Create"}function R(){d.textContent=""}function H(E){d.textContent=E}function z(){try{let E=window.localStorage.getItem("beads-ui.new.type");E?o.value=E:o.value="";let S=window.localStorage.getItem("beads-ui.new.priority");S&&/^\d$/.test(S)?a.value=S:a.value="2"}catch{o.value="",a.value="2"}}function Y(){let E=o.value||"",S=a.value||"";E.length>0&&window.localStorage.setItem("beads-ui.new.type",E),S.length>0&&window.localStorage.setItem("beads-ui.new.priority",S)}async function M(){R();let E=String(s.value||"").trim();if(E.length===0){H("Title is required"),s.focus();return}let S=Number(a.value||"2");if(!(S>=0&&S<=4)){H("Priority must be 0..4"),a.focus();return}let L=String(o.value||""),x=String(i.value||""),G={title:E};L.length>0&&(G.type=L),String(S).length>0&&(G.priority=S),x.length>0&&(G.description=x),g(!0);try{await t("create-issue",G)}catch{g(!1),H("Failed to create issue");return}Y(),g(!1),$()}return n.addEventListener("cancel",E=>{E.preventDefault(),$()}),b.addEventListener("click",()=>$()),f.addEventListener("click",()=>$()),n.addEventListener("keydown",E=>{E.key==="Enter"&&(E.ctrlKey||E.metaKey)&&(E.preventDefault(),M())}),r.addEventListener("submit",E=>{E.preventDefault(),M()}),{open(){r.reset(),R(),z();try{"showModal"in n&&typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")}catch{n.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){$()}}}var Nd="tab:worker:ready",Pd="tab:worker:blocked",Fd="tab:worker:in-progress",kr=1;function As(e){let t=e&&e.metadata;return!!(t&&typeof t=="object"&&t.spec_id)}var oi="beads-ui.worker.candidate-filter",xs={show_blocked:!1,spec:"all"};function qd(){try{let e=window.localStorage.getItem(oi);if(!e)return{...xs};let t=JSON.parse(e);if(!t||typeof t!="object")return{...xs};let n=t.spec;return{show_blocked:t.show_blocked===!0,spec:n==="with"||n==="without"?n:"all"}}catch{return{...xs}}}function Bd(e){try{window.localStorage.setItem(oi,JSON.stringify(e))}catch{}}function Ud(e,t){let n=l=>t.show_blocked||!l.blocked,r=l=>t.spec==="all"||(t.spec==="with"?l.has_spec:!l.has_spec),s=[],o=0,a=0;for(let l of e){let i=n(l),d=r(l);i&&d?s.push(l):!i&&d?o+=1:i&&!d&&(a+=1)}return{visible:s,hidden_blocked:o,hidden_spec:a}}var zd=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],ai="bdui.worker.candidate_sort",Hd=[{value:"spec",label:"spec \uC6B0\uC120"},{value:"board",label:"Board \uC21C\uC11C"},{value:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131\uC21C"}],yr="spec";function Wd(){try{let e=window.localStorage.getItem(ai);return e==="board"||e==="created"||e==="spec"?e:yr}catch{return yr}}function Gd(e){try{window.localStorage.setItem(ai,e)}catch{}}var ii="bdui.worker.done-range";function jd(){try{let e=window.localStorage.getItem(ii);return Mt(e)?e:kt}catch{return kt}}function Yd(e){try{window.localStorage.setItem(ii,e)}catch{}}var Vd="(max-width: 640px)",li="beads-ui.worker.lane-collapsed",Wn={queue:!0,done:!0};function Kd(){try{let e=window.localStorage.getItem(li);if(!e)return{...Wn};let t=JSON.parse(e);return!t||typeof t!="object"?{...Wn}:{queue:typeof t.queue=="boolean"?t.queue:Wn.queue,done:typeof t.done=="boolean"?t.done:Wn.done}}catch{return{...Wn}}}function Zd(e){try{window.localStorage.setItem(li,JSON.stringify(e))}catch{}}function ni(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let n=typeof t.title=="string"?t.title:t.id||"";return n.length>22?`${n.slice(0,22)}\u2026`:n}function Xd(e,t,n){let r=Array.isArray(e)?e.slice():[];return t==="created"?r.sort(Qt):(r.sort(Qn(n)),t==="board"?r:[...r.filter(As),...r.filter(s=>!As(s))])}function Qd(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function Jd(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function eu(e){let n=(Array.isArray(e?.dependencies)?e.dependencies:[]).map(r=>typeof r=="string"?r:r&&r.id).filter(Boolean);return n.length>0?`\u{1F512} ${n.join(", ")}`:"\u{1F512} blocked"}var tu=["closed_unmerged","undecidable"],nu=[{from:"\uAD00\uCE21 \uB300\uAE30",activity:"checking",to:"\uD655\uC778\uC911"},{from:"\uB85C\uCEEC\uAC80\uC99D \uB300\uAE30",activity:"verifying",to:"\uB85C\uCEEC\uAC80\uC99D \uC2E4\uD589 \uC911"}];function ru(e,t){for(let n of nu)if(e===n.from&&t===n.activity)return{label:n.to,live:!0};return{label:e,live:!1}}var Ss=[{step:"merging",label:"\uBA38\uC9C0 \uC911"},{step:"base_sync",label:"base \uB3D9\uAE30\uD654"},{step:"post_merge_verify",label:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D"},{step:"deploy",label:"\uBC30\uD3EC"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"},{step:"ship_exported_capabilities",label:"capability \uBC1C\uD589"}];function su(e){if(typeof e!="string"||e.length===0)return null;let t=Ss.length,n=Ss.findIndex(r=>r.step===e);return n<0?{label:e,index:0,total:t,percent:0}:{label:Ss[n].label,index:n+1,total:t,percent:Math.round((n+1)/t*100)}}function ri(e){switch(e){case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";default:return e}}function si(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}function ou(e,t,n,r,s=null,o=null,a=null,l=!1,i=null,d=!0,f=null,_=null){let b=!!i&&i.position>0,y=!!i&&i.active===!0,$=i&&i.failure||null,g=n[e]||null,R=g&&g.gate?g.gate:null,H=g&&g.pr?g.pr:null,z=[];l&&z.push("\uC138\uC158");let Y=a?a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":null,M=ru(l&&R&&R.tier==="closed_unmerged"?"\uB2EB\uD798":R&&R.gate_badge||"",Y?null:o&&o.activity||null);Y&&z.push(Y),M.label&&z.push(M.label),R&&R.base_badge&&R.base_badge!==R.gate_badge&&z.push(R.base_badge),_&&z.push(_),r&&z.push("\uC815\uB9AC \uC2E4\uD328"),b&&!y&&z.push(`\uBA38\uC9C0 \uB300\uAE30 #${i.position}`),$&&z.push(`\uC77C\uAD04 \uBA38\uC9C0 \uC2E4\uD328: ${ri($)}`),f&&z.push(`\uC790\uB3D9 \uC81C\uC678: ${ri(f)}`);let E=!!R&&R.base_badge==="\uCDA9\uB3CC",S=!!R&&R.enabled===!0,L=su(o&&o.merge_progress?o.merge_progress.step:null),x=!!r&&!!R&&R.tier==="merged",G=l&&!!R&&R.tier==="merged",V=l&&E&&d===!1;return{id:e,title:t,reason:r?"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644":"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",external:l,pr_number:H&&typeof H.number=="number"?H.number:null,pr_url:H&&typeof H.url=="string"?H.url:"",badges:z,live_badge:a==="running"?Y:Y?null:M.live?M.label:null,usage:s,alert:!!R&&tu.includes(R.tier)||!!r||!!$,merge_action:!b,cancel_action:b,cancel_enabled:!y,cancel_title:y?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard_action:!l&&!r&&!(R&&R.tier==="merged"),merge_step:L,discard_enabled:!L&&!a&&!b,discard_title:a?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":b?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":void 0,merge_enabled:!L&&!a&&!V&&(S||E||x||G),merge_label:G?"\uC815\uB9AC":E&&!L&&!x?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:L?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${L.label}`:G?"\uBA38\uC9C0\uB428 \u2014 \uD074\uB9AD\uD558\uBA74 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC\uB97C \uC218\uD589\uD569\uB2C8\uB2E4":V?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":x?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uCC98\uC74C\uBD80\uD130 \uB2E4\uC2DC \uC218\uD589\uD569\uB2C8\uB2E4":E?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":S?`\uBA38\uC9C0 (${R.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:R&&R.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${R&&R.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function Ts(e,t={}){let{transport:n,issueStores:r,queueStore:s,sessionLogStore:o,uiOrderStore:a,gotoIssue:l,getWorkspacePath:i}=t,d=r?er(r,a):null,f=nr({transport:n,uiOrderStore:a}),_=null,b=[],y=qd(),$=Wd(),g=jd();function R(){let u=Rt.find(w=>w.value===g);return u?u.label:"\uC624\uB298"}let H=Kd(),z=!1,Y=new Set,M=new Set,E=[],S=document.createElement("div");S.className="worker-console";let L=document.createElement("div");L.className="worker-top";let x=document.createElement("div");x.className="worker-drawer-overlay",x.hidden=!0;let G=document.createElement("div");G.className="worker-drawer-overlay__backdrop";let V=document.createElement("div");V.className="worker-drawer-host",x.append(G,V);let Z=document.createElement("div");Z.className="worker-lanes-host",S.append(L,x,Z),e.appendChild(S);let ce=null,Ne=gr(V,{transport:n,sessionLogStore:o,onClose:()=>{ce=null,x.hidden=!0,Te()}}),Ze=vr(S,{queueStore:s,transport:n,getWorkspacePath:i});function xe(){return s&&s.get()||{revision:0,auto_advance:!1,auto_merge:!1,slots:kr,queue:[],pr_wait:[],done:[]}}function Q(){let u=xe();return typeof u.revision=="number"?u.revision:0}function ee(u){u&&u.queue&&s&&s.set(u.queue)}function A(){let u=xe().queue;return Array.isArray(u)?u.length:0}async function T(u,w){if(!n)return;let P=await n("worker-queue-place",{bead_id:u,index:w,expected_revision:Q()});ee(P),P&&P.conflict&&await n("worker-queue-place",{bead_id:u,index:w,expected_revision:Q()}).then(ee)}async function X(u,w){if(!n)return;let P=await n("worker-queue-reorder",{bead_id:u,to_index:w,expected_revision:Q()});ee(P),P&&P.conflict&&await n("worker-queue-reorder",{bead_id:u,to_index:w,expected_revision:Q()}).then(ee)}async function ne(u){if(!n)return;let w=await n("worker-queue-remove",{bead_id:u,expected_revision:Q()});ee(w),w&&w.conflict&&await n("worker-queue-remove",{bead_id:u,expected_revision:Q()}).then(ee)}async function de(u){!n||!u||await n("worker-attempt-stop",{attempt_id:u})}async function fe(u){if(!n||!u)return;let w=await n("worker-attempt-pause",{attempt_id:u});w&&w.paused===!1&&w.reason&&ie(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${w.reason}`,"error",2400)}async function De(u){if(!n||!u)return;let w=await n("worker-attempt-resume",{attempt_id:u,expected_revision:Q()});ee(w),w&&w.conflict&&(w=await n("worker-attempt-resume",{attempt_id:u,expected_revision:Q()}),ee(w)),w&&w.resumed===!1&&!w.conflict&&w.reason&&ie(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${w.reason}`,"error",2400)}async function _e(u){if(!n||!u)return;let w=await n("worker-attempt-dismiss",{attempt_id:u,expected_revision:Q()});ee(w),w&&w.conflict&&(w=await n("worker-attempt-dismiss",{attempt_id:u,expected_revision:Q()}),ee(w)),w&&w.dismissed===!1&&!w.conflict&&w.reason&&ie(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${w.reason}`,"error",2400)}async function Re(u,w){if(!n)return null;let P=n,me=await P(u,{...w,expected_revision:Q()});return ee(me),me&&me.conflict&&(me=await P(u,{...w,expected_revision:Q()}),ee(me)),me}async function We(u){if(!n||!u)return;Y.add(u),Te();let w;try{w=await Re("worker-merge-queue-add",{bead_id:u})}finally{Y.delete(u),Te()}!w||w.conflict||w.applied||ie("\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)","error",2400)}async function qe(u){if(!n)return;let w=await Re("worker-merge-auto-toggle",{on:u});!w||w.conflict||ie(u?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",u?"success":"info",2400)}async function Xe(u){if(!n||!u)return;let w=await Re("worker-merge-queue-remove",{bead_id:u});w&&!w.conflict&&!w.applied&&w.reason==="merge_active"&&ie("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function st(){await Re("worker-merge-queue-remove",{all:!0})}async function q(u){if(!n||!u||!(typeof globalThis.confirm!="function"||globalThis.confirm(`${u}: PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4. \uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694. \uACC4\uC18D\uD560\uAE4C\uC694?`)))return;let P=await n("worker-pr-discard",{bead_id:u,expected_revision:Q()});if(ee(P),P&&P.conflict&&(P=await n("worker-pr-discard",{bead_id:u,expected_revision:Q()}),ee(P)),P&&P.discarded===!0){ie("\uD3D0\uAE30 \uC644\uB8CC \u2014 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB2E4\uC2DC \uC2E4\uD589\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4","success",2400);return}P&&P.discarded===!1&&!P.conflict&&ie(`\uD3D0\uAE30 \uAC70\uBD80: ${P.reason||""}`,"error",2800)}async function W(u,w){if(!n||!w||M.has(w))return;M.add(w),Te();let P;try{P=await n(u,{bead_id:w,expected_revision:Q()}),ee(P),P&&P.conflict&&(P=await n(u,{bead_id:w,expected_revision:Q()}),ee(P))}finally{M.delete(w),Te()}if(!(!P||P.conflict)){if(P.ok){ie(u==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}ie(`\uCC98\uBD84 \uAC70\uBD80: ${P.reason||""}`,"error",3e3)}}async function O(u){if(!n)return;let w=await n("worker-queue-toggle",{on:u,expected_revision:Q()});ee(w),w&&w.conflict&&await n("worker-queue-toggle",{on:u,expected_revision:Q()}).then(ee)}async function se(u){await O(u),await qe(u)}async function pe(u){if(!n||!Number.isFinite(u))return;let w=Math.max(kr,Math.floor(u)),P=await n("worker-queue-set-slots",{slots:w,expected_revision:Q()});ee(P),P&&P.conflict&&await n("worker-queue-set-slots",{slots:w,expected_revision:Q()}).then(ee)}function be(){let u=xe(),w=d?d.selectBoardColumn(Nd,"ready"):[],P=d?d.selectBoardColumn(Pd,"blocked"):[],me=d?d.selectBoardColumn(Fd,"in_progress"):[],Oe=new Map;for(let k of me){let U=Jd(k);if(!U)continue;let le=Oe.get(U);le?le.push(k):Oe.set(U,[k])}let ve=k=>{let U=tr(Oe.get(k)||[]);return U?U.title||U.id:null},Ie=u.bead_titles||{},Be=new Map;for(let[k,U]of Object.entries(Ie))typeof U=="string"&&U.length>0&&Be.set(k,U);for(let k of[...w,...P])Be.set(k.id,k.title||k.id);let Qe=u.bead_times||{},we=new Map;for(let[k,U]of Object.entries(Qe))U&&typeof U=="object"&&we.set(k,U);for(let k of[...w,...P])we.set(k.id,{created_at:k.created_at,updated_at:k.updated_at});let h=k=>we.get(k)||{},F=u.pr_wait||[],N=u.pr_observations||{},K=u.pr_activity||{},Ue=u.cleanup_failed||{},he=Object.entries(Ue).map(([k,U])=>({bead_id:k,step:U&&U.step?U.step:"",reason:U&&U.reason?U.reason:"",detail:U&&typeof U.detail=="string"?U.detail:null,output_tail:U&&typeof U.output_tail=="string"&&U.output_tail?U.output_tail:void 0,log_path:U&&typeof U.log_path=="string"&&U.log_path?U.log_path:void 0})),ge=u.ship_failure||null,at=ge&&typeof ge.reason=="string"&&ge.reason?{bead_id:typeof ge.bead_id=="string"?ge.bead_id:"",reason:ge.reason,detail:typeof ge.detail=="string"?ge.detail:null,pr_url:typeof ge.pr_url=="string"?ge.pr_url:null}:null,qt=u.queue||[],pt=new Set([...qt.map(k=>k.bead_id),...F.map(k=>k.bead_id),...u.done.map(k=>k.bead_id)]),Bt=new Set(P.map(k=>k.id)),jt=a?a.get()?.order||{}:{},m=new Set,v=[];for(let k of[...w,...P])pt.has(k.id)||m.has(k.id)||Qd(k)||(m.add(k.id),v.push(k));b=Xd(v,$,jt);let J=u.admission||{},I=k=>{let U=J[k];if(!U)return"";if(U.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let le=typeof U.reason=="string"?U.reason:"",ze=le.indexOf(":");return ze>0&&ze<le.length-1?`\u26D4 ${le.slice(0,ze)} (${le.slice(ze+1)})`:`\u26D4 ${le}`},p=b.map(k=>{let U=As(k),le=Bt.has(k.id),ze=[];le&&ze.push(eu(k)),U||ze.push("spec \uC5C6\uC74C");let Vn=I(k.id);return Vn&&ze.push(Vn),{id:k.id,title:k.title||k.id,reason:ze.join(" \xB7 "),draggable:U,lane:"candidate",created_at:k.created_at,updated_at:k.updated_at,workflow:k.workflow,status:k.status,blocked:le,has_spec:U}}),C=Ud(p,y),j=C.visible,Ge=u.revise_parked||{},ot=(k,U)=>k.map(le=>{let ze=U==="queue"?Ge[le.bead_id]:null;return{id:le.bead_id,title:Be.get(le.bead_id)||le.bead_id,reason:U==="done"?"":I(le.bead_id),draggable:U!=="done",done:U==="done",lane:U,badges:ze?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!ze,revise_action:!!ze,revise_enabled:!!ze&&!M.has(le.bead_id),revise_title:ze?ze.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${ze.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":"",usage:U==="done"?It(u.attempts||{},le.bead_id):null,done_at:U==="done"&&typeof le.added_at=="number"?le.added_at:void 0,...h(le.bead_id)}}),Ke=new Map;for(let k of u.done)k&&typeof k.bead_id=="string"&&typeof k.added_at=="number"&&Ke.set(k.bead_id,k.added_at);let nt=u.attempts?Object.values(u.attempts):[],vt=new Set;for(let k of nt)k&&typeof k.resumed_from=="string"&&k.resumed_from.length>0&&vt.add(k.resumed_from);let Dt=new Map;for(let k of nt)Dt.set(k.bead_id,k.attempt_id);let on=new Map;for(let k of nt)on.set(k.attempt_id,k);function rt(k){let U=new Set,le=k;for(;le&&!U.has(le.attempt_id);){if(le.conflict_resolution===!0)return!0;U.add(le.attempt_id),le=typeof le.resumed_from=="string"&&le.resumed_from.length>0&&on.get(le.resumed_from)||null}return!1}let an=typeof u.declared_base=="string"?u.declared_base:null;function Gn(k){let U=null;for(let le of nt)!le||le.bead_id!==k||rt(le)||(U===null||(typeof le.started_at=="number"?le.started_at:0)>=(typeof U.started_at=="number"?U.started_at:0))&&(U=le);return U&&typeof U.target_base=="string"?U.target_base:null}let wn=[],Ct=null;for(let k of nt){let U=k.status==="paused"&&!vt.has(k.attempt_id);if(k.status==="running"||U)wn.push({bead_id:k.bead_id,attempt_id:k.attempt_id,title:Be.get(k.bead_id)||k.bead_id,runner:k.runner||null,model:k.model||null,effort:k.effort||null,started_at:typeof k.started_at=="number"?k.started_at:null,resumed_from:k.resumed_from||null,paused:U,conflict_resolution:rt(k),base_exception:si(an,k.target_base),can_pause:typeof k.session_id=="string"&&k.session_id.length>0,usage:It(u.attempts||{},k.bead_id),current_child:ve(k.bead_id),...h(k.bead_id)});else if(k.status==="failed"||k.status==="orphaned"){let le=Dt.get(k.bead_id)!==k.attempt_id,ze=Ke.get(k.bead_id),Vn=typeof ze=="number"&&ze>0&&typeof k.finished_at=="number"&&ze>=k.finished_at;!le&&!Vn&&typeof k.dismissed_at!="number"&&(Ct=k)}}let Is=null;if(Ct){let k=typeof Ct.session_id=="string"&&Ct.session_id.length>0,U=vt.has(Ct.attempt_id),le=Ct.cause_detail;Is={repo:Ct.repo||"",reason:Ct.cause||Ct.status,cause_detail:le&&typeof le.reason=="string"?{reason:le.reason,command:typeof le.command=="string"?le.command:null}:null,resume_attempt_id:Ct.attempt_id,resume_eligible:k&&!U,resume_reason:k?U?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}}let vi=new Set(wn.map(k=>k.bead_id)),$r=Array.isArray(u.merge_queue)?u.merge_queue:[],Ls=new Map;$r.forEach((k,U)=>{k&&typeof k.bead_id=="string"&&Ls.set(k.bead_id,U+1)});let Ds=u.merge_queue_state||{active:null,failures:{}},wi=Ds.failures||{},ki=u.auto_merge_skips||{},Os=k=>{let U=ki[k];if(!U)return null;let le=N[k],ze=le&&le.pr?le.pr.head_sha:null;return ze&&ze===U.head_sha?U.reason||"":null},jn=new Map;for(let k of wn)k.conflict_resolution&&(k.paused?jn.has(k.bead_id)||jn.set(k.bead_id,"paused"):jn.set(k.bead_id,"running"));let Ms=wn.filter(k=>!k.paused).length,Ns=(u.workspace_info||{}).slots,Ps=typeof Ns=="number"?Ns:typeof u.slots=="number"?u.slots:kr,yi=Ms>Ps,Fs=dn(g),$i=(Array.isArray(u.done)?u.done.slice():[]).filter(k=>Fs===void 0||typeof k.added_at!="number"||k.added_at>=Fs).sort((k,U)=>(U.added_at||0)-(k.added_at||0)),qs=ot($i,"done"),Yn={};for(let k of Nt)Yn[k]=0;let Bs=!1,Us=0,xr=0,zs=0;for(let k of qs){let U=k.usage;if(U&&typeof U=="object"){let le=!1;for(let ze of Nt)Number.isFinite(U[ze])&&(Yn[ze]+=U[ze],Bs=!0,le=!0);le&&(xr+=1,Number.isFinite(U.total_cost_usd)&&(Us+=U.total_cost_usd,zs+=1))}}xr>0&&zs===xr&&(Yn.total_cost_usd=Us);let xi=Bs?xt(Yn):null;return{queue:u,idToTitle:Be,candidates:j,candidate_hidden:{blocked:C.hidden_blocked,spec:C.hidden_spec},running:wn,live_count:Ms,slots:Ps,over_cap:yi,failure:Is,waiting:ot(qt.filter(k=>!vi.has(k.bead_id)),"queue"),pr_wait:F.map(k=>ou(k.bead_id,Be.get(k.bead_id)||k.bead_id,N,Ue[k.bead_id]||null,It(u.attempts||{},k.bead_id),K[k.bead_id]||(Y.has(k.bead_id)?{activity:null,merge_progress:{step:"merging"}}:null),jn.get(k.bead_id)||null,k.external===!0,{position:Ls.get(k.bead_id)||0,active:Ds.active===k.bead_id,failure:wi[k.bead_id]||null},k.wt_present!==!1,u.auto_merge===!0?Os(k.bead_id):null,si(an,Gn(k.bead_id)))).map(k=>({...k,...h(k.id)})),merge_queue_length:$r.length,merge_queue_running:$r.length>0,auto_excluded:F.map(k=>k.bead_id).filter(k=>Os(k)!==null),verify_cmd_present:!!(u.workspace_info||{}).verify_cmd,declared_base:an,done:qs,token_total:xi,cleanup_failures:he,ship_failure:at}}function te(u){let w=u.waiting.length>0?u.waiting[0].id:"\u2014",P=c`<button
      type="button"
      class="worker-play${u.queue.auto_advance?" is-active":""}"
    >
      ${u.queue.auto_advance?"\u23F8 \uC77C\uC2DC\uC815\uC9C0":"\u25B6 \uC790\uB3D9 \uC9C4\uD589"}
    </button>`,me=u.queue.auto_advance===!0&&u.queue.auto_merge===!0,Oe=c`<button
      type="button"
      class="worker-auto-all${me?" is-active":""}"
      title=${me?"\uC790\uB3D9 \uC9C4\uD589\uACFC \uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uB055\uB2C8\uB2E4":"\uC790\uB3D9 \uC9C4\uD589\uACFC \uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uCF2D\uB2C8\uB2E4"}
      aria-pressed=${me?"true":"false"}
    >
      ${me?"\u23F9 \uC804\uCCB4 \uC790\uB3D9\uD654":"\u23F5\u23F5 \uC804\uCCB4 \uC790\uB3D9\uD654"}
    </button>`,ve=u.over_cap?c`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",Ie=c`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${u.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${u.pr_wait.length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${R()} 완료 <b>${u.done.length}</b></span
      >`,Be=c`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${u.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${u.declared_base||"?"}</span
    >`,Qe=c`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${kr}
          step="1"
          .value=${String(u.slots)}
          title="동시에 실행할 세션 수 (최소 1 = 순차 실행)"
      /></label>
      <button
        type="button"
        class="worker-exec-defaults-btn"
        aria-haspopup="dialog"
        aria-label="전역 실행 설정"
        title="전역 실행 설정"
      >
        ⚙
      </button>`,we=Oa({failure:u.failure,cleanupFailures:u.cleanup_failures,shipFailure:u.ship_failure});return z?c`<div class="worker-ribbon">
          ${P}
          <div class="worker-kpi worker-kpi--ribbon">${ve}${Ie}</div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${Oe}${Qe}</div>
          <div class="worker-kpi">${Be}</div>
        </div>
        ${we}`:c`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${P}${Oe}${Qe}</div>
        <div class="worker-kpi">
          ${ve}${Ie}${Be}
          ${u.token_total?c`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${`${R()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}
                >${R()} 완료 · 누적 ${u.token_total}</span
              >`:""}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${w}</b></span
          >
        </div>
      </div>
      ${we}`}function Ae(u){if(u.running.length===0&&u.pr_wait.length===0)return"";let w=u.running.some(P=>!P.paused);return c`<section
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
          >${u.running.length+u.pr_wait.length}</span
        >
        ${et(u)}
      </header>
      ${u.running.length>0?gs(u.running,Date.now(),ce):""}
      ${u.pr_wait.map(P=>_s(P))}
    </section>`}function Pe(u){let w=u.candidate_hidden;return c`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${y.show_blocked}
        />
        🔒 blocked${w.blocked>0?` ${w.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${zd.map(P=>c`<button
              type="button"
              class="worker-filter__chip${y.spec===P.value?" is-active":""}"
              data-spec=${P.value}
              aria-pressed=${y.spec===P.value?"true":"false"}
            >
              ${P.label}
            </button>`)}
        ${w.spec>0?c`<span class="worker-filter__hidden">숨김 ${w.spec}</span>`:""}
      </div>
    </div>`}function it(){return c`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${$}
    >
      ${Hd.map(u=>c`<option value=${u.value} ?selected=${$===u.value}>
            ${u.label}
          </option>`)}
    </select>`}function lt(){return c`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${g}
      >
        ${Rt.map(u=>c`<option value=${u.value} ?selected=${g===u.value}>
              ${u.label}
            </option>`)}
      </select>
    </div>`}function et(u){let w=u.queue.auto_merge===!0;if(u.merge_queue_running)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop${w?" is-active":""}"
        title=${w?"\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB044\uACE0 \uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)":"\uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)"}
      >
        ${w?"\u23F8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8":"\uC77C\uAD04 \uBA38\uC9C0 \uC911\uB2E8"} ${u.merge_queue_length}
      </button>`;if(w)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop is-active"
        title="자동 머지 켜짐 — 자격이 생기는 PR을 계속 큐에 넣습니다. 클릭하면 끕니다"
      >
        ⏸ 자동 머지
      </button>`;let P=new Set(u.auto_excluded),me=u.pr_wait.filter(Oe=>Oe.merge_action&&Oe.merge_enabled&&!P.has(Oe.id)).length;return c`<button
      type="button"
      class="worker-merge-all"
      title=${u.verify_cmd_present?"\uCF1C \uB450\uBA74 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uCDA9\uB3CC \uD574\uC18C\xB7\uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uCF1C \uB450\uBA74 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uCDA9\uB3CC \uD574\uC18C\xB7\uBA38\uC9C0\uD569\uB2C8\uB2E4 \u2014 \uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uB294 \uAC80\uC99D \uC2E0\uD638\uAC00 \uC5C6\uC5B4 CI\xB7\uB85C\uCEEC\uAC80\uC99D \uC5C6\uC774 \uBA38\uC9C0\uB429\uB2C8\uB2E4"}
    >
      ▶ 자동 머지${me>0?` ${me}`:""}
    </button>`}function Ye(u){let w=Lt({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:u.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:it(),controls:Pe(u)});return z?c`<div class="worker-lanes worker-lanes--mobile">
        ${Ae(u)}
        ${Lt({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:u.waiting,empty:"\uB4DC\uB798\uADF8 \uB610\uB294 [\uB300\uAE30\uB85C \u21B4]\uB85C \uBC30\uCE58",collapsible:!0,collapsed:H.queue,preview:ni(u.waiting)})}
        ${w}
        ${Lt({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:u.done,empty:`${R()} \uC644\uB8CC \uC5C6\uC74C`,controls:lt(),collapsible:!0,collapsed:H.done,preview:u.token_total||ni(u.done)})}
      </div>`:c`<div class="worker-lanes">
      ${w}
      ${Lt({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:u.waiting,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58"})}
      ${Lt({id:"worker-pane-running",lane:"running",title:`\uC2E4\uD589 \uC911 \xB7 \uC2AC\uB86F ${u.slots}`,items:u.running,live:u.running.some(P=>!P.paused),body:gs(u.running,Date.now(),ce)})}
      ${Lt({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:u.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C",header_control:et(u)})}
      ${Lt({id:"worker-pane-done",lane:"done",title:`\uC644\uB8CC \xB7 ${R()} ${u.done.length}`,items:u.done,empty:`${R()} \uC644\uB8CC \uC5C6\uC74C`,controls:lt()})}
    </div>`}function ct(u){H={...H,[u]:!H[u]},Zd(H),Te()}function Te(){let u=be();Le(te(u),L),Le(Ye(u),Z)}function tt(){let u=document.querySelector(".app-header");if(!u)return;let w=()=>{let P=Math.round(u.getBoundingClientRect().height);S.style.setProperty("--worker-ribbon-top",`${P}px`)};if(w(),typeof ResizeObserver=="function"){let P=new ResizeObserver(w);P.observe(u),E.push(()=>P.disconnect())}else window.addEventListener("resize",w),E.push(()=>window.removeEventListener("resize",w))}function D(){if(typeof window.matchMedia!="function")return;let u=window.matchMedia(Vd);z=!!u.matches;let w=P=>{let me=!!(P&&typeof P.matches=="boolean"?P.matches:u.matches);me!==z&&(z=me,Te())};typeof u.addEventListener=="function"?(u.addEventListener("change",w),E.push(()=>u.removeEventListener("change",w))):typeof u.addListener=="function"&&(u.addListener(w),E.push(()=>u.removeListener(w)))}function B(u){let w=u.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!w)return;let P=w.dataset.beadId||"",me=w.dataset.lane||"";_={bead_id:P,from_lane:me};try{u.dataTransfer?.setData("text/plain",P),u.dataTransfer&&(u.dataTransfer.effectAllowed="move")}catch{}}function oe(u){let w=u.target?.closest?.(".worker-pane");if(!w)return;let P=w.dataset.lane||"";P!=="candidate"&&P!=="queue"||(u.preventDefault(),u.dataTransfer&&(u.dataTransfer.dropEffect="move"),w.classList.add("worker-pane--drag-over"))}function re(u){u.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function ae(u,w){let P=b.find(Ie=>Ie.id===u);if(!P)return;let me=b.filter(Ie=>Ie.id!==u),Oe=me.length;if(w){let Ie=w.dataset.beadId;if(Ie===u)return;let Be=me.findIndex(Qe=>Qe.id===Ie);Be>=0&&(Oe=Be)}let ve=me.slice();ve.splice(Oe,0,P),f.applyReorder(u,ve,Oe)}function ke(u){let w=u.target?.closest?.(".worker-pane");if(!w)return;u.preventDefault(),w.classList.remove("worker-pane--drag-over");let P=w.dataset.lane||"",me=_?.bead_id||u.dataTransfer?.getData("text/plain")||"",Oe=_?.from_lane||"";if(_=null,!me)return;let ve=u.target?.closest?.(".worker-mini, .worker-card"),Ie=Array.from(w.querySelectorAll(".worker-mini, .worker-card")),Be=Ie.length;if(ve){let Qe=Ie.indexOf(ve);Qe>=0&&(Be=Qe)}if(w.classList.contains("worker-pane--collapsed")&&(Be=A()),P==="candidate"){if(Oe==="candidate"){ae(me,ve);return}Oe==="queue"&&ne(me);return}P==="queue"&&(Oe==="queue"?X(me,Be):T(me,Be))}function $e(u){y=u,Bd(u),Te()}function Ee(u){$=u==="board"||u==="created"||u==="spec"?u:yr,Gd($),Te()}function Fe(u){g=Mt(u)?u:kt,Yd(g),Te()}function Se(u){let w=u.target?.closest?.(".worker-filter__blocked");if(w){$e({...y,show_blocked:w.checked});return}let P=u.target?.closest?.(".worker-done-range");if(P){Fe(P.value);return}let me=u.target?.closest?.(".worker-sort");if(me){Ee(me.value||yr);return}let Oe=u.target?.closest?.(".worker-slots__input");if(!Oe)return;let ve=Number.parseInt(Oe.value,10);if(!Number.isFinite(ve)){Te();return}pe(ve).then(Te)}function je(u){return u?{runner:u.runner||void 0,model:u.model||void 0,effort:u.effort||void 0,worktree:u.worktree||void 0,status:u.status||void 0,session_id:u.session_id||void 0}:{}}function ue(u){let w=xe(),P=w.attempts?w.attempts[u]:null;ce=u,x.hidden=!1,Ne.open({attempt_id:u,meta:je(P)}),Te()}function ut(){if(!ce)return;let u=xe(),w=u.attempts?u.attempts[ce]:null;if(w){Ne.updateMeta(je(w));return}Ne.close()}function gt(u){let w=u.target;if(w?.closest?.("#worker-exec-defaults-dialog"))return;if(w?.closest?.(".worker-exec-defaults-btn")){Ze.open();return}let P=w?.closest?.(".worker-banner__resume");if(P){let he=P.dataset.attemptId;he&&De(he);return}let me=w?.closest?.(".worker-banner__dismiss");if(me){let he=me.dataset.attemptId;he&&_e(he);return}if(w?.closest?.(".worker-play")){O(!xe().auto_advance);return}if(w?.closest?.(".worker-auto-all")){let he=xe();se(!(he.auto_advance===!0&&he.auto_merge===!0));return}let Oe=w?.closest?.(".worker-merge-all");if(Oe){Oe.classList.contains("worker-merge-all--stop")?xe().auto_merge===!0?qe(!1):st():qe(!0);return}let ve=w?.closest?.(".worker-pane__hd--toggle");if(ve){let he=ve.dataset.lane;(he==="queue"||he==="done")&&ct(he);return}let Ie=w?.closest?.(".worker-card__place");if(Ie){let he=Ie.dataset.beadId;he&&!Ie.disabled&&T(he,A());return}let Be=w?.closest?.(".worker-filter__chip");if(Be){let he=Be.dataset.spec;(he==="all"||he==="with"||he==="without")&&$e({...y,spec:he});return}let Qe=w?.closest?.(".worker-mini__merge");if(Qe){We(Qe.dataset.beadId||"");return}let we=w?.closest?.(".worker-mini__merge-cancel");if(we){Xe(we.dataset.beadId||"");return}let h=w?.closest?.(".worker-mini__discard");if(h){q(h.dataset.beadId||"");return}let F=w?.closest?.(".worker-mini__revise-fix");if(F){W("worker-revise-fix",F.dataset.beadId||"");return}let N=w?.closest?.(".worker-mini__revise-approve");if(N){W("worker-revise-approve",N.dataset.beadId||"");return}if(w?.closest?.(".worker-mini__pr"))return;if(w?.closest?.(".rtile__stop")){let ge=w?.closest?.(".rtile")?.dataset?.attemptId;ge&&de(ge);return}if(w?.closest?.(".rtile__pause")){let ge=w?.closest?.(".rtile")?.dataset?.attemptId;ge&&fe(ge);return}if(w?.closest?.(".rtile__resume")){let ge=w?.closest?.(".rtile")?.dataset?.attemptId;ge&&De(ge);return}if(w?.closest?.(".rtile__session")){let ge=w?.closest?.(".rtile")?.dataset?.attemptId;ge&&ue(ge);return}if(w?.closest?.(".worker-drawer-overlay__backdrop")){Ne.close();return}if(w?.closest?.(".worker-drawer-host"))return;let K=w?.closest?.(".rtile");if(K){if(w?.closest?.(".rtile__id")){let ge=K.dataset.beadId;ge&&tn(ge).then(at=>{at?ie("\uBCF5\uC0AC\uB428","success",1200):ie("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let he=K.dataset.beadId;he&&l&&l(he);return}let Ue=w?.closest?.(".worker-mini, .worker-card");if(Ue){let he=Ue.dataset.beadId;if(w?.closest?.(".worker-mini__id, .worker-card__id")){he&&tn(he).then(ge=>{ge?ie("\uBCF5\uC0AC\uB428","success",1200):ie("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}he&&l&&l(he)}}return e.addEventListener("dragstart",B),e.addEventListener("dragover",oe),e.addEventListener("dragleave",re),e.addEventListener("drop",ke),e.addEventListener("click",gt),e.addEventListener("change",Se),D(),tt(),d&&E.push(d.subscribe(Te)),s&&E.push(s.subscribe(()=>{Te(),ut()})),Te(),{load(){Te()},destroy(){for(let u of E.splice(0))try{u()}catch{}e.removeEventListener("dragstart",B),e.removeEventListener("dragover",oe),e.removeEventListener("dragleave",re),e.removeEventListener("drop",ke),e.removeEventListener("click",gt),e.removeEventListener("change",Se);try{Ne.destroy()}catch{}x.hidden=!0;try{Ze.destroy()}catch{}Le(c``,e)}}}function Es(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function ci(e,t,n,r=async()=>{},s=async()=>{}){let o=Ve("views:workspace-picker"),a=null,l=!1,i=!1,d=!1;async function f(S){let x=S.target.value,V=t.getState().workspace?.current?.path||"";if(x&&x!==V){o("switching workspace to %s",x),l=!0,E();try{await n(x)}catch(Z){o("workspace switch failed: %o",Z)}finally{l=!1,E()}}}async function _(){let S=t.getState(),L=S.workspace?.current?.path||S.workspace?.available?.[0]?.path||"";if(!(!L||i)){o("git-pulling workspace %s",L),i=!0,E();try{await r(L)}catch(x){o("workspace git pull failed: %o",x)}finally{i=!1,E()}}}function b(S){let L=S.target;L&&e.contains(L)||g()}function y(S){S.key==="Escape"&&g()}function $(){d||(d=!0,document.addEventListener("mousedown",b),document.addEventListener("keydown",y),E())}function g(){d&&(d=!1,document.removeEventListener("mousedown",b),document.removeEventListener("keydown",y),E())}function R(){d?g():$()}async function H(S){let L=S.target,x=L.value,G=L.checked;o("toggling visibility %s \u2192 %s",x,String(G));try{await s(x,G)}catch(V){o("workspace visibility toggle failed: %o",V)}}function z(S){return S?c`
      <button
        type="button"
        class="workspace-picker__git-pull-button"
        @click=${_}
        ?disabled=${l||i}
        aria-label="Git Pull"
        title="Git Pull"
      >
        <span aria-hidden="true">⬇</span>
      </button>
    `:c``}function Y(S,L){return c`
      <div class="workspace-picker__manage">
        <button
          type="button"
          class="workspace-picker__manage-button"
          @click=${R}
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
                ${S.map(x=>c`
                    <label
                      class="workspace-picker__manage-row"
                      title="${x.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${x.path}"
                        .checked=${!L.has(x.path)}
                        @change=${H}
                      />
                      <span class="workspace-picker__manage-name"
                        >${Es(x.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function M(){let S=t.getState(),L=S.workspace?.current,x=S.workspace?.available||[],G=new Set(S.workspace?.hidden||[]),V=L?.path||x[0]?.path||"";if(x.length===0)return c``;let Z=x.filter(ce=>!G.has(ce.path)||ce.path===V);if(Z.length<=1){let ce=Z[0]||x[0],Ne=Es(ce.path);return c`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${ce.path}"
            >${Ne}</span
          >
          ${Y(x,G)}
          ${z(V)}
          ${i?c`<span
                class="workspace-picker__loading"
                aria-hidden="true"
              ></span>`:""}
        </div>
      `}return c`
      <div class="workspace-picker">
        <select
          class="workspace-picker__select"
          @change=${f}
          ?disabled=${l||i}
          aria-label="Select project workspace"
        >
          ${Z.map(ce=>c`
              <option
                value="${ce.path}"
                ?selected=${ce.path===V}
                title="${ce.path}"
              >
                ${Es(ce.path)}
              </option>
            `)}
        </select>
        ${Y(x,G)}
        ${z(V)}
        ${l||i?c`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function E(){Le(M(),e)}return E(),a=t.subscribe(()=>E()),{destroy(){a&&(a(),a=null),document.removeEventListener("mousedown",b),document.removeEventListener("keydown",y),Le(c``,e)}}}var di=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-queue-set-slots","worker-queue-set-exec-default","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","monitor-auto-toggle"];function Cs(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function ui(e,t,n=Cs()){return{id:n,type:e,payload:t}}function pi(e={}){let t=Ve("ws"),n={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},r=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",a=0,l=null,i=!0,d=new Map,f=[],_=new Map,b=new Set;function y(M){for(let E of Array.from(b))try{E(M)}catch{}}function $(){if(!i||l)return;o="reconnecting",t("ws reconnecting\u2026"),y(o);let M=Math.min(n.maxMs||0,(n.initialMs||0)*Math.pow(n.factor||1,a)),E=(n.jitterRatio||0)*M,S=Math.max(0,Math.round(M+(Math.random()*2-1)*E));t("ws retry in %d ms (attempt %d)",S,a+1),l=setTimeout(()=>{l=null,Y()},S)}function g(M){try{s?.send(JSON.stringify(M))}catch(E){t("ws send failed",E)}}function R(){for(o="open",t("ws open"),y(o),a=0;f.length;){let M=f.shift();M&&g(M)}}function H(M){let E;try{E=JSON.parse(String(M.data))}catch{t("ws received non-JSON message");return}if(!E||typeof E.id!="string"||typeof E.type!="string"){t("ws received invalid envelope");return}if(d.has(E.id)){let L=d.get(E.id);d.delete(E.id),E.ok?L?.resolve(E.payload):L?.reject(E.error||new Error("ws error"));return}let S=_.get(E.type);if(S&&S.size>0)for(let L of Array.from(S))try{L(E.payload)}catch(x){t("ws event handler error",x)}else t("ws received unhandled message type: %s",E.type)}function z(){o="closed",t("ws closed"),y(o);for(let[M,E]of d.entries())E.reject(new Error("ws disconnected")),d.delete(M);a+=1,$()}function Y(){if(!i)return;let M=r();try{s=new WebSocket(M),t("ws connecting %s",M),o="connecting",y(o),s.addEventListener("open",R),s.addEventListener("message",H),s.addEventListener("error",()=>{}),s.addEventListener("close",z)}catch(E){t("ws connect failed %o",E),$()}}return Y(),{send(M,E){if(!di.includes(M))return Promise.reject(new Error(`unknown message type: ${M}`));let S=Cs(),L=ui(M,E,S);return t("send %s id=%s",M,S),new Promise((x,G)=>{d.set(S,{resolve:x,reject:G,type:M}),s&&s.readyState===s.OPEN?g(L):(t("queue %s id=%s (state=%s)",M,S,o),f.push(L))})},on(M,E){_.has(M)||_.set(M,new Set);let S=_.get(M);return S?.add(E),()=>{S?.delete(E)}},onConnection(M){return b.add(M),()=>{b.delete(M)}},reconnect(){i=!0,l&&(clearTimeout(l),l=null),a=0,Y()},close(){i=!1,l&&(clearTimeout(l),l=null);try{s?.close()}catch{}},getState(){return o}}}function au(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function iu(e,t){try{let r=await(await fetch("/api/config")).json();e.setState({config:r})}catch(n){t("config refresh failed",n)}}var Rs=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],fi=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"]],_i=Ka,hi="worker:queue",mi="ui:order",gi="ui:display-policy",Gt="tab:board:closed",bi="beads-ui.board.closed-range";function lu(e){let t=Ve("main");t("bootstrap start");let n=c`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;Le(n,e);let r=document.getElementById("top-nav"),s=document.getElementById("board-root"),o=document.getElementById("worker-root"),a=document.getElementById("monitor-root"),l=document.getElementById("detail-panel");if(s&&o&&a&&l){let xe=function(m,v){let J="Request failed",I="";if(m&&typeof m=="object"){let C=m;if(typeof C.message=="string"&&C.message.length>0&&(J=C.message),typeof C.details=="string")I=C.details;else if(C.details&&typeof C.details=="object")try{I=JSON.stringify(C.details,null,2)}catch{I=""}}else typeof m=="string"&&m.length>0&&(J=m);let p=v&&v.length>0?`Failed to load ${v}`:"Request failed";Ze.open(p,J,I)},O=function(m){return`${h.getState().workspace.current?.path||""}\0${m}`},se=function(){_e&&(_e().catch(()=>{}),_e=null),Re=null,We=null},be=function(m){qe=m;let v=()=>{qe!==m||h.getState().selected_id!==m||(qe=null,pe(m))};if(!q){st.then(v);return}v()},it=function(m,v,J,I,p){return J!==Pe[v]?(p().catch(()=>{}),!1):(m.set(I,p),!0)},lt=function(){let m=h.getState().view;ct(m==="board"),oe(m==="worker"),Ee(m==="monitor"),ae(m==="worker")},Ye=function(){let m=dn(et);return m===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:m}}},ct=function(m){if(m)for(let[v,J]of Rs){if(te.has(v)||Ae.has(v))continue;let I=v===Gt?Ye():{type:J};try{T.register(v,I)}catch(j){t("register %s store failed: %o",v,j)}Ae.add(v);let p=Pe.board,C=!1;A.subscribeList(v,I).then(j=>{C=!it(te,"board",p,v,j)}).catch(j=>{t("subscribe %s failed: %o",v,j),xe(j,"board")}).finally(()=>{Ae.delete(v),C&&lt()})}else tt()},tt=function(){Pe.board+=1;for(let[m]of Rs){let v=te.get(m);v&&(v().catch(()=>{}),te.delete(m));try{T.unregister(m)}catch(J){t("unregister %s failed: %o",m,J)}}},oe=function(m){if(!m){re();return}for(let[v,J]of fi){if(D.has(v)||Ae.has(v))continue;try{T.register(v,{type:J})}catch(C){t("register %s store failed: %o",v,C)}Ae.add(v);let I=Pe.worker,p=!1;A.subscribeList(v,{type:J}).then(C=>{p=!it(D,"worker",I,v,C)}).catch(C=>{t("subscribe %s failed: %o",v,C),xe(C,"worker")}).finally(()=>{Ae.delete(v),p&&lt()})}},re=function(){Pe.worker+=1;for(let[m]of fi){let v=D.get(m);v&&(v().catch(()=>{}),D.delete(m));try{T.unregister(m)}catch(J){t("unregister %s failed: %o",m,J)}}},ae=function(m){if(!m){ke();return}B||(ee("subscribe-worker-queue",{id:hi}).catch(v=>{t("subscribe-worker-queue failed: %o",v)}),B=()=>ee("unsubscribe-worker-queue",{id:hi}))},ke=function(){B&&(B().catch(()=>{}),B=null)},Ee=function(m){if(!m){Fe();return}$e||(ee("subscribe-monitor-pipeline",{id:_i}).catch(v=>{t("subscribe-monitor-pipeline failed: %o",v)}),$e=()=>ee("unsubscribe-monitor-pipeline",{id:_i}))},Fe=function(){$e&&($e().catch(()=>{}),$e=null)},je=function(){Se||(ee("subscribe-ui-order",{id:mi}).catch(m=>{t("subscribe-ui-order failed: %o",m)}),Se=()=>ee("unsubscribe-ui-order",{id:mi}))},ue=function(){Se&&(Se().catch(()=>{}),Se=null),de.clear()},gt=function(){ut||(ee("subscribe-display-policy",{id:gi}).catch(m=>{t("subscribe-display-policy failed: %o",m)}),ut=()=>ee("unsubscribe-display-policy",{id:gi}))},u=function(){ut&&(ut().catch(()=>{}),ut=null),fe.clear()},Ie=function(m){if(!m)return"Unknown";let v=m.split("/").filter(Boolean);return v.length>0?v[v.length-1]:"Unknown"};var i=xe,d=O,f=se,_=be,b=it,y=lt,$=Ye,g=ct,R=tt,H=oe,z=re,Y=ae,M=ke,E=Ee,S=Fe,L=je,x=ue,G=gt,V=u,Z=Ie;let ce=document.getElementById("header-loading"),Ne=$o(ce),Ze=Ca(e),Q=pi(),ee=Ne.wrapSend((m,v)=>Q.send(m,v)),A=mo(ee),T=go(),X=vo(),ne=eo(),de=bo(),fe=Js(),De=to();Q.on("monitor-pipeline-snapshot",m=>{let v=m;if(!(!v||!Array.isArray(v.workspaces)))try{ne.set(v.workspaces,v.workspaces_state)}catch{}}),Q.on("ui-order-snapshot",m=>{let v=m;if(v&&typeof v.revision=="number")try{de.set({revision:v.revision,order:v.order&&typeof v.order=="object"?v.order:{}})}catch{}}),Q.on("display-policy-snapshot",m=>{let v=m;if(v&&v.policy&&typeof v.policy=="object")try{fe.set(v.policy)}catch{}}),Q.on("session-log-snapshot",m=>{let v=m;if(v&&typeof v.attempt_id=="string")try{De.set(v.attempt_id,Array.isArray(v.lines)?v.lines:[],typeof v.last_event_at=="number"?v.last_event_at:null)}catch{}}),Q.on("session-log-append",m=>{let v=m;if(v&&typeof v.attempt_id=="string")try{De.append(v.attempt_id,v.event)}catch{}}),Q.on("snapshot",m=>{let v=m,J=v&&typeof v.id=="string"?v.id:"",I=J?T.getStore(J):null;if(I&&v&&v.type==="snapshot")try{I.applyPush(v)}catch{}}),Q.on("upsert",m=>{let v=m,J=v&&typeof v.id=="string"?v.id:"",I=J?T.getStore(J):null;if(I&&v&&v.type==="upsert")try{I.applyPush(v)}catch{}}),Q.on("delete",m=>{let v=m,J=v&&typeof v.id=="string"?v.id:"",I=J?T.getStore(J):null;if(I&&v&&v.type==="delete")try{I.applyPush(v)}catch{}});let _e=null,Re=null,We=null,qe=null,Xe=()=>{},st=new Promise(m=>{Xe=()=>m(void 0)}),q=!1,W=!1;async function pe(m){let v=O(m);if(v===Re||v===We)return;We=v;let J=`detail:${m}`,I={type:"issue-detail",params:{id:m}};try{T.register(J,I)}catch(p){t("register detail store failed: %o",p)}try{let p=await A.subscribeList(J,I);if(h.getState().selected_id!==m||O(m)!==v){await p().catch(()=>{});return}_e&&await _e().catch(()=>{}),_e=p,Re=v}catch(p){t("detail subscribe failed: %o",p),xe(p,"issue details")}finally{We===v&&(We=null)}}let te=new Map,Ae=new Set,Pe={board:0,worker:0},et=kt;try{let m=window.localStorage.getItem(bi);Mt(m)&&(et=m)}catch{}async function Te(m){if(!Mt(m)||m===et)return;et=m;try{window.localStorage.setItem(bi,m)}catch{}let v=te.get(Gt);if(!v)return;te.delete(Gt),await v().catch(()=>{});let J=Ye();try{T.register(Gt,J)}catch(I){t("register %s store failed: %o",Gt,I)}try{let I=await A.subscribeList(Gt,J);te.set(Gt,I)}catch(I){t("re-subscribe %s failed: %o",Gt,I),xe(I,"board")}}let D=new Map,B=null,$e=null,Se=null,ut=null;async function w(){ut=null,fe.clear(),B=null,$e=null,te.clear(),D.clear(),Pe.board+=1,Pe.worker+=1;let m=h.getState().workspace.current?.path;if(m)try{await Q.send("set-workspace",{path:m})}catch(J){t("workspace restore after reconnect failed: %o",J);return}gt();let v=h.getState().view;ct(v==="board"),oe(v==="worker"),Ee(v==="monitor"),ae(v==="worker")}async function P(){t("clearing all subscriptions for workspace switch"),tt(),re(),ke(),X.clear(),ue(),je(),u(),gt(),se();let m=h.getState();if(m.selected_id)try{T.unregister(`detail:${m.selected_id}`)}catch{}let v=h.getState();ct(v.view==="board"),oe(v.view==="worker"),Ee(v.view==="monitor"),ae(v.view==="worker"),v.selected_id&&be(v.selected_id)}async function me(m){t("requesting workspace switch to %s",m),W=!0;try{let v=await Q.send("set-workspace",{path:m});t("workspace switch result: %o",v),v&&v.workspace&&(h.setState({workspace:{current:{path:v.workspace.root_dir,database:v.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",m),v.changed&&(await P(),ie("Switched to "+Ie(m),"success",2e3)))}catch(v){throw t("workspace switch failed: %o",v),ie("Failed to switch workspace","error",3e3),v}finally{W=!1}}async function Oe(m){t("requesting workspace git pull for %s",m);try{let v=await Q.send("git-pull-workspace",{});t("workspace git pull result: %o",v);let J=v?.status;if(J==="up_to_date"){ie("Already up to date","success",2e3);return}if(J==="stash_pop_conflict"){ie("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}ie("Git pulled "+Ie(m),"success",2e3)}catch(v){t("workspace git pull failed: %o",v);let J=v?.code,I=v?.message;if(J==="rebase_conflict"){ie("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(J==="rebase_conflict_abort_failed"){ie("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(J==="busy"){ie("Git pull skipped: another operation is running","warning",3e3);return}let p=I?`: ${I}`:"";throw ie(`Git pull failed${p}`,"error",3e3),v}}async function ve(m,v){t("setting workspace visibility %s \u2192 %s",m,String(v));try{await Q.send("set-workspace-visibility",{path:m,visible:v}),await Be()}catch(J){t("workspace visibility update failed: %o",J),ie("Failed to update project visibility","error",3e3)}}async function Be(){try{let m=await Q.send("list-workspaces",{});if(t("workspaces loaded: %o",m),m&&Array.isArray(m.workspaces)){let v=m.workspaces.map(C=>({path:C.path,database:C.database,pid:C.pid,version:C.version})),J=m.current?{path:m.current.root_dir,database:m.current.db_path}:null,I=Array.isArray(m.hidden)?m.hidden.filter(C=>typeof C=="string"):[];h.setState({workspace:{current:J,available:v,hidden:I}});let p=window.localStorage.getItem("beads-ui.workspace");p&&(!v.some(j=>j.path===p)||I.includes(p)?window.localStorage.removeItem("beads-ui.workspace"):J&&p!==J.path&&(t("restoring saved workspace preference: %s",p),await me(p)))}}catch(m){t("failed to load workspaces: %o",m)}}Q.on("workspace-changed",m=>{t("workspace-changed event: %o",m),m&&m.root_dir&&(h.setState({workspace:{current:{path:m.root_dir,database:m.db_path}}}),Be(),P())});let Qe=!1;if(typeof Q.onConnection=="function"){let m=v=>{t("ws state %s",v),v==="reconnecting"||v==="closed"?(Qe=!0,ie("Connection lost. Reconnecting\u2026","error",4e3)):v==="open"&&Qe&&(Qe=!1,ie("Reconnected","success",2200),iu(h,(J,I)=>{t(`${J}: %o`,I)}),w())};Q.onConnection(m)}let we="board";try{let m=window.localStorage.getItem("beads-ui.view");(m==="board"||m==="worker"||m==="monitor")&&(we=m)}catch(m){t("view parse error: %o",m)}let h=yo({config:au(),view:we});Q.on("worker-queue-snapshot",m=>{let v=m;if(!v||!v.queue)return;let J=h.getState().workspace.current?.path;if(typeof J=="string"&&J.length>0&&v.root_dir!==J){t("dropping worker-queue snapshot for %s",String(v.root_dir));return}try{X.set(v.queue)}catch{}});let F=wo(h);F.start();let N=async(m,v)=>{try{return await ee(m,v)}catch{return[]}};r&&Xa(r,h,F);let K=document.getElementById("workspace-picker");K&&ci(K,h,me,Oe,ve);let Ue=ti(e,(m,v)=>ee(m,v));try{let m=document.getElementById("new-issue-btn");m&&m.addEventListener("click",()=>Ue.open())}catch{}let he=Ea(e,{policyStore:fe,transport:(m,v)=>ee(m,v),labelOptions:()=>{let m=new Set;for(let[v]of Rs)for(let J of T.snapshotFor(v)||[]){let I=J.labels;if(Array.isArray(I))for(let p of I)typeof p=="string"&&p.length>0&&m.add(p)}return Array.from(m).sort()}});try{let m=document.getElementById("display-settings-btn");m&&m.addEventListener("click",()=>he.open())}catch{}let ge=Io(s,{gotoIssue:m=>F.gotoIssue(m),issueStores:T,transport:N,uiOrderStore:de,displayPolicyStore:fe,closedRange:et,onClosedRangeChange:m=>{Te(m)},onNewIssue:()=>Ue.open()}),at=Ts(o,{transport:N,issueStores:T,queueStore:X,sessionLogStore:De,uiOrderStore:de,gotoIssue:m=>h.setState({selected_id:m}),getWorkspacePath:()=>h.getState().workspace.current?.path}),qt=Za(a,{transport:N,pipelineStore:ne,gotoIssue:m=>F.gotoIssue(m),getWorkspacePath:()=>h.getState().workspace.current?.path,switchWorkspace:m=>me(m)}),pt=Aa(l,{issueStores:T,transport:N,queueStore:X,sessionLogStore:De,getWorkspacePath:()=>h.getState().workspace.current?.path,onNavigate:m=>{h.getState().view==="worker"?h.setState({selected_id:m}):F.gotoIssue(m)},onClose:()=>{let m=h.getState();h.setState({selected_id:null});try{F.gotoView(m.view==="worker"||m.view==="monitor"?m.view:"board")}catch{}}}),Bt=h.getState().selected_id;Bt&&(l.hidden=!1,pt.load(Bt),be(Bt)),h.subscribe(m=>{let v=m.selected_id;v?(l.hidden=!1,pt.load(v),W||be(v)):(pt.clear(),l.hidden=!0,se())});let jt=m=>{s.hidden=m.view!=="board",o.hidden=m.view!=="worker",a.hidden=m.view!=="monitor",ct(m.view==="board"),oe(m.view==="worker"),Ee(m.view==="monitor"),ae(m.view==="worker"),!m.selected_id&&m.view==="board"&&ge.load(),m.view==="worker"&&at.load(),m.view==="monitor"?qt.load():qt.pause(),window.localStorage.setItem("beads-ui.view",m.view)};h.subscribe(jt),jt(h.getState()),je(),gt(),Be().finally(()=>{q=!0,Xe()}),window.addEventListener("keydown",m=>{let v=m.ctrlKey||m.metaKey,J=String(m.key||"").toLowerCase(),I=m.target,p=I&&I.tagName?String(I.tagName).toLowerCase():"",C=p==="input"||p==="textarea"||p==="select"||I&&typeof I.isContentEditable=="boolean"&&I.isContentEditable;v&&J==="n"&&(C||(m.preventDefault(),Ue.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let n=window.localStorage.getItem("beads-ui.theme"),r=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=n==="dark"||n==="light"?n:r?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let n=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",n),window.localStorage.setItem("beads-ui.theme",n)});let t=document.getElementById("app");t&&lu(t)});export{lu as bootstrap,au as readBootstrapConfig,iu as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
