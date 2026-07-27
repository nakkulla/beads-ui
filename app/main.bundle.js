var Mo=Object.create;var Rr=Object.defineProperty;var No=Object.getOwnPropertyDescriptor;var Po=Object.getOwnPropertyNames;var Fo=Object.getPrototypeOf,Bo=Object.prototype.hasOwnProperty;var qo=(t,e,r)=>e in t?Rr(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r;var Lr=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports);var zo=(t,e,r,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of Po(e))!Bo.call(t,s)&&s!==r&&Rr(t,s,{get:()=>e[s],enumerable:!(n=No(e,s))||n.enumerable});return t};var Uo=(t,e,r)=>(r=t!=null?Mo(Fo(t)):{},zo(e||!t||!t.__esModule?Rr(r,"default",{value:t,enumerable:!0}):r,t));var he=(t,e,r)=>qo(t,typeof e!="symbol"?e+"":e,r);var Xn=Lr((yl,Kn)=>{var Ct=1e3,Rt=Ct*60,Lt=Rt*60,wt=Lt*24,Yo=wt*7,Vo=wt*365.25;Kn.exports=function(t,e){e=e||{};var r=typeof t;if(r==="string"&&t.length>0)return Zo(t);if(r==="number"&&isFinite(t))return e.long?Xo(t):Ko(t);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(t))};function Zo(t){if(t=String(t),!(t.length>100)){var e=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(t);if(e){var r=parseFloat(e[1]),n=(e[2]||"ms").toLowerCase();switch(n){case"years":case"year":case"yrs":case"yr":case"y":return r*Vo;case"weeks":case"week":case"w":return r*Yo;case"days":case"day":case"d":return r*wt;case"hours":case"hour":case"hrs":case"hr":case"h":return r*Lt;case"minutes":case"minute":case"mins":case"min":case"m":return r*Rt;case"seconds":case"second":case"secs":case"sec":case"s":return r*Ct;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r;default:return}}}}function Ko(t){var e=Math.abs(t);return e>=wt?Math.round(t/wt)+"d":e>=Lt?Math.round(t/Lt)+"h":e>=Rt?Math.round(t/Rt)+"m":e>=Ct?Math.round(t/Ct)+"s":t+"ms"}function Xo(t){var e=Math.abs(t);return e>=wt?ir(t,e,wt,"day"):e>=Lt?ir(t,e,Lt,"hour"):e>=Rt?ir(t,e,Rt,"minute"):e>=Ct?ir(t,e,Ct,"second"):t+" ms"}function ir(t,e,r,n){var s=e>=r*1.5;return Math.round(t/r)+" "+n+(s?"s":"")}});var Jn=Lr((wl,Qn)=>{function Qo(t){r.debug=r,r.default=r,r.coerce=a,r.disable=i,r.enable=s,r.enabled=l,r.humanize=Xn(),r.destroy=c,Object.keys(t).forEach(p=>{r[p]=t[p]}),r.names=[],r.skips=[],r.formatters={};function e(p){let h=0;for(let b=0;b<p.length;b++)h=(h<<5)-h+p.charCodeAt(b),h|=0;return r.colors[Math.abs(h)%r.colors.length]}r.selectColor=e;function r(p){let h,b=null,$,v;function C(...N){if(!C.enabled)return;let M=C,F=Number(new Date),B=F-(h||F);M.diff=B,M.prev=h,M.curr=F,h=F,N[0]=r.coerce(N[0]),typeof N[0]!="string"&&N.unshift("%O");let I=0;N[0]=N[0].replace(/%([a-zA-Z%])/g,(x,w)=>{if(x==="%%")return"%";I++;let _=r.formatters[w];if(typeof _=="function"){let z=N[I];x=_.call(M,z),N.splice(I,1),I--}return x}),r.formatArgs.call(M,N),(M.log||r.log).apply(M,N)}return C.namespace=p,C.useColors=r.useColors(),C.color=r.selectColor(p),C.extend=n,C.destroy=r.destroy,Object.defineProperty(C,"enabled",{enumerable:!0,configurable:!1,get:()=>b!==null?b:($!==r.namespaces&&($=r.namespaces,v=r.enabled(p)),v),set:N=>{b=N}}),typeof r.init=="function"&&r.init(C),C}function n(p,h){let b=r(this.namespace+(typeof h>"u"?":":h)+p);return b.log=this.log,b}function s(p){r.save(p),r.namespaces=p,r.names=[],r.skips=[];let h=(typeof p=="string"?p:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let b of h)b[0]==="-"?r.skips.push(b.slice(1)):r.names.push(b)}function o(p,h){let b=0,$=0,v=-1,C=0;for(;b<p.length;)if($<h.length&&(h[$]===p[b]||h[$]==="*"))h[$]==="*"?(v=$,C=b,$++):(b++,$++);else if(v!==-1)$=v+1,C++,b=C;else return!1;for(;$<h.length&&h[$]==="*";)$++;return $===h.length}function i(){let p=[...r.names,...r.skips.map(h=>"-"+h)].join(",");return r.enable(""),p}function l(p){for(let h of r.skips)if(o(p,h))return!1;for(let h of r.names)if(o(p,h))return!0;return!1}function a(p){return p instanceof Error?p.stack||p.message:p}function c(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return r.enable(r.load()),r}Qn.exports=Qo});var es=Lr((Ye,ar)=>{Ye.formatArgs=ei;Ye.save=ti;Ye.load=ri;Ye.useColors=Jo;Ye.storage=ni();Ye.destroy=(()=>{let t=!1;return()=>{t||(t=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();Ye.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function Jo(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let t;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(t=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(t[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function ei(t){if(t[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+t[0]+(this.useColors?"%c ":" ")+"+"+ar.exports.humanize(this.diff),!this.useColors)return;let e="color: "+this.color;t.splice(1,0,e,"color: inherit");let r=0,n=0;t[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(r++,s==="%c"&&(n=r))}),t.splice(n,0,e)}Ye.log=console.debug||console.log||(()=>{});function ti(t){try{t?Ye.storage.setItem("debug",t):Ye.storage.removeItem("debug")}catch{}}function ri(){let t;try{t=Ye.storage.getItem("debug")||Ye.storage.getItem("DEBUG")}catch{}return!t&&typeof process<"u"&&"env"in process&&(t=process.env.DEBUG),t}function ni(){try{return localStorage}catch{}}ar.exports=Jn()(Ye);var{formatters:si}=ar.exports;si.j=function(t){try{return JSON.stringify(t)}catch(e){return"[UnexpectedJSONParseError]: "+e.message}}});var Ft=globalThis,sr=Ft.trustedTypes,Nn=sr?sr.createPolicy("lit-html",{createHTML:t=>t}):void 0,Un="$lit$",pt=`lit$${Math.random().toFixed(9).slice(2)}$`,Hn="?"+pt,Ho=`<${Hn}>`,_t=document,Bt=()=>_t.createComment(""),qt=t=>t===null||typeof t!="object"&&typeof t!="function",Fr=Array.isArray,Wo=t=>Fr(t)||typeof t?.[Symbol.iterator]=="function",Ir=`[ 	
\f\r]`,Pt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Pn=/-->/g,Fn=/>/g,gt=RegExp(`>|${Ir}(?:([^\\s"'>=/]+)(${Ir}*=${Ir}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Bn=/'/g,qn=/"/g,Wn=/^(?:script|style|textarea|title)$/i,Br=t=>(e,...r)=>({_$litType$:t,strings:e,values:r}),f=Br(1),fl=Br(2),hl=Br(3),yt=Symbol.for("lit-noChange"),$e=Symbol.for("lit-nothing"),zn=new WeakMap,bt=_t.createTreeWalker(_t,129);function Gn(t,e){if(!Fr(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return Nn!==void 0?Nn.createHTML(e):e}var Go=(t,e)=>{let r=t.length-1,n=[],s,o=e===2?"<svg>":e===3?"<math>":"",i=Pt;for(let l=0;l<r;l++){let a=t[l],c,p,h=-1,b=0;for(;b<a.length&&(i.lastIndex=b,p=i.exec(a),p!==null);)b=i.lastIndex,i===Pt?p[1]==="!--"?i=Pn:p[1]!==void 0?i=Fn:p[2]!==void 0?(Wn.test(p[2])&&(s=RegExp("</"+p[2],"g")),i=gt):p[3]!==void 0&&(i=gt):i===gt?p[0]===">"?(i=s??Pt,h=-1):p[1]===void 0?h=-2:(h=i.lastIndex-p[2].length,c=p[1],i=p[3]===void 0?gt:p[3]==='"'?qn:Bn):i===qn||i===Bn?i=gt:i===Pn||i===Fn?i=Pt:(i=gt,s=void 0);let $=i===gt&&t[l+1].startsWith("/>")?" ":"";o+=i===Pt?a+Ho:h>=0?(n.push(c),a.slice(0,h)+Un+a.slice(h)+pt+$):a+pt+(h===-2?l:$)}return[Gn(t,o+(t[r]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),n]},zt=class t{constructor({strings:e,_$litType$:r},n){let s;this.parts=[];let o=0,i=0,l=e.length-1,a=this.parts,[c,p]=Go(e,r);if(this.el=t.createElement(c,n),bt.currentNode=this.el.content,r===2||r===3){let h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(s=bt.nextNode())!==null&&a.length<l;){if(s.nodeType===1){if(s.hasAttributes())for(let h of s.getAttributeNames())if(h.endsWith(Un)){let b=p[i++],$=s.getAttribute(h).split(pt),v=/([.?@])?(.*)/.exec(b);a.push({type:1,index:o,name:v[2],strings:$,ctor:v[1]==="."?Or:v[1]==="?"?Mr:v[1]==="@"?Nr:Et}),s.removeAttribute(h)}else h.startsWith(pt)&&(a.push({type:6,index:o}),s.removeAttribute(h));if(Wn.test(s.tagName)){let h=s.textContent.split(pt),b=h.length-1;if(b>0){s.textContent=sr?sr.emptyScript:"";for(let $=0;$<b;$++)s.append(h[$],Bt()),bt.nextNode(),a.push({type:2,index:++o});s.append(h[b],Bt())}}}else if(s.nodeType===8)if(s.data===Hn)a.push({type:2,index:o});else{let h=-1;for(;(h=s.data.indexOf(pt,h+1))!==-1;)a.push({type:7,index:o}),h+=pt.length-1}o++}}static createElement(e,r){let n=_t.createElement("template");return n.innerHTML=e,n}};function Tt(t,e,r=t,n){if(e===yt)return e;let s=n!==void 0?r._$Co?.[n]:r._$Cl,o=qt(e)?void 0:e._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(t),s._$AT(t,r,n)),n!==void 0?(r._$Co??(r._$Co=[]))[n]=s:r._$Cl=s),s!==void 0&&(e=Tt(t,s._$AS(t,e.values),s,n)),e}var Dr=class{constructor(e,r){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:r},parts:n}=this._$AD,s=(e?.creationScope??_t).importNode(r,!0);bt.currentNode=s;let o=bt.nextNode(),i=0,l=0,a=n[0];for(;a!==void 0;){if(i===a.index){let c;a.type===2?c=new Ut(o,o.nextSibling,this,e):a.type===1?c=new a.ctor(o,a.name,a.strings,this,e):a.type===6&&(c=new Pr(o,this,e)),this._$AV.push(c),a=n[++l]}i!==a?.index&&(o=bt.nextNode(),i++)}return bt.currentNode=_t,s}p(e){let r=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(e,n,r),r+=n.strings.length-2):n._$AI(e[r])),r++}},Ut=class t{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,r,n,s){this.type=2,this._$AH=$e,this._$AN=void 0,this._$AA=e,this._$AB=r,this._$AM=n,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,r=this._$AM;return r!==void 0&&e?.nodeType===11&&(e=r.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,r=this){e=Tt(this,e,r),qt(e)?e===$e||e==null||e===""?(this._$AH!==$e&&this._$AR(),this._$AH=$e):e!==this._$AH&&e!==yt&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Wo(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==$e&&qt(this._$AH)?this._$AA.nextSibling.data=e:this.T(_t.createTextNode(e)),this._$AH=e}$(e){let{values:r,_$litType$:n}=e,s=typeof n=="number"?this._$AC(e):(n.el===void 0&&(n.el=zt.createElement(Gn(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===s)this._$AH.p(r);else{let o=new Dr(s,this),i=o.u(this.options);o.p(r),this.T(i),this._$AH=o}}_$AC(e){let r=zn.get(e.strings);return r===void 0&&zn.set(e.strings,r=new zt(e)),r}k(e){Fr(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,n,s=0;for(let o of e)s===r.length?r.push(n=new t(this.O(Bt()),this.O(Bt()),this,this.options)):n=r[s],n._$AI(o),s++;s<r.length&&(this._$AR(n&&n._$AB.nextSibling,s),r.length=s)}_$AR(e=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);e!==this._$AB;){let n=e.nextSibling;e.remove(),e=n}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},Et=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,r,n,s,o){this.type=1,this._$AH=$e,this._$AN=void 0,this.element=e,this.name=r,this._$AM=s,this.options=o,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=$e}_$AI(e,r=this,n,s){let o=this.strings,i=!1;if(o===void 0)e=Tt(this,e,r,0),i=!qt(e)||e!==this._$AH&&e!==yt,i&&(this._$AH=e);else{let l=e,a,c;for(e=o[0],a=0;a<o.length-1;a++)c=Tt(this,l[n+a],r,a),c===yt&&(c=this._$AH[a]),i||(i=!qt(c)||c!==this._$AH[a]),c===$e?e=$e:e!==$e&&(e+=(c??"")+o[a+1]),this._$AH[a]=c}i&&!s&&this.j(e)}j(e){e===$e?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},Or=class extends Et{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===$e?void 0:e}},Mr=class extends Et{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==$e)}},Nr=class extends Et{constructor(e,r,n,s,o){super(e,r,n,s,o),this.type=5}_$AI(e,r=this){if((e=Tt(this,e,r,0)??$e)===yt)return;let n=this._$AH,s=e===$e&&n!==$e||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,o=e!==$e&&(n===$e||s);s&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},Pr=class{constructor(e,r,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=r,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){Tt(this,e)}};var jo=Ft.litHtmlPolyfillSupport;jo?.(zt,Ut),(Ft.litHtmlVersions??(Ft.litHtmlVersions=[])).push("3.3.1");var fe=(t,e,r)=>{let n=r?.renderBefore??e,s=n._$litPart$;if(s===void 0){let o=r?.renderBefore??null;n._$litPart$=s=new Ut(e.insertBefore(Bt(),o),o,void 0,r??{})}return s._$AI(t),s};var or="today",jn=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}];function qr(t){return t==="today"||t==="7d"||t==="30d"||t==="all"}function Yn(t,e=Date.now()){switch(t){case"today":{let r=new Date(e);return r.setHours(0,0,0,0),r.getTime()}case"7d":return e-7*864e5;case"30d":return e-30*864e5;case"all":default:return}}function Vn(){let t=null,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{get(){return t},set(n){t=n,r()},clear(){t=null,r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}function Zn(){let t=new Map,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{set(n,s){t.set(n,{lines:Array.isArray(s)?[...s]:[]}),r()},append(n,s){let o=t.get(n)||{lines:[]};o.lines=[...o.lines,s],t.set(n,o),r()},get(n){return t.get(n)||null},clear(n){typeof n=="string"?t.delete(n):t.clear(),r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}var ts=Uo(es(),1);function ke(t){return(0,ts.default)(`beads-ui:${t}`)}function et(t){if(typeof t=="number")return Number.isFinite(t)?t:0;if(typeof t=="string"){let e=Date.parse(t);return Number.isFinite(e)?e:0}return 0}function Ht(t,e){let r=et(t.created_at),n=et(e.created_at);if(r!==n)return r<n?1:-1;let s=t.priority??2,o=e.priority??2;if(s!==o)return s-o;let i=t.id,l=e.id;return i<l?-1:i>l?1:0}function ss(t,e){let r=et(t.created_at),n=et(e.created_at);if(r!==n)return r<n?-1:1;let s=t.priority??2,o=e.priority??2;if(s!==o)return s-o;let i=t.id,l=e.id;return i<l?-1:i>l?1:0}function os(t,e){let r=et(t.updated_at),n=et(e.updated_at);if(r!==n)return r<n?1:-1;let s=t.id,o=e.id;return s<o?-1:s>o?1:0}function is(t,e){let r=t.priority??2,n=e.priority??2;if(r!==n)return r-n;let s=et(t.created_at),o=et(e.created_at);if(s!==o)return s<o?1:-1;let i=t.id,l=e.id;return i<l?-1:i>l?1:0}function as(t,e){let r=t.closed_at??0,n=e.closed_at??0;if(r!==n)return r<n?1:-1;let s=t?.id,o=e?.id;return s<o?-1:s>o?1:0}var oi=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function rs(t){let e=t&&t.metadata,r=e?e.task_order:void 0;if(r==null||r==="")return Number.POSITIVE_INFINITY;let n=Number(r);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function ns(t){let e=t&&t.title;if(typeof e!="string")return Number.POSITIVE_INFINITY;let r=oi.exec(e);if(!r)return Number.POSITIVE_INFINITY;let n=Number(r[1]);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function ls(t,e){let r=rs(t),n=rs(e);if(r!==n)return r<n?-1:1;let s=ns(t),o=ns(e);if(s!==o)return s<o?-1:1;let i=et(t&&t.created_at),l=et(e&&e.created_at);if(i!==l)return i<l?-1:1;let a=t&&t.id,c=e&&e.id;return a===c?0:String(a)<String(c)?-1:1}var zr=2**20;function It(t,e){let r=t&&t.id;return e&&typeof r=="string"&&Object.prototype.hasOwnProperty.call(e,r)&&typeof e[r]=="number"&&Number.isFinite(e[r])?e[r]:-et(t&&t.created_at)}function lr(t){return(e,r)=>{let n=It(e,t),s=It(r,t);if(n!==s)return n<s?-1:1;let o=e?.id,i=r?.id;return o<i?-1:o>i?1:0}}function Ur(t,e,r){let n=Array.isArray(t)?t:[],s=n.length,o=Math.max(0,Math.min(e,s-1)),i=o-1>=0?n[o-1]:null,l=o+1<s?n[o+1]:null;if(!i&&!l)return{rank:0};if(!i)return{rank:It(l,r)-zr};if(!l)return{rank:It(i,r)+zr};let a=It(i,r),c=It(l,r),p=(a+c)/2;return a<p&&p<c?{rank:p}:{renormalize:n.map((h,b)=>({bead_id:h.id,rank:b*zr}))}}function Hr(t,e={}){let r=ke(`issue-store:${t}`),n=new Map,s=[],o=0,i=new Set,l=!1,a=e.sort||Ht;function c(){for(let b of Array.from(i))try{b()}catch{}}function p(){s=Array.from(n.values()).sort(a)}function h(b){if(l||!b||b.id!==t)return;let $=Number(b.revision)||0;if(r("apply %s rev=%d",b.type,$),!($<=o&&b.type!=="snapshot")){if(b.type==="snapshot"){if($<=o)return;n.clear();let v=Array.isArray(b.issues)?b.issues:[];for(let C of v)C&&typeof C.id=="string"&&C.id.length>0&&n.set(C.id,C);p(),o=$,c();return}if(b.type==="upsert"){let v=b.issue;if(v&&typeof v.id=="string"&&v.id.length>0){let C=n.get(v.id);if(!C)n.set(v.id,v);else{let N=Number.isFinite(C.updated_at)?C.updated_at:0,M=Number.isFinite(v.updated_at)?v.updated_at:0;if(N<=M){for(let F of Object.keys(C))F in v||delete C[F];for(let[F,B]of Object.entries(v))C[F]=B}}p()}o=$,c()}else if(b.type==="delete"){let v=String(b.issue_id||"");v&&(n.delete(v),p()),o=$,c()}}}return{id:t,subscribe(b){return i.add(b),()=>{i.delete(b)}},applyPush:h,snapshot(){return s},size(){return n.size},getById(b){return n.get(b)},dispose(){l=!0,n.clear(),s=[],i.clear(),o=0}}}function cr(t){let e=String(t.type||"").trim(),r={};if(t.params&&typeof t.params=="object"){let s=Object.keys(t.params).sort();for(let o of s){let i=t.params[o];r[o]=String(i)}}let n=new URLSearchParams(r).toString();return n.length>0?`${e}?${n}`:e}function cs(t){let e=ke("subs"),r=new Map,n=new Map;function s(l,a){e("applyDelta %s +%d ~%d -%d",l,(a.added||[]).length,(a.updated||[]).length,(a.removed||[]).length);let c=n.get(l);if(!c||c.size===0)return;let p=Array.isArray(a.added)?a.added:[],h=Array.isArray(a.updated)?a.updated:[],b=Array.isArray(a.removed)?a.removed:[];for(let $ of Array.from(c)){let v=r.get($);if(!v)continue;let C=v.itemsById;for(let N of p)typeof N=="string"&&N.length>0&&C.set(N,!0);for(let N of h)typeof N=="string"&&N.length>0&&C.set(N,!0);for(let N of b)typeof N=="string"&&N.length>0&&C.delete(N)}}async function o(l,a){let c=cr(a);if(e("subscribe %s key=%s",l,c),!r.has(l))r.set(l,{key:c,itemsById:new Map});else{let h=r.get(l);if(h&&h.key!==c){let b=n.get(h.key);b&&(b.delete(l),b.size===0&&n.delete(h.key)),r.set(l,{key:c,itemsById:new Map})}}n.has(c)||n.set(c,new Set);let p=n.get(c);p&&p.add(l);try{await t("subscribe-list",{id:l,type:a.type,params:a.params})}catch(h){let b=r.get(l)||null;if(b){let $=n.get(b.key);$&&($.delete(l),$.size===0&&n.delete(b.key))}throw r.delete(l),h}return async()=>{e("unsubscribe %s key=%s",l,c);try{await t("unsubscribe-list",{id:l})}catch{}let h=r.get(l)||null;if(h){let b=n.get(h.key);b&&(b.delete(l),b.size===0&&n.delete(h.key))}r.delete(l)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:cr,selectors:{getIds(l){let a=r.get(l);return a?Array.from(a.itemsById.keys()):[]},has(l,a){let c=r.get(l);return c?c.itemsById.has(a):!1},count(l){let a=r.get(l);return a?a.itemsById.size:0},getItemsById(l){let a=r.get(l),c={};if(!a)return c;for(let p of a.itemsById.keys())c[p]=!0;return c}}}}function ds(){let t=ke("issue-stores"),e=new Map,r=new Map,n=new Set,s=new Map;function o(){for(let a of Array.from(n))try{a()}catch{}}function i(a,c,p){let h=c?cr(c):"",b=r.get(a)||"",$=e.has(a);if(t("register %s key=%s (prev=%s)",a,h,b),$&&b&&h&&b!==h){let v=e.get(a);if(v)try{v.dispose()}catch{}let C=s.get(a);if(C){try{C()}catch{}s.delete(a)}let N=Hr(a,p);e.set(a,N);let M=N.subscribe(()=>o());s.set(a,M)}else if(!$){let v=Hr(a,p);e.set(a,v);let C=v.subscribe(()=>o());s.set(a,C)}return r.set(a,h),()=>l(a)}function l(a){t("unregister %s",a),r.delete(a);let c=e.get(a);c&&(c.dispose(),e.delete(a));let p=s.get(a);if(p){try{p()}catch{}s.delete(a)}}return{register:i,unregister:l,getStore(a){return e.get(a)||null},snapshotFor(a){let c=e.get(a);return c?c.snapshot().slice():[]},subscribe(a){return n.add(a),()=>n.delete(a)}}}function us(){let t=null,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{get(){return t},set(n){t=n,r()},clear(){t=null,r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}function ps(){let t=null,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{get(){return t},set(n){t=n,r()},clear(){t=null,r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}function Wr(t,e){return`#/${t==="worker"?"worker":"board"}?issue=${encodeURIComponent(e)}`}function ii(t){let e=String(t||""),r=e.startsWith("#")?e.slice(1):e,n=r.indexOf("?"),s=n>=0?r.slice(n+1):"";if(s){let l=new URLSearchParams(s).get("issue");if(l)return decodeURIComponent(l)}let o=/^\/issue\/([^\s?#]+)/.exec(r);return o&&o[1]?decodeURIComponent(o[1]):null}function ai(t){let e=String(t||"");return/^#\/worker(\b|\/|$)/.test(e)?"worker":"board"}function fs(t){let e=ke("router"),r=()=>{let n=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(n),o=s&&s[1]?decodeURIComponent(s[1]):ii(n),i=ai(n);if(e("hash change \u2192 view=%s id=%s",i,o),t.setState({selected_id:i==="worker"?null:o,view:i,worker:{selected_parent_id:i==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(n)){let a=o?`#/${i}?issue=${encodeURIComponent(o)}`:`#/${i}`;window.location.hash!==a&&(window.location.hash=a)}};return{start(){window.addEventListener("hashchange",r),r()},stop(){window.removeEventListener("hashchange",r)},gotoIssue(n){let o=(t.getState?t.getState():{view:"board"}).view==="worker"?"worker":"board",i=Wr(o,n);e("goto issue %s (view=%s)",n,o),window.location.hash!==i?window.location.hash=i:t.setState({selected_id:o==="worker"?null:n,view:o,worker:{selected_parent_id:o==="worker"?n:null}})},gotoView(n){let s=t.getState?t.getState():{selected_id:null,worker:{selected_parent_id:null}},o=n==="worker"?s.worker?.selected_parent_id:s.selected_id,i=o?Wr(n,o):`#/${n}`;e("goto view %s (id=%s)",n,o||""),window.location.hash!==i?window.location.hash=i:t.setState({view:n,selected_id:n==="worker"?null:s.selected_id})}}}var li=Object.freeze({workspace_config:{default_workspace:null}});function hs(t){return{workspace_config:{default_workspace:typeof t?.workspace_config?.default_workspace=="string"&&t.workspace_config.default_workspace.length>0?t.workspace_config.default_workspace:li.workspace_config.default_workspace}}}function ms(t={}){let e=ke("state"),r={selected_id:t.selected_id??null,view:t.view??"board",filters:{status:t.filters?.status??"all",search:t.filters?.search??"",type:typeof t.filters?.type=="string"?t.filters?.type:""},board:{closed_filter:t.board?.closed_filter==="3"||t.board?.closed_filter==="7"||t.board?.closed_filter==="today"?t.board?.closed_filter:"today",show_deferred_column:t.board?.show_deferred_column===!0},worker:{selected_parent_id:t.worker?.selected_parent_id??null,show_closed_children:Array.isArray(t.worker?.show_closed_children)?t.worker.show_closed_children:[]},workspace:{current:t.workspace?.current??null,available:t.workspace?.available??[],hidden:t.workspace?.hidden??[]},config:hs(t.config)},n=new Set;function s(){for(let o of Array.from(n))try{o(r)}catch{}}return{getState(){return r},setState(o){let i={...r,...o,filters:{...r.filters,...o.filters||{}},board:{...r.board,...o.board||{}},worker:{...r.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:r.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:r.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:r.workspace.hidden},config:o.config!==void 0?hs(o.config):r.config},l=i.workspace.current?.path!==r.workspace.current?.path||i.workspace.available.length!==r.workspace.available.length||i.workspace.hidden.length!==r.workspace.hidden.length||i.workspace.hidden.some((c,p)=>c!==r.workspace.hidden[p]),a=i.config.workspace_config.default_workspace!==r.config.workspace_config.default_workspace;i.selected_id===r.selected_id&&i.view===r.view&&i.filters.status===r.filters.status&&i.filters.search===r.filters.search&&i.filters.type===r.filters.type&&i.board.closed_filter===r.board.closed_filter&&i.board.show_deferred_column===r.board.show_deferred_column&&i.worker.selected_parent_id===r.worker.selected_parent_id&&i.worker.show_closed_children.length===r.worker.show_closed_children.length&&i.worker.show_closed_children.every((c,p)=>c===r.worker.show_closed_children[p])&&!l&&!a||(r=i,e("state change %o",{selected_id:r.selected_id,view:r.view,filters:r.filters,board:r.board,worker:r.worker,workspace:r.workspace.current?.path,config:{default_workspace:r.config.workspace_config.default_workspace}}),s())},subscribe(o){return n.add(o),()=>n.delete(o)}}}function gs(t){let e=ke("activity"),r=0,n=new Map,s=1;function o(){if(!t)return;let c=r>0;t.toggleAttribute("hidden",!c),t.setAttribute("aria-busy",c?"true":"false")}function i(){r+=1,e("start count=%d",r),o()}function l(){let c=r;r=Math.max(0,r-1),c<=0?e("done called but count was already %d",c):e("done count=%d\u2192%d",c,r),o()}function a(c){return async(h,b)=>{let $=s++,v=Date.now();n.set($,{type:h,start_ts:v}),e("request start id=%d type=%s count=%d",$,h,r+1),i();let C=!1,N=()=>{C||(C=!0,n.delete($),l())},M=setTimeout(()=>{C||(e("request TIMEOUT id=%d type=%s elapsed=%dms",$,h,Date.now()-v),N())},3e4);try{let F=await c(h,b),B=Date.now()-v;return e("request done id=%d type=%s elapsed=%dms",$,h,B),F}catch(F){let B=Date.now()-v;throw e("request error id=%d type=%s elapsed=%dms err=%o",$,h,B,F),F}finally{clearTimeout(M),N()}}}return o(),{wrapSend:a,start:i,done:l,getCount:()=>r,getActiveRequests:()=>{let c=Date.now();return Array.from(n.entries()).map(([p,h])=>({id:p,type:h.type,elapsed_ms:c-h.start_ts}))}}}function X(t,e="info",r=2800){let n=document.createElement("div");n.className="toast",n.textContent=t,n.style.position="fixed",n.style.right="12px",n.style.bottom="12px",n.style.zIndex="1000",n.style.color="#fff",n.style.padding="8px 10px",n.style.borderRadius="4px",n.style.fontSize="12px",e==="success"?n.style.background="#156d36":e==="warning"?n.style.background="#a36a00":e==="error"?n.style.background="#9f2011":n.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(n),setTimeout(()=>{try{n.remove()}catch{}},r)}function dr(t=void 0,e=void 0){function r(){if(!e||typeof e.get!="function")return null;let o=e.get();return o&&o.order?o.order:{}}function n(o,i,l){let a=t&&t.snapshotFor?t.snapshotFor(o).slice():[];if(i==="closed")return a.sort(as),a;switch(l){case"created_desc":return a.sort(Ht),a;case"created_asc":return a.sort(ss),a;case"updated_desc":return a.sort(os),a;case"priority":return a.sort(is),a;case"manual":default:{let c=r();return c?a.sort(lr(c)):a.sort(Ht),a}}}function s(o){let i=[];return t&&typeof t.subscribe=="function"&&i.push(t.subscribe(o)),e&&typeof e.subscribe=="function"&&i.push(e.subscribe(o)),()=>{for(let l of i)try{l()}catch{}}}return{selectBoardColumn:n,subscribe:s}}function ur(t){let e=t.transport,r=t.uiOrderStore;function n(i,l){return"renormalize"in i?i.renormalize:[{bead_id:l,rank:i.rank}]}function s(i,l){let a={...i.order};for(let c of l)a[c.bead_id]=c.rank;r&&r.set({revision:i.revision,order:a})}async function o(i,l,a){if(!e||!r)return;let c=r.get()||{revision:0,order:{}},p=n(Ur(l,a,c.order),i);s(c,p);let h=await e("ui-order-set",{expected_revision:c.revision,entries:p});if(h&&h.conflict){let b={revision:typeof h.revision=="number"?h.revision:0,order:h.order||{}};r.set(b);let $=n(Ur(l,a,b.order),i);s(b,$);let v=await e("ui-order-set",{expected_revision:b.revision,entries:$});v&&v.applied&&r.set({revision:typeof v.revision=="number"?v.revision:0,order:v.order||{}})}else h&&h.applied&&r.set({revision:typeof h.revision=="number"?h.revision:0,order:h.order||{}})}return{applyReorder:o}}function pr(t){return Array.isArray(t)?t.filter(e=>typeof e=="string"):[]}function Gr(t,e){return!e||typeof t!="string"||t.length===0||pr(e.visible_labels).includes(t)?!0:pr(e.hidden_labels).includes(t)?!1:!pr(e.hidden_prefixes).some(r=>r.length>0&&t.startsWith(r))}function bs(t,e){return pr(t).filter(r=>Gr(r,e))}function kt(t,e){let r=t&&t.chips?t.chips[e]:void 0;return typeof r=="boolean"?r:!0}function jr(t){if(!t)return null;if(typeof t=="number")return Number.isFinite(t)?t:null;let e=Date.parse(t);return Number.isFinite(e)?e:null}function Dt(t){let e=jr(t);if(e===null)return"";let r=new Date(e),n=s=>String(s).padStart(2,"0");return`${r.getFullYear()}-${n(r.getMonth()+1)}-${n(r.getDate())} ${n(r.getHours())}:${n(r.getMinutes())}`}function Yr(t,e){let r=jr(t);if(r===null)return"";let s=(typeof e=="number"?e:Date.now())-r;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let i=Math.floor(s/36e5);if(i<24)return`${i}\uC2DC\uAC04 \uC804`;let l=Math.floor(s/864e5);if(l<7)return`${l}\uC77C \uC804`;let a=Math.floor(l/7);if(l<30)return`${a}\uC8FC \uC804`;let c=Math.floor(l/30);return c<12?`${c}\uAC1C\uC6D4 \uC804`:`${Math.floor(l/365)}\uB144 \uC804`}var ci={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg"},di={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge"},ui={spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},pi={reviewed:"\u2713",skip:"\u2298",stale:"\u2713"};function fi(t,e,r){if(!(r==="in_progress"||r==="resolved"))return null;for(let s of t)if(e[s]&&e[s].state==="dim")return s;return null}function hi(t,e,r){let n=ci[t]||t,s=e&&e.state||"empty",o=pi[s]||"",i="bar";s==="dim"?i+=` b-${n} dim`:s==="on"||s==="reviewed"||s==="skip"?i+=` b-${n} on`:s==="stale"&&(i+=` b-${n} stale`),r&&(i+=" glow");let l=s==="empty"?"lbl":`lbl l-${n} on`,a=r?`color: var(--stage-${n}-on)`:"";return f`
    <div class="seg">
      <div class=${i} style=${a}>${o}</div>
      <div class=${l}>
        ${di[t]||t}
      </div>
    </div>
  `}function fr(t,e){if(!t||!t.stages)return"";let r=t.route==="full_plan"?"full_plan":"spec_backed",n=ui[r],s=t.stages,o=fi(n,s,String(e||"open"));return f`
    <div class="stp" role="img" aria-label="워크플로우 진행 스테퍼">
      ${n.map(i=>hi(i,s[i]||{state:"empty"},i===o))}
    </div>
  `}function mi(t){return typeof t!="number"||!Number.isFinite(t)?"":`P${Math.max(0,Math.min(4,t))}`}var _s=2;function gi(t){if(!t)return[];let e=[];if(t.external){let n=t.reason?`\u23F8 blocked: ${t.reason}`:"\u23F8 blocked";e.push(f`<span class="ctl-chip ctl-chip--blocked">${n}</span>`)}let r=Array.isArray(t.blockers)?t.blockers:[];if(r.length>0){let n=r.slice(0,_s).join(", "),s=r.length-_s,o=`\u26D3 blocked: ${n}${s>0?` +${s}`:""}`;e.push(f`<span class="ctl-chip ctl-chip--blocked-dep">${o}</span>`)}return e}function bi(t,e){let r=e.policy||null,n=t.workflow&&t.workflow.chips||{},s=[];if(n.route&&kt(r,"route")){let o=n.route_source==="derived";s.push(f`<span
        class="ctl-chip ctl-chip--route${o?" is-derived":""}"
        title=${o?"route \uCD94\uB860\uAC12 (metadata \uBBF8\uD540)":"route"}
        >${o?`${n.route} ?`:n.route}</span
      >`)}if(n.fast_track&&kt(r,"fast_track")&&s.push(f`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),n.pr&&kt(r,"pr")){let o=n.pr.number;s.push(f`<span class="ctl-chip ctl-chip--pr"
        >${`PR${o!=null?` #${o}`:""}`}</span
      >`)}for(let o of bs(t.labels,r))s.push(f`<span class="ctl-chip ctl-chip--label">${o}</span>`);return t.from_id&&kt(r,"from")&&s.push(f`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${t.from_id} \uC5F4\uAE30`}
        @click=${o=>{o.stopPropagation(),e.onFromChipClick&&e.onFromChipClick(o,String(t.from_id))}}
      >
        ↩ from ${t.from_id}
      </button>`),kt(r,"blocked")&&s.push(...gi(t.blocked_info)),s.length===0?"":f`<div class="board-card__chips">${s}</div>`}function _i(t){switch(t){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function yi(t){let e=Yr(t.created_at),r=Yr(t.updated_at);return!e&&!r?"":f`<span class="board-card__times">
    ${e?f`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${Dt(t.created_at)}`}
          >생성 ${e}</span
        >`:""}
    ${e&&r?f`<span class="board-card__time-sep">·</span>`:""}
    ${r?f`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${Dt(t.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </span>`}function wi(t,e){let r=e.rollupFor?e.rollupFor(t.id):{total:0,count:0,current:null,children:[]},n=r.total||0,s=e.isExpanded?e.isExpanded(t.id):!0,o=n>0?r.children.slice().sort(ls):r.children;return f`
    <div class="board-card__roll">
      <div class="board-card__roll-meta">
        ${n>0?f`<button
              type="button"
              class="board-card__roll-toggle"
              aria-expanded=${s?"true":"false"}
              @click=${i=>e.onRollupToggle&&e.onRollupToggle(i,t.id)}
            >
              children ${r.count}/${n} ${s?"\u25B4":"\u25BE"}
            </button>`:f`<span class="board-card__roll-none">children 없음</span>`}
        ${yi(t)}
      </div>
      ${n>0&&r.current?f`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${r.current.title||r.current.id}</span
            >
          </div>`:""}
      ${s&&n>0?f`<div class="board-card__roll-list">
            ${o.map((i,l)=>f`<button
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
  `}function ys(t,e){let r=mi(t.priority);return f`
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
        ${r?f`<span class="board-card__pri">${r}</span>`:""}
      </div>
      <div class="board-card__title">${t.title||"(\uC81C\uBAA9 \uC5C6\uC74C)"}</div>
      ${bi(t,e)}
      ${t.workflow&&kt(e.policy||null,"stepper")?fr(t.workflow,t.status):""}
      ${wi(t,e)}
    </article>
  `}function vt(t,e){let r=Array.isArray(t.items)?t.items.length:0,n=t.is_closed===!0;return f`
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
        ${n?f`<select
              class="board-column__closed-range"
              aria-label="Closed period"
              @change=${e.onClosedRangeChange}
            >
              ${jn.map(o=>f`<option
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
        ${t.items.map(o=>ys(o,e))}
      </div>
    </section>
  `}var ki=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],vi=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],$i=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function xi(t,e,r){let n=t.labels.length,s=n>0?`\uB77C\uBCA8 ${n}`:"\uB77C\uBCA8";return f`
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
      ${r.label_menu_open?f`<div class="board-filter__label-menu" role="group">
            ${r.label_options.length===0?f`<div class="board-filter__label-empty">라벨 없음</div>`:r.label_options.map(o=>f`<label class="board-filter__label-row">
                      <input
                        type="checkbox"
                        .checked=${t.labels.includes(o)}
                        @change=${()=>e.onLabelToggle(o)}
                      />
                      <span>${o}</span>
                    </label>`)}
            ${n>0?f`<button
                  type="button"
                  class="board-filter__label-clear"
                  @click=${e.onLabelClear}
                >
                  선택 해제
                </button>`:""}
          </div>`:""}
    </div>
  `}function ws(t,e,r){return f`
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
        ${ki.map(n=>f`<option
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
        ${vi.map(n=>f`<option
              value=${n.value}
              ?selected=${t.type===n.value}
            >
              ${n.label}
            </option>`)}
      </select>
      ${xi(t,e,r)}
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
        ${$i.map(n=>f`<option
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
  `}var Si=200,Ai={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","deferred-col":"deferred","closed-col":"closed"},Ti=new Set(["blocked-col","ready-col","in-progress-col","resolved-col","deferred-col"]),ks="beads-ui.board.sort",vs=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function Ei(){try{let t=window.localStorage.getItem(ks);if(t&&vs.has(t))return t}catch{}return"created_desc"}function $s(t,e){let r=ke("views:board"),n=e.gotoIssue,s=e.issueStores,o=e.transport,i=e.uiOrderStore,l=e.displayPolicyStore,a=e.onClosedRangeChange,c=e.onNewIssue,p=e.closedRange||or,h=s?dr(s,i):null,b=ur({transport:o,uiOrderStore:i}),$=[],v=[],C=[],N=[],M=[],F=[],B=!1,I=0,S=Ei(),x=new Map,w=new Map,_=new Map,z=new Set,Y={search:"",priority:"",type:"",labels:[]},Q=!1,J=null;function Ie(T){return String(T.status||"open")==="open"}function Me(T){let D=String(T.status||"open");return D==="open"||D==="blocked"}function Te(T){let D=Y.search.trim().toLowerCase(),Z=Y.priority,j=Y.type,P=Y.labels;return T.filter(g=>{if(D){let E=String(g.id||"").toLowerCase(),A=String(g.title||"").toLowerCase();if(!E.includes(D)&&!A.includes(D))return!1}if(Z!==""&&String(g.priority)!==Z||j!==""&&String(g.issue_type||"")!==j)return!1;if(P.length>0){let E=Array.isArray(g.labels)?g.labels:[];if(!P.some(A=>E.includes(A)))return!1}return!0})}function Ke(){let T=new Set;for(let D of[$,v,C,N,M,F])for(let Z of D){let j=Array.isArray(Z.labels)?Z.labels:[];for(let P of j)typeof P=="string"&&P.length>0&&T.add(P)}return Array.from(T).sort()}function We(){return Y.search.trim()!==""||Y.priority!==""||Y.type!==""||Y.labels.length>0}function ve(){try{if(h){let T=h.selectBoardColumn("tab:board:in-progress","in_progress",S),D=h.selectBoardColumn("tab:board:blocked","blocked",S).filter(Me),Z=new Set(T.map(H=>H.id)),j=h.selectBoardColumn("tab:board:ready","ready",S).filter(H=>Ie(H)&&!Z.has(H.id)),P=h.selectBoardColumn("tab:board:resolved","resolved",S),g=h.selectBoardColumn("tab:board:deferred","deferred",S),E=B?g:[],A=h.selectBoardColumn("tab:board:closed","closed").slice(0,Si),R=[...D,...j,...T,...P,...E,...A];Se(R);let K=new Set;for(let H of R)H&&H.id&&!Vr(H)&&K.add(H.id);let ce=!We();$=ce?Ot(D,K):D,v=ce?Ot(j,K):j,C=ce?Ot(T,K):T,N=ce?Ot(P,K):P,M=ce?Ot(E,K):E,I=g.length,F=ce?Ot(A,K):A,x=new Map;for(let H of $)x.set(H.id,"open");for(let H of v)x.set(H.id,"open");for(let H of C)x.set(H.id,"in_progress");for(let H of N)x.set(H.id,"resolved");for(let H of M)x.set(H.id,"deferred");for(let H of F)x.set(H.id,"closed");w=new Map;for(let H of $)w.set(H.id,"blocked-col");for(let H of v)w.set(H.id,"ready-col");for(let H of C)w.set(H.id,"in-progress-col");for(let H of N)w.set(H.id,"resolved-col");for(let H of M)w.set(H.id,"deferred-col");for(let H of F)w.set(H.id,"closed-col")}ee()}catch{$=[],v=[],C=[],N=[],M=[],F=[],_=new Map,ee()}}function Se(T){let D=new Map;for(let j of T)j&&j.id&&!D.has(j.id)&&D.set(j.id,j);let Z=new Map;for(let j of D.values()){let P=Vr(j);if(!P)continue;let g=Z.get(P);g||(g=[],Z.set(P,g)),g.push({id:j.id,title:j.title,status:j.status,metadata:j.metadata,created_at:j.created_at})}_=Z}function Ve(T){let D=_.get(T)||[],Z=0,j=null;for(let P of D)(P.status==="resolved"||P.status==="closed")&&(Z+=1),!j&&P.status==="in_progress"&&(j=P);return{total:D.length,count:Z,current:j,children:D}}function me(T){return!z.has(T)}function st(T,D){T.preventDefault(),T.stopPropagation(),z.has(D)?z.delete(D):z.add(D),ee()}function oe(T,D){T.preventDefault(),T.stopPropagation(),n(D)}function Ge(T,D){T.preventDefault(),T.stopPropagation(),n(D)}function ie(T,D){J||n(D)}function Ne(T,D){T.preventDefault(),T.stopPropagation(),Ci(D).then(Z=>{Z&&X("\uBCF5\uC0AC\uB428","success",1200)})}function Xe(T,D){J=D,T.dataTransfer&&(T.dataTransfer.setData("text/plain",D),T.dataTransfer.effectAllowed="move"),T.target.classList.add("board-card--dragging")}function Ae(T){T.target.classList.remove("board-card--dragging"),se(),setTimeout(()=>{J=null},0)}function Ee(T){let D=String(T.target.value||"");!D||D===p||(p=D,a&&a(D),ee())}let _e={onCardClick:ie,onCopyId:Ne,onDragStart:Xe,onDragEnd:Ae,onClosedRangeChange:Ee,rollupFor:Ve,isExpanded:me,onRollupToggle:st,onChildClick:oe,onFromChipClick:Ge,get policy(){return l?l.get():null}};function Be(T){let D=T.target,Z=t.querySelector(".board-filter__labels");D&&Z&&Z.contains(D)||y()}function Ze(T){T.key==="Escape"&&y()}function Ce(){Q||(Q=!0,document.addEventListener("mousedown",Be),document.addEventListener("keydown",Ze),ee())}function y(){Q&&(Q=!1,document.removeEventListener("mousedown",Be),document.removeEventListener("keydown",Ze),ee())}let k={onSearchInput(T){Y.search=String(T.target.value||""),ve()},onPriorityChange(T){Y.priority=String(T.target.value||""),ve()},onTypeChange(T){Y.type=String(T.target.value||""),ve()},onSortChange(T){let D=String(T.target.value||"");if(!(!vs.has(D)||D===S)){S=D;try{window.localStorage.setItem(ks,D)}catch{}ve()}},onDeferredToggle(){B=!B,ve()},onLabelMenuToggle(){Q?y():Ce()},onLabelToggle(T){let D=Y.labels.indexOf(T);D===-1?Y.labels.push(T):Y.labels.splice(D,1),ve()},onLabelClear(){Y.labels.length!==0&&(Y.labels=[],ve())},onNewIssue(){c&&c()}};function U(){let T=B?"board-root board-root--deferred":"board-root";return f`
      <div class="board-view">
        ${ws(Y,k,{sort_mode:S,show_deferred:B,deferred_count:I,label_options:Ke(),label_menu_open:Q})}
        <div class=${T}>
          ${vt({title:"Blocked",id:"blocked-col",items:Te($)},_e)}
          ${vt({title:"Ready",id:"ready-col",items:Te(v)},_e)}
          ${vt({title:"In progress",id:"in-progress-col",items:Te(C)},_e)}
          ${vt({title:"Resolved",id:"resolved-col",items:Te(N)},_e)}
          ${B?vt({title:"Deferred",id:"deferred-col",items:Te(M)},_e):""}
          ${vt({title:"Closed",id:"closed-col",items:Te(F),is_closed:!0,closed_range:p},_e)}
        </div>
      </div>
    `}function ee(){fe(U(),t),ue()}function ue(){try{let T=Array.from(t.querySelectorAll(".board-column"));for(let D of T)Array.from(D.querySelectorAll(".board-card")).forEach((j,P)=>{j.tabIndex=P===0?0:-1})}catch{}}async function ge(T,D){if(!o){X("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:T,status:D}),X("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(Z){r("update-status failed: %o",Z),X("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function le(T){switch(T){case"blocked-col":return $;case"ready-col":return v;case"in-progress-col":return C;case"resolved-col":return N;case"deferred-col":return M;default:return[]}}function ye(T,D,Z){if(!o||!i)return;let j=le(T),P=j.find(K=>K.id===D);if(!P)return;let g=j.filter(K=>K.id!==D),E=Z.closest?Z.closest(".board-card"):null,A=g.length;if(E){let K=E.getAttribute("data-issue-id");if(K===D)return;let ce=g.findIndex(H=>H.id===K);ce>=0&&(A=ce)}let R=g.slice();R.splice(A,0,P),b.applyReorder(D,R,A)}function se(){for(let T of Array.from(t.querySelectorAll(".board-column--drag-over")))T.classList.remove("board-column--drag-over")}let te=null;t.addEventListener("dragover",T=>{T.preventDefault(),T.dataTransfer&&(T.dataTransfer.dropEffect="move");let Z=T.target.closest(".board-column");Z&&Z!==te&&(te&&te.classList.remove("board-column--drag-over"),Z.classList.add("board-column--drag-over"),te=Z)}),t.addEventListener("dragleave",T=>{let D=T.relatedTarget;(!D||!t.contains(D))&&te&&(te.classList.remove("board-column--drag-over"),te=null)}),t.addEventListener("drop",T=>{T.preventDefault(),te&&(te.classList.remove("board-column--drag-over"),te=null);let D=T.target,Z=D.closest(".board-column");if(!Z)return;let j=T.dataTransfer?.getData("text/plain")||"";if(!j)return;let P=Z.id,g=w.get(j);if(g&&g===P){if(Ti.has(P)){if(S!=="manual"){X("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}ye(P,j,D)}return}let E=Ai[P];if(!E){X("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}x.get(j)!==E&&ge(j,E)}),t.addEventListener("keydown",T=>{let D=T.target;if(!(D instanceof HTMLElement))return;let Z=String(D.tagName||"").toLowerCase();if(Z==="input"||Z==="textarea"||Z==="select"||Z==="button"||Z==="a"||D.isContentEditable===!0)return;let j=D.closest(".board-card");if(!j)return;let P=String(T.key||"");if(P==="Enter"||P===" "){T.preventDefault();let R=j.getAttribute("data-issue-id");R&&n(R);return}if(P!=="ArrowUp"&&P!=="ArrowDown"&&P!=="ArrowLeft"&&P!=="ArrowRight")return;T.preventDefault();let g=j.closest(".board-column");if(!g)return;let E=Array.from(g.querySelectorAll(".board-card")),A=E.indexOf(j);if(P==="ArrowDown"&&A<E.length-1){Pe(j,E[A+1]);return}if(P==="ArrowUp"&&A>0){Pe(j,E[A-1]);return}if(P==="ArrowLeft"||P==="ArrowRight"){let R=Array.from(t.querySelectorAll(".board-column")),K=R.indexOf(g),ce=P==="ArrowRight"?1:-1,H=K+ce;for(;H>=0&&H<R.length;){let Le=R[H].querySelector(".board-card");if(Le){Pe(j,Le);return}H+=ce}}});function Pe(T,D){try{T.tabIndex=-1,D.tabIndex=0,D.focus()}catch{}}let De=null;h&&h.subscribe&&(De=h.subscribe(()=>{try{ve()}catch{}}));let Re=null;return l&&l.subscribe&&(Re=l.subscribe(()=>{try{ve()}catch{}})),{async load(){r("load"),ve()},clear(){y(),De&&(De(),De=null),Re&&(Re(),Re=null),t.replaceChildren(),$=[],v=[],C=[],N=[],M=[],F=[],x=new Map,w=new Map}}}function Vr(t){let e=t&&t.parent;return typeof e=="string"?e:e&&e.id?String(e.id):""}function Ot(t,e){return t.filter(r=>{let n=Vr(r);return!(n&&e.has(n))})}async function Ci(t){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(t)),!0;let e=document.createElement("textarea");e.value=String(t),e.style.position="fixed",e.style.left="-9999px",document.body.appendChild(e),e.select();let r=!1;try{r=document.execCommand("copy")}finally{e.remove()}return r}catch{return!1}}async function Mt(t){let e=String(t);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(e),!0}catch{}try{let r=document.createElement("textarea");r.value=e,r.style.position="fixed",r.style.left="-9999px",document.body.appendChild(r),r.select();let n=!1;try{n=document.execCommand("copy")}finally{r.remove()}return n}catch{return!1}}var Ri={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},Li=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,Ii=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function ft(t){return!!t&&typeof t=="object"}function Zr(t){return typeof t!="string"||t.length===0?[]:t.split(/\r?\n/)}function xs(t,e){let r=Zr(t),n=Zr(e),s=new Map;for(let l of r)s.set(l,(s.get(l)||0)+1);let o=0;for(let l of n){let a=s.get(l)||0;a>0?s.set(l,a-1):o+=1}let i=0;for(let l of s.values())i+=l;return{added:o,removed:i}}function Di(t){let e="";typeof t=="string"?e=t:Array.isArray(t)?e=t.map(s=>ft(s)&&typeof s.text=="string"?s.text:"").join(""):ft(t)&&typeof t.text=="string"&&(e=t.text);let n=(String(e).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return n.length>120?`${n.slice(0,117)}\u2026`:n}function Oi(t){let e=String(t.name||""),r=t.input||{},n={kind:"tool",tool:e,icon:Ri[e]||"\u{1F527}",input:r,expandable:!0};if((e==="Read"||e==="Write")&&(n.path=String(r.file_path||r.path||"")),e==="Write"&&(n.added=Zr(r.content).length),e==="Edit"){n.path=String(r.file_path||r.path||"");let{added:s,removed:o}=xs(r.old_string,r.new_string);n.added=s,n.removed=o}if(e==="MultiEdit"){n.path=String(r.file_path||r.path||"");let s=0,o=0,i=Array.isArray(r.edits)?r.edits:[];for(let l of i){let a=xs(ft(l)?l.old_string:"",ft(l)?l.new_string:"");s+=a.added,o+=a.removed}n.added=s,n.removed=o}return e==="Bash"&&(n.command=String(r.command||"")),(e==="Grep"||e==="Glob")&&(n.command=String(r.pattern||r.query||"")),n}function Ss(t){let e=t.split(/\r?\n/).find(n=>n.trim().length>0)||"",r=Li.exec(e);return r?{kind:"gate",gate:r[2]==="implementation"?"impl":r[2],reviewer:r[3],verdict:r[4],time:r[5]?r[5].trim():void 0,text:e.trim()}:Ii.test(e)&&e.trim().length<=80?{kind:"phase",text:e.trim()}:{kind:"assistant",text:t}}function Mi(t,e){if(t.type==="assistant"){let r=t.message,n=r&&Array.isArray(r.content)?r.content:[],s=[];for(let o of n)if(ft(o)){if(o.type==="text"&&typeof o.text=="string")s.push(Ss(o.text));else if(o.type==="tool_use"){let i=Oi(o);typeof o.id=="string"&&e.set(o.id,i),s.push(i)}}return s}if(t.type==="user"){let r=t.message,n=r&&Array.isArray(r.content)?r.content:[];for(let s of n)if(ft(s)&&s.type==="tool_result"){let o=e.get(String(s.tool_use_id));if(o){let i=Di(s.content);o.result=i,o.output=typeof s.content=="string"?s.content:i}}return[]}if(t.type==="result"){let r=t.is_error===!1&&t.subtype==="success";return[{kind:"result",success:r,text:typeof t.result=="string"?t.result:r?"DONE":""}]}return[]}function Ni(t){if(t.type==="item.completed"&&ft(t.item)){let e=t.item;return e.type==="agent_message"&&typeof e.text=="string"?[Ss(e.text)]:e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}if(t.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(t.type==="turn.failed"){let e=t.error;return[{kind:"error",text:e&&typeof e.message=="string"?e.message:"turn failed"}]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:[]}function Pi(t){let e=t.type;return typeof e=="string"&&(e==="error"||e.startsWith("thread.")||e.startsWith("turn.")||e.startsWith("item."))}function As(t){let e=[],r=new Map,n=Array.isArray(t)?t:[];for(let s of n){let o=s;if(typeof s=="string"){let l=s.trim();if(l.length===0)continue;try{o=JSON.parse(l)}catch{continue}}if(!ft(o))continue;let i=Pi(o)?Ni(o):Mi(o,r);for(let l of i)e.push(l)}return e}function hr(t,e={}){let{transport:r,sessionLogStore:n,onClose:s}=e,o=null,i={},l=!0,a=new Set,c=null;function p(){if(!o||!n)return[];let w=n.get(o);return As(w?w.lines:[])}function h(w,_){if(_.kind==="gate")return f`<div class="sv__gate">${_.text}</div>`;if(_.kind==="phase")return f`<div class="sv__phase">${_.text}</div>`;if(_.kind==="result")return f`<div
        class="sv__result${_.success?" sv__result--ok":" sv__result--fail"}"
      >
        ${_.success?"\u2713":"\u2717"}
        ${_.text||(_.success?"DONE":"\uC2E4\uD328")}
      </div>`;if(_.kind==="error")return f`<div class="sv__error">⛔ ${_.text}</div>`;if(_.kind==="blocker")return f`<div class="sv__error">⛔ ${_.text}</div>`;if(_.kind==="tool"){let z=a.has(w),Y=_.tool==="Bash"?_.command:_.path||_.command||"";return f`<div
        class="sv__tool${z?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>N(w)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${_.icon}</span>
          <span class="sv__tool-name">${_.tool}</span>
          ${Y?f`<span class="sv__tool-detail">${Y}</span>`:""}
          ${typeof _.added=="number"?f`<span class="sv__diff-add">+${_.added}</span>`:""}
          ${typeof _.removed=="number"?f`<span class="sv__diff-del">−${_.removed}</span>`:""}
          ${_.result?f`<span class="sv__tool-ok">→ ${_.result}</span>`:""}
        </span>
        ${z?f`<pre class="sv__tool-expand">${b(_)}</pre>`:""}
      </div>`}return f`<div class="sv__as">${_.text}</div>`}function b(w){let _=[];if(w.input!==void 0)try{_.push(`input: ${JSON.stringify(w.input,null,2)}`)}catch{}return typeof w.output=="string"&&w.output.length>0&&_.push(`output:
${w.output}`),_.join(`

`)}function $(){if(!o)return f``;let w=p(),_=[i.runner,i.model,i.effort].filter(Boolean).join(" \xB7 "),z=i.session_id||"",Y=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${l?"ON":"OFF"}`;return f`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id">${o}</span>
        ${z?f`<button
              type="button"
              class="sv__session"
              title=${z}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${z}`}
              @click=${()=>F(z)}
            >
              ⧉ ${z.slice(0,8)}
            </button>`:""}
        ${_?f`<span class="sv__meta">${_}</span>`:""}
        ${i.worktree?f`<span class="sv__wt" title=${i.worktree}
              >${i.worktree}</span
            >`:""}
        <button
          type="button"
          class="sv__follow${l?" sv__follow--on":""}"
          aria-pressed=${l?"true":"false"}
          aria-label=${Y}
          @click=${M}
        >
          <span class="sv__follow-full">⇣ ${Y}</span>
          <span class="sv__follow-short">⇣ ${l?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>x()}
        >
          ✕
        </button>
      </div>
      <div class="sv__body">
        ${w.length===0?f`<div class="sv__empty">세션 로그 없음</div>`:w.map((Q,J)=>h(J,Q))}
      </div>
    </div>`}function v(){fe($(),t),l&&C()}function C(){let w=t.querySelector(".sv__body");w&&(w.scrollTop=w.scrollHeight)}function N(w){a.has(w)?a.delete(w):a.add(w),v()}function M(){l=!l,v()}function F(w){Mt(w).then(_=>{_?X("\uBCF5\uC0AC\uB428","success",1200):X("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function B(w){!o||!w||(i={...i,...w},v())}function I(w){let _=w.target;if(!_||!_.classList||!_.classList.contains("sv__body"))return;!(_.scrollHeight-_.scrollTop-_.clientHeight<=4)&&l&&(l=!1,v())}t.addEventListener("scroll",I,!0);function S(w){let _=w&&w.attempt_id;_&&(o=_,i=w.meta||{},l=!0,a.clear(),!c&&n&&(c=n.subscribe(v)),r&&Promise.resolve(r("subscribe-session-log",{id:`session-log:${o}`,attempt_id:o})).catch(()=>{}),v())}function x(){let w=o;o=null,a.clear(),r&&w&&Promise.resolve(r("unsubscribe-session-log",{id:`session-log:${w}`})).catch(()=>{}),fe(f``,t),s&&s()}return{open:S,updateMeta:B,close:x,isOpen(){return o!==null},destroy(){c&&(c(),c=null),t.removeEventListener("scroll",I,!0),o=null,fe(f``,t)}}}function Fi(t){let e=t&&t.metadata||{},r=[];return typeof e.spec_id=="string"&&e.spec_id.trim().length>0&&r.push({kind:"spec",path:e.spec_id.trim()}),typeof e.plan_path=="string"&&e.plan_path.trim().length>0&&r.push({kind:"plan",path:e.plan_path.trim()}),r}function Ts(t,e){let r=Fi(t);return f`
    <div class="detail-section-label">Artifacts</div>
    ${r.length===0?f`<div class="detail-empty">산출물 없음</div>`:f`
          ${r.map(n=>f`<div class="detail-art">
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
  `}var Kr=["opus","sonnet","haiku","fable"],Xr=["low","medium","high","xhigh"],Qr=["codex","opus","fable","self","skip"],Jr=["opus","fable","sonnet","haiku"],Bi=["standard","fast_track"],en={orchestration_model:"(\uAE30\uBCF8: CLI \uAE30\uBCF8 \uBAA8\uB378)",orchestration_effort:"(\uAE30\uBCF8: CLI \uAE30\uBCF8)",review_model:"(\uAE30\uBCF8: codex)",impl_model:"(\uAE30\uBCF8: \uD2F0\uC5B4 \uC790\uB3D9)"};function mr(t,e){let r=e&&e[t];return typeof r=="string"&&r.length>0?`(\uAE30\uBCF8: ${r} \u2014 \uC804\uC5ED)`:en[t]||"(\uAE30\uBCF8)"}function Wt(t,e,r,n,s,o){return f`
    <div class="detail-kv">
      <span class="detail-kv__k">${e}</span>
      <select
        class=${s?"detail-kv__v detail-kv__v--sel":"detail-kv__v"}
        aria-label=${e}
        data-key=${t}
        @change=${i=>o.onChange(t,i.target.value)}
      >
        ${r.map(i=>f`<option value=${i.value} ?selected=${i.value===n}>
              ${i.label}
            </option>`)}
      </select>
    </div>
  `}function Gt(t,e){let r=t.map(n=>({value:n,label:n}));return typeof e=="string"?[{value:"",label:e},...r]:r}function Es(t,e,r){let n=t&&t.metadata||{},s=r&&typeof r=="object"?r:{},o=n.workflow_mode==="fast_track"?"fast_track":"standard";return f`
    <div class="detail-section-label">실행 설정 (수정 가능)</div>
    ${Wt("orchestration_model","orchestration_model",Gt(Kr,mr("orchestration_model",s)),n.orchestration_model||"",!1,e)}
    ${Wt("orchestration_effort","orchestration_effort",Gt(Xr,mr("orchestration_effort",s)),n.orchestration_effort||"",!1,e)}
    ${Wt("review_model","review_model",Gt(Qr,mr("review_model",s)),n.review_model||"",!1,e)}
    ${Wt("impl_model","impl_model",Gt(Jr,mr("impl_model",s)),n.impl_model||"",!1,e)}
    ${Wt("workflow_mode","workflow_mode",Gt(Bi),o,n.workflow_mode==="fast_track",e)}
  `}var{entries:Ps,setPrototypeOf:Cs,isFrozen:qi,getPrototypeOf:zi,getOwnPropertyDescriptor:Ui}=Object,{freeze:ze,seal:Qe,create:ln}=Object,{apply:cn,construct:dn}=typeof Reflect<"u"&&Reflect;ze||(ze=function(e){return e});Qe||(Qe=function(e){return e});cn||(cn=function(e,r){for(var n=arguments.length,s=new Array(n>2?n-2:0),o=2;o<n;o++)s[o-2]=arguments[o];return e.apply(r,s)});dn||(dn=function(e){for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return new e(...n)});var gr=Ue(Array.prototype.forEach),Hi=Ue(Array.prototype.lastIndexOf),Rs=Ue(Array.prototype.pop),jt=Ue(Array.prototype.push),Wi=Ue(Array.prototype.splice),_r=Ue(String.prototype.toLowerCase),tn=Ue(String.prototype.toString),rn=Ue(String.prototype.match),Yt=Ue(String.prototype.replace),Gi=Ue(String.prototype.indexOf),ji=Ue(String.prototype.trim),tt=Ue(Object.prototype.hasOwnProperty),qe=Ue(RegExp.prototype.test),Vt=Yi(TypeError);function Ue(t){return function(e){e instanceof RegExp&&(e.lastIndex=0);for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return cn(t,e,n)}}function Yi(t){return function(){for(var e=arguments.length,r=new Array(e),n=0;n<e;n++)r[n]=arguments[n];return dn(t,r)}}function ne(t,e){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:_r;Cs&&Cs(t,null);let n=e.length;for(;n--;){let s=e[n];if(typeof s=="string"){let o=r(s);o!==s&&(qi(e)||(e[n]=o),s=o)}t[s]=!0}return t}function Vi(t){for(let e=0;e<t.length;e++)tt(t,e)||(t[e]=null);return t}function dt(t){let e=ln(null);for(let[r,n]of Ps(t))tt(t,r)&&(Array.isArray(n)?e[r]=Vi(n):n&&typeof n=="object"&&n.constructor===Object?e[r]=dt(n):e[r]=n);return e}function Zt(t,e){for(;t!==null;){let n=Ui(t,e);if(n){if(n.get)return Ue(n.get);if(typeof n.value=="function")return Ue(n.value)}t=zi(t)}function r(){return null}return r}var Ls=ze(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),nn=ze(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),sn=ze(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Zi=ze(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),on=ze(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Ki=ze(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Is=ze(["#text"]),Ds=ze(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),an=ze(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Os=ze(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),br=ze(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Xi=Qe(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Qi=Qe(/<%[\w\W]*|[\w\W]*%>/gm),Ji=Qe(/\$\{[\w\W]*/gm),ea=Qe(/^data-[\-\w.\u00B7-\uFFFF]+$/),ta=Qe(/^aria-[\-\w]+$/),Fs=Qe(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),ra=Qe(/^(?:\w+script|data):/i),na=Qe(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Bs=Qe(/^html$/i),sa=Qe(/^[a-z][.\w]*(-[.\w]+)+$/i),Ms=Object.freeze({__proto__:null,ARIA_ATTR:ta,ATTR_WHITESPACE:na,CUSTOM_ELEMENT:sa,DATA_ATTR:ea,DOCTYPE_NAME:Bs,ERB_EXPR:Qi,IS_ALLOWED_URI:Fs,IS_SCRIPT_OR_DATA:ra,MUSTACHE_EXPR:Xi,TMPLIT_EXPR:Ji}),Kt={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},oa=function(){return typeof window>"u"?null:window},ia=function(e,r){if(typeof e!="object"||typeof e.createPolicy!="function")return null;let n=null,s="data-tt-policy-suffix";r&&r.hasAttribute(s)&&(n=r.getAttribute(s));let o="dompurify"+(n?"#"+n:"");try{return e.createPolicy(o,{createHTML(i){return i},createScriptURL(i){return i}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},Ns=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function qs(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:oa(),e=W=>qs(W);if(e.version="3.3.0",e.removed=[],!t||!t.document||t.document.nodeType!==Kt.document||!t.Element)return e.isSupported=!1,e;let{document:r}=t,n=r,s=n.currentScript,{DocumentFragment:o,HTMLTemplateElement:i,Node:l,Element:a,NodeFilter:c,NamedNodeMap:p=t.NamedNodeMap||t.MozNamedAttrMap,HTMLFormElement:h,DOMParser:b,trustedTypes:$}=t,v=a.prototype,C=Zt(v,"cloneNode"),N=Zt(v,"remove"),M=Zt(v,"nextSibling"),F=Zt(v,"childNodes"),B=Zt(v,"parentNode");if(typeof i=="function"){let W=r.createElement("template");W.content&&W.content.ownerDocument&&(r=W.content.ownerDocument)}let I,S="",{implementation:x,createNodeIterator:w,createDocumentFragment:_,getElementsByTagName:z}=r,{importNode:Y}=n,Q=Ns();e.isSupported=typeof Ps=="function"&&typeof B=="function"&&x&&x.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:J,ERB_EXPR:Ie,TMPLIT_EXPR:Me,DATA_ATTR:Te,ARIA_ATTR:Ke,IS_SCRIPT_OR_DATA:We,ATTR_WHITESPACE:ve,CUSTOM_ELEMENT:Se}=Ms,{IS_ALLOWED_URI:Ve}=Ms,me=null,st=ne({},[...Ls,...nn,...sn,...on,...Is]),oe=null,Ge=ne({},[...Ds,...an,...Os,...br]),ie=Object.seal(ln(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Ne=null,Xe=null,Ae=Object.seal(ln(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),Ee=!0,_e=!0,Be=!1,Ze=!0,Ce=!1,y=!0,k=!1,U=!1,ee=!1,ue=!1,ge=!1,le=!1,ye=!0,se=!1,te="user-content-",Pe=!0,De=!1,Re={},T=null,D=ne({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),Z=null,j=ne({},["audio","video","img","source","image","track"]),P=null,g=ne({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),E="http://www.w3.org/1998/Math/MathML",A="http://www.w3.org/2000/svg",R="http://www.w3.org/1999/xhtml",K=R,ce=!1,H=null,Le=ne({},[E,A,R],tn),it=ne({},["mi","mo","mn","ms","mtext"]),at=ne({},["annotation-xml"]),St=ne({},["title","style","font","a","script"]),Je=null,O=["application/xhtml+xml","text/html"],pe="text/html",u=null,m=null,V=r.createElement("form"),G=function(d){return d instanceof RegExp||d instanceof Function},re=function(){let d=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(m&&m===d)){if((!d||typeof d!="object")&&(d={}),d=dt(d),Je=O.indexOf(d.PARSER_MEDIA_TYPE)===-1?pe:d.PARSER_MEDIA_TYPE,u=Je==="application/xhtml+xml"?tn:_r,me=tt(d,"ALLOWED_TAGS")?ne({},d.ALLOWED_TAGS,u):st,oe=tt(d,"ALLOWED_ATTR")?ne({},d.ALLOWED_ATTR,u):Ge,H=tt(d,"ALLOWED_NAMESPACES")?ne({},d.ALLOWED_NAMESPACES,tn):Le,P=tt(d,"ADD_URI_SAFE_ATTR")?ne(dt(g),d.ADD_URI_SAFE_ATTR,u):g,Z=tt(d,"ADD_DATA_URI_TAGS")?ne(dt(j),d.ADD_DATA_URI_TAGS,u):j,T=tt(d,"FORBID_CONTENTS")?ne({},d.FORBID_CONTENTS,u):D,Ne=tt(d,"FORBID_TAGS")?ne({},d.FORBID_TAGS,u):dt({}),Xe=tt(d,"FORBID_ATTR")?ne({},d.FORBID_ATTR,u):dt({}),Re=tt(d,"USE_PROFILES")?d.USE_PROFILES:!1,Ee=d.ALLOW_ARIA_ATTR!==!1,_e=d.ALLOW_DATA_ATTR!==!1,Be=d.ALLOW_UNKNOWN_PROTOCOLS||!1,Ze=d.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Ce=d.SAFE_FOR_TEMPLATES||!1,y=d.SAFE_FOR_XML!==!1,k=d.WHOLE_DOCUMENT||!1,ue=d.RETURN_DOM||!1,ge=d.RETURN_DOM_FRAGMENT||!1,le=d.RETURN_TRUSTED_TYPE||!1,ee=d.FORCE_BODY||!1,ye=d.SANITIZE_DOM!==!1,se=d.SANITIZE_NAMED_PROPS||!1,Pe=d.KEEP_CONTENT!==!1,De=d.IN_PLACE||!1,Ve=d.ALLOWED_URI_REGEXP||Fs,K=d.NAMESPACE||R,it=d.MATHML_TEXT_INTEGRATION_POINTS||it,at=d.HTML_INTEGRATION_POINTS||at,ie=d.CUSTOM_ELEMENT_HANDLING||{},d.CUSTOM_ELEMENT_HANDLING&&G(d.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(ie.tagNameCheck=d.CUSTOM_ELEMENT_HANDLING.tagNameCheck),d.CUSTOM_ELEMENT_HANDLING&&G(d.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(ie.attributeNameCheck=d.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),d.CUSTOM_ELEMENT_HANDLING&&typeof d.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(ie.allowCustomizedBuiltInElements=d.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Ce&&(_e=!1),ge&&(ue=!0),Re&&(me=ne({},Is),oe=[],Re.html===!0&&(ne(me,Ls),ne(oe,Ds)),Re.svg===!0&&(ne(me,nn),ne(oe,an),ne(oe,br)),Re.svgFilters===!0&&(ne(me,sn),ne(oe,an),ne(oe,br)),Re.mathMl===!0&&(ne(me,on),ne(oe,Os),ne(oe,br))),d.ADD_TAGS&&(typeof d.ADD_TAGS=="function"?Ae.tagCheck=d.ADD_TAGS:(me===st&&(me=dt(me)),ne(me,d.ADD_TAGS,u))),d.ADD_ATTR&&(typeof d.ADD_ATTR=="function"?Ae.attributeCheck=d.ADD_ATTR:(oe===Ge&&(oe=dt(oe)),ne(oe,d.ADD_ATTR,u))),d.ADD_URI_SAFE_ATTR&&ne(P,d.ADD_URI_SAFE_ATTR,u),d.FORBID_CONTENTS&&(T===D&&(T=dt(T)),ne(T,d.FORBID_CONTENTS,u)),Pe&&(me["#text"]=!0),k&&ne(me,["html","head","body"]),me.table&&(ne(me,["tbody"]),delete Ne.tbody),d.TRUSTED_TYPES_POLICY){if(typeof d.TRUSTED_TYPES_POLICY.createHTML!="function")throw Vt('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof d.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Vt('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');I=d.TRUSTED_TYPES_POLICY,S=I.createHTML("")}else I===void 0&&(I=ia($,s)),I!==null&&typeof S=="string"&&(S=I.createHTML(""));ze&&ze(d),m=d}},we=ne({},[...nn,...sn,...Zi]),nr=ne({},[...on,...Ki]),Do=function(d){let L=B(d);(!L||!L.tagName)&&(L={namespaceURI:K,tagName:"template"});let q=_r(d.tagName),be=_r(L.tagName);return H[d.namespaceURI]?d.namespaceURI===A?L.namespaceURI===R?q==="svg":L.namespaceURI===E?q==="svg"&&(be==="annotation-xml"||it[be]):!!we[q]:d.namespaceURI===E?L.namespaceURI===R?q==="math":L.namespaceURI===A?q==="math"&&at[be]:!!nr[q]:d.namespaceURI===R?L.namespaceURI===A&&!at[be]||L.namespaceURI===E&&!it[be]?!1:!nr[q]&&(St[q]||!we[q]):!!(Je==="application/xhtml+xml"&&H[d.namespaceURI]):!1},ot=function(d){jt(e.removed,{element:d});try{B(d).removeChild(d)}catch{N(d)}},mt=function(d,L){try{jt(e.removed,{attribute:L.getAttributeNode(d),from:L})}catch{jt(e.removed,{attribute:null,from:L})}if(L.removeAttribute(d),d==="is")if(ue||ge)try{ot(L)}catch{}else try{L.setAttribute(d,"")}catch{}},Tn=function(d){let L=null,q=null;if(ee)d="<remove></remove>"+d;else{let xe=rn(d,/^[\r\n\t ]+/);q=xe&&xe[0]}Je==="application/xhtml+xml"&&K===R&&(d='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+d+"</body></html>");let be=I?I.createHTML(d):d;if(K===R)try{L=new b().parseFromString(be,Je)}catch{}if(!L||!L.documentElement){L=x.createDocument(K,"template",null);try{L.documentElement.innerHTML=ce?S:be}catch{}}let Fe=L.body||L.documentElement;return d&&q&&Fe.insertBefore(r.createTextNode(q),Fe.childNodes[0]||null),K===R?z.call(L,k?"html":"body")[0]:k?L.documentElement:Fe},En=function(d){return w.call(d.ownerDocument||d,d,c.SHOW_ELEMENT|c.SHOW_COMMENT|c.SHOW_TEXT|c.SHOW_PROCESSING_INSTRUCTION|c.SHOW_CDATA_SECTION,null)},Er=function(d){return d instanceof h&&(typeof d.nodeName!="string"||typeof d.textContent!="string"||typeof d.removeChild!="function"||!(d.attributes instanceof p)||typeof d.removeAttribute!="function"||typeof d.setAttribute!="function"||typeof d.namespaceURI!="string"||typeof d.insertBefore!="function"||typeof d.hasChildNodes!="function")},Cn=function(d){return typeof l=="function"&&d instanceof l};function lt(W,d,L){gr(W,q=>{q.call(e,d,L,m)})}let Rn=function(d){let L=null;if(lt(Q.beforeSanitizeElements,d,null),Er(d))return ot(d),!0;let q=u(d.nodeName);if(lt(Q.uponSanitizeElement,d,{tagName:q,allowedTags:me}),y&&d.hasChildNodes()&&!Cn(d.firstElementChild)&&qe(/<[/\w!]/g,d.innerHTML)&&qe(/<[/\w!]/g,d.textContent)||d.nodeType===Kt.progressingInstruction||y&&d.nodeType===Kt.comment&&qe(/<[/\w]/g,d.data))return ot(d),!0;if(!(Ae.tagCheck instanceof Function&&Ae.tagCheck(q))&&(!me[q]||Ne[q])){if(!Ne[q]&&In(q)&&(ie.tagNameCheck instanceof RegExp&&qe(ie.tagNameCheck,q)||ie.tagNameCheck instanceof Function&&ie.tagNameCheck(q)))return!1;if(Pe&&!T[q]){let be=B(d)||d.parentNode,Fe=F(d)||d.childNodes;if(Fe&&be){let xe=Fe.length;for(let je=xe-1;je>=0;--je){let ct=C(Fe[je],!0);ct.__removalCount=(d.__removalCount||0)+1,be.insertBefore(ct,M(d))}}}return ot(d),!0}return d instanceof a&&!Do(d)||(q==="noscript"||q==="noembed"||q==="noframes")&&qe(/<\/no(script|embed|frames)/i,d.innerHTML)?(ot(d),!0):(Ce&&d.nodeType===Kt.text&&(L=d.textContent,gr([J,Ie,Me],be=>{L=Yt(L,be," ")}),d.textContent!==L&&(jt(e.removed,{element:d.cloneNode()}),d.textContent=L)),lt(Q.afterSanitizeElements,d,null),!1)},Ln=function(d,L,q){if(ye&&(L==="id"||L==="name")&&(q in r||q in V))return!1;if(!(_e&&!Xe[L]&&qe(Te,L))){if(!(Ee&&qe(Ke,L))){if(!(Ae.attributeCheck instanceof Function&&Ae.attributeCheck(L,d))){if(!oe[L]||Xe[L]){if(!(In(d)&&(ie.tagNameCheck instanceof RegExp&&qe(ie.tagNameCheck,d)||ie.tagNameCheck instanceof Function&&ie.tagNameCheck(d))&&(ie.attributeNameCheck instanceof RegExp&&qe(ie.attributeNameCheck,L)||ie.attributeNameCheck instanceof Function&&ie.attributeNameCheck(L,d))||L==="is"&&ie.allowCustomizedBuiltInElements&&(ie.tagNameCheck instanceof RegExp&&qe(ie.tagNameCheck,q)||ie.tagNameCheck instanceof Function&&ie.tagNameCheck(q))))return!1}else if(!P[L]){if(!qe(Ve,Yt(q,ve,""))){if(!((L==="src"||L==="xlink:href"||L==="href")&&d!=="script"&&Gi(q,"data:")===0&&Z[d])){if(!(Be&&!qe(We,Yt(q,ve,"")))){if(q)return!1}}}}}}}return!0},In=function(d){return d!=="annotation-xml"&&rn(d,Se)},Dn=function(d){lt(Q.beforeSanitizeAttributes,d,null);let{attributes:L}=d;if(!L||Er(d))return;let q={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:oe,forceKeepAttr:void 0},be=L.length;for(;be--;){let Fe=L[be],{name:xe,namespaceURI:je,value:ct}=Fe,At=u(xe),Cr=ct,Oe=xe==="value"?Cr:ji(Cr);if(q.attrName=At,q.attrValue=Oe,q.keepAttr=!0,q.forceKeepAttr=void 0,lt(Q.uponSanitizeAttribute,d,q),Oe=q.attrValue,se&&(At==="id"||At==="name")&&(mt(xe,d),Oe=te+Oe),y&&qe(/((--!?|])>)|<\/(style|title|textarea)/i,Oe)){mt(xe,d);continue}if(At==="attributename"&&rn(Oe,"href")){mt(xe,d);continue}if(q.forceKeepAttr)continue;if(!q.keepAttr){mt(xe,d);continue}if(!Ze&&qe(/\/>/i,Oe)){mt(xe,d);continue}Ce&&gr([J,Ie,Me],Mn=>{Oe=Yt(Oe,Mn," ")});let On=u(d.nodeName);if(!Ln(On,At,Oe)){mt(xe,d);continue}if(I&&typeof $=="object"&&typeof $.getAttributeType=="function"&&!je)switch($.getAttributeType(On,At)){case"TrustedHTML":{Oe=I.createHTML(Oe);break}case"TrustedScriptURL":{Oe=I.createScriptURL(Oe);break}}if(Oe!==Cr)try{je?d.setAttributeNS(je,xe,Oe):d.setAttribute(xe,Oe),Er(d)?ot(d):Rs(e.removed)}catch{mt(xe,d)}}lt(Q.afterSanitizeAttributes,d,null)},Oo=function W(d){let L=null,q=En(d);for(lt(Q.beforeSanitizeShadowDOM,d,null);L=q.nextNode();)lt(Q.uponSanitizeShadowNode,L,null),Rn(L),Dn(L),L.content instanceof o&&W(L.content);lt(Q.afterSanitizeShadowDOM,d,null)};return e.sanitize=function(W){let d=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},L=null,q=null,be=null,Fe=null;if(ce=!W,ce&&(W="<!-->"),typeof W!="string"&&!Cn(W))if(typeof W.toString=="function"){if(W=W.toString(),typeof W!="string")throw Vt("dirty is not a string, aborting")}else throw Vt("toString is not a function");if(!e.isSupported)return W;if(U||re(d),e.removed=[],typeof W=="string"&&(De=!1),De){if(W.nodeName){let ct=u(W.nodeName);if(!me[ct]||Ne[ct])throw Vt("root node is forbidden and cannot be sanitized in-place")}}else if(W instanceof l)L=Tn("<!---->"),q=L.ownerDocument.importNode(W,!0),q.nodeType===Kt.element&&q.nodeName==="BODY"||q.nodeName==="HTML"?L=q:L.appendChild(q);else{if(!ue&&!Ce&&!k&&W.indexOf("<")===-1)return I&&le?I.createHTML(W):W;if(L=Tn(W),!L)return ue?null:le?S:""}L&&ee&&ot(L.firstChild);let xe=En(De?W:L);for(;be=xe.nextNode();)Rn(be),Dn(be),be.content instanceof o&&Oo(be.content);if(De)return W;if(ue){if(ge)for(Fe=_.call(L.ownerDocument);L.firstChild;)Fe.appendChild(L.firstChild);else Fe=L;return(oe.shadowroot||oe.shadowrootmode)&&(Fe=Y.call(n,Fe,!0)),Fe}let je=k?L.outerHTML:L.innerHTML;return k&&me["!doctype"]&&L.ownerDocument&&L.ownerDocument.doctype&&L.ownerDocument.doctype.name&&qe(Bs,L.ownerDocument.doctype.name)&&(je="<!DOCTYPE "+L.ownerDocument.doctype.name+`>
`+je),Ce&&gr([J,Ie,Me],ct=>{je=Yt(je,ct," ")}),I&&le?I.createHTML(je):je},e.setConfig=function(){let W=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};re(W),U=!0},e.clearConfig=function(){m=null,U=!1},e.isValidAttribute=function(W,d,L){m||re({});let q=u(W),be=u(d);return Ln(q,be,L)},e.addHook=function(W,d){typeof d=="function"&&jt(Q[W],d)},e.removeHook=function(W,d){if(d!==void 0){let L=Hi(Q[W],d);return L===-1?void 0:Wi(Q[W],L,1)[0]}return Rs(Q[W])},e.removeHooks=function(W){Q[W]=[]},e.removeAllHooks=function(){Q=Ns()},e}var zs=qs();var Us={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Hs=t=>(...e)=>({_$litDirective$:t,values:e}),yr=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,r,n){this._$Ct=e,this._$AM=r,this._$Ci=n}_$AS(e,r){return this.update(e,r)}update(e,r){return this.render(...r)}};var Xt=class extends yr{constructor(e){if(super(e),this.it=$e,e.type!==Us.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===$e||e==null)return this._t=void 0,this.it=e;if(e===yt)return e;if(typeof e!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;let r=[e];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}};Xt.directiveName="unsafeHTML",Xt.resultType=1;var Ws=Hs(Xt);function hn(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var xt=hn();function Xs(t){xt=t}var tr={exec:()=>null};function ae(t,e=""){let r=typeof t=="string"?t:t.source,n={replace:(s,o)=>{let i=typeof o=="string"?o:o.source;return i=i.replace(He.caret,"$1"),r=r.replace(s,i),n},getRegex:()=>new RegExp(r,e)};return n}var aa=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),He={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:t=>new RegExp(`^( {0,3}${t})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}#`),htmlBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}<(?:[a-z].*>|!--)`,"i")},la=/^(?:[ \t]*(?:\n|$))+/,ca=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,da=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,rr=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,ua=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,mn=/(?:[*+-]|\d{1,9}[.)])/,Qs=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Js=ae(Qs).replace(/bull/g,mn).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),pa=ae(Qs).replace(/bull/g,mn).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),gn=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,fa=/^[^\n]+/,bn=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,ha=ae(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",bn).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),ma=ae(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,mn).getRegex(),Sr="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",_n=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,ga=ae("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",_n).replace("tag",Sr).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),eo=ae(gn).replace("hr",rr).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Sr).getRegex(),ba=ae(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",eo).getRegex(),yn={blockquote:ba,code:ca,def:ha,fences:da,heading:ua,hr:rr,html:ga,lheading:Js,list:ma,newline:la,paragraph:eo,table:tr,text:fa},Gs=ae("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",rr).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Sr).getRegex(),_a={...yn,lheading:pa,table:Gs,paragraph:ae(gn).replace("hr",rr).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Gs).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Sr).getRegex()},ya={...yn,html:ae(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",_n).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:tr,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:ae(gn).replace("hr",rr).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Js).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},wa=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,ka=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,to=/^( {2,}|\\)\n(?!\s*$)/,va=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Ar=/[\p{P}\p{S}]/u,wn=/[\s\p{P}\p{S}]/u,ro=/[^\s\p{P}\p{S}]/u,$a=ae(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,wn).getRegex(),no=/(?!~)[\p{P}\p{S}]/u,xa=/(?!~)[\s\p{P}\p{S}]/u,Sa=/(?:[^\s\p{P}\p{S}]|~)/u,Aa=ae(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",aa?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),so=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,Ta=ae(so,"u").replace(/punct/g,Ar).getRegex(),Ea=ae(so,"u").replace(/punct/g,no).getRegex(),oo="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Ca=ae(oo,"gu").replace(/notPunctSpace/g,ro).replace(/punctSpace/g,wn).replace(/punct/g,Ar).getRegex(),Ra=ae(oo,"gu").replace(/notPunctSpace/g,Sa).replace(/punctSpace/g,xa).replace(/punct/g,no).getRegex(),La=ae("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,ro).replace(/punctSpace/g,wn).replace(/punct/g,Ar).getRegex(),Ia=ae(/\\(punct)/,"gu").replace(/punct/g,Ar).getRegex(),Da=ae(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Oa=ae(_n).replace("(?:-->|$)","-->").getRegex(),Ma=ae("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Oa).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),vr=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,Na=ae(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",vr).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),io=ae(/^!?\[(label)\]\[(ref)\]/).replace("label",vr).replace("ref",bn).getRegex(),ao=ae(/^!?\[(ref)\](?:\[\])?/).replace("ref",bn).getRegex(),Pa=ae("reflink|nolink(?!\\()","g").replace("reflink",io).replace("nolink",ao).getRegex(),js=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,kn={_backpedal:tr,anyPunctuation:Ia,autolink:Da,blockSkip:Aa,br:to,code:ka,del:tr,emStrongLDelim:Ta,emStrongRDelimAst:Ca,emStrongRDelimUnd:La,escape:wa,link:Na,nolink:ao,punctuation:$a,reflink:io,reflinkSearch:Pa,tag:Ma,text:va,url:tr},Fa={...kn,link:ae(/^!?\[(label)\]\((.*?)\)/).replace("label",vr).getRegex(),reflink:ae(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",vr).getRegex()},un={...kn,emStrongRDelimAst:Ra,emStrongLDelim:Ea,url:ae(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",js).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:ae(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",js).getRegex()},Ba={...un,br:ae(to).replace("{2,}","*").getRegex(),text:ae(un.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},wr={normal:yn,gfm:_a,pedantic:ya},Qt={normal:kn,gfm:un,breaks:Ba,pedantic:Fa},qa={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Ys=t=>qa[t];function ut(t,e){if(e){if(He.escapeTest.test(t))return t.replace(He.escapeReplace,Ys)}else if(He.escapeTestNoEncode.test(t))return t.replace(He.escapeReplaceNoEncode,Ys);return t}function Vs(t){try{t=encodeURI(t).replace(He.percentDecode,"%")}catch{return null}return t}function Zs(t,e){let r=t.replace(He.findPipe,(o,i,l)=>{let a=!1,c=i;for(;--c>=0&&l[c]==="\\";)a=!a;return a?"|":" |"}),n=r.split(He.splitPipe),s=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),e)if(n.length>e)n.splice(e);else for(;n.length<e;)n.push("");for(;s<n.length;s++)n[s]=n[s].trim().replace(He.slashPipe,"|");return n}function Jt(t,e,r){let n=t.length;if(n===0)return"";let s=0;for(;s<n;){let o=t.charAt(n-s-1);if(o===e&&!r)s++;else if(o!==e&&r)s++;else break}return t.slice(0,n-s)}function za(t,e){if(t.indexOf(e[1])===-1)return-1;let r=0;for(let n=0;n<t.length;n++)if(t[n]==="\\")n++;else if(t[n]===e[0])r++;else if(t[n]===e[1]&&(r--,r<0))return n;return r>0?-2:-1}function Ks(t,e,r,n,s){let o=e.href,i=e.title||null,l=t[1].replace(s.other.outputLinkReplace,"$1");n.state.inLink=!0;let a={type:t[0].charAt(0)==="!"?"image":"link",raw:r,href:o,title:i,text:l,tokens:n.inlineTokens(l)};return n.state.inLink=!1,a}function Ua(t,e,r){let n=t.match(r.other.indentCodeCompensation);if(n===null)return e;let s=n[1];return e.split(`
`).map(o=>{let i=o.match(r.other.beginningSpace);if(i===null)return o;let[l]=i;return l.length>=s.length?o.slice(s.length):o}).join(`
`)}var $r=class{constructor(t){he(this,"options");he(this,"rules");he(this,"lexer");this.options=t||xt}space(t){let e=this.rules.block.newline.exec(t);if(e&&e[0].length>0)return{type:"space",raw:e[0]}}code(t){let e=this.rules.block.code.exec(t);if(e){let r=e[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:e[0],codeBlockStyle:"indented",text:this.options.pedantic?r:Jt(r,`
`)}}}fences(t){let e=this.rules.block.fences.exec(t);if(e){let r=e[0],n=Ua(r,e[3]||"",this.rules);return{type:"code",raw:r,lang:e[2]?e[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):e[2],text:n}}}heading(t){let e=this.rules.block.heading.exec(t);if(e){let r=e[2].trim();if(this.rules.other.endingHash.test(r)){let n=Jt(r,"#");(this.options.pedantic||!n||this.rules.other.endingSpaceChar.test(n))&&(r=n.trim())}return{type:"heading",raw:e[0],depth:e[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(t){let e=this.rules.block.hr.exec(t);if(e)return{type:"hr",raw:Jt(e[0],`
`)}}blockquote(t){let e=this.rules.block.blockquote.exec(t);if(e){let r=Jt(e[0],`
`).split(`
`),n="",s="",o=[];for(;r.length>0;){let i=!1,l=[],a;for(a=0;a<r.length;a++)if(this.rules.other.blockquoteStart.test(r[a]))l.push(r[a]),i=!0;else if(!i)l.push(r[a]);else break;r=r.slice(a);let c=l.join(`
`),p=c.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");n=n?`${n}
${c}`:c,s=s?`${s}
${p}`:p;let h=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(p,o,!0),this.lexer.state.top=h,r.length===0)break;let b=o.at(-1);if(b?.type==="code")break;if(b?.type==="blockquote"){let $=b,v=$.raw+`
`+r.join(`
`),C=this.blockquote(v);o[o.length-1]=C,n=n.substring(0,n.length-$.raw.length)+C.raw,s=s.substring(0,s.length-$.text.length)+C.text;break}else if(b?.type==="list"){let $=b,v=$.raw+`
`+r.join(`
`),C=this.list(v);o[o.length-1]=C,n=n.substring(0,n.length-b.raw.length)+C.raw,s=s.substring(0,s.length-$.raw.length)+C.raw,r=v.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:n,tokens:o,text:s}}}list(t){let e=this.rules.block.list.exec(t);if(e){let r=e[1].trim(),n=r.length>1,s={type:"list",raw:"",ordered:n,start:n?+r.slice(0,-1):"",loose:!1,items:[]};r=n?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=n?r:"[*+-]");let o=this.rules.other.listItemRegex(r),i=!1;for(;t;){let a=!1,c="",p="";if(!(e=o.exec(t))||this.rules.block.hr.test(t))break;c=e[0],t=t.substring(c.length);let h=e[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,C=>" ".repeat(3*C.length)),b=t.split(`
`,1)[0],$=!h.trim(),v=0;if(this.options.pedantic?(v=2,p=h.trimStart()):$?v=e[1].length+1:(v=e[2].search(this.rules.other.nonSpaceChar),v=v>4?1:v,p=h.slice(v),v+=e[1].length),$&&this.rules.other.blankLine.test(b)&&(c+=b+`
`,t=t.substring(b.length+1),a=!0),!a){let C=this.rules.other.nextBulletRegex(v),N=this.rules.other.hrRegex(v),M=this.rules.other.fencesBeginRegex(v),F=this.rules.other.headingBeginRegex(v),B=this.rules.other.htmlBeginRegex(v);for(;t;){let I=t.split(`
`,1)[0],S;if(b=I,this.options.pedantic?(b=b.replace(this.rules.other.listReplaceNesting,"  "),S=b):S=b.replace(this.rules.other.tabCharGlobal,"    "),M.test(b)||F.test(b)||B.test(b)||C.test(b)||N.test(b))break;if(S.search(this.rules.other.nonSpaceChar)>=v||!b.trim())p+=`
`+S.slice(v);else{if($||h.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||M.test(h)||F.test(h)||N.test(h))break;p+=`
`+b}!$&&!b.trim()&&($=!0),c+=I+`
`,t=t.substring(I.length+1),h=S.slice(v)}}s.loose||(i?s.loose=!0:this.rules.other.doubleBlankLine.test(c)&&(i=!0)),s.items.push({type:"list_item",raw:c,task:!!this.options.gfm&&this.rules.other.listIsTask.test(p),loose:!1,text:p,tokens:[]}),s.raw+=c}let l=s.items.at(-1);if(l)l.raw=l.raw.trimEnd(),l.text=l.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let a of s.items){if(this.lexer.state.top=!1,a.tokens=this.lexer.blockTokens(a.text,[]),a.task){if(a.text=a.text.replace(this.rules.other.listReplaceTask,""),a.tokens[0]?.type==="text"||a.tokens[0]?.type==="paragraph"){a.tokens[0].raw=a.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),a.tokens[0].text=a.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let p=this.lexer.inlineQueue.length-1;p>=0;p--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[p].src)){this.lexer.inlineQueue[p].src=this.lexer.inlineQueue[p].src.replace(this.rules.other.listReplaceTask,"");break}}let c=this.rules.other.listTaskCheckbox.exec(a.raw);if(c){let p={type:"checkbox",raw:c[0]+" ",checked:c[0]!=="[ ]"};a.checked=p.checked,s.loose?a.tokens[0]&&["paragraph","text"].includes(a.tokens[0].type)&&"tokens"in a.tokens[0]&&a.tokens[0].tokens?(a.tokens[0].raw=p.raw+a.tokens[0].raw,a.tokens[0].text=p.raw+a.tokens[0].text,a.tokens[0].tokens.unshift(p)):a.tokens.unshift({type:"paragraph",raw:p.raw,text:p.raw,tokens:[p]}):a.tokens.unshift(p)}}if(!s.loose){let c=a.tokens.filter(h=>h.type==="space"),p=c.length>0&&c.some(h=>this.rules.other.anyLine.test(h.raw));s.loose=p}}if(s.loose)for(let a of s.items){a.loose=!0;for(let c of a.tokens)c.type==="text"&&(c.type="paragraph")}return s}}html(t){let e=this.rules.block.html.exec(t);if(e)return{type:"html",block:!0,raw:e[0],pre:e[1]==="pre"||e[1]==="script"||e[1]==="style",text:e[0]}}def(t){let e=this.rules.block.def.exec(t);if(e){let r=e[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),n=e[2]?e[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=e[3]?e[3].substring(1,e[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):e[3];return{type:"def",tag:r,raw:e[0],href:n,title:s}}}table(t){let e=this.rules.block.table.exec(t);if(!e||!this.rules.other.tableDelimiter.test(e[2]))return;let r=Zs(e[1]),n=e[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=e[3]?.trim()?e[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:e[0],header:[],align:[],rows:[]};if(r.length===n.length){for(let i of n)this.rules.other.tableAlignRight.test(i)?o.align.push("right"):this.rules.other.tableAlignCenter.test(i)?o.align.push("center"):this.rules.other.tableAlignLeft.test(i)?o.align.push("left"):o.align.push(null);for(let i=0;i<r.length;i++)o.header.push({text:r[i],tokens:this.lexer.inline(r[i]),header:!0,align:o.align[i]});for(let i of s)o.rows.push(Zs(i,o.header.length).map((l,a)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:o.align[a]})));return o}}lheading(t){let e=this.rules.block.lheading.exec(t);if(e)return{type:"heading",raw:e[0],depth:e[2].charAt(0)==="="?1:2,text:e[1],tokens:this.lexer.inline(e[1])}}paragraph(t){let e=this.rules.block.paragraph.exec(t);if(e){let r=e[1].charAt(e[1].length-1)===`
`?e[1].slice(0,-1):e[1];return{type:"paragraph",raw:e[0],text:r,tokens:this.lexer.inline(r)}}}text(t){let e=this.rules.block.text.exec(t);if(e)return{type:"text",raw:e[0],text:e[0],tokens:this.lexer.inline(e[0])}}escape(t){let e=this.rules.inline.escape.exec(t);if(e)return{type:"escape",raw:e[0],text:e[1]}}tag(t){let e=this.rules.inline.tag.exec(t);if(e)return!this.lexer.state.inLink&&this.rules.other.startATag.test(e[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(e[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(e[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(e[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:e[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:e[0]}}link(t){let e=this.rules.inline.link.exec(t);if(e){let r=e[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;let o=Jt(r.slice(0,-1),"\\");if((r.length-o.length)%2===0)return}else{let o=za(e[2],"()");if(o===-2)return;if(o>-1){let i=(e[0].indexOf("!")===0?5:4)+e[1].length+o;e[2]=e[2].substring(0,o),e[0]=e[0].substring(0,i).trim(),e[3]=""}}let n=e[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(n);o&&(n=o[1],s=o[3])}else s=e[3]?e[3].slice(1,-1):"";return n=n.trim(),this.rules.other.startAngleBracket.test(n)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?n=n.slice(1):n=n.slice(1,-1)),Ks(e,{href:n&&n.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},e[0],this.lexer,this.rules)}}reflink(t,e){let r;if((r=this.rules.inline.reflink.exec(t))||(r=this.rules.inline.nolink.exec(t))){let n=(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=e[n.toLowerCase()];if(!s){let o=r[0].charAt(0);return{type:"text",raw:o,text:o}}return Ks(r,s,r[0],this.lexer,this.rules)}}emStrong(t,e,r=""){let n=this.rules.inline.emStrongLDelim.exec(t);if(!(!n||n[3]&&r.match(this.rules.other.unicodeAlphaNumeric))&&(!(n[1]||n[2])||!r||this.rules.inline.punctuation.exec(r))){let s=[...n[0]].length-1,o,i,l=s,a=0,c=n[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(c.lastIndex=0,e=e.slice(-1*t.length+s);(n=c.exec(e))!=null;){if(o=n[1]||n[2]||n[3]||n[4]||n[5]||n[6],!o)continue;if(i=[...o].length,n[3]||n[4]){l+=i;continue}else if((n[5]||n[6])&&s%3&&!((s+i)%3)){a+=i;continue}if(l-=i,l>0)continue;i=Math.min(i,i+l+a);let p=[...n[0]][0].length,h=t.slice(0,s+n.index+p+i);if(Math.min(s,i)%2){let $=h.slice(1,-1);return{type:"em",raw:h,text:$,tokens:this.lexer.inlineTokens($)}}let b=h.slice(2,-2);return{type:"strong",raw:h,text:b,tokens:this.lexer.inlineTokens(b)}}}}codespan(t){let e=this.rules.inline.code.exec(t);if(e){let r=e[2].replace(this.rules.other.newLineCharGlobal," "),n=this.rules.other.nonSpaceChar.test(r),s=this.rules.other.startingSpaceChar.test(r)&&this.rules.other.endingSpaceChar.test(r);return n&&s&&(r=r.substring(1,r.length-1)),{type:"codespan",raw:e[0],text:r}}}br(t){let e=this.rules.inline.br.exec(t);if(e)return{type:"br",raw:e[0]}}del(t){let e=this.rules.inline.del.exec(t);if(e)return{type:"del",raw:e[0],text:e[2],tokens:this.lexer.inlineTokens(e[2])}}autolink(t){let e=this.rules.inline.autolink.exec(t);if(e){let r,n;return e[2]==="@"?(r=e[1],n="mailto:"+r):(r=e[1],n=r),{type:"link",raw:e[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}url(t){let e;if(e=this.rules.inline.url.exec(t)){let r,n;if(e[2]==="@")r=e[0],n="mailto:"+r;else{let s;do s=e[0],e[0]=this.rules.inline._backpedal.exec(e[0])?.[0]??"";while(s!==e[0]);r=e[0],e[1]==="www."?n="http://"+e[0]:n=e[0]}return{type:"link",raw:e[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(t){let e=this.rules.inline.text.exec(t);if(e){let r=this.lexer.state.inRawBlock;return{type:"text",raw:e[0],text:e[0],escaped:r}}}},rt=class pn{constructor(e){he(this,"tokens");he(this,"options");he(this,"state");he(this,"inlineQueue");he(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=e||xt,this.options.tokenizer=this.options.tokenizer||new $r,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let r={other:He,block:wr.normal,inline:Qt.normal};this.options.pedantic?(r.block=wr.pedantic,r.inline=Qt.pedantic):this.options.gfm&&(r.block=wr.gfm,this.options.breaks?r.inline=Qt.breaks:r.inline=Qt.gfm),this.tokenizer.rules=r}static get rules(){return{block:wr,inline:Qt}}static lex(e,r){return new pn(r).lex(e)}static lexInline(e,r){return new pn(r).inlineTokens(e)}lex(e){e=e.replace(He.carriageReturn,`
`),this.blockTokens(e,this.tokens);for(let r=0;r<this.inlineQueue.length;r++){let n=this.inlineQueue[r];this.inlineTokens(n.src,n.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(e,r=[],n=!1){for(this.options.pedantic&&(e=e.replace(He.tabCharGlobal,"    ").replace(He.spaceLine,""));e;){let s;if(this.options.extensions?.block?.some(i=>(s=i.call({lexer:this},e,r))?(e=e.substring(s.raw.length),r.push(s),!0):!1))continue;if(s=this.tokenizer.space(e)){e=e.substring(s.raw.length);let i=r.at(-1);s.raw.length===1&&i!==void 0?i.raw+=`
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
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):r.push(s);continue}if(e){let i="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(i);break}else throw new Error(i)}}return this.state.top=!0,r}inline(e,r=[]){return this.inlineQueue.push({src:e,tokens:r}),r}inlineTokens(e,r=[]){let n=e,s=null;if(this.tokens.links){let a=Object.keys(this.tokens.links);if(a.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(n))!=null;)a.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(n=n.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(n))!=null;)n=n.slice(0,s.index)+"++"+n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(n))!=null;)o=s[2]?s[2].length:0,n=n.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let i=!1,l="";for(;e;){i||(l=""),i=!1;let a;if(this.options.extensions?.inline?.some(p=>(a=p.call({lexer:this},e,r))?(e=e.substring(a.raw.length),r.push(a),!0):!1))continue;if(a=this.tokenizer.escape(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.tag(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.link(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(a.raw.length);let p=r.at(-1);a.type==="text"&&p?.type==="text"?(p.raw+=a.raw,p.text+=a.text):r.push(a);continue}if(a=this.tokenizer.emStrong(e,n,l)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.codespan(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.br(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.del(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.autolink(e)){e=e.substring(a.raw.length),r.push(a);continue}if(!this.state.inLink&&(a=this.tokenizer.url(e))){e=e.substring(a.raw.length),r.push(a);continue}let c=e;if(this.options.extensions?.startInline){let p=1/0,h=e.slice(1),b;this.options.extensions.startInline.forEach($=>{b=$.call({lexer:this},h),typeof b=="number"&&b>=0&&(p=Math.min(p,b))}),p<1/0&&p>=0&&(c=e.substring(0,p+1))}if(a=this.tokenizer.inlineText(c)){e=e.substring(a.raw.length),a.raw.slice(-1)!=="_"&&(l=a.raw.slice(-1)),i=!0;let p=r.at(-1);p?.type==="text"?(p.raw+=a.raw,p.text+=a.text):r.push(a);continue}if(e){let p="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(p);break}else throw new Error(p)}}return r}},xr=class{constructor(t){he(this,"options");he(this,"parser");this.options=t||xt}space(t){return""}code({text:t,lang:e,escaped:r}){let n=(e||"").match(He.notSpaceStart)?.[0],s=t.replace(He.endingNewline,"")+`
`;return n?'<pre><code class="language-'+ut(n)+'">'+(r?s:ut(s,!0))+`</code></pre>
`:"<pre><code>"+(r?s:ut(s,!0))+`</code></pre>
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
`}strong({tokens:t}){return`<strong>${this.parser.parseInline(t)}</strong>`}em({tokens:t}){return`<em>${this.parser.parseInline(t)}</em>`}codespan({text:t}){return`<code>${ut(t,!0)}</code>`}br(t){return"<br>"}del({tokens:t}){return`<del>${this.parser.parseInline(t)}</del>`}link({href:t,title:e,tokens:r}){let n=this.parser.parseInline(r),s=Vs(t);if(s===null)return n;t=s;let o='<a href="'+t+'"';return e&&(o+=' title="'+ut(e)+'"'),o+=">"+n+"</a>",o}image({href:t,title:e,text:r,tokens:n}){n&&(r=this.parser.parseInline(n,this.parser.textRenderer));let s=Vs(t);if(s===null)return ut(r);t=s;let o=`<img src="${t}" alt="${r}"`;return e&&(o+=` title="${ut(e)}"`),o+=">",o}text(t){return"tokens"in t&&t.tokens?this.parser.parseInline(t.tokens):"escaped"in t&&t.escaped?t.text:ut(t.text)}},vn=class{strong({text:t}){return t}em({text:t}){return t}codespan({text:t}){return t}del({text:t}){return t}html({text:t}){return t}text({text:t}){return t}link({text:t}){return""+t}image({text:t}){return""+t}br(){return""}checkbox({raw:t}){return t}},nt=class fn{constructor(e){he(this,"options");he(this,"renderer");he(this,"textRenderer");this.options=e||xt,this.options.renderer=this.options.renderer||new xr,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new vn}static parse(e,r){return new fn(r).parse(e)}static parseInline(e,r){return new fn(r).parseInline(e)}parse(e){let r="";for(let n=0;n<e.length;n++){let s=e[n];if(this.options.extensions?.renderers?.[s.type]){let i=s,l=this.options.extensions.renderers[i.type].call({parser:this},i);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(i.type)){r+=l||"";continue}}let o=s;switch(o.type){case"space":{r+=this.renderer.space(o);break}case"hr":{r+=this.renderer.hr(o);break}case"heading":{r+=this.renderer.heading(o);break}case"code":{r+=this.renderer.code(o);break}case"table":{r+=this.renderer.table(o);break}case"blockquote":{r+=this.renderer.blockquote(o);break}case"list":{r+=this.renderer.list(o);break}case"checkbox":{r+=this.renderer.checkbox(o);break}case"html":{r+=this.renderer.html(o);break}case"def":{r+=this.renderer.def(o);break}case"paragraph":{r+=this.renderer.paragraph(o);break}case"text":{r+=this.renderer.text(o);break}default:{let i='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return r}parseInline(e,r=this.renderer){let n="";for(let s=0;s<e.length;s++){let o=e[s];if(this.options.extensions?.renderers?.[o.type]){let l=this.options.extensions.renderers[o.type].call({parser:this},o);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){n+=l||"";continue}}let i=o;switch(i.type){case"escape":{n+=r.text(i);break}case"html":{n+=r.html(i);break}case"link":{n+=r.link(i);break}case"image":{n+=r.image(i);break}case"checkbox":{n+=r.checkbox(i);break}case"strong":{n+=r.strong(i);break}case"em":{n+=r.em(i);break}case"codespan":{n+=r.codespan(i);break}case"br":{n+=r.br(i);break}case"del":{n+=r.del(i);break}case"text":{n+=r.text(i);break}default:{let l='Token with "'+i.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return n}},kr,er=(kr=class{constructor(t){he(this,"options");he(this,"block");this.options=t||xt}preprocess(t){return t}postprocess(t){return t}processAllTokens(t){return t}emStrongMask(t){return t}provideLexer(){return this.block?rt.lex:rt.lexInline}provideParser(){return this.block?nt.parse:nt.parseInline}},he(kr,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),he(kr,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),kr),Ha=class{constructor(...t){he(this,"defaults",hn());he(this,"options",this.setOptions);he(this,"parse",this.parseMarkdown(!0));he(this,"parseInline",this.parseMarkdown(!1));he(this,"Parser",nt);he(this,"Renderer",xr);he(this,"TextRenderer",vn);he(this,"Lexer",rt);he(this,"Tokenizer",$r);he(this,"Hooks",er);this.use(...t)}walkTokens(t,e){let r=[];for(let n of t)switch(r=r.concat(e.call(this,n)),n.type){case"table":{let s=n;for(let o of s.header)r=r.concat(this.walkTokens(o.tokens,e));for(let o of s.rows)for(let i of o)r=r.concat(this.walkTokens(i.tokens,e));break}case"list":{let s=n;r=r.concat(this.walkTokens(s.items,e));break}default:{let s=n;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let i=s[o].flat(1/0);r=r.concat(this.walkTokens(i,e))}):s.tokens&&(r=r.concat(this.walkTokens(s.tokens,e)))}}return r}use(...t){let e=this.defaults.extensions||{renderers:{},childTokens:{}};return t.forEach(r=>{let n={...r};if(n.async=this.defaults.async||n.async||!1,r.extensions&&(r.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=e.renderers[s.name];o?e.renderers[s.name]=function(...i){let l=s.renderer.apply(this,i);return l===!1&&(l=o.apply(this,i)),l}:e.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=e[s.level];o?o.unshift(s.tokenizer):e[s.level]=[s.tokenizer],s.start&&(s.level==="block"?e.startBlock?e.startBlock.push(s.start):e.startBlock=[s.start]:s.level==="inline"&&(e.startInline?e.startInline.push(s.start):e.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(e.childTokens[s.name]=s.childTokens)}),n.extensions=e),r.renderer){let s=this.defaults.renderer||new xr(this.defaults);for(let o in r.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let i=o,l=r.renderer[i],a=s[i];s[i]=(...c)=>{let p=l.apply(s,c);return p===!1&&(p=a.apply(s,c)),p||""}}n.renderer=s}if(r.tokenizer){let s=this.defaults.tokenizer||new $r(this.defaults);for(let o in r.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let i=o,l=r.tokenizer[i],a=s[i];s[i]=(...c)=>{let p=l.apply(s,c);return p===!1&&(p=a.apply(s,c)),p}}n.tokenizer=s}if(r.hooks){let s=this.defaults.hooks||new er;for(let o in r.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let i=o,l=r.hooks[i],a=s[i];er.passThroughHooks.has(o)?s[i]=c=>{if(this.defaults.async&&er.passThroughHooksRespectAsync.has(o))return(async()=>{let h=await l.call(s,c);return a.call(s,h)})();let p=l.call(s,c);return a.call(s,p)}:s[i]=(...c)=>{if(this.defaults.async)return(async()=>{let h=await l.apply(s,c);return h===!1&&(h=await a.apply(s,c)),h})();let p=l.apply(s,c);return p===!1&&(p=a.apply(s,c)),p}}n.hooks=s}if(r.walkTokens){let s=this.defaults.walkTokens,o=r.walkTokens;n.walkTokens=function(i){let l=[];return l.push(o.call(this,i)),s&&(l=l.concat(s.call(this,i))),l}}this.defaults={...this.defaults,...n}}),this}setOptions(t){return this.defaults={...this.defaults,...t},this}lexer(t,e){return rt.lex(t,e??this.defaults)}parser(t,e){return nt.parse(t,e??this.defaults)}parseMarkdown(t){return(e,r)=>{let n={...r},s={...this.defaults,...n},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&n.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof e>"u"||e===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof e!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(e)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=t),s.async)return(async()=>{let i=s.hooks?await s.hooks.preprocess(e):e,l=await(s.hooks?await s.hooks.provideLexer():t?rt.lex:rt.lexInline)(i,s),a=s.hooks?await s.hooks.processAllTokens(l):l;s.walkTokens&&await Promise.all(this.walkTokens(a,s.walkTokens));let c=await(s.hooks?await s.hooks.provideParser():t?nt.parse:nt.parseInline)(a,s);return s.hooks?await s.hooks.postprocess(c):c})().catch(o);try{s.hooks&&(e=s.hooks.preprocess(e));let i=(s.hooks?s.hooks.provideLexer():t?rt.lex:rt.lexInline)(e,s);s.hooks&&(i=s.hooks.processAllTokens(i)),s.walkTokens&&this.walkTokens(i,s.walkTokens);let l=(s.hooks?s.hooks.provideParser():t?nt.parse:nt.parseInline)(i,s);return s.hooks&&(l=s.hooks.postprocess(l)),l}catch(i){return o(i)}}}onError(t,e){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,t){let n="<p>An error occurred:</p><pre>"+ut(r.message+"",!0)+"</pre>";return e?Promise.resolve(n):n}if(e)return Promise.reject(r);throw r}}},$t=new Ha;function de(t,e){return $t.parse(t,e)}de.options=de.setOptions=function(t){return $t.setOptions(t),de.defaults=$t.defaults,Xs(de.defaults),de};de.getDefaults=hn;de.defaults=xt;de.use=function(...t){return $t.use(...t),de.defaults=$t.defaults,Xs(de.defaults),de};de.walkTokens=function(t,e){return $t.walkTokens(t,e)};de.parseInline=$t.parseInline;de.Parser=nt;de.parser=nt.parse;de.Renderer=xr;de.TextRenderer=vn;de.Lexer=rt;de.lexer=rt.lex;de.Tokenizer=$r;de.Hooks=er;de.parse=de;var Oc=de.options,Mc=de.setOptions,Nc=de.use,Pc=de.walkTokens,Fc=de.parseInline;var Bc=nt.parse,qc=rt.lex;function lo(t){let e=de.parse(t),r=zs.sanitize(e);return Ws(r)}function Wa(t){return String(t||"").replace(/^docs\/(superpowers\/)?/,"")}function co(t,e){let r=e.getWorkspacePath,n=e.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",i="",l="";function a(v){v.key==="Escape"&&s&&(v.preventDefault(),b())}document.addEventListener("keydown",a);function c(){return s?f`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>b()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${Wa(s)}</span
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
            ${o==="loading"?f`<div class="mv__status">불러오는 중…</div>`:o==="error"?f`<div class="mv__status mv__status--error">
                    ${l||"\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}
                  </div>`:lo(i)}
          </div>
        </div>
      </div>
    `:f``}function p(){fe(c(),t)}async function h(v){s=v,o="loading",i="",l="",p();let C=r?r():"";if(!C){o="error",l="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",p();return}if(!n){o="error",l="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",p();return}let N="/api/doc?workspace="+encodeURIComponent(C)+"&path="+encodeURIComponent(v);try{let M=await n(N),F=await M.json().catch(()=>({}));if(!M.ok||!F||F.ok!==!0){o="error",l="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(F&&F.error||M.status)+")",p();return}i=String(F.content||""),o="ready",p()}catch{o="error",l="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",p()}}function b(){s=null,fe(f``,t)}function $(){document.removeEventListener("keydown",a),b()}return{open:h,close:b,destroy:$}}var Ga={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function ja(t){if(typeof t!="number"||!Number.isFinite(t))return"";let e=new Date(t),r=String(e.getHours()).padStart(2,"0"),n=String(e.getMinutes()).padStart(2,"0");return`${r}:${n}`}function uo(t,e={}){let r=Array.isArray(t)?t:[];if(r.length===0)return f`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let n=new Set;for(let o of r)o&&typeof o.resumed_from=="string"&&o.resumed_from.length>0&&n.add(o.resumed_from);let s=o=>{if(!(o.status==="failed"||o.status==="orphaned"))return"";let l=typeof o.session_id=="string"&&o.session_id.length>0,a=n.has(o.attempt_id),c=typeof o.dismissed_at=="number",p=l&&!a&&!c,h=l?a?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":c?"\uCC98\uB9AC \uC644\uB8CC\uB85C \uB2EB\uC740 attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return f`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${o.attempt_id}
      ?disabled=${!p}
      title=${h}
      @click=${b=>{b.stopPropagation(),p&&e.onResume&&e.onResume(o.attempt_id)}}
    >
      ↻ 이어하기
    </button>`};return f`
    <div class="detail-section-label">세션 이력</div>
    <div class="detail-sessions" data-seam="session-history">
      ${r.map(o=>f`<div class="detail-session-row">
            <button
              type="button"
              class="detail-session detail-session--${o.status||"unknown"}"
              data-attempt-id=${o.attempt_id}
              @click=${()=>e.onOpen&&e.onOpen(o.attempt_id)}
            >
              <span class="detail-session__glyph"
                >${Ga[o.status||""]||"\xB7"}</span
              >
              <span class="detail-session__id">${o.attempt_id}</span>
              ${o.resumed_from?f`<span
                    class="detail-session__resumed"
                    title=${`\uC774\uC5B4\uBC1B\uC740 \uC138\uC158 (from ${o.resumed_from})`}
                    >↻</span
                  >`:""}
              <span class="detail-session__meta"
                >${[o.runner,o.model].filter(Boolean).join(" \xB7 ")}</span
              >
              ${o.session_id?f`<span class="detail-session__sid" title=${o.session_id}
                    >${String(o.session_id).slice(0,8)}</span
                  >`:""}
              <span class="detail-session__time"
                >${ja(o.started_at)}</span
              >
            </button>
            ${s(o)}
          </div>`)}
    </div>
  `}var Ya=["open","in_progress","deferred","resolved","closed"],Va=[0,1,2,3,4];function po(t,e){let r=e.issueStores,n=e.onClose,s=e.transport,o=e.onNavigate,i=e.queueStore,l=e.sessionLogStore,a=null,c=null,p={},h=!1,b=!1,$="",v="",C="";function N(){h=!1,b=!1,$="",v="",C=""}let M=document.createElement("div");M.className="md-viewer-root",document.body.appendChild(M);let F=co(M,{getWorkspacePath:e.getWorkspacePath||(()=>"")}),B=document.createElement("div");B.className="session-log-root",document.body.appendChild(B);let I=hr(B,{transport:s?(g,E)=>Promise.resolve(s(g,E)):void 0,sessionLogStore:l});function S(){if(!i||!a)return[];let g=i.get();return(g&&g.attempts?Object.values(g.attempts):[]).filter(A=>A&&A.bead_id===a).sort((A,R)=>(R.started_at||0)-(A.started_at||0)).map(A=>({attempt_id:A.attempt_id,bead_id:A.bead_id,status:A.status,started_at:typeof A.started_at=="number"?A.started_at:null,runner:A.runner||null,model:A.model||null,session_id:A.session_id||null,resumed_from:A.resumed_from||null,dismissed_at:typeof A.dismissed_at=="number"?A.dismissed_at:null}))}function x(g){let E=i?i.get():null,A=E&&E.attempts?E.attempts[g]:null;I.open({attempt_id:g,meta:A?{runner:A.runner||void 0,model:A.model||void 0,effort:A.effort||void 0,status:A.status||void 0,session_id:A.session_id||void 0}:{}})}async function w(g){if(!s||!g)return;let E=()=>{let R=i?i.get():null;return R&&typeof R.revision=="number"?R.revision:0},A=await s("worker-attempt-resume",{attempt_id:g,expected_revision:E()});if(A&&A.conflict){let R=A.queue&&typeof A.queue.revision=="number"?A.queue.revision:E();A=await s("worker-attempt-resume",{attempt_id:g,expected_revision:R})}A&&A.resumed===!1&&!A.conflict&&A.reason&&X(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${A.reason}`,"error",2400)}let _={onOpen:x,onResume:w};function z(){let g=i?i.get():null,E=g&&g.exec_defaults;return E&&typeof E=="object"?E:{}}let Y=null;r&&r.subscribe&&(Y=r.subscribe(()=>Ie()));let Q=null;i&&typeof i.subscribe=="function"&&(Q=i.subscribe(()=>{a&&P()}));function J(g){g.key==="Escape"&&a&&(g.preventDefault(),n())}document.addEventListener("keydown",J);function Ie(){if(a){if(r&&typeof r.snapshotFor=="function"){let g=r.snapshotFor("detail:"+a)||[];c=g.find(A=>A&&A.id===a)||g[0]||c}P()}}function Me(g){Mt(g).then(E=>{E?X("\uBCF5\uC0AC\uB428","success",1200):X("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function Te(g){g.preventDefault(),g.stopPropagation(),a&&Me(a)}function Ke(g,E){g.preventDefault(),g.stopPropagation(),Me(E)}function We(g,E){g.preventDefault(),g.stopPropagation(),F.open(E)}function ve(g,E){p[g]=E,P(),!(!s||!a)&&Promise.resolve(s("update-exec-settings",{id:a,key:g,value:E})).catch(()=>{X("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}async function Se(g,E,A){if(!s||!a)return!1;try{let R=await Promise.resolve(s(g,E)),K=Array.isArray(R)?R[0]:R;return K&&typeof K=="object"&&K.id?(c=K,!0):(X(A,"error"),!1)}catch{return X(A,"error"),!1}}function Ve(g){setTimeout(()=>{try{let E=t.querySelector(g);E&&typeof E.focus=="function"&&E.focus()}catch{}},0)}function me(){h=!0,$=c&&c.title||"",P(),Ve('.detail-edit__input[data-edit="title"]')}function st(g){$=g.target.value}function oe(){h=!1,$="",P()}function Ge(){Se("edit-text",{id:a,field:"title",value:$},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(E=>{E&&(h=!1,$=""),P()})}function ie(){b=!0,v=c&&c.description||"",P(),Ve('.detail-edit__textarea[data-edit="description"]')}function Ne(g){v=g.target.value}function Xe(){b=!1,v="",P()}function Ae(){Se("edit-text",{id:a,field:"description",value:v},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(E=>{E&&(b=!1,v=""),P()})}function Ee(g,E,A,R){if(g.key==="Escape"){g.stopPropagation(),A();return}g.key==="Enter"&&(!R||g.ctrlKey||g.metaKey)&&(g.preventDefault(),E())}function _e(g){let E=g.target.value;Se("update-status",{id:a,status:E},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>P())}function Be(g){let E=Number(g.target.value);Se("update-priority",{id:a,priority:E},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>P())}function Ze(g){C=g.target.value}function Ce(){let g=C.trim();g.length!==0&&Se("label-add",{id:a,label:g},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(E=>{E&&(C=""),P()})}function y(g){if(g.key==="Escape"){g.stopPropagation(),C="",P();return}g.key==="Enter"&&(g.preventDefault(),Ce())}function k(g){Se("label-remove",{id:a,label:g},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>P())}let U={onCopyPath:Ke,onOpenDoc:We},ee={onChange:ve};function ue(g){return typeof g=="string"?g:g&&typeof g=="object"?String(g.id||g.to||g.issue_id||g.depends_on||""):""}function ge(g){switch(g&&typeof g=="object"?String(g.dependency_type||g.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function le(g){let A=(Array.isArray(g.dependencies)?g.dependencies:[]).map(R=>({id:ue(R),icon:ge(R)})).filter(R=>R.id.length>0);return f`
      <div class="detail-section-label">의존성</div>
      ${A.length===0?f`<div class="detail-empty">의존성 없음</div>`:f`<div class="detail-deps">
            ${A.map(R=>o?f`<button
                    type="button"
                    class="detail-dep detail-dep--link"
                    @click=${()=>o(R.id)}
                  >
                    ${R.icon?`${R.icon} `:""}${R.id}
                  </button>`:f`<span class="detail-dep"
                    >${R.icon?`${R.icon} `:""}${R.id}</span
                  >`)}
          </div>`}
    `}function ye(g){let E=g.metadata||{},A=g.workflow||{},R=A.stages||{},K=R.spec&&R.spec.stale,ce=R.impl&&R.impl.stale,H=A.route_source==="derived",Le=A.route||E.route||"\u2014";return f`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${H?" detail-kv__v--derived":""}"
          title=${H?"route \uCD94\uB860\uAC12 (metadata \uBBF8\uD540)":"route"}
          >${H&&A.route?`${Le} ? (\uCD94\uB860)`:Le}</span
        >
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">spec_review</span>
        <span class="detail-kv__v"
          >${E.spec_review||"\uC5C6\uC74C"}${K?" \xB7 stale":""}</span
        >
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">impl_review</span>
        <span class="detail-kv__v"
          >${E.impl_review||"\uC5C6\uC74C"}${ce?" \xB7 stale":""}</span
        >
      </div>
      ${E.pr_url?f`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${E.pr_url}</span>
          </div>`:""}
    `}let se={route:["spec_backed","full_plan"]};async function te(g,E){let A=E.target.value;if(g==="route"&&c&&c.metadata&&c.metadata.route==="full_plan"&&A!=="full_plan"&&!window.confirm(`full_plan \u2192 ${A||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){P();return}await Se("update-workflow-meta",{id:a,key:g,value:A},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),P()}function Pe(g){let E=g.metadata||{};return f` ${((R,K)=>{let ce=se[R],H=typeof E[R]=="string"?E[R]:"";return f`<div class="detail-kv">
        <span class="detail-kv__k">${R}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${R}
          data-edit=${`wfmeta-${R}`}
          @change=${Le=>te(R,Le)}
        >
          <option value="" ?selected=${!ce.includes(H)}>
            ${K}
          </option>
          ${ce.map(Le=>f`<option value=${Le} ?selected=${H===Le}>${Le}</option>`)}
        </select>
      </div>`})("route","(\uBBF8\uC124\uC815 \xB7 \uCD94\uB860)")} `}function De(g){return h?f`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${$}
            @input=${st}
            @keydown=${E=>Ee(E,Ge,oe,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${Ge}
            >
              저장
            </button>
            <button
              type="button"
              class="detail-edit__cancel"
              data-edit="title-cancel"
              @click=${oe}
            >
              취소
            </button>
          </div>
        </div>
      `:f`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${g}</h2>
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${me}
        >
          ✎
        </button>
      </div>
    `}function Re(g){let E=Dt(g.created_at),A=Dt(g.updated_at);return!E&&!A?f``:f`
      ${E?f`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${E}</span>
          </div>`:""}
      ${A?f`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${A}</span>
          </div>`:""}
    `}function T(g,E){return f`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${_e}
        >
          ${Ya.map(A=>f`<option value=${A} ?selected=${A===g}>${A}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${Be}
        >
          ${Va.map(A=>f`<option value=${String(A)} ?selected=${A===E}>
                P${A}
              </option>`)}
        </select>
      </div>
    `}function D(g){return f`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${b?"":f`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${ie}
            >
              ✎
            </button>`}
      </div>
      ${b?f`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${v}
              @input=${Ne}
              @keydown=${E=>Ee(E,Ae,Xe,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${Ae}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${Xe}
              >
                취소
              </button>
            </div>
          </div>`:f`<div class="detail-overlay__desc">
            ${g||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function Z(g){let E=Array.isArray(g.labels)?g.labels:[];return f`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${E.map(A=>f`<span class="detail-label-chip"
              >${A}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${A}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+A}
                @click=${()=>k(A)}
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
            @input=${Ze}
            @keydown=${y}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${Ce}
          >
            추가
          </button>
        </span>
      </div>
    `}function j(){if(!a)return f``;let g=c||{},E=String(g.id||a),A=g.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",R=g.status||"open",K=typeof g.priority=="number"?Math.max(0,Math.min(4,g.priority)):"",ce=g.description||"",H={...g,metadata:{...g.metadata||{},...p}};return f`
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
            ${E}
          </button>
          ${De(A)} ${T(R,K)}
          ${Re(g)} ${D(ce)}
          ${Z(g)} ${le(g)}
          ${ye(g)} ${Pe(g)}
          ${Ts(g,U)}
          ${Es(H,ee,z())}
          ${uo(S(),_)}
        </div>
      </div>
    `}function P(){fe(j(),t)}return{load(g){g!==a&&(p={},N()),a=g,c=null,Ie()},clear(){a=null,c=null,p={},N(),F.close(),I.close(),fe(f``,t)},destroy(){Y&&(Y(),Y=null),Q&&(Q(),Q=null),document.removeEventListener("keydown",J),F.destroy(),M.parentNode&&M.parentNode.removeChild(M),I.destroy(),B.parentNode&&B.parentNode.removeChild(B),a=null,c=null,fe(f``,t)}}}var Za=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function fo(t,e){return Gr(t,e)?"shown":e.hidden_labels.includes(t)?"hidden_exact":"hidden_prefix"}function Ka(t,e,r){if(!r)return{hidden_labels:e.hidden_labels.includes(t)?e.hidden_labels:[...e.hidden_labels,t],visible_labels:e.visible_labels.filter(o=>o!==t)};let n=e.hidden_labels.filter(o=>o!==t);return e.hidden_prefixes.some(o=>o.length>0&&t.startsWith(o))?{hidden_labels:n,visible_labels:e.visible_labels.includes(t)?e.visible_labels:[...e.visible_labels,t]}:{hidden_labels:n}}function ho(t,e){let{policyStore:r,transport:n,labelOptions:s}=e,o=document.createElement("dialog");o.id="display-settings-dialog",o.className="display-settings",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),t.appendChild(o);let i="";async function l(x){let w=r.get();if(w)try{let _=await n("display-policy-set",{expected_revision:w.revision,policy:x(w)});a(_),_&&_.conflict&&_.policy&&(_=await n("display-policy-set",{expected_revision:_.policy.revision,policy:x(_.policy)}),a(_)),_&&_.conflict&&X("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC","error",4e3)}catch{X("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function a(x){x&&x.policy&&typeof x.policy=="object"&&r.set(x.policy)}function c(x){let w=r.get();if(!w)return;let _=fo(x,w)!=="shown";l(z=>Ka(x,z,_))}function p(){let x=i.trim();x.length!==0&&(i="",l(w=>w.hidden_prefixes.includes(x)?{hidden_prefixes:w.hidden_prefixes}:{hidden_prefixes:[...w.hidden_prefixes,x]}),N())}function h(x){l(w=>({hidden_prefixes:w.hidden_prefixes.filter(_=>_!==x)}))}function b(x){let w=r.get();if(!w)return;let _=w.chips[x]===!1;l(()=>({chips:{[x]:_}}))}function $(x){let w=s();return f`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">라벨 표시</h3>
        <p class="display-settings__hint">
          라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을
          누르면 그 라벨만 예외로 다시 표시됩니다.
        </p>
        ${w.length===0?f`<div class="display-settings__empty">라벨 없음</div>`:f`<div class="display-settings__pills">
              ${w.map(_=>{let z=fo(_,x);return f`<button
                  type="button"
                  class=${`display-settings__pill display-settings__pill--${z}`}
                  data-label=${_}
                  data-state=${z}
                  @click=${()=>c(_)}
                >
                  ${_}
                </button>`})}
            </div>`}
      </section>
    `}function v(x){return f`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">숨김 prefix</h3>
        <div class="display-settings__prefixes">
          ${x.hidden_prefixes.map(w=>f`<span class="display-settings__prefix">
                ${w}
                <button
                  type="button"
                  class="display-settings__prefix-remove"
                  aria-label=${`${w} \uADDC\uCE59 \uC81C\uAC70`}
                  @click=${()=>h(w)}
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
            @input=${w=>{i=String(w.target.value||"")}}
          />
          <button type="button" @click=${p}>추가</button>
        </div>
      </section>
    `}function C(x){return f`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">카드 표시 요소</h3>
        <div class="display-settings__toggles">
          ${Za.map(([w,_])=>f`<label class="display-settings__toggle">
                <input
                  type="checkbox"
                  data-chip=${w}
                  .checked=${x.chips[w]!==!1}
                  @change=${()=>b(w)}
                />
                <span>${_}</span>
              </label>`)}
        </div>
      </section>
    `}function N(){let x=r.get();fe(f`
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
            ${x?f`${$(x)} ${v(x)}
                ${C(x)}`:f`<div class="display-settings__empty">
                  표시 정책을 불러오는 중…
                </div>`}
          </div>
        </div>
      `,o)}let M=!1,F=()=>{M=!1};o.addEventListener("close",F),o.addEventListener("cancel",F);let B=null;r.subscribe&&(B=r.subscribe(()=>{M&&N()}));function I(){M||(i="",M=!0,N(),typeof o.showModal=="function"?o.showModal():o.setAttribute("open",""))}function S(){M&&(M=!1,typeof o.close=="function"?o.close():o.removeAttribute("open"))}return{open:I,close:S,destroy(){M=!1,o.removeEventListener("close",F),o.removeEventListener("cancel",F),B&&(B(),B=null),o.remove()}}}function mo(t){let e=document.createElement("dialog");e.id="fatal-error-dialog",e.setAttribute("role","alertdialog"),e.setAttribute("aria-modal","true"),e.innerHTML=`
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
    </div>`,t.appendChild(e);let r=e.querySelector("#fatal-error-title"),n=e.querySelector("#fatal-error-message"),s=e.querySelector("#fatal-error-detail"),o=e.querySelector("#fatal-error-reload"),i=e.querySelector("#fatal-error-close"),l=()=>{if(typeof e.close=="function")try{e.close()}catch{}e.removeAttribute("open")},a=(c,p,h="")=>{r&&(r.textContent=c||"Unexpected Error"),n&&(n.textContent=p||"An unrecoverable error occurred.");let b=typeof h=="string"?h.trim():"";if(s&&(b.length>0?(s.textContent=b,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof e.showModal=="function")try{e.showModal(),e.setAttribute("open","")}catch{e.setAttribute("open","")}else e.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),i&&i.addEventListener("click",()=>l()),e.addEventListener("cancel",c=>{c.preventDefault(),l()}),{open:a,close:l,getElement(){return e}}}function go(t,e,r){let n=ke("views:nav"),s=null;function o(a){return c=>{c.preventDefault(),n("click tab %s",a),r.gotoView(a)}}function i(){let c=e.getState().view==="worker"?"worker":"board";return f`
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
    `}function l(){fe(i(),t)}return l(),s=e.subscribe(()=>l()),{destroy(){s&&(s(),s=null),fe(f``,t)}}}var bo=["bug","feature","task","epic","chore"];function _o(t){switch((t||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var yo=["Critical","High","Medium","Low","Backlog"];function wo(t,e){let r=document.createElement("dialog");r.id="new-issue-dialog",r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true"),r.innerHTML=`
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
  `,t.appendChild(r);let n=r.querySelector("#new-issue-form"),s=r.querySelector("#new-title"),o=r.querySelector("#new-type"),i=r.querySelector("#new-priority"),l=r.querySelector("#new-labels"),a=r.querySelector("#new-description"),c=r.querySelector("#new-issue-error"),p=r.querySelector("#btn-cancel"),h=r.querySelector("#btn-create"),b=r.querySelector(".new-issue__close");function $(){o.replaceChildren();let S=document.createElement("option");S.value="",S.textContent="\u2014 Select \u2014",o.appendChild(S);for(let x of bo){let w=document.createElement("option");w.value=x,w.textContent=_o(x),o.appendChild(w)}i.replaceChildren();for(let x=0;x<=4;x+=1){let w=document.createElement("option");w.value=String(x);let _=yo[x]||"Medium";w.textContent=`${x} \u2013 ${_}`,i.appendChild(w)}}$();function v(){try{typeof r.close=="function"?r.close():r.removeAttribute("open")}catch{r.removeAttribute("open")}}function C(S){s.disabled=S,o.disabled=S,i.disabled=S,l.disabled=S,a.disabled=S,p.disabled=S,h.disabled=S,h.textContent=S?"Creating\u2026":"Create"}function N(){c.textContent=""}function M(S){c.textContent=S}function F(){try{let S=window.localStorage.getItem("beads-ui.new.type");S?o.value=S:o.value="";let x=window.localStorage.getItem("beads-ui.new.priority");x&&/^\d$/.test(x)?i.value=x:i.value="2"}catch{o.value="",i.value="2"}}function B(){let S=o.value||"",x=i.value||"";S.length>0&&window.localStorage.setItem("beads-ui.new.type",S),x.length>0&&window.localStorage.setItem("beads-ui.new.priority",x)}async function I(){N();let S=String(s.value||"").trim();if(S.length===0){M("Title is required"),s.focus();return}let x=Number(i.value||"2");if(!(x>=0&&x<=4)){M("Priority must be 0..4"),i.focus();return}let w=String(o.value||""),_=String(a.value||""),z={title:S};w.length>0&&(z.type=w),String(x).length>0&&(z.priority=x),_.length>0&&(z.description=_),C(!0);try{await e("create-issue",z)}catch{C(!1),M("Failed to create issue");return}B(),C(!1),v()}return r.addEventListener("cancel",S=>{S.preventDefault(),v()}),b.addEventListener("click",()=>v()),p.addEventListener("click",()=>v()),r.addEventListener("keydown",S=>{S.key==="Enter"&&(S.ctrlKey||S.metaKey)&&(S.preventDefault(),I())}),n.addEventListener("submit",S=>{S.preventDefault(),I()}),{open(){n.reset(),N(),F();try{"showModal"in r&&typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")}catch{r.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){v()}}}var Xa=[{key:"orchestration_model",values:()=>Kr},{key:"orchestration_effort",values:()=>Xr},{key:"review_model",values:()=>Qr},{key:"impl_model",values:()=>Jr}];function ko(t,e){let{queueStore:r,transport:n}=e,s=document.createElement("dialog");s.id="worker-exec-defaults-dialog",s.className="exec-defaults",s.setAttribute("role","dialog"),s.setAttribute("aria-modal","true"),t.appendChild(s);function o(){return r&&r.get()||{revision:0,exec_defaults:{}}}function i(){let M=o();return typeof M.revision=="number"?M.revision:0}function l(){let M=o().exec_defaults;return M&&typeof M=="object"?M:{}}function a(M){M&&M.queue&&r&&r.set(M.queue)}async function c(M,F){if(!n)return;let B={key:M,value:F||null};try{let I=await n("worker-queue-set-exec-default",{...B,expected_revision:i()});a(I),I&&I.conflict&&(I=await n("worker-queue-set-exec-default",{...B,expected_revision:i()}),a(I)),I&&I.conflict&&X("\uC804\uC5ED \uC2E4\uD589 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC","error",4e3)}catch{X("\uC804\uC5ED \uC2E4\uD589 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function p(M,F,B){let I=!!B&&!F.includes(B);return f`<div class="exec-defaults__row">
      <span class="exec-defaults__k">${M}</span>
      <select
        class="exec-defaults__sel"
        aria-label=${`\uC804\uC5ED ${M}`}
        data-key=${M}
        @change=${S=>{c(M,S.target.value)}}
      >
        <option value="" ?selected=${!B}>
          ${en[M]||"(\uAE30\uBCF8)"}
        </option>
        ${I?f`<option value=${B} ?selected=${!0}>
              ${B} (비호환)
            </option>`:""}
        ${F.map(S=>f`<option value=${S} ?selected=${B===S}>${S}</option>`)}
      </select>
    </div>`}function h(){let M=l();fe(f`
        <div class="exec-defaults__container">
          <header class="exec-defaults__header">
            <div class="exec-defaults__title">전역 실행 설정</div>
            <button
              type="button"
              class="exec-defaults__close"
              aria-label="닫기"
              @click=${N}
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
            ${Xa.map(F=>p(F.key,F.values(),M[F.key]||""))}
          </div>
        </div>
      `,s)}let b=!1,$=()=>{b=!1};s.addEventListener("close",$),s.addEventListener("cancel",$);let v=null;r&&r.subscribe&&(v=r.subscribe(()=>{b&&h()}));function C(){b||(b=!0,h(),typeof s.showModal=="function"?s.showModal():s.setAttribute("open",""))}function N(){b&&(b=!1,typeof s.close=="function"?s.close():s.removeAttribute("open"))}return{open:C,close:N,destroy(){b=!1,s.removeEventListener("close",$),s.removeEventListener("cancel",$),v&&(v(),v=null),s.remove()}}}function Qa(t){let e=t.draggable&&!t.done,r=Array.isArray(t.badges)?t.badges:[];return f`<div
    class="worker-mini${e?"":" worker-mini--static"}${t.done?" worker-mini--done":""}"
    draggable=${e?"true":"false"}
    data-bead-id=${t.id}
    data-lane=${t.lane}
  >
    ${e?f`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:""}
    <span class="worker-mini__id" title="클릭하면 ID 복사">${t.id}</span>
    <span class="worker-mini__title">${t.title}</span>
    ${t.pr_url&&t.pr_number?f`<a
          class="worker-mini__pr"
          href=${t.pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="PR 열기"
          >#${t.pr_number} ↗</a
        >`:""}
    ${r.map(n=>f`<span
          class="worker-mini__badge${t.alert?" worker-mini__badge--alert":""}"
          >${n}</span
        >`)}
    ${t.reason?f`<span class="worker-mini__reason">${t.reason}</span>`:""}
    ${t.merge_action?f`<button
            type="button"
            class="worker-mini__merge"
            data-bead-id=${t.id}
            ?disabled=${t.merge_enabled===!1}
            title=${t.merge_title||""}
          >
            머지
          </button>
          <button
            type="button"
            class="worker-mini__rerun"
            data-bead-id=${t.id}
            title="PR을 버리고 새 base에서 다시 실행합니다 (되돌릴 수 없음)"
          >
            재실행
          </button>`:""}
  </div>`}function Ja(t){let e=t.draggable&&!t.done,r=t.workflow,n=r&&r.chips||{},s=n.route||r&&r.route,o=n.route_source==="derived"||!!(r&&r.route_source==="derived"),i=typeof t.reason=="string"&&t.reason.startsWith("\u26D4");return f`<div
    class="worker-card${e?"":" worker-card--static"}"
    draggable=${e?"true":"false"}
    data-bead-id=${t.id}
    data-lane=${t.lane}
  >
    <div class="worker-card__head">
      ${e?f`<span class="worker-card__grip" aria-hidden="true">⠿</span>`:""}
      <span class="worker-card__id" title="클릭하면 ID 복사">${t.id}</span>
      ${r&&s?f`<span
            class="ctl-chip ctl-chip--route${o?" is-derived":""}"
            title=${o?"route \uCD94\uB860\uAC12 (metadata \uBBF8\uD540)":"route"}
            >${o?`${s} ?`:s}</span
          >`:""}
    </div>
    <div class="worker-card__title">${t.title}</div>
    ${r?fr(r,t.status):""}
    ${t.reason?f`<div class="worker-card__foot">
          <span
            class="worker-card__reason${i?" worker-card__reason--danger":""}"
            >${t.reason}</span
          >
        </div>`:""}
  </div>`}function Nt(t){return f`<section
    class="worker-pane${t.src?" worker-pane--src":""}"
    id=${t.id}
    data-lane=${t.lane}
  >
    <header class="worker-pane__hd">
      <span class="worker-pane__title">${t.title}</span>
      <span class="worker-pane__count">${t.items.length}</span>
    </header>
    <div class="worker-pane__body">
      ${t.body?t.body:t.items.length===0?f`<div class="worker-pane__empty">${t.empty||""}</div>`:t.items.map(e=>t.lane==="candidate"?Ja(e):Qa(e))}
    </div>
  </section>`}function el(t){if(!Number.isFinite(t)||t<0)return"0s";let e=Math.floor(t/1e3),r=Math.floor(e/60),n=e%60;return r>0?`${r}m ${String(n).padStart(2,"0")}s`:`${n}s`}function vo(t){let e=Array.isArray(t.cleanupFailures)?t.cleanupFailures:[];return f`<div class="worker-banners">
    ${t.failure?f`<div class="worker-banner worker-banner--failure" role="alert">
          ⛔ ${t.failure.repo||"repo"} 세션 실패 —
          ${t.failure.reason||""}. 자동 진행을 껐습니다, 수동 ▶ 필요.
          ${t.failure.resume_attempt_id?f`<button
                type="button"
                class="worker-banner__resume"
                data-attempt-id=${t.failure.resume_attempt_id}
                ?disabled=${!t.failure.resume_eligible}
                title=${t.failure.resume_eligible?"\uCD5C\uADFC \uC2E4\uD328 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":t.failure.resume_reason||"\uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}
              >
                ↻ 이어하기
              </button>`:""}
          ${t.failure.resume_attempt_id?f`<button
                type="button"
                class="worker-banner__dismiss"
                data-attempt-id=${t.failure.resume_attempt_id}
                title="이 실패를 처리 완료로 표시하고 배너를 닫습니다"
                aria-label="배너 닫기"
              >
                ✕
              </button>`:""}
        </div>`:""}
    ${e.map(r=>f`<div
          class="worker-banner worker-banner--cleanup"
          role="alert"
          data-bead-id=${r.bead_id}
        >
          ⚠ ${r.bead_id} 머지 완료 — 머지 후 정리가 <b>${r.step}</b> 단계에서
          멈췄습니다 (${r.reason}). bead는 resolved로 남아 있고 자동 재시도는
          하지 않습니다 — 정리를 사람이 마무리하세요.
        </div>`)}
  </div>`}function tl(t,e,r=null){let n=!!t.paused,s=n?"\uC77C\uC2DC\uC815\uC9C0":typeof t.started_at=="number"?el(e-t.started_at):"\u2014",o=[t.runner,t.model].filter(Boolean).join(" \xB7 "),i=t.attempt_id&&t.attempt_id===r;return f`<div
    class="rtile${i?" rtile--sel":""}${n?" rtile--paused":""}"
    data-bead-id=${t.bead_id}
    data-attempt-id=${t.attempt_id||""}
  >
    <div class="rtile__hd">
      <span class="rtile__dot" aria-hidden="true"></span>
      <span class="rtile__id">${t.bead_id}</span>
      ${t.resumed_from?f`<span
            class="rtile__resumed"
            title=${`\uC774\uC5B4\uBC1B\uC740 \uC138\uC158 (from ${t.resumed_from})`}
            >↻</span
          >`:""}
      <span class="rtile__elapsed">${s}</span>
      <button
        type="button"
        class="rtile__info"
        title="상세 보기"
        aria-label="상세 보기"
      >
        ⓘ
      </button>
      ${n?f`<button
            type="button"
            class="rtile__resume"
            title="같은 세션으로 이어서 재개"
            aria-label="재개"
          >
            ▶
          </button>`:f`<button
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
    ${o?f`<div class="rtile__meta">${o}</div>`:""}
  </div>`}function $o(t,e=Date.now(),r=null){let n=Array.isArray(t)?t:[];return f`<div class="worker-rungrid" id="worker-rungrid">
    ${n.length===0?f`<div class="worker-rungrid__empty">실행 세션 없음</div>`:n.map(s=>tl(s,e,r))}
  </div>`}var rl="tab:worker:ready",nl="tab:worker:blocked",Tr=1;function sl(t){let e=t&&t.metadata;return!!(e&&typeof e=="object"&&e.spec_id)}function ol(t){let e=t&&t.parent;return(typeof e=="string"?e.length>0:!!(e&&e.id))||/\.\d+$/.test(t&&t.id||"")}function il(t){let r=(Array.isArray(t?.dependencies)?t.dependencies:[]).map(n=>typeof n=="string"?n:n&&n.id).filter(Boolean);return r.length>0?`\u{1F512} ${r.join(", ")}`:"\u{1F512} blocked"}var al=["closed_unmerged","undecidable"];function ll(t,e,r,n){let s=r[t]||null,o=s&&s.gate?s.gate:null,i=s&&s.pr?s.pr:null,l=[];o&&o.gate_badge&&l.push(o.gate_badge),o&&o.base_badge&&o.base_badge!==o.gate_badge&&l.push(o.base_badge),n&&l.push("\uC815\uB9AC \uC2E4\uD328");let a=!!o&&o.base_badge==="\uCDA9\uB3CC",c=!!o&&o.enabled===!0,p=!!n&&!!o&&o.tier==="merged";return{id:t,title:e,reason:n?"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644":"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",pr_number:i&&typeof i.number=="number"?i.number:null,pr_url:i&&typeof i.url=="string"?i.url:"",badges:l,alert:!!o&&al.includes(o.tier)||!!n,merge_action:!0,merge_enabled:c||a||p,merge_title:p?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uCC98\uC74C\uBD80\uD130 \uB2E4\uC2DC \uC218\uD589\uD569\uB2C8\uB2E4":a?"\uCDA9\uB3CC \u2014 \uD074\uB9AD\uD558\uBA74 \uCDA9\uB3CC \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4 (\uBA38\uC9C0\uD558\uC9C0 \uC54A\uC74C)":c?`\uBA38\uC9C0 (${o.gate_badge}) \u2014 \uD074\uB9AD \uC2DC\uC810\uC5D0 \uB2E4\uC2DC \uD655\uC778\uD569\uB2C8\uB2E4`:o&&o.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${o&&o.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function $n(t,e={}){let{transport:r,issueStores:n,queueStore:s,sessionLogStore:o,uiOrderStore:i,gotoIssue:l}=e,a=n?dr(n,i):null,c=ur({transport:r,uiOrderStore:i}),p=null,h=[],b=[],$=document.createElement("div");$.className="worker-console";let v=document.createElement("div"),C=document.createElement("div");C.className="worker-drawer-overlay",C.hidden=!0;let N=document.createElement("div");N.className="worker-drawer-overlay__backdrop";let M=document.createElement("div");M.className="worker-drawer-host",C.append(N,M);let F=document.createElement("div");F.className="worker-lanes-host",$.append(v,C,F),t.appendChild($);let B=null,I=hr(M,{transport:r,sessionLogStore:o,onClose:()=>{B=null,C.hidden=!0,oe()}}),S=ko($,{queueStore:s,transport:r});function x(){return s&&s.get()||{revision:0,auto_advance:!1,slots:Tr,queue:[],pr_wait:[],done:[]}}function w(){let y=x();return typeof y.revision=="number"?y.revision:0}function _(y){y&&y.queue&&s&&s.set(y.queue)}async function z(y,k){if(!r)return;let U=await r("worker-queue-place",{bead_id:y,index:k,expected_revision:w()});_(U),U&&U.conflict&&await r("worker-queue-place",{bead_id:y,index:k,expected_revision:w()}).then(_)}async function Y(y,k){if(!r)return;let U=await r("worker-queue-reorder",{bead_id:y,to_index:k,expected_revision:w()});_(U),U&&U.conflict&&await r("worker-queue-reorder",{bead_id:y,to_index:k,expected_revision:w()}).then(_)}async function Q(y){if(!r)return;let k=await r("worker-queue-remove",{bead_id:y,expected_revision:w()});_(k),k&&k.conflict&&await r("worker-queue-remove",{bead_id:y,expected_revision:w()}).then(_)}async function J(y){!r||!y||await r("worker-attempt-stop",{attempt_id:y})}async function Ie(y){if(!r||!y)return;let k=await r("worker-attempt-pause",{attempt_id:y});k&&k.paused===!1&&k.reason&&X(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${k.reason}`,"error",2400)}async function Me(y){if(!r||!y)return;let k=await r("worker-attempt-resume",{attempt_id:y,expected_revision:w()});_(k),k&&k.conflict&&(k=await r("worker-attempt-resume",{attempt_id:y,expected_revision:w()}),_(k)),k&&k.resumed===!1&&!k.conflict&&k.reason&&X(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${k.reason}`,"error",2400)}async function Te(y){if(!r||!y)return;let k=await r("worker-attempt-dismiss",{attempt_id:y,expected_revision:w()});_(k),k&&k.conflict&&(k=await r("worker-attempt-dismiss",{attempt_id:y,expected_revision:w()}),_(k)),k&&k.dismissed===!1&&!k.conflict&&k.reason&&X(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${k.reason}`,"error",2400)}async function Ke(y){if(!r||!y)return;let k=await r("worker-pr-merge",{bead_id:y,expected_revision:w()});if(_(k),k&&k.conflict&&(k=await r("worker-pr-merge",{bead_id:y,expected_revision:w()}),_(k)),!(!k||k.conflict)){if(k.action==="conflict_resolution"){X(k.ok?"\uCDA9\uB3CC \u2014 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 (\uBA38\uC9C0\uD558\uC9C0 \uC54A\uC74C)":`\uCDA9\uB3CC \uD574\uC18C \uB514\uC2A4\uD328\uCE58 \uC2E4\uD328: ${k.reason||""}`,k.ok?"success":"error",2800);return}if(k.ok){X("\uBA38\uC9C0 + \uC815\uB9AC \uC644\uB8CC","success",2e3);return}X(k.cleanup_step?`\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uC2E4\uD328(${k.cleanup_step}): ${k.reason||""}`:`\uBA38\uC9C0 \uAC70\uBD80: ${k.reason||""}`,"error",3200)}}async function We(y){if(!r||!y||!(typeof globalThis.confirm!="function"||globalThis.confirm(`${y}: PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD55C \uB4A4 \uC0C8 base\uC5D0\uC11C \uB2E4\uC2DC \uC2E4\uD589\uD569\uB2C8\uB2E4. \uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)))return;let U=await r("worker-pr-rerun",{bead_id:y,expected_revision:w()});_(U),U&&U.conflict&&(U=await r("worker-pr-rerun",{bead_id:y,expected_revision:w()}),_(U)),U&&U.rerun===!1&&!U.conflict&&X(`\uC7AC\uC2E4\uD589 \uAC70\uBD80: ${U.reason||""}`,"error",2800)}async function ve(y){if(!r)return;let k=await r("worker-queue-toggle",{on:y,expected_revision:w()});_(k),k&&k.conflict&&await r("worker-queue-toggle",{on:y,expected_revision:w()}).then(_)}async function Se(y){if(!r||!Number.isFinite(y))return;let k=Math.max(Tr,Math.floor(y)),U=await r("worker-queue-set-slots",{slots:k,expected_revision:w()});_(U),U&&U.conflict&&await r("worker-queue-set-slots",{slots:k,expected_revision:w()}).then(_)}function Ve(){let y=x(),k=a?a.selectBoardColumn(rl,"ready"):[],U=a?a.selectBoardColumn(nl,"blocked"):[],ee=new Map;for(let O of[...k,...U])ee.set(O.id,O.title||O.id);let ue=y.pr_wait||[],ge=y.pr_observations||{},le=y.cleanup_failed||{},ye=Object.entries(le).map(([O,pe])=>({bead_id:O,step:pe&&pe.step?pe.step:"",reason:pe&&pe.reason?pe.reason:""})),se=y.queue||[],te=new Set([...se.map(O=>O.bead_id),...ue.map(O=>O.bead_id),...y.done.map(O=>O.bead_id)]),Pe=new Set(U.map(O=>O.id)),De=i?i.get()?.order||{}:{},Re=new Set,T=[];for(let O of[...k,...U])te.has(O.id)||Re.has(O.id)||ol(O)||(Re.add(O.id),T.push(O));T.sort(lr(De)),h=T;let D=y.admission||{},Z=O=>{let pe=D[O];if(!pe)return"";let u=typeof pe.reason=="string"?pe.reason:"",m=u.indexOf(":");return m>0&&m<u.length-1?`\u26D4 ${u.slice(0,m)} (${u.slice(m+1)})`:`\u26D4 ${u}`},j=T.map(O=>{let pe=sl(O),u=[];Pe.has(O.id)&&u.push(il(O)),pe||u.push("spec \uC5C6\uC74C");let m=Z(O.id);return m&&u.push(m),{id:O.id,title:O.title||O.id,reason:u.join(" \xB7 "),draggable:pe,lane:"candidate",workflow:O.workflow,status:O.status}}),P=(O,pe)=>O.map(u=>({id:u.bead_id,title:ee.get(u.bead_id)||u.bead_id,reason:pe==="done"?"":Z(u.bead_id),draggable:pe!=="done",done:pe==="done",lane:pe})),g=y.attempts?Object.values(y.attempts):[],E=new Set;for(let O of g)O&&typeof O.resumed_from=="string"&&O.resumed_from.length>0&&E.add(O.resumed_from);let A=new Map;for(let O of g)A.set(O.bead_id,O.attempt_id);let R=[],K=null;for(let O of g){let pe=O.status==="paused"&&!E.has(O.attempt_id);O.status==="running"||pe?R.push({bead_id:O.bead_id,attempt_id:O.attempt_id,title:ee.get(O.bead_id)||O.bead_id,runner:O.runner||null,model:O.model||null,effort:O.effort||null,started_at:typeof O.started_at=="number"?O.started_at:null,resumed_from:O.resumed_from||null,paused:pe,can_pause:typeof O.session_id=="string"&&O.session_id.length>0}):(O.status==="failed"||O.status==="orphaned")&&!(A.get(O.bead_id)!==O.attempt_id)&&typeof O.dismissed_at!="number"&&(K=O)}let ce=null;if(K){let O=typeof K.session_id=="string"&&K.session_id.length>0,pe=E.has(K.attempt_id);ce={repo:K.repo||"",reason:K.cause||K.status,resume_attempt_id:K.attempt_id,resume_eligible:O&&!pe,resume_reason:O?pe?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}}let H=new Set(R.map(O=>O.bead_id)),it=R.filter(O=>!O.paused).length,at=(y.workspace_info||{}).slots,St=typeof at=="number"?at:typeof y.slots=="number"?y.slots:Tr,Je=it>St;return{queue:y,idToTitle:ee,candidates:j,running:R,live_count:it,slots:St,over_cap:Je,failure:ce,waiting:P(se.filter(O=>!H.has(O.bead_id)),"queue"),pr_wait:ue.map(O=>ll(O.bead_id,ee.get(O.bead_id)||O.bead_id,ge,le[O.bead_id]||null)),done:P(y.done,"done"),cleanup_failures:ye}}function me(y){let k=y.waiting.length>0?y.waiting[0].id:"\u2014";return f`<div class="worker-ctrl">
        <button
          type="button"
          class="worker-play${y.queue.auto_advance?" is-active":""}"
        >
          ${y.queue.auto_advance?"\u23F8 \uC77C\uC2DC\uC815\uC9C0":"\u25B6 \uC790\uB3D9 \uC9C4\uD589"}
        </button>
        <span class="worker-stat"
          >실행 <b>${y.live_count}</b> · 다음 <b>${k}</b></span
        >
        ${y.over_cap?f`<span
              class="worker-overcap"
              title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
              >cap 초과</span
            >`:""}
        <label class="worker-tgl worker-slots"
          >동시 실행
          <input
            type="number"
            class="worker-slots__input"
            min=${Tr}
            step="1"
            .value=${String(y.slots)}
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
        </button>
      </div>
      ${vo({failure:y.failure,cleanupFailures:y.cleanup_failures})}`}function st(y){return f`<div class="worker-lanes">
      ${Nt({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:y.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C"})}
      ${Nt({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:y.waiting,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58"})}
      ${Nt({id:"worker-pane-running",lane:"running",title:`\uC2E4\uD589 \uC911 \xB7 \uC2AC\uB86F ${y.slots}`,items:y.running,body:$o(y.running,Date.now(),B)})}
      ${Nt({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:y.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C"})}
      ${Nt({id:"worker-pane-done",lane:"done",title:`\uC644\uB8CC \xB7 \uC624\uB298 ${y.done.length}`,items:y.done,empty:"\uC644\uB8CC \uC5C6\uC74C"})}
    </div>`}function oe(){let y=Ve();fe(me(y),v),fe(st(y),F)}function Ge(y){let k=y.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!k)return;let U=k.dataset.beadId||"",ee=k.dataset.lane||"";p={bead_id:U,from_lane:ee};try{y.dataTransfer?.setData("text/plain",U),y.dataTransfer&&(y.dataTransfer.effectAllowed="move")}catch{}}function ie(y){let k=y.target?.closest?.(".worker-pane");if(!k)return;let U=k.dataset.lane||"";U!=="candidate"&&U!=="queue"||(y.preventDefault(),y.dataTransfer&&(y.dataTransfer.dropEffect="move"),k.classList.add("worker-pane--drag-over"))}function Ne(y){y.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function Xe(y,k){let U=h.find(le=>le.id===y);if(!U)return;let ee=h.filter(le=>le.id!==y),ue=ee.length;if(k){let le=k.dataset.beadId;if(le===y)return;let ye=ee.findIndex(se=>se.id===le);ye>=0&&(ue=ye)}let ge=ee.slice();ge.splice(ue,0,U),c.applyReorder(y,ge,ue)}function Ae(y){let k=y.target?.closest?.(".worker-pane");if(!k)return;y.preventDefault(),k.classList.remove("worker-pane--drag-over");let U=k.dataset.lane||"",ee=p?.bead_id||y.dataTransfer?.getData("text/plain")||"",ue=p?.from_lane||"";if(p=null,!ee)return;let ge=y.target?.closest?.(".worker-mini, .worker-card"),le=Array.from(k.querySelectorAll(".worker-mini, .worker-card")),ye=le.length;if(ge){let se=le.indexOf(ge);se>=0&&(ye=se)}if(U==="candidate"){if(ue==="candidate"){Xe(ee,ge);return}ue==="queue"&&Q(ee);return}U==="queue"&&(ue==="queue"?Y(ee,ye):z(ee,ye))}function Ee(y){let k=y.target?.closest?.(".worker-slots__input");if(!k)return;let U=Number.parseInt(k.value,10);if(!Number.isFinite(U)){oe();return}Se(U).then(oe)}function _e(y){return y?{runner:y.runner||void 0,model:y.model||void 0,effort:y.effort||void 0,worktree:y.worktree||void 0,status:y.status||void 0,session_id:y.session_id||void 0}:{}}function Be(y){let k=x(),U=k.attempts?k.attempts[y]:null;B=y,C.hidden=!1,I.open({attempt_id:y,meta:_e(U)}),oe()}function Ze(){if(!B)return;let y=x(),k=y.attempts?y.attempts[B]:null;if(k){I.updateMeta(_e(k));return}I.close()}function Ce(y){let k=y.target;if(k?.closest?.("#worker-exec-defaults-dialog"))return;if(k?.closest?.(".worker-exec-defaults-btn")){S.open();return}let U=k?.closest?.(".worker-banner__resume");if(U){let se=U.dataset.attemptId;se&&Me(se);return}let ee=k?.closest?.(".worker-banner__dismiss");if(ee){let se=ee.dataset.attemptId;se&&Te(se);return}if(k?.closest?.(".worker-play")){ve(!x().auto_advance);return}let ue=k?.closest?.(".worker-mini__merge");if(ue){Ke(ue.dataset.beadId||"");return}let ge=k?.closest?.(".worker-mini__rerun");if(ge){We(ge.dataset.beadId||"");return}if(k?.closest?.(".worker-mini__pr"))return;if(k?.closest?.(".rtile__stop")){let te=k?.closest?.(".rtile")?.dataset?.attemptId;te&&J(te);return}if(k?.closest?.(".rtile__pause")){let te=k?.closest?.(".rtile")?.dataset?.attemptId;te&&Ie(te);return}if(k?.closest?.(".rtile__resume")){let te=k?.closest?.(".rtile")?.dataset?.attemptId;te&&Me(te);return}if(k?.closest?.(".rtile__info")){let te=k?.closest?.(".rtile")?.dataset?.beadId;te&&l&&l(te);return}if(k?.closest?.(".worker-drawer-overlay__backdrop")){I.close();return}if(k?.closest?.(".worker-drawer-host"))return;let le=k?.closest?.(".rtile");if(le){let se=le.dataset.attemptId;se&&Be(se);return}let ye=k?.closest?.(".worker-mini, .worker-card");if(ye){let se=ye.dataset.beadId;if(k?.closest?.(".worker-mini__id, .worker-card__id")){se&&Mt(se).then(te=>{te?X("\uBCF5\uC0AC\uB428","success",1200):X("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}se&&l&&l(se)}}return t.addEventListener("dragstart",Ge),t.addEventListener("dragover",ie),t.addEventListener("dragleave",Ne),t.addEventListener("drop",Ae),t.addEventListener("click",Ce),t.addEventListener("change",Ee),a&&b.push(a.subscribe(oe)),s&&b.push(s.subscribe(()=>{oe(),Ze()})),oe(),{load(){oe()},destroy(){for(let y of b.splice(0))try{y()}catch{}t.removeEventListener("dragstart",Ge),t.removeEventListener("dragover",ie),t.removeEventListener("dragleave",Ne),t.removeEventListener("drop",Ae),t.removeEventListener("click",Ce),t.removeEventListener("change",Ee);try{I.destroy()}catch{}C.hidden=!0;try{S.destroy()}catch{}fe(f``,t)}}}function xn(t){if(!t)return"Unknown";let e=t.split("/").filter(Boolean);return e.length>0?e[e.length-1]:"Unknown"}function xo(t,e,r,n=async()=>{},s=async()=>{}){let o=ke("views:workspace-picker"),i=null,l=!1,a=!1,c=!1;async function p(x){let _=x.target.value,Y=e.getState().workspace?.current?.path||"";if(_&&_!==Y){o("switching workspace to %s",_),l=!0,S();try{await r(_)}catch(Q){o("workspace switch failed: %o",Q)}finally{l=!1,S()}}}async function h(){let x=e.getState(),w=x.workspace?.current?.path||x.workspace?.available?.[0]?.path||"";if(!(!w||a)){o("git-pulling workspace %s",w),a=!0,S();try{await n(w)}catch(_){o("workspace git pull failed: %o",_)}finally{a=!1,S()}}}function b(x){let w=x.target;w&&t.contains(w)||C()}function $(x){x.key==="Escape"&&C()}function v(){c||(c=!0,document.addEventListener("mousedown",b),document.addEventListener("keydown",$),S())}function C(){c&&(c=!1,document.removeEventListener("mousedown",b),document.removeEventListener("keydown",$),S())}function N(){c?C():v()}async function M(x){let w=x.target,_=w.value,z=w.checked;o("toggling visibility %s \u2192 %s",_,String(z));try{await s(_,z)}catch(Y){o("workspace visibility toggle failed: %o",Y)}}function F(x){return x?f`
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
    `:f``}function B(x,w){return f`
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
        ${c?f`
              <div
                class="workspace-picker__manage-popover"
                role="menu"
                aria-label="프로젝트 표시 선택"
              >
                ${x.map(_=>f`
                    <label
                      class="workspace-picker__manage-row"
                      title="${_.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${_.path}"
                        .checked=${!w.has(_.path)}
                        @change=${M}
                      />
                      <span class="workspace-picker__manage-name"
                        >${xn(_.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function I(){let x=e.getState(),w=x.workspace?.current,_=x.workspace?.available||[],z=new Set(x.workspace?.hidden||[]),Y=w?.path||_[0]?.path||"";if(_.length===0)return f``;let Q=_.filter(J=>!z.has(J.path)||J.path===Y);if(Q.length<=1){let J=Q[0]||_[0],Ie=xn(J.path);return f`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${J.path}"
            >${Ie}</span
          >
          ${B(_,z)}
          ${F(Y)}
          ${a?f`<span
                class="workspace-picker__loading"
                aria-hidden="true"
              ></span>`:""}
        </div>
      `}return f`
      <div class="workspace-picker">
        <select
          class="workspace-picker__select"
          @change=${p}
          ?disabled=${l||a}
          aria-label="Select project workspace"
        >
          ${Q.map(J=>f`
              <option
                value="${J.path}"
                ?selected=${J.path===Y}
                title="${J.path}"
              >
                ${xn(J.path)}
              </option>
            `)}
        </select>
        ${B(_,z)}
        ${F(Y)}
        ${l||a?f`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function S(){fe(I(),t)}return S(),i=e.subscribe(()=>S()),{destroy(){i&&(i(),i=null),document.removeEventListener("mousedown",b),document.removeEventListener("keydown",$),fe(f``,t)}}}var So=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-queue-set-slots","worker-queue-set-exec-default","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-pr-merge","worker-pr-rerun","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append"];function Sn(){let t=Date.now().toString(36),e=Math.random().toString(36).slice(2,8);return`${t}-${e}`}function Ao(t,e,r=Sn()){return{id:r,type:t,payload:e}}function To(t={}){let e=ke("ws"),r={initialMs:t.backoff?.initialMs??1e3,maxMs:t.backoff?.maxMs??3e4,factor:t.backoff?.factor??2,jitterRatio:t.backoff?.jitterRatio??.2},n=()=>t.url&&t.url.length>0?t.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",i=0,l=null,a=!0,c=new Map,p=[],h=new Map,b=new Set;function $(I){for(let S of Array.from(b))try{S(I)}catch{}}function v(){if(!a||l)return;o="reconnecting",e("ws reconnecting\u2026"),$(o);let I=Math.min(r.maxMs||0,(r.initialMs||0)*Math.pow(r.factor||1,i)),S=(r.jitterRatio||0)*I,x=Math.max(0,Math.round(I+(Math.random()*2-1)*S));e("ws retry in %d ms (attempt %d)",x,i+1),l=setTimeout(()=>{l=null,B()},x)}function C(I){try{s?.send(JSON.stringify(I))}catch(S){e("ws send failed",S)}}function N(){for(o="open",e("ws open"),$(o),i=0;p.length;){let I=p.shift();I&&C(I)}}function M(I){let S;try{S=JSON.parse(String(I.data))}catch{e("ws received non-JSON message");return}if(!S||typeof S.id!="string"||typeof S.type!="string"){e("ws received invalid envelope");return}if(c.has(S.id)){let w=c.get(S.id);c.delete(S.id),S.ok?w?.resolve(S.payload):w?.reject(S.error||new Error("ws error"));return}let x=h.get(S.type);if(x&&x.size>0)for(let w of Array.from(x))try{w(S.payload)}catch(_){e("ws event handler error",_)}else e("ws received unhandled message type: %s",S.type)}function F(){o="closed",e("ws closed"),$(o);for(let[I,S]of c.entries())S.reject(new Error("ws disconnected")),c.delete(I);i+=1,v()}function B(){if(!a)return;let I=n();try{s=new WebSocket(I),e("ws connecting %s",I),o="connecting",$(o),s.addEventListener("open",N),s.addEventListener("message",M),s.addEventListener("error",()=>{}),s.addEventListener("close",F)}catch(S){e("ws connect failed %o",S),v()}}return B(),{send(I,S){if(!So.includes(I))return Promise.reject(new Error(`unknown message type: ${I}`));let x=Sn(),w=Ao(I,S,x);return e("send %s id=%s",I,x),new Promise((_,z)=>{c.set(x,{resolve:_,reject:z,type:I}),s&&s.readyState===s.OPEN?C(w):(e("queue %s id=%s (state=%s)",I,x,o),p.push(w))})},on(I,S){h.has(I)||h.set(I,new Set);let x=h.get(I);return x?.add(S),()=>{x?.delete(S)}},onConnection(I){return b.add(I),()=>{b.delete(I)}},reconnect(){a=!0,l&&(clearTimeout(l),l=null),i=0,B()},close(){a=!1,l&&(clearTimeout(l),l=null);try{s?.close()}catch{}},getState(){return o}}}function cl(){let t=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof t?.workspace_config?.default_workspace=="string"&&t.workspace_config.default_workspace.length>0?t.workspace_config.default_workspace:null}}}async function dl(t,e){try{let n=await(await fetch("/api/config")).json();t.setState({config:n})}catch(r){e("config refresh failed",r)}}var An=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],Eo=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"]],Co="worker:queue",Ro="ui:order",Lo="ui:display-policy",ht="tab:board:closed",Io="beads-ui.board.closed-range";function ul(t){let e=ke("main");e("bootstrap start");let r=f`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;fe(r,t);let n=document.getElementById("top-nav"),s=document.getElementById("board-root"),o=document.getElementById("worker-root"),i=document.getElementById("detail-panel");if(s&&o&&i){let _=function(u,m){let V="Request failed",G="";if(u&&typeof u=="object"){let we=u;if(typeof we.message=="string"&&we.message.length>0&&(V=we.message),typeof we.details=="string")G=we.details;else if(we.details&&typeof we.details=="object")try{G=JSON.stringify(we.details,null,2)}catch{G=""}}else typeof u=="string"&&u.length>0&&(V=u);let re=m&&m.length>0?`Failed to load ${m}`:"Request failed";w.open(re,V,G)},ie=function(u){return`${R.getState().workspace.current?.path||""}\0${u}`},Ne=function(){We&&(We().catch(()=>{}),We=null),ve=null,Se=null},Ae=function(u){Ve=u;let m=()=>{Ve!==u||R.getState().selected_id!==u||(Ve=null,Xe(u))};if(!oe){st.then(m);return}m()},Ze=function(){let u=Yn(Be);return u===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:u}}},Ce=function(u){if(u)for(let[m,V]of An){if(Ee.has(m)||_e.has(m))continue;let G=m===ht?Ze():{type:V};try{J.register(m,G)}catch(re){e("register %s store failed: %o",m,re)}_e.add(m),Q.subscribeList(m,G).then(re=>{Ee.set(m,re)}).catch(re=>{e("subscribe %s failed: %o",m,re),_(re,"board")}).finally(()=>{_e.delete(m)})}else k()},k=function(){for(let[u]of An){let m=Ee.get(u);m&&(m().catch(()=>{}),Ee.delete(u));try{J.unregister(u)}catch(V){e("unregister %s failed: %o",u,V)}}},ue=function(u){if(!u){ge();return}for(let[m,V]of Eo)if(!(U.has(m)||_e.has(m))){try{J.register(m,{type:V})}catch(G){e("register %s store failed: %o",m,G)}_e.add(m),Q.subscribeList(m,{type:V}).then(G=>{U.set(m,G)}).catch(G=>{e("subscribe %s failed: %o",m,G),_(G,"worker")}).finally(()=>{_e.delete(m)})}ee||(Y("subscribe-worker-queue",{id:Co}).catch(m=>{e("subscribe-worker-queue failed: %o",m)}),ee=()=>Y("unsubscribe-worker-queue",{id:Co}))},ge=function(){for(let[u]of Eo){let m=U.get(u);m&&(m().catch(()=>{}),U.delete(u));try{J.unregister(u)}catch(V){e("unregister %s failed: %o",u,V)}}ee&&(ee().catch(()=>{}),ee=null)},ye=function(){le||(Y("subscribe-ui-order",{id:Ro}).catch(u=>{e("subscribe-ui-order failed: %o",u)}),le=()=>Y("unsubscribe-ui-order",{id:Ro}))},se=function(){le&&(le().catch(()=>{}),le=null),Me.clear()},Pe=function(){te||(Y("subscribe-display-policy",{id:Lo}).catch(u=>{e("subscribe-display-policy failed: %o",u)}),te=()=>Y("unsubscribe-display-policy",{id:Lo}))},De=function(){te&&(te().catch(()=>{}),te=null),Te.clear()},P=function(u){if(!u)return"Unknown";let m=u.split("/").filter(Boolean);return m.length>0?m[m.length-1]:"Unknown"};var l=_,a=ie,c=Ne,p=Ae,h=Ze,b=Ce,$=k,v=ue,C=ge,N=ye,M=se,F=Pe,B=De,I=P;let S=document.getElementById("header-loading"),x=gs(S),w=mo(t),z=To(),Y=x.wrapSend((u,m)=>z.send(u,m)),Q=cs(Y),J=ds(),Ie=ps(),Me=us(),Te=Vn(),Ke=Zn();z.on("ui-order-snapshot",u=>{let m=u;if(m&&typeof m.revision=="number")try{Me.set({revision:m.revision,order:m.order&&typeof m.order=="object"?m.order:{}})}catch{}}),z.on("display-policy-snapshot",u=>{let m=u;if(m&&m.policy&&typeof m.policy=="object")try{Te.set(m.policy)}catch{}}),z.on("session-log-snapshot",u=>{let m=u;if(m&&typeof m.attempt_id=="string")try{Ke.set(m.attempt_id,Array.isArray(m.lines)?m.lines:[])}catch{}}),z.on("session-log-append",u=>{let m=u;if(m&&typeof m.attempt_id=="string")try{Ke.append(m.attempt_id,m.event)}catch{}}),z.on("snapshot",u=>{let m=u,V=m&&typeof m.id=="string"?m.id:"",G=V?J.getStore(V):null;if(G&&m&&m.type==="snapshot")try{G.applyPush(m)}catch{}}),z.on("upsert",u=>{let m=u,V=m&&typeof m.id=="string"?m.id:"",G=V?J.getStore(V):null;if(G&&m&&m.type==="upsert")try{G.applyPush(m)}catch{}}),z.on("delete",u=>{let m=u,V=m&&typeof m.id=="string"?m.id:"",G=V?J.getStore(V):null;if(G&&m&&m.type==="delete")try{G.applyPush(m)}catch{}});let We=null,ve=null,Se=null,Ve=null,me=()=>{},st=new Promise(u=>{me=()=>u(void 0)}),oe=!1,Ge=!1;async function Xe(u){let m=ie(u);if(m===ve||m===Se)return;Se=m;let V=`detail:${u}`,G={type:"issue-detail",params:{id:u}};try{J.register(V,G)}catch(re){e("register detail store failed: %o",re)}try{let re=await Q.subscribeList(V,G);if(R.getState().selected_id!==u||ie(u)!==m){await re().catch(()=>{});return}We&&await We().catch(()=>{}),We=re,ve=m}catch(re){e("detail subscribe failed: %o",re),_(re,"issue details")}finally{Se===m&&(Se=null)}}let Ee=new Map,_e=new Set,Be=or;try{let u=window.localStorage.getItem(Io);qr(u)&&(Be=u)}catch{}async function y(u){if(!qr(u)||u===Be)return;Be=u;try{window.localStorage.setItem(Io,u)}catch{}let m=Ee.get(ht);if(!m)return;Ee.delete(ht),await m().catch(()=>{});let V=Ze();try{J.register(ht,V)}catch(G){e("register %s store failed: %o",ht,G)}try{let G=await Q.subscribeList(ht,V);Ee.set(ht,G)}catch(G){e("re-subscribe %s failed: %o",ht,G),_(G,"board")}}let U=new Map,ee=null,le=null,te=null;async function Re(){te=null,Te.clear(),ee=null;let u=R.getState().workspace.current?.path;if(u)try{await z.send("set-workspace",{path:u})}catch(m){e("workspace restore after reconnect failed: %o",m);return}Pe(),ue(R.getState().view==="worker")}async function T(){e("clearing all subscriptions for workspace switch"),k(),ge(),Ie.clear(),se(),ye(),De(),Pe(),Ne();let u=R.getState();if(u.selected_id)try{J.unregister(`detail:${u.selected_id}`)}catch{}let m=R.getState();Ce(m.view==="board"),ue(m.view==="worker"),m.selected_id&&Ae(m.selected_id)}async function D(u){e("requesting workspace switch to %s",u),Ge=!0;try{let m=await z.send("set-workspace",{path:u});e("workspace switch result: %o",m),m&&m.workspace&&(R.setState({workspace:{current:{path:m.workspace.root_dir,database:m.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",u),m.changed&&(await T(),X("Switched to "+P(u),"success",2e3)))}catch(m){throw e("workspace switch failed: %o",m),X("Failed to switch workspace","error",3e3),m}finally{Ge=!1}}async function Z(u){e("requesting workspace git pull for %s",u);try{let m=await z.send("git-pull-workspace",{});e("workspace git pull result: %o",m);let V=m?.status;if(V==="up_to_date"){X("Already up to date","success",2e3);return}if(V==="stash_pop_conflict"){X("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}X("Git pulled "+P(u),"success",2e3)}catch(m){e("workspace git pull failed: %o",m);let V=m?.code,G=m?.message;if(V==="rebase_conflict"){X("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(V==="rebase_conflict_abort_failed"){X("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(V==="busy"){X("Git pull skipped: another operation is running","warning",3e3);return}let re=G?`: ${G}`:"";throw X(`Git pull failed${re}`,"error",3e3),m}}async function j(u,m){e("setting workspace visibility %s \u2192 %s",u,String(m));try{await z.send("set-workspace-visibility",{path:u,visible:m}),await g()}catch(V){e("workspace visibility update failed: %o",V),X("Failed to update project visibility","error",3e3)}}async function g(){try{let u=await z.send("list-workspaces",{});if(e("workspaces loaded: %o",u),u&&Array.isArray(u.workspaces)){let m=u.workspaces.map(we=>({path:we.path,database:we.database,pid:we.pid,version:we.version})),V=u.current?{path:u.current.root_dir,database:u.current.db_path}:null,G=Array.isArray(u.hidden)?u.hidden.filter(we=>typeof we=="string"):[];R.setState({workspace:{current:V,available:m,hidden:G}});let re=window.localStorage.getItem("beads-ui.workspace");re&&(!m.some(nr=>nr.path===re)||G.includes(re)?window.localStorage.removeItem("beads-ui.workspace"):V&&re!==V.path&&(e("restoring saved workspace preference: %s",re),await D(re)))}}catch(u){e("failed to load workspaces: %o",u)}}z.on("workspace-changed",u=>{e("workspace-changed event: %o",u),u&&u.root_dir&&(R.setState({workspace:{current:{path:u.root_dir,database:u.db_path}}}),g(),T())});let E=!1;if(typeof z.onConnection=="function"){let u=m=>{e("ws state %s",m),m==="reconnecting"||m==="closed"?(E=!0,X("Connection lost. Reconnecting\u2026","error",4e3)):m==="open"&&E&&(E=!1,X("Reconnected","success",2200),dl(R,(V,G)=>{e(`${V}: %o`,G)}),Re())};z.onConnection(u)}let A="board";try{let u=window.localStorage.getItem("beads-ui.view");(u==="board"||u==="worker")&&(A=u)}catch(u){e("view parse error: %o",u)}let R=ms({config:cl(),view:A});z.on("worker-queue-snapshot",u=>{let m=u;if(!m||!m.queue)return;let V=R.getState().workspace.current?.path;if(typeof V=="string"&&V.length>0&&m.root_dir!==V){e("dropping worker-queue snapshot for %s",String(m.root_dir));return}try{Ie.set(m.queue)}catch{}});let K=fs(R);K.start();let ce=async(u,m)=>{try{return await Y(u,m)}catch{return[]}};n&&go(n,R,K);let H=document.getElementById("workspace-picker");H&&xo(H,R,D,Z,j);let Le=wo(t,(u,m)=>Y(u,m));try{let u=document.getElementById("new-issue-btn");u&&u.addEventListener("click",()=>Le.open())}catch{}let it=ho(t,{policyStore:Te,transport:(u,m)=>Y(u,m),labelOptions:()=>{let u=new Set;for(let[m]of An)for(let V of J.snapshotFor(m)||[]){let G=V.labels;if(Array.isArray(G))for(let re of G)typeof re=="string"&&re.length>0&&u.add(re)}return Array.from(u).sort()}});try{let u=document.getElementById("display-settings-btn");u&&u.addEventListener("click",()=>it.open())}catch{}let at=$s(s,{gotoIssue:u=>K.gotoIssue(u),issueStores:J,transport:ce,uiOrderStore:Me,displayPolicyStore:Te,closedRange:Be,onClosedRangeChange:u=>{y(u)},onNewIssue:()=>Le.open()}),St=$n(o,{transport:ce,issueStores:J,queueStore:Ie,sessionLogStore:Ke,uiOrderStore:Me,gotoIssue:u=>R.setState({selected_id:u})}),Je=po(i,{issueStores:J,transport:ce,queueStore:Ie,sessionLogStore:Ke,getWorkspacePath:()=>R.getState().workspace.current?.path,onNavigate:u=>{R.getState().view==="worker"?R.setState({selected_id:u}):K.gotoIssue(u)},onClose:()=>{let u=R.getState();R.setState({selected_id:null});try{K.gotoView(u.view==="worker"?"worker":"board")}catch{}}}),O=R.getState().selected_id;O&&(i.hidden=!1,Je.load(O),Ae(O)),R.subscribe(u=>{let m=u.selected_id;m?(i.hidden=!1,Je.load(m),Ge||Ae(m)):(Je.clear(),i.hidden=!0,Ne())});let pe=u=>{s.hidden=u.view!=="board",o.hidden=u.view!=="worker",Ce(u.view==="board"),ue(u.view==="worker"),!u.selected_id&&u.view==="board"&&at.load(),u.view==="worker"&&St.load(),window.localStorage.setItem("beads-ui.view",u.view)};R.subscribe(pe),pe(R.getState()),ye(),Pe(),g().finally(()=>{oe=!0,me()}),window.addEventListener("keydown",u=>{let m=u.ctrlKey||u.metaKey,V=String(u.key||"").toLowerCase(),G=u.target,re=G&&G.tagName?String(G.tagName).toLowerCase():"",we=re==="input"||re==="textarea"||re==="select"||G&&typeof G.isContentEditable=="boolean"&&G.isContentEditable;m&&V==="n"&&(we||(u.preventDefault(),Le.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let r=window.localStorage.getItem("beads-ui.theme"),n=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=r==="dark"||r==="light"?r:n?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let t=document.getElementById("theme-switch");t&&t.addEventListener("change",()=>{let r=t.checked?"dark":"light";document.documentElement.setAttribute("data-theme",r),window.localStorage.setItem("beads-ui.theme",r)});let e=document.getElementById("app");e&&ul(e)});export{ul as bootstrap,cl as readBootstrapConfig,dl as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
