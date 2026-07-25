var Oo=Object.create;var Cr=Object.defineProperty;var Mo=Object.getOwnPropertyDescriptor;var No=Object.getOwnPropertyNames;var Po=Object.getPrototypeOf,Fo=Object.prototype.hasOwnProperty;var Bo=(t,e,r)=>e in t?Cr(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r;var Rr=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports);var qo=(t,e,r,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of No(e))!Fo.call(t,s)&&s!==r&&Cr(t,s,{get:()=>e[s],enumerable:!(n=Mo(e,s))||n.enumerable});return t};var zo=(t,e,r)=>(r=t!=null?Oo(Po(t)):{},qo(e||!t||!t.__esModule?Cr(r,"default",{value:t,enumerable:!0}):r,t));var pe=(t,e,r)=>Bo(t,typeof e!="symbol"?e+"":e,r);var Kn=Rr((_l,Zn)=>{var At=1e3,Tt=At*60,Et=Tt*60,gt=Et*24,jo=gt*7,Yo=gt*365.25;Zn.exports=function(t,e){e=e||{};var r=typeof t;if(r==="string"&&t.length>0)return Vo(t);if(r==="number"&&isFinite(t))return e.long?Ko(t):Zo(t);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(t))};function Vo(t){if(t=String(t),!(t.length>100)){var e=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(t);if(e){var r=parseFloat(e[1]),n=(e[2]||"ms").toLowerCase();switch(n){case"years":case"year":case"yrs":case"yr":case"y":return r*Yo;case"weeks":case"week":case"w":return r*jo;case"days":case"day":case"d":return r*gt;case"hours":case"hour":case"hrs":case"hr":case"h":return r*Et;case"minutes":case"minute":case"mins":case"min":case"m":return r*Tt;case"seconds":case"second":case"secs":case"sec":case"s":return r*At;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r;default:return}}}}function Zo(t){var e=Math.abs(t);return e>=gt?Math.round(t/gt)+"d":e>=Et?Math.round(t/Et)+"h":e>=Tt?Math.round(t/Tt)+"m":e>=At?Math.round(t/At)+"s":t+"ms"}function Ko(t){var e=Math.abs(t);return e>=gt?or(t,e,gt,"day"):e>=Et?or(t,e,Et,"hour"):e>=Tt?or(t,e,Tt,"minute"):e>=At?or(t,e,At,"second"):t+" ms"}function or(t,e,r,n){var s=e>=r*1.5;return Math.round(t/r)+" "+n+(s?"s":"")}});var Qn=Rr((bl,Xn)=>{function Xo(t){r.debug=r,r.default=r,r.coerce=a,r.disable=i,r.enable=s,r.enabled=l,r.humanize=Kn(),r.destroy=c,Object.keys(t).forEach(u=>{r[u]=t[u]}),r.names=[],r.skips=[],r.formatters={};function e(u){let h=0;for(let b=0;b<u.length;b++)h=(h<<5)-h+u.charCodeAt(b),h|=0;return r.colors[Math.abs(h)%r.colors.length]}r.selectColor=e;function r(u){let h,b=null,S,w;function C(...M){if(!C.enabled)return;let P=C,q=Number(new Date),O=q-(h||q);P.diff=O,P.prev=h,P.curr=q,h=q,M[0]=r.coerce(M[0]),typeof M[0]!="string"&&M.unshift("%O");let L=0;M[0]=M[0].replace(/%([a-zA-Z%])/g,(y,v)=>{if(y==="%%")return"%";L++;let x=r.formatters[v];if(typeof x=="function"){let B=M[L];y=x.call(P,B),M.splice(L,1),L--}return y}),r.formatArgs.call(P,M),(P.log||r.log).apply(P,M)}return C.namespace=u,C.useColors=r.useColors(),C.color=r.selectColor(u),C.extend=n,C.destroy=r.destroy,Object.defineProperty(C,"enabled",{enumerable:!0,configurable:!1,get:()=>b!==null?b:(S!==r.namespaces&&(S=r.namespaces,w=r.enabled(u)),w),set:M=>{b=M}}),typeof r.init=="function"&&r.init(C),C}function n(u,h){let b=r(this.namespace+(typeof h>"u"?":":h)+u);return b.log=this.log,b}function s(u){r.save(u),r.namespaces=u,r.names=[],r.skips=[];let h=(typeof u=="string"?u:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let b of h)b[0]==="-"?r.skips.push(b.slice(1)):r.names.push(b)}function o(u,h){let b=0,S=0,w=-1,C=0;for(;b<u.length;)if(S<h.length&&(h[S]===u[b]||h[S]==="*"))h[S]==="*"?(w=S,C=b,S++):(b++,S++);else if(w!==-1)S=w+1,C++,b=C;else return!1;for(;S<h.length&&h[S]==="*";)S++;return S===h.length}function i(){let u=[...r.names,...r.skips.map(h=>"-"+h)].join(",");return r.enable(""),u}function l(u){for(let h of r.skips)if(o(u,h))return!1;for(let h of r.names)if(o(u,h))return!0;return!1}function a(u){return u instanceof Error?u.stack||u.message:u}function c(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return r.enable(r.load()),r}Xn.exports=Xo});var Jn=Rr((je,ir)=>{je.formatArgs=Jo;je.save=ei;je.load=ti;je.useColors=Qo;je.storage=ri();je.destroy=(()=>{let t=!1;return()=>{t||(t=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();je.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function Qo(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let t;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(t=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(t[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function Jo(t){if(t[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+t[0]+(this.useColors?"%c ":" ")+"+"+ir.exports.humanize(this.diff),!this.useColors)return;let e="color: "+this.color;t.splice(1,0,e,"color: inherit");let r=0,n=0;t[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(r++,s==="%c"&&(n=r))}),t.splice(n,0,e)}je.log=console.debug||console.log||(()=>{});function ei(t){try{t?je.storage.setItem("debug",t):je.storage.removeItem("debug")}catch{}}function ti(){let t;try{t=je.storage.getItem("debug")||je.storage.getItem("DEBUG")}catch{}return!t&&typeof process<"u"&&"env"in process&&(t=process.env.DEBUG),t}function ri(){try{return localStorage}catch{}}ir.exports=Qn()(je);var{formatters:ni}=ir.exports;ni.j=function(t){try{return JSON.stringify(t)}catch(e){return"[UnexpectedJSONParseError]: "+e.message}}});var Mt=globalThis,nr=Mt.trustedTypes,Mn=nr?nr.createPolicy("lit-html",{createHTML:t=>t}):void 0,zn="$lit$",lt=`lit$${Math.random().toFixed(9).slice(2)}$`,Un="?"+lt,Uo=`<${Un}>`,ht=document,Nt=()=>ht.createComment(""),Pt=t=>t===null||typeof t!="object"&&typeof t!="function",Pr=Array.isArray,Ho=t=>Pr(t)||typeof t?.[Symbol.iterator]=="function",Lr=`[ 	
\f\r]`,Ot=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Nn=/-->/g,Pn=/>/g,pt=RegExp(`>|${Lr}(?:([^\\s"'>=/]+)(${Lr}*=${Lr}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Fn=/'/g,Bn=/"/g,Hn=/^(?:script|style|textarea|title)$/i,Fr=t=>(e,...r)=>({_$litType$:t,strings:e,values:r}),p=Fr(1),ul=Fr(2),pl=Fr(3),mt=Symbol.for("lit-noChange"),$e=Symbol.for("lit-nothing"),qn=new WeakMap,ft=ht.createTreeWalker(ht,129);function Wn(t,e){if(!Pr(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return Mn!==void 0?Mn.createHTML(e):e}var Wo=(t,e)=>{let r=t.length-1,n=[],s,o=e===2?"<svg>":e===3?"<math>":"",i=Ot;for(let l=0;l<r;l++){let a=t[l],c,u,h=-1,b=0;for(;b<a.length&&(i.lastIndex=b,u=i.exec(a),u!==null);)b=i.lastIndex,i===Ot?u[1]==="!--"?i=Nn:u[1]!==void 0?i=Pn:u[2]!==void 0?(Hn.test(u[2])&&(s=RegExp("</"+u[2],"g")),i=pt):u[3]!==void 0&&(i=pt):i===pt?u[0]===">"?(i=s??Ot,h=-1):u[1]===void 0?h=-2:(h=i.lastIndex-u[2].length,c=u[1],i=u[3]===void 0?pt:u[3]==='"'?Bn:Fn):i===Bn||i===Fn?i=pt:i===Nn||i===Pn?i=Ot:(i=pt,s=void 0);let S=i===pt&&t[l+1].startsWith("/>")?" ":"";o+=i===Ot?a+Uo:h>=0?(n.push(c),a.slice(0,h)+zn+a.slice(h)+lt+S):a+lt+(h===-2?l:S)}return[Wn(t,o+(t[r]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),n]},Ft=class t{constructor({strings:e,_$litType$:r},n){let s;this.parts=[];let o=0,i=0,l=e.length-1,a=this.parts,[c,u]=Wo(e,r);if(this.el=t.createElement(c,n),ft.currentNode=this.el.content,r===2||r===3){let h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(s=ft.nextNode())!==null&&a.length<l;){if(s.nodeType===1){if(s.hasAttributes())for(let h of s.getAttributeNames())if(h.endsWith(zn)){let b=u[i++],S=s.getAttribute(h).split(lt),w=/([.?@])?(.*)/.exec(b);a.push({type:1,index:o,name:w[2],strings:S,ctor:w[1]==="."?Dr:w[1]==="?"?Or:w[1]==="@"?Mr:St}),s.removeAttribute(h)}else h.startsWith(lt)&&(a.push({type:6,index:o}),s.removeAttribute(h));if(Hn.test(s.tagName)){let h=s.textContent.split(lt),b=h.length-1;if(b>0){s.textContent=nr?nr.emptyScript:"";for(let S=0;S<b;S++)s.append(h[S],Nt()),ft.nextNode(),a.push({type:2,index:++o});s.append(h[b],Nt())}}}else if(s.nodeType===8)if(s.data===Un)a.push({type:2,index:o});else{let h=-1;for(;(h=s.data.indexOf(lt,h+1))!==-1;)a.push({type:7,index:o}),h+=lt.length-1}o++}}static createElement(e,r){let n=ht.createElement("template");return n.innerHTML=e,n}};function xt(t,e,r=t,n){if(e===mt)return e;let s=n!==void 0?r._$Co?.[n]:r._$Cl,o=Pt(e)?void 0:e._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(t),s._$AT(t,r,n)),n!==void 0?(r._$Co??(r._$Co=[]))[n]=s:r._$Cl=s),s!==void 0&&(e=xt(t,s._$AS(t,e.values),s,n)),e}var Ir=class{constructor(e,r){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:r},parts:n}=this._$AD,s=(e?.creationScope??ht).importNode(r,!0);ft.currentNode=s;let o=ft.nextNode(),i=0,l=0,a=n[0];for(;a!==void 0;){if(i===a.index){let c;a.type===2?c=new Bt(o,o.nextSibling,this,e):a.type===1?c=new a.ctor(o,a.name,a.strings,this,e):a.type===6&&(c=new Nr(o,this,e)),this._$AV.push(c),a=n[++l]}i!==a?.index&&(o=ft.nextNode(),i++)}return ft.currentNode=ht,s}p(e){let r=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(e,n,r),r+=n.strings.length-2):n._$AI(e[r])),r++}},Bt=class t{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,r,n,s){this.type=2,this._$AH=$e,this._$AN=void 0,this._$AA=e,this._$AB=r,this._$AM=n,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,r=this._$AM;return r!==void 0&&e?.nodeType===11&&(e=r.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,r=this){e=xt(this,e,r),Pt(e)?e===$e||e==null||e===""?(this._$AH!==$e&&this._$AR(),this._$AH=$e):e!==this._$AH&&e!==mt&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Ho(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==$e&&Pt(this._$AH)?this._$AA.nextSibling.data=e:this.T(ht.createTextNode(e)),this._$AH=e}$(e){let{values:r,_$litType$:n}=e,s=typeof n=="number"?this._$AC(e):(n.el===void 0&&(n.el=Ft.createElement(Wn(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===s)this._$AH.p(r);else{let o=new Ir(s,this),i=o.u(this.options);o.p(r),this.T(i),this._$AH=o}}_$AC(e){let r=qn.get(e.strings);return r===void 0&&qn.set(e.strings,r=new Ft(e)),r}k(e){Pr(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,n,s=0;for(let o of e)s===r.length?r.push(n=new t(this.O(Nt()),this.O(Nt()),this,this.options)):n=r[s],n._$AI(o),s++;s<r.length&&(this._$AR(n&&n._$AB.nextSibling,s),r.length=s)}_$AR(e=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);e!==this._$AB;){let n=e.nextSibling;e.remove(),e=n}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},St=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,r,n,s,o){this.type=1,this._$AH=$e,this._$AN=void 0,this.element=e,this.name=r,this._$AM=s,this.options=o,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=$e}_$AI(e,r=this,n,s){let o=this.strings,i=!1;if(o===void 0)e=xt(this,e,r,0),i=!Pt(e)||e!==this._$AH&&e!==mt,i&&(this._$AH=e);else{let l=e,a,c;for(e=o[0],a=0;a<o.length-1;a++)c=xt(this,l[n+a],r,a),c===mt&&(c=this._$AH[a]),i||(i=!Pt(c)||c!==this._$AH[a]),c===$e?e=$e:e!==$e&&(e+=(c??"")+o[a+1]),this._$AH[a]=c}i&&!s&&this.j(e)}j(e){e===$e?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},Dr=class extends St{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===$e?void 0:e}},Or=class extends St{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==$e)}},Mr=class extends St{constructor(e,r,n,s,o){super(e,r,n,s,o),this.type=5}_$AI(e,r=this){if((e=xt(this,e,r,0)??$e)===mt)return;let n=this._$AH,s=e===$e&&n!==$e||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,o=e!==$e&&(n===$e||s);s&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},Nr=class{constructor(e,r,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=r,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){xt(this,e)}};var Go=Mt.litHtmlPolyfillSupport;Go?.(Ft,Bt),(Mt.litHtmlVersions??(Mt.litHtmlVersions=[])).push("3.3.1");var le=(t,e,r)=>{let n=r?.renderBefore??e,s=n._$litPart$;if(s===void 0){let o=r?.renderBefore??null;n._$litPart$=s=new Bt(e.insertBefore(Nt(),o),o,void 0,r??{})}return s._$AI(t),s};var sr="today",Gn=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}];function Br(t){return t==="today"||t==="7d"||t==="30d"||t==="all"}function jn(t,e=Date.now()){switch(t){case"today":{let r=new Date(e);return r.setHours(0,0,0,0),r.getTime()}case"7d":return e-7*864e5;case"30d":return e-30*864e5;case"all":default:return}}function Yn(){let t=null,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{get(){return t},set(n){t=n,r()},clear(){t=null,r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}function Vn(){let t=new Map,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{set(n,s){t.set(n,{lines:Array.isArray(s)?[...s]:[]}),r()},append(n,s){let o=t.get(n)||{lines:[]};o.lines=[...o.lines,s],t.set(n,o),r()},get(n){return t.get(n)||null},clear(n){typeof n=="string"?t.delete(n):t.clear(),r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}var es=zo(Jn(),1);function ve(t){return(0,es.default)(`beads-ui:${t}`)}function Xe(t){if(typeof t=="number")return Number.isFinite(t)?t:0;if(typeof t=="string"){let e=Date.parse(t);return Number.isFinite(e)?e:0}return 0}function qt(t,e){let r=Xe(t.created_at),n=Xe(e.created_at);if(r!==n)return r<n?1:-1;let s=t.priority??2,o=e.priority??2;if(s!==o)return s-o;let i=t.id,l=e.id;return i<l?-1:i>l?1:0}function ns(t,e){let r=Xe(t.created_at),n=Xe(e.created_at);if(r!==n)return r<n?-1:1;let s=t.priority??2,o=e.priority??2;if(s!==o)return s-o;let i=t.id,l=e.id;return i<l?-1:i>l?1:0}function ss(t,e){let r=Xe(t.updated_at),n=Xe(e.updated_at);if(r!==n)return r<n?1:-1;let s=t.id,o=e.id;return s<o?-1:s>o?1:0}function os(t,e){let r=t.priority??2,n=e.priority??2;if(r!==n)return r-n;let s=Xe(t.created_at),o=Xe(e.created_at);if(s!==o)return s<o?1:-1;let i=t.id,l=e.id;return i<l?-1:i>l?1:0}function is(t,e){let r=t.closed_at??0,n=e.closed_at??0;if(r!==n)return r<n?1:-1;let s=t?.id,o=e?.id;return s<o?-1:s>o?1:0}var si=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function ts(t){let e=t&&t.metadata,r=e?e.task_order:void 0;if(r==null||r==="")return Number.POSITIVE_INFINITY;let n=Number(r);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function rs(t){let e=t&&t.title;if(typeof e!="string")return Number.POSITIVE_INFINITY;let r=si.exec(e);if(!r)return Number.POSITIVE_INFINITY;let n=Number(r[1]);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function as(t,e){let r=ts(t),n=ts(e);if(r!==n)return r<n?-1:1;let s=rs(t),o=rs(e);if(s!==o)return s<o?-1:1;let i=Xe(t&&t.created_at),l=Xe(e&&e.created_at);if(i!==l)return i<l?-1:1;let a=t&&t.id,c=e&&e.id;return a===c?0:String(a)<String(c)?-1:1}var qr=2**20;function Ct(t,e){let r=t&&t.id;return e&&typeof r=="string"&&Object.prototype.hasOwnProperty.call(e,r)&&typeof e[r]=="number"&&Number.isFinite(e[r])?e[r]:-Xe(t&&t.created_at)}function ar(t){return(e,r)=>{let n=Ct(e,t),s=Ct(r,t);if(n!==s)return n<s?-1:1;let o=e?.id,i=r?.id;return o<i?-1:o>i?1:0}}function zr(t,e,r){let n=Array.isArray(t)?t:[],s=n.length,o=Math.max(0,Math.min(e,s-1)),i=o-1>=0?n[o-1]:null,l=o+1<s?n[o+1]:null;if(!i&&!l)return{rank:0};if(!i)return{rank:Ct(l,r)-qr};if(!l)return{rank:Ct(i,r)+qr};let a=Ct(i,r),c=Ct(l,r),u=(a+c)/2;return a<u&&u<c?{rank:u}:{renormalize:n.map((h,b)=>({bead_id:h.id,rank:b*qr}))}}function Ur(t,e={}){let r=ve(`issue-store:${t}`),n=new Map,s=[],o=0,i=new Set,l=!1,a=e.sort||qt;function c(){for(let b of Array.from(i))try{b()}catch{}}function u(){s=Array.from(n.values()).sort(a)}function h(b){if(l||!b||b.id!==t)return;let S=Number(b.revision)||0;if(r("apply %s rev=%d",b.type,S),!(S<=o&&b.type!=="snapshot")){if(b.type==="snapshot"){if(S<=o)return;n.clear();let w=Array.isArray(b.issues)?b.issues:[];for(let C of w)C&&typeof C.id=="string"&&C.id.length>0&&n.set(C.id,C);u(),o=S,c();return}if(b.type==="upsert"){let w=b.issue;if(w&&typeof w.id=="string"&&w.id.length>0){let C=n.get(w.id);if(!C)n.set(w.id,w);else{let M=Number.isFinite(C.updated_at)?C.updated_at:0,P=Number.isFinite(w.updated_at)?w.updated_at:0;if(M<=P){for(let q of Object.keys(C))q in w||delete C[q];for(let[q,O]of Object.entries(w))C[q]=O}}u()}o=S,c()}else if(b.type==="delete"){let w=String(b.issue_id||"");w&&(n.delete(w),u()),o=S,c()}}}return{id:t,subscribe(b){return i.add(b),()=>{i.delete(b)}},applyPush:h,snapshot(){return s},size(){return n.size},getById(b){return n.get(b)},dispose(){l=!0,n.clear(),s=[],i.clear(),o=0}}}function lr(t){let e=String(t.type||"").trim(),r={};if(t.params&&typeof t.params=="object"){let s=Object.keys(t.params).sort();for(let o of s){let i=t.params[o];r[o]=String(i)}}let n=new URLSearchParams(r).toString();return n.length>0?`${e}?${n}`:e}function ls(t){let e=ve("subs"),r=new Map,n=new Map;function s(l,a){e("applyDelta %s +%d ~%d -%d",l,(a.added||[]).length,(a.updated||[]).length,(a.removed||[]).length);let c=n.get(l);if(!c||c.size===0)return;let u=Array.isArray(a.added)?a.added:[],h=Array.isArray(a.updated)?a.updated:[],b=Array.isArray(a.removed)?a.removed:[];for(let S of Array.from(c)){let w=r.get(S);if(!w)continue;let C=w.itemsById;for(let M of u)typeof M=="string"&&M.length>0&&C.set(M,!0);for(let M of h)typeof M=="string"&&M.length>0&&C.set(M,!0);for(let M of b)typeof M=="string"&&M.length>0&&C.delete(M)}}async function o(l,a){let c=lr(a);if(e("subscribe %s key=%s",l,c),!r.has(l))r.set(l,{key:c,itemsById:new Map});else{let h=r.get(l);if(h&&h.key!==c){let b=n.get(h.key);b&&(b.delete(l),b.size===0&&n.delete(h.key)),r.set(l,{key:c,itemsById:new Map})}}n.has(c)||n.set(c,new Set);let u=n.get(c);u&&u.add(l);try{await t("subscribe-list",{id:l,type:a.type,params:a.params})}catch(h){let b=r.get(l)||null;if(b){let S=n.get(b.key);S&&(S.delete(l),S.size===0&&n.delete(b.key))}throw r.delete(l),h}return async()=>{e("unsubscribe %s key=%s",l,c);try{await t("unsubscribe-list",{id:l})}catch{}let h=r.get(l)||null;if(h){let b=n.get(h.key);b&&(b.delete(l),b.size===0&&n.delete(h.key))}r.delete(l)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:lr,selectors:{getIds(l){let a=r.get(l);return a?Array.from(a.itemsById.keys()):[]},has(l,a){let c=r.get(l);return c?c.itemsById.has(a):!1},count(l){let a=r.get(l);return a?a.itemsById.size:0},getItemsById(l){let a=r.get(l),c={};if(!a)return c;for(let u of a.itemsById.keys())c[u]=!0;return c}}}}function cs(){let t=ve("issue-stores"),e=new Map,r=new Map,n=new Set,s=new Map;function o(){for(let a of Array.from(n))try{a()}catch{}}function i(a,c,u){let h=c?lr(c):"",b=r.get(a)||"",S=e.has(a);if(t("register %s key=%s (prev=%s)",a,h,b),S&&b&&h&&b!==h){let w=e.get(a);if(w)try{w.dispose()}catch{}let C=s.get(a);if(C){try{C()}catch{}s.delete(a)}let M=Ur(a,u);e.set(a,M);let P=M.subscribe(()=>o());s.set(a,P)}else if(!S){let w=Ur(a,u);e.set(a,w);let C=w.subscribe(()=>o());s.set(a,C)}return r.set(a,h),()=>l(a)}function l(a){t("unregister %s",a),r.delete(a);let c=e.get(a);c&&(c.dispose(),e.delete(a));let u=s.get(a);if(u){try{u()}catch{}s.delete(a)}}return{register:i,unregister:l,getStore(a){return e.get(a)||null},snapshotFor(a){let c=e.get(a);return c?c.snapshot().slice():[]},subscribe(a){return n.add(a),()=>n.delete(a)}}}function ds(){let t=null,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{get(){return t},set(n){t=n,r()},clear(){t=null,r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}function us(){let t=null,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{get(){return t},set(n){t=n,r()},clear(){t=null,r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}function Hr(t,e){return`#/${t==="worker"?"worker":"board"}?issue=${encodeURIComponent(e)}`}function oi(t){let e=String(t||""),r=e.startsWith("#")?e.slice(1):e,n=r.indexOf("?"),s=n>=0?r.slice(n+1):"";if(s){let l=new URLSearchParams(s).get("issue");if(l)return decodeURIComponent(l)}let o=/^\/issue\/([^\s?#]+)/.exec(r);return o&&o[1]?decodeURIComponent(o[1]):null}function ii(t){let e=String(t||"");return/^#\/worker(\b|\/|$)/.test(e)?"worker":"board"}function ps(t){let e=ve("router"),r=()=>{let n=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(n),o=s&&s[1]?decodeURIComponent(s[1]):oi(n),i=ii(n);if(e("hash change \u2192 view=%s id=%s",i,o),t.setState({selected_id:i==="worker"?null:o,view:i,worker:{selected_parent_id:i==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(n)){let a=o?`#/${i}?issue=${encodeURIComponent(o)}`:`#/${i}`;window.location.hash!==a&&(window.location.hash=a)}};return{start(){window.addEventListener("hashchange",r),r()},stop(){window.removeEventListener("hashchange",r)},gotoIssue(n){let o=(t.getState?t.getState():{view:"board"}).view==="worker"?"worker":"board",i=Hr(o,n);e("goto issue %s (view=%s)",n,o),window.location.hash!==i?window.location.hash=i:t.setState({selected_id:o==="worker"?null:n,view:o,worker:{selected_parent_id:o==="worker"?n:null}})},gotoView(n){let s=t.getState?t.getState():{selected_id:null,worker:{selected_parent_id:null}},o=n==="worker"?s.worker?.selected_parent_id:s.selected_id,i=o?Hr(n,o):`#/${n}`;e("goto view %s (id=%s)",n,o||""),window.location.hash!==i?window.location.hash=i:t.setState({view:n,selected_id:n==="worker"?null:s.selected_id})}}}var ai=Object.freeze({workspace_config:{default_workspace:null}});function fs(t){return{workspace_config:{default_workspace:typeof t?.workspace_config?.default_workspace=="string"&&t.workspace_config.default_workspace.length>0?t.workspace_config.default_workspace:ai.workspace_config.default_workspace}}}function hs(t={}){let e=ve("state"),r={selected_id:t.selected_id??null,view:t.view??"board",filters:{status:t.filters?.status??"all",search:t.filters?.search??"",type:typeof t.filters?.type=="string"?t.filters?.type:""},board:{closed_filter:t.board?.closed_filter==="3"||t.board?.closed_filter==="7"||t.board?.closed_filter==="today"?t.board?.closed_filter:"today",show_deferred_column:t.board?.show_deferred_column===!0},worker:{selected_parent_id:t.worker?.selected_parent_id??null,show_closed_children:Array.isArray(t.worker?.show_closed_children)?t.worker.show_closed_children:[]},workspace:{current:t.workspace?.current??null,available:t.workspace?.available??[],hidden:t.workspace?.hidden??[]},config:fs(t.config)},n=new Set;function s(){for(let o of Array.from(n))try{o(r)}catch{}}return{getState(){return r},setState(o){let i={...r,...o,filters:{...r.filters,...o.filters||{}},board:{...r.board,...o.board||{}},worker:{...r.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:r.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:r.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:r.workspace.hidden},config:o.config!==void 0?fs(o.config):r.config},l=i.workspace.current?.path!==r.workspace.current?.path||i.workspace.available.length!==r.workspace.available.length||i.workspace.hidden.length!==r.workspace.hidden.length||i.workspace.hidden.some((c,u)=>c!==r.workspace.hidden[u]),a=i.config.workspace_config.default_workspace!==r.config.workspace_config.default_workspace;i.selected_id===r.selected_id&&i.view===r.view&&i.filters.status===r.filters.status&&i.filters.search===r.filters.search&&i.filters.type===r.filters.type&&i.board.closed_filter===r.board.closed_filter&&i.board.show_deferred_column===r.board.show_deferred_column&&i.worker.selected_parent_id===r.worker.selected_parent_id&&i.worker.show_closed_children.length===r.worker.show_closed_children.length&&i.worker.show_closed_children.every((c,u)=>c===r.worker.show_closed_children[u])&&!l&&!a||(r=i,e("state change %o",{selected_id:r.selected_id,view:r.view,filters:r.filters,board:r.board,worker:r.worker,workspace:r.workspace.current?.path,config:{default_workspace:r.config.workspace_config.default_workspace}}),s())},subscribe(o){return n.add(o),()=>n.delete(o)}}}function ms(t){let e=ve("activity"),r=0,n=new Map,s=1;function o(){if(!t)return;let c=r>0;t.toggleAttribute("hidden",!c),t.setAttribute("aria-busy",c?"true":"false")}function i(){r+=1,e("start count=%d",r),o()}function l(){let c=r;r=Math.max(0,r-1),c<=0?e("done called but count was already %d",c):e("done count=%d\u2192%d",c,r),o()}function a(c){return async(h,b)=>{let S=s++,w=Date.now();n.set(S,{type:h,start_ts:w}),e("request start id=%d type=%s count=%d",S,h,r+1),i();let C=!1,M=()=>{C||(C=!0,n.delete(S),l())},P=setTimeout(()=>{C||(e("request TIMEOUT id=%d type=%s elapsed=%dms",S,h,Date.now()-w),M())},3e4);try{let q=await c(h,b),O=Date.now()-w;return e("request done id=%d type=%s elapsed=%dms",S,h,O),q}catch(q){let O=Date.now()-w;throw e("request error id=%d type=%s elapsed=%dms err=%o",S,h,O,q),q}finally{clearTimeout(P),M()}}}return o(),{wrapSend:a,start:i,done:l,getCount:()=>r,getActiveRequests:()=>{let c=Date.now();return Array.from(n.entries()).map(([u,h])=>({id:u,type:h.type,elapsed_ms:c-h.start_ts}))}}}function Q(t,e="info",r=2800){let n=document.createElement("div");n.className="toast",n.textContent=t,n.style.position="fixed",n.style.right="12px",n.style.bottom="12px",n.style.zIndex="1000",n.style.color="#fff",n.style.padding="8px 10px",n.style.borderRadius="4px",n.style.fontSize="12px",e==="success"?n.style.background="#156d36":e==="warning"?n.style.background="#a36a00":e==="error"?n.style.background="#9f2011":n.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(n),setTimeout(()=>{try{n.remove()}catch{}},r)}function cr(t=void 0,e=void 0){function r(){if(!e||typeof e.get!="function")return null;let o=e.get();return o&&o.order?o.order:{}}function n(o,i,l){let a=t&&t.snapshotFor?t.snapshotFor(o).slice():[];if(i==="closed")return a.sort(is),a;switch(l){case"created_desc":return a.sort(qt),a;case"created_asc":return a.sort(ns),a;case"updated_desc":return a.sort(ss),a;case"priority":return a.sort(os),a;case"manual":default:{let c=r();return c?a.sort(ar(c)):a.sort(qt),a}}}function s(o){let i=[];return t&&typeof t.subscribe=="function"&&i.push(t.subscribe(o)),e&&typeof e.subscribe=="function"&&i.push(e.subscribe(o)),()=>{for(let l of i)try{l()}catch{}}}return{selectBoardColumn:n,subscribe:s}}function dr(t){let e=t.transport,r=t.uiOrderStore;function n(i,l){return"renormalize"in i?i.renormalize:[{bead_id:l,rank:i.rank}]}function s(i,l){let a={...i.order};for(let c of l)a[c.bead_id]=c.rank;r&&r.set({revision:i.revision,order:a})}async function o(i,l,a){if(!e||!r)return;let c=r.get()||{revision:0,order:{}},u=n(zr(l,a,c.order),i);s(c,u);let h=await e("ui-order-set",{expected_revision:c.revision,entries:u});if(h&&h.conflict){let b={revision:typeof h.revision=="number"?h.revision:0,order:h.order||{}};r.set(b);let S=n(zr(l,a,b.order),i);s(b,S);let w=await e("ui-order-set",{expected_revision:b.revision,entries:S});w&&w.applied&&r.set({revision:typeof w.revision=="number"?w.revision:0,order:w.order||{}})}else h&&h.applied&&r.set({revision:typeof h.revision=="number"?h.revision:0,order:h.order||{}})}return{applyReorder:o}}function ur(t){return Array.isArray(t)?t.filter(e=>typeof e=="string"):[]}function Wr(t,e){return!e||typeof t!="string"||t.length===0||ur(e.visible_labels).includes(t)?!0:ur(e.hidden_labels).includes(t)?!1:!ur(e.hidden_prefixes).some(r=>r.length>0&&t.startsWith(r))}function gs(t,e){return ur(t).filter(r=>Wr(r,e))}function _t(t,e){let r=t&&t.chips?t.chips[e]:void 0;return typeof r=="boolean"?r:!0}function Gr(t){if(!t)return null;if(typeof t=="number")return Number.isFinite(t)?t:null;let e=Date.parse(t);return Number.isFinite(e)?e:null}function Rt(t){let e=Gr(t);if(e===null)return"";let r=new Date(e),n=s=>String(s).padStart(2,"0");return`${r.getFullYear()}-${n(r.getMonth()+1)}-${n(r.getDate())} ${n(r.getHours())}:${n(r.getMinutes())}`}function jr(t,e){let r=Gr(t);if(r===null)return"";let s=(typeof e=="number"?e:Date.now())-r;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let i=Math.floor(s/36e5);if(i<24)return`${i}\uC2DC\uAC04 \uC804`;let l=Math.floor(s/864e5);if(l<7)return`${l}\uC77C \uC804`;let a=Math.floor(l/7);if(l<30)return`${a}\uC8FC \uC804`;let c=Math.floor(l/30);return c<12?`${c}\uAC1C\uC6D4 \uC804`:`${Math.floor(l/365)}\uB144 \uC804`}var li={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg"},ci={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge"},di={spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},ui={reviewed:"\u2713",skip:"\u2298",stale:"\u2713"};function pi(t,e,r){if(!(r==="in_progress"||r==="resolved"))return null;for(let s of t)if(e[s]&&e[s].state==="dim")return s;return null}function fi(t,e,r){let n=li[t]||t,s=e&&e.state||"empty",o=ui[s]||"",i="bar";s==="dim"?i+=` b-${n} dim`:s==="on"||s==="reviewed"||s==="skip"?i+=` b-${n} on`:s==="stale"&&(i+=` b-${n} stale`),r&&(i+=" glow");let l=s==="empty"?"lbl":`lbl l-${n} on`,a=r?`color: var(--stage-${n}-on)`:"";return p`
    <div class="seg">
      <div class=${i} style=${a}>${o}</div>
      <div class=${l}>
        ${ci[t]||t}
      </div>
    </div>
  `}function pr(t,e){if(!t||!t.stages)return"";let r=t.route==="full_plan"?"full_plan":"spec_backed",n=di[r],s=t.stages,o=pi(n,s,String(e||"open"));return p`
    <div class="stp" role="img" aria-label="워크플로우 진행 스테퍼">
      ${n.map(i=>fi(i,s[i]||{state:"empty"},i===o))}
    </div>
  `}function hi(t){return typeof t!="number"||!Number.isFinite(t)?"":`P${Math.max(0,Math.min(4,t))}`}var _s=2;function mi(t){if(!t)return[];let e=[];if(t.external){let n=t.reason?`\u23F8 blocked: ${t.reason}`:"\u23F8 blocked";e.push(p`<span class="ctl-chip ctl-chip--blocked">${n}</span>`)}let r=Array.isArray(t.blockers)?t.blockers:[];if(r.length>0){let n=r.slice(0,_s).join(", "),s=r.length-_s,o=`\u26D3 blocked: ${n}${s>0?` +${s}`:""}`;e.push(p`<span class="ctl-chip ctl-chip--blocked-dep">${o}</span>`)}return e}function gi(t,e){let r=e.policy||null,n=t.workflow&&t.workflow.chips||{},s=[];if(n.route&&_t(r,"route")){let o=n.route_source==="derived";s.push(p`<span
        class="ctl-chip ctl-chip--route${o?" is-derived":""}"
        title=${o?"route \uCD94\uB860\uAC12 (metadata \uBBF8\uD540)":"route"}
        >${o?`${n.route} ?`:n.route}</span
      >`)}if(n.fast_track&&_t(r,"fast_track")&&s.push(p`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),n.pr&&_t(r,"pr")){let o=n.pr.number;s.push(p`<span class="ctl-chip ctl-chip--pr"
        >${`PR${o!=null?` #${o}`:""}`}</span
      >`)}for(let o of gs(t.labels,r))s.push(p`<span class="ctl-chip ctl-chip--label">${o}</span>`);return t.from_id&&_t(r,"from")&&s.push(p`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${t.from_id} \uC5F4\uAE30`}
        @click=${o=>{o.stopPropagation(),e.onFromChipClick&&e.onFromChipClick(o,String(t.from_id))}}
      >
        ↩ from ${t.from_id}
      </button>`),_t(r,"blocked")&&s.push(...mi(t.blocked_info)),s.length===0?"":p`<div class="board-card__chips">${s}</div>`}function _i(t){switch(t){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function bi(t){let e=jr(t.created_at),r=jr(t.updated_at);return!e&&!r?"":p`<span class="board-card__times">
    ${e?p`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${Rt(t.created_at)}`}
          >생성 ${e}</span
        >`:""}
    ${e&&r?p`<span class="board-card__time-sep">·</span>`:""}
    ${r?p`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${Rt(t.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </span>`}function yi(t,e){let r=e.rollupFor?e.rollupFor(t.id):{total:0,count:0,current:null,children:[]},n=r.total||0,s=e.isExpanded?e.isExpanded(t.id):!0,o=n>0?r.children.slice().sort(as):r.children;return p`
    <div class="board-card__roll">
      <div class="board-card__roll-meta">
        ${n>0?p`<button
              type="button"
              class="board-card__roll-toggle"
              aria-expanded=${s?"true":"false"}
              @click=${i=>e.onRollupToggle&&e.onRollupToggle(i,t.id)}
            >
              children ${r.count}/${n} ${s?"\u25B4":"\u25BE"}
            </button>`:p`<span class="board-card__roll-none">children 없음</span>`}
        ${bi(t)}
      </div>
      ${n>0&&r.current?p`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${r.current.title||r.current.id}</span
            >
          </div>`:""}
      ${s&&n>0?p`<div class="board-card__roll-list">
            ${o.map((i,l)=>p`<button
                  type="button"
                  class="board-card__roll-child"
                  @click=${a=>e.onChildClick&&e.onChildClick(a,i.id)}
                >
                  <span class=${_i(i.status)}>●</span>
                  <span class="board-card__roll-child-ord">${l+1}</span>
                  <span class="board-card__roll-child-title"
                    >${i.title||i.id}</span
                  >
                </button>`)}
          </div>`:""}
    </div>
  `}function bs(t,e){let r=hi(t.priority);return p`
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
        ${r?p`<span class="board-card__pri">${r}</span>`:""}
      </div>
      <div class="board-card__title">${t.title||"(\uC81C\uBAA9 \uC5C6\uC74C)"}</div>
      ${gi(t,e)}
      ${t.workflow&&_t(e.policy||null,"stepper")?pr(t.workflow,t.status):""}
      ${yi(t,e)}
    </article>
  `}function bt(t,e){let r=Array.isArray(t.items)?t.items.length:0,n=t.is_closed===!0;return p`
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
        ${n?p`<select
              class="board-column__closed-range"
              aria-label="Closed period"
              @change=${e.onClosedRangeChange}
            >
              ${Gn.map(o=>p`<option
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
        ${t.items.map(o=>bs(o,e))}
      </div>
    </section>
  `}var ki=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],wi=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],vi=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function $i(t,e,r){let n=t.labels.length,s=n>0?`\uB77C\uBCA8 ${n}`:"\uB77C\uBCA8";return p`
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
      ${r.label_menu_open?p`<div class="board-filter__label-menu" role="group">
            ${r.label_options.length===0?p`<div class="board-filter__label-empty">라벨 없음</div>`:r.label_options.map(o=>p`<label class="board-filter__label-row">
                      <input
                        type="checkbox"
                        .checked=${t.labels.includes(o)}
                        @change=${()=>e.onLabelToggle(o)}
                      />
                      <span>${o}</span>
                    </label>`)}
            ${n>0?p`<button
                  type="button"
                  class="board-filter__label-clear"
                  @click=${e.onLabelClear}
                >
                  선택 해제
                </button>`:""}
          </div>`:""}
    </div>
  `}function ys(t,e,r){return p`
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
        ${ki.map(n=>p`<option
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
        ${wi.map(n=>p`<option
              value=${n.value}
              ?selected=${t.type===n.value}
            >
              ${n.label}
            </option>`)}
      </select>
      ${$i(t,e,r)}
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
        ${vi.map(n=>p`<option
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
  `}var xi=200,Si={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","deferred-col":"deferred","closed-col":"closed"},Ai=new Set(["blocked-col","ready-col","in-progress-col","resolved-col","deferred-col"]),ks="beads-ui.board.sort",ws=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function Ti(){try{let t=window.localStorage.getItem(ks);if(t&&ws.has(t))return t}catch{}return"created_desc"}function vs(t,e){let r=ve("views:board"),n=e.gotoIssue,s=e.issueStores,o=e.transport,i=e.uiOrderStore,l=e.displayPolicyStore,a=e.onClosedRangeChange,c=e.onNewIssue,u=e.closedRange||sr,h=s?cr(s,i):null,b=dr({transport:o,uiOrderStore:i}),S=[],w=[],C=[],M=[],P=[],q=[],O=!1,L=0,k=Ti(),y=new Map,v=new Map,x=new Map,B=new Set,j={search:"",priority:"",type:"",labels:[]},J=!1,ee=null;function Te(T){return String(T.status||"open")==="open"}function Me(T){let D=String(T.status||"open");return D==="open"||D==="blocked"}function Ee(T){let D=j.search.trim().toLowerCase(),V=j.priority,G=j.type,N=j.labels;return T.filter(g=>{if(D){let m=String(g.id||"").toLowerCase(),A=String(g.title||"").toLowerCase();if(!m.includes(D)&&!A.includes(D))return!1}if(V!==""&&String(g.priority)!==V||G!==""&&String(g.issue_type||"")!==G)return!1;if(N.length>0){let m=Array.isArray(g.labels)?g.labels:[];if(!N.some(A=>m.includes(A)))return!1}return!0})}function Ve(){let T=new Set;for(let D of[S,w,C,M,P,q])for(let V of D){let G=Array.isArray(V.labels)?V.labels:[];for(let N of G)typeof N=="string"&&N.length>0&&T.add(N)}return Array.from(T).sort()}function ze(){return j.search.trim()!==""||j.priority!==""||j.type!==""||j.labels.length>0}function he(){try{if(h){let T=h.selectBoardColumn("tab:board:in-progress","in_progress",k),D=h.selectBoardColumn("tab:board:blocked","blocked",k).filter(Me),V=new Set(T.map(U=>U.id)),G=h.selectBoardColumn("tab:board:ready","ready",k).filter(U=>Te(U)&&!V.has(U.id)),N=h.selectBoardColumn("tab:board:resolved","resolved",k),g=h.selectBoardColumn("tab:board:deferred","deferred",k),m=O?g:[],A=h.selectBoardColumn("tab:board:closed","closed").slice(0,xi),E=[...D,...G,...T,...N,...m,...A];xe(E);let X=new Set;for(let U of E)U&&U.id&&!Yr(U)&&X.add(U.id);let fe=!ze();S=fe?Lt(D,X):D,w=fe?Lt(G,X):G,C=fe?Lt(T,X):T,M=fe?Lt(N,X):N,P=fe?Lt(m,X):m,L=g.length,q=fe?Lt(A,X):A,y=new Map;for(let U of S)y.set(U.id,"open");for(let U of w)y.set(U.id,"open");for(let U of C)y.set(U.id,"in_progress");for(let U of M)y.set(U.id,"resolved");for(let U of P)y.set(U.id,"deferred");for(let U of q)y.set(U.id,"closed");v=new Map;for(let U of S)v.set(U.id,"blocked-col");for(let U of w)v.set(U.id,"ready-col");for(let U of C)v.set(U.id,"in-progress-col");for(let U of M)v.set(U.id,"resolved-col");for(let U of P)v.set(U.id,"deferred-col");for(let U of q)v.set(U.id,"closed-col")}be()}catch{S=[],w=[],C=[],M=[],P=[],q=[],x=new Map,be()}}function xe(T){let D=new Map;for(let G of T)G&&G.id&&!D.has(G.id)&&D.set(G.id,G);let V=new Map;for(let G of D.values()){let N=Yr(G);if(!N)continue;let g=V.get(N);g||(g=[],V.set(N,g)),g.push({id:G.id,title:G.title,status:G.status,metadata:G.metadata,created_at:G.created_at})}x=V}function Ue(T){let D=x.get(T)||[],V=0,G=null;for(let N of D)(N.status==="resolved"||N.status==="closed")&&(V+=1),!G&&N.status==="in_progress"&&(G=N);return{total:D.length,count:V,current:G,children:D}}function ce(T){return!B.has(T)}function tt(T,D){T.preventDefault(),T.stopPropagation(),B.has(D)?B.delete(D):B.add(D),be()}function de(T,D){T.preventDefault(),T.stopPropagation(),n(D)}function He(T,D){T.preventDefault(),T.stopPropagation(),n(D)}function oe(T,D){ee||n(D)}function Ne(T,D){T.preventDefault(),T.stopPropagation(),Ei(D).then(V=>{V&&Q("\uBCF5\uC0AC\uB428","success",1200)})}function Ye(T,D){ee=D,T.dataTransfer&&(T.dataTransfer.setData("text/plain",D),T.dataTransfer.effectAllowed="move"),T.target.classList.add("board-card--dragging")}function $(T){T.target.classList.remove("board-card--dragging"),Ze(),setTimeout(()=>{ee=null},0)}function R(T){let D=String(T.target.value||"");!D||D===u||(u=D,a&&a(D),be())}let z={onCardClick:oe,onCopyId:Ne,onDragStart:Ye,onDragEnd:$,onClosedRangeChange:R,rollupFor:Ue,isExpanded:ce,onRollupToggle:tt,onChildClick:de,onFromChipClick:He,get policy(){return l?l.get():null}};function Y(T){let D=T.target,V=t.querySelector(".board-filter__labels");D&&V&&V.contains(D)||te()}function me(T){T.key==="Escape"&&te()}function K(){J||(J=!0,document.addEventListener("mousedown",Y),document.addEventListener("keydown",me),be())}function te(){J&&(J=!1,document.removeEventListener("mousedown",Y),document.removeEventListener("keydown",me),be())}let ue={onSearchInput(T){j.search=String(T.target.value||""),he()},onPriorityChange(T){j.priority=String(T.target.value||""),he()},onTypeChange(T){j.type=String(T.target.value||""),he()},onSortChange(T){let D=String(T.target.value||"");if(!(!ws.has(D)||D===k)){k=D;try{window.localStorage.setItem(ks,D)}catch{}he()}},onDeferredToggle(){O=!O,he()},onLabelMenuToggle(){J?te():K()},onLabelToggle(T){let D=j.labels.indexOf(T);D===-1?j.labels.push(T):j.labels.splice(D,1),he()},onLabelClear(){j.labels.length!==0&&(j.labels=[],he())},onNewIssue(){c&&c()}};function ae(){let T=O?"board-root board-root--deferred":"board-root";return p`
      <div class="board-view">
        ${ys(j,ue,{sort_mode:k,show_deferred:O,deferred_count:L,label_options:Ve(),label_menu_open:J})}
        <div class=${T}>
          ${bt({title:"Blocked",id:"blocked-col",items:Ee(S)},z)}
          ${bt({title:"Ready",id:"ready-col",items:Ee(w)},z)}
          ${bt({title:"In progress",id:"in-progress-col",items:Ee(C)},z)}
          ${bt({title:"Resolved",id:"resolved-col",items:Ee(M)},z)}
          ${O?bt({title:"Deferred",id:"deferred-col",items:Ee(P)},z):""}
          ${bt({title:"Closed",id:"closed-col",items:Ee(q),is_closed:!0,closed_range:u},z)}
        </div>
      </div>
    `}function be(){le(ae(),t),Ae()}function Ae(){try{let T=Array.from(t.querySelectorAll(".board-column"));for(let D of T)Array.from(D.querySelectorAll(".board-card")).forEach((G,N)=>{G.tabIndex=N===0?0:-1})}catch{}}async function Le(T,D){if(!o){Q("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:T,status:D}),Q("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(V){r("update-status failed: %o",V),Q("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function ye(T){switch(T){case"blocked-col":return S;case"ready-col":return w;case"in-progress-col":return C;case"resolved-col":return M;case"deferred-col":return P;default:return[]}}function We(T,D,V){if(!o||!i)return;let G=ye(T),N=G.find(X=>X.id===D);if(!N)return;let g=G.filter(X=>X.id!==D),m=V.closest?V.closest(".board-card"):null,A=g.length;if(m){let X=m.getAttribute("data-issue-id");if(X===D)return;let fe=g.findIndex(U=>U.id===X);fe>=0&&(A=fe)}let E=g.slice();E.splice(A,0,N),b.applyReorder(D,E,A)}function Ze(){for(let T of Array.from(t.querySelectorAll(".board-column--drag-over")))T.classList.remove("board-column--drag-over")}let ge=null;t.addEventListener("dragover",T=>{T.preventDefault(),T.dataTransfer&&(T.dataTransfer.dropEffect="move");let V=T.target.closest(".board-column");V&&V!==ge&&(ge&&ge.classList.remove("board-column--drag-over"),V.classList.add("board-column--drag-over"),ge=V)}),t.addEventListener("dragleave",T=>{let D=T.relatedTarget;(!D||!t.contains(D))&&ge&&(ge.classList.remove("board-column--drag-over"),ge=null)}),t.addEventListener("drop",T=>{T.preventDefault(),ge&&(ge.classList.remove("board-column--drag-over"),ge=null);let D=T.target,V=D.closest(".board-column");if(!V)return;let G=T.dataTransfer?.getData("text/plain")||"";if(!G)return;let N=V.id,g=v.get(G);if(g&&g===N){if(Ai.has(N)){if(k!=="manual"){Q("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}We(N,G,D)}return}let m=Si[N];if(!m){Q("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}y.get(G)!==m&&Le(G,m)}),t.addEventListener("keydown",T=>{let D=T.target;if(!(D instanceof HTMLElement))return;let V=String(D.tagName||"").toLowerCase();if(V==="input"||V==="textarea"||V==="select"||V==="button"||V==="a"||D.isContentEditable===!0)return;let G=D.closest(".board-card");if(!G)return;let N=String(T.key||"");if(N==="Enter"||N===" "){T.preventDefault();let E=G.getAttribute("data-issue-id");E&&n(E);return}if(N!=="ArrowUp"&&N!=="ArrowDown"&&N!=="ArrowLeft"&&N!=="ArrowRight")return;T.preventDefault();let g=G.closest(".board-column");if(!g)return;let m=Array.from(g.querySelectorAll(".board-card")),A=m.indexOf(G);if(N==="ArrowDown"&&A<m.length-1){Ce(G,m[A+1]);return}if(N==="ArrowUp"&&A>0){Ce(G,m[A-1]);return}if(N==="ArrowLeft"||N==="ArrowRight"){let E=Array.from(t.querySelectorAll(".board-column")),X=E.indexOf(g),fe=N==="ArrowRight"?1:-1,U=X+fe;for(;U>=0&&U<E.length;){let Ie=E[U].querySelector(".board-card");if(Ie){Ce(G,Ie);return}U+=fe}}});function Ce(T,D){try{T.tabIndex=-1,D.tabIndex=0,D.focus()}catch{}}let _e=null;h&&h.subscribe&&(_e=h.subscribe(()=>{try{he()}catch{}}));let Re=null;return l&&l.subscribe&&(Re=l.subscribe(()=>{try{he()}catch{}})),{async load(){r("load"),he()},clear(){te(),_e&&(_e(),_e=null),Re&&(Re(),Re=null),t.replaceChildren(),S=[],w=[],C=[],M=[],P=[],q=[],y=new Map,v=new Map}}}function Yr(t){let e=t&&t.parent;return typeof e=="string"?e:e&&e.id?String(e.id):""}function Lt(t,e){return t.filter(r=>{let n=Yr(r);return!(n&&e.has(n))})}async function Ei(t){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(t)),!0;let e=document.createElement("textarea");e.value=String(t),e.style.position="fixed",e.style.left="-9999px",document.body.appendChild(e),e.select();let r=!1;try{r=document.execCommand("copy")}finally{e.remove()}return r}catch{return!1}}async function It(t){let e=String(t);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(e),!0}catch{}try{let r=document.createElement("textarea");r.value=e,r.style.position="fixed",r.style.left="-9999px",document.body.appendChild(r),r.select();let n=!1;try{n=document.execCommand("copy")}finally{r.remove()}return n}catch{return!1}}var Ci={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},Ri=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,Li=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function ct(t){return!!t&&typeof t=="object"}function Vr(t){return typeof t!="string"||t.length===0?[]:t.split(/\r?\n/)}function $s(t,e){let r=Vr(t),n=Vr(e),s=new Map;for(let l of r)s.set(l,(s.get(l)||0)+1);let o=0;for(let l of n){let a=s.get(l)||0;a>0?s.set(l,a-1):o+=1}let i=0;for(let l of s.values())i+=l;return{added:o,removed:i}}function Ii(t){let e="";typeof t=="string"?e=t:Array.isArray(t)?e=t.map(s=>ct(s)&&typeof s.text=="string"?s.text:"").join(""):ct(t)&&typeof t.text=="string"&&(e=t.text);let n=(String(e).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return n.length>120?`${n.slice(0,117)}\u2026`:n}function Di(t){let e=String(t.name||""),r=t.input||{},n={kind:"tool",tool:e,icon:Ci[e]||"\u{1F527}",input:r,expandable:!0};if((e==="Read"||e==="Write")&&(n.path=String(r.file_path||r.path||"")),e==="Write"&&(n.added=Vr(r.content).length),e==="Edit"){n.path=String(r.file_path||r.path||"");let{added:s,removed:o}=$s(r.old_string,r.new_string);n.added=s,n.removed=o}if(e==="MultiEdit"){n.path=String(r.file_path||r.path||"");let s=0,o=0,i=Array.isArray(r.edits)?r.edits:[];for(let l of i){let a=$s(ct(l)?l.old_string:"",ct(l)?l.new_string:"");s+=a.added,o+=a.removed}n.added=s,n.removed=o}return e==="Bash"&&(n.command=String(r.command||"")),(e==="Grep"||e==="Glob")&&(n.command=String(r.pattern||r.query||"")),n}function xs(t){let e=t.split(/\r?\n/).find(n=>n.trim().length>0)||"",r=Ri.exec(e);return r?{kind:"gate",gate:r[2]==="implementation"?"impl":r[2],reviewer:r[3],verdict:r[4],time:r[5]?r[5].trim():void 0,text:e.trim()}:Li.test(e)&&e.trim().length<=80?{kind:"phase",text:e.trim()}:{kind:"assistant",text:t}}function Oi(t,e){if(t.type==="assistant"){let r=t.message,n=r&&Array.isArray(r.content)?r.content:[],s=[];for(let o of n)if(ct(o)){if(o.type==="text"&&typeof o.text=="string")s.push(xs(o.text));else if(o.type==="tool_use"){let i=Di(o);typeof o.id=="string"&&e.set(o.id,i),s.push(i)}}return s}if(t.type==="user"){let r=t.message,n=r&&Array.isArray(r.content)?r.content:[];for(let s of n)if(ct(s)&&s.type==="tool_result"){let o=e.get(String(s.tool_use_id));if(o){let i=Ii(s.content);o.result=i,o.output=typeof s.content=="string"?s.content:i}}return[]}if(t.type==="result"){let r=t.is_error===!1&&t.subtype==="success";return[{kind:"result",success:r,text:typeof t.result=="string"?t.result:r?"DONE":""}]}return[]}function Mi(t){if(t.type==="item.completed"&&ct(t.item)){let e=t.item;return e.type==="agent_message"&&typeof e.text=="string"?[xs(e.text)]:e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}if(t.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(t.type==="turn.failed"){let e=t.error;return[{kind:"error",text:e&&typeof e.message=="string"?e.message:"turn failed"}]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:[]}function Ni(t){let e=t.type;return typeof e=="string"&&(e==="error"||e.startsWith("thread.")||e.startsWith("turn.")||e.startsWith("item."))}function Ss(t){let e=[],r=new Map,n=Array.isArray(t)?t:[];for(let s of n){let o=s;if(typeof s=="string"){let l=s.trim();if(l.length===0)continue;try{o=JSON.parse(l)}catch{continue}}if(!ct(o))continue;let i=Ni(o)?Mi(o):Oi(o,r);for(let l of i)e.push(l)}return e}function fr(t,e={}){let{transport:r,sessionLogStore:n,onClose:s}=e,o=null,i={},l=!0,a=new Set,c=null;function u(){if(!o||!n)return[];let v=n.get(o);return Ss(v?v.lines:[])}function h(v,x){if(x.kind==="gate")return p`<div class="sv__gate">${x.text}</div>`;if(x.kind==="phase")return p`<div class="sv__phase">${x.text}</div>`;if(x.kind==="result")return p`<div
        class="sv__result${x.success?" sv__result--ok":" sv__result--fail"}"
      >
        ${x.success?"\u2713":"\u2717"}
        ${x.text||(x.success?"DONE":"\uC2E4\uD328")}
      </div>`;if(x.kind==="error")return p`<div class="sv__error">⛔ ${x.text}</div>`;if(x.kind==="blocker")return p`<div class="sv__error">⛔ ${x.text}</div>`;if(x.kind==="tool"){let B=a.has(v),j=x.tool==="Bash"?x.command:x.path||x.command||"";return p`<div
        class="sv__tool${B?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>M(v)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${x.icon}</span>
          <span class="sv__tool-name">${x.tool}</span>
          ${j?p`<span class="sv__tool-detail">${j}</span>`:""}
          ${typeof x.added=="number"?p`<span class="sv__diff-add">+${x.added}</span>`:""}
          ${typeof x.removed=="number"?p`<span class="sv__diff-del">−${x.removed}</span>`:""}
          ${x.result?p`<span class="sv__tool-ok">→ ${x.result}</span>`:""}
        </span>
        ${B?p`<pre class="sv__tool-expand">${b(x)}</pre>`:""}
      </div>`}return p`<div class="sv__as">${x.text}</div>`}function b(v){let x=[];if(v.input!==void 0)try{x.push(`input: ${JSON.stringify(v.input,null,2)}`)}catch{}return typeof v.output=="string"&&v.output.length>0&&x.push(`output:
${v.output}`),x.join(`

`)}function S(){if(!o)return p``;let v=u(),x=[i.runner,i.model,i.effort].filter(Boolean).join(" \xB7 "),B=i.session_id||"",j=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${l?"ON":"OFF"}`;return p`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id">${o}</span>
        ${B?p`<button
              type="button"
              class="sv__session"
              title=${B}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${B}`}
              @click=${()=>q(B)}
            >
              ⧉ ${B.slice(0,8)}
            </button>`:""}
        ${x?p`<span class="sv__meta">${x}</span>`:""}
        ${i.worktree?p`<span class="sv__wt" title=${i.worktree}
              >${i.worktree}</span
            >`:""}
        <button
          type="button"
          class="sv__follow${l?" sv__follow--on":""}"
          aria-pressed=${l?"true":"false"}
          aria-label=${j}
          @click=${P}
        >
          <span class="sv__follow-full">⇣ ${j}</span>
          <span class="sv__follow-short">⇣ ${l?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>y()}
        >
          ✕
        </button>
      </div>
      <div class="sv__body">
        ${v.length===0?p`<div class="sv__empty">세션 로그 없음</div>`:v.map((J,ee)=>h(ee,J))}
      </div>
    </div>`}function w(){le(S(),t),l&&C()}function C(){let v=t.querySelector(".sv__body");v&&(v.scrollTop=v.scrollHeight)}function M(v){a.has(v)?a.delete(v):a.add(v),w()}function P(){l=!l,w()}function q(v){It(v).then(x=>{x?Q("\uBCF5\uC0AC\uB428","success",1200):Q("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function O(v){!o||!v||(i={...i,...v},w())}function L(v){let x=v.target;if(!x||!x.classList||!x.classList.contains("sv__body"))return;!(x.scrollHeight-x.scrollTop-x.clientHeight<=4)&&l&&(l=!1,w())}t.addEventListener("scroll",L,!0);function k(v){let x=v&&v.attempt_id;x&&(o=x,i=v.meta||{},l=!0,a.clear(),!c&&n&&(c=n.subscribe(w)),r&&Promise.resolve(r("subscribe-session-log",{id:`session-log:${o}`,attempt_id:o})).catch(()=>{}),w())}function y(){let v=o;o=null,a.clear(),r&&v&&Promise.resolve(r("unsubscribe-session-log",{id:`session-log:${v}`})).catch(()=>{}),le(p``,t),s&&s()}return{open:k,updateMeta:O,close:y,isOpen(){return o!==null},destroy(){c&&(c(),c=null),t.removeEventListener("scroll",L,!0),o=null,le(p``,t)}}}function Pi(t){let e=t&&t.metadata||{},r=[];return typeof e.spec_id=="string"&&e.spec_id.trim().length>0&&r.push({kind:"spec",path:e.spec_id.trim()}),typeof e.plan_path=="string"&&e.plan_path.trim().length>0&&r.push({kind:"plan",path:e.plan_path.trim()}),r}function As(t,e){let r=Pi(t);return p`
    <div class="detail-section-label">Artifacts</div>
    ${r.length===0?p`<div class="detail-empty">산출물 없음</div>`:p`
          ${r.map(n=>p`<div class="detail-art">
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
  `}var Zr=["opus","sonnet","haiku","fable"],Kr=["low","medium","high","xhigh"],Xr=["codex","opus","fable","self","skip"],Qr=["opus","fable","sonnet","haiku"],Fi=["standard","fast_track"],Jr={orchestration_model:"(\uAE30\uBCF8: CLI \uAE30\uBCF8 \uBAA8\uB378)",orchestration_effort:"(\uAE30\uBCF8: CLI \uAE30\uBCF8)",review_model:"(\uAE30\uBCF8: codex)",impl_model:"(\uAE30\uBCF8: \uD2F0\uC5B4 \uC790\uB3D9)"};function hr(t,e){let r=e&&e[t];return typeof r=="string"&&r.length>0?`(\uAE30\uBCF8: ${r} \u2014 \uC804\uC5ED)`:Jr[t]||"(\uAE30\uBCF8)"}function zt(t,e,r,n,s,o){return p`
    <div class="detail-kv">
      <span class="detail-kv__k">${e}</span>
      <select
        class=${s?"detail-kv__v detail-kv__v--sel":"detail-kv__v"}
        aria-label=${e}
        data-key=${t}
        @change=${i=>o.onChange(t,i.target.value)}
      >
        ${r.map(i=>p`<option value=${i.value} ?selected=${i.value===n}>
              ${i.label}
            </option>`)}
      </select>
    </div>
  `}function Ut(t,e){let r=t.map(n=>({value:n,label:n}));return typeof e=="string"?[{value:"",label:e},...r]:r}function Ts(t,e,r){let n=t&&t.metadata||{},s=r&&typeof r=="object"?r:{},o=n.workflow_mode==="fast_track"?"fast_track":"standard";return p`
    <div class="detail-section-label">실행 설정 (수정 가능)</div>
    ${zt("orchestration_model","orchestration_model",Ut(Zr,hr("orchestration_model",s)),n.orchestration_model||"",!1,e)}
    ${zt("orchestration_effort","orchestration_effort",Ut(Kr,hr("orchestration_effort",s)),n.orchestration_effort||"",!1,e)}
    ${zt("review_model","review_model",Ut(Xr,hr("review_model",s)),n.review_model||"",!1,e)}
    ${zt("impl_model","impl_model",Ut(Qr,hr("impl_model",s)),n.impl_model||"",!1,e)}
    ${zt("workflow_mode","workflow_mode",Ut(Fi),o,n.workflow_mode==="fast_track",e)}
  `}var{entries:Ns,setPrototypeOf:Es,isFrozen:Bi,getPrototypeOf:qi,getOwnPropertyDescriptor:zi}=Object,{freeze:Fe,seal:Ke,create:an}=Object,{apply:ln,construct:cn}=typeof Reflect<"u"&&Reflect;Fe||(Fe=function(e){return e});Ke||(Ke=function(e){return e});ln||(ln=function(e,r){for(var n=arguments.length,s=new Array(n>2?n-2:0),o=2;o<n;o++)s[o-2]=arguments[o];return e.apply(r,s)});cn||(cn=function(e){for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return new e(...n)});var mr=Be(Array.prototype.forEach),Ui=Be(Array.prototype.lastIndexOf),Cs=Be(Array.prototype.pop),Ht=Be(Array.prototype.push),Hi=Be(Array.prototype.splice),_r=Be(String.prototype.toLowerCase),en=Be(String.prototype.toString),tn=Be(String.prototype.match),Wt=Be(String.prototype.replace),Wi=Be(String.prototype.indexOf),Gi=Be(String.prototype.trim),Qe=Be(Object.prototype.hasOwnProperty),Pe=Be(RegExp.prototype.test),Gt=ji(TypeError);function Be(t){return function(e){e instanceof RegExp&&(e.lastIndex=0);for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return ln(t,e,n)}}function ji(t){return function(){for(var e=arguments.length,r=new Array(e),n=0;n<e;n++)r[n]=arguments[n];return cn(t,r)}}function ne(t,e){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:_r;Es&&Es(t,null);let n=e.length;for(;n--;){let s=e[n];if(typeof s=="string"){let o=r(s);o!==s&&(Bi(e)||(e[n]=o),s=o)}t[s]=!0}return t}function Yi(t){for(let e=0;e<t.length;e++)Qe(t,e)||(t[e]=null);return t}function it(t){let e=an(null);for(let[r,n]of Ns(t))Qe(t,r)&&(Array.isArray(n)?e[r]=Yi(n):n&&typeof n=="object"&&n.constructor===Object?e[r]=it(n):e[r]=n);return e}function jt(t,e){for(;t!==null;){let n=zi(t,e);if(n){if(n.get)return Be(n.get);if(typeof n.value=="function")return Be(n.value)}t=qi(t)}function r(){return null}return r}var Rs=Fe(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),rn=Fe(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),nn=Fe(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Vi=Fe(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),sn=Fe(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Zi=Fe(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Ls=Fe(["#text"]),Is=Fe(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),on=Fe(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Ds=Fe(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),gr=Fe(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Ki=Ke(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Xi=Ke(/<%[\w\W]*|[\w\W]*%>/gm),Qi=Ke(/\$\{[\w\W]*/gm),Ji=Ke(/^data-[\-\w.\u00B7-\uFFFF]+$/),ea=Ke(/^aria-[\-\w]+$/),Ps=Ke(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),ta=Ke(/^(?:\w+script|data):/i),ra=Ke(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Fs=Ke(/^html$/i),na=Ke(/^[a-z][.\w]*(-[.\w]+)+$/i),Os=Object.freeze({__proto__:null,ARIA_ATTR:ea,ATTR_WHITESPACE:ra,CUSTOM_ELEMENT:na,DATA_ATTR:Ji,DOCTYPE_NAME:Fs,ERB_EXPR:Xi,IS_ALLOWED_URI:Ps,IS_SCRIPT_OR_DATA:ta,MUSTACHE_EXPR:Ki,TMPLIT_EXPR:Qi}),Yt={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},sa=function(){return typeof window>"u"?null:window},oa=function(e,r){if(typeof e!="object"||typeof e.createPolicy!="function")return null;let n=null,s="data-tt-policy-suffix";r&&r.hasAttribute(s)&&(n=r.getAttribute(s));let o="dompurify"+(n?"#"+n:"");try{return e.createPolicy(o,{createHTML(i){return i},createScriptURL(i){return i}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},Ms=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Bs(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:sa(),e=H=>Bs(H);if(e.version="3.3.0",e.removed=[],!t||!t.document||t.document.nodeType!==Yt.document||!t.Element)return e.isSupported=!1,e;let{document:r}=t,n=r,s=n.currentScript,{DocumentFragment:o,HTMLTemplateElement:i,Node:l,Element:a,NodeFilter:c,NamedNodeMap:u=t.NamedNodeMap||t.MozNamedAttrMap,HTMLFormElement:h,DOMParser:b,trustedTypes:S}=t,w=a.prototype,C=jt(w,"cloneNode"),M=jt(w,"remove"),P=jt(w,"nextSibling"),q=jt(w,"childNodes"),O=jt(w,"parentNode");if(typeof i=="function"){let H=r.createElement("template");H.content&&H.content.ownerDocument&&(r=H.content.ownerDocument)}let L,k="",{implementation:y,createNodeIterator:v,createDocumentFragment:x,getElementsByTagName:B}=r,{importNode:j}=n,J=Ms();e.isSupported=typeof Ns=="function"&&typeof O=="function"&&y&&y.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:ee,ERB_EXPR:Te,TMPLIT_EXPR:Me,DATA_ATTR:Ee,ARIA_ATTR:Ve,IS_SCRIPT_OR_DATA:ze,ATTR_WHITESPACE:he,CUSTOM_ELEMENT:xe}=Os,{IS_ALLOWED_URI:Ue}=Os,ce=null,tt=ne({},[...Rs,...rn,...nn,...sn,...Ls]),de=null,He=ne({},[...Is,...on,...Ds,...gr]),oe=Object.seal(an(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Ne=null,Ye=null,$=Object.seal(an(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),R=!0,z=!0,Y=!1,me=!0,K=!1,te=!0,ue=!1,ae=!1,be=!1,Ae=!1,Le=!1,ye=!1,We=!0,Ze=!1,ge="user-content-",Ce=!0,_e=!1,Re={},T=null,D=ne({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),V=null,G=ne({},["audio","video","img","source","image","track"]),N=null,g=ne({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),m="http://www.w3.org/1998/Math/MathML",A="http://www.w3.org/2000/svg",E="http://www.w3.org/1999/xhtml",X=E,fe=!1,U=null,Ie=ne({},[m,A,E],en),wt=ne({},["mi","mo","mn","ms","mtext"]),vt=ne({},["annotation-xml"]),Ar=ne({},["title","style","font","a","script"]),nt=null,Dt=["application/xhtml+xml","text/html"],tr="text/html",f=null,_=null,Z=r.createElement("form"),W=function(d){return d instanceof RegExp||d instanceof Function},re=function(){let d=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(_&&_===d)){if((!d||typeof d!="object")&&(d={}),d=it(d),nt=Dt.indexOf(d.PARSER_MEDIA_TYPE)===-1?tr:d.PARSER_MEDIA_TYPE,f=nt==="application/xhtml+xml"?en:_r,ce=Qe(d,"ALLOWED_TAGS")?ne({},d.ALLOWED_TAGS,f):tt,de=Qe(d,"ALLOWED_ATTR")?ne({},d.ALLOWED_ATTR,f):He,U=Qe(d,"ALLOWED_NAMESPACES")?ne({},d.ALLOWED_NAMESPACES,en):Ie,N=Qe(d,"ADD_URI_SAFE_ATTR")?ne(it(g),d.ADD_URI_SAFE_ATTR,f):g,V=Qe(d,"ADD_DATA_URI_TAGS")?ne(it(G),d.ADD_DATA_URI_TAGS,f):G,T=Qe(d,"FORBID_CONTENTS")?ne({},d.FORBID_CONTENTS,f):D,Ne=Qe(d,"FORBID_TAGS")?ne({},d.FORBID_TAGS,f):it({}),Ye=Qe(d,"FORBID_ATTR")?ne({},d.FORBID_ATTR,f):it({}),Re=Qe(d,"USE_PROFILES")?d.USE_PROFILES:!1,R=d.ALLOW_ARIA_ATTR!==!1,z=d.ALLOW_DATA_ATTR!==!1,Y=d.ALLOW_UNKNOWN_PROTOCOLS||!1,me=d.ALLOW_SELF_CLOSE_IN_ATTR!==!1,K=d.SAFE_FOR_TEMPLATES||!1,te=d.SAFE_FOR_XML!==!1,ue=d.WHOLE_DOCUMENT||!1,Ae=d.RETURN_DOM||!1,Le=d.RETURN_DOM_FRAGMENT||!1,ye=d.RETURN_TRUSTED_TYPE||!1,be=d.FORCE_BODY||!1,We=d.SANITIZE_DOM!==!1,Ze=d.SANITIZE_NAMED_PROPS||!1,Ce=d.KEEP_CONTENT!==!1,_e=d.IN_PLACE||!1,Ue=d.ALLOWED_URI_REGEXP||Ps,X=d.NAMESPACE||E,wt=d.MATHML_TEXT_INTEGRATION_POINTS||wt,vt=d.HTML_INTEGRATION_POINTS||vt,oe=d.CUSTOM_ELEMENT_HANDLING||{},d.CUSTOM_ELEMENT_HANDLING&&W(d.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(oe.tagNameCheck=d.CUSTOM_ELEMENT_HANDLING.tagNameCheck),d.CUSTOM_ELEMENT_HANDLING&&W(d.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(oe.attributeNameCheck=d.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),d.CUSTOM_ELEMENT_HANDLING&&typeof d.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(oe.allowCustomizedBuiltInElements=d.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),K&&(z=!1),Le&&(Ae=!0),Re&&(ce=ne({},Ls),de=[],Re.html===!0&&(ne(ce,Rs),ne(de,Is)),Re.svg===!0&&(ne(ce,rn),ne(de,on),ne(de,gr)),Re.svgFilters===!0&&(ne(ce,nn),ne(de,on),ne(de,gr)),Re.mathMl===!0&&(ne(ce,sn),ne(de,Ds),ne(de,gr))),d.ADD_TAGS&&(typeof d.ADD_TAGS=="function"?$.tagCheck=d.ADD_TAGS:(ce===tt&&(ce=it(ce)),ne(ce,d.ADD_TAGS,f))),d.ADD_ATTR&&(typeof d.ADD_ATTR=="function"?$.attributeCheck=d.ADD_ATTR:(de===He&&(de=it(de)),ne(de,d.ADD_ATTR,f))),d.ADD_URI_SAFE_ATTR&&ne(N,d.ADD_URI_SAFE_ATTR,f),d.FORBID_CONTENTS&&(T===D&&(T=it(T)),ne(T,d.FORBID_CONTENTS,f)),Ce&&(ce["#text"]=!0),ue&&ne(ce,["html","head","body"]),ce.table&&(ne(ce,["tbody"]),delete Ne.tbody),d.TRUSTED_TYPES_POLICY){if(typeof d.TRUSTED_TYPES_POLICY.createHTML!="function")throw Gt('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof d.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Gt('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');L=d.TRUSTED_TYPES_POLICY,k=L.createHTML("")}else L===void 0&&(L=oa(S,s)),L!==null&&typeof k=="string"&&(k=L.createHTML(""));Fe&&Fe(d),_=d}},we=ne({},[...rn,...nn,...Vi]),rr=ne({},[...sn,...Zi]),Io=function(d){let I=O(d);(!I||!I.tagName)&&(I={namespaceURI:X,tagName:"template"});let F=_r(d.tagName),ke=_r(I.tagName);return U[d.namespaceURI]?d.namespaceURI===A?I.namespaceURI===E?F==="svg":I.namespaceURI===m?F==="svg"&&(ke==="annotation-xml"||wt[ke]):!!we[F]:d.namespaceURI===m?I.namespaceURI===E?F==="math":I.namespaceURI===A?F==="math"&&vt[ke]:!!rr[F]:d.namespaceURI===E?I.namespaceURI===A&&!vt[ke]||I.namespaceURI===m&&!wt[ke]?!1:!rr[F]&&(Ar[F]||!we[F]):!!(nt==="application/xhtml+xml"&&U[d.namespaceURI]):!1},rt=function(d){Ht(e.removed,{element:d});try{O(d).removeChild(d)}catch{M(d)}},ut=function(d,I){try{Ht(e.removed,{attribute:I.getAttributeNode(d),from:I})}catch{Ht(e.removed,{attribute:null,from:I})}if(I.removeAttribute(d),d==="is")if(Ae||Le)try{rt(I)}catch{}else try{I.setAttribute(d,"")}catch{}},An=function(d){let I=null,F=null;if(be)d="<remove></remove>"+d;else{let Se=tn(d,/^[\r\n\t ]+/);F=Se&&Se[0]}nt==="application/xhtml+xml"&&X===E&&(d='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+d+"</body></html>");let ke=L?L.createHTML(d):d;if(X===E)try{I=new b().parseFromString(ke,nt)}catch{}if(!I||!I.documentElement){I=y.createDocument(X,"template",null);try{I.documentElement.innerHTML=fe?k:ke}catch{}}let Oe=I.body||I.documentElement;return d&&F&&Oe.insertBefore(r.createTextNode(F),Oe.childNodes[0]||null),X===E?B.call(I,ue?"html":"body")[0]:ue?I.documentElement:Oe},Tn=function(d){return v.call(d.ownerDocument||d,d,c.SHOW_ELEMENT|c.SHOW_COMMENT|c.SHOW_TEXT|c.SHOW_PROCESSING_INSTRUCTION|c.SHOW_CDATA_SECTION,null)},Tr=function(d){return d instanceof h&&(typeof d.nodeName!="string"||typeof d.textContent!="string"||typeof d.removeChild!="function"||!(d.attributes instanceof u)||typeof d.removeAttribute!="function"||typeof d.setAttribute!="function"||typeof d.namespaceURI!="string"||typeof d.insertBefore!="function"||typeof d.hasChildNodes!="function")},En=function(d){return typeof l=="function"&&d instanceof l};function st(H,d,I){mr(H,F=>{F.call(e,d,I,_)})}let Cn=function(d){let I=null;if(st(J.beforeSanitizeElements,d,null),Tr(d))return rt(d),!0;let F=f(d.nodeName);if(st(J.uponSanitizeElement,d,{tagName:F,allowedTags:ce}),te&&d.hasChildNodes()&&!En(d.firstElementChild)&&Pe(/<[/\w!]/g,d.innerHTML)&&Pe(/<[/\w!]/g,d.textContent)||d.nodeType===Yt.progressingInstruction||te&&d.nodeType===Yt.comment&&Pe(/<[/\w]/g,d.data))return rt(d),!0;if(!($.tagCheck instanceof Function&&$.tagCheck(F))&&(!ce[F]||Ne[F])){if(!Ne[F]&&Ln(F)&&(oe.tagNameCheck instanceof RegExp&&Pe(oe.tagNameCheck,F)||oe.tagNameCheck instanceof Function&&oe.tagNameCheck(F)))return!1;if(Ce&&!T[F]){let ke=O(d)||d.parentNode,Oe=q(d)||d.childNodes;if(Oe&&ke){let Se=Oe.length;for(let Ge=Se-1;Ge>=0;--Ge){let ot=C(Oe[Ge],!0);ot.__removalCount=(d.__removalCount||0)+1,ke.insertBefore(ot,P(d))}}}return rt(d),!0}return d instanceof a&&!Io(d)||(F==="noscript"||F==="noembed"||F==="noframes")&&Pe(/<\/no(script|embed|frames)/i,d.innerHTML)?(rt(d),!0):(K&&d.nodeType===Yt.text&&(I=d.textContent,mr([ee,Te,Me],ke=>{I=Wt(I,ke," ")}),d.textContent!==I&&(Ht(e.removed,{element:d.cloneNode()}),d.textContent=I)),st(J.afterSanitizeElements,d,null),!1)},Rn=function(d,I,F){if(We&&(I==="id"||I==="name")&&(F in r||F in Z))return!1;if(!(z&&!Ye[I]&&Pe(Ee,I))){if(!(R&&Pe(Ve,I))){if(!($.attributeCheck instanceof Function&&$.attributeCheck(I,d))){if(!de[I]||Ye[I]){if(!(Ln(d)&&(oe.tagNameCheck instanceof RegExp&&Pe(oe.tagNameCheck,d)||oe.tagNameCheck instanceof Function&&oe.tagNameCheck(d))&&(oe.attributeNameCheck instanceof RegExp&&Pe(oe.attributeNameCheck,I)||oe.attributeNameCheck instanceof Function&&oe.attributeNameCheck(I,d))||I==="is"&&oe.allowCustomizedBuiltInElements&&(oe.tagNameCheck instanceof RegExp&&Pe(oe.tagNameCheck,F)||oe.tagNameCheck instanceof Function&&oe.tagNameCheck(F))))return!1}else if(!N[I]){if(!Pe(Ue,Wt(F,he,""))){if(!((I==="src"||I==="xlink:href"||I==="href")&&d!=="script"&&Wi(F,"data:")===0&&V[d])){if(!(Y&&!Pe(ze,Wt(F,he,"")))){if(F)return!1}}}}}}}return!0},Ln=function(d){return d!=="annotation-xml"&&tn(d,xe)},In=function(d){st(J.beforeSanitizeAttributes,d,null);let{attributes:I}=d;if(!I||Tr(d))return;let F={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:de,forceKeepAttr:void 0},ke=I.length;for(;ke--;){let Oe=I[ke],{name:Se,namespaceURI:Ge,value:ot}=Oe,$t=f(Se),Er=ot,De=Se==="value"?Er:Gi(Er);if(F.attrName=$t,F.attrValue=De,F.keepAttr=!0,F.forceKeepAttr=void 0,st(J.uponSanitizeAttribute,d,F),De=F.attrValue,Ze&&($t==="id"||$t==="name")&&(ut(Se,d),De=ge+De),te&&Pe(/((--!?|])>)|<\/(style|title|textarea)/i,De)){ut(Se,d);continue}if($t==="attributename"&&tn(De,"href")){ut(Se,d);continue}if(F.forceKeepAttr)continue;if(!F.keepAttr){ut(Se,d);continue}if(!me&&Pe(/\/>/i,De)){ut(Se,d);continue}K&&mr([ee,Te,Me],On=>{De=Wt(De,On," ")});let Dn=f(d.nodeName);if(!Rn(Dn,$t,De)){ut(Se,d);continue}if(L&&typeof S=="object"&&typeof S.getAttributeType=="function"&&!Ge)switch(S.getAttributeType(Dn,$t)){case"TrustedHTML":{De=L.createHTML(De);break}case"TrustedScriptURL":{De=L.createScriptURL(De);break}}if(De!==Er)try{Ge?d.setAttributeNS(Ge,Se,De):d.setAttribute(Se,De),Tr(d)?rt(d):Cs(e.removed)}catch{ut(Se,d)}}st(J.afterSanitizeAttributes,d,null)},Do=function H(d){let I=null,F=Tn(d);for(st(J.beforeSanitizeShadowDOM,d,null);I=F.nextNode();)st(J.uponSanitizeShadowNode,I,null),Cn(I),In(I),I.content instanceof o&&H(I.content);st(J.afterSanitizeShadowDOM,d,null)};return e.sanitize=function(H){let d=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},I=null,F=null,ke=null,Oe=null;if(fe=!H,fe&&(H="<!-->"),typeof H!="string"&&!En(H))if(typeof H.toString=="function"){if(H=H.toString(),typeof H!="string")throw Gt("dirty is not a string, aborting")}else throw Gt("toString is not a function");if(!e.isSupported)return H;if(ae||re(d),e.removed=[],typeof H=="string"&&(_e=!1),_e){if(H.nodeName){let ot=f(H.nodeName);if(!ce[ot]||Ne[ot])throw Gt("root node is forbidden and cannot be sanitized in-place")}}else if(H instanceof l)I=An("<!---->"),F=I.ownerDocument.importNode(H,!0),F.nodeType===Yt.element&&F.nodeName==="BODY"||F.nodeName==="HTML"?I=F:I.appendChild(F);else{if(!Ae&&!K&&!ue&&H.indexOf("<")===-1)return L&&ye?L.createHTML(H):H;if(I=An(H),!I)return Ae?null:ye?k:""}I&&be&&rt(I.firstChild);let Se=Tn(_e?H:I);for(;ke=Se.nextNode();)Cn(ke),In(ke),ke.content instanceof o&&Do(ke.content);if(_e)return H;if(Ae){if(Le)for(Oe=x.call(I.ownerDocument);I.firstChild;)Oe.appendChild(I.firstChild);else Oe=I;return(de.shadowroot||de.shadowrootmode)&&(Oe=j.call(n,Oe,!0)),Oe}let Ge=ue?I.outerHTML:I.innerHTML;return ue&&ce["!doctype"]&&I.ownerDocument&&I.ownerDocument.doctype&&I.ownerDocument.doctype.name&&Pe(Fs,I.ownerDocument.doctype.name)&&(Ge="<!DOCTYPE "+I.ownerDocument.doctype.name+`>
`+Ge),K&&mr([ee,Te,Me],ot=>{Ge=Wt(Ge,ot," ")}),L&&ye?L.createHTML(Ge):Ge},e.setConfig=function(){let H=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};re(H),ae=!0},e.clearConfig=function(){_=null,ae=!1},e.isValidAttribute=function(H,d,I){_||re({});let F=f(H),ke=f(d);return Rn(F,ke,I)},e.addHook=function(H,d){typeof d=="function"&&Ht(J[H],d)},e.removeHook=function(H,d){if(d!==void 0){let I=Ui(J[H],d);return I===-1?void 0:Hi(J[H],I,1)[0]}return Cs(J[H])},e.removeHooks=function(H){J[H]=[]},e.removeAllHooks=function(){J=Ms()},e}var qs=Bs();var zs={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Us=t=>(...e)=>({_$litDirective$:t,values:e}),br=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,r,n){this._$Ct=e,this._$AM=r,this._$Ci=n}_$AS(e,r){return this.update(e,r)}update(e,r){return this.render(...r)}};var Vt=class extends br{constructor(e){if(super(e),this.it=$e,e.type!==zs.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===$e||e==null)return this._t=void 0,this.it=e;if(e===mt)return e;if(typeof e!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;let r=[e];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}};Vt.directiveName="unsafeHTML",Vt.resultType=1;var Hs=Us(Vt);function fn(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var kt=fn();function Ks(t){kt=t}var Qt={exec:()=>null};function se(t,e=""){let r=typeof t=="string"?t:t.source,n={replace:(s,o)=>{let i=typeof o=="string"?o:o.source;return i=i.replace(qe.caret,"$1"),r=r.replace(s,i),n},getRegex:()=>new RegExp(r,e)};return n}var ia=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),qe={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:t=>new RegExp(`^( {0,3}${t})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}#`),htmlBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}<(?:[a-z].*>|!--)`,"i")},aa=/^(?:[ \t]*(?:\n|$))+/,la=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,ca=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,Jt=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,da=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,hn=/(?:[*+-]|\d{1,9}[.)])/,Xs=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Qs=se(Xs).replace(/bull/g,hn).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),ua=se(Xs).replace(/bull/g,hn).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),mn=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,pa=/^[^\n]+/,gn=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,fa=se(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",gn).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),ha=se(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,hn).getRegex(),xr="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",_n=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,ma=se("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",_n).replace("tag",xr).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Js=se(mn).replace("hr",Jt).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",xr).getRegex(),ga=se(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Js).getRegex(),bn={blockquote:ga,code:la,def:fa,fences:ca,heading:da,hr:Jt,html:ma,lheading:Qs,list:ha,newline:aa,paragraph:Js,table:Qt,text:pa},Ws=se("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",Jt).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",xr).getRegex(),_a={...bn,lheading:ua,table:Ws,paragraph:se(mn).replace("hr",Jt).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Ws).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",xr).getRegex()},ba={...bn,html:se(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",_n).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Qt,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:se(mn).replace("hr",Jt).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Qs).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},ya=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,ka=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,eo=/^( {2,}|\\)\n(?!\s*$)/,wa=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Sr=/[\p{P}\p{S}]/u,yn=/[\s\p{P}\p{S}]/u,to=/[^\s\p{P}\p{S}]/u,va=se(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,yn).getRegex(),ro=/(?!~)[\p{P}\p{S}]/u,$a=/(?!~)[\s\p{P}\p{S}]/u,xa=/(?:[^\s\p{P}\p{S}]|~)/u,Sa=se(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",ia?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),no=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,Aa=se(no,"u").replace(/punct/g,Sr).getRegex(),Ta=se(no,"u").replace(/punct/g,ro).getRegex(),so="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Ea=se(so,"gu").replace(/notPunctSpace/g,to).replace(/punctSpace/g,yn).replace(/punct/g,Sr).getRegex(),Ca=se(so,"gu").replace(/notPunctSpace/g,xa).replace(/punctSpace/g,$a).replace(/punct/g,ro).getRegex(),Ra=se("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,to).replace(/punctSpace/g,yn).replace(/punct/g,Sr).getRegex(),La=se(/\\(punct)/,"gu").replace(/punct/g,Sr).getRegex(),Ia=se(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Da=se(_n).replace("(?:-->|$)","-->").getRegex(),Oa=se("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Da).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),wr=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,Ma=se(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",wr).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),oo=se(/^!?\[(label)\]\[(ref)\]/).replace("label",wr).replace("ref",gn).getRegex(),io=se(/^!?\[(ref)\](?:\[\])?/).replace("ref",gn).getRegex(),Na=se("reflink|nolink(?!\\()","g").replace("reflink",oo).replace("nolink",io).getRegex(),Gs=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,kn={_backpedal:Qt,anyPunctuation:La,autolink:Ia,blockSkip:Sa,br:eo,code:ka,del:Qt,emStrongLDelim:Aa,emStrongRDelimAst:Ea,emStrongRDelimUnd:Ra,escape:ya,link:Ma,nolink:io,punctuation:va,reflink:oo,reflinkSearch:Na,tag:Oa,text:wa,url:Qt},Pa={...kn,link:se(/^!?\[(label)\]\((.*?)\)/).replace("label",wr).getRegex(),reflink:se(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",wr).getRegex()},dn={...kn,emStrongRDelimAst:Ca,emStrongLDelim:Ta,url:se(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",Gs).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:se(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",Gs).getRegex()},Fa={...dn,br:se(eo).replace("{2,}","*").getRegex(),text:se(dn.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},yr={normal:bn,gfm:_a,pedantic:ba},Zt={normal:kn,gfm:dn,breaks:Fa,pedantic:Pa},Ba={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},js=t=>Ba[t];function at(t,e){if(e){if(qe.escapeTest.test(t))return t.replace(qe.escapeReplace,js)}else if(qe.escapeTestNoEncode.test(t))return t.replace(qe.escapeReplaceNoEncode,js);return t}function Ys(t){try{t=encodeURI(t).replace(qe.percentDecode,"%")}catch{return null}return t}function Vs(t,e){let r=t.replace(qe.findPipe,(o,i,l)=>{let a=!1,c=i;for(;--c>=0&&l[c]==="\\";)a=!a;return a?"|":" |"}),n=r.split(qe.splitPipe),s=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),e)if(n.length>e)n.splice(e);else for(;n.length<e;)n.push("");for(;s<n.length;s++)n[s]=n[s].trim().replace(qe.slashPipe,"|");return n}function Kt(t,e,r){let n=t.length;if(n===0)return"";let s=0;for(;s<n;){let o=t.charAt(n-s-1);if(o===e&&!r)s++;else if(o!==e&&r)s++;else break}return t.slice(0,n-s)}function qa(t,e){if(t.indexOf(e[1])===-1)return-1;let r=0;for(let n=0;n<t.length;n++)if(t[n]==="\\")n++;else if(t[n]===e[0])r++;else if(t[n]===e[1]&&(r--,r<0))return n;return r>0?-2:-1}function Zs(t,e,r,n,s){let o=e.href,i=e.title||null,l=t[1].replace(s.other.outputLinkReplace,"$1");n.state.inLink=!0;let a={type:t[0].charAt(0)==="!"?"image":"link",raw:r,href:o,title:i,text:l,tokens:n.inlineTokens(l)};return n.state.inLink=!1,a}function za(t,e,r){let n=t.match(r.other.indentCodeCompensation);if(n===null)return e;let s=n[1];return e.split(`
`).map(o=>{let i=o.match(r.other.beginningSpace);if(i===null)return o;let[l]=i;return l.length>=s.length?o.slice(s.length):o}).join(`
`)}var vr=class{constructor(t){pe(this,"options");pe(this,"rules");pe(this,"lexer");this.options=t||kt}space(t){let e=this.rules.block.newline.exec(t);if(e&&e[0].length>0)return{type:"space",raw:e[0]}}code(t){let e=this.rules.block.code.exec(t);if(e){let r=e[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:e[0],codeBlockStyle:"indented",text:this.options.pedantic?r:Kt(r,`
`)}}}fences(t){let e=this.rules.block.fences.exec(t);if(e){let r=e[0],n=za(r,e[3]||"",this.rules);return{type:"code",raw:r,lang:e[2]?e[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):e[2],text:n}}}heading(t){let e=this.rules.block.heading.exec(t);if(e){let r=e[2].trim();if(this.rules.other.endingHash.test(r)){let n=Kt(r,"#");(this.options.pedantic||!n||this.rules.other.endingSpaceChar.test(n))&&(r=n.trim())}return{type:"heading",raw:e[0],depth:e[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(t){let e=this.rules.block.hr.exec(t);if(e)return{type:"hr",raw:Kt(e[0],`
`)}}blockquote(t){let e=this.rules.block.blockquote.exec(t);if(e){let r=Kt(e[0],`
`).split(`
`),n="",s="",o=[];for(;r.length>0;){let i=!1,l=[],a;for(a=0;a<r.length;a++)if(this.rules.other.blockquoteStart.test(r[a]))l.push(r[a]),i=!0;else if(!i)l.push(r[a]);else break;r=r.slice(a);let c=l.join(`
`),u=c.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");n=n?`${n}
${c}`:c,s=s?`${s}
${u}`:u;let h=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(u,o,!0),this.lexer.state.top=h,r.length===0)break;let b=o.at(-1);if(b?.type==="code")break;if(b?.type==="blockquote"){let S=b,w=S.raw+`
`+r.join(`
`),C=this.blockquote(w);o[o.length-1]=C,n=n.substring(0,n.length-S.raw.length)+C.raw,s=s.substring(0,s.length-S.text.length)+C.text;break}else if(b?.type==="list"){let S=b,w=S.raw+`
`+r.join(`
`),C=this.list(w);o[o.length-1]=C,n=n.substring(0,n.length-b.raw.length)+C.raw,s=s.substring(0,s.length-S.raw.length)+C.raw,r=w.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:n,tokens:o,text:s}}}list(t){let e=this.rules.block.list.exec(t);if(e){let r=e[1].trim(),n=r.length>1,s={type:"list",raw:"",ordered:n,start:n?+r.slice(0,-1):"",loose:!1,items:[]};r=n?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=n?r:"[*+-]");let o=this.rules.other.listItemRegex(r),i=!1;for(;t;){let a=!1,c="",u="";if(!(e=o.exec(t))||this.rules.block.hr.test(t))break;c=e[0],t=t.substring(c.length);let h=e[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,C=>" ".repeat(3*C.length)),b=t.split(`
`,1)[0],S=!h.trim(),w=0;if(this.options.pedantic?(w=2,u=h.trimStart()):S?w=e[1].length+1:(w=e[2].search(this.rules.other.nonSpaceChar),w=w>4?1:w,u=h.slice(w),w+=e[1].length),S&&this.rules.other.blankLine.test(b)&&(c+=b+`
`,t=t.substring(b.length+1),a=!0),!a){let C=this.rules.other.nextBulletRegex(w),M=this.rules.other.hrRegex(w),P=this.rules.other.fencesBeginRegex(w),q=this.rules.other.headingBeginRegex(w),O=this.rules.other.htmlBeginRegex(w);for(;t;){let L=t.split(`
`,1)[0],k;if(b=L,this.options.pedantic?(b=b.replace(this.rules.other.listReplaceNesting,"  "),k=b):k=b.replace(this.rules.other.tabCharGlobal,"    "),P.test(b)||q.test(b)||O.test(b)||C.test(b)||M.test(b))break;if(k.search(this.rules.other.nonSpaceChar)>=w||!b.trim())u+=`
`+k.slice(w);else{if(S||h.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||P.test(h)||q.test(h)||M.test(h))break;u+=`
`+b}!S&&!b.trim()&&(S=!0),c+=L+`
`,t=t.substring(L.length+1),h=k.slice(w)}}s.loose||(i?s.loose=!0:this.rules.other.doubleBlankLine.test(c)&&(i=!0)),s.items.push({type:"list_item",raw:c,task:!!this.options.gfm&&this.rules.other.listIsTask.test(u),loose:!1,text:u,tokens:[]}),s.raw+=c}let l=s.items.at(-1);if(l)l.raw=l.raw.trimEnd(),l.text=l.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let a of s.items){if(this.lexer.state.top=!1,a.tokens=this.lexer.blockTokens(a.text,[]),a.task){if(a.text=a.text.replace(this.rules.other.listReplaceTask,""),a.tokens[0]?.type==="text"||a.tokens[0]?.type==="paragraph"){a.tokens[0].raw=a.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),a.tokens[0].text=a.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let u=this.lexer.inlineQueue.length-1;u>=0;u--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[u].src)){this.lexer.inlineQueue[u].src=this.lexer.inlineQueue[u].src.replace(this.rules.other.listReplaceTask,"");break}}let c=this.rules.other.listTaskCheckbox.exec(a.raw);if(c){let u={type:"checkbox",raw:c[0]+" ",checked:c[0]!=="[ ]"};a.checked=u.checked,s.loose?a.tokens[0]&&["paragraph","text"].includes(a.tokens[0].type)&&"tokens"in a.tokens[0]&&a.tokens[0].tokens?(a.tokens[0].raw=u.raw+a.tokens[0].raw,a.tokens[0].text=u.raw+a.tokens[0].text,a.tokens[0].tokens.unshift(u)):a.tokens.unshift({type:"paragraph",raw:u.raw,text:u.raw,tokens:[u]}):a.tokens.unshift(u)}}if(!s.loose){let c=a.tokens.filter(h=>h.type==="space"),u=c.length>0&&c.some(h=>this.rules.other.anyLine.test(h.raw));s.loose=u}}if(s.loose)for(let a of s.items){a.loose=!0;for(let c of a.tokens)c.type==="text"&&(c.type="paragraph")}return s}}html(t){let e=this.rules.block.html.exec(t);if(e)return{type:"html",block:!0,raw:e[0],pre:e[1]==="pre"||e[1]==="script"||e[1]==="style",text:e[0]}}def(t){let e=this.rules.block.def.exec(t);if(e){let r=e[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),n=e[2]?e[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=e[3]?e[3].substring(1,e[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):e[3];return{type:"def",tag:r,raw:e[0],href:n,title:s}}}table(t){let e=this.rules.block.table.exec(t);if(!e||!this.rules.other.tableDelimiter.test(e[2]))return;let r=Vs(e[1]),n=e[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=e[3]?.trim()?e[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:e[0],header:[],align:[],rows:[]};if(r.length===n.length){for(let i of n)this.rules.other.tableAlignRight.test(i)?o.align.push("right"):this.rules.other.tableAlignCenter.test(i)?o.align.push("center"):this.rules.other.tableAlignLeft.test(i)?o.align.push("left"):o.align.push(null);for(let i=0;i<r.length;i++)o.header.push({text:r[i],tokens:this.lexer.inline(r[i]),header:!0,align:o.align[i]});for(let i of s)o.rows.push(Vs(i,o.header.length).map((l,a)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:o.align[a]})));return o}}lheading(t){let e=this.rules.block.lheading.exec(t);if(e)return{type:"heading",raw:e[0],depth:e[2].charAt(0)==="="?1:2,text:e[1],tokens:this.lexer.inline(e[1])}}paragraph(t){let e=this.rules.block.paragraph.exec(t);if(e){let r=e[1].charAt(e[1].length-1)===`
`?e[1].slice(0,-1):e[1];return{type:"paragraph",raw:e[0],text:r,tokens:this.lexer.inline(r)}}}text(t){let e=this.rules.block.text.exec(t);if(e)return{type:"text",raw:e[0],text:e[0],tokens:this.lexer.inline(e[0])}}escape(t){let e=this.rules.inline.escape.exec(t);if(e)return{type:"escape",raw:e[0],text:e[1]}}tag(t){let e=this.rules.inline.tag.exec(t);if(e)return!this.lexer.state.inLink&&this.rules.other.startATag.test(e[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(e[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(e[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(e[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:e[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:e[0]}}link(t){let e=this.rules.inline.link.exec(t);if(e){let r=e[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;let o=Kt(r.slice(0,-1),"\\");if((r.length-o.length)%2===0)return}else{let o=qa(e[2],"()");if(o===-2)return;if(o>-1){let i=(e[0].indexOf("!")===0?5:4)+e[1].length+o;e[2]=e[2].substring(0,o),e[0]=e[0].substring(0,i).trim(),e[3]=""}}let n=e[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(n);o&&(n=o[1],s=o[3])}else s=e[3]?e[3].slice(1,-1):"";return n=n.trim(),this.rules.other.startAngleBracket.test(n)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?n=n.slice(1):n=n.slice(1,-1)),Zs(e,{href:n&&n.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},e[0],this.lexer,this.rules)}}reflink(t,e){let r;if((r=this.rules.inline.reflink.exec(t))||(r=this.rules.inline.nolink.exec(t))){let n=(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=e[n.toLowerCase()];if(!s){let o=r[0].charAt(0);return{type:"text",raw:o,text:o}}return Zs(r,s,r[0],this.lexer,this.rules)}}emStrong(t,e,r=""){let n=this.rules.inline.emStrongLDelim.exec(t);if(!(!n||n[3]&&r.match(this.rules.other.unicodeAlphaNumeric))&&(!(n[1]||n[2])||!r||this.rules.inline.punctuation.exec(r))){let s=[...n[0]].length-1,o,i,l=s,a=0,c=n[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(c.lastIndex=0,e=e.slice(-1*t.length+s);(n=c.exec(e))!=null;){if(o=n[1]||n[2]||n[3]||n[4]||n[5]||n[6],!o)continue;if(i=[...o].length,n[3]||n[4]){l+=i;continue}else if((n[5]||n[6])&&s%3&&!((s+i)%3)){a+=i;continue}if(l-=i,l>0)continue;i=Math.min(i,i+l+a);let u=[...n[0]][0].length,h=t.slice(0,s+n.index+u+i);if(Math.min(s,i)%2){let S=h.slice(1,-1);return{type:"em",raw:h,text:S,tokens:this.lexer.inlineTokens(S)}}let b=h.slice(2,-2);return{type:"strong",raw:h,text:b,tokens:this.lexer.inlineTokens(b)}}}}codespan(t){let e=this.rules.inline.code.exec(t);if(e){let r=e[2].replace(this.rules.other.newLineCharGlobal," "),n=this.rules.other.nonSpaceChar.test(r),s=this.rules.other.startingSpaceChar.test(r)&&this.rules.other.endingSpaceChar.test(r);return n&&s&&(r=r.substring(1,r.length-1)),{type:"codespan",raw:e[0],text:r}}}br(t){let e=this.rules.inline.br.exec(t);if(e)return{type:"br",raw:e[0]}}del(t){let e=this.rules.inline.del.exec(t);if(e)return{type:"del",raw:e[0],text:e[2],tokens:this.lexer.inlineTokens(e[2])}}autolink(t){let e=this.rules.inline.autolink.exec(t);if(e){let r,n;return e[2]==="@"?(r=e[1],n="mailto:"+r):(r=e[1],n=r),{type:"link",raw:e[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}url(t){let e;if(e=this.rules.inline.url.exec(t)){let r,n;if(e[2]==="@")r=e[0],n="mailto:"+r;else{let s;do s=e[0],e[0]=this.rules.inline._backpedal.exec(e[0])?.[0]??"";while(s!==e[0]);r=e[0],e[1]==="www."?n="http://"+e[0]:n=e[0]}return{type:"link",raw:e[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(t){let e=this.rules.inline.text.exec(t);if(e){let r=this.lexer.state.inRawBlock;return{type:"text",raw:e[0],text:e[0],escaped:r}}}},Je=class un{constructor(e){pe(this,"tokens");pe(this,"options");pe(this,"state");pe(this,"inlineQueue");pe(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=e||kt,this.options.tokenizer=this.options.tokenizer||new vr,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let r={other:qe,block:yr.normal,inline:Zt.normal};this.options.pedantic?(r.block=yr.pedantic,r.inline=Zt.pedantic):this.options.gfm&&(r.block=yr.gfm,this.options.breaks?r.inline=Zt.breaks:r.inline=Zt.gfm),this.tokenizer.rules=r}static get rules(){return{block:yr,inline:Zt}}static lex(e,r){return new un(r).lex(e)}static lexInline(e,r){return new un(r).inlineTokens(e)}lex(e){e=e.replace(qe.carriageReturn,`
`),this.blockTokens(e,this.tokens);for(let r=0;r<this.inlineQueue.length;r++){let n=this.inlineQueue[r];this.inlineTokens(n.src,n.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(e,r=[],n=!1){for(this.options.pedantic&&(e=e.replace(qe.tabCharGlobal,"    ").replace(qe.spaceLine,""));e;){let s;if(this.options.extensions?.block?.some(i=>(s=i.call({lexer:this},e,r))?(e=e.substring(s.raw.length),r.push(s),!0):!1))continue;if(s=this.tokenizer.space(e)){e=e.substring(s.raw.length);let i=r.at(-1);s.raw.length===1&&i!==void 0?i.raw+=`
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
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):r.push(s);continue}if(e){let i="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(i);break}else throw new Error(i)}}return this.state.top=!0,r}inline(e,r=[]){return this.inlineQueue.push({src:e,tokens:r}),r}inlineTokens(e,r=[]){let n=e,s=null;if(this.tokens.links){let a=Object.keys(this.tokens.links);if(a.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(n))!=null;)a.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(n=n.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(n))!=null;)n=n.slice(0,s.index)+"++"+n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(n))!=null;)o=s[2]?s[2].length:0,n=n.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let i=!1,l="";for(;e;){i||(l=""),i=!1;let a;if(this.options.extensions?.inline?.some(u=>(a=u.call({lexer:this},e,r))?(e=e.substring(a.raw.length),r.push(a),!0):!1))continue;if(a=this.tokenizer.escape(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.tag(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.link(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(a.raw.length);let u=r.at(-1);a.type==="text"&&u?.type==="text"?(u.raw+=a.raw,u.text+=a.text):r.push(a);continue}if(a=this.tokenizer.emStrong(e,n,l)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.codespan(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.br(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.del(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.autolink(e)){e=e.substring(a.raw.length),r.push(a);continue}if(!this.state.inLink&&(a=this.tokenizer.url(e))){e=e.substring(a.raw.length),r.push(a);continue}let c=e;if(this.options.extensions?.startInline){let u=1/0,h=e.slice(1),b;this.options.extensions.startInline.forEach(S=>{b=S.call({lexer:this},h),typeof b=="number"&&b>=0&&(u=Math.min(u,b))}),u<1/0&&u>=0&&(c=e.substring(0,u+1))}if(a=this.tokenizer.inlineText(c)){e=e.substring(a.raw.length),a.raw.slice(-1)!=="_"&&(l=a.raw.slice(-1)),i=!0;let u=r.at(-1);u?.type==="text"?(u.raw+=a.raw,u.text+=a.text):r.push(a);continue}if(e){let u="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(u);break}else throw new Error(u)}}return r}},$r=class{constructor(t){pe(this,"options");pe(this,"parser");this.options=t||kt}space(t){return""}code({text:t,lang:e,escaped:r}){let n=(e||"").match(qe.notSpaceStart)?.[0],s=t.replace(qe.endingNewline,"")+`
`;return n?'<pre><code class="language-'+at(n)+'">'+(r?s:at(s,!0))+`</code></pre>
`:"<pre><code>"+(r?s:at(s,!0))+`</code></pre>
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
`}strong({tokens:t}){return`<strong>${this.parser.parseInline(t)}</strong>`}em({tokens:t}){return`<em>${this.parser.parseInline(t)}</em>`}codespan({text:t}){return`<code>${at(t,!0)}</code>`}br(t){return"<br>"}del({tokens:t}){return`<del>${this.parser.parseInline(t)}</del>`}link({href:t,title:e,tokens:r}){let n=this.parser.parseInline(r),s=Ys(t);if(s===null)return n;t=s;let o='<a href="'+t+'"';return e&&(o+=' title="'+at(e)+'"'),o+=">"+n+"</a>",o}image({href:t,title:e,text:r,tokens:n}){n&&(r=this.parser.parseInline(n,this.parser.textRenderer));let s=Ys(t);if(s===null)return at(r);t=s;let o=`<img src="${t}" alt="${r}"`;return e&&(o+=` title="${at(e)}"`),o+=">",o}text(t){return"tokens"in t&&t.tokens?this.parser.parseInline(t.tokens):"escaped"in t&&t.escaped?t.text:at(t.text)}},wn=class{strong({text:t}){return t}em({text:t}){return t}codespan({text:t}){return t}del({text:t}){return t}html({text:t}){return t}text({text:t}){return t}link({text:t}){return""+t}image({text:t}){return""+t}br(){return""}checkbox({raw:t}){return t}},et=class pn{constructor(e){pe(this,"options");pe(this,"renderer");pe(this,"textRenderer");this.options=e||kt,this.options.renderer=this.options.renderer||new $r,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new wn}static parse(e,r){return new pn(r).parse(e)}static parseInline(e,r){return new pn(r).parseInline(e)}parse(e){let r="";for(let n=0;n<e.length;n++){let s=e[n];if(this.options.extensions?.renderers?.[s.type]){let i=s,l=this.options.extensions.renderers[i.type].call({parser:this},i);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(i.type)){r+=l||"";continue}}let o=s;switch(o.type){case"space":{r+=this.renderer.space(o);break}case"hr":{r+=this.renderer.hr(o);break}case"heading":{r+=this.renderer.heading(o);break}case"code":{r+=this.renderer.code(o);break}case"table":{r+=this.renderer.table(o);break}case"blockquote":{r+=this.renderer.blockquote(o);break}case"list":{r+=this.renderer.list(o);break}case"checkbox":{r+=this.renderer.checkbox(o);break}case"html":{r+=this.renderer.html(o);break}case"def":{r+=this.renderer.def(o);break}case"paragraph":{r+=this.renderer.paragraph(o);break}case"text":{r+=this.renderer.text(o);break}default:{let i='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return r}parseInline(e,r=this.renderer){let n="";for(let s=0;s<e.length;s++){let o=e[s];if(this.options.extensions?.renderers?.[o.type]){let l=this.options.extensions.renderers[o.type].call({parser:this},o);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){n+=l||"";continue}}let i=o;switch(i.type){case"escape":{n+=r.text(i);break}case"html":{n+=r.html(i);break}case"link":{n+=r.link(i);break}case"image":{n+=r.image(i);break}case"checkbox":{n+=r.checkbox(i);break}case"strong":{n+=r.strong(i);break}case"em":{n+=r.em(i);break}case"codespan":{n+=r.codespan(i);break}case"br":{n+=r.br(i);break}case"del":{n+=r.del(i);break}case"text":{n+=r.text(i);break}default:{let l='Token with "'+i.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return n}},kr,Xt=(kr=class{constructor(t){pe(this,"options");pe(this,"block");this.options=t||kt}preprocess(t){return t}postprocess(t){return t}processAllTokens(t){return t}emStrongMask(t){return t}provideLexer(){return this.block?Je.lex:Je.lexInline}provideParser(){return this.block?et.parse:et.parseInline}},pe(kr,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),pe(kr,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),kr),Ua=class{constructor(...t){pe(this,"defaults",fn());pe(this,"options",this.setOptions);pe(this,"parse",this.parseMarkdown(!0));pe(this,"parseInline",this.parseMarkdown(!1));pe(this,"Parser",et);pe(this,"Renderer",$r);pe(this,"TextRenderer",wn);pe(this,"Lexer",Je);pe(this,"Tokenizer",vr);pe(this,"Hooks",Xt);this.use(...t)}walkTokens(t,e){let r=[];for(let n of t)switch(r=r.concat(e.call(this,n)),n.type){case"table":{let s=n;for(let o of s.header)r=r.concat(this.walkTokens(o.tokens,e));for(let o of s.rows)for(let i of o)r=r.concat(this.walkTokens(i.tokens,e));break}case"list":{let s=n;r=r.concat(this.walkTokens(s.items,e));break}default:{let s=n;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let i=s[o].flat(1/0);r=r.concat(this.walkTokens(i,e))}):s.tokens&&(r=r.concat(this.walkTokens(s.tokens,e)))}}return r}use(...t){let e=this.defaults.extensions||{renderers:{},childTokens:{}};return t.forEach(r=>{let n={...r};if(n.async=this.defaults.async||n.async||!1,r.extensions&&(r.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=e.renderers[s.name];o?e.renderers[s.name]=function(...i){let l=s.renderer.apply(this,i);return l===!1&&(l=o.apply(this,i)),l}:e.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=e[s.level];o?o.unshift(s.tokenizer):e[s.level]=[s.tokenizer],s.start&&(s.level==="block"?e.startBlock?e.startBlock.push(s.start):e.startBlock=[s.start]:s.level==="inline"&&(e.startInline?e.startInline.push(s.start):e.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(e.childTokens[s.name]=s.childTokens)}),n.extensions=e),r.renderer){let s=this.defaults.renderer||new $r(this.defaults);for(let o in r.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let i=o,l=r.renderer[i],a=s[i];s[i]=(...c)=>{let u=l.apply(s,c);return u===!1&&(u=a.apply(s,c)),u||""}}n.renderer=s}if(r.tokenizer){let s=this.defaults.tokenizer||new vr(this.defaults);for(let o in r.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let i=o,l=r.tokenizer[i],a=s[i];s[i]=(...c)=>{let u=l.apply(s,c);return u===!1&&(u=a.apply(s,c)),u}}n.tokenizer=s}if(r.hooks){let s=this.defaults.hooks||new Xt;for(let o in r.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let i=o,l=r.hooks[i],a=s[i];Xt.passThroughHooks.has(o)?s[i]=c=>{if(this.defaults.async&&Xt.passThroughHooksRespectAsync.has(o))return(async()=>{let h=await l.call(s,c);return a.call(s,h)})();let u=l.call(s,c);return a.call(s,u)}:s[i]=(...c)=>{if(this.defaults.async)return(async()=>{let h=await l.apply(s,c);return h===!1&&(h=await a.apply(s,c)),h})();let u=l.apply(s,c);return u===!1&&(u=a.apply(s,c)),u}}n.hooks=s}if(r.walkTokens){let s=this.defaults.walkTokens,o=r.walkTokens;n.walkTokens=function(i){let l=[];return l.push(o.call(this,i)),s&&(l=l.concat(s.call(this,i))),l}}this.defaults={...this.defaults,...n}}),this}setOptions(t){return this.defaults={...this.defaults,...t},this}lexer(t,e){return Je.lex(t,e??this.defaults)}parser(t,e){return et.parse(t,e??this.defaults)}parseMarkdown(t){return(e,r)=>{let n={...r},s={...this.defaults,...n},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&n.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof e>"u"||e===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof e!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(e)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=t),s.async)return(async()=>{let i=s.hooks?await s.hooks.preprocess(e):e,l=await(s.hooks?await s.hooks.provideLexer():t?Je.lex:Je.lexInline)(i,s),a=s.hooks?await s.hooks.processAllTokens(l):l;s.walkTokens&&await Promise.all(this.walkTokens(a,s.walkTokens));let c=await(s.hooks?await s.hooks.provideParser():t?et.parse:et.parseInline)(a,s);return s.hooks?await s.hooks.postprocess(c):c})().catch(o);try{s.hooks&&(e=s.hooks.preprocess(e));let i=(s.hooks?s.hooks.provideLexer():t?Je.lex:Je.lexInline)(e,s);s.hooks&&(i=s.hooks.processAllTokens(i)),s.walkTokens&&this.walkTokens(i,s.walkTokens);let l=(s.hooks?s.hooks.provideParser():t?et.parse:et.parseInline)(i,s);return s.hooks&&(l=s.hooks.postprocess(l)),l}catch(i){return o(i)}}}onError(t,e){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,t){let n="<p>An error occurred:</p><pre>"+at(r.message+"",!0)+"</pre>";return e?Promise.resolve(n):n}if(e)return Promise.reject(r);throw r}}},yt=new Ua;function ie(t,e){return yt.parse(t,e)}ie.options=ie.setOptions=function(t){return yt.setOptions(t),ie.defaults=yt.defaults,Ks(ie.defaults),ie};ie.getDefaults=fn;ie.defaults=kt;ie.use=function(...t){return yt.use(...t),ie.defaults=yt.defaults,Ks(ie.defaults),ie};ie.walkTokens=function(t,e){return yt.walkTokens(t,e)};ie.parseInline=yt.parseInline;ie.Parser=et;ie.parser=et.parse;ie.Renderer=$r;ie.TextRenderer=wn;ie.Lexer=Je;ie.lexer=Je.lex;ie.Tokenizer=vr;ie.Hooks=Xt;ie.parse=ie;var Ic=ie.options,Dc=ie.setOptions,Oc=ie.use,Mc=ie.walkTokens,Nc=ie.parseInline;var Pc=et.parse,Fc=Je.lex;function ao(t){let e=ie.parse(t),r=qs.sanitize(e);return Hs(r)}function Ha(t){return String(t||"").replace(/^docs\/(superpowers\/)?/,"")}function lo(t,e){let r=e.getWorkspacePath,n=e.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",i="",l="";function a(w){w.key==="Escape"&&s&&(w.preventDefault(),b())}document.addEventListener("keydown",a);function c(){return s?p`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>b()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${Ha(s)}</span
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
            ${o==="loading"?p`<div class="mv__status">불러오는 중…</div>`:o==="error"?p`<div class="mv__status mv__status--error">
                    ${l||"\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}
                  </div>`:ao(i)}
          </div>
        </div>
      </div>
    `:p``}function u(){le(c(),t)}async function h(w){s=w,o="loading",i="",l="",u();let C=r?r():"";if(!C){o="error",l="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",u();return}if(!n){o="error",l="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",u();return}let M="/api/doc?workspace="+encodeURIComponent(C)+"&path="+encodeURIComponent(w);try{let P=await n(M),q=await P.json().catch(()=>({}));if(!P.ok||!q||q.ok!==!0){o="error",l="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(q&&q.error||P.status)+")",u();return}i=String(q.content||""),o="ready",u()}catch{o="error",l="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",u()}}function b(){s=null,le(p``,t)}function S(){document.removeEventListener("keydown",a),b()}return{open:h,close:b,destroy:S}}var Wa={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function Ga(t){if(typeof t!="number"||!Number.isFinite(t))return"";let e=new Date(t),r=String(e.getHours()).padStart(2,"0"),n=String(e.getMinutes()).padStart(2,"0");return`${r}:${n}`}function co(t,e={}){let r=Array.isArray(t)?t:[];if(r.length===0)return p`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let n=new Set;for(let o of r)o&&typeof o.resumed_from=="string"&&o.resumed_from.length>0&&n.add(o.resumed_from);let s=o=>{if(!(o.status==="failed"||o.status==="orphaned"))return"";let l=typeof o.session_id=="string"&&o.session_id.length>0,a=n.has(o.attempt_id),c=l&&!a,u=l?a?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return p`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${o.attempt_id}
      ?disabled=${!c}
      title=${u}
      @click=${h=>{h.stopPropagation(),c&&e.onResume&&e.onResume(o.attempt_id)}}
    >
      ↻ 이어하기
    </button>`};return p`
    <div class="detail-section-label">세션 이력</div>
    <div class="detail-sessions" data-seam="session-history">
      ${r.map(o=>p`<div class="detail-session-row">
            <button
              type="button"
              class="detail-session detail-session--${o.status||"unknown"}"
              data-attempt-id=${o.attempt_id}
              @click=${()=>e.onOpen&&e.onOpen(o.attempt_id)}
            >
              <span class="detail-session__glyph"
                >${Wa[o.status||""]||"\xB7"}</span
              >
              <span class="detail-session__id">${o.attempt_id}</span>
              ${o.resumed_from?p`<span
                    class="detail-session__resumed"
                    title=${`\uC774\uC5B4\uBC1B\uC740 \uC138\uC158 (from ${o.resumed_from})`}
                    >↻</span
                  >`:""}
              <span class="detail-session__meta"
                >${[o.runner,o.model].filter(Boolean).join(" \xB7 ")}</span
              >
              ${o.session_id?p`<span class="detail-session__sid" title=${o.session_id}
                    >${String(o.session_id).slice(0,8)}</span
                  >`:""}
              <span class="detail-session__time"
                >${Ga(o.started_at)}</span
              >
            </button>
            ${s(o)}
          </div>`)}
    </div>
  `}var ja=["open","in_progress","deferred","resolved","closed"],Ya=[0,1,2,3,4];function uo(t,e){let r=e.issueStores,n=e.onClose,s=e.transport,o=e.onNavigate,i=e.queueStore,l=e.sessionLogStore,a=null,c=null,u={},h=!1,b=!1,S="",w="",C="";function M(){h=!1,b=!1,S="",w="",C=""}let P=document.createElement("div");P.className="md-viewer-root",document.body.appendChild(P);let q=lo(P,{getWorkspacePath:e.getWorkspacePath||(()=>"")}),O=document.createElement("div");O.className="session-log-root",document.body.appendChild(O);let L=fr(O,{transport:s?(g,m)=>Promise.resolve(s(g,m)):void 0,sessionLogStore:l});function k(){if(!i||!a)return[];let g=i.get();return(g&&g.attempts?Object.values(g.attempts):[]).filter(A=>A&&A.bead_id===a).sort((A,E)=>(E.started_at||0)-(A.started_at||0)).map(A=>({attempt_id:A.attempt_id,bead_id:A.bead_id,status:A.status,started_at:typeof A.started_at=="number"?A.started_at:null,runner:A.runner||null,model:A.model||null,session_id:A.session_id||null,resumed_from:A.resumed_from||null}))}function y(g){let m=i?i.get():null,A=m&&m.attempts?m.attempts[g]:null;L.open({attempt_id:g,meta:A?{runner:A.runner||void 0,model:A.model||void 0,effort:A.effort||void 0,status:A.status||void 0,session_id:A.session_id||void 0}:{}})}async function v(g){if(!s||!g)return;let m=()=>{let E=i?i.get():null;return E&&typeof E.revision=="number"?E.revision:0},A=await s("worker-attempt-resume",{attempt_id:g,expected_revision:m()});if(A&&A.conflict){let E=A.queue&&typeof A.queue.revision=="number"?A.queue.revision:m();A=await s("worker-attempt-resume",{attempt_id:g,expected_revision:E})}A&&A.resumed===!1&&!A.conflict&&A.reason&&Q(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${A.reason}`,"error",2400)}let x={onOpen:y,onResume:v};function B(){let g=i?i.get():null,m=g&&g.exec_defaults;return m&&typeof m=="object"?m:{}}let j=null;r&&r.subscribe&&(j=r.subscribe(()=>Te()));let J=null;i&&typeof i.subscribe=="function"&&(J=i.subscribe(()=>{a&&N()}));function ee(g){g.key==="Escape"&&a&&(g.preventDefault(),n())}document.addEventListener("keydown",ee);function Te(){if(a){if(r&&typeof r.snapshotFor=="function"){let g=r.snapshotFor("detail:"+a)||[];c=g.find(A=>A&&A.id===a)||g[0]||c}N()}}function Me(g){It(g).then(m=>{m?Q("\uBCF5\uC0AC\uB428","success",1200):Q("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function Ee(g){g.preventDefault(),g.stopPropagation(),a&&Me(a)}function Ve(g,m){g.preventDefault(),g.stopPropagation(),Me(m)}function ze(g,m){g.preventDefault(),g.stopPropagation(),q.open(m)}function he(g,m){u[g]=m,N(),!(!s||!a)&&Promise.resolve(s("update-exec-settings",{id:a,key:g,value:m})).catch(()=>{Q("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}async function xe(g,m,A){if(!s||!a)return!1;try{let E=await Promise.resolve(s(g,m)),X=Array.isArray(E)?E[0]:E;return X&&typeof X=="object"&&X.id?(c=X,!0):(Q(A,"error"),!1)}catch{return Q(A,"error"),!1}}function Ue(g){setTimeout(()=>{try{let m=t.querySelector(g);m&&typeof m.focus=="function"&&m.focus()}catch{}},0)}function ce(){h=!0,S=c&&c.title||"",N(),Ue('.detail-edit__input[data-edit="title"]')}function tt(g){S=g.target.value}function de(){h=!1,S="",N()}function He(){xe("edit-text",{id:a,field:"title",value:S},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(m=>{m&&(h=!1,S=""),N()})}function oe(){b=!0,w=c&&c.description||"",N(),Ue('.detail-edit__textarea[data-edit="description"]')}function Ne(g){w=g.target.value}function Ye(){b=!1,w="",N()}function $(){xe("edit-text",{id:a,field:"description",value:w},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(m=>{m&&(b=!1,w=""),N()})}function R(g,m,A,E){if(g.key==="Escape"){g.stopPropagation(),A();return}g.key==="Enter"&&(!E||g.ctrlKey||g.metaKey)&&(g.preventDefault(),m())}function z(g){let m=g.target.value;xe("update-status",{id:a,status:m},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>N())}function Y(g){let m=Number(g.target.value);xe("update-priority",{id:a,priority:m},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>N())}function me(g){C=g.target.value}function K(){let g=C.trim();g.length!==0&&xe("label-add",{id:a,label:g},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(m=>{m&&(C=""),N()})}function te(g){if(g.key==="Escape"){g.stopPropagation(),C="",N();return}g.key==="Enter"&&(g.preventDefault(),K())}function ue(g){xe("label-remove",{id:a,label:g},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>N())}let ae={onCopyPath:Ve,onOpenDoc:ze},be={onChange:he};function Ae(g){return typeof g=="string"?g:g&&typeof g=="object"?String(g.id||g.to||g.issue_id||g.depends_on||""):""}function Le(g){switch(g&&typeof g=="object"?String(g.dependency_type||g.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function ye(g){let A=(Array.isArray(g.dependencies)?g.dependencies:[]).map(E=>({id:Ae(E),icon:Le(E)})).filter(E=>E.id.length>0);return p`
      <div class="detail-section-label">의존성</div>
      ${A.length===0?p`<div class="detail-empty">의존성 없음</div>`:p`<div class="detail-deps">
            ${A.map(E=>o?p`<button
                    type="button"
                    class="detail-dep detail-dep--link"
                    @click=${()=>o(E.id)}
                  >
                    ${E.icon?`${E.icon} `:""}${E.id}
                  </button>`:p`<span class="detail-dep"
                    >${E.icon?`${E.icon} `:""}${E.id}</span
                  >`)}
          </div>`}
    `}function We(g){let m=g.metadata||{},A=g.workflow||{},E=A.stages||{},X=E.spec&&E.spec.stale,fe=E.impl&&E.impl.stale,U=A.route_source==="derived",Ie=A.route||m.route||"\u2014";return p`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${U?" detail-kv__v--derived":""}"
          title=${U?"route \uCD94\uB860\uAC12 (metadata \uBBF8\uD540)":"route"}
          >${U&&A.route?`${Ie} ? (\uCD94\uB860)`:Ie}</span
        >
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">spec_review</span>
        <span class="detail-kv__v"
          >${m.spec_review||"\uC5C6\uC74C"}${X?" \xB7 stale":""}</span
        >
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">impl_review</span>
        <span class="detail-kv__v"
          >${m.impl_review||"\uC5C6\uC74C"}${fe?" \xB7 stale":""}</span
        >
      </div>
      ${m.pr_url?p`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${m.pr_url}</span>
          </div>`:""}
    `}let Ze={route:["spec_backed","full_plan"],merge_policy:["auto_merge","pr_stop"],drift_policy:["auto_rereview","halt"]};async function ge(g,m){let A=m.target.value;if(g==="route"&&c&&c.metadata&&c.metadata.route==="full_plan"&&A!=="full_plan"&&!window.confirm(`full_plan \u2192 ${A||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){N();return}await xe("update-workflow-meta",{id:a,key:g,value:A},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),N()}function Ce(g){let m=g.metadata||{},A=(E,X)=>{let fe=Ze[E],U=typeof m[E]=="string"?m[E]:"";return p`<div class="detail-kv">
        <span class="detail-kv__k">${E}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${E}
          data-edit=${`wfmeta-${E}`}
          @change=${Ie=>ge(E,Ie)}
        >
          <option value="" ?selected=${!fe.includes(U)}>
            ${X}
          </option>
          ${fe.map(Ie=>p`<option value=${Ie} ?selected=${U===Ie}>${Ie}</option>`)}
        </select>
      </div>`};return p`
      ${A("route","(\uBBF8\uC124\uC815 \xB7 \uCD94\uB860)")}
      ${A("merge_policy","(\uAE30\uBCF8 auto_merge)")}
      ${A("drift_policy","(\uAE30\uBCF8 auto_rereview)")}
    `}function _e(g){return h?p`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${S}
            @input=${tt}
            @keydown=${m=>R(m,He,de,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${He}
            >
              저장
            </button>
            <button
              type="button"
              class="detail-edit__cancel"
              data-edit="title-cancel"
              @click=${de}
            >
              취소
            </button>
          </div>
        </div>
      `:p`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${g}</h2>
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${ce}
        >
          ✎
        </button>
      </div>
    `}function Re(g){let m=Rt(g.created_at),A=Rt(g.updated_at);return!m&&!A?p``:p`
      ${m?p`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${m}</span>
          </div>`:""}
      ${A?p`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${A}</span>
          </div>`:""}
    `}function T(g,m){return p`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${z}
        >
          ${ja.map(A=>p`<option value=${A} ?selected=${A===g}>${A}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${Y}
        >
          ${Ya.map(A=>p`<option value=${String(A)} ?selected=${A===m}>
                P${A}
              </option>`)}
        </select>
      </div>
    `}function D(g){return p`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${b?"":p`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${oe}
            >
              ✎
            </button>`}
      </div>
      ${b?p`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${w}
              @input=${Ne}
              @keydown=${m=>R(m,$,Ye,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${$}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${Ye}
              >
                취소
              </button>
            </div>
          </div>`:p`<div class="detail-overlay__desc">
            ${g||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function V(g){let m=Array.isArray(g.labels)?g.labels:[];return p`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${m.map(A=>p`<span class="detail-label-chip"
              >${A}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${A}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+A}
                @click=${()=>ue(A)}
              >
                ×
              </button></span
            >`)}
        <span class="detail-label-add">
          <input
            class="detail-label-add__input"
            aria-label="라벨 추가"
            placeholder="라벨 추가"
            .value=${C}
            @input=${me}
            @keydown=${te}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${K}
          >
            추가
          </button>
        </span>
      </div>
    `}function G(){if(!a)return p``;let g=c||{},m=String(g.id||a),A=g.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",E=g.status||"open",X=typeof g.priority=="number"?Math.max(0,Math.min(4,g.priority)):"",fe=g.description||"",U={...g,metadata:{...g.metadata||{},...u}};return p`
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
            ${m}
          </button>
          ${_e(A)} ${T(E,X)}
          ${Re(g)} ${D(fe)}
          ${V(g)} ${ye(g)}
          ${We(g)} ${Ce(g)}
          ${As(g,ae)}
          ${Ts(U,be,B())}
          ${co(k(),x)}
        </div>
      </div>
    `}function N(){le(G(),t)}return{load(g){g!==a&&(u={},M()),a=g,c=null,Te()},clear(){a=null,c=null,u={},M(),q.close(),L.close(),le(p``,t)},destroy(){j&&(j(),j=null),J&&(J(),J=null),document.removeEventListener("keydown",ee),q.destroy(),P.parentNode&&P.parentNode.removeChild(P),L.destroy(),O.parentNode&&O.parentNode.removeChild(O),a=null,c=null,le(p``,t)}}}var Va=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function po(t,e){return Wr(t,e)?"shown":e.hidden_labels.includes(t)?"hidden_exact":"hidden_prefix"}function Za(t,e,r){if(!r)return{hidden_labels:e.hidden_labels.includes(t)?e.hidden_labels:[...e.hidden_labels,t],visible_labels:e.visible_labels.filter(o=>o!==t)};let n=e.hidden_labels.filter(o=>o!==t);return e.hidden_prefixes.some(o=>o.length>0&&t.startsWith(o))?{hidden_labels:n,visible_labels:e.visible_labels.includes(t)?e.visible_labels:[...e.visible_labels,t]}:{hidden_labels:n}}function fo(t,e){let{policyStore:r,transport:n,labelOptions:s}=e,o=document.createElement("dialog");o.id="display-settings-dialog",o.className="display-settings",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),t.appendChild(o);let i="";async function l(y){let v=r.get();if(v)try{let x=await n("display-policy-set",{expected_revision:v.revision,policy:y(v)});a(x),x&&x.conflict&&x.policy&&(x=await n("display-policy-set",{expected_revision:x.policy.revision,policy:y(x.policy)}),a(x)),x&&x.conflict&&Q("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC","error",4e3)}catch{Q("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function a(y){y&&y.policy&&typeof y.policy=="object"&&r.set(y.policy)}function c(y){let v=r.get();if(!v)return;let x=po(y,v)!=="shown";l(B=>Za(y,B,x))}function u(){let y=i.trim();y.length!==0&&(i="",l(v=>v.hidden_prefixes.includes(y)?{hidden_prefixes:v.hidden_prefixes}:{hidden_prefixes:[...v.hidden_prefixes,y]}),M())}function h(y){l(v=>({hidden_prefixes:v.hidden_prefixes.filter(x=>x!==y)}))}function b(y){let v=r.get();if(!v)return;let x=v.chips[y]===!1;l(()=>({chips:{[y]:x}}))}function S(y){let v=s();return p`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">라벨 표시</h3>
        <p class="display-settings__hint">
          라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을
          누르면 그 라벨만 예외로 다시 표시됩니다.
        </p>
        ${v.length===0?p`<div class="display-settings__empty">라벨 없음</div>`:p`<div class="display-settings__pills">
              ${v.map(x=>{let B=po(x,y);return p`<button
                  type="button"
                  class=${`display-settings__pill display-settings__pill--${B}`}
                  data-label=${x}
                  data-state=${B}
                  @click=${()=>c(x)}
                >
                  ${x}
                </button>`})}
            </div>`}
      </section>
    `}function w(y){return p`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">숨김 prefix</h3>
        <div class="display-settings__prefixes">
          ${y.hidden_prefixes.map(v=>p`<span class="display-settings__prefix">
                ${v}
                <button
                  type="button"
                  class="display-settings__prefix-remove"
                  aria-label=${`${v} \uADDC\uCE59 \uC81C\uAC70`}
                  @click=${()=>h(v)}
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
            @input=${v=>{i=String(v.target.value||"")}}
          />
          <button type="button" @click=${u}>추가</button>
        </div>
      </section>
    `}function C(y){return p`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">카드 표시 요소</h3>
        <div class="display-settings__toggles">
          ${Va.map(([v,x])=>p`<label class="display-settings__toggle">
                <input
                  type="checkbox"
                  data-chip=${v}
                  .checked=${y.chips[v]!==!1}
                  @change=${()=>b(v)}
                />
                <span>${x}</span>
              </label>`)}
        </div>
      </section>
    `}function M(){let y=r.get();le(p`
        <div class="display-settings__container">
          <header class="display-settings__header">
            <div class="display-settings__title">표시 설정</div>
            <button
              type="button"
              class="display-settings__close"
              aria-label="닫기"
              @click=${k}
            >
              ×
            </button>
          </header>
          <div class="display-settings__body">
            ${y?p`${S(y)} ${w(y)}
                ${C(y)}`:p`<div class="display-settings__empty">
                  표시 정책을 불러오는 중…
                </div>`}
          </div>
        </div>
      `,o)}let P=!1,q=()=>{P=!1};o.addEventListener("close",q),o.addEventListener("cancel",q);let O=null;r.subscribe&&(O=r.subscribe(()=>{P&&M()}));function L(){P||(i="",P=!0,M(),typeof o.showModal=="function"?o.showModal():o.setAttribute("open",""))}function k(){P&&(P=!1,typeof o.close=="function"?o.close():o.removeAttribute("open"))}return{open:L,close:k,destroy(){P=!1,o.removeEventListener("close",q),o.removeEventListener("cancel",q),O&&(O(),O=null),o.remove()}}}function ho(t){let e=document.createElement("dialog");e.id="fatal-error-dialog",e.setAttribute("role","alertdialog"),e.setAttribute("aria-modal","true"),e.innerHTML=`
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
    </div>`,t.appendChild(e);let r=e.querySelector("#fatal-error-title"),n=e.querySelector("#fatal-error-message"),s=e.querySelector("#fatal-error-detail"),o=e.querySelector("#fatal-error-reload"),i=e.querySelector("#fatal-error-close"),l=()=>{if(typeof e.close=="function")try{e.close()}catch{}e.removeAttribute("open")},a=(c,u,h="")=>{r&&(r.textContent=c||"Unexpected Error"),n&&(n.textContent=u||"An unrecoverable error occurred.");let b=typeof h=="string"?h.trim():"";if(s&&(b.length>0?(s.textContent=b,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof e.showModal=="function")try{e.showModal(),e.setAttribute("open","")}catch{e.setAttribute("open","")}else e.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),i&&i.addEventListener("click",()=>l()),e.addEventListener("cancel",c=>{c.preventDefault(),l()}),{open:a,close:l,getElement(){return e}}}function mo(t,e,r){let n=ve("views:nav"),s=null;function o(a){return c=>{c.preventDefault(),n("click tab %s",a),r.gotoView(a)}}function i(){let c=e.getState().view==="worker"?"worker":"board";return p`
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
    `}function l(){le(i(),t)}return l(),s=e.subscribe(()=>l()),{destroy(){s&&(s(),s=null),le(p``,t)}}}var go=["bug","feature","task","epic","chore"];function _o(t){switch((t||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var bo=["Critical","High","Medium","Low","Backlog"];function yo(t,e){let r=document.createElement("dialog");r.id="new-issue-dialog",r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true"),r.innerHTML=`
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
  `,t.appendChild(r);let n=r.querySelector("#new-issue-form"),s=r.querySelector("#new-title"),o=r.querySelector("#new-type"),i=r.querySelector("#new-priority"),l=r.querySelector("#new-labels"),a=r.querySelector("#new-description"),c=r.querySelector("#new-issue-error"),u=r.querySelector("#btn-cancel"),h=r.querySelector("#btn-create"),b=r.querySelector(".new-issue__close");function S(){o.replaceChildren();let k=document.createElement("option");k.value="",k.textContent="\u2014 Select \u2014",o.appendChild(k);for(let y of go){let v=document.createElement("option");v.value=y,v.textContent=_o(y),o.appendChild(v)}i.replaceChildren();for(let y=0;y<=4;y+=1){let v=document.createElement("option");v.value=String(y);let x=bo[y]||"Medium";v.textContent=`${y} \u2013 ${x}`,i.appendChild(v)}}S();function w(){try{typeof r.close=="function"?r.close():r.removeAttribute("open")}catch{r.removeAttribute("open")}}function C(k){s.disabled=k,o.disabled=k,i.disabled=k,l.disabled=k,a.disabled=k,u.disabled=k,h.disabled=k,h.textContent=k?"Creating\u2026":"Create"}function M(){c.textContent=""}function P(k){c.textContent=k}function q(){try{let k=window.localStorage.getItem("beads-ui.new.type");k?o.value=k:o.value="";let y=window.localStorage.getItem("beads-ui.new.priority");y&&/^\d$/.test(y)?i.value=y:i.value="2"}catch{o.value="",i.value="2"}}function O(){let k=o.value||"",y=i.value||"";k.length>0&&window.localStorage.setItem("beads-ui.new.type",k),y.length>0&&window.localStorage.setItem("beads-ui.new.priority",y)}async function L(){M();let k=String(s.value||"").trim();if(k.length===0){P("Title is required"),s.focus();return}let y=Number(i.value||"2");if(!(y>=0&&y<=4)){P("Priority must be 0..4"),i.focus();return}let v=String(o.value||""),x=String(a.value||""),B={title:k};v.length>0&&(B.type=v),String(y).length>0&&(B.priority=y),x.length>0&&(B.description=x),C(!0);try{await e("create-issue",B)}catch{C(!1),P("Failed to create issue");return}O(),C(!1),w()}return r.addEventListener("cancel",k=>{k.preventDefault(),w()}),b.addEventListener("click",()=>w()),u.addEventListener("click",()=>w()),r.addEventListener("keydown",k=>{k.key==="Enter"&&(k.ctrlKey||k.metaKey)&&(k.preventDefault(),L())}),n.addEventListener("submit",k=>{k.preventDefault(),L()}),{open(){n.reset(),M(),q();try{"showModal"in r&&typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")}catch{r.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){w()}}}var Ka=[{key:"orchestration_model",values:()=>Zr},{key:"orchestration_effort",values:()=>Kr},{key:"review_model",values:()=>Xr},{key:"impl_model",values:()=>Qr}],Xa=[{key:"merge_policy",values:["auto_merge","pr_stop"],default_label:"(\uAE30\uBCF8 auto_merge)"},{key:"drift_policy",values:["auto_rereview","halt"],default_label:"(\uAE30\uBCF8 auto_rereview)"}];function ko(t,e){let{queueStore:r,transport:n}=e,s=document.createElement("dialog");s.id="worker-exec-defaults-dialog",s.className="exec-defaults",s.setAttribute("role","dialog"),s.setAttribute("aria-modal","true"),t.appendChild(s);function o(){return r&&r.get()||{revision:0,exec_defaults:{}}}function i(){let O=o();return typeof O.revision=="number"?O.revision:0}function l(){let O=o().exec_defaults;return O&&typeof O=="object"?O:{}}function a(O){O&&O.queue&&r&&r.set(O.queue)}async function c(O,L){if(!n)return;let k={key:O,value:L||null};try{let y=await n("worker-queue-set-exec-default",{...k,expected_revision:i()});a(y),y&&y.conflict&&(y=await n("worker-queue-set-exec-default",{...k,expected_revision:i()}),a(y)),y&&y.conflict&&Q("\uC804\uC5ED \uC2E4\uD589 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC","error",4e3)}catch{Q("\uC804\uC5ED \uC2E4\uD589 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}async function u(O,L){if(!n)return;let k={key:O,value:L||null};try{let y=await n("worker-queue-set-policy",{...k,expected_revision:i()});a(y),y&&y.conflict&&(y=await n("worker-queue-set-policy",{...k,expected_revision:i()}),a(y)),y&&y.conflict&&Q("\uC804\uC5ED \uC815\uCC45 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC","error",4e3)}catch{Q("\uC804\uC5ED \uC815\uCC45 \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function h(O,L,k){let y=!!k&&!L.includes(k);return p`<div class="exec-defaults__row">
      <span class="exec-defaults__k">${O}</span>
      <select
        class="exec-defaults__sel"
        aria-label=${`\uC804\uC5ED ${O}`}
        data-key=${O}
        @change=${v=>{c(O,v.target.value)}}
      >
        <option value="" ?selected=${!k}>
          ${Jr[O]||"(\uAE30\uBCF8)"}
        </option>
        ${y?p`<option value=${k} ?selected=${!0}>
              ${k} (비호환)
            </option>`:""}
        ${L.map(v=>p`<option value=${v} ?selected=${k===v}>${v}</option>`)}
      </select>
    </div>`}function b(O,L){let k=typeof L[O.key]=="string"?L[O.key]:"";return p`<div class="exec-defaults__row">
      <span class="exec-defaults__k">${O.key}</span>
      <select
        class="exec-defaults__sel"
        aria-label=${`\uC804\uC5ED ${O.key}`}
        data-policy-key=${O.key}
        @change=${y=>{u(O.key,y.target.value)}}
      >
        <option value="" ?selected=${!O.values.includes(k)}>
          ${O.default_label}
        </option>
        ${O.values.map(y=>p`<option value=${y} ?selected=${k===y}>${y}</option>`)}
      </select>
    </div>`}function S(){let O=o(),L=l();le(p`
        <div class="exec-defaults__container">
          <header class="exec-defaults__header">
            <div class="exec-defaults__title">전역 실행 설정</div>
            <button
              type="button"
              class="exec-defaults__close"
              aria-label="닫기"
              @click=${q}
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
            ${Ka.map(k=>h(k.key,k.values(),L[k.key]||""))}
            <p class="exec-defaults__hint exec-defaults__hint--policy">
              전역 정책 (좁은 화면에서 상단 바 대신 여기서 편집)
            </p>
            ${Xa.map(k=>b(k,O))}
          </div>
        </div>
      `,s)}let w=!1,C=()=>{w=!1};s.addEventListener("close",C),s.addEventListener("cancel",C);let M=null;r&&r.subscribe&&(M=r.subscribe(()=>{w&&S()}));function P(){w||(w=!0,S(),typeof s.showModal=="function"?s.showModal():s.setAttribute("open",""))}function q(){w&&(w=!1,typeof s.close=="function"?s.close():s.removeAttribute("open"))}return{open:P,close:q,destroy(){w=!1,s.removeEventListener("close",C),s.removeEventListener("cancel",C),M&&(M(),M=null),s.remove()}}}function Qa(t){let e=t.draggable&&!t.done;return p`<div
    class="worker-mini${e?"":" worker-mini--static"}${t.done?" worker-mini--done":""}"
    draggable=${e?"true":"false"}
    data-bead-id=${t.id}
    data-lane=${t.lane}
  >
    ${e?p`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:""}
    <span class="worker-mini__id" title="클릭하면 ID 복사">${t.id}</span>
    <span class="worker-mini__title">${t.title}</span>
    ${t.reason?p`<span class="worker-mini__reason">${t.reason}</span>`:""}
  </div>`}function Ja(t){let e=t.draggable&&!t.done,r=t.workflow,n=r&&r.chips||{},s=n.route||r&&r.route,o=n.route_source==="derived"||!!(r&&r.route_source==="derived"),i=typeof t.reason=="string"&&t.reason.startsWith("\u26D4");return p`<div
    class="worker-card${e?"":" worker-card--static"}"
    draggable=${e?"true":"false"}
    data-bead-id=${t.id}
    data-lane=${t.lane}
  >
    <div class="worker-card__head">
      ${e?p`<span class="worker-card__grip" aria-hidden="true">⠿</span>`:""}
      <span class="worker-card__id" title="클릭하면 ID 복사">${t.id}</span>
      ${r&&s?p`<span
            class="ctl-chip ctl-chip--route${o?" is-derived":""}"
            title=${o?"route \uCD94\uB860\uAC12 (metadata \uBBF8\uD540)":"route"}
            >${o?`${s} ?`:s}</span
          >`:""}
    </div>
    <div class="worker-card__title">${t.title}</div>
    ${r?pr(r,t.status):""}
    ${t.reason?p`<div class="worker-card__foot">
          <span
            class="worker-card__reason${i?" worker-card__reason--danger":""}"
            >${t.reason}</span
          >
        </div>`:""}
  </div>`}function er(t){return p`<section
    class="worker-pane${t.src?" worker-pane--src":""}"
    id=${t.id}
    data-lane=${t.lane}
  >
    <header class="worker-pane__hd">
      <span class="worker-pane__title">${t.title}</span>
      <span class="worker-pane__count">${t.items.length}</span>
    </header>
    <div class="worker-pane__body">
      ${t.items.length===0?p`<div class="worker-pane__empty">${t.empty||""}</div>`:t.items.map(e=>t.lane==="candidate"?Ja(e):Qa(e))}
    </div>
  </section>`}function el(t){if(!Number.isFinite(t)||t<0)return"0s";let e=Math.floor(t/1e3),r=Math.floor(e/60),n=e%60;return r>0?`${r}m ${String(n).padStart(2,"0")}s`:`${n}s`}function wo(t){return p`<div class="worker-banners">
    ${t.autoAdvance?p`<div class="worker-banner worker-banner--on" role="status">
          ▶ 자동 진행 켜짐 — Serial head 1 + Parallel 슬롯까지 실행합니다.
        </div>`:p`<div class="worker-banner worker-banner--off" role="status">
          ⏸ 자동 진행 꺼짐 — 새 세션을 시작하지 않습니다. ▶로 재개.
        </div>`}
    ${t.breaker?p`<div class="worker-banner worker-banner--breaker" role="alert">
          ⛔ ${t.breaker.repo||"repo"} 세션 실패로 차단 —
          ${t.breaker.reason||""}. 신규 launch·머지 진입 차단, 수동 ▶
          필요.
          ${t.breaker.resume_attempt_id?p`<button
                type="button"
                class="worker-banner__resume"
                data-attempt-id=${t.breaker.resume_attempt_id}
                ?disabled=${!t.breaker.resume_eligible}
                title=${t.breaker.resume_eligible?"\uCD5C\uADFC \uC2E4\uD328 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":t.breaker.resume_reason||"\uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}
              >
                ↻ 이어하기
              </button>`:""}
        </div>`:""}
  </div>`}function tl(t,e,r=null){let n=t.lane==="serial"?"serial":"\u2225",s=!!t.paused,o=s?"\uC77C\uC2DC\uC815\uC9C0":typeof t.started_at=="number"?el(e-t.started_at):"\u2014",i=[t.runner,t.model].filter(Boolean).join(" \xB7 "),l=t.attempt_id&&t.attempt_id===r;return p`<div
    class="rtile${l?" rtile--sel":""}${s?" rtile--paused":""}"
    data-bead-id=${t.bead_id}
    data-attempt-id=${t.attempt_id||""}
  >
    <div class="rtile__hd">
      <span class="rtile__dot" aria-hidden="true"></span>
      <span class="rtile__id">${t.bead_id}</span>
      <span class="rtile__badge rtile__badge--${t.lane}">${n}</span>
      ${t.resumed_from?p`<span
            class="rtile__resumed"
            title=${`\uC774\uC5B4\uBC1B\uC740 \uC138\uC158 (from ${t.resumed_from})`}
            >↻</span
          >`:""}
      <span class="rtile__elapsed">${o}</span>
      <button
        type="button"
        class="rtile__info"
        title="상세 보기"
        aria-label="상세 보기"
      >
        ⓘ
      </button>
      ${s?p`<button
            type="button"
            class="rtile__resume"
            title="같은 세션으로 이어서 재개"
            aria-label="재개"
          >
            ▶
          </button>`:p`<button
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
    ${i?p`<div class="rtile__meta">${i}</div>`:""}
    ${t.merge_policy?p`<div class="rtile__meta rtile__meta--policy">
          ${t.merge_policy}${t.demoted_reason?p` <span
                class="rtile__demoted"
                title=${`\uAC15\uB4F1: ${t.demoted_reason}`}
                >⤵ ${t.demoted_reason}</span
              >`:""}
        </div>`:""}
  </div>`}function vo(t,e=Date.now(),r=null){let n=Array.isArray(t)?t:[];return p`<div class="worker-rungrid" id="worker-rungrid">
    ${n.length===0?p`<div class="worker-rungrid__empty">실행 세션 없음</div>`:n.map(s=>tl(s,e,r))}
  </div>`}var rl="tab:worker:ready",nl="tab:worker:blocked";function sl(t){let e=t&&t.metadata;return!!(e&&typeof e=="object"&&e.spec_id)}function ol(t){let e=t&&t.parent;return(typeof e=="string"?e.length>0:!!(e&&e.id))||/\.\d+$/.test(t&&t.id||"")}function il(t){let r=(Array.isArray(t?.dependencies)?t.dependencies:[]).map(n=>typeof n=="string"?n:n&&n.id).filter(Boolean);return r.length>0?`\u{1F512} ${r.join(", ")}`:"\u{1F512} blocked"}function vn(t,e={}){let{transport:r,issueStores:n,queueStore:s,sessionLogStore:o,uiOrderStore:i,gotoIssue:l}=e,a=n?cr(n,i):null,c=dr({transport:r,uiOrderStore:i}),u=null,h=[],b=[],S=document.createElement("div");S.className="worker-console";let w=document.createElement("div"),C=document.createElement("div");C.className="worker-drawer-host";let M=document.createElement("div");M.className="worker-lanes-host",S.append(w,C,M),t.appendChild(S);let P=null,q=fr(C,{transport:r,sessionLogStore:o,onClose:()=>{P=null,he()}}),O=ko(S,{queueStore:s,transport:r});function L(){return s&&s.get()||{revision:0,auto_advance:!1,serial:[],parallel:[],done:[]}}function k(){let $=L();return typeof $.revision=="number"?$.revision:0}function y($){$&&$.queue&&s&&s.set($.queue)}async function v($,R,z){if(!r)return;let Y=await r("worker-queue-place",{bead_id:$,lane:R,index:z,expected_revision:k()});y(Y),Y&&Y.conflict&&await r("worker-queue-place",{bead_id:$,lane:R,index:z,expected_revision:k()}).then(y)}async function x($,R,z){if(!r)return;let Y=await r("worker-queue-reorder",{bead_id:$,lane:R,to_index:z,expected_revision:k()});y(Y),Y&&Y.conflict&&await r("worker-queue-reorder",{bead_id:$,lane:R,to_index:z,expected_revision:k()}).then(y)}async function B($){if(!r)return;let R=await r("worker-queue-remove",{bead_id:$,expected_revision:k()});y(R),R&&R.conflict&&await r("worker-queue-remove",{bead_id:$,expected_revision:k()}).then(y)}async function j($){!r||!$||await r("worker-attempt-stop",{attempt_id:$})}async function J($){if(!r||!$)return;let R=await r("worker-attempt-pause",{attempt_id:$});R&&R.paused===!1&&R.reason&&Q(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${R.reason}`,"error",2400)}async function ee($){if(!r||!$)return;let R=await r("worker-attempt-resume",{attempt_id:$,expected_revision:k()});y(R),R&&R.conflict&&(R=await r("worker-attempt-resume",{attempt_id:$,expected_revision:k()}),y(R)),R&&R.resumed===!1&&!R.conflict&&R.reason&&Q(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${R.reason}`,"error",2400)}async function Te($){if(!r)return;let R=await r("worker-queue-toggle",{on:$,expected_revision:k()});y(R),R&&R.conflict&&await r("worker-queue-toggle",{on:$,expected_revision:k()}).then(y)}async function Me($,R){if(!r)return;let z={key:$,value:R||null},Y=await r("worker-queue-set-policy",{...z,expected_revision:k()});y(Y),Y&&Y.conflict&&await r("worker-queue-set-policy",{...z,expected_revision:k()}).then(y)}function Ee(){let $=L(),R=a?a.selectBoardColumn(rl,"ready"):[],z=a?a.selectBoardColumn(nl,"blocked"):[],Y=new Map;for(let m of[...R,...z])Y.set(m.id,m.title||m.id);let me=new Set([...$.serial.map(m=>m.bead_id),...$.parallel.map(m=>m.bead_id),...$.done.map(m=>m.bead_id)]),K=new Set(z.map(m=>m.id)),te=i?i.get()?.order||{}:{},ue=new Set,ae=[];for(let m of[...R,...z])me.has(m.id)||ue.has(m.id)||ol(m)||(ue.add(m.id),ae.push(m));ae.sort(ar(te)),h=ae;let be=$.admission||{},Ae=m=>be[m]?`\u26D4 ${be[m].reason}`:"",Le=ae.map(m=>{let A=sl(m),E=[];K.has(m.id)&&E.push(il(m)),A||E.push("spec \uC5C6\uC74C");let X=Ae(m.id);return X&&E.push(X),{id:m.id,title:m.title||m.id,reason:E.join(" \xB7 "),draggable:A,lane:"candidate",workflow:m.workflow,status:m.status}}),ye=(m,A)=>m.map(E=>({id:E.bead_id,title:Y.get(E.bead_id)||E.bead_id,reason:A==="done"?"":Ae(E.bead_id),draggable:A!=="done",done:A==="done",lane:A})),We=new Map;for(let m of $.serial||[])We.set(m.bead_id,"serial");for(let m of $.parallel||[])We.set(m.bead_id,"parallel");let Ze=$.attempts?Object.values($.attempts):[],ge=new Set;for(let m of Ze)m&&typeof m.resumed_from=="string"&&m.resumed_from.length>0&&ge.add(m.resumed_from);let Ce=[],_e=null;for(let m of Ze){let A=m.status==="paused"&&!ge.has(m.attempt_id);m.status==="running"||A?Ce.push({bead_id:m.bead_id,attempt_id:m.attempt_id,title:Y.get(m.bead_id)||m.bead_id,lane:We.get(m.bead_id)||"parallel",runner:m.runner||null,model:m.model||null,effort:m.effort||null,started_at:typeof m.started_at=="number"?m.started_at:null,merge_policy:m.merge_policy||null,demoted_reason:m.demoted_reason||null,resumed_from:m.resumed_from||null,paused:A,can_pause:typeof m.session_id=="string"&&m.session_id.length>0}):(m.status==="failed"||m.status==="orphaned")&&(_e=m)}let Re=null;if(_e){let m=typeof _e.session_id=="string"&&_e.session_id.length>0,A=ge.has(_e.attempt_id);Re={repo:_e.repo||"",reason:_e.cause||_e.status,resume_attempt_id:_e.attempt_id,resume_eligible:m&&!A,resume_reason:m?A?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}}let T=Ce.filter(m=>!m.paused),D=T.length,V=T.filter(m=>m.lane==="serial").length,G=D-V,N=($.workspace_info||{}).parallel_slots,g=V>1||typeof N=="number"&&G>N;return{queue:$,idToTitle:Y,candidates:Le,running:Ce,live_count:D,over_cap:g,breaker:Re,serial:ye($.serial,"serial"),parallel:ye($.parallel,"parallel"),done:ye($.done,"done")}}function Ve($){let R=$.serial.length>0?$.serial[0].id:"\u2014",z=$.queue.workspace_info||{},Y=z.verify_cmd&&Array.isArray(z.verify_cmd.cmd)?z.verify_cmd.cmd.join(" "):null,K=!!z.verify_cmd&&z.verify_cmd.source==="detected"?" (\uC790\uB3D9 \uAC10\uC9C0)":"",te=Y?`verify_cmd \u2014 \uC124\uC815 \uD30C\uC77C \uBA85\uC2DC > \uC790\uB3D9 \uAC10\uC9C0 > \uC5C6\uC74C, \uBBF8\uC124\uC815 \uC2DC auto_merge\uAC00 pr_stop\uC73C\uB85C \uAC15\uB4F1. \uC804\uCCB4 \uBA85\uB839: ${Y}${K}`:"verify_cmd \u2014 \uC124\uC815 \uD30C\uC77C \uBA85\uC2DC > \uC790\uB3D9 \uAC10\uC9C0 > \uC5C6\uC74C, \uBBF8\uC124\uC815 \uC2DC auto_merge\uAC00 pr_stop\uC73C\uB85C \uAC15\uB4F1",ue=(ae,be,Ae)=>{let Le=typeof $.queue[ae]=="string"?$.queue[ae]:"";return p`<label class="worker-policy">
        <span class="worker-policy__k">${ae}</span>
        <select
          class="worker-policy__sel"
          aria-label=${`\uC804\uC5ED ${ae}`}
          data-policy-key=${ae}
          @change=${ye=>{Me(ae,ye.target.value)}}
        >
          <option value="" ?selected=${!be.includes(Le)}>
            ${Ae}
          </option>
          ${be.map(ye=>p`<option value=${ye} ?selected=${Le===ye}>${ye}</option>`)}
        </select>
      </label>`};return p`<div class="worker-ctrl">
        <button
          type="button"
          class="worker-play${$.queue.auto_advance?" is-active":""}"
        >
          ▶ 자동 진행
        </button>
        <button type="button" class="worker-pause">⏸ 정지</button>
        <span class="worker-stat"
          >실행 <b>${$.live_count}</b> · serial 다음 <b>${R}</b></span
        >
        ${$.over_cap?p`<span
              class="worker-overcap"
              title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
              >cap 초과</span
            >`:""}
        <span class="worker-tgl"
          >parallel slot <b>${$.parallel.length}</b></span
        >
        ${ue("merge_policy",["auto_merge","pr_stop"],"(\uAE30\uBCF8 auto_merge)")}
        ${ue("drift_policy",["auto_rereview","halt"],"(\uAE30\uBCF8 auto_rereview)")}
        <button
          type="button"
          class="worker-exec-defaults-btn"
          aria-haspopup="dialog"
          aria-label="전역 실행 설정"
          title="전역 실행 설정"
        >
          ⚙
        </button>
        <span
          class="worker-verifycmd${Y?"":" worker-verifycmd--unset"}"
          title=${te}
        >
          ${Y?p`<span class="worker-verifycmd__full"
                  >verify_cmd:
                  <code>${Y}</code>${K}</span
                ><span class="worker-verifycmd__badge"
                  >verify_cmd ✓${K}</span
                >`:p`<span class="worker-verifycmd__full"
                  >verify_cmd: 미설정 (auto_merge→pr_stop 강등)</span
                ><span class="worker-verifycmd__badge"
                  >verify_cmd 미설정 ⤵pr_stop</span
                >`}</span
        >
      </div>
      ${wo({autoAdvance:!!$.queue.auto_advance,breaker:$.breaker})}
      ${vo($.running,Date.now(),P)}`}function ze($){return p`<div class="worker-lanes">
      ${er({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:$.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C"})}
      ${er({id:"worker-pane-serial",lane:"serial",title:"Serial \uD050",items:$.serial,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58"})}
      ${er({id:"worker-pane-parallel",lane:"parallel",title:"Parallel \uD480",items:$.parallel,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58"})}
      ${er({id:"worker-pane-done",lane:"done",title:`Done \xB7 \uC624\uB298 ${$.done.length}`,items:$.done,empty:"\uC644\uB8CC \uC5C6\uC74C"})}
    </div>`}function he(){let $=Ee();le(Ve($),w),le(ze($),M)}function xe($){let R=$.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!R)return;let z=R.dataset.beadId||"",Y=R.dataset.lane||"";u={bead_id:z,from_lane:Y};try{$.dataTransfer?.setData("text/plain",z),$.dataTransfer&&($.dataTransfer.effectAllowed="move")}catch{}}function Ue($){let R=$.target?.closest?.(".worker-pane");R&&($.preventDefault(),$.dataTransfer&&($.dataTransfer.dropEffect="move"),R.classList.add("worker-pane--drag-over"))}function ce($){$.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function tt($,R){let z=h.find(te=>te.id===$);if(!z)return;let Y=h.filter(te=>te.id!==$),me=Y.length;if(R){let te=R.dataset.beadId;if(te===$)return;let ue=Y.findIndex(ae=>ae.id===te);ue>=0&&(me=ue)}let K=Y.slice();K.splice(me,0,z),c.applyReorder($,K,me)}function de($){let R=$.target?.closest?.(".worker-pane");if(!R)return;$.preventDefault(),R.classList.remove("worker-pane--drag-over");let z=R.dataset.lane||"",Y=u?.bead_id||$.dataTransfer?.getData("text/plain")||"",me=u?.from_lane||"";if(u=null,!Y)return;let K=$.target?.closest?.(".worker-mini, .worker-card"),te=Array.from(R.querySelectorAll(".worker-mini, .worker-card")),ue=te.length;if(K){let ae=te.indexOf(K);ae>=0&&(ue=ae)}if(z==="candidate"){if(me==="candidate"){tt(Y,K);return}(me==="serial"||me==="parallel")&&B(Y);return}(z==="serial"||z==="parallel")&&(me===z?x(Y,z,ue):v(Y,z,ue))}function He($){return $?{runner:$.runner||void 0,model:$.model||void 0,effort:$.effort||void 0,worktree:$.worktree||void 0,status:$.status||void 0,session_id:$.session_id||void 0}:{}}function oe($){let R=L(),z=R.attempts?R.attempts[$]:null;P=$,q.open({attempt_id:$,meta:He(z)}),he()}function Ne(){if(!P)return;let $=L(),R=$.attempts?$.attempts[P]:null;R&&q.updateMeta(He(R))}function Ye($){let R=$.target;if(R?.closest?.("#worker-exec-defaults-dialog"))return;if(R?.closest?.(".worker-exec-defaults-btn")){O.open();return}let z=R?.closest?.(".worker-banner__resume");if(z){let K=z.dataset.attemptId;K&&ee(K);return}if(R?.closest?.(".worker-play")){Te(!0);return}if(R?.closest?.(".worker-pause")){Te(!1);return}if(R?.closest?.(".rtile__stop")){let te=R?.closest?.(".rtile")?.dataset?.attemptId;te&&j(te);return}if(R?.closest?.(".rtile__pause")){let te=R?.closest?.(".rtile")?.dataset?.attemptId;te&&J(te);return}if(R?.closest?.(".rtile__resume")){let te=R?.closest?.(".rtile")?.dataset?.attemptId;te&&ee(te);return}if(R?.closest?.(".rtile__info")){let te=R?.closest?.(".rtile")?.dataset?.beadId;te&&l&&l(te);return}if(R?.closest?.(".worker-drawer-host"))return;let Y=R?.closest?.(".rtile");if(Y){let K=Y.dataset.attemptId;K&&oe(K);return}let me=R?.closest?.(".worker-mini, .worker-card");if(me){let K=me.dataset.beadId;if(R?.closest?.(".worker-mini__id, .worker-card__id")){K&&It(K).then(te=>{te?Q("\uBCF5\uC0AC\uB428","success",1200):Q("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}K&&l&&l(K)}}return t.addEventListener("dragstart",xe),t.addEventListener("dragover",Ue),t.addEventListener("dragleave",ce),t.addEventListener("drop",de),t.addEventListener("click",Ye),a&&b.push(a.subscribe(he)),s&&b.push(s.subscribe(()=>{he(),Ne()})),he(),{load(){he()},destroy(){for(let $ of b.splice(0))try{$()}catch{}t.removeEventListener("dragstart",xe),t.removeEventListener("dragover",Ue),t.removeEventListener("dragleave",ce),t.removeEventListener("drop",de),t.removeEventListener("click",Ye);try{q.destroy()}catch{}try{O.destroy()}catch{}le(p``,t)}}}function $n(t){if(!t)return"Unknown";let e=t.split("/").filter(Boolean);return e.length>0?e[e.length-1]:"Unknown"}function $o(t,e,r,n=async()=>{},s=async()=>{}){let o=ve("views:workspace-picker"),i=null,l=!1,a=!1,c=!1;async function u(y){let x=y.target.value,j=e.getState().workspace?.current?.path||"";if(x&&x!==j){o("switching workspace to %s",x),l=!0,k();try{await r(x)}catch(J){o("workspace switch failed: %o",J)}finally{l=!1,k()}}}async function h(){let y=e.getState(),v=y.workspace?.current?.path||y.workspace?.available?.[0]?.path||"";if(!(!v||a)){o("git-pulling workspace %s",v),a=!0,k();try{await n(v)}catch(x){o("workspace git pull failed: %o",x)}finally{a=!1,k()}}}function b(y){let v=y.target;v&&t.contains(v)||C()}function S(y){y.key==="Escape"&&C()}function w(){c||(c=!0,document.addEventListener("mousedown",b),document.addEventListener("keydown",S),k())}function C(){c&&(c=!1,document.removeEventListener("mousedown",b),document.removeEventListener("keydown",S),k())}function M(){c?C():w()}async function P(y){let v=y.target,x=v.value,B=v.checked;o("toggling visibility %s \u2192 %s",x,String(B));try{await s(x,B)}catch(j){o("workspace visibility toggle failed: %o",j)}}function q(y){return y?p`
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
    `:p``}function O(y,v){return p`
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
        ${c?p`
              <div
                class="workspace-picker__manage-popover"
                role="menu"
                aria-label="프로젝트 표시 선택"
              >
                ${y.map(x=>p`
                    <label
                      class="workspace-picker__manage-row"
                      title="${x.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${x.path}"
                        .checked=${!v.has(x.path)}
                        @change=${P}
                      />
                      <span class="workspace-picker__manage-name"
                        >${$n(x.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function L(){let y=e.getState(),v=y.workspace?.current,x=y.workspace?.available||[],B=new Set(y.workspace?.hidden||[]),j=v?.path||x[0]?.path||"";if(x.length===0)return p``;let J=x.filter(ee=>!B.has(ee.path)||ee.path===j);if(J.length<=1){let ee=J[0]||x[0],Te=$n(ee.path);return p`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${ee.path}"
            >${Te}</span
          >
          ${O(x,B)}
          ${q(j)}
          ${a?p`<span
                class="workspace-picker__loading"
                aria-hidden="true"
              ></span>`:""}
        </div>
      `}return p`
      <div class="workspace-picker">
        <select
          class="workspace-picker__select"
          @change=${u}
          ?disabled=${l||a}
          aria-label="Select project workspace"
        >
          ${J.map(ee=>p`
              <option
                value="${ee.path}"
                ?selected=${ee.path===j}
                title="${ee.path}"
              >
                ${$n(ee.path)}
              </option>
            `)}
        </select>
        ${O(x,B)}
        ${q(j)}
        ${l||a?p`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function k(){le(L(),t)}return k(),i=e.subscribe(()=>k()),{destroy(){i&&(i(),i=null),document.removeEventListener("mousedown",b),document.removeEventListener("keydown",S),le(p``,t)}}}var xo=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-queue-set-policy","worker-queue-set-exec-default","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append"];function xn(){let t=Date.now().toString(36),e=Math.random().toString(36).slice(2,8);return`${t}-${e}`}function So(t,e,r=xn()){return{id:r,type:t,payload:e}}function Ao(t={}){let e=ve("ws"),r={initialMs:t.backoff?.initialMs??1e3,maxMs:t.backoff?.maxMs??3e4,factor:t.backoff?.factor??2,jitterRatio:t.backoff?.jitterRatio??.2},n=()=>t.url&&t.url.length>0?t.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",i=0,l=null,a=!0,c=new Map,u=[],h=new Map,b=new Set;function S(L){for(let k of Array.from(b))try{k(L)}catch{}}function w(){if(!a||l)return;o="reconnecting",e("ws reconnecting\u2026"),S(o);let L=Math.min(r.maxMs||0,(r.initialMs||0)*Math.pow(r.factor||1,i)),k=(r.jitterRatio||0)*L,y=Math.max(0,Math.round(L+(Math.random()*2-1)*k));e("ws retry in %d ms (attempt %d)",y,i+1),l=setTimeout(()=>{l=null,O()},y)}function C(L){try{s?.send(JSON.stringify(L))}catch(k){e("ws send failed",k)}}function M(){for(o="open",e("ws open"),S(o),i=0;u.length;){let L=u.shift();L&&C(L)}}function P(L){let k;try{k=JSON.parse(String(L.data))}catch{e("ws received non-JSON message");return}if(!k||typeof k.id!="string"||typeof k.type!="string"){e("ws received invalid envelope");return}if(c.has(k.id)){let v=c.get(k.id);c.delete(k.id),k.ok?v?.resolve(k.payload):v?.reject(k.error||new Error("ws error"));return}let y=h.get(k.type);if(y&&y.size>0)for(let v of Array.from(y))try{v(k.payload)}catch(x){e("ws event handler error",x)}else e("ws received unhandled message type: %s",k.type)}function q(){o="closed",e("ws closed"),S(o);for(let[L,k]of c.entries())k.reject(new Error("ws disconnected")),c.delete(L);i+=1,w()}function O(){if(!a)return;let L=n();try{s=new WebSocket(L),e("ws connecting %s",L),o="connecting",S(o),s.addEventListener("open",M),s.addEventListener("message",P),s.addEventListener("error",()=>{}),s.addEventListener("close",q)}catch(k){e("ws connect failed %o",k),w()}}return O(),{send(L,k){if(!xo.includes(L))return Promise.reject(new Error(`unknown message type: ${L}`));let y=xn(),v=So(L,k,y);return e("send %s id=%s",L,y),new Promise((x,B)=>{c.set(y,{resolve:x,reject:B,type:L}),s&&s.readyState===s.OPEN?C(v):(e("queue %s id=%s (state=%s)",L,y,o),u.push(v))})},on(L,k){h.has(L)||h.set(L,new Set);let y=h.get(L);return y?.add(k),()=>{y?.delete(k)}},onConnection(L){return b.add(L),()=>{b.delete(L)}},reconnect(){a=!0,l&&(clearTimeout(l),l=null),i=0,O()},close(){a=!1,l&&(clearTimeout(l),l=null);try{s?.close()}catch{}},getState(){return o}}}function al(){let t=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof t?.workspace_config?.default_workspace=="string"&&t.workspace_config.default_workspace.length>0?t.workspace_config.default_workspace:null}}}async function ll(t,e){try{let n=await(await fetch("/api/config")).json();t.setState({config:n})}catch(r){e("config refresh failed",r)}}var Sn=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],To=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"]],Eo="worker:queue",Co="ui:order",Ro="ui:display-policy",dt="tab:board:closed",Lo="beads-ui.board.closed-range";function cl(t){let e=ve("main");e("bootstrap start");let r=p`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;le(r,t);let n=document.getElementById("top-nav"),s=document.getElementById("board-root"),o=document.getElementById("worker-root"),i=document.getElementById("detail-panel");if(s&&o&&i){let x=function(f,_){let Z="Request failed",W="";if(f&&typeof f=="object"){let we=f;if(typeof we.message=="string"&&we.message.length>0&&(Z=we.message),typeof we.details=="string")W=we.details;else if(we.details&&typeof we.details=="object")try{W=JSON.stringify(we.details,null,2)}catch{W=""}}else typeof f=="string"&&f.length>0&&(Z=f);let re=_&&_.length>0?`Failed to load ${_}`:"Request failed";v.open(re,Z,W)},oe=function(f){return`${E.getState().workspace.current?.path||""}\0${f}`},Ne=function(){ze&&(ze().catch(()=>{}),ze=null),he=null,xe=null},$=function(f){Ue=f;let _=()=>{Ue!==f||E.getState().selected_id!==f||(Ue=null,Ye(f))};if(!de){tt.then(_);return}_()},me=function(){let f=jn(Y);return f===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:f}}},K=function(f){if(f)for(let[_,Z]of Sn){if(R.has(_)||z.has(_))continue;let W=_===dt?me():{type:Z};try{ee.register(_,W)}catch(re){e("register %s store failed: %o",_,re)}z.add(_),J.subscribeList(_,W).then(re=>{R.set(_,re)}).catch(re=>{e("subscribe %s failed: %o",_,re),x(re,"board")}).finally(()=>{z.delete(_)})}else ue()},ue=function(){for(let[f]of Sn){let _=R.get(f);_&&(_().catch(()=>{}),R.delete(f));try{ee.unregister(f)}catch(Z){e("unregister %s failed: %o",f,Z)}}},Ae=function(f){if(!f){Le();return}for(let[_,Z]of To)if(!(ae.has(_)||z.has(_))){try{ee.register(_,{type:Z})}catch(W){e("register %s store failed: %o",_,W)}z.add(_),J.subscribeList(_,{type:Z}).then(W=>{ae.set(_,W)}).catch(W=>{e("subscribe %s failed: %o",_,W),x(W,"worker")}).finally(()=>{z.delete(_)})}be||(j("subscribe-worker-queue",{id:Eo}).catch(_=>{e("subscribe-worker-queue failed: %o",_)}),be=()=>j("unsubscribe-worker-queue",{id:Eo}))},Le=function(){for(let[f]of To){let _=ae.get(f);_&&(_().catch(()=>{}),ae.delete(f));try{ee.unregister(f)}catch(Z){e("unregister %s failed: %o",f,Z)}}be&&(be().catch(()=>{}),be=null)},We=function(){ye||(j("subscribe-ui-order",{id:Co}).catch(f=>{e("subscribe-ui-order failed: %o",f)}),ye=()=>j("unsubscribe-ui-order",{id:Co}))},Ze=function(){ye&&(ye().catch(()=>{}),ye=null),Me.clear()},Ce=function(){ge||(j("subscribe-display-policy",{id:Ro}).catch(f=>{e("subscribe-display-policy failed: %o",f)}),ge=()=>j("unsubscribe-display-policy",{id:Ro}))},_e=function(){ge&&(ge().catch(()=>{}),ge=null),Ee.clear()},N=function(f){if(!f)return"Unknown";let _=f.split("/").filter(Boolean);return _.length>0?_[_.length-1]:"Unknown"};var l=x,a=oe,c=Ne,u=$,h=me,b=K,S=ue,w=Ae,C=Le,M=We,P=Ze,q=Ce,O=_e,L=N;let k=document.getElementById("header-loading"),y=ms(k),v=ho(t),B=Ao(),j=y.wrapSend((f,_)=>B.send(f,_)),J=ls(j),ee=cs(),Te=us(),Me=ds(),Ee=Yn(),Ve=Vn();B.on("worker-queue-snapshot",f=>{let _=f;if(_&&_.queue)try{Te.set(_.queue)}catch{}}),B.on("ui-order-snapshot",f=>{let _=f;if(_&&typeof _.revision=="number")try{Me.set({revision:_.revision,order:_.order&&typeof _.order=="object"?_.order:{}})}catch{}}),B.on("display-policy-snapshot",f=>{let _=f;if(_&&_.policy&&typeof _.policy=="object")try{Ee.set(_.policy)}catch{}}),B.on("session-log-snapshot",f=>{let _=f;if(_&&typeof _.attempt_id=="string")try{Ve.set(_.attempt_id,Array.isArray(_.lines)?_.lines:[])}catch{}}),B.on("session-log-append",f=>{let _=f;if(_&&typeof _.attempt_id=="string")try{Ve.append(_.attempt_id,_.event)}catch{}}),B.on("snapshot",f=>{let _=f,Z=_&&typeof _.id=="string"?_.id:"",W=Z?ee.getStore(Z):null;if(W&&_&&_.type==="snapshot")try{W.applyPush(_)}catch{}}),B.on("upsert",f=>{let _=f,Z=_&&typeof _.id=="string"?_.id:"",W=Z?ee.getStore(Z):null;if(W&&_&&_.type==="upsert")try{W.applyPush(_)}catch{}}),B.on("delete",f=>{let _=f,Z=_&&typeof _.id=="string"?_.id:"",W=Z?ee.getStore(Z):null;if(W&&_&&_.type==="delete")try{W.applyPush(_)}catch{}});let ze=null,he=null,xe=null,Ue=null,ce=()=>{},tt=new Promise(f=>{ce=()=>f(void 0)}),de=!1,He=!1;async function Ye(f){let _=oe(f);if(_===he||_===xe)return;xe=_;let Z=`detail:${f}`,W={type:"issue-detail",params:{id:f}};try{ee.register(Z,W)}catch(re){e("register detail store failed: %o",re)}try{let re=await J.subscribeList(Z,W);if(E.getState().selected_id!==f||oe(f)!==_){await re().catch(()=>{});return}ze&&await ze().catch(()=>{}),ze=re,he=_}catch(re){e("detail subscribe failed: %o",re),x(re,"issue details")}finally{xe===_&&(xe=null)}}let R=new Map,z=new Set,Y=sr;try{let f=window.localStorage.getItem(Lo);Br(f)&&(Y=f)}catch{}async function te(f){if(!Br(f)||f===Y)return;Y=f;try{window.localStorage.setItem(Lo,f)}catch{}let _=R.get(dt);if(!_)return;R.delete(dt),await _().catch(()=>{});let Z=me();try{ee.register(dt,Z)}catch(W){e("register %s store failed: %o",dt,W)}try{let W=await J.subscribeList(dt,Z);R.set(dt,W)}catch(W){e("re-subscribe %s failed: %o",dt,W),x(W,"board")}}let ae=new Map,be=null,ye=null,ge=null;async function Re(){ge=null,Ee.clear();let f=E.getState().workspace.current?.path;if(f)try{await B.send("set-workspace",{path:f})}catch(_){e("workspace restore after reconnect failed: %o",_);return}Ce()}async function T(){e("clearing all subscriptions for workspace switch"),ue(),Le(),Te.clear(),Ze(),We(),_e(),Ce(),Ne();let f=E.getState();if(f.selected_id)try{ee.unregister(`detail:${f.selected_id}`)}catch{}let _=E.getState();K(_.view==="board"),Ae(_.view==="worker"),_.selected_id&&$(_.selected_id)}async function D(f){e("requesting workspace switch to %s",f),He=!0;try{let _=await B.send("set-workspace",{path:f});e("workspace switch result: %o",_),_&&_.workspace&&(E.setState({workspace:{current:{path:_.workspace.root_dir,database:_.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",f),_.changed&&(await T(),Q("Switched to "+N(f),"success",2e3)))}catch(_){throw e("workspace switch failed: %o",_),Q("Failed to switch workspace","error",3e3),_}finally{He=!1}}async function V(f){e("requesting workspace git pull for %s",f);try{let _=await B.send("git-pull-workspace",{});e("workspace git pull result: %o",_);let Z=_?.status;if(Z==="up_to_date"){Q("Already up to date","success",2e3);return}if(Z==="stash_pop_conflict"){Q("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}Q("Git pulled "+N(f),"success",2e3)}catch(_){e("workspace git pull failed: %o",_);let Z=_?.code,W=_?.message;if(Z==="rebase_conflict"){Q("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(Z==="rebase_conflict_abort_failed"){Q("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(Z==="busy"){Q("Git pull skipped: another operation is running","warning",3e3);return}let re=W?`: ${W}`:"";throw Q(`Git pull failed${re}`,"error",3e3),_}}async function G(f,_){e("setting workspace visibility %s \u2192 %s",f,String(_));try{await B.send("set-workspace-visibility",{path:f,visible:_}),await g()}catch(Z){e("workspace visibility update failed: %o",Z),Q("Failed to update project visibility","error",3e3)}}async function g(){try{let f=await B.send("list-workspaces",{});if(e("workspaces loaded: %o",f),f&&Array.isArray(f.workspaces)){let _=f.workspaces.map(we=>({path:we.path,database:we.database,pid:we.pid,version:we.version})),Z=f.current?{path:f.current.root_dir,database:f.current.db_path}:null,W=Array.isArray(f.hidden)?f.hidden.filter(we=>typeof we=="string"):[];E.setState({workspace:{current:Z,available:_,hidden:W}});let re=window.localStorage.getItem("beads-ui.workspace");re&&(!_.some(rr=>rr.path===re)||W.includes(re)?window.localStorage.removeItem("beads-ui.workspace"):Z&&re!==Z.path&&(e("restoring saved workspace preference: %s",re),await D(re)))}}catch(f){e("failed to load workspaces: %o",f)}}B.on("workspace-changed",f=>{e("workspace-changed event: %o",f),f&&f.root_dir&&(E.setState({workspace:{current:{path:f.root_dir,database:f.db_path}}}),g(),T())});let m=!1;if(typeof B.onConnection=="function"){let f=_=>{e("ws state %s",_),_==="reconnecting"||_==="closed"?(m=!0,Q("Connection lost. Reconnecting\u2026","error",4e3)):_==="open"&&m&&(m=!1,Q("Reconnected","success",2200),ll(E,(Z,W)=>{e(`${Z}: %o`,W)}),Re())};B.onConnection(f)}let A="board";try{let f=window.localStorage.getItem("beads-ui.view");(f==="board"||f==="worker")&&(A=f)}catch(f){e("view parse error: %o",f)}let E=hs({config:al(),view:A}),X=ps(E);X.start();let fe=async(f,_)=>{try{return await j(f,_)}catch{return[]}};n&&mo(n,E,X);let U=document.getElementById("workspace-picker");U&&$o(U,E,D,V,G);let Ie=yo(t,(f,_)=>j(f,_));try{let f=document.getElementById("new-issue-btn");f&&f.addEventListener("click",()=>Ie.open())}catch{}let wt=fo(t,{policyStore:Ee,transport:(f,_)=>j(f,_),labelOptions:()=>{let f=new Set;for(let[_]of Sn)for(let Z of ee.snapshotFor(_)||[]){let W=Z.labels;if(Array.isArray(W))for(let re of W)typeof re=="string"&&re.length>0&&f.add(re)}return Array.from(f).sort()}});try{let f=document.getElementById("display-settings-btn");f&&f.addEventListener("click",()=>wt.open())}catch{}let vt=vs(s,{gotoIssue:f=>X.gotoIssue(f),issueStores:ee,transport:fe,uiOrderStore:Me,displayPolicyStore:Ee,closedRange:Y,onClosedRangeChange:f=>{te(f)},onNewIssue:()=>Ie.open()}),Ar=vn(o,{transport:fe,issueStores:ee,queueStore:Te,sessionLogStore:Ve,uiOrderStore:Me,gotoIssue:f=>E.setState({selected_id:f})}),nt=uo(i,{issueStores:ee,transport:fe,queueStore:Te,sessionLogStore:Ve,getWorkspacePath:()=>E.getState().workspace.current?.path,onNavigate:f=>{E.getState().view==="worker"?E.setState({selected_id:f}):X.gotoIssue(f)},onClose:()=>{let f=E.getState();E.setState({selected_id:null});try{X.gotoView(f.view==="worker"?"worker":"board")}catch{}}}),Dt=E.getState().selected_id;Dt&&(i.hidden=!1,nt.load(Dt),$(Dt)),E.subscribe(f=>{let _=f.selected_id;_?(i.hidden=!1,nt.load(_),He||$(_)):(nt.clear(),i.hidden=!0,Ne())});let tr=f=>{s.hidden=f.view!=="board",o.hidden=f.view!=="worker",K(f.view==="board"),Ae(f.view==="worker"),!f.selected_id&&f.view==="board"&&vt.load(),f.view==="worker"&&Ar.load(),window.localStorage.setItem("beads-ui.view",f.view)};E.subscribe(tr),tr(E.getState()),We(),Ce(),g().finally(()=>{de=!0,ce()}),window.addEventListener("keydown",f=>{let _=f.ctrlKey||f.metaKey,Z=String(f.key||"").toLowerCase(),W=f.target,re=W&&W.tagName?String(W.tagName).toLowerCase():"",we=re==="input"||re==="textarea"||re==="select"||W&&typeof W.isContentEditable=="boolean"&&W.isContentEditable;_&&Z==="n"&&(we||(f.preventDefault(),Ie.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let r=window.localStorage.getItem("beads-ui.theme"),n=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=r==="dark"||r==="light"?r:n?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let t=document.getElementById("theme-switch");t&&t.addEventListener("change",()=>{let r=t.checked?"dark":"light";document.documentElement.setAttribute("data-theme",r),window.localStorage.setItem("beads-ui.theme",r)});let e=document.getElementById("app");e&&cl(e)});export{cl as bootstrap,al as readBootstrapConfig,ll as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
