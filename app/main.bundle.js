var Jo=Object.create;var Wr=Object.defineProperty;var ei=Object.getOwnPropertyDescriptor;var ti=Object.getOwnPropertyNames;var ri=Object.getPrototypeOf,ni=Object.prototype.hasOwnProperty;var si=(t,e,r)=>e in t?Wr(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r;var Gr=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports);var oi=(t,e,r,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of ti(e))!ni.call(t,s)&&s!==r&&Wr(t,s,{get:()=>e[s],enumerable:!(n=ei(e,s))||n.enumerable});return t};var ii=(t,e,r)=>(r=t!=null?Jo(ri(t)):{},oi(e||!t||!t.__esModule?Wr(r,"default",{value:t,enumerable:!0}):r,t));var ue=(t,e,r)=>si(t,typeof e!="symbol"?e+"":e,r);var ds=Gr((tc,cs)=>{var Pt=1e3,Ft=Pt*60,Bt=Ft*60,Tt=Bt*24,ui=Tt*7,pi=Tt*365.25;cs.exports=function(t,e){e=e||{};var r=typeof t;if(r==="string"&&t.length>0)return fi(t);if(r==="number"&&isFinite(t))return e.long?gi(t):hi(t);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(t))};function fi(t){if(t=String(t),!(t.length>100)){var e=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(t);if(e){var r=parseFloat(e[1]),n=(e[2]||"ms").toLowerCase();switch(n){case"years":case"year":case"yrs":case"yr":case"y":return r*pi;case"weeks":case"week":case"w":return r*ui;case"days":case"day":case"d":return r*Tt;case"hours":case"hour":case"hrs":case"hr":case"h":return r*Bt;case"minutes":case"minute":case"mins":case"min":case"m":return r*Ft;case"seconds":case"second":case"secs":case"sec":case"s":return r*Pt;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r;default:return}}}}function hi(t){var e=Math.abs(t);return e>=Tt?Math.round(t/Tt)+"d":e>=Bt?Math.round(t/Bt)+"h":e>=Ft?Math.round(t/Ft)+"m":e>=Pt?Math.round(t/Pt)+"s":t+"ms"}function gi(t){var e=Math.abs(t);return e>=Tt?_r(t,e,Tt,"day"):e>=Bt?_r(t,e,Bt,"hour"):e>=Ft?_r(t,e,Ft,"minute"):e>=Pt?_r(t,e,Pt,"second"):t+" ms"}function _r(t,e,r,n){var s=e>=r*1.5;return Math.round(t/r)+" "+n+(s?"s":"")}});var ps=Gr((rc,us)=>{function mi(t){r.debug=r,r.default=r,r.coerce=a,r.disable=i,r.enable=s,r.enabled=l,r.humanize=ds(),r.destroy=c,Object.keys(t).forEach(f=>{r[f]=t[f]}),r.names=[],r.skips=[],r.formatters={};function e(f){let g=0;for(let w=0;w<f.length;w++)g=(g<<5)-g+f.charCodeAt(w),g|=0;return r.colors[Math.abs(g)%r.colors.length]}r.selectColor=e;function r(f){let g,w=null,$,v;function L(...N){if(!L.enabled)return;let B=L,U=Number(new Date),H=U-(g||U);B.diff=H,B.prev=g,B.curr=U,g=U,N[0]=r.coerce(N[0]),typeof N[0]!="string"&&N.unshift("%O");let P=0;N[0]=N[0].replace(/%([a-zA-Z%])/g,(C,x)=>{if(C==="%%")return"%";P++;let _=r.formatters[x];if(typeof _=="function"){let O=N[P];C=_.call(B,O),N.splice(P,1),P--}return C}),r.formatArgs.call(B,N),(B.log||r.log).apply(B,N)}return L.namespace=f,L.useColors=r.useColors(),L.color=r.selectColor(f),L.extend=n,L.destroy=r.destroy,Object.defineProperty(L,"enabled",{enumerable:!0,configurable:!1,get:()=>w!==null?w:($!==r.namespaces&&($=r.namespaces,v=r.enabled(f)),v),set:N=>{w=N}}),typeof r.init=="function"&&r.init(L),L}function n(f,g){let w=r(this.namespace+(typeof g>"u"?":":g)+f);return w.log=this.log,w}function s(f){r.save(f),r.namespaces=f,r.names=[],r.skips=[];let g=(typeof f=="string"?f:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let w of g)w[0]==="-"?r.skips.push(w.slice(1)):r.names.push(w)}function o(f,g){let w=0,$=0,v=-1,L=0;for(;w<f.length;)if($<g.length&&(g[$]===f[w]||g[$]==="*"))g[$]==="*"?(v=$,L=w,$++):(w++,$++);else if(v!==-1)$=v+1,L++,w=L;else return!1;for(;$<g.length&&g[$]==="*";)$++;return $===g.length}function i(){let f=[...r.names,...r.skips.map(g=>"-"+g)].join(",");return r.enable(""),f}function l(f){for(let g of r.skips)if(o(f,g))return!1;for(let g of r.names)if(o(f,g))return!0;return!1}function a(f){return f instanceof Error?f.stack||f.message:f}function c(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return r.enable(r.load()),r}us.exports=mi});var fs=Gr((je,br)=>{je.formatArgs=bi;je.save=wi;je.load=ki;je.useColors=_i;je.storage=yi();je.destroy=(()=>{let t=!1;return()=>{t||(t=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();je.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function _i(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let t;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(t=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(t[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function bi(t){if(t[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+t[0]+(this.useColors?"%c ":" ")+"+"+br.exports.humanize(this.diff),!this.useColors)return;let e="color: "+this.color;t.splice(1,0,e,"color: inherit");let r=0,n=0;t[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(r++,s==="%c"&&(n=r))}),t.splice(n,0,e)}je.log=console.debug||console.log||(()=>{});function wi(t){try{t?je.storage.setItem("debug",t):je.storage.removeItem("debug")}catch{}}function ki(){let t;try{t=je.storage.getItem("debug")||je.storage.getItem("DEBUG")}catch{}return!t&&typeof process<"u"&&"env"in process&&(t=process.env.DEBUG),t}function yi(){try{return localStorage}catch{}}br.exports=ps()(je);var{formatters:vi}=br.exports;vi.j=function(t){try{return JSON.stringify(t)}catch(e){return"[UnexpectedJSONParseError]: "+e.message}}});var Vt=globalThis,gr=Vt.trustedTypes,Kn=gr?gr.createPolicy("lit-html",{createHTML:t=>t}):void 0,ts="$lit$",mt=`lit$${Math.random().toFixed(9).slice(2)}$`,rs="?"+mt,ai=`<${rs}>`,xt=document,Kt=()=>xt.createComment(""),Zt=t=>t===null||typeof t!="object"&&typeof t!="function",Qr=Array.isArray,li=t=>Qr(t)||typeof t?.[Symbol.iterator]=="function",jr=`[ 	
\f\r]`,Yt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Zn=/-->/g,Xn=/>/g,vt=RegExp(`>|${jr}(?:([^\\s"'>=/]+)(${jr}*=${jr}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Qn=/'/g,Jn=/"/g,ns=/^(?:script|style|textarea|title)$/i,Jr=t=>(e,...r)=>({_$litType$:t,strings:e,values:r}),u=Jr(1),Kl=Jr(2),Zl=Jr(3),St=Symbol.for("lit-noChange"),ve=Symbol.for("lit-nothing"),es=new WeakMap,$t=xt.createTreeWalker(xt,129);function ss(t,e){if(!Qr(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return Kn!==void 0?Kn.createHTML(e):e}var ci=(t,e)=>{let r=t.length-1,n=[],s,o=e===2?"<svg>":e===3?"<math>":"",i=Yt;for(let l=0;l<r;l++){let a=t[l],c,f,g=-1,w=0;for(;w<a.length&&(i.lastIndex=w,f=i.exec(a),f!==null);)w=i.lastIndex,i===Yt?f[1]==="!--"?i=Zn:f[1]!==void 0?i=Xn:f[2]!==void 0?(ns.test(f[2])&&(s=RegExp("</"+f[2],"g")),i=vt):f[3]!==void 0&&(i=vt):i===vt?f[0]===">"?(i=s??Yt,g=-1):f[1]===void 0?g=-2:(g=i.lastIndex-f[2].length,c=f[1],i=f[3]===void 0?vt:f[3]==='"'?Jn:Qn):i===Jn||i===Qn?i=vt:i===Zn||i===Xn?i=Yt:(i=vt,s=void 0);let $=i===vt&&t[l+1].startsWith("/>")?" ":"";o+=i===Yt?a+ai:g>=0?(n.push(c),a.slice(0,g)+ts+a.slice(g)+mt+$):a+mt+(g===-2?l:$)}return[ss(t,o+(t[r]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),n]},Xt=class t{constructor({strings:e,_$litType$:r},n){let s;this.parts=[];let o=0,i=0,l=e.length-1,a=this.parts,[c,f]=ci(e,r);if(this.el=t.createElement(c,n),$t.currentNode=this.el.content,r===2||r===3){let g=this.el.content.firstChild;g.replaceWith(...g.childNodes)}for(;(s=$t.nextNode())!==null&&a.length<l;){if(s.nodeType===1){if(s.hasAttributes())for(let g of s.getAttributeNames())if(g.endsWith(ts)){let w=f[i++],$=s.getAttribute(g).split(mt),v=/([.?@])?(.*)/.exec(w);a.push({type:1,index:o,name:v[2],strings:$,ctor:v[1]==="."?Vr:v[1]==="?"?Kr:v[1]==="@"?Zr:Nt}),s.removeAttribute(g)}else g.startsWith(mt)&&(a.push({type:6,index:o}),s.removeAttribute(g));if(ns.test(s.tagName)){let g=s.textContent.split(mt),w=g.length-1;if(w>0){s.textContent=gr?gr.emptyScript:"";for(let $=0;$<w;$++)s.append(g[$],Kt()),$t.nextNode(),a.push({type:2,index:++o});s.append(g[w],Kt())}}}else if(s.nodeType===8)if(s.data===rs)a.push({type:2,index:o});else{let g=-1;for(;(g=s.data.indexOf(mt,g+1))!==-1;)a.push({type:7,index:o}),g+=mt.length-1}o++}}static createElement(e,r){let n=xt.createElement("template");return n.innerHTML=e,n}};function Mt(t,e,r=t,n){if(e===St)return e;let s=n!==void 0?r._$Co?.[n]:r._$Cl,o=Zt(e)?void 0:e._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(t),s._$AT(t,r,n)),n!==void 0?(r._$Co??(r._$Co=[]))[n]=s:r._$Cl=s),s!==void 0&&(e=Mt(t,s._$AS(t,e.values),s,n)),e}var Yr=class{constructor(e,r){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:r},parts:n}=this._$AD,s=(e?.creationScope??xt).importNode(r,!0);$t.currentNode=s;let o=$t.nextNode(),i=0,l=0,a=n[0];for(;a!==void 0;){if(i===a.index){let c;a.type===2?c=new Qt(o,o.nextSibling,this,e):a.type===1?c=new a.ctor(o,a.name,a.strings,this,e):a.type===6&&(c=new Xr(o,this,e)),this._$AV.push(c),a=n[++l]}i!==a?.index&&(o=$t.nextNode(),i++)}return $t.currentNode=xt,s}p(e){let r=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(e,n,r),r+=n.strings.length-2):n._$AI(e[r])),r++}},Qt=class t{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,r,n,s){this.type=2,this._$AH=ve,this._$AN=void 0,this._$AA=e,this._$AB=r,this._$AM=n,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,r=this._$AM;return r!==void 0&&e?.nodeType===11&&(e=r.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,r=this){e=Mt(this,e,r),Zt(e)?e===ve||e==null||e===""?(this._$AH!==ve&&this._$AR(),this._$AH=ve):e!==this._$AH&&e!==St&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):li(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==ve&&Zt(this._$AH)?this._$AA.nextSibling.data=e:this.T(xt.createTextNode(e)),this._$AH=e}$(e){let{values:r,_$litType$:n}=e,s=typeof n=="number"?this._$AC(e):(n.el===void 0&&(n.el=Xt.createElement(ss(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===s)this._$AH.p(r);else{let o=new Yr(s,this),i=o.u(this.options);o.p(r),this.T(i),this._$AH=o}}_$AC(e){let r=es.get(e.strings);return r===void 0&&es.set(e.strings,r=new Xt(e)),r}k(e){Qr(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,n,s=0;for(let o of e)s===r.length?r.push(n=new t(this.O(Kt()),this.O(Kt()),this,this.options)):n=r[s],n._$AI(o),s++;s<r.length&&(this._$AR(n&&n._$AB.nextSibling,s),r.length=s)}_$AR(e=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);e!==this._$AB;){let n=e.nextSibling;e.remove(),e=n}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},Nt=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,r,n,s,o){this.type=1,this._$AH=ve,this._$AN=void 0,this.element=e,this.name=r,this._$AM=s,this.options=o,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=ve}_$AI(e,r=this,n,s){let o=this.strings,i=!1;if(o===void 0)e=Mt(this,e,r,0),i=!Zt(e)||e!==this._$AH&&e!==St,i&&(this._$AH=e);else{let l=e,a,c;for(e=o[0],a=0;a<o.length-1;a++)c=Mt(this,l[n+a],r,a),c===St&&(c=this._$AH[a]),i||(i=!Zt(c)||c!==this._$AH[a]),c===ve?e=ve:e!==ve&&(e+=(c??"")+o[a+1]),this._$AH[a]=c}i&&!s&&this.j(e)}j(e){e===ve?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},Vr=class extends Nt{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===ve?void 0:e}},Kr=class extends Nt{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==ve)}},Zr=class extends Nt{constructor(e,r,n,s,o){super(e,r,n,s,o),this.type=5}_$AI(e,r=this){if((e=Mt(this,e,r,0)??ve)===St)return;let n=this._$AH,s=e===ve&&n!==ve||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,o=e!==ve&&(n===ve||s);s&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},Xr=class{constructor(e,r,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=r,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){Mt(this,e)}};var di=Vt.litHtmlPolyfillSupport;di?.(Xt,Qt),(Vt.litHtmlVersions??(Vt.litHtmlVersions=[])).push("3.3.1");var le=(t,e,r)=>{let n=r?.renderBefore??e,s=n._$litPart$;if(s===void 0){let o=r?.renderBefore??null;n._$litPart$=s=new Qt(e.insertBefore(Kt(),o),o,void 0,r??{})}return s._$AI(t),s};var mr="today",os=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}];function en(t){return t==="today"||t==="7d"||t==="30d"||t==="all"}function is(t,e=Date.now()){switch(t){case"today":{let r=new Date(e);return r.setHours(0,0,0,0),r.getTime()}case"7d":return e-7*864e5;case"30d":return e-30*864e5;case"all":default:return}}function as(){let t=null,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{get(){return t},set(n){t=n,r()},clear(){t=null,r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}function ls(){let t=new Map,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{set(n,s){t.set(n,{lines:Array.isArray(s)?[...s]:[]}),r()},append(n,s){let o=t.get(n)||{lines:[]};o.lines=[...o.lines,s],t.set(n,o),r()},get(n){return t.get(n)||null},clear(n){typeof n=="string"?t.delete(n):t.clear(),r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}var hs=ii(fs(),1);function we(t){return(0,hs.default)(`beads-ui:${t}`)}function st(t){if(typeof t=="number")return Number.isFinite(t)?t:0;if(typeof t=="string"){let e=Date.parse(t);return Number.isFinite(e)?e:0}return 0}function At(t,e){let r=st(t.created_at),n=st(e.created_at);if(r!==n)return r<n?1:-1;let s=t.priority??2,o=e.priority??2;if(s!==o)return s-o;let i=t.id,l=e.id;return i<l?-1:i>l?1:0}function _s(t,e){let r=st(t.created_at),n=st(e.created_at);if(r!==n)return r<n?-1:1;let s=t.priority??2,o=e.priority??2;if(s!==o)return s-o;let i=t.id,l=e.id;return i<l?-1:i>l?1:0}function bs(t,e){let r=st(t.updated_at),n=st(e.updated_at);if(r!==n)return r<n?1:-1;let s=t.id,o=e.id;return s<o?-1:s>o?1:0}function ws(t,e){let r=t.priority??2,n=e.priority??2;if(r!==n)return r-n;let s=st(t.created_at),o=st(e.created_at);if(s!==o)return s<o?1:-1;let i=t.id,l=e.id;return i<l?-1:i>l?1:0}function ks(t,e){let r=t.closed_at??0,n=e.closed_at??0;if(r!==n)return r<n?1:-1;let s=t?.id,o=e?.id;return s<o?-1:s>o?1:0}var $i=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function gs(t){let e=t&&t.metadata,r=e?e.task_order:void 0;if(r==null||r==="")return Number.POSITIVE_INFINITY;let n=Number(r);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function ms(t){let e=t&&t.title;if(typeof e!="string")return Number.POSITIVE_INFINITY;let r=$i.exec(e);if(!r)return Number.POSITIVE_INFINITY;let n=Number(r[1]);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function ys(t,e){let r=gs(t),n=gs(e);if(r!==n)return r<n?-1:1;let s=ms(t),o=ms(e);if(s!==o)return s<o?-1:1;let i=st(t&&t.created_at),l=st(e&&e.created_at);if(i!==l)return i<l?-1:1;let a=t&&t.id,c=e&&e.id;return a===c?0:String(a)<String(c)?-1:1}var tn=2**20;function qt(t,e){let r=t&&t.id;return e&&typeof r=="string"&&Object.prototype.hasOwnProperty.call(e,r)&&typeof e[r]=="number"&&Number.isFinite(e[r])?e[r]:-st(t&&t.created_at)}function wr(t){return(e,r)=>{let n=qt(e,t),s=qt(r,t);if(n!==s)return n<s?-1:1;let o=e?.id,i=r?.id;return o<i?-1:o>i?1:0}}function rn(t,e,r){let n=Array.isArray(t)?t:[],s=n.length,o=Math.max(0,Math.min(e,s-1)),i=o-1>=0?n[o-1]:null,l=o+1<s?n[o+1]:null;if(!i&&!l)return{rank:0};if(!i)return{rank:qt(l,r)-tn};if(!l)return{rank:qt(i,r)+tn};let a=qt(i,r),c=qt(l,r),f=(a+c)/2;return a<f&&f<c?{rank:f}:{renormalize:n.map((g,w)=>({bead_id:g.id,rank:w*tn}))}}function nn(t,e={}){let r=we(`issue-store:${t}`),n=new Map,s=[],o=0,i=new Set,l=!1,a=e.sort||At;function c(){for(let w of Array.from(i))try{w()}catch{}}function f(){s=Array.from(n.values()).sort(a)}function g(w){if(l||!w||w.id!==t)return;let $=Number(w.revision)||0;if(r("apply %s rev=%d",w.type,$),!($<=o&&w.type!=="snapshot")){if(w.type==="snapshot"){if($<=o)return;n.clear();let v=Array.isArray(w.issues)?w.issues:[];for(let L of v)L&&typeof L.id=="string"&&L.id.length>0&&n.set(L.id,L);f(),o=$,c();return}if(w.type==="upsert"){let v=w.issue;if(v&&typeof v.id=="string"&&v.id.length>0){let L=n.get(v.id);if(!L)n.set(v.id,v);else{let N=Number.isFinite(L.updated_at)?L.updated_at:0,B=Number.isFinite(v.updated_at)?v.updated_at:0;if(N<=B){for(let U of Object.keys(L))U in v||delete L[U];for(let[U,H]of Object.entries(v))L[U]=H}}f()}o=$,c()}else if(w.type==="delete"){let v=String(w.issue_id||"");v&&(n.delete(v),f()),o=$,c()}}}return{id:t,subscribe(w){return i.add(w),()=>{i.delete(w)}},applyPush:g,snapshot(){return s},size(){return n.size},getById(w){return n.get(w)},dispose(){l=!0,n.clear(),s=[],i.clear(),o=0}}}function kr(t){let e=String(t.type||"").trim(),r={};if(t.params&&typeof t.params=="object"){let s=Object.keys(t.params).sort();for(let o of s){let i=t.params[o];r[o]=String(i)}}let n=new URLSearchParams(r).toString();return n.length>0?`${e}?${n}`:e}function vs(t){let e=we("subs"),r=new Map,n=new Map;function s(l,a){e("applyDelta %s +%d ~%d -%d",l,(a.added||[]).length,(a.updated||[]).length,(a.removed||[]).length);let c=n.get(l);if(!c||c.size===0)return;let f=Array.isArray(a.added)?a.added:[],g=Array.isArray(a.updated)?a.updated:[],w=Array.isArray(a.removed)?a.removed:[];for(let $ of Array.from(c)){let v=r.get($);if(!v)continue;let L=v.itemsById;for(let N of f)typeof N=="string"&&N.length>0&&L.set(N,!0);for(let N of g)typeof N=="string"&&N.length>0&&L.set(N,!0);for(let N of w)typeof N=="string"&&N.length>0&&L.delete(N)}}async function o(l,a){let c=kr(a);if(e("subscribe %s key=%s",l,c),!r.has(l))r.set(l,{key:c,itemsById:new Map});else{let g=r.get(l);if(g&&g.key!==c){let w=n.get(g.key);w&&(w.delete(l),w.size===0&&n.delete(g.key)),r.set(l,{key:c,itemsById:new Map})}}n.has(c)||n.set(c,new Set);let f=n.get(c);f&&f.add(l);try{await t("subscribe-list",{id:l,type:a.type,params:a.params})}catch(g){let w=r.get(l)||null;if(w){let $=n.get(w.key);$&&($.delete(l),$.size===0&&n.delete(w.key))}throw r.delete(l),g}return async()=>{e("unsubscribe %s key=%s",l,c);try{await t("unsubscribe-list",{id:l})}catch{}let g=r.get(l)||null;if(g){let w=n.get(g.key);w&&(w.delete(l),w.size===0&&n.delete(g.key))}r.delete(l)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:kr,selectors:{getIds(l){let a=r.get(l);return a?Array.from(a.itemsById.keys()):[]},has(l,a){let c=r.get(l);return c?c.itemsById.has(a):!1},count(l){let a=r.get(l);return a?a.itemsById.size:0},getItemsById(l){let a=r.get(l),c={};if(!a)return c;for(let f of a.itemsById.keys())c[f]=!0;return c}}}}function $s(){let t=we("issue-stores"),e=new Map,r=new Map,n=new Set,s=new Map;function o(){for(let a of Array.from(n))try{a()}catch{}}function i(a,c,f){let g=c?kr(c):"",w=r.get(a)||"",$=e.has(a);if(t("register %s key=%s (prev=%s)",a,g,w),$&&w&&g&&w!==g){let v=e.get(a);if(v)try{v.dispose()}catch{}let L=s.get(a);if(L){try{L()}catch{}s.delete(a)}let N=nn(a,f);e.set(a,N);let B=N.subscribe(()=>o());s.set(a,B)}else if(!$){let v=nn(a,f);e.set(a,v);let L=v.subscribe(()=>o());s.set(a,L)}return r.set(a,g),()=>l(a)}function l(a){t("unregister %s",a),r.delete(a);let c=e.get(a);c&&(c.dispose(),e.delete(a));let f=s.get(a);if(f){try{f()}catch{}s.delete(a)}}return{register:i,unregister:l,getStore(a){return e.get(a)||null},snapshotFor(a){let c=e.get(a);return c?c.snapshot().slice():[]},subscribe(a){return n.add(a),()=>n.delete(a)}}}function xs(){let t=null,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{get(){return t},set(n){t=n,r()},clear(){t=null,r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}function Ss(){let t=null,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{get(){return t},set(n){t=n,r()},clear(){t=null,r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}function sn(t,e){return`#/${t==="worker"?"worker":"board"}?issue=${encodeURIComponent(e)}`}function xi(t){let e=String(t||""),r=e.startsWith("#")?e.slice(1):e,n=r.indexOf("?"),s=n>=0?r.slice(n+1):"";if(s){let l=new URLSearchParams(s).get("issue");if(l)return decodeURIComponent(l)}let o=/^\/issue\/([^\s?#]+)/.exec(r);return o&&o[1]?decodeURIComponent(o[1]):null}function Si(t){let e=String(t||"");return/^#\/worker(\b|\/|$)/.test(e)?"worker":"board"}function Ts(t){let e=we("router"),r=()=>{let n=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(n),o=s&&s[1]?decodeURIComponent(s[1]):xi(n),i=Si(n);if(e("hash change \u2192 view=%s id=%s",i,o),t.setState({selected_id:i==="worker"?null:o,view:i,worker:{selected_parent_id:i==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(n)){let a=o?`#/${i}?issue=${encodeURIComponent(o)}`:`#/${i}`;window.location.hash!==a&&(window.location.hash=a)}};return{start(){window.addEventListener("hashchange",r),r()},stop(){window.removeEventListener("hashchange",r)},gotoIssue(n){let o=(t.getState?t.getState():{view:"board"}).view==="worker"?"worker":"board",i=sn(o,n);e("goto issue %s (view=%s)",n,o),window.location.hash!==i?window.location.hash=i:t.setState({selected_id:o==="worker"?null:n,view:o,worker:{selected_parent_id:o==="worker"?n:null}})},gotoView(n){let s=t.getState?t.getState():{selected_id:null,worker:{selected_parent_id:null}},o=n==="worker"?s.worker?.selected_parent_id:s.selected_id,i=o?sn(n,o):`#/${n}`;e("goto view %s (id=%s)",n,o||""),window.location.hash!==i?window.location.hash=i:t.setState({view:n,selected_id:n==="worker"?null:s.selected_id})}}}var Ti=Object.freeze({workspace_config:{default_workspace:null}});function As(t){return{workspace_config:{default_workspace:typeof t?.workspace_config?.default_workspace=="string"&&t.workspace_config.default_workspace.length>0?t.workspace_config.default_workspace:Ti.workspace_config.default_workspace}}}function Es(t={}){let e=we("state"),r={selected_id:t.selected_id??null,view:t.view??"board",filters:{status:t.filters?.status??"all",search:t.filters?.search??"",type:typeof t.filters?.type=="string"?t.filters?.type:""},board:{closed_filter:t.board?.closed_filter==="3"||t.board?.closed_filter==="7"||t.board?.closed_filter==="today"?t.board?.closed_filter:"today",show_deferred_column:t.board?.show_deferred_column===!0},worker:{selected_parent_id:t.worker?.selected_parent_id??null,show_closed_children:Array.isArray(t.worker?.show_closed_children)?t.worker.show_closed_children:[]},workspace:{current:t.workspace?.current??null,available:t.workspace?.available??[],hidden:t.workspace?.hidden??[]},config:As(t.config)},n=new Set;function s(){for(let o of Array.from(n))try{o(r)}catch{}}return{getState(){return r},setState(o){let i={...r,...o,filters:{...r.filters,...o.filters||{}},board:{...r.board,...o.board||{}},worker:{...r.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:r.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:r.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:r.workspace.hidden},config:o.config!==void 0?As(o.config):r.config},l=i.workspace.current?.path!==r.workspace.current?.path||i.workspace.available.length!==r.workspace.available.length||i.workspace.hidden.length!==r.workspace.hidden.length||i.workspace.hidden.some((c,f)=>c!==r.workspace.hidden[f]),a=i.config.workspace_config.default_workspace!==r.config.workspace_config.default_workspace;i.selected_id===r.selected_id&&i.view===r.view&&i.filters.status===r.filters.status&&i.filters.search===r.filters.search&&i.filters.type===r.filters.type&&i.board.closed_filter===r.board.closed_filter&&i.board.show_deferred_column===r.board.show_deferred_column&&i.worker.selected_parent_id===r.worker.selected_parent_id&&i.worker.show_closed_children.length===r.worker.show_closed_children.length&&i.worker.show_closed_children.every((c,f)=>c===r.worker.show_closed_children[f])&&!l&&!a||(r=i,e("state change %o",{selected_id:r.selected_id,view:r.view,filters:r.filters,board:r.board,worker:r.worker,workspace:r.workspace.current?.path,config:{default_workspace:r.config.workspace_config.default_workspace}}),s())},subscribe(o){return n.add(o),()=>n.delete(o)}}}function Cs(t){let e=we("activity"),r=0,n=new Map,s=1;function o(){if(!t)return;let c=r>0;t.toggleAttribute("hidden",!c),t.setAttribute("aria-busy",c?"true":"false")}function i(){r+=1,e("start count=%d",r),o()}function l(){let c=r;r=Math.max(0,r-1),c<=0?e("done called but count was already %d",c):e("done count=%d\u2192%d",c,r),o()}function a(c){return async(g,w)=>{let $=s++,v=Date.now();n.set($,{type:g,start_ts:v}),e("request start id=%d type=%s count=%d",$,g,r+1),i();let L=!1,N=()=>{L||(L=!0,n.delete($),l())},B=setTimeout(()=>{L||(e("request TIMEOUT id=%d type=%s elapsed=%dms",$,g,Date.now()-v),N())},3e4);try{let U=await c(g,w),H=Date.now()-v;return e("request done id=%d type=%s elapsed=%dms",$,g,H),U}catch(U){let H=Date.now()-v;throw e("request error id=%d type=%s elapsed=%dms err=%o",$,g,H,U),U}finally{clearTimeout(B),N()}}}return o(),{wrapSend:a,start:i,done:l,getCount:()=>r,getActiveRequests:()=>{let c=Date.now();return Array.from(n.entries()).map(([f,g])=>({id:f,type:g.type,elapsed_ms:c-g.start_ts}))}}}function X(t,e="info",r=2800){let n=document.createElement("div");n.className="toast",n.textContent=t,n.style.position="fixed",n.style.right="12px",n.style.bottom="12px",n.style.zIndex="1000",n.style.color="#fff",n.style.padding="8px 10px",n.style.borderRadius="4px",n.style.fontSize="12px",e==="success"?n.style.background="#156d36":e==="warning"?n.style.background="#a36a00":e==="error"?n.style.background="#9f2011":n.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(n),setTimeout(()=>{try{n.remove()}catch{}},r)}function yr(t=void 0,e=void 0){function r(){if(!e||typeof e.get!="function")return null;let o=e.get();return o&&o.order?o.order:{}}function n(o,i,l){let a=t&&t.snapshotFor?t.snapshotFor(o).slice():[];if(i==="closed")return a.sort(ks),a;switch(l){case"created_desc":return a.sort(At),a;case"created_asc":return a.sort(_s),a;case"updated_desc":return a.sort(bs),a;case"priority":return a.sort(ws),a;case"manual":default:{let c=r();return c?a.sort(wr(c)):a.sort(At),a}}}function s(o){let i=[];return t&&typeof t.subscribe=="function"&&i.push(t.subscribe(o)),e&&typeof e.subscribe=="function"&&i.push(e.subscribe(o)),()=>{for(let l of i)try{l()}catch{}}}return{selectBoardColumn:n,subscribe:s}}function vr(t){let e=t.transport,r=t.uiOrderStore;function n(i,l){return"renormalize"in i?i.renormalize:[{bead_id:l,rank:i.rank}]}function s(i,l){let a={...i.order};for(let c of l)a[c.bead_id]=c.rank;r&&r.set({revision:i.revision,order:a})}async function o(i,l,a){if(!e||!r)return;let c=r.get()||{revision:0,order:{}},f=n(rn(l,a,c.order),i);s(c,f);let g=await e("ui-order-set",{expected_revision:c.revision,entries:f});if(g&&g.conflict){let w={revision:typeof g.revision=="number"?g.revision:0,order:g.order||{}};r.set(w);let $=n(rn(l,a,w.order),i);s(w,$);let v=await e("ui-order-set",{expected_revision:w.revision,entries:$});v&&v.applied&&r.set({revision:typeof v.revision=="number"?v.revision:0,order:v.order||{}})}else g&&g.applied&&r.set({revision:typeof g.revision=="number"?g.revision:0,order:g.order||{}})}return{applyReorder:o}}function $r(t){return Array.isArray(t)?t.filter(e=>typeof e=="string"):[]}function on(t,e){return!e||typeof t!="string"||t.length===0||$r(e.visible_labels).includes(t)?!0:$r(e.hidden_labels).includes(t)?!1:!$r(e.hidden_prefixes).some(r=>r.length>0&&t.startsWith(r))}function Rs(t,e){return $r(t).filter(r=>on(r,e))}function Et(t,e){let r=t&&t.chips?t.chips[e]:void 0;return typeof r=="boolean"?r:!0}function an(t){if(!t)return null;if(typeof t=="number")return Number.isFinite(t)?t:null;let e=Date.parse(t);return Number.isFinite(e)?e:null}function _t(t){let e=an(t);if(e===null)return"";let r=new Date(e),n=s=>String(s).padStart(2,"0");return`${r.getFullYear()}-${n(r.getMonth()+1)}-${n(r.getDate())} ${n(r.getHours())}:${n(r.getMinutes())}`}function ln(t,e){let r=an(t);if(r===null)return"";let s=(typeof e=="number"?e:Date.now())-r;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let i=Math.floor(s/36e5);if(i<24)return`${i}\uC2DC\uAC04 \uC804`;let l=Math.floor(s/864e5);if(l<7)return`${l}\uC77C \uC804`;let a=Math.floor(l/7);if(l<30)return`${a}\uC8FC \uC804`;let c=Math.floor(l/30);return c<12?`${c}\uAC1C\uC6D4 \uC804`:`${Math.floor(l/365)}\uB144 \uC804`}var Ai={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg"},Ei={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge"},Ci={spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},Ri={reviewed:"\u2713",skip:"\u2298",stale:"\u2713"};function Li(t,e,r){if(!(r==="in_progress"||r==="resolved"))return null;for(let s of t)if(e[s]&&e[s].state==="dim")return s;return null}function Ii(t,e,r){let n=Ai[t]||t,s=e&&e.state||"empty",o=Ri[s]||"",i="bar";s==="dim"?i+=` b-${n} dim`:s==="on"||s==="reviewed"||s==="skip"?i+=` b-${n} on`:s==="stale"&&(i+=` b-${n} stale`),r&&(i+=" glow");let l=s==="empty"?"lbl":`lbl l-${n} on`,a=r?`color: var(--stage-${n}-on)`:"";return u`
    <div class="seg">
      <div class=${i} style=${a}>${o}</div>
      <div class=${l}>
        ${Ei[t]||t}
      </div>
    </div>
  `}function xr(t,e){if(!t||!t.stages)return"";let r=t.route==="full_plan"?"full_plan":"spec_backed",n=Ci[r],s=t.stages,o=Li(n,s,String(e||"open"));return u`
    <div class="stp" role="img" aria-label="워크플로우 진행 스테퍼">
      ${n.map(i=>Ii(i,s[i]||{state:"empty"},i===o))}
    </div>
  `}function Di(t){return typeof t!="number"||!Number.isFinite(t)?"":`P${Math.max(0,Math.min(4,t))}`}var Ls=2;function Oi(t){if(!t)return[];let e=[];if(t.external){let n=t.reason?`\u23F8 blocked: ${t.reason}`:"\u23F8 blocked";e.push(u`<span class="ctl-chip ctl-chip--blocked">${n}</span>`)}let r=Array.isArray(t.blockers)?t.blockers:[];if(r.length>0){let n=r.slice(0,Ls).join(", "),s=r.length-Ls,o=`\u26D3 blocked: ${n}${s>0?` +${s}`:""}`;e.push(u`<span class="ctl-chip ctl-chip--blocked-dep">${o}</span>`)}return e}function Mi(t,e){let r=e.policy||null,n=t.workflow&&t.workflow.chips||{},s=[];if(n.route&&Et(r,"route")){let o=n.route_source==="derived";s.push(u`<span
        class="ctl-chip ctl-chip--route${o?" is-derived":""}"
        title=${o?"route \uCD94\uB860\uAC12 (metadata \uBBF8\uD540)":"route"}
        >${o?`${n.route} ?`:n.route}</span
      >`)}if(n.fast_track&&Et(r,"fast_track")&&s.push(u`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),n.pr&&Et(r,"pr")){let o=n.pr.number;s.push(u`<span class="ctl-chip ctl-chip--pr"
        >${`PR${o!=null?` #${o}`:""}`}</span
      >`)}for(let o of Rs(t.labels,r))s.push(u`<span class="ctl-chip ctl-chip--label">${o}</span>`);return t.from_id&&Et(r,"from")&&s.push(u`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${t.from_id} \uC5F4\uAE30`}
        @click=${o=>{o.stopPropagation(),e.onFromChipClick&&e.onFromChipClick(o,String(t.from_id))}}
      >
        ↩ from ${t.from_id}
      </button>`),Et(r,"blocked")&&s.push(...Oi(t.blocked_info)),s.length===0?"":u`<div class="board-card__chips">${s}</div>`}function Ni(t){switch(t){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function Pi(t){let e=ln(t.created_at),r=ln(t.updated_at);return!e&&!r?"":u`<span class="board-card__times">
    ${e?u`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${_t(t.created_at)}`}
          >생성 ${e}</span
        >`:""}
    ${e&&r?u`<span class="board-card__time-sep">·</span>`:""}
    ${r?u`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${_t(t.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </span>`}function Fi(t,e){let r=e.rollupFor?e.rollupFor(t.id):{total:0,count:0,current:null,children:[]},n=r.total||0,s=e.isExpanded?e.isExpanded(t.id):!0,o=n>0?r.children.slice().sort(ys):r.children;return u`
    <div class="board-card__roll">
      <div class="board-card__roll-meta">
        ${n>0?u`<button
              type="button"
              class="board-card__roll-toggle"
              aria-expanded=${s?"true":"false"}
              @click=${i=>e.onRollupToggle&&e.onRollupToggle(i,t.id)}
            >
              children ${r.count}/${n} ${s?"\u25B4":"\u25BE"}
            </button>`:u`<span class="board-card__roll-none">children 없음</span>`}
        ${Pi(t)}
      </div>
      ${n>0&&r.current?u`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${r.current.title||r.current.id}</span
            >
          </div>`:""}
      ${s&&n>0?u`<div class="board-card__roll-list">
            ${o.map((i,l)=>u`<button
                  type="button"
                  class="board-card__roll-child"
                  @click=${a=>e.onChildClick&&e.onChildClick(a,i.id)}
                >
                  <span class=${Ni(i.status)}>●</span>
                  <span class="board-card__roll-child-ord">${l+1}</span>
                  <span class="board-card__roll-child-title"
                    >${i.title||i.id}</span
                  >
                </button>`)}
          </div>`:""}
    </div>
  `}function Is(t,e){let r=Di(t.priority);return u`
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
        ${r?u`<span class="board-card__pri">${r}</span>`:""}
      </div>
      <div class="board-card__title">${t.title||"(\uC81C\uBAA9 \uC5C6\uC74C)"}</div>
      ${Mi(t,e)}
      ${t.workflow&&Et(e.policy||null,"stepper")?xr(t.workflow,t.status):""}
      ${Fi(t,e)}
    </article>
  `}function Ct(t,e){let r=Array.isArray(t.items)?t.items.length:0,n=t.is_closed===!0;return u`
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
        ${n?u`<select
              class="board-column__closed-range"
              aria-label="Closed period"
              @change=${e.onClosedRangeChange}
            >
              ${os.map(o=>u`<option
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
        ${t.items.map(o=>Is(o,e))}
      </div>
    </section>
  `}var Bi=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],qi=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],Ui=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function zi(t,e,r){let n=t.labels.length,s=n>0?`\uB77C\uBCA8 ${n}`:"\uB77C\uBCA8";return u`
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
      ${r.label_menu_open?u`<div class="board-filter__label-menu" role="group">
            ${r.label_options.length===0?u`<div class="board-filter__label-empty">라벨 없음</div>`:r.label_options.map(o=>u`<label class="board-filter__label-row">
                      <input
                        type="checkbox"
                        .checked=${t.labels.includes(o)}
                        @change=${()=>e.onLabelToggle(o)}
                      />
                      <span>${o}</span>
                    </label>`)}
            ${n>0?u`<button
                  type="button"
                  class="board-filter__label-clear"
                  @click=${e.onLabelClear}
                >
                  선택 해제
                </button>`:""}
          </div>`:""}
    </div>
  `}function Ds(t,e,r){return u`
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
        ${Bi.map(n=>u`<option
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
        ${qi.map(n=>u`<option
              value=${n.value}
              ?selected=${t.type===n.value}
            >
              ${n.label}
            </option>`)}
      </select>
      ${zi(t,e,r)}
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
        ${Ui.map(n=>u`<option
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
  `}var Hi=200,Wi={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","deferred-col":"deferred","closed-col":"closed"},Gi=new Set(["blocked-col","ready-col","in-progress-col","resolved-col","deferred-col"]),Os="beads-ui.board.sort",Ms=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function ji(){try{let t=window.localStorage.getItem(Os);if(t&&Ms.has(t))return t}catch{}return"created_desc"}function Ns(t,e){let r=we("views:board"),n=e.gotoIssue,s=e.issueStores,o=e.transport,i=e.uiOrderStore,l=e.displayPolicyStore,a=e.onClosedRangeChange,c=e.onNewIssue,f=e.closedRange||mr,g=s?yr(s,i):null,w=vr({transport:o,uiOrderStore:i}),$=[],v=[],L=[],N=[],B=[],U=[],H=!1,P=0,E=ji(),C=new Map,x=new Map,_=new Map,O=new Set,F={search:"",priority:"",type:"",labels:[]},G=!1,K=null;function ne(I){return String(I.status||"open")==="open"}function se(I){let M=String(I.status||"open");return M==="open"||M==="blocked"}function $e(I){let M=F.search.trim().toLowerCase(),d=F.priority,h=F.type,y=F.labels;return I.filter(m=>{if(M){let S=String(m.id||"").toLowerCase(),T=String(m.title||"").toLowerCase();if(!S.includes(M)&&!T.includes(M))return!1}if(d!==""&&String(m.priority)!==d||h!==""&&String(m.issue_type||"")!==h)return!1;if(y.length>0){let S=Array.isArray(m.labels)?m.labels:[];if(!y.some(T=>S.includes(T)))return!1}return!0})}function Ye(){let I=new Set;for(let M of[$,v,L,N,B,U])for(let d of M){let h=Array.isArray(d.labels)?d.labels:[];for(let y of h)typeof y=="string"&&y.length>0&&I.add(y)}return Array.from(I).sort()}function He(){return F.search.trim()!==""||F.priority!==""||F.type!==""||F.labels.length>0}function ke(){try{if(g){let I=g.selectBoardColumn("tab:board:in-progress","in_progress",E),M=g.selectBoardColumn("tab:board:blocked","blocked",E).filter(se),d=new Set(I.map(W=>W.id)),h=g.selectBoardColumn("tab:board:ready","ready",E).filter(W=>ne(W)&&!d.has(W.id)),y=g.selectBoardColumn("tab:board:resolved","resolved",E),m=g.selectBoardColumn("tab:board:deferred","deferred",E),S=H?m:[],T=g.selectBoardColumn("tab:board:closed","closed").slice(0,Hi),R=[...M,...h,...I,...y,...S,...T];xe(R);let Z=new Set;for(let W of R)W&&W.id&&!cn(W)&&Z.add(W.id);let ee=!He();$=ee?Ut(M,Z):M,v=ee?Ut(h,Z):h,L=ee?Ut(I,Z):I,N=ee?Ut(y,Z):y,B=ee?Ut(S,Z):S,P=m.length,U=ee?Ut(T,Z):T,C=new Map;for(let W of $)C.set(W.id,"open");for(let W of v)C.set(W.id,"open");for(let W of L)C.set(W.id,"in_progress");for(let W of N)C.set(W.id,"resolved");for(let W of B)C.set(W.id,"deferred");for(let W of U)C.set(W.id,"closed");x=new Map;for(let W of $)x.set(W.id,"blocked-col");for(let W of v)x.set(W.id,"ready-col");for(let W of L)x.set(W.id,"in-progress-col");for(let W of N)x.set(W.id,"resolved-col");for(let W of B)x.set(W.id,"deferred-col");for(let W of U)x.set(W.id,"closed-col")}be()}catch{$=[],v=[],L=[],N=[],B=[],U=[],_=new Map,be()}}function xe(I){let M=new Map;for(let h of I)h&&h.id&&!M.has(h.id)&&M.set(h.id,h);let d=new Map;for(let h of M.values()){let y=cn(h);if(!y)continue;let m=d.get(y);m||(m=[],d.set(y,m)),m.push({id:h.id,title:h.title,status:h.status,metadata:h.metadata,created_at:h.created_at})}_=d}function Ve(I){let M=_.get(I)||[],d=0,h=null;for(let y of M)(y.status==="resolved"||y.status==="closed")&&(d+=1),!h&&y.status==="in_progress"&&(h=y);return{total:M.length,count:d,current:h,children:M}}function ce(I){return!O.has(I)}function lt(I,M){I.preventDefault(),I.stopPropagation(),O.has(M)?O.delete(M):O.add(M),be()}function pe(I,M){I.preventDefault(),I.stopPropagation(),n(M)}function Ke(I,M){I.preventDefault(),I.stopPropagation(),n(M)}function ie(I,M){K||n(M)}function Ne(I,M){I.preventDefault(),I.stopPropagation(),Yi(M).then(d=>{d&&X("\uBCF5\uC0AC\uB428","success",1200)})}function et(I,M){K=M,I.dataTransfer&&(I.dataTransfer.setData("text/plain",M),I.dataTransfer.effectAllowed="move"),I.target.classList.add("board-card--dragging")}function Te(I){I.target.classList.remove("board-card--dragging"),tt(),setTimeout(()=>{K=null},0)}function Ce(I){let M=String(I.target.value||"");!M||M===f||(f=M,a&&a(M),be())}let ye={onCardClick:ie,onCopyId:Ne,onDragStart:et,onDragEnd:Te,onClosedRangeChange:Ce,rollupFor:Ve,isExpanded:ce,onRollupToggle:lt,onChildClick:pe,onFromChipClick:Ke,get policy(){return l?l.get():null}};function Pe(I){let M=I.target,d=t.querySelector(".board-filter__labels");M&&d&&d.contains(M)||de()}function Ze(I){I.key==="Escape"&&de()}function Re(){G||(G=!0,document.addEventListener("mousedown",Pe),document.addEventListener("keydown",Ze),be())}function de(){G&&(G=!1,document.removeEventListener("mousedown",Pe),document.removeEventListener("keydown",Ze),be())}let Le={onSearchInput(I){F.search=String(I.target.value||""),ke()},onPriorityChange(I){F.priority=String(I.target.value||""),ke()},onTypeChange(I){F.type=String(I.target.value||""),ke()},onSortChange(I){let M=String(I.target.value||"");if(!(!Ms.has(M)||M===E)){E=M;try{window.localStorage.setItem(Os,M)}catch{}ke()}},onDeferredToggle(){H=!H,ke()},onLabelMenuToggle(){G?de():Re()},onLabelToggle(I){let M=F.labels.indexOf(I);M===-1?F.labels.push(I):F.labels.splice(M,1),ke()},onLabelClear(){F.labels.length!==0&&(F.labels=[],ke())},onNewIssue(){c&&c()}};function We(){let I=H?"board-root board-root--deferred":"board-root";return u`
      <div class="board-view">
        ${Ds(F,Le,{sort_mode:E,show_deferred:H,deferred_count:P,label_options:Ye(),label_menu_open:G})}
        <div class=${I}>
          ${Ct({title:"Blocked",id:"blocked-col",items:$e($)},ye)}
          ${Ct({title:"Ready",id:"ready-col",items:$e(v)},ye)}
          ${Ct({title:"In progress",id:"in-progress-col",items:$e(L)},ye)}
          ${Ct({title:"Resolved",id:"resolved-col",items:$e(N)},ye)}
          ${H?Ct({title:"Deferred",id:"deferred-col",items:$e(B)},ye):""}
          ${Ct({title:"Closed",id:"closed-col",items:$e(U),is_closed:!0,closed_range:f},ye)}
        </div>
      </div>
    `}function be(){le(We(),t),Ae()}function Ae(){try{let I=Array.from(t.querySelectorAll(".board-column"));for(let M of I)Array.from(M.querySelectorAll(".board-card")).forEach((h,y)=>{h.tabIndex=y===0?0:-1})}catch{}}async function Fe(I,M){if(!o){X("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:I,status:M}),X("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(d){r("update-status failed: %o",d),X("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function Me(I){switch(I){case"blocked-col":return $;case"ready-col":return v;case"in-progress-col":return L;case"resolved-col":return N;case"deferred-col":return B;default:return[]}}function Xe(I,M,d){if(!o||!i)return;let h=Me(I),y=h.find(Z=>Z.id===M);if(!y)return;let m=h.filter(Z=>Z.id!==M),S=d.closest?d.closest(".board-card"):null,T=m.length;if(S){let Z=S.getAttribute("data-issue-id");if(Z===M)return;let ee=m.findIndex(W=>W.id===Z);ee>=0&&(T=ee)}let R=m.slice();R.splice(T,0,y),w.applyReorder(M,R,T)}function tt(){for(let I of Array.from(t.querySelectorAll(".board-column--drag-over")))I.classList.remove("board-column--drag-over")}let me=null;t.addEventListener("dragover",I=>{I.preventDefault(),I.dataTransfer&&(I.dataTransfer.dropEffect="move");let d=I.target.closest(".board-column");d&&d!==me&&(me&&me.classList.remove("board-column--drag-over"),d.classList.add("board-column--drag-over"),me=d)}),t.addEventListener("dragleave",I=>{let M=I.relatedTarget;(!M||!t.contains(M))&&me&&(me.classList.remove("board-column--drag-over"),me=null)}),t.addEventListener("drop",I=>{I.preventDefault(),me&&(me.classList.remove("board-column--drag-over"),me=null);let M=I.target,d=M.closest(".board-column");if(!d)return;let h=I.dataTransfer?.getData("text/plain")||"";if(!h)return;let y=d.id,m=x.get(h);if(m&&m===y){if(Gi.has(y)){if(E!=="manual"){X("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}Xe(y,h,M)}return}let S=Wi[y];if(!S){X("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}C.get(h)!==S&&Fe(h,S)}),t.addEventListener("keydown",I=>{let M=I.target;if(!(M instanceof HTMLElement))return;let d=String(M.tagName||"").toLowerCase();if(d==="input"||d==="textarea"||d==="select"||d==="button"||d==="a"||M.isContentEditable===!0)return;let h=M.closest(".board-card");if(!h)return;let y=String(I.key||"");if(y==="Enter"||y===" "){I.preventDefault();let R=h.getAttribute("data-issue-id");R&&n(R);return}if(y!=="ArrowUp"&&y!=="ArrowDown"&&y!=="ArrowLeft"&&y!=="ArrowRight")return;I.preventDefault();let m=h.closest(".board-column");if(!m)return;let S=Array.from(m.querySelectorAll(".board-card")),T=S.indexOf(h);if(y==="ArrowDown"&&T<S.length-1){Ie(h,S[T+1]);return}if(y==="ArrowUp"&&T>0){Ie(h,S[T-1]);return}if(y==="ArrowLeft"||y==="ArrowRight"){let R=Array.from(t.querySelectorAll(".board-column")),Z=R.indexOf(m),ee=y==="ArrowRight"?1:-1,W=Z+ee;for(;W>=0&&W<R.length;){let _e=R[W].querySelector(".board-card");if(_e){Ie(h,_e);return}W+=ee}}});function Ie(I,M){try{I.tabIndex=-1,M.tabIndex=0,M.focus()}catch{}}let Ee=null;g&&g.subscribe&&(Ee=g.subscribe(()=>{try{ke()}catch{}}));let De=null;return l&&l.subscribe&&(De=l.subscribe(()=>{try{ke()}catch{}})),{async load(){r("load"),ke()},clear(){de(),Ee&&(Ee(),Ee=null),De&&(De(),De=null),t.replaceChildren(),$=[],v=[],L=[],N=[],B=[],U=[],C=new Map,x=new Map}}}function cn(t){let e=t&&t.parent;return typeof e=="string"?e:e&&e.id?String(e.id):""}function Ut(t,e){return t.filter(r=>{let n=cn(r);return!(n&&e.has(n))})}async function Yi(t){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(t)),!0;let e=document.createElement("textarea");e.value=String(t),e.style.position="fixed",e.style.left="-9999px",document.body.appendChild(e),e.select();let r=!1;try{r=document.execCommand("copy")}finally{e.remove()}return r}catch{return!1}}async function Rt(t){let e=String(t);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(e),!0}catch{}try{let r=document.createElement("textarea");r.value=e,r.style.position="fixed",r.style.left="-9999px",document.body.appendChild(r),r.select();let n=!1;try{n=document.execCommand("copy")}finally{r.remove()}return n}catch{return!1}}var Vi={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},Ki=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,Zi=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function bt(t){return!!t&&typeof t=="object"}function dn(t){return typeof t!="string"||t.length===0?[]:t.split(/\r?\n/)}function Ps(t,e){let r=dn(t),n=dn(e),s=new Map;for(let l of r)s.set(l,(s.get(l)||0)+1);let o=0;for(let l of n){let a=s.get(l)||0;a>0?s.set(l,a-1):o+=1}let i=0;for(let l of s.values())i+=l;return{added:o,removed:i}}function Xi(t){let e="";typeof t=="string"?e=t:Array.isArray(t)?e=t.map(s=>bt(s)&&typeof s.text=="string"?s.text:"").join(""):bt(t)&&typeof t.text=="string"&&(e=t.text);let n=(String(e).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return n.length>120?`${n.slice(0,117)}\u2026`:n}function Qi(t){let e=String(t.name||""),r=t.input||{},n={kind:"tool",tool:e,icon:Vi[e]||"\u{1F527}",input:r,expandable:!0};if((e==="Read"||e==="Write")&&(n.path=String(r.file_path||r.path||"")),e==="Write"&&(n.added=dn(r.content).length),e==="Edit"){n.path=String(r.file_path||r.path||"");let{added:s,removed:o}=Ps(r.old_string,r.new_string);n.added=s,n.removed=o}if(e==="MultiEdit"){n.path=String(r.file_path||r.path||"");let s=0,o=0,i=Array.isArray(r.edits)?r.edits:[];for(let l of i){let a=Ps(bt(l)?l.old_string:"",bt(l)?l.new_string:"");s+=a.added,o+=a.removed}n.added=s,n.removed=o}return e==="Bash"&&(n.command=String(r.command||"")),(e==="Grep"||e==="Glob")&&(n.command=String(r.pattern||r.query||"")),n}function Fs(t){let e=t.split(/\r?\n/).find(n=>n.trim().length>0)||"",r=Ki.exec(e);return r?{kind:"gate",gate:r[2]==="implementation"?"impl":r[2],reviewer:r[3],verdict:r[4],time:r[5]?r[5].trim():void 0,text:e.trim()}:Zi.test(e)&&e.trim().length<=80?{kind:"phase",text:e.trim()}:{kind:"assistant",text:t}}function Ji(t,e){if(t.type==="assistant"){let r=t.message,n=r&&Array.isArray(r.content)?r.content:[],s=[];for(let o of n)if(bt(o)){if(o.type==="text"&&typeof o.text=="string")s.push(Fs(o.text));else if(o.type==="tool_use"){let i=Qi(o);typeof o.id=="string"&&e.set(o.id,i),s.push(i)}}return s}if(t.type==="user"){let r=t.message,n=r&&Array.isArray(r.content)?r.content:[];for(let s of n)if(bt(s)&&s.type==="tool_result"){let o=e.get(String(s.tool_use_id));if(o){let i=Xi(s.content);o.result=i,o.output=typeof s.content=="string"?s.content:i}}return[]}if(t.type==="result"){let r=t.is_error===!1&&t.subtype==="success";return[{kind:"result",success:r,text:typeof t.result=="string"?t.result:r?"DONE":""}]}return[]}function ea(t){if(t.type==="item.completed"&&bt(t.item)){let e=t.item;return e.type==="agent_message"&&typeof e.text=="string"?[Fs(e.text)]:e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}if(t.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(t.type==="turn.failed"){let e=t.error;return[{kind:"error",text:e&&typeof e.message=="string"?e.message:"turn failed"}]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:[]}function ta(t){let e=t.type;return typeof e=="string"&&(e==="error"||e.startsWith("thread.")||e.startsWith("turn.")||e.startsWith("item."))}function Bs(t){let e=[],r=new Map,n=Array.isArray(t)?t:[];for(let s of n){let o=s;if(typeof s=="string"){let l=s.trim();if(l.length===0)continue;try{o=JSON.parse(l)}catch{continue}}if(!bt(o))continue;let i=ta(o)?ea(o):Ji(o,r);for(let l of i)e.push(l)}return e}function Sr(t,e={}){let{transport:r,sessionLogStore:n,onClose:s}=e,o=null,i={},l=!0,a=new Set,c=null;function f(){if(!o||!n)return[];let x=n.get(o);return Bs(x?x.lines:[])}function g(x,_){if(_.kind==="gate")return u`<div class="sv__gate">${_.text}</div>`;if(_.kind==="phase")return u`<div class="sv__phase">${_.text}</div>`;if(_.kind==="result")return u`<div
        class="sv__result${_.success?" sv__result--ok":" sv__result--fail"}"
      >
        ${_.success?"\u2713":"\u2717"}
        ${_.text||(_.success?"DONE":"\uC2E4\uD328")}
      </div>`;if(_.kind==="error")return u`<div class="sv__error">⛔ ${_.text}</div>`;if(_.kind==="blocker")return u`<div class="sv__error">⛔ ${_.text}</div>`;if(_.kind==="tool"){let O=a.has(x),F=_.tool==="Bash"?_.command:_.path||_.command||"";return u`<div
        class="sv__tool${O?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>N(x)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${_.icon}</span>
          <span class="sv__tool-name">${_.tool}</span>
          ${F?u`<span class="sv__tool-detail">${F}</span>`:""}
          ${typeof _.added=="number"?u`<span class="sv__diff-add">+${_.added}</span>`:""}
          ${typeof _.removed=="number"?u`<span class="sv__diff-del">−${_.removed}</span>`:""}
          ${_.result?u`<span class="sv__tool-ok">→ ${_.result}</span>`:""}
        </span>
        ${O?u`<pre class="sv__tool-expand">${w(_)}</pre>`:""}
      </div>`}return u`<div class="sv__as">${_.text}</div>`}function w(x){let _=[];if(x.input!==void 0)try{_.push(`input: ${JSON.stringify(x.input,null,2)}`)}catch{}return typeof x.output=="string"&&x.output.length>0&&_.push(`output:
${x.output}`),_.join(`

`)}function $(){if(!o)return u``;let x=f(),_=[i.runner,i.model,i.effort].filter(Boolean).join(" \xB7 "),O=i.session_id||"",F=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${l?"ON":"OFF"}`;return u`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id">${o}</span>
        ${O?u`<button
              type="button"
              class="sv__session"
              title=${O}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${O}`}
              @click=${()=>U(O)}
            >
              ⧉ ${O.slice(0,8)}
            </button>`:""}
        ${_?u`<span class="sv__meta">${_}</span>`:""}
        ${i.worktree?u`<span class="sv__wt" title=${i.worktree}
              >${i.worktree}</span
            >`:""}
        <button
          type="button"
          class="sv__follow${l?" sv__follow--on":""}"
          aria-pressed=${l?"true":"false"}
          aria-label=${F}
          @click=${B}
        >
          <span class="sv__follow-full">⇣ ${F}</span>
          <span class="sv__follow-short">⇣ ${l?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>C()}
        >
          ✕
        </button>
      </div>
      <div class="sv__body">
        ${x.length===0?u`<div class="sv__empty">세션 로그 없음</div>`:x.map((G,K)=>g(K,G))}
      </div>
    </div>`}function v(){le($(),t),l&&L()}function L(){let x=t.querySelector(".sv__body");x&&(x.scrollTop=x.scrollHeight)}function N(x){a.has(x)?a.delete(x):a.add(x),v()}function B(){l=!l,v()}function U(x){Rt(x).then(_=>{_?X("\uBCF5\uC0AC\uB428","success",1200):X("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function H(x){!o||!x||(i={...i,...x},v())}function P(x){let _=x.target;if(!_||!_.classList||!_.classList.contains("sv__body"))return;!(_.scrollHeight-_.scrollTop-_.clientHeight<=4)&&l&&(l=!1,v())}t.addEventListener("scroll",P,!0);function E(x){let _=x&&x.attempt_id;_&&(o=_,i=x.meta||{},l=!0,a.clear(),!c&&n&&(c=n.subscribe(v)),r&&Promise.resolve(r("subscribe-session-log",{id:`session-log:${o}`,attempt_id:o})).catch(()=>{}),v())}function C(){let x=o;o=null,a.clear(),r&&x&&Promise.resolve(r("unsubscribe-session-log",{id:`session-log:${x}`})).catch(()=>{}),le(u``,t),s&&s()}return{open:E,updateMeta:H,close:C,isOpen(){return o!==null},destroy(){c&&(c(),c=null),t.removeEventListener("scroll",P,!0),o=null,le(u``,t)}}}function ra(t){let e=t&&t.metadata||{},r=[];return typeof e.spec_id=="string"&&e.spec_id.trim().length>0&&r.push({kind:"spec",path:e.spec_id.trim()}),typeof e.plan_path=="string"&&e.plan_path.trim().length>0&&r.push({kind:"plan",path:e.plan_path.trim()}),r}function qs(t,e){let r=ra(t);return u`
    <div class="detail-section-label">Artifacts</div>
    ${r.length===0?u`<div class="detail-empty">산출물 없음</div>`:u`
          ${r.map(n=>u`<div class="detail-art">
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
  `}var un=["opus","sonnet","haiku","fable"],pn=["low","medium","high","xhigh"],fn=["codex","opus","fable","self","skip"],hn=["opus","fable","sonnet","haiku"],na=["standard","fast_track"],gn={orchestration_model:"(\uAE30\uBCF8: opus)",orchestration_effort:"(\uAE30\uBCF8: CLI \uAE30\uBCF8)",review_model:"(\uAE30\uBCF8: codex)",impl_model:"(\uAE30\uBCF8: \uD2F0\uC5B4 \uC790\uB3D9)"};function Tr(t,e){let r=e&&e[t];return typeof r=="string"&&r.length>0?`(\uAE30\uBCF8: ${r} \u2014 \uC804\uC5ED)`:gn[t]||"(\uAE30\uBCF8)"}function Jt(t,e,r,n,s,o){return u`
    <div class="detail-kv">
      <span class="detail-kv__k">${e}</span>
      <select
        class=${s?"detail-kv__v detail-kv__v--sel":"detail-kv__v"}
        aria-label=${e}
        data-key=${t}
        @change=${i=>o.onChange(t,i.target.value)}
      >
        ${r.map(i=>u`<option value=${i.value} ?selected=${i.value===n}>
              ${i.label}
            </option>`)}
      </select>
    </div>
  `}function er(t,e){let r=t.map(n=>({value:n,label:n}));return typeof e=="string"?[{value:"",label:e},...r]:r}function Us(t,e,r){let n=t&&t.metadata||{},s=r&&typeof r=="object"?r:{},o=n.workflow_mode==="fast_track"?"fast_track":"standard";return u`
    <div class="detail-section-label">실행 설정 (수정 가능)</div>
    ${Jt("orchestration_model","orchestration_model",er(un,Tr("orchestration_model",s)),n.orchestration_model||"",!1,e)}
    ${Jt("orchestration_effort","orchestration_effort",er(pn,Tr("orchestration_effort",s)),n.orchestration_effort||"",!1,e)}
    ${Jt("review_model","review_model",er(fn,Tr("review_model",s)),n.review_model||"",!1,e)}
    ${Jt("impl_model","impl_model",er(hn,Tr("impl_model",s)),n.impl_model||"",!1,e)}
    ${Jt("workflow_mode","workflow_mode",er(na),o,n.workflow_mode==="fast_track",e)}
  `}var{entries:Zs,setPrototypeOf:zs,isFrozen:sa,getPrototypeOf:oa,getOwnPropertyDescriptor:ia}=Object,{freeze:qe,seal:nt,create:vn}=Object,{apply:$n,construct:xn}=typeof Reflect<"u"&&Reflect;qe||(qe=function(e){return e});nt||(nt=function(e){return e});$n||($n=function(e,r){for(var n=arguments.length,s=new Array(n>2?n-2:0),o=2;o<n;o++)s[o-2]=arguments[o];return e.apply(r,s)});xn||(xn=function(e){for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return new e(...n)});var Ar=Ue(Array.prototype.forEach),aa=Ue(Array.prototype.lastIndexOf),Hs=Ue(Array.prototype.pop),tr=Ue(Array.prototype.push),la=Ue(Array.prototype.splice),Cr=Ue(String.prototype.toLowerCase),mn=Ue(String.prototype.toString),_n=Ue(String.prototype.match),rr=Ue(String.prototype.replace),ca=Ue(String.prototype.indexOf),da=Ue(String.prototype.trim),ot=Ue(Object.prototype.hasOwnProperty),Be=Ue(RegExp.prototype.test),nr=ua(TypeError);function Ue(t){return function(e){e instanceof RegExp&&(e.lastIndex=0);for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return $n(t,e,n)}}function ua(t){return function(){for(var e=arguments.length,r=new Array(e),n=0;n<e;n++)r[n]=arguments[n];return xn(t,r)}}function re(t,e){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Cr;zs&&zs(t,null);let n=e.length;for(;n--;){let s=e[n];if(typeof s=="string"){let o=r(s);o!==s&&(sa(e)||(e[n]=o),s=o)}t[s]=!0}return t}function pa(t){for(let e=0;e<t.length;e++)ot(t,e)||(t[e]=null);return t}function ut(t){let e=vn(null);for(let[r,n]of Zs(t))ot(t,r)&&(Array.isArray(n)?e[r]=pa(n):n&&typeof n=="object"&&n.constructor===Object?e[r]=ut(n):e[r]=n);return e}function sr(t,e){for(;t!==null;){let n=ia(t,e);if(n){if(n.get)return Ue(n.get);if(typeof n.value=="function")return Ue(n.value)}t=oa(t)}function r(){return null}return r}var Ws=qe(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),bn=qe(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),wn=qe(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),fa=qe(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),kn=qe(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),ha=qe(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Gs=qe(["#text"]),js=qe(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),yn=qe(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Ys=qe(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Er=qe(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),ga=nt(/\{\{[\w\W]*|[\w\W]*\}\}/gm),ma=nt(/<%[\w\W]*|[\w\W]*%>/gm),_a=nt(/\$\{[\w\W]*/gm),ba=nt(/^data-[\-\w.\u00B7-\uFFFF]+$/),wa=nt(/^aria-[\-\w]+$/),Xs=nt(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),ka=nt(/^(?:\w+script|data):/i),ya=nt(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Qs=nt(/^html$/i),va=nt(/^[a-z][.\w]*(-[.\w]+)+$/i),Vs=Object.freeze({__proto__:null,ARIA_ATTR:wa,ATTR_WHITESPACE:ya,CUSTOM_ELEMENT:va,DATA_ATTR:ba,DOCTYPE_NAME:Qs,ERB_EXPR:ma,IS_ALLOWED_URI:Xs,IS_SCRIPT_OR_DATA:ka,MUSTACHE_EXPR:ga,TMPLIT_EXPR:_a}),or={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},$a=function(){return typeof window>"u"?null:window},xa=function(e,r){if(typeof e!="object"||typeof e.createPolicy!="function")return null;let n=null,s="data-tt-policy-suffix";r&&r.hasAttribute(s)&&(n=r.getAttribute(s));let o="dompurify"+(n?"#"+n:"");try{return e.createPolicy(o,{createHTML(i){return i},createScriptURL(i){return i}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},Ks=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Js(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:$a(),e=j=>Js(j);if(e.version="3.3.0",e.removed=[],!t||!t.document||t.document.nodeType!==or.document||!t.Element)return e.isSupported=!1,e;let{document:r}=t,n=r,s=n.currentScript,{DocumentFragment:o,HTMLTemplateElement:i,Node:l,Element:a,NodeFilter:c,NamedNodeMap:f=t.NamedNodeMap||t.MozNamedAttrMap,HTMLFormElement:g,DOMParser:w,trustedTypes:$}=t,v=a.prototype,L=sr(v,"cloneNode"),N=sr(v,"remove"),B=sr(v,"nextSibling"),U=sr(v,"childNodes"),H=sr(v,"parentNode");if(typeof i=="function"){let j=r.createElement("template");j.content&&j.content.ownerDocument&&(r=j.content.ownerDocument)}let P,E="",{implementation:C,createNodeIterator:x,createDocumentFragment:_,getElementsByTagName:O}=r,{importNode:F}=n,G=Ks();e.isSupported=typeof Zs=="function"&&typeof H=="function"&&C&&C.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:K,ERB_EXPR:ne,TMPLIT_EXPR:se,DATA_ATTR:$e,ARIA_ATTR:Ye,IS_SCRIPT_OR_DATA:He,ATTR_WHITESPACE:ke,CUSTOM_ELEMENT:xe}=Vs,{IS_ALLOWED_URI:Ve}=Vs,ce=null,lt=re({},[...Ws,...bn,...wn,...kn,...Gs]),pe=null,Ke=re({},[...js,...yn,...Ys,...Er]),ie=Object.seal(vn(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Ne=null,et=null,Te=Object.seal(vn(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),Ce=!0,ye=!0,Pe=!1,Ze=!0,Re=!1,de=!0,Le=!1,We=!1,be=!1,Ae=!1,Fe=!1,Me=!1,Xe=!0,tt=!1,me="user-content-",Ie=!0,Ee=!1,De={},I=null,M=re({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),d=null,h=re({},["audio","video","img","source","image","track"]),y=null,m=re({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),S="http://www.w3.org/1998/Math/MathML",T="http://www.w3.org/2000/svg",R="http://www.w3.org/1999/xhtml",Z=R,ee=!1,W=null,_e=re({},[S,T,R],mn),te=re({},["mi","mo","mn","ms","mtext"]),ge=re({},["annotation-xml"]),yt=re({},["title","style","font","a","script"]),rt=null,ft=["application/xhtml+xml","text/html"],Dt="text/html",b=null,k=null,Y=r.createElement("form"),V=function(p){return p instanceof RegExp||p instanceof Function},J=function(){let p=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(k&&k===p)){if((!p||typeof p!="object")&&(p={}),p=ut(p),rt=ft.indexOf(p.PARSER_MEDIA_TYPE)===-1?Dt:p.PARSER_MEDIA_TYPE,b=rt==="application/xhtml+xml"?mn:Cr,ce=ot(p,"ALLOWED_TAGS")?re({},p.ALLOWED_TAGS,b):lt,pe=ot(p,"ALLOWED_ATTR")?re({},p.ALLOWED_ATTR,b):Ke,W=ot(p,"ALLOWED_NAMESPACES")?re({},p.ALLOWED_NAMESPACES,mn):_e,y=ot(p,"ADD_URI_SAFE_ATTR")?re(ut(m),p.ADD_URI_SAFE_ATTR,b):m,d=ot(p,"ADD_DATA_URI_TAGS")?re(ut(h),p.ADD_DATA_URI_TAGS,b):h,I=ot(p,"FORBID_CONTENTS")?re({},p.FORBID_CONTENTS,b):M,Ne=ot(p,"FORBID_TAGS")?re({},p.FORBID_TAGS,b):ut({}),et=ot(p,"FORBID_ATTR")?re({},p.FORBID_ATTR,b):ut({}),De=ot(p,"USE_PROFILES")?p.USE_PROFILES:!1,Ce=p.ALLOW_ARIA_ATTR!==!1,ye=p.ALLOW_DATA_ATTR!==!1,Pe=p.ALLOW_UNKNOWN_PROTOCOLS||!1,Ze=p.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Re=p.SAFE_FOR_TEMPLATES||!1,de=p.SAFE_FOR_XML!==!1,Le=p.WHOLE_DOCUMENT||!1,Ae=p.RETURN_DOM||!1,Fe=p.RETURN_DOM_FRAGMENT||!1,Me=p.RETURN_TRUSTED_TYPE||!1,be=p.FORCE_BODY||!1,Xe=p.SANITIZE_DOM!==!1,tt=p.SANITIZE_NAMED_PROPS||!1,Ie=p.KEEP_CONTENT!==!1,Ee=p.IN_PLACE||!1,Ve=p.ALLOWED_URI_REGEXP||Xs,Z=p.NAMESPACE||R,te=p.MATHML_TEXT_INTEGRATION_POINTS||te,ge=p.HTML_INTEGRATION_POINTS||ge,ie=p.CUSTOM_ELEMENT_HANDLING||{},p.CUSTOM_ELEMENT_HANDLING&&V(p.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(ie.tagNameCheck=p.CUSTOM_ELEMENT_HANDLING.tagNameCheck),p.CUSTOM_ELEMENT_HANDLING&&V(p.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(ie.attributeNameCheck=p.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),p.CUSTOM_ELEMENT_HANDLING&&typeof p.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(ie.allowCustomizedBuiltInElements=p.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Re&&(ye=!1),Fe&&(Ae=!0),De&&(ce=re({},Gs),pe=[],De.html===!0&&(re(ce,Ws),re(pe,js)),De.svg===!0&&(re(ce,bn),re(pe,yn),re(pe,Er)),De.svgFilters===!0&&(re(ce,wn),re(pe,yn),re(pe,Er)),De.mathMl===!0&&(re(ce,kn),re(pe,Ys),re(pe,Er))),p.ADD_TAGS&&(typeof p.ADD_TAGS=="function"?Te.tagCheck=p.ADD_TAGS:(ce===lt&&(ce=ut(ce)),re(ce,p.ADD_TAGS,b))),p.ADD_ATTR&&(typeof p.ADD_ATTR=="function"?Te.attributeCheck=p.ADD_ATTR:(pe===Ke&&(pe=ut(pe)),re(pe,p.ADD_ATTR,b))),p.ADD_URI_SAFE_ATTR&&re(y,p.ADD_URI_SAFE_ATTR,b),p.FORBID_CONTENTS&&(I===M&&(I=ut(I)),re(I,p.FORBID_CONTENTS,b)),Ie&&(ce["#text"]=!0),Le&&re(ce,["html","head","body"]),ce.table&&(re(ce,["tbody"]),delete Ne.tbody),p.TRUSTED_TYPES_POLICY){if(typeof p.TRUSTED_TYPES_POLICY.createHTML!="function")throw nr('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof p.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw nr('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');P=p.TRUSTED_TYPES_POLICY,E=P.createHTML("")}else P===void 0&&(P=xa($,s)),P!==null&&typeof E=="string"&&(E=P.createHTML(""));qe&&qe(p),k=p}},fe=re({},[...bn,...wn,...fa]),ht=re({},[...kn,...ha]),fr=function(p){let D=H(p);(!D||!D.tagName)&&(D={namespaceURI:Z,tagName:"template"});let z=Cr(p.tagName),he=Cr(D.tagName);return W[p.namespaceURI]?p.namespaceURI===T?D.namespaceURI===R?z==="svg":D.namespaceURI===S?z==="svg"&&(he==="annotation-xml"||te[he]):!!fe[z]:p.namespaceURI===S?D.namespaceURI===R?z==="math":D.namespaceURI===T?z==="math"&&ge[he]:!!ht[z]:p.namespaceURI===R?D.namespaceURI===T&&!ge[he]||D.namespaceURI===S&&!te[he]?!1:!ht[z]&&(yt[z]||!fe[z]):!!(rt==="application/xhtml+xml"&&W[p.namespaceURI]):!1},Qe=function(p){tr(e.removed,{element:p});try{H(p).removeChild(p)}catch{N(p)}},ct=function(p,D){try{tr(e.removed,{attribute:D.getAttributeNode(p),from:D})}catch{tr(e.removed,{attribute:null,from:D})}if(D.removeAttribute(p),p==="is")if(Ae||Fe)try{Qe(D)}catch{}else try{D.setAttribute(p,"")}catch{}},gt=function(p){let D=null,z=null;if(be)p="<remove></remove>"+p;else{let q=_n(p,/^[\r\n\t ]+/);z=q&&q[0]}rt==="application/xhtml+xml"&&Z===R&&(p='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+p+"</body></html>");let he=P?P.createHTML(p):p;if(Z===R)try{D=new w().parseFromString(he,rt)}catch{}if(!D||!D.documentElement){D=C.createDocument(Z,"template",null);try{D.documentElement.innerHTML=ee?E:he}catch{}}let A=D.body||D.documentElement;return p&&z&&A.insertBefore(r.createTextNode(z),A.childNodes[0]||null),Z===R?O.call(D,Le?"html":"body")[0]:Le?D.documentElement:A},Je=function(p){return x.call(p.ownerDocument||p,p,c.SHOW_ELEMENT|c.SHOW_COMMENT|c.SHOW_TEXT|c.SHOW_PROCESSING_INSTRUCTION|c.SHOW_CDATA_SECTION,null)},Ot=function(p){return p instanceof g&&(typeof p.nodeName!="string"||typeof p.textContent!="string"||typeof p.removeChild!="function"||!(p.attributes instanceof f)||typeof p.removeAttribute!="function"||typeof p.setAttribute!="function"||typeof p.namespaceURI!="string"||typeof p.insertBefore!="function"||typeof p.hasChildNodes!="function")},hr=function(p){return typeof l=="function"&&p instanceof l};function Ge(j,p,D){Ar(j,z=>{z.call(e,p,D,k)})}let Ur=function(p){let D=null;if(Ge(G.beforeSanitizeElements,p,null),Ot(p))return Qe(p),!0;let z=b(p.nodeName);if(Ge(G.uponSanitizeElement,p,{tagName:z,allowedTags:ce}),de&&p.hasChildNodes()&&!hr(p.firstElementChild)&&Be(/<[/\w!]/g,p.innerHTML)&&Be(/<[/\w!]/g,p.textContent)||p.nodeType===or.progressingInstruction||de&&p.nodeType===or.comment&&Be(/<[/\w]/g,p.data))return Qe(p),!0;if(!(Te.tagCheck instanceof Function&&Te.tagCheck(z))&&(!ce[z]||Ne[z])){if(!Ne[z]&&Gt(z)&&(ie.tagNameCheck instanceof RegExp&&Be(ie.tagNameCheck,z)||ie.tagNameCheck instanceof Function&&ie.tagNameCheck(z)))return!1;if(Ie&&!I[z]){let he=H(p)||p.parentNode,A=U(p)||p.childNodes;if(A&&he){let q=A.length;for(let Q=q-1;Q>=0;--Q){let Se=L(A[Q],!0);Se.__removalCount=(p.__removalCount||0)+1,he.insertBefore(Se,B(p))}}}return Qe(p),!0}return p instanceof a&&!fr(p)||(z==="noscript"||z==="noembed"||z==="noframes")&&Be(/<\/no(script|embed|frames)/i,p.innerHTML)?(Qe(p),!0):(Re&&p.nodeType===or.text&&(D=p.textContent,Ar([K,ne,se],he=>{D=rr(D,he," ")}),p.textContent!==D&&(tr(e.removed,{element:p.cloneNode()}),p.textContent=D)),Ge(G.afterSanitizeElements,p,null),!1)},Wt=function(p,D,z){if(Xe&&(D==="id"||D==="name")&&(z in r||z in Y))return!1;if(!(ye&&!et[D]&&Be($e,D))){if(!(Ce&&Be(Ye,D))){if(!(Te.attributeCheck instanceof Function&&Te.attributeCheck(D,p))){if(!pe[D]||et[D]){if(!(Gt(p)&&(ie.tagNameCheck instanceof RegExp&&Be(ie.tagNameCheck,p)||ie.tagNameCheck instanceof Function&&ie.tagNameCheck(p))&&(ie.attributeNameCheck instanceof RegExp&&Be(ie.attributeNameCheck,D)||ie.attributeNameCheck instanceof Function&&ie.attributeNameCheck(D,p))||D==="is"&&ie.allowCustomizedBuiltInElements&&(ie.tagNameCheck instanceof RegExp&&Be(ie.tagNameCheck,z)||ie.tagNameCheck instanceof Function&&ie.tagNameCheck(z))))return!1}else if(!y[D]){if(!Be(Ve,rr(z,ke,""))){if(!((D==="src"||D==="xlink:href"||D==="href")&&p!=="script"&&ca(z,"data:")===0&&d[p])){if(!(Pe&&!Be(He,rr(z,ke,"")))){if(z)return!1}}}}}}}return!0},Gt=function(p){return p!=="annotation-xml"&&_n(p,xe)},jt=function(p){Ge(G.beforeSanitizeAttributes,p,null);let{attributes:D}=p;if(!D||Ot(p))return;let z={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:pe,forceKeepAttr:void 0},he=D.length;for(;he--;){let A=D[he],{name:q,namespaceURI:Q,value:Se}=A,dt=b(q),Hr=Se,Oe=q==="value"?Hr:da(Hr);if(z.attrName=dt,z.attrValue=Oe,z.keepAttr=!0,z.forceKeepAttr=void 0,Ge(G.uponSanitizeAttribute,p,z),Oe=z.attrValue,tt&&(dt==="id"||dt==="name")&&(ct(q,p),Oe=me+Oe),de&&Be(/((--!?|])>)|<\/(style|title|textarea)/i,Oe)){ct(q,p);continue}if(dt==="attributename"&&_n(Oe,"href")){ct(q,p);continue}if(z.forceKeepAttr)continue;if(!z.keepAttr){ct(q,p);continue}if(!Ze&&Be(/\/>/i,Oe)){ct(q,p);continue}Re&&Ar([K,ne,se],Vn=>{Oe=rr(Oe,Vn," ")});let Yn=b(p.nodeName);if(!Wt(Yn,dt,Oe)){ct(q,p);continue}if(P&&typeof $=="object"&&typeof $.getAttributeType=="function"&&!Q)switch($.getAttributeType(Yn,dt)){case"TrustedHTML":{Oe=P.createHTML(Oe);break}case"TrustedScriptURL":{Oe=P.createScriptURL(Oe);break}}if(Oe!==Hr)try{Q?p.setAttributeNS(Q,q,Oe):p.setAttribute(q,Oe),Ot(p)?Qe(p):Hs(e.removed)}catch{ct(q,p)}}Ge(G.afterSanitizeAttributes,p,null)},zr=function j(p){let D=null,z=Je(p);for(Ge(G.beforeSanitizeShadowDOM,p,null);D=z.nextNode();)Ge(G.uponSanitizeShadowNode,D,null),Ur(D),jt(D),D.content instanceof o&&j(D.content);Ge(G.afterSanitizeShadowDOM,p,null)};return e.sanitize=function(j){let p=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},D=null,z=null,he=null,A=null;if(ee=!j,ee&&(j="<!-->"),typeof j!="string"&&!hr(j))if(typeof j.toString=="function"){if(j=j.toString(),typeof j!="string")throw nr("dirty is not a string, aborting")}else throw nr("toString is not a function");if(!e.isSupported)return j;if(We||J(p),e.removed=[],typeof j=="string"&&(Ee=!1),Ee){if(j.nodeName){let Se=b(j.nodeName);if(!ce[Se]||Ne[Se])throw nr("root node is forbidden and cannot be sanitized in-place")}}else if(j instanceof l)D=gt("<!---->"),z=D.ownerDocument.importNode(j,!0),z.nodeType===or.element&&z.nodeName==="BODY"||z.nodeName==="HTML"?D=z:D.appendChild(z);else{if(!Ae&&!Re&&!Le&&j.indexOf("<")===-1)return P&&Me?P.createHTML(j):j;if(D=gt(j),!D)return Ae?null:Me?E:""}D&&be&&Qe(D.firstChild);let q=Je(Ee?j:D);for(;he=q.nextNode();)Ur(he),jt(he),he.content instanceof o&&zr(he.content);if(Ee)return j;if(Ae){if(Fe)for(A=_.call(D.ownerDocument);D.firstChild;)A.appendChild(D.firstChild);else A=D;return(pe.shadowroot||pe.shadowrootmode)&&(A=F.call(n,A,!0)),A}let Q=Le?D.outerHTML:D.innerHTML;return Le&&ce["!doctype"]&&D.ownerDocument&&D.ownerDocument.doctype&&D.ownerDocument.doctype.name&&Be(Qs,D.ownerDocument.doctype.name)&&(Q="<!DOCTYPE "+D.ownerDocument.doctype.name+`>
`+Q),Re&&Ar([K,ne,se],Se=>{Q=rr(Q,Se," ")}),P&&Me?P.createHTML(Q):Q},e.setConfig=function(){let j=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};J(j),We=!0},e.clearConfig=function(){k=null,We=!1},e.isValidAttribute=function(j,p,D){k||J({});let z=b(j),he=b(p);return Wt(z,he,D)},e.addHook=function(j,p){typeof p=="function"&&tr(G[j],p)},e.removeHook=function(j,p){if(p!==void 0){let D=aa(G[j],p);return D===-1?void 0:la(G[j],D,1)[0]}return Hs(G[j])},e.removeHooks=function(j){G[j]=[]},e.removeAllHooks=function(){G=Ks()},e}var eo=Js();var to={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},ro=t=>(...e)=>({_$litDirective$:t,values:e}),Rr=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,r,n){this._$Ct=e,this._$AM=r,this._$Ci=n}_$AS(e,r){return this.update(e,r)}update(e,r){return this.render(...r)}};var ir=class extends Rr{constructor(e){if(super(e),this.it=ve,e.type!==to.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===ve||e==null)return this._t=void 0,this.it=e;if(e===St)return e;if(typeof e!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;let r=[e];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}};ir.directiveName="unsafeHTML",ir.resultType=1;var no=ro(ir);function En(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var It=En();function uo(t){It=t}var dr={exec:()=>null};function oe(t,e=""){let r=typeof t=="string"?t:t.source,n={replace:(s,o)=>{let i=typeof o=="string"?o:o.source;return i=i.replace(ze.caret,"$1"),r=r.replace(s,i),n},getRegex:()=>new RegExp(r,e)};return n}var Sa=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),ze={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:t=>new RegExp(`^( {0,3}${t})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}#`),htmlBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}<(?:[a-z].*>|!--)`,"i")},Ta=/^(?:[ \t]*(?:\n|$))+/,Aa=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Ea=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,ur=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Ca=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Cn=/(?:[*+-]|\d{1,9}[.)])/,po=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,fo=oe(po).replace(/bull/g,Cn).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Ra=oe(po).replace(/bull/g,Cn).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Rn=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,La=/^[^\n]+/,Ln=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,Ia=oe(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Ln).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Da=oe(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Cn).getRegex(),Nr="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",In=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Oa=oe("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",In).replace("tag",Nr).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),ho=oe(Rn).replace("hr",ur).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Nr).getRegex(),Ma=oe(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",ho).getRegex(),Dn={blockquote:Ma,code:Aa,def:Ia,fences:Ea,heading:Ca,hr:ur,html:Oa,lheading:fo,list:Da,newline:Ta,paragraph:ho,table:dr,text:La},so=oe("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",ur).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Nr).getRegex(),Na={...Dn,lheading:Ra,table:so,paragraph:oe(Rn).replace("hr",ur).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",so).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Nr).getRegex()},Pa={...Dn,html:oe(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",In).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:dr,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:oe(Rn).replace("hr",ur).replace("heading",` *#{1,6} *[^
]`).replace("lheading",fo).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Fa=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Ba=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,go=/^( {2,}|\\)\n(?!\s*$)/,qa=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Pr=/[\p{P}\p{S}]/u,On=/[\s\p{P}\p{S}]/u,mo=/[^\s\p{P}\p{S}]/u,Ua=oe(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,On).getRegex(),_o=/(?!~)[\p{P}\p{S}]/u,za=/(?!~)[\s\p{P}\p{S}]/u,Ha=/(?:[^\s\p{P}\p{S}]|~)/u,Wa=oe(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",Sa?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),bo=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,Ga=oe(bo,"u").replace(/punct/g,Pr).getRegex(),ja=oe(bo,"u").replace(/punct/g,_o).getRegex(),wo="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Ya=oe(wo,"gu").replace(/notPunctSpace/g,mo).replace(/punctSpace/g,On).replace(/punct/g,Pr).getRegex(),Va=oe(wo,"gu").replace(/notPunctSpace/g,Ha).replace(/punctSpace/g,za).replace(/punct/g,_o).getRegex(),Ka=oe("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,mo).replace(/punctSpace/g,On).replace(/punct/g,Pr).getRegex(),Za=oe(/\\(punct)/,"gu").replace(/punct/g,Pr).getRegex(),Xa=oe(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Qa=oe(In).replace("(?:-->|$)","-->").getRegex(),Ja=oe("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Qa).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Dr=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,el=oe(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Dr).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),ko=oe(/^!?\[(label)\]\[(ref)\]/).replace("label",Dr).replace("ref",Ln).getRegex(),yo=oe(/^!?\[(ref)\](?:\[\])?/).replace("ref",Ln).getRegex(),tl=oe("reflink|nolink(?!\\()","g").replace("reflink",ko).replace("nolink",yo).getRegex(),oo=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,Mn={_backpedal:dr,anyPunctuation:Za,autolink:Xa,blockSkip:Wa,br:go,code:Ba,del:dr,emStrongLDelim:Ga,emStrongRDelimAst:Ya,emStrongRDelimUnd:Ka,escape:Fa,link:el,nolink:yo,punctuation:Ua,reflink:ko,reflinkSearch:tl,tag:Ja,text:qa,url:dr},rl={...Mn,link:oe(/^!?\[(label)\]\((.*?)\)/).replace("label",Dr).getRegex(),reflink:oe(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Dr).getRegex()},Sn={...Mn,emStrongRDelimAst:Va,emStrongLDelim:ja,url:oe(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",oo).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:oe(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",oo).getRegex()},nl={...Sn,br:oe(go).replace("{2,}","*").getRegex(),text:oe(Sn.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Lr={normal:Dn,gfm:Na,pedantic:Pa},ar={normal:Mn,gfm:Sn,breaks:nl,pedantic:rl},sl={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},io=t=>sl[t];function pt(t,e){if(e){if(ze.escapeTest.test(t))return t.replace(ze.escapeReplace,io)}else if(ze.escapeTestNoEncode.test(t))return t.replace(ze.escapeReplaceNoEncode,io);return t}function ao(t){try{t=encodeURI(t).replace(ze.percentDecode,"%")}catch{return null}return t}function lo(t,e){let r=t.replace(ze.findPipe,(o,i,l)=>{let a=!1,c=i;for(;--c>=0&&l[c]==="\\";)a=!a;return a?"|":" |"}),n=r.split(ze.splitPipe),s=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),e)if(n.length>e)n.splice(e);else for(;n.length<e;)n.push("");for(;s<n.length;s++)n[s]=n[s].trim().replace(ze.slashPipe,"|");return n}function lr(t,e,r){let n=t.length;if(n===0)return"";let s=0;for(;s<n;){let o=t.charAt(n-s-1);if(o===e&&!r)s++;else if(o!==e&&r)s++;else break}return t.slice(0,n-s)}function ol(t,e){if(t.indexOf(e[1])===-1)return-1;let r=0;for(let n=0;n<t.length;n++)if(t[n]==="\\")n++;else if(t[n]===e[0])r++;else if(t[n]===e[1]&&(r--,r<0))return n;return r>0?-2:-1}function co(t,e,r,n,s){let o=e.href,i=e.title||null,l=t[1].replace(s.other.outputLinkReplace,"$1");n.state.inLink=!0;let a={type:t[0].charAt(0)==="!"?"image":"link",raw:r,href:o,title:i,text:l,tokens:n.inlineTokens(l)};return n.state.inLink=!1,a}function il(t,e,r){let n=t.match(r.other.indentCodeCompensation);if(n===null)return e;let s=n[1];return e.split(`
`).map(o=>{let i=o.match(r.other.beginningSpace);if(i===null)return o;let[l]=i;return l.length>=s.length?o.slice(s.length):o}).join(`
`)}var Or=class{constructor(t){ue(this,"options");ue(this,"rules");ue(this,"lexer");this.options=t||It}space(t){let e=this.rules.block.newline.exec(t);if(e&&e[0].length>0)return{type:"space",raw:e[0]}}code(t){let e=this.rules.block.code.exec(t);if(e){let r=e[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:e[0],codeBlockStyle:"indented",text:this.options.pedantic?r:lr(r,`
`)}}}fences(t){let e=this.rules.block.fences.exec(t);if(e){let r=e[0],n=il(r,e[3]||"",this.rules);return{type:"code",raw:r,lang:e[2]?e[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):e[2],text:n}}}heading(t){let e=this.rules.block.heading.exec(t);if(e){let r=e[2].trim();if(this.rules.other.endingHash.test(r)){let n=lr(r,"#");(this.options.pedantic||!n||this.rules.other.endingSpaceChar.test(n))&&(r=n.trim())}return{type:"heading",raw:e[0],depth:e[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(t){let e=this.rules.block.hr.exec(t);if(e)return{type:"hr",raw:lr(e[0],`
`)}}blockquote(t){let e=this.rules.block.blockquote.exec(t);if(e){let r=lr(e[0],`
`).split(`
`),n="",s="",o=[];for(;r.length>0;){let i=!1,l=[],a;for(a=0;a<r.length;a++)if(this.rules.other.blockquoteStart.test(r[a]))l.push(r[a]),i=!0;else if(!i)l.push(r[a]);else break;r=r.slice(a);let c=l.join(`
`),f=c.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");n=n?`${n}
${c}`:c,s=s?`${s}
${f}`:f;let g=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(f,o,!0),this.lexer.state.top=g,r.length===0)break;let w=o.at(-1);if(w?.type==="code")break;if(w?.type==="blockquote"){let $=w,v=$.raw+`
`+r.join(`
`),L=this.blockquote(v);o[o.length-1]=L,n=n.substring(0,n.length-$.raw.length)+L.raw,s=s.substring(0,s.length-$.text.length)+L.text;break}else if(w?.type==="list"){let $=w,v=$.raw+`
`+r.join(`
`),L=this.list(v);o[o.length-1]=L,n=n.substring(0,n.length-w.raw.length)+L.raw,s=s.substring(0,s.length-$.raw.length)+L.raw,r=v.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:n,tokens:o,text:s}}}list(t){let e=this.rules.block.list.exec(t);if(e){let r=e[1].trim(),n=r.length>1,s={type:"list",raw:"",ordered:n,start:n?+r.slice(0,-1):"",loose:!1,items:[]};r=n?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=n?r:"[*+-]");let o=this.rules.other.listItemRegex(r),i=!1;for(;t;){let a=!1,c="",f="";if(!(e=o.exec(t))||this.rules.block.hr.test(t))break;c=e[0],t=t.substring(c.length);let g=e[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,L=>" ".repeat(3*L.length)),w=t.split(`
`,1)[0],$=!g.trim(),v=0;if(this.options.pedantic?(v=2,f=g.trimStart()):$?v=e[1].length+1:(v=e[2].search(this.rules.other.nonSpaceChar),v=v>4?1:v,f=g.slice(v),v+=e[1].length),$&&this.rules.other.blankLine.test(w)&&(c+=w+`
`,t=t.substring(w.length+1),a=!0),!a){let L=this.rules.other.nextBulletRegex(v),N=this.rules.other.hrRegex(v),B=this.rules.other.fencesBeginRegex(v),U=this.rules.other.headingBeginRegex(v),H=this.rules.other.htmlBeginRegex(v);for(;t;){let P=t.split(`
`,1)[0],E;if(w=P,this.options.pedantic?(w=w.replace(this.rules.other.listReplaceNesting,"  "),E=w):E=w.replace(this.rules.other.tabCharGlobal,"    "),B.test(w)||U.test(w)||H.test(w)||L.test(w)||N.test(w))break;if(E.search(this.rules.other.nonSpaceChar)>=v||!w.trim())f+=`
`+E.slice(v);else{if($||g.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||B.test(g)||U.test(g)||N.test(g))break;f+=`
`+w}!$&&!w.trim()&&($=!0),c+=P+`
`,t=t.substring(P.length+1),g=E.slice(v)}}s.loose||(i?s.loose=!0:this.rules.other.doubleBlankLine.test(c)&&(i=!0)),s.items.push({type:"list_item",raw:c,task:!!this.options.gfm&&this.rules.other.listIsTask.test(f),loose:!1,text:f,tokens:[]}),s.raw+=c}let l=s.items.at(-1);if(l)l.raw=l.raw.trimEnd(),l.text=l.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let a of s.items){if(this.lexer.state.top=!1,a.tokens=this.lexer.blockTokens(a.text,[]),a.task){if(a.text=a.text.replace(this.rules.other.listReplaceTask,""),a.tokens[0]?.type==="text"||a.tokens[0]?.type==="paragraph"){a.tokens[0].raw=a.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),a.tokens[0].text=a.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let f=this.lexer.inlineQueue.length-1;f>=0;f--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[f].src)){this.lexer.inlineQueue[f].src=this.lexer.inlineQueue[f].src.replace(this.rules.other.listReplaceTask,"");break}}let c=this.rules.other.listTaskCheckbox.exec(a.raw);if(c){let f={type:"checkbox",raw:c[0]+" ",checked:c[0]!=="[ ]"};a.checked=f.checked,s.loose?a.tokens[0]&&["paragraph","text"].includes(a.tokens[0].type)&&"tokens"in a.tokens[0]&&a.tokens[0].tokens?(a.tokens[0].raw=f.raw+a.tokens[0].raw,a.tokens[0].text=f.raw+a.tokens[0].text,a.tokens[0].tokens.unshift(f)):a.tokens.unshift({type:"paragraph",raw:f.raw,text:f.raw,tokens:[f]}):a.tokens.unshift(f)}}if(!s.loose){let c=a.tokens.filter(g=>g.type==="space"),f=c.length>0&&c.some(g=>this.rules.other.anyLine.test(g.raw));s.loose=f}}if(s.loose)for(let a of s.items){a.loose=!0;for(let c of a.tokens)c.type==="text"&&(c.type="paragraph")}return s}}html(t){let e=this.rules.block.html.exec(t);if(e)return{type:"html",block:!0,raw:e[0],pre:e[1]==="pre"||e[1]==="script"||e[1]==="style",text:e[0]}}def(t){let e=this.rules.block.def.exec(t);if(e){let r=e[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),n=e[2]?e[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=e[3]?e[3].substring(1,e[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):e[3];return{type:"def",tag:r,raw:e[0],href:n,title:s}}}table(t){let e=this.rules.block.table.exec(t);if(!e||!this.rules.other.tableDelimiter.test(e[2]))return;let r=lo(e[1]),n=e[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=e[3]?.trim()?e[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:e[0],header:[],align:[],rows:[]};if(r.length===n.length){for(let i of n)this.rules.other.tableAlignRight.test(i)?o.align.push("right"):this.rules.other.tableAlignCenter.test(i)?o.align.push("center"):this.rules.other.tableAlignLeft.test(i)?o.align.push("left"):o.align.push(null);for(let i=0;i<r.length;i++)o.header.push({text:r[i],tokens:this.lexer.inline(r[i]),header:!0,align:o.align[i]});for(let i of s)o.rows.push(lo(i,o.header.length).map((l,a)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:o.align[a]})));return o}}lheading(t){let e=this.rules.block.lheading.exec(t);if(e)return{type:"heading",raw:e[0],depth:e[2].charAt(0)==="="?1:2,text:e[1],tokens:this.lexer.inline(e[1])}}paragraph(t){let e=this.rules.block.paragraph.exec(t);if(e){let r=e[1].charAt(e[1].length-1)===`
`?e[1].slice(0,-1):e[1];return{type:"paragraph",raw:e[0],text:r,tokens:this.lexer.inline(r)}}}text(t){let e=this.rules.block.text.exec(t);if(e)return{type:"text",raw:e[0],text:e[0],tokens:this.lexer.inline(e[0])}}escape(t){let e=this.rules.inline.escape.exec(t);if(e)return{type:"escape",raw:e[0],text:e[1]}}tag(t){let e=this.rules.inline.tag.exec(t);if(e)return!this.lexer.state.inLink&&this.rules.other.startATag.test(e[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(e[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(e[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(e[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:e[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:e[0]}}link(t){let e=this.rules.inline.link.exec(t);if(e){let r=e[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;let o=lr(r.slice(0,-1),"\\");if((r.length-o.length)%2===0)return}else{let o=ol(e[2],"()");if(o===-2)return;if(o>-1){let i=(e[0].indexOf("!")===0?5:4)+e[1].length+o;e[2]=e[2].substring(0,o),e[0]=e[0].substring(0,i).trim(),e[3]=""}}let n=e[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(n);o&&(n=o[1],s=o[3])}else s=e[3]?e[3].slice(1,-1):"";return n=n.trim(),this.rules.other.startAngleBracket.test(n)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?n=n.slice(1):n=n.slice(1,-1)),co(e,{href:n&&n.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},e[0],this.lexer,this.rules)}}reflink(t,e){let r;if((r=this.rules.inline.reflink.exec(t))||(r=this.rules.inline.nolink.exec(t))){let n=(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=e[n.toLowerCase()];if(!s){let o=r[0].charAt(0);return{type:"text",raw:o,text:o}}return co(r,s,r[0],this.lexer,this.rules)}}emStrong(t,e,r=""){let n=this.rules.inline.emStrongLDelim.exec(t);if(!(!n||n[3]&&r.match(this.rules.other.unicodeAlphaNumeric))&&(!(n[1]||n[2])||!r||this.rules.inline.punctuation.exec(r))){let s=[...n[0]].length-1,o,i,l=s,a=0,c=n[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(c.lastIndex=0,e=e.slice(-1*t.length+s);(n=c.exec(e))!=null;){if(o=n[1]||n[2]||n[3]||n[4]||n[5]||n[6],!o)continue;if(i=[...o].length,n[3]||n[4]){l+=i;continue}else if((n[5]||n[6])&&s%3&&!((s+i)%3)){a+=i;continue}if(l-=i,l>0)continue;i=Math.min(i,i+l+a);let f=[...n[0]][0].length,g=t.slice(0,s+n.index+f+i);if(Math.min(s,i)%2){let $=g.slice(1,-1);return{type:"em",raw:g,text:$,tokens:this.lexer.inlineTokens($)}}let w=g.slice(2,-2);return{type:"strong",raw:g,text:w,tokens:this.lexer.inlineTokens(w)}}}}codespan(t){let e=this.rules.inline.code.exec(t);if(e){let r=e[2].replace(this.rules.other.newLineCharGlobal," "),n=this.rules.other.nonSpaceChar.test(r),s=this.rules.other.startingSpaceChar.test(r)&&this.rules.other.endingSpaceChar.test(r);return n&&s&&(r=r.substring(1,r.length-1)),{type:"codespan",raw:e[0],text:r}}}br(t){let e=this.rules.inline.br.exec(t);if(e)return{type:"br",raw:e[0]}}del(t){let e=this.rules.inline.del.exec(t);if(e)return{type:"del",raw:e[0],text:e[2],tokens:this.lexer.inlineTokens(e[2])}}autolink(t){let e=this.rules.inline.autolink.exec(t);if(e){let r,n;return e[2]==="@"?(r=e[1],n="mailto:"+r):(r=e[1],n=r),{type:"link",raw:e[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}url(t){let e;if(e=this.rules.inline.url.exec(t)){let r,n;if(e[2]==="@")r=e[0],n="mailto:"+r;else{let s;do s=e[0],e[0]=this.rules.inline._backpedal.exec(e[0])?.[0]??"";while(s!==e[0]);r=e[0],e[1]==="www."?n="http://"+e[0]:n=e[0]}return{type:"link",raw:e[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(t){let e=this.rules.inline.text.exec(t);if(e){let r=this.lexer.state.inRawBlock;return{type:"text",raw:e[0],text:e[0],escaped:r}}}},it=class Tn{constructor(e){ue(this,"tokens");ue(this,"options");ue(this,"state");ue(this,"inlineQueue");ue(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=e||It,this.options.tokenizer=this.options.tokenizer||new Or,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let r={other:ze,block:Lr.normal,inline:ar.normal};this.options.pedantic?(r.block=Lr.pedantic,r.inline=ar.pedantic):this.options.gfm&&(r.block=Lr.gfm,this.options.breaks?r.inline=ar.breaks:r.inline=ar.gfm),this.tokenizer.rules=r}static get rules(){return{block:Lr,inline:ar}}static lex(e,r){return new Tn(r).lex(e)}static lexInline(e,r){return new Tn(r).inlineTokens(e)}lex(e){e=e.replace(ze.carriageReturn,`
`),this.blockTokens(e,this.tokens);for(let r=0;r<this.inlineQueue.length;r++){let n=this.inlineQueue[r];this.inlineTokens(n.src,n.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(e,r=[],n=!1){for(this.options.pedantic&&(e=e.replace(ze.tabCharGlobal,"    ").replace(ze.spaceLine,""));e;){let s;if(this.options.extensions?.block?.some(i=>(s=i.call({lexer:this},e,r))?(e=e.substring(s.raw.length),r.push(s),!0):!1))continue;if(s=this.tokenizer.space(e)){e=e.substring(s.raw.length);let i=r.at(-1);s.raw.length===1&&i!==void 0?i.raw+=`
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
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):r.push(s);continue}if(e){let i="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(i);break}else throw new Error(i)}}return this.state.top=!0,r}inline(e,r=[]){return this.inlineQueue.push({src:e,tokens:r}),r}inlineTokens(e,r=[]){let n=e,s=null;if(this.tokens.links){let a=Object.keys(this.tokens.links);if(a.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(n))!=null;)a.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(n=n.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(n))!=null;)n=n.slice(0,s.index)+"++"+n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(n))!=null;)o=s[2]?s[2].length:0,n=n.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let i=!1,l="";for(;e;){i||(l=""),i=!1;let a;if(this.options.extensions?.inline?.some(f=>(a=f.call({lexer:this},e,r))?(e=e.substring(a.raw.length),r.push(a),!0):!1))continue;if(a=this.tokenizer.escape(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.tag(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.link(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(a.raw.length);let f=r.at(-1);a.type==="text"&&f?.type==="text"?(f.raw+=a.raw,f.text+=a.text):r.push(a);continue}if(a=this.tokenizer.emStrong(e,n,l)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.codespan(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.br(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.del(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.autolink(e)){e=e.substring(a.raw.length),r.push(a);continue}if(!this.state.inLink&&(a=this.tokenizer.url(e))){e=e.substring(a.raw.length),r.push(a);continue}let c=e;if(this.options.extensions?.startInline){let f=1/0,g=e.slice(1),w;this.options.extensions.startInline.forEach($=>{w=$.call({lexer:this},g),typeof w=="number"&&w>=0&&(f=Math.min(f,w))}),f<1/0&&f>=0&&(c=e.substring(0,f+1))}if(a=this.tokenizer.inlineText(c)){e=e.substring(a.raw.length),a.raw.slice(-1)!=="_"&&(l=a.raw.slice(-1)),i=!0;let f=r.at(-1);f?.type==="text"?(f.raw+=a.raw,f.text+=a.text):r.push(a);continue}if(e){let f="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(f);break}else throw new Error(f)}}return r}},Mr=class{constructor(t){ue(this,"options");ue(this,"parser");this.options=t||It}space(t){return""}code({text:t,lang:e,escaped:r}){let n=(e||"").match(ze.notSpaceStart)?.[0],s=t.replace(ze.endingNewline,"")+`
`;return n?'<pre><code class="language-'+pt(n)+'">'+(r?s:pt(s,!0))+`</code></pre>
`:"<pre><code>"+(r?s:pt(s,!0))+`</code></pre>
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
`}strong({tokens:t}){return`<strong>${this.parser.parseInline(t)}</strong>`}em({tokens:t}){return`<em>${this.parser.parseInline(t)}</em>`}codespan({text:t}){return`<code>${pt(t,!0)}</code>`}br(t){return"<br>"}del({tokens:t}){return`<del>${this.parser.parseInline(t)}</del>`}link({href:t,title:e,tokens:r}){let n=this.parser.parseInline(r),s=ao(t);if(s===null)return n;t=s;let o='<a href="'+t+'"';return e&&(o+=' title="'+pt(e)+'"'),o+=">"+n+"</a>",o}image({href:t,title:e,text:r,tokens:n}){n&&(r=this.parser.parseInline(n,this.parser.textRenderer));let s=ao(t);if(s===null)return pt(r);t=s;let o=`<img src="${t}" alt="${r}"`;return e&&(o+=` title="${pt(e)}"`),o+=">",o}text(t){return"tokens"in t&&t.tokens?this.parser.parseInline(t.tokens):"escaped"in t&&t.escaped?t.text:pt(t.text)}},Nn=class{strong({text:t}){return t}em({text:t}){return t}codespan({text:t}){return t}del({text:t}){return t}html({text:t}){return t}text({text:t}){return t}link({text:t}){return""+t}image({text:t}){return""+t}br(){return""}checkbox({raw:t}){return t}},at=class An{constructor(e){ue(this,"options");ue(this,"renderer");ue(this,"textRenderer");this.options=e||It,this.options.renderer=this.options.renderer||new Mr,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Nn}static parse(e,r){return new An(r).parse(e)}static parseInline(e,r){return new An(r).parseInline(e)}parse(e){let r="";for(let n=0;n<e.length;n++){let s=e[n];if(this.options.extensions?.renderers?.[s.type]){let i=s,l=this.options.extensions.renderers[i.type].call({parser:this},i);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(i.type)){r+=l||"";continue}}let o=s;switch(o.type){case"space":{r+=this.renderer.space(o);break}case"hr":{r+=this.renderer.hr(o);break}case"heading":{r+=this.renderer.heading(o);break}case"code":{r+=this.renderer.code(o);break}case"table":{r+=this.renderer.table(o);break}case"blockquote":{r+=this.renderer.blockquote(o);break}case"list":{r+=this.renderer.list(o);break}case"checkbox":{r+=this.renderer.checkbox(o);break}case"html":{r+=this.renderer.html(o);break}case"def":{r+=this.renderer.def(o);break}case"paragraph":{r+=this.renderer.paragraph(o);break}case"text":{r+=this.renderer.text(o);break}default:{let i='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return r}parseInline(e,r=this.renderer){let n="";for(let s=0;s<e.length;s++){let o=e[s];if(this.options.extensions?.renderers?.[o.type]){let l=this.options.extensions.renderers[o.type].call({parser:this},o);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){n+=l||"";continue}}let i=o;switch(i.type){case"escape":{n+=r.text(i);break}case"html":{n+=r.html(i);break}case"link":{n+=r.link(i);break}case"image":{n+=r.image(i);break}case"checkbox":{n+=r.checkbox(i);break}case"strong":{n+=r.strong(i);break}case"em":{n+=r.em(i);break}case"codespan":{n+=r.codespan(i);break}case"br":{n+=r.br(i);break}case"del":{n+=r.del(i);break}case"text":{n+=r.text(i);break}default:{let l='Token with "'+i.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return n}},Ir,cr=(Ir=class{constructor(t){ue(this,"options");ue(this,"block");this.options=t||It}preprocess(t){return t}postprocess(t){return t}processAllTokens(t){return t}emStrongMask(t){return t}provideLexer(){return this.block?it.lex:it.lexInline}provideParser(){return this.block?at.parse:at.parseInline}},ue(Ir,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),ue(Ir,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),Ir),al=class{constructor(...t){ue(this,"defaults",En());ue(this,"options",this.setOptions);ue(this,"parse",this.parseMarkdown(!0));ue(this,"parseInline",this.parseMarkdown(!1));ue(this,"Parser",at);ue(this,"Renderer",Mr);ue(this,"TextRenderer",Nn);ue(this,"Lexer",it);ue(this,"Tokenizer",Or);ue(this,"Hooks",cr);this.use(...t)}walkTokens(t,e){let r=[];for(let n of t)switch(r=r.concat(e.call(this,n)),n.type){case"table":{let s=n;for(let o of s.header)r=r.concat(this.walkTokens(o.tokens,e));for(let o of s.rows)for(let i of o)r=r.concat(this.walkTokens(i.tokens,e));break}case"list":{let s=n;r=r.concat(this.walkTokens(s.items,e));break}default:{let s=n;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let i=s[o].flat(1/0);r=r.concat(this.walkTokens(i,e))}):s.tokens&&(r=r.concat(this.walkTokens(s.tokens,e)))}}return r}use(...t){let e=this.defaults.extensions||{renderers:{},childTokens:{}};return t.forEach(r=>{let n={...r};if(n.async=this.defaults.async||n.async||!1,r.extensions&&(r.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=e.renderers[s.name];o?e.renderers[s.name]=function(...i){let l=s.renderer.apply(this,i);return l===!1&&(l=o.apply(this,i)),l}:e.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=e[s.level];o?o.unshift(s.tokenizer):e[s.level]=[s.tokenizer],s.start&&(s.level==="block"?e.startBlock?e.startBlock.push(s.start):e.startBlock=[s.start]:s.level==="inline"&&(e.startInline?e.startInline.push(s.start):e.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(e.childTokens[s.name]=s.childTokens)}),n.extensions=e),r.renderer){let s=this.defaults.renderer||new Mr(this.defaults);for(let o in r.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let i=o,l=r.renderer[i],a=s[i];s[i]=(...c)=>{let f=l.apply(s,c);return f===!1&&(f=a.apply(s,c)),f||""}}n.renderer=s}if(r.tokenizer){let s=this.defaults.tokenizer||new Or(this.defaults);for(let o in r.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let i=o,l=r.tokenizer[i],a=s[i];s[i]=(...c)=>{let f=l.apply(s,c);return f===!1&&(f=a.apply(s,c)),f}}n.tokenizer=s}if(r.hooks){let s=this.defaults.hooks||new cr;for(let o in r.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let i=o,l=r.hooks[i],a=s[i];cr.passThroughHooks.has(o)?s[i]=c=>{if(this.defaults.async&&cr.passThroughHooksRespectAsync.has(o))return(async()=>{let g=await l.call(s,c);return a.call(s,g)})();let f=l.call(s,c);return a.call(s,f)}:s[i]=(...c)=>{if(this.defaults.async)return(async()=>{let g=await l.apply(s,c);return g===!1&&(g=await a.apply(s,c)),g})();let f=l.apply(s,c);return f===!1&&(f=a.apply(s,c)),f}}n.hooks=s}if(r.walkTokens){let s=this.defaults.walkTokens,o=r.walkTokens;n.walkTokens=function(i){let l=[];return l.push(o.call(this,i)),s&&(l=l.concat(s.call(this,i))),l}}this.defaults={...this.defaults,...n}}),this}setOptions(t){return this.defaults={...this.defaults,...t},this}lexer(t,e){return it.lex(t,e??this.defaults)}parser(t,e){return at.parse(t,e??this.defaults)}parseMarkdown(t){return(e,r)=>{let n={...r},s={...this.defaults,...n},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&n.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof e>"u"||e===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof e!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(e)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=t),s.async)return(async()=>{let i=s.hooks?await s.hooks.preprocess(e):e,l=await(s.hooks?await s.hooks.provideLexer():t?it.lex:it.lexInline)(i,s),a=s.hooks?await s.hooks.processAllTokens(l):l;s.walkTokens&&await Promise.all(this.walkTokens(a,s.walkTokens));let c=await(s.hooks?await s.hooks.provideParser():t?at.parse:at.parseInline)(a,s);return s.hooks?await s.hooks.postprocess(c):c})().catch(o);try{s.hooks&&(e=s.hooks.preprocess(e));let i=(s.hooks?s.hooks.provideLexer():t?it.lex:it.lexInline)(e,s);s.hooks&&(i=s.hooks.processAllTokens(i)),s.walkTokens&&this.walkTokens(i,s.walkTokens);let l=(s.hooks?s.hooks.provideParser():t?at.parse:at.parseInline)(i,s);return s.hooks&&(l=s.hooks.postprocess(l)),l}catch(i){return o(i)}}}onError(t,e){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,t){let n="<p>An error occurred:</p><pre>"+pt(r.message+"",!0)+"</pre>";return e?Promise.resolve(n):n}if(e)return Promise.reject(r);throw r}}},Lt=new al;function ae(t,e){return Lt.parse(t,e)}ae.options=ae.setOptions=function(t){return Lt.setOptions(t),ae.defaults=Lt.defaults,uo(ae.defaults),ae};ae.getDefaults=En;ae.defaults=It;ae.use=function(...t){return Lt.use(...t),ae.defaults=Lt.defaults,uo(ae.defaults),ae};ae.walkTokens=function(t,e){return Lt.walkTokens(t,e)};ae.parseInline=Lt.parseInline;ae.Parser=at;ae.parser=at.parse;ae.Renderer=Mr;ae.TextRenderer=Nn;ae.Lexer=it;ae.lexer=it.lex;ae.Tokenizer=Or;ae.Hooks=cr;ae.parse=ae;var md=ae.options,_d=ae.setOptions,bd=ae.use,wd=ae.walkTokens,kd=ae.parseInline;var yd=at.parse,vd=it.lex;function vo(t){let e=ae.parse(t),r=eo.sanitize(e);return no(r)}function ll(t){return String(t||"").replace(/^docs\/(superpowers\/)?/,"")}function $o(t,e){let r=e.getWorkspacePath,n=e.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",i="",l="";function a(v){v.key==="Escape"&&s&&(v.preventDefault(),w())}document.addEventListener("keydown",a);function c(){return s?u`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>w()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${ll(s)}</span
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
            ${o==="loading"?u`<div class="mv__status">불러오는 중…</div>`:o==="error"?u`<div class="mv__status mv__status--error">
                    ${l||"\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}
                  </div>`:vo(i)}
          </div>
        </div>
      </div>
    `:u``}function f(){le(c(),t)}async function g(v){s=v,o="loading",i="",l="",f();let L=r?r():"";if(!L){o="error",l="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",f();return}if(!n){o="error",l="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",f();return}let N="/api/doc?workspace="+encodeURIComponent(L)+"&path="+encodeURIComponent(v);try{let B=await n(N),U=await B.json().catch(()=>({}));if(!B.ok||!U||U.ok!==!0){o="error",l="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(U&&U.error||B.status)+")",f();return}i=String(U.content||""),o="ready",f()}catch{o="error",l="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",f()}}function w(){s=null,le(u``,t)}function $(){document.removeEventListener("keydown",a),w()}return{open:g,close:w,destroy:$}}var cl={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function dl(t){if(typeof t!="number"||!Number.isFinite(t))return"";let e=new Date(t),r=String(e.getHours()).padStart(2,"0"),n=String(e.getMinutes()).padStart(2,"0");return`${r}:${n}`}function xo(t,e={}){let r=Array.isArray(t)?t:[];if(r.length===0)return u`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let n=new Set;for(let i of r)i&&typeof i.resumed_from=="string"&&i.resumed_from.length>0&&n.add(i.resumed_from);let s=i=>{if(!(i.status==="failed"||i.status==="orphaned"))return"";let a=typeof i.session_id=="string"&&i.session_id.length>0,c=n.has(i.attempt_id),f=a&&!c,g=a?c?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return u`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${i.attempt_id}
      ?disabled=${!f}
      title=${g}
      @click=${w=>{w.stopPropagation(),f&&e.onResume&&e.onResume(i.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},o=i=>{if(!(i.status==="failed"||i.status==="orphaned")||typeof i.cause!="string"||i.cause==="")return"";let a=i.cause_detail,c=a&&typeof a.reason=="string"&&a.reason.length>0?typeof a.command=="string"&&a.command.length>0?`${a.reason} \xB7 ${a.command}`:a.reason:i.cause;return u`<div class="detail-session__cause" title=${c}>
      ${i.cause}
    </div>`};return u`
    <div class="detail-section-label">세션 이력</div>
    <div class="detail-sessions" data-seam="session-history">
      ${r.map(i=>u`<div class="detail-session-row">
            <button
              type="button"
              class="detail-session detail-session--${i.status||"unknown"}"
              data-attempt-id=${i.attempt_id}
              @click=${()=>e.onOpen&&e.onOpen(i.attempt_id)}
            >
              <span class="detail-session__glyph"
                >${cl[i.status||""]||"\xB7"}</span
              >
              <span class="detail-session__id">${i.attempt_id}</span>
              ${i.resumed_from?u`<span
                    class="detail-session__resumed"
                    title=${`\uC774\uC5B4\uBC1B\uC740 \uC138\uC158 (from ${i.resumed_from})`}
                    >↻</span
                  >`:""}
              <span class="detail-session__meta"
                >${[i.runner,i.model].filter(Boolean).join(" \xB7 ")}</span
              >
              ${i.session_id?u`<span class="detail-session__sid" title=${i.session_id}
                    >${String(i.session_id).slice(0,8)}</span
                  >`:""}
              <span class="detail-session__time"
                >${dl(i.started_at)}</span
              >
            </button>
            ${s(i)} ${o(i)}
          </div>`)}
    </div>
  `}var ul=["open","in_progress","deferred","resolved","closed"],pl=[0,1,2,3,4];function So(t,e){let r=e.issueStores,n=e.onClose,s=e.transport,o=e.onNavigate,i=e.queueStore,l=e.sessionLogStore,a=null,c=null,f={},g=!1,w=!1,$="",v="",L="";function N(){g=!1,w=!1,$="",v="",L=""}let B=document.createElement("div");B.className="md-viewer-root",document.body.appendChild(B);let U=$o(B,{getWorkspacePath:e.getWorkspacePath||(()=>"")}),H=document.createElement("div");H.className="session-log-root",document.body.appendChild(H);let P=Sr(H,{transport:s?(m,S)=>Promise.resolve(s(m,S)):void 0,sessionLogStore:l});function E(){if(!i||!a)return[];let m=i.get();return(m&&m.attempts?Object.values(m.attempts):[]).filter(T=>T&&T.bead_id===a).sort((T,R)=>(R.started_at||0)-(T.started_at||0)).map(T=>({attempt_id:T.attempt_id,bead_id:T.bead_id,status:T.status,started_at:typeof T.started_at=="number"?T.started_at:null,runner:T.runner||null,model:T.model||null,session_id:T.session_id||null,resumed_from:T.resumed_from||null,dismissed_at:typeof T.dismissed_at=="number"?T.dismissed_at:null,cause:typeof T.cause=="string"?T.cause:null,cause_detail:T.cause_detail||null}))}function C(m){let S=i?i.get():null,T=S&&S.attempts?S.attempts[m]:null;P.open({attempt_id:m,meta:T?{runner:T.runner||void 0,model:T.model||void 0,effort:T.effort||void 0,status:T.status||void 0,session_id:T.session_id||void 0}:{}})}async function x(m){if(!s||!m)return;let S=()=>{let R=i?i.get():null;return R&&typeof R.revision=="number"?R.revision:0},T=await s("worker-attempt-resume",{attempt_id:m,expected_revision:S()});if(T&&T.conflict){let R=T.queue&&typeof T.queue.revision=="number"?T.queue.revision:S();T=await s("worker-attempt-resume",{attempt_id:m,expected_revision:R})}T&&T.resumed===!1&&!T.conflict&&T.reason&&X(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${T.reason}`,"error",2400)}let _={onOpen:C,onResume:x};function O(){let m=i?i.get():null,S=m&&m.exec_defaults;return S&&typeof S=="object"?S:{}}let F=null;r&&r.subscribe&&(F=r.subscribe(()=>ne()));let G=null;i&&typeof i.subscribe=="function"&&(G=i.subscribe(()=>{a&&y()}));function K(m){m.key==="Escape"&&a&&(m.preventDefault(),n())}document.addEventListener("keydown",K);function ne(){if(a){if(r&&typeof r.snapshotFor=="function"){let m=r.snapshotFor("detail:"+a)||[];c=m.find(T=>T&&T.id===a)||m[0]||c}y()}}function se(m){Rt(m).then(S=>{S?X("\uBCF5\uC0AC\uB428","success",1200):X("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function $e(m){m.preventDefault(),m.stopPropagation(),a&&se(a)}function Ye(m,S){m.preventDefault(),m.stopPropagation(),se(S)}function He(m,S){m.preventDefault(),m.stopPropagation(),U.open(S)}function ke(m,S){f[m]=S,y(),!(!s||!a)&&Promise.resolve(s("update-exec-settings",{id:a,key:m,value:S})).catch(()=>{X("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}async function xe(m,S,T){if(!s||!a)return!1;try{let R=await Promise.resolve(s(m,S)),Z=Array.isArray(R)?R[0]:R;return Z&&typeof Z=="object"&&Z.id?(c=Z,!0):(X(T,"error"),!1)}catch{return X(T,"error"),!1}}function Ve(m){setTimeout(()=>{try{let S=t.querySelector(m);S&&typeof S.focus=="function"&&S.focus()}catch{}},0)}function ce(){g=!0,$=c&&c.title||"",y(),Ve('.detail-edit__input[data-edit="title"]')}function lt(m){$=m.target.value}function pe(){g=!1,$="",y()}function Ke(){xe("edit-text",{id:a,field:"title",value:$},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(S=>{S&&(g=!1,$=""),y()})}function ie(){w=!0,v=c&&c.description||"",y(),Ve('.detail-edit__textarea[data-edit="description"]')}function Ne(m){v=m.target.value}function et(){w=!1,v="",y()}function Te(){xe("edit-text",{id:a,field:"description",value:v},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(S=>{S&&(w=!1,v=""),y()})}function Ce(m,S,T,R){if(m.key==="Escape"){m.stopPropagation(),T();return}m.key==="Enter"&&(!R||m.ctrlKey||m.metaKey)&&(m.preventDefault(),S())}function ye(m){let S=m.target.value;xe("update-status",{id:a,status:S},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>y())}function Pe(m){let S=Number(m.target.value);xe("update-priority",{id:a,priority:S},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>y())}function Ze(m){L=m.target.value}function Re(){let m=L.trim();m.length!==0&&xe("label-add",{id:a,label:m},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(S=>{S&&(L=""),y()})}function de(m){if(m.key==="Escape"){m.stopPropagation(),L="",y();return}m.key==="Enter"&&(m.preventDefault(),Re())}function Le(m){xe("label-remove",{id:a,label:m},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>y())}let We={onCopyPath:Ye,onOpenDoc:He},be={onChange:ke};function Ae(m){return typeof m=="string"?m:m&&typeof m=="object"?String(m.id||m.to||m.issue_id||m.depends_on||""):""}function Fe(m){switch(m&&typeof m=="object"?String(m.dependency_type||m.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function Me(m){let T=(Array.isArray(m.dependencies)?m.dependencies:[]).map(R=>({id:Ae(R),icon:Fe(R)})).filter(R=>R.id.length>0);return u`
      <div class="detail-section-label">의존성</div>
      ${T.length===0?u`<div class="detail-empty">의존성 없음</div>`:u`<div class="detail-deps">
            ${T.map(R=>o?u`<button
                    type="button"
                    class="detail-dep detail-dep--link"
                    @click=${()=>o(R.id)}
                  >
                    ${R.icon?`${R.icon} `:""}${R.id}
                  </button>`:u`<span class="detail-dep"
                    >${R.icon?`${R.icon} `:""}${R.id}</span
                  >`)}
          </div>`}
    `}function Xe(m){let S=m.metadata||{},T=m.workflow||{},R=T.stages||{},Z=R.spec&&R.spec.stale,ee=R.impl&&R.impl.stale,W=T.route_source==="derived",_e=T.route||S.route||"\u2014";return u`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${W?" detail-kv__v--derived":""}"
          title=${W?"route \uCD94\uB860\uAC12 (metadata \uBBF8\uD540)":"route"}
          >${W&&T.route?`${_e} ? (\uCD94\uB860)`:_e}</span
        >
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">spec_review</span>
        <span class="detail-kv__v"
          >${S.spec_review||"\uC5C6\uC74C"}${Z?" \xB7 stale":""}</span
        >
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">impl_review</span>
        <span class="detail-kv__v"
          >${S.impl_review||"\uC5C6\uC74C"}${ee?" \xB7 stale":""}</span
        >
      </div>
      ${S.pr_url?u`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${S.pr_url}</span>
          </div>`:""}
    `}let tt={route:["spec_backed","full_plan"]};async function me(m,S){let T=S.target.value;if(m==="route"&&c&&c.metadata&&c.metadata.route==="full_plan"&&T!=="full_plan"&&!window.confirm(`full_plan \u2192 ${T||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){y();return}await xe("update-workflow-meta",{id:a,key:m,value:T},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),y()}function Ie(m){let S=m.metadata||{};return u` ${((R,Z)=>{let ee=tt[R],W=typeof S[R]=="string"?S[R]:"";return u`<div class="detail-kv">
        <span class="detail-kv__k">${R}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${R}
          data-edit=${`wfmeta-${R}`}
          @change=${_e=>me(R,_e)}
        >
          <option value="" ?selected=${!ee.includes(W)}>
            ${Z}
          </option>
          ${ee.map(_e=>u`<option value=${_e} ?selected=${W===_e}>${_e}</option>`)}
        </select>
      </div>`})("route","(\uBBF8\uC124\uC815 \xB7 \uCD94\uB860)")} `}function Ee(m){return g?u`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${$}
            @input=${lt}
            @keydown=${S=>Ce(S,Ke,pe,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${Ke}
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
      `:u`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${m}</h2>
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
    `}function De(m){let S=_t(m.created_at),T=_t(m.updated_at);return!S&&!T?u``:u`
      ${S?u`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${S}</span>
          </div>`:""}
      ${T?u`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${T}</span>
          </div>`:""}
    `}function I(m,S){return u`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${ye}
        >
          ${ul.map(T=>u`<option value=${T} ?selected=${T===m}>${T}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${Pe}
        >
          ${pl.map(T=>u`<option value=${String(T)} ?selected=${T===S}>
                P${T}
              </option>`)}
        </select>
      </div>
    `}function M(m){return u`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${w?"":u`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${ie}
            >
              ✎
            </button>`}
      </div>
      ${w?u`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${v}
              @input=${Ne}
              @keydown=${S=>Ce(S,Te,et,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${Te}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${et}
              >
                취소
              </button>
            </div>
          </div>`:u`<div class="detail-overlay__desc">
            ${m||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function d(m){let S=Array.isArray(m.labels)?m.labels:[];return u`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${S.map(T=>u`<span class="detail-label-chip"
              >${T}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${T}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+T}
                @click=${()=>Le(T)}
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
            @keydown=${de}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${Re}
          >
            추가
          </button>
        </span>
      </div>
    `}function h(){if(!a)return u``;let m=c||{},S=String(m.id||a),T=m.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",R=m.status||"open",Z=typeof m.priority=="number"?Math.max(0,Math.min(4,m.priority)):"",ee=m.description||"",W={...m,metadata:{...m.metadata||{},...f}};return u`
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
            @click=${$e}
          >
            ${S}
          </button>
          ${Ee(T)} ${I(R,Z)}
          ${De(m)} ${M(ee)}
          ${d(m)} ${Me(m)}
          ${Xe(m)} ${Ie(m)}
          ${qs(m,We)}
          ${Us(W,be,O())}
          ${xo(E(),_)}
        </div>
      </div>
    `}function y(){le(h(),t)}return{load(m){m!==a&&(f={},N()),a=m,c=null,ne()},clear(){a=null,c=null,f={},N(),U.close(),P.close(),le(u``,t)},destroy(){F&&(F(),F=null),G&&(G(),G=null),document.removeEventListener("keydown",K),U.destroy(),B.parentNode&&B.parentNode.removeChild(B),P.destroy(),H.parentNode&&H.parentNode.removeChild(H),a=null,c=null,le(u``,t)}}}var fl=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function To(t,e){return on(t,e)?"shown":e.hidden_labels.includes(t)?"hidden_exact":"hidden_prefix"}function hl(t,e,r){if(!r)return{hidden_labels:e.hidden_labels.includes(t)?e.hidden_labels:[...e.hidden_labels,t],visible_labels:e.visible_labels.filter(o=>o!==t)};let n=e.hidden_labels.filter(o=>o!==t);return e.hidden_prefixes.some(o=>o.length>0&&t.startsWith(o))?{hidden_labels:n,visible_labels:e.visible_labels.includes(t)?e.visible_labels:[...e.visible_labels,t]}:{hidden_labels:n}}function Ao(t,e){let{policyStore:r,transport:n,labelOptions:s}=e,o=document.createElement("dialog");o.id="display-settings-dialog",o.className="display-settings",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),t.appendChild(o);let i="";async function l(C){let x=r.get();if(x)try{let _=await n("display-policy-set",{expected_revision:x.revision,policy:C(x)});a(_),_&&_.conflict&&_.policy&&(_=await n("display-policy-set",{expected_revision:_.policy.revision,policy:C(_.policy)}),a(_)),_&&_.conflict&&X("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC","error",4e3)}catch{X("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function a(C){C&&C.policy&&typeof C.policy=="object"&&r.set(C.policy)}function c(C){let x=r.get();if(!x)return;let _=To(C,x)!=="shown";l(O=>hl(C,O,_))}function f(){let C=i.trim();C.length!==0&&(i="",l(x=>x.hidden_prefixes.includes(C)?{hidden_prefixes:x.hidden_prefixes}:{hidden_prefixes:[...x.hidden_prefixes,C]}),N())}function g(C){l(x=>({hidden_prefixes:x.hidden_prefixes.filter(_=>_!==C)}))}function w(C){let x=r.get();if(!x)return;let _=x.chips[C]===!1;l(()=>({chips:{[C]:_}}))}function $(C){let x=s();return u`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">라벨 표시</h3>
        <p class="display-settings__hint">
          라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을
          누르면 그 라벨만 예외로 다시 표시됩니다.
        </p>
        ${x.length===0?u`<div class="display-settings__empty">라벨 없음</div>`:u`<div class="display-settings__pills">
              ${x.map(_=>{let O=To(_,C);return u`<button
                  type="button"
                  class=${`display-settings__pill display-settings__pill--${O}`}
                  data-label=${_}
                  data-state=${O}
                  @click=${()=>c(_)}
                >
                  ${_}
                </button>`})}
            </div>`}
      </section>
    `}function v(C){return u`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">숨김 prefix</h3>
        <div class="display-settings__prefixes">
          ${C.hidden_prefixes.map(x=>u`<span class="display-settings__prefix">
                ${x}
                <button
                  type="button"
                  class="display-settings__prefix-remove"
                  aria-label=${`${x} \uADDC\uCE59 \uC81C\uAC70`}
                  @click=${()=>g(x)}
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
          <button type="button" @click=${f}>추가</button>
        </div>
      </section>
    `}function L(C){return u`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">카드 표시 요소</h3>
        <div class="display-settings__toggles">
          ${fl.map(([x,_])=>u`<label class="display-settings__toggle">
                <input
                  type="checkbox"
                  data-chip=${x}
                  .checked=${C.chips[x]!==!1}
                  @change=${()=>w(x)}
                />
                <span>${_}</span>
              </label>`)}
        </div>
      </section>
    `}function N(){let C=r.get();le(u`
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
            ${C?u`${$(C)} ${v(C)}
                ${L(C)}`:u`<div class="display-settings__empty">
                  표시 정책을 불러오는 중…
                </div>`}
          </div>
        </div>
      `,o)}let B=!1,U=()=>{B=!1};o.addEventListener("close",U),o.addEventListener("cancel",U);let H=null;r.subscribe&&(H=r.subscribe(()=>{B&&N()}));function P(){B||(i="",B=!0,N(),typeof o.showModal=="function"?o.showModal():o.setAttribute("open",""))}function E(){B&&(B=!1,typeof o.close=="function"?o.close():o.removeAttribute("open"))}return{open:P,close:E,destroy(){B=!1,o.removeEventListener("close",U),o.removeEventListener("cancel",U),H&&(H(),H=null),o.remove()}}}function Eo(t){let e=document.createElement("dialog");e.id="fatal-error-dialog",e.setAttribute("role","alertdialog"),e.setAttribute("aria-modal","true"),e.innerHTML=`
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
    </div>`,t.appendChild(e);let r=e.querySelector("#fatal-error-title"),n=e.querySelector("#fatal-error-message"),s=e.querySelector("#fatal-error-detail"),o=e.querySelector("#fatal-error-reload"),i=e.querySelector("#fatal-error-close"),l=()=>{if(typeof e.close=="function")try{e.close()}catch{}e.removeAttribute("open")},a=(c,f,g="")=>{r&&(r.textContent=c||"Unexpected Error"),n&&(n.textContent=f||"An unrecoverable error occurred.");let w=typeof g=="string"?g.trim():"";if(s&&(w.length>0?(s.textContent=w,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof e.showModal=="function")try{e.showModal(),e.setAttribute("open","")}catch{e.setAttribute("open","")}else e.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),i&&i.addEventListener("click",()=>l()),e.addEventListener("cancel",c=>{c.preventDefault(),l()}),{open:a,close:l,getElement(){return e}}}function Co(t,e,r){let n=we("views:nav"),s=null;function o(a){return c=>{c.preventDefault(),n("click tab %s",a),r.gotoView(a)}}function i(){let c=e.getState().view==="worker"?"worker":"board";return u`
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
    `}function l(){le(i(),t)}return l(),s=e.subscribe(()=>l()),{destroy(){s&&(s(),s=null),le(u``,t)}}}var Ro=["bug","feature","task","epic","chore"];function Lo(t){switch((t||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var Io=["Critical","High","Medium","Low","Backlog"];function Do(t,e){let r=document.createElement("dialog");r.id="new-issue-dialog",r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true"),r.innerHTML=`
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
  `,t.appendChild(r);let n=r.querySelector("#new-issue-form"),s=r.querySelector("#new-title"),o=r.querySelector("#new-type"),i=r.querySelector("#new-priority"),l=r.querySelector("#new-labels"),a=r.querySelector("#new-description"),c=r.querySelector("#new-issue-error"),f=r.querySelector("#btn-cancel"),g=r.querySelector("#btn-create"),w=r.querySelector(".new-issue__close");function $(){o.replaceChildren();let E=document.createElement("option");E.value="",E.textContent="\u2014 Select \u2014",o.appendChild(E);for(let C of Ro){let x=document.createElement("option");x.value=C,x.textContent=Lo(C),o.appendChild(x)}i.replaceChildren();for(let C=0;C<=4;C+=1){let x=document.createElement("option");x.value=String(C);let _=Io[C]||"Medium";x.textContent=`${C} \u2013 ${_}`,i.appendChild(x)}}$();function v(){try{typeof r.close=="function"?r.close():r.removeAttribute("open")}catch{r.removeAttribute("open")}}function L(E){s.disabled=E,o.disabled=E,i.disabled=E,l.disabled=E,a.disabled=E,f.disabled=E,g.disabled=E,g.textContent=E?"Creating\u2026":"Create"}function N(){c.textContent=""}function B(E){c.textContent=E}function U(){try{let E=window.localStorage.getItem("beads-ui.new.type");E?o.value=E:o.value="";let C=window.localStorage.getItem("beads-ui.new.priority");C&&/^\d$/.test(C)?i.value=C:i.value="2"}catch{o.value="",i.value="2"}}function H(){let E=o.value||"",C=i.value||"";E.length>0&&window.localStorage.setItem("beads-ui.new.type",E),C.length>0&&window.localStorage.setItem("beads-ui.new.priority",C)}async function P(){N();let E=String(s.value||"").trim();if(E.length===0){B("Title is required"),s.focus();return}let C=Number(i.value||"2");if(!(C>=0&&C<=4)){B("Priority must be 0..4"),i.focus();return}let x=String(o.value||""),_=String(a.value||""),O={title:E};x.length>0&&(O.type=x),String(C).length>0&&(O.priority=C),_.length>0&&(O.description=_),L(!0);try{await e("create-issue",O)}catch{L(!1),B("Failed to create issue");return}H(),L(!1),v()}return r.addEventListener("cancel",E=>{E.preventDefault(),v()}),w.addEventListener("click",()=>v()),f.addEventListener("click",()=>v()),r.addEventListener("keydown",E=>{E.key==="Enter"&&(E.ctrlKey||E.metaKey)&&(E.preventDefault(),P())}),n.addEventListener("submit",E=>{E.preventDefault(),P()}),{open(){n.reset(),N(),U();try{"showModal"in r&&typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")}catch{r.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){v()}}}function Oo(t){if(typeof t!="number"||!Number.isFinite(t)||t<=0)return"";if(t<6e4)return`${Math.round(t/1e3)}\uCD08`;let e=t/6e4;return`${Number.isInteger(e)?e:Math.round(e*10)/10}\uBD84`}function Mo(t){return Array.isArray(t)?t.filter(e=>typeof e=="string").join(" "):""}var gl={deployed:{modifier:"ok",label:"\uC131\uACF5"},launched:{modifier:"launched",label:"\uBC1C\uC0AC\uB428"},failed:{modifier:"fail",label:"\uC2E4\uD328"}},ml=[{key:"orchestration_model",values:()=>un},{key:"orchestration_effort",values:()=>pn},{key:"review_model",values:()=>fn},{key:"impl_model",values:()=>hn}];function No(t,e){let{queueStore:r,transport:n,getWorkspacePath:s}=e,o=document.createElement("dialog");o.id="worker-exec-defaults-dialog",o.className="exec-defaults",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),t.appendChild(o);function i(){return r&&r.get()||{revision:0,exec_defaults:{}}}function l(){let _=i();return typeof _.revision=="number"?_.revision:0}function a(){let _=i().exec_defaults;return _&&typeof _=="object"?_:{}}function c(_){_&&_.queue&&r&&r.set(_.queue)}async function f(_,O){if(!n)return;let F={key:_,value:O||null};try{let G=await n("worker-queue-set-exec-default",{...F,expected_revision:l()});c(G),G&&G.conflict&&(G=await n("worker-queue-set-exec-default",{...F,expected_revision:l()}),c(G)),G&&G.conflict&&X("\uC804\uC5ED \uC2E4\uD589 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC","error",4e3)}catch{X("\uC804\uC5ED \uC2E4\uD589 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function g(_,O,F){let G=!!F&&!O.includes(F);return u`<div class="exec-defaults__row">
      <span class="exec-defaults__k">${_}</span>
      <select
        class="exec-defaults__sel"
        aria-label=${`\uC804\uC5ED ${_}`}
        data-key=${_}
        @change=${K=>{f(_,K.target.value)}}
      >
        <option value="" ?selected=${!F}>
          ${gn[_]||"(\uAE30\uBCF8)"}
        </option>
        ${G?u`<option value=${F} ?selected=${!0}>
              ${F} (비호환)
            </option>`:""}
        ${O.map(K=>u`<option value=${K} ?selected=${F===K}>${K}</option>`)}
      </select>
    </div>`}function w(){let _=i().workspace_info;return _&&typeof _=="object"?_:{}}function $(_,O){return u`<span
      class="exec-defaults__vd-badge exec-defaults__vd-badge--${_}"
      >${O}</span
    >`}function v(_){let O=_?Mo(_.cmd):"",F=_?Oo(_.timeout_ms):"",G=!!_&&_.source==="detected";return u`<div class="exec-defaults__vd-group" data-vd="verify">
      <div class="exec-defaults__vd-label">머지 전 검증 (verify)</div>
      ${O?u`<div class="exec-defaults__vd-line">
            <span class="exec-defaults__vd-cmd">${O}</span>
            ${G?$("detected","\uC790\uB3D9\uAC10\uC9C0"):$("config","config")}
            ${F?u`<span class="exec-defaults__vd-meta"
                  >timeout ${F}</span
                >`:""}
          </div>`:u`<div class="exec-defaults__vd-line exec-defaults__vd-absent">
            검증 없음
          </div>`}
    </div>`}function L(_){let O=_?Mo(_.cmd):"",F=_?Oo(_.timeout_ms):"",G=F?`timeout ${F} \xB7 verify \uD1B5\uACFC \uC2DC\uC5D0\uB9CC \uC2E4\uD589`:"verify \uD1B5\uACFC \uC2DC\uC5D0\uB9CC \uC2E4\uD589",K=s&&s()||"<workspace \uACBD\uB85C>";return u`<div class="exec-defaults__vd-group" data-vd="deploy">
      <div class="exec-defaults__vd-label">머지 후 배포 (deploy)</div>
      ${O?u`<div class="exec-defaults__vd-line">
            <span class="exec-defaults__vd-cmd">${O}</span>
            ${$("config","config")}
            ${_.detached===!0?$("detached","detached"):""}
            <span class="exec-defaults__vd-meta">${G}</span>
          </div>`:u`<div class="exec-defaults__vd-line exec-defaults__vd-absent">
            배포 없음 —
            <span class="exec-defaults__vd-cmd"
              >[worker.deploy."${K}"]</span
            >
            섹션으로 정의
          </div>`}
    </div>`}function N(_){if(!_||typeof _!="object")return"";let O=gl[String(_.outcome)];if(!O)return"";let F=_.outcome==="failed"&&_.reason?`${O.label} \xB7 ${_.reason}`:O.label,G=[_t(_.at),typeof _.bead_id=="string"?_.bead_id:"",typeof _.base_sha=="string"?_.base_sha.slice(0,7):""].filter(K=>K.length>0).join(" \xB7 ");return u`<div class="exec-defaults__vd-group" data-vd="last-deploy">
      <div class="exec-defaults__vd-label">마지막 배포</div>
      <div class="exec-defaults__vd-line">
        ${$(O.modifier,F)}
        ${G?u`<span class="exec-defaults__vd-meta">${G}</span>`:""}
      </div>
    </div>`}function B(_){return u`<section class="exec-defaults__vd">
      <p class="exec-defaults__vd-title">
        검증·배포 설정
        <span class="exec-defaults__vd-ro"
          >읽기 전용 — config.toml에서 정의</span
        >
      </p>
      ${v(_.verify_cmd)} ${L(_.deploy_cmd)}
      ${N(_.last_deploy)}
    </section>`}function U(){let _=a();le(u`
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
            ${ml.map(O=>g(O.key,O.values(),_[O.key]||""))}
            ${B(w())}
          </div>
        </div>
      `,o)}let H=!1,P=()=>{H=!1};o.addEventListener("close",P),o.addEventListener("cancel",P);let E=null;r&&r.subscribe&&(E=r.subscribe(()=>{H&&U()}));function C(){H||(H=!0,U(),typeof o.showModal=="function"?o.showModal():o.setAttribute("open",""))}function x(){H&&(H=!1,typeof o.close=="function"?o.close():o.removeAttribute("open"))}return{open:C,close:x,destroy(){H=!1,o.removeEventListener("close",P),o.removeEventListener("cancel",P),E&&(E(),E=null),o.remove()}}}var _l="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function zt(t){return typeof t=="number"&&Number.isFinite(t)?t:0}function bl(t){return!t||typeof t!="object"?!1:typeof t.input_tokens=="number"||typeof t.output_tokens=="number"}function wl(t){return t>=1e6?`${(t/1e6).toFixed(1)}M`:t>=1e3?`${(t/1e3).toFixed(1)}k`:String(t)}function Ht(t){if(!bl(t))return null;let e=zt(t?.input_tokens)+zt(t?.output_tokens);return`\u03C4 ${wl(e)}`}function Fr(t){if(!t||typeof t!="object")return"";let e=[`\uC785\uB825 ${zt(t.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${zt(t.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${zt(t.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${zt(t.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&e.push(`$${t.total_cost_usd.toFixed(2)}`);let r=e.join(" \xB7 ");return t.replayed?`${r}
${_l}`:r}function Pn(t,e){let r=null;for(let n of Object.values(t||{}))n&&n.bead_id===e&&(r=n.usage||null);return r}function Fn(t){let e=t.draggable&&!t.done,r=Array.isArray(t.badges)?t.badges:[],n=Ht(t.usage),s=t.merge_step||null,o=t.lane==="pr_wait",i=e?u`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",l=u`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${t.id}</span
  >`,a=u`<span class="worker-mini__title">${t.title}</span>`,c=t.pr_url&&t.pr_number?u`<a
          class="worker-mini__pr"
          href=${t.pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="PR 열기"
          >#${t.pr_number} ↗</a
        >`:"",f=r.map(B=>B===t.live_badge?u`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${B}</span
        >`:u`<span
          class="worker-mini__badge${t.alert?" worker-mini__badge--alert":""}"
          >${B}</span
        >`),g=t.reason?u`<span class="worker-mini__reason">${t.reason}</span>`:"",w=n?u`<span class="worker-usage" title=${Fr(t.usage)}
        >${n}</span
      >`:"",$=s?u`<span class="merge-step"
        >${s.label}<span class="merge-step__n"
          >${s.index}/${s.total}</span
        ></span
      >`:"",v=t.merge_action?u`<button
        type="button"
        class="worker-mini__merge"
        data-bead-id=${t.id}
        ?disabled=${t.merge_enabled===!1}
        title=${t.merge_title||""}
      >
        ${t.merge_label||"\uBA38\uC9C0"}
      </button>`:"",L=t.discard_action?u`<button
        type="button"
        class="worker-mini__discard"
        data-bead-id=${t.id}
        ?disabled=${t.discard_enabled===!1}
        title=${t.discard_enabled===!1?t.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
      >
        폐기
      </button>`:"",N=!!(n||s||t.merge_action||t.discard_action);return u`<div
    class="worker-mini${o?" worker-mini--card":""}${e?"":" worker-mini--static"}${t.done?" worker-mini--done":""}${s?" worker-mini--merging":""}"
    style=${s?`--progress: ${s.percent}%`:""}
    draggable=${e?"true":"false"}
    data-bead-id=${t.id}
    data-lane=${t.lane}
  >
    ${o?u`<div class="worker-mini__head">
            ${i}${l}${c}${f}${g}
          </div>
          <div class="worker-mini__body">${a}</div>
          ${N?u`<div class="worker-mini__foot">
                ${w}${$}
                <span class="worker-mini__actions"
                  >${v}${L}</span
                >
              </div>`:""}`:u`${i}${l}${a}${c}${f}${g}${w}${$}${v}${L}`}
  </div>`}function kl(t){let e=t.draggable&&!t.done,r=t.workflow,n=r&&r.chips||{},s=n.route||r&&r.route,o=n.route_source==="derived"||!!(r&&r.route_source==="derived"),i=typeof t.reason=="string"&&t.reason.startsWith("\u26D4");return u`<div
    class="worker-card${e?"":" worker-card--static"}"
    draggable=${e?"true":"false"}
    data-bead-id=${t.id}
    data-lane=${t.lane}
  >
    <div class="worker-card__head">
      ${e?u`<span class="worker-card__grip" aria-hidden="true">⠿</span>`:""}
      <span class="worker-card__id" title="클릭하면 ID 복사">${t.id}</span>
      ${r&&s?u`<span
            class="ctl-chip ctl-chip--route${o?" is-derived":""}"
            title=${o?"route \uCD94\uB860\uAC12 (metadata \uBBF8\uD540)":"route"}
            >${o?`${s} ?`:s}</span
          >`:""}
    </div>
    <div class="worker-card__title">${t.title}</div>
    ${r?xr(r,t.status):""}
    <div
      class="worker-card__foot${t.reason?"":" worker-card__foot--actions-only"}"
    >
      ${t.reason?u`<span
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
  </div>`}function wt(t){let e=!!t.collapsible&&!!t.collapsed,r=u`<span
      class="worker-pane__dot worker-pane__dot--${t.lane}"
      aria-hidden="true"
    ></span>
    <span class="worker-pane__title">${t.title}</span>
    ${e&&t.preview?u`<span class="worker-pane__preview">${t.preview}</span>`:""}
    <span class="worker-pane__count">${t.items.length}</span>`;return u`<section
    class="worker-pane worker-pane--lane-${t.lane}${t.src?" worker-pane--src":""}${t.live?" worker-pane--live":""}${t.collapsible?" worker-pane--collapsible":""}${e?" worker-pane--collapsed":""}"
    id=${t.id}
    data-lane=${t.lane}
  >
    ${t.collapsible?u`<button
          type="button"
          class="worker-pane__hd worker-pane__hd--toggle"
          data-lane=${t.lane}
          aria-expanded=${e?"false":"true"}
        >
          ${r}
          <span class="worker-pane__caret" aria-hidden="true"
            >${e?"\u25B8":"\u25BE"}</span
          >
        </button>`:u`<header class="worker-pane__hd">
          ${r}${t.header_control?t.header_control:""}
        </header>`}
    ${e?"":u`${t.controls?t.controls:""}
          <div class="worker-pane__body">
            ${t.body?t.body:t.items.length===0?u`<div class="worker-pane__empty">
                    ${t.empty||""}
                  </div>`:t.items.map(n=>t.lane==="candidate"?kl(n):Fn(n))}
          </div>`}
  </section>`}var Po=160;function Fo(t){return t.length>Po?`${t.slice(0,Po)}\u2026`:t}function yl(t){return!t||!t.reason?"":u`<div class="worker-banner__detail">
    가드:
    ${t.reason}${t.command?u` · <code>${Fo(t.command)}</code>`:""}
  </div>`}function vl(t){return t?u`<details class="worker-banner__tail">
    <summary>출력 tail</summary>
    <pre>${t}</pre>
  </details>`:""}function $l(t){if(!Number.isFinite(t)||t<0)return"0s";let e=Math.floor(t/1e3),r=Math.floor(e/60),n=e%60;return r>0?`${r}m ${String(n).padStart(2,"0")}s`:`${n}s`}function Bo(t){let e=Array.isArray(t.cleanupFailures)?t.cleanupFailures:[];return u`<div class="worker-banners">
    ${t.failure?u`<div class="worker-banner worker-banner--failure" role="alert">
          ⛔ ${t.failure.repo||"repo"} 세션 실패 —
          ${t.failure.reason||""}. 자동 진행을 껐습니다, 수동 ▶ 필요.
          ${t.failure.resume_attempt_id?u`<button
                type="button"
                class="worker-banner__resume"
                data-attempt-id=${t.failure.resume_attempt_id}
                ?disabled=${!t.failure.resume_eligible}
                title=${t.failure.resume_eligible?"\uCD5C\uADFC \uC2E4\uD328 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":t.failure.resume_reason||"\uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}
              >
                ↻ 이어하기
              </button>`:""}
          ${t.failure.resume_attempt_id?u`<button
                type="button"
                class="worker-banner__dismiss"
                data-attempt-id=${t.failure.resume_attempt_id}
                title="이 실패를 처리 완료로 표시하고 배너를 닫습니다"
                aria-label="배너 닫기"
              >
                ✕
              </button>`:""}
          ${yl(t.failure.cause_detail)}
        </div>`:""}
    ${e.map(r=>u`<div
          class="worker-banner worker-banner--cleanup"
          role="alert"
          data-bead-id=${r.bead_id}
        >
          ⚠ ${r.bead_id} 머지 완료 — 머지 후 정리가 <b>${r.step}</b> 단계에서
          멈췄습니다 (${r.reason}). bead는 resolved로 남아 있고 자동 재시도는
          하지 않습니다 — 정리를 사람이 마무리하세요.
          ${r.detail?u`<div class="worker-banner__detail">
                <code>${Fo(r.detail)}</code>
              </div>`:""}
          ${vl(r.output_tail)}
        </div>`)}
  </div>`}function xl(t,e,r=null){let n=!!t.paused,s=n?"\uC77C\uC2DC\uC815\uC9C0":typeof t.started_at=="number"?$l(e-t.started_at):"\u2014",o=[t.runner,t.model].filter(Boolean).join(" \xB7 "),i=Ht(t.usage),l=t.conflict_resolution?n?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,a=t.attempt_id&&t.attempt_id===r;return u`<div
    class="rtile${a?" rtile--sel":""}${n?" rtile--paused":""}"
    data-bead-id=${t.bead_id}
    data-attempt-id=${t.attempt_id||""}
  >
    <div class="rtile__hd">
      <span class="rtile__dot" aria-hidden="true"></span>
      <span class="rtile__id" title="클릭하면 ID 복사">${t.bead_id}</span>
      ${t.resumed_from?u`<span
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
      ${n?u`<button
            type="button"
            class="rtile__resume"
            title="같은 세션으로 이어서 재개"
            aria-label="재개"
          >
            ▶
          </button>`:u`<button
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
    ${o||i||l?u`<div class="rtile__meta">
          ${l?u`<span class="worker-mini__badge">${l}</span>`:""}
          ${o?u`<span class="rtile__runner">${o}</span>`:""}
          ${i?u`<span class="worker-usage" title=${Fr(t.usage)}
                >${i}</span
              >`:""}
        </div>`:""}
    <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일): 큐
         스냅샷에는 페이즈명도 진행률도 없으므로 진행 바는 만들지 않는다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
    ${n?"":u`<div class="rtile__accent" aria-hidden="true"></div>`}
  </div>`}function Bn(t,e=Date.now(),r=null){let n=Array.isArray(t)?t:[];return u`<div class="worker-rungrid" id="worker-rungrid">
    ${n.length===0?u`<div class="worker-rungrid__empty">실행 세션 없음</div>`:n.map(s=>xl(s,e,r))}
  </div>`}var Sl="tab:worker:ready",Tl="tab:worker:blocked",Br=1;function zn(t){let e=t&&t.metadata;return!!(e&&typeof e=="object"&&e.spec_id)}var Uo="beads-ui.worker.candidate-filter",qn={show_blocked:!1,spec:"all"};function Al(){try{let t=window.localStorage.getItem(Uo);if(!t)return{...qn};let e=JSON.parse(t);if(!e||typeof e!="object")return{...qn};let r=e.spec;return{show_blocked:e.show_blocked===!0,spec:r==="with"||r==="without"?r:"all"}}catch{return{...qn}}}function El(t){try{window.localStorage.setItem(Uo,JSON.stringify(t))}catch{}}function Cl(t,e){let r=l=>e.show_blocked||!l.blocked,n=l=>e.spec==="all"||(e.spec==="with"?l.has_spec:!l.has_spec),s=[],o=0,i=0;for(let l of t){let a=r(l),c=n(l);a&&c?s.push(l):!a&&c?o+=1:a&&!c&&(i+=1)}return{visible:s,hidden_blocked:o,hidden_spec:i}}var Rl=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],zo="bdui.worker.candidate_sort",Ll=[{value:"spec",label:"spec \uC6B0\uC120"},{value:"board",label:"Board \uC21C\uC11C"},{value:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131\uC21C"}],qr="spec";function Il(){try{let t=window.localStorage.getItem(zo);return t==="board"||t==="created"||t==="spec"?t:qr}catch{return qr}}function Dl(t){try{window.localStorage.setItem(zo,t)}catch{}}var Ol="(max-width: 640px)",Ho="beads-ui.worker.lane-collapsed",pr={queue:!0,done:!0};function Ml(){try{let t=window.localStorage.getItem(Ho);if(!t)return{...pr};let e=JSON.parse(t);return!e||typeof e!="object"?{...pr}:{queue:typeof e.queue=="boolean"?e.queue:pr.queue,done:typeof e.done=="boolean"?e.done:pr.done}}catch{return{...pr}}}function Nl(t){try{window.localStorage.setItem(Ho,JSON.stringify(t))}catch{}}function qo(t){let e=Array.isArray(t)&&t.length>0?t[0]:null;if(!e)return"";let r=typeof e.title=="string"?e.title:e.id||"";return r.length>22?`${r.slice(0,22)}\u2026`:r}function Pl(t,e,r){let n=Array.isArray(t)?t.slice():[];return e==="created"?n.sort(At):(n.sort(wr(r)),e==="board"?n:[...n.filter(zn),...n.filter(s=>!zn(s))])}function Fl(t){let e=t&&t.parent;return(typeof e=="string"?e.length>0:!!(e&&e.id))||/\.\d+$/.test(t&&t.id||"")}function Bl(t){let r=(Array.isArray(t?.dependencies)?t.dependencies:[]).map(n=>typeof n=="string"?n:n&&n.id).filter(Boolean);return r.length>0?`\u{1F512} ${r.join(", ")}`:"\u{1F512} blocked"}var ql=["closed_unmerged","undecidable"],Ul=[{from:"\uAD00\uCE21 \uB300\uAE30",activity:"checking",to:"\uD655\uC778\uC911"},{from:"\uB85C\uCEEC\uAC80\uC99D \uB300\uAE30",activity:"verifying",to:"\uB85C\uCEEC\uAC80\uC99D \uC2E4\uD589 \uC911"}];function zl(t,e){for(let r of Ul)if(t===r.from&&e===r.activity)return{label:r.to,live:!0};return{label:t,live:!1}}var Un=[{step:"merging",label:"\uBA38\uC9C0 \uC911"},{step:"base_sync",label:"base \uB3D9\uAE30\uD654"},{step:"post_merge_verify",label:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D"},{step:"deploy",label:"\uBC30\uD3EC"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"}];function Hl(t){if(typeof t!="string"||t.length===0)return null;let e=Un.length,r=Un.findIndex(n=>n.step===t);return r<0?{label:t,index:0,total:e,percent:0}:{label:Un[r].label,index:r+1,total:e,percent:Math.round((r+1)/e*100)}}function Wl(t,e,r,n,s=null,o=null,i=null,l=!1){let a=r[t]||null,c=a&&a.gate?a.gate:null,f=a&&a.pr?a.pr:null,g=[];l&&g.push("\uC138\uC158");let w=i?i==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":null,$=zl(l&&c&&c.tier==="closed_unmerged"?"\uB2EB\uD798":c&&c.gate_badge||"",w?null:o&&o.activity||null);w&&g.push(w),$.label&&g.push($.label),c&&c.base_badge&&c.base_badge!==c.gate_badge&&g.push(c.base_badge),n&&g.push("\uC815\uB9AC \uC2E4\uD328");let v=!!c&&c.base_badge==="\uCDA9\uB3CC",L=!!c&&c.enabled===!0,N=Hl(o&&o.merge_progress?o.merge_progress.step:null),B=!!n&&!!c&&c.tier==="merged",U=l&&!!c&&c.tier==="merged",H=l&&v;return{id:t,title:e,reason:n?"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644":"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",pr_number:f&&typeof f.number=="number"?f.number:null,pr_url:f&&typeof f.url=="string"?f.url:"",badges:g,live_badge:i==="running"?w:w?null:$.live?$.label:null,usage:s,alert:!!c&&ql.includes(c.tier)||!!n,merge_action:!0,discard_action:!l&&!n&&!(c&&c.tier==="merged"),merge_step:N,discard_enabled:!N&&!i,discard_title:i?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":void 0,merge_enabled:!N&&!i&&!H&&(L||v&&!l||B||U),merge_label:U?"\uC815\uB9AC":v&&!l&&!N&&!B?"\uCDA9\uB3CC \uD574\uC18C":void 0,merge_title:N?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${N.label}`:U?"\uBA38\uC9C0\uB428 \u2014 \uD074\uB9AD\uD558\uBA74 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC\uB97C \uC218\uD589\uD569\uB2C8\uB2E4":H?"\uC678\uBD80 PR \uCDA9\uB3CC \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694 (\uC5EC\uAE30\uC11C\uB294 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B8 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4)":i==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":i==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":B?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uCC98\uC74C\uBD80\uD130 \uB2E4\uC2DC \uC218\uD589\uD569\uB2C8\uB2E4":v?"\uCDA9\uB3CC \u2014 \uD074\uB9AD\uD558\uBA74 \uCDA9\uB3CC \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4 (\uBA38\uC9C0\uD558\uC9C0 \uC54A\uC74C)":L?`\uBA38\uC9C0 (${c.gate_badge}) \u2014 \uD074\uB9AD \uC2DC\uC810\uC5D0 \uB2E4\uC2DC \uD655\uC778\uD569\uB2C8\uB2E4`:c&&c.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${c&&c.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function Hn(t,e={}){let{transport:r,issueStores:n,queueStore:s,sessionLogStore:o,uiOrderStore:i,gotoIssue:l,getWorkspacePath:a}=e,c=n?yr(n,i):null,f=vr({transport:r,uiOrderStore:i}),g=null,w=[],$=Al(),v=Il(),L=Ml(),N=!1,B=new Set,U=[],H=document.createElement("div");H.className="worker-console";let P=document.createElement("div");P.className="worker-top";let E=document.createElement("div");E.className="worker-drawer-overlay",E.hidden=!0;let C=document.createElement("div");C.className="worker-drawer-overlay__backdrop";let x=document.createElement("div");x.className="worker-drawer-host",E.append(C,x);let _=document.createElement("div");_.className="worker-lanes-host",H.append(P,E,_),t.appendChild(H);let O=null,F=Sr(x,{transport:r,sessionLogStore:o,onClose:()=>{O=null,E.hidden=!0,de()}}),G=No(H,{queueStore:s,transport:r,getWorkspacePath:a});function K(){return s&&s.get()||{revision:0,auto_advance:!1,slots:Br,queue:[],pr_wait:[],done:[]}}function ne(){let d=K();return typeof d.revision=="number"?d.revision:0}function se(d){d&&d.queue&&s&&s.set(d.queue)}function $e(){let d=K().queue;return Array.isArray(d)?d.length:0}async function Ye(d,h){if(!r)return;let y=await r("worker-queue-place",{bead_id:d,index:h,expected_revision:ne()});se(y),y&&y.conflict&&await r("worker-queue-place",{bead_id:d,index:h,expected_revision:ne()}).then(se)}async function He(d,h){if(!r)return;let y=await r("worker-queue-reorder",{bead_id:d,to_index:h,expected_revision:ne()});se(y),y&&y.conflict&&await r("worker-queue-reorder",{bead_id:d,to_index:h,expected_revision:ne()}).then(se)}async function ke(d){if(!r)return;let h=await r("worker-queue-remove",{bead_id:d,expected_revision:ne()});se(h),h&&h.conflict&&await r("worker-queue-remove",{bead_id:d,expected_revision:ne()}).then(se)}async function xe(d){!r||!d||await r("worker-attempt-stop",{attempt_id:d})}async function Ve(d){if(!r||!d)return;let h=await r("worker-attempt-pause",{attempt_id:d});h&&h.paused===!1&&h.reason&&X(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${h.reason}`,"error",2400)}async function ce(d){if(!r||!d)return;let h=await r("worker-attempt-resume",{attempt_id:d,expected_revision:ne()});se(h),h&&h.conflict&&(h=await r("worker-attempt-resume",{attempt_id:d,expected_revision:ne()}),se(h)),h&&h.resumed===!1&&!h.conflict&&h.reason&&X(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${h.reason}`,"error",2400)}async function lt(d){if(!r||!d)return;let h=await r("worker-attempt-dismiss",{attempt_id:d,expected_revision:ne()});se(h),h&&h.conflict&&(h=await r("worker-attempt-dismiss",{attempt_id:d,expected_revision:ne()}),se(h)),h&&h.dismissed===!1&&!h.conflict&&h.reason&&X(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${h.reason}`,"error",2400)}async function pe(d){if(!r||!d)return;B.add(d),de();let h;try{h=await r("worker-pr-merge",{bead_id:d,expected_revision:ne()}),se(h),h&&h.conflict&&(h=await r("worker-pr-merge",{bead_id:d,expected_revision:ne()}),se(h))}finally{B.delete(d),de()}if(!(!h||h.conflict)){if(h.action==="conflict_resolution"){X(h.ok?"\uCDA9\uB3CC \u2014 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 (\uBA38\uC9C0\uD558\uC9C0 \uC54A\uC74C)":`\uCDA9\uB3CC \uD574\uC18C \uB514\uC2A4\uD328\uCE58 \uC2E4\uD328: ${h.reason||""}`,h.ok?"success":"error",2800);return}if(h.ok){X("\uBA38\uC9C0 + \uC815\uB9AC \uC644\uB8CC","success",2e3);return}X(h.cleanup_step?`\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uC2E4\uD328(${h.cleanup_step}): ${h.reason||""}`:`\uBA38\uC9C0 \uAC70\uBD80: ${h.reason||""}`,"error",3200)}}async function Ke(d){if(!r||!d||!(typeof globalThis.confirm!="function"||globalThis.confirm(`${d}: PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4. \uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694. \uACC4\uC18D\uD560\uAE4C\uC694?`)))return;let y=await r("worker-pr-discard",{bead_id:d,expected_revision:ne()});if(se(y),y&&y.conflict&&(y=await r("worker-pr-discard",{bead_id:d,expected_revision:ne()}),se(y)),y&&y.discarded===!0){X("\uD3D0\uAE30 \uC644\uB8CC \u2014 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB2E4\uC2DC \uC2E4\uD589\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4","success",2400);return}y&&y.discarded===!1&&!y.conflict&&X(`\uD3D0\uAE30 \uAC70\uBD80: ${y.reason||""}`,"error",2800)}async function ie(d){if(!r)return;let h=await r("worker-queue-toggle",{on:d,expected_revision:ne()});se(h),h&&h.conflict&&await r("worker-queue-toggle",{on:d,expected_revision:ne()}).then(se)}async function Ne(d){if(!r||!Number.isFinite(d))return;let h=Math.max(Br,Math.floor(d)),y=await r("worker-queue-set-slots",{slots:h,expected_revision:ne()});se(y),y&&y.conflict&&await r("worker-queue-set-slots",{slots:h,expected_revision:ne()}).then(se)}function et(){let d=K(),h=c?c.selectBoardColumn(Sl,"ready"):[],y=c?c.selectBoardColumn(Tl,"blocked"):[],m=d.bead_titles||{},S=new Map;for(let[A,q]of Object.entries(m))typeof q=="string"&&q.length>0&&S.set(A,q);for(let A of[...h,...y])S.set(A.id,A.title||A.id);let T=d.pr_wait||[],R=d.pr_observations||{},Z=d.pr_activity||{},ee=d.cleanup_failed||{},W=Object.entries(ee).map(([A,q])=>({bead_id:A,step:q&&q.step?q.step:"",reason:q&&q.reason?q.reason:"",detail:q&&typeof q.detail=="string"?q.detail:null,output_tail:q&&typeof q.output_tail=="string"&&q.output_tail?q.output_tail:void 0})),_e=d.queue||[],te=new Set([..._e.map(A=>A.bead_id),...T.map(A=>A.bead_id),...d.done.map(A=>A.bead_id)]),ge=new Set(y.map(A=>A.id)),yt=i?i.get()?.order||{}:{},rt=new Set,ft=[];for(let A of[...h,...y])te.has(A.id)||rt.has(A.id)||Fl(A)||(rt.add(A.id),ft.push(A));w=Pl(ft,v,yt);let Dt=d.admission||{},b=A=>{let q=Dt[A];if(!q)return"";if(q.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let Q=typeof q.reason=="string"?q.reason:"",Se=Q.indexOf(":");return Se>0&&Se<Q.length-1?`\u26D4 ${Q.slice(0,Se)} (${Q.slice(Se+1)})`:`\u26D4 ${Q}`},k=w.map(A=>{let q=zn(A),Q=ge.has(A.id),Se=[];Q&&Se.push(Bl(A)),q||Se.push("spec \uC5C6\uC74C");let dt=b(A.id);return dt&&Se.push(dt),{id:A.id,title:A.title||A.id,reason:Se.join(" \xB7 "),draggable:q,lane:"candidate",workflow:A.workflow,status:A.status,blocked:Q,has_spec:q}}),Y=Cl(k,$),V=Y.visible,J=(A,q)=>A.map(Q=>({id:Q.bead_id,title:S.get(Q.bead_id)||Q.bead_id,reason:q==="done"?"":b(Q.bead_id),draggable:q!=="done",done:q==="done",lane:q,usage:q==="done"?Pn(d.attempts||{},Q.bead_id):null})),fe=d.attempts?Object.values(d.attempts):[],ht=new Set;for(let A of fe)A&&typeof A.resumed_from=="string"&&A.resumed_from.length>0&&ht.add(A.resumed_from);let fr=new Map;for(let A of fe)fr.set(A.bead_id,A.attempt_id);let Qe=new Map;for(let A of fe)Qe.set(A.attempt_id,A);function ct(A){let q=new Set,Q=A;for(;Q&&!q.has(Q.attempt_id);){if(Q.conflict_resolution===!0)return!0;q.add(Q.attempt_id),Q=typeof Q.resumed_from=="string"&&Q.resumed_from.length>0&&Qe.get(Q.resumed_from)||null}return!1}let gt=[],Je=null;for(let A of fe){let q=A.status==="paused"&&!ht.has(A.attempt_id);A.status==="running"||q?gt.push({bead_id:A.bead_id,attempt_id:A.attempt_id,title:S.get(A.bead_id)||A.bead_id,runner:A.runner||null,model:A.model||null,effort:A.effort||null,started_at:typeof A.started_at=="number"?A.started_at:null,resumed_from:A.resumed_from||null,paused:q,conflict_resolution:ct(A),can_pause:typeof A.session_id=="string"&&A.session_id.length>0,usage:A.usage||null}):(A.status==="failed"||A.status==="orphaned")&&!(fr.get(A.bead_id)!==A.attempt_id)&&typeof A.dismissed_at!="number"&&(Je=A)}let Ot=null;if(Je){let A=typeof Je.session_id=="string"&&Je.session_id.length>0,q=ht.has(Je.attempt_id),Q=Je.cause_detail;Ot={repo:Je.repo||"",reason:Je.cause||Je.status,cause_detail:Q&&typeof Q.reason=="string"?{reason:Q.reason,command:typeof Q.command=="string"?Q.command:null}:null,resume_attempt_id:Je.attempt_id,resume_eligible:A&&!q,resume_reason:A?q?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}}let hr=new Set(gt.map(A=>A.bead_id)),Ge=new Map;for(let A of gt)A.conflict_resolution&&(A.paused?Ge.has(A.bead_id)||Ge.set(A.bead_id,"paused"):Ge.set(A.bead_id,"running"));let Wt=gt.filter(A=>!A.paused).length,Gt=(d.workspace_info||{}).slots,jt=typeof Gt=="number"?Gt:typeof d.slots=="number"?d.slots:Br,zr=Wt>jt,j=J(d.done,"done"),p=0,D=0,z=!1;for(let A of j){let q=A.usage;q&&typeof q=="object"&&(Number.isFinite(q.input_tokens)&&(p+=q.input_tokens,z=!0),Number.isFinite(q.output_tokens)&&(D+=q.output_tokens,z=!0))}let he=z?Ht({input_tokens:p,output_tokens:D}):null;return{queue:d,idToTitle:S,candidates:V,candidate_hidden:{blocked:Y.hidden_blocked,spec:Y.hidden_spec},running:gt,live_count:Wt,slots:jt,over_cap:zr,failure:Ot,waiting:J(_e.filter(A=>!hr.has(A.bead_id)),"queue"),pr_wait:T.map(A=>Wl(A.bead_id,S.get(A.bead_id)||A.bead_id,R,ee[A.bead_id]||null,Pn(d.attempts||{},A.bead_id),Z[A.bead_id]||(B.has(A.bead_id)?{activity:null,merge_progress:{step:"merging"}}:null),Ge.get(A.bead_id)||null,A.external===!0)),done:j,token_total:he,cleanup_failures:W}}function Te(d){let h=d.waiting.length>0?d.waiting[0].id:"\u2014",y=u`<button
      type="button"
      class="worker-play${d.queue.auto_advance?" is-active":""}"
    >
      ${d.queue.auto_advance?"\u23F8 \uC77C\uC2DC\uC815\uC9C0":"\u25B6 \uC790\uB3D9 \uC9C4\uD589"}
    </button>`,m=d.over_cap?u`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",S=u`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${d.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${d.pr_wait.length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >오늘 완료 <b>${d.done.length}</b></span
      >`,T=u`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${Br}
          step="1"
          .value=${String(d.slots)}
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
      </button>`,R=Bo({failure:d.failure,cleanupFailures:d.cleanup_failures});return N?u`<div class="worker-ribbon">
          ${y}
          <div class="worker-kpi worker-kpi--ribbon">${m}${S}</div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${T}</div>
        </div>
        ${R}`:u`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${y}${T}</div>
        <div class="worker-kpi">
          ${m}${S}
          ${d.token_total?u`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title="완료된 세션들의 토큰 합계 (입력+출력)"
                >${d.token_total}</span
              >`:""}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${h}</b></span
          >
        </div>
      </div>
      ${R}`}function Ce(d){if(d.running.length===0&&d.pr_wait.length===0)return"";let h=d.running.some(y=>!y.paused);return u`<section
      class="worker-now${h?" worker-pane--live":""}"
      id="worker-now"
    >
      <header class="worker-now__hd">
        <span
          class="worker-pane__dot worker-pane__dot--running"
          aria-hidden="true"
        ></span>
        <span class="worker-now__title">지금</span>
        <span class="worker-now__count"
          >${d.running.length+d.pr_wait.length}</span
        >
      </header>
      ${d.running.length>0?Bn(d.running,Date.now(),O):""}
      ${d.pr_wait.map(y=>Fn(y))}
    </section>`}function ye(d){let h=d.candidate_hidden;return u`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${$.show_blocked}
        />
        🔒 blocked${h.blocked>0?` ${h.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${Rl.map(y=>u`<button
              type="button"
              class="worker-filter__chip${$.spec===y.value?" is-active":""}"
              data-spec=${y.value}
              aria-pressed=${$.spec===y.value?"true":"false"}
            >
              ${y.label}
            </button>`)}
        ${h.spec>0?u`<span class="worker-filter__hidden">숨김 ${h.spec}</span>`:""}
      </div>
    </div>`}function Pe(){return u`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${v}
    >
      ${Ll.map(d=>u`<option value=${d.value} ?selected=${v===d.value}>
            ${d.label}
          </option>`)}
    </select>`}function Ze(d){let h=wt({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:d.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:Pe(),controls:ye(d)});return N?u`<div class="worker-lanes worker-lanes--mobile">
        ${Ce(d)}
        ${wt({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:d.waiting,empty:"\uB4DC\uB798\uADF8 \uB610\uB294 [\uB300\uAE30\uB85C \u21B4]\uB85C \uBC30\uCE58",collapsible:!0,collapsed:L.queue,preview:qo(d.waiting)})}
        ${h}
        ${wt({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:d.done,empty:"\uC644\uB8CC \uC5C6\uC74C",collapsible:!0,collapsed:L.done,preview:d.token_total||qo(d.done)})}
      </div>`:u`<div class="worker-lanes">
      ${h}
      ${wt({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:d.waiting,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58"})}
      ${wt({id:"worker-pane-running",lane:"running",title:`\uC2E4\uD589 \uC911 \xB7 \uC2AC\uB86F ${d.slots}`,items:d.running,live:d.running.some(y=>!y.paused),body:Bn(d.running,Date.now(),O)})}
      ${wt({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:d.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C"})}
      ${wt({id:"worker-pane-done",lane:"done",title:`\uC644\uB8CC \xB7 \uC624\uB298 ${d.done.length}`,items:d.done,empty:"\uC644\uB8CC \uC5C6\uC74C"})}
    </div>`}function Re(d){L={...L,[d]:!L[d]},Nl(L),de()}function de(){let d=et();le(Te(d),P),le(Ze(d),_)}function Le(){let d=document.querySelector(".app-header");if(!d)return;let h=()=>{let y=Math.round(d.getBoundingClientRect().height);H.style.setProperty("--worker-ribbon-top",`${y}px`)};if(h(),typeof ResizeObserver=="function"){let y=new ResizeObserver(h);y.observe(d),U.push(()=>y.disconnect())}else window.addEventListener("resize",h),U.push(()=>window.removeEventListener("resize",h))}function We(){if(typeof window.matchMedia!="function")return;let d=window.matchMedia(Ol);N=!!d.matches;let h=y=>{let m=!!(y&&typeof y.matches=="boolean"?y.matches:d.matches);m!==N&&(N=m,de())};typeof d.addEventListener=="function"?(d.addEventListener("change",h),U.push(()=>d.removeEventListener("change",h))):typeof d.addListener=="function"&&(d.addListener(h),U.push(()=>d.removeListener(h)))}function be(d){let h=d.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!h)return;let y=h.dataset.beadId||"",m=h.dataset.lane||"";g={bead_id:y,from_lane:m};try{d.dataTransfer?.setData("text/plain",y),d.dataTransfer&&(d.dataTransfer.effectAllowed="move")}catch{}}function Ae(d){let h=d.target?.closest?.(".worker-pane");if(!h)return;let y=h.dataset.lane||"";y!=="candidate"&&y!=="queue"||(d.preventDefault(),d.dataTransfer&&(d.dataTransfer.dropEffect="move"),h.classList.add("worker-pane--drag-over"))}function Fe(d){d.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function Me(d,h){let y=w.find(R=>R.id===d);if(!y)return;let m=w.filter(R=>R.id!==d),S=m.length;if(h){let R=h.dataset.beadId;if(R===d)return;let Z=m.findIndex(ee=>ee.id===R);Z>=0&&(S=Z)}let T=m.slice();T.splice(S,0,y),f.applyReorder(d,T,S)}function Xe(d){let h=d.target?.closest?.(".worker-pane");if(!h)return;d.preventDefault(),h.classList.remove("worker-pane--drag-over");let y=h.dataset.lane||"",m=g?.bead_id||d.dataTransfer?.getData("text/plain")||"",S=g?.from_lane||"";if(g=null,!m)return;let T=d.target?.closest?.(".worker-mini, .worker-card"),R=Array.from(h.querySelectorAll(".worker-mini, .worker-card")),Z=R.length;if(T){let ee=R.indexOf(T);ee>=0&&(Z=ee)}if(h.classList.contains("worker-pane--collapsed")&&(Z=$e()),y==="candidate"){if(S==="candidate"){Me(m,T);return}S==="queue"&&ke(m);return}y==="queue"&&(S==="queue"?He(m,Z):Ye(m,Z))}function tt(d){$=d,El(d),de()}function me(d){v=d==="board"||d==="created"||d==="spec"?d:qr,Dl(v),de()}function Ie(d){let h=d.target?.closest?.(".worker-filter__blocked");if(h){tt({...$,show_blocked:h.checked});return}let y=d.target?.closest?.(".worker-sort");if(y){me(y.value||qr);return}let m=d.target?.closest?.(".worker-slots__input");if(!m)return;let S=Number.parseInt(m.value,10);if(!Number.isFinite(S)){de();return}Ne(S).then(de)}function Ee(d){return d?{runner:d.runner||void 0,model:d.model||void 0,effort:d.effort||void 0,worktree:d.worktree||void 0,status:d.status||void 0,session_id:d.session_id||void 0}:{}}function De(d){let h=K(),y=h.attempts?h.attempts[d]:null;O=d,E.hidden=!1,F.open({attempt_id:d,meta:Ee(y)}),de()}function I(){if(!O)return;let d=K(),h=d.attempts?d.attempts[O]:null;if(h){F.updateMeta(Ee(h));return}F.close()}function M(d){let h=d.target;if(h?.closest?.("#worker-exec-defaults-dialog"))return;if(h?.closest?.(".worker-exec-defaults-btn")){G.open();return}let y=h?.closest?.(".worker-banner__resume");if(y){let te=y.dataset.attemptId;te&&ce(te);return}let m=h?.closest?.(".worker-banner__dismiss");if(m){let te=m.dataset.attemptId;te&&lt(te);return}if(h?.closest?.(".worker-play")){ie(!K().auto_advance);return}let S=h?.closest?.(".worker-pane__hd--toggle");if(S){let te=S.dataset.lane;(te==="queue"||te==="done")&&Re(te);return}let T=h?.closest?.(".worker-card__place");if(T){let te=T.dataset.beadId;te&&!T.disabled&&Ye(te,$e());return}let R=h?.closest?.(".worker-filter__chip");if(R){let te=R.dataset.spec;(te==="all"||te==="with"||te==="without")&&tt({...$,spec:te});return}let Z=h?.closest?.(".worker-mini__merge");if(Z){pe(Z.dataset.beadId||"");return}let ee=h?.closest?.(".worker-mini__discard");if(ee){Ke(ee.dataset.beadId||"");return}if(h?.closest?.(".worker-mini__pr"))return;if(h?.closest?.(".rtile__stop")){let ge=h?.closest?.(".rtile")?.dataset?.attemptId;ge&&xe(ge);return}if(h?.closest?.(".rtile__pause")){let ge=h?.closest?.(".rtile")?.dataset?.attemptId;ge&&Ve(ge);return}if(h?.closest?.(".rtile__resume")){let ge=h?.closest?.(".rtile")?.dataset?.attemptId;ge&&ce(ge);return}if(h?.closest?.(".rtile__session")){let ge=h?.closest?.(".rtile")?.dataset?.attemptId;ge&&De(ge);return}if(h?.closest?.(".worker-drawer-overlay__backdrop")){F.close();return}if(h?.closest?.(".worker-drawer-host"))return;let W=h?.closest?.(".rtile");if(W){if(h?.closest?.(".rtile__id")){let ge=W.dataset.beadId;ge&&Rt(ge).then(yt=>{yt?X("\uBCF5\uC0AC\uB428","success",1200):X("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let te=W.dataset.beadId;te&&l&&l(te);return}let _e=h?.closest?.(".worker-mini, .worker-card");if(_e){let te=_e.dataset.beadId;if(h?.closest?.(".worker-mini__id, .worker-card__id")){te&&Rt(te).then(ge=>{ge?X("\uBCF5\uC0AC\uB428","success",1200):X("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}te&&l&&l(te)}}return t.addEventListener("dragstart",be),t.addEventListener("dragover",Ae),t.addEventListener("dragleave",Fe),t.addEventListener("drop",Xe),t.addEventListener("click",M),t.addEventListener("change",Ie),We(),Le(),c&&U.push(c.subscribe(de)),s&&U.push(s.subscribe(()=>{de(),I()})),de(),{load(){de()},destroy(){for(let d of U.splice(0))try{d()}catch{}t.removeEventListener("dragstart",be),t.removeEventListener("dragover",Ae),t.removeEventListener("dragleave",Fe),t.removeEventListener("drop",Xe),t.removeEventListener("click",M),t.removeEventListener("change",Ie);try{F.destroy()}catch{}E.hidden=!0;try{G.destroy()}catch{}le(u``,t)}}}function Wn(t){if(!t)return"Unknown";let e=t.split("/").filter(Boolean);return e.length>0?e[e.length-1]:"Unknown"}function Wo(t,e,r,n=async()=>{},s=async()=>{}){let o=we("views:workspace-picker"),i=null,l=!1,a=!1,c=!1;async function f(C){let _=C.target.value,F=e.getState().workspace?.current?.path||"";if(_&&_!==F){o("switching workspace to %s",_),l=!0,E();try{await r(_)}catch(G){o("workspace switch failed: %o",G)}finally{l=!1,E()}}}async function g(){let C=e.getState(),x=C.workspace?.current?.path||C.workspace?.available?.[0]?.path||"";if(!(!x||a)){o("git-pulling workspace %s",x),a=!0,E();try{await n(x)}catch(_){o("workspace git pull failed: %o",_)}finally{a=!1,E()}}}function w(C){let x=C.target;x&&t.contains(x)||L()}function $(C){C.key==="Escape"&&L()}function v(){c||(c=!0,document.addEventListener("mousedown",w),document.addEventListener("keydown",$),E())}function L(){c&&(c=!1,document.removeEventListener("mousedown",w),document.removeEventListener("keydown",$),E())}function N(){c?L():v()}async function B(C){let x=C.target,_=x.value,O=x.checked;o("toggling visibility %s \u2192 %s",_,String(O));try{await s(_,O)}catch(F){o("workspace visibility toggle failed: %o",F)}}function U(C){return C?u`
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
    `:u``}function H(C,x){return u`
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
        ${c?u`
              <div
                class="workspace-picker__manage-popover"
                role="menu"
                aria-label="프로젝트 표시 선택"
              >
                ${C.map(_=>u`
                    <label
                      class="workspace-picker__manage-row"
                      title="${_.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${_.path}"
                        .checked=${!x.has(_.path)}
                        @change=${B}
                      />
                      <span class="workspace-picker__manage-name"
                        >${Wn(_.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function P(){let C=e.getState(),x=C.workspace?.current,_=C.workspace?.available||[],O=new Set(C.workspace?.hidden||[]),F=x?.path||_[0]?.path||"";if(_.length===0)return u``;let G=_.filter(K=>!O.has(K.path)||K.path===F);if(G.length<=1){let K=G[0]||_[0],ne=Wn(K.path);return u`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${K.path}"
            >${ne}</span
          >
          ${H(_,O)}
          ${U(F)}
          ${a?u`<span
                class="workspace-picker__loading"
                aria-hidden="true"
              ></span>`:""}
        </div>
      `}return u`
      <div class="workspace-picker">
        <select
          class="workspace-picker__select"
          @change=${f}
          ?disabled=${l||a}
          aria-label="Select project workspace"
        >
          ${G.map(K=>u`
              <option
                value="${K.path}"
                ?selected=${K.path===F}
                title="${K.path}"
              >
                ${Wn(K.path)}
              </option>
            `)}
        </select>
        ${H(_,O)}
        ${U(F)}
        ${l||a?u`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function E(){le(P(),t)}return E(),i=e.subscribe(()=>E()),{destroy(){i&&(i(),i=null),document.removeEventListener("mousedown",w),document.removeEventListener("keydown",$),le(u``,t)}}}var Go=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-queue-set-slots","worker-queue-set-exec-default","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-pr-merge","worker-pr-discard","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append"];function Gn(){let t=Date.now().toString(36),e=Math.random().toString(36).slice(2,8);return`${t}-${e}`}function jo(t,e,r=Gn()){return{id:r,type:t,payload:e}}function Yo(t={}){let e=we("ws"),r={initialMs:t.backoff?.initialMs??1e3,maxMs:t.backoff?.maxMs??3e4,factor:t.backoff?.factor??2,jitterRatio:t.backoff?.jitterRatio??.2},n=()=>t.url&&t.url.length>0?t.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",i=0,l=null,a=!0,c=new Map,f=[],g=new Map,w=new Set;function $(P){for(let E of Array.from(w))try{E(P)}catch{}}function v(){if(!a||l)return;o="reconnecting",e("ws reconnecting\u2026"),$(o);let P=Math.min(r.maxMs||0,(r.initialMs||0)*Math.pow(r.factor||1,i)),E=(r.jitterRatio||0)*P,C=Math.max(0,Math.round(P+(Math.random()*2-1)*E));e("ws retry in %d ms (attempt %d)",C,i+1),l=setTimeout(()=>{l=null,H()},C)}function L(P){try{s?.send(JSON.stringify(P))}catch(E){e("ws send failed",E)}}function N(){for(o="open",e("ws open"),$(o),i=0;f.length;){let P=f.shift();P&&L(P)}}function B(P){let E;try{E=JSON.parse(String(P.data))}catch{e("ws received non-JSON message");return}if(!E||typeof E.id!="string"||typeof E.type!="string"){e("ws received invalid envelope");return}if(c.has(E.id)){let x=c.get(E.id);c.delete(E.id),E.ok?x?.resolve(E.payload):x?.reject(E.error||new Error("ws error"));return}let C=g.get(E.type);if(C&&C.size>0)for(let x of Array.from(C))try{x(E.payload)}catch(_){e("ws event handler error",_)}else e("ws received unhandled message type: %s",E.type)}function U(){o="closed",e("ws closed"),$(o);for(let[P,E]of c.entries())E.reject(new Error("ws disconnected")),c.delete(P);i+=1,v()}function H(){if(!a)return;let P=n();try{s=new WebSocket(P),e("ws connecting %s",P),o="connecting",$(o),s.addEventListener("open",N),s.addEventListener("message",B),s.addEventListener("error",()=>{}),s.addEventListener("close",U)}catch(E){e("ws connect failed %o",E),v()}}return H(),{send(P,E){if(!Go.includes(P))return Promise.reject(new Error(`unknown message type: ${P}`));let C=Gn(),x=jo(P,E,C);return e("send %s id=%s",P,C),new Promise((_,O)=>{c.set(C,{resolve:_,reject:O,type:P}),s&&s.readyState===s.OPEN?L(x):(e("queue %s id=%s (state=%s)",P,C,o),f.push(x))})},on(P,E){g.has(P)||g.set(P,new Set);let C=g.get(P);return C?.add(E),()=>{C?.delete(E)}},onConnection(P){return w.add(P),()=>{w.delete(P)}},reconnect(){a=!0,l&&(clearTimeout(l),l=null),i=0,H()},close(){a=!1,l&&(clearTimeout(l),l=null);try{s?.close()}catch{}},getState(){return o}}}function Gl(){let t=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof t?.workspace_config?.default_workspace=="string"&&t.workspace_config.default_workspace.length>0?t.workspace_config.default_workspace:null}}}async function jl(t,e){try{let n=await(await fetch("/api/config")).json();t.setState({config:n})}catch(r){e("config refresh failed",r)}}var jn=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],Vo=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"]],Ko="worker:queue",Zo="ui:order",Xo="ui:display-policy",kt="tab:board:closed",Qo="beads-ui.board.closed-range";function Yl(t){let e=we("main");e("bootstrap start");let r=u`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;le(r,t);let n=document.getElementById("top-nav"),s=document.getElementById("board-root"),o=document.getElementById("worker-root"),i=document.getElementById("detail-panel");if(s&&o&&i){let _=function(b,k){let Y="Request failed",V="";if(b&&typeof b=="object"){let fe=b;if(typeof fe.message=="string"&&fe.message.length>0&&(Y=fe.message),typeof fe.details=="string")V=fe.details;else if(fe.details&&typeof fe.details=="object")try{V=JSON.stringify(fe.details,null,2)}catch{V=""}}else typeof b=="string"&&b.length>0&&(Y=b);let J=k&&k.length>0?`Failed to load ${k}`:"Request failed";x.open(J,Y,V)},ie=function(b){return`${R.getState().workspace.current?.path||""}\0${b}`},Ne=function(){He&&(He().catch(()=>{}),He=null),ke=null,xe=null},Te=function(b){Ve=b;let k=()=>{Ve!==b||R.getState().selected_id!==b||(Ve=null,et(b))};if(!pe){lt.then(k);return}k()},Ze=function(){let b=is(Pe);return b===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:b}}},Re=function(b){if(b)for(let[k,Y]of jn){if(Ce.has(k)||ye.has(k))continue;let V=k===kt?Ze():{type:Y};try{K.register(k,V)}catch(J){e("register %s store failed: %o",k,J)}ye.add(k),G.subscribeList(k,V).then(J=>{Ce.set(k,J)}).catch(J=>{e("subscribe %s failed: %o",k,J),_(J,"board")}).finally(()=>{ye.delete(k)})}else Le()},Le=function(){for(let[b]of jn){let k=Ce.get(b);k&&(k().catch(()=>{}),Ce.delete(b));try{K.unregister(b)}catch(Y){e("unregister %s failed: %o",b,Y)}}},Ae=function(b){if(!b){Fe();return}for(let[k,Y]of Vo)if(!(We.has(k)||ye.has(k))){try{K.register(k,{type:Y})}catch(V){e("register %s store failed: %o",k,V)}ye.add(k),G.subscribeList(k,{type:Y}).then(V=>{We.set(k,V)}).catch(V=>{e("subscribe %s failed: %o",k,V),_(V,"worker")}).finally(()=>{ye.delete(k)})}be||(F("subscribe-worker-queue",{id:Ko}).catch(k=>{e("subscribe-worker-queue failed: %o",k)}),be=()=>F("unsubscribe-worker-queue",{id:Ko}))},Fe=function(){for(let[b]of Vo){let k=We.get(b);k&&(k().catch(()=>{}),We.delete(b));try{K.unregister(b)}catch(Y){e("unregister %s failed: %o",b,Y)}}be&&(be().catch(()=>{}),be=null)},Xe=function(){Me||(F("subscribe-ui-order",{id:Zo}).catch(b=>{e("subscribe-ui-order failed: %o",b)}),Me=()=>F("unsubscribe-ui-order",{id:Zo}))},tt=function(){Me&&(Me().catch(()=>{}),Me=null),se.clear()},Ie=function(){me||(F("subscribe-display-policy",{id:Xo}).catch(b=>{e("subscribe-display-policy failed: %o",b)}),me=()=>F("unsubscribe-display-policy",{id:Xo}))},Ee=function(){me&&(me().catch(()=>{}),me=null),$e.clear()},y=function(b){if(!b)return"Unknown";let k=b.split("/").filter(Boolean);return k.length>0?k[k.length-1]:"Unknown"};var l=_,a=ie,c=Ne,f=Te,g=Ze,w=Re,$=Le,v=Ae,L=Fe,N=Xe,B=tt,U=Ie,H=Ee,P=y;let E=document.getElementById("header-loading"),C=Cs(E),x=Eo(t),O=Yo(),F=C.wrapSend((b,k)=>O.send(b,k)),G=vs(F),K=$s(),ne=Ss(),se=xs(),$e=as(),Ye=ls();O.on("ui-order-snapshot",b=>{let k=b;if(k&&typeof k.revision=="number")try{se.set({revision:k.revision,order:k.order&&typeof k.order=="object"?k.order:{}})}catch{}}),O.on("display-policy-snapshot",b=>{let k=b;if(k&&k.policy&&typeof k.policy=="object")try{$e.set(k.policy)}catch{}}),O.on("session-log-snapshot",b=>{let k=b;if(k&&typeof k.attempt_id=="string")try{Ye.set(k.attempt_id,Array.isArray(k.lines)?k.lines:[])}catch{}}),O.on("session-log-append",b=>{let k=b;if(k&&typeof k.attempt_id=="string")try{Ye.append(k.attempt_id,k.event)}catch{}}),O.on("snapshot",b=>{let k=b,Y=k&&typeof k.id=="string"?k.id:"",V=Y?K.getStore(Y):null;if(V&&k&&k.type==="snapshot")try{V.applyPush(k)}catch{}}),O.on("upsert",b=>{let k=b,Y=k&&typeof k.id=="string"?k.id:"",V=Y?K.getStore(Y):null;if(V&&k&&k.type==="upsert")try{V.applyPush(k)}catch{}}),O.on("delete",b=>{let k=b,Y=k&&typeof k.id=="string"?k.id:"",V=Y?K.getStore(Y):null;if(V&&k&&k.type==="delete")try{V.applyPush(k)}catch{}});let He=null,ke=null,xe=null,Ve=null,ce=()=>{},lt=new Promise(b=>{ce=()=>b(void 0)}),pe=!1,Ke=!1;async function et(b){let k=ie(b);if(k===ke||k===xe)return;xe=k;let Y=`detail:${b}`,V={type:"issue-detail",params:{id:b}};try{K.register(Y,V)}catch(J){e("register detail store failed: %o",J)}try{let J=await G.subscribeList(Y,V);if(R.getState().selected_id!==b||ie(b)!==k){await J().catch(()=>{});return}He&&await He().catch(()=>{}),He=J,ke=k}catch(J){e("detail subscribe failed: %o",J),_(J,"issue details")}finally{xe===k&&(xe=null)}}let Ce=new Map,ye=new Set,Pe=mr;try{let b=window.localStorage.getItem(Qo);en(b)&&(Pe=b)}catch{}async function de(b){if(!en(b)||b===Pe)return;Pe=b;try{window.localStorage.setItem(Qo,b)}catch{}let k=Ce.get(kt);if(!k)return;Ce.delete(kt),await k().catch(()=>{});let Y=Ze();try{K.register(kt,Y)}catch(V){e("register %s store failed: %o",kt,V)}try{let V=await G.subscribeList(kt,Y);Ce.set(kt,V)}catch(V){e("re-subscribe %s failed: %o",kt,V),_(V,"board")}}let We=new Map,be=null,Me=null,me=null;async function De(){me=null,$e.clear(),be=null;let b=R.getState().workspace.current?.path;if(b)try{await O.send("set-workspace",{path:b})}catch(k){e("workspace restore after reconnect failed: %o",k);return}Ie(),Ae(R.getState().view==="worker")}async function I(){e("clearing all subscriptions for workspace switch"),Le(),Fe(),ne.clear(),tt(),Xe(),Ee(),Ie(),Ne();let b=R.getState();if(b.selected_id)try{K.unregister(`detail:${b.selected_id}`)}catch{}let k=R.getState();Re(k.view==="board"),Ae(k.view==="worker"),k.selected_id&&Te(k.selected_id)}async function M(b){e("requesting workspace switch to %s",b),Ke=!0;try{let k=await O.send("set-workspace",{path:b});e("workspace switch result: %o",k),k&&k.workspace&&(R.setState({workspace:{current:{path:k.workspace.root_dir,database:k.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",b),k.changed&&(await I(),X("Switched to "+y(b),"success",2e3)))}catch(k){throw e("workspace switch failed: %o",k),X("Failed to switch workspace","error",3e3),k}finally{Ke=!1}}async function d(b){e("requesting workspace git pull for %s",b);try{let k=await O.send("git-pull-workspace",{});e("workspace git pull result: %o",k);let Y=k?.status;if(Y==="up_to_date"){X("Already up to date","success",2e3);return}if(Y==="stash_pop_conflict"){X("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}X("Git pulled "+y(b),"success",2e3)}catch(k){e("workspace git pull failed: %o",k);let Y=k?.code,V=k?.message;if(Y==="rebase_conflict"){X("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(Y==="rebase_conflict_abort_failed"){X("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(Y==="busy"){X("Git pull skipped: another operation is running","warning",3e3);return}let J=V?`: ${V}`:"";throw X(`Git pull failed${J}`,"error",3e3),k}}async function h(b,k){e("setting workspace visibility %s \u2192 %s",b,String(k));try{await O.send("set-workspace-visibility",{path:b,visible:k}),await m()}catch(Y){e("workspace visibility update failed: %o",Y),X("Failed to update project visibility","error",3e3)}}async function m(){try{let b=await O.send("list-workspaces",{});if(e("workspaces loaded: %o",b),b&&Array.isArray(b.workspaces)){let k=b.workspaces.map(fe=>({path:fe.path,database:fe.database,pid:fe.pid,version:fe.version})),Y=b.current?{path:b.current.root_dir,database:b.current.db_path}:null,V=Array.isArray(b.hidden)?b.hidden.filter(fe=>typeof fe=="string"):[];R.setState({workspace:{current:Y,available:k,hidden:V}});let J=window.localStorage.getItem("beads-ui.workspace");J&&(!k.some(ht=>ht.path===J)||V.includes(J)?window.localStorage.removeItem("beads-ui.workspace"):Y&&J!==Y.path&&(e("restoring saved workspace preference: %s",J),await M(J)))}}catch(b){e("failed to load workspaces: %o",b)}}O.on("workspace-changed",b=>{e("workspace-changed event: %o",b),b&&b.root_dir&&(R.setState({workspace:{current:{path:b.root_dir,database:b.db_path}}}),m(),I())});let S=!1;if(typeof O.onConnection=="function"){let b=k=>{e("ws state %s",k),k==="reconnecting"||k==="closed"?(S=!0,X("Connection lost. Reconnecting\u2026","error",4e3)):k==="open"&&S&&(S=!1,X("Reconnected","success",2200),jl(R,(Y,V)=>{e(`${Y}: %o`,V)}),De())};O.onConnection(b)}let T="board";try{let b=window.localStorage.getItem("beads-ui.view");(b==="board"||b==="worker")&&(T=b)}catch(b){e("view parse error: %o",b)}let R=Es({config:Gl(),view:T});O.on("worker-queue-snapshot",b=>{let k=b;if(!k||!k.queue)return;let Y=R.getState().workspace.current?.path;if(typeof Y=="string"&&Y.length>0&&k.root_dir!==Y){e("dropping worker-queue snapshot for %s",String(k.root_dir));return}try{ne.set(k.queue)}catch{}});let Z=Ts(R);Z.start();let ee=async(b,k)=>{try{return await F(b,k)}catch{return[]}};n&&Co(n,R,Z);let W=document.getElementById("workspace-picker");W&&Wo(W,R,M,d,h);let _e=Do(t,(b,k)=>F(b,k));try{let b=document.getElementById("new-issue-btn");b&&b.addEventListener("click",()=>_e.open())}catch{}let te=Ao(t,{policyStore:$e,transport:(b,k)=>F(b,k),labelOptions:()=>{let b=new Set;for(let[k]of jn)for(let Y of K.snapshotFor(k)||[]){let V=Y.labels;if(Array.isArray(V))for(let J of V)typeof J=="string"&&J.length>0&&b.add(J)}return Array.from(b).sort()}});try{let b=document.getElementById("display-settings-btn");b&&b.addEventListener("click",()=>te.open())}catch{}let ge=Ns(s,{gotoIssue:b=>Z.gotoIssue(b),issueStores:K,transport:ee,uiOrderStore:se,displayPolicyStore:$e,closedRange:Pe,onClosedRangeChange:b=>{de(b)},onNewIssue:()=>_e.open()}),yt=Hn(o,{transport:ee,issueStores:K,queueStore:ne,sessionLogStore:Ye,uiOrderStore:se,gotoIssue:b=>R.setState({selected_id:b}),getWorkspacePath:()=>R.getState().workspace.current?.path}),rt=So(i,{issueStores:K,transport:ee,queueStore:ne,sessionLogStore:Ye,getWorkspacePath:()=>R.getState().workspace.current?.path,onNavigate:b=>{R.getState().view==="worker"?R.setState({selected_id:b}):Z.gotoIssue(b)},onClose:()=>{let b=R.getState();R.setState({selected_id:null});try{Z.gotoView(b.view==="worker"?"worker":"board")}catch{}}}),ft=R.getState().selected_id;ft&&(i.hidden=!1,rt.load(ft),Te(ft)),R.subscribe(b=>{let k=b.selected_id;k?(i.hidden=!1,rt.load(k),Ke||Te(k)):(rt.clear(),i.hidden=!0,Ne())});let Dt=b=>{s.hidden=b.view!=="board",o.hidden=b.view!=="worker",Re(b.view==="board"),Ae(b.view==="worker"),!b.selected_id&&b.view==="board"&&ge.load(),b.view==="worker"&&yt.load(),window.localStorage.setItem("beads-ui.view",b.view)};R.subscribe(Dt),Dt(R.getState()),Xe(),Ie(),m().finally(()=>{pe=!0,ce()}),window.addEventListener("keydown",b=>{let k=b.ctrlKey||b.metaKey,Y=String(b.key||"").toLowerCase(),V=b.target,J=V&&V.tagName?String(V.tagName).toLowerCase():"",fe=J==="input"||J==="textarea"||J==="select"||V&&typeof V.isContentEditable=="boolean"&&V.isContentEditable;k&&Y==="n"&&(fe||(b.preventDefault(),_e.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let r=window.localStorage.getItem("beads-ui.theme"),n=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=r==="dark"||r==="light"?r:n?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let t=document.getElementById("theme-switch");t&&t.addEventListener("change",()=>{let r=t.checked?"dark":"light";document.documentElement.setAttribute("data-theme",r),window.localStorage.setItem("beads-ui.theme",r)});let e=document.getElementById("app");e&&Yl(e)});export{Yl as bootstrap,Gl as readBootstrapConfig,jl as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
