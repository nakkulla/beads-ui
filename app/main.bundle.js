var Jo=Object.create;var Wr=Object.defineProperty;var ei=Object.getOwnPropertyDescriptor;var ti=Object.getOwnPropertyNames;var ri=Object.getPrototypeOf,ni=Object.prototype.hasOwnProperty;var si=(t,e,r)=>e in t?Wr(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r;var Gr=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports);var oi=(t,e,r,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of ti(e))!ni.call(t,s)&&s!==r&&Wr(t,s,{get:()=>e[s],enumerable:!(n=ei(e,s))||n.enumerable});return t};var ii=(t,e,r)=>(r=t!=null?Jo(ri(t)):{},oi(e||!t||!t.__esModule?Wr(r,"default",{value:t,enumerable:!0}):r,t));var ue=(t,e,r)=>si(t,typeof e!="symbol"?e+"":e,r);var ds=Gr((ec,cs)=>{var Mt=1e3,Nt=Mt*60,Pt=Nt*60,St=Pt*24,ui=St*7,pi=St*365.25;cs.exports=function(t,e){e=e||{};var r=typeof t;if(r==="string"&&t.length>0)return fi(t);if(r==="number"&&isFinite(t))return e.long?gi(t):hi(t);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(t))};function fi(t){if(t=String(t),!(t.length>100)){var e=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(t);if(e){var r=parseFloat(e[1]),n=(e[2]||"ms").toLowerCase();switch(n){case"years":case"year":case"yrs":case"yr":case"y":return r*pi;case"weeks":case"week":case"w":return r*ui;case"days":case"day":case"d":return r*St;case"hours":case"hour":case"hrs":case"hr":case"h":return r*Pt;case"minutes":case"minute":case"mins":case"min":case"m":return r*Nt;case"seconds":case"second":case"secs":case"sec":case"s":return r*Mt;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r;default:return}}}}function hi(t){var e=Math.abs(t);return e>=St?Math.round(t/St)+"d":e>=Pt?Math.round(t/Pt)+"h":e>=Nt?Math.round(t/Nt)+"m":e>=Mt?Math.round(t/Mt)+"s":t+"ms"}function gi(t){var e=Math.abs(t);return e>=St?wr(t,e,St,"day"):e>=Pt?wr(t,e,Pt,"hour"):e>=Nt?wr(t,e,Nt,"minute"):e>=Mt?wr(t,e,Mt,"second"):t+" ms"}function wr(t,e,r,n){var s=e>=r*1.5;return Math.round(t/r)+" "+n+(s?"s":"")}});var ps=Gr((tc,us)=>{function mi(t){r.debug=r,r.default=r,r.coerce=a,r.disable=i,r.enable=s,r.enabled=l,r.humanize=ds(),r.destroy=d,Object.keys(t).forEach(h=>{r[h]=t[h]}),r.names=[],r.skips=[],r.formatters={};function e(h){let _=0;for(let k=0;k<h.length;k++)_=(_<<5)-_+h.charCodeAt(k),_|=0;return r.colors[Math.abs(_)%r.colors.length]}r.selectColor=e;function r(h){let _,k=null,$,v;function L(...P){if(!L.enabled)return;let B=L,q=Number(new Date),G=q-(_||q);B.diff=G,B.prev=_,B.curr=q,_=q,P[0]=r.coerce(P[0]),typeof P[0]!="string"&&P.unshift("%O");let N=0;P[0]=P[0].replace(/%([a-zA-Z%])/g,(C,x)=>{if(C==="%%")return"%";N++;let m=r.formatters[x];if(typeof m=="function"){let O=P[N];C=m.call(B,O),P.splice(N,1),N--}return C}),r.formatArgs.call(B,P),(B.log||r.log).apply(B,P)}return L.namespace=h,L.useColors=r.useColors(),L.color=r.selectColor(h),L.extend=n,L.destroy=r.destroy,Object.defineProperty(L,"enabled",{enumerable:!0,configurable:!1,get:()=>k!==null?k:($!==r.namespaces&&($=r.namespaces,v=r.enabled(h)),v),set:P=>{k=P}}),typeof r.init=="function"&&r.init(L),L}function n(h,_){let k=r(this.namespace+(typeof _>"u"?":":_)+h);return k.log=this.log,k}function s(h){r.save(h),r.namespaces=h,r.names=[],r.skips=[];let _=(typeof h=="string"?h:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let k of _)k[0]==="-"?r.skips.push(k.slice(1)):r.names.push(k)}function o(h,_){let k=0,$=0,v=-1,L=0;for(;k<h.length;)if($<_.length&&(_[$]===h[k]||_[$]==="*"))_[$]==="*"?(v=$,L=k,$++):(k++,$++);else if(v!==-1)$=v+1,L++,k=L;else return!1;for(;$<_.length&&_[$]==="*";)$++;return $===_.length}function i(){let h=[...r.names,...r.skips.map(_=>"-"+_)].join(",");return r.enable(""),h}function l(h){for(let _ of r.skips)if(o(h,_))return!1;for(let _ of r.names)if(o(h,_))return!0;return!1}function a(h){return h instanceof Error?h.stack||h.message:h}function d(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return r.enable(r.load()),r}us.exports=mi});var fs=Gr((We,kr)=>{We.formatArgs=bi;We.save=wi;We.load=ki;We.useColors=_i;We.storage=yi();We.destroy=(()=>{let t=!1;return()=>{t||(t=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();We.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function _i(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let t;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(t=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(t[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function bi(t){if(t[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+t[0]+(this.useColors?"%c ":" ")+"+"+kr.exports.humanize(this.diff),!this.useColors)return;let e="color: "+this.color;t.splice(1,0,e,"color: inherit");let r=0,n=0;t[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(r++,s==="%c"&&(n=r))}),t.splice(n,0,e)}We.log=console.debug||console.log||(()=>{});function wi(t){try{t?We.storage.setItem("debug",t):We.storage.removeItem("debug")}catch{}}function ki(){let t;try{t=We.storage.getItem("debug")||We.storage.getItem("DEBUG")}catch{}return!t&&typeof process<"u"&&"env"in process&&(t=process.env.DEBUG),t}function yi(){try{return localStorage}catch{}}kr.exports=ps()(We);var{formatters:vi}=kr.exports;vi.j=function(t){try{return JSON.stringify(t)}catch(e){return"[UnexpectedJSONParseError]: "+e.message}}});var Kt=globalThis,_r=Kt.trustedTypes,Kn=_r?_r.createPolicy("lit-html",{createHTML:t=>t}):void 0,ts="$lit$",pt=`lit$${Math.random().toFixed(9).slice(2)}$`,rs="?"+pt,ai=`<${rs}>`,$t=document,Zt=()=>$t.createComment(""),Xt=t=>t===null||typeof t!="object"&&typeof t!="function",Qr=Array.isArray,li=t=>Qr(t)||typeof t?.[Symbol.iterator]=="function",jr=`[ 	
\f\r]`,Vt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Zn=/-->/g,Xn=/>/g,yt=RegExp(`>|${jr}(?:([^\\s"'>=/]+)(${jr}*=${jr}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Qn=/'/g,Jn=/"/g,ns=/^(?:script|style|textarea|title)$/i,Jr=t=>(e,...r)=>({_$litType$:t,strings:e,values:r}),u=Jr(1),Vl=Jr(2),Kl=Jr(3),xt=Symbol.for("lit-noChange"),ve=Symbol.for("lit-nothing"),es=new WeakMap,vt=$t.createTreeWalker($t,129);function ss(t,e){if(!Qr(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return Kn!==void 0?Kn.createHTML(e):e}var ci=(t,e)=>{let r=t.length-1,n=[],s,o=e===2?"<svg>":e===3?"<math>":"",i=Vt;for(let l=0;l<r;l++){let a=t[l],d,h,_=-1,k=0;for(;k<a.length&&(i.lastIndex=k,h=i.exec(a),h!==null);)k=i.lastIndex,i===Vt?h[1]==="!--"?i=Zn:h[1]!==void 0?i=Xn:h[2]!==void 0?(ns.test(h[2])&&(s=RegExp("</"+h[2],"g")),i=yt):h[3]!==void 0&&(i=yt):i===yt?h[0]===">"?(i=s??Vt,_=-1):h[1]===void 0?_=-2:(_=i.lastIndex-h[2].length,d=h[1],i=h[3]===void 0?yt:h[3]==='"'?Jn:Qn):i===Jn||i===Qn?i=yt:i===Zn||i===Xn?i=Vt:(i=yt,s=void 0);let $=i===yt&&t[l+1].startsWith("/>")?" ":"";o+=i===Vt?a+ai:_>=0?(n.push(d),a.slice(0,_)+ts+a.slice(_)+pt+$):a+pt+(_===-2?l:$)}return[ss(t,o+(t[r]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),n]},Qt=class t{constructor({strings:e,_$litType$:r},n){let s;this.parts=[];let o=0,i=0,l=e.length-1,a=this.parts,[d,h]=ci(e,r);if(this.el=t.createElement(d,n),vt.currentNode=this.el.content,r===2||r===3){let _=this.el.content.firstChild;_.replaceWith(..._.childNodes)}for(;(s=vt.nextNode())!==null&&a.length<l;){if(s.nodeType===1){if(s.hasAttributes())for(let _ of s.getAttributeNames())if(_.endsWith(ts)){let k=h[i++],$=s.getAttribute(_).split(pt),v=/([.?@])?(.*)/.exec(k);a.push({type:1,index:o,name:v[2],strings:$,ctor:v[1]==="."?Vr:v[1]==="?"?Kr:v[1]==="@"?Zr:Ot}),s.removeAttribute(_)}else _.startsWith(pt)&&(a.push({type:6,index:o}),s.removeAttribute(_));if(ns.test(s.tagName)){let _=s.textContent.split(pt),k=_.length-1;if(k>0){s.textContent=_r?_r.emptyScript:"";for(let $=0;$<k;$++)s.append(_[$],Zt()),vt.nextNode(),a.push({type:2,index:++o});s.append(_[k],Zt())}}}else if(s.nodeType===8)if(s.data===rs)a.push({type:2,index:o});else{let _=-1;for(;(_=s.data.indexOf(pt,_+1))!==-1;)a.push({type:7,index:o}),_+=pt.length-1}o++}}static createElement(e,r){let n=$t.createElement("template");return n.innerHTML=e,n}};function Dt(t,e,r=t,n){if(e===xt)return e;let s=n!==void 0?r._$Co?.[n]:r._$Cl,o=Xt(e)?void 0:e._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(t),s._$AT(t,r,n)),n!==void 0?(r._$Co??(r._$Co=[]))[n]=s:r._$Cl=s),s!==void 0&&(e=Dt(t,s._$AS(t,e.values),s,n)),e}var Yr=class{constructor(e,r){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:r},parts:n}=this._$AD,s=(e?.creationScope??$t).importNode(r,!0);vt.currentNode=s;let o=vt.nextNode(),i=0,l=0,a=n[0];for(;a!==void 0;){if(i===a.index){let d;a.type===2?d=new Jt(o,o.nextSibling,this,e):a.type===1?d=new a.ctor(o,a.name,a.strings,this,e):a.type===6&&(d=new Xr(o,this,e)),this._$AV.push(d),a=n[++l]}i!==a?.index&&(o=vt.nextNode(),i++)}return vt.currentNode=$t,s}p(e){let r=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(e,n,r),r+=n.strings.length-2):n._$AI(e[r])),r++}},Jt=class t{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,r,n,s){this.type=2,this._$AH=ve,this._$AN=void 0,this._$AA=e,this._$AB=r,this._$AM=n,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,r=this._$AM;return r!==void 0&&e?.nodeType===11&&(e=r.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,r=this){e=Dt(this,e,r),Xt(e)?e===ve||e==null||e===""?(this._$AH!==ve&&this._$AR(),this._$AH=ve):e!==this._$AH&&e!==xt&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):li(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==ve&&Xt(this._$AH)?this._$AA.nextSibling.data=e:this.T($t.createTextNode(e)),this._$AH=e}$(e){let{values:r,_$litType$:n}=e,s=typeof n=="number"?this._$AC(e):(n.el===void 0&&(n.el=Qt.createElement(ss(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===s)this._$AH.p(r);else{let o=new Yr(s,this),i=o.u(this.options);o.p(r),this.T(i),this._$AH=o}}_$AC(e){let r=es.get(e.strings);return r===void 0&&es.set(e.strings,r=new Qt(e)),r}k(e){Qr(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,n,s=0;for(let o of e)s===r.length?r.push(n=new t(this.O(Zt()),this.O(Zt()),this,this.options)):n=r[s],n._$AI(o),s++;s<r.length&&(this._$AR(n&&n._$AB.nextSibling,s),r.length=s)}_$AR(e=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);e!==this._$AB;){let n=e.nextSibling;e.remove(),e=n}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},Ot=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,r,n,s,o){this.type=1,this._$AH=ve,this._$AN=void 0,this.element=e,this.name=r,this._$AM=s,this.options=o,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=ve}_$AI(e,r=this,n,s){let o=this.strings,i=!1;if(o===void 0)e=Dt(this,e,r,0),i=!Xt(e)||e!==this._$AH&&e!==xt,i&&(this._$AH=e);else{let l=e,a,d;for(e=o[0],a=0;a<o.length-1;a++)d=Dt(this,l[n+a],r,a),d===xt&&(d=this._$AH[a]),i||(i=!Xt(d)||d!==this._$AH[a]),d===ve?e=ve:e!==ve&&(e+=(d??"")+o[a+1]),this._$AH[a]=d}i&&!s&&this.j(e)}j(e){e===ve?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},Vr=class extends Ot{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===ve?void 0:e}},Kr=class extends Ot{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==ve)}},Zr=class extends Ot{constructor(e,r,n,s,o){super(e,r,n,s,o),this.type=5}_$AI(e,r=this){if((e=Dt(this,e,r,0)??ve)===xt)return;let n=this._$AH,s=e===ve&&n!==ve||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,o=e!==ve&&(n===ve||s);s&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},Xr=class{constructor(e,r,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=r,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){Dt(this,e)}};var di=Kt.litHtmlPolyfillSupport;di?.(Qt,Jt),(Kt.litHtmlVersions??(Kt.litHtmlVersions=[])).push("3.3.1");var le=(t,e,r)=>{let n=r?.renderBefore??e,s=n._$litPart$;if(s===void 0){let o=r?.renderBefore??null;n._$litPart$=s=new Jt(e.insertBefore(Zt(),o),o,void 0,r??{})}return s._$AI(t),s};var br="today",os=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}];function en(t){return t==="today"||t==="7d"||t==="30d"||t==="all"}function is(t,e=Date.now()){switch(t){case"today":{let r=new Date(e);return r.setHours(0,0,0,0),r.getTime()}case"7d":return e-7*864e5;case"30d":return e-30*864e5;case"all":default:return}}function as(){let t=null,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{get(){return t},set(n){t=n,r()},clear(){t=null,r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}function ls(){let t=new Map,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{set(n,s){t.set(n,{lines:Array.isArray(s)?[...s]:[]}),r()},append(n,s){let o=t.get(n)||{lines:[]};o.lines=[...o.lines,s],t.set(n,o),r()},get(n){return t.get(n)||null},clear(n){typeof n=="string"?t.delete(n):t.clear(),r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}var hs=ii(fs(),1);function we(t){return(0,hs.default)(`beads-ui:${t}`)}function st(t){if(typeof t=="number")return Number.isFinite(t)?t:0;if(typeof t=="string"){let e=Date.parse(t);return Number.isFinite(e)?e:0}return 0}function Tt(t,e){let r=st(t.created_at),n=st(e.created_at);if(r!==n)return r<n?1:-1;let s=t.priority??2,o=e.priority??2;if(s!==o)return s-o;let i=t.id,l=e.id;return i<l?-1:i>l?1:0}function _s(t,e){let r=st(t.created_at),n=st(e.created_at);if(r!==n)return r<n?-1:1;let s=t.priority??2,o=e.priority??2;if(s!==o)return s-o;let i=t.id,l=e.id;return i<l?-1:i>l?1:0}function bs(t,e){let r=st(t.updated_at),n=st(e.updated_at);if(r!==n)return r<n?1:-1;let s=t.id,o=e.id;return s<o?-1:s>o?1:0}function ws(t,e){let r=t.priority??2,n=e.priority??2;if(r!==n)return r-n;let s=st(t.created_at),o=st(e.created_at);if(s!==o)return s<o?1:-1;let i=t.id,l=e.id;return i<l?-1:i>l?1:0}function ks(t,e){let r=t.closed_at??0,n=e.closed_at??0;if(r!==n)return r<n?1:-1;let s=t?.id,o=e?.id;return s<o?-1:s>o?1:0}var $i=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function gs(t){let e=t&&t.metadata,r=e?e.task_order:void 0;if(r==null||r==="")return Number.POSITIVE_INFINITY;let n=Number(r);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function ms(t){let e=t&&t.title;if(typeof e!="string")return Number.POSITIVE_INFINITY;let r=$i.exec(e);if(!r)return Number.POSITIVE_INFINITY;let n=Number(r[1]);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function ys(t,e){let r=gs(t),n=gs(e);if(r!==n)return r<n?-1:1;let s=ms(t),o=ms(e);if(s!==o)return s<o?-1:1;let i=st(t&&t.created_at),l=st(e&&e.created_at);if(i!==l)return i<l?-1:1;let a=t&&t.id,d=e&&e.id;return a===d?0:String(a)<String(d)?-1:1}var tn=2**20;function Ft(t,e){let r=t&&t.id;return e&&typeof r=="string"&&Object.prototype.hasOwnProperty.call(e,r)&&typeof e[r]=="number"&&Number.isFinite(e[r])?e[r]:-st(t&&t.created_at)}function yr(t){return(e,r)=>{let n=Ft(e,t),s=Ft(r,t);if(n!==s)return n<s?-1:1;let o=e?.id,i=r?.id;return o<i?-1:o>i?1:0}}function rn(t,e,r){let n=Array.isArray(t)?t:[],s=n.length,o=Math.max(0,Math.min(e,s-1)),i=o-1>=0?n[o-1]:null,l=o+1<s?n[o+1]:null;if(!i&&!l)return{rank:0};if(!i)return{rank:Ft(l,r)-tn};if(!l)return{rank:Ft(i,r)+tn};let a=Ft(i,r),d=Ft(l,r),h=(a+d)/2;return a<h&&h<d?{rank:h}:{renormalize:n.map((_,k)=>({bead_id:_.id,rank:k*tn}))}}function nn(t,e={}){let r=we(`issue-store:${t}`),n=new Map,s=[],o=0,i=new Set,l=!1,a=e.sort||Tt;function d(){for(let k of Array.from(i))try{k()}catch{}}function h(){s=Array.from(n.values()).sort(a)}function _(k){if(l||!k||k.id!==t)return;let $=Number(k.revision)||0;if(r("apply %s rev=%d",k.type,$),!($<=o&&k.type!=="snapshot")){if(k.type==="snapshot"){if($<=o)return;n.clear();let v=Array.isArray(k.issues)?k.issues:[];for(let L of v)L&&typeof L.id=="string"&&L.id.length>0&&n.set(L.id,L);h(),o=$,d();return}if(k.type==="upsert"){let v=k.issue;if(v&&typeof v.id=="string"&&v.id.length>0){let L=n.get(v.id);if(!L)n.set(v.id,v);else{let P=Number.isFinite(L.updated_at)?L.updated_at:0,B=Number.isFinite(v.updated_at)?v.updated_at:0;if(P<=B){for(let q of Object.keys(L))q in v||delete L[q];for(let[q,G]of Object.entries(v))L[q]=G}}h()}o=$,d()}else if(k.type==="delete"){let v=String(k.issue_id||"");v&&(n.delete(v),h()),o=$,d()}}}return{id:t,subscribe(k){return i.add(k),()=>{i.delete(k)}},applyPush:_,snapshot(){return s},size(){return n.size},getById(k){return n.get(k)},dispose(){l=!0,n.clear(),s=[],i.clear(),o=0}}}function vr(t){let e=String(t.type||"").trim(),r={};if(t.params&&typeof t.params=="object"){let s=Object.keys(t.params).sort();for(let o of s){let i=t.params[o];r[o]=String(i)}}let n=new URLSearchParams(r).toString();return n.length>0?`${e}?${n}`:e}function vs(t){let e=we("subs"),r=new Map,n=new Map;function s(l,a){e("applyDelta %s +%d ~%d -%d",l,(a.added||[]).length,(a.updated||[]).length,(a.removed||[]).length);let d=n.get(l);if(!d||d.size===0)return;let h=Array.isArray(a.added)?a.added:[],_=Array.isArray(a.updated)?a.updated:[],k=Array.isArray(a.removed)?a.removed:[];for(let $ of Array.from(d)){let v=r.get($);if(!v)continue;let L=v.itemsById;for(let P of h)typeof P=="string"&&P.length>0&&L.set(P,!0);for(let P of _)typeof P=="string"&&P.length>0&&L.set(P,!0);for(let P of k)typeof P=="string"&&P.length>0&&L.delete(P)}}async function o(l,a){let d=vr(a);if(e("subscribe %s key=%s",l,d),!r.has(l))r.set(l,{key:d,itemsById:new Map});else{let _=r.get(l);if(_&&_.key!==d){let k=n.get(_.key);k&&(k.delete(l),k.size===0&&n.delete(_.key)),r.set(l,{key:d,itemsById:new Map})}}n.has(d)||n.set(d,new Set);let h=n.get(d);h&&h.add(l);try{await t("subscribe-list",{id:l,type:a.type,params:a.params})}catch(_){let k=r.get(l)||null;if(k){let $=n.get(k.key);$&&($.delete(l),$.size===0&&n.delete(k.key))}throw r.delete(l),_}return async()=>{e("unsubscribe %s key=%s",l,d);try{await t("unsubscribe-list",{id:l})}catch{}let _=r.get(l)||null;if(_){let k=n.get(_.key);k&&(k.delete(l),k.size===0&&n.delete(_.key))}r.delete(l)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:vr,selectors:{getIds(l){let a=r.get(l);return a?Array.from(a.itemsById.keys()):[]},has(l,a){let d=r.get(l);return d?d.itemsById.has(a):!1},count(l){let a=r.get(l);return a?a.itemsById.size:0},getItemsById(l){let a=r.get(l),d={};if(!a)return d;for(let h of a.itemsById.keys())d[h]=!0;return d}}}}function $s(){let t=we("issue-stores"),e=new Map,r=new Map,n=new Set,s=new Map;function o(){for(let a of Array.from(n))try{a()}catch{}}function i(a,d,h){let _=d?vr(d):"",k=r.get(a)||"",$=e.has(a);if(t("register %s key=%s (prev=%s)",a,_,k),$&&k&&_&&k!==_){let v=e.get(a);if(v)try{v.dispose()}catch{}let L=s.get(a);if(L){try{L()}catch{}s.delete(a)}let P=nn(a,h);e.set(a,P);let B=P.subscribe(()=>o());s.set(a,B)}else if(!$){let v=nn(a,h);e.set(a,v);let L=v.subscribe(()=>o());s.set(a,L)}return r.set(a,_),()=>l(a)}function l(a){t("unregister %s",a),r.delete(a);let d=e.get(a);d&&(d.dispose(),e.delete(a));let h=s.get(a);if(h){try{h()}catch{}s.delete(a)}}return{register:i,unregister:l,getStore(a){return e.get(a)||null},snapshotFor(a){let d=e.get(a);return d?d.snapshot().slice():[]},subscribe(a){return n.add(a),()=>n.delete(a)}}}function xs(){let t=null,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{get(){return t},set(n){t=n,r()},clear(){t=null,r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}function Ss(){let t=null,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{get(){return t},set(n){t=n,r()},clear(){t=null,r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}function sn(t,e){return`#/${t==="worker"?"worker":"board"}?issue=${encodeURIComponent(e)}`}function xi(t){let e=String(t||""),r=e.startsWith("#")?e.slice(1):e,n=r.indexOf("?"),s=n>=0?r.slice(n+1):"";if(s){let l=new URLSearchParams(s).get("issue");if(l)return decodeURIComponent(l)}let o=/^\/issue\/([^\s?#]+)/.exec(r);return o&&o[1]?decodeURIComponent(o[1]):null}function Si(t){let e=String(t||"");return/^#\/worker(\b|\/|$)/.test(e)?"worker":"board"}function Ts(t){let e=we("router"),r=()=>{let n=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(n),o=s&&s[1]?decodeURIComponent(s[1]):xi(n),i=Si(n);if(e("hash change \u2192 view=%s id=%s",i,o),t.setState({selected_id:i==="worker"?null:o,view:i,worker:{selected_parent_id:i==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(n)){let a=o?`#/${i}?issue=${encodeURIComponent(o)}`:`#/${i}`;window.location.hash!==a&&(window.location.hash=a)}};return{start(){window.addEventListener("hashchange",r),r()},stop(){window.removeEventListener("hashchange",r)},gotoIssue(n){let o=(t.getState?t.getState():{view:"board"}).view==="worker"?"worker":"board",i=sn(o,n);e("goto issue %s (view=%s)",n,o),window.location.hash!==i?window.location.hash=i:t.setState({selected_id:o==="worker"?null:n,view:o,worker:{selected_parent_id:o==="worker"?n:null}})},gotoView(n){let s=t.getState?t.getState():{selected_id:null,worker:{selected_parent_id:null}},o=n==="worker"?s.worker?.selected_parent_id:s.selected_id,i=o?sn(n,o):`#/${n}`;e("goto view %s (id=%s)",n,o||""),window.location.hash!==i?window.location.hash=i:t.setState({view:n,selected_id:n==="worker"?null:s.selected_id})}}}var Ti=Object.freeze({workspace_config:{default_workspace:null}});function As(t){return{workspace_config:{default_workspace:typeof t?.workspace_config?.default_workspace=="string"&&t.workspace_config.default_workspace.length>0?t.workspace_config.default_workspace:Ti.workspace_config.default_workspace}}}function Es(t={}){let e=we("state"),r={selected_id:t.selected_id??null,view:t.view??"board",filters:{status:t.filters?.status??"all",search:t.filters?.search??"",type:typeof t.filters?.type=="string"?t.filters?.type:""},board:{closed_filter:t.board?.closed_filter==="3"||t.board?.closed_filter==="7"||t.board?.closed_filter==="today"?t.board?.closed_filter:"today",show_deferred_column:t.board?.show_deferred_column===!0},worker:{selected_parent_id:t.worker?.selected_parent_id??null,show_closed_children:Array.isArray(t.worker?.show_closed_children)?t.worker.show_closed_children:[]},workspace:{current:t.workspace?.current??null,available:t.workspace?.available??[],hidden:t.workspace?.hidden??[]},config:As(t.config)},n=new Set;function s(){for(let o of Array.from(n))try{o(r)}catch{}}return{getState(){return r},setState(o){let i={...r,...o,filters:{...r.filters,...o.filters||{}},board:{...r.board,...o.board||{}},worker:{...r.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:r.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:r.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:r.workspace.hidden},config:o.config!==void 0?As(o.config):r.config},l=i.workspace.current?.path!==r.workspace.current?.path||i.workspace.available.length!==r.workspace.available.length||i.workspace.hidden.length!==r.workspace.hidden.length||i.workspace.hidden.some((d,h)=>d!==r.workspace.hidden[h]),a=i.config.workspace_config.default_workspace!==r.config.workspace_config.default_workspace;i.selected_id===r.selected_id&&i.view===r.view&&i.filters.status===r.filters.status&&i.filters.search===r.filters.search&&i.filters.type===r.filters.type&&i.board.closed_filter===r.board.closed_filter&&i.board.show_deferred_column===r.board.show_deferred_column&&i.worker.selected_parent_id===r.worker.selected_parent_id&&i.worker.show_closed_children.length===r.worker.show_closed_children.length&&i.worker.show_closed_children.every((d,h)=>d===r.worker.show_closed_children[h])&&!l&&!a||(r=i,e("state change %o",{selected_id:r.selected_id,view:r.view,filters:r.filters,board:r.board,worker:r.worker,workspace:r.workspace.current?.path,config:{default_workspace:r.config.workspace_config.default_workspace}}),s())},subscribe(o){return n.add(o),()=>n.delete(o)}}}function Cs(t){let e=we("activity"),r=0,n=new Map,s=1;function o(){if(!t)return;let d=r>0;t.toggleAttribute("hidden",!d),t.setAttribute("aria-busy",d?"true":"false")}function i(){r+=1,e("start count=%d",r),o()}function l(){let d=r;r=Math.max(0,r-1),d<=0?e("done called but count was already %d",d):e("done count=%d\u2192%d",d,r),o()}function a(d){return async(_,k)=>{let $=s++,v=Date.now();n.set($,{type:_,start_ts:v}),e("request start id=%d type=%s count=%d",$,_,r+1),i();let L=!1,P=()=>{L||(L=!0,n.delete($),l())},B=setTimeout(()=>{L||(e("request TIMEOUT id=%d type=%s elapsed=%dms",$,_,Date.now()-v),P())},3e4);try{let q=await d(_,k),G=Date.now()-v;return e("request done id=%d type=%s elapsed=%dms",$,_,G),q}catch(q){let G=Date.now()-v;throw e("request error id=%d type=%s elapsed=%dms err=%o",$,_,G,q),q}finally{clearTimeout(B),P()}}}return o(),{wrapSend:a,start:i,done:l,getCount:()=>r,getActiveRequests:()=>{let d=Date.now();return Array.from(n.entries()).map(([h,_])=>({id:h,type:_.type,elapsed_ms:d-_.start_ts}))}}}function Q(t,e="info",r=2800){let n=document.createElement("div");n.className="toast",n.textContent=t,n.style.position="fixed",n.style.right="12px",n.style.bottom="12px",n.style.zIndex="1000",n.style.color="#fff",n.style.padding="8px 10px",n.style.borderRadius="4px",n.style.fontSize="12px",e==="success"?n.style.background="#156d36":e==="warning"?n.style.background="#a36a00":e==="error"?n.style.background="#9f2011":n.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(n),setTimeout(()=>{try{n.remove()}catch{}},r)}function $r(t=void 0,e=void 0){function r(){if(!e||typeof e.get!="function")return null;let o=e.get();return o&&o.order?o.order:{}}function n(o,i,l){let a=t&&t.snapshotFor?t.snapshotFor(o).slice():[];if(i==="closed")return a.sort(ks),a;switch(l){case"created_desc":return a.sort(Tt),a;case"created_asc":return a.sort(_s),a;case"updated_desc":return a.sort(bs),a;case"priority":return a.sort(ws),a;case"manual":default:{let d=r();return d?a.sort(yr(d)):a.sort(Tt),a}}}function s(o){let i=[];return t&&typeof t.subscribe=="function"&&i.push(t.subscribe(o)),e&&typeof e.subscribe=="function"&&i.push(e.subscribe(o)),()=>{for(let l of i)try{l()}catch{}}}return{selectBoardColumn:n,subscribe:s}}function xr(t){let e=t.transport,r=t.uiOrderStore;function n(i,l){return"renormalize"in i?i.renormalize:[{bead_id:l,rank:i.rank}]}function s(i,l){let a={...i.order};for(let d of l)a[d.bead_id]=d.rank;r&&r.set({revision:i.revision,order:a})}async function o(i,l,a){if(!e||!r)return;let d=r.get()||{revision:0,order:{}},h=n(rn(l,a,d.order),i);s(d,h);let _=await e("ui-order-set",{expected_revision:d.revision,entries:h});if(_&&_.conflict){let k={revision:typeof _.revision=="number"?_.revision:0,order:_.order||{}};r.set(k);let $=n(rn(l,a,k.order),i);s(k,$);let v=await e("ui-order-set",{expected_revision:k.revision,entries:$});v&&v.applied&&r.set({revision:typeof v.revision=="number"?v.revision:0,order:v.order||{}})}else _&&_.applied&&r.set({revision:typeof _.revision=="number"?_.revision:0,order:_.order||{}})}return{applyReorder:o}}function Sr(t){return Array.isArray(t)?t.filter(e=>typeof e=="string"):[]}function on(t,e){return!e||typeof t!="string"||t.length===0||Sr(e.visible_labels).includes(t)?!0:Sr(e.hidden_labels).includes(t)?!1:!Sr(e.hidden_prefixes).some(r=>r.length>0&&t.startsWith(r))}function Rs(t,e){return Sr(t).filter(r=>on(r,e))}function At(t,e){let r=t&&t.chips?t.chips[e]:void 0;return typeof r=="boolean"?r:!0}function an(t){if(!t)return null;if(typeof t=="number")return Number.isFinite(t)?t:null;let e=Date.parse(t);return Number.isFinite(e)?e:null}function ft(t){let e=an(t);if(e===null)return"";let r=new Date(e),n=s=>String(s).padStart(2,"0");return`${r.getFullYear()}-${n(r.getMonth()+1)}-${n(r.getDate())} ${n(r.getHours())}:${n(r.getMinutes())}`}function ln(t,e){let r=an(t);if(r===null)return"";let s=(typeof e=="number"?e:Date.now())-r;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let i=Math.floor(s/36e5);if(i<24)return`${i}\uC2DC\uAC04 \uC804`;let l=Math.floor(s/864e5);if(l<7)return`${l}\uC77C \uC804`;let a=Math.floor(l/7);if(l<30)return`${a}\uC8FC \uC804`;let d=Math.floor(l/30);return d<12?`${d}\uAC1C\uC6D4 \uC804`:`${Math.floor(l/365)}\uB144 \uC804`}var Ai={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg"},Ei={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge"},Ci={spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},Ri={reviewed:"\u2713",skip:"\u2298",stale:"\u2713"};function Li(t,e,r){if(!(r==="in_progress"||r==="resolved"))return null;for(let s of t)if(e[s]&&e[s].state==="dim")return s;return null}function Ii(t,e,r){let n=Ai[t]||t,s=e&&e.state||"empty",o=Ri[s]||"",i="bar";s==="dim"?i+=` b-${n} dim`:s==="on"||s==="reviewed"||s==="skip"?i+=` b-${n} on`:s==="stale"&&(i+=` b-${n} stale`),r&&(i+=" glow");let l=s==="empty"?"lbl":`lbl l-${n} on`,a=r?`color: var(--stage-${n}-on)`:"";return u`
    <div class="seg">
      <div class=${i} style=${a}>${o}</div>
      <div class=${l}>
        ${Ei[t]||t}
      </div>
    </div>
  `}function Tr(t,e){if(!t||!t.stages)return"";let r=t.route==="full_plan"?"full_plan":"spec_backed",n=Ci[r],s=t.stages,o=Li(n,s,String(e||"open"));return u`
    <div class="stp" role="img" aria-label="워크플로우 진행 스테퍼">
      ${n.map(i=>Ii(i,s[i]||{state:"empty"},i===o))}
    </div>
  `}function Di(t){return typeof t!="number"||!Number.isFinite(t)?"":`P${Math.max(0,Math.min(4,t))}`}var Ls=2;function Oi(t){if(!t)return[];let e=[];if(t.external){let n=t.reason?`\u23F8 blocked: ${t.reason}`:"\u23F8 blocked";e.push(u`<span class="ctl-chip ctl-chip--blocked">${n}</span>`)}let r=Array.isArray(t.blockers)?t.blockers:[];if(r.length>0){let n=r.slice(0,Ls).join(", "),s=r.length-Ls,o=`\u26D3 blocked: ${n}${s>0?` +${s}`:""}`;e.push(u`<span class="ctl-chip ctl-chip--blocked-dep">${o}</span>`)}return e}function Mi(t,e){let r=e.policy||null,n=t.workflow&&t.workflow.chips||{},s=[];if(n.route&&At(r,"route")){let o=n.route_source==="derived";s.push(u`<span
        class="ctl-chip ctl-chip--route${o?" is-derived":""}"
        title=${o?"route \uCD94\uB860\uAC12 (metadata \uBBF8\uD540)":"route"}
        >${o?`${n.route} ?`:n.route}</span
      >`)}if(n.fast_track&&At(r,"fast_track")&&s.push(u`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),n.pr&&At(r,"pr")){let o=n.pr.number;s.push(u`<span class="ctl-chip ctl-chip--pr"
        >${`PR${o!=null?` #${o}`:""}`}</span
      >`)}for(let o of Rs(t.labels,r))s.push(u`<span class="ctl-chip ctl-chip--label">${o}</span>`);return t.from_id&&At(r,"from")&&s.push(u`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${t.from_id} \uC5F4\uAE30`}
        @click=${o=>{o.stopPropagation(),e.onFromChipClick&&e.onFromChipClick(o,String(t.from_id))}}
      >
        ↩ from ${t.from_id}
      </button>`),At(r,"blocked")&&s.push(...Oi(t.blocked_info)),s.length===0?"":u`<div class="board-card__chips">${s}</div>`}function Ni(t){switch(t){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function Pi(t){let e=ln(t.created_at),r=ln(t.updated_at);return!e&&!r?"":u`<span class="board-card__times">
    ${e?u`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${ft(t.created_at)}`}
          >생성 ${e}</span
        >`:""}
    ${e&&r?u`<span class="board-card__time-sep">·</span>`:""}
    ${r?u`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${ft(t.updated_at)}`}
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
      ${t.workflow&&At(e.policy||null,"stepper")?Tr(t.workflow,t.status):""}
      ${Fi(t,e)}
    </article>
  `}function Et(t,e){let r=Array.isArray(t.items)?t.items.length:0,n=t.is_closed===!0;return u`
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
  `}var Hi=200,Wi={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","deferred-col":"deferred","closed-col":"closed"},Gi=new Set(["blocked-col","ready-col","in-progress-col","resolved-col","deferred-col"]),Os="beads-ui.board.sort",Ms=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function ji(){try{let t=window.localStorage.getItem(Os);if(t&&Ms.has(t))return t}catch{}return"created_desc"}function Ns(t,e){let r=we("views:board"),n=e.gotoIssue,s=e.issueStores,o=e.transport,i=e.uiOrderStore,l=e.displayPolicyStore,a=e.onClosedRangeChange,d=e.onNewIssue,h=e.closedRange||br,_=s?$r(s,i):null,k=xr({transport:o,uiOrderStore:i}),$=[],v=[],L=[],P=[],B=[],q=[],G=!1,N=0,E=ji(),C=new Map,x=new Map,m=new Map,O=new Set,F={search:"",priority:"",type:"",labels:[]},H=!1,V=null;function ne(I){return String(I.status||"open")==="open"}function se(I){let M=String(I.status||"open");return M==="open"||M==="blocked"}function $e(I){let M=F.search.trim().toLowerCase(),c=F.priority,f=F.type,y=F.labels;return I.filter(g=>{if(M){let A=String(g.id||"").toLowerCase(),T=String(g.title||"").toLowerCase();if(!A.includes(M)&&!T.includes(M))return!1}if(c!==""&&String(g.priority)!==c||f!==""&&String(g.issue_type||"")!==f)return!1;if(y.length>0){let A=Array.isArray(g.labels)?g.labels:[];if(!y.some(T=>A.includes(T)))return!1}return!0})}function Ge(){let I=new Set;for(let M of[$,v,L,P,B,q])for(let c of M){let f=Array.isArray(c.labels)?c.labels:[];for(let y of f)typeof y=="string"&&y.length>0&&I.add(y)}return Array.from(I).sort()}function ze(){return F.search.trim()!==""||F.priority!==""||F.type!==""||F.labels.length>0}function ke(){try{if(_){let I=_.selectBoardColumn("tab:board:in-progress","in_progress",E),M=_.selectBoardColumn("tab:board:blocked","blocked",E).filter(se),c=new Set(I.map(z=>z.id)),f=_.selectBoardColumn("tab:board:ready","ready",E).filter(z=>ne(z)&&!c.has(z.id)),y=_.selectBoardColumn("tab:board:resolved","resolved",E),g=_.selectBoardColumn("tab:board:deferred","deferred",E),A=G?g:[],T=_.selectBoardColumn("tab:board:closed","closed").slice(0,Hi),R=[...M,...f,...I,...y,...A,...T];xe(R);let K=new Set;for(let z of R)z&&z.id&&!cn(z)&&K.add(z.id);let te=!ze();$=te?Bt(M,K):M,v=te?Bt(f,K):f,L=te?Bt(I,K):I,P=te?Bt(y,K):y,B=te?Bt(A,K):A,N=g.length,q=te?Bt(T,K):T,C=new Map;for(let z of $)C.set(z.id,"open");for(let z of v)C.set(z.id,"open");for(let z of L)C.set(z.id,"in_progress");for(let z of P)C.set(z.id,"resolved");for(let z of B)C.set(z.id,"deferred");for(let z of q)C.set(z.id,"closed");x=new Map;for(let z of $)x.set(z.id,"blocked-col");for(let z of v)x.set(z.id,"ready-col");for(let z of L)x.set(z.id,"in-progress-col");for(let z of P)x.set(z.id,"resolved-col");for(let z of B)x.set(z.id,"deferred-col");for(let z of q)x.set(z.id,"closed-col")}me()}catch{$=[],v=[],L=[],P=[],B=[],q=[],m=new Map,me()}}function xe(I){let M=new Map;for(let f of I)f&&f.id&&!M.has(f.id)&&M.set(f.id,f);let c=new Map;for(let f of M.values()){let y=cn(f);if(!y)continue;let g=c.get(y);g||(g=[],c.set(y,g)),g.push({id:f.id,title:f.title,status:f.status,metadata:f.metadata,created_at:f.created_at})}m=c}function je(I){let M=m.get(I)||[],c=0,f=null;for(let y of M)(y.status==="resolved"||y.status==="closed")&&(c+=1),!f&&y.status==="in_progress"&&(f=y);return{total:M.length,count:c,current:f,children:M}}function ce(I){return!O.has(I)}function lt(I,M){I.preventDefault(),I.stopPropagation(),O.has(M)?O.delete(M):O.add(M),me()}function pe(I,M){I.preventDefault(),I.stopPropagation(),n(M)}function Ye(I,M){I.preventDefault(),I.stopPropagation(),n(M)}function ie(I,M){V||n(M)}function Me(I,M){I.preventDefault(),I.stopPropagation(),Yi(M).then(c=>{c&&Q("\uBCF5\uC0AC\uB428","success",1200)})}function Qe(I,M){V=M,I.dataTransfer&&(I.dataTransfer.setData("text/plain",M),I.dataTransfer.effectAllowed="move"),I.target.classList.add("board-card--dragging")}function Se(I){I.target.classList.remove("board-card--dragging"),Je(),setTimeout(()=>{V=null},0)}function Ee(I){let M=String(I.target.value||"");!M||M===h||(h=M,a&&a(M),me())}let ye={onCardClick:ie,onCopyId:Me,onDragStart:Qe,onDragEnd:Se,onClosedRangeChange:Ee,rollupFor:je,isExpanded:ce,onRollupToggle:lt,onChildClick:pe,onFromChipClick:Ye,get policy(){return l?l.get():null}};function Ne(I){let M=I.target,c=t.querySelector(".board-filter__labels");M&&c&&c.contains(M)||de()}function Ve(I){I.key==="Escape"&&de()}function Ce(){H||(H=!0,document.addEventListener("mousedown",Ne),document.addEventListener("keydown",Ve),me())}function de(){H&&(H=!1,document.removeEventListener("mousedown",Ne),document.removeEventListener("keydown",Ve),me())}let Re={onSearchInput(I){F.search=String(I.target.value||""),ke()},onPriorityChange(I){F.priority=String(I.target.value||""),ke()},onTypeChange(I){F.type=String(I.target.value||""),ke()},onSortChange(I){let M=String(I.target.value||"");if(!(!Ms.has(M)||M===E)){E=M;try{window.localStorage.setItem(Os,M)}catch{}ke()}},onDeferredToggle(){G=!G,ke()},onLabelMenuToggle(){H?de():Ce()},onLabelToggle(I){let M=F.labels.indexOf(I);M===-1?F.labels.push(I):F.labels.splice(M,1),ke()},onLabelClear(){F.labels.length!==0&&(F.labels=[],ke())},onNewIssue(){d&&d()}};function He(){let I=G?"board-root board-root--deferred":"board-root";return u`
      <div class="board-view">
        ${Ds(F,Re,{sort_mode:E,show_deferred:G,deferred_count:N,label_options:Ge(),label_menu_open:H})}
        <div class=${I}>
          ${Et({title:"Blocked",id:"blocked-col",items:$e($)},ye)}
          ${Et({title:"Ready",id:"ready-col",items:$e(v)},ye)}
          ${Et({title:"In progress",id:"in-progress-col",items:$e(L)},ye)}
          ${Et({title:"Resolved",id:"resolved-col",items:$e(P)},ye)}
          ${G?Et({title:"Deferred",id:"deferred-col",items:$e(B)},ye):""}
          ${Et({title:"Closed",id:"closed-col",items:$e(q),is_closed:!0,closed_range:h},ye)}
        </div>
      </div>
    `}function me(){le(He(),t),Te()}function Te(){try{let I=Array.from(t.querySelectorAll(".board-column"));for(let M of I)Array.from(M.querySelectorAll(".board-card")).forEach((f,y)=>{f.tabIndex=y===0?0:-1})}catch{}}async function Pe(I,M){if(!o){Q("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:I,status:M}),Q("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(c){r("update-status failed: %o",c),Q("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function Oe(I){switch(I){case"blocked-col":return $;case"ready-col":return v;case"in-progress-col":return L;case"resolved-col":return P;case"deferred-col":return B;default:return[]}}function Ke(I,M,c){if(!o||!i)return;let f=Oe(I),y=f.find(K=>K.id===M);if(!y)return;let g=f.filter(K=>K.id!==M),A=c.closest?c.closest(".board-card"):null,T=g.length;if(A){let K=A.getAttribute("data-issue-id");if(K===M)return;let te=g.findIndex(z=>z.id===K);te>=0&&(T=te)}let R=g.slice();R.splice(T,0,y),k.applyReorder(M,R,T)}function Je(){for(let I of Array.from(t.querySelectorAll(".board-column--drag-over")))I.classList.remove("board-column--drag-over")}let ge=null;t.addEventListener("dragover",I=>{I.preventDefault(),I.dataTransfer&&(I.dataTransfer.dropEffect="move");let c=I.target.closest(".board-column");c&&c!==ge&&(ge&&ge.classList.remove("board-column--drag-over"),c.classList.add("board-column--drag-over"),ge=c)}),t.addEventListener("dragleave",I=>{let M=I.relatedTarget;(!M||!t.contains(M))&&ge&&(ge.classList.remove("board-column--drag-over"),ge=null)}),t.addEventListener("drop",I=>{I.preventDefault(),ge&&(ge.classList.remove("board-column--drag-over"),ge=null);let M=I.target,c=M.closest(".board-column");if(!c)return;let f=I.dataTransfer?.getData("text/plain")||"";if(!f)return;let y=c.id,g=x.get(f);if(g&&g===y){if(Gi.has(y)){if(E!=="manual"){Q("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}Ke(y,f,M)}return}let A=Wi[y];if(!A){Q("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}C.get(f)!==A&&Pe(f,A)}),t.addEventListener("keydown",I=>{let M=I.target;if(!(M instanceof HTMLElement))return;let c=String(M.tagName||"").toLowerCase();if(c==="input"||c==="textarea"||c==="select"||c==="button"||c==="a"||M.isContentEditable===!0)return;let f=M.closest(".board-card");if(!f)return;let y=String(I.key||"");if(y==="Enter"||y===" "){I.preventDefault();let R=f.getAttribute("data-issue-id");R&&n(R);return}if(y!=="ArrowUp"&&y!=="ArrowDown"&&y!=="ArrowLeft"&&y!=="ArrowRight")return;I.preventDefault();let g=f.closest(".board-column");if(!g)return;let A=Array.from(g.querySelectorAll(".board-card")),T=A.indexOf(f);if(y==="ArrowDown"&&T<A.length-1){Le(f,A[T+1]);return}if(y==="ArrowUp"&&T>0){Le(f,A[T-1]);return}if(y==="ArrowLeft"||y==="ArrowRight"){let R=Array.from(t.querySelectorAll(".board-column")),K=R.indexOf(g),te=y==="ArrowRight"?1:-1,z=K+te;for(;z>=0&&z<R.length;){let _e=R[z].querySelector(".board-card");if(_e){Le(f,_e);return}z+=te}}});function Le(I,M){try{I.tabIndex=-1,M.tabIndex=0,M.focus()}catch{}}let Ae=null;_&&_.subscribe&&(Ae=_.subscribe(()=>{try{ke()}catch{}}));let Ie=null;return l&&l.subscribe&&(Ie=l.subscribe(()=>{try{ke()}catch{}})),{async load(){r("load"),ke()},clear(){de(),Ae&&(Ae(),Ae=null),Ie&&(Ie(),Ie=null),t.replaceChildren(),$=[],v=[],L=[],P=[],B=[],q=[],C=new Map,x=new Map}}}function cn(t){let e=t&&t.parent;return typeof e=="string"?e:e&&e.id?String(e.id):""}function Bt(t,e){return t.filter(r=>{let n=cn(r);return!(n&&e.has(n))})}async function Yi(t){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(t)),!0;let e=document.createElement("textarea");e.value=String(t),e.style.position="fixed",e.style.left="-9999px",document.body.appendChild(e),e.select();let r=!1;try{r=document.execCommand("copy")}finally{e.remove()}return r}catch{return!1}}async function qt(t){let e=String(t);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(e),!0}catch{}try{let r=document.createElement("textarea");r.value=e,r.style.position="fixed",r.style.left="-9999px",document.body.appendChild(r),r.select();let n=!1;try{n=document.execCommand("copy")}finally{r.remove()}return n}catch{return!1}}var Vi={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},Ki=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,Zi=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function ht(t){return!!t&&typeof t=="object"}function dn(t){return typeof t!="string"||t.length===0?[]:t.split(/\r?\n/)}function Ps(t,e){let r=dn(t),n=dn(e),s=new Map;for(let l of r)s.set(l,(s.get(l)||0)+1);let o=0;for(let l of n){let a=s.get(l)||0;a>0?s.set(l,a-1):o+=1}let i=0;for(let l of s.values())i+=l;return{added:o,removed:i}}function Xi(t){let e="";typeof t=="string"?e=t:Array.isArray(t)?e=t.map(s=>ht(s)&&typeof s.text=="string"?s.text:"").join(""):ht(t)&&typeof t.text=="string"&&(e=t.text);let n=(String(e).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return n.length>120?`${n.slice(0,117)}\u2026`:n}function Qi(t){let e=String(t.name||""),r=t.input||{},n={kind:"tool",tool:e,icon:Vi[e]||"\u{1F527}",input:r,expandable:!0};if((e==="Read"||e==="Write")&&(n.path=String(r.file_path||r.path||"")),e==="Write"&&(n.added=dn(r.content).length),e==="Edit"){n.path=String(r.file_path||r.path||"");let{added:s,removed:o}=Ps(r.old_string,r.new_string);n.added=s,n.removed=o}if(e==="MultiEdit"){n.path=String(r.file_path||r.path||"");let s=0,o=0,i=Array.isArray(r.edits)?r.edits:[];for(let l of i){let a=Ps(ht(l)?l.old_string:"",ht(l)?l.new_string:"");s+=a.added,o+=a.removed}n.added=s,n.removed=o}return e==="Bash"&&(n.command=String(r.command||"")),(e==="Grep"||e==="Glob")&&(n.command=String(r.pattern||r.query||"")),n}function Fs(t){let e=t.split(/\r?\n/).find(n=>n.trim().length>0)||"",r=Ki.exec(e);return r?{kind:"gate",gate:r[2]==="implementation"?"impl":r[2],reviewer:r[3],verdict:r[4],time:r[5]?r[5].trim():void 0,text:e.trim()}:Zi.test(e)&&e.trim().length<=80?{kind:"phase",text:e.trim()}:{kind:"assistant",text:t}}function Ji(t,e){if(t.type==="assistant"){let r=t.message,n=r&&Array.isArray(r.content)?r.content:[],s=[];for(let o of n)if(ht(o)){if(o.type==="text"&&typeof o.text=="string")s.push(Fs(o.text));else if(o.type==="tool_use"){let i=Qi(o);typeof o.id=="string"&&e.set(o.id,i),s.push(i)}}return s}if(t.type==="user"){let r=t.message,n=r&&Array.isArray(r.content)?r.content:[];for(let s of n)if(ht(s)&&s.type==="tool_result"){let o=e.get(String(s.tool_use_id));if(o){let i=Xi(s.content);o.result=i,o.output=typeof s.content=="string"?s.content:i}}return[]}if(t.type==="result"){let r=t.is_error===!1&&t.subtype==="success";return[{kind:"result",success:r,text:typeof t.result=="string"?t.result:r?"DONE":""}]}return[]}function ea(t){if(t.type==="item.completed"&&ht(t.item)){let e=t.item;return e.type==="agent_message"&&typeof e.text=="string"?[Fs(e.text)]:e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}if(t.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(t.type==="turn.failed"){let e=t.error;return[{kind:"error",text:e&&typeof e.message=="string"?e.message:"turn failed"}]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:[]}function ta(t){let e=t.type;return typeof e=="string"&&(e==="error"||e.startsWith("thread.")||e.startsWith("turn.")||e.startsWith("item."))}function Bs(t){let e=[],r=new Map,n=Array.isArray(t)?t:[];for(let s of n){let o=s;if(typeof s=="string"){let l=s.trim();if(l.length===0)continue;try{o=JSON.parse(l)}catch{continue}}if(!ht(o))continue;let i=ta(o)?ea(o):Ji(o,r);for(let l of i)e.push(l)}return e}function Ar(t,e={}){let{transport:r,sessionLogStore:n,onClose:s}=e,o=null,i={},l=!0,a=new Set,d=null;function h(){if(!o||!n)return[];let x=n.get(o);return Bs(x?x.lines:[])}function _(x,m){if(m.kind==="gate")return u`<div class="sv__gate">${m.text}</div>`;if(m.kind==="phase")return u`<div class="sv__phase">${m.text}</div>`;if(m.kind==="result")return u`<div
        class="sv__result${m.success?" sv__result--ok":" sv__result--fail"}"
      >
        ${m.success?"\u2713":"\u2717"}
        ${m.text||(m.success?"DONE":"\uC2E4\uD328")}
      </div>`;if(m.kind==="error")return u`<div class="sv__error">⛔ ${m.text}</div>`;if(m.kind==="blocker")return u`<div class="sv__error">⛔ ${m.text}</div>`;if(m.kind==="tool"){let O=a.has(x),F=m.tool==="Bash"?m.command:m.path||m.command||"";return u`<div
        class="sv__tool${O?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>P(x)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${m.icon}</span>
          <span class="sv__tool-name">${m.tool}</span>
          ${F?u`<span class="sv__tool-detail">${F}</span>`:""}
          ${typeof m.added=="number"?u`<span class="sv__diff-add">+${m.added}</span>`:""}
          ${typeof m.removed=="number"?u`<span class="sv__diff-del">−${m.removed}</span>`:""}
          ${m.result?u`<span class="sv__tool-ok">→ ${m.result}</span>`:""}
        </span>
        ${O?u`<pre class="sv__tool-expand">${k(m)}</pre>`:""}
      </div>`}return u`<div class="sv__as">${m.text}</div>`}function k(x){let m=[];if(x.input!==void 0)try{m.push(`input: ${JSON.stringify(x.input,null,2)}`)}catch{}return typeof x.output=="string"&&x.output.length>0&&m.push(`output:
${x.output}`),m.join(`

`)}function $(){if(!o)return u``;let x=h(),m=[i.runner,i.model,i.effort].filter(Boolean).join(" \xB7 "),O=i.session_id||"",F=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${l?"ON":"OFF"}`;return u`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id">${o}</span>
        ${O?u`<button
              type="button"
              class="sv__session"
              title=${O}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${O}`}
              @click=${()=>q(O)}
            >
              ⧉ ${O.slice(0,8)}
            </button>`:""}
        ${m?u`<span class="sv__meta">${m}</span>`:""}
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
        ${x.length===0?u`<div class="sv__empty">세션 로그 없음</div>`:x.map((H,V)=>_(V,H))}
      </div>
    </div>`}function v(){le($(),t),l&&L()}function L(){let x=t.querySelector(".sv__body");x&&(x.scrollTop=x.scrollHeight)}function P(x){a.has(x)?a.delete(x):a.add(x),v()}function B(){l=!l,v()}function q(x){qt(x).then(m=>{m?Q("\uBCF5\uC0AC\uB428","success",1200):Q("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function G(x){!o||!x||(i={...i,...x},v())}function N(x){let m=x.target;if(!m||!m.classList||!m.classList.contains("sv__body"))return;!(m.scrollHeight-m.scrollTop-m.clientHeight<=4)&&l&&(l=!1,v())}t.addEventListener("scroll",N,!0);function E(x){let m=x&&x.attempt_id;m&&(o=m,i=x.meta||{},l=!0,a.clear(),!d&&n&&(d=n.subscribe(v)),r&&Promise.resolve(r("subscribe-session-log",{id:`session-log:${o}`,attempt_id:o})).catch(()=>{}),v())}function C(){let x=o;o=null,a.clear(),r&&x&&Promise.resolve(r("unsubscribe-session-log",{id:`session-log:${x}`})).catch(()=>{}),le(u``,t),s&&s()}return{open:E,updateMeta:G,close:C,isOpen(){return o!==null},destroy(){d&&(d(),d=null),t.removeEventListener("scroll",N,!0),o=null,le(u``,t)}}}function ra(t){let e=t&&t.metadata||{},r=[];return typeof e.spec_id=="string"&&e.spec_id.trim().length>0&&r.push({kind:"spec",path:e.spec_id.trim()}),typeof e.plan_path=="string"&&e.plan_path.trim().length>0&&r.push({kind:"plan",path:e.plan_path.trim()}),r}function qs(t,e){let r=ra(t);return u`
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
  `}var un=["opus","sonnet","haiku","fable"],pn=["low","medium","high","xhigh"],fn=["codex","opus","fable","self","skip"],hn=["opus","fable","sonnet","haiku"],na=["standard","fast_track"],gn={orchestration_model:"(\uAE30\uBCF8: opus)",orchestration_effort:"(\uAE30\uBCF8: CLI \uAE30\uBCF8)",review_model:"(\uAE30\uBCF8: codex)",impl_model:"(\uAE30\uBCF8: \uD2F0\uC5B4 \uC790\uB3D9)"};function Er(t,e){let r=e&&e[t];return typeof r=="string"&&r.length>0?`(\uAE30\uBCF8: ${r} \u2014 \uC804\uC5ED)`:gn[t]||"(\uAE30\uBCF8)"}function er(t,e,r,n,s,o){return u`
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
  `}function tr(t,e){let r=t.map(n=>({value:n,label:n}));return typeof e=="string"?[{value:"",label:e},...r]:r}function Us(t,e,r){let n=t&&t.metadata||{},s=r&&typeof r=="object"?r:{},o=n.workflow_mode==="fast_track"?"fast_track":"standard";return u`
    <div class="detail-section-label">실행 설정 (수정 가능)</div>
    ${er("orchestration_model","orchestration_model",tr(un,Er("orchestration_model",s)),n.orchestration_model||"",!1,e)}
    ${er("orchestration_effort","orchestration_effort",tr(pn,Er("orchestration_effort",s)),n.orchestration_effort||"",!1,e)}
    ${er("review_model","review_model",tr(fn,Er("review_model",s)),n.review_model||"",!1,e)}
    ${er("impl_model","impl_model",tr(hn,Er("impl_model",s)),n.impl_model||"",!1,e)}
    ${er("workflow_mode","workflow_mode",tr(na),o,n.workflow_mode==="fast_track",e)}
  `}var{entries:Zs,setPrototypeOf:zs,isFrozen:sa,getPrototypeOf:oa,getOwnPropertyDescriptor:ia}=Object,{freeze:Be,seal:nt,create:vn}=Object,{apply:$n,construct:xn}=typeof Reflect<"u"&&Reflect;Be||(Be=function(e){return e});nt||(nt=function(e){return e});$n||($n=function(e,r){for(var n=arguments.length,s=new Array(n>2?n-2:0),o=2;o<n;o++)s[o-2]=arguments[o];return e.apply(r,s)});xn||(xn=function(e){for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return new e(...n)});var Cr=qe(Array.prototype.forEach),aa=qe(Array.prototype.lastIndexOf),Hs=qe(Array.prototype.pop),rr=qe(Array.prototype.push),la=qe(Array.prototype.splice),Lr=qe(String.prototype.toLowerCase),mn=qe(String.prototype.toString),_n=qe(String.prototype.match),nr=qe(String.prototype.replace),ca=qe(String.prototype.indexOf),da=qe(String.prototype.trim),ot=qe(Object.prototype.hasOwnProperty),Fe=qe(RegExp.prototype.test),sr=ua(TypeError);function qe(t){return function(e){e instanceof RegExp&&(e.lastIndex=0);for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return $n(t,e,n)}}function ua(t){return function(){for(var e=arguments.length,r=new Array(e),n=0;n<e;n++)r[n]=arguments[n];return xn(t,r)}}function re(t,e){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Lr;zs&&zs(t,null);let n=e.length;for(;n--;){let s=e[n];if(typeof s=="string"){let o=r(s);o!==s&&(sa(e)||(e[n]=o),s=o)}t[s]=!0}return t}function pa(t){for(let e=0;e<t.length;e++)ot(t,e)||(t[e]=null);return t}function dt(t){let e=vn(null);for(let[r,n]of Zs(t))ot(t,r)&&(Array.isArray(n)?e[r]=pa(n):n&&typeof n=="object"&&n.constructor===Object?e[r]=dt(n):e[r]=n);return e}function or(t,e){for(;t!==null;){let n=ia(t,e);if(n){if(n.get)return qe(n.get);if(typeof n.value=="function")return qe(n.value)}t=oa(t)}function r(){return null}return r}var Ws=Be(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),bn=Be(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),wn=Be(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),fa=Be(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),kn=Be(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),ha=Be(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Gs=Be(["#text"]),js=Be(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),yn=Be(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Ys=Be(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Rr=Be(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),ga=nt(/\{\{[\w\W]*|[\w\W]*\}\}/gm),ma=nt(/<%[\w\W]*|[\w\W]*%>/gm),_a=nt(/\$\{[\w\W]*/gm),ba=nt(/^data-[\-\w.\u00B7-\uFFFF]+$/),wa=nt(/^aria-[\-\w]+$/),Xs=nt(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),ka=nt(/^(?:\w+script|data):/i),ya=nt(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Qs=nt(/^html$/i),va=nt(/^[a-z][.\w]*(-[.\w]+)+$/i),Vs=Object.freeze({__proto__:null,ARIA_ATTR:wa,ATTR_WHITESPACE:ya,CUSTOM_ELEMENT:va,DATA_ATTR:ba,DOCTYPE_NAME:Qs,ERB_EXPR:ma,IS_ALLOWED_URI:Xs,IS_SCRIPT_OR_DATA:ka,MUSTACHE_EXPR:ga,TMPLIT_EXPR:_a}),ir={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},$a=function(){return typeof window>"u"?null:window},xa=function(e,r){if(typeof e!="object"||typeof e.createPolicy!="function")return null;let n=null,s="data-tt-policy-suffix";r&&r.hasAttribute(s)&&(n=r.getAttribute(s));let o="dompurify"+(n?"#"+n:"");try{return e.createPolicy(o,{createHTML(i){return i},createScriptURL(i){return i}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},Ks=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Js(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:$a(),e=j=>Js(j);if(e.version="3.3.0",e.removed=[],!t||!t.document||t.document.nodeType!==ir.document||!t.Element)return e.isSupported=!1,e;let{document:r}=t,n=r,s=n.currentScript,{DocumentFragment:o,HTMLTemplateElement:i,Node:l,Element:a,NodeFilter:d,NamedNodeMap:h=t.NamedNodeMap||t.MozNamedAttrMap,HTMLFormElement:_,DOMParser:k,trustedTypes:$}=t,v=a.prototype,L=or(v,"cloneNode"),P=or(v,"remove"),B=or(v,"nextSibling"),q=or(v,"childNodes"),G=or(v,"parentNode");if(typeof i=="function"){let j=r.createElement("template");j.content&&j.content.ownerDocument&&(r=j.content.ownerDocument)}let N,E="",{implementation:C,createNodeIterator:x,createDocumentFragment:m,getElementsByTagName:O}=r,{importNode:F}=n,H=Ks();e.isSupported=typeof Zs=="function"&&typeof G=="function"&&C&&C.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:V,ERB_EXPR:ne,TMPLIT_EXPR:se,DATA_ATTR:$e,ARIA_ATTR:Ge,IS_SCRIPT_OR_DATA:ze,ATTR_WHITESPACE:ke,CUSTOM_ELEMENT:xe}=Vs,{IS_ALLOWED_URI:je}=Vs,ce=null,lt=re({},[...Ws,...bn,...wn,...kn,...Gs]),pe=null,Ye=re({},[...js,...yn,...Ys,...Rr]),ie=Object.seal(vn(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Me=null,Qe=null,Se=Object.seal(vn(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),Ee=!0,ye=!0,Ne=!1,Ve=!0,Ce=!1,de=!0,Re=!1,He=!1,me=!1,Te=!1,Pe=!1,Oe=!1,Ke=!0,Je=!1,ge="user-content-",Le=!0,Ae=!1,Ie={},I=null,M=re({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),c=null,f=re({},["audio","video","img","source","image","track"]),y=null,g=re({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),A="http://www.w3.org/1998/Math/MathML",T="http://www.w3.org/2000/svg",R="http://www.w3.org/1999/xhtml",K=R,te=!1,z=null,_e=re({},[A,T,R],mn),ee=re({},["mi","mo","mn","ms","mtext"]),be=re({},["annotation-xml"]),Lt=re({},["title","style","font","a","script"]),et=null,_t=["application/xhtml+xml","text/html"],bt="text/html",b=null,w=null,Z=r.createElement("form"),Y=function(p){return p instanceof RegExp||p instanceof Function},J=function(){let p=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(w&&w===p)){if((!p||typeof p!="object")&&(p={}),p=dt(p),et=_t.indexOf(p.PARSER_MEDIA_TYPE)===-1?bt:p.PARSER_MEDIA_TYPE,b=et==="application/xhtml+xml"?mn:Lr,ce=ot(p,"ALLOWED_TAGS")?re({},p.ALLOWED_TAGS,b):lt,pe=ot(p,"ALLOWED_ATTR")?re({},p.ALLOWED_ATTR,b):Ye,z=ot(p,"ALLOWED_NAMESPACES")?re({},p.ALLOWED_NAMESPACES,mn):_e,y=ot(p,"ADD_URI_SAFE_ATTR")?re(dt(g),p.ADD_URI_SAFE_ATTR,b):g,c=ot(p,"ADD_DATA_URI_TAGS")?re(dt(f),p.ADD_DATA_URI_TAGS,b):f,I=ot(p,"FORBID_CONTENTS")?re({},p.FORBID_CONTENTS,b):M,Me=ot(p,"FORBID_TAGS")?re({},p.FORBID_TAGS,b):dt({}),Qe=ot(p,"FORBID_ATTR")?re({},p.FORBID_ATTR,b):dt({}),Ie=ot(p,"USE_PROFILES")?p.USE_PROFILES:!1,Ee=p.ALLOW_ARIA_ATTR!==!1,ye=p.ALLOW_DATA_ATTR!==!1,Ne=p.ALLOW_UNKNOWN_PROTOCOLS||!1,Ve=p.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Ce=p.SAFE_FOR_TEMPLATES||!1,de=p.SAFE_FOR_XML!==!1,Re=p.WHOLE_DOCUMENT||!1,Te=p.RETURN_DOM||!1,Pe=p.RETURN_DOM_FRAGMENT||!1,Oe=p.RETURN_TRUSTED_TYPE||!1,me=p.FORCE_BODY||!1,Ke=p.SANITIZE_DOM!==!1,Je=p.SANITIZE_NAMED_PROPS||!1,Le=p.KEEP_CONTENT!==!1,Ae=p.IN_PLACE||!1,je=p.ALLOWED_URI_REGEXP||Xs,K=p.NAMESPACE||R,ee=p.MATHML_TEXT_INTEGRATION_POINTS||ee,be=p.HTML_INTEGRATION_POINTS||be,ie=p.CUSTOM_ELEMENT_HANDLING||{},p.CUSTOM_ELEMENT_HANDLING&&Y(p.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(ie.tagNameCheck=p.CUSTOM_ELEMENT_HANDLING.tagNameCheck),p.CUSTOM_ELEMENT_HANDLING&&Y(p.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(ie.attributeNameCheck=p.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),p.CUSTOM_ELEMENT_HANDLING&&typeof p.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(ie.allowCustomizedBuiltInElements=p.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Ce&&(ye=!1),Pe&&(Te=!0),Ie&&(ce=re({},Gs),pe=[],Ie.html===!0&&(re(ce,Ws),re(pe,js)),Ie.svg===!0&&(re(ce,bn),re(pe,yn),re(pe,Rr)),Ie.svgFilters===!0&&(re(ce,wn),re(pe,yn),re(pe,Rr)),Ie.mathMl===!0&&(re(ce,kn),re(pe,Ys),re(pe,Rr))),p.ADD_TAGS&&(typeof p.ADD_TAGS=="function"?Se.tagCheck=p.ADD_TAGS:(ce===lt&&(ce=dt(ce)),re(ce,p.ADD_TAGS,b))),p.ADD_ATTR&&(typeof p.ADD_ATTR=="function"?Se.attributeCheck=p.ADD_ATTR:(pe===Ye&&(pe=dt(pe)),re(pe,p.ADD_ATTR,b))),p.ADD_URI_SAFE_ATTR&&re(y,p.ADD_URI_SAFE_ATTR,b),p.FORBID_CONTENTS&&(I===M&&(I=dt(I)),re(I,p.FORBID_CONTENTS,b)),Le&&(ce["#text"]=!0),Re&&re(ce,["html","head","body"]),ce.table&&(re(ce,["tbody"]),delete Me.tbody),p.TRUSTED_TYPES_POLICY){if(typeof p.TRUSTED_TYPES_POLICY.createHTML!="function")throw sr('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof p.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw sr('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');N=p.TRUSTED_TYPES_POLICY,E=N.createHTML("")}else N===void 0&&(N=xa($,s)),N!==null&&typeof E=="string"&&(E=N.createHTML(""));Be&&Be(p),w=p}},fe=re({},[...bn,...wn,...fa]),wt=re({},[...kn,...ha]),hr=function(p){let D=G(p);(!D||!D.tagName)&&(D={namespaceURI:K,tagName:"template"});let U=Lr(p.tagName),S=Lr(D.tagName);return z[p.namespaceURI]?p.namespaceURI===T?D.namespaceURI===R?U==="svg":D.namespaceURI===A?U==="svg"&&(S==="annotation-xml"||ee[S]):!!fe[U]:p.namespaceURI===A?D.namespaceURI===R?U==="math":D.namespaceURI===T?U==="math"&&be[S]:!!wt[U]:p.namespaceURI===R?D.namespaceURI===T&&!be[S]||D.namespaceURI===A&&!ee[S]?!1:!wt[U]&&(Lt[U]||!fe[U]):!!(et==="application/xhtml+xml"&&z[p.namespaceURI]):!1},tt=function(p){rr(e.removed,{element:p});try{G(p).removeChild(p)}catch{P(p)}},Ze=function(p,D){try{rr(e.removed,{attribute:D.getAttributeNode(p),from:D})}catch{rr(e.removed,{attribute:null,from:D})}if(D.removeAttribute(p),p==="is")if(Te||Pe)try{tt(D)}catch{}else try{D.setAttribute(p,"")}catch{}},Xe=function(p){let D=null,U=null;if(me)p="<remove></remove>"+p;else{let X=_n(p,/^[\r\n\t ]+/);U=X&&X[0]}et==="application/xhtml+xml"&&K===R&&(p='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+p+"</body></html>");let S=N?N.createHTML(p):p;if(K===R)try{D=new k().parseFromString(S,et)}catch{}if(!D||!D.documentElement){D=C.createDocument(K,"template",null);try{D.documentElement.innerHTML=te?E:S}catch{}}let W=D.body||D.documentElement;return p&&U&&W.insertBefore(r.createTextNode(U),W.childNodes[0]||null),K===R?O.call(D,Re?"html":"body")[0]:Re?D.documentElement:W},Ht=function(p){return x.call(p.ownerDocument||p,p,d.SHOW_ELEMENT|d.SHOW_COMMENT|d.SHOW_TEXT|d.SHOW_PROCESSING_INSTRUCTION|d.SHOW_CDATA_SECTION,null)},Wt=function(p){return p instanceof _&&(typeof p.nodeName!="string"||typeof p.textContent!="string"||typeof p.removeChild!="function"||!(p.attributes instanceof h)||typeof p.removeAttribute!="function"||typeof p.setAttribute!="function"||typeof p.namespaceURI!="string"||typeof p.insertBefore!="function"||typeof p.hasChildNodes!="function")},kt=function(p){return typeof l=="function"&&p instanceof l};function ct(j,p,D){Cr(j,U=>{U.call(e,p,D,w)})}let Gt=function(p){let D=null;if(ct(H.beforeSanitizeElements,p,null),Wt(p))return tt(p),!0;let U=b(p.nodeName);if(ct(H.uponSanitizeElement,p,{tagName:U,allowedTags:ce}),de&&p.hasChildNodes()&&!kt(p.firstElementChild)&&Fe(/<[/\w!]/g,p.innerHTML)&&Fe(/<[/\w!]/g,p.textContent)||p.nodeType===ir.progressingInstruction||de&&p.nodeType===ir.comment&&Fe(/<[/\w]/g,p.data))return tt(p),!0;if(!(Se.tagCheck instanceof Function&&Se.tagCheck(U))&&(!ce[U]||Me[U])){if(!Me[U]&&Yt(U)&&(ie.tagNameCheck instanceof RegExp&&Fe(ie.tagNameCheck,U)||ie.tagNameCheck instanceof Function&&ie.tagNameCheck(U)))return!1;if(Le&&!I[U]){let S=G(p)||p.parentNode,W=q(p)||p.childNodes;if(W&&S){let X=W.length;for(let he=X-1;he>=0;--he){let rt=L(W[he],!0);rt.__removalCount=(p.__removalCount||0)+1,S.insertBefore(rt,B(p))}}}return tt(p),!0}return p instanceof a&&!hr(p)||(U==="noscript"||U==="noembed"||U==="noframes")&&Fe(/<\/no(script|embed|frames)/i,p.innerHTML)?(tt(p),!0):(Ce&&p.nodeType===ir.text&&(D=p.textContent,Cr([V,ne,se],S=>{D=nr(D,S," ")}),p.textContent!==D&&(rr(e.removed,{element:p.cloneNode()}),p.textContent=D)),ct(H.afterSanitizeElements,p,null),!1)},jt=function(p,D,U){if(Ke&&(D==="id"||D==="name")&&(U in r||U in Z))return!1;if(!(ye&&!Qe[D]&&Fe($e,D))){if(!(Ee&&Fe(Ge,D))){if(!(Se.attributeCheck instanceof Function&&Se.attributeCheck(D,p))){if(!pe[D]||Qe[D]){if(!(Yt(p)&&(ie.tagNameCheck instanceof RegExp&&Fe(ie.tagNameCheck,p)||ie.tagNameCheck instanceof Function&&ie.tagNameCheck(p))&&(ie.attributeNameCheck instanceof RegExp&&Fe(ie.attributeNameCheck,D)||ie.attributeNameCheck instanceof Function&&ie.attributeNameCheck(D,p))||D==="is"&&ie.allowCustomizedBuiltInElements&&(ie.tagNameCheck instanceof RegExp&&Fe(ie.tagNameCheck,U)||ie.tagNameCheck instanceof Function&&ie.tagNameCheck(U))))return!1}else if(!y[D]){if(!Fe(je,nr(U,ke,""))){if(!((D==="src"||D==="xlink:href"||D==="href")&&p!=="script"&&ca(U,"data:")===0&&c[p])){if(!(Ne&&!Fe(ze,nr(U,ke,"")))){if(U)return!1}}}}}}}return!0},Yt=function(p){return p!=="annotation-xml"&&_n(p,xe)},gr=function(p){ct(H.beforeSanitizeAttributes,p,null);let{attributes:D}=p;if(!D||Wt(p))return;let U={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:pe,forceKeepAttr:void 0},S=D.length;for(;S--;){let W=D[S],{name:X,namespaceURI:he,value:rt}=W,It=b(X),Hr=rt,De=X==="value"?Hr:da(Hr);if(U.attrName=It,U.attrValue=De,U.keepAttr=!0,U.forceKeepAttr=void 0,ct(H.uponSanitizeAttribute,p,U),De=U.attrValue,Je&&(It==="id"||It==="name")&&(Ze(X,p),De=ge+De),de&&Fe(/((--!?|])>)|<\/(style|title|textarea)/i,De)){Ze(X,p);continue}if(It==="attributename"&&_n(De,"href")){Ze(X,p);continue}if(U.forceKeepAttr)continue;if(!U.keepAttr){Ze(X,p);continue}if(!Ve&&Fe(/\/>/i,De)){Ze(X,p);continue}Ce&&Cr([V,ne,se],Vn=>{De=nr(De,Vn," ")});let Yn=b(p.nodeName);if(!jt(Yn,It,De)){Ze(X,p);continue}if(N&&typeof $=="object"&&typeof $.getAttributeType=="function"&&!he)switch($.getAttributeType(Yn,It)){case"TrustedHTML":{De=N.createHTML(De);break}case"TrustedScriptURL":{De=N.createScriptURL(De);break}}if(De!==Hr)try{he?p.setAttributeNS(he,X,De):p.setAttribute(X,De),Wt(p)?tt(p):Hs(e.removed)}catch{Ze(X,p)}}ct(H.afterSanitizeAttributes,p,null)},mr=function j(p){let D=null,U=Ht(p);for(ct(H.beforeSanitizeShadowDOM,p,null);D=U.nextNode();)ct(H.uponSanitizeShadowNode,D,null),Gt(D),gr(D),D.content instanceof o&&j(D.content);ct(H.afterSanitizeShadowDOM,p,null)};return e.sanitize=function(j){let p=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},D=null,U=null,S=null,W=null;if(te=!j,te&&(j="<!-->"),typeof j!="string"&&!kt(j))if(typeof j.toString=="function"){if(j=j.toString(),typeof j!="string")throw sr("dirty is not a string, aborting")}else throw sr("toString is not a function");if(!e.isSupported)return j;if(He||J(p),e.removed=[],typeof j=="string"&&(Ae=!1),Ae){if(j.nodeName){let rt=b(j.nodeName);if(!ce[rt]||Me[rt])throw sr("root node is forbidden and cannot be sanitized in-place")}}else if(j instanceof l)D=Xe("<!---->"),U=D.ownerDocument.importNode(j,!0),U.nodeType===ir.element&&U.nodeName==="BODY"||U.nodeName==="HTML"?D=U:D.appendChild(U);else{if(!Te&&!Ce&&!Re&&j.indexOf("<")===-1)return N&&Oe?N.createHTML(j):j;if(D=Xe(j),!D)return Te?null:Oe?E:""}D&&me&&tt(D.firstChild);let X=Ht(Ae?j:D);for(;S=X.nextNode();)Gt(S),gr(S),S.content instanceof o&&mr(S.content);if(Ae)return j;if(Te){if(Pe)for(W=m.call(D.ownerDocument);D.firstChild;)W.appendChild(D.firstChild);else W=D;return(pe.shadowroot||pe.shadowrootmode)&&(W=F.call(n,W,!0)),W}let he=Re?D.outerHTML:D.innerHTML;return Re&&ce["!doctype"]&&D.ownerDocument&&D.ownerDocument.doctype&&D.ownerDocument.doctype.name&&Fe(Qs,D.ownerDocument.doctype.name)&&(he="<!DOCTYPE "+D.ownerDocument.doctype.name+`>
`+he),Ce&&Cr([V,ne,se],rt=>{he=nr(he,rt," ")}),N&&Oe?N.createHTML(he):he},e.setConfig=function(){let j=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};J(j),He=!0},e.clearConfig=function(){w=null,He=!1},e.isValidAttribute=function(j,p,D){w||J({});let U=b(j),S=b(p);return jt(U,S,D)},e.addHook=function(j,p){typeof p=="function"&&rr(H[j],p)},e.removeHook=function(j,p){if(p!==void 0){let D=aa(H[j],p);return D===-1?void 0:la(H[j],D,1)[0]}return Hs(H[j])},e.removeHooks=function(j){H[j]=[]},e.removeAllHooks=function(){H=Ks()},e}var eo=Js();var to={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},ro=t=>(...e)=>({_$litDirective$:t,values:e}),Ir=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,r,n){this._$Ct=e,this._$AM=r,this._$Ci=n}_$AS(e,r){return this.update(e,r)}update(e,r){return this.render(...r)}};var ar=class extends Ir{constructor(e){if(super(e),this.it=ve,e.type!==to.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===ve||e==null)return this._t=void 0,this.it=e;if(e===xt)return e;if(typeof e!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;let r=[e];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}};ar.directiveName="unsafeHTML",ar.resultType=1;var no=ro(ar);function En(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Rt=En();function uo(t){Rt=t}var ur={exec:()=>null};function oe(t,e=""){let r=typeof t=="string"?t:t.source,n={replace:(s,o)=>{let i=typeof o=="string"?o:o.source;return i=i.replace(Ue.caret,"$1"),r=r.replace(s,i),n},getRegex:()=>new RegExp(r,e)};return n}var Sa=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),Ue={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:t=>new RegExp(`^( {0,3}${t})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}#`),htmlBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}<(?:[a-z].*>|!--)`,"i")},Ta=/^(?:[ \t]*(?:\n|$))+/,Aa=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Ea=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,pr=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Ca=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Cn=/(?:[*+-]|\d{1,9}[.)])/,po=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,fo=oe(po).replace(/bull/g,Cn).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Ra=oe(po).replace(/bull/g,Cn).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Rn=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,La=/^[^\n]+/,Ln=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,Ia=oe(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Ln).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Da=oe(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Cn).getRegex(),Fr="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",In=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Oa=oe("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",In).replace("tag",Fr).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),ho=oe(Rn).replace("hr",pr).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Fr).getRegex(),Ma=oe(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",ho).getRegex(),Dn={blockquote:Ma,code:Aa,def:Ia,fences:Ea,heading:Ca,hr:pr,html:Oa,lheading:fo,list:Da,newline:Ta,paragraph:ho,table:ur,text:La},so=oe("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",pr).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Fr).getRegex(),Na={...Dn,lheading:Ra,table:so,paragraph:oe(Rn).replace("hr",pr).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",so).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Fr).getRegex()},Pa={...Dn,html:oe(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",In).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:ur,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:oe(Rn).replace("hr",pr).replace("heading",` *#{1,6} *[^
]`).replace("lheading",fo).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Fa=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Ba=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,go=/^( {2,}|\\)\n(?!\s*$)/,qa=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Br=/[\p{P}\p{S}]/u,On=/[\s\p{P}\p{S}]/u,mo=/[^\s\p{P}\p{S}]/u,Ua=oe(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,On).getRegex(),_o=/(?!~)[\p{P}\p{S}]/u,za=/(?!~)[\s\p{P}\p{S}]/u,Ha=/(?:[^\s\p{P}\p{S}]|~)/u,Wa=oe(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",Sa?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),bo=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,Ga=oe(bo,"u").replace(/punct/g,Br).getRegex(),ja=oe(bo,"u").replace(/punct/g,_o).getRegex(),wo="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Ya=oe(wo,"gu").replace(/notPunctSpace/g,mo).replace(/punctSpace/g,On).replace(/punct/g,Br).getRegex(),Va=oe(wo,"gu").replace(/notPunctSpace/g,Ha).replace(/punctSpace/g,za).replace(/punct/g,_o).getRegex(),Ka=oe("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,mo).replace(/punctSpace/g,On).replace(/punct/g,Br).getRegex(),Za=oe(/\\(punct)/,"gu").replace(/punct/g,Br).getRegex(),Xa=oe(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Qa=oe(In).replace("(?:-->|$)","-->").getRegex(),Ja=oe("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Qa).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Mr=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,el=oe(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Mr).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),ko=oe(/^!?\[(label)\]\[(ref)\]/).replace("label",Mr).replace("ref",Ln).getRegex(),yo=oe(/^!?\[(ref)\](?:\[\])?/).replace("ref",Ln).getRegex(),tl=oe("reflink|nolink(?!\\()","g").replace("reflink",ko).replace("nolink",yo).getRegex(),oo=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,Mn={_backpedal:ur,anyPunctuation:Za,autolink:Xa,blockSkip:Wa,br:go,code:Ba,del:ur,emStrongLDelim:Ga,emStrongRDelimAst:Ya,emStrongRDelimUnd:Ka,escape:Fa,link:el,nolink:yo,punctuation:Ua,reflink:ko,reflinkSearch:tl,tag:Ja,text:qa,url:ur},rl={...Mn,link:oe(/^!?\[(label)\]\((.*?)\)/).replace("label",Mr).getRegex(),reflink:oe(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Mr).getRegex()},Sn={...Mn,emStrongRDelimAst:Va,emStrongLDelim:ja,url:oe(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",oo).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:oe(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",oo).getRegex()},nl={...Sn,br:oe(go).replace("{2,}","*").getRegex(),text:oe(Sn.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Dr={normal:Dn,gfm:Na,pedantic:Pa},lr={normal:Mn,gfm:Sn,breaks:nl,pedantic:rl},sl={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},io=t=>sl[t];function ut(t,e){if(e){if(Ue.escapeTest.test(t))return t.replace(Ue.escapeReplace,io)}else if(Ue.escapeTestNoEncode.test(t))return t.replace(Ue.escapeReplaceNoEncode,io);return t}function ao(t){try{t=encodeURI(t).replace(Ue.percentDecode,"%")}catch{return null}return t}function lo(t,e){let r=t.replace(Ue.findPipe,(o,i,l)=>{let a=!1,d=i;for(;--d>=0&&l[d]==="\\";)a=!a;return a?"|":" |"}),n=r.split(Ue.splitPipe),s=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),e)if(n.length>e)n.splice(e);else for(;n.length<e;)n.push("");for(;s<n.length;s++)n[s]=n[s].trim().replace(Ue.slashPipe,"|");return n}function cr(t,e,r){let n=t.length;if(n===0)return"";let s=0;for(;s<n;){let o=t.charAt(n-s-1);if(o===e&&!r)s++;else if(o!==e&&r)s++;else break}return t.slice(0,n-s)}function ol(t,e){if(t.indexOf(e[1])===-1)return-1;let r=0;for(let n=0;n<t.length;n++)if(t[n]==="\\")n++;else if(t[n]===e[0])r++;else if(t[n]===e[1]&&(r--,r<0))return n;return r>0?-2:-1}function co(t,e,r,n,s){let o=e.href,i=e.title||null,l=t[1].replace(s.other.outputLinkReplace,"$1");n.state.inLink=!0;let a={type:t[0].charAt(0)==="!"?"image":"link",raw:r,href:o,title:i,text:l,tokens:n.inlineTokens(l)};return n.state.inLink=!1,a}function il(t,e,r){let n=t.match(r.other.indentCodeCompensation);if(n===null)return e;let s=n[1];return e.split(`
`).map(o=>{let i=o.match(r.other.beginningSpace);if(i===null)return o;let[l]=i;return l.length>=s.length?o.slice(s.length):o}).join(`
`)}var Nr=class{constructor(t){ue(this,"options");ue(this,"rules");ue(this,"lexer");this.options=t||Rt}space(t){let e=this.rules.block.newline.exec(t);if(e&&e[0].length>0)return{type:"space",raw:e[0]}}code(t){let e=this.rules.block.code.exec(t);if(e){let r=e[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:e[0],codeBlockStyle:"indented",text:this.options.pedantic?r:cr(r,`
`)}}}fences(t){let e=this.rules.block.fences.exec(t);if(e){let r=e[0],n=il(r,e[3]||"",this.rules);return{type:"code",raw:r,lang:e[2]?e[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):e[2],text:n}}}heading(t){let e=this.rules.block.heading.exec(t);if(e){let r=e[2].trim();if(this.rules.other.endingHash.test(r)){let n=cr(r,"#");(this.options.pedantic||!n||this.rules.other.endingSpaceChar.test(n))&&(r=n.trim())}return{type:"heading",raw:e[0],depth:e[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(t){let e=this.rules.block.hr.exec(t);if(e)return{type:"hr",raw:cr(e[0],`
`)}}blockquote(t){let e=this.rules.block.blockquote.exec(t);if(e){let r=cr(e[0],`
`).split(`
`),n="",s="",o=[];for(;r.length>0;){let i=!1,l=[],a;for(a=0;a<r.length;a++)if(this.rules.other.blockquoteStart.test(r[a]))l.push(r[a]),i=!0;else if(!i)l.push(r[a]);else break;r=r.slice(a);let d=l.join(`
`),h=d.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");n=n?`${n}
${d}`:d,s=s?`${s}
${h}`:h;let _=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(h,o,!0),this.lexer.state.top=_,r.length===0)break;let k=o.at(-1);if(k?.type==="code")break;if(k?.type==="blockquote"){let $=k,v=$.raw+`
`+r.join(`
`),L=this.blockquote(v);o[o.length-1]=L,n=n.substring(0,n.length-$.raw.length)+L.raw,s=s.substring(0,s.length-$.text.length)+L.text;break}else if(k?.type==="list"){let $=k,v=$.raw+`
`+r.join(`
`),L=this.list(v);o[o.length-1]=L,n=n.substring(0,n.length-k.raw.length)+L.raw,s=s.substring(0,s.length-$.raw.length)+L.raw,r=v.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:n,tokens:o,text:s}}}list(t){let e=this.rules.block.list.exec(t);if(e){let r=e[1].trim(),n=r.length>1,s={type:"list",raw:"",ordered:n,start:n?+r.slice(0,-1):"",loose:!1,items:[]};r=n?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=n?r:"[*+-]");let o=this.rules.other.listItemRegex(r),i=!1;for(;t;){let a=!1,d="",h="";if(!(e=o.exec(t))||this.rules.block.hr.test(t))break;d=e[0],t=t.substring(d.length);let _=e[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,L=>" ".repeat(3*L.length)),k=t.split(`
`,1)[0],$=!_.trim(),v=0;if(this.options.pedantic?(v=2,h=_.trimStart()):$?v=e[1].length+1:(v=e[2].search(this.rules.other.nonSpaceChar),v=v>4?1:v,h=_.slice(v),v+=e[1].length),$&&this.rules.other.blankLine.test(k)&&(d+=k+`
`,t=t.substring(k.length+1),a=!0),!a){let L=this.rules.other.nextBulletRegex(v),P=this.rules.other.hrRegex(v),B=this.rules.other.fencesBeginRegex(v),q=this.rules.other.headingBeginRegex(v),G=this.rules.other.htmlBeginRegex(v);for(;t;){let N=t.split(`
`,1)[0],E;if(k=N,this.options.pedantic?(k=k.replace(this.rules.other.listReplaceNesting,"  "),E=k):E=k.replace(this.rules.other.tabCharGlobal,"    "),B.test(k)||q.test(k)||G.test(k)||L.test(k)||P.test(k))break;if(E.search(this.rules.other.nonSpaceChar)>=v||!k.trim())h+=`
`+E.slice(v);else{if($||_.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||B.test(_)||q.test(_)||P.test(_))break;h+=`
`+k}!$&&!k.trim()&&($=!0),d+=N+`
`,t=t.substring(N.length+1),_=E.slice(v)}}s.loose||(i?s.loose=!0:this.rules.other.doubleBlankLine.test(d)&&(i=!0)),s.items.push({type:"list_item",raw:d,task:!!this.options.gfm&&this.rules.other.listIsTask.test(h),loose:!1,text:h,tokens:[]}),s.raw+=d}let l=s.items.at(-1);if(l)l.raw=l.raw.trimEnd(),l.text=l.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let a of s.items){if(this.lexer.state.top=!1,a.tokens=this.lexer.blockTokens(a.text,[]),a.task){if(a.text=a.text.replace(this.rules.other.listReplaceTask,""),a.tokens[0]?.type==="text"||a.tokens[0]?.type==="paragraph"){a.tokens[0].raw=a.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),a.tokens[0].text=a.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let h=this.lexer.inlineQueue.length-1;h>=0;h--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[h].src)){this.lexer.inlineQueue[h].src=this.lexer.inlineQueue[h].src.replace(this.rules.other.listReplaceTask,"");break}}let d=this.rules.other.listTaskCheckbox.exec(a.raw);if(d){let h={type:"checkbox",raw:d[0]+" ",checked:d[0]!=="[ ]"};a.checked=h.checked,s.loose?a.tokens[0]&&["paragraph","text"].includes(a.tokens[0].type)&&"tokens"in a.tokens[0]&&a.tokens[0].tokens?(a.tokens[0].raw=h.raw+a.tokens[0].raw,a.tokens[0].text=h.raw+a.tokens[0].text,a.tokens[0].tokens.unshift(h)):a.tokens.unshift({type:"paragraph",raw:h.raw,text:h.raw,tokens:[h]}):a.tokens.unshift(h)}}if(!s.loose){let d=a.tokens.filter(_=>_.type==="space"),h=d.length>0&&d.some(_=>this.rules.other.anyLine.test(_.raw));s.loose=h}}if(s.loose)for(let a of s.items){a.loose=!0;for(let d of a.tokens)d.type==="text"&&(d.type="paragraph")}return s}}html(t){let e=this.rules.block.html.exec(t);if(e)return{type:"html",block:!0,raw:e[0],pre:e[1]==="pre"||e[1]==="script"||e[1]==="style",text:e[0]}}def(t){let e=this.rules.block.def.exec(t);if(e){let r=e[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),n=e[2]?e[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=e[3]?e[3].substring(1,e[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):e[3];return{type:"def",tag:r,raw:e[0],href:n,title:s}}}table(t){let e=this.rules.block.table.exec(t);if(!e||!this.rules.other.tableDelimiter.test(e[2]))return;let r=lo(e[1]),n=e[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=e[3]?.trim()?e[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:e[0],header:[],align:[],rows:[]};if(r.length===n.length){for(let i of n)this.rules.other.tableAlignRight.test(i)?o.align.push("right"):this.rules.other.tableAlignCenter.test(i)?o.align.push("center"):this.rules.other.tableAlignLeft.test(i)?o.align.push("left"):o.align.push(null);for(let i=0;i<r.length;i++)o.header.push({text:r[i],tokens:this.lexer.inline(r[i]),header:!0,align:o.align[i]});for(let i of s)o.rows.push(lo(i,o.header.length).map((l,a)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:o.align[a]})));return o}}lheading(t){let e=this.rules.block.lheading.exec(t);if(e)return{type:"heading",raw:e[0],depth:e[2].charAt(0)==="="?1:2,text:e[1],tokens:this.lexer.inline(e[1])}}paragraph(t){let e=this.rules.block.paragraph.exec(t);if(e){let r=e[1].charAt(e[1].length-1)===`
`?e[1].slice(0,-1):e[1];return{type:"paragraph",raw:e[0],text:r,tokens:this.lexer.inline(r)}}}text(t){let e=this.rules.block.text.exec(t);if(e)return{type:"text",raw:e[0],text:e[0],tokens:this.lexer.inline(e[0])}}escape(t){let e=this.rules.inline.escape.exec(t);if(e)return{type:"escape",raw:e[0],text:e[1]}}tag(t){let e=this.rules.inline.tag.exec(t);if(e)return!this.lexer.state.inLink&&this.rules.other.startATag.test(e[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(e[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(e[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(e[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:e[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:e[0]}}link(t){let e=this.rules.inline.link.exec(t);if(e){let r=e[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;let o=cr(r.slice(0,-1),"\\");if((r.length-o.length)%2===0)return}else{let o=ol(e[2],"()");if(o===-2)return;if(o>-1){let i=(e[0].indexOf("!")===0?5:4)+e[1].length+o;e[2]=e[2].substring(0,o),e[0]=e[0].substring(0,i).trim(),e[3]=""}}let n=e[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(n);o&&(n=o[1],s=o[3])}else s=e[3]?e[3].slice(1,-1):"";return n=n.trim(),this.rules.other.startAngleBracket.test(n)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?n=n.slice(1):n=n.slice(1,-1)),co(e,{href:n&&n.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},e[0],this.lexer,this.rules)}}reflink(t,e){let r;if((r=this.rules.inline.reflink.exec(t))||(r=this.rules.inline.nolink.exec(t))){let n=(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=e[n.toLowerCase()];if(!s){let o=r[0].charAt(0);return{type:"text",raw:o,text:o}}return co(r,s,r[0],this.lexer,this.rules)}}emStrong(t,e,r=""){let n=this.rules.inline.emStrongLDelim.exec(t);if(!(!n||n[3]&&r.match(this.rules.other.unicodeAlphaNumeric))&&(!(n[1]||n[2])||!r||this.rules.inline.punctuation.exec(r))){let s=[...n[0]].length-1,o,i,l=s,a=0,d=n[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(d.lastIndex=0,e=e.slice(-1*t.length+s);(n=d.exec(e))!=null;){if(o=n[1]||n[2]||n[3]||n[4]||n[5]||n[6],!o)continue;if(i=[...o].length,n[3]||n[4]){l+=i;continue}else if((n[5]||n[6])&&s%3&&!((s+i)%3)){a+=i;continue}if(l-=i,l>0)continue;i=Math.min(i,i+l+a);let h=[...n[0]][0].length,_=t.slice(0,s+n.index+h+i);if(Math.min(s,i)%2){let $=_.slice(1,-1);return{type:"em",raw:_,text:$,tokens:this.lexer.inlineTokens($)}}let k=_.slice(2,-2);return{type:"strong",raw:_,text:k,tokens:this.lexer.inlineTokens(k)}}}}codespan(t){let e=this.rules.inline.code.exec(t);if(e){let r=e[2].replace(this.rules.other.newLineCharGlobal," "),n=this.rules.other.nonSpaceChar.test(r),s=this.rules.other.startingSpaceChar.test(r)&&this.rules.other.endingSpaceChar.test(r);return n&&s&&(r=r.substring(1,r.length-1)),{type:"codespan",raw:e[0],text:r}}}br(t){let e=this.rules.inline.br.exec(t);if(e)return{type:"br",raw:e[0]}}del(t){let e=this.rules.inline.del.exec(t);if(e)return{type:"del",raw:e[0],text:e[2],tokens:this.lexer.inlineTokens(e[2])}}autolink(t){let e=this.rules.inline.autolink.exec(t);if(e){let r,n;return e[2]==="@"?(r=e[1],n="mailto:"+r):(r=e[1],n=r),{type:"link",raw:e[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}url(t){let e;if(e=this.rules.inline.url.exec(t)){let r,n;if(e[2]==="@")r=e[0],n="mailto:"+r;else{let s;do s=e[0],e[0]=this.rules.inline._backpedal.exec(e[0])?.[0]??"";while(s!==e[0]);r=e[0],e[1]==="www."?n="http://"+e[0]:n=e[0]}return{type:"link",raw:e[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(t){let e=this.rules.inline.text.exec(t);if(e){let r=this.lexer.state.inRawBlock;return{type:"text",raw:e[0],text:e[0],escaped:r}}}},it=class Tn{constructor(e){ue(this,"tokens");ue(this,"options");ue(this,"state");ue(this,"inlineQueue");ue(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=e||Rt,this.options.tokenizer=this.options.tokenizer||new Nr,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let r={other:Ue,block:Dr.normal,inline:lr.normal};this.options.pedantic?(r.block=Dr.pedantic,r.inline=lr.pedantic):this.options.gfm&&(r.block=Dr.gfm,this.options.breaks?r.inline=lr.breaks:r.inline=lr.gfm),this.tokenizer.rules=r}static get rules(){return{block:Dr,inline:lr}}static lex(e,r){return new Tn(r).lex(e)}static lexInline(e,r){return new Tn(r).inlineTokens(e)}lex(e){e=e.replace(Ue.carriageReturn,`
`),this.blockTokens(e,this.tokens);for(let r=0;r<this.inlineQueue.length;r++){let n=this.inlineQueue[r];this.inlineTokens(n.src,n.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(e,r=[],n=!1){for(this.options.pedantic&&(e=e.replace(Ue.tabCharGlobal,"    ").replace(Ue.spaceLine,""));e;){let s;if(this.options.extensions?.block?.some(i=>(s=i.call({lexer:this},e,r))?(e=e.substring(s.raw.length),r.push(s),!0):!1))continue;if(s=this.tokenizer.space(e)){e=e.substring(s.raw.length);let i=r.at(-1);s.raw.length===1&&i!==void 0?i.raw+=`
`:r.push(s);continue}if(s=this.tokenizer.code(e)){e=e.substring(s.raw.length);let i=r.at(-1);i?.type==="paragraph"||i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+s.raw,i.text+=`
`+s.text,this.inlineQueue.at(-1).src=i.text):r.push(s);continue}if(s=this.tokenizer.fences(e)){e=e.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.heading(e)){e=e.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.hr(e)){e=e.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.blockquote(e)){e=e.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.list(e)){e=e.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.html(e)){e=e.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.def(e)){e=e.substring(s.raw.length);let i=r.at(-1);i?.type==="paragraph"||i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+s.raw,i.text+=`
`+s.raw,this.inlineQueue.at(-1).src=i.text):this.tokens.links[s.tag]||(this.tokens.links[s.tag]={href:s.href,title:s.title},r.push(s));continue}if(s=this.tokenizer.table(e)){e=e.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.lheading(e)){e=e.substring(s.raw.length),r.push(s);continue}let o=e;if(this.options.extensions?.startBlock){let i=1/0,l=e.slice(1),a;this.options.extensions.startBlock.forEach(d=>{a=d.call({lexer:this},l),typeof a=="number"&&a>=0&&(i=Math.min(i,a))}),i<1/0&&i>=0&&(o=e.substring(0,i+1))}if(this.state.top&&(s=this.tokenizer.paragraph(o))){let i=r.at(-1);n&&i?.type==="paragraph"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+s.raw,i.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):r.push(s),n=o.length!==e.length,e=e.substring(s.raw.length);continue}if(s=this.tokenizer.text(e)){e=e.substring(s.raw.length);let i=r.at(-1);i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+s.raw,i.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):r.push(s);continue}if(e){let i="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(i);break}else throw new Error(i)}}return this.state.top=!0,r}inline(e,r=[]){return this.inlineQueue.push({src:e,tokens:r}),r}inlineTokens(e,r=[]){let n=e,s=null;if(this.tokens.links){let a=Object.keys(this.tokens.links);if(a.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(n))!=null;)a.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(n=n.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(n))!=null;)n=n.slice(0,s.index)+"++"+n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(n))!=null;)o=s[2]?s[2].length:0,n=n.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let i=!1,l="";for(;e;){i||(l=""),i=!1;let a;if(this.options.extensions?.inline?.some(h=>(a=h.call({lexer:this},e,r))?(e=e.substring(a.raw.length),r.push(a),!0):!1))continue;if(a=this.tokenizer.escape(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.tag(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.link(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(a.raw.length);let h=r.at(-1);a.type==="text"&&h?.type==="text"?(h.raw+=a.raw,h.text+=a.text):r.push(a);continue}if(a=this.tokenizer.emStrong(e,n,l)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.codespan(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.br(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.del(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.autolink(e)){e=e.substring(a.raw.length),r.push(a);continue}if(!this.state.inLink&&(a=this.tokenizer.url(e))){e=e.substring(a.raw.length),r.push(a);continue}let d=e;if(this.options.extensions?.startInline){let h=1/0,_=e.slice(1),k;this.options.extensions.startInline.forEach($=>{k=$.call({lexer:this},_),typeof k=="number"&&k>=0&&(h=Math.min(h,k))}),h<1/0&&h>=0&&(d=e.substring(0,h+1))}if(a=this.tokenizer.inlineText(d)){e=e.substring(a.raw.length),a.raw.slice(-1)!=="_"&&(l=a.raw.slice(-1)),i=!0;let h=r.at(-1);h?.type==="text"?(h.raw+=a.raw,h.text+=a.text):r.push(a);continue}if(e){let h="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(h);break}else throw new Error(h)}}return r}},Pr=class{constructor(t){ue(this,"options");ue(this,"parser");this.options=t||Rt}space(t){return""}code({text:t,lang:e,escaped:r}){let n=(e||"").match(Ue.notSpaceStart)?.[0],s=t.replace(Ue.endingNewline,"")+`
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
`}strong({tokens:t}){return`<strong>${this.parser.parseInline(t)}</strong>`}em({tokens:t}){return`<em>${this.parser.parseInline(t)}</em>`}codespan({text:t}){return`<code>${ut(t,!0)}</code>`}br(t){return"<br>"}del({tokens:t}){return`<del>${this.parser.parseInline(t)}</del>`}link({href:t,title:e,tokens:r}){let n=this.parser.parseInline(r),s=ao(t);if(s===null)return n;t=s;let o='<a href="'+t+'"';return e&&(o+=' title="'+ut(e)+'"'),o+=">"+n+"</a>",o}image({href:t,title:e,text:r,tokens:n}){n&&(r=this.parser.parseInline(n,this.parser.textRenderer));let s=ao(t);if(s===null)return ut(r);t=s;let o=`<img src="${t}" alt="${r}"`;return e&&(o+=` title="${ut(e)}"`),o+=">",o}text(t){return"tokens"in t&&t.tokens?this.parser.parseInline(t.tokens):"escaped"in t&&t.escaped?t.text:ut(t.text)}},Nn=class{strong({text:t}){return t}em({text:t}){return t}codespan({text:t}){return t}del({text:t}){return t}html({text:t}){return t}text({text:t}){return t}link({text:t}){return""+t}image({text:t}){return""+t}br(){return""}checkbox({raw:t}){return t}},at=class An{constructor(e){ue(this,"options");ue(this,"renderer");ue(this,"textRenderer");this.options=e||Rt,this.options.renderer=this.options.renderer||new Pr,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Nn}static parse(e,r){return new An(r).parse(e)}static parseInline(e,r){return new An(r).parseInline(e)}parse(e){let r="";for(let n=0;n<e.length;n++){let s=e[n];if(this.options.extensions?.renderers?.[s.type]){let i=s,l=this.options.extensions.renderers[i.type].call({parser:this},i);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(i.type)){r+=l||"";continue}}let o=s;switch(o.type){case"space":{r+=this.renderer.space(o);break}case"hr":{r+=this.renderer.hr(o);break}case"heading":{r+=this.renderer.heading(o);break}case"code":{r+=this.renderer.code(o);break}case"table":{r+=this.renderer.table(o);break}case"blockquote":{r+=this.renderer.blockquote(o);break}case"list":{r+=this.renderer.list(o);break}case"checkbox":{r+=this.renderer.checkbox(o);break}case"html":{r+=this.renderer.html(o);break}case"def":{r+=this.renderer.def(o);break}case"paragraph":{r+=this.renderer.paragraph(o);break}case"text":{r+=this.renderer.text(o);break}default:{let i='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return r}parseInline(e,r=this.renderer){let n="";for(let s=0;s<e.length;s++){let o=e[s];if(this.options.extensions?.renderers?.[o.type]){let l=this.options.extensions.renderers[o.type].call({parser:this},o);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){n+=l||"";continue}}let i=o;switch(i.type){case"escape":{n+=r.text(i);break}case"html":{n+=r.html(i);break}case"link":{n+=r.link(i);break}case"image":{n+=r.image(i);break}case"checkbox":{n+=r.checkbox(i);break}case"strong":{n+=r.strong(i);break}case"em":{n+=r.em(i);break}case"codespan":{n+=r.codespan(i);break}case"br":{n+=r.br(i);break}case"del":{n+=r.del(i);break}case"text":{n+=r.text(i);break}default:{let l='Token with "'+i.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return n}},Or,dr=(Or=class{constructor(t){ue(this,"options");ue(this,"block");this.options=t||Rt}preprocess(t){return t}postprocess(t){return t}processAllTokens(t){return t}emStrongMask(t){return t}provideLexer(){return this.block?it.lex:it.lexInline}provideParser(){return this.block?at.parse:at.parseInline}},ue(Or,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),ue(Or,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),Or),al=class{constructor(...t){ue(this,"defaults",En());ue(this,"options",this.setOptions);ue(this,"parse",this.parseMarkdown(!0));ue(this,"parseInline",this.parseMarkdown(!1));ue(this,"Parser",at);ue(this,"Renderer",Pr);ue(this,"TextRenderer",Nn);ue(this,"Lexer",it);ue(this,"Tokenizer",Nr);ue(this,"Hooks",dr);this.use(...t)}walkTokens(t,e){let r=[];for(let n of t)switch(r=r.concat(e.call(this,n)),n.type){case"table":{let s=n;for(let o of s.header)r=r.concat(this.walkTokens(o.tokens,e));for(let o of s.rows)for(let i of o)r=r.concat(this.walkTokens(i.tokens,e));break}case"list":{let s=n;r=r.concat(this.walkTokens(s.items,e));break}default:{let s=n;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let i=s[o].flat(1/0);r=r.concat(this.walkTokens(i,e))}):s.tokens&&(r=r.concat(this.walkTokens(s.tokens,e)))}}return r}use(...t){let e=this.defaults.extensions||{renderers:{},childTokens:{}};return t.forEach(r=>{let n={...r};if(n.async=this.defaults.async||n.async||!1,r.extensions&&(r.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=e.renderers[s.name];o?e.renderers[s.name]=function(...i){let l=s.renderer.apply(this,i);return l===!1&&(l=o.apply(this,i)),l}:e.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=e[s.level];o?o.unshift(s.tokenizer):e[s.level]=[s.tokenizer],s.start&&(s.level==="block"?e.startBlock?e.startBlock.push(s.start):e.startBlock=[s.start]:s.level==="inline"&&(e.startInline?e.startInline.push(s.start):e.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(e.childTokens[s.name]=s.childTokens)}),n.extensions=e),r.renderer){let s=this.defaults.renderer||new Pr(this.defaults);for(let o in r.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let i=o,l=r.renderer[i],a=s[i];s[i]=(...d)=>{let h=l.apply(s,d);return h===!1&&(h=a.apply(s,d)),h||""}}n.renderer=s}if(r.tokenizer){let s=this.defaults.tokenizer||new Nr(this.defaults);for(let o in r.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let i=o,l=r.tokenizer[i],a=s[i];s[i]=(...d)=>{let h=l.apply(s,d);return h===!1&&(h=a.apply(s,d)),h}}n.tokenizer=s}if(r.hooks){let s=this.defaults.hooks||new dr;for(let o in r.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let i=o,l=r.hooks[i],a=s[i];dr.passThroughHooks.has(o)?s[i]=d=>{if(this.defaults.async&&dr.passThroughHooksRespectAsync.has(o))return(async()=>{let _=await l.call(s,d);return a.call(s,_)})();let h=l.call(s,d);return a.call(s,h)}:s[i]=(...d)=>{if(this.defaults.async)return(async()=>{let _=await l.apply(s,d);return _===!1&&(_=await a.apply(s,d)),_})();let h=l.apply(s,d);return h===!1&&(h=a.apply(s,d)),h}}n.hooks=s}if(r.walkTokens){let s=this.defaults.walkTokens,o=r.walkTokens;n.walkTokens=function(i){let l=[];return l.push(o.call(this,i)),s&&(l=l.concat(s.call(this,i))),l}}this.defaults={...this.defaults,...n}}),this}setOptions(t){return this.defaults={...this.defaults,...t},this}lexer(t,e){return it.lex(t,e??this.defaults)}parser(t,e){return at.parse(t,e??this.defaults)}parseMarkdown(t){return(e,r)=>{let n={...r},s={...this.defaults,...n},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&n.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof e>"u"||e===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof e!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(e)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=t),s.async)return(async()=>{let i=s.hooks?await s.hooks.preprocess(e):e,l=await(s.hooks?await s.hooks.provideLexer():t?it.lex:it.lexInline)(i,s),a=s.hooks?await s.hooks.processAllTokens(l):l;s.walkTokens&&await Promise.all(this.walkTokens(a,s.walkTokens));let d=await(s.hooks?await s.hooks.provideParser():t?at.parse:at.parseInline)(a,s);return s.hooks?await s.hooks.postprocess(d):d})().catch(o);try{s.hooks&&(e=s.hooks.preprocess(e));let i=(s.hooks?s.hooks.provideLexer():t?it.lex:it.lexInline)(e,s);s.hooks&&(i=s.hooks.processAllTokens(i)),s.walkTokens&&this.walkTokens(i,s.walkTokens);let l=(s.hooks?s.hooks.provideParser():t?at.parse:at.parseInline)(i,s);return s.hooks&&(l=s.hooks.postprocess(l)),l}catch(i){return o(i)}}}onError(t,e){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,t){let n="<p>An error occurred:</p><pre>"+ut(r.message+"",!0)+"</pre>";return e?Promise.resolve(n):n}if(e)return Promise.reject(r);throw r}}},Ct=new al;function ae(t,e){return Ct.parse(t,e)}ae.options=ae.setOptions=function(t){return Ct.setOptions(t),ae.defaults=Ct.defaults,uo(ae.defaults),ae};ae.getDefaults=En;ae.defaults=Rt;ae.use=function(...t){return Ct.use(...t),ae.defaults=Ct.defaults,uo(ae.defaults),ae};ae.walkTokens=function(t,e){return Ct.walkTokens(t,e)};ae.parseInline=Ct.parseInline;ae.Parser=at;ae.parser=at.parse;ae.Renderer=Pr;ae.TextRenderer=Nn;ae.Lexer=it;ae.lexer=it.lex;ae.Tokenizer=Nr;ae.Hooks=dr;ae.parse=ae;var gd=ae.options,md=ae.setOptions,_d=ae.use,bd=ae.walkTokens,wd=ae.parseInline;var kd=at.parse,yd=it.lex;function vo(t){let e=ae.parse(t),r=eo.sanitize(e);return no(r)}function ll(t){return String(t||"").replace(/^docs\/(superpowers\/)?/,"")}function $o(t,e){let r=e.getWorkspacePath,n=e.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",i="",l="";function a(v){v.key==="Escape"&&s&&(v.preventDefault(),k())}document.addEventListener("keydown",a);function d(){return s?u`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>k()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${ll(s)}</span
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
            ${o==="loading"?u`<div class="mv__status">불러오는 중…</div>`:o==="error"?u`<div class="mv__status mv__status--error">
                    ${l||"\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}
                  </div>`:vo(i)}
          </div>
        </div>
      </div>
    `:u``}function h(){le(d(),t)}async function _(v){s=v,o="loading",i="",l="",h();let L=r?r():"";if(!L){o="error",l="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",h();return}if(!n){o="error",l="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",h();return}let P="/api/doc?workspace="+encodeURIComponent(L)+"&path="+encodeURIComponent(v);try{let B=await n(P),q=await B.json().catch(()=>({}));if(!B.ok||!q||q.ok!==!0){o="error",l="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(q&&q.error||B.status)+")",h();return}i=String(q.content||""),o="ready",h()}catch{o="error",l="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",h()}}function k(){s=null,le(u``,t)}function $(){document.removeEventListener("keydown",a),k()}return{open:_,close:k,destroy:$}}var cl={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function dl(t){if(typeof t!="number"||!Number.isFinite(t))return"";let e=new Date(t),r=String(e.getHours()).padStart(2,"0"),n=String(e.getMinutes()).padStart(2,"0");return`${r}:${n}`}function xo(t,e={}){let r=Array.isArray(t)?t:[];if(r.length===0)return u`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let n=new Set;for(let i of r)i&&typeof i.resumed_from=="string"&&i.resumed_from.length>0&&n.add(i.resumed_from);let s=i=>{if(!(i.status==="failed"||i.status==="orphaned"))return"";let a=typeof i.session_id=="string"&&i.session_id.length>0,d=n.has(i.attempt_id),h=a&&!d,_=a?d?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return u`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${i.attempt_id}
      ?disabled=${!h}
      title=${_}
      @click=${k=>{k.stopPropagation(),h&&e.onResume&&e.onResume(i.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},o=i=>{if(!(i.status==="failed"||i.status==="orphaned")||typeof i.cause!="string"||i.cause==="")return"";let a=i.cause_detail,d=a&&typeof a.reason=="string"&&a.reason.length>0?typeof a.command=="string"&&a.command.length>0?`${a.reason} \xB7 ${a.command}`:a.reason:i.cause;return u`<div class="detail-session__cause" title=${d}>
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
  `}var ul=["open","in_progress","deferred","resolved","closed"],pl=[0,1,2,3,4];function So(t,e){let r=e.issueStores,n=e.onClose,s=e.transport,o=e.onNavigate,i=e.queueStore,l=e.sessionLogStore,a=null,d=null,h={},_=!1,k=!1,$="",v="",L="";function P(){_=!1,k=!1,$="",v="",L=""}let B=document.createElement("div");B.className="md-viewer-root",document.body.appendChild(B);let q=$o(B,{getWorkspacePath:e.getWorkspacePath||(()=>"")}),G=document.createElement("div");G.className="session-log-root",document.body.appendChild(G);let N=Ar(G,{transport:s?(g,A)=>Promise.resolve(s(g,A)):void 0,sessionLogStore:l});function E(){if(!i||!a)return[];let g=i.get();return(g&&g.attempts?Object.values(g.attempts):[]).filter(T=>T&&T.bead_id===a).sort((T,R)=>(R.started_at||0)-(T.started_at||0)).map(T=>({attempt_id:T.attempt_id,bead_id:T.bead_id,status:T.status,started_at:typeof T.started_at=="number"?T.started_at:null,runner:T.runner||null,model:T.model||null,session_id:T.session_id||null,resumed_from:T.resumed_from||null,dismissed_at:typeof T.dismissed_at=="number"?T.dismissed_at:null,cause:typeof T.cause=="string"?T.cause:null,cause_detail:T.cause_detail||null}))}function C(g){let A=i?i.get():null,T=A&&A.attempts?A.attempts[g]:null;N.open({attempt_id:g,meta:T?{runner:T.runner||void 0,model:T.model||void 0,effort:T.effort||void 0,status:T.status||void 0,session_id:T.session_id||void 0}:{}})}async function x(g){if(!s||!g)return;let A=()=>{let R=i?i.get():null;return R&&typeof R.revision=="number"?R.revision:0},T=await s("worker-attempt-resume",{attempt_id:g,expected_revision:A()});if(T&&T.conflict){let R=T.queue&&typeof T.queue.revision=="number"?T.queue.revision:A();T=await s("worker-attempt-resume",{attempt_id:g,expected_revision:R})}T&&T.resumed===!1&&!T.conflict&&T.reason&&Q(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${T.reason}`,"error",2400)}let m={onOpen:C,onResume:x};function O(){let g=i?i.get():null,A=g&&g.exec_defaults;return A&&typeof A=="object"?A:{}}let F=null;r&&r.subscribe&&(F=r.subscribe(()=>ne()));let H=null;i&&typeof i.subscribe=="function"&&(H=i.subscribe(()=>{a&&y()}));function V(g){g.key==="Escape"&&a&&(g.preventDefault(),n())}document.addEventListener("keydown",V);function ne(){if(a){if(r&&typeof r.snapshotFor=="function"){let g=r.snapshotFor("detail:"+a)||[];d=g.find(T=>T&&T.id===a)||g[0]||d}y()}}function se(g){qt(g).then(A=>{A?Q("\uBCF5\uC0AC\uB428","success",1200):Q("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function $e(g){g.preventDefault(),g.stopPropagation(),a&&se(a)}function Ge(g,A){g.preventDefault(),g.stopPropagation(),se(A)}function ze(g,A){g.preventDefault(),g.stopPropagation(),q.open(A)}function ke(g,A){h[g]=A,y(),!(!s||!a)&&Promise.resolve(s("update-exec-settings",{id:a,key:g,value:A})).catch(()=>{Q("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}async function xe(g,A,T){if(!s||!a)return!1;try{let R=await Promise.resolve(s(g,A)),K=Array.isArray(R)?R[0]:R;return K&&typeof K=="object"&&K.id?(d=K,!0):(Q(T,"error"),!1)}catch{return Q(T,"error"),!1}}function je(g){setTimeout(()=>{try{let A=t.querySelector(g);A&&typeof A.focus=="function"&&A.focus()}catch{}},0)}function ce(){_=!0,$=d&&d.title||"",y(),je('.detail-edit__input[data-edit="title"]')}function lt(g){$=g.target.value}function pe(){_=!1,$="",y()}function Ye(){xe("edit-text",{id:a,field:"title",value:$},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(A=>{A&&(_=!1,$=""),y()})}function ie(){k=!0,v=d&&d.description||"",y(),je('.detail-edit__textarea[data-edit="description"]')}function Me(g){v=g.target.value}function Qe(){k=!1,v="",y()}function Se(){xe("edit-text",{id:a,field:"description",value:v},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(A=>{A&&(k=!1,v=""),y()})}function Ee(g,A,T,R){if(g.key==="Escape"){g.stopPropagation(),T();return}g.key==="Enter"&&(!R||g.ctrlKey||g.metaKey)&&(g.preventDefault(),A())}function ye(g){let A=g.target.value;xe("update-status",{id:a,status:A},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>y())}function Ne(g){let A=Number(g.target.value);xe("update-priority",{id:a,priority:A},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>y())}function Ve(g){L=g.target.value}function Ce(){let g=L.trim();g.length!==0&&xe("label-add",{id:a,label:g},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(A=>{A&&(L=""),y()})}function de(g){if(g.key==="Escape"){g.stopPropagation(),L="",y();return}g.key==="Enter"&&(g.preventDefault(),Ce())}function Re(g){xe("label-remove",{id:a,label:g},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>y())}let He={onCopyPath:Ge,onOpenDoc:ze},me={onChange:ke};function Te(g){return typeof g=="string"?g:g&&typeof g=="object"?String(g.id||g.to||g.issue_id||g.depends_on||""):""}function Pe(g){switch(g&&typeof g=="object"?String(g.dependency_type||g.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function Oe(g){let T=(Array.isArray(g.dependencies)?g.dependencies:[]).map(R=>({id:Te(R),icon:Pe(R)})).filter(R=>R.id.length>0);return u`
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
    `}function Ke(g){let A=g.metadata||{},T=g.workflow||{},R=T.stages||{},K=R.spec&&R.spec.stale,te=R.impl&&R.impl.stale,z=T.route_source==="derived",_e=T.route||A.route||"\u2014";return u`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${z?" detail-kv__v--derived":""}"
          title=${z?"route \uCD94\uB860\uAC12 (metadata \uBBF8\uD540)":"route"}
          >${z&&T.route?`${_e} ? (\uCD94\uB860)`:_e}</span
        >
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">spec_review</span>
        <span class="detail-kv__v"
          >${A.spec_review||"\uC5C6\uC74C"}${K?" \xB7 stale":""}</span
        >
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">impl_review</span>
        <span class="detail-kv__v"
          >${A.impl_review||"\uC5C6\uC74C"}${te?" \xB7 stale":""}</span
        >
      </div>
      ${A.pr_url?u`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${A.pr_url}</span>
          </div>`:""}
    `}let Je={route:["spec_backed","full_plan"]};async function ge(g,A){let T=A.target.value;if(g==="route"&&d&&d.metadata&&d.metadata.route==="full_plan"&&T!=="full_plan"&&!window.confirm(`full_plan \u2192 ${T||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){y();return}await xe("update-workflow-meta",{id:a,key:g,value:T},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),y()}function Le(g){let A=g.metadata||{};return u` ${((R,K)=>{let te=Je[R],z=typeof A[R]=="string"?A[R]:"";return u`<div class="detail-kv">
        <span class="detail-kv__k">${R}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${R}
          data-edit=${`wfmeta-${R}`}
          @change=${_e=>ge(R,_e)}
        >
          <option value="" ?selected=${!te.includes(z)}>
            ${K}
          </option>
          ${te.map(_e=>u`<option value=${_e} ?selected=${z===_e}>${_e}</option>`)}
        </select>
      </div>`})("route","(\uBBF8\uC124\uC815 \xB7 \uCD94\uB860)")} `}function Ae(g){return _?u`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${$}
            @input=${lt}
            @keydown=${A=>Ee(A,Ye,pe,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${Ye}
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
    `}function Ie(g){let A=ft(g.created_at),T=ft(g.updated_at);return!A&&!T?u``:u`
      ${A?u`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${A}</span>
          </div>`:""}
      ${T?u`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${T}</span>
          </div>`:""}
    `}function I(g,A){return u`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${ye}
        >
          ${ul.map(T=>u`<option value=${T} ?selected=${T===g}>${T}</option>`)}
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
          ${pl.map(T=>u`<option value=${String(T)} ?selected=${T===A}>
                P${T}
              </option>`)}
        </select>
      </div>
    `}function M(g){return u`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${k?"":u`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${ie}
            >
              ✎
            </button>`}
      </div>
      ${k?u`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${v}
              @input=${Me}
              @keydown=${A=>Ee(A,Se,Qe,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${Se}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${Qe}
              >
                취소
              </button>
            </div>
          </div>`:u`<div class="detail-overlay__desc">
            ${g||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function c(g){let A=Array.isArray(g.labels)?g.labels:[];return u`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${A.map(T=>u`<span class="detail-label-chip"
              >${T}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${T}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+T}
                @click=${()=>Re(T)}
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
            @input=${Ve}
            @keydown=${de}
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
    `}function f(){if(!a)return u``;let g=d||{},A=String(g.id||a),T=g.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",R=g.status||"open",K=typeof g.priority=="number"?Math.max(0,Math.min(4,g.priority)):"",te=g.description||"",z={...g,metadata:{...g.metadata||{},...h}};return u`
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
            ${A}
          </button>
          ${Ae(T)} ${I(R,K)}
          ${Ie(g)} ${M(te)}
          ${c(g)} ${Oe(g)}
          ${Ke(g)} ${Le(g)}
          ${qs(g,He)}
          ${Us(z,me,O())}
          ${xo(E(),m)}
        </div>
      </div>
    `}function y(){le(f(),t)}return{load(g){g!==a&&(h={},P()),a=g,d=null,ne()},clear(){a=null,d=null,h={},P(),q.close(),N.close(),le(u``,t)},destroy(){F&&(F(),F=null),H&&(H(),H=null),document.removeEventListener("keydown",V),q.destroy(),B.parentNode&&B.parentNode.removeChild(B),N.destroy(),G.parentNode&&G.parentNode.removeChild(G),a=null,d=null,le(u``,t)}}}var fl=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function To(t,e){return on(t,e)?"shown":e.hidden_labels.includes(t)?"hidden_exact":"hidden_prefix"}function hl(t,e,r){if(!r)return{hidden_labels:e.hidden_labels.includes(t)?e.hidden_labels:[...e.hidden_labels,t],visible_labels:e.visible_labels.filter(o=>o!==t)};let n=e.hidden_labels.filter(o=>o!==t);return e.hidden_prefixes.some(o=>o.length>0&&t.startsWith(o))?{hidden_labels:n,visible_labels:e.visible_labels.includes(t)?e.visible_labels:[...e.visible_labels,t]}:{hidden_labels:n}}function Ao(t,e){let{policyStore:r,transport:n,labelOptions:s}=e,o=document.createElement("dialog");o.id="display-settings-dialog",o.className="display-settings",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),t.appendChild(o);let i="";async function l(C){let x=r.get();if(x)try{let m=await n("display-policy-set",{expected_revision:x.revision,policy:C(x)});a(m),m&&m.conflict&&m.policy&&(m=await n("display-policy-set",{expected_revision:m.policy.revision,policy:C(m.policy)}),a(m)),m&&m.conflict&&Q("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC","error",4e3)}catch{Q("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function a(C){C&&C.policy&&typeof C.policy=="object"&&r.set(C.policy)}function d(C){let x=r.get();if(!x)return;let m=To(C,x)!=="shown";l(O=>hl(C,O,m))}function h(){let C=i.trim();C.length!==0&&(i="",l(x=>x.hidden_prefixes.includes(C)?{hidden_prefixes:x.hidden_prefixes}:{hidden_prefixes:[...x.hidden_prefixes,C]}),P())}function _(C){l(x=>({hidden_prefixes:x.hidden_prefixes.filter(m=>m!==C)}))}function k(C){let x=r.get();if(!x)return;let m=x.chips[C]===!1;l(()=>({chips:{[C]:m}}))}function $(C){let x=s();return u`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">라벨 표시</h3>
        <p class="display-settings__hint">
          라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을
          누르면 그 라벨만 예외로 다시 표시됩니다.
        </p>
        ${x.length===0?u`<div class="display-settings__empty">라벨 없음</div>`:u`<div class="display-settings__pills">
              ${x.map(m=>{let O=To(m,C);return u`<button
                  type="button"
                  class=${`display-settings__pill display-settings__pill--${O}`}
                  data-label=${m}
                  data-state=${O}
                  @click=${()=>d(m)}
                >
                  ${m}
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
                  @click=${()=>_(x)}
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
    `}function L(C){return u`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">카드 표시 요소</h3>
        <div class="display-settings__toggles">
          ${fl.map(([x,m])=>u`<label class="display-settings__toggle">
                <input
                  type="checkbox"
                  data-chip=${x}
                  .checked=${C.chips[x]!==!1}
                  @change=${()=>k(x)}
                />
                <span>${m}</span>
              </label>`)}
        </div>
      </section>
    `}function P(){let C=r.get();le(u`
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
      `,o)}let B=!1,q=()=>{B=!1};o.addEventListener("close",q),o.addEventListener("cancel",q);let G=null;r.subscribe&&(G=r.subscribe(()=>{B&&P()}));function N(){B||(i="",B=!0,P(),typeof o.showModal=="function"?o.showModal():o.setAttribute("open",""))}function E(){B&&(B=!1,typeof o.close=="function"?o.close():o.removeAttribute("open"))}return{open:N,close:E,destroy(){B=!1,o.removeEventListener("close",q),o.removeEventListener("cancel",q),G&&(G(),G=null),o.remove()}}}function Eo(t){let e=document.createElement("dialog");e.id="fatal-error-dialog",e.setAttribute("role","alertdialog"),e.setAttribute("aria-modal","true"),e.innerHTML=`
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
    </div>`,t.appendChild(e);let r=e.querySelector("#fatal-error-title"),n=e.querySelector("#fatal-error-message"),s=e.querySelector("#fatal-error-detail"),o=e.querySelector("#fatal-error-reload"),i=e.querySelector("#fatal-error-close"),l=()=>{if(typeof e.close=="function")try{e.close()}catch{}e.removeAttribute("open")},a=(d,h,_="")=>{r&&(r.textContent=d||"Unexpected Error"),n&&(n.textContent=h||"An unrecoverable error occurred.");let k=typeof _=="string"?_.trim():"";if(s&&(k.length>0?(s.textContent=k,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof e.showModal=="function")try{e.showModal(),e.setAttribute("open","")}catch{e.setAttribute("open","")}else e.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),i&&i.addEventListener("click",()=>l()),e.addEventListener("cancel",d=>{d.preventDefault(),l()}),{open:a,close:l,getElement(){return e}}}function Co(t,e,r){let n=we("views:nav"),s=null;function o(a){return d=>{d.preventDefault(),n("click tab %s",a),r.gotoView(a)}}function i(){let d=e.getState().view==="worker"?"worker":"board";return u`
      <div class="ctl-tabs" aria-label="Primary">
        <a
          href="#/board"
          class="ctl-tab ${d==="board"?"is-active":""}"
          @click=${o("board")}
          >Board</a
        >
        <a
          href="#/worker"
          class="ctl-tab ${d==="worker"?"is-active":""}"
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
  `,t.appendChild(r);let n=r.querySelector("#new-issue-form"),s=r.querySelector("#new-title"),o=r.querySelector("#new-type"),i=r.querySelector("#new-priority"),l=r.querySelector("#new-labels"),a=r.querySelector("#new-description"),d=r.querySelector("#new-issue-error"),h=r.querySelector("#btn-cancel"),_=r.querySelector("#btn-create"),k=r.querySelector(".new-issue__close");function $(){o.replaceChildren();let E=document.createElement("option");E.value="",E.textContent="\u2014 Select \u2014",o.appendChild(E);for(let C of Ro){let x=document.createElement("option");x.value=C,x.textContent=Lo(C),o.appendChild(x)}i.replaceChildren();for(let C=0;C<=4;C+=1){let x=document.createElement("option");x.value=String(C);let m=Io[C]||"Medium";x.textContent=`${C} \u2013 ${m}`,i.appendChild(x)}}$();function v(){try{typeof r.close=="function"?r.close():r.removeAttribute("open")}catch{r.removeAttribute("open")}}function L(E){s.disabled=E,o.disabled=E,i.disabled=E,l.disabled=E,a.disabled=E,h.disabled=E,_.disabled=E,_.textContent=E?"Creating\u2026":"Create"}function P(){d.textContent=""}function B(E){d.textContent=E}function q(){try{let E=window.localStorage.getItem("beads-ui.new.type");E?o.value=E:o.value="";let C=window.localStorage.getItem("beads-ui.new.priority");C&&/^\d$/.test(C)?i.value=C:i.value="2"}catch{o.value="",i.value="2"}}function G(){let E=o.value||"",C=i.value||"";E.length>0&&window.localStorage.setItem("beads-ui.new.type",E),C.length>0&&window.localStorage.setItem("beads-ui.new.priority",C)}async function N(){P();let E=String(s.value||"").trim();if(E.length===0){B("Title is required"),s.focus();return}let C=Number(i.value||"2");if(!(C>=0&&C<=4)){B("Priority must be 0..4"),i.focus();return}let x=String(o.value||""),m=String(a.value||""),O={title:E};x.length>0&&(O.type=x),String(C).length>0&&(O.priority=C),m.length>0&&(O.description=m),L(!0);try{await e("create-issue",O)}catch{L(!1),B("Failed to create issue");return}G(),L(!1),v()}return r.addEventListener("cancel",E=>{E.preventDefault(),v()}),k.addEventListener("click",()=>v()),h.addEventListener("click",()=>v()),r.addEventListener("keydown",E=>{E.key==="Enter"&&(E.ctrlKey||E.metaKey)&&(E.preventDefault(),N())}),n.addEventListener("submit",E=>{E.preventDefault(),N()}),{open(){n.reset(),P(),q();try{"showModal"in r&&typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")}catch{r.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){v()}}}function Oo(t){if(typeof t!="number"||!Number.isFinite(t)||t<=0)return"";if(t<6e4)return`${Math.round(t/1e3)}\uCD08`;let e=t/6e4;return`${Number.isInteger(e)?e:Math.round(e*10)/10}\uBD84`}function Mo(t){return Array.isArray(t)?t.filter(e=>typeof e=="string").join(" "):""}var gl={deployed:{modifier:"ok",label:"\uC131\uACF5"},launched:{modifier:"launched",label:"\uBC1C\uC0AC\uB428"},failed:{modifier:"fail",label:"\uC2E4\uD328"}},ml=[{key:"orchestration_model",values:()=>un},{key:"orchestration_effort",values:()=>pn},{key:"review_model",values:()=>fn},{key:"impl_model",values:()=>hn}];function No(t,e){let{queueStore:r,transport:n,getWorkspacePath:s}=e,o=document.createElement("dialog");o.id="worker-exec-defaults-dialog",o.className="exec-defaults",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),t.appendChild(o);function i(){return r&&r.get()||{revision:0,exec_defaults:{}}}function l(){let m=i();return typeof m.revision=="number"?m.revision:0}function a(){let m=i().exec_defaults;return m&&typeof m=="object"?m:{}}function d(m){m&&m.queue&&r&&r.set(m.queue)}async function h(m,O){if(!n)return;let F={key:m,value:O||null};try{let H=await n("worker-queue-set-exec-default",{...F,expected_revision:l()});d(H),H&&H.conflict&&(H=await n("worker-queue-set-exec-default",{...F,expected_revision:l()}),d(H)),H&&H.conflict&&Q("\uC804\uC5ED \uC2E4\uD589 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC","error",4e3)}catch{Q("\uC804\uC5ED \uC2E4\uD589 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function _(m,O,F){let H=!!F&&!O.includes(F);return u`<div class="exec-defaults__row">
      <span class="exec-defaults__k">${m}</span>
      <select
        class="exec-defaults__sel"
        aria-label=${`\uC804\uC5ED ${m}`}
        data-key=${m}
        @change=${V=>{h(m,V.target.value)}}
      >
        <option value="" ?selected=${!F}>
          ${gn[m]||"(\uAE30\uBCF8)"}
        </option>
        ${H?u`<option value=${F} ?selected=${!0}>
              ${F} (비호환)
            </option>`:""}
        ${O.map(V=>u`<option value=${V} ?selected=${F===V}>${V}</option>`)}
      </select>
    </div>`}function k(){let m=i().workspace_info;return m&&typeof m=="object"?m:{}}function $(m,O){return u`<span
      class="exec-defaults__vd-badge exec-defaults__vd-badge--${m}"
      >${O}</span
    >`}function v(m){let O=m?Mo(m.cmd):"",F=m?Oo(m.timeout_ms):"",H=!!m&&m.source==="detected";return u`<div class="exec-defaults__vd-group" data-vd="verify">
      <div class="exec-defaults__vd-label">머지 전 검증 (verify)</div>
      ${O?u`<div class="exec-defaults__vd-line">
            <span class="exec-defaults__vd-cmd">${O}</span>
            ${H?$("detected","\uC790\uB3D9\uAC10\uC9C0"):$("config","config")}
            ${F?u`<span class="exec-defaults__vd-meta"
                  >timeout ${F}</span
                >`:""}
          </div>`:u`<div class="exec-defaults__vd-line exec-defaults__vd-absent">
            검증 없음
          </div>`}
    </div>`}function L(m){let O=m?Mo(m.cmd):"",F=m?Oo(m.timeout_ms):"",H=F?`timeout ${F} \xB7 verify \uD1B5\uACFC \uC2DC\uC5D0\uB9CC \uC2E4\uD589`:"verify \uD1B5\uACFC \uC2DC\uC5D0\uB9CC \uC2E4\uD589",V=s&&s()||"<workspace \uACBD\uB85C>";return u`<div class="exec-defaults__vd-group" data-vd="deploy">
      <div class="exec-defaults__vd-label">머지 후 배포 (deploy)</div>
      ${O?u`<div class="exec-defaults__vd-line">
            <span class="exec-defaults__vd-cmd">${O}</span>
            ${$("config","config")}
            ${m.detached===!0?$("detached","detached"):""}
            <span class="exec-defaults__vd-meta">${H}</span>
          </div>`:u`<div class="exec-defaults__vd-line exec-defaults__vd-absent">
            배포 없음 —
            <span class="exec-defaults__vd-cmd"
              >[worker.deploy."${V}"]</span
            >
            섹션으로 정의
          </div>`}
    </div>`}function P(m){if(!m||typeof m!="object")return"";let O=gl[String(m.outcome)];if(!O)return"";let F=m.outcome==="failed"&&m.reason?`${O.label} \xB7 ${m.reason}`:O.label,H=[ft(m.at),typeof m.bead_id=="string"?m.bead_id:"",typeof m.base_sha=="string"?m.base_sha.slice(0,7):""].filter(V=>V.length>0).join(" \xB7 ");return u`<div class="exec-defaults__vd-group" data-vd="last-deploy">
      <div class="exec-defaults__vd-label">마지막 배포</div>
      <div class="exec-defaults__vd-line">
        ${$(O.modifier,F)}
        ${H?u`<span class="exec-defaults__vd-meta">${H}</span>`:""}
      </div>
    </div>`}function B(m){return u`<section class="exec-defaults__vd">
      <p class="exec-defaults__vd-title">
        검증·배포 설정
        <span class="exec-defaults__vd-ro"
          >읽기 전용 — config.toml에서 정의</span
        >
      </p>
      ${v(m.verify_cmd)} ${L(m.deploy_cmd)}
      ${P(m.last_deploy)}
    </section>`}function q(){let m=a();le(u`
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
            ${ml.map(O=>_(O.key,O.values(),m[O.key]||""))}
            ${B(k())}
          </div>
        </div>
      `,o)}let G=!1,N=()=>{G=!1};o.addEventListener("close",N),o.addEventListener("cancel",N);let E=null;r&&r.subscribe&&(E=r.subscribe(()=>{G&&q()}));function C(){G||(G=!0,q(),typeof o.showModal=="function"?o.showModal():o.setAttribute("open",""))}function x(){G&&(G=!1,typeof o.close=="function"?o.close():o.removeAttribute("open"))}return{open:C,close:x,destroy(){G=!1,o.removeEventListener("close",N),o.removeEventListener("cancel",N),E&&(E(),E=null),o.remove()}}}function Ut(t){return typeof t=="number"&&Number.isFinite(t)?t:0}function _l(t){return!t||typeof t!="object"?!1:typeof t.input_tokens=="number"||typeof t.output_tokens=="number"}function bl(t){return t>=1e6?`${(t/1e6).toFixed(1)}M`:t>=1e3?`${(t/1e3).toFixed(1)}k`:String(t)}function zt(t){if(!_l(t))return null;let e=Ut(t?.input_tokens)+Ut(t?.output_tokens);return`\u03C4 ${bl(e)}`}function qr(t){if(!t||typeof t!="object")return"";let e=[`\uC785\uB825 ${Ut(t.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Ut(t.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${Ut(t.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Ut(t.cache_creation_input_tokens).toLocaleString("en-US")}`];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&e.push(`$${t.total_cost_usd.toFixed(2)}`),e.join(" \xB7 ")}function Pn(t,e){let r=null;for(let n of Object.values(t||{}))n&&n.bead_id===e&&(r=n.usage||null);return r}function Fn(t){let e=t.draggable&&!t.done,r=Array.isArray(t.badges)?t.badges:[],n=zt(t.usage),s=t.merge_step||null;return u`<div
    class="worker-mini${e?"":" worker-mini--static"}${t.done?" worker-mini--done":""}${s?" worker-mini--merging":""}"
    style=${s?`--progress: ${s.percent}%`:""}
    draggable=${e?"true":"false"}
    data-bead-id=${t.id}
    data-lane=${t.lane}
  >
    ${e?u`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:""}
    <span class="worker-mini__id" title="클릭하면 ID 복사">${t.id}</span>
    <span class="worker-mini__title">${t.title}</span>
    ${t.pr_url&&t.pr_number?u`<a
          class="worker-mini__pr"
          href=${t.pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="PR 열기"
          >#${t.pr_number} ↗</a
        >`:""}
    ${r.map(o=>o===t.live_badge?u`<span
            class="worker-mini__badge worker-mini__badge--activity"
            title="서버가 이 PR을 처리하는 중입니다"
            ><span class="act-dot" aria-hidden="true"></span>${o}</span
          >`:u`<span
            class="worker-mini__badge${t.alert?" worker-mini__badge--alert":""}"
            >${o}</span
          >`)}
    ${t.reason?u`<span class="worker-mini__reason">${t.reason}</span>`:""}
    ${n?u`<span class="worker-usage" title=${qr(t.usage)}
          >${n}</span
        >`:""}
    ${s?u`<span class="merge-step"
          >${s.label}<span class="merge-step__n"
            >${s.index}/${s.total}</span
          ></span
        >`:""}
    ${t.merge_action?u`<button
          type="button"
          class="worker-mini__merge"
          data-bead-id=${t.id}
          ?disabled=${t.merge_enabled===!1}
          title=${t.merge_title||""}
        >
          ${t.merge_label||"\uBA38\uC9C0"}
        </button>`:""}
    ${t.discard_action?u`<button
          type="button"
          class="worker-mini__discard"
          data-bead-id=${t.id}
          ?disabled=${t.discard_enabled===!1}
          title=${t.discard_enabled===!1?t.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
        >
          폐기
        </button>`:""}
  </div>`}function wl(t){let e=t.draggable&&!t.done,r=t.workflow,n=r&&r.chips||{},s=n.route||r&&r.route,o=n.route_source==="derived"||!!(r&&r.route_source==="derived"),i=typeof t.reason=="string"&&t.reason.startsWith("\u26D4");return u`<div
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
    ${r?Tr(r,t.status):""}
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
  </div>`}function gt(t){let e=!!t.collapsible&&!!t.collapsed,r=u`<span
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
                  </div>`:t.items.map(n=>t.lane==="candidate"?wl(n):Fn(n))}
          </div>`}
  </section>`}var Po=160;function Fo(t){return t.length>Po?`${t.slice(0,Po)}\u2026`:t}function kl(t){return!t||!t.reason?"":u`<div class="worker-banner__detail">
    가드:
    ${t.reason}${t.command?u` · <code>${Fo(t.command)}</code>`:""}
  </div>`}function yl(t){return t?u`<details class="worker-banner__tail">
    <summary>출력 tail</summary>
    <pre>${t}</pre>
  </details>`:""}function vl(t){if(!Number.isFinite(t)||t<0)return"0s";let e=Math.floor(t/1e3),r=Math.floor(e/60),n=e%60;return r>0?`${r}m ${String(n).padStart(2,"0")}s`:`${n}s`}function Bo(t){let e=Array.isArray(t.cleanupFailures)?t.cleanupFailures:[];return u`<div class="worker-banners">
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
          ${kl(t.failure.cause_detail)}
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
          ${yl(r.output_tail)}
        </div>`)}
  </div>`}function $l(t,e,r=null){let n=!!t.paused,s=n?"\uC77C\uC2DC\uC815\uC9C0":typeof t.started_at=="number"?vl(e-t.started_at):"\u2014",o=[t.runner,t.model].filter(Boolean).join(" \xB7 "),i=zt(t.usage),l=t.conflict_resolution?n?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,a=t.attempt_id&&t.attempt_id===r;return u`<div
    class="rtile${a?" rtile--sel":""}${n?" rtile--paused":""}"
    data-bead-id=${t.bead_id}
    data-attempt-id=${t.attempt_id||""}
  >
    <div class="rtile__hd">
      <span class="rtile__dot" aria-hidden="true"></span>
      <span class="rtile__id">${t.bead_id}</span>
      ${t.resumed_from?u`<span
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
          ${i?u`<span class="worker-usage" title=${qr(t.usage)}
                >${i}</span
              >`:""}
        </div>`:""}
    <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일): 큐
         스냅샷에는 페이즈명도 진행률도 없으므로 진행 바는 만들지 않는다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
    ${n?"":u`<div class="rtile__accent" aria-hidden="true"></div>`}
  </div>`}function Bn(t,e=Date.now(),r=null){let n=Array.isArray(t)?t:[];return u`<div class="worker-rungrid" id="worker-rungrid">
    ${n.length===0?u`<div class="worker-rungrid__empty">실행 세션 없음</div>`:n.map(s=>$l(s,e,r))}
  </div>`}var xl="tab:worker:ready",Sl="tab:worker:blocked",Ur=1;function zn(t){let e=t&&t.metadata;return!!(e&&typeof e=="object"&&e.spec_id)}var Uo="beads-ui.worker.candidate-filter",qn={show_blocked:!1,spec:"all"};function Tl(){try{let t=window.localStorage.getItem(Uo);if(!t)return{...qn};let e=JSON.parse(t);if(!e||typeof e!="object")return{...qn};let r=e.spec;return{show_blocked:e.show_blocked===!0,spec:r==="with"||r==="without"?r:"all"}}catch{return{...qn}}}function Al(t){try{window.localStorage.setItem(Uo,JSON.stringify(t))}catch{}}function El(t,e){let r=l=>e.show_blocked||!l.blocked,n=l=>e.spec==="all"||(e.spec==="with"?l.has_spec:!l.has_spec),s=[],o=0,i=0;for(let l of t){let a=r(l),d=n(l);a&&d?s.push(l):!a&&d?o+=1:a&&!d&&(i+=1)}return{visible:s,hidden_blocked:o,hidden_spec:i}}var Cl=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],zo="bdui.worker.candidate_sort",Rl=[{value:"spec",label:"spec \uC6B0\uC120"},{value:"board",label:"Board \uC21C\uC11C"},{value:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131\uC21C"}],zr="spec";function Ll(){try{let t=window.localStorage.getItem(zo);return t==="board"||t==="created"||t==="spec"?t:zr}catch{return zr}}function Il(t){try{window.localStorage.setItem(zo,t)}catch{}}var Dl="(max-width: 640px)",Ho="beads-ui.worker.lane-collapsed",fr={queue:!0,done:!0};function Ol(){try{let t=window.localStorage.getItem(Ho);if(!t)return{...fr};let e=JSON.parse(t);return!e||typeof e!="object"?{...fr}:{queue:typeof e.queue=="boolean"?e.queue:fr.queue,done:typeof e.done=="boolean"?e.done:fr.done}}catch{return{...fr}}}function Ml(t){try{window.localStorage.setItem(Ho,JSON.stringify(t))}catch{}}function qo(t){let e=Array.isArray(t)&&t.length>0?t[0]:null;if(!e)return"";let r=typeof e.title=="string"?e.title:e.id||"";return r.length>22?`${r.slice(0,22)}\u2026`:r}function Nl(t,e,r){let n=Array.isArray(t)?t.slice():[];return e==="created"?n.sort(Tt):(n.sort(yr(r)),e==="board"?n:[...n.filter(zn),...n.filter(s=>!zn(s))])}function Pl(t){let e=t&&t.parent;return(typeof e=="string"?e.length>0:!!(e&&e.id))||/\.\d+$/.test(t&&t.id||"")}function Fl(t){let r=(Array.isArray(t?.dependencies)?t.dependencies:[]).map(n=>typeof n=="string"?n:n&&n.id).filter(Boolean);return r.length>0?`\u{1F512} ${r.join(", ")}`:"\u{1F512} blocked"}var Bl=["closed_unmerged","undecidable"],ql=[{from:"\uAD00\uCE21 \uB300\uAE30",activity:"checking",to:"\uD655\uC778\uC911"},{from:"\uB85C\uCEEC\uAC80\uC99D \uB300\uAE30",activity:"verifying",to:"\uB85C\uCEEC\uAC80\uC99D \uC2E4\uD589 \uC911"}];function Ul(t,e){for(let r of ql)if(t===r.from&&e===r.activity)return{label:r.to,live:!0};return{label:t,live:!1}}var Un=[{step:"merging",label:"\uBA38\uC9C0 \uC911"},{step:"base_sync",label:"base \uB3D9\uAE30\uD654"},{step:"post_merge_verify",label:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D"},{step:"deploy",label:"\uBC30\uD3EC"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"}];function zl(t){if(typeof t!="string"||t.length===0)return null;let e=Un.length,r=Un.findIndex(n=>n.step===t);return r<0?{label:t,index:0,total:e,percent:0}:{label:Un[r].label,index:r+1,total:e,percent:Math.round((r+1)/e*100)}}function Hl(t,e,r,n,s=null,o=null,i=null){let l=r[t]||null,a=l&&l.gate?l.gate:null,d=l&&l.pr?l.pr:null,h=[],_=i?i==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":null,k=Ul(a&&a.gate_badge||"",_?null:o&&o.activity||null);_&&h.push(_),k.label&&h.push(k.label),a&&a.base_badge&&a.base_badge!==a.gate_badge&&h.push(a.base_badge),n&&h.push("\uC815\uB9AC \uC2E4\uD328");let $=!!a&&a.base_badge==="\uCDA9\uB3CC",v=!!a&&a.enabled===!0,L=zl(o&&o.merge_progress?o.merge_progress.step:null),P=!!n&&!!a&&a.tier==="merged";return{id:t,title:e,reason:n?"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644":"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",pr_number:d&&typeof d.number=="number"?d.number:null,pr_url:d&&typeof d.url=="string"?d.url:"",badges:h,live_badge:i==="running"?_:_?null:k.live?k.label:null,usage:s,alert:!!a&&Bl.includes(a.tier)||!!n,merge_action:!0,discard_action:!n&&!(a&&a.tier==="merged"),merge_step:L,discard_enabled:!L&&!i,discard_title:i?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":void 0,merge_enabled:!L&&!i&&(v||$||P),merge_label:$&&!L&&!P?"\uCDA9\uB3CC \uD574\uC18C":void 0,merge_title:L?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${L.label}`:i==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":i==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":P?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uCC98\uC74C\uBD80\uD130 \uB2E4\uC2DC \uC218\uD589\uD569\uB2C8\uB2E4":$?"\uCDA9\uB3CC \u2014 \uD074\uB9AD\uD558\uBA74 \uCDA9\uB3CC \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4 (\uBA38\uC9C0\uD558\uC9C0 \uC54A\uC74C)":v?`\uBA38\uC9C0 (${a.gate_badge}) \u2014 \uD074\uB9AD \uC2DC\uC810\uC5D0 \uB2E4\uC2DC \uD655\uC778\uD569\uB2C8\uB2E4`:a&&a.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${a&&a.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function Hn(t,e={}){let{transport:r,issueStores:n,queueStore:s,sessionLogStore:o,uiOrderStore:i,gotoIssue:l,getWorkspacePath:a}=e,d=n?$r(n,i):null,h=xr({transport:r,uiOrderStore:i}),_=null,k=[],$=Tl(),v=Ll(),L=Ol(),P=!1,B=new Set,q=[],G=document.createElement("div");G.className="worker-console";let N=document.createElement("div");N.className="worker-top";let E=document.createElement("div");E.className="worker-drawer-overlay",E.hidden=!0;let C=document.createElement("div");C.className="worker-drawer-overlay__backdrop";let x=document.createElement("div");x.className="worker-drawer-host",E.append(C,x);let m=document.createElement("div");m.className="worker-lanes-host",G.append(N,E,m),t.appendChild(G);let O=null,F=Ar(x,{transport:r,sessionLogStore:o,onClose:()=>{O=null,E.hidden=!0,de()}}),H=No(G,{queueStore:s,transport:r,getWorkspacePath:a});function V(){return s&&s.get()||{revision:0,auto_advance:!1,slots:Ur,queue:[],pr_wait:[],done:[]}}function ne(){let c=V();return typeof c.revision=="number"?c.revision:0}function se(c){c&&c.queue&&s&&s.set(c.queue)}function $e(){let c=V().queue;return Array.isArray(c)?c.length:0}async function Ge(c,f){if(!r)return;let y=await r("worker-queue-place",{bead_id:c,index:f,expected_revision:ne()});se(y),y&&y.conflict&&await r("worker-queue-place",{bead_id:c,index:f,expected_revision:ne()}).then(se)}async function ze(c,f){if(!r)return;let y=await r("worker-queue-reorder",{bead_id:c,to_index:f,expected_revision:ne()});se(y),y&&y.conflict&&await r("worker-queue-reorder",{bead_id:c,to_index:f,expected_revision:ne()}).then(se)}async function ke(c){if(!r)return;let f=await r("worker-queue-remove",{bead_id:c,expected_revision:ne()});se(f),f&&f.conflict&&await r("worker-queue-remove",{bead_id:c,expected_revision:ne()}).then(se)}async function xe(c){!r||!c||await r("worker-attempt-stop",{attempt_id:c})}async function je(c){if(!r||!c)return;let f=await r("worker-attempt-pause",{attempt_id:c});f&&f.paused===!1&&f.reason&&Q(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${f.reason}`,"error",2400)}async function ce(c){if(!r||!c)return;let f=await r("worker-attempt-resume",{attempt_id:c,expected_revision:ne()});se(f),f&&f.conflict&&(f=await r("worker-attempt-resume",{attempt_id:c,expected_revision:ne()}),se(f)),f&&f.resumed===!1&&!f.conflict&&f.reason&&Q(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${f.reason}`,"error",2400)}async function lt(c){if(!r||!c)return;let f=await r("worker-attempt-dismiss",{attempt_id:c,expected_revision:ne()});se(f),f&&f.conflict&&(f=await r("worker-attempt-dismiss",{attempt_id:c,expected_revision:ne()}),se(f)),f&&f.dismissed===!1&&!f.conflict&&f.reason&&Q(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${f.reason}`,"error",2400)}async function pe(c){if(!r||!c)return;B.add(c),de();let f;try{f=await r("worker-pr-merge",{bead_id:c,expected_revision:ne()}),se(f),f&&f.conflict&&(f=await r("worker-pr-merge",{bead_id:c,expected_revision:ne()}),se(f))}finally{B.delete(c),de()}if(!(!f||f.conflict)){if(f.action==="conflict_resolution"){Q(f.ok?"\uCDA9\uB3CC \u2014 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 (\uBA38\uC9C0\uD558\uC9C0 \uC54A\uC74C)":`\uCDA9\uB3CC \uD574\uC18C \uB514\uC2A4\uD328\uCE58 \uC2E4\uD328: ${f.reason||""}`,f.ok?"success":"error",2800);return}if(f.ok){Q("\uBA38\uC9C0 + \uC815\uB9AC \uC644\uB8CC","success",2e3);return}Q(f.cleanup_step?`\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uC2E4\uD328(${f.cleanup_step}): ${f.reason||""}`:`\uBA38\uC9C0 \uAC70\uBD80: ${f.reason||""}`,"error",3200)}}async function Ye(c){if(!r||!c||!(typeof globalThis.confirm!="function"||globalThis.confirm(`${c}: PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4. \uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694. \uACC4\uC18D\uD560\uAE4C\uC694?`)))return;let y=await r("worker-pr-discard",{bead_id:c,expected_revision:ne()});if(se(y),y&&y.conflict&&(y=await r("worker-pr-discard",{bead_id:c,expected_revision:ne()}),se(y)),y&&y.discarded===!0){Q("\uD3D0\uAE30 \uC644\uB8CC \u2014 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB2E4\uC2DC \uC2E4\uD589\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4","success",2400);return}y&&y.discarded===!1&&!y.conflict&&Q(`\uD3D0\uAE30 \uAC70\uBD80: ${y.reason||""}`,"error",2800)}async function ie(c){if(!r)return;let f=await r("worker-queue-toggle",{on:c,expected_revision:ne()});se(f),f&&f.conflict&&await r("worker-queue-toggle",{on:c,expected_revision:ne()}).then(se)}async function Me(c){if(!r||!Number.isFinite(c))return;let f=Math.max(Ur,Math.floor(c)),y=await r("worker-queue-set-slots",{slots:f,expected_revision:ne()});se(y),y&&y.conflict&&await r("worker-queue-set-slots",{slots:f,expected_revision:ne()}).then(se)}function Qe(){let c=V(),f=d?d.selectBoardColumn(xl,"ready"):[],y=d?d.selectBoardColumn(Sl,"blocked"):[],g=new Map;for(let S of[...f,...y])g.set(S.id,S.title||S.id);let A=c.pr_wait||[],T=c.pr_observations||{},R=c.pr_activity||{},K=c.cleanup_failed||{},te=Object.entries(K).map(([S,W])=>({bead_id:S,step:W&&W.step?W.step:"",reason:W&&W.reason?W.reason:"",detail:W&&typeof W.detail=="string"?W.detail:null,output_tail:W&&typeof W.output_tail=="string"&&W.output_tail?W.output_tail:void 0})),z=c.queue||[],_e=new Set([...z.map(S=>S.bead_id),...A.map(S=>S.bead_id),...c.done.map(S=>S.bead_id)]),ee=new Set(y.map(S=>S.id)),be=i?i.get()?.order||{}:{},Lt=new Set,et=[];for(let S of[...f,...y])_e.has(S.id)||Lt.has(S.id)||Pl(S)||(Lt.add(S.id),et.push(S));k=Nl(et,v,be);let _t=c.admission||{},bt=S=>{let W=_t[S];if(!W)return"";let X=typeof W.reason=="string"?W.reason:"",he=X.indexOf(":");return he>0&&he<X.length-1?`\u26D4 ${X.slice(0,he)} (${X.slice(he+1)})`:`\u26D4 ${X}`},b=k.map(S=>{let W=zn(S),X=ee.has(S.id),he=[];X&&he.push(Fl(S)),W||he.push("spec \uC5C6\uC74C");let rt=bt(S.id);return rt&&he.push(rt),{id:S.id,title:S.title||S.id,reason:he.join(" \xB7 "),draggable:W,lane:"candidate",workflow:S.workflow,status:S.status,blocked:X,has_spec:W}}),w=El(b,$),Z=w.visible,Y=(S,W)=>S.map(X=>({id:X.bead_id,title:g.get(X.bead_id)||X.bead_id,reason:W==="done"?"":bt(X.bead_id),draggable:W!=="done",done:W==="done",lane:W,usage:W==="done"?Pn(c.attempts||{},X.bead_id):null})),J=c.attempts?Object.values(c.attempts):[],fe=new Set;for(let S of J)S&&typeof S.resumed_from=="string"&&S.resumed_from.length>0&&fe.add(S.resumed_from);let wt=new Map;for(let S of J)wt.set(S.bead_id,S.attempt_id);let hr=new Map;for(let S of J)hr.set(S.attempt_id,S);function tt(S){let W=new Set,X=S;for(;X&&!W.has(X.attempt_id);){if(X.conflict_resolution===!0)return!0;W.add(X.attempt_id),X=typeof X.resumed_from=="string"&&X.resumed_from.length>0&&hr.get(X.resumed_from)||null}return!1}let Ze=[],Xe=null;for(let S of J){let W=S.status==="paused"&&!fe.has(S.attempt_id);S.status==="running"||W?Ze.push({bead_id:S.bead_id,attempt_id:S.attempt_id,title:g.get(S.bead_id)||S.bead_id,runner:S.runner||null,model:S.model||null,effort:S.effort||null,started_at:typeof S.started_at=="number"?S.started_at:null,resumed_from:S.resumed_from||null,paused:W,conflict_resolution:tt(S),can_pause:typeof S.session_id=="string"&&S.session_id.length>0,usage:S.usage||null}):(S.status==="failed"||S.status==="orphaned")&&!(wt.get(S.bead_id)!==S.attempt_id)&&typeof S.dismissed_at!="number"&&(Xe=S)}let Ht=null;if(Xe){let S=typeof Xe.session_id=="string"&&Xe.session_id.length>0,W=fe.has(Xe.attempt_id),X=Xe.cause_detail;Ht={repo:Xe.repo||"",reason:Xe.cause||Xe.status,cause_detail:X&&typeof X.reason=="string"?{reason:X.reason,command:typeof X.command=="string"?X.command:null}:null,resume_attempt_id:Xe.attempt_id,resume_eligible:S&&!W,resume_reason:S?W?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}}let Wt=new Set(Ze.map(S=>S.bead_id)),kt=new Map;for(let S of Ze)S.conflict_resolution&&(S.paused?kt.has(S.bead_id)||kt.set(S.bead_id,"paused"):kt.set(S.bead_id,"running"));let Gt=Ze.filter(S=>!S.paused).length,jt=(c.workspace_info||{}).slots,Yt=typeof jt=="number"?jt:typeof c.slots=="number"?c.slots:Ur,gr=Gt>Yt,mr=Y(c.done,"done"),j=0,p=0,D=!1;for(let S of mr){let W=S.usage;W&&typeof W=="object"&&(Number.isFinite(W.input_tokens)&&(j+=W.input_tokens,D=!0),Number.isFinite(W.output_tokens)&&(p+=W.output_tokens,D=!0))}let U=D?zt({input_tokens:j,output_tokens:p}):null;return{queue:c,idToTitle:g,candidates:Z,candidate_hidden:{blocked:w.hidden_blocked,spec:w.hidden_spec},running:Ze,live_count:Gt,slots:Yt,over_cap:gr,failure:Ht,waiting:Y(z.filter(S=>!Wt.has(S.bead_id)),"queue"),pr_wait:A.map(S=>Hl(S.bead_id,g.get(S.bead_id)||S.bead_id,T,K[S.bead_id]||null,Pn(c.attempts||{},S.bead_id),R[S.bead_id]||(B.has(S.bead_id)?{activity:null,merge_progress:{step:"merging"}}:null),kt.get(S.bead_id)||null)),done:mr,token_total:U,cleanup_failures:te}}function Se(c){let f=c.waiting.length>0?c.waiting[0].id:"\u2014",y=u`<button
      type="button"
      class="worker-play${c.queue.auto_advance?" is-active":""}"
    >
      ${c.queue.auto_advance?"\u23F8 \uC77C\uC2DC\uC815\uC9C0":"\u25B6 \uC790\uB3D9 \uC9C4\uD589"}
    </button>`,g=c.over_cap?u`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",A=u`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${c.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${c.pr_wait.length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >오늘 완료 <b>${c.done.length}</b></span
      >`,T=u`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${Ur}
          step="1"
          .value=${String(c.slots)}
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
      </button>`,R=Bo({failure:c.failure,cleanupFailures:c.cleanup_failures});return P?u`<div class="worker-ribbon">
          ${y}
          <div class="worker-kpi worker-kpi--ribbon">${g}${A}</div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${T}</div>
        </div>
        ${R}`:u`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${y}${T}</div>
        <div class="worker-kpi">
          ${g}${A}
          ${c.token_total?u`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title="완료된 세션들의 토큰 합계 (입력+출력)"
                >${c.token_total}</span
              >`:""}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${f}</b></span
          >
        </div>
      </div>
      ${R}`}function Ee(c){if(c.running.length===0&&c.pr_wait.length===0)return"";let f=c.running.some(y=>!y.paused);return u`<section
      class="worker-now${f?" worker-pane--live":""}"
      id="worker-now"
    >
      <header class="worker-now__hd">
        <span
          class="worker-pane__dot worker-pane__dot--running"
          aria-hidden="true"
        ></span>
        <span class="worker-now__title">지금</span>
        <span class="worker-now__count"
          >${c.running.length+c.pr_wait.length}</span
        >
      </header>
      ${c.running.length>0?Bn(c.running,Date.now(),O):""}
      ${c.pr_wait.map(y=>Fn(y))}
    </section>`}function ye(c){let f=c.candidate_hidden;return u`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${$.show_blocked}
        />
        🔒 blocked${f.blocked>0?` ${f.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${Cl.map(y=>u`<button
              type="button"
              class="worker-filter__chip${$.spec===y.value?" is-active":""}"
              data-spec=${y.value}
              aria-pressed=${$.spec===y.value?"true":"false"}
            >
              ${y.label}
            </button>`)}
        ${f.spec>0?u`<span class="worker-filter__hidden">숨김 ${f.spec}</span>`:""}
      </div>
    </div>`}function Ne(){return u`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${v}
    >
      ${Rl.map(c=>u`<option value=${c.value} ?selected=${v===c.value}>
            ${c.label}
          </option>`)}
    </select>`}function Ve(c){let f=gt({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:c.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:Ne(),controls:ye(c)});return P?u`<div class="worker-lanes worker-lanes--mobile">
        ${Ee(c)}
        ${gt({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:c.waiting,empty:"\uB4DC\uB798\uADF8 \uB610\uB294 [\uB300\uAE30\uB85C \u21B4]\uB85C \uBC30\uCE58",collapsible:!0,collapsed:L.queue,preview:qo(c.waiting)})}
        ${f}
        ${gt({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:c.done,empty:"\uC644\uB8CC \uC5C6\uC74C",collapsible:!0,collapsed:L.done,preview:c.token_total||qo(c.done)})}
      </div>`:u`<div class="worker-lanes">
      ${f}
      ${gt({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:c.waiting,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58"})}
      ${gt({id:"worker-pane-running",lane:"running",title:`\uC2E4\uD589 \uC911 \xB7 \uC2AC\uB86F ${c.slots}`,items:c.running,live:c.running.some(y=>!y.paused),body:Bn(c.running,Date.now(),O)})}
      ${gt({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:c.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C"})}
      ${gt({id:"worker-pane-done",lane:"done",title:`\uC644\uB8CC \xB7 \uC624\uB298 ${c.done.length}`,items:c.done,empty:"\uC644\uB8CC \uC5C6\uC74C"})}
    </div>`}function Ce(c){L={...L,[c]:!L[c]},Ml(L),de()}function de(){let c=Qe();le(Se(c),N),le(Ve(c),m)}function Re(){let c=document.querySelector(".app-header");if(!c)return;let f=()=>{let y=Math.round(c.getBoundingClientRect().height);G.style.setProperty("--worker-ribbon-top",`${y}px`)};if(f(),typeof ResizeObserver=="function"){let y=new ResizeObserver(f);y.observe(c),q.push(()=>y.disconnect())}else window.addEventListener("resize",f),q.push(()=>window.removeEventListener("resize",f))}function He(){if(typeof window.matchMedia!="function")return;let c=window.matchMedia(Dl);P=!!c.matches;let f=y=>{let g=!!(y&&typeof y.matches=="boolean"?y.matches:c.matches);g!==P&&(P=g,de())};typeof c.addEventListener=="function"?(c.addEventListener("change",f),q.push(()=>c.removeEventListener("change",f))):typeof c.addListener=="function"&&(c.addListener(f),q.push(()=>c.removeListener(f)))}function me(c){let f=c.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!f)return;let y=f.dataset.beadId||"",g=f.dataset.lane||"";_={bead_id:y,from_lane:g};try{c.dataTransfer?.setData("text/plain",y),c.dataTransfer&&(c.dataTransfer.effectAllowed="move")}catch{}}function Te(c){let f=c.target?.closest?.(".worker-pane");if(!f)return;let y=f.dataset.lane||"";y!=="candidate"&&y!=="queue"||(c.preventDefault(),c.dataTransfer&&(c.dataTransfer.dropEffect="move"),f.classList.add("worker-pane--drag-over"))}function Pe(c){c.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function Oe(c,f){let y=k.find(R=>R.id===c);if(!y)return;let g=k.filter(R=>R.id!==c),A=g.length;if(f){let R=f.dataset.beadId;if(R===c)return;let K=g.findIndex(te=>te.id===R);K>=0&&(A=K)}let T=g.slice();T.splice(A,0,y),h.applyReorder(c,T,A)}function Ke(c){let f=c.target?.closest?.(".worker-pane");if(!f)return;c.preventDefault(),f.classList.remove("worker-pane--drag-over");let y=f.dataset.lane||"",g=_?.bead_id||c.dataTransfer?.getData("text/plain")||"",A=_?.from_lane||"";if(_=null,!g)return;let T=c.target?.closest?.(".worker-mini, .worker-card"),R=Array.from(f.querySelectorAll(".worker-mini, .worker-card")),K=R.length;if(T){let te=R.indexOf(T);te>=0&&(K=te)}if(f.classList.contains("worker-pane--collapsed")&&(K=$e()),y==="candidate"){if(A==="candidate"){Oe(g,T);return}A==="queue"&&ke(g);return}y==="queue"&&(A==="queue"?ze(g,K):Ge(g,K))}function Je(c){$=c,Al(c),de()}function ge(c){v=c==="board"||c==="created"||c==="spec"?c:zr,Il(v),de()}function Le(c){let f=c.target?.closest?.(".worker-filter__blocked");if(f){Je({...$,show_blocked:f.checked});return}let y=c.target?.closest?.(".worker-sort");if(y){ge(y.value||zr);return}let g=c.target?.closest?.(".worker-slots__input");if(!g)return;let A=Number.parseInt(g.value,10);if(!Number.isFinite(A)){de();return}Me(A).then(de)}function Ae(c){return c?{runner:c.runner||void 0,model:c.model||void 0,effort:c.effort||void 0,worktree:c.worktree||void 0,status:c.status||void 0,session_id:c.session_id||void 0}:{}}function Ie(c){let f=V(),y=f.attempts?f.attempts[c]:null;O=c,E.hidden=!1,F.open({attempt_id:c,meta:Ae(y)}),de()}function I(){if(!O)return;let c=V(),f=c.attempts?c.attempts[O]:null;if(f){F.updateMeta(Ae(f));return}F.close()}function M(c){let f=c.target;if(f?.closest?.("#worker-exec-defaults-dialog"))return;if(f?.closest?.(".worker-exec-defaults-btn")){H.open();return}let y=f?.closest?.(".worker-banner__resume");if(y){let ee=y.dataset.attemptId;ee&&ce(ee);return}let g=f?.closest?.(".worker-banner__dismiss");if(g){let ee=g.dataset.attemptId;ee&&lt(ee);return}if(f?.closest?.(".worker-play")){ie(!V().auto_advance);return}let A=f?.closest?.(".worker-pane__hd--toggle");if(A){let ee=A.dataset.lane;(ee==="queue"||ee==="done")&&Ce(ee);return}let T=f?.closest?.(".worker-card__place");if(T){let ee=T.dataset.beadId;ee&&!T.disabled&&Ge(ee,$e());return}let R=f?.closest?.(".worker-filter__chip");if(R){let ee=R.dataset.spec;(ee==="all"||ee==="with"||ee==="without")&&Je({...$,spec:ee});return}let K=f?.closest?.(".worker-mini__merge");if(K){pe(K.dataset.beadId||"");return}let te=f?.closest?.(".worker-mini__discard");if(te){Ye(te.dataset.beadId||"");return}if(f?.closest?.(".worker-mini__pr"))return;if(f?.closest?.(".rtile__stop")){let be=f?.closest?.(".rtile")?.dataset?.attemptId;be&&xe(be);return}if(f?.closest?.(".rtile__pause")){let be=f?.closest?.(".rtile")?.dataset?.attemptId;be&&je(be);return}if(f?.closest?.(".rtile__resume")){let be=f?.closest?.(".rtile")?.dataset?.attemptId;be&&ce(be);return}if(f?.closest?.(".rtile__info")){let be=f?.closest?.(".rtile")?.dataset?.beadId;be&&l&&l(be);return}if(f?.closest?.(".worker-drawer-overlay__backdrop")){F.close();return}if(f?.closest?.(".worker-drawer-host"))return;let z=f?.closest?.(".rtile");if(z){let ee=z.dataset.attemptId;ee&&Ie(ee);return}let _e=f?.closest?.(".worker-mini, .worker-card");if(_e){let ee=_e.dataset.beadId;if(f?.closest?.(".worker-mini__id, .worker-card__id")){ee&&qt(ee).then(be=>{be?Q("\uBCF5\uC0AC\uB428","success",1200):Q("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}ee&&l&&l(ee)}}return t.addEventListener("dragstart",me),t.addEventListener("dragover",Te),t.addEventListener("dragleave",Pe),t.addEventListener("drop",Ke),t.addEventListener("click",M),t.addEventListener("change",Le),He(),Re(),d&&q.push(d.subscribe(de)),s&&q.push(s.subscribe(()=>{de(),I()})),de(),{load(){de()},destroy(){for(let c of q.splice(0))try{c()}catch{}t.removeEventListener("dragstart",me),t.removeEventListener("dragover",Te),t.removeEventListener("dragleave",Pe),t.removeEventListener("drop",Ke),t.removeEventListener("click",M),t.removeEventListener("change",Le);try{F.destroy()}catch{}E.hidden=!0;try{H.destroy()}catch{}le(u``,t)}}}function Wn(t){if(!t)return"Unknown";let e=t.split("/").filter(Boolean);return e.length>0?e[e.length-1]:"Unknown"}function Wo(t,e,r,n=async()=>{},s=async()=>{}){let o=we("views:workspace-picker"),i=null,l=!1,a=!1,d=!1;async function h(C){let m=C.target.value,F=e.getState().workspace?.current?.path||"";if(m&&m!==F){o("switching workspace to %s",m),l=!0,E();try{await r(m)}catch(H){o("workspace switch failed: %o",H)}finally{l=!1,E()}}}async function _(){let C=e.getState(),x=C.workspace?.current?.path||C.workspace?.available?.[0]?.path||"";if(!(!x||a)){o("git-pulling workspace %s",x),a=!0,E();try{await n(x)}catch(m){o("workspace git pull failed: %o",m)}finally{a=!1,E()}}}function k(C){let x=C.target;x&&t.contains(x)||L()}function $(C){C.key==="Escape"&&L()}function v(){d||(d=!0,document.addEventListener("mousedown",k),document.addEventListener("keydown",$),E())}function L(){d&&(d=!1,document.removeEventListener("mousedown",k),document.removeEventListener("keydown",$),E())}function P(){d?L():v()}async function B(C){let x=C.target,m=x.value,O=x.checked;o("toggling visibility %s \u2192 %s",m,String(O));try{await s(m,O)}catch(F){o("workspace visibility toggle failed: %o",F)}}function q(C){return C?u`
      <button
        type="button"
        class="workspace-picker__git-pull-button"
        @click=${_}
        ?disabled=${l||a}
        aria-label="Git Pull"
        title="Git Pull"
      >
        <span aria-hidden="true">⬇</span>
      </button>
    `:u``}function G(C,x){return u`
      <div class="workspace-picker__manage">
        <button
          type="button"
          class="workspace-picker__manage-button"
          @click=${P}
          aria-haspopup="true"
          aria-expanded=${d?"true":"false"}
          aria-label="프로젝트 관리"
        >
          프로젝트 관리
        </button>
        ${d?u`
              <div
                class="workspace-picker__manage-popover"
                role="menu"
                aria-label="프로젝트 표시 선택"
              >
                ${C.map(m=>u`
                    <label
                      class="workspace-picker__manage-row"
                      title="${m.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${m.path}"
                        .checked=${!x.has(m.path)}
                        @change=${B}
                      />
                      <span class="workspace-picker__manage-name"
                        >${Wn(m.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function N(){let C=e.getState(),x=C.workspace?.current,m=C.workspace?.available||[],O=new Set(C.workspace?.hidden||[]),F=x?.path||m[0]?.path||"";if(m.length===0)return u``;let H=m.filter(V=>!O.has(V.path)||V.path===F);if(H.length<=1){let V=H[0]||m[0],ne=Wn(V.path);return u`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${V.path}"
            >${ne}</span
          >
          ${G(m,O)}
          ${q(F)}
          ${a?u`<span
                class="workspace-picker__loading"
                aria-hidden="true"
              ></span>`:""}
        </div>
      `}return u`
      <div class="workspace-picker">
        <select
          class="workspace-picker__select"
          @change=${h}
          ?disabled=${l||a}
          aria-label="Select project workspace"
        >
          ${H.map(V=>u`
              <option
                value="${V.path}"
                ?selected=${V.path===F}
                title="${V.path}"
              >
                ${Wn(V.path)}
              </option>
            `)}
        </select>
        ${G(m,O)}
        ${q(F)}
        ${l||a?u`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function E(){le(N(),t)}return E(),i=e.subscribe(()=>E()),{destroy(){i&&(i(),i=null),document.removeEventListener("mousedown",k),document.removeEventListener("keydown",$),le(u``,t)}}}var Go=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-queue-set-slots","worker-queue-set-exec-default","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-pr-merge","worker-pr-discard","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append"];function Gn(){let t=Date.now().toString(36),e=Math.random().toString(36).slice(2,8);return`${t}-${e}`}function jo(t,e,r=Gn()){return{id:r,type:t,payload:e}}function Yo(t={}){let e=we("ws"),r={initialMs:t.backoff?.initialMs??1e3,maxMs:t.backoff?.maxMs??3e4,factor:t.backoff?.factor??2,jitterRatio:t.backoff?.jitterRatio??.2},n=()=>t.url&&t.url.length>0?t.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",i=0,l=null,a=!0,d=new Map,h=[],_=new Map,k=new Set;function $(N){for(let E of Array.from(k))try{E(N)}catch{}}function v(){if(!a||l)return;o="reconnecting",e("ws reconnecting\u2026"),$(o);let N=Math.min(r.maxMs||0,(r.initialMs||0)*Math.pow(r.factor||1,i)),E=(r.jitterRatio||0)*N,C=Math.max(0,Math.round(N+(Math.random()*2-1)*E));e("ws retry in %d ms (attempt %d)",C,i+1),l=setTimeout(()=>{l=null,G()},C)}function L(N){try{s?.send(JSON.stringify(N))}catch(E){e("ws send failed",E)}}function P(){for(o="open",e("ws open"),$(o),i=0;h.length;){let N=h.shift();N&&L(N)}}function B(N){let E;try{E=JSON.parse(String(N.data))}catch{e("ws received non-JSON message");return}if(!E||typeof E.id!="string"||typeof E.type!="string"){e("ws received invalid envelope");return}if(d.has(E.id)){let x=d.get(E.id);d.delete(E.id),E.ok?x?.resolve(E.payload):x?.reject(E.error||new Error("ws error"));return}let C=_.get(E.type);if(C&&C.size>0)for(let x of Array.from(C))try{x(E.payload)}catch(m){e("ws event handler error",m)}else e("ws received unhandled message type: %s",E.type)}function q(){o="closed",e("ws closed"),$(o);for(let[N,E]of d.entries())E.reject(new Error("ws disconnected")),d.delete(N);i+=1,v()}function G(){if(!a)return;let N=n();try{s=new WebSocket(N),e("ws connecting %s",N),o="connecting",$(o),s.addEventListener("open",P),s.addEventListener("message",B),s.addEventListener("error",()=>{}),s.addEventListener("close",q)}catch(E){e("ws connect failed %o",E),v()}}return G(),{send(N,E){if(!Go.includes(N))return Promise.reject(new Error(`unknown message type: ${N}`));let C=Gn(),x=jo(N,E,C);return e("send %s id=%s",N,C),new Promise((m,O)=>{d.set(C,{resolve:m,reject:O,type:N}),s&&s.readyState===s.OPEN?L(x):(e("queue %s id=%s (state=%s)",N,C,o),h.push(x))})},on(N,E){_.has(N)||_.set(N,new Set);let C=_.get(N);return C?.add(E),()=>{C?.delete(E)}},onConnection(N){return k.add(N),()=>{k.delete(N)}},reconnect(){a=!0,l&&(clearTimeout(l),l=null),i=0,G()},close(){a=!1,l&&(clearTimeout(l),l=null);try{s?.close()}catch{}},getState(){return o}}}function Wl(){let t=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof t?.workspace_config?.default_workspace=="string"&&t.workspace_config.default_workspace.length>0?t.workspace_config.default_workspace:null}}}async function Gl(t,e){try{let n=await(await fetch("/api/config")).json();t.setState({config:n})}catch(r){e("config refresh failed",r)}}var jn=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],Vo=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"]],Ko="worker:queue",Zo="ui:order",Xo="ui:display-policy",mt="tab:board:closed",Qo="beads-ui.board.closed-range";function jl(t){let e=we("main");e("bootstrap start");let r=u`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;le(r,t);let n=document.getElementById("top-nav"),s=document.getElementById("board-root"),o=document.getElementById("worker-root"),i=document.getElementById("detail-panel");if(s&&o&&i){let m=function(b,w){let Z="Request failed",Y="";if(b&&typeof b=="object"){let fe=b;if(typeof fe.message=="string"&&fe.message.length>0&&(Z=fe.message),typeof fe.details=="string")Y=fe.details;else if(fe.details&&typeof fe.details=="object")try{Y=JSON.stringify(fe.details,null,2)}catch{Y=""}}else typeof b=="string"&&b.length>0&&(Z=b);let J=w&&w.length>0?`Failed to load ${w}`:"Request failed";x.open(J,Z,Y)},ie=function(b){return`${R.getState().workspace.current?.path||""}\0${b}`},Me=function(){ze&&(ze().catch(()=>{}),ze=null),ke=null,xe=null},Se=function(b){je=b;let w=()=>{je!==b||R.getState().selected_id!==b||(je=null,Qe(b))};if(!pe){lt.then(w);return}w()},Ve=function(){let b=is(Ne);return b===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:b}}},Ce=function(b){if(b)for(let[w,Z]of jn){if(Ee.has(w)||ye.has(w))continue;let Y=w===mt?Ve():{type:Z};try{V.register(w,Y)}catch(J){e("register %s store failed: %o",w,J)}ye.add(w),H.subscribeList(w,Y).then(J=>{Ee.set(w,J)}).catch(J=>{e("subscribe %s failed: %o",w,J),m(J,"board")}).finally(()=>{ye.delete(w)})}else Re()},Re=function(){for(let[b]of jn){let w=Ee.get(b);w&&(w().catch(()=>{}),Ee.delete(b));try{V.unregister(b)}catch(Z){e("unregister %s failed: %o",b,Z)}}},Te=function(b){if(!b){Pe();return}for(let[w,Z]of Vo)if(!(He.has(w)||ye.has(w))){try{V.register(w,{type:Z})}catch(Y){e("register %s store failed: %o",w,Y)}ye.add(w),H.subscribeList(w,{type:Z}).then(Y=>{He.set(w,Y)}).catch(Y=>{e("subscribe %s failed: %o",w,Y),m(Y,"worker")}).finally(()=>{ye.delete(w)})}me||(F("subscribe-worker-queue",{id:Ko}).catch(w=>{e("subscribe-worker-queue failed: %o",w)}),me=()=>F("unsubscribe-worker-queue",{id:Ko}))},Pe=function(){for(let[b]of Vo){let w=He.get(b);w&&(w().catch(()=>{}),He.delete(b));try{V.unregister(b)}catch(Z){e("unregister %s failed: %o",b,Z)}}me&&(me().catch(()=>{}),me=null)},Ke=function(){Oe||(F("subscribe-ui-order",{id:Zo}).catch(b=>{e("subscribe-ui-order failed: %o",b)}),Oe=()=>F("unsubscribe-ui-order",{id:Zo}))},Je=function(){Oe&&(Oe().catch(()=>{}),Oe=null),se.clear()},Le=function(){ge||(F("subscribe-display-policy",{id:Xo}).catch(b=>{e("subscribe-display-policy failed: %o",b)}),ge=()=>F("unsubscribe-display-policy",{id:Xo}))},Ae=function(){ge&&(ge().catch(()=>{}),ge=null),$e.clear()},y=function(b){if(!b)return"Unknown";let w=b.split("/").filter(Boolean);return w.length>0?w[w.length-1]:"Unknown"};var l=m,a=ie,d=Me,h=Se,_=Ve,k=Ce,$=Re,v=Te,L=Pe,P=Ke,B=Je,q=Le,G=Ae,N=y;let E=document.getElementById("header-loading"),C=Cs(E),x=Eo(t),O=Yo(),F=C.wrapSend((b,w)=>O.send(b,w)),H=vs(F),V=$s(),ne=Ss(),se=xs(),$e=as(),Ge=ls();O.on("ui-order-snapshot",b=>{let w=b;if(w&&typeof w.revision=="number")try{se.set({revision:w.revision,order:w.order&&typeof w.order=="object"?w.order:{}})}catch{}}),O.on("display-policy-snapshot",b=>{let w=b;if(w&&w.policy&&typeof w.policy=="object")try{$e.set(w.policy)}catch{}}),O.on("session-log-snapshot",b=>{let w=b;if(w&&typeof w.attempt_id=="string")try{Ge.set(w.attempt_id,Array.isArray(w.lines)?w.lines:[])}catch{}}),O.on("session-log-append",b=>{let w=b;if(w&&typeof w.attempt_id=="string")try{Ge.append(w.attempt_id,w.event)}catch{}}),O.on("snapshot",b=>{let w=b,Z=w&&typeof w.id=="string"?w.id:"",Y=Z?V.getStore(Z):null;if(Y&&w&&w.type==="snapshot")try{Y.applyPush(w)}catch{}}),O.on("upsert",b=>{let w=b,Z=w&&typeof w.id=="string"?w.id:"",Y=Z?V.getStore(Z):null;if(Y&&w&&w.type==="upsert")try{Y.applyPush(w)}catch{}}),O.on("delete",b=>{let w=b,Z=w&&typeof w.id=="string"?w.id:"",Y=Z?V.getStore(Z):null;if(Y&&w&&w.type==="delete")try{Y.applyPush(w)}catch{}});let ze=null,ke=null,xe=null,je=null,ce=()=>{},lt=new Promise(b=>{ce=()=>b(void 0)}),pe=!1,Ye=!1;async function Qe(b){let w=ie(b);if(w===ke||w===xe)return;xe=w;let Z=`detail:${b}`,Y={type:"issue-detail",params:{id:b}};try{V.register(Z,Y)}catch(J){e("register detail store failed: %o",J)}try{let J=await H.subscribeList(Z,Y);if(R.getState().selected_id!==b||ie(b)!==w){await J().catch(()=>{});return}ze&&await ze().catch(()=>{}),ze=J,ke=w}catch(J){e("detail subscribe failed: %o",J),m(J,"issue details")}finally{xe===w&&(xe=null)}}let Ee=new Map,ye=new Set,Ne=br;try{let b=window.localStorage.getItem(Qo);en(b)&&(Ne=b)}catch{}async function de(b){if(!en(b)||b===Ne)return;Ne=b;try{window.localStorage.setItem(Qo,b)}catch{}let w=Ee.get(mt);if(!w)return;Ee.delete(mt),await w().catch(()=>{});let Z=Ve();try{V.register(mt,Z)}catch(Y){e("register %s store failed: %o",mt,Y)}try{let Y=await H.subscribeList(mt,Z);Ee.set(mt,Y)}catch(Y){e("re-subscribe %s failed: %o",mt,Y),m(Y,"board")}}let He=new Map,me=null,Oe=null,ge=null;async function Ie(){ge=null,$e.clear(),me=null;let b=R.getState().workspace.current?.path;if(b)try{await O.send("set-workspace",{path:b})}catch(w){e("workspace restore after reconnect failed: %o",w);return}Le(),Te(R.getState().view==="worker")}async function I(){e("clearing all subscriptions for workspace switch"),Re(),Pe(),ne.clear(),Je(),Ke(),Ae(),Le(),Me();let b=R.getState();if(b.selected_id)try{V.unregister(`detail:${b.selected_id}`)}catch{}let w=R.getState();Ce(w.view==="board"),Te(w.view==="worker"),w.selected_id&&Se(w.selected_id)}async function M(b){e("requesting workspace switch to %s",b),Ye=!0;try{let w=await O.send("set-workspace",{path:b});e("workspace switch result: %o",w),w&&w.workspace&&(R.setState({workspace:{current:{path:w.workspace.root_dir,database:w.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",b),w.changed&&(await I(),Q("Switched to "+y(b),"success",2e3)))}catch(w){throw e("workspace switch failed: %o",w),Q("Failed to switch workspace","error",3e3),w}finally{Ye=!1}}async function c(b){e("requesting workspace git pull for %s",b);try{let w=await O.send("git-pull-workspace",{});e("workspace git pull result: %o",w);let Z=w?.status;if(Z==="up_to_date"){Q("Already up to date","success",2e3);return}if(Z==="stash_pop_conflict"){Q("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}Q("Git pulled "+y(b),"success",2e3)}catch(w){e("workspace git pull failed: %o",w);let Z=w?.code,Y=w?.message;if(Z==="rebase_conflict"){Q("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(Z==="rebase_conflict_abort_failed"){Q("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(Z==="busy"){Q("Git pull skipped: another operation is running","warning",3e3);return}let J=Y?`: ${Y}`:"";throw Q(`Git pull failed${J}`,"error",3e3),w}}async function f(b,w){e("setting workspace visibility %s \u2192 %s",b,String(w));try{await O.send("set-workspace-visibility",{path:b,visible:w}),await g()}catch(Z){e("workspace visibility update failed: %o",Z),Q("Failed to update project visibility","error",3e3)}}async function g(){try{let b=await O.send("list-workspaces",{});if(e("workspaces loaded: %o",b),b&&Array.isArray(b.workspaces)){let w=b.workspaces.map(fe=>({path:fe.path,database:fe.database,pid:fe.pid,version:fe.version})),Z=b.current?{path:b.current.root_dir,database:b.current.db_path}:null,Y=Array.isArray(b.hidden)?b.hidden.filter(fe=>typeof fe=="string"):[];R.setState({workspace:{current:Z,available:w,hidden:Y}});let J=window.localStorage.getItem("beads-ui.workspace");J&&(!w.some(wt=>wt.path===J)||Y.includes(J)?window.localStorage.removeItem("beads-ui.workspace"):Z&&J!==Z.path&&(e("restoring saved workspace preference: %s",J),await M(J)))}}catch(b){e("failed to load workspaces: %o",b)}}O.on("workspace-changed",b=>{e("workspace-changed event: %o",b),b&&b.root_dir&&(R.setState({workspace:{current:{path:b.root_dir,database:b.db_path}}}),g(),I())});let A=!1;if(typeof O.onConnection=="function"){let b=w=>{e("ws state %s",w),w==="reconnecting"||w==="closed"?(A=!0,Q("Connection lost. Reconnecting\u2026","error",4e3)):w==="open"&&A&&(A=!1,Q("Reconnected","success",2200),Gl(R,(Z,Y)=>{e(`${Z}: %o`,Y)}),Ie())};O.onConnection(b)}let T="board";try{let b=window.localStorage.getItem("beads-ui.view");(b==="board"||b==="worker")&&(T=b)}catch(b){e("view parse error: %o",b)}let R=Es({config:Wl(),view:T});O.on("worker-queue-snapshot",b=>{let w=b;if(!w||!w.queue)return;let Z=R.getState().workspace.current?.path;if(typeof Z=="string"&&Z.length>0&&w.root_dir!==Z){e("dropping worker-queue snapshot for %s",String(w.root_dir));return}try{ne.set(w.queue)}catch{}});let K=Ts(R);K.start();let te=async(b,w)=>{try{return await F(b,w)}catch{return[]}};n&&Co(n,R,K);let z=document.getElementById("workspace-picker");z&&Wo(z,R,M,c,f);let _e=Do(t,(b,w)=>F(b,w));try{let b=document.getElementById("new-issue-btn");b&&b.addEventListener("click",()=>_e.open())}catch{}let ee=Ao(t,{policyStore:$e,transport:(b,w)=>F(b,w),labelOptions:()=>{let b=new Set;for(let[w]of jn)for(let Z of V.snapshotFor(w)||[]){let Y=Z.labels;if(Array.isArray(Y))for(let J of Y)typeof J=="string"&&J.length>0&&b.add(J)}return Array.from(b).sort()}});try{let b=document.getElementById("display-settings-btn");b&&b.addEventListener("click",()=>ee.open())}catch{}let be=Ns(s,{gotoIssue:b=>K.gotoIssue(b),issueStores:V,transport:te,uiOrderStore:se,displayPolicyStore:$e,closedRange:Ne,onClosedRangeChange:b=>{de(b)},onNewIssue:()=>_e.open()}),Lt=Hn(o,{transport:te,issueStores:V,queueStore:ne,sessionLogStore:Ge,uiOrderStore:se,gotoIssue:b=>R.setState({selected_id:b}),getWorkspacePath:()=>R.getState().workspace.current?.path}),et=So(i,{issueStores:V,transport:te,queueStore:ne,sessionLogStore:Ge,getWorkspacePath:()=>R.getState().workspace.current?.path,onNavigate:b=>{R.getState().view==="worker"?R.setState({selected_id:b}):K.gotoIssue(b)},onClose:()=>{let b=R.getState();R.setState({selected_id:null});try{K.gotoView(b.view==="worker"?"worker":"board")}catch{}}}),_t=R.getState().selected_id;_t&&(i.hidden=!1,et.load(_t),Se(_t)),R.subscribe(b=>{let w=b.selected_id;w?(i.hidden=!1,et.load(w),Ye||Se(w)):(et.clear(),i.hidden=!0,Me())});let bt=b=>{s.hidden=b.view!=="board",o.hidden=b.view!=="worker",Ce(b.view==="board"),Te(b.view==="worker"),!b.selected_id&&b.view==="board"&&be.load(),b.view==="worker"&&Lt.load(),window.localStorage.setItem("beads-ui.view",b.view)};R.subscribe(bt),bt(R.getState()),Ke(),Le(),g().finally(()=>{pe=!0,ce()}),window.addEventListener("keydown",b=>{let w=b.ctrlKey||b.metaKey,Z=String(b.key||"").toLowerCase(),Y=b.target,J=Y&&Y.tagName?String(Y.tagName).toLowerCase():"",fe=J==="input"||J==="textarea"||J==="select"||Y&&typeof Y.isContentEditable=="boolean"&&Y.isContentEditable;w&&Z==="n"&&(fe||(b.preventDefault(),_e.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let r=window.localStorage.getItem("beads-ui.theme"),n=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=r==="dark"||r==="light"?r:n?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let t=document.getElementById("theme-switch");t&&t.addEventListener("change",()=>{let r=t.checked?"dark":"light";document.documentElement.setAttribute("data-theme",r),window.localStorage.setItem("beads-ui.theme",r)});let e=document.getElementById("app");e&&jl(e)});export{jl as bootstrap,Wl as readBootstrapConfig,Gl as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
