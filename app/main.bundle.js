var il=Object.create;var zr=Object.defineProperty;var al=Object.getOwnPropertyDescriptor;var ll=Object.getOwnPropertyNames;var cl=Object.getPrototypeOf,dl=Object.prototype.hasOwnProperty;var ul=(e,t,n)=>t in e?zr(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var Hr=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var pl=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of ll(t))!dl.call(e,s)&&s!==n&&zr(e,s,{get:()=>t[s],enumerable:!(r=al(t,s))||r.enumerable});return e};var fl=(e,t,n)=>(n=e!=null?il(cl(e)):{},pl(t||!e||!e.__esModule?zr(n,"default",{value:e,enumerable:!0}):n,e));var ze=(e,t,n)=>ul(e,typeof t!="symbol"?t+"":t,n);var ko=Hr((fp,wo)=>{var yn=1e3,wn=yn*60,kn=wn*60,cn=kn*24,bl=cn*7,vl=cn*365.25;wo.exports=function(e,t){t=t||{};var n=typeof e;if(n==="string"&&e.length>0)return yl(e);if(n==="number"&&isFinite(e))return t.long?kl(e):wl(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function yl(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var n=parseFloat(t[1]),r=(t[2]||"ms").toLowerCase();switch(r){case"years":case"year":case"yrs":case"yr":case"y":return n*vl;case"weeks":case"week":case"w":return n*bl;case"days":case"day":case"d":return n*cn;case"hours":case"hour":case"hrs":case"hr":case"h":return n*kn;case"minutes":case"minute":case"mins":case"min":case"m":return n*wn;case"seconds":case"second":case"secs":case"sec":case"s":return n*yn;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return n;default:return}}}}function wl(e){var t=Math.abs(e);return t>=cn?Math.round(e/cn)+"d":t>=kn?Math.round(e/kn)+"h":t>=wn?Math.round(e/wn)+"m":t>=yn?Math.round(e/yn)+"s":e+"ms"}function kl(e){var t=Math.abs(e);return t>=cn?ar(e,t,cn,"day"):t>=kn?ar(e,t,kn,"hour"):t>=wn?ar(e,t,wn,"minute"):t>=yn?ar(e,t,yn,"second"):e+" ms"}function ar(e,t,n,r){var s=t>=n*1.5;return Math.round(e/n)+" "+r+(s?"s":"")}});var xo=Hr((_p,$o)=>{function $l(e){n.debug=n,n.default=n,n.coerce=a,n.disable=i,n.enable=s,n.enabled=l,n.humanize=ko(),n.destroy=d,Object.keys(e).forEach(p=>{n[p]=e[p]}),n.names=[],n.skips=[],n.formatters={};function t(p){let _=0;for(let v=0;v<p.length;v++)_=(_<<5)-_+p.charCodeAt(v),_|=0;return n.colors[Math.abs(_)%n.colors.length]}n.selectColor=t;function n(p){let _,v=null,T,k;function h(...A){if(!h.enabled)return;let V=h,K=Number(new Date),ne=K-(_||K);V.diff=ne,V.prev=_,V.curr=K,_=K,A[0]=n.coerce(A[0]),typeof A[0]!="string"&&A.unshift("%O");let q=0;A[0]=A[0].replace(/%([a-zA-Z%])/g,(S,R)=>{if(S==="%%")return"%";q++;let H=n.formatters[R];if(typeof H=="function"){let pe=A[q];S=H.call(V,pe),A.splice(q,1),q--}return S}),n.formatArgs.call(V,A),(V.log||n.log).apply(V,A)}return h.namespace=p,h.useColors=n.useColors(),h.color=n.selectColor(p),h.extend=r,h.destroy=n.destroy,Object.defineProperty(h,"enabled",{enumerable:!0,configurable:!1,get:()=>v!==null?v:(T!==n.namespaces&&(T=n.namespaces,k=n.enabled(p)),k),set:A=>{v=A}}),typeof n.init=="function"&&n.init(h),h}function r(p,_){let v=n(this.namespace+(typeof _>"u"?":":_)+p);return v.log=this.log,v}function s(p){n.save(p),n.namespaces=p,n.names=[],n.skips=[];let _=(typeof p=="string"?p:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let v of _)v[0]==="-"?n.skips.push(v.slice(1)):n.names.push(v)}function o(p,_){let v=0,T=0,k=-1,h=0;for(;v<p.length;)if(T<_.length&&(_[T]===p[v]||_[T]==="*"))_[T]==="*"?(k=T,h=v,T++):(v++,T++);else if(k!==-1)T=k+1,h++,v=h;else return!1;for(;T<_.length&&_[T]==="*";)T++;return T===_.length}function i(){let p=[...n.names,...n.skips.map(_=>"-"+_)].join(",");return n.enable(""),p}function l(p){for(let _ of n.skips)if(o(p,_))return!1;for(let _ of n.names)if(o(p,_))return!0;return!1}function a(p){return p instanceof Error?p.stack||p.message:p}function d(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return n.enable(n.load()),n}$o.exports=$l});var So=Hr((xt,lr)=>{xt.formatArgs=Sl;xt.save=Al;xt.load=Tl;xt.useColors=xl;xt.storage=El();xt.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();xt.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function xl(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function Sl(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+lr.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let n=0,r=0;e[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(n++,s==="%c"&&(r=n))}),e.splice(r,0,t)}xt.log=console.debug||console.log||(()=>{});function Al(e){try{e?xt.storage.setItem("debug",e):xt.storage.removeItem("debug")}catch{}}function Tl(){let e;try{e=xt.storage.getItem("debug")||xt.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function El(){try{return localStorage}catch{}}lr.exports=xo()(xt);var{formatters:Cl}=lr.exports;Cl.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var Ln=globalThis,ir=Ln.trustedTypes,io=ir?ir.createPolicy("lit-html",{createHTML:e=>e}):void 0,fo="$lit$",Zt=`lit$${Math.random().toFixed(9).slice(2)}$`,_o="?"+Zt,_l=`<${_o}>`,an=document,Dn=()=>an.createComment(""),On=e=>e===null||typeof e!="object"&&typeof e!="function",Zr=Array.isArray,ml=e=>Zr(e)||typeof e?.[Symbol.iterator]=="function",jr=`[ 	
\f\r]`,In=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ao=/-->/g,lo=/>/g,sn=RegExp(`>|${jr}(?:([^\\s"'>=/]+)(${jr}*=${jr}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),co=/'/g,uo=/"/g,mo=/^(?:script|style|textarea|title)$/i,Xr=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),c=Xr(1),Ut=Xr(2),ip=Xr(3),ln=Symbol.for("lit-noChange"),tt=Symbol.for("lit-nothing"),po=new WeakMap,on=an.createTreeWalker(an,129);function go(e,t){if(!Zr(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return io!==void 0?io.createHTML(t):t}var gl=(e,t)=>{let n=e.length-1,r=[],s,o=t===2?"<svg>":t===3?"<math>":"",i=In;for(let l=0;l<n;l++){let a=e[l],d,p,_=-1,v=0;for(;v<a.length&&(i.lastIndex=v,p=i.exec(a),p!==null);)v=i.lastIndex,i===In?p[1]==="!--"?i=ao:p[1]!==void 0?i=lo:p[2]!==void 0?(mo.test(p[2])&&(s=RegExp("</"+p[2],"g")),i=sn):p[3]!==void 0&&(i=sn):i===sn?p[0]===">"?(i=s??In,_=-1):p[1]===void 0?_=-2:(_=i.lastIndex-p[2].length,d=p[1],i=p[3]===void 0?sn:p[3]==='"'?uo:co):i===uo||i===co?i=sn:i===ao||i===lo?i=In:(i=sn,s=void 0);let T=i===sn&&e[l+1].startsWith("/>")?" ":"";o+=i===In?a+_l:_>=0?(r.push(d),a.slice(0,_)+fo+a.slice(_)+Zt+T):a+Zt+(_===-2?l:T)}return[go(e,o+(e[n]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),r]},Pn=class e{constructor({strings:t,_$litType$:n},r){let s;this.parts=[];let o=0,i=0,l=t.length-1,a=this.parts,[d,p]=gl(t,n);if(this.el=e.createElement(d,r),on.currentNode=this.el.content,n===2||n===3){let _=this.el.content.firstChild;_.replaceWith(..._.childNodes)}for(;(s=on.nextNode())!==null&&a.length<l;){if(s.nodeType===1){if(s.hasAttributes())for(let _ of s.getAttributeNames())if(_.endsWith(fo)){let v=p[i++],T=s.getAttribute(_).split(Zt),k=/([.?@])?(.*)/.exec(v);a.push({type:1,index:o,name:k[2],strings:T,ctor:k[1]==="."?Gr:k[1]==="?"?Yr:k[1]==="@"?Vr:bn}),s.removeAttribute(_)}else _.startsWith(Zt)&&(a.push({type:6,index:o}),s.removeAttribute(_));if(mo.test(s.tagName)){let _=s.textContent.split(Zt),v=_.length-1;if(v>0){s.textContent=ir?ir.emptyScript:"";for(let T=0;T<v;T++)s.append(_[T],Dn()),on.nextNode(),a.push({type:2,index:++o});s.append(_[v],Dn())}}}else if(s.nodeType===8)if(s.data===_o)a.push({type:2,index:o});else{let _=-1;for(;(_=s.data.indexOf(Zt,_+1))!==-1;)a.push({type:7,index:o}),_+=Zt.length-1}o++}}static createElement(t,n){let r=an.createElement("template");return r.innerHTML=t,r}};function hn(e,t,n=e,r){if(t===ln)return t;let s=r!==void 0?n._$Co?.[r]:n._$Cl,o=On(t)?void 0:t._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(e),s._$AT(e,n,r)),r!==void 0?(n._$Co??(n._$Co=[]))[r]=s:n._$Cl=s),s!==void 0&&(t=hn(e,s._$AS(e,t.values),s,r)),t}var Wr=class{constructor(t,n){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:n},parts:r}=this._$AD,s=(t?.creationScope??an).importNode(n,!0);on.currentNode=s;let o=on.nextNode(),i=0,l=0,a=r[0];for(;a!==void 0;){if(i===a.index){let d;a.type===2?d=new Mn(o,o.nextSibling,this,t):a.type===1?d=new a.ctor(o,a.name,a.strings,this,t):a.type===6&&(d=new Kr(o,this,t)),this._$AV.push(d),a=r[++l]}i!==a?.index&&(o=on.nextNode(),i++)}return on.currentNode=an,s}p(t){let n=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,n),n+=r.strings.length-2):r._$AI(t[n])),n++}},Mn=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,n,r,s){this.type=2,this._$AH=tt,this._$AN=void 0,this._$AA=t,this._$AB=n,this._$AM=r,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,n=this._$AM;return n!==void 0&&t?.nodeType===11&&(t=n.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,n=this){t=hn(this,t,n),On(t)?t===tt||t==null||t===""?(this._$AH!==tt&&this._$AR(),this._$AH=tt):t!==this._$AH&&t!==ln&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):ml(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==tt&&On(this._$AH)?this._$AA.nextSibling.data=t:this.T(an.createTextNode(t)),this._$AH=t}$(t){let{values:n,_$litType$:r}=t,s=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=Pn.createElement(go(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===s)this._$AH.p(n);else{let o=new Wr(s,this),i=o.u(this.options);o.p(n),this.T(i),this._$AH=o}}_$AC(t){let n=po.get(t.strings);return n===void 0&&po.set(t.strings,n=new Pn(t)),n}k(t){Zr(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,s=0;for(let o of t)s===n.length?n.push(r=new e(this.O(Dn()),this.O(Dn()),this,this.options)):r=n[s],r._$AI(o),s++;s<n.length&&(this._$AR(r&&r._$AB.nextSibling,s),n.length=s)}_$AR(t=this._$AA.nextSibling,n){for(this._$AP?.(!1,!0,n);t!==this._$AB;){let r=t.nextSibling;t.remove(),t=r}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},bn=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,n,r,s,o){this.type=1,this._$AH=tt,this._$AN=void 0,this.element=t,this.name=n,this._$AM=s,this.options=o,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=tt}_$AI(t,n=this,r,s){let o=this.strings,i=!1;if(o===void 0)t=hn(this,t,n,0),i=!On(t)||t!==this._$AH&&t!==ln,i&&(this._$AH=t);else{let l=t,a,d;for(t=o[0],a=0;a<o.length-1;a++)d=hn(this,l[r+a],n,a),d===ln&&(d=this._$AH[a]),i||(i=!On(d)||d!==this._$AH[a]),d===tt?t=tt:t!==tt&&(t+=(d??"")+o[a+1]),this._$AH[a]=d}i&&!s&&this.j(t)}j(t){t===tt?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Gr=class extends bn{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===tt?void 0:t}},Yr=class extends bn{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==tt)}},Vr=class extends bn{constructor(t,n,r,s,o){super(t,n,r,s,o),this.type=5}_$AI(t,n=this){if((t=hn(this,t,n,0)??tt)===ln)return;let r=this._$AH,s=t===tt&&r!==tt||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,o=t!==tt&&(r===tt||s);s&&this.element.removeEventListener(this.name,this,r),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Kr=class{constructor(t,n,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=n,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){hn(this,t)}};var hl=Ln.litHtmlPolyfillSupport;hl?.(Pn,Mn),(Ln.litHtmlVersions??(Ln.litHtmlVersions=[])).push("3.3.1");var Oe=(e,t,n)=>{let r=n?.renderBefore??t,s=r._$litPart$;if(s===void 0){let o=n?.renderBefore??null;r._$litPart$=s=new Mn(t.insertBefore(Dn(),o),o,void 0,n??{})}return s._$AI(e),s};var Et="today",Ft=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}];function zt(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function vn(e,t=Date.now()){switch(e){case"today":{let n=new Date(t);return n.setHours(0,0,0,0),n.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function ho(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function bo(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function vo(){let e=null,t=[],n=new Set;function r(){for(let s of Array.from(n))try{s()}catch{}}return{get(){return e},getWorkspacesState(){return t},set(s,o){e=Array.isArray(s)?s:null,t=Array.isArray(o)?o:[],r()},clear(){e=null,t=[],r()},subscribe(s){return n.add(s),()=>n.delete(s)}}}function yo(){let e=new Map,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{set(r,s,o=null){e.set(r,{lines:Array.isArray(s)?[...s]:[],last_event_at:typeof o=="number"?o:null}),n()},append(r,s){let o=e.get(r)||{lines:[],last_event_at:null};o.lines=[...o.lines,s],o.last_event_at=Date.now(),e.set(r,o),n()},get(r){return e.get(r)||null},clear(r){typeof r=="string"?e.delete(r):e.clear(),n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}var Ao=fl(So(),1);function Ve(e){return(0,Ao.default)(`beads-ui:${e}`)}function Lt(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function dn(e,t){let n=Lt(e.created_at),r=Lt(t.created_at);if(n!==r)return n<r?1:-1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let i=e.id,l=t.id;return i<l?-1:i>l?1:0}function Co(e,t){let n=Lt(e.created_at),r=Lt(t.created_at);if(n!==r)return n<r?-1:1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let i=e.id,l=t.id;return i<l?-1:i>l?1:0}function Ro(e,t){let n=Lt(e.updated_at),r=Lt(t.updated_at);if(n!==r)return n<r?1:-1;let s=e.id,o=t.id;return s<o?-1:s>o?1:0}function Io(e,t){let n=e.priority??2,r=t.priority??2;if(n!==r)return n-r;let s=Lt(e.created_at),o=Lt(t.created_at);if(s!==o)return s<o?1:-1;let i=e.id,l=t.id;return i<l?-1:i>l?1:0}function Lo(e,t){let n=e.closed_at??0,r=t.closed_at??0;if(n!==r)return n<r?1:-1;let s=e?.id,o=t?.id;return s<o?-1:s>o?1:0}var Rl=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function To(e){let t=e&&e.metadata,n=t?t.task_order:void 0;if(n==null||n==="")return Number.POSITIVE_INFINITY;let r=Number(n);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function Eo(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let n=Rl.exec(t);if(!n)return Number.POSITIVE_INFINITY;let r=Number(n[1]);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function Do(e,t){let n=To(e),r=To(t);if(n!==r)return n<r?-1:1;let s=Eo(e),o=Eo(t);if(s!==o)return s<o?-1:1;let i=Lt(e&&e.created_at),l=Lt(t&&t.created_at);if(i!==l)return i<l?-1:1;let a=e&&e.id,d=t&&t.id;return a===d?0:String(a)<String(d)?-1:1}var Qr=2**20;function $n(e,t){let n=e&&e.id;return t&&typeof n=="string"&&Object.prototype.hasOwnProperty.call(t,n)&&typeof t[n]=="number"&&Number.isFinite(t[n])?t[n]:-Lt(e&&e.created_at)}function cr(e){return(t,n)=>{let r=$n(t,e),s=$n(n,e);if(r!==s)return r<s?-1:1;let o=t?.id,i=n?.id;return o<i?-1:o>i?1:0}}function Jr(e,t,n){let r=Array.isArray(e)?e:[],s=r.length,o=Math.max(0,Math.min(t,s-1)),i=o-1>=0?r[o-1]:null,l=o+1<s?r[o+1]:null;if(!i&&!l)return{rank:0};if(!i)return{rank:$n(l,n)-Qr};if(!l)return{rank:$n(i,n)+Qr};let a=$n(i,n),d=$n(l,n),p=(a+d)/2;return a<p&&p<d?{rank:p}:{renormalize:r.map((_,v)=>({bead_id:_.id,rank:v*Qr}))}}function es(e,t={}){let n=Ve(`issue-store:${e}`),r=new Map,s=[],o=0,i=new Set,l=!1,a=t.sort||dn;function d(){for(let v of Array.from(i))try{v()}catch{}}function p(){s=Array.from(r.values()).sort(a)}function _(v){if(l||!v||v.id!==e)return;let T=Number(v.revision)||0;if(n("apply %s rev=%d",v.type,T),!(T<=o&&v.type!=="snapshot")){if(v.type==="snapshot"){if(T<=o)return;r.clear();let k=Array.isArray(v.issues)?v.issues:[];for(let h of k)h&&typeof h.id=="string"&&h.id.length>0&&r.set(h.id,h);p(),o=T,d();return}if(v.type==="upsert"){let k=v.issue;if(k&&typeof k.id=="string"&&k.id.length>0){let h=r.get(k.id);if(!h)r.set(k.id,k);else{let A=Number.isFinite(h.updated_at)?h.updated_at:0,V=Number.isFinite(k.updated_at)?k.updated_at:0;if(A<=V){for(let K of Object.keys(h))K in k||delete h[K];for(let[K,ne]of Object.entries(k))h[K]=ne}}p()}o=T,d()}else if(v.type==="delete"){let k=String(v.issue_id||"");k&&(r.delete(k),p()),o=T,d()}}}return{id:e,subscribe(v){return i.add(v),()=>{i.delete(v)}},applyPush:_,snapshot(){return s},size(){return r.size},getById(v){return r.get(v)},dispose(){l=!0,r.clear(),s=[],i.clear(),o=0}}}function dr(e){let t=String(e.type||"").trim(),n={};if(e.params&&typeof e.params=="object"){let s=Object.keys(e.params).sort();for(let o of s){let i=e.params[o];n[o]=String(i)}}let r=new URLSearchParams(n).toString();return r.length>0?`${t}?${r}`:t}function Oo(e){let t=Ve("subs"),n=new Map,r=new Map;function s(l,a){t("applyDelta %s +%d ~%d -%d",l,(a.added||[]).length,(a.updated||[]).length,(a.removed||[]).length);let d=r.get(l);if(!d||d.size===0)return;let p=Array.isArray(a.added)?a.added:[],_=Array.isArray(a.updated)?a.updated:[],v=Array.isArray(a.removed)?a.removed:[];for(let T of Array.from(d)){let k=n.get(T);if(!k)continue;let h=k.itemsById;for(let A of p)typeof A=="string"&&A.length>0&&h.set(A,!0);for(let A of _)typeof A=="string"&&A.length>0&&h.set(A,!0);for(let A of v)typeof A=="string"&&A.length>0&&h.delete(A)}}async function o(l,a){let d=dr(a);if(t("subscribe %s key=%s",l,d),!n.has(l))n.set(l,{key:d,itemsById:new Map});else{let _=n.get(l);if(_&&_.key!==d){let v=r.get(_.key);v&&(v.delete(l),v.size===0&&r.delete(_.key)),n.set(l,{key:d,itemsById:new Map})}}r.has(d)||r.set(d,new Set);let p=r.get(d);p&&p.add(l);try{await e("subscribe-list",{id:l,type:a.type,params:a.params})}catch(_){let v=n.get(l)||null;if(v){let T=r.get(v.key);T&&(T.delete(l),T.size===0&&r.delete(v.key))}throw n.delete(l),_}return async()=>{t("unsubscribe %s key=%s",l,d);try{await e("unsubscribe-list",{id:l})}catch{}let _=n.get(l)||null;if(_){let v=r.get(_.key);v&&(v.delete(l),v.size===0&&r.delete(_.key))}n.delete(l)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:dr,selectors:{getIds(l){let a=n.get(l);return a?Array.from(a.itemsById.keys()):[]},has(l,a){let d=n.get(l);return d?d.itemsById.has(a):!1},count(l){let a=n.get(l);return a?a.itemsById.size:0},getItemsById(l){let a=n.get(l),d={};if(!a)return d;for(let p of a.itemsById.keys())d[p]=!0;return d}}}}function Po(){let e=Ve("issue-stores"),t=new Map,n=new Map,r=new Set,s=new Map;function o(){for(let a of Array.from(r))try{a()}catch{}}function i(a,d,p){let _=d?dr(d):"",v=n.get(a)||"",T=t.has(a);if(e("register %s key=%s (prev=%s)",a,_,v),T&&v&&_&&v!==_){let k=t.get(a);if(k)try{k.dispose()}catch{}let h=s.get(a);if(h){try{h()}catch{}s.delete(a)}let A=es(a,p);t.set(a,A);let V=A.subscribe(()=>o());s.set(a,V)}else if(!T){let k=es(a,p);t.set(a,k);let h=k.subscribe(()=>o());s.set(a,h)}return n.set(a,_),()=>l(a)}function l(a){e("unregister %s",a),n.delete(a);let d=t.get(a);d&&(d.dispose(),t.delete(a));let p=s.get(a);if(p){try{p()}catch{}s.delete(a)}}return{register:i,unregister:l,getStore(a){return t.get(a)||null},snapshotFor(a){let d=t.get(a);return d?d.snapshot().slice():[]},subscribe(a){return r.add(a),()=>r.delete(a)}}}function Mo(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function No(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function ts(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function Il(e){let t=String(e||""),n=t.startsWith("#")?t.slice(1):t,r=n.indexOf("?"),s=r>=0?n.slice(r+1):"";if(s){let l=new URLSearchParams(s).get("issue");if(l)return decodeURIComponent(l)}let o=/^\/issue\/([^\s?#]+)/.exec(n);return o&&o[1]?decodeURIComponent(o[1]):null}function Ll(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function Fo(e){let t=Ve("router"),n=()=>{let r=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(r),o=s&&s[1]?decodeURIComponent(s[1]):Il(r),i=Ll(r);if(t("hash change \u2192 view=%s id=%s",i,o),e.setState({selected_id:i==="worker"?null:o,view:i,worker:{selected_parent_id:i==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(r)){let a=o?`#/${i}?issue=${encodeURIComponent(o)}`:`#/${i}`;window.location.hash!==a&&(window.location.hash=a)}};return{start(){window.addEventListener("hashchange",n),n()},stop(){window.removeEventListener("hashchange",n)},gotoIssue(r){let s=e.getState?e.getState():{view:"board"},o=s.view==="worker"||s.view==="monitor"?s.view:"board",i=ts(o,r);t("goto issue %s (view=%s)",r,o),window.location.hash!==i?window.location.hash=i:e.setState({selected_id:o==="worker"?null:r,view:o,worker:{selected_parent_id:o==="worker"?r:null}})},gotoView(r){let s=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},o=r==="worker"?s.worker?.selected_parent_id:s.selected_id,i=o?ts(r,o):`#/${r}`;t("goto view %s (id=%s)",r,o||""),window.location.hash!==i?window.location.hash=i:e.setState({view:r,selected_id:r==="worker"?null:s.selected_id})}}}var Dl=Object.freeze({workspace_config:{default_workspace:null}});function qo(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:Dl.workspace_config.default_workspace}}}function Bo(e={}){let t=Ve("state"),n={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:qo(e.config)},r=new Set;function s(){for(let o of Array.from(r))try{o(n)}catch{}}return{getState(){return n},setState(o){let i={...n,...o,filters:{...n.filters,...o.filters||{}},board:{...n.board,...o.board||{}},worker:{...n.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:n.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:n.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:n.workspace.hidden},config:o.config!==void 0?qo(o.config):n.config},l=i.workspace.current?.path!==n.workspace.current?.path||i.workspace.available.length!==n.workspace.available.length||i.workspace.hidden.length!==n.workspace.hidden.length||i.workspace.hidden.some((d,p)=>d!==n.workspace.hidden[p]),a=i.config.workspace_config.default_workspace!==n.config.workspace_config.default_workspace;i.selected_id===n.selected_id&&i.view===n.view&&i.filters.status===n.filters.status&&i.filters.search===n.filters.search&&i.filters.type===n.filters.type&&i.board.closed_filter===n.board.closed_filter&&i.worker.selected_parent_id===n.worker.selected_parent_id&&i.worker.show_closed_children.length===n.worker.show_closed_children.length&&i.worker.show_closed_children.every((d,p)=>d===n.worker.show_closed_children[p])&&!l&&!a||(n=i,t("state change %o",{selected_id:n.selected_id,view:n.view,filters:n.filters,board:n.board,worker:n.worker,workspace:n.workspace.current?.path,config:{default_workspace:n.config.workspace_config.default_workspace}}),s())},subscribe(o){return r.add(o),()=>r.delete(o)}}}function Uo(e){let t=Ve("activity"),n=0,r=new Map,s=1;function o(){if(!e)return;let d=n>0;e.toggleAttribute("hidden",!d),e.setAttribute("aria-busy",d?"true":"false")}function i(){n+=1,t("start count=%d",n),o()}function l(){let d=n;n=Math.max(0,n-1),d<=0?t("done called but count was already %d",d):t("done count=%d\u2192%d",d,n),o()}function a(d){return async(_,v)=>{let T=s++,k=Date.now();r.set(T,{type:_,start_ts:k}),t("request start id=%d type=%s count=%d",T,_,n+1),i();let h=!1,A=()=>{h||(h=!0,r.delete(T),l())},V=setTimeout(()=>{h||(t("request TIMEOUT id=%d type=%s elapsed=%dms",T,_,Date.now()-k),A())},3e4);try{let K=await d(_,v),ne=Date.now()-k;return t("request done id=%d type=%s elapsed=%dms",T,_,ne),K}catch(K){let ne=Date.now()-k;throw t("request error id=%d type=%s elapsed=%dms err=%o",T,_,ne,K),K}finally{clearTimeout(V),A()}}}return o(),{wrapSend:a,start:i,done:l,getCount:()=>n,getActiveRequests:()=>{let d=Date.now();return Array.from(r.entries()).map(([p,_])=>({id:p,type:_.type,elapsed_ms:d-_.start_ts}))}}}function se(e,t="info",n=2800){let r=document.createElement("div");r.className="toast",r.textContent=e,r.style.position="fixed",r.style.right="12px",r.style.bottom="12px",r.style.zIndex="1000",r.style.color="#fff",r.style.padding="8px 10px",r.style.borderRadius="4px",r.style.fontSize="12px",t==="success"?r.style.background="#156d36":t==="warning"?r.style.background="#a36a00":t==="error"?r.style.background="#9f2011":r.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(r),setTimeout(()=>{try{r.remove()}catch{}},n)}function ur(e=void 0,t=void 0){function n(){if(!t||typeof t.get!="function")return null;let o=t.get();return o&&o.order?o.order:{}}function r(o,i,l){let a=e&&e.snapshotFor?e.snapshotFor(o).slice():[];if(i==="closed")return a.sort(Lo),a;switch(l){case"created_desc":return a.sort(dn),a;case"created_asc":return a.sort(Co),a;case"updated_desc":return a.sort(Ro),a;case"priority":return a.sort(Io),a;case"manual":default:{let d=n();return d?a.sort(cr(d)):a.sort(dn),a}}}function s(o){let i=[];return e&&typeof e.subscribe=="function"&&i.push(e.subscribe(o)),t&&typeof t.subscribe=="function"&&i.push(t.subscribe(o)),()=>{for(let l of i)try{l()}catch{}}}return{selectBoardColumn:r,subscribe:s}}function Nn(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function gt(e){let t=Nn(e);if(t===null)return"";let n=new Date(t),r=s=>String(s).padStart(2,"0");return`${n.getFullYear()}-${r(n.getMonth()+1)}-${r(n.getDate())} ${r(n.getHours())}:${r(n.getMinutes())}`}function Tt(e,t){let n=Nn(e);if(n===null)return"";let s=(typeof t=="number"?t:Date.now())-n;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let i=Math.floor(s/36e5);if(i<24)return`${i}\uC2DC\uAC04 \uC804`;let l=Math.floor(s/864e5);if(l<7)return`${l}\uC77C \uC804`;let a=Math.floor(l/7);if(l<30)return`${a}\uC8FC \uC804`;let d=Math.floor(l/30);return d<12?`${d}\uAC1C\uC6D4 \uC804`:`${Math.floor(l/365)}\uB144 \uC804`}function pr(e){if(!Array.isArray(e))return null;let t=null,n=-1;for(let r of e){if(!r||r.status!=="in_progress")continue;let s=Nn(r.updated_at)??0;if(t===null||s>n){t=r,n=s;continue}s===n&&String(r.id)<String(t.id)&&(t=r)}return t}function fr(e){let t=e.transport,n=e.uiOrderStore;function r(i,l){return"renormalize"in i?i.renormalize:[{bead_id:l,rank:i.rank}]}function s(i,l){let a={...i.order};for(let d of l)a[d.bead_id]=d.rank;n&&n.set({revision:i.revision,order:a})}async function o(i,l,a){if(!t||!n)return;let d=n.get()||{revision:0,order:{}},p=r(Jr(l,a,d.order),i);s(d,p);let _=await t("ui-order-set",{expected_revision:d.revision,entries:p});if(_&&_.conflict){let v={revision:typeof _.revision=="number"?_.revision:0,order:_.order||{}};n.set(v);let T=r(Jr(l,a,v.order),i);s(v,T);let k=await t("ui-order-set",{expected_revision:v.revision,entries:T});k&&k.applied&&n.set({revision:typeof k.revision=="number"?k.revision:0,order:k.order||{}})}else _&&_.applied&&n.set({revision:typeof _.revision=="number"?_.revision:0,order:_.order||{}})}return{applyReorder:o}}function _r(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function ns(e,t){return!t||typeof e!="string"||e.length===0||_r(t.visible_labels).includes(e)?!0:_r(t.hidden_labels).includes(e)?!1:!_r(t.hidden_prefixes).some(n=>n.length>0&&e.startsWith(n))}function mr(e,t){return _r(e).filter(n=>ns(n,t))}function Xt(e,t){let n=e&&e.chips?e.chips[t]:void 0;return typeof n=="boolean"?n:!0}var Ol={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},Ho={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},zo={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},Pl={review:"\u2713",skip:"\u2298"},Qt={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function Ml(e,t,n){if(!(n==="in_progress"||n==="resolved"))return null;for(let s of e){let o=t[s];if(o&&o.fill==="dim"&&o.stale!==!0)return s}return null}function jo(e){let t=e&&e.fill||"none";return t==="none"?Qt.none:e&&e.stale===!0?Qt.stale:t==="dim"?Qt.dim:e&&e.glyph==="review"?Qt.review:e&&e.glyph==="skip"?Qt.skip:Qt.done}function Nl(e){if(!e||e.fill==="none"||!e.approval_state)return jo(e);let t=[];return e.glyph==="review"?t.push(Qt.review):e.glyph==="skip"&&t.push(Qt.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function Fl(e,t,n){let r=Ol[e]||e,s=t&&t.fill||"none",o=!!t&&t.stale===!0,i=Pl[t&&t.glyph||""]||"",l="bar";s==="dim"?l+=` b-${r} dim`:s==="full"&&(l+=` b-${r} full`),o&&(l+=" stale"),n&&(l+=" cur");let a=s==="none"?"lbl":`lbl l-${r} on`,d=n?`color: var(--stage-${r}-on)`:"";return c`
    <div class="seg">
      <div class=${l} style=${d}>${i}</div>
      <div class=${a}>
        ${Ho[e]||e}
      </div>
    </div>
  `}function gr(e,t){if(!e||!e.stages)return"";let n=zo[e.route]||zo.spec_backed,r=e.stages,s=Ml(n,r,String(t||"open")),o=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${n.map(i=>`${Ho[i]||i} ${i==="plan"?Nl(r[i]||{}):jo(r[i]||{})}`).join(" \xB7 ")}`;return c`
    <div class="stp" role="img" aria-label=${o}>
      ${n.map(i=>Fl(i,r[i]||{},i===s))}
    </div>
  `}function ql(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var Wo=2;function Bl(e){if(!e)return[];let t=[];if(e.external){let r=e.reason?`\u23F8 blocked: ${e.reason}`:"\u23F8 blocked";t.push(c`<span class="ctl-chip ctl-chip--blocked">${r}</span>`)}let n=Array.isArray(e.blockers)?e.blockers:[];if(n.length>0){let r=n.slice(0,Wo).join(", "),s=n.length-Wo,o=`\u26D3 blocked: ${r}${s>0?` +${s}`:""}`;t.push(c`<span class="ctl-chip ctl-chip--blocked-dep">${o}</span>`)}return t}function Ul(e,t){let n=t.policy||null,r=e.workflow&&e.workflow.chips||{},s=[];if(r.route&&Xt(n,"route")){let i=r.route_source==="derived";s.push(c`<span
        class="ctl-chip ctl-chip--route${i?" is-derived":""}"
        title=${i?"route \uBBF8\uD540 (metadata unset)":"route"}
        >${i?"unset":r.route}</span
      >`)}if(r.fast_track&&Xt(n,"fast_track")&&s.push(c`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),r.pr&&Xt(n,"pr")){let i=r.pr.number;s.push(c`<span class="ctl-chip ctl-chip--pr"
        >${`PR${i!=null?` #${i}`:""}`}</span
      >`)}for(let i of mr(e.labels,n))s.push(c`<span class="ctl-chip ctl-chip--label">${i}</span>`);e.from_id&&Xt(n,"from")&&s.push(c`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${i=>{i.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(i,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),Xt(n,"blocked")&&s.push(...Bl(e.blocked_info));let o=t.cleanupFailureFor?t.cleanupFailureFor(e.id):null;if(o&&Xt(n,"blocked")){let i=t.isCleanupDiagnosisPending?t.isCleanupDiagnosisPending(e.id):!1,l=o.diagnosis&&typeof o.diagnosis=="object"&&!Array.isArray(o.diagnosis)?o.diagnosis:null;if(s.push(c`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 실패</span>`),l){let a=l.malformed===!0||l.verdict==="malformed"?"\uD310\uC815 \uBD88\uAC00":String(l.verdict||"\uD310\uC815 \uBD88\uAC00"),d=typeof l.evidence=="string"?l.evidence.trim().slice(0,96):"",p=typeof l.fix_bead_id=="string"&&l.fix_bead_id.length>0?` \xB7 fix ${l.fix_bead_id}`:"",_=d?` \xB7 ${d}`:"";s.push(c`<span
          class="ctl-chip ctl-chip--cleanup board-card__cleanup-diagnosis"
          title=${d}
          >AI ${a}${_}${p}</span
        >`)}s.push(c`<button
        type="button"
        class="ctl-chip ctl-chip--cleanup board-card__cleanup-diagnose"
        data-bead-id=${e.id}
        ?disabled=${i}
        title="정리 실패 원인을 AI 세션으로 분류합니다"
        @click=${a=>{t.onCleanupDiagnose&&t.onCleanupDiagnose(a,e.id)}}
      >
        AI 정리
      </button>`)}return s.length===0?"":c`<div class="board-card__chips">${s}</div>`}function zl(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function Hl(e){let t=Tt(e.created_at),n=Tt(e.updated_at);return!t&&!n?"":c`<span class="board-card__times">
    ${t?c`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${gt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}
    ${t&&n?c`<span class="board-card__time-sep">·</span>`:""}
    ${n?c`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${gt(e.updated_at)}`}
          >수정 ${n}</span
        >`:""}
  </span>`}function jl(e,t){let n=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]},r=n.total||0,s=t.isExpanded?t.isExpanded(e.id):!0,o=r>0?n.children.slice().sort(Do):n.children;return c`
    <div class="board-card__roll">
      <div class="board-card__roll-meta">
        ${r>0?c`<button
              type="button"
              class="board-card__roll-toggle"
              aria-expanded=${s?"true":"false"}
              @click=${i=>t.onRollupToggle&&t.onRollupToggle(i,e.id)}
            >
              children ${n.count}/${r} ${s?"\u25B4":"\u25BE"}
            </button>`:c`<span class="board-card__roll-none">children 없음</span>`}
        ${Hl(e)}
      </div>
      ${r>0&&n.current?c`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${n.current.title||n.current.id}</span
            >
          </div>`:""}
      ${s&&r>0?c`<div class="board-card__roll-list">
            ${o.map((i,l)=>c`<button
                  type="button"
                  class="board-card__roll-child"
                  @click=${a=>t.onChildClick&&t.onChildClick(a,i.id)}
                >
                  <span class=${zl(i.status)}>●</span>
                  <span class="board-card__roll-child-ord">${l+1}</span>
                  <span class="board-card__roll-child-title"
                    >${i.title||i.id}</span
                  >
                </button>`)}
          </div>`:""}
    </div>
  `}function hr(e,t){let n=ql(e.priority);return c`
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
      ${Ul(e,t)}
      ${e.workflow&&Xt(t.policy||null,"stepper")?gr(e.workflow,e.status):""}
      ${jl(e,t)}
    </article>
  `}function xn(e,t){let n=Array.isArray(e.items)?e.items.length:0,r=e.is_closed===!0;return c`
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
              ${Ft.map(o=>c`<option
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
        ${e.items.map(o=>hr(o,t))}
      </div>
    </section>
  `}function Go(e,t,n){return c`
    <dialog
      id="deferred-popup"
      class="deferred-popup"
      role="dialog"
      aria-modal="true"
      aria-labelledby="deferred-popup-title"
      @click=${n.onOverlayClick}
      @cancel=${n.onClose}
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
            @click=${n.onClose}
          >
            ×
          </button>
        </header>
        <div
          class="deferred-popup__body"
          role="list"
          aria-labelledby="deferred-popup-title"
        >
          ${e.items.length===0?c`<div class="deferred-popup__empty">Deferred 이슈 없음</div>`:e.items.map(r=>hr(r,t))}
        </div>
      </div>
    </dialog>
  `}var Wl=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],Gl=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],Yl=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function Vl(e,t,n){let r=e.labels.length,s=r>0?`\uB77C\uBCA8 ${r}`:"\uB77C\uBCA8";return c`
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
  `}function Yo(e,t,n){return c`
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
        ${Wl.map(r=>c`<option
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
        ${Gl.map(r=>c`<option
              value=${r.value}
              ?selected=${e.type===r.value}
            >
              ${r.label}
            </option>`)}
      </select>
      ${Vl(e,t,n)}
      <span class="board-filter__spacer"></span>
      <button
        type="button"
        class=${n.deferred_popup_open?"board-filter__deferred is-on":"board-filter__deferred"}
        aria-haspopup="dialog"
        aria-expanded=${n.deferred_popup_open?"true":"false"}
        @click=${t.onDeferredToggle}
      >
        Deferred ${n.deferred_count}
      </button>
      <select
        class="board-filter__select board-filter__sort"
        aria-label="정렬 규칙"
        @change=${t.onSortChange}
      >
        ${Yl.map(r=>c`<option
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
  `}var Kl=200,Zl={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},Xl=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),Vo="beads-ui.board.sort",Ko=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function Ql(){try{let e=window.localStorage.getItem(Vo);if(e&&Ko.has(e))return e}catch{}return"created_desc"}function Zo(e,t){let n=Ve("views:board"),r=t.gotoIssue,s=t.issueStores,o=t.transport,i=t.uiOrderStore,l=t.displayPolicyStore,a=t.workerQueueStore,d=t.onClosedRangeChange,p=t.onNewIssue,_=t.closedRange||Et,v=s?ur(s,i):null,T=fr({transport:o,uiOrderStore:i}),k=[],h=[],A=[],V=[],K=[],ne=[],q=!1,L=0,S=Ql(),R=new Map,H=new Map,pe=new Map,$e=new Set,me=new Set,fe={search:"",priority:"",type:"",labels:[]},Ee=!1,Ue=null;function Ke(C){return String(C.status||"open")==="open"}function He(C){let N=String(C.status||"open");return N==="open"||N==="blocked"}function ke(C){let N=fe.search.trim().toLowerCase(),ee=fe.priority,u=fe.type,m=fe.labels;return C.filter(E=>{if(N){let X=String(E.id||"").toLowerCase(),he=String(E.title||"").toLowerCase();if(!X.includes(N)&&!he.includes(N))return!1}if(ee!==""&&String(E.priority)!==ee||u!==""&&String(E.issue_type||"")!==u)return!1;if(m.length>0){let X=Array.isArray(E.labels)?E.labels:[];if(!m.some(he=>X.includes(he)))return!1}return!0})}function D(){let C=new Set;for(let N of[k,h,A,V,K,ne])for(let ee of N){let u=Array.isArray(ee.labels)?ee.labels:[];for(let m of u)typeof m=="string"&&m.length>0&&C.add(m)}return Array.from(C).sort()}function U(){return fe.search.trim()!==""||fe.priority!==""||fe.type!==""||fe.labels.length>0}function _e(){try{if(v){let C=v.selectBoardColumn("tab:board:in-progress","in_progress",S),N=v.selectBoardColumn("tab:board:blocked","blocked",S).filter(He),ee=new Set(C.map(ie=>ie.id)),u=v.selectBoardColumn("tab:board:ready","ready",S).filter(ie=>Ke(ie)&&!ee.has(ie.id)),m=v.selectBoardColumn("tab:board:resolved","resolved",S),E=v.selectBoardColumn("tab:board:deferred","deferred",S),X=v.selectBoardColumn("tab:board:closed","closed").slice(0,Kl),he=[...N,...u,...C,...m,...X];oe(he);let Se=new Set;for(let ie of he)ie&&ie.id&&!rs(ie)&&Se.add(ie.id);let ye=!U();k=ye?Fn(N,Se):N,h=ye?Fn(u,Se):u,A=ye?Fn(C,Se):C,V=ye?Fn(m,Se):m,K=E,L=E.length,ne=ye?Fn(X,Se):X,R=new Map;for(let ie of k)R.set(ie.id,"open");for(let ie of h)R.set(ie.id,"open");for(let ie of A)R.set(ie.id,"in_progress");for(let ie of V)R.set(ie.id,"resolved");for(let ie of K)R.set(ie.id,"deferred");for(let ie of ne)R.set(ie.id,"closed");H=new Map;for(let ie of k)H.set(ie.id,"blocked-col");for(let ie of h)H.set(ie.id,"ready-col");for(let ie of A)H.set(ie.id,"in-progress-col");for(let ie of V)H.set(ie.id,"resolved-col");for(let ie of ne)H.set(ie.id,"closed-col")}We()}catch{k=[],h=[],A=[],V=[],K=[],ne=[],pe=new Map,We()}}function oe(C){let N=new Map;for(let u of C)u&&u.id&&!N.has(u.id)&&N.set(u.id,u);let ee=new Map;for(let u of N.values()){let m=rs(u);if(!m)continue;let E=ee.get(m);E||(E=[],ee.set(m,E)),E.push({id:u.id,title:u.title,status:u.status,metadata:u.metadata,created_at:u.created_at,updated_at:u.updated_at})}pe=ee}function we(C){let N=pe.get(C)||[],ee=0;for(let m of N)(m.status==="resolved"||m.status==="closed")&&(ee+=1);let u=pr(N);return{total:N.length,count:ee,current:u,children:N}}function ge(C){return!$e.has(C)}function Be(C,N){C.preventDefault(),C.stopPropagation(),$e.has(N)?$e.delete(N):$e.add(N),We()}function be(C,N){C.preventDefault(),C.stopPropagation(),r(N)}function Ce(C,N){C.preventDefault(),C.stopPropagation(),r(N)}function F(C,N){Ue||r(N)}function O(C,N){C.preventDefault(),C.stopPropagation(),Jl(N).then(ee=>{ee&&se("\uBCF5\uC0AC\uB428","success",1200)})}function re(C,N){Ue=N,C.dataTransfer&&(C.dataTransfer.setData("text/plain",N),C.dataTransfer.effectAllowed="move"),C.target.classList.add("board-card--dragging")}function xe(C){C.target.classList.remove("board-card--dragging"),_t(),setTimeout(()=>{Ue=null},0)}function Re(C){let N=String(C.target.value||"");!N||N===_||(_=N,d&&d(N),We())}function M(){return l?l.get():null}function B(C){let N=a?a.get():null,ee=N?N.cleanup_failed:null;if(!ee||typeof ee!="object"||Array.isArray(ee))return null;let u=ee[C];return!u||typeof u!="object"||Array.isArray(u)?null:u}function P(C,N){if(!C||typeof C!="object"||Array.isArray(C))return!1;let ee=Object.values(C),u=new Set;for(let m of ee)m&&typeof m=="object"&&typeof m.resumed_from=="string"&&m.resumed_from.length>0&&u.add(m.resumed_from);return ee.some(m=>m&&typeof m=="object"&&m.bead_id===N&&m.cleanup_diagnosis===!0&&(m.status==="running"||m.status==="paused"&&!u.has(m.attempt_id)))}function ae(C){let N=a?a.get():null;return me.has(C)||P(N?N.attempts:null,C)}function ce(C){C&&C.queue&&a&&a.set(C.queue)}async function w(C,N){if(C.preventDefault(),C.stopPropagation(),!o||!a||!B(N)||me.has(N))return;me.add(N),We();let ee;try{let u=a.get(),m=u&&typeof u.revision=="number"?u.revision:0;if(ee=await o("worker-cleanup-diagnose",{bead_id:N,expected_revision:m}),ce(ee),ee&&ee.conflict){let E=a.get(),X=E&&typeof E.revision=="number"?E.revision:0;ee=await o("worker-cleanup-diagnose",{bead_id:N,expected_revision:X}),ce(ee)}}finally{me.delete(N),We()}ee&&!ee.conflict&&ee.ok===!1&&ee.reason&&se(`AI \uC815\uB9AC \uAC70\uBD80: ${ee.reason}`,"error",2400)}let W={onCardClick:F,onCopyId:O,onDragStart:re,onDragEnd:xe,onClosedRangeChange:Re,rollupFor:we,isExpanded:ge,onRollupToggle:Be,onChildClick:be,onFromChipClick:Ce,cleanupFailureFor:B,isCleanupDiagnosisPending:ae,onCleanupDiagnose:w,get policy(){return M()}};function j(C,N){Ue||(pt(),r(N))}function J(C,N){C.preventDefault(),C.stopPropagation(),pt(),r(N)}let de={...W,onCardClick:j,onChildClick:J,onFromChipClick:J,get policy(){return M()}};function Te(C){let N=C.target,ee=e.querySelector(".board-filter__labels");N&&ee&&ee.contains(N)||Xe()}function Ne(C){C.key==="Escape"&&Xe()}function Ze(){Ee||(Ee=!0,document.addEventListener("mousedown",Te),document.addEventListener("keydown",Ne),We())}function Xe(){Ee&&(Ee=!1,document.removeEventListener("mousedown",Te),document.removeEventListener("keydown",Ne),We())}function lt(C){C.key==="Escape"&&pt()}function st(){q||(q=!0,document.addEventListener("keydown",lt),We())}function pt(){q&&(q=!1,document.removeEventListener("keydown",lt),We())}let ht={onClose:pt,onOverlayClick(C){C.target===C.currentTarget&&pt()}},De={onSearchInput(C){fe.search=String(C.target.value||""),_e()},onPriorityChange(C){fe.priority=String(C.target.value||""),_e()},onTypeChange(C){fe.type=String(C.target.value||""),_e()},onSortChange(C){let N=String(C.target.value||"");if(!(!Ko.has(N)||N===S)){S=N;try{window.localStorage.setItem(Vo,N)}catch{}_e()}},onDeferredToggle(){q?pt():st()},onLabelMenuToggle(){Ee?Xe():Ze()},onLabelToggle(C){let N=fe.labels.indexOf(C);N===-1?fe.labels.push(C):fe.labels.splice(N,1),_e()},onLabelClear(){fe.labels.length!==0&&(fe.labels=[],_e())},onNewIssue(){p&&p()}};function ot(){return c`
      <div class="board-view">
        ${Yo(fe,De,{sort_mode:S,deferred_popup_open:q,deferred_count:L,label_options:D(),label_menu_open:Ee})}
        <div class="board-root">
          ${xn({title:"Blocked",id:"blocked-col",items:ke(k)},W)}
          ${xn({title:"Ready",id:"ready-col",items:ke(h)},W)}
          ${xn({title:"In progress",id:"in-progress-col",items:ke(A)},W)}
          ${xn({title:"Resolved",id:"resolved-col",items:ke(V)},W)}
          ${xn({title:"Closed",id:"closed-col",items:ke(ne),is_closed:!0,closed_range:_},W)}
        </div>
        ${q?Go({items:ke(K),count:L},de,ht):""}
      </div>
    `}function We(){Oe(ot(),e),ft()}function ft(){try{let C=e.querySelector("#deferred-popup");C&&!C.open&&(typeof C.showModal=="function"?C.showModal():C.setAttribute("open",""));let N=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let ee of N)Array.from(ee.querySelectorAll(".board-card")).forEach((m,E)=>{m.tabIndex=E===0?0:-1})}catch{}}async function ct(C,N){if(!o){se("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:C,status:N}),se("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(ee){n("update-status failed: %o",ee),se("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function nt(C){switch(C){case"blocked-col":return k;case"ready-col":return h;case"in-progress-col":return A;case"resolved-col":return V;default:return[]}}function it(C,N,ee){if(!o||!i)return;let u=nt(C),m=u.find(ye=>ye.id===N);if(!m)return;let E=u.filter(ye=>ye.id!==N),X=ee.closest?ee.closest(".board-card"):null,he=E.length;if(X){let ye=X.getAttribute("data-issue-id");if(ye===N)return;let ie=E.findIndex(Ie=>Ie.id===ye);ie>=0&&(he=ie)}let Se=E.slice();Se.splice(he,0,m),T.applyReorder(N,Se,he)}function _t(){for(let C of Array.from(e.querySelectorAll(".board-column--drag-over")))C.classList.remove("board-column--drag-over")}let Je=null;e.addEventListener("dragover",C=>{C.preventDefault(),C.dataTransfer&&(C.dataTransfer.dropEffect="move");let ee=C.target.closest(".board-column");ee&&ee!==Je&&(Je&&Je.classList.remove("board-column--drag-over"),ee.classList.add("board-column--drag-over"),Je=ee)}),e.addEventListener("dragleave",C=>{let N=C.relatedTarget;(!N||!e.contains(N))&&Je&&(Je.classList.remove("board-column--drag-over"),Je=null)}),e.addEventListener("drop",C=>{C.preventDefault(),Je&&(Je.classList.remove("board-column--drag-over"),Je=null);let N=C.target,ee=N.closest(".board-column");if(!ee)return;let u=C.dataTransfer?.getData("text/plain")||"";if(!u)return;let m=ee.id,E=H.get(u);if(E&&E===m){if(Xl.has(m)){if(S!=="manual"){se("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}it(m,u,N)}return}let X=Zl[m];if(!X){se("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}R.get(u)!==X&&ct(u,X)}),e.addEventListener("keydown",C=>{let N=C.target;if(!(N instanceof HTMLElement))return;let ee=String(N.tagName||"").toLowerCase();if(ee==="input"||ee==="textarea"||ee==="select"||ee==="button"||ee==="a"||N.isContentEditable===!0)return;let u=N.closest(".board-card");if(!u)return;let m=String(C.key||"");if(m==="Enter"||m===" "){C.preventDefault();let Se=u.getAttribute("data-issue-id");Se&&r(Se);return}if(m!=="ArrowUp"&&m!=="ArrowDown"&&m!=="ArrowLeft"&&m!=="ArrowRight")return;C.preventDefault();let E=u.closest(".board-column");if(!E)return;let X=Array.from(E.querySelectorAll(".board-card")),he=X.indexOf(u);if(m==="ArrowDown"&&he<X.length-1){bt(u,X[he+1]);return}if(m==="ArrowUp"&&he>0){bt(u,X[he-1]);return}if(m==="ArrowLeft"||m==="ArrowRight"){let Se=Array.from(e.querySelectorAll(".board-column")),ye=Se.indexOf(E),ie=m==="ArrowRight"?1:-1,Ie=ye+ie;for(;Ie>=0&&Ie<Se.length;){let Ge=Se[Ie].querySelector(".board-card");if(Ge){bt(u,Ge);return}Ie+=ie}}});function bt(C,N){try{C.tabIndex=-1,N.tabIndex=0,N.focus()}catch{}}let Qe=null;v&&v.subscribe&&(Qe=v.subscribe(()=>{try{_e()}catch{}}));let dt=null;l&&l.subscribe&&(dt=l.subscribe(()=>{try{_e()}catch{}}));let ut=null;return a&&a.subscribe&&(ut=a.subscribe(()=>{We()})),{async load(){n("load"),_e()},clear(){Xe(),pt(),Qe&&(Qe(),Qe=null),dt&&(dt(),dt=null),ut&&(ut(),ut=null),e.replaceChildren(),k=[],h=[],A=[],V=[],K=[],ne=[],R=new Map,H=new Map}}}function rs(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function Fn(e,t){return e.filter(n=>{let r=rs(n);return!(r&&t.has(r))})}async function Jl(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let n=!1;try{n=document.execCommand("copy")}finally{t.remove()}return n}catch{return!1}}async function un(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let n=document.createElement("textarea");n.value=t,n.style.position="fixed",n.style.left="-9999px",document.body.appendChild(n),n.select();let r=!1;try{r=document.execCommand("copy")}finally{n.remove()}return r}catch{return!1}}var ec="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function pn(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var Ht=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"];function Xo(e){let t=0;for(let n of Ht)t+=pn(e?.[n]);return t}function Qo(e){return!e||typeof e!="object"?!1:Ht.some(t=>Number.isFinite(e[t]))}function tc(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function Sn(e){return Qo(e)?`\u03C4 ${tc(Xo(e))}`:null}function Dt(e){let t=Sn(e);if(!t)return null;let n=e?.total_cost_usd;return typeof n=="number"&&Number.isFinite(n)?`${t} \xB7 $${n.toFixed(2)}`:t}function An(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${pn(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${pn(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${pn(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${pn(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let n=[`\uCD1D ${Xo(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&n.push(ec),n.join(`
`)}function qt(e,t){let n={input_tokens:0,output_tokens:0,cache_read_input_tokens:0,cache_creation_input_tokens:0},r=0,s=0,o=0,i=!1;for(let l of Object.values(e||{})){if(!l||l.bead_id!==t)continue;let a=l.usage;if(Qo(a)){r+=1;for(let d of Ht)n[d]=pn(n[d])+pn(a[d]);typeof a.total_cost_usd=="number"&&Number.isFinite(a.total_cost_usd)&&(s+=a.total_cost_usd,o+=1),a.replayed===!0&&(i=!0)}}return r===0?null:(o===r&&(n.total_cost_usd=s),i&&(n.replayed=!0),n)}var{entries:ai,setPrototypeOf:Jo,isFrozen:nc,getPrototypeOf:rc,getOwnPropertyDescriptor:sc}=Object,{freeze:yt,seal:Ct,create:ds}=Object,{apply:us,construct:ps}=typeof Reflect<"u"&&Reflect;yt||(yt=function(t){return t});Ct||(Ct=function(t){return t});us||(us=function(t,n){for(var r=arguments.length,s=new Array(r>2?r-2:0),o=2;o<r;o++)s[o-2]=arguments[o];return t.apply(n,s)});ps||(ps=function(t){for(var n=arguments.length,r=new Array(n>1?n-1:0),s=1;s<n;s++)r[s-1]=arguments[s];return new t(...r)});var br=wt(Array.prototype.forEach),oc=wt(Array.prototype.lastIndexOf),ei=wt(Array.prototype.pop),qn=wt(Array.prototype.push),ic=wt(Array.prototype.splice),yr=wt(String.prototype.toLowerCase),ss=wt(String.prototype.toString),os=wt(String.prototype.match),Bn=wt(String.prototype.replace),ac=wt(String.prototype.indexOf),lc=wt(String.prototype.trim),Ot=wt(Object.prototype.hasOwnProperty),vt=wt(RegExp.prototype.test),Un=cc(TypeError);function wt(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,r=new Array(n>1?n-1:0),s=1;s<n;s++)r[s-1]=arguments[s];return us(e,t,r)}}function cc(e){return function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return ps(e,n)}}function Le(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:yr;Jo&&Jo(e,null);let r=t.length;for(;r--;){let s=t[r];if(typeof s=="string"){let o=n(s);o!==s&&(nc(t)||(t[r]=o),s=o)}e[s]=!0}return e}function dc(e){for(let t=0;t<e.length;t++)Ot(e,t)||(e[t]=null);return e}function jt(e){let t=ds(null);for(let[n,r]of ai(e))Ot(e,n)&&(Array.isArray(r)?t[n]=dc(r):r&&typeof r=="object"&&r.constructor===Object?t[n]=jt(r):t[n]=r);return t}function zn(e,t){for(;e!==null;){let r=sc(e,t);if(r){if(r.get)return wt(r.get);if(typeof r.value=="function")return wt(r.value)}e=rc(e)}function n(){return null}return n}var ti=yt(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),is=yt(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),as=yt(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),uc=yt(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),ls=yt(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),pc=yt(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),ni=yt(["#text"]),ri=yt(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),cs=yt(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),si=yt(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),vr=yt(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),fc=Ct(/\{\{[\w\W]*|[\w\W]*\}\}/gm),_c=Ct(/<%[\w\W]*|[\w\W]*%>/gm),mc=Ct(/\$\{[\w\W]*/gm),gc=Ct(/^data-[\-\w.\u00B7-\uFFFF]+$/),hc=Ct(/^aria-[\-\w]+$/),li=Ct(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),bc=Ct(/^(?:\w+script|data):/i),vc=Ct(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),ci=Ct(/^html$/i),yc=Ct(/^[a-z][.\w]*(-[.\w]+)+$/i),oi=Object.freeze({__proto__:null,ARIA_ATTR:hc,ATTR_WHITESPACE:vc,CUSTOM_ELEMENT:yc,DATA_ATTR:gc,DOCTYPE_NAME:ci,ERB_EXPR:_c,IS_ALLOWED_URI:li,IS_SCRIPT_OR_DATA:bc,MUSTACHE_EXPR:fc,TMPLIT_EXPR:mc}),Hn={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},wc=function(){return typeof window>"u"?null:window},kc=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let r=null,s="data-tt-policy-suffix";n&&n.hasAttribute(s)&&(r=n.getAttribute(s));let o="dompurify"+(r?"#"+r:"");try{return t.createPolicy(o,{createHTML(i){return i},createScriptURL(i){return i}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},ii=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function di(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:wc(),t=le=>di(le);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==Hn.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e,r=n,s=r.currentScript,{DocumentFragment:o,HTMLTemplateElement:i,Node:l,Element:a,NodeFilter:d,NamedNodeMap:p=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:_,DOMParser:v,trustedTypes:T}=e,k=a.prototype,h=zn(k,"cloneNode"),A=zn(k,"remove"),V=zn(k,"nextSibling"),K=zn(k,"childNodes"),ne=zn(k,"parentNode");if(typeof i=="function"){let le=n.createElement("template");le.content&&le.content.ownerDocument&&(n=le.content.ownerDocument)}let q,L="",{implementation:S,createNodeIterator:R,createDocumentFragment:H,getElementsByTagName:pe}=n,{importNode:$e}=r,me=ii();t.isSupported=typeof ai=="function"&&typeof ne=="function"&&S&&S.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:fe,ERB_EXPR:Ee,TMPLIT_EXPR:Ue,DATA_ATTR:Ke,ARIA_ATTR:He,IS_SCRIPT_OR_DATA:ke,ATTR_WHITESPACE:D,CUSTOM_ELEMENT:U}=oi,{IS_ALLOWED_URI:_e}=oi,oe=null,we=Le({},[...ti,...is,...as,...ls,...ni]),ge=null,Be=Le({},[...ri,...cs,...si,...vr]),be=Object.seal(ds(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Ce=null,F=null,O=Object.seal(ds(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),re=!0,xe=!0,Re=!1,M=!0,B=!1,P=!0,ae=!1,ce=!1,w=!1,W=!1,j=!1,J=!1,de=!0,Te=!1,Ne="user-content-",Ze=!0,Xe=!1,lt={},st=null,pt=Le({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),ht=null,De=Le({},["audio","video","img","source","image","track"]),ot=null,We=Le({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),ft="http://www.w3.org/1998/Math/MathML",ct="http://www.w3.org/2000/svg",nt="http://www.w3.org/1999/xhtml",it=nt,_t=!1,Je=null,bt=Le({},[ft,ct,nt],ss),Qe=Le({},["mi","mo","mn","ms","mtext"]),dt=Le({},["annotation-xml"]),ut=Le({},["title","style","font","a","script"]),C=null,N=["application/xhtml+xml","text/html"],ee="text/html",u=null,m=null,E=n.createElement("form"),X=function(b){return b instanceof RegExp||b instanceof Function},he=function(){let b=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(m&&m===b)){if((!b||typeof b!="object")&&(b={}),b=jt(b),C=N.indexOf(b.PARSER_MEDIA_TYPE)===-1?ee:b.PARSER_MEDIA_TYPE,u=C==="application/xhtml+xml"?ss:yr,oe=Ot(b,"ALLOWED_TAGS")?Le({},b.ALLOWED_TAGS,u):we,ge=Ot(b,"ALLOWED_ATTR")?Le({},b.ALLOWED_ATTR,u):Be,Je=Ot(b,"ALLOWED_NAMESPACES")?Le({},b.ALLOWED_NAMESPACES,ss):bt,ot=Ot(b,"ADD_URI_SAFE_ATTR")?Le(jt(We),b.ADD_URI_SAFE_ATTR,u):We,ht=Ot(b,"ADD_DATA_URI_TAGS")?Le(jt(De),b.ADD_DATA_URI_TAGS,u):De,st=Ot(b,"FORBID_CONTENTS")?Le({},b.FORBID_CONTENTS,u):pt,Ce=Ot(b,"FORBID_TAGS")?Le({},b.FORBID_TAGS,u):jt({}),F=Ot(b,"FORBID_ATTR")?Le({},b.FORBID_ATTR,u):jt({}),lt=Ot(b,"USE_PROFILES")?b.USE_PROFILES:!1,re=b.ALLOW_ARIA_ATTR!==!1,xe=b.ALLOW_DATA_ATTR!==!1,Re=b.ALLOW_UNKNOWN_PROTOCOLS||!1,M=b.ALLOW_SELF_CLOSE_IN_ATTR!==!1,B=b.SAFE_FOR_TEMPLATES||!1,P=b.SAFE_FOR_XML!==!1,ae=b.WHOLE_DOCUMENT||!1,W=b.RETURN_DOM||!1,j=b.RETURN_DOM_FRAGMENT||!1,J=b.RETURN_TRUSTED_TYPE||!1,w=b.FORCE_BODY||!1,de=b.SANITIZE_DOM!==!1,Te=b.SANITIZE_NAMED_PROPS||!1,Ze=b.KEEP_CONTENT!==!1,Xe=b.IN_PLACE||!1,_e=b.ALLOWED_URI_REGEXP||li,it=b.NAMESPACE||nt,Qe=b.MATHML_TEXT_INTEGRATION_POINTS||Qe,dt=b.HTML_INTEGRATION_POINTS||dt,be=b.CUSTOM_ELEMENT_HANDLING||{},b.CUSTOM_ELEMENT_HANDLING&&X(b.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(be.tagNameCheck=b.CUSTOM_ELEMENT_HANDLING.tagNameCheck),b.CUSTOM_ELEMENT_HANDLING&&X(b.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(be.attributeNameCheck=b.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),b.CUSTOM_ELEMENT_HANDLING&&typeof b.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(be.allowCustomizedBuiltInElements=b.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),B&&(xe=!1),j&&(W=!0),lt&&(oe=Le({},ni),ge=[],lt.html===!0&&(Le(oe,ti),Le(ge,ri)),lt.svg===!0&&(Le(oe,is),Le(ge,cs),Le(ge,vr)),lt.svgFilters===!0&&(Le(oe,as),Le(ge,cs),Le(ge,vr)),lt.mathMl===!0&&(Le(oe,ls),Le(ge,si),Le(ge,vr))),b.ADD_TAGS&&(typeof b.ADD_TAGS=="function"?O.tagCheck=b.ADD_TAGS:(oe===we&&(oe=jt(oe)),Le(oe,b.ADD_TAGS,u))),b.ADD_ATTR&&(typeof b.ADD_ATTR=="function"?O.attributeCheck=b.ADD_ATTR:(ge===Be&&(ge=jt(ge)),Le(ge,b.ADD_ATTR,u))),b.ADD_URI_SAFE_ATTR&&Le(ot,b.ADD_URI_SAFE_ATTR,u),b.FORBID_CONTENTS&&(st===pt&&(st=jt(st)),Le(st,b.FORBID_CONTENTS,u)),Ze&&(oe["#text"]=!0),ae&&Le(oe,["html","head","body"]),oe.table&&(Le(oe,["tbody"]),delete Ce.tbody),b.TRUSTED_TYPES_POLICY){if(typeof b.TRUSTED_TYPES_POLICY.createHTML!="function")throw Un('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof b.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Un('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');q=b.TRUSTED_TYPES_POLICY,L=q.createHTML("")}else q===void 0&&(q=kc(T,s)),q!==null&&typeof L=="string"&&(L=q.createHTML(""));yt&&yt(b),m=b}},Se=Le({},[...is,...as,...uc]),ye=Le({},[...ls,...pc]),ie=function(b){let z=ne(b);(!z||!z.tagName)&&(z={namespaceURI:it,tagName:"template"});let f=yr(b.tagName),y=yr(z.tagName);return Je[b.namespaceURI]?b.namespaceURI===ct?z.namespaceURI===nt?f==="svg":z.namespaceURI===ft?f==="svg"&&(y==="annotation-xml"||Qe[y]):!!Se[f]:b.namespaceURI===ft?z.namespaceURI===nt?f==="math":z.namespaceURI===ct?f==="math"&&dt[y]:!!ye[f]:b.namespaceURI===nt?z.namespaceURI===ct&&!dt[y]||z.namespaceURI===ft&&!Qe[y]?!1:!ye[f]&&(ut[f]||!Se[f]):!!(C==="application/xhtml+xml"&&Je[b.namespaceURI]):!1},Ie=function(b){qn(t.removed,{element:b});try{ne(b).removeChild(b)}catch{A(b)}},Ge=function(b,z){try{qn(t.removed,{attribute:z.getAttributeNode(b),from:z})}catch{qn(t.removed,{attribute:null,from:z})}if(z.removeAttribute(b),b==="is")if(W||j)try{Ie(z)}catch{}else try{z.setAttribute(b,"")}catch{}},Ae=function(b){let z=null,f=null;if(w)b="<remove></remove>"+b;else{let te=os(b,/^[\r\n\t ]+/);f=te&&te[0]}C==="application/xhtml+xml"&&it===nt&&(b='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+b+"</body></html>");let y=q?q.createHTML(b):b;if(it===nt)try{z=new v().parseFromString(y,C)}catch{}if(!z||!z.documentElement){z=S.createDocument(it,"template",null);try{z.documentElement.innerHTML=_t?L:y}catch{}}let Q=z.body||z.documentElement;return b&&f&&Q.insertBefore(n.createTextNode(f),Q.childNodes[0]||null),it===nt?pe.call(z,ae?"html":"body")[0]:ae?z.documentElement:Q},at=function(b){return R.call(b.ownerDocument||b,b,d.SHOW_ELEMENT|d.SHOW_COMMENT|d.SHOW_TEXT|d.SHOW_PROCESSING_INSTRUCTION|d.SHOW_CDATA_SECTION,null)},St=function(b){return b instanceof _&&(typeof b.nodeName!="string"||typeof b.textContent!="string"||typeof b.removeChild!="function"||!(b.attributes instanceof p)||typeof b.removeAttribute!="function"||typeof b.setAttribute!="function"||typeof b.namespaceURI!="string"||typeof b.insertBefore!="function"||typeof b.hasChildNodes!="function")},$t=function(b){return typeof l=="function"&&b instanceof l};function et(le,b,z){br(le,f=>{f.call(t,b,z,m)})}let At=function(b){let z=null;if(et(me.beforeSanitizeElements,b,null),St(b))return Ie(b),!0;let f=u(b.nodeName);if(et(me.uponSanitizeElement,b,{tagName:f,allowedTags:oe}),P&&b.hasChildNodes()&&!$t(b.firstElementChild)&&vt(/<[/\w!]/g,b.innerHTML)&&vt(/<[/\w!]/g,b.textContent)||b.nodeType===Hn.progressingInstruction||P&&b.nodeType===Hn.comment&&vt(/<[/\w]/g,b.data))return Ie(b),!0;if(!(O.tagCheck instanceof Function&&O.tagCheck(f))&&(!oe[f]||Ce[f])){if(!Ce[f]&&Ye(f)&&(be.tagNameCheck instanceof RegExp&&vt(be.tagNameCheck,f)||be.tagNameCheck instanceof Function&&be.tagNameCheck(f)))return!1;if(Ze&&!st[f]){let y=ne(b)||b.parentNode,Q=K(b)||b.childNodes;if(Q&&y){let te=Q.length;for(let Z=te-1;Z>=0;--Z){let g=h(Q[Z],!0);g.__removalCount=(b.__removalCount||0)+1,y.insertBefore(g,V(b))}}}return Ie(b),!0}return b instanceof a&&!ie(b)||(f==="noscript"||f==="noembed"||f==="noframes")&&vt(/<\/no(script|embed|frames)/i,b.innerHTML)?(Ie(b),!0):(B&&b.nodeType===Hn.text&&(z=b.textContent,br([fe,Ee,Ue],y=>{z=Bn(z,y," ")}),b.textContent!==z&&(qn(t.removed,{element:b.cloneNode()}),b.textContent=z)),et(me.afterSanitizeElements,b,null),!1)},ve=function(b,z,f){if(de&&(z==="id"||z==="name")&&(f in n||f in E))return!1;if(!(xe&&!F[z]&&vt(Ke,z))){if(!(re&&vt(He,z))){if(!(O.attributeCheck instanceof Function&&O.attributeCheck(z,b))){if(!ge[z]||F[z]){if(!(Ye(b)&&(be.tagNameCheck instanceof RegExp&&vt(be.tagNameCheck,b)||be.tagNameCheck instanceof Function&&be.tagNameCheck(b))&&(be.attributeNameCheck instanceof RegExp&&vt(be.attributeNameCheck,z)||be.attributeNameCheck instanceof Function&&be.attributeNameCheck(z,b))||z==="is"&&be.allowCustomizedBuiltInElements&&(be.tagNameCheck instanceof RegExp&&vt(be.tagNameCheck,f)||be.tagNameCheck instanceof Function&&be.tagNameCheck(f))))return!1}else if(!ot[z]){if(!vt(_e,Bn(f,D,""))){if(!((z==="src"||z==="xlink:href"||z==="href")&&b!=="script"&&ac(f,"data:")===0&&ht[b])){if(!(Re&&!vt(ke,Bn(f,D,"")))){if(f)return!1}}}}}}}return!0},Ye=function(b){return b!=="annotation-xml"&&os(b,U)},It=function(b){et(me.beforeSanitizeAttributes,b,null);let{attributes:z}=b;if(!z||St(b))return;let f={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:ge,forceKeepAttr:void 0},y=z.length;for(;y--;){let Q=z[y],{name:te,namespaceURI:Z,value:g}=Q,I=u(te),x=g,Y=te==="value"?x:lc(x);if(f.attrName=I,f.attrValue=Y,f.keepAttr=!0,f.forceKeepAttr=void 0,et(me.uponSanitizeAttribute,b,f),Y=f.attrValue,Te&&(I==="id"||I==="name")&&(Ge(te,b),Y=Ne+Y),P&&vt(/((--!?|])>)|<\/(style|title|textarea)/i,Y)){Ge(te,b);continue}if(I==="attributename"&&os(Y,"href")){Ge(te,b);continue}if(f.forceKeepAttr)continue;if(!f.keepAttr){Ge(te,b);continue}if(!M&&vt(/\/>/i,Y)){Ge(te,b);continue}B&&br([fe,Ee,Ue],rt=>{Y=Bn(Y,rt," ")});let Pe=u(b.nodeName);if(!ve(Pe,I,Y)){Ge(te,b);continue}if(q&&typeof T=="object"&&typeof T.getAttributeType=="function"&&!Z)switch(T.getAttributeType(Pe,I)){case"TrustedHTML":{Y=q.createHTML(Y);break}case"TrustedScriptURL":{Y=q.createScriptURL(Y);break}}if(Y!==x)try{Z?b.setAttributeNS(Z,te,Y):b.setAttribute(te,Y),St(b)?Ie(b):ei(t.removed)}catch{Ge(te,b)}}et(me.afterSanitizeAttributes,b,null)},Vt=function le(b){let z=null,f=at(b);for(et(me.beforeSanitizeShadowDOM,b,null);z=f.nextNode();)et(me.uponSanitizeShadowNode,z,null),At(z),It(z),z.content instanceof o&&le(z.content);et(me.afterSanitizeShadowDOM,b,null)};return t.sanitize=function(le){let b=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},z=null,f=null,y=null,Q=null;if(_t=!le,_t&&(le="<!-->"),typeof le!="string"&&!$t(le))if(typeof le.toString=="function"){if(le=le.toString(),typeof le!="string")throw Un("dirty is not a string, aborting")}else throw Un("toString is not a function");if(!t.isSupported)return le;if(ce||he(b),t.removed=[],typeof le=="string"&&(Xe=!1),Xe){if(le.nodeName){let g=u(le.nodeName);if(!oe[g]||Ce[g])throw Un("root node is forbidden and cannot be sanitized in-place")}}else if(le instanceof l)z=Ae("<!---->"),f=z.ownerDocument.importNode(le,!0),f.nodeType===Hn.element&&f.nodeName==="BODY"||f.nodeName==="HTML"?z=f:z.appendChild(f);else{if(!W&&!B&&!ae&&le.indexOf("<")===-1)return q&&J?q.createHTML(le):le;if(z=Ae(le),!z)return W?null:J?L:""}z&&w&&Ie(z.firstChild);let te=at(Xe?le:z);for(;y=te.nextNode();)At(y),It(y),y.content instanceof o&&Vt(y.content);if(Xe)return le;if(W){if(j)for(Q=H.call(z.ownerDocument);z.firstChild;)Q.appendChild(z.firstChild);else Q=z;return(ge.shadowroot||ge.shadowrootmode)&&(Q=$e.call(r,Q,!0)),Q}let Z=ae?z.outerHTML:z.innerHTML;return ae&&oe["!doctype"]&&z.ownerDocument&&z.ownerDocument.doctype&&z.ownerDocument.doctype.name&&vt(ci,z.ownerDocument.doctype.name)&&(Z="<!DOCTYPE "+z.ownerDocument.doctype.name+`>
`+Z),B&&br([fe,Ee,Ue],g=>{Z=Bn(Z,g," ")}),q&&J?q.createHTML(Z):Z},t.setConfig=function(){let le=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};he(le),ce=!0},t.clearConfig=function(){m=null,ce=!1},t.isValidAttribute=function(le,b,z){m||he({});let f=u(le),y=u(b);return ve(f,y,z)},t.addHook=function(le,b){typeof b=="function"&&qn(me[le],b)},t.removeHook=function(le,b){if(b!==void 0){let z=oc(me[le],b);return z===-1?void 0:ic(me[le],z,1)[0]}return ei(me[le])},t.removeHooks=function(le){me[le]=[]},t.removeAllHooks=function(){me=ii()},t}var ui=di();var pi={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},fi=e=>(...t)=>({_$litDirective$:e,values:t}),wr=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,n,r){this._$Ct=t,this._$AM=n,this._$Ci=r}_$AS(t,n){return this.update(t,n)}update(t,n){return this.render(...n)}};var jn=class extends wr{constructor(t){if(super(t),this.it=tt,t.type!==pi.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===tt||t==null)return this._t=void 0,this.it=t;if(t===ln)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let n=[t];return n.raw=n,this._t={_$litType$:this.constructor.resultType,strings:n,values:[]}}};jn.directiveName="unsafeHTML",jn.resultType=1;var _i=fi(jn);function gs(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var _n=gs();function wi(e){_n=e}var Vn={exec:()=>null};function Fe(e,t=""){let n=typeof e=="string"?e:e.source,r={replace:(s,o)=>{let i=typeof o=="string"?o:o.source;return i=i.replace(kt.caret,"$1"),n=n.replace(s,i),r},getRegex:()=>new RegExp(n,t)};return r}var $c=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),kt={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},xc=/^(?:[ \t]*(?:\n|$))+/,Sc=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Ac=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,Kn=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Tc=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,hs=/(?:[*+-]|\d{1,9}[.)])/,ki=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,$i=Fe(ki).replace(/bull/g,hs).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Ec=Fe(ki).replace(/bull/g,hs).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),bs=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Cc=/^[^\n]+/,vs=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,Rc=Fe(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",vs).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Ic=Fe(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,hs).getRegex(),Tr="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",ys=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Lc=Fe("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",ys).replace("tag",Tr).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),xi=Fe(bs).replace("hr",Kn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Tr).getRegex(),Dc=Fe(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",xi).getRegex(),ws={blockquote:Dc,code:Sc,def:Rc,fences:Ac,heading:Tc,hr:Kn,html:Lc,lheading:$i,list:Ic,newline:xc,paragraph:xi,table:Vn,text:Cc},mi=Fe("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",Kn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Tr).getRegex(),Oc={...ws,lheading:Ec,table:mi,paragraph:Fe(bs).replace("hr",Kn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",mi).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Tr).getRegex()},Pc={...ws,html:Fe(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",ys).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Vn,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:Fe(bs).replace("hr",Kn).replace("heading",` *#{1,6} *[^
]`).replace("lheading",$i).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Mc=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Nc=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Si=/^( {2,}|\\)\n(?!\s*$)/,Fc=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Er=/[\p{P}\p{S}]/u,ks=/[\s\p{P}\p{S}]/u,Ai=/[^\s\p{P}\p{S}]/u,qc=Fe(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,ks).getRegex(),Ti=/(?!~)[\p{P}\p{S}]/u,Bc=/(?!~)[\s\p{P}\p{S}]/u,Uc=/(?:[^\s\p{P}\p{S}]|~)/u,zc=Fe(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",$c?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),Ei=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,Hc=Fe(Ei,"u").replace(/punct/g,Er).getRegex(),jc=Fe(Ei,"u").replace(/punct/g,Ti).getRegex(),Ci="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Wc=Fe(Ci,"gu").replace(/notPunctSpace/g,Ai).replace(/punctSpace/g,ks).replace(/punct/g,Er).getRegex(),Gc=Fe(Ci,"gu").replace(/notPunctSpace/g,Uc).replace(/punctSpace/g,Bc).replace(/punct/g,Ti).getRegex(),Yc=Fe("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,Ai).replace(/punctSpace/g,ks).replace(/punct/g,Er).getRegex(),Vc=Fe(/\\(punct)/,"gu").replace(/punct/g,Er).getRegex(),Kc=Fe(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Zc=Fe(ys).replace("(?:-->|$)","-->").getRegex(),Xc=Fe("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Zc).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),xr=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,Qc=Fe(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",xr).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Ri=Fe(/^!?\[(label)\]\[(ref)\]/).replace("label",xr).replace("ref",vs).getRegex(),Ii=Fe(/^!?\[(ref)\](?:\[\])?/).replace("ref",vs).getRegex(),Jc=Fe("reflink|nolink(?!\\()","g").replace("reflink",Ri).replace("nolink",Ii).getRegex(),gi=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,$s={_backpedal:Vn,anyPunctuation:Vc,autolink:Kc,blockSkip:zc,br:Si,code:Nc,del:Vn,emStrongLDelim:Hc,emStrongRDelimAst:Wc,emStrongRDelimUnd:Yc,escape:Mc,link:Qc,nolink:Ii,punctuation:qc,reflink:Ri,reflinkSearch:Jc,tag:Xc,text:Fc,url:Vn},ed={...$s,link:Fe(/^!?\[(label)\]\((.*?)\)/).replace("label",xr).getRegex(),reflink:Fe(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",xr).getRegex()},fs={...$s,emStrongRDelimAst:Gc,emStrongLDelim:jc,url:Fe(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",gi).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:Fe(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",gi).getRegex()},td={...fs,br:Fe(Si).replace("{2,}","*").getRegex(),text:Fe(fs.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},kr={normal:ws,gfm:Oc,pedantic:Pc},Wn={normal:$s,gfm:fs,breaks:td,pedantic:ed},nd={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},hi=e=>nd[e];function Wt(e,t){if(t){if(kt.escapeTest.test(e))return e.replace(kt.escapeReplace,hi)}else if(kt.escapeTestNoEncode.test(e))return e.replace(kt.escapeReplaceNoEncode,hi);return e}function bi(e){try{e=encodeURI(e).replace(kt.percentDecode,"%")}catch{return null}return e}function vi(e,t){let n=e.replace(kt.findPipe,(o,i,l)=>{let a=!1,d=i;for(;--d>=0&&l[d]==="\\";)a=!a;return a?"|":" |"}),r=n.split(kt.splitPipe),s=0;if(r[0].trim()||r.shift(),r.length>0&&!r.at(-1)?.trim()&&r.pop(),t)if(r.length>t)r.splice(t);else for(;r.length<t;)r.push("");for(;s<r.length;s++)r[s]=r[s].trim().replace(kt.slashPipe,"|");return r}function Gn(e,t,n){let r=e.length;if(r===0)return"";let s=0;for(;s<r;){let o=e.charAt(r-s-1);if(o===t&&!n)s++;else if(o!==t&&n)s++;else break}return e.slice(0,r-s)}function rd(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let r=0;r<e.length;r++)if(e[r]==="\\")r++;else if(e[r]===t[0])n++;else if(e[r]===t[1]&&(n--,n<0))return r;return n>0?-2:-1}function yi(e,t,n,r,s){let o=t.href,i=t.title||null,l=e[1].replace(s.other.outputLinkReplace,"$1");r.state.inLink=!0;let a={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:o,title:i,text:l,tokens:r.inlineTokens(l)};return r.state.inLink=!1,a}function sd(e,t,n){let r=e.match(n.other.indentCodeCompensation);if(r===null)return t;let s=r[1];return t.split(`
`).map(o=>{let i=o.match(n.other.beginningSpace);if(i===null)return o;let[l]=i;return l.length>=s.length?o.slice(s.length):o}).join(`
`)}var Sr=class{constructor(e){ze(this,"options");ze(this,"rules");ze(this,"lexer");this.options=e||_n}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:Gn(n,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let n=t[0],r=sd(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:r}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){let r=Gn(n,"#");(this.options.pedantic||!r||this.rules.other.endingSpaceChar.test(r))&&(n=r.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:Gn(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let n=Gn(t[0],`
`).split(`
`),r="",s="",o=[];for(;n.length>0;){let i=!1,l=[],a;for(a=0;a<n.length;a++)if(this.rules.other.blockquoteStart.test(n[a]))l.push(n[a]),i=!0;else if(!i)l.push(n[a]);else break;n=n.slice(a);let d=l.join(`
`),p=d.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");r=r?`${r}
${d}`:d,s=s?`${s}
${p}`:p;let _=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(p,o,!0),this.lexer.state.top=_,n.length===0)break;let v=o.at(-1);if(v?.type==="code")break;if(v?.type==="blockquote"){let T=v,k=T.raw+`
`+n.join(`
`),h=this.blockquote(k);o[o.length-1]=h,r=r.substring(0,r.length-T.raw.length)+h.raw,s=s.substring(0,s.length-T.text.length)+h.text;break}else if(v?.type==="list"){let T=v,k=T.raw+`
`+n.join(`
`),h=this.list(k);o[o.length-1]=h,r=r.substring(0,r.length-v.raw.length)+h.raw,s=s.substring(0,s.length-T.raw.length)+h.raw,n=k.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:r,tokens:o,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim(),r=n.length>1,s={type:"list",raw:"",ordered:r,start:r?+n.slice(0,-1):"",loose:!1,items:[]};n=r?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=r?n:"[*+-]");let o=this.rules.other.listItemRegex(n),i=!1;for(;e;){let a=!1,d="",p="";if(!(t=o.exec(e))||this.rules.block.hr.test(e))break;d=t[0],e=e.substring(d.length);let _=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,h=>" ".repeat(3*h.length)),v=e.split(`
`,1)[0],T=!_.trim(),k=0;if(this.options.pedantic?(k=2,p=_.trimStart()):T?k=t[1].length+1:(k=t[2].search(this.rules.other.nonSpaceChar),k=k>4?1:k,p=_.slice(k),k+=t[1].length),T&&this.rules.other.blankLine.test(v)&&(d+=v+`
`,e=e.substring(v.length+1),a=!0),!a){let h=this.rules.other.nextBulletRegex(k),A=this.rules.other.hrRegex(k),V=this.rules.other.fencesBeginRegex(k),K=this.rules.other.headingBeginRegex(k),ne=this.rules.other.htmlBeginRegex(k);for(;e;){let q=e.split(`
`,1)[0],L;if(v=q,this.options.pedantic?(v=v.replace(this.rules.other.listReplaceNesting,"  "),L=v):L=v.replace(this.rules.other.tabCharGlobal,"    "),V.test(v)||K.test(v)||ne.test(v)||h.test(v)||A.test(v))break;if(L.search(this.rules.other.nonSpaceChar)>=k||!v.trim())p+=`
`+L.slice(k);else{if(T||_.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||V.test(_)||K.test(_)||A.test(_))break;p+=`
`+v}!T&&!v.trim()&&(T=!0),d+=q+`
`,e=e.substring(q.length+1),_=L.slice(k)}}s.loose||(i?s.loose=!0:this.rules.other.doubleBlankLine.test(d)&&(i=!0)),s.items.push({type:"list_item",raw:d,task:!!this.options.gfm&&this.rules.other.listIsTask.test(p),loose:!1,text:p,tokens:[]}),s.raw+=d}let l=s.items.at(-1);if(l)l.raw=l.raw.trimEnd(),l.text=l.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let a of s.items){if(this.lexer.state.top=!1,a.tokens=this.lexer.blockTokens(a.text,[]),a.task){if(a.text=a.text.replace(this.rules.other.listReplaceTask,""),a.tokens[0]?.type==="text"||a.tokens[0]?.type==="paragraph"){a.tokens[0].raw=a.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),a.tokens[0].text=a.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let p=this.lexer.inlineQueue.length-1;p>=0;p--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[p].src)){this.lexer.inlineQueue[p].src=this.lexer.inlineQueue[p].src.replace(this.rules.other.listReplaceTask,"");break}}let d=this.rules.other.listTaskCheckbox.exec(a.raw);if(d){let p={type:"checkbox",raw:d[0]+" ",checked:d[0]!=="[ ]"};a.checked=p.checked,s.loose?a.tokens[0]&&["paragraph","text"].includes(a.tokens[0].type)&&"tokens"in a.tokens[0]&&a.tokens[0].tokens?(a.tokens[0].raw=p.raw+a.tokens[0].raw,a.tokens[0].text=p.raw+a.tokens[0].text,a.tokens[0].tokens.unshift(p)):a.tokens.unshift({type:"paragraph",raw:p.raw,text:p.raw,tokens:[p]}):a.tokens.unshift(p)}}if(!s.loose){let d=a.tokens.filter(_=>_.type==="space"),p=d.length>0&&d.some(_=>this.rules.other.anyLine.test(_.raw));s.loose=p}}if(s.loose)for(let a of s.items){a.loose=!0;for(let d of a.tokens)d.type==="text"&&(d.type="paragraph")}return s}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),r=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:r,title:s}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let n=vi(t[1]),r=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===r.length){for(let i of r)this.rules.other.tableAlignRight.test(i)?o.align.push("right"):this.rules.other.tableAlignCenter.test(i)?o.align.push("center"):this.rules.other.tableAlignLeft.test(i)?o.align.push("left"):o.align.push(null);for(let i=0;i<n.length;i++)o.header.push({text:n[i],tokens:this.lexer.inline(n[i]),header:!0,align:o.align[i]});for(let i of s)o.rows.push(vi(i,o.header.length).map((l,a)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:o.align[a]})));return o}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;let o=Gn(n.slice(0,-1),"\\");if((n.length-o.length)%2===0)return}else{let o=rd(t[2],"()");if(o===-2)return;if(o>-1){let i=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,i).trim(),t[3]=""}}let r=t[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(r);o&&(r=o[1],s=o[3])}else s=t[3]?t[3].slice(1,-1):"";return r=r.trim(),this.rules.other.startAngleBracket.test(r)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?r=r.slice(1):r=r.slice(1,-1)),yi(t,{href:r&&r.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let r=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[r.toLowerCase()];if(!s){let o=n[0].charAt(0);return{type:"text",raw:o,text:o}}return yi(n,s,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let r=this.rules.inline.emStrongLDelim.exec(e);if(!(!r||r[3]&&n.match(this.rules.other.unicodeAlphaNumeric))&&(!(r[1]||r[2])||!n||this.rules.inline.punctuation.exec(n))){let s=[...r[0]].length-1,o,i,l=s,a=0,d=r[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(d.lastIndex=0,t=t.slice(-1*e.length+s);(r=d.exec(t))!=null;){if(o=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!o)continue;if(i=[...o].length,r[3]||r[4]){l+=i;continue}else if((r[5]||r[6])&&s%3&&!((s+i)%3)){a+=i;continue}if(l-=i,l>0)continue;i=Math.min(i,i+l+a);let p=[...r[0]][0].length,_=e.slice(0,s+r.index+p+i);if(Math.min(s,i)%2){let T=_.slice(1,-1);return{type:"em",raw:_,text:T,tokens:this.lexer.inlineTokens(T)}}let v=_.slice(2,-2);return{type:"strong",raw:_,text:v,tokens:this.lexer.inlineTokens(v)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," "),r=this.rules.other.nonSpaceChar.test(n),s=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return r&&s&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let n,r;return t[2]==="@"?(n=t[1],r="mailto:"+n):(n=t[1],r=n),{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let n,r;if(t[2]==="@")n=t[0],r="mailto:"+n;else{let s;do s=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(s!==t[0]);n=t[0],t[1]==="www."?r="http://"+t[0]:r=t[0]}return{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},Pt=class _s{constructor(t){ze(this,"tokens");ze(this,"options");ze(this,"state");ze(this,"inlineQueue");ze(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||_n,this.options.tokenizer=this.options.tokenizer||new Sr,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let n={other:kt,block:kr.normal,inline:Wn.normal};this.options.pedantic?(n.block=kr.pedantic,n.inline=Wn.pedantic):this.options.gfm&&(n.block=kr.gfm,this.options.breaks?n.inline=Wn.breaks:n.inline=Wn.gfm),this.tokenizer.rules=n}static get rules(){return{block:kr,inline:Wn}}static lex(t,n){return new _s(n).lex(t)}static lexInline(t,n){return new _s(n).inlineTokens(t)}lex(t){t=t.replace(kt.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){let r=this.inlineQueue[n];this.inlineTokens(r.src,r.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,n=[],r=!1){for(this.options.pedantic&&(t=t.replace(kt.tabCharGlobal,"    ").replace(kt.spaceLine,""));t;){let s;if(this.options.extensions?.block?.some(i=>(s=i.call({lexer:this},t,n))?(t=t.substring(s.raw.length),n.push(s),!0):!1))continue;if(s=this.tokenizer.space(t)){t=t.substring(s.raw.length);let i=n.at(-1);s.raw.length===1&&i!==void 0?i.raw+=`
`:n.push(s);continue}if(s=this.tokenizer.code(t)){t=t.substring(s.raw.length);let i=n.at(-1);i?.type==="paragraph"||i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+s.raw,i.text+=`
`+s.text,this.inlineQueue.at(-1).src=i.text):n.push(s);continue}if(s=this.tokenizer.fences(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.heading(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.hr(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.blockquote(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.list(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.html(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.def(t)){t=t.substring(s.raw.length);let i=n.at(-1);i?.type==="paragraph"||i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+s.raw,i.text+=`
`+s.raw,this.inlineQueue.at(-1).src=i.text):this.tokens.links[s.tag]||(this.tokens.links[s.tag]={href:s.href,title:s.title},n.push(s));continue}if(s=this.tokenizer.table(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.lheading(t)){t=t.substring(s.raw.length),n.push(s);continue}let o=t;if(this.options.extensions?.startBlock){let i=1/0,l=t.slice(1),a;this.options.extensions.startBlock.forEach(d=>{a=d.call({lexer:this},l),typeof a=="number"&&a>=0&&(i=Math.min(i,a))}),i<1/0&&i>=0&&(o=t.substring(0,i+1))}if(this.state.top&&(s=this.tokenizer.paragraph(o))){let i=n.at(-1);r&&i?.type==="paragraph"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+s.raw,i.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):n.push(s),r=o.length!==t.length,t=t.substring(s.raw.length);continue}if(s=this.tokenizer.text(t)){t=t.substring(s.raw.length);let i=n.at(-1);i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+s.raw,i.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):n.push(s);continue}if(t){let i="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(i);break}else throw new Error(i)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){let r=t,s=null;if(this.tokens.links){let a=Object.keys(this.tokens.links);if(a.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(r))!=null;)a.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(r=r.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(r))!=null;)r=r.slice(0,s.index)+"++"+r.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(r))!=null;)o=s[2]?s[2].length:0,r=r.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+r.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);r=this.options.hooks?.emStrongMask?.call({lexer:this},r)??r;let i=!1,l="";for(;t;){i||(l=""),i=!1;let a;if(this.options.extensions?.inline?.some(p=>(a=p.call({lexer:this},t,n))?(t=t.substring(a.raw.length),n.push(a),!0):!1))continue;if(a=this.tokenizer.escape(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.tag(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.link(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(a.raw.length);let p=n.at(-1);a.type==="text"&&p?.type==="text"?(p.raw+=a.raw,p.text+=a.text):n.push(a);continue}if(a=this.tokenizer.emStrong(t,r,l)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.codespan(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.br(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.del(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.autolink(t)){t=t.substring(a.raw.length),n.push(a);continue}if(!this.state.inLink&&(a=this.tokenizer.url(t))){t=t.substring(a.raw.length),n.push(a);continue}let d=t;if(this.options.extensions?.startInline){let p=1/0,_=t.slice(1),v;this.options.extensions.startInline.forEach(T=>{v=T.call({lexer:this},_),typeof v=="number"&&v>=0&&(p=Math.min(p,v))}),p<1/0&&p>=0&&(d=t.substring(0,p+1))}if(a=this.tokenizer.inlineText(d)){t=t.substring(a.raw.length),a.raw.slice(-1)!=="_"&&(l=a.raw.slice(-1)),i=!0;let p=n.at(-1);p?.type==="text"?(p.raw+=a.raw,p.text+=a.text):n.push(a);continue}if(t){let p="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(p);break}else throw new Error(p)}}return n}},Ar=class{constructor(e){ze(this,"options");ze(this,"parser");this.options=e||_n}space(e){return""}code({text:e,lang:t,escaped:n}){let r=(t||"").match(kt.notSpaceStart)?.[0],s=e.replace(kt.endingNewline,"")+`
`;return r?'<pre><code class="language-'+Wt(r)+'">'+(n?s:Wt(s,!0))+`</code></pre>
`:"<pre><code>"+(n?s:Wt(s,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}def(e){return""}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return`<hr>
`}list(e){let t=e.ordered,n=e.start,r="";for(let i=0;i<e.items.length;i++){let l=e.items[i];r+=this.listitem(l)}let s=t?"ol":"ul",o=t&&n!==1?' start="'+n+'"':"";return"<"+s+o+`>
`+r+"</"+s+`>
`}listitem(e){return`<li>${this.parser.parse(e.tokens)}</li>
`}checkbox({checked:e}){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox"> '}paragraph({tokens:e}){return`<p>${this.parser.parseInline(e)}</p>
`}table(e){let t="",n="";for(let s=0;s<e.header.length;s++)n+=this.tablecell(e.header[s]);t+=this.tablerow({text:n});let r="";for(let s=0;s<e.rows.length;s++){let o=e.rows[s];n="";for(let i=0;i<o.length;i++)n+=this.tablecell(o[i]);r+=this.tablerow({text:n})}return r&&(r=`<tbody>${r}</tbody>`),`<table>
<thead>
`+t+`</thead>
`+r+`</table>
`}tablerow({text:e}){return`<tr>
${e}</tr>
`}tablecell(e){let t=this.parser.parseInline(e.tokens),n=e.header?"th":"td";return(e.align?`<${n} align="${e.align}">`:`<${n}>`)+t+`</${n}>
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${Wt(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){let r=this.parser.parseInline(n),s=bi(e);if(s===null)return r;e=s;let o='<a href="'+e+'"';return t&&(o+=' title="'+Wt(t)+'"'),o+=">"+r+"</a>",o}image({href:e,title:t,text:n,tokens:r}){r&&(n=this.parser.parseInline(r,this.parser.textRenderer));let s=bi(e);if(s===null)return Wt(n);e=s;let o=`<img src="${e}" alt="${n}"`;return t&&(o+=` title="${Wt(t)}"`),o+=">",o}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:Wt(e.text)}},xs=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},Mt=class ms{constructor(t){ze(this,"options");ze(this,"renderer");ze(this,"textRenderer");this.options=t||_n,this.options.renderer=this.options.renderer||new Ar,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new xs}static parse(t,n){return new ms(n).parse(t)}static parseInline(t,n){return new ms(n).parseInline(t)}parse(t){let n="";for(let r=0;r<t.length;r++){let s=t[r];if(this.options.extensions?.renderers?.[s.type]){let i=s,l=this.options.extensions.renderers[i.type].call({parser:this},i);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(i.type)){n+=l||"";continue}}let o=s;switch(o.type){case"space":{n+=this.renderer.space(o);break}case"hr":{n+=this.renderer.hr(o);break}case"heading":{n+=this.renderer.heading(o);break}case"code":{n+=this.renderer.code(o);break}case"table":{n+=this.renderer.table(o);break}case"blockquote":{n+=this.renderer.blockquote(o);break}case"list":{n+=this.renderer.list(o);break}case"checkbox":{n+=this.renderer.checkbox(o);break}case"html":{n+=this.renderer.html(o);break}case"def":{n+=this.renderer.def(o);break}case"paragraph":{n+=this.renderer.paragraph(o);break}case"text":{n+=this.renderer.text(o);break}default:{let i='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return n}parseInline(t,n=this.renderer){let r="";for(let s=0;s<t.length;s++){let o=t[s];if(this.options.extensions?.renderers?.[o.type]){let l=this.options.extensions.renderers[o.type].call({parser:this},o);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){r+=l||"";continue}}let i=o;switch(i.type){case"escape":{r+=n.text(i);break}case"html":{r+=n.html(i);break}case"link":{r+=n.link(i);break}case"image":{r+=n.image(i);break}case"checkbox":{r+=n.checkbox(i);break}case"strong":{r+=n.strong(i);break}case"em":{r+=n.em(i);break}case"codespan":{r+=n.codespan(i);break}case"br":{r+=n.br(i);break}case"del":{r+=n.del(i);break}case"text":{r+=n.text(i);break}default:{let l='Token with "'+i.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return r}},$r,Yn=($r=class{constructor(e){ze(this,"options");ze(this,"block");this.options=e||_n}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?Pt.lex:Pt.lexInline}provideParser(){return this.block?Mt.parse:Mt.parseInline}},ze($r,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),ze($r,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),$r),od=class{constructor(...e){ze(this,"defaults",gs());ze(this,"options",this.setOptions);ze(this,"parse",this.parseMarkdown(!0));ze(this,"parseInline",this.parseMarkdown(!1));ze(this,"Parser",Mt);ze(this,"Renderer",Ar);ze(this,"TextRenderer",xs);ze(this,"Lexer",Pt);ze(this,"Tokenizer",Sr);ze(this,"Hooks",Yn);this.use(...e)}walkTokens(e,t){let n=[];for(let r of e)switch(n=n.concat(t.call(this,r)),r.type){case"table":{let s=r;for(let o of s.header)n=n.concat(this.walkTokens(o.tokens,t));for(let o of s.rows)for(let i of o)n=n.concat(this.walkTokens(i.tokens,t));break}case"list":{let s=r;n=n.concat(this.walkTokens(s.items,t));break}default:{let s=r;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let i=s[o].flat(1/0);n=n.concat(this.walkTokens(i,t))}):s.tokens&&(n=n.concat(this.walkTokens(s.tokens,t)))}}return n}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{let r={...n};if(r.async=this.defaults.async||r.async||!1,n.extensions&&(n.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=t.renderers[s.name];o?t.renderers[s.name]=function(...i){let l=s.renderer.apply(this,i);return l===!1&&(l=o.apply(this,i)),l}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=t[s.level];o?o.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),r.extensions=t),n.renderer){let s=this.defaults.renderer||new Ar(this.defaults);for(let o in n.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let i=o,l=n.renderer[i],a=s[i];s[i]=(...d)=>{let p=l.apply(s,d);return p===!1&&(p=a.apply(s,d)),p||""}}r.renderer=s}if(n.tokenizer){let s=this.defaults.tokenizer||new Sr(this.defaults);for(let o in n.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let i=o,l=n.tokenizer[i],a=s[i];s[i]=(...d)=>{let p=l.apply(s,d);return p===!1&&(p=a.apply(s,d)),p}}r.tokenizer=s}if(n.hooks){let s=this.defaults.hooks||new Yn;for(let o in n.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let i=o,l=n.hooks[i],a=s[i];Yn.passThroughHooks.has(o)?s[i]=d=>{if(this.defaults.async&&Yn.passThroughHooksRespectAsync.has(o))return(async()=>{let _=await l.call(s,d);return a.call(s,_)})();let p=l.call(s,d);return a.call(s,p)}:s[i]=(...d)=>{if(this.defaults.async)return(async()=>{let _=await l.apply(s,d);return _===!1&&(_=await a.apply(s,d)),_})();let p=l.apply(s,d);return p===!1&&(p=a.apply(s,d)),p}}r.hooks=s}if(n.walkTokens){let s=this.defaults.walkTokens,o=n.walkTokens;r.walkTokens=function(i){let l=[];return l.push(o.call(this,i)),s&&(l=l.concat(s.call(this,i))),l}}this.defaults={...this.defaults,...r}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Pt.lex(e,t??this.defaults)}parser(e,t){return Mt.parse(e,t??this.defaults)}parseMarkdown(e){return(t,n)=>{let r={...n},s={...this.defaults,...r},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&r.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=e),s.async)return(async()=>{let i=s.hooks?await s.hooks.preprocess(t):t,l=await(s.hooks?await s.hooks.provideLexer():e?Pt.lex:Pt.lexInline)(i,s),a=s.hooks?await s.hooks.processAllTokens(l):l;s.walkTokens&&await Promise.all(this.walkTokens(a,s.walkTokens));let d=await(s.hooks?await s.hooks.provideParser():e?Mt.parse:Mt.parseInline)(a,s);return s.hooks?await s.hooks.postprocess(d):d})().catch(o);try{s.hooks&&(t=s.hooks.preprocess(t));let i=(s.hooks?s.hooks.provideLexer():e?Pt.lex:Pt.lexInline)(t,s);s.hooks&&(i=s.hooks.processAllTokens(i)),s.walkTokens&&this.walkTokens(i,s.walkTokens);let l=(s.hooks?s.hooks.provideParser():e?Mt.parse:Mt.parseInline)(i,s);return s.hooks&&(l=s.hooks.postprocess(l)),l}catch(i){return o(i)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let r="<p>An error occurred:</p><pre>"+Wt(n.message+"",!0)+"</pre>";return t?Promise.resolve(r):r}if(t)return Promise.reject(n);throw n}}},fn=new od;function qe(e,t){return fn.parse(e,t)}qe.options=qe.setOptions=function(e){return fn.setOptions(e),qe.defaults=fn.defaults,wi(qe.defaults),qe};qe.getDefaults=gs;qe.defaults=_n;qe.use=function(...e){return fn.use(...e),qe.defaults=fn.defaults,wi(qe.defaults),qe};qe.walkTokens=function(e,t){return fn.walkTokens(e,t)};qe.parseInline=fn.parseInline;qe.Parser=Mt;qe.parser=Mt.parse;qe.Renderer=Ar;qe.TextRenderer=xs;qe.Lexer=Pt;qe.lexer=Pt.lex;qe.Tokenizer=Sr;qe.Hooks=Yn;qe.parse=qe;var Tf=qe.options,Ef=qe.setOptions,Cf=qe.use,Rf=qe.walkTokens,If=qe.parseInline;var Lf=Mt.parse,Df=Pt.lex;function Jt(e){let t=qe.parse(e),n=ui.sanitize(t);return _i(n)}function Gt(e,t){return c`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function Tn(e){return e.loading?c`<div class="prompt-block__status">불러오는 중…</div>`:e.error?c`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function Cr(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=r=>String(r).padStart(2,"0");return`${t.getFullYear()}-${n(t.getMonth()+1)}-${n(t.getDate())} ${n(t.getHours())}:${n(t.getMinutes())}`}var id={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},ad=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,ld=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function en(e){return!!e&&typeof e=="object"}function Ss(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function Li(e,t){let n=Ss(e),r=Ss(t),s=new Map;for(let l of n)s.set(l,(s.get(l)||0)+1);let o=0;for(let l of r){let a=s.get(l)||0;a>0?s.set(l,a-1):o+=1}let i=0;for(let l of s.values())i+=l;return{added:o,removed:i}}function cd(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(s=>en(s)&&typeof s.text=="string"?s.text:"").join(""):en(e)&&typeof e.text=="string"&&(t=e.text);let r=(String(t).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return r.length>120?`${r.slice(0,117)}\u2026`:r}function dd(e){let t=String(e.name||""),n=e.input||{},r={kind:"tool",tool:t,icon:id[t]||"\u{1F527}",input:n,expandable:!0};if((t==="Read"||t==="Write")&&(r.path=String(n.file_path||n.path||"")),t==="Write"&&(r.added=Ss(n.content).length),t==="Edit"){r.path=String(n.file_path||n.path||"");let{added:s,removed:o}=Li(n.old_string,n.new_string);r.added=s,r.removed=o}if(t==="MultiEdit"){r.path=String(n.file_path||n.path||"");let s=0,o=0,i=Array.isArray(n.edits)?n.edits:[];for(let l of i){let a=Li(en(l)?l.old_string:"",en(l)?l.new_string:"");s+=a.added,o+=a.removed}r.added=s,r.removed=o}return t==="Bash"&&(r.command=String(n.command||"")),(t==="Grep"||t==="Glob")&&(r.command=String(n.pattern||n.query||"")),r}function Di(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}function Oi(e){let t=e.split(/\r?\n/).find(r=>r.trim().length>0)||"",n=ad.exec(t);return n?{kind:"gate",gate:n[2]==="implementation"?"impl":n[2],reviewer:n[3],verdict:n[4],time:n[5]?n[5].trim():void 0,text:t.trim()}:ld.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function ud(e,t){if(e.type==="assistant"){let n=e.message,r=n&&Array.isArray(n.content)?n.content:[],s=[];for(let o of r)if(en(o)){if(o.type==="text"&&typeof o.text=="string")s.push(Oi(o.text));else if(o.type==="thinking"){let i=Di(o.thinking);i&&s.push(i)}else if(o.type==="tool_use"){let i=dd(o);typeof o.id=="string"&&t.set(o.id,i),s.push(i)}}return s}if(e.type==="user"){let n=e.message,r=n&&Array.isArray(n.content)?n.content:[];for(let s of r)if(en(s)&&s.type==="tool_result"){let o=t.get(String(s.tool_use_id));if(o){let i=cd(s.content);o.result=i,o.output=typeof s.content=="string"?s.content:i}}return[]}if(e.type==="result"){let n=e.is_error===!1&&e.subtype==="success";return[{kind:"result",success:n,text:typeof e.result=="string"?e.result:n?"DONE":""}]}return[]}function pd(e){if(e.type==="item.completed"&&en(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[Oi(t.text)];if(t.type==="reasoning"){let n=Di(t.text);return n?[n]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function fd(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function Pi(e){let t=[],n=new Map,r=Array.isArray(e)?e:[];for(let s of r){let o=s;if(typeof s=="string"){let l=s.trim();if(l.length===0)continue;try{o=JSON.parse(l)}catch{continue}}if(!en(o))continue;let i=fd(o)?pd(o):ud(o,n);for(let l of i)t.push(l)}return t}var _d=5,md=10,gd=/Task\s+#(\d+)/,hd=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,bd=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function Rr(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function vd(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function yd(e){for(let t=e.length-1;t>=0;t-=1){let n=e[t];if(n.kind==="phase"||n.kind==="gate")return n.text||null}return null}function wd(e){let t=new Map,n=0;for(let s of e){if(s.kind!=="tool")continue;n+=1;let o=s.input||{};if(s.tool==="TaskCreate"){let a=gd.exec(s.output||s.result||""),d=String(o.activeForm||o.subject||"").trim();if(!a||d.length===0)continue;t.set(a[1],{label:d,active:o.status==="in_progress"?n:0});continue}if(s.tool!=="TaskUpdate")continue;let i=t.get(String(o.taskId??""));if(!i)continue;let l=o.activeForm||o.subject;typeof l=="string"&&l.trim().length>0&&(i.label=l.trim()),typeof o.status=="string"&&(i.active=o.status==="in_progress"?n:0)}let r=null;for(let s of t.values())s.active>0&&(!r||s.active>r.active)&&(r=s);return r?r.label:null}function kd(e){if(e.tool==="Bash"){let t=e.command||"";return hd.test(t)?"~ PR/\uAC8C\uC2DC \uC911":bd.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function $d(e){let t=e.filter(s=>s.kind==="tool").slice(-md),n=new Map;t.forEach((s,o)=>{let i=kd(s);if(!i)return;let l=n.get(i)||{count:0,last:-1};l.count+=1,l.last=o,n.set(i,l)});let r=null;for(let[s,o]of n)(!r||o.count>r.count||o.count===r.count&&o.last>r.last)&&(r={label:s,count:o.count,last:o.last});return r?r.label:null}function xd(e){let t=yd(e);if(t)return{text:t,guess:!1};let n=wd(e);if(n)return{text:n,guess:!1};let r=$d(e);return r?{text:r,guess:!0}:null}function Sd(e,t){if(typeof e!="number")return"";let n=Math.max(0,Math.floor((t-e)/1e3));return n<60?`${n}\uCD08 \uC804`:Tt(e,t)}function Ir(e,t={}){let{transport:n,sessionLogStore:r,onClose:s}=t,o=null,i={},l=!0,a=new Set,d=new Set,p=null,_=null,v=!1,T=!1,k=!1,h=null,A=null;function V(){v=!1,T=!1,k=!1,h=null,A=null}async function K(F){if(n){T=!0,k=!1,D();try{let O=await Promise.resolve(n("get-attempt-prompt",{attempt_id:F}));if(o!==F)return;!O||typeof O!="object"||Array.isArray(O)?k=!0:(h=O,A=F)}catch{o===F&&(k=!0)}finally{o===F&&(T=!1,D())}}}function ne(){if(v=!v,v&&o&&A!==o){K(o);return}D()}function q(){if(!v)return"";let F=Tn({loading:T,error:k});if(F)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        ${F}
      </div>`;if(!h)return"";if(h.missing)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let O=Cr(h.recorded_at);return c`<div class="sv__prompt" data-seam="attempt-prompt">
      ${O?c`<div class="prompt-block__meta">${O} 발송</div>`:""}
      ${typeof h.task_prompt=="string"?Gt("\uACFC\uC5C5 (user)",h.task_prompt):""}
      ${typeof h.system_prompt=="string"?Gt("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",h.system_prompt):""}
    </div>`}function L(){if(!o||!r)return[];let F=r.get(o);return Pi(F?F.lines:[])}function S(){if(!o||!r)return null;let F=r.get(o),O=F?F.last_event_at:null;return typeof O=="number"?O:null}function R(){return i.status==="running"}function H(){if(R()&&o){_||(_=setInterval(()=>D(),1e3));return}pe()}function pe(){_&&(clearInterval(_),_=null)}function $e(F){let O=[],re=0;for(;re<F.length;){let xe=F[re];if(xe.kind==="tool"){let Re=re;for(;Re<F.length&&F[Re].kind==="tool"&&F[Re].tool===xe.tool;)Re+=1;if(Re-re>=_d&&!d.has(re)){O.push({kind:"group",idx:re,tool:xe.tool||"",lines:F.slice(re,Re).map((M,B)=>({idx:re+B,line:M}))}),re=Re;continue}}O.push({kind:"line",idx:re,line:xe}),re+=1}return O}function me(F){for(let O=F.length-1;O>=0;O-=1){let re=F[O];if(re.kind==="result"||re.kind==="error")return null;if(re.kind==="tool"&&!Object.hasOwn(re,"result"))return re}return null}function fe(F){for(let O=F.length-1;O>=0;O-=1)if(F[O].kind==="thinking")return F[O];return null}function Ee(F,O){if(O.kind==="gate")return c`<div class="sv__gate">${O.text}</div>`;if(O.kind==="phase")return c`<div class="sv__phase">${O.text}</div>`;if(O.kind==="result")return c`<div
        class="sv__result${O.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${O.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${Jt(O.text||(O.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(O.kind==="thinking"){let re=a.has(F);return c`<div
        class="sv__think${re?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>_e(F)}
      >
        <span class="sv__think-line">💭 ${Rr(O.text)}</span>
        ${re?c`<pre class="sv__think-expand">${O.text}</pre>`:""}
      </div>`}if(O.kind==="error")return c`<div class="sv__error">⛔ ${O.text}</div>`;if(O.kind==="blocker")return c`<div class="sv__error">⛔ ${O.text}</div>`;if(O.kind==="tool"){let re=a.has(F),xe=O.tool==="Bash"?vd(O.command):0,Re=O.tool==="Bash"?xe>1?Rr(O.command):O.command:O.path||O.command||"";return c`<div
        class="sv__tool${re?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>_e(F)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${O.icon}</span>
          <span class="sv__tool-name">${O.tool}</span>
          ${Re?c`<span class="sv__tool-detail">${Re}</span>`:""}
          ${xe>1?c`<span class="sv__tool-more">⋯ ${xe}줄</span>`:""}
          ${typeof O.added=="number"?c`<span class="sv__diff-add">+${O.added}</span>`:""}
          ${typeof O.removed=="number"?c`<span class="sv__diff-del">−${O.removed}</span>`:""}
          ${O.result?c`<span class="sv__tool-ok">→ ${O.result}</span>`:""}
        </span>
        ${re?c`<pre class="sv__tool-expand">${Ue(O)}</pre>`:""}
      </div>`}return c`<div class="sv__as">${Jt(O.text||"")}</div>`}function Ue(F){let O=[];if(F.tool==="Bash"&&typeof F.command=="string"&&F.command.length>0)O.push(F.command);else if(F.input!==void 0)try{O.push(`input: ${JSON.stringify(F.input,null,2)}`)}catch{}return typeof F.output=="string"&&F.output.length>0&&O.push(`output:
${F.output}`),O.join(`

`)}function Ke(){if(!o)return c``;let F=L(),O=[i.runner,i.model,i.effort].filter(Boolean).join(" \xB7 "),re=i.session_id||"",xe=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${l?"ON":"OFF"}`,Re=R(),M=Re?Sd(S(),Date.now()):"",B=Re?me(F):null,P=Re?fe(F):null,ae=xd(F);return c`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id">${o}</span>
        ${ae?c`<span
              class="sv__stage${ae.guess?" sv__stage--guess":""}"
              title=${ae.text}
              >${ae.text}</span
            >`:""}
        ${Re?c`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${M?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${M}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${M?c`<span class="sv__live-ago">${M}</span>`:""}</span
            >`:""}
        ${re?c`<button
              type="button"
              class="sv__session"
              title=${re}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${re}`}
              @click=${()=>we(re)}
            >
              ⧉ ${re.slice(0,8)}
            </button>`:""}
        ${O?c`<span class="sv__meta">${O}</span>`:""}
        ${i.worktree?c`<span class="sv__wt" title=${i.worktree}
              >${i.worktree}</span
            >`:""}
        <button
          type="button"
          class="sv__prompt-toggle${v?" sv__prompt-toggle--on":""}"
          data-seam="attempt-prompt-toggle"
          aria-pressed=${v?"true":"false"}
          aria-label="발송 프롬프트 보기"
          title="이 세션에 실제로 보낸 시스템·과업 프롬프트"
          @click=${ne}
        >
          ✉ 프롬프트
        </button>
        <button
          type="button"
          class="sv__follow${l?" sv__follow--on":""}"
          aria-pressed=${l?"true":"false"}
          aria-label=${xe}
          @click=${oe}
        >
          <span class="sv__follow-full">⇣ ${xe}</span>
          <span class="sv__follow-short">⇣ ${l?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>Ce()}
        >
          ✕
        </button>
      </div>
      ${q()}
      <div class="sv__body">
        ${F.length===0?c`<div class="sv__empty">세션 로그 없음</div>`:$e(F).map(ce=>ce.kind==="group"?He(ce):Ee(ce.idx,ce.line))}
      </div>
      ${B||P?c`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${B?c`<span class="sv__now-icon">${B.icon}</span>
                  <span class="sv__now-name">${B.tool}</span>
                  <span class="sv__now-detail"
                    >${B.tool==="Bash"?Rr(B.command):B.path||B.command||""}</span
                  >`:""}
            ${P?c`<span class="sv__now-think"
                  >💭 ${Rr(P.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function He(F){return c`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>ke(F.idx)}
    >
      <span class="sv__group-icon">${F.lines[0].line.icon}</span>
      <span class="sv__group-name">${F.tool}</span>
      <span class="sv__group-count">${F.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function ke(F){d.add(F),D()}function D(){Oe(Ke(),e),H(),l&&U()}function U(){let F=e.querySelector(".sv__body");F&&(F.scrollTop=F.scrollHeight)}function _e(F){a.has(F)?a.delete(F):a.add(F),D()}function oe(){l=!l,D()}function we(F){un(F).then(O=>{O?se("\uBCF5\uC0AC\uB428","success",1200):se("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function ge(F){!o||!F||(i={...i,...F},D())}function Be(F){let O=F.target;if(!O||!O.classList||!O.classList.contains("sv__body"))return;!(O.scrollHeight-O.scrollTop-O.clientHeight<=4)&&l&&(l=!1,D())}e.addEventListener("scroll",Be,!0);function be(F){let O=F&&F.attempt_id;O&&(o=O,i=F.meta||{},l=!0,a.clear(),d.clear(),V(),!p&&r&&(p=r.subscribe(D)),n&&Promise.resolve(n("subscribe-session-log",{id:`session-log:${o}`,attempt_id:o})).catch(()=>{}),D())}function Ce(){let F=o;o=null,a.clear(),d.clear(),V(),pe(),n&&F&&Promise.resolve(n("unsubscribe-session-log",{id:`session-log:${F}`})).catch(()=>{}),Oe(c``,e),s&&s()}return{open:be,updateMeta:ge,close:Ce,isOpen(){return o!==null},destroy(){pe(),p&&(p(),p=null),e.removeEventListener("scroll",Be,!0),o=null,Oe(c``,e)}}}function Zn(e){let t=e&&typeof e=="object"?e:{},n=t.metadata&&typeof t.metadata=="object"?t.metadata:{},r=Mi(t.spec_id),s=Mi(n.spec_id);return r?{path:r,source:"native",conflict:s.length>0&&s!==r}:s?{path:s,source:"metadata",conflict:!1}:{path:"",source:"none",conflict:!1}}function Mi(e){return typeof e=="string"?e.trim():""}function Ad(e){return["plan_review","plan_approval","plan_check"].some(t=>{let n=e[t];return typeof n=="string"&&n.trim().length>0})}function Td(e){let t=e&&e.metadata||{},n=Zn(e),r=[];return n.path&&r.push({kind:"spec",path:n.path,missing_state:null}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&r.push({kind:"plan",path:t.plan_path.trim(),missing_state:Ad(t)?null:"plan_pending"}),r}function Ni(e,t){let n=Td(e);return c`
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
                  @click=${s=>t.onOpenDoc(s,r.path,r.missing_state)}
                >
                  열기
                </button>
              </div>`)}
          <div class="detail-art__cap">경로 클릭 = 복사 · 열기 = 뷰어</div>
        `}
  `}var Ed="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",Cd=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,Rd=/^\*\*결론\*\* — (.+)$/;function Fi(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==Ed)return null;let n=Cd.exec(t[1]||"");if(!n)return null;let r=n[1].split(" ")[0],s=n[2],o=n[3],i=2;for(;i<t.length&&t[i].trim().length===0;)i+=1;let l=i<t.length?Rd.exec(t[i]):null,a=l?l[1].replace(/\s+/g," ").trim():"",d=l?i+1:i;return{lane:r,identifier:s,timestamp:o,conclusion:a,body:t.slice(d).join(`
`).trim()}}var qi=20;function Bi(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let n=String(t.getMonth()+1).padStart(2,"0"),r=String(t.getDate()).padStart(2,"0"),s=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0");return`${n}-${r} ${s}:${o}`}function Id(e){return e.length>qi?`${e.slice(0,qi)}\u2026`:e}function Ld(e,t,n,r){let s=`${t.lane} ${Id(t.identifier)}`;return c`<div class="detail-report">
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
        <span class="detail-report__time">${Bi(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${r&&t.body.length>0?c`<div class="detail-report__body">
          ${Jt(t.body)}
        </div>`:""}
  </div>`}function Dd(e){return c`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${Bi(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${Jt(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function Ui(e,t={},n={}){let r=Array.isArray(e)?e.filter(Boolean):[],s=n.expanded||new Set,o=typeof n.draft=="string"?n.draft:"",i=n.sending===!0,l=r.slice().sort((a,d)=>String(d.created_at||"").localeCompare(String(a.created_at||"")));return c`
    <div class="detail-section-label">댓글 (${r.length})</div>
    ${n.error?c`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:l.length===0?c`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:c`<div class="detail-comments" data-seam="comments">
            ${l.map(a=>{let d=Fi(typeof a.text=="string"?a.text:"");return d?Ld(a,d,t,s.has(a.id)):Dd(a)})}
          </div>`}
    <div class="detail-comment-compose">
      <textarea
        class="detail-comment-compose__input"
        aria-label="댓글 추가"
        placeholder="댓글 추가"
        rows="3"
        ?disabled=${i}
        .value=${o}
        @input=${a=>t.onDraftInput&&t.onDraftInput(a.target.value)}
      ></textarea>
      <div class="detail-comment-compose__row">
        <button
          type="button"
          class="detail-comment-compose__btn"
          ?disabled=${i||o.trim().length===0}
          @click=${()=>t.onSubmit&&t.onSubmit()}
        >
          댓글 추가
        </button>
      </div>
    </div>
  `}var Od=["codex","opus","fable","self","skip"],Pd=["codex","fable","skip"],Md=["low","medium","high","xhigh"],Nd=["standard","fast_track"],En=["orchestration_model","orchestration_effort","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_runtime","impl_model","impl_effort"],Ts={orchestration_model:{title:"\uC6CC\uCEE4 \uC2E4\uD589 \uBAA8\uB378"},orchestration_effort:{title:"\uC6CC\uCEE4 reasoning effort"},spec_review_model:{title:"\uC2A4\uD399 \uB9AC\uBDF0\uC5B4"},spec_review_effort:{title:"\uC2A4\uD399 \uB9AC\uBDF0 reasoning effort"},plan_review_model:{title:"\uACC4\uD68D \uB9AC\uBDF0\uC5B4"},plan_review_effort:{title:"\uACC4\uD68D \uB9AC\uBDF0 reasoning effort"},impl_review_model:{title:"\uAD6C\uD604 \uB9AC\uBDF0\uC5B4"},impl_review_effort:{title:"\uAD6C\uD604 \uB9AC\uBDF0 reasoning effort"},impl_runtime:{title:"\uAD6C\uD604 runtime"},impl_model:{title:"\uAD6C\uD604 \uBAA8\uB378",help:"\uC6CC\uD06C\uD50C\uB85C\uAC00 \uBCF5\uC7A1 \uAD6C\uD604\uC778\uC9C0, \uBC94\uC704\uAC00 \uD55C\uC815\uB41C \uAD6C\uD604\uC778\uC9C0 \uD310\uB2E8\uD574 \uD604\uC7AC runtime\uC758 \uAD6C\uD604\uC6A9 \uBAA8\uB378\uC744 \uC120\uD0DD\uD569\uB2C8\uB2E4."},impl_effort:{title:"\uAD6C\uD604 reasoning effort",help:"\uC790\uB3D9 \uC120\uD0DD\uC774\uBA74 workflow tier\uC5D0 \uC120\uC5B8\uB41C effort\uB97C, \uBAA8\uB378\uB9CC \uC9C1\uC811 \uC9C0\uC815\uD588\uC73C\uBA74 \uD574\uB2F9 \uD558\uC704 \uC5D0\uC774\uC804\uD2B8 \uD638\uCD9C\uC758 \uAE30\uBCF8 effort\uB97C \uC0AC\uC6A9\uD569\uB2C8\uB2E4."},workflow_mode:{title:"\uC6CC\uD06C\uD50C\uB85C \uBAA8\uB4DC"}},zi={spec_review_effort:"spec_review_model",impl_review_effort:"impl_review_model",plan_review_effort:"plan_review_model"},Fd=["self","skip"],qd="opus",Es={orchestration_model:"(\uAE30\uBCF8: opus)",orchestration_effort:"(\uAE30\uBCF8: CLI \uAE30\uBCF8)",spec_review_model:"(\uAE30\uBCF8: codex)",spec_review_effort:"(\uAE30\uBCF8: \uD504\uB9AC\uC14B)",impl_review_model:"(\uAE30\uBCF8: codex)",impl_review_effort:"(\uAE30\uBCF8: \uD504\uB9AC\uC14B)",impl_runtime:"(\uAE30\uBCF8: orchestration runtime \uC0C1\uC18D)",plan_review_model:"(\uAE30\uBCF8: codex)",plan_review_effort:"(\uAE30\uBCF8: \uD504\uB9AC\uC14B)",impl_model:"(\uAE30\uBCF8: \uC791\uC5C5 \uC131\uACA9\uC5D0 \uB530\uB77C \uAD6C\uD604 \uBAA8\uB378 \uC790\uB3D9 \uC120\uD0DD)",impl_effort:"(\uAE30\uBCF8: \uC120\uD0DD\uB41C \uAD6C\uD604 \uC5D0\uC774\uC804\uD2B8\uC758 reasoning effort \uC0AC\uC6A9)"};function Cs(e){let t=Ts[e]||{title:e};return c`<span data-exec-setting-label>
    <span data-exec-setting-title>${t.title}</span>
    <code data-exec-setting-key>${e}</code>
    ${t.help?c`<small data-exec-setting-help=${e}>${t.help}</small>`:""}
  </span>`}function Bd(e,t,n=""){let r=t&&t[e];return typeof r=="string"&&r.length>0?`(\uAE30\uBCF8: ${r} \u2014 ${n||"\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4 \uD504\uB9AC\uC14B"})`:Es[e]||"(\uAE30\uBCF8)"}function Xn(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Qn(e){if(!Xn(e)||!Xn(e.runners))return null;let t=Object.entries(e.runners).filter(([,n])=>Xn(n)&&Xn(n.models));return t.length>0?t:null}function As(e){return{value:e,label:e}}function Rs(e){return{label:null,options:[{value:e,label:`${e} (\uBE44\uD638\uD658)`}]}}function Hi(e,t,n=null){let r=Qn(e);if(!r)return t?[{label:null,options:[As(t)]}]:[];let s=r.filter(([i])=>n===null||i===n).map(([i,l])=>({label:i,options:Object.keys(l.models).map(As)})),o=s.some(i=>i.options.some(l=>l.value===t));return t&&!o?[Rs(t),...s]:s}function mn(e,t){let n={label:null,options:e.map(As)};return t&&!e.includes(t)?[Rs(t),n]:[n]}function Yt(e,t){let n=Qn(e);if(!n||!t)return null;for(let[r,s]of n)if(Object.hasOwn(s.models,t))return r;return null}function Gi(e,t){return Xn(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function Lr(e,t){let n=Qn(e);if(!n||!t)return[];for(let[,r]of n)if(Object.hasOwn(r.models,t))return Gi(r,r.models[t]);return[]}function Yi(e){let t=Qn(e);if(!t)return[];let n=[];for(let[,r]of t)for(let s of Object.values(r.models))for(let o of Gi(r,s))n.includes(o)||n.push(o);return n}function Vi(e,t){if(!t)return Yi(e);let r=Qn(e)?.find(([o])=>o===t)?.[1];if(!r)return[];let s=[];for(let o of Object.keys(r.models))for(let i of Lr(e,o))s.includes(i)||s.push(i);return s}function Or(e,t,n){let r={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},s=r.impl_runtime==="inherit"?n:r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:null;if(r.impl_runtime==="inherit"&&!s)return r.impl_model="",r.impl_effort="",r;let o=Yt(t,r.impl_model);if(r.impl_model&&(!s||o!==s))return r.impl_model="",r.impl_effort="",r;let i=r.impl_model?Lr(t,r.impl_model):Vi(t,s);return r.impl_effort&&i.length>0&&!i.includes(r.impl_effort)&&(r.impl_effort=""),r}function Cn(e){let{selectedOf:t,effectiveOf:n,runner_catalog:r,controller_runtime:s}=e,o=n("orchestration_model")||qd,i=n("impl_model"),l=n("impl_runtime"),a=l==="claude"||l==="codex"?l:l==="inherit"?s===void 0?Yt(r,o):s:null;return En.map(d=>{let p=t(d),_,v=!1;return d==="orchestration_model"?_=Hi(r,p):d==="impl_runtime"?_=mn(["inherit","claude","codex"],p):d==="impl_model"?(_=a?Hi(r,p,a):p?[Rs(p)]:[],v=l==="inherit"&&a===null):d==="orchestration_effort"?_=mn(Lr(r,o),p):d==="impl_effort"?(_=mn(i?Lr(r,i):a?Vi(r,a):Yi(r),p),v=l==="inherit"&&a===null):d==="plan_review_model"?_=mn(Pd,p):Object.hasOwn(zi,d)?(_=mn(Md,p),v=Fd.includes(n(zi[d]))):_=mn(Od,p),{key:d,groups:_,selected:p,disabled:v,runner:d==="orchestration_model"?Yt(r,o):null}})}function Dr(e,t,n){return c`
    ${typeof n=="string"?c`<option value="" ?selected=${!t}>${n}</option>`:""}
    ${e.map(r=>r.label===null?r.options.map(s=>ji(s,t)):c`<optgroup label=${r.label}>
            ${r.options.map(s=>ji(s,t))}
          </optgroup>`)}
  `}function ji(e,t){return c`<option value=${e.value} ?selected=${e.value===t}>
    ${e.label}
  </option>`}function Wi(e,t,n,r,s,o,i){return c`
    <div class="detail-kv">
      <span class="detail-kv__k">${Cs(e)}</span>
      <span class="detail-kv__vgroup">
        <select
          class=${r?"detail-kv__v detail-kv__v--sel":"detail-kv__v"}
          aria-label=${e}
          data-key=${e}
          ?disabled=${s}
          @change=${l=>(e==="impl_runtime"||e==="impl_model"||e==="impl_effort")&&i.onImplTargetChange?i.onImplTargetChange(e,l.target.value):i.onChange(e,l.target.value)}
        >
          ${t}
        </select>
        ${o?c`<span class="detail-kv__note" data-runner-for=${e}
              >${o}</span
            >`:""}
      </span>
    </div>
  `}function Ki(e,t,n,r,s=""){let o=e&&e.metadata||{},i=n&&typeof n=="object"?n:{},l=_=>typeof o[_]=="string"?o[_]:"",d=Cn({selectedOf:l,effectiveOf:_=>{let v=l(_);return v||(typeof i[_]=="string"?i[_]:"")},runner_catalog:r}),p=o.workflow_mode==="fast_track"?"fast_track":"standard";return c`
    <div class="detail-section-label">실행 설정 (수정 가능)</div>
    ${d.map(_=>Wi(_.key,Dr(_.groups,_.selected,Bd(_.key,i,s)),_.selected,!1,_.disabled,_.runner,t))}
    ${Wi("workflow_mode",Dr(mn(Nd,p),p),p,o.workflow_mode==="fast_track",!1,null,t)}
  `}function Ud(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function Zi(e,t){let n=t.getWorkspacePath,r=t.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",i="",l="";function a(k){k.key==="Escape"&&s&&(k.preventDefault(),v())}document.addEventListener("keydown",a);function d(){return s?c`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>v()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${Ud(s)}</span
            >
            <button
              type="button"
              class="mv__close"
              aria-label="닫기"
              @click=${()=>v()}
            >
              ✕
            </button>
          </div>
          <div class="mv__body">
            ${o==="loading"?c`<div class="mv__status">불러오는 중…</div>`:o==="pending"?c`<div class="mv__status">${l}</div>`:o==="error"?c`<div class="mv__status mv__status--error">
                      ${l||"\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}
                    </div>`:Jt(i)}
          </div>
        </div>
      </div>
    `:c``}function p(){Oe(d(),e)}async function _(k,h={}){s=k,o="loading",i="",l="",p();let A=n?n():"";if(!A){o="error",l="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",p();return}if(!r){o="error",l="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",p();return}let V="/api/doc?workspace="+encodeURIComponent(A)+"&path="+encodeURIComponent(k);try{let K=await r(V),ne=await K.json().catch(()=>({}));if(!K.ok||!ne||ne.ok!==!0){if(ne?.error==="not_found"&&h.missing_state==="plan_pending"){o="pending",l="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",p();return}o="error",l="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(ne&&ne.error||K.status)+")",p();return}i=String(ne.content||""),o="ready",p()}catch{o="error",l="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",p()}}function v(){s=null,Oe(c``,e)}function T(){document.removeEventListener("keydown",a),v()}return{open:_,close:v,destroy:T}}var zd=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"},{key:"cache_creation_input_tokens",label:"\uCE90\uC2DC \uC0DD\uC131"}],Xi="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function Hd(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function jd(e){let t=Sn(e);if(!t||!e)return"";let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return c`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${t.replace(/^τ /,"\u03C4 \uCD1D ")}${n}</span
    >${e.replayed?c`<span class="detail-usage-partial" title=${Xi}
          >부분 집계</span
        >`:""}`}function Wd(e){let t=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null;return c`<div class="detail-session__usage-detail">
    ${zd.map(n=>c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${n.label}</span
          ><span class="detail-session__usage-value"
            >${Hd(e[n.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${t===null?"":c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${t.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?c`<span class="detail-session__usage-note">${Xi}</span>`:""}
  </div>`}var Gd={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function Yd(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=String(t.getHours()).padStart(2,"0"),r=String(t.getMinutes()).padStart(2,"0");return`${n}:${r}`}function Vd(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,r])=>typeof r=="string"&&r.length>0).map(([r,s])=>`${r}=${s}`).join(" \xB7 "):"",n=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return c`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${n}</span>
    ${t?c`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}function Qi(e,t={},n={}){let r=Array.isArray(e)?e:[],s=n.expanded||new Set;if(r.length===0)return c`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let o=new Set;for(let d of r)d&&typeof d.resumed_from=="string"&&d.resumed_from.length>0&&o.add(d.resumed_from);let i=d=>{if(!(d.status==="failed"||d.status==="orphaned"))return"";let _=typeof d.session_id=="string"&&d.session_id.length>0,v=o.has(d.attempt_id),T=_&&!v,k=_?v?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return c`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${d.attempt_id}
      ?disabled=${!T}
      title=${k}
      @click=${h=>{h.stopPropagation(),T&&t.onResume&&t.onResume(d.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},l=d=>{if(!(d.status==="failed"||d.status==="orphaned")||typeof d.cause!="string"||d.cause==="")return"";let _=d.cause_detail,v=_&&typeof _.reason=="string"&&_.reason.length>0?typeof _.command=="string"&&_.command.length>0?`${_.reason} \xB7 ${_.command}`:_.reason:d.cause;return c`<div class="detail-session__cause" title=${v}>
      ${d.cause}
    </div>`},a=d=>{if(!Sn(d.usage))return"";let p=s.has(d.attempt_id);return c`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${d.attempt_id}
      aria-expanded=${p?"true":"false"}
      title=${p?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${_=>{_.stopPropagation(),t.onToggleUsage&&t.onToggleUsage(d.attempt_id)}}
    >
      τ 자세히
    </button>`};return c`
    <div class="detail-section-label">
      세션 이력${jd(n.total)}
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
                >${Gd[d.status||""]||"\xB7"}</span
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
              ${Sn(d.usage)?c`<span class="detail-session__usage"
                    >${Sn(d.usage)}</span
                  >`:""}
              <span class="detail-session__time"
                >${Yd(d.started_at)}</span
              >
            </button>
            ${a(d)} ${i(d)} ${l(d)}
            ${Vd(d)}
            ${s.has(d.attempt_id)&&d.usage?Wd(d.usage):""}
          </div>`)}
    </div>
  `}function Ji(e,t={}){return c`
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
          ${Kd(e)}
        </div>`:""}
  `}function Kd(e){let t=Tn(e);if(t)return t;let n=e.data;if(!n)return"";if(n.missing)return c`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof n.default_task_prompt=="string"?Gt("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",n.default_task_prompt):""}`;let r=Cr(n.recorded_at);return c`<div class="detail-prompt__meta">
      ${n.attempt_id}${r?` \xB7 ${r}`:""}
    </div>
    ${typeof n.task_prompt=="string"?Gt("\uACFC\uC5C5 (user)",n.task_prompt):""}
    ${typeof n.system_prompt=="string"?Gt("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",n.system_prompt):""}`}var Zd=["open","in_progress","deferred","resolved","closed"],Xd=[0,1,2,3,4];function ea(e,t){let n=t.issueStores,r=t.onClose,s=t.transport,o=t.onNavigate,i=t.queueStore,l=t.execPresetStore,a=t.sessionLogStore,d=null,p=null,_={},v="",T=!1,k=!1,h=!1,A="",V="",K="";function ne(){k=!1,h=!1,A="",V="",K=""}let q=[],L=null,S=null,R=!1,H="",pe=!1,$e=0,me=new Set;function fe(){q=[],L=null,S=null,R=!1,H="",pe=!1,$e+=1,me.clear()}async function Ee(g){if(!s)return;let I=++$e;try{let x=await Promise.resolve(s("get-comments",{id:g}));if(I!==$e||g!==d)return;q=Array.isArray(x)?x:[],R=!1}catch{if(I!==$e||g!==d)return;R=!0}Z()}function Ue(){if(!s||!d)return;let g=p&&typeof p.comment_count=="number"?p.comment_count:null;if(L!==d){L=d,S=g,Ee(d);return}g!==null&&g!==S&&(S=g,Ee(d))}function Ke(g){me.has(g)?me.delete(g):me.add(g),Z()}function He(g){let I=H.trim().length===0;H=g,I!==(g.trim().length===0)&&Z()}async function ke(){let g=H.trim();if(!s||!d||g.length===0||pe)return;let I=d;pe=!0,Z();let x=!1;try{let Y=await Promise.resolve(s("add-comment",{id:I,text:g}));Array.isArray(Y)&&Y.length>0&&(x=!0,I===d&&(q=Y,R=!1,H="",S=Y.length))}catch{x=!1}x||se("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),I===d&&(pe=!1),Z()}let D={onToggle:Ke,onDraftInput:He,onSubmit:ke},U=document.createElement("div");U.className="md-viewer-root",document.body.appendChild(U);let _e=Zi(U,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),oe=document.createElement("div");oe.className="session-log-root",document.body.appendChild(oe);let we=Ir(oe,{transport:s?(g,I)=>Promise.resolve(s(g,I)):void 0,sessionLogStore:a}),ge=!1,Be=!1,be=!1,Ce=null,F=null,O=0;function re(g){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${g}`}function xe(){ge=!1,Be=!1,be=!1,Ce=null,F=null,O+=1}async function Re(g){if(!s)return;let I=++O;Be=!0,be=!1,Z();try{let x=await Promise.resolve(s("get-bead-prompt",{bead_id:g}));if(I!==O)return;!x||typeof x!="object"||Array.isArray(x)?be=!0:(Ce=x,F=re(g))}catch{I===O&&(be=!0)}finally{I===O&&(Be=!1,Z())}}function M(){if(ge=!ge,ge&&d&&F!==re(d)){Ce=null,Re(d);return}Z()}function B(){if(!i||!d)return[];let g=i.get();return(g&&g.attempts?Object.values(g.attempts):[]).filter(x=>x&&x.bead_id===d).sort((x,Y)=>(Y.started_at||0)-(x.started_at||0)).map(x=>({attempt_id:x.attempt_id,bead_id:x.bead_id,status:x.status,started_at:typeof x.started_at=="number"?x.started_at:null,runner:x.runner||null,model:x.model||null,session_id:x.session_id||null,resumed_from:x.resumed_from||null,dismissed_at:typeof x.dismissed_at=="number"?x.dismissed_at:null,cause:typeof x.cause=="string"?x.cause:null,cause_detail:x.cause_detail||null,exec_default_preset_id:typeof x.exec_default_preset_id=="string"?x.exec_default_preset_id:null,exec_default_preset_revision:typeof x.exec_default_preset_revision=="number"?x.exec_default_preset_revision:null,exec_values:x.exec_values&&typeof x.exec_values=="object"?x.exec_values:null,usage:x.usage||null}))}function P(){if(!i||!d)return null;let g=i.get();return qt(g&&g.attempts||{},d)}let ae=new Set;function ce(g){ae.has(g)?ae.delete(g):ae.add(g),Z()}function w(g){let I=i?i.get():null,x=I&&I.attempts?I.attempts[g]:null;we.open({attempt_id:g,meta:x?{runner:x.runner||void 0,model:x.model||void 0,effort:x.effort||void 0,status:x.status||void 0,session_id:x.session_id||void 0}:{}})}async function W(g){if(!s||!g)return;let I=()=>{let Y=i?i.get():null;return Y&&typeof Y.revision=="number"?Y.revision:0},x=await s("worker-attempt-resume",{attempt_id:g,expected_revision:I()});if(x&&x.conflict){let Y=x.queue&&typeof x.queue.revision=="number"?x.queue.revision:I();x=await s("worker-attempt-resume",{attempt_id:g,expected_revision:Y})}x&&x.resumed===!1&&!x.conflict&&x.reason&&se(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${x.reason}`,"error",2400)}let j={onOpen:w,onResume:W,onToggleUsage:ce};function J(){let g=i?i.get():null,I=g&&g.default_exec_preset_id,x=typeof I=="string"?Ze()?.presets.find(Y=>Y.id===I):null;return x&&x.compatible!==!1&&x.settings?x.settings:{}}function de(){let g=i?i.get():null,I=g&&g.default_exec_preset_id,x=typeof I=="string"?Ze()?.presets.find(Y=>Y.id===I):null;return x&&x.compatible!==!1&&typeof x.name=="string"?x.name:""}function Te(){let g=i?i.get():null;return g&&g.runner_catalog||null}function Ne(){let g=p?.metadata&&typeof p.metadata=="object"?p.metadata:{},x=(Object.hasOwn(_,"orchestration_model")?_.orchestration_model:void 0)||(typeof g.orchestration_model=="string"?g.orchestration_model:"")||(typeof J().orchestration_model=="string"?J().orchestration_model:"")||"opus";return Yt(Te(),x)}function Ze(){let g=l?l.get():null;return!g||typeof g.revision!="number"?null:{revision:g.revision,presets:Array.isArray(g.presets)?g.presets:[]}}function Xe(g){let I=g&&g.settings&&typeof g.settings=="object"?g.settings:{},x=Y=>typeof I[Y]=="string"?I[Y]:Y==="impl_runtime"&&typeof I.impl_model=="string"&&Yt(Te(),I.impl_model)||"";return Cn({selectedOf:x,effectiveOf:x,runner_catalog:Te()}).some(Y=>Y.groups.some(Pe=>Pe.options.some(rt=>rt.value===Y.selected&&rt.label.endsWith("(\uBE44\uD638\uD658)"))))}function lt(g){l&&g&&typeof g.revision=="number"&&Array.isArray(g.presets)&&l.set({revision:g.revision,presets:g.presets})}async function st(){let g=Ze(),I=g?.presets.find(x=>x.id===v);if(!(!s||!d||!g||!I||Xe(I)||T)){T=!0,Z();try{let x=await Promise.resolve(s("apply-exec-preset",{id:d,preset_id:I.id,expected_revision:g.revision}));if(x&&x.conflict){lt(x),se("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let Y=x&&Array.isArray(x.issue)?x.issue[0]:x?.issue;if(x&&x.applied&&Y&&typeof Y=="object"){p=Y;for(let Pe of En)delete _[Pe];se("\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",2400);return}x&&x.error==="bd_readback_failed"?se("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):se("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(x){x&&typeof x=="object"&&x.code==="bd_readback_failed"?se("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):se("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{T=!1,Z()}}}function pt(){let g=Ze();if(g&&g.presets.length===0)return c`<section class="detail-exec-presets">
        <div class="detail-section-label">실행 프리셋</div>
        <p>전역 실행 설정에서 프리셋을 추가하세요.</p>
        <button
          type="button"
          data-open-exec-presets
          @click=${()=>t.onOpenExecPresets?.()}
        >
          전역 실행 설정 열기
        </button>
      </section>`;let I=g?g.presets:[],x=I.find(Pe=>Pe.id===v),Y=x?Xe(x):!1;return c`<section class="detail-exec-presets">
      <div class="detail-section-label">실행 프리셋</div>
      <div class="detail-exec-presets__controls">
        <select
          data-exec-preset-select
          aria-label="실행 프리셋"
          ?disabled=${g===null||T}
          @change=${Pe=>{v=Pe.target.value,Z()}}
        >
          <option value="" ?selected=${v===""}>
            ${g===null?"\uBD88\uB7EC\uC624\uB294 \uC911\u2026":"\uD504\uB9AC\uC14B \uC120\uD0DD"}
          </option>
          ${I.map(Pe=>{let rt=Xe(Pe);return c`<option
              value=${Pe.id}
              ?selected=${Pe.id===v}
            >
              ${Pe.name}${rt?" (\uBE44\uD638\uD658)":""}
            </option>`})}
        </select>
        <button
          type="button"
          data-apply-exec-preset
          ?disabled=${g===null||!x||Y||T}
          @click=${()=>{st()}}
        >
          11개 설정 적용
        </button>
      </div>
      <p>적용하면 현재 이슈 실행 설정 전체를 교체합니다.</p>
    </section>`}let ht=null;n&&n.subscribe&&(ht=n.subscribe(()=>ft()));let De=null;i&&typeof i.subscribe=="function"&&(De=i.subscribe(()=>{d&&Z()}));let ot=null;l&&typeof l.subscribe=="function"&&(ot=l.subscribe(()=>{d&&Z()}));function We(g){g.key==="Escape"&&d&&(g.preventDefault(),r())}document.addEventListener("keydown",We);function ft(){if(d){if(n&&typeof n.snapshotFor=="function"){let g=n.snapshotFor("detail:"+d)||[];p=g.find(x=>x&&x.id===d)||g[0]||p}Ue(),Z()}}function ct(g){un(g).then(I=>{I?se("\uBCF5\uC0AC\uB428","success",1200):se("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function nt(g){g.preventDefault(),g.stopPropagation(),d&&ct(d)}function it(g,I){g.preventDefault(),g.stopPropagation(),ct(I)}function _t(g,I,x){g.preventDefault(),g.stopPropagation(),_e.open(I,{missing_state:x})}function Je(g,I){_[g]=I,Z(),!(!s||!d)&&Promise.resolve(s("update-exec-settings",{id:d,key:g,value:I})).catch(()=>{se("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}function bt(g,I){let x=p||{},Y=x.metadata&&typeof x.metadata=="object"?x.metadata:{},Pe={};for(let Me of["impl_runtime","impl_model","impl_effort"])Pe[Me]=Object.hasOwn(_,Me)?_[Me]:typeof Y[Me]=="string"?Y[Me]:"";Pe[g]=I;let rt=Or(Pe,Te(),Ne()),mt={};for(let Me of["impl_runtime","impl_model","impl_effort"])mt[Me]=_[Me],_[Me]=rt[Me]||"";Z(),!(!s||!d)&&Promise.resolve(s("update-impl-target",{id:d,...rt,orchestration_runtime:Ne()})).then(Me=>{let Kt=Array.isArray(Me)?Me[0]:Me;if(!Kt||typeof Kt!="object"||!Kt.id)throw new Error("implementation target readback failed");p=Kt;for(let rn of["impl_runtime","impl_model","impl_effort"])delete _[rn];Z()}).catch(()=>{for(let Me of["impl_runtime","impl_model","impl_effort"])mt[Me]===void 0?delete _[Me]:_[Me]=mt[Me];Z(),se("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error")})}async function Qe(g,I,x){if(!s||!d)return!1;try{let Y=await Promise.resolve(s(g,I)),Pe=Array.isArray(Y)?Y[0]:Y;return Pe&&typeof Pe=="object"&&Pe.id?(p=Pe,!0):(se(x,"error"),!1)}catch{return se(x,"error"),!1}}function dt(g){setTimeout(()=>{try{let I=e.querySelector(g);I&&typeof I.focus=="function"&&I.focus()}catch{}},0)}function ut(){k=!0,A=p&&p.title||"",Z(),dt('.detail-edit__input[data-edit="title"]')}function C(g){A=g.target.value}function N(){k=!1,A="",Z()}function ee(){Qe("edit-text",{id:d,field:"title",value:A},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(I=>{I&&(k=!1,A=""),Z()})}function u(){h=!0,V=p&&p.description||"",Z(),dt('.detail-edit__textarea[data-edit="description"]')}function m(g){V=g.target.value}function E(){h=!1,V="",Z()}function X(){Qe("edit-text",{id:d,field:"description",value:V},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(I=>{I&&(h=!1,V=""),Z()})}function he(g,I,x,Y){if(g.key==="Escape"){g.stopPropagation(),x();return}g.key==="Enter"&&(!Y||g.ctrlKey||g.metaKey)&&(g.preventDefault(),I())}function Se(g){let I=g.target.value;Qe("update-status",{id:d,status:I},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>Z())}function ye(g){let I=Number(g.target.value);Qe("update-priority",{id:d,priority:I},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>Z())}function ie(g){K=g.target.value}function Ie(){let g=K.trim();g.length!==0&&Qe("label-add",{id:d,label:g},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(I=>{I&&(K=""),Z()})}function Ge(g){if(g.key==="Escape"){g.stopPropagation(),K="",Z();return}g.key==="Enter"&&(g.preventDefault(),Ie())}function Ae(g){Qe("label-remove",{id:d,label:g},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>Z())}let at={onCopyPath:it,onOpenDoc:_t},St={onChange:Je,onImplTargetChange:bt};function $t(g){return typeof g=="string"?g:g&&typeof g=="object"?String(g.id||g.to||g.issue_id||g.depends_on||""):""}function et(g){switch(g&&typeof g=="object"?String(g.dependency_type||g.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function At(g){let x=(Array.isArray(g.dependencies)?g.dependencies:[]).map(Y=>({id:$t(Y),icon:et(Y)})).filter(Y=>Y.id.length>0);return c`
      <div class="detail-section-label">의존성</div>
      ${x.length===0?c`<div class="detail-empty">의존성 없음</div>`:c`<div class="detail-deps">
            ${x.map(Y=>o?c`<button
                    type="button"
                    class="detail-dep detail-dep--link"
                    @click=${()=>o(Y.id)}
                  >
                    ${Y.icon?`${Y.icon} `:""}${Y.id}
                  </button>`:c`<span class="detail-dep"
                    >${Y.icon?`${Y.icon} `:""}${Y.id}</span
                  >`)}
          </div>`}
    `}function ve(g){let I=g.metadata||{},x=g.workflow||{},Y=x.stages||{},Pe=Y.spec&&Y.spec.stale,rt=Y.impl&&Y.impl.stale,mt=Y.plan||null,Me=x.route_source==="derived",Kt=x.route||I.route||"\u2014";return c`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${Me?" detail-kv__v--derived":""}"
          title=${Me?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${Me?"unset":Kt}</span
        >
      </div>
      ${x.route!=="quick_fix"||Object.hasOwn(I,"spec_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${I.spec_review||"\uC5C6\uC74C"}${Pe?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${x.route==="full_plan"?c`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${mt?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${mt?.approval_receipt||"\uC5C6\uC74C"}${mt?.approval_state==="stale"?" \xB7 stale":mt?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${x.route!=="quick_fix"||Object.hasOwn(I,"impl_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${I.impl_review||"\uC5C6\uC74C"}${rt?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${I.pr_url?c`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${I.pr_url}</span>
          </div>`:""}
    `}let Ye={route:["quick_fix","spec_backed","full_plan"]};async function It(g,I){let x=I.target.value;if(g==="route"&&p&&p.metadata&&p.metadata.route==="full_plan"&&x!=="full_plan"&&!window.confirm(`full_plan \u2192 ${x||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){Z();return}await Qe("update-workflow-meta",{id:d,key:g,value:x},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),Z()}function Vt(g){let I=g.metadata||{};return c` ${((Y,Pe)=>{let rt=Ye[Y],mt=typeof I[Y]=="string"?I[Y]:"";return c`<div class="detail-kv">
        <span class="detail-kv__k">${Y}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${Y}
          data-edit=${`wfmeta-${Y}`}
          @change=${Me=>It(Y,Me)}
        >
          <option value="" ?selected=${!rt.includes(mt)}>
            ${Pe}
          </option>
          ${rt.map(Me=>c`<option value=${Me} ?selected=${mt===Me}>${Me}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function le(g){return k?c`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${A}
            @input=${C}
            @keydown=${I=>he(I,ee,N,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${ee}
            >
              저장
            </button>
            <button
              type="button"
              class="detail-edit__cancel"
              data-edit="title-cancel"
              @click=${N}
            >
              취소
            </button>
          </div>
        </div>
      `:c`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${g}</h2>
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${ut}
        >
          ✎
        </button>
      </div>
    `}function b(g){let I=gt(g.created_at),x=gt(g.updated_at);return!I&&!x?c``:c`
      ${I?c`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${I}</span>
          </div>`:""}
      ${x?c`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${x}</span>
          </div>`:""}
    `}function z(g,I){return c`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${Se}
        >
          ${Zd.map(x=>c`<option value=${x} ?selected=${x===g}>${x}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${ye}
        >
          ${Xd.map(x=>c`<option value=${String(x)} ?selected=${x===I}>
                P${x}
              </option>`)}
        </select>
      </div>
    `}function f(g){return c`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${h?"":c`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${u}
            >
              ✎
            </button>`}
      </div>
      ${h?c`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${V}
              @input=${m}
              @keydown=${I=>he(I,X,E,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${X}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${E}
              >
                취소
              </button>
            </div>
          </div>`:c`<div class="detail-overlay__desc">
            ${g||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function y(g){let I=typeof g.notes=="string"?g.notes:"";return I.trim().length===0?c``:c`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${I}</div>
    `}function Q(g){let I=Array.isArray(g.labels)?g.labels:[];return c`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${I.map(x=>c`<span class="detail-label-chip"
              >${x}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${x}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+x}
                @click=${()=>Ae(x)}
              >
                ×
              </button></span
            >`)}
        <span class="detail-label-add">
          <input
            class="detail-label-add__input"
            aria-label="라벨 추가"
            placeholder="라벨 추가"
            .value=${K}
            @input=${ie}
            @keydown=${Ge}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${Ie}
          >
            추가
          </button>
        </span>
      </div>
    `}function te(){if(!d)return c``;let g=p||{},I=String(g.id||d),x=g.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",Y=g.status||"open",Pe=typeof g.priority=="number"?Math.max(0,Math.min(4,g.priority)):"",rt=g.description||"",mt={...g,metadata:{...g.metadata||{},..._}};return c`
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
            @click=${nt}
          >
            ${I}
          </button>
          ${le(x)} ${z(Y,Pe)}
          ${b(g)} ${f(rt)}
          ${Ui(q,D,{expanded:me,draft:H,sending:pe,error:R})}
          ${y(g)} ${Q(g)} ${At(g)}
          ${ve(g)} ${Vt(g)}
          ${Ni(g,at)}
          ${pt()}
          ${Ki(mt,St,J(),Te(),de())}
          ${Ji({expanded:ge,loading:Be,error:be,data:Ce},{onToggle:M})}
          ${Qi(B(),j,{total:P(),expanded:ae})}
        </div>
      </div>
    `}function Z(){Oe(te(),e)}return{load(g){g!==d&&(_={},v="",ne(),fe(),xe()),d=g,p=null,ft()},clear(){d=null,p=null,_={},v="",T=!1,ne(),fe(),xe(),_e.close(),we.close(),Oe(c``,e)},destroy(){ht&&(ht(),ht=null),De&&(De(),De=null),ot&&(ot(),ot=null),document.removeEventListener("keydown",We),_e.destroy(),U.parentNode&&U.parentNode.removeChild(U),we.destroy(),oe.parentNode&&oe.parentNode.removeChild(oe),d=null,p=null,v="",T=!1,fe(),xe(),Oe(c``,e)}}}var Qd=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function ta(e,t){return ns(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function Jd(e,t,n){if(!n)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(o=>o!==e)};let r=t.hidden_labels.filter(o=>o!==e);return t.hidden_prefixes.some(o=>o.length>0&&e.startsWith(o))?{hidden_labels:r,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:r}}function na(e,t){let{policyStore:n,transport:r,labelOptions:s}=t,o=document.createElement("dialog");o.id="display-settings-dialog",o.className="display-settings",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),e.appendChild(o);let i="";async function l(S){let R=n.get();if(R)try{let H=await r("display-policy-set",{expected_revision:R.revision,policy:S(R)});a(H),H&&H.conflict&&H.policy&&(H=await r("display-policy-set",{expected_revision:H.policy.revision,policy:S(H.policy)}),a(H)),H&&H.conflict&&se("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC","error",4e3)}catch{se("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function a(S){S&&S.policy&&typeof S.policy=="object"&&n.set(S.policy)}function d(S){let R=n.get();if(!R)return;let H=ta(S,R)!=="shown";l(pe=>Jd(S,pe,H))}function p(){let S=i.trim();S.length!==0&&(i="",l(R=>R.hidden_prefixes.includes(S)?{hidden_prefixes:R.hidden_prefixes}:{hidden_prefixes:[...R.hidden_prefixes,S]}),A())}function _(S){l(R=>({hidden_prefixes:R.hidden_prefixes.filter(H=>H!==S)}))}function v(S){let R=n.get();if(!R)return;let H=R.chips[S]===!1;l(()=>({chips:{[S]:H}}))}function T(S){let R=s();return c`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">라벨 표시</h3>
        <p class="display-settings__hint">
          라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을
          누르면 그 라벨만 예외로 다시 표시됩니다.
        </p>
        ${R.length===0?c`<div class="display-settings__empty">라벨 없음</div>`:c`<div class="display-settings__pills">
              ${R.map(H=>{let pe=ta(H,S);return c`<button
                  type="button"
                  class=${`display-settings__pill display-settings__pill--${pe}`}
                  data-label=${H}
                  data-state=${pe}
                  @click=${()=>d(H)}
                >
                  ${H}
                </button>`})}
            </div>`}
      </section>
    `}function k(S){return c`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">숨김 prefix</h3>
        <div class="display-settings__prefixes">
          ${S.hidden_prefixes.map(R=>c`<span class="display-settings__prefix">
                ${R}
                <button
                  type="button"
                  class="display-settings__prefix-remove"
                  aria-label=${`${R} \uADDC\uCE59 \uC81C\uAC70`}
                  @click=${()=>_(R)}
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
            .value=${i}
            @input=${R=>{i=String(R.target.value||"")}}
          />
          <button type="button" @click=${p}>추가</button>
        </div>
      </section>
    `}function h(S){return c`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">카드 표시 요소</h3>
        <div class="display-settings__toggles">
          ${Qd.map(([R,H])=>c`<label class="display-settings__toggle">
                <input
                  type="checkbox"
                  data-chip=${R}
                  .checked=${S.chips[R]!==!1}
                  @change=${()=>v(R)}
                />
                <span>${H}</span>
              </label>`)}
        </div>
      </section>
    `}function A(){let S=n.get();Oe(c`
        <div class="display-settings__container">
          <header class="display-settings__header">
            <div class="display-settings__title">표시 설정</div>
            <button
              type="button"
              class="display-settings__close"
              aria-label="닫기"
              @click=${L}
            >
              ×
            </button>
          </header>
          <div class="display-settings__body">
            ${S?c`${T(S)} ${k(S)}
                ${h(S)}`:c`<div class="display-settings__empty">
                  표시 정책을 불러오는 중…
                </div>`}
          </div>
        </div>
      `,o)}let V=!1,K=()=>{V=!1};o.addEventListener("close",K),o.addEventListener("cancel",K);let ne=null;n.subscribe&&(ne=n.subscribe(()=>{V&&A()}));function q(){V||(i="",V=!0,A(),typeof o.showModal=="function"?o.showModal():o.setAttribute("open",""))}function L(){V&&(V=!1,typeof o.close=="function"?o.close():o.removeAttribute("open"))}return{open:q,close:L,destroy(){V=!1,o.removeEventListener("close",K),o.removeEventListener("cancel",K),ne&&(ne(),ne=null),o.remove()}}}function ra(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let n=t.querySelector("#fatal-error-title"),r=t.querySelector("#fatal-error-message"),s=t.querySelector("#fatal-error-detail"),o=t.querySelector("#fatal-error-reload"),i=t.querySelector("#fatal-error-close"),l=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},a=(d,p,_="")=>{n&&(n.textContent=d||"Unexpected Error"),r&&(r.textContent=p||"An unrecoverable error occurred.");let v=typeof _=="string"?_.trim():"";if(s&&(v.length>0?(s.textContent=v,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),i&&i.addEventListener("click",()=>l()),t.addEventListener("cancel",d=>{d.preventDefault(),l()}),{open:a,close:l,getElement(){return t}}}function sa(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";if(e<6e4)return`${Math.round(e/1e3)}\uCD08`;let t=e/6e4;return`${Number.isInteger(t)?t:Math.round(t*10)/10}\uBD84`}function oa(e){return Array.isArray(e)?e.filter(t=>typeof t=="string").join(" "):""}var eu={deployed:{modifier:"ok",label:"\uC131\uACF5"},launched:{modifier:"launched",label:"\uBC1C\uC0AC\uB428 \xB7 \uACB0\uACFC \uBBF8\uAD00\uCE21"},failed:{modifier:"fail",label:"\uC2E4\uD328"}},ia=160;function tu(e){return e.length>ia?`${e.slice(0,ia)}\u2026`:e}function Pr(e,t){let{queueStore:n,presetStore:r,transport:s,getWorkspacePath:o}=t,i=document.createElement("dialog");i.id="worker-exec-defaults-dialog",i.className="exec-defaults",i.setAttribute("role","dialog"),i.setAttribute("aria-modal","true"),e.appendChild(i);let l=null,a=!1;function d(){return n&&n.get()||{revision:0,exec_defaults:{}}}function p(){let w=d();return typeof w.revision=="number"?w.revision:0}function _(){let w=r?r.get():null;return!w||typeof w.revision!="number"?null:{revision:w.revision,presets:Array.isArray(w.presets)?w.presets:[]}}function v(w){r&&w&&typeof w.revision=="number"&&Array.isArray(w.presets)&&r.set({revision:w.revision,presets:w.presets})}function T(w){w&&w.queue&&n&&n.set(w.queue)}function k(){return d().runner_catalog??null}let h=null;function A(){if(h!==null)return h;let w=d().default_exec_preset_id;return typeof w=="string"&&w.length>0?w:null}async function V(w){if(!s)return;let W=_();if(!W)return;h=w||"";let j=L(w);if(re(),!j.viable){se(j.missing?"\uC120\uD0DD\uD55C \uD504\uB9AC\uC14B\uC744 \uCC3E\uC744 \uC218 \uC5C6\uC5B4 \uC800\uC7A5\uD558\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.":"\uBE44\uD638\uD658 \uD504\uB9AC\uC14B\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4 \uAE30\uBCF8\uAC12\uC73C\uB85C \uC800\uC7A5\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.","error",4e3);return}try{let J=await s("worker-queue-set-default-exec-preset",{preset_id:w||null,expected_queue_revision:p(),expected_preset_revision:W.revision});if(T(J),J&&J.presets&&r&&r.set(J.presets),J&&J.conflict){se("\uAE30\uBCF8 \uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uC120\uD0DD\uC744 \uAC80\uD1A0\uD55C \uB4A4 \uB2E4\uC2DC \uC800\uC7A5\uD558\uC138\uC694.","error",4e3);return}if(J&&J.applied){h=null,re();return}se("\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4 \uAE30\uBCF8 \uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328","error",4e3)}catch{se("\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4 \uAE30\uBCF8 \uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function K(w){l={id:w.id,name:w.name,settings:{...w.settings||{}}},R(),a=!1,re()}function ne(){l={id:null,name:"",settings:{}},a=!1,re()}function q(w){let W=w&&w.settings&&typeof w.settings=="object"?w.settings:{},j=J=>typeof W[J]=="string"?W[J]:J==="impl_runtime"&&typeof W.impl_model=="string"&&Yt(k(),W.impl_model)||"";return Cn({selectedOf:j,effectiveOf:j,runner_catalog:k()}).some(J=>J.groups.some(de=>de.options.some(Te=>Te.value===J.selected&&Te.label.endsWith("(\uBE44\uD638\uD658)"))))}function L(w){if(!w)return{viable:!0,missing:!1,incompatible:!1,preset:null};let j=_()?.presets.find(de=>de.id===w);if(!j||j.migration_pending===!0)return{viable:!1,missing:!0,incompatible:!1,preset:null};let J=j.compatible===!1||q(j);return{viable:!J,missing:!1,incompatible:J,preset:j}}function S(){let w=l?.settings.orchestration_model;return typeof w!="string"?null:Yt(k(),w)}function R(){if(!l)return;let w=Or({impl_runtime:l.settings.impl_runtime||"",impl_model:l.settings.impl_model||"",impl_effort:l.settings.impl_effort||""},k(),S());for(let W of["impl_runtime","impl_model","impl_effort"])w[W]?l.settings[W]=w[W]:delete l.settings[W]}function H(w){let W=w&&w.settings&&typeof w.settings=="object"?w.settings:{},j=En.filter(de=>typeof W[de]=="string").length,J=En.filter(de=>typeof W[de]=="string").map(de=>`${Ts[de]?.title||de}: ${W[de]}`);return{count:`${j}/11 \uC9C0\uC815`,choices:J.length>0?J.join(" \xB7 "):"\uBAA8\uB4E0 \uD56D\uBAA9 \uAE30\uBCF8\uAC12"}}async function pe(w){if(!s||!window.confirm(`\u201C${w.name}\u201D \uD504\uB9AC\uC14B\uC744 \uC0AD\uC81C\uD560\uAE4C\uC694? \uC774\uBBF8 \uC801\uC6A9\uB41C \uC774\uC288\uB294 \uBCC0\uACBD\uB418\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.`))return;let W=_();if(W)try{let j=await s("exec-preset-delete",{expected_revision:W.revision,id:w.id});v(j),j&&j.conflict&&se("\uD504\uB9AC\uC14B\uC774 \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uB2E4\uC2DC \uD655\uC778\uD558\uC138\uC694.","error",4e3)}catch{se("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328","error",4e3)}}async function $e(w=!1){if(!s||!l)return;let W=_();if(!W)return;let j=w||l.id===null,J={expected_revision:W.revision,...j?{}:{id:l.id},name:l.name,settings:{...l.settings}};try{let de=await s(j?"exec-preset-create":"exec-preset-update",J);if(v(de),de&&de.conflict){a=!0,re();return}if(de&&de.applied){l=null,a=!1,re();return}se("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328","error",4e3)}catch{se("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function me(w){return c`<div class="exec-defaults__row exec-preset-editor__row">
      <span class="exec-defaults__k">${Cs(w.key)}</span>
      <select
        class="exec-defaults__sel"
        data-preset-key=${w.key}
        ?disabled=${w.disabled}
        @change=${W=>{if(!l)return;let j=W.target.value;j?l.settings[w.key]=j:delete l.settings[w.key],(w.key==="impl_runtime"||w.key==="impl_model"||w.key==="impl_effort"||w.key==="orchestration_model")&&R(),a=!1,re()}}
      >
        ${Dr(w.groups,w.selected,Es[w.key]||"(\uAE30\uBCF8)")}
      </select>
    </div>`}function fe(){if(!l)return"";let w=de=>typeof l?.settings[de]=="string"?l.settings[de]:"",W=Cn({selectedOf:w,effectiveOf:w,runner_catalog:k(),controller_runtime:S()}),j=_(),J=l.id!==null&&j!==null&&!j.presets.some(de=>de.id===l?.id);return c`<div class="exec-preset-editor" data-preset-editor>
      <label class="exec-preset-editor__name">
        프리셋 이름
        <input
          type="text"
          value=${l.name}
          data-preset-name
          @input=${de=>{l&&(l.name=de.target.value,a=!1)}}
        />
      </label>
      ${a?c`<p class="exec-preset-editor__conflict" data-preset-conflict>
            다른 곳에서 변경됨 — 최신 목록을 확인한 뒤 다시 저장하세요.
          </p>`:""}
      ${J?c`<p class="exec-preset-editor__conflict">
            편집하던 프리셋이 다른 곳에서 삭제됐습니다.
          </p>`:""}
      ${W.map(me)}
      <div class="exec-preset-editor__actions">
        ${J?c`<button
              type="button"
              data-preset-save-as-new
              @click=${()=>{$e(!0)}}
            >
              새 프리셋으로 저장
            </button>`:c`<button
              type="button"
              data-preset-save
              @click=${()=>{$e(!1)}}
            >
              저장
            </button>`}
        <button
          type="button"
          data-preset-cancel
          @click=${()=>{l=null,a=!1,re()}}
        >
          취소
        </button>
      </div>
    </div>`}function Ee(){let w=_(),W=w?w.presets.filter(j=>j?.migration_pending!==!0):[];return c`<section class="exec-presets" data-exec-presets>
      <div class="exec-presets__heading">
        <h3>공용 실행 프리셋</h3>
        <button type="button" data-preset-new @click=${ne}>
          + 새 프리셋
        </button>
      </div>
      <p class="exec-defaults__hint">
        모든 워크스페이스에서 공유하며, 이슈에 적용하면 값이 복사됩니다.
      </p>
      ${w===null?c`<p class="exec-presets__empty">프리셋을 불러오는 중…</p>`:W.length===0?c`<p class="exec-presets__empty">
              아직 공용 프리셋이 없습니다.
            </p>`:W.map(j=>{let J=H(j),de=typeof j.reference_count=="number",Te=de?j.reference_count:null,Ne=Array.isArray(j.reference_summary)?j.reference_summary.map(Ze=>Ze?.display_name||Ze?.workspace_key).filter(Boolean).join(", "):"";return c`<article
                class="exec-preset-card"
                data-preset-id=${j.id}
              >
                <div class="exec-preset-card__main">
                  <strong>${j.name}</strong>
                  <span>${J.count}</span>
                  <span data-preset-references=${j.id}
                    >${de?`\uCC38\uC870 ${Te}\uAC1C`:"\uCC38\uC870 \uD655\uC778 \uBD88\uAC00"}</span
                  >
                  ${q(j)?c`<span data-preset-incompatible>비호환</span>`:""}
                  <small>${J.choices}</small>
                  ${Ne?c`<small data-preset-impact=${j.id}
                        >업데이트 영향: ${Ne}</small
                      >`:""}
                </div>
                <div class="exec-preset-card__actions">
                  <button
                    type="button"
                    data-preset-edit=${j.id}
                    @click=${()=>K(j)}
                  >
                    편집
                  </button>
                  <button
                    type="button"
                    data-preset-delete=${j.id}
                    ?disabled=${Te===null||Te>0||j.reference_scan_complete===!1}
                    title=${Te===null?"\uCC38\uC870 \uC218\uB97C \uD655\uC778\uD560 \uC218 \uC5C6\uC5B4 \uC0AD\uC81C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":Te>0?"\uCC38\uC870 \uC911\uC778 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC788\uC5B4 \uC0AD\uC81C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":j.reference_scan_complete===!1?"\uCC38\uC870 \uC2A4\uCE94\uC774 \uC644\uB8CC\uB418\uC9C0 \uC54A\uC544 \uC0AD\uC81C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":""}
                    @click=${()=>{pe(j)}}
                  >
                    삭제
                  </button>
                </div>
              </article>`})}
      ${fe()}
    </section>`}function Ue(){let w=_(),W=w?w.presets.filter(Ne=>Ne?.migration_pending!==!0):[],j=A()||"",J=L(j),de=J.preset,Te=de?H(de):null;return c`<section class="exec-defaults__workspace" data-workspace-preset>
      <h3>현재 워크스페이스 기본 프리셋</h3>
      <p class="exec-defaults__hint">
        이 워크스페이스는 프리셋 하나를 참조합니다. 없음은 harness 기본값을
        사용합니다.
      </p>
      <select
        class="exec-defaults__sel"
        data-workspace-preset-select
        aria-label="워크스페이스 기본 프리셋"
        .value=${j}
        ?disabled=${w===null}
        @change=${Ne=>{V(Ne.target.value)}}
      >
        <option value="" ?selected=${j===""}>
          없음 — harness 기본값
        </option>
        ${j&&J.missing?c`<option value=${j} ?selected=${!0}>
              ${j} (선택한 프리셋 없음)
            </option>`:""}
        ${W.map(Ne=>c`<option
              value=${Ne.id}
              ?selected=${Ne.id===j}
              ?disabled=${Ne.compatible===!1}
            >
              ${Ne.name}${Ne.compatible===!1?" (\uBE44\uD638\uD658)":""}
            </option>`)}
      </select>
      ${de?c`<p data-workspace-preset-summary>
            ${Te?.count} · ${Te?.choices}
            ${J.incompatible?" \xB7 \uBE44\uD638\uD658":""}
          </p>`:""}
      ${J.missing?c`<p data-workspace-preset-missing>
            선택한 프리셋을 찾을 수 없습니다. 실행이 차단됩니다.
          </p>`:J.incompatible?c`<p data-workspace-preset-incompatible>
              선택한 프리셋이 비호환입니다. 실행이 차단됩니다.
            </p>`:""}
    </section>`}function Ke(){let w=d().workspace_info;return w&&typeof w=="object"?w:{}}function He(w,W){return c`<span
      class="exec-defaults__vd-badge exec-defaults__vd-badge--${w}"
      >${W}</span
    >`}function ke(w){let W=w?oa(w.cmd):"",j=w?sa(w.timeout_ms):"",J=o&&o()||"<workspace \uACBD\uB85C>";return c`<div class="exec-defaults__vd-group" data-vd="verify">
      <div class="exec-defaults__vd-label">머지 전 검증 (verify)</div>
      ${W?c`<div class="exec-defaults__vd-line">
            <span class="exec-defaults__vd-cmd">${W}</span>
            ${He("config","config")}
            ${j?c`<span class="exec-defaults__vd-meta"
                  >timeout ${j}</span
                >`:""}
          </div>`:c`<div class="exec-defaults__vd-line exec-defaults__vd-absent">
            검증 없음 —
            <span class="exec-defaults__vd-cmd"
              >[worker.verify."${J}"]</span
            >
            섹션으로 정의
          </div>`}
    </div>`}function D(w){let W=w?oa(w.cmd):"",j=w?sa(w.timeout_ms):"",J=j?`timeout ${j} \xB7 verify \uD1B5\uACFC \uC2DC\uC5D0\uB9CC \uC2E4\uD589`:"verify \uD1B5\uACFC \uC2DC\uC5D0\uB9CC \uC2E4\uD589",de=o&&o()||"<workspace \uACBD\uB85C>";return c`<div class="exec-defaults__vd-group" data-vd="deploy">
      <div class="exec-defaults__vd-label">머지 후 배포 (deploy)</div>
      ${W?c`<div class="exec-defaults__vd-line">
            <span class="exec-defaults__vd-cmd">${W}</span>
            ${He("config","config")}
            ${w.detached===!0?He("detached","detached"):""}
            <span class="exec-defaults__vd-meta">${J}</span>
          </div>`:c`<div class="exec-defaults__vd-line exec-defaults__vd-absent">
            배포 없음 —
            <span class="exec-defaults__vd-cmd"
              >[worker.deploy."${de}"]</span
            >
            섹션으로 정의
          </div>`}
    </div>`}function U(w){if(!w||typeof w!="object")return"";let W=eu[String(w.outcome)];if(!W)return"";let j=w.outcome==="failed"&&w.reason?`${W.label} \xB7 ${w.reason}`:W.label,J=[gt(w.at),typeof w.bead_id=="string"?w.bead_id:"",typeof w.base_sha=="string"?w.base_sha.slice(0,7):""].filter(Ne=>Ne.length>0).join(" \xB7 "),de=typeof w.detail=="string"&&w.detail.length>0?tu(w.detail):"",Te=typeof w.log_path=="string"&&w.log_path.length>0?w.log_path:"";return c`<div class="exec-defaults__vd-group" data-vd="last-deploy">
      <div class="exec-defaults__vd-label">마지막 배포</div>
      <div class="exec-defaults__vd-line">
        ${He(W.modifier,j)}
        ${J?c`<span class="exec-defaults__vd-meta">${J}</span>`:""}
      </div>
      ${de?c`<div class="exec-defaults__vd-line" data-vd-part="detail">
            <code class="exec-defaults__vd-cmd">${de}</code>
          </div>`:""}
      ${Te?c`<div class="exec-defaults__vd-line" data-vd-part="log-path">
            전체 로그:
            <code class="exec-defaults__vd-cmd">${Te}</code>
          </div>`:""}
    </div>`}let _e=!1,oe=!1,we=!1,ge=null;async function Be(){if(s){oe=!0,we=!1,re();try{let w=await Promise.resolve(s("get-worker-system-prompt",{}));!w||typeof w!="object"||Array.isArray(w)?we=!0:ge=w}catch{we=!0}finally{oe=!1,re()}}}function be(){if(_e=!_e,_e&&!ge){Be();return}re()}function Ce(){return c`<section class="exec-defaults__sp" data-seam="system-prompt">
      <p class="exec-defaults__vd-title">
        워커 시스템 프롬프트
        <span class="exec-defaults__vd-ro">읽기 전용 — 서버가 조립</span>
        <button
          type="button"
          class="exec-defaults__sp-toggle"
          data-seam="system-prompt-toggle"
          aria-expanded=${_e?"true":"false"}
          @click=${be}
        >
          ${_e?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
        </button>
      </p>
      ${_e?F():""}
    </section>`}function F(){let w=Tn({loading:oe,error:we});if(w)return w;if(!ge)return"";let W=Array.isArray(ge.variants)?ge.variants:[];return c`<div class="exec-defaults__sp-body">
      ${ge.target_base_placeholder?c`<div class="prompt-block__meta">
            \`${ge.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${W.map(j=>c`<div class="exec-defaults__sp-variant" data-variant=${j.key}>
            <div class="exec-defaults__sp-cond">${j.condition}</div>
            ${Gt(j.label,j.system_prompt)}
          </div>`)}
    </div>`}function O(w){return c`<section class="exec-defaults__vd">
      <p class="exec-defaults__vd-title">
        검증·배포 설정
        <span class="exec-defaults__vd-ro"
          >읽기 전용 — config.toml에서 정의</span
        >
      </p>
      ${ke(w.verify_cmd)} ${D(w.deploy_cmd)}
      ${U(w.last_deploy)}
    </section>`}function re(){if(Oe(c`
        <div class="exec-defaults__container">
          <header class="exec-defaults__header">
            <div class="exec-defaults__title">전역 실행 설정</div>
            <button
              type="button"
              class="exec-defaults__close"
              aria-label="닫기"
              @click=${ce}
            >
              ×
            </button>
          </header>
          <div class="exec-defaults__body">
            ${Ee()} ${Ue()}
            ${O(Ke())}
            ${Ce()}
          </div>
        </div>
      `,i),h!==null){let w=i.querySelector("[data-workspace-preset-select]");w&&(w.value=h)}}let xe=!1,Re=()=>{xe=!1},M=w=>{w.target===w.currentTarget&&ce()};i.addEventListener("close",Re),i.addEventListener("cancel",Re),i.addEventListener("click",M);let B=null;n&&n.subscribe&&(B=n.subscribe(()=>{xe&&re()}));let P=null;r&&r.subscribe&&(P=r.subscribe(()=>{xe&&re()}));function ae(){xe||(xe=!0,re(),typeof i.showModal=="function"?i.showModal():i.setAttribute("open",""))}function ce(){xe&&(xe=!1,typeof i.close=="function"?i.close():i.removeAttribute("open"))}return{open:ae,close:ce,destroy(){xe=!1,i.removeEventListener("close",Re),i.removeEventListener("cancel",Re),i.removeEventListener("click",M),B&&(B(),B=null),P&&(P(),P=null),i.remove()}}}function Rn(e){let t=Tt(e.created_at),n=Tt(e.updated_at);return!t&&!n?"":c`<div class="worker-mini__meta">
    ${t?c`<span title=${`\uC0DD\uC131 ${gt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&n?c`<span>·</span>`:""}${n?c`<span title=${`\uC218\uC815 ${gt(e.updated_at)}`}
          >수정 ${n}</span
        >`:""}
  </div>`}function Is(e){let t=e.draggable&&!e.done,n=Array.isArray(e.badges)?e.badges:[],r=Dt(e.usage),s=e.merge_step||null,o=e.lane==="pr_wait"||!!e.revise_action,i=e.lane==="done"&&!o,l=i?Tt(e.done_at):"",a=t?c`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",d=e.workspace_name?c`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",p=c`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,_=c`<span class="worker-mini__title">${e.title}</span>`,v=e.pr_url&&e.pr_number?c`<a
          class="worker-mini__pr"
          href=${e.pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="PR 열기"
          >#${e.pr_number} ↗</a
        >`:"",T=n.map(S=>S===e.live_badge?c`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${S}</span
        >`:c`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          >${S}</span
        >`),k=e.reason?c`<span class="worker-mini__reason">${e.reason}</span>`:"",h=r?c`<span class="worker-usage" title=${An(e.usage)}
        >${r}</span
      >`:"",A=s?c`<span class="merge-step"
        >${s.label}<span class="merge-step__n"
          >${s.index}/${s.total}</span
        ></span
      >`:"",V=e.merge_action?c`<button
        type="button"
        class="worker-mini__merge"
        data-bead-id=${e.id}
        ?disabled=${e.merge_enabled===!1}
        title=${e.merge_title||""}
      >
        ${e.merge_label||"\uBA38\uC9C0"}
      </button>`:"",K=e.cancel_action?c`<button
        type="button"
        class="worker-mini__merge-cancel"
        data-bead-id=${e.id}
        ?disabled=${e.cancel_enabled===!1}
        title=${e.cancel_title||""}
      >
        취소
      </button>`:"",ne=e.discard_action?c`<button
        type="button"
        class="worker-mini__discard"
        data-bead-id=${e.id}
        ?disabled=${e.discard_enabled===!1}
        title=${e.discard_enabled===!1?e.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
      >
        폐기
      </button>`:"",q=e.revise_action?c`<button
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
        </button>`:"",L=!!(r||s||e.merge_action||e.cancel_action||e.discard_action||e.revise_action);return c`<div
    class="worker-mini${o?" worker-mini--card":""}${t?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${s?" worker-mini--merging":""}${e.external?" worker-mini--external":""}"
    style=${s?`--progress: ${s.percent}%`:""}
    draggable=${t?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${i?c`<div class="worker-mini__row1">${d}${p}${_}</div>
          <div class="worker-mini__row2">
            ${h}${l?c`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${gt(e.done_at)}`}
                  >완료 ${l}</span
                >`:""}${T}${A}
            <span class="worker-mini__actions"
              >${V}${K}${ne}</span
            >
            ${Rn(e)}
          </div>`:o?c`<div class="worker-mini__head">
              ${a}${d}${p}${v}${T}${k}
            </div>
            <div class="worker-mini__body">${_}</div>
            ${L?c`<div class="worker-mini__foot">
                  ${h}${A}
                  <span class="worker-mini__actions"
                    >${V}${K}${ne}${q}</span
                  >
                </div>`:""}
            ${Rn(e)}`:c`<div class="worker-mini__line">
              ${a}${d}${p}${_}${v}${T}${k}${h}${A}${V}${K}${ne}
            </div>
            ${Rn(e)}`}
  </div>`}function nu(e){let t=e.draggable&&!e.done,n=e.workflow,r=n&&n.chips||{},s=r.route||n&&n.route,o=r.route_source==="derived"||!!(n&&n.route_source==="derived"),i=e.is_quick_fix===!0||!!n&&n.route==="quick_fix",l=typeof e.reason=="string"&&e.reason.startsWith("\u26D4");return c`<div
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
            title=${o?"route \uBBF8\uD540 (metadata unset)":"route"}
            >${o?"unset":s}</span
          >`:""}
    </div>
    <div class="worker-card__title">${e.title}</div>
    ${n?gr(n,e.status):""}
    <div
      class="worker-card__foot${e.reason?"":" worker-card__foot--actions-only"}"
    >
      ${e.reason?c`<span
            class="worker-card__reason${l?" worker-card__reason--danger":""}"
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
        title=${t?"\uB300\uAE30 \uD050 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00":i?"quick_fix route\uB294 \uC6CC\uCEE4 \uC2E4\uD589 \uB300\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4":"spec\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}
      >
        대기로 ↴
      </button>
    </div>
    ${Rn(e)}
  </div>`}function Bt(e){let t=!!e.collapsible&&!!e.collapsed,n=c`<span
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
                  </div>`:e.items.map(r=>e.lane==="candidate"?nu(r):Is(r))}
          </div>`}
  </section>`}var aa=160;function Mr(e){return e.length>aa?`${e.slice(0,aa)}\u2026`:e}function ru(e){return!e||!e.reason?"":c`<div class="worker-banner__detail">
    가드:
    ${e.reason}${e.command?c` · <code>${Mr(e.command)}</code>`:""}
  </div>`}function su(e){return e?c`<details class="worker-banner__tail">
    <summary>출력 tail</summary>
    <pre>${e}</pre>
  </details>`:""}function ou(e){return e?c`<div class="worker-banner__log-path">
    전체 로그: <code>${e}</code>
  </div>`:""}function iu(e){return!e||typeof e.verdict!="string"||typeof e.evidence!="string"?"":e.malformed===!0||e.verdict==="malformed"?c`<div class="worker-banner__detail">
      <b>진단 결과 형식 오류</b> · ${Mr(e.evidence)}
    </div>`:c`<div class="worker-banner__detail">
    진단: <b>${e.verdict}</b> · 근거:
    ${Mr(e.evidence)}
    ${e.verdict==="regression"&&e.fix_bead_id?c` · 수정 bead: ${e.fix_bead_id}`:""}
  </div>`}function Ls(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),n=Math.floor(t/60),r=t%60;return n>0?`${n}m ${String(r).padStart(2,"0")}s`:`${r}s`}function la(e){let t=Array.isArray(e.cleanupFailures)?e.cleanupFailures:[];return c`<div class="worker-banners">
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
          ${ru(e.failure.cause_detail)}
        </div>`:""}
    ${t.map(n=>c`<div
          class="worker-banner worker-banner--cleanup"
          role="alert"
          data-bead-id=${n.bead_id}
        >
          ⚠ ${n.bead_id} 머지 완료 — 머지 후 정리가 <b>${n.step}</b> 단계에서
          멈췄습니다 (${n.reason}). 1회 자동 재시도 후에도 실패했습니다 — [AI
          정리]로 진단하거나 정리를 사람이 마무리하세요.
          <button
            type="button"
            class="worker-banner__cleanup-diagnose"
            data-bead-id=${n.bead_id}
            ?disabled=${n.diagnosis_pending===!0}
            title="정리 실패 원인을 AI 세션으로 분류합니다"
          >
            AI 정리
          </button>
          ${iu(n.diagnosis)}
          ${n.detail?c`<div class="worker-banner__detail">
                <code>${Mr(n.detail)}</code>
              </div>`:""}
          ${ou(n.log_path)} ${su(n.output_tail)}
        </div>`)}
  </div>`}function au(e,t,n=null){let r=!!e.paused,s=r?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?Ls(t-e.started_at):"\u2014",o=[e.runner,e.model].filter(Boolean).join(" \xB7 "),i=Dt(e.usage),l=e.conflict_resolution?r?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,a=e.base_exception||null,d=e.attempt_id&&e.attempt_id===n;return c`<div
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
    ${o||i||l||a?c`<div class="rtile__meta">
          ${l?c`<span class="worker-mini__badge">${l}</span>`:""}
          ${a?c`<span
                class="worker-mini__badge"
                title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
                >${a}</span
              >`:""}
          ${o?c`<span class="rtile__runner">${o}</span>`:""}
          ${i?c`<span class="worker-usage" title=${An(e.usage)}
                >${i}</span
              >`:""}
        </div>`:""}
    ${Rn(e)}
    <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일): 큐
         스냅샷에는 페이즈명도 진행률도 없으므로 진행 바는 만들지 않는다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
    ${r?"":c`<div class="rtile__accent" aria-hidden="true"></div>`}
  </div>`}function Ds(e,t=Date.now(),n=null){let r=Array.isArray(e)?e:[];return c`<div class="worker-rungrid" id="worker-rungrid">
    ${r.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:r.map(s=>au(s,t,n))}
  </div>`}function tn(e){return c`<svg
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
  </svg>`}function Os(){return tn(Ut`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function Ps(){return tn(Ut`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function Ms(){return tn(Ut`<rect x="4.3" y="4.3" width="7.4" height="7.4" rx="1.2" />`)}function ca(){return tn(Ut`<path d="M4.4 4.4 11.6 11.6M11.6 4.4 4.4 11.6" />`)}function da(){return tn(Ut`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function ua(){return tn(Ut`<rect x="2.6" y="2.6" width="7.4" height="7.4" rx="1.2" />
    <path d="M6 13.4h6a1.4 1.4 0 0 0 1.4-1.4V6" />`)}function pa(){return tn(Ut`<circle cx="8" cy="8" r="2.1" />
    <path
      d="M8 1.9v1.8M8 12.3v1.8M1.9 8h1.8M12.3 8h1.8M3.7 3.7l1.3 1.3M11 11l1.3 1.3M12.3 3.7 11 5M5 11l-1.3 1.3"
    />`)}function fa(){return tn(Ut`<path d="M3 3.6 8.2 8 3 12.4z" />
    <path d="M8.8 3.6 14 8l-5.2 4.4z" />`)}var Jn=1,lu=6e4,cu={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328"},du=new Set(["auto_merge","merged","merge","done"]),_a={running:3,paused:2,failed:1};function uu(e,t){let n=null,r=-1/0;for(let s of Object.values(e)){if(!s||s.bead_id!==t||s.status==="running")continue;let o=typeof s.finished_at=="number"?s.finished_at:typeof s.started_at=="number"?s.started_at:0;o>=r&&(r=o,n=s)}return n}function pu(e,t){let n=Object.values(e||{}),r=new Set,s=new Map;for(let i of n)!i||typeof i.bead_id!="string"||(typeof i.resumed_from=="string"&&i.resumed_from.length>0&&r.add(i.resumed_from),s.set(i.bead_id,i.attempt_id));let o=new Map;for(let i of n){if(!i||typeof i.bead_id!="string"||i.bead_id.length===0)continue;let l=null;if(i.status==="running")l="running";else if(i.status==="paused"&&!r.has(i.attempt_id))l="paused";else if(i.status==="failed"||i.status==="orphaned"){let _=t.get(i.bead_id),v=typeof _=="number"&&_>0&&typeof i.finished_at=="number"&&_>=i.finished_at;s.get(i.bead_id)===i.attempt_id&&!v&&typeof i.dismissed_at!="number"&&(l="failed")}if(!l)continue;let a=typeof i.started_at=="number"?i.started_at:null,d=o.get(i.bead_id);if(d){let _=_a[d.run_state],v=_a[l];if(_>v||_===v&&(d.started_at??0)>(a??0))continue}let p=typeof i.session_id=="string"&&i.session_id.length>0;o.set(i.bead_id,{attempt_id:typeof i.attempt_id=="string"?i.attempt_id:"",run_state:l,started_at:a,last_event_at:typeof i.last_event_at=="number"?i.last_event_at:null,model:typeof i.model=="string"?i.model:null,usage:qt(e,i.bead_id),can_pause:l==="running"&&p,can_resume:l!=="running"&&p&&!r.has(i.attempt_id)})}return o}function ma(e,t){let n=e[t];if(!n)return"";if(n.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let r=typeof n.reason=="string"?n.reason:"",s=r.indexOf(":");return s>0&&s<r.length-1?`\u26D4 ${r.slice(0,s)} (${r.slice(s+1)})`:`\u26D4 ${r}`}function Rt(e){return e&&typeof e=="object"?e:{}}function Ns(e,t,n){let r=Array.isArray(e)?e:[],s=Array.isArray(t)?t:[],o=n&&typeof n.done_since=="number"?n.done_since:void 0,i=new Map;for(let h of s)h&&typeof h.root_dir=="string"&&i.set(h.root_dir,h);let l=[],a=[],d=[],p=[],_=[],v=new Map;for(let h of r){if(!h||typeof h.root_dir!="string")continue;let A=h.root_dir,V=h.name||A,K=i.get(A),ne=K&&typeof K.revision=="number"?K.revision:typeof h.revision=="number"?h.revision:0,q=Rt(h.attempts),L=Rt(h.bead_titles),S=Rt(h.pr_observations),R=Rt(h.admission),H=Rt(h.revise_parked),pe=Rt(h.merge_queue_state),$e=Rt(h.cleanup_failed),me=Array.isArray(h.merge_queue)?h.merge_queue:[],fe=new Set(me.filter(D=>D&&typeof D.bead_id=="string").map(D=>D.bead_id)),Ee=Array.isArray(h.queue)?h.queue:[],Ue=Array.isArray(h.done)?h.done:[],Ke=new Map;for(let D of Ue)D&&typeof D.bead_id=="string"&&typeof D.added_at=="number"&&Ke.set(D.bead_id,D.added_at);let He=D=>({id:D,title:L[D]||D,root_dir:A,workspace_name:V,expected_revision:ne,draggable:!1}),ke=new Set;for(let[D,U]of pu(q,Ke))ke.add(D),a.push({...He(D),lane:"running",attempt_id:U.attempt_id,run_state:U.run_state,can_pause:U.can_pause,can_resume:U.can_resume,started_at:U.started_at,last_event_at:U.last_event_at,model:U.model,usage:U.usage,badges:U.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:U.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:[],alert:U.run_state==="failed"});for(let D of Array.isArray(h.pr_wait)?h.pr_wait:[]){let U=D&&D.bead_id;if(typeof U!="string"||ke.has(U))continue;ke.add(U);let _e=Rt(S[U]),oe=Rt(_e.pr),we=_e.gate?Rt(_e.gate):null,ge=fe.has(U),Be=pe.active===U,be=D.external===!0,Ce=$e[U]||null,F=!!we&&we.base_badge==="\uCDA9\uB3CC",O=!!Ce&&!!we&&we.tier==="merged",re=be&&!!we&&we.tier==="merged";d.push({...He(U),lane:"pr_wait",pr_number:typeof oe.number=="number"?oe.number:null,pr_url:typeof oe.url=="string"?oe.url:void 0,external:be,usage:qt(q,U),badges:Ce?["\uC815\uB9AC \uC2E4\uD328"]:[],alert:!!Ce,reason:Ce?"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644":"PR \uB300\uAE30",merge_action:!ge,merge_enabled:we?.enabled===!0||F||O||re,merge_label:re?"\uC815\uB9AC":F&&!O?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:re?"\uBA38\uC9C0\uB428 \u2014 \uD074\uB9AD\uD558\uBA74 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC\uB97C \uC218\uD589\uD569\uB2C8\uB2E4":O?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uCC98\uC74C\uBD80\uD130 \uB2E4\uC2DC \uC218\uD589\uD569\uB2C8\uB2E4":F?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":we?.enabled===!0?`\uBA38\uC9C0 (${we.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${we?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:ge,cancel_enabled:!Be,discard_action:!be&&!Ce&&!(we&&we.tier==="merged"),discard_enabled:!Be&&!ge,discard_title:ge?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":void 0})}for(let D=0;D<Ee.length;D++){let U=Ee[D],_e=U&&U.bead_id;if(typeof _e!="string"||ke.has(_e))continue;ke.add(_e);let oe=H[_e],we={...He(_e),lane:"queue",reason:ma(R,_e),queue_position:D+1,queue_index:D,queue_length:Ee.length,badges:oe?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!oe,revise_action:!!oe,revise_enabled:!!oe,revise_title:oe?oe.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${oe.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""};p.push(we);let ge=v.get(A);ge?ge.push(we):v.set(A,[we])}for(let D of Array.isArray(h.runnable)?h.runnable:[]){let U=D&&D.bead_id;typeof U!="string"||ke.has(U)||(ke.add(U),l.push({...He(U),title:D.title||L[U]||U,lane:"runnable",draggable:!0,reason:ma(R,U),created_at:D.created_at??void 0,updated_at:D.updated_at??void 0,labels:Array.isArray(D.labels)?D.labels:[],workflow:D.route?{route:D.route,chips:{route:D.route}}:null,place_index:Ee.length}))}for(let D of Ue){let U=D&&D.bead_id;if(typeof U!="string"||ke.has(U)||(ke.add(U),o!==void 0&&typeof D.added_at=="number"&&D.added_at<o))continue;let _e=uu(q,U);_.push({...He(U),lane:"done",done:!0,usage:qt(q,U),done_at:typeof D.added_at=="number"?D.added_at:void 0,done_kind:_e&&typeof _e.done_kind=="string"?_e.done_kind:null})}}a.sort((h,A)=>(A.last_event_at??0)-(h.last_event_at??0)),_.sort((h,A)=>(A.done_at??0)-(h.done_at??0));let T=s.length>0?s:r.map(h=>({root_dir:h&&h.root_dir,name:h&&h.name,auto_advance:h&&h.auto_advance,auto_merge:h&&h.auto_merge,slots:h&&h.slots,revision:h&&h.revision,exec_defaults:h&&h.exec_defaults,default_exec_preset_id:h&&h.default_exec_preset_id,runner_catalog:h&&h.runner_catalog})),k=[];for(let h of T)!h||typeof h.root_dir!="string"||k.push({root_dir:h.root_dir,name:h.name||h.root_dir,auto_advance:h.auto_advance===!0,auto_merge:h.auto_merge===!0,slots:typeof h.slots=="number"&&h.slots>=Jn?h.slots:Jn,revision:typeof h.revision=="number"?h.revision:0,exec_defaults:Rt(h.exec_defaults),default_exec_preset_id:typeof h.default_exec_preset_id=="string"?h.default_exec_preset_id:null,runner_catalog:Rt(h.runner_catalog),items:v.get(h.root_dir)||[]});return{runnable:l,queue:p,queue_groups:k,running:a,pr_wait:d,done:_,automation:{total:k.length,both_on:k.filter(h=>h.auto_advance&&h.auto_merge).length}}}function fu(e,t){if(typeof e!="number"||!Number.isFinite(e))return"";let r=t-e<lu;return c`<span
    class="mon-beat${r?" mon-beat--live":""}"
    title=${`\uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${gt(e)}`}
    ><span class="mon-beat__dot" aria-hidden="true"></span>${r?"":c`<span class="mon-beat__age"
          >${Tt(e,t)}</span
        >`}</span
  >`}function er(e){return c`<div class="mon-c__title">${e.title}</div>`}function tr(e){return c`<span class="mon-c__id" title="클릭하면 상세로 이동"
    >${e.id}</span
  >`}function Nr(e){return e.workspace_name?c`<span class="mon-c__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:""}function Fs(e){let t=Dt(e.usage);return t?c`<span class="mon-c__usage" title=${An(e.usage)}
        >${t}</span
      >`:""}function qs(e){return(Array.isArray(e.badges)?e.badges:[]).map(n=>c`<span class="mon-c__badge${e.alert?" mon-c__badge--alert":""}"
        >${n}</span
      >`)}function _u(e){return c`<span class="mon-c__ops">
    ${e.run_state==="running"?c`<button
          type="button"
          class="mon-op mon-op--pause"
          ?disabled=${e.can_pause===!1}
          aria-label="일시정지"
          title="일시정지 — 세션을 끊고 이어하기 가능 상태로 둡니다"
        >
          ${Ps()}
        </button>`:c`<button
          type="button"
          class="mon-op mon-op--resume"
          ?disabled=${e.can_resume===!1}
          aria-label="이어하기"
          title="이어하기"
        >
          ${Os()}
        </button>`}
    <button
      type="button"
      class="mon-op mon-op--stop"
      aria-label="중단"
      title="중단 — 세션을 죽이고 대기 큐에서 뺍니다"
    >
      ${Ms()}
    </button>
    ${e.run_state==="failed"?c`<button
          type="button"
          class="mon-op mon-op--dismiss"
          aria-label="실패 기록 닫기"
          title="실패 기록 닫기"
        >
          ${ca()}
        </button>`:""}
  </span>`}function mu(e,t){let n=typeof e.started_at=="number"?Ls(t-e.started_at):"";return c`${er(e)}
    <div class="mon-c__meta">
      ${qs(e)}${fu(e.last_event_at,t)}${tr(e)}${Nr(e)}
      ${e.model?c`<span class="mon-c__model">${e.model}</span>`:""}
      ${n?c`<span class="mon-live__elapsed">${n}</span>`:""}
      ${Fs(e)}${_u(e)}
    </div>`}function gu(e){let t=e.workflow,r=(t&&t.chips||{}).route||t&&t.route,s=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),o=Tt(e.updated_at);return c`${er(e)}
    <div class="mon-c__meta">
      <span class="mon-c__grip" aria-hidden="true">⠿</span>${tr(e)}
      ${r?c`<span class="ctl-chip ctl-chip--route">${r}</span>`:""}
      ${mr(e.labels,null).map(i=>c`<span class="ctl-chip ctl-chip--label">${i}</span>`)}
      ${Nr(e)}
      ${o?c`<span title=${`\uC218\uC815 ${gt(e.updated_at)}`}
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
    </div>`}function hu(e){return c`${er(e)}
    <div class="mon-c__meta">
      <span class="mon-c__grip" aria-hidden="true">⠿</span>
      <span class="mon-live__pos">#${e.queue_position}</span>${tr(e)}
      ${qs(e)}
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
        </div>`:""}`}function bu(e){let t=!!(Dt(e.usage)||e.merge_action||e.cancel_action||e.discard_action);return c`${er(e)}
    <div class="mon-c__meta">
      ${tr(e)}${Nr(e)}
      ${e.pr_url&&e.pr_number?c`<a
            class="mon-c__pr"
            href=${e.pr_url}
            target="_blank"
            rel="noreferrer noopener"
            title="PR 열기"
            >#${e.pr_number} ↗</a
          >`:""}
      ${qs(e)}
      ${e.reason?c`<span class="mon-c__reason">${e.reason}</span>`:""}
    </div>
    ${t?c`<div class="mon-c__tail">
          ${Fs(e)}
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
        </div>`:""}`}function vu(e,t){let n=e.done_kind||"",r=n?cu[n]||n:"",s=Tt(e.done_at,t);return c`${er(e)}
    <div class="mon-c__meta">
      ${tr(e)}${Nr(e)}
      ${r?c`<span
            class="mon-live__kind${du.has(n)?" mon-live__kind--ok":" mon-live__kind--warn"}"
            >${r}</span
          >`:""}
      ${Fs(e)}
      ${s?c`<span title=${`\uC644\uB8CC ${gt(e.done_at)}`}
            >완료 ${s}</span
          >`:""}
    </div>`}function ga(e,t){return e.lane==="running"?mu(e,t):e.lane==="runnable"?gu(e):e.lane==="queue"?hu(e):e.lane==="pr_wait"?bu(e):vu(e,t)}function ha(e){let t=String(e.revision);return c`<header
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
        ${e.auto_advance?Ps():Os()}
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
        ${da()}
        <span class="mon-ctl__label">머지</span>
      </button>
      <label class="mon-ctl mon-ctl--slots" title="동시에 실행할 세션 수">
        ${ua()}
        <span class="mon-ctl__label">슬롯</span>
        <input
          type="number"
          class="mon-slots__input"
          min=${Jn}
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
        ${pa()}
        <span class="mon-ctl__label">설정</span>
      </button>
    </span>
  </header>`}function ba(e){let{total:t,both_on:n}=e.automation,r=t>0&&n===t,s=Ft.find(o=>o.value===e.done_range)?.label||"";return c`<div class="mon-top">
    <button
      type="button"
      class="mon-auto-all${r?" is-active":""}"
      data-on=${r?"false":"true"}
      aria-pressed=${r?"true":"false"}
      ?disabled=${t===0}
      title=${r?"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uB055\uB2C8\uB2E4 (\uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4)":"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uCF2D\uB2C8\uB2E4"}
    >
      ${r?Ms():fa()}
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
        ${Ft.map(o=>c`<option
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
  </div>`}function va(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function ya(e){let t={};for(let i of Ht)t[i]=0;let n=!1,r=0,s=0,o=0;for(let i of Array.isArray(e)?e:[]){let l=i&&i.usage;if(l&&typeof l=="object"){let a=!1;for(let d of Ht){let p=l[d];typeof p=="number"&&Number.isFinite(p)&&(t[d]+=p,n=!0,a=!0)}if(a){s+=1;let d=l.total_cost_usd;typeof d=="number"&&Number.isFinite(d)&&(r+=d,o+=1)}}}return s>0&&o===s&&(t.total_cost_usd=r),n?Dt(t):null}var ka="bdui.monitor.done-range";function yu(){try{let e=window.localStorage.getItem(ka);return zt(e)?e:Et}catch{return Et}}function wu(e){try{window.localStorage.setItem(ka,e)}catch{}}var $a="tab:monitor:pipeline",ku=1e3,$u=[{lane:"runnable",pane:"candidate",title:"\uC2E4\uD589\uAC00\uB2A5",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589\uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}];function wa(e,t){let n=e.lane==="runnable"||e.lane==="queue";return c`<div
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
    ${ga(e,t)}
  </div>`}function xa(e,t){let n=Ve("views:monitor"),r=t.gotoIssue,s=t.pipelineStore,o=t.transport,i=t.execPresetStore,l=t.getWorkspacePath,a=t.switchWorkspace,d=t.now||(()=>Date.now()),p=t.confirm||(M=>typeof globalThis.confirm!="function"||globalThis.confirm(M)),_=yu();function v(){let M=Ft.find(B=>B.value===_);return M?M.label:""}let T=document.createElement("div");T.className="mon",e.appendChild(T);let k=Ns(null,null),h=null,A=new Map,V=new Set;function K(M){return k.queue_groups.find(B=>B.root_dir===M)||null}let q=Pr(e,{queueStore:{get(){if(!h)return{revision:0,exec_defaults:{},default_exec_preset_id:null};let M=A.get(h);if(M)return M;let B=K(h),P=s&&s.get?s.get():null,ae=(Array.isArray(P)?P:[]).find(ce=>ce&&ce.root_dir===h);return{revision:B?B.revision:0,exec_defaults:B?B.exec_defaults:{},default_exec_preset_id:B?B.default_exec_preset_id:null,runner_catalog:B?B.runner_catalog:null,workspace_info:ae?ae.workspace_info:void 0}},set(M){h&&A.set(h,M);for(let B of Array.from(V))B()},subscribe(M){return V.add(M),()=>V.delete(M)}},presetStore:i,transport:o?(M,B)=>o(M,M==="worker-queue-set-default-exec-preset"||M==="get-worker-system-prompt"?{...B||{},root_dir:h}:B):void 0,getWorkspacePath:()=>h||void 0}),L=null,S=null;async function R(M,B,P,ae){if(!o||!P)return null;let ce=await o(M,{...B,root_dir:P,expected_revision:ae});if(ce&&ce.conflict){let w=ce.queue&&typeof ce.queue.revision=="number"?ce.queue.revision:ae;ce=await o(M,{...B,root_dir:P,expected_revision:w})}return ce&&ce.queue&&P&&A.set(P,ce.queue),ce}async function H(M,B,P){return!o||!P?null:await o(M,{...B,root_dir:P})}async function pe(M){if(!o||!M&&!p("\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB055\uB2C8\uB2E4. \uAC01 \uB808\uD3EC\uC758 \uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uD568\uAED8 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?"))return;let B=await o("monitor-auto-toggle",{on:M}),P=B&&Array.isArray(B.failed)?B.failed:[];P.length>0&&se(`\uC790\uB3D9\uD654 ${M?"\uCF1C\uAE30":"\uB044\uAE30"} \uC77C\uBD80 \uC2E4\uD328: ${P.map(ae=>ae.root_dir).join(", ")}`,"error",3200)}async function $e(){let M=new Map;for(let B of k.pr_wait)M.has(B.root_dir)||M.set(B.root_dir,B.expected_revision);for(let[B,P]of M)await R("worker-merge-queue-add-all",{},B,P)}let me=null,fe=!1,Ee=null;function Ue(){Ee!==null&&clearTimeout(Ee),Ee=setTimeout(()=>{Ee=null,fe=!1},0)}function Ke(M){let B=M.target;return typeof B?.closest=="function"?B.closest(".mon-group"):null}function He(M){let B=Ke(M);return!B||!me?null:(B.getAttribute("data-root-dir")||"")===me.root_dir?B:null}function ke(){for(let M of Array.from(T.querySelectorAll(".mon-group--drag-over")))M.classList.remove("mon-group--drag-over")}function D(M){let B=M.target,P=typeof B?.closest=="function"?B.closest('.mon-card[draggable="true"]'):null;if(P){me={bead_id:P.getAttribute("data-issue-id")||"",lane:P.getAttribute("data-lane")||"",root_dir:P.getAttribute("data-root-dir")||"",revision:Number(P.getAttribute("data-revision")||0)||0,queue_index:Number(P.getAttribute("data-queue-index")),queue_length:Number(P.getAttribute("data-queue-length")),place_index:Number(P.getAttribute("data-place-index"))},fe=!0;try{M.dataTransfer?.setData("text/plain",me.bead_id),M.dataTransfer&&(M.dataTransfer.effectAllowed="move")}catch{}}}function U(M){let B=He(M);B&&(M.preventDefault(),M.dataTransfer&&(M.dataTransfer.dropEffect="move"),B.classList.add("mon-group--drag-over"))}function _e(M){Ke(M)?.classList.remove("mon-group--drag-over")}function oe(){me=null,ke(),Ue()}function we(M){let B=He(M),P=me;if(me=null,ke(),!B||!P||!P.bead_id)return;M.preventDefault();let ae=M.target,ce=typeof ae?.closest=="function"?ae.closest('.mon-card[data-lane="queue"]'):null,w=ce&&B.contains(ce)?Number(ce.getAttribute("data-queue-index")):NaN;if(P.lane==="runnable"){let J=Number.isFinite(w)?w:P.place_index;if(!Number.isFinite(J))return;R("worker-queue-place",{bead_id:P.bead_id,index:J},P.root_dir,P.revision);return}if(P.lane!=="queue"||ce&&ce.getAttribute("data-issue-id")===P.bead_id)return;let W=P.queue_index,j=Number.isFinite(w)?W>w?w:w-1:P.queue_length-1;!Number.isFinite(j)||j<0||j===W||R("worker-queue-reorder",{bead_id:P.bead_id,to_index:j},P.root_dir,P.revision)}function ge(M){let B={runnable:k.runnable,queue:k.queue,running:k.running,pr_wait:k.pr_wait,done:k.done};return c`${ba({automation:k.automation,counts:{running:k.running.length,queue:k.queue.length,pr_wait:k.pr_wait.length},done_range:_,token_total:ya(k.done),token_tooltip:va(v())})}
      <div class="worker-lanes mon-lanes">
        ${$u.map(P=>{let ae=B[P.lane],ce=P.lane==="queue"?k.queue_groups.length>0?c`${k.queue_groups.map(w=>c`<div
                        class="mon-group"
                        data-root-dir=${w.root_dir}
                      >
                        ${ha(w)}
                        <div class="mon-group__list">
                          ${w.items.map(W=>wa(W,M))}
                        </div>
                      </div>`)}`:void 0:ae.length>0?c`${ae.map(w=>wa(w,M))}`:void 0;return Bt({id:`monitor-${P.lane}`,lane:P.pane,title:P.lane==="done"?`\uC644\uB8CC\xB7${v()}`:P.title,items:ae,empty:P.empty,body:ce,live:P.lane==="running"&&ae.length>0,header_control:P.lane==="pr_wait"&&ae.length>0?c`<button
                    type="button"
                    class="mon-lane-op mon-merge-all"
                    title="자격이 생기는 PR을 각 레포의 머지 큐에 한 번에 넣습니다"
                  >
                    일괄 머지
                  </button>`:""})})}
      </div>`}function Be(){let M=s&&s.get?s.get():null,B=s&&s.getWorkspacesState?s.getWorkspacesState():[],P=d();k=Ns(M,B,{done_since:vn(_,P)}),Oe(ge(P),T)}function be(M,B){let P=l?l():void 0;if(!B||!P||B===P||!a){r(M);return}a(B).then(()=>{r(M)}).catch(ae=>{n("workspace switch for %s failed: %o",B,ae)})}function Ce(M){return{root_dir:M.getAttribute("data-root-dir")||"",revision:Number(M.getAttribute("data-revision")||0)||0}}function F(M,B){let{root_dir:P,revision:ae}=Ce(M),ce=M.getAttribute("data-issue-id")||"",w=M.getAttribute("data-attempt-id")||"",W=B.classList;if(W.contains("worker-card__place")){R("worker-queue-place",{bead_id:ce,index:Number(M.getAttribute("data-place-index")||0)||0},P,ae);return}if(W.contains("mon-op--up")||W.contains("mon-op--down")){let j=Number(M.getAttribute("data-queue-index")||0)||0,J=W.contains("mon-op--up")?j-1:j+1;if(J<0)return;R("worker-queue-reorder",{bead_id:ce,to_index:J},P,ae);return}if(W.contains("mon-op--remove")){R("worker-queue-remove",{bead_id:ce},P,ae);return}if(W.contains("mon-op--pause")){H("worker-attempt-pause",{attempt_id:w},P);return}if(W.contains("mon-op--stop")){H("worker-attempt-stop",{attempt_id:w},P);return}if(W.contains("mon-op--resume")){R("worker-attempt-resume",{attempt_id:w},P,ae);return}if(W.contains("mon-op--dismiss")){R("worker-attempt-dismiss",{attempt_id:w},P,ae);return}if(W.contains("worker-mini__merge")){R("worker-merge-queue-add",{bead_id:ce},P,ae);return}if(W.contains("worker-mini__merge-cancel")){R("worker-merge-queue-remove",{bead_id:ce},P,ae);return}if(W.contains("worker-mini__discard")){if(!p(`${ce}: PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4. \uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`))return;R("worker-pr-discard",{bead_id:ce},P,ae);return}if(W.contains("worker-mini__revise-fix")){R("worker-revise-fix",{bead_id:ce},P,ae);return}W.contains("worker-mini__revise-approve")&&R("worker-revise-approve",{bead_id:ce},P,ae)}function O(M){let B=fe;fe=!1;let P=M.target;if(!P||typeof P.closest!="function"||P.closest("dialog")||P.closest("a"))return;let ae=P.closest(".mon-auto-all");if(ae){M.preventDefault(),pe(ae.getAttribute("data-on")==="true");return}if(P.closest(".mon-merge-all")){M.preventDefault(),$e();return}let w=P.closest(".mon-ctl--advance");if(w){M.preventDefault();let{root_dir:Ne,revision:Ze}=Ce(w);R("worker-queue-toggle",{on:w.getAttribute("data-on")==="true"},Ne,Ze);return}let W=P.closest(".mon-ctl--merge-auto");if(W){M.preventDefault();let{root_dir:Ne,revision:Ze}=Ce(W);R("worker-merge-auto-toggle",{on:W.getAttribute("data-on")==="true"},Ne,Ze);return}let j=P.closest(".mon-ctl--exec");if(j){M.preventDefault(),h=j.getAttribute("data-root-dir")||null,A.delete(h||""),q.open();return}let J=P.closest(".mon-card");if(!J)return;let de=P.closest("button");if(de){M.preventDefault(),F(J,de);return}let Te=J.getAttribute("data-issue-id");Te&&!B&&(M.preventDefault(),be(Te,J.getAttribute("data-root-dir")||""))}function re(M){let B=M.target;if(!B||typeof B.closest!="function")return;let P=B.closest(".mon-done-range");if(P){_=zt(P.value)?P.value:Et,wu(_),Be();return}let ae=B.closest(".mon-slots__input");if(!ae)return;let{root_dir:ce,revision:w}=Ce(ae),W=Number(ae.value);if(!Number.isFinite(W))return;let j=Math.max(Jn,Math.floor(W));R("worker-queue-set-slots",{slots:j},ce,w)}e.addEventListener("click",O),e.addEventListener("change",re),e.addEventListener("dragstart",D),e.addEventListener("dragover",U),e.addEventListener("dragleave",_e),e.addEventListener("drop",we),e.addEventListener("dragend",oe),s&&typeof s.subscribe=="function"&&(L=s.subscribe(()=>{try{A.clear(),Be();for(let M of Array.from(V))M()}catch{}}));function xe(){S!==null&&(clearInterval(S),S=null)}function Re(){Ee!==null&&(clearTimeout(Ee),Ee=null)}return{load(){n("load"),Be(),S===null&&(S=setInterval(()=>{try{Be()}catch{}},ku))},pause(){xe()},clear(){xe(),Re(),L&&(L(),L=null),e.removeEventListener("click",O),e.removeEventListener("change",re),e.removeEventListener("dragstart",D),e.removeEventListener("dragover",U),e.removeEventListener("dragleave",_e),e.removeEventListener("drop",we),e.removeEventListener("dragend",oe),q.destroy(),V.clear(),e.replaceChildren()}}}function Sa(e,t,n){let r=Ve("views:nav"),s=null;function o(a){return d=>{d.preventDefault(),r("click tab %s",a),n.gotoView(a)}}function i(){let a=t.getState(),d=a.view==="worker"||a.view==="monitor"?a.view:"board";return c`
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
    `}function l(){Oe(i(),e)}return l(),s=t.subscribe(()=>l()),{destroy(){s&&(s(),s=null),Oe(c``,e)}}}var Aa=["bug","feature","task","epic","chore"];function Ta(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var Ea=["Critical","High","Medium","Low","Backlog"];function Ca(e,t){let n=document.createElement("dialog");n.id="new-issue-dialog",n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true"),n.innerHTML=`
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
  `,e.appendChild(n);let r=n.querySelector("#new-issue-form"),s=n.querySelector("#new-title"),o=n.querySelector("#new-type"),i=n.querySelector("#new-priority"),l=n.querySelector("#new-labels"),a=n.querySelector("#new-description"),d=n.querySelector("#new-issue-error"),p=n.querySelector("#btn-cancel"),_=n.querySelector("#btn-create"),v=n.querySelector(".new-issue__close");function T(){o.replaceChildren();let L=document.createElement("option");L.value="",L.textContent="\u2014 Select \u2014",o.appendChild(L);for(let S of Aa){let R=document.createElement("option");R.value=S,R.textContent=Ta(S),o.appendChild(R)}i.replaceChildren();for(let S=0;S<=4;S+=1){let R=document.createElement("option");R.value=String(S);let H=Ea[S]||"Medium";R.textContent=`${S} \u2013 ${H}`,i.appendChild(R)}}T();function k(){try{typeof n.close=="function"?n.close():n.removeAttribute("open")}catch{n.removeAttribute("open")}}function h(L){s.disabled=L,o.disabled=L,i.disabled=L,l.disabled=L,a.disabled=L,p.disabled=L,_.disabled=L,_.textContent=L?"Creating\u2026":"Create"}function A(){d.textContent=""}function V(L){d.textContent=L}function K(){try{let L=window.localStorage.getItem("beads-ui.new.type");L?o.value=L:o.value="";let S=window.localStorage.getItem("beads-ui.new.priority");S&&/^\d$/.test(S)?i.value=S:i.value="2"}catch{o.value="",i.value="2"}}function ne(){let L=o.value||"",S=i.value||"";L.length>0&&window.localStorage.setItem("beads-ui.new.type",L),S.length>0&&window.localStorage.setItem("beads-ui.new.priority",S)}async function q(){A();let L=String(s.value||"").trim();if(L.length===0){V("Title is required"),s.focus();return}let S=Number(i.value||"2");if(!(S>=0&&S<=4)){V("Priority must be 0..4"),i.focus();return}let R=String(o.value||""),H=String(a.value||""),pe={title:L};R.length>0&&(pe.type=R),String(S).length>0&&(pe.priority=S),H.length>0&&(pe.description=H),h(!0);try{await t("create-issue",pe)}catch{h(!1),V("Failed to create issue");return}ne(),h(!1),k()}return n.addEventListener("cancel",L=>{L.preventDefault(),k()}),v.addEventListener("click",()=>k()),p.addEventListener("click",()=>k()),n.addEventListener("keydown",L=>{L.key==="Enter"&&(L.ctrlKey||L.metaKey)&&(L.preventDefault(),q())}),r.addEventListener("submit",L=>{L.preventDefault(),q()}),{open(){r.reset(),A(),K();try{"showModal"in n&&typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")}catch{n.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){k()}}}var xu=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function Ra(e){return String(e).padStart(2,"0")}function Su(e,t){let n=Math.max(0,Math.ceil((e-t)/6e4)),r=Math.floor(n/1440),s=Math.floor(n%1440/60),o=n%60;return r>0?`${r}d${s>0?` ${s}h`:""}`:s>0?`${s}h${o>0?` ${o}m`:""}`:`${o}m`}function Au(e,t=Date.now()){let n=Date.parse(e);if(!Number.isFinite(n))return"";let r=new Date(n),s=new Date(t),o=`${Ra(r.getHours())}:${Ra(r.getMinutes())}`,l=r.getFullYear()===s.getFullYear()&&r.getMonth()===s.getMonth()&&r.getDate()===s.getDate()?o:`${xu[r.getMonth()]} ${r.getDate()} ${o}`;return`${Su(n,t)} \xB7 ${l}`}function Tu(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}var Ia=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage"}];function La(e){let t=!1,n=null,r=new Map;function s(){Oe(c``,e),e.hidden=!0}function o(){let a=Ia.filter(p=>r.has(p.key));if(a.length===0){s();return}let d=Date.now();Oe(c`<div class="usage-meter" aria-label="Usage">
        ${a.map(p=>{let _=r.get(p.key),v=typeof _.ageSeconds=="number"&&_.ageSeconds>600,T=v?`${Math.floor(_.ageSeconds/60)}\uBD84 \uC804 \uCE21\uC815`:"";return c`<span
            class="usage-meter__group${v?" usage-meter__group--stale":""}"
            aria-label=${`${p.label} usage`}
          >
            <span class="usage-meter__provider">${p.label}</span>
            ${_.windows.map(k=>{let h=typeof k.pct=="number"&&Number.isFinite(k.pct)?k.pct:0,A=Math.min(100,Math.max(0,h)),K=`resets ${Au(k.resetsAt,d)}${v?` \xB7 ${T}`:""}`;return c`<span
                class="usage-meter__window ${Tu(A)}"
                style=${`--progress: ${A}%`}
                title=${K}
              >
                <span class="usage-meter__label">${k.key}</span>
                <span class="usage-meter__track" aria-hidden="true">
                  <span class="usage-meter__fill"></span>
                </span>
                <span class="usage-meter__pct">${A}%</span>
              </span>`})}
          </span>`})}
      </div>`,e),e.hidden=!1}async function i(a){try{let d=await fetch(a.endpoint);if(!d.ok)return null;let p=await d.json();return!p||p.available!==!0||!Array.isArray(p.windows)?null:p}catch{return null}}async function l(){let a=await Promise.all(Ia.map(async d=>({provider:d,payload:await i(d)})));if(!t){for(let d of a)d.payload?r.set(d.provider.key,d.payload):r.delete(d.provider.key);o()}}return s(),l(),n=setInterval(()=>{l()},6e4),{destroy(){t=!0,n!==null&&(clearInterval(n),n=null),s()}}}var Eu="worker-ineligible";function Cu(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Da(e){return Cu(e).includes(Eu)}var Ru="tab:worker:ready",Iu="tab:worker:blocked",Lu="tab:worker:in-progress",nr=1;function Oa(e){return Zn(e).path.length>0}var Fa="beads-ui.worker.candidate-filter",Bs={show_blocked:!1,spec:"all"};function Du(e,t){if(!e||typeof e!="object"||Array.isArray(e))return!1;let n=Object.values(e),r=new Set;for(let s of n)s&&typeof s=="object"&&typeof s.resumed_from=="string"&&s.resumed_from.length>0&&r.add(s.resumed_from);return n.some(s=>s&&typeof s=="object"&&s.bead_id===t&&s.cleanup_diagnosis===!0&&(s.status==="running"||s.status==="paused"&&!r.has(s.attempt_id)))}function Ou(){try{let e=window.localStorage.getItem(Fa);if(!e)return{...Bs};let t=JSON.parse(e);if(!t||typeof t!="object")return{...Bs};let n=t.spec;return{show_blocked:t.show_blocked===!0,spec:n==="with"||n==="without"?n:"all"}}catch{return{...Bs}}}function Pu(e){try{window.localStorage.setItem(Fa,JSON.stringify(e))}catch{}}function Mu(e,t){let n=l=>t.show_blocked||!l.blocked,r=l=>t.spec==="all"||(t.spec==="with"?l.has_spec:!l.has_spec),s=[],o=0,i=0;for(let l of e){let a=n(l),d=r(l);a&&d?s.push(l):!a&&d?o+=1:a&&!d&&(i+=1)}return{visible:s,hidden_blocked:o,hidden_spec:i}}var Nu=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],qa="bdui.worker.candidate_sort",Fu=[{value:"spec",label:"spec \uC6B0\uC120"},{value:"board",label:"Board \uC21C\uC11C"},{value:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131\uC21C"}],Fr="spec";function qu(){try{let e=window.localStorage.getItem(qa);return e==="board"||e==="created"||e==="spec"?e:Fr}catch{return Fr}}function Bu(e){try{window.localStorage.setItem(qa,e)}catch{}}var Ba="bdui.worker.done-range";function Uu(){try{let e=window.localStorage.getItem(Ba);return zt(e)?e:Et}catch{return Et}}function zu(e){try{window.localStorage.setItem(Ba,e)}catch{}}var Hu="(max-width: 640px)",Ua="beads-ui.worker.lane-collapsed",rr={queue:!0,done:!0};function ju(){try{let e=window.localStorage.getItem(Ua);if(!e)return{...rr};let t=JSON.parse(e);return!t||typeof t!="object"?{...rr}:{queue:typeof t.queue=="boolean"?t.queue:rr.queue,done:typeof t.done=="boolean"?t.done:rr.done}}catch{return{...rr}}}function Wu(e){try{window.localStorage.setItem(Ua,JSON.stringify(e))}catch{}}function Pa(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let n=typeof t.title=="string"?t.title:t.id||"";return n.length>22?`${n.slice(0,22)}\u2026`:n}function Gu(e,t,n){let r=Array.isArray(e)?e.slice():[];return t==="created"?r.sort(dn):(r.sort(cr(n)),t==="board"?r:[...r.filter(Oa),...r.filter(s=>!Oa(s))])}function Yu(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function Vu(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function Ku(e){let n=(Array.isArray(e?.dependencies)?e.dependencies:[]).map(r=>typeof r=="string"?r:r&&r.id).filter(Boolean);return n.length>0?`\u{1F512} ${n.join(", ")}`:"\u{1F512} blocked"}var Zu=["closed_unmerged","undecidable"],Xu=[{from:"\uAD00\uCE21 \uB300\uAE30",activity:"checking",to:"\uD655\uC778\uC911"},{from:"\uB85C\uCEEC\uAC80\uC99D \uB300\uAE30",activity:"verifying",to:"\uB85C\uCEEC\uAC80\uC99D \uC2E4\uD589 \uC911"}];function Qu(e,t){for(let n of Xu)if(e===n.from&&t===n.activity)return{label:n.to,live:!0};return{label:e,live:!1}}var Us=[{step:"merging",label:"\uBA38\uC9C0 \uC911"},{step:"base_sync",label:"base \uB3D9\uAE30\uD654"},{step:"post_merge_verify",label:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D"},{step:"deploy",label:"\uBC30\uD3EC"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"}];function Ju(e){if(typeof e!="string"||e.length===0)return null;let t=Us.length,n=Us.findIndex(r=>r.step===e);return n<0?{label:e,index:0,total:t,percent:0}:{label:Us[n].label,index:n+1,total:t,percent:Math.round((n+1)/t*100)}}function Ma(e){switch(e){case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";default:return e}}function Na(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}function ep(e,t,n,r,s=null,o=null,i=null,l=!1,a=null,d=!0,p=null,_=null){let v=!!a&&a.position>0,T=!!a&&a.active===!0,k=a&&a.failure||null,h=n[e]||null,A=h&&h.gate?h.gate:null,V=h&&h.pr?h.pr:null,K=[];l&&K.push("\uC138\uC158");let ne=i?i==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":null,q=Qu(l&&A&&A.tier==="closed_unmerged"?"\uB2EB\uD798":A&&A.gate_badge||"",ne?null:o&&o.activity||null);ne&&K.push(ne),q.label&&K.push(q.label),A&&A.base_badge&&A.base_badge!==A.gate_badge&&K.push(A.base_badge),_&&K.push(_),r&&K.push("\uC815\uB9AC \uC2E4\uD328"),v&&!T&&K.push(`\uBA38\uC9C0 \uB300\uAE30 #${a.position}`),k&&K.push(`\uC77C\uAD04 \uBA38\uC9C0 \uC2E4\uD328: ${Ma(k)}`),p&&K.push(`\uC790\uB3D9 \uC81C\uC678: ${Ma(p)}`);let L=!!A&&A.base_badge==="\uCDA9\uB3CC",S=!!A&&A.enabled===!0,R=Ju(o&&o.merge_progress?o.merge_progress.step:null),H=!!r&&!!A&&A.tier==="merged",pe=l&&!!A&&A.tier==="merged",$e=l&&L&&d===!1;return{id:e,title:t,reason:r?"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644":"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",external:l,pr_number:V&&typeof V.number=="number"?V.number:null,pr_url:V&&typeof V.url=="string"?V.url:"",badges:K,live_badge:i==="running"?ne:ne?null:q.live?q.label:null,usage:s,alert:!!A&&Zu.includes(A.tier)||!!r||!!k,merge_action:!v,cancel_action:v,cancel_enabled:!T,cancel_title:T?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard_action:!l&&!r&&!(A&&A.tier==="merged"),merge_step:R,discard_enabled:!R&&!i&&!v,discard_title:i?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":v?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":void 0,merge_enabled:!R&&!i&&!$e&&(S||L||H||pe),merge_label:pe?"\uC815\uB9AC":L&&!R&&!H?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:R?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${R.label}`:pe?"\uBA38\uC9C0\uB428 \u2014 \uD074\uB9AD\uD558\uBA74 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC\uB97C \uC218\uD589\uD569\uB2C8\uB2E4":$e?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":i==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":i==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":H?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uCC98\uC74C\uBD80\uD130 \uB2E4\uC2DC \uC218\uD589\uD569\uB2C8\uB2E4":L?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":S?`\uBA38\uC9C0 (${A.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:A&&A.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${A&&A.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function zs(e,t={}){let{transport:n,issueStores:r,queueStore:s,execPresetStore:o,sessionLogStore:i,uiOrderStore:l,gotoIssue:a,getWorkspacePath:d}=t,p=r?ur(r,l):null,_=fr({transport:n,uiOrderStore:l}),v=null,T=[],k=Ou(),h=qu(),A=Uu();function V(){let u=Ft.find(m=>m.value===A);return u?u.label:"\uC624\uB298"}let K=ju(),ne=!1,q=new Set,L=new Set,S=new Set,R=[],H=document.createElement("div");H.className="worker-console";let pe=document.createElement("div");pe.className="worker-top";let $e=document.createElement("div");$e.className="worker-drawer-overlay",$e.hidden=!0;let me=document.createElement("div");me.className="worker-drawer-overlay__backdrop";let fe=document.createElement("div");fe.className="worker-drawer-host",$e.append(me,fe);let Ee=document.createElement("div");Ee.className="worker-lanes-host",H.append(pe,$e,Ee),e.appendChild(H);let Ue=null,Ke=Ir(fe,{transport:n,sessionLogStore:i,onClose:()=>{Ue=null,$e.hidden=!0,De()}}),He=Pr(H,{queueStore:s,presetStore:o,transport:n,getWorkspacePath:d});function ke(){return s&&s.get()||{revision:0,auto_advance:!1,auto_merge:!1,pr_wait_holds_slot:!1,slots:nr,queue:[],pr_wait:[],done:[]}}function D(){let u=ke();return typeof u.revision=="number"?u.revision:0}function U(u){u&&u.queue&&s&&s.set(u.queue)}function _e(){let u=ke().queue;return Array.isArray(u)?u.length:0}async function oe(u,m){if(!n)return;let E=await n("worker-queue-place",{bead_id:u,index:m,expected_revision:D()});U(E),E&&E.conflict&&await n("worker-queue-place",{bead_id:u,index:m,expected_revision:D()}).then(U)}async function we(u,m){if(!n)return;let E=await n("worker-queue-reorder",{bead_id:u,to_index:m,expected_revision:D()});U(E),E&&E.conflict&&await n("worker-queue-reorder",{bead_id:u,to_index:m,expected_revision:D()}).then(U)}async function ge(u){if(!n)return;let m=await n("worker-queue-remove",{bead_id:u,expected_revision:D()});U(m),m&&m.conflict&&await n("worker-queue-remove",{bead_id:u,expected_revision:D()}).then(U)}async function Be(u){!n||!u||await n("worker-attempt-stop",{attempt_id:u})}async function be(u){if(!n||!u)return;let m=await n("worker-attempt-pause",{attempt_id:u});m&&m.paused===!1&&m.reason&&se(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${m.reason}`,"error",2400)}async function Ce(u){if(!n||!u)return;let m=await n("worker-attempt-resume",{attempt_id:u,expected_revision:D()});U(m),m&&m.conflict&&(m=await n("worker-attempt-resume",{attempt_id:u,expected_revision:D()}),U(m)),m&&m.resumed===!1&&!m.conflict&&m.reason&&se(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${m.reason}`,"error",2400)}async function F(u){if(!n||!u)return;let m=await n("worker-attempt-dismiss",{attempt_id:u,expected_revision:D()});U(m),m&&m.conflict&&(m=await n("worker-attempt-dismiss",{attempt_id:u,expected_revision:D()}),U(m)),m&&m.dismissed===!1&&!m.conflict&&m.reason&&se(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${m.reason}`,"error",2400)}async function O(u){if(!n||!u||S.has(u))return;S.add(u),De();let m;try{m=await n("worker-cleanup-diagnose",{bead_id:u,expected_revision:D()}),U(m),m&&m.conflict&&(m=await n("worker-cleanup-diagnose",{bead_id:u,expected_revision:D()}),U(m))}finally{S.delete(u),De()}m&&!m.conflict&&m.ok===!1&&m.reason&&se(`AI \uC815\uB9AC \uAC70\uBD80: ${m.reason}`,"error",2400)}async function re(u,m){if(!n)return null;let E=n,X=await E(u,{...m,expected_revision:D()});return U(X),X&&X.conflict&&(X=await E(u,{...m,expected_revision:D()}),U(X)),X}async function xe(u){if(!n||!u)return;q.add(u),De();let m;try{m=await re("worker-merge-queue-add",{bead_id:u})}finally{q.delete(u),De()}!m||m.conflict||m.applied||se("\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)","error",2400)}async function Re(u){if(!n)return;let m=await re("worker-merge-auto-toggle",{on:u});!m||m.conflict||se(u?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",u?"success":"info",2400)}async function M(u){if(!n||!u)return;let m=await re("worker-merge-queue-remove",{bead_id:u});m&&!m.conflict&&!m.applied&&m.reason==="merge_active"&&se("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function B(){await re("worker-merge-queue-remove",{all:!0})}async function P(u){if(!n||!u||!(typeof globalThis.confirm!="function"||globalThis.confirm(`${u}: PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4. \uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694. \uACC4\uC18D\uD560\uAE4C\uC694?`)))return;let E=await n("worker-pr-discard",{bead_id:u,expected_revision:D()});if(U(E),E&&E.conflict&&(E=await n("worker-pr-discard",{bead_id:u,expected_revision:D()}),U(E)),E&&E.discarded===!0){se("\uD3D0\uAE30 \uC644\uB8CC \u2014 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB2E4\uC2DC \uC2E4\uD589\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4","success",2400);return}E&&E.discarded===!1&&!E.conflict&&se(`\uD3D0\uAE30 \uAC70\uBD80: ${E.reason||""}`,"error",2800)}async function ae(u,m){if(!n||!m||L.has(m))return;L.add(m),De();let E;try{E=await n(u,{bead_id:m,expected_revision:D()}),U(E),E&&E.conflict&&(E=await n(u,{bead_id:m,expected_revision:D()}),U(E))}finally{L.delete(m),De()}if(!(!E||E.conflict)){if(E.ok){se(u==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}se(`\uCC98\uBD84 \uAC70\uBD80: ${E.reason||""}`,"error",3e3)}}async function ce(u){if(!n)return;let m=await n("worker-queue-toggle",{on:u,expected_revision:D()});U(m),m&&m.conflict&&await n("worker-queue-toggle",{on:u,expected_revision:D()}).then(U)}async function w(u){await ce(u),await Re(u)}async function W(u){if(!n||!Number.isFinite(u))return;let m=Math.max(nr,Math.floor(u)),E=await n("worker-queue-set-slots",{slots:m,expected_revision:D()});U(E),E&&E.conflict&&await n("worker-queue-set-slots",{slots:m,expected_revision:D()}).then(U)}async function j(u){if(!n)return;let m=await n("worker-queue-set-pr-wait-hold",{on:u,expected_revision:D()});U(m),m&&m.conflict&&await n("worker-queue-set-pr-wait-hold",{on:u,expected_revision:D()}).then(U)}function J(){let u=ke(),m=p?p.selectBoardColumn(Ru,"ready"):[],E=p?p.selectBoardColumn(Iu,"blocked"):[],X=p?p.selectBoardColumn(Lu,"in_progress"):[],he=new Map;for(let $ of X){let G=Vu($);if(!G)continue;let ue=he.get(G);ue?ue.push($):he.set(G,[$])}let Se=$=>{let G=pr(he.get($)||[]);return G?G.title||G.id:null},ye=u.bead_titles||{},ie=new Map;for(let[$,G]of Object.entries(ye))typeof G=="string"&&G.length>0&&ie.set($,G);for(let $ of[...m,...E])ie.set($.id,$.title||$.id);let Ie=u.bead_times||{},Ge=new Map;for(let[$,G]of Object.entries(Ie))G&&typeof G=="object"&&Ge.set($,G);for(let $ of[...m,...E])Ge.set($.id,{created_at:$.created_at,updated_at:$.updated_at});let Ae=$=>Ge.get($)||{},at=u.pr_wait||[],St=u.pr_observations||{},$t=u.pr_activity||{},et=u.cleanup_failed||{},At=Object.entries(et).map(([$,G])=>({bead_id:$,step:G&&G.step?G.step:"",reason:G&&G.reason?G.reason:"",detail:G&&typeof G.detail=="string"?G.detail:null,output_tail:G&&typeof G.output_tail=="string"&&G.output_tail?G.output_tail:void 0,log_path:G&&typeof G.log_path=="string"&&G.log_path?G.log_path:void 0,diagnosis:G&&G.diagnosis&&typeof G.diagnosis=="object"&&typeof G.diagnosis.verdict=="string"&&typeof G.diagnosis.evidence=="string"?{verdict:G.diagnosis.verdict,evidence:G.diagnosis.evidence,fix_bead_id:typeof G.diagnosis.fix_bead_id=="string"?G.diagnosis.fix_bead_id:null,malformed:G.diagnosis.malformed===!0}:null,diagnosis_pending:S.has($)||Du(u.attempts,$)})),ve=u.queue||[],Ye=new Set([...ve.map($=>$.bead_id),...at.map($=>$.bead_id),...u.done.map($=>$.bead_id)]),It=new Set(E.map($=>$.id)),Vt=l?l.get()?.order||{}:{},le=new Set,b=[];for(let $ of[...m,...E])Ye.has($.id)||le.has($.id)||Yu($)||Da($.labels)||(le.add($.id),b.push($));T=Gu(b,h,Vt);let z=u.admission||{},f=$=>{let G=z[$];if(!G)return"";if(G.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let ue=typeof G.reason=="string"?G.reason:"",je=ue.indexOf(":");return je>0&&je<ue.length-1?`\u26D4 ${ue.slice(0,je)} (${ue.slice(je+1)})`:`\u26D4 ${ue}`},y=T.map($=>{let G=Zn($),ue=G.path.length>0,je=$.workflow?.route==="quick_fix"||$.metadata&&$.metadata.route==="quick_fix",Ur=!je&&ue&&!G.conflict,so=It.has($.id),gn=[];so&&gn.push(Ku($)),je?gn.push("quick_fix \xB7 \uC6CC\uCEE4 \uBE44\uB300\uC0C1"):G.conflict?gn.push("spec_id_conflict"):ue||gn.push("spec \uC5C6\uC74C");let oo=f($.id);return oo&&gn.push(oo),{id:$.id,title:$.title||$.id,reason:gn.join(" \xB7 "),draggable:Ur,lane:"candidate",created_at:$.created_at,updated_at:$.updated_at,workflow:$.workflow,is_quick_fix:je,status:$.status,blocked:so,has_spec:ue}}),Q=Mu(y,k),te=Q.visible,Z=u.revise_parked||{},g=($,G)=>$.map(ue=>{let je=G==="queue"?Z[ue.bead_id]:null;return{id:ue.bead_id,title:ie.get(ue.bead_id)||ue.bead_id,reason:G==="done"?"":f(ue.bead_id),draggable:G!=="done",done:G==="done",lane:G,badges:je?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!je,revise_action:!!je,revise_enabled:!!je&&!L.has(ue.bead_id),revise_title:je?je.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${je.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":"",usage:G==="done"?qt(u.attempts||{},ue.bead_id):null,done_at:G==="done"&&typeof ue.added_at=="number"?ue.added_at:void 0,...Ae(ue.bead_id)}}),I=new Map;for(let $ of u.done)$&&typeof $.bead_id=="string"&&typeof $.added_at=="number"&&I.set($.bead_id,$.added_at);let x=u.attempts?Object.values(u.attempts):[],Y=new Set;for(let $ of x)$&&typeof $.resumed_from=="string"&&$.resumed_from.length>0&&Y.add($.resumed_from);let Pe=new Map;for(let $ of x)Pe.set($.bead_id,$.attempt_id);let rt=new Map;for(let $ of x)rt.set($.attempt_id,$);function mt($){let G=new Set,ue=$;for(;ue&&!G.has(ue.attempt_id);){if(ue.conflict_resolution===!0)return!0;G.add(ue.attempt_id),ue=typeof ue.resumed_from=="string"&&ue.resumed_from.length>0&&rt.get(ue.resumed_from)||null}return!1}let Me=typeof u.declared_base=="string"?u.declared_base:null;function Kt($){let G=null;for(let ue of x)!ue||ue.bead_id!==$||mt(ue)||(G===null||(typeof ue.started_at=="number"?ue.started_at:0)>=(typeof G.started_at=="number"?G.started_at:0))&&(G=ue);return G&&typeof G.target_base=="string"?G.target_base:null}let rn=[],Nt=null;for(let $ of x){let G=$.status==="paused"&&!Y.has($.attempt_id);if($.status==="running"||G)rn.push({bead_id:$.bead_id,attempt_id:$.attempt_id,title:ie.get($.bead_id)||$.bead_id,runner:$.runner||null,model:$.model||null,effort:$.effort||null,started_at:typeof $.started_at=="number"?$.started_at:null,resumed_from:$.resumed_from||null,paused:G,conflict_resolution:mt($),base_exception:Na(Me,$.target_base),can_pause:typeof $.session_id=="string"&&$.session_id.length>0,usage:qt(u.attempts||{},$.bead_id),current_child:Se($.bead_id),...Ae($.bead_id)});else if($.status==="failed"||$.status==="orphaned"){let ue=Pe.get($.bead_id)!==$.attempt_id,je=I.get($.bead_id),Ur=typeof je=="number"&&je>0&&typeof $.finished_at=="number"&&je>=$.finished_at;!ue&&!Ur&&typeof $.dismissed_at!="number"&&(Nt=$)}}let Gs=null;if(Nt){let $=typeof Nt.session_id=="string"&&Nt.session_id.length>0,G=Y.has(Nt.attempt_id),ue=Nt.cause_detail;Gs={repo:Nt.repo||"",reason:Nt.cause||Nt.status,cause_detail:ue&&typeof ue.reason=="string"?{reason:ue.reason,command:typeof ue.command=="string"?ue.command:null}:null,resume_attempt_id:Nt.attempt_id,resume_eligible:$&&!G,resume_reason:$?G?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}}let Ja=new Set(rn.map($=>$.bead_id)),qr=Array.isArray(u.merge_queue)?u.merge_queue:[],Ys=new Map;qr.forEach(($,G)=>{$&&typeof $.bead_id=="string"&&Ys.set($.bead_id,G+1)});let Vs=u.merge_queue_state||{active:null,failures:{}},el=Vs.failures||{},tl=u.auto_merge_skips||{},Ks=$=>{let G=tl[$];if(!G)return null;let ue=St[$],je=ue&&ue.pr?ue.pr.head_sha:null;return je&&je===G.head_sha?G.reason||"":null},sr=new Map;for(let $ of rn)$.conflict_resolution&&($.paused?sr.has($.bead_id)||sr.set($.bead_id,"paused"):sr.set($.bead_id,"running"));let Zs=rn.filter($=>!$.paused).length,Xs=(u.workspace_info||{}).slots,nl=typeof Xs=="number"?Xs:typeof u.slots=="number"?u.slots:nr,Qs=u.pr_wait_holds_slot===!0?nr:nl,rl=Zs>Qs,Js=vn(A),sl=(Array.isArray(u.done)?u.done.slice():[]).filter($=>Js===void 0||typeof $.added_at!="number"||$.added_at>=Js).sort(($,G)=>(G.added_at||0)-($.added_at||0)),eo=g(sl,"done"),or={};for(let $ of Ht)or[$]=0;let to=!1,no=0,Br=0,ro=0;for(let $ of eo){let G=$.usage;if(G&&typeof G=="object"){let ue=!1;for(let je of Ht)Number.isFinite(G[je])&&(or[je]+=G[je],to=!0,ue=!0);ue&&(Br+=1,Number.isFinite(G.total_cost_usd)&&(no+=G.total_cost_usd,ro+=1))}}Br>0&&ro===Br&&(or.total_cost_usd=no);let ol=to?Dt(or):null;return{queue:u,idToTitle:ie,candidates:te,candidate_hidden:{blocked:Q.hidden_blocked,spec:Q.hidden_spec},running:rn,live_count:Zs,slots:Qs,over_cap:rl,failure:Gs,waiting:g(ve.filter($=>!Ja.has($.bead_id)),"queue"),pr_wait:at.map($=>ep($.bead_id,ie.get($.bead_id)||$.bead_id,St,et[$.bead_id]||null,qt(u.attempts||{},$.bead_id),$t[$.bead_id]||(q.has($.bead_id)?{activity:null,merge_progress:{step:"merging"}}:null),sr.get($.bead_id)||null,$.external===!0,{position:Ys.get($.bead_id)||0,active:Vs.active===$.bead_id,failure:el[$.bead_id]||null},$.wt_present!==!1,u.auto_merge===!0?Ks($.bead_id):null,Na(Me,Kt($.bead_id)))).map($=>({...$,...Ae($.id)})),merge_queue_length:qr.length,merge_queue_running:qr.length>0,auto_excluded:at.map($=>$.bead_id).filter($=>Ks($)!==null),verify_cmd_present:!!(u.workspace_info||{}).verify_cmd,declared_base:Me,done:eo,token_total:ol,cleanup_failures:At}}function de(u){let m=u.waiting.length>0?u.waiting[0].id:"\u2014",E=c`<button
      type="button"
      class="worker-play${u.queue.auto_advance?" is-active":""}"
    >
      ${u.queue.auto_advance?"\u23F8 \uC77C\uC2DC\uC815\uC9C0":"\u25B6 \uC790\uB3D9 \uC9C4\uD589"}
    </button>`,X=u.queue.auto_advance===!0&&u.queue.auto_merge===!0,he=c`<button
      type="button"
      class="worker-auto-all${X?" is-active":""}"
      title=${X?"\uC790\uB3D9 \uC9C4\uD589\uACFC \uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uB055\uB2C8\uB2E4":"\uC790\uB3D9 \uC9C4\uD589\uACFC \uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uCF2D\uB2C8\uB2E4"}
      aria-pressed=${X?"true":"false"}
    >
      ${X?"\u23F9 \uC804\uCCB4 \uC790\uB3D9\uD654":"\u23F5\u23F5 \uC804\uCCB4 \uC790\uB3D9\uD654"}
    </button>`,Se=u.over_cap?c`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",ye=c`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${u.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${u.pr_wait.length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${V()} 완료 <b>${u.done.length}</b></span
      >`,ie=c`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${u.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${u.declared_base||"?"}</span
    >`,Ie=c`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${nr}
          step="1"
          .value=${String(u.slots)}
          ?disabled=${u.queue.pr_wait_holds_slot===!0}
          title=${u.queue.pr_wait_holds_slot===!0?"\uBA38\uC9C0\uAE4C\uC9C0 \uC21C\uCC28 \uC2E4\uD589 \uC911 \u2014 \uD574\uC81C\uD558\uBA74 \uC800\uC7A5\uB41C \uB3D9\uC2DC \uC2E4\uD589 \uC218\uB85C \uB3CC\uC544\uAC11\uB2C8\uB2E4":"\uB3D9\uC2DC\uC5D0 \uC2E4\uD589\uD560 \uC138\uC158 \uC218 (\uCD5C\uC18C 1 = \uC21C\uCC28 \uC2E4\uD589)"}
      /></label>
      <label
        class="worker-tgl"
        title="각 이슈가 PR 머지·정리를 마칠 때까지 다음 이슈를 시작하지 않습니다"
      >
        <input
          type="checkbox"
          class="worker-pr-wait-hold"
          .checked=${u.queue.pr_wait_holds_slot===!0}
        />
        머지까지 순차 실행
      </label>
      <button
        type="button"
        class="worker-exec-defaults-btn"
        aria-haspopup="dialog"
        aria-label="전역 실행 설정"
        title="전역 실행 설정"
      >
        ⚙
      </button>`,Ge=la({failure:u.failure,cleanupFailures:u.cleanup_failures});return ne?c`<div class="worker-ribbon">
          ${E}
          <div class="worker-kpi worker-kpi--ribbon">${Se}${ye}</div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${he}${Ie}</div>
          <div class="worker-kpi">${ie}</div>
        </div>
        ${Ge}`:c`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${E}${he}${Ie}</div>
        <div class="worker-kpi">
          ${Se}${ye}${ie}
          ${u.token_total?c`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${`${V()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}
                >${V()} 완료 · 누적 ${u.token_total}</span
              >`:""}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${m}</b></span
          >
        </div>
      </div>
      ${Ge}`}function Te(u){if(u.running.length===0&&u.pr_wait.length===0)return"";let m=u.running.some(E=>!E.paused);return c`<section
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
          >${u.running.length+u.pr_wait.length}</span
        >
        ${st(u)}
      </header>
      ${u.running.length>0?Ds(u.running,Date.now(),Ue):""}
      ${u.pr_wait.map(E=>Is(E))}
    </section>`}function Ne(u){let m=u.candidate_hidden;return c`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${k.show_blocked}
        />
        🔒 blocked${m.blocked>0?` ${m.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${Nu.map(E=>c`<button
              type="button"
              class="worker-filter__chip${k.spec===E.value?" is-active":""}"
              data-spec=${E.value}
              aria-pressed=${k.spec===E.value?"true":"false"}
            >
              ${E.label}
            </button>`)}
        ${m.spec>0?c`<span class="worker-filter__hidden">숨김 ${m.spec}</span>`:""}
      </div>
    </div>`}function Ze(){return c`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${h}
    >
      ${Fu.map(u=>c`<option value=${u.value} ?selected=${h===u.value}>
            ${u.label}
          </option>`)}
    </select>`}function Xe(){return c`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${A}
      >
        ${Ft.map(u=>c`<option value=${u.value} ?selected=${A===u.value}>
              ${u.label}
            </option>`)}
      </select>
    </div>`}function lt(u){let m=(u.queue.pr_wait||[]).filter(X=>X&&X.external!==!0&&typeof X.bead_id=="string"),E=new Set(u.running.filter(X=>!X.paused).map(X=>X.bead_id));for(let X of m)E.add(X.bead_id);if(!(u.queue.pr_wait_holds_slot!==!0||u.queue.auto_advance!==!0||u.queue.auto_merge===!0||m.length===0||u.waiting.length===0||E.size<u.slots))return c`<div class="worker-stat worker-pr-wait-hint">
      PR 머지 대기 중 — 다음 이슈는 머지·정리 완료 후 시작됩니다 (자동 머지
      꺼짐)
    </div>`}function st(u){let m=u.queue.auto_merge===!0;if(u.merge_queue_running)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop${m?" is-active":""}"
        title=${m?"\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB044\uACE0 \uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)":"\uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)"}
      >
        ${m?"\u23F8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8":"\uC77C\uAD04 \uBA38\uC9C0 \uC911\uB2E8"} ${u.merge_queue_length}
      </button>`;if(m)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop is-active"
        title="자동 머지 켜짐 — 자격이 생기는 PR을 계속 큐에 넣습니다. 클릭하면 끕니다"
      >
        ⏸ 자동 머지
      </button>`;let E=new Set(u.auto_excluded),X=u.pr_wait.filter(he=>he.merge_action&&he.merge_enabled&&!E.has(he.id)).length;return c`<button
      type="button"
      class="worker-merge-all"
      title=${u.verify_cmd_present?"\uCF1C \uB450\uBA74 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uCDA9\uB3CC \uD574\uC18C\xB7\uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uCF1C \uB450\uBA74 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uCDA9\uB3CC \uD574\uC18C\xB7\uBA38\uC9C0\uD569\uB2C8\uB2E4 \u2014 \uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uB294 \uAC80\uC99D \uC2E0\uD638\uAC00 \uC5C6\uC5B4 CI\xB7\uB85C\uCEEC\uAC80\uC99D \uC5C6\uC774 \uBA38\uC9C0\uB429\uB2C8\uB2E4"}
    >
      ▶ 자동 머지${X>0?` ${X}`:""}
    </button>`}function pt(u){let m=Bt({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:u.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:Ze(),controls:Ne(u)});return ne?c`<div class="worker-lanes worker-lanes--mobile">
        ${Te(u)}
        ${Bt({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:u.waiting,empty:"\uB4DC\uB798\uADF8 \uB610\uB294 [\uB300\uAE30\uB85C \u21B4]\uB85C \uBC30\uCE58",controls:lt(u),collapsible:!0,collapsed:K.queue,preview:Pa(u.waiting)})}
        ${m}
        ${Bt({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:u.done,empty:`${V()} \uC644\uB8CC \uC5C6\uC74C`,controls:Xe(),collapsible:!0,collapsed:K.done,preview:u.token_total||Pa(u.done)})}
      </div>`:c`<div class="worker-lanes">
      ${m}
      ${Bt({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:u.waiting,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58",controls:lt(u)})}
      ${Bt({id:"worker-pane-running",lane:"running",title:`\uC2E4\uD589 \uC911 \xB7 \uC2AC\uB86F ${u.slots}`,items:u.running,live:u.running.some(E=>!E.paused),body:Ds(u.running,Date.now(),Ue)})}
      ${Bt({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:u.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C",header_control:st(u)})}
      ${Bt({id:"worker-pane-done",lane:"done",title:`\uC644\uB8CC \xB7 ${V()} ${u.done.length}`,items:u.done,empty:`${V()} \uC644\uB8CC \uC5C6\uC74C`,controls:Xe()})}
    </div>`}function ht(u){K={...K,[u]:!K[u]},Wu(K),De()}function De(){let u=J();Oe(de(u),pe),Oe(pt(u),Ee)}function ot(){let u=document.querySelector(".app-header");if(!u)return;let m=()=>{let E=Math.round(u.getBoundingClientRect().height);H.style.setProperty("--worker-ribbon-top",`${E}px`)};if(m(),typeof ResizeObserver=="function"){let E=new ResizeObserver(m);E.observe(u),R.push(()=>E.disconnect())}else window.addEventListener("resize",m),R.push(()=>window.removeEventListener("resize",m))}function We(){if(typeof window.matchMedia!="function")return;let u=window.matchMedia(Hu);ne=!!u.matches;let m=E=>{let X=!!(E&&typeof E.matches=="boolean"?E.matches:u.matches);X!==ne&&(ne=X,De())};typeof u.addEventListener=="function"?(u.addEventListener("change",m),R.push(()=>u.removeEventListener("change",m))):typeof u.addListener=="function"&&(u.addListener(m),R.push(()=>u.removeListener(m)))}function ft(u){let m=u.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!m)return;let E=m.dataset.beadId||"",X=m.dataset.lane||"";v={bead_id:E,from_lane:X};try{u.dataTransfer?.setData("text/plain",E),u.dataTransfer&&(u.dataTransfer.effectAllowed="move")}catch{}}function ct(u){let m=u.target?.closest?.(".worker-pane");if(!m)return;let E=m.dataset.lane||"";E!=="candidate"&&E!=="queue"||(u.preventDefault(),u.dataTransfer&&(u.dataTransfer.dropEffect="move"),m.classList.add("worker-pane--drag-over"))}function nt(u){u.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function it(u,m){let E=T.find(ye=>ye.id===u);if(!E)return;let X=T.filter(ye=>ye.id!==u),he=X.length;if(m){let ye=m.dataset.beadId;if(ye===u)return;let ie=X.findIndex(Ie=>Ie.id===ye);ie>=0&&(he=ie)}let Se=X.slice();Se.splice(he,0,E),_.applyReorder(u,Se,he)}function _t(u){let m=u.target?.closest?.(".worker-pane");if(!m)return;u.preventDefault(),m.classList.remove("worker-pane--drag-over");let E=m.dataset.lane||"",X=v?.bead_id||u.dataTransfer?.getData("text/plain")||"",he=v?.from_lane||"";if(v=null,!X)return;let Se=u.target?.closest?.(".worker-mini, .worker-card"),ye=Array.from(m.querySelectorAll(".worker-mini, .worker-card")),ie=ye.length;if(Se){let Ie=ye.indexOf(Se);Ie>=0&&(ie=Ie)}if(m.classList.contains("worker-pane--collapsed")&&(ie=_e()),E==="candidate"){if(he==="candidate"){it(X,Se);return}he==="queue"&&ge(X);return}E==="queue"&&(he==="queue"?we(X,ie):oe(X,ie))}function Je(u){k=u,Pu(u),De()}function bt(u){h=u==="board"||u==="created"||u==="spec"?u:Fr,Bu(h),De()}function Qe(u){A=zt(u)?u:Et,zu(A),De()}function dt(u){let m=u.target?.closest?.(".worker-filter__blocked");if(m){Je({...k,show_blocked:m.checked});return}let E=u.target?.closest?.(".worker-done-range");if(E){Qe(E.value);return}let X=u.target?.closest?.(".worker-sort");if(X){bt(X.value||Fr);return}let he=u.target?.closest?.(".worker-pr-wait-hold");if(he){j(he.checked);return}let Se=u.target?.closest?.(".worker-slots__input");if(!Se)return;let ye=Number.parseInt(Se.value,10);if(!Number.isFinite(ye)){De();return}W(ye).then(De)}function ut(u){return u?{runner:u.runner||void 0,model:u.model||void 0,effort:u.effort||void 0,worktree:u.worktree||void 0,status:u.status||void 0,session_id:u.session_id||void 0}:{}}function C(u){let m=ke(),E=m.attempts?m.attempts[u]:null;Ue=u,$e.hidden=!1,Ke.open({attempt_id:u,meta:ut(E)}),De()}function N(){if(!Ue)return;let u=ke(),m=u.attempts?u.attempts[Ue]:null;if(m){Ke.updateMeta(ut(m));return}Ke.close()}function ee(u){let m=u.target;if(m?.closest?.("#worker-exec-defaults-dialog"))return;if(m?.closest?.(".worker-exec-defaults-btn")){He.open();return}let E=m?.closest?.(".worker-banner__resume");if(E){let ve=E.dataset.attemptId;ve&&Ce(ve);return}let X=m?.closest?.(".worker-banner__dismiss");if(X){let ve=X.dataset.attemptId;ve&&F(ve);return}let he=m?.closest?.(".worker-banner__cleanup-diagnose");if(he){let ve=he.dataset.beadId;ve&&O(ve);return}if(m?.closest?.(".worker-play")){ce(!ke().auto_advance);return}if(m?.closest?.(".worker-auto-all")){let ve=ke();w(!(ve.auto_advance===!0&&ve.auto_merge===!0));return}let Se=m?.closest?.(".worker-merge-all");if(Se){Se.classList.contains("worker-merge-all--stop")?ke().auto_merge===!0?Re(!1):B():Re(!0);return}let ye=m?.closest?.(".worker-pane__hd--toggle");if(ye){let ve=ye.dataset.lane;(ve==="queue"||ve==="done")&&ht(ve);return}let ie=m?.closest?.(".worker-card__place");if(ie){let ve=ie.dataset.beadId;ve&&!ie.disabled&&oe(ve,_e());return}let Ie=m?.closest?.(".worker-filter__chip");if(Ie){let ve=Ie.dataset.spec;(ve==="all"||ve==="with"||ve==="without")&&Je({...k,spec:ve});return}let Ge=m?.closest?.(".worker-mini__merge");if(Ge){xe(Ge.dataset.beadId||"");return}let Ae=m?.closest?.(".worker-mini__merge-cancel");if(Ae){M(Ae.dataset.beadId||"");return}let at=m?.closest?.(".worker-mini__discard");if(at){P(at.dataset.beadId||"");return}let St=m?.closest?.(".worker-mini__revise-fix");if(St){ae("worker-revise-fix",St.dataset.beadId||"");return}let $t=m?.closest?.(".worker-mini__revise-approve");if($t){ae("worker-revise-approve",$t.dataset.beadId||"");return}if(m?.closest?.(".worker-mini__pr"))return;if(m?.closest?.(".rtile__stop")){let Ye=m?.closest?.(".rtile")?.dataset?.attemptId;Ye&&Be(Ye);return}if(m?.closest?.(".rtile__pause")){let Ye=m?.closest?.(".rtile")?.dataset?.attemptId;Ye&&be(Ye);return}if(m?.closest?.(".rtile__resume")){let Ye=m?.closest?.(".rtile")?.dataset?.attemptId;Ye&&Ce(Ye);return}if(m?.closest?.(".rtile__session")){let Ye=m?.closest?.(".rtile")?.dataset?.attemptId;Ye&&C(Ye);return}if(m?.closest?.(".worker-drawer-overlay__backdrop")){Ke.close();return}if(m?.closest?.(".worker-drawer-host"))return;let et=m?.closest?.(".rtile");if(et){if(m?.closest?.(".rtile__id")){let Ye=et.dataset.beadId;Ye&&un(Ye).then(It=>{It?se("\uBCF5\uC0AC\uB428","success",1200):se("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let ve=et.dataset.beadId;ve&&a&&a(ve);return}let At=m?.closest?.(".worker-mini, .worker-card");if(At){let ve=At.dataset.beadId;if(m?.closest?.(".worker-mini__id, .worker-card__id")){ve&&un(ve).then(Ye=>{Ye?se("\uBCF5\uC0AC\uB428","success",1200):se("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}ve&&a&&a(ve)}}return e.addEventListener("dragstart",ft),e.addEventListener("dragover",ct),e.addEventListener("dragleave",nt),e.addEventListener("drop",_t),e.addEventListener("click",ee),e.addEventListener("change",dt),We(),ot(),p&&R.push(p.subscribe(De)),s&&R.push(s.subscribe(()=>{De(),N()})),De(),{load(){De()},openExecDefaults(){He.open()},destroy(){for(let u of R.splice(0))try{u()}catch{}e.removeEventListener("dragstart",ft),e.removeEventListener("dragover",ct),e.removeEventListener("dragleave",nt),e.removeEventListener("drop",_t),e.removeEventListener("click",ee),e.removeEventListener("change",dt);try{Ke.destroy()}catch{}$e.hidden=!0;try{He.destroy()}catch{}Oe(c``,e)}}}function Hs(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function za(e,t,n,r=async()=>{},s=async()=>{}){let o=Ve("views:workspace-picker"),i=null,l=!1,a=!1,d=!1;async function p(S){let H=S.target.value,$e=t.getState().workspace?.current?.path||"";if(H&&H!==$e){o("switching workspace to %s",H),l=!0,L();try{await n(H)}catch(me){o("workspace switch failed: %o",me)}finally{l=!1,L()}}}async function _(){let S=t.getState(),R=S.workspace?.current?.path||S.workspace?.available?.[0]?.path||"";if(!(!R||a)){o("git-pulling workspace %s",R),a=!0,L();try{await r(R)}catch(H){o("workspace git pull failed: %o",H)}finally{a=!1,L()}}}function v(S){let R=S.target;R&&e.contains(R)||h()}function T(S){S.key==="Escape"&&h()}function k(){d||(d=!0,document.addEventListener("mousedown",v),document.addEventListener("keydown",T),L())}function h(){d&&(d=!1,document.removeEventListener("mousedown",v),document.removeEventListener("keydown",T),L())}function A(){d?h():k()}async function V(S){let R=S.target,H=R.value,pe=R.checked;o("toggling visibility %s \u2192 %s",H,String(pe));try{await s(H,pe)}catch($e){o("workspace visibility toggle failed: %o",$e)}}function K(S){return S?c`
      <button
        type="button"
        class="workspace-picker__git-pull-button"
        @click=${_}
        ?disabled=${l||a}
        aria-label="Git Pull"
        title="Git Pull"
      >
        <span aria-hidden="true">⬇</span>
      </button>
    `:c``}function ne(S,R){return c`
      <div class="workspace-picker__manage">
        <button
          type="button"
          class="workspace-picker__manage-button"
          @click=${A}
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
                ${S.map(H=>c`
                    <label
                      class="workspace-picker__manage-row"
                      title="${H.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${H.path}"
                        .checked=${!R.has(H.path)}
                        @change=${V}
                      />
                      <span class="workspace-picker__manage-name"
                        >${Hs(H.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function q(){let S=t.getState(),R=S.workspace?.current,H=S.workspace?.available||[],pe=new Set(S.workspace?.hidden||[]),$e=R?.path||H[0]?.path||"";if(H.length===0)return c``;let me=H.filter(fe=>!pe.has(fe.path)||fe.path===$e);if(me.length<=1){let fe=me[0]||H[0],Ee=Hs(fe.path);return c`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${fe.path}"
            >${Ee}</span
          >
          ${ne(H,pe)}
          ${K($e)}
          ${a?c`<span
                class="workspace-picker__loading"
                aria-hidden="true"
              ></span>`:""}
        </div>
      `}return c`
      <div class="workspace-picker">
        <select
          class="workspace-picker__select"
          @change=${p}
          ?disabled=${l||a}
          aria-label="Select project workspace"
        >
          ${me.map(fe=>c`
              <option
                value="${fe.path}"
                ?selected=${fe.path===$e}
                title="${fe.path}"
              >
                ${Hs(fe.path)}
              </option>
            `)}
        </select>
        ${ne(H,pe)}
        ${K($e)}
        ${l||a?c`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function L(){Oe(q(),e)}return L(),i=t.subscribe(()=>L()),{destroy(){i&&(i(),i=null),document.removeEventListener("mousedown",v),document.removeEventListener("keydown",T),Oe(c``,e)}}}var Ha=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-queue-set-slots","worker-queue-set-pr-wait-hold","worker-queue-set-default-exec-preset","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-worker-system-prompt","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-exec-presets","unsubscribe-exec-presets","exec-presets-snapshot","exec-preset-create","exec-preset-update","exec-preset-delete","apply-exec-preset","monitor-auto-toggle"];function js(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function ja(e,t,n=js()){return{id:n,type:e,payload:t}}function Wa(e={}){let t=Ve("ws"),n={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},r=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",i=0,l=null,a=!0,d=new Map,p=[],_=new Map,v=new Set;function T(q){for(let L of Array.from(v))try{L(q)}catch{}}function k(){if(!a||l)return;o="reconnecting",t("ws reconnecting\u2026"),T(o);let q=Math.min(n.maxMs||0,(n.initialMs||0)*Math.pow(n.factor||1,i)),L=(n.jitterRatio||0)*q,S=Math.max(0,Math.round(q+(Math.random()*2-1)*L));t("ws retry in %d ms (attempt %d)",S,i+1),l=setTimeout(()=>{l=null,ne()},S)}function h(q){try{s?.send(JSON.stringify(q))}catch(L){t("ws send failed",L)}}function A(){for(o="open",t("ws open"),T(o),i=0;p.length;){let q=p.shift();q&&h(q)}}function V(q){let L;try{L=JSON.parse(String(q.data))}catch{t("ws received non-JSON message");return}if(!L||typeof L.id!="string"||typeof L.type!="string"){t("ws received invalid envelope");return}if(d.has(L.id)){let R=d.get(L.id);d.delete(L.id),L.ok?R?.resolve(L.payload):R?.reject(L.error||new Error("ws error"));return}let S=_.get(L.type);if(S&&S.size>0)for(let R of Array.from(S))try{R(L.payload)}catch(H){t("ws event handler error",H)}else t("ws received unhandled message type: %s",L.type)}function K(){o="closed",t("ws closed"),T(o);for(let[q,L]of d.entries())L.reject(new Error("ws disconnected")),d.delete(q);i+=1,k()}function ne(){if(!a)return;let q=r();try{s=new WebSocket(q),t("ws connecting %s",q),o="connecting",T(o),s.addEventListener("open",A),s.addEventListener("message",V),s.addEventListener("error",()=>{}),s.addEventListener("close",K)}catch(L){t("ws connect failed %o",L),k()}}return ne(),{send(q,L){if(!Ha.includes(q))return Promise.reject(new Error(`unknown message type: ${q}`));let S=js(),R=ja(q,L,S);return t("send %s id=%s",q,S),new Promise((H,pe)=>{d.set(S,{resolve:H,reject:pe,type:q}),s&&s.readyState===s.OPEN?h(R):(t("queue %s id=%s (state=%s)",q,S,o),p.push(R))})},on(q,L){_.has(q)||_.set(q,new Set);let S=_.get(q);return S?.add(L),()=>{S?.delete(L)}},onConnection(q){return v.add(q),()=>{v.delete(q)}},reconnect(){a=!0,l&&(clearTimeout(l),l=null),i=0,ne()},close(){a=!1,l&&(clearTimeout(l),l=null);try{s?.close()}catch{}},getState(){return o}}}function tp(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function np(e,t){try{let r=await(await fetch("/api/config")).json();e.setState({config:r})}catch(n){t("config refresh failed",n)}}var Ws=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],Ga=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"]],Ya=$a,Va="worker:queue",Ka="ui:order",Za="ui:display-policy",Xa="exec:presets",nn="tab:board:closed",Qa="beads-ui.board.closed-range";function rp(e){let t=Ve("main");t("bootstrap start");let n=c`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;Oe(n,e);let r=document.getElementById("top-nav"),s=document.getElementById("usage-meter"),o=document.getElementById("board-root"),i=document.getElementById("worker-root"),l=document.getElementById("monitor-root"),a=document.getElementById("detail-panel");if(s&&La(s),o&&i&&l&&a){let ke=function(f,y){let Q="Request failed",te="";if(f&&typeof f=="object"){let g=f;if(typeof g.message=="string"&&g.message.length>0&&(Q=g.message),typeof g.details=="string")te=g.details;else if(g.details&&typeof g.details=="object")try{te=JSON.stringify(g.details,null,2)}catch{te=""}}else typeof f=="string"&&f.length>0&&(Q=f);let Z=y&&y.length>0?`Failed to load ${y}`:"Request failed";He.open(Z,Q,te)},ce=function(f){return`${Ae.getState().workspace.current?.path||""}\0${f}`},w=function(){O&&(O().catch(()=>{}),O=null),re=null,xe=null},j=function(f){Re=f;let y=()=>{Re!==f||Ae.getState().selected_id!==f||(Re=null,W(f))};if(!P){B.then(y);return}y()},Ne=function(f,y,Q,te,Z){return Q!==Te[y]?(Z().catch(()=>{}),!1):(f.set(te,Z),!0)},Ze=function(){let f=Ae.getState();st(f.view==="board"),We(f.view==="worker"),_t(f.view==="monitor"),ct(f.view==="board"||f.view==="worker"||!!f.selected_id)},lt=function(){let f=vn(Xe);return f===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:f}}},st=function(f){if(f)for(let[y,Q]of Ws){if(J.has(y)||de.has(y))continue;let te=y===nn?lt():{type:Q};try{oe.register(y,te)}catch(I){t("register %s store failed: %o",y,I)}de.add(y);let Z=Te.board,g=!1;_e.subscribeList(y,te).then(I=>{g=!Ne(J,"board",Z,y,I)}).catch(I=>{t("subscribe %s failed: %o",y,I),ke(I,"board")}).finally(()=>{de.delete(y),g&&Ze()})}else ht()},ht=function(){Te.board+=1;for(let[f]of Ws){let y=J.get(f);y&&(y().catch(()=>{}),J.delete(f));try{oe.unregister(f)}catch(Q){t("unregister %s failed: %o",f,Q)}}},We=function(f){if(!f){ft();return}for(let[y,Q]of Ga){if(De.has(y)||de.has(y))continue;try{oe.register(y,{type:Q})}catch(g){t("register %s store failed: %o",y,g)}de.add(y);let te=Te.worker,Z=!1;_e.subscribeList(y,{type:Q}).then(g=>{Z=!Ne(De,"worker",te,y,g)}).catch(g=>{t("subscribe %s failed: %o",y,g),ke(g,"worker")}).finally(()=>{de.delete(y),Z&&Ze()})}},ft=function(){Te.worker+=1;for(let[f]of Ga){let y=De.get(f);y&&(y().catch(()=>{}),De.delete(f));try{oe.unregister(f)}catch(Q){t("unregister %s failed: %o",f,Q)}}},ct=function(f){if(!f){nt();return}ot||(U("subscribe-worker-queue",{id:Va}).catch(y=>{t("subscribe-worker-queue failed: %o",y)}),ot=()=>U("unsubscribe-worker-queue",{id:Va}))},nt=function(){ot&&(ot().catch(()=>{}),ot=null)},_t=function(f){if(!f){Je();return}it||(U("subscribe-monitor-pipeline",{id:Ya}).catch(y=>{t("subscribe-monitor-pipeline failed: %o",y)}),it=()=>U("unsubscribe-monitor-pipeline",{id:Ya}))},Je=function(){it&&(it().catch(()=>{}),it=null)},Qe=function(){bt||(U("subscribe-ui-order",{id:Ka}).catch(f=>{t("subscribe-ui-order failed: %o",f)}),bt=()=>U("unsubscribe-ui-order",{id:Ka}))},dt=function(){bt&&(bt().catch(()=>{}),bt=null),Be.clear()},C=function(){ut||(U("subscribe-display-policy",{id:Za}).catch(f=>{t("subscribe-display-policy failed: %o",f)}),ut=()=>U("unsubscribe-display-policy",{id:Za}))},N=function(){ut&&(ut().catch(()=>{}),ut=null),be.clear()},u=function(){ee||(U("subscribe-exec-presets",{id:Xa}).catch(f=>{t("subscribe-exec-presets failed: %o",f)}),ee=()=>U("unsubscribe-exec-presets",{id:Xa}))},ye=function(f){if(!f)return"Unknown";let y=f.split("/").filter(Boolean);return y.length>0?y[y.length-1]:"Unknown"};var d=ke,p=ce,_=w,v=j,T=Ne,k=Ze,h=lt,A=st,V=ht,K=We,ne=ft,q=ct,L=nt,S=_t,R=Je,H=Qe,pe=dt,$e=C,me=N,fe=u,Ee=ye;let Ue=document.getElementById("header-loading"),Ke=Uo(Ue),He=ra(e),D=Wa(),U=Ke.wrapSend((f,y)=>D.send(f,y)),_e=Oo(U),oe=Po(),we=No(),ge=vo(),Be=Mo(),be=ho(),Ce=bo(),F=yo();D.on("exec-presets-snapshot",f=>{let y=f;y&&typeof y.revision=="number"&&Array.isArray(y.presets)&&Ce.set({revision:y.revision,presets:y.presets})}),D.on("monitor-pipeline-snapshot",f=>{let y=f;if(!(!y||!Array.isArray(y.workspaces)))try{ge.set(y.workspaces,y.workspaces_state)}catch{}}),D.on("ui-order-snapshot",f=>{let y=f;if(y&&typeof y.revision=="number")try{Be.set({revision:y.revision,order:y.order&&typeof y.order=="object"?y.order:{}})}catch{}}),D.on("display-policy-snapshot",f=>{let y=f;if(y&&y.policy&&typeof y.policy=="object")try{be.set(y.policy)}catch{}}),D.on("session-log-snapshot",f=>{let y=f;if(y&&typeof y.attempt_id=="string")try{F.set(y.attempt_id,Array.isArray(y.lines)?y.lines:[],typeof y.last_event_at=="number"?y.last_event_at:null)}catch{}}),D.on("session-log-append",f=>{let y=f;if(y&&typeof y.attempt_id=="string")try{F.append(y.attempt_id,y.event)}catch{}}),D.on("snapshot",f=>{let y=f,Q=y&&typeof y.id=="string"?y.id:"",te=Q?oe.getStore(Q):null;if(te&&y&&y.type==="snapshot")try{te.applyPush(y)}catch{}}),D.on("upsert",f=>{let y=f,Q=y&&typeof y.id=="string"?y.id:"",te=Q?oe.getStore(Q):null;if(te&&y&&y.type==="upsert")try{te.applyPush(y)}catch{}}),D.on("delete",f=>{let y=f,Q=y&&typeof y.id=="string"?y.id:"",te=Q?oe.getStore(Q):null;if(te&&y&&y.type==="delete")try{te.applyPush(y)}catch{}});let O=null,re=null,xe=null,Re=null,M=()=>{},B=new Promise(f=>{M=()=>f(void 0)}),P=!1,ae=!1;async function W(f){let y=ce(f);if(y===re||y===xe)return;xe=y;let Q=`detail:${f}`,te={type:"issue-detail",params:{id:f}};try{oe.register(Q,te)}catch(Z){t("register detail store failed: %o",Z)}try{let Z=await _e.subscribeList(Q,te);if(Ae.getState().selected_id!==f||ce(f)!==y){await Z().catch(()=>{});return}O&&await O().catch(()=>{}),O=Z,re=y}catch(Z){t("detail subscribe failed: %o",Z),ke(Z,"issue details")}finally{xe===y&&(xe=null)}}let J=new Map,de=new Set,Te={board:0,worker:0},Xe=Et;try{let f=window.localStorage.getItem(Qa);zt(f)&&(Xe=f)}catch{}async function pt(f){if(!zt(f)||f===Xe)return;Xe=f;try{window.localStorage.setItem(Qa,f)}catch{}let y=J.get(nn);if(!y)return;J.delete(nn),await y().catch(()=>{});let Q=lt();try{oe.register(nn,Q)}catch(te){t("register %s store failed: %o",nn,te)}try{let te=await _e.subscribeList(nn,Q);J.set(nn,te)}catch(te){t("re-subscribe %s failed: %o",nn,te),ke(te,"board")}}let De=new Map,ot=null,it=null,bt=null,ut=null,ee=null;async function m(){ut=null,be.clear(),ee=null,Ce.clear(),ot=null,it=null,J.clear(),De.clear(),Te.board+=1,Te.worker+=1,u();let f=Ae.getState().workspace.current?.path;if(f)try{await D.send("set-workspace",{path:f})}catch(Q){t("workspace restore after reconnect failed: %o",Q);return}C();let y=Ae.getState();st(y.view==="board"),We(y.view==="worker"),_t(y.view==="monitor"),ct(y.view==="board"||y.view==="worker"||!!y.selected_id)}async function E(){t("clearing all subscriptions for workspace switch"),ht(),ft(),nt(),we.clear(),dt(),Qe(),N(),C(),w();let f=Ae.getState();if(f.selected_id)try{oe.unregister(`detail:${f.selected_id}`)}catch{}let y=Ae.getState();st(y.view==="board"),We(y.view==="worker"),_t(y.view==="monitor"),ct(y.view==="board"||y.view==="worker"||!!y.selected_id),y.selected_id&&j(y.selected_id)}async function X(f){t("requesting workspace switch to %s",f),ae=!0;try{let y=await D.send("set-workspace",{path:f});t("workspace switch result: %o",y),y&&y.workspace&&(Ae.setState({workspace:{current:{path:y.workspace.root_dir,database:y.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",f),y.changed&&(await E(),se("Switched to "+ye(f),"success",2e3)))}catch(y){throw t("workspace switch failed: %o",y),se("Failed to switch workspace","error",3e3),y}finally{ae=!1}}async function he(f){t("requesting workspace git pull for %s",f);try{let y=await D.send("git-pull-workspace",{});t("workspace git pull result: %o",y);let Q=y?.status;if(Q==="up_to_date"){se("Already up to date","success",2e3);return}if(Q==="stash_pop_conflict"){se("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}se("Git pulled "+ye(f),"success",2e3)}catch(y){t("workspace git pull failed: %o",y);let Q=y?.code,te=y?.message;if(Q==="rebase_conflict"){se("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(Q==="rebase_conflict_abort_failed"){se("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(Q==="busy"){se("Git pull skipped: another operation is running","warning",3e3);return}let Z=te?`: ${te}`:"";throw se(`Git pull failed${Z}`,"error",3e3),y}}async function Se(f,y){t("setting workspace visibility %s \u2192 %s",f,String(y));try{await D.send("set-workspace-visibility",{path:f,visible:y}),await ie()}catch(Q){t("workspace visibility update failed: %o",Q),se("Failed to update project visibility","error",3e3)}}async function ie(){try{let f=await D.send("list-workspaces",{});if(t("workspaces loaded: %o",f),f&&Array.isArray(f.workspaces)){let y=f.workspaces.map(g=>({path:g.path,database:g.database,pid:g.pid,version:g.version})),Q=f.current?{path:f.current.root_dir,database:f.current.db_path}:null,te=Array.isArray(f.hidden)?f.hidden.filter(g=>typeof g=="string"):[];Ae.setState({workspace:{current:Q,available:y,hidden:te}});let Z=window.localStorage.getItem("beads-ui.workspace");Z&&(!y.some(I=>I.path===Z)||te.includes(Z)?window.localStorage.removeItem("beads-ui.workspace"):Q&&Z!==Q.path&&(t("restoring saved workspace preference: %s",Z),await X(Z)))}}catch(f){t("failed to load workspaces: %o",f)}}D.on("workspace-changed",f=>{t("workspace-changed event: %o",f),f&&f.root_dir&&(Ae.setState({workspace:{current:{path:f.root_dir,database:f.db_path}}}),ie(),E())});let Ie=!1;if(typeof D.onConnection=="function"){let f=y=>{t("ws state %s",y),y==="reconnecting"||y==="closed"?(Ie=!0,se("Connection lost. Reconnecting\u2026","error",4e3)):y==="open"&&Ie&&(Ie=!1,se("Reconnected","success",2200),np(Ae,(Q,te)=>{t(`${Q}: %o`,te)}),m())};D.onConnection(f)}let Ge="board";try{let f=window.localStorage.getItem("beads-ui.view");(f==="board"||f==="worker"||f==="monitor")&&(Ge=f)}catch(f){t("view parse error: %o",f)}let Ae=Bo({config:tp(),view:Ge});D.on("worker-queue-snapshot",f=>{let y=f;if(!y||!y.queue)return;let Q=Ae.getState().workspace.current?.path;if(typeof Q=="string"&&Q.length>0&&y.root_dir!==Q){t("dropping worker-queue snapshot for %s",String(y.root_dir));return}try{we.set(y.queue)}catch{}});let at=Fo(Ae);at.start();let St=new Set(["get-comments","exec-preset-create","exec-preset-update","exec-preset-delete","apply-exec-preset"]),$t=async(f,y)=>{try{return await U(f,y)}catch(Q){if(St.has(f))throw Q;return[]}};r&&Sa(r,Ae,at);let et=document.getElementById("workspace-picker");et&&za(et,Ae,X,he,Se);let At=Ca(e,(f,y)=>U(f,y));try{let f=document.getElementById("new-issue-btn");f&&f.addEventListener("click",()=>At.open())}catch{}let ve=na(e,{policyStore:be,transport:(f,y)=>U(f,y),labelOptions:()=>{let f=new Set;for(let[y]of Ws)for(let Q of oe.snapshotFor(y)||[]){let te=Q.labels;if(Array.isArray(te))for(let Z of te)typeof Z=="string"&&Z.length>0&&f.add(Z)}return Array.from(f).sort()}});try{let f=document.getElementById("display-settings-btn");f&&f.addEventListener("click",()=>ve.open())}catch{}let Ye=Zo(o,{gotoIssue:f=>at.gotoIssue(f),issueStores:oe,transport:$t,workerQueueStore:we,uiOrderStore:Be,displayPolicyStore:be,closedRange:Xe,onClosedRangeChange:f=>{pt(f)},onNewIssue:()=>At.open()}),It=zs(i,{transport:$t,issueStores:oe,queueStore:we,execPresetStore:Ce,sessionLogStore:F,uiOrderStore:Be,gotoIssue:f=>Ae.setState({selected_id:f}),getWorkspacePath:()=>Ae.getState().workspace.current?.path}),Vt=xa(l,{transport:$t,pipelineStore:ge,execPresetStore:Ce,gotoIssue:f=>at.gotoIssue(f),getWorkspacePath:()=>Ae.getState().workspace.current?.path,switchWorkspace:f=>X(f)}),le=ea(a,{issueStores:oe,transport:$t,queueStore:we,execPresetStore:Ce,sessionLogStore:F,getWorkspacePath:()=>Ae.getState().workspace.current?.path,onNavigate:f=>{Ae.getState().view==="worker"?Ae.setState({selected_id:f}):at.gotoIssue(f)},onClose:()=>{let f=Ae.getState();Ae.setState({selected_id:null});try{at.gotoView(f.view==="worker"||f.view==="monitor"?f.view:"board")}catch{}},onOpenExecPresets:()=>{Ae.setState({selected_id:null}),at.gotoView("worker"),It.openExecDefaults()}}),b=Ae.getState().selected_id;b&&(a.hidden=!1,le.load(b),j(b)),Ae.subscribe(f=>{let y=f.selected_id;y?(a.hidden=!1,le.load(y),ae||j(y)):(le.clear(),a.hidden=!0,w())});let z=f=>{o.hidden=f.view!=="board",i.hidden=f.view!=="worker",l.hidden=f.view!=="monitor",st(f.view==="board"),We(f.view==="worker"),_t(f.view==="monitor"),ct(f.view==="board"||f.view==="worker"||!!f.selected_id),!f.selected_id&&f.view==="board"&&Ye.load(),f.view==="worker"&&It.load(),f.view==="monitor"?Vt.load():Vt.pause(),window.localStorage.setItem("beads-ui.view",f.view)};Ae.subscribe(z),z(Ae.getState()),Qe(),C(),u(),ie().finally(()=>{P=!0,M()}),window.addEventListener("keydown",f=>{let y=f.ctrlKey||f.metaKey,Q=String(f.key||"").toLowerCase(),te=f.target,Z=te&&te.tagName?String(te.tagName).toLowerCase():"",g=Z==="input"||Z==="textarea"||Z==="select"||te&&typeof te.isContentEditable=="boolean"&&te.isContentEditable;y&&Q==="n"&&(g||(f.preventDefault(),At.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let n=window.localStorage.getItem("beads-ui.theme"),r=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=n==="dark"||n==="light"?n:r?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let n=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",n),window.localStorage.setItem("beads-ui.theme",n)});let t=document.getElementById("app");t&&rp(t)});export{rp as bootstrap,tp as readBootstrapConfig,np as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
