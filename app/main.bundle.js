var Ri=Object.create;var cn=Object.defineProperty;var Li=Object.getOwnPropertyDescriptor;var Ii=Object.getOwnPropertyNames;var Di=Object.getPrototypeOf,Oi=Object.prototype.hasOwnProperty;var Mi=(t,e,r)=>e in t?cn(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r;var dn=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports);var Ni=(t,e,r,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of Ii(e))!Oi.call(t,s)&&s!==r&&cn(t,s,{get:()=>e[s],enumerable:!(n=Li(e,s))||n.enumerable});return t};var Pi=(t,e,r)=>(r=t!=null?Ri(Di(t)):{},Ni(e||!t||!t.__esModule?cn(r,"default",{value:t,enumerable:!0}):r,t));var $e=(t,e,r)=>Mi(t,typeof e!="symbol"?e+"":e,r);var Rs=dn((Hc,Cs)=>{var Kt=1e3,Zt=Kt*60,Xt=Zt*60,Ot=Xt*24,zi=Ot*7,Hi=Ot*365.25;Cs.exports=function(t,e){e=e||{};var r=typeof t;if(r==="string"&&t.length>0)return Wi(t);if(r==="number"&&isFinite(t))return e.long?ji(t):Gi(t);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(t))};function Wi(t){if(t=String(t),!(t.length>100)){var e=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(t);if(e){var r=parseFloat(e[1]),n=(e[2]||"ms").toLowerCase();switch(n){case"years":case"year":case"yrs":case"yr":case"y":return r*Hi;case"weeks":case"week":case"w":return r*zi;case"days":case"day":case"d":return r*Ot;case"hours":case"hour":case"hrs":case"hr":case"h":return r*Xt;case"minutes":case"minute":case"mins":case"min":case"m":return r*Zt;case"seconds":case"second":case"secs":case"sec":case"s":return r*Kt;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r;default:return}}}}function Gi(t){var e=Math.abs(t);return e>=Ot?Math.round(t/Ot)+"d":e>=Xt?Math.round(t/Xt)+"h":e>=Zt?Math.round(t/Zt)+"m":e>=Kt?Math.round(t/Kt)+"s":t+"ms"}function ji(t){var e=Math.abs(t);return e>=Ot?Mr(t,e,Ot,"day"):e>=Xt?Mr(t,e,Xt,"hour"):e>=Zt?Mr(t,e,Zt,"minute"):e>=Kt?Mr(t,e,Kt,"second"):t+" ms"}function Mr(t,e,r,n){var s=e>=r*1.5;return Math.round(t/r)+" "+n+(s?"s":"")}});var Is=dn((Wc,Ls)=>{function Yi(t){r.debug=r,r.default=r,r.coerce=a,r.disable=i,r.enable=s,r.enabled=l,r.humanize=Rs(),r.destroy=c,Object.keys(t).forEach(_=>{r[_]=t[_]}),r.names=[],r.skips=[],r.formatters={};function e(_){let f=0;for(let w=0;w<_.length;w++)f=(f<<5)-f+_.charCodeAt(w),f|=0;return r.colors[Math.abs(f)%r.colors.length]}r.selectColor=e;function r(_){let f,w=null,$,v;function x(...M){if(!x.enabled)return;let F=x,B=Number(new Date),W=B-(f||B);F.diff=W,F.prev=f,F.curr=B,f=B,M[0]=r.coerce(M[0]),typeof M[0]!="string"&&M.unshift("%O");let O=0;M[0]=M[0].replace(/%([a-zA-Z%])/g,(T,R)=>{if(T==="%%")return"%";O++;let k=r.formatters[R];if(typeof k=="function"){let q=M[O];T=k.call(F,q),M.splice(O,1),O--}return T}),r.formatArgs.call(F,M),(F.log||r.log).apply(F,M)}return x.namespace=_,x.useColors=r.useColors(),x.color=r.selectColor(_),x.extend=n,x.destroy=r.destroy,Object.defineProperty(x,"enabled",{enumerable:!0,configurable:!1,get:()=>w!==null?w:($!==r.namespaces&&($=r.namespaces,v=r.enabled(_)),v),set:M=>{w=M}}),typeof r.init=="function"&&r.init(x),x}function n(_,f){let w=r(this.namespace+(typeof f>"u"?":":f)+_);return w.log=this.log,w}function s(_){r.save(_),r.namespaces=_,r.names=[],r.skips=[];let f=(typeof _=="string"?_:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let w of f)w[0]==="-"?r.skips.push(w.slice(1)):r.names.push(w)}function o(_,f){let w=0,$=0,v=-1,x=0;for(;w<_.length;)if($<f.length&&(f[$]===_[w]||f[$]==="*"))f[$]==="*"?(v=$,x=w,$++):(w++,$++);else if(v!==-1)$=v+1,x++,w=x;else return!1;for(;$<f.length&&f[$]==="*";)$++;return $===f.length}function i(){let _=[...r.names,...r.skips.map(f=>"-"+f)].join(",");return r.enable(""),_}function l(_){for(let f of r.skips)if(o(_,f))return!1;for(let f of r.names)if(o(_,f))return!0;return!1}function a(_){return _ instanceof Error?_.stack||_.message:_}function c(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return r.enable(r.load()),r}Ls.exports=Yi});var Ds=dn((ct,Nr)=>{ct.formatArgs=Ki;ct.save=Zi;ct.load=Xi;ct.useColors=Vi;ct.storage=Qi();ct.destroy=(()=>{let t=!1;return()=>{t||(t=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();ct.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function Vi(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let t;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(t=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(t[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function Ki(t){if(t[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+t[0]+(this.useColors?"%c ":" ")+"+"+Nr.exports.humanize(this.diff),!this.useColors)return;let e="color: "+this.color;t.splice(1,0,e,"color: inherit");let r=0,n=0;t[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(r++,s==="%c"&&(n=r))}),t.splice(n,0,e)}ct.log=console.debug||console.log||(()=>{});function Zi(t){try{t?ct.storage.setItem("debug",t):ct.storage.removeItem("debug")}catch{}}function Xi(){let t;try{t=ct.storage.getItem("debug")||ct.storage.getItem("DEBUG")}catch{}return!t&&typeof process<"u"&&"env"in process&&(t=process.env.DEBUG),t}function Qi(){try{return localStorage}catch{}}Nr.exports=Is()(ct);var{formatters:Ji}=Nr.exports;Ji.j=function(t){try{return JSON.stringify(t)}catch(e){return"[UnexpectedJSONParseError]: "+e.message}}});var cr=globalThis,Dr=cr.trustedTypes,ms=Dr?Dr.createPolicy("lit-html",{createHTML:t=>t}):void 0,$s="$lit$",xt=`lit$${Math.random().toFixed(9).slice(2)}$`,xs="?"+xt,Fi=`<${xs}>`,It=document,dr=()=>It.createComment(""),ur=t=>t===null||typeof t!="object"&&typeof t!="function",mn=Array.isArray,qi=t=>mn(t)||typeof t?.[Symbol.iterator]=="function",un=`[ 	
\f\r]`,lr=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,bs=/-->/g,ws=/>/g,Rt=RegExp(`>|${un}(?:([^\\s"'>=/]+)(${un}*=${un}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ks=/'/g,ys=/"/g,Ss=/^(?:script|style|textarea|title)$/i,bn=t=>(e,...r)=>({_$litType$:t,strings:e,values:r}),d=bn(1),Pc=bn(2),Fc=bn(3),Dt=Symbol.for("lit-noChange"),Ne=Symbol.for("lit-nothing"),vs=new WeakMap,Lt=It.createTreeWalker(It,129);function Ts(t,e){if(!mn(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return ms!==void 0?ms.createHTML(e):e}var Bi=(t,e)=>{let r=t.length-1,n=[],s,o=e===2?"<svg>":e===3?"<math>":"",i=lr;for(let l=0;l<r;l++){let a=t[l],c,_,f=-1,w=0;for(;w<a.length&&(i.lastIndex=w,_=i.exec(a),_!==null);)w=i.lastIndex,i===lr?_[1]==="!--"?i=bs:_[1]!==void 0?i=ws:_[2]!==void 0?(Ss.test(_[2])&&(s=RegExp("</"+_[2],"g")),i=Rt):_[3]!==void 0&&(i=Rt):i===Rt?_[0]===">"?(i=s??lr,f=-1):_[1]===void 0?f=-2:(f=i.lastIndex-_[2].length,c=_[1],i=_[3]===void 0?Rt:_[3]==='"'?ys:ks):i===ys||i===ks?i=Rt:i===bs||i===ws?i=lr:(i=Rt,s=void 0);let $=i===Rt&&t[l+1].startsWith("/>")?" ":"";o+=i===lr?a+Fi:f>=0?(n.push(c),a.slice(0,f)+$s+a.slice(f)+xt+$):a+xt+(f===-2?l:$)}return[Ts(t,o+(t[r]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),n]},pr=class t{constructor({strings:e,_$litType$:r},n){let s;this.parts=[];let o=0,i=0,l=e.length-1,a=this.parts,[c,_]=Bi(e,r);if(this.el=t.createElement(c,n),Lt.currentNode=this.el.content,r===2||r===3){let f=this.el.content.firstChild;f.replaceWith(...f.childNodes)}for(;(s=Lt.nextNode())!==null&&a.length<l;){if(s.nodeType===1){if(s.hasAttributes())for(let f of s.getAttributeNames())if(f.endsWith($s)){let w=_[i++],$=s.getAttribute(f).split(xt),v=/([.?@])?(.*)/.exec(w);a.push({type:1,index:o,name:v[2],strings:$,ctor:v[1]==="."?fn:v[1]==="?"?hn:v[1]==="@"?_n:Yt}),s.removeAttribute(f)}else f.startsWith(xt)&&(a.push({type:6,index:o}),s.removeAttribute(f));if(Ss.test(s.tagName)){let f=s.textContent.split(xt),w=f.length-1;if(w>0){s.textContent=Dr?Dr.emptyScript:"";for(let $=0;$<w;$++)s.append(f[$],dr()),Lt.nextNode(),a.push({type:2,index:++o});s.append(f[w],dr())}}}else if(s.nodeType===8)if(s.data===xs)a.push({type:2,index:o});else{let f=-1;for(;(f=s.data.indexOf(xt,f+1))!==-1;)a.push({type:7,index:o}),f+=xt.length-1}o++}}static createElement(e,r){let n=It.createElement("template");return n.innerHTML=e,n}};function jt(t,e,r=t,n){if(e===Dt)return e;let s=n!==void 0?r._$Co?.[n]:r._$Cl,o=ur(e)?void 0:e._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(t),s._$AT(t,r,n)),n!==void 0?(r._$Co??(r._$Co=[]))[n]=s:r._$Cl=s),s!==void 0&&(e=jt(t,s._$AS(t,e.values),s,n)),e}var pn=class{constructor(e,r){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:r},parts:n}=this._$AD,s=(e?.creationScope??It).importNode(r,!0);Lt.currentNode=s;let o=Lt.nextNode(),i=0,l=0,a=n[0];for(;a!==void 0;){if(i===a.index){let c;a.type===2?c=new fr(o,o.nextSibling,this,e):a.type===1?c=new a.ctor(o,a.name,a.strings,this,e):a.type===6&&(c=new gn(o,this,e)),this._$AV.push(c),a=n[++l]}i!==a?.index&&(o=Lt.nextNode(),i++)}return Lt.currentNode=It,s}p(e){let r=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(e,n,r),r+=n.strings.length-2):n._$AI(e[r])),r++}},fr=class t{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,r,n,s){this.type=2,this._$AH=Ne,this._$AN=void 0,this._$AA=e,this._$AB=r,this._$AM=n,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,r=this._$AM;return r!==void 0&&e?.nodeType===11&&(e=r.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,r=this){e=jt(this,e,r),ur(e)?e===Ne||e==null||e===""?(this._$AH!==Ne&&this._$AR(),this._$AH=Ne):e!==this._$AH&&e!==Dt&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):qi(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==Ne&&ur(this._$AH)?this._$AA.nextSibling.data=e:this.T(It.createTextNode(e)),this._$AH=e}$(e){let{values:r,_$litType$:n}=e,s=typeof n=="number"?this._$AC(e):(n.el===void 0&&(n.el=pr.createElement(Ts(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===s)this._$AH.p(r);else{let o=new pn(s,this),i=o.u(this.options);o.p(r),this.T(i),this._$AH=o}}_$AC(e){let r=vs.get(e.strings);return r===void 0&&vs.set(e.strings,r=new pr(e)),r}k(e){mn(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,n,s=0;for(let o of e)s===r.length?r.push(n=new t(this.O(dr()),this.O(dr()),this,this.options)):n=r[s],n._$AI(o),s++;s<r.length&&(this._$AR(n&&n._$AB.nextSibling,s),r.length=s)}_$AR(e=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);e!==this._$AB;){let n=e.nextSibling;e.remove(),e=n}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},Yt=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,r,n,s,o){this.type=1,this._$AH=Ne,this._$AN=void 0,this.element=e,this.name=r,this._$AM=s,this.options=o,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=Ne}_$AI(e,r=this,n,s){let o=this.strings,i=!1;if(o===void 0)e=jt(this,e,r,0),i=!ur(e)||e!==this._$AH&&e!==Dt,i&&(this._$AH=e);else{let l=e,a,c;for(e=o[0],a=0;a<o.length-1;a++)c=jt(this,l[n+a],r,a),c===Dt&&(c=this._$AH[a]),i||(i=!ur(c)||c!==this._$AH[a]),c===Ne?e=Ne:e!==Ne&&(e+=(c??"")+o[a+1]),this._$AH[a]=c}i&&!s&&this.j(e)}j(e){e===Ne?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},fn=class extends Yt{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===Ne?void 0:e}},hn=class extends Yt{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==Ne)}},_n=class extends Yt{constructor(e,r,n,s,o){super(e,r,n,s,o),this.type=5}_$AI(e,r=this){if((e=jt(this,e,r,0)??Ne)===Dt)return;let n=this._$AH,s=e===Ne&&n!==Ne||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,o=e!==Ne&&(n===Ne||s);s&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},gn=class{constructor(e,r,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=r,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){jt(this,e)}};var Ui=cr.litHtmlPolyfillSupport;Ui?.(pr,fr),(cr.litHtmlVersions??(cr.litHtmlVersions=[])).push("3.3.1");var we=(t,e,r)=>{let n=r?.renderBefore??e,s=n._$litPart$;if(s===void 0){let o=r?.renderBefore??null;n._$litPart$=s=new fr(e.insertBefore(dr(),o),o,void 0,r??{})}return s._$AI(t),s};var St="today",hr=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}];function Vt(t){return t==="today"||t==="7d"||t==="30d"||t==="all"}function Or(t,e=Date.now()){switch(t){case"today":{let r=new Date(e);return r.setHours(0,0,0,0),r.getTime()}case"7d":return e-7*864e5;case"30d":return e-30*864e5;case"all":default:return}}function As(){let t=null,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{get(){return t},set(n){t=n,r()},clear(){t=null,r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}function Es(){let t=new Map,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{set(n,s,o=null){t.set(n,{lines:Array.isArray(s)?[...s]:[],last_event_at:typeof o=="number"?o:null}),r()},append(n,s){let o=t.get(n)||{lines:[],last_event_at:null};o.lines=[...o.lines,s],o.last_event_at=Date.now(),t.set(n,o),r()},get(n){return t.get(n)||null},clear(n){typeof n=="string"?t.delete(n):t.clear(),r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}var Os=Pi(Ds(),1);function De(t){return(0,Os.default)(`beads-ui:${t}`)}function gt(t){if(typeof t=="number")return Number.isFinite(t)?t:0;if(typeof t=="string"){let e=Date.parse(t);return Number.isFinite(e)?e:0}return 0}function Mt(t,e){let r=gt(t.created_at),n=gt(e.created_at);if(r!==n)return r<n?1:-1;let s=t.priority??2,o=e.priority??2;if(s!==o)return s-o;let i=t.id,l=e.id;return i<l?-1:i>l?1:0}function Ps(t,e){let r=gt(t.created_at),n=gt(e.created_at);if(r!==n)return r<n?-1:1;let s=t.priority??2,o=e.priority??2;if(s!==o)return s-o;let i=t.id,l=e.id;return i<l?-1:i>l?1:0}function Fs(t,e){let r=gt(t.updated_at),n=gt(e.updated_at);if(r!==n)return r<n?1:-1;let s=t.id,o=e.id;return s<o?-1:s>o?1:0}function qs(t,e){let r=t.priority??2,n=e.priority??2;if(r!==n)return r-n;let s=gt(t.created_at),o=gt(e.created_at);if(s!==o)return s<o?1:-1;let i=t.id,l=e.id;return i<l?-1:i>l?1:0}function Bs(t,e){let r=t.closed_at??0,n=e.closed_at??0;if(r!==n)return r<n?1:-1;let s=t?.id,o=e?.id;return s<o?-1:s>o?1:0}var ea=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function Ms(t){let e=t&&t.metadata,r=e?e.task_order:void 0;if(r==null||r==="")return Number.POSITIVE_INFINITY;let n=Number(r);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function Ns(t){let e=t&&t.title;if(typeof e!="string")return Number.POSITIVE_INFINITY;let r=ea.exec(e);if(!r)return Number.POSITIVE_INFINITY;let n=Number(r[1]);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function Us(t,e){let r=Ms(t),n=Ms(e);if(r!==n)return r<n?-1:1;let s=Ns(t),o=Ns(e);if(s!==o)return s<o?-1:1;let i=gt(t&&t.created_at),l=gt(e&&e.created_at);if(i!==l)return i<l?-1:1;let a=t&&t.id,c=e&&e.id;return a===c?0:String(a)<String(c)?-1:1}var wn=2**20;function Qt(t,e){let r=t&&t.id;return e&&typeof r=="string"&&Object.prototype.hasOwnProperty.call(e,r)&&typeof e[r]=="number"&&Number.isFinite(e[r])?e[r]:-gt(t&&t.created_at)}function Pr(t){return(e,r)=>{let n=Qt(e,t),s=Qt(r,t);if(n!==s)return n<s?-1:1;let o=e?.id,i=r?.id;return o<i?-1:o>i?1:0}}function kn(t,e,r){let n=Array.isArray(t)?t:[],s=n.length,o=Math.max(0,Math.min(e,s-1)),i=o-1>=0?n[o-1]:null,l=o+1<s?n[o+1]:null;if(!i&&!l)return{rank:0};if(!i)return{rank:Qt(l,r)-wn};if(!l)return{rank:Qt(i,r)+wn};let a=Qt(i,r),c=Qt(l,r),_=(a+c)/2;return a<_&&_<c?{rank:_}:{renormalize:n.map((f,w)=>({bead_id:f.id,rank:w*wn}))}}function yn(t,e={}){let r=De(`issue-store:${t}`),n=new Map,s=[],o=0,i=new Set,l=!1,a=e.sort||Mt;function c(){for(let w of Array.from(i))try{w()}catch{}}function _(){s=Array.from(n.values()).sort(a)}function f(w){if(l||!w||w.id!==t)return;let $=Number(w.revision)||0;if(r("apply %s rev=%d",w.type,$),!($<=o&&w.type!=="snapshot")){if(w.type==="snapshot"){if($<=o)return;n.clear();let v=Array.isArray(w.issues)?w.issues:[];for(let x of v)x&&typeof x.id=="string"&&x.id.length>0&&n.set(x.id,x);_(),o=$,c();return}if(w.type==="upsert"){let v=w.issue;if(v&&typeof v.id=="string"&&v.id.length>0){let x=n.get(v.id);if(!x)n.set(v.id,v);else{let M=Number.isFinite(x.updated_at)?x.updated_at:0,F=Number.isFinite(v.updated_at)?v.updated_at:0;if(M<=F){for(let B of Object.keys(x))B in v||delete x[B];for(let[B,W]of Object.entries(v))x[B]=W}}_()}o=$,c()}else if(w.type==="delete"){let v=String(w.issue_id||"");v&&(n.delete(v),_()),o=$,c()}}}return{id:t,subscribe(w){return i.add(w),()=>{i.delete(w)}},applyPush:f,snapshot(){return s},size(){return n.size},getById(w){return n.get(w)},dispose(){l=!0,n.clear(),s=[],i.clear(),o=0}}}function Fr(t){let e=String(t.type||"").trim(),r={};if(t.params&&typeof t.params=="object"){let s=Object.keys(t.params).sort();for(let o of s){let i=t.params[o];r[o]=String(i)}}let n=new URLSearchParams(r).toString();return n.length>0?`${e}?${n}`:e}function zs(t){let e=De("subs"),r=new Map,n=new Map;function s(l,a){e("applyDelta %s +%d ~%d -%d",l,(a.added||[]).length,(a.updated||[]).length,(a.removed||[]).length);let c=n.get(l);if(!c||c.size===0)return;let _=Array.isArray(a.added)?a.added:[],f=Array.isArray(a.updated)?a.updated:[],w=Array.isArray(a.removed)?a.removed:[];for(let $ of Array.from(c)){let v=r.get($);if(!v)continue;let x=v.itemsById;for(let M of _)typeof M=="string"&&M.length>0&&x.set(M,!0);for(let M of f)typeof M=="string"&&M.length>0&&x.set(M,!0);for(let M of w)typeof M=="string"&&M.length>0&&x.delete(M)}}async function o(l,a){let c=Fr(a);if(e("subscribe %s key=%s",l,c),!r.has(l))r.set(l,{key:c,itemsById:new Map});else{let f=r.get(l);if(f&&f.key!==c){let w=n.get(f.key);w&&(w.delete(l),w.size===0&&n.delete(f.key)),r.set(l,{key:c,itemsById:new Map})}}n.has(c)||n.set(c,new Set);let _=n.get(c);_&&_.add(l);try{await t("subscribe-list",{id:l,type:a.type,params:a.params})}catch(f){let w=r.get(l)||null;if(w){let $=n.get(w.key);$&&($.delete(l),$.size===0&&n.delete(w.key))}throw r.delete(l),f}return async()=>{e("unsubscribe %s key=%s",l,c);try{await t("unsubscribe-list",{id:l})}catch{}let f=r.get(l)||null;if(f){let w=n.get(f.key);w&&(w.delete(l),w.size===0&&n.delete(f.key))}r.delete(l)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:Fr,selectors:{getIds(l){let a=r.get(l);return a?Array.from(a.itemsById.keys()):[]},has(l,a){let c=r.get(l);return c?c.itemsById.has(a):!1},count(l){let a=r.get(l);return a?a.itemsById.size:0},getItemsById(l){let a=r.get(l),c={};if(!a)return c;for(let _ of a.itemsById.keys())c[_]=!0;return c}}}}function Hs(){let t=De("issue-stores"),e=new Map,r=new Map,n=new Set,s=new Map;function o(){for(let a of Array.from(n))try{a()}catch{}}function i(a,c,_){let f=c?Fr(c):"",w=r.get(a)||"",$=e.has(a);if(t("register %s key=%s (prev=%s)",a,f,w),$&&w&&f&&w!==f){let v=e.get(a);if(v)try{v.dispose()}catch{}let x=s.get(a);if(x){try{x()}catch{}s.delete(a)}let M=yn(a,_);e.set(a,M);let F=M.subscribe(()=>o());s.set(a,F)}else if(!$){let v=yn(a,_);e.set(a,v);let x=v.subscribe(()=>o());s.set(a,x)}return r.set(a,f),()=>l(a)}function l(a){t("unregister %s",a),r.delete(a);let c=e.get(a);c&&(c.dispose(),e.delete(a));let _=s.get(a);if(_){try{_()}catch{}s.delete(a)}}return{register:i,unregister:l,getStore(a){return e.get(a)||null},snapshotFor(a){let c=e.get(a);return c?c.snapshot().slice():[]},subscribe(a){return n.add(a),()=>n.delete(a)}}}function Ws(){let t=null,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{get(){return t},set(n){t=n,r()},clear(){t=null,r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}function Gs(){let t=null,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{get(){return t},set(n){t=n,r()},clear(){t=null,r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}function vn(t,e){return`#/${t==="worker"?"worker":"board"}?issue=${encodeURIComponent(e)}`}function ta(t){let e=String(t||""),r=e.startsWith("#")?e.slice(1):e,n=r.indexOf("?"),s=n>=0?r.slice(n+1):"";if(s){let l=new URLSearchParams(s).get("issue");if(l)return decodeURIComponent(l)}let o=/^\/issue\/([^\s?#]+)/.exec(r);return o&&o[1]?decodeURIComponent(o[1]):null}function ra(t){let e=String(t||"");return/^#\/worker(\b|\/|$)/.test(e)?"worker":"board"}function js(t){let e=De("router"),r=()=>{let n=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(n),o=s&&s[1]?decodeURIComponent(s[1]):ta(n),i=ra(n);if(e("hash change \u2192 view=%s id=%s",i,o),t.setState({selected_id:i==="worker"?null:o,view:i,worker:{selected_parent_id:i==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(n)){let a=o?`#/${i}?issue=${encodeURIComponent(o)}`:`#/${i}`;window.location.hash!==a&&(window.location.hash=a)}};return{start(){window.addEventListener("hashchange",r),r()},stop(){window.removeEventListener("hashchange",r)},gotoIssue(n){let o=(t.getState?t.getState():{view:"board"}).view==="worker"?"worker":"board",i=vn(o,n);e("goto issue %s (view=%s)",n,o),window.location.hash!==i?window.location.hash=i:t.setState({selected_id:o==="worker"?null:n,view:o,worker:{selected_parent_id:o==="worker"?n:null}})},gotoView(n){let s=t.getState?t.getState():{selected_id:null,worker:{selected_parent_id:null}},o=n==="worker"?s.worker?.selected_parent_id:s.selected_id,i=o?vn(n,o):`#/${n}`;e("goto view %s (id=%s)",n,o||""),window.location.hash!==i?window.location.hash=i:t.setState({view:n,selected_id:n==="worker"?null:s.selected_id})}}}var na=Object.freeze({workspace_config:{default_workspace:null}});function Ys(t){return{workspace_config:{default_workspace:typeof t?.workspace_config?.default_workspace=="string"&&t.workspace_config.default_workspace.length>0?t.workspace_config.default_workspace:na.workspace_config.default_workspace}}}function Vs(t={}){let e=De("state"),r={selected_id:t.selected_id??null,view:t.view??"board",filters:{status:t.filters?.status??"all",search:t.filters?.search??"",type:typeof t.filters?.type=="string"?t.filters?.type:""},board:{closed_filter:t.board?.closed_filter==="3"||t.board?.closed_filter==="7"||t.board?.closed_filter==="today"?t.board?.closed_filter:"today",show_deferred_column:t.board?.show_deferred_column===!0},worker:{selected_parent_id:t.worker?.selected_parent_id??null,show_closed_children:Array.isArray(t.worker?.show_closed_children)?t.worker.show_closed_children:[]},workspace:{current:t.workspace?.current??null,available:t.workspace?.available??[],hidden:t.workspace?.hidden??[]},config:Ys(t.config)},n=new Set;function s(){for(let o of Array.from(n))try{o(r)}catch{}}return{getState(){return r},setState(o){let i={...r,...o,filters:{...r.filters,...o.filters||{}},board:{...r.board,...o.board||{}},worker:{...r.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:r.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:r.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:r.workspace.hidden},config:o.config!==void 0?Ys(o.config):r.config},l=i.workspace.current?.path!==r.workspace.current?.path||i.workspace.available.length!==r.workspace.available.length||i.workspace.hidden.length!==r.workspace.hidden.length||i.workspace.hidden.some((c,_)=>c!==r.workspace.hidden[_]),a=i.config.workspace_config.default_workspace!==r.config.workspace_config.default_workspace;i.selected_id===r.selected_id&&i.view===r.view&&i.filters.status===r.filters.status&&i.filters.search===r.filters.search&&i.filters.type===r.filters.type&&i.board.closed_filter===r.board.closed_filter&&i.board.show_deferred_column===r.board.show_deferred_column&&i.worker.selected_parent_id===r.worker.selected_parent_id&&i.worker.show_closed_children.length===r.worker.show_closed_children.length&&i.worker.show_closed_children.every((c,_)=>c===r.worker.show_closed_children[_])&&!l&&!a||(r=i,e("state change %o",{selected_id:r.selected_id,view:r.view,filters:r.filters,board:r.board,worker:r.worker,workspace:r.workspace.current?.path,config:{default_workspace:r.config.workspace_config.default_workspace}}),s())},subscribe(o){return n.add(o),()=>n.delete(o)}}}function Ks(t){let e=De("activity"),r=0,n=new Map,s=1;function o(){if(!t)return;let c=r>0;t.toggleAttribute("hidden",!c),t.setAttribute("aria-busy",c?"true":"false")}function i(){r+=1,e("start count=%d",r),o()}function l(){let c=r;r=Math.max(0,r-1),c<=0?e("done called but count was already %d",c):e("done count=%d\u2192%d",c,r),o()}function a(c){return async(f,w)=>{let $=s++,v=Date.now();n.set($,{type:f,start_ts:v}),e("request start id=%d type=%s count=%d",$,f,r+1),i();let x=!1,M=()=>{x||(x=!0,n.delete($),l())},F=setTimeout(()=>{x||(e("request TIMEOUT id=%d type=%s elapsed=%dms",$,f,Date.now()-v),M())},3e4);try{let B=await c(f,w),W=Date.now()-v;return e("request done id=%d type=%s elapsed=%dms",$,f,W),B}catch(B){let W=Date.now()-v;throw e("request error id=%d type=%s elapsed=%dms err=%o",$,f,W,B),B}finally{clearTimeout(F),M()}}}return o(),{wrapSend:a,start:i,done:l,getCount:()=>r,getActiveRequests:()=>{let c=Date.now();return Array.from(n.entries()).map(([_,f])=>({id:_,type:f.type,elapsed_ms:c-f.start_ts}))}}}function te(t,e="info",r=2800){let n=document.createElement("div");n.className="toast",n.textContent=t,n.style.position="fixed",n.style.right="12px",n.style.bottom="12px",n.style.zIndex="1000",n.style.color="#fff",n.style.padding="8px 10px",n.style.borderRadius="4px",n.style.fontSize="12px",e==="success"?n.style.background="#156d36":e==="warning"?n.style.background="#a36a00":e==="error"?n.style.background="#9f2011":n.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(n),setTimeout(()=>{try{n.remove()}catch{}},r)}function qr(t=void 0,e=void 0){function r(){if(!e||typeof e.get!="function")return null;let o=e.get();return o&&o.order?o.order:{}}function n(o,i,l){let a=t&&t.snapshotFor?t.snapshotFor(o).slice():[];if(i==="closed")return a.sort(Bs),a;switch(l){case"created_desc":return a.sort(Mt),a;case"created_asc":return a.sort(Ps),a;case"updated_desc":return a.sort(Fs),a;case"priority":return a.sort(qs),a;case"manual":default:{let c=r();return c?a.sort(Pr(c)):a.sort(Mt),a}}}function s(o){let i=[];return t&&typeof t.subscribe=="function"&&i.push(t.subscribe(o)),e&&typeof e.subscribe=="function"&&i.push(e.subscribe(o)),()=>{for(let l of i)try{l()}catch{}}}return{selectBoardColumn:n,subscribe:s}}function Br(t){let e=t.transport,r=t.uiOrderStore;function n(i,l){return"renormalize"in i?i.renormalize:[{bead_id:l,rank:i.rank}]}function s(i,l){let a={...i.order};for(let c of l)a[c.bead_id]=c.rank;r&&r.set({revision:i.revision,order:a})}async function o(i,l,a){if(!e||!r)return;let c=r.get()||{revision:0,order:{}},_=n(kn(l,a,c.order),i);s(c,_);let f=await e("ui-order-set",{expected_revision:c.revision,entries:_});if(f&&f.conflict){let w={revision:typeof f.revision=="number"?f.revision:0,order:f.order||{}};r.set(w);let $=n(kn(l,a,w.order),i);s(w,$);let v=await e("ui-order-set",{expected_revision:w.revision,entries:$});v&&v.applied&&r.set({revision:typeof v.revision=="number"?v.revision:0,order:v.order||{}})}else f&&f.applied&&r.set({revision:typeof f.revision=="number"?f.revision:0,order:f.order||{}})}return{applyReorder:o}}function Ur(t){return Array.isArray(t)?t.filter(e=>typeof e=="string"):[]}function $n(t,e){return!e||typeof t!="string"||t.length===0||Ur(e.visible_labels).includes(t)?!0:Ur(e.hidden_labels).includes(t)?!1:!Ur(e.hidden_prefixes).some(r=>r.length>0&&t.startsWith(r))}function Zs(t,e){return Ur(t).filter(r=>$n(r,e))}function Nt(t,e){let r=t&&t.chips?t.chips[e]:void 0;return typeof r=="boolean"?r:!0}function xn(t){if(!t)return null;if(typeof t=="number")return Number.isFinite(t)?t:null;let e=Date.parse(t);return Number.isFinite(e)?e:null}function ft(t){let e=xn(t);if(e===null)return"";let r=new Date(e),n=s=>String(s).padStart(2,"0");return`${r.getFullYear()}-${n(r.getMonth()+1)}-${n(r.getDate())} ${n(r.getHours())}:${n(r.getMinutes())}`}function yt(t,e){let r=xn(t);if(r===null)return"";let s=(typeof e=="number"?e:Date.now())-r;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let i=Math.floor(s/36e5);if(i<24)return`${i}\uC2DC\uAC04 \uC804`;let l=Math.floor(s/864e5);if(l<7)return`${l}\uC77C \uC804`;let a=Math.floor(l/7);if(l<30)return`${a}\uC8FC \uC804`;let c=Math.floor(l/30);return c<12?`${c}\uAC1C\uC6D4 \uC804`:`${Math.floor(l/365)}\uB144 \uC804`}var sa={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg"},Xs={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge"},oa={spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},ia={review:"\u2713",skip:"\u2298"},Jt={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function aa(t,e,r){if(!(r==="in_progress"||r==="resolved"))return null;for(let s of t){let o=e[s];if(o&&o.fill==="dim"&&o.stale!==!0)return s}return null}function la(t){let e=t&&t.fill||"none";return e==="none"?Jt.none:t&&t.stale===!0?Jt.stale:e==="dim"?Jt.dim:t&&t.glyph==="review"?Jt.review:t&&t.glyph==="skip"?Jt.skip:Jt.done}function ca(t,e,r){let n=sa[t]||t,s=e&&e.fill||"none",o=!!e&&e.stale===!0,i=ia[e&&e.glyph||""]||"",l="bar";s==="dim"?l+=` b-${n} dim`:s==="full"&&(l+=` b-${n} full`),o&&(l+=" stale"),r&&(l+=" cur");let a=s==="none"?"lbl":`lbl l-${n} on`,c=r?`color: var(--stage-${n}-on)`:"";return d`
    <div class="seg">
      <div class=${l} style=${c}>${i}</div>
      <div class=${a}>
        ${Xs[t]||t}
      </div>
    </div>
  `}function zr(t,e){if(!t||!t.stages)return"";let r=t.route==="full_plan"?"full_plan":"spec_backed",n=oa[r],s=t.stages,o=aa(n,s,String(e||"open")),i=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${n.map(l=>`${Xs[l]||l} ${la(s[l]||{})}`).join(" \xB7 ")}`;return d`
    <div class="stp" role="img" aria-label=${i}>
      ${n.map(l=>ca(l,s[l]||{},l===o))}
    </div>
  `}function da(t){return typeof t!="number"||!Number.isFinite(t)?"":`P${Math.max(0,Math.min(4,t))}`}var Qs=2;function ua(t){if(!t)return[];let e=[];if(t.external){let n=t.reason?`\u23F8 blocked: ${t.reason}`:"\u23F8 blocked";e.push(d`<span class="ctl-chip ctl-chip--blocked">${n}</span>`)}let r=Array.isArray(t.blockers)?t.blockers:[];if(r.length>0){let n=r.slice(0,Qs).join(", "),s=r.length-Qs,o=`\u26D3 blocked: ${n}${s>0?` +${s}`:""}`;e.push(d`<span class="ctl-chip ctl-chip--blocked-dep">${o}</span>`)}return e}function pa(t,e){let r=e.policy||null,n=t.workflow&&t.workflow.chips||{},s=[];if(n.route&&Nt(r,"route")){let o=n.route_source==="derived";s.push(d`<span
        class="ctl-chip ctl-chip--route${o?" is-derived":""}"
        title=${o?"route \uCD94\uB860\uAC12 (metadata \uBBF8\uD540)":"route"}
        >${o?`${n.route} ?`:n.route}</span
      >`)}if(n.fast_track&&Nt(r,"fast_track")&&s.push(d`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),n.pr&&Nt(r,"pr")){let o=n.pr.number;s.push(d`<span class="ctl-chip ctl-chip--pr"
        >${`PR${o!=null?` #${o}`:""}`}</span
      >`)}for(let o of Zs(t.labels,r))s.push(d`<span class="ctl-chip ctl-chip--label">${o}</span>`);return t.from_id&&Nt(r,"from")&&s.push(d`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${t.from_id} \uC5F4\uAE30`}
        @click=${o=>{o.stopPropagation(),e.onFromChipClick&&e.onFromChipClick(o,String(t.from_id))}}
      >
        ↩ from ${t.from_id}
      </button>`),Nt(r,"blocked")&&s.push(...ua(t.blocked_info)),s.length===0?"":d`<div class="board-card__chips">${s}</div>`}function fa(t){switch(t){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function ha(t){let e=yt(t.created_at),r=yt(t.updated_at);return!e&&!r?"":d`<span class="board-card__times">
    ${e?d`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${ft(t.created_at)}`}
          >생성 ${e}</span
        >`:""}
    ${e&&r?d`<span class="board-card__time-sep">·</span>`:""}
    ${r?d`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${ft(t.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </span>`}function _a(t,e){let r=e.rollupFor?e.rollupFor(t.id):{total:0,count:0,current:null,children:[]},n=r.total||0,s=e.isExpanded?e.isExpanded(t.id):!0,o=n>0?r.children.slice().sort(Us):r.children;return d`
    <div class="board-card__roll">
      <div class="board-card__roll-meta">
        ${n>0?d`<button
              type="button"
              class="board-card__roll-toggle"
              aria-expanded=${s?"true":"false"}
              @click=${i=>e.onRollupToggle&&e.onRollupToggle(i,t.id)}
            >
              children ${r.count}/${n} ${s?"\u25B4":"\u25BE"}
            </button>`:d`<span class="board-card__roll-none">children 없음</span>`}
        ${ha(t)}
      </div>
      ${n>0&&r.current?d`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${r.current.title||r.current.id}</span
            >
          </div>`:""}
      ${s&&n>0?d`<div class="board-card__roll-list">
            ${o.map((i,l)=>d`<button
                  type="button"
                  class="board-card__roll-child"
                  @click=${a=>e.onChildClick&&e.onChildClick(a,i.id)}
                >
                  <span class=${fa(i.status)}>●</span>
                  <span class="board-card__roll-child-ord">${l+1}</span>
                  <span class="board-card__roll-child-title"
                    >${i.title||i.id}</span
                  >
                </button>`)}
          </div>`:""}
    </div>
  `}function Js(t,e){let r=da(t.priority);return d`
    <article
      class="board-card"
      data-issue-id=${t.id}
      role="listitem"
      tabindex="-1"
      draggable="true"
      @click=${n=>e.onCardClick(n,t.id)}
      @dragstart=${n=>e.onDragStart(n,t.id)}
      @dragend=${e.onDragEnd}
    >
      <div class="board-card__head">
        <button
          type="button"
          class="board-card__id"
          title="ID 복사"
          aria-label=${`\uC774\uC288 ID ${t.id} \uBCF5\uC0AC`}
          @click=${n=>e.onCopyId(n,t.id)}
        >
          ${t.id}
        </button>
        ${r?d`<span class="board-card__pri">${r}</span>`:""}
      </div>
      <div class="board-card__title">${t.title||"(\uC81C\uBAA9 \uC5C6\uC74C)"}</div>
      ${pa(t,e)}
      ${t.workflow&&Nt(e.policy||null,"stepper")?zr(t.workflow,t.status):""}
      ${_a(t,e)}
    </article>
  `}function Pt(t,e){let r=Array.isArray(t.items)?t.items.length:0,n=t.is_closed===!0;return d`
    <section class=${n?"board-column board-column--closed":"board-column"} id=${t.id}>
      <header
        class="board-column__header"
        id=${t.id+"-header"}
        role="heading"
        aria-level="2"
      >
        <div class="board-column__title">
          <span class="board-column__title-text">${t.title}</span>
          <span class="board-column__count" aria-label=${`${r}\uAC74`}
            >${r}</span
          >
        </div>
        ${n?d`<select
              class="board-column__closed-range"
              aria-label="Closed period"
              @change=${e.onClosedRangeChange}
            >
              ${hr.map(o=>d`<option
                    value=${o.value}
                    ?selected=${o.value===t.closed_range}
                  >
                    ${o.label}
                  </option>`)}
            </select>`:""}
      </header>
      <div
        class="board-column__body"
        role="list"
        aria-labelledby=${t.id+"-header"}
      >
        ${t.items.map(o=>Js(o,e))}
      </div>
    </section>
  `}var ga=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],ma=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],ba=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function wa(t,e,r){let n=t.labels.length,s=n>0?`\uB77C\uBCA8 ${n}`:"\uB77C\uBCA8";return d`
    <div class="board-filter__labels">
      <button
        type="button"
        class=${n>0?"board-filter__label-btn is-on":"board-filter__label-btn"}
        aria-haspopup="true"
        aria-expanded=${r.label_menu_open?"true":"false"}
        @click=${e.onLabelMenuToggle}
      >
        ${s} ▾
      </button>
      ${r.label_menu_open?d`<div class="board-filter__label-menu" role="group">
            ${r.label_options.length===0?d`<div class="board-filter__label-empty">라벨 없음</div>`:r.label_options.map(o=>d`<label class="board-filter__label-row">
                      <input
                        type="checkbox"
                        .checked=${t.labels.includes(o)}
                        @change=${()=>e.onLabelToggle(o)}
                      />
                      <span>${o}</span>
                    </label>`)}
            ${n>0?d`<button
                  type="button"
                  class="board-filter__label-clear"
                  @click=${e.onLabelClear}
                >
                  선택 해제
                </button>`:""}
          </div>`:""}
    </div>
  `}function eo(t,e,r){return d`
    <div class="board-filter">
      <input
        class="board-filter__search"
        type="search"
        placeholder="ID·제목 검색"
        aria-label="이슈 검색"
        .value=${t.search}
        @input=${e.onSearchInput}
      />
      <select
        class="board-filter__select"
        aria-label="우선순위 필터"
        @change=${e.onPriorityChange}
      >
        ${ga.map(n=>d`<option
              value=${n.value}
              ?selected=${t.priority===n.value}
            >
              ${n.label}
            </option>`)}
      </select>
      <select
        class="board-filter__select"
        aria-label="타입 필터"
        @change=${e.onTypeChange}
      >
        ${ma.map(n=>d`<option
              value=${n.value}
              ?selected=${t.type===n.value}
            >
              ${n.label}
            </option>`)}
      </select>
      ${wa(t,e,r)}
      <span class="board-filter__spacer"></span>
      <button
        type="button"
        class=${r.show_deferred?"board-filter__deferred is-on":"board-filter__deferred"}
        aria-pressed=${r.show_deferred?"true":"false"}
        @click=${e.onDeferredToggle}
      >
        Deferred ${r.deferred_count}
      </button>
      <select
        class="board-filter__select board-filter__sort"
        aria-label="정렬 규칙"
        @change=${e.onSortChange}
      >
        ${ba.map(n=>d`<option
              value=${n.value}
              ?selected=${r.sort_mode===n.value}
            >
              ${n.label}
            </option>`)}
      </select>
      <button
        type="button"
        class="board-filter__new"
        @click=${e.onNewIssue}
      >
        + 새 이슈
      </button>
    </div>
  `}var ka=200,ya={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","deferred-col":"deferred","closed-col":"closed"},va=new Set(["blocked-col","ready-col","in-progress-col","resolved-col","deferred-col"]),to="beads-ui.board.sort",ro=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function $a(){try{let t=window.localStorage.getItem(to);if(t&&ro.has(t))return t}catch{}return"created_desc"}function no(t,e){let r=De("views:board"),n=e.gotoIssue,s=e.issueStores,o=e.transport,i=e.uiOrderStore,l=e.displayPolicyStore,a=e.onClosedRangeChange,c=e.onNewIssue,_=e.closedRange||St,f=s?qr(s,i):null,w=Br({transport:o,uiOrderStore:i}),$=[],v=[],x=[],M=[],F=[],B=[],W=!1,O=0,A=$a(),T=new Map,R=new Map,k=new Map,q=new Set,H={search:"",priority:"",type:"",labels:[]},V=!1,Z=null;function ke(E){return String(E.status||"open")==="open"}function Te(E){let N=String(E.status||"open");return N==="open"||N==="blocked"}function xe(E){let N=H.search.trim().toLowerCase(),re=H.priority,ee=H.type,X=H.labels;return E.filter(ce=>{if(N){let he=String(ce.id||"").toLowerCase(),be=String(ce.title||"").toLowerCase();if(!he.includes(N)&&!be.includes(N))return!1}if(re!==""&&String(ce.priority)!==re||ee!==""&&String(ce.issue_type||"")!==ee)return!1;if(X.length>0){let he=Array.isArray(ce.labels)?ce.labels:[];if(!X.some(be=>he.includes(be)))return!1}return!0})}function ue(){let E=new Set;for(let N of[$,v,x,M,F,B])for(let re of N){let ee=Array.isArray(re.labels)?re.labels:[];for(let X of ee)typeof X=="string"&&X.length>0&&E.add(X)}return Array.from(E).sort()}function D(){return H.search.trim()!==""||H.priority!==""||H.type!==""||H.labels.length>0}function P(){try{if(f){let E=f.selectBoardColumn("tab:board:in-progress","in_progress",A),N=f.selectBoardColumn("tab:board:blocked","blocked",A).filter(Te),re=new Set(E.map(S=>S.id)),ee=f.selectBoardColumn("tab:board:ready","ready",A).filter(S=>ke(S)&&!re.has(S.id)),X=f.selectBoardColumn("tab:board:resolved","resolved",A),ce=f.selectBoardColumn("tab:board:deferred","deferred",A),he=W?ce:[],be=f.selectBoardColumn("tab:board:closed","closed").slice(0,ka),U=[...N,...ee,...E,...X,...he,...be];se(U);let b=new Set;for(let S of U)S&&S.id&&!Sn(S)&&b.add(S.id);let L=!D();$=L?er(N,b):N,v=L?er(ee,b):ee,x=L?er(E,b):E,M=L?er(X,b):X,F=L?er(he,b):he,O=ce.length,B=L?er(be,b):be,T=new Map;for(let S of $)T.set(S.id,"open");for(let S of v)T.set(S.id,"open");for(let S of x)T.set(S.id,"in_progress");for(let S of M)T.set(S.id,"resolved");for(let S of F)T.set(S.id,"deferred");for(let S of B)T.set(S.id,"closed");R=new Map;for(let S of $)R.set(S.id,"blocked-col");for(let S of v)R.set(S.id,"ready-col");for(let S of x)R.set(S.id,"in-progress-col");for(let S of M)R.set(S.id,"resolved-col");for(let S of F)R.set(S.id,"deferred-col");for(let S of B)R.set(S.id,"closed-col")}Oe()}catch{$=[],v=[],x=[],M=[],F=[],B=[],k=new Map,Oe()}}function se(E){let N=new Map;for(let ee of E)ee&&ee.id&&!N.has(ee.id)&&N.set(ee.id,ee);let re=new Map;for(let ee of N.values()){let X=Sn(ee);if(!X)continue;let ce=re.get(X);ce||(ce=[],re.set(X,ce)),ce.push({id:ee.id,title:ee.title,status:ee.status,metadata:ee.metadata,created_at:ee.created_at})}k=re}function Ae(E){let N=k.get(E)||[],re=0,ee=null;for(let X of N)(X.status==="resolved"||X.status==="closed")&&(re+=1),!ee&&X.status==="in_progress"&&(ee=X);return{total:N.length,count:re,current:ee,children:N}}function ae(E){return!q.has(E)}function Ee(E,N){E.preventDefault(),E.stopPropagation(),q.has(N)?q.delete(N):q.add(N),Oe()}function le(E,N){E.preventDefault(),E.stopPropagation(),n(N)}function Be(E,N){E.preventDefault(),E.stopPropagation(),n(N)}function ge(E,N){Z||n(N)}function Pe(E,N){E.preventDefault(),E.stopPropagation(),xa(N).then(re=>{re&&te("\uBCF5\uC0AC\uB428","success",1200)})}function ut(E,N){Z=N,E.dataTransfer&&(E.dataTransfer.setData("text/plain",N),E.dataTransfer.effectAllowed="move"),E.target.classList.add("board-card--dragging")}function Ue(E){E.target.classList.remove("board-card--dragging"),_t(),setTimeout(()=>{Z=null},0)}function Ve(E){let N=String(E.target.value||"");!N||N===_||(_=N,a&&a(N),Oe())}let Le={onCardClick:ge,onCopyId:Pe,onDragStart:ut,onDragEnd:Ue,onClosedRangeChange:Ve,rollupFor:Ae,isExpanded:ae,onRollupToggle:Ee,onChildClick:le,onFromChipClick:Be,get policy(){return l?l.get():null}};function Ke(E){let N=E.target,re=t.querySelector(".board-filter__labels");N&&re&&re.contains(N)||et()}function Je(E){E.key==="Escape"&&et()}function Ze(){V||(V=!0,document.addEventListener("mousedown",Ke),document.addEventListener("keydown",Je),Oe())}function et(){V&&(V=!1,document.removeEventListener("mousedown",Ke),document.removeEventListener("keydown",Je),Oe())}let ze={onSearchInput(E){H.search=String(E.target.value||""),P()},onPriorityChange(E){H.priority=String(E.target.value||""),P()},onTypeChange(E){H.type=String(E.target.value||""),P()},onSortChange(E){let N=String(E.target.value||"");if(!(!ro.has(N)||N===A)){A=N;try{window.localStorage.setItem(to,N)}catch{}P()}},onDeferredToggle(){W=!W,P()},onLabelMenuToggle(){V?et():Ze()},onLabelToggle(E){let N=H.labels.indexOf(E);N===-1?H.labels.push(E):H.labels.splice(N,1),P()},onLabelClear(){H.labels.length!==0&&(H.labels=[],P())},onNewIssue(){c&&c()}};function tt(){let E=W?"board-root board-root--deferred":"board-root";return d`
      <div class="board-view">
        ${eo(H,ze,{sort_mode:A,show_deferred:W,deferred_count:O,label_options:ue(),label_menu_open:V})}
        <div class=${E}>
          ${Pt({title:"Blocked",id:"blocked-col",items:xe($)},Le)}
          ${Pt({title:"Ready",id:"ready-col",items:xe(v)},Le)}
          ${Pt({title:"In progress",id:"in-progress-col",items:xe(x)},Le)}
          ${Pt({title:"Resolved",id:"resolved-col",items:xe(M)},Le)}
          ${W?Pt({title:"Deferred",id:"deferred-col",items:xe(F)},Le):""}
          ${Pt({title:"Closed",id:"closed-col",items:xe(B),is_closed:!0,closed_range:_},Le)}
        </div>
      </div>
    `}function Oe(){we(tt(),t),He()}function He(){try{let E=Array.from(t.querySelectorAll(".board-column"));for(let N of E)Array.from(N.querySelectorAll(".board-card")).forEach((ee,X)=>{ee.tabIndex=X===0?0:-1})}catch{}}async function lt(E,N){if(!o){te("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:E,status:N}),te("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(re){r("update-status failed: %o",re),te("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function We(E){switch(E){case"blocked-col":return $;case"ready-col":return v;case"in-progress-col":return x;case"resolved-col":return M;case"deferred-col":return F;default:return[]}}function dt(E,N,re){if(!o||!i)return;let ee=We(E),X=ee.find(b=>b.id===N);if(!X)return;let ce=ee.filter(b=>b.id!==N),he=re.closest?re.closest(".board-card"):null,be=ce.length;if(he){let b=he.getAttribute("data-issue-id");if(b===N)return;let L=ce.findIndex(S=>S.id===b);L>=0&&(be=L)}let U=ce.slice();U.splice(be,0,X),w.applyReorder(N,U,be)}function _t(){for(let E of Array.from(t.querySelectorAll(".board-column--drag-over")))E.classList.remove("board-column--drag-over")}let Ce=null;t.addEventListener("dragover",E=>{E.preventDefault(),E.dataTransfer&&(E.dataTransfer.dropEffect="move");let re=E.target.closest(".board-column");re&&re!==Ce&&(Ce&&Ce.classList.remove("board-column--drag-over"),re.classList.add("board-column--drag-over"),Ce=re)}),t.addEventListener("dragleave",E=>{let N=E.relatedTarget;(!N||!t.contains(N))&&Ce&&(Ce.classList.remove("board-column--drag-over"),Ce=null)}),t.addEventListener("drop",E=>{E.preventDefault(),Ce&&(Ce.classList.remove("board-column--drag-over"),Ce=null);let N=E.target,re=N.closest(".board-column");if(!re)return;let ee=E.dataTransfer?.getData("text/plain")||"";if(!ee)return;let X=re.id,ce=R.get(ee);if(ce&&ce===X){if(va.has(X)){if(A!=="manual"){te("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}dt(X,ee,N)}return}let he=ya[X];if(!he){te("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}T.get(ee)!==he&&lt(ee,he)}),t.addEventListener("keydown",E=>{let N=E.target;if(!(N instanceof HTMLElement))return;let re=String(N.tagName||"").toLowerCase();if(re==="input"||re==="textarea"||re==="select"||re==="button"||re==="a"||N.isContentEditable===!0)return;let ee=N.closest(".board-card");if(!ee)return;let X=String(E.key||"");if(X==="Enter"||X===" "){E.preventDefault();let U=ee.getAttribute("data-issue-id");U&&n(U);return}if(X!=="ArrowUp"&&X!=="ArrowDown"&&X!=="ArrowLeft"&&X!=="ArrowRight")return;E.preventDefault();let ce=ee.closest(".board-column");if(!ce)return;let he=Array.from(ce.querySelectorAll(".board-card")),be=he.indexOf(ee);if(X==="ArrowDown"&&be<he.length-1){fe(ee,he[be+1]);return}if(X==="ArrowUp"&&be>0){fe(ee,he[be-1]);return}if(X==="ArrowLeft"||X==="ArrowRight"){let U=Array.from(t.querySelectorAll(".board-column")),b=U.indexOf(ce),L=X==="ArrowRight"?1:-1,S=b+L;for(;S>=0&&S<U.length;){let Q=U[S].querySelector(".board-card");if(Q){fe(ee,Q);return}S+=L}}});function fe(E,N){try{E.tabIndex=-1,N.tabIndex=0,N.focus()}catch{}}let Ge=null;f&&f.subscribe&&(Ge=f.subscribe(()=>{try{P()}catch{}}));let je=null;return l&&l.subscribe&&(je=l.subscribe(()=>{try{P()}catch{}})),{async load(){r("load"),P()},clear(){et(),Ge&&(Ge(),Ge=null),je&&(je(),je=null),t.replaceChildren(),$=[],v=[],x=[],M=[],F=[],B=[],T=new Map,R=new Map}}}function Sn(t){let e=t&&t.parent;return typeof e=="string"?e:e&&e.id?String(e.id):""}function er(t,e){return t.filter(r=>{let n=Sn(r);return!(n&&e.has(n))})}async function xa(t){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(t)),!0;let e=document.createElement("textarea");e.value=String(t),e.style.position="fixed",e.style.left="-9999px",document.body.appendChild(e),e.select();let r=!1;try{r=document.execCommand("copy")}finally{e.remove()}return r}catch{return!1}}async function Ft(t){let e=String(t);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(e),!0}catch{}try{let r=document.createElement("textarea");r.value=e,r.style.position="fixed",r.style.left="-9999px",document.body.appendChild(r),r.select();let n=!1;try{n=document.execCommand("copy")}finally{r.remove()}return n}catch{return!1}}var Sa="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function qt(t){return typeof t=="number"&&Number.isFinite(t)?t:0}var tr=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"];function so(t){let e=0;for(let r of tr)e+=qt(t?.[r]);return e}function oo(t){return!t||typeof t!="object"?!1:tr.some(e=>Number.isFinite(t[e]))}function Ta(t){return t>=1e6?`${(t/1e6).toFixed(1)}M`:t>=1e3?`${(t/1e3).toFixed(1)}k`:String(t)}function Tt(t){return oo(t)?`\u03C4 ${Ta(so(t))}`:null}function Hr(t){let e=Tt(t);if(!e)return null;let r=t?.total_cost_usd;return typeof r=="number"&&Number.isFinite(r)?`${e} \xB7 $${r.toFixed(2)}`:e}function Wr(t){if(!t||typeof t!="object")return"";let e=[`\uC785\uB825 ${qt(t.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${qt(t.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${qt(t.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${qt(t.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&e.push(`$${t.total_cost_usd.toFixed(2)}`);let r=[`\uCD1D ${so(t).toLocaleString("en-US")}`,e.join(" \xB7 ")];return t.replayed&&r.push(Sa),r.join(`
`)}function rr(t,e){let r={input_tokens:0,output_tokens:0,cache_read_input_tokens:0,cache_creation_input_tokens:0},n=0,s=0,o=0,i=!1;for(let l of Object.values(t||{})){if(!l||l.bead_id!==e)continue;let a=l.usage;if(oo(a)){n+=1;for(let c of tr)r[c]=qt(r[c])+qt(a[c]);typeof a.total_cost_usd=="number"&&Number.isFinite(a.total_cost_usd)&&(s+=a.total_cost_usd,o+=1),a.replayed===!0&&(i=!0)}}return n===0?null:(o===n&&(r.total_cost_usd=s),i&&(r.replayed=!0),r)}var Aa={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},Ea=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,Ca=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function At(t){return!!t&&typeof t=="object"}function Tn(t){return typeof t!="string"||t.length===0?[]:t.split(/\r?\n/)}function io(t,e){let r=Tn(t),n=Tn(e),s=new Map;for(let l of r)s.set(l,(s.get(l)||0)+1);let o=0;for(let l of n){let a=s.get(l)||0;a>0?s.set(l,a-1):o+=1}let i=0;for(let l of s.values())i+=l;return{added:o,removed:i}}function Ra(t){let e="";typeof t=="string"?e=t:Array.isArray(t)?e=t.map(s=>At(s)&&typeof s.text=="string"?s.text:"").join(""):At(t)&&typeof t.text=="string"&&(e=t.text);let n=(String(e).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return n.length>120?`${n.slice(0,117)}\u2026`:n}function La(t){let e=String(t.name||""),r=t.input||{},n={kind:"tool",tool:e,icon:Aa[e]||"\u{1F527}",input:r,expandable:!0};if((e==="Read"||e==="Write")&&(n.path=String(r.file_path||r.path||"")),e==="Write"&&(n.added=Tn(r.content).length),e==="Edit"){n.path=String(r.file_path||r.path||"");let{added:s,removed:o}=io(r.old_string,r.new_string);n.added=s,n.removed=o}if(e==="MultiEdit"){n.path=String(r.file_path||r.path||"");let s=0,o=0,i=Array.isArray(r.edits)?r.edits:[];for(let l of i){let a=io(At(l)?l.old_string:"",At(l)?l.new_string:"");s+=a.added,o+=a.removed}n.added=s,n.removed=o}return e==="Bash"&&(n.command=String(r.command||"")),(e==="Grep"||e==="Glob")&&(n.command=String(r.pattern||r.query||"")),n}function ao(t){let e=t.split(/\r?\n/).find(n=>n.trim().length>0)||"",r=Ea.exec(e);return r?{kind:"gate",gate:r[2]==="implementation"?"impl":r[2],reviewer:r[3],verdict:r[4],time:r[5]?r[5].trim():void 0,text:e.trim()}:Ca.test(e)&&e.trim().length<=80?{kind:"phase",text:e.trim()}:{kind:"assistant",text:t}}function Ia(t,e){if(t.type==="assistant"){let r=t.message,n=r&&Array.isArray(r.content)?r.content:[],s=[];for(let o of n)if(At(o)){if(o.type==="text"&&typeof o.text=="string")s.push(ao(o.text));else if(o.type==="tool_use"){let i=La(o);typeof o.id=="string"&&e.set(o.id,i),s.push(i)}}return s}if(t.type==="user"){let r=t.message,n=r&&Array.isArray(r.content)?r.content:[];for(let s of n)if(At(s)&&s.type==="tool_result"){let o=e.get(String(s.tool_use_id));if(o){let i=Ra(s.content);o.result=i,o.output=typeof s.content=="string"?s.content:i}}return[]}if(t.type==="result"){let r=t.is_error===!1&&t.subtype==="success";return[{kind:"result",success:r,text:typeof t.result=="string"?t.result:r?"DONE":""}]}return[]}function Da(t){if(t.type==="item.completed"&&At(t.item)){let e=t.item;return e.type==="agent_message"&&typeof e.text=="string"?[ao(e.text)]:e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}if(t.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(t.type==="turn.failed"){let e=t.error;return[{kind:"error",text:e&&typeof e.message=="string"?e.message:"turn failed"}]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:[]}function Oa(t){let e=t.type;return typeof e=="string"&&(e==="error"||e.startsWith("thread.")||e.startsWith("turn.")||e.startsWith("item."))}function lo(t){let e=[],r=new Map,n=Array.isArray(t)?t:[];for(let s of n){let o=s;if(typeof s=="string"){let l=s.trim();if(l.length===0)continue;try{o=JSON.parse(l)}catch{continue}}if(!At(o))continue;let i=Oa(o)?Da(o):Ia(o,r);for(let l of i)e.push(l)}return e}var Ma=5;function Na(t,e){if(typeof t!="number")return"";let r=Math.max(0,Math.floor((e-t)/1e3));return r<60?`${r}\uCD08 \uC804`:yt(t,e)}function Gr(t,e={}){let{transport:r,sessionLogStore:n,onClose:s}=e,o=null,i={},l=!0,a=new Set,c=new Set,_=null,f=null;function w(){if(!o||!n)return[];let D=n.get(o);return lo(D?D.lines:[])}function $(){if(!o||!n)return null;let D=n.get(o),P=D?D.last_event_at:null;return typeof P=="number"?P:null}function v(){return i.status==="running"}function x(){if(v()&&o){f||(f=setInterval(()=>k(),1e3));return}M()}function M(){f&&(clearInterval(f),f=null)}function F(D){let P=[],se=0;for(;se<D.length;){let Ae=D[se];if(Ae.kind==="tool"){let ae=se;for(;ae<D.length&&D[ae].kind==="tool"&&D[ae].tool===Ae.tool;)ae+=1;if(ae-se>=Ma&&!c.has(se)){P.push({kind:"group",idx:se,tool:Ae.tool||"",lines:D.slice(se,ae).map((Ee,le)=>({idx:se+le,line:Ee}))}),se=ae;continue}}P.push({kind:"line",idx:se,line:Ae}),se+=1}return P}function B(D){for(let P=D.length-1;P>=0;P-=1){let se=D[P];if(se.kind==="result"||se.kind==="error")return null;if(se.kind==="tool"&&!Object.hasOwn(se,"result"))return se}return null}function W(D,P){if(P.kind==="gate")return d`<div class="sv__gate">${P.text}</div>`;if(P.kind==="phase")return d`<div class="sv__phase">${P.text}</div>`;if(P.kind==="result")return d`<div
        class="sv__result${P.success?" sv__result--ok":" sv__result--fail"}"
      >
        ${P.success?"\u2713":"\u2717"}
        ${P.text||(P.success?"DONE":"\uC2E4\uD328")}
      </div>`;if(P.kind==="error")return d`<div class="sv__error">⛔ ${P.text}</div>`;if(P.kind==="blocker")return d`<div class="sv__error">⛔ ${P.text}</div>`;if(P.kind==="tool"){let se=a.has(D),Ae=P.tool==="Bash"?P.command:P.path||P.command||"";return d`<div
        class="sv__tool${se?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>H(D)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${P.icon}</span>
          <span class="sv__tool-name">${P.tool}</span>
          ${Ae?d`<span class="sv__tool-detail">${Ae}</span>`:""}
          ${typeof P.added=="number"?d`<span class="sv__diff-add">+${P.added}</span>`:""}
          ${typeof P.removed=="number"?d`<span class="sv__diff-del">−${P.removed}</span>`:""}
          ${P.result?d`<span class="sv__tool-ok">→ ${P.result}</span>`:""}
        </span>
        ${se?d`<pre class="sv__tool-expand">${O(P)}</pre>`:""}
      </div>`}return d`<div class="sv__as">${P.text}</div>`}function O(D){let P=[];if(D.input!==void 0)try{P.push(`input: ${JSON.stringify(D.input,null,2)}`)}catch{}return typeof D.output=="string"&&D.output.length>0&&P.push(`output:
${D.output}`),P.join(`

`)}function A(){if(!o)return d``;let D=w(),P=[i.runner,i.model,i.effort].filter(Boolean).join(" \xB7 "),se=i.session_id||"",Ae=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${l?"ON":"OFF"}`,ae=v(),Ee=ae?Na($(),Date.now()):"",le=ae?B(D):null;return d`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id">${o}</span>
        ${ae?d`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${Ee?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${Ee}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${Ee?d`<span class="sv__live-ago">${Ee}</span>`:""}</span
            >`:""}
        ${se?d`<button
              type="button"
              class="sv__session"
              title=${se}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${se}`}
              @click=${()=>Z(se)}
            >
              ⧉ ${se.slice(0,8)}
            </button>`:""}
        ${P?d`<span class="sv__meta">${P}</span>`:""}
        ${i.worktree?d`<span class="sv__wt" title=${i.worktree}
              >${i.worktree}</span
            >`:""}
        <button
          type="button"
          class="sv__follow${l?" sv__follow--on":""}"
          aria-pressed=${l?"true":"false"}
          aria-label=${Ae}
          @click=${V}
        >
          <span class="sv__follow-full">⇣ ${Ae}</span>
          <span class="sv__follow-short">⇣ ${l?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>ue()}
        >
          ✕
        </button>
      </div>
      <div class="sv__body">
        ${D.length===0?d`<div class="sv__empty">세션 로그 없음</div>`:F(D).map(Be=>Be.kind==="group"?T(Be):W(Be.idx,Be.line))}
      </div>
      ${le?d`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            <span class="sv__now-icon">${le.icon}</span>
            <span class="sv__now-name">${le.tool}</span>
            <span class="sv__now-detail"
              >${le.tool==="Bash"?le.command:le.path||le.command||""}</span
            >
          </div>`:""}
    </div>`}function T(D){return d`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>R(D.idx)}
    >
      <span class="sv__group-icon">${D.lines[0].line.icon}</span>
      <span class="sv__group-name">${D.tool}</span>
      <span class="sv__group-count">${D.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function R(D){c.add(D),k()}function k(){we(A(),t),x(),l&&q()}function q(){let D=t.querySelector(".sv__body");D&&(D.scrollTop=D.scrollHeight)}function H(D){a.has(D)?a.delete(D):a.add(D),k()}function V(){l=!l,k()}function Z(D){Ft(D).then(P=>{P?te("\uBCF5\uC0AC\uB428","success",1200):te("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function ke(D){!o||!D||(i={...i,...D},k())}function Te(D){let P=D.target;if(!P||!P.classList||!P.classList.contains("sv__body"))return;!(P.scrollHeight-P.scrollTop-P.clientHeight<=4)&&l&&(l=!1,k())}t.addEventListener("scroll",Te,!0);function xe(D){let P=D&&D.attempt_id;P&&(o=P,i=D.meta||{},l=!0,a.clear(),c.clear(),!_&&n&&(_=n.subscribe(k)),r&&Promise.resolve(r("subscribe-session-log",{id:`session-log:${o}`,attempt_id:o})).catch(()=>{}),k())}function ue(){let D=o;o=null,a.clear(),c.clear(),M(),r&&D&&Promise.resolve(r("unsubscribe-session-log",{id:`session-log:${D}`})).catch(()=>{}),we(d``,t),s&&s()}return{open:xe,updateMeta:ke,close:ue,isOpen(){return o!==null},destroy(){M(),_&&(_(),_=null),t.removeEventListener("scroll",Te,!0),o=null,we(d``,t)}}}function Pa(t){let e=t&&t.metadata||{},r=[];return typeof e.spec_id=="string"&&e.spec_id.trim().length>0&&r.push({kind:"spec",path:e.spec_id.trim()}),typeof e.plan_path=="string"&&e.plan_path.trim().length>0&&r.push({kind:"plan",path:e.plan_path.trim()}),r}function co(t,e){let r=Pa(t);return d`
    <div class="detail-section-label">Artifacts</div>
    ${r.length===0?d`<div class="detail-empty">산출물 없음</div>`:d`
          ${r.map(n=>d`<div class="detail-art">
                <span class="detail-art__ic" aria-hidden="true">▤</span>
                <button
                  type="button"
                  class="detail-art__path"
                  title=${`${n.path} \xB7 \uD074\uB9AD\uD558\uBA74 \uBCF5\uC0AC`}
                  @click=${s=>e.onCopyPath(s,n.path)}
                >
                  ${n.path}
                </button>
                <button
                  type="button"
                  class="detail-art__op"
                  @click=${s=>e.onOpenDoc(s,n.path)}
                >
                  열기
                </button>
              </div>`)}
          <div class="detail-art__cap">경로 클릭 = 복사 · 열기 = 뷰어</div>
        `}
  `}var An=["opus","sonnet","haiku","fable"],En=["low","medium","high","xhigh"],Cn=["codex","opus","fable","self","skip"],Rn=["opus","fable","sonnet","haiku"],Fa=["standard","fast_track"],Ln={orchestration_model:"(\uAE30\uBCF8: opus)",orchestration_effort:"(\uAE30\uBCF8: CLI \uAE30\uBCF8)",review_model:"(\uAE30\uBCF8: codex)",impl_model:"(\uAE30\uBCF8: \uD2F0\uC5B4 \uC790\uB3D9)"};function jr(t,e){let r=e&&e[t];return typeof r=="string"&&r.length>0?`(\uAE30\uBCF8: ${r} \u2014 \uC804\uC5ED)`:Ln[t]||"(\uAE30\uBCF8)"}function _r(t,e,r,n,s,o){return d`
    <div class="detail-kv">
      <span class="detail-kv__k">${e}</span>
      <select
        class=${s?"detail-kv__v detail-kv__v--sel":"detail-kv__v"}
        aria-label=${e}
        data-key=${t}
        @change=${i=>o.onChange(t,i.target.value)}
      >
        ${r.map(i=>d`<option value=${i.value} ?selected=${i.value===n}>
              ${i.label}
            </option>`)}
      </select>
    </div>
  `}function gr(t,e){let r=t.map(n=>({value:n,label:n}));return typeof e=="string"?[{value:"",label:e},...r]:r}function uo(t,e,r){let n=t&&t.metadata||{},s=r&&typeof r=="object"?r:{},o=n.workflow_mode==="fast_track"?"fast_track":"standard";return d`
    <div class="detail-section-label">실행 설정 (수정 가능)</div>
    ${_r("orchestration_model","orchestration_model",gr(An,jr("orchestration_model",s)),n.orchestration_model||"",!1,e)}
    ${_r("orchestration_effort","orchestration_effort",gr(En,jr("orchestration_effort",s)),n.orchestration_effort||"",!1,e)}
    ${_r("review_model","review_model",gr(Cn,jr("review_model",s)),n.review_model||"",!1,e)}
    ${_r("impl_model","impl_model",gr(Rn,jr("impl_model",s)),n.impl_model||"",!1,e)}
    ${_r("workflow_mode","workflow_mode",gr(Fa),o,n.workflow_mode==="fast_track",e)}
  `}var{entries:ko,setPrototypeOf:po,isFrozen:qa,getPrototypeOf:Ba,getOwnPropertyDescriptor:Ua}=Object,{freeze:ot,seal:ht,create:Fn}=Object,{apply:qn,construct:Bn}=typeof Reflect<"u"&&Reflect;ot||(ot=function(e){return e});ht||(ht=function(e){return e});qn||(qn=function(e,r){for(var n=arguments.length,s=new Array(n>2?n-2:0),o=2;o<n;o++)s[o-2]=arguments[o];return e.apply(r,s)});Bn||(Bn=function(e){for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return new e(...n)});var Yr=it(Array.prototype.forEach),za=it(Array.prototype.lastIndexOf),fo=it(Array.prototype.pop),mr=it(Array.prototype.push),Ha=it(Array.prototype.splice),Kr=it(String.prototype.toLowerCase),In=it(String.prototype.toString),Dn=it(String.prototype.match),br=it(String.prototype.replace),Wa=it(String.prototype.indexOf),Ga=it(String.prototype.trim),mt=it(Object.prototype.hasOwnProperty),st=it(RegExp.prototype.test),wr=ja(TypeError);function it(t){return function(e){e instanceof RegExp&&(e.lastIndex=0);for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return qn(t,e,n)}}function ja(t){return function(){for(var e=arguments.length,r=new Array(e),n=0;n<e;n++)r[n]=arguments[n];return Bn(t,r)}}function de(t,e){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Kr;po&&po(t,null);let n=e.length;for(;n--;){let s=e[n];if(typeof s=="string"){let o=r(s);o!==s&&(qa(e)||(e[n]=o),s=o)}t[s]=!0}return t}function Ya(t){for(let e=0;e<t.length;e++)mt(t,e)||(t[e]=null);return t}function vt(t){let e=Fn(null);for(let[r,n]of ko(t))mt(t,r)&&(Array.isArray(n)?e[r]=Ya(n):n&&typeof n=="object"&&n.constructor===Object?e[r]=vt(n):e[r]=n);return e}function kr(t,e){for(;t!==null;){let n=Ua(t,e);if(n){if(n.get)return it(n.get);if(typeof n.value=="function")return it(n.value)}t=Ba(t)}function r(){return null}return r}var ho=ot(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),On=ot(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Mn=ot(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Va=ot(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Nn=ot(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Ka=ot(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),_o=ot(["#text"]),go=ot(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),Pn=ot(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),mo=ot(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Vr=ot(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Za=ht(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Xa=ht(/<%[\w\W]*|[\w\W]*%>/gm),Qa=ht(/\$\{[\w\W]*/gm),Ja=ht(/^data-[\-\w.\u00B7-\uFFFF]+$/),el=ht(/^aria-[\-\w]+$/),yo=ht(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),tl=ht(/^(?:\w+script|data):/i),rl=ht(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),vo=ht(/^html$/i),nl=ht(/^[a-z][.\w]*(-[.\w]+)+$/i),bo=Object.freeze({__proto__:null,ARIA_ATTR:el,ATTR_WHITESPACE:rl,CUSTOM_ELEMENT:nl,DATA_ATTR:Ja,DOCTYPE_NAME:vo,ERB_EXPR:Xa,IS_ALLOWED_URI:yo,IS_SCRIPT_OR_DATA:tl,MUSTACHE_EXPR:Za,TMPLIT_EXPR:Qa}),yr={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},sl=function(){return typeof window>"u"?null:window},ol=function(e,r){if(typeof e!="object"||typeof e.createPolicy!="function")return null;let n=null,s="data-tt-policy-suffix";r&&r.hasAttribute(s)&&(n=r.getAttribute(s));let o="dompurify"+(n?"#"+n:"");try{return e.createPolicy(o,{createHTML(i){return i},createScriptURL(i){return i}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},wo=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function $o(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:sl(),e=K=>$o(K);if(e.version="3.3.0",e.removed=[],!t||!t.document||t.document.nodeType!==yr.document||!t.Element)return e.isSupported=!1,e;let{document:r}=t,n=r,s=n.currentScript,{DocumentFragment:o,HTMLTemplateElement:i,Node:l,Element:a,NodeFilter:c,NamedNodeMap:_=t.NamedNodeMap||t.MozNamedAttrMap,HTMLFormElement:f,DOMParser:w,trustedTypes:$}=t,v=a.prototype,x=kr(v,"cloneNode"),M=kr(v,"remove"),F=kr(v,"nextSibling"),B=kr(v,"childNodes"),W=kr(v,"parentNode");if(typeof i=="function"){let K=r.createElement("template");K.content&&K.content.ownerDocument&&(r=K.content.ownerDocument)}let O,A="",{implementation:T,createNodeIterator:R,createDocumentFragment:k,getElementsByTagName:q}=r,{importNode:H}=n,V=wo();e.isSupported=typeof ko=="function"&&typeof W=="function"&&T&&T.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:Z,ERB_EXPR:ke,TMPLIT_EXPR:Te,DATA_ATTR:xe,ARIA_ATTR:ue,IS_SCRIPT_OR_DATA:D,ATTR_WHITESPACE:P,CUSTOM_ELEMENT:se}=bo,{IS_ALLOWED_URI:Ae}=bo,ae=null,Ee=de({},[...ho,...On,...Mn,...Nn,..._o]),le=null,Be=de({},[...go,...Pn,...mo,...Vr]),ge=Object.seal(Fn(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Pe=null,ut=null,Ue=Object.seal(Fn(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),Ve=!0,Le=!0,Ke=!1,Je=!0,Ze=!1,et=!0,ze=!1,tt=!1,Oe=!1,He=!1,lt=!1,We=!1,dt=!0,_t=!1,Ce="user-content-",fe=!0,Ge=!1,je={},E=null,N=de({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),re=null,ee=de({},["audio","video","img","source","image","track"]),X=null,ce=de({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),he="http://www.w3.org/1998/Math/MathML",be="http://www.w3.org/2000/svg",U="http://www.w3.org/1999/xhtml",b=U,L=!1,S=null,Q=de({},[he,be,U],In),u=de({},["mi","mo","mn","ms","mtext"]),m=de({},["annotation-xml"]),C=de({},["title","style","font","a","script"]),J=null,pe=["application/xhtml+xml","text/html"],Ie="text/html",h=null,g=null,G=r.createElement("form"),Y=function(p){return p instanceof RegExp||p instanceof Function},oe=function(){let p=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(g&&g===p)){if((!p||typeof p!="object")&&(p={}),p=vt(p),J=pe.indexOf(p.PARSER_MEDIA_TYPE)===-1?Ie:p.PARSER_MEDIA_TYPE,h=J==="application/xhtml+xml"?In:Kr,ae=mt(p,"ALLOWED_TAGS")?de({},p.ALLOWED_TAGS,h):Ee,le=mt(p,"ALLOWED_ATTR")?de({},p.ALLOWED_ATTR,h):Be,S=mt(p,"ALLOWED_NAMESPACES")?de({},p.ALLOWED_NAMESPACES,In):Q,X=mt(p,"ADD_URI_SAFE_ATTR")?de(vt(ce),p.ADD_URI_SAFE_ATTR,h):ce,re=mt(p,"ADD_DATA_URI_TAGS")?de(vt(ee),p.ADD_DATA_URI_TAGS,h):ee,E=mt(p,"FORBID_CONTENTS")?de({},p.FORBID_CONTENTS,h):N,Pe=mt(p,"FORBID_TAGS")?de({},p.FORBID_TAGS,h):vt({}),ut=mt(p,"FORBID_ATTR")?de({},p.FORBID_ATTR,h):vt({}),je=mt(p,"USE_PROFILES")?p.USE_PROFILES:!1,Ve=p.ALLOW_ARIA_ATTR!==!1,Le=p.ALLOW_DATA_ATTR!==!1,Ke=p.ALLOW_UNKNOWN_PROTOCOLS||!1,Je=p.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Ze=p.SAFE_FOR_TEMPLATES||!1,et=p.SAFE_FOR_XML!==!1,ze=p.WHOLE_DOCUMENT||!1,He=p.RETURN_DOM||!1,lt=p.RETURN_DOM_FRAGMENT||!1,We=p.RETURN_TRUSTED_TYPE||!1,Oe=p.FORCE_BODY||!1,dt=p.SANITIZE_DOM!==!1,_t=p.SANITIZE_NAMED_PROPS||!1,fe=p.KEEP_CONTENT!==!1,Ge=p.IN_PLACE||!1,Ae=p.ALLOWED_URI_REGEXP||yo,b=p.NAMESPACE||U,u=p.MATHML_TEXT_INTEGRATION_POINTS||u,m=p.HTML_INTEGRATION_POINTS||m,ge=p.CUSTOM_ELEMENT_HANDLING||{},p.CUSTOM_ELEMENT_HANDLING&&Y(p.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(ge.tagNameCheck=p.CUSTOM_ELEMENT_HANDLING.tagNameCheck),p.CUSTOM_ELEMENT_HANDLING&&Y(p.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(ge.attributeNameCheck=p.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),p.CUSTOM_ELEMENT_HANDLING&&typeof p.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(ge.allowCustomizedBuiltInElements=p.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Ze&&(Le=!1),lt&&(He=!0),je&&(ae=de({},_o),le=[],je.html===!0&&(de(ae,ho),de(le,go)),je.svg===!0&&(de(ae,On),de(le,Pn),de(le,Vr)),je.svgFilters===!0&&(de(ae,Mn),de(le,Pn),de(le,Vr)),je.mathMl===!0&&(de(ae,Nn),de(le,mo),de(le,Vr))),p.ADD_TAGS&&(typeof p.ADD_TAGS=="function"?Ue.tagCheck=p.ADD_TAGS:(ae===Ee&&(ae=vt(ae)),de(ae,p.ADD_TAGS,h))),p.ADD_ATTR&&(typeof p.ADD_ATTR=="function"?Ue.attributeCheck=p.ADD_ATTR:(le===Be&&(le=vt(le)),de(le,p.ADD_ATTR,h))),p.ADD_URI_SAFE_ATTR&&de(X,p.ADD_URI_SAFE_ATTR,h),p.FORBID_CONTENTS&&(E===N&&(E=vt(E)),de(E,p.FORBID_CONTENTS,h)),fe&&(ae["#text"]=!0),ze&&de(ae,["html","head","body"]),ae.table&&(de(ae,["tbody"]),delete Pe.tbody),p.TRUSTED_TYPES_POLICY){if(typeof p.TRUSTED_TYPES_POLICY.createHTML!="function")throw wr('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof p.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw wr('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');O=p.TRUSTED_TYPES_POLICY,A=O.createHTML("")}else O===void 0&&(O=ol($,s)),O!==null&&typeof A=="string"&&(A=O.createHTML(""));ot&&ot(p),g=p}},ye=de({},[...On,...Mn,...Va]),kt=de({},[...Nn,...Ka]),Xe=function(p){let I=W(p);(!I||!I.tagName)&&(I={namespaceURI:b,tagName:"template"});let z=Kr(p.tagName),ve=Kr(I.tagName);return S[p.namespaceURI]?p.namespaceURI===be?I.namespaceURI===U?z==="svg":I.namespaceURI===he?z==="svg"&&(ve==="annotation-xml"||u[ve]):!!ye[z]:p.namespaceURI===he?I.namespaceURI===U?z==="math":I.namespaceURI===be?z==="math"&&m[ve]:!!kt[z]:p.namespaceURI===U?I.namespaceURI===be&&!m[ve]||I.namespaceURI===he&&!u[ve]?!1:!kt[z]&&(C[z]||!ye[z]):!!(J==="application/xhtml+xml"&&S[p.namespaceURI]):!1},rt=function(p){mr(e.removed,{element:p});try{W(p).removeChild(p)}catch{M(p)}},ie=function(p,I){try{mr(e.removed,{attribute:I.getAttributeNode(p),from:I})}catch{mr(e.removed,{attribute:null,from:I})}if(I.removeAttribute(p),p==="is")if(He||lt)try{rt(I)}catch{}else try{I.setAttribute(p,"")}catch{}},Me=function(p){let I=null,z=null;if(Oe)p="<remove></remove>"+p;else{let Re=Dn(p,/^[\r\n\t ]+/);z=Re&&Re[0]}J==="application/xhtml+xml"&&b===U&&(p='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+p+"</body></html>");let ve=O?O.createHTML(p):p;if(b===U)try{I=new w().parseFromString(ve,J)}catch{}if(!I||!I.documentElement){I=T.createDocument(b,"template",null);try{I.documentElement.innerHTML=L?A:ve}catch{}}let Fe=I.body||I.documentElement;return p&&z&&Fe.insertBefore(r.createTextNode(z),Fe.childNodes[0]||null),b===U?q.call(I,ze?"html":"body")[0]:ze?I.documentElement:Fe},zt=function(p){return R.call(p.ownerDocument||p,p,c.SHOW_ELEMENT|c.SHOW_COMMENT|c.SHOW_TEXT|c.SHOW_PROCESSING_INSTRUCTION|c.SHOW_CDATA_SECTION,null)},sr=function(p){return p instanceof f&&(typeof p.nodeName!="string"||typeof p.textContent!="string"||typeof p.removeChild!="function"||!(p.attributes instanceof _)||typeof p.removeAttribute!="function"||typeof p.setAttribute!="function"||typeof p.namespaceURI!="string"||typeof p.insertBefore!="function"||typeof p.hasChildNodes!="function")},or=function(p){return typeof l=="function"&&p instanceof l};function pt(K,p,I){Yr(K,z=>{z.call(e,p,I,g)})}let Cr=function(p){let I=null;if(pt(V.beforeSanitizeElements,p,null),sr(p))return rt(p),!0;let z=h(p.nodeName);if(pt(V.uponSanitizeElement,p,{tagName:z,allowedTags:ae}),et&&p.hasChildNodes()&&!or(p.firstElementChild)&&st(/<[/\w!]/g,p.innerHTML)&&st(/<[/\w!]/g,p.textContent)||p.nodeType===yr.progressingInstruction||et&&p.nodeType===yr.comment&&st(/<[/\w]/g,p.data))return rt(p),!0;if(!(Ue.tagCheck instanceof Function&&Ue.tagCheck(z))&&(!ae[z]||Pe[z])){if(!Pe[z]&&Rr(z)&&(ge.tagNameCheck instanceof RegExp&&st(ge.tagNameCheck,z)||ge.tagNameCheck instanceof Function&&ge.tagNameCheck(z)))return!1;if(fe&&!E[z]){let ve=W(p)||p.parentNode,Fe=B(p)||p.childNodes;if(Fe&&ve){let Re=Fe.length;for(let Qe=Re-1;Qe>=0;--Qe){let nt=x(Fe[Qe],!0);nt.__removalCount=(p.__removalCount||0)+1,ve.insertBefore(nt,F(p))}}}return rt(p),!0}return p instanceof a&&!Xe(p)||(z==="noscript"||z==="noembed"||z==="noframes")&&st(/<\/no(script|embed|frames)/i,p.innerHTML)?(rt(p),!0):(Ze&&p.nodeType===yr.text&&(I=p.textContent,Yr([Z,ke,Te],ve=>{I=br(I,ve," ")}),p.textContent!==I&&(mr(e.removed,{element:p.cloneNode()}),p.textContent=I)),pt(V.afterSanitizeElements,p,null),!1)},ir=function(p,I,z){if(dt&&(I==="id"||I==="name")&&(z in r||z in G))return!1;if(!(Le&&!ut[I]&&st(xe,I))){if(!(Ve&&st(ue,I))){if(!(Ue.attributeCheck instanceof Function&&Ue.attributeCheck(I,p))){if(!le[I]||ut[I]){if(!(Rr(p)&&(ge.tagNameCheck instanceof RegExp&&st(ge.tagNameCheck,p)||ge.tagNameCheck instanceof Function&&ge.tagNameCheck(p))&&(ge.attributeNameCheck instanceof RegExp&&st(ge.attributeNameCheck,I)||ge.attributeNameCheck instanceof Function&&ge.attributeNameCheck(I,p))||I==="is"&&ge.allowCustomizedBuiltInElements&&(ge.tagNameCheck instanceof RegExp&&st(ge.tagNameCheck,z)||ge.tagNameCheck instanceof Function&&ge.tagNameCheck(z))))return!1}else if(!X[I]){if(!st(Ae,br(z,P,""))){if(!((I==="src"||I==="xlink:href"||I==="href")&&p!=="script"&&Wa(z,"data:")===0&&re[p])){if(!(Ke&&!st(D,br(z,P,"")))){if(z)return!1}}}}}}}return!0},Rr=function(p){return p!=="annotation-xml"&&Dn(p,se)},Ht=function(p){pt(V.beforeSanitizeAttributes,p,null);let{attributes:I}=p;if(!I||sr(p))return;let z={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:le,forceKeepAttr:void 0},ve=I.length;for(;ve--;){let Fe=I[ve],{name:Re,namespaceURI:Qe,value:nt}=Fe,Ye=h(Re),Wt=nt,qe=Re==="value"?Wt:Ga(Wt);if(z.attrName=Ye,z.attrValue=qe,z.keepAttr=!0,z.forceKeepAttr=void 0,pt(V.uponSanitizeAttribute,p,z),qe=z.attrValue,_t&&(Ye==="id"||Ye==="name")&&(ie(Re,p),qe=Ce+qe),et&&st(/((--!?|])>)|<\/(style|title|textarea)/i,qe)){ie(Re,p);continue}if(Ye==="attributename"&&Dn(qe,"href")){ie(Re,p);continue}if(z.forceKeepAttr)continue;if(!z.keepAttr){ie(Re,p);continue}if(!Je&&st(/\/>/i,qe)){ie(Re,p);continue}Ze&&Yr([Z,ke,Te],ar=>{qe=br(qe,ar," ")});let Gt=h(p.nodeName);if(!ir(Gt,Ye,qe)){ie(Re,p);continue}if(O&&typeof $=="object"&&typeof $.getAttributeType=="function"&&!Qe)switch($.getAttributeType(Gt,Ye)){case"TrustedHTML":{qe=O.createHTML(qe);break}case"TrustedScriptURL":{qe=O.createScriptURL(qe);break}}if(qe!==Wt)try{Qe?p.setAttributeNS(Qe,Re,qe):p.setAttribute(Re,qe),sr(p)?rt(p):fo(e.removed)}catch{ie(Re,p)}}pt(V.afterSanitizeAttributes,p,null)},an=function K(p){let I=null,z=zt(p);for(pt(V.beforeSanitizeShadowDOM,p,null);I=z.nextNode();)pt(V.uponSanitizeShadowNode,I,null),Cr(I),Ht(I),I.content instanceof o&&K(I.content);pt(V.afterSanitizeShadowDOM,p,null)};return e.sanitize=function(K){let p=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},I=null,z=null,ve=null,Fe=null;if(L=!K,L&&(K="<!-->"),typeof K!="string"&&!or(K))if(typeof K.toString=="function"){if(K=K.toString(),typeof K!="string")throw wr("dirty is not a string, aborting")}else throw wr("toString is not a function");if(!e.isSupported)return K;if(tt||oe(p),e.removed=[],typeof K=="string"&&(Ge=!1),Ge){if(K.nodeName){let nt=h(K.nodeName);if(!ae[nt]||Pe[nt])throw wr("root node is forbidden and cannot be sanitized in-place")}}else if(K instanceof l)I=Me("<!---->"),z=I.ownerDocument.importNode(K,!0),z.nodeType===yr.element&&z.nodeName==="BODY"||z.nodeName==="HTML"?I=z:I.appendChild(z);else{if(!He&&!Ze&&!ze&&K.indexOf("<")===-1)return O&&We?O.createHTML(K):K;if(I=Me(K),!I)return He?null:We?A:""}I&&Oe&&rt(I.firstChild);let Re=zt(Ge?K:I);for(;ve=Re.nextNode();)Cr(ve),Ht(ve),ve.content instanceof o&&an(ve.content);if(Ge)return K;if(He){if(lt)for(Fe=k.call(I.ownerDocument);I.firstChild;)Fe.appendChild(I.firstChild);else Fe=I;return(le.shadowroot||le.shadowrootmode)&&(Fe=H.call(n,Fe,!0)),Fe}let Qe=ze?I.outerHTML:I.innerHTML;return ze&&ae["!doctype"]&&I.ownerDocument&&I.ownerDocument.doctype&&I.ownerDocument.doctype.name&&st(vo,I.ownerDocument.doctype.name)&&(Qe="<!DOCTYPE "+I.ownerDocument.doctype.name+`>
`+Qe),Ze&&Yr([Z,ke,Te],nt=>{Qe=br(Qe,nt," ")}),O&&We?O.createHTML(Qe):Qe},e.setConfig=function(){let K=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};oe(K),tt=!0},e.clearConfig=function(){g=null,tt=!1},e.isValidAttribute=function(K,p,I){g||oe({});let z=h(K),ve=h(p);return ir(z,ve,I)},e.addHook=function(K,p){typeof p=="function"&&mr(V[K],p)},e.removeHook=function(K,p){if(p!==void 0){let I=za(V[K],p);return I===-1?void 0:Ha(V[K],I,1)[0]}return fo(V[K])},e.removeHooks=function(K){V[K]=[]},e.removeAllHooks=function(){V=wo()},e}var xo=$o();var So={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},To=t=>(...e)=>({_$litDirective$:t,values:e}),Zr=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,r,n){this._$Ct=e,this._$AM=r,this._$Ci=n}_$AS(e,r){return this.update(e,r)}update(e,r){return this.render(...r)}};var vr=class extends Zr{constructor(e){if(super(e),this.it=Ne,e.type!==So.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===Ne||e==null)return this._t=void 0,this.it=e;if(e===Dt)return e;if(typeof e!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;let r=[e];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}};vr.directiveName="unsafeHTML",vr.resultType=1;var Ao=To(vr);function Wn(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Ut=Wn();function Oo(t){Ut=t}var Tr={exec:()=>null};function _e(t,e=""){let r=typeof t=="string"?t:t.source,n={replace:(s,o)=>{let i=typeof o=="string"?o:o.source;return i=i.replace(at.caret,"$1"),r=r.replace(s,i),n},getRegex:()=>new RegExp(r,e)};return n}var il=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),at={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:t=>new RegExp(`^( {0,3}${t})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}#`),htmlBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}<(?:[a-z].*>|!--)`,"i")},al=/^(?:[ \t]*(?:\n|$))+/,ll=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,cl=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,Ar=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,dl=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Gn=/(?:[*+-]|\d{1,9}[.)])/,Mo=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,No=_e(Mo).replace(/bull/g,Gn).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),ul=_e(Mo).replace(/bull/g,Gn).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),jn=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,pl=/^[^\n]+/,Yn=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,fl=_e(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Yn).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),hl=_e(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Gn).getRegex(),rn="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Vn=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,_l=_e("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",Vn).replace("tag",rn).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Po=_e(jn).replace("hr",Ar).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",rn).getRegex(),gl=_e(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Po).getRegex(),Kn={blockquote:gl,code:ll,def:fl,fences:cl,heading:dl,hr:Ar,html:_l,lheading:No,list:hl,newline:al,paragraph:Po,table:Tr,text:pl},Eo=_e("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",Ar).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",rn).getRegex(),ml={...Kn,lheading:ul,table:Eo,paragraph:_e(jn).replace("hr",Ar).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Eo).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",rn).getRegex()},bl={...Kn,html:_e(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",Vn).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Tr,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:_e(jn).replace("hr",Ar).replace("heading",` *#{1,6} *[^
]`).replace("lheading",No).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},wl=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,kl=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Fo=/^( {2,}|\\)\n(?!\s*$)/,yl=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,nn=/[\p{P}\p{S}]/u,Zn=/[\s\p{P}\p{S}]/u,qo=/[^\s\p{P}\p{S}]/u,vl=_e(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Zn).getRegex(),Bo=/(?!~)[\p{P}\p{S}]/u,$l=/(?!~)[\s\p{P}\p{S}]/u,xl=/(?:[^\s\p{P}\p{S}]|~)/u,Sl=_e(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",il?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),Uo=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,Tl=_e(Uo,"u").replace(/punct/g,nn).getRegex(),Al=_e(Uo,"u").replace(/punct/g,Bo).getRegex(),zo="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",El=_e(zo,"gu").replace(/notPunctSpace/g,qo).replace(/punctSpace/g,Zn).replace(/punct/g,nn).getRegex(),Cl=_e(zo,"gu").replace(/notPunctSpace/g,xl).replace(/punctSpace/g,$l).replace(/punct/g,Bo).getRegex(),Rl=_e("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,qo).replace(/punctSpace/g,Zn).replace(/punct/g,nn).getRegex(),Ll=_e(/\\(punct)/,"gu").replace(/punct/g,nn).getRegex(),Il=_e(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Dl=_e(Vn).replace("(?:-->|$)","-->").getRegex(),Ol=_e("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Dl).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Jr=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,Ml=_e(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Jr).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Ho=_e(/^!?\[(label)\]\[(ref)\]/).replace("label",Jr).replace("ref",Yn).getRegex(),Wo=_e(/^!?\[(ref)\](?:\[\])?/).replace("ref",Yn).getRegex(),Nl=_e("reflink|nolink(?!\\()","g").replace("reflink",Ho).replace("nolink",Wo).getRegex(),Co=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,Xn={_backpedal:Tr,anyPunctuation:Ll,autolink:Il,blockSkip:Sl,br:Fo,code:kl,del:Tr,emStrongLDelim:Tl,emStrongRDelimAst:El,emStrongRDelimUnd:Rl,escape:wl,link:Ml,nolink:Wo,punctuation:vl,reflink:Ho,reflinkSearch:Nl,tag:Ol,text:yl,url:Tr},Pl={...Xn,link:_e(/^!?\[(label)\]\((.*?)\)/).replace("label",Jr).getRegex(),reflink:_e(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Jr).getRegex()},Un={...Xn,emStrongRDelimAst:Cl,emStrongLDelim:Al,url:_e(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",Co).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:_e(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",Co).getRegex()},Fl={...Un,br:_e(Fo).replace("{2,}","*").getRegex(),text:_e(Un.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Xr={normal:Kn,gfm:ml,pedantic:bl},$r={normal:Xn,gfm:Un,breaks:Fl,pedantic:Pl},ql={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Ro=t=>ql[t];function $t(t,e){if(e){if(at.escapeTest.test(t))return t.replace(at.escapeReplace,Ro)}else if(at.escapeTestNoEncode.test(t))return t.replace(at.escapeReplaceNoEncode,Ro);return t}function Lo(t){try{t=encodeURI(t).replace(at.percentDecode,"%")}catch{return null}return t}function Io(t,e){let r=t.replace(at.findPipe,(o,i,l)=>{let a=!1,c=i;for(;--c>=0&&l[c]==="\\";)a=!a;return a?"|":" |"}),n=r.split(at.splitPipe),s=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),e)if(n.length>e)n.splice(e);else for(;n.length<e;)n.push("");for(;s<n.length;s++)n[s]=n[s].trim().replace(at.slashPipe,"|");return n}function xr(t,e,r){let n=t.length;if(n===0)return"";let s=0;for(;s<n;){let o=t.charAt(n-s-1);if(o===e&&!r)s++;else if(o!==e&&r)s++;else break}return t.slice(0,n-s)}function Bl(t,e){if(t.indexOf(e[1])===-1)return-1;let r=0;for(let n=0;n<t.length;n++)if(t[n]==="\\")n++;else if(t[n]===e[0])r++;else if(t[n]===e[1]&&(r--,r<0))return n;return r>0?-2:-1}function Do(t,e,r,n,s){let o=e.href,i=e.title||null,l=t[1].replace(s.other.outputLinkReplace,"$1");n.state.inLink=!0;let a={type:t[0].charAt(0)==="!"?"image":"link",raw:r,href:o,title:i,text:l,tokens:n.inlineTokens(l)};return n.state.inLink=!1,a}function Ul(t,e,r){let n=t.match(r.other.indentCodeCompensation);if(n===null)return e;let s=n[1];return e.split(`
`).map(o=>{let i=o.match(r.other.beginningSpace);if(i===null)return o;let[l]=i;return l.length>=s.length?o.slice(s.length):o}).join(`
`)}var en=class{constructor(t){$e(this,"options");$e(this,"rules");$e(this,"lexer");this.options=t||Ut}space(t){let e=this.rules.block.newline.exec(t);if(e&&e[0].length>0)return{type:"space",raw:e[0]}}code(t){let e=this.rules.block.code.exec(t);if(e){let r=e[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:e[0],codeBlockStyle:"indented",text:this.options.pedantic?r:xr(r,`
`)}}}fences(t){let e=this.rules.block.fences.exec(t);if(e){let r=e[0],n=Ul(r,e[3]||"",this.rules);return{type:"code",raw:r,lang:e[2]?e[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):e[2],text:n}}}heading(t){let e=this.rules.block.heading.exec(t);if(e){let r=e[2].trim();if(this.rules.other.endingHash.test(r)){let n=xr(r,"#");(this.options.pedantic||!n||this.rules.other.endingSpaceChar.test(n))&&(r=n.trim())}return{type:"heading",raw:e[0],depth:e[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(t){let e=this.rules.block.hr.exec(t);if(e)return{type:"hr",raw:xr(e[0],`
`)}}blockquote(t){let e=this.rules.block.blockquote.exec(t);if(e){let r=xr(e[0],`
`).split(`
`),n="",s="",o=[];for(;r.length>0;){let i=!1,l=[],a;for(a=0;a<r.length;a++)if(this.rules.other.blockquoteStart.test(r[a]))l.push(r[a]),i=!0;else if(!i)l.push(r[a]);else break;r=r.slice(a);let c=l.join(`
`),_=c.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");n=n?`${n}
${c}`:c,s=s?`${s}
${_}`:_;let f=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(_,o,!0),this.lexer.state.top=f,r.length===0)break;let w=o.at(-1);if(w?.type==="code")break;if(w?.type==="blockquote"){let $=w,v=$.raw+`
`+r.join(`
`),x=this.blockquote(v);o[o.length-1]=x,n=n.substring(0,n.length-$.raw.length)+x.raw,s=s.substring(0,s.length-$.text.length)+x.text;break}else if(w?.type==="list"){let $=w,v=$.raw+`
`+r.join(`
`),x=this.list(v);o[o.length-1]=x,n=n.substring(0,n.length-w.raw.length)+x.raw,s=s.substring(0,s.length-$.raw.length)+x.raw,r=v.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:n,tokens:o,text:s}}}list(t){let e=this.rules.block.list.exec(t);if(e){let r=e[1].trim(),n=r.length>1,s={type:"list",raw:"",ordered:n,start:n?+r.slice(0,-1):"",loose:!1,items:[]};r=n?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=n?r:"[*+-]");let o=this.rules.other.listItemRegex(r),i=!1;for(;t;){let a=!1,c="",_="";if(!(e=o.exec(t))||this.rules.block.hr.test(t))break;c=e[0],t=t.substring(c.length);let f=e[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,x=>" ".repeat(3*x.length)),w=t.split(`
`,1)[0],$=!f.trim(),v=0;if(this.options.pedantic?(v=2,_=f.trimStart()):$?v=e[1].length+1:(v=e[2].search(this.rules.other.nonSpaceChar),v=v>4?1:v,_=f.slice(v),v+=e[1].length),$&&this.rules.other.blankLine.test(w)&&(c+=w+`
`,t=t.substring(w.length+1),a=!0),!a){let x=this.rules.other.nextBulletRegex(v),M=this.rules.other.hrRegex(v),F=this.rules.other.fencesBeginRegex(v),B=this.rules.other.headingBeginRegex(v),W=this.rules.other.htmlBeginRegex(v);for(;t;){let O=t.split(`
`,1)[0],A;if(w=O,this.options.pedantic?(w=w.replace(this.rules.other.listReplaceNesting,"  "),A=w):A=w.replace(this.rules.other.tabCharGlobal,"    "),F.test(w)||B.test(w)||W.test(w)||x.test(w)||M.test(w))break;if(A.search(this.rules.other.nonSpaceChar)>=v||!w.trim())_+=`
`+A.slice(v);else{if($||f.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||F.test(f)||B.test(f)||M.test(f))break;_+=`
`+w}!$&&!w.trim()&&($=!0),c+=O+`
`,t=t.substring(O.length+1),f=A.slice(v)}}s.loose||(i?s.loose=!0:this.rules.other.doubleBlankLine.test(c)&&(i=!0)),s.items.push({type:"list_item",raw:c,task:!!this.options.gfm&&this.rules.other.listIsTask.test(_),loose:!1,text:_,tokens:[]}),s.raw+=c}let l=s.items.at(-1);if(l)l.raw=l.raw.trimEnd(),l.text=l.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let a of s.items){if(this.lexer.state.top=!1,a.tokens=this.lexer.blockTokens(a.text,[]),a.task){if(a.text=a.text.replace(this.rules.other.listReplaceTask,""),a.tokens[0]?.type==="text"||a.tokens[0]?.type==="paragraph"){a.tokens[0].raw=a.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),a.tokens[0].text=a.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let _=this.lexer.inlineQueue.length-1;_>=0;_--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[_].src)){this.lexer.inlineQueue[_].src=this.lexer.inlineQueue[_].src.replace(this.rules.other.listReplaceTask,"");break}}let c=this.rules.other.listTaskCheckbox.exec(a.raw);if(c){let _={type:"checkbox",raw:c[0]+" ",checked:c[0]!=="[ ]"};a.checked=_.checked,s.loose?a.tokens[0]&&["paragraph","text"].includes(a.tokens[0].type)&&"tokens"in a.tokens[0]&&a.tokens[0].tokens?(a.tokens[0].raw=_.raw+a.tokens[0].raw,a.tokens[0].text=_.raw+a.tokens[0].text,a.tokens[0].tokens.unshift(_)):a.tokens.unshift({type:"paragraph",raw:_.raw,text:_.raw,tokens:[_]}):a.tokens.unshift(_)}}if(!s.loose){let c=a.tokens.filter(f=>f.type==="space"),_=c.length>0&&c.some(f=>this.rules.other.anyLine.test(f.raw));s.loose=_}}if(s.loose)for(let a of s.items){a.loose=!0;for(let c of a.tokens)c.type==="text"&&(c.type="paragraph")}return s}}html(t){let e=this.rules.block.html.exec(t);if(e)return{type:"html",block:!0,raw:e[0],pre:e[1]==="pre"||e[1]==="script"||e[1]==="style",text:e[0]}}def(t){let e=this.rules.block.def.exec(t);if(e){let r=e[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),n=e[2]?e[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=e[3]?e[3].substring(1,e[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):e[3];return{type:"def",tag:r,raw:e[0],href:n,title:s}}}table(t){let e=this.rules.block.table.exec(t);if(!e||!this.rules.other.tableDelimiter.test(e[2]))return;let r=Io(e[1]),n=e[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=e[3]?.trim()?e[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:e[0],header:[],align:[],rows:[]};if(r.length===n.length){for(let i of n)this.rules.other.tableAlignRight.test(i)?o.align.push("right"):this.rules.other.tableAlignCenter.test(i)?o.align.push("center"):this.rules.other.tableAlignLeft.test(i)?o.align.push("left"):o.align.push(null);for(let i=0;i<r.length;i++)o.header.push({text:r[i],tokens:this.lexer.inline(r[i]),header:!0,align:o.align[i]});for(let i of s)o.rows.push(Io(i,o.header.length).map((l,a)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:o.align[a]})));return o}}lheading(t){let e=this.rules.block.lheading.exec(t);if(e)return{type:"heading",raw:e[0],depth:e[2].charAt(0)==="="?1:2,text:e[1],tokens:this.lexer.inline(e[1])}}paragraph(t){let e=this.rules.block.paragraph.exec(t);if(e){let r=e[1].charAt(e[1].length-1)===`
`?e[1].slice(0,-1):e[1];return{type:"paragraph",raw:e[0],text:r,tokens:this.lexer.inline(r)}}}text(t){let e=this.rules.block.text.exec(t);if(e)return{type:"text",raw:e[0],text:e[0],tokens:this.lexer.inline(e[0])}}escape(t){let e=this.rules.inline.escape.exec(t);if(e)return{type:"escape",raw:e[0],text:e[1]}}tag(t){let e=this.rules.inline.tag.exec(t);if(e)return!this.lexer.state.inLink&&this.rules.other.startATag.test(e[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(e[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(e[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(e[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:e[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:e[0]}}link(t){let e=this.rules.inline.link.exec(t);if(e){let r=e[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;let o=xr(r.slice(0,-1),"\\");if((r.length-o.length)%2===0)return}else{let o=Bl(e[2],"()");if(o===-2)return;if(o>-1){let i=(e[0].indexOf("!")===0?5:4)+e[1].length+o;e[2]=e[2].substring(0,o),e[0]=e[0].substring(0,i).trim(),e[3]=""}}let n=e[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(n);o&&(n=o[1],s=o[3])}else s=e[3]?e[3].slice(1,-1):"";return n=n.trim(),this.rules.other.startAngleBracket.test(n)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?n=n.slice(1):n=n.slice(1,-1)),Do(e,{href:n&&n.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},e[0],this.lexer,this.rules)}}reflink(t,e){let r;if((r=this.rules.inline.reflink.exec(t))||(r=this.rules.inline.nolink.exec(t))){let n=(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=e[n.toLowerCase()];if(!s){let o=r[0].charAt(0);return{type:"text",raw:o,text:o}}return Do(r,s,r[0],this.lexer,this.rules)}}emStrong(t,e,r=""){let n=this.rules.inline.emStrongLDelim.exec(t);if(!(!n||n[3]&&r.match(this.rules.other.unicodeAlphaNumeric))&&(!(n[1]||n[2])||!r||this.rules.inline.punctuation.exec(r))){let s=[...n[0]].length-1,o,i,l=s,a=0,c=n[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(c.lastIndex=0,e=e.slice(-1*t.length+s);(n=c.exec(e))!=null;){if(o=n[1]||n[2]||n[3]||n[4]||n[5]||n[6],!o)continue;if(i=[...o].length,n[3]||n[4]){l+=i;continue}else if((n[5]||n[6])&&s%3&&!((s+i)%3)){a+=i;continue}if(l-=i,l>0)continue;i=Math.min(i,i+l+a);let _=[...n[0]][0].length,f=t.slice(0,s+n.index+_+i);if(Math.min(s,i)%2){let $=f.slice(1,-1);return{type:"em",raw:f,text:$,tokens:this.lexer.inlineTokens($)}}let w=f.slice(2,-2);return{type:"strong",raw:f,text:w,tokens:this.lexer.inlineTokens(w)}}}}codespan(t){let e=this.rules.inline.code.exec(t);if(e){let r=e[2].replace(this.rules.other.newLineCharGlobal," "),n=this.rules.other.nonSpaceChar.test(r),s=this.rules.other.startingSpaceChar.test(r)&&this.rules.other.endingSpaceChar.test(r);return n&&s&&(r=r.substring(1,r.length-1)),{type:"codespan",raw:e[0],text:r}}}br(t){let e=this.rules.inline.br.exec(t);if(e)return{type:"br",raw:e[0]}}del(t){let e=this.rules.inline.del.exec(t);if(e)return{type:"del",raw:e[0],text:e[2],tokens:this.lexer.inlineTokens(e[2])}}autolink(t){let e=this.rules.inline.autolink.exec(t);if(e){let r,n;return e[2]==="@"?(r=e[1],n="mailto:"+r):(r=e[1],n=r),{type:"link",raw:e[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}url(t){let e;if(e=this.rules.inline.url.exec(t)){let r,n;if(e[2]==="@")r=e[0],n="mailto:"+r;else{let s;do s=e[0],e[0]=this.rules.inline._backpedal.exec(e[0])?.[0]??"";while(s!==e[0]);r=e[0],e[1]==="www."?n="http://"+e[0]:n=e[0]}return{type:"link",raw:e[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(t){let e=this.rules.inline.text.exec(t);if(e){let r=this.lexer.state.inRawBlock;return{type:"text",raw:e[0],text:e[0],escaped:r}}}},bt=class zn{constructor(e){$e(this,"tokens");$e(this,"options");$e(this,"state");$e(this,"inlineQueue");$e(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=e||Ut,this.options.tokenizer=this.options.tokenizer||new en,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let r={other:at,block:Xr.normal,inline:$r.normal};this.options.pedantic?(r.block=Xr.pedantic,r.inline=$r.pedantic):this.options.gfm&&(r.block=Xr.gfm,this.options.breaks?r.inline=$r.breaks:r.inline=$r.gfm),this.tokenizer.rules=r}static get rules(){return{block:Xr,inline:$r}}static lex(e,r){return new zn(r).lex(e)}static lexInline(e,r){return new zn(r).inlineTokens(e)}lex(e){e=e.replace(at.carriageReturn,`
`),this.blockTokens(e,this.tokens);for(let r=0;r<this.inlineQueue.length;r++){let n=this.inlineQueue[r];this.inlineTokens(n.src,n.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(e,r=[],n=!1){for(this.options.pedantic&&(e=e.replace(at.tabCharGlobal,"    ").replace(at.spaceLine,""));e;){let s;if(this.options.extensions?.block?.some(i=>(s=i.call({lexer:this},e,r))?(e=e.substring(s.raw.length),r.push(s),!0):!1))continue;if(s=this.tokenizer.space(e)){e=e.substring(s.raw.length);let i=r.at(-1);s.raw.length===1&&i!==void 0?i.raw+=`
`:r.push(s);continue}if(s=this.tokenizer.code(e)){e=e.substring(s.raw.length);let i=r.at(-1);i?.type==="paragraph"||i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+s.raw,i.text+=`
`+s.text,this.inlineQueue.at(-1).src=i.text):r.push(s);continue}if(s=this.tokenizer.fences(e)){e=e.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.heading(e)){e=e.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.hr(e)){e=e.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.blockquote(e)){e=e.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.list(e)){e=e.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.html(e)){e=e.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.def(e)){e=e.substring(s.raw.length);let i=r.at(-1);i?.type==="paragraph"||i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+s.raw,i.text+=`
`+s.raw,this.inlineQueue.at(-1).src=i.text):this.tokens.links[s.tag]||(this.tokens.links[s.tag]={href:s.href,title:s.title},r.push(s));continue}if(s=this.tokenizer.table(e)){e=e.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.lheading(e)){e=e.substring(s.raw.length),r.push(s);continue}let o=e;if(this.options.extensions?.startBlock){let i=1/0,l=e.slice(1),a;this.options.extensions.startBlock.forEach(c=>{a=c.call({lexer:this},l),typeof a=="number"&&a>=0&&(i=Math.min(i,a))}),i<1/0&&i>=0&&(o=e.substring(0,i+1))}if(this.state.top&&(s=this.tokenizer.paragraph(o))){let i=r.at(-1);n&&i?.type==="paragraph"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+s.raw,i.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):r.push(s),n=o.length!==e.length,e=e.substring(s.raw.length);continue}if(s=this.tokenizer.text(e)){e=e.substring(s.raw.length);let i=r.at(-1);i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+s.raw,i.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):r.push(s);continue}if(e){let i="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(i);break}else throw new Error(i)}}return this.state.top=!0,r}inline(e,r=[]){return this.inlineQueue.push({src:e,tokens:r}),r}inlineTokens(e,r=[]){let n=e,s=null;if(this.tokens.links){let a=Object.keys(this.tokens.links);if(a.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(n))!=null;)a.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(n=n.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(n))!=null;)n=n.slice(0,s.index)+"++"+n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(n))!=null;)o=s[2]?s[2].length:0,n=n.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let i=!1,l="";for(;e;){i||(l=""),i=!1;let a;if(this.options.extensions?.inline?.some(_=>(a=_.call({lexer:this},e,r))?(e=e.substring(a.raw.length),r.push(a),!0):!1))continue;if(a=this.tokenizer.escape(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.tag(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.link(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(a.raw.length);let _=r.at(-1);a.type==="text"&&_?.type==="text"?(_.raw+=a.raw,_.text+=a.text):r.push(a);continue}if(a=this.tokenizer.emStrong(e,n,l)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.codespan(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.br(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.del(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.autolink(e)){e=e.substring(a.raw.length),r.push(a);continue}if(!this.state.inLink&&(a=this.tokenizer.url(e))){e=e.substring(a.raw.length),r.push(a);continue}let c=e;if(this.options.extensions?.startInline){let _=1/0,f=e.slice(1),w;this.options.extensions.startInline.forEach($=>{w=$.call({lexer:this},f),typeof w=="number"&&w>=0&&(_=Math.min(_,w))}),_<1/0&&_>=0&&(c=e.substring(0,_+1))}if(a=this.tokenizer.inlineText(c)){e=e.substring(a.raw.length),a.raw.slice(-1)!=="_"&&(l=a.raw.slice(-1)),i=!0;let _=r.at(-1);_?.type==="text"?(_.raw+=a.raw,_.text+=a.text):r.push(a);continue}if(e){let _="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(_);break}else throw new Error(_)}}return r}},tn=class{constructor(t){$e(this,"options");$e(this,"parser");this.options=t||Ut}space(t){return""}code({text:t,lang:e,escaped:r}){let n=(e||"").match(at.notSpaceStart)?.[0],s=t.replace(at.endingNewline,"")+`
`;return n?'<pre><code class="language-'+$t(n)+'">'+(r?s:$t(s,!0))+`</code></pre>
`:"<pre><code>"+(r?s:$t(s,!0))+`</code></pre>
`}blockquote({tokens:t}){return`<blockquote>
${this.parser.parse(t)}</blockquote>
`}html({text:t}){return t}def(t){return""}heading({tokens:t,depth:e}){return`<h${e}>${this.parser.parseInline(t)}</h${e}>
`}hr(t){return`<hr>
`}list(t){let e=t.ordered,r=t.start,n="";for(let i=0;i<t.items.length;i++){let l=t.items[i];n+=this.listitem(l)}let s=e?"ol":"ul",o=e&&r!==1?' start="'+r+'"':"";return"<"+s+o+`>
`+n+"</"+s+`>
`}listitem(t){return`<li>${this.parser.parse(t.tokens)}</li>
`}checkbox({checked:t}){return"<input "+(t?'checked="" ':"")+'disabled="" type="checkbox"> '}paragraph({tokens:t}){return`<p>${this.parser.parseInline(t)}</p>
`}table(t){let e="",r="";for(let s=0;s<t.header.length;s++)r+=this.tablecell(t.header[s]);e+=this.tablerow({text:r});let n="";for(let s=0;s<t.rows.length;s++){let o=t.rows[s];r="";for(let i=0;i<o.length;i++)r+=this.tablecell(o[i]);n+=this.tablerow({text:r})}return n&&(n=`<tbody>${n}</tbody>`),`<table>
<thead>
`+e+`</thead>
`+n+`</table>
`}tablerow({text:t}){return`<tr>
${t}</tr>
`}tablecell(t){let e=this.parser.parseInline(t.tokens),r=t.header?"th":"td";return(t.align?`<${r} align="${t.align}">`:`<${r}>`)+e+`</${r}>
`}strong({tokens:t}){return`<strong>${this.parser.parseInline(t)}</strong>`}em({tokens:t}){return`<em>${this.parser.parseInline(t)}</em>`}codespan({text:t}){return`<code>${$t(t,!0)}</code>`}br(t){return"<br>"}del({tokens:t}){return`<del>${this.parser.parseInline(t)}</del>`}link({href:t,title:e,tokens:r}){let n=this.parser.parseInline(r),s=Lo(t);if(s===null)return n;t=s;let o='<a href="'+t+'"';return e&&(o+=' title="'+$t(e)+'"'),o+=">"+n+"</a>",o}image({href:t,title:e,text:r,tokens:n}){n&&(r=this.parser.parseInline(n,this.parser.textRenderer));let s=Lo(t);if(s===null)return $t(r);t=s;let o=`<img src="${t}" alt="${r}"`;return e&&(o+=` title="${$t(e)}"`),o+=">",o}text(t){return"tokens"in t&&t.tokens?this.parser.parseInline(t.tokens):"escaped"in t&&t.escaped?t.text:$t(t.text)}},Qn=class{strong({text:t}){return t}em({text:t}){return t}codespan({text:t}){return t}del({text:t}){return t}html({text:t}){return t}text({text:t}){return t}link({text:t}){return""+t}image({text:t}){return""+t}br(){return""}checkbox({raw:t}){return t}},wt=class Hn{constructor(e){$e(this,"options");$e(this,"renderer");$e(this,"textRenderer");this.options=e||Ut,this.options.renderer=this.options.renderer||new tn,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Qn}static parse(e,r){return new Hn(r).parse(e)}static parseInline(e,r){return new Hn(r).parseInline(e)}parse(e){let r="";for(let n=0;n<e.length;n++){let s=e[n];if(this.options.extensions?.renderers?.[s.type]){let i=s,l=this.options.extensions.renderers[i.type].call({parser:this},i);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(i.type)){r+=l||"";continue}}let o=s;switch(o.type){case"space":{r+=this.renderer.space(o);break}case"hr":{r+=this.renderer.hr(o);break}case"heading":{r+=this.renderer.heading(o);break}case"code":{r+=this.renderer.code(o);break}case"table":{r+=this.renderer.table(o);break}case"blockquote":{r+=this.renderer.blockquote(o);break}case"list":{r+=this.renderer.list(o);break}case"checkbox":{r+=this.renderer.checkbox(o);break}case"html":{r+=this.renderer.html(o);break}case"def":{r+=this.renderer.def(o);break}case"paragraph":{r+=this.renderer.paragraph(o);break}case"text":{r+=this.renderer.text(o);break}default:{let i='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return r}parseInline(e,r=this.renderer){let n="";for(let s=0;s<e.length;s++){let o=e[s];if(this.options.extensions?.renderers?.[o.type]){let l=this.options.extensions.renderers[o.type].call({parser:this},o);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){n+=l||"";continue}}let i=o;switch(i.type){case"escape":{n+=r.text(i);break}case"html":{n+=r.html(i);break}case"link":{n+=r.link(i);break}case"image":{n+=r.image(i);break}case"checkbox":{n+=r.checkbox(i);break}case"strong":{n+=r.strong(i);break}case"em":{n+=r.em(i);break}case"codespan":{n+=r.codespan(i);break}case"br":{n+=r.br(i);break}case"del":{n+=r.del(i);break}case"text":{n+=r.text(i);break}default:{let l='Token with "'+i.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return n}},Qr,Sr=(Qr=class{constructor(t){$e(this,"options");$e(this,"block");this.options=t||Ut}preprocess(t){return t}postprocess(t){return t}processAllTokens(t){return t}emStrongMask(t){return t}provideLexer(){return this.block?bt.lex:bt.lexInline}provideParser(){return this.block?wt.parse:wt.parseInline}},$e(Qr,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),$e(Qr,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),Qr),zl=class{constructor(...t){$e(this,"defaults",Wn());$e(this,"options",this.setOptions);$e(this,"parse",this.parseMarkdown(!0));$e(this,"parseInline",this.parseMarkdown(!1));$e(this,"Parser",wt);$e(this,"Renderer",tn);$e(this,"TextRenderer",Qn);$e(this,"Lexer",bt);$e(this,"Tokenizer",en);$e(this,"Hooks",Sr);this.use(...t)}walkTokens(t,e){let r=[];for(let n of t)switch(r=r.concat(e.call(this,n)),n.type){case"table":{let s=n;for(let o of s.header)r=r.concat(this.walkTokens(o.tokens,e));for(let o of s.rows)for(let i of o)r=r.concat(this.walkTokens(i.tokens,e));break}case"list":{let s=n;r=r.concat(this.walkTokens(s.items,e));break}default:{let s=n;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let i=s[o].flat(1/0);r=r.concat(this.walkTokens(i,e))}):s.tokens&&(r=r.concat(this.walkTokens(s.tokens,e)))}}return r}use(...t){let e=this.defaults.extensions||{renderers:{},childTokens:{}};return t.forEach(r=>{let n={...r};if(n.async=this.defaults.async||n.async||!1,r.extensions&&(r.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=e.renderers[s.name];o?e.renderers[s.name]=function(...i){let l=s.renderer.apply(this,i);return l===!1&&(l=o.apply(this,i)),l}:e.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=e[s.level];o?o.unshift(s.tokenizer):e[s.level]=[s.tokenizer],s.start&&(s.level==="block"?e.startBlock?e.startBlock.push(s.start):e.startBlock=[s.start]:s.level==="inline"&&(e.startInline?e.startInline.push(s.start):e.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(e.childTokens[s.name]=s.childTokens)}),n.extensions=e),r.renderer){let s=this.defaults.renderer||new tn(this.defaults);for(let o in r.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let i=o,l=r.renderer[i],a=s[i];s[i]=(...c)=>{let _=l.apply(s,c);return _===!1&&(_=a.apply(s,c)),_||""}}n.renderer=s}if(r.tokenizer){let s=this.defaults.tokenizer||new en(this.defaults);for(let o in r.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let i=o,l=r.tokenizer[i],a=s[i];s[i]=(...c)=>{let _=l.apply(s,c);return _===!1&&(_=a.apply(s,c)),_}}n.tokenizer=s}if(r.hooks){let s=this.defaults.hooks||new Sr;for(let o in r.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let i=o,l=r.hooks[i],a=s[i];Sr.passThroughHooks.has(o)?s[i]=c=>{if(this.defaults.async&&Sr.passThroughHooksRespectAsync.has(o))return(async()=>{let f=await l.call(s,c);return a.call(s,f)})();let _=l.call(s,c);return a.call(s,_)}:s[i]=(...c)=>{if(this.defaults.async)return(async()=>{let f=await l.apply(s,c);return f===!1&&(f=await a.apply(s,c)),f})();let _=l.apply(s,c);return _===!1&&(_=a.apply(s,c)),_}}n.hooks=s}if(r.walkTokens){let s=this.defaults.walkTokens,o=r.walkTokens;n.walkTokens=function(i){let l=[];return l.push(o.call(this,i)),s&&(l=l.concat(s.call(this,i))),l}}this.defaults={...this.defaults,...n}}),this}setOptions(t){return this.defaults={...this.defaults,...t},this}lexer(t,e){return bt.lex(t,e??this.defaults)}parser(t,e){return wt.parse(t,e??this.defaults)}parseMarkdown(t){return(e,r)=>{let n={...r},s={...this.defaults,...n},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&n.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof e>"u"||e===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof e!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(e)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=t),s.async)return(async()=>{let i=s.hooks?await s.hooks.preprocess(e):e,l=await(s.hooks?await s.hooks.provideLexer():t?bt.lex:bt.lexInline)(i,s),a=s.hooks?await s.hooks.processAllTokens(l):l;s.walkTokens&&await Promise.all(this.walkTokens(a,s.walkTokens));let c=await(s.hooks?await s.hooks.provideParser():t?wt.parse:wt.parseInline)(a,s);return s.hooks?await s.hooks.postprocess(c):c})().catch(o);try{s.hooks&&(e=s.hooks.preprocess(e));let i=(s.hooks?s.hooks.provideLexer():t?bt.lex:bt.lexInline)(e,s);s.hooks&&(i=s.hooks.processAllTokens(i)),s.walkTokens&&this.walkTokens(i,s.walkTokens);let l=(s.hooks?s.hooks.provideParser():t?wt.parse:wt.parseInline)(i,s);return s.hooks&&(l=s.hooks.postprocess(l)),l}catch(i){return o(i)}}}onError(t,e){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,t){let n="<p>An error occurred:</p><pre>"+$t(r.message+"",!0)+"</pre>";return e?Promise.resolve(n):n}if(e)return Promise.reject(r);throw r}}},Bt=new zl;function me(t,e){return Bt.parse(t,e)}me.options=me.setOptions=function(t){return Bt.setOptions(t),me.defaults=Bt.defaults,Oo(me.defaults),me};me.getDefaults=Wn;me.defaults=Ut;me.use=function(...t){return Bt.use(...t),me.defaults=Bt.defaults,Oo(me.defaults),me};me.walkTokens=function(t,e){return Bt.walkTokens(t,e)};me.parseInline=Bt.parseInline;me.Parser=wt;me.parser=wt.parse;me.Renderer=tn;me.TextRenderer=Qn;me.Lexer=bt;me.lexer=bt.lex;me.Tokenizer=en;me.Hooks=Sr;me.parse=me;var iu=me.options,au=me.setOptions,lu=me.use,cu=me.walkTokens,du=me.parseInline;var uu=wt.parse,pu=bt.lex;function Go(t){let e=me.parse(t),r=xo.sanitize(e);return Ao(r)}function Hl(t){return String(t||"").replace(/^docs\/(superpowers\/)?/,"")}function jo(t,e){let r=e.getWorkspacePath,n=e.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",i="",l="";function a(v){v.key==="Escape"&&s&&(v.preventDefault(),w())}document.addEventListener("keydown",a);function c(){return s?d`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>w()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${Hl(s)}</span
            >
            <button
              type="button"
              class="mv__close"
              aria-label="닫기"
              @click=${()=>w()}
            >
              ✕
            </button>
          </div>
          <div class="mv__body">
            ${o==="loading"?d`<div class="mv__status">불러오는 중…</div>`:o==="error"?d`<div class="mv__status mv__status--error">
                    ${l||"\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}
                  </div>`:Go(i)}
          </div>
        </div>
      </div>
    `:d``}function _(){we(c(),t)}async function f(v){s=v,o="loading",i="",l="",_();let x=r?r():"";if(!x){o="error",l="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",_();return}if(!n){o="error",l="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",_();return}let M="/api/doc?workspace="+encodeURIComponent(x)+"&path="+encodeURIComponent(v);try{let F=await n(M),B=await F.json().catch(()=>({}));if(!F.ok||!B||B.ok!==!0){o="error",l="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(B&&B.error||F.status)+")",_();return}i=String(B.content||""),o="ready",_()}catch{o="error",l="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",_()}}function w(){s=null,we(d``,t)}function $(){document.removeEventListener("keydown",a),w()}return{open:f,close:w,destroy:$}}var Wl=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"},{key:"cache_creation_input_tokens",label:"\uCE90\uC2DC \uC0DD\uC131"}],Yo="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function Gl(t){return typeof t=="number"&&Number.isFinite(t)?t:0}function jl(t){let e=Tt(t);if(!e||!t)return"";let r=typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)?` \xB7 $${t.total_cost_usd.toFixed(2)}`:"";return d`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${e.replace(/^τ /,"\u03C4 \uCD1D ")}${r}</span
    >${t.replayed?d`<span class="detail-usage-partial" title=${Yo}
          >부분 집계</span
        >`:""}`}function Yl(t){let e=typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)?t.total_cost_usd:null;return d`<div class="detail-session__usage-detail">
    ${Wl.map(r=>d`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${r.label}</span
          ><span class="detail-session__usage-value"
            >${Gl(t[r.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${e===null?"":d`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${e.toFixed(2)}</span
          ></span
        >`}
    ${t.replayed?d`<span class="detail-session__usage-note">${Yo}</span>`:""}
  </div>`}var Vl={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function Kl(t){if(typeof t!="number"||!Number.isFinite(t))return"";let e=new Date(t),r=String(e.getHours()).padStart(2,"0"),n=String(e.getMinutes()).padStart(2,"0");return`${r}:${n}`}function Vo(t,e={},r={}){let n=Array.isArray(t)?t:[],s=r.expanded||new Set;if(n.length===0)return d`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let o=new Set;for(let c of n)c&&typeof c.resumed_from=="string"&&c.resumed_from.length>0&&o.add(c.resumed_from);let i=c=>{if(!(c.status==="failed"||c.status==="orphaned"))return"";let f=typeof c.session_id=="string"&&c.session_id.length>0,w=o.has(c.attempt_id),$=f&&!w,v=f?w?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return d`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${c.attempt_id}
      ?disabled=${!$}
      title=${v}
      @click=${x=>{x.stopPropagation(),$&&e.onResume&&e.onResume(c.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},l=c=>{if(!(c.status==="failed"||c.status==="orphaned")||typeof c.cause!="string"||c.cause==="")return"";let f=c.cause_detail,w=f&&typeof f.reason=="string"&&f.reason.length>0?typeof f.command=="string"&&f.command.length>0?`${f.reason} \xB7 ${f.command}`:f.reason:c.cause;return d`<div class="detail-session__cause" title=${w}>
      ${c.cause}
    </div>`},a=c=>{if(!Tt(c.usage))return"";let _=s.has(c.attempt_id);return d`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${c.attempt_id}
      aria-expanded=${_?"true":"false"}
      title=${_?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${f=>{f.stopPropagation(),e.onToggleUsage&&e.onToggleUsage(c.attempt_id)}}
    >
      τ 자세히
    </button>`};return d`
    <div class="detail-section-label">
      세션 이력${jl(r.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${n.map(c=>d`<div class="detail-session-row">
            <button
              type="button"
              class="detail-session detail-session--${c.status||"unknown"}"
              data-attempt-id=${c.attempt_id}
              @click=${()=>e.onOpen&&e.onOpen(c.attempt_id)}
            >
              <span class="detail-session__glyph"
                >${Vl[c.status||""]||"\xB7"}</span
              >
              <span class="detail-session__id">${c.attempt_id}</span>
              ${c.resumed_from?d`<span
                    class="detail-session__resumed"
                    title=${`\uC774\uC5B4\uBC1B\uC740 \uC138\uC158 (from ${c.resumed_from})`}
                    >↻</span
                  >`:""}
              <span class="detail-session__meta"
                >${[c.runner,c.model].filter(Boolean).join(" \xB7 ")}</span
              >
              ${c.session_id?d`<span class="detail-session__sid" title=${c.session_id}
                    >${String(c.session_id).slice(0,8)}</span
                  >`:""}
              ${Tt(c.usage)?d`<span class="detail-session__usage"
                    >${Tt(c.usage)}</span
                  >`:""}
              <span class="detail-session__time"
                >${Kl(c.started_at)}</span
              >
            </button>
            ${a(c)} ${i(c)} ${l(c)}
            ${s.has(c.attempt_id)&&c.usage?Yl(c.usage):""}
          </div>`)}
    </div>
  `}var Zl=["open","in_progress","deferred","resolved","closed"],Xl=[0,1,2,3,4];function Ko(t,e){let r=e.issueStores,n=e.onClose,s=e.transport,o=e.onNavigate,i=e.queueStore,l=e.sessionLogStore,a=null,c=null,_={},f=!1,w=!1,$="",v="",x="";function M(){f=!1,w=!1,$="",v="",x=""}let F=document.createElement("div");F.className="md-viewer-root",document.body.appendChild(F);let B=jo(F,{getWorkspacePath:e.getWorkspacePath||(()=>"")}),W=document.createElement("div");W.className="session-log-root",document.body.appendChild(W);let O=Gr(W,{transport:s?(b,L)=>Promise.resolve(s(b,L)):void 0,sessionLogStore:l});function A(){if(!i||!a)return[];let b=i.get();return(b&&b.attempts?Object.values(b.attempts):[]).filter(S=>S&&S.bead_id===a).sort((S,Q)=>(Q.started_at||0)-(S.started_at||0)).map(S=>({attempt_id:S.attempt_id,bead_id:S.bead_id,status:S.status,started_at:typeof S.started_at=="number"?S.started_at:null,runner:S.runner||null,model:S.model||null,session_id:S.session_id||null,resumed_from:S.resumed_from||null,dismissed_at:typeof S.dismissed_at=="number"?S.dismissed_at:null,cause:typeof S.cause=="string"?S.cause:null,cause_detail:S.cause_detail||null,usage:S.usage||null}))}function T(){if(!i||!a)return null;let b=i.get();return rr(b&&b.attempts||{},a)}let R=new Set;function k(b){R.has(b)?R.delete(b):R.add(b),U()}function q(b){let L=i?i.get():null,S=L&&L.attempts?L.attempts[b]:null;O.open({attempt_id:b,meta:S?{runner:S.runner||void 0,model:S.model||void 0,effort:S.effort||void 0,status:S.status||void 0,session_id:S.session_id||void 0}:{}})}async function H(b){if(!s||!b)return;let L=()=>{let Q=i?i.get():null;return Q&&typeof Q.revision=="number"?Q.revision:0},S=await s("worker-attempt-resume",{attempt_id:b,expected_revision:L()});if(S&&S.conflict){let Q=S.queue&&typeof S.queue.revision=="number"?S.queue.revision:L();S=await s("worker-attempt-resume",{attempt_id:b,expected_revision:Q})}S&&S.resumed===!1&&!S.conflict&&S.reason&&te(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${S.reason}`,"error",2400)}let V={onOpen:q,onResume:H,onToggleUsage:k};function Z(){let b=i?i.get():null,L=b&&b.exec_defaults;return L&&typeof L=="object"?L:{}}let ke=null;r&&r.subscribe&&(ke=r.subscribe(()=>ue()));let Te=null;i&&typeof i.subscribe=="function"&&(Te=i.subscribe(()=>{a&&U()}));function xe(b){b.key==="Escape"&&a&&(b.preventDefault(),n())}document.addEventListener("keydown",xe);function ue(){if(a){if(r&&typeof r.snapshotFor=="function"){let b=r.snapshotFor("detail:"+a)||[];c=b.find(S=>S&&S.id===a)||b[0]||c}U()}}function D(b){Ft(b).then(L=>{L?te("\uBCF5\uC0AC\uB428","success",1200):te("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function P(b){b.preventDefault(),b.stopPropagation(),a&&D(a)}function se(b,L){b.preventDefault(),b.stopPropagation(),D(L)}function Ae(b,L){b.preventDefault(),b.stopPropagation(),B.open(L)}function ae(b,L){_[b]=L,U(),!(!s||!a)&&Promise.resolve(s("update-exec-settings",{id:a,key:b,value:L})).catch(()=>{te("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}async function Ee(b,L,S){if(!s||!a)return!1;try{let Q=await Promise.resolve(s(b,L)),u=Array.isArray(Q)?Q[0]:Q;return u&&typeof u=="object"&&u.id?(c=u,!0):(te(S,"error"),!1)}catch{return te(S,"error"),!1}}function le(b){setTimeout(()=>{try{let L=t.querySelector(b);L&&typeof L.focus=="function"&&L.focus()}catch{}},0)}function Be(){f=!0,$=c&&c.title||"",U(),le('.detail-edit__input[data-edit="title"]')}function ge(b){$=b.target.value}function Pe(){f=!1,$="",U()}function ut(){Ee("edit-text",{id:a,field:"title",value:$},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(L=>{L&&(f=!1,$=""),U()})}function Ue(){w=!0,v=c&&c.description||"",U(),le('.detail-edit__textarea[data-edit="description"]')}function Ve(b){v=b.target.value}function Le(){w=!1,v="",U()}function Ke(){Ee("edit-text",{id:a,field:"description",value:v},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(L=>{L&&(w=!1,v=""),U()})}function Je(b,L,S,Q){if(b.key==="Escape"){b.stopPropagation(),S();return}b.key==="Enter"&&(!Q||b.ctrlKey||b.metaKey)&&(b.preventDefault(),L())}function Ze(b){let L=b.target.value;Ee("update-status",{id:a,status:L},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>U())}function et(b){let L=Number(b.target.value);Ee("update-priority",{id:a,priority:L},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>U())}function ze(b){x=b.target.value}function tt(){let b=x.trim();b.length!==0&&Ee("label-add",{id:a,label:b},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(L=>{L&&(x=""),U()})}function Oe(b){if(b.key==="Escape"){b.stopPropagation(),x="",U();return}b.key==="Enter"&&(b.preventDefault(),tt())}function He(b){Ee("label-remove",{id:a,label:b},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>U())}let lt={onCopyPath:se,onOpenDoc:Ae},We={onChange:ae};function dt(b){return typeof b=="string"?b:b&&typeof b=="object"?String(b.id||b.to||b.issue_id||b.depends_on||""):""}function _t(b){switch(b&&typeof b=="object"?String(b.dependency_type||b.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function Ce(b){let S=(Array.isArray(b.dependencies)?b.dependencies:[]).map(Q=>({id:dt(Q),icon:_t(Q)})).filter(Q=>Q.id.length>0);return d`
      <div class="detail-section-label">의존성</div>
      ${S.length===0?d`<div class="detail-empty">의존성 없음</div>`:d`<div class="detail-deps">
            ${S.map(Q=>o?d`<button
                    type="button"
                    class="detail-dep detail-dep--link"
                    @click=${()=>o(Q.id)}
                  >
                    ${Q.icon?`${Q.icon} `:""}${Q.id}
                  </button>`:d`<span class="detail-dep"
                    >${Q.icon?`${Q.icon} `:""}${Q.id}</span
                  >`)}
          </div>`}
    `}function fe(b){let L=b.metadata||{},S=b.workflow||{},Q=S.stages||{},u=Q.spec&&Q.spec.stale,m=Q.impl&&Q.impl.stale,C=S.route_source==="derived",J=S.route||L.route||"\u2014";return d`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${C?" detail-kv__v--derived":""}"
          title=${C?"route \uCD94\uB860\uAC12 (metadata \uBBF8\uD540)":"route"}
          >${C&&S.route?`${J} ? (\uCD94\uB860)`:J}</span
        >
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">spec_review</span>
        <span class="detail-kv__v"
          >${L.spec_review||"\uC5C6\uC74C"}${u?" \xB7 stale":""}</span
        >
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">impl_review</span>
        <span class="detail-kv__v"
          >${L.impl_review||"\uC5C6\uC74C"}${m?" \xB7 stale":""}</span
        >
      </div>
      ${L.pr_url?d`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${L.pr_url}</span>
          </div>`:""}
    `}let Ge={route:["spec_backed","full_plan"]};async function je(b,L){let S=L.target.value;if(b==="route"&&c&&c.metadata&&c.metadata.route==="full_plan"&&S!=="full_plan"&&!window.confirm(`full_plan \u2192 ${S||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){U();return}await Ee("update-workflow-meta",{id:a,key:b,value:S},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),U()}function E(b){let L=b.metadata||{};return d` ${((Q,u)=>{let m=Ge[Q],C=typeof L[Q]=="string"?L[Q]:"";return d`<div class="detail-kv">
        <span class="detail-kv__k">${Q}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${Q}
          data-edit=${`wfmeta-${Q}`}
          @change=${J=>je(Q,J)}
        >
          <option value="" ?selected=${!m.includes(C)}>
            ${u}
          </option>
          ${m.map(J=>d`<option value=${J} ?selected=${C===J}>${J}</option>`)}
        </select>
      </div>`})("route","(\uBBF8\uC124\uC815 \xB7 \uCD94\uB860)")} `}function N(b){return f?d`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${$}
            @input=${ge}
            @keydown=${L=>Je(L,ut,Pe,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${ut}
            >
              저장
            </button>
            <button
              type="button"
              class="detail-edit__cancel"
              data-edit="title-cancel"
              @click=${Pe}
            >
              취소
            </button>
          </div>
        </div>
      `:d`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${b}</h2>
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${Be}
        >
          ✎
        </button>
      </div>
    `}function re(b){let L=ft(b.created_at),S=ft(b.updated_at);return!L&&!S?d``:d`
      ${L?d`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${L}</span>
          </div>`:""}
      ${S?d`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${S}</span>
          </div>`:""}
    `}function ee(b,L){return d`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${Ze}
        >
          ${Zl.map(S=>d`<option value=${S} ?selected=${S===b}>${S}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${et}
        >
          ${Xl.map(S=>d`<option value=${String(S)} ?selected=${S===L}>
                P${S}
              </option>`)}
        </select>
      </div>
    `}function X(b){return d`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${w?"":d`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${Ue}
            >
              ✎
            </button>`}
      </div>
      ${w?d`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${v}
              @input=${Ve}
              @keydown=${L=>Je(L,Ke,Le,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${Ke}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${Le}
              >
                취소
              </button>
            </div>
          </div>`:d`<div class="detail-overlay__desc">
            ${b||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function ce(b){let L=typeof b.notes=="string"?b.notes:"";return L.trim().length===0?d``:d`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${L}</div>
    `}function he(b){let L=Array.isArray(b.labels)?b.labels:[];return d`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${L.map(S=>d`<span class="detail-label-chip"
              >${S}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${S}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+S}
                @click=${()=>He(S)}
              >
                ×
              </button></span
            >`)}
        <span class="detail-label-add">
          <input
            class="detail-label-add__input"
            aria-label="라벨 추가"
            placeholder="라벨 추가"
            .value=${x}
            @input=${ze}
            @keydown=${Oe}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${tt}
          >
            추가
          </button>
        </span>
      </div>
    `}function be(){if(!a)return d``;let b=c||{},L=String(b.id||a),S=b.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",Q=b.status||"open",u=typeof b.priority=="number"?Math.max(0,Math.min(4,b.priority)):"",m=b.description||"",C={...b,metadata:{...b.metadata||{},..._}};return d`
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
            @click=${P}
          >
            ${L}
          </button>
          ${N(S)} ${ee(Q,u)}
          ${re(b)} ${X(m)}
          ${ce(b)} ${he(b)} ${Ce(b)}
          ${fe(b)} ${E(b)}
          ${co(b,lt)}
          ${uo(C,We,Z())}
          ${Vo(A(),V,{total:T(),expanded:R})}
        </div>
      </div>
    `}function U(){we(be(),t)}return{load(b){b!==a&&(_={},M()),a=b,c=null,ue()},clear(){a=null,c=null,_={},M(),B.close(),O.close(),we(d``,t)},destroy(){ke&&(ke(),ke=null),Te&&(Te(),Te=null),document.removeEventListener("keydown",xe),B.destroy(),F.parentNode&&F.parentNode.removeChild(F),O.destroy(),W.parentNode&&W.parentNode.removeChild(W),a=null,c=null,we(d``,t)}}}var Ql=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function Zo(t,e){return $n(t,e)?"shown":e.hidden_labels.includes(t)?"hidden_exact":"hidden_prefix"}function Jl(t,e,r){if(!r)return{hidden_labels:e.hidden_labels.includes(t)?e.hidden_labels:[...e.hidden_labels,t],visible_labels:e.visible_labels.filter(o=>o!==t)};let n=e.hidden_labels.filter(o=>o!==t);return e.hidden_prefixes.some(o=>o.length>0&&t.startsWith(o))?{hidden_labels:n,visible_labels:e.visible_labels.includes(t)?e.visible_labels:[...e.visible_labels,t]}:{hidden_labels:n}}function Xo(t,e){let{policyStore:r,transport:n,labelOptions:s}=e,o=document.createElement("dialog");o.id="display-settings-dialog",o.className="display-settings",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),t.appendChild(o);let i="";async function l(T){let R=r.get();if(R)try{let k=await n("display-policy-set",{expected_revision:R.revision,policy:T(R)});a(k),k&&k.conflict&&k.policy&&(k=await n("display-policy-set",{expected_revision:k.policy.revision,policy:T(k.policy)}),a(k)),k&&k.conflict&&te("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC","error",4e3)}catch{te("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function a(T){T&&T.policy&&typeof T.policy=="object"&&r.set(T.policy)}function c(T){let R=r.get();if(!R)return;let k=Zo(T,R)!=="shown";l(q=>Jl(T,q,k))}function _(){let T=i.trim();T.length!==0&&(i="",l(R=>R.hidden_prefixes.includes(T)?{hidden_prefixes:R.hidden_prefixes}:{hidden_prefixes:[...R.hidden_prefixes,T]}),M())}function f(T){l(R=>({hidden_prefixes:R.hidden_prefixes.filter(k=>k!==T)}))}function w(T){let R=r.get();if(!R)return;let k=R.chips[T]===!1;l(()=>({chips:{[T]:k}}))}function $(T){let R=s();return d`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">라벨 표시</h3>
        <p class="display-settings__hint">
          라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을
          누르면 그 라벨만 예외로 다시 표시됩니다.
        </p>
        ${R.length===0?d`<div class="display-settings__empty">라벨 없음</div>`:d`<div class="display-settings__pills">
              ${R.map(k=>{let q=Zo(k,T);return d`<button
                  type="button"
                  class=${`display-settings__pill display-settings__pill--${q}`}
                  data-label=${k}
                  data-state=${q}
                  @click=${()=>c(k)}
                >
                  ${k}
                </button>`})}
            </div>`}
      </section>
    `}function v(T){return d`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">숨김 prefix</h3>
        <div class="display-settings__prefixes">
          ${T.hidden_prefixes.map(R=>d`<span class="display-settings__prefix">
                ${R}
                <button
                  type="button"
                  class="display-settings__prefix-remove"
                  aria-label=${`${R} \uADDC\uCE59 \uC81C\uAC70`}
                  @click=${()=>f(R)}
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
          <button type="button" @click=${_}>추가</button>
        </div>
      </section>
    `}function x(T){return d`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">카드 표시 요소</h3>
        <div class="display-settings__toggles">
          ${Ql.map(([R,k])=>d`<label class="display-settings__toggle">
                <input
                  type="checkbox"
                  data-chip=${R}
                  .checked=${T.chips[R]!==!1}
                  @change=${()=>w(R)}
                />
                <span>${k}</span>
              </label>`)}
        </div>
      </section>
    `}function M(){let T=r.get();we(d`
        <div class="display-settings__container">
          <header class="display-settings__header">
            <div class="display-settings__title">표시 설정</div>
            <button
              type="button"
              class="display-settings__close"
              aria-label="닫기"
              @click=${A}
            >
              ×
            </button>
          </header>
          <div class="display-settings__body">
            ${T?d`${$(T)} ${v(T)}
                ${x(T)}`:d`<div class="display-settings__empty">
                  표시 정책을 불러오는 중…
                </div>`}
          </div>
        </div>
      `,o)}let F=!1,B=()=>{F=!1};o.addEventListener("close",B),o.addEventListener("cancel",B);let W=null;r.subscribe&&(W=r.subscribe(()=>{F&&M()}));function O(){F||(i="",F=!0,M(),typeof o.showModal=="function"?o.showModal():o.setAttribute("open",""))}function A(){F&&(F=!1,typeof o.close=="function"?o.close():o.removeAttribute("open"))}return{open:O,close:A,destroy(){F=!1,o.removeEventListener("close",B),o.removeEventListener("cancel",B),W&&(W(),W=null),o.remove()}}}function Qo(t){let e=document.createElement("dialog");e.id="fatal-error-dialog",e.setAttribute("role","alertdialog"),e.setAttribute("aria-modal","true"),e.innerHTML=`
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
    </div>`,t.appendChild(e);let r=e.querySelector("#fatal-error-title"),n=e.querySelector("#fatal-error-message"),s=e.querySelector("#fatal-error-detail"),o=e.querySelector("#fatal-error-reload"),i=e.querySelector("#fatal-error-close"),l=()=>{if(typeof e.close=="function")try{e.close()}catch{}e.removeAttribute("open")},a=(c,_,f="")=>{r&&(r.textContent=c||"Unexpected Error"),n&&(n.textContent=_||"An unrecoverable error occurred.");let w=typeof f=="string"?f.trim():"";if(s&&(w.length>0?(s.textContent=w,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof e.showModal=="function")try{e.showModal(),e.setAttribute("open","")}catch{e.setAttribute("open","")}else e.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),i&&i.addEventListener("click",()=>l()),e.addEventListener("cancel",c=>{c.preventDefault(),l()}),{open:a,close:l,getElement(){return e}}}function Jo(t,e,r){let n=De("views:nav"),s=null;function o(a){return c=>{c.preventDefault(),n("click tab %s",a),r.gotoView(a)}}function i(){let c=e.getState().view==="worker"?"worker":"board";return d`
      <div class="ctl-tabs" aria-label="Primary">
        <a
          href="#/board"
          class="ctl-tab ${c==="board"?"is-active":""}"
          @click=${o("board")}
          >Board</a
        >
        <a
          href="#/worker"
          class="ctl-tab ${c==="worker"?"is-active":""}"
          @click=${o("worker")}
          >Worker</a
        >
      </div>
    `}function l(){we(i(),t)}return l(),s=e.subscribe(()=>l()),{destroy(){s&&(s(),s=null),we(d``,t)}}}var ei=["bug","feature","task","epic","chore"];function ti(t){switch((t||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var ri=["Critical","High","Medium","Low","Backlog"];function ni(t,e){let r=document.createElement("dialog");r.id="new-issue-dialog",r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true"),r.innerHTML=`
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
  `,t.appendChild(r);let n=r.querySelector("#new-issue-form"),s=r.querySelector("#new-title"),o=r.querySelector("#new-type"),i=r.querySelector("#new-priority"),l=r.querySelector("#new-labels"),a=r.querySelector("#new-description"),c=r.querySelector("#new-issue-error"),_=r.querySelector("#btn-cancel"),f=r.querySelector("#btn-create"),w=r.querySelector(".new-issue__close");function $(){o.replaceChildren();let A=document.createElement("option");A.value="",A.textContent="\u2014 Select \u2014",o.appendChild(A);for(let T of ei){let R=document.createElement("option");R.value=T,R.textContent=ti(T),o.appendChild(R)}i.replaceChildren();for(let T=0;T<=4;T+=1){let R=document.createElement("option");R.value=String(T);let k=ri[T]||"Medium";R.textContent=`${T} \u2013 ${k}`,i.appendChild(R)}}$();function v(){try{typeof r.close=="function"?r.close():r.removeAttribute("open")}catch{r.removeAttribute("open")}}function x(A){s.disabled=A,o.disabled=A,i.disabled=A,l.disabled=A,a.disabled=A,_.disabled=A,f.disabled=A,f.textContent=A?"Creating\u2026":"Create"}function M(){c.textContent=""}function F(A){c.textContent=A}function B(){try{let A=window.localStorage.getItem("beads-ui.new.type");A?o.value=A:o.value="";let T=window.localStorage.getItem("beads-ui.new.priority");T&&/^\d$/.test(T)?i.value=T:i.value="2"}catch{o.value="",i.value="2"}}function W(){let A=o.value||"",T=i.value||"";A.length>0&&window.localStorage.setItem("beads-ui.new.type",A),T.length>0&&window.localStorage.setItem("beads-ui.new.priority",T)}async function O(){M();let A=String(s.value||"").trim();if(A.length===0){F("Title is required"),s.focus();return}let T=Number(i.value||"2");if(!(T>=0&&T<=4)){F("Priority must be 0..4"),i.focus();return}let R=String(o.value||""),k=String(a.value||""),q={title:A};R.length>0&&(q.type=R),String(T).length>0&&(q.priority=T),k.length>0&&(q.description=k),x(!0);try{await e("create-issue",q)}catch{x(!1),F("Failed to create issue");return}W(),x(!1),v()}return r.addEventListener("cancel",A=>{A.preventDefault(),v()}),w.addEventListener("click",()=>v()),_.addEventListener("click",()=>v()),r.addEventListener("keydown",A=>{A.key==="Enter"&&(A.ctrlKey||A.metaKey)&&(A.preventDefault(),O())}),n.addEventListener("submit",A=>{A.preventDefault(),O()}),{open(){n.reset(),M(),B();try{"showModal"in r&&typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")}catch{r.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){v()}}}function si(t){if(typeof t!="number"||!Number.isFinite(t)||t<=0)return"";if(t<6e4)return`${Math.round(t/1e3)}\uCD08`;let e=t/6e4;return`${Number.isInteger(e)?e:Math.round(e*10)/10}\uBD84`}function oi(t){return Array.isArray(t)?t.filter(e=>typeof e=="string").join(" "):""}var ec={deployed:{modifier:"ok",label:"\uC131\uACF5"},launched:{modifier:"launched",label:"\uBC1C\uC0AC\uB428 \xB7 \uACB0\uACFC \uBBF8\uAD00\uCE21"},failed:{modifier:"fail",label:"\uC2E4\uD328"}},ii=160;function tc(t){return t.length>ii?`${t.slice(0,ii)}\u2026`:t}var rc=[{key:"orchestration_model",values:()=>An},{key:"orchestration_effort",values:()=>En},{key:"review_model",values:()=>Cn},{key:"impl_model",values:()=>Rn}];function ai(t,e){let{queueStore:r,transport:n,getWorkspacePath:s}=e,o=document.createElement("dialog");o.id="worker-exec-defaults-dialog",o.className="exec-defaults",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),t.appendChild(o);function i(){return r&&r.get()||{revision:0,exec_defaults:{}}}function l(){let k=i();return typeof k.revision=="number"?k.revision:0}function a(){let k=i().exec_defaults;return k&&typeof k=="object"?k:{}}function c(k){k&&k.queue&&r&&r.set(k.queue)}async function _(k,q){if(!n)return;let H={key:k,value:q||null};try{let V=await n("worker-queue-set-exec-default",{...H,expected_revision:l()});c(V),V&&V.conflict&&(V=await n("worker-queue-set-exec-default",{...H,expected_revision:l()}),c(V)),V&&V.conflict&&te("\uC804\uC5ED \uC2E4\uD589 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC","error",4e3)}catch{te("\uC804\uC5ED \uC2E4\uD589 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function f(k,q,H){let V=!!H&&!q.includes(H);return d`<div class="exec-defaults__row">
      <span class="exec-defaults__k">${k}</span>
      <select
        class="exec-defaults__sel"
        aria-label=${`\uC804\uC5ED ${k}`}
        data-key=${k}
        @change=${Z=>{_(k,Z.target.value)}}
      >
        <option value="" ?selected=${!H}>
          ${Ln[k]||"(\uAE30\uBCF8)"}
        </option>
        ${V?d`<option value=${H} ?selected=${!0}>
              ${H} (비호환)
            </option>`:""}
        ${q.map(Z=>d`<option value=${Z} ?selected=${H===Z}>${Z}</option>`)}
      </select>
    </div>`}function w(){let k=i().workspace_info;return k&&typeof k=="object"?k:{}}function $(k,q){return d`<span
      class="exec-defaults__vd-badge exec-defaults__vd-badge--${k}"
      >${q}</span
    >`}function v(k){let q=k?oi(k.cmd):"",H=k?si(k.timeout_ms):"",V=s&&s()||"<workspace \uACBD\uB85C>";return d`<div class="exec-defaults__vd-group" data-vd="verify">
      <div class="exec-defaults__vd-label">머지 전 검증 (verify)</div>
      ${q?d`<div class="exec-defaults__vd-line">
            <span class="exec-defaults__vd-cmd">${q}</span>
            ${$("config","config")}
            ${H?d`<span class="exec-defaults__vd-meta"
                  >timeout ${H}</span
                >`:""}
          </div>`:d`<div class="exec-defaults__vd-line exec-defaults__vd-absent">
            검증 없음 —
            <span class="exec-defaults__vd-cmd"
              >[worker.verify."${V}"]</span
            >
            섹션으로 정의
          </div>`}
    </div>`}function x(k){let q=k?oi(k.cmd):"",H=k?si(k.timeout_ms):"",V=H?`timeout ${H} \xB7 verify \uD1B5\uACFC \uC2DC\uC5D0\uB9CC \uC2E4\uD589`:"verify \uD1B5\uACFC \uC2DC\uC5D0\uB9CC \uC2E4\uD589",Z=s&&s()||"<workspace \uACBD\uB85C>";return d`<div class="exec-defaults__vd-group" data-vd="deploy">
      <div class="exec-defaults__vd-label">머지 후 배포 (deploy)</div>
      ${q?d`<div class="exec-defaults__vd-line">
            <span class="exec-defaults__vd-cmd">${q}</span>
            ${$("config","config")}
            ${k.detached===!0?$("detached","detached"):""}
            <span class="exec-defaults__vd-meta">${V}</span>
          </div>`:d`<div class="exec-defaults__vd-line exec-defaults__vd-absent">
            배포 없음 —
            <span class="exec-defaults__vd-cmd"
              >[worker.deploy."${Z}"]</span
            >
            섹션으로 정의
          </div>`}
    </div>`}function M(k){if(!k||typeof k!="object")return"";let q=ec[String(k.outcome)];if(!q)return"";let H=k.outcome==="failed"&&k.reason?`${q.label} \xB7 ${k.reason}`:q.label,V=[ft(k.at),typeof k.bead_id=="string"?k.bead_id:"",typeof k.base_sha=="string"?k.base_sha.slice(0,7):""].filter(Te=>Te.length>0).join(" \xB7 "),Z=typeof k.detail=="string"&&k.detail.length>0?tc(k.detail):"",ke=typeof k.log_path=="string"&&k.log_path.length>0?k.log_path:"";return d`<div class="exec-defaults__vd-group" data-vd="last-deploy">
      <div class="exec-defaults__vd-label">마지막 배포</div>
      <div class="exec-defaults__vd-line">
        ${$(q.modifier,H)}
        ${V?d`<span class="exec-defaults__vd-meta">${V}</span>`:""}
      </div>
      ${Z?d`<div class="exec-defaults__vd-line" data-vd-part="detail">
            <code class="exec-defaults__vd-cmd">${Z}</code>
          </div>`:""}
      ${ke?d`<div class="exec-defaults__vd-line" data-vd-part="log-path">
            전체 로그:
            <code class="exec-defaults__vd-cmd">${ke}</code>
          </div>`:""}
    </div>`}function F(k){return d`<section class="exec-defaults__vd">
      <p class="exec-defaults__vd-title">
        검증·배포 설정
        <span class="exec-defaults__vd-ro"
          >읽기 전용 — config.toml에서 정의</span
        >
      </p>
      ${v(k.verify_cmd)} ${x(k.deploy_cmd)}
      ${M(k.last_deploy)}
    </section>`}function B(){let k=a();we(d`
        <div class="exec-defaults__container">
          <header class="exec-defaults__header">
            <div class="exec-defaults__title">전역 실행 설정</div>
            <button
              type="button"
              class="exec-defaults__close"
              aria-label="닫기"
              @click=${R}
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
            ${rc.map(q=>f(q.key,q.values(),k[q.key]||""))}
            ${F(w())}
          </div>
        </div>
      `,o)}let W=!1,O=()=>{W=!1};o.addEventListener("close",O),o.addEventListener("cancel",O);let A=null;r&&r.subscribe&&(A=r.subscribe(()=>{W&&B()}));function T(){W||(W=!0,B(),typeof o.showModal=="function"?o.showModal():o.setAttribute("open",""))}function R(){W&&(W=!1,typeof o.close=="function"?o.close():o.removeAttribute("open"))}return{open:T,close:R,destroy(){W=!1,o.removeEventListener("close",O),o.removeEventListener("cancel",O),A&&(A(),A=null),o.remove()}}}function nr(t){let e=yt(t.created_at),r=yt(t.updated_at);return!e&&!r?"":d`<div class="worker-mini__meta">
    ${e?d`<span title=${`\uC0DD\uC131 ${ft(t.created_at)}`}
          >생성 ${e}</span
        >`:""}${e&&r?d`<span>·</span>`:""}${r?d`<span title=${`\uC218\uC815 ${ft(t.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </div>`}function Jn(t){let e=t.draggable&&!t.done,r=Array.isArray(t.badges)?t.badges:[],n=Hr(t.usage),s=t.merge_step||null,o=t.lane==="pr_wait"||!!t.revise_action,i=t.lane==="done"&&!o,l=i?yt(t.done_at):"",a=e?d`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",c=d`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${t.id}</span
  >`,_=d`<span class="worker-mini__title">${t.title}</span>`,f=t.pr_url&&t.pr_number?d`<a
          class="worker-mini__pr"
          href=${t.pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="PR 열기"
          >#${t.pr_number} ↗</a
        >`:"",w=r.map(A=>A===t.live_badge?d`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${A}</span
        >`:d`<span
          class="worker-mini__badge${t.alert?" worker-mini__badge--alert":""}"
          >${A}</span
        >`),$=t.reason?d`<span class="worker-mini__reason">${t.reason}</span>`:"",v=n?d`<span class="worker-usage" title=${Wr(t.usage)}
        >${n}</span
      >`:"",x=s?d`<span class="merge-step"
        >${s.label}<span class="merge-step__n"
          >${s.index}/${s.total}</span
        ></span
      >`:"",M=t.merge_action?d`<button
        type="button"
        class="worker-mini__merge"
        data-bead-id=${t.id}
        ?disabled=${t.merge_enabled===!1}
        title=${t.merge_title||""}
      >
        ${t.merge_label||"\uBA38\uC9C0"}
      </button>`:"",F=t.cancel_action?d`<button
        type="button"
        class="worker-mini__merge-cancel"
        data-bead-id=${t.id}
        ?disabled=${t.cancel_enabled===!1}
        title=${t.cancel_title||""}
      >
        취소
      </button>`:"",B=t.discard_action?d`<button
        type="button"
        class="worker-mini__discard"
        data-bead-id=${t.id}
        ?disabled=${t.discard_enabled===!1}
        title=${t.discard_enabled===!1?t.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
      >
        폐기
      </button>`:"",W=t.revise_action?d`<button
          type="button"
          class="worker-mini__revise-fix"
          data-bead-id=${t.id}
          ?disabled=${t.revise_enabled===!1}
          title=${t.revise_title||"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4"}
        >
          finding 수용·수정
        </button>
        <button
          type="button"
          class="worker-mini__revise-approve"
          data-bead-id=${t.id}
          ?disabled=${t.revise_enabled===!1}
          title="델타를 사용자 권한으로 승인해 영수증을 갱신하고 파킹을 해제합니다 (세션 없음)"
        >
          승인하고 진행
        </button>`:"",O=!!(n||s||t.merge_action||t.cancel_action||t.discard_action||t.revise_action);return d`<div
    class="worker-mini${o?" worker-mini--card":""}${e?"":" worker-mini--static"}${t.done?" worker-mini--done":""}${s?" worker-mini--merging":""}${t.external?" worker-mini--external":""}"
    style=${s?`--progress: ${s.percent}%`:""}
    draggable=${e?"true":"false"}
    data-bead-id=${t.id}
    data-lane=${t.lane}
  >
    ${i?d`<div class="worker-mini__row1">${c}${_}</div>
          <div class="worker-mini__row2">
            ${v}${l?d`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${ft(t.done_at)}`}
                  >완료 ${l}</span
                >`:""}${w}${x}
            <span class="worker-mini__actions"
              >${M}${F}${B}</span
            >
            ${nr(t)}
          </div>`:o?d`<div class="worker-mini__head">
              ${a}${c}${f}${w}${$}
            </div>
            <div class="worker-mini__body">${_}</div>
            ${O?d`<div class="worker-mini__foot">
                  ${v}${x}
                  <span class="worker-mini__actions"
                    >${M}${F}${B}${W}</span
                  >
                </div>`:""}
            ${nr(t)}`:d`<div class="worker-mini__line">
              ${a}${c}${_}${f}${w}${$}${v}${x}${M}${F}${B}
            </div>
            ${nr(t)}`}
  </div>`}function nc(t){let e=t.draggable&&!t.done,r=t.workflow,n=r&&r.chips||{},s=n.route||r&&r.route,o=n.route_source==="derived"||!!(r&&r.route_source==="derived"),i=typeof t.reason=="string"&&t.reason.startsWith("\u26D4");return d`<div
    class="worker-card${e?"":" worker-card--static"}"
    draggable=${e?"true":"false"}
    data-bead-id=${t.id}
    data-lane=${t.lane}
  >
    <div class="worker-card__head">
      ${e?d`<span class="worker-card__grip" aria-hidden="true">⠿</span>`:""}
      <span class="worker-card__id" title="클릭하면 ID 복사">${t.id}</span>
      ${r&&s?d`<span
            class="ctl-chip ctl-chip--route${o?" is-derived":""}"
            title=${o?"route \uCD94\uB860\uAC12 (metadata \uBBF8\uD540)":"route"}
            >${o?`${s} ?`:s}</span
          >`:""}
    </div>
    <div class="worker-card__title">${t.title}</div>
    ${r?zr(r,t.status):""}
    <div
      class="worker-card__foot${t.reason?"":" worker-card__foot--actions-only"}"
    >
      ${t.reason?d`<span
            class="worker-card__reason${i?" worker-card__reason--danger":""}"
            >${t.reason}</span
          >`:""}
      <!-- 버튼식 큐 적재 (UI-58y2 §[대기로 ↴]): 드래그의 보완재이지 대체재가
           아니므로 자격 조건은 드래그와 완전히 같다 — spec 없는 후보만 막고,
           blocked-with-spec은 드래그와 마찬가지로 적재할 수 있다. 표시 조건
           (coarse pointer / 좁은 화면)은 CSS가 소유한다. -->
      <button
        type="button"
        class="worker-card__place"
        data-bead-id=${t.id}
        ?disabled=${!e}
        title=${e?"\uB300\uAE30 \uD050 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00":"spec\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}
      >
        대기로 ↴
      </button>
    </div>
    ${nr(t)}
  </div>`}function Et(t){let e=!!t.collapsible&&!!t.collapsed,r=d`<span
      class="worker-pane__dot worker-pane__dot--${t.lane}"
      aria-hidden="true"
    ></span>
    <span class="worker-pane__title">${t.title}</span>
    ${e&&t.preview?d`<span class="worker-pane__preview">${t.preview}</span>`:""}
    <span class="worker-pane__count">${t.items.length}</span>`;return d`<section
    class="worker-pane worker-pane--lane-${t.lane}${t.src?" worker-pane--src":""}${t.live?" worker-pane--live":""}${t.collapsible?" worker-pane--collapsible":""}${e?" worker-pane--collapsed":""}"
    id=${t.id}
    data-lane=${t.lane}
  >
    ${t.collapsible?d`<button
          type="button"
          class="worker-pane__hd worker-pane__hd--toggle"
          data-lane=${t.lane}
          aria-expanded=${e?"false":"true"}
        >
          ${r}
          <span class="worker-pane__caret" aria-hidden="true"
            >${e?"\u25B8":"\u25BE"}</span
          >
        </button>`:d`<header class="worker-pane__hd">
          ${r}${t.header_control?t.header_control:""}
        </header>`}
    ${e?"":d`${t.controls?t.controls:""}
          <div class="worker-pane__body">
            ${t.body?t.body:t.items.length===0?d`<div class="worker-pane__empty">
                    ${t.empty||""}
                  </div>`:t.items.map(n=>t.lane==="candidate"?nc(n):Jn(n))}
          </div>`}
  </section>`}var li=160;function es(t){return t.length>li?`${t.slice(0,li)}\u2026`:t}function sc(t){return!t||!t.reason?"":d`<div class="worker-banner__detail">
    가드:
    ${t.reason}${t.command?d` · <code>${es(t.command)}</code>`:""}
  </div>`}function oc(t){return t?d`<details class="worker-banner__tail">
    <summary>출력 tail</summary>
    <pre>${t}</pre>
  </details>`:""}function ic(t){return t?d`<div class="worker-banner__log-path">
    전체 로그: <code>${t}</code>
  </div>`:""}function ac(t){if(!Number.isFinite(t)||t<0)return"0s";let e=Math.floor(t/1e3),r=Math.floor(e/60),n=e%60;return r>0?`${r}m ${String(n).padStart(2,"0")}s`:`${n}s`}function lc(t){if(!t||!t.reason)return"";let e=t.reason.startsWith("export_removal_failed:");return d`<div
    class="worker-banner worker-banner--ship"
    role="alert"
    data-bead-id=${t.bead_id||""}
  >
    ⚠ ${t.bead_id||"(bead \uBBF8\uC0C1)"} 머지 완료 — capability 발행이
    실패했습니다 (${t.reason}). bead는 closed지만
    ${e?d`취소 처분된 자손의 <code>export:</code> 라벨이 남아 있어 다음
          스윕이 이를 다시 발행 대상으로 읽습니다.`:d`<code>provides:</code> 라벨이 없어 이 capability에 걸린 external
          의존은 계속 막혀 있습니다.`}
    ${t.detail?d`<div class="worker-banner__detail">
          남은 작업: <code>${es(t.detail)}</code>
        </div>`:""}
    <div class="worker-banner__detail">
      ${e?d`수동 복구:
            <code
              >bd -C &lt;워크스페이스&gt; label remove &lt;id&gt;
              export:&lt;capability&gt;</code
            >
            실행 후 <code>bd show &lt;id&gt; --json</code>으로 라벨이 사라졌는지
            확인하세요 — 이 자손은 ship하지 마세요.`:d`수동 복구:
            <code>bd -C &lt;워크스페이스&gt; ship &lt;capability&gt;</code> 실행
            후 <code>bd show &lt;id&gt; --json</code>으로
            <code>provides:</code> 라벨을 확인하세요.`}
    </div>
    ${t.pr_url?d`<div class="worker-banner__detail">
          <code>${t.pr_url}</code>
        </div>`:""}
  </div>`}function ci(t){let e=Array.isArray(t.cleanupFailures)?t.cleanupFailures:[];return d`<div class="worker-banners">
    ${t.failure?d`<div class="worker-banner worker-banner--failure" role="alert">
          ⛔ ${t.failure.repo||"repo"} 세션 실패 —
          ${t.failure.reason||""}. 자동 진행을 껐습니다, 수동 ▶ 필요.
          ${t.failure.resume_attempt_id?d`<button
                type="button"
                class="worker-banner__resume"
                data-attempt-id=${t.failure.resume_attempt_id}
                ?disabled=${!t.failure.resume_eligible}
                title=${t.failure.resume_eligible?"\uCD5C\uADFC \uC2E4\uD328 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":t.failure.resume_reason||"\uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}
              >
                ↻ 이어하기
              </button>`:""}
          ${t.failure.resume_attempt_id?d`<button
                type="button"
                class="worker-banner__dismiss"
                data-attempt-id=${t.failure.resume_attempt_id}
                title="이 실패를 처리 완료로 표시하고 배너를 닫습니다"
                aria-label="배너 닫기"
              >
                ✕
              </button>`:""}
          ${sc(t.failure.cause_detail)}
        </div>`:""}
    ${e.map(r=>d`<div
          class="worker-banner worker-banner--cleanup"
          role="alert"
          data-bead-id=${r.bead_id}
        >
          ⚠ ${r.bead_id} 머지 완료 — 머지 후 정리가 <b>${r.step}</b> 단계에서
          멈췄습니다 (${r.reason}).
          <!-- capability 발행은 close 뒤에 오는 유일한 단계라 실패해도 close를
               롤백하지 않는다 (UI-4ii4). "resolved로 남아 있다"는 다른 모든
               단계에만 참이므로 여기서만 문안을 바꾼다. -->
          ${r.step==="ship_exported_capabilities"?"bead\uB294 closed\uB85C \uB0A8\uC544 \uC788\uACE0(close\uB294 \uB864\uBC31\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4)":"bead\uB294 resolved\uB85C \uB0A8\uC544 \uC788\uACE0"}
          자동 재시도는 하지 않습니다 — 정리를 사람이 마무리하세요.
          ${r.detail?d`<div class="worker-banner__detail">
                <code>${es(r.detail)}</code>
              </div>`:""}
          ${ic(r.log_path)} ${oc(r.output_tail)}
        </div>`)}
    ${lc(t.shipFailure)}
  </div>`}function cc(t,e,r=null){let n=!!t.paused,s=n?"\uC77C\uC2DC\uC815\uC9C0":typeof t.started_at=="number"?ac(e-t.started_at):"\u2014",o=[t.runner,t.model].filter(Boolean).join(" \xB7 "),i=Hr(t.usage),l=t.conflict_resolution?n?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,a=t.attempt_id&&t.attempt_id===r;return d`<div
    class="rtile${a?" rtile--sel":""}${n?" rtile--paused":""}"
    data-bead-id=${t.bead_id}
    data-attempt-id=${t.attempt_id||""}
  >
    <div class="rtile__hd">
      <span class="rtile__dot" aria-hidden="true"></span>
      <span class="rtile__id" title="클릭하면 ID 복사">${t.bead_id}</span>
      ${t.resumed_from?d`<span
            class="rtile__resumed"
            title=${`\uC774\uC5B4\uBC1B\uC740 \uC138\uC158 (from ${t.resumed_from})`}
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
      ${n?d`<button
            type="button"
            class="rtile__resume"
            title="같은 세션으로 이어서 재개"
            aria-label="재개"
          >
            ▶
          </button>`:d`<button
            type="button"
            class="rtile__pause"
            ?disabled=${t.can_pause===!1}
            title=${t.can_pause===!1?"\uC138\uC158 ID \uAE30\uB85D \uC804 \u2014 \uC77C\uC2DC\uC815\uC9C0 \uBD88\uAC00":"\uC77C\uC2DC\uC815\uC9C0 (\uAC19\uC740 \uC138\uC158\uC73C\uB85C \uC7AC\uAC1C \uAC00\uB2A5)"}
            aria-label="일시정지"
          >
            ⏸
          </button>`}
      <button type="button" class="rtile__stop" title="폐기" aria-label="폐기">
        ■
      </button>
    </div>
    <div class="rtile__title">${t.title}</div>
    ${o||i||l?d`<div class="rtile__meta">
          ${l?d`<span class="worker-mini__badge">${l}</span>`:""}
          ${o?d`<span class="rtile__runner">${o}</span>`:""}
          ${i?d`<span class="worker-usage" title=${Wr(t.usage)}
                >${i}</span
              >`:""}
        </div>`:""}
    ${nr(t)}
    <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일): 큐
         스냅샷에는 페이즈명도 진행률도 없으므로 진행 바는 만들지 않는다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
    ${n?"":d`<div class="rtile__accent" aria-hidden="true"></div>`}
  </div>`}function ts(t,e=Date.now(),r=null){let n=Array.isArray(t)?t:[];return d`<div class="worker-rungrid" id="worker-rungrid">
    ${n.length===0?d`<div class="worker-rungrid__empty">실행 세션 없음</div>`:n.map(s=>cc(s,e,r))}
  </div>`}var dc="tab:worker:ready",uc="tab:worker:blocked",sn=1;function ss(t){let e=t&&t.metadata;return!!(e&&typeof e=="object"&&e.spec_id)}var pi="beads-ui.worker.candidate-filter",rs={show_blocked:!1,spec:"all"};function pc(){try{let t=window.localStorage.getItem(pi);if(!t)return{...rs};let e=JSON.parse(t);if(!e||typeof e!="object")return{...rs};let r=e.spec;return{show_blocked:e.show_blocked===!0,spec:r==="with"||r==="without"?r:"all"}}catch{return{...rs}}}function fc(t){try{window.localStorage.setItem(pi,JSON.stringify(t))}catch{}}function hc(t,e){let r=l=>e.show_blocked||!l.blocked,n=l=>e.spec==="all"||(e.spec==="with"?l.has_spec:!l.has_spec),s=[],o=0,i=0;for(let l of t){let a=r(l),c=n(l);a&&c?s.push(l):!a&&c?o+=1:a&&!c&&(i+=1)}return{visible:s,hidden_blocked:o,hidden_spec:i}}var _c=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],fi="bdui.worker.candidate_sort",gc=[{value:"spec",label:"spec \uC6B0\uC120"},{value:"board",label:"Board \uC21C\uC11C"},{value:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131\uC21C"}],on="spec";function mc(){try{let t=window.localStorage.getItem(fi);return t==="board"||t==="created"||t==="spec"?t:on}catch{return on}}function bc(t){try{window.localStorage.setItem(fi,t)}catch{}}var hi="bdui.worker.done-range";function wc(){try{let t=window.localStorage.getItem(hi);return Vt(t)?t:St}catch{return St}}function kc(t){try{window.localStorage.setItem(hi,t)}catch{}}var yc="(max-width: 640px)",_i="beads-ui.worker.lane-collapsed",Er={queue:!0,done:!0};function vc(){try{let t=window.localStorage.getItem(_i);if(!t)return{...Er};let e=JSON.parse(t);return!e||typeof e!="object"?{...Er}:{queue:typeof e.queue=="boolean"?e.queue:Er.queue,done:typeof e.done=="boolean"?e.done:Er.done}}catch{return{...Er}}}function $c(t){try{window.localStorage.setItem(_i,JSON.stringify(t))}catch{}}function di(t){let e=Array.isArray(t)&&t.length>0?t[0]:null;if(!e)return"";let r=typeof e.title=="string"?e.title:e.id||"";return r.length>22?`${r.slice(0,22)}\u2026`:r}function xc(t,e,r){let n=Array.isArray(t)?t.slice():[];return e==="created"?n.sort(Mt):(n.sort(Pr(r)),e==="board"?n:[...n.filter(ss),...n.filter(s=>!ss(s))])}function Sc(t){let e=t&&t.parent;return(typeof e=="string"?e.length>0:!!(e&&e.id))||/\.\d+$/.test(t&&t.id||"")}function Tc(t){let r=(Array.isArray(t?.dependencies)?t.dependencies:[]).map(n=>typeof n=="string"?n:n&&n.id).filter(Boolean);return r.length>0?`\u{1F512} ${r.join(", ")}`:"\u{1F512} blocked"}var Ac=["closed_unmerged","undecidable"],Ec=[{from:"\uAD00\uCE21 \uB300\uAE30",activity:"checking",to:"\uD655\uC778\uC911"},{from:"\uB85C\uCEEC\uAC80\uC99D \uB300\uAE30",activity:"verifying",to:"\uB85C\uCEEC\uAC80\uC99D \uC2E4\uD589 \uC911"}];function Cc(t,e){for(let r of Ec)if(t===r.from&&e===r.activity)return{label:r.to,live:!0};return{label:t,live:!1}}var ns=[{step:"merging",label:"\uBA38\uC9C0 \uC911"},{step:"base_sync",label:"base \uB3D9\uAE30\uD654"},{step:"post_merge_verify",label:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D"},{step:"deploy",label:"\uBC30\uD3EC"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"},{step:"ship_exported_capabilities",label:"capability \uBC1C\uD589"}];function Rc(t){if(typeof t!="string"||t.length===0)return null;let e=ns.length,r=ns.findIndex(n=>n.step===t);return r<0?{label:t,index:0,total:e,percent:0}:{label:ns[r].label,index:r+1,total:e,percent:Math.round((r+1)/e*100)}}function ui(t){switch(t){case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";default:return t}}function Lc(t,e,r,n,s=null,o=null,i=null,l=!1,a=null,c=!0,_=null){let f=!!a&&a.position>0,w=!!a&&a.active===!0,$=a&&a.failure||null,v=r[t]||null,x=v&&v.gate?v.gate:null,M=v&&v.pr?v.pr:null,F=[];l&&F.push("\uC138\uC158");let B=i?i==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":null,W=Cc(l&&x&&x.tier==="closed_unmerged"?"\uB2EB\uD798":x&&x.gate_badge||"",B?null:o&&o.activity||null);B&&F.push(B),W.label&&F.push(W.label),x&&x.base_badge&&x.base_badge!==x.gate_badge&&F.push(x.base_badge),n&&F.push("\uC815\uB9AC \uC2E4\uD328"),f&&!w&&F.push(`\uBA38\uC9C0 \uB300\uAE30 #${a.position}`),$&&F.push(`\uC77C\uAD04 \uBA38\uC9C0 \uC2E4\uD328: ${ui($)}`),_&&F.push(`\uC790\uB3D9 \uC81C\uC678: ${ui(_)}`);let O=!!x&&x.base_badge==="\uCDA9\uB3CC",A=!!x&&x.enabled===!0,T=Rc(o&&o.merge_progress?o.merge_progress.step:null),R=!!n&&!!x&&x.tier==="merged",k=l&&!!x&&x.tier==="merged",q=l&&O&&c===!1;return{id:t,title:e,reason:n?"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644":"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",external:l,pr_number:M&&typeof M.number=="number"?M.number:null,pr_url:M&&typeof M.url=="string"?M.url:"",badges:F,live_badge:i==="running"?B:B?null:W.live?W.label:null,usage:s,alert:!!x&&Ac.includes(x.tier)||!!n||!!$,merge_action:!f,cancel_action:f,cancel_enabled:!w,cancel_title:w?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard_action:!l&&!n&&!(x&&x.tier==="merged"),merge_step:T,discard_enabled:!T&&!i&&!f,discard_title:i?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":f?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":void 0,merge_enabled:!T&&!i&&!q&&(A||O||R||k),merge_label:k?"\uC815\uB9AC":O&&!T&&!R?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:T?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${T.label}`:k?"\uBA38\uC9C0\uB428 \u2014 \uD074\uB9AD\uD558\uBA74 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC\uB97C \uC218\uD589\uD569\uB2C8\uB2E4":q?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":i==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":i==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":R?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uCC98\uC74C\uBD80\uD130 \uB2E4\uC2DC \uC218\uD589\uD569\uB2C8\uB2E4":O?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":A?`\uBA38\uC9C0 (${x.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:x&&x.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${x&&x.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function os(t,e={}){let{transport:r,issueStores:n,queueStore:s,sessionLogStore:o,uiOrderStore:i,gotoIssue:l,getWorkspacePath:a}=e,c=n?qr(n,i):null,_=Br({transport:r,uiOrderStore:i}),f=null,w=[],$=pc(),v=mc(),x=wc();function M(){let u=hr.find(m=>m.value===x);return u?u.label:"\uC624\uB298"}let F=vc(),B=!1,W=new Set,O=new Set,A=[],T=document.createElement("div");T.className="worker-console";let R=document.createElement("div");R.className="worker-top";let k=document.createElement("div");k.className="worker-drawer-overlay",k.hidden=!0;let q=document.createElement("div");q.className="worker-drawer-overlay__backdrop";let H=document.createElement("div");H.className="worker-drawer-host",k.append(q,H);let V=document.createElement("div");V.className="worker-lanes-host",T.append(R,k,V),t.appendChild(T);let Z=null,ke=Gr(H,{transport:r,sessionLogStore:o,onClose:()=>{Z=null,k.hidden=!0,fe()}}),Te=ai(T,{queueStore:s,transport:r,getWorkspacePath:a});function xe(){return s&&s.get()||{revision:0,auto_advance:!1,auto_merge:!1,slots:sn,queue:[],pr_wait:[],done:[]}}function ue(){let u=xe();return typeof u.revision=="number"?u.revision:0}function D(u){u&&u.queue&&s&&s.set(u.queue)}function P(){let u=xe().queue;return Array.isArray(u)?u.length:0}async function se(u,m){if(!r)return;let C=await r("worker-queue-place",{bead_id:u,index:m,expected_revision:ue()});D(C),C&&C.conflict&&await r("worker-queue-place",{bead_id:u,index:m,expected_revision:ue()}).then(D)}async function Ae(u,m){if(!r)return;let C=await r("worker-queue-reorder",{bead_id:u,to_index:m,expected_revision:ue()});D(C),C&&C.conflict&&await r("worker-queue-reorder",{bead_id:u,to_index:m,expected_revision:ue()}).then(D)}async function ae(u){if(!r)return;let m=await r("worker-queue-remove",{bead_id:u,expected_revision:ue()});D(m),m&&m.conflict&&await r("worker-queue-remove",{bead_id:u,expected_revision:ue()}).then(D)}async function Ee(u){!r||!u||await r("worker-attempt-stop",{attempt_id:u})}async function le(u){if(!r||!u)return;let m=await r("worker-attempt-pause",{attempt_id:u});m&&m.paused===!1&&m.reason&&te(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${m.reason}`,"error",2400)}async function Be(u){if(!r||!u)return;let m=await r("worker-attempt-resume",{attempt_id:u,expected_revision:ue()});D(m),m&&m.conflict&&(m=await r("worker-attempt-resume",{attempt_id:u,expected_revision:ue()}),D(m)),m&&m.resumed===!1&&!m.conflict&&m.reason&&te(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${m.reason}`,"error",2400)}async function ge(u){if(!r||!u)return;let m=await r("worker-attempt-dismiss",{attempt_id:u,expected_revision:ue()});D(m),m&&m.conflict&&(m=await r("worker-attempt-dismiss",{attempt_id:u,expected_revision:ue()}),D(m)),m&&m.dismissed===!1&&!m.conflict&&m.reason&&te(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${m.reason}`,"error",2400)}async function Pe(u,m){if(!r)return null;let C=r,J=await C(u,{...m,expected_revision:ue()});return D(J),J&&J.conflict&&(J=await C(u,{...m,expected_revision:ue()}),D(J)),J}async function ut(u){if(!r||!u)return;W.add(u),fe();let m;try{m=await Pe("worker-merge-queue-add",{bead_id:u})}finally{W.delete(u),fe()}!m||m.conflict||m.applied||te("\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)","error",2400)}async function Ue(u){if(!r)return;let m=await Pe("worker-merge-auto-toggle",{on:u});!m||m.conflict||te(u?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",u?"success":"info",2400)}async function Ve(u){if(!r||!u)return;let m=await Pe("worker-merge-queue-remove",{bead_id:u});m&&!m.conflict&&!m.applied&&m.reason==="merge_active"&&te("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function Le(){await Pe("worker-merge-queue-remove",{all:!0})}async function Ke(u){if(!r||!u||!(typeof globalThis.confirm!="function"||globalThis.confirm(`${u}: PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4. \uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694. \uACC4\uC18D\uD560\uAE4C\uC694?`)))return;let C=await r("worker-pr-discard",{bead_id:u,expected_revision:ue()});if(D(C),C&&C.conflict&&(C=await r("worker-pr-discard",{bead_id:u,expected_revision:ue()}),D(C)),C&&C.discarded===!0){te("\uD3D0\uAE30 \uC644\uB8CC \u2014 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB2E4\uC2DC \uC2E4\uD589\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4","success",2400);return}C&&C.discarded===!1&&!C.conflict&&te(`\uD3D0\uAE30 \uAC70\uBD80: ${C.reason||""}`,"error",2800)}async function Je(u,m){if(!r||!m||O.has(m))return;O.add(m),fe();let C;try{C=await r(u,{bead_id:m,expected_revision:ue()}),D(C),C&&C.conflict&&(C=await r(u,{bead_id:m,expected_revision:ue()}),D(C))}finally{O.delete(m),fe()}if(!(!C||C.conflict)){if(C.ok){te(u==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}te(`\uCC98\uBD84 \uAC70\uBD80: ${C.reason||""}`,"error",3e3)}}async function Ze(u){if(!r)return;let m=await r("worker-queue-toggle",{on:u,expected_revision:ue()});D(m),m&&m.conflict&&await r("worker-queue-toggle",{on:u,expected_revision:ue()}).then(D)}async function et(u){if(!r||!Number.isFinite(u))return;let m=Math.max(sn,Math.floor(u)),C=await r("worker-queue-set-slots",{slots:m,expected_revision:ue()});D(C),C&&C.conflict&&await r("worker-queue-set-slots",{slots:m,expected_revision:ue()}).then(D)}function ze(){let u=xe(),m=c?c.selectBoardColumn(dc,"ready"):[],C=c?c.selectBoardColumn(uc,"blocked"):[],J=u.bead_titles||{},pe=new Map;for(let[y,j]of Object.entries(J))typeof j=="string"&&j.length>0&&pe.set(y,j);for(let y of[...m,...C])pe.set(y.id,y.title||y.id);let Ie=u.bead_times||{},h=new Map;for(let[y,j]of Object.entries(Ie))j&&typeof j=="object"&&h.set(y,j);for(let y of[...m,...C])h.set(y.id,{created_at:y.created_at,updated_at:y.updated_at});let g=y=>h.get(y)||{},G=u.pr_wait||[],Y=u.pr_observations||{},oe=u.pr_activity||{},ye=u.cleanup_failed||{},kt=Object.entries(ye).map(([y,j])=>({bead_id:y,step:j&&j.step?j.step:"",reason:j&&j.reason?j.reason:"",detail:j&&typeof j.detail=="string"?j.detail:null,output_tail:j&&typeof j.output_tail=="string"&&j.output_tail?j.output_tail:void 0,log_path:j&&typeof j.log_path=="string"&&j.log_path?j.log_path:void 0})),Xe=u.ship_failure||null,rt=Xe&&typeof Xe.reason=="string"&&Xe.reason?{bead_id:typeof Xe.bead_id=="string"?Xe.bead_id:"",reason:Xe.reason,detail:typeof Xe.detail=="string"?Xe.detail:null,pr_url:typeof Xe.pr_url=="string"?Xe.pr_url:null}:null,ie=u.queue||[],Me=new Set([...ie.map(y=>y.bead_id),...G.map(y=>y.bead_id),...u.done.map(y=>y.bead_id)]),zt=new Set(C.map(y=>y.id)),sr=i?i.get()?.order||{}:{},or=new Set,pt=[];for(let y of[...m,...C])Me.has(y.id)||or.has(y.id)||Sc(y)||(or.add(y.id),pt.push(y));w=xc(pt,v,sr);let Cr=u.admission||{},ir=y=>{let j=Cr[y];if(!j)return"";if(j.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let ne=typeof j.reason=="string"?j.reason:"",Se=ne.indexOf(":");return Se>0&&Se<ne.length-1?`\u26D4 ${ne.slice(0,Se)} (${ne.slice(Se+1)})`:`\u26D4 ${ne}`},Rr=w.map(y=>{let j=ss(y),ne=zt.has(y.id),Se=[];ne&&Se.push(Tc(y)),j||Se.push("spec \uC5C6\uC74C");let Ir=ir(y.id);return Ir&&Se.push(Ir),{id:y.id,title:y.title||y.id,reason:Se.join(" \xB7 "),draggable:j,lane:"candidate",created_at:y.created_at,updated_at:y.updated_at,workflow:y.workflow,status:y.status,blocked:ne,has_spec:j}}),Ht=hc(Rr,$),an=Ht.visible,K=u.revise_parked||{},p=(y,j)=>y.map(ne=>{let Se=j==="queue"?K[ne.bead_id]:null;return{id:ne.bead_id,title:pe.get(ne.bead_id)||ne.bead_id,reason:j==="done"?"":ir(ne.bead_id),draggable:j!=="done",done:j==="done",lane:j,badges:Se?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!Se,revise_action:!!Se,revise_enabled:!!Se&&!O.has(ne.bead_id),revise_title:Se?Se.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${Se.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":"",usage:j==="done"?rr(u.attempts||{},ne.bead_id):null,done_at:j==="done"&&typeof ne.added_at=="number"?ne.added_at:void 0,...g(ne.bead_id)}}),I=new Map;for(let y of u.done)y&&typeof y.bead_id=="string"&&typeof y.added_at=="number"&&I.set(y.bead_id,y.added_at);let z=u.attempts?Object.values(u.attempts):[],ve=new Set;for(let y of z)y&&typeof y.resumed_from=="string"&&y.resumed_from.length>0&&ve.add(y.resumed_from);let Fe=new Map;for(let y of z)Fe.set(y.bead_id,y.attempt_id);let Re=new Map;for(let y of z)Re.set(y.attempt_id,y);function Qe(y){let j=new Set,ne=y;for(;ne&&!j.has(ne.attempt_id);){if(ne.conflict_resolution===!0)return!0;j.add(ne.attempt_id),ne=typeof ne.resumed_from=="string"&&ne.resumed_from.length>0&&Re.get(ne.resumed_from)||null}return!1}let nt=[],Ye=null;for(let y of z){let j=y.status==="paused"&&!ve.has(y.attempt_id);if(y.status==="running"||j)nt.push({bead_id:y.bead_id,attempt_id:y.attempt_id,title:pe.get(y.bead_id)||y.bead_id,runner:y.runner||null,model:y.model||null,effort:y.effort||null,started_at:typeof y.started_at=="number"?y.started_at:null,resumed_from:y.resumed_from||null,paused:j,conflict_resolution:Qe(y),can_pause:typeof y.session_id=="string"&&y.session_id.length>0,usage:rr(u.attempts||{},y.bead_id),...g(y.bead_id)});else if(y.status==="failed"||y.status==="orphaned"){let ne=Fe.get(y.bead_id)!==y.attempt_id,Se=I.get(y.bead_id),Ir=typeof Se=="number"&&Se>0&&typeof y.finished_at=="number"&&Se>=y.finished_at;!ne&&!Ir&&typeof y.dismissed_at!="number"&&(Ye=y)}}let Wt=null;if(Ye){let y=typeof Ye.session_id=="string"&&Ye.session_id.length>0,j=ve.has(Ye.attempt_id),ne=Ye.cause_detail;Wt={repo:Ye.repo||"",reason:Ye.cause||Ye.status,cause_detail:ne&&typeof ne.reason=="string"?{reason:ne.reason,command:typeof ne.command=="string"?ne.command:null}:null,resume_attempt_id:Ye.attempt_id,resume_eligible:y&&!j,resume_reason:y?j?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}}let qe=new Set(nt.map(y=>y.bead_id)),Gt=Array.isArray(u.merge_queue)?u.merge_queue:[],ar=new Map;Gt.forEach((y,j)=>{y&&typeof y.bead_id=="string"&&ar.set(y.bead_id,j+1)});let cs=u.merge_queue_state||{active:null,failures:{}},Si=cs.failures||{},Ti=u.auto_merge_skips||{},ds=y=>{let j=Ti[y];if(!j)return null;let ne=Y[y],Se=ne&&ne.pr?ne.pr.head_sha:null;return Se&&Se===j.head_sha?j.reason||"":null},Lr=new Map;for(let y of nt)y.conflict_resolution&&(y.paused?Lr.has(y.bead_id)||Lr.set(y.bead_id,"paused"):Lr.set(y.bead_id,"running"));let us=nt.filter(y=>!y.paused).length,ps=(u.workspace_info||{}).slots,fs=typeof ps=="number"?ps:typeof u.slots=="number"?u.slots:sn,Ai=us>fs,hs=Or(x),Ei=(Array.isArray(u.done)?u.done.slice():[]).filter(y=>hs===void 0||typeof y.added_at!="number"||y.added_at>=hs).sort((y,j)=>(j.added_at||0)-(y.added_at||0)),_s=p(Ei,"done"),ln={};for(let y of tr)ln[y]=0;let gs=!1;for(let y of _s){let j=y.usage;if(j&&typeof j=="object")for(let ne of tr)Number.isFinite(j[ne])&&(ln[ne]+=j[ne],gs=!0)}let Ci=gs?Tt(ln):null;return{queue:u,idToTitle:pe,candidates:an,candidate_hidden:{blocked:Ht.hidden_blocked,spec:Ht.hidden_spec},running:nt,live_count:us,slots:fs,over_cap:Ai,failure:Wt,waiting:p(ie.filter(y=>!qe.has(y.bead_id)),"queue"),pr_wait:G.map(y=>Lc(y.bead_id,pe.get(y.bead_id)||y.bead_id,Y,ye[y.bead_id]||null,rr(u.attempts||{},y.bead_id),oe[y.bead_id]||(W.has(y.bead_id)?{activity:null,merge_progress:{step:"merging"}}:null),Lr.get(y.bead_id)||null,y.external===!0,{position:ar.get(y.bead_id)||0,active:cs.active===y.bead_id,failure:Si[y.bead_id]||null},y.wt_present!==!1,u.auto_merge===!0?ds(y.bead_id):null)).map(y=>({...y,...g(y.id)})),merge_queue_length:Gt.length,merge_queue_running:Gt.length>0,auto_excluded:G.map(y=>y.bead_id).filter(y=>ds(y)!==null),verify_cmd_present:!!(u.workspace_info||{}).verify_cmd,done:_s,token_total:Ci,cleanup_failures:kt,ship_failure:rt}}function tt(u){let m=u.waiting.length>0?u.waiting[0].id:"\u2014",C=d`<button
      type="button"
      class="worker-play${u.queue.auto_advance?" is-active":""}"
    >
      ${u.queue.auto_advance?"\u23F8 \uC77C\uC2DC\uC815\uC9C0":"\u25B6 \uC790\uB3D9 \uC9C4\uD589"}
    </button>`,J=u.over_cap?d`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",pe=d`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${u.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${u.pr_wait.length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${M()} 완료 <b>${u.done.length}</b></span
      >`,Ie=d`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${sn}
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
      </button>`,h=ci({failure:u.failure,cleanupFailures:u.cleanup_failures,shipFailure:u.ship_failure});return B?d`<div class="worker-ribbon">
          ${C}
          <div class="worker-kpi worker-kpi--ribbon">${J}${pe}</div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${Ie}</div>
        </div>
        ${h}`:d`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${C}${Ie}</div>
        <div class="worker-kpi">
          ${J}${pe}
          ${u.token_total?d`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${`${M()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}
                >${M()} 완료 · 누적 ${u.token_total}</span
              >`:""}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${m}</b></span
          >
        </div>
      </div>
      ${h}`}function Oe(u){if(u.running.length===0&&u.pr_wait.length===0)return"";let m=u.running.some(C=>!C.paused);return d`<section
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
        ${dt(u)}
      </header>
      ${u.running.length>0?ts(u.running,Date.now(),Z):""}
      ${u.pr_wait.map(C=>Jn(C))}
    </section>`}function He(u){let m=u.candidate_hidden;return d`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${$.show_blocked}
        />
        🔒 blocked${m.blocked>0?` ${m.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${_c.map(C=>d`<button
              type="button"
              class="worker-filter__chip${$.spec===C.value?" is-active":""}"
              data-spec=${C.value}
              aria-pressed=${$.spec===C.value?"true":"false"}
            >
              ${C.label}
            </button>`)}
        ${m.spec>0?d`<span class="worker-filter__hidden">숨김 ${m.spec}</span>`:""}
      </div>
    </div>`}function lt(){return d`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${v}
    >
      ${gc.map(u=>d`<option value=${u.value} ?selected=${v===u.value}>
            ${u.label}
          </option>`)}
    </select>`}function We(){return d`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${x}
      >
        ${hr.map(u=>d`<option value=${u.value} ?selected=${x===u.value}>
              ${u.label}
            </option>`)}
      </select>
    </div>`}function dt(u){let m=u.queue.auto_merge===!0;if(u.merge_queue_running)return d`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop${m?" is-active":""}"
        title=${m?"\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB044\uACE0 \uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)":"\uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)"}
      >
        ${m?"\u23F8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8":"\uC77C\uAD04 \uBA38\uC9C0 \uC911\uB2E8"} ${u.merge_queue_length}
      </button>`;if(m)return d`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop is-active"
        title="자동 머지 켜짐 — 자격이 생기는 PR을 계속 큐에 넣습니다. 클릭하면 끕니다"
      >
        ⏸ 자동 머지
      </button>`;let C=new Set(u.auto_excluded),J=u.pr_wait.filter(pe=>pe.merge_action&&pe.merge_enabled&&!C.has(pe.id)).length;return d`<button
      type="button"
      class="worker-merge-all"
      title=${u.verify_cmd_present?"\uCF1C \uB450\uBA74 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uCDA9\uB3CC \uD574\uC18C\xB7\uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uCF1C \uB450\uBA74 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uCDA9\uB3CC \uD574\uC18C\xB7\uBA38\uC9C0\uD569\uB2C8\uB2E4 \u2014 \uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uB294 \uAC80\uC99D \uC2E0\uD638\uAC00 \uC5C6\uC5B4 CI\xB7\uB85C\uCEEC\uAC80\uC99D \uC5C6\uC774 \uBA38\uC9C0\uB429\uB2C8\uB2E4"}
    >
      ▶ 자동 머지${J>0?` ${J}`:""}
    </button>`}function _t(u){let m=Et({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:u.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:lt(),controls:He(u)});return B?d`<div class="worker-lanes worker-lanes--mobile">
        ${Oe(u)}
        ${Et({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:u.waiting,empty:"\uB4DC\uB798\uADF8 \uB610\uB294 [\uB300\uAE30\uB85C \u21B4]\uB85C \uBC30\uCE58",collapsible:!0,collapsed:F.queue,preview:di(u.waiting)})}
        ${m}
        ${Et({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:u.done,empty:`${M()} \uC644\uB8CC \uC5C6\uC74C`,controls:We(),collapsible:!0,collapsed:F.done,preview:u.token_total||di(u.done)})}
      </div>`:d`<div class="worker-lanes">
      ${m}
      ${Et({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:u.waiting,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58"})}
      ${Et({id:"worker-pane-running",lane:"running",title:`\uC2E4\uD589 \uC911 \xB7 \uC2AC\uB86F ${u.slots}`,items:u.running,live:u.running.some(C=>!C.paused),body:ts(u.running,Date.now(),Z)})}
      ${Et({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:u.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C",header_control:dt(u)})}
      ${Et({id:"worker-pane-done",lane:"done",title:`\uC644\uB8CC \xB7 ${M()} ${u.done.length}`,items:u.done,empty:`${M()} \uC644\uB8CC \uC5C6\uC74C`,controls:We()})}
    </div>`}function Ce(u){F={...F,[u]:!F[u]},$c(F),fe()}function fe(){let u=ze();we(tt(u),R),we(_t(u),V)}function Ge(){let u=document.querySelector(".app-header");if(!u)return;let m=()=>{let C=Math.round(u.getBoundingClientRect().height);T.style.setProperty("--worker-ribbon-top",`${C}px`)};if(m(),typeof ResizeObserver=="function"){let C=new ResizeObserver(m);C.observe(u),A.push(()=>C.disconnect())}else window.addEventListener("resize",m),A.push(()=>window.removeEventListener("resize",m))}function je(){if(typeof window.matchMedia!="function")return;let u=window.matchMedia(yc);B=!!u.matches;let m=C=>{let J=!!(C&&typeof C.matches=="boolean"?C.matches:u.matches);J!==B&&(B=J,fe())};typeof u.addEventListener=="function"?(u.addEventListener("change",m),A.push(()=>u.removeEventListener("change",m))):typeof u.addListener=="function"&&(u.addListener(m),A.push(()=>u.removeListener(m)))}function E(u){let m=u.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!m)return;let C=m.dataset.beadId||"",J=m.dataset.lane||"";f={bead_id:C,from_lane:J};try{u.dataTransfer?.setData("text/plain",C),u.dataTransfer&&(u.dataTransfer.effectAllowed="move")}catch{}}function N(u){let m=u.target?.closest?.(".worker-pane");if(!m)return;let C=m.dataset.lane||"";C!=="candidate"&&C!=="queue"||(u.preventDefault(),u.dataTransfer&&(u.dataTransfer.dropEffect="move"),m.classList.add("worker-pane--drag-over"))}function re(u){u.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function ee(u,m){let C=w.find(h=>h.id===u);if(!C)return;let J=w.filter(h=>h.id!==u),pe=J.length;if(m){let h=m.dataset.beadId;if(h===u)return;let g=J.findIndex(G=>G.id===h);g>=0&&(pe=g)}let Ie=J.slice();Ie.splice(pe,0,C),_.applyReorder(u,Ie,pe)}function X(u){let m=u.target?.closest?.(".worker-pane");if(!m)return;u.preventDefault(),m.classList.remove("worker-pane--drag-over");let C=m.dataset.lane||"",J=f?.bead_id||u.dataTransfer?.getData("text/plain")||"",pe=f?.from_lane||"";if(f=null,!J)return;let Ie=u.target?.closest?.(".worker-mini, .worker-card"),h=Array.from(m.querySelectorAll(".worker-mini, .worker-card")),g=h.length;if(Ie){let G=h.indexOf(Ie);G>=0&&(g=G)}if(m.classList.contains("worker-pane--collapsed")&&(g=P()),C==="candidate"){if(pe==="candidate"){ee(J,Ie);return}pe==="queue"&&ae(J);return}C==="queue"&&(pe==="queue"?Ae(J,g):se(J,g))}function ce(u){$=u,fc(u),fe()}function he(u){v=u==="board"||u==="created"||u==="spec"?u:on,bc(v),fe()}function be(u){x=Vt(u)?u:St,kc(x),fe()}function U(u){let m=u.target?.closest?.(".worker-filter__blocked");if(m){ce({...$,show_blocked:m.checked});return}let C=u.target?.closest?.(".worker-done-range");if(C){be(C.value);return}let J=u.target?.closest?.(".worker-sort");if(J){he(J.value||on);return}let pe=u.target?.closest?.(".worker-slots__input");if(!pe)return;let Ie=Number.parseInt(pe.value,10);if(!Number.isFinite(Ie)){fe();return}et(Ie).then(fe)}function b(u){return u?{runner:u.runner||void 0,model:u.model||void 0,effort:u.effort||void 0,worktree:u.worktree||void 0,status:u.status||void 0,session_id:u.session_id||void 0}:{}}function L(u){let m=xe(),C=m.attempts?m.attempts[u]:null;Z=u,k.hidden=!1,ke.open({attempt_id:u,meta:b(C)}),fe()}function S(){if(!Z)return;let u=xe(),m=u.attempts?u.attempts[Z]:null;if(m){ke.updateMeta(b(m));return}ke.close()}function Q(u){let m=u.target;if(m?.closest?.("#worker-exec-defaults-dialog"))return;if(m?.closest?.(".worker-exec-defaults-btn")){Te.open();return}let C=m?.closest?.(".worker-banner__resume");if(C){let ie=C.dataset.attemptId;ie&&Be(ie);return}let J=m?.closest?.(".worker-banner__dismiss");if(J){let ie=J.dataset.attemptId;ie&&ge(ie);return}if(m?.closest?.(".worker-play")){Ze(!xe().auto_advance);return}let pe=m?.closest?.(".worker-merge-all");if(pe){pe.classList.contains("worker-merge-all--stop")?xe().auto_merge===!0?Ue(!1):Le():Ue(!0);return}let Ie=m?.closest?.(".worker-pane__hd--toggle");if(Ie){let ie=Ie.dataset.lane;(ie==="queue"||ie==="done")&&Ce(ie);return}let h=m?.closest?.(".worker-card__place");if(h){let ie=h.dataset.beadId;ie&&!h.disabled&&se(ie,P());return}let g=m?.closest?.(".worker-filter__chip");if(g){let ie=g.dataset.spec;(ie==="all"||ie==="with"||ie==="without")&&ce({...$,spec:ie});return}let G=m?.closest?.(".worker-mini__merge");if(G){ut(G.dataset.beadId||"");return}let Y=m?.closest?.(".worker-mini__merge-cancel");if(Y){Ve(Y.dataset.beadId||"");return}let oe=m?.closest?.(".worker-mini__discard");if(oe){Ke(oe.dataset.beadId||"");return}let ye=m?.closest?.(".worker-mini__revise-fix");if(ye){Je("worker-revise-fix",ye.dataset.beadId||"");return}let kt=m?.closest?.(".worker-mini__revise-approve");if(kt){Je("worker-revise-approve",kt.dataset.beadId||"");return}if(m?.closest?.(".worker-mini__pr"))return;if(m?.closest?.(".rtile__stop")){let Me=m?.closest?.(".rtile")?.dataset?.attemptId;Me&&Ee(Me);return}if(m?.closest?.(".rtile__pause")){let Me=m?.closest?.(".rtile")?.dataset?.attemptId;Me&&le(Me);return}if(m?.closest?.(".rtile__resume")){let Me=m?.closest?.(".rtile")?.dataset?.attemptId;Me&&Be(Me);return}if(m?.closest?.(".rtile__session")){let Me=m?.closest?.(".rtile")?.dataset?.attemptId;Me&&L(Me);return}if(m?.closest?.(".worker-drawer-overlay__backdrop")){ke.close();return}if(m?.closest?.(".worker-drawer-host"))return;let Xe=m?.closest?.(".rtile");if(Xe){if(m?.closest?.(".rtile__id")){let Me=Xe.dataset.beadId;Me&&Ft(Me).then(zt=>{zt?te("\uBCF5\uC0AC\uB428","success",1200):te("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let ie=Xe.dataset.beadId;ie&&l&&l(ie);return}let rt=m?.closest?.(".worker-mini, .worker-card");if(rt){let ie=rt.dataset.beadId;if(m?.closest?.(".worker-mini__id, .worker-card__id")){ie&&Ft(ie).then(Me=>{Me?te("\uBCF5\uC0AC\uB428","success",1200):te("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}ie&&l&&l(ie)}}return t.addEventListener("dragstart",E),t.addEventListener("dragover",N),t.addEventListener("dragleave",re),t.addEventListener("drop",X),t.addEventListener("click",Q),t.addEventListener("change",U),je(),Ge(),c&&A.push(c.subscribe(fe)),s&&A.push(s.subscribe(()=>{fe(),S()})),fe(),{load(){fe()},destroy(){for(let u of A.splice(0))try{u()}catch{}t.removeEventListener("dragstart",E),t.removeEventListener("dragover",N),t.removeEventListener("dragleave",re),t.removeEventListener("drop",X),t.removeEventListener("click",Q),t.removeEventListener("change",U);try{ke.destroy()}catch{}k.hidden=!0;try{Te.destroy()}catch{}we(d``,t)}}}function is(t){if(!t)return"Unknown";let e=t.split("/").filter(Boolean);return e.length>0?e[e.length-1]:"Unknown"}function gi(t,e,r,n=async()=>{},s=async()=>{}){let o=De("views:workspace-picker"),i=null,l=!1,a=!1,c=!1;async function _(T){let k=T.target.value,H=e.getState().workspace?.current?.path||"";if(k&&k!==H){o("switching workspace to %s",k),l=!0,A();try{await r(k)}catch(V){o("workspace switch failed: %o",V)}finally{l=!1,A()}}}async function f(){let T=e.getState(),R=T.workspace?.current?.path||T.workspace?.available?.[0]?.path||"";if(!(!R||a)){o("git-pulling workspace %s",R),a=!0,A();try{await n(R)}catch(k){o("workspace git pull failed: %o",k)}finally{a=!1,A()}}}function w(T){let R=T.target;R&&t.contains(R)||x()}function $(T){T.key==="Escape"&&x()}function v(){c||(c=!0,document.addEventListener("mousedown",w),document.addEventListener("keydown",$),A())}function x(){c&&(c=!1,document.removeEventListener("mousedown",w),document.removeEventListener("keydown",$),A())}function M(){c?x():v()}async function F(T){let R=T.target,k=R.value,q=R.checked;o("toggling visibility %s \u2192 %s",k,String(q));try{await s(k,q)}catch(H){o("workspace visibility toggle failed: %o",H)}}function B(T){return T?d`
      <button
        type="button"
        class="workspace-picker__git-pull-button"
        @click=${f}
        ?disabled=${l||a}
        aria-label="Git Pull"
        title="Git Pull"
      >
        <span aria-hidden="true">⬇</span>
      </button>
    `:d``}function W(T,R){return d`
      <div class="workspace-picker__manage">
        <button
          type="button"
          class="workspace-picker__manage-button"
          @click=${M}
          aria-haspopup="true"
          aria-expanded=${c?"true":"false"}
          aria-label="프로젝트 관리"
        >
          프로젝트 관리
        </button>
        ${c?d`
              <div
                class="workspace-picker__manage-popover"
                role="menu"
                aria-label="프로젝트 표시 선택"
              >
                ${T.map(k=>d`
                    <label
                      class="workspace-picker__manage-row"
                      title="${k.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${k.path}"
                        .checked=${!R.has(k.path)}
                        @change=${F}
                      />
                      <span class="workspace-picker__manage-name"
                        >${is(k.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function O(){let T=e.getState(),R=T.workspace?.current,k=T.workspace?.available||[],q=new Set(T.workspace?.hidden||[]),H=R?.path||k[0]?.path||"";if(k.length===0)return d``;let V=k.filter(Z=>!q.has(Z.path)||Z.path===H);if(V.length<=1){let Z=V[0]||k[0],ke=is(Z.path);return d`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${Z.path}"
            >${ke}</span
          >
          ${W(k,q)}
          ${B(H)}
          ${a?d`<span
                class="workspace-picker__loading"
                aria-hidden="true"
              ></span>`:""}
        </div>
      `}return d`
      <div class="workspace-picker">
        <select
          class="workspace-picker__select"
          @change=${_}
          ?disabled=${l||a}
          aria-label="Select project workspace"
        >
          ${V.map(Z=>d`
              <option
                value="${Z.path}"
                ?selected=${Z.path===H}
                title="${Z.path}"
              >
                ${is(Z.path)}
              </option>
            `)}
        </select>
        ${W(k,q)}
        ${B(H)}
        ${l||a?d`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function A(){we(O(),t)}return A(),i=e.subscribe(()=>A()),{destroy(){i&&(i(),i=null),document.removeEventListener("mousedown",w),document.removeEventListener("keydown",$),we(d``,t)}}}var mi=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-queue-set-slots","worker-queue-set-exec-default","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append"];function as(){let t=Date.now().toString(36),e=Math.random().toString(36).slice(2,8);return`${t}-${e}`}function bi(t,e,r=as()){return{id:r,type:t,payload:e}}function wi(t={}){let e=De("ws"),r={initialMs:t.backoff?.initialMs??1e3,maxMs:t.backoff?.maxMs??3e4,factor:t.backoff?.factor??2,jitterRatio:t.backoff?.jitterRatio??.2},n=()=>t.url&&t.url.length>0?t.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",i=0,l=null,a=!0,c=new Map,_=[],f=new Map,w=new Set;function $(O){for(let A of Array.from(w))try{A(O)}catch{}}function v(){if(!a||l)return;o="reconnecting",e("ws reconnecting\u2026"),$(o);let O=Math.min(r.maxMs||0,(r.initialMs||0)*Math.pow(r.factor||1,i)),A=(r.jitterRatio||0)*O,T=Math.max(0,Math.round(O+(Math.random()*2-1)*A));e("ws retry in %d ms (attempt %d)",T,i+1),l=setTimeout(()=>{l=null,W()},T)}function x(O){try{s?.send(JSON.stringify(O))}catch(A){e("ws send failed",A)}}function M(){for(o="open",e("ws open"),$(o),i=0;_.length;){let O=_.shift();O&&x(O)}}function F(O){let A;try{A=JSON.parse(String(O.data))}catch{e("ws received non-JSON message");return}if(!A||typeof A.id!="string"||typeof A.type!="string"){e("ws received invalid envelope");return}if(c.has(A.id)){let R=c.get(A.id);c.delete(A.id),A.ok?R?.resolve(A.payload):R?.reject(A.error||new Error("ws error"));return}let T=f.get(A.type);if(T&&T.size>0)for(let R of Array.from(T))try{R(A.payload)}catch(k){e("ws event handler error",k)}else e("ws received unhandled message type: %s",A.type)}function B(){o="closed",e("ws closed"),$(o);for(let[O,A]of c.entries())A.reject(new Error("ws disconnected")),c.delete(O);i+=1,v()}function W(){if(!a)return;let O=n();try{s=new WebSocket(O),e("ws connecting %s",O),o="connecting",$(o),s.addEventListener("open",M),s.addEventListener("message",F),s.addEventListener("error",()=>{}),s.addEventListener("close",B)}catch(A){e("ws connect failed %o",A),v()}}return W(),{send(O,A){if(!mi.includes(O))return Promise.reject(new Error(`unknown message type: ${O}`));let T=as(),R=bi(O,A,T);return e("send %s id=%s",O,T),new Promise((k,q)=>{c.set(T,{resolve:k,reject:q,type:O}),s&&s.readyState===s.OPEN?x(R):(e("queue %s id=%s (state=%s)",O,T,o),_.push(R))})},on(O,A){f.has(O)||f.set(O,new Set);let T=f.get(O);return T?.add(A),()=>{T?.delete(A)}},onConnection(O){return w.add(O),()=>{w.delete(O)}},reconnect(){a=!0,l&&(clearTimeout(l),l=null),i=0,W()},close(){a=!1,l&&(clearTimeout(l),l=null);try{s?.close()}catch{}},getState(){return o}}}function Ic(){let t=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof t?.workspace_config?.default_workspace=="string"&&t.workspace_config.default_workspace.length>0?t.workspace_config.default_workspace:null}}}async function Dc(t,e){try{let n=await(await fetch("/api/config")).json();t.setState({config:n})}catch(r){e("config refresh failed",r)}}var ls=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],ki=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"]],yi="worker:queue",vi="ui:order",$i="ui:display-policy",Ct="tab:board:closed",xi="beads-ui.board.closed-range";function Oc(t){let e=De("main");e("bootstrap start");let r=d`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;we(r,t);let n=document.getElementById("top-nav"),s=document.getElementById("board-root"),o=document.getElementById("worker-root"),i=document.getElementById("detail-panel");if(s&&o&&i){let k=function(h,g){let G="Request failed",Y="";if(h&&typeof h=="object"){let ye=h;if(typeof ye.message=="string"&&ye.message.length>0&&(G=ye.message),typeof ye.details=="string")Y=ye.details;else if(ye.details&&typeof ye.details=="object")try{Y=JSON.stringify(ye.details,null,2)}catch{Y=""}}else typeof h=="string"&&h.length>0&&(G=h);let oe=g&&g.length>0?`Failed to load ${g}`:"Request failed";R.open(oe,G,Y)},ge=function(h){return`${U.getState().workspace.current?.path||""}\0${h}`},Pe=function(){D&&(D().catch(()=>{}),D=null),P=null,se=null},Ue=function(h){Ae=h;let g=()=>{Ae!==h||U.getState().selected_id!==h||(Ae=null,ut(h))};if(!le){Ee.then(g);return}g()},Je=function(){let h=Or(Ke);return h===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:h}}},Ze=function(h){if(h)for(let[g,G]of ls){if(Ve.has(g)||Le.has(g))continue;let Y=g===Ct?Je():{type:G};try{Z.register(g,Y)}catch(oe){e("register %s store failed: %o",g,oe)}Le.add(g),V.subscribeList(g,Y).then(oe=>{Ve.set(g,oe)}).catch(oe=>{e("subscribe %s failed: %o",g,oe),k(oe,"board")}).finally(()=>{Le.delete(g)})}else ze()},ze=function(){for(let[h]of ls){let g=Ve.get(h);g&&(g().catch(()=>{}),Ve.delete(h));try{Z.unregister(h)}catch(G){e("unregister %s failed: %o",h,G)}}},He=function(h){if(!h){lt();return}for(let[g,G]of ki)if(!(tt.has(g)||Le.has(g))){try{Z.register(g,{type:G})}catch(Y){e("register %s store failed: %o",g,Y)}Le.add(g),V.subscribeList(g,{type:G}).then(Y=>{tt.set(g,Y)}).catch(Y=>{e("subscribe %s failed: %o",g,Y),k(Y,"worker")}).finally(()=>{Le.delete(g)})}Oe||(H("subscribe-worker-queue",{id:yi}).catch(g=>{e("subscribe-worker-queue failed: %o",g)}),Oe=()=>H("unsubscribe-worker-queue",{id:yi}))},lt=function(){for(let[h]of ki){let g=tt.get(h);g&&(g().catch(()=>{}),tt.delete(h));try{Z.unregister(h)}catch(G){e("unregister %s failed: %o",h,G)}}Oe&&(Oe().catch(()=>{}),Oe=null)},dt=function(){We||(H("subscribe-ui-order",{id:vi}).catch(h=>{e("subscribe-ui-order failed: %o",h)}),We=()=>H("unsubscribe-ui-order",{id:vi}))},_t=function(){We&&(We().catch(()=>{}),We=null),Te.clear()},fe=function(){Ce||(H("subscribe-display-policy",{id:$i}).catch(h=>{e("subscribe-display-policy failed: %o",h)}),Ce=()=>H("unsubscribe-display-policy",{id:$i}))},Ge=function(){Ce&&(Ce().catch(()=>{}),Ce=null),xe.clear()},X=function(h){if(!h)return"Unknown";let g=h.split("/").filter(Boolean);return g.length>0?g[g.length-1]:"Unknown"};var l=k,a=ge,c=Pe,_=Ue,f=Je,w=Ze,$=ze,v=He,x=lt,M=dt,F=_t,B=fe,W=Ge,O=X;let A=document.getElementById("header-loading"),T=Ks(A),R=Qo(t),q=wi(),H=T.wrapSend((h,g)=>q.send(h,g)),V=zs(H),Z=Hs(),ke=Gs(),Te=Ws(),xe=As(),ue=Es();q.on("ui-order-snapshot",h=>{let g=h;if(g&&typeof g.revision=="number")try{Te.set({revision:g.revision,order:g.order&&typeof g.order=="object"?g.order:{}})}catch{}}),q.on("display-policy-snapshot",h=>{let g=h;if(g&&g.policy&&typeof g.policy=="object")try{xe.set(g.policy)}catch{}}),q.on("session-log-snapshot",h=>{let g=h;if(g&&typeof g.attempt_id=="string")try{ue.set(g.attempt_id,Array.isArray(g.lines)?g.lines:[],typeof g.last_event_at=="number"?g.last_event_at:null)}catch{}}),q.on("session-log-append",h=>{let g=h;if(g&&typeof g.attempt_id=="string")try{ue.append(g.attempt_id,g.event)}catch{}}),q.on("snapshot",h=>{let g=h,G=g&&typeof g.id=="string"?g.id:"",Y=G?Z.getStore(G):null;if(Y&&g&&g.type==="snapshot")try{Y.applyPush(g)}catch{}}),q.on("upsert",h=>{let g=h,G=g&&typeof g.id=="string"?g.id:"",Y=G?Z.getStore(G):null;if(Y&&g&&g.type==="upsert")try{Y.applyPush(g)}catch{}}),q.on("delete",h=>{let g=h,G=g&&typeof g.id=="string"?g.id:"",Y=G?Z.getStore(G):null;if(Y&&g&&g.type==="delete")try{Y.applyPush(g)}catch{}});let D=null,P=null,se=null,Ae=null,ae=()=>{},Ee=new Promise(h=>{ae=()=>h(void 0)}),le=!1,Be=!1;async function ut(h){let g=ge(h);if(g===P||g===se)return;se=g;let G=`detail:${h}`,Y={type:"issue-detail",params:{id:h}};try{Z.register(G,Y)}catch(oe){e("register detail store failed: %o",oe)}try{let oe=await V.subscribeList(G,Y);if(U.getState().selected_id!==h||ge(h)!==g){await oe().catch(()=>{});return}D&&await D().catch(()=>{}),D=oe,P=g}catch(oe){e("detail subscribe failed: %o",oe),k(oe,"issue details")}finally{se===g&&(se=null)}}let Ve=new Map,Le=new Set,Ke=St;try{let h=window.localStorage.getItem(xi);Vt(h)&&(Ke=h)}catch{}async function et(h){if(!Vt(h)||h===Ke)return;Ke=h;try{window.localStorage.setItem(xi,h)}catch{}let g=Ve.get(Ct);if(!g)return;Ve.delete(Ct),await g().catch(()=>{});let G=Je();try{Z.register(Ct,G)}catch(Y){e("register %s store failed: %o",Ct,Y)}try{let Y=await V.subscribeList(Ct,G);Ve.set(Ct,Y)}catch(Y){e("re-subscribe %s failed: %o",Ct,Y),k(Y,"board")}}let tt=new Map,Oe=null,We=null,Ce=null;async function je(){Ce=null,xe.clear(),Oe=null;let h=U.getState().workspace.current?.path;if(h)try{await q.send("set-workspace",{path:h})}catch(g){e("workspace restore after reconnect failed: %o",g);return}fe(),He(U.getState().view==="worker")}async function E(){e("clearing all subscriptions for workspace switch"),ze(),lt(),ke.clear(),_t(),dt(),Ge(),fe(),Pe();let h=U.getState();if(h.selected_id)try{Z.unregister(`detail:${h.selected_id}`)}catch{}let g=U.getState();Ze(g.view==="board"),He(g.view==="worker"),g.selected_id&&Ue(g.selected_id)}async function N(h){e("requesting workspace switch to %s",h),Be=!0;try{let g=await q.send("set-workspace",{path:h});e("workspace switch result: %o",g),g&&g.workspace&&(U.setState({workspace:{current:{path:g.workspace.root_dir,database:g.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",h),g.changed&&(await E(),te("Switched to "+X(h),"success",2e3)))}catch(g){throw e("workspace switch failed: %o",g),te("Failed to switch workspace","error",3e3),g}finally{Be=!1}}async function re(h){e("requesting workspace git pull for %s",h);try{let g=await q.send("git-pull-workspace",{});e("workspace git pull result: %o",g);let G=g?.status;if(G==="up_to_date"){te("Already up to date","success",2e3);return}if(G==="stash_pop_conflict"){te("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}te("Git pulled "+X(h),"success",2e3)}catch(g){e("workspace git pull failed: %o",g);let G=g?.code,Y=g?.message;if(G==="rebase_conflict"){te("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(G==="rebase_conflict_abort_failed"){te("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(G==="busy"){te("Git pull skipped: another operation is running","warning",3e3);return}let oe=Y?`: ${Y}`:"";throw te(`Git pull failed${oe}`,"error",3e3),g}}async function ee(h,g){e("setting workspace visibility %s \u2192 %s",h,String(g));try{await q.send("set-workspace-visibility",{path:h,visible:g}),await ce()}catch(G){e("workspace visibility update failed: %o",G),te("Failed to update project visibility","error",3e3)}}async function ce(){try{let h=await q.send("list-workspaces",{});if(e("workspaces loaded: %o",h),h&&Array.isArray(h.workspaces)){let g=h.workspaces.map(ye=>({path:ye.path,database:ye.database,pid:ye.pid,version:ye.version})),G=h.current?{path:h.current.root_dir,database:h.current.db_path}:null,Y=Array.isArray(h.hidden)?h.hidden.filter(ye=>typeof ye=="string"):[];U.setState({workspace:{current:G,available:g,hidden:Y}});let oe=window.localStorage.getItem("beads-ui.workspace");oe&&(!g.some(kt=>kt.path===oe)||Y.includes(oe)?window.localStorage.removeItem("beads-ui.workspace"):G&&oe!==G.path&&(e("restoring saved workspace preference: %s",oe),await N(oe)))}}catch(h){e("failed to load workspaces: %o",h)}}q.on("workspace-changed",h=>{e("workspace-changed event: %o",h),h&&h.root_dir&&(U.setState({workspace:{current:{path:h.root_dir,database:h.db_path}}}),ce(),E())});let he=!1;if(typeof q.onConnection=="function"){let h=g=>{e("ws state %s",g),g==="reconnecting"||g==="closed"?(he=!0,te("Connection lost. Reconnecting\u2026","error",4e3)):g==="open"&&he&&(he=!1,te("Reconnected","success",2200),Dc(U,(G,Y)=>{e(`${G}: %o`,Y)}),je())};q.onConnection(h)}let be="board";try{let h=window.localStorage.getItem("beads-ui.view");(h==="board"||h==="worker")&&(be=h)}catch(h){e("view parse error: %o",h)}let U=Vs({config:Ic(),view:be});q.on("worker-queue-snapshot",h=>{let g=h;if(!g||!g.queue)return;let G=U.getState().workspace.current?.path;if(typeof G=="string"&&G.length>0&&g.root_dir!==G){e("dropping worker-queue snapshot for %s",String(g.root_dir));return}try{ke.set(g.queue)}catch{}});let b=js(U);b.start();let L=async(h,g)=>{try{return await H(h,g)}catch{return[]}};n&&Jo(n,U,b);let S=document.getElementById("workspace-picker");S&&gi(S,U,N,re,ee);let Q=ni(t,(h,g)=>H(h,g));try{let h=document.getElementById("new-issue-btn");h&&h.addEventListener("click",()=>Q.open())}catch{}let u=Xo(t,{policyStore:xe,transport:(h,g)=>H(h,g),labelOptions:()=>{let h=new Set;for(let[g]of ls)for(let G of Z.snapshotFor(g)||[]){let Y=G.labels;if(Array.isArray(Y))for(let oe of Y)typeof oe=="string"&&oe.length>0&&h.add(oe)}return Array.from(h).sort()}});try{let h=document.getElementById("display-settings-btn");h&&h.addEventListener("click",()=>u.open())}catch{}let m=no(s,{gotoIssue:h=>b.gotoIssue(h),issueStores:Z,transport:L,uiOrderStore:Te,displayPolicyStore:xe,closedRange:Ke,onClosedRangeChange:h=>{et(h)},onNewIssue:()=>Q.open()}),C=os(o,{transport:L,issueStores:Z,queueStore:ke,sessionLogStore:ue,uiOrderStore:Te,gotoIssue:h=>U.setState({selected_id:h}),getWorkspacePath:()=>U.getState().workspace.current?.path}),J=Ko(i,{issueStores:Z,transport:L,queueStore:ke,sessionLogStore:ue,getWorkspacePath:()=>U.getState().workspace.current?.path,onNavigate:h=>{U.getState().view==="worker"?U.setState({selected_id:h}):b.gotoIssue(h)},onClose:()=>{let h=U.getState();U.setState({selected_id:null});try{b.gotoView(h.view==="worker"?"worker":"board")}catch{}}}),pe=U.getState().selected_id;pe&&(i.hidden=!1,J.load(pe),Ue(pe)),U.subscribe(h=>{let g=h.selected_id;g?(i.hidden=!1,J.load(g),Be||Ue(g)):(J.clear(),i.hidden=!0,Pe())});let Ie=h=>{s.hidden=h.view!=="board",o.hidden=h.view!=="worker",Ze(h.view==="board"),He(h.view==="worker"),!h.selected_id&&h.view==="board"&&m.load(),h.view==="worker"&&C.load(),window.localStorage.setItem("beads-ui.view",h.view)};U.subscribe(Ie),Ie(U.getState()),dt(),fe(),ce().finally(()=>{le=!0,ae()}),window.addEventListener("keydown",h=>{let g=h.ctrlKey||h.metaKey,G=String(h.key||"").toLowerCase(),Y=h.target,oe=Y&&Y.tagName?String(Y.tagName).toLowerCase():"",ye=oe==="input"||oe==="textarea"||oe==="select"||Y&&typeof Y.isContentEditable=="boolean"&&Y.isContentEditable;g&&G==="n"&&(ye||(h.preventDefault(),Q.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let r=window.localStorage.getItem("beads-ui.theme"),n=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=r==="dark"||r==="light"?r:n?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let t=document.getElementById("theme-switch");t&&t.addEventListener("change",()=>{let r=t.checked?"dark":"light";document.documentElement.setAttribute("data-theme",r),window.localStorage.setItem("beads-ui.theme",r)});let e=document.getElementById("app");e&&Oc(e)});export{Oc as bootstrap,Ic as readBootstrapConfig,Dc as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
