var Jo=Object.create;var Gr=Object.defineProperty;var ei=Object.getOwnPropertyDescriptor;var ti=Object.getOwnPropertyNames;var ri=Object.getPrototypeOf,ni=Object.prototype.hasOwnProperty;var si=(t,e,r)=>e in t?Gr(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r;var jr=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports);var oi=(t,e,r,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of ti(e))!ni.call(t,s)&&s!==r&&Gr(t,s,{get:()=>e[s],enumerable:!(n=ei(e,s))||n.enumerable});return t};var ii=(t,e,r)=>(r=t!=null?Jo(ri(t)):{},oi(e||!t||!t.__esModule?Gr(r,"default",{value:t,enumerable:!0}):r,t));var pe=(t,e,r)=>si(t,typeof e!="symbol"?e+"":e,r);var ds=jr((rc,cs)=>{var Pt=1e3,Ft=Pt*60,Bt=Ft*60,At=Bt*24,ui=At*7,pi=At*365.25;cs.exports=function(t,e){e=e||{};var r=typeof t;if(r==="string"&&t.length>0)return fi(t);if(r==="number"&&isFinite(t))return e.long?gi(t):hi(t);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(t))};function fi(t){if(t=String(t),!(t.length>100)){var e=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(t);if(e){var r=parseFloat(e[1]),n=(e[2]||"ms").toLowerCase();switch(n){case"years":case"year":case"yrs":case"yr":case"y":return r*pi;case"weeks":case"week":case"w":return r*ui;case"days":case"day":case"d":return r*At;case"hours":case"hour":case"hrs":case"hr":case"h":return r*Bt;case"minutes":case"minute":case"mins":case"min":case"m":return r*Ft;case"seconds":case"second":case"secs":case"sec":case"s":return r*Pt;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r;default:return}}}}function hi(t){var e=Math.abs(t);return e>=At?Math.round(t/At)+"d":e>=Bt?Math.round(t/Bt)+"h":e>=Ft?Math.round(t/Ft)+"m":e>=Pt?Math.round(t/Pt)+"s":t+"ms"}function gi(t){var e=Math.abs(t);return e>=At?kr(t,e,At,"day"):e>=Bt?kr(t,e,Bt,"hour"):e>=Ft?kr(t,e,Ft,"minute"):e>=Pt?kr(t,e,Pt,"second"):t+" ms"}function kr(t,e,r,n){var s=e>=r*1.5;return Math.round(t/r)+" "+n+(s?"s":"")}});var ps=jr((nc,us)=>{function mi(t){r.debug=r,r.default=r,r.coerce=a,r.disable=i,r.enable=s,r.enabled=c,r.humanize=ds(),r.destroy=u,Object.keys(t).forEach(h=>{r[h]=t[h]}),r.names=[],r.skips=[],r.formatters={};function e(h){let g=0;for(let w=0;w<h.length;w++)g=(g<<5)-g+h.charCodeAt(w),g|=0;return r.colors[Math.abs(g)%r.colors.length]}r.selectColor=e;function r(h){let g,w=null,$,y;function C(...M){if(!C.enabled)return;let P=C,B=Number(new Date),q=B-(g||B);P.diff=q,P.prev=g,P.curr=B,g=B,M[0]=r.coerce(M[0]),typeof M[0]!="string"&&M.unshift("%O");let D=0;M[0]=M[0].replace(/%([a-zA-Z%])/g,(S,x)=>{if(S==="%%")return"%";D++;let b=r.formatters[x];if(typeof b=="function"){let O=M[D];S=b.call(P,O),M.splice(D,1),D--}return S}),r.formatArgs.call(P,M),(P.log||r.log).apply(P,M)}return C.namespace=h,C.useColors=r.useColors(),C.color=r.selectColor(h),C.extend=n,C.destroy=r.destroy,Object.defineProperty(C,"enabled",{enumerable:!0,configurable:!1,get:()=>w!==null?w:($!==r.namespaces&&($=r.namespaces,y=r.enabled(h)),y),set:M=>{w=M}}),typeof r.init=="function"&&r.init(C),C}function n(h,g){let w=r(this.namespace+(typeof g>"u"?":":g)+h);return w.log=this.log,w}function s(h){r.save(h),r.namespaces=h,r.names=[],r.skips=[];let g=(typeof h=="string"?h:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let w of g)w[0]==="-"?r.skips.push(w.slice(1)):r.names.push(w)}function o(h,g){let w=0,$=0,y=-1,C=0;for(;w<h.length;)if($<g.length&&(g[$]===h[w]||g[$]==="*"))g[$]==="*"?(y=$,C=w,$++):(w++,$++);else if(y!==-1)$=y+1,C++,w=C;else return!1;for(;$<g.length&&g[$]==="*";)$++;return $===g.length}function i(){let h=[...r.names,...r.skips.map(g=>"-"+g)].join(",");return r.enable(""),h}function c(h){for(let g of r.skips)if(o(h,g))return!1;for(let g of r.names)if(o(h,g))return!0;return!1}function a(h){return h instanceof Error?h.stack||h.message:h}function u(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return r.enable(r.load()),r}us.exports=mi});var fs=jr((Ze,yr)=>{Ze.formatArgs=bi;Ze.save=wi;Ze.load=ki;Ze.useColors=_i;Ze.storage=yi();Ze.destroy=(()=>{let t=!1;return()=>{t||(t=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();Ze.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function _i(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let t;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(t=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(t[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function bi(t){if(t[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+t[0]+(this.useColors?"%c ":" ")+"+"+yr.exports.humanize(this.diff),!this.useColors)return;let e="color: "+this.color;t.splice(1,0,e,"color: inherit");let r=0,n=0;t[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(r++,s==="%c"&&(n=r))}),t.splice(n,0,e)}Ze.log=console.debug||console.log||(()=>{});function wi(t){try{t?Ze.storage.setItem("debug",t):Ze.storage.removeItem("debug")}catch{}}function ki(){let t;try{t=Ze.storage.getItem("debug")||Ze.storage.getItem("DEBUG")}catch{}return!t&&typeof process<"u"&&"env"in process&&(t=process.env.DEBUG),t}function yi(){try{return localStorage}catch{}}yr.exports=ps()(Ze);var{formatters:vi}=yr.exports;vi.j=function(t){try{return JSON.stringify(t)}catch(e){return"[UnexpectedJSONParseError]: "+e.message}}});var Zt=globalThis,br=Zt.trustedTypes,Kn=br?br.createPolicy("lit-html",{createHTML:t=>t}):void 0,ts="$lit$",_t=`lit$${Math.random().toFixed(9).slice(2)}$`,rs="?"+_t,ai=`<${rs}>`,St=document,Xt=()=>St.createComment(""),Qt=t=>t===null||typeof t!="object"&&typeof t!="function",Jr=Array.isArray,li=t=>Jr(t)||typeof t?.[Symbol.iterator]=="function",Yr=`[ 	
\f\r]`,Kt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Zn=/-->/g,Xn=/>/g,$t=RegExp(`>|${Yr}(?:([^\\s"'>=/]+)(${Yr}*=${Yr}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Qn=/'/g,Jn=/"/g,ns=/^(?:script|style|textarea|title)$/i,en=t=>(e,...r)=>({_$litType$:t,strings:e,values:r}),p=en(1),Zl=en(2),Xl=en(3),Tt=Symbol.for("lit-noChange"),Se=Symbol.for("lit-nothing"),es=new WeakMap,xt=St.createTreeWalker(St,129);function ss(t,e){if(!Jr(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return Kn!==void 0?Kn.createHTML(e):e}var ci=(t,e)=>{let r=t.length-1,n=[],s,o=e===2?"<svg>":e===3?"<math>":"",i=Kt;for(let c=0;c<r;c++){let a=t[c],u,h,g=-1,w=0;for(;w<a.length&&(i.lastIndex=w,h=i.exec(a),h!==null);)w=i.lastIndex,i===Kt?h[1]==="!--"?i=Zn:h[1]!==void 0?i=Xn:h[2]!==void 0?(ns.test(h[2])&&(s=RegExp("</"+h[2],"g")),i=$t):h[3]!==void 0&&(i=$t):i===$t?h[0]===">"?(i=s??Kt,g=-1):h[1]===void 0?g=-2:(g=i.lastIndex-h[2].length,u=h[1],i=h[3]===void 0?$t:h[3]==='"'?Jn:Qn):i===Jn||i===Qn?i=$t:i===Zn||i===Xn?i=Kt:(i=$t,s=void 0);let $=i===$t&&t[c+1].startsWith("/>")?" ":"";o+=i===Kt?a+ai:g>=0?(n.push(u),a.slice(0,g)+ts+a.slice(g)+_t+$):a+_t+(g===-2?c:$)}return[ss(t,o+(t[r]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),n]},Jt=class t{constructor({strings:e,_$litType$:r},n){let s;this.parts=[];let o=0,i=0,c=e.length-1,a=this.parts,[u,h]=ci(e,r);if(this.el=t.createElement(u,n),xt.currentNode=this.el.content,r===2||r===3){let g=this.el.content.firstChild;g.replaceWith(...g.childNodes)}for(;(s=xt.nextNode())!==null&&a.length<c;){if(s.nodeType===1){if(s.hasAttributes())for(let g of s.getAttributeNames())if(g.endsWith(ts)){let w=h[i++],$=s.getAttribute(g).split(_t),y=/([.?@])?(.*)/.exec(w);a.push({type:1,index:o,name:y[2],strings:$,ctor:y[1]==="."?Kr:y[1]==="?"?Zr:y[1]==="@"?Xr:Nt}),s.removeAttribute(g)}else g.startsWith(_t)&&(a.push({type:6,index:o}),s.removeAttribute(g));if(ns.test(s.tagName)){let g=s.textContent.split(_t),w=g.length-1;if(w>0){s.textContent=br?br.emptyScript:"";for(let $=0;$<w;$++)s.append(g[$],Xt()),xt.nextNode(),a.push({type:2,index:++o});s.append(g[w],Xt())}}}else if(s.nodeType===8)if(s.data===rs)a.push({type:2,index:o});else{let g=-1;for(;(g=s.data.indexOf(_t,g+1))!==-1;)a.push({type:7,index:o}),g+=_t.length-1}o++}}static createElement(e,r){let n=St.createElement("template");return n.innerHTML=e,n}};function Mt(t,e,r=t,n){if(e===Tt)return e;let s=n!==void 0?r._$Co?.[n]:r._$Cl,o=Qt(e)?void 0:e._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(t),s._$AT(t,r,n)),n!==void 0?(r._$Co??(r._$Co=[]))[n]=s:r._$Cl=s),s!==void 0&&(e=Mt(t,s._$AS(t,e.values),s,n)),e}var Vr=class{constructor(e,r){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:r},parts:n}=this._$AD,s=(e?.creationScope??St).importNode(r,!0);xt.currentNode=s;let o=xt.nextNode(),i=0,c=0,a=n[0];for(;a!==void 0;){if(i===a.index){let u;a.type===2?u=new er(o,o.nextSibling,this,e):a.type===1?u=new a.ctor(o,a.name,a.strings,this,e):a.type===6&&(u=new Qr(o,this,e)),this._$AV.push(u),a=n[++c]}i!==a?.index&&(o=xt.nextNode(),i++)}return xt.currentNode=St,s}p(e){let r=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(e,n,r),r+=n.strings.length-2):n._$AI(e[r])),r++}},er=class t{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,r,n,s){this.type=2,this._$AH=Se,this._$AN=void 0,this._$AA=e,this._$AB=r,this._$AM=n,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,r=this._$AM;return r!==void 0&&e?.nodeType===11&&(e=r.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,r=this){e=Mt(this,e,r),Qt(e)?e===Se||e==null||e===""?(this._$AH!==Se&&this._$AR(),this._$AH=Se):e!==this._$AH&&e!==Tt&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):li(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==Se&&Qt(this._$AH)?this._$AA.nextSibling.data=e:this.T(St.createTextNode(e)),this._$AH=e}$(e){let{values:r,_$litType$:n}=e,s=typeof n=="number"?this._$AC(e):(n.el===void 0&&(n.el=Jt.createElement(ss(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===s)this._$AH.p(r);else{let o=new Vr(s,this),i=o.u(this.options);o.p(r),this.T(i),this._$AH=o}}_$AC(e){let r=es.get(e.strings);return r===void 0&&es.set(e.strings,r=new Jt(e)),r}k(e){Jr(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,n,s=0;for(let o of e)s===r.length?r.push(n=new t(this.O(Xt()),this.O(Xt()),this,this.options)):n=r[s],n._$AI(o),s++;s<r.length&&(this._$AR(n&&n._$AB.nextSibling,s),r.length=s)}_$AR(e=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);e!==this._$AB;){let n=e.nextSibling;e.remove(),e=n}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},Nt=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,r,n,s,o){this.type=1,this._$AH=Se,this._$AN=void 0,this.element=e,this.name=r,this._$AM=s,this.options=o,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=Se}_$AI(e,r=this,n,s){let o=this.strings,i=!1;if(o===void 0)e=Mt(this,e,r,0),i=!Qt(e)||e!==this._$AH&&e!==Tt,i&&(this._$AH=e);else{let c=e,a,u;for(e=o[0],a=0;a<o.length-1;a++)u=Mt(this,c[n+a],r,a),u===Tt&&(u=this._$AH[a]),i||(i=!Qt(u)||u!==this._$AH[a]),u===Se?e=Se:e!==Se&&(e+=(u??"")+o[a+1]),this._$AH[a]=u}i&&!s&&this.j(e)}j(e){e===Se?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},Kr=class extends Nt{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===Se?void 0:e}},Zr=class extends Nt{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==Se)}},Xr=class extends Nt{constructor(e,r,n,s,o){super(e,r,n,s,o),this.type=5}_$AI(e,r=this){if((e=Mt(this,e,r,0)??Se)===Tt)return;let n=this._$AH,s=e===Se&&n!==Se||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,o=e!==Se&&(n===Se||s);s&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},Qr=class{constructor(e,r,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=r,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){Mt(this,e)}};var di=Zt.litHtmlPolyfillSupport;di?.(Jt,er),(Zt.litHtmlVersions??(Zt.litHtmlVersions=[])).push("3.3.1");var de=(t,e,r)=>{let n=r?.renderBefore??e,s=n._$litPart$;if(s===void 0){let o=r?.renderBefore??null;n._$litPart$=s=new er(e.insertBefore(Xt(),o),o,void 0,r??{})}return s._$AI(t),s};var wr="today",os=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}];function tn(t){return t==="today"||t==="7d"||t==="30d"||t==="all"}function is(t,e=Date.now()){switch(t){case"today":{let r=new Date(e);return r.setHours(0,0,0,0),r.getTime()}case"7d":return e-7*864e5;case"30d":return e-30*864e5;case"all":default:return}}function as(){let t=null,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{get(){return t},set(n){t=n,r()},clear(){t=null,r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}function ls(){let t=new Map,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{set(n,s){t.set(n,{lines:Array.isArray(s)?[...s]:[]}),r()},append(n,s){let o=t.get(n)||{lines:[]};o.lines=[...o.lines,s],t.set(n,o),r()},get(n){return t.get(n)||null},clear(n){typeof n=="string"?t.delete(n):t.clear(),r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}var hs=ii(fs(),1);function ye(t){return(0,hs.default)(`beads-ui:${t}`)}function ct(t){if(typeof t=="number")return Number.isFinite(t)?t:0;if(typeof t=="string"){let e=Date.parse(t);return Number.isFinite(e)?e:0}return 0}function Et(t,e){let r=ct(t.created_at),n=ct(e.created_at);if(r!==n)return r<n?1:-1;let s=t.priority??2,o=e.priority??2;if(s!==o)return s-o;let i=t.id,c=e.id;return i<c?-1:i>c?1:0}function _s(t,e){let r=ct(t.created_at),n=ct(e.created_at);if(r!==n)return r<n?-1:1;let s=t.priority??2,o=e.priority??2;if(s!==o)return s-o;let i=t.id,c=e.id;return i<c?-1:i>c?1:0}function bs(t,e){let r=ct(t.updated_at),n=ct(e.updated_at);if(r!==n)return r<n?1:-1;let s=t.id,o=e.id;return s<o?-1:s>o?1:0}function ws(t,e){let r=t.priority??2,n=e.priority??2;if(r!==n)return r-n;let s=ct(t.created_at),o=ct(e.created_at);if(s!==o)return s<o?1:-1;let i=t.id,c=e.id;return i<c?-1:i>c?1:0}function ks(t,e){let r=t.closed_at??0,n=e.closed_at??0;if(r!==n)return r<n?1:-1;let s=t?.id,o=e?.id;return s<o?-1:s>o?1:0}var $i=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function gs(t){let e=t&&t.metadata,r=e?e.task_order:void 0;if(r==null||r==="")return Number.POSITIVE_INFINITY;let n=Number(r);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function ms(t){let e=t&&t.title;if(typeof e!="string")return Number.POSITIVE_INFINITY;let r=$i.exec(e);if(!r)return Number.POSITIVE_INFINITY;let n=Number(r[1]);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function ys(t,e){let r=gs(t),n=gs(e);if(r!==n)return r<n?-1:1;let s=ms(t),o=ms(e);if(s!==o)return s<o?-1:1;let i=ct(t&&t.created_at),c=ct(e&&e.created_at);if(i!==c)return i<c?-1:1;let a=t&&t.id,u=e&&e.id;return a===u?0:String(a)<String(u)?-1:1}var rn=2**20;function qt(t,e){let r=t&&t.id;return e&&typeof r=="string"&&Object.prototype.hasOwnProperty.call(e,r)&&typeof e[r]=="number"&&Number.isFinite(e[r])?e[r]:-ct(t&&t.created_at)}function vr(t){return(e,r)=>{let n=qt(e,t),s=qt(r,t);if(n!==s)return n<s?-1:1;let o=e?.id,i=r?.id;return o<i?-1:o>i?1:0}}function nn(t,e,r){let n=Array.isArray(t)?t:[],s=n.length,o=Math.max(0,Math.min(e,s-1)),i=o-1>=0?n[o-1]:null,c=o+1<s?n[o+1]:null;if(!i&&!c)return{rank:0};if(!i)return{rank:qt(c,r)-rn};if(!c)return{rank:qt(i,r)+rn};let a=qt(i,r),u=qt(c,r),h=(a+u)/2;return a<h&&h<u?{rank:h}:{renormalize:n.map((g,w)=>({bead_id:g.id,rank:w*rn}))}}function sn(t,e={}){let r=ye(`issue-store:${t}`),n=new Map,s=[],o=0,i=new Set,c=!1,a=e.sort||Et;function u(){for(let w of Array.from(i))try{w()}catch{}}function h(){s=Array.from(n.values()).sort(a)}function g(w){if(c||!w||w.id!==t)return;let $=Number(w.revision)||0;if(r("apply %s rev=%d",w.type,$),!($<=o&&w.type!=="snapshot")){if(w.type==="snapshot"){if($<=o)return;n.clear();let y=Array.isArray(w.issues)?w.issues:[];for(let C of y)C&&typeof C.id=="string"&&C.id.length>0&&n.set(C.id,C);h(),o=$,u();return}if(w.type==="upsert"){let y=w.issue;if(y&&typeof y.id=="string"&&y.id.length>0){let C=n.get(y.id);if(!C)n.set(y.id,y);else{let M=Number.isFinite(C.updated_at)?C.updated_at:0,P=Number.isFinite(y.updated_at)?y.updated_at:0;if(M<=P){for(let B of Object.keys(C))B in y||delete C[B];for(let[B,q]of Object.entries(y))C[B]=q}}h()}o=$,u()}else if(w.type==="delete"){let y=String(w.issue_id||"");y&&(n.delete(y),h()),o=$,u()}}}return{id:t,subscribe(w){return i.add(w),()=>{i.delete(w)}},applyPush:g,snapshot(){return s},size(){return n.size},getById(w){return n.get(w)},dispose(){c=!0,n.clear(),s=[],i.clear(),o=0}}}function $r(t){let e=String(t.type||"").trim(),r={};if(t.params&&typeof t.params=="object"){let s=Object.keys(t.params).sort();for(let o of s){let i=t.params[o];r[o]=String(i)}}let n=new URLSearchParams(r).toString();return n.length>0?`${e}?${n}`:e}function vs(t){let e=ye("subs"),r=new Map,n=new Map;function s(c,a){e("applyDelta %s +%d ~%d -%d",c,(a.added||[]).length,(a.updated||[]).length,(a.removed||[]).length);let u=n.get(c);if(!u||u.size===0)return;let h=Array.isArray(a.added)?a.added:[],g=Array.isArray(a.updated)?a.updated:[],w=Array.isArray(a.removed)?a.removed:[];for(let $ of Array.from(u)){let y=r.get($);if(!y)continue;let C=y.itemsById;for(let M of h)typeof M=="string"&&M.length>0&&C.set(M,!0);for(let M of g)typeof M=="string"&&M.length>0&&C.set(M,!0);for(let M of w)typeof M=="string"&&M.length>0&&C.delete(M)}}async function o(c,a){let u=$r(a);if(e("subscribe %s key=%s",c,u),!r.has(c))r.set(c,{key:u,itemsById:new Map});else{let g=r.get(c);if(g&&g.key!==u){let w=n.get(g.key);w&&(w.delete(c),w.size===0&&n.delete(g.key)),r.set(c,{key:u,itemsById:new Map})}}n.has(u)||n.set(u,new Set);let h=n.get(u);h&&h.add(c);try{await t("subscribe-list",{id:c,type:a.type,params:a.params})}catch(g){let w=r.get(c)||null;if(w){let $=n.get(w.key);$&&($.delete(c),$.size===0&&n.delete(w.key))}throw r.delete(c),g}return async()=>{e("unsubscribe %s key=%s",c,u);try{await t("unsubscribe-list",{id:c})}catch{}let g=r.get(c)||null;if(g){let w=n.get(g.key);w&&(w.delete(c),w.size===0&&n.delete(g.key))}r.delete(c)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:$r,selectors:{getIds(c){let a=r.get(c);return a?Array.from(a.itemsById.keys()):[]},has(c,a){let u=r.get(c);return u?u.itemsById.has(a):!1},count(c){let a=r.get(c);return a?a.itemsById.size:0},getItemsById(c){let a=r.get(c),u={};if(!a)return u;for(let h of a.itemsById.keys())u[h]=!0;return u}}}}function $s(){let t=ye("issue-stores"),e=new Map,r=new Map,n=new Set,s=new Map;function o(){for(let a of Array.from(n))try{a()}catch{}}function i(a,u,h){let g=u?$r(u):"",w=r.get(a)||"",$=e.has(a);if(t("register %s key=%s (prev=%s)",a,g,w),$&&w&&g&&w!==g){let y=e.get(a);if(y)try{y.dispose()}catch{}let C=s.get(a);if(C){try{C()}catch{}s.delete(a)}let M=sn(a,h);e.set(a,M);let P=M.subscribe(()=>o());s.set(a,P)}else if(!$){let y=sn(a,h);e.set(a,y);let C=y.subscribe(()=>o());s.set(a,C)}return r.set(a,g),()=>c(a)}function c(a){t("unregister %s",a),r.delete(a);let u=e.get(a);u&&(u.dispose(),e.delete(a));let h=s.get(a);if(h){try{h()}catch{}s.delete(a)}}return{register:i,unregister:c,getStore(a){return e.get(a)||null},snapshotFor(a){let u=e.get(a);return u?u.snapshot().slice():[]},subscribe(a){return n.add(a),()=>n.delete(a)}}}function xs(){let t=null,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{get(){return t},set(n){t=n,r()},clear(){t=null,r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}function Ss(){let t=null,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{get(){return t},set(n){t=n,r()},clear(){t=null,r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}function on(t,e){return`#/${t==="worker"?"worker":"board"}?issue=${encodeURIComponent(e)}`}function xi(t){let e=String(t||""),r=e.startsWith("#")?e.slice(1):e,n=r.indexOf("?"),s=n>=0?r.slice(n+1):"";if(s){let c=new URLSearchParams(s).get("issue");if(c)return decodeURIComponent(c)}let o=/^\/issue\/([^\s?#]+)/.exec(r);return o&&o[1]?decodeURIComponent(o[1]):null}function Si(t){let e=String(t||"");return/^#\/worker(\b|\/|$)/.test(e)?"worker":"board"}function Ts(t){let e=ye("router"),r=()=>{let n=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(n),o=s&&s[1]?decodeURIComponent(s[1]):xi(n),i=Si(n);if(e("hash change \u2192 view=%s id=%s",i,o),t.setState({selected_id:i==="worker"?null:o,view:i,worker:{selected_parent_id:i==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(n)){let a=o?`#/${i}?issue=${encodeURIComponent(o)}`:`#/${i}`;window.location.hash!==a&&(window.location.hash=a)}};return{start(){window.addEventListener("hashchange",r),r()},stop(){window.removeEventListener("hashchange",r)},gotoIssue(n){let o=(t.getState?t.getState():{view:"board"}).view==="worker"?"worker":"board",i=on(o,n);e("goto issue %s (view=%s)",n,o),window.location.hash!==i?window.location.hash=i:t.setState({selected_id:o==="worker"?null:n,view:o,worker:{selected_parent_id:o==="worker"?n:null}})},gotoView(n){let s=t.getState?t.getState():{selected_id:null,worker:{selected_parent_id:null}},o=n==="worker"?s.worker?.selected_parent_id:s.selected_id,i=o?on(n,o):`#/${n}`;e("goto view %s (id=%s)",n,o||""),window.location.hash!==i?window.location.hash=i:t.setState({view:n,selected_id:n==="worker"?null:s.selected_id})}}}var Ti=Object.freeze({workspace_config:{default_workspace:null}});function As(t){return{workspace_config:{default_workspace:typeof t?.workspace_config?.default_workspace=="string"&&t.workspace_config.default_workspace.length>0?t.workspace_config.default_workspace:Ti.workspace_config.default_workspace}}}function Es(t={}){let e=ye("state"),r={selected_id:t.selected_id??null,view:t.view??"board",filters:{status:t.filters?.status??"all",search:t.filters?.search??"",type:typeof t.filters?.type=="string"?t.filters?.type:""},board:{closed_filter:t.board?.closed_filter==="3"||t.board?.closed_filter==="7"||t.board?.closed_filter==="today"?t.board?.closed_filter:"today",show_deferred_column:t.board?.show_deferred_column===!0},worker:{selected_parent_id:t.worker?.selected_parent_id??null,show_closed_children:Array.isArray(t.worker?.show_closed_children)?t.worker.show_closed_children:[]},workspace:{current:t.workspace?.current??null,available:t.workspace?.available??[],hidden:t.workspace?.hidden??[]},config:As(t.config)},n=new Set;function s(){for(let o of Array.from(n))try{o(r)}catch{}}return{getState(){return r},setState(o){let i={...r,...o,filters:{...r.filters,...o.filters||{}},board:{...r.board,...o.board||{}},worker:{...r.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:r.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:r.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:r.workspace.hidden},config:o.config!==void 0?As(o.config):r.config},c=i.workspace.current?.path!==r.workspace.current?.path||i.workspace.available.length!==r.workspace.available.length||i.workspace.hidden.length!==r.workspace.hidden.length||i.workspace.hidden.some((u,h)=>u!==r.workspace.hidden[h]),a=i.config.workspace_config.default_workspace!==r.config.workspace_config.default_workspace;i.selected_id===r.selected_id&&i.view===r.view&&i.filters.status===r.filters.status&&i.filters.search===r.filters.search&&i.filters.type===r.filters.type&&i.board.closed_filter===r.board.closed_filter&&i.board.show_deferred_column===r.board.show_deferred_column&&i.worker.selected_parent_id===r.worker.selected_parent_id&&i.worker.show_closed_children.length===r.worker.show_closed_children.length&&i.worker.show_closed_children.every((u,h)=>u===r.worker.show_closed_children[h])&&!c&&!a||(r=i,e("state change %o",{selected_id:r.selected_id,view:r.view,filters:r.filters,board:r.board,worker:r.worker,workspace:r.workspace.current?.path,config:{default_workspace:r.config.workspace_config.default_workspace}}),s())},subscribe(o){return n.add(o),()=>n.delete(o)}}}function Cs(t){let e=ye("activity"),r=0,n=new Map,s=1;function o(){if(!t)return;let u=r>0;t.toggleAttribute("hidden",!u),t.setAttribute("aria-busy",u?"true":"false")}function i(){r+=1,e("start count=%d",r),o()}function c(){let u=r;r=Math.max(0,r-1),u<=0?e("done called but count was already %d",u):e("done count=%d\u2192%d",u,r),o()}function a(u){return async(g,w)=>{let $=s++,y=Date.now();n.set($,{type:g,start_ts:y}),e("request start id=%d type=%s count=%d",$,g,r+1),i();let C=!1,M=()=>{C||(C=!0,n.delete($),c())},P=setTimeout(()=>{C||(e("request TIMEOUT id=%d type=%s elapsed=%dms",$,g,Date.now()-y),M())},3e4);try{let B=await u(g,w),q=Date.now()-y;return e("request done id=%d type=%s elapsed=%dms",$,g,q),B}catch(B){let q=Date.now()-y;throw e("request error id=%d type=%s elapsed=%dms err=%o",$,g,q,B),B}finally{clearTimeout(P),M()}}}return o(),{wrapSend:a,start:i,done:c,getCount:()=>r,getActiveRequests:()=>{let u=Date.now();return Array.from(n.entries()).map(([h,g])=>({id:h,type:g.type,elapsed_ms:u-g.start_ts}))}}}function Z(t,e="info",r=2800){let n=document.createElement("div");n.className="toast",n.textContent=t,n.style.position="fixed",n.style.right="12px",n.style.bottom="12px",n.style.zIndex="1000",n.style.color="#fff",n.style.padding="8px 10px",n.style.borderRadius="4px",n.style.fontSize="12px",e==="success"?n.style.background="#156d36":e==="warning"?n.style.background="#a36a00":e==="error"?n.style.background="#9f2011":n.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(n),setTimeout(()=>{try{n.remove()}catch{}},r)}function xr(t=void 0,e=void 0){function r(){if(!e||typeof e.get!="function")return null;let o=e.get();return o&&o.order?o.order:{}}function n(o,i,c){let a=t&&t.snapshotFor?t.snapshotFor(o).slice():[];if(i==="closed")return a.sort(ks),a;switch(c){case"created_desc":return a.sort(Et),a;case"created_asc":return a.sort(_s),a;case"updated_desc":return a.sort(bs),a;case"priority":return a.sort(ws),a;case"manual":default:{let u=r();return u?a.sort(vr(u)):a.sort(Et),a}}}function s(o){let i=[];return t&&typeof t.subscribe=="function"&&i.push(t.subscribe(o)),e&&typeof e.subscribe=="function"&&i.push(e.subscribe(o)),()=>{for(let c of i)try{c()}catch{}}}return{selectBoardColumn:n,subscribe:s}}function Sr(t){let e=t.transport,r=t.uiOrderStore;function n(i,c){return"renormalize"in i?i.renormalize:[{bead_id:c,rank:i.rank}]}function s(i,c){let a={...i.order};for(let u of c)a[u.bead_id]=u.rank;r&&r.set({revision:i.revision,order:a})}async function o(i,c,a){if(!e||!r)return;let u=r.get()||{revision:0,order:{}},h=n(nn(c,a,u.order),i);s(u,h);let g=await e("ui-order-set",{expected_revision:u.revision,entries:h});if(g&&g.conflict){let w={revision:typeof g.revision=="number"?g.revision:0,order:g.order||{}};r.set(w);let $=n(nn(c,a,w.order),i);s(w,$);let y=await e("ui-order-set",{expected_revision:w.revision,entries:$});y&&y.applied&&r.set({revision:typeof y.revision=="number"?y.revision:0,order:y.order||{}})}else g&&g.applied&&r.set({revision:typeof g.revision=="number"?g.revision:0,order:g.order||{}})}return{applyReorder:o}}function Tr(t){return Array.isArray(t)?t.filter(e=>typeof e=="string"):[]}function an(t,e){return!e||typeof t!="string"||t.length===0||Tr(e.visible_labels).includes(t)?!0:Tr(e.hidden_labels).includes(t)?!1:!Tr(e.hidden_prefixes).some(r=>r.length>0&&t.startsWith(r))}function Rs(t,e){return Tr(t).filter(r=>an(r,e))}function Ct(t,e){let r=t&&t.chips?t.chips[e]:void 0;return typeof r=="boolean"?r:!0}function ln(t){if(!t)return null;if(typeof t=="number")return Number.isFinite(t)?t:null;let e=Date.parse(t);return Number.isFinite(e)?e:null}function bt(t){let e=ln(t);if(e===null)return"";let r=new Date(e),n=s=>String(s).padStart(2,"0");return`${r.getFullYear()}-${n(r.getMonth()+1)}-${n(r.getDate())} ${n(r.getHours())}:${n(r.getMinutes())}`}function cn(t,e){let r=ln(t);if(r===null)return"";let s=(typeof e=="number"?e:Date.now())-r;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let i=Math.floor(s/36e5);if(i<24)return`${i}\uC2DC\uAC04 \uC804`;let c=Math.floor(s/864e5);if(c<7)return`${c}\uC77C \uC804`;let a=Math.floor(c/7);if(c<30)return`${a}\uC8FC \uC804`;let u=Math.floor(c/30);return u<12?`${u}\uAC1C\uC6D4 \uC804`:`${Math.floor(c/365)}\uB144 \uC804`}var Ai={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg"},Ei={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge"},Ci={spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},Ri={reviewed:"\u2713",skip:"\u2298",stale:"\u2713"};function Li(t,e,r){if(!(r==="in_progress"||r==="resolved"))return null;for(let s of t)if(e[s]&&e[s].state==="dim")return s;return null}function Ii(t,e,r){let n=Ai[t]||t,s=e&&e.state||"empty",o=Ri[s]||"",i="bar";s==="dim"?i+=` b-${n} dim`:s==="on"||s==="reviewed"||s==="skip"?i+=` b-${n} on`:s==="stale"&&(i+=` b-${n} stale`),r&&(i+=" glow");let c=s==="empty"?"lbl":`lbl l-${n} on`,a=r?`color: var(--stage-${n}-on)`:"";return p`
    <div class="seg">
      <div class=${i} style=${a}>${o}</div>
      <div class=${c}>
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
            ${o.map((i,c)=>p`<button
                  type="button"
                  class="board-card__roll-child"
                  @click=${a=>e.onChildClick&&e.onChildClick(a,i.id)}
                >
                  <span class=${Ni(i.status)}>●</span>
                  <span class="board-card__roll-child-ord">${c+1}</span>
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
  `}var Hi=200,Wi={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","deferred-col":"deferred","closed-col":"closed"},Gi=new Set(["blocked-col","ready-col","in-progress-col","resolved-col","deferred-col"]),Os="beads-ui.board.sort",Ms=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function ji(){try{let t=window.localStorage.getItem(Os);if(t&&Ms.has(t))return t}catch{}return"created_desc"}function Ns(t,e){let r=ye("views:board"),n=e.gotoIssue,s=e.issueStores,o=e.transport,i=e.uiOrderStore,c=e.displayPolicyStore,a=e.onClosedRangeChange,u=e.onNewIssue,h=e.closedRange||wr,g=s?xr(s,i):null,w=Sr({transport:o,uiOrderStore:i}),$=[],y=[],C=[],M=[],P=[],B=[],q=!1,D=0,A=ji(),S=new Map,x=new Map,b=new Map,O=new Set,N={search:"",priority:"",type:"",labels:[]},z=!1,K=null;function ke(R){return String(R.status||"open")==="open"}function oe(R){let I=String(R.status||"open");return I==="open"||I==="blocked"}function ee(R){let I=N.search.trim().toLowerCase(),X=N.priority,V=N.type,d=N.labels;return R.filter(l=>{if(I){let _=String(l.id||"").toLowerCase(),v=String(l.title||"").toLowerCase();if(!_.includes(I)&&!v.includes(I))return!1}if(X!==""&&String(l.priority)!==X||V!==""&&String(l.issue_type||"")!==V)return!1;if(d.length>0){let _=Array.isArray(l.labels)?l.labels:[];if(!d.some(v=>_.includes(v)))return!1}return!0})}function Xe(){let R=new Set;for(let I of[$,y,C,M,P,B])for(let X of I){let V=Array.isArray(X.labels)?X.labels:[];for(let d of V)typeof d=="string"&&d.length>0&&R.add(d)}return Array.from(R).sort()}function qe(){return N.search.trim()!==""||N.priority!==""||N.type!==""||N.labels.length>0}function ve(){try{if(g){let R=g.selectBoardColumn("tab:board:in-progress","in_progress",A),I=g.selectBoardColumn("tab:board:blocked","blocked",A).filter(oe),X=new Set(R.map(F=>F.id)),V=g.selectBoardColumn("tab:board:ready","ready",A).filter(F=>ke(F)&&!X.has(F.id)),d=g.selectBoardColumn("tab:board:resolved","resolved",A),l=g.selectBoardColumn("tab:board:deferred","deferred",A),_=q?l:[],v=g.selectBoardColumn("tab:board:closed","closed").slice(0,Hi),T=[...I,...V,...R,...d,..._,...v];Ae(T);let G=new Set;for(let F of T)F&&F.id&&!dn(F)&&G.add(F.id);let Q=!qe();$=Q?Ut(I,G):I,y=Q?Ut(V,G):V,C=Q?Ut(R,G):R,M=Q?Ut(d,G):d,P=Q?Ut(_,G):_,D=l.length,B=Q?Ut(v,G):v,S=new Map;for(let F of $)S.set(F.id,"open");for(let F of y)S.set(F.id,"open");for(let F of C)S.set(F.id,"in_progress");for(let F of M)S.set(F.id,"resolved");for(let F of P)S.set(F.id,"deferred");for(let F of B)S.set(F.id,"closed");x=new Map;for(let F of $)x.set(F.id,"blocked-col");for(let F of y)x.set(F.id,"ready-col");for(let F of C)x.set(F.id,"in-progress-col");for(let F of M)x.set(F.id,"resolved-col");for(let F of P)x.set(F.id,"deferred-col");for(let F of B)x.set(F.id,"closed-col")}xe()}catch{$=[],y=[],C=[],M=[],P=[],B=[],b=new Map,xe()}}function Ae(R){let I=new Map;for(let V of R)V&&V.id&&!I.has(V.id)&&I.set(V.id,V);let X=new Map;for(let V of I.values()){let d=dn(V);if(!d)continue;let l=X.get(d);l||(l=[],X.set(d,l)),l.push({id:V.id,title:V.title,status:V.status,metadata:V.metadata,created_at:V.created_at})}b=X}function Qe(R){let I=b.get(R)||[],X=0,V=null;for(let d of I)(d.status==="resolved"||d.status==="closed")&&(X+=1),!V&&d.status==="in_progress"&&(V=d);return{total:I.length,count:X,current:V,children:I}}function fe(R){return!O.has(R)}function ot(R,I){R.preventDefault(),R.stopPropagation(),O.has(I)?O.delete(I):O.add(I),xe()}function he(R,I){R.preventDefault(),R.stopPropagation(),n(I)}function Je(R,I){R.preventDefault(),R.stopPropagation(),n(I)}function ae(R,I){K||n(I)}function Fe(R,I){R.preventDefault(),R.stopPropagation(),Yi(I).then(X=>{X&&Z("\uBCF5\uC0AC\uB428","success",1200)})}function rt(R,I){K=I,R.dataTransfer&&(R.dataTransfer.setData("text/plain",I),R.dataTransfer.effectAllowed="move"),R.target.classList.add("board-card--dragging")}function Ce(R){R.target.classList.remove("board-card--dragging"),it(),setTimeout(()=>{K=null},0)}function Le(R){let I=String(R.target.value||"");!I||I===h||(h=I,a&&a(I),xe())}let $e={onCardClick:ae,onCopyId:Fe,onDragStart:rt,onDragEnd:Ce,onClosedRangeChange:Le,rollupFor:Qe,isExpanded:fe,onRollupToggle:ot,onChildClick:he,onFromChipClick:Je,get policy(){return c?c.get():null}};function Ue(R){let I=R.target,X=t.querySelector(".board-filter__labels");I&&X&&X.contains(I)||ze()}function et(R){R.key==="Escape"&&ze()}function Ie(){z||(z=!0,document.addEventListener("mousedown",Ue),document.addEventListener("keydown",et),xe())}function ze(){z&&(z=!1,document.removeEventListener("mousedown",Ue),document.removeEventListener("keydown",et),xe())}let De={onSearchInput(R){N.search=String(R.target.value||""),ve()},onPriorityChange(R){N.priority=String(R.target.value||""),ve()},onTypeChange(R){N.type=String(R.target.value||""),ve()},onSortChange(R){let I=String(R.target.value||"");if(!(!Ms.has(I)||I===A)){A=I;try{window.localStorage.setItem(Os,I)}catch{}ve()}},onDeferredToggle(){q=!q,ve()},onLabelMenuToggle(){z?ze():Ie()},onLabelToggle(R){let I=N.labels.indexOf(R);I===-1?N.labels.push(R):N.labels.splice(I,1),ve()},onLabelClear(){N.labels.length!==0&&(N.labels=[],ve())},onNewIssue(){u&&u()}};function ce(){let R=q?"board-root board-root--deferred":"board-root";return p`
      <div class="board-view">
        ${Ds(N,De,{sort_mode:A,show_deferred:q,deferred_count:D,label_options:Xe(),label_menu_open:z})}
        <div class=${R}>
          ${Rt({title:"Blocked",id:"blocked-col",items:ee($)},$e)}
          ${Rt({title:"Ready",id:"ready-col",items:ee(y)},$e)}
          ${Rt({title:"In progress",id:"in-progress-col",items:ee(C)},$e)}
          ${Rt({title:"Resolved",id:"resolved-col",items:ee(M)},$e)}
          ${q?Rt({title:"Deferred",id:"deferred-col",items:ee(P)},$e):""}
          ${Rt({title:"Closed",id:"closed-col",items:ee(B),is_closed:!0,closed_range:h},$e)}
        </div>
      </div>
    `}function xe(){de(ce(),t),Oe()}function Oe(){try{let R=Array.from(t.querySelectorAll(".board-column"));for(let I of R)Array.from(I.querySelectorAll(".board-card")).forEach((V,d)=>{V.tabIndex=d===0?0:-1})}catch{}}async function He(R,I){if(!o){Z("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:R,status:I}),Z("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(X){r("update-status failed: %o",X),Z("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function Me(R){switch(R){case"blocked-col":return $;case"ready-col":return y;case"in-progress-col":return C;case"resolved-col":return M;case"deferred-col":return P;default:return[]}}function tt(R,I,X){if(!o||!i)return;let V=Me(R),d=V.find(G=>G.id===I);if(!d)return;let l=V.filter(G=>G.id!==I),_=X.closest?X.closest(".board-card"):null,v=l.length;if(_){let G=_.getAttribute("data-issue-id");if(G===I)return;let Q=l.findIndex(F=>F.id===G);Q>=0&&(v=Q)}let T=l.slice();T.splice(v,0,d),w.applyReorder(I,T,v)}function it(){for(let R of Array.from(t.querySelectorAll(".board-column--drag-over")))R.classList.remove("board-column--drag-over")}let me=null;t.addEventListener("dragover",R=>{R.preventDefault(),R.dataTransfer&&(R.dataTransfer.dropEffect="move");let X=R.target.closest(".board-column");X&&X!==me&&(me&&me.classList.remove("board-column--drag-over"),X.classList.add("board-column--drag-over"),me=X)}),t.addEventListener("dragleave",R=>{let I=R.relatedTarget;(!I||!t.contains(I))&&me&&(me.classList.remove("board-column--drag-over"),me=null)}),t.addEventListener("drop",R=>{R.preventDefault(),me&&(me.classList.remove("board-column--drag-over"),me=null);let I=R.target,X=I.closest(".board-column");if(!X)return;let V=R.dataTransfer?.getData("text/plain")||"";if(!V)return;let d=X.id,l=x.get(V);if(l&&l===d){if(Gi.has(d)){if(A!=="manual"){Z("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}tt(d,V,I)}return}let _=Wi[d];if(!_){Z("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}S.get(V)!==_&&He(V,_)}),t.addEventListener("keydown",R=>{let I=R.target;if(!(I instanceof HTMLElement))return;let X=String(I.tagName||"").toLowerCase();if(X==="input"||X==="textarea"||X==="select"||X==="button"||X==="a"||I.isContentEditable===!0)return;let V=I.closest(".board-card");if(!V)return;let d=String(R.key||"");if(d==="Enter"||d===" "){R.preventDefault();let T=V.getAttribute("data-issue-id");T&&n(T);return}if(d!=="ArrowUp"&&d!=="ArrowDown"&&d!=="ArrowLeft"&&d!=="ArrowRight")return;R.preventDefault();let l=V.closest(".board-column");if(!l)return;let _=Array.from(l.querySelectorAll(".board-card")),v=_.indexOf(V);if(d==="ArrowDown"&&v<_.length-1){Ne(V,_[v+1]);return}if(d==="ArrowUp"&&v>0){Ne(V,_[v-1]);return}if(d==="ArrowLeft"||d==="ArrowRight"){let T=Array.from(t.querySelectorAll(".board-column")),G=T.indexOf(l),Q=d==="ArrowRight"?1:-1,F=G+Q;for(;F>=0&&F<T.length;){let ue=T[F].querySelector(".board-card");if(ue){Ne(V,ue);return}F+=Q}}});function Ne(R,I){try{R.tabIndex=-1,I.tabIndex=0,I.focus()}catch{}}let Pe=null;g&&g.subscribe&&(Pe=g.subscribe(()=>{try{ve()}catch{}}));let Re=null;return c&&c.subscribe&&(Re=c.subscribe(()=>{try{ve()}catch{}})),{async load(){r("load"),ve()},clear(){ze(),Pe&&(Pe(),Pe=null),Re&&(Re(),Re=null),t.replaceChildren(),$=[],y=[],C=[],M=[],P=[],B=[],S=new Map,x=new Map}}}function dn(t){let e=t&&t.parent;return typeof e=="string"?e:e&&e.id?String(e.id):""}function Ut(t,e){return t.filter(r=>{let n=dn(r);return!(n&&e.has(n))})}async function Yi(t){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(t)),!0;let e=document.createElement("textarea");e.value=String(t),e.style.position="fixed",e.style.left="-9999px",document.body.appendChild(e),e.select();let r=!1;try{r=document.execCommand("copy")}finally{e.remove()}return r}catch{return!1}}async function Lt(t){let e=String(t);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(e),!0}catch{}try{let r=document.createElement("textarea");r.value=e,r.style.position="fixed",r.style.left="-9999px",document.body.appendChild(r),r.select();let n=!1;try{n=document.execCommand("copy")}finally{r.remove()}return n}catch{return!1}}var Vi={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},Ki=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,Zi=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function wt(t){return!!t&&typeof t=="object"}function un(t){return typeof t!="string"||t.length===0?[]:t.split(/\r?\n/)}function Ps(t,e){let r=un(t),n=un(e),s=new Map;for(let c of r)s.set(c,(s.get(c)||0)+1);let o=0;for(let c of n){let a=s.get(c)||0;a>0?s.set(c,a-1):o+=1}let i=0;for(let c of s.values())i+=c;return{added:o,removed:i}}function Xi(t){let e="";typeof t=="string"?e=t:Array.isArray(t)?e=t.map(s=>wt(s)&&typeof s.text=="string"?s.text:"").join(""):wt(t)&&typeof t.text=="string"&&(e=t.text);let n=(String(e).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return n.length>120?`${n.slice(0,117)}\u2026`:n}function Qi(t){let e=String(t.name||""),r=t.input||{},n={kind:"tool",tool:e,icon:Vi[e]||"\u{1F527}",input:r,expandable:!0};if((e==="Read"||e==="Write")&&(n.path=String(r.file_path||r.path||"")),e==="Write"&&(n.added=un(r.content).length),e==="Edit"){n.path=String(r.file_path||r.path||"");let{added:s,removed:o}=Ps(r.old_string,r.new_string);n.added=s,n.removed=o}if(e==="MultiEdit"){n.path=String(r.file_path||r.path||"");let s=0,o=0,i=Array.isArray(r.edits)?r.edits:[];for(let c of i){let a=Ps(wt(c)?c.old_string:"",wt(c)?c.new_string:"");s+=a.added,o+=a.removed}n.added=s,n.removed=o}return e==="Bash"&&(n.command=String(r.command||"")),(e==="Grep"||e==="Glob")&&(n.command=String(r.pattern||r.query||"")),n}function Fs(t){let e=t.split(/\r?\n/).find(n=>n.trim().length>0)||"",r=Ki.exec(e);return r?{kind:"gate",gate:r[2]==="implementation"?"impl":r[2],reviewer:r[3],verdict:r[4],time:r[5]?r[5].trim():void 0,text:e.trim()}:Zi.test(e)&&e.trim().length<=80?{kind:"phase",text:e.trim()}:{kind:"assistant",text:t}}function Ji(t,e){if(t.type==="assistant"){let r=t.message,n=r&&Array.isArray(r.content)?r.content:[],s=[];for(let o of n)if(wt(o)){if(o.type==="text"&&typeof o.text=="string")s.push(Fs(o.text));else if(o.type==="tool_use"){let i=Qi(o);typeof o.id=="string"&&e.set(o.id,i),s.push(i)}}return s}if(t.type==="user"){let r=t.message,n=r&&Array.isArray(r.content)?r.content:[];for(let s of n)if(wt(s)&&s.type==="tool_result"){let o=e.get(String(s.tool_use_id));if(o){let i=Xi(s.content);o.result=i,o.output=typeof s.content=="string"?s.content:i}}return[]}if(t.type==="result"){let r=t.is_error===!1&&t.subtype==="success";return[{kind:"result",success:r,text:typeof t.result=="string"?t.result:r?"DONE":""}]}return[]}function ea(t){if(t.type==="item.completed"&&wt(t.item)){let e=t.item;return e.type==="agent_message"&&typeof e.text=="string"?[Fs(e.text)]:e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}if(t.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(t.type==="turn.failed"){let e=t.error;return[{kind:"error",text:e&&typeof e.message=="string"?e.message:"turn failed"}]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:[]}function ta(t){let e=t.type;return typeof e=="string"&&(e==="error"||e.startsWith("thread.")||e.startsWith("turn.")||e.startsWith("item."))}function Bs(t){let e=[],r=new Map,n=Array.isArray(t)?t:[];for(let s of n){let o=s;if(typeof s=="string"){let c=s.trim();if(c.length===0)continue;try{o=JSON.parse(c)}catch{continue}}if(!wt(o))continue;let i=ta(o)?ea(o):Ji(o,r);for(let c of i)e.push(c)}return e}function Er(t,e={}){let{transport:r,sessionLogStore:n,onClose:s}=e,o=null,i={},c=!0,a=new Set,u=null;function h(){if(!o||!n)return[];let x=n.get(o);return Bs(x?x.lines:[])}function g(x,b){if(b.kind==="gate")return p`<div class="sv__gate">${b.text}</div>`;if(b.kind==="phase")return p`<div class="sv__phase">${b.text}</div>`;if(b.kind==="result")return p`<div
        class="sv__result${b.success?" sv__result--ok":" sv__result--fail"}"
      >
        ${b.success?"\u2713":"\u2717"}
        ${b.text||(b.success?"DONE":"\uC2E4\uD328")}
      </div>`;if(b.kind==="error")return p`<div class="sv__error">⛔ ${b.text}</div>`;if(b.kind==="blocker")return p`<div class="sv__error">⛔ ${b.text}</div>`;if(b.kind==="tool"){let O=a.has(x),N=b.tool==="Bash"?b.command:b.path||b.command||"";return p`<div
        class="sv__tool${O?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>M(x)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${b.icon}</span>
          <span class="sv__tool-name">${b.tool}</span>
          ${N?p`<span class="sv__tool-detail">${N}</span>`:""}
          ${typeof b.added=="number"?p`<span class="sv__diff-add">+${b.added}</span>`:""}
          ${typeof b.removed=="number"?p`<span class="sv__diff-del">−${b.removed}</span>`:""}
          ${b.result?p`<span class="sv__tool-ok">→ ${b.result}</span>`:""}
        </span>
        ${O?p`<pre class="sv__tool-expand">${w(b)}</pre>`:""}
      </div>`}return p`<div class="sv__as">${b.text}</div>`}function w(x){let b=[];if(x.input!==void 0)try{b.push(`input: ${JSON.stringify(x.input,null,2)}`)}catch{}return typeof x.output=="string"&&x.output.length>0&&b.push(`output:
${x.output}`),b.join(`

`)}function $(){if(!o)return p``;let x=h(),b=[i.runner,i.model,i.effort].filter(Boolean).join(" \xB7 "),O=i.session_id||"",N=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${c?"ON":"OFF"}`;return p`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id">${o}</span>
        ${O?p`<button
              type="button"
              class="sv__session"
              title=${O}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${O}`}
              @click=${()=>B(O)}
            >
              ⧉ ${O.slice(0,8)}
            </button>`:""}
        ${b?p`<span class="sv__meta">${b}</span>`:""}
        ${i.worktree?p`<span class="sv__wt" title=${i.worktree}
              >${i.worktree}</span
            >`:""}
        <button
          type="button"
          class="sv__follow${c?" sv__follow--on":""}"
          aria-pressed=${c?"true":"false"}
          aria-label=${N}
          @click=${P}
        >
          <span class="sv__follow-full">⇣ ${N}</span>
          <span class="sv__follow-short">⇣ ${c?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>S()}
        >
          ✕
        </button>
      </div>
      <div class="sv__body">
        ${x.length===0?p`<div class="sv__empty">세션 로그 없음</div>`:x.map((z,K)=>g(K,z))}
      </div>
    </div>`}function y(){de($(),t),c&&C()}function C(){let x=t.querySelector(".sv__body");x&&(x.scrollTop=x.scrollHeight)}function M(x){a.has(x)?a.delete(x):a.add(x),y()}function P(){c=!c,y()}function B(x){Lt(x).then(b=>{b?Z("\uBCF5\uC0AC\uB428","success",1200):Z("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function q(x){!o||!x||(i={...i,...x},y())}function D(x){let b=x.target;if(!b||!b.classList||!b.classList.contains("sv__body"))return;!(b.scrollHeight-b.scrollTop-b.clientHeight<=4)&&c&&(c=!1,y())}t.addEventListener("scroll",D,!0);function A(x){let b=x&&x.attempt_id;b&&(o=b,i=x.meta||{},c=!0,a.clear(),!u&&n&&(u=n.subscribe(y)),r&&Promise.resolve(r("subscribe-session-log",{id:`session-log:${o}`,attempt_id:o})).catch(()=>{}),y())}function S(){let x=o;o=null,a.clear(),r&&x&&Promise.resolve(r("unsubscribe-session-log",{id:`session-log:${x}`})).catch(()=>{}),de(p``,t),s&&s()}return{open:A,updateMeta:q,close:S,isOpen(){return o!==null},destroy(){u&&(u(),u=null),t.removeEventListener("scroll",D,!0),o=null,de(p``,t)}}}function ra(t){let e=t&&t.metadata||{},r=[];return typeof e.spec_id=="string"&&e.spec_id.trim().length>0&&r.push({kind:"spec",path:e.spec_id.trim()}),typeof e.plan_path=="string"&&e.plan_path.trim().length>0&&r.push({kind:"plan",path:e.plan_path.trim()}),r}function qs(t,e){let r=ra(t);return p`
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
  `}var{entries:Zs,setPrototypeOf:zs,isFrozen:sa,getPrototypeOf:oa,getOwnPropertyDescriptor:ia}=Object,{freeze:je,seal:st,create:$n}=Object,{apply:xn,construct:Sn}=typeof Reflect<"u"&&Reflect;je||(je=function(e){return e});st||(st=function(e){return e});xn||(xn=function(e,r){for(var n=arguments.length,s=new Array(n>2?n-2:0),o=2;o<n;o++)s[o-2]=arguments[o];return e.apply(r,s)});Sn||(Sn=function(e){for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return new e(...n)});var Rr=Ye(Array.prototype.forEach),aa=Ye(Array.prototype.lastIndexOf),Hs=Ye(Array.prototype.pop),nr=Ye(Array.prototype.push),la=Ye(Array.prototype.splice),Ir=Ye(String.prototype.toLowerCase),_n=Ye(String.prototype.toString),bn=Ye(String.prototype.match),sr=Ye(String.prototype.replace),ca=Ye(String.prototype.indexOf),da=Ye(String.prototype.trim),dt=Ye(Object.prototype.hasOwnProperty),Ge=Ye(RegExp.prototype.test),or=ua(TypeError);function Ye(t){return function(e){e instanceof RegExp&&(e.lastIndex=0);for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return xn(t,e,n)}}function ua(t){return function(){for(var e=arguments.length,r=new Array(e),n=0;n<e;n++)r[n]=arguments[n];return Sn(t,r)}}function re(t,e){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Ir;zs&&zs(t,null);let n=e.length;for(;n--;){let s=e[n];if(typeof s=="string"){let o=r(s);o!==s&&(sa(e)||(e[n]=o),s=o)}t[s]=!0}return t}function pa(t){for(let e=0;e<t.length;e++)dt(t,e)||(t[e]=null);return t}function ht(t){let e=$n(null);for(let[r,n]of Zs(t))dt(t,r)&&(Array.isArray(n)?e[r]=pa(n):n&&typeof n=="object"&&n.constructor===Object?e[r]=ht(n):e[r]=n);return e}function ir(t,e){for(;t!==null;){let n=ia(t,e);if(n){if(n.get)return Ye(n.get);if(typeof n.value=="function")return Ye(n.value)}t=oa(t)}function r(){return null}return r}var Ws=je(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),wn=je(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),kn=je(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),fa=je(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),yn=je(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),ha=je(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Gs=je(["#text"]),js=je(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),vn=je(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Ys=je(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Lr=je(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),ga=st(/\{\{[\w\W]*|[\w\W]*\}\}/gm),ma=st(/<%[\w\W]*|[\w\W]*%>/gm),_a=st(/\$\{[\w\W]*/gm),ba=st(/^data-[\-\w.\u00B7-\uFFFF]+$/),wa=st(/^aria-[\-\w]+$/),Xs=st(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),ka=st(/^(?:\w+script|data):/i),ya=st(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Qs=st(/^html$/i),va=st(/^[a-z][.\w]*(-[.\w]+)+$/i),Vs=Object.freeze({__proto__:null,ARIA_ATTR:wa,ATTR_WHITESPACE:ya,CUSTOM_ELEMENT:va,DATA_ATTR:ba,DOCTYPE_NAME:Qs,ERB_EXPR:ma,IS_ALLOWED_URI:Xs,IS_SCRIPT_OR_DATA:ka,MUSTACHE_EXPR:ga,TMPLIT_EXPR:_a}),ar={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},$a=function(){return typeof window>"u"?null:window},xa=function(e,r){if(typeof e!="object"||typeof e.createPolicy!="function")return null;let n=null,s="data-tt-policy-suffix";r&&r.hasAttribute(s)&&(n=r.getAttribute(s));let o="dompurify"+(n?"#"+n:"");try{return e.createPolicy(o,{createHTML(i){return i},createScriptURL(i){return i}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},Ks=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Js(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:$a(),e=W=>Js(W);if(e.version="3.3.0",e.removed=[],!t||!t.document||t.document.nodeType!==ar.document||!t.Element)return e.isSupported=!1,e;let{document:r}=t,n=r,s=n.currentScript,{DocumentFragment:o,HTMLTemplateElement:i,Node:c,Element:a,NodeFilter:u,NamedNodeMap:h=t.NamedNodeMap||t.MozNamedAttrMap,HTMLFormElement:g,DOMParser:w,trustedTypes:$}=t,y=a.prototype,C=ir(y,"cloneNode"),M=ir(y,"remove"),P=ir(y,"nextSibling"),B=ir(y,"childNodes"),q=ir(y,"parentNode");if(typeof i=="function"){let W=r.createElement("template");W.content&&W.content.ownerDocument&&(r=W.content.ownerDocument)}let D,A="",{implementation:S,createNodeIterator:x,createDocumentFragment:b,getElementsByTagName:O}=r,{importNode:N}=n,z=Ks();e.isSupported=typeof Zs=="function"&&typeof q=="function"&&S&&S.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:K,ERB_EXPR:ke,TMPLIT_EXPR:oe,DATA_ATTR:ee,ARIA_ATTR:Xe,IS_SCRIPT_OR_DATA:qe,ATTR_WHITESPACE:ve,CUSTOM_ELEMENT:Ae}=Vs,{IS_ALLOWED_URI:Qe}=Vs,fe=null,ot=re({},[...Ws,...wn,...kn,...yn,...Gs]),he=null,Je=re({},[...js,...vn,...Ys,...Lr]),ae=Object.seal($n(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Fe=null,rt=null,Ce=Object.seal($n(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),Le=!0,$e=!0,Ue=!1,et=!0,Ie=!1,ze=!0,De=!1,ce=!1,xe=!1,Oe=!1,He=!1,Me=!1,tt=!0,it=!1,me="user-content-",Ne=!0,Pe=!1,Re={},R=null,I=re({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),X=null,V=re({},["audio","video","img","source","image","track"]),d=null,l=re({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),_="http://www.w3.org/1998/Math/MathML",v="http://www.w3.org/2000/svg",T="http://www.w3.org/1999/xhtml",G=T,Q=!1,F=null,ue=re({},[_,v,T],_n),at=re({},["mi","mo","mn","ms","mtext"]),nt=re({},["annotation-xml"]),ft=re({},["title","style","font","a","script"]),Ke=null,te=["application/xhtml+xml","text/html"],_e="text/html",m=null,k=null,Y=r.createElement("form"),j=function(f){return f instanceof RegExp||f instanceof Function},J=function(){let f=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(k&&k===f)){if((!f||typeof f!="object")&&(f={}),f=ht(f),Ke=te.indexOf(f.PARSER_MEDIA_TYPE)===-1?_e:f.PARSER_MEDIA_TYPE,m=Ke==="application/xhtml+xml"?_n:Ir,fe=dt(f,"ALLOWED_TAGS")?re({},f.ALLOWED_TAGS,m):ot,he=dt(f,"ALLOWED_ATTR")?re({},f.ALLOWED_ATTR,m):Je,F=dt(f,"ALLOWED_NAMESPACES")?re({},f.ALLOWED_NAMESPACES,_n):ue,d=dt(f,"ADD_URI_SAFE_ATTR")?re(ht(l),f.ADD_URI_SAFE_ATTR,m):l,X=dt(f,"ADD_DATA_URI_TAGS")?re(ht(V),f.ADD_DATA_URI_TAGS,m):V,R=dt(f,"FORBID_CONTENTS")?re({},f.FORBID_CONTENTS,m):I,Fe=dt(f,"FORBID_TAGS")?re({},f.FORBID_TAGS,m):ht({}),rt=dt(f,"FORBID_ATTR")?re({},f.FORBID_ATTR,m):ht({}),Re=dt(f,"USE_PROFILES")?f.USE_PROFILES:!1,Le=f.ALLOW_ARIA_ATTR!==!1,$e=f.ALLOW_DATA_ATTR!==!1,Ue=f.ALLOW_UNKNOWN_PROTOCOLS||!1,et=f.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Ie=f.SAFE_FOR_TEMPLATES||!1,ze=f.SAFE_FOR_XML!==!1,De=f.WHOLE_DOCUMENT||!1,Oe=f.RETURN_DOM||!1,He=f.RETURN_DOM_FRAGMENT||!1,Me=f.RETURN_TRUSTED_TYPE||!1,xe=f.FORCE_BODY||!1,tt=f.SANITIZE_DOM!==!1,it=f.SANITIZE_NAMED_PROPS||!1,Ne=f.KEEP_CONTENT!==!1,Pe=f.IN_PLACE||!1,Qe=f.ALLOWED_URI_REGEXP||Xs,G=f.NAMESPACE||T,at=f.MATHML_TEXT_INTEGRATION_POINTS||at,nt=f.HTML_INTEGRATION_POINTS||nt,ae=f.CUSTOM_ELEMENT_HANDLING||{},f.CUSTOM_ELEMENT_HANDLING&&j(f.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(ae.tagNameCheck=f.CUSTOM_ELEMENT_HANDLING.tagNameCheck),f.CUSTOM_ELEMENT_HANDLING&&j(f.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(ae.attributeNameCheck=f.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),f.CUSTOM_ELEMENT_HANDLING&&typeof f.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(ae.allowCustomizedBuiltInElements=f.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Ie&&($e=!1),He&&(Oe=!0),Re&&(fe=re({},Gs),he=[],Re.html===!0&&(re(fe,Ws),re(he,js)),Re.svg===!0&&(re(fe,wn),re(he,vn),re(he,Lr)),Re.svgFilters===!0&&(re(fe,kn),re(he,vn),re(he,Lr)),Re.mathMl===!0&&(re(fe,yn),re(he,Ys),re(he,Lr))),f.ADD_TAGS&&(typeof f.ADD_TAGS=="function"?Ce.tagCheck=f.ADD_TAGS:(fe===ot&&(fe=ht(fe)),re(fe,f.ADD_TAGS,m))),f.ADD_ATTR&&(typeof f.ADD_ATTR=="function"?Ce.attributeCheck=f.ADD_ATTR:(he===Je&&(he=ht(he)),re(he,f.ADD_ATTR,m))),f.ADD_URI_SAFE_ATTR&&re(d,f.ADD_URI_SAFE_ATTR,m),f.FORBID_CONTENTS&&(R===I&&(R=ht(R)),re(R,f.FORBID_CONTENTS,m)),Ne&&(fe["#text"]=!0),De&&re(fe,["html","head","body"]),fe.table&&(re(fe,["tbody"]),delete Fe.tbody),f.TRUSTED_TYPES_POLICY){if(typeof f.TRUSTED_TYPES_POLICY.createHTML!="function")throw or('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof f.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw or('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');D=f.TRUSTED_TYPES_POLICY,A=D.createHTML("")}else D===void 0&&(D=xa($,s)),D!==null&&typeof A=="string"&&(A=D.createHTML(""));je&&je(f),k=f}},be=re({},[...wn,...kn,...fa]),Ot=re({},[...yn,...ha]),gr=function(f){let L=q(f);(!L||!L.tagName)&&(L={namespaceURI:G,tagName:"template"});let U=Ir(f.tagName),ge=Ir(L.tagName);return F[f.namespaceURI]?f.namespaceURI===v?L.namespaceURI===T?U==="svg":L.namespaceURI===_?U==="svg"&&(ge==="annotation-xml"||at[ge]):!!be[U]:f.namespaceURI===_?L.namespaceURI===T?U==="math":L.namespaceURI===v?U==="math"&&nt[ge]:!!Ot[U]:f.namespaceURI===T?L.namespaceURI===v&&!nt[ge]||L.namespaceURI===_&&!at[ge]?!1:!Ot[U]&&(ft[U]||!be[U]):!!(Ke==="application/xhtml+xml"&&F[f.namespaceURI]):!1},We=function(f){nr(e.removed,{element:f});try{q(f).removeChild(f)}catch{M(f)}},lt=function(f,L){try{nr(e.removed,{attribute:L.getAttributeNode(f),from:L})}catch{nr(e.removed,{attribute:null,from:L})}if(L.removeAttribute(f),f==="is")if(Oe||He)try{We(L)}catch{}else try{L.setAttribute(f,"")}catch{}},Wt=function(f){let L=null,U=null;if(xe)f="<remove></remove>"+f;else{let we=bn(f,/^[\r\n\t ]+/);U=we&&we[0]}Ke==="application/xhtml+xml"&&G===T&&(f='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+f+"</body></html>");let ge=D?D.createHTML(f):f;if(G===T)try{L=new w().parseFromString(ge,Ke)}catch{}if(!L||!L.documentElement){L=S.createDocument(G,"template",null);try{L.documentElement.innerHTML=Q?A:ge}catch{}}let Ee=L.body||L.documentElement;return f&&U&&Ee.insertBefore(r.createTextNode(U),Ee.childNodes[0]||null),G===T?O.call(L,De?"html":"body")[0]:De?L.documentElement:Ee},Gt=function(f){return x.call(f.ownerDocument||f,f,u.SHOW_ELEMENT|u.SHOW_COMMENT|u.SHOW_TEXT|u.SHOW_PROCESSING_INSTRUCTION|u.SHOW_CDATA_SECTION,null)},jt=function(f){return f instanceof g&&(typeof f.nodeName!="string"||typeof f.textContent!="string"||typeof f.removeChild!="function"||!(f.attributes instanceof h)||typeof f.removeAttribute!="function"||typeof f.setAttribute!="function"||typeof f.namespaceURI!="string"||typeof f.insertBefore!="function"||typeof f.hasChildNodes!="function")},mt=function(f){return typeof c=="function"&&f instanceof c};function Te(W,f,L){Rr(W,U=>{U.call(e,f,L,k)})}let Yt=function(f){let L=null;if(Te(z.beforeSanitizeElements,f,null),jt(f))return We(f),!0;let U=m(f.nodeName);if(Te(z.uponSanitizeElement,f,{tagName:U,allowedTags:fe}),ze&&f.hasChildNodes()&&!mt(f.firstElementChild)&&Ge(/<[/\w!]/g,f.innerHTML)&&Ge(/<[/\w!]/g,f.textContent)||f.nodeType===ar.progressingInstruction||ze&&f.nodeType===ar.comment&&Ge(/<[/\w]/g,f.data))return We(f),!0;if(!(Ce.tagCheck instanceof Function&&Ce.tagCheck(U))&&(!fe[U]||Fe[U])){if(!Fe[U]&&vt(U)&&(ae.tagNameCheck instanceof RegExp&&Ge(ae.tagNameCheck,U)||ae.tagNameCheck instanceof Function&&ae.tagNameCheck(U)))return!1;if(Ne&&!R[U]){let ge=q(f)||f.parentNode,Ee=B(f)||f.childNodes;if(Ee&&ge){let we=Ee.length;for(let Be=we-1;Be>=0;--Be){let E=C(Ee[Be],!0);E.__removalCount=(f.__removalCount||0)+1,ge.insertBefore(E,P(f))}}}return We(f),!0}return f instanceof a&&!gr(f)||(U==="noscript"||U==="noembed"||U==="noframes")&&Ge(/<\/no(script|embed|frames)/i,f.innerHTML)?(We(f),!0):(Ie&&f.nodeType===ar.text&&(L=f.textContent,Rr([K,ke,oe],ge=>{L=sr(L,ge," ")}),f.textContent!==L&&(nr(e.removed,{element:f.cloneNode()}),f.textContent=L)),Te(z.afterSanitizeElements,f,null),!1)},mr=function(f,L,U){if(tt&&(L==="id"||L==="name")&&(U in r||U in Y))return!1;if(!($e&&!rt[L]&&Ge(ee,L))){if(!(Le&&Ge(Xe,L))){if(!(Ce.attributeCheck instanceof Function&&Ce.attributeCheck(L,f))){if(!he[L]||rt[L]){if(!(vt(f)&&(ae.tagNameCheck instanceof RegExp&&Ge(ae.tagNameCheck,f)||ae.tagNameCheck instanceof Function&&ae.tagNameCheck(f))&&(ae.attributeNameCheck instanceof RegExp&&Ge(ae.attributeNameCheck,L)||ae.attributeNameCheck instanceof Function&&ae.attributeNameCheck(L,f))||L==="is"&&ae.allowCustomizedBuiltInElements&&(ae.tagNameCheck instanceof RegExp&&Ge(ae.tagNameCheck,U)||ae.tagNameCheck instanceof Function&&ae.tagNameCheck(U))))return!1}else if(!d[L]){if(!Ge(Qe,sr(U,ve,""))){if(!((L==="src"||L==="xlink:href"||L==="href")&&f!=="script"&&ca(U,"data:")===0&&X[f])){if(!(Ue&&!Ge(qe,sr(U,ve,"")))){if(U)return!1}}}}}}}return!0},vt=function(f){return f!=="annotation-xml"&&bn(f,Ae)},Wr=function(f){Te(z.beforeSanitizeAttributes,f,null);let{attributes:L}=f;if(!L||jt(f))return;let U={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:he,forceKeepAttr:void 0},ge=L.length;for(;ge--;){let Ee=L[ge],{name:we,namespaceURI:Be,value:E}=Ee,H=m(we),ne=E,se=we==="value"?ne:da(ne);if(U.attrName=H,U.attrValue=se,U.keepAttr=!0,U.forceKeepAttr=void 0,Te(z.uponSanitizeAttribute,f,U),se=U.attrValue,it&&(H==="id"||H==="name")&&(lt(we,f),se=me+se),ze&&Ge(/((--!?|])>)|<\/(style|title|textarea)/i,se)){lt(we,f);continue}if(H==="attributename"&&bn(se,"href")){lt(we,f);continue}if(U.forceKeepAttr)continue;if(!U.keepAttr){lt(we,f);continue}if(!et&&Ge(/\/>/i,se)){lt(we,f);continue}Ie&&Rr([K,ke,oe],Vn=>{se=sr(se,Vn," ")});let Vt=m(f.nodeName);if(!mr(Vt,H,se)){lt(we,f);continue}if(D&&typeof $=="object"&&typeof $.getAttributeType=="function"&&!Be)switch($.getAttributeType(Vt,H)){case"TrustedHTML":{se=D.createHTML(se);break}case"TrustedScriptURL":{se=D.createScriptURL(se);break}}if(se!==ne)try{Be?f.setAttributeNS(Be,we,se):f.setAttribute(we,se),jt(f)?We(f):Hs(e.removed)}catch{lt(we,f)}}Te(z.afterSanitizeAttributes,f,null)},_r=function W(f){let L=null,U=Gt(f);for(Te(z.beforeSanitizeShadowDOM,f,null);L=U.nextNode();)Te(z.uponSanitizeShadowNode,L,null),Yt(L),Wr(L),L.content instanceof o&&W(L.content);Te(z.afterSanitizeShadowDOM,f,null)};return e.sanitize=function(W){let f=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},L=null,U=null,ge=null,Ee=null;if(Q=!W,Q&&(W="<!-->"),typeof W!="string"&&!mt(W))if(typeof W.toString=="function"){if(W=W.toString(),typeof W!="string")throw or("dirty is not a string, aborting")}else throw or("toString is not a function");if(!e.isSupported)return W;if(ce||J(f),e.removed=[],typeof W=="string"&&(Pe=!1),Pe){if(W.nodeName){let E=m(W.nodeName);if(!fe[E]||Fe[E])throw or("root node is forbidden and cannot be sanitized in-place")}}else if(W instanceof c)L=Wt("<!---->"),U=L.ownerDocument.importNode(W,!0),U.nodeType===ar.element&&U.nodeName==="BODY"||U.nodeName==="HTML"?L=U:L.appendChild(U);else{if(!Oe&&!Ie&&!De&&W.indexOf("<")===-1)return D&&Me?D.createHTML(W):W;if(L=Wt(W),!L)return Oe?null:Me?A:""}L&&xe&&We(L.firstChild);let we=Gt(Pe?W:L);for(;ge=we.nextNode();)Yt(ge),Wr(ge),ge.content instanceof o&&_r(ge.content);if(Pe)return W;if(Oe){if(He)for(Ee=b.call(L.ownerDocument);L.firstChild;)Ee.appendChild(L.firstChild);else Ee=L;return(he.shadowroot||he.shadowrootmode)&&(Ee=N.call(n,Ee,!0)),Ee}let Be=De?L.outerHTML:L.innerHTML;return De&&fe["!doctype"]&&L.ownerDocument&&L.ownerDocument.doctype&&L.ownerDocument.doctype.name&&Ge(Qs,L.ownerDocument.doctype.name)&&(Be="<!DOCTYPE "+L.ownerDocument.doctype.name+`>
`+Be),Ie&&Rr([K,ke,oe],E=>{Be=sr(Be,E," ")}),D&&Me?D.createHTML(Be):Be},e.setConfig=function(){let W=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};J(W),ce=!0},e.clearConfig=function(){k=null,ce=!1},e.isValidAttribute=function(W,f,L){k||J({});let U=m(W),ge=m(f);return mr(U,ge,L)},e.addHook=function(W,f){typeof f=="function"&&nr(z[W],f)},e.removeHook=function(W,f){if(f!==void 0){let L=aa(z[W],f);return L===-1?void 0:la(z[W],L,1)[0]}return Hs(z[W])},e.removeHooks=function(W){z[W]=[]},e.removeAllHooks=function(){z=Ks()},e}var eo=Js();var to={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},ro=t=>(...e)=>({_$litDirective$:t,values:e}),Dr=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,r,n){this._$Ct=e,this._$AM=r,this._$Ci=n}_$AS(e,r){return this.update(e,r)}update(e,r){return this.render(...r)}};var lr=class extends Dr{constructor(e){if(super(e),this.it=Se,e.type!==to.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===Se||e==null)return this._t=void 0,this.it=e;if(e===Tt)return e;if(typeof e!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;let r=[e];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}};lr.directiveName="unsafeHTML",lr.resultType=1;var no=ro(lr);function Cn(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Dt=Cn();function uo(t){Dt=t}var pr={exec:()=>null};function ie(t,e=""){let r=typeof t=="string"?t:t.source,n={replace:(s,o)=>{let i=typeof o=="string"?o:o.source;return i=i.replace(Ve.caret,"$1"),r=r.replace(s,i),n},getRegex:()=>new RegExp(r,e)};return n}var Sa=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),Ve={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:t=>new RegExp(`^( {0,3}${t})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}#`),htmlBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}<(?:[a-z].*>|!--)`,"i")},Ta=/^(?:[ \t]*(?:\n|$))+/,Aa=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Ea=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,fr=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Ca=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Rn=/(?:[*+-]|\d{1,9}[.)])/,po=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,fo=ie(po).replace(/bull/g,Rn).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Ra=ie(po).replace(/bull/g,Rn).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Ln=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,La=/^[^\n]+/,In=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,Ia=ie(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",In).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Da=ie(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Rn).getRegex(),Br="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Dn=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Oa=ie("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",Dn).replace("tag",Br).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),ho=ie(Ln).replace("hr",fr).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Br).getRegex(),Ma=ie(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",ho).getRegex(),On={blockquote:Ma,code:Aa,def:Ia,fences:Ea,heading:Ca,hr:fr,html:Oa,lheading:fo,list:Da,newline:Ta,paragraph:ho,table:pr,text:La},so=ie("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",fr).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Br).getRegex(),Na={...On,lheading:Ra,table:so,paragraph:ie(Ln).replace("hr",fr).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",so).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Br).getRegex()},Pa={...On,html:ie(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",Dn).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:pr,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:ie(Ln).replace("hr",fr).replace("heading",` *#{1,6} *[^
]`).replace("lheading",fo).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Fa=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Ba=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,go=/^( {2,}|\\)\n(?!\s*$)/,qa=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,qr=/[\p{P}\p{S}]/u,Mn=/[\s\p{P}\p{S}]/u,mo=/[^\s\p{P}\p{S}]/u,Ua=ie(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Mn).getRegex(),_o=/(?!~)[\p{P}\p{S}]/u,za=/(?!~)[\s\p{P}\p{S}]/u,Ha=/(?:[^\s\p{P}\p{S}]|~)/u,Wa=ie(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",Sa?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),bo=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,Ga=ie(bo,"u").replace(/punct/g,qr).getRegex(),ja=ie(bo,"u").replace(/punct/g,_o).getRegex(),wo="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Ya=ie(wo,"gu").replace(/notPunctSpace/g,mo).replace(/punctSpace/g,Mn).replace(/punct/g,qr).getRegex(),Va=ie(wo,"gu").replace(/notPunctSpace/g,Ha).replace(/punctSpace/g,za).replace(/punct/g,_o).getRegex(),Ka=ie("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,mo).replace(/punctSpace/g,Mn).replace(/punct/g,qr).getRegex(),Za=ie(/\\(punct)/,"gu").replace(/punct/g,qr).getRegex(),Xa=ie(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Qa=ie(Dn).replace("(?:-->|$)","-->").getRegex(),Ja=ie("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Qa).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Nr=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,el=ie(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Nr).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),ko=ie(/^!?\[(label)\]\[(ref)\]/).replace("label",Nr).replace("ref",In).getRegex(),yo=ie(/^!?\[(ref)\](?:\[\])?/).replace("ref",In).getRegex(),tl=ie("reflink|nolink(?!\\()","g").replace("reflink",ko).replace("nolink",yo).getRegex(),oo=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,Nn={_backpedal:pr,anyPunctuation:Za,autolink:Xa,blockSkip:Wa,br:go,code:Ba,del:pr,emStrongLDelim:Ga,emStrongRDelimAst:Ya,emStrongRDelimUnd:Ka,escape:Fa,link:el,nolink:yo,punctuation:Ua,reflink:ko,reflinkSearch:tl,tag:Ja,text:qa,url:pr},rl={...Nn,link:ie(/^!?\[(label)\]\((.*?)\)/).replace("label",Nr).getRegex(),reflink:ie(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Nr).getRegex()},Tn={...Nn,emStrongRDelimAst:Va,emStrongLDelim:ja,url:ie(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",oo).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:ie(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",oo).getRegex()},nl={...Tn,br:ie(go).replace("{2,}","*").getRegex(),text:ie(Tn.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Or={normal:On,gfm:Na,pedantic:Pa},cr={normal:Nn,gfm:Tn,breaks:nl,pedantic:rl},sl={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},io=t=>sl[t];function gt(t,e){if(e){if(Ve.escapeTest.test(t))return t.replace(Ve.escapeReplace,io)}else if(Ve.escapeTestNoEncode.test(t))return t.replace(Ve.escapeReplaceNoEncode,io);return t}function ao(t){try{t=encodeURI(t).replace(Ve.percentDecode,"%")}catch{return null}return t}function lo(t,e){let r=t.replace(Ve.findPipe,(o,i,c)=>{let a=!1,u=i;for(;--u>=0&&c[u]==="\\";)a=!a;return a?"|":" |"}),n=r.split(Ve.splitPipe),s=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),e)if(n.length>e)n.splice(e);else for(;n.length<e;)n.push("");for(;s<n.length;s++)n[s]=n[s].trim().replace(Ve.slashPipe,"|");return n}function dr(t,e,r){let n=t.length;if(n===0)return"";let s=0;for(;s<n;){let o=t.charAt(n-s-1);if(o===e&&!r)s++;else if(o!==e&&r)s++;else break}return t.slice(0,n-s)}function ol(t,e){if(t.indexOf(e[1])===-1)return-1;let r=0;for(let n=0;n<t.length;n++)if(t[n]==="\\")n++;else if(t[n]===e[0])r++;else if(t[n]===e[1]&&(r--,r<0))return n;return r>0?-2:-1}function co(t,e,r,n,s){let o=e.href,i=e.title||null,c=t[1].replace(s.other.outputLinkReplace,"$1");n.state.inLink=!0;let a={type:t[0].charAt(0)==="!"?"image":"link",raw:r,href:o,title:i,text:c,tokens:n.inlineTokens(c)};return n.state.inLink=!1,a}function il(t,e,r){let n=t.match(r.other.indentCodeCompensation);if(n===null)return e;let s=n[1];return e.split(`
`).map(o=>{let i=o.match(r.other.beginningSpace);if(i===null)return o;let[c]=i;return c.length>=s.length?o.slice(s.length):o}).join(`
`)}var Pr=class{constructor(t){pe(this,"options");pe(this,"rules");pe(this,"lexer");this.options=t||Dt}space(t){let e=this.rules.block.newline.exec(t);if(e&&e[0].length>0)return{type:"space",raw:e[0]}}code(t){let e=this.rules.block.code.exec(t);if(e){let r=e[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:e[0],codeBlockStyle:"indented",text:this.options.pedantic?r:dr(r,`
`)}}}fences(t){let e=this.rules.block.fences.exec(t);if(e){let r=e[0],n=il(r,e[3]||"",this.rules);return{type:"code",raw:r,lang:e[2]?e[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):e[2],text:n}}}heading(t){let e=this.rules.block.heading.exec(t);if(e){let r=e[2].trim();if(this.rules.other.endingHash.test(r)){let n=dr(r,"#");(this.options.pedantic||!n||this.rules.other.endingSpaceChar.test(n))&&(r=n.trim())}return{type:"heading",raw:e[0],depth:e[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(t){let e=this.rules.block.hr.exec(t);if(e)return{type:"hr",raw:dr(e[0],`
`)}}blockquote(t){let e=this.rules.block.blockquote.exec(t);if(e){let r=dr(e[0],`
`).split(`
`),n="",s="",o=[];for(;r.length>0;){let i=!1,c=[],a;for(a=0;a<r.length;a++)if(this.rules.other.blockquoteStart.test(r[a]))c.push(r[a]),i=!0;else if(!i)c.push(r[a]);else break;r=r.slice(a);let u=c.join(`
`),h=u.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");n=n?`${n}
${u}`:u,s=s?`${s}
${h}`:h;let g=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(h,o,!0),this.lexer.state.top=g,r.length===0)break;let w=o.at(-1);if(w?.type==="code")break;if(w?.type==="blockquote"){let $=w,y=$.raw+`
`+r.join(`
`),C=this.blockquote(y);o[o.length-1]=C,n=n.substring(0,n.length-$.raw.length)+C.raw,s=s.substring(0,s.length-$.text.length)+C.text;break}else if(w?.type==="list"){let $=w,y=$.raw+`
`+r.join(`
`),C=this.list(y);o[o.length-1]=C,n=n.substring(0,n.length-w.raw.length)+C.raw,s=s.substring(0,s.length-$.raw.length)+C.raw,r=y.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:n,tokens:o,text:s}}}list(t){let e=this.rules.block.list.exec(t);if(e){let r=e[1].trim(),n=r.length>1,s={type:"list",raw:"",ordered:n,start:n?+r.slice(0,-1):"",loose:!1,items:[]};r=n?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=n?r:"[*+-]");let o=this.rules.other.listItemRegex(r),i=!1;for(;t;){let a=!1,u="",h="";if(!(e=o.exec(t))||this.rules.block.hr.test(t))break;u=e[0],t=t.substring(u.length);let g=e[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,C=>" ".repeat(3*C.length)),w=t.split(`
`,1)[0],$=!g.trim(),y=0;if(this.options.pedantic?(y=2,h=g.trimStart()):$?y=e[1].length+1:(y=e[2].search(this.rules.other.nonSpaceChar),y=y>4?1:y,h=g.slice(y),y+=e[1].length),$&&this.rules.other.blankLine.test(w)&&(u+=w+`
`,t=t.substring(w.length+1),a=!0),!a){let C=this.rules.other.nextBulletRegex(y),M=this.rules.other.hrRegex(y),P=this.rules.other.fencesBeginRegex(y),B=this.rules.other.headingBeginRegex(y),q=this.rules.other.htmlBeginRegex(y);for(;t;){let D=t.split(`
`,1)[0],A;if(w=D,this.options.pedantic?(w=w.replace(this.rules.other.listReplaceNesting,"  "),A=w):A=w.replace(this.rules.other.tabCharGlobal,"    "),P.test(w)||B.test(w)||q.test(w)||C.test(w)||M.test(w))break;if(A.search(this.rules.other.nonSpaceChar)>=y||!w.trim())h+=`
`+A.slice(y);else{if($||g.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||P.test(g)||B.test(g)||M.test(g))break;h+=`
`+w}!$&&!w.trim()&&($=!0),u+=D+`
`,t=t.substring(D.length+1),g=A.slice(y)}}s.loose||(i?s.loose=!0:this.rules.other.doubleBlankLine.test(u)&&(i=!0)),s.items.push({type:"list_item",raw:u,task:!!this.options.gfm&&this.rules.other.listIsTask.test(h),loose:!1,text:h,tokens:[]}),s.raw+=u}let c=s.items.at(-1);if(c)c.raw=c.raw.trimEnd(),c.text=c.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let a of s.items){if(this.lexer.state.top=!1,a.tokens=this.lexer.blockTokens(a.text,[]),a.task){if(a.text=a.text.replace(this.rules.other.listReplaceTask,""),a.tokens[0]?.type==="text"||a.tokens[0]?.type==="paragraph"){a.tokens[0].raw=a.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),a.tokens[0].text=a.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let h=this.lexer.inlineQueue.length-1;h>=0;h--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[h].src)){this.lexer.inlineQueue[h].src=this.lexer.inlineQueue[h].src.replace(this.rules.other.listReplaceTask,"");break}}let u=this.rules.other.listTaskCheckbox.exec(a.raw);if(u){let h={type:"checkbox",raw:u[0]+" ",checked:u[0]!=="[ ]"};a.checked=h.checked,s.loose?a.tokens[0]&&["paragraph","text"].includes(a.tokens[0].type)&&"tokens"in a.tokens[0]&&a.tokens[0].tokens?(a.tokens[0].raw=h.raw+a.tokens[0].raw,a.tokens[0].text=h.raw+a.tokens[0].text,a.tokens[0].tokens.unshift(h)):a.tokens.unshift({type:"paragraph",raw:h.raw,text:h.raw,tokens:[h]}):a.tokens.unshift(h)}}if(!s.loose){let u=a.tokens.filter(g=>g.type==="space"),h=u.length>0&&u.some(g=>this.rules.other.anyLine.test(g.raw));s.loose=h}}if(s.loose)for(let a of s.items){a.loose=!0;for(let u of a.tokens)u.type==="text"&&(u.type="paragraph")}return s}}html(t){let e=this.rules.block.html.exec(t);if(e)return{type:"html",block:!0,raw:e[0],pre:e[1]==="pre"||e[1]==="script"||e[1]==="style",text:e[0]}}def(t){let e=this.rules.block.def.exec(t);if(e){let r=e[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),n=e[2]?e[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=e[3]?e[3].substring(1,e[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):e[3];return{type:"def",tag:r,raw:e[0],href:n,title:s}}}table(t){let e=this.rules.block.table.exec(t);if(!e||!this.rules.other.tableDelimiter.test(e[2]))return;let r=lo(e[1]),n=e[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=e[3]?.trim()?e[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:e[0],header:[],align:[],rows:[]};if(r.length===n.length){for(let i of n)this.rules.other.tableAlignRight.test(i)?o.align.push("right"):this.rules.other.tableAlignCenter.test(i)?o.align.push("center"):this.rules.other.tableAlignLeft.test(i)?o.align.push("left"):o.align.push(null);for(let i=0;i<r.length;i++)o.header.push({text:r[i],tokens:this.lexer.inline(r[i]),header:!0,align:o.align[i]});for(let i of s)o.rows.push(lo(i,o.header.length).map((c,a)=>({text:c,tokens:this.lexer.inline(c),header:!1,align:o.align[a]})));return o}}lheading(t){let e=this.rules.block.lheading.exec(t);if(e)return{type:"heading",raw:e[0],depth:e[2].charAt(0)==="="?1:2,text:e[1],tokens:this.lexer.inline(e[1])}}paragraph(t){let e=this.rules.block.paragraph.exec(t);if(e){let r=e[1].charAt(e[1].length-1)===`
`?e[1].slice(0,-1):e[1];return{type:"paragraph",raw:e[0],text:r,tokens:this.lexer.inline(r)}}}text(t){let e=this.rules.block.text.exec(t);if(e)return{type:"text",raw:e[0],text:e[0],tokens:this.lexer.inline(e[0])}}escape(t){let e=this.rules.inline.escape.exec(t);if(e)return{type:"escape",raw:e[0],text:e[1]}}tag(t){let e=this.rules.inline.tag.exec(t);if(e)return!this.lexer.state.inLink&&this.rules.other.startATag.test(e[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(e[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(e[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(e[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:e[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:e[0]}}link(t){let e=this.rules.inline.link.exec(t);if(e){let r=e[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;let o=dr(r.slice(0,-1),"\\");if((r.length-o.length)%2===0)return}else{let o=ol(e[2],"()");if(o===-2)return;if(o>-1){let i=(e[0].indexOf("!")===0?5:4)+e[1].length+o;e[2]=e[2].substring(0,o),e[0]=e[0].substring(0,i).trim(),e[3]=""}}let n=e[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(n);o&&(n=o[1],s=o[3])}else s=e[3]?e[3].slice(1,-1):"";return n=n.trim(),this.rules.other.startAngleBracket.test(n)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?n=n.slice(1):n=n.slice(1,-1)),co(e,{href:n&&n.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},e[0],this.lexer,this.rules)}}reflink(t,e){let r;if((r=this.rules.inline.reflink.exec(t))||(r=this.rules.inline.nolink.exec(t))){let n=(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=e[n.toLowerCase()];if(!s){let o=r[0].charAt(0);return{type:"text",raw:o,text:o}}return co(r,s,r[0],this.lexer,this.rules)}}emStrong(t,e,r=""){let n=this.rules.inline.emStrongLDelim.exec(t);if(!(!n||n[3]&&r.match(this.rules.other.unicodeAlphaNumeric))&&(!(n[1]||n[2])||!r||this.rules.inline.punctuation.exec(r))){let s=[...n[0]].length-1,o,i,c=s,a=0,u=n[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(u.lastIndex=0,e=e.slice(-1*t.length+s);(n=u.exec(e))!=null;){if(o=n[1]||n[2]||n[3]||n[4]||n[5]||n[6],!o)continue;if(i=[...o].length,n[3]||n[4]){c+=i;continue}else if((n[5]||n[6])&&s%3&&!((s+i)%3)){a+=i;continue}if(c-=i,c>0)continue;i=Math.min(i,i+c+a);let h=[...n[0]][0].length,g=t.slice(0,s+n.index+h+i);if(Math.min(s,i)%2){let $=g.slice(1,-1);return{type:"em",raw:g,text:$,tokens:this.lexer.inlineTokens($)}}let w=g.slice(2,-2);return{type:"strong",raw:g,text:w,tokens:this.lexer.inlineTokens(w)}}}}codespan(t){let e=this.rules.inline.code.exec(t);if(e){let r=e[2].replace(this.rules.other.newLineCharGlobal," "),n=this.rules.other.nonSpaceChar.test(r),s=this.rules.other.startingSpaceChar.test(r)&&this.rules.other.endingSpaceChar.test(r);return n&&s&&(r=r.substring(1,r.length-1)),{type:"codespan",raw:e[0],text:r}}}br(t){let e=this.rules.inline.br.exec(t);if(e)return{type:"br",raw:e[0]}}del(t){let e=this.rules.inline.del.exec(t);if(e)return{type:"del",raw:e[0],text:e[2],tokens:this.lexer.inlineTokens(e[2])}}autolink(t){let e=this.rules.inline.autolink.exec(t);if(e){let r,n;return e[2]==="@"?(r=e[1],n="mailto:"+r):(r=e[1],n=r),{type:"link",raw:e[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}url(t){let e;if(e=this.rules.inline.url.exec(t)){let r,n;if(e[2]==="@")r=e[0],n="mailto:"+r;else{let s;do s=e[0],e[0]=this.rules.inline._backpedal.exec(e[0])?.[0]??"";while(s!==e[0]);r=e[0],e[1]==="www."?n="http://"+e[0]:n=e[0]}return{type:"link",raw:e[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(t){let e=this.rules.inline.text.exec(t);if(e){let r=this.lexer.state.inRawBlock;return{type:"text",raw:e[0],text:e[0],escaped:r}}}},ut=class An{constructor(e){pe(this,"tokens");pe(this,"options");pe(this,"state");pe(this,"inlineQueue");pe(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=e||Dt,this.options.tokenizer=this.options.tokenizer||new Pr,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let r={other:Ve,block:Or.normal,inline:cr.normal};this.options.pedantic?(r.block=Or.pedantic,r.inline=cr.pedantic):this.options.gfm&&(r.block=Or.gfm,this.options.breaks?r.inline=cr.breaks:r.inline=cr.gfm),this.tokenizer.rules=r}static get rules(){return{block:Or,inline:cr}}static lex(e,r){return new An(r).lex(e)}static lexInline(e,r){return new An(r).inlineTokens(e)}lex(e){e=e.replace(Ve.carriageReturn,`
`),this.blockTokens(e,this.tokens);for(let r=0;r<this.inlineQueue.length;r++){let n=this.inlineQueue[r];this.inlineTokens(n.src,n.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(e,r=[],n=!1){for(this.options.pedantic&&(e=e.replace(Ve.tabCharGlobal,"    ").replace(Ve.spaceLine,""));e;){let s;if(this.options.extensions?.block?.some(i=>(s=i.call({lexer:this},e,r))?(e=e.substring(s.raw.length),r.push(s),!0):!1))continue;if(s=this.tokenizer.space(e)){e=e.substring(s.raw.length);let i=r.at(-1);s.raw.length===1&&i!==void 0?i.raw+=`
`:r.push(s);continue}if(s=this.tokenizer.code(e)){e=e.substring(s.raw.length);let i=r.at(-1);i?.type==="paragraph"||i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+s.raw,i.text+=`
`+s.text,this.inlineQueue.at(-1).src=i.text):r.push(s);continue}if(s=this.tokenizer.fences(e)){e=e.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.heading(e)){e=e.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.hr(e)){e=e.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.blockquote(e)){e=e.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.list(e)){e=e.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.html(e)){e=e.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.def(e)){e=e.substring(s.raw.length);let i=r.at(-1);i?.type==="paragraph"||i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+s.raw,i.text+=`
`+s.raw,this.inlineQueue.at(-1).src=i.text):this.tokens.links[s.tag]||(this.tokens.links[s.tag]={href:s.href,title:s.title},r.push(s));continue}if(s=this.tokenizer.table(e)){e=e.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.lheading(e)){e=e.substring(s.raw.length),r.push(s);continue}let o=e;if(this.options.extensions?.startBlock){let i=1/0,c=e.slice(1),a;this.options.extensions.startBlock.forEach(u=>{a=u.call({lexer:this},c),typeof a=="number"&&a>=0&&(i=Math.min(i,a))}),i<1/0&&i>=0&&(o=e.substring(0,i+1))}if(this.state.top&&(s=this.tokenizer.paragraph(o))){let i=r.at(-1);n&&i?.type==="paragraph"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+s.raw,i.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):r.push(s),n=o.length!==e.length,e=e.substring(s.raw.length);continue}if(s=this.tokenizer.text(e)){e=e.substring(s.raw.length);let i=r.at(-1);i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+s.raw,i.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):r.push(s);continue}if(e){let i="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(i);break}else throw new Error(i)}}return this.state.top=!0,r}inline(e,r=[]){return this.inlineQueue.push({src:e,tokens:r}),r}inlineTokens(e,r=[]){let n=e,s=null;if(this.tokens.links){let a=Object.keys(this.tokens.links);if(a.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(n))!=null;)a.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(n=n.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(n))!=null;)n=n.slice(0,s.index)+"++"+n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(n))!=null;)o=s[2]?s[2].length:0,n=n.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let i=!1,c="";for(;e;){i||(c=""),i=!1;let a;if(this.options.extensions?.inline?.some(h=>(a=h.call({lexer:this},e,r))?(e=e.substring(a.raw.length),r.push(a),!0):!1))continue;if(a=this.tokenizer.escape(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.tag(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.link(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(a.raw.length);let h=r.at(-1);a.type==="text"&&h?.type==="text"?(h.raw+=a.raw,h.text+=a.text):r.push(a);continue}if(a=this.tokenizer.emStrong(e,n,c)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.codespan(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.br(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.del(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.autolink(e)){e=e.substring(a.raw.length),r.push(a);continue}if(!this.state.inLink&&(a=this.tokenizer.url(e))){e=e.substring(a.raw.length),r.push(a);continue}let u=e;if(this.options.extensions?.startInline){let h=1/0,g=e.slice(1),w;this.options.extensions.startInline.forEach($=>{w=$.call({lexer:this},g),typeof w=="number"&&w>=0&&(h=Math.min(h,w))}),h<1/0&&h>=0&&(u=e.substring(0,h+1))}if(a=this.tokenizer.inlineText(u)){e=e.substring(a.raw.length),a.raw.slice(-1)!=="_"&&(c=a.raw.slice(-1)),i=!0;let h=r.at(-1);h?.type==="text"?(h.raw+=a.raw,h.text+=a.text):r.push(a);continue}if(e){let h="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(h);break}else throw new Error(h)}}return r}},Fr=class{constructor(t){pe(this,"options");pe(this,"parser");this.options=t||Dt}space(t){return""}code({text:t,lang:e,escaped:r}){let n=(e||"").match(Ve.notSpaceStart)?.[0],s=t.replace(Ve.endingNewline,"")+`
`;return n?'<pre><code class="language-'+gt(n)+'">'+(r?s:gt(s,!0))+`</code></pre>
`:"<pre><code>"+(r?s:gt(s,!0))+`</code></pre>
`}blockquote({tokens:t}){return`<blockquote>
${this.parser.parse(t)}</blockquote>
`}html({text:t}){return t}def(t){return""}heading({tokens:t,depth:e}){return`<h${e}>${this.parser.parseInline(t)}</h${e}>
`}hr(t){return`<hr>
`}list(t){let e=t.ordered,r=t.start,n="";for(let i=0;i<t.items.length;i++){let c=t.items[i];n+=this.listitem(c)}let s=e?"ol":"ul",o=e&&r!==1?' start="'+r+'"':"";return"<"+s+o+`>
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
`}strong({tokens:t}){return`<strong>${this.parser.parseInline(t)}</strong>`}em({tokens:t}){return`<em>${this.parser.parseInline(t)}</em>`}codespan({text:t}){return`<code>${gt(t,!0)}</code>`}br(t){return"<br>"}del({tokens:t}){return`<del>${this.parser.parseInline(t)}</del>`}link({href:t,title:e,tokens:r}){let n=this.parser.parseInline(r),s=ao(t);if(s===null)return n;t=s;let o='<a href="'+t+'"';return e&&(o+=' title="'+gt(e)+'"'),o+=">"+n+"</a>",o}image({href:t,title:e,text:r,tokens:n}){n&&(r=this.parser.parseInline(n,this.parser.textRenderer));let s=ao(t);if(s===null)return gt(r);t=s;let o=`<img src="${t}" alt="${r}"`;return e&&(o+=` title="${gt(e)}"`),o+=">",o}text(t){return"tokens"in t&&t.tokens?this.parser.parseInline(t.tokens):"escaped"in t&&t.escaped?t.text:gt(t.text)}},Pn=class{strong({text:t}){return t}em({text:t}){return t}codespan({text:t}){return t}del({text:t}){return t}html({text:t}){return t}text({text:t}){return t}link({text:t}){return""+t}image({text:t}){return""+t}br(){return""}checkbox({raw:t}){return t}},pt=class En{constructor(e){pe(this,"options");pe(this,"renderer");pe(this,"textRenderer");this.options=e||Dt,this.options.renderer=this.options.renderer||new Fr,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Pn}static parse(e,r){return new En(r).parse(e)}static parseInline(e,r){return new En(r).parseInline(e)}parse(e){let r="";for(let n=0;n<e.length;n++){let s=e[n];if(this.options.extensions?.renderers?.[s.type]){let i=s,c=this.options.extensions.renderers[i.type].call({parser:this},i);if(c!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(i.type)){r+=c||"";continue}}let o=s;switch(o.type){case"space":{r+=this.renderer.space(o);break}case"hr":{r+=this.renderer.hr(o);break}case"heading":{r+=this.renderer.heading(o);break}case"code":{r+=this.renderer.code(o);break}case"table":{r+=this.renderer.table(o);break}case"blockquote":{r+=this.renderer.blockquote(o);break}case"list":{r+=this.renderer.list(o);break}case"checkbox":{r+=this.renderer.checkbox(o);break}case"html":{r+=this.renderer.html(o);break}case"def":{r+=this.renderer.def(o);break}case"paragraph":{r+=this.renderer.paragraph(o);break}case"text":{r+=this.renderer.text(o);break}default:{let i='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return r}parseInline(e,r=this.renderer){let n="";for(let s=0;s<e.length;s++){let o=e[s];if(this.options.extensions?.renderers?.[o.type]){let c=this.options.extensions.renderers[o.type].call({parser:this},o);if(c!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){n+=c||"";continue}}let i=o;switch(i.type){case"escape":{n+=r.text(i);break}case"html":{n+=r.html(i);break}case"link":{n+=r.link(i);break}case"image":{n+=r.image(i);break}case"checkbox":{n+=r.checkbox(i);break}case"strong":{n+=r.strong(i);break}case"em":{n+=r.em(i);break}case"codespan":{n+=r.codespan(i);break}case"br":{n+=r.br(i);break}case"del":{n+=r.del(i);break}case"text":{n+=r.text(i);break}default:{let c='Token with "'+i.type+'" type was not found.';if(this.options.silent)return console.error(c),"";throw new Error(c)}}}return n}},Mr,ur=(Mr=class{constructor(t){pe(this,"options");pe(this,"block");this.options=t||Dt}preprocess(t){return t}postprocess(t){return t}processAllTokens(t){return t}emStrongMask(t){return t}provideLexer(){return this.block?ut.lex:ut.lexInline}provideParser(){return this.block?pt.parse:pt.parseInline}},pe(Mr,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),pe(Mr,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),Mr),al=class{constructor(...t){pe(this,"defaults",Cn());pe(this,"options",this.setOptions);pe(this,"parse",this.parseMarkdown(!0));pe(this,"parseInline",this.parseMarkdown(!1));pe(this,"Parser",pt);pe(this,"Renderer",Fr);pe(this,"TextRenderer",Pn);pe(this,"Lexer",ut);pe(this,"Tokenizer",Pr);pe(this,"Hooks",ur);this.use(...t)}walkTokens(t,e){let r=[];for(let n of t)switch(r=r.concat(e.call(this,n)),n.type){case"table":{let s=n;for(let o of s.header)r=r.concat(this.walkTokens(o.tokens,e));for(let o of s.rows)for(let i of o)r=r.concat(this.walkTokens(i.tokens,e));break}case"list":{let s=n;r=r.concat(this.walkTokens(s.items,e));break}default:{let s=n;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let i=s[o].flat(1/0);r=r.concat(this.walkTokens(i,e))}):s.tokens&&(r=r.concat(this.walkTokens(s.tokens,e)))}}return r}use(...t){let e=this.defaults.extensions||{renderers:{},childTokens:{}};return t.forEach(r=>{let n={...r};if(n.async=this.defaults.async||n.async||!1,r.extensions&&(r.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=e.renderers[s.name];o?e.renderers[s.name]=function(...i){let c=s.renderer.apply(this,i);return c===!1&&(c=o.apply(this,i)),c}:e.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=e[s.level];o?o.unshift(s.tokenizer):e[s.level]=[s.tokenizer],s.start&&(s.level==="block"?e.startBlock?e.startBlock.push(s.start):e.startBlock=[s.start]:s.level==="inline"&&(e.startInline?e.startInline.push(s.start):e.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(e.childTokens[s.name]=s.childTokens)}),n.extensions=e),r.renderer){let s=this.defaults.renderer||new Fr(this.defaults);for(let o in r.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let i=o,c=r.renderer[i],a=s[i];s[i]=(...u)=>{let h=c.apply(s,u);return h===!1&&(h=a.apply(s,u)),h||""}}n.renderer=s}if(r.tokenizer){let s=this.defaults.tokenizer||new Pr(this.defaults);for(let o in r.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let i=o,c=r.tokenizer[i],a=s[i];s[i]=(...u)=>{let h=c.apply(s,u);return h===!1&&(h=a.apply(s,u)),h}}n.tokenizer=s}if(r.hooks){let s=this.defaults.hooks||new ur;for(let o in r.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let i=o,c=r.hooks[i],a=s[i];ur.passThroughHooks.has(o)?s[i]=u=>{if(this.defaults.async&&ur.passThroughHooksRespectAsync.has(o))return(async()=>{let g=await c.call(s,u);return a.call(s,g)})();let h=c.call(s,u);return a.call(s,h)}:s[i]=(...u)=>{if(this.defaults.async)return(async()=>{let g=await c.apply(s,u);return g===!1&&(g=await a.apply(s,u)),g})();let h=c.apply(s,u);return h===!1&&(h=a.apply(s,u)),h}}n.hooks=s}if(r.walkTokens){let s=this.defaults.walkTokens,o=r.walkTokens;n.walkTokens=function(i){let c=[];return c.push(o.call(this,i)),s&&(c=c.concat(s.call(this,i))),c}}this.defaults={...this.defaults,...n}}),this}setOptions(t){return this.defaults={...this.defaults,...t},this}lexer(t,e){return ut.lex(t,e??this.defaults)}parser(t,e){return pt.parse(t,e??this.defaults)}parseMarkdown(t){return(e,r)=>{let n={...r},s={...this.defaults,...n},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&n.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof e>"u"||e===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof e!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(e)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=t),s.async)return(async()=>{let i=s.hooks?await s.hooks.preprocess(e):e,c=await(s.hooks?await s.hooks.provideLexer():t?ut.lex:ut.lexInline)(i,s),a=s.hooks?await s.hooks.processAllTokens(c):c;s.walkTokens&&await Promise.all(this.walkTokens(a,s.walkTokens));let u=await(s.hooks?await s.hooks.provideParser():t?pt.parse:pt.parseInline)(a,s);return s.hooks?await s.hooks.postprocess(u):u})().catch(o);try{s.hooks&&(e=s.hooks.preprocess(e));let i=(s.hooks?s.hooks.provideLexer():t?ut.lex:ut.lexInline)(e,s);s.hooks&&(i=s.hooks.processAllTokens(i)),s.walkTokens&&this.walkTokens(i,s.walkTokens);let c=(s.hooks?s.hooks.provideParser():t?pt.parse:pt.parseInline)(i,s);return s.hooks&&(c=s.hooks.postprocess(c)),c}catch(i){return o(i)}}}onError(t,e){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,t){let n="<p>An error occurred:</p><pre>"+gt(r.message+"",!0)+"</pre>";return e?Promise.resolve(n):n}if(e)return Promise.reject(r);throw r}}},It=new al;function le(t,e){return It.parse(t,e)}le.options=le.setOptions=function(t){return It.setOptions(t),le.defaults=It.defaults,uo(le.defaults),le};le.getDefaults=Cn;le.defaults=Dt;le.use=function(...t){return It.use(...t),le.defaults=It.defaults,uo(le.defaults),le};le.walkTokens=function(t,e){return It.walkTokens(t,e)};le.parseInline=It.parseInline;le.Parser=pt;le.parser=pt.parse;le.Renderer=Fr;le.TextRenderer=Pn;le.Lexer=ut;le.lexer=ut.lex;le.Tokenizer=Pr;le.Hooks=ur;le.parse=le;var _d=le.options,bd=le.setOptions,wd=le.use,kd=le.walkTokens,yd=le.parseInline;var vd=pt.parse,$d=ut.lex;function vo(t){let e=le.parse(t),r=eo.sanitize(e);return no(r)}function ll(t){return String(t||"").replace(/^docs\/(superpowers\/)?/,"")}function $o(t,e){let r=e.getWorkspacePath,n=e.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",i="",c="";function a(y){y.key==="Escape"&&s&&(y.preventDefault(),w())}document.addEventListener("keydown",a);function u(){return s?p`
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
                    ${c||"\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}
                  </div>`:vo(i)}
          </div>
        </div>
      </div>
    `:p``}function h(){de(u(),t)}async function g(y){s=y,o="loading",i="",c="",h();let C=r?r():"";if(!C){o="error",c="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",h();return}if(!n){o="error",c="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",h();return}let M="/api/doc?workspace="+encodeURIComponent(C)+"&path="+encodeURIComponent(y);try{let P=await n(M),B=await P.json().catch(()=>({}));if(!P.ok||!B||B.ok!==!0){o="error",c="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(B&&B.error||P.status)+")",h();return}i=String(B.content||""),o="ready",h()}catch{o="error",c="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",h()}}function w(){s=null,de(p``,t)}function $(){document.removeEventListener("keydown",a),w()}return{open:g,close:w,destroy:$}}var cl={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function dl(t){if(typeof t!="number"||!Number.isFinite(t))return"";let e=new Date(t),r=String(e.getHours()).padStart(2,"0"),n=String(e.getMinutes()).padStart(2,"0");return`${r}:${n}`}function xo(t,e={}){let r=Array.isArray(t)?t:[];if(r.length===0)return p`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let n=new Set;for(let i of r)i&&typeof i.resumed_from=="string"&&i.resumed_from.length>0&&n.add(i.resumed_from);let s=i=>{if(!(i.status==="failed"||i.status==="orphaned"))return"";let a=typeof i.session_id=="string"&&i.session_id.length>0,u=n.has(i.attempt_id),h=a&&!u,g=a?u?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return p`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${i.attempt_id}
      ?disabled=${!h}
      title=${g}
      @click=${w=>{w.stopPropagation(),h&&e.onResume&&e.onResume(i.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},o=i=>{if(!(i.status==="failed"||i.status==="orphaned")||typeof i.cause!="string"||i.cause==="")return"";let a=i.cause_detail,u=a&&typeof a.reason=="string"&&a.reason.length>0?typeof a.command=="string"&&a.command.length>0?`${a.reason} \xB7 ${a.command}`:a.reason:i.cause;return p`<div class="detail-session__cause" title=${u}>
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
  `}var ul=["open","in_progress","deferred","resolved","closed"],pl=[0,1,2,3,4];function So(t,e){let r=e.issueStores,n=e.onClose,s=e.transport,o=e.onNavigate,i=e.queueStore,c=e.sessionLogStore,a=null,u=null,h={},g=!1,w=!1,$="",y="",C="";function M(){g=!1,w=!1,$="",y="",C=""}let P=document.createElement("div");P.className="md-viewer-root",document.body.appendChild(P);let B=$o(P,{getWorkspacePath:e.getWorkspacePath||(()=>"")}),q=document.createElement("div");q.className="session-log-root",document.body.appendChild(q);let D=Er(q,{transport:s?(l,_)=>Promise.resolve(s(l,_)):void 0,sessionLogStore:c});function A(){if(!i||!a)return[];let l=i.get();return(l&&l.attempts?Object.values(l.attempts):[]).filter(v=>v&&v.bead_id===a).sort((v,T)=>(T.started_at||0)-(v.started_at||0)).map(v=>({attempt_id:v.attempt_id,bead_id:v.bead_id,status:v.status,started_at:typeof v.started_at=="number"?v.started_at:null,runner:v.runner||null,model:v.model||null,session_id:v.session_id||null,resumed_from:v.resumed_from||null,dismissed_at:typeof v.dismissed_at=="number"?v.dismissed_at:null,cause:typeof v.cause=="string"?v.cause:null,cause_detail:v.cause_detail||null}))}function S(l){let _=i?i.get():null,v=_&&_.attempts?_.attempts[l]:null;D.open({attempt_id:l,meta:v?{runner:v.runner||void 0,model:v.model||void 0,effort:v.effort||void 0,status:v.status||void 0,session_id:v.session_id||void 0}:{}})}async function x(l){if(!s||!l)return;let _=()=>{let T=i?i.get():null;return T&&typeof T.revision=="number"?T.revision:0},v=await s("worker-attempt-resume",{attempt_id:l,expected_revision:_()});if(v&&v.conflict){let T=v.queue&&typeof v.queue.revision=="number"?v.queue.revision:_();v=await s("worker-attempt-resume",{attempt_id:l,expected_revision:T})}v&&v.resumed===!1&&!v.conflict&&v.reason&&Z(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${v.reason}`,"error",2400)}let b={onOpen:S,onResume:x};function O(){let l=i?i.get():null,_=l&&l.exec_defaults;return _&&typeof _=="object"?_:{}}let N=null;r&&r.subscribe&&(N=r.subscribe(()=>ke()));let z=null;i&&typeof i.subscribe=="function"&&(z=i.subscribe(()=>{a&&d()}));function K(l){l.key==="Escape"&&a&&(l.preventDefault(),n())}document.addEventListener("keydown",K);function ke(){if(a){if(r&&typeof r.snapshotFor=="function"){let l=r.snapshotFor("detail:"+a)||[];u=l.find(v=>v&&v.id===a)||l[0]||u}d()}}function oe(l){Lt(l).then(_=>{_?Z("\uBCF5\uC0AC\uB428","success",1200):Z("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function ee(l){l.preventDefault(),l.stopPropagation(),a&&oe(a)}function Xe(l,_){l.preventDefault(),l.stopPropagation(),oe(_)}function qe(l,_){l.preventDefault(),l.stopPropagation(),B.open(_)}function ve(l,_){h[l]=_,d(),!(!s||!a)&&Promise.resolve(s("update-exec-settings",{id:a,key:l,value:_})).catch(()=>{Z("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}async function Ae(l,_,v){if(!s||!a)return!1;try{let T=await Promise.resolve(s(l,_)),G=Array.isArray(T)?T[0]:T;return G&&typeof G=="object"&&G.id?(u=G,!0):(Z(v,"error"),!1)}catch{return Z(v,"error"),!1}}function Qe(l){setTimeout(()=>{try{let _=t.querySelector(l);_&&typeof _.focus=="function"&&_.focus()}catch{}},0)}function fe(){g=!0,$=u&&u.title||"",d(),Qe('.detail-edit__input[data-edit="title"]')}function ot(l){$=l.target.value}function he(){g=!1,$="",d()}function Je(){Ae("edit-text",{id:a,field:"title",value:$},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(_=>{_&&(g=!1,$=""),d()})}function ae(){w=!0,y=u&&u.description||"",d(),Qe('.detail-edit__textarea[data-edit="description"]')}function Fe(l){y=l.target.value}function rt(){w=!1,y="",d()}function Ce(){Ae("edit-text",{id:a,field:"description",value:y},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(_=>{_&&(w=!1,y=""),d()})}function Le(l,_,v,T){if(l.key==="Escape"){l.stopPropagation(),v();return}l.key==="Enter"&&(!T||l.ctrlKey||l.metaKey)&&(l.preventDefault(),_())}function $e(l){let _=l.target.value;Ae("update-status",{id:a,status:_},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>d())}function Ue(l){let _=Number(l.target.value);Ae("update-priority",{id:a,priority:_},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>d())}function et(l){C=l.target.value}function Ie(){let l=C.trim();l.length!==0&&Ae("label-add",{id:a,label:l},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(_=>{_&&(C=""),d()})}function ze(l){if(l.key==="Escape"){l.stopPropagation(),C="",d();return}l.key==="Enter"&&(l.preventDefault(),Ie())}function De(l){Ae("label-remove",{id:a,label:l},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>d())}let ce={onCopyPath:Xe,onOpenDoc:qe},xe={onChange:ve};function Oe(l){return typeof l=="string"?l:l&&typeof l=="object"?String(l.id||l.to||l.issue_id||l.depends_on||""):""}function He(l){switch(l&&typeof l=="object"?String(l.dependency_type||l.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function Me(l){let v=(Array.isArray(l.dependencies)?l.dependencies:[]).map(T=>({id:Oe(T),icon:He(T)})).filter(T=>T.id.length>0);return p`
      <div class="detail-section-label">의존성</div>
      ${v.length===0?p`<div class="detail-empty">의존성 없음</div>`:p`<div class="detail-deps">
            ${v.map(T=>o?p`<button
                    type="button"
                    class="detail-dep detail-dep--link"
                    @click=${()=>o(T.id)}
                  >
                    ${T.icon?`${T.icon} `:""}${T.id}
                  </button>`:p`<span class="detail-dep"
                    >${T.icon?`${T.icon} `:""}${T.id}</span
                  >`)}
          </div>`}
    `}function tt(l){let _=l.metadata||{},v=l.workflow||{},T=v.stages||{},G=T.spec&&T.spec.stale,Q=T.impl&&T.impl.stale,F=v.route_source==="derived",ue=v.route||_.route||"\u2014";return p`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${F?" detail-kv__v--derived":""}"
          title=${F?"route \uCD94\uB860\uAC12 (metadata \uBBF8\uD540)":"route"}
          >${F&&v.route?`${ue} ? (\uCD94\uB860)`:ue}</span
        >
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">spec_review</span>
        <span class="detail-kv__v"
          >${_.spec_review||"\uC5C6\uC74C"}${G?" \xB7 stale":""}</span
        >
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">impl_review</span>
        <span class="detail-kv__v"
          >${_.impl_review||"\uC5C6\uC74C"}${Q?" \xB7 stale":""}</span
        >
      </div>
      ${_.pr_url?p`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${_.pr_url}</span>
          </div>`:""}
    `}let it={route:["spec_backed","full_plan"]};async function me(l,_){let v=_.target.value;if(l==="route"&&u&&u.metadata&&u.metadata.route==="full_plan"&&v!=="full_plan"&&!window.confirm(`full_plan \u2192 ${v||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){d();return}await Ae("update-workflow-meta",{id:a,key:l,value:v},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),d()}function Ne(l){let _=l.metadata||{};return p` ${((T,G)=>{let Q=it[T],F=typeof _[T]=="string"?_[T]:"";return p`<div class="detail-kv">
        <span class="detail-kv__k">${T}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${T}
          data-edit=${`wfmeta-${T}`}
          @change=${ue=>me(T,ue)}
        >
          <option value="" ?selected=${!Q.includes(F)}>
            ${G}
          </option>
          ${Q.map(ue=>p`<option value=${ue} ?selected=${F===ue}>${ue}</option>`)}
        </select>
      </div>`})("route","(\uBBF8\uC124\uC815 \xB7 \uCD94\uB860)")} `}function Pe(l){return g?p`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${$}
            @input=${ot}
            @keydown=${_=>Le(_,Je,he,!1)}
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
              @click=${he}
            >
              취소
            </button>
          </div>
        </div>
      `:p`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${l}</h2>
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
    `}function Re(l){let _=bt(l.created_at),v=bt(l.updated_at);return!_&&!v?p``:p`
      ${_?p`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${_}</span>
          </div>`:""}
      ${v?p`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${v}</span>
          </div>`:""}
    `}function R(l,_){return p`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${$e}
        >
          ${ul.map(v=>p`<option value=${v} ?selected=${v===l}>${v}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${Ue}
        >
          ${pl.map(v=>p`<option value=${String(v)} ?selected=${v===_}>
                P${v}
              </option>`)}
        </select>
      </div>
    `}function I(l){return p`
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
              .value=${y}
              @input=${Fe}
              @keydown=${_=>Le(_,Ce,rt,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${Ce}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${rt}
              >
                취소
              </button>
            </div>
          </div>`:p`<div class="detail-overlay__desc">
            ${l||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function X(l){let _=Array.isArray(l.labels)?l.labels:[];return p`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${_.map(v=>p`<span class="detail-label-chip"
              >${v}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${v}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+v}
                @click=${()=>De(v)}
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
            @input=${et}
            @keydown=${ze}
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
    `}function V(){if(!a)return p``;let l=u||{},_=String(l.id||a),v=l.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",T=l.status||"open",G=typeof l.priority=="number"?Math.max(0,Math.min(4,l.priority)):"",Q=l.description||"",F={...l,metadata:{...l.metadata||{},...h}};return p`
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
            ${_}
          </button>
          ${Pe(v)} ${R(T,G)}
          ${Re(l)} ${I(Q)}
          ${X(l)} ${Me(l)}
          ${tt(l)} ${Ne(l)}
          ${qs(l,ce)}
          ${Us(F,xe,O())}
          ${xo(A(),b)}
        </div>
      </div>
    `}function d(){de(V(),t)}return{load(l){l!==a&&(h={},M()),a=l,u=null,ke()},clear(){a=null,u=null,h={},M(),B.close(),D.close(),de(p``,t)},destroy(){N&&(N(),N=null),z&&(z(),z=null),document.removeEventListener("keydown",K),B.destroy(),P.parentNode&&P.parentNode.removeChild(P),D.destroy(),q.parentNode&&q.parentNode.removeChild(q),a=null,u=null,de(p``,t)}}}var fl=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function To(t,e){return an(t,e)?"shown":e.hidden_labels.includes(t)?"hidden_exact":"hidden_prefix"}function hl(t,e,r){if(!r)return{hidden_labels:e.hidden_labels.includes(t)?e.hidden_labels:[...e.hidden_labels,t],visible_labels:e.visible_labels.filter(o=>o!==t)};let n=e.hidden_labels.filter(o=>o!==t);return e.hidden_prefixes.some(o=>o.length>0&&t.startsWith(o))?{hidden_labels:n,visible_labels:e.visible_labels.includes(t)?e.visible_labels:[...e.visible_labels,t]}:{hidden_labels:n}}function Ao(t,e){let{policyStore:r,transport:n,labelOptions:s}=e,o=document.createElement("dialog");o.id="display-settings-dialog",o.className="display-settings",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),t.appendChild(o);let i="";async function c(S){let x=r.get();if(x)try{let b=await n("display-policy-set",{expected_revision:x.revision,policy:S(x)});a(b),b&&b.conflict&&b.policy&&(b=await n("display-policy-set",{expected_revision:b.policy.revision,policy:S(b.policy)}),a(b)),b&&b.conflict&&Z("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC","error",4e3)}catch{Z("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function a(S){S&&S.policy&&typeof S.policy=="object"&&r.set(S.policy)}function u(S){let x=r.get();if(!x)return;let b=To(S,x)!=="shown";c(O=>hl(S,O,b))}function h(){let S=i.trim();S.length!==0&&(i="",c(x=>x.hidden_prefixes.includes(S)?{hidden_prefixes:x.hidden_prefixes}:{hidden_prefixes:[...x.hidden_prefixes,S]}),M())}function g(S){c(x=>({hidden_prefixes:x.hidden_prefixes.filter(b=>b!==S)}))}function w(S){let x=r.get();if(!x)return;let b=x.chips[S]===!1;c(()=>({chips:{[S]:b}}))}function $(S){let x=s();return p`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">라벨 표시</h3>
        <p class="display-settings__hint">
          라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을
          누르면 그 라벨만 예외로 다시 표시됩니다.
        </p>
        ${x.length===0?p`<div class="display-settings__empty">라벨 없음</div>`:p`<div class="display-settings__pills">
              ${x.map(b=>{let O=To(b,S);return p`<button
                  type="button"
                  class=${`display-settings__pill display-settings__pill--${O}`}
                  data-label=${b}
                  data-state=${O}
                  @click=${()=>u(b)}
                >
                  ${b}
                </button>`})}
            </div>`}
      </section>
    `}function y(S){return p`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">숨김 prefix</h3>
        <div class="display-settings__prefixes">
          ${S.hidden_prefixes.map(x=>p`<span class="display-settings__prefix">
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
          <button type="button" @click=${h}>추가</button>
        </div>
      </section>
    `}function C(S){return p`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">카드 표시 요소</h3>
        <div class="display-settings__toggles">
          ${fl.map(([x,b])=>p`<label class="display-settings__toggle">
                <input
                  type="checkbox"
                  data-chip=${x}
                  .checked=${S.chips[x]!==!1}
                  @change=${()=>w(x)}
                />
                <span>${b}</span>
              </label>`)}
        </div>
      </section>
    `}function M(){let S=r.get();de(p`
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
            ${S?p`${$(S)} ${y(S)}
                ${C(S)}`:p`<div class="display-settings__empty">
                  표시 정책을 불러오는 중…
                </div>`}
          </div>
        </div>
      `,o)}let P=!1,B=()=>{P=!1};o.addEventListener("close",B),o.addEventListener("cancel",B);let q=null;r.subscribe&&(q=r.subscribe(()=>{P&&M()}));function D(){P||(i="",P=!0,M(),typeof o.showModal=="function"?o.showModal():o.setAttribute("open",""))}function A(){P&&(P=!1,typeof o.close=="function"?o.close():o.removeAttribute("open"))}return{open:D,close:A,destroy(){P=!1,o.removeEventListener("close",B),o.removeEventListener("cancel",B),q&&(q(),q=null),o.remove()}}}function Eo(t){let e=document.createElement("dialog");e.id="fatal-error-dialog",e.setAttribute("role","alertdialog"),e.setAttribute("aria-modal","true"),e.innerHTML=`
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
    </div>`,t.appendChild(e);let r=e.querySelector("#fatal-error-title"),n=e.querySelector("#fatal-error-message"),s=e.querySelector("#fatal-error-detail"),o=e.querySelector("#fatal-error-reload"),i=e.querySelector("#fatal-error-close"),c=()=>{if(typeof e.close=="function")try{e.close()}catch{}e.removeAttribute("open")},a=(u,h,g="")=>{r&&(r.textContent=u||"Unexpected Error"),n&&(n.textContent=h||"An unrecoverable error occurred.");let w=typeof g=="string"?g.trim():"";if(s&&(w.length>0?(s.textContent=w,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof e.showModal=="function")try{e.showModal(),e.setAttribute("open","")}catch{e.setAttribute("open","")}else e.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),i&&i.addEventListener("click",()=>c()),e.addEventListener("cancel",u=>{u.preventDefault(),c()}),{open:a,close:c,getElement(){return e}}}function Co(t,e,r){let n=ye("views:nav"),s=null;function o(a){return u=>{u.preventDefault(),n("click tab %s",a),r.gotoView(a)}}function i(){let u=e.getState().view==="worker"?"worker":"board";return p`
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
      </div>
    `}function c(){de(i(),t)}return c(),s=e.subscribe(()=>c()),{destroy(){s&&(s(),s=null),de(p``,t)}}}var Ro=["bug","feature","task","epic","chore"];function Lo(t){switch((t||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var Io=["Critical","High","Medium","Low","Backlog"];function Do(t,e){let r=document.createElement("dialog");r.id="new-issue-dialog",r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true"),r.innerHTML=`
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
  `,t.appendChild(r);let n=r.querySelector("#new-issue-form"),s=r.querySelector("#new-title"),o=r.querySelector("#new-type"),i=r.querySelector("#new-priority"),c=r.querySelector("#new-labels"),a=r.querySelector("#new-description"),u=r.querySelector("#new-issue-error"),h=r.querySelector("#btn-cancel"),g=r.querySelector("#btn-create"),w=r.querySelector(".new-issue__close");function $(){o.replaceChildren();let A=document.createElement("option");A.value="",A.textContent="\u2014 Select \u2014",o.appendChild(A);for(let S of Ro){let x=document.createElement("option");x.value=S,x.textContent=Lo(S),o.appendChild(x)}i.replaceChildren();for(let S=0;S<=4;S+=1){let x=document.createElement("option");x.value=String(S);let b=Io[S]||"Medium";x.textContent=`${S} \u2013 ${b}`,i.appendChild(x)}}$();function y(){try{typeof r.close=="function"?r.close():r.removeAttribute("open")}catch{r.removeAttribute("open")}}function C(A){s.disabled=A,o.disabled=A,i.disabled=A,c.disabled=A,a.disabled=A,h.disabled=A,g.disabled=A,g.textContent=A?"Creating\u2026":"Create"}function M(){u.textContent=""}function P(A){u.textContent=A}function B(){try{let A=window.localStorage.getItem("beads-ui.new.type");A?o.value=A:o.value="";let S=window.localStorage.getItem("beads-ui.new.priority");S&&/^\d$/.test(S)?i.value=S:i.value="2"}catch{o.value="",i.value="2"}}function q(){let A=o.value||"",S=i.value||"";A.length>0&&window.localStorage.setItem("beads-ui.new.type",A),S.length>0&&window.localStorage.setItem("beads-ui.new.priority",S)}async function D(){M();let A=String(s.value||"").trim();if(A.length===0){P("Title is required"),s.focus();return}let S=Number(i.value||"2");if(!(S>=0&&S<=4)){P("Priority must be 0..4"),i.focus();return}let x=String(o.value||""),b=String(a.value||""),O={title:A};x.length>0&&(O.type=x),String(S).length>0&&(O.priority=S),b.length>0&&(O.description=b),C(!0);try{await e("create-issue",O)}catch{C(!1),P("Failed to create issue");return}q(),C(!1),y()}return r.addEventListener("cancel",A=>{A.preventDefault(),y()}),w.addEventListener("click",()=>y()),h.addEventListener("click",()=>y()),r.addEventListener("keydown",A=>{A.key==="Enter"&&(A.ctrlKey||A.metaKey)&&(A.preventDefault(),D())}),n.addEventListener("submit",A=>{A.preventDefault(),D()}),{open(){n.reset(),M(),B();try{"showModal"in r&&typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")}catch{r.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){y()}}}function Oo(t){if(typeof t!="number"||!Number.isFinite(t)||t<=0)return"";if(t<6e4)return`${Math.round(t/1e3)}\uCD08`;let e=t/6e4;return`${Number.isInteger(e)?e:Math.round(e*10)/10}\uBD84`}function Mo(t){return Array.isArray(t)?t.filter(e=>typeof e=="string").join(" "):""}var gl={deployed:{modifier:"ok",label:"\uC131\uACF5"},launched:{modifier:"launched",label:"\uBC1C\uC0AC\uB428"},failed:{modifier:"fail",label:"\uC2E4\uD328"}},ml=[{key:"orchestration_model",values:()=>pn},{key:"orchestration_effort",values:()=>fn},{key:"review_model",values:()=>hn},{key:"impl_model",values:()=>gn}];function No(t,e){let{queueStore:r,transport:n,getWorkspacePath:s}=e,o=document.createElement("dialog");o.id="worker-exec-defaults-dialog",o.className="exec-defaults",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),t.appendChild(o);function i(){return r&&r.get()||{revision:0,exec_defaults:{}}}function c(){let b=i();return typeof b.revision=="number"?b.revision:0}function a(){let b=i().exec_defaults;return b&&typeof b=="object"?b:{}}function u(b){b&&b.queue&&r&&r.set(b.queue)}async function h(b,O){if(!n)return;let N={key:b,value:O||null};try{let z=await n("worker-queue-set-exec-default",{...N,expected_revision:c()});u(z),z&&z.conflict&&(z=await n("worker-queue-set-exec-default",{...N,expected_revision:c()}),u(z)),z&&z.conflict&&Z("\uC804\uC5ED \uC2E4\uD589 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC","error",4e3)}catch{Z("\uC804\uC5ED \uC2E4\uD589 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function g(b,O,N){let z=!!N&&!O.includes(N);return p`<div class="exec-defaults__row">
      <span class="exec-defaults__k">${b}</span>
      <select
        class="exec-defaults__sel"
        aria-label=${`\uC804\uC5ED ${b}`}
        data-key=${b}
        @change=${K=>{h(b,K.target.value)}}
      >
        <option value="" ?selected=${!N}>
          ${mn[b]||"(\uAE30\uBCF8)"}
        </option>
        ${z?p`<option value=${N} ?selected=${!0}>
              ${N} (비호환)
            </option>`:""}
        ${O.map(K=>p`<option value=${K} ?selected=${N===K}>${K}</option>`)}
      </select>
    </div>`}function w(){let b=i().workspace_info;return b&&typeof b=="object"?b:{}}function $(b,O){return p`<span
      class="exec-defaults__vd-badge exec-defaults__vd-badge--${b}"
      >${O}</span
    >`}function y(b){let O=b?Mo(b.cmd):"",N=b?Oo(b.timeout_ms):"",z=s&&s()||"<workspace \uACBD\uB85C>";return p`<div class="exec-defaults__vd-group" data-vd="verify">
      <div class="exec-defaults__vd-label">머지 전 검증 (verify)</div>
      ${O?p`<div class="exec-defaults__vd-line">
            <span class="exec-defaults__vd-cmd">${O}</span>
            ${$("config","config")}
            ${N?p`<span class="exec-defaults__vd-meta"
                  >timeout ${N}</span
                >`:""}
          </div>`:p`<div class="exec-defaults__vd-line exec-defaults__vd-absent">
            검증 없음 —
            <span class="exec-defaults__vd-cmd"
              >[worker.verify."${z}"]</span
            >
            섹션으로 정의
          </div>`}
    </div>`}function C(b){let O=b?Mo(b.cmd):"",N=b?Oo(b.timeout_ms):"",z=N?`timeout ${N} \xB7 verify \uD1B5\uACFC \uC2DC\uC5D0\uB9CC \uC2E4\uD589`:"verify \uD1B5\uACFC \uC2DC\uC5D0\uB9CC \uC2E4\uD589",K=s&&s()||"<workspace \uACBD\uB85C>";return p`<div class="exec-defaults__vd-group" data-vd="deploy">
      <div class="exec-defaults__vd-label">머지 후 배포 (deploy)</div>
      ${O?p`<div class="exec-defaults__vd-line">
            <span class="exec-defaults__vd-cmd">${O}</span>
            ${$("config","config")}
            ${b.detached===!0?$("detached","detached"):""}
            <span class="exec-defaults__vd-meta">${z}</span>
          </div>`:p`<div class="exec-defaults__vd-line exec-defaults__vd-absent">
            배포 없음 —
            <span class="exec-defaults__vd-cmd"
              >[worker.deploy."${K}"]</span
            >
            섹션으로 정의
          </div>`}
    </div>`}function M(b){if(!b||typeof b!="object")return"";let O=gl[String(b.outcome)];if(!O)return"";let N=b.outcome==="failed"&&b.reason?`${O.label} \xB7 ${b.reason}`:O.label,z=[bt(b.at),typeof b.bead_id=="string"?b.bead_id:"",typeof b.base_sha=="string"?b.base_sha.slice(0,7):""].filter(K=>K.length>0).join(" \xB7 ");return p`<div class="exec-defaults__vd-group" data-vd="last-deploy">
      <div class="exec-defaults__vd-label">마지막 배포</div>
      <div class="exec-defaults__vd-line">
        ${$(O.modifier,N)}
        ${z?p`<span class="exec-defaults__vd-meta">${z}</span>`:""}
      </div>
    </div>`}function P(b){return p`<section class="exec-defaults__vd">
      <p class="exec-defaults__vd-title">
        검증·배포 설정
        <span class="exec-defaults__vd-ro"
          >읽기 전용 — config.toml에서 정의</span
        >
      </p>
      ${y(b.verify_cmd)} ${C(b.deploy_cmd)}
      ${M(b.last_deploy)}
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
            ${ml.map(O=>g(O.key,O.values(),b[O.key]||""))}
            ${P(w())}
          </div>
        </div>
      `,o)}let q=!1,D=()=>{q=!1};o.addEventListener("close",D),o.addEventListener("cancel",D);let A=null;r&&r.subscribe&&(A=r.subscribe(()=>{q&&B()}));function S(){q||(q=!0,B(),typeof o.showModal=="function"?o.showModal():o.setAttribute("open",""))}function x(){q&&(q=!1,typeof o.close=="function"?o.close():o.removeAttribute("open"))}return{open:S,close:x,destroy(){q=!1,o.removeEventListener("close",D),o.removeEventListener("cancel",D),A&&(A(),A=null),o.remove()}}}var _l="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function zt(t){return typeof t=="number"&&Number.isFinite(t)?t:0}function bl(t){return!t||typeof t!="object"?!1:typeof t.input_tokens=="number"||typeof t.output_tokens=="number"}function wl(t){return t>=1e6?`${(t/1e6).toFixed(1)}M`:t>=1e3?`${(t/1e3).toFixed(1)}k`:String(t)}function Ht(t){if(!bl(t))return null;let e=zt(t?.input_tokens)+zt(t?.output_tokens);return`\u03C4 ${wl(e)}`}function Ur(t){if(!t||typeof t!="object")return"";let e=[`\uC785\uB825 ${zt(t.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${zt(t.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${zt(t.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${zt(t.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&e.push(`$${t.total_cost_usd.toFixed(2)}`);let r=e.join(" \xB7 ");return t.replayed?`${r}
${_l}`:r}function Fn(t,e){let r=null;for(let n of Object.values(t||{}))n&&n.bead_id===e&&(r=n.usage||null);return r}function Bn(t){let e=t.draggable&&!t.done,r=Array.isArray(t.badges)?t.badges:[],n=Ht(t.usage),s=t.merge_step||null,o=t.lane==="pr_wait",i=e?p`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",c=p`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${t.id}</span
  >`,a=p`<span class="worker-mini__title">${t.title}</span>`,u=t.pr_url&&t.pr_number?p`<a
          class="worker-mini__pr"
          href=${t.pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="PR 열기"
          >#${t.pr_number} ↗</a
        >`:"",h=r.map(B=>B===t.live_badge?p`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${B}</span
        >`:p`<span
          class="worker-mini__badge${t.alert?" worker-mini__badge--alert":""}"
          >${B}</span
        >`),g=t.reason?p`<span class="worker-mini__reason">${t.reason}</span>`:"",w=n?p`<span class="worker-usage" title=${Ur(t.usage)}
        >${n}</span
      >`:"",$=s?p`<span class="merge-step"
        >${s.label}<span class="merge-step__n"
          >${s.index}/${s.total}</span
        ></span
      >`:"",y=t.merge_action?p`<button
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
      </button>`:"",M=t.revise_action?p`<button
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
        </button>`:"",P=!!(n||s||t.merge_action||t.discard_action);return p`<div
    class="worker-mini${o?" worker-mini--card":""}${e?"":" worker-mini--static"}${t.done?" worker-mini--done":""}${s?" worker-mini--merging":""}"
    style=${s?`--progress: ${s.percent}%`:""}
    draggable=${e?"true":"false"}
    data-bead-id=${t.id}
    data-lane=${t.lane}
  >
    ${o?p`<div class="worker-mini__head">
            ${i}${c}${u}${h}${g}
          </div>
          <div class="worker-mini__body">${a}</div>
          ${P?p`<div class="worker-mini__foot">
                ${w}${$}
                <span class="worker-mini__actions"
                  >${y}${C}</span
                >
              </div>`:""}`:p`${i}${c}${a}${u}${h}${g}${w}${$}${y}${C}${M}`}
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
  </div>`}function Sl(t,e,r=null){let n=!!t.paused,s=n?"\uC77C\uC2DC\uC815\uC9C0":typeof t.started_at=="number"?xl(e-t.started_at):"\u2014",o=[t.runner,t.model].filter(Boolean).join(" \xB7 "),i=Ht(t.usage),c=t.conflict_resolution?n?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,a=t.attempt_id&&t.attempt_id===r;return p`<div
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
    ${o||i||c?p`<div class="rtile__meta">
          ${c?p`<span class="worker-mini__badge">${c}</span>`:""}
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
  </div>`}var Tl="tab:worker:ready",Al="tab:worker:blocked",zr=1;function Hn(t){let e=t&&t.metadata;return!!(e&&typeof e=="object"&&e.spec_id)}var Uo="beads-ui.worker.candidate-filter",Un={show_blocked:!1,spec:"all"};function El(){try{let t=window.localStorage.getItem(Uo);if(!t)return{...Un};let e=JSON.parse(t);if(!e||typeof e!="object")return{...Un};let r=e.spec;return{show_blocked:e.show_blocked===!0,spec:r==="with"||r==="without"?r:"all"}}catch{return{...Un}}}function Cl(t){try{window.localStorage.setItem(Uo,JSON.stringify(t))}catch{}}function Rl(t,e){let r=c=>e.show_blocked||!c.blocked,n=c=>e.spec==="all"||(e.spec==="with"?c.has_spec:!c.has_spec),s=[],o=0,i=0;for(let c of t){let a=r(c),u=n(c);a&&u?s.push(c):!a&&u?o+=1:a&&!u&&(i+=1)}return{visible:s,hidden_blocked:o,hidden_spec:i}}var Ll=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],zo="bdui.worker.candidate_sort",Il=[{value:"spec",label:"spec \uC6B0\uC120"},{value:"board",label:"Board \uC21C\uC11C"},{value:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131\uC21C"}],Hr="spec";function Dl(){try{let t=window.localStorage.getItem(zo);return t==="board"||t==="created"||t==="spec"?t:Hr}catch{return Hr}}function Ol(t){try{window.localStorage.setItem(zo,t)}catch{}}var Ml="(max-width: 640px)",Ho="beads-ui.worker.lane-collapsed",hr={queue:!0,done:!0};function Nl(){try{let t=window.localStorage.getItem(Ho);if(!t)return{...hr};let e=JSON.parse(t);return!e||typeof e!="object"?{...hr}:{queue:typeof e.queue=="boolean"?e.queue:hr.queue,done:typeof e.done=="boolean"?e.done:hr.done}}catch{return{...hr}}}function Pl(t){try{window.localStorage.setItem(Ho,JSON.stringify(t))}catch{}}function qo(t){let e=Array.isArray(t)&&t.length>0?t[0]:null;if(!e)return"";let r=typeof e.title=="string"?e.title:e.id||"";return r.length>22?`${r.slice(0,22)}\u2026`:r}function Fl(t,e,r){let n=Array.isArray(t)?t.slice():[];return e==="created"?n.sort(Et):(n.sort(vr(r)),e==="board"?n:[...n.filter(Hn),...n.filter(s=>!Hn(s))])}function Bl(t){let e=t&&t.parent;return(typeof e=="string"?e.length>0:!!(e&&e.id))||/\.\d+$/.test(t&&t.id||"")}function ql(t){let r=(Array.isArray(t?.dependencies)?t.dependencies:[]).map(n=>typeof n=="string"?n:n&&n.id).filter(Boolean);return r.length>0?`\u{1F512} ${r.join(", ")}`:"\u{1F512} blocked"}var Ul=["closed_unmerged","undecidable"],zl=[{from:"\uAD00\uCE21 \uB300\uAE30",activity:"checking",to:"\uD655\uC778\uC911"},{from:"\uB85C\uCEEC\uAC80\uC99D \uB300\uAE30",activity:"verifying",to:"\uB85C\uCEEC\uAC80\uC99D \uC2E4\uD589 \uC911"}];function Hl(t,e){for(let r of zl)if(t===r.from&&e===r.activity)return{label:r.to,live:!0};return{label:t,live:!1}}var zn=[{step:"merging",label:"\uBA38\uC9C0 \uC911"},{step:"base_sync",label:"base \uB3D9\uAE30\uD654"},{step:"post_merge_verify",label:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D"},{step:"deploy",label:"\uBC30\uD3EC"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"}];function Wl(t){if(typeof t!="string"||t.length===0)return null;let e=zn.length,r=zn.findIndex(n=>n.step===t);return r<0?{label:t,index:0,total:e,percent:0}:{label:zn[r].label,index:r+1,total:e,percent:Math.round((r+1)/e*100)}}function Gl(t,e,r,n,s=null,o=null,i=null,c=!1){let a=r[t]||null,u=a&&a.gate?a.gate:null,h=a&&a.pr?a.pr:null,g=[];c&&g.push("\uC138\uC158");let w=i?i==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":null,$=Hl(c&&u&&u.tier==="closed_unmerged"?"\uB2EB\uD798":u&&u.gate_badge||"",w?null:o&&o.activity||null);w&&g.push(w),$.label&&g.push($.label),u&&u.base_badge&&u.base_badge!==u.gate_badge&&g.push(u.base_badge),n&&g.push("\uC815\uB9AC \uC2E4\uD328");let y=!!u&&u.base_badge==="\uCDA9\uB3CC",C=!!u&&u.enabled===!0,M=Wl(o&&o.merge_progress?o.merge_progress.step:null),P=!!n&&!!u&&u.tier==="merged",B=c&&!!u&&u.tier==="merged",q=c&&y;return{id:t,title:e,reason:n?"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644":"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",pr_number:h&&typeof h.number=="number"?h.number:null,pr_url:h&&typeof h.url=="string"?h.url:"",badges:g,live_badge:i==="running"?w:w?null:$.live?$.label:null,usage:s,alert:!!u&&Ul.includes(u.tier)||!!n,merge_action:!0,discard_action:!c&&!n&&!(u&&u.tier==="merged"),merge_step:M,discard_enabled:!M&&!i,discard_title:i?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":void 0,merge_enabled:!M&&!i&&!q&&(C||y&&!c||P||B),merge_label:B?"\uC815\uB9AC":y&&!c&&!M&&!P?"\uCDA9\uB3CC \uD574\uC18C":void 0,merge_title:M?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${M.label}`:B?"\uBA38\uC9C0\uB428 \u2014 \uD074\uB9AD\uD558\uBA74 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC\uB97C \uC218\uD589\uD569\uB2C8\uB2E4":q?"\uC678\uBD80 PR \uCDA9\uB3CC \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694 (\uC5EC\uAE30\uC11C\uB294 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B8 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4)":i==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":i==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":P?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uCC98\uC74C\uBD80\uD130 \uB2E4\uC2DC \uC218\uD589\uD569\uB2C8\uB2E4":y?"\uCDA9\uB3CC \u2014 \uD074\uB9AD\uD558\uBA74 \uCDA9\uB3CC \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4 (\uBA38\uC9C0\uD558\uC9C0 \uC54A\uC74C)":C?`\uBA38\uC9C0 (${u.gate_badge}) \u2014 \uD074\uB9AD \uC2DC\uC810\uC5D0 \uB2E4\uC2DC \uD655\uC778\uD569\uB2C8\uB2E4`:u&&u.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${u&&u.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function Wn(t,e={}){let{transport:r,issueStores:n,queueStore:s,sessionLogStore:o,uiOrderStore:i,gotoIssue:c,getWorkspacePath:a}=e,u=n?xr(n,i):null,h=Sr({transport:r,uiOrderStore:i}),g=null,w=[],$=El(),y=Dl(),C=Nl(),M=!1,P=new Set,B=new Set,q=[],D=document.createElement("div");D.className="worker-console";let A=document.createElement("div");A.className="worker-top";let S=document.createElement("div");S.className="worker-drawer-overlay",S.hidden=!0;let x=document.createElement("div");x.className="worker-drawer-overlay__backdrop";let b=document.createElement("div");b.className="worker-drawer-host",S.append(x,b);let O=document.createElement("div");O.className="worker-lanes-host",D.append(A,S,O),t.appendChild(D);let N=null,z=Er(b,{transport:r,sessionLogStore:o,onClose:()=>{N=null,S.hidden=!0,ce()}}),K=No(D,{queueStore:s,transport:r,getWorkspacePath:a});function ke(){return s&&s.get()||{revision:0,auto_advance:!1,slots:zr,queue:[],pr_wait:[],done:[]}}function oe(){let d=ke();return typeof d.revision=="number"?d.revision:0}function ee(d){d&&d.queue&&s&&s.set(d.queue)}function Xe(){let d=ke().queue;return Array.isArray(d)?d.length:0}async function qe(d,l){if(!r)return;let _=await r("worker-queue-place",{bead_id:d,index:l,expected_revision:oe()});ee(_),_&&_.conflict&&await r("worker-queue-place",{bead_id:d,index:l,expected_revision:oe()}).then(ee)}async function ve(d,l){if(!r)return;let _=await r("worker-queue-reorder",{bead_id:d,to_index:l,expected_revision:oe()});ee(_),_&&_.conflict&&await r("worker-queue-reorder",{bead_id:d,to_index:l,expected_revision:oe()}).then(ee)}async function Ae(d){if(!r)return;let l=await r("worker-queue-remove",{bead_id:d,expected_revision:oe()});ee(l),l&&l.conflict&&await r("worker-queue-remove",{bead_id:d,expected_revision:oe()}).then(ee)}async function Qe(d){!r||!d||await r("worker-attempt-stop",{attempt_id:d})}async function fe(d){if(!r||!d)return;let l=await r("worker-attempt-pause",{attempt_id:d});l&&l.paused===!1&&l.reason&&Z(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${l.reason}`,"error",2400)}async function ot(d){if(!r||!d)return;let l=await r("worker-attempt-resume",{attempt_id:d,expected_revision:oe()});ee(l),l&&l.conflict&&(l=await r("worker-attempt-resume",{attempt_id:d,expected_revision:oe()}),ee(l)),l&&l.resumed===!1&&!l.conflict&&l.reason&&Z(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${l.reason}`,"error",2400)}async function he(d){if(!r||!d)return;let l=await r("worker-attempt-dismiss",{attempt_id:d,expected_revision:oe()});ee(l),l&&l.conflict&&(l=await r("worker-attempt-dismiss",{attempt_id:d,expected_revision:oe()}),ee(l)),l&&l.dismissed===!1&&!l.conflict&&l.reason&&Z(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${l.reason}`,"error",2400)}async function Je(d){if(!r||!d)return;P.add(d),ce();let l;try{l=await r("worker-pr-merge",{bead_id:d,expected_revision:oe()}),ee(l),l&&l.conflict&&(l=await r("worker-pr-merge",{bead_id:d,expected_revision:oe()}),ee(l))}finally{P.delete(d),ce()}if(!(!l||l.conflict)){if(l.action==="conflict_resolution"){Z(l.ok?"\uCDA9\uB3CC \u2014 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 (\uBA38\uC9C0\uD558\uC9C0 \uC54A\uC74C)":`\uCDA9\uB3CC \uD574\uC18C \uB514\uC2A4\uD328\uCE58 \uC2E4\uD328: ${l.reason||""}`,l.ok?"success":"error",2800);return}if(l.ok){Z("\uBA38\uC9C0 + \uC815\uB9AC \uC644\uB8CC","success",2e3);return}Z(l.cleanup_step?`\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uC2E4\uD328(${l.cleanup_step}): ${l.reason||""}`:`\uBA38\uC9C0 \uAC70\uBD80: ${l.reason||""}`,"error",3200)}}async function ae(d){if(!r||!d||!(typeof globalThis.confirm!="function"||globalThis.confirm(`${d}: PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4. \uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694. \uACC4\uC18D\uD560\uAE4C\uC694?`)))return;let _=await r("worker-pr-discard",{bead_id:d,expected_revision:oe()});if(ee(_),_&&_.conflict&&(_=await r("worker-pr-discard",{bead_id:d,expected_revision:oe()}),ee(_)),_&&_.discarded===!0){Z("\uD3D0\uAE30 \uC644\uB8CC \u2014 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB2E4\uC2DC \uC2E4\uD589\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4","success",2400);return}_&&_.discarded===!1&&!_.conflict&&Z(`\uD3D0\uAE30 \uAC70\uBD80: ${_.reason||""}`,"error",2800)}async function Fe(d,l){if(!r||!l||B.has(l))return;B.add(l),ce();let _;try{_=await r(d,{bead_id:l,expected_revision:oe()}),ee(_),_&&_.conflict&&(_=await r(d,{bead_id:l,expected_revision:oe()}),ee(_))}finally{B.delete(l),ce()}if(!(!_||_.conflict)){if(_.ok){Z(d==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}Z(`\uCC98\uBD84 \uAC70\uBD80: ${_.reason||""}`,"error",3e3)}}async function rt(d){if(!r)return;let l=await r("worker-queue-toggle",{on:d,expected_revision:oe()});ee(l),l&&l.conflict&&await r("worker-queue-toggle",{on:d,expected_revision:oe()}).then(ee)}async function Ce(d){if(!r||!Number.isFinite(d))return;let l=Math.max(zr,Math.floor(d)),_=await r("worker-queue-set-slots",{slots:l,expected_revision:oe()});ee(_),_&&_.conflict&&await r("worker-queue-set-slots",{slots:l,expected_revision:oe()}).then(ee)}function Le(){let d=ke(),l=u?u.selectBoardColumn(Tl,"ready"):[],_=u?u.selectBoardColumn(Al,"blocked"):[],v=d.bead_titles||{},T=new Map;for(let[E,H]of Object.entries(v))typeof H=="string"&&H.length>0&&T.set(E,H);for(let E of[...l,..._])T.set(E.id,E.title||E.id);let G=d.pr_wait||[],Q=d.pr_observations||{},F=d.pr_activity||{},ue=d.cleanup_failed||{},at=Object.entries(ue).map(([E,H])=>({bead_id:E,step:H&&H.step?H.step:"",reason:H&&H.reason?H.reason:"",detail:H&&typeof H.detail=="string"?H.detail:null,output_tail:H&&typeof H.output_tail=="string"&&H.output_tail?H.output_tail:void 0,log_path:H&&typeof H.log_path=="string"&&H.log_path?H.log_path:void 0})),nt=d.queue||[],ft=new Set([...nt.map(E=>E.bead_id),...G.map(E=>E.bead_id),...d.done.map(E=>E.bead_id)]),Ke=new Set(_.map(E=>E.id)),te=i?i.get()?.order||{}:{},_e=new Set,m=[];for(let E of[...l,..._])ft.has(E.id)||_e.has(E.id)||Bl(E)||(_e.add(E.id),m.push(E));w=Fl(m,y,te);let k=d.admission||{},Y=E=>{let H=k[E];if(!H)return"";if(H.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let ne=typeof H.reason=="string"?H.reason:"",se=ne.indexOf(":");return se>0&&se<ne.length-1?`\u26D4 ${ne.slice(0,se)} (${ne.slice(se+1)})`:`\u26D4 ${ne}`},j=w.map(E=>{let H=Hn(E),ne=Ke.has(E.id),se=[];ne&&se.push(ql(E)),H||se.push("spec \uC5C6\uC74C");let Vt=Y(E.id);return Vt&&se.push(Vt),{id:E.id,title:E.title||E.id,reason:se.join(" \xB7 "),draggable:H,lane:"candidate",workflow:E.workflow,status:E.status,blocked:ne,has_spec:H}}),J=Rl(j,$),be=J.visible,Ot=d.revise_parked||{},gr=(E,H)=>E.map(ne=>{let se=H==="queue"?Ot[ne.bead_id]:null;return{id:ne.bead_id,title:T.get(ne.bead_id)||ne.bead_id,reason:H==="done"?"":Y(ne.bead_id),draggable:H!=="done",done:H==="done",lane:H,badges:se?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!se,revise_action:!!se,revise_enabled:!!se&&!B.has(ne.bead_id),revise_title:se?se.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${se.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":"",usage:H==="done"?Fn(d.attempts||{},ne.bead_id):null}}),We=d.attempts?Object.values(d.attempts):[],lt=new Set;for(let E of We)E&&typeof E.resumed_from=="string"&&E.resumed_from.length>0&&lt.add(E.resumed_from);let Wt=new Map;for(let E of We)Wt.set(E.bead_id,E.attempt_id);let Gt=new Map;for(let E of We)Gt.set(E.attempt_id,E);function jt(E){let H=new Set,ne=E;for(;ne&&!H.has(ne.attempt_id);){if(ne.conflict_resolution===!0)return!0;H.add(ne.attempt_id),ne=typeof ne.resumed_from=="string"&&ne.resumed_from.length>0&&Gt.get(ne.resumed_from)||null}return!1}let mt=[],Te=null;for(let E of We){let H=E.status==="paused"&&!lt.has(E.attempt_id);E.status==="running"||H?mt.push({bead_id:E.bead_id,attempt_id:E.attempt_id,title:T.get(E.bead_id)||E.bead_id,runner:E.runner||null,model:E.model||null,effort:E.effort||null,started_at:typeof E.started_at=="number"?E.started_at:null,resumed_from:E.resumed_from||null,paused:H,conflict_resolution:jt(E),can_pause:typeof E.session_id=="string"&&E.session_id.length>0,usage:E.usage||null}):(E.status==="failed"||E.status==="orphaned")&&!(Wt.get(E.bead_id)!==E.attempt_id)&&typeof E.dismissed_at!="number"&&(Te=E)}let Yt=null;if(Te){let E=typeof Te.session_id=="string"&&Te.session_id.length>0,H=lt.has(Te.attempt_id),ne=Te.cause_detail;Yt={repo:Te.repo||"",reason:Te.cause||Te.status,cause_detail:ne&&typeof ne.reason=="string"?{reason:ne.reason,command:typeof ne.command=="string"?ne.command:null}:null,resume_attempt_id:Te.attempt_id,resume_eligible:E&&!H,resume_reason:E?H?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}}let mr=new Set(mt.map(E=>E.bead_id)),vt=new Map;for(let E of mt)E.conflict_resolution&&(E.paused?vt.has(E.bead_id)||vt.set(E.bead_id,"paused"):vt.set(E.bead_id,"running"));let _r=mt.filter(E=>!E.paused).length,W=(d.workspace_info||{}).slots,f=typeof W=="number"?W:typeof d.slots=="number"?d.slots:zr,L=_r>f,U=gr(d.done,"done"),ge=0,Ee=0,we=!1;for(let E of U){let H=E.usage;H&&typeof H=="object"&&(Number.isFinite(H.input_tokens)&&(ge+=H.input_tokens,we=!0),Number.isFinite(H.output_tokens)&&(Ee+=H.output_tokens,we=!0))}let Be=we?Ht({input_tokens:ge,output_tokens:Ee}):null;return{queue:d,idToTitle:T,candidates:be,candidate_hidden:{blocked:J.hidden_blocked,spec:J.hidden_spec},running:mt,live_count:_r,slots:f,over_cap:L,failure:Yt,waiting:gr(nt.filter(E=>!mr.has(E.bead_id)),"queue"),pr_wait:G.map(E=>Gl(E.bead_id,T.get(E.bead_id)||E.bead_id,Q,ue[E.bead_id]||null,Fn(d.attempts||{},E.bead_id),F[E.bead_id]||(P.has(E.bead_id)?{activity:null,merge_progress:{step:"merging"}}:null),vt.get(E.bead_id)||null,E.external===!0)),done:U,token_total:Be,cleanup_failures:at}}function $e(d){let l=d.waiting.length>0?d.waiting[0].id:"\u2014",_=p`<button
      type="button"
      class="worker-play${d.queue.auto_advance?" is-active":""}"
    >
      ${d.queue.auto_advance?"\u23F8 \uC77C\uC2DC\uC815\uC9C0":"\u25B6 \uC790\uB3D9 \uC9C4\uD589"}
    </button>`,v=d.over_cap?p`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",T=p`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${d.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${d.pr_wait.length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >오늘 완료 <b>${d.done.length}</b></span
      >`,G=p`<label class="worker-tgl worker-slots"
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
      </button>`,Q=Bo({failure:d.failure,cleanupFailures:d.cleanup_failures});return M?p`<div class="worker-ribbon">
          ${_}
          <div class="worker-kpi worker-kpi--ribbon">${v}${T}</div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${G}</div>
        </div>
        ${Q}`:p`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${_}${G}</div>
        <div class="worker-kpi">
          ${v}${T}
          ${d.token_total?p`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title="완료된 세션들의 토큰 합계 (입력+출력)"
                >${d.token_total}</span
              >`:""}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${l}</b></span
          >
        </div>
      </div>
      ${Q}`}function Ue(d){if(d.running.length===0&&d.pr_wait.length===0)return"";let l=d.running.some(_=>!_.paused);return p`<section
      class="worker-now${l?" worker-pane--live":""}"
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
      ${d.running.length>0?qn(d.running,Date.now(),N):""}
      ${d.pr_wait.map(_=>Bn(_))}
    </section>`}function et(d){let l=d.candidate_hidden;return p`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${$.show_blocked}
        />
        🔒 blocked${l.blocked>0?` ${l.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${Ll.map(_=>p`<button
              type="button"
              class="worker-filter__chip${$.spec===_.value?" is-active":""}"
              data-spec=${_.value}
              aria-pressed=${$.spec===_.value?"true":"false"}
            >
              ${_.label}
            </button>`)}
        ${l.spec>0?p`<span class="worker-filter__hidden">숨김 ${l.spec}</span>`:""}
      </div>
    </div>`}function Ie(){return p`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${y}
    >
      ${Il.map(d=>p`<option value=${d.value} ?selected=${y===d.value}>
            ${d.label}
          </option>`)}
    </select>`}function ze(d){let l=kt({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:d.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:Ie(),controls:et(d)});return M?p`<div class="worker-lanes worker-lanes--mobile">
        ${Ue(d)}
        ${kt({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:d.waiting,empty:"\uB4DC\uB798\uADF8 \uB610\uB294 [\uB300\uAE30\uB85C \u21B4]\uB85C \uBC30\uCE58",collapsible:!0,collapsed:C.queue,preview:qo(d.waiting)})}
        ${l}
        ${kt({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:d.done,empty:"\uC644\uB8CC \uC5C6\uC74C",collapsible:!0,collapsed:C.done,preview:d.token_total||qo(d.done)})}
      </div>`:p`<div class="worker-lanes">
      ${l}
      ${kt({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:d.waiting,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58"})}
      ${kt({id:"worker-pane-running",lane:"running",title:`\uC2E4\uD589 \uC911 \xB7 \uC2AC\uB86F ${d.slots}`,items:d.running,live:d.running.some(_=>!_.paused),body:qn(d.running,Date.now(),N)})}
      ${kt({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:d.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C"})}
      ${kt({id:"worker-pane-done",lane:"done",title:`\uC644\uB8CC \xB7 \uC624\uB298 ${d.done.length}`,items:d.done,empty:"\uC644\uB8CC \uC5C6\uC74C"})}
    </div>`}function De(d){C={...C,[d]:!C[d]},Pl(C),ce()}function ce(){let d=Le();de($e(d),A),de(ze(d),O)}function xe(){let d=document.querySelector(".app-header");if(!d)return;let l=()=>{let _=Math.round(d.getBoundingClientRect().height);D.style.setProperty("--worker-ribbon-top",`${_}px`)};if(l(),typeof ResizeObserver=="function"){let _=new ResizeObserver(l);_.observe(d),q.push(()=>_.disconnect())}else window.addEventListener("resize",l),q.push(()=>window.removeEventListener("resize",l))}function Oe(){if(typeof window.matchMedia!="function")return;let d=window.matchMedia(Ml);M=!!d.matches;let l=_=>{let v=!!(_&&typeof _.matches=="boolean"?_.matches:d.matches);v!==M&&(M=v,ce())};typeof d.addEventListener=="function"?(d.addEventListener("change",l),q.push(()=>d.removeEventListener("change",l))):typeof d.addListener=="function"&&(d.addListener(l),q.push(()=>d.removeListener(l)))}function He(d){let l=d.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!l)return;let _=l.dataset.beadId||"",v=l.dataset.lane||"";g={bead_id:_,from_lane:v};try{d.dataTransfer?.setData("text/plain",_),d.dataTransfer&&(d.dataTransfer.effectAllowed="move")}catch{}}function Me(d){let l=d.target?.closest?.(".worker-pane");if(!l)return;let _=l.dataset.lane||"";_!=="candidate"&&_!=="queue"||(d.preventDefault(),d.dataTransfer&&(d.dataTransfer.dropEffect="move"),l.classList.add("worker-pane--drag-over"))}function tt(d){d.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function it(d,l){let _=w.find(Q=>Q.id===d);if(!_)return;let v=w.filter(Q=>Q.id!==d),T=v.length;if(l){let Q=l.dataset.beadId;if(Q===d)return;let F=v.findIndex(ue=>ue.id===Q);F>=0&&(T=F)}let G=v.slice();G.splice(T,0,_),h.applyReorder(d,G,T)}function me(d){let l=d.target?.closest?.(".worker-pane");if(!l)return;d.preventDefault(),l.classList.remove("worker-pane--drag-over");let _=l.dataset.lane||"",v=g?.bead_id||d.dataTransfer?.getData("text/plain")||"",T=g?.from_lane||"";if(g=null,!v)return;let G=d.target?.closest?.(".worker-mini, .worker-card"),Q=Array.from(l.querySelectorAll(".worker-mini, .worker-card")),F=Q.length;if(G){let ue=Q.indexOf(G);ue>=0&&(F=ue)}if(l.classList.contains("worker-pane--collapsed")&&(F=Xe()),_==="candidate"){if(T==="candidate"){it(v,G);return}T==="queue"&&Ae(v);return}_==="queue"&&(T==="queue"?ve(v,F):qe(v,F))}function Ne(d){$=d,Cl(d),ce()}function Pe(d){y=d==="board"||d==="created"||d==="spec"?d:Hr,Ol(y),ce()}function Re(d){let l=d.target?.closest?.(".worker-filter__blocked");if(l){Ne({...$,show_blocked:l.checked});return}let _=d.target?.closest?.(".worker-sort");if(_){Pe(_.value||Hr);return}let v=d.target?.closest?.(".worker-slots__input");if(!v)return;let T=Number.parseInt(v.value,10);if(!Number.isFinite(T)){ce();return}Ce(T).then(ce)}function R(d){return d?{runner:d.runner||void 0,model:d.model||void 0,effort:d.effort||void 0,worktree:d.worktree||void 0,status:d.status||void 0,session_id:d.session_id||void 0}:{}}function I(d){let l=ke(),_=l.attempts?l.attempts[d]:null;N=d,S.hidden=!1,z.open({attempt_id:d,meta:R(_)}),ce()}function X(){if(!N)return;let d=ke(),l=d.attempts?d.attempts[N]:null;if(l){z.updateMeta(R(l));return}z.close()}function V(d){let l=d.target;if(l?.closest?.("#worker-exec-defaults-dialog"))return;if(l?.closest?.(".worker-exec-defaults-btn")){K.open();return}let _=l?.closest?.(".worker-banner__resume");if(_){let te=_.dataset.attemptId;te&&ot(te);return}let v=l?.closest?.(".worker-banner__dismiss");if(v){let te=v.dataset.attemptId;te&&he(te);return}if(l?.closest?.(".worker-play")){rt(!ke().auto_advance);return}let T=l?.closest?.(".worker-pane__hd--toggle");if(T){let te=T.dataset.lane;(te==="queue"||te==="done")&&De(te);return}let G=l?.closest?.(".worker-card__place");if(G){let te=G.dataset.beadId;te&&!G.disabled&&qe(te,Xe());return}let Q=l?.closest?.(".worker-filter__chip");if(Q){let te=Q.dataset.spec;(te==="all"||te==="with"||te==="without")&&Ne({...$,spec:te});return}let F=l?.closest?.(".worker-mini__merge");if(F){Je(F.dataset.beadId||"");return}let ue=l?.closest?.(".worker-mini__discard");if(ue){ae(ue.dataset.beadId||"");return}let at=l?.closest?.(".worker-mini__revise-fix");if(at){Fe("worker-revise-fix",at.dataset.beadId||"");return}let nt=l?.closest?.(".worker-mini__revise-approve");if(nt){Fe("worker-revise-approve",nt.dataset.beadId||"");return}if(l?.closest?.(".worker-mini__pr"))return;if(l?.closest?.(".rtile__stop")){let _e=l?.closest?.(".rtile")?.dataset?.attemptId;_e&&Qe(_e);return}if(l?.closest?.(".rtile__pause")){let _e=l?.closest?.(".rtile")?.dataset?.attemptId;_e&&fe(_e);return}if(l?.closest?.(".rtile__resume")){let _e=l?.closest?.(".rtile")?.dataset?.attemptId;_e&&ot(_e);return}if(l?.closest?.(".rtile__session")){let _e=l?.closest?.(".rtile")?.dataset?.attemptId;_e&&I(_e);return}if(l?.closest?.(".worker-drawer-overlay__backdrop")){z.close();return}if(l?.closest?.(".worker-drawer-host"))return;let ft=l?.closest?.(".rtile");if(ft){if(l?.closest?.(".rtile__id")){let _e=ft.dataset.beadId;_e&&Lt(_e).then(m=>{m?Z("\uBCF5\uC0AC\uB428","success",1200):Z("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let te=ft.dataset.beadId;te&&c&&c(te);return}let Ke=l?.closest?.(".worker-mini, .worker-card");if(Ke){let te=Ke.dataset.beadId;if(l?.closest?.(".worker-mini__id, .worker-card__id")){te&&Lt(te).then(_e=>{_e?Z("\uBCF5\uC0AC\uB428","success",1200):Z("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}te&&c&&c(te)}}return t.addEventListener("dragstart",He),t.addEventListener("dragover",Me),t.addEventListener("dragleave",tt),t.addEventListener("drop",me),t.addEventListener("click",V),t.addEventListener("change",Re),Oe(),xe(),u&&q.push(u.subscribe(ce)),s&&q.push(s.subscribe(()=>{ce(),X()})),ce(),{load(){ce()},destroy(){for(let d of q.splice(0))try{d()}catch{}t.removeEventListener("dragstart",He),t.removeEventListener("dragover",Me),t.removeEventListener("dragleave",tt),t.removeEventListener("drop",me),t.removeEventListener("click",V),t.removeEventListener("change",Re);try{z.destroy()}catch{}S.hidden=!0;try{K.destroy()}catch{}de(p``,t)}}}function Gn(t){if(!t)return"Unknown";let e=t.split("/").filter(Boolean);return e.length>0?e[e.length-1]:"Unknown"}function Wo(t,e,r,n=async()=>{},s=async()=>{}){let o=ye("views:workspace-picker"),i=null,c=!1,a=!1,u=!1;async function h(S){let b=S.target.value,N=e.getState().workspace?.current?.path||"";if(b&&b!==N){o("switching workspace to %s",b),c=!0,A();try{await r(b)}catch(z){o("workspace switch failed: %o",z)}finally{c=!1,A()}}}async function g(){let S=e.getState(),x=S.workspace?.current?.path||S.workspace?.available?.[0]?.path||"";if(!(!x||a)){o("git-pulling workspace %s",x),a=!0,A();try{await n(x)}catch(b){o("workspace git pull failed: %o",b)}finally{a=!1,A()}}}function w(S){let x=S.target;x&&t.contains(x)||C()}function $(S){S.key==="Escape"&&C()}function y(){u||(u=!0,document.addEventListener("mousedown",w),document.addEventListener("keydown",$),A())}function C(){u&&(u=!1,document.removeEventListener("mousedown",w),document.removeEventListener("keydown",$),A())}function M(){u?C():y()}async function P(S){let x=S.target,b=x.value,O=x.checked;o("toggling visibility %s \u2192 %s",b,String(O));try{await s(b,O)}catch(N){o("workspace visibility toggle failed: %o",N)}}function B(S){return S?p`
      <button
        type="button"
        class="workspace-picker__git-pull-button"
        @click=${g}
        ?disabled=${c||a}
        aria-label="Git Pull"
        title="Git Pull"
      >
        <span aria-hidden="true">⬇</span>
      </button>
    `:p``}function q(S,x){return p`
      <div class="workspace-picker__manage">
        <button
          type="button"
          class="workspace-picker__manage-button"
          @click=${M}
          aria-haspopup="true"
          aria-expanded=${u?"true":"false"}
          aria-label="프로젝트 관리"
        >
          프로젝트 관리
        </button>
        ${u?p`
              <div
                class="workspace-picker__manage-popover"
                role="menu"
                aria-label="프로젝트 표시 선택"
              >
                ${S.map(b=>p`
                    <label
                      class="workspace-picker__manage-row"
                      title="${b.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${b.path}"
                        .checked=${!x.has(b.path)}
                        @change=${P}
                      />
                      <span class="workspace-picker__manage-name"
                        >${Gn(b.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function D(){let S=e.getState(),x=S.workspace?.current,b=S.workspace?.available||[],O=new Set(S.workspace?.hidden||[]),N=x?.path||b[0]?.path||"";if(b.length===0)return p``;let z=b.filter(K=>!O.has(K.path)||K.path===N);if(z.length<=1){let K=z[0]||b[0],ke=Gn(K.path);return p`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${K.path}"
            >${ke}</span
          >
          ${q(b,O)}
          ${B(N)}
          ${a?p`<span
                class="workspace-picker__loading"
                aria-hidden="true"
              ></span>`:""}
        </div>
      `}return p`
      <div class="workspace-picker">
        <select
          class="workspace-picker__select"
          @change=${h}
          ?disabled=${c||a}
          aria-label="Select project workspace"
        >
          ${z.map(K=>p`
              <option
                value="${K.path}"
                ?selected=${K.path===N}
                title="${K.path}"
              >
                ${Gn(K.path)}
              </option>
            `)}
        </select>
        ${q(b,O)}
        ${B(N)}
        ${c||a?p`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function A(){de(D(),t)}return A(),i=e.subscribe(()=>A()),{destroy(){i&&(i(),i=null),document.removeEventListener("mousedown",w),document.removeEventListener("keydown",$),de(p``,t)}}}var Go=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-queue-set-slots","worker-queue-set-exec-default","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-pr-merge","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append"];function jn(){let t=Date.now().toString(36),e=Math.random().toString(36).slice(2,8);return`${t}-${e}`}function jo(t,e,r=jn()){return{id:r,type:t,payload:e}}function Yo(t={}){let e=ye("ws"),r={initialMs:t.backoff?.initialMs??1e3,maxMs:t.backoff?.maxMs??3e4,factor:t.backoff?.factor??2,jitterRatio:t.backoff?.jitterRatio??.2},n=()=>t.url&&t.url.length>0?t.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",i=0,c=null,a=!0,u=new Map,h=[],g=new Map,w=new Set;function $(D){for(let A of Array.from(w))try{A(D)}catch{}}function y(){if(!a||c)return;o="reconnecting",e("ws reconnecting\u2026"),$(o);let D=Math.min(r.maxMs||0,(r.initialMs||0)*Math.pow(r.factor||1,i)),A=(r.jitterRatio||0)*D,S=Math.max(0,Math.round(D+(Math.random()*2-1)*A));e("ws retry in %d ms (attempt %d)",S,i+1),c=setTimeout(()=>{c=null,q()},S)}function C(D){try{s?.send(JSON.stringify(D))}catch(A){e("ws send failed",A)}}function M(){for(o="open",e("ws open"),$(o),i=0;h.length;){let D=h.shift();D&&C(D)}}function P(D){let A;try{A=JSON.parse(String(D.data))}catch{e("ws received non-JSON message");return}if(!A||typeof A.id!="string"||typeof A.type!="string"){e("ws received invalid envelope");return}if(u.has(A.id)){let x=u.get(A.id);u.delete(A.id),A.ok?x?.resolve(A.payload):x?.reject(A.error||new Error("ws error"));return}let S=g.get(A.type);if(S&&S.size>0)for(let x of Array.from(S))try{x(A.payload)}catch(b){e("ws event handler error",b)}else e("ws received unhandled message type: %s",A.type)}function B(){o="closed",e("ws closed"),$(o);for(let[D,A]of u.entries())A.reject(new Error("ws disconnected")),u.delete(D);i+=1,y()}function q(){if(!a)return;let D=n();try{s=new WebSocket(D),e("ws connecting %s",D),o="connecting",$(o),s.addEventListener("open",M),s.addEventListener("message",P),s.addEventListener("error",()=>{}),s.addEventListener("close",B)}catch(A){e("ws connect failed %o",A),y()}}return q(),{send(D,A){if(!Go.includes(D))return Promise.reject(new Error(`unknown message type: ${D}`));let S=jn(),x=jo(D,A,S);return e("send %s id=%s",D,S),new Promise((b,O)=>{u.set(S,{resolve:b,reject:O,type:D}),s&&s.readyState===s.OPEN?C(x):(e("queue %s id=%s (state=%s)",D,S,o),h.push(x))})},on(D,A){g.has(D)||g.set(D,new Set);let S=g.get(D);return S?.add(A),()=>{S?.delete(A)}},onConnection(D){return w.add(D),()=>{w.delete(D)}},reconnect(){a=!0,c&&(clearTimeout(c),c=null),i=0,q()},close(){a=!1,c&&(clearTimeout(c),c=null);try{s?.close()}catch{}},getState(){return o}}}function jl(){let t=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof t?.workspace_config?.default_workspace=="string"&&t.workspace_config.default_workspace.length>0?t.workspace_config.default_workspace:null}}}async function Yl(t,e){try{let n=await(await fetch("/api/config")).json();t.setState({config:n})}catch(r){e("config refresh failed",r)}}var Yn=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],Vo=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"]],Ko="worker:queue",Zo="ui:order",Xo="ui:display-policy",yt="tab:board:closed",Qo="beads-ui.board.closed-range";function Vl(t){let e=ye("main");e("bootstrap start");let r=p`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;de(r,t);let n=document.getElementById("top-nav"),s=document.getElementById("board-root"),o=document.getElementById("worker-root"),i=document.getElementById("detail-panel");if(s&&o&&i){let b=function(m,k){let Y="Request failed",j="";if(m&&typeof m=="object"){let be=m;if(typeof be.message=="string"&&be.message.length>0&&(Y=be.message),typeof be.details=="string")j=be.details;else if(be.details&&typeof be.details=="object")try{j=JSON.stringify(be.details,null,2)}catch{j=""}}else typeof m=="string"&&m.length>0&&(Y=m);let J=k&&k.length>0?`Failed to load ${k}`:"Request failed";x.open(J,Y,j)},ae=function(m){return`${T.getState().workspace.current?.path||""}\0${m}`},Fe=function(){qe&&(qe().catch(()=>{}),qe=null),ve=null,Ae=null},Ce=function(m){Qe=m;let k=()=>{Qe!==m||T.getState().selected_id!==m||(Qe=null,rt(m))};if(!he){ot.then(k);return}k()},et=function(){let m=is(Ue);return m===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:m}}},Ie=function(m){if(m)for(let[k,Y]of Yn){if(Le.has(k)||$e.has(k))continue;let j=k===yt?et():{type:Y};try{K.register(k,j)}catch(J){e("register %s store failed: %o",k,J)}$e.add(k),z.subscribeList(k,j).then(J=>{Le.set(k,J)}).catch(J=>{e("subscribe %s failed: %o",k,J),b(J,"board")}).finally(()=>{$e.delete(k)})}else De()},De=function(){for(let[m]of Yn){let k=Le.get(m);k&&(k().catch(()=>{}),Le.delete(m));try{K.unregister(m)}catch(Y){e("unregister %s failed: %o",m,Y)}}},Oe=function(m){if(!m){He();return}for(let[k,Y]of Vo)if(!(ce.has(k)||$e.has(k))){try{K.register(k,{type:Y})}catch(j){e("register %s store failed: %o",k,j)}$e.add(k),z.subscribeList(k,{type:Y}).then(j=>{ce.set(k,j)}).catch(j=>{e("subscribe %s failed: %o",k,j),b(j,"worker")}).finally(()=>{$e.delete(k)})}xe||(N("subscribe-worker-queue",{id:Ko}).catch(k=>{e("subscribe-worker-queue failed: %o",k)}),xe=()=>N("unsubscribe-worker-queue",{id:Ko}))},He=function(){for(let[m]of Vo){let k=ce.get(m);k&&(k().catch(()=>{}),ce.delete(m));try{K.unregister(m)}catch(Y){e("unregister %s failed: %o",m,Y)}}xe&&(xe().catch(()=>{}),xe=null)},tt=function(){Me||(N("subscribe-ui-order",{id:Zo}).catch(m=>{e("subscribe-ui-order failed: %o",m)}),Me=()=>N("unsubscribe-ui-order",{id:Zo}))},it=function(){Me&&(Me().catch(()=>{}),Me=null),oe.clear()},Ne=function(){me||(N("subscribe-display-policy",{id:Xo}).catch(m=>{e("subscribe-display-policy failed: %o",m)}),me=()=>N("unsubscribe-display-policy",{id:Xo}))},Pe=function(){me&&(me().catch(()=>{}),me=null),ee.clear()},d=function(m){if(!m)return"Unknown";let k=m.split("/").filter(Boolean);return k.length>0?k[k.length-1]:"Unknown"};var c=b,a=ae,u=Fe,h=Ce,g=et,w=Ie,$=De,y=Oe,C=He,M=tt,P=it,B=Ne,q=Pe,D=d;let A=document.getElementById("header-loading"),S=Cs(A),x=Eo(t),O=Yo(),N=S.wrapSend((m,k)=>O.send(m,k)),z=vs(N),K=$s(),ke=Ss(),oe=xs(),ee=as(),Xe=ls();O.on("ui-order-snapshot",m=>{let k=m;if(k&&typeof k.revision=="number")try{oe.set({revision:k.revision,order:k.order&&typeof k.order=="object"?k.order:{}})}catch{}}),O.on("display-policy-snapshot",m=>{let k=m;if(k&&k.policy&&typeof k.policy=="object")try{ee.set(k.policy)}catch{}}),O.on("session-log-snapshot",m=>{let k=m;if(k&&typeof k.attempt_id=="string")try{Xe.set(k.attempt_id,Array.isArray(k.lines)?k.lines:[])}catch{}}),O.on("session-log-append",m=>{let k=m;if(k&&typeof k.attempt_id=="string")try{Xe.append(k.attempt_id,k.event)}catch{}}),O.on("snapshot",m=>{let k=m,Y=k&&typeof k.id=="string"?k.id:"",j=Y?K.getStore(Y):null;if(j&&k&&k.type==="snapshot")try{j.applyPush(k)}catch{}}),O.on("upsert",m=>{let k=m,Y=k&&typeof k.id=="string"?k.id:"",j=Y?K.getStore(Y):null;if(j&&k&&k.type==="upsert")try{j.applyPush(k)}catch{}}),O.on("delete",m=>{let k=m,Y=k&&typeof k.id=="string"?k.id:"",j=Y?K.getStore(Y):null;if(j&&k&&k.type==="delete")try{j.applyPush(k)}catch{}});let qe=null,ve=null,Ae=null,Qe=null,fe=()=>{},ot=new Promise(m=>{fe=()=>m(void 0)}),he=!1,Je=!1;async function rt(m){let k=ae(m);if(k===ve||k===Ae)return;Ae=k;let Y=`detail:${m}`,j={type:"issue-detail",params:{id:m}};try{K.register(Y,j)}catch(J){e("register detail store failed: %o",J)}try{let J=await z.subscribeList(Y,j);if(T.getState().selected_id!==m||ae(m)!==k){await J().catch(()=>{});return}qe&&await qe().catch(()=>{}),qe=J,ve=k}catch(J){e("detail subscribe failed: %o",J),b(J,"issue details")}finally{Ae===k&&(Ae=null)}}let Le=new Map,$e=new Set,Ue=wr;try{let m=window.localStorage.getItem(Qo);tn(m)&&(Ue=m)}catch{}async function ze(m){if(!tn(m)||m===Ue)return;Ue=m;try{window.localStorage.setItem(Qo,m)}catch{}let k=Le.get(yt);if(!k)return;Le.delete(yt),await k().catch(()=>{});let Y=et();try{K.register(yt,Y)}catch(j){e("register %s store failed: %o",yt,j)}try{let j=await z.subscribeList(yt,Y);Le.set(yt,j)}catch(j){e("re-subscribe %s failed: %o",yt,j),b(j,"board")}}let ce=new Map,xe=null,Me=null,me=null;async function Re(){me=null,ee.clear(),xe=null;let m=T.getState().workspace.current?.path;if(m)try{await O.send("set-workspace",{path:m})}catch(k){e("workspace restore after reconnect failed: %o",k);return}Ne(),Oe(T.getState().view==="worker")}async function R(){e("clearing all subscriptions for workspace switch"),De(),He(),ke.clear(),it(),tt(),Pe(),Ne(),Fe();let m=T.getState();if(m.selected_id)try{K.unregister(`detail:${m.selected_id}`)}catch{}let k=T.getState();Ie(k.view==="board"),Oe(k.view==="worker"),k.selected_id&&Ce(k.selected_id)}async function I(m){e("requesting workspace switch to %s",m),Je=!0;try{let k=await O.send("set-workspace",{path:m});e("workspace switch result: %o",k),k&&k.workspace&&(T.setState({workspace:{current:{path:k.workspace.root_dir,database:k.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",m),k.changed&&(await R(),Z("Switched to "+d(m),"success",2e3)))}catch(k){throw e("workspace switch failed: %o",k),Z("Failed to switch workspace","error",3e3),k}finally{Je=!1}}async function X(m){e("requesting workspace git pull for %s",m);try{let k=await O.send("git-pull-workspace",{});e("workspace git pull result: %o",k);let Y=k?.status;if(Y==="up_to_date"){Z("Already up to date","success",2e3);return}if(Y==="stash_pop_conflict"){Z("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}Z("Git pulled "+d(m),"success",2e3)}catch(k){e("workspace git pull failed: %o",k);let Y=k?.code,j=k?.message;if(Y==="rebase_conflict"){Z("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(Y==="rebase_conflict_abort_failed"){Z("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(Y==="busy"){Z("Git pull skipped: another operation is running","warning",3e3);return}let J=j?`: ${j}`:"";throw Z(`Git pull failed${J}`,"error",3e3),k}}async function V(m,k){e("setting workspace visibility %s \u2192 %s",m,String(k));try{await O.send("set-workspace-visibility",{path:m,visible:k}),await l()}catch(Y){e("workspace visibility update failed: %o",Y),Z("Failed to update project visibility","error",3e3)}}async function l(){try{let m=await O.send("list-workspaces",{});if(e("workspaces loaded: %o",m),m&&Array.isArray(m.workspaces)){let k=m.workspaces.map(be=>({path:be.path,database:be.database,pid:be.pid,version:be.version})),Y=m.current?{path:m.current.root_dir,database:m.current.db_path}:null,j=Array.isArray(m.hidden)?m.hidden.filter(be=>typeof be=="string"):[];T.setState({workspace:{current:Y,available:k,hidden:j}});let J=window.localStorage.getItem("beads-ui.workspace");J&&(!k.some(Ot=>Ot.path===J)||j.includes(J)?window.localStorage.removeItem("beads-ui.workspace"):Y&&J!==Y.path&&(e("restoring saved workspace preference: %s",J),await I(J)))}}catch(m){e("failed to load workspaces: %o",m)}}O.on("workspace-changed",m=>{e("workspace-changed event: %o",m),m&&m.root_dir&&(T.setState({workspace:{current:{path:m.root_dir,database:m.db_path}}}),l(),R())});let _=!1;if(typeof O.onConnection=="function"){let m=k=>{e("ws state %s",k),k==="reconnecting"||k==="closed"?(_=!0,Z("Connection lost. Reconnecting\u2026","error",4e3)):k==="open"&&_&&(_=!1,Z("Reconnected","success",2200),Yl(T,(Y,j)=>{e(`${Y}: %o`,j)}),Re())};O.onConnection(m)}let v="board";try{let m=window.localStorage.getItem("beads-ui.view");(m==="board"||m==="worker")&&(v=m)}catch(m){e("view parse error: %o",m)}let T=Es({config:jl(),view:v});O.on("worker-queue-snapshot",m=>{let k=m;if(!k||!k.queue)return;let Y=T.getState().workspace.current?.path;if(typeof Y=="string"&&Y.length>0&&k.root_dir!==Y){e("dropping worker-queue snapshot for %s",String(k.root_dir));return}try{ke.set(k.queue)}catch{}});let G=Ts(T);G.start();let Q=async(m,k)=>{try{return await N(m,k)}catch{return[]}};n&&Co(n,T,G);let F=document.getElementById("workspace-picker");F&&Wo(F,T,I,X,V);let ue=Do(t,(m,k)=>N(m,k));try{let m=document.getElementById("new-issue-btn");m&&m.addEventListener("click",()=>ue.open())}catch{}let at=Ao(t,{policyStore:ee,transport:(m,k)=>N(m,k),labelOptions:()=>{let m=new Set;for(let[k]of Yn)for(let Y of K.snapshotFor(k)||[]){let j=Y.labels;if(Array.isArray(j))for(let J of j)typeof J=="string"&&J.length>0&&m.add(J)}return Array.from(m).sort()}});try{let m=document.getElementById("display-settings-btn");m&&m.addEventListener("click",()=>at.open())}catch{}let nt=Ns(s,{gotoIssue:m=>G.gotoIssue(m),issueStores:K,transport:Q,uiOrderStore:oe,displayPolicyStore:ee,closedRange:Ue,onClosedRangeChange:m=>{ze(m)},onNewIssue:()=>ue.open()}),ft=Wn(o,{transport:Q,issueStores:K,queueStore:ke,sessionLogStore:Xe,uiOrderStore:oe,gotoIssue:m=>T.setState({selected_id:m}),getWorkspacePath:()=>T.getState().workspace.current?.path}),Ke=So(i,{issueStores:K,transport:Q,queueStore:ke,sessionLogStore:Xe,getWorkspacePath:()=>T.getState().workspace.current?.path,onNavigate:m=>{T.getState().view==="worker"?T.setState({selected_id:m}):G.gotoIssue(m)},onClose:()=>{let m=T.getState();T.setState({selected_id:null});try{G.gotoView(m.view==="worker"?"worker":"board")}catch{}}}),te=T.getState().selected_id;te&&(i.hidden=!1,Ke.load(te),Ce(te)),T.subscribe(m=>{let k=m.selected_id;k?(i.hidden=!1,Ke.load(k),Je||Ce(k)):(Ke.clear(),i.hidden=!0,Fe())});let _e=m=>{s.hidden=m.view!=="board",o.hidden=m.view!=="worker",Ie(m.view==="board"),Oe(m.view==="worker"),!m.selected_id&&m.view==="board"&&nt.load(),m.view==="worker"&&ft.load(),window.localStorage.setItem("beads-ui.view",m.view)};T.subscribe(_e),_e(T.getState()),tt(),Ne(),l().finally(()=>{he=!0,fe()}),window.addEventListener("keydown",m=>{let k=m.ctrlKey||m.metaKey,Y=String(m.key||"").toLowerCase(),j=m.target,J=j&&j.tagName?String(j.tagName).toLowerCase():"",be=J==="input"||J==="textarea"||J==="select"||j&&typeof j.isContentEditable=="boolean"&&j.isContentEditable;k&&Y==="n"&&(be||(m.preventDefault(),ue.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let r=window.localStorage.getItem("beads-ui.theme"),n=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=r==="dark"||r==="light"?r:n?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let t=document.getElementById("theme-switch");t&&t.addEventListener("change",()=>{let r=t.checked?"dark":"light";document.documentElement.setAttribute("data-theme",r),window.localStorage.setItem("beads-ui.theme",r)});let e=document.getElementById("app");e&&Vl(e)});export{Vl as bootstrap,jl as readBootstrapConfig,Yl as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
