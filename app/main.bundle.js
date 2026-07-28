var Jo=Object.create;var Gr=Object.defineProperty;var ei=Object.getOwnPropertyDescriptor;var ti=Object.getOwnPropertyNames;var ri=Object.getPrototypeOf,ni=Object.prototype.hasOwnProperty;var si=(t,e,r)=>e in t?Gr(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r;var jr=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports);var oi=(t,e,r,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of ti(e))!ni.call(t,s)&&s!==r&&Gr(t,s,{get:()=>e[s],enumerable:!(n=ei(e,s))||n.enumerable});return t};var ii=(t,e,r)=>(r=t!=null?Jo(ri(t)):{},oi(e||!t||!t.__esModule?Gr(r,"default",{value:t,enumerable:!0}):r,t));var pe=(t,e,r)=>si(t,typeof e!="symbol"?e+"":e,r);var ds=jr((rc,cs)=>{var Pt=1e3,Ft=Pt*60,Bt=Ft*60,At=Bt*24,ui=At*7,pi=At*365.25;cs.exports=function(t,e){e=e||{};var r=typeof t;if(r==="string"&&t.length>0)return fi(t);if(r==="number"&&isFinite(t))return e.long?gi(t):hi(t);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(t))};function fi(t){if(t=String(t),!(t.length>100)){var e=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(t);if(e){var r=parseFloat(e[1]),n=(e[2]||"ms").toLowerCase();switch(n){case"years":case"year":case"yrs":case"yr":case"y":return r*pi;case"weeks":case"week":case"w":return r*ui;case"days":case"day":case"d":return r*At;case"hours":case"hour":case"hrs":case"hr":case"h":return r*Bt;case"minutes":case"minute":case"mins":case"min":case"m":return r*Ft;case"seconds":case"second":case"secs":case"sec":case"s":return r*Pt;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r;default:return}}}}function hi(t){var e=Math.abs(t);return e>=At?Math.round(t/At)+"d":e>=Bt?Math.round(t/Bt)+"h":e>=Ft?Math.round(t/Ft)+"m":e>=Pt?Math.round(t/Pt)+"s":t+"ms"}function gi(t){var e=Math.abs(t);return e>=At?kr(t,e,At,"day"):e>=Bt?kr(t,e,Bt,"hour"):e>=Ft?kr(t,e,Ft,"minute"):e>=Pt?kr(t,e,Pt,"second"):t+" ms"}function kr(t,e,r,n){var s=e>=r*1.5;return Math.round(t/r)+" "+n+(s?"s":"")}});var ps=jr((nc,us)=>{function mi(t){r.debug=r,r.default=r,r.coerce=a,r.disable=i,r.enable=s,r.enabled=l,r.humanize=ds(),r.destroy=c,Object.keys(t).forEach(g=>{r[g]=t[g]}),r.names=[],r.skips=[],r.formatters={};function e(g){let m=0;for(let w=0;w<g.length;w++)m=(m<<5)-m+g.charCodeAt(w),m|=0;return r.colors[Math.abs(m)%r.colors.length]}r.selectColor=e;function r(g){let m,w=null,$,v;function C(...N){if(!C.enabled)return;let F=C,B=Number(new Date),U=B-(m||B);F.diff=U,F.prev=m,F.curr=B,m=B,N[0]=r.coerce(N[0]),typeof N[0]!="string"&&N.unshift("%O");let O=0;N[0]=N[0].replace(/%([a-zA-Z%])/g,(T,x)=>{if(T==="%%")return"%";O++;let b=r.formatters[x];if(typeof b=="function"){let M=N[O];T=b.call(F,M),N.splice(O,1),O--}return T}),r.formatArgs.call(F,N),(F.log||r.log).apply(F,N)}return C.namespace=g,C.useColors=r.useColors(),C.color=r.selectColor(g),C.extend=n,C.destroy=r.destroy,Object.defineProperty(C,"enabled",{enumerable:!0,configurable:!1,get:()=>w!==null?w:($!==r.namespaces&&($=r.namespaces,v=r.enabled(g)),v),set:N=>{w=N}}),typeof r.init=="function"&&r.init(C),C}function n(g,m){let w=r(this.namespace+(typeof m>"u"?":":m)+g);return w.log=this.log,w}function s(g){r.save(g),r.namespaces=g,r.names=[],r.skips=[];let m=(typeof g=="string"?g:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let w of m)w[0]==="-"?r.skips.push(w.slice(1)):r.names.push(w)}function o(g,m){let w=0,$=0,v=-1,C=0;for(;w<g.length;)if($<m.length&&(m[$]===g[w]||m[$]==="*"))m[$]==="*"?(v=$,C=w,$++):(w++,$++);else if(v!==-1)$=v+1,C++,w=C;else return!1;for(;$<m.length&&m[$]==="*";)$++;return $===m.length}function i(){let g=[...r.names,...r.skips.map(m=>"-"+m)].join(",");return r.enable(""),g}function l(g){for(let m of r.skips)if(o(g,m))return!1;for(let m of r.names)if(o(g,m))return!0;return!1}function a(g){return g instanceof Error?g.stack||g.message:g}function c(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return r.enable(r.load()),r}us.exports=mi});var fs=jr((Xe,yr)=>{Xe.formatArgs=bi;Xe.save=wi;Xe.load=ki;Xe.useColors=_i;Xe.storage=yi();Xe.destroy=(()=>{let t=!1;return()=>{t||(t=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();Xe.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function _i(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let t;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(t=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(t[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function bi(t){if(t[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+t[0]+(this.useColors?"%c ":" ")+"+"+yr.exports.humanize(this.diff),!this.useColors)return;let e="color: "+this.color;t.splice(1,0,e,"color: inherit");let r=0,n=0;t[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(r++,s==="%c"&&(n=r))}),t.splice(n,0,e)}Xe.log=console.debug||console.log||(()=>{});function wi(t){try{t?Xe.storage.setItem("debug",t):Xe.storage.removeItem("debug")}catch{}}function ki(){let t;try{t=Xe.storage.getItem("debug")||Xe.storage.getItem("DEBUG")}catch{}return!t&&typeof process<"u"&&"env"in process&&(t=process.env.DEBUG),t}function yi(){try{return localStorage}catch{}}yr.exports=ps()(Xe);var{formatters:vi}=yr.exports;vi.j=function(t){try{return JSON.stringify(t)}catch(e){return"[UnexpectedJSONParseError]: "+e.message}}});var Zt=globalThis,br=Zt.trustedTypes,Kn=br?br.createPolicy("lit-html",{createHTML:t=>t}):void 0,ts="$lit$",_t=`lit$${Math.random().toFixed(9).slice(2)}$`,rs="?"+_t,ai=`<${rs}>`,St=document,Xt=()=>St.createComment(""),Qt=t=>t===null||typeof t!="object"&&typeof t!="function",Jr=Array.isArray,li=t=>Jr(t)||typeof t?.[Symbol.iterator]=="function",Yr=`[ 	
\f\r]`,Kt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Zn=/-->/g,Xn=/>/g,$t=RegExp(`>|${Yr}(?:([^\\s"'>=/]+)(${Yr}*=${Yr}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Qn=/'/g,Jn=/"/g,ns=/^(?:script|style|textarea|title)$/i,en=t=>(e,...r)=>({_$litType$:t,strings:e,values:r}),p=en(1),Zl=en(2),Xl=en(3),Tt=Symbol.for("lit-noChange"),Se=Symbol.for("lit-nothing"),es=new WeakMap,xt=St.createTreeWalker(St,129);function ss(t,e){if(!Jr(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return Kn!==void 0?Kn.createHTML(e):e}var ci=(t,e)=>{let r=t.length-1,n=[],s,o=e===2?"<svg>":e===3?"<math>":"",i=Kt;for(let l=0;l<r;l++){let a=t[l],c,g,m=-1,w=0;for(;w<a.length&&(i.lastIndex=w,g=i.exec(a),g!==null);)w=i.lastIndex,i===Kt?g[1]==="!--"?i=Zn:g[1]!==void 0?i=Xn:g[2]!==void 0?(ns.test(g[2])&&(s=RegExp("</"+g[2],"g")),i=$t):g[3]!==void 0&&(i=$t):i===$t?g[0]===">"?(i=s??Kt,m=-1):g[1]===void 0?m=-2:(m=i.lastIndex-g[2].length,c=g[1],i=g[3]===void 0?$t:g[3]==='"'?Jn:Qn):i===Jn||i===Qn?i=$t:i===Zn||i===Xn?i=Kt:(i=$t,s=void 0);let $=i===$t&&t[l+1].startsWith("/>")?" ":"";o+=i===Kt?a+ai:m>=0?(n.push(c),a.slice(0,m)+ts+a.slice(m)+_t+$):a+_t+(m===-2?l:$)}return[ss(t,o+(t[r]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),n]},Jt=class t{constructor({strings:e,_$litType$:r},n){let s;this.parts=[];let o=0,i=0,l=e.length-1,a=this.parts,[c,g]=ci(e,r);if(this.el=t.createElement(c,n),xt.currentNode=this.el.content,r===2||r===3){let m=this.el.content.firstChild;m.replaceWith(...m.childNodes)}for(;(s=xt.nextNode())!==null&&a.length<l;){if(s.nodeType===1){if(s.hasAttributes())for(let m of s.getAttributeNames())if(m.endsWith(ts)){let w=g[i++],$=s.getAttribute(m).split(_t),v=/([.?@])?(.*)/.exec(w);a.push({type:1,index:o,name:v[2],strings:$,ctor:v[1]==="."?Kr:v[1]==="?"?Zr:v[1]==="@"?Xr:Nt}),s.removeAttribute(m)}else m.startsWith(_t)&&(a.push({type:6,index:o}),s.removeAttribute(m));if(ns.test(s.tagName)){let m=s.textContent.split(_t),w=m.length-1;if(w>0){s.textContent=br?br.emptyScript:"";for(let $=0;$<w;$++)s.append(m[$],Xt()),xt.nextNode(),a.push({type:2,index:++o});s.append(m[w],Xt())}}}else if(s.nodeType===8)if(s.data===rs)a.push({type:2,index:o});else{let m=-1;for(;(m=s.data.indexOf(_t,m+1))!==-1;)a.push({type:7,index:o}),m+=_t.length-1}o++}}static createElement(e,r){let n=St.createElement("template");return n.innerHTML=e,n}};function Mt(t,e,r=t,n){if(e===Tt)return e;let s=n!==void 0?r._$Co?.[n]:r._$Cl,o=Qt(e)?void 0:e._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(t),s._$AT(t,r,n)),n!==void 0?(r._$Co??(r._$Co=[]))[n]=s:r._$Cl=s),s!==void 0&&(e=Mt(t,s._$AS(t,e.values),s,n)),e}var Vr=class{constructor(e,r){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:r},parts:n}=this._$AD,s=(e?.creationScope??St).importNode(r,!0);xt.currentNode=s;let o=xt.nextNode(),i=0,l=0,a=n[0];for(;a!==void 0;){if(i===a.index){let c;a.type===2?c=new er(o,o.nextSibling,this,e):a.type===1?c=new a.ctor(o,a.name,a.strings,this,e):a.type===6&&(c=new Qr(o,this,e)),this._$AV.push(c),a=n[++l]}i!==a?.index&&(o=xt.nextNode(),i++)}return xt.currentNode=St,s}p(e){let r=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(e,n,r),r+=n.strings.length-2):n._$AI(e[r])),r++}},er=class t{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,r,n,s){this.type=2,this._$AH=Se,this._$AN=void 0,this._$AA=e,this._$AB=r,this._$AM=n,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,r=this._$AM;return r!==void 0&&e?.nodeType===11&&(e=r.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,r=this){e=Mt(this,e,r),Qt(e)?e===Se||e==null||e===""?(this._$AH!==Se&&this._$AR(),this._$AH=Se):e!==this._$AH&&e!==Tt&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):li(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==Se&&Qt(this._$AH)?this._$AA.nextSibling.data=e:this.T(St.createTextNode(e)),this._$AH=e}$(e){let{values:r,_$litType$:n}=e,s=typeof n=="number"?this._$AC(e):(n.el===void 0&&(n.el=Jt.createElement(ss(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===s)this._$AH.p(r);else{let o=new Vr(s,this),i=o.u(this.options);o.p(r),this.T(i),this._$AH=o}}_$AC(e){let r=es.get(e.strings);return r===void 0&&es.set(e.strings,r=new Jt(e)),r}k(e){Jr(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,n,s=0;for(let o of e)s===r.length?r.push(n=new t(this.O(Xt()),this.O(Xt()),this,this.options)):n=r[s],n._$AI(o),s++;s<r.length&&(this._$AR(n&&n._$AB.nextSibling,s),r.length=s)}_$AR(e=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);e!==this._$AB;){let n=e.nextSibling;e.remove(),e=n}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},Nt=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,r,n,s,o){this.type=1,this._$AH=Se,this._$AN=void 0,this.element=e,this.name=r,this._$AM=s,this.options=o,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=Se}_$AI(e,r=this,n,s){let o=this.strings,i=!1;if(o===void 0)e=Mt(this,e,r,0),i=!Qt(e)||e!==this._$AH&&e!==Tt,i&&(this._$AH=e);else{let l=e,a,c;for(e=o[0],a=0;a<o.length-1;a++)c=Mt(this,l[n+a],r,a),c===Tt&&(c=this._$AH[a]),i||(i=!Qt(c)||c!==this._$AH[a]),c===Se?e=Se:e!==Se&&(e+=(c??"")+o[a+1]),this._$AH[a]=c}i&&!s&&this.j(e)}j(e){e===Se?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},Kr=class extends Nt{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===Se?void 0:e}},Zr=class extends Nt{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==Se)}},Xr=class extends Nt{constructor(e,r,n,s,o){super(e,r,n,s,o),this.type=5}_$AI(e,r=this){if((e=Mt(this,e,r,0)??Se)===Tt)return;let n=this._$AH,s=e===Se&&n!==Se||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,o=e!==Se&&(n===Se||s);s&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},Qr=class{constructor(e,r,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=r,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){Mt(this,e)}};var di=Zt.litHtmlPolyfillSupport;di?.(Jt,er),(Zt.litHtmlVersions??(Zt.litHtmlVersions=[])).push("3.3.1");var de=(t,e,r)=>{let n=r?.renderBefore??e,s=n._$litPart$;if(s===void 0){let o=r?.renderBefore??null;n._$litPart$=s=new er(e.insertBefore(Xt(),o),o,void 0,r??{})}return s._$AI(t),s};var wr="today",os=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}];function tn(t){return t==="today"||t==="7d"||t==="30d"||t==="all"}function is(t,e=Date.now()){switch(t){case"today":{let r=new Date(e);return r.setHours(0,0,0,0),r.getTime()}case"7d":return e-7*864e5;case"30d":return e-30*864e5;case"all":default:return}}function as(){let t=null,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{get(){return t},set(n){t=n,r()},clear(){t=null,r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}function ls(){let t=new Map,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{set(n,s){t.set(n,{lines:Array.isArray(s)?[...s]:[]}),r()},append(n,s){let o=t.get(n)||{lines:[]};o.lines=[...o.lines,s],t.set(n,o),r()},get(n){return t.get(n)||null},clear(n){typeof n=="string"?t.delete(n):t.clear(),r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}var hs=ii(fs(),1);function ye(t){return(0,hs.default)(`beads-ui:${t}`)}function ct(t){if(typeof t=="number")return Number.isFinite(t)?t:0;if(typeof t=="string"){let e=Date.parse(t);return Number.isFinite(e)?e:0}return 0}function Et(t,e){let r=ct(t.created_at),n=ct(e.created_at);if(r!==n)return r<n?1:-1;let s=t.priority??2,o=e.priority??2;if(s!==o)return s-o;let i=t.id,l=e.id;return i<l?-1:i>l?1:0}function _s(t,e){let r=ct(t.created_at),n=ct(e.created_at);if(r!==n)return r<n?-1:1;let s=t.priority??2,o=e.priority??2;if(s!==o)return s-o;let i=t.id,l=e.id;return i<l?-1:i>l?1:0}function bs(t,e){let r=ct(t.updated_at),n=ct(e.updated_at);if(r!==n)return r<n?1:-1;let s=t.id,o=e.id;return s<o?-1:s>o?1:0}function ws(t,e){let r=t.priority??2,n=e.priority??2;if(r!==n)return r-n;let s=ct(t.created_at),o=ct(e.created_at);if(s!==o)return s<o?1:-1;let i=t.id,l=e.id;return i<l?-1:i>l?1:0}function ks(t,e){let r=t.closed_at??0,n=e.closed_at??0;if(r!==n)return r<n?1:-1;let s=t?.id,o=e?.id;return s<o?-1:s>o?1:0}var $i=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function gs(t){let e=t&&t.metadata,r=e?e.task_order:void 0;if(r==null||r==="")return Number.POSITIVE_INFINITY;let n=Number(r);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function ms(t){let e=t&&t.title;if(typeof e!="string")return Number.POSITIVE_INFINITY;let r=$i.exec(e);if(!r)return Number.POSITIVE_INFINITY;let n=Number(r[1]);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function ys(t,e){let r=gs(t),n=gs(e);if(r!==n)return r<n?-1:1;let s=ms(t),o=ms(e);if(s!==o)return s<o?-1:1;let i=ct(t&&t.created_at),l=ct(e&&e.created_at);if(i!==l)return i<l?-1:1;let a=t&&t.id,c=e&&e.id;return a===c?0:String(a)<String(c)?-1:1}var rn=2**20;function qt(t,e){let r=t&&t.id;return e&&typeof r=="string"&&Object.prototype.hasOwnProperty.call(e,r)&&typeof e[r]=="number"&&Number.isFinite(e[r])?e[r]:-ct(t&&t.created_at)}function vr(t){return(e,r)=>{let n=qt(e,t),s=qt(r,t);if(n!==s)return n<s?-1:1;let o=e?.id,i=r?.id;return o<i?-1:o>i?1:0}}function nn(t,e,r){let n=Array.isArray(t)?t:[],s=n.length,o=Math.max(0,Math.min(e,s-1)),i=o-1>=0?n[o-1]:null,l=o+1<s?n[o+1]:null;if(!i&&!l)return{rank:0};if(!i)return{rank:qt(l,r)-rn};if(!l)return{rank:qt(i,r)+rn};let a=qt(i,r),c=qt(l,r),g=(a+c)/2;return a<g&&g<c?{rank:g}:{renormalize:n.map((m,w)=>({bead_id:m.id,rank:w*rn}))}}function sn(t,e={}){let r=ye(`issue-store:${t}`),n=new Map,s=[],o=0,i=new Set,l=!1,a=e.sort||Et;function c(){for(let w of Array.from(i))try{w()}catch{}}function g(){s=Array.from(n.values()).sort(a)}function m(w){if(l||!w||w.id!==t)return;let $=Number(w.revision)||0;if(r("apply %s rev=%d",w.type,$),!($<=o&&w.type!=="snapshot")){if(w.type==="snapshot"){if($<=o)return;n.clear();let v=Array.isArray(w.issues)?w.issues:[];for(let C of v)C&&typeof C.id=="string"&&C.id.length>0&&n.set(C.id,C);g(),o=$,c();return}if(w.type==="upsert"){let v=w.issue;if(v&&typeof v.id=="string"&&v.id.length>0){let C=n.get(v.id);if(!C)n.set(v.id,v);else{let N=Number.isFinite(C.updated_at)?C.updated_at:0,F=Number.isFinite(v.updated_at)?v.updated_at:0;if(N<=F){for(let B of Object.keys(C))B in v||delete C[B];for(let[B,U]of Object.entries(v))C[B]=U}}g()}o=$,c()}else if(w.type==="delete"){let v=String(w.issue_id||"");v&&(n.delete(v),g()),o=$,c()}}}return{id:t,subscribe(w){return i.add(w),()=>{i.delete(w)}},applyPush:m,snapshot(){return s},size(){return n.size},getById(w){return n.get(w)},dispose(){l=!0,n.clear(),s=[],i.clear(),o=0}}}function $r(t){let e=String(t.type||"").trim(),r={};if(t.params&&typeof t.params=="object"){let s=Object.keys(t.params).sort();for(let o of s){let i=t.params[o];r[o]=String(i)}}let n=new URLSearchParams(r).toString();return n.length>0?`${e}?${n}`:e}function vs(t){let e=ye("subs"),r=new Map,n=new Map;function s(l,a){e("applyDelta %s +%d ~%d -%d",l,(a.added||[]).length,(a.updated||[]).length,(a.removed||[]).length);let c=n.get(l);if(!c||c.size===0)return;let g=Array.isArray(a.added)?a.added:[],m=Array.isArray(a.updated)?a.updated:[],w=Array.isArray(a.removed)?a.removed:[];for(let $ of Array.from(c)){let v=r.get($);if(!v)continue;let C=v.itemsById;for(let N of g)typeof N=="string"&&N.length>0&&C.set(N,!0);for(let N of m)typeof N=="string"&&N.length>0&&C.set(N,!0);for(let N of w)typeof N=="string"&&N.length>0&&C.delete(N)}}async function o(l,a){let c=$r(a);if(e("subscribe %s key=%s",l,c),!r.has(l))r.set(l,{key:c,itemsById:new Map});else{let m=r.get(l);if(m&&m.key!==c){let w=n.get(m.key);w&&(w.delete(l),w.size===0&&n.delete(m.key)),r.set(l,{key:c,itemsById:new Map})}}n.has(c)||n.set(c,new Set);let g=n.get(c);g&&g.add(l);try{await t("subscribe-list",{id:l,type:a.type,params:a.params})}catch(m){let w=r.get(l)||null;if(w){let $=n.get(w.key);$&&($.delete(l),$.size===0&&n.delete(w.key))}throw r.delete(l),m}return async()=>{e("unsubscribe %s key=%s",l,c);try{await t("unsubscribe-list",{id:l})}catch{}let m=r.get(l)||null;if(m){let w=n.get(m.key);w&&(w.delete(l),w.size===0&&n.delete(m.key))}r.delete(l)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:$r,selectors:{getIds(l){let a=r.get(l);return a?Array.from(a.itemsById.keys()):[]},has(l,a){let c=r.get(l);return c?c.itemsById.has(a):!1},count(l){let a=r.get(l);return a?a.itemsById.size:0},getItemsById(l){let a=r.get(l),c={};if(!a)return c;for(let g of a.itemsById.keys())c[g]=!0;return c}}}}function $s(){let t=ye("issue-stores"),e=new Map,r=new Map,n=new Set,s=new Map;function o(){for(let a of Array.from(n))try{a()}catch{}}function i(a,c,g){let m=c?$r(c):"",w=r.get(a)||"",$=e.has(a);if(t("register %s key=%s (prev=%s)",a,m,w),$&&w&&m&&w!==m){let v=e.get(a);if(v)try{v.dispose()}catch{}let C=s.get(a);if(C){try{C()}catch{}s.delete(a)}let N=sn(a,g);e.set(a,N);let F=N.subscribe(()=>o());s.set(a,F)}else if(!$){let v=sn(a,g);e.set(a,v);let C=v.subscribe(()=>o());s.set(a,C)}return r.set(a,m),()=>l(a)}function l(a){t("unregister %s",a),r.delete(a);let c=e.get(a);c&&(c.dispose(),e.delete(a));let g=s.get(a);if(g){try{g()}catch{}s.delete(a)}}return{register:i,unregister:l,getStore(a){return e.get(a)||null},snapshotFor(a){let c=e.get(a);return c?c.snapshot().slice():[]},subscribe(a){return n.add(a),()=>n.delete(a)}}}function xs(){let t=null,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{get(){return t},set(n){t=n,r()},clear(){t=null,r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}function Ss(){let t=null,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{get(){return t},set(n){t=n,r()},clear(){t=null,r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}function on(t,e){return`#/${t==="worker"?"worker":"board"}?issue=${encodeURIComponent(e)}`}function xi(t){let e=String(t||""),r=e.startsWith("#")?e.slice(1):e,n=r.indexOf("?"),s=n>=0?r.slice(n+1):"";if(s){let l=new URLSearchParams(s).get("issue");if(l)return decodeURIComponent(l)}let o=/^\/issue\/([^\s?#]+)/.exec(r);return o&&o[1]?decodeURIComponent(o[1]):null}function Si(t){let e=String(t||"");return/^#\/worker(\b|\/|$)/.test(e)?"worker":"board"}function Ts(t){let e=ye("router"),r=()=>{let n=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(n),o=s&&s[1]?decodeURIComponent(s[1]):xi(n),i=Si(n);if(e("hash change \u2192 view=%s id=%s",i,o),t.setState({selected_id:i==="worker"?null:o,view:i,worker:{selected_parent_id:i==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(n)){let a=o?`#/${i}?issue=${encodeURIComponent(o)}`:`#/${i}`;window.location.hash!==a&&(window.location.hash=a)}};return{start(){window.addEventListener("hashchange",r),r()},stop(){window.removeEventListener("hashchange",r)},gotoIssue(n){let o=(t.getState?t.getState():{view:"board"}).view==="worker"?"worker":"board",i=on(o,n);e("goto issue %s (view=%s)",n,o),window.location.hash!==i?window.location.hash=i:t.setState({selected_id:o==="worker"?null:n,view:o,worker:{selected_parent_id:o==="worker"?n:null}})},gotoView(n){let s=t.getState?t.getState():{selected_id:null,worker:{selected_parent_id:null}},o=n==="worker"?s.worker?.selected_parent_id:s.selected_id,i=o?on(n,o):`#/${n}`;e("goto view %s (id=%s)",n,o||""),window.location.hash!==i?window.location.hash=i:t.setState({view:n,selected_id:n==="worker"?null:s.selected_id})}}}var Ti=Object.freeze({workspace_config:{default_workspace:null}});function As(t){return{workspace_config:{default_workspace:typeof t?.workspace_config?.default_workspace=="string"&&t.workspace_config.default_workspace.length>0?t.workspace_config.default_workspace:Ti.workspace_config.default_workspace}}}function Es(t={}){let e=ye("state"),r={selected_id:t.selected_id??null,view:t.view??"board",filters:{status:t.filters?.status??"all",search:t.filters?.search??"",type:typeof t.filters?.type=="string"?t.filters?.type:""},board:{closed_filter:t.board?.closed_filter==="3"||t.board?.closed_filter==="7"||t.board?.closed_filter==="today"?t.board?.closed_filter:"today",show_deferred_column:t.board?.show_deferred_column===!0},worker:{selected_parent_id:t.worker?.selected_parent_id??null,show_closed_children:Array.isArray(t.worker?.show_closed_children)?t.worker.show_closed_children:[]},workspace:{current:t.workspace?.current??null,available:t.workspace?.available??[],hidden:t.workspace?.hidden??[]},config:As(t.config)},n=new Set;function s(){for(let o of Array.from(n))try{o(r)}catch{}}return{getState(){return r},setState(o){let i={...r,...o,filters:{...r.filters,...o.filters||{}},board:{...r.board,...o.board||{}},worker:{...r.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:r.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:r.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:r.workspace.hidden},config:o.config!==void 0?As(o.config):r.config},l=i.workspace.current?.path!==r.workspace.current?.path||i.workspace.available.length!==r.workspace.available.length||i.workspace.hidden.length!==r.workspace.hidden.length||i.workspace.hidden.some((c,g)=>c!==r.workspace.hidden[g]),a=i.config.workspace_config.default_workspace!==r.config.workspace_config.default_workspace;i.selected_id===r.selected_id&&i.view===r.view&&i.filters.status===r.filters.status&&i.filters.search===r.filters.search&&i.filters.type===r.filters.type&&i.board.closed_filter===r.board.closed_filter&&i.board.show_deferred_column===r.board.show_deferred_column&&i.worker.selected_parent_id===r.worker.selected_parent_id&&i.worker.show_closed_children.length===r.worker.show_closed_children.length&&i.worker.show_closed_children.every((c,g)=>c===r.worker.show_closed_children[g])&&!l&&!a||(r=i,e("state change %o",{selected_id:r.selected_id,view:r.view,filters:r.filters,board:r.board,worker:r.worker,workspace:r.workspace.current?.path,config:{default_workspace:r.config.workspace_config.default_workspace}}),s())},subscribe(o){return n.add(o),()=>n.delete(o)}}}function Cs(t){let e=ye("activity"),r=0,n=new Map,s=1;function o(){if(!t)return;let c=r>0;t.toggleAttribute("hidden",!c),t.setAttribute("aria-busy",c?"true":"false")}function i(){r+=1,e("start count=%d",r),o()}function l(){let c=r;r=Math.max(0,r-1),c<=0?e("done called but count was already %d",c):e("done count=%d\u2192%d",c,r),o()}function a(c){return async(m,w)=>{let $=s++,v=Date.now();n.set($,{type:m,start_ts:v}),e("request start id=%d type=%s count=%d",$,m,r+1),i();let C=!1,N=()=>{C||(C=!0,n.delete($),l())},F=setTimeout(()=>{C||(e("request TIMEOUT id=%d type=%s elapsed=%dms",$,m,Date.now()-v),N())},3e4);try{let B=await c(m,w),U=Date.now()-v;return e("request done id=%d type=%s elapsed=%dms",$,m,U),B}catch(B){let U=Date.now()-v;throw e("request error id=%d type=%s elapsed=%dms err=%o",$,m,U,B),B}finally{clearTimeout(F),N()}}}return o(),{wrapSend:a,start:i,done:l,getCount:()=>r,getActiveRequests:()=>{let c=Date.now();return Array.from(n.entries()).map(([g,m])=>({id:g,type:m.type,elapsed_ms:c-m.start_ts}))}}}function Z(t,e="info",r=2800){let n=document.createElement("div");n.className="toast",n.textContent=t,n.style.position="fixed",n.style.right="12px",n.style.bottom="12px",n.style.zIndex="1000",n.style.color="#fff",n.style.padding="8px 10px",n.style.borderRadius="4px",n.style.fontSize="12px",e==="success"?n.style.background="#156d36":e==="warning"?n.style.background="#a36a00":e==="error"?n.style.background="#9f2011":n.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(n),setTimeout(()=>{try{n.remove()}catch{}},r)}function xr(t=void 0,e=void 0){function r(){if(!e||typeof e.get!="function")return null;let o=e.get();return o&&o.order?o.order:{}}function n(o,i,l){let a=t&&t.snapshotFor?t.snapshotFor(o).slice():[];if(i==="closed")return a.sort(ks),a;switch(l){case"created_desc":return a.sort(Et),a;case"created_asc":return a.sort(_s),a;case"updated_desc":return a.sort(bs),a;case"priority":return a.sort(ws),a;case"manual":default:{let c=r();return c?a.sort(vr(c)):a.sort(Et),a}}}function s(o){let i=[];return t&&typeof t.subscribe=="function"&&i.push(t.subscribe(o)),e&&typeof e.subscribe=="function"&&i.push(e.subscribe(o)),()=>{for(let l of i)try{l()}catch{}}}return{selectBoardColumn:n,subscribe:s}}function Sr(t){let e=t.transport,r=t.uiOrderStore;function n(i,l){return"renormalize"in i?i.renormalize:[{bead_id:l,rank:i.rank}]}function s(i,l){let a={...i.order};for(let c of l)a[c.bead_id]=c.rank;r&&r.set({revision:i.revision,order:a})}async function o(i,l,a){if(!e||!r)return;let c=r.get()||{revision:0,order:{}},g=n(nn(l,a,c.order),i);s(c,g);let m=await e("ui-order-set",{expected_revision:c.revision,entries:g});if(m&&m.conflict){let w={revision:typeof m.revision=="number"?m.revision:0,order:m.order||{}};r.set(w);let $=n(nn(l,a,w.order),i);s(w,$);let v=await e("ui-order-set",{expected_revision:w.revision,entries:$});v&&v.applied&&r.set({revision:typeof v.revision=="number"?v.revision:0,order:v.order||{}})}else m&&m.applied&&r.set({revision:typeof m.revision=="number"?m.revision:0,order:m.order||{}})}return{applyReorder:o}}function Tr(t){return Array.isArray(t)?t.filter(e=>typeof e=="string"):[]}function an(t,e){return!e||typeof t!="string"||t.length===0||Tr(e.visible_labels).includes(t)?!0:Tr(e.hidden_labels).includes(t)?!1:!Tr(e.hidden_prefixes).some(r=>r.length>0&&t.startsWith(r))}function Rs(t,e){return Tr(t).filter(r=>an(r,e))}function Ct(t,e){let r=t&&t.chips?t.chips[e]:void 0;return typeof r=="boolean"?r:!0}function ln(t){if(!t)return null;if(typeof t=="number")return Number.isFinite(t)?t:null;let e=Date.parse(t);return Number.isFinite(e)?e:null}function bt(t){let e=ln(t);if(e===null)return"";let r=new Date(e),n=s=>String(s).padStart(2,"0");return`${r.getFullYear()}-${n(r.getMonth()+1)}-${n(r.getDate())} ${n(r.getHours())}:${n(r.getMinutes())}`}function cn(t,e){let r=ln(t);if(r===null)return"";let s=(typeof e=="number"?e:Date.now())-r;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let i=Math.floor(s/36e5);if(i<24)return`${i}\uC2DC\uAC04 \uC804`;let l=Math.floor(s/864e5);if(l<7)return`${l}\uC77C \uC804`;let a=Math.floor(l/7);if(l<30)return`${a}\uC8FC \uC804`;let c=Math.floor(l/30);return c<12?`${c}\uAC1C\uC6D4 \uC804`:`${Math.floor(l/365)}\uB144 \uC804`}var Ai={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg"},Ei={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge"},Ci={spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},Ri={reviewed:"\u2713",skip:"\u2298",stale:"\u2713"};function Li(t,e,r){if(!(r==="in_progress"||r==="resolved"))return null;for(let s of t)if(e[s]&&e[s].state==="dim")return s;return null}function Ii(t,e,r){let n=Ai[t]||t,s=e&&e.state||"empty",o=Ri[s]||"",i="bar";s==="dim"?i+=` b-${n} dim`:s==="on"||s==="reviewed"||s==="skip"?i+=` b-${n} on`:s==="stale"&&(i+=` b-${n} stale`),r&&(i+=" glow");let l=s==="empty"?"lbl":`lbl l-${n} on`,a=r?`color: var(--stage-${n}-on)`:"";return p`
    <div class="seg">
      <div class=${i} style=${a}>${o}</div>
      <div class=${l}>
        ${Ei[t]||t}
      </div>
    </div>
  `}function Ar(t,e){if(!t||!t.stages)return"";let r=t.route==="full_plan"?"full_plan":"spec_backed",n=Ci[r],s=t.stages,o=Li(n,s,String(e||"open"));return p`
    <div class="stp" role="img" aria-label="워크플로우 진행 스테퍼">
      ${n.map(i=>Ii(i,s[i]||{state:"empty"},i===o))}
    </div>
  `}function Di(t){return typeof t!="number"||!Number.isFinite(t)?"":`P${Math.max(0,Math.min(4,t))}`}var Ls=2;function Oi(t){if(!t)return[];let e=[];if(t.external){let n=t.reason?`\u23F8 blocked: ${t.reason}`:"\u23F8 blocked";e.push(p`<span class="ctl-chip ctl-chip--blocked">${n}</span>`)}let r=Array.isArray(t.blockers)?t.blockers:[];if(r.length>0){let n=r.slice(0,Ls).join(", "),s=r.length-Ls,o=`\u26D3 blocked: ${n}${s>0?` +${s}`:""}`;e.push(p`<span class="ctl-chip ctl-chip--blocked-dep">${o}</span>`)}return e}function Mi(t,e){let r=e.policy||null,n=t.workflow&&t.workflow.chips||{},s=[];if(n.route&&Ct(r,"route")){let o=n.route_source==="derived";s.push(p`<span
        class="ctl-chip ctl-chip--route${o?" is-derived":""}"
        title=${o?"route \uCD94\uB860\uAC12 (metadata \uBBF8\uD540)":"route"}
        >${o?`${n.route} ?`:n.route}</span
      >`)}if(n.fast_track&&Ct(r,"fast_track")&&s.push(p`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),n.pr&&Ct(r,"pr")){let o=n.pr.number;s.push(p`<span class="ctl-chip ctl-chip--pr"
        >${`PR${o!=null?` #${o}`:""}`}</span
      >`)}for(let o of Rs(t.labels,r))s.push(p`<span class="ctl-chip ctl-chip--label">${o}</span>`);return t.from_id&&Ct(r,"from")&&s.push(p`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${t.from_id} \uC5F4\uAE30`}
        @click=${o=>{o.stopPropagation(),e.onFromChipClick&&e.onFromChipClick(o,String(t.from_id))}}
      >
        ↩ from ${t.from_id}
      </button>`),Ct(r,"blocked")&&s.push(...Oi(t.blocked_info)),s.length===0?"":p`<div class="board-card__chips">${s}</div>`}function Ni(t){switch(t){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function Pi(t){let e=cn(t.created_at),r=cn(t.updated_at);return!e&&!r?"":p`<span class="board-card__times">
    ${e?p`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${bt(t.created_at)}`}
          >생성 ${e}</span
        >`:""}
    ${e&&r?p`<span class="board-card__time-sep">·</span>`:""}
    ${r?p`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${bt(t.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </span>`}function Fi(t,e){let r=e.rollupFor?e.rollupFor(t.id):{total:0,count:0,current:null,children:[]},n=r.total||0,s=e.isExpanded?e.isExpanded(t.id):!0,o=n>0?r.children.slice().sort(ys):r.children;return p`
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
        ${Pi(t)}
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
                  <span class=${Ni(i.status)}>●</span>
                  <span class="board-card__roll-child-ord">${l+1}</span>
                  <span class="board-card__roll-child-title"
                    >${i.title||i.id}</span
                  >
                </button>`)}
          </div>`:""}
    </div>
  `}function Is(t,e){let r=Di(t.priority);return p`
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
      ${Mi(t,e)}
      ${t.workflow&&Ct(e.policy||null,"stepper")?Ar(t.workflow,t.status):""}
      ${Fi(t,e)}
    </article>
  `}function Rt(t,e){let r=Array.isArray(t.items)?t.items.length:0,n=t.is_closed===!0;return p`
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
              ${os.map(o=>p`<option
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
  `}var Bi=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],qi=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],Ui=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function zi(t,e,r){let n=t.labels.length,s=n>0?`\uB77C\uBCA8 ${n}`:"\uB77C\uBCA8";return p`
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
  `}function Ds(t,e,r){return p`
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
        ${Bi.map(n=>p`<option
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
        ${qi.map(n=>p`<option
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
        ${Ui.map(n=>p`<option
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
  `}var Hi=200,Wi={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","deferred-col":"deferred","closed-col":"closed"},Gi=new Set(["blocked-col","ready-col","in-progress-col","resolved-col","deferred-col"]),Os="beads-ui.board.sort",Ms=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function ji(){try{let t=window.localStorage.getItem(Os);if(t&&Ms.has(t))return t}catch{}return"created_desc"}function Ns(t,e){let r=ye("views:board"),n=e.gotoIssue,s=e.issueStores,o=e.transport,i=e.uiOrderStore,l=e.displayPolicyStore,a=e.onClosedRangeChange,c=e.onNewIssue,g=e.closedRange||wr,m=s?xr(s,i):null,w=Sr({transport:o,uiOrderStore:i}),$=[],v=[],C=[],N=[],F=[],B=[],U=!1,O=0,A=ji(),T=new Map,x=new Map,b=new Map,M=new Set,P={search:"",priority:"",type:"",labels:[]},H=!1,K=null;function ke(R){return String(R.status||"open")==="open"}function oe(R){let D=String(R.status||"open");return D==="open"||D==="blocked"}function ee(R){let D=P.search.trim().toLowerCase(),X=P.priority,V=P.type,d=P.labels;return R.filter(h=>{if(D){let u=String(h.id||"").toLowerCase(),S=String(h.title||"").toLowerCase();if(!u.includes(D)&&!S.includes(D))return!1}if(X!==""&&String(h.priority)!==X||V!==""&&String(h.issue_type||"")!==V)return!1;if(d.length>0){let u=Array.isArray(h.labels)?h.labels:[];if(!d.some(S=>u.includes(S)))return!1}return!0})}function Qe(){let R=new Set;for(let D of[$,v,C,N,F,B])for(let X of D){let V=Array.isArray(X.labels)?X.labels:[];for(let d of V)typeof d=="string"&&d.length>0&&R.add(d)}return Array.from(R).sort()}function Ue(){return P.search.trim()!==""||P.priority!==""||P.type!==""||P.labels.length>0}function ve(){try{if(m){let R=m.selectBoardColumn("tab:board:in-progress","in_progress",A),D=m.selectBoardColumn("tab:board:blocked","blocked",A).filter(oe),X=new Set(R.map(q=>q.id)),V=m.selectBoardColumn("tab:board:ready","ready",A).filter(q=>ke(q)&&!X.has(q.id)),d=m.selectBoardColumn("tab:board:resolved","resolved",A),h=m.selectBoardColumn("tab:board:deferred","deferred",A),u=U?h:[],S=m.selectBoardColumn("tab:board:closed","closed").slice(0,Hi),y=[...D,...V,...R,...d,...u,...S];Ee(y);let I=new Set;for(let q of y)q&&q.id&&!dn(q)&&I.add(q.id);let Q=!Ue();$=Q?Ut(D,I):D,v=Q?Ut(V,I):V,C=Q?Ut(R,I):R,N=Q?Ut(d,I):d,F=Q?Ut(u,I):u,O=h.length,B=Q?Ut(S,I):S,T=new Map;for(let q of $)T.set(q.id,"open");for(let q of v)T.set(q.id,"open");for(let q of C)T.set(q.id,"in_progress");for(let q of N)T.set(q.id,"resolved");for(let q of F)T.set(q.id,"deferred");for(let q of B)T.set(q.id,"closed");x=new Map;for(let q of $)x.set(q.id,"blocked-col");for(let q of v)x.set(q.id,"ready-col");for(let q of C)x.set(q.id,"in-progress-col");for(let q of N)x.set(q.id,"resolved-col");for(let q of F)x.set(q.id,"deferred-col");for(let q of B)x.set(q.id,"closed-col")}xe()}catch{$=[],v=[],C=[],N=[],F=[],B=[],b=new Map,xe()}}function Ee(R){let D=new Map;for(let V of R)V&&V.id&&!D.has(V.id)&&D.set(V.id,V);let X=new Map;for(let V of D.values()){let d=dn(V);if(!d)continue;let h=X.get(d);h||(h=[],X.set(d,h)),h.push({id:V.id,title:V.title,status:V.status,metadata:V.metadata,created_at:V.created_at})}b=X}function Je(R){let D=b.get(R)||[],X=0,V=null;for(let d of D)(d.status==="resolved"||d.status==="closed")&&(X+=1),!V&&d.status==="in_progress"&&(V=d);return{total:D.length,count:X,current:V,children:D}}function fe(R){return!M.has(R)}function it(R,D){R.preventDefault(),R.stopPropagation(),M.has(D)?M.delete(D):M.add(D),xe()}function he(R,D){R.preventDefault(),R.stopPropagation(),n(D)}function et(R,D){R.preventDefault(),R.stopPropagation(),n(D)}function ae(R,D){K||n(D)}function Be(R,D){R.preventDefault(),R.stopPropagation(),Yi(D).then(X=>{X&&Z("\uBCF5\uC0AC\uB428","success",1200)})}function nt(R,D){K=D,R.dataTransfer&&(R.dataTransfer.setData("text/plain",D),R.dataTransfer.effectAllowed="move"),R.target.classList.add("board-card--dragging")}function Re(R){R.target.classList.remove("board-card--dragging"),at(),setTimeout(()=>{K=null},0)}function Ie(R){let D=String(R.target.value||"");!D||D===g||(g=D,a&&a(D),xe())}let $e={onCardClick:ae,onCopyId:Be,onDragStart:nt,onDragEnd:Re,onClosedRangeChange:Ie,rollupFor:Je,isExpanded:fe,onRollupToggle:it,onChildClick:he,onFromChipClick:et,get policy(){return l?l.get():null}};function ze(R){let D=R.target,X=t.querySelector(".board-filter__labels");D&&X&&X.contains(D)||He()}function tt(R){R.key==="Escape"&&He()}function De(){H||(H=!0,document.addEventListener("mousedown",ze),document.addEventListener("keydown",tt),xe())}function He(){H&&(H=!1,document.removeEventListener("mousedown",ze),document.removeEventListener("keydown",tt),xe())}let Oe={onSearchInput(R){P.search=String(R.target.value||""),ve()},onPriorityChange(R){P.priority=String(R.target.value||""),ve()},onTypeChange(R){P.type=String(R.target.value||""),ve()},onSortChange(R){let D=String(R.target.value||"");if(!(!Ms.has(D)||D===A)){A=D;try{window.localStorage.setItem(Os,D)}catch{}ve()}},onDeferredToggle(){U=!U,ve()},onLabelMenuToggle(){H?He():De()},onLabelToggle(R){let D=P.labels.indexOf(R);D===-1?P.labels.push(R):P.labels.splice(D,1),ve()},onLabelClear(){P.labels.length!==0&&(P.labels=[],ve())},onNewIssue(){c&&c()}};function ce(){let R=U?"board-root board-root--deferred":"board-root";return p`
      <div class="board-view">
        ${Ds(P,Oe,{sort_mode:A,show_deferred:U,deferred_count:O,label_options:Qe(),label_menu_open:H})}
        <div class=${R}>
          ${Rt({title:"Blocked",id:"blocked-col",items:ee($)},$e)}
          ${Rt({title:"Ready",id:"ready-col",items:ee(v)},$e)}
          ${Rt({title:"In progress",id:"in-progress-col",items:ee(C)},$e)}
          ${Rt({title:"Resolved",id:"resolved-col",items:ee(N)},$e)}
          ${U?Rt({title:"Deferred",id:"deferred-col",items:ee(F)},$e):""}
          ${Rt({title:"Closed",id:"closed-col",items:ee(B),is_closed:!0,closed_range:g},$e)}
        </div>
      </div>
    `}function xe(){de(ce(),t),Me()}function Me(){try{let R=Array.from(t.querySelectorAll(".board-column"));for(let D of R)Array.from(D.querySelectorAll(".board-card")).forEach((V,d)=>{V.tabIndex=d===0?0:-1})}catch{}}async function We(R,D){if(!o){Z("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:R,status:D}),Z("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(X){r("update-status failed: %o",X),Z("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function Ne(R){switch(R){case"blocked-col":return $;case"ready-col":return v;case"in-progress-col":return C;case"resolved-col":return N;case"deferred-col":return F;default:return[]}}function rt(R,D,X){if(!o||!i)return;let V=Ne(R),d=V.find(I=>I.id===D);if(!d)return;let h=V.filter(I=>I.id!==D),u=X.closest?X.closest(".board-card"):null,S=h.length;if(u){let I=u.getAttribute("data-issue-id");if(I===D)return;let Q=h.findIndex(q=>q.id===I);Q>=0&&(S=Q)}let y=h.slice();y.splice(S,0,d),w.applyReorder(D,y,S)}function at(){for(let R of Array.from(t.querySelectorAll(".board-column--drag-over")))R.classList.remove("board-column--drag-over")}let me=null;t.addEventListener("dragover",R=>{R.preventDefault(),R.dataTransfer&&(R.dataTransfer.dropEffect="move");let X=R.target.closest(".board-column");X&&X!==me&&(me&&me.classList.remove("board-column--drag-over"),X.classList.add("board-column--drag-over"),me=X)}),t.addEventListener("dragleave",R=>{let D=R.relatedTarget;(!D||!t.contains(D))&&me&&(me.classList.remove("board-column--drag-over"),me=null)}),t.addEventListener("drop",R=>{R.preventDefault(),me&&(me.classList.remove("board-column--drag-over"),me=null);let D=R.target,X=D.closest(".board-column");if(!X)return;let V=R.dataTransfer?.getData("text/plain")||"";if(!V)return;let d=X.id,h=x.get(V);if(h&&h===d){if(Gi.has(d)){if(A!=="manual"){Z("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}rt(d,V,D)}return}let u=Wi[d];if(!u){Z("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}T.get(V)!==u&&We(V,u)}),t.addEventListener("keydown",R=>{let D=R.target;if(!(D instanceof HTMLElement))return;let X=String(D.tagName||"").toLowerCase();if(X==="input"||X==="textarea"||X==="select"||X==="button"||X==="a"||D.isContentEditable===!0)return;let V=D.closest(".board-card");if(!V)return;let d=String(R.key||"");if(d==="Enter"||d===" "){R.preventDefault();let y=V.getAttribute("data-issue-id");y&&n(y);return}if(d!=="ArrowUp"&&d!=="ArrowDown"&&d!=="ArrowLeft"&&d!=="ArrowRight")return;R.preventDefault();let h=V.closest(".board-column");if(!h)return;let u=Array.from(h.querySelectorAll(".board-card")),S=u.indexOf(V);if(d==="ArrowDown"&&S<u.length-1){Pe(V,u[S+1]);return}if(d==="ArrowUp"&&S>0){Pe(V,u[S-1]);return}if(d==="ArrowLeft"||d==="ArrowRight"){let y=Array.from(t.querySelectorAll(".board-column")),I=y.indexOf(h),Q=d==="ArrowRight"?1:-1,q=I+Q;for(;q>=0&&q<y.length;){let ue=y[q].querySelector(".board-card");if(ue){Pe(V,ue);return}q+=Q}}});function Pe(R,D){try{R.tabIndex=-1,D.tabIndex=0,D.focus()}catch{}}let Fe=null;m&&m.subscribe&&(Fe=m.subscribe(()=>{try{ve()}catch{}}));let Le=null;return l&&l.subscribe&&(Le=l.subscribe(()=>{try{ve()}catch{}})),{async load(){r("load"),ve()},clear(){He(),Fe&&(Fe(),Fe=null),Le&&(Le(),Le=null),t.replaceChildren(),$=[],v=[],C=[],N=[],F=[],B=[],T=new Map,x=new Map}}}function dn(t){let e=t&&t.parent;return typeof e=="string"?e:e&&e.id?String(e.id):""}function Ut(t,e){return t.filter(r=>{let n=dn(r);return!(n&&e.has(n))})}async function Yi(t){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(t)),!0;let e=document.createElement("textarea");e.value=String(t),e.style.position="fixed",e.style.left="-9999px",document.body.appendChild(e),e.select();let r=!1;try{r=document.execCommand("copy")}finally{e.remove()}return r}catch{return!1}}async function Lt(t){let e=String(t);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(e),!0}catch{}try{let r=document.createElement("textarea");r.value=e,r.style.position="fixed",r.style.left="-9999px",document.body.appendChild(r),r.select();let n=!1;try{n=document.execCommand("copy")}finally{r.remove()}return n}catch{return!1}}var Vi={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},Ki=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,Zi=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function wt(t){return!!t&&typeof t=="object"}function un(t){return typeof t!="string"||t.length===0?[]:t.split(/\r?\n/)}function Ps(t,e){let r=un(t),n=un(e),s=new Map;for(let l of r)s.set(l,(s.get(l)||0)+1);let o=0;for(let l of n){let a=s.get(l)||0;a>0?s.set(l,a-1):o+=1}let i=0;for(let l of s.values())i+=l;return{added:o,removed:i}}function Xi(t){let e="";typeof t=="string"?e=t:Array.isArray(t)?e=t.map(s=>wt(s)&&typeof s.text=="string"?s.text:"").join(""):wt(t)&&typeof t.text=="string"&&(e=t.text);let n=(String(e).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return n.length>120?`${n.slice(0,117)}\u2026`:n}function Qi(t){let e=String(t.name||""),r=t.input||{},n={kind:"tool",tool:e,icon:Vi[e]||"\u{1F527}",input:r,expandable:!0};if((e==="Read"||e==="Write")&&(n.path=String(r.file_path||r.path||"")),e==="Write"&&(n.added=un(r.content).length),e==="Edit"){n.path=String(r.file_path||r.path||"");let{added:s,removed:o}=Ps(r.old_string,r.new_string);n.added=s,n.removed=o}if(e==="MultiEdit"){n.path=String(r.file_path||r.path||"");let s=0,o=0,i=Array.isArray(r.edits)?r.edits:[];for(let l of i){let a=Ps(wt(l)?l.old_string:"",wt(l)?l.new_string:"");s+=a.added,o+=a.removed}n.added=s,n.removed=o}return e==="Bash"&&(n.command=String(r.command||"")),(e==="Grep"||e==="Glob")&&(n.command=String(r.pattern||r.query||"")),n}function Fs(t){let e=t.split(/\r?\n/).find(n=>n.trim().length>0)||"",r=Ki.exec(e);return r?{kind:"gate",gate:r[2]==="implementation"?"impl":r[2],reviewer:r[3],verdict:r[4],time:r[5]?r[5].trim():void 0,text:e.trim()}:Zi.test(e)&&e.trim().length<=80?{kind:"phase",text:e.trim()}:{kind:"assistant",text:t}}function Ji(t,e){if(t.type==="assistant"){let r=t.message,n=r&&Array.isArray(r.content)?r.content:[],s=[];for(let o of n)if(wt(o)){if(o.type==="text"&&typeof o.text=="string")s.push(Fs(o.text));else if(o.type==="tool_use"){let i=Qi(o);typeof o.id=="string"&&e.set(o.id,i),s.push(i)}}return s}if(t.type==="user"){let r=t.message,n=r&&Array.isArray(r.content)?r.content:[];for(let s of n)if(wt(s)&&s.type==="tool_result"){let o=e.get(String(s.tool_use_id));if(o){let i=Xi(s.content);o.result=i,o.output=typeof s.content=="string"?s.content:i}}return[]}if(t.type==="result"){let r=t.is_error===!1&&t.subtype==="success";return[{kind:"result",success:r,text:typeof t.result=="string"?t.result:r?"DONE":""}]}return[]}function ea(t){if(t.type==="item.completed"&&wt(t.item)){let e=t.item;return e.type==="agent_message"&&typeof e.text=="string"?[Fs(e.text)]:e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}if(t.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(t.type==="turn.failed"){let e=t.error;return[{kind:"error",text:e&&typeof e.message=="string"?e.message:"turn failed"}]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:[]}function ta(t){let e=t.type;return typeof e=="string"&&(e==="error"||e.startsWith("thread.")||e.startsWith("turn.")||e.startsWith("item."))}function Bs(t){let e=[],r=new Map,n=Array.isArray(t)?t:[];for(let s of n){let o=s;if(typeof s=="string"){let l=s.trim();if(l.length===0)continue;try{o=JSON.parse(l)}catch{continue}}if(!wt(o))continue;let i=ta(o)?ea(o):Ji(o,r);for(let l of i)e.push(l)}return e}function Er(t,e={}){let{transport:r,sessionLogStore:n,onClose:s}=e,o=null,i={},l=!0,a=new Set,c=null;function g(){if(!o||!n)return[];let x=n.get(o);return Bs(x?x.lines:[])}function m(x,b){if(b.kind==="gate")return p`<div class="sv__gate">${b.text}</div>`;if(b.kind==="phase")return p`<div class="sv__phase">${b.text}</div>`;if(b.kind==="result")return p`<div
        class="sv__result${b.success?" sv__result--ok":" sv__result--fail"}"
      >
        ${b.success?"\u2713":"\u2717"}
        ${b.text||(b.success?"DONE":"\uC2E4\uD328")}
      </div>`;if(b.kind==="error")return p`<div class="sv__error">⛔ ${b.text}</div>`;if(b.kind==="blocker")return p`<div class="sv__error">⛔ ${b.text}</div>`;if(b.kind==="tool"){let M=a.has(x),P=b.tool==="Bash"?b.command:b.path||b.command||"";return p`<div
        class="sv__tool${M?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>N(x)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${b.icon}</span>
          <span class="sv__tool-name">${b.tool}</span>
          ${P?p`<span class="sv__tool-detail">${P}</span>`:""}
          ${typeof b.added=="number"?p`<span class="sv__diff-add">+${b.added}</span>`:""}
          ${typeof b.removed=="number"?p`<span class="sv__diff-del">−${b.removed}</span>`:""}
          ${b.result?p`<span class="sv__tool-ok">→ ${b.result}</span>`:""}
        </span>
        ${M?p`<pre class="sv__tool-expand">${w(b)}</pre>`:""}
      </div>`}return p`<div class="sv__as">${b.text}</div>`}function w(x){let b=[];if(x.input!==void 0)try{b.push(`input: ${JSON.stringify(x.input,null,2)}`)}catch{}return typeof x.output=="string"&&x.output.length>0&&b.push(`output:
${x.output}`),b.join(`

`)}function $(){if(!o)return p``;let x=g(),b=[i.runner,i.model,i.effort].filter(Boolean).join(" \xB7 "),M=i.session_id||"",P=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${l?"ON":"OFF"}`;return p`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id">${o}</span>
        ${M?p`<button
              type="button"
              class="sv__session"
              title=${M}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${M}`}
              @click=${()=>B(M)}
            >
              ⧉ ${M.slice(0,8)}
            </button>`:""}
        ${b?p`<span class="sv__meta">${b}</span>`:""}
        ${i.worktree?p`<span class="sv__wt" title=${i.worktree}
              >${i.worktree}</span
            >`:""}
        <button
          type="button"
          class="sv__follow${l?" sv__follow--on":""}"
          aria-pressed=${l?"true":"false"}
          aria-label=${P}
          @click=${F}
        >
          <span class="sv__follow-full">⇣ ${P}</span>
          <span class="sv__follow-short">⇣ ${l?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>T()}
        >
          ✕
        </button>
      </div>
      <div class="sv__body">
        ${x.length===0?p`<div class="sv__empty">세션 로그 없음</div>`:x.map((H,K)=>m(K,H))}
      </div>
    </div>`}function v(){de($(),t),l&&C()}function C(){let x=t.querySelector(".sv__body");x&&(x.scrollTop=x.scrollHeight)}function N(x){a.has(x)?a.delete(x):a.add(x),v()}function F(){l=!l,v()}function B(x){Lt(x).then(b=>{b?Z("\uBCF5\uC0AC\uB428","success",1200):Z("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function U(x){!o||!x||(i={...i,...x},v())}function O(x){let b=x.target;if(!b||!b.classList||!b.classList.contains("sv__body"))return;!(b.scrollHeight-b.scrollTop-b.clientHeight<=4)&&l&&(l=!1,v())}t.addEventListener("scroll",O,!0);function A(x){let b=x&&x.attempt_id;b&&(o=b,i=x.meta||{},l=!0,a.clear(),!c&&n&&(c=n.subscribe(v)),r&&Promise.resolve(r("subscribe-session-log",{id:`session-log:${o}`,attempt_id:o})).catch(()=>{}),v())}function T(){let x=o;o=null,a.clear(),r&&x&&Promise.resolve(r("unsubscribe-session-log",{id:`session-log:${x}`})).catch(()=>{}),de(p``,t),s&&s()}return{open:A,updateMeta:U,close:T,isOpen(){return o!==null},destroy(){c&&(c(),c=null),t.removeEventListener("scroll",O,!0),o=null,de(p``,t)}}}function ra(t){let e=t&&t.metadata||{},r=[];return typeof e.spec_id=="string"&&e.spec_id.trim().length>0&&r.push({kind:"spec",path:e.spec_id.trim()}),typeof e.plan_path=="string"&&e.plan_path.trim().length>0&&r.push({kind:"plan",path:e.plan_path.trim()}),r}function qs(t,e){let r=ra(t);return p`
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
  `}var pn=["opus","sonnet","haiku","fable"],fn=["low","medium","high","xhigh"],hn=["codex","opus","fable","self","skip"],gn=["opus","fable","sonnet","haiku"],na=["standard","fast_track"],mn={orchestration_model:"(\uAE30\uBCF8: opus)",orchestration_effort:"(\uAE30\uBCF8: CLI \uAE30\uBCF8)",review_model:"(\uAE30\uBCF8: codex)",impl_model:"(\uAE30\uBCF8: \uD2F0\uC5B4 \uC790\uB3D9)"};function Cr(t,e){let r=e&&e[t];return typeof r=="string"&&r.length>0?`(\uAE30\uBCF8: ${r} \u2014 \uC804\uC5ED)`:mn[t]||"(\uAE30\uBCF8)"}function tr(t,e,r,n,s,o){return p`
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
  `}function rr(t,e){let r=t.map(n=>({value:n,label:n}));return typeof e=="string"?[{value:"",label:e},...r]:r}function Us(t,e,r){let n=t&&t.metadata||{},s=r&&typeof r=="object"?r:{},o=n.workflow_mode==="fast_track"?"fast_track":"standard";return p`
    <div class="detail-section-label">실행 설정 (수정 가능)</div>
    ${tr("orchestration_model","orchestration_model",rr(pn,Cr("orchestration_model",s)),n.orchestration_model||"",!1,e)}
    ${tr("orchestration_effort","orchestration_effort",rr(fn,Cr("orchestration_effort",s)),n.orchestration_effort||"",!1,e)}
    ${tr("review_model","review_model",rr(hn,Cr("review_model",s)),n.review_model||"",!1,e)}
    ${tr("impl_model","impl_model",rr(gn,Cr("impl_model",s)),n.impl_model||"",!1,e)}
    ${tr("workflow_mode","workflow_mode",rr(na),o,n.workflow_mode==="fast_track",e)}
  `}var{entries:Zs,setPrototypeOf:zs,isFrozen:sa,getPrototypeOf:oa,getOwnPropertyDescriptor:ia}=Object,{freeze:Ye,seal:ot,create:$n}=Object,{apply:xn,construct:Sn}=typeof Reflect<"u"&&Reflect;Ye||(Ye=function(e){return e});ot||(ot=function(e){return e});xn||(xn=function(e,r){for(var n=arguments.length,s=new Array(n>2?n-2:0),o=2;o<n;o++)s[o-2]=arguments[o];return e.apply(r,s)});Sn||(Sn=function(e){for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return new e(...n)});var Rr=Ve(Array.prototype.forEach),aa=Ve(Array.prototype.lastIndexOf),Hs=Ve(Array.prototype.pop),nr=Ve(Array.prototype.push),la=Ve(Array.prototype.splice),Ir=Ve(String.prototype.toLowerCase),_n=Ve(String.prototype.toString),bn=Ve(String.prototype.match),sr=Ve(String.prototype.replace),ca=Ve(String.prototype.indexOf),da=Ve(String.prototype.trim),dt=Ve(Object.prototype.hasOwnProperty),je=Ve(RegExp.prototype.test),or=ua(TypeError);function Ve(t){return function(e){e instanceof RegExp&&(e.lastIndex=0);for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return xn(t,e,n)}}function ua(t){return function(){for(var e=arguments.length,r=new Array(e),n=0;n<e;n++)r[n]=arguments[n];return Sn(t,r)}}function re(t,e){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Ir;zs&&zs(t,null);let n=e.length;for(;n--;){let s=e[n];if(typeof s=="string"){let o=r(s);o!==s&&(sa(e)||(e[n]=o),s=o)}t[s]=!0}return t}function pa(t){for(let e=0;e<t.length;e++)dt(t,e)||(t[e]=null);return t}function ht(t){let e=$n(null);for(let[r,n]of Zs(t))dt(t,r)&&(Array.isArray(n)?e[r]=pa(n):n&&typeof n=="object"&&n.constructor===Object?e[r]=ht(n):e[r]=n);return e}function ir(t,e){for(;t!==null;){let n=ia(t,e);if(n){if(n.get)return Ve(n.get);if(typeof n.value=="function")return Ve(n.value)}t=oa(t)}function r(){return null}return r}var Ws=Ye(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),wn=Ye(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),kn=Ye(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),fa=Ye(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),yn=Ye(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),ha=Ye(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Gs=Ye(["#text"]),js=Ye(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),vn=Ye(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Ys=Ye(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Lr=Ye(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),ga=ot(/\{\{[\w\W]*|[\w\W]*\}\}/gm),ma=ot(/<%[\w\W]*|[\w\W]*%>/gm),_a=ot(/\$\{[\w\W]*/gm),ba=ot(/^data-[\-\w.\u00B7-\uFFFF]+$/),wa=ot(/^aria-[\-\w]+$/),Xs=ot(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),ka=ot(/^(?:\w+script|data):/i),ya=ot(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Qs=ot(/^html$/i),va=ot(/^[a-z][.\w]*(-[.\w]+)+$/i),Vs=Object.freeze({__proto__:null,ARIA_ATTR:wa,ATTR_WHITESPACE:ya,CUSTOM_ELEMENT:va,DATA_ATTR:ba,DOCTYPE_NAME:Qs,ERB_EXPR:ma,IS_ALLOWED_URI:Xs,IS_SCRIPT_OR_DATA:ka,MUSTACHE_EXPR:ga,TMPLIT_EXPR:_a}),ar={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},$a=function(){return typeof window>"u"?null:window},xa=function(e,r){if(typeof e!="object"||typeof e.createPolicy!="function")return null;let n=null,s="data-tt-policy-suffix";r&&r.hasAttribute(s)&&(n=r.getAttribute(s));let o="dompurify"+(n?"#"+n:"");try{return e.createPolicy(o,{createHTML(i){return i},createScriptURL(i){return i}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},Ks=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Js(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:$a(),e=G=>Js(G);if(e.version="3.3.0",e.removed=[],!t||!t.document||t.document.nodeType!==ar.document||!t.Element)return e.isSupported=!1,e;let{document:r}=t,n=r,s=n.currentScript,{DocumentFragment:o,HTMLTemplateElement:i,Node:l,Element:a,NodeFilter:c,NamedNodeMap:g=t.NamedNodeMap||t.MozNamedAttrMap,HTMLFormElement:m,DOMParser:w,trustedTypes:$}=t,v=a.prototype,C=ir(v,"cloneNode"),N=ir(v,"remove"),F=ir(v,"nextSibling"),B=ir(v,"childNodes"),U=ir(v,"parentNode");if(typeof i=="function"){let G=r.createElement("template");G.content&&G.content.ownerDocument&&(r=G.content.ownerDocument)}let O,A="",{implementation:T,createNodeIterator:x,createDocumentFragment:b,getElementsByTagName:M}=r,{importNode:P}=n,H=Ks();e.isSupported=typeof Zs=="function"&&typeof U=="function"&&T&&T.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:K,ERB_EXPR:ke,TMPLIT_EXPR:oe,DATA_ATTR:ee,ARIA_ATTR:Qe,IS_SCRIPT_OR_DATA:Ue,ATTR_WHITESPACE:ve,CUSTOM_ELEMENT:Ee}=Vs,{IS_ALLOWED_URI:Je}=Vs,fe=null,it=re({},[...Ws,...wn,...kn,...yn,...Gs]),he=null,et=re({},[...js,...vn,...Ys,...Lr]),ae=Object.seal($n(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Be=null,nt=null,Re=Object.seal($n(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),Ie=!0,$e=!0,ze=!1,tt=!0,De=!1,He=!0,Oe=!1,ce=!1,xe=!1,Me=!1,We=!1,Ne=!1,rt=!0,at=!1,me="user-content-",Pe=!0,Fe=!1,Le={},R=null,D=re({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),X=null,V=re({},["audio","video","img","source","image","track"]),d=null,h=re({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),u="http://www.w3.org/1998/Math/MathML",S="http://www.w3.org/2000/svg",y="http://www.w3.org/1999/xhtml",I=y,Q=!1,q=null,ue=re({},[u,S,y],_n),Te=re({},["mi","mo","mn","ms","mtext"]),st=re({},["annotation-xml"]),ft=re({},["title","style","font","a","script"]),Ze=null,te=["application/xhtml+xml","text/html"],_e="text/html",_=null,k=null,Y=r.createElement("form"),j=function(f){return f instanceof RegExp||f instanceof Function},J=function(){let f=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(k&&k===f)){if((!f||typeof f!="object")&&(f={}),f=ht(f),Ze=te.indexOf(f.PARSER_MEDIA_TYPE)===-1?_e:f.PARSER_MEDIA_TYPE,_=Ze==="application/xhtml+xml"?_n:Ir,fe=dt(f,"ALLOWED_TAGS")?re({},f.ALLOWED_TAGS,_):it,he=dt(f,"ALLOWED_ATTR")?re({},f.ALLOWED_ATTR,_):et,q=dt(f,"ALLOWED_NAMESPACES")?re({},f.ALLOWED_NAMESPACES,_n):ue,d=dt(f,"ADD_URI_SAFE_ATTR")?re(ht(h),f.ADD_URI_SAFE_ATTR,_):h,X=dt(f,"ADD_DATA_URI_TAGS")?re(ht(V),f.ADD_DATA_URI_TAGS,_):V,R=dt(f,"FORBID_CONTENTS")?re({},f.FORBID_CONTENTS,_):D,Be=dt(f,"FORBID_TAGS")?re({},f.FORBID_TAGS,_):ht({}),nt=dt(f,"FORBID_ATTR")?re({},f.FORBID_ATTR,_):ht({}),Le=dt(f,"USE_PROFILES")?f.USE_PROFILES:!1,Ie=f.ALLOW_ARIA_ATTR!==!1,$e=f.ALLOW_DATA_ATTR!==!1,ze=f.ALLOW_UNKNOWN_PROTOCOLS||!1,tt=f.ALLOW_SELF_CLOSE_IN_ATTR!==!1,De=f.SAFE_FOR_TEMPLATES||!1,He=f.SAFE_FOR_XML!==!1,Oe=f.WHOLE_DOCUMENT||!1,Me=f.RETURN_DOM||!1,We=f.RETURN_DOM_FRAGMENT||!1,Ne=f.RETURN_TRUSTED_TYPE||!1,xe=f.FORCE_BODY||!1,rt=f.SANITIZE_DOM!==!1,at=f.SANITIZE_NAMED_PROPS||!1,Pe=f.KEEP_CONTENT!==!1,Fe=f.IN_PLACE||!1,Je=f.ALLOWED_URI_REGEXP||Xs,I=f.NAMESPACE||y,Te=f.MATHML_TEXT_INTEGRATION_POINTS||Te,st=f.HTML_INTEGRATION_POINTS||st,ae=f.CUSTOM_ELEMENT_HANDLING||{},f.CUSTOM_ELEMENT_HANDLING&&j(f.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(ae.tagNameCheck=f.CUSTOM_ELEMENT_HANDLING.tagNameCheck),f.CUSTOM_ELEMENT_HANDLING&&j(f.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(ae.attributeNameCheck=f.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),f.CUSTOM_ELEMENT_HANDLING&&typeof f.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(ae.allowCustomizedBuiltInElements=f.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),De&&($e=!1),We&&(Me=!0),Le&&(fe=re({},Gs),he=[],Le.html===!0&&(re(fe,Ws),re(he,js)),Le.svg===!0&&(re(fe,wn),re(he,vn),re(he,Lr)),Le.svgFilters===!0&&(re(fe,kn),re(he,vn),re(he,Lr)),Le.mathMl===!0&&(re(fe,yn),re(he,Ys),re(he,Lr))),f.ADD_TAGS&&(typeof f.ADD_TAGS=="function"?Re.tagCheck=f.ADD_TAGS:(fe===it&&(fe=ht(fe)),re(fe,f.ADD_TAGS,_))),f.ADD_ATTR&&(typeof f.ADD_ATTR=="function"?Re.attributeCheck=f.ADD_ATTR:(he===et&&(he=ht(he)),re(he,f.ADD_ATTR,_))),f.ADD_URI_SAFE_ATTR&&re(d,f.ADD_URI_SAFE_ATTR,_),f.FORBID_CONTENTS&&(R===D&&(R=ht(R)),re(R,f.FORBID_CONTENTS,_)),Pe&&(fe["#text"]=!0),Oe&&re(fe,["html","head","body"]),fe.table&&(re(fe,["tbody"]),delete Be.tbody),f.TRUSTED_TYPES_POLICY){if(typeof f.TRUSTED_TYPES_POLICY.createHTML!="function")throw or('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof f.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw or('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');O=f.TRUSTED_TYPES_POLICY,A=O.createHTML("")}else O===void 0&&(O=xa($,s)),O!==null&&typeof A=="string"&&(A=O.createHTML(""));Ye&&Ye(f),k=f}},be=re({},[...wn,...kn,...fa]),Ot=re({},[...yn,...ha]),gr=function(f){let L=U(f);(!L||!L.tagName)&&(L={namespaceURI:I,tagName:"template"});let z=Ir(f.tagName),ge=Ir(L.tagName);return q[f.namespaceURI]?f.namespaceURI===S?L.namespaceURI===y?z==="svg":L.namespaceURI===u?z==="svg"&&(ge==="annotation-xml"||Te[ge]):!!be[z]:f.namespaceURI===u?L.namespaceURI===y?z==="math":L.namespaceURI===S?z==="math"&&st[ge]:!!Ot[z]:f.namespaceURI===y?L.namespaceURI===S&&!st[ge]||L.namespaceURI===u&&!Te[ge]?!1:!Ot[z]&&(ft[z]||!be[z]):!!(Ze==="application/xhtml+xml"&&q[f.namespaceURI]):!1},Ge=function(f){nr(e.removed,{element:f});try{U(f).removeChild(f)}catch{N(f)}},lt=function(f,L){try{nr(e.removed,{attribute:L.getAttributeNode(f),from:L})}catch{nr(e.removed,{attribute:null,from:L})}if(L.removeAttribute(f),f==="is")if(Me||We)try{Ge(L)}catch{}else try{L.setAttribute(f,"")}catch{}},Wt=function(f){let L=null,z=null;if(xe)f="<remove></remove>"+f;else{let we=bn(f,/^[\r\n\t ]+/);z=we&&we[0]}Ze==="application/xhtml+xml"&&I===y&&(f='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+f+"</body></html>");let ge=O?O.createHTML(f):f;if(I===y)try{L=new w().parseFromString(ge,Ze)}catch{}if(!L||!L.documentElement){L=T.createDocument(I,"template",null);try{L.documentElement.innerHTML=Q?A:ge}catch{}}let Ce=L.body||L.documentElement;return f&&z&&Ce.insertBefore(r.createTextNode(z),Ce.childNodes[0]||null),I===y?M.call(L,Oe?"html":"body")[0]:Oe?L.documentElement:Ce},Gt=function(f){return x.call(f.ownerDocument||f,f,c.SHOW_ELEMENT|c.SHOW_COMMENT|c.SHOW_TEXT|c.SHOW_PROCESSING_INSTRUCTION|c.SHOW_CDATA_SECTION,null)},jt=function(f){return f instanceof m&&(typeof f.nodeName!="string"||typeof f.textContent!="string"||typeof f.removeChild!="function"||!(f.attributes instanceof g)||typeof f.removeAttribute!="function"||typeof f.setAttribute!="function"||typeof f.namespaceURI!="string"||typeof f.insertBefore!="function"||typeof f.hasChildNodes!="function")},mt=function(f){return typeof l=="function"&&f instanceof l};function Ae(G,f,L){Rr(G,z=>{z.call(e,f,L,k)})}let Yt=function(f){let L=null;if(Ae(H.beforeSanitizeElements,f,null),jt(f))return Ge(f),!0;let z=_(f.nodeName);if(Ae(H.uponSanitizeElement,f,{tagName:z,allowedTags:fe}),He&&f.hasChildNodes()&&!mt(f.firstElementChild)&&je(/<[/\w!]/g,f.innerHTML)&&je(/<[/\w!]/g,f.textContent)||f.nodeType===ar.progressingInstruction||He&&f.nodeType===ar.comment&&je(/<[/\w]/g,f.data))return Ge(f),!0;if(!(Re.tagCheck instanceof Function&&Re.tagCheck(z))&&(!fe[z]||Be[z])){if(!Be[z]&&vt(z)&&(ae.tagNameCheck instanceof RegExp&&je(ae.tagNameCheck,z)||ae.tagNameCheck instanceof Function&&ae.tagNameCheck(z)))return!1;if(Pe&&!R[z]){let ge=U(f)||f.parentNode,Ce=B(f)||f.childNodes;if(Ce&&ge){let we=Ce.length;for(let qe=we-1;qe>=0;--qe){let E=C(Ce[qe],!0);E.__removalCount=(f.__removalCount||0)+1,ge.insertBefore(E,F(f))}}}return Ge(f),!0}return f instanceof a&&!gr(f)||(z==="noscript"||z==="noembed"||z==="noframes")&&je(/<\/no(script|embed|frames)/i,f.innerHTML)?(Ge(f),!0):(De&&f.nodeType===ar.text&&(L=f.textContent,Rr([K,ke,oe],ge=>{L=sr(L,ge," ")}),f.textContent!==L&&(nr(e.removed,{element:f.cloneNode()}),f.textContent=L)),Ae(H.afterSanitizeElements,f,null),!1)},mr=function(f,L,z){if(rt&&(L==="id"||L==="name")&&(z in r||z in Y))return!1;if(!($e&&!nt[L]&&je(ee,L))){if(!(Ie&&je(Qe,L))){if(!(Re.attributeCheck instanceof Function&&Re.attributeCheck(L,f))){if(!he[L]||nt[L]){if(!(vt(f)&&(ae.tagNameCheck instanceof RegExp&&je(ae.tagNameCheck,f)||ae.tagNameCheck instanceof Function&&ae.tagNameCheck(f))&&(ae.attributeNameCheck instanceof RegExp&&je(ae.attributeNameCheck,L)||ae.attributeNameCheck instanceof Function&&ae.attributeNameCheck(L,f))||L==="is"&&ae.allowCustomizedBuiltInElements&&(ae.tagNameCheck instanceof RegExp&&je(ae.tagNameCheck,z)||ae.tagNameCheck instanceof Function&&ae.tagNameCheck(z))))return!1}else if(!d[L]){if(!je(Je,sr(z,ve,""))){if(!((L==="src"||L==="xlink:href"||L==="href")&&f!=="script"&&ca(z,"data:")===0&&X[f])){if(!(ze&&!je(Ue,sr(z,ve,"")))){if(z)return!1}}}}}}}return!0},vt=function(f){return f!=="annotation-xml"&&bn(f,Ee)},Wr=function(f){Ae(H.beforeSanitizeAttributes,f,null);let{attributes:L}=f;if(!L||jt(f))return;let z={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:he,forceKeepAttr:void 0},ge=L.length;for(;ge--;){let Ce=L[ge],{name:we,namespaceURI:qe,value:E}=Ce,W=_(we),ne=E,se=we==="value"?ne:da(ne);if(z.attrName=W,z.attrValue=se,z.keepAttr=!0,z.forceKeepAttr=void 0,Ae(H.uponSanitizeAttribute,f,z),se=z.attrValue,at&&(W==="id"||W==="name")&&(lt(we,f),se=me+se),He&&je(/((--!?|])>)|<\/(style|title|textarea)/i,se)){lt(we,f);continue}if(W==="attributename"&&bn(se,"href")){lt(we,f);continue}if(z.forceKeepAttr)continue;if(!z.keepAttr){lt(we,f);continue}if(!tt&&je(/\/>/i,se)){lt(we,f);continue}De&&Rr([K,ke,oe],Vn=>{se=sr(se,Vn," ")});let Vt=_(f.nodeName);if(!mr(Vt,W,se)){lt(we,f);continue}if(O&&typeof $=="object"&&typeof $.getAttributeType=="function"&&!qe)switch($.getAttributeType(Vt,W)){case"TrustedHTML":{se=O.createHTML(se);break}case"TrustedScriptURL":{se=O.createScriptURL(se);break}}if(se!==ne)try{qe?f.setAttributeNS(qe,we,se):f.setAttribute(we,se),jt(f)?Ge(f):Hs(e.removed)}catch{lt(we,f)}}Ae(H.afterSanitizeAttributes,f,null)},_r=function G(f){let L=null,z=Gt(f);for(Ae(H.beforeSanitizeShadowDOM,f,null);L=z.nextNode();)Ae(H.uponSanitizeShadowNode,L,null),Yt(L),Wr(L),L.content instanceof o&&G(L.content);Ae(H.afterSanitizeShadowDOM,f,null)};return e.sanitize=function(G){let f=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},L=null,z=null,ge=null,Ce=null;if(Q=!G,Q&&(G="<!-->"),typeof G!="string"&&!mt(G))if(typeof G.toString=="function"){if(G=G.toString(),typeof G!="string")throw or("dirty is not a string, aborting")}else throw or("toString is not a function");if(!e.isSupported)return G;if(ce||J(f),e.removed=[],typeof G=="string"&&(Fe=!1),Fe){if(G.nodeName){let E=_(G.nodeName);if(!fe[E]||Be[E])throw or("root node is forbidden and cannot be sanitized in-place")}}else if(G instanceof l)L=Wt("<!---->"),z=L.ownerDocument.importNode(G,!0),z.nodeType===ar.element&&z.nodeName==="BODY"||z.nodeName==="HTML"?L=z:L.appendChild(z);else{if(!Me&&!De&&!Oe&&G.indexOf("<")===-1)return O&&Ne?O.createHTML(G):G;if(L=Wt(G),!L)return Me?null:Ne?A:""}L&&xe&&Ge(L.firstChild);let we=Gt(Fe?G:L);for(;ge=we.nextNode();)Yt(ge),Wr(ge),ge.content instanceof o&&_r(ge.content);if(Fe)return G;if(Me){if(We)for(Ce=b.call(L.ownerDocument);L.firstChild;)Ce.appendChild(L.firstChild);else Ce=L;return(he.shadowroot||he.shadowrootmode)&&(Ce=P.call(n,Ce,!0)),Ce}let qe=Oe?L.outerHTML:L.innerHTML;return Oe&&fe["!doctype"]&&L.ownerDocument&&L.ownerDocument.doctype&&L.ownerDocument.doctype.name&&je(Qs,L.ownerDocument.doctype.name)&&(qe="<!DOCTYPE "+L.ownerDocument.doctype.name+`>
`+qe),De&&Rr([K,ke,oe],E=>{qe=sr(qe,E," ")}),O&&Ne?O.createHTML(qe):qe},e.setConfig=function(){let G=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};J(G),ce=!0},e.clearConfig=function(){k=null,ce=!1},e.isValidAttribute=function(G,f,L){k||J({});let z=_(G),ge=_(f);return mr(z,ge,L)},e.addHook=function(G,f){typeof f=="function"&&nr(H[G],f)},e.removeHook=function(G,f){if(f!==void 0){let L=aa(H[G],f);return L===-1?void 0:la(H[G],L,1)[0]}return Hs(H[G])},e.removeHooks=function(G){H[G]=[]},e.removeAllHooks=function(){H=Ks()},e}var eo=Js();var to={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},ro=t=>(...e)=>({_$litDirective$:t,values:e}),Dr=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,r,n){this._$Ct=e,this._$AM=r,this._$Ci=n}_$AS(e,r){return this.update(e,r)}update(e,r){return this.render(...r)}};var lr=class extends Dr{constructor(e){if(super(e),this.it=Se,e.type!==to.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===Se||e==null)return this._t=void 0,this.it=e;if(e===Tt)return e;if(typeof e!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;let r=[e];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}};lr.directiveName="unsafeHTML",lr.resultType=1;var no=ro(lr);function Cn(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Dt=Cn();function uo(t){Dt=t}var pr={exec:()=>null};function ie(t,e=""){let r=typeof t=="string"?t:t.source,n={replace:(s,o)=>{let i=typeof o=="string"?o:o.source;return i=i.replace(Ke.caret,"$1"),r=r.replace(s,i),n},getRegex:()=>new RegExp(r,e)};return n}var Sa=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),Ke={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:t=>new RegExp(`^( {0,3}${t})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}#`),htmlBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}<(?:[a-z].*>|!--)`,"i")},Ta=/^(?:[ \t]*(?:\n|$))+/,Aa=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Ea=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,fr=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Ca=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Rn=/(?:[*+-]|\d{1,9}[.)])/,po=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,fo=ie(po).replace(/bull/g,Rn).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Ra=ie(po).replace(/bull/g,Rn).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Ln=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,La=/^[^\n]+/,In=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,Ia=ie(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",In).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Da=ie(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Rn).getRegex(),Br="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Dn=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Oa=ie("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",Dn).replace("tag",Br).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),ho=ie(Ln).replace("hr",fr).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Br).getRegex(),Ma=ie(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",ho).getRegex(),On={blockquote:Ma,code:Aa,def:Ia,fences:Ea,heading:Ca,hr:fr,html:Oa,lheading:fo,list:Da,newline:Ta,paragraph:ho,table:pr,text:La},so=ie("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",fr).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Br).getRegex(),Na={...On,lheading:Ra,table:so,paragraph:ie(Ln).replace("hr",fr).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",so).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Br).getRegex()},Pa={...On,html:ie(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",Dn).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:pr,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:ie(Ln).replace("hr",fr).replace("heading",` *#{1,6} *[^
]`).replace("lheading",fo).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Fa=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Ba=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,go=/^( {2,}|\\)\n(?!\s*$)/,qa=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,qr=/[\p{P}\p{S}]/u,Mn=/[\s\p{P}\p{S}]/u,mo=/[^\s\p{P}\p{S}]/u,Ua=ie(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Mn).getRegex(),_o=/(?!~)[\p{P}\p{S}]/u,za=/(?!~)[\s\p{P}\p{S}]/u,Ha=/(?:[^\s\p{P}\p{S}]|~)/u,Wa=ie(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",Sa?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),bo=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,Ga=ie(bo,"u").replace(/punct/g,qr).getRegex(),ja=ie(bo,"u").replace(/punct/g,_o).getRegex(),wo="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Ya=ie(wo,"gu").replace(/notPunctSpace/g,mo).replace(/punctSpace/g,Mn).replace(/punct/g,qr).getRegex(),Va=ie(wo,"gu").replace(/notPunctSpace/g,Ha).replace(/punctSpace/g,za).replace(/punct/g,_o).getRegex(),Ka=ie("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,mo).replace(/punctSpace/g,Mn).replace(/punct/g,qr).getRegex(),Za=ie(/\\(punct)/,"gu").replace(/punct/g,qr).getRegex(),Xa=ie(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Qa=ie(Dn).replace("(?:-->|$)","-->").getRegex(),Ja=ie("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Qa).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Nr=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,el=ie(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Nr).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),ko=ie(/^!?\[(label)\]\[(ref)\]/).replace("label",Nr).replace("ref",In).getRegex(),yo=ie(/^!?\[(ref)\](?:\[\])?/).replace("ref",In).getRegex(),tl=ie("reflink|nolink(?!\\()","g").replace("reflink",ko).replace("nolink",yo).getRegex(),oo=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,Nn={_backpedal:pr,anyPunctuation:Za,autolink:Xa,blockSkip:Wa,br:go,code:Ba,del:pr,emStrongLDelim:Ga,emStrongRDelimAst:Ya,emStrongRDelimUnd:Ka,escape:Fa,link:el,nolink:yo,punctuation:Ua,reflink:ko,reflinkSearch:tl,tag:Ja,text:qa,url:pr},rl={...Nn,link:ie(/^!?\[(label)\]\((.*?)\)/).replace("label",Nr).getRegex(),reflink:ie(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Nr).getRegex()},Tn={...Nn,emStrongRDelimAst:Va,emStrongLDelim:ja,url:ie(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",oo).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:ie(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",oo).getRegex()},nl={...Tn,br:ie(go).replace("{2,}","*").getRegex(),text:ie(Tn.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Or={normal:On,gfm:Na,pedantic:Pa},cr={normal:Nn,gfm:Tn,breaks:nl,pedantic:rl},sl={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},io=t=>sl[t];function gt(t,e){if(e){if(Ke.escapeTest.test(t))return t.replace(Ke.escapeReplace,io)}else if(Ke.escapeTestNoEncode.test(t))return t.replace(Ke.escapeReplaceNoEncode,io);return t}function ao(t){try{t=encodeURI(t).replace(Ke.percentDecode,"%")}catch{return null}return t}function lo(t,e){let r=t.replace(Ke.findPipe,(o,i,l)=>{let a=!1,c=i;for(;--c>=0&&l[c]==="\\";)a=!a;return a?"|":" |"}),n=r.split(Ke.splitPipe),s=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),e)if(n.length>e)n.splice(e);else for(;n.length<e;)n.push("");for(;s<n.length;s++)n[s]=n[s].trim().replace(Ke.slashPipe,"|");return n}function dr(t,e,r){let n=t.length;if(n===0)return"";let s=0;for(;s<n;){let o=t.charAt(n-s-1);if(o===e&&!r)s++;else if(o!==e&&r)s++;else break}return t.slice(0,n-s)}function ol(t,e){if(t.indexOf(e[1])===-1)return-1;let r=0;for(let n=0;n<t.length;n++)if(t[n]==="\\")n++;else if(t[n]===e[0])r++;else if(t[n]===e[1]&&(r--,r<0))return n;return r>0?-2:-1}function co(t,e,r,n,s){let o=e.href,i=e.title||null,l=t[1].replace(s.other.outputLinkReplace,"$1");n.state.inLink=!0;let a={type:t[0].charAt(0)==="!"?"image":"link",raw:r,href:o,title:i,text:l,tokens:n.inlineTokens(l)};return n.state.inLink=!1,a}function il(t,e,r){let n=t.match(r.other.indentCodeCompensation);if(n===null)return e;let s=n[1];return e.split(`
`).map(o=>{let i=o.match(r.other.beginningSpace);if(i===null)return o;let[l]=i;return l.length>=s.length?o.slice(s.length):o}).join(`
`)}var Pr=class{constructor(t){pe(this,"options");pe(this,"rules");pe(this,"lexer");this.options=t||Dt}space(t){let e=this.rules.block.newline.exec(t);if(e&&e[0].length>0)return{type:"space",raw:e[0]}}code(t){let e=this.rules.block.code.exec(t);if(e){let r=e[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:e[0],codeBlockStyle:"indented",text:this.options.pedantic?r:dr(r,`
`)}}}fences(t){let e=this.rules.block.fences.exec(t);if(e){let r=e[0],n=il(r,e[3]||"",this.rules);return{type:"code",raw:r,lang:e[2]?e[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):e[2],text:n}}}heading(t){let e=this.rules.block.heading.exec(t);if(e){let r=e[2].trim();if(this.rules.other.endingHash.test(r)){let n=dr(r,"#");(this.options.pedantic||!n||this.rules.other.endingSpaceChar.test(n))&&(r=n.trim())}return{type:"heading",raw:e[0],depth:e[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(t){let e=this.rules.block.hr.exec(t);if(e)return{type:"hr",raw:dr(e[0],`
`)}}blockquote(t){let e=this.rules.block.blockquote.exec(t);if(e){let r=dr(e[0],`
`).split(`
`),n="",s="",o=[];for(;r.length>0;){let i=!1,l=[],a;for(a=0;a<r.length;a++)if(this.rules.other.blockquoteStart.test(r[a]))l.push(r[a]),i=!0;else if(!i)l.push(r[a]);else break;r=r.slice(a);let c=l.join(`
`),g=c.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");n=n?`${n}
${c}`:c,s=s?`${s}
${g}`:g;let m=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(g,o,!0),this.lexer.state.top=m,r.length===0)break;let w=o.at(-1);if(w?.type==="code")break;if(w?.type==="blockquote"){let $=w,v=$.raw+`
`+r.join(`
`),C=this.blockquote(v);o[o.length-1]=C,n=n.substring(0,n.length-$.raw.length)+C.raw,s=s.substring(0,s.length-$.text.length)+C.text;break}else if(w?.type==="list"){let $=w,v=$.raw+`
`+r.join(`
`),C=this.list(v);o[o.length-1]=C,n=n.substring(0,n.length-w.raw.length)+C.raw,s=s.substring(0,s.length-$.raw.length)+C.raw,r=v.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:n,tokens:o,text:s}}}list(t){let e=this.rules.block.list.exec(t);if(e){let r=e[1].trim(),n=r.length>1,s={type:"list",raw:"",ordered:n,start:n?+r.slice(0,-1):"",loose:!1,items:[]};r=n?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=n?r:"[*+-]");let o=this.rules.other.listItemRegex(r),i=!1;for(;t;){let a=!1,c="",g="";if(!(e=o.exec(t))||this.rules.block.hr.test(t))break;c=e[0],t=t.substring(c.length);let m=e[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,C=>" ".repeat(3*C.length)),w=t.split(`
`,1)[0],$=!m.trim(),v=0;if(this.options.pedantic?(v=2,g=m.trimStart()):$?v=e[1].length+1:(v=e[2].search(this.rules.other.nonSpaceChar),v=v>4?1:v,g=m.slice(v),v+=e[1].length),$&&this.rules.other.blankLine.test(w)&&(c+=w+`
`,t=t.substring(w.length+1),a=!0),!a){let C=this.rules.other.nextBulletRegex(v),N=this.rules.other.hrRegex(v),F=this.rules.other.fencesBeginRegex(v),B=this.rules.other.headingBeginRegex(v),U=this.rules.other.htmlBeginRegex(v);for(;t;){let O=t.split(`
`,1)[0],A;if(w=O,this.options.pedantic?(w=w.replace(this.rules.other.listReplaceNesting,"  "),A=w):A=w.replace(this.rules.other.tabCharGlobal,"    "),F.test(w)||B.test(w)||U.test(w)||C.test(w)||N.test(w))break;if(A.search(this.rules.other.nonSpaceChar)>=v||!w.trim())g+=`
`+A.slice(v);else{if($||m.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||F.test(m)||B.test(m)||N.test(m))break;g+=`
`+w}!$&&!w.trim()&&($=!0),c+=O+`
`,t=t.substring(O.length+1),m=A.slice(v)}}s.loose||(i?s.loose=!0:this.rules.other.doubleBlankLine.test(c)&&(i=!0)),s.items.push({type:"list_item",raw:c,task:!!this.options.gfm&&this.rules.other.listIsTask.test(g),loose:!1,text:g,tokens:[]}),s.raw+=c}let l=s.items.at(-1);if(l)l.raw=l.raw.trimEnd(),l.text=l.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let a of s.items){if(this.lexer.state.top=!1,a.tokens=this.lexer.blockTokens(a.text,[]),a.task){if(a.text=a.text.replace(this.rules.other.listReplaceTask,""),a.tokens[0]?.type==="text"||a.tokens[0]?.type==="paragraph"){a.tokens[0].raw=a.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),a.tokens[0].text=a.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let g=this.lexer.inlineQueue.length-1;g>=0;g--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[g].src)){this.lexer.inlineQueue[g].src=this.lexer.inlineQueue[g].src.replace(this.rules.other.listReplaceTask,"");break}}let c=this.rules.other.listTaskCheckbox.exec(a.raw);if(c){let g={type:"checkbox",raw:c[0]+" ",checked:c[0]!=="[ ]"};a.checked=g.checked,s.loose?a.tokens[0]&&["paragraph","text"].includes(a.tokens[0].type)&&"tokens"in a.tokens[0]&&a.tokens[0].tokens?(a.tokens[0].raw=g.raw+a.tokens[0].raw,a.tokens[0].text=g.raw+a.tokens[0].text,a.tokens[0].tokens.unshift(g)):a.tokens.unshift({type:"paragraph",raw:g.raw,text:g.raw,tokens:[g]}):a.tokens.unshift(g)}}if(!s.loose){let c=a.tokens.filter(m=>m.type==="space"),g=c.length>0&&c.some(m=>this.rules.other.anyLine.test(m.raw));s.loose=g}}if(s.loose)for(let a of s.items){a.loose=!0;for(let c of a.tokens)c.type==="text"&&(c.type="paragraph")}return s}}html(t){let e=this.rules.block.html.exec(t);if(e)return{type:"html",block:!0,raw:e[0],pre:e[1]==="pre"||e[1]==="script"||e[1]==="style",text:e[0]}}def(t){let e=this.rules.block.def.exec(t);if(e){let r=e[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),n=e[2]?e[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=e[3]?e[3].substring(1,e[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):e[3];return{type:"def",tag:r,raw:e[0],href:n,title:s}}}table(t){let e=this.rules.block.table.exec(t);if(!e||!this.rules.other.tableDelimiter.test(e[2]))return;let r=lo(e[1]),n=e[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=e[3]?.trim()?e[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:e[0],header:[],align:[],rows:[]};if(r.length===n.length){for(let i of n)this.rules.other.tableAlignRight.test(i)?o.align.push("right"):this.rules.other.tableAlignCenter.test(i)?o.align.push("center"):this.rules.other.tableAlignLeft.test(i)?o.align.push("left"):o.align.push(null);for(let i=0;i<r.length;i++)o.header.push({text:r[i],tokens:this.lexer.inline(r[i]),header:!0,align:o.align[i]});for(let i of s)o.rows.push(lo(i,o.header.length).map((l,a)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:o.align[a]})));return o}}lheading(t){let e=this.rules.block.lheading.exec(t);if(e)return{type:"heading",raw:e[0],depth:e[2].charAt(0)==="="?1:2,text:e[1],tokens:this.lexer.inline(e[1])}}paragraph(t){let e=this.rules.block.paragraph.exec(t);if(e){let r=e[1].charAt(e[1].length-1)===`
`?e[1].slice(0,-1):e[1];return{type:"paragraph",raw:e[0],text:r,tokens:this.lexer.inline(r)}}}text(t){let e=this.rules.block.text.exec(t);if(e)return{type:"text",raw:e[0],text:e[0],tokens:this.lexer.inline(e[0])}}escape(t){let e=this.rules.inline.escape.exec(t);if(e)return{type:"escape",raw:e[0],text:e[1]}}tag(t){let e=this.rules.inline.tag.exec(t);if(e)return!this.lexer.state.inLink&&this.rules.other.startATag.test(e[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(e[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(e[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(e[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:e[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:e[0]}}link(t){let e=this.rules.inline.link.exec(t);if(e){let r=e[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;let o=dr(r.slice(0,-1),"\\");if((r.length-o.length)%2===0)return}else{let o=ol(e[2],"()");if(o===-2)return;if(o>-1){let i=(e[0].indexOf("!")===0?5:4)+e[1].length+o;e[2]=e[2].substring(0,o),e[0]=e[0].substring(0,i).trim(),e[3]=""}}let n=e[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(n);o&&(n=o[1],s=o[3])}else s=e[3]?e[3].slice(1,-1):"";return n=n.trim(),this.rules.other.startAngleBracket.test(n)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?n=n.slice(1):n=n.slice(1,-1)),co(e,{href:n&&n.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},e[0],this.lexer,this.rules)}}reflink(t,e){let r;if((r=this.rules.inline.reflink.exec(t))||(r=this.rules.inline.nolink.exec(t))){let n=(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=e[n.toLowerCase()];if(!s){let o=r[0].charAt(0);return{type:"text",raw:o,text:o}}return co(r,s,r[0],this.lexer,this.rules)}}emStrong(t,e,r=""){let n=this.rules.inline.emStrongLDelim.exec(t);if(!(!n||n[3]&&r.match(this.rules.other.unicodeAlphaNumeric))&&(!(n[1]||n[2])||!r||this.rules.inline.punctuation.exec(r))){let s=[...n[0]].length-1,o,i,l=s,a=0,c=n[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(c.lastIndex=0,e=e.slice(-1*t.length+s);(n=c.exec(e))!=null;){if(o=n[1]||n[2]||n[3]||n[4]||n[5]||n[6],!o)continue;if(i=[...o].length,n[3]||n[4]){l+=i;continue}else if((n[5]||n[6])&&s%3&&!((s+i)%3)){a+=i;continue}if(l-=i,l>0)continue;i=Math.min(i,i+l+a);let g=[...n[0]][0].length,m=t.slice(0,s+n.index+g+i);if(Math.min(s,i)%2){let $=m.slice(1,-1);return{type:"em",raw:m,text:$,tokens:this.lexer.inlineTokens($)}}let w=m.slice(2,-2);return{type:"strong",raw:m,text:w,tokens:this.lexer.inlineTokens(w)}}}}codespan(t){let e=this.rules.inline.code.exec(t);if(e){let r=e[2].replace(this.rules.other.newLineCharGlobal," "),n=this.rules.other.nonSpaceChar.test(r),s=this.rules.other.startingSpaceChar.test(r)&&this.rules.other.endingSpaceChar.test(r);return n&&s&&(r=r.substring(1,r.length-1)),{type:"codespan",raw:e[0],text:r}}}br(t){let e=this.rules.inline.br.exec(t);if(e)return{type:"br",raw:e[0]}}del(t){let e=this.rules.inline.del.exec(t);if(e)return{type:"del",raw:e[0],text:e[2],tokens:this.lexer.inlineTokens(e[2])}}autolink(t){let e=this.rules.inline.autolink.exec(t);if(e){let r,n;return e[2]==="@"?(r=e[1],n="mailto:"+r):(r=e[1],n=r),{type:"link",raw:e[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}url(t){let e;if(e=this.rules.inline.url.exec(t)){let r,n;if(e[2]==="@")r=e[0],n="mailto:"+r;else{let s;do s=e[0],e[0]=this.rules.inline._backpedal.exec(e[0])?.[0]??"";while(s!==e[0]);r=e[0],e[1]==="www."?n="http://"+e[0]:n=e[0]}return{type:"link",raw:e[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(t){let e=this.rules.inline.text.exec(t);if(e){let r=this.lexer.state.inRawBlock;return{type:"text",raw:e[0],text:e[0],escaped:r}}}},ut=class An{constructor(e){pe(this,"tokens");pe(this,"options");pe(this,"state");pe(this,"inlineQueue");pe(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=e||Dt,this.options.tokenizer=this.options.tokenizer||new Pr,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let r={other:Ke,block:Or.normal,inline:cr.normal};this.options.pedantic?(r.block=Or.pedantic,r.inline=cr.pedantic):this.options.gfm&&(r.block=Or.gfm,this.options.breaks?r.inline=cr.breaks:r.inline=cr.gfm),this.tokenizer.rules=r}static get rules(){return{block:Or,inline:cr}}static lex(e,r){return new An(r).lex(e)}static lexInline(e,r){return new An(r).inlineTokens(e)}lex(e){e=e.replace(Ke.carriageReturn,`
`),this.blockTokens(e,this.tokens);for(let r=0;r<this.inlineQueue.length;r++){let n=this.inlineQueue[r];this.inlineTokens(n.src,n.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(e,r=[],n=!1){for(this.options.pedantic&&(e=e.replace(Ke.tabCharGlobal,"    ").replace(Ke.spaceLine,""));e;){let s;if(this.options.extensions?.block?.some(i=>(s=i.call({lexer:this},e,r))?(e=e.substring(s.raw.length),r.push(s),!0):!1))continue;if(s=this.tokenizer.space(e)){e=e.substring(s.raw.length);let i=r.at(-1);s.raw.length===1&&i!==void 0?i.raw+=`
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
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):r.push(s);continue}if(e){let i="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(i);break}else throw new Error(i)}}return this.state.top=!0,r}inline(e,r=[]){return this.inlineQueue.push({src:e,tokens:r}),r}inlineTokens(e,r=[]){let n=e,s=null;if(this.tokens.links){let a=Object.keys(this.tokens.links);if(a.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(n))!=null;)a.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(n=n.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(n))!=null;)n=n.slice(0,s.index)+"++"+n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(n))!=null;)o=s[2]?s[2].length:0,n=n.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let i=!1,l="";for(;e;){i||(l=""),i=!1;let a;if(this.options.extensions?.inline?.some(g=>(a=g.call({lexer:this},e,r))?(e=e.substring(a.raw.length),r.push(a),!0):!1))continue;if(a=this.tokenizer.escape(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.tag(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.link(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(a.raw.length);let g=r.at(-1);a.type==="text"&&g?.type==="text"?(g.raw+=a.raw,g.text+=a.text):r.push(a);continue}if(a=this.tokenizer.emStrong(e,n,l)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.codespan(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.br(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.del(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.autolink(e)){e=e.substring(a.raw.length),r.push(a);continue}if(!this.state.inLink&&(a=this.tokenizer.url(e))){e=e.substring(a.raw.length),r.push(a);continue}let c=e;if(this.options.extensions?.startInline){let g=1/0,m=e.slice(1),w;this.options.extensions.startInline.forEach($=>{w=$.call({lexer:this},m),typeof w=="number"&&w>=0&&(g=Math.min(g,w))}),g<1/0&&g>=0&&(c=e.substring(0,g+1))}if(a=this.tokenizer.inlineText(c)){e=e.substring(a.raw.length),a.raw.slice(-1)!=="_"&&(l=a.raw.slice(-1)),i=!0;let g=r.at(-1);g?.type==="text"?(g.raw+=a.raw,g.text+=a.text):r.push(a);continue}if(e){let g="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(g);break}else throw new Error(g)}}return r}},Fr=class{constructor(t){pe(this,"options");pe(this,"parser");this.options=t||Dt}space(t){return""}code({text:t,lang:e,escaped:r}){let n=(e||"").match(Ke.notSpaceStart)?.[0],s=t.replace(Ke.endingNewline,"")+`
`;return n?'<pre><code class="language-'+gt(n)+'">'+(r?s:gt(s,!0))+`</code></pre>
`:"<pre><code>"+(r?s:gt(s,!0))+`</code></pre>
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
`}strong({tokens:t}){return`<strong>${this.parser.parseInline(t)}</strong>`}em({tokens:t}){return`<em>${this.parser.parseInline(t)}</em>`}codespan({text:t}){return`<code>${gt(t,!0)}</code>`}br(t){return"<br>"}del({tokens:t}){return`<del>${this.parser.parseInline(t)}</del>`}link({href:t,title:e,tokens:r}){let n=this.parser.parseInline(r),s=ao(t);if(s===null)return n;t=s;let o='<a href="'+t+'"';return e&&(o+=' title="'+gt(e)+'"'),o+=">"+n+"</a>",o}image({href:t,title:e,text:r,tokens:n}){n&&(r=this.parser.parseInline(n,this.parser.textRenderer));let s=ao(t);if(s===null)return gt(r);t=s;let o=`<img src="${t}" alt="${r}"`;return e&&(o+=` title="${gt(e)}"`),o+=">",o}text(t){return"tokens"in t&&t.tokens?this.parser.parseInline(t.tokens):"escaped"in t&&t.escaped?t.text:gt(t.text)}},Pn=class{strong({text:t}){return t}em({text:t}){return t}codespan({text:t}){return t}del({text:t}){return t}html({text:t}){return t}text({text:t}){return t}link({text:t}){return""+t}image({text:t}){return""+t}br(){return""}checkbox({raw:t}){return t}},pt=class En{constructor(e){pe(this,"options");pe(this,"renderer");pe(this,"textRenderer");this.options=e||Dt,this.options.renderer=this.options.renderer||new Fr,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Pn}static parse(e,r){return new En(r).parse(e)}static parseInline(e,r){return new En(r).parseInline(e)}parse(e){let r="";for(let n=0;n<e.length;n++){let s=e[n];if(this.options.extensions?.renderers?.[s.type]){let i=s,l=this.options.extensions.renderers[i.type].call({parser:this},i);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(i.type)){r+=l||"";continue}}let o=s;switch(o.type){case"space":{r+=this.renderer.space(o);break}case"hr":{r+=this.renderer.hr(o);break}case"heading":{r+=this.renderer.heading(o);break}case"code":{r+=this.renderer.code(o);break}case"table":{r+=this.renderer.table(o);break}case"blockquote":{r+=this.renderer.blockquote(o);break}case"list":{r+=this.renderer.list(o);break}case"checkbox":{r+=this.renderer.checkbox(o);break}case"html":{r+=this.renderer.html(o);break}case"def":{r+=this.renderer.def(o);break}case"paragraph":{r+=this.renderer.paragraph(o);break}case"text":{r+=this.renderer.text(o);break}default:{let i='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return r}parseInline(e,r=this.renderer){let n="";for(let s=0;s<e.length;s++){let o=e[s];if(this.options.extensions?.renderers?.[o.type]){let l=this.options.extensions.renderers[o.type].call({parser:this},o);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){n+=l||"";continue}}let i=o;switch(i.type){case"escape":{n+=r.text(i);break}case"html":{n+=r.html(i);break}case"link":{n+=r.link(i);break}case"image":{n+=r.image(i);break}case"checkbox":{n+=r.checkbox(i);break}case"strong":{n+=r.strong(i);break}case"em":{n+=r.em(i);break}case"codespan":{n+=r.codespan(i);break}case"br":{n+=r.br(i);break}case"del":{n+=r.del(i);break}case"text":{n+=r.text(i);break}default:{let l='Token with "'+i.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return n}},Mr,ur=(Mr=class{constructor(t){pe(this,"options");pe(this,"block");this.options=t||Dt}preprocess(t){return t}postprocess(t){return t}processAllTokens(t){return t}emStrongMask(t){return t}provideLexer(){return this.block?ut.lex:ut.lexInline}provideParser(){return this.block?pt.parse:pt.parseInline}},pe(Mr,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),pe(Mr,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),Mr),al=class{constructor(...t){pe(this,"defaults",Cn());pe(this,"options",this.setOptions);pe(this,"parse",this.parseMarkdown(!0));pe(this,"parseInline",this.parseMarkdown(!1));pe(this,"Parser",pt);pe(this,"Renderer",Fr);pe(this,"TextRenderer",Pn);pe(this,"Lexer",ut);pe(this,"Tokenizer",Pr);pe(this,"Hooks",ur);this.use(...t)}walkTokens(t,e){let r=[];for(let n of t)switch(r=r.concat(e.call(this,n)),n.type){case"table":{let s=n;for(let o of s.header)r=r.concat(this.walkTokens(o.tokens,e));for(let o of s.rows)for(let i of o)r=r.concat(this.walkTokens(i.tokens,e));break}case"list":{let s=n;r=r.concat(this.walkTokens(s.items,e));break}default:{let s=n;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let i=s[o].flat(1/0);r=r.concat(this.walkTokens(i,e))}):s.tokens&&(r=r.concat(this.walkTokens(s.tokens,e)))}}return r}use(...t){let e=this.defaults.extensions||{renderers:{},childTokens:{}};return t.forEach(r=>{let n={...r};if(n.async=this.defaults.async||n.async||!1,r.extensions&&(r.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=e.renderers[s.name];o?e.renderers[s.name]=function(...i){let l=s.renderer.apply(this,i);return l===!1&&(l=o.apply(this,i)),l}:e.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=e[s.level];o?o.unshift(s.tokenizer):e[s.level]=[s.tokenizer],s.start&&(s.level==="block"?e.startBlock?e.startBlock.push(s.start):e.startBlock=[s.start]:s.level==="inline"&&(e.startInline?e.startInline.push(s.start):e.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(e.childTokens[s.name]=s.childTokens)}),n.extensions=e),r.renderer){let s=this.defaults.renderer||new Fr(this.defaults);for(let o in r.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let i=o,l=r.renderer[i],a=s[i];s[i]=(...c)=>{let g=l.apply(s,c);return g===!1&&(g=a.apply(s,c)),g||""}}n.renderer=s}if(r.tokenizer){let s=this.defaults.tokenizer||new Pr(this.defaults);for(let o in r.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let i=o,l=r.tokenizer[i],a=s[i];s[i]=(...c)=>{let g=l.apply(s,c);return g===!1&&(g=a.apply(s,c)),g}}n.tokenizer=s}if(r.hooks){let s=this.defaults.hooks||new ur;for(let o in r.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let i=o,l=r.hooks[i],a=s[i];ur.passThroughHooks.has(o)?s[i]=c=>{if(this.defaults.async&&ur.passThroughHooksRespectAsync.has(o))return(async()=>{let m=await l.call(s,c);return a.call(s,m)})();let g=l.call(s,c);return a.call(s,g)}:s[i]=(...c)=>{if(this.defaults.async)return(async()=>{let m=await l.apply(s,c);return m===!1&&(m=await a.apply(s,c)),m})();let g=l.apply(s,c);return g===!1&&(g=a.apply(s,c)),g}}n.hooks=s}if(r.walkTokens){let s=this.defaults.walkTokens,o=r.walkTokens;n.walkTokens=function(i){let l=[];return l.push(o.call(this,i)),s&&(l=l.concat(s.call(this,i))),l}}this.defaults={...this.defaults,...n}}),this}setOptions(t){return this.defaults={...this.defaults,...t},this}lexer(t,e){return ut.lex(t,e??this.defaults)}parser(t,e){return pt.parse(t,e??this.defaults)}parseMarkdown(t){return(e,r)=>{let n={...r},s={...this.defaults,...n},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&n.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof e>"u"||e===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof e!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(e)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=t),s.async)return(async()=>{let i=s.hooks?await s.hooks.preprocess(e):e,l=await(s.hooks?await s.hooks.provideLexer():t?ut.lex:ut.lexInline)(i,s),a=s.hooks?await s.hooks.processAllTokens(l):l;s.walkTokens&&await Promise.all(this.walkTokens(a,s.walkTokens));let c=await(s.hooks?await s.hooks.provideParser():t?pt.parse:pt.parseInline)(a,s);return s.hooks?await s.hooks.postprocess(c):c})().catch(o);try{s.hooks&&(e=s.hooks.preprocess(e));let i=(s.hooks?s.hooks.provideLexer():t?ut.lex:ut.lexInline)(e,s);s.hooks&&(i=s.hooks.processAllTokens(i)),s.walkTokens&&this.walkTokens(i,s.walkTokens);let l=(s.hooks?s.hooks.provideParser():t?pt.parse:pt.parseInline)(i,s);return s.hooks&&(l=s.hooks.postprocess(l)),l}catch(i){return o(i)}}}onError(t,e){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,t){let n="<p>An error occurred:</p><pre>"+gt(r.message+"",!0)+"</pre>";return e?Promise.resolve(n):n}if(e)return Promise.reject(r);throw r}}},It=new al;function le(t,e){return It.parse(t,e)}le.options=le.setOptions=function(t){return It.setOptions(t),le.defaults=It.defaults,uo(le.defaults),le};le.getDefaults=Cn;le.defaults=Dt;le.use=function(...t){return It.use(...t),le.defaults=It.defaults,uo(le.defaults),le};le.walkTokens=function(t,e){return It.walkTokens(t,e)};le.parseInline=It.parseInline;le.Parser=pt;le.parser=pt.parse;le.Renderer=Fr;le.TextRenderer=Pn;le.Lexer=ut;le.lexer=ut.lex;le.Tokenizer=Pr;le.Hooks=ur;le.parse=le;var _d=le.options,bd=le.setOptions,wd=le.use,kd=le.walkTokens,yd=le.parseInline;var vd=pt.parse,$d=ut.lex;function vo(t){let e=le.parse(t),r=eo.sanitize(e);return no(r)}function ll(t){return String(t||"").replace(/^docs\/(superpowers\/)?/,"")}function $o(t,e){let r=e.getWorkspacePath,n=e.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",i="",l="";function a(v){v.key==="Escape"&&s&&(v.preventDefault(),w())}document.addEventListener("keydown",a);function c(){return s?p`
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
            ${o==="loading"?p`<div class="mv__status">불러오는 중…</div>`:o==="error"?p`<div class="mv__status mv__status--error">
                    ${l||"\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}
                  </div>`:vo(i)}
          </div>
        </div>
      </div>
    `:p``}function g(){de(c(),t)}async function m(v){s=v,o="loading",i="",l="",g();let C=r?r():"";if(!C){o="error",l="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",g();return}if(!n){o="error",l="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",g();return}let N="/api/doc?workspace="+encodeURIComponent(C)+"&path="+encodeURIComponent(v);try{let F=await n(N),B=await F.json().catch(()=>({}));if(!F.ok||!B||B.ok!==!0){o="error",l="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(B&&B.error||F.status)+")",g();return}i=String(B.content||""),o="ready",g()}catch{o="error",l="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",g()}}function w(){s=null,de(p``,t)}function $(){document.removeEventListener("keydown",a),w()}return{open:m,close:w,destroy:$}}var cl={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function dl(t){if(typeof t!="number"||!Number.isFinite(t))return"";let e=new Date(t),r=String(e.getHours()).padStart(2,"0"),n=String(e.getMinutes()).padStart(2,"0");return`${r}:${n}`}function xo(t,e={}){let r=Array.isArray(t)?t:[];if(r.length===0)return p`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let n=new Set;for(let i of r)i&&typeof i.resumed_from=="string"&&i.resumed_from.length>0&&n.add(i.resumed_from);let s=i=>{if(!(i.status==="failed"||i.status==="orphaned"))return"";let a=typeof i.session_id=="string"&&i.session_id.length>0,c=n.has(i.attempt_id),g=a&&!c,m=a?c?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return p`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${i.attempt_id}
      ?disabled=${!g}
      title=${m}
      @click=${w=>{w.stopPropagation(),g&&e.onResume&&e.onResume(i.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},o=i=>{if(!(i.status==="failed"||i.status==="orphaned")||typeof i.cause!="string"||i.cause==="")return"";let a=i.cause_detail,c=a&&typeof a.reason=="string"&&a.reason.length>0?typeof a.command=="string"&&a.command.length>0?`${a.reason} \xB7 ${a.command}`:a.reason:i.cause;return p`<div class="detail-session__cause" title=${c}>
      ${i.cause}
    </div>`};return p`
    <div class="detail-section-label">세션 이력</div>
    <div class="detail-sessions" data-seam="session-history">
      ${r.map(i=>p`<div class="detail-session-row">
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
              ${i.resumed_from?p`<span
                    class="detail-session__resumed"
                    title=${`\uC774\uC5B4\uBC1B\uC740 \uC138\uC158 (from ${i.resumed_from})`}
                    >↻</span
                  >`:""}
              <span class="detail-session__meta"
                >${[i.runner,i.model].filter(Boolean).join(" \xB7 ")}</span
              >
              ${i.session_id?p`<span class="detail-session__sid" title=${i.session_id}
                    >${String(i.session_id).slice(0,8)}</span
                  >`:""}
              <span class="detail-session__time"
                >${dl(i.started_at)}</span
              >
            </button>
            ${s(i)} ${o(i)}
          </div>`)}
    </div>
  `}var ul=["open","in_progress","deferred","resolved","closed"],pl=[0,1,2,3,4];function So(t,e){let r=e.issueStores,n=e.onClose,s=e.transport,o=e.onNavigate,i=e.queueStore,l=e.sessionLogStore,a=null,c=null,g={},m=!1,w=!1,$="",v="",C="";function N(){m=!1,w=!1,$="",v="",C=""}let F=document.createElement("div");F.className="md-viewer-root",document.body.appendChild(F);let B=$o(F,{getWorkspacePath:e.getWorkspacePath||(()=>"")}),U=document.createElement("div");U.className="session-log-root",document.body.appendChild(U);let O=Er(U,{transport:s?(u,S)=>Promise.resolve(s(u,S)):void 0,sessionLogStore:l});function A(){if(!i||!a)return[];let u=i.get();return(u&&u.attempts?Object.values(u.attempts):[]).filter(y=>y&&y.bead_id===a).sort((y,I)=>(I.started_at||0)-(y.started_at||0)).map(y=>({attempt_id:y.attempt_id,bead_id:y.bead_id,status:y.status,started_at:typeof y.started_at=="number"?y.started_at:null,runner:y.runner||null,model:y.model||null,session_id:y.session_id||null,resumed_from:y.resumed_from||null,dismissed_at:typeof y.dismissed_at=="number"?y.dismissed_at:null,cause:typeof y.cause=="string"?y.cause:null,cause_detail:y.cause_detail||null}))}function T(u){let S=i?i.get():null,y=S&&S.attempts?S.attempts[u]:null;O.open({attempt_id:u,meta:y?{runner:y.runner||void 0,model:y.model||void 0,effort:y.effort||void 0,status:y.status||void 0,session_id:y.session_id||void 0}:{}})}async function x(u){if(!s||!u)return;let S=()=>{let I=i?i.get():null;return I&&typeof I.revision=="number"?I.revision:0},y=await s("worker-attempt-resume",{attempt_id:u,expected_revision:S()});if(y&&y.conflict){let I=y.queue&&typeof y.queue.revision=="number"?y.queue.revision:S();y=await s("worker-attempt-resume",{attempt_id:u,expected_revision:I})}y&&y.resumed===!1&&!y.conflict&&y.reason&&Z(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${y.reason}`,"error",2400)}let b={onOpen:T,onResume:x};function M(){let u=i?i.get():null,S=u&&u.exec_defaults;return S&&typeof S=="object"?S:{}}let P=null;r&&r.subscribe&&(P=r.subscribe(()=>ke()));let H=null;i&&typeof i.subscribe=="function"&&(H=i.subscribe(()=>{a&&h()}));function K(u){u.key==="Escape"&&a&&(u.preventDefault(),n())}document.addEventListener("keydown",K);function ke(){if(a){if(r&&typeof r.snapshotFor=="function"){let u=r.snapshotFor("detail:"+a)||[];c=u.find(y=>y&&y.id===a)||u[0]||c}h()}}function oe(u){Lt(u).then(S=>{S?Z("\uBCF5\uC0AC\uB428","success",1200):Z("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function ee(u){u.preventDefault(),u.stopPropagation(),a&&oe(a)}function Qe(u,S){u.preventDefault(),u.stopPropagation(),oe(S)}function Ue(u,S){u.preventDefault(),u.stopPropagation(),B.open(S)}function ve(u,S){g[u]=S,h(),!(!s||!a)&&Promise.resolve(s("update-exec-settings",{id:a,key:u,value:S})).catch(()=>{Z("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}async function Ee(u,S,y){if(!s||!a)return!1;try{let I=await Promise.resolve(s(u,S)),Q=Array.isArray(I)?I[0]:I;return Q&&typeof Q=="object"&&Q.id?(c=Q,!0):(Z(y,"error"),!1)}catch{return Z(y,"error"),!1}}function Je(u){setTimeout(()=>{try{let S=t.querySelector(u);S&&typeof S.focus=="function"&&S.focus()}catch{}},0)}function fe(){m=!0,$=c&&c.title||"",h(),Je('.detail-edit__input[data-edit="title"]')}function it(u){$=u.target.value}function he(){m=!1,$="",h()}function et(){Ee("edit-text",{id:a,field:"title",value:$},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(S=>{S&&(m=!1,$=""),h()})}function ae(){w=!0,v=c&&c.description||"",h(),Je('.detail-edit__textarea[data-edit="description"]')}function Be(u){v=u.target.value}function nt(){w=!1,v="",h()}function Re(){Ee("edit-text",{id:a,field:"description",value:v},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(S=>{S&&(w=!1,v=""),h()})}function Ie(u,S,y,I){if(u.key==="Escape"){u.stopPropagation(),y();return}u.key==="Enter"&&(!I||u.ctrlKey||u.metaKey)&&(u.preventDefault(),S())}function $e(u){let S=u.target.value;Ee("update-status",{id:a,status:S},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>h())}function ze(u){let S=Number(u.target.value);Ee("update-priority",{id:a,priority:S},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>h())}function tt(u){C=u.target.value}function De(){let u=C.trim();u.length!==0&&Ee("label-add",{id:a,label:u},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(S=>{S&&(C=""),h()})}function He(u){if(u.key==="Escape"){u.stopPropagation(),C="",h();return}u.key==="Enter"&&(u.preventDefault(),De())}function Oe(u){Ee("label-remove",{id:a,label:u},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>h())}let ce={onCopyPath:Qe,onOpenDoc:Ue},xe={onChange:ve};function Me(u){return typeof u=="string"?u:u&&typeof u=="object"?String(u.id||u.to||u.issue_id||u.depends_on||""):""}function We(u){switch(u&&typeof u=="object"?String(u.dependency_type||u.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function Ne(u){let y=(Array.isArray(u.dependencies)?u.dependencies:[]).map(I=>({id:Me(I),icon:We(I)})).filter(I=>I.id.length>0);return p`
      <div class="detail-section-label">의존성</div>
      ${y.length===0?p`<div class="detail-empty">의존성 없음</div>`:p`<div class="detail-deps">
            ${y.map(I=>o?p`<button
                    type="button"
                    class="detail-dep detail-dep--link"
                    @click=${()=>o(I.id)}
                  >
                    ${I.icon?`${I.icon} `:""}${I.id}
                  </button>`:p`<span class="detail-dep"
                    >${I.icon?`${I.icon} `:""}${I.id}</span
                  >`)}
          </div>`}
    `}function rt(u){let S=u.metadata||{},y=u.workflow||{},I=y.stages||{},Q=I.spec&&I.spec.stale,q=I.impl&&I.impl.stale,ue=y.route_source==="derived",Te=y.route||S.route||"\u2014";return p`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${ue?" detail-kv__v--derived":""}"
          title=${ue?"route \uCD94\uB860\uAC12 (metadata \uBBF8\uD540)":"route"}
          >${ue&&y.route?`${Te} ? (\uCD94\uB860)`:Te}</span
        >
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">spec_review</span>
        <span class="detail-kv__v"
          >${S.spec_review||"\uC5C6\uC74C"}${Q?" \xB7 stale":""}</span
        >
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">impl_review</span>
        <span class="detail-kv__v"
          >${S.impl_review||"\uC5C6\uC74C"}${q?" \xB7 stale":""}</span
        >
      </div>
      ${S.pr_url?p`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${S.pr_url}</span>
          </div>`:""}
    `}let at={route:["spec_backed","full_plan"]};async function me(u,S){let y=S.target.value;if(u==="route"&&c&&c.metadata&&c.metadata.route==="full_plan"&&y!=="full_plan"&&!window.confirm(`full_plan \u2192 ${y||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){h();return}await Ee("update-workflow-meta",{id:a,key:u,value:y},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),h()}function Pe(u){let S=u.metadata||{};return p` ${((I,Q)=>{let q=at[I],ue=typeof S[I]=="string"?S[I]:"";return p`<div class="detail-kv">
        <span class="detail-kv__k">${I}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${I}
          data-edit=${`wfmeta-${I}`}
          @change=${Te=>me(I,Te)}
        >
          <option value="" ?selected=${!q.includes(ue)}>
            ${Q}
          </option>
          ${q.map(Te=>p`<option value=${Te} ?selected=${ue===Te}>${Te}</option>`)}
        </select>
      </div>`})("route","(\uBBF8\uC124\uC815 \xB7 \uCD94\uB860)")} `}function Fe(u){return m?p`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${$}
            @input=${it}
            @keydown=${S=>Ie(S,et,he,!1)}
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
              @click=${he}
            >
              취소
            </button>
          </div>
        </div>
      `:p`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${u}</h2>
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${fe}
        >
          ✎
        </button>
      </div>
    `}function Le(u){let S=bt(u.created_at),y=bt(u.updated_at);return!S&&!y?p``:p`
      ${S?p`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${S}</span>
          </div>`:""}
      ${y?p`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${y}</span>
          </div>`:""}
    `}function R(u,S){return p`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${$e}
        >
          ${ul.map(y=>p`<option value=${y} ?selected=${y===u}>${y}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${ze}
        >
          ${pl.map(y=>p`<option value=${String(y)} ?selected=${y===S}>
                P${y}
              </option>`)}
        </select>
      </div>
    `}function D(u){return p`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${w?"":p`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${ae}
            >
              ✎
            </button>`}
      </div>
      ${w?p`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${v}
              @input=${Be}
              @keydown=${S=>Ie(S,Re,nt,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${Re}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${nt}
              >
                취소
              </button>
            </div>
          </div>`:p`<div class="detail-overlay__desc">
            ${u||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function X(u){let S=typeof u.notes=="string"?u.notes:"";return S.trim().length===0?p``:p`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${S}</div>
    `}function V(u){let S=Array.isArray(u.labels)?u.labels:[];return p`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${S.map(y=>p`<span class="detail-label-chip"
              >${y}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${y}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+y}
                @click=${()=>Oe(y)}
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
            @input=${tt}
            @keydown=${He}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${De}
          >
            추가
          </button>
        </span>
      </div>
    `}function d(){if(!a)return p``;let u=c||{},S=String(u.id||a),y=u.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",I=u.status||"open",Q=typeof u.priority=="number"?Math.max(0,Math.min(4,u.priority)):"",q=u.description||"",ue={...u,metadata:{...u.metadata||{},...g}};return p`
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
            @click=${ee}
          >
            ${S}
          </button>
          ${Fe(y)} ${R(I,Q)}
          ${Le(u)} ${D(q)}
          ${X(u)} ${V(u)} ${Ne(u)}
          ${rt(u)} ${Pe(u)}
          ${qs(u,ce)}
          ${Us(ue,xe,M())}
          ${xo(A(),b)}
        </div>
      </div>
    `}function h(){de(d(),t)}return{load(u){u!==a&&(g={},N()),a=u,c=null,ke()},clear(){a=null,c=null,g={},N(),B.close(),O.close(),de(p``,t)},destroy(){P&&(P(),P=null),H&&(H(),H=null),document.removeEventListener("keydown",K),B.destroy(),F.parentNode&&F.parentNode.removeChild(F),O.destroy(),U.parentNode&&U.parentNode.removeChild(U),a=null,c=null,de(p``,t)}}}var fl=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function To(t,e){return an(t,e)?"shown":e.hidden_labels.includes(t)?"hidden_exact":"hidden_prefix"}function hl(t,e,r){if(!r)return{hidden_labels:e.hidden_labels.includes(t)?e.hidden_labels:[...e.hidden_labels,t],visible_labels:e.visible_labels.filter(o=>o!==t)};let n=e.hidden_labels.filter(o=>o!==t);return e.hidden_prefixes.some(o=>o.length>0&&t.startsWith(o))?{hidden_labels:n,visible_labels:e.visible_labels.includes(t)?e.visible_labels:[...e.visible_labels,t]}:{hidden_labels:n}}function Ao(t,e){let{policyStore:r,transport:n,labelOptions:s}=e,o=document.createElement("dialog");o.id="display-settings-dialog",o.className="display-settings",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),t.appendChild(o);let i="";async function l(T){let x=r.get();if(x)try{let b=await n("display-policy-set",{expected_revision:x.revision,policy:T(x)});a(b),b&&b.conflict&&b.policy&&(b=await n("display-policy-set",{expected_revision:b.policy.revision,policy:T(b.policy)}),a(b)),b&&b.conflict&&Z("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC","error",4e3)}catch{Z("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function a(T){T&&T.policy&&typeof T.policy=="object"&&r.set(T.policy)}function c(T){let x=r.get();if(!x)return;let b=To(T,x)!=="shown";l(M=>hl(T,M,b))}function g(){let T=i.trim();T.length!==0&&(i="",l(x=>x.hidden_prefixes.includes(T)?{hidden_prefixes:x.hidden_prefixes}:{hidden_prefixes:[...x.hidden_prefixes,T]}),N())}function m(T){l(x=>({hidden_prefixes:x.hidden_prefixes.filter(b=>b!==T)}))}function w(T){let x=r.get();if(!x)return;let b=x.chips[T]===!1;l(()=>({chips:{[T]:b}}))}function $(T){let x=s();return p`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">라벨 표시</h3>
        <p class="display-settings__hint">
          라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을
          누르면 그 라벨만 예외로 다시 표시됩니다.
        </p>
        ${x.length===0?p`<div class="display-settings__empty">라벨 없음</div>`:p`<div class="display-settings__pills">
              ${x.map(b=>{let M=To(b,T);return p`<button
                  type="button"
                  class=${`display-settings__pill display-settings__pill--${M}`}
                  data-label=${b}
                  data-state=${M}
                  @click=${()=>c(b)}
                >
                  ${b}
                </button>`})}
            </div>`}
      </section>
    `}function v(T){return p`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">숨김 prefix</h3>
        <div class="display-settings__prefixes">
          ${T.hidden_prefixes.map(x=>p`<span class="display-settings__prefix">
                ${x}
                <button
                  type="button"
                  class="display-settings__prefix-remove"
                  aria-label=${`${x} \uADDC\uCE59 \uC81C\uAC70`}
                  @click=${()=>m(x)}
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
          <button type="button" @click=${g}>추가</button>
        </div>
      </section>
    `}function C(T){return p`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">카드 표시 요소</h3>
        <div class="display-settings__toggles">
          ${fl.map(([x,b])=>p`<label class="display-settings__toggle">
                <input
                  type="checkbox"
                  data-chip=${x}
                  .checked=${T.chips[x]!==!1}
                  @change=${()=>w(x)}
                />
                <span>${b}</span>
              </label>`)}
        </div>
      </section>
    `}function N(){let T=r.get();de(p`
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
            ${T?p`${$(T)} ${v(T)}
                ${C(T)}`:p`<div class="display-settings__empty">
                  표시 정책을 불러오는 중…
                </div>`}
          </div>
        </div>
      `,o)}let F=!1,B=()=>{F=!1};o.addEventListener("close",B),o.addEventListener("cancel",B);let U=null;r.subscribe&&(U=r.subscribe(()=>{F&&N()}));function O(){F||(i="",F=!0,N(),typeof o.showModal=="function"?o.showModal():o.setAttribute("open",""))}function A(){F&&(F=!1,typeof o.close=="function"?o.close():o.removeAttribute("open"))}return{open:O,close:A,destroy(){F=!1,o.removeEventListener("close",B),o.removeEventListener("cancel",B),U&&(U(),U=null),o.remove()}}}function Eo(t){let e=document.createElement("dialog");e.id="fatal-error-dialog",e.setAttribute("role","alertdialog"),e.setAttribute("aria-modal","true"),e.innerHTML=`
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
    </div>`,t.appendChild(e);let r=e.querySelector("#fatal-error-title"),n=e.querySelector("#fatal-error-message"),s=e.querySelector("#fatal-error-detail"),o=e.querySelector("#fatal-error-reload"),i=e.querySelector("#fatal-error-close"),l=()=>{if(typeof e.close=="function")try{e.close()}catch{}e.removeAttribute("open")},a=(c,g,m="")=>{r&&(r.textContent=c||"Unexpected Error"),n&&(n.textContent=g||"An unrecoverable error occurred.");let w=typeof m=="string"?m.trim():"";if(s&&(w.length>0?(s.textContent=w,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof e.showModal=="function")try{e.showModal(),e.setAttribute("open","")}catch{e.setAttribute("open","")}else e.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),i&&i.addEventListener("click",()=>l()),e.addEventListener("cancel",c=>{c.preventDefault(),l()}),{open:a,close:l,getElement(){return e}}}function Co(t,e,r){let n=ye("views:nav"),s=null;function o(a){return c=>{c.preventDefault(),n("click tab %s",a),r.gotoView(a)}}function i(){let c=e.getState().view==="worker"?"worker":"board";return p`
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
    `}function l(){de(i(),t)}return l(),s=e.subscribe(()=>l()),{destroy(){s&&(s(),s=null),de(p``,t)}}}var Ro=["bug","feature","task","epic","chore"];function Lo(t){switch((t||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var Io=["Critical","High","Medium","Low","Backlog"];function Do(t,e){let r=document.createElement("dialog");r.id="new-issue-dialog",r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true"),r.innerHTML=`
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
  `,t.appendChild(r);let n=r.querySelector("#new-issue-form"),s=r.querySelector("#new-title"),o=r.querySelector("#new-type"),i=r.querySelector("#new-priority"),l=r.querySelector("#new-labels"),a=r.querySelector("#new-description"),c=r.querySelector("#new-issue-error"),g=r.querySelector("#btn-cancel"),m=r.querySelector("#btn-create"),w=r.querySelector(".new-issue__close");function $(){o.replaceChildren();let A=document.createElement("option");A.value="",A.textContent="\u2014 Select \u2014",o.appendChild(A);for(let T of Ro){let x=document.createElement("option");x.value=T,x.textContent=Lo(T),o.appendChild(x)}i.replaceChildren();for(let T=0;T<=4;T+=1){let x=document.createElement("option");x.value=String(T);let b=Io[T]||"Medium";x.textContent=`${T} \u2013 ${b}`,i.appendChild(x)}}$();function v(){try{typeof r.close=="function"?r.close():r.removeAttribute("open")}catch{r.removeAttribute("open")}}function C(A){s.disabled=A,o.disabled=A,i.disabled=A,l.disabled=A,a.disabled=A,g.disabled=A,m.disabled=A,m.textContent=A?"Creating\u2026":"Create"}function N(){c.textContent=""}function F(A){c.textContent=A}function B(){try{let A=window.localStorage.getItem("beads-ui.new.type");A?o.value=A:o.value="";let T=window.localStorage.getItem("beads-ui.new.priority");T&&/^\d$/.test(T)?i.value=T:i.value="2"}catch{o.value="",i.value="2"}}function U(){let A=o.value||"",T=i.value||"";A.length>0&&window.localStorage.setItem("beads-ui.new.type",A),T.length>0&&window.localStorage.setItem("beads-ui.new.priority",T)}async function O(){N();let A=String(s.value||"").trim();if(A.length===0){F("Title is required"),s.focus();return}let T=Number(i.value||"2");if(!(T>=0&&T<=4)){F("Priority must be 0..4"),i.focus();return}let x=String(o.value||""),b=String(a.value||""),M={title:A};x.length>0&&(M.type=x),String(T).length>0&&(M.priority=T),b.length>0&&(M.description=b),C(!0);try{await e("create-issue",M)}catch{C(!1),F("Failed to create issue");return}U(),C(!1),v()}return r.addEventListener("cancel",A=>{A.preventDefault(),v()}),w.addEventListener("click",()=>v()),g.addEventListener("click",()=>v()),r.addEventListener("keydown",A=>{A.key==="Enter"&&(A.ctrlKey||A.metaKey)&&(A.preventDefault(),O())}),n.addEventListener("submit",A=>{A.preventDefault(),O()}),{open(){n.reset(),N(),B();try{"showModal"in r&&typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")}catch{r.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){v()}}}function Oo(t){if(typeof t!="number"||!Number.isFinite(t)||t<=0)return"";if(t<6e4)return`${Math.round(t/1e3)}\uCD08`;let e=t/6e4;return`${Number.isInteger(e)?e:Math.round(e*10)/10}\uBD84`}function Mo(t){return Array.isArray(t)?t.filter(e=>typeof e=="string").join(" "):""}var gl={deployed:{modifier:"ok",label:"\uC131\uACF5"},launched:{modifier:"launched",label:"\uBC1C\uC0AC\uB428"},failed:{modifier:"fail",label:"\uC2E4\uD328"}},ml=[{key:"orchestration_model",values:()=>pn},{key:"orchestration_effort",values:()=>fn},{key:"review_model",values:()=>hn},{key:"impl_model",values:()=>gn}];function No(t,e){let{queueStore:r,transport:n,getWorkspacePath:s}=e,o=document.createElement("dialog");o.id="worker-exec-defaults-dialog",o.className="exec-defaults",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),t.appendChild(o);function i(){return r&&r.get()||{revision:0,exec_defaults:{}}}function l(){let b=i();return typeof b.revision=="number"?b.revision:0}function a(){let b=i().exec_defaults;return b&&typeof b=="object"?b:{}}function c(b){b&&b.queue&&r&&r.set(b.queue)}async function g(b,M){if(!n)return;let P={key:b,value:M||null};try{let H=await n("worker-queue-set-exec-default",{...P,expected_revision:l()});c(H),H&&H.conflict&&(H=await n("worker-queue-set-exec-default",{...P,expected_revision:l()}),c(H)),H&&H.conflict&&Z("\uC804\uC5ED \uC2E4\uD589 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC","error",4e3)}catch{Z("\uC804\uC5ED \uC2E4\uD589 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function m(b,M,P){let H=!!P&&!M.includes(P);return p`<div class="exec-defaults__row">
      <span class="exec-defaults__k">${b}</span>
      <select
        class="exec-defaults__sel"
        aria-label=${`\uC804\uC5ED ${b}`}
        data-key=${b}
        @change=${K=>{g(b,K.target.value)}}
      >
        <option value="" ?selected=${!P}>
          ${mn[b]||"(\uAE30\uBCF8)"}
        </option>
        ${H?p`<option value=${P} ?selected=${!0}>
              ${P} (비호환)
            </option>`:""}
        ${M.map(K=>p`<option value=${K} ?selected=${P===K}>${K}</option>`)}
      </select>
    </div>`}function w(){let b=i().workspace_info;return b&&typeof b=="object"?b:{}}function $(b,M){return p`<span
      class="exec-defaults__vd-badge exec-defaults__vd-badge--${b}"
      >${M}</span
    >`}function v(b){let M=b?Mo(b.cmd):"",P=b?Oo(b.timeout_ms):"",H=s&&s()||"<workspace \uACBD\uB85C>";return p`<div class="exec-defaults__vd-group" data-vd="verify">
      <div class="exec-defaults__vd-label">머지 전 검증 (verify)</div>
      ${M?p`<div class="exec-defaults__vd-line">
            <span class="exec-defaults__vd-cmd">${M}</span>
            ${$("config","config")}
            ${P?p`<span class="exec-defaults__vd-meta"
                  >timeout ${P}</span
                >`:""}
          </div>`:p`<div class="exec-defaults__vd-line exec-defaults__vd-absent">
            검증 없음 —
            <span class="exec-defaults__vd-cmd"
              >[worker.verify."${H}"]</span
            >
            섹션으로 정의
          </div>`}
    </div>`}function C(b){let M=b?Mo(b.cmd):"",P=b?Oo(b.timeout_ms):"",H=P?`timeout ${P} \xB7 verify \uD1B5\uACFC \uC2DC\uC5D0\uB9CC \uC2E4\uD589`:"verify \uD1B5\uACFC \uC2DC\uC5D0\uB9CC \uC2E4\uD589",K=s&&s()||"<workspace \uACBD\uB85C>";return p`<div class="exec-defaults__vd-group" data-vd="deploy">
      <div class="exec-defaults__vd-label">머지 후 배포 (deploy)</div>
      ${M?p`<div class="exec-defaults__vd-line">
            <span class="exec-defaults__vd-cmd">${M}</span>
            ${$("config","config")}
            ${b.detached===!0?$("detached","detached"):""}
            <span class="exec-defaults__vd-meta">${H}</span>
          </div>`:p`<div class="exec-defaults__vd-line exec-defaults__vd-absent">
            배포 없음 —
            <span class="exec-defaults__vd-cmd"
              >[worker.deploy."${K}"]</span
            >
            섹션으로 정의
          </div>`}
    </div>`}function N(b){if(!b||typeof b!="object")return"";let M=gl[String(b.outcome)];if(!M)return"";let P=b.outcome==="failed"&&b.reason?`${M.label} \xB7 ${b.reason}`:M.label,H=[bt(b.at),typeof b.bead_id=="string"?b.bead_id:"",typeof b.base_sha=="string"?b.base_sha.slice(0,7):""].filter(K=>K.length>0).join(" \xB7 ");return p`<div class="exec-defaults__vd-group" data-vd="last-deploy">
      <div class="exec-defaults__vd-label">마지막 배포</div>
      <div class="exec-defaults__vd-line">
        ${$(M.modifier,P)}
        ${H?p`<span class="exec-defaults__vd-meta">${H}</span>`:""}
      </div>
    </div>`}function F(b){return p`<section class="exec-defaults__vd">
      <p class="exec-defaults__vd-title">
        검증·배포 설정
        <span class="exec-defaults__vd-ro"
          >읽기 전용 — config.toml에서 정의</span
        >
      </p>
      ${v(b.verify_cmd)} ${C(b.deploy_cmd)}
      ${N(b.last_deploy)}
    </section>`}function B(){let b=a();de(p`
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
            ${ml.map(M=>m(M.key,M.values(),b[M.key]||""))}
            ${F(w())}
          </div>
        </div>
      `,o)}let U=!1,O=()=>{U=!1};o.addEventListener("close",O),o.addEventListener("cancel",O);let A=null;r&&r.subscribe&&(A=r.subscribe(()=>{U&&B()}));function T(){U||(U=!0,B(),typeof o.showModal=="function"?o.showModal():o.setAttribute("open",""))}function x(){U&&(U=!1,typeof o.close=="function"?o.close():o.removeAttribute("open"))}return{open:T,close:x,destroy(){U=!1,o.removeEventListener("close",O),o.removeEventListener("cancel",O),A&&(A(),A=null),o.remove()}}}var _l="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function zt(t){return typeof t=="number"&&Number.isFinite(t)?t:0}function bl(t){return!t||typeof t!="object"?!1:typeof t.input_tokens=="number"||typeof t.output_tokens=="number"}function wl(t){return t>=1e6?`${(t/1e6).toFixed(1)}M`:t>=1e3?`${(t/1e3).toFixed(1)}k`:String(t)}function Ht(t){if(!bl(t))return null;let e=zt(t?.input_tokens)+zt(t?.output_tokens);return`\u03C4 ${wl(e)}`}function Ur(t){if(!t||typeof t!="object")return"";let e=[`\uC785\uB825 ${zt(t.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${zt(t.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${zt(t.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${zt(t.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&e.push(`$${t.total_cost_usd.toFixed(2)}`);let r=e.join(" \xB7 ");return t.replayed?`${r}
${_l}`:r}function Fn(t,e){let r=null;for(let n of Object.values(t||{}))n&&n.bead_id===e&&(r=n.usage||null);return r}function Bn(t){let e=t.draggable&&!t.done,r=Array.isArray(t.badges)?t.badges:[],n=Ht(t.usage),s=t.merge_step||null,o=t.lane==="pr_wait"||!!t.revise_action,i=e?p`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",l=p`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${t.id}</span
  >`,a=p`<span class="worker-mini__title">${t.title}</span>`,c=t.pr_url&&t.pr_number?p`<a
          class="worker-mini__pr"
          href=${t.pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="PR 열기"
          >#${t.pr_number} ↗</a
        >`:"",g=r.map(B=>B===t.live_badge?p`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${B}</span
        >`:p`<span
          class="worker-mini__badge${t.alert?" worker-mini__badge--alert":""}"
          >${B}</span
        >`),m=t.reason?p`<span class="worker-mini__reason">${t.reason}</span>`:"",w=n?p`<span class="worker-usage" title=${Ur(t.usage)}
        >${n}</span
      >`:"",$=s?p`<span class="merge-step"
        >${s.label}<span class="merge-step__n"
          >${s.index}/${s.total}</span
        ></span
      >`:"",v=t.merge_action?p`<button
        type="button"
        class="worker-mini__merge"
        data-bead-id=${t.id}
        ?disabled=${t.merge_enabled===!1}
        title=${t.merge_title||""}
      >
        ${t.merge_label||"\uBA38\uC9C0"}
      </button>`:"",C=t.discard_action?p`<button
        type="button"
        class="worker-mini__discard"
        data-bead-id=${t.id}
        ?disabled=${t.discard_enabled===!1}
        title=${t.discard_enabled===!1?t.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
      >
        폐기
      </button>`:"",N=t.revise_action?p`<button
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
        </button>`:"",F=!!(n||s||t.merge_action||t.discard_action||t.revise_action);return p`<div
    class="worker-mini${o?" worker-mini--card":""}${e?"":" worker-mini--static"}${t.done?" worker-mini--done":""}${s?" worker-mini--merging":""}"
    style=${s?`--progress: ${s.percent}%`:""}
    draggable=${e?"true":"false"}
    data-bead-id=${t.id}
    data-lane=${t.lane}
  >
    ${o?p`<div class="worker-mini__head">
            ${i}${l}${c}${g}${m}
          </div>
          <div class="worker-mini__body">${a}</div>
          ${F?p`<div class="worker-mini__foot">
                ${w}${$}
                <span class="worker-mini__actions"
                  >${v}${C}${N}</span
                >
              </div>`:""}`:p`${i}${l}${a}${c}${g}${m}${w}${$}${v}${C}`}
  </div>`}function kl(t){let e=t.draggable&&!t.done,r=t.workflow,n=r&&r.chips||{},s=n.route||r&&r.route,o=n.route_source==="derived"||!!(r&&r.route_source==="derived"),i=typeof t.reason=="string"&&t.reason.startsWith("\u26D4");return p`<div
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
    ${r?Ar(r,t.status):""}
    <div
      class="worker-card__foot${t.reason?"":" worker-card__foot--actions-only"}"
    >
      ${t.reason?p`<span
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
  </div>`}function kt(t){let e=!!t.collapsible&&!!t.collapsed,r=p`<span
      class="worker-pane__dot worker-pane__dot--${t.lane}"
      aria-hidden="true"
    ></span>
    <span class="worker-pane__title">${t.title}</span>
    ${e&&t.preview?p`<span class="worker-pane__preview">${t.preview}</span>`:""}
    <span class="worker-pane__count">${t.items.length}</span>`;return p`<section
    class="worker-pane worker-pane--lane-${t.lane}${t.src?" worker-pane--src":""}${t.live?" worker-pane--live":""}${t.collapsible?" worker-pane--collapsible":""}${e?" worker-pane--collapsed":""}"
    id=${t.id}
    data-lane=${t.lane}
  >
    ${t.collapsible?p`<button
          type="button"
          class="worker-pane__hd worker-pane__hd--toggle"
          data-lane=${t.lane}
          aria-expanded=${e?"false":"true"}
        >
          ${r}
          <span class="worker-pane__caret" aria-hidden="true"
            >${e?"\u25B8":"\u25BE"}</span
          >
        </button>`:p`<header class="worker-pane__hd">
          ${r}${t.header_control?t.header_control:""}
        </header>`}
    ${e?"":p`${t.controls?t.controls:""}
          <div class="worker-pane__body">
            ${t.body?t.body:t.items.length===0?p`<div class="worker-pane__empty">
                    ${t.empty||""}
                  </div>`:t.items.map(n=>t.lane==="candidate"?kl(n):Bn(n))}
          </div>`}
  </section>`}var Po=160;function Fo(t){return t.length>Po?`${t.slice(0,Po)}\u2026`:t}function yl(t){return!t||!t.reason?"":p`<div class="worker-banner__detail">
    가드:
    ${t.reason}${t.command?p` · <code>${Fo(t.command)}</code>`:""}
  </div>`}function vl(t){return t?p`<details class="worker-banner__tail">
    <summary>출력 tail</summary>
    <pre>${t}</pre>
  </details>`:""}function $l(t){return t?p`<div class="worker-banner__log-path">
    전체 로그: <code>${t}</code>
  </div>`:""}function xl(t){if(!Number.isFinite(t)||t<0)return"0s";let e=Math.floor(t/1e3),r=Math.floor(e/60),n=e%60;return r>0?`${r}m ${String(n).padStart(2,"0")}s`:`${n}s`}function Bo(t){let e=Array.isArray(t.cleanupFailures)?t.cleanupFailures:[];return p`<div class="worker-banners">
    ${t.failure?p`<div class="worker-banner worker-banner--failure" role="alert">
          ⛔ ${t.failure.repo||"repo"} 세션 실패 —
          ${t.failure.reason||""}. 자동 진행을 껐습니다, 수동 ▶ 필요.
          ${t.failure.resume_attempt_id?p`<button
                type="button"
                class="worker-banner__resume"
                data-attempt-id=${t.failure.resume_attempt_id}
                ?disabled=${!t.failure.resume_eligible}
                title=${t.failure.resume_eligible?"\uCD5C\uADFC \uC2E4\uD328 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":t.failure.resume_reason||"\uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}
              >
                ↻ 이어하기
              </button>`:""}
          ${t.failure.resume_attempt_id?p`<button
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
    ${e.map(r=>p`<div
          class="worker-banner worker-banner--cleanup"
          role="alert"
          data-bead-id=${r.bead_id}
        >
          ⚠ ${r.bead_id} 머지 완료 — 머지 후 정리가 <b>${r.step}</b> 단계에서
          멈췄습니다 (${r.reason}). bead는 resolved로 남아 있고 자동 재시도는
          하지 않습니다 — 정리를 사람이 마무리하세요.
          ${r.detail?p`<div class="worker-banner__detail">
                <code>${Fo(r.detail)}</code>
              </div>`:""}
          ${$l(r.log_path)} ${vl(r.output_tail)}
        </div>`)}
  </div>`}function Sl(t,e,r=null){let n=!!t.paused,s=n?"\uC77C\uC2DC\uC815\uC9C0":typeof t.started_at=="number"?xl(e-t.started_at):"\u2014",o=[t.runner,t.model].filter(Boolean).join(" \xB7 "),i=Ht(t.usage),l=t.conflict_resolution?n?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,a=t.attempt_id&&t.attempt_id===r;return p`<div
    class="rtile${a?" rtile--sel":""}${n?" rtile--paused":""}"
    data-bead-id=${t.bead_id}
    data-attempt-id=${t.attempt_id||""}
  >
    <div class="rtile__hd">
      <span class="rtile__dot" aria-hidden="true"></span>
      <span class="rtile__id" title="클릭하면 ID 복사">${t.bead_id}</span>
      ${t.resumed_from?p`<span
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
      ${n?p`<button
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
    ${o||i||l?p`<div class="rtile__meta">
          ${l?p`<span class="worker-mini__badge">${l}</span>`:""}
          ${o?p`<span class="rtile__runner">${o}</span>`:""}
          ${i?p`<span class="worker-usage" title=${Ur(t.usage)}
                >${i}</span
              >`:""}
        </div>`:""}
    <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일): 큐
         스냅샷에는 페이즈명도 진행률도 없으므로 진행 바는 만들지 않는다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
    ${n?"":p`<div class="rtile__accent" aria-hidden="true"></div>`}
  </div>`}function qn(t,e=Date.now(),r=null){let n=Array.isArray(t)?t:[];return p`<div class="worker-rungrid" id="worker-rungrid">
    ${n.length===0?p`<div class="worker-rungrid__empty">실행 세션 없음</div>`:n.map(s=>Sl(s,e,r))}
  </div>`}var Tl="tab:worker:ready",Al="tab:worker:blocked",zr=1;function Hn(t){let e=t&&t.metadata;return!!(e&&typeof e=="object"&&e.spec_id)}var Uo="beads-ui.worker.candidate-filter",Un={show_blocked:!1,spec:"all"};function El(){try{let t=window.localStorage.getItem(Uo);if(!t)return{...Un};let e=JSON.parse(t);if(!e||typeof e!="object")return{...Un};let r=e.spec;return{show_blocked:e.show_blocked===!0,spec:r==="with"||r==="without"?r:"all"}}catch{return{...Un}}}function Cl(t){try{window.localStorage.setItem(Uo,JSON.stringify(t))}catch{}}function Rl(t,e){let r=l=>e.show_blocked||!l.blocked,n=l=>e.spec==="all"||(e.spec==="with"?l.has_spec:!l.has_spec),s=[],o=0,i=0;for(let l of t){let a=r(l),c=n(l);a&&c?s.push(l):!a&&c?o+=1:a&&!c&&(i+=1)}return{visible:s,hidden_blocked:o,hidden_spec:i}}var Ll=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],zo="bdui.worker.candidate_sort",Il=[{value:"spec",label:"spec \uC6B0\uC120"},{value:"board",label:"Board \uC21C\uC11C"},{value:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131\uC21C"}],Hr="spec";function Dl(){try{let t=window.localStorage.getItem(zo);return t==="board"||t==="created"||t==="spec"?t:Hr}catch{return Hr}}function Ol(t){try{window.localStorage.setItem(zo,t)}catch{}}var Ml="(max-width: 640px)",Ho="beads-ui.worker.lane-collapsed",hr={queue:!0,done:!0};function Nl(){try{let t=window.localStorage.getItem(Ho);if(!t)return{...hr};let e=JSON.parse(t);return!e||typeof e!="object"?{...hr}:{queue:typeof e.queue=="boolean"?e.queue:hr.queue,done:typeof e.done=="boolean"?e.done:hr.done}}catch{return{...hr}}}function Pl(t){try{window.localStorage.setItem(Ho,JSON.stringify(t))}catch{}}function qo(t){let e=Array.isArray(t)&&t.length>0?t[0]:null;if(!e)return"";let r=typeof e.title=="string"?e.title:e.id||"";return r.length>22?`${r.slice(0,22)}\u2026`:r}function Fl(t,e,r){let n=Array.isArray(t)?t.slice():[];return e==="created"?n.sort(Et):(n.sort(vr(r)),e==="board"?n:[...n.filter(Hn),...n.filter(s=>!Hn(s))])}function Bl(t){let e=t&&t.parent;return(typeof e=="string"?e.length>0:!!(e&&e.id))||/\.\d+$/.test(t&&t.id||"")}function ql(t){let r=(Array.isArray(t?.dependencies)?t.dependencies:[]).map(n=>typeof n=="string"?n:n&&n.id).filter(Boolean);return r.length>0?`\u{1F512} ${r.join(", ")}`:"\u{1F512} blocked"}var Ul=["closed_unmerged","undecidable"],zl=[{from:"\uAD00\uCE21 \uB300\uAE30",activity:"checking",to:"\uD655\uC778\uC911"},{from:"\uB85C\uCEEC\uAC80\uC99D \uB300\uAE30",activity:"verifying",to:"\uB85C\uCEEC\uAC80\uC99D \uC2E4\uD589 \uC911"}];function Hl(t,e){for(let r of zl)if(t===r.from&&e===r.activity)return{label:r.to,live:!0};return{label:t,live:!1}}var zn=[{step:"merging",label:"\uBA38\uC9C0 \uC911"},{step:"base_sync",label:"base \uB3D9\uAE30\uD654"},{step:"post_merge_verify",label:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D"},{step:"deploy",label:"\uBC30\uD3EC"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"}];function Wl(t){if(typeof t!="string"||t.length===0)return null;let e=zn.length,r=zn.findIndex(n=>n.step===t);return r<0?{label:t,index:0,total:e,percent:0}:{label:zn[r].label,index:r+1,total:e,percent:Math.round((r+1)/e*100)}}function Gl(t,e,r,n,s=null,o=null,i=null,l=!1){let a=r[t]||null,c=a&&a.gate?a.gate:null,g=a&&a.pr?a.pr:null,m=[];l&&m.push("\uC138\uC158");let w=i?i==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":null,$=Hl(l&&c&&c.tier==="closed_unmerged"?"\uB2EB\uD798":c&&c.gate_badge||"",w?null:o&&o.activity||null);w&&m.push(w),$.label&&m.push($.label),c&&c.base_badge&&c.base_badge!==c.gate_badge&&m.push(c.base_badge),n&&m.push("\uC815\uB9AC \uC2E4\uD328");let v=!!c&&c.base_badge==="\uCDA9\uB3CC",C=!!c&&c.enabled===!0,N=Wl(o&&o.merge_progress?o.merge_progress.step:null),F=!!n&&!!c&&c.tier==="merged",B=l&&!!c&&c.tier==="merged",U=l&&v;return{id:t,title:e,reason:n?"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644":"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",pr_number:g&&typeof g.number=="number"?g.number:null,pr_url:g&&typeof g.url=="string"?g.url:"",badges:m,live_badge:i==="running"?w:w?null:$.live?$.label:null,usage:s,alert:!!c&&Ul.includes(c.tier)||!!n,merge_action:!0,discard_action:!l&&!n&&!(c&&c.tier==="merged"),merge_step:N,discard_enabled:!N&&!i,discard_title:i?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":void 0,merge_enabled:!N&&!i&&!U&&(C||v&&!l||F||B),merge_label:B?"\uC815\uB9AC":v&&!l&&!N&&!F?"\uCDA9\uB3CC \uD574\uC18C":void 0,merge_title:N?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${N.label}`:B?"\uBA38\uC9C0\uB428 \u2014 \uD074\uB9AD\uD558\uBA74 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC\uB97C \uC218\uD589\uD569\uB2C8\uB2E4":U?"\uC678\uBD80 PR \uCDA9\uB3CC \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694 (\uC5EC\uAE30\uC11C\uB294 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B8 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4)":i==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":i==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":F?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uCC98\uC74C\uBD80\uD130 \uB2E4\uC2DC \uC218\uD589\uD569\uB2C8\uB2E4":v?"\uCDA9\uB3CC \u2014 \uD074\uB9AD\uD558\uBA74 \uCDA9\uB3CC \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4 (\uBA38\uC9C0\uD558\uC9C0 \uC54A\uC74C)":C?`\uBA38\uC9C0 (${c.gate_badge}) \u2014 \uD074\uB9AD \uC2DC\uC810\uC5D0 \uB2E4\uC2DC \uD655\uC778\uD569\uB2C8\uB2E4`:c&&c.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${c&&c.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function Wn(t,e={}){let{transport:r,issueStores:n,queueStore:s,sessionLogStore:o,uiOrderStore:i,gotoIssue:l,getWorkspacePath:a}=e,c=n?xr(n,i):null,g=Sr({transport:r,uiOrderStore:i}),m=null,w=[],$=El(),v=Dl(),C=Nl(),N=!1,F=new Set,B=new Set,U=[],O=document.createElement("div");O.className="worker-console";let A=document.createElement("div");A.className="worker-top";let T=document.createElement("div");T.className="worker-drawer-overlay",T.hidden=!0;let x=document.createElement("div");x.className="worker-drawer-overlay__backdrop";let b=document.createElement("div");b.className="worker-drawer-host",T.append(x,b);let M=document.createElement("div");M.className="worker-lanes-host",O.append(A,T,M),t.appendChild(O);let P=null,H=Er(b,{transport:r,sessionLogStore:o,onClose:()=>{P=null,T.hidden=!0,ce()}}),K=No(O,{queueStore:s,transport:r,getWorkspacePath:a});function ke(){return s&&s.get()||{revision:0,auto_advance:!1,slots:zr,queue:[],pr_wait:[],done:[]}}function oe(){let d=ke();return typeof d.revision=="number"?d.revision:0}function ee(d){d&&d.queue&&s&&s.set(d.queue)}function Qe(){let d=ke().queue;return Array.isArray(d)?d.length:0}async function Ue(d,h){if(!r)return;let u=await r("worker-queue-place",{bead_id:d,index:h,expected_revision:oe()});ee(u),u&&u.conflict&&await r("worker-queue-place",{bead_id:d,index:h,expected_revision:oe()}).then(ee)}async function ve(d,h){if(!r)return;let u=await r("worker-queue-reorder",{bead_id:d,to_index:h,expected_revision:oe()});ee(u),u&&u.conflict&&await r("worker-queue-reorder",{bead_id:d,to_index:h,expected_revision:oe()}).then(ee)}async function Ee(d){if(!r)return;let h=await r("worker-queue-remove",{bead_id:d,expected_revision:oe()});ee(h),h&&h.conflict&&await r("worker-queue-remove",{bead_id:d,expected_revision:oe()}).then(ee)}async function Je(d){!r||!d||await r("worker-attempt-stop",{attempt_id:d})}async function fe(d){if(!r||!d)return;let h=await r("worker-attempt-pause",{attempt_id:d});h&&h.paused===!1&&h.reason&&Z(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${h.reason}`,"error",2400)}async function it(d){if(!r||!d)return;let h=await r("worker-attempt-resume",{attempt_id:d,expected_revision:oe()});ee(h),h&&h.conflict&&(h=await r("worker-attempt-resume",{attempt_id:d,expected_revision:oe()}),ee(h)),h&&h.resumed===!1&&!h.conflict&&h.reason&&Z(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${h.reason}`,"error",2400)}async function he(d){if(!r||!d)return;let h=await r("worker-attempt-dismiss",{attempt_id:d,expected_revision:oe()});ee(h),h&&h.conflict&&(h=await r("worker-attempt-dismiss",{attempt_id:d,expected_revision:oe()}),ee(h)),h&&h.dismissed===!1&&!h.conflict&&h.reason&&Z(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${h.reason}`,"error",2400)}async function et(d){if(!r||!d)return;F.add(d),ce();let h;try{h=await r("worker-pr-merge",{bead_id:d,expected_revision:oe()}),ee(h),h&&h.conflict&&(h=await r("worker-pr-merge",{bead_id:d,expected_revision:oe()}),ee(h))}finally{F.delete(d),ce()}if(!(!h||h.conflict)){if(h.action==="conflict_resolution"){Z(h.ok?"\uCDA9\uB3CC \u2014 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 (\uBA38\uC9C0\uD558\uC9C0 \uC54A\uC74C)":`\uCDA9\uB3CC \uD574\uC18C \uB514\uC2A4\uD328\uCE58 \uC2E4\uD328: ${h.reason||""}`,h.ok?"success":"error",2800);return}if(h.ok){Z("\uBA38\uC9C0 + \uC815\uB9AC \uC644\uB8CC","success",2e3);return}Z(h.cleanup_step?`\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uC2E4\uD328(${h.cleanup_step}): ${h.reason||""}`:`\uBA38\uC9C0 \uAC70\uBD80: ${h.reason||""}`,"error",3200)}}async function ae(d){if(!r||!d||!(typeof globalThis.confirm!="function"||globalThis.confirm(`${d}: PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4. \uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694. \uACC4\uC18D\uD560\uAE4C\uC694?`)))return;let u=await r("worker-pr-discard",{bead_id:d,expected_revision:oe()});if(ee(u),u&&u.conflict&&(u=await r("worker-pr-discard",{bead_id:d,expected_revision:oe()}),ee(u)),u&&u.discarded===!0){Z("\uD3D0\uAE30 \uC644\uB8CC \u2014 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB2E4\uC2DC \uC2E4\uD589\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4","success",2400);return}u&&u.discarded===!1&&!u.conflict&&Z(`\uD3D0\uAE30 \uAC70\uBD80: ${u.reason||""}`,"error",2800)}async function Be(d,h){if(!r||!h||B.has(h))return;B.add(h),ce();let u;try{u=await r(d,{bead_id:h,expected_revision:oe()}),ee(u),u&&u.conflict&&(u=await r(d,{bead_id:h,expected_revision:oe()}),ee(u))}finally{B.delete(h),ce()}if(!(!u||u.conflict)){if(u.ok){Z(d==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}Z(`\uCC98\uBD84 \uAC70\uBD80: ${u.reason||""}`,"error",3e3)}}async function nt(d){if(!r)return;let h=await r("worker-queue-toggle",{on:d,expected_revision:oe()});ee(h),h&&h.conflict&&await r("worker-queue-toggle",{on:d,expected_revision:oe()}).then(ee)}async function Re(d){if(!r||!Number.isFinite(d))return;let h=Math.max(zr,Math.floor(d)),u=await r("worker-queue-set-slots",{slots:h,expected_revision:oe()});ee(u),u&&u.conflict&&await r("worker-queue-set-slots",{slots:h,expected_revision:oe()}).then(ee)}function Ie(){let d=ke(),h=c?c.selectBoardColumn(Tl,"ready"):[],u=c?c.selectBoardColumn(Al,"blocked"):[],S=d.bead_titles||{},y=new Map;for(let[E,W]of Object.entries(S))typeof W=="string"&&W.length>0&&y.set(E,W);for(let E of[...h,...u])y.set(E.id,E.title||E.id);let I=d.pr_wait||[],Q=d.pr_observations||{},q=d.pr_activity||{},ue=d.cleanup_failed||{},Te=Object.entries(ue).map(([E,W])=>({bead_id:E,step:W&&W.step?W.step:"",reason:W&&W.reason?W.reason:"",detail:W&&typeof W.detail=="string"?W.detail:null,output_tail:W&&typeof W.output_tail=="string"&&W.output_tail?W.output_tail:void 0,log_path:W&&typeof W.log_path=="string"&&W.log_path?W.log_path:void 0})),st=d.queue||[],ft=new Set([...st.map(E=>E.bead_id),...I.map(E=>E.bead_id),...d.done.map(E=>E.bead_id)]),Ze=new Set(u.map(E=>E.id)),te=i?i.get()?.order||{}:{},_e=new Set,_=[];for(let E of[...h,...u])ft.has(E.id)||_e.has(E.id)||Bl(E)||(_e.add(E.id),_.push(E));w=Fl(_,v,te);let k=d.admission||{},Y=E=>{let W=k[E];if(!W)return"";if(W.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let ne=typeof W.reason=="string"?W.reason:"",se=ne.indexOf(":");return se>0&&se<ne.length-1?`\u26D4 ${ne.slice(0,se)} (${ne.slice(se+1)})`:`\u26D4 ${ne}`},j=w.map(E=>{let W=Hn(E),ne=Ze.has(E.id),se=[];ne&&se.push(ql(E)),W||se.push("spec \uC5C6\uC74C");let Vt=Y(E.id);return Vt&&se.push(Vt),{id:E.id,title:E.title||E.id,reason:se.join(" \xB7 "),draggable:W,lane:"candidate",workflow:E.workflow,status:E.status,blocked:ne,has_spec:W}}),J=Rl(j,$),be=J.visible,Ot=d.revise_parked||{},gr=(E,W)=>E.map(ne=>{let se=W==="queue"?Ot[ne.bead_id]:null;return{id:ne.bead_id,title:y.get(ne.bead_id)||ne.bead_id,reason:W==="done"?"":Y(ne.bead_id),draggable:W!=="done",done:W==="done",lane:W,badges:se?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!se,revise_action:!!se,revise_enabled:!!se&&!B.has(ne.bead_id),revise_title:se?se.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${se.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":"",usage:W==="done"?Fn(d.attempts||{},ne.bead_id):null}}),Ge=d.attempts?Object.values(d.attempts):[],lt=new Set;for(let E of Ge)E&&typeof E.resumed_from=="string"&&E.resumed_from.length>0&&lt.add(E.resumed_from);let Wt=new Map;for(let E of Ge)Wt.set(E.bead_id,E.attempt_id);let Gt=new Map;for(let E of Ge)Gt.set(E.attempt_id,E);function jt(E){let W=new Set,ne=E;for(;ne&&!W.has(ne.attempt_id);){if(ne.conflict_resolution===!0)return!0;W.add(ne.attempt_id),ne=typeof ne.resumed_from=="string"&&ne.resumed_from.length>0&&Gt.get(ne.resumed_from)||null}return!1}let mt=[],Ae=null;for(let E of Ge){let W=E.status==="paused"&&!lt.has(E.attempt_id);E.status==="running"||W?mt.push({bead_id:E.bead_id,attempt_id:E.attempt_id,title:y.get(E.bead_id)||E.bead_id,runner:E.runner||null,model:E.model||null,effort:E.effort||null,started_at:typeof E.started_at=="number"?E.started_at:null,resumed_from:E.resumed_from||null,paused:W,conflict_resolution:jt(E),can_pause:typeof E.session_id=="string"&&E.session_id.length>0,usage:E.usage||null}):(E.status==="failed"||E.status==="orphaned")&&!(Wt.get(E.bead_id)!==E.attempt_id)&&typeof E.dismissed_at!="number"&&(Ae=E)}let Yt=null;if(Ae){let E=typeof Ae.session_id=="string"&&Ae.session_id.length>0,W=lt.has(Ae.attempt_id),ne=Ae.cause_detail;Yt={repo:Ae.repo||"",reason:Ae.cause||Ae.status,cause_detail:ne&&typeof ne.reason=="string"?{reason:ne.reason,command:typeof ne.command=="string"?ne.command:null}:null,resume_attempt_id:Ae.attempt_id,resume_eligible:E&&!W,resume_reason:E?W?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}}let mr=new Set(mt.map(E=>E.bead_id)),vt=new Map;for(let E of mt)E.conflict_resolution&&(E.paused?vt.has(E.bead_id)||vt.set(E.bead_id,"paused"):vt.set(E.bead_id,"running"));let _r=mt.filter(E=>!E.paused).length,G=(d.workspace_info||{}).slots,f=typeof G=="number"?G:typeof d.slots=="number"?d.slots:zr,L=_r>f,z=gr(d.done,"done"),ge=0,Ce=0,we=!1;for(let E of z){let W=E.usage;W&&typeof W=="object"&&(Number.isFinite(W.input_tokens)&&(ge+=W.input_tokens,we=!0),Number.isFinite(W.output_tokens)&&(Ce+=W.output_tokens,we=!0))}let qe=we?Ht({input_tokens:ge,output_tokens:Ce}):null;return{queue:d,idToTitle:y,candidates:be,candidate_hidden:{blocked:J.hidden_blocked,spec:J.hidden_spec},running:mt,live_count:_r,slots:f,over_cap:L,failure:Yt,waiting:gr(st.filter(E=>!mr.has(E.bead_id)),"queue"),pr_wait:I.map(E=>Gl(E.bead_id,y.get(E.bead_id)||E.bead_id,Q,ue[E.bead_id]||null,Fn(d.attempts||{},E.bead_id),q[E.bead_id]||(F.has(E.bead_id)?{activity:null,merge_progress:{step:"merging"}}:null),vt.get(E.bead_id)||null,E.external===!0)),done:z,token_total:qe,cleanup_failures:Te}}function $e(d){let h=d.waiting.length>0?d.waiting[0].id:"\u2014",u=p`<button
      type="button"
      class="worker-play${d.queue.auto_advance?" is-active":""}"
    >
      ${d.queue.auto_advance?"\u23F8 \uC77C\uC2DC\uC815\uC9C0":"\u25B6 \uC790\uB3D9 \uC9C4\uD589"}
    </button>`,S=d.over_cap?p`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",y=p`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${d.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${d.pr_wait.length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >오늘 완료 <b>${d.done.length}</b></span
      >`,I=p`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${zr}
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
      </button>`,Q=Bo({failure:d.failure,cleanupFailures:d.cleanup_failures});return N?p`<div class="worker-ribbon">
          ${u}
          <div class="worker-kpi worker-kpi--ribbon">${S}${y}</div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${I}</div>
        </div>
        ${Q}`:p`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${u}${I}</div>
        <div class="worker-kpi">
          ${S}${y}
          ${d.token_total?p`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title="완료된 세션들의 토큰 합계 (입력+출력)"
                >${d.token_total}</span
              >`:""}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${h}</b></span
          >
        </div>
      </div>
      ${Q}`}function ze(d){if(d.running.length===0&&d.pr_wait.length===0)return"";let h=d.running.some(u=>!u.paused);return p`<section
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
      ${d.running.length>0?qn(d.running,Date.now(),P):""}
      ${d.pr_wait.map(u=>Bn(u))}
    </section>`}function tt(d){let h=d.candidate_hidden;return p`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${$.show_blocked}
        />
        🔒 blocked${h.blocked>0?` ${h.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${Ll.map(u=>p`<button
              type="button"
              class="worker-filter__chip${$.spec===u.value?" is-active":""}"
              data-spec=${u.value}
              aria-pressed=${$.spec===u.value?"true":"false"}
            >
              ${u.label}
            </button>`)}
        ${h.spec>0?p`<span class="worker-filter__hidden">숨김 ${h.spec}</span>`:""}
      </div>
    </div>`}function De(){return p`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${v}
    >
      ${Il.map(d=>p`<option value=${d.value} ?selected=${v===d.value}>
            ${d.label}
          </option>`)}
    </select>`}function He(d){let h=kt({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:d.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:De(),controls:tt(d)});return N?p`<div class="worker-lanes worker-lanes--mobile">
        ${ze(d)}
        ${kt({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:d.waiting,empty:"\uB4DC\uB798\uADF8 \uB610\uB294 [\uB300\uAE30\uB85C \u21B4]\uB85C \uBC30\uCE58",collapsible:!0,collapsed:C.queue,preview:qo(d.waiting)})}
        ${h}
        ${kt({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:d.done,empty:"\uC644\uB8CC \uC5C6\uC74C",collapsible:!0,collapsed:C.done,preview:d.token_total||qo(d.done)})}
      </div>`:p`<div class="worker-lanes">
      ${h}
      ${kt({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:d.waiting,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58"})}
      ${kt({id:"worker-pane-running",lane:"running",title:`\uC2E4\uD589 \uC911 \xB7 \uC2AC\uB86F ${d.slots}`,items:d.running,live:d.running.some(u=>!u.paused),body:qn(d.running,Date.now(),P)})}
      ${kt({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:d.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C"})}
      ${kt({id:"worker-pane-done",lane:"done",title:`\uC644\uB8CC \xB7 \uC624\uB298 ${d.done.length}`,items:d.done,empty:"\uC644\uB8CC \uC5C6\uC74C"})}
    </div>`}function Oe(d){C={...C,[d]:!C[d]},Pl(C),ce()}function ce(){let d=Ie();de($e(d),A),de(He(d),M)}function xe(){let d=document.querySelector(".app-header");if(!d)return;let h=()=>{let u=Math.round(d.getBoundingClientRect().height);O.style.setProperty("--worker-ribbon-top",`${u}px`)};if(h(),typeof ResizeObserver=="function"){let u=new ResizeObserver(h);u.observe(d),U.push(()=>u.disconnect())}else window.addEventListener("resize",h),U.push(()=>window.removeEventListener("resize",h))}function Me(){if(typeof window.matchMedia!="function")return;let d=window.matchMedia(Ml);N=!!d.matches;let h=u=>{let S=!!(u&&typeof u.matches=="boolean"?u.matches:d.matches);S!==N&&(N=S,ce())};typeof d.addEventListener=="function"?(d.addEventListener("change",h),U.push(()=>d.removeEventListener("change",h))):typeof d.addListener=="function"&&(d.addListener(h),U.push(()=>d.removeListener(h)))}function We(d){let h=d.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!h)return;let u=h.dataset.beadId||"",S=h.dataset.lane||"";m={bead_id:u,from_lane:S};try{d.dataTransfer?.setData("text/plain",u),d.dataTransfer&&(d.dataTransfer.effectAllowed="move")}catch{}}function Ne(d){let h=d.target?.closest?.(".worker-pane");if(!h)return;let u=h.dataset.lane||"";u!=="candidate"&&u!=="queue"||(d.preventDefault(),d.dataTransfer&&(d.dataTransfer.dropEffect="move"),h.classList.add("worker-pane--drag-over"))}function rt(d){d.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function at(d,h){let u=w.find(Q=>Q.id===d);if(!u)return;let S=w.filter(Q=>Q.id!==d),y=S.length;if(h){let Q=h.dataset.beadId;if(Q===d)return;let q=S.findIndex(ue=>ue.id===Q);q>=0&&(y=q)}let I=S.slice();I.splice(y,0,u),g.applyReorder(d,I,y)}function me(d){let h=d.target?.closest?.(".worker-pane");if(!h)return;d.preventDefault(),h.classList.remove("worker-pane--drag-over");let u=h.dataset.lane||"",S=m?.bead_id||d.dataTransfer?.getData("text/plain")||"",y=m?.from_lane||"";if(m=null,!S)return;let I=d.target?.closest?.(".worker-mini, .worker-card"),Q=Array.from(h.querySelectorAll(".worker-mini, .worker-card")),q=Q.length;if(I){let ue=Q.indexOf(I);ue>=0&&(q=ue)}if(h.classList.contains("worker-pane--collapsed")&&(q=Qe()),u==="candidate"){if(y==="candidate"){at(S,I);return}y==="queue"&&Ee(S);return}u==="queue"&&(y==="queue"?ve(S,q):Ue(S,q))}function Pe(d){$=d,Cl(d),ce()}function Fe(d){v=d==="board"||d==="created"||d==="spec"?d:Hr,Ol(v),ce()}function Le(d){let h=d.target?.closest?.(".worker-filter__blocked");if(h){Pe({...$,show_blocked:h.checked});return}let u=d.target?.closest?.(".worker-sort");if(u){Fe(u.value||Hr);return}let S=d.target?.closest?.(".worker-slots__input");if(!S)return;let y=Number.parseInt(S.value,10);if(!Number.isFinite(y)){ce();return}Re(y).then(ce)}function R(d){return d?{runner:d.runner||void 0,model:d.model||void 0,effort:d.effort||void 0,worktree:d.worktree||void 0,status:d.status||void 0,session_id:d.session_id||void 0}:{}}function D(d){let h=ke(),u=h.attempts?h.attempts[d]:null;P=d,T.hidden=!1,H.open({attempt_id:d,meta:R(u)}),ce()}function X(){if(!P)return;let d=ke(),h=d.attempts?d.attempts[P]:null;if(h){H.updateMeta(R(h));return}H.close()}function V(d){let h=d.target;if(h?.closest?.("#worker-exec-defaults-dialog"))return;if(h?.closest?.(".worker-exec-defaults-btn")){K.open();return}let u=h?.closest?.(".worker-banner__resume");if(u){let te=u.dataset.attemptId;te&&it(te);return}let S=h?.closest?.(".worker-banner__dismiss");if(S){let te=S.dataset.attemptId;te&&he(te);return}if(h?.closest?.(".worker-play")){nt(!ke().auto_advance);return}let y=h?.closest?.(".worker-pane__hd--toggle");if(y){let te=y.dataset.lane;(te==="queue"||te==="done")&&Oe(te);return}let I=h?.closest?.(".worker-card__place");if(I){let te=I.dataset.beadId;te&&!I.disabled&&Ue(te,Qe());return}let Q=h?.closest?.(".worker-filter__chip");if(Q){let te=Q.dataset.spec;(te==="all"||te==="with"||te==="without")&&Pe({...$,spec:te});return}let q=h?.closest?.(".worker-mini__merge");if(q){et(q.dataset.beadId||"");return}let ue=h?.closest?.(".worker-mini__discard");if(ue){ae(ue.dataset.beadId||"");return}let Te=h?.closest?.(".worker-mini__revise-fix");if(Te){Be("worker-revise-fix",Te.dataset.beadId||"");return}let st=h?.closest?.(".worker-mini__revise-approve");if(st){Be("worker-revise-approve",st.dataset.beadId||"");return}if(h?.closest?.(".worker-mini__pr"))return;if(h?.closest?.(".rtile__stop")){let _e=h?.closest?.(".rtile")?.dataset?.attemptId;_e&&Je(_e);return}if(h?.closest?.(".rtile__pause")){let _e=h?.closest?.(".rtile")?.dataset?.attemptId;_e&&fe(_e);return}if(h?.closest?.(".rtile__resume")){let _e=h?.closest?.(".rtile")?.dataset?.attemptId;_e&&it(_e);return}if(h?.closest?.(".rtile__session")){let _e=h?.closest?.(".rtile")?.dataset?.attemptId;_e&&D(_e);return}if(h?.closest?.(".worker-drawer-overlay__backdrop")){H.close();return}if(h?.closest?.(".worker-drawer-host"))return;let ft=h?.closest?.(".rtile");if(ft){if(h?.closest?.(".rtile__id")){let _e=ft.dataset.beadId;_e&&Lt(_e).then(_=>{_?Z("\uBCF5\uC0AC\uB428","success",1200):Z("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let te=ft.dataset.beadId;te&&l&&l(te);return}let Ze=h?.closest?.(".worker-mini, .worker-card");if(Ze){let te=Ze.dataset.beadId;if(h?.closest?.(".worker-mini__id, .worker-card__id")){te&&Lt(te).then(_e=>{_e?Z("\uBCF5\uC0AC\uB428","success",1200):Z("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}te&&l&&l(te)}}return t.addEventListener("dragstart",We),t.addEventListener("dragover",Ne),t.addEventListener("dragleave",rt),t.addEventListener("drop",me),t.addEventListener("click",V),t.addEventListener("change",Le),Me(),xe(),c&&U.push(c.subscribe(ce)),s&&U.push(s.subscribe(()=>{ce(),X()})),ce(),{load(){ce()},destroy(){for(let d of U.splice(0))try{d()}catch{}t.removeEventListener("dragstart",We),t.removeEventListener("dragover",Ne),t.removeEventListener("dragleave",rt),t.removeEventListener("drop",me),t.removeEventListener("click",V),t.removeEventListener("change",Le);try{H.destroy()}catch{}T.hidden=!0;try{K.destroy()}catch{}de(p``,t)}}}function Gn(t){if(!t)return"Unknown";let e=t.split("/").filter(Boolean);return e.length>0?e[e.length-1]:"Unknown"}function Wo(t,e,r,n=async()=>{},s=async()=>{}){let o=ye("views:workspace-picker"),i=null,l=!1,a=!1,c=!1;async function g(T){let b=T.target.value,P=e.getState().workspace?.current?.path||"";if(b&&b!==P){o("switching workspace to %s",b),l=!0,A();try{await r(b)}catch(H){o("workspace switch failed: %o",H)}finally{l=!1,A()}}}async function m(){let T=e.getState(),x=T.workspace?.current?.path||T.workspace?.available?.[0]?.path||"";if(!(!x||a)){o("git-pulling workspace %s",x),a=!0,A();try{await n(x)}catch(b){o("workspace git pull failed: %o",b)}finally{a=!1,A()}}}function w(T){let x=T.target;x&&t.contains(x)||C()}function $(T){T.key==="Escape"&&C()}function v(){c||(c=!0,document.addEventListener("mousedown",w),document.addEventListener("keydown",$),A())}function C(){c&&(c=!1,document.removeEventListener("mousedown",w),document.removeEventListener("keydown",$),A())}function N(){c?C():v()}async function F(T){let x=T.target,b=x.value,M=x.checked;o("toggling visibility %s \u2192 %s",b,String(M));try{await s(b,M)}catch(P){o("workspace visibility toggle failed: %o",P)}}function B(T){return T?p`
      <button
        type="button"
        class="workspace-picker__git-pull-button"
        @click=${m}
        ?disabled=${l||a}
        aria-label="Git Pull"
        title="Git Pull"
      >
        <span aria-hidden="true">⬇</span>
      </button>
    `:p``}function U(T,x){return p`
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
        ${c?p`
              <div
                class="workspace-picker__manage-popover"
                role="menu"
                aria-label="프로젝트 표시 선택"
              >
                ${T.map(b=>p`
                    <label
                      class="workspace-picker__manage-row"
                      title="${b.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${b.path}"
                        .checked=${!x.has(b.path)}
                        @change=${F}
                      />
                      <span class="workspace-picker__manage-name"
                        >${Gn(b.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function O(){let T=e.getState(),x=T.workspace?.current,b=T.workspace?.available||[],M=new Set(T.workspace?.hidden||[]),P=x?.path||b[0]?.path||"";if(b.length===0)return p``;let H=b.filter(K=>!M.has(K.path)||K.path===P);if(H.length<=1){let K=H[0]||b[0],ke=Gn(K.path);return p`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${K.path}"
            >${ke}</span
          >
          ${U(b,M)}
          ${B(P)}
          ${a?p`<span
                class="workspace-picker__loading"
                aria-hidden="true"
              ></span>`:""}
        </div>
      `}return p`
      <div class="workspace-picker">
        <select
          class="workspace-picker__select"
          @change=${g}
          ?disabled=${l||a}
          aria-label="Select project workspace"
        >
          ${H.map(K=>p`
              <option
                value="${K.path}"
                ?selected=${K.path===P}
                title="${K.path}"
              >
                ${Gn(K.path)}
              </option>
            `)}
        </select>
        ${U(b,M)}
        ${B(P)}
        ${l||a?p`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function A(){de(O(),t)}return A(),i=e.subscribe(()=>A()),{destroy(){i&&(i(),i=null),document.removeEventListener("mousedown",w),document.removeEventListener("keydown",$),de(p``,t)}}}var Go=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-queue-set-slots","worker-queue-set-exec-default","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-pr-merge","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append"];function jn(){let t=Date.now().toString(36),e=Math.random().toString(36).slice(2,8);return`${t}-${e}`}function jo(t,e,r=jn()){return{id:r,type:t,payload:e}}function Yo(t={}){let e=ye("ws"),r={initialMs:t.backoff?.initialMs??1e3,maxMs:t.backoff?.maxMs??3e4,factor:t.backoff?.factor??2,jitterRatio:t.backoff?.jitterRatio??.2},n=()=>t.url&&t.url.length>0?t.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",i=0,l=null,a=!0,c=new Map,g=[],m=new Map,w=new Set;function $(O){for(let A of Array.from(w))try{A(O)}catch{}}function v(){if(!a||l)return;o="reconnecting",e("ws reconnecting\u2026"),$(o);let O=Math.min(r.maxMs||0,(r.initialMs||0)*Math.pow(r.factor||1,i)),A=(r.jitterRatio||0)*O,T=Math.max(0,Math.round(O+(Math.random()*2-1)*A));e("ws retry in %d ms (attempt %d)",T,i+1),l=setTimeout(()=>{l=null,U()},T)}function C(O){try{s?.send(JSON.stringify(O))}catch(A){e("ws send failed",A)}}function N(){for(o="open",e("ws open"),$(o),i=0;g.length;){let O=g.shift();O&&C(O)}}function F(O){let A;try{A=JSON.parse(String(O.data))}catch{e("ws received non-JSON message");return}if(!A||typeof A.id!="string"||typeof A.type!="string"){e("ws received invalid envelope");return}if(c.has(A.id)){let x=c.get(A.id);c.delete(A.id),A.ok?x?.resolve(A.payload):x?.reject(A.error||new Error("ws error"));return}let T=m.get(A.type);if(T&&T.size>0)for(let x of Array.from(T))try{x(A.payload)}catch(b){e("ws event handler error",b)}else e("ws received unhandled message type: %s",A.type)}function B(){o="closed",e("ws closed"),$(o);for(let[O,A]of c.entries())A.reject(new Error("ws disconnected")),c.delete(O);i+=1,v()}function U(){if(!a)return;let O=n();try{s=new WebSocket(O),e("ws connecting %s",O),o="connecting",$(o),s.addEventListener("open",N),s.addEventListener("message",F),s.addEventListener("error",()=>{}),s.addEventListener("close",B)}catch(A){e("ws connect failed %o",A),v()}}return U(),{send(O,A){if(!Go.includes(O))return Promise.reject(new Error(`unknown message type: ${O}`));let T=jn(),x=jo(O,A,T);return e("send %s id=%s",O,T),new Promise((b,M)=>{c.set(T,{resolve:b,reject:M,type:O}),s&&s.readyState===s.OPEN?C(x):(e("queue %s id=%s (state=%s)",O,T,o),g.push(x))})},on(O,A){m.has(O)||m.set(O,new Set);let T=m.get(O);return T?.add(A),()=>{T?.delete(A)}},onConnection(O){return w.add(O),()=>{w.delete(O)}},reconnect(){a=!0,l&&(clearTimeout(l),l=null),i=0,U()},close(){a=!1,l&&(clearTimeout(l),l=null);try{s?.close()}catch{}},getState(){return o}}}function jl(){let t=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof t?.workspace_config?.default_workspace=="string"&&t.workspace_config.default_workspace.length>0?t.workspace_config.default_workspace:null}}}async function Yl(t,e){try{let n=await(await fetch("/api/config")).json();t.setState({config:n})}catch(r){e("config refresh failed",r)}}var Yn=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],Vo=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"]],Ko="worker:queue",Zo="ui:order",Xo="ui:display-policy",yt="tab:board:closed",Qo="beads-ui.board.closed-range";function Vl(t){let e=ye("main");e("bootstrap start");let r=p`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;de(r,t);let n=document.getElementById("top-nav"),s=document.getElementById("board-root"),o=document.getElementById("worker-root"),i=document.getElementById("detail-panel");if(s&&o&&i){let b=function(_,k){let Y="Request failed",j="";if(_&&typeof _=="object"){let be=_;if(typeof be.message=="string"&&be.message.length>0&&(Y=be.message),typeof be.details=="string")j=be.details;else if(be.details&&typeof be.details=="object")try{j=JSON.stringify(be.details,null,2)}catch{j=""}}else typeof _=="string"&&_.length>0&&(Y=_);let J=k&&k.length>0?`Failed to load ${k}`:"Request failed";x.open(J,Y,j)},ae=function(_){return`${y.getState().workspace.current?.path||""}\0${_}`},Be=function(){Ue&&(Ue().catch(()=>{}),Ue=null),ve=null,Ee=null},Re=function(_){Je=_;let k=()=>{Je!==_||y.getState().selected_id!==_||(Je=null,nt(_))};if(!he){it.then(k);return}k()},tt=function(){let _=is(ze);return _===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:_}}},De=function(_){if(_)for(let[k,Y]of Yn){if(Ie.has(k)||$e.has(k))continue;let j=k===yt?tt():{type:Y};try{K.register(k,j)}catch(J){e("register %s store failed: %o",k,J)}$e.add(k),H.subscribeList(k,j).then(J=>{Ie.set(k,J)}).catch(J=>{e("subscribe %s failed: %o",k,J),b(J,"board")}).finally(()=>{$e.delete(k)})}else Oe()},Oe=function(){for(let[_]of Yn){let k=Ie.get(_);k&&(k().catch(()=>{}),Ie.delete(_));try{K.unregister(_)}catch(Y){e("unregister %s failed: %o",_,Y)}}},Me=function(_){if(!_){We();return}for(let[k,Y]of Vo)if(!(ce.has(k)||$e.has(k))){try{K.register(k,{type:Y})}catch(j){e("register %s store failed: %o",k,j)}$e.add(k),H.subscribeList(k,{type:Y}).then(j=>{ce.set(k,j)}).catch(j=>{e("subscribe %s failed: %o",k,j),b(j,"worker")}).finally(()=>{$e.delete(k)})}xe||(P("subscribe-worker-queue",{id:Ko}).catch(k=>{e("subscribe-worker-queue failed: %o",k)}),xe=()=>P("unsubscribe-worker-queue",{id:Ko}))},We=function(){for(let[_]of Vo){let k=ce.get(_);k&&(k().catch(()=>{}),ce.delete(_));try{K.unregister(_)}catch(Y){e("unregister %s failed: %o",_,Y)}}xe&&(xe().catch(()=>{}),xe=null)},rt=function(){Ne||(P("subscribe-ui-order",{id:Zo}).catch(_=>{e("subscribe-ui-order failed: %o",_)}),Ne=()=>P("unsubscribe-ui-order",{id:Zo}))},at=function(){Ne&&(Ne().catch(()=>{}),Ne=null),oe.clear()},Pe=function(){me||(P("subscribe-display-policy",{id:Xo}).catch(_=>{e("subscribe-display-policy failed: %o",_)}),me=()=>P("unsubscribe-display-policy",{id:Xo}))},Fe=function(){me&&(me().catch(()=>{}),me=null),ee.clear()},d=function(_){if(!_)return"Unknown";let k=_.split("/").filter(Boolean);return k.length>0?k[k.length-1]:"Unknown"};var l=b,a=ae,c=Be,g=Re,m=tt,w=De,$=Oe,v=Me,C=We,N=rt,F=at,B=Pe,U=Fe,O=d;let A=document.getElementById("header-loading"),T=Cs(A),x=Eo(t),M=Yo(),P=T.wrapSend((_,k)=>M.send(_,k)),H=vs(P),K=$s(),ke=Ss(),oe=xs(),ee=as(),Qe=ls();M.on("ui-order-snapshot",_=>{let k=_;if(k&&typeof k.revision=="number")try{oe.set({revision:k.revision,order:k.order&&typeof k.order=="object"?k.order:{}})}catch{}}),M.on("display-policy-snapshot",_=>{let k=_;if(k&&k.policy&&typeof k.policy=="object")try{ee.set(k.policy)}catch{}}),M.on("session-log-snapshot",_=>{let k=_;if(k&&typeof k.attempt_id=="string")try{Qe.set(k.attempt_id,Array.isArray(k.lines)?k.lines:[])}catch{}}),M.on("session-log-append",_=>{let k=_;if(k&&typeof k.attempt_id=="string")try{Qe.append(k.attempt_id,k.event)}catch{}}),M.on("snapshot",_=>{let k=_,Y=k&&typeof k.id=="string"?k.id:"",j=Y?K.getStore(Y):null;if(j&&k&&k.type==="snapshot")try{j.applyPush(k)}catch{}}),M.on("upsert",_=>{let k=_,Y=k&&typeof k.id=="string"?k.id:"",j=Y?K.getStore(Y):null;if(j&&k&&k.type==="upsert")try{j.applyPush(k)}catch{}}),M.on("delete",_=>{let k=_,Y=k&&typeof k.id=="string"?k.id:"",j=Y?K.getStore(Y):null;if(j&&k&&k.type==="delete")try{j.applyPush(k)}catch{}});let Ue=null,ve=null,Ee=null,Je=null,fe=()=>{},it=new Promise(_=>{fe=()=>_(void 0)}),he=!1,et=!1;async function nt(_){let k=ae(_);if(k===ve||k===Ee)return;Ee=k;let Y=`detail:${_}`,j={type:"issue-detail",params:{id:_}};try{K.register(Y,j)}catch(J){e("register detail store failed: %o",J)}try{let J=await H.subscribeList(Y,j);if(y.getState().selected_id!==_||ae(_)!==k){await J().catch(()=>{});return}Ue&&await Ue().catch(()=>{}),Ue=J,ve=k}catch(J){e("detail subscribe failed: %o",J),b(J,"issue details")}finally{Ee===k&&(Ee=null)}}let Ie=new Map,$e=new Set,ze=wr;try{let _=window.localStorage.getItem(Qo);tn(_)&&(ze=_)}catch{}async function He(_){if(!tn(_)||_===ze)return;ze=_;try{window.localStorage.setItem(Qo,_)}catch{}let k=Ie.get(yt);if(!k)return;Ie.delete(yt),await k().catch(()=>{});let Y=tt();try{K.register(yt,Y)}catch(j){e("register %s store failed: %o",yt,j)}try{let j=await H.subscribeList(yt,Y);Ie.set(yt,j)}catch(j){e("re-subscribe %s failed: %o",yt,j),b(j,"board")}}let ce=new Map,xe=null,Ne=null,me=null;async function Le(){me=null,ee.clear(),xe=null;let _=y.getState().workspace.current?.path;if(_)try{await M.send("set-workspace",{path:_})}catch(k){e("workspace restore after reconnect failed: %o",k);return}Pe(),Me(y.getState().view==="worker")}async function R(){e("clearing all subscriptions for workspace switch"),Oe(),We(),ke.clear(),at(),rt(),Fe(),Pe(),Be();let _=y.getState();if(_.selected_id)try{K.unregister(`detail:${_.selected_id}`)}catch{}let k=y.getState();De(k.view==="board"),Me(k.view==="worker"),k.selected_id&&Re(k.selected_id)}async function D(_){e("requesting workspace switch to %s",_),et=!0;try{let k=await M.send("set-workspace",{path:_});e("workspace switch result: %o",k),k&&k.workspace&&(y.setState({workspace:{current:{path:k.workspace.root_dir,database:k.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",_),k.changed&&(await R(),Z("Switched to "+d(_),"success",2e3)))}catch(k){throw e("workspace switch failed: %o",k),Z("Failed to switch workspace","error",3e3),k}finally{et=!1}}async function X(_){e("requesting workspace git pull for %s",_);try{let k=await M.send("git-pull-workspace",{});e("workspace git pull result: %o",k);let Y=k?.status;if(Y==="up_to_date"){Z("Already up to date","success",2e3);return}if(Y==="stash_pop_conflict"){Z("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}Z("Git pulled "+d(_),"success",2e3)}catch(k){e("workspace git pull failed: %o",k);let Y=k?.code,j=k?.message;if(Y==="rebase_conflict"){Z("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(Y==="rebase_conflict_abort_failed"){Z("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(Y==="busy"){Z("Git pull skipped: another operation is running","warning",3e3);return}let J=j?`: ${j}`:"";throw Z(`Git pull failed${J}`,"error",3e3),k}}async function V(_,k){e("setting workspace visibility %s \u2192 %s",_,String(k));try{await M.send("set-workspace-visibility",{path:_,visible:k}),await h()}catch(Y){e("workspace visibility update failed: %o",Y),Z("Failed to update project visibility","error",3e3)}}async function h(){try{let _=await M.send("list-workspaces",{});if(e("workspaces loaded: %o",_),_&&Array.isArray(_.workspaces)){let k=_.workspaces.map(be=>({path:be.path,database:be.database,pid:be.pid,version:be.version})),Y=_.current?{path:_.current.root_dir,database:_.current.db_path}:null,j=Array.isArray(_.hidden)?_.hidden.filter(be=>typeof be=="string"):[];y.setState({workspace:{current:Y,available:k,hidden:j}});let J=window.localStorage.getItem("beads-ui.workspace");J&&(!k.some(Ot=>Ot.path===J)||j.includes(J)?window.localStorage.removeItem("beads-ui.workspace"):Y&&J!==Y.path&&(e("restoring saved workspace preference: %s",J),await D(J)))}}catch(_){e("failed to load workspaces: %o",_)}}M.on("workspace-changed",_=>{e("workspace-changed event: %o",_),_&&_.root_dir&&(y.setState({workspace:{current:{path:_.root_dir,database:_.db_path}}}),h(),R())});let u=!1;if(typeof M.onConnection=="function"){let _=k=>{e("ws state %s",k),k==="reconnecting"||k==="closed"?(u=!0,Z("Connection lost. Reconnecting\u2026","error",4e3)):k==="open"&&u&&(u=!1,Z("Reconnected","success",2200),Yl(y,(Y,j)=>{e(`${Y}: %o`,j)}),Le())};M.onConnection(_)}let S="board";try{let _=window.localStorage.getItem("beads-ui.view");(_==="board"||_==="worker")&&(S=_)}catch(_){e("view parse error: %o",_)}let y=Es({config:jl(),view:S});M.on("worker-queue-snapshot",_=>{let k=_;if(!k||!k.queue)return;let Y=y.getState().workspace.current?.path;if(typeof Y=="string"&&Y.length>0&&k.root_dir!==Y){e("dropping worker-queue snapshot for %s",String(k.root_dir));return}try{ke.set(k.queue)}catch{}});let I=Ts(y);I.start();let Q=async(_,k)=>{try{return await P(_,k)}catch{return[]}};n&&Co(n,y,I);let q=document.getElementById("workspace-picker");q&&Wo(q,y,D,X,V);let ue=Do(t,(_,k)=>P(_,k));try{let _=document.getElementById("new-issue-btn");_&&_.addEventListener("click",()=>ue.open())}catch{}let Te=Ao(t,{policyStore:ee,transport:(_,k)=>P(_,k),labelOptions:()=>{let _=new Set;for(let[k]of Yn)for(let Y of K.snapshotFor(k)||[]){let j=Y.labels;if(Array.isArray(j))for(let J of j)typeof J=="string"&&J.length>0&&_.add(J)}return Array.from(_).sort()}});try{let _=document.getElementById("display-settings-btn");_&&_.addEventListener("click",()=>Te.open())}catch{}let st=Ns(s,{gotoIssue:_=>I.gotoIssue(_),issueStores:K,transport:Q,uiOrderStore:oe,displayPolicyStore:ee,closedRange:ze,onClosedRangeChange:_=>{He(_)},onNewIssue:()=>ue.open()}),ft=Wn(o,{transport:Q,issueStores:K,queueStore:ke,sessionLogStore:Qe,uiOrderStore:oe,gotoIssue:_=>y.setState({selected_id:_}),getWorkspacePath:()=>y.getState().workspace.current?.path}),Ze=So(i,{issueStores:K,transport:Q,queueStore:ke,sessionLogStore:Qe,getWorkspacePath:()=>y.getState().workspace.current?.path,onNavigate:_=>{y.getState().view==="worker"?y.setState({selected_id:_}):I.gotoIssue(_)},onClose:()=>{let _=y.getState();y.setState({selected_id:null});try{I.gotoView(_.view==="worker"?"worker":"board")}catch{}}}),te=y.getState().selected_id;te&&(i.hidden=!1,Ze.load(te),Re(te)),y.subscribe(_=>{let k=_.selected_id;k?(i.hidden=!1,Ze.load(k),et||Re(k)):(Ze.clear(),i.hidden=!0,Be())});let _e=_=>{s.hidden=_.view!=="board",o.hidden=_.view!=="worker",De(_.view==="board"),Me(_.view==="worker"),!_.selected_id&&_.view==="board"&&st.load(),_.view==="worker"&&ft.load(),window.localStorage.setItem("beads-ui.view",_.view)};y.subscribe(_e),_e(y.getState()),rt(),Pe(),h().finally(()=>{he=!0,fe()}),window.addEventListener("keydown",_=>{let k=_.ctrlKey||_.metaKey,Y=String(_.key||"").toLowerCase(),j=_.target,J=j&&j.tagName?String(j.tagName).toLowerCase():"",be=J==="input"||J==="textarea"||J==="select"||j&&typeof j.isContentEditable=="boolean"&&j.isContentEditable;k&&Y==="n"&&(be||(_.preventDefault(),ue.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let r=window.localStorage.getItem("beads-ui.theme"),n=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=r==="dark"||r==="light"?r:n?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let t=document.getElementById("theme-switch");t&&t.addEventListener("change",()=>{let r=t.checked?"dark":"light";document.documentElement.setAttribute("data-theme",r),window.localStorage.setItem("beads-ui.theme",r)});let e=document.getElementById("app");e&&Vl(e)});export{Vl as bootstrap,jl as readBootstrapConfig,Yl as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
