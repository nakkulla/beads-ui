var jc=Object.create;var $s=Object.defineProperty;var zc=Object.getOwnPropertyDescriptor;var Hc=Object.getOwnPropertyNames;var Wc=Object.getPrototypeOf,Gc=Object.prototype.hasOwnProperty;var Yc=(e,t,r)=>t in e?$s(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var xs=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var Vc=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of Hc(t))!Gc.call(e,s)&&s!==r&&$s(e,s,{get:()=>t[s],enumerable:!(n=zc(t,s))||n.enumerable});return e};var Kc=(e,t,r)=>(r=e!=null?jc(Wc(e)):{},Vc(t||!e||!e.__esModule?$s(r,"default",{value:e,enumerable:!0}):r,e));var tt=(e,t,r)=>Yc(e,typeof t!="symbol"?t+"":t,r);var Aa=xs((w_,Sa)=>{var Dr=1e3,Mr=Dr*60,Nr=Mr*60,kr=Nr*24,ed=kr*7,td=kr*365.25;Sa.exports=function(e,t){t=t||{};var r=typeof e;if(r==="string"&&e.length>0)return rd(e);if(r==="number"&&isFinite(e))return t.long?sd(e):nd(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function rd(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var r=parseFloat(t[1]),n=(t[2]||"ms").toLowerCase();switch(n){case"years":case"year":case"yrs":case"yr":case"y":return r*td;case"weeks":case"week":case"w":return r*ed;case"days":case"day":case"d":return r*kr;case"hours":case"hour":case"hrs":case"hr":case"h":return r*Nr;case"minutes":case"minute":case"mins":case"min":case"m":return r*Mr;case"seconds":case"second":case"secs":case"sec":case"s":return r*Dr;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r;default:return}}}}function nd(e){var t=Math.abs(e);return t>=kr?Math.round(e/kr)+"d":t>=Nr?Math.round(e/Nr)+"h":t>=Mr?Math.round(e/Mr)+"m":t>=Dr?Math.round(e/Dr)+"s":e+"ms"}function sd(e){var t=Math.abs(e);return t>=kr?Tn(e,t,kr,"day"):t>=Nr?Tn(e,t,Nr,"hour"):t>=Mr?Tn(e,t,Mr,"minute"):t>=Dr?Tn(e,t,Dr,"second"):e+" ms"}function Tn(e,t,r,n){var s=t>=r*1.5;return Math.round(e/r)+" "+n+(s?"s":"")}});var Ea=xs((k_,Ta)=>{function od(e){r.debug=r,r.default=r,r.coerce=l,r.disable=a,r.enable=s,r.enabled=c,r.humanize=Aa(),r.destroy=u,Object.keys(e).forEach(f=>{r[f]=e[f]}),r.names=[],r.skips=[],r.formatters={};function t(f){let g=0;for(let h=0;h<f.length;h++)g=(g<<5)-g+f.charCodeAt(h),g|=0;return r.colors[Math.abs(g)%r.colors.length]}r.selectColor=t;function r(f){let g,h=null,x,$;function T(...W){if(!T.enabled)return;let k=T,J=Number(new Date),se=J-(g||J);k.diff=se,k.prev=g,k.curr=J,g=J,W[0]=r.coerce(W[0]),typeof W[0]!="string"&&W.unshift("%O");let D=0;W[0]=W[0].replace(/%([a-zA-Z%])/g,(S,H)=>{if(S==="%%")return"%";D++;let M=r.formatters[H];if(typeof M=="function"){let fe=W[D];S=M.call(k,fe),W.splice(D,1),D--}return S}),r.formatArgs.call(k,W),(k.log||r.log).apply(k,W)}return T.namespace=f,T.useColors=r.useColors(),T.color=r.selectColor(f),T.extend=n,T.destroy=r.destroy,Object.defineProperty(T,"enabled",{enumerable:!0,configurable:!1,get:()=>h!==null?h:(x!==r.namespaces&&(x=r.namespaces,$=r.enabled(f)),$),set:W=>{h=W}}),typeof r.init=="function"&&r.init(T),T}function n(f,g){let h=r(this.namespace+(typeof g>"u"?":":g)+f);return h.log=this.log,h}function s(f){r.save(f),r.namespaces=f,r.names=[],r.skips=[];let g=(typeof f=="string"?f:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let h of g)h[0]==="-"?r.skips.push(h.slice(1)):r.names.push(h)}function o(f,g){let h=0,x=0,$=-1,T=0;for(;h<f.length;)if(x<g.length&&(g[x]===f[h]||g[x]==="*"))g[x]==="*"?($=x,T=h,x++):(h++,x++);else if($!==-1)x=$+1,T++,h=T;else return!1;for(;x<g.length&&g[x]==="*";)x++;return x===g.length}function a(){let f=[...r.names,...r.skips.map(g=>"-"+g)].join(",");return r.enable(""),f}function c(f){for(let g of r.skips)if(o(f,g))return!1;for(let g of r.names)if(o(f,g))return!0;return!1}function l(f){return f instanceof Error?f.stack||f.message:f}function u(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return r.enable(r.load()),r}Ta.exports=od});var Ca=xs((Et,En)=>{Et.formatArgs=id;Et.save=ld;Et.load=cd;Et.useColors=ad;Et.storage=dd();Et.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();Et.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function ad(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function id(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+En.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let r=0,n=0;e[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(r++,s==="%c"&&(n=r))}),e.splice(n,0,t)}Et.log=console.debug||console.log||(()=>{});function ld(e){try{e?Et.storage.setItem("debug",e):Et.storage.removeItem("debug")}catch{}}function cd(){let e;try{e=Et.storage.getItem("debug")||Et.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function dd(){try{return localStorage}catch{}}En.exports=Ea()(Et);var{formatters:ud}=En.exports;ud.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var Yr=globalThis,An=Yr.trustedTypes,ua=An?An.createPolicy("lit-html",{createHTML:e=>e}):void 0,ba="$lit$",ar=`lit$${Math.random().toFixed(9).slice(2)}$`,ha="?"+ar,Zc=`<${ha}>`,yr=document,Vr=()=>yr.createComment(""),Kr=e=>e===null||typeof e!="object"&&typeof e!="function",Is=Array.isArray,Xc=e=>Is(e)||typeof e?.[Symbol.iterator]=="function",Ss=`[ 	
\f\r]`,Gr=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,pa=/-->/g,fa=/>/g,br=RegExp(`>|${Ss}(?:([^\\s"'>=/]+)(${Ss}*=${Ss}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),_a=/'/g,ma=/"/g,ya=/^(?:script|style|textarea|title)$/i,Ls=e=>(t,...r)=>({_$litType$:e,strings:t,values:r}),i=Ls(1),Zt=Ls(2),__=Ls(3),vr=Symbol.for("lit-noChange"),pt=Symbol.for("lit-nothing"),ga=new WeakMap,hr=yr.createTreeWalker(yr,129);function va(e,t){if(!Is(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return ua!==void 0?ua.createHTML(t):t}var Qc=(e,t)=>{let r=e.length-1,n=[],s,o=t===2?"<svg>":t===3?"<math>":"",a=Gr;for(let c=0;c<r;c++){let l=e[c],u,f,g=-1,h=0;for(;h<l.length&&(a.lastIndex=h,f=a.exec(l),f!==null);)h=a.lastIndex,a===Gr?f[1]==="!--"?a=pa:f[1]!==void 0?a=fa:f[2]!==void 0?(ya.test(f[2])&&(s=RegExp("</"+f[2],"g")),a=br):f[3]!==void 0&&(a=br):a===br?f[0]===">"?(a=s??Gr,g=-1):f[1]===void 0?g=-2:(g=a.lastIndex-f[2].length,u=f[1],a=f[3]===void 0?br:f[3]==='"'?ma:_a):a===ma||a===_a?a=br:a===pa||a===fa?a=Gr:(a=br,s=void 0);let x=a===br&&e[c+1].startsWith("/>")?" ":"";o+=a===Gr?l+Zc:g>=0?(n.push(u),l.slice(0,g)+ba+l.slice(g)+ar+x):l+ar+(g===-2?c:x)}return[va(e,o+(e[r]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),n]},Zr=class e{constructor({strings:t,_$litType$:r},n){let s;this.parts=[];let o=0,a=0,c=t.length-1,l=this.parts,[u,f]=Qc(t,r);if(this.el=e.createElement(u,n),hr.currentNode=this.el.content,r===2||r===3){let g=this.el.content.firstChild;g.replaceWith(...g.childNodes)}for(;(s=hr.nextNode())!==null&&l.length<c;){if(s.nodeType===1){if(s.hasAttributes())for(let g of s.getAttributeNames())if(g.endsWith(ba)){let h=f[a++],x=s.getAttribute(g).split(ar),$=/([.?@])?(.*)/.exec(h);l.push({type:1,index:o,name:$[2],strings:x,ctor:$[1]==="."?Ts:$[1]==="?"?Es:$[1]==="@"?Cs:Or}),s.removeAttribute(g)}else g.startsWith(ar)&&(l.push({type:6,index:o}),s.removeAttribute(g));if(ya.test(s.tagName)){let g=s.textContent.split(ar),h=g.length-1;if(h>0){s.textContent=An?An.emptyScript:"";for(let x=0;x<h;x++)s.append(g[x],Vr()),hr.nextNode(),l.push({type:2,index:++o});s.append(g[h],Vr())}}}else if(s.nodeType===8)if(s.data===ha)l.push({type:2,index:o});else{let g=-1;for(;(g=s.data.indexOf(ar,g+1))!==-1;)l.push({type:7,index:o}),g+=ar.length-1}o++}}static createElement(t,r){let n=yr.createElement("template");return n.innerHTML=t,n}};function Lr(e,t,r=e,n){if(t===vr)return t;let s=n!==void 0?r._$Co?.[n]:r._$Cl,o=Kr(t)?void 0:t._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(e),s._$AT(e,r,n)),n!==void 0?(r._$Co??(r._$Co=[]))[n]=s:r._$Cl=s),s!==void 0&&(t=Lr(e,s._$AS(e,t.values),s,n)),t}var As=class{constructor(t,r){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:r},parts:n}=this._$AD,s=(t?.creationScope??yr).importNode(r,!0);hr.currentNode=s;let o=hr.nextNode(),a=0,c=0,l=n[0];for(;l!==void 0;){if(a===l.index){let u;l.type===2?u=new Xr(o,o.nextSibling,this,t):l.type===1?u=new l.ctor(o,l.name,l.strings,this,t):l.type===6&&(u=new Rs(o,this,t)),this._$AV.push(u),l=n[++c]}a!==l?.index&&(o=hr.nextNode(),a++)}return hr.currentNode=yr,s}p(t){let r=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(t,n,r),r+=n.strings.length-2):n._$AI(t[r])),r++}},Xr=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,r,n,s){this.type=2,this._$AH=pt,this._$AN=void 0,this._$AA=t,this._$AB=r,this._$AM=n,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,r=this._$AM;return r!==void 0&&t?.nodeType===11&&(t=r.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,r=this){t=Lr(this,t,r),Kr(t)?t===pt||t==null||t===""?(this._$AH!==pt&&this._$AR(),this._$AH=pt):t!==this._$AH&&t!==vr&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Xc(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==pt&&Kr(this._$AH)?this._$AA.nextSibling.data=t:this.T(yr.createTextNode(t)),this._$AH=t}$(t){let{values:r,_$litType$:n}=t,s=typeof n=="number"?this._$AC(t):(n.el===void 0&&(n.el=Zr.createElement(va(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===s)this._$AH.p(r);else{let o=new As(s,this),a=o.u(this.options);o.p(r),this.T(a),this._$AH=o}}_$AC(t){let r=ga.get(t.strings);return r===void 0&&ga.set(t.strings,r=new Zr(t)),r}k(t){Is(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,n,s=0;for(let o of t)s===r.length?r.push(n=new e(this.O(Vr()),this.O(Vr()),this,this.options)):n=r[s],n._$AI(o),s++;s<r.length&&(this._$AR(n&&n._$AB.nextSibling,s),r.length=s)}_$AR(t=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);t!==this._$AB;){let n=t.nextSibling;t.remove(),t=n}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},Or=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,r,n,s,o){this.type=1,this._$AH=pt,this._$AN=void 0,this.element=t,this.name=r,this._$AM=s,this.options=o,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=pt}_$AI(t,r=this,n,s){let o=this.strings,a=!1;if(o===void 0)t=Lr(this,t,r,0),a=!Kr(t)||t!==this._$AH&&t!==vr,a&&(this._$AH=t);else{let c=t,l,u;for(t=o[0],l=0;l<o.length-1;l++)u=Lr(this,c[n+l],r,l),u===vr&&(u=this._$AH[l]),a||(a=!Kr(u)||u!==this._$AH[l]),u===pt?t=pt:t!==pt&&(t+=(u??"")+o[l+1]),this._$AH[l]=u}a&&!s&&this.j(t)}j(t){t===pt?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Ts=class extends Or{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===pt?void 0:t}},Es=class extends Or{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==pt)}},Cs=class extends Or{constructor(t,r,n,s,o){super(t,r,n,s,o),this.type=5}_$AI(t,r=this){if((t=Lr(this,t,r,0)??pt)===vr)return;let n=this._$AH,s=t===pt&&n!==pt||t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive,o=t!==pt&&(n===pt||s);s&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Rs=class{constructor(t,r,n){this.element=t,this.type=6,this._$AN=void 0,this._$AM=r,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(t){Lr(this,t)}};var Jc=Yr.litHtmlPolyfillSupport;Jc?.(Zr,Xr),(Yr.litHtmlVersions??(Yr.litHtmlVersions=[])).push("3.3.1");var Pe=(e,t,r)=>{let n=r?.renderBefore??t,s=n._$litPart$;if(s===void 0){let o=r?.renderBefore??null;n._$litPart$=s=new Xr(t.insertBefore(Vr(),o),o,void 0,r??{})}return s._$AI(e),s};var Rt="today",Wt=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}];function Ot(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function wr(e,t=Date.now()){switch(e){case"today":{let r=new Date(t);return r.setHours(0,0,0,0),r.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function wa(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function ka(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function $a(){let e=null,t=[],r=new Set;function n(){for(let s of Array.from(r))try{s()}catch{}}return{get(){return e},getWorkspacesState(){return t},set(s,o){e=Array.isArray(s)?s:null,t=Array.isArray(o)?o:[],n()},clear(){e=null,t=[],n()},subscribe(s){return r.add(s),()=>r.delete(s)}}}function xa(){let e=new Map,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{set(n,s,o=null){e.set(n,{lines:Array.isArray(s)?[...s]:[],last_event_at:typeof o=="number"?o:null}),r()},append(n,s){let o=e.get(n)||{lines:[],last_event_at:null};o.lines=[...o.lines,s],o.last_event_at=Date.now(),e.set(n,o),r()},get(n){return e.get(n)||null},clear(n){typeof n=="string"?e.delete(n):e.clear(),r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}var Ra=Kc(Ca(),1);function at(e){return(0,Ra.default)(`beads-ui:${e}`)}function qt(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function $r(e,t){let r=qt(e.created_at),n=qt(t.created_at);if(r!==n)return r<n?1:-1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,c=t.id;return a<c?-1:a>c?1:0}function Oa(e,t){let r=qt(e.created_at),n=qt(t.created_at);if(r!==n)return r<n?-1:1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,c=t.id;return a<c?-1:a>c?1:0}function Da(e,t){let r=qt(e.updated_at),n=qt(t.updated_at);if(r!==n)return r<n?1:-1;let s=e.id,o=t.id;return s<o?-1:s>o?1:0}function Ma(e,t){let r=e.priority??2,n=t.priority??2;if(r!==n)return r-n;let s=qt(e.created_at),o=qt(t.created_at);if(s!==o)return s<o?1:-1;let a=e.id,c=t.id;return a<c?-1:a>c?1:0}function Na(e,t){let r=e.closed_at??0,n=t.closed_at??0;if(r!==n)return r<n?1:-1;let s=e?.id,o=t?.id;return s<o?-1:s>o?1:0}var pd=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function Ia(e){let t=e&&e.metadata,r=t?t.task_order:void 0;if(r==null||r==="")return Number.POSITIVE_INFINITY;let n=Number(r);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function La(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let r=pd.exec(t);if(!r)return Number.POSITIVE_INFINITY;let n=Number(r[1]);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function Pa(e,t){let r=Ia(e),n=Ia(t);if(r!==n)return r<n?-1:1;let s=La(e),o=La(t);if(s!==o)return s<o?-1:1;let a=qt(e&&e.created_at),c=qt(t&&t.created_at);if(a!==c)return a<c?-1:1;let l=e&&e.id,u=t&&t.id;return l===u?0:String(l)<String(u)?-1:1}var Os=2**20;function Pr(e,t){let r=e&&e.id;return t&&typeof r=="string"&&Object.prototype.hasOwnProperty.call(t,r)&&typeof t[r]=="number"&&Number.isFinite(t[r])?t[r]:-qt(e&&e.created_at)}function Cn(e){return(t,r)=>{let n=Pr(t,e),s=Pr(r,e);if(n!==s)return n<s?-1:1;let o=t?.id,a=r?.id;return o<a?-1:o>a?1:0}}function Ds(e,t,r){let n=Array.isArray(e)?e:[],s=n.length,o=Math.max(0,Math.min(t,s-1)),a=o-1>=0?n[o-1]:null,c=o+1<s?n[o+1]:null;if(!a&&!c)return{rank:0};if(!a)return{rank:Pr(c,r)-Os};if(!c)return{rank:Pr(a,r)+Os};let l=Pr(a,r),u=Pr(c,r),f=(l+u)/2;return l<f&&f<u?{rank:f}:{renormalize:n.map((g,h)=>({bead_id:g.id,rank:h*Os}))}}function Ms(e,t={}){let r=at(`issue-store:${e}`),n=new Map,s=[],o=0,a=new Set,c=!1,l=t.sort||$r;function u(){for(let h of Array.from(a))try{h()}catch{}}function f(){s=Array.from(n.values()).sort(l)}function g(h){if(c||!h||h.id!==e)return;let x=Number(h.revision)||0;if(r("apply %s rev=%d",h.type,x),!(x<=o&&h.type!=="snapshot")){if(h.type==="snapshot"){if(x<=o)return;n.clear();let $=Array.isArray(h.issues)?h.issues:[];for(let T of $)T&&typeof T.id=="string"&&T.id.length>0&&n.set(T.id,T);f(),o=x,u();return}if(h.type==="upsert"){let $=h.issue;if($&&typeof $.id=="string"&&$.id.length>0){let T=n.get($.id);if(!T)n.set($.id,$);else{let W=Number.isFinite(T.updated_at)?T.updated_at:0,k=Number.isFinite($.updated_at)?$.updated_at:0;if(W<=k){for(let J of Object.keys(T))J in $||delete T[J];for(let[J,se]of Object.entries($))T[J]=se}}f()}o=x,u()}else if(h.type==="delete"){let $=String(h.issue_id||"");$&&(n.delete($),f()),o=x,u()}}}return{id:e,subscribe(h){return a.add(h),()=>{a.delete(h)}},applyPush:g,snapshot(){return s},size(){return n.size},getById(h){return n.get(h)},dispose(){c=!0,n.clear(),s=[],a.clear(),o=0}}}function Rn(e){let t=String(e.type||"").trim(),r={};if(e.params&&typeof e.params=="object"){let s=Object.keys(e.params).sort();for(let o of s){let a=e.params[o];r[o]=String(a)}}let n=new URLSearchParams(r).toString();return n.length>0?`${t}?${n}`:t}function Fa(e){let t=at("subs"),r=new Map,n=new Map;function s(c,l){t("applyDelta %s +%d ~%d -%d",c,(l.added||[]).length,(l.updated||[]).length,(l.removed||[]).length);let u=n.get(c);if(!u||u.size===0)return;let f=Array.isArray(l.added)?l.added:[],g=Array.isArray(l.updated)?l.updated:[],h=Array.isArray(l.removed)?l.removed:[];for(let x of Array.from(u)){let $=r.get(x);if(!$)continue;let T=$.itemsById;for(let W of f)typeof W=="string"&&W.length>0&&T.set(W,!0);for(let W of g)typeof W=="string"&&W.length>0&&T.set(W,!0);for(let W of h)typeof W=="string"&&W.length>0&&T.delete(W)}}async function o(c,l){let u=Rn(l);if(t("subscribe %s key=%s",c,u),!r.has(c))r.set(c,{key:u,itemsById:new Map});else{let g=r.get(c);if(g&&g.key!==u){let h=n.get(g.key);h&&(h.delete(c),h.size===0&&n.delete(g.key)),r.set(c,{key:u,itemsById:new Map})}}n.has(u)||n.set(u,new Set);let f=n.get(u);f&&f.add(c);try{await e("subscribe-list",{id:c,type:l.type,params:l.params})}catch(g){let h=r.get(c)||null;if(h){let x=n.get(h.key);x&&(x.delete(c),x.size===0&&n.delete(h.key))}throw r.delete(c),g}return async()=>{t("unsubscribe %s key=%s",c,u);try{await e("unsubscribe-list",{id:c})}catch{}let g=r.get(c)||null;if(g){let h=n.get(g.key);h&&(h.delete(c),h.size===0&&n.delete(g.key))}r.delete(c)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:Rn,selectors:{getIds(c){let l=r.get(c);return l?Array.from(l.itemsById.keys()):[]},has(c,l){let u=r.get(c);return u?u.itemsById.has(l):!1},count(c){let l=r.get(c);return l?l.itemsById.size:0},getItemsById(c){let l=r.get(c),u={};if(!l)return u;for(let f of l.itemsById.keys())u[f]=!0;return u}}}}function qa(){let e=at("issue-stores"),t=new Map,r=new Map,n=new Set,s=new Map;function o(){for(let l of Array.from(n))try{l()}catch{}}function a(l,u,f){let g=u?Rn(u):"",h=r.get(l)||"",x=t.has(l);if(e("register %s key=%s (prev=%s)",l,g,h),x&&h&&g&&h!==g){let $=t.get(l);if($)try{$.dispose()}catch{}let T=s.get(l);if(T){try{T()}catch{}s.delete(l)}let W=Ms(l,f);t.set(l,W);let k=W.subscribe(()=>o());s.set(l,k)}else if(!x){let $=Ms(l,f);t.set(l,$);let T=$.subscribe(()=>o());s.set(l,T)}return r.set(l,g),()=>c(l)}function c(l){e("unregister %s",l),r.delete(l);let u=t.get(l);u&&(u.dispose(),t.delete(l));let f=s.get(l);if(f){try{f()}catch{}s.delete(l)}}return{register:a,unregister:c,getStore(l){return t.get(l)||null},snapshotFor(l){let u=t.get(l);return u?u.snapshot().slice():[]},subscribe(l){return n.add(l),()=>n.delete(l)}}}function Ba(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Ua(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function ja(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Ns(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function fd(e){let t=String(e||""),r=t.startsWith("#")?t.slice(1):t,n=r.indexOf("?"),s=n>=0?r.slice(n+1):"";if(s){let c=new URLSearchParams(s).get("issue");if(c)return decodeURIComponent(c)}let o=/^\/issue\/([^\s?#]+)/.exec(r);return o&&o[1]?decodeURIComponent(o[1]):null}function _d(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function za(e){let t=at("router"),r=()=>{let n=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(n),o=s&&s[1]?decodeURIComponent(s[1]):fd(n),a=_d(n);if(t("hash change \u2192 view=%s id=%s",a,o),e.setState({selected_id:a==="worker"?null:o,view:a,worker:{selected_parent_id:a==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(n)){let l=o?`#/${a}?issue=${encodeURIComponent(o)}`:`#/${a}`;window.location.hash!==l&&(window.location.hash=l)}};return{start(){window.addEventListener("hashchange",r),r()},stop(){window.removeEventListener("hashchange",r)},gotoIssue(n){let s=e.getState?e.getState():{view:"board"},o=s.view==="worker"||s.view==="monitor"?s.view:"board",a=Ns(o,n);t("goto issue %s (view=%s)",n,o),window.location.hash!==a?window.location.hash=a:e.setState({selected_id:o==="worker"?null:n,view:o,worker:{selected_parent_id:o==="worker"?n:null}})},gotoView(n){let s=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},o=n==="worker"?s.worker?.selected_parent_id:s.selected_id,a=o?Ns(n,o):`#/${n}`;t("goto view %s (id=%s)",n,o||""),window.location.hash!==a?window.location.hash=a:e.setState({view:n,selected_id:n==="worker"?null:s.selected_id})}}}var md=Object.freeze({workspace_config:{default_workspace:null}});function Ha(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:md.workspace_config.default_workspace}}}function Wa(e={}){let t=at("state"),r={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:Ha(e.config)},n=new Set;function s(){for(let o of Array.from(n))try{o(r)}catch{}}return{getState(){return r},setState(o){let a={...r,...o,filters:{...r.filters,...o.filters||{}},board:{...r.board,...o.board||{}},worker:{...r.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:r.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:r.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:r.workspace.hidden},config:o.config!==void 0?Ha(o.config):r.config},c=a.workspace.current?.path!==r.workspace.current?.path||a.workspace.available.length!==r.workspace.available.length||a.workspace.hidden.length!==r.workspace.hidden.length||a.workspace.hidden.some((u,f)=>u!==r.workspace.hidden[f]),l=a.config.workspace_config.default_workspace!==r.config.workspace_config.default_workspace;a.selected_id===r.selected_id&&a.view===r.view&&a.filters.status===r.filters.status&&a.filters.search===r.filters.search&&a.filters.type===r.filters.type&&a.board.closed_filter===r.board.closed_filter&&a.worker.selected_parent_id===r.worker.selected_parent_id&&a.worker.show_closed_children.length===r.worker.show_closed_children.length&&a.worker.show_closed_children.every((u,f)=>u===r.worker.show_closed_children[f])&&!c&&!l||(r=a,t("state change %o",{selected_id:r.selected_id,view:r.view,filters:r.filters,board:r.board,worker:r.worker,workspace:r.workspace.current?.path,config:{default_workspace:r.config.workspace_config.default_workspace}}),s())},subscribe(o){return n.add(o),()=>n.delete(o)}}}function Ga(e){let t=at("activity"),r=0,n=new Map,s=1;function o(){if(!e)return;let u=r>0;e.toggleAttribute("hidden",!u),e.setAttribute("aria-busy",u?"true":"false")}function a(){r+=1,t("start count=%d",r),o()}function c(){let u=r;r=Math.max(0,r-1),u<=0?t("done called but count was already %d",u):t("done count=%d\u2192%d",u,r),o()}function l(u){return async(g,h)=>{let x=s++,$=Date.now();n.set(x,{type:g,start_ts:$}),t("request start id=%d type=%s count=%d",x,g,r+1),a();let T=!1,W=()=>{T||(T=!0,n.delete(x),c())},k=setTimeout(()=>{T||(t("request TIMEOUT id=%d type=%s elapsed=%dms",x,g,Date.now()-$),W())},3e4);try{let J=await u(g,h),se=Date.now()-$;return t("request done id=%d type=%s elapsed=%dms",x,g,se),J}catch(J){let se=Date.now()-$;throw t("request error id=%d type=%s elapsed=%dms err=%o",x,g,se,J),J}finally{clearTimeout(k),W()}}}return o(),{wrapSend:l,start:a,done:c,getCount:()=>r,getActiveRequests:()=>{let u=Date.now();return Array.from(n.entries()).map(([f,g])=>({id:f,type:g.type,elapsed_ms:u-g.start_ts}))}}}function re(e,t="info",r=2800){let n=document.createElement("div");n.className="toast",n.textContent=e,n.style.position="fixed",n.style.right="12px",n.style.bottom="12px",n.style.zIndex="1000",n.style.color="#fff",n.style.padding="8px 10px",n.style.borderRadius="4px",n.style.fontSize="12px",t==="success"?n.style.background="#156d36":t==="warning"?n.style.background="#a36a00":t==="error"?n.style.background="#9f2011":n.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(n),setTimeout(()=>{try{n.remove()}catch{}},r)}function In(e=void 0,t=void 0){function r(){if(!t||typeof t.get!="function")return null;let o=t.get();return o&&o.order?o.order:{}}function n(o,a,c){let l=e&&e.snapshotFor?e.snapshotFor(o).slice():[];if(a==="closed")return l.sort(Na),l;switch(c){case"created_desc":return l.sort($r),l;case"created_asc":return l.sort(Oa),l;case"updated_desc":return l.sort(Da),l;case"priority":return l.sort(Ma),l;case"manual":default:{let u=r();return u?l.sort(Cn(u)):l.sort($r),l}}}function s(o){let a=[];return e&&typeof e.subscribe=="function"&&a.push(e.subscribe(o)),t&&typeof t.subscribe=="function"&&a.push(t.subscribe(o)),()=>{for(let c of a)try{c()}catch{}}}return{selectBoardColumn:n,subscribe:s}}function xr(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function bt(e){let t=xr(e);if(t===null)return"";let r=new Date(t),n=s=>String(s).padStart(2,"0");return`${r.getFullYear()}-${n(r.getMonth()+1)}-${n(r.getDate())} ${n(r.getHours())}:${n(r.getMinutes())}`}function It(e,t){let r=xr(e);if(r===null)return"";let s=(typeof t=="number"?t:Date.now())-r;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let a=Math.floor(s/36e5);if(a<24)return`${a}\uC2DC\uAC04 \uC804`;let c=Math.floor(s/864e5);if(c<7)return`${c}\uC77C \uC804`;let l=Math.floor(c/7);if(c<30)return`${l}\uC8FC \uC804`;let u=Math.floor(c/30);return u<12?`${u}\uAC1C\uC6D4 \uC804`:`${Math.floor(c/365)}\uB144 \uC804`}function Ln(e){if(!Array.isArray(e))return null;let t=null,r=-1;for(let n of e){if(!n||n.status!=="in_progress")continue;let s=xr(n.updated_at)??0;if(t===null||s>r){t=n,r=s;continue}s===r&&String(n.id)<String(t.id)&&(t=n)}return t}function On(e){let t=e.transport,r=e.uiOrderStore;function n(a,c){return"renormalize"in a?a.renormalize:[{bead_id:c,rank:a.rank}]}function s(a,c){let l={...a.order};for(let u of c)l[u.bead_id]=u.rank;r&&r.set({revision:a.revision,order:l})}async function o(a,c,l){if(!t||!r)return;let u=r.get()||{revision:0,order:{}},f=n(Ds(c,l,u.order),a);s(u,f);let g=await t("ui-order-set",{expected_revision:u.revision,entries:f});if(g&&g.conflict){let h={revision:typeof g.revision=="number"?g.revision:0,order:g.order||{}};r.set(h);let x=n(Ds(c,l,h.order),a);s(h,x);let $=await t("ui-order-set",{expected_revision:h.revision,entries:x});$&&$.applied&&r.set({revision:typeof $.revision=="number"?$.revision:0,order:$.order||{}})}else g&&g.applied&&r.set({revision:typeof g.revision=="number"?g.revision:0,order:g.order||{}})}return{applyReorder:o}}function Dn(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Ps(e,t){return!t||typeof e!="string"||e.length===0||Dn(t.visible_labels).includes(e)?!0:Dn(t.hidden_labels).includes(e)?!1:!Dn(t.hidden_prefixes).some(r=>r.length>0&&e.startsWith(r))}function Mn(e,t){return Dn(e).filter(r=>Ps(r,t))}function ir(e,t){let r=e&&e.chips?e.chips[t]:void 0;return typeof r=="boolean"?r:!0}var gd={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},Va={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},Ya={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},bd={review:"\u2713",skip:"\u2298"},lr={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function hd(e,t,r){if(!(r==="in_progress"||r==="resolved"))return null;for(let s of e){let o=t[s];if(o&&o.fill==="dim"&&o.stale!==!0)return s}return null}function Ka(e){let t=e&&e.fill||"none";return t==="none"?lr.none:e&&e.stale===!0?lr.stale:t==="dim"?lr.dim:e&&e.glyph==="review"?lr.review:e&&e.glyph==="skip"?lr.skip:lr.done}function yd(e){if(!e||e.fill==="none"||!e.approval_state)return Ka(e);let t=[];return e.glyph==="review"?t.push(lr.review):e.glyph==="skip"&&t.push(lr.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function vd(e,t,r){let n=gd[e]||e,s=t&&t.fill||"none",o=!!t&&t.stale===!0,a=bd[t&&t.glyph||""]||"",c="bar";s==="dim"?c+=` b-${n} dim`:s==="full"&&(c+=` b-${n} full`),o&&(c+=" stale"),r&&(c+=" cur");let l=s==="none"?"lbl":`lbl l-${n} on`,u=r?`color: var(--stage-${n}-on)`:"";return i`
    <div class="seg">
      <div class=${c} style=${u}>${a}</div>
      <div class=${l}>
        ${Va[e]||e}
      </div>
    </div>
  `}function Nn(e,t){if(!e||!e.stages)return"";let r=Ya[e.route]||Ya.spec_backed,n=e.stages,s=hd(r,n,String(t||"open")),o=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${r.map(a=>`${Va[a]||a} ${a==="plan"?yd(n[a]||{}):Ka(n[a]||{})}`).join(" \xB7 ")}`;return i`
    <div class="stp" role="img" aria-label=${o}>
      ${r.map(a=>vd(a,n[a]||{},a===s))}
    </div>
  `}function wd(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var Za=2;function kd(e){if(!e)return[];let t=[];if(e.external){let n=e.reason?`\u23F8 blocked: ${e.reason}`:"\u23F8 blocked";t.push(i`<span class="ctl-chip ctl-chip--blocked">${n}</span>`)}let r=Array.isArray(e.blockers)?e.blockers:[];if(r.length>0){let n=r.slice(0,Za).join(", "),s=r.length-Za,o=`\u26D3 blocked: ${n}${s>0?` +${s}`:""}`;t.push(i`<span class="ctl-chip ctl-chip--blocked-dep">${o}</span>`)}return t}function $d(e,t){let r=t.policy||null,n=e.workflow&&e.workflow.chips||{},s=[];if(n.route&&ir(r,"route")){let a=n.route_source==="derived";s.push(i`<span
        class="ctl-chip ctl-chip--route${a?" is-derived":""}"
        title=${a?"route \uBBF8\uD540 (metadata unset)":"route"}
        >${a?"unset":n.route}</span
      >`)}if(n.fast_track&&ir(r,"fast_track")&&s.push(i`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),n.pr&&ir(r,"pr")){let a=n.pr.number;s.push(i`<span class="ctl-chip ctl-chip--pr"
        >${`PR${a!=null?` #${a}`:""}`}</span
      >`)}if(n.exec_receipt){let a=n.exec_receipt;s.push(i`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${a.kind}:${a.actor}@${a.sha}`}
        >${`exec ${a.kind==="delegated"?a.actor:`main:${a.actor}`} \xB7 ${a.sha.slice(0,7)}`}</span
      >`)}if(n.impl_entry){let a=n.impl_entry;s.push(i`<span
        class="ctl-chip ctl-chip--impl-entry"
        title=${`impl_entry ${a.actor}@${a.sha}`}
        >${`impl ${a.actor} \xB7 ${a.sha.slice(0,7)}`}</span
      >`)}for(let a of Mn(e.labels,r))s.push(i`<span class="ctl-chip ctl-chip--label">${a}</span>`);return e.from_id&&ir(r,"from")&&s.push(i`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${a=>{a.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(a,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),ir(r,"blocked")&&s.push(...kd(e.blocked_info)),t.cleanupFailureFor&&t.cleanupFailureFor(e.id)&&ir(r,"blocked")&&s.push(i`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 멈춤</span>`),s.length===0?"":i`<div class="board-card__chips">${s}</div>`}function xd(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function Sd(e){let t=It(e.created_at),r=It(e.updated_at);return!t&&!r?"":i`<span class="board-card__times">
    ${t?i`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${bt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}
    ${t&&r?i`<span class="board-card__time-sep">·</span>`:""}
    ${r?i`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${bt(e.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </span>`}function Ad(e,t){let r=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]},n=r.total||0,s=t.isExpanded?t.isExpanded(e.id):!0,o=n>0?r.children.slice().sort(Pa):r.children;return i`
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
        ${Sd(e)}
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
                  <span class=${xd(a.status)}>●</span>
                  <span class="board-card__roll-child-ord">${c+1}</span>
                  <span class="board-card__roll-child-title"
                    >${a.title||a.id}</span
                  >
                </button>`)}
          </div>`:""}
    </div>
  `}function Pn(e,t){let r=wd(e.priority);return i`
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
      ${$d(e,t)}
      ${e.workflow&&ir(t.policy||null,"stepper")?Nn(e.workflow,e.status):""}
      ${Ad(e,t)}
    </article>
  `}function Fr(e,t){let r=Array.isArray(e.items)?e.items.length:0,n=e.is_closed===!0;return i`
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
              ${Wt.map(o=>i`<option
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
        ${e.items.map(o=>Pn(o,t))}
      </div>
    </section>
  `}function Xa(e,t,r){return i`
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
          ${e.items.length===0?i`<div class="deferred-popup__empty">Deferred 이슈 없음</div>`:e.items.map(n=>Pn(n,t))}
        </div>
      </div>
    </dialog>
  `}var Td=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],Ed=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],Cd=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function Rd(e,t,r){let n=e.labels.length,s=n>0?`\uB77C\uBCA8 ${n}`:"\uB77C\uBCA8";return i`
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
  `}function Qa(e,t,r){return i`
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
        ${Td.map(n=>i`<option
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
        ${Ed.map(n=>i`<option
              value=${n.value}
              ?selected=${e.type===n.value}
            >
              ${n.label}
            </option>`)}
      </select>
      ${Rd(e,t,r)}
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
        ${Cd.map(n=>i`<option
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
  `}var Id=200,Ld={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},Od=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),Ja="beads-ui.board.sort",ei=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function Dd(){try{let e=window.localStorage.getItem(Ja);if(e&&ei.has(e))return e}catch{}return"created_desc"}function ti(e,t){let r=at("views:board"),n=t.gotoIssue,s=t.issueStores,o=t.transport,a=t.uiOrderStore,c=t.displayPolicyStore,l=t.workerQueueStore,u=t.onClosedRangeChange,f=t.onNewIssue,g=t.closedRange||Rt,h=s?In(s,a):null,x=On({transport:o,uiOrderStore:a}),$=[],T=[],W=[],k=[],J=[],se=[],D=!1,F=0,S=Dd(),H=new Map,M=new Map,fe=new Map,Ce=new Set,ce={search:"",priority:"",type:"",labels:[]},he=!1,Se=null;function Re(L){return String(L.status||"open")==="open"}function Ve(L){let Z=String(L.status||"open");return Z==="open"||Z==="blocked"}function Oe(L){let Z=ce.search.trim().toLowerCase(),pe=ce.priority,de=ce.type,ke=ce.labels;return L.filter(Le=>{if(Z){let He=String(Le.id||"").toLowerCase(),Je=String(Le.title||"").toLowerCase();if(!He.includes(Z)&&!Je.includes(Z))return!1}if(pe!==""&&String(Le.priority)!==pe||de!==""&&String(Le.issue_type||"")!==de)return!1;if(ke.length>0){let He=Array.isArray(Le.labels)?Le.labels:[];if(!ke.some(Je=>He.includes(Je)))return!1}return!0})}function Ae(){let L=new Set;for(let Z of[$,T,W,k,J,se])for(let pe of Z){let de=Array.isArray(pe.labels)?pe.labels:[];for(let ke of de)typeof ke=="string"&&ke.length>0&&L.add(ke)}return Array.from(L).sort()}function be(){return ce.search.trim()!==""||ce.priority!==""||ce.type!==""||ce.labels.length>0}function _e(){try{if(h){let L=h.selectBoardColumn("tab:board:in-progress","in_progress",S),Z=h.selectBoardColumn("tab:board:blocked","blocked",S).filter(Ve),pe=new Set(L.map($e=>$e.id)),de=h.selectBoardColumn("tab:board:ready","ready",S).filter($e=>Re($e)&&!pe.has($e.id)),ke=h.selectBoardColumn("tab:board:resolved","resolved",S),Le=h.selectBoardColumn("tab:board:deferred","deferred",S),He=h.selectBoardColumn("tab:board:closed","closed").slice(0,Id),Je=[...Z,...de,...L,...ke,...He];ve(Je);let Ie=new Set;for(let $e of Je)$e&&$e.id&&!Fs($e)&&Ie.add($e.id);let We=!be();$=We?Qr(Z,Ie):Z,T=We?Qr(de,Ie):de,W=We?Qr(L,Ie):L,k=We?Qr(ke,Ie):ke,J=Le,F=Le.length,se=We?Qr(He,Ie):He,H=new Map;for(let $e of $)H.set($e.id,"open");for(let $e of T)H.set($e.id,"open");for(let $e of W)H.set($e.id,"in_progress");for(let $e of k)H.set($e.id,"resolved");for(let $e of J)H.set($e.id,"deferred");for(let $e of se)H.set($e.id,"closed");M=new Map;for(let $e of $)M.set($e.id,"blocked-col");for(let $e of T)M.set($e.id,"ready-col");for(let $e of W)M.set($e.id,"in-progress-col");for(let $e of k)M.set($e.id,"resolved-col");for(let $e of se)M.set($e.id,"closed-col")}Me()}catch{$=[],T=[],W=[],k=[],J=[],se=[],fe=new Map,Me()}}function ve(L){let Z=new Map;for(let de of L)de&&de.id&&!Z.has(de.id)&&Z.set(de.id,de);let pe=new Map;for(let de of Z.values()){let ke=Fs(de);if(!ke)continue;let Le=pe.get(ke);Le||(Le=[],pe.set(ke,Le)),Le.push({id:de.id,title:de.title,status:de.status,metadata:de.metadata,created_at:de.created_at,updated_at:de.updated_at})}fe=pe}function N(L){let Z=fe.get(L)||[],pe=0;for(let ke of Z)(ke.status==="resolved"||ke.status==="closed")&&(pe+=1);let de=Ln(Z);return{total:Z.length,count:pe,current:de,children:Z}}function A(L){return!Ce.has(L)}function I(L,Z){L.preventDefault(),L.stopPropagation(),Ce.has(Z)?Ce.delete(Z):Ce.add(Z),Me()}function te(L,Z){L.preventDefault(),L.stopPropagation(),n(Z)}function V(L,Z){L.preventDefault(),L.stopPropagation(),n(Z)}function Q(L,Z){Se||n(Z)}function R(L,Z){L.preventDefault(),L.stopPropagation(),Md(Z).then(pe=>{pe&&re("\uBCF5\uC0AC\uB428","success",1200)})}function j(L,Z){Se=Z,L.dataTransfer&&(L.dataTransfer.setData("text/plain",Z),L.dataTransfer.effectAllowed="move"),L.target.classList.add("board-card--dragging")}function ue(L){L.target.classList.remove("board-card--dragging"),At(),setTimeout(()=>{Se=null},0)}function me(L){let Z=String(L.target.value||"");!Z||Z===g||(g=Z,u&&u(Z),Me())}function Te(){return c?c.get():null}function we(L){let Z=l?l.get():null,pe=Z?Z.cleanup_failed:null;if(!pe||typeof pe!="object"||Array.isArray(pe))return null;let de=pe[L];return!de||typeof de!="object"||Array.isArray(de)?null:de}let xe={onCardClick:Q,onCopyId:R,onDragStart:j,onDragEnd:ue,onClosedRangeChange:me,rollupFor:N,isExpanded:A,onRollupToggle:I,onChildClick:te,onFromChipClick:V,cleanupFailureFor:we,get policy(){return Te()}};function Ue(L,Z){Se||(K(),n(Z))}function je(L,Z){L.preventDefault(),L.stopPropagation(),K(),n(Z)}let rt={...xe,onCardClick:Ue,onChildClick:je,onFromChipClick:je,get policy(){return Te()}};function U(L){let Z=L.target,pe=e.querySelector(".board-filter__labels");Z&&pe&&pe.contains(Z)||v()}function G(L){L.key==="Escape"&&v()}function z(){he||(he=!0,document.addEventListener("mousedown",U),document.addEventListener("keydown",G),Me())}function v(){he&&(he=!1,document.removeEventListener("mousedown",U),document.removeEventListener("keydown",G),Me())}function C(L){L.key==="Escape"&&K()}function q(){D||(D=!0,document.addEventListener("keydown",C),Me())}function K(){D&&(D=!1,document.removeEventListener("keydown",C),Me())}let ee={onClose:K,onOverlayClick(L){L.target===L.currentTarget&&K()}},De={onSearchInput(L){ce.search=String(L.target.value||""),_e()},onPriorityChange(L){ce.priority=String(L.target.value||""),_e()},onTypeChange(L){ce.type=String(L.target.value||""),_e()},onSortChange(L){let Z=String(L.target.value||"");if(!(!ei.has(Z)||Z===S)){S=Z;try{window.localStorage.setItem(Ja,Z)}catch{}_e()}},onDeferredToggle(){D?K():q()},onLabelMenuToggle(){he?v():z()},onLabelToggle(L){let Z=ce.labels.indexOf(L);Z===-1?ce.labels.push(L):ce.labels.splice(Z,1),_e()},onLabelClear(){ce.labels.length!==0&&(ce.labels=[],_e())},onNewIssue(){f&&f()}};function Ee(){return i`
      <div class="board-view">
        ${Qa(ce,De,{sort_mode:S,deferred_popup_open:D,deferred_count:F,label_options:Ae(),label_menu_open:he})}
        <div class="board-root">
          ${Fr({title:"Blocked",id:"blocked-col",items:Oe($)},xe)}
          ${Fr({title:"Ready",id:"ready-col",items:Oe(T)},xe)}
          ${Fr({title:"In progress",id:"in-progress-col",items:Oe(W)},xe)}
          ${Fr({title:"Resolved",id:"resolved-col",items:Oe(k)},xe)}
          ${Fr({title:"Closed",id:"closed-col",items:Oe(se),is_closed:!0,closed_range:g},xe)}
        </div>
        ${D?Xa({items:Oe(J),count:F},rt,ee):""}
      </div>
    `}function Me(){Pe(Ee(),e),ze()}function ze(){try{let L=e.querySelector("#deferred-popup");L&&!L.open&&(typeof L.showModal=="function"?L.showModal():L.setAttribute("open",""));let Z=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let pe of Z)Array.from(pe.querySelectorAll(".board-card")).forEach((ke,Le)=>{ke.tabIndex=Le===0?0:-1})}catch{}}async function lt(L,Z){if(!o){re("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:L,status:Z}),re("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(pe){r("update-status failed: %o",pe),re("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function ot(L){switch(L){case"blocked-col":return $;case"ready-col":return T;case"in-progress-col":return W;case"resolved-col":return k;default:return[]}}function dt(L,Z,pe){if(!o||!a)return;let de=ot(L),ke=de.find(We=>We.id===Z);if(!ke)return;let Le=de.filter(We=>We.id!==Z),He=pe.closest?pe.closest(".board-card"):null,Je=Le.length;if(He){let We=He.getAttribute("data-issue-id");if(We===Z)return;let $e=Le.findIndex(yt=>yt.id===We);$e>=0&&(Je=$e)}let Ie=Le.slice();Ie.splice(Je,0,ke),x.applyReorder(Z,Ie,Je)}function At(){for(let L of Array.from(e.querySelectorAll(".board-column--drag-over")))L.classList.remove("board-column--drag-over")}let it=null;e.addEventListener("dragover",L=>{L.preventDefault(),L.dataTransfer&&(L.dataTransfer.dropEffect="move");let pe=L.target.closest(".board-column");pe&&pe!==it&&(it&&it.classList.remove("board-column--drag-over"),pe.classList.add("board-column--drag-over"),it=pe)}),e.addEventListener("dragleave",L=>{let Z=L.relatedTarget;(!Z||!e.contains(Z))&&it&&(it.classList.remove("board-column--drag-over"),it=null)}),e.addEventListener("drop",L=>{L.preventDefault(),it&&(it.classList.remove("board-column--drag-over"),it=null);let Z=L.target,pe=Z.closest(".board-column");if(!pe)return;let de=L.dataTransfer?.getData("text/plain")||"";if(!de)return;let ke=pe.id,Le=M.get(de);if(Le&&Le===ke){if(Od.has(ke)){if(S!=="manual"){re("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}dt(ke,de,Z)}return}let He=Ld[ke];if(!He){re("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}H.get(de)!==He&&lt(de,He)}),e.addEventListener("keydown",L=>{let Z=L.target;if(!(Z instanceof HTMLElement))return;let pe=String(Z.tagName||"").toLowerCase();if(pe==="input"||pe==="textarea"||pe==="select"||pe==="button"||pe==="a"||Z.isContentEditable===!0)return;let de=Z.closest(".board-card");if(!de)return;let ke=String(L.key||"");if(ke==="Enter"||ke===" "){L.preventDefault();let Ie=de.getAttribute("data-issue-id");Ie&&n(Ie);return}if(ke!=="ArrowUp"&&ke!=="ArrowDown"&&ke!=="ArrowLeft"&&ke!=="ArrowRight")return;L.preventDefault();let Le=de.closest(".board-column");if(!Le)return;let He=Array.from(Le.querySelectorAll(".board-card")),Je=He.indexOf(de);if(ke==="ArrowDown"&&Je<He.length-1){mt(de,He[Je+1]);return}if(ke==="ArrowUp"&&Je>0){mt(de,He[Je-1]);return}if(ke==="ArrowLeft"||ke==="ArrowRight"){let Ie=Array.from(e.querySelectorAll(".board-column")),We=Ie.indexOf(Le),$e=ke==="ArrowRight"?1:-1,yt=We+$e;for(;yt>=0&&yt<Ie.length;){let wt=Ie[yt].querySelector(".board-card");if(wt){mt(de,wt);return}yt+=$e}}});function mt(L,Z){try{L.tabIndex=-1,Z.tabIndex=0,Z.focus()}catch{}}let nt=null;h&&h.subscribe&&(nt=h.subscribe(()=>{try{_e()}catch{}}));let ct=null;c&&c.subscribe&&(ct=c.subscribe(()=>{try{_e()}catch{}}));let gt=null;return l&&l.subscribe&&(gt=l.subscribe(()=>{Me()})),{async load(){r("load"),_e()},clear(){v(),K(),nt&&(nt(),nt=null),ct&&(ct(),ct=null),gt&&(gt(),gt=null),e.replaceChildren(),$=[],T=[],W=[],k=[],J=[],se=[],H=new Map,M=new Map}}}function Fs(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function Qr(e,t){return e.filter(r=>{let n=Fs(r);return!(n&&t.has(n))})}async function Md(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let r=!1;try{r=document.execCommand("copy")}finally{t.remove()}return r}catch{return!1}}async function Sr(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let r=document.createElement("textarea");r.value=t,r.style.position="fixed",r.style.left="-9999px",document.body.appendChild(r),r.select();let n=!1;try{n=document.execCommand("copy")}finally{r.remove()}return n}catch{return!1}}function Gt(e){return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,e.speed==="fast"?"Fast":null].filter(Boolean).join(" \xB7 ")}function cr(e){return typeof e.resumed_from!="string"||e.resumed_from.length===0?null:`${e.continuation_mode==="session"?"session \uC774\uC5B4\uBC1B\uC74C":e.continuation_mode==="fresh"?"\uC0C8 session\uC73C\uB85C \uC774\uC5B4\uBC1B\uC74C":"\uC774\uC804 attempt\uC5D0\uC11C \uC774\uC5B4\uBC1B\uC74C"} (from ${e.resumed_from})`}function Nd(e,t=document){let r=t.createElement("dialog");r.className="continuation-dialog";let n=t.createElement("button"),s=t.createElement("button"),o=t.createElement("button"),a=t.createElement("h2"),c=t.createElement("p");return a.textContent="\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4",c.textContent=`${Gt(e.prior||{})||"\uC774\uC804 \uC124\uC815"} \u2192 ${Gt(e.current||{})||"\uD604\uC7AC \uC124\uC815"}`,n.type="button",n.textContent="\uAE30\uC874 session \uC774\uC5B4\uD558\uAE30",n.disabled=e.prior_available===!1,s.type="button",s.textContent="\uD604\uC7AC preset\uC73C\uB85C \uC0C8 session",o.type="button",o.textContent="\uCDE8\uC18C",r.append(a,c,n,s,o),t.body.append(r),new Promise(l=>{let u=f=>{typeof r.close=="function"&&r.close(),r.remove(),l(f)};n.addEventListener("click",()=>u("prior_session")),s.addEventListener("click",()=>u("fresh_current")),o.addEventListener("click",()=>u(null)),r.addEventListener("cancel",f=>{f.preventDefault(),u(null)}),typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")})}async function Xt(e,t,r={}){let n=e;for(r.onResult?.(n);n?.continuation_mismatch;){let s=n.continuation_mismatch,o=await Nd(s);if(o===null)return n;n=await t(o,s.decision_token),r.onResult?.(n),n?.conflict&&r.refresh&&(n=await r.refresh(n),r.onResult?.(n))}return n}var ai="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function ht(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var Qt=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],Jr=[...Qt,"reasoning_output_tokens"],Pd=["implementation","review-consult"];function qs(e){let t=0;for(let r of Qt)t+=ht(e?.[r]);return t}function Fd(e){return!e||typeof e!="object"?!1:Qt.some(t=>Number.isFinite(e[t]))}function ri(e){return!e||typeof e!="object"?!1:Jr.some(t=>Number.isFinite(e[t]))}function qd(e){let t={};for(let r of Jr)e&&Number.isFinite(e[r])&&(t[r]=e[r]);return t}function ni(e){let t={};for(let r of Jr)Number.isFinite(e[r])&&(t[r]=e[r]);return e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function si(e,t){return e==="codex"?ht(t.input_tokens)+ht(t.output_tokens):qs(t)}function Bd(e){return e==="claude"?"Claude":"Codex"}function Ud(e){return`\u03C4 ${ii(e)}`}function jd(e,t){let r=t.breakdown||{},n=[`\uC785\uB825 ${ht(r.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${ht(r.output_tokens).toLocaleString("en-US")}`];e==="claude"?n.push(`\uCE90\uC2DC\uC77D\uAE30 ${ht(r.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${ht(r.cache_creation_input_tokens).toLocaleString("en-US")}`):(n.push(`\uCE90\uC2DC\uC77D\uAE30 ${ht(r.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${ht(r.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(r.reasoning_output_tokens)&&n.push(`\uCD94\uB860\uCD9C\uB825 ${ht(r.reasoning_output_tokens).toLocaleString("en-US")}`));let o=[e==="claude"?"Claude subtotal = \uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"Codex subtotal = \uC785\uB825 + \uCD9C\uB825; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset",`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,n.join(" \xB7 ")];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&o.push(`$${t.total_cost_usd.toFixed(2)}`),t.replayed&&o.push(ai),o.join(`
`)}function vt(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let r of["claude","codex"]){let n=e.providers[r];n&&t.push({provider:r,label:`${Bd(r)} ${Ud(n.subtotal)}${typeof n.total_cost_usd=="number"&&Number.isFinite(n.total_cost_usd)?` \xB7 $${n.total_cost_usd.toFixed(2)}`:""}`,tooltip:jd(r,n)})}return t}function qn(e){let t={},r={claude:!0,codex:!1},n={claude:0,codex:0};for(let s of e)if(!(!s||!s.providers))for(let o of["claude","codex"]){let a=s.providers[o];if(!a)continue;let c=t[o];c||(c={subtotal:0,breakdown:{}},t[o]=c),c.subtotal+=a.subtotal;for(let l of Jr)Number.isFinite(a.breakdown[l])&&(c.breakdown[l]=ht(c.breakdown[l])+ht(a.breakdown[l]));a.replayed&&(c.replayed=!0),o==="claude"&&(typeof a.total_cost_usd=="number"&&Number.isFinite(a.total_cost_usd)?n.claude+=a.total_cost_usd:r.claude=!1)}return t.claude&&r.claude&&(t.claude.total_cost_usd=n.claude),Object.keys(t).length===0?null:{providers:t,roles:{}}}function Bs(e){return!e||typeof e!="object"?null:Dt({attempt:{...e,bead_id:"__attempt__"}},"__attempt__")}function zd(e){return e==="codex"?"codex":"claude"}function dr(){return{subtotal:0,breakdown:qd(null),legs:[],replayed:!1,outer_count:0,outer_cost:0,outer_cost_count:0}}function Fn(e,t,r){e.subtotal+=t.subtotal;for(let n of Jr)Number.isFinite(t.usage[n])&&(e.breakdown[n]=ht(e.breakdown[n])+ht(t.usage[n]));e.legs.push(t),t.replayed===!0&&(e.replayed=!0),r&&(e.outer_count+=1,typeof t.usage.total_cost_usd=="number"&&Number.isFinite(t.usage.total_cost_usd)&&(e.outer_cost+=t.usage.total_cost_usd,e.outer_cost_count+=1))}function oi(e,t){let r={subtotal:e.subtotal,breakdown:e.breakdown};return t&&(r.legs=e.legs),e.replayed&&(r.replayed=!0),r}function ii(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function qr(e){return Fd(e)?`\u03C4 ${ii(qs(e))}`:null}function Bt(e){let t=qr(e);if(!t)return null;let r=e?.total_cost_usd;return typeof r=="number"&&Number.isFinite(r)?`${t} \xB7 $${r.toFixed(2)}`:t}function Br(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${ht(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${ht(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${ht(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${ht(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let r=[`\uCD1D ${qs(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&r.push(ai),r.join(`
`)}function Dt(e,t){let r={claude:dr(),codex:dr()},n={orchestrator:{claude:dr(),codex:dr()},implementation:{claude:dr(),codex:dr()},"review-consult":{claude:dr(),codex:dr()}},s=new Set;for(let c of Object.values(e||{})){if(!c||c.bead_id!==t)continue;let l=c.usage;if(ri(l)){let f=zd(c.runner),g=ni(l),h={provider:f,role:"orchestrator",attempt_id:String(c.attempt_id||""),usage:g,subtotal:si(f,g)};g.replayed===!0&&(h.replayed=!0),typeof c.model=="string"&&(h.model=c.model),typeof c.session_id=="string"&&(h.session_id=c.session_id),Fn(r[f],h,!0),Fn(n.orchestrator[f],h,!0)}let u=Array.isArray(c.usage_legs)?c.usage_legs:[];for(let f of u){if(!f||f.provider!=="codex"||!Pd.includes(f.role)||!ri(f.usage))continue;let g=typeof f.receipt_id=="string"&&f.receipt_id.length>0?f.receipt_id:null;if(!g||s.has(g))continue;s.add(g);let h=ni(f.usage),x={provider:"codex",role:f.role,attempt_id:String(c.attempt_id||""),usage:h,subtotal:si("codex",h)};x.receipt_id=g,typeof f.model=="string"&&(x.model=f.model),typeof f.session_id=="string"?x.session_id=f.session_id:typeof f.thread_id=="string"&&(x.session_id=f.thread_id),typeof f.turn_id=="string"&&(x.turn_id=f.turn_id),typeof f.completed_at=="string"&&(x.completed_at=f.completed_at),h.replayed===!0&&(x.replayed=!0),Fn(r.codex,x,!1),Fn(n[x.role].codex,x,!1)}}let o={};for(let c of["claude","codex"]){let l=r[c];if(l.legs.length===0)continue;let u=oi(l,!1);c==="claude"&&l.outer_count>0&&l.outer_cost_count===l.outer_count&&(u.total_cost_usd=l.outer_cost),o[c]=u}if(Object.keys(o).length===0)return null;let a={};for(let c of["orchestrator","implementation","review-consult"]){let l={};for(let u of["claude","codex"]){let f=n[c][u];f.legs.length>0&&(l[u]={...oi(f,!0),legs:f.legs})}Object.keys(l).length>0&&(a[c]=l)}return{providers:o,roles:a}}var{entries:gi,setPrototypeOf:li,isFrozen:Hd,getPrototypeOf:Wd,getOwnPropertyDescriptor:Gd}=Object,{freeze:$t,seal:Mt,create:Ys}=Object,{apply:Vs,construct:Ks}=typeof Reflect<"u"&&Reflect;$t||($t=function(t){return t});Mt||(Mt=function(t){return t});Vs||(Vs=function(t,r){for(var n=arguments.length,s=new Array(n>2?n-2:0),o=2;o<n;o++)s[o-2]=arguments[o];return t.apply(r,s)});Ks||(Ks=function(t){for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return new t(...n)});var Bn=xt(Array.prototype.forEach),Yd=xt(Array.prototype.lastIndexOf),ci=xt(Array.prototype.pop),en=xt(Array.prototype.push),Vd=xt(Array.prototype.splice),jn=xt(String.prototype.toLowerCase),Us=xt(String.prototype.toString),js=xt(String.prototype.match),tn=xt(String.prototype.replace),Kd=xt(String.prototype.indexOf),Zd=xt(String.prototype.trim),Ut=xt(Object.prototype.hasOwnProperty),kt=xt(RegExp.prototype.test),rn=Xd(TypeError);function xt(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return Vs(e,t,n)}}function Xd(e){return function(){for(var t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];return Ks(e,r)}}function qe(e,t){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:jn;li&&li(e,null);let n=t.length;for(;n--;){let s=t[n];if(typeof s=="string"){let o=r(s);o!==s&&(Hd(t)||(t[n]=o),s=o)}e[s]=!0}return e}function Qd(e){for(let t=0;t<e.length;t++)Ut(e,t)||(e[t]=null);return e}function Jt(e){let t=Ys(null);for(let[r,n]of gi(e))Ut(e,r)&&(Array.isArray(n)?t[r]=Qd(n):n&&typeof n=="object"&&n.constructor===Object?t[r]=Jt(n):t[r]=n);return t}function nn(e,t){for(;e!==null;){let n=Gd(e,t);if(n){if(n.get)return xt(n.get);if(typeof n.value=="function")return xt(n.value)}e=Wd(e)}function r(){return null}return r}var di=$t(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),zs=$t(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Hs=$t(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Jd=$t(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Ws=$t(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),eu=$t(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),ui=$t(["#text"]),pi=$t(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),Gs=$t(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),fi=$t(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Un=$t(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),tu=Mt(/\{\{[\w\W]*|[\w\W]*\}\}/gm),ru=Mt(/<%[\w\W]*|[\w\W]*%>/gm),nu=Mt(/\$\{[\w\W]*/gm),su=Mt(/^data-[\-\w.\u00B7-\uFFFF]+$/),ou=Mt(/^aria-[\-\w]+$/),bi=Mt(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),au=Mt(/^(?:\w+script|data):/i),iu=Mt(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),hi=Mt(/^html$/i),lu=Mt(/^[a-z][.\w]*(-[.\w]+)+$/i),_i=Object.freeze({__proto__:null,ARIA_ATTR:ou,ATTR_WHITESPACE:iu,CUSTOM_ELEMENT:lu,DATA_ATTR:su,DOCTYPE_NAME:hi,ERB_EXPR:ru,IS_ALLOWED_URI:bi,IS_SCRIPT_OR_DATA:au,MUSTACHE_EXPR:tu,TMPLIT_EXPR:nu}),sn={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},cu=function(){return typeof window>"u"?null:window},du=function(t,r){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let n=null,s="data-tt-policy-suffix";r&&r.hasAttribute(s)&&(n=r.getAttribute(s));let o="dompurify"+(n?"#"+n:"");try{return t.createPolicy(o,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},mi=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function yi(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:cu(),t=ne=>yi(ne);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==sn.document||!e.Element)return t.isSupported=!1,t;let{document:r}=e,n=r,s=n.currentScript,{DocumentFragment:o,HTMLTemplateElement:a,Node:c,Element:l,NodeFilter:u,NamedNodeMap:f=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:g,DOMParser:h,trustedTypes:x}=e,$=l.prototype,T=nn($,"cloneNode"),W=nn($,"remove"),k=nn($,"nextSibling"),J=nn($,"childNodes"),se=nn($,"parentNode");if(typeof a=="function"){let ne=r.createElement("template");ne.content&&ne.content.ownerDocument&&(r=ne.content.ownerDocument)}let D,F="",{implementation:S,createNodeIterator:H,createDocumentFragment:M,getElementsByTagName:fe}=r,{importNode:Ce}=n,ce=mi();t.isSupported=typeof gi=="function"&&typeof se=="function"&&S&&S.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:he,ERB_EXPR:Se,TMPLIT_EXPR:Re,DATA_ATTR:Ve,ARIA_ATTR:Oe,IS_SCRIPT_OR_DATA:Ae,ATTR_WHITESPACE:be,CUSTOM_ELEMENT:_e}=_i,{IS_ALLOWED_URI:ve}=_i,N=null,A=qe({},[...di,...zs,...Hs,...Ws,...ui]),I=null,te=qe({},[...pi,...Gs,...fi,...Un]),V=Object.seal(Ys(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Q=null,R=null,j=Object.seal(Ys(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),ue=!0,me=!0,Te=!1,we=!0,xe=!1,Ue=!0,je=!1,rt=!1,U=!1,G=!1,z=!1,v=!1,C=!0,q=!1,K="user-content-",ee=!0,De=!1,Ee={},Me=null,ze=qe({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),lt=null,ot=qe({},["audio","video","img","source","image","track"]),dt=null,At=qe({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),it="http://www.w3.org/1998/Math/MathML",mt="http://www.w3.org/2000/svg",nt="http://www.w3.org/1999/xhtml",ct=nt,gt=!1,L=null,Z=qe({},[it,mt,nt],Us),pe=qe({},["mi","mo","mn","ms","mtext"]),de=qe({},["annotation-xml"]),ke=qe({},["title","style","font","a","script"]),Le=null,He=["application/xhtml+xml","text/html"],Je="text/html",Ie=null,We=null,$e=r.createElement("form"),yt=function(y){return y instanceof RegExp||y instanceof Function},wt=function(){let y=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(We&&We===y)){if((!y||typeof y!="object")&&(y={}),y=Jt(y),Le=He.indexOf(y.PARSER_MEDIA_TYPE)===-1?Je:y.PARSER_MEDIA_TYPE,Ie=Le==="application/xhtml+xml"?Us:jn,N=Ut(y,"ALLOWED_TAGS")?qe({},y.ALLOWED_TAGS,Ie):A,I=Ut(y,"ALLOWED_ATTR")?qe({},y.ALLOWED_ATTR,Ie):te,L=Ut(y,"ALLOWED_NAMESPACES")?qe({},y.ALLOWED_NAMESPACES,Us):Z,dt=Ut(y,"ADD_URI_SAFE_ATTR")?qe(Jt(At),y.ADD_URI_SAFE_ATTR,Ie):At,lt=Ut(y,"ADD_DATA_URI_TAGS")?qe(Jt(ot),y.ADD_DATA_URI_TAGS,Ie):ot,Me=Ut(y,"FORBID_CONTENTS")?qe({},y.FORBID_CONTENTS,Ie):ze,Q=Ut(y,"FORBID_TAGS")?qe({},y.FORBID_TAGS,Ie):Jt({}),R=Ut(y,"FORBID_ATTR")?qe({},y.FORBID_ATTR,Ie):Jt({}),Ee=Ut(y,"USE_PROFILES")?y.USE_PROFILES:!1,ue=y.ALLOW_ARIA_ATTR!==!1,me=y.ALLOW_DATA_ATTR!==!1,Te=y.ALLOW_UNKNOWN_PROTOCOLS||!1,we=y.ALLOW_SELF_CLOSE_IN_ATTR!==!1,xe=y.SAFE_FOR_TEMPLATES||!1,Ue=y.SAFE_FOR_XML!==!1,je=y.WHOLE_DOCUMENT||!1,G=y.RETURN_DOM||!1,z=y.RETURN_DOM_FRAGMENT||!1,v=y.RETURN_TRUSTED_TYPE||!1,U=y.FORCE_BODY||!1,C=y.SANITIZE_DOM!==!1,q=y.SANITIZE_NAMED_PROPS||!1,ee=y.KEEP_CONTENT!==!1,De=y.IN_PLACE||!1,ve=y.ALLOWED_URI_REGEXP||bi,ct=y.NAMESPACE||nt,pe=y.MATHML_TEXT_INTEGRATION_POINTS||pe,de=y.HTML_INTEGRATION_POINTS||de,V=y.CUSTOM_ELEMENT_HANDLING||{},y.CUSTOM_ELEMENT_HANDLING&&yt(y.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(V.tagNameCheck=y.CUSTOM_ELEMENT_HANDLING.tagNameCheck),y.CUSTOM_ELEMENT_HANDLING&&yt(y.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(V.attributeNameCheck=y.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),y.CUSTOM_ELEMENT_HANDLING&&typeof y.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(V.allowCustomizedBuiltInElements=y.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),xe&&(me=!1),z&&(G=!0),Ee&&(N=qe({},ui),I=[],Ee.html===!0&&(qe(N,di),qe(I,pi)),Ee.svg===!0&&(qe(N,zs),qe(I,Gs),qe(I,Un)),Ee.svgFilters===!0&&(qe(N,Hs),qe(I,Gs),qe(I,Un)),Ee.mathMl===!0&&(qe(N,Ws),qe(I,fi),qe(I,Un))),y.ADD_TAGS&&(typeof y.ADD_TAGS=="function"?j.tagCheck=y.ADD_TAGS:(N===A&&(N=Jt(N)),qe(N,y.ADD_TAGS,Ie))),y.ADD_ATTR&&(typeof y.ADD_ATTR=="function"?j.attributeCheck=y.ADD_ATTR:(I===te&&(I=Jt(I)),qe(I,y.ADD_ATTR,Ie))),y.ADD_URI_SAFE_ATTR&&qe(dt,y.ADD_URI_SAFE_ATTR,Ie),y.FORBID_CONTENTS&&(Me===ze&&(Me=Jt(Me)),qe(Me,y.FORBID_CONTENTS,Ie)),ee&&(N["#text"]=!0),je&&qe(N,["html","head","body"]),N.table&&(qe(N,["tbody"]),delete Q.tbody),y.TRUSTED_TYPES_POLICY){if(typeof y.TRUSTED_TYPES_POLICY.createHTML!="function")throw rn('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof y.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw rn('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');D=y.TRUSTED_TYPES_POLICY,F=D.createHTML("")}else D===void 0&&(D=du(x,s)),D!==null&&typeof F=="string"&&(F=D.createHTML(""));$t&&$t(y),We=y}},Nt=qe({},[...zs,...Hs,...Jd]),Vt=qe({},[...Ws,...eu]),Kt=function(y){let Y=se(y);(!Y||!Y.tagName)&&(Y={namespaceURI:ct,tagName:"template"});let ae=jn(y.tagName),Be=jn(Y.tagName);return L[y.namespaceURI]?y.namespaceURI===mt?Y.namespaceURI===nt?ae==="svg":Y.namespaceURI===it?ae==="svg"&&(Be==="annotation-xml"||pe[Be]):!!Nt[ae]:y.namespaceURI===it?Y.namespaceURI===nt?ae==="math":Y.namespaceURI===mt?ae==="math"&&de[Be]:!!Vt[ae]:y.namespaceURI===nt?Y.namespaceURI===mt&&!de[Be]||Y.namespaceURI===it&&!pe[Be]?!1:!Vt[ae]&&(ke[ae]||!Nt[ae]):!!(Le==="application/xhtml+xml"&&L[y.namespaceURI]):!1},_t=function(y){en(t.removed,{element:y});try{se(y).removeChild(y)}catch{W(y)}},Tt=function(y,Y){try{en(t.removed,{attribute:Y.getAttributeNode(y),from:Y})}catch{en(t.removed,{attribute:null,from:Y})}if(Y.removeAttribute(y),y==="is")if(G||z)try{_t(Y)}catch{}else try{Y.setAttribute(y,"")}catch{}},sr=function(y){let Y=null,ae=null;if(U)y="<remove></remove>"+y;else{let Ze=js(y,/^[\r\n\t ]+/);ae=Ze&&Ze[0]}Le==="application/xhtml+xml"&&ct===nt&&(y='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+y+"</body></html>");let Be=D?D.createHTML(y):y;if(ct===nt)try{Y=new h().parseFromString(Be,Le)}catch{}if(!Y||!Y.documentElement){Y=S.createDocument(ct,"template",null);try{Y.documentElement.innerHTML=gt?F:Be}catch{}}let et=Y.body||Y.documentElement;return y&&ae&&et.insertBefore(r.createTextNode(ae),et.childNodes[0]||null),ct===nt?fe.call(Y,je?"html":"body")[0]:je?Y.documentElement:et},Pt=function(y){return H.call(y.ownerDocument||y,y,u.SHOW_ELEMENT|u.SHOW_COMMENT|u.SHOW_TEXT|u.SHOW_PROCESSING_INSTRUCTION|u.SHOW_CDATA_SECTION,null)},p=function(y){return y instanceof g&&(typeof y.nodeName!="string"||typeof y.textContent!="string"||typeof y.removeChild!="function"||!(y.attributes instanceof f)||typeof y.removeAttribute!="function"||typeof y.setAttribute!="function"||typeof y.namespaceURI!="string"||typeof y.insertBefore!="function"||typeof y.hasChildNodes!="function")},w=function(y){return typeof c=="function"&&y instanceof c};function O(ne,y,Y){Bn(ne,ae=>{ae.call(t,y,Y,We)})}let X=function(y){let Y=null;if(O(ce.beforeSanitizeElements,y,null),p(y))return _t(y),!0;let ae=Ie(y.nodeName);if(O(ce.uponSanitizeElement,y,{tagName:ae,allowedTags:N}),Ue&&y.hasChildNodes()&&!w(y.firstElementChild)&&kt(/<[/\w!]/g,y.innerHTML)&&kt(/<[/\w!]/g,y.textContent)||y.nodeType===sn.progressingInstruction||Ue&&y.nodeType===sn.comment&&kt(/<[/\w]/g,y.data))return _t(y),!0;if(!(j.tagCheck instanceof Function&&j.tagCheck(ae))&&(!N[ae]||Q[ae])){if(!Q[ae]&&Ge(ae)&&(V.tagNameCheck instanceof RegExp&&kt(V.tagNameCheck,ae)||V.tagNameCheck instanceof Function&&V.tagNameCheck(ae)))return!1;if(ee&&!Me[ae]){let Be=se(y)||y.parentNode,et=J(y)||y.childNodes;if(et&&Be){let Ze=et.length;for(let ge=Ze-1;ge>=0;--ge){let d=T(et[ge],!0);d.__removalCount=(y.__removalCount||0)+1,Be.insertBefore(d,k(y))}}}return _t(y),!0}return y instanceof l&&!Kt(y)||(ae==="noscript"||ae==="noembed"||ae==="noframes")&&kt(/<\/no(script|embed|frames)/i,y.innerHTML)?(_t(y),!0):(xe&&y.nodeType===sn.text&&(Y=y.textContent,Bn([he,Se,Re],Be=>{Y=tn(Y,Be," ")}),y.textContent!==Y&&(en(t.removed,{element:y.cloneNode()}),y.textContent=Y)),O(ce.afterSanitizeElements,y,null),!1)},le=function(y,Y,ae){if(C&&(Y==="id"||Y==="name")&&(ae in r||ae in $e))return!1;if(!(me&&!R[Y]&&kt(Ve,Y))){if(!(ue&&kt(Oe,Y))){if(!(j.attributeCheck instanceof Function&&j.attributeCheck(Y,y))){if(!I[Y]||R[Y]){if(!(Ge(y)&&(V.tagNameCheck instanceof RegExp&&kt(V.tagNameCheck,y)||V.tagNameCheck instanceof Function&&V.tagNameCheck(y))&&(V.attributeNameCheck instanceof RegExp&&kt(V.attributeNameCheck,Y)||V.attributeNameCheck instanceof Function&&V.attributeNameCheck(Y,y))||Y==="is"&&V.allowCustomizedBuiltInElements&&(V.tagNameCheck instanceof RegExp&&kt(V.tagNameCheck,ae)||V.tagNameCheck instanceof Function&&V.tagNameCheck(ae))))return!1}else if(!dt[Y]){if(!kt(ve,tn(ae,be,""))){if(!((Y==="src"||Y==="xlink:href"||Y==="href")&&y!=="script"&&Kd(ae,"data:")===0&&lt[y])){if(!(Te&&!kt(Ae,tn(ae,be,"")))){if(ae)return!1}}}}}}}return!0},Ge=function(y){return y!=="annotation-xml"&&js(y,_e)},ye=function(y){O(ce.beforeSanitizeAttributes,y,null);let{attributes:Y}=y;if(!Y||p(y))return;let ae={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:I,forceKeepAttr:void 0},Be=Y.length;for(;Be--;){let et=Y[Be],{name:Ze,namespaceURI:ge,value:d}=et,_=Ie(Ze),b=d,E=Ze==="value"?b:Zd(b);if(ae.attrName=_,ae.attrValue=E,ae.keepAttr=!0,ae.forceKeepAttr=void 0,O(ce.uponSanitizeAttribute,y,ae),E=ae.attrValue,q&&(_==="id"||_==="name")&&(Tt(Ze,y),E=K+E),Ue&&kt(/((--!?|])>)|<\/(style|title|textarea)/i,E)){Tt(Ze,y);continue}if(_==="attributename"&&js(E,"href")){Tt(Ze,y);continue}if(ae.forceKeepAttr)continue;if(!ae.keepAttr){Tt(Ze,y);continue}if(!we&&kt(/\/>/i,E)){Tt(Ze,y);continue}xe&&Bn([he,Se,Re],oe=>{E=tn(E,oe," ")});let B=Ie(y.nodeName);if(!le(B,_,E)){Tt(Ze,y);continue}if(D&&typeof x=="object"&&typeof x.getAttributeType=="function"&&!ge)switch(x.getAttributeType(B,_)){case"TrustedHTML":{E=D.createHTML(E);break}case"TrustedScriptURL":{E=D.createScriptURL(E);break}}if(E!==b)try{ge?y.setAttributeNS(ge,Ze,E):y.setAttribute(Ze,E),p(y)?_t(y):ci(t.removed)}catch{Tt(Ze,y)}}O(ce.afterSanitizeAttributes,y,null)},Xe=function ne(y){let Y=null,ae=Pt(y);for(O(ce.beforeSanitizeShadowDOM,y,null);Y=ae.nextNode();)O(ce.uponSanitizeShadowNode,Y,null),X(Y),ye(Y),Y.content instanceof o&&ne(Y.content);O(ce.afterSanitizeShadowDOM,y,null)};return t.sanitize=function(ne){let y=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},Y=null,ae=null,Be=null,et=null;if(gt=!ne,gt&&(ne="<!-->"),typeof ne!="string"&&!w(ne))if(typeof ne.toString=="function"){if(ne=ne.toString(),typeof ne!="string")throw rn("dirty is not a string, aborting")}else throw rn("toString is not a function");if(!t.isSupported)return ne;if(rt||wt(y),t.removed=[],typeof ne=="string"&&(De=!1),De){if(ne.nodeName){let d=Ie(ne.nodeName);if(!N[d]||Q[d])throw rn("root node is forbidden and cannot be sanitized in-place")}}else if(ne instanceof c)Y=sr("<!---->"),ae=Y.ownerDocument.importNode(ne,!0),ae.nodeType===sn.element&&ae.nodeName==="BODY"||ae.nodeName==="HTML"?Y=ae:Y.appendChild(ae);else{if(!G&&!xe&&!je&&ne.indexOf("<")===-1)return D&&v?D.createHTML(ne):ne;if(Y=sr(ne),!Y)return G?null:v?F:""}Y&&U&&_t(Y.firstChild);let Ze=Pt(De?ne:Y);for(;Be=Ze.nextNode();)X(Be),ye(Be),Be.content instanceof o&&Xe(Be.content);if(De)return ne;if(G){if(z)for(et=M.call(Y.ownerDocument);Y.firstChild;)et.appendChild(Y.firstChild);else et=Y;return(I.shadowroot||I.shadowrootmode)&&(et=Ce.call(n,et,!0)),et}let ge=je?Y.outerHTML:Y.innerHTML;return je&&N["!doctype"]&&Y.ownerDocument&&Y.ownerDocument.doctype&&Y.ownerDocument.doctype.name&&kt(hi,Y.ownerDocument.doctype.name)&&(ge="<!DOCTYPE "+Y.ownerDocument.doctype.name+`>
`+ge),xe&&Bn([he,Se,Re],d=>{ge=tn(ge,d," ")}),D&&v?D.createHTML(ge):ge},t.setConfig=function(){let ne=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};wt(ne),rt=!0},t.clearConfig=function(){We=null,rt=!1},t.isValidAttribute=function(ne,y,Y){We||wt({});let ae=Ie(ne),Be=Ie(y);return le(ae,Be,Y)},t.addHook=function(ne,y){typeof y=="function"&&en(ce[ne],y)},t.removeHook=function(ne,y){if(y!==void 0){let Y=Yd(ce[ne],y);return Y===-1?void 0:Vd(ce[ne],Y,1)[0]}return ci(ce[ne])},t.removeHooks=function(ne){ce[ne]=[]},t.removeAllHooks=function(){ce=mi()},t}var vi=yi();var wi={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},ki=e=>(...t)=>({_$litDirective$:e,values:t}),zn=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,r,n){this._$Ct=t,this._$AM=r,this._$Ci=n}_$AS(t,r){return this.update(t,r)}update(t,r){return this.render(...r)}};var on=class extends zn{constructor(t){if(super(t),this.it=pt,t.type!==wi.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===pt||t==null)return this._t=void 0,this.it=t;if(t===vr)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let r=[t];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}};on.directiveName="unsafeHTML",on.resultType=1;var $i=ki(on);function Js(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Tr=Js();function Ri(e){Tr=e}var dn={exec:()=>null};function Ke(e,t=""){let r=typeof e=="string"?e:e.source,n={replace:(s,o)=>{let a=typeof o=="string"?o:o.source;return a=a.replace(St.caret,"$1"),r=r.replace(s,a),n},getRegex:()=>new RegExp(r,t)};return n}var uu=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),St={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},pu=/^(?:[ \t]*(?:\n|$))+/,fu=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,_u=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,un=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,mu=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,eo=/(?:[*+-]|\d{1,9}[.)])/,Ii=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Li=Ke(Ii).replace(/bull/g,eo).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),gu=Ke(Ii).replace(/bull/g,eo).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),to=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,bu=/^[^\n]+/,ro=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,hu=Ke(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",ro).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),yu=Ke(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,eo).getRegex(),Kn="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",no=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,vu=Ke("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",no).replace("tag",Kn).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Oi=Ke(to).replace("hr",un).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Kn).getRegex(),wu=Ke(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Oi).getRegex(),so={blockquote:wu,code:fu,def:hu,fences:_u,heading:mu,hr:un,html:vu,lheading:Li,list:yu,newline:pu,paragraph:Oi,table:dn,text:bu},xi=Ke("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",un).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Kn).getRegex(),ku={...so,lheading:gu,table:xi,paragraph:Ke(to).replace("hr",un).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",xi).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Kn).getRegex()},$u={...so,html:Ke(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",no).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:dn,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:Ke(to).replace("hr",un).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Li).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},xu=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Su=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Di=/^( {2,}|\\)\n(?!\s*$)/,Au=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Zn=/[\p{P}\p{S}]/u,oo=/[\s\p{P}\p{S}]/u,Mi=/[^\s\p{P}\p{S}]/u,Tu=Ke(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,oo).getRegex(),Ni=/(?!~)[\p{P}\p{S}]/u,Eu=/(?!~)[\s\p{P}\p{S}]/u,Cu=/(?:[^\s\p{P}\p{S}]|~)/u,Ru=Ke(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",uu?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),Pi=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,Iu=Ke(Pi,"u").replace(/punct/g,Zn).getRegex(),Lu=Ke(Pi,"u").replace(/punct/g,Ni).getRegex(),Fi="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Ou=Ke(Fi,"gu").replace(/notPunctSpace/g,Mi).replace(/punctSpace/g,oo).replace(/punct/g,Zn).getRegex(),Du=Ke(Fi,"gu").replace(/notPunctSpace/g,Cu).replace(/punctSpace/g,Eu).replace(/punct/g,Ni).getRegex(),Mu=Ke("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,Mi).replace(/punctSpace/g,oo).replace(/punct/g,Zn).getRegex(),Nu=Ke(/\\(punct)/,"gu").replace(/punct/g,Zn).getRegex(),Pu=Ke(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Fu=Ke(no).replace("(?:-->|$)","-->").getRegex(),qu=Ke("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Fu).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Gn=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,Bu=Ke(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Gn).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),qi=Ke(/^!?\[(label)\]\[(ref)\]/).replace("label",Gn).replace("ref",ro).getRegex(),Bi=Ke(/^!?\[(ref)\](?:\[\])?/).replace("ref",ro).getRegex(),Uu=Ke("reflink|nolink(?!\\()","g").replace("reflink",qi).replace("nolink",Bi).getRegex(),Si=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,ao={_backpedal:dn,anyPunctuation:Nu,autolink:Pu,blockSkip:Ru,br:Di,code:Su,del:dn,emStrongLDelim:Iu,emStrongRDelimAst:Ou,emStrongRDelimUnd:Mu,escape:xu,link:Bu,nolink:Bi,punctuation:Tu,reflink:qi,reflinkSearch:Uu,tag:qu,text:Au,url:dn},ju={...ao,link:Ke(/^!?\[(label)\]\((.*?)\)/).replace("label",Gn).getRegex(),reflink:Ke(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Gn).getRegex()},Zs={...ao,emStrongRDelimAst:Du,emStrongLDelim:Lu,url:Ke(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",Si).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:Ke(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",Si).getRegex()},zu={...Zs,br:Ke(Di).replace("{2,}","*").getRegex(),text:Ke(Zs.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Hn={normal:so,gfm:ku,pedantic:$u},an={normal:ao,gfm:Zs,breaks:zu,pedantic:ju},Hu={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Ai=e=>Hu[e];function er(e,t){if(t){if(St.escapeTest.test(e))return e.replace(St.escapeReplace,Ai)}else if(St.escapeTestNoEncode.test(e))return e.replace(St.escapeReplaceNoEncode,Ai);return e}function Ti(e){try{e=encodeURI(e).replace(St.percentDecode,"%")}catch{return null}return e}function Ei(e,t){let r=e.replace(St.findPipe,(o,a,c)=>{let l=!1,u=a;for(;--u>=0&&c[u]==="\\";)l=!l;return l?"|":" |"}),n=r.split(St.splitPipe),s=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),t)if(n.length>t)n.splice(t);else for(;n.length<t;)n.push("");for(;s<n.length;s++)n[s]=n[s].trim().replace(St.slashPipe,"|");return n}function ln(e,t,r){let n=e.length;if(n===0)return"";let s=0;for(;s<n;){let o=e.charAt(n-s-1);if(o===t&&!r)s++;else if(o!==t&&r)s++;else break}return e.slice(0,n-s)}function Wu(e,t){if(e.indexOf(t[1])===-1)return-1;let r=0;for(let n=0;n<e.length;n++)if(e[n]==="\\")n++;else if(e[n]===t[0])r++;else if(e[n]===t[1]&&(r--,r<0))return n;return r>0?-2:-1}function Ci(e,t,r,n,s){let o=t.href,a=t.title||null,c=e[1].replace(s.other.outputLinkReplace,"$1");n.state.inLink=!0;let l={type:e[0].charAt(0)==="!"?"image":"link",raw:r,href:o,title:a,text:c,tokens:n.inlineTokens(c)};return n.state.inLink=!1,l}function Gu(e,t,r){let n=e.match(r.other.indentCodeCompensation);if(n===null)return t;let s=n[1];return t.split(`
`).map(o=>{let a=o.match(r.other.beginningSpace);if(a===null)return o;let[c]=a;return c.length>=s.length?o.slice(s.length):o}).join(`
`)}var Yn=class{constructor(e){tt(this,"options");tt(this,"rules");tt(this,"lexer");this.options=e||Tr}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let r=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?r:ln(r,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let r=t[0],n=Gu(r,t[3]||"",this.rules);return{type:"code",raw:r,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:n}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let r=t[2].trim();if(this.rules.other.endingHash.test(r)){let n=ln(r,"#");(this.options.pedantic||!n||this.rules.other.endingSpaceChar.test(n))&&(r=n.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:ln(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let r=ln(t[0],`
`).split(`
`),n="",s="",o=[];for(;r.length>0;){let a=!1,c=[],l;for(l=0;l<r.length;l++)if(this.rules.other.blockquoteStart.test(r[l]))c.push(r[l]),a=!0;else if(!a)c.push(r[l]);else break;r=r.slice(l);let u=c.join(`
`),f=u.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");n=n?`${n}
${u}`:u,s=s?`${s}
${f}`:f;let g=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(f,o,!0),this.lexer.state.top=g,r.length===0)break;let h=o.at(-1);if(h?.type==="code")break;if(h?.type==="blockquote"){let x=h,$=x.raw+`
`+r.join(`
`),T=this.blockquote($);o[o.length-1]=T,n=n.substring(0,n.length-x.raw.length)+T.raw,s=s.substring(0,s.length-x.text.length)+T.text;break}else if(h?.type==="list"){let x=h,$=x.raw+`
`+r.join(`
`),T=this.list($);o[o.length-1]=T,n=n.substring(0,n.length-h.raw.length)+T.raw,s=s.substring(0,s.length-x.raw.length)+T.raw,r=$.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:n,tokens:o,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let r=t[1].trim(),n=r.length>1,s={type:"list",raw:"",ordered:n,start:n?+r.slice(0,-1):"",loose:!1,items:[]};r=n?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=n?r:"[*+-]");let o=this.rules.other.listItemRegex(r),a=!1;for(;e;){let l=!1,u="",f="";if(!(t=o.exec(e))||this.rules.block.hr.test(e))break;u=t[0],e=e.substring(u.length);let g=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,T=>" ".repeat(3*T.length)),h=e.split(`
`,1)[0],x=!g.trim(),$=0;if(this.options.pedantic?($=2,f=g.trimStart()):x?$=t[1].length+1:($=t[2].search(this.rules.other.nonSpaceChar),$=$>4?1:$,f=g.slice($),$+=t[1].length),x&&this.rules.other.blankLine.test(h)&&(u+=h+`
`,e=e.substring(h.length+1),l=!0),!l){let T=this.rules.other.nextBulletRegex($),W=this.rules.other.hrRegex($),k=this.rules.other.fencesBeginRegex($),J=this.rules.other.headingBeginRegex($),se=this.rules.other.htmlBeginRegex($);for(;e;){let D=e.split(`
`,1)[0],F;if(h=D,this.options.pedantic?(h=h.replace(this.rules.other.listReplaceNesting,"  "),F=h):F=h.replace(this.rules.other.tabCharGlobal,"    "),k.test(h)||J.test(h)||se.test(h)||T.test(h)||W.test(h))break;if(F.search(this.rules.other.nonSpaceChar)>=$||!h.trim())f+=`
`+F.slice($);else{if(x||g.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||k.test(g)||J.test(g)||W.test(g))break;f+=`
`+h}!x&&!h.trim()&&(x=!0),u+=D+`
`,e=e.substring(D.length+1),g=F.slice($)}}s.loose||(a?s.loose=!0:this.rules.other.doubleBlankLine.test(u)&&(a=!0)),s.items.push({type:"list_item",raw:u,task:!!this.options.gfm&&this.rules.other.listIsTask.test(f),loose:!1,text:f,tokens:[]}),s.raw+=u}let c=s.items.at(-1);if(c)c.raw=c.raw.trimEnd(),c.text=c.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let l of s.items){if(this.lexer.state.top=!1,l.tokens=this.lexer.blockTokens(l.text,[]),l.task){if(l.text=l.text.replace(this.rules.other.listReplaceTask,""),l.tokens[0]?.type==="text"||l.tokens[0]?.type==="paragraph"){l.tokens[0].raw=l.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),l.tokens[0].text=l.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let f=this.lexer.inlineQueue.length-1;f>=0;f--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[f].src)){this.lexer.inlineQueue[f].src=this.lexer.inlineQueue[f].src.replace(this.rules.other.listReplaceTask,"");break}}let u=this.rules.other.listTaskCheckbox.exec(l.raw);if(u){let f={type:"checkbox",raw:u[0]+" ",checked:u[0]!=="[ ]"};l.checked=f.checked,s.loose?l.tokens[0]&&["paragraph","text"].includes(l.tokens[0].type)&&"tokens"in l.tokens[0]&&l.tokens[0].tokens?(l.tokens[0].raw=f.raw+l.tokens[0].raw,l.tokens[0].text=f.raw+l.tokens[0].text,l.tokens[0].tokens.unshift(f)):l.tokens.unshift({type:"paragraph",raw:f.raw,text:f.raw,tokens:[f]}):l.tokens.unshift(f)}}if(!s.loose){let u=l.tokens.filter(g=>g.type==="space"),f=u.length>0&&u.some(g=>this.rules.other.anyLine.test(g.raw));s.loose=f}}if(s.loose)for(let l of s.items){l.loose=!0;for(let u of l.tokens)u.type==="text"&&(u.type="paragraph")}return s}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let r=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),n=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:r,raw:t[0],href:n,title:s}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let r=Ei(t[1]),n=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(r.length===n.length){for(let a of n)this.rules.other.tableAlignRight.test(a)?o.align.push("right"):this.rules.other.tableAlignCenter.test(a)?o.align.push("center"):this.rules.other.tableAlignLeft.test(a)?o.align.push("left"):o.align.push(null);for(let a=0;a<r.length;a++)o.header.push({text:r[a],tokens:this.lexer.inline(r[a]),header:!0,align:o.align[a]});for(let a of s)o.rows.push(Ei(a,o.header.length).map((c,l)=>({text:c,tokens:this.lexer.inline(c),header:!1,align:o.align[l]})));return o}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let r=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:r,tokens:this.lexer.inline(r)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let r=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;let o=ln(r.slice(0,-1),"\\");if((r.length-o.length)%2===0)return}else{let o=Wu(t[2],"()");if(o===-2)return;if(o>-1){let a=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,a).trim(),t[3]=""}}let n=t[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(n);o&&(n=o[1],s=o[3])}else s=t[3]?t[3].slice(1,-1):"";return n=n.trim(),this.rules.other.startAngleBracket.test(n)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?n=n.slice(1):n=n.slice(1,-1)),Ci(t,{href:n&&n.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let r;if((r=this.rules.inline.reflink.exec(e))||(r=this.rules.inline.nolink.exec(e))){let n=(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[n.toLowerCase()];if(!s){let o=r[0].charAt(0);return{type:"text",raw:o,text:o}}return Ci(r,s,r[0],this.lexer,this.rules)}}emStrong(e,t,r=""){let n=this.rules.inline.emStrongLDelim.exec(e);if(!(!n||n[3]&&r.match(this.rules.other.unicodeAlphaNumeric))&&(!(n[1]||n[2])||!r||this.rules.inline.punctuation.exec(r))){let s=[...n[0]].length-1,o,a,c=s,l=0,u=n[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(u.lastIndex=0,t=t.slice(-1*e.length+s);(n=u.exec(t))!=null;){if(o=n[1]||n[2]||n[3]||n[4]||n[5]||n[6],!o)continue;if(a=[...o].length,n[3]||n[4]){c+=a;continue}else if((n[5]||n[6])&&s%3&&!((s+a)%3)){l+=a;continue}if(c-=a,c>0)continue;a=Math.min(a,a+c+l);let f=[...n[0]][0].length,g=e.slice(0,s+n.index+f+a);if(Math.min(s,a)%2){let x=g.slice(1,-1);return{type:"em",raw:g,text:x,tokens:this.lexer.inlineTokens(x)}}let h=g.slice(2,-2);return{type:"strong",raw:g,text:h,tokens:this.lexer.inlineTokens(h)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let r=t[2].replace(this.rules.other.newLineCharGlobal," "),n=this.rules.other.nonSpaceChar.test(r),s=this.rules.other.startingSpaceChar.test(r)&&this.rules.other.endingSpaceChar.test(r);return n&&s&&(r=r.substring(1,r.length-1)),{type:"codespan",raw:t[0],text:r}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let r,n;return t[2]==="@"?(r=t[1],n="mailto:"+r):(r=t[1],n=r),{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let r,n;if(t[2]==="@")r=t[0],n="mailto:"+r;else{let s;do s=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(s!==t[0]);r=t[0],t[1]==="www."?n="http://"+t[0]:n=t[0]}return{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let r=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:r}}}},jt=class Xs{constructor(t){tt(this,"tokens");tt(this,"options");tt(this,"state");tt(this,"inlineQueue");tt(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||Tr,this.options.tokenizer=this.options.tokenizer||new Yn,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let r={other:St,block:Hn.normal,inline:an.normal};this.options.pedantic?(r.block=Hn.pedantic,r.inline=an.pedantic):this.options.gfm&&(r.block=Hn.gfm,this.options.breaks?r.inline=an.breaks:r.inline=an.gfm),this.tokenizer.rules=r}static get rules(){return{block:Hn,inline:an}}static lex(t,r){return new Xs(r).lex(t)}static lexInline(t,r){return new Xs(r).inlineTokens(t)}lex(t){t=t.replace(St.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let r=0;r<this.inlineQueue.length;r++){let n=this.inlineQueue[r];this.inlineTokens(n.src,n.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,r=[],n=!1){for(this.options.pedantic&&(t=t.replace(St.tabCharGlobal,"    ").replace(St.spaceLine,""));t;){let s;if(this.options.extensions?.block?.some(a=>(s=a.call({lexer:this},t,r))?(t=t.substring(s.raw.length),r.push(s),!0):!1))continue;if(s=this.tokenizer.space(t)){t=t.substring(s.raw.length);let a=r.at(-1);s.raw.length===1&&a!==void 0?a.raw+=`
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
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):r.push(s);continue}if(t){let a="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(a);break}else throw new Error(a)}}return this.state.top=!0,r}inline(t,r=[]){return this.inlineQueue.push({src:t,tokens:r}),r}inlineTokens(t,r=[]){let n=t,s=null;if(this.tokens.links){let l=Object.keys(this.tokens.links);if(l.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(n))!=null;)l.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(n=n.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(n))!=null;)n=n.slice(0,s.index)+"++"+n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(n))!=null;)o=s[2]?s[2].length:0,n=n.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let a=!1,c="";for(;t;){a||(c=""),a=!1;let l;if(this.options.extensions?.inline?.some(f=>(l=f.call({lexer:this},t,r))?(t=t.substring(l.raw.length),r.push(l),!0):!1))continue;if(l=this.tokenizer.escape(t)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.tag(t)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.link(t)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(l.raw.length);let f=r.at(-1);l.type==="text"&&f?.type==="text"?(f.raw+=l.raw,f.text+=l.text):r.push(l);continue}if(l=this.tokenizer.emStrong(t,n,c)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.codespan(t)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.br(t)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.del(t)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.autolink(t)){t=t.substring(l.raw.length),r.push(l);continue}if(!this.state.inLink&&(l=this.tokenizer.url(t))){t=t.substring(l.raw.length),r.push(l);continue}let u=t;if(this.options.extensions?.startInline){let f=1/0,g=t.slice(1),h;this.options.extensions.startInline.forEach(x=>{h=x.call({lexer:this},g),typeof h=="number"&&h>=0&&(f=Math.min(f,h))}),f<1/0&&f>=0&&(u=t.substring(0,f+1))}if(l=this.tokenizer.inlineText(u)){t=t.substring(l.raw.length),l.raw.slice(-1)!=="_"&&(c=l.raw.slice(-1)),a=!0;let f=r.at(-1);f?.type==="text"?(f.raw+=l.raw,f.text+=l.text):r.push(l);continue}if(t){let f="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(f);break}else throw new Error(f)}}return r}},Vn=class{constructor(e){tt(this,"options");tt(this,"parser");this.options=e||Tr}space(e){return""}code({text:e,lang:t,escaped:r}){let n=(t||"").match(St.notSpaceStart)?.[0],s=e.replace(St.endingNewline,"")+`
`;return n?'<pre><code class="language-'+er(n)+'">'+(r?s:er(s,!0))+`</code></pre>
`:"<pre><code>"+(r?s:er(s,!0))+`</code></pre>
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${er(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:r}){let n=this.parser.parseInline(r),s=Ti(e);if(s===null)return n;e=s;let o='<a href="'+e+'"';return t&&(o+=' title="'+er(t)+'"'),o+=">"+n+"</a>",o}image({href:e,title:t,text:r,tokens:n}){n&&(r=this.parser.parseInline(n,this.parser.textRenderer));let s=Ti(e);if(s===null)return er(r);e=s;let o=`<img src="${e}" alt="${r}"`;return t&&(o+=` title="${er(t)}"`),o+=">",o}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:er(e.text)}},io=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},zt=class Qs{constructor(t){tt(this,"options");tt(this,"renderer");tt(this,"textRenderer");this.options=t||Tr,this.options.renderer=this.options.renderer||new Vn,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new io}static parse(t,r){return new Qs(r).parse(t)}static parseInline(t,r){return new Qs(r).parseInline(t)}parse(t){let r="";for(let n=0;n<t.length;n++){let s=t[n];if(this.options.extensions?.renderers?.[s.type]){let a=s,c=this.options.extensions.renderers[a.type].call({parser:this},a);if(c!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(a.type)){r+=c||"";continue}}let o=s;switch(o.type){case"space":{r+=this.renderer.space(o);break}case"hr":{r+=this.renderer.hr(o);break}case"heading":{r+=this.renderer.heading(o);break}case"code":{r+=this.renderer.code(o);break}case"table":{r+=this.renderer.table(o);break}case"blockquote":{r+=this.renderer.blockquote(o);break}case"list":{r+=this.renderer.list(o);break}case"checkbox":{r+=this.renderer.checkbox(o);break}case"html":{r+=this.renderer.html(o);break}case"def":{r+=this.renderer.def(o);break}case"paragraph":{r+=this.renderer.paragraph(o);break}case"text":{r+=this.renderer.text(o);break}default:{let a='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return r}parseInline(t,r=this.renderer){let n="";for(let s=0;s<t.length;s++){let o=t[s];if(this.options.extensions?.renderers?.[o.type]){let c=this.options.extensions.renderers[o.type].call({parser:this},o);if(c!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){n+=c||"";continue}}let a=o;switch(a.type){case"escape":{n+=r.text(a);break}case"html":{n+=r.html(a);break}case"link":{n+=r.link(a);break}case"image":{n+=r.image(a);break}case"checkbox":{n+=r.checkbox(a);break}case"strong":{n+=r.strong(a);break}case"em":{n+=r.em(a);break}case"codespan":{n+=r.codespan(a);break}case"br":{n+=r.br(a);break}case"del":{n+=r.del(a);break}case"text":{n+=r.text(a);break}default:{let c='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(c),"";throw new Error(c)}}}return n}},Wn,cn=(Wn=class{constructor(e){tt(this,"options");tt(this,"block");this.options=e||Tr}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?jt.lex:jt.lexInline}provideParser(){return this.block?zt.parse:zt.parseInline}},tt(Wn,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),tt(Wn,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),Wn),Yu=class{constructor(...e){tt(this,"defaults",Js());tt(this,"options",this.setOptions);tt(this,"parse",this.parseMarkdown(!0));tt(this,"parseInline",this.parseMarkdown(!1));tt(this,"Parser",zt);tt(this,"Renderer",Vn);tt(this,"TextRenderer",io);tt(this,"Lexer",jt);tt(this,"Tokenizer",Yn);tt(this,"Hooks",cn);this.use(...e)}walkTokens(e,t){let r=[];for(let n of e)switch(r=r.concat(t.call(this,n)),n.type){case"table":{let s=n;for(let o of s.header)r=r.concat(this.walkTokens(o.tokens,t));for(let o of s.rows)for(let a of o)r=r.concat(this.walkTokens(a.tokens,t));break}case"list":{let s=n;r=r.concat(this.walkTokens(s.items,t));break}default:{let s=n;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let a=s[o].flat(1/0);r=r.concat(this.walkTokens(a,t))}):s.tokens&&(r=r.concat(this.walkTokens(s.tokens,t)))}}return r}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(r=>{let n={...r};if(n.async=this.defaults.async||n.async||!1,r.extensions&&(r.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=t.renderers[s.name];o?t.renderers[s.name]=function(...a){let c=s.renderer.apply(this,a);return c===!1&&(c=o.apply(this,a)),c}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=t[s.level];o?o.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),n.extensions=t),r.renderer){let s=this.defaults.renderer||new Vn(this.defaults);for(let o in r.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let a=o,c=r.renderer[a],l=s[a];s[a]=(...u)=>{let f=c.apply(s,u);return f===!1&&(f=l.apply(s,u)),f||""}}n.renderer=s}if(r.tokenizer){let s=this.defaults.tokenizer||new Yn(this.defaults);for(let o in r.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let a=o,c=r.tokenizer[a],l=s[a];s[a]=(...u)=>{let f=c.apply(s,u);return f===!1&&(f=l.apply(s,u)),f}}n.tokenizer=s}if(r.hooks){let s=this.defaults.hooks||new cn;for(let o in r.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let a=o,c=r.hooks[a],l=s[a];cn.passThroughHooks.has(o)?s[a]=u=>{if(this.defaults.async&&cn.passThroughHooksRespectAsync.has(o))return(async()=>{let g=await c.call(s,u);return l.call(s,g)})();let f=c.call(s,u);return l.call(s,f)}:s[a]=(...u)=>{if(this.defaults.async)return(async()=>{let g=await c.apply(s,u);return g===!1&&(g=await l.apply(s,u)),g})();let f=c.apply(s,u);return f===!1&&(f=l.apply(s,u)),f}}n.hooks=s}if(r.walkTokens){let s=this.defaults.walkTokens,o=r.walkTokens;n.walkTokens=function(a){let c=[];return c.push(o.call(this,a)),s&&(c=c.concat(s.call(this,a))),c}}this.defaults={...this.defaults,...n}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return jt.lex(e,t??this.defaults)}parser(e,t){return zt.parse(e,t??this.defaults)}parseMarkdown(e){return(t,r)=>{let n={...r},s={...this.defaults,...n},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&n.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=e),s.async)return(async()=>{let a=s.hooks?await s.hooks.preprocess(t):t,c=await(s.hooks?await s.hooks.provideLexer():e?jt.lex:jt.lexInline)(a,s),l=s.hooks?await s.hooks.processAllTokens(c):c;s.walkTokens&&await Promise.all(this.walkTokens(l,s.walkTokens));let u=await(s.hooks?await s.hooks.provideParser():e?zt.parse:zt.parseInline)(l,s);return s.hooks?await s.hooks.postprocess(u):u})().catch(o);try{s.hooks&&(t=s.hooks.preprocess(t));let a=(s.hooks?s.hooks.provideLexer():e?jt.lex:jt.lexInline)(t,s);s.hooks&&(a=s.hooks.processAllTokens(a)),s.walkTokens&&this.walkTokens(a,s.walkTokens);let c=(s.hooks?s.hooks.provideParser():e?zt.parse:zt.parseInline)(a,s);return s.hooks&&(c=s.hooks.postprocess(c)),c}catch(a){return o(a)}}}onError(e,t){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let n="<p>An error occurred:</p><pre>"+er(r.message+"",!0)+"</pre>";return t?Promise.resolve(n):n}if(t)return Promise.reject(r);throw r}}},Ar=new Yu;function Qe(e,t){return Ar.parse(e,t)}Qe.options=Qe.setOptions=function(e){return Ar.setOptions(e),Qe.defaults=Ar.defaults,Ri(Qe.defaults),Qe};Qe.getDefaults=Js;Qe.defaults=Tr;Qe.use=function(...e){return Ar.use(...e),Qe.defaults=Ar.defaults,Ri(Qe.defaults),Qe};Qe.walkTokens=function(e,t){return Ar.walkTokens(e,t)};Qe.parseInline=Ar.parseInline;Qe.Parser=zt;Qe.parser=zt.parse;Qe.Renderer=Vn;Qe.TextRenderer=io;Qe.Lexer=jt;Qe.lexer=jt.lex;Qe.Tokenizer=Yn;Qe.Hooks=cn;Qe.parse=Qe;var Fm=Qe.options,qm=Qe.setOptions,Bm=Qe.use,Um=Qe.walkTokens,jm=Qe.parseInline;var zm=zt.parse,Hm=jt.lex;function ur(e){let t=Qe.parse(e),r=vi.sanitize(t);return $i(r)}function tr(e,t){return i`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function Ur(e){return e.loading?i`<div class="prompt-block__status">불러오는 중…</div>`:e.error?i`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function Xn(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=n=>String(n).padStart(2,"0");return`${t.getFullYear()}-${r(t.getMonth()+1)}-${r(t.getDate())} ${r(t.getHours())}:${r(t.getMinutes())}`}var Vu={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},Ku=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,Zu=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function pr(e){return!!e&&typeof e=="object"}function lo(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function Ui(e,t){let r=lo(e),n=lo(t),s=new Map;for(let c of r)s.set(c,(s.get(c)||0)+1);let o=0;for(let c of n){let l=s.get(c)||0;l>0?s.set(c,l-1):o+=1}let a=0;for(let c of s.values())a+=c;return{added:o,removed:a}}function Xu(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(s=>pr(s)&&typeof s.text=="string"?s.text:"").join(""):pr(e)&&typeof e.text=="string"&&(t=e.text);let n=(String(t).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return n.length>120?`${n.slice(0,117)}\u2026`:n}function Qu(e){let t=String(e.name||""),r=e.input||{},n={kind:"tool",tool:t,icon:Vu[t]||"\u{1F527}",input:r,expandable:!0};if((t==="Read"||t==="Write")&&(n.path=String(r.file_path||r.path||"")),t==="Write"&&(n.added=lo(r.content).length),t==="Edit"){n.path=String(r.file_path||r.path||"");let{added:s,removed:o}=Ui(r.old_string,r.new_string);n.added=s,n.removed=o}if(t==="MultiEdit"){n.path=String(r.file_path||r.path||"");let s=0,o=0,a=Array.isArray(r.edits)?r.edits:[];for(let c of a){let l=Ui(pr(c)?c.old_string:"",pr(c)?c.new_string:"");s+=l.added,o+=l.removed}n.added=s,n.removed=o}return t==="Bash"&&(n.command=String(r.command||"")),(t==="Grep"||t==="Glob")&&(n.command=String(r.pattern||r.query||"")),n}function ji(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}function zi(e){let t=e.split(/\r?\n/).find(n=>n.trim().length>0)||"",r=Ku.exec(t);return r?{kind:"gate",gate:r[2]==="implementation"?"impl":r[2],reviewer:r[3],verdict:r[4],time:r[5]?r[5].trim():void 0,text:t.trim()}:Zu.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function Ju(e,t){if(e.type==="assistant"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[],s=[];for(let o of n)if(pr(o)){if(o.type==="text"&&typeof o.text=="string")s.push(zi(o.text));else if(o.type==="thinking"){let a=ji(o.thinking);a&&s.push(a)}else if(o.type==="tool_use"){let a=Qu(o);typeof o.id=="string"&&t.set(o.id,a),s.push(a)}}return s}if(e.type==="user"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[];for(let s of n)if(pr(s)&&s.type==="tool_result"){let o=t.get(String(s.tool_use_id));if(o){let a=Xu(s.content);o.result=a,o.output=typeof s.content=="string"?s.content:a}}return[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success";return[{kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""}]}return[]}function ep(e){if(e.type==="item.completed"&&pr(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[zi(t.text)];if(t.type==="reasoning"){let r=ji(t.text);return r?[r]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function tp(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function Hi(e){let t=[],r=new Map,n=Array.isArray(e)?e:[];for(let s of n){let o=s;if(typeof s=="string"){let c=s.trim();if(c.length===0)continue;try{o=JSON.parse(c)}catch{continue}}if(!pr(o))continue;let a=tp(o)?ep(o):Ju(o,r);for(let c of a)t.push(c)}return t}var rp=5,np=10,sp=/Task\s+#(\d+)/,op=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,ap=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function Qn(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function ip(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function lp(e){for(let t=e.length-1;t>=0;t-=1){let r=e[t];if(r.kind==="phase"||r.kind==="gate")return r.text||null}return null}function cp(e){let t=new Map,r=0;for(let s of e){if(s.kind!=="tool")continue;r+=1;let o=s.input||{};if(s.tool==="TaskCreate"){let l=sp.exec(s.output||s.result||""),u=String(o.activeForm||o.subject||"").trim();if(!l||u.length===0)continue;t.set(l[1],{label:u,active:o.status==="in_progress"?r:0});continue}if(s.tool!=="TaskUpdate")continue;let a=t.get(String(o.taskId??""));if(!a)continue;let c=o.activeForm||o.subject;typeof c=="string"&&c.trim().length>0&&(a.label=c.trim()),typeof o.status=="string"&&(a.active=o.status==="in_progress"?r:0)}let n=null;for(let s of t.values())s.active>0&&(!n||s.active>n.active)&&(n=s);return n?n.label:null}function dp(e){if(e.tool==="Bash"){let t=e.command||"";return op.test(t)?"~ PR/\uAC8C\uC2DC \uC911":ap.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function up(e){let t=e.filter(s=>s.kind==="tool").slice(-np),r=new Map;t.forEach((s,o)=>{let a=dp(s);if(!a)return;let c=r.get(a)||{count:0,last:-1};c.count+=1,c.last=o,r.set(a,c)});let n=null;for(let[s,o]of r)(!n||o.count>n.count||o.count===n.count&&o.last>n.last)&&(n={label:s,count:o.count,last:o.last});return n?n.label:null}function pp(e){let t=lp(e);if(t)return{text:t,guess:!1};let r=cp(e);if(r)return{text:r,guess:!1};let n=up(e);return n?{text:n,guess:!0}:null}function fp(e,t){if(typeof e!="number")return"";let r=Math.max(0,Math.floor((t-e)/1e3));return r<60?`${r}\uCD08 \uC804`:It(e,t)}function Jn(e,t={}){let{transport:r,sessionLogStore:n,onClose:s}=t,o=null,a={},c=!0,l=new Set,u=new Set,f=null,g=null,h=!1,x=!1,$=!1,T=null,W=null;function k(){h=!1,x=!1,$=!1,T=null,W=null}async function J(R){if(r){x=!0,$=!1,be();try{let j=await Promise.resolve(r("get-attempt-prompt",{attempt_id:R}));if(o!==R)return;!j||typeof j!="object"||Array.isArray(j)?$=!0:(T=j,W=R)}catch{o===R&&($=!0)}finally{o===R&&(x=!1,be())}}}function se(){if(h=!h,h&&o&&W!==o){J(o);return}be()}function D(){if(!h)return"";let R=Ur({loading:x,error:$});if(R)return i`<div class="sv__prompt" data-seam="attempt-prompt">
        ${R}
      </div>`;if(!T)return"";if(T.missing)return i`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let j=Xn(T.recorded_at);return i`<div class="sv__prompt" data-seam="attempt-prompt">
      ${j?i`<div class="prompt-block__meta">${j} 발송</div>`:""}
      ${typeof T.task_prompt=="string"?tr("\uACFC\uC5C5 (user)",T.task_prompt):""}
      ${typeof T.system_prompt=="string"?tr("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",T.system_prompt):""}
    </div>`}function F(){if(!o||!n)return[];let R=n.get(o);return Hi(R?R.lines:[])}function S(){if(!o||!n)return null;let R=n.get(o),j=R?R.last_event_at:null;return typeof j=="number"?j:null}function H(){return a.status==="running"}function M(){if(H()&&o){g||(g=setInterval(()=>be(),1e3));return}fe()}function fe(){g&&(clearInterval(g),g=null)}function Ce(R){let j=[],ue=0;for(;ue<R.length;){let me=R[ue];if(me.kind==="tool"){let Te=ue;for(;Te<R.length&&R[Te].kind==="tool"&&R[Te].tool===me.tool;)Te+=1;if(Te-ue>=rp&&!u.has(ue)){j.push({kind:"group",idx:ue,tool:me.tool||"",lines:R.slice(ue,Te).map((we,xe)=>({idx:ue+xe,line:we}))}),ue=Te;continue}}j.push({kind:"line",idx:ue,line:me}),ue+=1}return j}function ce(R){for(let j=R.length-1;j>=0;j-=1){let ue=R[j];if(ue.kind==="result"||ue.kind==="error")return null;if(ue.kind==="tool"&&!Object.hasOwn(ue,"result"))return ue}return null}function he(R){for(let j=R.length-1;j>=0;j-=1)if(R[j].kind==="thinking")return R[j];return null}function Se(R,j){if(j.kind==="gate")return i`<div class="sv__gate">${j.text}</div>`;if(j.kind==="phase")return i`<div class="sv__phase">${j.text}</div>`;if(j.kind==="result")return i`<div
        class="sv__result${j.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${j.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${ur(j.text||(j.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(j.kind==="thinking"){let ue=l.has(R);return i`<div
        class="sv__think${ue?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>ve(R)}
      >
        <span class="sv__think-line">💭 ${Qn(j.text)}</span>
        ${ue?i`<pre class="sv__think-expand">${j.text}</pre>`:""}
      </div>`}if(j.kind==="error")return i`<div class="sv__error">⛔ ${j.text}</div>`;if(j.kind==="blocker")return i`<div class="sv__error">⛔ ${j.text}</div>`;if(j.kind==="tool"){let ue=l.has(R),me=j.tool==="Bash"?ip(j.command):0,Te=j.tool==="Bash"?me>1?Qn(j.command):j.command:j.path||j.command||"";return i`<div
        class="sv__tool${ue?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>ve(R)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${j.icon}</span>
          <span class="sv__tool-name">${j.tool}</span>
          ${Te?i`<span class="sv__tool-detail">${Te}</span>`:""}
          ${me>1?i`<span class="sv__tool-more">⋯ ${me}줄</span>`:""}
          ${typeof j.added=="number"?i`<span class="sv__diff-add">+${j.added}</span>`:""}
          ${typeof j.removed=="number"?i`<span class="sv__diff-del">−${j.removed}</span>`:""}
          ${j.result?i`<span class="sv__tool-ok">→ ${j.result}</span>`:""}
        </span>
        ${ue?i`<pre class="sv__tool-expand">${Re(j)}</pre>`:""}
      </div>`}return i`<div class="sv__as">${ur(j.text||"")}</div>`}function Re(R){let j=[];if(R.tool==="Bash"&&typeof R.command=="string"&&R.command.length>0)j.push(R.command);else if(R.input!==void 0)try{j.push(`input: ${JSON.stringify(R.input,null,2)}`)}catch{}return typeof R.output=="string"&&R.output.length>0&&j.push(`output:
${R.output}`),j.join(`

`)}function Ve(){if(!o)return i``;let R=F(),j=[a.runner,a.model,a.effort].filter(Boolean).join(" \xB7 "),ue=a.session_id||"",me=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${c?"ON":"OFF"}`,Te=H(),we=Te?fp(S(),Date.now()):"",xe=Te?ce(R):null,Ue=Te?he(R):null,je=pp(R);return i`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id">${o}</span>
        ${je?i`<span
              class="sv__stage${je.guess?" sv__stage--guess":""}"
              title=${je.text}
              >${je.text}</span
            >`:""}
        ${Te?i`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${we?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${we}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${we?i`<span class="sv__live-ago">${we}</span>`:""}</span
            >`:""}
        ${ue?i`<button
              type="button"
              class="sv__session"
              title=${ue}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${ue}`}
              @click=${()=>A(ue)}
            >
              ⧉ ${ue.slice(0,8)}
            </button>`:""}
        ${j?i`<span class="sv__meta">${j}</span>`:""}
        ${a.worktree?i`<span class="sv__wt" title=${a.worktree}
              >${a.worktree}</span
            >`:""}
        <button
          type="button"
          class="sv__prompt-toggle${h?" sv__prompt-toggle--on":""}"
          data-seam="attempt-prompt-toggle"
          aria-pressed=${h?"true":"false"}
          aria-label="발송 프롬프트 보기"
          title="이 세션에 실제로 보낸 시스템·과업 프롬프트"
          @click=${se}
        >
          ✉ 프롬프트
        </button>
        <button
          type="button"
          class="sv__follow${c?" sv__follow--on":""}"
          aria-pressed=${c?"true":"false"}
          aria-label=${me}
          @click=${N}
        >
          <span class="sv__follow-full">⇣ ${me}</span>
          <span class="sv__follow-short">⇣ ${c?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>Q()}
        >
          ✕
        </button>
      </div>
      ${D()}
      <div class="sv__body">
        ${R.length===0?i`<div class="sv__empty">세션 로그 없음</div>`:Ce(R).map(rt=>rt.kind==="group"?Oe(rt):Se(rt.idx,rt.line))}
      </div>
      ${xe||Ue?i`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${xe?i`<span class="sv__now-icon">${xe.icon}</span>
                  <span class="sv__now-name">${xe.tool}</span>
                  <span class="sv__now-detail"
                    >${xe.tool==="Bash"?Qn(xe.command):xe.path||xe.command||""}</span
                  >`:""}
            ${Ue?i`<span class="sv__now-think"
                  >💭 ${Qn(Ue.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function Oe(R){return i`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>Ae(R.idx)}
    >
      <span class="sv__group-icon">${R.lines[0].line.icon}</span>
      <span class="sv__group-name">${R.tool}</span>
      <span class="sv__group-count">${R.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function Ae(R){u.add(R),be()}function be(){Pe(Ve(),e),M(),c&&_e()}function _e(){let R=e.querySelector(".sv__body");R&&(R.scrollTop=R.scrollHeight)}function ve(R){l.has(R)?l.delete(R):l.add(R),be()}function N(){c=!c,be()}function A(R){Sr(R).then(j=>{j?re("\uBCF5\uC0AC\uB428","success",1200):re("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function I(R){!o||!R||(a={...a,...R},be())}function te(R){let j=R.target;if(!j||!j.classList||!j.classList.contains("sv__body"))return;!(j.scrollHeight-j.scrollTop-j.clientHeight<=4)&&c&&(c=!1,be())}e.addEventListener("scroll",te,!0);function V(R){let j=R&&R.attempt_id;j&&(o=j,a=R.meta||{},c=!0,l.clear(),u.clear(),k(),!f&&n&&(f=n.subscribe(be)),r&&Promise.resolve(r("subscribe-session-log",{id:`session-log:${o}`,attempt_id:o})).catch(()=>{}),be())}function Q(){let R=o;o=null,l.clear(),u.clear(),k(),fe(),r&&R&&Promise.resolve(r("unsubscribe-session-log",{id:`session-log:${R}`})).catch(()=>{}),Pe(i``,e),s&&s()}return{open:V,updateMeta:I,close:Q,isOpen(){return o!==null},destroy(){fe(),f&&(f(),f=null),e.removeEventListener("scroll",te,!0),o=null,Pe(i``,e)}}}function pn(e){let t=e&&typeof e=="object"?e:{},r=t.metadata&&typeof t.metadata=="object"?t.metadata:{},n=Wi(t.spec_id),s=Wi(r.spec_id);return n?{path:n,source:"native",conflict:s.length>0&&s!==n}:s?{path:s,source:"metadata",conflict:!1}:{path:"",source:"none",conflict:!1}}function Wi(e){return typeof e=="string"?e.trim():""}function _p(e){return["plan_review","plan_approval","plan_check"].some(t=>{let r=e[t];return typeof r=="string"&&r.trim().length>0})}function mp(e){let t=e&&e.metadata||{},r=pn(e),n=[];return r.path&&n.push({kind:"spec",path:r.path,missing_state:null}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&n.push({kind:"plan",path:t.plan_path.trim(),missing_state:_p(t)?null:"plan_pending"}),n}function Gi(e,t){let r=mp(e);return i`
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
  `}var gp="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",bp=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,hp=/^\*\*결론\*\* — (.+)$/;function es(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==gp)return null;let r=bp.exec(t[1]||"");if(!r)return null;let n=r[1].split(" ")[0],s=r[2],o=r[3],a=2;for(;a<t.length&&t[a].trim().length===0;)a+=1;let c=a<t.length?hp.exec(t[a]):null,l=c?c[1].replace(/\s+/g," ").trim():"",u=c?a+1:a;return{lane:n,identifier:s,timestamp:o,conclusion:l,body:t.slice(u).join(`
`).trim()}}var Yi=20;function Vi(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let r=String(t.getMonth()+1).padStart(2,"0"),n=String(t.getDate()).padStart(2,"0"),s=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0");return`${r}-${n} ${s}:${o}`}function yp(e){return e.length>Yi?`${e.slice(0,Yi)}\u2026`:e}function vp(e,t,r,n){let s=`${t.lane} ${yp(t.identifier)}`;return i`<div class="detail-report">
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
        <span class="detail-report__time">${Vi(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${n&&t.body.length>0?i`<div class="detail-report__body">
          ${ur(t.body)}
        </div>`:""}
  </div>`}function wp(e){return i`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${Vi(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${ur(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function Ki(e,t={},r={}){let n=Array.isArray(e)?e.filter(Boolean):[],s=r.expanded||new Set,o=typeof r.draft=="string"?r.draft:"",a=r.sending===!0,c=n.slice().sort((l,u)=>String(u.created_at||"").localeCompare(String(l.created_at||"")));return i`
    <div class="detail-section-label">댓글 (${n.length})</div>
    ${r.error?i`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:c.length===0?i`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:i`<div class="detail-comments" data-seam="comments">
            ${c.map(l=>{let u=es(typeof l.text=="string"?l.text:"");return u?vp(l,u,t,s.has(l.id)):wp(l)})}
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
  `}var kp=["codex","opus","fable","self","skip"],$p=["codex","fable","skip"],xp=["low","medium","high","xhigh"],Sp=["standard","fast_track"],Er=["orchestration_model","orchestration_effort","orchestration_speed","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_runtime","impl_model","impl_effort"],uo=["impl_runtime","orchestration_model"],fn=[{id:"worker-detail",label:"\uC6CC\uCEE4 \uC0C1\uC138",keys:["orchestration_effort","orchestration_speed"]},{id:"implementation-detail",label:"\uAD6C\uD604 \uC0C1\uC138",keys:["impl_model","impl_effort"]},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort"]}],po={orchestration_model:{title:"\uC6CC\uCEE4 \uC2E4\uD589 \uBAA8\uB378"},orchestration_effort:{title:"\uC6CC\uCEE4 reasoning effort"},orchestration_speed:{title:"\uC6CC\uCEE4 \uC2E4\uD589 \uC18D\uB3C4",help:"Fast\uB294 \uC9C0\uC6D0 \uBAA8\uB378\uC744 \uB354 \uBE60\uB974\uAC8C \uC2E4\uD589\uD558\uBA70 \uC0AC\uC6A9\uB7C9 \uBE44\uC6A9\uC774 \uC99D\uAC00\uD569\uB2C8\uB2E4."},spec_review_model:{title:"\uC2A4\uD399 \uB9AC\uBDF0\uC5B4"},spec_review_effort:{title:"\uC2A4\uD399 \uB9AC\uBDF0 reasoning effort"},plan_review_model:{title:"\uACC4\uD68D \uB9AC\uBDF0\uC5B4"},plan_review_effort:{title:"\uACC4\uD68D \uB9AC\uBDF0 reasoning effort"},impl_review_model:{title:"\uAD6C\uD604 \uB9AC\uBDF0\uC5B4"},impl_review_effort:{title:"\uAD6C\uD604 \uB9AC\uBDF0 reasoning effort"},impl_runtime:{title:"\uAD6C\uD604 runtime"},impl_model:{title:"\uAD6C\uD604 \uBAA8\uB378",help:"\uC6CC\uD06C\uD50C\uB85C\uAC00 \uBCF5\uC7A1 \uAD6C\uD604\uC778\uC9C0, \uBC94\uC704\uAC00 \uD55C\uC815\uB41C \uAD6C\uD604\uC778\uC9C0 \uD310\uB2E8\uD574 \uD604\uC7AC runtime\uC758 \uAD6C\uD604\uC6A9 \uBAA8\uB378\uC744 \uC120\uD0DD\uD569\uB2C8\uB2E4."},impl_effort:{title:"\uAD6C\uD604 reasoning effort",help:"\uC790\uB3D9 \uC120\uD0DD\uC774\uBA74 workflow tier\uC5D0 \uC120\uC5B8\uB41C effort\uB97C, \uBAA8\uB378\uB9CC \uC9C1\uC811 \uC9C0\uC815\uD588\uC73C\uBA74 \uD574\uB2F9 \uD558\uC704 \uC5D0\uC774\uC804\uD2B8 \uD638\uCD9C\uC758 \uAE30\uBCF8 effort\uB97C \uC0AC\uC6A9\uD569\uB2C8\uB2E4."},workflow_mode:{title:"\uC6CC\uD06C\uD50C\uB85C \uBAA8\uB4DC"}},Zi={spec_review_effort:"spec_review_model",impl_review_effort:"impl_review_model",plan_review_effort:"plan_review_model"},Ap=["self","skip"],Tp="opus",fo={orchestration_model:"(\uAE30\uBCF8: opus)",orchestration_effort:"(\uAE30\uBCF8: CLI \uAE30\uBCF8)",orchestration_speed:"(\uAE30\uBCF8: Standard)",spec_review_model:"(\uAE30\uBCF8: codex)",spec_review_effort:"(\uAE30\uBCF8: \uD504\uB9AC\uC14B)",impl_review_model:"(\uAE30\uBCF8: codex)",impl_review_effort:"(\uAE30\uBCF8: \uD504\uB9AC\uC14B)",impl_runtime:"(\uAE30\uBCF8: orchestration runtime \uC0C1\uC18D)",plan_review_model:"(\uAE30\uBCF8: codex)",plan_review_effort:"(\uAE30\uBCF8: \uD504\uB9AC\uC14B)",impl_model:"(\uAE30\uBCF8: \uC791\uC5C5 \uC131\uACA9\uC5D0 \uB530\uB77C \uAD6C\uD604 \uBAA8\uB378 \uC790\uB3D9 \uC120\uD0DD)",impl_effort:"(\uAE30\uBCF8: \uC120\uD0DD\uB41C \uAD6C\uD604 \uC5D0\uC774\uC804\uD2B8\uC758 reasoning effort \uC0AC\uC6A9)"};function _o(e){let t=po[e]||{title:e};return i`<span data-exec-setting-label>
    <span data-exec-setting-title>${t.title}</span>
    <code data-exec-setting-key>${e}</code>
    ${t.help?i`<small data-exec-setting-help=${e}>${t.help}</small>`:""}
  </span>`}function Ep(e,t,r=""){let n=t&&t[e];return typeof n=="string"&&n.length>0?`(\uAE30\uBCF8: ${e==="orchestration_speed"?n==="default"?"Standard":n==="fast"?"Fast":n:n} \u2014 ${r||"\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4 \uD504\uB9AC\uC14B"})`:fo[e]||"(\uAE30\uBCF8)"}function jr(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Cr(e){if(!jr(e)||!jr(e.runners))return null;let t=Object.entries(e.runners).filter(([,r])=>jr(r)&&jr(r.models));return t.length>0?t:null}function co(e){return{value:e,label:e}}function mo(e){return{label:null,options:[{value:e,label:`${e} (\uBE44\uD638\uD658)`}]}}function Xi(e,t,r=null){let n=Cr(e);if(!n)return t?[{label:null,options:[co(t)]}]:[];let s=n.filter(([a])=>r===null||a===r).map(([a,c])=>({label:a,options:Object.keys(c.models).map(co)})),o=s.some(a=>a.options.some(c=>c.value===t));return t&&!o?[mo(t),...s]:s}function fr(e,t){let r={label:null,options:e.map(co)};return t&&!e.includes(t)?[mo(t),r]:[r]}function rr(e,t){let r=Cr(e);if(!r||!t)return null;for(let[n,s]of r)if(Object.hasOwn(s.models,t))return n;return null}function go(e,t){return jr(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function Cp(e,t){return jr(t)&&Array.isArray(t.orchestration_efforts)?t.orchestration_efforts.slice():go(e,t)}function Rp(e,t){let r=Cr(e);if(!r||!t)return[];for(let[,n]of r)if(Object.hasOwn(n.models,t))return Cp(n,n.models[t]);return[]}function Ip(e,t){let r=Cr(e);if(!r||!t)return[];for(let[,n]of r){if(!Object.hasOwn(n.models,t))continue;let s=n.models[t];return Array.isArray(s.speed_tiers)?s.speed_tiers.slice():["default"]}return[]}function bo(e,t){let r=Cr(e);if(!r||!t)return[];for(let[,n]of r)if(Object.hasOwn(n.models,t))return go(n,n.models[t]);return[]}function el(e){let t=Cr(e);if(!t)return[];let r=[];for(let[,n]of t)for(let s of Object.values(n.models))for(let o of go(n,s))r.includes(o)||r.push(o);return r}function tl(e,t){if(!t)return el(e);let n=Cr(e)?.find(([o])=>o===t)?.[1];if(!n)return[];let s=[];for(let o of Object.keys(n.models))for(let a of bo(e,o))s.includes(a)||s.push(a);return s}function rs(e,t,r){let n={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},s=n.impl_runtime==="inherit"?r:n.impl_runtime==="claude"||n.impl_runtime==="codex"?n.impl_runtime:null;if(n.impl_runtime==="inherit"&&!s)return n.impl_model="",n.impl_effort="",n;let o=rr(t,n.impl_model);if(n.impl_model&&(!s||o!==s))return n.impl_model="",n.impl_effort="",n;let a=n.impl_model?bo(t,n.impl_model):tl(t,s);return n.impl_effort&&a.length>0&&!a.includes(n.impl_effort)&&(n.impl_effort=""),n}function zr(e){let{selectedOf:t,effectiveOf:r,runner_catalog:n,controller_runtime:s}=e,o=r("orchestration_model")||Tp,a=r("impl_model"),c=r("impl_runtime"),l=c==="claude"||c==="codex"?c:c==="inherit"?s===void 0?rr(n,o):s:null;return Er.map(u=>{let f=t(u),g,h=!1;return u==="orchestration_model"?g=Xi(n,f):u==="impl_runtime"?g=fr(["inherit","claude","codex"],f):u==="impl_model"?(g=l?Xi(n,f,l):f?[mo(f)]:[],h=c==="inherit"&&l===null):u==="orchestration_effort"?g=fr(Rp(n,o),f):u==="orchestration_speed"?g=Lp(Ip(n,o),f):u==="impl_effort"?(g=fr(a?bo(n,a):l?tl(n,l):el(n),f),h=c==="inherit"&&l===null):u==="plan_review_model"?g=fr($p,f):Object.hasOwn(Zi,u)?(g=fr(xp,f),h=Ap.includes(r(Zi[u]))):g=fr(kp,f),{key:u,groups:g,selected:f,disabled:h,runner:u==="orchestration_model"?rr(n,o):null}})}function ts(e,t,r){return i`
    ${typeof r=="string"?i`<option value="" ?selected=${!t}>${r}</option>`:""}
    ${e.map(n=>n.label===null?n.options.map(s=>Qi(s,t)):i`<optgroup label=${n.label}>
            ${n.options.map(s=>Qi(s,t))}
          </optgroup>`)}
  `}function Lp(e,t){return fr(e,t).map(r=>({...r,options:r.options.map(n=>{let s=n.label.endsWith("(\uBE44\uD638\uD658)"),o=n.value==="default"?"Standard":n.value==="fast"?"Fast":null;return{...n,label:s?o?`${o} (\uBE44\uD638\uD658)`:n.label:o||n.label}})}))}function Qi(e,t){return i`<option value=${e.value} ?selected=${e.value===t}>
    ${e.label}
  </option>`}function Ji(e,t,r,n,s,o,a){return i`
    <div class="detail-kv">
      <span class="detail-kv__k">${_o(e)}</span>
      <span class="detail-kv__vgroup">
        <select
          class=${n?"detail-kv__v detail-kv__v--sel":"detail-kv__v"}
          aria-label=${e}
          data-key=${e}
          ?disabled=${s}
          @change=${c=>(e==="impl_runtime"||e==="impl_model"||e==="impl_effort")&&a.onImplTargetChange?a.onImplTargetChange(e,c.target.value):a.onChange(e,c.target.value)}
        >
          ${t}
        </select>
        ${o?i`<span class="detail-kv__note" data-runner-for=${e}
              >${o}</span
            >`:""}
      </span>
    </div>
  `}function Op(e,t,r,n){return e.some(s=>t(s))?"\uC774\uC288 \uD540":e.some(s=>r(s))?`\uD504\uB9AC\uC14B \u300C${n||"\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4 \uD504\uB9AC\uC14B"}\u300D`:"\uAE30\uBCF8"}function Dp(e,t,r){let n=[t("orchestration_model")||"opus"],s=t("orchestration_effort"),o=t("orchestration_speed");s&&n.push(`effort ${s}`),o&&o!=="default"&&n.push(`speed ${o==="fast"?"Fast":o}`);let a=`${t("impl_runtime")||"inherit"} \xB7 ${t("impl_model")||"auto"}`,c=[["\uC2A4\uD399","spec_review_model","spec_review_effort"],["\uACC4\uD68D","plan_review_model","plan_review_effort"],["\uAD6C\uD604","impl_review_model","impl_review_effort"]].map(([u,f,g])=>{let h=t(f)||"codex",x=t(g);return`${u} ${h}${x?`/${x}`:""}`}),l=[{id:"worker",label:"\uC6CC\uCEE4",keys:Er.slice(0,3),value:n.join(" \xB7 ")},{id:"implementation",label:"\uAD6C\uD604",keys:["impl_runtime","impl_model","impl_effort"],value:a},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort"],value:c.join(" \xB7 ")}];return i`<section
    class="detail-exec-presets exec-settings-summary"
    data-exec-settings-summary
  >
    ${l.map(u=>i`<div
          class="workflow-summary__row exec-settings-summary__row"
          data-exec-summary=${u.id}
        >
          <span class="workflow-summary__label">${u.label}</span>
          <span class="detail-kv__vgroup">
            <span class="workflow-summary__value">${u.value}</span>
            <span class="detail-kv__v" data-exec-source
              >${Op(u.keys,e,t,r)}</span
            >
          </span>
        </div>`)}
  </section>`}function rl(e,t,r,n,s=""){let o=e&&e.metadata||{},a=r&&typeof r=="object"?r:{},c=$=>typeof o[$]=="string"?o[$]:"",l=$=>{let T=c($);return T||(typeof a[$]=="string"?a[$]:"")},u=zr({selectedOf:c,effectiveOf:l,runner_catalog:n}),f=o.workflow_mode==="fast_track"?"fast_track":"standard",g=new Map(u.map($=>[$.key,$])),h=fn.flatMap($=>$.keys).filter($=>c($)).length,x=$=>{let T=g.get($);return T?Ji(T.key,ts(T.groups,T.selected,Ep(T.key,a,s)),T.selected,!!T.selected,T.disabled,T.runner,t):""};return i`
    <div class="detail-section-label">실행 설정 (수정 가능)</div>
    ${Dp(c,l,s)}
    <section class="exec-settings-core" data-exec-settings-core>
      ${Ji("workflow_mode",ts(fr(Sp,f),f),f,o.workflow_mode==="fast_track",!1,null,t)}
      ${uo.map(x)}
    </section>
    <details
      class="detail-exec-presets exec-settings-advanced"
      data-exec-settings-advanced
    >
      <summary>고급 설정 — ${h}개 변경됨</summary>
      ${fn.map($=>i`<section
            class="exec-settings-advanced__group"
            data-exec-settings-group=${$.id}
          >
            <h4>${$.label}</h4>
            ${$.keys.map(x)}
          </section>`)}
    </details>
  `}function Mp(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function nl(e,t){let r=t.getWorkspacePath,n=t.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",a="",c="";function l($){$.key==="Escape"&&s&&($.preventDefault(),h())}document.addEventListener("keydown",l);function u(){return s?i`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>h()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${Mp(s)}</span
            >
            <button
              type="button"
              class="mv__close"
              aria-label="닫기"
              @click=${()=>h()}
            >
              ✕
            </button>
          </div>
          <div class="mv__body">
            ${o==="loading"?i`<div class="mv__status">불러오는 중…</div>`:o==="pending"?i`<div class="mv__status">${c}</div>`:o==="error"?i`<div class="mv__status mv__status--error">
                      ${c||"\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}
                    </div>`:ur(a)}
          </div>
        </div>
      </div>
    `:i``}function f(){Pe(u(),e)}async function g($,T={}){s=$,o="loading",a="",c="",f();let W=r?r():"";if(!W){o="error",c="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",f();return}if(!n){o="error",c="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",f();return}let k="/api/doc?workspace="+encodeURIComponent(W)+"&path="+encodeURIComponent($);try{let J=await n(k),se=await J.json().catch(()=>({}));if(!J.ok||!se||se.ok!==!0){if(se?.error==="not_found"&&T.missing_state==="plan_pending"){o="pending",c="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",f();return}o="error",c="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(se&&se.error||J.status)+")",f();return}a=String(se.content||""),o="ready",f()}catch{o="error",c="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",f()}}function h(){s=null,Pe(i``,e)}function x(){document.removeEventListener("keydown",l),h()}return{open:g,close:h,destroy:x}}var Np=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],al="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function Pp(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function Fp(e){let t=vt(e);if(t.length>0)return t.map(s=>i`<span class="detail-usage-total" title=${s.tooltip}
          >${s.label}</span
        >`);let r=qr(e);if(!r||!e)return"";let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return i`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${r.replace(/^τ /,"\u03C4 \uCD1D ")}${n}</span
    >${e.replayed?i`<span class="detail-usage-partial" title=${al}
          >부분 집계</span
        >`:""}`}function sl(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function ol(e){if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?il(t):""}function qp(e){return e?["implementation","review-consult"].flatMap(r=>{let n=e.roles[r]?.codex;return n?n.legs.map(s=>{let a=vt({providers:{codex:{subtotal:s.subtotal,breakdown:s.usage,...s.replayed?{replayed:!0}:{}}},roles:{}})[0];return i`<div class="detail-session__leg detail-session__usage-detail">
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
        ${ol(s.completed_at)?i`<span class="detail-session__leg-time detail-session__time"
              >${ol(s.completed_at)}</span
            >`:""}
        ${a?i`<span class="detail-session__usage" title=${a.tooltip}
              >${a.label}</span
            >`:""}
      </div>`}):[]}):""}function Bp(e,t){let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,n=[...Np,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return i`<div class="detail-session__usage-detail">
    ${n.map(s=>i`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${s.label}</span
          ><span class="detail-session__usage-value"
            >${Pp(e[s.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${r===null?"":i`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${r.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?i`<span class="detail-session__usage-note">${al}</span>`:""}
  </div>`}var Up={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function il(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=String(t.getHours()).padStart(2,"0"),n=String(t.getMinutes()).padStart(2,"0");return`${r}:${n}`}function jp(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,n])=>typeof n=="string"&&n.length>0).map(([n,s])=>`${n}=${s}`).join(" \xB7 "):"",r=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return i`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${r}</span>
    ${t?i`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}function ll(e,t={},r={}){let n=Array.isArray(e)?e:[],s=r.expanded||new Set;if(n.length===0)return i`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let o=new Set;for(let u of n)u&&typeof u.resumed_from=="string"&&u.resumed_from.length>0&&o.add(u.resumed_from);let a=u=>{if(!(u.status==="failed"||u.status==="orphaned"))return"";let g=typeof u.session_id=="string"&&u.session_id.length>0,h=o.has(u.attempt_id),x=g&&!h,$=g?h?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return i`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${u.attempt_id}
      ?disabled=${!x}
      title=${$}
      @click=${T=>{T.stopPropagation(),x&&t.onResume&&t.onResume(u.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},c=u=>{if(!(u.status==="failed"||u.status==="orphaned")||typeof u.cause!="string"||u.cause==="")return"";let g=u.cause_detail,h=g&&typeof g.reason=="string"&&g.reason.length>0?typeof g.command=="string"&&g.command.length>0?`${g.reason} \xB7 ${g.command}`:g.reason:u.cause;return i`<div class="detail-session__cause" title=${h}>
      ${u.cause}
    </div>`},l=u=>{let f=sl(Bs(u));if(vt(f).length===0&&!qr(u.usage))return"";let g=s.has(u.attempt_id);return i`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${u.attempt_id}
      aria-expanded=${g?"true":"false"}
      title=${g?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${h=>{h.stopPropagation(),t.onToggleUsage&&t.onToggleUsage(u.attempt_id)}}
    >
      τ 자세히
    </button>`};return i`
    <div class="detail-section-label">
      세션 이력${Fp(r.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${n.map(u=>{let f=Bs(u),g=sl(f),h=vt(g);return i`<div class="detail-session-row">
          <button
            type="button"
            class="detail-session detail-session--${u.status||"unknown"}"
            data-attempt-id=${u.attempt_id}
            @click=${()=>t.onOpen&&t.onOpen(u.attempt_id)}
          >
            <span class="detail-session__glyph"
              >${Up[u.status||""]||"\xB7"}</span
            >
            <span class="detail-session__id">${u.attempt_id}</span>
            ${cr(u)?i`<span
                  class="detail-session__resumed"
                  title=${cr(u)}
                  >↻</span
                >`:""}
            <span class="detail-session__meta">${Gt(u)}</span>
            ${h.length>0?i`<span class="detail-session__role">orchestrator</span>`:""}
            ${u.session_id?i`<span class="detail-session__sid" title=${u.session_id}
                  >${String(u.session_id).slice(0,8)}</span
                >`:""}
            ${h.length>0?h.map(x=>i`<span
                      class="detail-session__usage"
                      title=${x.tooltip}
                      >${x.label}</span
                    >`):qr(u.usage)?i`<span class="detail-session__usage"
                    >${qr(u.usage)}</span
                  >`:""}
            <span class="detail-session__time">${il(u.started_at)}</span>
          </button>
          ${l(u)} ${a(u)} ${c(u)} ${jp(u)}
          ${s.has(u.attempt_id)&&u.usage?Bp(u.usage,u.runner==="codex"?"codex":"claude"):""}
          ${qp(f)}
        </div>`})}
    </div>
  `}function cl(e,t={}){return i`
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
          ${zp(e)}
        </div>`:""}
  `}function zp(e){let t=Ur(e);if(t)return t;let r=e.data;if(!r)return"";if(r.missing)return i`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof r.default_task_prompt=="string"?tr("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",r.default_task_prompt):""}`;let n=Xn(r.recorded_at);return i`<div class="detail-prompt__meta">
      ${r.attempt_id}${n?` \xB7 ${n}`:""}
    </div>
    ${typeof r.task_prompt=="string"?tr("\uACFC\uC5C5 (user)",r.task_prompt):""}
    ${typeof r.system_prompt=="string"?tr("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",r.system_prompt):""}`}var Hp=["open","in_progress","deferred","resolved","closed"],Wp=[0,1,2,3,4];function dl(e,t){let r=t.issueStores,n=t.onClose,s=t.transport,o=t.onNavigate,a=t.queueStore,c=t.execPresetStore,l=t.sessionLogStore,u=null,f=null,g={},h="",x=!1,$=!1,T=!1,W="",k="",J="";function se(){$=!1,T=!1,W="",k="",J=""}let D=[],F=null,S=null,H=!1,M="",fe=!1,Ce=0,ce=new Set;function he(){D=[],F=null,S=null,H=!1,M="",fe=!1,Ce+=1,ce.clear()}async function Se(d){if(!s)return;let _=++Ce;try{let b=await Promise.resolve(s("get-comments",{id:d}));if(_!==Ce||d!==u)return;D=Array.isArray(b)?b:[],H=!1}catch{if(_!==Ce||d!==u)return;H=!0}ge()}function Re(){if(!s||!u)return;let d=f&&typeof f.comment_count=="number"?f.comment_count:null;if(F!==u){F=u,S=d,Se(u);return}d!==null&&d!==S&&(S=d,Se(u))}function Ve(d){ce.has(d)?ce.delete(d):ce.add(d),ge()}function Oe(d){let _=M.trim().length===0;M=d,_!==(d.trim().length===0)&&ge()}async function Ae(){let d=M.trim();if(!s||!u||d.length===0||fe)return;let _=u;fe=!0,ge();let b=!1;try{let E=await Promise.resolve(s("add-comment",{id:_,text:d}));Array.isArray(E)&&E.length>0&&(b=!0,_===u&&(D=E,H=!1,M="",S=E.length))}catch{b=!1}b||re("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),_===u&&(fe=!1),ge()}let be={onToggle:Ve,onDraftInput:Oe,onSubmit:Ae},_e=document.createElement("div");_e.className="md-viewer-root",document.body.appendChild(_e);let ve=nl(_e,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),N=document.createElement("div");N.className="session-log-root",document.body.appendChild(N);let A=Jn(N,{transport:s?(d,_)=>Promise.resolve(s(d,_)):void 0,sessionLogStore:l}),I=!1,te=!1,V=!1,Q=null,R=null,j=0;function ue(d){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${d}`}function me(){I=!1,te=!1,V=!1,Q=null,R=null,j+=1}async function Te(d){if(!s)return;let _=++j;te=!0,V=!1,ge();try{let b=await Promise.resolve(s("get-bead-prompt",{bead_id:d}));if(_!==j)return;!b||typeof b!="object"||Array.isArray(b)?V=!0:(Q=b,R=ue(d))}catch{_===j&&(V=!0)}finally{_===j&&(te=!1,ge())}}function we(){if(I=!I,I&&u&&R!==ue(u)){Q=null,Te(u);return}ge()}function xe(){if(!a||!u)return[];let d=a.get();return(d&&d.attempts?Object.values(d.attempts):[]).filter(b=>b&&b.bead_id===u).sort((b,E)=>(E.started_at||0)-(b.started_at||0)).map(b=>({attempt_id:b.attempt_id,bead_id:b.bead_id,status:b.status,started_at:typeof b.started_at=="number"?b.started_at:null,runner:b.runner||null,model:b.model||null,effort:b.effort||null,speed:b.speed||null,session_id:b.session_id||null,resumed_from:b.resumed_from||null,continuation_mode:b.continuation_mode||null,dismissed_at:typeof b.dismissed_at=="number"?b.dismissed_at:null,cause:typeof b.cause=="string"?b.cause:null,cause_detail:b.cause_detail||null,exec_default_preset_id:typeof b.exec_default_preset_id=="string"?b.exec_default_preset_id:null,exec_default_preset_revision:typeof b.exec_default_preset_revision=="number"?b.exec_default_preset_revision:null,exec_values:b.exec_values&&typeof b.exec_values=="object"?b.exec_values:null,usage:b.usage||null,usage_legs:Array.isArray(b.usage_legs)?b.usage_legs:[]}))}function Ue(){if(!a||!u)return null;let d=a.get();return Dt(d&&d.attempts||{},u)}let je=new Set;function rt(d){je.has(d)?je.delete(d):je.add(d),ge()}function U(d){let _=a?a.get():null,b=_&&_.attempts?_.attempts[d]:null;A.open({attempt_id:d,meta:b?{runner:b.runner||void 0,model:b.model||void 0,effort:b.effort||void 0,status:b.status||void 0,session_id:b.session_id||void 0}:{}})}async function G(d){if(!s||!d)return;let _=()=>{let oe=a?a.get():null;return oe&&typeof oe.revision=="number"?oe.revision:0},b=async(oe={})=>await s("worker-attempt-resume",{attempt_id:d,expected_revision:_(),...oe}),E=oe=>{oe?.queue&&a?.set&&a.set(oe.queue)},B=await b();if(E(B),B&&B.conflict){let oe=B.queue&&typeof B.queue.revision=="number"?B.queue.revision:_();B=await s("worker-attempt-resume",{attempt_id:d,expected_revision:oe}),E(B)}B=await Xt(B,(oe,Ne)=>b({continuation:oe,decision_token:Ne}),{onResult:E,refresh:()=>b()}),B&&B.resumed===!1&&!B.conflict&&B.reason&&re(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${B.reason}`,"error",2400)}let z={onOpen:U,onResume:G,onToggleUsage:rt};function v(){let d=a?a.get():null,_=d&&d.default_exec_preset_id,b=typeof _=="string"?ee()?.presets.find(E=>E.id===_):null;return b&&b.compatible!==!1&&b.settings?b.settings:{}}function C(){let d=a?a.get():null,_=d&&d.default_exec_preset_id,b=typeof _=="string"?ee()?.presets.find(E=>E.id===_):null;return b&&b.compatible!==!1&&typeof b.name=="string"?b.name:""}function q(){let d=a?a.get():null;return d&&d.runner_catalog||null}function K(){let d=f?.metadata&&typeof f.metadata=="object"?f.metadata:{},b=(Object.hasOwn(g,"orchestration_model")?g.orchestration_model:void 0)||(typeof d.orchestration_model=="string"?d.orchestration_model:"")||(typeof v().orchestration_model=="string"?v().orchestration_model:"")||"opus";return rr(q(),b)}function ee(){let d=c?c.get():null;return!d||typeof d.revision!="number"?null:{revision:d.revision,presets:Array.isArray(d.presets)?d.presets:[]}}function De(d){let _=d&&d.settings&&typeof d.settings=="object"?d.settings:{},b=E=>typeof _[E]=="string"?_[E]:E==="impl_runtime"&&typeof _.impl_model=="string"&&rr(q(),_.impl_model)||"";return zr({selectedOf:b,effectiveOf:b,runner_catalog:q()}).some(E=>E.groups.some(B=>B.options.some(oe=>oe.value===E.selected&&oe.label.endsWith("(\uBE44\uD638\uD658)"))))}function Ee(d){c&&d&&typeof d.revision=="number"&&Array.isArray(d.presets)&&c.set({revision:d.revision,presets:d.presets})}async function Me(){let d=ee(),_=d?.presets.find(b=>b.id===h);if(!(!s||!u||!d||!_||De(_)||x)){x=!0,ge();try{let b=await Promise.resolve(s("apply-exec-preset",{id:u,preset_id:_.id,expected_revision:d.revision}));if(b&&b.conflict){Ee(b),re("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let E=b&&Array.isArray(b.issue)?b.issue[0]:b?.issue;if(b&&b.applied&&E&&typeof E=="object"){f=E;for(let B of Er)delete g[B];re("\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",2400);return}b&&b.error==="bd_readback_failed"?re("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):re("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(b){b&&typeof b=="object"&&b.code==="bd_readback_failed"?re("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):re("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{x=!1,ge()}}}function ze(){let d=ee();if(d&&d.presets.length===0)return i`<section class="detail-exec-presets">
        <div class="detail-section-label">실행 프리셋</div>
        <p>전역 실행 설정에서 프리셋을 추가하세요.</p>
        <button
          type="button"
          data-open-exec-presets
          @click=${()=>t.onOpenExecPresets?.()}
        >
          전역 실행 설정 열기
        </button>
      </section>`;let _=d?d.presets:[],b=_.find(B=>B.id===h),E=b?De(b):!1;return i`<section class="detail-exec-presets">
      <div class="detail-section-label">실행 프리셋</div>
      <div class="detail-exec-presets__controls">
        <select
          data-exec-preset-select
          aria-label="실행 프리셋"
          ?disabled=${d===null||x}
          @change=${B=>{h=B.target.value,ge()}}
        >
          <option value="" ?selected=${h===""}>
            ${d===null?"\uBD88\uB7EC\uC624\uB294 \uC911\u2026":"\uD504\uB9AC\uC14B \uC120\uD0DD"}
          </option>
          ${_.map(B=>{let oe=De(B);return i`<option
              value=${B.id}
              ?selected=${B.id===h}
            >
              ${B.name}${oe?" (\uBE44\uD638\uD658)":""}
            </option>`})}
        </select>
        <button
          type="button"
          data-apply-exec-preset
          ?disabled=${d===null||!b||E||x}
          @click=${()=>{Me()}}
        >
          12개 설정 적용
        </button>
      </div>
      <p>적용하면 현재 이슈 실행 설정 전체를 교체합니다.</p>
    </section>`}let lt=null;r&&r.subscribe&&(lt=r.subscribe(()=>it()));let ot=null;a&&typeof a.subscribe=="function"&&(ot=a.subscribe(()=>{u&&ge()}));let dt=null;c&&typeof c.subscribe=="function"&&(dt=c.subscribe(()=>{u&&ge()}));function At(d){d.key==="Escape"&&u&&(d.preventDefault(),n())}document.addEventListener("keydown",At);function it(){if(u){if(r&&typeof r.snapshotFor=="function"){let d=r.snapshotFor("detail:"+u)||[];f=d.find(b=>b&&b.id===u)||d[0]||f}Re(),ge()}}function mt(d){Sr(d).then(_=>{_?re("\uBCF5\uC0AC\uB428","success",1200):re("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function nt(d){d.preventDefault(),d.stopPropagation(),u&&mt(u)}function ct(d,_){d.preventDefault(),d.stopPropagation(),mt(_)}function gt(d,_,b){d.preventDefault(),d.stopPropagation(),ve.open(_,{missing_state:b})}function L(d,_){g[d]=_,ge(),!(!s||!u)&&Promise.resolve(s("update-exec-settings",{id:u,key:d,value:_})).catch(()=>{re("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}function Z(d,_){let b=f||{},E=b.metadata&&typeof b.metadata=="object"?b.metadata:{},B={};for(let Ye of["impl_runtime","impl_model","impl_effort"])B[Ye]=Object.hasOwn(g,Ye)?g[Ye]:typeof E[Ye]=="string"?E[Ye]:"";B[d]=_;let oe=rs(B,q(),K()),Ne={};for(let Ye of["impl_runtime","impl_model","impl_effort"])Ne[Ye]=g[Ye],g[Ye]=oe[Ye]||"";ge(),!(!s||!u)&&Promise.resolve(s("update-impl-target",{id:u,...oe,orchestration_runtime:K()})).then(Ye=>{let or=Array.isArray(Ye)?Ye[0]:Ye;if(!or||typeof or!="object"||!or.id)throw new Error("implementation target readback failed");f=or;for(let ps of["impl_runtime","impl_model","impl_effort"])delete g[ps];ge()}).catch(()=>{for(let Ye of["impl_runtime","impl_model","impl_effort"])Ne[Ye]===void 0?delete g[Ye]:g[Ye]=Ne[Ye];ge(),re("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error")})}async function pe(d,_,b){if(!s||!u)return!1;try{let E=await Promise.resolve(s(d,_)),B=Array.isArray(E)?E[0]:E;return B&&typeof B=="object"&&B.id?(f=B,!0):(re(b,"error"),!1)}catch{return re(b,"error"),!1}}function de(d){setTimeout(()=>{try{let _=e.querySelector(d);_&&typeof _.focus=="function"&&_.focus()}catch{}},0)}function ke(){$=!0,W=f&&f.title||"",ge(),de('.detail-edit__input[data-edit="title"]')}function Le(d){W=d.target.value}function He(){$=!1,W="",ge()}function Je(){pe("edit-text",{id:u,field:"title",value:W},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(_=>{_&&($=!1,W=""),ge()})}function Ie(){T=!0,k=f&&f.description||"",ge(),de('.detail-edit__textarea[data-edit="description"]')}function We(d){k=d.target.value}function $e(){T=!1,k="",ge()}function yt(){pe("edit-text",{id:u,field:"description",value:k},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(_=>{_&&(T=!1,k=""),ge()})}function wt(d,_,b,E){if(d.key==="Escape"){d.stopPropagation(),b();return}d.key==="Enter"&&(!E||d.ctrlKey||d.metaKey)&&(d.preventDefault(),_())}function Nt(d){let _=d.target.value;pe("update-status",{id:u,status:_},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>ge())}function Vt(d){let _=Number(d.target.value);pe("update-priority",{id:u,priority:_},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>ge())}function Kt(d){J=d.target.value}function _t(){let d=J.trim();d.length!==0&&pe("label-add",{id:u,label:d},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(_=>{_&&(J=""),ge()})}function Tt(d){if(d.key==="Escape"){d.stopPropagation(),J="",ge();return}d.key==="Enter"&&(d.preventDefault(),_t())}function sr(d){pe("label-remove",{id:u,label:d},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>ge())}let Pt={onCopyPath:ct,onOpenDoc:gt},p={onChange:L,onImplTargetChange:Z};function w(d){return typeof d=="string"?d:d&&typeof d=="object"?String(d.id||d.to||d.issue_id||d.depends_on||""):""}function O(d){switch(d&&typeof d=="object"?String(d.dependency_type||d.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function X(d){let b=(Array.isArray(d.dependencies)?d.dependencies:[]).map(E=>({id:w(E),icon:O(E)})).filter(E=>E.id.length>0);return i`
      <div class="detail-section-label">의존성</div>
      ${b.length===0?i`<div class="detail-empty">의존성 없음</div>`:i`<div class="detail-deps">
            ${b.map(E=>o?i`<button
                    type="button"
                    class="detail-dep detail-dep--link"
                    @click=${()=>o(E.id)}
                  >
                    ${E.icon?`${E.icon} `:""}${E.id}
                  </button>`:i`<span class="detail-dep"
                    >${E.icon?`${E.icon} `:""}${E.id}</span
                  >`)}
          </div>`}
    `}function le(d){let _=d.metadata||{},b=d.workflow||{},E=b.stages||{},B=E.spec&&E.spec.stale,oe=E.impl&&E.impl.stale,Ne=E.plan||null,Ye=b.route_source==="derived",or=b.route||_.route||"\u2014";return i`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${Ye?" detail-kv__v--derived":""}"
          title=${Ye?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${Ye?"unset":or}</span
        >
      </div>
      ${b.route!=="quick_fix"||Object.hasOwn(_,"spec_review")?i`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${_.spec_review||"\uC5C6\uC74C"}${B?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${b.route==="full_plan"?i`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${Ne?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${Ne?.approval_receipt||"\uC5C6\uC74C"}${Ne?.approval_state==="stale"?" \xB7 stale":Ne?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${b.route!=="quick_fix"||Object.hasOwn(_,"impl_review")?i`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${_.impl_review||"\uC5C6\uC74C"}${oe?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${b.exec_receipt?i`<div class="detail-kv">
            <span class="detail-kv__k">exec_receipt</span>
            <span class="detail-kv__v detail-kv__v--wrap"
              >${`${b.exec_receipt.kind}:${b.exec_receipt.actor}@${b.exec_receipt.sha}`}</span
            >
          </div>`:""}
      ${b.impl_entry?i`<div class="detail-kv">
            <span class="detail-kv__k">impl_entry</span>
            <span class="detail-kv__v"
              >${`${b.impl_entry.actor}@${b.impl_entry.sha}`}</span
            >
          </div>`:""}
      ${_.pr_url?i`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${_.pr_url}</span>
          </div>`:""}
    `}let Ge={route:["quick_fix","spec_backed","full_plan"]};async function ye(d,_){let b=_.target.value;if(d==="route"&&f&&f.metadata&&f.metadata.route==="full_plan"&&b!=="full_plan"&&!window.confirm(`full_plan \u2192 ${b||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){ge();return}await pe("update-workflow-meta",{id:u,key:d,value:b},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),ge()}function Xe(d){let _=d.metadata||{};return i` ${((E,B)=>{let oe=Ge[E],Ne=typeof _[E]=="string"?_[E]:"";return i`<div class="detail-kv">
        <span class="detail-kv__k">${E}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${E}
          data-edit=${`wfmeta-${E}`}
          @change=${Ye=>ye(E,Ye)}
        >
          <option value="" ?selected=${!oe.includes(Ne)}>
            ${B}
          </option>
          ${oe.map(Ye=>i`<option value=${Ye} ?selected=${Ne===Ye}>${Ye}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function ne(d,_){return $?i`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${W}
            @input=${Le}
            @keydown=${b=>wt(b,Je,He,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${Je}
            >
              저장
            </button>
            <button
              type="button"
              class="detail-edit__cancel"
              data-edit="title-cancel"
              @click=${He}
            >
              취소
            </button>
          </div>
        </div>
      `:i`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${d}</h2>
        ${vt(_).map(b=>i`<span class="detail-usage-total" title=${b.tooltip}
              >${b.label}</span
            >`)}
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${ke}
        >
          ✎
        </button>
      </div>
    `}function y(d){let _=bt(d.created_at),b=bt(d.updated_at);return!_&&!b?i``:i`
      ${_?i`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${_}</span>
          </div>`:""}
      ${b?i`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${b}</span>
          </div>`:""}
    `}function Y(d,_){return i`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${Nt}
        >
          ${Hp.map(b=>i`<option value=${b} ?selected=${b===d}>${b}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${Vt}
        >
          ${Wp.map(b=>i`<option value=${String(b)} ?selected=${b===_}>
                P${b}
              </option>`)}
        </select>
      </div>
    `}function ae(d){return i`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${T?"":i`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${Ie}
            >
              ✎
            </button>`}
      </div>
      ${T?i`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${k}
              @input=${We}
              @keydown=${_=>wt(_,yt,$e,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${yt}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${$e}
              >
                취소
              </button>
            </div>
          </div>`:i`<div class="detail-overlay__desc">
            ${d||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function Be(d){let _=typeof d.notes=="string"?d.notes:"";return _.trim().length===0?i``:i`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${_}</div>
    `}function et(d){let _=Array.isArray(d.labels)?d.labels:[];return i`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${_.map(b=>i`<span class="detail-label-chip"
              >${b}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${b}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+b}
                @click=${()=>sr(b)}
              >
                ×
              </button></span
            >`)}
        <span class="detail-label-add">
          <input
            class="detail-label-add__input"
            aria-label="라벨 추가"
            placeholder="라벨 추가"
            .value=${J}
            @input=${Kt}
            @keydown=${Tt}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${_t}
          >
            추가
          </button>
        </span>
      </div>
    `}function Ze(){if(!u)return i``;let d=f||{},_=String(d.id||u),b=d.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",E=Ue(),B=d.status||"open",oe=typeof d.priority=="number"?Math.max(0,Math.min(4,d.priority)):"",Ne=d.description||"",Ye={...d,metadata:{...d.metadata||{},...g}};return i`
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
            @click=${nt}
          >
            ${_}
          </button>
          ${ne(b,E)}
          ${Y(B,oe)} ${y(d)}
          ${ae(Ne)}
          ${Ki(D,be,{expanded:ce,draft:M,sending:fe,error:H})}
          ${Be(d)} ${et(d)} ${X(d)}
          ${le(d)} ${Xe(d)}
          ${Gi(d,Pt)}
          ${ze()}
          ${rl(Ye,p,v(),q(),C())}
          ${cl({expanded:I,loading:te,error:V,data:Q},{onToggle:we})}
          ${ll(xe(),z,{total:E,expanded:je})}
        </div>
      </div>
    `}function ge(){Pe(Ze(),e)}return{load(d){d!==u&&(g={},h="",se(),he(),me()),u=d,f=null,it()},clear(){u=null,f=null,g={},h="",x=!1,se(),he(),me(),ve.close(),A.close(),Pe(i``,e)},destroy(){lt&&(lt(),lt=null),ot&&(ot(),ot=null),dt&&(dt(),dt=null),document.removeEventListener("keydown",At),ve.destroy(),_e.parentNode&&_e.parentNode.removeChild(_e),A.destroy(),N.parentNode&&N.parentNode.removeChild(N),u=null,f=null,h="",x=!1,he(),me(),Pe(i``,e)}}}var Gp=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function ul(e,t){return Ps(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function Yp(e,t,r){if(!r)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(o=>o!==e)};let n=t.hidden_labels.filter(o=>o!==e);return t.hidden_prefixes.some(o=>o.length>0&&e.startsWith(o))?{hidden_labels:n,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:n}}function pl(e,t){let{policyStore:r,transport:n,labelOptions:s}=t,o=document.createElement("dialog");o.id="display-settings-dialog",o.className="display-settings",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),e.appendChild(o);let a="";async function c(S){let H=r.get();if(H)try{let M=await n("display-policy-set",{expected_revision:H.revision,policy:S(H)});l(M),M&&M.conflict&&M.policy&&(M=await n("display-policy-set",{expected_revision:M.policy.revision,policy:S(M.policy)}),l(M)),M&&M.conflict&&re("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC","error",4e3)}catch{re("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function l(S){S&&S.policy&&typeof S.policy=="object"&&r.set(S.policy)}function u(S){let H=r.get();if(!H)return;let M=ul(S,H)!=="shown";c(fe=>Yp(S,fe,M))}function f(){let S=a.trim();S.length!==0&&(a="",c(H=>H.hidden_prefixes.includes(S)?{hidden_prefixes:H.hidden_prefixes}:{hidden_prefixes:[...H.hidden_prefixes,S]}),W())}function g(S){c(H=>({hidden_prefixes:H.hidden_prefixes.filter(M=>M!==S)}))}function h(S){let H=r.get();if(!H)return;let M=H.chips[S]===!1;c(()=>({chips:{[S]:M}}))}function x(S){let H=s();return i`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">라벨 표시</h3>
        <p class="display-settings__hint">
          라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을
          누르면 그 라벨만 예외로 다시 표시됩니다.
        </p>
        ${H.length===0?i`<div class="display-settings__empty">라벨 없음</div>`:i`<div class="display-settings__pills">
              ${H.map(M=>{let fe=ul(M,S);return i`<button
                  type="button"
                  class=${`display-settings__pill display-settings__pill--${fe}`}
                  data-label=${M}
                  data-state=${fe}
                  @click=${()=>u(M)}
                >
                  ${M}
                </button>`})}
            </div>`}
      </section>
    `}function $(S){return i`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">숨김 prefix</h3>
        <div class="display-settings__prefixes">
          ${S.hidden_prefixes.map(H=>i`<span class="display-settings__prefix">
                ${H}
                <button
                  type="button"
                  class="display-settings__prefix-remove"
                  aria-label=${`${H} \uADDC\uCE59 \uC81C\uAC70`}
                  @click=${()=>g(H)}
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
            @input=${H=>{a=String(H.target.value||"")}}
          />
          <button type="button" @click=${f}>추가</button>
        </div>
      </section>
    `}function T(S){return i`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">카드 표시 요소</h3>
        <div class="display-settings__toggles">
          ${Gp.map(([H,M])=>i`<label class="display-settings__toggle">
                <input
                  type="checkbox"
                  data-chip=${H}
                  .checked=${S.chips[H]!==!1}
                  @change=${()=>h(H)}
                />
                <span>${M}</span>
              </label>`)}
        </div>
      </section>
    `}function W(){let S=r.get();Pe(i`
        <div class="display-settings__container">
          <header class="display-settings__header">
            <div class="display-settings__title">표시 설정</div>
            <button
              type="button"
              class="display-settings__close"
              aria-label="닫기"
              @click=${F}
            >
              ×
            </button>
          </header>
          <div class="display-settings__body">
            ${S?i`${x(S)} ${$(S)}
                ${T(S)}`:i`<div class="display-settings__empty">
                  표시 정책을 불러오는 중…
                </div>`}
          </div>
        </div>
      `,o)}let k=!1,J=()=>{k=!1};o.addEventListener("close",J),o.addEventListener("cancel",J);let se=null;r.subscribe&&(se=r.subscribe(()=>{k&&W()}));function D(){k||(a="",k=!0,W(),typeof o.showModal=="function"?o.showModal():o.setAttribute("open",""))}function F(){k&&(k=!1,typeof o.close=="function"?o.close():o.removeAttribute("open"))}return{open:D,close:F,destroy(){k=!1,o.removeEventListener("close",J),o.removeEventListener("cancel",J),se&&(se(),se=null),o.remove()}}}function fl(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let r=t.querySelector("#fatal-error-title"),n=t.querySelector("#fatal-error-message"),s=t.querySelector("#fatal-error-detail"),o=t.querySelector("#fatal-error-reload"),a=t.querySelector("#fatal-error-close"),c=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},l=(u,f,g="")=>{r&&(r.textContent=u||"Unexpected Error"),n&&(n.textContent=f||"An unrecoverable error occurred.");let h=typeof g=="string"?g.trim():"";if(s&&(h.length>0?(s.textContent=h,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),a&&a.addEventListener("click",()=>c()),t.addEventListener("cancel",u=>{u.preventDefault(),c()}),{open:l,close:c,getElement(){return t}}}function ns(e,t){let{queueStore:r,presetStore:n,transport:s}=t,o=document.createElement("dialog");o.id="worker-exec-defaults-dialog",o.className="exec-defaults",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),e.appendChild(o);let a=null,c=!1;function l(){return r&&r.get()||{revision:0,exec_defaults:{}}}function u(){let v=l();return typeof v.revision=="number"?v.revision:0}function f(){let v=n?n.get():null;return!v||typeof v.revision!="number"?null:{revision:v.revision,presets:Array.isArray(v.presets)?v.presets:[]}}function g(v){n&&v&&typeof v.revision=="number"&&Array.isArray(v.presets)&&n.set({revision:v.revision,presets:v.presets})}function h(v){v&&v.queue&&r&&r.set(v.queue)}function x(){return l().runner_catalog??null}let $=null;function T(){if($!==null)return $;let v=l().default_exec_preset_id;return typeof v=="string"&&v.length>0?v:null}async function W(v){if(!s)return;let C=f();if(!C)return;$=v||"";let q=D(v);if(we(),!q.viable){re(q.missing?"\uC120\uD0DD\uD55C \uD504\uB9AC\uC14B\uC744 \uCC3E\uC744 \uC218 \uC5C6\uC5B4 \uC800\uC7A5\uD558\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.":"\uBE44\uD638\uD658 \uD504\uB9AC\uC14B\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4 \uAE30\uBCF8\uAC12\uC73C\uB85C \uC800\uC7A5\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.","error",4e3),$=null,we();return}try{let K=await s("worker-queue-set-default-exec-preset",{preset_id:v||null,expected_queue_revision:u(),expected_preset_revision:C.revision});h(K),K&&K.presets&&n&&n.set(K.presets),K&&K.conflict?re("\uAE30\uBCF8 \uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uC120\uD0DD\uC744 \uAC80\uD1A0\uD55C \uB4A4 \uB2E4\uC2DC \uC800\uC7A5\uD558\uC138\uC694.","error",4e3):K&&K.applied||re("\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4 \uAE30\uBCF8 \uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328","error",4e3)}catch{re("\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4 \uAE30\uBCF8 \uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328","error",4e3)}$=null,we()}function k(v){a={id:v.id,name:v.name,settings:{...v.settings||{}}},S(),c=!1,we()}function J(){a={id:null,name:"",settings:{}},c=!1,we()}function se(v){let C=v&&v.settings&&typeof v.settings=="object"?v.settings:{},q=K=>typeof C[K]=="string"?C[K]:K==="impl_runtime"&&typeof C.impl_model=="string"&&rr(x(),C.impl_model)||"";return zr({selectedOf:q,effectiveOf:q,runner_catalog:x()}).some(K=>K.groups.some(ee=>ee.options.some(De=>De.value===K.selected&&De.label.endsWith("(\uBE44\uD638\uD658)"))))}function D(v){if(!v)return{viable:!0,missing:!1,incompatible:!1,preset:null};let q=f()?.presets.find(ee=>ee.id===v);if(!q||q.migration_pending===!0)return{viable:!1,missing:!0,incompatible:!1,preset:null};let K=q.compatible===!1||se(q);return{viable:!K,missing:!1,incompatible:K,preset:q}}function F(){let v=a?.settings.orchestration_model;return typeof v!="string"?null:rr(x(),v)}function S(){if(!a)return;let v=rs({impl_runtime:a.settings.impl_runtime||"",impl_model:a.settings.impl_model||"",impl_effort:a.settings.impl_effort||""},x(),F());for(let C of["impl_runtime","impl_model","impl_effort"])v[C]?a.settings[C]=v[C]:delete a.settings[C]}function H(v){let C=v&&v.settings&&typeof v.settings=="object"?v.settings:{},q=Er.filter(ee=>typeof C[ee]=="string").length,K=Er.filter(ee=>typeof C[ee]=="string").map(ee=>`${po[ee]?.title||ee}: ${C[ee]}`);return{count:`${q}/12 \uC9C0\uC815`,choices:K.length>0?K.join(" \xB7 "):"\uBAA8\uB4E0 \uD56D\uBAA9 \uAE30\uBCF8\uAC12"}}async function M(v){if(!s||!window.confirm(`\u201C${v.name}\u201D \uD504\uB9AC\uC14B\uC744 \uC0AD\uC81C\uD560\uAE4C\uC694? \uC774\uBBF8 \uC801\uC6A9\uB41C \uC774\uC288\uB294 \uBCC0\uACBD\uB418\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.`))return;let C=f();if(C)try{let q=await s("exec-preset-delete",{expected_revision:C.revision,id:v.id});g(q),q&&q.conflict&&re("\uD504\uB9AC\uC14B\uC774 \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uB2E4\uC2DC \uD655\uC778\uD558\uC138\uC694.","error",4e3)}catch{re("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328","error",4e3)}}async function fe(v=!1){if(!s||!a)return;let C=f();if(!C)return;let q=v||a.id===null,K={expected_revision:C.revision,...q?{}:{id:a.id},name:a.name,settings:{...a.settings}};try{let ee=await s(q?"exec-preset-create":"exec-preset-update",K);if(g(ee),ee&&ee.conflict){c=!0,we();return}if(ee&&ee.applied){a=null,c=!1,we();return}re("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328","error",4e3)}catch{re("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function Ce(v){return i`<div class="exec-defaults__row exec-preset-editor__row">
      <span class="exec-defaults__k">${_o(v.key)}</span>
      <select
        class="exec-defaults__sel"
        data-preset-key=${v.key}
        ?disabled=${v.disabled}
        @change=${C=>{if(!a)return;let q=C.target.value;q?a.settings[v.key]=q:delete a.settings[v.key],(v.key==="impl_runtime"||v.key==="impl_model"||v.key==="impl_effort"||v.key==="orchestration_model")&&S(),c=!1,we()}}
      >
        ${ts(v.groups,v.selected,fo[v.key]||"(\uAE30\uBCF8)")}
      </select>
    </div>`}function ce(){if(!a)return"";let v=Ee=>typeof a?.settings[Ee]=="string"?a.settings[Ee]:"",C=zr({selectedOf:v,effectiveOf:v,runner_catalog:x(),controller_runtime:F()}),q=fn.flatMap(Ee=>Ee.keys).filter(Ee=>typeof a?.settings[Ee]=="string").length,K=Ee=>{let Me=C.find(ze=>ze.key===Ee);return Me?Ce(Me):""},ee=f(),De=a.id!==null&&ee!==null&&!ee.presets.some(Ee=>Ee.id===a?.id);return i`<div class="exec-preset-editor" data-preset-editor>
      <label class="exec-preset-editor__name">
        프리셋 이름
        <input
          type="text"
          value=${a.name}
          data-preset-name
          @input=${Ee=>{a&&(a.name=Ee.target.value,c=!1)}}
        />
      </label>
      ${c?i`<p class="exec-preset-editor__conflict" data-preset-conflict>
            다른 곳에서 변경됨 — 최신 목록을 확인한 뒤 다시 저장하세요.
          </p>`:""}
      ${De?i`<p class="exec-preset-editor__conflict">
            편집하던 프리셋이 다른 곳에서 삭제됐습니다.
          </p>`:""}
      <section class="exec-preset-editor__core" data-preset-core>
        ${uo.map(K)}
      </section>
      <details class="exec-preset-editor__advanced" data-preset-advanced>
        <summary>고급 설정 — ${q}개 변경됨</summary>
        ${fn.map(Ee=>i`<section
              class="exec-preset-editor__group"
              data-preset-group=${Ee.id}
            >
              <h4>${Ee.label}</h4>
              ${Ee.keys.map(K)}
            </section>`)}
      </details>
      <div class="exec-preset-editor__actions">
        ${De?i`<button
              type="button"
              data-preset-save-as-new
              @click=${()=>{fe(!0)}}
            >
              새 프리셋으로 저장
            </button>`:i`<button
              type="button"
              data-preset-save
              @click=${()=>{fe(!1)}}
            >
              저장
            </button>`}
        <button
          type="button"
          data-preset-cancel
          @click=${()=>{a=null,c=!1,we()}}
        >
          취소
        </button>
      </div>
    </div>`}function he(){let v=f(),C=v?v.presets.filter(ee=>ee?.migration_pending!==!0):[],q=T()||"",K=D(q);return i`<section class="exec-presets" data-exec-presets>
      <div class="exec-presets__heading">
        <h3>공용 실행 프리셋</h3>
        <button type="button" data-preset-new @click=${J}>
          + 새 프리셋
        </button>
      </div>
      <p class="exec-defaults__hint">
        모든 워크스페이스에서 공유하며, 이슈에 적용하면 값이 복사됩니다.
      </p>
      ${v===null?i`<p class="exec-presets__empty">프리셋을 불러오는 중…</p>`:C.length===0?i`<p class="exec-presets__empty">
              아직 공용 프리셋이 없습니다.
            </p>`:C.map(ee=>{let De=H(ee),Ee=D(ee.id),Me=ee.id===q,ze=Ee.missing?"\uD504\uB9AC\uC14B\uC744 \uCC3E\uC744 \uC218 \uC5C6\uC5B4 \uAE30\uBCF8\uC73C\uB85C \uC9C0\uC815\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":Ee.incompatible?"\uBE44\uD638\uD658 \uD504\uB9AC\uC14B\uC740 \uAE30\uBCF8\uC73C\uB85C \uC9C0\uC815\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"",lt=typeof ee.reference_count=="number",ot=lt?ee.reference_count:null,dt=Array.isArray(ee.reference_summary)?ee.reference_summary.map(At=>At?.display_name||At?.workspace_key).filter(Boolean).join(", "):"";return i`<article
                class="exec-preset-card"
                data-preset-id=${ee.id}
              >
                <div class="exec-preset-card__main">
                  <strong>${ee.name}</strong>
                  ${Me?i`<span
                        class="exec-defaults__vd-badge"
                        data-workspace-default-badge
                        >워크스페이스 기본</span
                      >`:""}
                  <span>${De.count}</span>
                  <span data-preset-references=${ee.id}
                    >${lt?`\uCC38\uC870 ${ot}\uAC1C`:"\uCC38\uC870 \uD655\uC778 \uBD88\uAC00"}</span
                  >
                  ${Ee.incompatible?i`<span data-preset-incompatible>비호환</span>`:""}
                  <small>${De.choices}</small>
                  ${dt?i`<small data-preset-impact=${ee.id}
                        >업데이트 영향: ${dt}</small
                      >`:""}
                </div>
                <div class="exec-preset-card__actions">
                  ${Me?i`<button
                        type="button"
                        data-workspace-preset-release=${ee.id}
                        @click=${()=>{W("")}}
                      >
                        기본 해제
                      </button>`:i`<button
                        type="button"
                        data-workspace-preset-assign=${ee.id}
                        ?disabled=${!Ee.viable}
                        title=${ze}
                        @click=${()=>{W(ee.id)}}
                      >
                        기본으로
                      </button>`}
                  <button
                    type="button"
                    data-preset-edit=${ee.id}
                    @click=${()=>k(ee)}
                  >
                    편집
                  </button>
                  <button
                    type="button"
                    data-preset-delete=${ee.id}
                    ?disabled=${ot===null||ot>0||ee.reference_scan_complete===!1}
                    title=${ot===null?"\uCC38\uC870 \uC218\uB97C \uD655\uC778\uD560 \uC218 \uC5C6\uC5B4 \uC0AD\uC81C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":ot>0?"\uCC38\uC870 \uC911\uC778 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC788\uC5B4 \uC0AD\uC81C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":ee.reference_scan_complete===!1?"\uCC38\uC870 \uC2A4\uCE94\uC774 \uC644\uB8CC\uB418\uC9C0 \uC54A\uC544 \uC0AD\uC81C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":""}
                    @click=${()=>{M(ee)}}
                  >
                    삭제
                  </button>
                </div>
              </article>`})}
      ${v!==null&&q&&K.missing?i`<article class="exec-preset-card" data-workspace-preset-missing>
            <div class="exec-preset-card__main">
              <strong>워크스페이스 기본 프리셋을 찾을 수 없습니다</strong>
              <span class="exec-defaults__vd-badge" data-workspace-default-badge
                >워크스페이스 기본</span
              >
              <small>
                참조 ${q} · 실행이 차단됩니다. 기본을 해제하거나 다른
                프리셋을 지정하세요.
              </small>
            </div>
            <div class="exec-preset-card__actions">
              <button
                type="button"
                data-workspace-preset-release=${q}
                @click=${()=>{W("")}}
              >
                기본 해제
              </button>
            </div>
          </article>`:""}
      ${ce()}
    </section>`}function Se(){let v=l().workspace_info;return v&&typeof v=="object"?v:{}}function Re(v,C){return i`<span
      class="exec-defaults__vd-badge exec-defaults__vd-badge--${v}"
      >${C}</span
    >`}let Ve=!1,Oe=!1,Ae=!1,be=null;async function _e(){if(s){Oe=!0,Ae=!1,we();try{let v=await Promise.resolve(s("get-worker-system-prompt",{}));!v||typeof v!="object"||Array.isArray(v)?Ae=!0:be=v}catch{Ae=!0}finally{Oe=!1,we()}}}function ve(){if(Ve=!Ve,Ve&&!be){_e();return}we()}function N(){return i`<section class="exec-defaults__sp" data-seam="system-prompt">
      <p class="exec-defaults__vd-title">
        워커 시스템 프롬프트
        <span class="exec-defaults__vd-ro">읽기 전용 — 서버가 조립</span>
        <button
          type="button"
          class="exec-defaults__sp-toggle"
          data-seam="system-prompt-toggle"
          aria-expanded=${Ve?"true":"false"}
          @click=${ve}
        >
          ${Ve?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
        </button>
      </p>
      ${Ve?A():""}
    </section>`}function A(){let v=Ur({loading:Oe,error:Ae});if(v)return v;if(!be)return"";let C=Array.isArray(be.variants)?be.variants:[];return i`<div class="exec-defaults__sp-body">
      ${be.target_base_placeholder?i`<div class="prompt-block__meta">
            \`${be.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${C.map(q=>i`<div class="exec-defaults__sp-variant" data-variant=${q.key}>
            <div class="exec-defaults__sp-cond">${q.condition}</div>
            ${tr(q.label,q.system_prompt)}
          </div>`)}
    </div>`}function I(v){if(typeof v!="number"||!Number.isFinite(v))return"";let C=v/6e4;return Number.isInteger(C)?`timeout ${C}\uBD84`:`timeout ${Math.round(v/1e3)}\uCD08`}function te(v){let C=I(v);return C?Re("config",C):""}function V(v){let C=typeof v.base_sha=="string"?v.base_sha:"",q=`${v.source_path||"repo-ops/config.toml"} @ ${v.base_ref||"?"}${C?`@${C.slice(0,7)}`:""}`;return i`<section class="exec-defaults__vd" data-seam="repo-ops">
      <p class="exec-defaults__vd-title">
        저장소 작업 선언
        <span class="exec-defaults__vd-src">${q}</span>
      </p>
      <div class="exec-defaults__lane" data-lane="verify">
        <span class="exec-defaults__lane-k">머지 전 검증</span>
        <span class="exec-defaults__lane-v"
          >${v.verify?i`<code class="exec-defaults__vd-cmd"
                  >${v.verify.script}</code
                >${te(v.verify.timeout_ms)}`:i`선언 없음${Re("absent","verify \uC5C6\uC774 \uD310\uC815")}`}</span
        >
        <span class="exec-defaults__lane-d"
          >${v.verify?"\uBA38\uC9C0 \uC804\uC5D0 \uC774 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uD1B5\uACFC\uD574\uC57C \uC790\uACA9\uC744 \uC5BB\uC2B5\uB2C8\uB2E4.":"\uBA38\uC9C0 \uC790\uACA9\uC740 PR/base/head \uC2E0\uC120\uB3C4\xB7mergeability\xB7\uB9AC\uBDF0 \uC601\uC218\uC99D\uC73C\uB85C\uB9CC \uD310\uC815\uD569\uB2C8\uB2E4."}</span
        >
      </div>
      <div class="exec-defaults__lane" data-lane="deploy">
        <span class="exec-defaults__lane-k">머지 후 배포</span>
        <span class="exec-defaults__lane-v"
          >${v.deploy?i`<code class="exec-defaults__vd-cmd"
                  >${v.deploy.script}</code
                >${te(v.deploy.timeout_ms)}`:i`선언 없음${Re("absent","\uBC30\uD3EC \uC5C6\uC74C")}`}</span
        >
        <span class="exec-defaults__lane-d"
          >${v.deploy?i`Worker가 <code>.worktrees/.repo-ops-deploy</code>에서 대상
                SHA로 정렬한 뒤 1회 실행합니다.`:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC \uB2E8\uACC4 \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4."}</span
        >
      </div>
    </section>`}function Q(v){let C=v.repo_ops&&typeof v.repo_ops=="object"?v.repo_ops:null;return C&&(C.status==="resolved"||C.status==="absent")?V(C):C&&(C.status==="pending"||C.status==="error")?i`<section class="exec-defaults__vd" data-seam="repo-ops">
        <p class="exec-defaults__vd-title">
          저장소 작업 선언
          <span class="exec-defaults__vd-ro">읽기 전용 — config에서 정의</span>
        </p>
        <div
          class="exec-defaults__vd-line exec-defaults__vd-absent"
          data-seam="repo-ops-status"
        >
          ${C.status==="pending"?"\uC120\uC5B8 \uD655\uC778 \uC911":i`선언 읽기
              실패${C.error_code?i` — <code>${C.error_code}</code>`:""}`}
        </div>
      </section>`:i`<section class="exec-defaults__vd" data-seam="repo-ops">
      <p class="exec-defaults__vd-title">저장소 작업 선언</p>
      <div class="exec-defaults__vd-line exec-defaults__vd-absent">
        선언 확인 중
      </div>
    </section>`}async function R(v){if(!s)return;let C=await s("worker-auto-repair-toggle",{on:v,expected_revision:u()});if(h(C),C&&C.conflict){let q=await s("worker-auto-repair-toggle",{on:v,expected_revision:u()});h(q)}we()}let j={owned_deploy_worktree_fetch_detached_alignment_recreate:"\uC804\uC6A9 \uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC \uC815\uB82C\xB7\uBCF5\uAD6C",recovered_pre_execution_fetch_timeout_retry_once:"fetch \uD0C0\uC784\uC544\uC6C3 1\uD68C \uBCF5\uAD6C",repo_serial_lock_wait:"\uC800\uC7A5\uC18C \uC21C\uCC28 \uC2E4\uD589 \uB300\uAE30",restart_operation_adoption:"\uC7AC\uC2DC\uC791 \uD6C4 \uC791\uC5C5 \uC778\uACC4",exact_input_exit_zero_evidence_adoption:"\uB3D9\uC77C \uC785\uB825 \uC131\uACF5 \uC99D\uAC70 \uC778\uACC4",descendant_success_covers_ancestor_rows:"\uCD5C\uC2E0 SHA \uC131\uACF5\uC774 \uC774\uC804 \uD589 \uCEE4\uBC84",owned_verify_candidate_cleanup:"\uAC80\uC99D \uC784\uC2DC \uCCB4\uD06C\uC544\uC6C3 \uC815\uB9AC",script_retry:"\uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4",auto_repair_session:"\uC790\uB3D9 \uD574\uACB0 \uC138\uC158",user_triggered_session:"\uC0AC\uC6A9\uC790 \uD574\uACB0 \uC138\uC158",automatic:"\uC790\uB3D9",user_action_only:"\uC0AC\uC6A9\uC790 \uD074\uB9AD",script_identity_present:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC788\uC744 \uB54C\uB9CC",per_completion_chain:"\uC644\uB8CC \uCCB4\uC778\uB2F9",unbounded:"\uD69F\uC218 \uC81C\uD55C \uC5C6\uC74C",bounded_single_script_retry_exceeded:"\uB2E8\uC77C \uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4 \uD55C\uB3C4 \uCD08\uACFC",baseline_failure_ignore:"\uAE30\uC874 \uC2E4\uD328 \uBB34\uC2DC",config_or_script_deletion_to_bypass_gate:"\uC124\uC815\xB7\uC2A4\uD06C\uB9BD\uD2B8 \uC0AD\uC81C\uB85C \uAC8C\uC774\uD2B8 \uC6B0\uD68C",credential_entry:"\uC790\uACA9\uC99D\uBA85 \uC785\uB825\xB7\uCD9C\uB825",destructive_action:"\uD30C\uAD34\uC801 \uC791\uC5C5",history_rewrite:"\uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131",agent_self_report_as_success:"\uC138\uC158 \uC790\uAE30\uBCF4\uACE0\uB97C \uC131\uACF5 \uCC98\uB9AC",unbounded_repair_session_retry:"\uBB34\uD55C \uD574\uACB0 \uC138\uC158 \uBC18\uBCF5"};function ue(v,C,q){return i`<div class="exec-defaults__policy-group" data-policy=${q}>
      <div class="exec-defaults__policy-label">${v}</div>
      <ul class="exec-defaults__policy-list">
        ${C.map(K=>i`<li data-token=${K}>
              ${j[K]||K}
            </li>`)}
      </ul>
    </div>`}function me(v){return i`<div
      class="exec-defaults__policy-group"
      data-policy="resolution-ladder"
    >
      <div class="exec-defaults__policy-label">해결 사다리</div>
      <ol class="exec-defaults__policy-list">
        ${v.map(C=>{let q=[j[C.trigger]||C.trigger];return Number.isInteger(C.attempts_per_operation_attempt)?q.push(`operation\uB2F9 ${C.attempts_per_operation_attempt}\uD68C`):Number.isInteger(C.attempts)?q.push(`${j[C.budget]||C.budget} ${C.attempts}\uD68C`):Number.isInteger(C.sessions_per_user_action)&&q.push(`${C.sessions_per_user_action}\uD68C`,j[C.user_actions]||C.user_actions),C.applies_when&&q.push(j[C.applies_when]||C.applies_when),i`<li data-token=${C.id}>
            <strong>${j[C.id]||C.id}</strong>
            <span>${q.filter(Boolean).join(" \xB7 ")}</span>
          </li>`})}
      </ol>
    </div>`}function Te(){let v=l(),C=v.auto_repair!==!1,q=v.repo_operation_policy&&typeof v.repo_operation_policy=="object"?v.repo_operation_policy:null,K=Array.isArray(v.repo_operations)?v.repo_operations:[],ee=K.find(ze=>ze.state==="repairing"),De=K.filter(ze=>ze.state==="failed"||ze.state==="repairing"),Ee=De.length?Math.min(...De.map(ze=>typeof ze.repair?.remaining=="number"?ze.repair.remaining:0)):q?.auto_repair?.resolution_ladder?.find(ze=>ze.id==="auto_repair_session")?.attempts??1,Me=Array.isArray(q?.auto_repair?.resolution_ladder)?q.auto_repair.resolution_ladder:[];return i`<section class="exec-defaults__repair" data-seam="auto-repair">
      <p class="exec-defaults__vd-title">
        자동 해결
        <span class="exec-defaults__vd-ro"
          >자동화(대기열·머지)와 독립된 스위치</span
        >
      </p>
      <label class="exec-defaults__repair-toggle">
        <input
          type="checkbox"
          class="exec-defaults__repair-input"
          .checked=${C}
          @change=${ze=>{R(ze.target.checked)}}
        />
        검증·배포 실패를 자동으로 해결 시도
      </label>
      <div class="exec-defaults__repair-state">
        <span class="exec-defaults__repair-value" data-seam="auto-repair-value"
          >${C?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}</span
        >
        <span
          class="exec-defaults__repair-budget"
          data-seam="auto-repair-budget"
          >남은 자동 해결 ${Ee}회</span
        >
        <span
          class="exec-defaults__repair-session"
          data-seam="auto-repair-session"
          >${ee?`\uD574\uACB0 \uC138\uC158 \uC2E4\uD589 \uC911 \xB7 ${ee.repair?.owner_bead||ee.operation_id}`:"\uC2E4\uD589 \uC911\uC778 \uD574\uACB0 \uC138\uC158 \uC5C6\uC74C"}</span
        >
      </div>
      ${q?i`<details class="exec-defaults__policy" data-seam="policy-lists">
            <summary>
              Worker 자동 처리 기준
              <span class="exec-defaults__policy-count"
                >자동 ${(q.worker_automatic||[]).length} · 해결 사다리
                ${Me.length} · 금지
                ${(q.never_automatic||[]).length}</span
              >
            </summary>
            ${ue("Worker\uAC00 \uC790\uB3D9 \uCC98\uB9AC",q.worker_automatic||[],"worker-automatic")}
            ${q.supported===!1||q.schema_version!==2?i`<div
                  class="exec-defaults__policy-group"
                  data-policy="resolution-ladder"
                >
                  ${`\uACC4\uC57D \uC2A4\uD0A4\uB9C8 \uBD88\uC77C\uCE58 \u2014 \uC790\uB3D9 \uD574\uACB0\uC774 \uC815\uC9C0\uB418\uC5C8\uC2B5\uB2C8\uB2E4 (v${q.schema_version})`}
                </div>`:me(Me)}
            ${ue("\uC790\uB3D9\uC73C\uB85C \uD558\uC9C0 \uC54A\uC74C",q.never_automatic||[],"never-automatic")}
          </details>`:""}
    </section>`}function we(){Pe(i`
        <div class="exec-defaults__container">
          <header class="exec-defaults__header">
            <div class="exec-defaults__title">전역 실행 설정</div>
            <button
              type="button"
              class="exec-defaults__close"
              aria-label="닫기"
              @click=${z}
            >
              ×
            </button>
          </header>
          <div class="exec-defaults__body">
            ${he()} ${Q(Se())}
            ${Te()} ${N()}
          </div>
        </div>
      `,o)}let xe=!1,Ue=()=>{xe=!1},je=v=>{v.target===v.currentTarget&&z()};o.addEventListener("close",Ue),o.addEventListener("cancel",Ue),o.addEventListener("click",je);let rt=null;r&&r.subscribe&&(rt=r.subscribe(()=>{xe&&we()}));let U=null;n&&n.subscribe&&(U=n.subscribe(()=>{xe&&we()}));function G(){xe||(xe=!0,we(),typeof o.showModal=="function"?o.showModal():o.setAttribute("open",""))}function z(){xe&&(xe=!1,typeof o.close=="function"?o.close():o.removeAttribute("open"))}return{open:G,close:z,destroy(){xe=!1,o.removeEventListener("close",Ue),o.removeEventListener("cancel",Ue),o.removeEventListener("click",je),rt&&(rt(),rt=null),U&&(U(),U=null),o.remove()}}}function ss(e){return typeof e=="string"&&e.length>=7?e.slice(0,7):"\u2014"}function ho(e){if(typeof e!="number"||!Number.isFinite(e)||e<0)return"\u2014";if(e<1e3)return`${Math.round(e)}ms`;let t=e/1e3;if(t<60)return`${t.toFixed(1)}\uCD08`;let r=Math.floor(t/60);return`${r}\uBD84 ${Math.round(t-r*60)}\uCD08`}function os(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";let t=new Date(e);return`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`}function Vp(e,t){let r=Array.isArray(e)?e:[],n=Array.isArray(t)?t:[];if(r.length===0&&n.length===0)return null;let s=null;for(let c of r)c.kind!=="deploy"||c.state!=="succeeded"||typeof c.target_sha!="string"||(!s||(typeof c.finished_at=="number"?c.finished_at:0)>(typeof s.finished_at=="number"?s.finished_at:0))&&(s=c);let o=r.filter(c=>c.state==="failed"&&!c.dismissed&&!c.superseded_by).length+n.length,a=r.some(c=>c.state==="repairing");return{deploy:s?{sha:ss(s.target_sha),at:typeof s.finished_at=="number"?s.finished_at:null,elapsed_ms:typeof s.elapsed_ms=="number"?s.elapsed_ms:null}:null,unresolved:o,repairing:a,badge:o>0?{tone:"act",label:`\uD574\uACB0 \uD544\uC694 ${o}`}:a?{tone:"live",label:"\uC790\uB3D9 \uD574\uACB0 \uC911"}:{tone:"quiet",label:"\uBAA8\uB450 \uC815\uC0C1"}}}function _l(e,t){let r=Vp(e,t);return r?i`<button
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
            title=${r.deploy.at?bt(r.deploy.at):""}
            >${os(r.deploy.at)}${r.deploy.elapsed_ms!==null?` \xB7 ${ho(r.deploy.elapsed_ms)}`:""}</span
          >
        </span>`:""}
    <span class="worker-repo-strip__spacer"></span>
    <span
      class="worker-repo-strip__badge worker-repo-strip__badge--${r.badge.tone}"
      >${r.badge.label}</span
    >
  </button>`:""}function Hr(e){let t=It(e.created_at),r=It(e.updated_at);return!t&&!r?"":i`<div class="worker-mini__meta">
    ${t?i`<span title=${`\uC0DD\uC131 ${bt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&r?i`<span>·</span>`:""}${r?i`<span title=${`\uC218\uC815 ${bt(e.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </div>`}function Kp(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function _n(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function as(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function Yt(e,t,r={}){let s=Object.values(e&&typeof e=="object"?e:{}).filter(f=>f&&f.bead_id===t&&f.phase!=="done").sort((f,g)=>(f.requested_at||0)-(g.requested_at||0)).at(-1),o=typeof r.attempt_id=="string"&&r.attempt_id.length>0?r.attempt_id:typeof s?.attempt_id=="string"?s.attempt_id:null,a=r.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":r.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":r.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,c=typeof s?.last_error=="string"?s.last_error:null,l=s?Kp(s.phase):null,u=r.merged||s?.mode==="merged_revert"?"merged":"unmerged";return{action:!r.external&&!r.done,enabled:!a&&(!s||!!c),label:c?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:a||(c?`\uD3D0\uAE30 \uC2E4\uD328: ${c} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:s?`${l||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:u==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:o,operation:s||null,progress:l,error:c,confirmation:u}}function nr(e){let t=e.discard;if(!t||!t.operation)return"";let r=t.operation,n=r.backup?.path,s=r.original_pr,o=r.revert_pr;return i`<div
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
  </div>`}function yo(e){let t=e.draggable&&!e.done,r=Array.isArray(e.badges)?e.badges:[],n=vt(e.usage),s=Bt(e.usage),o=e.merge_step||null,a=e.lane==="pr_wait"||!!e.revise_action,c=e.lane==="done"&&!a,l=c?It(e.done_at):"",u=t?i`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",f=typeof e.seq=="number"?i`<span class="worker-mini__seq" aria-hidden="true"
          >${e.seq}</span
        >`:"",g=e.worker_serial===!0?i`<span
          class="worker-mini__serial worker-mini__serial--legacy"
          title="legacy worker-serial 라벨 잔재 — 스케줄링에 사용되지 않습니다"
          >worker-serial</span
        >`:"",h=e.workspace_name?i`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",x=i`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,$=i`<span class="worker-mini__title">${e.title}</span>`,T=e.pr_url&&e.pr_number?i`<a
          class="worker-mini__pr"
          href=${e.pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="PR 열기"
          >#${e.pr_number} ↗</a
        >`:"",W=e.completion_repair_pr_url&&e.completion_repair_pr_number?i`<a
          class="worker-mini__pr worker-mini__repair-pr"
          href=${e.completion_repair_pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="repair PR 열기"
          >repair #${e.completion_repair_pr_number} ↗</a
        >`:"",k=r.map(he=>he===e.live_badge?i`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${he}</span
        >`:i`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${he===e.completion_badge&&e.completion_title||""}
          >${he}</span
        >`),J=e.reason?i`<span class="worker-mini__reason">${e.reason}</span>`:"",se=n.length>0?n.map(he=>i`<span class="worker-usage" title=${he.tooltip}
              >${he.label}</span
            >`):s?i`<span class="worker-usage" title=${Br(e.usage)}
            >${s}</span
          >`:"",D=o?i`<span class="merge-step"
        >${o.label}<span class="merge-step__n"
          >${o.index}/${o.total}</span
        ></span
      >`:"",F=e.merge_action?i`<button
        type="button"
        class="worker-mini__merge"
        data-bead-id=${e.id}
        ?disabled=${e.merge_enabled===!1}
        title=${e.merge_title||""}
      >
        ${e.merge_label||"\uBA38\uC9C0"}
      </button>`:"",S=e.cancel_action?i`<button
        type="button"
        class="worker-mini__merge-cancel"
        data-bead-id=${e.id}
        ?disabled=${e.cancel_enabled===!1}
        title=${e.cancel_title||""}
      >
        취소
      </button>`:"",H=e.timeline_action?i`<button
        type="button"
        class="worker-mini__timeline"
        data-bead-id=${e.id}
        title="저장소 작업이 끝나지 않아 머지 액션이 잠겼습니다 — 타임라인에서 원인과 해결 버튼을 볼 수 있습니다"
      >
        저장소 작업 보기
      </button>`:"",M=e.discard,fe=M?.action||e.discard_action?i`<button
          type="button"
          class="worker-mini__discard"
          data-bead-id=${e.id}
          data-attempt-id=${M?.attempt_id||""}
          data-operation-id=${M?.operation?.operation_id||""}
          data-discard-mode=${M?.confirmation||"unmerged"}
          ?disabled=${M?!M.enabled:e.discard_enabled===!1}
          title=${M?M.title:e.discard_enabled===!1?e.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
        >
          ${M?.label||"\uD3D0\uAE30"}
        </button>`:"",Ce=e.revise_action?i`<button
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
        </button>`:"",ce=!!(s||o||e.merge_action||e.cancel_action||e.timeline_action||e.discard_action||M?.operation||e.revise_action);return i`<div
    class="worker-mini${a?" worker-mini--card":""}${t?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${e.ghost?" worker-mini--ghost":""}${o?" worker-mini--merging":""}${e.external?" worker-mini--external":""}"
    style=${o?`--progress: ${o.percent}%`:""}
    draggable=${t?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${c?i`<div class="worker-mini__row1">${h}${x}${$}</div>
          <div class="worker-mini__row2">
            ${se}${l?i`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${bt(e.done_at)}`}
                  >완료 ${l}</span
                >`:""}${k}${D}
            <span class="worker-mini__actions"
              >${F}${S}${H}${fe}</span
            >
            ${Hr(e)}
          </div>`:a?i`<div class="worker-mini__head">
              ${u}${f}${h}${x}${T}${W}${k}${g}${J}
            </div>
            <div class="worker-mini__body">${$}</div>
            ${ce?i`<div class="worker-mini__foot">
                  ${se}${D}
                  <span class="worker-mini__actions"
                    >${F}${S}${H}${fe}${Ce}</span
                  >
                  ${nr(e)}
                </div>`:""}
            ${Hr(e)}`:i`<div class="worker-mini__line">
              ${u}${f}${h}${x}${$}${T}${W}${k}${g}${J}${se}${D}${F}${S}${H}${fe}
            </div>
            ${nr(e)} ${Hr(e)}`}
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
    ${r?Nn(r,e.status):""}
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
    ${Hr(e)}
  </div>`}function Ht(e){let t=!!e.collapsible&&!!e.collapsed,r=i`<span
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
                  </div>`:e.items.map(n=>e.lane==="candidate"?Zp(n):yo(n))}
          </div>`}
  </section>`}var ml=[{step:"merging",label:"\uBA38\uC9C0 \uC911",index:1},{step:"base_containment",label:"base \uD3EC\uD568 \uD655\uC778",index:2},{step:"repo_operations",label:"\uC800\uC7A5\uC18C \uC791\uC5C5",index:3},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC",index:4},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC",index:5},{step:"parent_close",label:"\uBD80\uBAA8 close",index:6}],mn=ml.filter(e=>e.step!=="merging").map(e=>({step:e.step,label:e.label}));function vo(e){if(typeof e!="string"||e.length===0)return null;let t=6,r=ml.find(n=>n.step===e);return r?{label:r.label,index:r.index,total:t,percent:Math.round(r.index/t*100)}:{label:e,index:0,total:t,percent:0}}function gl(e){let t=mn.findIndex(r=>r.step===e);return mn.map((r,n)=>({step:r.step,label:r.label,state:t<0?"todo":n<t?"done":n===t?"stall":"todo"}))}function Rr(e){let t=mn.find(r=>r.step===e);return t?t.label:typeof e=="string"?e:""}function Xp(e){let t=mn.findIndex(r=>r.step===e);return t<0?null:{index:t+1,total:mn.length}}function is(e){let t=Xp(e);return t?`\uBA38\uC9C0 \uC644\uB8CC \xB7 \uC815\uB9AC ${t.total}\uB2E8\uACC4 \uC911 ${t.index}\uB2E8\uACC4\uC5D0\uC11C \uBA48\uCDA4`:"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644"}var bl={verify_failed:"\uAC80\uC99D \uC2E4\uD328",verify_cmd_failed:"\uAC80\uC99D \uC2E4\uD328",verify_script_failure:"\uAC80\uC99D \uC2E4\uD328",deploy_failed:"\uBC30\uD3EC \uC2E4\uD328",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328",interrupted_without_terminal_exit:"\uC911\uB2E8\uB428"},hl={repo_ops_worktree_unowned:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uAC00 \uC544\uC9C1 Worker \uC18C\uC720\uAC00 \uC544\uB2C8\uC5B4\uC11C \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804\uC5D0 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",verify_cmd_failed:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D \uBA85\uB839\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",gh_observation_failed:"GitHub\uC5D0\uC11C PR \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_script_failure:"\uAC80\uC99D \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",deploy_script_failure:"\uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",interrupted_without_terminal_exit:"\uC791\uC5C5\uC774 \uC885\uB8CC \uAE30\uB85D \uC5C6\uC774 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4."};function yl(e){return typeof e!="string"||e.length===0?[]:e.split(":").filter(t=>t.length>0)}function wo(e){for(let t of yl(e))if(Object.hasOwn(bl,t))return bl[t];return null}function ko(e){let t=null;for(let r of yl(e))Object.hasOwn(hl,r)&&(t=hl[r]);return t}function ls(e){let t=wo(e),r=ko(e);return t&&r?`${t} \u2014 ${r}`:t||r?t||r:typeof e=="string"?e:""}function vl(e,t){let r=wo(e)??wo(t),n=ko(t)??ko(e);return r&&n?`${r} \u2014 ${n}`:r||n?r||n:typeof t=="string"?t:""}var wl=160;function Qp(e){return e.length>wl?`${e.slice(0,wl)}\u2026`:e}function Jp(e){return!e||!e.reason?"":i`<div class="worker-banner__detail">
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
  </details>`:""}function $o(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),r=Math.floor(t/60),n=t%60;return r>0?`${r}m ${String(n).padStart(2,"0")}s`:`${n}s`}function kl(e){let t=e.failure?ls(e.failure.reason):"";return i`<div class="worker-banners">
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
          ${nr({discard:e.failure.discard})}
        </div>`:""}
  </div>`}function tf(e,t,r=null){let n=e.failed===!0,s=!!e.paused,o=n?e.status_label||(e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):s?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?$o(t-e.started_at):"\u2014",a=Gt(e),c=cr(e),l=vt(e.usage),u=Bt(e.usage),f=e.conflict_resolution?s?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,g=e.base_exception||null,h=e.attempt_id&&e.attempt_id===r,x=e.discard?.action?i`<button
        type="button"
        class="rtile__discard"
        data-operation-id=${e.discard.operation?.operation_id||""}
        ?disabled=${!e.discard.enabled}
        title=${e.discard.title}
        aria-label=${e.discard.label}
      >
        ${e.discard.label}
      </button>`:"";return i`<div
    class="rtile${h?" rtile--sel":""}${s?" rtile--paused":""}${n?" rtile--failed":""}"
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
            ${x}
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
            ${x}`}
    </div>
    <div class="rtile__title">${e.title}</div>
    ${e.current_child?i`<div class="rtile__child" title="현재 진행중 child">
          └ ${e.current_child}
        </div>`:""}
    ${a||l.length>0||u||f||g?i`<div class="rtile__meta">
          ${f?i`<span class="worker-mini__badge">${f}</span>`:""}
          ${g?i`<span
                class="worker-mini__badge"
                title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
                >${g}</span
              >`:""}
          ${a?i`<span class="rtile__runner">${a}</span>`:""}
          ${l.length>0?l.map($=>i`<span class="worker-usage" title=${$.tooltip}
                    >${$.label}</span
                  >`):u?i`<span
                  class="worker-usage"
                  title=${Br(e.usage)}
                  >${u}</span
                >`:""}
        </div>`:""}
    ${Hr(e)} ${nr(e)}
    <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일): 큐
         스냅샷에는 페이즈명도 진행률도 없으므로 진행 바는 만들지 않는다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
    ${n||s?"":i`<div class="rtile__accent" aria-hidden="true"></div>`}
  </div>`}function xo(e,t=Date.now(),r=null){let n=Array.isArray(e)?e:[];return i`<div class="worker-rungrid" id="worker-rungrid">
    ${n.length===0?i`<div class="worker-rungrid__empty">실행 세션 없음</div>`:n.map(s=>tf(s,t,r))}
  </div>`}function _r(e){return i`<svg
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
  </svg>`}function So(){return _r(Zt`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function Ao(){return _r(Zt`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function $l(){return _r(Zt`<rect x="4.3" y="4.3" width="7.4" height="7.4" rx="1.2" />`)}function xl(){return _r(Zt`<path d="M4.4 4.4 11.6 11.6M11.6 4.4 4.4 11.6" />`)}function Sl(){return _r(Zt`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function Al(){return _r(Zt`<rect x="2.6" y="2.6" width="7.4" height="7.4" rx="1.2" />
    <path d="M6 13.4h6a1.4 1.4 0 0 0 1.4-1.4V6" />`)}function Tl(){return _r(Zt`<circle cx="8" cy="8" r="2.1" />
    <path
      d="M8 1.9v1.8M8 12.3v1.8M1.9 8h1.8M12.3 8h1.8M3.7 3.7l1.3 1.3M11 11l1.3 1.3M12.3 3.7 11 5M5 11l-1.3 1.3"
    />`)}function El(){return _r(Zt`<path d="M3 3.6 8.2 8 3 12.4z" />
    <path d="M8.8 3.6 14 8l-5.2 4.4z" />`)}var gn=1,rf=6e4,nf={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328"},sf=new Set(["auto_merge","merged","merge","done"]),Cl={running:3,paused:2,failed:1};function of(e,t){let r=null,n=-1/0;for(let s of Object.values(e)){if(!s||s.bead_id!==t||s.status==="running")continue;let o=typeof s.finished_at=="number"?s.finished_at:typeof s.started_at=="number"?s.started_at:0;o>=n&&(n=o,r=s)}return r}function af(e,t){let r=Object.values(e||{}),n=new Set,s=new Map;for(let a of r)!a||typeof a.bead_id!="string"||(typeof a.resumed_from=="string"&&a.resumed_from.length>0&&n.add(a.resumed_from),s.set(a.bead_id,a.attempt_id));let o=new Map;for(let a of r){if(!a||typeof a.bead_id!="string"||a.bead_id.length===0)continue;let c=null;if(a.status==="running")c="running";else if(a.status==="paused"&&!n.has(a.attempt_id))c="paused";else if(a.status==="failed"||a.status==="orphaned"){let g=t.get(a.bead_id),h=typeof g=="number"&&g>0&&typeof a.finished_at=="number"&&g>=a.finished_at;s.get(a.bead_id)===a.attempt_id&&!h&&typeof a.dismissed_at!="number"&&(c="failed")}if(!c)continue;let l=typeof a.started_at=="number"?a.started_at:null,u=o.get(a.bead_id);if(u){let g=Cl[u.run_state],h=Cl[c];if(g>h||g===h&&(u.started_at??0)>(l??0))continue}let f=typeof a.session_id=="string"&&a.session_id.length>0;o.set(a.bead_id,{attempt_id:typeof a.attempt_id=="string"?a.attempt_id:"",run_state:c,started_at:l,last_event_at:typeof a.last_event_at=="number"?a.last_event_at:null,runner:typeof a.runner=="string"?a.runner:null,model:typeof a.model=="string"?a.model:null,effort:typeof a.effort=="string"?a.effort:null,speed:typeof a.speed=="string"?a.speed:null,resumed_from:typeof a.resumed_from=="string"?a.resumed_from:null,continuation_mode:a.continuation_mode==="session"||a.continuation_mode==="fresh"?a.continuation_mode:null,usage:Dt(e,a.bead_id),can_pause:c==="running"&&f,can_resume:c!=="running"&&f&&!n.has(a.attempt_id)})}return o}function Rl(e,t){let r=e[t];if(!r)return"";if(r.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let n=typeof r.reason=="string"?r.reason:"",s=n.indexOf(":");return s>0&&s<n.length-1?`\u26D4 ${n.slice(0,s)} (${n.slice(s+1)})`:`\u26D4 ${n}`}function Lt(e){return e&&typeof e=="object"?e:{}}function To(e,t,r){let n=Array.isArray(e)?e:[],s=Array.isArray(t)?t:[],o=r&&typeof r.done_since=="number"?r.done_since:void 0,a=new Map;for(let k of s)k&&typeof k.root_dir=="string"&&a.set(k.root_dir,k);let c=[],l=[],u=[],f=[],g=[],h=new Map;for(let k of n){if(!k||typeof k.root_dir!="string")continue;let J=k.root_dir,se=k.name||J,D=a.get(J),F=D&&typeof D.revision=="number"?D.revision:typeof k.revision=="number"?k.revision:0,S=Lt(k.attempts),H=Lt(k.bead_titles),M=Lt(k.pr_observations),fe=Lt(k.admission),Ce=Lt(k.revise_parked),ce=Lt(k.merge_queue_state),he=Lt(k.cleanup_failed),Se=Lt(k.discard_operations),Re=Array.isArray(k.merge_queue)?k.merge_queue:[],Ve=new Set(Re.filter(A=>A&&typeof A.bead_id=="string").map(A=>A.bead_id)),Oe=new Map(Re.filter(A=>A&&typeof A.bead_id=="string").map(A=>[A.bead_id,A])),Ae=Array.isArray(k.queue)?k.queue:[],be=Array.isArray(k.done)?k.done:[],_e=new Map;for(let A of be)A&&typeof A.bead_id=="string"&&typeof A.added_at=="number"&&_e.set(A.bead_id,A.added_at);let ve=A=>({id:A,title:H[A]||A,root_dir:J,workspace_name:se,expected_revision:F,draggable:!1}),N=new Set;for(let[A,I]of af(S,_e))N.add(A),l.push({...ve(A),lane:"running",attempt_id:I.attempt_id,run_state:I.run_state,can_pause:I.can_pause,can_resume:I.can_resume,started_at:I.started_at,last_event_at:I.last_event_at,runner:I.runner,model:I.model,effort:I.effort,speed:I.speed,resumed_from:I.resumed_from,continuation_mode:I.continuation_mode,usage:I.usage,discard:Yt(Se,A,{attempt_id:I.attempt_id}),badges:I.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:I.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:[],alert:I.run_state==="failed"});for(let A of Array.isArray(k.pr_wait)?k.pr_wait:[]){let I=A&&A.bead_id;if(typeof I!="string"||N.has(I))continue;N.add(I);let te=Lt(M[I]),V=Lt(te.pr),Q=te.gate?Lt(te.gate):null,R=Ve.has(I),j=Oe.get(I)?.continuation_action||null,ue=!!j&&j.continuation===null,me=ce.active===I,Te=A.external===!0,we=he[I]||null,xe=!!Q&&Q.base_badge==="\uCDA9\uB3CC",Ue=!!we&&["child_sweep","branch_cleanup","parent_close"].includes(we.step)&&!!Q&&Q.tier==="merged",je=Te&&!!we&&!!Q&&Q.tier==="merged",rt=!!Q&&["closed_unmerged","review","undecidable"].includes(Q.tier),U=Yt(Se,I,{external:Te,merge_active:me,merge_queued:R,merged:!!we||Q?.tier==="merged"}),G=!!U.operation;u.push({...ve(I),lane:"pr_wait",pr_number:typeof V.number=="number"?V.number:null,pr_url:typeof V.url=="string"?V.url:void 0,external:Te,usage:Dt(S,I),badges:ue?["\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"]:we?[Rr(we.step)?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${Rr(we.step)}`:"\uC815\uB9AC \uBA48\uCDA4"]:typeof Q?.gate_badge=="string"&&Q.gate_badge.length>0?[Q.gate_badge]:[],alert:!!we||rt,reason:we?is(we.step):"PR \uB300\uAE30",merge_action:!R||ue,merge_enabled:!G&&(ue||Q?.enabled===!0||xe||Ue||je),merge_label:ue?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":je||Ue?"\uC815\uB9AC \uC7AC\uAC1C":xe&&!Ue?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:ue?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":G?U.error?`\uD3D0\uAE30 \uC2E4\uD328: ${U.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${U.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:je?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Ue?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":xe?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":Q?.enabled===!0?`\uBA38\uC9C0 (${Q.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${Q?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:R&&!ue,cancel_enabled:!me,continuation_mismatch:j?.mismatch||null,discard:U,discard_action:U.action,discard_enabled:U.enabled,discard_title:U.title})}for(let A=0;A<Ae.length;A++){let I=Ae[A],te=I&&I.bead_id;if(typeof te!="string"||N.has(te))continue;N.add(te);let V=Ce[te],Q=Yt(Se,te),R=Q.operation?Q:null,j={...ve(te),lane:"queue",draggable:!R,discard:R||void 0,reason:Rl(fe,te),queue_position:A+1,queue_index:A,queue_length:Ae.length,badges:V?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!V,revise_action:!!V,revise_enabled:!!V&&!R,revise_title:V?V.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${V.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""};f.push(j);let ue=h.get(J);ue?ue.push(j):h.set(J,[j])}for(let A of Array.isArray(k.runnable)?k.runnable:[]){let I=A&&A.bead_id;typeof I!="string"||N.has(I)||(N.add(I),c.push({...ve(I),title:A.title||H[I]||I,lane:"runnable",draggable:!0,reason:Rl(fe,I),created_at:A.created_at??void 0,updated_at:A.updated_at??void 0,labels:Array.isArray(A.labels)?A.labels:[],spec_reviewer:typeof A.spec_reviewer=="string"?A.spec_reviewer:void 0,plan_state:A.plan_state==="approved"||A.plan_state==="authored"?A.plan_state:"none",workflow:A.route?{route:A.route,chips:{route:A.route}}:null,place_index:Ae.length}))}for(let A of be){let I=A&&A.bead_id;if(typeof I!="string"||N.has(I)||(N.add(I),o!==void 0&&typeof A.added_at=="number"&&A.added_at<o))continue;let te=of(S,I);g.push({...ve(I),lane:"done",done:!0,usage:Dt(S,I),done_at:typeof A.added_at=="number"?A.added_at:void 0,done_kind:te&&typeof te.done_kind=="string"?te.done_kind:null})}}let x=new Map;s.forEach((k,J)=>{k&&typeof k.root_dir=="string"&&x.set(k.root_dir,J)});let $=r&&r.running_sort==="repo"?"repo":"started";l.sort((k,J)=>{if($==="repo"){let F=x.get(k.root_dir)??Number.MAX_SAFE_INTEGER,S=x.get(J.root_dir)??Number.MAX_SAFE_INTEGER;if(F!==S)return F-S}let se=typeof k.started_at=="number"&&Number.isFinite(k.started_at)?k.started_at:null,D=typeof J.started_at=="number"&&Number.isFinite(J.started_at)?J.started_at:null;return se!==null&&D!==null&&se!==D?se-D:se===null&&D!==null?1:se!==null&&D===null?-1:k.id.localeCompare(J.id)}),g.sort((k,J)=>(J.done_at??0)-(k.done_at??0));let T=s.length>0?s:n.map(k=>({root_dir:k&&k.root_dir,name:k&&k.name,auto_advance:k&&k.auto_advance,auto_merge:k&&k.auto_merge,slots:k&&k.slots,revision:k&&k.revision,exec_defaults:k&&k.exec_defaults,default_exec_preset_id:k&&k.default_exec_preset_id,runner_catalog:k&&k.runner_catalog})),W=[];for(let k of T)!k||typeof k.root_dir!="string"||W.push({root_dir:k.root_dir,name:k.name||k.root_dir,auto_advance:k.auto_advance===!0,auto_merge:k.auto_merge===!0,slots:typeof k.slots=="number"&&k.slots>=gn?k.slots:gn,revision:typeof k.revision=="number"?k.revision:0,exec_defaults:Lt(k.exec_defaults),default_exec_preset_id:typeof k.default_exec_preset_id=="string"?k.default_exec_preset_id:null,runner_catalog:Lt(k.runner_catalog),items:h.get(k.root_dir)||[]});return{runnable:c,queue:f,queue_groups:W,running:l,pr_wait:u,done:g,automation:{total:W.length,both_on:W.filter(k=>k.auto_advance&&k.auto_merge).length}}}function lf(e,t){if(typeof e!="number"||!Number.isFinite(e))return"";let n=t-e<rf;return i`<span
    class="mon-beat${n?" mon-beat--live":""}"
    title=${`\uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${bt(e)}`}
    ><span class="mon-beat__dot" aria-hidden="true"></span>${n?"":i`<span class="mon-beat__age"
          >${It(e,t)}</span
        >`}</span
  >`}function bn(e){return i`<div class="mon-c__title">${e.title}</div>`}function hn(e){return i`<span class="mon-c__id" title="클릭하면 상세로 이동"
    >${e.id}</span
  >`}function cs(e){return e.workspace_name?i`<span class="mon-c__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:""}function Eo(e){let t=vt(e.usage),r=Bt(e.usage);return t.length>0?t.map(n=>i`<span class="mon-c__usage" title=${n.tooltip}
          >${n.label}</span
        >`):r?i`<span class="mon-c__usage" title=${Br(e.usage)}
        >${r}</span
      >`:""}function Co(e){return(Array.isArray(e.badges)?e.badges:[]).map(r=>i`<span class="mon-c__badge${e.alert?" mon-c__badge--alert":""}"
        >${r}</span
      >`)}function cf(e){return i`<span class="mon-c__ops">
    ${e.run_state==="running"?i`<button
          type="button"
          class="mon-op mon-op--pause"
          ?disabled=${e.can_pause===!1}
          aria-label="일시정지"
          title="일시정지 — 세션을 끊고 이어하기 가능 상태로 둡니다"
        >
          ${Ao()}
        </button>`:i`<button
          type="button"
          class="mon-op mon-op--resume"
          ?disabled=${e.can_resume===!1}
          aria-label="이어하기"
          title="이어하기"
        >
          ${So()}
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
          ${xl()}
        </button>`:""}
  </span>`}function df(e,t){let r=typeof e.started_at=="number"?$o(t-e.started_at):"";return i`${bn(e)}
    <div class="mon-c__meta">
      ${Co(e)}${lf(e.last_event_at,t)}${hn(e)}${cs(e)}
      ${Gt(e)?i`<span class="mon-c__model">${Gt(e)}</span>`:""}
      ${cr(e)?i`<span
            class="rtile__resumed"
            title=${cr(e)}
            >↻</span
          >`:""}
      ${r?i`<span class="mon-live__elapsed">${r}</span>`:""}
      ${Eo(e)}${cf(e)}${nr(e)}
    </div>`}function uf(e){let t=e.workflow,n=(t&&t.chips||{}).route||t&&t.route,s=typeof e.spec_reviewer=="string"?e.spec_reviewer:"",o=e.plan_state==="approved"?"plan \u2713":e.plan_state==="authored"?"plan \u270E":"plan \u2013",a=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),c=It(e.updated_at);return i`${bn(e)}
    <div class="mon-c__meta">
      <span class="mon-c__grip" aria-hidden="true">⠿</span>${hn(e)}
      ${n?i`<span class="ctl-chip ctl-chip--route">${n}</span>`:""}
      ${s?i`<span
            class="ctl-chip mon-c__review${s==="skipped"?" mon-c__review--dim":""}"
            >spec:${s}</span
          >`:""}
      ${n==="full_plan"?i`<span
            class="ctl-chip mon-c__plan${e.plan_state==="none"?" mon-c__review--dim":""}"
            >${o}</span
          >`:""}
      ${Mn(e.labels,null).map(l=>i`<span class="ctl-chip ctl-chip--label">${l}</span>`)}
      ${cs(e)}
      ${c?i`<span title=${`\uC218\uC815 ${bt(e.updated_at)}`}
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
    </div>`}function pf(e){let t=!!e.discard?.operation;return i`${bn(e)}
    <div class="mon-c__meta">
      <span class="mon-c__grip" aria-hidden="true">⠿</span>
      <span class="mon-live__pos">#${e.queue_position}</span>${hn(e)}
      ${Co(e)}
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
    ${nr(e)}
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
        </div>`:""}`}function ff(e){let t=!!(Bt(e.usage)||e.merge_action||e.cancel_action||e.discard_action);return i`${bn(e)}
    <div class="mon-c__meta">
      ${hn(e)}${cs(e)}
      ${e.pr_url&&e.pr_number?i`<a
            class="mon-c__pr"
            href=${e.pr_url}
            target="_blank"
            rel="noreferrer noopener"
            title="PR 열기"
            >#${e.pr_number} ↗</a
          >`:""}
      ${Co(e)}
      ${e.reason?i`<span class="mon-c__reason">${e.reason}</span>`:""}
    </div>
    ${t?i`<div class="mon-c__tail">
          ${Eo(e)}
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
          ${nr(e)}
        </div>`:""}`}function _f(e,t){let r=e.done_kind||"",n=r?nf[r]||r:"",s=It(e.done_at,t);return i`${bn(e)}
    <div class="mon-c__meta">
      ${hn(e)}${cs(e)}
      ${n?i`<span
            class="mon-live__kind${sf.has(r)?" mon-live__kind--ok":" mon-live__kind--warn"}"
            >${n}</span
          >`:""}
      ${Eo(e)}
      ${s?i`<span title=${`\uC644\uB8CC ${bt(e.done_at)}`}
            >완료 ${s}</span
          >`:""}
    </div>`}function Il(e,t){return e.lane==="running"?df(e,t):e.lane==="runnable"?uf(e):e.lane==="queue"?pf(e):e.lane==="pr_wait"?ff(e):_f(e,t)}function Ll(e){let t=String(e.revision);return i`<header
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
        ${e.auto_advance?Ao():So()}
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
        ${Sl()}
        <span class="mon-ctl__label">머지</span>
      </button>
      <label class="mon-ctl mon-ctl--slots" title="동시에 실행할 세션 수">
        ${Al()}
        <span class="mon-ctl__label">슬롯</span>
        <input
          type="number"
          class="mon-slots__input"
          min=${gn}
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
        ${Tl()}
        <span class="mon-ctl__label">설정</span>
      </button>
    </span>
  </header>`}function Ol(e){let{total:t,both_on:r}=e.automation,n=t>0&&r===t,s=e.running_sort==="repo"?"repo":"started",o=Wt.find(c=>c.value===e.done_range)?.label||"",a=Array.isArray(e.token_total)?e.token_total:e.token_total?[{label:e.token_total,tooltip:e.token_tooltip}]:[];return i`<div class="mon-top">
    <button
      type="button"
      class="mon-auto-all${n?" is-active":""}"
      data-on=${n?"false":"true"}
      aria-pressed=${n?"true":"false"}
      ?disabled=${t===0}
      title=${n?"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uB055\uB2C8\uB2E4 (\uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4)":"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uCF2D\uB2C8\uB2E4"}
    >
      ${n?$l():El()}
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
        ${Wt.map(c=>i`<option
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
  </div>`}function Dl(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function Ml(e){let t=(Array.isArray(e)?e:[]).map(c=>c&&c.usage).filter(c=>c&&typeof c=="object"&&"providers"in c);if(t.length>0)return vt(qn(t));let r={};for(let c of Qt)r[c]=0;let n=!1,s=0,o=0,a=0;for(let c of Array.isArray(e)?e:[]){let l=c&&c.usage;if(l&&typeof l=="object"){let u=!1;for(let f of Qt){let g=l[f];typeof g=="number"&&Number.isFinite(g)&&(r[f]+=g,n=!0,u=!0)}if(u){o+=1;let f=l.total_cost_usd;typeof f=="number"&&Number.isFinite(f)&&(s+=f,a+=1)}}}return o>0&&a===o&&(r.total_cost_usd=s),n?Bt(r):null}var Pl="bdui.monitor.done-range",Fl="bdui.monitor.running_sort";function mf(){try{let e=window.localStorage.getItem(Pl);return Ot(e)?e:Rt}catch{return Rt}}function gf(e){try{window.localStorage.setItem(Pl,e)}catch{}}function bf(){try{return window.localStorage.getItem(Fl)==="repo"?"repo":"started"}catch{return"started"}}function hf(e){try{window.localStorage.setItem(Fl,e)}catch{}}var ql="tab:monitor:pipeline",yf=1e3,vf=[{lane:"runnable",pane:"candidate",title:"\uC2E4\uD589\uAC00\uB2A5",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589\uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}];function Nl(e,t){let r=(e.lane==="runnable"||e.lane==="queue")&&e.draggable!==!1;return i`<div
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
    ${Il(e,t)}
  </div>`}function Bl(e,t){let r=at("views:monitor"),n=t.gotoIssue,s=t.pipelineStore,o=t.transport,a=t.execPresetStore,c=t.getWorkspacePath,l=t.switchWorkspace,u=t.now||(()=>Date.now()),f=t.confirm||(U=>typeof globalThis.confirm!="function"||globalThis.confirm(U)),g=mf(),h=bf();function x(){let U=Wt.find(G=>G.value===g);return U?U.label:""}let $=document.createElement("div");$.className="mon",e.appendChild($);let T=To(null,null),W=null,k=new Map,J=new Set;function se(U){return T.queue_groups.find(G=>G.root_dir===U)||null}let F=ns(e,{queueStore:{get(){if(!W)return{revision:0,exec_defaults:{},default_exec_preset_id:null};let U=k.get(W);if(U)return U;let G=se(W),z=s&&s.get?s.get():null,v=(Array.isArray(z)?z:[]).find(C=>C&&C.root_dir===W);return{revision:G?G.revision:0,exec_defaults:G?G.exec_defaults:{},default_exec_preset_id:G?G.default_exec_preset_id:null,runner_catalog:G?G.runner_catalog:null,workspace_info:v?v.workspace_info:void 0}},set(U){W&&k.set(W,U);for(let G of Array.from(J))G()},subscribe(U){return J.add(U),()=>J.delete(U)}},presetStore:a,transport:o?(U,G)=>o(U,U==="worker-queue-set-default-exec-preset"||U==="get-worker-system-prompt"?{...G||{},root_dir:W}:G):void 0}),S=null,H=null;async function M(U,G,z,v,C=!0){if(!o||!z)return null;let q=await o(U,{...G,root_dir:z,expected_revision:v});if(q&&q.conflict&&C){q.queue&&k.set(z,q.queue);let K=q.queue&&typeof q.queue.revision=="number"?q.queue.revision:v;q=await o(U,{...G,root_dir:z,expected_revision:K})}return q&&q.queue&&z&&k.set(z,q.queue),q}function fe(U,G){let z=k.get(U),v=s&&s.get?s.get():null,C=(Array.isArray(v)?v:[]).find(K=>K?.root_dir===U);return(z||C)?.merge_queue?.find(K=>K.bead_id===G)?.continuation_action}async function Ce(U,G,z,v){let C=await M(U,G,z,v),q=k.get(z)?.revision??C?.queue?.revision??v;return Xt(C,(K,ee)=>M(U,{...G,continuation:K,decision_token:ee},z,q,!1),{refresh:K=>M(U,G,z,K?.queue?.revision??k.get(z)?.revision??q,!1)})}async function ce(U,G,z,v){let C=await Xt({continuation_mismatch:v},(K,ee)=>M("worker-merge-queue-add",{bead_id:G,continuation:K,decision_token:ee},U,z,!1)),q=C?.queue?.merge_queue?.find(K=>K.bead_id===G)?.continuation_action;C?.applied!==!0&&q?.continuation===null&&q.mismatch&&await ce(U,G,C.queue.revision,q.mismatch)}async function he(U,G,z){let v=await M("worker-discard",U,G,z);if(v&&v.discarded===!0){re(as(v),"success",5e3);return}if(v&&v.reason){re(`\uD3D0\uAE30 \uC2E4\uD328: ${v.reason}`,"error");return}if(v&&v.accepted&&v.pending==="merged_revert"){re("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if(v&&v.accepted){re(`\uD3D0\uAE30 \uC9C4\uD589: ${v.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}v&&!v.conflict&&re("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function Se(U,G,z){return!o||!z?null:await o(U,{...G,root_dir:z})}async function Re(U){if(!o||!U&&!f("\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB055\uB2C8\uB2E4. \uAC01 \uB808\uD3EC\uC758 \uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uD568\uAED8 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?"))return;let G=await o("monitor-auto-toggle",{on:U}),z=G&&Array.isArray(G.failed)?G.failed:[];z.length>0&&re(`\uC790\uB3D9\uD654 ${U?"\uCF1C\uAE30":"\uB044\uAE30"} \uC77C\uBD80 \uC2E4\uD328: ${z.map(v=>v.root_dir).join(", ")}`,"error",3200)}async function Ve(){let U=new Map;for(let G of T.pr_wait)U.has(G.root_dir)||U.set(G.root_dir,G.expected_revision);for(let[G,z]of U)await M("worker-merge-queue-add-all",{},G,z)}let Oe=null,Ae=!1,be=null;function _e(){be!==null&&clearTimeout(be),be=setTimeout(()=>{be=null,Ae=!1},0)}function ve(U){let G=U.target;return typeof G?.closest=="function"?G.closest(".mon-group"):null}function N(U){let G=ve(U);return!G||!Oe?null:(G.getAttribute("data-root-dir")||"")===Oe.root_dir?G:null}function A(){for(let U of Array.from($.querySelectorAll(".mon-group--drag-over")))U.classList.remove("mon-group--drag-over")}function I(U){let G=U.target,z=typeof G?.closest=="function"?G.closest('.mon-card[draggable="true"]'):null;if(z){Oe={bead_id:z.getAttribute("data-issue-id")||"",lane:z.getAttribute("data-lane")||"",root_dir:z.getAttribute("data-root-dir")||"",revision:Number(z.getAttribute("data-revision")||0)||0,queue_index:Number(z.getAttribute("data-queue-index")),queue_length:Number(z.getAttribute("data-queue-length")),place_index:Number(z.getAttribute("data-place-index"))},Ae=!0;try{U.dataTransfer?.setData("text/plain",Oe.bead_id),U.dataTransfer&&(U.dataTransfer.effectAllowed="move")}catch{}}}function te(U){let G=N(U);G&&(U.preventDefault(),U.dataTransfer&&(U.dataTransfer.dropEffect="move"),G.classList.add("mon-group--drag-over"))}function V(U){ve(U)?.classList.remove("mon-group--drag-over")}function Q(){Oe=null,A(),_e()}function R(U){let G=N(U),z=Oe;if(Oe=null,A(),!G||!z||!z.bead_id)return;U.preventDefault();let v=U.target,C=typeof v?.closest=="function"?v.closest('.mon-card[data-lane="queue"]'):null,q=C&&G.contains(C)?Number(C.getAttribute("data-queue-index")):NaN;if(z.lane==="runnable"){let De=Number.isFinite(q)?q:z.place_index;if(!Number.isFinite(De))return;M("worker-queue-place",{bead_id:z.bead_id,index:De},z.root_dir,z.revision);return}if(z.lane!=="queue"||C&&C.getAttribute("data-issue-id")===z.bead_id)return;let K=z.queue_index,ee=Number.isFinite(q)?K>q?q:q-1:z.queue_length-1;!Number.isFinite(ee)||ee<0||ee===K||M("worker-queue-reorder",{bead_id:z.bead_id,to_index:ee},z.root_dir,z.revision)}function j(U){let G={runnable:T.runnable,queue:T.queue,running:T.running,pr_wait:T.pr_wait,done:T.done};return i`${Ol({automation:T.automation,counts:{running:T.running.length,queue:T.queue.length,pr_wait:T.pr_wait.length},running_sort:h,done_range:g,token_total:Ml(T.done),token_tooltip:Dl(x())})}
      <div class="worker-lanes mon-lanes">
        ${vf.map(z=>{let v=G[z.lane],C=z.lane==="queue"?T.queue_groups.length>0?i`${T.queue_groups.map(q=>i`<div
                        class="mon-group"
                        data-root-dir=${q.root_dir}
                      >
                        ${Ll(q)}
                        <div class="mon-group__list">
                          ${q.items.map(K=>Nl(K,U))}
                        </div>
                      </div>`)}`:void 0:v.length>0?i`${v.map(q=>Nl(q,U))}`:void 0;return Ht({id:`monitor-${z.lane}`,lane:z.pane,title:z.lane==="done"?`\uC644\uB8CC\xB7${x()}`:z.title,items:v,empty:z.empty,body:C,live:z.lane==="running"&&v.length>0,header_control:z.lane==="pr_wait"&&v.length>0?i`<button
                    type="button"
                    class="mon-lane-op mon-merge-all"
                    title="자격이 생기는 PR을 각 레포의 머지 큐에 한 번에 넣습니다"
                  >
                    일괄 머지
                  </button>`:""})})}
      </div>`}function ue(){let U=s&&s.get?s.get():null,G=s&&s.getWorkspacesState?s.getWorkspacesState():[],z=u();T=To(U,G,{done_since:wr(g,z),running_sort:h}),Pe(j(z),$)}function me(U,G){let z=c?c():void 0;if(!G||!z||G===z||!l){n(U);return}l(G).then(()=>{n(U)}).catch(v=>{r("workspace switch for %s failed: %o",G,v)})}function Te(U){return{root_dir:U.getAttribute("data-root-dir")||"",revision:Number(U.getAttribute("data-revision")||0)||0}}function we(U,G){let{root_dir:z,revision:v}=Te(U),C=U.getAttribute("data-issue-id")||"",q=G.dataset.attemptId||U.getAttribute("data-attempt-id")||"",K=G.classList;if(K.contains("worker-card__place")){M("worker-queue-place",{bead_id:C,index:Number(U.getAttribute("data-place-index")||0)||0},z,v);return}if(K.contains("mon-op--up")||K.contains("mon-op--down")){let ee=Number(U.getAttribute("data-queue-index")||0)||0,De=K.contains("mon-op--up")?ee-1:ee+1;if(De<0)return;M("worker-queue-reorder",{bead_id:C,to_index:De},z,v);return}if(K.contains("mon-op--remove")){M("worker-queue-remove",{bead_id:C},z,v);return}if(K.contains("mon-op--pause")){Se("worker-attempt-pause",{attempt_id:q},z);return}if(K.contains("mon-op--discard")){if(!f(_n(C,"unmerged")))return;he({bead_id:C,...q?{attempt_id:q}:{},...G.dataset.operationId?{operation_id:G.dataset.operationId}:{}},z,v);return}if(K.contains("mon-op--resume")){Ce("worker-attempt-resume",{attempt_id:q},z,v);return}if(K.contains("mon-op--dismiss")){M("worker-attempt-dismiss",{attempt_id:q},z,v);return}if(K.contains("worker-mini__merge")){let ee=fe(z,C);ee?.mismatch&&ee.continuation===null?ce(z,C,v,ee.mismatch):M("worker-merge-queue-add",{bead_id:C},z,v);return}if(K.contains("worker-mini__merge-cancel")){M("worker-merge-queue-remove",{bead_id:C},z,v);return}if(K.contains("worker-mini__discard")){let ee=G.dataset.discardMode==="merged"?"merged":"unmerged";if(!f(_n(C,ee)))return;he({bead_id:C,...q?{attempt_id:q}:{},...G.dataset.operationId?{operation_id:G.dataset.operationId}:{}},z,v);return}if(K.contains("worker-mini__revise-fix")){Ce("worker-revise-fix",{bead_id:C},z,v);return}K.contains("worker-mini__revise-approve")&&M("worker-revise-approve",{bead_id:C},z,v)}function xe(U){let G=Ae;Ae=!1;let z=U.target;if(!z||typeof z.closest!="function"||z.closest("dialog")||z.closest("a"))return;let v=z.closest(".mon-running-sort");if(v){U.preventDefault(),h=v.getAttribute("data-sort")==="repo"?"repo":"started",hf(h),ue();return}let C=z.closest(".mon-auto-all");if(C){U.preventDefault(),Re(C.getAttribute("data-on")==="true");return}if(z.closest(".mon-merge-all")){U.preventDefault(),Ve();return}let K=z.closest(".mon-ctl--advance");if(K){U.preventDefault();let{root_dir:lt,revision:ot}=Te(K);M("worker-automation-toggle",{on:K.getAttribute("data-on")==="true"},lt,ot);return}let ee=z.closest(".mon-ctl--merge-auto");if(ee){U.preventDefault();let{root_dir:lt,revision:ot}=Te(ee);M("worker-merge-auto-toggle",{on:ee.getAttribute("data-on")==="true"},lt,ot);return}let De=z.closest(".mon-ctl--exec");if(De){U.preventDefault(),W=De.getAttribute("data-root-dir")||null,k.delete(W||""),F.open();return}let Ee=z.closest(".mon-card");if(!Ee)return;let Me=z.closest("button");if(Me){U.preventDefault(),we(Ee,Me);return}let ze=Ee.getAttribute("data-issue-id");ze&&!G&&(U.preventDefault(),me(ze,Ee.getAttribute("data-root-dir")||""))}function Ue(U){let G=U.target;if(!G||typeof G.closest!="function")return;let z=G.closest(".mon-done-range");if(z){g=Ot(z.value)?z.value:Rt,gf(g),ue();return}let v=G.closest(".mon-slots__input");if(!v)return;let{root_dir:C,revision:q}=Te(v),K=Number(v.value);if(!Number.isFinite(K))return;let ee=Math.max(gn,Math.floor(K));M("worker-queue-set-slots",{slots:ee},C,q)}e.addEventListener("click",xe),e.addEventListener("change",Ue),e.addEventListener("dragstart",I),e.addEventListener("dragover",te),e.addEventListener("dragleave",V),e.addEventListener("drop",R),e.addEventListener("dragend",Q),s&&typeof s.subscribe=="function"&&(S=s.subscribe(()=>{try{k.clear(),ue();for(let U of Array.from(J))U()}catch{}}));function je(){H!==null&&(clearInterval(H),H=null)}function rt(){be!==null&&(clearTimeout(be),be=null)}return{load(){r("load"),ue(),H===null&&(H=setInterval(()=>{try{ue()}catch{}},yf))},pause(){je()},clear(){je(),rt(),S&&(S(),S=null),e.removeEventListener("click",xe),e.removeEventListener("change",Ue),e.removeEventListener("dragstart",I),e.removeEventListener("dragover",te),e.removeEventListener("dragleave",V),e.removeEventListener("drop",R),e.removeEventListener("dragend",Q),F.destroy(),J.clear(),e.replaceChildren()}}}function Ul(e,t,r){let n=at("views:nav"),s=null;function o(l){return u=>{u.preventDefault(),n("click tab %s",l),r.gotoView(l)}}function a(){let l=t.getState(),u=l.view==="worker"||l.view==="monitor"?l.view:"board";return i`
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
    `}function c(){Pe(a(),e)}return c(),s=t.subscribe(()=>c()),{destroy(){s&&(s(),s=null),Pe(i``,e)}}}var jl=["bug","feature","task","epic","chore"];function zl(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var Hl=["Critical","High","Medium","Low","Backlog"];function Wl(e,t){let r=document.createElement("dialog");r.id="new-issue-dialog",r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true"),r.innerHTML=`
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
  `,e.appendChild(r);let n=r.querySelector("#new-issue-form"),s=r.querySelector("#new-title"),o=r.querySelector("#new-type"),a=r.querySelector("#new-priority"),c=r.querySelector("#new-labels"),l=r.querySelector("#new-description"),u=r.querySelector("#new-issue-error"),f=r.querySelector("#btn-cancel"),g=r.querySelector("#btn-create"),h=r.querySelector(".new-issue__close");function x(){o.replaceChildren();let F=document.createElement("option");F.value="",F.textContent="\u2014 Select \u2014",o.appendChild(F);for(let S of jl){let H=document.createElement("option");H.value=S,H.textContent=zl(S),o.appendChild(H)}a.replaceChildren();for(let S=0;S<=4;S+=1){let H=document.createElement("option");H.value=String(S);let M=Hl[S]||"Medium";H.textContent=`${S} \u2013 ${M}`,a.appendChild(H)}}x();function $(){try{typeof r.close=="function"?r.close():r.removeAttribute("open")}catch{r.removeAttribute("open")}}function T(F){s.disabled=F,o.disabled=F,a.disabled=F,c.disabled=F,l.disabled=F,f.disabled=F,g.disabled=F,g.textContent=F?"Creating\u2026":"Create"}function W(){u.textContent=""}function k(F){u.textContent=F}function J(){try{let F=window.localStorage.getItem("beads-ui.new.type");F?o.value=F:o.value="";let S=window.localStorage.getItem("beads-ui.new.priority");S&&/^\d$/.test(S)?a.value=S:a.value="2"}catch{o.value="",a.value="2"}}function se(){let F=o.value||"",S=a.value||"";F.length>0&&window.localStorage.setItem("beads-ui.new.type",F),S.length>0&&window.localStorage.setItem("beads-ui.new.priority",S)}async function D(){W();let F=String(s.value||"").trim();if(F.length===0){k("Title is required"),s.focus();return}let S=Number(a.value||"2");if(!(S>=0&&S<=4)){k("Priority must be 0..4"),a.focus();return}let H=String(o.value||""),M=String(l.value||""),fe={title:F};H.length>0&&(fe.type=H),String(S).length>0&&(fe.priority=S),M.length>0&&(fe.description=M),T(!0);try{await t("create-issue",fe)}catch{T(!1),k("Failed to create issue");return}se(),T(!1),$()}return r.addEventListener("cancel",F=>{F.preventDefault(),$()}),h.addEventListener("click",()=>$()),f.addEventListener("click",()=>$()),r.addEventListener("keydown",F=>{F.key==="Enter"&&(F.ctrlKey||F.metaKey)&&(F.preventDefault(),D())}),n.addEventListener("submit",F=>{F.preventDefault(),D()}),{open(){n.reset(),W(),J();try{"showModal"in r&&typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")}catch{r.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){$()}}}var wf=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function Gl(e){return String(e).padStart(2,"0")}function kf(e,t){let r=Math.max(0,Math.ceil((e-t)/6e4)),n=Math.floor(r/1440),s=Math.floor(r%1440/60),o=r%60;return n>0?`${n}d${s>0?` ${s}h`:""}`:s>0?`${s}h${o>0?` ${o}m`:""}`:`${o}m`}function $f(e,t=Date.now()){let r=Date.parse(e);if(!Number.isFinite(r))return"";let n=new Date(r),s=new Date(t),o=`${Gl(n.getHours())}:${Gl(n.getMinutes())}`,c=n.getFullYear()===s.getFullYear()&&n.getMonth()===s.getMonth()&&n.getDate()===s.getDate()?o:`${wf[n.getMonth()]} ${n.getDate()} ${o}`;return`${kf(r,t)} \xB7 ${c}`}function xf(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}var Yl=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage"}];function Vl(e){let t=!1,r=null,n=new Map;function s(){Pe(i``,e),e.hidden=!0}function o(){let l=Yl.filter(f=>n.has(f.key));if(l.length===0){s();return}let u=Date.now();Pe(i`<div class="usage-meter" aria-label="Usage">
        ${l.map(f=>{let g=n.get(f.key),h=typeof g.ageSeconds=="number"&&g.ageSeconds>600,x=h?`${Math.floor(g.ageSeconds/60)}\uBD84 \uC804 \uCE21\uC815`:"";return i`<span
            class="usage-meter__group${h?" usage-meter__group--stale":""}"
            aria-label=${`${f.label} usage`}
          >
            <span class="usage-meter__provider">${f.label}</span>
            ${g.windows.map($=>{let T=typeof $.pct=="number"&&Number.isFinite($.pct)?$.pct:0,W=Math.min(100,Math.max(0,T)),J=`resets ${$f($.resetsAt,u)}${h?` \xB7 ${x}`:""}`;return i`<span
                class="usage-meter__window ${xf(W)}"
                style=${`--progress: ${W}%`}
                title=${J}
              >
                <span class="usage-meter__label">${$.key}</span>
                <span class="usage-meter__track" aria-hidden="true">
                  <span class="usage-meter__fill"></span>
                </span>
                <span class="usage-meter__pct">${W}%</span>
              </span>`})}
          </span>`})}
      </div>`,e),e.hidden=!1}async function a(l){try{let u=await fetch(l.endpoint);if(!u.ok)return null;let f=await u.json();return!f||f.available!==!0||!Array.isArray(f.windows)?null:f}catch{return null}}async function c(){let l=await Promise.all(Yl.map(async u=>({provider:u,payload:await a(u)})));if(!t){for(let u of l)u.payload?n.set(u.provider.key,u.payload):n.delete(u.provider.key);o()}}return s(),c(),r=setInterval(()=>{c()},6e4),{destroy(){t=!0,r!==null&&(clearInterval(r),r=null),s()}}}var Sf="worker-ineligible";function Ro(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Kl(e){return Ro(e).includes(Sf)}var Af="worker-serial";function Io(e){return Ro(e).includes(Af)}var Tf=new Set(["done","failed","orphaned","stopped","discarded"]);function Zl(e,t){let{queueStore:r,analysisStore:n,transport:s}=t,o=document.createElement("dialog");o.id="worker-parallel-analysis-dialog",o.className="pa",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),e.appendChild(o);let a=new Map,c=new Map,l=!1;function u(){return r&&r.get()||{revision:0,queue:[],serial_lanes:[],serial_lane_count:0,attempts:{},pr_wait:[]}}function f(){return n&&n.get()||{settings:{revision:0,runner:null,model:null,effort:null},job:null,last_good:null}}function g(){let N=u(),A=new Set;for(let I of Object.values(N.attempts||{})){let te=I;te&&typeof te.bead_id=="string"&&!Tf.has(te.status)&&A.add(te.bead_id)}for(let I of Array.isArray(N.pr_wait)?N.pr_wait:[])I&&typeof I.bead_id=="string"&&A.add(I.bead_id);for(let I of Object.values(N.discard_operations||{})){let te=I;te&&te.phase!=="done"&&typeof te.bead_id=="string"&&A.add(te.bead_id)}return A}function h(N){let A=u();for(let I of Array.isArray(A.serial_lanes)?A.serial_lanes:[])if(Array.isArray(I?.entries)&&I.entries.some(te=>te.bead_id===N))return I.id;return(Array.isArray(A.queue)?A.queue:[]).some(I=>I.bead_id===N)?"parallel":null}function x(N,A){let I=a.get(N);return I||[...A.order]}function $(N){if(N.length<2)return!1;let A=h(N[0]);if(!A||A==="parallel")return!1;let I=u(),te=(Array.isArray(I.serial_lanes)?I.serial_lanes:[]).find(Q=>Q.id===A)?.entries.map(Q=>Q.bead_id);if(!Array.isArray(te))return!1;let V=N.map(Q=>te.indexOf(Q));return V.every(Q=>Q>=0)&&V.every((Q,R)=>R===0||Q>V[R-1])}function T(){let N=u(),A=Array.isArray(N.serial_lanes)?N.serial_lanes:[],I=A.find(te=>Array.isArray(te.entries)&&te.entries.length===0);return I?I.id:A[0]?.id||"s1"}function W(N){let A=u().bead_titles||{};return typeof A[N]=="string"?A[N]:N}async function k(N,A){if(!s||l)return null;l=!0,Se();try{return await s(N,A)}finally{l=!1,Se()}}async function J(N){let A=await k("worker-parallel-analysis-start",{force:N});A&&A.applied===!1&&A.reason&&re(`\uBD84\uC11D \uC2E4\uD328: ${A.reason}`,"error",2800)}async function se(){let N=f().job;N&&await k("worker-parallel-analysis-cancel",{job_id:N.job_id})}async function D(N){let A=f().settings;await k("worker-parallel-analysis-settings-update",{expected_revision:A.revision,runner:A.runner||"claude",model:N,effort:A.effort||"high"})}async function F(N,A){if(!s||l)return;let I=x(N,A),te=f();if(I.length<2||!te.last_good){re("\uC81C\uCD9C\uD558\uB824\uBA74 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4","warning");return}let V=c.get(N)||T(),Q=()=>({snapshot_digest:te.last_good.identity_digest,group_index:N,lane:V,ordered_bead_ids:I,expected_revision:u().revision});l=!0,Se();try{let R=await s("worker-parallel-analysis-submit",Q());R&&R.queue&&r&&r.set(R.queue),R&&R.applied!==!0&&R.conflict===!0&&(R=await s("worker-parallel-analysis-submit",Q()),R&&R.queue&&r&&r.set(R.queue)),R&&R.applied===!0?(a.delete(N),re(`\uC9C1\uB82C \uB808\uC778 ${V}\uC5D0 ${I.length}\uAC1C \uBC30\uCE58`,"success")):re(`\uC81C\uCD9C \uAC70\uBD80: ${R?.reason||"conflict"} (\uD050 \uBB34\uBCC0\uACBD)`,"error",2800)}finally{l=!1,Se()}}function S(N,A,I){a.set(N,x(N,A).filter(te=>te!==I)),Se()}function H(N){a.delete(N),Se()}function M(N,A,I,te){let V=[...x(N,A)],Q=V.indexOf(I),R=Q+te;Q<0||R<0||R>=V.length||(V.splice(R,0,...V.splice(Q,1)),a.set(N,V),Se())}function fe(){let N=f().settings,A=u().runner_catalog,I=Object.keys(A?.runners?.[N.runner||"claude"]?.models||{}),te=!!(N.runner&&N.model&&N.effort);return i`<div class="pa-settings">
      <label class="pa-settings__field"
        >분석 모델
        <select
          class="pa-settings__model"
          aria-label="분석 모델"
          @change=${V=>{D(V.target.value)}}
        >
          ${I.map(V=>i`<option value=${V} ?selected=${N.model===V}>
                ${V}
              </option>`)}
        </select>
      </label>
      ${te?i`<span class="pa-settings__effort"
            >effort ${N.effort}</span
          >`:i`<span class="pa-settings__unset">분석 모델 설정 필요</span>`}
    </div>`}function Ce(N){let A=u(),I=(Array.isArray(A.queue)?A.queue.length:0)+(Array.isArray(A.serial_lanes)?A.serial_lanes:[]).reduce((Q,R)=>Q+(Array.isArray(R.entries)?R.entries.length:0),0),te=!!N.job,V=!!(N.settings.runner&&N.settings.model&&N.settings.effort);return i`<div class="pa-meta">
      <span class="pa-meta__targets">대상 ${I}</span>
      ${N.last_good?i`<span class="pa-meta__at"
            >분석 ${new Date(N.last_good.at||0).toLocaleString()}</span
          >`:i`<span class="pa-meta__at">분석 결과 없음</span>`}
      <button
        type="button"
        class="pa-run"
        ?disabled=${!V||te||l}
        @click=${()=>{J(!1)}}
      >
        ✳ 분석
      </button>
      <button
        type="button"
        class="pa-rerun"
        ?disabled=${!V||te||l}
        @click=${()=>{J(!0)}}
      >
        재분석
      </button>
      <button
        type="button"
        class="pa-cancel"
        ?disabled=${!te}
        @click=${()=>{se()}}
      >
        취소
      </button>
    </div>`}function ce(N,A){let I=x(N,A),te=g(),V=I.filter(me=>te.has(me)),Q=$(I),R=Array.isArray(u().serial_lanes)?u().serial_lanes:[],j=c.get(N)||T(),ue=A.eligible!==!0||I.length<2||V.length>0||Q||l;return i`<section class="pa-group" data-group-index=${String(N)}>
      <header class="pa-group__head">
        <span class="pa-group__confidence">${A.confidence}</span>
        ${A.categories.map(me=>i`<span class="pa-group__category">${me}</span>`)}
        ${Q?i`<span class="pa-group__applied">✓ 이미 반영됨</span>`:""}
        ${A.eligible===!0?"":i`<span class="pa-group__weak">근거 부족 — 제출 불가</span>`}
      </header>
      <p class="pa-group__reason">${A.reason}</p>
      <ol class="pa-group__members">
        ${I.map((me,Te)=>i`<li class="pa-member" data-bead-id=${me}>
              <span class="pa-member__seq">${Te+1}</span>
              <span class="pa-member__title">${W(me)}</span>
              ${te.has(me)?i`<span class="pa-member__active">실행 중</span>`:""}
              <button
                type="button"
                class="pa-member__up"
                data-bead-id=${me}
                ?disabled=${Te===0}
                aria-label=${`${me} \uC704\uB85C`}
                @click=${()=>M(N,A,me,-1)}
              >
                ↑
              </button>
              <button
                type="button"
                class="pa-member__down"
                data-bead-id=${me}
                ?disabled=${Te===I.length-1}
                aria-label=${`${me} \uC544\uB798\uB85C`}
                @click=${()=>M(N,A,me,1)}
              >
                ↓
              </button>
              <button
                type="button"
                class="pa-member__exclude"
                data-bead-id=${me}
                aria-label=${`${me} \uC81C\uC678`}
                @click=${()=>S(N,A,me)}
              >
                ✕
              </button>
            </li>`)}
      </ol>
      <ul class="pa-group__evidence">
        ${A.evidence.map(me=>i`<li class="pa-evidence">
              <code>${me.path}</code>
              <span class="pa-evidence__locator">${me.locator}</span>
            </li>`)}
      </ul>
      <footer class="pa-group__foot">
        <button
          type="button"
          class="pa-group__restore"
          @click=${()=>H(N)}
        >
          제안으로 되돌리기
        </button>
        <label class="pa-group__lane-field"
          >제출
          <select
            class="pa-group__lane"
            aria-label="제출 대상 레인"
            @change=${me=>{c.set(N,me.target.value),Se()}}
          >
            ${R.map((me,Te)=>i`<option
                  value=${me.id}
                  ?selected=${j===me.id}
                >
                  직렬 ${Te+1}
                </option>`)}
          </select>
        </label>
        <button
          type="button"
          class="pa-group__submit"
          ?disabled=${ue}
          @click=${()=>{F(N,A)}}
        >
          제출
        </button>
      </footer>
    </section>`}function he(N){let A=Array.isArray(N.issues)?N.issues:[],I=A.filter(V=>V.verdict==="parallel_ok").length,te=A.filter(V=>V.verdict==="uncertain").length;return i`<div class="pa-summary">
      <span>parallel_ok ${I}</span>
      <span>uncertain ${te}</span>
    </div>`}function Se(){let N=f(),A=N.last_good?.result;Pe(i`
        <div class="pa__container">
          <header class="pa__header">
            <div class="pa__title">병렬성 분석</div>
            <button
              type="button"
              class="pa__close"
              aria-label="닫기"
              @click=${ve}
            >
              ×
            </button>
          </header>
          <div class="pa__body">
            ${fe()} ${Ce(N)}
            ${A?i`${A.groups.map((I,te)=>ce(te,I))}
                ${A.groups.length===0?i`<p class="pa-empty">직렬 권장 그룹 없음</p>`:""}
                ${he(A)}`:i`<p class="pa-empty">
                  아직 분석 결과가 없습니다 — [✳ 분석]을 눌러 시작하세요
                </p>`}
          </div>
        </div>
      `,o)}let Re=!1,Ve=()=>{Re=!1},Oe=N=>{N.target===N.currentTarget&&ve()};o.addEventListener("close",Ve),o.addEventListener("cancel",Ve),o.addEventListener("click",Oe);let Ae=null;r&&r.subscribe&&(Ae=r.subscribe(()=>{Re&&Se()}));let be=null;n&&n.subscribe&&(be=n.subscribe(()=>{Re&&Se()}));function _e(){Re||(Re=!0,Se(),typeof o.showModal=="function"?o.showModal():o.setAttribute("open",""))}function ve(){Re&&(Re=!1,typeof o.close=="function"?o.close():o.removeAttribute("open"))}return{open:_e,close:ve,destroy(){Re=!1,o.removeEventListener("close",Ve),o.removeEventListener("cancel",Ve),o.removeEventListener("click",Oe),Ae&&(Ae(),Ae=null),be&&(be(),be=null),o.remove()}}}var Ef=20,Xl={verify:"\uBA38\uC9C0 \uC804 \uAC80\uC99D",deploy:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC"},Ql={verify_script_failure:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0",verify_script_failure_pre_merge:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0 \uD6C4 \uBA38\uC9C0",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328 \uD574\uACB0",interrupted_without_terminal_exit:"\uC911\uB2E8\uB41C \uC791\uC5C5 \uC9C4\uB2E8"};function Cf(e,t,r=Ef){let n=[];for(let s of Array.isArray(e)?e:[])!s||typeof s!="object"||n.push({type:"operation",id:s.operation_id,at:typeof s.finished_at=="number"?s.finished_at:typeof s.requested_at=="number"?s.requested_at:null,operation:s});for(let s of Array.isArray(t)?t:[])!s||typeof s!="object"||n.push({type:"cleanup",id:s.bead_id,at:typeof s.at=="number"?s.at:null,cleanup:s});return n.sort((s,o)=>s.at===null&&o.at===null?String(s.id||"").localeCompare(String(o.id||"")):s.at===null?1:o.at===null?-1:o.at-s.at),n.slice(0,Math.max(0,r))}function Jl(e){if(e.type==="cleanup")return"warn";let t=e.operation.state;return t==="succeeded"?"ok":t==="failed"?"fail":"live"}function Rf(e){if(e.type==="cleanup")return"\uBA48\uCDA4";switch(e.operation.state){case"succeeded":return"\uC131\uACF5";case"failed":return"\uC2E4\uD328";case"repairing":return"\uC790\uB3D9 \uD574\uACB0 \uC911";case"retry_pending":return"\uC7AC\uC2DC\uB3C4 \uC911";case"running":return"\uC2E4\uD589 \uC911";default:return"\uB300\uAE30"}}function ec(e){let t=e.filter(r=>r.value);return t.length===0?"":i`<details class="worker-ev__details">
    <summary>세부</summary>
    <dl class="worker-ev__kv">
      ${t.map(r=>i`<div>
            <dt>${r.term}</dt>
            <dd>${r.value}</dd>
          </div>`)}
    </dl>
  </details>`}function tc(e,t="",r=!1){return!e&&!t?"":i`<p
    class="worker-ev__explain${r?" worker-ev__explain--warn":""}"
  >
    <span class="worker-ev__cause">${e}</span>${t?i`<br />${t}`:""}
  </p>`}function If(e){if(e.state!=="failed"||e.superseded_by)return"";let t=e.repair||{},r=typeof t.remaining=="number"?t.remaining:0,n=e.failure_kind==="verify_script_failure"&&e.verify_stage==="pre_merge"?"verify_script_failure_pre_merge":e.failure_kind||"",s=r<=0;return i`<div class="worker-ev__acts">
    <button
      type="button"
      class="worker-ev__btn worker-ev__btn--primary worker-repo-op__resolve"
      data-operation-id=${e.operation_id}
      data-failure-kind=${e.failure_kind||""}
      title="해결 세션을 엽니다"
    >
      ${Object.hasOwn(Ql,n)?Ql[n]:"\uC2E4\uD328 \uD574\uACB0 \uC138\uC158 \uC2DC\uC791"}
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
  </div>`}function Lf(e){let t=e.operation,r=t.state==="failed",n=t.failure?t.failure.code:"";return i`<li
    class="worker-ev"
    data-operation-id=${t.operation_id}
    data-state=${t.state}
  >
    <span
      class="worker-ev__t"
      title=${e.at?bt(e.at):""}
      >${os(e.at)||"\u2014"}</span
    >
    <span class="worker-ev__node" aria-hidden="true"
      ><span class="worker-ev__dot worker-ev__dot--${Jl(e)}"></span
    ></span>
    <div class="worker-ev__body">
      <div class="worker-ev__line1">
        <span class="worker-ev__what"
          >${Object.hasOwn(Xl,t.kind)?Xl[t.kind]:t.kind}</span
        >
        <span class="worker-ev__meta"
          >${t.target_base}@${ss(t.target_sha)}${typeof t.elapsed_ms=="number"?` \xB7 ${ho(t.elapsed_ms)}`:""}</span
        >
        <span class="worker-ev__st worker-ev__st--${Jl(e)}"
          >${Rf(e)}</span
        >
        ${t.dismissed?i`<span class="worker-ev__st worker-ev__st--quiet">접수됨</span>`:""}
        ${t.superseded_by?i`<span class="worker-ev__st worker-ev__st--quiet">덮임</span>`:""}
      </div>
      ${r?tc(vl(t.failure_kind,n)):""}
      ${If(t)}
      ${ec([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:r?n:""},{term:"script",value:[t.script_path||"",t.script_blob_sha?`blob ${ss(t.script_blob_sha)}`:"",Number.isInteger(t.exit_code)?`exit ${t.exit_code}`:""].filter(Boolean).join(" \xB7 ")},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function Of(e){let t=e.cleanup,r=Rr(t.step);return i`<li
    class="worker-ev"
    data-bead-id=${t.bead_id}
    data-state="cleanup_stalled"
  >
    <span
      class="worker-ev__t"
      title=${e.at?bt(e.at):""}
      >${os(e.at)||"\u2014"}</span
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
        ${gl(t.step).map(n=>i`<li
              class="worker-step worker-step--${n.state}"
              data-step=${n.step}
            >
              <span class="worker-step__pip" aria-hidden="true"></span>
              <span class="worker-step__lb">${n.label}</span>
            </li>`)}
      </ol>
      ${tc(ls(t.reason),typeof t.retry_count=="number"&&t.retry_count>0?`${t.retry_count}\uD68C \uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uD6C4\uC5D0\uB3C4 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.`:"\uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.",!0)}
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
      ${ec([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:t.reason||""},{term:"\uC9C4\uB2E8",value:t.detail||""},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function Df(e){return i`<section class="worker-repo-drawer" data-seam="repo-ops-timeline">
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
          ${e.events.map(t=>t.type==="cleanup"?Of(t):Lf(t))}
        </ul>`}
  </section>`}function rc(e,t={}){let r=null;function n(){Pe(r?Df(r):i``,e)}e.addEventListener("click",a=>{a.target?.closest?.('[data-seam="repo-ops-close"]')&&o()});function s(a){r={events:Cf(a.operations,a.cleanup_failures),repo:a.repo||""},n()}function o(){r!==null&&(r=null,n(),t.onClose&&t.onClose())}return{open:s,close:o,isOpen:()=>r!==null,refresh(a){r&&s(a)}}}var Mf="tab:worker:ready",Nf="tab:worker:blocked",Pf="tab:worker:in-progress",Ff="tab:worker:closed",ds=1,nc=5;function sc(e){return pn(e).path.length>0}var ic="beads-ui.worker.candidate-filter",Lo={show_blocked:!1,spec:"all"};function qf(){try{let e=window.localStorage.getItem(ic);if(!e)return{...Lo};let t=JSON.parse(e);if(!t||typeof t!="object")return{...Lo};let r=t.spec;return{show_blocked:t.show_blocked===!0,spec:r==="with"||r==="without"?r:"all"}}catch{return{...Lo}}}function Bf(e){try{window.localStorage.setItem(ic,JSON.stringify(e))}catch{}}function Uf(e,t){let r=c=>t.show_blocked||!c.blocked,n=c=>t.spec==="all"||(t.spec==="with"?c.has_spec:!c.has_spec),s=[],o=0,a=0;for(let c of e){let l=r(c),u=n(c);l&&u?s.push(c):!l&&u?o+=1:l&&!u&&(a+=1)}return{visible:s,hidden_blocked:o,hidden_spec:a}}var jf=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],lc="bdui.worker.candidate_sort",zf=[{value:"spec",label:"spec \uC6B0\uC120"},{value:"board",label:"Board \uC21C\uC11C"},{value:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131\uC21C"}],us="spec";function Hf(){try{let e=window.localStorage.getItem(lc);return e==="board"||e==="created"||e==="spec"?e:us}catch{return us}}function Wf(e){try{window.localStorage.setItem(lc,e)}catch{}}var cc="bdui.worker.done-range";function Gf(){try{let e=window.localStorage.getItem(cc);return Ot(e)?e:Rt}catch{return Rt}}function Yf(e){try{window.localStorage.setItem(cc,e)}catch{}}var Vf="(max-width: 640px)",dc="beads-ui.worker.lane-collapsed",yn={queue:!0,done:!0};function Kf(){try{let e=window.localStorage.getItem(dc);if(!e)return{...yn};let t=JSON.parse(e);return!t||typeof t!="object"?{...yn}:{queue:typeof t.queue=="boolean"?t.queue:yn.queue,done:typeof t.done=="boolean"?t.done:yn.done}}catch{return{...yn}}}function Zf(e){try{window.localStorage.setItem(dc,JSON.stringify(e))}catch{}}function oc(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let r=typeof t.title=="string"?t.title:t.id||"";return r.length>22?`${r.slice(0,22)}\u2026`:r}function Xf(e,t,r){let n=Array.isArray(e)?e.slice():[];return t==="created"?n.sort($r):(n.sort(Cn(r)),t==="board"?n:[...n.filter(sc),...n.filter(s=>!sc(s))])}function Qf(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function Jf(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function e_(e){let r=(Array.isArray(e?.dependencies)?e.dependencies:[]).map(n=>typeof n=="string"?n:n&&n.id).filter(Boolean);return r.length>0?`\u{1F512} ${r.join(", ")}`:"\u{1F512} blocked"}var t_=["closed_unmerged","review","undecidable"],r_=[{from:"\uAD00\uCE21 \uB300\uAE30",activity:"checking",to:"\uD655\uC778\uC911"},{from:"\uAC80\uC99D \uB300\uAE30",activity:"verifying",to:"\uAC80\uC99D \uC911"}];function n_(e,t){for(let r of r_)if(e===r.from&&t===r.activity)return{label:r.to,live:!0};return{label:e,live:!1}}function ac(e){switch(e){case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";default:return e}}function s_(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}function Oo(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}function o_(e){if(!e||typeof e!="object")return null;let t=Number.isInteger(e.repair_sessions_used)?Math.max(0,e.repair_sessions_used):0,r=Number.isInteger(e.repair_session_cap)?Math.max(0,e.repair_session_cap):0,n=e.current_repair&&typeof e.current_repair=="object"?e.current_repair:null,s=n&&typeof n.pr_number=="number"?n.pr_number:null,o="";switch(e.phase){case"gating":o="root \uC7AC\uAC80\uC99D \uC911";break;case"repairing":o=e.subject_role==="root"?`\uC790\uB3D9\uBCF5\uAD6C ${t}/${r} \xB7 \uC6D0 PR \uC218\uC815 \uC911`:`\uC790\uB3D9\uBCF5\uAD6C ${t}/${r} \xB7 repair PR \uC900\uBE44 \uC911`;break;case"waiting_repair_pr":o=s?`repair PR #${s} \uB300\uAE30`:"repair PR \uB300\uAE30";break;case"merging":o=e.subject_role==="repair"?s?`repair PR #${s} \uBA38\uC9C0 \uC911`:"repair PR \uBA38\uC9C0 \uC911":"root \uBA38\uC9C0 \uC911";break;case"cleaning":o="\uC815\uB9AC \uBCF5\uAD6C \uC911";break;case"paused":o="\uC790\uB3D9\uBCF5\uAD6C \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":o=`\uC0AC\uB78C \uD655\uC778 \uD544\uC694 \xB7 ${e.terminal_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`;break;case"completed":return null;default:return null}let a=[`\uBCF5\uAD6C \uC138\uC158 ${t}/${r}`];return e.head_sha&&a.push(`head ${e.head_sha}`),e.base_sha&&a.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&a.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`),e.active_attempt_id&&a.push(`attempt ${e.active_attempt_id}`),n&&typeof n.bead_id=="string"&&a.push(`repair ${n.bead_id}`),e.evidence&&a.push(e.evidence),e.log_path&&a.push(e.log_path),{badge:o,title:a.join(`
`),alert:e.phase==="needs_human",lock_actions:e.phase!=="paused"&&e.phase!=="needs_human",repair_pr_url:n&&typeof n.pr_url=="string"?n.pr_url:"",repair_pr_number:s}}function a_(e,t,r,n,s=null,o=null,a=null,c=!1,l=null,u=!0,f=null,g=null,h=null,x={},$=!1){let T=!!l&&l.position>0,W=!!l?.continuation_action&&l.continuation_action.continuation===null,k=!!l&&l.active===!0,J=l&&l.failure||null,se=r[e]||null,D=se&&se.gate?se.gate:null,F=se&&se.pr?se.pr:null,S=o_(h),H=s_(l?l.resolution:null),M=[];c&&M.push("\uC138\uC158");let fe=a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":H?H.badge:a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":null,Ce=n_(c&&D&&D.tier==="closed_unmerged"?"\uB2EB\uD798":D&&D.gate_badge||"",fe?null:o&&o.activity||null);if(fe&&M.push(fe),Ce.label&&M.push(Ce.label),D&&D.base_badge&&D.base_badge!==D.gate_badge&&M.push(D.base_badge),g&&M.push(g),n){let ve=Rr(n.step);M.push(ve?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${ve}`:"\uC815\uB9AC \uBA48\uCDA4")}S&&M.push(S.badge),T&&!k&&M.push(`\uBA38\uC9C0 \uB300\uAE30 #${l.position}`),J&&M.push(`\uC77C\uAD04 \uBA38\uC9C0 \uC2E4\uD328: ${ac(J)}`),W&&M.push("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"),f&&M.push(`\uC790\uB3D9 \uC81C\uC678: ${ac(f)}`);let ce=!!D&&D.base_badge==="\uCDA9\uB3CC",he=!!D&&D.enabled===!0,Se=vo(o&&o.merge_progress?o.merge_progress.step:null),Re=!!n&&["child_sweep","branch_cleanup","parent_close"].includes(n.step)&&!!D&&D.tier==="merged",Ve=c&&!!n&&!!D&&D.tier==="merged",Oe=c&&ce&&u===!1,Ae=Yt(x,e,{external:c,merge_active:k||!!Se,merge_queued:T,conflict_active:!!a,cleanup_active:!1,merged:!!n||D?.tier==="merged"}),be=!!Ae.operation,_e=!Re&&!!n&&n.step==="repo_operations";return{id:e,title:t,reason:n?is(n.step):"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",worker_serial:$,external:c,pr_number:F&&typeof F.number=="number"?F.number:null,pr_url:F&&typeof F.url=="string"?F.url:"",completion_badge:S?S.badge:null,completion_title:S?S.title:"",completion_repair_pr_url:S?S.repair_pr_url:"",completion_repair_pr_number:S?S.repair_pr_number:null,badges:M,live_badge:a==="paused"?null:H?.live||a==="running"?fe:Ce.live?Ce.label:null,usage:s,alert:!!D&&t_.includes(D.tier)||!!n||!!J||!!(S&&S.alert),merge_action:_e?!1:!T||W,timeline_action:_e,cancel_action:T&&!W,cancel_enabled:!k&&!(S&&S.lock_actions),cancel_title:S&&S.lock_actions?"\uC790\uB3D9\uBCF5\uAD6C \uC911 \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694":k?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:Ae,discard_action:Ae.action,merge_step:Se,discard_enabled:Ae.enabled,discard_title:Ae.title,merge_enabled:!Se&&!a&&!be&&!(S&&S.lock_actions)&&!Oe&&!_e&&(he||ce||Re||Ve),merge_label:W?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":Re||Ve?"\uC815\uB9AC \uC7AC\uAC1C":ce&&!Se&&!Re?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:be?Ae.error?`\uD3D0\uAE30 \uC2E4\uD328: ${Ae.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${Ae.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:W?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":Se?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${Se.label}`:Ve?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Oe?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":Re?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":ce?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":he?`\uBA38\uC9C0 (${D.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:D&&D.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${D&&D.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function Do(e,t={}){let{transport:r,issueStores:n,queueStore:s,analysisStore:o,execPresetStore:a,sessionLogStore:c,uiOrderStore:l,gotoIssue:u,getWorkspacePath:f,doneRange:g,onDoneRangeChange:h}=t,x=n?In(n,l):null,$=On({transport:r,uiOrderStore:l}),T=null,W=[],k=qf(),J=Hf(),se=Ot(g)?g:Gf(),D=new Map;function F(){let p=Wt.find(w=>w.value===se);return p?p.label:"\uC624\uB298"}let S=Kf(),H=!1,M=new Set,fe=new Set,Ce=new Set,ce=[],he=document.createElement("div");he.className="worker-console";let Se=document.createElement("div");Se.className="worker-top";let Re=document.createElement("div");Re.className="worker-drawer-overlay",Re.hidden=!0;let Ve=document.createElement("div");Ve.className="worker-drawer-overlay__backdrop";let Oe=document.createElement("div");Oe.className="worker-drawer-host";let Ae=document.createElement("div");Ae.className="worker-drawer-host",Ae.hidden=!0,Re.append(Ve,Oe,Ae);let be=document.createElement("div");be.className="worker-lanes-host",he.append(Se,Re,be),e.appendChild(he);let _e=null,ve=Jn(Oe,{transport:r,sessionLogStore:c,onClose:()=>{_e=null,Re.hidden=!0,L()}}),N=rc(Ae,{onClose:()=>{Ae.hidden=!0,Re.hidden=!0,L()}}),A=ns(he,{queueStore:s,presetStore:a,transport:r}),I=o?Zl(he,{queueStore:s,analysisStore:o,transport:r}):null;function te(){return s&&s.get()||{revision:0,auto_advance:!1,auto_merge:!1,slots:ds,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]}}function V(){let p=te();return typeof p.revision=="number"?p.revision:0}function Q(p){p&&p.queue&&s&&s.set(p.queue)}function R(){let p=te().queue;return Array.isArray(p)?p.length:0}async function j(p,w,O){if(!r)return;let X=()=>({bead_id:p,...w==="parallel"?{}:{lane:w},index:O,expected_revision:V()}),le=await r("worker-queue-place",X());Q(le),le&&le.conflict&&await r("worker-queue-place",X()).then(Q)}async function ue(p,w,O){if(!r)return;let X=()=>({bead_id:p,...w==="parallel"?{}:{lane:w},to_index:O,expected_revision:V()}),le=await r("worker-queue-reorder",X());Q(le),le&&le.conflict&&await r("worker-queue-reorder",X()).then(Q)}async function me(p){if(!r)return;let w=await r("worker-queue-remove",{bead_id:p,expected_revision:V()});Q(w),w&&w.conflict&&await r("worker-queue-remove",{bead_id:p,expected_revision:V()}).then(Q)}async function Te(p){if(!r||!p)return;let w=await r("worker-attempt-pause",{attempt_id:p});w&&w.paused===!1&&w.reason&&re(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${w.reason}`,"error",2400)}async function we(p){if(!r||!p)return;let w=async(X={})=>await r("worker-attempt-resume",{attempt_id:p,expected_revision:V(),...X}),O=await w();Q(O),O&&O.conflict&&(O=await r("worker-attempt-resume",{attempt_id:p,expected_revision:V()}),Q(O)),O=await Xt(O,(X,le)=>w({continuation:X,decision_token:le}),{onResult:Q,refresh:()=>w()}),O&&O.resumed===!1&&!O.conflict&&O.reason&&re(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${O.reason}`,"error",2400)}async function xe(p){if(!r||!p)return;let w=await r("worker-attempt-dismiss",{attempt_id:p,expected_revision:V()});Q(w),w&&w.conflict&&(w=await r("worker-attempt-dismiss",{attempt_id:p,expected_revision:V()}),Q(w)),w&&w.dismissed===!1&&!w.conflict&&w.reason&&re(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${w.reason}`,"error",2400)}async function Ue(p,w,O=!0){if(!r)return null;let X=r,le=await X(p,{...w,expected_revision:V()});return Q(le),le&&le.conflict&&O&&(le=await X(p,{...w,expected_revision:V()}),Q(le)),le}async function je(p){if(!r||!p)return;let w=te().merge_queue?.find(X=>X.bead_id===p)?.continuation_action;if(w?.mismatch&&w.continuation===null){await U(p,w.mismatch);return}M.add(p),L();let O;try{O=await Ue("worker-merge-queue-add",{bead_id:p})}finally{M.delete(p),L()}!O||O.conflict||O.applied||re("\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)","error",2400)}async function rt(p){if(!(!r||!p||fe.has(p))){fe.add(p),L();try{let w=await r("worker-cleanup-retry",{bead_id:p,expected_revision:V()});Q(w),w&&!w.retried&&!w.conflict&&w.reason&&re(`\uC815\uB9AC \uC7AC\uAC1C \uAC70\uBD80: ${w.reason}`,"error",2400)}finally{fe.delete(p),L()}}}async function U(p,w){let O=await Xt({continuation_mismatch:w},(le,Ge)=>Ue("worker-merge-queue-add",{bead_id:p,continuation:le,decision_token:Ge},!1)),X=O?.queue?.merge_queue?.find(le=>le.bead_id===p)?.continuation_action;if(O?.applied!==!0&&X?.continuation===null&&X.mismatch){await U(p,X.mismatch);return}O&&O.applied===!1&&!O.conflict&&re("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD\uC774 \uCD5C\uC2E0 \uC0C1\uD0DC\uC640 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4","error",2800)}async function G(p){if(!r)return;let w=await Ue("worker-merge-auto-toggle",{on:p});!w||w.conflict||re(p?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",p?"success":"info",2400)}async function z(p){if(!r||!p)return;let w=await Ue("worker-merge-queue-remove",{bead_id:p});w&&!w.conflict&&!w.applied&&w.reason==="merge_active"&&re("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function v(){await Ue("worker-merge-queue-remove",{all:!0})}async function C(p,w=null,O="unmerged",X=null){if(!r||!p)return;let le=_n(p,O);if(!(typeof globalThis.confirm!="function"||globalThis.confirm(le)))return;let ye=await r("worker-discard",{bead_id:p,...w?{attempt_id:w}:{},...X?{operation_id:X}:{},expected_revision:V()});if(Q(ye),ye&&ye.conflict&&(ye=await r("worker-discard",{bead_id:p,...w?{attempt_id:w}:{},...X?{operation_id:X}:{},expected_revision:V()}),Q(ye)),ye&&ye.discarded===!0){re(as(ye),"success",5e3);return}if(ye&&ye.reason){re(`\uD3D0\uAE30 \uC2E4\uD328: ${ye.reason}`,"error",2800);return}if(ye&&ye.accepted&&ye.pending==="merged_revert"){re("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(ye&&ye.accepted&&!ye.discarded){re(`\uD3D0\uAE30 \uC9C4\uD589: ${ye.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}ye&&!ye.conflict&&re("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function q(p,w){if(!r||!w||Ce.has(w))return;Ce.add(w),L();let O;try{let X=async(le={})=>await r(p,{bead_id:w,expected_revision:V(),...le});O=await X(),Q(O),O&&O.conflict&&(O=await r(p,{bead_id:w,expected_revision:V()}),Q(O)),p==="worker-revise-fix"&&(O=await Xt(O,(le,Ge)=>X({continuation:le,decision_token:Ge}),{onResult:Q,refresh:()=>X()}))}finally{Ce.delete(w),L()}if(!(!O||O.conflict)){if(O.ok){re(p==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}re(`\uCC98\uBD84 \uAC70\uBD80: ${O.reason||""}`,"error",3e3)}}async function K(p){if(!r)return;let w=await r("worker-automation-toggle",{on:p,expected_revision:V()});Q(w),w&&w.conflict&&await r("worker-automation-toggle",{on:p,expected_revision:V()}).then(Q)}async function ee(p){if(!r||!p)return;let w=await r("worker-repo-operation-repair",{operation_id:p});if(Q(w),w&&w.ok===!1){re(`\uD574\uACB0 \uC138\uC158 \uAC70\uBD80: ${w.reason||""}`,"error",3e3);return}w&&w.ok===!0&&re("\uD574\uACB0 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4","success",2400)}async function De(p){if(!r||!p)return;let w=await r("worker-repo-operation-dismiss",{operation_id:p});Q(w),w&&w.ok===!1&&re(`\uAE30\uB85D \uB2EB\uAE30 \uAC70\uBD80: ${w.reason||""}`,"error",3e3)}async function Ee(p){if(!r||!Number.isFinite(p))return;let w=Math.max(ds,Math.floor(p)),O=await r("worker-queue-set-slots",{slots:w,expected_revision:V()});Q(O),O&&O.conflict&&await r("worker-queue-set-slots",{slots:w,expected_revision:V()}).then(Q)}async function Me(p){if(!r||!Number.isInteger(p)||p<1||p>nc)return;let w=te(),O=(Array.isArray(w.serial_lanes)?w.serial_lanes:[]).slice(p).reduce((Ge,ye)=>Ge+(Array.isArray(ye?.entries)?ye.entries.length:0),0),X=()=>({count:p,expected_revision:V()}),le=await r("worker-queue-set-serial-lane-count",X());Q(le),le&&le.conflict&&(le=await r("worker-queue-set-serial-lane-count",X()),Q(le)),le&&le.applied&&O>0&&re(`\uC9C1\uB82C \uB808\uC778 \uCD95\uC18C \u2014 ${O}\uAC1C \uD56D\uBAA9\uC774 \uBCD1\uB82C \uB300\uAE30\uB85C \uC774\uB3D9`)}function ze(){let p=te(),w=x?x.selectBoardColumn(Mf,"ready"):[],O=x?x.selectBoardColumn(Nf,"blocked"):[],X=x?x.selectBoardColumn(Ff,"closed"):[],le=x?x.selectBoardColumn(Pf,"in_progress"):[],Ge=new Map;for(let m of le){let P=Jf(m);if(!P)continue;let ie=Ge.get(P);ie?ie.push(m):Ge.set(P,[m])}let ye=m=>{let P=Ln(Ge.get(m)||[]);return P?P.title||P.id:null},Xe=p.bead_titles||{},ne=new Map;for(let[m,P]of Object.entries(Xe))typeof P=="string"&&P.length>0&&ne.set(m,P);for(let m of[...w,...O])ne.set(m.id,m.title||m.id);let y=p.bead_times&&typeof p.bead_times=="object"&&!Array.isArray(p.bead_times)?p.bead_times:{},Y=p.bead_labels&&typeof p.bead_labels=="object"&&!Array.isArray(p.bead_labels)?p.bead_labels:{},ae=new Map;for(let[m,P]of Object.entries(Y))Array.isArray(P)&&ae.set(m,Io(P));for(let m of[...w,...O]){let P=m.labels;Array.isArray(P)&&!ae.has(m.id)&&ae.set(m.id,Io(P))}let Be=new Map,et=o?.get()?.last_good?.result?.groups;for(let m of Array.isArray(et)?et:[]){if(m?.eligible!==!0||!Array.isArray(m.members))continue;let P=m.members.map(Fe=>{let ft=(Array.isArray(p.serial_lanes)?p.serial_lanes:[]).find(Ct=>Ct.entries.some(ut=>ut.bead_id===Fe));return ft?ft.id:null});if(!(P.every(Fe=>Fe!==null)&&new Set(P).size===1))for(let Fe of m.members)Be.set(Fe,m.members.filter(ft=>ft!==Fe))}let Ze=p.bead_blocked_by&&typeof p.bead_blocked_by=="object"&&!Array.isArray(p.bead_blocked_by)?p.bead_blocked_by:{},ge=new Map;for(let[m,P]of Object.entries(y))P&&typeof P=="object"&&ge.set(m,P);for(let m of[...w,...O])ge.set(m.id,{created_at:m.created_at,updated_at:m.updated_at});let d=m=>ge.get(m)||{},_=p.pr_wait||[],b=p.pr_observations||{},E=p.pr_activity||{},B=p.cleanup_failed||{},oe=Object.entries(B).map(([m,P])=>({bead_id:m,step:P&&P.step?P.step:"",reason:P&&P.reason?P.reason:"",at:P&&typeof P.at=="number"?P.at:null,detail:P&&typeof P.detail=="string"?P.detail:null,output_tail:P&&typeof P.output_tail=="string"&&P.output_tail?P.output_tail:void 0,log_path:P&&typeof P.log_path=="string"&&P.log_path?P.log_path:void 0,retry_count:P&&typeof P.retry_count=="number"&&Number.isInteger(P.retry_count)&&P.retry_count>0?P.retry_count:0,failure_code:P&&typeof P.failure_code=="string"?P.failure_code:void 0,subject_id:P&&typeof P.subject_id=="string"?P.subject_id:void 0,repair_eligible:!!(P&&P.repair_eligible),repair:P&&P.repair?P.repair:void 0})),Ne=p.queue||[],Ye=new Set([...Ne.map(m=>m.bead_id),...(Array.isArray(p.serial_lanes)?p.serial_lanes:[]).flatMap(m=>(Array.isArray(m?.entries)?m.entries:[]).map(P=>P.bead_id)),..._.map(m=>m.bead_id),...p.done.map(m=>m.bead_id)]),or=new Set(O.map(m=>m.id)),ps=l?l.get()?.order||{}:{},Fo=new Set,qo=[];for(let m of[...w,...O])Ye.has(m.id)||Fo.has(m.id)||Qf(m)||Kl(m.labels)||(Fo.add(m.id),qo.push(m));W=Xf(qo,J,ps);let $c=p.admission||{},Bo=m=>{let P=$c[m];if(!P)return"";if(P.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let ie=typeof P.reason=="string"?P.reason:"",Fe=ie.indexOf(":");return Fe>0&&Fe<ie.length-1?`\u26D4 ${ie.slice(0,Fe)} (${ie.slice(Fe+1)})`:`\u26D4 ${ie}`},xc=W.map(m=>{let P=pn(m),ie=P.path.length>0,Fe=m.workflow?.route==="quick_fix"||m.metadata&&m.metadata.route==="quick_fix",ft=!Fe&&ie&&!P.conflict,Ct=or.has(m.id),ut=[];Ct&&ut.push(e_(m)),Fe?ut.push("quick_fix \xB7 \uC6CC\uCEE4 \uBE44\uB300\uC0C1"):P.conflict?ut.push("spec_id_conflict"):ie||ut.push("spec \uC5C6\uC74C");let st=Bo(m.id);return st&&ut.push(st),{id:m.id,title:m.title||m.id,reason:ut.join(" \xB7 "),draggable:ft,lane:"candidate",created_at:m.created_at,updated_at:m.updated_at,workflow:m.workflow,is_quick_fix:Fe,status:m.status,blocked:Ct,has_spec:ie}}),fs=Uf(xc,k),Sc=fs.visible,Ac=p.revise_parked||{},vn=p.discard_operations&&typeof p.discard_operations=="object"&&!Array.isArray(p.discard_operations)?p.discard_operations:{},_s=(m,P)=>m.map((ie,Fe)=>{let ft=P!=="done",Ct=P!=="done"&&P!=="queue",ut=ft?Ac[ie.bead_id]:null,st=ft?Yt(vn,ie.bead_id):null,ws=st?.operation?st:null,qc=ft&&ae.get(ie.bead_id)===!0,Bc=ft?Bo(ie.bead_id):null,Uc=ft?[Bc]:[],la=Ze[ie.bead_id]||[],ca=p.admission&&typeof p.admission=="object"?p.admission[ie.bead_id]:null,da=ft&&la.length>0&&typeof ca?.reason=="string"&&ca.reason.startsWith("not_ready")?[`\u23F8 ${la.join(", ")} \uC644\uB8CC \uB300\uAE30 (blocks)`]:[],ks=ft?Be.get(ie.bead_id):void 0;return ks&&ks.length>0&&da.push(`\u2733 serial \uAD8C\uC7A5 \xB7 ${ks.join(", ")}\uC640`),{id:ie.bead_id,title:ne.get(ie.bead_id)||ie.bead_id,reason:Uc.filter(Boolean).join(" \xB7 "),draggable:ft&&!ws,done:P==="done",lane:P,seq:Ct?Fe+1:void 0,worker_serial:qc,discard:ws,badges:[...da,...ut?["\u23F8 REVISE \uD30C\uD0B9"]:[]],alert:!!ut,revise_action:!!ut,revise_enabled:!!ut&&!ws&&!Ce.has(ie.bead_id),revise_title:ut?ut.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${ut.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":"",usage:P==="done"?Dt(p.attempts||{},ie.bead_id):null,done_at:P==="done"&&typeof ie.added_at=="number"?ie.added_at:void 0,...d(ie.bead_id)}}),Uo=new Map;for(let m of p.done)m&&typeof m.bead_id=="string"&&typeof m.added_at=="number"&&Uo.set(m.bead_id,m.added_at);let Ir=p.attempts?Object.values(p.attempts):[],ms=new Set;for(let m of Ir)m&&typeof m.resumed_from=="string"&&m.resumed_from.length>0&&ms.add(m.resumed_from);let gs=new Map;for(let m of Ir)gs.set(m.bead_id,m.attempt_id);let bs=new Map;for(let m of Ir)bs.set(m.attempt_id,m);function hs(m){let P=new Set,ie=m;for(;ie&&!P.has(ie.attempt_id);){if(ie.conflict_resolution===!0)return!0;P.add(ie.attempt_id),ie=typeof ie.resumed_from=="string"&&ie.resumed_from.length>0&&bs.get(ie.resumed_from)||null}return!1}let wn=typeof p.declared_base=="string"?p.declared_base:null;function Tc(m){let P=null;for(let ie of Ir)!ie||ie.bead_id!==m||hs(ie)||(P===null||(typeof ie.started_at=="number"?ie.started_at:0)>=(typeof P.started_at=="number"?P.started_at:0))&&(P=ie);return P&&typeof P.target_base=="string"?P.target_base:null}let jo=[],zo=[],Ec=m=>{let P=gs.get(m.bead_id)!==m.attempt_id,ie=Uo.get(m.bead_id),Fe=typeof ie=="number"&&ie>0&&typeof m.finished_at=="number"&&ie>=m.finished_at;return!P&&!Fe&&typeof m.dismissed_at!="number"},Ho=m=>{let P=typeof m.session_id=="string"&&m.session_id.length>0,ie=ms.has(m.attempt_id);return{eligible:P&&!ie,reason:P?ie?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}},Ft=null;for(let m of Ir){let P=m.status==="paused"&&!ms.has(m.attempt_id);if(m.status==="running"||P)zo.push({bead_id:m.bead_id,attempt_id:m.attempt_id,title:ne.get(m.bead_id)||m.bead_id,runner:m.runner||null,model:m.model||null,effort:m.effort||null,speed:m.speed||null,continuation_mode:m.continuation_mode||null,started_at:typeof m.started_at=="number"?m.started_at:null,resumed_from:m.resumed_from||null,paused:P,conflict_resolution:hs(m),base_exception:Oo(wn,m.target_base),can_pause:typeof m.session_id=="string"&&m.session_id.length>0,discard:Yt(vn,m.bead_id,{attempt_id:m.attempt_id}),usage:Dt(p.attempts||{},m.bead_id),current_child:ye(m.bead_id),...d(m.bead_id)});else if((m.status==="failed"||m.status==="orphaned")&&Ec(m)){let ie=Ho(m);jo.push({bead_id:m.bead_id,attempt_id:m.attempt_id,title:ne.get(m.bead_id)||m.bead_id,runner:m.runner||null,model:m.model||null,effort:m.effort||null,speed:m.speed||null,continuation_mode:m.continuation_mode||null,started_at:typeof m.started_at=="number"?m.started_at:null,resumed_from:m.resumed_from||null,failed:!0,status:m.status,status_label:m.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328",discard:Yt(vn,m.bead_id,{attempt_id:m.attempt_id}),resume_eligible:ie.eligible,resume_reason:ie.reason,conflict_resolution:hs(m),base_exception:Oo(wn,m.target_base),usage:Dt(p.attempts||{},m.bead_id),current_child:ye(m.bead_id),...d(m.bead_id)}),Ft=m}}let kn=[...jo,...zo],Wo=null;if(Ft){let m=Ho(Ft),P=Ft.cause_detail;Wo={bead_id:Ft.bead_id,repo:Ft.repo||"",reason:Ft.cause||Ft.status,cause_detail:P&&typeof P.reason=="string"?{reason:P.reason,command:typeof P.command=="string"?P.command:null}:null,resume_attempt_id:Ft.attempt_id,resume_eligible:m.eligible,resume_reason:m.reason,discard:Yt(vn,Ft.bead_id,{attempt_id:Ft.attempt_id})}}let Go=new Set(kn.map(m=>m.bead_id)),ys=Array.isArray(p.merge_queue)?p.merge_queue:[],Yo=new Map,Vo=new Map,Ko=new Map;ys.forEach((m,P)=>{m&&typeof m.bead_id=="string"&&(Yo.set(m.bead_id,P+1),Vo.set(m.bead_id,m.resolution),Ko.set(m.bead_id,m.continuation_action||null))});let Zo=p.merge_queue_state||{active:null,failures:{}},Cc=Zo.failures||{},Rc=p.auto_merge_skips||{},Xo=m=>{let P=Rc[m];if(!P)return null;let ie=b[m],Fe=ie&&ie.pr?ie.pr.head_sha:null;return Fe&&Fe===P.head_sha?P.reason||"":null},$n=new Map;for(let m of kn)m.failed!==!0&&m.conflict_resolution&&(m.paused?$n.has(m.bead_id)||$n.set(m.bead_id,"paused"):$n.set(m.bead_id,"running"));let Qo=kn.filter(m=>!m.paused&&m.failed!==!0).length,Jo=(p.workspace_info||{}).slots,ea=typeof Jo=="number"?Jo:typeof p.slots=="number"?p.slots:ds,Ic=Qo>ea,xn=wr(se),Lc=(Array.isArray(p.done)?p.done.slice():[]).filter(m=>xn===void 0||typeof m.added_at!="number"||m.added_at>=xn).sort((m,P)=>(P.added_at||0)-(m.added_at||0)),Wr=_s(Lc,"done"),Oc=new Set((Array.isArray(p.done)?p.done:[]).map(m=>m?.bead_id).filter(m=>typeof m=="string")),ta=[],Dc=f?.()||"";for(let m of X){let P=xr(m.closed_at);if(typeof m.id!="string"||Oc.has(m.id)||P===null||xn!==void 0&&P<xn||typeof m.comment_count!="number"||m.comment_count<=0)continue;let ie=`${Dc}\0${m.id}\0${String(m.updated_at)}\0${m.comment_count}`,Fe=D.get(ie);Fe===void 0&&r&&(D.set(ie,"pending"),Promise.resolve(r("get-comments",{id:m.id})).then(ft=>{let Ct=Array.isArray(ft)&&ft.some(ut=>es(typeof ut?.text=="string"?ut.text:"")?.lane==="session");D.set(ie,Ct?"session":"not-session"),L()}).catch(()=>{D.set(ie,"failed"),L()})),Fe==="session"&&ta.push({id:m.id,title:m.title||m.id,reason:"",draggable:!1,done:!0,lane:"done",selectable:!1,selected:!1,worker_serial:!1,badges:["\uC138\uC158 \uC791\uC5C5"],alert:!1,usage:null,done_at:P,created_at:m.created_at,updated_at:m.updated_at})}Wr.push(...ta),Wr.sort((m,P)=>(P.done_at||0)-(m.done_at||0));let Sn={};for(let m of Qt)Sn[m]=0;let ra=!1,na=0,vs=0,sa=0;for(let m of Wr){let P=m.usage;if(P&&typeof P=="object"){let ie=!1;for(let Fe of Qt)Number.isFinite(P[Fe])&&(Sn[Fe]+=P[Fe],ra=!0,ie=!0);ie&&(vs+=1,Number.isFinite(P.total_cost_usd)&&(na+=P.total_cost_usd,sa+=1))}}vs>0&&sa===vs&&(Sn.total_cost_usd=na);let oa=Wr.map(m=>m.usage).filter(m=>m&&typeof m=="object"&&m.providers),Mc=oa.length>0?vt(qn(oa)):ra?Bt(Sn):null,Nc=p.lane_states&&typeof p.lane_states=="object"&&!Array.isArray(p.lane_states)?p.lane_states:{},Pc=Array.isArray(p.serial_lanes)?p.serial_lanes:[],aa=m=>{if(_.some(Fe=>Fe.bead_id===m))return"PR \uB300\uAE30 \xB7 \uC810\uC720";let P=Ir.filter(Fe=>Fe&&Fe.bead_id===m),ie=P.length>0?P[P.length-1].status:null;return ie==="failed"||ie==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":ie==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720"},ia=Pc.filter(m=>m&&typeof m.id=="string"&&Array.isArray(m.entries)).map((m,P)=>{let ie=Nc[m.id]||{},Fe=new Map((Array.isArray(ie.corrections)?ie.corrections:[]).filter(st=>st&&typeof st.bead_id=="string"&&typeof st.after=="string").map(st=>[st.bead_id,st.after])),ft=_s(m.entries.filter(st=>!Go.has(st.bead_id)),m.id).map(st=>Fe.has(st.id)?{...st,badges:[`\u{1F517} ${Fe.get(st.id)} \uB4A4 (blocks \uC790\uB3D9)`,...st.badges]}:st),Ct=Array.isArray(ie.occupied_by)?ie.occupied_by.filter(st=>typeof st=="string"):[],ut=Ct.map(st=>({id:st,title:ne.get(st)||st,draggable:!1,lane:m.id,ghost:!0,badges:[aa(st)]}));return{id:m.id,index:P+1,rows:[...ut,...ft],occupied:Ct.length>0,badge:Ct.length>0?aa(Ct[0]):"\uB300\uAE30",cycle:ie.cycle===!0}}),Fc=typeof p.serial_lane_count=="number"?p.serial_lane_count:ia.length;return{queue:p,idToTitle:ne,candidates:Sc,candidate_hidden:{blocked:fs.hidden_blocked,spec:fs.hidden_spec},running:kn,live_count:Qo,slots:ea,over_cap:Ic,failure:Wo,waiting:_s(Ne.filter(m=>!Go.has(m.bead_id)),"queue"),serial_lanes:ia,serial_lane_count:Fc,pr_wait:_.map(m=>a_(m.bead_id,ne.get(m.bead_id)||m.bead_id,b,B[m.bead_id]||null,Dt(p.attempts||{},m.bead_id),E[m.bead_id]||(M.has(m.bead_id)||fe.has(m.bead_id)?{activity:null,merge_progress:{step:"merging"}}:null),$n.get(m.bead_id)||null,m.external===!0,{position:Yo.get(m.bead_id)||0,active:Zo.active===m.bead_id,failure:Cc[m.bead_id]||null,resolution:Vo.get(m.bead_id),continuation_action:Ko.get(m.bead_id)},m.wt_present!==!1,p.auto_merge===!0?Xo(m.bead_id):null,Oo(wn,Tc(m.bead_id)),p.completion_status&&typeof p.completion_status=="object"&&!Array.isArray(p.completion_status)&&p.completion_status[m.bead_id]||null,p.discard_operations&&typeof p.discard_operations=="object"&&!Array.isArray(p.discard_operations)?p.discard_operations:{},bs.get(gs.get(m.bead_id)||"")?.worker_serial===!0)).map(m=>({...m,...d(m.id)})),merge_queue_length:ys.length,merge_queue_running:ys.length>0,auto_excluded:_.map(m=>m.bead_id).filter(m=>Xo(m)!==null),declared_base:wn,done:Wr,token_total:Mc,cleanup_failures:oe,repo_operations:Array.isArray(p.repo_operations)?p.repo_operations:[]}}function lt(p){let w=p.waiting.length>0?p.waiting[0].id:"\u2014",O=i`<button
      type="button"
      class="worker-play${p.queue.auto_advance?" is-active":""}"
    >
      ${p.queue.auto_advance?"\u23F8 \uC790\uB3D9\uD654 \uBA48\uCDA4":"\u25B6 \uC790\uB3D9\uD654"}
    </button>`,X=nt(p),le=p.over_cap?i`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",Ge=i`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${p.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${p.pr_wait.length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${F()} 완료 <b>${p.done.length}</b></span
      >`,ye=i`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${p.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${p.declared_base||"?"}</span
    >`,Xe=i`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${ds}
          step="1"
          .value=${String(p.slots)}
          title="동시에 실행할 세션 수 (최소 1 = 순차 실행)"
      /></label>
      <label
        class="worker-tgl worker-serial-lanes"
        title="고정 직렬 레인 수 (1~5). 축소 시 잘린 레인의 대기 항목은 병렬 대기로 돌아갑니다"
        >직렬 레인
        <select class="worker-serial-lane-count" aria-label="직렬 레인 수">
          ${Array.from({length:nc},(Y,ae)=>ae+1).map(Y=>i`<option
                value=${String(Y)}
                ?selected=${p.serial_lane_count===Y}
              >
                ${Y}
              </option>`)}
        </select>
      </label>
      ${o?i`<button
            type="button"
            class="worker-analysis-btn"
            title="대기 이슈의 병렬 실행 가능성을 분석해 직렬 그룹을 제안합니다 (클릭할 때만 실행)"
          >
            ✳ 병렬성 분석
          </button>`:""}
      <button
        type="button"
        class="worker-exec-defaults-btn"
        aria-haspopup="dialog"
        aria-label="전역 실행 설정"
        title="전역 실행 설정"
      >
        ⚙
      </button>`,ne=kl({failure:p.failure}),y=_l(p.repo_operations,p.cleanup_failures);return H?i`<div class="worker-ribbon">
          ${O} ${X}
          <div class="worker-kpi worker-kpi--ribbon">${le}${Ge}</div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${Xe}</div>
          <div class="worker-kpi">${ye}</div>
        </div>
        ${y}${ne}`:i`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${O}${X}${Xe}</div>
        <div class="worker-kpi">
          ${le}${Ge}${ye}
          ${(Array.isArray(p.token_total)?p.token_total:p.token_total?[{label:p.token_total,tooltip:`${F()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(Y=>i`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${Y.tooltip}
                >${F()} 완료 · 누적 ${Y.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${w}</b></span
          >
        </div>
      </div>
      ${y}${ne}`}function ot(p){if(p.running.length===0&&p.pr_wait.length===0)return"";let w=p.running.some(O=>!O.paused&&O.failed!==!0);return i`<section
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
          >${p.running.length+p.pr_wait.length}</span
        >
      </header>
      ${p.running.length>0?xo(p.running,Date.now(),_e):""}
      ${p.pr_wait.map(O=>yo(O))}
    </section>`}function dt(p){let w=p.candidate_hidden;return i`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${k.show_blocked}
        />
        🔒 blocked${w.blocked>0?` ${w.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${jf.map(O=>i`<button
              type="button"
              class="worker-filter__chip${k.spec===O.value?" is-active":""}"
              data-spec=${O.value}
              aria-pressed=${k.spec===O.value?"true":"false"}
            >
              ${O.label}
            </button>`)}
        ${w.spec>0?i`<span class="worker-filter__hidden">숨김 ${w.spec}</span>`:""}
      </div>
    </div>`}function At(){return i`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${J}
    >
      ${zf.map(p=>i`<option value=${p.value} ?selected=${J===p.value}>
            ${p.label}
          </option>`)}
    </select>`}function it(){return i`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${se}
      >
        ${Wt.map(p=>i`<option value=${p.value} ?selected=${se===p.value}>
              ${p.label}
            </option>`)}
      </select>
    </div>`}function mt(p){let w=i`<span
      class="worker-lane__badge${p.occupied?" worker-lane__badge--held":""}"
      >${p.badge}</span
    >`,O=p.cycle?i`<div class="worker-lane__cycle">
          ⚠ blocks 순환 감지 — 자동 정렬을 생략했습니다
        </div>`:"";return Ht({id:`worker-pane-lane-${p.id}`,lane:p.id,title:`\uC9C1\uB82C ${p.index}`,items:p.rows,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uD589\uC744 \uC5EC\uAE30\uB85C \uB4DC\uB798\uADF8",header_control:w,controls:O})}function nt(p){let w=p.queue.auto_merge===!0;if(p.merge_queue_running)return i`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop${w?" is-active":""}"
        title=${w?"\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB044\uACE0 \uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)":"\uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)"}
      >
        ${w?"\u23F8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8":"\uC77C\uAD04 \uBA38\uC9C0 \uC911\uB2E8"} ${p.merge_queue_length}
      </button>`;if(w)return i`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop is-active"
        title="자동 머지 켜짐 — 자격이 생기는 PR을 계속 큐에 넣습니다. 클릭하면 끕니다"
      >
        ⏸ 자동 머지
      </button>`;let O=new Set(p.auto_excluded),X=p.pr_wait.filter(le=>le.merge_action&&le.merge_enabled&&!O.has(le.id)).length;return i`<button
      type="button"
      class="worker-merge-all"
      title="켜 두면 자격이 생기는 PR을 계속 큐에 넣어 순서대로 충돌 해소·머지합니다"
    >
      ▶ 자동 머지${X>0?` ${X}`:""}
    </button>`}function ct(p){let w=Ht({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:p.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:At(),controls:dt(p)});return H?i`<div class="worker-lanes worker-lanes--mobile">
        ${ot(p)}
        ${Ht({id:"worker-pane-queue",lane:"queue",title:"\uBCD1\uB82C \uB300\uAE30",items:p.waiting,empty:"\uB4DC\uB798\uADF8 \uB610\uB294 [\uB300\uAE30\uB85C \u21B4]\uB85C \uBC30\uCE58",collapsible:!0,collapsed:S.queue,preview:oc(p.waiting)})}
        ${p.serial_lanes.map(O=>mt(O))}
        ${w}
        ${Ht({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:p.done,empty:`${F()} \uC644\uB8CC \uC5C6\uC74C`,controls:it(),collapsible:!0,collapsed:S.done,preview:Array.isArray(p.token_total)?p.token_total.map(O=>O.label).join(" \xB7 "):p.token_total||oc(p.done)})}
      </div>`:i`<div class="worker-lanes">
      ${w}
      <div class="worker-wait">
        ${Ht({id:"worker-pane-queue",lane:"queue",title:"\uBCD1\uB82C \uB300\uAE30",items:p.waiting,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58"})}
        ${p.serial_lanes.map(O=>mt(O))}
      </div>
      ${Ht({id:"worker-pane-running",lane:"running",title:`\uC2E4\uD589 \uC911 \xB7 \uC2AC\uB86F ${p.slots}`,items:p.running,live:p.running.some(O=>!O.paused&&O.failed!==!0),body:xo(p.running,Date.now(),_e)})}
      ${Ht({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:p.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C"})}
      ${Ht({id:"worker-pane-done",lane:"done",title:`\uC644\uB8CC \xB7 ${F()} ${p.done.length}`,items:p.done,empty:`${F()} \uC644\uB8CC \uC5C6\uC74C`,controls:it()})}
    </div>`}function gt(p){S={...S,[p]:!S[p]},Zf(S),L()}function L(){let p=ze();Pe(lt(p),Se),Pe(ct(p),be)}function Z(){let p=document.querySelector(".app-header");if(!p)return;let w=()=>{let O=Math.round(p.getBoundingClientRect().height);he.style.setProperty("--worker-ribbon-top",`${O}px`)};if(w(),typeof ResizeObserver=="function"){let O=new ResizeObserver(w);O.observe(p),ce.push(()=>O.disconnect())}else window.addEventListener("resize",w),ce.push(()=>window.removeEventListener("resize",w))}function pe(){if(typeof window.matchMedia!="function")return;let p=window.matchMedia(Vf);H=!!p.matches;let w=O=>{let X=!!(O&&typeof O.matches=="boolean"?O.matches:p.matches);X!==H&&(H=X,L())};typeof p.addEventListener=="function"?(p.addEventListener("change",w),ce.push(()=>p.removeEventListener("change",w))):typeof p.addListener=="function"&&(p.addListener(w),ce.push(()=>p.removeListener(w)))}let de=null;function ke(p){de=p.target instanceof Element?p.target:null}function Le(p){let O=p.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!O)return;if(de&&O.contains(de)&&de.closest("input, button, a")){p.preventDefault();return}let X=O.dataset.beadId||"",le=O.dataset.lane||"";T={bead_id:X,from_lane:le};try{p.dataTransfer?.setData("text/plain",X),p.dataTransfer&&(p.dataTransfer.effectAllowed="move")}catch{}}function He(p){let w=p.target?.closest?.(".worker-pane");if(!w)return;let O=w.dataset.lane||"";O!=="candidate"&&O!=="queue"&&!/^s[1-5]$/.test(O)||(p.preventDefault(),p.dataTransfer&&(p.dataTransfer.dropEffect="move"),w.classList.add("worker-pane--drag-over"))}function Je(p){p.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function Ie(p,w){let O=W.find(ye=>ye.id===p);if(!O)return;let X=W.filter(ye=>ye.id!==p),le=X.length;if(w){let ye=w.dataset.beadId;if(ye===p)return;let Xe=X.findIndex(ne=>ne.id===ye);Xe>=0&&(le=Xe)}let Ge=X.slice();Ge.splice(le,0,O),$.applyReorder(p,Ge,le)}function We(p){let w=p.target?.closest?.(".worker-pane");if(!w)return;p.preventDefault(),w.classList.remove("worker-pane--drag-over");let O=w.dataset.lane||"",X=T?.bead_id||p.dataTransfer?.getData("text/plain")||"",le=T?.from_lane||"";if(T=null,!X)return;let Ge=p.target?.closest?.(".worker-mini, .worker-card"),ye=Array.from(w.querySelectorAll(".worker-mini, .worker-card")),Xe=ye.length;if(Ge){let ne=ye.indexOf(Ge);ne>=0&&(Xe=ne)}if(Xe=Math.max(0,Xe-w.querySelectorAll(".worker-mini--ghost").length),w.classList.contains("worker-pane--collapsed")&&(Xe=R()),O==="candidate"){if(le==="candidate"){Ie(X,Ge);return}(le==="queue"||/^s[1-5]$/.test(le))&&me(X);return}if(O==="queue"||/^s[1-5]$/.test(O)){let ne=O==="queue"?"parallel":O;le===O?ue(X,ne,Xe):j(X,ne,Xe)}}function $e(p){k=p,Bf(p),L()}function yt(p){J=p==="board"||p==="created"||p==="spec"?p:us,Wf(J),L()}function wt(p){se=Ot(p)?p:Rt,Yf(se),h?.(se),L()}function Nt(p){let w=p.target?.closest?.(".worker-serial-lane-count");if(w){let Xe=Number.parseInt(w.value,10);Number.isFinite(Xe)&&Me(Xe).then(L);return}let O=p.target?.closest?.(".worker-filter__blocked");if(O){$e({...k,show_blocked:O.checked});return}let X=p.target?.closest?.(".worker-done-range");if(X){wt(X.value);return}let le=p.target?.closest?.(".worker-sort");if(le){yt(le.value||us);return}let Ge=p.target?.closest?.(".worker-slots__input");if(!Ge)return;let ye=Number.parseInt(Ge.value,10);if(!Number.isFinite(ye)){L();return}Ee(ye).then(L)}function Vt(p){return p?{runner:p.runner||void 0,model:p.model||void 0,effort:p.effort||void 0,worktree:p.worktree||void 0,status:p.status||void 0,session_id:p.session_id||void 0}:{}}function Kt(){let p=ze();return{operations:p.repo_operations,cleanup_failures:p.cleanup_failures,repo:f&&f()||""}}function _t(){_e&&ve.close(),Ae.hidden=!1,Re.hidden=!1,N.open(Kt()),L()}function Tt(p){let w=te(),O=w.attempts?w.attempts[p]:null;_e=p,N.close(),Ae.hidden=!0,Re.hidden=!1,ve.open({attempt_id:p,meta:Vt(O)}),L()}function sr(){if(N.isOpen()&&N.refresh(Kt()),!_e)return;let p=te(),w=p.attempts?p.attempts[_e]:null;if(w){ve.updateMeta(Vt(w));return}ve.close()}function Pt(p){let w=p.target;if(w?.closest?.(".worker-mini__serial, .worker-mini__grip")||w?.closest?.("#worker-exec-defaults-dialog"))return;if(w?.closest?.(".worker-exec-defaults-btn")){A.open();return}if(w?.closest?.(".worker-analysis-btn")){I?.open();return}if(w?.closest?.(".worker-repo-strip")||w?.closest?.(".worker-mini__timeline")){_t();return}let O=w?.closest?.(".worker-repo-op__session");if(O){let B=O.dataset.attemptId;B&&Tt(B);return}let X=w?.closest?.(".worker-repo-op__resolve");if(X){ee(X.dataset.operationId||"");return}let le=w?.closest?.(".worker-repo-op__dismiss");if(le){De(le.dataset.operationId||"");return}let Ge=w?.closest?.(".worker-cleanup__resume");if(Ge){let B=Ge.dataset.beadId;B&&rt(B);return}let ye=w?.closest?.(".worker-banner__resume");if(ye){let B=ye.dataset.attemptId;B&&we(B);return}let Xe=w?.closest?.(".worker-banner__discard");if(Xe){let B=Xe.dataset.confirmation==="merged"?"merged":"unmerged";C(Xe.dataset.beadId||"",Xe.dataset.attemptId||null,B,Xe.dataset.operationId||null);return}let ne=w?.closest?.(".worker-banner__dismiss");if(ne){let B=ne.dataset.attemptId;B&&xe(B);return}if(w?.closest?.(".worker-play")){K(!te().auto_advance);return}let y=w?.closest?.(".worker-merge-all");if(y){y.classList.contains("worker-merge-all--stop")?te().auto_merge===!0?G(!1):v():G(!0);return}let Y=w?.closest?.(".worker-pane__hd--toggle");if(Y){let B=Y.dataset.lane;(B==="queue"||B==="done")&&gt(B);return}let ae=w?.closest?.(".worker-card__place");if(ae){let B=ae.dataset.beadId;B&&!ae.disabled&&j(B,"parallel",R());return}let Be=w?.closest?.(".worker-filter__chip");if(Be){let B=Be.dataset.spec;(B==="all"||B==="with"||B==="without")&&$e({...k,spec:B});return}let et=w?.closest?.(".worker-mini__merge");if(et){let B=et.dataset.beadId||"";te().cleanup_failed?.[B]?rt(B):je(B);return}let Ze=w?.closest?.(".worker-mini__merge-cancel");if(Ze){z(Ze.dataset.beadId||"");return}let ge=w?.closest?.(".worker-mini__discard");if(ge){C(ge.dataset.beadId||"",ge.dataset.attemptId||null,ge.dataset.discardMode==="merged"?"merged":"unmerged",ge.dataset.operationId||null);return}let d=w?.closest?.(".worker-mini__revise-fix");if(d){q("worker-revise-fix",d.dataset.beadId||"");return}let _=w?.closest?.(".worker-mini__revise-approve");if(_){q("worker-revise-approve",_.dataset.beadId||"");return}if(w?.closest?.(".worker-mini__pr"))return;if(w?.closest?.(".rtile__discard")){let B=w?.closest?.(".rtile"),oe=B?.dataset?.beadId,Ne=B?.dataset?.attemptId;oe&&C(oe,Ne||null,"unmerged",w?.closest?.(".rtile__discard")?.dataset.operationId||null);return}if(w?.closest?.(".rtile__dismiss")){let oe=w?.closest?.(".rtile")?.dataset?.attemptId;oe&&xe(oe);return}if(w?.closest?.(".rtile__pause")){let oe=w?.closest?.(".rtile")?.dataset?.attemptId;oe&&Te(oe);return}if(w?.closest?.(".rtile__resume")){let oe=w?.closest?.(".rtile")?.dataset?.attemptId;oe&&we(oe);return}if(w?.closest?.(".rtile__session")){let oe=w?.closest?.(".rtile")?.dataset?.attemptId;oe&&Tt(oe);return}if(w?.closest?.(".worker-drawer-overlay__backdrop")){N.close(),ve.close();return}if(w?.closest?.(".worker-drawer-host"))return;let b=w?.closest?.(".rtile");if(b){if(w?.closest?.(".rtile__id")){let oe=b.dataset.beadId;oe&&Sr(oe).then(Ne=>{Ne?re("\uBCF5\uC0AC\uB428","success",1200):re("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let B=b.dataset.beadId;B&&u&&u(B);return}let E=w?.closest?.(".worker-mini, .worker-card");if(E){let B=E.dataset.beadId;if(w?.closest?.(".worker-mini__id, .worker-card__id")){B&&Sr(B).then(oe=>{oe?re("\uBCF5\uC0AC\uB428","success",1200):re("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}B&&u&&u(B)}}return e.addEventListener("pointerdown",ke),e.addEventListener("dragstart",Le),e.addEventListener("dragover",He),e.addEventListener("dragleave",Je),e.addEventListener("drop",We),e.addEventListener("click",Pt),e.addEventListener("change",Nt),pe(),Z(),x&&ce.push(x.subscribe(()=>{for(let[p,w]of D)w==="failed"&&D.delete(p);L()})),s&&ce.push(s.subscribe(()=>{L(),sr()})),L(),{load(){L()},openExecDefaults(){A.open()},destroy(){for(let p of ce.splice(0))try{p()}catch{}e.removeEventListener("pointerdown",ke),e.removeEventListener("dragstart",Le),e.removeEventListener("dragover",He),e.removeEventListener("dragleave",Je),e.removeEventListener("drop",We),e.removeEventListener("click",Pt),e.removeEventListener("change",Nt);try{ve.destroy()}catch{}Re.hidden=!0;try{A.destroy()}catch{}try{I?.destroy()}catch{}Pe(i``,e)}}}function Mo(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function uc(e,t,r,n=async()=>{},s=async()=>{}){let o=at("views:workspace-picker"),a=null,c=!1,l=!1,u=!1;async function f(S){let M=S.target.value,Ce=t.getState().workspace?.current?.path||"";if(M&&M!==Ce){o("switching workspace to %s",M),c=!0,F();try{await r(M)}catch(ce){o("workspace switch failed: %o",ce)}finally{c=!1,F()}}}async function g(){let S=t.getState(),H=S.workspace?.current?.path||S.workspace?.available?.[0]?.path||"";if(!(!H||l)){o("git-pulling workspace %s",H),l=!0,F();try{await n(H)}catch(M){o("workspace git pull failed: %o",M)}finally{l=!1,F()}}}function h(S){let H=S.target;H&&e.contains(H)||T()}function x(S){S.key==="Escape"&&T()}function $(){u||(u=!0,document.addEventListener("mousedown",h),document.addEventListener("keydown",x),F())}function T(){u&&(u=!1,document.removeEventListener("mousedown",h),document.removeEventListener("keydown",x),F())}function W(){u?T():$()}async function k(S){let H=S.target,M=H.value,fe=H.checked;o("toggling visibility %s \u2192 %s",M,String(fe));try{await s(M,fe)}catch(Ce){o("workspace visibility toggle failed: %o",Ce)}}function J(S){return S?i`
      <button
        type="button"
        class="workspace-picker__git-pull-button"
        @click=${g}
        ?disabled=${c||l}
        aria-label="Git Pull"
        title="Git Pull"
      >
        <span aria-hidden="true">⬇</span>
      </button>
    `:i``}function se(S,H){return i`
      <div class="workspace-picker__manage">
        <button
          type="button"
          class="workspace-picker__manage-button"
          @click=${W}
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
                ${S.map(M=>i`
                    <label
                      class="workspace-picker__manage-row"
                      title="${M.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${M.path}"
                        .checked=${!H.has(M.path)}
                        @change=${k}
                      />
                      <span class="workspace-picker__manage-name"
                        >${Mo(M.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function D(){let S=t.getState(),H=S.workspace?.current,M=S.workspace?.available||[],fe=new Set(S.workspace?.hidden||[]),Ce=H?.path||M[0]?.path||"";if(M.length===0)return i``;let ce=M.filter(he=>!fe.has(he.path)||he.path===Ce);if(ce.length<=1){let he=ce[0]||M[0],Se=Mo(he.path);return i`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${he.path}"
            >${Se}</span
          >
          ${se(M,fe)}
          ${J(Ce)}
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
          ${ce.map(he=>i`
              <option
                value="${he.path}"
                ?selected=${he.path===Ce}
                title="${he.path}"
              >
                ${Mo(he.path)}
              </option>
            `)}
        </select>
        ${se(M,fe)}
        ${J(Ce)}
        ${c||l?i`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function F(){Pe(D(),e)}return F(),a=t.subscribe(()=>F()),{destroy(){a&&(a(),a=null),document.removeEventListener("mousedown",h),document.removeEventListener("keydown",x),Pe(i``,e)}}}var pc=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-automation-toggle","worker-auto-repair-toggle","worker-repo-operation-repair","worker-repo-operation-dismiss","worker-queue-set-slots","worker-queue-set-serial-lane-count","subscribe-worker-parallel-analysis","unsubscribe-worker-parallel-analysis","worker-parallel-analysis-snapshot","worker-parallel-analysis-start","worker-parallel-analysis-cancel","worker-parallel-analysis-settings-update","worker-parallel-analysis-submit","worker-queue-set-default-exec-preset","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-cleanup-retry","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-worker-system-prompt","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-exec-presets","unsubscribe-exec-presets","exec-presets-snapshot","exec-preset-create","exec-preset-update","exec-preset-delete","apply-exec-preset","monitor-auto-toggle"];function No(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function fc(e,t,r=No()){return{id:r,type:e,payload:t}}function _c(e={}){let t=at("ws"),r={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},n=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",a=0,c=null,l=!0,u=new Map,f=[],g=new Map,h=new Set;function x(D){for(let F of Array.from(h))try{F(D)}catch{}}function $(){if(!l||c)return;o="reconnecting",t("ws reconnecting\u2026"),x(o);let D=Math.min(r.maxMs||0,(r.initialMs||0)*Math.pow(r.factor||1,a)),F=(r.jitterRatio||0)*D,S=Math.max(0,Math.round(D+(Math.random()*2-1)*F));t("ws retry in %d ms (attempt %d)",S,a+1),c=setTimeout(()=>{c=null,se()},S)}function T(D){try{s?.send(JSON.stringify(D))}catch(F){t("ws send failed",F)}}function W(){for(o="open",t("ws open"),x(o),a=0;f.length;){let D=f.shift();D&&T(D)}}function k(D){let F;try{F=JSON.parse(String(D.data))}catch{t("ws received non-JSON message");return}if(!F||typeof F.id!="string"||typeof F.type!="string"){t("ws received invalid envelope");return}if(u.has(F.id)){let H=u.get(F.id);u.delete(F.id),F.ok?H?.resolve(F.payload):H?.reject(F.error||new Error("ws error"));return}let S=g.get(F.type);if(S&&S.size>0)for(let H of Array.from(S))try{H(F.payload)}catch(M){t("ws event handler error",M)}else t("ws received unhandled message type: %s",F.type)}function J(){o="closed",t("ws closed"),x(o);for(let[D,F]of u.entries())F.reject(new Error("ws disconnected")),u.delete(D);a+=1,$()}function se(){if(!l)return;let D=n();try{s=new WebSocket(D),t("ws connecting %s",D),o="connecting",x(o),s.addEventListener("open",W),s.addEventListener("message",k),s.addEventListener("error",()=>{}),s.addEventListener("close",J)}catch(F){t("ws connect failed %o",F),$()}}return se(),{send(D,F){if(!pc.includes(D))return Promise.reject(new Error(`unknown message type: ${D}`));let S=No(),H=fc(D,F,S);return t("send %s id=%s",D,S),new Promise((M,fe)=>{u.set(S,{resolve:M,reject:fe,type:D}),s&&s.readyState===s.OPEN?T(H):(t("queue %s id=%s (state=%s)",D,S,o),f.push(H))})},on(D,F){g.has(D)||g.set(D,new Set);let S=g.get(D);return S?.add(F),()=>{S?.delete(F)}},onConnection(D){return h.add(D),()=>{h.delete(D)}},reconnect(){l=!0,c&&(clearTimeout(c),c=null),a=0,se()},close(){l=!1,c&&(clearTimeout(c),c=null);try{s?.close()}catch{}},getState(){return o}}}function i_(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function l_(e,t){try{let n=await(await fetch("/api/config")).json();e.setState({config:n})}catch(r){t("config refresh failed",r)}}var Po=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],mc=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"],["tab:worker:closed","closed-issues"]],mr="tab:worker:closed",c_="bdui.worker.done-range",gc=ql,bc="worker:queue",hc="worker:parallel-analysis",yc="ui:order",vc="ui:display-policy",wc="exec:presets",gr="tab:board:closed",kc="beads-ui.board.closed-range";function d_(e){let t=at("main");t("bootstrap start");let r=i`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;Pe(r,e);let n=document.getElementById("top-nav"),s=document.getElementById("usage-meter"),o=document.getElementById("board-root"),a=document.getElementById("worker-root"),c=document.getElementById("monitor-root"),l=document.getElementById("detail-panel");if(s&&Vl(s),o&&a&&c&&l){let be=function(d,_){let b="Request failed",E="";if(d&&typeof d=="object"){let oe=d;if(typeof oe.message=="string"&&oe.message.length>0&&(b=oe.message),typeof oe.details=="string")E=oe.details;else if(oe.details&&typeof oe.details=="object")try{E=JSON.stringify(oe.details,null,2)}catch{E=""}}else typeof d=="string"&&d.length>0&&(b=d);let B=_&&_.length>0?`Failed to load ${_}`:"Request failed";Ae.open(B,b,E)},G=function(d){return`${X.getState().workspace.current?.path||""}\0${d}`},z=function(){me&&(me().catch(()=>{}),me=null),Te=null,we=null},C=function(d){xe=d;let _=()=>{xe!==d||X.getState().selected_id!==d||(xe=null,v(d))};if(!rt){je.then(_);return}_()},De=function(d,_,b,E,B){return b!==ee[_]?(B().catch(()=>{}),!1):(d.set(E,B),!0)},Ee=function(){let d=X.getState();dt(d.view==="board"),gt(d.view==="worker"),ke(d.view==="monitor"),Z(d.view==="board"||d.view==="worker"||!!d.selected_id)},lt=function(){let d=wr(Me);return d===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:d}}},ot=function(){let d=wr(ze);return d===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:d}}},dt=function(d){if(d)for(let[_,b]of Po){if(q.has(_)||K.has(_))continue;let E=_===gr?lt():{type:b};try{A.register(_,E)}catch(Ne){t("register %s store failed: %o",_,Ne)}K.add(_);let B=ee.board,oe=!1;N.subscribeList(_,E).then(Ne=>{oe=!De(q,"board",B,_,Ne)}).catch(Ne=>{t("subscribe %s failed: %o",_,Ne),be(Ne,"board")}).finally(()=>{K.delete(_),oe&&Ee()})}else mt()},mt=function(){ee.board+=1;for(let[d]of Po){let _=q.get(d);_&&(_().catch(()=>{}),q.delete(d));try{A.unregister(d)}catch(b){t("unregister %s failed: %o",d,b)}}},gt=function(d){if(!d){L();return}for(let[_,b]of mc){if(nt.has(_)||K.has(_))continue;let E=_===mr?ot():{type:b};try{A.register(_,E)}catch(Ne){t("register %s store failed: %o",_,Ne)}K.add(_);let B=ee.worker,oe=!1;N.subscribeList(_,E).then(Ne=>{oe=!De(nt,"worker",B,_,Ne)}).catch(Ne=>{t("subscribe %s failed: %o",_,Ne),be(Ne,"worker")}).finally(()=>{K.delete(_),oe&&Ee()})}},L=function(){ee.worker+=1;for(let[d]of mc){let _=nt.get(d);_&&(_().catch(()=>{}),nt.delete(d));try{A.unregister(d)}catch(b){t("unregister %s failed: %o",d,b)}}},Z=function(d){if(!d){pe();return}ct||(ve("subscribe-worker-queue",{id:bc}).catch(_=>{t("subscribe-worker-queue failed: %o",_)}),ve("subscribe-worker-parallel-analysis",{id:hc}).catch(_=>{t("subscribe-worker-parallel-analysis failed: %o",_)}),ct=()=>(ve("unsubscribe-worker-parallel-analysis",{id:hc}),ve("unsubscribe-worker-queue",{id:bc})))},pe=function(){ct&&(ct().catch(()=>{}),ct=null),te.clear()},ke=function(d){if(!d){Le();return}de||(ve("subscribe-monitor-pipeline",{id:gc}).catch(_=>{t("subscribe-monitor-pipeline failed: %o",_)}),de=()=>ve("unsubscribe-monitor-pipeline",{id:gc}))},Le=function(){de&&(de().catch(()=>{}),de=null)},Je=function(){He||(ve("subscribe-ui-order",{id:yc}).catch(d=>{t("subscribe-ui-order failed: %o",d)}),He=()=>ve("unsubscribe-ui-order",{id:yc}))},Ie=function(){He&&(He().catch(()=>{}),He=null),Q.clear()},$e=function(){We||(ve("subscribe-display-policy",{id:vc}).catch(d=>{t("subscribe-display-policy failed: %o",d)}),We=()=>ve("unsubscribe-display-policy",{id:vc}))},yt=function(){We&&(We().catch(()=>{}),We=null),R.clear()},Nt=function(){wt||(ve("subscribe-exec-presets",{id:wc}).catch(d=>{t("subscribe-exec-presets failed: %o",d)}),wt=()=>ve("unsubscribe-exec-presets",{id:wc}))},Pt=function(d){if(!d)return"Unknown";let _=d.split("/").filter(Boolean);return _.length>0?_[_.length-1]:"Unknown"};var u=be,f=G,g=z,h=C,x=De,$=Ee,T=lt,W=ot,k=dt,J=mt,se=gt,D=L,F=Z,S=pe,H=ke,M=Le,fe=Je,Ce=Ie,ce=$e,he=yt,Se=Nt,Re=Pt;let Ve=document.getElementById("header-loading"),Oe=Ga(Ve),Ae=fl(e),_e=_c(),ve=Oe.wrapSend((d,_)=>_e.send(d,_)),N=Fa(ve),A=qa(),I=ja(),te=Ua(),V=$a(),Q=Ba(),R=wa(),j=ka(),ue=xa();_e.on("exec-presets-snapshot",d=>{let _=d;_&&typeof _.revision=="number"&&Array.isArray(_.presets)&&j.set({revision:_.revision,presets:_.presets})}),_e.on("monitor-pipeline-snapshot",d=>{let _=d;if(!(!_||!Array.isArray(_.workspaces)))try{V.set(_.workspaces,_.workspaces_state)}catch{}}),_e.on("ui-order-snapshot",d=>{let _=d;if(_&&typeof _.revision=="number")try{Q.set({revision:_.revision,order:_.order&&typeof _.order=="object"?_.order:{}})}catch{}}),_e.on("display-policy-snapshot",d=>{let _=d;if(_&&_.policy&&typeof _.policy=="object")try{R.set(_.policy)}catch{}}),_e.on("session-log-snapshot",d=>{let _=d;if(_&&typeof _.attempt_id=="string")try{ue.set(_.attempt_id,Array.isArray(_.lines)?_.lines:[],typeof _.last_event_at=="number"?_.last_event_at:null)}catch{}}),_e.on("session-log-append",d=>{let _=d;if(_&&typeof _.attempt_id=="string")try{ue.append(_.attempt_id,_.event)}catch{}}),_e.on("snapshot",d=>{let _=d,b=_&&typeof _.id=="string"?_.id:"",E=b?A.getStore(b):null;if(E&&_&&_.type==="snapshot")try{E.applyPush(_)}catch{}}),_e.on("upsert",d=>{let _=d,b=_&&typeof _.id=="string"?_.id:"",E=b?A.getStore(b):null;if(E&&_&&_.type==="upsert")try{E.applyPush(_)}catch{}}),_e.on("delete",d=>{let _=d,b=_&&typeof _.id=="string"?_.id:"",E=b?A.getStore(b):null;if(E&&_&&_.type==="delete")try{E.applyPush(_)}catch{}});let me=null,Te=null,we=null,xe=null,Ue=()=>{},je=new Promise(d=>{Ue=()=>d(void 0)}),rt=!1,U=!1;async function v(d){let _=G(d);if(_===Te||_===we)return;we=_;let b=`detail:${d}`,E={type:"issue-detail",params:{id:d}};try{A.register(b,E)}catch(B){t("register detail store failed: %o",B)}try{let B=await N.subscribeList(b,E);if(X.getState().selected_id!==d||G(d)!==_){await B().catch(()=>{});return}me&&await me().catch(()=>{}),me=B,Te=_}catch(B){t("detail subscribe failed: %o",B),be(B,"issue details")}finally{we===_&&(we=null)}}let q=new Map,K=new Set,ee={board:0,worker:0},Me=Rt;try{let d=window.localStorage.getItem(kc);Ot(d)&&(Me=d)}catch{}let ze=Rt;try{let d=window.localStorage.getItem(c_);Ot(d)&&(ze=d)}catch{}async function At(d){if(!Ot(d)||d===Me)return;Me=d;try{window.localStorage.setItem(kc,d)}catch{}let _=q.get(gr);if(!_)return;q.delete(gr),await _().catch(()=>{});let b=lt();try{A.register(gr,b)}catch(E){t("register %s store failed: %o",gr,E)}try{let E=await N.subscribeList(gr,b);q.set(gr,E)}catch(E){t("re-subscribe %s failed: %o",gr,E),be(E,"board")}}async function it(d){if(!Ot(d)||d===ze)return;ze=d;let _=nt.get(mr);if(!_)return;nt.delete(mr),await _().catch(()=>{});let b=ot();try{A.register(mr,b)}catch(E){t("register %s store failed: %o",mr,E)}try{let E=await N.subscribeList(mr,b);nt.set(mr,E)}catch(E){t("re-subscribe %s failed: %o",mr,E),be(E,"worker")}}let nt=new Map,ct=null,de=null,He=null,We=null,wt=null;async function Vt(){We=null,R.clear(),wt=null,j.clear(),ct=null,de=null,q.clear(),nt.clear(),ee.board+=1,ee.worker+=1,Nt();let d=X.getState().workspace.current?.path;if(d)try{await _e.send("set-workspace",{path:d})}catch(b){t("workspace restore after reconnect failed: %o",b);return}$e();let _=X.getState();dt(_.view==="board"),gt(_.view==="worker"),ke(_.view==="monitor"),Z(_.view==="board"||_.view==="worker"||!!_.selected_id)}async function Kt(){t("clearing all subscriptions for workspace switch"),mt(),L(),pe(),I.clear(),Ie(),Je(),yt(),$e(),z();let d=X.getState();if(d.selected_id)try{A.unregister(`detail:${d.selected_id}`)}catch{}let _=X.getState();dt(_.view==="board"),gt(_.view==="worker"),ke(_.view==="monitor"),Z(_.view==="board"||_.view==="worker"||!!_.selected_id),_.selected_id&&C(_.selected_id)}async function _t(d){t("requesting workspace switch to %s",d),U=!0;try{let _=await _e.send("set-workspace",{path:d});t("workspace switch result: %o",_),_&&_.workspace&&(X.setState({workspace:{current:{path:_.workspace.root_dir,database:_.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",d),_.changed&&(await Kt(),re("Switched to "+Pt(d),"success",2e3)))}catch(_){throw t("workspace switch failed: %o",_),re("Failed to switch workspace","error",3e3),_}finally{U=!1}}async function Tt(d){t("requesting workspace git pull for %s",d);try{let _=await _e.send("git-pull-workspace",{});t("workspace git pull result: %o",_);let b=_?.status;if(b==="up_to_date"){re("Already up to date","success",2e3);return}if(b==="stash_pop_conflict"){re("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}re("Git pulled "+Pt(d),"success",2e3)}catch(_){t("workspace git pull failed: %o",_);let b=_?.code,E=_?.message;if(b==="rebase_conflict"){re("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(b==="rebase_conflict_abort_failed"){re("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(b==="busy"){re("Git pull skipped: another operation is running","warning",3e3);return}let B=E?`: ${E}`:"";throw re(`Git pull failed${B}`,"error",3e3),_}}async function sr(d,_){t("setting workspace visibility %s \u2192 %s",d,String(_));try{await _e.send("set-workspace-visibility",{path:d,visible:_}),await p()}catch(b){t("workspace visibility update failed: %o",b),re("Failed to update project visibility","error",3e3)}}async function p(){try{let d=await _e.send("list-workspaces",{});if(t("workspaces loaded: %o",d),d&&Array.isArray(d.workspaces)){let _=d.workspaces.map(oe=>({path:oe.path,database:oe.database,pid:oe.pid,version:oe.version})),b=d.current?{path:d.current.root_dir,database:d.current.db_path}:null,E=Array.isArray(d.hidden)?d.hidden.filter(oe=>typeof oe=="string"):[];X.setState({workspace:{current:b,available:_,hidden:E}});let B=window.localStorage.getItem("beads-ui.workspace");B&&(!_.some(Ne=>Ne.path===B)||E.includes(B)?window.localStorage.removeItem("beads-ui.workspace"):b&&B!==b.path&&(t("restoring saved workspace preference: %s",B),await _t(B)))}}catch(d){t("failed to load workspaces: %o",d)}}_e.on("workspace-changed",d=>{t("workspace-changed event: %o",d),d&&d.root_dir&&(X.setState({workspace:{current:{path:d.root_dir,database:d.db_path}}}),p(),Kt())});let w=!1;if(typeof _e.onConnection=="function"){let d=_=>{t("ws state %s",_),_==="reconnecting"||_==="closed"?(w=!0,re("Connection lost. Reconnecting\u2026","error",4e3)):_==="open"&&w&&(w=!1,re("Reconnected","success",2200),l_(X,(b,E)=>{t(`${b}: %o`,E)}),Vt())};_e.onConnection(d)}let O="board";try{let d=window.localStorage.getItem("beads-ui.view");(d==="board"||d==="worker"||d==="monitor")&&(O=d)}catch(d){t("view parse error: %o",d)}let X=Wa({config:i_(),view:O});_e.on("worker-queue-snapshot",d=>{let _=d;if(!_||!_.queue)return;let b=X.getState().workspace.current?.path;if(typeof b=="string"&&b.length>0&&_.root_dir!==b){t("dropping worker-queue snapshot for %s",String(_.root_dir));return}try{I.set(_.queue)}catch{}}),_e.on("worker-parallel-analysis-snapshot",d=>{let _=d;if(!_)return;let b=X.getState().workspace.current?.path;if(!(typeof b=="string"&&b.length>0&&typeof _.root_dir=="string"&&_.root_dir!==b))try{te.set({settings:_.settings,job:_.job??null,last_good:_.last_good??null})}catch{}});let le=za(X);le.start();let Ge=new Set(["get-comments","exec-preset-create","exec-preset-update","exec-preset-delete","apply-exec-preset"]),ye=async(d,_)=>{try{return await ve(d,_)}catch(b){if(Ge.has(d))throw b;return[]}};n&&Ul(n,X,le);let Xe=document.getElementById("workspace-picker");Xe&&uc(Xe,X,_t,Tt,sr);let ne=Wl(e,(d,_)=>ve(d,_));try{let d=document.getElementById("new-issue-btn");d&&d.addEventListener("click",()=>ne.open())}catch{}let y=pl(e,{policyStore:R,transport:(d,_)=>ve(d,_),labelOptions:()=>{let d=new Set;for(let[_]of Po)for(let b of A.snapshotFor(_)||[]){let E=b.labels;if(Array.isArray(E))for(let B of E)typeof B=="string"&&B.length>0&&d.add(B)}return Array.from(d).sort()}});try{let d=document.getElementById("display-settings-btn");d&&d.addEventListener("click",()=>y.open())}catch{}let Y=ti(o,{gotoIssue:d=>le.gotoIssue(d),issueStores:A,transport:ye,workerQueueStore:I,uiOrderStore:Q,displayPolicyStore:R,closedRange:Me,onClosedRangeChange:d=>{At(d)},onNewIssue:()=>ne.open()}),ae=Do(a,{transport:ye,issueStores:A,queueStore:I,analysisStore:te,execPresetStore:j,sessionLogStore:ue,uiOrderStore:Q,gotoIssue:d=>X.setState({selected_id:d}),getWorkspacePath:()=>X.getState().workspace.current?.path,doneRange:ze,onDoneRangeChange:d=>{it(d)}}),Be=Bl(c,{transport:ye,pipelineStore:V,execPresetStore:j,gotoIssue:d=>le.gotoIssue(d),getWorkspacePath:()=>X.getState().workspace.current?.path,switchWorkspace:d=>_t(d)}),et=dl(l,{issueStores:A,transport:ye,queueStore:I,execPresetStore:j,sessionLogStore:ue,getWorkspacePath:()=>X.getState().workspace.current?.path,onNavigate:d=>{X.getState().view==="worker"?X.setState({selected_id:d}):le.gotoIssue(d)},onClose:()=>{let d=X.getState();X.setState({selected_id:null});try{le.gotoView(d.view==="worker"||d.view==="monitor"?d.view:"board")}catch{}},onOpenExecPresets:()=>{X.setState({selected_id:null}),le.gotoView("worker"),ae.openExecDefaults()}}),Ze=X.getState().selected_id;Ze&&(l.hidden=!1,et.load(Ze),C(Ze)),X.subscribe(d=>{let _=d.selected_id;_?(l.hidden=!1,et.load(_),U||C(_)):(et.clear(),l.hidden=!0,z())});let ge=d=>{o.hidden=d.view!=="board",a.hidden=d.view!=="worker",c.hidden=d.view!=="monitor",dt(d.view==="board"),gt(d.view==="worker"),ke(d.view==="monitor"),Z(d.view==="board"||d.view==="worker"||!!d.selected_id),!d.selected_id&&d.view==="board"&&Y.load(),d.view==="worker"&&ae.load(),d.view==="monitor"?Be.load():Be.pause(),window.localStorage.setItem("beads-ui.view",d.view)};X.subscribe(ge),ge(X.getState()),Je(),$e(),Nt(),p().finally(()=>{rt=!0,Ue()}),window.addEventListener("keydown",d=>{let _=d.ctrlKey||d.metaKey,b=String(d.key||"").toLowerCase(),E=d.target,B=E&&E.tagName?String(E.tagName).toLowerCase():"",oe=B==="input"||B==="textarea"||B==="select"||E&&typeof E.isContentEditable=="boolean"&&E.isContentEditable;_&&b==="n"&&(oe||(d.preventDefault(),ne.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let r=window.localStorage.getItem("beads-ui.theme"),n=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=r==="dark"||r==="light"?r:n?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let r=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",r),window.localStorage.setItem("beads-ui.theme",r)});let t=document.getElementById("app");t&&d_(t)});export{d_ as bootstrap,i_ as readBootstrapConfig,l_ as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
