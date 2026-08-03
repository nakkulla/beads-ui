var ji=Object.create;var _n=Object.defineProperty;var Yi=Object.getOwnPropertyDescriptor;var Vi=Object.getOwnPropertyNames;var Ki=Object.getPrototypeOf,Zi=Object.prototype.hasOwnProperty;var Xi=(t,e,r)=>e in t?_n(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r;var gn=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports);var Qi=(t,e,r,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of Vi(e))!Zi.call(t,s)&&s!==r&&_n(t,s,{get:()=>e[s],enumerable:!(n=Yi(e,s))||n.enumerable});return t};var Ji=(t,e,r)=>(r=t!=null?ji(Ki(t)):{},Qi(e||!t||!t.__esModule?_n(r,"default",{value:t,enumerable:!0}):r,t));var Se=(t,e,r)=>Xi(t,typeof e!="symbol"?e+"":e,r);var Us=gn((ud,Bs)=>{var sr=1e3,or=sr*60,ir=or*60,Gt=ir*24,sa=Gt*7,oa=Gt*365.25;Bs.exports=function(t,e){e=e||{};var r=typeof t;if(r==="string"&&t.length>0)return ia(t);if(r==="number"&&isFinite(t))return e.long?la(t):aa(t);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(t))};function ia(t){if(t=String(t),!(t.length>100)){var e=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(t);if(e){var r=parseFloat(e[1]),n=(e[2]||"ms").toLowerCase();switch(n){case"years":case"year":case"yrs":case"yr":case"y":return r*oa;case"weeks":case"week":case"w":return r*sa;case"days":case"day":case"d":return r*Gt;case"hours":case"hour":case"hrs":case"hr":case"h":return r*ir;case"minutes":case"minute":case"mins":case"min":case"m":return r*or;case"seconds":case"second":case"secs":case"sec":case"s":return r*sr;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r;default:return}}}}function aa(t){var e=Math.abs(t);return e>=Gt?Math.round(t/Gt)+"d":e>=ir?Math.round(t/ir)+"h":e>=or?Math.round(t/or)+"m":e>=sr?Math.round(t/sr)+"s":t+"ms"}function la(t){var e=Math.abs(t);return e>=Gt?Hr(t,e,Gt,"day"):e>=ir?Hr(t,e,ir,"hour"):e>=or?Hr(t,e,or,"minute"):e>=sr?Hr(t,e,sr,"second"):t+" ms"}function Hr(t,e,r,n){var s=e>=r*1.5;return Math.round(t/r)+" "+n+(s?"s":"")}});var Hs=gn((pd,zs)=>{function ca(t){r.debug=r,r.default=r,r.coerce=a,r.disable=i,r.enable=s,r.enabled=l,r.humanize=Us(),r.destroy=c,Object.keys(t).forEach(f=>{r[f]=t[f]}),r.names=[],r.skips=[],r.formatters={};function e(f){let h=0;for(let b=0;b<f.length;b++)h=(h<<5)-h+f.charCodeAt(b),h|=0;return r.colors[Math.abs(h)%r.colors.length]}r.selectColor=e;function r(f){let h,b=null,v,$;function E(...A){if(!E.enabled)return;let P=E,q=Number(new Date),B=q-(h||q);P.diff=B,P.prev=h,P.curr=q,h=q,A[0]=r.coerce(A[0]),typeof A[0]!="string"&&A.unshift("%O");let C=0;A[0]=A[0].replace(/%([a-zA-Z%])/g,(T,D)=>{if(T==="%%")return"%";C++;let y=r.formatters[D];if(typeof y=="function"){let G=A[C];T=y.call(P,G),A.splice(C,1),C--}return T}),r.formatArgs.call(P,A),(P.log||r.log).apply(P,A)}return E.namespace=f,E.useColors=r.useColors(),E.color=r.selectColor(f),E.extend=n,E.destroy=r.destroy,Object.defineProperty(E,"enabled",{enumerable:!0,configurable:!1,get:()=>b!==null?b:(v!==r.namespaces&&(v=r.namespaces,$=r.enabled(f)),$),set:A=>{b=A}}),typeof r.init=="function"&&r.init(E),E}function n(f,h){let b=r(this.namespace+(typeof h>"u"?":":h)+f);return b.log=this.log,b}function s(f){r.save(f),r.namespaces=f,r.names=[],r.skips=[];let h=(typeof f=="string"?f:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let b of h)b[0]==="-"?r.skips.push(b.slice(1)):r.names.push(b)}function o(f,h){let b=0,v=0,$=-1,E=0;for(;b<f.length;)if(v<h.length&&(h[v]===f[b]||h[v]==="*"))h[v]==="*"?($=v,E=b,v++):(b++,v++);else if($!==-1)v=$+1,E++,b=E;else return!1;for(;v<h.length&&h[v]==="*";)v++;return v===h.length}function i(){let f=[...r.names,...r.skips.map(h=>"-"+h)].join(",");return r.enable(""),f}function l(f){for(let h of r.skips)if(o(f,h))return!1;for(let h of r.names)if(o(f,h))return!0;return!1}function a(f){return f instanceof Error?f.stack||f.message:f}function c(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return r.enable(r.load()),r}zs.exports=ca});var Ws=gn((ft,Wr)=>{ft.formatArgs=ua;ft.save=pa;ft.load=fa;ft.useColors=da;ft.storage=ha();ft.destroy=(()=>{let t=!1;return()=>{t||(t=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();ft.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function da(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let t;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(t=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(t[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function ua(t){if(t[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+t[0]+(this.useColors?"%c ":" ")+"+"+Wr.exports.humanize(this.diff),!this.useColors)return;let e="color: "+this.color;t.splice(1,0,e,"color: inherit");let r=0,n=0;t[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(r++,s==="%c"&&(n=r))}),t.splice(n,0,e)}ft.log=console.debug||console.log||(()=>{});function pa(t){try{t?ft.storage.setItem("debug",t):ft.storage.removeItem("debug")}catch{}}function fa(){let t;try{t=ft.storage.getItem("debug")||ft.storage.getItem("DEBUG")}catch{}return!t&&typeof process<"u"&&"env"in process&&(t=process.env.DEBUG),t}function ha(){try{return localStorage}catch{}}Wr.exports=Hs()(ft);var{formatters:_a}=Wr.exports;_a.j=function(t){try{return JSON.stringify(t)}catch(e){return"[UnexpectedJSONParseError]: "+e.message}}});var mr=globalThis,Ur=mr.trustedTypes,Es=Ur?Ur.createPolicy("lit-html",{createHTML:t=>t}):void 0,Os="$lit$",Lt=`lit$${Math.random().toFixed(9).slice(2)}$`,Ms="?"+Lt,ea=`<${Ms}>`,Ht=document,br=()=>Ht.createComment(""),wr=t=>t===null||typeof t!="object"&&typeof t!="function",$n=Array.isArray,ta=t=>$n(t)||typeof t?.[Symbol.iterator]=="function",mn=`[ 	
\f\r]`,gr=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Cs=/-->/g,Rs=/>/g,Ut=RegExp(`>|${mn}(?:([^\\s"'>=/]+)(${mn}*=${mn}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Is=/'/g,Ls=/"/g,Ns=/^(?:script|style|textarea|title)$/i,xn=t=>(e,...r)=>({_$litType$:t,strings:e,values:r}),d=xn(1),od=xn(2),id=xn(3),Wt=Symbol.for("lit-noChange"),Be=Symbol.for("lit-nothing"),Ds=new WeakMap,zt=Ht.createTreeWalker(Ht,129);function Ps(t,e){if(!$n(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return Es!==void 0?Es.createHTML(e):e}var ra=(t,e)=>{let r=t.length-1,n=[],s,o=e===2?"<svg>":e===3?"<math>":"",i=gr;for(let l=0;l<r;l++){let a=t[l],c,f,h=-1,b=0;for(;b<a.length&&(i.lastIndex=b,f=i.exec(a),f!==null);)b=i.lastIndex,i===gr?f[1]==="!--"?i=Cs:f[1]!==void 0?i=Rs:f[2]!==void 0?(Ns.test(f[2])&&(s=RegExp("</"+f[2],"g")),i=Ut):f[3]!==void 0&&(i=Ut):i===Ut?f[0]===">"?(i=s??gr,h=-1):f[1]===void 0?h=-2:(h=i.lastIndex-f[2].length,c=f[1],i=f[3]===void 0?Ut:f[3]==='"'?Ls:Is):i===Ls||i===Is?i=Ut:i===Cs||i===Rs?i=gr:(i=Ut,s=void 0);let v=i===Ut&&t[l+1].startsWith("/>")?" ":"";o+=i===gr?a+ea:h>=0?(n.push(c),a.slice(0,h)+Os+a.slice(h)+Lt+v):a+Lt+(h===-2?l:v)}return[Ps(t,o+(t[r]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),n]},kr=class t{constructor({strings:e,_$litType$:r},n){let s;this.parts=[];let o=0,i=0,l=e.length-1,a=this.parts,[c,f]=ra(e,r);if(this.el=t.createElement(c,n),zt.currentNode=this.el.content,r===2||r===3){let h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(s=zt.nextNode())!==null&&a.length<l;){if(s.nodeType===1){if(s.hasAttributes())for(let h of s.getAttributeNames())if(h.endsWith(Os)){let b=f[i++],v=s.getAttribute(h).split(Lt),$=/([.?@])?(.*)/.exec(b);a.push({type:1,index:o,name:$[2],strings:v,ctor:$[1]==="."?wn:$[1]==="?"?kn:$[1]==="@"?yn:rr}),s.removeAttribute(h)}else h.startsWith(Lt)&&(a.push({type:6,index:o}),s.removeAttribute(h));if(Ns.test(s.tagName)){let h=s.textContent.split(Lt),b=h.length-1;if(b>0){s.textContent=Ur?Ur.emptyScript:"";for(let v=0;v<b;v++)s.append(h[v],br()),zt.nextNode(),a.push({type:2,index:++o});s.append(h[b],br())}}}else if(s.nodeType===8)if(s.data===Ms)a.push({type:2,index:o});else{let h=-1;for(;(h=s.data.indexOf(Lt,h+1))!==-1;)a.push({type:7,index:o}),h+=Lt.length-1}o++}}static createElement(e,r){let n=Ht.createElement("template");return n.innerHTML=e,n}};function tr(t,e,r=t,n){if(e===Wt)return e;let s=n!==void 0?r._$Co?.[n]:r._$Cl,o=wr(e)?void 0:e._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(t),s._$AT(t,r,n)),n!==void 0?(r._$Co??(r._$Co=[]))[n]=s:r._$Cl=s),s!==void 0&&(e=tr(t,s._$AS(t,e.values),s,n)),e}var bn=class{constructor(e,r){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:r},parts:n}=this._$AD,s=(e?.creationScope??Ht).importNode(r,!0);zt.currentNode=s;let o=zt.nextNode(),i=0,l=0,a=n[0];for(;a!==void 0;){if(i===a.index){let c;a.type===2?c=new yr(o,o.nextSibling,this,e):a.type===1?c=new a.ctor(o,a.name,a.strings,this,e):a.type===6&&(c=new vn(o,this,e)),this._$AV.push(c),a=n[++l]}i!==a?.index&&(o=zt.nextNode(),i++)}return zt.currentNode=Ht,s}p(e){let r=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(e,n,r),r+=n.strings.length-2):n._$AI(e[r])),r++}},yr=class t{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,r,n,s){this.type=2,this._$AH=Be,this._$AN=void 0,this._$AA=e,this._$AB=r,this._$AM=n,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,r=this._$AM;return r!==void 0&&e?.nodeType===11&&(e=r.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,r=this){e=tr(this,e,r),wr(e)?e===Be||e==null||e===""?(this._$AH!==Be&&this._$AR(),this._$AH=Be):e!==this._$AH&&e!==Wt&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):ta(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==Be&&wr(this._$AH)?this._$AA.nextSibling.data=e:this.T(Ht.createTextNode(e)),this._$AH=e}$(e){let{values:r,_$litType$:n}=e,s=typeof n=="number"?this._$AC(e):(n.el===void 0&&(n.el=kr.createElement(Ps(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===s)this._$AH.p(r);else{let o=new bn(s,this),i=o.u(this.options);o.p(r),this.T(i),this._$AH=o}}_$AC(e){let r=Ds.get(e.strings);return r===void 0&&Ds.set(e.strings,r=new kr(e)),r}k(e){$n(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,n,s=0;for(let o of e)s===r.length?r.push(n=new t(this.O(br()),this.O(br()),this,this.options)):n=r[s],n._$AI(o),s++;s<r.length&&(this._$AR(n&&n._$AB.nextSibling,s),r.length=s)}_$AR(e=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);e!==this._$AB;){let n=e.nextSibling;e.remove(),e=n}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},rr=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,r,n,s,o){this.type=1,this._$AH=Be,this._$AN=void 0,this.element=e,this.name=r,this._$AM=s,this.options=o,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=Be}_$AI(e,r=this,n,s){let o=this.strings,i=!1;if(o===void 0)e=tr(this,e,r,0),i=!wr(e)||e!==this._$AH&&e!==Wt,i&&(this._$AH=e);else{let l=e,a,c;for(e=o[0],a=0;a<o.length-1;a++)c=tr(this,l[n+a],r,a),c===Wt&&(c=this._$AH[a]),i||(i=!wr(c)||c!==this._$AH[a]),c===Be?e=Be:e!==Be&&(e+=(c??"")+o[a+1]),this._$AH[a]=c}i&&!s&&this.j(e)}j(e){e===Be?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},wn=class extends rr{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===Be?void 0:e}},kn=class extends rr{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==Be)}},yn=class extends rr{constructor(e,r,n,s,o){super(e,r,n,s,o),this.type=5}_$AI(e,r=this){if((e=tr(this,e,r,0)??Be)===Wt)return;let n=this._$AH,s=e===Be&&n!==Be||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,o=e!==Be&&(n===Be||s);s&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},vn=class{constructor(e,r,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=r,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){tr(this,e)}};var na=mr.litHtmlPolyfillSupport;na?.(kr,yr),(mr.litHtmlVersions??(mr.litHtmlVersions=[])).push("3.3.1");var be=(t,e,r)=>{let n=r?.renderBefore??e,s=n._$litPart$;if(s===void 0){let o=r?.renderBefore??null;n._$litPart$=s=new yr(e.insertBefore(br(),o),o,void 0,r??{})}return s._$AI(t),s};var Dt="today",vr=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}];function nr(t){return t==="today"||t==="7d"||t==="30d"||t==="all"}function zr(t,e=Date.now()){switch(t){case"today":{let r=new Date(e);return r.setHours(0,0,0,0),r.getTime()}case"7d":return e-7*864e5;case"30d":return e-30*864e5;case"all":default:return}}function Fs(){let t=null,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{get(){return t},set(n){t=n,r()},clear(){t=null,r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}function qs(){let t=new Map,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{set(n,s,o=null){t.set(n,{lines:Array.isArray(s)?[...s]:[],last_event_at:typeof o=="number"?o:null}),r()},append(n,s){let o=t.get(n)||{lines:[],last_event_at:null};o.lines=[...o.lines,s],o.last_event_at=Date.now(),t.set(n,o),r()},get(n){return t.get(n)||null},clear(n){typeof n=="string"?t.delete(n):t.clear(),r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}var Gs=Ji(Ws(),1);function Le(t){return(0,Gs.default)(`beads-ui:${t}`)}function kt(t){if(typeof t=="number")return Number.isFinite(t)?t:0;if(typeof t=="string"){let e=Date.parse(t);return Number.isFinite(e)?e:0}return 0}function jt(t,e){let r=kt(t.created_at),n=kt(e.created_at);if(r!==n)return r<n?1:-1;let s=t.priority??2,o=e.priority??2;if(s!==o)return s-o;let i=t.id,l=e.id;return i<l?-1:i>l?1:0}function Vs(t,e){let r=kt(t.created_at),n=kt(e.created_at);if(r!==n)return r<n?-1:1;let s=t.priority??2,o=e.priority??2;if(s!==o)return s-o;let i=t.id,l=e.id;return i<l?-1:i>l?1:0}function Ks(t,e){let r=kt(t.updated_at),n=kt(e.updated_at);if(r!==n)return r<n?1:-1;let s=t.id,o=e.id;return s<o?-1:s>o?1:0}function Zs(t,e){let r=t.priority??2,n=e.priority??2;if(r!==n)return r-n;let s=kt(t.created_at),o=kt(e.created_at);if(s!==o)return s<o?1:-1;let i=t.id,l=e.id;return i<l?-1:i>l?1:0}function Xs(t,e){let r=t.closed_at??0,n=e.closed_at??0;if(r!==n)return r<n?1:-1;let s=t?.id,o=e?.id;return s<o?-1:s>o?1:0}var ga=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function js(t){let e=t&&t.metadata,r=e?e.task_order:void 0;if(r==null||r==="")return Number.POSITIVE_INFINITY;let n=Number(r);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function Ys(t){let e=t&&t.title;if(typeof e!="string")return Number.POSITIVE_INFINITY;let r=ga.exec(e);if(!r)return Number.POSITIVE_INFINITY;let n=Number(r[1]);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function Qs(t,e){let r=js(t),n=js(e);if(r!==n)return r<n?-1:1;let s=Ys(t),o=Ys(e);if(s!==o)return s<o?-1:1;let i=kt(t&&t.created_at),l=kt(e&&e.created_at);if(i!==l)return i<l?-1:1;let a=t&&t.id,c=e&&e.id;return a===c?0:String(a)<String(c)?-1:1}var Sn=2**20;function ar(t,e){let r=t&&t.id;return e&&typeof r=="string"&&Object.prototype.hasOwnProperty.call(e,r)&&typeof e[r]=="number"&&Number.isFinite(e[r])?e[r]:-kt(t&&t.created_at)}function Gr(t){return(e,r)=>{let n=ar(e,t),s=ar(r,t);if(n!==s)return n<s?-1:1;let o=e?.id,i=r?.id;return o<i?-1:o>i?1:0}}function Tn(t,e,r){let n=Array.isArray(t)?t:[],s=n.length,o=Math.max(0,Math.min(e,s-1)),i=o-1>=0?n[o-1]:null,l=o+1<s?n[o+1]:null;if(!i&&!l)return{rank:0};if(!i)return{rank:ar(l,r)-Sn};if(!l)return{rank:ar(i,r)+Sn};let a=ar(i,r),c=ar(l,r),f=(a+c)/2;return a<f&&f<c?{rank:f}:{renormalize:n.map((h,b)=>({bead_id:h.id,rank:b*Sn}))}}function An(t,e={}){let r=Le(`issue-store:${t}`),n=new Map,s=[],o=0,i=new Set,l=!1,a=e.sort||jt;function c(){for(let b of Array.from(i))try{b()}catch{}}function f(){s=Array.from(n.values()).sort(a)}function h(b){if(l||!b||b.id!==t)return;let v=Number(b.revision)||0;if(r("apply %s rev=%d",b.type,v),!(v<=o&&b.type!=="snapshot")){if(b.type==="snapshot"){if(v<=o)return;n.clear();let $=Array.isArray(b.issues)?b.issues:[];for(let E of $)E&&typeof E.id=="string"&&E.id.length>0&&n.set(E.id,E);f(),o=v,c();return}if(b.type==="upsert"){let $=b.issue;if($&&typeof $.id=="string"&&$.id.length>0){let E=n.get($.id);if(!E)n.set($.id,$);else{let A=Number.isFinite(E.updated_at)?E.updated_at:0,P=Number.isFinite($.updated_at)?$.updated_at:0;if(A<=P){for(let q of Object.keys(E))q in $||delete E[q];for(let[q,B]of Object.entries($))E[q]=B}}f()}o=v,c()}else if(b.type==="delete"){let $=String(b.issue_id||"");$&&(n.delete($),f()),o=v,c()}}}return{id:t,subscribe(b){return i.add(b),()=>{i.delete(b)}},applyPush:h,snapshot(){return s},size(){return n.size},getById(b){return n.get(b)},dispose(){l=!0,n.clear(),s=[],i.clear(),o=0}}}function jr(t){let e=String(t.type||"").trim(),r={};if(t.params&&typeof t.params=="object"){let s=Object.keys(t.params).sort();for(let o of s){let i=t.params[o];r[o]=String(i)}}let n=new URLSearchParams(r).toString();return n.length>0?`${e}?${n}`:e}function Js(t){let e=Le("subs"),r=new Map,n=new Map;function s(l,a){e("applyDelta %s +%d ~%d -%d",l,(a.added||[]).length,(a.updated||[]).length,(a.removed||[]).length);let c=n.get(l);if(!c||c.size===0)return;let f=Array.isArray(a.added)?a.added:[],h=Array.isArray(a.updated)?a.updated:[],b=Array.isArray(a.removed)?a.removed:[];for(let v of Array.from(c)){let $=r.get(v);if(!$)continue;let E=$.itemsById;for(let A of f)typeof A=="string"&&A.length>0&&E.set(A,!0);for(let A of h)typeof A=="string"&&A.length>0&&E.set(A,!0);for(let A of b)typeof A=="string"&&A.length>0&&E.delete(A)}}async function o(l,a){let c=jr(a);if(e("subscribe %s key=%s",l,c),!r.has(l))r.set(l,{key:c,itemsById:new Map});else{let h=r.get(l);if(h&&h.key!==c){let b=n.get(h.key);b&&(b.delete(l),b.size===0&&n.delete(h.key)),r.set(l,{key:c,itemsById:new Map})}}n.has(c)||n.set(c,new Set);let f=n.get(c);f&&f.add(l);try{await t("subscribe-list",{id:l,type:a.type,params:a.params})}catch(h){let b=r.get(l)||null;if(b){let v=n.get(b.key);v&&(v.delete(l),v.size===0&&n.delete(b.key))}throw r.delete(l),h}return async()=>{e("unsubscribe %s key=%s",l,c);try{await t("unsubscribe-list",{id:l})}catch{}let h=r.get(l)||null;if(h){let b=n.get(h.key);b&&(b.delete(l),b.size===0&&n.delete(h.key))}r.delete(l)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:jr,selectors:{getIds(l){let a=r.get(l);return a?Array.from(a.itemsById.keys()):[]},has(l,a){let c=r.get(l);return c?c.itemsById.has(a):!1},count(l){let a=r.get(l);return a?a.itemsById.size:0},getItemsById(l){let a=r.get(l),c={};if(!a)return c;for(let f of a.itemsById.keys())c[f]=!0;return c}}}}function eo(){let t=Le("issue-stores"),e=new Map,r=new Map,n=new Set,s=new Map;function o(){for(let a of Array.from(n))try{a()}catch{}}function i(a,c,f){let h=c?jr(c):"",b=r.get(a)||"",v=e.has(a);if(t("register %s key=%s (prev=%s)",a,h,b),v&&b&&h&&b!==h){let $=e.get(a);if($)try{$.dispose()}catch{}let E=s.get(a);if(E){try{E()}catch{}s.delete(a)}let A=An(a,f);e.set(a,A);let P=A.subscribe(()=>o());s.set(a,P)}else if(!v){let $=An(a,f);e.set(a,$);let E=$.subscribe(()=>o());s.set(a,E)}return r.set(a,h),()=>l(a)}function l(a){t("unregister %s",a),r.delete(a);let c=e.get(a);c&&(c.dispose(),e.delete(a));let f=s.get(a);if(f){try{f()}catch{}s.delete(a)}}return{register:i,unregister:l,getStore(a){return e.get(a)||null},snapshotFor(a){let c=e.get(a);return c?c.snapshot().slice():[]},subscribe(a){return n.add(a),()=>n.delete(a)}}}function to(){let t=null,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{get(){return t},set(n){t=n,r()},clear(){t=null,r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}function ro(){let t=null,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{get(){return t},set(n){t=n,r()},clear(){t=null,r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}function En(t,e){return`#/${t==="worker"||t==="monitor"?t:"board"}?issue=${encodeURIComponent(e)}`}function ma(t){let e=String(t||""),r=e.startsWith("#")?e.slice(1):e,n=r.indexOf("?"),s=n>=0?r.slice(n+1):"";if(s){let l=new URLSearchParams(s).get("issue");if(l)return decodeURIComponent(l)}let o=/^\/issue\/([^\s?#]+)/.exec(r);return o&&o[1]?decodeURIComponent(o[1]):null}function ba(t){let e=String(t||"");return/^#\/worker(\b|\/|$)/.test(e)?"worker":/^#\/monitor(\b|\/|$)/.test(e)?"monitor":"board"}function no(t){let e=Le("router"),r=()=>{let n=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(n),o=s&&s[1]?decodeURIComponent(s[1]):ma(n),i=ba(n);if(e("hash change \u2192 view=%s id=%s",i,o),t.setState({selected_id:i==="worker"?null:o,view:i,worker:{selected_parent_id:i==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(n)){let a=o?`#/${i}?issue=${encodeURIComponent(o)}`:`#/${i}`;window.location.hash!==a&&(window.location.hash=a)}};return{start(){window.addEventListener("hashchange",r),r()},stop(){window.removeEventListener("hashchange",r)},gotoIssue(n){let s=t.getState?t.getState():{view:"board"},o=s.view==="worker"||s.view==="monitor"?s.view:"board",i=En(o,n);e("goto issue %s (view=%s)",n,o),window.location.hash!==i?window.location.hash=i:t.setState({selected_id:o==="worker"?null:n,view:o,worker:{selected_parent_id:o==="worker"?n:null}})},gotoView(n){let s=t.getState?t.getState():{selected_id:null,worker:{selected_parent_id:null}},o=n==="worker"?s.worker?.selected_parent_id:s.selected_id,i=o?En(n,o):`#/${n}`;e("goto view %s (id=%s)",n,o||""),window.location.hash!==i?window.location.hash=i:t.setState({view:n,selected_id:n==="worker"?null:s.selected_id})}}}var wa=Object.freeze({workspace_config:{default_workspace:null}});function so(t){return{workspace_config:{default_workspace:typeof t?.workspace_config?.default_workspace=="string"&&t.workspace_config.default_workspace.length>0?t.workspace_config.default_workspace:wa.workspace_config.default_workspace}}}function oo(t={}){let e=Le("state"),r={selected_id:t.selected_id??null,view:t.view??"board",filters:{status:t.filters?.status??"all",search:t.filters?.search??"",type:typeof t.filters?.type=="string"?t.filters?.type:""},board:{closed_filter:t.board?.closed_filter==="3"||t.board?.closed_filter==="7"||t.board?.closed_filter==="today"?t.board?.closed_filter:"today",show_deferred_column:t.board?.show_deferred_column===!0},worker:{selected_parent_id:t.worker?.selected_parent_id??null,show_closed_children:Array.isArray(t.worker?.show_closed_children)?t.worker.show_closed_children:[]},workspace:{current:t.workspace?.current??null,available:t.workspace?.available??[],hidden:t.workspace?.hidden??[]},config:so(t.config)},n=new Set;function s(){for(let o of Array.from(n))try{o(r)}catch{}}return{getState(){return r},setState(o){let i={...r,...o,filters:{...r.filters,...o.filters||{}},board:{...r.board,...o.board||{}},worker:{...r.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:r.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:r.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:r.workspace.hidden},config:o.config!==void 0?so(o.config):r.config},l=i.workspace.current?.path!==r.workspace.current?.path||i.workspace.available.length!==r.workspace.available.length||i.workspace.hidden.length!==r.workspace.hidden.length||i.workspace.hidden.some((c,f)=>c!==r.workspace.hidden[f]),a=i.config.workspace_config.default_workspace!==r.config.workspace_config.default_workspace;i.selected_id===r.selected_id&&i.view===r.view&&i.filters.status===r.filters.status&&i.filters.search===r.filters.search&&i.filters.type===r.filters.type&&i.board.closed_filter===r.board.closed_filter&&i.board.show_deferred_column===r.board.show_deferred_column&&i.worker.selected_parent_id===r.worker.selected_parent_id&&i.worker.show_closed_children.length===r.worker.show_closed_children.length&&i.worker.show_closed_children.every((c,f)=>c===r.worker.show_closed_children[f])&&!l&&!a||(r=i,e("state change %o",{selected_id:r.selected_id,view:r.view,filters:r.filters,board:r.board,worker:r.worker,workspace:r.workspace.current?.path,config:{default_workspace:r.config.workspace_config.default_workspace}}),s())},subscribe(o){return n.add(o),()=>n.delete(o)}}}function io(t){let e=Le("activity"),r=0,n=new Map,s=1;function o(){if(!t)return;let c=r>0;t.toggleAttribute("hidden",!c),t.setAttribute("aria-busy",c?"true":"false")}function i(){r+=1,e("start count=%d",r),o()}function l(){let c=r;r=Math.max(0,r-1),c<=0?e("done called but count was already %d",c):e("done count=%d\u2192%d",c,r),o()}function a(c){return async(h,b)=>{let v=s++,$=Date.now();n.set(v,{type:h,start_ts:$}),e("request start id=%d type=%s count=%d",v,h,r+1),i();let E=!1,A=()=>{E||(E=!0,n.delete(v),l())},P=setTimeout(()=>{E||(e("request TIMEOUT id=%d type=%s elapsed=%dms",v,h,Date.now()-$),A())},3e4);try{let q=await c(h,b),B=Date.now()-$;return e("request done id=%d type=%s elapsed=%dms",v,h,B),q}catch(q){let B=Date.now()-$;throw e("request error id=%d type=%s elapsed=%dms err=%o",v,h,B,q),q}finally{clearTimeout(P),A()}}}return o(),{wrapSend:a,start:i,done:l,getCount:()=>r,getActiveRequests:()=>{let c=Date.now();return Array.from(n.entries()).map(([f,h])=>({id:f,type:h.type,elapsed_ms:c-h.start_ts}))}}}function te(t,e="info",r=2800){let n=document.createElement("div");n.className="toast",n.textContent=t,n.style.position="fixed",n.style.right="12px",n.style.bottom="12px",n.style.zIndex="1000",n.style.color="#fff",n.style.padding="8px 10px",n.style.borderRadius="4px",n.style.fontSize="12px",e==="success"?n.style.background="#156d36":e==="warning"?n.style.background="#a36a00":e==="error"?n.style.background="#9f2011":n.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(n),setTimeout(()=>{try{n.remove()}catch{}},r)}function Yr(t=void 0,e=void 0){function r(){if(!e||typeof e.get!="function")return null;let o=e.get();return o&&o.order?o.order:{}}function n(o,i,l){let a=t&&t.snapshotFor?t.snapshotFor(o).slice():[];if(i==="closed")return a.sort(Xs),a;switch(l){case"created_desc":return a.sort(jt),a;case"created_asc":return a.sort(Vs),a;case"updated_desc":return a.sort(Ks),a;case"priority":return a.sort(Zs),a;case"manual":default:{let c=r();return c?a.sort(Gr(c)):a.sort(jt),a}}}function s(o){let i=[];return t&&typeof t.subscribe=="function"&&i.push(t.subscribe(o)),e&&typeof e.subscribe=="function"&&i.push(e.subscribe(o)),()=>{for(let l of i)try{l()}catch{}}}return{selectBoardColumn:n,subscribe:s}}function Ot(t){if(!t)return null;if(typeof t=="number")return Number.isFinite(t)?t:null;let e=Date.parse(t);return Number.isFinite(e)?e:null}function it(t){let e=Ot(t);if(e===null)return"";let r=new Date(e),n=s=>String(s).padStart(2,"0");return`${r.getFullYear()}-${n(r.getMonth()+1)}-${n(r.getDate())} ${n(r.getHours())}:${n(r.getMinutes())}`}function bt(t,e){let r=Ot(t);if(r===null)return"";let s=(typeof e=="number"?e:Date.now())-r;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let i=Math.floor(s/36e5);if(i<24)return`${i}\uC2DC\uAC04 \uC804`;let l=Math.floor(s/864e5);if(l<7)return`${l}\uC77C \uC804`;let a=Math.floor(l/7);if(l<30)return`${a}\uC8FC \uC804`;let c=Math.floor(l/30);return c<12?`${c}\uAC1C\uC6D4 \uC804`:`${Math.floor(l/365)}\uB144 \uC804`}function lr(t){if(!Array.isArray(t))return null;let e=null,r=-1;for(let n of t){if(!n||n.status!=="in_progress")continue;let s=Ot(n.updated_at)??0;if(e===null||s>r){e=n,r=s;continue}s===r&&String(n.id)<String(e.id)&&(e=n)}return e}function Vr(t){let e=t.transport,r=t.uiOrderStore;function n(i,l){return"renormalize"in i?i.renormalize:[{bead_id:l,rank:i.rank}]}function s(i,l){let a={...i.order};for(let c of l)a[c.bead_id]=c.rank;r&&r.set({revision:i.revision,order:a})}async function o(i,l,a){if(!e||!r)return;let c=r.get()||{revision:0,order:{}},f=n(Tn(l,a,c.order),i);s(c,f);let h=await e("ui-order-set",{expected_revision:c.revision,entries:f});if(h&&h.conflict){let b={revision:typeof h.revision=="number"?h.revision:0,order:h.order||{}};r.set(b);let v=n(Tn(l,a,b.order),i);s(b,v);let $=await e("ui-order-set",{expected_revision:b.revision,entries:v});$&&$.applied&&r.set({revision:typeof $.revision=="number"?$.revision:0,order:$.order||{}})}else h&&h.applied&&r.set({revision:typeof h.revision=="number"?h.revision:0,order:h.order||{}})}return{applyReorder:o}}function Kr(t){return Array.isArray(t)?t.filter(e=>typeof e=="string"):[]}function Cn(t,e){return!e||typeof t!="string"||t.length===0||Kr(e.visible_labels).includes(t)?!0:Kr(e.hidden_labels).includes(t)?!1:!Kr(e.hidden_prefixes).some(r=>r.length>0&&t.startsWith(r))}function ao(t,e){return Kr(t).filter(r=>Cn(r,e))}function Yt(t,e){let r=t&&t.chips?t.chips[e]:void 0;return typeof r=="boolean"?r:!0}var ka={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg"},lo={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge"},ya={spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},va={review:"\u2713",skip:"\u2298"},cr={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function $a(t,e,r){if(!(r==="in_progress"||r==="resolved"))return null;for(let s of t){let o=e[s];if(o&&o.fill==="dim"&&o.stale!==!0)return s}return null}function xa(t){let e=t&&t.fill||"none";return e==="none"?cr.none:t&&t.stale===!0?cr.stale:e==="dim"?cr.dim:t&&t.glyph==="review"?cr.review:t&&t.glyph==="skip"?cr.skip:cr.done}function Sa(t,e,r){let n=ka[t]||t,s=e&&e.fill||"none",o=!!e&&e.stale===!0,i=va[e&&e.glyph||""]||"",l="bar";s==="dim"?l+=` b-${n} dim`:s==="full"&&(l+=` b-${n} full`),o&&(l+=" stale"),r&&(l+=" cur");let a=s==="none"?"lbl":`lbl l-${n} on`,c=r?`color: var(--stage-${n}-on)`:"";return d`
    <div class="seg">
      <div class=${l} style=${c}>${i}</div>
      <div class=${a}>
        ${lo[t]||t}
      </div>
    </div>
  `}function Zr(t,e){if(!t||!t.stages)return"";let r=t.route==="full_plan"?"full_plan":"spec_backed",n=ya[r],s=t.stages,o=$a(n,s,String(e||"open")),i=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${n.map(l=>`${lo[l]||l} ${xa(s[l]||{})}`).join(" \xB7 ")}`;return d`
    <div class="stp" role="img" aria-label=${i}>
      ${n.map(l=>Sa(l,s[l]||{},l===o))}
    </div>
  `}function Ta(t){return typeof t!="number"||!Number.isFinite(t)?"":`P${Math.max(0,Math.min(4,t))}`}var co=2;function Aa(t){if(!t)return[];let e=[];if(t.external){let n=t.reason?`\u23F8 blocked: ${t.reason}`:"\u23F8 blocked";e.push(d`<span class="ctl-chip ctl-chip--blocked">${n}</span>`)}let r=Array.isArray(t.blockers)?t.blockers:[];if(r.length>0){let n=r.slice(0,co).join(", "),s=r.length-co,o=`\u26D3 blocked: ${n}${s>0?` +${s}`:""}`;e.push(d`<span class="ctl-chip ctl-chip--blocked-dep">${o}</span>`)}return e}function Ea(t,e){let r=e.policy||null,n=t.workflow&&t.workflow.chips||{},s=[];if(n.route&&Yt(r,"route")){let o=n.route_source==="derived";s.push(d`<span
        class="ctl-chip ctl-chip--route${o?" is-derived":""}"
        title=${o?"route \uCD94\uB860\uAC12 (metadata \uBBF8\uD540)":"route"}
        >${o?`${n.route} ?`:n.route}</span
      >`)}if(n.fast_track&&Yt(r,"fast_track")&&s.push(d`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),n.pr&&Yt(r,"pr")){let o=n.pr.number;s.push(d`<span class="ctl-chip ctl-chip--pr"
        >${`PR${o!=null?` #${o}`:""}`}</span
      >`)}for(let o of ao(t.labels,r))s.push(d`<span class="ctl-chip ctl-chip--label">${o}</span>`);return t.from_id&&Yt(r,"from")&&s.push(d`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${t.from_id} \uC5F4\uAE30`}
        @click=${o=>{o.stopPropagation(),e.onFromChipClick&&e.onFromChipClick(o,String(t.from_id))}}
      >
        ↩ from ${t.from_id}
      </button>`),Yt(r,"blocked")&&s.push(...Aa(t.blocked_info)),s.length===0?"":d`<div class="board-card__chips">${s}</div>`}function Ca(t){switch(t){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function Ra(t){let e=bt(t.created_at),r=bt(t.updated_at);return!e&&!r?"":d`<span class="board-card__times">
    ${e?d`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${it(t.created_at)}`}
          >생성 ${e}</span
        >`:""}
    ${e&&r?d`<span class="board-card__time-sep">·</span>`:""}
    ${r?d`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${it(t.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </span>`}function Ia(t,e){let r=e.rollupFor?e.rollupFor(t.id):{total:0,count:0,current:null,children:[]},n=r.total||0,s=e.isExpanded?e.isExpanded(t.id):!0,o=n>0?r.children.slice().sort(Qs):r.children;return d`
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
        ${Ra(t)}
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
                  <span class=${Ca(i.status)}>●</span>
                  <span class="board-card__roll-child-ord">${l+1}</span>
                  <span class="board-card__roll-child-title"
                    >${i.title||i.id}</span
                  >
                </button>`)}
          </div>`:""}
    </div>
  `}function uo(t,e){let r=Ta(t.priority);return d`
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
      ${Ea(t,e)}
      ${t.workflow&&Yt(e.policy||null,"stepper")?Zr(t.workflow,t.status):""}
      ${Ia(t,e)}
    </article>
  `}function Vt(t,e){let r=Array.isArray(t.items)?t.items.length:0,n=t.is_closed===!0;return d`
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
              ${vr.map(o=>d`<option
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
        ${t.items.map(o=>uo(o,e))}
      </div>
    </section>
  `}var La=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],Da=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],Oa=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function Ma(t,e,r){let n=t.labels.length,s=n>0?`\uB77C\uBCA8 ${n}`:"\uB77C\uBCA8";return d`
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
  `}function po(t,e,r){return d`
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
        ${La.map(n=>d`<option
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
        ${Da.map(n=>d`<option
              value=${n.value}
              ?selected=${t.type===n.value}
            >
              ${n.label}
            </option>`)}
      </select>
      ${Ma(t,e,r)}
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
        ${Oa.map(n=>d`<option
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
  `}var Na=200,Pa={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","deferred-col":"deferred","closed-col":"closed"},Fa=new Set(["blocked-col","ready-col","in-progress-col","resolved-col","deferred-col"]),fo="beads-ui.board.sort",ho=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function qa(){try{let t=window.localStorage.getItem(fo);if(t&&ho.has(t))return t}catch{}return"created_desc"}function _o(t,e){let r=Le("views:board"),n=e.gotoIssue,s=e.issueStores,o=e.transport,i=e.uiOrderStore,l=e.displayPolicyStore,a=e.onClosedRangeChange,c=e.onNewIssue,f=e.closedRange||Dt,h=s?Yr(s,i):null,b=Vr({transport:o,uiOrderStore:i}),v=[],$=[],E=[],A=[],P=[],q=[],B=!1,C=0,S=qa(),T=new Map,D=new Map,y=new Map,G=new Set,j={search:"",priority:"",type:"",labels:[]},V=!1,se=null;function Ce(I){return String(I.status||"open")==="open"}function Ue(I){let F=String(I.status||"open");return F==="open"||F==="blocked"}function ye(I){let F=j.search.trim().toLowerCase(),J=j.priority,Y=j.type,ee=j.labels;return I.filter(de=>{if(F){let fe=String(de.id||"").toLowerCase(),we=String(de.title||"").toLowerCase();if(!fe.includes(F)&&!we.includes(F))return!1}if(J!==""&&String(de.priority)!==J||Y!==""&&String(de.issue_type||"")!==Y)return!1;if(ee.length>0){let fe=Array.isArray(de.labels)?de.labels:[];if(!ee.some(we=>fe.includes(we)))return!1}return!0})}function re(){let I=new Set;for(let F of[v,$,E,A,P,q])for(let J of F){let Y=Array.isArray(J.labels)?J.labels:[];for(let ee of Y)typeof ee=="string"&&ee.length>0&&I.add(ee)}return Array.from(I).sort()}function O(){return j.search.trim()!==""||j.priority!==""||j.type!==""||j.labels.length>0}function U(){try{if(h){let I=h.selectBoardColumn("tab:board:in-progress","in_progress",S),F=h.selectBoardColumn("tab:board:blocked","blocked",S).filter(Ue),J=new Set(I.map(x=>x.id)),Y=h.selectBoardColumn("tab:board:ready","ready",S).filter(x=>Ce(x)&&!J.has(x.id)),ee=h.selectBoardColumn("tab:board:resolved","resolved",S),de=h.selectBoardColumn("tab:board:deferred","deferred",S),fe=B?de:[],we=h.selectBoardColumn("tab:board:closed","closed").slice(0,Na),ne=[...F,...Y,...I,...ee,...fe,...we];K(ne);let w=new Set;for(let x of ne)x&&x.id&&!Rn(x)&&w.add(x.id);let N=!O();v=N?dr(F,w):F,$=N?dr(Y,w):Y,E=N?dr(I,w):I,A=N?dr(ee,w):ee,P=N?dr(fe,w):fe,C=de.length,q=N?dr(we,w):we,T=new Map;for(let x of v)T.set(x.id,"open");for(let x of $)T.set(x.id,"open");for(let x of E)T.set(x.id,"in_progress");for(let x of A)T.set(x.id,"resolved");for(let x of P)T.set(x.id,"deferred");for(let x of q)T.set(x.id,"closed");D=new Map;for(let x of v)D.set(x.id,"blocked-col");for(let x of $)D.set(x.id,"ready-col");for(let x of E)D.set(x.id,"in-progress-col");for(let x of A)D.set(x.id,"resolved-col");for(let x of P)D.set(x.id,"deferred-col");for(let x of q)D.set(x.id,"closed-col")}Ie()}catch{v=[],$=[],E=[],A=[],P=[],q=[],y=new Map,Ie()}}function K(I){let F=new Map;for(let Y of I)Y&&Y.id&&!F.has(Y.id)&&F.set(Y.id,Y);let J=new Map;for(let Y of F.values()){let ee=Rn(Y);if(!ee)continue;let de=J.get(ee);de||(de=[],J.set(ee,de)),de.push({id:Y.id,title:Y.title,status:Y.status,metadata:Y.metadata,created_at:Y.created_at,updated_at:Y.updated_at})}y=J}function Re(I){let F=y.get(I)||[],J=0;for(let ee of F)(ee.status==="resolved"||ee.status==="closed")&&(J+=1);let Y=lr(F);return{total:F.length,count:J,current:Y,children:F}}function oe(I){return!G.has(I)}function Te(I,F){I.preventDefault(),I.stopPropagation(),G.has(F)?G.delete(F):G.add(F),Ie()}function ce(I,F){I.preventDefault(),I.stopPropagation(),n(F)}function Ne(I,F){I.preventDefault(),I.stopPropagation(),n(F)}function me(I,F){se||n(F)}function Pe(I,F){I.preventDefault(),I.stopPropagation(),Ba(F).then(J=>{J&&te("\uBCF5\uC0AC\uB428","success",1200)})}function ut(I,F){se=F,I.dataTransfer&&(I.dataTransfer.setData("text/plain",F),I.dataTransfer.effectAllowed="move"),I.target.classList.add("board-card--dragging")}function Ze(I){I.target.classList.remove("board-card--dragging"),ht(),setTimeout(()=>{se=null},0)}function xt(I){let F=String(I.target.value||"");!F||F===f||(f=F,a&&a(F),Ie())}let Ye={onCardClick:me,onCopyId:Pe,onDragStart:ut,onDragEnd:Ze,onClosedRangeChange:xt,rollupFor:Re,isExpanded:oe,onRollupToggle:Te,onChildClick:ce,onFromChipClick:Ne,get policy(){return l?l.get():null}};function pt(I){let F=I.target,J=t.querySelector(".board-filter__labels");F&&J&&J.contains(F)||et()}function Je(I){I.key==="Escape"&&et()}function Xe(){V||(V=!0,document.addEventListener("mousedown",pt),document.addEventListener("keydown",Je),Ie())}function et(){V&&(V=!1,document.removeEventListener("mousedown",pt),document.removeEventListener("keydown",Je),Ie())}let Ve={onSearchInput(I){j.search=String(I.target.value||""),U()},onPriorityChange(I){j.priority=String(I.target.value||""),U()},onTypeChange(I){j.type=String(I.target.value||""),U()},onSortChange(I){let F=String(I.target.value||"");if(!(!ho.has(F)||F===S)){S=F;try{window.localStorage.setItem(fo,F)}catch{}U()}},onDeferredToggle(){B=!B,U()},onLabelMenuToggle(){V?et():Xe()},onLabelToggle(I){let F=j.labels.indexOf(I);F===-1?j.labels.push(I):j.labels.splice(F,1),U()},onLabelClear(){j.labels.length!==0&&(j.labels=[],U())},onNewIssue(){c&&c()}};function Ge(){let I=B?"board-root board-root--deferred":"board-root";return d`
      <div class="board-view">
        ${po(j,Ve,{sort_mode:S,show_deferred:B,deferred_count:C,label_options:re(),label_menu_open:V})}
        <div class=${I}>
          ${Vt({title:"Blocked",id:"blocked-col",items:ye(v)},Ye)}
          ${Vt({title:"Ready",id:"ready-col",items:ye($)},Ye)}
          ${Vt({title:"In progress",id:"in-progress-col",items:ye(E)},Ye)}
          ${Vt({title:"Resolved",id:"resolved-col",items:ye(A)},Ye)}
          ${B?Vt({title:"Deferred",id:"deferred-col",items:ye(P)},Ye):""}
          ${Vt({title:"Closed",id:"closed-col",items:ye(q),is_closed:!0,closed_range:f},Ye)}
        </div>
      </div>
    `}function Ie(){be(Ge(),t),De()}function De(){try{let I=Array.from(t.querySelectorAll(".board-column"));for(let F of I)Array.from(F.querySelectorAll(".board-card")).forEach((Y,ee)=>{Y.tabIndex=ee===0?0:-1})}catch{}}async function tt(I,F){if(!o){te("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:I,status:F}),te("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(J){r("update-status failed: %o",J),te("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function rt(I){switch(I){case"blocked-col":return v;case"ready-col":return $;case"in-progress-col":return E;case"resolved-col":return A;case"deferred-col":return P;default:return[]}}function nt(I,F,J){if(!o||!i)return;let Y=rt(I),ee=Y.find(w=>w.id===F);if(!ee)return;let de=Y.filter(w=>w.id!==F),fe=J.closest?J.closest(".board-card"):null,we=de.length;if(fe){let w=fe.getAttribute("data-issue-id");if(w===F)return;let N=de.findIndex(x=>x.id===w);N>=0&&(we=N)}let ne=de.slice();ne.splice(we,0,ee),b.applyReorder(F,ne,we)}function ht(){for(let I of Array.from(t.querySelectorAll(".board-column--drag-over")))I.classList.remove("board-column--drag-over")}let Me=null;t.addEventListener("dragover",I=>{I.preventDefault(),I.dataTransfer&&(I.dataTransfer.dropEffect="move");let J=I.target.closest(".board-column");J&&J!==Me&&(Me&&Me.classList.remove("board-column--drag-over"),J.classList.add("board-column--drag-over"),Me=J)}),t.addEventListener("dragleave",I=>{let F=I.relatedTarget;(!F||!t.contains(F))&&Me&&(Me.classList.remove("board-column--drag-over"),Me=null)}),t.addEventListener("drop",I=>{I.preventDefault(),Me&&(Me.classList.remove("board-column--drag-over"),Me=null);let F=I.target,J=F.closest(".board-column");if(!J)return;let Y=I.dataTransfer?.getData("text/plain")||"";if(!Y)return;let ee=J.id,de=D.get(Y);if(de&&de===ee){if(Fa.has(ee)){if(S!=="manual"){te("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}nt(ee,Y,F)}return}let fe=Pa[ee];if(!fe){te("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}T.get(Y)!==fe&&tt(Y,fe)}),t.addEventListener("keydown",I=>{let F=I.target;if(!(F instanceof HTMLElement))return;let J=String(F.tagName||"").toLowerCase();if(J==="input"||J==="textarea"||J==="select"||J==="button"||J==="a"||F.isContentEditable===!0)return;let Y=F.closest(".board-card");if(!Y)return;let ee=String(I.key||"");if(ee==="Enter"||ee===" "){I.preventDefault();let ne=Y.getAttribute("data-issue-id");ne&&n(ne);return}if(ee!=="ArrowUp"&&ee!=="ArrowDown"&&ee!=="ArrowLeft"&&ee!=="ArrowRight")return;I.preventDefault();let de=Y.closest(".board-column");if(!de)return;let fe=Array.from(de.querySelectorAll(".board-card")),we=fe.indexOf(Y);if(ee==="ArrowDown"&&we<fe.length-1){_t(Y,fe[we+1]);return}if(ee==="ArrowUp"&&we>0){_t(Y,fe[we-1]);return}if(ee==="ArrowLeft"||ee==="ArrowRight"){let ne=Array.from(t.querySelectorAll(".board-column")),w=ne.indexOf(de),N=ee==="ArrowRight"?1:-1,x=w+N;for(;x>=0&&x<ne.length;){let Z=ne[x].querySelector(".board-card");if(Z){_t(Y,Z);return}x+=N}}});function _t(I,F){try{I.tabIndex=-1,F.tabIndex=0,F.focus()}catch{}}let he=null;h&&h.subscribe&&(he=h.subscribe(()=>{try{U()}catch{}}));let Fe=null;return l&&l.subscribe&&(Fe=l.subscribe(()=>{try{U()}catch{}})),{async load(){r("load"),U()},clear(){et(),he&&(he(),he=null),Fe&&(Fe(),Fe=null),t.replaceChildren(),v=[],$=[],E=[],A=[],P=[],q=[],T=new Map,D=new Map}}}function Rn(t){let e=t&&t.parent;return typeof e=="string"?e:e&&e.id?String(e.id):""}function dr(t,e){return t.filter(r=>{let n=Rn(r);return!(n&&e.has(n))})}async function Ba(t){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(t)),!0;let e=document.createElement("textarea");e.value=String(t),e.style.position="fixed",e.style.left="-9999px",document.body.appendChild(e),e.select();let r=!1;try{r=document.execCommand("copy")}finally{e.remove()}return r}catch{return!1}}async function Kt(t){let e=String(t);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(e),!0}catch{}try{let r=document.createElement("textarea");r.value=e,r.style.position="fixed",r.style.left="-9999px",document.body.appendChild(r),r.select();let n=!1;try{n=document.execCommand("copy")}finally{r.remove()}return n}catch{return!1}}var Ua="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function Zt(t){return typeof t=="number"&&Number.isFinite(t)?t:0}var ur=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"];function go(t){let e=0;for(let r of ur)e+=Zt(t?.[r]);return e}function mo(t){return!t||typeof t!="object"?!1:ur.some(e=>Number.isFinite(t[e]))}function za(t){return t>=1e6?`${(t/1e6).toFixed(1)}M`:t>=1e3?`${(t/1e3).toFixed(1)}k`:String(t)}function pr(t){return mo(t)?`\u03C4 ${za(go(t))}`:null}function Mt(t){let e=pr(t);if(!e)return null;let r=t?.total_cost_usd;return typeof r=="number"&&Number.isFinite(r)?`${e} \xB7 $${r.toFixed(2)}`:e}function fr(t){if(!t||typeof t!="object")return"";let e=[`\uC785\uB825 ${Zt(t.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Zt(t.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${Zt(t.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Zt(t.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&e.push(`$${t.total_cost_usd.toFixed(2)}`);let r=[`\uCD1D ${go(t).toLocaleString("en-US")}`,e.join(" \xB7 ")];return t.replayed&&r.push(Ua),r.join(`
`)}function Nt(t,e){let r={input_tokens:0,output_tokens:0,cache_read_input_tokens:0,cache_creation_input_tokens:0},n=0,s=0,o=0,i=!1;for(let l of Object.values(t||{})){if(!l||l.bead_id!==e)continue;let a=l.usage;if(mo(a)){n+=1;for(let c of ur)r[c]=Zt(r[c])+Zt(a[c]);typeof a.total_cost_usd=="number"&&Number.isFinite(a.total_cost_usd)&&(s+=a.total_cost_usd,o+=1),a.replayed===!0&&(i=!0)}}return n===0?null:(o===n&&(r.total_cost_usd=s),i&&(r.replayed=!0),r)}var Ha={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},Wa=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,Ga=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function Pt(t){return!!t&&typeof t=="object"}function In(t){return typeof t!="string"||t.length===0?[]:t.split(/\r?\n/)}function bo(t,e){let r=In(t),n=In(e),s=new Map;for(let l of r)s.set(l,(s.get(l)||0)+1);let o=0;for(let l of n){let a=s.get(l)||0;a>0?s.set(l,a-1):o+=1}let i=0;for(let l of s.values())i+=l;return{added:o,removed:i}}function ja(t){let e="";typeof t=="string"?e=t:Array.isArray(t)?e=t.map(s=>Pt(s)&&typeof s.text=="string"?s.text:"").join(""):Pt(t)&&typeof t.text=="string"&&(e=t.text);let n=(String(e).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return n.length>120?`${n.slice(0,117)}\u2026`:n}function Ya(t){let e=String(t.name||""),r=t.input||{},n={kind:"tool",tool:e,icon:Ha[e]||"\u{1F527}",input:r,expandable:!0};if((e==="Read"||e==="Write")&&(n.path=String(r.file_path||r.path||"")),e==="Write"&&(n.added=In(r.content).length),e==="Edit"){n.path=String(r.file_path||r.path||"");let{added:s,removed:o}=bo(r.old_string,r.new_string);n.added=s,n.removed=o}if(e==="MultiEdit"){n.path=String(r.file_path||r.path||"");let s=0,o=0,i=Array.isArray(r.edits)?r.edits:[];for(let l of i){let a=bo(Pt(l)?l.old_string:"",Pt(l)?l.new_string:"");s+=a.added,o+=a.removed}n.added=s,n.removed=o}return e==="Bash"&&(n.command=String(r.command||"")),(e==="Grep"||e==="Glob")&&(n.command=String(r.pattern||r.query||"")),n}function wo(t){let e=t.split(/\r?\n/).find(n=>n.trim().length>0)||"",r=Wa.exec(e);return r?{kind:"gate",gate:r[2]==="implementation"?"impl":r[2],reviewer:r[3],verdict:r[4],time:r[5]?r[5].trim():void 0,text:e.trim()}:Ga.test(e)&&e.trim().length<=80?{kind:"phase",text:e.trim()}:{kind:"assistant",text:t}}function Va(t,e){if(t.type==="assistant"){let r=t.message,n=r&&Array.isArray(r.content)?r.content:[],s=[];for(let o of n)if(Pt(o)){if(o.type==="text"&&typeof o.text=="string")s.push(wo(o.text));else if(o.type==="tool_use"){let i=Ya(o);typeof o.id=="string"&&e.set(o.id,i),s.push(i)}}return s}if(t.type==="user"){let r=t.message,n=r&&Array.isArray(r.content)?r.content:[];for(let s of n)if(Pt(s)&&s.type==="tool_result"){let o=e.get(String(s.tool_use_id));if(o){let i=ja(s.content);o.result=i,o.output=typeof s.content=="string"?s.content:i}}return[]}if(t.type==="result"){let r=t.is_error===!1&&t.subtype==="success";return[{kind:"result",success:r,text:typeof t.result=="string"?t.result:r?"DONE":""}]}return[]}function Ka(t){if(t.type==="item.completed"&&Pt(t.item)){let e=t.item;return e.type==="agent_message"&&typeof e.text=="string"?[wo(e.text)]:e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}if(t.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(t.type==="turn.failed"){let e=t.error;return[{kind:"error",text:e&&typeof e.message=="string"?e.message:"turn failed"}]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:[]}function Za(t){let e=t.type;return typeof e=="string"&&(e==="error"||e.startsWith("thread.")||e.startsWith("turn.")||e.startsWith("item."))}function ko(t){let e=[],r=new Map,n=Array.isArray(t)?t:[];for(let s of n){let o=s;if(typeof s=="string"){let l=s.trim();if(l.length===0)continue;try{o=JSON.parse(l)}catch{continue}}if(!Pt(o))continue;let i=Za(o)?Ka(o):Va(o,r);for(let l of i)e.push(l)}return e}var Xa=5;function Qa(t,e){if(typeof t!="number")return"";let r=Math.max(0,Math.floor((e-t)/1e3));return r<60?`${r}\uCD08 \uC804`:bt(t,e)}function Xr(t,e={}){let{transport:r,sessionLogStore:n,onClose:s}=e,o=null,i={},l=!0,a=new Set,c=new Set,f=null,h=null;function b(){if(!o||!n)return[];let O=n.get(o);return ko(O?O.lines:[])}function v(){if(!o||!n)return null;let O=n.get(o),U=O?O.last_event_at:null;return typeof U=="number"?U:null}function $(){return i.status==="running"}function E(){if($()&&o){h||(h=setInterval(()=>y(),1e3));return}A()}function A(){h&&(clearInterval(h),h=null)}function P(O){let U=[],K=0;for(;K<O.length;){let Re=O[K];if(Re.kind==="tool"){let oe=K;for(;oe<O.length&&O[oe].kind==="tool"&&O[oe].tool===Re.tool;)oe+=1;if(oe-K>=Xa&&!c.has(K)){U.push({kind:"group",idx:K,tool:Re.tool||"",lines:O.slice(K,oe).map((Te,ce)=>({idx:K+ce,line:Te}))}),K=oe;continue}}U.push({kind:"line",idx:K,line:Re}),K+=1}return U}function q(O){for(let U=O.length-1;U>=0;U-=1){let K=O[U];if(K.kind==="result"||K.kind==="error")return null;if(K.kind==="tool"&&!Object.hasOwn(K,"result"))return K}return null}function B(O,U){if(U.kind==="gate")return d`<div class="sv__gate">${U.text}</div>`;if(U.kind==="phase")return d`<div class="sv__phase">${U.text}</div>`;if(U.kind==="result")return d`<div
        class="sv__result${U.success?" sv__result--ok":" sv__result--fail"}"
      >
        ${U.success?"\u2713":"\u2717"}
        ${U.text||(U.success?"DONE":"\uC2E4\uD328")}
      </div>`;if(U.kind==="error")return d`<div class="sv__error">⛔ ${U.text}</div>`;if(U.kind==="blocker")return d`<div class="sv__error">⛔ ${U.text}</div>`;if(U.kind==="tool"){let K=a.has(O),Re=U.tool==="Bash"?U.command:U.path||U.command||"";return d`<div
        class="sv__tool${K?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>j(O)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${U.icon}</span>
          <span class="sv__tool-name">${U.tool}</span>
          ${Re?d`<span class="sv__tool-detail">${Re}</span>`:""}
          ${typeof U.added=="number"?d`<span class="sv__diff-add">+${U.added}</span>`:""}
          ${typeof U.removed=="number"?d`<span class="sv__diff-del">−${U.removed}</span>`:""}
          ${U.result?d`<span class="sv__tool-ok">→ ${U.result}</span>`:""}
        </span>
        ${K?d`<pre class="sv__tool-expand">${C(U)}</pre>`:""}
      </div>`}return d`<div class="sv__as">${U.text}</div>`}function C(O){let U=[];if(O.input!==void 0)try{U.push(`input: ${JSON.stringify(O.input,null,2)}`)}catch{}return typeof O.output=="string"&&O.output.length>0&&U.push(`output:
${O.output}`),U.join(`

`)}function S(){if(!o)return d``;let O=b(),U=[i.runner,i.model,i.effort].filter(Boolean).join(" \xB7 "),K=i.session_id||"",Re=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${l?"ON":"OFF"}`,oe=$(),Te=oe?Qa(v(),Date.now()):"",ce=oe?q(O):null;return d`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id">${o}</span>
        ${oe?d`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${Te?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${Te}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${Te?d`<span class="sv__live-ago">${Te}</span>`:""}</span
            >`:""}
        ${K?d`<button
              type="button"
              class="sv__session"
              title=${K}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${K}`}
              @click=${()=>se(K)}
            >
              ⧉ ${K.slice(0,8)}
            </button>`:""}
        ${U?d`<span class="sv__meta">${U}</span>`:""}
        ${i.worktree?d`<span class="sv__wt" title=${i.worktree}
              >${i.worktree}</span
            >`:""}
        <button
          type="button"
          class="sv__follow${l?" sv__follow--on":""}"
          aria-pressed=${l?"true":"false"}
          aria-label=${Re}
          @click=${V}
        >
          <span class="sv__follow-full">⇣ ${Re}</span>
          <span class="sv__follow-short">⇣ ${l?"ON":"OFF"}</span>
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
      <div class="sv__body">
        ${O.length===0?d`<div class="sv__empty">세션 로그 없음</div>`:P(O).map(Ne=>Ne.kind==="group"?T(Ne):B(Ne.idx,Ne.line))}
      </div>
      ${ce?d`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            <span class="sv__now-icon">${ce.icon}</span>
            <span class="sv__now-name">${ce.tool}</span>
            <span class="sv__now-detail"
              >${ce.tool==="Bash"?ce.command:ce.path||ce.command||""}</span
            >
          </div>`:""}
    </div>`}function T(O){return d`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>D(O.idx)}
    >
      <span class="sv__group-icon">${O.lines[0].line.icon}</span>
      <span class="sv__group-name">${O.tool}</span>
      <span class="sv__group-count">${O.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function D(O){c.add(O),y()}function y(){be(S(),t),E(),l&&G()}function G(){let O=t.querySelector(".sv__body");O&&(O.scrollTop=O.scrollHeight)}function j(O){a.has(O)?a.delete(O):a.add(O),y()}function V(){l=!l,y()}function se(O){Kt(O).then(U=>{U?te("\uBCF5\uC0AC\uB428","success",1200):te("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function Ce(O){!o||!O||(i={...i,...O},y())}function Ue(O){let U=O.target;if(!U||!U.classList||!U.classList.contains("sv__body"))return;!(U.scrollHeight-U.scrollTop-U.clientHeight<=4)&&l&&(l=!1,y())}t.addEventListener("scroll",Ue,!0);function ye(O){let U=O&&O.attempt_id;U&&(o=U,i=O.meta||{},l=!0,a.clear(),c.clear(),!f&&n&&(f=n.subscribe(y)),r&&Promise.resolve(r("subscribe-session-log",{id:`session-log:${o}`,attempt_id:o})).catch(()=>{}),y())}function re(){let O=o;o=null,a.clear(),c.clear(),A(),r&&O&&Promise.resolve(r("unsubscribe-session-log",{id:`session-log:${O}`})).catch(()=>{}),be(d``,t),s&&s()}return{open:ye,updateMeta:Ce,close:re,isOpen(){return o!==null},destroy(){A(),f&&(f(),f=null),t.removeEventListener("scroll",Ue,!0),o=null,be(d``,t)}}}function Ja(t){let e=t&&t.metadata||{},r=[];return typeof e.spec_id=="string"&&e.spec_id.trim().length>0&&r.push({kind:"spec",path:e.spec_id.trim()}),typeof e.plan_path=="string"&&e.plan_path.trim().length>0&&r.push({kind:"plan",path:e.plan_path.trim()}),r}function yo(t,e){let r=Ja(t);return d`
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
  `}var Ln=["opus","sonnet","haiku","fable"],Dn=["low","medium","high","xhigh"],On=["codex","opus","fable","self","skip"],Mn=["opus","fable","sonnet","haiku"],el=["standard","fast_track"],Nn={orchestration_model:"(\uAE30\uBCF8: opus)",orchestration_effort:"(\uAE30\uBCF8: CLI \uAE30\uBCF8)",review_model:"(\uAE30\uBCF8: codex)",impl_model:"(\uAE30\uBCF8: \uD2F0\uC5B4 \uC790\uB3D9)"};function Qr(t,e){let r=e&&e[t];return typeof r=="string"&&r.length>0?`(\uAE30\uBCF8: ${r} \u2014 \uC804\uC5ED)`:Nn[t]||"(\uAE30\uBCF8)"}function $r(t,e,r,n,s,o){return d`
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
  `}function xr(t,e){let r=t.map(n=>({value:n,label:n}));return typeof e=="string"?[{value:"",label:e},...r]:r}function vo(t,e,r){let n=t&&t.metadata||{},s=r&&typeof r=="object"?r:{},o=n.workflow_mode==="fast_track"?"fast_track":"standard";return d`
    <div class="detail-section-label">실행 설정 (수정 가능)</div>
    ${$r("orchestration_model","orchestration_model",xr(Ln,Qr("orchestration_model",s)),n.orchestration_model||"",!1,e)}
    ${$r("orchestration_effort","orchestration_effort",xr(Dn,Qr("orchestration_effort",s)),n.orchestration_effort||"",!1,e)}
    ${$r("review_model","review_model",xr(On,Qr("review_model",s)),n.review_model||"",!1,e)}
    ${$r("impl_model","impl_model",xr(Mn,Qr("impl_model",s)),n.impl_model||"",!1,e)}
    ${$r("workflow_mode","workflow_mode",xr(el),o,n.workflow_mode==="fast_track",e)}
  `}var{entries:Io,setPrototypeOf:$o,isFrozen:tl,getPrototypeOf:rl,getOwnPropertyDescriptor:nl}=Object,{freeze:lt,seal:wt,create:Hn}=Object,{apply:Wn,construct:Gn}=typeof Reflect<"u"&&Reflect;lt||(lt=function(e){return e});wt||(wt=function(e){return e});Wn||(Wn=function(e,r){for(var n=arguments.length,s=new Array(n>2?n-2:0),o=2;o<n;o++)s[o-2]=arguments[o];return e.apply(r,s)});Gn||(Gn=function(e){for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return new e(...n)});var Jr=ct(Array.prototype.forEach),sl=ct(Array.prototype.lastIndexOf),xo=ct(Array.prototype.pop),Sr=ct(Array.prototype.push),ol=ct(Array.prototype.splice),tn=ct(String.prototype.toLowerCase),Pn=ct(String.prototype.toString),Fn=ct(String.prototype.match),Tr=ct(String.prototype.replace),il=ct(String.prototype.indexOf),al=ct(String.prototype.trim),yt=ct(Object.prototype.hasOwnProperty),at=ct(RegExp.prototype.test),Ar=ll(TypeError);function ct(t){return function(e){e instanceof RegExp&&(e.lastIndex=0);for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return Wn(t,e,n)}}function ll(t){return function(){for(var e=arguments.length,r=new Array(e),n=0;n<e;n++)r[n]=arguments[n];return Gn(t,r)}}function pe(t,e){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:tn;$o&&$o(t,null);let n=e.length;for(;n--;){let s=e[n];if(typeof s=="string"){let o=r(s);o!==s&&(tl(e)||(e[n]=o),s=o)}t[s]=!0}return t}function cl(t){for(let e=0;e<t.length;e++)yt(t,e)||(t[e]=null);return t}function Rt(t){let e=Hn(null);for(let[r,n]of Io(t))yt(t,r)&&(Array.isArray(n)?e[r]=cl(n):n&&typeof n=="object"&&n.constructor===Object?e[r]=Rt(n):e[r]=n);return e}function Er(t,e){for(;t!==null;){let n=nl(t,e);if(n){if(n.get)return ct(n.get);if(typeof n.value=="function")return ct(n.value)}t=rl(t)}function r(){return null}return r}var So=lt(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),qn=lt(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Bn=lt(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),dl=lt(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Un=lt(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),ul=lt(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),To=lt(["#text"]),Ao=lt(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),zn=lt(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Eo=lt(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),en=lt(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),pl=wt(/\{\{[\w\W]*|[\w\W]*\}\}/gm),fl=wt(/<%[\w\W]*|[\w\W]*%>/gm),hl=wt(/\$\{[\w\W]*/gm),_l=wt(/^data-[\-\w.\u00B7-\uFFFF]+$/),gl=wt(/^aria-[\-\w]+$/),Lo=wt(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),ml=wt(/^(?:\w+script|data):/i),bl=wt(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Do=wt(/^html$/i),wl=wt(/^[a-z][.\w]*(-[.\w]+)+$/i),Co=Object.freeze({__proto__:null,ARIA_ATTR:gl,ATTR_WHITESPACE:bl,CUSTOM_ELEMENT:wl,DATA_ATTR:_l,DOCTYPE_NAME:Do,ERB_EXPR:fl,IS_ALLOWED_URI:Lo,IS_SCRIPT_OR_DATA:ml,MUSTACHE_EXPR:pl,TMPLIT_EXPR:hl}),Cr={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},kl=function(){return typeof window>"u"?null:window},yl=function(e,r){if(typeof e!="object"||typeof e.createPolicy!="function")return null;let n=null,s="data-tt-policy-suffix";r&&r.hasAttribute(s)&&(n=r.getAttribute(s));let o="dompurify"+(n?"#"+n:"");try{return e.createPolicy(o,{createHTML(i){return i},createScriptURL(i){return i}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},Ro=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Oo(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:kl(),e=M=>Oo(M);if(e.version="3.3.0",e.removed=[],!t||!t.document||t.document.nodeType!==Cr.document||!t.Element)return e.isSupported=!1,e;let{document:r}=t,n=r,s=n.currentScript,{DocumentFragment:o,HTMLTemplateElement:i,Node:l,Element:a,NodeFilter:c,NamedNodeMap:f=t.NamedNodeMap||t.MozNamedAttrMap,HTMLFormElement:h,DOMParser:b,trustedTypes:v}=t,$=a.prototype,E=Er($,"cloneNode"),A=Er($,"remove"),P=Er($,"nextSibling"),q=Er($,"childNodes"),B=Er($,"parentNode");if(typeof i=="function"){let M=r.createElement("template");M.content&&M.content.ownerDocument&&(r=M.content.ownerDocument)}let C,S="",{implementation:T,createNodeIterator:D,createDocumentFragment:y,getElementsByTagName:G}=r,{importNode:j}=n,V=Ro();e.isSupported=typeof Io=="function"&&typeof B=="function"&&T&&T.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:se,ERB_EXPR:Ce,TMPLIT_EXPR:Ue,DATA_ATTR:ye,ARIA_ATTR:re,IS_SCRIPT_OR_DATA:O,ATTR_WHITESPACE:U,CUSTOM_ELEMENT:K}=Co,{IS_ALLOWED_URI:Re}=Co,oe=null,Te=pe({},[...So,...qn,...Bn,...Un,...To]),ce=null,Ne=pe({},[...Ao,...zn,...Eo,...en]),me=Object.seal(Hn(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Pe=null,ut=null,Ze=Object.seal(Hn(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),xt=!0,Ye=!0,pt=!1,Je=!0,Xe=!1,et=!0,Ve=!1,Ge=!1,Ie=!1,De=!1,tt=!1,rt=!1,nt=!0,ht=!1,Me="user-content-",_t=!0,he=!1,Fe={},I=null,F=pe({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),J=null,Y=pe({},["audio","video","img","source","image","track"]),ee=null,de=pe({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),fe="http://www.w3.org/1998/Math/MathML",we="http://www.w3.org/2000/svg",ne="http://www.w3.org/1999/xhtml",w=ne,N=!1,x=null,Z=pe({},[fe,we,ne],Pn),qe=pe({},["mi","mo","mn","ms","mtext"]),u=pe({},["annotation-xml"]),m=pe({},["title","style","font","a","script"]),R=null,ie=["application/xhtml+xml","text/html"],$e="text/html",le=null,ve=null,Ae=r.createElement("form"),Ke=function(p){return p instanceof RegExp||p instanceof Function},ae=function(){let p=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(ve&&ve===p)){if((!p||typeof p!="object")&&(p={}),p=Rt(p),R=ie.indexOf(p.PARSER_MEDIA_TYPE)===-1?$e:p.PARSER_MEDIA_TYPE,le=R==="application/xhtml+xml"?Pn:tn,oe=yt(p,"ALLOWED_TAGS")?pe({},p.ALLOWED_TAGS,le):Te,ce=yt(p,"ALLOWED_ATTR")?pe({},p.ALLOWED_ATTR,le):Ne,x=yt(p,"ALLOWED_NAMESPACES")?pe({},p.ALLOWED_NAMESPACES,Pn):Z,ee=yt(p,"ADD_URI_SAFE_ATTR")?pe(Rt(de),p.ADD_URI_SAFE_ATTR,le):de,J=yt(p,"ADD_DATA_URI_TAGS")?pe(Rt(Y),p.ADD_DATA_URI_TAGS,le):Y,I=yt(p,"FORBID_CONTENTS")?pe({},p.FORBID_CONTENTS,le):F,Pe=yt(p,"FORBID_TAGS")?pe({},p.FORBID_TAGS,le):Rt({}),ut=yt(p,"FORBID_ATTR")?pe({},p.FORBID_ATTR,le):Rt({}),Fe=yt(p,"USE_PROFILES")?p.USE_PROFILES:!1,xt=p.ALLOW_ARIA_ATTR!==!1,Ye=p.ALLOW_DATA_ATTR!==!1,pt=p.ALLOW_UNKNOWN_PROTOCOLS||!1,Je=p.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Xe=p.SAFE_FOR_TEMPLATES||!1,et=p.SAFE_FOR_XML!==!1,Ve=p.WHOLE_DOCUMENT||!1,De=p.RETURN_DOM||!1,tt=p.RETURN_DOM_FRAGMENT||!1,rt=p.RETURN_TRUSTED_TYPE||!1,Ie=p.FORCE_BODY||!1,nt=p.SANITIZE_DOM!==!1,ht=p.SANITIZE_NAMED_PROPS||!1,_t=p.KEEP_CONTENT!==!1,he=p.IN_PLACE||!1,Re=p.ALLOWED_URI_REGEXP||Lo,w=p.NAMESPACE||ne,qe=p.MATHML_TEXT_INTEGRATION_POINTS||qe,u=p.HTML_INTEGRATION_POINTS||u,me=p.CUSTOM_ELEMENT_HANDLING||{},p.CUSTOM_ELEMENT_HANDLING&&Ke(p.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(me.tagNameCheck=p.CUSTOM_ELEMENT_HANDLING.tagNameCheck),p.CUSTOM_ELEMENT_HANDLING&&Ke(p.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(me.attributeNameCheck=p.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),p.CUSTOM_ELEMENT_HANDLING&&typeof p.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(me.allowCustomizedBuiltInElements=p.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Xe&&(Ye=!1),tt&&(De=!0),Fe&&(oe=pe({},To),ce=[],Fe.html===!0&&(pe(oe,So),pe(ce,Ao)),Fe.svg===!0&&(pe(oe,qn),pe(ce,zn),pe(ce,en)),Fe.svgFilters===!0&&(pe(oe,Bn),pe(ce,zn),pe(ce,en)),Fe.mathMl===!0&&(pe(oe,Un),pe(ce,Eo),pe(ce,en))),p.ADD_TAGS&&(typeof p.ADD_TAGS=="function"?Ze.tagCheck=p.ADD_TAGS:(oe===Te&&(oe=Rt(oe)),pe(oe,p.ADD_TAGS,le))),p.ADD_ATTR&&(typeof p.ADD_ATTR=="function"?Ze.attributeCheck=p.ADD_ATTR:(ce===Ne&&(ce=Rt(ce)),pe(ce,p.ADD_ATTR,le))),p.ADD_URI_SAFE_ATTR&&pe(ee,p.ADD_URI_SAFE_ATTR,le),p.FORBID_CONTENTS&&(I===F&&(I=Rt(I)),pe(I,p.FORBID_CONTENTS,le)),_t&&(oe["#text"]=!0),Ve&&pe(oe,["html","head","body"]),oe.table&&(pe(oe,["tbody"]),delete Pe.tbody),p.TRUSTED_TYPES_POLICY){if(typeof p.TRUSTED_TYPES_POLICY.createHTML!="function")throw Ar('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof p.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Ar('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');C=p.TRUSTED_TYPES_POLICY,S=C.createHTML("")}else C===void 0&&(C=yl(v,s)),C!==null&&typeof S=="string"&&(S=C.createHTML(""));lt&&lt(p),ve=p}},Qe=pe({},[...qn,...Bn,...dl]),gt=pe({},[...Un,...ul]),St=function(p){let L=B(p);(!L||!L.tagName)&&(L={namespaceURI:w,tagName:"template"});let W=tn(p.tagName),Ee=tn(L.tagName);return x[p.namespaceURI]?p.namespaceURI===we?L.namespaceURI===ne?W==="svg":L.namespaceURI===fe?W==="svg"&&(Ee==="annotation-xml"||qe[Ee]):!!Qe[W]:p.namespaceURI===fe?L.namespaceURI===ne?W==="math":L.namespaceURI===we?W==="math"&&u[Ee]:!!gt[W]:p.namespaceURI===ne?L.namespaceURI===we&&!u[Ee]||L.namespaceURI===fe&&!qe[Ee]?!1:!gt[W]&&(m[W]||!Qe[W]):!!(R==="application/xhtml+xml"&&x[p.namespaceURI]):!1},ze=function(p){Sr(e.removed,{element:p});try{B(p).removeChild(p)}catch{A(p)}},st=function(p,L){try{Sr(e.removed,{attribute:L.getAttributeNode(p),from:L})}catch{Sr(e.removed,{attribute:null,from:L})}if(L.removeAttribute(p),p==="is")if(De||tt)try{ze(L)}catch{}else try{L.setAttribute(p,"")}catch{}},ue=function(p){let L=null,W=null;if(Ie)p="<remove></remove>"+p;else{let Oe=Fn(p,/^[\r\n\t ]+/);W=Oe&&Oe[0]}R==="application/xhtml+xml"&&w===ne&&(p='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+p+"</body></html>");let Ee=C?C.createHTML(p):p;if(w===ne)try{L=new b().parseFromString(Ee,R)}catch{}if(!L||!L.documentElement){L=T.createDocument(w,"template",null);try{L.documentElement.innerHTML=N?S:Ee}catch{}}let je=L.body||L.documentElement;return p&&W&&je.insertBefore(r.createTextNode(W),je.childNodes[0]||null),w===ne?G.call(L,Ve?"html":"body")[0]:Ve?L.documentElement:je},_e=function(p){return D.call(p.ownerDocument||p,p,c.SHOW_ELEMENT|c.SHOW_COMMENT|c.SHOW_TEXT|c.SHOW_PROCESSING_INSTRUCTION|c.SHOW_CDATA_SECTION,null)},Tt=function(p){return p instanceof h&&(typeof p.nodeName!="string"||typeof p.textContent!="string"||typeof p.removeChild!="function"||!(p.attributes instanceof f)||typeof p.removeAttribute!="function"||typeof p.setAttribute!="function"||typeof p.namespaceURI!="string"||typeof p.insertBefore!="function"||typeof p.hasChildNodes!="function")},Et=function(p){return typeof l=="function"&&p instanceof l};function ot(M,p,L){Jr(M,W=>{W.call(e,p,L,ve)})}let Bt=function(p){let L=null;if(ot(V.beforeSanitizeElements,p,null),Tt(p))return ze(p),!0;let W=le(p.nodeName);if(ot(V.uponSanitizeElement,p,{tagName:W,allowedTags:oe}),et&&p.hasChildNodes()&&!Et(p.firstElementChild)&&at(/<[/\w!]/g,p.innerHTML)&&at(/<[/\w!]/g,p.textContent)||p.nodeType===Cr.progressingInstruction||et&&p.nodeType===Cr.comment&&at(/<[/\w]/g,p.data))return ze(p),!0;if(!(Ze.tagCheck instanceof Function&&Ze.tagCheck(W))&&(!oe[W]||Pe[W])){if(!Pe[W]&&g(W)&&(me.tagNameCheck instanceof RegExp&&at(me.tagNameCheck,W)||me.tagNameCheck instanceof Function&&me.tagNameCheck(W)))return!1;if(_t&&!I[W]){let Ee=B(p)||p.parentNode,je=q(p)||p.childNodes;if(je&&Ee){let Oe=je.length;for(let He=Oe-1;He>=0;--He){let mt=E(je[He],!0);mt.__removalCount=(p.__removalCount||0)+1,Ee.insertBefore(mt,P(p))}}}return ze(p),!0}return p instanceof a&&!St(p)||(W==="noscript"||W==="noembed"||W==="noframes")&&at(/<\/no(script|embed|frames)/i,p.innerHTML)?(ze(p),!0):(Xe&&p.nodeType===Cr.text&&(L=p.textContent,Jr([se,Ce,Ue],Ee=>{L=Tr(L,Ee," ")}),p.textContent!==L&&(Sr(e.removed,{element:p.cloneNode()}),p.textContent=L)),ot(V.afterSanitizeElements,p,null),!1)},_=function(p,L,W){if(nt&&(L==="id"||L==="name")&&(W in r||W in Ae))return!1;if(!(Ye&&!ut[L]&&at(ye,L))){if(!(xt&&at(re,L))){if(!(Ze.attributeCheck instanceof Function&&Ze.attributeCheck(L,p))){if(!ce[L]||ut[L]){if(!(g(p)&&(me.tagNameCheck instanceof RegExp&&at(me.tagNameCheck,p)||me.tagNameCheck instanceof Function&&me.tagNameCheck(p))&&(me.attributeNameCheck instanceof RegExp&&at(me.attributeNameCheck,L)||me.attributeNameCheck instanceof Function&&me.attributeNameCheck(L,p))||L==="is"&&me.allowCustomizedBuiltInElements&&(me.tagNameCheck instanceof RegExp&&at(me.tagNameCheck,W)||me.tagNameCheck instanceof Function&&me.tagNameCheck(W))))return!1}else if(!ee[L]){if(!at(Re,Tr(W,U,""))){if(!((L==="src"||L==="xlink:href"||L==="href")&&p!=="script"&&il(W,"data:")===0&&J[p])){if(!(pt&&!at(O,Tr(W,U,"")))){if(W)return!1}}}}}}}return!0},g=function(p){return p!=="annotation-xml"&&Fn(p,K)},H=function(p){ot(V.beforeSanitizeAttributes,p,null);let{attributes:L}=p;if(!L||Tt(p))return;let W={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:ce,forceKeepAttr:void 0},Ee=L.length;for(;Ee--;){let je=L[Ee],{name:Oe,namespaceURI:He,value:mt}=je,Ct=le(Oe),Jt=mt,We=Oe==="value"?Jt:al(Jt);if(W.attrName=Ct,W.attrValue=We,W.keepAttr=!0,W.forceKeepAttr=void 0,ot(V.uponSanitizeAttribute,p,W),We=W.attrValue,ht&&(Ct==="id"||Ct==="name")&&(st(Oe,p),We=Me+We),et&&at(/((--!?|])>)|<\/(style|title|textarea)/i,We)){st(Oe,p);continue}if(Ct==="attributename"&&Fn(We,"href")){st(Oe,p);continue}if(W.forceKeepAttr)continue;if(!W.keepAttr){st(Oe,p);continue}if(!Je&&at(/\/>/i,We)){st(Oe,p);continue}Xe&&Jr([se,Ce,Ue],Pr=>{We=Tr(We,Pr," ")});let er=le(p.nodeName);if(!_(er,Ct,We)){st(Oe,p);continue}if(C&&typeof v=="object"&&typeof v.getAttributeType=="function"&&!He)switch(v.getAttributeType(er,Ct)){case"TrustedHTML":{We=C.createHTML(We);break}case"TrustedScriptURL":{We=C.createScriptURL(We);break}}if(We!==Jt)try{He?p.setAttributeNS(He,Oe,We):p.setAttribute(Oe,We),Tt(p)?ze(p):xo(e.removed)}catch{st(Oe,p)}}ot(V.afterSanitizeAttributes,p,null)},X=function M(p){let L=null,W=_e(p);for(ot(V.beforeSanitizeShadowDOM,p,null);L=W.nextNode();)ot(V.uponSanitizeShadowNode,L,null),Bt(L),H(L),L.content instanceof o&&M(L.content);ot(V.afterSanitizeShadowDOM,p,null)};return e.sanitize=function(M){let p=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},L=null,W=null,Ee=null,je=null;if(N=!M,N&&(M="<!-->"),typeof M!="string"&&!Et(M))if(typeof M.toString=="function"){if(M=M.toString(),typeof M!="string")throw Ar("dirty is not a string, aborting")}else throw Ar("toString is not a function");if(!e.isSupported)return M;if(Ge||ae(p),e.removed=[],typeof M=="string"&&(he=!1),he){if(M.nodeName){let mt=le(M.nodeName);if(!oe[mt]||Pe[mt])throw Ar("root node is forbidden and cannot be sanitized in-place")}}else if(M instanceof l)L=ue("<!---->"),W=L.ownerDocument.importNode(M,!0),W.nodeType===Cr.element&&W.nodeName==="BODY"||W.nodeName==="HTML"?L=W:L.appendChild(W);else{if(!De&&!Xe&&!Ve&&M.indexOf("<")===-1)return C&&rt?C.createHTML(M):M;if(L=ue(M),!L)return De?null:rt?S:""}L&&Ie&&ze(L.firstChild);let Oe=_e(he?M:L);for(;Ee=Oe.nextNode();)Bt(Ee),H(Ee),Ee.content instanceof o&&X(Ee.content);if(he)return M;if(De){if(tt)for(je=y.call(L.ownerDocument);L.firstChild;)je.appendChild(L.firstChild);else je=L;return(ce.shadowroot||ce.shadowrootmode)&&(je=j.call(n,je,!0)),je}let He=Ve?L.outerHTML:L.innerHTML;return Ve&&oe["!doctype"]&&L.ownerDocument&&L.ownerDocument.doctype&&L.ownerDocument.doctype.name&&at(Do,L.ownerDocument.doctype.name)&&(He="<!DOCTYPE "+L.ownerDocument.doctype.name+`>
`+He),Xe&&Jr([se,Ce,Ue],mt=>{He=Tr(He,mt," ")}),C&&rt?C.createHTML(He):He},e.setConfig=function(){let M=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};ae(M),Ge=!0},e.clearConfig=function(){ve=null,Ge=!1},e.isValidAttribute=function(M,p,L){ve||ae({});let W=le(M),Ee=le(p);return _(W,Ee,L)},e.addHook=function(M,p){typeof p=="function"&&Sr(V[M],p)},e.removeHook=function(M,p){if(p!==void 0){let L=sl(V[M],p);return L===-1?void 0:ol(V[M],L,1)[0]}return xo(V[M])},e.removeHooks=function(M){V[M]=[]},e.removeAllHooks=function(){V=Ro()},e}var Mo=Oo();var No={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Po=t=>(...e)=>({_$litDirective$:t,values:e}),rn=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,r,n){this._$Ct=e,this._$AM=r,this._$Ci=n}_$AS(e,r){return this.update(e,r)}update(e,r){return this.render(...r)}};var Rr=class extends rn{constructor(e){if(super(e),this.it=Be,e.type!==No.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===Be||e==null)return this._t=void 0,this.it=e;if(e===Wt)return e;if(typeof e!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;let r=[e];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}};Rr.directiveName="unsafeHTML",Rr.resultType=1;var Fo=Po(Rr);function Kn(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Qt=Kn();function Go(t){Qt=t}var Or={exec:()=>null};function ge(t,e=""){let r=typeof t=="string"?t:t.source,n={replace:(s,o)=>{let i=typeof o=="string"?o:o.source;return i=i.replace(dt.caret,"$1"),r=r.replace(s,i),n},getRegex:()=>new RegExp(r,e)};return n}var vl=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),dt={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:t=>new RegExp(`^( {0,3}${t})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}#`),htmlBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}<(?:[a-z].*>|!--)`,"i")},$l=/^(?:[ \t]*(?:\n|$))+/,xl=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Sl=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,Mr=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Tl=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Zn=/(?:[*+-]|\d{1,9}[.)])/,jo=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Yo=ge(jo).replace(/bull/g,Zn).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Al=ge(jo).replace(/bull/g,Zn).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Xn=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,El=/^[^\n]+/,Qn=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,Cl=ge(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Qn).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Rl=ge(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Zn).getRegex(),cn="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Jn=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Il=ge("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",Jn).replace("tag",cn).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Vo=ge(Xn).replace("hr",Mr).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",cn).getRegex(),Ll=ge(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Vo).getRegex(),es={blockquote:Ll,code:xl,def:Cl,fences:Sl,heading:Tl,hr:Mr,html:Il,lheading:Yo,list:Rl,newline:$l,paragraph:Vo,table:Or,text:El},qo=ge("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",Mr).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",cn).getRegex(),Dl={...es,lheading:Al,table:qo,paragraph:ge(Xn).replace("hr",Mr).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",qo).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",cn).getRegex()},Ol={...es,html:ge(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",Jn).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Or,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:ge(Xn).replace("hr",Mr).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Yo).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Ml=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Nl=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Ko=/^( {2,}|\\)\n(?!\s*$)/,Pl=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,dn=/[\p{P}\p{S}]/u,ts=/[\s\p{P}\p{S}]/u,Zo=/[^\s\p{P}\p{S}]/u,Fl=ge(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,ts).getRegex(),Xo=/(?!~)[\p{P}\p{S}]/u,ql=/(?!~)[\s\p{P}\p{S}]/u,Bl=/(?:[^\s\p{P}\p{S}]|~)/u,Ul=ge(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",vl?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),Qo=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,zl=ge(Qo,"u").replace(/punct/g,dn).getRegex(),Hl=ge(Qo,"u").replace(/punct/g,Xo).getRegex(),Jo="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Wl=ge(Jo,"gu").replace(/notPunctSpace/g,Zo).replace(/punctSpace/g,ts).replace(/punct/g,dn).getRegex(),Gl=ge(Jo,"gu").replace(/notPunctSpace/g,Bl).replace(/punctSpace/g,ql).replace(/punct/g,Xo).getRegex(),jl=ge("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,Zo).replace(/punctSpace/g,ts).replace(/punct/g,dn).getRegex(),Yl=ge(/\\(punct)/,"gu").replace(/punct/g,dn).getRegex(),Vl=ge(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Kl=ge(Jn).replace("(?:-->|$)","-->").getRegex(),Zl=ge("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Kl).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),on=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,Xl=ge(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",on).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),ei=ge(/^!?\[(label)\]\[(ref)\]/).replace("label",on).replace("ref",Qn).getRegex(),ti=ge(/^!?\[(ref)\](?:\[\])?/).replace("ref",Qn).getRegex(),Ql=ge("reflink|nolink(?!\\()","g").replace("reflink",ei).replace("nolink",ti).getRegex(),Bo=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,rs={_backpedal:Or,anyPunctuation:Yl,autolink:Vl,blockSkip:Ul,br:Ko,code:Nl,del:Or,emStrongLDelim:zl,emStrongRDelimAst:Wl,emStrongRDelimUnd:jl,escape:Ml,link:Xl,nolink:ti,punctuation:Fl,reflink:ei,reflinkSearch:Ql,tag:Zl,text:Pl,url:Or},Jl={...rs,link:ge(/^!?\[(label)\]\((.*?)\)/).replace("label",on).getRegex(),reflink:ge(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",on).getRegex()},jn={...rs,emStrongRDelimAst:Gl,emStrongLDelim:Hl,url:ge(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",Bo).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:ge(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",Bo).getRegex()},ec={...jn,br:ge(Ko).replace("{2,}","*").getRegex(),text:ge(jn.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},nn={normal:es,gfm:Dl,pedantic:Ol},Ir={normal:rs,gfm:jn,breaks:ec,pedantic:Jl},tc={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Uo=t=>tc[t];function It(t,e){if(e){if(dt.escapeTest.test(t))return t.replace(dt.escapeReplace,Uo)}else if(dt.escapeTestNoEncode.test(t))return t.replace(dt.escapeReplaceNoEncode,Uo);return t}function zo(t){try{t=encodeURI(t).replace(dt.percentDecode,"%")}catch{return null}return t}function Ho(t,e){let r=t.replace(dt.findPipe,(o,i,l)=>{let a=!1,c=i;for(;--c>=0&&l[c]==="\\";)a=!a;return a?"|":" |"}),n=r.split(dt.splitPipe),s=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),e)if(n.length>e)n.splice(e);else for(;n.length<e;)n.push("");for(;s<n.length;s++)n[s]=n[s].trim().replace(dt.slashPipe,"|");return n}function Lr(t,e,r){let n=t.length;if(n===0)return"";let s=0;for(;s<n;){let o=t.charAt(n-s-1);if(o===e&&!r)s++;else if(o!==e&&r)s++;else break}return t.slice(0,n-s)}function rc(t,e){if(t.indexOf(e[1])===-1)return-1;let r=0;for(let n=0;n<t.length;n++)if(t[n]==="\\")n++;else if(t[n]===e[0])r++;else if(t[n]===e[1]&&(r--,r<0))return n;return r>0?-2:-1}function Wo(t,e,r,n,s){let o=e.href,i=e.title||null,l=t[1].replace(s.other.outputLinkReplace,"$1");n.state.inLink=!0;let a={type:t[0].charAt(0)==="!"?"image":"link",raw:r,href:o,title:i,text:l,tokens:n.inlineTokens(l)};return n.state.inLink=!1,a}function nc(t,e,r){let n=t.match(r.other.indentCodeCompensation);if(n===null)return e;let s=n[1];return e.split(`
`).map(o=>{let i=o.match(r.other.beginningSpace);if(i===null)return o;let[l]=i;return l.length>=s.length?o.slice(s.length):o}).join(`
`)}var an=class{constructor(t){Se(this,"options");Se(this,"rules");Se(this,"lexer");this.options=t||Qt}space(t){let e=this.rules.block.newline.exec(t);if(e&&e[0].length>0)return{type:"space",raw:e[0]}}code(t){let e=this.rules.block.code.exec(t);if(e){let r=e[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:e[0],codeBlockStyle:"indented",text:this.options.pedantic?r:Lr(r,`
`)}}}fences(t){let e=this.rules.block.fences.exec(t);if(e){let r=e[0],n=nc(r,e[3]||"",this.rules);return{type:"code",raw:r,lang:e[2]?e[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):e[2],text:n}}}heading(t){let e=this.rules.block.heading.exec(t);if(e){let r=e[2].trim();if(this.rules.other.endingHash.test(r)){let n=Lr(r,"#");(this.options.pedantic||!n||this.rules.other.endingSpaceChar.test(n))&&(r=n.trim())}return{type:"heading",raw:e[0],depth:e[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(t){let e=this.rules.block.hr.exec(t);if(e)return{type:"hr",raw:Lr(e[0],`
`)}}blockquote(t){let e=this.rules.block.blockquote.exec(t);if(e){let r=Lr(e[0],`
`).split(`
`),n="",s="",o=[];for(;r.length>0;){let i=!1,l=[],a;for(a=0;a<r.length;a++)if(this.rules.other.blockquoteStart.test(r[a]))l.push(r[a]),i=!0;else if(!i)l.push(r[a]);else break;r=r.slice(a);let c=l.join(`
`),f=c.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");n=n?`${n}
${c}`:c,s=s?`${s}
${f}`:f;let h=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(f,o,!0),this.lexer.state.top=h,r.length===0)break;let b=o.at(-1);if(b?.type==="code")break;if(b?.type==="blockquote"){let v=b,$=v.raw+`
`+r.join(`
`),E=this.blockquote($);o[o.length-1]=E,n=n.substring(0,n.length-v.raw.length)+E.raw,s=s.substring(0,s.length-v.text.length)+E.text;break}else if(b?.type==="list"){let v=b,$=v.raw+`
`+r.join(`
`),E=this.list($);o[o.length-1]=E,n=n.substring(0,n.length-b.raw.length)+E.raw,s=s.substring(0,s.length-v.raw.length)+E.raw,r=$.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:n,tokens:o,text:s}}}list(t){let e=this.rules.block.list.exec(t);if(e){let r=e[1].trim(),n=r.length>1,s={type:"list",raw:"",ordered:n,start:n?+r.slice(0,-1):"",loose:!1,items:[]};r=n?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=n?r:"[*+-]");let o=this.rules.other.listItemRegex(r),i=!1;for(;t;){let a=!1,c="",f="";if(!(e=o.exec(t))||this.rules.block.hr.test(t))break;c=e[0],t=t.substring(c.length);let h=e[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,E=>" ".repeat(3*E.length)),b=t.split(`
`,1)[0],v=!h.trim(),$=0;if(this.options.pedantic?($=2,f=h.trimStart()):v?$=e[1].length+1:($=e[2].search(this.rules.other.nonSpaceChar),$=$>4?1:$,f=h.slice($),$+=e[1].length),v&&this.rules.other.blankLine.test(b)&&(c+=b+`
`,t=t.substring(b.length+1),a=!0),!a){let E=this.rules.other.nextBulletRegex($),A=this.rules.other.hrRegex($),P=this.rules.other.fencesBeginRegex($),q=this.rules.other.headingBeginRegex($),B=this.rules.other.htmlBeginRegex($);for(;t;){let C=t.split(`
`,1)[0],S;if(b=C,this.options.pedantic?(b=b.replace(this.rules.other.listReplaceNesting,"  "),S=b):S=b.replace(this.rules.other.tabCharGlobal,"    "),P.test(b)||q.test(b)||B.test(b)||E.test(b)||A.test(b))break;if(S.search(this.rules.other.nonSpaceChar)>=$||!b.trim())f+=`
`+S.slice($);else{if(v||h.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||P.test(h)||q.test(h)||A.test(h))break;f+=`
`+b}!v&&!b.trim()&&(v=!0),c+=C+`
`,t=t.substring(C.length+1),h=S.slice($)}}s.loose||(i?s.loose=!0:this.rules.other.doubleBlankLine.test(c)&&(i=!0)),s.items.push({type:"list_item",raw:c,task:!!this.options.gfm&&this.rules.other.listIsTask.test(f),loose:!1,text:f,tokens:[]}),s.raw+=c}let l=s.items.at(-1);if(l)l.raw=l.raw.trimEnd(),l.text=l.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let a of s.items){if(this.lexer.state.top=!1,a.tokens=this.lexer.blockTokens(a.text,[]),a.task){if(a.text=a.text.replace(this.rules.other.listReplaceTask,""),a.tokens[0]?.type==="text"||a.tokens[0]?.type==="paragraph"){a.tokens[0].raw=a.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),a.tokens[0].text=a.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let f=this.lexer.inlineQueue.length-1;f>=0;f--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[f].src)){this.lexer.inlineQueue[f].src=this.lexer.inlineQueue[f].src.replace(this.rules.other.listReplaceTask,"");break}}let c=this.rules.other.listTaskCheckbox.exec(a.raw);if(c){let f={type:"checkbox",raw:c[0]+" ",checked:c[0]!=="[ ]"};a.checked=f.checked,s.loose?a.tokens[0]&&["paragraph","text"].includes(a.tokens[0].type)&&"tokens"in a.tokens[0]&&a.tokens[0].tokens?(a.tokens[0].raw=f.raw+a.tokens[0].raw,a.tokens[0].text=f.raw+a.tokens[0].text,a.tokens[0].tokens.unshift(f)):a.tokens.unshift({type:"paragraph",raw:f.raw,text:f.raw,tokens:[f]}):a.tokens.unshift(f)}}if(!s.loose){let c=a.tokens.filter(h=>h.type==="space"),f=c.length>0&&c.some(h=>this.rules.other.anyLine.test(h.raw));s.loose=f}}if(s.loose)for(let a of s.items){a.loose=!0;for(let c of a.tokens)c.type==="text"&&(c.type="paragraph")}return s}}html(t){let e=this.rules.block.html.exec(t);if(e)return{type:"html",block:!0,raw:e[0],pre:e[1]==="pre"||e[1]==="script"||e[1]==="style",text:e[0]}}def(t){let e=this.rules.block.def.exec(t);if(e){let r=e[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),n=e[2]?e[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=e[3]?e[3].substring(1,e[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):e[3];return{type:"def",tag:r,raw:e[0],href:n,title:s}}}table(t){let e=this.rules.block.table.exec(t);if(!e||!this.rules.other.tableDelimiter.test(e[2]))return;let r=Ho(e[1]),n=e[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=e[3]?.trim()?e[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:e[0],header:[],align:[],rows:[]};if(r.length===n.length){for(let i of n)this.rules.other.tableAlignRight.test(i)?o.align.push("right"):this.rules.other.tableAlignCenter.test(i)?o.align.push("center"):this.rules.other.tableAlignLeft.test(i)?o.align.push("left"):o.align.push(null);for(let i=0;i<r.length;i++)o.header.push({text:r[i],tokens:this.lexer.inline(r[i]),header:!0,align:o.align[i]});for(let i of s)o.rows.push(Ho(i,o.header.length).map((l,a)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:o.align[a]})));return o}}lheading(t){let e=this.rules.block.lheading.exec(t);if(e)return{type:"heading",raw:e[0],depth:e[2].charAt(0)==="="?1:2,text:e[1],tokens:this.lexer.inline(e[1])}}paragraph(t){let e=this.rules.block.paragraph.exec(t);if(e){let r=e[1].charAt(e[1].length-1)===`
`?e[1].slice(0,-1):e[1];return{type:"paragraph",raw:e[0],text:r,tokens:this.lexer.inline(r)}}}text(t){let e=this.rules.block.text.exec(t);if(e)return{type:"text",raw:e[0],text:e[0],tokens:this.lexer.inline(e[0])}}escape(t){let e=this.rules.inline.escape.exec(t);if(e)return{type:"escape",raw:e[0],text:e[1]}}tag(t){let e=this.rules.inline.tag.exec(t);if(e)return!this.lexer.state.inLink&&this.rules.other.startATag.test(e[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(e[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(e[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(e[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:e[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:e[0]}}link(t){let e=this.rules.inline.link.exec(t);if(e){let r=e[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;let o=Lr(r.slice(0,-1),"\\");if((r.length-o.length)%2===0)return}else{let o=rc(e[2],"()");if(o===-2)return;if(o>-1){let i=(e[0].indexOf("!")===0?5:4)+e[1].length+o;e[2]=e[2].substring(0,o),e[0]=e[0].substring(0,i).trim(),e[3]=""}}let n=e[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(n);o&&(n=o[1],s=o[3])}else s=e[3]?e[3].slice(1,-1):"";return n=n.trim(),this.rules.other.startAngleBracket.test(n)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?n=n.slice(1):n=n.slice(1,-1)),Wo(e,{href:n&&n.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},e[0],this.lexer,this.rules)}}reflink(t,e){let r;if((r=this.rules.inline.reflink.exec(t))||(r=this.rules.inline.nolink.exec(t))){let n=(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=e[n.toLowerCase()];if(!s){let o=r[0].charAt(0);return{type:"text",raw:o,text:o}}return Wo(r,s,r[0],this.lexer,this.rules)}}emStrong(t,e,r=""){let n=this.rules.inline.emStrongLDelim.exec(t);if(!(!n||n[3]&&r.match(this.rules.other.unicodeAlphaNumeric))&&(!(n[1]||n[2])||!r||this.rules.inline.punctuation.exec(r))){let s=[...n[0]].length-1,o,i,l=s,a=0,c=n[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(c.lastIndex=0,e=e.slice(-1*t.length+s);(n=c.exec(e))!=null;){if(o=n[1]||n[2]||n[3]||n[4]||n[5]||n[6],!o)continue;if(i=[...o].length,n[3]||n[4]){l+=i;continue}else if((n[5]||n[6])&&s%3&&!((s+i)%3)){a+=i;continue}if(l-=i,l>0)continue;i=Math.min(i,i+l+a);let f=[...n[0]][0].length,h=t.slice(0,s+n.index+f+i);if(Math.min(s,i)%2){let v=h.slice(1,-1);return{type:"em",raw:h,text:v,tokens:this.lexer.inlineTokens(v)}}let b=h.slice(2,-2);return{type:"strong",raw:h,text:b,tokens:this.lexer.inlineTokens(b)}}}}codespan(t){let e=this.rules.inline.code.exec(t);if(e){let r=e[2].replace(this.rules.other.newLineCharGlobal," "),n=this.rules.other.nonSpaceChar.test(r),s=this.rules.other.startingSpaceChar.test(r)&&this.rules.other.endingSpaceChar.test(r);return n&&s&&(r=r.substring(1,r.length-1)),{type:"codespan",raw:e[0],text:r}}}br(t){let e=this.rules.inline.br.exec(t);if(e)return{type:"br",raw:e[0]}}del(t){let e=this.rules.inline.del.exec(t);if(e)return{type:"del",raw:e[0],text:e[2],tokens:this.lexer.inlineTokens(e[2])}}autolink(t){let e=this.rules.inline.autolink.exec(t);if(e){let r,n;return e[2]==="@"?(r=e[1],n="mailto:"+r):(r=e[1],n=r),{type:"link",raw:e[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}url(t){let e;if(e=this.rules.inline.url.exec(t)){let r,n;if(e[2]==="@")r=e[0],n="mailto:"+r;else{let s;do s=e[0],e[0]=this.rules.inline._backpedal.exec(e[0])?.[0]??"";while(s!==e[0]);r=e[0],e[1]==="www."?n="http://"+e[0]:n=e[0]}return{type:"link",raw:e[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(t){let e=this.rules.inline.text.exec(t);if(e){let r=this.lexer.state.inRawBlock;return{type:"text",raw:e[0],text:e[0],escaped:r}}}},vt=class Yn{constructor(e){Se(this,"tokens");Se(this,"options");Se(this,"state");Se(this,"inlineQueue");Se(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=e||Qt,this.options.tokenizer=this.options.tokenizer||new an,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let r={other:dt,block:nn.normal,inline:Ir.normal};this.options.pedantic?(r.block=nn.pedantic,r.inline=Ir.pedantic):this.options.gfm&&(r.block=nn.gfm,this.options.breaks?r.inline=Ir.breaks:r.inline=Ir.gfm),this.tokenizer.rules=r}static get rules(){return{block:nn,inline:Ir}}static lex(e,r){return new Yn(r).lex(e)}static lexInline(e,r){return new Yn(r).inlineTokens(e)}lex(e){e=e.replace(dt.carriageReturn,`
`),this.blockTokens(e,this.tokens);for(let r=0;r<this.inlineQueue.length;r++){let n=this.inlineQueue[r];this.inlineTokens(n.src,n.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(e,r=[],n=!1){for(this.options.pedantic&&(e=e.replace(dt.tabCharGlobal,"    ").replace(dt.spaceLine,""));e;){let s;if(this.options.extensions?.block?.some(i=>(s=i.call({lexer:this},e,r))?(e=e.substring(s.raw.length),r.push(s),!0):!1))continue;if(s=this.tokenizer.space(e)){e=e.substring(s.raw.length);let i=r.at(-1);s.raw.length===1&&i!==void 0?i.raw+=`
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
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):r.push(s);continue}if(e){let i="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(i);break}else throw new Error(i)}}return this.state.top=!0,r}inline(e,r=[]){return this.inlineQueue.push({src:e,tokens:r}),r}inlineTokens(e,r=[]){let n=e,s=null;if(this.tokens.links){let a=Object.keys(this.tokens.links);if(a.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(n))!=null;)a.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(n=n.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(n))!=null;)n=n.slice(0,s.index)+"++"+n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(n))!=null;)o=s[2]?s[2].length:0,n=n.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let i=!1,l="";for(;e;){i||(l=""),i=!1;let a;if(this.options.extensions?.inline?.some(f=>(a=f.call({lexer:this},e,r))?(e=e.substring(a.raw.length),r.push(a),!0):!1))continue;if(a=this.tokenizer.escape(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.tag(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.link(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(a.raw.length);let f=r.at(-1);a.type==="text"&&f?.type==="text"?(f.raw+=a.raw,f.text+=a.text):r.push(a);continue}if(a=this.tokenizer.emStrong(e,n,l)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.codespan(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.br(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.del(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.autolink(e)){e=e.substring(a.raw.length),r.push(a);continue}if(!this.state.inLink&&(a=this.tokenizer.url(e))){e=e.substring(a.raw.length),r.push(a);continue}let c=e;if(this.options.extensions?.startInline){let f=1/0,h=e.slice(1),b;this.options.extensions.startInline.forEach(v=>{b=v.call({lexer:this},h),typeof b=="number"&&b>=0&&(f=Math.min(f,b))}),f<1/0&&f>=0&&(c=e.substring(0,f+1))}if(a=this.tokenizer.inlineText(c)){e=e.substring(a.raw.length),a.raw.slice(-1)!=="_"&&(l=a.raw.slice(-1)),i=!0;let f=r.at(-1);f?.type==="text"?(f.raw+=a.raw,f.text+=a.text):r.push(a);continue}if(e){let f="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(f);break}else throw new Error(f)}}return r}},ln=class{constructor(t){Se(this,"options");Se(this,"parser");this.options=t||Qt}space(t){return""}code({text:t,lang:e,escaped:r}){let n=(e||"").match(dt.notSpaceStart)?.[0],s=t.replace(dt.endingNewline,"")+`
`;return n?'<pre><code class="language-'+It(n)+'">'+(r?s:It(s,!0))+`</code></pre>
`:"<pre><code>"+(r?s:It(s,!0))+`</code></pre>
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
`}strong({tokens:t}){return`<strong>${this.parser.parseInline(t)}</strong>`}em({tokens:t}){return`<em>${this.parser.parseInline(t)}</em>`}codespan({text:t}){return`<code>${It(t,!0)}</code>`}br(t){return"<br>"}del({tokens:t}){return`<del>${this.parser.parseInline(t)}</del>`}link({href:t,title:e,tokens:r}){let n=this.parser.parseInline(r),s=zo(t);if(s===null)return n;t=s;let o='<a href="'+t+'"';return e&&(o+=' title="'+It(e)+'"'),o+=">"+n+"</a>",o}image({href:t,title:e,text:r,tokens:n}){n&&(r=this.parser.parseInline(n,this.parser.textRenderer));let s=zo(t);if(s===null)return It(r);t=s;let o=`<img src="${t}" alt="${r}"`;return e&&(o+=` title="${It(e)}"`),o+=">",o}text(t){return"tokens"in t&&t.tokens?this.parser.parseInline(t.tokens):"escaped"in t&&t.escaped?t.text:It(t.text)}},ns=class{strong({text:t}){return t}em({text:t}){return t}codespan({text:t}){return t}del({text:t}){return t}html({text:t}){return t}text({text:t}){return t}link({text:t}){return""+t}image({text:t}){return""+t}br(){return""}checkbox({raw:t}){return t}},$t=class Vn{constructor(e){Se(this,"options");Se(this,"renderer");Se(this,"textRenderer");this.options=e||Qt,this.options.renderer=this.options.renderer||new ln,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new ns}static parse(e,r){return new Vn(r).parse(e)}static parseInline(e,r){return new Vn(r).parseInline(e)}parse(e){let r="";for(let n=0;n<e.length;n++){let s=e[n];if(this.options.extensions?.renderers?.[s.type]){let i=s,l=this.options.extensions.renderers[i.type].call({parser:this},i);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(i.type)){r+=l||"";continue}}let o=s;switch(o.type){case"space":{r+=this.renderer.space(o);break}case"hr":{r+=this.renderer.hr(o);break}case"heading":{r+=this.renderer.heading(o);break}case"code":{r+=this.renderer.code(o);break}case"table":{r+=this.renderer.table(o);break}case"blockquote":{r+=this.renderer.blockquote(o);break}case"list":{r+=this.renderer.list(o);break}case"checkbox":{r+=this.renderer.checkbox(o);break}case"html":{r+=this.renderer.html(o);break}case"def":{r+=this.renderer.def(o);break}case"paragraph":{r+=this.renderer.paragraph(o);break}case"text":{r+=this.renderer.text(o);break}default:{let i='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return r}parseInline(e,r=this.renderer){let n="";for(let s=0;s<e.length;s++){let o=e[s];if(this.options.extensions?.renderers?.[o.type]){let l=this.options.extensions.renderers[o.type].call({parser:this},o);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){n+=l||"";continue}}let i=o;switch(i.type){case"escape":{n+=r.text(i);break}case"html":{n+=r.html(i);break}case"link":{n+=r.link(i);break}case"image":{n+=r.image(i);break}case"checkbox":{n+=r.checkbox(i);break}case"strong":{n+=r.strong(i);break}case"em":{n+=r.em(i);break}case"codespan":{n+=r.codespan(i);break}case"br":{n+=r.br(i);break}case"del":{n+=r.del(i);break}case"text":{n+=r.text(i);break}default:{let l='Token with "'+i.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return n}},sn,Dr=(sn=class{constructor(t){Se(this,"options");Se(this,"block");this.options=t||Qt}preprocess(t){return t}postprocess(t){return t}processAllTokens(t){return t}emStrongMask(t){return t}provideLexer(){return this.block?vt.lex:vt.lexInline}provideParser(){return this.block?$t.parse:$t.parseInline}},Se(sn,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),Se(sn,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),sn),sc=class{constructor(...t){Se(this,"defaults",Kn());Se(this,"options",this.setOptions);Se(this,"parse",this.parseMarkdown(!0));Se(this,"parseInline",this.parseMarkdown(!1));Se(this,"Parser",$t);Se(this,"Renderer",ln);Se(this,"TextRenderer",ns);Se(this,"Lexer",vt);Se(this,"Tokenizer",an);Se(this,"Hooks",Dr);this.use(...t)}walkTokens(t,e){let r=[];for(let n of t)switch(r=r.concat(e.call(this,n)),n.type){case"table":{let s=n;for(let o of s.header)r=r.concat(this.walkTokens(o.tokens,e));for(let o of s.rows)for(let i of o)r=r.concat(this.walkTokens(i.tokens,e));break}case"list":{let s=n;r=r.concat(this.walkTokens(s.items,e));break}default:{let s=n;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let i=s[o].flat(1/0);r=r.concat(this.walkTokens(i,e))}):s.tokens&&(r=r.concat(this.walkTokens(s.tokens,e)))}}return r}use(...t){let e=this.defaults.extensions||{renderers:{},childTokens:{}};return t.forEach(r=>{let n={...r};if(n.async=this.defaults.async||n.async||!1,r.extensions&&(r.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=e.renderers[s.name];o?e.renderers[s.name]=function(...i){let l=s.renderer.apply(this,i);return l===!1&&(l=o.apply(this,i)),l}:e.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=e[s.level];o?o.unshift(s.tokenizer):e[s.level]=[s.tokenizer],s.start&&(s.level==="block"?e.startBlock?e.startBlock.push(s.start):e.startBlock=[s.start]:s.level==="inline"&&(e.startInline?e.startInline.push(s.start):e.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(e.childTokens[s.name]=s.childTokens)}),n.extensions=e),r.renderer){let s=this.defaults.renderer||new ln(this.defaults);for(let o in r.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let i=o,l=r.renderer[i],a=s[i];s[i]=(...c)=>{let f=l.apply(s,c);return f===!1&&(f=a.apply(s,c)),f||""}}n.renderer=s}if(r.tokenizer){let s=this.defaults.tokenizer||new an(this.defaults);for(let o in r.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let i=o,l=r.tokenizer[i],a=s[i];s[i]=(...c)=>{let f=l.apply(s,c);return f===!1&&(f=a.apply(s,c)),f}}n.tokenizer=s}if(r.hooks){let s=this.defaults.hooks||new Dr;for(let o in r.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let i=o,l=r.hooks[i],a=s[i];Dr.passThroughHooks.has(o)?s[i]=c=>{if(this.defaults.async&&Dr.passThroughHooksRespectAsync.has(o))return(async()=>{let h=await l.call(s,c);return a.call(s,h)})();let f=l.call(s,c);return a.call(s,f)}:s[i]=(...c)=>{if(this.defaults.async)return(async()=>{let h=await l.apply(s,c);return h===!1&&(h=await a.apply(s,c)),h})();let f=l.apply(s,c);return f===!1&&(f=a.apply(s,c)),f}}n.hooks=s}if(r.walkTokens){let s=this.defaults.walkTokens,o=r.walkTokens;n.walkTokens=function(i){let l=[];return l.push(o.call(this,i)),s&&(l=l.concat(s.call(this,i))),l}}this.defaults={...this.defaults,...n}}),this}setOptions(t){return this.defaults={...this.defaults,...t},this}lexer(t,e){return vt.lex(t,e??this.defaults)}parser(t,e){return $t.parse(t,e??this.defaults)}parseMarkdown(t){return(e,r)=>{let n={...r},s={...this.defaults,...n},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&n.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof e>"u"||e===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof e!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(e)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=t),s.async)return(async()=>{let i=s.hooks?await s.hooks.preprocess(e):e,l=await(s.hooks?await s.hooks.provideLexer():t?vt.lex:vt.lexInline)(i,s),a=s.hooks?await s.hooks.processAllTokens(l):l;s.walkTokens&&await Promise.all(this.walkTokens(a,s.walkTokens));let c=await(s.hooks?await s.hooks.provideParser():t?$t.parse:$t.parseInline)(a,s);return s.hooks?await s.hooks.postprocess(c):c})().catch(o);try{s.hooks&&(e=s.hooks.preprocess(e));let i=(s.hooks?s.hooks.provideLexer():t?vt.lex:vt.lexInline)(e,s);s.hooks&&(i=s.hooks.processAllTokens(i)),s.walkTokens&&this.walkTokens(i,s.walkTokens);let l=(s.hooks?s.hooks.provideParser():t?$t.parse:$t.parseInline)(i,s);return s.hooks&&(l=s.hooks.postprocess(l)),l}catch(i){return o(i)}}}onError(t,e){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,t){let n="<p>An error occurred:</p><pre>"+It(r.message+"",!0)+"</pre>";return e?Promise.resolve(n):n}if(e)return Promise.reject(r);throw r}}},Xt=new sc;function ke(t,e){return Xt.parse(t,e)}ke.options=ke.setOptions=function(t){return Xt.setOptions(t),ke.defaults=Xt.defaults,Go(ke.defaults),ke};ke.getDefaults=Kn;ke.defaults=Qt;ke.use=function(...t){return Xt.use(...t),ke.defaults=Xt.defaults,Go(ke.defaults),ke};ke.walkTokens=function(t,e){return Xt.walkTokens(t,e)};ke.parseInline=Xt.parseInline;ke.Parser=$t;ke.parser=$t.parse;ke.Renderer=ln;ke.TextRenderer=ns;ke.Lexer=vt;ke.lexer=vt.lex;ke.Tokenizer=an;ke.Hooks=Dr;ke.parse=ke;var Iu=ke.options,Lu=ke.setOptions,Du=ke.use,Ou=ke.walkTokens,Mu=ke.parseInline;var Nu=$t.parse,Pu=vt.lex;function ri(t){let e=ke.parse(t),r=Mo.sanitize(e);return Fo(r)}function oc(t){return String(t||"").replace(/^docs\/(superpowers\/)?/,"")}function ni(t,e){let r=e.getWorkspacePath,n=e.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",i="",l="";function a($){$.key==="Escape"&&s&&($.preventDefault(),b())}document.addEventListener("keydown",a);function c(){return s?d`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>b()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${oc(s)}</span
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
            ${o==="loading"?d`<div class="mv__status">불러오는 중…</div>`:o==="error"?d`<div class="mv__status mv__status--error">
                    ${l||"\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}
                  </div>`:ri(i)}
          </div>
        </div>
      </div>
    `:d``}function f(){be(c(),t)}async function h($){s=$,o="loading",i="",l="",f();let E=r?r():"";if(!E){o="error",l="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",f();return}if(!n){o="error",l="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",f();return}let A="/api/doc?workspace="+encodeURIComponent(E)+"&path="+encodeURIComponent($);try{let P=await n(A),q=await P.json().catch(()=>({}));if(!P.ok||!q||q.ok!==!0){o="error",l="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(q&&q.error||P.status)+")",f();return}i=String(q.content||""),o="ready",f()}catch{o="error",l="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",f()}}function b(){s=null,be(d``,t)}function v(){document.removeEventListener("keydown",a),b()}return{open:h,close:b,destroy:v}}var ic=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"},{key:"cache_creation_input_tokens",label:"\uCE90\uC2DC \uC0DD\uC131"}],si="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function ac(t){return typeof t=="number"&&Number.isFinite(t)?t:0}function lc(t){let e=pr(t);if(!e||!t)return"";let r=typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)?` \xB7 $${t.total_cost_usd.toFixed(2)}`:"";return d`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${e.replace(/^τ /,"\u03C4 \uCD1D ")}${r}</span
    >${t.replayed?d`<span class="detail-usage-partial" title=${si}
          >부분 집계</span
        >`:""}`}function cc(t){let e=typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)?t.total_cost_usd:null;return d`<div class="detail-session__usage-detail">
    ${ic.map(r=>d`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${r.label}</span
          ><span class="detail-session__usage-value"
            >${ac(t[r.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${e===null?"":d`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${e.toFixed(2)}</span
          ></span
        >`}
    ${t.replayed?d`<span class="detail-session__usage-note">${si}</span>`:""}
  </div>`}var dc={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function uc(t){if(typeof t!="number"||!Number.isFinite(t))return"";let e=new Date(t),r=String(e.getHours()).padStart(2,"0"),n=String(e.getMinutes()).padStart(2,"0");return`${r}:${n}`}function oi(t,e={},r={}){let n=Array.isArray(t)?t:[],s=r.expanded||new Set;if(n.length===0)return d`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let o=new Set;for(let c of n)c&&typeof c.resumed_from=="string"&&c.resumed_from.length>0&&o.add(c.resumed_from);let i=c=>{if(!(c.status==="failed"||c.status==="orphaned"))return"";let h=typeof c.session_id=="string"&&c.session_id.length>0,b=o.has(c.attempt_id),v=h&&!b,$=h?b?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return d`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${c.attempt_id}
      ?disabled=${!v}
      title=${$}
      @click=${E=>{E.stopPropagation(),v&&e.onResume&&e.onResume(c.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},l=c=>{if(!(c.status==="failed"||c.status==="orphaned")||typeof c.cause!="string"||c.cause==="")return"";let h=c.cause_detail,b=h&&typeof h.reason=="string"&&h.reason.length>0?typeof h.command=="string"&&h.command.length>0?`${h.reason} \xB7 ${h.command}`:h.reason:c.cause;return d`<div class="detail-session__cause" title=${b}>
      ${c.cause}
    </div>`},a=c=>{if(!pr(c.usage))return"";let f=s.has(c.attempt_id);return d`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${c.attempt_id}
      aria-expanded=${f?"true":"false"}
      title=${f?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${h=>{h.stopPropagation(),e.onToggleUsage&&e.onToggleUsage(c.attempt_id)}}
    >
      τ 자세히
    </button>`};return d`
    <div class="detail-section-label">
      세션 이력${lc(r.total)}
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
                >${dc[c.status||""]||"\xB7"}</span
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
              ${pr(c.usage)?d`<span class="detail-session__usage"
                    >${pr(c.usage)}</span
                  >`:""}
              <span class="detail-session__time"
                >${uc(c.started_at)}</span
              >
            </button>
            ${a(c)} ${i(c)} ${l(c)}
            ${s.has(c.attempt_id)&&c.usage?cc(c.usage):""}
          </div>`)}
    </div>
  `}var pc=["open","in_progress","deferred","resolved","closed"],fc=[0,1,2,3,4];function ii(t,e){let r=e.issueStores,n=e.onClose,s=e.transport,o=e.onNavigate,i=e.queueStore,l=e.sessionLogStore,a=null,c=null,f={},h=!1,b=!1,v="",$="",E="";function A(){h=!1,b=!1,v="",$="",E=""}let P=document.createElement("div");P.className="md-viewer-root",document.body.appendChild(P);let q=ni(P,{getWorkspacePath:e.getWorkspacePath||(()=>"")}),B=document.createElement("div");B.className="session-log-root",document.body.appendChild(B);let C=Xr(B,{transport:s?(w,N)=>Promise.resolve(s(w,N)):void 0,sessionLogStore:l});function S(){if(!i||!a)return[];let w=i.get();return(w&&w.attempts?Object.values(w.attempts):[]).filter(x=>x&&x.bead_id===a).sort((x,Z)=>(Z.started_at||0)-(x.started_at||0)).map(x=>({attempt_id:x.attempt_id,bead_id:x.bead_id,status:x.status,started_at:typeof x.started_at=="number"?x.started_at:null,runner:x.runner||null,model:x.model||null,session_id:x.session_id||null,resumed_from:x.resumed_from||null,dismissed_at:typeof x.dismissed_at=="number"?x.dismissed_at:null,cause:typeof x.cause=="string"?x.cause:null,cause_detail:x.cause_detail||null,usage:x.usage||null}))}function T(){if(!i||!a)return null;let w=i.get();return Nt(w&&w.attempts||{},a)}let D=new Set;function y(w){D.has(w)?D.delete(w):D.add(w),ne()}function G(w){let N=i?i.get():null,x=N&&N.attempts?N.attempts[w]:null;C.open({attempt_id:w,meta:x?{runner:x.runner||void 0,model:x.model||void 0,effort:x.effort||void 0,status:x.status||void 0,session_id:x.session_id||void 0}:{}})}async function j(w){if(!s||!w)return;let N=()=>{let Z=i?i.get():null;return Z&&typeof Z.revision=="number"?Z.revision:0},x=await s("worker-attempt-resume",{attempt_id:w,expected_revision:N()});if(x&&x.conflict){let Z=x.queue&&typeof x.queue.revision=="number"?x.queue.revision:N();x=await s("worker-attempt-resume",{attempt_id:w,expected_revision:Z})}x&&x.resumed===!1&&!x.conflict&&x.reason&&te(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${x.reason}`,"error",2400)}let V={onOpen:G,onResume:j,onToggleUsage:y};function se(){let w=i?i.get():null,N=w&&w.exec_defaults;return N&&typeof N=="object"?N:{}}let Ce=null;r&&r.subscribe&&(Ce=r.subscribe(()=>re()));let Ue=null;i&&typeof i.subscribe=="function"&&(Ue=i.subscribe(()=>{a&&ne()}));function ye(w){w.key==="Escape"&&a&&(w.preventDefault(),n())}document.addEventListener("keydown",ye);function re(){if(a){if(r&&typeof r.snapshotFor=="function"){let w=r.snapshotFor("detail:"+a)||[];c=w.find(x=>x&&x.id===a)||w[0]||c}ne()}}function O(w){Kt(w).then(N=>{N?te("\uBCF5\uC0AC\uB428","success",1200):te("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function U(w){w.preventDefault(),w.stopPropagation(),a&&O(a)}function K(w,N){w.preventDefault(),w.stopPropagation(),O(N)}function Re(w,N){w.preventDefault(),w.stopPropagation(),q.open(N)}function oe(w,N){f[w]=N,ne(),!(!s||!a)&&Promise.resolve(s("update-exec-settings",{id:a,key:w,value:N})).catch(()=>{te("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}async function Te(w,N,x){if(!s||!a)return!1;try{let Z=await Promise.resolve(s(w,N)),qe=Array.isArray(Z)?Z[0]:Z;return qe&&typeof qe=="object"&&qe.id?(c=qe,!0):(te(x,"error"),!1)}catch{return te(x,"error"),!1}}function ce(w){setTimeout(()=>{try{let N=t.querySelector(w);N&&typeof N.focus=="function"&&N.focus()}catch{}},0)}function Ne(){h=!0,v=c&&c.title||"",ne(),ce('.detail-edit__input[data-edit="title"]')}function me(w){v=w.target.value}function Pe(){h=!1,v="",ne()}function ut(){Te("edit-text",{id:a,field:"title",value:v},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(N=>{N&&(h=!1,v=""),ne()})}function Ze(){b=!0,$=c&&c.description||"",ne(),ce('.detail-edit__textarea[data-edit="description"]')}function xt(w){$=w.target.value}function Ye(){b=!1,$="",ne()}function pt(){Te("edit-text",{id:a,field:"description",value:$},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(N=>{N&&(b=!1,$=""),ne()})}function Je(w,N,x,Z){if(w.key==="Escape"){w.stopPropagation(),x();return}w.key==="Enter"&&(!Z||w.ctrlKey||w.metaKey)&&(w.preventDefault(),N())}function Xe(w){let N=w.target.value;Te("update-status",{id:a,status:N},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>ne())}function et(w){let N=Number(w.target.value);Te("update-priority",{id:a,priority:N},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>ne())}function Ve(w){E=w.target.value}function Ge(){let w=E.trim();w.length!==0&&Te("label-add",{id:a,label:w},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(N=>{N&&(E=""),ne()})}function Ie(w){if(w.key==="Escape"){w.stopPropagation(),E="",ne();return}w.key==="Enter"&&(w.preventDefault(),Ge())}function De(w){Te("label-remove",{id:a,label:w},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>ne())}let tt={onCopyPath:K,onOpenDoc:Re},rt={onChange:oe};function nt(w){return typeof w=="string"?w:w&&typeof w=="object"?String(w.id||w.to||w.issue_id||w.depends_on||""):""}function ht(w){switch(w&&typeof w=="object"?String(w.dependency_type||w.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function Me(w){let x=(Array.isArray(w.dependencies)?w.dependencies:[]).map(Z=>({id:nt(Z),icon:ht(Z)})).filter(Z=>Z.id.length>0);return d`
      <div class="detail-section-label">의존성</div>
      ${x.length===0?d`<div class="detail-empty">의존성 없음</div>`:d`<div class="detail-deps">
            ${x.map(Z=>o?d`<button
                    type="button"
                    class="detail-dep detail-dep--link"
                    @click=${()=>o(Z.id)}
                  >
                    ${Z.icon?`${Z.icon} `:""}${Z.id}
                  </button>`:d`<span class="detail-dep"
                    >${Z.icon?`${Z.icon} `:""}${Z.id}</span
                  >`)}
          </div>`}
    `}function _t(w){let N=w.metadata||{},x=w.workflow||{},Z=x.stages||{},qe=Z.spec&&Z.spec.stale,u=Z.impl&&Z.impl.stale,m=x.route_source==="derived",R=x.route||N.route||"\u2014";return d`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${m?" detail-kv__v--derived":""}"
          title=${m?"route \uCD94\uB860\uAC12 (metadata \uBBF8\uD540)":"route"}
          >${m&&x.route?`${R} ? (\uCD94\uB860)`:R}</span
        >
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">spec_review</span>
        <span class="detail-kv__v"
          >${N.spec_review||"\uC5C6\uC74C"}${qe?" \xB7 stale":""}</span
        >
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">impl_review</span>
        <span class="detail-kv__v"
          >${N.impl_review||"\uC5C6\uC74C"}${u?" \xB7 stale":""}</span
        >
      </div>
      ${N.pr_url?d`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${N.pr_url}</span>
          </div>`:""}
    `}let he={route:["spec_backed","full_plan"]};async function Fe(w,N){let x=N.target.value;if(w==="route"&&c&&c.metadata&&c.metadata.route==="full_plan"&&x!=="full_plan"&&!window.confirm(`full_plan \u2192 ${x||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){ne();return}await Te("update-workflow-meta",{id:a,key:w,value:x},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),ne()}function I(w){let N=w.metadata||{};return d` ${((Z,qe)=>{let u=he[Z],m=typeof N[Z]=="string"?N[Z]:"";return d`<div class="detail-kv">
        <span class="detail-kv__k">${Z}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${Z}
          data-edit=${`wfmeta-${Z}`}
          @change=${R=>Fe(Z,R)}
        >
          <option value="" ?selected=${!u.includes(m)}>
            ${qe}
          </option>
          ${u.map(R=>d`<option value=${R} ?selected=${m===R}>${R}</option>`)}
        </select>
      </div>`})("route","(\uBBF8\uC124\uC815 \xB7 \uCD94\uB860)")} `}function F(w){return h?d`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${v}
            @input=${me}
            @keydown=${N=>Je(N,ut,Pe,!1)}
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
        <h2 class="detail-overlay__title">${w}</h2>
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${Ne}
        >
          ✎
        </button>
      </div>
    `}function J(w){let N=it(w.created_at),x=it(w.updated_at);return!N&&!x?d``:d`
      ${N?d`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${N}</span>
          </div>`:""}
      ${x?d`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${x}</span>
          </div>`:""}
    `}function Y(w,N){return d`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${Xe}
        >
          ${pc.map(x=>d`<option value=${x} ?selected=${x===w}>${x}</option>`)}
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
          ${fc.map(x=>d`<option value=${String(x)} ?selected=${x===N}>
                P${x}
              </option>`)}
        </select>
      </div>
    `}function ee(w){return d`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${b?"":d`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${Ze}
            >
              ✎
            </button>`}
      </div>
      ${b?d`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${$}
              @input=${xt}
              @keydown=${N=>Je(N,pt,Ye,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${pt}
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
          </div>`:d`<div class="detail-overlay__desc">
            ${w||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function de(w){let N=typeof w.notes=="string"?w.notes:"";return N.trim().length===0?d``:d`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${N}</div>
    `}function fe(w){let N=Array.isArray(w.labels)?w.labels:[];return d`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${N.map(x=>d`<span class="detail-label-chip"
              >${x}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${x}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+x}
                @click=${()=>De(x)}
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
            @input=${Ve}
            @keydown=${Ie}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${Ge}
          >
            추가
          </button>
        </span>
      </div>
    `}function we(){if(!a)return d``;let w=c||{},N=String(w.id||a),x=w.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",Z=w.status||"open",qe=typeof w.priority=="number"?Math.max(0,Math.min(4,w.priority)):"",u=w.description||"",m={...w,metadata:{...w.metadata||{},...f}};return d`
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
            ${N}
          </button>
          ${F(x)} ${Y(Z,qe)}
          ${J(w)} ${ee(u)}
          ${de(w)} ${fe(w)} ${Me(w)}
          ${_t(w)} ${I(w)}
          ${yo(w,tt)}
          ${vo(m,rt,se())}
          ${oi(S(),V,{total:T(),expanded:D})}
        </div>
      </div>
    `}function ne(){be(we(),t)}return{load(w){w!==a&&(f={},A()),a=w,c=null,re()},clear(){a=null,c=null,f={},A(),q.close(),C.close(),be(d``,t)},destroy(){Ce&&(Ce(),Ce=null),Ue&&(Ue(),Ue=null),document.removeEventListener("keydown",ye),q.destroy(),P.parentNode&&P.parentNode.removeChild(P),C.destroy(),B.parentNode&&B.parentNode.removeChild(B),a=null,c=null,be(d``,t)}}}var hc=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function ai(t,e){return Cn(t,e)?"shown":e.hidden_labels.includes(t)?"hidden_exact":"hidden_prefix"}function _c(t,e,r){if(!r)return{hidden_labels:e.hidden_labels.includes(t)?e.hidden_labels:[...e.hidden_labels,t],visible_labels:e.visible_labels.filter(o=>o!==t)};let n=e.hidden_labels.filter(o=>o!==t);return e.hidden_prefixes.some(o=>o.length>0&&t.startsWith(o))?{hidden_labels:n,visible_labels:e.visible_labels.includes(t)?e.visible_labels:[...e.visible_labels,t]}:{hidden_labels:n}}function li(t,e){let{policyStore:r,transport:n,labelOptions:s}=e,o=document.createElement("dialog");o.id="display-settings-dialog",o.className="display-settings",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),t.appendChild(o);let i="";async function l(T){let D=r.get();if(D)try{let y=await n("display-policy-set",{expected_revision:D.revision,policy:T(D)});a(y),y&&y.conflict&&y.policy&&(y=await n("display-policy-set",{expected_revision:y.policy.revision,policy:T(y.policy)}),a(y)),y&&y.conflict&&te("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC","error",4e3)}catch{te("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function a(T){T&&T.policy&&typeof T.policy=="object"&&r.set(T.policy)}function c(T){let D=r.get();if(!D)return;let y=ai(T,D)!=="shown";l(G=>_c(T,G,y))}function f(){let T=i.trim();T.length!==0&&(i="",l(D=>D.hidden_prefixes.includes(T)?{hidden_prefixes:D.hidden_prefixes}:{hidden_prefixes:[...D.hidden_prefixes,T]}),A())}function h(T){l(D=>({hidden_prefixes:D.hidden_prefixes.filter(y=>y!==T)}))}function b(T){let D=r.get();if(!D)return;let y=D.chips[T]===!1;l(()=>({chips:{[T]:y}}))}function v(T){let D=s();return d`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">라벨 표시</h3>
        <p class="display-settings__hint">
          라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을
          누르면 그 라벨만 예외로 다시 표시됩니다.
        </p>
        ${D.length===0?d`<div class="display-settings__empty">라벨 없음</div>`:d`<div class="display-settings__pills">
              ${D.map(y=>{let G=ai(y,T);return d`<button
                  type="button"
                  class=${`display-settings__pill display-settings__pill--${G}`}
                  data-label=${y}
                  data-state=${G}
                  @click=${()=>c(y)}
                >
                  ${y}
                </button>`})}
            </div>`}
      </section>
    `}function $(T){return d`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">숨김 prefix</h3>
        <div class="display-settings__prefixes">
          ${T.hidden_prefixes.map(D=>d`<span class="display-settings__prefix">
                ${D}
                <button
                  type="button"
                  class="display-settings__prefix-remove"
                  aria-label=${`${D} \uADDC\uCE59 \uC81C\uAC70`}
                  @click=${()=>h(D)}
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
            @input=${D=>{i=String(D.target.value||"")}}
          />
          <button type="button" @click=${f}>추가</button>
        </div>
      </section>
    `}function E(T){return d`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">카드 표시 요소</h3>
        <div class="display-settings__toggles">
          ${hc.map(([D,y])=>d`<label class="display-settings__toggle">
                <input
                  type="checkbox"
                  data-chip=${D}
                  .checked=${T.chips[D]!==!1}
                  @change=${()=>b(D)}
                />
                <span>${y}</span>
              </label>`)}
        </div>
      </section>
    `}function A(){let T=r.get();be(d`
        <div class="display-settings__container">
          <header class="display-settings__header">
            <div class="display-settings__title">표시 설정</div>
            <button
              type="button"
              class="display-settings__close"
              aria-label="닫기"
              @click=${S}
            >
              ×
            </button>
          </header>
          <div class="display-settings__body">
            ${T?d`${v(T)} ${$(T)}
                ${E(T)}`:d`<div class="display-settings__empty">
                  표시 정책을 불러오는 중…
                </div>`}
          </div>
        </div>
      `,o)}let P=!1,q=()=>{P=!1};o.addEventListener("close",q),o.addEventListener("cancel",q);let B=null;r.subscribe&&(B=r.subscribe(()=>{P&&A()}));function C(){P||(i="",P=!0,A(),typeof o.showModal=="function"?o.showModal():o.setAttribute("open",""))}function S(){P&&(P=!1,typeof o.close=="function"?o.close():o.removeAttribute("open"))}return{open:C,close:S,destroy(){P=!1,o.removeEventListener("close",q),o.removeEventListener("cancel",q),B&&(B(),B=null),o.remove()}}}function ci(t){let e=document.createElement("dialog");e.id="fatal-error-dialog",e.setAttribute("role","alertdialog"),e.setAttribute("aria-modal","true"),e.innerHTML=`
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
    </div>`,t.appendChild(e);let r=e.querySelector("#fatal-error-title"),n=e.querySelector("#fatal-error-message"),s=e.querySelector("#fatal-error-detail"),o=e.querySelector("#fatal-error-reload"),i=e.querySelector("#fatal-error-close"),l=()=>{if(typeof e.close=="function")try{e.close()}catch{}e.removeAttribute("open")},a=(c,f,h="")=>{r&&(r.textContent=c||"Unexpected Error"),n&&(n.textContent=f||"An unrecoverable error occurred.");let b=typeof h=="string"?h.trim():"";if(s&&(b.length>0?(s.textContent=b,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof e.showModal=="function")try{e.showModal(),e.setAttribute("open","")}catch{e.setAttribute("open","")}else e.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),i&&i.addEventListener("click",()=>l()),e.addEventListener("cancel",c=>{c.preventDefault(),l()}),{open:a,close:l,getElement(){return e}}}function hr(t){let e=bt(t.created_at),r=bt(t.updated_at);return!e&&!r?"":d`<div class="worker-mini__meta">
    ${e?d`<span title=${`\uC0DD\uC131 ${it(t.created_at)}`}
          >생성 ${e}</span
        >`:""}${e&&r?d`<span>·</span>`:""}${r?d`<span title=${`\uC218\uC815 ${it(t.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </div>`}function ss(t){let e=t.draggable&&!t.done,r=Array.isArray(t.badges)?t.badges:[],n=Mt(t.usage),s=t.merge_step||null,o=t.lane==="pr_wait"||!!t.revise_action,i=t.lane==="done"&&!o,l=i?bt(t.done_at):"",a=e?d`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",c=d`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${t.id}</span
  >`,f=d`<span class="worker-mini__title">${t.title}</span>`,h=t.pr_url&&t.pr_number?d`<a
          class="worker-mini__pr"
          href=${t.pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="PR 열기"
          >#${t.pr_number} ↗</a
        >`:"",b=r.map(S=>S===t.live_badge?d`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${S}</span
        >`:d`<span
          class="worker-mini__badge${t.alert?" worker-mini__badge--alert":""}"
          >${S}</span
        >`),v=t.reason?d`<span class="worker-mini__reason">${t.reason}</span>`:"",$=n?d`<span class="worker-usage" title=${fr(t.usage)}
        >${n}</span
      >`:"",E=s?d`<span class="merge-step"
        >${s.label}<span class="merge-step__n"
          >${s.index}/${s.total}</span
        ></span
      >`:"",A=t.merge_action?d`<button
        type="button"
        class="worker-mini__merge"
        data-bead-id=${t.id}
        ?disabled=${t.merge_enabled===!1}
        title=${t.merge_title||""}
      >
        ${t.merge_label||"\uBA38\uC9C0"}
      </button>`:"",P=t.cancel_action?d`<button
        type="button"
        class="worker-mini__merge-cancel"
        data-bead-id=${t.id}
        ?disabled=${t.cancel_enabled===!1}
        title=${t.cancel_title||""}
      >
        취소
      </button>`:"",q=t.discard_action?d`<button
        type="button"
        class="worker-mini__discard"
        data-bead-id=${t.id}
        ?disabled=${t.discard_enabled===!1}
        title=${t.discard_enabled===!1?t.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
      >
        폐기
      </button>`:"",B=t.revise_action?d`<button
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
        </button>`:"",C=!!(n||s||t.merge_action||t.cancel_action||t.discard_action||t.revise_action);return d`<div
    class="worker-mini${o?" worker-mini--card":""}${e?"":" worker-mini--static"}${t.done?" worker-mini--done":""}${s?" worker-mini--merging":""}${t.external?" worker-mini--external":""}"
    style=${s?`--progress: ${s.percent}%`:""}
    draggable=${e?"true":"false"}
    data-bead-id=${t.id}
    data-lane=${t.lane}
  >
    ${i?d`<div class="worker-mini__row1">${c}${f}</div>
          <div class="worker-mini__row2">
            ${$}${l?d`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${it(t.done_at)}`}
                  >완료 ${l}</span
                >`:""}${b}${E}
            <span class="worker-mini__actions"
              >${A}${P}${q}</span
            >
            ${hr(t)}
          </div>`:o?d`<div class="worker-mini__head">
              ${a}${c}${h}${b}${v}
            </div>
            <div class="worker-mini__body">${f}</div>
            ${C?d`<div class="worker-mini__foot">
                  ${$}${E}
                  <span class="worker-mini__actions"
                    >${A}${P}${q}${B}</span
                  >
                </div>`:""}
            ${hr(t)}`:d`<div class="worker-mini__line">
              ${a}${c}${f}${h}${b}${v}${$}${E}${A}${P}${q}
            </div>
            ${hr(t)}`}
  </div>`}function gc(t){let e=t.draggable&&!t.done,r=t.workflow,n=r&&r.chips||{},s=n.route||r&&r.route,o=n.route_source==="derived"||!!(r&&r.route_source==="derived"),i=typeof t.reason=="string"&&t.reason.startsWith("\u26D4");return d`<div
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
    ${r?Zr(r,t.status):""}
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
    ${hr(t)}
  </div>`}function Ft(t){let e=!!t.collapsible&&!!t.collapsed,r=d`<span
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
                  </div>`:t.items.map(n=>t.lane==="candidate"?gc(n):ss(n))}
          </div>`}
  </section>`}var di=160;function os(t){return t.length>di?`${t.slice(0,di)}\u2026`:t}function mc(t){return!t||!t.reason?"":d`<div class="worker-banner__detail">
    가드:
    ${t.reason}${t.command?d` · <code>${os(t.command)}</code>`:""}
  </div>`}function bc(t){return t?d`<details class="worker-banner__tail">
    <summary>출력 tail</summary>
    <pre>${t}</pre>
  </details>`:""}function wc(t){return t?d`<div class="worker-banner__log-path">
    전체 로그: <code>${t}</code>
  </div>`:""}function is(t){if(!Number.isFinite(t)||t<0)return"0s";let e=Math.floor(t/1e3),r=Math.floor(e/60),n=e%60;return r>0?`${r}m ${String(n).padStart(2,"0")}s`:`${n}s`}function kc(t){if(!t||!t.reason)return"";let e=t.reason.startsWith("export_removal_failed:");return d`<div
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
          남은 작업: <code>${os(t.detail)}</code>
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
  </div>`}function ui(t){let e=Array.isArray(t.cleanupFailures)?t.cleanupFailures:[];return d`<div class="worker-banners">
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
          ${mc(t.failure.cause_detail)}
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
                <code>${os(r.detail)}</code>
              </div>`:""}
          ${wc(r.log_path)} ${bc(r.output_tail)}
        </div>`)}
    ${kc(t.shipFailure)}
  </div>`}function yc(t,e,r=null){let n=!!t.paused,s=n?"\uC77C\uC2DC\uC815\uC9C0":typeof t.started_at=="number"?is(e-t.started_at):"\u2014",o=[t.runner,t.model].filter(Boolean).join(" \xB7 "),i=Mt(t.usage),l=t.conflict_resolution?n?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,a=t.base_exception||null,c=t.attempt_id&&t.attempt_id===r;return d`<div
    class="rtile${c?" rtile--sel":""}${n?" rtile--paused":""}"
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
    ${t.current_child?d`<div class="rtile__child" title="현재 진행중 child">
          └ ${t.current_child}
        </div>`:""}
    ${o||i||l||a?d`<div class="rtile__meta">
          ${l?d`<span class="worker-mini__badge">${l}</span>`:""}
          ${a?d`<span
                class="worker-mini__badge"
                title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
                >${a}</span
              >`:""}
          ${o?d`<span class="rtile__runner">${o}</span>`:""}
          ${i?d`<span class="worker-usage" title=${fr(t.usage)}
                >${i}</span
              >`:""}
        </div>`:""}
    ${hr(t)}
    <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일): 큐
         스냅샷에는 페이즈명도 진행률도 없으므로 진행 바는 만들지 않는다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
    ${n?"":d`<div class="rtile__accent" aria-hidden="true"></div>`}
  </div>`}function as(t,e=Date.now(),r=null){let n=Array.isArray(t)?t:[];return d`<div class="worker-rungrid" id="worker-rungrid">
    ${n.length===0?d`<div class="worker-rungrid__empty">실행 세션 없음</div>`:n.map(s=>yc(s,e,r))}
  </div>`}var vc=6e4;function $c(t,e){if(typeof t!="number"||!Number.isFinite(t))return"";let n=e-t<vc,s=`\uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${it(t)}`;return d`<span
    class="mon-row__beat${n?" mon-row__beat--live":""}"
    title=${s}
    ><span class="mon-row__beat-dot" aria-hidden="true"></span>${n?"":d`<span class="mon-row__beat-age"
          >${bt(t,e)}</span
        >`}</span
  >`}function xc(t,e){let r=Mt(t.usage),n=t.has_attempt===!0,s=n&&typeof t.started_at=="number"?is(e-t.started_at):"",o=n?"":bt(t.updated_at,e);return d`<div class="mon-row" data-issue-id=${t.id} role="listitem">
    <span class="mon-row__spine" aria-hidden="true"></span>
    <button type="button" class="mon-row__id" title="상세 열기">
      ${t.id}
    </button>
    <span class="mon-row__title">${t.title||t.id}</span>
    ${t.current_child?d`<span class="mon-row__child" title="현재 진행중 child"
          >└ ${t.current_child}</span
        >`:""}
    <span class="mon-row__live">
      ${s?d`<span class="mon-row__elapsed">${s}</span>`:""}
      ${n?$c(t.last_event_at,e):""}
      ${o?d`<span
            class="mon-row__since"
            title=${`\uC218\uC815 ${it(t.updated_at)}`}
            >마지막 갱신 ${o}</span
          >`:""}
      ${r?d`<span class="worker-usage" title=${fr(t.usage)}
            >${r}</span
          >`:""}
    </span>
  </div>`}function pi(t,e=Date.now()){let r=Array.isArray(t)?t:[];return d`<section class="mon-group" id="monitor-in-progress">
    <header class="mon-group__hd">
      <span class="mon-group__title">진행중</span>
      <span class="mon-group__count">${r.length}</span>
    </header>
    ${r.length===0?d`<div class="mon-group__empty">진행중 이슈 없음</div>`:d`<div class="mon-group__list" role="list">
          ${r.map(n=>xc(n,e))}
        </div>`}
  </section>`}var ls="tab:monitor:in-progress",Sc=1e3;function Tc(t){let e=t&&t.parent;return typeof e=="string"?e:e&&e.id?String(e.id):""}function fi(t,e){let r=Le("views:monitor"),n=e.gotoIssue,s=e.issueStores,o=e.queueStore,i=e.now||(()=>Date.now()),l=null,a=null,c=null;function f(){return(s&&s.snapshotFor?s.snapshotFor(ls)||[]:[]).slice().sort((P,q)=>(Ot(q&&q.updated_at)??0)-(Ot(P&&P.updated_at)??0))}function h(){let A=new Map,P=o&&o.get?o.get():null,q=P&&P.attempts||{};for(let B of Object.values(q)){if(!B||B.status!=="running")continue;let C=B.bead_id;typeof C!="string"||C.length===0||A.set(C,{started_at:typeof B.started_at=="number"?B.started_at:null,last_event_at:typeof B.last_event_at=="number"?B.last_event_at:null,usage:Nt(q,C)})}return A}function b(){let A=f(),P=new Map;for(let B of A){let C=Tc(B);if(!C)continue;let S=P.get(C);S?S.push(B):P.set(C,[B])}let q=h();return A.map(B=>{let C=q.get(B.id)||null,S=lr(P.get(B.id)||[]);return{id:B.id,title:B.title||B.id,current_child:S?S.title||S.id:null,started_at:C?C.started_at:null,last_event_at:C?C.last_event_at:null,updated_at:B.updated_at,usage:C?C.usage:null,has_attempt:!!C}})}function v(){be(pi(b(),i()),t)}function $(A){let P=A.target,q=P&&P.closest?P.closest(".mon-row"):null;if(!q)return;let B=q.getAttribute("data-issue-id");B&&(A.preventDefault(),n(B))}t.addEventListener("click",$),s&&typeof s.subscribe=="function"&&(l=s.subscribe(()=>{try{v()}catch{}})),o&&typeof o.subscribe=="function"&&(a=o.subscribe(()=>{try{v()}catch{}}));function E(){c!==null&&(clearInterval(c),c=null)}return{load(){r("load"),v(),c===null&&(c=setInterval(()=>{try{v()}catch{}},Sc))},pause(){E()},clear(){E(),l&&(l(),l=null),a&&(a(),a=null),t.removeEventListener("click",$),t.replaceChildren()}}}function hi(t,e,r){let n=Le("views:nav"),s=null;function o(a){return c=>{c.preventDefault(),n("click tab %s",a),r.gotoView(a)}}function i(){let a=e.getState(),c=a.view==="worker"||a.view==="monitor"?a.view:"board";return d`
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
        <a
          href="#/monitor"
          class="ctl-tab ${c==="monitor"?"is-active":""}"
          @click=${o("monitor")}
          >Monitor</a
        >
      </div>
    `}function l(){be(i(),t)}return l(),s=e.subscribe(()=>l()),{destroy(){s&&(s(),s=null),be(d``,t)}}}var _i=["bug","feature","task","epic","chore"];function gi(t){switch((t||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var mi=["Critical","High","Medium","Low","Backlog"];function bi(t,e){let r=document.createElement("dialog");r.id="new-issue-dialog",r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true"),r.innerHTML=`
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
  `,t.appendChild(r);let n=r.querySelector("#new-issue-form"),s=r.querySelector("#new-title"),o=r.querySelector("#new-type"),i=r.querySelector("#new-priority"),l=r.querySelector("#new-labels"),a=r.querySelector("#new-description"),c=r.querySelector("#new-issue-error"),f=r.querySelector("#btn-cancel"),h=r.querySelector("#btn-create"),b=r.querySelector(".new-issue__close");function v(){o.replaceChildren();let S=document.createElement("option");S.value="",S.textContent="\u2014 Select \u2014",o.appendChild(S);for(let T of _i){let D=document.createElement("option");D.value=T,D.textContent=gi(T),o.appendChild(D)}i.replaceChildren();for(let T=0;T<=4;T+=1){let D=document.createElement("option");D.value=String(T);let y=mi[T]||"Medium";D.textContent=`${T} \u2013 ${y}`,i.appendChild(D)}}v();function $(){try{typeof r.close=="function"?r.close():r.removeAttribute("open")}catch{r.removeAttribute("open")}}function E(S){s.disabled=S,o.disabled=S,i.disabled=S,l.disabled=S,a.disabled=S,f.disabled=S,h.disabled=S,h.textContent=S?"Creating\u2026":"Create"}function A(){c.textContent=""}function P(S){c.textContent=S}function q(){try{let S=window.localStorage.getItem("beads-ui.new.type");S?o.value=S:o.value="";let T=window.localStorage.getItem("beads-ui.new.priority");T&&/^\d$/.test(T)?i.value=T:i.value="2"}catch{o.value="",i.value="2"}}function B(){let S=o.value||"",T=i.value||"";S.length>0&&window.localStorage.setItem("beads-ui.new.type",S),T.length>0&&window.localStorage.setItem("beads-ui.new.priority",T)}async function C(){A();let S=String(s.value||"").trim();if(S.length===0){P("Title is required"),s.focus();return}let T=Number(i.value||"2");if(!(T>=0&&T<=4)){P("Priority must be 0..4"),i.focus();return}let D=String(o.value||""),y=String(a.value||""),G={title:S};D.length>0&&(G.type=D),String(T).length>0&&(G.priority=T),y.length>0&&(G.description=y),E(!0);try{await e("create-issue",G)}catch{E(!1),P("Failed to create issue");return}B(),E(!1),$()}return r.addEventListener("cancel",S=>{S.preventDefault(),$()}),b.addEventListener("click",()=>$()),f.addEventListener("click",()=>$()),r.addEventListener("keydown",S=>{S.key==="Enter"&&(S.ctrlKey||S.metaKey)&&(S.preventDefault(),C())}),n.addEventListener("submit",S=>{S.preventDefault(),C()}),{open(){n.reset(),A(),q();try{"showModal"in r&&typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")}catch{r.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){$()}}}function wi(t){if(typeof t!="number"||!Number.isFinite(t)||t<=0)return"";if(t<6e4)return`${Math.round(t/1e3)}\uCD08`;let e=t/6e4;return`${Number.isInteger(e)?e:Math.round(e*10)/10}\uBD84`}function ki(t){return Array.isArray(t)?t.filter(e=>typeof e=="string").join(" "):""}var Ac={deployed:{modifier:"ok",label:"\uC131\uACF5"},launched:{modifier:"launched",label:"\uBC1C\uC0AC\uB428 \xB7 \uACB0\uACFC \uBBF8\uAD00\uCE21"},failed:{modifier:"fail",label:"\uC2E4\uD328"}},yi=160;function Ec(t){return t.length>yi?`${t.slice(0,yi)}\u2026`:t}var Cc=[{key:"orchestration_model",values:()=>Ln},{key:"orchestration_effort",values:()=>Dn},{key:"review_model",values:()=>On},{key:"impl_model",values:()=>Mn}];function vi(t,e){let{queueStore:r,transport:n,getWorkspacePath:s}=e,o=document.createElement("dialog");o.id="worker-exec-defaults-dialog",o.className="exec-defaults",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),t.appendChild(o);function i(){return r&&r.get()||{revision:0,exec_defaults:{}}}function l(){let y=i();return typeof y.revision=="number"?y.revision:0}function a(){let y=i().exec_defaults;return y&&typeof y=="object"?y:{}}function c(y){y&&y.queue&&r&&r.set(y.queue)}async function f(y,G){if(!n)return;let j={key:y,value:G||null};try{let V=await n("worker-queue-set-exec-default",{...j,expected_revision:l()});c(V),V&&V.conflict&&(V=await n("worker-queue-set-exec-default",{...j,expected_revision:l()}),c(V)),V&&V.conflict&&te("\uC804\uC5ED \uC2E4\uD589 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC","error",4e3)}catch{te("\uC804\uC5ED \uC2E4\uD589 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function h(y,G,j){let V=!!j&&!G.includes(j);return d`<div class="exec-defaults__row">
      <span class="exec-defaults__k">${y}</span>
      <select
        class="exec-defaults__sel"
        aria-label=${`\uC804\uC5ED ${y}`}
        data-key=${y}
        @change=${se=>{f(y,se.target.value)}}
      >
        <option value="" ?selected=${!j}>
          ${Nn[y]||"(\uAE30\uBCF8)"}
        </option>
        ${V?d`<option value=${j} ?selected=${!0}>
              ${j} (비호환)
            </option>`:""}
        ${G.map(se=>d`<option value=${se} ?selected=${j===se}>${se}</option>`)}
      </select>
    </div>`}function b(){let y=i().workspace_info;return y&&typeof y=="object"?y:{}}function v(y,G){return d`<span
      class="exec-defaults__vd-badge exec-defaults__vd-badge--${y}"
      >${G}</span
    >`}function $(y){let G=y?ki(y.cmd):"",j=y?wi(y.timeout_ms):"",V=s&&s()||"<workspace \uACBD\uB85C>";return d`<div class="exec-defaults__vd-group" data-vd="verify">
      <div class="exec-defaults__vd-label">머지 전 검증 (verify)</div>
      ${G?d`<div class="exec-defaults__vd-line">
            <span class="exec-defaults__vd-cmd">${G}</span>
            ${v("config","config")}
            ${j?d`<span class="exec-defaults__vd-meta"
                  >timeout ${j}</span
                >`:""}
          </div>`:d`<div class="exec-defaults__vd-line exec-defaults__vd-absent">
            검증 없음 —
            <span class="exec-defaults__vd-cmd"
              >[worker.verify."${V}"]</span
            >
            섹션으로 정의
          </div>`}
    </div>`}function E(y){let G=y?ki(y.cmd):"",j=y?wi(y.timeout_ms):"",V=j?`timeout ${j} \xB7 verify \uD1B5\uACFC \uC2DC\uC5D0\uB9CC \uC2E4\uD589`:"verify \uD1B5\uACFC \uC2DC\uC5D0\uB9CC \uC2E4\uD589",se=s&&s()||"<workspace \uACBD\uB85C>";return d`<div class="exec-defaults__vd-group" data-vd="deploy">
      <div class="exec-defaults__vd-label">머지 후 배포 (deploy)</div>
      ${G?d`<div class="exec-defaults__vd-line">
            <span class="exec-defaults__vd-cmd">${G}</span>
            ${v("config","config")}
            ${y.detached===!0?v("detached","detached"):""}
            <span class="exec-defaults__vd-meta">${V}</span>
          </div>`:d`<div class="exec-defaults__vd-line exec-defaults__vd-absent">
            배포 없음 —
            <span class="exec-defaults__vd-cmd"
              >[worker.deploy."${se}"]</span
            >
            섹션으로 정의
          </div>`}
    </div>`}function A(y){if(!y||typeof y!="object")return"";let G=Ac[String(y.outcome)];if(!G)return"";let j=y.outcome==="failed"&&y.reason?`${G.label} \xB7 ${y.reason}`:G.label,V=[it(y.at),typeof y.bead_id=="string"?y.bead_id:"",typeof y.base_sha=="string"?y.base_sha.slice(0,7):""].filter(Ue=>Ue.length>0).join(" \xB7 "),se=typeof y.detail=="string"&&y.detail.length>0?Ec(y.detail):"",Ce=typeof y.log_path=="string"&&y.log_path.length>0?y.log_path:"";return d`<div class="exec-defaults__vd-group" data-vd="last-deploy">
      <div class="exec-defaults__vd-label">마지막 배포</div>
      <div class="exec-defaults__vd-line">
        ${v(G.modifier,j)}
        ${V?d`<span class="exec-defaults__vd-meta">${V}</span>`:""}
      </div>
      ${se?d`<div class="exec-defaults__vd-line" data-vd-part="detail">
            <code class="exec-defaults__vd-cmd">${se}</code>
          </div>`:""}
      ${Ce?d`<div class="exec-defaults__vd-line" data-vd-part="log-path">
            전체 로그:
            <code class="exec-defaults__vd-cmd">${Ce}</code>
          </div>`:""}
    </div>`}function P(y){return d`<section class="exec-defaults__vd">
      <p class="exec-defaults__vd-title">
        검증·배포 설정
        <span class="exec-defaults__vd-ro"
          >읽기 전용 — config.toml에서 정의</span
        >
      </p>
      ${$(y.verify_cmd)} ${E(y.deploy_cmd)}
      ${A(y.last_deploy)}
    </section>`}function q(){let y=a();be(d`
        <div class="exec-defaults__container">
          <header class="exec-defaults__header">
            <div class="exec-defaults__title">전역 실행 설정</div>
            <button
              type="button"
              class="exec-defaults__close"
              aria-label="닫기"
              @click=${D}
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
            ${Cc.map(G=>h(G.key,G.values(),y[G.key]||""))}
            ${P(b())}
          </div>
        </div>
      `,o)}let B=!1,C=()=>{B=!1};o.addEventListener("close",C),o.addEventListener("cancel",C);let S=null;r&&r.subscribe&&(S=r.subscribe(()=>{B&&q()}));function T(){B||(B=!0,q(),typeof o.showModal=="function"?o.showModal():o.setAttribute("open",""))}function D(){B&&(B=!1,typeof o.close=="function"?o.close():o.removeAttribute("open"))}return{open:T,close:D,destroy(){B=!1,o.removeEventListener("close",C),o.removeEventListener("cancel",C),S&&(S(),S=null),o.remove()}}}var Rc="tab:worker:ready",Ic="tab:worker:blocked",Lc="tab:worker:in-progress",un=1;function us(t){let e=t&&t.metadata;return!!(e&&typeof e=="object"&&e.spec_id)}var Ti="beads-ui.worker.candidate-filter",cs={show_blocked:!1,spec:"all"};function Dc(){try{let t=window.localStorage.getItem(Ti);if(!t)return{...cs};let e=JSON.parse(t);if(!e||typeof e!="object")return{...cs};let r=e.spec;return{show_blocked:e.show_blocked===!0,spec:r==="with"||r==="without"?r:"all"}}catch{return{...cs}}}function Oc(t){try{window.localStorage.setItem(Ti,JSON.stringify(t))}catch{}}function Mc(t,e){let r=l=>e.show_blocked||!l.blocked,n=l=>e.spec==="all"||(e.spec==="with"?l.has_spec:!l.has_spec),s=[],o=0,i=0;for(let l of t){let a=r(l),c=n(l);a&&c?s.push(l):!a&&c?o+=1:a&&!c&&(i+=1)}return{visible:s,hidden_blocked:o,hidden_spec:i}}var Nc=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],Ai="bdui.worker.candidate_sort",Pc=[{value:"spec",label:"spec \uC6B0\uC120"},{value:"board",label:"Board \uC21C\uC11C"},{value:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131\uC21C"}],pn="spec";function Fc(){try{let t=window.localStorage.getItem(Ai);return t==="board"||t==="created"||t==="spec"?t:pn}catch{return pn}}function qc(t){try{window.localStorage.setItem(Ai,t)}catch{}}var Ei="bdui.worker.done-range";function Bc(){try{let t=window.localStorage.getItem(Ei);return nr(t)?t:Dt}catch{return Dt}}function Uc(t){try{window.localStorage.setItem(Ei,t)}catch{}}var zc="(max-width: 640px)",Ci="beads-ui.worker.lane-collapsed",Nr={queue:!0,done:!0};function Hc(){try{let t=window.localStorage.getItem(Ci);if(!t)return{...Nr};let e=JSON.parse(t);return!e||typeof e!="object"?{...Nr}:{queue:typeof e.queue=="boolean"?e.queue:Nr.queue,done:typeof e.done=="boolean"?e.done:Nr.done}}catch{return{...Nr}}}function Wc(t){try{window.localStorage.setItem(Ci,JSON.stringify(t))}catch{}}function $i(t){let e=Array.isArray(t)&&t.length>0?t[0]:null;if(!e)return"";let r=typeof e.title=="string"?e.title:e.id||"";return r.length>22?`${r.slice(0,22)}\u2026`:r}function Gc(t,e,r){let n=Array.isArray(t)?t.slice():[];return e==="created"?n.sort(jt):(n.sort(Gr(r)),e==="board"?n:[...n.filter(us),...n.filter(s=>!us(s))])}function jc(t){let e=t&&t.parent;return(typeof e=="string"?e.length>0:!!(e&&e.id))||/\.\d+$/.test(t&&t.id||"")}function Yc(t){let e=t&&t.parent;return typeof e=="string"?e:e&&e.id?String(e.id):""}function Vc(t){let r=(Array.isArray(t?.dependencies)?t.dependencies:[]).map(n=>typeof n=="string"?n:n&&n.id).filter(Boolean);return r.length>0?`\u{1F512} ${r.join(", ")}`:"\u{1F512} blocked"}var Kc=["closed_unmerged","undecidable"],Zc=[{from:"\uAD00\uCE21 \uB300\uAE30",activity:"checking",to:"\uD655\uC778\uC911"},{from:"\uB85C\uCEEC\uAC80\uC99D \uB300\uAE30",activity:"verifying",to:"\uB85C\uCEEC\uAC80\uC99D \uC2E4\uD589 \uC911"}];function Xc(t,e){for(let r of Zc)if(t===r.from&&e===r.activity)return{label:r.to,live:!0};return{label:t,live:!1}}var ds=[{step:"merging",label:"\uBA38\uC9C0 \uC911"},{step:"base_sync",label:"base \uB3D9\uAE30\uD654"},{step:"post_merge_verify",label:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D"},{step:"deploy",label:"\uBC30\uD3EC"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"},{step:"ship_exported_capabilities",label:"capability \uBC1C\uD589"}];function Qc(t){if(typeof t!="string"||t.length===0)return null;let e=ds.length,r=ds.findIndex(n=>n.step===t);return r<0?{label:t,index:0,total:e,percent:0}:{label:ds[r].label,index:r+1,total:e,percent:Math.round((r+1)/e*100)}}function xi(t){switch(t){case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";default:return t}}function Si(t,e){return typeof t!="string"||t.length===0||typeof e!="string"||e.length===0||e===t?null:`\u2192 ${e}`}function Jc(t,e,r,n,s=null,o=null,i=null,l=!1,a=null,c=!0,f=null,h=null){let b=!!a&&a.position>0,v=!!a&&a.active===!0,$=a&&a.failure||null,E=r[t]||null,A=E&&E.gate?E.gate:null,P=E&&E.pr?E.pr:null,q=[];l&&q.push("\uC138\uC158");let B=i?i==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":null,C=Xc(l&&A&&A.tier==="closed_unmerged"?"\uB2EB\uD798":A&&A.gate_badge||"",B?null:o&&o.activity||null);B&&q.push(B),C.label&&q.push(C.label),A&&A.base_badge&&A.base_badge!==A.gate_badge&&q.push(A.base_badge),h&&q.push(h),n&&q.push("\uC815\uB9AC \uC2E4\uD328"),b&&!v&&q.push(`\uBA38\uC9C0 \uB300\uAE30 #${a.position}`),$&&q.push(`\uC77C\uAD04 \uBA38\uC9C0 \uC2E4\uD328: ${xi($)}`),f&&q.push(`\uC790\uB3D9 \uC81C\uC678: ${xi(f)}`);let S=!!A&&A.base_badge==="\uCDA9\uB3CC",T=!!A&&A.enabled===!0,D=Qc(o&&o.merge_progress?o.merge_progress.step:null),y=!!n&&!!A&&A.tier==="merged",G=l&&!!A&&A.tier==="merged",j=l&&S&&c===!1;return{id:t,title:e,reason:n?"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644":"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",external:l,pr_number:P&&typeof P.number=="number"?P.number:null,pr_url:P&&typeof P.url=="string"?P.url:"",badges:q,live_badge:i==="running"?B:B?null:C.live?C.label:null,usage:s,alert:!!A&&Kc.includes(A.tier)||!!n||!!$,merge_action:!b,cancel_action:b,cancel_enabled:!v,cancel_title:v?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard_action:!l&&!n&&!(A&&A.tier==="merged"),merge_step:D,discard_enabled:!D&&!i&&!b,discard_title:i?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":b?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":void 0,merge_enabled:!D&&!i&&!j&&(T||S||y||G),merge_label:G?"\uC815\uB9AC":S&&!D&&!y?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:D?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${D.label}`:G?"\uBA38\uC9C0\uB428 \u2014 \uD074\uB9AD\uD558\uBA74 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC\uB97C \uC218\uD589\uD569\uB2C8\uB2E4":j?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":i==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":i==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":y?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uCC98\uC74C\uBD80\uD130 \uB2E4\uC2DC \uC218\uD589\uD569\uB2C8\uB2E4":S?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":T?`\uBA38\uC9C0 (${A.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:A&&A.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${A&&A.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function ps(t,e={}){let{transport:r,issueStores:n,queueStore:s,sessionLogStore:o,uiOrderStore:i,gotoIssue:l,getWorkspacePath:a}=e,c=n?Yr(n,i):null,f=Vr({transport:r,uiOrderStore:i}),h=null,b=[],v=Dc(),$=Fc(),E=Bc();function A(){let u=vr.find(m=>m.value===E);return u?u.label:"\uC624\uB298"}let P=Hc(),q=!1,B=new Set,C=new Set,S=[],T=document.createElement("div");T.className="worker-console";let D=document.createElement("div");D.className="worker-top";let y=document.createElement("div");y.className="worker-drawer-overlay",y.hidden=!0;let G=document.createElement("div");G.className="worker-drawer-overlay__backdrop";let j=document.createElement("div");j.className="worker-drawer-host",y.append(G,j);let V=document.createElement("div");V.className="worker-lanes-host",T.append(D,y,V),t.appendChild(T);let se=null,Ce=Xr(j,{transport:r,sessionLogStore:o,onClose:()=>{se=null,y.hidden=!0,he()}}),Ue=vi(T,{queueStore:s,transport:r,getWorkspacePath:a});function ye(){return s&&s.get()||{revision:0,auto_advance:!1,auto_merge:!1,slots:un,queue:[],pr_wait:[],done:[]}}function re(){let u=ye();return typeof u.revision=="number"?u.revision:0}function O(u){u&&u.queue&&s&&s.set(u.queue)}function U(){let u=ye().queue;return Array.isArray(u)?u.length:0}async function K(u,m){if(!r)return;let R=await r("worker-queue-place",{bead_id:u,index:m,expected_revision:re()});O(R),R&&R.conflict&&await r("worker-queue-place",{bead_id:u,index:m,expected_revision:re()}).then(O)}async function Re(u,m){if(!r)return;let R=await r("worker-queue-reorder",{bead_id:u,to_index:m,expected_revision:re()});O(R),R&&R.conflict&&await r("worker-queue-reorder",{bead_id:u,to_index:m,expected_revision:re()}).then(O)}async function oe(u){if(!r)return;let m=await r("worker-queue-remove",{bead_id:u,expected_revision:re()});O(m),m&&m.conflict&&await r("worker-queue-remove",{bead_id:u,expected_revision:re()}).then(O)}async function Te(u){!r||!u||await r("worker-attempt-stop",{attempt_id:u})}async function ce(u){if(!r||!u)return;let m=await r("worker-attempt-pause",{attempt_id:u});m&&m.paused===!1&&m.reason&&te(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${m.reason}`,"error",2400)}async function Ne(u){if(!r||!u)return;let m=await r("worker-attempt-resume",{attempt_id:u,expected_revision:re()});O(m),m&&m.conflict&&(m=await r("worker-attempt-resume",{attempt_id:u,expected_revision:re()}),O(m)),m&&m.resumed===!1&&!m.conflict&&m.reason&&te(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${m.reason}`,"error",2400)}async function me(u){if(!r||!u)return;let m=await r("worker-attempt-dismiss",{attempt_id:u,expected_revision:re()});O(m),m&&m.conflict&&(m=await r("worker-attempt-dismiss",{attempt_id:u,expected_revision:re()}),O(m)),m&&m.dismissed===!1&&!m.conflict&&m.reason&&te(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${m.reason}`,"error",2400)}async function Pe(u,m){if(!r)return null;let R=r,ie=await R(u,{...m,expected_revision:re()});return O(ie),ie&&ie.conflict&&(ie=await R(u,{...m,expected_revision:re()}),O(ie)),ie}async function ut(u){if(!r||!u)return;B.add(u),he();let m;try{m=await Pe("worker-merge-queue-add",{bead_id:u})}finally{B.delete(u),he()}!m||m.conflict||m.applied||te("\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)","error",2400)}async function Ze(u){if(!r)return;let m=await Pe("worker-merge-auto-toggle",{on:u});!m||m.conflict||te(u?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",u?"success":"info",2400)}async function xt(u){if(!r||!u)return;let m=await Pe("worker-merge-queue-remove",{bead_id:u});m&&!m.conflict&&!m.applied&&m.reason==="merge_active"&&te("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function Ye(){await Pe("worker-merge-queue-remove",{all:!0})}async function pt(u){if(!r||!u||!(typeof globalThis.confirm!="function"||globalThis.confirm(`${u}: PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4. \uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694. \uACC4\uC18D\uD560\uAE4C\uC694?`)))return;let R=await r("worker-pr-discard",{bead_id:u,expected_revision:re()});if(O(R),R&&R.conflict&&(R=await r("worker-pr-discard",{bead_id:u,expected_revision:re()}),O(R)),R&&R.discarded===!0){te("\uD3D0\uAE30 \uC644\uB8CC \u2014 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB2E4\uC2DC \uC2E4\uD589\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4","success",2400);return}R&&R.discarded===!1&&!R.conflict&&te(`\uD3D0\uAE30 \uAC70\uBD80: ${R.reason||""}`,"error",2800)}async function Je(u,m){if(!r||!m||C.has(m))return;C.add(m),he();let R;try{R=await r(u,{bead_id:m,expected_revision:re()}),O(R),R&&R.conflict&&(R=await r(u,{bead_id:m,expected_revision:re()}),O(R))}finally{C.delete(m),he()}if(!(!R||R.conflict)){if(R.ok){te(u==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}te(`\uCC98\uBD84 \uAC70\uBD80: ${R.reason||""}`,"error",3e3)}}async function Xe(u){if(!r)return;let m=await r("worker-queue-toggle",{on:u,expected_revision:re()});O(m),m&&m.conflict&&await r("worker-queue-toggle",{on:u,expected_revision:re()}).then(O)}async function et(u){await Xe(u),await Ze(u)}async function Ve(u){if(!r||!Number.isFinite(u))return;let m=Math.max(un,Math.floor(u)),R=await r("worker-queue-set-slots",{slots:m,expected_revision:re()});O(R),R&&R.conflict&&await r("worker-queue-set-slots",{slots:m,expected_revision:re()}).then(O)}function Ge(){let u=ye(),m=c?c.selectBoardColumn(Rc,"ready"):[],R=c?c.selectBoardColumn(Ic,"blocked"):[],ie=c?c.selectBoardColumn(Lc,"in_progress"):[],$e=new Map;for(let k of ie){let z=Yc(k);if(!z)continue;let Q=$e.get(z);Q?Q.push(k):$e.set(z,[k])}let le=k=>{let z=lr($e.get(k)||[]);return z?z.title||z.id:null},ve=u.bead_titles||{},Ae=new Map;for(let[k,z]of Object.entries(ve))typeof z=="string"&&z.length>0&&Ae.set(k,z);for(let k of[...m,...R])Ae.set(k.id,k.title||k.id);let Ke=u.bead_times||{},ae=new Map;for(let[k,z]of Object.entries(Ke))z&&typeof z=="object"&&ae.set(k,z);for(let k of[...m,...R])ae.set(k.id,{created_at:k.created_at,updated_at:k.updated_at});let Qe=k=>ae.get(k)||{},gt=u.pr_wait||[],St=u.pr_observations||{},ze=u.pr_activity||{},st=u.cleanup_failed||{},ue=Object.entries(st).map(([k,z])=>({bead_id:k,step:z&&z.step?z.step:"",reason:z&&z.reason?z.reason:"",detail:z&&typeof z.detail=="string"?z.detail:null,output_tail:z&&typeof z.output_tail=="string"&&z.output_tail?z.output_tail:void 0,log_path:z&&typeof z.log_path=="string"&&z.log_path?z.log_path:void 0})),_e=u.ship_failure||null,Tt=_e&&typeof _e.reason=="string"&&_e.reason?{bead_id:typeof _e.bead_id=="string"?_e.bead_id:"",reason:_e.reason,detail:typeof _e.detail=="string"?_e.detail:null,pr_url:typeof _e.pr_url=="string"?_e.pr_url:null}:null,Et=u.queue||[],ot=new Set([...Et.map(k=>k.bead_id),...gt.map(k=>k.bead_id),...u.done.map(k=>k.bead_id)]),Bt=new Set(R.map(k=>k.id)),_=i?i.get()?.order||{}:{},g=new Set,H=[];for(let k of[...m,...R])ot.has(k.id)||g.has(k.id)||jc(k)||(g.add(k.id),H.push(k));b=Gc(H,$,_);let X=u.admission||{},M=k=>{let z=X[k];if(!z)return"";if(z.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let Q=typeof z.reason=="string"?z.reason:"",xe=Q.indexOf(":");return xe>0&&xe<Q.length-1?`\u26D4 ${Q.slice(0,xe)} (${Q.slice(xe+1)})`:`\u26D4 ${Q}`},p=b.map(k=>{let z=us(k),Q=Bt.has(k.id),xe=[];Q&&xe.push(Vc(k)),z||xe.push("spec \uC5C6\uC74C");let Br=M(k.id);return Br&&xe.push(Br),{id:k.id,title:k.title||k.id,reason:xe.join(" \xB7 "),draggable:z,lane:"candidate",created_at:k.created_at,updated_at:k.updated_at,workflow:k.workflow,status:k.status,blocked:Q,has_spec:z}}),L=Mc(p,v),W=L.visible,Ee=u.revise_parked||{},je=(k,z)=>k.map(Q=>{let xe=z==="queue"?Ee[Q.bead_id]:null;return{id:Q.bead_id,title:Ae.get(Q.bead_id)||Q.bead_id,reason:z==="done"?"":M(Q.bead_id),draggable:z!=="done",done:z==="done",lane:z,badges:xe?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!xe,revise_action:!!xe,revise_enabled:!!xe&&!C.has(Q.bead_id),revise_title:xe?xe.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${xe.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":"",usage:z==="done"?Nt(u.attempts||{},Q.bead_id):null,done_at:z==="done"&&typeof Q.added_at=="number"?Q.added_at:void 0,...Qe(Q.bead_id)}}),Oe=new Map;for(let k of u.done)k&&typeof k.bead_id=="string"&&typeof k.added_at=="number"&&Oe.set(k.bead_id,k.added_at);let He=u.attempts?Object.values(u.attempts):[],mt=new Set;for(let k of He)k&&typeof k.resumed_from=="string"&&k.resumed_from.length>0&&mt.add(k.resumed_from);let Ct=new Map;for(let k of He)Ct.set(k.bead_id,k.attempt_id);let Jt=new Map;for(let k of He)Jt.set(k.attempt_id,k);function We(k){let z=new Set,Q=k;for(;Q&&!z.has(Q.attempt_id);){if(Q.conflict_resolution===!0)return!0;z.add(Q.attempt_id),Q=typeof Q.resumed_from=="string"&&Q.resumed_from.length>0&&Jt.get(Q.resumed_from)||null}return!1}let er=typeof u.declared_base=="string"?u.declared_base:null;function Pr(k){let z=null;for(let Q of He)!Q||Q.bead_id!==k||We(Q)||(z===null||(typeof Q.started_at=="number"?Q.started_at:0)>=(typeof z.started_at=="number"?z.started_at:0))&&(z=Q);return z&&typeof z.target_base=="string"?z.target_base:null}let _r=[],At=null;for(let k of He){let z=k.status==="paused"&&!mt.has(k.attempt_id);if(k.status==="running"||z)_r.push({bead_id:k.bead_id,attempt_id:k.attempt_id,title:Ae.get(k.bead_id)||k.bead_id,runner:k.runner||null,model:k.model||null,effort:k.effort||null,started_at:typeof k.started_at=="number"?k.started_at:null,resumed_from:k.resumed_from||null,paused:z,conflict_resolution:We(k),base_exception:Si(er,k.target_base),can_pause:typeof k.session_id=="string"&&k.session_id.length>0,usage:Nt(u.attempts||{},k.bead_id),current_child:le(k.bead_id),...Qe(k.bead_id)});else if(k.status==="failed"||k.status==="orphaned"){let Q=Ct.get(k.bead_id)!==k.attempt_id,xe=Oe.get(k.bead_id),Br=typeof xe=="number"&&xe>0&&typeof k.finished_at=="number"&&xe>=k.finished_at;!Q&&!Br&&typeof k.dismissed_at!="number"&&(At=k)}}let gs=null;if(At){let k=typeof At.session_id=="string"&&At.session_id.length>0,z=mt.has(At.attempt_id),Q=At.cause_detail;gs={repo:At.repo||"",reason:At.cause||At.status,cause_detail:Q&&typeof Q.reason=="string"?{reason:Q.reason,command:typeof Q.command=="string"?Q.command:null}:null,resume_attempt_id:At.attempt_id,resume_eligible:k&&!z,resume_reason:k?z?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}}let Bi=new Set(_r.map(k=>k.bead_id)),fn=Array.isArray(u.merge_queue)?u.merge_queue:[],ms=new Map;fn.forEach((k,z)=>{k&&typeof k.bead_id=="string"&&ms.set(k.bead_id,z+1)});let bs=u.merge_queue_state||{active:null,failures:{}},Ui=bs.failures||{},zi=u.auto_merge_skips||{},ws=k=>{let z=zi[k];if(!z)return null;let Q=St[k],xe=Q&&Q.pr?Q.pr.head_sha:null;return xe&&xe===z.head_sha?z.reason||"":null},Fr=new Map;for(let k of _r)k.conflict_resolution&&(k.paused?Fr.has(k.bead_id)||Fr.set(k.bead_id,"paused"):Fr.set(k.bead_id,"running"));let ks=_r.filter(k=>!k.paused).length,ys=(u.workspace_info||{}).slots,vs=typeof ys=="number"?ys:typeof u.slots=="number"?u.slots:un,Hi=ks>vs,$s=zr(E),Wi=(Array.isArray(u.done)?u.done.slice():[]).filter(k=>$s===void 0||typeof k.added_at!="number"||k.added_at>=$s).sort((k,z)=>(z.added_at||0)-(k.added_at||0)),xs=je(Wi,"done"),qr={};for(let k of ur)qr[k]=0;let Ss=!1,Ts=0,hn=0,As=0;for(let k of xs){let z=k.usage;if(z&&typeof z=="object"){let Q=!1;for(let xe of ur)Number.isFinite(z[xe])&&(qr[xe]+=z[xe],Ss=!0,Q=!0);Q&&(hn+=1,Number.isFinite(z.total_cost_usd)&&(Ts+=z.total_cost_usd,As+=1))}}hn>0&&As===hn&&(qr.total_cost_usd=Ts);let Gi=Ss?Mt(qr):null;return{queue:u,idToTitle:Ae,candidates:W,candidate_hidden:{blocked:L.hidden_blocked,spec:L.hidden_spec},running:_r,live_count:ks,slots:vs,over_cap:Hi,failure:gs,waiting:je(Et.filter(k=>!Bi.has(k.bead_id)),"queue"),pr_wait:gt.map(k=>Jc(k.bead_id,Ae.get(k.bead_id)||k.bead_id,St,st[k.bead_id]||null,Nt(u.attempts||{},k.bead_id),ze[k.bead_id]||(B.has(k.bead_id)?{activity:null,merge_progress:{step:"merging"}}:null),Fr.get(k.bead_id)||null,k.external===!0,{position:ms.get(k.bead_id)||0,active:bs.active===k.bead_id,failure:Ui[k.bead_id]||null},k.wt_present!==!1,u.auto_merge===!0?ws(k.bead_id):null,Si(er,Pr(k.bead_id)))).map(k=>({...k,...Qe(k.id)})),merge_queue_length:fn.length,merge_queue_running:fn.length>0,auto_excluded:gt.map(k=>k.bead_id).filter(k=>ws(k)!==null),verify_cmd_present:!!(u.workspace_info||{}).verify_cmd,declared_base:er,done:xs,token_total:Gi,cleanup_failures:ue,ship_failure:Tt}}function Ie(u){let m=u.waiting.length>0?u.waiting[0].id:"\u2014",R=d`<button
      type="button"
      class="worker-play${u.queue.auto_advance?" is-active":""}"
    >
      ${u.queue.auto_advance?"\u23F8 \uC77C\uC2DC\uC815\uC9C0":"\u25B6 \uC790\uB3D9 \uC9C4\uD589"}
    </button>`,ie=u.queue.auto_advance===!0&&u.queue.auto_merge===!0,$e=d`<button
      type="button"
      class="worker-auto-all${ie?" is-active":""}"
      title=${ie?"\uC790\uB3D9 \uC9C4\uD589\uACFC \uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uB055\uB2C8\uB2E4":"\uC790\uB3D9 \uC9C4\uD589\uACFC \uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uCF2D\uB2C8\uB2E4"}
      aria-pressed=${ie?"true":"false"}
    >
      ${ie?"\u23F9 \uC804\uCCB4 \uC790\uB3D9\uD654":"\u23F5\u23F5 \uC804\uCCB4 \uC790\uB3D9\uD654"}
    </button>`,le=u.over_cap?d`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",ve=d`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${u.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${u.pr_wait.length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${A()} 완료 <b>${u.done.length}</b></span
      >`,Ae=d`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${u.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${u.declared_base||"?"}</span
    >`,Ke=d`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${un}
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
      </button>`,ae=ui({failure:u.failure,cleanupFailures:u.cleanup_failures,shipFailure:u.ship_failure});return q?d`<div class="worker-ribbon">
          ${R}
          <div class="worker-kpi worker-kpi--ribbon">${le}${ve}</div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${$e}${Ke}</div>
          <div class="worker-kpi">${Ae}</div>
        </div>
        ${ae}`:d`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${R}${$e}${Ke}</div>
        <div class="worker-kpi">
          ${le}${ve}${Ae}
          ${u.token_total?d`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${`${A()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}
                >${A()} 완료 · 누적 ${u.token_total}</span
              >`:""}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${m}</b></span
          >
        </div>
      </div>
      ${ae}`}function De(u){if(u.running.length===0&&u.pr_wait.length===0)return"";let m=u.running.some(R=>!R.paused);return d`<section
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
        ${ht(u)}
      </header>
      ${u.running.length>0?as(u.running,Date.now(),se):""}
      ${u.pr_wait.map(R=>ss(R))}
    </section>`}function tt(u){let m=u.candidate_hidden;return d`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${v.show_blocked}
        />
        🔒 blocked${m.blocked>0?` ${m.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${Nc.map(R=>d`<button
              type="button"
              class="worker-filter__chip${v.spec===R.value?" is-active":""}"
              data-spec=${R.value}
              aria-pressed=${v.spec===R.value?"true":"false"}
            >
              ${R.label}
            </button>`)}
        ${m.spec>0?d`<span class="worker-filter__hidden">숨김 ${m.spec}</span>`:""}
      </div>
    </div>`}function rt(){return d`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${$}
    >
      ${Pc.map(u=>d`<option value=${u.value} ?selected=${$===u.value}>
            ${u.label}
          </option>`)}
    </select>`}function nt(){return d`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${E}
      >
        ${vr.map(u=>d`<option value=${u.value} ?selected=${E===u.value}>
              ${u.label}
            </option>`)}
      </select>
    </div>`}function ht(u){let m=u.queue.auto_merge===!0;if(u.merge_queue_running)return d`<button
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
      </button>`;let R=new Set(u.auto_excluded),ie=u.pr_wait.filter($e=>$e.merge_action&&$e.merge_enabled&&!R.has($e.id)).length;return d`<button
      type="button"
      class="worker-merge-all"
      title=${u.verify_cmd_present?"\uCF1C \uB450\uBA74 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uCDA9\uB3CC \uD574\uC18C\xB7\uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uCF1C \uB450\uBA74 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uCDA9\uB3CC \uD574\uC18C\xB7\uBA38\uC9C0\uD569\uB2C8\uB2E4 \u2014 \uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uB294 \uAC80\uC99D \uC2E0\uD638\uAC00 \uC5C6\uC5B4 CI\xB7\uB85C\uCEEC\uAC80\uC99D \uC5C6\uC774 \uBA38\uC9C0\uB429\uB2C8\uB2E4"}
    >
      ▶ 자동 머지${ie>0?` ${ie}`:""}
    </button>`}function Me(u){let m=Ft({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:u.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:rt(),controls:tt(u)});return q?d`<div class="worker-lanes worker-lanes--mobile">
        ${De(u)}
        ${Ft({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:u.waiting,empty:"\uB4DC\uB798\uADF8 \uB610\uB294 [\uB300\uAE30\uB85C \u21B4]\uB85C \uBC30\uCE58",collapsible:!0,collapsed:P.queue,preview:$i(u.waiting)})}
        ${m}
        ${Ft({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:u.done,empty:`${A()} \uC644\uB8CC \uC5C6\uC74C`,controls:nt(),collapsible:!0,collapsed:P.done,preview:u.token_total||$i(u.done)})}
      </div>`:d`<div class="worker-lanes">
      ${m}
      ${Ft({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:u.waiting,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58"})}
      ${Ft({id:"worker-pane-running",lane:"running",title:`\uC2E4\uD589 \uC911 \xB7 \uC2AC\uB86F ${u.slots}`,items:u.running,live:u.running.some(R=>!R.paused),body:as(u.running,Date.now(),se)})}
      ${Ft({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:u.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C",header_control:ht(u)})}
      ${Ft({id:"worker-pane-done",lane:"done",title:`\uC644\uB8CC \xB7 ${A()} ${u.done.length}`,items:u.done,empty:`${A()} \uC644\uB8CC \uC5C6\uC74C`,controls:nt()})}
    </div>`}function _t(u){P={...P,[u]:!P[u]},Wc(P),he()}function he(){let u=Ge();be(Ie(u),D),be(Me(u),V)}function Fe(){let u=document.querySelector(".app-header");if(!u)return;let m=()=>{let R=Math.round(u.getBoundingClientRect().height);T.style.setProperty("--worker-ribbon-top",`${R}px`)};if(m(),typeof ResizeObserver=="function"){let R=new ResizeObserver(m);R.observe(u),S.push(()=>R.disconnect())}else window.addEventListener("resize",m),S.push(()=>window.removeEventListener("resize",m))}function I(){if(typeof window.matchMedia!="function")return;let u=window.matchMedia(zc);q=!!u.matches;let m=R=>{let ie=!!(R&&typeof R.matches=="boolean"?R.matches:u.matches);ie!==q&&(q=ie,he())};typeof u.addEventListener=="function"?(u.addEventListener("change",m),S.push(()=>u.removeEventListener("change",m))):typeof u.addListener=="function"&&(u.addListener(m),S.push(()=>u.removeListener(m)))}function F(u){let m=u.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!m)return;let R=m.dataset.beadId||"",ie=m.dataset.lane||"";h={bead_id:R,from_lane:ie};try{u.dataTransfer?.setData("text/plain",R),u.dataTransfer&&(u.dataTransfer.effectAllowed="move")}catch{}}function J(u){let m=u.target?.closest?.(".worker-pane");if(!m)return;let R=m.dataset.lane||"";R!=="candidate"&&R!=="queue"||(u.preventDefault(),u.dataTransfer&&(u.dataTransfer.dropEffect="move"),m.classList.add("worker-pane--drag-over"))}function Y(u){u.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function ee(u,m){let R=b.find(ve=>ve.id===u);if(!R)return;let ie=b.filter(ve=>ve.id!==u),$e=ie.length;if(m){let ve=m.dataset.beadId;if(ve===u)return;let Ae=ie.findIndex(Ke=>Ke.id===ve);Ae>=0&&($e=Ae)}let le=ie.slice();le.splice($e,0,R),f.applyReorder(u,le,$e)}function de(u){let m=u.target?.closest?.(".worker-pane");if(!m)return;u.preventDefault(),m.classList.remove("worker-pane--drag-over");let R=m.dataset.lane||"",ie=h?.bead_id||u.dataTransfer?.getData("text/plain")||"",$e=h?.from_lane||"";if(h=null,!ie)return;let le=u.target?.closest?.(".worker-mini, .worker-card"),ve=Array.from(m.querySelectorAll(".worker-mini, .worker-card")),Ae=ve.length;if(le){let Ke=ve.indexOf(le);Ke>=0&&(Ae=Ke)}if(m.classList.contains("worker-pane--collapsed")&&(Ae=U()),R==="candidate"){if($e==="candidate"){ee(ie,le);return}$e==="queue"&&oe(ie);return}R==="queue"&&($e==="queue"?Re(ie,Ae):K(ie,Ae))}function fe(u){v=u,Oc(u),he()}function we(u){$=u==="board"||u==="created"||u==="spec"?u:pn,qc($),he()}function ne(u){E=nr(u)?u:Dt,Uc(E),he()}function w(u){let m=u.target?.closest?.(".worker-filter__blocked");if(m){fe({...v,show_blocked:m.checked});return}let R=u.target?.closest?.(".worker-done-range");if(R){ne(R.value);return}let ie=u.target?.closest?.(".worker-sort");if(ie){we(ie.value||pn);return}let $e=u.target?.closest?.(".worker-slots__input");if(!$e)return;let le=Number.parseInt($e.value,10);if(!Number.isFinite(le)){he();return}Ve(le).then(he)}function N(u){return u?{runner:u.runner||void 0,model:u.model||void 0,effort:u.effort||void 0,worktree:u.worktree||void 0,status:u.status||void 0,session_id:u.session_id||void 0}:{}}function x(u){let m=ye(),R=m.attempts?m.attempts[u]:null;se=u,y.hidden=!1,Ce.open({attempt_id:u,meta:N(R)}),he()}function Z(){if(!se)return;let u=ye(),m=u.attempts?u.attempts[se]:null;if(m){Ce.updateMeta(N(m));return}Ce.close()}function qe(u){let m=u.target;if(m?.closest?.("#worker-exec-defaults-dialog"))return;if(m?.closest?.(".worker-exec-defaults-btn")){Ue.open();return}let R=m?.closest?.(".worker-banner__resume");if(R){let ue=R.dataset.attemptId;ue&&Ne(ue);return}let ie=m?.closest?.(".worker-banner__dismiss");if(ie){let ue=ie.dataset.attemptId;ue&&me(ue);return}if(m?.closest?.(".worker-play")){Xe(!ye().auto_advance);return}if(m?.closest?.(".worker-auto-all")){let ue=ye();et(!(ue.auto_advance===!0&&ue.auto_merge===!0));return}let $e=m?.closest?.(".worker-merge-all");if($e){$e.classList.contains("worker-merge-all--stop")?ye().auto_merge===!0?Ze(!1):Ye():Ze(!0);return}let le=m?.closest?.(".worker-pane__hd--toggle");if(le){let ue=le.dataset.lane;(ue==="queue"||ue==="done")&&_t(ue);return}let ve=m?.closest?.(".worker-card__place");if(ve){let ue=ve.dataset.beadId;ue&&!ve.disabled&&K(ue,U());return}let Ae=m?.closest?.(".worker-filter__chip");if(Ae){let ue=Ae.dataset.spec;(ue==="all"||ue==="with"||ue==="without")&&fe({...v,spec:ue});return}let Ke=m?.closest?.(".worker-mini__merge");if(Ke){ut(Ke.dataset.beadId||"");return}let ae=m?.closest?.(".worker-mini__merge-cancel");if(ae){xt(ae.dataset.beadId||"");return}let Qe=m?.closest?.(".worker-mini__discard");if(Qe){pt(Qe.dataset.beadId||"");return}let gt=m?.closest?.(".worker-mini__revise-fix");if(gt){Je("worker-revise-fix",gt.dataset.beadId||"");return}let St=m?.closest?.(".worker-mini__revise-approve");if(St){Je("worker-revise-approve",St.dataset.beadId||"");return}if(m?.closest?.(".worker-mini__pr"))return;if(m?.closest?.(".rtile__stop")){let _e=m?.closest?.(".rtile")?.dataset?.attemptId;_e&&Te(_e);return}if(m?.closest?.(".rtile__pause")){let _e=m?.closest?.(".rtile")?.dataset?.attemptId;_e&&ce(_e);return}if(m?.closest?.(".rtile__resume")){let _e=m?.closest?.(".rtile")?.dataset?.attemptId;_e&&Ne(_e);return}if(m?.closest?.(".rtile__session")){let _e=m?.closest?.(".rtile")?.dataset?.attemptId;_e&&x(_e);return}if(m?.closest?.(".worker-drawer-overlay__backdrop")){Ce.close();return}if(m?.closest?.(".worker-drawer-host"))return;let ze=m?.closest?.(".rtile");if(ze){if(m?.closest?.(".rtile__id")){let _e=ze.dataset.beadId;_e&&Kt(_e).then(Tt=>{Tt?te("\uBCF5\uC0AC\uB428","success",1200):te("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let ue=ze.dataset.beadId;ue&&l&&l(ue);return}let st=m?.closest?.(".worker-mini, .worker-card");if(st){let ue=st.dataset.beadId;if(m?.closest?.(".worker-mini__id, .worker-card__id")){ue&&Kt(ue).then(_e=>{_e?te("\uBCF5\uC0AC\uB428","success",1200):te("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}ue&&l&&l(ue)}}return t.addEventListener("dragstart",F),t.addEventListener("dragover",J),t.addEventListener("dragleave",Y),t.addEventListener("drop",de),t.addEventListener("click",qe),t.addEventListener("change",w),I(),Fe(),c&&S.push(c.subscribe(he)),s&&S.push(s.subscribe(()=>{he(),Z()})),he(),{load(){he()},destroy(){for(let u of S.splice(0))try{u()}catch{}t.removeEventListener("dragstart",F),t.removeEventListener("dragover",J),t.removeEventListener("dragleave",Y),t.removeEventListener("drop",de),t.removeEventListener("click",qe),t.removeEventListener("change",w);try{Ce.destroy()}catch{}y.hidden=!0;try{Ue.destroy()}catch{}be(d``,t)}}}function fs(t){if(!t)return"Unknown";let e=t.split("/").filter(Boolean);return e.length>0?e[e.length-1]:"Unknown"}function Ri(t,e,r,n=async()=>{},s=async()=>{}){let o=Le("views:workspace-picker"),i=null,l=!1,a=!1,c=!1;async function f(T){let y=T.target.value,j=e.getState().workspace?.current?.path||"";if(y&&y!==j){o("switching workspace to %s",y),l=!0,S();try{await r(y)}catch(V){o("workspace switch failed: %o",V)}finally{l=!1,S()}}}async function h(){let T=e.getState(),D=T.workspace?.current?.path||T.workspace?.available?.[0]?.path||"";if(!(!D||a)){o("git-pulling workspace %s",D),a=!0,S();try{await n(D)}catch(y){o("workspace git pull failed: %o",y)}finally{a=!1,S()}}}function b(T){let D=T.target;D&&t.contains(D)||E()}function v(T){T.key==="Escape"&&E()}function $(){c||(c=!0,document.addEventListener("mousedown",b),document.addEventListener("keydown",v),S())}function E(){c&&(c=!1,document.removeEventListener("mousedown",b),document.removeEventListener("keydown",v),S())}function A(){c?E():$()}async function P(T){let D=T.target,y=D.value,G=D.checked;o("toggling visibility %s \u2192 %s",y,String(G));try{await s(y,G)}catch(j){o("workspace visibility toggle failed: %o",j)}}function q(T){return T?d`
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
    `:d``}function B(T,D){return d`
      <div class="workspace-picker__manage">
        <button
          type="button"
          class="workspace-picker__manage-button"
          @click=${A}
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
                ${T.map(y=>d`
                    <label
                      class="workspace-picker__manage-row"
                      title="${y.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${y.path}"
                        .checked=${!D.has(y.path)}
                        @change=${P}
                      />
                      <span class="workspace-picker__manage-name"
                        >${fs(y.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function C(){let T=e.getState(),D=T.workspace?.current,y=T.workspace?.available||[],G=new Set(T.workspace?.hidden||[]),j=D?.path||y[0]?.path||"";if(y.length===0)return d``;let V=y.filter(se=>!G.has(se.path)||se.path===j);if(V.length<=1){let se=V[0]||y[0],Ce=fs(se.path);return d`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${se.path}"
            >${Ce}</span
          >
          ${B(y,G)}
          ${q(j)}
          ${a?d`<span
                class="workspace-picker__loading"
                aria-hidden="true"
              ></span>`:""}
        </div>
      `}return d`
      <div class="workspace-picker">
        <select
          class="workspace-picker__select"
          @change=${f}
          ?disabled=${l||a}
          aria-label="Select project workspace"
        >
          ${V.map(se=>d`
              <option
                value="${se.path}"
                ?selected=${se.path===j}
                title="${se.path}"
              >
                ${fs(se.path)}
              </option>
            `)}
        </select>
        ${B(y,G)}
        ${q(j)}
        ${l||a?d`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function S(){be(C(),t)}return S(),i=e.subscribe(()=>S()),{destroy(){i&&(i(),i=null),document.removeEventListener("mousedown",b),document.removeEventListener("keydown",v),be(d``,t)}}}var Ii=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-queue-set-slots","worker-queue-set-exec-default","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append"];function hs(){let t=Date.now().toString(36),e=Math.random().toString(36).slice(2,8);return`${t}-${e}`}function Li(t,e,r=hs()){return{id:r,type:t,payload:e}}function Di(t={}){let e=Le("ws"),r={initialMs:t.backoff?.initialMs??1e3,maxMs:t.backoff?.maxMs??3e4,factor:t.backoff?.factor??2,jitterRatio:t.backoff?.jitterRatio??.2},n=()=>t.url&&t.url.length>0?t.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",i=0,l=null,a=!0,c=new Map,f=[],h=new Map,b=new Set;function v(C){for(let S of Array.from(b))try{S(C)}catch{}}function $(){if(!a||l)return;o="reconnecting",e("ws reconnecting\u2026"),v(o);let C=Math.min(r.maxMs||0,(r.initialMs||0)*Math.pow(r.factor||1,i)),S=(r.jitterRatio||0)*C,T=Math.max(0,Math.round(C+(Math.random()*2-1)*S));e("ws retry in %d ms (attempt %d)",T,i+1),l=setTimeout(()=>{l=null,B()},T)}function E(C){try{s?.send(JSON.stringify(C))}catch(S){e("ws send failed",S)}}function A(){for(o="open",e("ws open"),v(o),i=0;f.length;){let C=f.shift();C&&E(C)}}function P(C){let S;try{S=JSON.parse(String(C.data))}catch{e("ws received non-JSON message");return}if(!S||typeof S.id!="string"||typeof S.type!="string"){e("ws received invalid envelope");return}if(c.has(S.id)){let D=c.get(S.id);c.delete(S.id),S.ok?D?.resolve(S.payload):D?.reject(S.error||new Error("ws error"));return}let T=h.get(S.type);if(T&&T.size>0)for(let D of Array.from(T))try{D(S.payload)}catch(y){e("ws event handler error",y)}else e("ws received unhandled message type: %s",S.type)}function q(){o="closed",e("ws closed"),v(o);for(let[C,S]of c.entries())S.reject(new Error("ws disconnected")),c.delete(C);i+=1,$()}function B(){if(!a)return;let C=n();try{s=new WebSocket(C),e("ws connecting %s",C),o="connecting",v(o),s.addEventListener("open",A),s.addEventListener("message",P),s.addEventListener("error",()=>{}),s.addEventListener("close",q)}catch(S){e("ws connect failed %o",S),$()}}return B(),{send(C,S){if(!Ii.includes(C))return Promise.reject(new Error(`unknown message type: ${C}`));let T=hs(),D=Li(C,S,T);return e("send %s id=%s",C,T),new Promise((y,G)=>{c.set(T,{resolve:y,reject:G,type:C}),s&&s.readyState===s.OPEN?E(D):(e("queue %s id=%s (state=%s)",C,T,o),f.push(D))})},on(C,S){h.has(C)||h.set(C,new Set);let T=h.get(C);return T?.add(S),()=>{T?.delete(S)}},onConnection(C){return b.add(C),()=>{b.delete(C)}},reconnect(){a=!0,l&&(clearTimeout(l),l=null),i=0,B()},close(){a=!1,l&&(clearTimeout(l),l=null);try{s?.close()}catch{}},getState(){return o}}}function ed(){let t=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof t?.workspace_config?.default_workspace=="string"&&t.workspace_config.default_workspace.length>0?t.workspace_config.default_workspace:null}}}async function td(t,e){try{let n=await(await fetch("/api/config")).json();t.setState({config:n})}catch(r){e("config refresh failed",r)}}var _s=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],Oi=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"]],Mi=[[ls,"in-progress-issues"]],Ni="worker:queue",Pi="ui:order",Fi="ui:display-policy",qt="tab:board:closed",qi="beads-ui.board.closed-range";function rd(t){let e=Le("main");e("bootstrap start");let r=d`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;be(r,t);let n=document.getElementById("top-nav"),s=document.getElementById("board-root"),o=document.getElementById("worker-root"),i=document.getElementById("monitor-root"),l=document.getElementById("detail-panel");if(s&&o&&i&&l){let ye=function(_,g){let H="Request failed",X="";if(_&&typeof _=="object"){let p=_;if(typeof p.message=="string"&&p.message.length>0&&(H=p.message),typeof p.details=="string")X=p.details;else if(p.details&&typeof p.details=="object")try{X=JSON.stringify(p.details,null,2)}catch{X=""}}else typeof _=="string"&&_.length>0&&(H=_);let M=g&&g.length>0?`Failed to load ${g}`:"Request failed";Ue.open(M,H,X)},Je=function(_){return`${ae.getState().workspace.current?.path||""}\0${_}`},Xe=function(){Ne&&(Ne().catch(()=>{}),Ne=null),me=null,Pe=null},Ve=function(_){ut=_;let g=()=>{ut!==_||ae.getState().selected_id!==_||(ut=null,et(_))};if(!Ye){xt.then(g);return}g()},tt=function(_,g,H,X,M){return H!==De[g]?(M().catch(()=>{}),!1):(_.set(X,M),!0)},rt=function(){let _=ae.getState().view;Me(_==="board"),F(_==="worker"),fe(_==="monitor"),Y(_==="worker"||_==="monitor")},ht=function(){let _=zr(nt);return _===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:_}}},Me=function(_){if(_)for(let[g,H]of _s){if(Ge.has(g)||Ie.has(g))continue;let X=g===qt?ht():{type:H};try{K.register(g,X)}catch(L){e("register %s store failed: %o",g,L)}Ie.add(g);let M=De.board,p=!1;U.subscribeList(g,X).then(L=>{p=!tt(Ge,"board",M,g,L)}).catch(L=>{e("subscribe %s failed: %o",g,L),ye(L,"board")}).finally(()=>{Ie.delete(g),p&&rt()})}else he()},he=function(){De.board+=1;for(let[_]of _s){let g=Ge.get(_);g&&(g().catch(()=>{}),Ge.delete(_));try{K.unregister(_)}catch(H){e("unregister %s failed: %o",_,H)}}},F=function(_){if(!_){J();return}for(let[g,H]of Oi){if(Fe.has(g)||Ie.has(g))continue;try{K.register(g,{type:H})}catch(p){e("register %s store failed: %o",g,p)}Ie.add(g);let X=De.worker,M=!1;U.subscribeList(g,{type:H}).then(p=>{M=!tt(Fe,"worker",X,g,p)}).catch(p=>{e("subscribe %s failed: %o",g,p),ye(p,"worker")}).finally(()=>{Ie.delete(g),M&&rt()})}},J=function(){De.worker+=1;for(let[_]of Oi){let g=Fe.get(_);g&&(g().catch(()=>{}),Fe.delete(_));try{K.unregister(_)}catch(H){e("unregister %s failed: %o",_,H)}}},Y=function(_){if(!_){ee();return}I||(O("subscribe-worker-queue",{id:Ni}).catch(g=>{e("subscribe-worker-queue failed: %o",g)}),I=()=>O("unsubscribe-worker-queue",{id:Ni}))},ee=function(){I&&(I().catch(()=>{}),I=null)},fe=function(_){if(!_){we();return}for(let[g,H]of Mi){if(de.has(g)||Ie.has(g))continue;try{K.register(g,{type:H})}catch(p){e("register %s store failed: %o",g,p)}Ie.add(g);let X=De.monitor,M=!1;U.subscribeList(g,{type:H}).then(p=>{M=!tt(de,"monitor",X,g,p)}).catch(p=>{e("subscribe %s failed: %o",g,p),ye(p,"monitor")}).finally(()=>{Ie.delete(g),M&&rt()})}},we=function(){De.monitor+=1;for(let[_]of Mi){let g=de.get(_);g&&(g().catch(()=>{}),de.delete(_));try{K.unregister(_)}catch(H){e("unregister %s failed: %o",_,H)}}},w=function(){ne||(O("subscribe-ui-order",{id:Pi}).catch(_=>{e("subscribe-ui-order failed: %o",_)}),ne=()=>O("unsubscribe-ui-order",{id:Pi}))},N=function(){ne&&(ne().catch(()=>{}),ne=null),oe.clear()},Z=function(){x||(O("subscribe-display-policy",{id:Fi}).catch(_=>{e("subscribe-display-policy failed: %o",_)}),x=()=>O("unsubscribe-display-policy",{id:Fi}))},qe=function(){x&&(x().catch(()=>{}),x=null),Te.clear()},le=function(_){if(!_)return"Unknown";let g=_.split("/").filter(Boolean);return g.length>0?g[g.length-1]:"Unknown"};var a=ye,c=Je,f=Xe,h=Ve,b=tt,v=rt,$=ht,E=Me,A=he,P=F,q=J,B=Y,C=ee,S=fe,T=we,D=w,y=N,G=Z,j=qe,V=le;let se=document.getElementById("header-loading"),Ce=io(se),Ue=ci(t),re=Di(),O=Ce.wrapSend((_,g)=>re.send(_,g)),U=Js(O),K=eo(),Re=ro(),oe=to(),Te=Fs(),ce=qs();re.on("ui-order-snapshot",_=>{let g=_;if(g&&typeof g.revision=="number")try{oe.set({revision:g.revision,order:g.order&&typeof g.order=="object"?g.order:{}})}catch{}}),re.on("display-policy-snapshot",_=>{let g=_;if(g&&g.policy&&typeof g.policy=="object")try{Te.set(g.policy)}catch{}}),re.on("session-log-snapshot",_=>{let g=_;if(g&&typeof g.attempt_id=="string")try{ce.set(g.attempt_id,Array.isArray(g.lines)?g.lines:[],typeof g.last_event_at=="number"?g.last_event_at:null)}catch{}}),re.on("session-log-append",_=>{let g=_;if(g&&typeof g.attempt_id=="string")try{ce.append(g.attempt_id,g.event)}catch{}}),re.on("snapshot",_=>{let g=_,H=g&&typeof g.id=="string"?g.id:"",X=H?K.getStore(H):null;if(X&&g&&g.type==="snapshot")try{X.applyPush(g)}catch{}}),re.on("upsert",_=>{let g=_,H=g&&typeof g.id=="string"?g.id:"",X=H?K.getStore(H):null;if(X&&g&&g.type==="upsert")try{X.applyPush(g)}catch{}}),re.on("delete",_=>{let g=_,H=g&&typeof g.id=="string"?g.id:"",X=H?K.getStore(H):null;if(X&&g&&g.type==="delete")try{X.applyPush(g)}catch{}});let Ne=null,me=null,Pe=null,ut=null,Ze=()=>{},xt=new Promise(_=>{Ze=()=>_(void 0)}),Ye=!1,pt=!1;async function et(_){let g=Je(_);if(g===me||g===Pe)return;Pe=g;let H=`detail:${_}`,X={type:"issue-detail",params:{id:_}};try{K.register(H,X)}catch(M){e("register detail store failed: %o",M)}try{let M=await U.subscribeList(H,X);if(ae.getState().selected_id!==_||Je(_)!==g){await M().catch(()=>{});return}Ne&&await Ne().catch(()=>{}),Ne=M,me=g}catch(M){e("detail subscribe failed: %o",M),ye(M,"issue details")}finally{Pe===g&&(Pe=null)}}let Ge=new Map,Ie=new Set,De={board:0,worker:0,monitor:0},nt=Dt;try{let _=window.localStorage.getItem(qi);nr(_)&&(nt=_)}catch{}async function _t(_){if(!nr(_)||_===nt)return;nt=_;try{window.localStorage.setItem(qi,_)}catch{}let g=Ge.get(qt);if(!g)return;Ge.delete(qt),await g().catch(()=>{});let H=ht();try{K.register(qt,H)}catch(X){e("register %s store failed: %o",qt,X)}try{let X=await U.subscribeList(qt,H);Ge.set(qt,X)}catch(X){e("re-subscribe %s failed: %o",qt,X),ye(X,"board")}}let Fe=new Map,I=null,de=new Map,ne=null,x=null;async function u(){x=null,Te.clear(),I=null,Ge.clear(),Fe.clear(),de.clear(),De.board+=1,De.worker+=1,De.monitor+=1;let _=ae.getState().workspace.current?.path;if(_)try{await re.send("set-workspace",{path:_})}catch(H){e("workspace restore after reconnect failed: %o",H);return}Z();let g=ae.getState().view;Me(g==="board"),F(g==="worker"),fe(g==="monitor"),Y(g==="worker"||g==="monitor")}async function m(){e("clearing all subscriptions for workspace switch"),he(),J(),we(),ee(),Re.clear(),N(),w(),qe(),Z(),Xe();let _=ae.getState();if(_.selected_id)try{K.unregister(`detail:${_.selected_id}`)}catch{}let g=ae.getState();Me(g.view==="board"),F(g.view==="worker"),fe(g.view==="monitor"),Y(g.view==="worker"||g.view==="monitor"),g.selected_id&&Ve(g.selected_id)}async function R(_){e("requesting workspace switch to %s",_),pt=!0;try{let g=await re.send("set-workspace",{path:_});e("workspace switch result: %o",g),g&&g.workspace&&(ae.setState({workspace:{current:{path:g.workspace.root_dir,database:g.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",_),g.changed&&(await m(),te("Switched to "+le(_),"success",2e3)))}catch(g){throw e("workspace switch failed: %o",g),te("Failed to switch workspace","error",3e3),g}finally{pt=!1}}async function ie(_){e("requesting workspace git pull for %s",_);try{let g=await re.send("git-pull-workspace",{});e("workspace git pull result: %o",g);let H=g?.status;if(H==="up_to_date"){te("Already up to date","success",2e3);return}if(H==="stash_pop_conflict"){te("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}te("Git pulled "+le(_),"success",2e3)}catch(g){e("workspace git pull failed: %o",g);let H=g?.code,X=g?.message;if(H==="rebase_conflict"){te("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(H==="rebase_conflict_abort_failed"){te("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(H==="busy"){te("Git pull skipped: another operation is running","warning",3e3);return}let M=X?`: ${X}`:"";throw te(`Git pull failed${M}`,"error",3e3),g}}async function $e(_,g){e("setting workspace visibility %s \u2192 %s",_,String(g));try{await re.send("set-workspace-visibility",{path:_,visible:g}),await ve()}catch(H){e("workspace visibility update failed: %o",H),te("Failed to update project visibility","error",3e3)}}async function ve(){try{let _=await re.send("list-workspaces",{});if(e("workspaces loaded: %o",_),_&&Array.isArray(_.workspaces)){let g=_.workspaces.map(p=>({path:p.path,database:p.database,pid:p.pid,version:p.version})),H=_.current?{path:_.current.root_dir,database:_.current.db_path}:null,X=Array.isArray(_.hidden)?_.hidden.filter(p=>typeof p=="string"):[];ae.setState({workspace:{current:H,available:g,hidden:X}});let M=window.localStorage.getItem("beads-ui.workspace");M&&(!g.some(L=>L.path===M)||X.includes(M)?window.localStorage.removeItem("beads-ui.workspace"):H&&M!==H.path&&(e("restoring saved workspace preference: %s",M),await R(M)))}}catch(_){e("failed to load workspaces: %o",_)}}re.on("workspace-changed",_=>{e("workspace-changed event: %o",_),_&&_.root_dir&&(ae.setState({workspace:{current:{path:_.root_dir,database:_.db_path}}}),ve(),m())});let Ae=!1;if(typeof re.onConnection=="function"){let _=g=>{e("ws state %s",g),g==="reconnecting"||g==="closed"?(Ae=!0,te("Connection lost. Reconnecting\u2026","error",4e3)):g==="open"&&Ae&&(Ae=!1,te("Reconnected","success",2200),td(ae,(H,X)=>{e(`${H}: %o`,X)}),u())};re.onConnection(_)}let Ke="board";try{let _=window.localStorage.getItem("beads-ui.view");(_==="board"||_==="worker"||_==="monitor")&&(Ke=_)}catch(_){e("view parse error: %o",_)}let ae=oo({config:ed(),view:Ke});re.on("worker-queue-snapshot",_=>{let g=_;if(!g||!g.queue)return;let H=ae.getState().workspace.current?.path;if(typeof H=="string"&&H.length>0&&g.root_dir!==H){e("dropping worker-queue snapshot for %s",String(g.root_dir));return}try{Re.set(g.queue)}catch{}});let Qe=no(ae);Qe.start();let gt=async(_,g)=>{try{return await O(_,g)}catch{return[]}};n&&hi(n,ae,Qe);let St=document.getElementById("workspace-picker");St&&Ri(St,ae,R,ie,$e);let ze=bi(t,(_,g)=>O(_,g));try{let _=document.getElementById("new-issue-btn");_&&_.addEventListener("click",()=>ze.open())}catch{}let st=li(t,{policyStore:Te,transport:(_,g)=>O(_,g),labelOptions:()=>{let _=new Set;for(let[g]of _s)for(let H of K.snapshotFor(g)||[]){let X=H.labels;if(Array.isArray(X))for(let M of X)typeof M=="string"&&M.length>0&&_.add(M)}return Array.from(_).sort()}});try{let _=document.getElementById("display-settings-btn");_&&_.addEventListener("click",()=>st.open())}catch{}let ue=_o(s,{gotoIssue:_=>Qe.gotoIssue(_),issueStores:K,transport:gt,uiOrderStore:oe,displayPolicyStore:Te,closedRange:nt,onClosedRangeChange:_=>{_t(_)},onNewIssue:()=>ze.open()}),_e=ps(o,{transport:gt,issueStores:K,queueStore:Re,sessionLogStore:ce,uiOrderStore:oe,gotoIssue:_=>ae.setState({selected_id:_}),getWorkspacePath:()=>ae.getState().workspace.current?.path}),Tt=fi(i,{issueStores:K,queueStore:Re,gotoIssue:_=>Qe.gotoIssue(_)}),Et=ii(l,{issueStores:K,transport:gt,queueStore:Re,sessionLogStore:ce,getWorkspacePath:()=>ae.getState().workspace.current?.path,onNavigate:_=>{ae.getState().view==="worker"?ae.setState({selected_id:_}):Qe.gotoIssue(_)},onClose:()=>{let _=ae.getState();ae.setState({selected_id:null});try{Qe.gotoView(_.view==="worker"||_.view==="monitor"?_.view:"board")}catch{}}}),ot=ae.getState().selected_id;ot&&(l.hidden=!1,Et.load(ot),Ve(ot)),ae.subscribe(_=>{let g=_.selected_id;g?(l.hidden=!1,Et.load(g),pt||Ve(g)):(Et.clear(),l.hidden=!0,Xe())});let Bt=_=>{s.hidden=_.view!=="board",o.hidden=_.view!=="worker",i.hidden=_.view!=="monitor",Me(_.view==="board"),F(_.view==="worker"),fe(_.view==="monitor"),Y(_.view==="worker"||_.view==="monitor"),!_.selected_id&&_.view==="board"&&ue.load(),_.view==="worker"&&_e.load(),_.view==="monitor"?Tt.load():Tt.pause(),window.localStorage.setItem("beads-ui.view",_.view)};ae.subscribe(Bt),Bt(ae.getState()),w(),Z(),ve().finally(()=>{Ye=!0,Ze()}),window.addEventListener("keydown",_=>{let g=_.ctrlKey||_.metaKey,H=String(_.key||"").toLowerCase(),X=_.target,M=X&&X.tagName?String(X.tagName).toLowerCase():"",p=M==="input"||M==="textarea"||M==="select"||X&&typeof X.isContentEditable=="boolean"&&X.isContentEditable;g&&H==="n"&&(p||(_.preventDefault(),ze.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let r=window.localStorage.getItem("beads-ui.theme"),n=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=r==="dark"||r==="light"?r:n?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let t=document.getElementById("theme-switch");t&&t.addEventListener("change",()=>{let r=t.checked?"dark":"light";document.documentElement.setAttribute("data-theme",r),window.localStorage.setItem("beads-ui.theme",r)});let e=document.getElementById("app");e&&rd(e)});export{rd as bootstrap,ed as readBootstrapConfig,td as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
