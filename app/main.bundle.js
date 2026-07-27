var Po=Object.create;var Rr=Object.defineProperty;var Fo=Object.getOwnPropertyDescriptor;var Bo=Object.getOwnPropertyNames;var qo=Object.getPrototypeOf,zo=Object.prototype.hasOwnProperty;var Uo=(t,e,r)=>e in t?Rr(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r;var Lr=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports);var Ho=(t,e,r,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of Bo(e))!zo.call(t,s)&&s!==r&&Rr(t,s,{get:()=>e[s],enumerable:!(n=Fo(e,s))||n.enumerable});return t};var Wo=(t,e,r)=>(r=t!=null?Po(qo(t)):{},Ho(e||!t||!t.__esModule?Rr(r,"default",{value:t,enumerable:!0}):r,t));var de=(t,e,r)=>Uo(t,typeof e!="symbol"?e+"":e,r);var Xn=Lr((vl,Kn)=>{var Rt=1e3,Lt=Rt*60,It=Lt*60,kt=It*24,Zo=kt*7,Ko=kt*365.25;Kn.exports=function(t,e){e=e||{};var r=typeof t;if(r==="string"&&t.length>0)return Xo(t);if(r==="number"&&isFinite(t))return e.long?Jo(t):Qo(t);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(t))};function Xo(t){if(t=String(t),!(t.length>100)){var e=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(t);if(e){var r=parseFloat(e[1]),n=(e[2]||"ms").toLowerCase();switch(n){case"years":case"year":case"yrs":case"yr":case"y":return r*Ko;case"weeks":case"week":case"w":return r*Zo;case"days":case"day":case"d":return r*kt;case"hours":case"hour":case"hrs":case"hr":case"h":return r*It;case"minutes":case"minute":case"mins":case"min":case"m":return r*Lt;case"seconds":case"second":case"secs":case"sec":case"s":return r*Rt;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r;default:return}}}}function Qo(t){var e=Math.abs(t);return e>=kt?Math.round(t/kt)+"d":e>=It?Math.round(t/It)+"h":e>=Lt?Math.round(t/Lt)+"m":e>=Rt?Math.round(t/Rt)+"s":t+"ms"}function Jo(t){var e=Math.abs(t);return e>=kt?ir(t,e,kt,"day"):e>=It?ir(t,e,It,"hour"):e>=Lt?ir(t,e,Lt,"minute"):e>=Rt?ir(t,e,Rt,"second"):t+" ms"}function ir(t,e,r,n){var s=e>=r*1.5;return Math.round(t/r)+" "+n+(s?"s":"")}});var Jn=Lr(($l,Qn)=>{function ei(t){r.debug=r,r.default=r,r.coerce=a,r.disable=i,r.enable=s,r.enabled=l,r.humanize=Xn(),r.destroy=c,Object.keys(t).forEach(h=>{r[h]=t[h]}),r.names=[],r.skips=[],r.formatters={};function e(h){let g=0;for(let b=0;b<h.length;b++)g=(g<<5)-g+h.charCodeAt(b),g|=0;return r.colors[Math.abs(g)%r.colors.length]}r.selectColor=e;function r(h){let g,b=null,$,k;function L(...N){if(!L.enabled)return;let q=L,H=Number(new Date),j=H-(g||H);q.diff=j,q.prev=g,q.curr=H,g=H,N[0]=r.coerce(N[0]),typeof N[0]!="string"&&N.unshift("%O");let O=0;N[0]=N[0].replace(/%([a-zA-Z%])/g,(x,v)=>{if(x==="%%")return"%";O++;let p=r.formatters[v];if(typeof p=="function"){let C=N[O];x=p.call(q,C),N.splice(O,1),O--}return x}),r.formatArgs.call(q,N),(q.log||r.log).apply(q,N)}return L.namespace=h,L.useColors=r.useColors(),L.color=r.selectColor(h),L.extend=n,L.destroy=r.destroy,Object.defineProperty(L,"enabled",{enumerable:!0,configurable:!1,get:()=>b!==null?b:($!==r.namespaces&&($=r.namespaces,k=r.enabled(h)),k),set:N=>{b=N}}),typeof r.init=="function"&&r.init(L),L}function n(h,g){let b=r(this.namespace+(typeof g>"u"?":":g)+h);return b.log=this.log,b}function s(h){r.save(h),r.namespaces=h,r.names=[],r.skips=[];let g=(typeof h=="string"?h:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let b of g)b[0]==="-"?r.skips.push(b.slice(1)):r.names.push(b)}function o(h,g){let b=0,$=0,k=-1,L=0;for(;b<h.length;)if($<g.length&&(g[$]===h[b]||g[$]==="*"))g[$]==="*"?(k=$,L=b,$++):(b++,$++);else if(k!==-1)$=k+1,L++,b=L;else return!1;for(;$<g.length&&g[$]==="*";)$++;return $===g.length}function i(){let h=[...r.names,...r.skips.map(g=>"-"+g)].join(",");return r.enable(""),h}function l(h){for(let g of r.skips)if(o(h,g))return!1;for(let g of r.names)if(o(h,g))return!0;return!1}function a(h){return h instanceof Error?h.stack||h.message:h}function c(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return r.enable(r.load()),r}Qn.exports=ei});var es=Lr((je,ar)=>{je.formatArgs=ri;je.save=ni;je.load=si;je.useColors=ti;je.storage=oi();je.destroy=(()=>{let t=!1;return()=>{t||(t=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();je.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function ti(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let t;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(t=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(t[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function ri(t){if(t[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+t[0]+(this.useColors?"%c ":" ")+"+"+ar.exports.humanize(this.diff),!this.useColors)return;let e="color: "+this.color;t.splice(1,0,e,"color: inherit");let r=0,n=0;t[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(r++,s==="%c"&&(n=r))}),t.splice(n,0,e)}je.log=console.debug||console.log||(()=>{});function ni(t){try{t?je.storage.setItem("debug",t):je.storage.removeItem("debug")}catch{}}function si(){let t;try{t=je.storage.getItem("debug")||je.storage.getItem("DEBUG")}catch{}return!t&&typeof process<"u"&&"env"in process&&(t=process.env.DEBUG),t}function oi(){try{return localStorage}catch{}}ar.exports=Jn()(je);var{formatters:ii}=ar.exports;ii.j=function(t){try{return JSON.stringify(t)}catch(e){return"[UnexpectedJSONParseError]: "+e.message}}});var Ft=globalThis,sr=Ft.trustedTypes,Nn=sr?sr.createPolicy("lit-html",{createHTML:t=>t}):void 0,Un="$lit$",dt=`lit$${Math.random().toFixed(9).slice(2)}$`,Hn="?"+dt,Go=`<${Hn}>`,yt=document,Bt=()=>yt.createComment(""),qt=t=>t===null||typeof t!="object"&&typeof t!="function",Fr=Array.isArray,jo=t=>Fr(t)||typeof t?.[Symbol.iterator]=="function",Ir=`[ 	
\f\r]`,Pt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Pn=/-->/g,Fn=/>/g,_t=RegExp(`>|${Ir}(?:([^\\s"'>=/]+)(${Ir}*=${Ir}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Bn=/'/g,qn=/"/g,Wn=/^(?:script|style|textarea|title)$/i,Br=t=>(e,...r)=>({_$litType$:t,strings:e,values:r}),f=Br(1),gl=Br(2),_l=Br(3),wt=Symbol.for("lit-noChange"),ve=Symbol.for("lit-nothing"),zn=new WeakMap,bt=yt.createTreeWalker(yt,129);function Gn(t,e){if(!Fr(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return Nn!==void 0?Nn.createHTML(e):e}var Yo=(t,e)=>{let r=t.length-1,n=[],s,o=e===2?"<svg>":e===3?"<math>":"",i=Pt;for(let l=0;l<r;l++){let a=t[l],c,h,g=-1,b=0;for(;b<a.length&&(i.lastIndex=b,h=i.exec(a),h!==null);)b=i.lastIndex,i===Pt?h[1]==="!--"?i=Pn:h[1]!==void 0?i=Fn:h[2]!==void 0?(Wn.test(h[2])&&(s=RegExp("</"+h[2],"g")),i=_t):h[3]!==void 0&&(i=_t):i===_t?h[0]===">"?(i=s??Pt,g=-1):h[1]===void 0?g=-2:(g=i.lastIndex-h[2].length,c=h[1],i=h[3]===void 0?_t:h[3]==='"'?qn:Bn):i===qn||i===Bn?i=_t:i===Pn||i===Fn?i=Pt:(i=_t,s=void 0);let $=i===_t&&t[l+1].startsWith("/>")?" ":"";o+=i===Pt?a+Go:g>=0?(n.push(c),a.slice(0,g)+Un+a.slice(g)+dt+$):a+dt+(g===-2?l:$)}return[Gn(t,o+(t[r]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),n]},zt=class t{constructor({strings:e,_$litType$:r},n){let s;this.parts=[];let o=0,i=0,l=e.length-1,a=this.parts,[c,h]=Yo(e,r);if(this.el=t.createElement(c,n),bt.currentNode=this.el.content,r===2||r===3){let g=this.el.content.firstChild;g.replaceWith(...g.childNodes)}for(;(s=bt.nextNode())!==null&&a.length<l;){if(s.nodeType===1){if(s.hasAttributes())for(let g of s.getAttributeNames())if(g.endsWith(Un)){let b=h[i++],$=s.getAttribute(g).split(dt),k=/([.?@])?(.*)/.exec(b);a.push({type:1,index:o,name:k[2],strings:$,ctor:k[1]==="."?Or:k[1]==="?"?Mr:k[1]==="@"?Nr:Ct}),s.removeAttribute(g)}else g.startsWith(dt)&&(a.push({type:6,index:o}),s.removeAttribute(g));if(Wn.test(s.tagName)){let g=s.textContent.split(dt),b=g.length-1;if(b>0){s.textContent=sr?sr.emptyScript:"";for(let $=0;$<b;$++)s.append(g[$],Bt()),bt.nextNode(),a.push({type:2,index:++o});s.append(g[b],Bt())}}}else if(s.nodeType===8)if(s.data===Hn)a.push({type:2,index:o});else{let g=-1;for(;(g=s.data.indexOf(dt,g+1))!==-1;)a.push({type:7,index:o}),g+=dt.length-1}o++}}static createElement(e,r){let n=yt.createElement("template");return n.innerHTML=e,n}};function Et(t,e,r=t,n){if(e===wt)return e;let s=n!==void 0?r._$Co?.[n]:r._$Cl,o=qt(e)?void 0:e._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(t),s._$AT(t,r,n)),n!==void 0?(r._$Co??(r._$Co=[]))[n]=s:r._$Cl=s),s!==void 0&&(e=Et(t,s._$AS(t,e.values),s,n)),e}var Dr=class{constructor(e,r){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:r},parts:n}=this._$AD,s=(e?.creationScope??yt).importNode(r,!0);bt.currentNode=s;let o=bt.nextNode(),i=0,l=0,a=n[0];for(;a!==void 0;){if(i===a.index){let c;a.type===2?c=new Ut(o,o.nextSibling,this,e):a.type===1?c=new a.ctor(o,a.name,a.strings,this,e):a.type===6&&(c=new Pr(o,this,e)),this._$AV.push(c),a=n[++l]}i!==a?.index&&(o=bt.nextNode(),i++)}return bt.currentNode=yt,s}p(e){let r=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(e,n,r),r+=n.strings.length-2):n._$AI(e[r])),r++}},Ut=class t{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,r,n,s){this.type=2,this._$AH=ve,this._$AN=void 0,this._$AA=e,this._$AB=r,this._$AM=n,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,r=this._$AM;return r!==void 0&&e?.nodeType===11&&(e=r.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,r=this){e=Et(this,e,r),qt(e)?e===ve||e==null||e===""?(this._$AH!==ve&&this._$AR(),this._$AH=ve):e!==this._$AH&&e!==wt&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):jo(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==ve&&qt(this._$AH)?this._$AA.nextSibling.data=e:this.T(yt.createTextNode(e)),this._$AH=e}$(e){let{values:r,_$litType$:n}=e,s=typeof n=="number"?this._$AC(e):(n.el===void 0&&(n.el=zt.createElement(Gn(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===s)this._$AH.p(r);else{let o=new Dr(s,this),i=o.u(this.options);o.p(r),this.T(i),this._$AH=o}}_$AC(e){let r=zn.get(e.strings);return r===void 0&&zn.set(e.strings,r=new zt(e)),r}k(e){Fr(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,n,s=0;for(let o of e)s===r.length?r.push(n=new t(this.O(Bt()),this.O(Bt()),this,this.options)):n=r[s],n._$AI(o),s++;s<r.length&&(this._$AR(n&&n._$AB.nextSibling,s),r.length=s)}_$AR(e=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);e!==this._$AB;){let n=e.nextSibling;e.remove(),e=n}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},Ct=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,r,n,s,o){this.type=1,this._$AH=ve,this._$AN=void 0,this.element=e,this.name=r,this._$AM=s,this.options=o,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=ve}_$AI(e,r=this,n,s){let o=this.strings,i=!1;if(o===void 0)e=Et(this,e,r,0),i=!qt(e)||e!==this._$AH&&e!==wt,i&&(this._$AH=e);else{let l=e,a,c;for(e=o[0],a=0;a<o.length-1;a++)c=Et(this,l[n+a],r,a),c===wt&&(c=this._$AH[a]),i||(i=!qt(c)||c!==this._$AH[a]),c===ve?e=ve:e!==ve&&(e+=(c??"")+o[a+1]),this._$AH[a]=c}i&&!s&&this.j(e)}j(e){e===ve?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},Or=class extends Ct{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===ve?void 0:e}},Mr=class extends Ct{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==ve)}},Nr=class extends Ct{constructor(e,r,n,s,o){super(e,r,n,s,o),this.type=5}_$AI(e,r=this){if((e=Et(this,e,r,0)??ve)===wt)return;let n=this._$AH,s=e===ve&&n!==ve||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,o=e!==ve&&(n===ve||s);s&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},Pr=class{constructor(e,r,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=r,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){Et(this,e)}};var Vo=Ft.litHtmlPolyfillSupport;Vo?.(zt,Ut),(Ft.litHtmlVersions??(Ft.litHtmlVersions=[])).push("3.3.1");var ce=(t,e,r)=>{let n=r?.renderBefore??e,s=n._$litPart$;if(s===void 0){let o=r?.renderBefore??null;n._$litPart$=s=new Ut(e.insertBefore(Bt(),o),o,void 0,r??{})}return s._$AI(t),s};var or="today",jn=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}];function qr(t){return t==="today"||t==="7d"||t==="30d"||t==="all"}function Yn(t,e=Date.now()){switch(t){case"today":{let r=new Date(e);return r.setHours(0,0,0,0),r.getTime()}case"7d":return e-7*864e5;case"30d":return e-30*864e5;case"all":default:return}}function Vn(){let t=null,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{get(){return t},set(n){t=n,r()},clear(){t=null,r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}function Zn(){let t=new Map,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{set(n,s){t.set(n,{lines:Array.isArray(s)?[...s]:[]}),r()},append(n,s){let o=t.get(n)||{lines:[]};o.lines=[...o.lines,s],t.set(n,o),r()},get(n){return t.get(n)||null},clear(n){typeof n=="string"?t.delete(n):t.clear(),r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}var ts=Wo(es(),1);function ye(t){return(0,ts.default)(`beads-ui:${t}`)}function Je(t){if(typeof t=="number")return Number.isFinite(t)?t:0;if(typeof t=="string"){let e=Date.parse(t);return Number.isFinite(e)?e:0}return 0}function Ht(t,e){let r=Je(t.created_at),n=Je(e.created_at);if(r!==n)return r<n?1:-1;let s=t.priority??2,o=e.priority??2;if(s!==o)return s-o;let i=t.id,l=e.id;return i<l?-1:i>l?1:0}function ss(t,e){let r=Je(t.created_at),n=Je(e.created_at);if(r!==n)return r<n?-1:1;let s=t.priority??2,o=e.priority??2;if(s!==o)return s-o;let i=t.id,l=e.id;return i<l?-1:i>l?1:0}function os(t,e){let r=Je(t.updated_at),n=Je(e.updated_at);if(r!==n)return r<n?1:-1;let s=t.id,o=e.id;return s<o?-1:s>o?1:0}function is(t,e){let r=t.priority??2,n=e.priority??2;if(r!==n)return r-n;let s=Je(t.created_at),o=Je(e.created_at);if(s!==o)return s<o?1:-1;let i=t.id,l=e.id;return i<l?-1:i>l?1:0}function as(t,e){let r=t.closed_at??0,n=e.closed_at??0;if(r!==n)return r<n?1:-1;let s=t?.id,o=e?.id;return s<o?-1:s>o?1:0}var ai=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function rs(t){let e=t&&t.metadata,r=e?e.task_order:void 0;if(r==null||r==="")return Number.POSITIVE_INFINITY;let n=Number(r);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function ns(t){let e=t&&t.title;if(typeof e!="string")return Number.POSITIVE_INFINITY;let r=ai.exec(e);if(!r)return Number.POSITIVE_INFINITY;let n=Number(r[1]);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function ls(t,e){let r=rs(t),n=rs(e);if(r!==n)return r<n?-1:1;let s=ns(t),o=ns(e);if(s!==o)return s<o?-1:1;let i=Je(t&&t.created_at),l=Je(e&&e.created_at);if(i!==l)return i<l?-1:1;let a=t&&t.id,c=e&&e.id;return a===c?0:String(a)<String(c)?-1:1}var zr=2**20;function Dt(t,e){let r=t&&t.id;return e&&typeof r=="string"&&Object.prototype.hasOwnProperty.call(e,r)&&typeof e[r]=="number"&&Number.isFinite(e[r])?e[r]:-Je(t&&t.created_at)}function lr(t){return(e,r)=>{let n=Dt(e,t),s=Dt(r,t);if(n!==s)return n<s?-1:1;let o=e?.id,i=r?.id;return o<i?-1:o>i?1:0}}function Ur(t,e,r){let n=Array.isArray(t)?t:[],s=n.length,o=Math.max(0,Math.min(e,s-1)),i=o-1>=0?n[o-1]:null,l=o+1<s?n[o+1]:null;if(!i&&!l)return{rank:0};if(!i)return{rank:Dt(l,r)-zr};if(!l)return{rank:Dt(i,r)+zr};let a=Dt(i,r),c=Dt(l,r),h=(a+c)/2;return a<h&&h<c?{rank:h}:{renormalize:n.map((g,b)=>({bead_id:g.id,rank:b*zr}))}}function Hr(t,e={}){let r=ye(`issue-store:${t}`),n=new Map,s=[],o=0,i=new Set,l=!1,a=e.sort||Ht;function c(){for(let b of Array.from(i))try{b()}catch{}}function h(){s=Array.from(n.values()).sort(a)}function g(b){if(l||!b||b.id!==t)return;let $=Number(b.revision)||0;if(r("apply %s rev=%d",b.type,$),!($<=o&&b.type!=="snapshot")){if(b.type==="snapshot"){if($<=o)return;n.clear();let k=Array.isArray(b.issues)?b.issues:[];for(let L of k)L&&typeof L.id=="string"&&L.id.length>0&&n.set(L.id,L);h(),o=$,c();return}if(b.type==="upsert"){let k=b.issue;if(k&&typeof k.id=="string"&&k.id.length>0){let L=n.get(k.id);if(!L)n.set(k.id,k);else{let N=Number.isFinite(L.updated_at)?L.updated_at:0,q=Number.isFinite(k.updated_at)?k.updated_at:0;if(N<=q){for(let H of Object.keys(L))H in k||delete L[H];for(let[H,j]of Object.entries(k))L[H]=j}}h()}o=$,c()}else if(b.type==="delete"){let k=String(b.issue_id||"");k&&(n.delete(k),h()),o=$,c()}}}return{id:t,subscribe(b){return i.add(b),()=>{i.delete(b)}},applyPush:g,snapshot(){return s},size(){return n.size},getById(b){return n.get(b)},dispose(){l=!0,n.clear(),s=[],i.clear(),o=0}}}function cr(t){let e=String(t.type||"").trim(),r={};if(t.params&&typeof t.params=="object"){let s=Object.keys(t.params).sort();for(let o of s){let i=t.params[o];r[o]=String(i)}}let n=new URLSearchParams(r).toString();return n.length>0?`${e}?${n}`:e}function cs(t){let e=ye("subs"),r=new Map,n=new Map;function s(l,a){e("applyDelta %s +%d ~%d -%d",l,(a.added||[]).length,(a.updated||[]).length,(a.removed||[]).length);let c=n.get(l);if(!c||c.size===0)return;let h=Array.isArray(a.added)?a.added:[],g=Array.isArray(a.updated)?a.updated:[],b=Array.isArray(a.removed)?a.removed:[];for(let $ of Array.from(c)){let k=r.get($);if(!k)continue;let L=k.itemsById;for(let N of h)typeof N=="string"&&N.length>0&&L.set(N,!0);for(let N of g)typeof N=="string"&&N.length>0&&L.set(N,!0);for(let N of b)typeof N=="string"&&N.length>0&&L.delete(N)}}async function o(l,a){let c=cr(a);if(e("subscribe %s key=%s",l,c),!r.has(l))r.set(l,{key:c,itemsById:new Map});else{let g=r.get(l);if(g&&g.key!==c){let b=n.get(g.key);b&&(b.delete(l),b.size===0&&n.delete(g.key)),r.set(l,{key:c,itemsById:new Map})}}n.has(c)||n.set(c,new Set);let h=n.get(c);h&&h.add(l);try{await t("subscribe-list",{id:l,type:a.type,params:a.params})}catch(g){let b=r.get(l)||null;if(b){let $=n.get(b.key);$&&($.delete(l),$.size===0&&n.delete(b.key))}throw r.delete(l),g}return async()=>{e("unsubscribe %s key=%s",l,c);try{await t("unsubscribe-list",{id:l})}catch{}let g=r.get(l)||null;if(g){let b=n.get(g.key);b&&(b.delete(l),b.size===0&&n.delete(g.key))}r.delete(l)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:cr,selectors:{getIds(l){let a=r.get(l);return a?Array.from(a.itemsById.keys()):[]},has(l,a){let c=r.get(l);return c?c.itemsById.has(a):!1},count(l){let a=r.get(l);return a?a.itemsById.size:0},getItemsById(l){let a=r.get(l),c={};if(!a)return c;for(let h of a.itemsById.keys())c[h]=!0;return c}}}}function ds(){let t=ye("issue-stores"),e=new Map,r=new Map,n=new Set,s=new Map;function o(){for(let a of Array.from(n))try{a()}catch{}}function i(a,c,h){let g=c?cr(c):"",b=r.get(a)||"",$=e.has(a);if(t("register %s key=%s (prev=%s)",a,g,b),$&&b&&g&&b!==g){let k=e.get(a);if(k)try{k.dispose()}catch{}let L=s.get(a);if(L){try{L()}catch{}s.delete(a)}let N=Hr(a,h);e.set(a,N);let q=N.subscribe(()=>o());s.set(a,q)}else if(!$){let k=Hr(a,h);e.set(a,k);let L=k.subscribe(()=>o());s.set(a,L)}return r.set(a,g),()=>l(a)}function l(a){t("unregister %s",a),r.delete(a);let c=e.get(a);c&&(c.dispose(),e.delete(a));let h=s.get(a);if(h){try{h()}catch{}s.delete(a)}}return{register:i,unregister:l,getStore(a){return e.get(a)||null},snapshotFor(a){let c=e.get(a);return c?c.snapshot().slice():[]},subscribe(a){return n.add(a),()=>n.delete(a)}}}function us(){let t=null,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{get(){return t},set(n){t=n,r()},clear(){t=null,r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}function ps(){let t=null,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{get(){return t},set(n){t=n,r()},clear(){t=null,r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}function Wr(t,e){return`#/${t==="worker"?"worker":"board"}?issue=${encodeURIComponent(e)}`}function li(t){let e=String(t||""),r=e.startsWith("#")?e.slice(1):e,n=r.indexOf("?"),s=n>=0?r.slice(n+1):"";if(s){let l=new URLSearchParams(s).get("issue");if(l)return decodeURIComponent(l)}let o=/^\/issue\/([^\s?#]+)/.exec(r);return o&&o[1]?decodeURIComponent(o[1]):null}function ci(t){let e=String(t||"");return/^#\/worker(\b|\/|$)/.test(e)?"worker":"board"}function fs(t){let e=ye("router"),r=()=>{let n=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(n),o=s&&s[1]?decodeURIComponent(s[1]):li(n),i=ci(n);if(e("hash change \u2192 view=%s id=%s",i,o),t.setState({selected_id:i==="worker"?null:o,view:i,worker:{selected_parent_id:i==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(n)){let a=o?`#/${i}?issue=${encodeURIComponent(o)}`:`#/${i}`;window.location.hash!==a&&(window.location.hash=a)}};return{start(){window.addEventListener("hashchange",r),r()},stop(){window.removeEventListener("hashchange",r)},gotoIssue(n){let o=(t.getState?t.getState():{view:"board"}).view==="worker"?"worker":"board",i=Wr(o,n);e("goto issue %s (view=%s)",n,o),window.location.hash!==i?window.location.hash=i:t.setState({selected_id:o==="worker"?null:n,view:o,worker:{selected_parent_id:o==="worker"?n:null}})},gotoView(n){let s=t.getState?t.getState():{selected_id:null,worker:{selected_parent_id:null}},o=n==="worker"?s.worker?.selected_parent_id:s.selected_id,i=o?Wr(n,o):`#/${n}`;e("goto view %s (id=%s)",n,o||""),window.location.hash!==i?window.location.hash=i:t.setState({view:n,selected_id:n==="worker"?null:s.selected_id})}}}var di=Object.freeze({workspace_config:{default_workspace:null}});function hs(t){return{workspace_config:{default_workspace:typeof t?.workspace_config?.default_workspace=="string"&&t.workspace_config.default_workspace.length>0?t.workspace_config.default_workspace:di.workspace_config.default_workspace}}}function ms(t={}){let e=ye("state"),r={selected_id:t.selected_id??null,view:t.view??"board",filters:{status:t.filters?.status??"all",search:t.filters?.search??"",type:typeof t.filters?.type=="string"?t.filters?.type:""},board:{closed_filter:t.board?.closed_filter==="3"||t.board?.closed_filter==="7"||t.board?.closed_filter==="today"?t.board?.closed_filter:"today",show_deferred_column:t.board?.show_deferred_column===!0},worker:{selected_parent_id:t.worker?.selected_parent_id??null,show_closed_children:Array.isArray(t.worker?.show_closed_children)?t.worker.show_closed_children:[]},workspace:{current:t.workspace?.current??null,available:t.workspace?.available??[],hidden:t.workspace?.hidden??[]},config:hs(t.config)},n=new Set;function s(){for(let o of Array.from(n))try{o(r)}catch{}}return{getState(){return r},setState(o){let i={...r,...o,filters:{...r.filters,...o.filters||{}},board:{...r.board,...o.board||{}},worker:{...r.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:r.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:r.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:r.workspace.hidden},config:o.config!==void 0?hs(o.config):r.config},l=i.workspace.current?.path!==r.workspace.current?.path||i.workspace.available.length!==r.workspace.available.length||i.workspace.hidden.length!==r.workspace.hidden.length||i.workspace.hidden.some((c,h)=>c!==r.workspace.hidden[h]),a=i.config.workspace_config.default_workspace!==r.config.workspace_config.default_workspace;i.selected_id===r.selected_id&&i.view===r.view&&i.filters.status===r.filters.status&&i.filters.search===r.filters.search&&i.filters.type===r.filters.type&&i.board.closed_filter===r.board.closed_filter&&i.board.show_deferred_column===r.board.show_deferred_column&&i.worker.selected_parent_id===r.worker.selected_parent_id&&i.worker.show_closed_children.length===r.worker.show_closed_children.length&&i.worker.show_closed_children.every((c,h)=>c===r.worker.show_closed_children[h])&&!l&&!a||(r=i,e("state change %o",{selected_id:r.selected_id,view:r.view,filters:r.filters,board:r.board,worker:r.worker,workspace:r.workspace.current?.path,config:{default_workspace:r.config.workspace_config.default_workspace}}),s())},subscribe(o){return n.add(o),()=>n.delete(o)}}}function gs(t){let e=ye("activity"),r=0,n=new Map,s=1;function o(){if(!t)return;let c=r>0;t.toggleAttribute("hidden",!c),t.setAttribute("aria-busy",c?"true":"false")}function i(){r+=1,e("start count=%d",r),o()}function l(){let c=r;r=Math.max(0,r-1),c<=0?e("done called but count was already %d",c):e("done count=%d\u2192%d",c,r),o()}function a(c){return async(g,b)=>{let $=s++,k=Date.now();n.set($,{type:g,start_ts:k}),e("request start id=%d type=%s count=%d",$,g,r+1),i();let L=!1,N=()=>{L||(L=!0,n.delete($),l())},q=setTimeout(()=>{L||(e("request TIMEOUT id=%d type=%s elapsed=%dms",$,g,Date.now()-k),N())},3e4);try{let H=await c(g,b),j=Date.now()-k;return e("request done id=%d type=%s elapsed=%dms",$,g,j),H}catch(H){let j=Date.now()-k;throw e("request error id=%d type=%s elapsed=%dms err=%o",$,g,j,H),H}finally{clearTimeout(q),N()}}}return o(),{wrapSend:a,start:i,done:l,getCount:()=>r,getActiveRequests:()=>{let c=Date.now();return Array.from(n.entries()).map(([h,g])=>({id:h,type:g.type,elapsed_ms:c-g.start_ts}))}}}function J(t,e="info",r=2800){let n=document.createElement("div");n.className="toast",n.textContent=t,n.style.position="fixed",n.style.right="12px",n.style.bottom="12px",n.style.zIndex="1000",n.style.color="#fff",n.style.padding="8px 10px",n.style.borderRadius="4px",n.style.fontSize="12px",e==="success"?n.style.background="#156d36":e==="warning"?n.style.background="#a36a00":e==="error"?n.style.background="#9f2011":n.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(n),setTimeout(()=>{try{n.remove()}catch{}},r)}function dr(t=void 0,e=void 0){function r(){if(!e||typeof e.get!="function")return null;let o=e.get();return o&&o.order?o.order:{}}function n(o,i,l){let a=t&&t.snapshotFor?t.snapshotFor(o).slice():[];if(i==="closed")return a.sort(as),a;switch(l){case"created_desc":return a.sort(Ht),a;case"created_asc":return a.sort(ss),a;case"updated_desc":return a.sort(os),a;case"priority":return a.sort(is),a;case"manual":default:{let c=r();return c?a.sort(lr(c)):a.sort(Ht),a}}}function s(o){let i=[];return t&&typeof t.subscribe=="function"&&i.push(t.subscribe(o)),e&&typeof e.subscribe=="function"&&i.push(e.subscribe(o)),()=>{for(let l of i)try{l()}catch{}}}return{selectBoardColumn:n,subscribe:s}}function ur(t){let e=t.transport,r=t.uiOrderStore;function n(i,l){return"renormalize"in i?i.renormalize:[{bead_id:l,rank:i.rank}]}function s(i,l){let a={...i.order};for(let c of l)a[c.bead_id]=c.rank;r&&r.set({revision:i.revision,order:a})}async function o(i,l,a){if(!e||!r)return;let c=r.get()||{revision:0,order:{}},h=n(Ur(l,a,c.order),i);s(c,h);let g=await e("ui-order-set",{expected_revision:c.revision,entries:h});if(g&&g.conflict){let b={revision:typeof g.revision=="number"?g.revision:0,order:g.order||{}};r.set(b);let $=n(Ur(l,a,b.order),i);s(b,$);let k=await e("ui-order-set",{expected_revision:b.revision,entries:$});k&&k.applied&&r.set({revision:typeof k.revision=="number"?k.revision:0,order:k.order||{}})}else g&&g.applied&&r.set({revision:typeof g.revision=="number"?g.revision:0,order:g.order||{}})}return{applyReorder:o}}function pr(t){return Array.isArray(t)?t.filter(e=>typeof e=="string"):[]}function Gr(t,e){return!e||typeof t!="string"||t.length===0||pr(e.visible_labels).includes(t)?!0:pr(e.hidden_labels).includes(t)?!1:!pr(e.hidden_prefixes).some(r=>r.length>0&&t.startsWith(r))}function _s(t,e){return pr(t).filter(r=>Gr(r,e))}function vt(t,e){let r=t&&t.chips?t.chips[e]:void 0;return typeof r=="boolean"?r:!0}function jr(t){if(!t)return null;if(typeof t=="number")return Number.isFinite(t)?t:null;let e=Date.parse(t);return Number.isFinite(e)?e:null}function ut(t){let e=jr(t);if(e===null)return"";let r=new Date(e),n=s=>String(s).padStart(2,"0");return`${r.getFullYear()}-${n(r.getMonth()+1)}-${n(r.getDate())} ${n(r.getHours())}:${n(r.getMinutes())}`}function Yr(t,e){let r=jr(t);if(r===null)return"";let s=(typeof e=="number"?e:Date.now())-r;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let i=Math.floor(s/36e5);if(i<24)return`${i}\uC2DC\uAC04 \uC804`;let l=Math.floor(s/864e5);if(l<7)return`${l}\uC77C \uC804`;let a=Math.floor(l/7);if(l<30)return`${a}\uC8FC \uC804`;let c=Math.floor(l/30);return c<12?`${c}\uAC1C\uC6D4 \uC804`:`${Math.floor(l/365)}\uB144 \uC804`}var ui={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg"},pi={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge"},fi={spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},hi={reviewed:"\u2713",skip:"\u2298",stale:"\u2713"};function mi(t,e,r){if(!(r==="in_progress"||r==="resolved"))return null;for(let s of t)if(e[s]&&e[s].state==="dim")return s;return null}function gi(t,e,r){let n=ui[t]||t,s=e&&e.state||"empty",o=hi[s]||"",i="bar";s==="dim"?i+=` b-${n} dim`:s==="on"||s==="reviewed"||s==="skip"?i+=` b-${n} on`:s==="stale"&&(i+=` b-${n} stale`),r&&(i+=" glow");let l=s==="empty"?"lbl":`lbl l-${n} on`,a=r?`color: var(--stage-${n}-on)`:"";return f`
    <div class="seg">
      <div class=${i} style=${a}>${o}</div>
      <div class=${l}>
        ${pi[t]||t}
      </div>
    </div>
  `}function fr(t,e){if(!t||!t.stages)return"";let r=t.route==="full_plan"?"full_plan":"spec_backed",n=fi[r],s=t.stages,o=mi(n,s,String(e||"open"));return f`
    <div class="stp" role="img" aria-label="워크플로우 진행 스테퍼">
      ${n.map(i=>gi(i,s[i]||{state:"empty"},i===o))}
    </div>
  `}function _i(t){return typeof t!="number"||!Number.isFinite(t)?"":`P${Math.max(0,Math.min(4,t))}`}var bs=2;function bi(t){if(!t)return[];let e=[];if(t.external){let n=t.reason?`\u23F8 blocked: ${t.reason}`:"\u23F8 blocked";e.push(f`<span class="ctl-chip ctl-chip--blocked">${n}</span>`)}let r=Array.isArray(t.blockers)?t.blockers:[];if(r.length>0){let n=r.slice(0,bs).join(", "),s=r.length-bs,o=`\u26D3 blocked: ${n}${s>0?` +${s}`:""}`;e.push(f`<span class="ctl-chip ctl-chip--blocked-dep">${o}</span>`)}return e}function yi(t,e){let r=e.policy||null,n=t.workflow&&t.workflow.chips||{},s=[];if(n.route&&vt(r,"route")){let o=n.route_source==="derived";s.push(f`<span
        class="ctl-chip ctl-chip--route${o?" is-derived":""}"
        title=${o?"route \uCD94\uB860\uAC12 (metadata \uBBF8\uD540)":"route"}
        >${o?`${n.route} ?`:n.route}</span
      >`)}if(n.fast_track&&vt(r,"fast_track")&&s.push(f`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),n.pr&&vt(r,"pr")){let o=n.pr.number;s.push(f`<span class="ctl-chip ctl-chip--pr"
        >${`PR${o!=null?` #${o}`:""}`}</span
      >`)}for(let o of _s(t.labels,r))s.push(f`<span class="ctl-chip ctl-chip--label">${o}</span>`);return t.from_id&&vt(r,"from")&&s.push(f`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${t.from_id} \uC5F4\uAE30`}
        @click=${o=>{o.stopPropagation(),e.onFromChipClick&&e.onFromChipClick(o,String(t.from_id))}}
      >
        ↩ from ${t.from_id}
      </button>`),vt(r,"blocked")&&s.push(...bi(t.blocked_info)),s.length===0?"":f`<div class="board-card__chips">${s}</div>`}function wi(t){switch(t){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function ki(t){let e=Yr(t.created_at),r=Yr(t.updated_at);return!e&&!r?"":f`<span class="board-card__times">
    ${e?f`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${ut(t.created_at)}`}
          >생성 ${e}</span
        >`:""}
    ${e&&r?f`<span class="board-card__time-sep">·</span>`:""}
    ${r?f`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${ut(t.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </span>`}function vi(t,e){let r=e.rollupFor?e.rollupFor(t.id):{total:0,count:0,current:null,children:[]},n=r.total||0,s=e.isExpanded?e.isExpanded(t.id):!0,o=n>0?r.children.slice().sort(ls):r.children;return f`
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
        ${ki(t)}
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
                  <span class=${wi(i.status)}>●</span>
                  <span class="board-card__roll-child-ord">${l+1}</span>
                  <span class="board-card__roll-child-title"
                    >${i.title||i.id}</span
                  >
                </button>`)}
          </div>`:""}
    </div>
  `}function ys(t,e){let r=_i(t.priority);return f`
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
      ${yi(t,e)}
      ${t.workflow&&vt(e.policy||null,"stepper")?fr(t.workflow,t.status):""}
      ${vi(t,e)}
    </article>
  `}function $t(t,e){let r=Array.isArray(t.items)?t.items.length:0,n=t.is_closed===!0;return f`
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
  `}var $i=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],xi=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],Si=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function Ai(t,e,r){let n=t.labels.length,s=n>0?`\uB77C\uBCA8 ${n}`:"\uB77C\uBCA8";return f`
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
        ${$i.map(n=>f`<option
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
        ${xi.map(n=>f`<option
              value=${n.value}
              ?selected=${t.type===n.value}
            >
              ${n.label}
            </option>`)}
      </select>
      ${Ai(t,e,r)}
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
        ${Si.map(n=>f`<option
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
  `}var Ti=200,Ei={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","deferred-col":"deferred","closed-col":"closed"},Ci=new Set(["blocked-col","ready-col","in-progress-col","resolved-col","deferred-col"]),ks="beads-ui.board.sort",vs=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function Ri(){try{let t=window.localStorage.getItem(ks);if(t&&vs.has(t))return t}catch{}return"created_desc"}function $s(t,e){let r=ye("views:board"),n=e.gotoIssue,s=e.issueStores,o=e.transport,i=e.uiOrderStore,l=e.displayPolicyStore,a=e.onClosedRangeChange,c=e.onNewIssue,h=e.closedRange||or,g=s?dr(s,i):null,b=ur({transport:o,uiOrderStore:i}),$=[],k=[],L=[],N=[],q=[],H=[],j=!1,O=0,S=Ri(),x=new Map,v=new Map,p=new Map,C=new Set,P={search:"",priority:"",type:"",labels:[]},W=!1,K=null;function Re(T){return String(T.status||"open")==="open"}function Be(T){let D=String(T.status||"open");return D==="open"||D==="blocked"}function Se(T){let D=P.search.trim().toLowerCase(),X=P.priority,V=P.type,F=P.labels;return T.filter(_=>{if(D){let E=String(_.id||"").toLowerCase(),A=String(_.title||"").toLowerCase();if(!E.includes(D)&&!A.includes(D))return!1}if(X!==""&&String(_.priority)!==X||V!==""&&String(_.issue_type||"")!==V)return!1;if(F.length>0){let E=Array.isArray(_.labels)?_.labels:[];if(!F.some(A=>E.includes(A)))return!1}return!0})}function Ke(){let T=new Set;for(let D of[$,k,L,N,q,H])for(let X of D){let V=Array.isArray(X.labels)?X.labels:[];for(let F of V)typeof F=="string"&&F.length>0&&T.add(F)}return Array.from(T).sort()}function We(){return P.search.trim()!==""||P.priority!==""||P.type!==""||P.labels.length>0}function we(){try{if(g){let T=g.selectBoardColumn("tab:board:in-progress","in_progress",S),D=g.selectBoardColumn("tab:board:blocked","blocked",S).filter(Be),X=new Set(T.map(G=>G.id)),V=g.selectBoardColumn("tab:board:ready","ready",S).filter(G=>Re(G)&&!X.has(G.id)),F=g.selectBoardColumn("tab:board:resolved","resolved",S),_=g.selectBoardColumn("tab:board:deferred","deferred",S),E=j?_:[],A=g.selectBoardColumn("tab:board:closed","closed").slice(0,Ti),R=[...D,...V,...T,...F,...E,...A];Ae(R);let ee=new Set;for(let G of R)G&&G.id&&!Vr(G)&&ee.add(G.id);let te=!We();$=te?Ot(D,ee):D,k=te?Ot(V,ee):V,L=te?Ot(T,ee):T,N=te?Ot(F,ee):F,q=te?Ot(E,ee):E,O=_.length,H=te?Ot(A,ee):A,x=new Map;for(let G of $)x.set(G.id,"open");for(let G of k)x.set(G.id,"open");for(let G of L)x.set(G.id,"in_progress");for(let G of N)x.set(G.id,"resolved");for(let G of q)x.set(G.id,"deferred");for(let G of H)x.set(G.id,"closed");v=new Map;for(let G of $)v.set(G.id,"blocked-col");for(let G of k)v.set(G.id,"ready-col");for(let G of L)v.set(G.id,"in-progress-col");for(let G of N)v.set(G.id,"resolved-col");for(let G of q)v.set(G.id,"deferred-col");for(let G of H)v.set(G.id,"closed-col")}B()}catch{$=[],k=[],L=[],N=[],q=[],H=[],p=new Map,B()}}function Ae(T){let D=new Map;for(let V of T)V&&V.id&&!D.has(V.id)&&D.set(V.id,V);let X=new Map;for(let V of D.values()){let F=Vr(V);if(!F)continue;let _=X.get(F);_||(_=[],X.set(F,_)),_.push({id:V.id,title:V.title,status:V.status,metadata:V.metadata,created_at:V.created_at})}p=X}function Ye(T){let D=p.get(T)||[],X=0,V=null;for(let F of D)(F.status==="resolved"||F.status==="closed")&&(X+=1),!V&&F.status==="in_progress"&&(V=F);return{total:D.length,count:X,current:V,children:D}}function ue(T){return!C.has(T)}function nt(T,D){T.preventDefault(),T.stopPropagation(),C.has(D)?C.delete(D):C.add(D),B()}function pe(T,D){T.preventDefault(),T.stopPropagation(),n(D)}function $e(T,D){T.preventDefault(),T.stopPropagation(),n(D)}function oe(T,D){K||n(D)}function Me(T,D){T.preventDefault(),T.stopPropagation(),Li(D).then(X=>{X&&J("\uBCF5\uC0AC\uB428","success",1200)})}function Ve(T,D){K=D,T.dataTransfer&&(T.dataTransfer.setData("text/plain",D),T.dataTransfer.effectAllowed="move"),T.target.classList.add("board-card--dragging")}function Ee(T){T.target.classList.remove("board-card--dragging"),ke(),setTimeout(()=>{K=null},0)}function Ce(T){let D=String(T.target.value||"");!D||D===h||(h=D,a&&a(D),B())}let _e={onCardClick:oe,onCopyId:Me,onDragStart:Ve,onDragEnd:Ee,onClosedRangeChange:Ce,rollupFor:Ye,isExpanded:ue,onRollupToggle:nt,onChildClick:pe,onFromChipClick:$e,get policy(){return l?l.get():null}};function Ne(T){let D=T.target,X=t.querySelector(".board-filter__labels");D&&X&&X.contains(D)||Pe()}function Ze(T){T.key==="Escape"&&Pe()}function Le(){W||(W=!0,document.addEventListener("mousedown",Ne),document.addEventListener("keydown",Ze),B())}function Pe(){W&&(W=!1,document.removeEventListener("mousedown",Ne),document.removeEventListener("keydown",Ze),B())}let y={onSearchInput(T){P.search=String(T.target.value||""),we()},onPriorityChange(T){P.priority=String(T.target.value||""),we()},onTypeChange(T){P.type=String(T.target.value||""),we()},onSortChange(T){let D=String(T.target.value||"");if(!(!vs.has(D)||D===S)){S=D;try{window.localStorage.setItem(ks,D)}catch{}we()}},onDeferredToggle(){j=!j,we()},onLabelMenuToggle(){W?Pe():Le()},onLabelToggle(T){let D=P.labels.indexOf(T);D===-1?P.labels.push(T):P.labels.splice(D,1),we()},onLabelClear(){P.labels.length!==0&&(P.labels=[],we())},onNewIssue(){c&&c()}};function w(){let T=j?"board-root board-root--deferred":"board-root";return f`
      <div class="board-view">
        ${ws(P,y,{sort_mode:S,show_deferred:j,deferred_count:O,label_options:Ke(),label_menu_open:W})}
        <div class=${T}>
          ${$t({title:"Blocked",id:"blocked-col",items:Se($)},_e)}
          ${$t({title:"Ready",id:"ready-col",items:Se(k)},_e)}
          ${$t({title:"In progress",id:"in-progress-col",items:Se(L)},_e)}
          ${$t({title:"Resolved",id:"resolved-col",items:Se(N)},_e)}
          ${j?$t({title:"Deferred",id:"deferred-col",items:Se(q)},_e):""}
          ${$t({title:"Closed",id:"closed-col",items:Se(H),is_closed:!0,closed_range:h},_e)}
        </div>
      </div>
    `}function B(){ce(w(),t),se()}function se(){try{let T=Array.from(t.querySelectorAll(".board-column"));for(let D of T)Array.from(D.querySelectorAll(".board-card")).forEach((V,F)=>{V.tabIndex=F===0?0:-1})}catch{}}async function fe(T,D){if(!o){J("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:T,status:D}),J("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(X){r("update-status failed: %o",X),J("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function he(T){switch(T){case"blocked-col":return $;case"ready-col":return k;case"in-progress-col":return L;case"resolved-col":return N;case"deferred-col":return q;default:return[]}}function me(T,D,X){if(!o||!i)return;let V=he(T),F=V.find(ee=>ee.id===D);if(!F)return;let _=V.filter(ee=>ee.id!==D),E=X.closest?X.closest(".board-card"):null,A=_.length;if(E){let ee=E.getAttribute("data-issue-id");if(ee===D)return;let te=_.findIndex(G=>G.id===ee);te>=0&&(A=te)}let R=_.slice();R.splice(A,0,F),b.applyReorder(D,R,A)}function ke(){for(let T of Array.from(t.querySelectorAll(".board-column--drag-over")))T.classList.remove("board-column--drag-over")}let Q=null;t.addEventListener("dragover",T=>{T.preventDefault(),T.dataTransfer&&(T.dataTransfer.dropEffect="move");let X=T.target.closest(".board-column");X&&X!==Q&&(Q&&Q.classList.remove("board-column--drag-over"),X.classList.add("board-column--drag-over"),Q=X)}),t.addEventListener("dragleave",T=>{let D=T.relatedTarget;(!D||!t.contains(D))&&Q&&(Q.classList.remove("board-column--drag-over"),Q=null)}),t.addEventListener("drop",T=>{T.preventDefault(),Q&&(Q.classList.remove("board-column--drag-over"),Q=null);let D=T.target,X=D.closest(".board-column");if(!X)return;let V=T.dataTransfer?.getData("text/plain")||"";if(!V)return;let F=X.id,_=v.get(V);if(_&&_===F){if(Ci.has(F)){if(S!=="manual"){J("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}me(F,V,D)}return}let E=Ei[F];if(!E){J("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}x.get(V)!==E&&fe(V,E)}),t.addEventListener("keydown",T=>{let D=T.target;if(!(D instanceof HTMLElement))return;let X=String(D.tagName||"").toLowerCase();if(X==="input"||X==="textarea"||X==="select"||X==="button"||X==="a"||D.isContentEditable===!0)return;let V=D.closest(".board-card");if(!V)return;let F=String(T.key||"");if(F==="Enter"||F===" "){T.preventDefault();let R=V.getAttribute("data-issue-id");R&&n(R);return}if(F!=="ArrowUp"&&F!=="ArrowDown"&&F!=="ArrowLeft"&&F!=="ArrowRight")return;T.preventDefault();let _=V.closest(".board-column");if(!_)return;let E=Array.from(_.querySelectorAll(".board-card")),A=E.indexOf(V);if(F==="ArrowDown"&&A<E.length-1){ae(V,E[A+1]);return}if(F==="ArrowUp"&&A>0){ae(V,E[A-1]);return}if(F==="ArrowLeft"||F==="ArrowRight"){let R=Array.from(t.querySelectorAll(".board-column")),ee=R.indexOf(_),te=F==="ArrowRight"?1:-1,G=ee+te;for(;G>=0&&G<R.length;){let Te=R[G].querySelector(".board-card");if(Te){ae(V,Te);return}G+=te}}});function ae(T,D){try{T.tabIndex=-1,D.tabIndex=0,D.focus()}catch{}}let Ie=null;g&&g.subscribe&&(Ie=g.subscribe(()=>{try{we()}catch{}}));let De=null;return l&&l.subscribe&&(De=l.subscribe(()=>{try{we()}catch{}})),{async load(){r("load"),we()},clear(){Pe(),Ie&&(Ie(),Ie=null),De&&(De(),De=null),t.replaceChildren(),$=[],k=[],L=[],N=[],q=[],H=[],x=new Map,v=new Map}}}function Vr(t){let e=t&&t.parent;return typeof e=="string"?e:e&&e.id?String(e.id):""}function Ot(t,e){return t.filter(r=>{let n=Vr(r);return!(n&&e.has(n))})}async function Li(t){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(t)),!0;let e=document.createElement("textarea");e.value=String(t),e.style.position="fixed",e.style.left="-9999px",document.body.appendChild(e),e.select();let r=!1;try{r=document.execCommand("copy")}finally{e.remove()}return r}catch{return!1}}async function Mt(t){let e=String(t);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(e),!0}catch{}try{let r=document.createElement("textarea");r.value=e,r.style.position="fixed",r.style.left="-9999px",document.body.appendChild(r),r.select();let n=!1;try{n=document.execCommand("copy")}finally{r.remove()}return n}catch{return!1}}var Ii={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},Di=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,Oi=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function pt(t){return!!t&&typeof t=="object"}function Zr(t){return typeof t!="string"||t.length===0?[]:t.split(/\r?\n/)}function xs(t,e){let r=Zr(t),n=Zr(e),s=new Map;for(let l of r)s.set(l,(s.get(l)||0)+1);let o=0;for(let l of n){let a=s.get(l)||0;a>0?s.set(l,a-1):o+=1}let i=0;for(let l of s.values())i+=l;return{added:o,removed:i}}function Mi(t){let e="";typeof t=="string"?e=t:Array.isArray(t)?e=t.map(s=>pt(s)&&typeof s.text=="string"?s.text:"").join(""):pt(t)&&typeof t.text=="string"&&(e=t.text);let n=(String(e).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return n.length>120?`${n.slice(0,117)}\u2026`:n}function Ni(t){let e=String(t.name||""),r=t.input||{},n={kind:"tool",tool:e,icon:Ii[e]||"\u{1F527}",input:r,expandable:!0};if((e==="Read"||e==="Write")&&(n.path=String(r.file_path||r.path||"")),e==="Write"&&(n.added=Zr(r.content).length),e==="Edit"){n.path=String(r.file_path||r.path||"");let{added:s,removed:o}=xs(r.old_string,r.new_string);n.added=s,n.removed=o}if(e==="MultiEdit"){n.path=String(r.file_path||r.path||"");let s=0,o=0,i=Array.isArray(r.edits)?r.edits:[];for(let l of i){let a=xs(pt(l)?l.old_string:"",pt(l)?l.new_string:"");s+=a.added,o+=a.removed}n.added=s,n.removed=o}return e==="Bash"&&(n.command=String(r.command||"")),(e==="Grep"||e==="Glob")&&(n.command=String(r.pattern||r.query||"")),n}function Ss(t){let e=t.split(/\r?\n/).find(n=>n.trim().length>0)||"",r=Di.exec(e);return r?{kind:"gate",gate:r[2]==="implementation"?"impl":r[2],reviewer:r[3],verdict:r[4],time:r[5]?r[5].trim():void 0,text:e.trim()}:Oi.test(e)&&e.trim().length<=80?{kind:"phase",text:e.trim()}:{kind:"assistant",text:t}}function Pi(t,e){if(t.type==="assistant"){let r=t.message,n=r&&Array.isArray(r.content)?r.content:[],s=[];for(let o of n)if(pt(o)){if(o.type==="text"&&typeof o.text=="string")s.push(Ss(o.text));else if(o.type==="tool_use"){let i=Ni(o);typeof o.id=="string"&&e.set(o.id,i),s.push(i)}}return s}if(t.type==="user"){let r=t.message,n=r&&Array.isArray(r.content)?r.content:[];for(let s of n)if(pt(s)&&s.type==="tool_result"){let o=e.get(String(s.tool_use_id));if(o){let i=Mi(s.content);o.result=i,o.output=typeof s.content=="string"?s.content:i}}return[]}if(t.type==="result"){let r=t.is_error===!1&&t.subtype==="success";return[{kind:"result",success:r,text:typeof t.result=="string"?t.result:r?"DONE":""}]}return[]}function Fi(t){if(t.type==="item.completed"&&pt(t.item)){let e=t.item;return e.type==="agent_message"&&typeof e.text=="string"?[Ss(e.text)]:e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}if(t.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(t.type==="turn.failed"){let e=t.error;return[{kind:"error",text:e&&typeof e.message=="string"?e.message:"turn failed"}]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:[]}function Bi(t){let e=t.type;return typeof e=="string"&&(e==="error"||e.startsWith("thread.")||e.startsWith("turn.")||e.startsWith("item."))}function As(t){let e=[],r=new Map,n=Array.isArray(t)?t:[];for(let s of n){let o=s;if(typeof s=="string"){let l=s.trim();if(l.length===0)continue;try{o=JSON.parse(l)}catch{continue}}if(!pt(o))continue;let i=Bi(o)?Fi(o):Pi(o,r);for(let l of i)e.push(l)}return e}function hr(t,e={}){let{transport:r,sessionLogStore:n,onClose:s}=e,o=null,i={},l=!0,a=new Set,c=null;function h(){if(!o||!n)return[];let v=n.get(o);return As(v?v.lines:[])}function g(v,p){if(p.kind==="gate")return f`<div class="sv__gate">${p.text}</div>`;if(p.kind==="phase")return f`<div class="sv__phase">${p.text}</div>`;if(p.kind==="result")return f`<div
        class="sv__result${p.success?" sv__result--ok":" sv__result--fail"}"
      >
        ${p.success?"\u2713":"\u2717"}
        ${p.text||(p.success?"DONE":"\uC2E4\uD328")}
      </div>`;if(p.kind==="error")return f`<div class="sv__error">⛔ ${p.text}</div>`;if(p.kind==="blocker")return f`<div class="sv__error">⛔ ${p.text}</div>`;if(p.kind==="tool"){let C=a.has(v),P=p.tool==="Bash"?p.command:p.path||p.command||"";return f`<div
        class="sv__tool${C?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>N(v)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${p.icon}</span>
          <span class="sv__tool-name">${p.tool}</span>
          ${P?f`<span class="sv__tool-detail">${P}</span>`:""}
          ${typeof p.added=="number"?f`<span class="sv__diff-add">+${p.added}</span>`:""}
          ${typeof p.removed=="number"?f`<span class="sv__diff-del">−${p.removed}</span>`:""}
          ${p.result?f`<span class="sv__tool-ok">→ ${p.result}</span>`:""}
        </span>
        ${C?f`<pre class="sv__tool-expand">${b(p)}</pre>`:""}
      </div>`}return f`<div class="sv__as">${p.text}</div>`}function b(v){let p=[];if(v.input!==void 0)try{p.push(`input: ${JSON.stringify(v.input,null,2)}`)}catch{}return typeof v.output=="string"&&v.output.length>0&&p.push(`output:
${v.output}`),p.join(`

`)}function $(){if(!o)return f``;let v=h(),p=[i.runner,i.model,i.effort].filter(Boolean).join(" \xB7 "),C=i.session_id||"",P=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${l?"ON":"OFF"}`;return f`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id">${o}</span>
        ${C?f`<button
              type="button"
              class="sv__session"
              title=${C}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${C}`}
              @click=${()=>H(C)}
            >
              ⧉ ${C.slice(0,8)}
            </button>`:""}
        ${p?f`<span class="sv__meta">${p}</span>`:""}
        ${i.worktree?f`<span class="sv__wt" title=${i.worktree}
              >${i.worktree}</span
            >`:""}
        <button
          type="button"
          class="sv__follow${l?" sv__follow--on":""}"
          aria-pressed=${l?"true":"false"}
          aria-label=${P}
          @click=${q}
        >
          <span class="sv__follow-full">⇣ ${P}</span>
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
        ${v.length===0?f`<div class="sv__empty">세션 로그 없음</div>`:v.map((W,K)=>g(K,W))}
      </div>
    </div>`}function k(){ce($(),t),l&&L()}function L(){let v=t.querySelector(".sv__body");v&&(v.scrollTop=v.scrollHeight)}function N(v){a.has(v)?a.delete(v):a.add(v),k()}function q(){l=!l,k()}function H(v){Mt(v).then(p=>{p?J("\uBCF5\uC0AC\uB428","success",1200):J("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function j(v){!o||!v||(i={...i,...v},k())}function O(v){let p=v.target;if(!p||!p.classList||!p.classList.contains("sv__body"))return;!(p.scrollHeight-p.scrollTop-p.clientHeight<=4)&&l&&(l=!1,k())}t.addEventListener("scroll",O,!0);function S(v){let p=v&&v.attempt_id;p&&(o=p,i=v.meta||{},l=!0,a.clear(),!c&&n&&(c=n.subscribe(k)),r&&Promise.resolve(r("subscribe-session-log",{id:`session-log:${o}`,attempt_id:o})).catch(()=>{}),k())}function x(){let v=o;o=null,a.clear(),r&&v&&Promise.resolve(r("unsubscribe-session-log",{id:`session-log:${v}`})).catch(()=>{}),ce(f``,t),s&&s()}return{open:S,updateMeta:j,close:x,isOpen(){return o!==null},destroy(){c&&(c(),c=null),t.removeEventListener("scroll",O,!0),o=null,ce(f``,t)}}}function qi(t){let e=t&&t.metadata||{},r=[];return typeof e.spec_id=="string"&&e.spec_id.trim().length>0&&r.push({kind:"spec",path:e.spec_id.trim()}),typeof e.plan_path=="string"&&e.plan_path.trim().length>0&&r.push({kind:"plan",path:e.plan_path.trim()}),r}function Ts(t,e){let r=qi(t);return f`
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
  `}var Kr=["opus","sonnet","haiku","fable"],Xr=["low","medium","high","xhigh"],Qr=["codex","opus","fable","self","skip"],Jr=["opus","fable","sonnet","haiku"],zi=["standard","fast_track"],en={orchestration_model:"(\uAE30\uBCF8: CLI \uAE30\uBCF8 \uBAA8\uB378)",orchestration_effort:"(\uAE30\uBCF8: CLI \uAE30\uBCF8)",review_model:"(\uAE30\uBCF8: codex)",impl_model:"(\uAE30\uBCF8: \uD2F0\uC5B4 \uC790\uB3D9)"};function mr(t,e){let r=e&&e[t];return typeof r=="string"&&r.length>0?`(\uAE30\uBCF8: ${r} \u2014 \uC804\uC5ED)`:en[t]||"(\uAE30\uBCF8)"}function Wt(t,e,r,n,s,o){return f`
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
    ${Wt("workflow_mode","workflow_mode",Gt(zi),o,n.workflow_mode==="fast_track",e)}
  `}var{entries:Ps,setPrototypeOf:Cs,isFrozen:Ui,getPrototypeOf:Hi,getOwnPropertyDescriptor:Wi}=Object,{freeze:ze,seal:Qe,create:ln}=Object,{apply:cn,construct:dn}=typeof Reflect<"u"&&Reflect;ze||(ze=function(e){return e});Qe||(Qe=function(e){return e});cn||(cn=function(e,r){for(var n=arguments.length,s=new Array(n>2?n-2:0),o=2;o<n;o++)s[o-2]=arguments[o];return e.apply(r,s)});dn||(dn=function(e){for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return new e(...n)});var gr=Ue(Array.prototype.forEach),Gi=Ue(Array.prototype.lastIndexOf),Rs=Ue(Array.prototype.pop),jt=Ue(Array.prototype.push),ji=Ue(Array.prototype.splice),br=Ue(String.prototype.toLowerCase),tn=Ue(String.prototype.toString),rn=Ue(String.prototype.match),Yt=Ue(String.prototype.replace),Yi=Ue(String.prototype.indexOf),Vi=Ue(String.prototype.trim),et=Ue(Object.prototype.hasOwnProperty),qe=Ue(RegExp.prototype.test),Vt=Zi(TypeError);function Ue(t){return function(e){e instanceof RegExp&&(e.lastIndex=0);for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return cn(t,e,n)}}function Zi(t){return function(){for(var e=arguments.length,r=new Array(e),n=0;n<e;n++)r[n]=arguments[n];return dn(t,r)}}function ne(t,e){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:br;Cs&&Cs(t,null);let n=e.length;for(;n--;){let s=e[n];if(typeof s=="string"){let o=r(s);o!==s&&(Ui(e)||(e[n]=o),s=o)}t[s]=!0}return t}function Ki(t){for(let e=0;e<t.length;e++)et(t,e)||(t[e]=null);return t}function lt(t){let e=ln(null);for(let[r,n]of Ps(t))et(t,r)&&(Array.isArray(n)?e[r]=Ki(n):n&&typeof n=="object"&&n.constructor===Object?e[r]=lt(n):e[r]=n);return e}function Zt(t,e){for(;t!==null;){let n=Wi(t,e);if(n){if(n.get)return Ue(n.get);if(typeof n.value=="function")return Ue(n.value)}t=Hi(t)}function r(){return null}return r}var Ls=ze(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),nn=ze(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),sn=ze(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Xi=ze(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),on=ze(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Qi=ze(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Is=ze(["#text"]),Ds=ze(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),an=ze(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Os=ze(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),_r=ze(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Ji=Qe(/\{\{[\w\W]*|[\w\W]*\}\}/gm),ea=Qe(/<%[\w\W]*|[\w\W]*%>/gm),ta=Qe(/\$\{[\w\W]*/gm),ra=Qe(/^data-[\-\w.\u00B7-\uFFFF]+$/),na=Qe(/^aria-[\-\w]+$/),Fs=Qe(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),sa=Qe(/^(?:\w+script|data):/i),oa=Qe(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Bs=Qe(/^html$/i),ia=Qe(/^[a-z][.\w]*(-[.\w]+)+$/i),Ms=Object.freeze({__proto__:null,ARIA_ATTR:na,ATTR_WHITESPACE:oa,CUSTOM_ELEMENT:ia,DATA_ATTR:ra,DOCTYPE_NAME:Bs,ERB_EXPR:ea,IS_ALLOWED_URI:Fs,IS_SCRIPT_OR_DATA:sa,MUSTACHE_EXPR:Ji,TMPLIT_EXPR:ta}),Kt={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},aa=function(){return typeof window>"u"?null:window},la=function(e,r){if(typeof e!="object"||typeof e.createPolicy!="function")return null;let n=null,s="data-tt-policy-suffix";r&&r.hasAttribute(s)&&(n=r.getAttribute(s));let o="dompurify"+(n?"#"+n:"");try{return e.createPolicy(o,{createHTML(i){return i},createScriptURL(i){return i}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},Ns=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function qs(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:aa(),e=Y=>qs(Y);if(e.version="3.3.0",e.removed=[],!t||!t.document||t.document.nodeType!==Kt.document||!t.Element)return e.isSupported=!1,e;let{document:r}=t,n=r,s=n.currentScript,{DocumentFragment:o,HTMLTemplateElement:i,Node:l,Element:a,NodeFilter:c,NamedNodeMap:h=t.NamedNodeMap||t.MozNamedAttrMap,HTMLFormElement:g,DOMParser:b,trustedTypes:$}=t,k=a.prototype,L=Zt(k,"cloneNode"),N=Zt(k,"remove"),q=Zt(k,"nextSibling"),H=Zt(k,"childNodes"),j=Zt(k,"parentNode");if(typeof i=="function"){let Y=r.createElement("template");Y.content&&Y.content.ownerDocument&&(r=Y.content.ownerDocument)}let O,S="",{implementation:x,createNodeIterator:v,createDocumentFragment:p,getElementsByTagName:C}=r,{importNode:P}=n,W=Ns();e.isSupported=typeof Ps=="function"&&typeof j=="function"&&x&&x.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:K,ERB_EXPR:Re,TMPLIT_EXPR:Be,DATA_ATTR:Se,ARIA_ATTR:Ke,IS_SCRIPT_OR_DATA:We,ATTR_WHITESPACE:we,CUSTOM_ELEMENT:Ae}=Ms,{IS_ALLOWED_URI:Ye}=Ms,ue=null,nt=ne({},[...Ls,...nn,...sn,...on,...Is]),pe=null,$e=ne({},[...Ds,...an,...Os,..._r]),oe=Object.seal(ln(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Me=null,Ve=null,Ee=Object.seal(ln(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),Ce=!0,_e=!0,Ne=!1,Ze=!0,Le=!1,Pe=!0,y=!1,w=!1,B=!1,se=!1,fe=!1,he=!1,me=!0,ke=!1,Q="user-content-",ae=!0,Ie=!1,De={},T=null,D=ne({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),X=null,V=ne({},["audio","video","img","source","image","track"]),F=null,_=ne({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),E="http://www.w3.org/1998/Math/MathML",A="http://www.w3.org/2000/svg",R="http://www.w3.org/1999/xhtml",ee=R,te=!1,G=null,Te=ne({},[E,A,R],tn),ht=ne({},["mi","mo","mn","ms","mtext"]),ot=ne({},["annotation-xml"]),At=ne({},["title","style","font","a","script"]),Xe=null,mt=["application/xhtml+xml","text/html"],M="text/html",d=null,m=null,U=r.createElement("form"),Z=function(u){return u instanceof RegExp||u instanceof Function},re=function(){let u=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(m&&m===u)){if((!u||typeof u!="object")&&(u={}),u=lt(u),Xe=mt.indexOf(u.PARSER_MEDIA_TYPE)===-1?M:u.PARSER_MEDIA_TYPE,d=Xe==="application/xhtml+xml"?tn:br,ue=et(u,"ALLOWED_TAGS")?ne({},u.ALLOWED_TAGS,d):nt,pe=et(u,"ALLOWED_ATTR")?ne({},u.ALLOWED_ATTR,d):$e,G=et(u,"ALLOWED_NAMESPACES")?ne({},u.ALLOWED_NAMESPACES,tn):Te,F=et(u,"ADD_URI_SAFE_ATTR")?ne(lt(_),u.ADD_URI_SAFE_ATTR,d):_,X=et(u,"ADD_DATA_URI_TAGS")?ne(lt(V),u.ADD_DATA_URI_TAGS,d):V,T=et(u,"FORBID_CONTENTS")?ne({},u.FORBID_CONTENTS,d):D,Me=et(u,"FORBID_TAGS")?ne({},u.FORBID_TAGS,d):lt({}),Ve=et(u,"FORBID_ATTR")?ne({},u.FORBID_ATTR,d):lt({}),De=et(u,"USE_PROFILES")?u.USE_PROFILES:!1,Ce=u.ALLOW_ARIA_ATTR!==!1,_e=u.ALLOW_DATA_ATTR!==!1,Ne=u.ALLOW_UNKNOWN_PROTOCOLS||!1,Ze=u.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Le=u.SAFE_FOR_TEMPLATES||!1,Pe=u.SAFE_FOR_XML!==!1,y=u.WHOLE_DOCUMENT||!1,se=u.RETURN_DOM||!1,fe=u.RETURN_DOM_FRAGMENT||!1,he=u.RETURN_TRUSTED_TYPE||!1,B=u.FORCE_BODY||!1,me=u.SANITIZE_DOM!==!1,ke=u.SANITIZE_NAMED_PROPS||!1,ae=u.KEEP_CONTENT!==!1,Ie=u.IN_PLACE||!1,Ye=u.ALLOWED_URI_REGEXP||Fs,ee=u.NAMESPACE||R,ht=u.MATHML_TEXT_INTEGRATION_POINTS||ht,ot=u.HTML_INTEGRATION_POINTS||ot,oe=u.CUSTOM_ELEMENT_HANDLING||{},u.CUSTOM_ELEMENT_HANDLING&&Z(u.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(oe.tagNameCheck=u.CUSTOM_ELEMENT_HANDLING.tagNameCheck),u.CUSTOM_ELEMENT_HANDLING&&Z(u.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(oe.attributeNameCheck=u.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),u.CUSTOM_ELEMENT_HANDLING&&typeof u.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(oe.allowCustomizedBuiltInElements=u.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Le&&(_e=!1),fe&&(se=!0),De&&(ue=ne({},Is),pe=[],De.html===!0&&(ne(ue,Ls),ne(pe,Ds)),De.svg===!0&&(ne(ue,nn),ne(pe,an),ne(pe,_r)),De.svgFilters===!0&&(ne(ue,sn),ne(pe,an),ne(pe,_r)),De.mathMl===!0&&(ne(ue,on),ne(pe,Os),ne(pe,_r))),u.ADD_TAGS&&(typeof u.ADD_TAGS=="function"?Ee.tagCheck=u.ADD_TAGS:(ue===nt&&(ue=lt(ue)),ne(ue,u.ADD_TAGS,d))),u.ADD_ATTR&&(typeof u.ADD_ATTR=="function"?Ee.attributeCheck=u.ADD_ATTR:(pe===$e&&(pe=lt(pe)),ne(pe,u.ADD_ATTR,d))),u.ADD_URI_SAFE_ATTR&&ne(F,u.ADD_URI_SAFE_ATTR,d),u.FORBID_CONTENTS&&(T===D&&(T=lt(T)),ne(T,u.FORBID_CONTENTS,d)),ae&&(ue["#text"]=!0),y&&ne(ue,["html","head","body"]),ue.table&&(ne(ue,["tbody"]),delete Me.tbody),u.TRUSTED_TYPES_POLICY){if(typeof u.TRUSTED_TYPES_POLICY.createHTML!="function")throw Vt('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof u.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Vt('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');O=u.TRUSTED_TYPES_POLICY,S=O.createHTML("")}else O===void 0&&(O=la($,s)),O!==null&&typeof S=="string"&&(S=O.createHTML(""));ze&&ze(u),m=u}},be=ne({},[...nn,...sn,...Xi]),nr=ne({},[...on,...Qi]),Mo=function(u){let I=j(u);(!I||!I.tagName)&&(I={namespaceURI:ee,tagName:"template"});let z=br(u.tagName),ge=br(I.tagName);return G[u.namespaceURI]?u.namespaceURI===A?I.namespaceURI===R?z==="svg":I.namespaceURI===E?z==="svg"&&(ge==="annotation-xml"||ht[ge]):!!be[z]:u.namespaceURI===E?I.namespaceURI===R?z==="math":I.namespaceURI===A?z==="math"&&ot[ge]:!!nr[z]:u.namespaceURI===R?I.namespaceURI===A&&!ot[ge]||I.namespaceURI===E&&!ht[ge]?!1:!nr[z]&&(At[z]||!be[z]):!!(Xe==="application/xhtml+xml"&&G[u.namespaceURI]):!1},st=function(u){jt(e.removed,{element:u});try{j(u).removeChild(u)}catch{N(u)}},gt=function(u,I){try{jt(e.removed,{attribute:I.getAttributeNode(u),from:I})}catch{jt(e.removed,{attribute:null,from:I})}if(I.removeAttribute(u),u==="is")if(se||fe)try{st(I)}catch{}else try{I.setAttribute(u,"")}catch{}},Tn=function(u){let I=null,z=null;if(B)u="<remove></remove>"+u;else{let xe=rn(u,/^[\r\n\t ]+/);z=xe&&xe[0]}Xe==="application/xhtml+xml"&&ee===R&&(u='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+u+"</body></html>");let ge=O?O.createHTML(u):u;if(ee===R)try{I=new b().parseFromString(ge,Xe)}catch{}if(!I||!I.documentElement){I=x.createDocument(ee,"template",null);try{I.documentElement.innerHTML=te?S:ge}catch{}}let Fe=I.body||I.documentElement;return u&&z&&Fe.insertBefore(r.createTextNode(z),Fe.childNodes[0]||null),ee===R?C.call(I,y?"html":"body")[0]:y?I.documentElement:Fe},En=function(u){return v.call(u.ownerDocument||u,u,c.SHOW_ELEMENT|c.SHOW_COMMENT|c.SHOW_TEXT|c.SHOW_PROCESSING_INSTRUCTION|c.SHOW_CDATA_SECTION,null)},Er=function(u){return u instanceof g&&(typeof u.nodeName!="string"||typeof u.textContent!="string"||typeof u.removeChild!="function"||!(u.attributes instanceof h)||typeof u.removeAttribute!="function"||typeof u.setAttribute!="function"||typeof u.namespaceURI!="string"||typeof u.insertBefore!="function"||typeof u.hasChildNodes!="function")},Cn=function(u){return typeof l=="function"&&u instanceof l};function it(Y,u,I){gr(Y,z=>{z.call(e,u,I,m)})}let Rn=function(u){let I=null;if(it(W.beforeSanitizeElements,u,null),Er(u))return st(u),!0;let z=d(u.nodeName);if(it(W.uponSanitizeElement,u,{tagName:z,allowedTags:ue}),Pe&&u.hasChildNodes()&&!Cn(u.firstElementChild)&&qe(/<[/\w!]/g,u.innerHTML)&&qe(/<[/\w!]/g,u.textContent)||u.nodeType===Kt.progressingInstruction||Pe&&u.nodeType===Kt.comment&&qe(/<[/\w]/g,u.data))return st(u),!0;if(!(Ee.tagCheck instanceof Function&&Ee.tagCheck(z))&&(!ue[z]||Me[z])){if(!Me[z]&&In(z)&&(oe.tagNameCheck instanceof RegExp&&qe(oe.tagNameCheck,z)||oe.tagNameCheck instanceof Function&&oe.tagNameCheck(z)))return!1;if(ae&&!T[z]){let ge=j(u)||u.parentNode,Fe=H(u)||u.childNodes;if(Fe&&ge){let xe=Fe.length;for(let Ge=xe-1;Ge>=0;--Ge){let at=L(Fe[Ge],!0);at.__removalCount=(u.__removalCount||0)+1,ge.insertBefore(at,q(u))}}}return st(u),!0}return u instanceof a&&!Mo(u)||(z==="noscript"||z==="noembed"||z==="noframes")&&qe(/<\/no(script|embed|frames)/i,u.innerHTML)?(st(u),!0):(Le&&u.nodeType===Kt.text&&(I=u.textContent,gr([K,Re,Be],ge=>{I=Yt(I,ge," ")}),u.textContent!==I&&(jt(e.removed,{element:u.cloneNode()}),u.textContent=I)),it(W.afterSanitizeElements,u,null),!1)},Ln=function(u,I,z){if(me&&(I==="id"||I==="name")&&(z in r||z in U))return!1;if(!(_e&&!Ve[I]&&qe(Se,I))){if(!(Ce&&qe(Ke,I))){if(!(Ee.attributeCheck instanceof Function&&Ee.attributeCheck(I,u))){if(!pe[I]||Ve[I]){if(!(In(u)&&(oe.tagNameCheck instanceof RegExp&&qe(oe.tagNameCheck,u)||oe.tagNameCheck instanceof Function&&oe.tagNameCheck(u))&&(oe.attributeNameCheck instanceof RegExp&&qe(oe.attributeNameCheck,I)||oe.attributeNameCheck instanceof Function&&oe.attributeNameCheck(I,u))||I==="is"&&oe.allowCustomizedBuiltInElements&&(oe.tagNameCheck instanceof RegExp&&qe(oe.tagNameCheck,z)||oe.tagNameCheck instanceof Function&&oe.tagNameCheck(z))))return!1}else if(!F[I]){if(!qe(Ye,Yt(z,we,""))){if(!((I==="src"||I==="xlink:href"||I==="href")&&u!=="script"&&Yi(z,"data:")===0&&X[u])){if(!(Ne&&!qe(We,Yt(z,we,"")))){if(z)return!1}}}}}}}return!0},In=function(u){return u!=="annotation-xml"&&rn(u,Ae)},Dn=function(u){it(W.beforeSanitizeAttributes,u,null);let{attributes:I}=u;if(!I||Er(u))return;let z={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:pe,forceKeepAttr:void 0},ge=I.length;for(;ge--;){let Fe=I[ge],{name:xe,namespaceURI:Ge,value:at}=Fe,Tt=d(xe),Cr=at,Oe=xe==="value"?Cr:Vi(Cr);if(z.attrName=Tt,z.attrValue=Oe,z.keepAttr=!0,z.forceKeepAttr=void 0,it(W.uponSanitizeAttribute,u,z),Oe=z.attrValue,ke&&(Tt==="id"||Tt==="name")&&(gt(xe,u),Oe=Q+Oe),Pe&&qe(/((--!?|])>)|<\/(style|title|textarea)/i,Oe)){gt(xe,u);continue}if(Tt==="attributename"&&rn(Oe,"href")){gt(xe,u);continue}if(z.forceKeepAttr)continue;if(!z.keepAttr){gt(xe,u);continue}if(!Ze&&qe(/\/>/i,Oe)){gt(xe,u);continue}Le&&gr([K,Re,Be],Mn=>{Oe=Yt(Oe,Mn," ")});let On=d(u.nodeName);if(!Ln(On,Tt,Oe)){gt(xe,u);continue}if(O&&typeof $=="object"&&typeof $.getAttributeType=="function"&&!Ge)switch($.getAttributeType(On,Tt)){case"TrustedHTML":{Oe=O.createHTML(Oe);break}case"TrustedScriptURL":{Oe=O.createScriptURL(Oe);break}}if(Oe!==Cr)try{Ge?u.setAttributeNS(Ge,xe,Oe):u.setAttribute(xe,Oe),Er(u)?st(u):Rs(e.removed)}catch{gt(xe,u)}}it(W.afterSanitizeAttributes,u,null)},No=function Y(u){let I=null,z=En(u);for(it(W.beforeSanitizeShadowDOM,u,null);I=z.nextNode();)it(W.uponSanitizeShadowNode,I,null),Rn(I),Dn(I),I.content instanceof o&&Y(I.content);it(W.afterSanitizeShadowDOM,u,null)};return e.sanitize=function(Y){let u=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},I=null,z=null,ge=null,Fe=null;if(te=!Y,te&&(Y="<!-->"),typeof Y!="string"&&!Cn(Y))if(typeof Y.toString=="function"){if(Y=Y.toString(),typeof Y!="string")throw Vt("dirty is not a string, aborting")}else throw Vt("toString is not a function");if(!e.isSupported)return Y;if(w||re(u),e.removed=[],typeof Y=="string"&&(Ie=!1),Ie){if(Y.nodeName){let at=d(Y.nodeName);if(!ue[at]||Me[at])throw Vt("root node is forbidden and cannot be sanitized in-place")}}else if(Y instanceof l)I=Tn("<!---->"),z=I.ownerDocument.importNode(Y,!0),z.nodeType===Kt.element&&z.nodeName==="BODY"||z.nodeName==="HTML"?I=z:I.appendChild(z);else{if(!se&&!Le&&!y&&Y.indexOf("<")===-1)return O&&he?O.createHTML(Y):Y;if(I=Tn(Y),!I)return se?null:he?S:""}I&&B&&st(I.firstChild);let xe=En(Ie?Y:I);for(;ge=xe.nextNode();)Rn(ge),Dn(ge),ge.content instanceof o&&No(ge.content);if(Ie)return Y;if(se){if(fe)for(Fe=p.call(I.ownerDocument);I.firstChild;)Fe.appendChild(I.firstChild);else Fe=I;return(pe.shadowroot||pe.shadowrootmode)&&(Fe=P.call(n,Fe,!0)),Fe}let Ge=y?I.outerHTML:I.innerHTML;return y&&ue["!doctype"]&&I.ownerDocument&&I.ownerDocument.doctype&&I.ownerDocument.doctype.name&&qe(Bs,I.ownerDocument.doctype.name)&&(Ge="<!DOCTYPE "+I.ownerDocument.doctype.name+`>
`+Ge),Le&&gr([K,Re,Be],at=>{Ge=Yt(Ge,at," ")}),O&&he?O.createHTML(Ge):Ge},e.setConfig=function(){let Y=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};re(Y),w=!0},e.clearConfig=function(){m=null,w=!1},e.isValidAttribute=function(Y,u,I){m||re({});let z=d(Y),ge=d(u);return Ln(z,ge,I)},e.addHook=function(Y,u){typeof u=="function"&&jt(W[Y],u)},e.removeHook=function(Y,u){if(u!==void 0){let I=Gi(W[Y],u);return I===-1?void 0:ji(W[Y],I,1)[0]}return Rs(W[Y])},e.removeHooks=function(Y){W[Y]=[]},e.removeAllHooks=function(){W=Ns()},e}var zs=qs();var Us={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Hs=t=>(...e)=>({_$litDirective$:t,values:e}),yr=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,r,n){this._$Ct=e,this._$AM=r,this._$Ci=n}_$AS(e,r){return this.update(e,r)}update(e,r){return this.render(...r)}};var Xt=class extends yr{constructor(e){if(super(e),this.it=ve,e.type!==Us.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===ve||e==null)return this._t=void 0,this.it=e;if(e===wt)return e;if(typeof e!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;let r=[e];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}};Xt.directiveName="unsafeHTML",Xt.resultType=1;var Ws=Hs(Xt);function hn(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var St=hn();function Xs(t){St=t}var tr={exec:()=>null};function ie(t,e=""){let r=typeof t=="string"?t:t.source,n={replace:(s,o)=>{let i=typeof o=="string"?o:o.source;return i=i.replace(He.caret,"$1"),r=r.replace(s,i),n},getRegex:()=>new RegExp(r,e)};return n}var ca=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),He={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:t=>new RegExp(`^( {0,3}${t})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}#`),htmlBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}<(?:[a-z].*>|!--)`,"i")},da=/^(?:[ \t]*(?:\n|$))+/,ua=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,pa=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,rr=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,fa=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,mn=/(?:[*+-]|\d{1,9}[.)])/,Qs=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Js=ie(Qs).replace(/bull/g,mn).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),ha=ie(Qs).replace(/bull/g,mn).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),gn=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,ma=/^[^\n]+/,_n=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,ga=ie(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",_n).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),_a=ie(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,mn).getRegex(),Sr="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",bn=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,ba=ie("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",bn).replace("tag",Sr).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),eo=ie(gn).replace("hr",rr).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Sr).getRegex(),ya=ie(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",eo).getRegex(),yn={blockquote:ya,code:ua,def:ga,fences:pa,heading:fa,hr:rr,html:ba,lheading:Js,list:_a,newline:da,paragraph:eo,table:tr,text:ma},Gs=ie("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",rr).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Sr).getRegex(),wa={...yn,lheading:ha,table:Gs,paragraph:ie(gn).replace("hr",rr).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Gs).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Sr).getRegex()},ka={...yn,html:ie(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",bn).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:tr,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:ie(gn).replace("hr",rr).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Js).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},va=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,$a=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,to=/^( {2,}|\\)\n(?!\s*$)/,xa=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Ar=/[\p{P}\p{S}]/u,wn=/[\s\p{P}\p{S}]/u,ro=/[^\s\p{P}\p{S}]/u,Sa=ie(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,wn).getRegex(),no=/(?!~)[\p{P}\p{S}]/u,Aa=/(?!~)[\s\p{P}\p{S}]/u,Ta=/(?:[^\s\p{P}\p{S}]|~)/u,Ea=ie(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",ca?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),so=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,Ca=ie(so,"u").replace(/punct/g,Ar).getRegex(),Ra=ie(so,"u").replace(/punct/g,no).getRegex(),oo="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",La=ie(oo,"gu").replace(/notPunctSpace/g,ro).replace(/punctSpace/g,wn).replace(/punct/g,Ar).getRegex(),Ia=ie(oo,"gu").replace(/notPunctSpace/g,Ta).replace(/punctSpace/g,Aa).replace(/punct/g,no).getRegex(),Da=ie("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,ro).replace(/punctSpace/g,wn).replace(/punct/g,Ar).getRegex(),Oa=ie(/\\(punct)/,"gu").replace(/punct/g,Ar).getRegex(),Ma=ie(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Na=ie(bn).replace("(?:-->|$)","-->").getRegex(),Pa=ie("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Na).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),vr=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,Fa=ie(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",vr).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),io=ie(/^!?\[(label)\]\[(ref)\]/).replace("label",vr).replace("ref",_n).getRegex(),ao=ie(/^!?\[(ref)\](?:\[\])?/).replace("ref",_n).getRegex(),Ba=ie("reflink|nolink(?!\\()","g").replace("reflink",io).replace("nolink",ao).getRegex(),js=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,kn={_backpedal:tr,anyPunctuation:Oa,autolink:Ma,blockSkip:Ea,br:to,code:$a,del:tr,emStrongLDelim:Ca,emStrongRDelimAst:La,emStrongRDelimUnd:Da,escape:va,link:Fa,nolink:ao,punctuation:Sa,reflink:io,reflinkSearch:Ba,tag:Pa,text:xa,url:tr},qa={...kn,link:ie(/^!?\[(label)\]\((.*?)\)/).replace("label",vr).getRegex(),reflink:ie(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",vr).getRegex()},un={...kn,emStrongRDelimAst:Ia,emStrongLDelim:Ra,url:ie(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",js).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:ie(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",js).getRegex()},za={...un,br:ie(to).replace("{2,}","*").getRegex(),text:ie(un.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},wr={normal:yn,gfm:wa,pedantic:ka},Qt={normal:kn,gfm:un,breaks:za,pedantic:qa},Ua={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Ys=t=>Ua[t];function ct(t,e){if(e){if(He.escapeTest.test(t))return t.replace(He.escapeReplace,Ys)}else if(He.escapeTestNoEncode.test(t))return t.replace(He.escapeReplaceNoEncode,Ys);return t}function Vs(t){try{t=encodeURI(t).replace(He.percentDecode,"%")}catch{return null}return t}function Zs(t,e){let r=t.replace(He.findPipe,(o,i,l)=>{let a=!1,c=i;for(;--c>=0&&l[c]==="\\";)a=!a;return a?"|":" |"}),n=r.split(He.splitPipe),s=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),e)if(n.length>e)n.splice(e);else for(;n.length<e;)n.push("");for(;s<n.length;s++)n[s]=n[s].trim().replace(He.slashPipe,"|");return n}function Jt(t,e,r){let n=t.length;if(n===0)return"";let s=0;for(;s<n;){let o=t.charAt(n-s-1);if(o===e&&!r)s++;else if(o!==e&&r)s++;else break}return t.slice(0,n-s)}function Ha(t,e){if(t.indexOf(e[1])===-1)return-1;let r=0;for(let n=0;n<t.length;n++)if(t[n]==="\\")n++;else if(t[n]===e[0])r++;else if(t[n]===e[1]&&(r--,r<0))return n;return r>0?-2:-1}function Ks(t,e,r,n,s){let o=e.href,i=e.title||null,l=t[1].replace(s.other.outputLinkReplace,"$1");n.state.inLink=!0;let a={type:t[0].charAt(0)==="!"?"image":"link",raw:r,href:o,title:i,text:l,tokens:n.inlineTokens(l)};return n.state.inLink=!1,a}function Wa(t,e,r){let n=t.match(r.other.indentCodeCompensation);if(n===null)return e;let s=n[1];return e.split(`
`).map(o=>{let i=o.match(r.other.beginningSpace);if(i===null)return o;let[l]=i;return l.length>=s.length?o.slice(s.length):o}).join(`
`)}var $r=class{constructor(t){de(this,"options");de(this,"rules");de(this,"lexer");this.options=t||St}space(t){let e=this.rules.block.newline.exec(t);if(e&&e[0].length>0)return{type:"space",raw:e[0]}}code(t){let e=this.rules.block.code.exec(t);if(e){let r=e[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:e[0],codeBlockStyle:"indented",text:this.options.pedantic?r:Jt(r,`
`)}}}fences(t){let e=this.rules.block.fences.exec(t);if(e){let r=e[0],n=Wa(r,e[3]||"",this.rules);return{type:"code",raw:r,lang:e[2]?e[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):e[2],text:n}}}heading(t){let e=this.rules.block.heading.exec(t);if(e){let r=e[2].trim();if(this.rules.other.endingHash.test(r)){let n=Jt(r,"#");(this.options.pedantic||!n||this.rules.other.endingSpaceChar.test(n))&&(r=n.trim())}return{type:"heading",raw:e[0],depth:e[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(t){let e=this.rules.block.hr.exec(t);if(e)return{type:"hr",raw:Jt(e[0],`
`)}}blockquote(t){let e=this.rules.block.blockquote.exec(t);if(e){let r=Jt(e[0],`
`).split(`
`),n="",s="",o=[];for(;r.length>0;){let i=!1,l=[],a;for(a=0;a<r.length;a++)if(this.rules.other.blockquoteStart.test(r[a]))l.push(r[a]),i=!0;else if(!i)l.push(r[a]);else break;r=r.slice(a);let c=l.join(`
`),h=c.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");n=n?`${n}
${c}`:c,s=s?`${s}
${h}`:h;let g=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(h,o,!0),this.lexer.state.top=g,r.length===0)break;let b=o.at(-1);if(b?.type==="code")break;if(b?.type==="blockquote"){let $=b,k=$.raw+`
`+r.join(`
`),L=this.blockquote(k);o[o.length-1]=L,n=n.substring(0,n.length-$.raw.length)+L.raw,s=s.substring(0,s.length-$.text.length)+L.text;break}else if(b?.type==="list"){let $=b,k=$.raw+`
`+r.join(`
`),L=this.list(k);o[o.length-1]=L,n=n.substring(0,n.length-b.raw.length)+L.raw,s=s.substring(0,s.length-$.raw.length)+L.raw,r=k.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:n,tokens:o,text:s}}}list(t){let e=this.rules.block.list.exec(t);if(e){let r=e[1].trim(),n=r.length>1,s={type:"list",raw:"",ordered:n,start:n?+r.slice(0,-1):"",loose:!1,items:[]};r=n?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=n?r:"[*+-]");let o=this.rules.other.listItemRegex(r),i=!1;for(;t;){let a=!1,c="",h="";if(!(e=o.exec(t))||this.rules.block.hr.test(t))break;c=e[0],t=t.substring(c.length);let g=e[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,L=>" ".repeat(3*L.length)),b=t.split(`
`,1)[0],$=!g.trim(),k=0;if(this.options.pedantic?(k=2,h=g.trimStart()):$?k=e[1].length+1:(k=e[2].search(this.rules.other.nonSpaceChar),k=k>4?1:k,h=g.slice(k),k+=e[1].length),$&&this.rules.other.blankLine.test(b)&&(c+=b+`
`,t=t.substring(b.length+1),a=!0),!a){let L=this.rules.other.nextBulletRegex(k),N=this.rules.other.hrRegex(k),q=this.rules.other.fencesBeginRegex(k),H=this.rules.other.headingBeginRegex(k),j=this.rules.other.htmlBeginRegex(k);for(;t;){let O=t.split(`
`,1)[0],S;if(b=O,this.options.pedantic?(b=b.replace(this.rules.other.listReplaceNesting,"  "),S=b):S=b.replace(this.rules.other.tabCharGlobal,"    "),q.test(b)||H.test(b)||j.test(b)||L.test(b)||N.test(b))break;if(S.search(this.rules.other.nonSpaceChar)>=k||!b.trim())h+=`
`+S.slice(k);else{if($||g.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||q.test(g)||H.test(g)||N.test(g))break;h+=`
`+b}!$&&!b.trim()&&($=!0),c+=O+`
`,t=t.substring(O.length+1),g=S.slice(k)}}s.loose||(i?s.loose=!0:this.rules.other.doubleBlankLine.test(c)&&(i=!0)),s.items.push({type:"list_item",raw:c,task:!!this.options.gfm&&this.rules.other.listIsTask.test(h),loose:!1,text:h,tokens:[]}),s.raw+=c}let l=s.items.at(-1);if(l)l.raw=l.raw.trimEnd(),l.text=l.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let a of s.items){if(this.lexer.state.top=!1,a.tokens=this.lexer.blockTokens(a.text,[]),a.task){if(a.text=a.text.replace(this.rules.other.listReplaceTask,""),a.tokens[0]?.type==="text"||a.tokens[0]?.type==="paragraph"){a.tokens[0].raw=a.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),a.tokens[0].text=a.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let h=this.lexer.inlineQueue.length-1;h>=0;h--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[h].src)){this.lexer.inlineQueue[h].src=this.lexer.inlineQueue[h].src.replace(this.rules.other.listReplaceTask,"");break}}let c=this.rules.other.listTaskCheckbox.exec(a.raw);if(c){let h={type:"checkbox",raw:c[0]+" ",checked:c[0]!=="[ ]"};a.checked=h.checked,s.loose?a.tokens[0]&&["paragraph","text"].includes(a.tokens[0].type)&&"tokens"in a.tokens[0]&&a.tokens[0].tokens?(a.tokens[0].raw=h.raw+a.tokens[0].raw,a.tokens[0].text=h.raw+a.tokens[0].text,a.tokens[0].tokens.unshift(h)):a.tokens.unshift({type:"paragraph",raw:h.raw,text:h.raw,tokens:[h]}):a.tokens.unshift(h)}}if(!s.loose){let c=a.tokens.filter(g=>g.type==="space"),h=c.length>0&&c.some(g=>this.rules.other.anyLine.test(g.raw));s.loose=h}}if(s.loose)for(let a of s.items){a.loose=!0;for(let c of a.tokens)c.type==="text"&&(c.type="paragraph")}return s}}html(t){let e=this.rules.block.html.exec(t);if(e)return{type:"html",block:!0,raw:e[0],pre:e[1]==="pre"||e[1]==="script"||e[1]==="style",text:e[0]}}def(t){let e=this.rules.block.def.exec(t);if(e){let r=e[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),n=e[2]?e[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=e[3]?e[3].substring(1,e[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):e[3];return{type:"def",tag:r,raw:e[0],href:n,title:s}}}table(t){let e=this.rules.block.table.exec(t);if(!e||!this.rules.other.tableDelimiter.test(e[2]))return;let r=Zs(e[1]),n=e[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=e[3]?.trim()?e[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:e[0],header:[],align:[],rows:[]};if(r.length===n.length){for(let i of n)this.rules.other.tableAlignRight.test(i)?o.align.push("right"):this.rules.other.tableAlignCenter.test(i)?o.align.push("center"):this.rules.other.tableAlignLeft.test(i)?o.align.push("left"):o.align.push(null);for(let i=0;i<r.length;i++)o.header.push({text:r[i],tokens:this.lexer.inline(r[i]),header:!0,align:o.align[i]});for(let i of s)o.rows.push(Zs(i,o.header.length).map((l,a)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:o.align[a]})));return o}}lheading(t){let e=this.rules.block.lheading.exec(t);if(e)return{type:"heading",raw:e[0],depth:e[2].charAt(0)==="="?1:2,text:e[1],tokens:this.lexer.inline(e[1])}}paragraph(t){let e=this.rules.block.paragraph.exec(t);if(e){let r=e[1].charAt(e[1].length-1)===`
`?e[1].slice(0,-1):e[1];return{type:"paragraph",raw:e[0],text:r,tokens:this.lexer.inline(r)}}}text(t){let e=this.rules.block.text.exec(t);if(e)return{type:"text",raw:e[0],text:e[0],tokens:this.lexer.inline(e[0])}}escape(t){let e=this.rules.inline.escape.exec(t);if(e)return{type:"escape",raw:e[0],text:e[1]}}tag(t){let e=this.rules.inline.tag.exec(t);if(e)return!this.lexer.state.inLink&&this.rules.other.startATag.test(e[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(e[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(e[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(e[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:e[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:e[0]}}link(t){let e=this.rules.inline.link.exec(t);if(e){let r=e[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;let o=Jt(r.slice(0,-1),"\\");if((r.length-o.length)%2===0)return}else{let o=Ha(e[2],"()");if(o===-2)return;if(o>-1){let i=(e[0].indexOf("!")===0?5:4)+e[1].length+o;e[2]=e[2].substring(0,o),e[0]=e[0].substring(0,i).trim(),e[3]=""}}let n=e[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(n);o&&(n=o[1],s=o[3])}else s=e[3]?e[3].slice(1,-1):"";return n=n.trim(),this.rules.other.startAngleBracket.test(n)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?n=n.slice(1):n=n.slice(1,-1)),Ks(e,{href:n&&n.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},e[0],this.lexer,this.rules)}}reflink(t,e){let r;if((r=this.rules.inline.reflink.exec(t))||(r=this.rules.inline.nolink.exec(t))){let n=(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=e[n.toLowerCase()];if(!s){let o=r[0].charAt(0);return{type:"text",raw:o,text:o}}return Ks(r,s,r[0],this.lexer,this.rules)}}emStrong(t,e,r=""){let n=this.rules.inline.emStrongLDelim.exec(t);if(!(!n||n[3]&&r.match(this.rules.other.unicodeAlphaNumeric))&&(!(n[1]||n[2])||!r||this.rules.inline.punctuation.exec(r))){let s=[...n[0]].length-1,o,i,l=s,a=0,c=n[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(c.lastIndex=0,e=e.slice(-1*t.length+s);(n=c.exec(e))!=null;){if(o=n[1]||n[2]||n[3]||n[4]||n[5]||n[6],!o)continue;if(i=[...o].length,n[3]||n[4]){l+=i;continue}else if((n[5]||n[6])&&s%3&&!((s+i)%3)){a+=i;continue}if(l-=i,l>0)continue;i=Math.min(i,i+l+a);let h=[...n[0]][0].length,g=t.slice(0,s+n.index+h+i);if(Math.min(s,i)%2){let $=g.slice(1,-1);return{type:"em",raw:g,text:$,tokens:this.lexer.inlineTokens($)}}let b=g.slice(2,-2);return{type:"strong",raw:g,text:b,tokens:this.lexer.inlineTokens(b)}}}}codespan(t){let e=this.rules.inline.code.exec(t);if(e){let r=e[2].replace(this.rules.other.newLineCharGlobal," "),n=this.rules.other.nonSpaceChar.test(r),s=this.rules.other.startingSpaceChar.test(r)&&this.rules.other.endingSpaceChar.test(r);return n&&s&&(r=r.substring(1,r.length-1)),{type:"codespan",raw:e[0],text:r}}}br(t){let e=this.rules.inline.br.exec(t);if(e)return{type:"br",raw:e[0]}}del(t){let e=this.rules.inline.del.exec(t);if(e)return{type:"del",raw:e[0],text:e[2],tokens:this.lexer.inlineTokens(e[2])}}autolink(t){let e=this.rules.inline.autolink.exec(t);if(e){let r,n;return e[2]==="@"?(r=e[1],n="mailto:"+r):(r=e[1],n=r),{type:"link",raw:e[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}url(t){let e;if(e=this.rules.inline.url.exec(t)){let r,n;if(e[2]==="@")r=e[0],n="mailto:"+r;else{let s;do s=e[0],e[0]=this.rules.inline._backpedal.exec(e[0])?.[0]??"";while(s!==e[0]);r=e[0],e[1]==="www."?n="http://"+e[0]:n=e[0]}return{type:"link",raw:e[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(t){let e=this.rules.inline.text.exec(t);if(e){let r=this.lexer.state.inRawBlock;return{type:"text",raw:e[0],text:e[0],escaped:r}}}},tt=class pn{constructor(e){de(this,"tokens");de(this,"options");de(this,"state");de(this,"inlineQueue");de(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=e||St,this.options.tokenizer=this.options.tokenizer||new $r,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let r={other:He,block:wr.normal,inline:Qt.normal};this.options.pedantic?(r.block=wr.pedantic,r.inline=Qt.pedantic):this.options.gfm&&(r.block=wr.gfm,this.options.breaks?r.inline=Qt.breaks:r.inline=Qt.gfm),this.tokenizer.rules=r}static get rules(){return{block:wr,inline:Qt}}static lex(e,r){return new pn(r).lex(e)}static lexInline(e,r){return new pn(r).inlineTokens(e)}lex(e){e=e.replace(He.carriageReturn,`
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
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):r.push(s);continue}if(e){let i="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(i);break}else throw new Error(i)}}return this.state.top=!0,r}inline(e,r=[]){return this.inlineQueue.push({src:e,tokens:r}),r}inlineTokens(e,r=[]){let n=e,s=null;if(this.tokens.links){let a=Object.keys(this.tokens.links);if(a.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(n))!=null;)a.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(n=n.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(n))!=null;)n=n.slice(0,s.index)+"++"+n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(n))!=null;)o=s[2]?s[2].length:0,n=n.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let i=!1,l="";for(;e;){i||(l=""),i=!1;let a;if(this.options.extensions?.inline?.some(h=>(a=h.call({lexer:this},e,r))?(e=e.substring(a.raw.length),r.push(a),!0):!1))continue;if(a=this.tokenizer.escape(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.tag(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.link(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(a.raw.length);let h=r.at(-1);a.type==="text"&&h?.type==="text"?(h.raw+=a.raw,h.text+=a.text):r.push(a);continue}if(a=this.tokenizer.emStrong(e,n,l)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.codespan(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.br(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.del(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.autolink(e)){e=e.substring(a.raw.length),r.push(a);continue}if(!this.state.inLink&&(a=this.tokenizer.url(e))){e=e.substring(a.raw.length),r.push(a);continue}let c=e;if(this.options.extensions?.startInline){let h=1/0,g=e.slice(1),b;this.options.extensions.startInline.forEach($=>{b=$.call({lexer:this},g),typeof b=="number"&&b>=0&&(h=Math.min(h,b))}),h<1/0&&h>=0&&(c=e.substring(0,h+1))}if(a=this.tokenizer.inlineText(c)){e=e.substring(a.raw.length),a.raw.slice(-1)!=="_"&&(l=a.raw.slice(-1)),i=!0;let h=r.at(-1);h?.type==="text"?(h.raw+=a.raw,h.text+=a.text):r.push(a);continue}if(e){let h="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(h);break}else throw new Error(h)}}return r}},xr=class{constructor(t){de(this,"options");de(this,"parser");this.options=t||St}space(t){return""}code({text:t,lang:e,escaped:r}){let n=(e||"").match(He.notSpaceStart)?.[0],s=t.replace(He.endingNewline,"")+`
`;return n?'<pre><code class="language-'+ct(n)+'">'+(r?s:ct(s,!0))+`</code></pre>
`:"<pre><code>"+(r?s:ct(s,!0))+`</code></pre>
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
`}strong({tokens:t}){return`<strong>${this.parser.parseInline(t)}</strong>`}em({tokens:t}){return`<em>${this.parser.parseInline(t)}</em>`}codespan({text:t}){return`<code>${ct(t,!0)}</code>`}br(t){return"<br>"}del({tokens:t}){return`<del>${this.parser.parseInline(t)}</del>`}link({href:t,title:e,tokens:r}){let n=this.parser.parseInline(r),s=Vs(t);if(s===null)return n;t=s;let o='<a href="'+t+'"';return e&&(o+=' title="'+ct(e)+'"'),o+=">"+n+"</a>",o}image({href:t,title:e,text:r,tokens:n}){n&&(r=this.parser.parseInline(n,this.parser.textRenderer));let s=Vs(t);if(s===null)return ct(r);t=s;let o=`<img src="${t}" alt="${r}"`;return e&&(o+=` title="${ct(e)}"`),o+=">",o}text(t){return"tokens"in t&&t.tokens?this.parser.parseInline(t.tokens):"escaped"in t&&t.escaped?t.text:ct(t.text)}},vn=class{strong({text:t}){return t}em({text:t}){return t}codespan({text:t}){return t}del({text:t}){return t}html({text:t}){return t}text({text:t}){return t}link({text:t}){return""+t}image({text:t}){return""+t}br(){return""}checkbox({raw:t}){return t}},rt=class fn{constructor(e){de(this,"options");de(this,"renderer");de(this,"textRenderer");this.options=e||St,this.options.renderer=this.options.renderer||new xr,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new vn}static parse(e,r){return new fn(r).parse(e)}static parseInline(e,r){return new fn(r).parseInline(e)}parse(e){let r="";for(let n=0;n<e.length;n++){let s=e[n];if(this.options.extensions?.renderers?.[s.type]){let i=s,l=this.options.extensions.renderers[i.type].call({parser:this},i);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(i.type)){r+=l||"";continue}}let o=s;switch(o.type){case"space":{r+=this.renderer.space(o);break}case"hr":{r+=this.renderer.hr(o);break}case"heading":{r+=this.renderer.heading(o);break}case"code":{r+=this.renderer.code(o);break}case"table":{r+=this.renderer.table(o);break}case"blockquote":{r+=this.renderer.blockquote(o);break}case"list":{r+=this.renderer.list(o);break}case"checkbox":{r+=this.renderer.checkbox(o);break}case"html":{r+=this.renderer.html(o);break}case"def":{r+=this.renderer.def(o);break}case"paragraph":{r+=this.renderer.paragraph(o);break}case"text":{r+=this.renderer.text(o);break}default:{let i='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return r}parseInline(e,r=this.renderer){let n="";for(let s=0;s<e.length;s++){let o=e[s];if(this.options.extensions?.renderers?.[o.type]){let l=this.options.extensions.renderers[o.type].call({parser:this},o);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){n+=l||"";continue}}let i=o;switch(i.type){case"escape":{n+=r.text(i);break}case"html":{n+=r.html(i);break}case"link":{n+=r.link(i);break}case"image":{n+=r.image(i);break}case"checkbox":{n+=r.checkbox(i);break}case"strong":{n+=r.strong(i);break}case"em":{n+=r.em(i);break}case"codespan":{n+=r.codespan(i);break}case"br":{n+=r.br(i);break}case"del":{n+=r.del(i);break}case"text":{n+=r.text(i);break}default:{let l='Token with "'+i.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return n}},kr,er=(kr=class{constructor(t){de(this,"options");de(this,"block");this.options=t||St}preprocess(t){return t}postprocess(t){return t}processAllTokens(t){return t}emStrongMask(t){return t}provideLexer(){return this.block?tt.lex:tt.lexInline}provideParser(){return this.block?rt.parse:rt.parseInline}},de(kr,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),de(kr,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),kr),Ga=class{constructor(...t){de(this,"defaults",hn());de(this,"options",this.setOptions);de(this,"parse",this.parseMarkdown(!0));de(this,"parseInline",this.parseMarkdown(!1));de(this,"Parser",rt);de(this,"Renderer",xr);de(this,"TextRenderer",vn);de(this,"Lexer",tt);de(this,"Tokenizer",$r);de(this,"Hooks",er);this.use(...t)}walkTokens(t,e){let r=[];for(let n of t)switch(r=r.concat(e.call(this,n)),n.type){case"table":{let s=n;for(let o of s.header)r=r.concat(this.walkTokens(o.tokens,e));for(let o of s.rows)for(let i of o)r=r.concat(this.walkTokens(i.tokens,e));break}case"list":{let s=n;r=r.concat(this.walkTokens(s.items,e));break}default:{let s=n;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let i=s[o].flat(1/0);r=r.concat(this.walkTokens(i,e))}):s.tokens&&(r=r.concat(this.walkTokens(s.tokens,e)))}}return r}use(...t){let e=this.defaults.extensions||{renderers:{},childTokens:{}};return t.forEach(r=>{let n={...r};if(n.async=this.defaults.async||n.async||!1,r.extensions&&(r.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=e.renderers[s.name];o?e.renderers[s.name]=function(...i){let l=s.renderer.apply(this,i);return l===!1&&(l=o.apply(this,i)),l}:e.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=e[s.level];o?o.unshift(s.tokenizer):e[s.level]=[s.tokenizer],s.start&&(s.level==="block"?e.startBlock?e.startBlock.push(s.start):e.startBlock=[s.start]:s.level==="inline"&&(e.startInline?e.startInline.push(s.start):e.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(e.childTokens[s.name]=s.childTokens)}),n.extensions=e),r.renderer){let s=this.defaults.renderer||new xr(this.defaults);for(let o in r.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let i=o,l=r.renderer[i],a=s[i];s[i]=(...c)=>{let h=l.apply(s,c);return h===!1&&(h=a.apply(s,c)),h||""}}n.renderer=s}if(r.tokenizer){let s=this.defaults.tokenizer||new $r(this.defaults);for(let o in r.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let i=o,l=r.tokenizer[i],a=s[i];s[i]=(...c)=>{let h=l.apply(s,c);return h===!1&&(h=a.apply(s,c)),h}}n.tokenizer=s}if(r.hooks){let s=this.defaults.hooks||new er;for(let o in r.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let i=o,l=r.hooks[i],a=s[i];er.passThroughHooks.has(o)?s[i]=c=>{if(this.defaults.async&&er.passThroughHooksRespectAsync.has(o))return(async()=>{let g=await l.call(s,c);return a.call(s,g)})();let h=l.call(s,c);return a.call(s,h)}:s[i]=(...c)=>{if(this.defaults.async)return(async()=>{let g=await l.apply(s,c);return g===!1&&(g=await a.apply(s,c)),g})();let h=l.apply(s,c);return h===!1&&(h=a.apply(s,c)),h}}n.hooks=s}if(r.walkTokens){let s=this.defaults.walkTokens,o=r.walkTokens;n.walkTokens=function(i){let l=[];return l.push(o.call(this,i)),s&&(l=l.concat(s.call(this,i))),l}}this.defaults={...this.defaults,...n}}),this}setOptions(t){return this.defaults={...this.defaults,...t},this}lexer(t,e){return tt.lex(t,e??this.defaults)}parser(t,e){return rt.parse(t,e??this.defaults)}parseMarkdown(t){return(e,r)=>{let n={...r},s={...this.defaults,...n},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&n.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof e>"u"||e===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof e!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(e)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=t),s.async)return(async()=>{let i=s.hooks?await s.hooks.preprocess(e):e,l=await(s.hooks?await s.hooks.provideLexer():t?tt.lex:tt.lexInline)(i,s),a=s.hooks?await s.hooks.processAllTokens(l):l;s.walkTokens&&await Promise.all(this.walkTokens(a,s.walkTokens));let c=await(s.hooks?await s.hooks.provideParser():t?rt.parse:rt.parseInline)(a,s);return s.hooks?await s.hooks.postprocess(c):c})().catch(o);try{s.hooks&&(e=s.hooks.preprocess(e));let i=(s.hooks?s.hooks.provideLexer():t?tt.lex:tt.lexInline)(e,s);s.hooks&&(i=s.hooks.processAllTokens(i)),s.walkTokens&&this.walkTokens(i,s.walkTokens);let l=(s.hooks?s.hooks.provideParser():t?rt.parse:rt.parseInline)(i,s);return s.hooks&&(l=s.hooks.postprocess(l)),l}catch(i){return o(i)}}}onError(t,e){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,t){let n="<p>An error occurred:</p><pre>"+ct(r.message+"",!0)+"</pre>";return e?Promise.resolve(n):n}if(e)return Promise.reject(r);throw r}}},xt=new Ga;function le(t,e){return xt.parse(t,e)}le.options=le.setOptions=function(t){return xt.setOptions(t),le.defaults=xt.defaults,Xs(le.defaults),le};le.getDefaults=hn;le.defaults=St;le.use=function(...t){return xt.use(...t),le.defaults=xt.defaults,Xs(le.defaults),le};le.walkTokens=function(t,e){return xt.walkTokens(t,e)};le.parseInline=xt.parseInline;le.Parser=rt;le.parser=rt.parse;le.Renderer=xr;le.TextRenderer=vn;le.Lexer=tt;le.lexer=tt.lex;le.Tokenizer=$r;le.Hooks=er;le.parse=le;var Pc=le.options,Fc=le.setOptions,Bc=le.use,qc=le.walkTokens,zc=le.parseInline;var Uc=rt.parse,Hc=tt.lex;function lo(t){let e=le.parse(t),r=zs.sanitize(e);return Ws(r)}function ja(t){return String(t||"").replace(/^docs\/(superpowers\/)?/,"")}function co(t,e){let r=e.getWorkspacePath,n=e.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",i="",l="";function a(k){k.key==="Escape"&&s&&(k.preventDefault(),b())}document.addEventListener("keydown",a);function c(){return s?f`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>b()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${ja(s)}</span
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
    `:f``}function h(){ce(c(),t)}async function g(k){s=k,o="loading",i="",l="",h();let L=r?r():"";if(!L){o="error",l="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",h();return}if(!n){o="error",l="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",h();return}let N="/api/doc?workspace="+encodeURIComponent(L)+"&path="+encodeURIComponent(k);try{let q=await n(N),H=await q.json().catch(()=>({}));if(!q.ok||!H||H.ok!==!0){o="error",l="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(H&&H.error||q.status)+")",h();return}i=String(H.content||""),o="ready",h()}catch{o="error",l="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",h()}}function b(){s=null,ce(f``,t)}function $(){document.removeEventListener("keydown",a),b()}return{open:g,close:b,destroy:$}}var Ya={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function Va(t){if(typeof t!="number"||!Number.isFinite(t))return"";let e=new Date(t),r=String(e.getHours()).padStart(2,"0"),n=String(e.getMinutes()).padStart(2,"0");return`${r}:${n}`}function uo(t,e={}){let r=Array.isArray(t)?t:[];if(r.length===0)return f`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let n=new Set;for(let o of r)o&&typeof o.resumed_from=="string"&&o.resumed_from.length>0&&n.add(o.resumed_from);let s=o=>{if(!(o.status==="failed"||o.status==="orphaned"))return"";let l=typeof o.session_id=="string"&&o.session_id.length>0,a=n.has(o.attempt_id),c=typeof o.dismissed_at=="number",h=l&&!a&&!c,g=l?a?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":c?"\uCC98\uB9AC \uC644\uB8CC\uB85C \uB2EB\uC740 attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return f`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${o.attempt_id}
      ?disabled=${!h}
      title=${g}
      @click=${b=>{b.stopPropagation(),h&&e.onResume&&e.onResume(o.attempt_id)}}
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
                >${Ya[o.status||""]||"\xB7"}</span
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
                >${Va(o.started_at)}</span
              >
            </button>
            ${s(o)}
          </div>`)}
    </div>
  `}var Za=["open","in_progress","deferred","resolved","closed"],Ka=[0,1,2,3,4];function po(t,e){let r=e.issueStores,n=e.onClose,s=e.transport,o=e.onNavigate,i=e.queueStore,l=e.sessionLogStore,a=null,c=null,h={},g=!1,b=!1,$="",k="",L="";function N(){g=!1,b=!1,$="",k="",L=""}let q=document.createElement("div");q.className="md-viewer-root",document.body.appendChild(q);let H=co(q,{getWorkspacePath:e.getWorkspacePath||(()=>"")}),j=document.createElement("div");j.className="session-log-root",document.body.appendChild(j);let O=hr(j,{transport:s?(_,E)=>Promise.resolve(s(_,E)):void 0,sessionLogStore:l});function S(){if(!i||!a)return[];let _=i.get();return(_&&_.attempts?Object.values(_.attempts):[]).filter(A=>A&&A.bead_id===a).sort((A,R)=>(R.started_at||0)-(A.started_at||0)).map(A=>({attempt_id:A.attempt_id,bead_id:A.bead_id,status:A.status,started_at:typeof A.started_at=="number"?A.started_at:null,runner:A.runner||null,model:A.model||null,session_id:A.session_id||null,resumed_from:A.resumed_from||null,dismissed_at:typeof A.dismissed_at=="number"?A.dismissed_at:null}))}function x(_){let E=i?i.get():null,A=E&&E.attempts?E.attempts[_]:null;O.open({attempt_id:_,meta:A?{runner:A.runner||void 0,model:A.model||void 0,effort:A.effort||void 0,status:A.status||void 0,session_id:A.session_id||void 0}:{}})}async function v(_){if(!s||!_)return;let E=()=>{let R=i?i.get():null;return R&&typeof R.revision=="number"?R.revision:0},A=await s("worker-attempt-resume",{attempt_id:_,expected_revision:E()});if(A&&A.conflict){let R=A.queue&&typeof A.queue.revision=="number"?A.queue.revision:E();A=await s("worker-attempt-resume",{attempt_id:_,expected_revision:R})}A&&A.resumed===!1&&!A.conflict&&A.reason&&J(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${A.reason}`,"error",2400)}let p={onOpen:x,onResume:v};function C(){let _=i?i.get():null,E=_&&_.exec_defaults;return E&&typeof E=="object"?E:{}}let P=null;r&&r.subscribe&&(P=r.subscribe(()=>Re()));let W=null;i&&typeof i.subscribe=="function"&&(W=i.subscribe(()=>{a&&F()}));function K(_){_.key==="Escape"&&a&&(_.preventDefault(),n())}document.addEventListener("keydown",K);function Re(){if(a){if(r&&typeof r.snapshotFor=="function"){let _=r.snapshotFor("detail:"+a)||[];c=_.find(A=>A&&A.id===a)||_[0]||c}F()}}function Be(_){Mt(_).then(E=>{E?J("\uBCF5\uC0AC\uB428","success",1200):J("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function Se(_){_.preventDefault(),_.stopPropagation(),a&&Be(a)}function Ke(_,E){_.preventDefault(),_.stopPropagation(),Be(E)}function We(_,E){_.preventDefault(),_.stopPropagation(),H.open(E)}function we(_,E){h[_]=E,F(),!(!s||!a)&&Promise.resolve(s("update-exec-settings",{id:a,key:_,value:E})).catch(()=>{J("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}async function Ae(_,E,A){if(!s||!a)return!1;try{let R=await Promise.resolve(s(_,E)),ee=Array.isArray(R)?R[0]:R;return ee&&typeof ee=="object"&&ee.id?(c=ee,!0):(J(A,"error"),!1)}catch{return J(A,"error"),!1}}function Ye(_){setTimeout(()=>{try{let E=t.querySelector(_);E&&typeof E.focus=="function"&&E.focus()}catch{}},0)}function ue(){g=!0,$=c&&c.title||"",F(),Ye('.detail-edit__input[data-edit="title"]')}function nt(_){$=_.target.value}function pe(){g=!1,$="",F()}function $e(){Ae("edit-text",{id:a,field:"title",value:$},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(E=>{E&&(g=!1,$=""),F()})}function oe(){b=!0,k=c&&c.description||"",F(),Ye('.detail-edit__textarea[data-edit="description"]')}function Me(_){k=_.target.value}function Ve(){b=!1,k="",F()}function Ee(){Ae("edit-text",{id:a,field:"description",value:k},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(E=>{E&&(b=!1,k=""),F()})}function Ce(_,E,A,R){if(_.key==="Escape"){_.stopPropagation(),A();return}_.key==="Enter"&&(!R||_.ctrlKey||_.metaKey)&&(_.preventDefault(),E())}function _e(_){let E=_.target.value;Ae("update-status",{id:a,status:E},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>F())}function Ne(_){let E=Number(_.target.value);Ae("update-priority",{id:a,priority:E},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>F())}function Ze(_){L=_.target.value}function Le(){let _=L.trim();_.length!==0&&Ae("label-add",{id:a,label:_},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(E=>{E&&(L=""),F()})}function Pe(_){if(_.key==="Escape"){_.stopPropagation(),L="",F();return}_.key==="Enter"&&(_.preventDefault(),Le())}function y(_){Ae("label-remove",{id:a,label:_},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>F())}let w={onCopyPath:Ke,onOpenDoc:We},B={onChange:we};function se(_){return typeof _=="string"?_:_&&typeof _=="object"?String(_.id||_.to||_.issue_id||_.depends_on||""):""}function fe(_){switch(_&&typeof _=="object"?String(_.dependency_type||_.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function he(_){let A=(Array.isArray(_.dependencies)?_.dependencies:[]).map(R=>({id:se(R),icon:fe(R)})).filter(R=>R.id.length>0);return f`
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
    `}function me(_){let E=_.metadata||{},A=_.workflow||{},R=A.stages||{},ee=R.spec&&R.spec.stale,te=R.impl&&R.impl.stale,G=A.route_source==="derived",Te=A.route||E.route||"\u2014";return f`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${G?" detail-kv__v--derived":""}"
          title=${G?"route \uCD94\uB860\uAC12 (metadata \uBBF8\uD540)":"route"}
          >${G&&A.route?`${Te} ? (\uCD94\uB860)`:Te}</span
        >
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">spec_review</span>
        <span class="detail-kv__v"
          >${E.spec_review||"\uC5C6\uC74C"}${ee?" \xB7 stale":""}</span
        >
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">impl_review</span>
        <span class="detail-kv__v"
          >${E.impl_review||"\uC5C6\uC74C"}${te?" \xB7 stale":""}</span
        >
      </div>
      ${E.pr_url?f`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${E.pr_url}</span>
          </div>`:""}
    `}let ke={route:["spec_backed","full_plan"]};async function Q(_,E){let A=E.target.value;if(_==="route"&&c&&c.metadata&&c.metadata.route==="full_plan"&&A!=="full_plan"&&!window.confirm(`full_plan \u2192 ${A||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){F();return}await Ae("update-workflow-meta",{id:a,key:_,value:A},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),F()}function ae(_){let E=_.metadata||{};return f` ${((R,ee)=>{let te=ke[R],G=typeof E[R]=="string"?E[R]:"";return f`<div class="detail-kv">
        <span class="detail-kv__k">${R}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${R}
          data-edit=${`wfmeta-${R}`}
          @change=${Te=>Q(R,Te)}
        >
          <option value="" ?selected=${!te.includes(G)}>
            ${ee}
          </option>
          ${te.map(Te=>f`<option value=${Te} ?selected=${G===Te}>${Te}</option>`)}
        </select>
      </div>`})("route","(\uBBF8\uC124\uC815 \xB7 \uCD94\uB860)")} `}function Ie(_){return g?f`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${$}
            @input=${nt}
            @keydown=${E=>Ce(E,$e,pe,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${$e}
            >
              저장
            </button>
            <button
              type="button"
              class="detail-edit__cancel"
              data-edit="title-cancel"
              @click=${pe}
            >
              취소
            </button>
          </div>
        </div>
      `:f`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${_}</h2>
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${ue}
        >
          ✎
        </button>
      </div>
    `}function De(_){let E=ut(_.created_at),A=ut(_.updated_at);return!E&&!A?f``:f`
      ${E?f`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${E}</span>
          </div>`:""}
      ${A?f`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${A}</span>
          </div>`:""}
    `}function T(_,E){return f`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${_e}
        >
          ${Za.map(A=>f`<option value=${A} ?selected=${A===_}>${A}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${Ne}
        >
          ${Ka.map(A=>f`<option value=${String(A)} ?selected=${A===E}>
                P${A}
              </option>`)}
        </select>
      </div>
    `}function D(_){return f`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${b?"":f`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${oe}
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
              .value=${k}
              @input=${Me}
              @keydown=${E=>Ce(E,Ee,Ve,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${Ee}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${Ve}
              >
                취소
              </button>
            </div>
          </div>`:f`<div class="detail-overlay__desc">
            ${_||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function X(_){let E=Array.isArray(_.labels)?_.labels:[];return f`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${E.map(A=>f`<span class="detail-label-chip"
              >${A}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${A}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+A}
                @click=${()=>y(A)}
              >
                ×
              </button></span
            >`)}
        <span class="detail-label-add">
          <input
            class="detail-label-add__input"
            aria-label="라벨 추가"
            placeholder="라벨 추가"
            .value=${L}
            @input=${Ze}
            @keydown=${Pe}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${Le}
          >
            추가
          </button>
        </span>
      </div>
    `}function V(){if(!a)return f``;let _=c||{},E=String(_.id||a),A=_.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",R=_.status||"open",ee=typeof _.priority=="number"?Math.max(0,Math.min(4,_.priority)):"",te=_.description||"",G={..._,metadata:{..._.metadata||{},...h}};return f`
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
            @click=${Se}
          >
            ${E}
          </button>
          ${Ie(A)} ${T(R,ee)}
          ${De(_)} ${D(te)}
          ${X(_)} ${he(_)}
          ${me(_)} ${ae(_)}
          ${Ts(_,w)}
          ${Es(G,B,C())}
          ${uo(S(),p)}
        </div>
      </div>
    `}function F(){ce(V(),t)}return{load(_){_!==a&&(h={},N()),a=_,c=null,Re()},clear(){a=null,c=null,h={},N(),H.close(),O.close(),ce(f``,t)},destroy(){P&&(P(),P=null),W&&(W(),W=null),document.removeEventListener("keydown",K),H.destroy(),q.parentNode&&q.parentNode.removeChild(q),O.destroy(),j.parentNode&&j.parentNode.removeChild(j),a=null,c=null,ce(f``,t)}}}var Xa=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function fo(t,e){return Gr(t,e)?"shown":e.hidden_labels.includes(t)?"hidden_exact":"hidden_prefix"}function Qa(t,e,r){if(!r)return{hidden_labels:e.hidden_labels.includes(t)?e.hidden_labels:[...e.hidden_labels,t],visible_labels:e.visible_labels.filter(o=>o!==t)};let n=e.hidden_labels.filter(o=>o!==t);return e.hidden_prefixes.some(o=>o.length>0&&t.startsWith(o))?{hidden_labels:n,visible_labels:e.visible_labels.includes(t)?e.visible_labels:[...e.visible_labels,t]}:{hidden_labels:n}}function ho(t,e){let{policyStore:r,transport:n,labelOptions:s}=e,o=document.createElement("dialog");o.id="display-settings-dialog",o.className="display-settings",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),t.appendChild(o);let i="";async function l(x){let v=r.get();if(v)try{let p=await n("display-policy-set",{expected_revision:v.revision,policy:x(v)});a(p),p&&p.conflict&&p.policy&&(p=await n("display-policy-set",{expected_revision:p.policy.revision,policy:x(p.policy)}),a(p)),p&&p.conflict&&J("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC","error",4e3)}catch{J("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function a(x){x&&x.policy&&typeof x.policy=="object"&&r.set(x.policy)}function c(x){let v=r.get();if(!v)return;let p=fo(x,v)!=="shown";l(C=>Qa(x,C,p))}function h(){let x=i.trim();x.length!==0&&(i="",l(v=>v.hidden_prefixes.includes(x)?{hidden_prefixes:v.hidden_prefixes}:{hidden_prefixes:[...v.hidden_prefixes,x]}),N())}function g(x){l(v=>({hidden_prefixes:v.hidden_prefixes.filter(p=>p!==x)}))}function b(x){let v=r.get();if(!v)return;let p=v.chips[x]===!1;l(()=>({chips:{[x]:p}}))}function $(x){let v=s();return f`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">라벨 표시</h3>
        <p class="display-settings__hint">
          라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을
          누르면 그 라벨만 예외로 다시 표시됩니다.
        </p>
        ${v.length===0?f`<div class="display-settings__empty">라벨 없음</div>`:f`<div class="display-settings__pills">
              ${v.map(p=>{let C=fo(p,x);return f`<button
                  type="button"
                  class=${`display-settings__pill display-settings__pill--${C}`}
                  data-label=${p}
                  data-state=${C}
                  @click=${()=>c(p)}
                >
                  ${p}
                </button>`})}
            </div>`}
      </section>
    `}function k(x){return f`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">숨김 prefix</h3>
        <div class="display-settings__prefixes">
          ${x.hidden_prefixes.map(v=>f`<span class="display-settings__prefix">
                ${v}
                <button
                  type="button"
                  class="display-settings__prefix-remove"
                  aria-label=${`${v} \uADDC\uCE59 \uC81C\uAC70`}
                  @click=${()=>g(v)}
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
          <button type="button" @click=${h}>추가</button>
        </div>
      </section>
    `}function L(x){return f`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">카드 표시 요소</h3>
        <div class="display-settings__toggles">
          ${Xa.map(([v,p])=>f`<label class="display-settings__toggle">
                <input
                  type="checkbox"
                  data-chip=${v}
                  .checked=${x.chips[v]!==!1}
                  @change=${()=>b(v)}
                />
                <span>${p}</span>
              </label>`)}
        </div>
      </section>
    `}function N(){let x=r.get();ce(f`
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
            ${x?f`${$(x)} ${k(x)}
                ${L(x)}`:f`<div class="display-settings__empty">
                  표시 정책을 불러오는 중…
                </div>`}
          </div>
        </div>
      `,o)}let q=!1,H=()=>{q=!1};o.addEventListener("close",H),o.addEventListener("cancel",H);let j=null;r.subscribe&&(j=r.subscribe(()=>{q&&N()}));function O(){q||(i="",q=!0,N(),typeof o.showModal=="function"?o.showModal():o.setAttribute("open",""))}function S(){q&&(q=!1,typeof o.close=="function"?o.close():o.removeAttribute("open"))}return{open:O,close:S,destroy(){q=!1,o.removeEventListener("close",H),o.removeEventListener("cancel",H),j&&(j(),j=null),o.remove()}}}function mo(t){let e=document.createElement("dialog");e.id="fatal-error-dialog",e.setAttribute("role","alertdialog"),e.setAttribute("aria-modal","true"),e.innerHTML=`
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
    </div>`,t.appendChild(e);let r=e.querySelector("#fatal-error-title"),n=e.querySelector("#fatal-error-message"),s=e.querySelector("#fatal-error-detail"),o=e.querySelector("#fatal-error-reload"),i=e.querySelector("#fatal-error-close"),l=()=>{if(typeof e.close=="function")try{e.close()}catch{}e.removeAttribute("open")},a=(c,h,g="")=>{r&&(r.textContent=c||"Unexpected Error"),n&&(n.textContent=h||"An unrecoverable error occurred.");let b=typeof g=="string"?g.trim():"";if(s&&(b.length>0?(s.textContent=b,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof e.showModal=="function")try{e.showModal(),e.setAttribute("open","")}catch{e.setAttribute("open","")}else e.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),i&&i.addEventListener("click",()=>l()),e.addEventListener("cancel",c=>{c.preventDefault(),l()}),{open:a,close:l,getElement(){return e}}}function go(t,e,r){let n=ye("views:nav"),s=null;function o(a){return c=>{c.preventDefault(),n("click tab %s",a),r.gotoView(a)}}function i(){let c=e.getState().view==="worker"?"worker":"board";return f`
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
    `}function l(){ce(i(),t)}return l(),s=e.subscribe(()=>l()),{destroy(){s&&(s(),s=null),ce(f``,t)}}}var _o=["bug","feature","task","epic","chore"];function bo(t){switch((t||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var yo=["Critical","High","Medium","Low","Backlog"];function wo(t,e){let r=document.createElement("dialog");r.id="new-issue-dialog",r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true"),r.innerHTML=`
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
  `,t.appendChild(r);let n=r.querySelector("#new-issue-form"),s=r.querySelector("#new-title"),o=r.querySelector("#new-type"),i=r.querySelector("#new-priority"),l=r.querySelector("#new-labels"),a=r.querySelector("#new-description"),c=r.querySelector("#new-issue-error"),h=r.querySelector("#btn-cancel"),g=r.querySelector("#btn-create"),b=r.querySelector(".new-issue__close");function $(){o.replaceChildren();let S=document.createElement("option");S.value="",S.textContent="\u2014 Select \u2014",o.appendChild(S);for(let x of _o){let v=document.createElement("option");v.value=x,v.textContent=bo(x),o.appendChild(v)}i.replaceChildren();for(let x=0;x<=4;x+=1){let v=document.createElement("option");v.value=String(x);let p=yo[x]||"Medium";v.textContent=`${x} \u2013 ${p}`,i.appendChild(v)}}$();function k(){try{typeof r.close=="function"?r.close():r.removeAttribute("open")}catch{r.removeAttribute("open")}}function L(S){s.disabled=S,o.disabled=S,i.disabled=S,l.disabled=S,a.disabled=S,h.disabled=S,g.disabled=S,g.textContent=S?"Creating\u2026":"Create"}function N(){c.textContent=""}function q(S){c.textContent=S}function H(){try{let S=window.localStorage.getItem("beads-ui.new.type");S?o.value=S:o.value="";let x=window.localStorage.getItem("beads-ui.new.priority");x&&/^\d$/.test(x)?i.value=x:i.value="2"}catch{o.value="",i.value="2"}}function j(){let S=o.value||"",x=i.value||"";S.length>0&&window.localStorage.setItem("beads-ui.new.type",S),x.length>0&&window.localStorage.setItem("beads-ui.new.priority",x)}async function O(){N();let S=String(s.value||"").trim();if(S.length===0){q("Title is required"),s.focus();return}let x=Number(i.value||"2");if(!(x>=0&&x<=4)){q("Priority must be 0..4"),i.focus();return}let v=String(o.value||""),p=String(a.value||""),C={title:S};v.length>0&&(C.type=v),String(x).length>0&&(C.priority=x),p.length>0&&(C.description=p),L(!0);try{await e("create-issue",C)}catch{L(!1),q("Failed to create issue");return}j(),L(!1),k()}return r.addEventListener("cancel",S=>{S.preventDefault(),k()}),b.addEventListener("click",()=>k()),h.addEventListener("click",()=>k()),r.addEventListener("keydown",S=>{S.key==="Enter"&&(S.ctrlKey||S.metaKey)&&(S.preventDefault(),O())}),n.addEventListener("submit",S=>{S.preventDefault(),O()}),{open(){n.reset(),N(),H();try{"showModal"in r&&typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")}catch{r.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){k()}}}function ko(t){if(typeof t!="number"||!Number.isFinite(t)||t<=0)return"";if(t<6e4)return`${Math.round(t/1e3)}\uCD08`;let e=t/6e4;return`${Number.isInteger(e)?e:Math.round(e*10)/10}\uBD84`}function vo(t){return Array.isArray(t)?t.filter(e=>typeof e=="string").join(" "):""}var Ja={deployed:{modifier:"ok",label:"\uC131\uACF5"},launched:{modifier:"launched",label:"\uBC1C\uC0AC\uB428"},failed:{modifier:"fail",label:"\uC2E4\uD328"}},el=[{key:"orchestration_model",values:()=>Kr},{key:"orchestration_effort",values:()=>Xr},{key:"review_model",values:()=>Qr},{key:"impl_model",values:()=>Jr}];function $o(t,e){let{queueStore:r,transport:n,getWorkspacePath:s}=e,o=document.createElement("dialog");o.id="worker-exec-defaults-dialog",o.className="exec-defaults",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),t.appendChild(o);function i(){return r&&r.get()||{revision:0,exec_defaults:{}}}function l(){let p=i();return typeof p.revision=="number"?p.revision:0}function a(){let p=i().exec_defaults;return p&&typeof p=="object"?p:{}}function c(p){p&&p.queue&&r&&r.set(p.queue)}async function h(p,C){if(!n)return;let P={key:p,value:C||null};try{let W=await n("worker-queue-set-exec-default",{...P,expected_revision:l()});c(W),W&&W.conflict&&(W=await n("worker-queue-set-exec-default",{...P,expected_revision:l()}),c(W)),W&&W.conflict&&J("\uC804\uC5ED \uC2E4\uD589 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC","error",4e3)}catch{J("\uC804\uC5ED \uC2E4\uD589 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function g(p,C,P){let W=!!P&&!C.includes(P);return f`<div class="exec-defaults__row">
      <span class="exec-defaults__k">${p}</span>
      <select
        class="exec-defaults__sel"
        aria-label=${`\uC804\uC5ED ${p}`}
        data-key=${p}
        @change=${K=>{h(p,K.target.value)}}
      >
        <option value="" ?selected=${!P}>
          ${en[p]||"(\uAE30\uBCF8)"}
        </option>
        ${W?f`<option value=${P} ?selected=${!0}>
              ${P} (비호환)
            </option>`:""}
        ${C.map(K=>f`<option value=${K} ?selected=${P===K}>${K}</option>`)}
      </select>
    </div>`}function b(){let p=i().workspace_info;return p&&typeof p=="object"?p:{}}function $(p,C){return f`<span
      class="exec-defaults__vd-badge exec-defaults__vd-badge--${p}"
      >${C}</span
    >`}function k(p){let C=p?vo(p.cmd):"",P=p?ko(p.timeout_ms):"",W=!!p&&p.source==="detected";return f`<div class="exec-defaults__vd-group" data-vd="verify">
      <div class="exec-defaults__vd-label">머지 전 검증 (verify)</div>
      ${C?f`<div class="exec-defaults__vd-line">
            <span class="exec-defaults__vd-cmd">${C}</span>
            ${W?$("detected","\uC790\uB3D9\uAC10\uC9C0"):$("config","config")}
            ${P?f`<span class="exec-defaults__vd-meta"
                  >timeout ${P}</span
                >`:""}
          </div>`:f`<div class="exec-defaults__vd-line exec-defaults__vd-absent">
            검증 없음
          </div>`}
    </div>`}function L(p){let C=p?vo(p.cmd):"",P=p?ko(p.timeout_ms):"",W=P?`timeout ${P} \xB7 verify \uD1B5\uACFC \uC2DC\uC5D0\uB9CC \uC2E4\uD589`:"verify \uD1B5\uACFC \uC2DC\uC5D0\uB9CC \uC2E4\uD589",K=s&&s()||"<workspace \uACBD\uB85C>";return f`<div class="exec-defaults__vd-group" data-vd="deploy">
      <div class="exec-defaults__vd-label">머지 후 배포 (deploy)</div>
      ${C?f`<div class="exec-defaults__vd-line">
            <span class="exec-defaults__vd-cmd">${C}</span>
            ${$("config","config")}
            ${p.detached===!0?$("detached","detached"):""}
            <span class="exec-defaults__vd-meta">${W}</span>
          </div>`:f`<div class="exec-defaults__vd-line exec-defaults__vd-absent">
            배포 없음 —
            <span class="exec-defaults__vd-cmd"
              >[worker.deploy."${K}"]</span
            >
            섹션으로 정의
          </div>`}
    </div>`}function N(p){if(!p||typeof p!="object")return"";let C=Ja[String(p.outcome)];if(!C)return"";let P=p.outcome==="failed"&&p.reason?`${C.label} \xB7 ${p.reason}`:C.label,W=[ut(p.at),typeof p.bead_id=="string"?p.bead_id:"",typeof p.base_sha=="string"?p.base_sha.slice(0,7):""].filter(K=>K.length>0).join(" \xB7 ");return f`<div class="exec-defaults__vd-group" data-vd="last-deploy">
      <div class="exec-defaults__vd-label">마지막 배포</div>
      <div class="exec-defaults__vd-line">
        ${$(C.modifier,P)}
        ${W?f`<span class="exec-defaults__vd-meta">${W}</span>`:""}
      </div>
    </div>`}function q(p){return f`<section class="exec-defaults__vd">
      <p class="exec-defaults__vd-title">
        검증·배포 설정
        <span class="exec-defaults__vd-ro"
          >읽기 전용 — config.toml에서 정의</span
        >
      </p>
      ${k(p.verify_cmd)} ${L(p.deploy_cmd)}
      ${N(p.last_deploy)}
    </section>`}function H(){let p=a();ce(f`
        <div class="exec-defaults__container">
          <header class="exec-defaults__header">
            <div class="exec-defaults__title">전역 실행 설정</div>
            <button
              type="button"
              class="exec-defaults__close"
              aria-label="닫기"
              @click=${v}
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
            ${el.map(C=>g(C.key,C.values(),p[C.key]||""))}
            ${q(b())}
          </div>
        </div>
      `,o)}let j=!1,O=()=>{j=!1};o.addEventListener("close",O),o.addEventListener("cancel",O);let S=null;r&&r.subscribe&&(S=r.subscribe(()=>{j&&H()}));function x(){j||(j=!0,H(),typeof o.showModal=="function"?o.showModal():o.setAttribute("open",""))}function v(){j&&(j=!1,typeof o.close=="function"?o.close():o.removeAttribute("open"))}return{open:x,close:v,destroy(){j=!1,o.removeEventListener("close",O),o.removeEventListener("cancel",O),S&&(S(),S=null),o.remove()}}}function tl(t){let e=t.draggable&&!t.done,r=Array.isArray(t.badges)?t.badges:[];return f`<div
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
        </button>`:""}
    ${t.discard_action?f`<button
          type="button"
          class="worker-mini__discard"
          data-bead-id=${t.id}
          title="PR을 닫고 워크트리/브랜치를 폐기합니다 (되돌릴 수 없음). 다시 실행하려면 후보 레인에서 대기 레인으로 옮기세요"
        >
          폐기
        </button>`:""}
  </div>`}function rl(t){let e=t.draggable&&!t.done,r=t.workflow,n=r&&r.chips||{},s=n.route||r&&r.route,o=n.route_source==="derived"||!!(r&&r.route_source==="derived"),i=typeof t.reason=="string"&&t.reason.startsWith("\u26D4");return f`<div
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
      ${t.body?t.body:t.items.length===0?f`<div class="worker-pane__empty">${t.empty||""}</div>`:t.items.map(e=>t.lane==="candidate"?rl(e):tl(e))}
    </div>
  </section>`}function nl(t){if(!Number.isFinite(t)||t<0)return"0s";let e=Math.floor(t/1e3),r=Math.floor(e/60),n=e%60;return r>0?`${r}m ${String(n).padStart(2,"0")}s`:`${n}s`}function xo(t){let e=Array.isArray(t.cleanupFailures)?t.cleanupFailures:[];return f`<div class="worker-banners">
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
  </div>`}function sl(t,e,r=null){let n=!!t.paused,s=n?"\uC77C\uC2DC\uC815\uC9C0":typeof t.started_at=="number"?nl(e-t.started_at):"\u2014",o=[t.runner,t.model].filter(Boolean).join(" \xB7 "),i=t.attempt_id&&t.attempt_id===r;return f`<div
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
  </div>`}function So(t,e=Date.now(),r=null){let n=Array.isArray(t)?t:[];return f`<div class="worker-rungrid" id="worker-rungrid">
    ${n.length===0?f`<div class="worker-rungrid__empty">실행 세션 없음</div>`:n.map(s=>sl(s,e,r))}
  </div>`}var ol="tab:worker:ready",il="tab:worker:blocked",Tr=1;function al(t){let e=t&&t.metadata;return!!(e&&typeof e=="object"&&e.spec_id)}function ll(t){let e=t&&t.parent;return(typeof e=="string"?e.length>0:!!(e&&e.id))||/\.\d+$/.test(t&&t.id||"")}function cl(t){let r=(Array.isArray(t?.dependencies)?t.dependencies:[]).map(n=>typeof n=="string"?n:n&&n.id).filter(Boolean);return r.length>0?`\u{1F512} ${r.join(", ")}`:"\u{1F512} blocked"}var dl=["closed_unmerged","undecidable"];function ul(t,e,r,n){let s=r[t]||null,o=s&&s.gate?s.gate:null,i=s&&s.pr?s.pr:null,l=[];o&&o.gate_badge&&l.push(o.gate_badge),o&&o.base_badge&&o.base_badge!==o.gate_badge&&l.push(o.base_badge),n&&l.push("\uC815\uB9AC \uC2E4\uD328");let a=!!o&&o.base_badge==="\uCDA9\uB3CC",c=!!o&&o.enabled===!0,h=!!n&&!!o&&o.tier==="merged";return{id:t,title:e,reason:n?"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644":"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",pr_number:i&&typeof i.number=="number"?i.number:null,pr_url:i&&typeof i.url=="string"?i.url:"",badges:l,alert:!!o&&dl.includes(o.tier)||!!n,merge_action:!0,discard_action:!n&&!(o&&o.tier==="merged"),merge_enabled:c||a||h,merge_title:h?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uCC98\uC74C\uBD80\uD130 \uB2E4\uC2DC \uC218\uD589\uD569\uB2C8\uB2E4":a?"\uCDA9\uB3CC \u2014 \uD074\uB9AD\uD558\uBA74 \uCDA9\uB3CC \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4 (\uBA38\uC9C0\uD558\uC9C0 \uC54A\uC74C)":c?`\uBA38\uC9C0 (${o.gate_badge}) \u2014 \uD074\uB9AD \uC2DC\uC810\uC5D0 \uB2E4\uC2DC \uD655\uC778\uD569\uB2C8\uB2E4`:o&&o.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${o&&o.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function $n(t,e={}){let{transport:r,issueStores:n,queueStore:s,sessionLogStore:o,uiOrderStore:i,gotoIssue:l,getWorkspacePath:a}=e,c=n?dr(n,i):null,h=ur({transport:r,uiOrderStore:i}),g=null,b=[],$=[],k=document.createElement("div");k.className="worker-console";let L=document.createElement("div"),N=document.createElement("div");N.className="worker-drawer-overlay",N.hidden=!0;let q=document.createElement("div");q.className="worker-drawer-overlay__backdrop";let H=document.createElement("div");H.className="worker-drawer-host",N.append(q,H);let j=document.createElement("div");j.className="worker-lanes-host",k.append(L,N,j),t.appendChild(k);let O=null,S=hr(H,{transport:r,sessionLogStore:o,onClose:()=>{O=null,N.hidden=!0,$e()}}),x=$o(k,{queueStore:s,transport:r,getWorkspacePath:a});function v(){return s&&s.get()||{revision:0,auto_advance:!1,slots:Tr,queue:[],pr_wait:[],done:[]}}function p(){let y=v();return typeof y.revision=="number"?y.revision:0}function C(y){y&&y.queue&&s&&s.set(y.queue)}async function P(y,w){if(!r)return;let B=await r("worker-queue-place",{bead_id:y,index:w,expected_revision:p()});C(B),B&&B.conflict&&await r("worker-queue-place",{bead_id:y,index:w,expected_revision:p()}).then(C)}async function W(y,w){if(!r)return;let B=await r("worker-queue-reorder",{bead_id:y,to_index:w,expected_revision:p()});C(B),B&&B.conflict&&await r("worker-queue-reorder",{bead_id:y,to_index:w,expected_revision:p()}).then(C)}async function K(y){if(!r)return;let w=await r("worker-queue-remove",{bead_id:y,expected_revision:p()});C(w),w&&w.conflict&&await r("worker-queue-remove",{bead_id:y,expected_revision:p()}).then(C)}async function Re(y){!r||!y||await r("worker-attempt-stop",{attempt_id:y})}async function Be(y){if(!r||!y)return;let w=await r("worker-attempt-pause",{attempt_id:y});w&&w.paused===!1&&w.reason&&J(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${w.reason}`,"error",2400)}async function Se(y){if(!r||!y)return;let w=await r("worker-attempt-resume",{attempt_id:y,expected_revision:p()});C(w),w&&w.conflict&&(w=await r("worker-attempt-resume",{attempt_id:y,expected_revision:p()}),C(w)),w&&w.resumed===!1&&!w.conflict&&w.reason&&J(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${w.reason}`,"error",2400)}async function Ke(y){if(!r||!y)return;let w=await r("worker-attempt-dismiss",{attempt_id:y,expected_revision:p()});C(w),w&&w.conflict&&(w=await r("worker-attempt-dismiss",{attempt_id:y,expected_revision:p()}),C(w)),w&&w.dismissed===!1&&!w.conflict&&w.reason&&J(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${w.reason}`,"error",2400)}async function We(y){if(!r||!y)return;let w=await r("worker-pr-merge",{bead_id:y,expected_revision:p()});if(C(w),w&&w.conflict&&(w=await r("worker-pr-merge",{bead_id:y,expected_revision:p()}),C(w)),!(!w||w.conflict)){if(w.action==="conflict_resolution"){J(w.ok?"\uCDA9\uB3CC \u2014 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 (\uBA38\uC9C0\uD558\uC9C0 \uC54A\uC74C)":`\uCDA9\uB3CC \uD574\uC18C \uB514\uC2A4\uD328\uCE58 \uC2E4\uD328: ${w.reason||""}`,w.ok?"success":"error",2800);return}if(w.ok){J("\uBA38\uC9C0 + \uC815\uB9AC \uC644\uB8CC","success",2e3);return}J(w.cleanup_step?`\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uC2E4\uD328(${w.cleanup_step}): ${w.reason||""}`:`\uBA38\uC9C0 \uAC70\uBD80: ${w.reason||""}`,"error",3200)}}async function we(y){if(!r||!y||!(typeof globalThis.confirm!="function"||globalThis.confirm(`${y}: PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4. \uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694. \uACC4\uC18D\uD560\uAE4C\uC694?`)))return;let B=await r("worker-pr-discard",{bead_id:y,expected_revision:p()});if(C(B),B&&B.conflict&&(B=await r("worker-pr-discard",{bead_id:y,expected_revision:p()}),C(B)),B&&B.discarded===!0){J("\uD3D0\uAE30 \uC644\uB8CC \u2014 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB2E4\uC2DC \uC2E4\uD589\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4","success",2400);return}B&&B.discarded===!1&&!B.conflict&&J(`\uD3D0\uAE30 \uAC70\uBD80: ${B.reason||""}`,"error",2800)}async function Ae(y){if(!r)return;let w=await r("worker-queue-toggle",{on:y,expected_revision:p()});C(w),w&&w.conflict&&await r("worker-queue-toggle",{on:y,expected_revision:p()}).then(C)}async function Ye(y){if(!r||!Number.isFinite(y))return;let w=Math.max(Tr,Math.floor(y)),B=await r("worker-queue-set-slots",{slots:w,expected_revision:p()});C(B),B&&B.conflict&&await r("worker-queue-set-slots",{slots:w,expected_revision:p()}).then(C)}function ue(){let y=v(),w=c?c.selectBoardColumn(ol,"ready"):[],B=c?c.selectBoardColumn(il,"blocked"):[],se=new Map;for(let M of[...w,...B])se.set(M.id,M.title||M.id);let fe=y.pr_wait||[],he=y.pr_observations||{},me=y.cleanup_failed||{},ke=Object.entries(me).map(([M,d])=>({bead_id:M,step:d&&d.step?d.step:"",reason:d&&d.reason?d.reason:""})),Q=y.queue||[],ae=new Set([...Q.map(M=>M.bead_id),...fe.map(M=>M.bead_id),...y.done.map(M=>M.bead_id)]),Ie=new Set(B.map(M=>M.id)),De=i?i.get()?.order||{}:{},T=new Set,D=[];for(let M of[...w,...B])ae.has(M.id)||T.has(M.id)||ll(M)||(T.add(M.id),D.push(M));D.sort(lr(De)),b=D;let X=y.admission||{},V=M=>{let d=X[M];if(!d)return"";let m=typeof d.reason=="string"?d.reason:"",U=m.indexOf(":");return U>0&&U<m.length-1?`\u26D4 ${m.slice(0,U)} (${m.slice(U+1)})`:`\u26D4 ${m}`},F=D.map(M=>{let d=al(M),m=[];Ie.has(M.id)&&m.push(cl(M)),d||m.push("spec \uC5C6\uC74C");let U=V(M.id);return U&&m.push(U),{id:M.id,title:M.title||M.id,reason:m.join(" \xB7 "),draggable:d,lane:"candidate",workflow:M.workflow,status:M.status}}),_=(M,d)=>M.map(m=>({id:m.bead_id,title:se.get(m.bead_id)||m.bead_id,reason:d==="done"?"":V(m.bead_id),draggable:d!=="done",done:d==="done",lane:d})),E=y.attempts?Object.values(y.attempts):[],A=new Set;for(let M of E)M&&typeof M.resumed_from=="string"&&M.resumed_from.length>0&&A.add(M.resumed_from);let R=new Map;for(let M of E)R.set(M.bead_id,M.attempt_id);let ee=[],te=null;for(let M of E){let d=M.status==="paused"&&!A.has(M.attempt_id);M.status==="running"||d?ee.push({bead_id:M.bead_id,attempt_id:M.attempt_id,title:se.get(M.bead_id)||M.bead_id,runner:M.runner||null,model:M.model||null,effort:M.effort||null,started_at:typeof M.started_at=="number"?M.started_at:null,resumed_from:M.resumed_from||null,paused:d,can_pause:typeof M.session_id=="string"&&M.session_id.length>0}):(M.status==="failed"||M.status==="orphaned")&&!(R.get(M.bead_id)!==M.attempt_id)&&typeof M.dismissed_at!="number"&&(te=M)}let G=null;if(te){let M=typeof te.session_id=="string"&&te.session_id.length>0,d=A.has(te.attempt_id);G={repo:te.repo||"",reason:te.cause||te.status,resume_attempt_id:te.attempt_id,resume_eligible:M&&!d,resume_reason:M?d?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}}let Te=new Set(ee.map(M=>M.bead_id)),ot=ee.filter(M=>!M.paused).length,At=(y.workspace_info||{}).slots,Xe=typeof At=="number"?At:typeof y.slots=="number"?y.slots:Tr,mt=ot>Xe;return{queue:y,idToTitle:se,candidates:F,running:ee,live_count:ot,slots:Xe,over_cap:mt,failure:G,waiting:_(Q.filter(M=>!Te.has(M.bead_id)),"queue"),pr_wait:fe.map(M=>ul(M.bead_id,se.get(M.bead_id)||M.bead_id,he,me[M.bead_id]||null)),done:_(y.done,"done"),cleanup_failures:ke}}function nt(y){let w=y.waiting.length>0?y.waiting[0].id:"\u2014";return f`<div class="worker-ctrl">
        <button
          type="button"
          class="worker-play${y.queue.auto_advance?" is-active":""}"
        >
          ${y.queue.auto_advance?"\u23F8 \uC77C\uC2DC\uC815\uC9C0":"\u25B6 \uC790\uB3D9 \uC9C4\uD589"}
        </button>
        <span class="worker-stat"
          >실행 <b>${y.live_count}</b> · 다음 <b>${w}</b></span
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
      ${xo({failure:y.failure,cleanupFailures:y.cleanup_failures})}`}function pe(y){return f`<div class="worker-lanes">
      ${Nt({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:y.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C"})}
      ${Nt({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:y.waiting,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58"})}
      ${Nt({id:"worker-pane-running",lane:"running",title:`\uC2E4\uD589 \uC911 \xB7 \uC2AC\uB86F ${y.slots}`,items:y.running,body:So(y.running,Date.now(),O)})}
      ${Nt({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:y.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C"})}
      ${Nt({id:"worker-pane-done",lane:"done",title:`\uC644\uB8CC \xB7 \uC624\uB298 ${y.done.length}`,items:y.done,empty:"\uC644\uB8CC \uC5C6\uC74C"})}
    </div>`}function $e(){let y=ue();ce(nt(y),L),ce(pe(y),j)}function oe(y){let w=y.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!w)return;let B=w.dataset.beadId||"",se=w.dataset.lane||"";g={bead_id:B,from_lane:se};try{y.dataTransfer?.setData("text/plain",B),y.dataTransfer&&(y.dataTransfer.effectAllowed="move")}catch{}}function Me(y){let w=y.target?.closest?.(".worker-pane");if(!w)return;let B=w.dataset.lane||"";B!=="candidate"&&B!=="queue"||(y.preventDefault(),y.dataTransfer&&(y.dataTransfer.dropEffect="move"),w.classList.add("worker-pane--drag-over"))}function Ve(y){y.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function Ee(y,w){let B=b.find(me=>me.id===y);if(!B)return;let se=b.filter(me=>me.id!==y),fe=se.length;if(w){let me=w.dataset.beadId;if(me===y)return;let ke=se.findIndex(Q=>Q.id===me);ke>=0&&(fe=ke)}let he=se.slice();he.splice(fe,0,B),h.applyReorder(y,he,fe)}function Ce(y){let w=y.target?.closest?.(".worker-pane");if(!w)return;y.preventDefault(),w.classList.remove("worker-pane--drag-over");let B=w.dataset.lane||"",se=g?.bead_id||y.dataTransfer?.getData("text/plain")||"",fe=g?.from_lane||"";if(g=null,!se)return;let he=y.target?.closest?.(".worker-mini, .worker-card"),me=Array.from(w.querySelectorAll(".worker-mini, .worker-card")),ke=me.length;if(he){let Q=me.indexOf(he);Q>=0&&(ke=Q)}if(B==="candidate"){if(fe==="candidate"){Ee(se,he);return}fe==="queue"&&K(se);return}B==="queue"&&(fe==="queue"?W(se,ke):P(se,ke))}function _e(y){let w=y.target?.closest?.(".worker-slots__input");if(!w)return;let B=Number.parseInt(w.value,10);if(!Number.isFinite(B)){$e();return}Ye(B).then($e)}function Ne(y){return y?{runner:y.runner||void 0,model:y.model||void 0,effort:y.effort||void 0,worktree:y.worktree||void 0,status:y.status||void 0,session_id:y.session_id||void 0}:{}}function Ze(y){let w=v(),B=w.attempts?w.attempts[y]:null;O=y,N.hidden=!1,S.open({attempt_id:y,meta:Ne(B)}),$e()}function Le(){if(!O)return;let y=v(),w=y.attempts?y.attempts[O]:null;if(w){S.updateMeta(Ne(w));return}S.close()}function Pe(y){let w=y.target;if(w?.closest?.("#worker-exec-defaults-dialog"))return;if(w?.closest?.(".worker-exec-defaults-btn")){x.open();return}let B=w?.closest?.(".worker-banner__resume");if(B){let Q=B.dataset.attemptId;Q&&Se(Q);return}let se=w?.closest?.(".worker-banner__dismiss");if(se){let Q=se.dataset.attemptId;Q&&Ke(Q);return}if(w?.closest?.(".worker-play")){Ae(!v().auto_advance);return}let fe=w?.closest?.(".worker-mini__merge");if(fe){We(fe.dataset.beadId||"");return}let he=w?.closest?.(".worker-mini__discard");if(he){we(he.dataset.beadId||"");return}if(w?.closest?.(".worker-mini__pr"))return;if(w?.closest?.(".rtile__stop")){let ae=w?.closest?.(".rtile")?.dataset?.attemptId;ae&&Re(ae);return}if(w?.closest?.(".rtile__pause")){let ae=w?.closest?.(".rtile")?.dataset?.attemptId;ae&&Be(ae);return}if(w?.closest?.(".rtile__resume")){let ae=w?.closest?.(".rtile")?.dataset?.attemptId;ae&&Se(ae);return}if(w?.closest?.(".rtile__info")){let ae=w?.closest?.(".rtile")?.dataset?.beadId;ae&&l&&l(ae);return}if(w?.closest?.(".worker-drawer-overlay__backdrop")){S.close();return}if(w?.closest?.(".worker-drawer-host"))return;let me=w?.closest?.(".rtile");if(me){let Q=me.dataset.attemptId;Q&&Ze(Q);return}let ke=w?.closest?.(".worker-mini, .worker-card");if(ke){let Q=ke.dataset.beadId;if(w?.closest?.(".worker-mini__id, .worker-card__id")){Q&&Mt(Q).then(ae=>{ae?J("\uBCF5\uC0AC\uB428","success",1200):J("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}Q&&l&&l(Q)}}return t.addEventListener("dragstart",oe),t.addEventListener("dragover",Me),t.addEventListener("dragleave",Ve),t.addEventListener("drop",Ce),t.addEventListener("click",Pe),t.addEventListener("change",_e),c&&$.push(c.subscribe($e)),s&&$.push(s.subscribe(()=>{$e(),Le()})),$e(),{load(){$e()},destroy(){for(let y of $.splice(0))try{y()}catch{}t.removeEventListener("dragstart",oe),t.removeEventListener("dragover",Me),t.removeEventListener("dragleave",Ve),t.removeEventListener("drop",Ce),t.removeEventListener("click",Pe),t.removeEventListener("change",_e);try{S.destroy()}catch{}N.hidden=!0;try{x.destroy()}catch{}ce(f``,t)}}}function xn(t){if(!t)return"Unknown";let e=t.split("/").filter(Boolean);return e.length>0?e[e.length-1]:"Unknown"}function Ao(t,e,r,n=async()=>{},s=async()=>{}){let o=ye("views:workspace-picker"),i=null,l=!1,a=!1,c=!1;async function h(x){let p=x.target.value,P=e.getState().workspace?.current?.path||"";if(p&&p!==P){o("switching workspace to %s",p),l=!0,S();try{await r(p)}catch(W){o("workspace switch failed: %o",W)}finally{l=!1,S()}}}async function g(){let x=e.getState(),v=x.workspace?.current?.path||x.workspace?.available?.[0]?.path||"";if(!(!v||a)){o("git-pulling workspace %s",v),a=!0,S();try{await n(v)}catch(p){o("workspace git pull failed: %o",p)}finally{a=!1,S()}}}function b(x){let v=x.target;v&&t.contains(v)||L()}function $(x){x.key==="Escape"&&L()}function k(){c||(c=!0,document.addEventListener("mousedown",b),document.addEventListener("keydown",$),S())}function L(){c&&(c=!1,document.removeEventListener("mousedown",b),document.removeEventListener("keydown",$),S())}function N(){c?L():k()}async function q(x){let v=x.target,p=v.value,C=v.checked;o("toggling visibility %s \u2192 %s",p,String(C));try{await s(p,C)}catch(P){o("workspace visibility toggle failed: %o",P)}}function H(x){return x?f`
      <button
        type="button"
        class="workspace-picker__git-pull-button"
        @click=${g}
        ?disabled=${l||a}
        aria-label="Git Pull"
        title="Git Pull"
      >
        <span aria-hidden="true">⬇</span>
      </button>
    `:f``}function j(x,v){return f`
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
                ${x.map(p=>f`
                    <label
                      class="workspace-picker__manage-row"
                      title="${p.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${p.path}"
                        .checked=${!v.has(p.path)}
                        @change=${q}
                      />
                      <span class="workspace-picker__manage-name"
                        >${xn(p.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function O(){let x=e.getState(),v=x.workspace?.current,p=x.workspace?.available||[],C=new Set(x.workspace?.hidden||[]),P=v?.path||p[0]?.path||"";if(p.length===0)return f``;let W=p.filter(K=>!C.has(K.path)||K.path===P);if(W.length<=1){let K=W[0]||p[0],Re=xn(K.path);return f`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${K.path}"
            >${Re}</span
          >
          ${j(p,C)}
          ${H(P)}
          ${a?f`<span
                class="workspace-picker__loading"
                aria-hidden="true"
              ></span>`:""}
        </div>
      `}return f`
      <div class="workspace-picker">
        <select
          class="workspace-picker__select"
          @change=${h}
          ?disabled=${l||a}
          aria-label="Select project workspace"
        >
          ${W.map(K=>f`
              <option
                value="${K.path}"
                ?selected=${K.path===P}
                title="${K.path}"
              >
                ${xn(K.path)}
              </option>
            `)}
        </select>
        ${j(p,C)}
        ${H(P)}
        ${l||a?f`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function S(){ce(O(),t)}return S(),i=e.subscribe(()=>S()),{destroy(){i&&(i(),i=null),document.removeEventListener("mousedown",b),document.removeEventListener("keydown",$),ce(f``,t)}}}var To=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-queue-set-slots","worker-queue-set-exec-default","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-pr-merge","worker-pr-discard","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append"];function Sn(){let t=Date.now().toString(36),e=Math.random().toString(36).slice(2,8);return`${t}-${e}`}function Eo(t,e,r=Sn()){return{id:r,type:t,payload:e}}function Co(t={}){let e=ye("ws"),r={initialMs:t.backoff?.initialMs??1e3,maxMs:t.backoff?.maxMs??3e4,factor:t.backoff?.factor??2,jitterRatio:t.backoff?.jitterRatio??.2},n=()=>t.url&&t.url.length>0?t.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",i=0,l=null,a=!0,c=new Map,h=[],g=new Map,b=new Set;function $(O){for(let S of Array.from(b))try{S(O)}catch{}}function k(){if(!a||l)return;o="reconnecting",e("ws reconnecting\u2026"),$(o);let O=Math.min(r.maxMs||0,(r.initialMs||0)*Math.pow(r.factor||1,i)),S=(r.jitterRatio||0)*O,x=Math.max(0,Math.round(O+(Math.random()*2-1)*S));e("ws retry in %d ms (attempt %d)",x,i+1),l=setTimeout(()=>{l=null,j()},x)}function L(O){try{s?.send(JSON.stringify(O))}catch(S){e("ws send failed",S)}}function N(){for(o="open",e("ws open"),$(o),i=0;h.length;){let O=h.shift();O&&L(O)}}function q(O){let S;try{S=JSON.parse(String(O.data))}catch{e("ws received non-JSON message");return}if(!S||typeof S.id!="string"||typeof S.type!="string"){e("ws received invalid envelope");return}if(c.has(S.id)){let v=c.get(S.id);c.delete(S.id),S.ok?v?.resolve(S.payload):v?.reject(S.error||new Error("ws error"));return}let x=g.get(S.type);if(x&&x.size>0)for(let v of Array.from(x))try{v(S.payload)}catch(p){e("ws event handler error",p)}else e("ws received unhandled message type: %s",S.type)}function H(){o="closed",e("ws closed"),$(o);for(let[O,S]of c.entries())S.reject(new Error("ws disconnected")),c.delete(O);i+=1,k()}function j(){if(!a)return;let O=n();try{s=new WebSocket(O),e("ws connecting %s",O),o="connecting",$(o),s.addEventListener("open",N),s.addEventListener("message",q),s.addEventListener("error",()=>{}),s.addEventListener("close",H)}catch(S){e("ws connect failed %o",S),k()}}return j(),{send(O,S){if(!To.includes(O))return Promise.reject(new Error(`unknown message type: ${O}`));let x=Sn(),v=Eo(O,S,x);return e("send %s id=%s",O,x),new Promise((p,C)=>{c.set(x,{resolve:p,reject:C,type:O}),s&&s.readyState===s.OPEN?L(v):(e("queue %s id=%s (state=%s)",O,x,o),h.push(v))})},on(O,S){g.has(O)||g.set(O,new Set);let x=g.get(O);return x?.add(S),()=>{x?.delete(S)}},onConnection(O){return b.add(O),()=>{b.delete(O)}},reconnect(){a=!0,l&&(clearTimeout(l),l=null),i=0,j()},close(){a=!1,l&&(clearTimeout(l),l=null);try{s?.close()}catch{}},getState(){return o}}}function pl(){let t=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof t?.workspace_config?.default_workspace=="string"&&t.workspace_config.default_workspace.length>0?t.workspace_config.default_workspace:null}}}async function fl(t,e){try{let n=await(await fetch("/api/config")).json();t.setState({config:n})}catch(r){e("config refresh failed",r)}}var An=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],Ro=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"]],Lo="worker:queue",Io="ui:order",Do="ui:display-policy",ft="tab:board:closed",Oo="beads-ui.board.closed-range";function hl(t){let e=ye("main");e("bootstrap start");let r=f`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;ce(r,t);let n=document.getElementById("top-nav"),s=document.getElementById("board-root"),o=document.getElementById("worker-root"),i=document.getElementById("detail-panel");if(s&&o&&i){let p=function(d,m){let U="Request failed",Z="";if(d&&typeof d=="object"){let be=d;if(typeof be.message=="string"&&be.message.length>0&&(U=be.message),typeof be.details=="string")Z=be.details;else if(be.details&&typeof be.details=="object")try{Z=JSON.stringify(be.details,null,2)}catch{Z=""}}else typeof d=="string"&&d.length>0&&(U=d);let re=m&&m.length>0?`Failed to load ${m}`:"Request failed";v.open(re,U,Z)},oe=function(d){return`${R.getState().workspace.current?.path||""}\0${d}`},Me=function(){We&&(We().catch(()=>{}),We=null),we=null,Ae=null},Ee=function(d){Ye=d;let m=()=>{Ye!==d||R.getState().selected_id!==d||(Ye=null,Ve(d))};if(!pe){nt.then(m);return}m()},Ze=function(){let d=Yn(Ne);return d===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:d}}},Le=function(d){if(d)for(let[m,U]of An){if(Ce.has(m)||_e.has(m))continue;let Z=m===ft?Ze():{type:U};try{K.register(m,Z)}catch(re){e("register %s store failed: %o",m,re)}_e.add(m),W.subscribeList(m,Z).then(re=>{Ce.set(m,re)}).catch(re=>{e("subscribe %s failed: %o",m,re),p(re,"board")}).finally(()=>{_e.delete(m)})}else y()},y=function(){for(let[d]of An){let m=Ce.get(d);m&&(m().catch(()=>{}),Ce.delete(d));try{K.unregister(d)}catch(U){e("unregister %s failed: %o",d,U)}}},se=function(d){if(!d){fe();return}for(let[m,U]of Ro)if(!(w.has(m)||_e.has(m))){try{K.register(m,{type:U})}catch(Z){e("register %s store failed: %o",m,Z)}_e.add(m),W.subscribeList(m,{type:U}).then(Z=>{w.set(m,Z)}).catch(Z=>{e("subscribe %s failed: %o",m,Z),p(Z,"worker")}).finally(()=>{_e.delete(m)})}B||(P("subscribe-worker-queue",{id:Lo}).catch(m=>{e("subscribe-worker-queue failed: %o",m)}),B=()=>P("unsubscribe-worker-queue",{id:Lo}))},fe=function(){for(let[d]of Ro){let m=w.get(d);m&&(m().catch(()=>{}),w.delete(d));try{K.unregister(d)}catch(U){e("unregister %s failed: %o",d,U)}}B&&(B().catch(()=>{}),B=null)},me=function(){he||(P("subscribe-ui-order",{id:Io}).catch(d=>{e("subscribe-ui-order failed: %o",d)}),he=()=>P("unsubscribe-ui-order",{id:Io}))},ke=function(){he&&(he().catch(()=>{}),he=null),Be.clear()},ae=function(){Q||(P("subscribe-display-policy",{id:Do}).catch(d=>{e("subscribe-display-policy failed: %o",d)}),Q=()=>P("unsubscribe-display-policy",{id:Do}))},Ie=function(){Q&&(Q().catch(()=>{}),Q=null),Se.clear()},F=function(d){if(!d)return"Unknown";let m=d.split("/").filter(Boolean);return m.length>0?m[m.length-1]:"Unknown"};var l=p,a=oe,c=Me,h=Ee,g=Ze,b=Le,$=y,k=se,L=fe,N=me,q=ke,H=ae,j=Ie,O=F;let S=document.getElementById("header-loading"),x=gs(S),v=mo(t),C=Co(),P=x.wrapSend((d,m)=>C.send(d,m)),W=cs(P),K=ds(),Re=ps(),Be=us(),Se=Vn(),Ke=Zn();C.on("ui-order-snapshot",d=>{let m=d;if(m&&typeof m.revision=="number")try{Be.set({revision:m.revision,order:m.order&&typeof m.order=="object"?m.order:{}})}catch{}}),C.on("display-policy-snapshot",d=>{let m=d;if(m&&m.policy&&typeof m.policy=="object")try{Se.set(m.policy)}catch{}}),C.on("session-log-snapshot",d=>{let m=d;if(m&&typeof m.attempt_id=="string")try{Ke.set(m.attempt_id,Array.isArray(m.lines)?m.lines:[])}catch{}}),C.on("session-log-append",d=>{let m=d;if(m&&typeof m.attempt_id=="string")try{Ke.append(m.attempt_id,m.event)}catch{}}),C.on("snapshot",d=>{let m=d,U=m&&typeof m.id=="string"?m.id:"",Z=U?K.getStore(U):null;if(Z&&m&&m.type==="snapshot")try{Z.applyPush(m)}catch{}}),C.on("upsert",d=>{let m=d,U=m&&typeof m.id=="string"?m.id:"",Z=U?K.getStore(U):null;if(Z&&m&&m.type==="upsert")try{Z.applyPush(m)}catch{}}),C.on("delete",d=>{let m=d,U=m&&typeof m.id=="string"?m.id:"",Z=U?K.getStore(U):null;if(Z&&m&&m.type==="delete")try{Z.applyPush(m)}catch{}});let We=null,we=null,Ae=null,Ye=null,ue=()=>{},nt=new Promise(d=>{ue=()=>d(void 0)}),pe=!1,$e=!1;async function Ve(d){let m=oe(d);if(m===we||m===Ae)return;Ae=m;let U=`detail:${d}`,Z={type:"issue-detail",params:{id:d}};try{K.register(U,Z)}catch(re){e("register detail store failed: %o",re)}try{let re=await W.subscribeList(U,Z);if(R.getState().selected_id!==d||oe(d)!==m){await re().catch(()=>{});return}We&&await We().catch(()=>{}),We=re,we=m}catch(re){e("detail subscribe failed: %o",re),p(re,"issue details")}finally{Ae===m&&(Ae=null)}}let Ce=new Map,_e=new Set,Ne=or;try{let d=window.localStorage.getItem(Oo);qr(d)&&(Ne=d)}catch{}async function Pe(d){if(!qr(d)||d===Ne)return;Ne=d;try{window.localStorage.setItem(Oo,d)}catch{}let m=Ce.get(ft);if(!m)return;Ce.delete(ft),await m().catch(()=>{});let U=Ze();try{K.register(ft,U)}catch(Z){e("register %s store failed: %o",ft,Z)}try{let Z=await W.subscribeList(ft,U);Ce.set(ft,Z)}catch(Z){e("re-subscribe %s failed: %o",ft,Z),p(Z,"board")}}let w=new Map,B=null,he=null,Q=null;async function De(){Q=null,Se.clear(),B=null;let d=R.getState().workspace.current?.path;if(d)try{await C.send("set-workspace",{path:d})}catch(m){e("workspace restore after reconnect failed: %o",m);return}ae(),se(R.getState().view==="worker")}async function T(){e("clearing all subscriptions for workspace switch"),y(),fe(),Re.clear(),ke(),me(),Ie(),ae(),Me();let d=R.getState();if(d.selected_id)try{K.unregister(`detail:${d.selected_id}`)}catch{}let m=R.getState();Le(m.view==="board"),se(m.view==="worker"),m.selected_id&&Ee(m.selected_id)}async function D(d){e("requesting workspace switch to %s",d),$e=!0;try{let m=await C.send("set-workspace",{path:d});e("workspace switch result: %o",m),m&&m.workspace&&(R.setState({workspace:{current:{path:m.workspace.root_dir,database:m.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",d),m.changed&&(await T(),J("Switched to "+F(d),"success",2e3)))}catch(m){throw e("workspace switch failed: %o",m),J("Failed to switch workspace","error",3e3),m}finally{$e=!1}}async function X(d){e("requesting workspace git pull for %s",d);try{let m=await C.send("git-pull-workspace",{});e("workspace git pull result: %o",m);let U=m?.status;if(U==="up_to_date"){J("Already up to date","success",2e3);return}if(U==="stash_pop_conflict"){J("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}J("Git pulled "+F(d),"success",2e3)}catch(m){e("workspace git pull failed: %o",m);let U=m?.code,Z=m?.message;if(U==="rebase_conflict"){J("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(U==="rebase_conflict_abort_failed"){J("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(U==="busy"){J("Git pull skipped: another operation is running","warning",3e3);return}let re=Z?`: ${Z}`:"";throw J(`Git pull failed${re}`,"error",3e3),m}}async function V(d,m){e("setting workspace visibility %s \u2192 %s",d,String(m));try{await C.send("set-workspace-visibility",{path:d,visible:m}),await _()}catch(U){e("workspace visibility update failed: %o",U),J("Failed to update project visibility","error",3e3)}}async function _(){try{let d=await C.send("list-workspaces",{});if(e("workspaces loaded: %o",d),d&&Array.isArray(d.workspaces)){let m=d.workspaces.map(be=>({path:be.path,database:be.database,pid:be.pid,version:be.version})),U=d.current?{path:d.current.root_dir,database:d.current.db_path}:null,Z=Array.isArray(d.hidden)?d.hidden.filter(be=>typeof be=="string"):[];R.setState({workspace:{current:U,available:m,hidden:Z}});let re=window.localStorage.getItem("beads-ui.workspace");re&&(!m.some(nr=>nr.path===re)||Z.includes(re)?window.localStorage.removeItem("beads-ui.workspace"):U&&re!==U.path&&(e("restoring saved workspace preference: %s",re),await D(re)))}}catch(d){e("failed to load workspaces: %o",d)}}C.on("workspace-changed",d=>{e("workspace-changed event: %o",d),d&&d.root_dir&&(R.setState({workspace:{current:{path:d.root_dir,database:d.db_path}}}),_(),T())});let E=!1;if(typeof C.onConnection=="function"){let d=m=>{e("ws state %s",m),m==="reconnecting"||m==="closed"?(E=!0,J("Connection lost. Reconnecting\u2026","error",4e3)):m==="open"&&E&&(E=!1,J("Reconnected","success",2200),fl(R,(U,Z)=>{e(`${U}: %o`,Z)}),De())};C.onConnection(d)}let A="board";try{let d=window.localStorage.getItem("beads-ui.view");(d==="board"||d==="worker")&&(A=d)}catch(d){e("view parse error: %o",d)}let R=ms({config:pl(),view:A});C.on("worker-queue-snapshot",d=>{let m=d;if(!m||!m.queue)return;let U=R.getState().workspace.current?.path;if(typeof U=="string"&&U.length>0&&m.root_dir!==U){e("dropping worker-queue snapshot for %s",String(m.root_dir));return}try{Re.set(m.queue)}catch{}});let ee=fs(R);ee.start();let te=async(d,m)=>{try{return await P(d,m)}catch{return[]}};n&&go(n,R,ee);let G=document.getElementById("workspace-picker");G&&Ao(G,R,D,X,V);let Te=wo(t,(d,m)=>P(d,m));try{let d=document.getElementById("new-issue-btn");d&&d.addEventListener("click",()=>Te.open())}catch{}let ht=ho(t,{policyStore:Se,transport:(d,m)=>P(d,m),labelOptions:()=>{let d=new Set;for(let[m]of An)for(let U of K.snapshotFor(m)||[]){let Z=U.labels;if(Array.isArray(Z))for(let re of Z)typeof re=="string"&&re.length>0&&d.add(re)}return Array.from(d).sort()}});try{let d=document.getElementById("display-settings-btn");d&&d.addEventListener("click",()=>ht.open())}catch{}let ot=$s(s,{gotoIssue:d=>ee.gotoIssue(d),issueStores:K,transport:te,uiOrderStore:Be,displayPolicyStore:Se,closedRange:Ne,onClosedRangeChange:d=>{Pe(d)},onNewIssue:()=>Te.open()}),At=$n(o,{transport:te,issueStores:K,queueStore:Re,sessionLogStore:Ke,uiOrderStore:Be,gotoIssue:d=>R.setState({selected_id:d}),getWorkspacePath:()=>R.getState().workspace.current?.path}),Xe=po(i,{issueStores:K,transport:te,queueStore:Re,sessionLogStore:Ke,getWorkspacePath:()=>R.getState().workspace.current?.path,onNavigate:d=>{R.getState().view==="worker"?R.setState({selected_id:d}):ee.gotoIssue(d)},onClose:()=>{let d=R.getState();R.setState({selected_id:null});try{ee.gotoView(d.view==="worker"?"worker":"board")}catch{}}}),mt=R.getState().selected_id;mt&&(i.hidden=!1,Xe.load(mt),Ee(mt)),R.subscribe(d=>{let m=d.selected_id;m?(i.hidden=!1,Xe.load(m),$e||Ee(m)):(Xe.clear(),i.hidden=!0,Me())});let M=d=>{s.hidden=d.view!=="board",o.hidden=d.view!=="worker",Le(d.view==="board"),se(d.view==="worker"),!d.selected_id&&d.view==="board"&&ot.load(),d.view==="worker"&&At.load(),window.localStorage.setItem("beads-ui.view",d.view)};R.subscribe(M),M(R.getState()),me(),ae(),_().finally(()=>{pe=!0,ue()}),window.addEventListener("keydown",d=>{let m=d.ctrlKey||d.metaKey,U=String(d.key||"").toLowerCase(),Z=d.target,re=Z&&Z.tagName?String(Z.tagName).toLowerCase():"",be=re==="input"||re==="textarea"||re==="select"||Z&&typeof Z.isContentEditable=="boolean"&&Z.isContentEditable;m&&U==="n"&&(be||(d.preventDefault(),Te.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let r=window.localStorage.getItem("beads-ui.theme"),n=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=r==="dark"||r==="light"?r:n?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let t=document.getElementById("theme-switch");t&&t.addEventListener("change",()=>{let r=t.checked?"dark":"light";document.documentElement.setAttribute("data-theme",r),window.localStorage.setItem("beads-ui.theme",r)});let e=document.getElementById("app");e&&hl(e)});export{hl as bootstrap,pl as readBootstrapConfig,fl as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
