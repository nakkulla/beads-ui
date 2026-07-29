var Si=Object.create;var on=Object.defineProperty;var Ti=Object.getOwnPropertyDescriptor;var Ai=Object.getOwnPropertyNames;var Ei=Object.getPrototypeOf,Ci=Object.prototype.hasOwnProperty;var Ri=(t,e,r)=>e in t?on(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r;var an=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports);var Li=(t,e,r,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of Ai(e))!Ci.call(t,s)&&s!==r&&on(t,s,{get:()=>e[s],enumerable:!(n=Ti(e,s))||n.enumerable});return t};var Ii=(t,e,r)=>(r=t!=null?Si(Ei(t)):{},Li(e||!t||!t.__esModule?on(r,"default",{value:t,enumerable:!0}):r,t));var be=(t,e,r)=>Ri(t,typeof e!="symbol"?e+"":e,r);var Es=an((Nc,As)=>{var Vt=1e3,Kt=Vt*60,Zt=Kt*60,Ot=Zt*24,Pi=Ot*7,Fi=Ot*365.25;As.exports=function(t,e){e=e||{};var r=typeof t;if(r==="string"&&t.length>0)return qi(t);if(r==="number"&&isFinite(t))return e.long?Ui(t):Bi(t);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(t))};function qi(t){if(t=String(t),!(t.length>100)){var e=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(t);if(e){var r=parseFloat(e[1]),n=(e[2]||"ms").toLowerCase();switch(n){case"years":case"year":case"yrs":case"yr":case"y":return r*Fi;case"weeks":case"week":case"w":return r*Pi;case"days":case"day":case"d":return r*Ot;case"hours":case"hour":case"hrs":case"hr":case"h":return r*Zt;case"minutes":case"minute":case"mins":case"min":case"m":return r*Kt;case"seconds":case"second":case"secs":case"sec":case"s":return r*Vt;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r;default:return}}}}function Bi(t){var e=Math.abs(t);return e>=Ot?Math.round(t/Ot)+"d":e>=Zt?Math.round(t/Zt)+"h":e>=Kt?Math.round(t/Kt)+"m":e>=Vt?Math.round(t/Vt)+"s":t+"ms"}function Ui(t){var e=Math.abs(t);return e>=Ot?Dr(t,e,Ot,"day"):e>=Zt?Dr(t,e,Zt,"hour"):e>=Kt?Dr(t,e,Kt,"minute"):e>=Vt?Dr(t,e,Vt,"second"):t+" ms"}function Dr(t,e,r,n){var s=e>=r*1.5;return Math.round(t/r)+" "+n+(s?"s":"")}});var Rs=an((Pc,Cs)=>{function zi(t){r.debug=r,r.default=r,r.coerce=a,r.disable=i,r.enable=s,r.enabled=l,r.humanize=Es(),r.destroy=c,Object.keys(t).forEach(_=>{r[_]=t[_]}),r.names=[],r.skips=[],r.formatters={};function e(_){let h=0;for(let k=0;k<_.length;k++)h=(h<<5)-h+_.charCodeAt(k),h|=0;return r.colors[Math.abs(h)%r.colors.length]}r.selectColor=e;function r(_){let h,k=null,$,v;function S(...N){if(!S.enabled)return;let P=S,q=Number(new Date),U=q-(h||q);P.diff=U,P.prev=h,P.curr=q,h=q,N[0]=r.coerce(N[0]),typeof N[0]!="string"&&N.unshift("%O");let D=0;N[0]=N[0].replace(/%([a-zA-Z%])/g,(A,x)=>{if(A==="%%")return"%";D++;let g=r.formatters[x];if(typeof g=="function"){let M=N[D];A=g.call(P,M),N.splice(D,1),D--}return A}),r.formatArgs.call(P,N),(P.log||r.log).apply(P,N)}return S.namespace=_,S.useColors=r.useColors(),S.color=r.selectColor(_),S.extend=n,S.destroy=r.destroy,Object.defineProperty(S,"enabled",{enumerable:!0,configurable:!1,get:()=>k!==null?k:($!==r.namespaces&&($=r.namespaces,v=r.enabled(_)),v),set:N=>{k=N}}),typeof r.init=="function"&&r.init(S),S}function n(_,h){let k=r(this.namespace+(typeof h>"u"?":":h)+_);return k.log=this.log,k}function s(_){r.save(_),r.namespaces=_,r.names=[],r.skips=[];let h=(typeof _=="string"?_:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let k of h)k[0]==="-"?r.skips.push(k.slice(1)):r.names.push(k)}function o(_,h){let k=0,$=0,v=-1,S=0;for(;k<_.length;)if($<h.length&&(h[$]===_[k]||h[$]==="*"))h[$]==="*"?(v=$,S=k,$++):(k++,$++);else if(v!==-1)$=v+1,S++,k=S;else return!1;for(;$<h.length&&h[$]==="*";)$++;return $===h.length}function i(){let _=[...r.names,...r.skips.map(h=>"-"+h)].join(",");return r.enable(""),_}function l(_){for(let h of r.skips)if(o(_,h))return!1;for(let h of r.names)if(o(_,h))return!0;return!1}function a(_){return _ instanceof Error?_.stack||_.message:_}function c(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return r.enable(r.load()),r}Cs.exports=zi});var Ls=an((at,Or)=>{at.formatArgs=Wi;at.save=Gi;at.load=ji;at.useColors=Hi;at.storage=Yi();at.destroy=(()=>{let t=!1;return()=>{t||(t=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();at.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function Hi(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let t;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(t=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(t[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function Wi(t){if(t[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+t[0]+(this.useColors?"%c ":" ")+"+"+Or.exports.humanize(this.diff),!this.useColors)return;let e="color: "+this.color;t.splice(1,0,e,"color: inherit");let r=0,n=0;t[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(r++,s==="%c"&&(n=r))}),t.splice(n,0,e)}at.log=console.debug||console.log||(()=>{});function Gi(t){try{t?at.storage.setItem("debug",t):at.storage.removeItem("debug")}catch{}}function ji(){let t;try{t=at.storage.getItem("debug")||at.storage.getItem("DEBUG")}catch{}return!t&&typeof process<"u"&&"env"in process&&(t=process.env.DEBUG),t}function Yi(){try{return localStorage}catch{}}Or.exports=Rs()(at);var{formatters:Vi}=Or.exports;Vi.j=function(t){try{return JSON.stringify(t)}catch(e){return"[UnexpectedJSONParseError]: "+e.message}}});var ir=globalThis,Lr=ir.trustedTypes,_s=Lr?Lr.createPolicy("lit-html",{createHTML:t=>t}):void 0,ys="$lit$",xt=`lit$${Math.random().toFixed(9).slice(2)}$`,vs="?"+xt,Di=`<${vs}>`,It=document,ar=()=>It.createComment(""),lr=t=>t===null||typeof t!="object"&&typeof t!="function",hn=Array.isArray,Oi=t=>hn(t)||typeof t?.[Symbol.iterator]=="function",ln=`[ 	
\f\r]`,or=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,gs=/-->/g,ms=/>/g,Rt=RegExp(`>|${ln}(?:([^\\s"'>=/]+)(${ln}*=${ln}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),bs=/'/g,ws=/"/g,$s=/^(?:script|style|textarea|title)$/i,_n=t=>(e,...r)=>({_$litType$:t,strings:e,values:r}),d=_n(1),Rc=_n(2),Lc=_n(3),Dt=Symbol.for("lit-noChange"),Ie=Symbol.for("lit-nothing"),ks=new WeakMap,Lt=It.createTreeWalker(It,129);function xs(t,e){if(!hn(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return _s!==void 0?_s.createHTML(e):e}var Mi=(t,e)=>{let r=t.length-1,n=[],s,o=e===2?"<svg>":e===3?"<math>":"",i=or;for(let l=0;l<r;l++){let a=t[l],c,_,h=-1,k=0;for(;k<a.length&&(i.lastIndex=k,_=i.exec(a),_!==null);)k=i.lastIndex,i===or?_[1]==="!--"?i=gs:_[1]!==void 0?i=ms:_[2]!==void 0?($s.test(_[2])&&(s=RegExp("</"+_[2],"g")),i=Rt):_[3]!==void 0&&(i=Rt):i===Rt?_[0]===">"?(i=s??or,h=-1):_[1]===void 0?h=-2:(h=i.lastIndex-_[2].length,c=_[1],i=_[3]===void 0?Rt:_[3]==='"'?ws:bs):i===ws||i===bs?i=Rt:i===gs||i===ms?i=or:(i=Rt,s=void 0);let $=i===Rt&&t[l+1].startsWith("/>")?" ":"";o+=i===or?a+Di:h>=0?(n.push(c),a.slice(0,h)+ys+a.slice(h)+xt+$):a+xt+(h===-2?l:$)}return[xs(t,o+(t[r]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),n]},cr=class t{constructor({strings:e,_$litType$:r},n){let s;this.parts=[];let o=0,i=0,l=e.length-1,a=this.parts,[c,_]=Mi(e,r);if(this.el=t.createElement(c,n),Lt.currentNode=this.el.content,r===2||r===3){let h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(s=Lt.nextNode())!==null&&a.length<l;){if(s.nodeType===1){if(s.hasAttributes())for(let h of s.getAttributeNames())if(h.endsWith(ys)){let k=_[i++],$=s.getAttribute(h).split(xt),v=/([.?@])?(.*)/.exec(k);a.push({type:1,index:o,name:v[2],strings:$,ctor:v[1]==="."?dn:v[1]==="?"?un:v[1]==="@"?pn:jt}),s.removeAttribute(h)}else h.startsWith(xt)&&(a.push({type:6,index:o}),s.removeAttribute(h));if($s.test(s.tagName)){let h=s.textContent.split(xt),k=h.length-1;if(k>0){s.textContent=Lr?Lr.emptyScript:"";for(let $=0;$<k;$++)s.append(h[$],ar()),Lt.nextNode(),a.push({type:2,index:++o});s.append(h[k],ar())}}}else if(s.nodeType===8)if(s.data===vs)a.push({type:2,index:o});else{let h=-1;for(;(h=s.data.indexOf(xt,h+1))!==-1;)a.push({type:7,index:o}),h+=xt.length-1}o++}}static createElement(e,r){let n=It.createElement("template");return n.innerHTML=e,n}};function Gt(t,e,r=t,n){if(e===Dt)return e;let s=n!==void 0?r._$Co?.[n]:r._$Cl,o=lr(e)?void 0:e._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(t),s._$AT(t,r,n)),n!==void 0?(r._$Co??(r._$Co=[]))[n]=s:r._$Cl=s),s!==void 0&&(e=Gt(t,s._$AS(t,e.values),s,n)),e}var cn=class{constructor(e,r){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:r},parts:n}=this._$AD,s=(e?.creationScope??It).importNode(r,!0);Lt.currentNode=s;let o=Lt.nextNode(),i=0,l=0,a=n[0];for(;a!==void 0;){if(i===a.index){let c;a.type===2?c=new dr(o,o.nextSibling,this,e):a.type===1?c=new a.ctor(o,a.name,a.strings,this,e):a.type===6&&(c=new fn(o,this,e)),this._$AV.push(c),a=n[++l]}i!==a?.index&&(o=Lt.nextNode(),i++)}return Lt.currentNode=It,s}p(e){let r=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(e,n,r),r+=n.strings.length-2):n._$AI(e[r])),r++}},dr=class t{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,r,n,s){this.type=2,this._$AH=Ie,this._$AN=void 0,this._$AA=e,this._$AB=r,this._$AM=n,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,r=this._$AM;return r!==void 0&&e?.nodeType===11&&(e=r.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,r=this){e=Gt(this,e,r),lr(e)?e===Ie||e==null||e===""?(this._$AH!==Ie&&this._$AR(),this._$AH=Ie):e!==this._$AH&&e!==Dt&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Oi(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==Ie&&lr(this._$AH)?this._$AA.nextSibling.data=e:this.T(It.createTextNode(e)),this._$AH=e}$(e){let{values:r,_$litType$:n}=e,s=typeof n=="number"?this._$AC(e):(n.el===void 0&&(n.el=cr.createElement(xs(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===s)this._$AH.p(r);else{let o=new cn(s,this),i=o.u(this.options);o.p(r),this.T(i),this._$AH=o}}_$AC(e){let r=ks.get(e.strings);return r===void 0&&ks.set(e.strings,r=new cr(e)),r}k(e){hn(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,n,s=0;for(let o of e)s===r.length?r.push(n=new t(this.O(ar()),this.O(ar()),this,this.options)):n=r[s],n._$AI(o),s++;s<r.length&&(this._$AR(n&&n._$AB.nextSibling,s),r.length=s)}_$AR(e=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);e!==this._$AB;){let n=e.nextSibling;e.remove(),e=n}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},jt=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,r,n,s,o){this.type=1,this._$AH=Ie,this._$AN=void 0,this.element=e,this.name=r,this._$AM=s,this.options=o,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=Ie}_$AI(e,r=this,n,s){let o=this.strings,i=!1;if(o===void 0)e=Gt(this,e,r,0),i=!lr(e)||e!==this._$AH&&e!==Dt,i&&(this._$AH=e);else{let l=e,a,c;for(e=o[0],a=0;a<o.length-1;a++)c=Gt(this,l[n+a],r,a),c===Dt&&(c=this._$AH[a]),i||(i=!lr(c)||c!==this._$AH[a]),c===Ie?e=Ie:e!==Ie&&(e+=(c??"")+o[a+1]),this._$AH[a]=c}i&&!s&&this.j(e)}j(e){e===Ie?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},dn=class extends jt{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===Ie?void 0:e}},un=class extends jt{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==Ie)}},pn=class extends jt{constructor(e,r,n,s,o){super(e,r,n,s,o),this.type=5}_$AI(e,r=this){if((e=Gt(this,e,r,0)??Ie)===Dt)return;let n=this._$AH,s=e===Ie&&n!==Ie||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,o=e!==Ie&&(n===Ie||s);s&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},fn=class{constructor(e,r,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=r,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){Gt(this,e)}};var Ni=ir.litHtmlPolyfillSupport;Ni?.(cr,dr),(ir.litHtmlVersions??(ir.litHtmlVersions=[])).push("3.3.1");var _e=(t,e,r)=>{let n=r?.renderBefore??e,s=n._$litPart$;if(s===void 0){let o=r?.renderBefore??null;n._$litPart$=s=new dr(e.insertBefore(ar(),o),o,void 0,r??{})}return s._$AI(t),s};var St="today",ur=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}];function Yt(t){return t==="today"||t==="7d"||t==="30d"||t==="all"}function Ir(t,e=Date.now()){switch(t){case"today":{let r=new Date(e);return r.setHours(0,0,0,0),r.getTime()}case"7d":return e-7*864e5;case"30d":return e-30*864e5;case"all":default:return}}function Ss(){let t=null,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{get(){return t},set(n){t=n,r()},clear(){t=null,r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}function Ts(){let t=new Map,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{set(n,s){t.set(n,{lines:Array.isArray(s)?[...s]:[]}),r()},append(n,s){let o=t.get(n)||{lines:[]};o.lines=[...o.lines,s],t.set(n,o),r()},get(n){return t.get(n)||null},clear(n){typeof n=="string"?t.delete(n):t.clear(),r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}var Is=Ii(Ls(),1);function Ce(t){return(0,Is.default)(`beads-ui:${t}`)}function _t(t){if(typeof t=="number")return Number.isFinite(t)?t:0;if(typeof t=="string"){let e=Date.parse(t);return Number.isFinite(e)?e:0}return 0}function Mt(t,e){let r=_t(t.created_at),n=_t(e.created_at);if(r!==n)return r<n?1:-1;let s=t.priority??2,o=e.priority??2;if(s!==o)return s-o;let i=t.id,l=e.id;return i<l?-1:i>l?1:0}function Ms(t,e){let r=_t(t.created_at),n=_t(e.created_at);if(r!==n)return r<n?-1:1;let s=t.priority??2,o=e.priority??2;if(s!==o)return s-o;let i=t.id,l=e.id;return i<l?-1:i>l?1:0}function Ns(t,e){let r=_t(t.updated_at),n=_t(e.updated_at);if(r!==n)return r<n?1:-1;let s=t.id,o=e.id;return s<o?-1:s>o?1:0}function Ps(t,e){let r=t.priority??2,n=e.priority??2;if(r!==n)return r-n;let s=_t(t.created_at),o=_t(e.created_at);if(s!==o)return s<o?1:-1;let i=t.id,l=e.id;return i<l?-1:i>l?1:0}function Fs(t,e){let r=t.closed_at??0,n=e.closed_at??0;if(r!==n)return r<n?1:-1;let s=t?.id,o=e?.id;return s<o?-1:s>o?1:0}var Ki=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function Ds(t){let e=t&&t.metadata,r=e?e.task_order:void 0;if(r==null||r==="")return Number.POSITIVE_INFINITY;let n=Number(r);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function Os(t){let e=t&&t.title;if(typeof e!="string")return Number.POSITIVE_INFINITY;let r=Ki.exec(e);if(!r)return Number.POSITIVE_INFINITY;let n=Number(r[1]);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function qs(t,e){let r=Ds(t),n=Ds(e);if(r!==n)return r<n?-1:1;let s=Os(t),o=Os(e);if(s!==o)return s<o?-1:1;let i=_t(t&&t.created_at),l=_t(e&&e.created_at);if(i!==l)return i<l?-1:1;let a=t&&t.id,c=e&&e.id;return a===c?0:String(a)<String(c)?-1:1}var gn=2**20;function Xt(t,e){let r=t&&t.id;return e&&typeof r=="string"&&Object.prototype.hasOwnProperty.call(e,r)&&typeof e[r]=="number"&&Number.isFinite(e[r])?e[r]:-_t(t&&t.created_at)}function Mr(t){return(e,r)=>{let n=Xt(e,t),s=Xt(r,t);if(n!==s)return n<s?-1:1;let o=e?.id,i=r?.id;return o<i?-1:o>i?1:0}}function mn(t,e,r){let n=Array.isArray(t)?t:[],s=n.length,o=Math.max(0,Math.min(e,s-1)),i=o-1>=0?n[o-1]:null,l=o+1<s?n[o+1]:null;if(!i&&!l)return{rank:0};if(!i)return{rank:Xt(l,r)-gn};if(!l)return{rank:Xt(i,r)+gn};let a=Xt(i,r),c=Xt(l,r),_=(a+c)/2;return a<_&&_<c?{rank:_}:{renormalize:n.map((h,k)=>({bead_id:h.id,rank:k*gn}))}}function bn(t,e={}){let r=Ce(`issue-store:${t}`),n=new Map,s=[],o=0,i=new Set,l=!1,a=e.sort||Mt;function c(){for(let k of Array.from(i))try{k()}catch{}}function _(){s=Array.from(n.values()).sort(a)}function h(k){if(l||!k||k.id!==t)return;let $=Number(k.revision)||0;if(r("apply %s rev=%d",k.type,$),!($<=o&&k.type!=="snapshot")){if(k.type==="snapshot"){if($<=o)return;n.clear();let v=Array.isArray(k.issues)?k.issues:[];for(let S of v)S&&typeof S.id=="string"&&S.id.length>0&&n.set(S.id,S);_(),o=$,c();return}if(k.type==="upsert"){let v=k.issue;if(v&&typeof v.id=="string"&&v.id.length>0){let S=n.get(v.id);if(!S)n.set(v.id,v);else{let N=Number.isFinite(S.updated_at)?S.updated_at:0,P=Number.isFinite(v.updated_at)?v.updated_at:0;if(N<=P){for(let q of Object.keys(S))q in v||delete S[q];for(let[q,U]of Object.entries(v))S[q]=U}}_()}o=$,c()}else if(k.type==="delete"){let v=String(k.issue_id||"");v&&(n.delete(v),_()),o=$,c()}}}return{id:t,subscribe(k){return i.add(k),()=>{i.delete(k)}},applyPush:h,snapshot(){return s},size(){return n.size},getById(k){return n.get(k)},dispose(){l=!0,n.clear(),s=[],i.clear(),o=0}}}function Nr(t){let e=String(t.type||"").trim(),r={};if(t.params&&typeof t.params=="object"){let s=Object.keys(t.params).sort();for(let o of s){let i=t.params[o];r[o]=String(i)}}let n=new URLSearchParams(r).toString();return n.length>0?`${e}?${n}`:e}function Bs(t){let e=Ce("subs"),r=new Map,n=new Map;function s(l,a){e("applyDelta %s +%d ~%d -%d",l,(a.added||[]).length,(a.updated||[]).length,(a.removed||[]).length);let c=n.get(l);if(!c||c.size===0)return;let _=Array.isArray(a.added)?a.added:[],h=Array.isArray(a.updated)?a.updated:[],k=Array.isArray(a.removed)?a.removed:[];for(let $ of Array.from(c)){let v=r.get($);if(!v)continue;let S=v.itemsById;for(let N of _)typeof N=="string"&&N.length>0&&S.set(N,!0);for(let N of h)typeof N=="string"&&N.length>0&&S.set(N,!0);for(let N of k)typeof N=="string"&&N.length>0&&S.delete(N)}}async function o(l,a){let c=Nr(a);if(e("subscribe %s key=%s",l,c),!r.has(l))r.set(l,{key:c,itemsById:new Map});else{let h=r.get(l);if(h&&h.key!==c){let k=n.get(h.key);k&&(k.delete(l),k.size===0&&n.delete(h.key)),r.set(l,{key:c,itemsById:new Map})}}n.has(c)||n.set(c,new Set);let _=n.get(c);_&&_.add(l);try{await t("subscribe-list",{id:l,type:a.type,params:a.params})}catch(h){let k=r.get(l)||null;if(k){let $=n.get(k.key);$&&($.delete(l),$.size===0&&n.delete(k.key))}throw r.delete(l),h}return async()=>{e("unsubscribe %s key=%s",l,c);try{await t("unsubscribe-list",{id:l})}catch{}let h=r.get(l)||null;if(h){let k=n.get(h.key);k&&(k.delete(l),k.size===0&&n.delete(h.key))}r.delete(l)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:Nr,selectors:{getIds(l){let a=r.get(l);return a?Array.from(a.itemsById.keys()):[]},has(l,a){let c=r.get(l);return c?c.itemsById.has(a):!1},count(l){let a=r.get(l);return a?a.itemsById.size:0},getItemsById(l){let a=r.get(l),c={};if(!a)return c;for(let _ of a.itemsById.keys())c[_]=!0;return c}}}}function Us(){let t=Ce("issue-stores"),e=new Map,r=new Map,n=new Set,s=new Map;function o(){for(let a of Array.from(n))try{a()}catch{}}function i(a,c,_){let h=c?Nr(c):"",k=r.get(a)||"",$=e.has(a);if(t("register %s key=%s (prev=%s)",a,h,k),$&&k&&h&&k!==h){let v=e.get(a);if(v)try{v.dispose()}catch{}let S=s.get(a);if(S){try{S()}catch{}s.delete(a)}let N=bn(a,_);e.set(a,N);let P=N.subscribe(()=>o());s.set(a,P)}else if(!$){let v=bn(a,_);e.set(a,v);let S=v.subscribe(()=>o());s.set(a,S)}return r.set(a,h),()=>l(a)}function l(a){t("unregister %s",a),r.delete(a);let c=e.get(a);c&&(c.dispose(),e.delete(a));let _=s.get(a);if(_){try{_()}catch{}s.delete(a)}}return{register:i,unregister:l,getStore(a){return e.get(a)||null},snapshotFor(a){let c=e.get(a);return c?c.snapshot().slice():[]},subscribe(a){return n.add(a),()=>n.delete(a)}}}function zs(){let t=null,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{get(){return t},set(n){t=n,r()},clear(){t=null,r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}function Hs(){let t=null,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{get(){return t},set(n){t=n,r()},clear(){t=null,r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}function wn(t,e){return`#/${t==="worker"?"worker":"board"}?issue=${encodeURIComponent(e)}`}function Zi(t){let e=String(t||""),r=e.startsWith("#")?e.slice(1):e,n=r.indexOf("?"),s=n>=0?r.slice(n+1):"";if(s){let l=new URLSearchParams(s).get("issue");if(l)return decodeURIComponent(l)}let o=/^\/issue\/([^\s?#]+)/.exec(r);return o&&o[1]?decodeURIComponent(o[1]):null}function Xi(t){let e=String(t||"");return/^#\/worker(\b|\/|$)/.test(e)?"worker":"board"}function Ws(t){let e=Ce("router"),r=()=>{let n=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(n),o=s&&s[1]?decodeURIComponent(s[1]):Zi(n),i=Xi(n);if(e("hash change \u2192 view=%s id=%s",i,o),t.setState({selected_id:i==="worker"?null:o,view:i,worker:{selected_parent_id:i==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(n)){let a=o?`#/${i}?issue=${encodeURIComponent(o)}`:`#/${i}`;window.location.hash!==a&&(window.location.hash=a)}};return{start(){window.addEventListener("hashchange",r),r()},stop(){window.removeEventListener("hashchange",r)},gotoIssue(n){let o=(t.getState?t.getState():{view:"board"}).view==="worker"?"worker":"board",i=wn(o,n);e("goto issue %s (view=%s)",n,o),window.location.hash!==i?window.location.hash=i:t.setState({selected_id:o==="worker"?null:n,view:o,worker:{selected_parent_id:o==="worker"?n:null}})},gotoView(n){let s=t.getState?t.getState():{selected_id:null,worker:{selected_parent_id:null}},o=n==="worker"?s.worker?.selected_parent_id:s.selected_id,i=o?wn(n,o):`#/${n}`;e("goto view %s (id=%s)",n,o||""),window.location.hash!==i?window.location.hash=i:t.setState({view:n,selected_id:n==="worker"?null:s.selected_id})}}}var Qi=Object.freeze({workspace_config:{default_workspace:null}});function Gs(t){return{workspace_config:{default_workspace:typeof t?.workspace_config?.default_workspace=="string"&&t.workspace_config.default_workspace.length>0?t.workspace_config.default_workspace:Qi.workspace_config.default_workspace}}}function js(t={}){let e=Ce("state"),r={selected_id:t.selected_id??null,view:t.view??"board",filters:{status:t.filters?.status??"all",search:t.filters?.search??"",type:typeof t.filters?.type=="string"?t.filters?.type:""},board:{closed_filter:t.board?.closed_filter==="3"||t.board?.closed_filter==="7"||t.board?.closed_filter==="today"?t.board?.closed_filter:"today",show_deferred_column:t.board?.show_deferred_column===!0},worker:{selected_parent_id:t.worker?.selected_parent_id??null,show_closed_children:Array.isArray(t.worker?.show_closed_children)?t.worker.show_closed_children:[]},workspace:{current:t.workspace?.current??null,available:t.workspace?.available??[],hidden:t.workspace?.hidden??[]},config:Gs(t.config)},n=new Set;function s(){for(let o of Array.from(n))try{o(r)}catch{}}return{getState(){return r},setState(o){let i={...r,...o,filters:{...r.filters,...o.filters||{}},board:{...r.board,...o.board||{}},worker:{...r.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:r.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:r.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:r.workspace.hidden},config:o.config!==void 0?Gs(o.config):r.config},l=i.workspace.current?.path!==r.workspace.current?.path||i.workspace.available.length!==r.workspace.available.length||i.workspace.hidden.length!==r.workspace.hidden.length||i.workspace.hidden.some((c,_)=>c!==r.workspace.hidden[_]),a=i.config.workspace_config.default_workspace!==r.config.workspace_config.default_workspace;i.selected_id===r.selected_id&&i.view===r.view&&i.filters.status===r.filters.status&&i.filters.search===r.filters.search&&i.filters.type===r.filters.type&&i.board.closed_filter===r.board.closed_filter&&i.board.show_deferred_column===r.board.show_deferred_column&&i.worker.selected_parent_id===r.worker.selected_parent_id&&i.worker.show_closed_children.length===r.worker.show_closed_children.length&&i.worker.show_closed_children.every((c,_)=>c===r.worker.show_closed_children[_])&&!l&&!a||(r=i,e("state change %o",{selected_id:r.selected_id,view:r.view,filters:r.filters,board:r.board,worker:r.worker,workspace:r.workspace.current?.path,config:{default_workspace:r.config.workspace_config.default_workspace}}),s())},subscribe(o){return n.add(o),()=>n.delete(o)}}}function Ys(t){let e=Ce("activity"),r=0,n=new Map,s=1;function o(){if(!t)return;let c=r>0;t.toggleAttribute("hidden",!c),t.setAttribute("aria-busy",c?"true":"false")}function i(){r+=1,e("start count=%d",r),o()}function l(){let c=r;r=Math.max(0,r-1),c<=0?e("done called but count was already %d",c):e("done count=%d\u2192%d",c,r),o()}function a(c){return async(h,k)=>{let $=s++,v=Date.now();n.set($,{type:h,start_ts:v}),e("request start id=%d type=%s count=%d",$,h,r+1),i();let S=!1,N=()=>{S||(S=!0,n.delete($),l())},P=setTimeout(()=>{S||(e("request TIMEOUT id=%d type=%s elapsed=%dms",$,h,Date.now()-v),N())},3e4);try{let q=await c(h,k),U=Date.now()-v;return e("request done id=%d type=%s elapsed=%dms",$,h,U),q}catch(q){let U=Date.now()-v;throw e("request error id=%d type=%s elapsed=%dms err=%o",$,h,U,q),q}finally{clearTimeout(P),N()}}}return o(),{wrapSend:a,start:i,done:l,getCount:()=>r,getActiveRequests:()=>{let c=Date.now();return Array.from(n.entries()).map(([_,h])=>({id:_,type:h.type,elapsed_ms:c-h.start_ts}))}}}function J(t,e="info",r=2800){let n=document.createElement("div");n.className="toast",n.textContent=t,n.style.position="fixed",n.style.right="12px",n.style.bottom="12px",n.style.zIndex="1000",n.style.color="#fff",n.style.padding="8px 10px",n.style.borderRadius="4px",n.style.fontSize="12px",e==="success"?n.style.background="#156d36":e==="warning"?n.style.background="#a36a00":e==="error"?n.style.background="#9f2011":n.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(n),setTimeout(()=>{try{n.remove()}catch{}},r)}function Pr(t=void 0,e=void 0){function r(){if(!e||typeof e.get!="function")return null;let o=e.get();return o&&o.order?o.order:{}}function n(o,i,l){let a=t&&t.snapshotFor?t.snapshotFor(o).slice():[];if(i==="closed")return a.sort(Fs),a;switch(l){case"created_desc":return a.sort(Mt),a;case"created_asc":return a.sort(Ms),a;case"updated_desc":return a.sort(Ns),a;case"priority":return a.sort(Ps),a;case"manual":default:{let c=r();return c?a.sort(Mr(c)):a.sort(Mt),a}}}function s(o){let i=[];return t&&typeof t.subscribe=="function"&&i.push(t.subscribe(o)),e&&typeof e.subscribe=="function"&&i.push(e.subscribe(o)),()=>{for(let l of i)try{l()}catch{}}}return{selectBoardColumn:n,subscribe:s}}function Fr(t){let e=t.transport,r=t.uiOrderStore;function n(i,l){return"renormalize"in i?i.renormalize:[{bead_id:l,rank:i.rank}]}function s(i,l){let a={...i.order};for(let c of l)a[c.bead_id]=c.rank;r&&r.set({revision:i.revision,order:a})}async function o(i,l,a){if(!e||!r)return;let c=r.get()||{revision:0,order:{}},_=n(mn(l,a,c.order),i);s(c,_);let h=await e("ui-order-set",{expected_revision:c.revision,entries:_});if(h&&h.conflict){let k={revision:typeof h.revision=="number"?h.revision:0,order:h.order||{}};r.set(k);let $=n(mn(l,a,k.order),i);s(k,$);let v=await e("ui-order-set",{expected_revision:k.revision,entries:$});v&&v.applied&&r.set({revision:typeof v.revision=="number"?v.revision:0,order:v.order||{}})}else h&&h.applied&&r.set({revision:typeof h.revision=="number"?h.revision:0,order:h.order||{}})}return{applyReorder:o}}function qr(t){return Array.isArray(t)?t.filter(e=>typeof e=="string"):[]}function kn(t,e){return!e||typeof t!="string"||t.length===0||qr(e.visible_labels).includes(t)?!0:qr(e.hidden_labels).includes(t)?!1:!qr(e.hidden_prefixes).some(r=>r.length>0&&t.startsWith(r))}function Vs(t,e){return qr(t).filter(r=>kn(r,e))}function Nt(t,e){let r=t&&t.chips?t.chips[e]:void 0;return typeof r=="boolean"?r:!0}function yn(t){if(!t)return null;if(typeof t=="number")return Number.isFinite(t)?t:null;let e=Date.parse(t);return Number.isFinite(e)?e:null}function gt(t){let e=yn(t);if(e===null)return"";let r=new Date(e),n=s=>String(s).padStart(2,"0");return`${r.getFullYear()}-${n(r.getMonth()+1)}-${n(r.getDate())} ${n(r.getHours())}:${n(r.getMinutes())}`}function Qt(t,e){let r=yn(t);if(r===null)return"";let s=(typeof e=="number"?e:Date.now())-r;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let i=Math.floor(s/36e5);if(i<24)return`${i}\uC2DC\uAC04 \uC804`;let l=Math.floor(s/864e5);if(l<7)return`${l}\uC77C \uC804`;let a=Math.floor(l/7);if(l<30)return`${a}\uC8FC \uC804`;let c=Math.floor(l/30);return c<12?`${c}\uAC1C\uC6D4 \uC804`:`${Math.floor(l/365)}\uB144 \uC804`}var Ji={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg"},ea={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge"},ta={spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},ra={reviewed:"\u2713",skip:"\u2298",stale:"\u2713"};function na(t,e,r){if(!(r==="in_progress"||r==="resolved"))return null;for(let s of t)if(e[s]&&e[s].state==="dim")return s;return null}function sa(t,e,r){let n=Ji[t]||t,s=e&&e.state||"empty",o=ra[s]||"",i="bar";s==="dim"?i+=` b-${n} dim`:s==="on"||s==="reviewed"||s==="skip"?i+=` b-${n} on`:s==="stale"&&(i+=` b-${n} stale`),r&&(i+=" glow");let l=s==="empty"?"lbl":`lbl l-${n} on`,a=r?`color: var(--stage-${n}-on)`:"";return d`
    <div class="seg">
      <div class=${i} style=${a}>${o}</div>
      <div class=${l}>
        ${ea[t]||t}
      </div>
    </div>
  `}function Br(t,e){if(!t||!t.stages)return"";let r=t.route==="full_plan"?"full_plan":"spec_backed",n=ta[r],s=t.stages,o=na(n,s,String(e||"open"));return d`
    <div class="stp" role="img" aria-label="워크플로우 진행 스테퍼">
      ${n.map(i=>sa(i,s[i]||{state:"empty"},i===o))}
    </div>
  `}function oa(t){return typeof t!="number"||!Number.isFinite(t)?"":`P${Math.max(0,Math.min(4,t))}`}var Ks=2;function ia(t){if(!t)return[];let e=[];if(t.external){let n=t.reason?`\u23F8 blocked: ${t.reason}`:"\u23F8 blocked";e.push(d`<span class="ctl-chip ctl-chip--blocked">${n}</span>`)}let r=Array.isArray(t.blockers)?t.blockers:[];if(r.length>0){let n=r.slice(0,Ks).join(", "),s=r.length-Ks,o=`\u26D3 blocked: ${n}${s>0?` +${s}`:""}`;e.push(d`<span class="ctl-chip ctl-chip--blocked-dep">${o}</span>`)}return e}function aa(t,e){let r=e.policy||null,n=t.workflow&&t.workflow.chips||{},s=[];if(n.route&&Nt(r,"route")){let o=n.route_source==="derived";s.push(d`<span
        class="ctl-chip ctl-chip--route${o?" is-derived":""}"
        title=${o?"route \uCD94\uB860\uAC12 (metadata \uBBF8\uD540)":"route"}
        >${o?`${n.route} ?`:n.route}</span
      >`)}if(n.fast_track&&Nt(r,"fast_track")&&s.push(d`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),n.pr&&Nt(r,"pr")){let o=n.pr.number;s.push(d`<span class="ctl-chip ctl-chip--pr"
        >${`PR${o!=null?` #${o}`:""}`}</span
      >`)}for(let o of Vs(t.labels,r))s.push(d`<span class="ctl-chip ctl-chip--label">${o}</span>`);return t.from_id&&Nt(r,"from")&&s.push(d`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${t.from_id} \uC5F4\uAE30`}
        @click=${o=>{o.stopPropagation(),e.onFromChipClick&&e.onFromChipClick(o,String(t.from_id))}}
      >
        ↩ from ${t.from_id}
      </button>`),Nt(r,"blocked")&&s.push(...ia(t.blocked_info)),s.length===0?"":d`<div class="board-card__chips">${s}</div>`}function la(t){switch(t){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function ca(t){let e=Qt(t.created_at),r=Qt(t.updated_at);return!e&&!r?"":d`<span class="board-card__times">
    ${e?d`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${gt(t.created_at)}`}
          >생성 ${e}</span
        >`:""}
    ${e&&r?d`<span class="board-card__time-sep">·</span>`:""}
    ${r?d`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${gt(t.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </span>`}function da(t,e){let r=e.rollupFor?e.rollupFor(t.id):{total:0,count:0,current:null,children:[]},n=r.total||0,s=e.isExpanded?e.isExpanded(t.id):!0,o=n>0?r.children.slice().sort(qs):r.children;return d`
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
        ${ca(t)}
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
                  <span class=${la(i.status)}>●</span>
                  <span class="board-card__roll-child-ord">${l+1}</span>
                  <span class="board-card__roll-child-title"
                    >${i.title||i.id}</span
                  >
                </button>`)}
          </div>`:""}
    </div>
  `}function Zs(t,e){let r=oa(t.priority);return d`
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
      ${aa(t,e)}
      ${t.workflow&&Nt(e.policy||null,"stepper")?Br(t.workflow,t.status):""}
      ${da(t,e)}
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
              ${ur.map(o=>d`<option
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
        ${t.items.map(o=>Zs(o,e))}
      </div>
    </section>
  `}var ua=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],pa=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],fa=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function ha(t,e,r){let n=t.labels.length,s=n>0?`\uB77C\uBCA8 ${n}`:"\uB77C\uBCA8";return d`
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
  `}function Xs(t,e,r){return d`
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
        ${ua.map(n=>d`<option
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
        ${pa.map(n=>d`<option
              value=${n.value}
              ?selected=${t.type===n.value}
            >
              ${n.label}
            </option>`)}
      </select>
      ${ha(t,e,r)}
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
        ${fa.map(n=>d`<option
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
  `}var _a=200,ga={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","deferred-col":"deferred","closed-col":"closed"},ma=new Set(["blocked-col","ready-col","in-progress-col","resolved-col","deferred-col"]),Qs="beads-ui.board.sort",Js=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function ba(){try{let t=window.localStorage.getItem(Qs);if(t&&Js.has(t))return t}catch{}return"created_desc"}function eo(t,e){let r=Ce("views:board"),n=e.gotoIssue,s=e.issueStores,o=e.transport,i=e.uiOrderStore,l=e.displayPolicyStore,a=e.onClosedRangeChange,c=e.onNewIssue,_=e.closedRange||St,h=s?Pr(s,i):null,k=Fr({transport:o,uiOrderStore:i}),$=[],v=[],S=[],N=[],P=[],q=[],U=!1,D=0,E=ba(),A=new Map,x=new Map,g=new Map,M=new Set,B={search:"",priority:"",type:"",labels:[]},j=!1,V=null;function $e(C){return String(C.status||"open")==="open"}function Ne(C){let O=String(C.status||"open");return O==="open"||O==="blocked"}function ye(C){let O=B.search.trim().toLowerCase(),ee=B.priority,Q=B.type,K=B.labels;return C.filter(se=>{if(O){let de=String(se.id||"").toLowerCase(),he=String(se.title||"").toLowerCase();if(!de.includes(O)&&!he.includes(O))return!1}if(ee!==""&&String(se.priority)!==ee||Q!==""&&String(se.issue_type||"")!==Q)return!1;if(K.length>0){let de=Array.isArray(se.labels)?se.labels:[];if(!K.some(he=>de.includes(he)))return!1}return!0})}function le(){let C=new Set;for(let O of[$,v,S,N,P,q])for(let ee of O){let Q=Array.isArray(ee.labels)?ee.labels:[];for(let K of Q)typeof K=="string"&&K.length>0&&C.add(K)}return Array.from(C).sort()}function ie(){return B.search.trim()!==""||B.priority!==""||B.type!==""||B.labels.length>0}function Te(){try{if(h){let C=h.selectBoardColumn("tab:board:in-progress","in_progress",E),O=h.selectBoardColumn("tab:board:blocked","blocked",E).filter(Ne),ee=new Set(C.map(T=>T.id)),Q=h.selectBoardColumn("tab:board:ready","ready",E).filter(T=>$e(T)&&!ee.has(T.id)),K=h.selectBoardColumn("tab:board:resolved","resolved",E),se=h.selectBoardColumn("tab:board:deferred","deferred",E),de=U?se:[],he=h.selectBoardColumn("tab:board:closed","closed").slice(0,_a),F=[...O,...Q,...C,...K,...de,...he];ot(F);let w=new Set;for(let T of F)T&&T.id&&!vn(T)&&w.add(T.id);let L=!ie();$=L?Jt(O,w):O,v=L?Jt(Q,w):Q,S=L?Jt(C,w):C,N=L?Jt(K,w):K,P=L?Jt(de,w):de,D=se.length,q=L?Jt(he,w):he,A=new Map;for(let T of $)A.set(T.id,"open");for(let T of v)A.set(T.id,"open");for(let T of S)A.set(T.id,"in_progress");for(let T of N)A.set(T.id,"resolved");for(let T of P)A.set(T.id,"deferred");for(let T of q)A.set(T.id,"closed");x=new Map;for(let T of $)x.set(T.id,"blocked-col");for(let T of v)x.set(T.id,"ready-col");for(let T of S)x.set(T.id,"in-progress-col");for(let T of N)x.set(T.id,"resolved-col");for(let T of P)x.set(T.id,"deferred-col");for(let T of q)x.set(T.id,"closed-col")}Re()}catch{$=[],v=[],S=[],N=[],P=[],q=[],g=new Map,Re()}}function ot(C){let O=new Map;for(let Q of C)Q&&Q.id&&!O.has(Q.id)&&O.set(Q.id,Q);let ee=new Map;for(let Q of O.values()){let K=vn(Q);if(!K)continue;let se=ee.get(K);se||(se=[],ee.set(K,se)),se.push({id:Q.id,title:Q.title,status:Q.status,metadata:Q.metadata,created_at:Q.created_at})}g=ee}function dt(C){let O=g.get(C)||[],ee=0,Q=null;for(let K of O)(K.status==="resolved"||K.status==="closed")&&(ee+=1),!Q&&K.status==="in_progress"&&(Q=K);return{total:O.length,count:ee,current:Q,children:O}}function we(C){return!M.has(C)}function We(C,O){C.preventDefault(),C.stopPropagation(),M.has(O)?M.delete(O):M.add(O),Re()}function ke(C,O){C.preventDefault(),C.stopPropagation(),n(O)}function lt(C,O){C.preventDefault(),C.stopPropagation(),n(O)}function pe(C,O){V||n(O)}function De(C,O){C.preventDefault(),C.stopPropagation(),wa(O).then(ee=>{ee&&J("\uBCF5\uC0AC\uB428","success",1200)})}function ut(C,O){V=O,C.dataTransfer&&(C.dataTransfer.setData("text/plain",O),C.dataTransfer.effectAllowed="move"),C.target.classList.add("board-card--dragging")}function Pe(C){C.target.classList.remove("board-card--dragging"),ht(),setTimeout(()=>{V=null},0)}function Ge(C){let O=String(C.target.value||"");!O||O===_||(_=O,a&&a(O),Re())}let Ae={onCardClick:pe,onCopyId:De,onDragStart:ut,onDragEnd:Pe,onClosedRangeChange:Ge,rollupFor:dt,isExpanded:we,onRollupToggle:We,onChildClick:ke,onFromChipClick:lt,get policy(){return l?l.get():null}};function je(C){let O=C.target,ee=t.querySelector(".board-filter__labels");O&&ee&&ee.contains(O)||Xe()}function Ze(C){C.key==="Escape"&&Xe()}function Ye(){j||(j=!0,document.addEventListener("mousedown",je),document.addEventListener("keydown",Ze),Re())}function Xe(){j&&(j=!1,document.removeEventListener("mousedown",je),document.removeEventListener("keydown",Ze),Re())}let Fe={onSearchInput(C){B.search=String(C.target.value||""),Te()},onPriorityChange(C){B.priority=String(C.target.value||""),Te()},onTypeChange(C){B.type=String(C.target.value||""),Te()},onSortChange(C){let O=String(C.target.value||"");if(!(!Js.has(O)||O===E)){E=O;try{window.localStorage.setItem(Qs,O)}catch{}Te()}},onDeferredToggle(){U=!U,Te()},onLabelMenuToggle(){j?Xe():Ye()},onLabelToggle(C){let O=B.labels.indexOf(C);O===-1?B.labels.push(C):B.labels.splice(O,1),Te()},onLabelClear(){B.labels.length!==0&&(B.labels=[],Te())},onNewIssue(){c&&c()}};function Qe(){let C=U?"board-root board-root--deferred":"board-root";return d`
      <div class="board-view">
        ${Xs(B,Fe,{sort_mode:E,show_deferred:U,deferred_count:D,label_options:le(),label_menu_open:j})}
        <div class=${C}>
          ${Pt({title:"Blocked",id:"blocked-col",items:ye($)},Ae)}
          ${Pt({title:"Ready",id:"ready-col",items:ye(v)},Ae)}
          ${Pt({title:"In progress",id:"in-progress-col",items:ye(S)},Ae)}
          ${Pt({title:"Resolved",id:"resolved-col",items:ye(N)},Ae)}
          ${U?Pt({title:"Deferred",id:"deferred-col",items:ye(P)},Ae):""}
          ${Pt({title:"Closed",id:"closed-col",items:ye(q),is_closed:!0,closed_range:_},Ae)}
        </div>
      </div>
    `}function Re(){_e(Qe(),t),qe()}function qe(){try{let C=Array.from(t.querySelectorAll(".board-column"));for(let O of C)Array.from(O.querySelectorAll(".board-card")).forEach((Q,K)=>{Q.tabIndex=K===0?0:-1})}catch{}}async function it(C,O){if(!o){J("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:C,status:O}),J("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(ee){r("update-status failed: %o",ee),J("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function Be(C){switch(C){case"blocked-col":return $;case"ready-col":return v;case"in-progress-col":return S;case"resolved-col":return N;case"deferred-col":return P;default:return[]}}function ct(C,O,ee){if(!o||!i)return;let Q=Be(C),K=Q.find(w=>w.id===O);if(!K)return;let se=Q.filter(w=>w.id!==O),de=ee.closest?ee.closest(".board-card"):null,he=se.length;if(de){let w=de.getAttribute("data-issue-id");if(w===O)return;let L=se.findIndex(T=>T.id===w);L>=0&&(he=L)}let F=se.slice();F.splice(he,0,K),k.applyReorder(O,F,he)}function ht(){for(let C of Array.from(t.querySelectorAll(".board-column--drag-over")))C.classList.remove("board-column--drag-over")}let xe=null;t.addEventListener("dragover",C=>{C.preventDefault(),C.dataTransfer&&(C.dataTransfer.dropEffect="move");let ee=C.target.closest(".board-column");ee&&ee!==xe&&(xe&&xe.classList.remove("board-column--drag-over"),ee.classList.add("board-column--drag-over"),xe=ee)}),t.addEventListener("dragleave",C=>{let O=C.relatedTarget;(!O||!t.contains(O))&&xe&&(xe.classList.remove("board-column--drag-over"),xe=null)}),t.addEventListener("drop",C=>{C.preventDefault(),xe&&(xe.classList.remove("board-column--drag-over"),xe=null);let O=C.target,ee=O.closest(".board-column");if(!ee)return;let Q=C.dataTransfer?.getData("text/plain")||"";if(!Q)return;let K=ee.id,se=x.get(Q);if(se&&se===K){if(ma.has(K)){if(E!=="manual"){J("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}ct(K,Q,O)}return}let de=ga[K];if(!de){J("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}A.get(Q)!==de&&it(Q,de)}),t.addEventListener("keydown",C=>{let O=C.target;if(!(O instanceof HTMLElement))return;let ee=String(O.tagName||"").toLowerCase();if(ee==="input"||ee==="textarea"||ee==="select"||ee==="button"||ee==="a"||O.isContentEditable===!0)return;let Q=O.closest(".board-card");if(!Q)return;let K=String(C.key||"");if(K==="Enter"||K===" "){C.preventDefault();let F=Q.getAttribute("data-issue-id");F&&n(F);return}if(K!=="ArrowUp"&&K!=="ArrowDown"&&K!=="ArrowLeft"&&K!=="ArrowRight")return;C.preventDefault();let se=Q.closest(".board-column");if(!se)return;let de=Array.from(se.querySelectorAll(".board-card")),he=de.indexOf(Q);if(K==="ArrowDown"&&he<de.length-1){ce(Q,de[he+1]);return}if(K==="ArrowUp"&&he>0){ce(Q,de[he-1]);return}if(K==="ArrowLeft"||K==="ArrowRight"){let F=Array.from(t.querySelectorAll(".board-column")),w=F.indexOf(se),L=K==="ArrowRight"?1:-1,T=w+L;for(;T>=0&&T<F.length;){let Z=F[T].querySelector(".board-card");if(Z){ce(Q,Z);return}T+=L}}});function ce(C,O){try{C.tabIndex=-1,O.tabIndex=0,O.focus()}catch{}}let Ue=null;h&&h.subscribe&&(Ue=h.subscribe(()=>{try{Te()}catch{}}));let ze=null;return l&&l.subscribe&&(ze=l.subscribe(()=>{try{Te()}catch{}})),{async load(){r("load"),Te()},clear(){Xe(),Ue&&(Ue(),Ue=null),ze&&(ze(),ze=null),t.replaceChildren(),$=[],v=[],S=[],N=[],P=[],q=[],A=new Map,x=new Map}}}function vn(t){let e=t&&t.parent;return typeof e=="string"?e:e&&e.id?String(e.id):""}function Jt(t,e){return t.filter(r=>{let n=vn(r);return!(n&&e.has(n))})}async function wa(t){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(t)),!0;let e=document.createElement("textarea");e.value=String(t),e.style.position="fixed",e.style.left="-9999px",document.body.appendChild(e),e.select();let r=!1;try{r=document.execCommand("copy")}finally{e.remove()}return r}catch{return!1}}async function Ft(t){let e=String(t);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(e),!0}catch{}try{let r=document.createElement("textarea");r.value=e,r.style.position="fixed",r.style.left="-9999px",document.body.appendChild(r),r.select();let n=!1;try{n=document.execCommand("copy")}finally{r.remove()}return n}catch{return!1}}var ka="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function Tt(t){return typeof t=="number"&&Number.isFinite(t)?t:0}function to(t){return!t||typeof t!="object"?!1:typeof t.input_tokens=="number"||typeof t.output_tokens=="number"}function ya(t){return t>=1e6?`${(t/1e6).toFixed(1)}M`:t>=1e3?`${(t/1e3).toFixed(1)}k`:String(t)}function mt(t){if(!to(t))return null;let e=Tt(t?.input_tokens)+Tt(t?.output_tokens);return`\u03C4 ${ya(e)}`}function Ur(t){if(!t||typeof t!="object")return"";let e=[`\uC785\uB825 ${Tt(t.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Tt(t.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${Tt(t.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Tt(t.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&e.push(`$${t.total_cost_usd.toFixed(2)}`);let r=e.join(" \xB7 ");return t.replayed?`${r}
${ka}`:r}var va=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"];function er(t,e){let r={input_tokens:0,output_tokens:0,cache_read_input_tokens:0,cache_creation_input_tokens:0},n=!1,s=0,o=!1,i=!1;for(let l of Object.values(t||{})){if(!l||l.bead_id!==e)continue;let a=l.usage;if(to(a)){n=!0;for(let c of va)r[c]=Tt(r[c])+Tt(a[c]);typeof a.total_cost_usd=="number"&&Number.isFinite(a.total_cost_usd)&&(s+=a.total_cost_usd,o=!0),a.replayed===!0&&(i=!0)}}return n?(o&&(r.total_cost_usd=s),i&&(r.replayed=!0),r):null}var $a={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},xa=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,Sa=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function At(t){return!!t&&typeof t=="object"}function $n(t){return typeof t!="string"||t.length===0?[]:t.split(/\r?\n/)}function ro(t,e){let r=$n(t),n=$n(e),s=new Map;for(let l of r)s.set(l,(s.get(l)||0)+1);let o=0;for(let l of n){let a=s.get(l)||0;a>0?s.set(l,a-1):o+=1}let i=0;for(let l of s.values())i+=l;return{added:o,removed:i}}function Ta(t){let e="";typeof t=="string"?e=t:Array.isArray(t)?e=t.map(s=>At(s)&&typeof s.text=="string"?s.text:"").join(""):At(t)&&typeof t.text=="string"&&(e=t.text);let n=(String(e).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return n.length>120?`${n.slice(0,117)}\u2026`:n}function Aa(t){let e=String(t.name||""),r=t.input||{},n={kind:"tool",tool:e,icon:$a[e]||"\u{1F527}",input:r,expandable:!0};if((e==="Read"||e==="Write")&&(n.path=String(r.file_path||r.path||"")),e==="Write"&&(n.added=$n(r.content).length),e==="Edit"){n.path=String(r.file_path||r.path||"");let{added:s,removed:o}=ro(r.old_string,r.new_string);n.added=s,n.removed=o}if(e==="MultiEdit"){n.path=String(r.file_path||r.path||"");let s=0,o=0,i=Array.isArray(r.edits)?r.edits:[];for(let l of i){let a=ro(At(l)?l.old_string:"",At(l)?l.new_string:"");s+=a.added,o+=a.removed}n.added=s,n.removed=o}return e==="Bash"&&(n.command=String(r.command||"")),(e==="Grep"||e==="Glob")&&(n.command=String(r.pattern||r.query||"")),n}function no(t){let e=t.split(/\r?\n/).find(n=>n.trim().length>0)||"",r=xa.exec(e);return r?{kind:"gate",gate:r[2]==="implementation"?"impl":r[2],reviewer:r[3],verdict:r[4],time:r[5]?r[5].trim():void 0,text:e.trim()}:Sa.test(e)&&e.trim().length<=80?{kind:"phase",text:e.trim()}:{kind:"assistant",text:t}}function Ea(t,e){if(t.type==="assistant"){let r=t.message,n=r&&Array.isArray(r.content)?r.content:[],s=[];for(let o of n)if(At(o)){if(o.type==="text"&&typeof o.text=="string")s.push(no(o.text));else if(o.type==="tool_use"){let i=Aa(o);typeof o.id=="string"&&e.set(o.id,i),s.push(i)}}return s}if(t.type==="user"){let r=t.message,n=r&&Array.isArray(r.content)?r.content:[];for(let s of n)if(At(s)&&s.type==="tool_result"){let o=e.get(String(s.tool_use_id));if(o){let i=Ta(s.content);o.result=i,o.output=typeof s.content=="string"?s.content:i}}return[]}if(t.type==="result"){let r=t.is_error===!1&&t.subtype==="success";return[{kind:"result",success:r,text:typeof t.result=="string"?t.result:r?"DONE":""}]}return[]}function Ca(t){if(t.type==="item.completed"&&At(t.item)){let e=t.item;return e.type==="agent_message"&&typeof e.text=="string"?[no(e.text)]:e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}if(t.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(t.type==="turn.failed"){let e=t.error;return[{kind:"error",text:e&&typeof e.message=="string"?e.message:"turn failed"}]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:[]}function Ra(t){let e=t.type;return typeof e=="string"&&(e==="error"||e.startsWith("thread.")||e.startsWith("turn.")||e.startsWith("item."))}function so(t){let e=[],r=new Map,n=Array.isArray(t)?t:[];for(let s of n){let o=s;if(typeof s=="string"){let l=s.trim();if(l.length===0)continue;try{o=JSON.parse(l)}catch{continue}}if(!At(o))continue;let i=Ra(o)?Ca(o):Ea(o,r);for(let l of i)e.push(l)}return e}function zr(t,e={}){let{transport:r,sessionLogStore:n,onClose:s}=e,o=null,i={},l=!0,a=new Set,c=null;function _(){if(!o||!n)return[];let x=n.get(o);return so(x?x.lines:[])}function h(x,g){if(g.kind==="gate")return d`<div class="sv__gate">${g.text}</div>`;if(g.kind==="phase")return d`<div class="sv__phase">${g.text}</div>`;if(g.kind==="result")return d`<div
        class="sv__result${g.success?" sv__result--ok":" sv__result--fail"}"
      >
        ${g.success?"\u2713":"\u2717"}
        ${g.text||(g.success?"DONE":"\uC2E4\uD328")}
      </div>`;if(g.kind==="error")return d`<div class="sv__error">⛔ ${g.text}</div>`;if(g.kind==="blocker")return d`<div class="sv__error">⛔ ${g.text}</div>`;if(g.kind==="tool"){let M=a.has(x),B=g.tool==="Bash"?g.command:g.path||g.command||"";return d`<div
        class="sv__tool${M?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>N(x)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${g.icon}</span>
          <span class="sv__tool-name">${g.tool}</span>
          ${B?d`<span class="sv__tool-detail">${B}</span>`:""}
          ${typeof g.added=="number"?d`<span class="sv__diff-add">+${g.added}</span>`:""}
          ${typeof g.removed=="number"?d`<span class="sv__diff-del">−${g.removed}</span>`:""}
          ${g.result?d`<span class="sv__tool-ok">→ ${g.result}</span>`:""}
        </span>
        ${M?d`<pre class="sv__tool-expand">${k(g)}</pre>`:""}
      </div>`}return d`<div class="sv__as">${g.text}</div>`}function k(x){let g=[];if(x.input!==void 0)try{g.push(`input: ${JSON.stringify(x.input,null,2)}`)}catch{}return typeof x.output=="string"&&x.output.length>0&&g.push(`output:
${x.output}`),g.join(`

`)}function $(){if(!o)return d``;let x=_(),g=[i.runner,i.model,i.effort].filter(Boolean).join(" \xB7 "),M=i.session_id||"",B=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${l?"ON":"OFF"}`;return d`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id">${o}</span>
        ${M?d`<button
              type="button"
              class="sv__session"
              title=${M}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${M}`}
              @click=${()=>q(M)}
            >
              ⧉ ${M.slice(0,8)}
            </button>`:""}
        ${g?d`<span class="sv__meta">${g}</span>`:""}
        ${i.worktree?d`<span class="sv__wt" title=${i.worktree}
              >${i.worktree}</span
            >`:""}
        <button
          type="button"
          class="sv__follow${l?" sv__follow--on":""}"
          aria-pressed=${l?"true":"false"}
          aria-label=${B}
          @click=${P}
        >
          <span class="sv__follow-full">⇣ ${B}</span>
          <span class="sv__follow-short">⇣ ${l?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>A()}
        >
          ✕
        </button>
      </div>
      <div class="sv__body">
        ${x.length===0?d`<div class="sv__empty">세션 로그 없음</div>`:x.map((j,V)=>h(V,j))}
      </div>
    </div>`}function v(){_e($(),t),l&&S()}function S(){let x=t.querySelector(".sv__body");x&&(x.scrollTop=x.scrollHeight)}function N(x){a.has(x)?a.delete(x):a.add(x),v()}function P(){l=!l,v()}function q(x){Ft(x).then(g=>{g?J("\uBCF5\uC0AC\uB428","success",1200):J("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function U(x){!o||!x||(i={...i,...x},v())}function D(x){let g=x.target;if(!g||!g.classList||!g.classList.contains("sv__body"))return;!(g.scrollHeight-g.scrollTop-g.clientHeight<=4)&&l&&(l=!1,v())}t.addEventListener("scroll",D,!0);function E(x){let g=x&&x.attempt_id;g&&(o=g,i=x.meta||{},l=!0,a.clear(),!c&&n&&(c=n.subscribe(v)),r&&Promise.resolve(r("subscribe-session-log",{id:`session-log:${o}`,attempt_id:o})).catch(()=>{}),v())}function A(){let x=o;o=null,a.clear(),r&&x&&Promise.resolve(r("unsubscribe-session-log",{id:`session-log:${x}`})).catch(()=>{}),_e(d``,t),s&&s()}return{open:E,updateMeta:U,close:A,isOpen(){return o!==null},destroy(){c&&(c(),c=null),t.removeEventListener("scroll",D,!0),o=null,_e(d``,t)}}}function La(t){let e=t&&t.metadata||{},r=[];return typeof e.spec_id=="string"&&e.spec_id.trim().length>0&&r.push({kind:"spec",path:e.spec_id.trim()}),typeof e.plan_path=="string"&&e.plan_path.trim().length>0&&r.push({kind:"plan",path:e.plan_path.trim()}),r}function oo(t,e){let r=La(t);return d`
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
  `}var xn=["opus","sonnet","haiku","fable"],Sn=["low","medium","high","xhigh"],Tn=["codex","opus","fable","self","skip"],An=["opus","fable","sonnet","haiku"],Ia=["standard","fast_track"],En={orchestration_model:"(\uAE30\uBCF8: opus)",orchestration_effort:"(\uAE30\uBCF8: CLI \uAE30\uBCF8)",review_model:"(\uAE30\uBCF8: codex)",impl_model:"(\uAE30\uBCF8: \uD2F0\uC5B4 \uC790\uB3D9)"};function Hr(t,e){let r=e&&e[t];return typeof r=="string"&&r.length>0?`(\uAE30\uBCF8: ${r} \u2014 \uC804\uC5ED)`:En[t]||"(\uAE30\uBCF8)"}function pr(t,e,r,n,s,o){return d`
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
  `}function fr(t,e){let r=t.map(n=>({value:n,label:n}));return typeof e=="string"?[{value:"",label:e},...r]:r}function io(t,e,r){let n=t&&t.metadata||{},s=r&&typeof r=="object"?r:{},o=n.workflow_mode==="fast_track"?"fast_track":"standard";return d`
    <div class="detail-section-label">실행 설정 (수정 가능)</div>
    ${pr("orchestration_model","orchestration_model",fr(xn,Hr("orchestration_model",s)),n.orchestration_model||"",!1,e)}
    ${pr("orchestration_effort","orchestration_effort",fr(Sn,Hr("orchestration_effort",s)),n.orchestration_effort||"",!1,e)}
    ${pr("review_model","review_model",fr(Tn,Hr("review_model",s)),n.review_model||"",!1,e)}
    ${pr("impl_model","impl_model",fr(An,Hr("impl_model",s)),n.impl_model||"",!1,e)}
    ${pr("workflow_mode","workflow_mode",fr(Ia),o,n.workflow_mode==="fast_track",e)}
  `}var{entries:go,setPrototypeOf:ao,isFrozen:Da,getPrototypeOf:Oa,getOwnPropertyDescriptor:Ma}=Object,{freeze:rt,seal:ft,create:Mn}=Object,{apply:Nn,construct:Pn}=typeof Reflect<"u"&&Reflect;rt||(rt=function(e){return e});ft||(ft=function(e){return e});Nn||(Nn=function(e,r){for(var n=arguments.length,s=new Array(n>2?n-2:0),o=2;o<n;o++)s[o-2]=arguments[o];return e.apply(r,s)});Pn||(Pn=function(e){for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return new e(...n)});var Wr=nt(Array.prototype.forEach),Na=nt(Array.prototype.lastIndexOf),lo=nt(Array.prototype.pop),hr=nt(Array.prototype.push),Pa=nt(Array.prototype.splice),jr=nt(String.prototype.toLowerCase),Cn=nt(String.prototype.toString),Rn=nt(String.prototype.match),_r=nt(String.prototype.replace),Fa=nt(String.prototype.indexOf),qa=nt(String.prototype.trim),bt=nt(Object.prototype.hasOwnProperty),tt=nt(RegExp.prototype.test),gr=Ba(TypeError);function nt(t){return function(e){e instanceof RegExp&&(e.lastIndex=0);for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return Nn(t,e,n)}}function Ba(t){return function(){for(var e=arguments.length,r=new Array(e),n=0;n<e;n++)r[n]=arguments[n];return Pn(t,r)}}function oe(t,e){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:jr;ao&&ao(t,null);let n=e.length;for(;n--;){let s=e[n];if(typeof s=="string"){let o=r(s);o!==s&&(Da(e)||(e[n]=o),s=o)}t[s]=!0}return t}function Ua(t){for(let e=0;e<t.length;e++)bt(t,e)||(t[e]=null);return t}function vt(t){let e=Mn(null);for(let[r,n]of go(t))bt(t,r)&&(Array.isArray(n)?e[r]=Ua(n):n&&typeof n=="object"&&n.constructor===Object?e[r]=vt(n):e[r]=n);return e}function mr(t,e){for(;t!==null;){let n=Ma(t,e);if(n){if(n.get)return nt(n.get);if(typeof n.value=="function")return nt(n.value)}t=Oa(t)}function r(){return null}return r}var co=rt(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Ln=rt(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),In=rt(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),za=rt(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Dn=rt(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Ha=rt(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),uo=rt(["#text"]),po=rt(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),On=rt(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),fo=rt(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Gr=rt(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Wa=ft(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Ga=ft(/<%[\w\W]*|[\w\W]*%>/gm),ja=ft(/\$\{[\w\W]*/gm),Ya=ft(/^data-[\-\w.\u00B7-\uFFFF]+$/),Va=ft(/^aria-[\-\w]+$/),mo=ft(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Ka=ft(/^(?:\w+script|data):/i),Za=ft(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),bo=ft(/^html$/i),Xa=ft(/^[a-z][.\w]*(-[.\w]+)+$/i),ho=Object.freeze({__proto__:null,ARIA_ATTR:Va,ATTR_WHITESPACE:Za,CUSTOM_ELEMENT:Xa,DATA_ATTR:Ya,DOCTYPE_NAME:bo,ERB_EXPR:Ga,IS_ALLOWED_URI:mo,IS_SCRIPT_OR_DATA:Ka,MUSTACHE_EXPR:Wa,TMPLIT_EXPR:ja}),br={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},Qa=function(){return typeof window>"u"?null:window},Ja=function(e,r){if(typeof e!="object"||typeof e.createPolicy!="function")return null;let n=null,s="data-tt-policy-suffix";r&&r.hasAttribute(s)&&(n=r.getAttribute(s));let o="dompurify"+(n?"#"+n:"");try{return e.createPolicy(o,{createHTML(i){return i},createScriptURL(i){return i}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},_o=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function wo(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Qa(),e=Y=>wo(Y);if(e.version="3.3.0",e.removed=[],!t||!t.document||t.document.nodeType!==br.document||!t.Element)return e.isSupported=!1,e;let{document:r}=t,n=r,s=n.currentScript,{DocumentFragment:o,HTMLTemplateElement:i,Node:l,Element:a,NodeFilter:c,NamedNodeMap:_=t.NamedNodeMap||t.MozNamedAttrMap,HTMLFormElement:h,DOMParser:k,trustedTypes:$}=t,v=a.prototype,S=mr(v,"cloneNode"),N=mr(v,"remove"),P=mr(v,"nextSibling"),q=mr(v,"childNodes"),U=mr(v,"parentNode");if(typeof i=="function"){let Y=r.createElement("template");Y.content&&Y.content.ownerDocument&&(r=Y.content.ownerDocument)}let D,E="",{implementation:A,createNodeIterator:x,createDocumentFragment:g,getElementsByTagName:M}=r,{importNode:B}=n,j=_o();e.isSupported=typeof go=="function"&&typeof U=="function"&&A&&A.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:V,ERB_EXPR:$e,TMPLIT_EXPR:Ne,DATA_ATTR:ye,ARIA_ATTR:le,IS_SCRIPT_OR_DATA:ie,ATTR_WHITESPACE:Te,CUSTOM_ELEMENT:ot}=ho,{IS_ALLOWED_URI:dt}=ho,we=null,We=oe({},[...co,...Ln,...In,...Dn,...uo]),ke=null,lt=oe({},[...po,...On,...fo,...Gr]),pe=Object.seal(Mn(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),De=null,ut=null,Pe=Object.seal(Mn(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),Ge=!0,Ae=!0,je=!1,Ze=!0,Ye=!1,Xe=!0,Fe=!1,Qe=!1,Re=!1,qe=!1,it=!1,Be=!1,ct=!0,ht=!1,xe="user-content-",ce=!0,Ue=!1,ze={},C=null,O=oe({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),ee=null,Q=oe({},["audio","video","img","source","image","track"]),K=null,se=oe({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),de="http://www.w3.org/1998/Math/MathML",he="http://www.w3.org/2000/svg",F="http://www.w3.org/1999/xhtml",w=F,L=!1,T=null,Z=oe({},[de,he,F],Cn),u=oe({},["mi","mo","mn","ms","mtext"]),b=oe({},["annotation-xml"]),R=oe({},["title","style","font","a","script"]),X=null,ae=["application/xhtml+xml","text/html"],Ee="text/html",f=null,m=null,W=r.createElement("form"),G=function(p){return p instanceof RegExp||p instanceof Function},te=function(){let p=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(m&&m===p)){if((!p||typeof p!="object")&&(p={}),p=vt(p),X=ae.indexOf(p.PARSER_MEDIA_TYPE)===-1?Ee:p.PARSER_MEDIA_TYPE,f=X==="application/xhtml+xml"?Cn:jr,we=bt(p,"ALLOWED_TAGS")?oe({},p.ALLOWED_TAGS,f):We,ke=bt(p,"ALLOWED_ATTR")?oe({},p.ALLOWED_ATTR,f):lt,T=bt(p,"ALLOWED_NAMESPACES")?oe({},p.ALLOWED_NAMESPACES,Cn):Z,K=bt(p,"ADD_URI_SAFE_ATTR")?oe(vt(se),p.ADD_URI_SAFE_ATTR,f):se,ee=bt(p,"ADD_DATA_URI_TAGS")?oe(vt(Q),p.ADD_DATA_URI_TAGS,f):Q,C=bt(p,"FORBID_CONTENTS")?oe({},p.FORBID_CONTENTS,f):O,De=bt(p,"FORBID_TAGS")?oe({},p.FORBID_TAGS,f):vt({}),ut=bt(p,"FORBID_ATTR")?oe({},p.FORBID_ATTR,f):vt({}),ze=bt(p,"USE_PROFILES")?p.USE_PROFILES:!1,Ge=p.ALLOW_ARIA_ATTR!==!1,Ae=p.ALLOW_DATA_ATTR!==!1,je=p.ALLOW_UNKNOWN_PROTOCOLS||!1,Ze=p.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Ye=p.SAFE_FOR_TEMPLATES||!1,Xe=p.SAFE_FOR_XML!==!1,Fe=p.WHOLE_DOCUMENT||!1,qe=p.RETURN_DOM||!1,it=p.RETURN_DOM_FRAGMENT||!1,Be=p.RETURN_TRUSTED_TYPE||!1,Re=p.FORCE_BODY||!1,ct=p.SANITIZE_DOM!==!1,ht=p.SANITIZE_NAMED_PROPS||!1,ce=p.KEEP_CONTENT!==!1,Ue=p.IN_PLACE||!1,dt=p.ALLOWED_URI_REGEXP||mo,w=p.NAMESPACE||F,u=p.MATHML_TEXT_INTEGRATION_POINTS||u,b=p.HTML_INTEGRATION_POINTS||b,pe=p.CUSTOM_ELEMENT_HANDLING||{},p.CUSTOM_ELEMENT_HANDLING&&G(p.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(pe.tagNameCheck=p.CUSTOM_ELEMENT_HANDLING.tagNameCheck),p.CUSTOM_ELEMENT_HANDLING&&G(p.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(pe.attributeNameCheck=p.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),p.CUSTOM_ELEMENT_HANDLING&&typeof p.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(pe.allowCustomizedBuiltInElements=p.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Ye&&(Ae=!1),it&&(qe=!0),ze&&(we=oe({},uo),ke=[],ze.html===!0&&(oe(we,co),oe(ke,po)),ze.svg===!0&&(oe(we,Ln),oe(ke,On),oe(ke,Gr)),ze.svgFilters===!0&&(oe(we,In),oe(ke,On),oe(ke,Gr)),ze.mathMl===!0&&(oe(we,Dn),oe(ke,fo),oe(ke,Gr))),p.ADD_TAGS&&(typeof p.ADD_TAGS=="function"?Pe.tagCheck=p.ADD_TAGS:(we===We&&(we=vt(we)),oe(we,p.ADD_TAGS,f))),p.ADD_ATTR&&(typeof p.ADD_ATTR=="function"?Pe.attributeCheck=p.ADD_ATTR:(ke===lt&&(ke=vt(ke)),oe(ke,p.ADD_ATTR,f))),p.ADD_URI_SAFE_ATTR&&oe(K,p.ADD_URI_SAFE_ATTR,f),p.FORBID_CONTENTS&&(C===O&&(C=vt(C)),oe(C,p.FORBID_CONTENTS,f)),ce&&(we["#text"]=!0),Fe&&oe(we,["html","head","body"]),we.table&&(oe(we,["tbody"]),delete De.tbody),p.TRUSTED_TYPES_POLICY){if(typeof p.TRUSTED_TYPES_POLICY.createHTML!="function")throw gr('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof p.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw gr('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');D=p.TRUSTED_TYPES_POLICY,E=D.createHTML("")}else D===void 0&&(D=Ja($,s)),D!==null&&typeof E=="string"&&(E=D.createHTML(""));rt&&rt(p),m=p}},ge=oe({},[...Ln,...In,...za]),yt=oe({},[...Dn,...Ha]),Ve=function(p){let I=U(p);(!I||!I.tagName)&&(I={namespaceURI:w,tagName:"template"});let z=jr(p.tagName),me=jr(I.tagName);return T[p.namespaceURI]?p.namespaceURI===he?I.namespaceURI===F?z==="svg":I.namespaceURI===de?z==="svg"&&(me==="annotation-xml"||u[me]):!!ge[z]:p.namespaceURI===de?I.namespaceURI===F?z==="math":I.namespaceURI===he?z==="math"&&b[me]:!!yt[z]:p.namespaceURI===F?I.namespaceURI===he&&!b[me]||I.namespaceURI===de&&!u[me]?!1:!yt[z]&&(R[z]||!ge[z]):!!(X==="application/xhtml+xml"&&T[p.namespaceURI]):!1},Je=function(p){hr(e.removed,{element:p});try{U(p).removeChild(p)}catch{N(p)}},re=function(p,I){try{hr(e.removed,{attribute:I.getAttributeNode(p),from:I})}catch{hr(e.removed,{attribute:null,from:I})}if(I.removeAttribute(p),p==="is")if(qe||it)try{Je(I)}catch{}else try{I.setAttribute(p,"")}catch{}},Le=function(p){let I=null,z=null;if(Re)p="<remove></remove>"+p;else{let Se=Rn(p,/^[\r\n\t ]+/);z=Se&&Se[0]}X==="application/xhtml+xml"&&w===F&&(p='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+p+"</body></html>");let me=D?D.createHTML(p):p;if(w===F)try{I=new k().parseFromString(me,X)}catch{}if(!I||!I.documentElement){I=A.createDocument(w,"template",null);try{I.documentElement.innerHTML=L?E:me}catch{}}let Oe=I.body||I.documentElement;return p&&z&&Oe.insertBefore(r.createTextNode(z),Oe.childNodes[0]||null),w===F?M.call(I,Fe?"html":"body")[0]:Fe?I.documentElement:Oe},Ut=function(p){return x.call(p.ownerDocument||p,p,c.SHOW_ELEMENT|c.SHOW_COMMENT|c.SHOW_TEXT|c.SHOW_PROCESSING_INSTRUCTION|c.SHOW_CDATA_SECTION,null)},tr=function(p){return p instanceof h&&(typeof p.nodeName!="string"||typeof p.textContent!="string"||typeof p.removeChild!="function"||!(p.attributes instanceof _)||typeof p.removeAttribute!="function"||typeof p.setAttribute!="function"||typeof p.namespaceURI!="string"||typeof p.insertBefore!="function"||typeof p.hasChildNodes!="function")},rr=function(p){return typeof l=="function"&&p instanceof l};function pt(Y,p,I){Wr(Y,z=>{z.call(e,p,I,m)})}let Ar=function(p){let I=null;if(pt(j.beforeSanitizeElements,p,null),tr(p))return Je(p),!0;let z=f(p.nodeName);if(pt(j.uponSanitizeElement,p,{tagName:z,allowedTags:we}),Xe&&p.hasChildNodes()&&!rr(p.firstElementChild)&&tt(/<[/\w!]/g,p.innerHTML)&&tt(/<[/\w!]/g,p.textContent)||p.nodeType===br.progressingInstruction||Xe&&p.nodeType===br.comment&&tt(/<[/\w]/g,p.data))return Je(p),!0;if(!(Pe.tagCheck instanceof Function&&Pe.tagCheck(z))&&(!we[z]||De[z])){if(!De[z]&&Er(z)&&(pe.tagNameCheck instanceof RegExp&&tt(pe.tagNameCheck,z)||pe.tagNameCheck instanceof Function&&pe.tagNameCheck(z)))return!1;if(ce&&!C[z]){let me=U(p)||p.parentNode,Oe=q(p)||p.childNodes;if(Oe&&me){let Se=Oe.length;for(let Ke=Se-1;Ke>=0;--Ke){let et=S(Oe[Ke],!0);et.__removalCount=(p.__removalCount||0)+1,me.insertBefore(et,P(p))}}}return Je(p),!0}return p instanceof a&&!Ve(p)||(z==="noscript"||z==="noembed"||z==="noframes")&&tt(/<\/no(script|embed|frames)/i,p.innerHTML)?(Je(p),!0):(Ye&&p.nodeType===br.text&&(I=p.textContent,Wr([V,$e,Ne],me=>{I=_r(I,me," ")}),p.textContent!==I&&(hr(e.removed,{element:p.cloneNode()}),p.textContent=I)),pt(j.afterSanitizeElements,p,null),!1)},nr=function(p,I,z){if(ct&&(I==="id"||I==="name")&&(z in r||z in W))return!1;if(!(Ae&&!ut[I]&&tt(ye,I))){if(!(Ge&&tt(le,I))){if(!(Pe.attributeCheck instanceof Function&&Pe.attributeCheck(I,p))){if(!ke[I]||ut[I]){if(!(Er(p)&&(pe.tagNameCheck instanceof RegExp&&tt(pe.tagNameCheck,p)||pe.tagNameCheck instanceof Function&&pe.tagNameCheck(p))&&(pe.attributeNameCheck instanceof RegExp&&tt(pe.attributeNameCheck,I)||pe.attributeNameCheck instanceof Function&&pe.attributeNameCheck(I,p))||I==="is"&&pe.allowCustomizedBuiltInElements&&(pe.tagNameCheck instanceof RegExp&&tt(pe.tagNameCheck,z)||pe.tagNameCheck instanceof Function&&pe.tagNameCheck(z))))return!1}else if(!K[I]){if(!tt(dt,_r(z,Te,""))){if(!((I==="src"||I==="xlink:href"||I==="href")&&p!=="script"&&Fa(z,"data:")===0&&ee[p])){if(!(je&&!tt(ie,_r(z,Te,"")))){if(z)return!1}}}}}}}return!0},Er=function(p){return p!=="annotation-xml"&&Rn(p,ot)},zt=function(p){pt(j.beforeSanitizeAttributes,p,null);let{attributes:I}=p;if(!I||tr(p))return;let z={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:ke,forceKeepAttr:void 0},me=I.length;for(;me--;){let Oe=I[me],{name:Se,namespaceURI:Ke,value:et}=Oe,He=f(Se),Ht=et,Me=Se==="value"?Ht:qa(Ht);if(z.attrName=He,z.attrValue=Me,z.keepAttr=!0,z.forceKeepAttr=void 0,pt(j.uponSanitizeAttribute,p,z),Me=z.attrValue,ht&&(He==="id"||He==="name")&&(re(Se,p),Me=xe+Me),Xe&&tt(/((--!?|])>)|<\/(style|title|textarea)/i,Me)){re(Se,p);continue}if(He==="attributename"&&Rn(Me,"href")){re(Se,p);continue}if(z.forceKeepAttr)continue;if(!z.keepAttr){re(Se,p);continue}if(!Ze&&tt(/\/>/i,Me)){re(Se,p);continue}Ye&&Wr([V,$e,Ne],sr=>{Me=_r(Me,sr," ")});let Wt=f(p.nodeName);if(!nr(Wt,He,Me)){re(Se,p);continue}if(D&&typeof $=="object"&&typeof $.getAttributeType=="function"&&!Ke)switch($.getAttributeType(Wt,He)){case"TrustedHTML":{Me=D.createHTML(Me);break}case"TrustedScriptURL":{Me=D.createScriptURL(Me);break}}if(Me!==Ht)try{Ke?p.setAttributeNS(Ke,Se,Me):p.setAttribute(Se,Me),tr(p)?Je(p):lo(e.removed)}catch{re(Se,p)}}pt(j.afterSanitizeAttributes,p,null)},nn=function Y(p){let I=null,z=Ut(p);for(pt(j.beforeSanitizeShadowDOM,p,null);I=z.nextNode();)pt(j.uponSanitizeShadowNode,I,null),Ar(I),zt(I),I.content instanceof o&&Y(I.content);pt(j.afterSanitizeShadowDOM,p,null)};return e.sanitize=function(Y){let p=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},I=null,z=null,me=null,Oe=null;if(L=!Y,L&&(Y="<!-->"),typeof Y!="string"&&!rr(Y))if(typeof Y.toString=="function"){if(Y=Y.toString(),typeof Y!="string")throw gr("dirty is not a string, aborting")}else throw gr("toString is not a function");if(!e.isSupported)return Y;if(Qe||te(p),e.removed=[],typeof Y=="string"&&(Ue=!1),Ue){if(Y.nodeName){let et=f(Y.nodeName);if(!we[et]||De[et])throw gr("root node is forbidden and cannot be sanitized in-place")}}else if(Y instanceof l)I=Le("<!---->"),z=I.ownerDocument.importNode(Y,!0),z.nodeType===br.element&&z.nodeName==="BODY"||z.nodeName==="HTML"?I=z:I.appendChild(z);else{if(!qe&&!Ye&&!Fe&&Y.indexOf("<")===-1)return D&&Be?D.createHTML(Y):Y;if(I=Le(Y),!I)return qe?null:Be?E:""}I&&Re&&Je(I.firstChild);let Se=Ut(Ue?Y:I);for(;me=Se.nextNode();)Ar(me),zt(me),me.content instanceof o&&nn(me.content);if(Ue)return Y;if(qe){if(it)for(Oe=g.call(I.ownerDocument);I.firstChild;)Oe.appendChild(I.firstChild);else Oe=I;return(ke.shadowroot||ke.shadowrootmode)&&(Oe=B.call(n,Oe,!0)),Oe}let Ke=Fe?I.outerHTML:I.innerHTML;return Fe&&we["!doctype"]&&I.ownerDocument&&I.ownerDocument.doctype&&I.ownerDocument.doctype.name&&tt(bo,I.ownerDocument.doctype.name)&&(Ke="<!DOCTYPE "+I.ownerDocument.doctype.name+`>
`+Ke),Ye&&Wr([V,$e,Ne],et=>{Ke=_r(Ke,et," ")}),D&&Be?D.createHTML(Ke):Ke},e.setConfig=function(){let Y=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};te(Y),Qe=!0},e.clearConfig=function(){m=null,Qe=!1},e.isValidAttribute=function(Y,p,I){m||te({});let z=f(Y),me=f(p);return nr(z,me,I)},e.addHook=function(Y,p){typeof p=="function"&&hr(j[Y],p)},e.removeHook=function(Y,p){if(p!==void 0){let I=Na(j[Y],p);return I===-1?void 0:Pa(j[Y],I,1)[0]}return lo(j[Y])},e.removeHooks=function(Y){j[Y]=[]},e.removeAllHooks=function(){j=_o()},e}var ko=wo();var yo={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},vo=t=>(...e)=>({_$litDirective$:t,values:e}),Yr=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,r,n){this._$Ct=e,this._$AM=r,this._$Ci=n}_$AS(e,r){return this.update(e,r)}update(e,r){return this.render(...r)}};var wr=class extends Yr{constructor(e){if(super(e),this.it=Ie,e.type!==yo.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===Ie||e==null)return this._t=void 0,this.it=e;if(e===Dt)return e;if(typeof e!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;let r=[e];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}};wr.directiveName="unsafeHTML",wr.resultType=1;var $o=vo(wr);function Un(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Bt=Un();function Ro(t){Bt=t}var $r={exec:()=>null};function ue(t,e=""){let r=typeof t=="string"?t:t.source,n={replace:(s,o)=>{let i=typeof o=="string"?o:o.source;return i=i.replace(st.caret,"$1"),r=r.replace(s,i),n},getRegex:()=>new RegExp(r,e)};return n}var el=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),st={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:t=>new RegExp(`^( {0,3}${t})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}#`),htmlBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}<(?:[a-z].*>|!--)`,"i")},tl=/^(?:[ \t]*(?:\n|$))+/,rl=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,nl=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,xr=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,sl=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,zn=/(?:[*+-]|\d{1,9}[.)])/,Lo=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Io=ue(Lo).replace(/bull/g,zn).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),ol=ue(Lo).replace(/bull/g,zn).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Hn=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,il=/^[^\n]+/,Wn=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,al=ue(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Wn).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),ll=ue(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,zn).getRegex(),Jr="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Gn=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,cl=ue("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",Gn).replace("tag",Jr).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Do=ue(Hn).replace("hr",xr).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Jr).getRegex(),dl=ue(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Do).getRegex(),jn={blockquote:dl,code:rl,def:al,fences:nl,heading:sl,hr:xr,html:cl,lheading:Io,list:ll,newline:tl,paragraph:Do,table:$r,text:il},xo=ue("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",xr).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Jr).getRegex(),ul={...jn,lheading:ol,table:xo,paragraph:ue(Hn).replace("hr",xr).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",xo).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Jr).getRegex()},pl={...jn,html:ue(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",Gn).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:$r,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:ue(Hn).replace("hr",xr).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Io).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},fl=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,hl=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Oo=/^( {2,}|\\)\n(?!\s*$)/,_l=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,en=/[\p{P}\p{S}]/u,Yn=/[\s\p{P}\p{S}]/u,Mo=/[^\s\p{P}\p{S}]/u,gl=ue(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Yn).getRegex(),No=/(?!~)[\p{P}\p{S}]/u,ml=/(?!~)[\s\p{P}\p{S}]/u,bl=/(?:[^\s\p{P}\p{S}]|~)/u,wl=ue(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",el?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),Po=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,kl=ue(Po,"u").replace(/punct/g,en).getRegex(),yl=ue(Po,"u").replace(/punct/g,No).getRegex(),Fo="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",vl=ue(Fo,"gu").replace(/notPunctSpace/g,Mo).replace(/punctSpace/g,Yn).replace(/punct/g,en).getRegex(),$l=ue(Fo,"gu").replace(/notPunctSpace/g,bl).replace(/punctSpace/g,ml).replace(/punct/g,No).getRegex(),xl=ue("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,Mo).replace(/punctSpace/g,Yn).replace(/punct/g,en).getRegex(),Sl=ue(/\\(punct)/,"gu").replace(/punct/g,en).getRegex(),Tl=ue(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Al=ue(Gn).replace("(?:-->|$)","-->").getRegex(),El=ue("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Al).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Zr=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,Cl=ue(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Zr).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),qo=ue(/^!?\[(label)\]\[(ref)\]/).replace("label",Zr).replace("ref",Wn).getRegex(),Bo=ue(/^!?\[(ref)\](?:\[\])?/).replace("ref",Wn).getRegex(),Rl=ue("reflink|nolink(?!\\()","g").replace("reflink",qo).replace("nolink",Bo).getRegex(),So=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,Vn={_backpedal:$r,anyPunctuation:Sl,autolink:Tl,blockSkip:wl,br:Oo,code:hl,del:$r,emStrongLDelim:kl,emStrongRDelimAst:vl,emStrongRDelimUnd:xl,escape:fl,link:Cl,nolink:Bo,punctuation:gl,reflink:qo,reflinkSearch:Rl,tag:El,text:_l,url:$r},Ll={...Vn,link:ue(/^!?\[(label)\]\((.*?)\)/).replace("label",Zr).getRegex(),reflink:ue(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Zr).getRegex()},Fn={...Vn,emStrongRDelimAst:$l,emStrongLDelim:yl,url:ue(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",So).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:ue(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",So).getRegex()},Il={...Fn,br:ue(Oo).replace("{2,}","*").getRegex(),text:ue(Fn.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Vr={normal:jn,gfm:ul,pedantic:pl},kr={normal:Vn,gfm:Fn,breaks:Il,pedantic:Ll},Dl={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},To=t=>Dl[t];function $t(t,e){if(e){if(st.escapeTest.test(t))return t.replace(st.escapeReplace,To)}else if(st.escapeTestNoEncode.test(t))return t.replace(st.escapeReplaceNoEncode,To);return t}function Ao(t){try{t=encodeURI(t).replace(st.percentDecode,"%")}catch{return null}return t}function Eo(t,e){let r=t.replace(st.findPipe,(o,i,l)=>{let a=!1,c=i;for(;--c>=0&&l[c]==="\\";)a=!a;return a?"|":" |"}),n=r.split(st.splitPipe),s=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),e)if(n.length>e)n.splice(e);else for(;n.length<e;)n.push("");for(;s<n.length;s++)n[s]=n[s].trim().replace(st.slashPipe,"|");return n}function yr(t,e,r){let n=t.length;if(n===0)return"";let s=0;for(;s<n;){let o=t.charAt(n-s-1);if(o===e&&!r)s++;else if(o!==e&&r)s++;else break}return t.slice(0,n-s)}function Ol(t,e){if(t.indexOf(e[1])===-1)return-1;let r=0;for(let n=0;n<t.length;n++)if(t[n]==="\\")n++;else if(t[n]===e[0])r++;else if(t[n]===e[1]&&(r--,r<0))return n;return r>0?-2:-1}function Co(t,e,r,n,s){let o=e.href,i=e.title||null,l=t[1].replace(s.other.outputLinkReplace,"$1");n.state.inLink=!0;let a={type:t[0].charAt(0)==="!"?"image":"link",raw:r,href:o,title:i,text:l,tokens:n.inlineTokens(l)};return n.state.inLink=!1,a}function Ml(t,e,r){let n=t.match(r.other.indentCodeCompensation);if(n===null)return e;let s=n[1];return e.split(`
`).map(o=>{let i=o.match(r.other.beginningSpace);if(i===null)return o;let[l]=i;return l.length>=s.length?o.slice(s.length):o}).join(`
`)}var Xr=class{constructor(t){be(this,"options");be(this,"rules");be(this,"lexer");this.options=t||Bt}space(t){let e=this.rules.block.newline.exec(t);if(e&&e[0].length>0)return{type:"space",raw:e[0]}}code(t){let e=this.rules.block.code.exec(t);if(e){let r=e[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:e[0],codeBlockStyle:"indented",text:this.options.pedantic?r:yr(r,`
`)}}}fences(t){let e=this.rules.block.fences.exec(t);if(e){let r=e[0],n=Ml(r,e[3]||"",this.rules);return{type:"code",raw:r,lang:e[2]?e[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):e[2],text:n}}}heading(t){let e=this.rules.block.heading.exec(t);if(e){let r=e[2].trim();if(this.rules.other.endingHash.test(r)){let n=yr(r,"#");(this.options.pedantic||!n||this.rules.other.endingSpaceChar.test(n))&&(r=n.trim())}return{type:"heading",raw:e[0],depth:e[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(t){let e=this.rules.block.hr.exec(t);if(e)return{type:"hr",raw:yr(e[0],`
`)}}blockquote(t){let e=this.rules.block.blockquote.exec(t);if(e){let r=yr(e[0],`
`).split(`
`),n="",s="",o=[];for(;r.length>0;){let i=!1,l=[],a;for(a=0;a<r.length;a++)if(this.rules.other.blockquoteStart.test(r[a]))l.push(r[a]),i=!0;else if(!i)l.push(r[a]);else break;r=r.slice(a);let c=l.join(`
`),_=c.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");n=n?`${n}
${c}`:c,s=s?`${s}
${_}`:_;let h=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(_,o,!0),this.lexer.state.top=h,r.length===0)break;let k=o.at(-1);if(k?.type==="code")break;if(k?.type==="blockquote"){let $=k,v=$.raw+`
`+r.join(`
`),S=this.blockquote(v);o[o.length-1]=S,n=n.substring(0,n.length-$.raw.length)+S.raw,s=s.substring(0,s.length-$.text.length)+S.text;break}else if(k?.type==="list"){let $=k,v=$.raw+`
`+r.join(`
`),S=this.list(v);o[o.length-1]=S,n=n.substring(0,n.length-k.raw.length)+S.raw,s=s.substring(0,s.length-$.raw.length)+S.raw,r=v.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:n,tokens:o,text:s}}}list(t){let e=this.rules.block.list.exec(t);if(e){let r=e[1].trim(),n=r.length>1,s={type:"list",raw:"",ordered:n,start:n?+r.slice(0,-1):"",loose:!1,items:[]};r=n?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=n?r:"[*+-]");let o=this.rules.other.listItemRegex(r),i=!1;for(;t;){let a=!1,c="",_="";if(!(e=o.exec(t))||this.rules.block.hr.test(t))break;c=e[0],t=t.substring(c.length);let h=e[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,S=>" ".repeat(3*S.length)),k=t.split(`
`,1)[0],$=!h.trim(),v=0;if(this.options.pedantic?(v=2,_=h.trimStart()):$?v=e[1].length+1:(v=e[2].search(this.rules.other.nonSpaceChar),v=v>4?1:v,_=h.slice(v),v+=e[1].length),$&&this.rules.other.blankLine.test(k)&&(c+=k+`
`,t=t.substring(k.length+1),a=!0),!a){let S=this.rules.other.nextBulletRegex(v),N=this.rules.other.hrRegex(v),P=this.rules.other.fencesBeginRegex(v),q=this.rules.other.headingBeginRegex(v),U=this.rules.other.htmlBeginRegex(v);for(;t;){let D=t.split(`
`,1)[0],E;if(k=D,this.options.pedantic?(k=k.replace(this.rules.other.listReplaceNesting,"  "),E=k):E=k.replace(this.rules.other.tabCharGlobal,"    "),P.test(k)||q.test(k)||U.test(k)||S.test(k)||N.test(k))break;if(E.search(this.rules.other.nonSpaceChar)>=v||!k.trim())_+=`
`+E.slice(v);else{if($||h.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||P.test(h)||q.test(h)||N.test(h))break;_+=`
`+k}!$&&!k.trim()&&($=!0),c+=D+`
`,t=t.substring(D.length+1),h=E.slice(v)}}s.loose||(i?s.loose=!0:this.rules.other.doubleBlankLine.test(c)&&(i=!0)),s.items.push({type:"list_item",raw:c,task:!!this.options.gfm&&this.rules.other.listIsTask.test(_),loose:!1,text:_,tokens:[]}),s.raw+=c}let l=s.items.at(-1);if(l)l.raw=l.raw.trimEnd(),l.text=l.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let a of s.items){if(this.lexer.state.top=!1,a.tokens=this.lexer.blockTokens(a.text,[]),a.task){if(a.text=a.text.replace(this.rules.other.listReplaceTask,""),a.tokens[0]?.type==="text"||a.tokens[0]?.type==="paragraph"){a.tokens[0].raw=a.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),a.tokens[0].text=a.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let _=this.lexer.inlineQueue.length-1;_>=0;_--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[_].src)){this.lexer.inlineQueue[_].src=this.lexer.inlineQueue[_].src.replace(this.rules.other.listReplaceTask,"");break}}let c=this.rules.other.listTaskCheckbox.exec(a.raw);if(c){let _={type:"checkbox",raw:c[0]+" ",checked:c[0]!=="[ ]"};a.checked=_.checked,s.loose?a.tokens[0]&&["paragraph","text"].includes(a.tokens[0].type)&&"tokens"in a.tokens[0]&&a.tokens[0].tokens?(a.tokens[0].raw=_.raw+a.tokens[0].raw,a.tokens[0].text=_.raw+a.tokens[0].text,a.tokens[0].tokens.unshift(_)):a.tokens.unshift({type:"paragraph",raw:_.raw,text:_.raw,tokens:[_]}):a.tokens.unshift(_)}}if(!s.loose){let c=a.tokens.filter(h=>h.type==="space"),_=c.length>0&&c.some(h=>this.rules.other.anyLine.test(h.raw));s.loose=_}}if(s.loose)for(let a of s.items){a.loose=!0;for(let c of a.tokens)c.type==="text"&&(c.type="paragraph")}return s}}html(t){let e=this.rules.block.html.exec(t);if(e)return{type:"html",block:!0,raw:e[0],pre:e[1]==="pre"||e[1]==="script"||e[1]==="style",text:e[0]}}def(t){let e=this.rules.block.def.exec(t);if(e){let r=e[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),n=e[2]?e[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=e[3]?e[3].substring(1,e[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):e[3];return{type:"def",tag:r,raw:e[0],href:n,title:s}}}table(t){let e=this.rules.block.table.exec(t);if(!e||!this.rules.other.tableDelimiter.test(e[2]))return;let r=Eo(e[1]),n=e[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=e[3]?.trim()?e[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:e[0],header:[],align:[],rows:[]};if(r.length===n.length){for(let i of n)this.rules.other.tableAlignRight.test(i)?o.align.push("right"):this.rules.other.tableAlignCenter.test(i)?o.align.push("center"):this.rules.other.tableAlignLeft.test(i)?o.align.push("left"):o.align.push(null);for(let i=0;i<r.length;i++)o.header.push({text:r[i],tokens:this.lexer.inline(r[i]),header:!0,align:o.align[i]});for(let i of s)o.rows.push(Eo(i,o.header.length).map((l,a)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:o.align[a]})));return o}}lheading(t){let e=this.rules.block.lheading.exec(t);if(e)return{type:"heading",raw:e[0],depth:e[2].charAt(0)==="="?1:2,text:e[1],tokens:this.lexer.inline(e[1])}}paragraph(t){let e=this.rules.block.paragraph.exec(t);if(e){let r=e[1].charAt(e[1].length-1)===`
`?e[1].slice(0,-1):e[1];return{type:"paragraph",raw:e[0],text:r,tokens:this.lexer.inline(r)}}}text(t){let e=this.rules.block.text.exec(t);if(e)return{type:"text",raw:e[0],text:e[0],tokens:this.lexer.inline(e[0])}}escape(t){let e=this.rules.inline.escape.exec(t);if(e)return{type:"escape",raw:e[0],text:e[1]}}tag(t){let e=this.rules.inline.tag.exec(t);if(e)return!this.lexer.state.inLink&&this.rules.other.startATag.test(e[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(e[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(e[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(e[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:e[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:e[0]}}link(t){let e=this.rules.inline.link.exec(t);if(e){let r=e[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;let o=yr(r.slice(0,-1),"\\");if((r.length-o.length)%2===0)return}else{let o=Ol(e[2],"()");if(o===-2)return;if(o>-1){let i=(e[0].indexOf("!")===0?5:4)+e[1].length+o;e[2]=e[2].substring(0,o),e[0]=e[0].substring(0,i).trim(),e[3]=""}}let n=e[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(n);o&&(n=o[1],s=o[3])}else s=e[3]?e[3].slice(1,-1):"";return n=n.trim(),this.rules.other.startAngleBracket.test(n)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?n=n.slice(1):n=n.slice(1,-1)),Co(e,{href:n&&n.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},e[0],this.lexer,this.rules)}}reflink(t,e){let r;if((r=this.rules.inline.reflink.exec(t))||(r=this.rules.inline.nolink.exec(t))){let n=(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=e[n.toLowerCase()];if(!s){let o=r[0].charAt(0);return{type:"text",raw:o,text:o}}return Co(r,s,r[0],this.lexer,this.rules)}}emStrong(t,e,r=""){let n=this.rules.inline.emStrongLDelim.exec(t);if(!(!n||n[3]&&r.match(this.rules.other.unicodeAlphaNumeric))&&(!(n[1]||n[2])||!r||this.rules.inline.punctuation.exec(r))){let s=[...n[0]].length-1,o,i,l=s,a=0,c=n[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(c.lastIndex=0,e=e.slice(-1*t.length+s);(n=c.exec(e))!=null;){if(o=n[1]||n[2]||n[3]||n[4]||n[5]||n[6],!o)continue;if(i=[...o].length,n[3]||n[4]){l+=i;continue}else if((n[5]||n[6])&&s%3&&!((s+i)%3)){a+=i;continue}if(l-=i,l>0)continue;i=Math.min(i,i+l+a);let _=[...n[0]][0].length,h=t.slice(0,s+n.index+_+i);if(Math.min(s,i)%2){let $=h.slice(1,-1);return{type:"em",raw:h,text:$,tokens:this.lexer.inlineTokens($)}}let k=h.slice(2,-2);return{type:"strong",raw:h,text:k,tokens:this.lexer.inlineTokens(k)}}}}codespan(t){let e=this.rules.inline.code.exec(t);if(e){let r=e[2].replace(this.rules.other.newLineCharGlobal," "),n=this.rules.other.nonSpaceChar.test(r),s=this.rules.other.startingSpaceChar.test(r)&&this.rules.other.endingSpaceChar.test(r);return n&&s&&(r=r.substring(1,r.length-1)),{type:"codespan",raw:e[0],text:r}}}br(t){let e=this.rules.inline.br.exec(t);if(e)return{type:"br",raw:e[0]}}del(t){let e=this.rules.inline.del.exec(t);if(e)return{type:"del",raw:e[0],text:e[2],tokens:this.lexer.inlineTokens(e[2])}}autolink(t){let e=this.rules.inline.autolink.exec(t);if(e){let r,n;return e[2]==="@"?(r=e[1],n="mailto:"+r):(r=e[1],n=r),{type:"link",raw:e[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}url(t){let e;if(e=this.rules.inline.url.exec(t)){let r,n;if(e[2]==="@")r=e[0],n="mailto:"+r;else{let s;do s=e[0],e[0]=this.rules.inline._backpedal.exec(e[0])?.[0]??"";while(s!==e[0]);r=e[0],e[1]==="www."?n="http://"+e[0]:n=e[0]}return{type:"link",raw:e[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(t){let e=this.rules.inline.text.exec(t);if(e){let r=this.lexer.state.inRawBlock;return{type:"text",raw:e[0],text:e[0],escaped:r}}}},wt=class qn{constructor(e){be(this,"tokens");be(this,"options");be(this,"state");be(this,"inlineQueue");be(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=e||Bt,this.options.tokenizer=this.options.tokenizer||new Xr,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let r={other:st,block:Vr.normal,inline:kr.normal};this.options.pedantic?(r.block=Vr.pedantic,r.inline=kr.pedantic):this.options.gfm&&(r.block=Vr.gfm,this.options.breaks?r.inline=kr.breaks:r.inline=kr.gfm),this.tokenizer.rules=r}static get rules(){return{block:Vr,inline:kr}}static lex(e,r){return new qn(r).lex(e)}static lexInline(e,r){return new qn(r).inlineTokens(e)}lex(e){e=e.replace(st.carriageReturn,`
`),this.blockTokens(e,this.tokens);for(let r=0;r<this.inlineQueue.length;r++){let n=this.inlineQueue[r];this.inlineTokens(n.src,n.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(e,r=[],n=!1){for(this.options.pedantic&&(e=e.replace(st.tabCharGlobal,"    ").replace(st.spaceLine,""));e;){let s;if(this.options.extensions?.block?.some(i=>(s=i.call({lexer:this},e,r))?(e=e.substring(s.raw.length),r.push(s),!0):!1))continue;if(s=this.tokenizer.space(e)){e=e.substring(s.raw.length);let i=r.at(-1);s.raw.length===1&&i!==void 0?i.raw+=`
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
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):r.push(s);continue}if(e){let i="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(i);break}else throw new Error(i)}}return this.state.top=!0,r}inline(e,r=[]){return this.inlineQueue.push({src:e,tokens:r}),r}inlineTokens(e,r=[]){let n=e,s=null;if(this.tokens.links){let a=Object.keys(this.tokens.links);if(a.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(n))!=null;)a.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(n=n.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(n))!=null;)n=n.slice(0,s.index)+"++"+n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(n))!=null;)o=s[2]?s[2].length:0,n=n.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let i=!1,l="";for(;e;){i||(l=""),i=!1;let a;if(this.options.extensions?.inline?.some(_=>(a=_.call({lexer:this},e,r))?(e=e.substring(a.raw.length),r.push(a),!0):!1))continue;if(a=this.tokenizer.escape(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.tag(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.link(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(a.raw.length);let _=r.at(-1);a.type==="text"&&_?.type==="text"?(_.raw+=a.raw,_.text+=a.text):r.push(a);continue}if(a=this.tokenizer.emStrong(e,n,l)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.codespan(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.br(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.del(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.autolink(e)){e=e.substring(a.raw.length),r.push(a);continue}if(!this.state.inLink&&(a=this.tokenizer.url(e))){e=e.substring(a.raw.length),r.push(a);continue}let c=e;if(this.options.extensions?.startInline){let _=1/0,h=e.slice(1),k;this.options.extensions.startInline.forEach($=>{k=$.call({lexer:this},h),typeof k=="number"&&k>=0&&(_=Math.min(_,k))}),_<1/0&&_>=0&&(c=e.substring(0,_+1))}if(a=this.tokenizer.inlineText(c)){e=e.substring(a.raw.length),a.raw.slice(-1)!=="_"&&(l=a.raw.slice(-1)),i=!0;let _=r.at(-1);_?.type==="text"?(_.raw+=a.raw,_.text+=a.text):r.push(a);continue}if(e){let _="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(_);break}else throw new Error(_)}}return r}},Qr=class{constructor(t){be(this,"options");be(this,"parser");this.options=t||Bt}space(t){return""}code({text:t,lang:e,escaped:r}){let n=(e||"").match(st.notSpaceStart)?.[0],s=t.replace(st.endingNewline,"")+`
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
`}strong({tokens:t}){return`<strong>${this.parser.parseInline(t)}</strong>`}em({tokens:t}){return`<em>${this.parser.parseInline(t)}</em>`}codespan({text:t}){return`<code>${$t(t,!0)}</code>`}br(t){return"<br>"}del({tokens:t}){return`<del>${this.parser.parseInline(t)}</del>`}link({href:t,title:e,tokens:r}){let n=this.parser.parseInline(r),s=Ao(t);if(s===null)return n;t=s;let o='<a href="'+t+'"';return e&&(o+=' title="'+$t(e)+'"'),o+=">"+n+"</a>",o}image({href:t,title:e,text:r,tokens:n}){n&&(r=this.parser.parseInline(n,this.parser.textRenderer));let s=Ao(t);if(s===null)return $t(r);t=s;let o=`<img src="${t}" alt="${r}"`;return e&&(o+=` title="${$t(e)}"`),o+=">",o}text(t){return"tokens"in t&&t.tokens?this.parser.parseInline(t.tokens):"escaped"in t&&t.escaped?t.text:$t(t.text)}},Kn=class{strong({text:t}){return t}em({text:t}){return t}codespan({text:t}){return t}del({text:t}){return t}html({text:t}){return t}text({text:t}){return t}link({text:t}){return""+t}image({text:t}){return""+t}br(){return""}checkbox({raw:t}){return t}},kt=class Bn{constructor(e){be(this,"options");be(this,"renderer");be(this,"textRenderer");this.options=e||Bt,this.options.renderer=this.options.renderer||new Qr,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Kn}static parse(e,r){return new Bn(r).parse(e)}static parseInline(e,r){return new Bn(r).parseInline(e)}parse(e){let r="";for(let n=0;n<e.length;n++){let s=e[n];if(this.options.extensions?.renderers?.[s.type]){let i=s,l=this.options.extensions.renderers[i.type].call({parser:this},i);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(i.type)){r+=l||"";continue}}let o=s;switch(o.type){case"space":{r+=this.renderer.space(o);break}case"hr":{r+=this.renderer.hr(o);break}case"heading":{r+=this.renderer.heading(o);break}case"code":{r+=this.renderer.code(o);break}case"table":{r+=this.renderer.table(o);break}case"blockquote":{r+=this.renderer.blockquote(o);break}case"list":{r+=this.renderer.list(o);break}case"checkbox":{r+=this.renderer.checkbox(o);break}case"html":{r+=this.renderer.html(o);break}case"def":{r+=this.renderer.def(o);break}case"paragraph":{r+=this.renderer.paragraph(o);break}case"text":{r+=this.renderer.text(o);break}default:{let i='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return r}parseInline(e,r=this.renderer){let n="";for(let s=0;s<e.length;s++){let o=e[s];if(this.options.extensions?.renderers?.[o.type]){let l=this.options.extensions.renderers[o.type].call({parser:this},o);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){n+=l||"";continue}}let i=o;switch(i.type){case"escape":{n+=r.text(i);break}case"html":{n+=r.html(i);break}case"link":{n+=r.link(i);break}case"image":{n+=r.image(i);break}case"checkbox":{n+=r.checkbox(i);break}case"strong":{n+=r.strong(i);break}case"em":{n+=r.em(i);break}case"codespan":{n+=r.codespan(i);break}case"br":{n+=r.br(i);break}case"del":{n+=r.del(i);break}case"text":{n+=r.text(i);break}default:{let l='Token with "'+i.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return n}},Kr,vr=(Kr=class{constructor(t){be(this,"options");be(this,"block");this.options=t||Bt}preprocess(t){return t}postprocess(t){return t}processAllTokens(t){return t}emStrongMask(t){return t}provideLexer(){return this.block?wt.lex:wt.lexInline}provideParser(){return this.block?kt.parse:kt.parseInline}},be(Kr,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),be(Kr,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),Kr),Nl=class{constructor(...t){be(this,"defaults",Un());be(this,"options",this.setOptions);be(this,"parse",this.parseMarkdown(!0));be(this,"parseInline",this.parseMarkdown(!1));be(this,"Parser",kt);be(this,"Renderer",Qr);be(this,"TextRenderer",Kn);be(this,"Lexer",wt);be(this,"Tokenizer",Xr);be(this,"Hooks",vr);this.use(...t)}walkTokens(t,e){let r=[];for(let n of t)switch(r=r.concat(e.call(this,n)),n.type){case"table":{let s=n;for(let o of s.header)r=r.concat(this.walkTokens(o.tokens,e));for(let o of s.rows)for(let i of o)r=r.concat(this.walkTokens(i.tokens,e));break}case"list":{let s=n;r=r.concat(this.walkTokens(s.items,e));break}default:{let s=n;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let i=s[o].flat(1/0);r=r.concat(this.walkTokens(i,e))}):s.tokens&&(r=r.concat(this.walkTokens(s.tokens,e)))}}return r}use(...t){let e=this.defaults.extensions||{renderers:{},childTokens:{}};return t.forEach(r=>{let n={...r};if(n.async=this.defaults.async||n.async||!1,r.extensions&&(r.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=e.renderers[s.name];o?e.renderers[s.name]=function(...i){let l=s.renderer.apply(this,i);return l===!1&&(l=o.apply(this,i)),l}:e.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=e[s.level];o?o.unshift(s.tokenizer):e[s.level]=[s.tokenizer],s.start&&(s.level==="block"?e.startBlock?e.startBlock.push(s.start):e.startBlock=[s.start]:s.level==="inline"&&(e.startInline?e.startInline.push(s.start):e.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(e.childTokens[s.name]=s.childTokens)}),n.extensions=e),r.renderer){let s=this.defaults.renderer||new Qr(this.defaults);for(let o in r.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let i=o,l=r.renderer[i],a=s[i];s[i]=(...c)=>{let _=l.apply(s,c);return _===!1&&(_=a.apply(s,c)),_||""}}n.renderer=s}if(r.tokenizer){let s=this.defaults.tokenizer||new Xr(this.defaults);for(let o in r.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let i=o,l=r.tokenizer[i],a=s[i];s[i]=(...c)=>{let _=l.apply(s,c);return _===!1&&(_=a.apply(s,c)),_}}n.tokenizer=s}if(r.hooks){let s=this.defaults.hooks||new vr;for(let o in r.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let i=o,l=r.hooks[i],a=s[i];vr.passThroughHooks.has(o)?s[i]=c=>{if(this.defaults.async&&vr.passThroughHooksRespectAsync.has(o))return(async()=>{let h=await l.call(s,c);return a.call(s,h)})();let _=l.call(s,c);return a.call(s,_)}:s[i]=(...c)=>{if(this.defaults.async)return(async()=>{let h=await l.apply(s,c);return h===!1&&(h=await a.apply(s,c)),h})();let _=l.apply(s,c);return _===!1&&(_=a.apply(s,c)),_}}n.hooks=s}if(r.walkTokens){let s=this.defaults.walkTokens,o=r.walkTokens;n.walkTokens=function(i){let l=[];return l.push(o.call(this,i)),s&&(l=l.concat(s.call(this,i))),l}}this.defaults={...this.defaults,...n}}),this}setOptions(t){return this.defaults={...this.defaults,...t},this}lexer(t,e){return wt.lex(t,e??this.defaults)}parser(t,e){return kt.parse(t,e??this.defaults)}parseMarkdown(t){return(e,r)=>{let n={...r},s={...this.defaults,...n},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&n.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof e>"u"||e===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof e!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(e)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=t),s.async)return(async()=>{let i=s.hooks?await s.hooks.preprocess(e):e,l=await(s.hooks?await s.hooks.provideLexer():t?wt.lex:wt.lexInline)(i,s),a=s.hooks?await s.hooks.processAllTokens(l):l;s.walkTokens&&await Promise.all(this.walkTokens(a,s.walkTokens));let c=await(s.hooks?await s.hooks.provideParser():t?kt.parse:kt.parseInline)(a,s);return s.hooks?await s.hooks.postprocess(c):c})().catch(o);try{s.hooks&&(e=s.hooks.preprocess(e));let i=(s.hooks?s.hooks.provideLexer():t?wt.lex:wt.lexInline)(e,s);s.hooks&&(i=s.hooks.processAllTokens(i)),s.walkTokens&&this.walkTokens(i,s.walkTokens);let l=(s.hooks?s.hooks.provideParser():t?kt.parse:kt.parseInline)(i,s);return s.hooks&&(l=s.hooks.postprocess(l)),l}catch(i){return o(i)}}}onError(t,e){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,t){let n="<p>An error occurred:</p><pre>"+$t(r.message+"",!0)+"</pre>";return e?Promise.resolve(n):n}if(e)return Promise.reject(r);throw r}}},qt=new Nl;function fe(t,e){return qt.parse(t,e)}fe.options=fe.setOptions=function(t){return qt.setOptions(t),fe.defaults=qt.defaults,Ro(fe.defaults),fe};fe.getDefaults=Un;fe.defaults=Bt;fe.use=function(...t){return qt.use(...t),fe.defaults=qt.defaults,Ro(fe.defaults),fe};fe.walkTokens=function(t,e){return qt.walkTokens(t,e)};fe.parseInline=qt.parseInline;fe.Parser=kt;fe.parser=kt.parse;fe.Renderer=Qr;fe.TextRenderer=Kn;fe.Lexer=wt;fe.lexer=wt.lex;fe.Tokenizer=Xr;fe.Hooks=vr;fe.parse=fe;var Qd=fe.options,Jd=fe.setOptions,eu=fe.use,tu=fe.walkTokens,ru=fe.parseInline;var nu=kt.parse,su=wt.lex;function Uo(t){let e=fe.parse(t),r=ko.sanitize(e);return $o(r)}function Pl(t){return String(t||"").replace(/^docs\/(superpowers\/)?/,"")}function zo(t,e){let r=e.getWorkspacePath,n=e.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",i="",l="";function a(v){v.key==="Escape"&&s&&(v.preventDefault(),k())}document.addEventListener("keydown",a);function c(){return s?d`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>k()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${Pl(s)}</span
            >
            <button
              type="button"
              class="mv__close"
              aria-label="닫기"
              @click=${()=>k()}
            >
              ✕
            </button>
          </div>
          <div class="mv__body">
            ${o==="loading"?d`<div class="mv__status">불러오는 중…</div>`:o==="error"?d`<div class="mv__status mv__status--error">
                    ${l||"\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}
                  </div>`:Uo(i)}
          </div>
        </div>
      </div>
    `:d``}function _(){_e(c(),t)}async function h(v){s=v,o="loading",i="",l="",_();let S=r?r():"";if(!S){o="error",l="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",_();return}if(!n){o="error",l="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",_();return}let N="/api/doc?workspace="+encodeURIComponent(S)+"&path="+encodeURIComponent(v);try{let P=await n(N),q=await P.json().catch(()=>({}));if(!P.ok||!q||q.ok!==!0){o="error",l="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(q&&q.error||P.status)+")",_();return}i=String(q.content||""),o="ready",_()}catch{o="error",l="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",_()}}function k(){s=null,_e(d``,t)}function $(){document.removeEventListener("keydown",a),k()}return{open:h,close:k,destroy:$}}var Fl=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"},{key:"cache_creation_input_tokens",label:"\uCE90\uC2DC \uC0DD\uC131"}],Ho="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function ql(t){return typeof t=="number"&&Number.isFinite(t)?t:0}function Bl(t){let e=mt(t);if(!e||!t)return"";let r=typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)?` \xB7 $${t.total_cost_usd.toFixed(2)}`:"";return d`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력)"
      >${e.replace(/^τ /,"\u03C4 \uCD1D ")}${r}</span
    >${t.replayed?d`<span class="detail-usage-partial" title=${Ho}
          >부분 집계</span
        >`:""}`}function Ul(t){let e=typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)?t.total_cost_usd:null;return d`<div class="detail-session__usage-detail">
    ${Fl.map(r=>d`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${r.label}</span
          ><span class="detail-session__usage-value"
            >${ql(t[r.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${e===null?"":d`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${e.toFixed(2)}</span
          ></span
        >`}
    ${t.replayed?d`<span class="detail-session__usage-note">${Ho}</span>`:""}
  </div>`}var zl={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function Hl(t){if(typeof t!="number"||!Number.isFinite(t))return"";let e=new Date(t),r=String(e.getHours()).padStart(2,"0"),n=String(e.getMinutes()).padStart(2,"0");return`${r}:${n}`}function Wo(t,e={},r={}){let n=Array.isArray(t)?t:[],s=r.expanded||new Set;if(n.length===0)return d`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let o=new Set;for(let c of n)c&&typeof c.resumed_from=="string"&&c.resumed_from.length>0&&o.add(c.resumed_from);let i=c=>{if(!(c.status==="failed"||c.status==="orphaned"))return"";let h=typeof c.session_id=="string"&&c.session_id.length>0,k=o.has(c.attempt_id),$=h&&!k,v=h?k?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return d`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${c.attempt_id}
      ?disabled=${!$}
      title=${v}
      @click=${S=>{S.stopPropagation(),$&&e.onResume&&e.onResume(c.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},l=c=>{if(!(c.status==="failed"||c.status==="orphaned")||typeof c.cause!="string"||c.cause==="")return"";let h=c.cause_detail,k=h&&typeof h.reason=="string"&&h.reason.length>0?typeof h.command=="string"&&h.command.length>0?`${h.reason} \xB7 ${h.command}`:h.reason:c.cause;return d`<div class="detail-session__cause" title=${k}>
      ${c.cause}
    </div>`},a=c=>{if(!mt(c.usage))return"";let _=s.has(c.attempt_id);return d`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${c.attempt_id}
      aria-expanded=${_?"true":"false"}
      title=${_?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${h=>{h.stopPropagation(),e.onToggleUsage&&e.onToggleUsage(c.attempt_id)}}
    >
      τ 자세히
    </button>`};return d`
    <div class="detail-section-label">
      세션 이력${Bl(r.total)}
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
                >${zl[c.status||""]||"\xB7"}</span
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
              ${mt(c.usage)?d`<span class="detail-session__usage"
                    >${mt(c.usage)}</span
                  >`:""}
              <span class="detail-session__time"
                >${Hl(c.started_at)}</span
              >
            </button>
            ${a(c)} ${i(c)} ${l(c)}
            ${s.has(c.attempt_id)&&c.usage?Ul(c.usage):""}
          </div>`)}
    </div>
  `}var Wl=["open","in_progress","deferred","resolved","closed"],Gl=[0,1,2,3,4];function Go(t,e){let r=e.issueStores,n=e.onClose,s=e.transport,o=e.onNavigate,i=e.queueStore,l=e.sessionLogStore,a=null,c=null,_={},h=!1,k=!1,$="",v="",S="";function N(){h=!1,k=!1,$="",v="",S=""}let P=document.createElement("div");P.className="md-viewer-root",document.body.appendChild(P);let q=zo(P,{getWorkspacePath:e.getWorkspacePath||(()=>"")}),U=document.createElement("div");U.className="session-log-root",document.body.appendChild(U);let D=zr(U,{transport:s?(w,L)=>Promise.resolve(s(w,L)):void 0,sessionLogStore:l});function E(){if(!i||!a)return[];let w=i.get();return(w&&w.attempts?Object.values(w.attempts):[]).filter(T=>T&&T.bead_id===a).sort((T,Z)=>(Z.started_at||0)-(T.started_at||0)).map(T=>({attempt_id:T.attempt_id,bead_id:T.bead_id,status:T.status,started_at:typeof T.started_at=="number"?T.started_at:null,runner:T.runner||null,model:T.model||null,session_id:T.session_id||null,resumed_from:T.resumed_from||null,dismissed_at:typeof T.dismissed_at=="number"?T.dismissed_at:null,cause:typeof T.cause=="string"?T.cause:null,cause_detail:T.cause_detail||null,usage:T.usage||null}))}function A(){if(!i||!a)return null;let w=i.get();return er(w&&w.attempts||{},a)}let x=new Set;function g(w){x.has(w)?x.delete(w):x.add(w),F()}function M(w){let L=i?i.get():null,T=L&&L.attempts?L.attempts[w]:null;D.open({attempt_id:w,meta:T?{runner:T.runner||void 0,model:T.model||void 0,effort:T.effort||void 0,status:T.status||void 0,session_id:T.session_id||void 0}:{}})}async function B(w){if(!s||!w)return;let L=()=>{let Z=i?i.get():null;return Z&&typeof Z.revision=="number"?Z.revision:0},T=await s("worker-attempt-resume",{attempt_id:w,expected_revision:L()});if(T&&T.conflict){let Z=T.queue&&typeof T.queue.revision=="number"?T.queue.revision:L();T=await s("worker-attempt-resume",{attempt_id:w,expected_revision:Z})}T&&T.resumed===!1&&!T.conflict&&T.reason&&J(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${T.reason}`,"error",2400)}let j={onOpen:M,onResume:B,onToggleUsage:g};function V(){let w=i?i.get():null,L=w&&w.exec_defaults;return L&&typeof L=="object"?L:{}}let $e=null;r&&r.subscribe&&($e=r.subscribe(()=>le()));let Ne=null;i&&typeof i.subscribe=="function"&&(Ne=i.subscribe(()=>{a&&F()}));function ye(w){w.key==="Escape"&&a&&(w.preventDefault(),n())}document.addEventListener("keydown",ye);function le(){if(a){if(r&&typeof r.snapshotFor=="function"){let w=r.snapshotFor("detail:"+a)||[];c=w.find(T=>T&&T.id===a)||w[0]||c}F()}}function ie(w){Ft(w).then(L=>{L?J("\uBCF5\uC0AC\uB428","success",1200):J("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function Te(w){w.preventDefault(),w.stopPropagation(),a&&ie(a)}function ot(w,L){w.preventDefault(),w.stopPropagation(),ie(L)}function dt(w,L){w.preventDefault(),w.stopPropagation(),q.open(L)}function we(w,L){_[w]=L,F(),!(!s||!a)&&Promise.resolve(s("update-exec-settings",{id:a,key:w,value:L})).catch(()=>{J("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}async function We(w,L,T){if(!s||!a)return!1;try{let Z=await Promise.resolve(s(w,L)),u=Array.isArray(Z)?Z[0]:Z;return u&&typeof u=="object"&&u.id?(c=u,!0):(J(T,"error"),!1)}catch{return J(T,"error"),!1}}function ke(w){setTimeout(()=>{try{let L=t.querySelector(w);L&&typeof L.focus=="function"&&L.focus()}catch{}},0)}function lt(){h=!0,$=c&&c.title||"",F(),ke('.detail-edit__input[data-edit="title"]')}function pe(w){$=w.target.value}function De(){h=!1,$="",F()}function ut(){We("edit-text",{id:a,field:"title",value:$},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(L=>{L&&(h=!1,$=""),F()})}function Pe(){k=!0,v=c&&c.description||"",F(),ke('.detail-edit__textarea[data-edit="description"]')}function Ge(w){v=w.target.value}function Ae(){k=!1,v="",F()}function je(){We("edit-text",{id:a,field:"description",value:v},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(L=>{L&&(k=!1,v=""),F()})}function Ze(w,L,T,Z){if(w.key==="Escape"){w.stopPropagation(),T();return}w.key==="Enter"&&(!Z||w.ctrlKey||w.metaKey)&&(w.preventDefault(),L())}function Ye(w){let L=w.target.value;We("update-status",{id:a,status:L},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>F())}function Xe(w){let L=Number(w.target.value);We("update-priority",{id:a,priority:L},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>F())}function Fe(w){S=w.target.value}function Qe(){let w=S.trim();w.length!==0&&We("label-add",{id:a,label:w},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(L=>{L&&(S=""),F()})}function Re(w){if(w.key==="Escape"){w.stopPropagation(),S="",F();return}w.key==="Enter"&&(w.preventDefault(),Qe())}function qe(w){We("label-remove",{id:a,label:w},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>F())}let it={onCopyPath:ot,onOpenDoc:dt},Be={onChange:we};function ct(w){return typeof w=="string"?w:w&&typeof w=="object"?String(w.id||w.to||w.issue_id||w.depends_on||""):""}function ht(w){switch(w&&typeof w=="object"?String(w.dependency_type||w.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function xe(w){let T=(Array.isArray(w.dependencies)?w.dependencies:[]).map(Z=>({id:ct(Z),icon:ht(Z)})).filter(Z=>Z.id.length>0);return d`
      <div class="detail-section-label">의존성</div>
      ${T.length===0?d`<div class="detail-empty">의존성 없음</div>`:d`<div class="detail-deps">
            ${T.map(Z=>o?d`<button
                    type="button"
                    class="detail-dep detail-dep--link"
                    @click=${()=>o(Z.id)}
                  >
                    ${Z.icon?`${Z.icon} `:""}${Z.id}
                  </button>`:d`<span class="detail-dep"
                    >${Z.icon?`${Z.icon} `:""}${Z.id}</span
                  >`)}
          </div>`}
    `}function ce(w){let L=w.metadata||{},T=w.workflow||{},Z=T.stages||{},u=Z.spec&&Z.spec.stale,b=Z.impl&&Z.impl.stale,R=T.route_source==="derived",X=T.route||L.route||"\u2014";return d`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${R?" detail-kv__v--derived":""}"
          title=${R?"route \uCD94\uB860\uAC12 (metadata \uBBF8\uD540)":"route"}
          >${R&&T.route?`${X} ? (\uCD94\uB860)`:X}</span
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
          >${L.impl_review||"\uC5C6\uC74C"}${b?" \xB7 stale":""}</span
        >
      </div>
      ${L.pr_url?d`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${L.pr_url}</span>
          </div>`:""}
    `}let Ue={route:["spec_backed","full_plan"]};async function ze(w,L){let T=L.target.value;if(w==="route"&&c&&c.metadata&&c.metadata.route==="full_plan"&&T!=="full_plan"&&!window.confirm(`full_plan \u2192 ${T||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){F();return}await We("update-workflow-meta",{id:a,key:w,value:T},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),F()}function C(w){let L=w.metadata||{};return d` ${((Z,u)=>{let b=Ue[Z],R=typeof L[Z]=="string"?L[Z]:"";return d`<div class="detail-kv">
        <span class="detail-kv__k">${Z}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${Z}
          data-edit=${`wfmeta-${Z}`}
          @change=${X=>ze(Z,X)}
        >
          <option value="" ?selected=${!b.includes(R)}>
            ${u}
          </option>
          ${b.map(X=>d`<option value=${X} ?selected=${R===X}>${X}</option>`)}
        </select>
      </div>`})("route","(\uBBF8\uC124\uC815 \xB7 \uCD94\uB860)")} `}function O(w){return h?d`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${$}
            @input=${pe}
            @keydown=${L=>Ze(L,ut,De,!1)}
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
              @click=${De}
            >
              취소
            </button>
          </div>
        </div>
      `:d`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${w}</h2>
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${lt}
        >
          ✎
        </button>
      </div>
    `}function ee(w){let L=gt(w.created_at),T=gt(w.updated_at);return!L&&!T?d``:d`
      ${L?d`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${L}</span>
          </div>`:""}
      ${T?d`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${T}</span>
          </div>`:""}
    `}function Q(w,L){return d`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${Ye}
        >
          ${Wl.map(T=>d`<option value=${T} ?selected=${T===w}>${T}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${Xe}
        >
          ${Gl.map(T=>d`<option value=${String(T)} ?selected=${T===L}>
                P${T}
              </option>`)}
        </select>
      </div>
    `}function K(w){return d`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${k?"":d`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${Pe}
            >
              ✎
            </button>`}
      </div>
      ${k?d`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${v}
              @input=${Ge}
              @keydown=${L=>Ze(L,je,Ae,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${je}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${Ae}
              >
                취소
              </button>
            </div>
          </div>`:d`<div class="detail-overlay__desc">
            ${w||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function se(w){let L=typeof w.notes=="string"?w.notes:"";return L.trim().length===0?d``:d`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${L}</div>
    `}function de(w){let L=Array.isArray(w.labels)?w.labels:[];return d`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${L.map(T=>d`<span class="detail-label-chip"
              >${T}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${T}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+T}
                @click=${()=>qe(T)}
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
            @input=${Fe}
            @keydown=${Re}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${Qe}
          >
            추가
          </button>
        </span>
      </div>
    `}function he(){if(!a)return d``;let w=c||{},L=String(w.id||a),T=w.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",Z=w.status||"open",u=typeof w.priority=="number"?Math.max(0,Math.min(4,w.priority)):"",b=w.description||"",R={...w,metadata:{...w.metadata||{},..._}};return d`
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
            @click=${Te}
          >
            ${L}
          </button>
          ${O(T)} ${Q(Z,u)}
          ${ee(w)} ${K(b)}
          ${se(w)} ${de(w)} ${xe(w)}
          ${ce(w)} ${C(w)}
          ${oo(w,it)}
          ${io(R,Be,V())}
          ${Wo(E(),j,{total:A(),expanded:x})}
        </div>
      </div>
    `}function F(){_e(he(),t)}return{load(w){w!==a&&(_={},N()),a=w,c=null,le()},clear(){a=null,c=null,_={},N(),q.close(),D.close(),_e(d``,t)},destroy(){$e&&($e(),$e=null),Ne&&(Ne(),Ne=null),document.removeEventListener("keydown",ye),q.destroy(),P.parentNode&&P.parentNode.removeChild(P),D.destroy(),U.parentNode&&U.parentNode.removeChild(U),a=null,c=null,_e(d``,t)}}}var jl=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function jo(t,e){return kn(t,e)?"shown":e.hidden_labels.includes(t)?"hidden_exact":"hidden_prefix"}function Yl(t,e,r){if(!r)return{hidden_labels:e.hidden_labels.includes(t)?e.hidden_labels:[...e.hidden_labels,t],visible_labels:e.visible_labels.filter(o=>o!==t)};let n=e.hidden_labels.filter(o=>o!==t);return e.hidden_prefixes.some(o=>o.length>0&&t.startsWith(o))?{hidden_labels:n,visible_labels:e.visible_labels.includes(t)?e.visible_labels:[...e.visible_labels,t]}:{hidden_labels:n}}function Yo(t,e){let{policyStore:r,transport:n,labelOptions:s}=e,o=document.createElement("dialog");o.id="display-settings-dialog",o.className="display-settings",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),t.appendChild(o);let i="";async function l(A){let x=r.get();if(x)try{let g=await n("display-policy-set",{expected_revision:x.revision,policy:A(x)});a(g),g&&g.conflict&&g.policy&&(g=await n("display-policy-set",{expected_revision:g.policy.revision,policy:A(g.policy)}),a(g)),g&&g.conflict&&J("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC","error",4e3)}catch{J("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function a(A){A&&A.policy&&typeof A.policy=="object"&&r.set(A.policy)}function c(A){let x=r.get();if(!x)return;let g=jo(A,x)!=="shown";l(M=>Yl(A,M,g))}function _(){let A=i.trim();A.length!==0&&(i="",l(x=>x.hidden_prefixes.includes(A)?{hidden_prefixes:x.hidden_prefixes}:{hidden_prefixes:[...x.hidden_prefixes,A]}),N())}function h(A){l(x=>({hidden_prefixes:x.hidden_prefixes.filter(g=>g!==A)}))}function k(A){let x=r.get();if(!x)return;let g=x.chips[A]===!1;l(()=>({chips:{[A]:g}}))}function $(A){let x=s();return d`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">라벨 표시</h3>
        <p class="display-settings__hint">
          라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을
          누르면 그 라벨만 예외로 다시 표시됩니다.
        </p>
        ${x.length===0?d`<div class="display-settings__empty">라벨 없음</div>`:d`<div class="display-settings__pills">
              ${x.map(g=>{let M=jo(g,A);return d`<button
                  type="button"
                  class=${`display-settings__pill display-settings__pill--${M}`}
                  data-label=${g}
                  data-state=${M}
                  @click=${()=>c(g)}
                >
                  ${g}
                </button>`})}
            </div>`}
      </section>
    `}function v(A){return d`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">숨김 prefix</h3>
        <div class="display-settings__prefixes">
          ${A.hidden_prefixes.map(x=>d`<span class="display-settings__prefix">
                ${x}
                <button
                  type="button"
                  class="display-settings__prefix-remove"
                  aria-label=${`${x} \uADDC\uCE59 \uC81C\uAC70`}
                  @click=${()=>h(x)}
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
            @input=${x=>{i=String(x.target.value||"")}}
          />
          <button type="button" @click=${_}>추가</button>
        </div>
      </section>
    `}function S(A){return d`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">카드 표시 요소</h3>
        <div class="display-settings__toggles">
          ${jl.map(([x,g])=>d`<label class="display-settings__toggle">
                <input
                  type="checkbox"
                  data-chip=${x}
                  .checked=${A.chips[x]!==!1}
                  @change=${()=>k(x)}
                />
                <span>${g}</span>
              </label>`)}
        </div>
      </section>
    `}function N(){let A=r.get();_e(d`
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
            ${A?d`${$(A)} ${v(A)}
                ${S(A)}`:d`<div class="display-settings__empty">
                  표시 정책을 불러오는 중…
                </div>`}
          </div>
        </div>
      `,o)}let P=!1,q=()=>{P=!1};o.addEventListener("close",q),o.addEventListener("cancel",q);let U=null;r.subscribe&&(U=r.subscribe(()=>{P&&N()}));function D(){P||(i="",P=!0,N(),typeof o.showModal=="function"?o.showModal():o.setAttribute("open",""))}function E(){P&&(P=!1,typeof o.close=="function"?o.close():o.removeAttribute("open"))}return{open:D,close:E,destroy(){P=!1,o.removeEventListener("close",q),o.removeEventListener("cancel",q),U&&(U(),U=null),o.remove()}}}function Vo(t){let e=document.createElement("dialog");e.id="fatal-error-dialog",e.setAttribute("role","alertdialog"),e.setAttribute("aria-modal","true"),e.innerHTML=`
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
    </div>`,t.appendChild(e);let r=e.querySelector("#fatal-error-title"),n=e.querySelector("#fatal-error-message"),s=e.querySelector("#fatal-error-detail"),o=e.querySelector("#fatal-error-reload"),i=e.querySelector("#fatal-error-close"),l=()=>{if(typeof e.close=="function")try{e.close()}catch{}e.removeAttribute("open")},a=(c,_,h="")=>{r&&(r.textContent=c||"Unexpected Error"),n&&(n.textContent=_||"An unrecoverable error occurred.");let k=typeof h=="string"?h.trim():"";if(s&&(k.length>0?(s.textContent=k,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof e.showModal=="function")try{e.showModal(),e.setAttribute("open","")}catch{e.setAttribute("open","")}else e.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),i&&i.addEventListener("click",()=>l()),e.addEventListener("cancel",c=>{c.preventDefault(),l()}),{open:a,close:l,getElement(){return e}}}function Ko(t,e,r){let n=Ce("views:nav"),s=null;function o(a){return c=>{c.preventDefault(),n("click tab %s",a),r.gotoView(a)}}function i(){let c=e.getState().view==="worker"?"worker":"board";return d`
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
    `}function l(){_e(i(),t)}return l(),s=e.subscribe(()=>l()),{destroy(){s&&(s(),s=null),_e(d``,t)}}}var Zo=["bug","feature","task","epic","chore"];function Xo(t){switch((t||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var Qo=["Critical","High","Medium","Low","Backlog"];function Jo(t,e){let r=document.createElement("dialog");r.id="new-issue-dialog",r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true"),r.innerHTML=`
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
  `,t.appendChild(r);let n=r.querySelector("#new-issue-form"),s=r.querySelector("#new-title"),o=r.querySelector("#new-type"),i=r.querySelector("#new-priority"),l=r.querySelector("#new-labels"),a=r.querySelector("#new-description"),c=r.querySelector("#new-issue-error"),_=r.querySelector("#btn-cancel"),h=r.querySelector("#btn-create"),k=r.querySelector(".new-issue__close");function $(){o.replaceChildren();let E=document.createElement("option");E.value="",E.textContent="\u2014 Select \u2014",o.appendChild(E);for(let A of Zo){let x=document.createElement("option");x.value=A,x.textContent=Xo(A),o.appendChild(x)}i.replaceChildren();for(let A=0;A<=4;A+=1){let x=document.createElement("option");x.value=String(A);let g=Qo[A]||"Medium";x.textContent=`${A} \u2013 ${g}`,i.appendChild(x)}}$();function v(){try{typeof r.close=="function"?r.close():r.removeAttribute("open")}catch{r.removeAttribute("open")}}function S(E){s.disabled=E,o.disabled=E,i.disabled=E,l.disabled=E,a.disabled=E,_.disabled=E,h.disabled=E,h.textContent=E?"Creating\u2026":"Create"}function N(){c.textContent=""}function P(E){c.textContent=E}function q(){try{let E=window.localStorage.getItem("beads-ui.new.type");E?o.value=E:o.value="";let A=window.localStorage.getItem("beads-ui.new.priority");A&&/^\d$/.test(A)?i.value=A:i.value="2"}catch{o.value="",i.value="2"}}function U(){let E=o.value||"",A=i.value||"";E.length>0&&window.localStorage.setItem("beads-ui.new.type",E),A.length>0&&window.localStorage.setItem("beads-ui.new.priority",A)}async function D(){N();let E=String(s.value||"").trim();if(E.length===0){P("Title is required"),s.focus();return}let A=Number(i.value||"2");if(!(A>=0&&A<=4)){P("Priority must be 0..4"),i.focus();return}let x=String(o.value||""),g=String(a.value||""),M={title:E};x.length>0&&(M.type=x),String(A).length>0&&(M.priority=A),g.length>0&&(M.description=g),S(!0);try{await e("create-issue",M)}catch{S(!1),P("Failed to create issue");return}U(),S(!1),v()}return r.addEventListener("cancel",E=>{E.preventDefault(),v()}),k.addEventListener("click",()=>v()),_.addEventListener("click",()=>v()),r.addEventListener("keydown",E=>{E.key==="Enter"&&(E.ctrlKey||E.metaKey)&&(E.preventDefault(),D())}),n.addEventListener("submit",E=>{E.preventDefault(),D()}),{open(){n.reset(),N(),q();try{"showModal"in r&&typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")}catch{r.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){v()}}}function ei(t){if(typeof t!="number"||!Number.isFinite(t)||t<=0)return"";if(t<6e4)return`${Math.round(t/1e3)}\uCD08`;let e=t/6e4;return`${Number.isInteger(e)?e:Math.round(e*10)/10}\uBD84`}function ti(t){return Array.isArray(t)?t.filter(e=>typeof e=="string").join(" "):""}var Vl={deployed:{modifier:"ok",label:"\uC131\uACF5"},launched:{modifier:"launched",label:"\uBC1C\uC0AC\uB428"},failed:{modifier:"fail",label:"\uC2E4\uD328"}},Kl=[{key:"orchestration_model",values:()=>xn},{key:"orchestration_effort",values:()=>Sn},{key:"review_model",values:()=>Tn},{key:"impl_model",values:()=>An}];function ri(t,e){let{queueStore:r,transport:n,getWorkspacePath:s}=e,o=document.createElement("dialog");o.id="worker-exec-defaults-dialog",o.className="exec-defaults",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),t.appendChild(o);function i(){return r&&r.get()||{revision:0,exec_defaults:{}}}function l(){let g=i();return typeof g.revision=="number"?g.revision:0}function a(){let g=i().exec_defaults;return g&&typeof g=="object"?g:{}}function c(g){g&&g.queue&&r&&r.set(g.queue)}async function _(g,M){if(!n)return;let B={key:g,value:M||null};try{let j=await n("worker-queue-set-exec-default",{...B,expected_revision:l()});c(j),j&&j.conflict&&(j=await n("worker-queue-set-exec-default",{...B,expected_revision:l()}),c(j)),j&&j.conflict&&J("\uC804\uC5ED \uC2E4\uD589 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC","error",4e3)}catch{J("\uC804\uC5ED \uC2E4\uD589 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function h(g,M,B){let j=!!B&&!M.includes(B);return d`<div class="exec-defaults__row">
      <span class="exec-defaults__k">${g}</span>
      <select
        class="exec-defaults__sel"
        aria-label=${`\uC804\uC5ED ${g}`}
        data-key=${g}
        @change=${V=>{_(g,V.target.value)}}
      >
        <option value="" ?selected=${!B}>
          ${En[g]||"(\uAE30\uBCF8)"}
        </option>
        ${j?d`<option value=${B} ?selected=${!0}>
              ${B} (비호환)
            </option>`:""}
        ${M.map(V=>d`<option value=${V} ?selected=${B===V}>${V}</option>`)}
      </select>
    </div>`}function k(){let g=i().workspace_info;return g&&typeof g=="object"?g:{}}function $(g,M){return d`<span
      class="exec-defaults__vd-badge exec-defaults__vd-badge--${g}"
      >${M}</span
    >`}function v(g){let M=g?ti(g.cmd):"",B=g?ei(g.timeout_ms):"",j=s&&s()||"<workspace \uACBD\uB85C>";return d`<div class="exec-defaults__vd-group" data-vd="verify">
      <div class="exec-defaults__vd-label">머지 전 검증 (verify)</div>
      ${M?d`<div class="exec-defaults__vd-line">
            <span class="exec-defaults__vd-cmd">${M}</span>
            ${$("config","config")}
            ${B?d`<span class="exec-defaults__vd-meta"
                  >timeout ${B}</span
                >`:""}
          </div>`:d`<div class="exec-defaults__vd-line exec-defaults__vd-absent">
            검증 없음 —
            <span class="exec-defaults__vd-cmd"
              >[worker.verify."${j}"]</span
            >
            섹션으로 정의
          </div>`}
    </div>`}function S(g){let M=g?ti(g.cmd):"",B=g?ei(g.timeout_ms):"",j=B?`timeout ${B} \xB7 verify \uD1B5\uACFC \uC2DC\uC5D0\uB9CC \uC2E4\uD589`:"verify \uD1B5\uACFC \uC2DC\uC5D0\uB9CC \uC2E4\uD589",V=s&&s()||"<workspace \uACBD\uB85C>";return d`<div class="exec-defaults__vd-group" data-vd="deploy">
      <div class="exec-defaults__vd-label">머지 후 배포 (deploy)</div>
      ${M?d`<div class="exec-defaults__vd-line">
            <span class="exec-defaults__vd-cmd">${M}</span>
            ${$("config","config")}
            ${g.detached===!0?$("detached","detached"):""}
            <span class="exec-defaults__vd-meta">${j}</span>
          </div>`:d`<div class="exec-defaults__vd-line exec-defaults__vd-absent">
            배포 없음 —
            <span class="exec-defaults__vd-cmd"
              >[worker.deploy."${V}"]</span
            >
            섹션으로 정의
          </div>`}
    </div>`}function N(g){if(!g||typeof g!="object")return"";let M=Vl[String(g.outcome)];if(!M)return"";let B=g.outcome==="failed"&&g.reason?`${M.label} \xB7 ${g.reason}`:M.label,j=[gt(g.at),typeof g.bead_id=="string"?g.bead_id:"",typeof g.base_sha=="string"?g.base_sha.slice(0,7):""].filter(V=>V.length>0).join(" \xB7 ");return d`<div class="exec-defaults__vd-group" data-vd="last-deploy">
      <div class="exec-defaults__vd-label">마지막 배포</div>
      <div class="exec-defaults__vd-line">
        ${$(M.modifier,B)}
        ${j?d`<span class="exec-defaults__vd-meta">${j}</span>`:""}
      </div>
    </div>`}function P(g){return d`<section class="exec-defaults__vd">
      <p class="exec-defaults__vd-title">
        검증·배포 설정
        <span class="exec-defaults__vd-ro"
          >읽기 전용 — config.toml에서 정의</span
        >
      </p>
      ${v(g.verify_cmd)} ${S(g.deploy_cmd)}
      ${N(g.last_deploy)}
    </section>`}function q(){let g=a();_e(d`
        <div class="exec-defaults__container">
          <header class="exec-defaults__header">
            <div class="exec-defaults__title">전역 실행 설정</div>
            <button
              type="button"
              class="exec-defaults__close"
              aria-label="닫기"
              @click=${x}
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
            ${Kl.map(M=>h(M.key,M.values(),g[M.key]||""))}
            ${P(k())}
          </div>
        </div>
      `,o)}let U=!1,D=()=>{U=!1};o.addEventListener("close",D),o.addEventListener("cancel",D);let E=null;r&&r.subscribe&&(E=r.subscribe(()=>{U&&q()}));function A(){U||(U=!0,q(),typeof o.showModal=="function"?o.showModal():o.setAttribute("open",""))}function x(){U&&(U=!1,typeof o.close=="function"?o.close():o.removeAttribute("open"))}return{open:A,close:x,destroy(){U=!1,o.removeEventListener("close",D),o.removeEventListener("cancel",D),E&&(E(),E=null),o.remove()}}}function Sr(t){let e=Qt(t.created_at),r=Qt(t.updated_at);return!e&&!r?"":d`<div class="worker-mini__meta">
    ${e?d`<span title=${`\uC0DD\uC131 ${gt(t.created_at)}`}
          >생성 ${e}</span
        >`:""}${e&&r?d`<span>·</span>`:""}${r?d`<span title=${`\uC218\uC815 ${gt(t.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </div>`}function Zn(t){let e=t.draggable&&!t.done,r=Array.isArray(t.badges)?t.badges:[],n=mt(t.usage),s=t.merge_step||null,o=t.lane==="pr_wait"||!!t.revise_action,i=e?d`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",l=d`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${t.id}</span
  >`,a=d`<span class="worker-mini__title">${t.title}</span>`,c=t.pr_url&&t.pr_number?d`<a
          class="worker-mini__pr"
          href=${t.pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="PR 열기"
          >#${t.pr_number} ↗</a
        >`:"",_=r.map(U=>U===t.live_badge?d`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${U}</span
        >`:d`<span
          class="worker-mini__badge${t.alert?" worker-mini__badge--alert":""}"
          >${U}</span
        >`),h=t.reason?d`<span class="worker-mini__reason">${t.reason}</span>`:"",k=n?d`<span class="worker-usage" title=${Ur(t.usage)}
        >${n}</span
      >`:"",$=s?d`<span class="merge-step"
        >${s.label}<span class="merge-step__n"
          >${s.index}/${s.total}</span
        ></span
      >`:"",v=t.merge_action?d`<button
        type="button"
        class="worker-mini__merge"
        data-bead-id=${t.id}
        ?disabled=${t.merge_enabled===!1}
        title=${t.merge_title||""}
      >
        ${t.merge_label||"\uBA38\uC9C0"}
      </button>`:"",S=t.cancel_action?d`<button
        type="button"
        class="worker-mini__merge-cancel"
        data-bead-id=${t.id}
        ?disabled=${t.cancel_enabled===!1}
        title=${t.cancel_title||""}
      >
        취소
      </button>`:"",N=t.discard_action?d`<button
        type="button"
        class="worker-mini__discard"
        data-bead-id=${t.id}
        ?disabled=${t.discard_enabled===!1}
        title=${t.discard_enabled===!1?t.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
      >
        폐기
      </button>`:"",P=t.revise_action?d`<button
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
        </button>`:"",q=!!(n||s||t.merge_action||t.cancel_action||t.discard_action||t.revise_action);return d`<div
    class="worker-mini${o?" worker-mini--card":""}${e?"":" worker-mini--static"}${t.done?" worker-mini--done":""}${s?" worker-mini--merging":""}${t.external?" worker-mini--external":""}"
    style=${s?`--progress: ${s.percent}%`:""}
    draggable=${e?"true":"false"}
    data-bead-id=${t.id}
    data-lane=${t.lane}
  >
    ${o?d`<div class="worker-mini__head">
            ${i}${l}${c}${_}${h}
          </div>
          <div class="worker-mini__body">${a}</div>
          ${q?d`<div class="worker-mini__foot">
                ${k}${$}
                <span class="worker-mini__actions"
                  >${v}${S}${N}${P}</span
                >
              </div>`:""}
          ${Sr(t)}`:d`<div class="worker-mini__line">
            ${i}${l}${a}${c}${_}${h}${k}${$}${v}${S}${N}
          </div>
          ${Sr(t)}`}
  </div>`}function Zl(t){let e=t.draggable&&!t.done,r=t.workflow,n=r&&r.chips||{},s=n.route||r&&r.route,o=n.route_source==="derived"||!!(r&&r.route_source==="derived"),i=typeof t.reason=="string"&&t.reason.startsWith("\u26D4");return d`<div
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
    ${r?Br(r,t.status):""}
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
    ${Sr(t)}
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
                  </div>`:t.items.map(n=>t.lane==="candidate"?Zl(n):Zn(n))}
          </div>`}
  </section>`}var ni=160;function Xn(t){return t.length>ni?`${t.slice(0,ni)}\u2026`:t}function Xl(t){return!t||!t.reason?"":d`<div class="worker-banner__detail">
    가드:
    ${t.reason}${t.command?d` · <code>${Xn(t.command)}</code>`:""}
  </div>`}function Ql(t){return t?d`<details class="worker-banner__tail">
    <summary>출력 tail</summary>
    <pre>${t}</pre>
  </details>`:""}function Jl(t){return t?d`<div class="worker-banner__log-path">
    전체 로그: <code>${t}</code>
  </div>`:""}function ec(t){if(!Number.isFinite(t)||t<0)return"0s";let e=Math.floor(t/1e3),r=Math.floor(e/60),n=e%60;return r>0?`${r}m ${String(n).padStart(2,"0")}s`:`${n}s`}function tc(t){if(!t||!t.reason)return"";let e=t.reason.startsWith("export_removal_failed:");return d`<div
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
          남은 작업: <code>${Xn(t.detail)}</code>
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
  </div>`}function si(t){let e=Array.isArray(t.cleanupFailures)?t.cleanupFailures:[];return d`<div class="worker-banners">
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
          ${Xl(t.failure.cause_detail)}
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
                <code>${Xn(r.detail)}</code>
              </div>`:""}
          ${Jl(r.log_path)} ${Ql(r.output_tail)}
        </div>`)}
    ${tc(t.shipFailure)}
  </div>`}function rc(t,e,r=null){let n=!!t.paused,s=n?"\uC77C\uC2DC\uC815\uC9C0":typeof t.started_at=="number"?ec(e-t.started_at):"\u2014",o=[t.runner,t.model].filter(Boolean).join(" \xB7 "),i=mt(t.usage),l=t.conflict_resolution?n?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,a=t.attempt_id&&t.attempt_id===r;return d`<div
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
          ${i?d`<span class="worker-usage" title=${Ur(t.usage)}
                >${i}</span
              >`:""}
        </div>`:""}
    ${Sr(t)}
    <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일): 큐
         스냅샷에는 페이즈명도 진행률도 없으므로 진행 바는 만들지 않는다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
    ${n?"":d`<div class="rtile__accent" aria-hidden="true"></div>`}
  </div>`}function Qn(t,e=Date.now(),r=null){let n=Array.isArray(t)?t:[];return d`<div class="worker-rungrid" id="worker-rungrid">
    ${n.length===0?d`<div class="worker-rungrid__empty">실행 세션 없음</div>`:n.map(s=>rc(s,e,r))}
  </div>`}var nc="tab:worker:ready",sc="tab:worker:blocked",tn=1;function ts(t){let e=t&&t.metadata;return!!(e&&typeof e=="object"&&e.spec_id)}var ai="beads-ui.worker.candidate-filter",Jn={show_blocked:!1,spec:"all"};function oc(){try{let t=window.localStorage.getItem(ai);if(!t)return{...Jn};let e=JSON.parse(t);if(!e||typeof e!="object")return{...Jn};let r=e.spec;return{show_blocked:e.show_blocked===!0,spec:r==="with"||r==="without"?r:"all"}}catch{return{...Jn}}}function ic(t){try{window.localStorage.setItem(ai,JSON.stringify(t))}catch{}}function ac(t,e){let r=l=>e.show_blocked||!l.blocked,n=l=>e.spec==="all"||(e.spec==="with"?l.has_spec:!l.has_spec),s=[],o=0,i=0;for(let l of t){let a=r(l),c=n(l);a&&c?s.push(l):!a&&c?o+=1:a&&!c&&(i+=1)}return{visible:s,hidden_blocked:o,hidden_spec:i}}var lc=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],li="bdui.worker.candidate_sort",cc=[{value:"spec",label:"spec \uC6B0\uC120"},{value:"board",label:"Board \uC21C\uC11C"},{value:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131\uC21C"}],rn="spec";function dc(){try{let t=window.localStorage.getItem(li);return t==="board"||t==="created"||t==="spec"?t:rn}catch{return rn}}function uc(t){try{window.localStorage.setItem(li,t)}catch{}}var ci="bdui.worker.done-range";function pc(){try{let t=window.localStorage.getItem(ci);return Yt(t)?t:St}catch{return St}}function fc(t){try{window.localStorage.setItem(ci,t)}catch{}}var hc="(max-width: 640px)",di="beads-ui.worker.lane-collapsed",Tr={queue:!0,done:!0};function _c(){try{let t=window.localStorage.getItem(di);if(!t)return{...Tr};let e=JSON.parse(t);return!e||typeof e!="object"?{...Tr}:{queue:typeof e.queue=="boolean"?e.queue:Tr.queue,done:typeof e.done=="boolean"?e.done:Tr.done}}catch{return{...Tr}}}function gc(t){try{window.localStorage.setItem(di,JSON.stringify(t))}catch{}}function oi(t){let e=Array.isArray(t)&&t.length>0?t[0]:null;if(!e)return"";let r=typeof e.title=="string"?e.title:e.id||"";return r.length>22?`${r.slice(0,22)}\u2026`:r}function mc(t,e,r){let n=Array.isArray(t)?t.slice():[];return e==="created"?n.sort(Mt):(n.sort(Mr(r)),e==="board"?n:[...n.filter(ts),...n.filter(s=>!ts(s))])}function bc(t){let e=t&&t.parent;return(typeof e=="string"?e.length>0:!!(e&&e.id))||/\.\d+$/.test(t&&t.id||"")}function wc(t){let r=(Array.isArray(t?.dependencies)?t.dependencies:[]).map(n=>typeof n=="string"?n:n&&n.id).filter(Boolean);return r.length>0?`\u{1F512} ${r.join(", ")}`:"\u{1F512} blocked"}var kc=["closed_unmerged","undecidable"],yc=[{from:"\uAD00\uCE21 \uB300\uAE30",activity:"checking",to:"\uD655\uC778\uC911"},{from:"\uB85C\uCEEC\uAC80\uC99D \uB300\uAE30",activity:"verifying",to:"\uB85C\uCEEC\uAC80\uC99D \uC2E4\uD589 \uC911"}];function vc(t,e){for(let r of yc)if(t===r.from&&e===r.activity)return{label:r.to,live:!0};return{label:t,live:!1}}var es=[{step:"merging",label:"\uBA38\uC9C0 \uC911"},{step:"base_sync",label:"base \uB3D9\uAE30\uD654"},{step:"post_merge_verify",label:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D"},{step:"deploy",label:"\uBC30\uD3EC"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"},{step:"ship_exported_capabilities",label:"capability \uBC1C\uD589"}];function $c(t){if(typeof t!="string"||t.length===0)return null;let e=es.length,r=es.findIndex(n=>n.step===t);return r<0?{label:t,index:0,total:e,percent:0}:{label:es[r].label,index:r+1,total:e,percent:Math.round((r+1)/e*100)}}function ii(t){switch(t){case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";default:return t}}function xc(t,e,r,n,s=null,o=null,i=null,l=!1,a=null,c=!0,_=null){let h=!!a&&a.position>0,k=!!a&&a.active===!0,$=a&&a.failure||null,v=r[t]||null,S=v&&v.gate?v.gate:null,N=v&&v.pr?v.pr:null,P=[];l&&P.push("\uC138\uC158");let q=i?i==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":null,U=vc(l&&S&&S.tier==="closed_unmerged"?"\uB2EB\uD798":S&&S.gate_badge||"",q?null:o&&o.activity||null);q&&P.push(q),U.label&&P.push(U.label),S&&S.base_badge&&S.base_badge!==S.gate_badge&&P.push(S.base_badge),n&&P.push("\uC815\uB9AC \uC2E4\uD328"),h&&!k&&P.push(`\uBA38\uC9C0 \uB300\uAE30 #${a.position}`),$&&P.push(`\uC77C\uAD04 \uBA38\uC9C0 \uC2E4\uD328: ${ii($)}`),_&&P.push(`\uC790\uB3D9 \uC81C\uC678: ${ii(_)}`);let D=!!S&&S.base_badge==="\uCDA9\uB3CC",E=!!S&&S.enabled===!0,A=$c(o&&o.merge_progress?o.merge_progress.step:null),x=!!n&&!!S&&S.tier==="merged",g=l&&!!S&&S.tier==="merged",M=l&&D&&c===!1;return{id:t,title:e,reason:n?"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644":"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",external:l,pr_number:N&&typeof N.number=="number"?N.number:null,pr_url:N&&typeof N.url=="string"?N.url:"",badges:P,live_badge:i==="running"?q:q?null:U.live?U.label:null,usage:s,alert:!!S&&kc.includes(S.tier)||!!n||!!$,merge_action:!h,cancel_action:h,cancel_enabled:!k,cancel_title:k?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard_action:!l&&!n&&!(S&&S.tier==="merged"),merge_step:A,discard_enabled:!A&&!i&&!h,discard_title:i?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":h?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":void 0,merge_enabled:!A&&!i&&!M&&(E||D||x||g),merge_label:g?"\uC815\uB9AC":D&&!A&&!x?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:A?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${A.label}`:g?"\uBA38\uC9C0\uB428 \u2014 \uD074\uB9AD\uD558\uBA74 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC\uB97C \uC218\uD589\uD569\uB2C8\uB2E4":M?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":i==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":i==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":x?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uCC98\uC74C\uBD80\uD130 \uB2E4\uC2DC \uC218\uD589\uD569\uB2C8\uB2E4":D?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":E?`\uBA38\uC9C0 (${S.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:S&&S.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${S&&S.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function rs(t,e={}){let{transport:r,issueStores:n,queueStore:s,sessionLogStore:o,uiOrderStore:i,gotoIssue:l,getWorkspacePath:a}=e,c=n?Pr(n,i):null,_=Fr({transport:r,uiOrderStore:i}),h=null,k=[],$=oc(),v=dc(),S=pc();function N(){let u=ur.find(b=>b.value===S);return u?u.label:"\uC624\uB298"}let P=_c(),q=!1,U=new Set,D=new Set,E=[],A=document.createElement("div");A.className="worker-console";let x=document.createElement("div");x.className="worker-top";let g=document.createElement("div");g.className="worker-drawer-overlay",g.hidden=!0;let M=document.createElement("div");M.className="worker-drawer-overlay__backdrop";let B=document.createElement("div");B.className="worker-drawer-host",g.append(M,B);let j=document.createElement("div");j.className="worker-lanes-host",A.append(x,g,j),t.appendChild(A);let V=null,$e=zr(B,{transport:r,sessionLogStore:o,onClose:()=>{V=null,g.hidden=!0,ce()}}),Ne=ri(A,{queueStore:s,transport:r,getWorkspacePath:a});function ye(){return s&&s.get()||{revision:0,auto_advance:!1,auto_merge:!1,slots:tn,queue:[],pr_wait:[],done:[]}}function le(){let u=ye();return typeof u.revision=="number"?u.revision:0}function ie(u){u&&u.queue&&s&&s.set(u.queue)}function Te(){let u=ye().queue;return Array.isArray(u)?u.length:0}async function ot(u,b){if(!r)return;let R=await r("worker-queue-place",{bead_id:u,index:b,expected_revision:le()});ie(R),R&&R.conflict&&await r("worker-queue-place",{bead_id:u,index:b,expected_revision:le()}).then(ie)}async function dt(u,b){if(!r)return;let R=await r("worker-queue-reorder",{bead_id:u,to_index:b,expected_revision:le()});ie(R),R&&R.conflict&&await r("worker-queue-reorder",{bead_id:u,to_index:b,expected_revision:le()}).then(ie)}async function we(u){if(!r)return;let b=await r("worker-queue-remove",{bead_id:u,expected_revision:le()});ie(b),b&&b.conflict&&await r("worker-queue-remove",{bead_id:u,expected_revision:le()}).then(ie)}async function We(u){!r||!u||await r("worker-attempt-stop",{attempt_id:u})}async function ke(u){if(!r||!u)return;let b=await r("worker-attempt-pause",{attempt_id:u});b&&b.paused===!1&&b.reason&&J(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${b.reason}`,"error",2400)}async function lt(u){if(!r||!u)return;let b=await r("worker-attempt-resume",{attempt_id:u,expected_revision:le()});ie(b),b&&b.conflict&&(b=await r("worker-attempt-resume",{attempt_id:u,expected_revision:le()}),ie(b)),b&&b.resumed===!1&&!b.conflict&&b.reason&&J(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${b.reason}`,"error",2400)}async function pe(u){if(!r||!u)return;let b=await r("worker-attempt-dismiss",{attempt_id:u,expected_revision:le()});ie(b),b&&b.conflict&&(b=await r("worker-attempt-dismiss",{attempt_id:u,expected_revision:le()}),ie(b)),b&&b.dismissed===!1&&!b.conflict&&b.reason&&J(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${b.reason}`,"error",2400)}async function De(u,b){if(!r)return null;let R=r,X=await R(u,{...b,expected_revision:le()});return ie(X),X&&X.conflict&&(X=await R(u,{...b,expected_revision:le()}),ie(X)),X}async function ut(u){if(!r||!u)return;U.add(u),ce();let b;try{b=await De("worker-merge-queue-add",{bead_id:u})}finally{U.delete(u),ce()}!b||b.conflict||b.applied||J("\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)","error",2400)}async function Pe(u){if(!r)return;let b=await De("worker-merge-auto-toggle",{on:u});!b||b.conflict||J(u?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",u?"success":"info",2400)}async function Ge(u){if(!r||!u)return;let b=await De("worker-merge-queue-remove",{bead_id:u});b&&!b.conflict&&!b.applied&&b.reason==="merge_active"&&J("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function Ae(){await De("worker-merge-queue-remove",{all:!0})}async function je(u){if(!r||!u||!(typeof globalThis.confirm!="function"||globalThis.confirm(`${u}: PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4. \uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694. \uACC4\uC18D\uD560\uAE4C\uC694?`)))return;let R=await r("worker-pr-discard",{bead_id:u,expected_revision:le()});if(ie(R),R&&R.conflict&&(R=await r("worker-pr-discard",{bead_id:u,expected_revision:le()}),ie(R)),R&&R.discarded===!0){J("\uD3D0\uAE30 \uC644\uB8CC \u2014 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB2E4\uC2DC \uC2E4\uD589\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4","success",2400);return}R&&R.discarded===!1&&!R.conflict&&J(`\uD3D0\uAE30 \uAC70\uBD80: ${R.reason||""}`,"error",2800)}async function Ze(u,b){if(!r||!b||D.has(b))return;D.add(b),ce();let R;try{R=await r(u,{bead_id:b,expected_revision:le()}),ie(R),R&&R.conflict&&(R=await r(u,{bead_id:b,expected_revision:le()}),ie(R))}finally{D.delete(b),ce()}if(!(!R||R.conflict)){if(R.ok){J(u==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}J(`\uCC98\uBD84 \uAC70\uBD80: ${R.reason||""}`,"error",3e3)}}async function Ye(u){if(!r)return;let b=await r("worker-queue-toggle",{on:u,expected_revision:le()});ie(b),b&&b.conflict&&await r("worker-queue-toggle",{on:u,expected_revision:le()}).then(ie)}async function Xe(u){if(!r||!Number.isFinite(u))return;let b=Math.max(tn,Math.floor(u)),R=await r("worker-queue-set-slots",{slots:b,expected_revision:le()});ie(R),R&&R.conflict&&await r("worker-queue-set-slots",{slots:b,expected_revision:le()}).then(ie)}function Fe(){let u=ye(),b=c?c.selectBoardColumn(nc,"ready"):[],R=c?c.selectBoardColumn(sc,"blocked"):[],X=u.bead_titles||{},ae=new Map;for(let[y,H]of Object.entries(X))typeof H=="string"&&H.length>0&&ae.set(y,H);for(let y of[...b,...R])ae.set(y.id,y.title||y.id);let Ee=u.bead_times||{},f=new Map;for(let[y,H]of Object.entries(Ee))H&&typeof H=="object"&&f.set(y,H);for(let y of[...b,...R])f.set(y.id,{created_at:y.created_at,updated_at:y.updated_at});let m=y=>f.get(y)||{},W=u.pr_wait||[],G=u.pr_observations||{},te=u.pr_activity||{},ge=u.cleanup_failed||{},yt=Object.entries(ge).map(([y,H])=>({bead_id:y,step:H&&H.step?H.step:"",reason:H&&H.reason?H.reason:"",detail:H&&typeof H.detail=="string"?H.detail:null,output_tail:H&&typeof H.output_tail=="string"&&H.output_tail?H.output_tail:void 0,log_path:H&&typeof H.log_path=="string"&&H.log_path?H.log_path:void 0})),Ve=u.ship_failure||null,Je=Ve&&typeof Ve.reason=="string"&&Ve.reason?{bead_id:typeof Ve.bead_id=="string"?Ve.bead_id:"",reason:Ve.reason,detail:typeof Ve.detail=="string"?Ve.detail:null,pr_url:typeof Ve.pr_url=="string"?Ve.pr_url:null}:null,re=u.queue||[],Le=new Set([...re.map(y=>y.bead_id),...W.map(y=>y.bead_id),...u.done.map(y=>y.bead_id)]),Ut=new Set(R.map(y=>y.id)),tr=i?i.get()?.order||{}:{},rr=new Set,pt=[];for(let y of[...b,...R])Le.has(y.id)||rr.has(y.id)||bc(y)||(rr.add(y.id),pt.push(y));k=mc(pt,v,tr);let Ar=u.admission||{},nr=y=>{let H=Ar[y];if(!H)return"";if(H.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let ne=typeof H.reason=="string"?H.reason:"",ve=ne.indexOf(":");return ve>0&&ve<ne.length-1?`\u26D4 ${ne.slice(0,ve)} (${ne.slice(ve+1)})`:`\u26D4 ${ne}`},Er=k.map(y=>{let H=ts(y),ne=Ut.has(y.id),ve=[];ne&&ve.push(wc(y)),H||ve.push("spec \uC5C6\uC74C");let Rr=nr(y.id);return Rr&&ve.push(Rr),{id:y.id,title:y.title||y.id,reason:ve.join(" \xB7 "),draggable:H,lane:"candidate",created_at:y.created_at,updated_at:y.updated_at,workflow:y.workflow,status:y.status,blocked:ne,has_spec:H}}),zt=ac(Er,$),nn=zt.visible,Y=u.revise_parked||{},p=(y,H)=>y.map(ne=>{let ve=H==="queue"?Y[ne.bead_id]:null;return{id:ne.bead_id,title:ae.get(ne.bead_id)||ne.bead_id,reason:H==="done"?"":nr(ne.bead_id),draggable:H!=="done",done:H==="done",lane:H,badges:ve?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!ve,revise_action:!!ve,revise_enabled:!!ve&&!D.has(ne.bead_id),revise_title:ve?ve.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${ve.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":"",usage:H==="done"?er(u.attempts||{},ne.bead_id):null,...m(ne.bead_id)}}),I=new Map;for(let y of u.done)y&&typeof y.bead_id=="string"&&typeof y.added_at=="number"&&I.set(y.bead_id,y.added_at);let z=u.attempts?Object.values(u.attempts):[],me=new Set;for(let y of z)y&&typeof y.resumed_from=="string"&&y.resumed_from.length>0&&me.add(y.resumed_from);let Oe=new Map;for(let y of z)Oe.set(y.bead_id,y.attempt_id);let Se=new Map;for(let y of z)Se.set(y.attempt_id,y);function Ke(y){let H=new Set,ne=y;for(;ne&&!H.has(ne.attempt_id);){if(ne.conflict_resolution===!0)return!0;H.add(ne.attempt_id),ne=typeof ne.resumed_from=="string"&&ne.resumed_from.length>0&&Se.get(ne.resumed_from)||null}return!1}let et=[],He=null;for(let y of z){let H=y.status==="paused"&&!me.has(y.attempt_id);if(y.status==="running"||H)et.push({bead_id:y.bead_id,attempt_id:y.attempt_id,title:ae.get(y.bead_id)||y.bead_id,runner:y.runner||null,model:y.model||null,effort:y.effort||null,started_at:typeof y.started_at=="number"?y.started_at:null,resumed_from:y.resumed_from||null,paused:H,conflict_resolution:Ke(y),can_pause:typeof y.session_id=="string"&&y.session_id.length>0,usage:er(u.attempts||{},y.bead_id),...m(y.bead_id)});else if(y.status==="failed"||y.status==="orphaned"){let ne=Oe.get(y.bead_id)!==y.attempt_id,ve=I.get(y.bead_id),Rr=typeof ve=="number"&&ve>0&&typeof y.finished_at=="number"&&ve>=y.finished_at;!ne&&!Rr&&typeof y.dismissed_at!="number"&&(He=y)}}let Ht=null;if(He){let y=typeof He.session_id=="string"&&He.session_id.length>0,H=me.has(He.attempt_id),ne=He.cause_detail;Ht={repo:He.repo||"",reason:He.cause||He.status,cause_detail:ne&&typeof ne.reason=="string"?{reason:ne.reason,command:typeof ne.command=="string"?ne.command:null}:null,resume_attempt_id:He.attempt_id,resume_eligible:y&&!H,resume_reason:y?H?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}}let Me=new Set(et.map(y=>y.bead_id)),Wt=Array.isArray(u.merge_queue)?u.merge_queue:[],sr=new Map;Wt.forEach((y,H)=>{y&&typeof y.bead_id=="string"&&sr.set(y.bead_id,H+1)});let is=u.merge_queue_state||{active:null,failures:{}},ki=is.failures||{},yi=u.auto_merge_skips||{},as=y=>{let H=yi[y];if(!H)return null;let ne=G[y],ve=ne&&ne.pr?ne.pr.head_sha:null;return ve&&ve===H.head_sha?H.reason||"":null},Cr=new Map;for(let y of et)y.conflict_resolution&&(y.paused?Cr.has(y.bead_id)||Cr.set(y.bead_id,"paused"):Cr.set(y.bead_id,"running"));let ls=et.filter(y=>!y.paused).length,cs=(u.workspace_info||{}).slots,ds=typeof cs=="number"?cs:typeof u.slots=="number"?u.slots:tn,vi=ls>ds,us=Ir(S),$i=(Array.isArray(u.done)?u.done.slice():[]).filter(y=>us===void 0||typeof y.added_at!="number"||y.added_at>=us).sort((y,H)=>(H.added_at||0)-(y.added_at||0)),ps=p($i,"done"),fs=0,hs=0,sn=!1;for(let y of ps){let H=y.usage;H&&typeof H=="object"&&(Number.isFinite(H.input_tokens)&&(fs+=H.input_tokens,sn=!0),Number.isFinite(H.output_tokens)&&(hs+=H.output_tokens,sn=!0))}let xi=sn?mt({input_tokens:fs,output_tokens:hs}):null;return{queue:u,idToTitle:ae,candidates:nn,candidate_hidden:{blocked:zt.hidden_blocked,spec:zt.hidden_spec},running:et,live_count:ls,slots:ds,over_cap:vi,failure:Ht,waiting:p(re.filter(y=>!Me.has(y.bead_id)),"queue"),pr_wait:W.map(y=>xc(y.bead_id,ae.get(y.bead_id)||y.bead_id,G,ge[y.bead_id]||null,er(u.attempts||{},y.bead_id),te[y.bead_id]||(U.has(y.bead_id)?{activity:null,merge_progress:{step:"merging"}}:null),Cr.get(y.bead_id)||null,y.external===!0,{position:sr.get(y.bead_id)||0,active:is.active===y.bead_id,failure:ki[y.bead_id]||null},y.wt_present!==!1,u.auto_merge===!0?as(y.bead_id):null)).map(y=>({...y,...m(y.id)})),merge_queue_length:Wt.length,merge_queue_running:Wt.length>0,auto_excluded:W.map(y=>y.bead_id).filter(y=>as(y)!==null),verify_cmd_present:!!(u.workspace_info||{}).verify_cmd,done:ps,token_total:xi,cleanup_failures:yt,ship_failure:Je}}function Qe(u){let b=u.waiting.length>0?u.waiting[0].id:"\u2014",R=d`<button
      type="button"
      class="worker-play${u.queue.auto_advance?" is-active":""}"
    >
      ${u.queue.auto_advance?"\u23F8 \uC77C\uC2DC\uC815\uC9C0":"\u25B6 \uC790\uB3D9 \uC9C4\uD589"}
    </button>`,X=u.over_cap?d`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",ae=d`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${u.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${u.pr_wait.length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${N()} 완료 <b>${u.done.length}</b></span
      >`,Ee=d`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${tn}
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
      </button>`,f=si({failure:u.failure,cleanupFailures:u.cleanup_failures,shipFailure:u.ship_failure});return q?d`<div class="worker-ribbon">
          ${R}
          <div class="worker-kpi worker-kpi--ribbon">${X}${ae}</div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${Ee}</div>
        </div>
        ${f}`:d`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${R}${Ee}</div>
        <div class="worker-kpi">
          ${X}${ae}
          ${u.token_total?d`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${`${N()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}
                >${N()} 완료 · 누적 ${u.token_total}</span
              >`:""}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${b}</b></span
          >
        </div>
      </div>
      ${f}`}function Re(u){if(u.running.length===0&&u.pr_wait.length===0)return"";let b=u.running.some(R=>!R.paused);return d`<section
      class="worker-now${b?" worker-pane--live":""}"
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
        ${ct(u)}
      </header>
      ${u.running.length>0?Qn(u.running,Date.now(),V):""}
      ${u.pr_wait.map(R=>Zn(R))}
    </section>`}function qe(u){let b=u.candidate_hidden;return d`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${$.show_blocked}
        />
        🔒 blocked${b.blocked>0?` ${b.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${lc.map(R=>d`<button
              type="button"
              class="worker-filter__chip${$.spec===R.value?" is-active":""}"
              data-spec=${R.value}
              aria-pressed=${$.spec===R.value?"true":"false"}
            >
              ${R.label}
            </button>`)}
        ${b.spec>0?d`<span class="worker-filter__hidden">숨김 ${b.spec}</span>`:""}
      </div>
    </div>`}function it(){return d`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${v}
    >
      ${cc.map(u=>d`<option value=${u.value} ?selected=${v===u.value}>
            ${u.label}
          </option>`)}
    </select>`}function Be(){return d`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${S}
      >
        ${ur.map(u=>d`<option value=${u.value} ?selected=${S===u.value}>
              ${u.label}
            </option>`)}
      </select>
    </div>`}function ct(u){let b=u.queue.auto_merge===!0;if(u.merge_queue_running)return d`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop${b?" is-active":""}"
        title=${b?"\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB044\uACE0 \uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)":"\uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)"}
      >
        ${b?"\u23F8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8":"\uC77C\uAD04 \uBA38\uC9C0 \uC911\uB2E8"} ${u.merge_queue_length}
      </button>`;if(b)return d`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop is-active"
        title="자동 머지 켜짐 — 자격이 생기는 PR을 계속 큐에 넣습니다. 클릭하면 끕니다"
      >
        ⏸ 자동 머지
      </button>`;let R=new Set(u.auto_excluded),X=u.pr_wait.filter(ae=>ae.merge_action&&ae.merge_enabled&&!R.has(ae.id)).length;return d`<button
      type="button"
      class="worker-merge-all"
      title=${u.verify_cmd_present?"\uCF1C \uB450\uBA74 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uCDA9\uB3CC \uD574\uC18C\xB7\uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uCF1C \uB450\uBA74 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uCDA9\uB3CC \uD574\uC18C\xB7\uBA38\uC9C0\uD569\uB2C8\uB2E4 \u2014 \uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uB294 \uAC80\uC99D \uC2E0\uD638\uAC00 \uC5C6\uC5B4 CI\xB7\uB85C\uCEEC\uAC80\uC99D \uC5C6\uC774 \uBA38\uC9C0\uB429\uB2C8\uB2E4"}
    >
      ▶ 자동 머지${X>0?` ${X}`:""}
    </button>`}function ht(u){let b=Et({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:u.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:it(),controls:qe(u)});return q?d`<div class="worker-lanes worker-lanes--mobile">
        ${Re(u)}
        ${Et({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:u.waiting,empty:"\uB4DC\uB798\uADF8 \uB610\uB294 [\uB300\uAE30\uB85C \u21B4]\uB85C \uBC30\uCE58",collapsible:!0,collapsed:P.queue,preview:oi(u.waiting)})}
        ${b}
        ${Et({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:u.done,empty:`${N()} \uC644\uB8CC \uC5C6\uC74C`,controls:Be(),collapsible:!0,collapsed:P.done,preview:u.token_total||oi(u.done)})}
      </div>`:d`<div class="worker-lanes">
      ${b}
      ${Et({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:u.waiting,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58"})}
      ${Et({id:"worker-pane-running",lane:"running",title:`\uC2E4\uD589 \uC911 \xB7 \uC2AC\uB86F ${u.slots}`,items:u.running,live:u.running.some(R=>!R.paused),body:Qn(u.running,Date.now(),V)})}
      ${Et({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:u.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C",header_control:ct(u)})}
      ${Et({id:"worker-pane-done",lane:"done",title:`\uC644\uB8CC \xB7 ${N()} ${u.done.length}`,items:u.done,empty:`${N()} \uC644\uB8CC \uC5C6\uC74C`,controls:Be()})}
    </div>`}function xe(u){P={...P,[u]:!P[u]},gc(P),ce()}function ce(){let u=Fe();_e(Qe(u),x),_e(ht(u),j)}function Ue(){let u=document.querySelector(".app-header");if(!u)return;let b=()=>{let R=Math.round(u.getBoundingClientRect().height);A.style.setProperty("--worker-ribbon-top",`${R}px`)};if(b(),typeof ResizeObserver=="function"){let R=new ResizeObserver(b);R.observe(u),E.push(()=>R.disconnect())}else window.addEventListener("resize",b),E.push(()=>window.removeEventListener("resize",b))}function ze(){if(typeof window.matchMedia!="function")return;let u=window.matchMedia(hc);q=!!u.matches;let b=R=>{let X=!!(R&&typeof R.matches=="boolean"?R.matches:u.matches);X!==q&&(q=X,ce())};typeof u.addEventListener=="function"?(u.addEventListener("change",b),E.push(()=>u.removeEventListener("change",b))):typeof u.addListener=="function"&&(u.addListener(b),E.push(()=>u.removeListener(b)))}function C(u){let b=u.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!b)return;let R=b.dataset.beadId||"",X=b.dataset.lane||"";h={bead_id:R,from_lane:X};try{u.dataTransfer?.setData("text/plain",R),u.dataTransfer&&(u.dataTransfer.effectAllowed="move")}catch{}}function O(u){let b=u.target?.closest?.(".worker-pane");if(!b)return;let R=b.dataset.lane||"";R!=="candidate"&&R!=="queue"||(u.preventDefault(),u.dataTransfer&&(u.dataTransfer.dropEffect="move"),b.classList.add("worker-pane--drag-over"))}function ee(u){u.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function Q(u,b){let R=k.find(f=>f.id===u);if(!R)return;let X=k.filter(f=>f.id!==u),ae=X.length;if(b){let f=b.dataset.beadId;if(f===u)return;let m=X.findIndex(W=>W.id===f);m>=0&&(ae=m)}let Ee=X.slice();Ee.splice(ae,0,R),_.applyReorder(u,Ee,ae)}function K(u){let b=u.target?.closest?.(".worker-pane");if(!b)return;u.preventDefault(),b.classList.remove("worker-pane--drag-over");let R=b.dataset.lane||"",X=h?.bead_id||u.dataTransfer?.getData("text/plain")||"",ae=h?.from_lane||"";if(h=null,!X)return;let Ee=u.target?.closest?.(".worker-mini, .worker-card"),f=Array.from(b.querySelectorAll(".worker-mini, .worker-card")),m=f.length;if(Ee){let W=f.indexOf(Ee);W>=0&&(m=W)}if(b.classList.contains("worker-pane--collapsed")&&(m=Te()),R==="candidate"){if(ae==="candidate"){Q(X,Ee);return}ae==="queue"&&we(X);return}R==="queue"&&(ae==="queue"?dt(X,m):ot(X,m))}function se(u){$=u,ic(u),ce()}function de(u){v=u==="board"||u==="created"||u==="spec"?u:rn,uc(v),ce()}function he(u){S=Yt(u)?u:St,fc(S),ce()}function F(u){let b=u.target?.closest?.(".worker-filter__blocked");if(b){se({...$,show_blocked:b.checked});return}let R=u.target?.closest?.(".worker-done-range");if(R){he(R.value);return}let X=u.target?.closest?.(".worker-sort");if(X){de(X.value||rn);return}let ae=u.target?.closest?.(".worker-slots__input");if(!ae)return;let Ee=Number.parseInt(ae.value,10);if(!Number.isFinite(Ee)){ce();return}Xe(Ee).then(ce)}function w(u){return u?{runner:u.runner||void 0,model:u.model||void 0,effort:u.effort||void 0,worktree:u.worktree||void 0,status:u.status||void 0,session_id:u.session_id||void 0}:{}}function L(u){let b=ye(),R=b.attempts?b.attempts[u]:null;V=u,g.hidden=!1,$e.open({attempt_id:u,meta:w(R)}),ce()}function T(){if(!V)return;let u=ye(),b=u.attempts?u.attempts[V]:null;if(b){$e.updateMeta(w(b));return}$e.close()}function Z(u){let b=u.target;if(b?.closest?.("#worker-exec-defaults-dialog"))return;if(b?.closest?.(".worker-exec-defaults-btn")){Ne.open();return}let R=b?.closest?.(".worker-banner__resume");if(R){let re=R.dataset.attemptId;re&&lt(re);return}let X=b?.closest?.(".worker-banner__dismiss");if(X){let re=X.dataset.attemptId;re&&pe(re);return}if(b?.closest?.(".worker-play")){Ye(!ye().auto_advance);return}let ae=b?.closest?.(".worker-merge-all");if(ae){ae.classList.contains("worker-merge-all--stop")?ye().auto_merge===!0?Pe(!1):Ae():Pe(!0);return}let Ee=b?.closest?.(".worker-pane__hd--toggle");if(Ee){let re=Ee.dataset.lane;(re==="queue"||re==="done")&&xe(re);return}let f=b?.closest?.(".worker-card__place");if(f){let re=f.dataset.beadId;re&&!f.disabled&&ot(re,Te());return}let m=b?.closest?.(".worker-filter__chip");if(m){let re=m.dataset.spec;(re==="all"||re==="with"||re==="without")&&se({...$,spec:re});return}let W=b?.closest?.(".worker-mini__merge");if(W){ut(W.dataset.beadId||"");return}let G=b?.closest?.(".worker-mini__merge-cancel");if(G){Ge(G.dataset.beadId||"");return}let te=b?.closest?.(".worker-mini__discard");if(te){je(te.dataset.beadId||"");return}let ge=b?.closest?.(".worker-mini__revise-fix");if(ge){Ze("worker-revise-fix",ge.dataset.beadId||"");return}let yt=b?.closest?.(".worker-mini__revise-approve");if(yt){Ze("worker-revise-approve",yt.dataset.beadId||"");return}if(b?.closest?.(".worker-mini__pr"))return;if(b?.closest?.(".rtile__stop")){let Le=b?.closest?.(".rtile")?.dataset?.attemptId;Le&&We(Le);return}if(b?.closest?.(".rtile__pause")){let Le=b?.closest?.(".rtile")?.dataset?.attemptId;Le&&ke(Le);return}if(b?.closest?.(".rtile__resume")){let Le=b?.closest?.(".rtile")?.dataset?.attemptId;Le&&lt(Le);return}if(b?.closest?.(".rtile__session")){let Le=b?.closest?.(".rtile")?.dataset?.attemptId;Le&&L(Le);return}if(b?.closest?.(".worker-drawer-overlay__backdrop")){$e.close();return}if(b?.closest?.(".worker-drawer-host"))return;let Ve=b?.closest?.(".rtile");if(Ve){if(b?.closest?.(".rtile__id")){let Le=Ve.dataset.beadId;Le&&Ft(Le).then(Ut=>{Ut?J("\uBCF5\uC0AC\uB428","success",1200):J("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let re=Ve.dataset.beadId;re&&l&&l(re);return}let Je=b?.closest?.(".worker-mini, .worker-card");if(Je){let re=Je.dataset.beadId;if(b?.closest?.(".worker-mini__id, .worker-card__id")){re&&Ft(re).then(Le=>{Le?J("\uBCF5\uC0AC\uB428","success",1200):J("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}re&&l&&l(re)}}return t.addEventListener("dragstart",C),t.addEventListener("dragover",O),t.addEventListener("dragleave",ee),t.addEventListener("drop",K),t.addEventListener("click",Z),t.addEventListener("change",F),ze(),Ue(),c&&E.push(c.subscribe(ce)),s&&E.push(s.subscribe(()=>{ce(),T()})),ce(),{load(){ce()},destroy(){for(let u of E.splice(0))try{u()}catch{}t.removeEventListener("dragstart",C),t.removeEventListener("dragover",O),t.removeEventListener("dragleave",ee),t.removeEventListener("drop",K),t.removeEventListener("click",Z),t.removeEventListener("change",F);try{$e.destroy()}catch{}g.hidden=!0;try{Ne.destroy()}catch{}_e(d``,t)}}}function ns(t){if(!t)return"Unknown";let e=t.split("/").filter(Boolean);return e.length>0?e[e.length-1]:"Unknown"}function ui(t,e,r,n=async()=>{},s=async()=>{}){let o=Ce("views:workspace-picker"),i=null,l=!1,a=!1,c=!1;async function _(A){let g=A.target.value,B=e.getState().workspace?.current?.path||"";if(g&&g!==B){o("switching workspace to %s",g),l=!0,E();try{await r(g)}catch(j){o("workspace switch failed: %o",j)}finally{l=!1,E()}}}async function h(){let A=e.getState(),x=A.workspace?.current?.path||A.workspace?.available?.[0]?.path||"";if(!(!x||a)){o("git-pulling workspace %s",x),a=!0,E();try{await n(x)}catch(g){o("workspace git pull failed: %o",g)}finally{a=!1,E()}}}function k(A){let x=A.target;x&&t.contains(x)||S()}function $(A){A.key==="Escape"&&S()}function v(){c||(c=!0,document.addEventListener("mousedown",k),document.addEventListener("keydown",$),E())}function S(){c&&(c=!1,document.removeEventListener("mousedown",k),document.removeEventListener("keydown",$),E())}function N(){c?S():v()}async function P(A){let x=A.target,g=x.value,M=x.checked;o("toggling visibility %s \u2192 %s",g,String(M));try{await s(g,M)}catch(B){o("workspace visibility toggle failed: %o",B)}}function q(A){return A?d`
      <button
        type="button"
        class="workspace-picker__git-pull-button"
        @click=${h}
        ?disabled=${l||a}
        aria-label="Git Pull"
        title="Git Pull"
      >
        <span aria-hidden="true">⬇</span>
      </button>
    `:d``}function U(A,x){return d`
      <div class="workspace-picker__manage">
        <button
          type="button"
          class="workspace-picker__manage-button"
          @click=${N}
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
                ${A.map(g=>d`
                    <label
                      class="workspace-picker__manage-row"
                      title="${g.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${g.path}"
                        .checked=${!x.has(g.path)}
                        @change=${P}
                      />
                      <span class="workspace-picker__manage-name"
                        >${ns(g.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function D(){let A=e.getState(),x=A.workspace?.current,g=A.workspace?.available||[],M=new Set(A.workspace?.hidden||[]),B=x?.path||g[0]?.path||"";if(g.length===0)return d``;let j=g.filter(V=>!M.has(V.path)||V.path===B);if(j.length<=1){let V=j[0]||g[0],$e=ns(V.path);return d`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${V.path}"
            >${$e}</span
          >
          ${U(g,M)}
          ${q(B)}
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
          ${j.map(V=>d`
              <option
                value="${V.path}"
                ?selected=${V.path===B}
                title="${V.path}"
              >
                ${ns(V.path)}
              </option>
            `)}
        </select>
        ${U(g,M)}
        ${q(B)}
        ${l||a?d`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function E(){_e(D(),t)}return E(),i=e.subscribe(()=>E()),{destroy(){i&&(i(),i=null),document.removeEventListener("mousedown",k),document.removeEventListener("keydown",$),_e(d``,t)}}}var pi=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-queue-set-slots","worker-queue-set-exec-default","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append"];function ss(){let t=Date.now().toString(36),e=Math.random().toString(36).slice(2,8);return`${t}-${e}`}function fi(t,e,r=ss()){return{id:r,type:t,payload:e}}function hi(t={}){let e=Ce("ws"),r={initialMs:t.backoff?.initialMs??1e3,maxMs:t.backoff?.maxMs??3e4,factor:t.backoff?.factor??2,jitterRatio:t.backoff?.jitterRatio??.2},n=()=>t.url&&t.url.length>0?t.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",i=0,l=null,a=!0,c=new Map,_=[],h=new Map,k=new Set;function $(D){for(let E of Array.from(k))try{E(D)}catch{}}function v(){if(!a||l)return;o="reconnecting",e("ws reconnecting\u2026"),$(o);let D=Math.min(r.maxMs||0,(r.initialMs||0)*Math.pow(r.factor||1,i)),E=(r.jitterRatio||0)*D,A=Math.max(0,Math.round(D+(Math.random()*2-1)*E));e("ws retry in %d ms (attempt %d)",A,i+1),l=setTimeout(()=>{l=null,U()},A)}function S(D){try{s?.send(JSON.stringify(D))}catch(E){e("ws send failed",E)}}function N(){for(o="open",e("ws open"),$(o),i=0;_.length;){let D=_.shift();D&&S(D)}}function P(D){let E;try{E=JSON.parse(String(D.data))}catch{e("ws received non-JSON message");return}if(!E||typeof E.id!="string"||typeof E.type!="string"){e("ws received invalid envelope");return}if(c.has(E.id)){let x=c.get(E.id);c.delete(E.id),E.ok?x?.resolve(E.payload):x?.reject(E.error||new Error("ws error"));return}let A=h.get(E.type);if(A&&A.size>0)for(let x of Array.from(A))try{x(E.payload)}catch(g){e("ws event handler error",g)}else e("ws received unhandled message type: %s",E.type)}function q(){o="closed",e("ws closed"),$(o);for(let[D,E]of c.entries())E.reject(new Error("ws disconnected")),c.delete(D);i+=1,v()}function U(){if(!a)return;let D=n();try{s=new WebSocket(D),e("ws connecting %s",D),o="connecting",$(o),s.addEventListener("open",N),s.addEventListener("message",P),s.addEventListener("error",()=>{}),s.addEventListener("close",q)}catch(E){e("ws connect failed %o",E),v()}}return U(),{send(D,E){if(!pi.includes(D))return Promise.reject(new Error(`unknown message type: ${D}`));let A=ss(),x=fi(D,E,A);return e("send %s id=%s",D,A),new Promise((g,M)=>{c.set(A,{resolve:g,reject:M,type:D}),s&&s.readyState===s.OPEN?S(x):(e("queue %s id=%s (state=%s)",D,A,o),_.push(x))})},on(D,E){h.has(D)||h.set(D,new Set);let A=h.get(D);return A?.add(E),()=>{A?.delete(E)}},onConnection(D){return k.add(D),()=>{k.delete(D)}},reconnect(){a=!0,l&&(clearTimeout(l),l=null),i=0,U()},close(){a=!1,l&&(clearTimeout(l),l=null);try{s?.close()}catch{}},getState(){return o}}}function Sc(){let t=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof t?.workspace_config?.default_workspace=="string"&&t.workspace_config.default_workspace.length>0?t.workspace_config.default_workspace:null}}}async function Tc(t,e){try{let n=await(await fetch("/api/config")).json();t.setState({config:n})}catch(r){e("config refresh failed",r)}}var os=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],_i=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"]],gi="worker:queue",mi="ui:order",bi="ui:display-policy",Ct="tab:board:closed",wi="beads-ui.board.closed-range";function Ac(t){let e=Ce("main");e("bootstrap start");let r=d`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;_e(r,t);let n=document.getElementById("top-nav"),s=document.getElementById("board-root"),o=document.getElementById("worker-root"),i=document.getElementById("detail-panel");if(s&&o&&i){let g=function(f,m){let W="Request failed",G="";if(f&&typeof f=="object"){let ge=f;if(typeof ge.message=="string"&&ge.message.length>0&&(W=ge.message),typeof ge.details=="string")G=ge.details;else if(ge.details&&typeof ge.details=="object")try{G=JSON.stringify(ge.details,null,2)}catch{G=""}}else typeof f=="string"&&f.length>0&&(W=f);let te=m&&m.length>0?`Failed to load ${m}`:"Request failed";x.open(te,W,G)},pe=function(f){return`${F.getState().workspace.current?.path||""}\0${f}`},De=function(){ie&&(ie().catch(()=>{}),ie=null),Te=null,ot=null},Pe=function(f){dt=f;let m=()=>{dt!==f||F.getState().selected_id!==f||(dt=null,ut(f))};if(!ke){We.then(m);return}m()},Ze=function(){let f=Ir(je);return f===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:f}}},Ye=function(f){if(f)for(let[m,W]of os){if(Ge.has(m)||Ae.has(m))continue;let G=m===Ct?Ze():{type:W};try{V.register(m,G)}catch(te){e("register %s store failed: %o",m,te)}Ae.add(m),j.subscribeList(m,G).then(te=>{Ge.set(m,te)}).catch(te=>{e("subscribe %s failed: %o",m,te),g(te,"board")}).finally(()=>{Ae.delete(m)})}else Fe()},Fe=function(){for(let[f]of os){let m=Ge.get(f);m&&(m().catch(()=>{}),Ge.delete(f));try{V.unregister(f)}catch(W){e("unregister %s failed: %o",f,W)}}},qe=function(f){if(!f){it();return}for(let[m,W]of _i)if(!(Qe.has(m)||Ae.has(m))){try{V.register(m,{type:W})}catch(G){e("register %s store failed: %o",m,G)}Ae.add(m),j.subscribeList(m,{type:W}).then(G=>{Qe.set(m,G)}).catch(G=>{e("subscribe %s failed: %o",m,G),g(G,"worker")}).finally(()=>{Ae.delete(m)})}Re||(B("subscribe-worker-queue",{id:gi}).catch(m=>{e("subscribe-worker-queue failed: %o",m)}),Re=()=>B("unsubscribe-worker-queue",{id:gi}))},it=function(){for(let[f]of _i){let m=Qe.get(f);m&&(m().catch(()=>{}),Qe.delete(f));try{V.unregister(f)}catch(W){e("unregister %s failed: %o",f,W)}}Re&&(Re().catch(()=>{}),Re=null)},ct=function(){Be||(B("subscribe-ui-order",{id:mi}).catch(f=>{e("subscribe-ui-order failed: %o",f)}),Be=()=>B("unsubscribe-ui-order",{id:mi}))},ht=function(){Be&&(Be().catch(()=>{}),Be=null),Ne.clear()},ce=function(){xe||(B("subscribe-display-policy",{id:bi}).catch(f=>{e("subscribe-display-policy failed: %o",f)}),xe=()=>B("unsubscribe-display-policy",{id:bi}))},Ue=function(){xe&&(xe().catch(()=>{}),xe=null),ye.clear()},K=function(f){if(!f)return"Unknown";let m=f.split("/").filter(Boolean);return m.length>0?m[m.length-1]:"Unknown"};var l=g,a=pe,c=De,_=Pe,h=Ze,k=Ye,$=Fe,v=qe,S=it,N=ct,P=ht,q=ce,U=Ue,D=K;let E=document.getElementById("header-loading"),A=Ys(E),x=Vo(t),M=hi(),B=A.wrapSend((f,m)=>M.send(f,m)),j=Bs(B),V=Us(),$e=Hs(),Ne=zs(),ye=Ss(),le=Ts();M.on("ui-order-snapshot",f=>{let m=f;if(m&&typeof m.revision=="number")try{Ne.set({revision:m.revision,order:m.order&&typeof m.order=="object"?m.order:{}})}catch{}}),M.on("display-policy-snapshot",f=>{let m=f;if(m&&m.policy&&typeof m.policy=="object")try{ye.set(m.policy)}catch{}}),M.on("session-log-snapshot",f=>{let m=f;if(m&&typeof m.attempt_id=="string")try{le.set(m.attempt_id,Array.isArray(m.lines)?m.lines:[])}catch{}}),M.on("session-log-append",f=>{let m=f;if(m&&typeof m.attempt_id=="string")try{le.append(m.attempt_id,m.event)}catch{}}),M.on("snapshot",f=>{let m=f,W=m&&typeof m.id=="string"?m.id:"",G=W?V.getStore(W):null;if(G&&m&&m.type==="snapshot")try{G.applyPush(m)}catch{}}),M.on("upsert",f=>{let m=f,W=m&&typeof m.id=="string"?m.id:"",G=W?V.getStore(W):null;if(G&&m&&m.type==="upsert")try{G.applyPush(m)}catch{}}),M.on("delete",f=>{let m=f,W=m&&typeof m.id=="string"?m.id:"",G=W?V.getStore(W):null;if(G&&m&&m.type==="delete")try{G.applyPush(m)}catch{}});let ie=null,Te=null,ot=null,dt=null,we=()=>{},We=new Promise(f=>{we=()=>f(void 0)}),ke=!1,lt=!1;async function ut(f){let m=pe(f);if(m===Te||m===ot)return;ot=m;let W=`detail:${f}`,G={type:"issue-detail",params:{id:f}};try{V.register(W,G)}catch(te){e("register detail store failed: %o",te)}try{let te=await j.subscribeList(W,G);if(F.getState().selected_id!==f||pe(f)!==m){await te().catch(()=>{});return}ie&&await ie().catch(()=>{}),ie=te,Te=m}catch(te){e("detail subscribe failed: %o",te),g(te,"issue details")}finally{ot===m&&(ot=null)}}let Ge=new Map,Ae=new Set,je=St;try{let f=window.localStorage.getItem(wi);Yt(f)&&(je=f)}catch{}async function Xe(f){if(!Yt(f)||f===je)return;je=f;try{window.localStorage.setItem(wi,f)}catch{}let m=Ge.get(Ct);if(!m)return;Ge.delete(Ct),await m().catch(()=>{});let W=Ze();try{V.register(Ct,W)}catch(G){e("register %s store failed: %o",Ct,G)}try{let G=await j.subscribeList(Ct,W);Ge.set(Ct,G)}catch(G){e("re-subscribe %s failed: %o",Ct,G),g(G,"board")}}let Qe=new Map,Re=null,Be=null,xe=null;async function ze(){xe=null,ye.clear(),Re=null;let f=F.getState().workspace.current?.path;if(f)try{await M.send("set-workspace",{path:f})}catch(m){e("workspace restore after reconnect failed: %o",m);return}ce(),qe(F.getState().view==="worker")}async function C(){e("clearing all subscriptions for workspace switch"),Fe(),it(),$e.clear(),ht(),ct(),Ue(),ce(),De();let f=F.getState();if(f.selected_id)try{V.unregister(`detail:${f.selected_id}`)}catch{}let m=F.getState();Ye(m.view==="board"),qe(m.view==="worker"),m.selected_id&&Pe(m.selected_id)}async function O(f){e("requesting workspace switch to %s",f),lt=!0;try{let m=await M.send("set-workspace",{path:f});e("workspace switch result: %o",m),m&&m.workspace&&(F.setState({workspace:{current:{path:m.workspace.root_dir,database:m.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",f),m.changed&&(await C(),J("Switched to "+K(f),"success",2e3)))}catch(m){throw e("workspace switch failed: %o",m),J("Failed to switch workspace","error",3e3),m}finally{lt=!1}}async function ee(f){e("requesting workspace git pull for %s",f);try{let m=await M.send("git-pull-workspace",{});e("workspace git pull result: %o",m);let W=m?.status;if(W==="up_to_date"){J("Already up to date","success",2e3);return}if(W==="stash_pop_conflict"){J("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}J("Git pulled "+K(f),"success",2e3)}catch(m){e("workspace git pull failed: %o",m);let W=m?.code,G=m?.message;if(W==="rebase_conflict"){J("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(W==="rebase_conflict_abort_failed"){J("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(W==="busy"){J("Git pull skipped: another operation is running","warning",3e3);return}let te=G?`: ${G}`:"";throw J(`Git pull failed${te}`,"error",3e3),m}}async function Q(f,m){e("setting workspace visibility %s \u2192 %s",f,String(m));try{await M.send("set-workspace-visibility",{path:f,visible:m}),await se()}catch(W){e("workspace visibility update failed: %o",W),J("Failed to update project visibility","error",3e3)}}async function se(){try{let f=await M.send("list-workspaces",{});if(e("workspaces loaded: %o",f),f&&Array.isArray(f.workspaces)){let m=f.workspaces.map(ge=>({path:ge.path,database:ge.database,pid:ge.pid,version:ge.version})),W=f.current?{path:f.current.root_dir,database:f.current.db_path}:null,G=Array.isArray(f.hidden)?f.hidden.filter(ge=>typeof ge=="string"):[];F.setState({workspace:{current:W,available:m,hidden:G}});let te=window.localStorage.getItem("beads-ui.workspace");te&&(!m.some(yt=>yt.path===te)||G.includes(te)?window.localStorage.removeItem("beads-ui.workspace"):W&&te!==W.path&&(e("restoring saved workspace preference: %s",te),await O(te)))}}catch(f){e("failed to load workspaces: %o",f)}}M.on("workspace-changed",f=>{e("workspace-changed event: %o",f),f&&f.root_dir&&(F.setState({workspace:{current:{path:f.root_dir,database:f.db_path}}}),se(),C())});let de=!1;if(typeof M.onConnection=="function"){let f=m=>{e("ws state %s",m),m==="reconnecting"||m==="closed"?(de=!0,J("Connection lost. Reconnecting\u2026","error",4e3)):m==="open"&&de&&(de=!1,J("Reconnected","success",2200),Tc(F,(W,G)=>{e(`${W}: %o`,G)}),ze())};M.onConnection(f)}let he="board";try{let f=window.localStorage.getItem("beads-ui.view");(f==="board"||f==="worker")&&(he=f)}catch(f){e("view parse error: %o",f)}let F=js({config:Sc(),view:he});M.on("worker-queue-snapshot",f=>{let m=f;if(!m||!m.queue)return;let W=F.getState().workspace.current?.path;if(typeof W=="string"&&W.length>0&&m.root_dir!==W){e("dropping worker-queue snapshot for %s",String(m.root_dir));return}try{$e.set(m.queue)}catch{}});let w=Ws(F);w.start();let L=async(f,m)=>{try{return await B(f,m)}catch{return[]}};n&&Ko(n,F,w);let T=document.getElementById("workspace-picker");T&&ui(T,F,O,ee,Q);let Z=Jo(t,(f,m)=>B(f,m));try{let f=document.getElementById("new-issue-btn");f&&f.addEventListener("click",()=>Z.open())}catch{}let u=Yo(t,{policyStore:ye,transport:(f,m)=>B(f,m),labelOptions:()=>{let f=new Set;for(let[m]of os)for(let W of V.snapshotFor(m)||[]){let G=W.labels;if(Array.isArray(G))for(let te of G)typeof te=="string"&&te.length>0&&f.add(te)}return Array.from(f).sort()}});try{let f=document.getElementById("display-settings-btn");f&&f.addEventListener("click",()=>u.open())}catch{}let b=eo(s,{gotoIssue:f=>w.gotoIssue(f),issueStores:V,transport:L,uiOrderStore:Ne,displayPolicyStore:ye,closedRange:je,onClosedRangeChange:f=>{Xe(f)},onNewIssue:()=>Z.open()}),R=rs(o,{transport:L,issueStores:V,queueStore:$e,sessionLogStore:le,uiOrderStore:Ne,gotoIssue:f=>F.setState({selected_id:f}),getWorkspacePath:()=>F.getState().workspace.current?.path}),X=Go(i,{issueStores:V,transport:L,queueStore:$e,sessionLogStore:le,getWorkspacePath:()=>F.getState().workspace.current?.path,onNavigate:f=>{F.getState().view==="worker"?F.setState({selected_id:f}):w.gotoIssue(f)},onClose:()=>{let f=F.getState();F.setState({selected_id:null});try{w.gotoView(f.view==="worker"?"worker":"board")}catch{}}}),ae=F.getState().selected_id;ae&&(i.hidden=!1,X.load(ae),Pe(ae)),F.subscribe(f=>{let m=f.selected_id;m?(i.hidden=!1,X.load(m),lt||Pe(m)):(X.clear(),i.hidden=!0,De())});let Ee=f=>{s.hidden=f.view!=="board",o.hidden=f.view!=="worker",Ye(f.view==="board"),qe(f.view==="worker"),!f.selected_id&&f.view==="board"&&b.load(),f.view==="worker"&&R.load(),window.localStorage.setItem("beads-ui.view",f.view)};F.subscribe(Ee),Ee(F.getState()),ct(),ce(),se().finally(()=>{ke=!0,we()}),window.addEventListener("keydown",f=>{let m=f.ctrlKey||f.metaKey,W=String(f.key||"").toLowerCase(),G=f.target,te=G&&G.tagName?String(G.tagName).toLowerCase():"",ge=te==="input"||te==="textarea"||te==="select"||G&&typeof G.isContentEditable=="boolean"&&G.isContentEditable;m&&W==="n"&&(ge||(f.preventDefault(),Z.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let r=window.localStorage.getItem("beads-ui.theme"),n=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=r==="dark"||r==="light"?r:n?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let t=document.getElementById("theme-switch");t&&t.addEventListener("change",()=>{let r=t.checked?"dark":"light";document.documentElement.setAttribute("data-theme",r),window.localStorage.setItem("beads-ui.theme",r)});let e=document.getElementById("app");e&&Ac(e)});export{Ac as bootstrap,Sc as readBootstrapConfig,Tc as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
