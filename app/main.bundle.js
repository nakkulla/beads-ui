var Jo=Object.create;var Wr=Object.defineProperty;var ei=Object.getOwnPropertyDescriptor;var ti=Object.getOwnPropertyNames;var ri=Object.getPrototypeOf,ni=Object.prototype.hasOwnProperty;var si=(t,e,r)=>e in t?Wr(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r;var Gr=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports);var oi=(t,e,r,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of ti(e))!ni.call(t,s)&&s!==r&&Wr(t,s,{get:()=>e[s],enumerable:!(n=ei(e,s))||n.enumerable});return t};var ii=(t,e,r)=>(r=t!=null?Jo(ri(t)):{},oi(e||!t||!t.__esModule?Wr(r,"default",{value:t,enumerable:!0}):r,t));var ce=(t,e,r)=>si(t,typeof e!="symbol"?e+"":e,r);var ds=Gr((ec,cs)=>{var Ft=1e3,Bt=Ft*60,qt=Bt*60,xt=qt*24,ui=xt*7,pi=xt*365.25;cs.exports=function(t,e){e=e||{};var r=typeof t;if(r==="string"&&t.length>0)return fi(t);if(r==="number"&&isFinite(t))return e.long?mi(t):hi(t);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(t))};function fi(t){if(t=String(t),!(t.length>100)){var e=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(t);if(e){var r=parseFloat(e[1]),n=(e[2]||"ms").toLowerCase();switch(n){case"years":case"year":case"yrs":case"yr":case"y":return r*pi;case"weeks":case"week":case"w":return r*ui;case"days":case"day":case"d":return r*xt;case"hours":case"hour":case"hrs":case"hr":case"h":return r*qt;case"minutes":case"minute":case"mins":case"min":case"m":return r*Bt;case"seconds":case"second":case"secs":case"sec":case"s":return r*Ft;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r;default:return}}}}function hi(t){var e=Math.abs(t);return e>=xt?Math.round(t/xt)+"d":e>=qt?Math.round(t/qt)+"h":e>=Bt?Math.round(t/Bt)+"m":e>=Ft?Math.round(t/Ft)+"s":t+"ms"}function mi(t){var e=Math.abs(t);return e>=xt?br(t,e,xt,"day"):e>=qt?br(t,e,qt,"hour"):e>=Bt?br(t,e,Bt,"minute"):e>=Ft?br(t,e,Ft,"second"):t+" ms"}function br(t,e,r,n){var s=e>=r*1.5;return Math.round(t/r)+" "+n+(s?"s":"")}});var ps=Gr((tc,us)=>{function gi(t){r.debug=r,r.default=r,r.coerce=a,r.disable=i,r.enable=s,r.enabled=l,r.humanize=ds(),r.destroy=d,Object.keys(t).forEach(f=>{r[f]=t[f]}),r.names=[],r.skips=[],r.formatters={};function e(f){let _=0;for(let k=0;k<f.length;k++)_=(_<<5)-_+f.charCodeAt(k),_|=0;return r.colors[Math.abs(_)%r.colors.length]}r.selectColor=e;function r(f){let _,k=null,v,y;function I(...B){if(!I.enabled)return;let U=I,z=Number(new Date),G=z-(_||z);U.diff=G,U.prev=_,U.curr=z,_=z,B[0]=r.coerce(B[0]),typeof B[0]!="string"&&B.unshift("%O");let P=0;B[0]=B[0].replace(/%([a-zA-Z%])/g,(T,$)=>{if(T==="%%")return"%";P++;let g=r.formatters[$];if(typeof g=="function"){let M=B[P];T=g.call(U,M),B.splice(P,1),P--}return T}),r.formatArgs.call(U,B),(U.log||r.log).apply(U,B)}return I.namespace=f,I.useColors=r.useColors(),I.color=r.selectColor(f),I.extend=n,I.destroy=r.destroy,Object.defineProperty(I,"enabled",{enumerable:!0,configurable:!1,get:()=>k!==null?k:(v!==r.namespaces&&(v=r.namespaces,y=r.enabled(f)),y),set:B=>{k=B}}),typeof r.init=="function"&&r.init(I),I}function n(f,_){let k=r(this.namespace+(typeof _>"u"?":":_)+f);return k.log=this.log,k}function s(f){r.save(f),r.namespaces=f,r.names=[],r.skips=[];let _=(typeof f=="string"?f:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let k of _)k[0]==="-"?r.skips.push(k.slice(1)):r.names.push(k)}function o(f,_){let k=0,v=0,y=-1,I=0;for(;k<f.length;)if(v<_.length&&(_[v]===f[k]||_[v]==="*"))_[v]==="*"?(y=v,I=k,v++):(k++,v++);else if(y!==-1)v=y+1,I++,k=I;else return!1;for(;v<_.length&&_[v]==="*";)v++;return v===_.length}function i(){let f=[...r.names,...r.skips.map(_=>"-"+_)].join(",");return r.enable(""),f}function l(f){for(let _ of r.skips)if(o(f,_))return!1;for(let _ of r.names)if(o(f,_))return!0;return!1}function a(f){return f instanceof Error?f.stack||f.message:f}function d(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return r.enable(r.load()),r}us.exports=gi});var fs=Gr((We,wr)=>{We.formatArgs=bi;We.save=wi;We.load=ki;We.useColors=_i;We.storage=yi();We.destroy=(()=>{let t=!1;return()=>{t||(t=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();We.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function _i(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let t;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(t=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(t[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function bi(t){if(t[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+t[0]+(this.useColors?"%c ":" ")+"+"+wr.exports.humanize(this.diff),!this.useColors)return;let e="color: "+this.color;t.splice(1,0,e,"color: inherit");let r=0,n=0;t[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(r++,s==="%c"&&(n=r))}),t.splice(n,0,e)}We.log=console.debug||console.log||(()=>{});function wi(t){try{t?We.storage.setItem("debug",t):We.storage.removeItem("debug")}catch{}}function ki(){let t;try{t=We.storage.getItem("debug")||We.storage.getItem("DEBUG")}catch{}return!t&&typeof process<"u"&&"env"in process&&(t=process.env.DEBUG),t}function yi(){try{return localStorage}catch{}}wr.exports=ps()(We);var{formatters:vi}=wr.exports;vi.j=function(t){try{return JSON.stringify(t)}catch(e){return"[UnexpectedJSONParseError]: "+e.message}}});var Zt=globalThis,gr=Zt.trustedTypes,Kn=gr?gr.createPolicy("lit-html",{createHTML:t=>t}):void 0,ts="$lit$",mt=`lit$${Math.random().toFixed(9).slice(2)}$`,rs="?"+mt,ai=`<${rs}>`,vt=document,Xt=()=>vt.createComment(""),Qt=t=>t===null||typeof t!="object"&&typeof t!="function",Qr=Array.isArray,li=t=>Qr(t)||typeof t?.[Symbol.iterator]=="function",jr=`[ 	
\f\r]`,Kt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Zn=/-->/g,Xn=/>/g,kt=RegExp(`>|${jr}(?:([^\\s"'>=/]+)(${jr}*=${jr}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Qn=/'/g,Jn=/"/g,ns=/^(?:script|style|textarea|title)$/i,Jr=t=>(e,...r)=>({_$litType$:t,strings:e,values:r}),p=Jr(1),Vl=Jr(2),Kl=Jr(3),$t=Symbol.for("lit-noChange"),we=Symbol.for("lit-nothing"),es=new WeakMap,yt=vt.createTreeWalker(vt,129);function ss(t,e){if(!Qr(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return Kn!==void 0?Kn.createHTML(e):e}var ci=(t,e)=>{let r=t.length-1,n=[],s,o=e===2?"<svg>":e===3?"<math>":"",i=Kt;for(let l=0;l<r;l++){let a=t[l],d,f,_=-1,k=0;for(;k<a.length&&(i.lastIndex=k,f=i.exec(a),f!==null);)k=i.lastIndex,i===Kt?f[1]==="!--"?i=Zn:f[1]!==void 0?i=Xn:f[2]!==void 0?(ns.test(f[2])&&(s=RegExp("</"+f[2],"g")),i=kt):f[3]!==void 0&&(i=kt):i===kt?f[0]===">"?(i=s??Kt,_=-1):f[1]===void 0?_=-2:(_=i.lastIndex-f[2].length,d=f[1],i=f[3]===void 0?kt:f[3]==='"'?Jn:Qn):i===Jn||i===Qn?i=kt:i===Zn||i===Xn?i=Kt:(i=kt,s=void 0);let v=i===kt&&t[l+1].startsWith("/>")?" ":"";o+=i===Kt?a+ai:_>=0?(n.push(d),a.slice(0,_)+ts+a.slice(_)+mt+v):a+mt+(_===-2?l:v)}return[ss(t,o+(t[r]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),n]},Jt=class t{constructor({strings:e,_$litType$:r},n){let s;this.parts=[];let o=0,i=0,l=e.length-1,a=this.parts,[d,f]=ci(e,r);if(this.el=t.createElement(d,n),yt.currentNode=this.el.content,r===2||r===3){let _=this.el.content.firstChild;_.replaceWith(..._.childNodes)}for(;(s=yt.nextNode())!==null&&a.length<l;){if(s.nodeType===1){if(s.hasAttributes())for(let _ of s.getAttributeNames())if(_.endsWith(ts)){let k=f[i++],v=s.getAttribute(_).split(mt),y=/([.?@])?(.*)/.exec(k);a.push({type:1,index:o,name:y[2],strings:v,ctor:y[1]==="."?Vr:y[1]==="?"?Kr:y[1]==="@"?Zr:Pt}),s.removeAttribute(_)}else _.startsWith(mt)&&(a.push({type:6,index:o}),s.removeAttribute(_));if(ns.test(s.tagName)){let _=s.textContent.split(mt),k=_.length-1;if(k>0){s.textContent=gr?gr.emptyScript:"";for(let v=0;v<k;v++)s.append(_[v],Xt()),yt.nextNode(),a.push({type:2,index:++o});s.append(_[k],Xt())}}}else if(s.nodeType===8)if(s.data===rs)a.push({type:2,index:o});else{let _=-1;for(;(_=s.data.indexOf(mt,_+1))!==-1;)a.push({type:7,index:o}),_+=mt.length-1}o++}}static createElement(e,r){let n=vt.createElement("template");return n.innerHTML=e,n}};function Nt(t,e,r=t,n){if(e===$t)return e;let s=n!==void 0?r._$Co?.[n]:r._$Cl,o=Qt(e)?void 0:e._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(t),s._$AT(t,r,n)),n!==void 0?(r._$Co??(r._$Co=[]))[n]=s:r._$Cl=s),s!==void 0&&(e=Nt(t,s._$AS(t,e.values),s,n)),e}var Yr=class{constructor(e,r){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:r},parts:n}=this._$AD,s=(e?.creationScope??vt).importNode(r,!0);yt.currentNode=s;let o=yt.nextNode(),i=0,l=0,a=n[0];for(;a!==void 0;){if(i===a.index){let d;a.type===2?d=new er(o,o.nextSibling,this,e):a.type===1?d=new a.ctor(o,a.name,a.strings,this,e):a.type===6&&(d=new Xr(o,this,e)),this._$AV.push(d),a=n[++l]}i!==a?.index&&(o=yt.nextNode(),i++)}return yt.currentNode=vt,s}p(e){let r=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(e,n,r),r+=n.strings.length-2):n._$AI(e[r])),r++}},er=class t{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,r,n,s){this.type=2,this._$AH=we,this._$AN=void 0,this._$AA=e,this._$AB=r,this._$AM=n,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,r=this._$AM;return r!==void 0&&e?.nodeType===11&&(e=r.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,r=this){e=Nt(this,e,r),Qt(e)?e===we||e==null||e===""?(this._$AH!==we&&this._$AR(),this._$AH=we):e!==this._$AH&&e!==$t&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):li(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==we&&Qt(this._$AH)?this._$AA.nextSibling.data=e:this.T(vt.createTextNode(e)),this._$AH=e}$(e){let{values:r,_$litType$:n}=e,s=typeof n=="number"?this._$AC(e):(n.el===void 0&&(n.el=Jt.createElement(ss(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===s)this._$AH.p(r);else{let o=new Yr(s,this),i=o.u(this.options);o.p(r),this.T(i),this._$AH=o}}_$AC(e){let r=es.get(e.strings);return r===void 0&&es.set(e.strings,r=new Jt(e)),r}k(e){Qr(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,n,s=0;for(let o of e)s===r.length?r.push(n=new t(this.O(Xt()),this.O(Xt()),this,this.options)):n=r[s],n._$AI(o),s++;s<r.length&&(this._$AR(n&&n._$AB.nextSibling,s),r.length=s)}_$AR(e=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);e!==this._$AB;){let n=e.nextSibling;e.remove(),e=n}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},Pt=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,r,n,s,o){this.type=1,this._$AH=we,this._$AN=void 0,this.element=e,this.name=r,this._$AM=s,this.options=o,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=we}_$AI(e,r=this,n,s){let o=this.strings,i=!1;if(o===void 0)e=Nt(this,e,r,0),i=!Qt(e)||e!==this._$AH&&e!==$t,i&&(this._$AH=e);else{let l=e,a,d;for(e=o[0],a=0;a<o.length-1;a++)d=Nt(this,l[n+a],r,a),d===$t&&(d=this._$AH[a]),i||(i=!Qt(d)||d!==this._$AH[a]),d===we?e=we:e!==we&&(e+=(d??"")+o[a+1]),this._$AH[a]=d}i&&!s&&this.j(e)}j(e){e===we?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},Vr=class extends Pt{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===we?void 0:e}},Kr=class extends Pt{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==we)}},Zr=class extends Pt{constructor(e,r,n,s,o){super(e,r,n,s,o),this.type=5}_$AI(e,r=this){if((e=Nt(this,e,r,0)??we)===$t)return;let n=this._$AH,s=e===we&&n!==we||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,o=e!==we&&(n===we||s);s&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},Xr=class{constructor(e,r,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=r,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){Nt(this,e)}};var di=Zt.litHtmlPolyfillSupport;di?.(Jt,er),(Zt.litHtmlVersions??(Zt.litHtmlVersions=[])).push("3.3.1");var ie=(t,e,r)=>{let n=r?.renderBefore??e,s=n._$litPart$;if(s===void 0){let o=r?.renderBefore??null;n._$litPart$=s=new er(e.insertBefore(Xt(),o),o,void 0,r??{})}return s._$AI(t),s};var _r="today",os=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}];function en(t){return t==="today"||t==="7d"||t==="30d"||t==="all"}function is(t,e=Date.now()){switch(t){case"today":{let r=new Date(e);return r.setHours(0,0,0,0),r.getTime()}case"7d":return e-7*864e5;case"30d":return e-30*864e5;case"all":default:return}}function as(){let t=null,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{get(){return t},set(n){t=n,r()},clear(){t=null,r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}function ls(){let t=new Map,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{set(n,s){t.set(n,{lines:Array.isArray(s)?[...s]:[]}),r()},append(n,s){let o=t.get(n)||{lines:[]};o.lines=[...o.lines,s],t.set(n,o),r()},get(n){return t.get(n)||null},clear(n){typeof n=="string"?t.delete(n):t.clear(),r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}var hs=ii(fs(),1);function ge(t){return(0,hs.default)(`beads-ui:${t}`)}function nt(t){if(typeof t=="number")return Number.isFinite(t)?t:0;if(typeof t=="string"){let e=Date.parse(t);return Number.isFinite(e)?e:0}return 0}function St(t,e){let r=nt(t.created_at),n=nt(e.created_at);if(r!==n)return r<n?1:-1;let s=t.priority??2,o=e.priority??2;if(s!==o)return s-o;let i=t.id,l=e.id;return i<l?-1:i>l?1:0}function _s(t,e){let r=nt(t.created_at),n=nt(e.created_at);if(r!==n)return r<n?-1:1;let s=t.priority??2,o=e.priority??2;if(s!==o)return s-o;let i=t.id,l=e.id;return i<l?-1:i>l?1:0}function bs(t,e){let r=nt(t.updated_at),n=nt(e.updated_at);if(r!==n)return r<n?1:-1;let s=t.id,o=e.id;return s<o?-1:s>o?1:0}function ws(t,e){let r=t.priority??2,n=e.priority??2;if(r!==n)return r-n;let s=nt(t.created_at),o=nt(e.created_at);if(s!==o)return s<o?1:-1;let i=t.id,l=e.id;return i<l?-1:i>l?1:0}function ks(t,e){let r=t.closed_at??0,n=e.closed_at??0;if(r!==n)return r<n?1:-1;let s=t?.id,o=e?.id;return s<o?-1:s>o?1:0}var $i=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function ms(t){let e=t&&t.metadata,r=e?e.task_order:void 0;if(r==null||r==="")return Number.POSITIVE_INFINITY;let n=Number(r);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function gs(t){let e=t&&t.title;if(typeof e!="string")return Number.POSITIVE_INFINITY;let r=$i.exec(e);if(!r)return Number.POSITIVE_INFINITY;let n=Number(r[1]);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function ys(t,e){let r=ms(t),n=ms(e);if(r!==n)return r<n?-1:1;let s=gs(t),o=gs(e);if(s!==o)return s<o?-1:1;let i=nt(t&&t.created_at),l=nt(e&&e.created_at);if(i!==l)return i<l?-1:1;let a=t&&t.id,d=e&&e.id;return a===d?0:String(a)<String(d)?-1:1}var tn=2**20;function Ut(t,e){let r=t&&t.id;return e&&typeof r=="string"&&Object.prototype.hasOwnProperty.call(e,r)&&typeof e[r]=="number"&&Number.isFinite(e[r])?e[r]:-nt(t&&t.created_at)}function kr(t){return(e,r)=>{let n=Ut(e,t),s=Ut(r,t);if(n!==s)return n<s?-1:1;let o=e?.id,i=r?.id;return o<i?-1:o>i?1:0}}function rn(t,e,r){let n=Array.isArray(t)?t:[],s=n.length,o=Math.max(0,Math.min(e,s-1)),i=o-1>=0?n[o-1]:null,l=o+1<s?n[o+1]:null;if(!i&&!l)return{rank:0};if(!i)return{rank:Ut(l,r)-tn};if(!l)return{rank:Ut(i,r)+tn};let a=Ut(i,r),d=Ut(l,r),f=(a+d)/2;return a<f&&f<d?{rank:f}:{renormalize:n.map((_,k)=>({bead_id:_.id,rank:k*tn}))}}function nn(t,e={}){let r=ge(`issue-store:${t}`),n=new Map,s=[],o=0,i=new Set,l=!1,a=e.sort||St;function d(){for(let k of Array.from(i))try{k()}catch{}}function f(){s=Array.from(n.values()).sort(a)}function _(k){if(l||!k||k.id!==t)return;let v=Number(k.revision)||0;if(r("apply %s rev=%d",k.type,v),!(v<=o&&k.type!=="snapshot")){if(k.type==="snapshot"){if(v<=o)return;n.clear();let y=Array.isArray(k.issues)?k.issues:[];for(let I of y)I&&typeof I.id=="string"&&I.id.length>0&&n.set(I.id,I);f(),o=v,d();return}if(k.type==="upsert"){let y=k.issue;if(y&&typeof y.id=="string"&&y.id.length>0){let I=n.get(y.id);if(!I)n.set(y.id,y);else{let B=Number.isFinite(I.updated_at)?I.updated_at:0,U=Number.isFinite(y.updated_at)?y.updated_at:0;if(B<=U){for(let z of Object.keys(I))z in y||delete I[z];for(let[z,G]of Object.entries(y))I[z]=G}}f()}o=v,d()}else if(k.type==="delete"){let y=String(k.issue_id||"");y&&(n.delete(y),f()),o=v,d()}}}return{id:t,subscribe(k){return i.add(k),()=>{i.delete(k)}},applyPush:_,snapshot(){return s},size(){return n.size},getById(k){return n.get(k)},dispose(){l=!0,n.clear(),s=[],i.clear(),o=0}}}function yr(t){let e=String(t.type||"").trim(),r={};if(t.params&&typeof t.params=="object"){let s=Object.keys(t.params).sort();for(let o of s){let i=t.params[o];r[o]=String(i)}}let n=new URLSearchParams(r).toString();return n.length>0?`${e}?${n}`:e}function vs(t){let e=ge("subs"),r=new Map,n=new Map;function s(l,a){e("applyDelta %s +%d ~%d -%d",l,(a.added||[]).length,(a.updated||[]).length,(a.removed||[]).length);let d=n.get(l);if(!d||d.size===0)return;let f=Array.isArray(a.added)?a.added:[],_=Array.isArray(a.updated)?a.updated:[],k=Array.isArray(a.removed)?a.removed:[];for(let v of Array.from(d)){let y=r.get(v);if(!y)continue;let I=y.itemsById;for(let B of f)typeof B=="string"&&B.length>0&&I.set(B,!0);for(let B of _)typeof B=="string"&&B.length>0&&I.set(B,!0);for(let B of k)typeof B=="string"&&B.length>0&&I.delete(B)}}async function o(l,a){let d=yr(a);if(e("subscribe %s key=%s",l,d),!r.has(l))r.set(l,{key:d,itemsById:new Map});else{let _=r.get(l);if(_&&_.key!==d){let k=n.get(_.key);k&&(k.delete(l),k.size===0&&n.delete(_.key)),r.set(l,{key:d,itemsById:new Map})}}n.has(d)||n.set(d,new Set);let f=n.get(d);f&&f.add(l);try{await t("subscribe-list",{id:l,type:a.type,params:a.params})}catch(_){let k=r.get(l)||null;if(k){let v=n.get(k.key);v&&(v.delete(l),v.size===0&&n.delete(k.key))}throw r.delete(l),_}return async()=>{e("unsubscribe %s key=%s",l,d);try{await t("unsubscribe-list",{id:l})}catch{}let _=r.get(l)||null;if(_){let k=n.get(_.key);k&&(k.delete(l),k.size===0&&n.delete(_.key))}r.delete(l)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:yr,selectors:{getIds(l){let a=r.get(l);return a?Array.from(a.itemsById.keys()):[]},has(l,a){let d=r.get(l);return d?d.itemsById.has(a):!1},count(l){let a=r.get(l);return a?a.itemsById.size:0},getItemsById(l){let a=r.get(l),d={};if(!a)return d;for(let f of a.itemsById.keys())d[f]=!0;return d}}}}function $s(){let t=ge("issue-stores"),e=new Map,r=new Map,n=new Set,s=new Map;function o(){for(let a of Array.from(n))try{a()}catch{}}function i(a,d,f){let _=d?yr(d):"",k=r.get(a)||"",v=e.has(a);if(t("register %s key=%s (prev=%s)",a,_,k),v&&k&&_&&k!==_){let y=e.get(a);if(y)try{y.dispose()}catch{}let I=s.get(a);if(I){try{I()}catch{}s.delete(a)}let B=nn(a,f);e.set(a,B);let U=B.subscribe(()=>o());s.set(a,U)}else if(!v){let y=nn(a,f);e.set(a,y);let I=y.subscribe(()=>o());s.set(a,I)}return r.set(a,_),()=>l(a)}function l(a){t("unregister %s",a),r.delete(a);let d=e.get(a);d&&(d.dispose(),e.delete(a));let f=s.get(a);if(f){try{f()}catch{}s.delete(a)}}return{register:i,unregister:l,getStore(a){return e.get(a)||null},snapshotFor(a){let d=e.get(a);return d?d.snapshot().slice():[]},subscribe(a){return n.add(a),()=>n.delete(a)}}}function xs(){let t=null,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{get(){return t},set(n){t=n,r()},clear(){t=null,r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}function Ss(){let t=null,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{get(){return t},set(n){t=n,r()},clear(){t=null,r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}function sn(t,e){return`#/${t==="worker"?"worker":"board"}?issue=${encodeURIComponent(e)}`}function xi(t){let e=String(t||""),r=e.startsWith("#")?e.slice(1):e,n=r.indexOf("?"),s=n>=0?r.slice(n+1):"";if(s){let l=new URLSearchParams(s).get("issue");if(l)return decodeURIComponent(l)}let o=/^\/issue\/([^\s?#]+)/.exec(r);return o&&o[1]?decodeURIComponent(o[1]):null}function Si(t){let e=String(t||"");return/^#\/worker(\b|\/|$)/.test(e)?"worker":"board"}function Ts(t){let e=ge("router"),r=()=>{let n=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(n),o=s&&s[1]?decodeURIComponent(s[1]):xi(n),i=Si(n);if(e("hash change \u2192 view=%s id=%s",i,o),t.setState({selected_id:i==="worker"?null:o,view:i,worker:{selected_parent_id:i==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(n)){let a=o?`#/${i}?issue=${encodeURIComponent(o)}`:`#/${i}`;window.location.hash!==a&&(window.location.hash=a)}};return{start(){window.addEventListener("hashchange",r),r()},stop(){window.removeEventListener("hashchange",r)},gotoIssue(n){let o=(t.getState?t.getState():{view:"board"}).view==="worker"?"worker":"board",i=sn(o,n);e("goto issue %s (view=%s)",n,o),window.location.hash!==i?window.location.hash=i:t.setState({selected_id:o==="worker"?null:n,view:o,worker:{selected_parent_id:o==="worker"?n:null}})},gotoView(n){let s=t.getState?t.getState():{selected_id:null,worker:{selected_parent_id:null}},o=n==="worker"?s.worker?.selected_parent_id:s.selected_id,i=o?sn(n,o):`#/${n}`;e("goto view %s (id=%s)",n,o||""),window.location.hash!==i?window.location.hash=i:t.setState({view:n,selected_id:n==="worker"?null:s.selected_id})}}}var Ti=Object.freeze({workspace_config:{default_workspace:null}});function As(t){return{workspace_config:{default_workspace:typeof t?.workspace_config?.default_workspace=="string"&&t.workspace_config.default_workspace.length>0?t.workspace_config.default_workspace:Ti.workspace_config.default_workspace}}}function Es(t={}){let e=ge("state"),r={selected_id:t.selected_id??null,view:t.view??"board",filters:{status:t.filters?.status??"all",search:t.filters?.search??"",type:typeof t.filters?.type=="string"?t.filters?.type:""},board:{closed_filter:t.board?.closed_filter==="3"||t.board?.closed_filter==="7"||t.board?.closed_filter==="today"?t.board?.closed_filter:"today",show_deferred_column:t.board?.show_deferred_column===!0},worker:{selected_parent_id:t.worker?.selected_parent_id??null,show_closed_children:Array.isArray(t.worker?.show_closed_children)?t.worker.show_closed_children:[]},workspace:{current:t.workspace?.current??null,available:t.workspace?.available??[],hidden:t.workspace?.hidden??[]},config:As(t.config)},n=new Set;function s(){for(let o of Array.from(n))try{o(r)}catch{}}return{getState(){return r},setState(o){let i={...r,...o,filters:{...r.filters,...o.filters||{}},board:{...r.board,...o.board||{}},worker:{...r.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:r.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:r.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:r.workspace.hidden},config:o.config!==void 0?As(o.config):r.config},l=i.workspace.current?.path!==r.workspace.current?.path||i.workspace.available.length!==r.workspace.available.length||i.workspace.hidden.length!==r.workspace.hidden.length||i.workspace.hidden.some((d,f)=>d!==r.workspace.hidden[f]),a=i.config.workspace_config.default_workspace!==r.config.workspace_config.default_workspace;i.selected_id===r.selected_id&&i.view===r.view&&i.filters.status===r.filters.status&&i.filters.search===r.filters.search&&i.filters.type===r.filters.type&&i.board.closed_filter===r.board.closed_filter&&i.board.show_deferred_column===r.board.show_deferred_column&&i.worker.selected_parent_id===r.worker.selected_parent_id&&i.worker.show_closed_children.length===r.worker.show_closed_children.length&&i.worker.show_closed_children.every((d,f)=>d===r.worker.show_closed_children[f])&&!l&&!a||(r=i,e("state change %o",{selected_id:r.selected_id,view:r.view,filters:r.filters,board:r.board,worker:r.worker,workspace:r.workspace.current?.path,config:{default_workspace:r.config.workspace_config.default_workspace}}),s())},subscribe(o){return n.add(o),()=>n.delete(o)}}}function Cs(t){let e=ge("activity"),r=0,n=new Map,s=1;function o(){if(!t)return;let d=r>0;t.toggleAttribute("hidden",!d),t.setAttribute("aria-busy",d?"true":"false")}function i(){r+=1,e("start count=%d",r),o()}function l(){let d=r;r=Math.max(0,r-1),d<=0?e("done called but count was already %d",d):e("done count=%d\u2192%d",d,r),o()}function a(d){return async(_,k)=>{let v=s++,y=Date.now();n.set(v,{type:_,start_ts:y}),e("request start id=%d type=%s count=%d",v,_,r+1),i();let I=!1,B=()=>{I||(I=!0,n.delete(v),l())},U=setTimeout(()=>{I||(e("request TIMEOUT id=%d type=%s elapsed=%dms",v,_,Date.now()-y),B())},3e4);try{let z=await d(_,k),G=Date.now()-y;return e("request done id=%d type=%s elapsed=%dms",v,_,G),z}catch(z){let G=Date.now()-y;throw e("request error id=%d type=%s elapsed=%dms err=%o",v,_,G,z),z}finally{clearTimeout(U),B()}}}return o(),{wrapSend:a,start:i,done:l,getCount:()=>r,getActiveRequests:()=>{let d=Date.now();return Array.from(n.entries()).map(([f,_])=>({id:f,type:_.type,elapsed_ms:d-_.start_ts}))}}}function X(t,e="info",r=2800){let n=document.createElement("div");n.className="toast",n.textContent=t,n.style.position="fixed",n.style.right="12px",n.style.bottom="12px",n.style.zIndex="1000",n.style.color="#fff",n.style.padding="8px 10px",n.style.borderRadius="4px",n.style.fontSize="12px",e==="success"?n.style.background="#156d36":e==="warning"?n.style.background="#a36a00":e==="error"?n.style.background="#9f2011":n.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(n),setTimeout(()=>{try{n.remove()}catch{}},r)}function vr(t=void 0,e=void 0){function r(){if(!e||typeof e.get!="function")return null;let o=e.get();return o&&o.order?o.order:{}}function n(o,i,l){let a=t&&t.snapshotFor?t.snapshotFor(o).slice():[];if(i==="closed")return a.sort(ks),a;switch(l){case"created_desc":return a.sort(St),a;case"created_asc":return a.sort(_s),a;case"updated_desc":return a.sort(bs),a;case"priority":return a.sort(ws),a;case"manual":default:{let d=r();return d?a.sort(kr(d)):a.sort(St),a}}}function s(o){let i=[];return t&&typeof t.subscribe=="function"&&i.push(t.subscribe(o)),e&&typeof e.subscribe=="function"&&i.push(e.subscribe(o)),()=>{for(let l of i)try{l()}catch{}}}return{selectBoardColumn:n,subscribe:s}}function $r(t){let e=t.transport,r=t.uiOrderStore;function n(i,l){return"renormalize"in i?i.renormalize:[{bead_id:l,rank:i.rank}]}function s(i,l){let a={...i.order};for(let d of l)a[d.bead_id]=d.rank;r&&r.set({revision:i.revision,order:a})}async function o(i,l,a){if(!e||!r)return;let d=r.get()||{revision:0,order:{}},f=n(rn(l,a,d.order),i);s(d,f);let _=await e("ui-order-set",{expected_revision:d.revision,entries:f});if(_&&_.conflict){let k={revision:typeof _.revision=="number"?_.revision:0,order:_.order||{}};r.set(k);let v=n(rn(l,a,k.order),i);s(k,v);let y=await e("ui-order-set",{expected_revision:k.revision,entries:v});y&&y.applied&&r.set({revision:typeof y.revision=="number"?y.revision:0,order:y.order||{}})}else _&&_.applied&&r.set({revision:typeof _.revision=="number"?_.revision:0,order:_.order||{}})}return{applyReorder:o}}function xr(t){return Array.isArray(t)?t.filter(e=>typeof e=="string"):[]}function on(t,e){return!e||typeof t!="string"||t.length===0||xr(e.visible_labels).includes(t)?!0:xr(e.hidden_labels).includes(t)?!1:!xr(e.hidden_prefixes).some(r=>r.length>0&&t.startsWith(r))}function Rs(t,e){return xr(t).filter(r=>on(r,e))}function Tt(t,e){let r=t&&t.chips?t.chips[e]:void 0;return typeof r=="boolean"?r:!0}function an(t){if(!t)return null;if(typeof t=="number")return Number.isFinite(t)?t:null;let e=Date.parse(t);return Number.isFinite(e)?e:null}function gt(t){let e=an(t);if(e===null)return"";let r=new Date(e),n=s=>String(s).padStart(2,"0");return`${r.getFullYear()}-${n(r.getMonth()+1)}-${n(r.getDate())} ${n(r.getHours())}:${n(r.getMinutes())}`}function ln(t,e){let r=an(t);if(r===null)return"";let s=(typeof e=="number"?e:Date.now())-r;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let i=Math.floor(s/36e5);if(i<24)return`${i}\uC2DC\uAC04 \uC804`;let l=Math.floor(s/864e5);if(l<7)return`${l}\uC77C \uC804`;let a=Math.floor(l/7);if(l<30)return`${a}\uC8FC \uC804`;let d=Math.floor(l/30);return d<12?`${d}\uAC1C\uC6D4 \uC804`:`${Math.floor(l/365)}\uB144 \uC804`}var Ai={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg"},Ei={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge"},Ci={spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},Ri={reviewed:"\u2713",skip:"\u2298",stale:"\u2713"};function Li(t,e,r){if(!(r==="in_progress"||r==="resolved"))return null;for(let s of t)if(e[s]&&e[s].state==="dim")return s;return null}function Ii(t,e,r){let n=Ai[t]||t,s=e&&e.state||"empty",o=Ri[s]||"",i="bar";s==="dim"?i+=` b-${n} dim`:s==="on"||s==="reviewed"||s==="skip"?i+=` b-${n} on`:s==="stale"&&(i+=` b-${n} stale`),r&&(i+=" glow");let l=s==="empty"?"lbl":`lbl l-${n} on`,a=r?`color: var(--stage-${n}-on)`:"";return p`
    <div class="seg">
      <div class=${i} style=${a}>${o}</div>
      <div class=${l}>
        ${Ei[t]||t}
      </div>
    </div>
  `}function Sr(t,e){if(!t||!t.stages)return"";let r=t.route==="full_plan"?"full_plan":"spec_backed",n=Ci[r],s=t.stages,o=Li(n,s,String(e||"open"));return p`
    <div class="stp" role="img" aria-label="워크플로우 진행 스테퍼">
      ${n.map(i=>Ii(i,s[i]||{state:"empty"},i===o))}
    </div>
  `}function Di(t){return typeof t!="number"||!Number.isFinite(t)?"":`P${Math.max(0,Math.min(4,t))}`}var Ls=2;function Oi(t){if(!t)return[];let e=[];if(t.external){let n=t.reason?`\u23F8 blocked: ${t.reason}`:"\u23F8 blocked";e.push(p`<span class="ctl-chip ctl-chip--blocked">${n}</span>`)}let r=Array.isArray(t.blockers)?t.blockers:[];if(r.length>0){let n=r.slice(0,Ls).join(", "),s=r.length-Ls,o=`\u26D3 blocked: ${n}${s>0?` +${s}`:""}`;e.push(p`<span class="ctl-chip ctl-chip--blocked-dep">${o}</span>`)}return e}function Mi(t,e){let r=e.policy||null,n=t.workflow&&t.workflow.chips||{},s=[];if(n.route&&Tt(r,"route")){let o=n.route_source==="derived";s.push(p`<span
        class="ctl-chip ctl-chip--route${o?" is-derived":""}"
        title=${o?"route \uCD94\uB860\uAC12 (metadata \uBBF8\uD540)":"route"}
        >${o?`${n.route} ?`:n.route}</span
      >`)}if(n.fast_track&&Tt(r,"fast_track")&&s.push(p`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),n.pr&&Tt(r,"pr")){let o=n.pr.number;s.push(p`<span class="ctl-chip ctl-chip--pr"
        >${`PR${o!=null?` #${o}`:""}`}</span
      >`)}for(let o of Rs(t.labels,r))s.push(p`<span class="ctl-chip ctl-chip--label">${o}</span>`);return t.from_id&&Tt(r,"from")&&s.push(p`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${t.from_id} \uC5F4\uAE30`}
        @click=${o=>{o.stopPropagation(),e.onFromChipClick&&e.onFromChipClick(o,String(t.from_id))}}
      >
        ↩ from ${t.from_id}
      </button>`),Tt(r,"blocked")&&s.push(...Oi(t.blocked_info)),s.length===0?"":p`<div class="board-card__chips">${s}</div>`}function Ni(t){switch(t){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function Pi(t){let e=ln(t.created_at),r=ln(t.updated_at);return!e&&!r?"":p`<span class="board-card__times">
    ${e?p`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${gt(t.created_at)}`}
          >생성 ${e}</span
        >`:""}
    ${e&&r?p`<span class="board-card__time-sep">·</span>`:""}
    ${r?p`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${gt(t.updated_at)}`}
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
      ${t.workflow&&Tt(e.policy||null,"stepper")?Sr(t.workflow,t.status):""}
      ${Fi(t,e)}
    </article>
  `}function At(t,e){let r=Array.isArray(t.items)?t.items.length:0,n=t.is_closed===!0;return p`
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
  `}var Hi=200,Wi={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","deferred-col":"deferred","closed-col":"closed"},Gi=new Set(["blocked-col","ready-col","in-progress-col","resolved-col","deferred-col"]),Os="beads-ui.board.sort",Ms=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function ji(){try{let t=window.localStorage.getItem(Os);if(t&&Ms.has(t))return t}catch{}return"created_desc"}function Ns(t,e){let r=ge("views:board"),n=e.gotoIssue,s=e.issueStores,o=e.transport,i=e.uiOrderStore,l=e.displayPolicyStore,a=e.onClosedRangeChange,d=e.onNewIssue,f=e.closedRange||_r,_=s?vr(s,i):null,k=$r({transport:o,uiOrderStore:i}),v=[],y=[],I=[],B=[],U=[],z=[],G=!1,P=0,S=ji(),T=new Map,$=new Map,g=new Map,M=new Set,F={search:"",priority:"",type:"",labels:[]},W=!1,Y=null;function ee(R){return String(R.status||"open")==="open"}function re(R){let c=String(R.status||"open");return c==="open"||c==="blocked"}function ye(R){let c=F.search.trim().toLowerCase(),h=F.priority,A=F.type,O=F.labels;return R.filter(b=>{if(c){let E=String(b.id||"").toLowerCase(),x=String(b.title||"").toLowerCase();if(!E.includes(c)&&!x.includes(c))return!1}if(h!==""&&String(b.priority)!==h||A!==""&&String(b.issue_type||"")!==A)return!1;if(O.length>0){let E=Array.isArray(b.labels)?b.labels:[];if(!O.some(x=>E.includes(x)))return!1}return!0})}function Ge(){let R=new Set;for(let c of[v,y,I,B,U,z])for(let h of c){let A=Array.isArray(h.labels)?h.labels:[];for(let O of A)typeof O=="string"&&O.length>0&&R.add(O)}return Array.from(R).sort()}function Ue(){return F.search.trim()!==""||F.priority!==""||F.type!==""||F.labels.length>0}function _e(){try{if(_){let R=_.selectBoardColumn("tab:board:in-progress","in_progress",S),c=_.selectBoardColumn("tab:board:blocked","blocked",S).filter(re),h=new Set(R.map(H=>H.id)),A=_.selectBoardColumn("tab:board:ready","ready",S).filter(H=>ee(H)&&!h.has(H.id)),O=_.selectBoardColumn("tab:board:resolved","resolved",S),b=_.selectBoardColumn("tab:board:deferred","deferred",S),E=G?b:[],x=_.selectBoardColumn("tab:board:closed","closed").slice(0,Hi),C=[...c,...A,...R,...O,...E,...x];ve(C);let K=new Set;for(let H of C)H&&H.id&&!cn(H)&&K.add(H.id);let te=!Ue();v=te?zt(c,K):c,y=te?zt(A,K):A,I=te?zt(R,K):R,B=te?zt(O,K):O,U=te?zt(E,K):E,P=b.length,z=te?zt(x,K):x,T=new Map;for(let H of v)T.set(H.id,"open");for(let H of y)T.set(H.id,"open");for(let H of I)T.set(H.id,"in_progress");for(let H of B)T.set(H.id,"resolved");for(let H of U)T.set(H.id,"deferred");for(let H of z)T.set(H.id,"closed");$=new Map;for(let H of v)$.set(H.id,"blocked-col");for(let H of y)$.set(H.id,"ready-col");for(let H of I)$.set(H.id,"in-progress-col");for(let H of B)$.set(H.id,"resolved-col");for(let H of U)$.set(H.id,"deferred-col");for(let H of z)$.set(H.id,"closed-col")}he()}catch{v=[],y=[],I=[],B=[],U=[],z=[],g=new Map,he()}}function ve(R){let c=new Map;for(let A of R)A&&A.id&&!c.has(A.id)&&c.set(A.id,A);let h=new Map;for(let A of c.values()){let O=cn(A);if(!O)continue;let b=h.get(O);b||(b=[],h.set(O,b)),b.push({id:A.id,title:A.title,status:A.status,metadata:A.metadata,created_at:A.created_at})}g=h}function je(R){let c=g.get(R)||[],h=0,A=null;for(let O of c)(O.status==="resolved"||O.status==="closed")&&(h+=1),!A&&O.status==="in_progress"&&(A=O);return{total:c.length,count:h,current:A,children:c}}function ae(R){return!M.has(R)}function at(R,c){R.preventDefault(),R.stopPropagation(),M.has(c)?M.delete(c):M.add(c),he()}function de(R,c){R.preventDefault(),R.stopPropagation(),n(c)}function Ye(R,c){R.preventDefault(),R.stopPropagation(),n(c)}function se(R,c){Y||n(c)}function Oe(R,c){R.preventDefault(),R.stopPropagation(),Yi(c).then(h=>{h&&X("\uBCF5\uC0AC\uB428","success",1200)})}function Xe(R,c){Y=c,R.dataTransfer&&(R.dataTransfer.setData("text/plain",c),R.dataTransfer.effectAllowed="move"),R.target.classList.add("board-card--dragging")}function $e(R){R.target.classList.remove("board-card--dragging"),et(),setTimeout(()=>{Y=null},0)}function Se(R){let c=String(R.target.value||"");!c||c===f||(f=c,a&&a(c),he())}let be={onCardClick:se,onCopyId:Oe,onDragStart:Xe,onDragEnd:$e,onClosedRangeChange:Se,rollupFor:je,isExpanded:ae,onRollupToggle:at,onChildClick:de,onFromChipClick:Ye,get policy(){return l?l.get():null}};function Me(R){let c=R.target,h=t.querySelector(".board-filter__labels");c&&h&&h.contains(c)||le()}function Ve(R){R.key==="Escape"&&le()}function Te(){W||(W=!0,document.addEventListener("mousedown",Me),document.addEventListener("keydown",Ve),he())}function le(){W&&(W=!1,document.removeEventListener("mousedown",Me),document.removeEventListener("keydown",Ve),he())}let Ae={onSearchInput(R){F.search=String(R.target.value||""),_e()},onPriorityChange(R){F.priority=String(R.target.value||""),_e()},onTypeChange(R){F.type=String(R.target.value||""),_e()},onSortChange(R){let c=String(R.target.value||"");if(!(!Ms.has(c)||c===S)){S=c;try{window.localStorage.setItem(Os,c)}catch{}_e()}},onDeferredToggle(){G=!G,_e()},onLabelMenuToggle(){W?le():Te()},onLabelToggle(R){let c=F.labels.indexOf(R);c===-1?F.labels.push(R):F.labels.splice(c,1),_e()},onLabelClear(){F.labels.length!==0&&(F.labels=[],_e())},onNewIssue(){d&&d()}};function Ne(){let R=G?"board-root board-root--deferred":"board-root";return p`
      <div class="board-view">
        ${Ds(F,Ae,{sort_mode:S,show_deferred:G,deferred_count:P,label_options:Ge(),label_menu_open:W})}
        <div class=${R}>
          ${At({title:"Blocked",id:"blocked-col",items:ye(v)},be)}
          ${At({title:"Ready",id:"ready-col",items:ye(y)},be)}
          ${At({title:"In progress",id:"in-progress-col",items:ye(I)},be)}
          ${At({title:"Resolved",id:"resolved-col",items:ye(B)},be)}
          ${G?At({title:"Deferred",id:"deferred-col",items:ye(U)},be):""}
          ${At({title:"Closed",id:"closed-col",items:ye(z),is_closed:!0,closed_range:f},be)}
        </div>
      </div>
    `}function he(){ie(Ne(),t),xe()}function xe(){try{let R=Array.from(t.querySelectorAll(".board-column"));for(let c of R)Array.from(c.querySelectorAll(".board-card")).forEach((A,O)=>{A.tabIndex=O===0?0:-1})}catch{}}async function ze(R,c){if(!o){X("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:R,status:c}),X("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(h){r("update-status failed: %o",h),X("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function Ee(R){switch(R){case"blocked-col":return v;case"ready-col":return y;case"in-progress-col":return I;case"resolved-col":return B;case"deferred-col":return U;default:return[]}}function Ke(R,c,h){if(!o||!i)return;let A=Ee(R),O=A.find(K=>K.id===c);if(!O)return;let b=A.filter(K=>K.id!==c),E=h.closest?h.closest(".board-card"):null,x=b.length;if(E){let K=E.getAttribute("data-issue-id");if(K===c)return;let te=b.findIndex(H=>H.id===K);te>=0&&(x=te)}let C=b.slice();C.splice(x,0,O),k.applyReorder(c,C,x)}function et(){for(let R of Array.from(t.querySelectorAll(".board-column--drag-over")))R.classList.remove("board-column--drag-over")}let pe=null;t.addEventListener("dragover",R=>{R.preventDefault(),R.dataTransfer&&(R.dataTransfer.dropEffect="move");let h=R.target.closest(".board-column");h&&h!==pe&&(pe&&pe.classList.remove("board-column--drag-over"),h.classList.add("board-column--drag-over"),pe=h)}),t.addEventListener("dragleave",R=>{let c=R.relatedTarget;(!c||!t.contains(c))&&pe&&(pe.classList.remove("board-column--drag-over"),pe=null)}),t.addEventListener("drop",R=>{R.preventDefault(),pe&&(pe.classList.remove("board-column--drag-over"),pe=null);let c=R.target,h=c.closest(".board-column");if(!h)return;let A=R.dataTransfer?.getData("text/plain")||"";if(!A)return;let O=h.id,b=$.get(A);if(b&&b===O){if(Gi.has(O)){if(S!=="manual"){X("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}Ke(O,A,c)}return}let E=Wi[O];if(!E){X("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}T.get(A)!==E&&ze(A,E)}),t.addEventListener("keydown",R=>{let c=R.target;if(!(c instanceof HTMLElement))return;let h=String(c.tagName||"").toLowerCase();if(h==="input"||h==="textarea"||h==="select"||h==="button"||h==="a"||c.isContentEditable===!0)return;let A=c.closest(".board-card");if(!A)return;let O=String(R.key||"");if(O==="Enter"||O===" "){R.preventDefault();let C=A.getAttribute("data-issue-id");C&&n(C);return}if(O!=="ArrowUp"&&O!=="ArrowDown"&&O!=="ArrowLeft"&&O!=="ArrowRight")return;R.preventDefault();let b=A.closest(".board-column");if(!b)return;let E=Array.from(b.querySelectorAll(".board-card")),x=E.indexOf(A);if(O==="ArrowDown"&&x<E.length-1){Ce(A,E[x+1]);return}if(O==="ArrowUp"&&x>0){Ce(A,E[x-1]);return}if(O==="ArrowLeft"||O==="ArrowRight"){let C=Array.from(t.querySelectorAll(".board-column")),K=C.indexOf(b),te=O==="ArrowRight"?1:-1,H=K+te;for(;H>=0&&H<C.length;){let Z=C[H].querySelector(".board-card");if(Z){Ce(A,Z);return}H+=te}}});function Ce(R,c){try{R.tabIndex=-1,c.tabIndex=0,c.focus()}catch{}}let Re=null;_&&_.subscribe&&(Re=_.subscribe(()=>{try{_e()}catch{}}));let Le=null;return l&&l.subscribe&&(Le=l.subscribe(()=>{try{_e()}catch{}})),{async load(){r("load"),_e()},clear(){le(),Re&&(Re(),Re=null),Le&&(Le(),Le=null),t.replaceChildren(),v=[],y=[],I=[],B=[],U=[],z=[],T=new Map,$=new Map}}}function cn(t){let e=t&&t.parent;return typeof e=="string"?e:e&&e.id?String(e.id):""}function zt(t,e){return t.filter(r=>{let n=cn(r);return!(n&&e.has(n))})}async function Yi(t){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(t)),!0;let e=document.createElement("textarea");e.value=String(t),e.style.position="fixed",e.style.left="-9999px",document.body.appendChild(e),e.select();let r=!1;try{r=document.execCommand("copy")}finally{e.remove()}return r}catch{return!1}}async function Ht(t){let e=String(t);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(e),!0}catch{}try{let r=document.createElement("textarea");r.value=e,r.style.position="fixed",r.style.left="-9999px",document.body.appendChild(r),r.select();let n=!1;try{n=document.execCommand("copy")}finally{r.remove()}return n}catch{return!1}}var Vi={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},Ki=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,Zi=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function _t(t){return!!t&&typeof t=="object"}function dn(t){return typeof t!="string"||t.length===0?[]:t.split(/\r?\n/)}function Ps(t,e){let r=dn(t),n=dn(e),s=new Map;for(let l of r)s.set(l,(s.get(l)||0)+1);let o=0;for(let l of n){let a=s.get(l)||0;a>0?s.set(l,a-1):o+=1}let i=0;for(let l of s.values())i+=l;return{added:o,removed:i}}function Xi(t){let e="";typeof t=="string"?e=t:Array.isArray(t)?e=t.map(s=>_t(s)&&typeof s.text=="string"?s.text:"").join(""):_t(t)&&typeof t.text=="string"&&(e=t.text);let n=(String(e).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return n.length>120?`${n.slice(0,117)}\u2026`:n}function Qi(t){let e=String(t.name||""),r=t.input||{},n={kind:"tool",tool:e,icon:Vi[e]||"\u{1F527}",input:r,expandable:!0};if((e==="Read"||e==="Write")&&(n.path=String(r.file_path||r.path||"")),e==="Write"&&(n.added=dn(r.content).length),e==="Edit"){n.path=String(r.file_path||r.path||"");let{added:s,removed:o}=Ps(r.old_string,r.new_string);n.added=s,n.removed=o}if(e==="MultiEdit"){n.path=String(r.file_path||r.path||"");let s=0,o=0,i=Array.isArray(r.edits)?r.edits:[];for(let l of i){let a=Ps(_t(l)?l.old_string:"",_t(l)?l.new_string:"");s+=a.added,o+=a.removed}n.added=s,n.removed=o}return e==="Bash"&&(n.command=String(r.command||"")),(e==="Grep"||e==="Glob")&&(n.command=String(r.pattern||r.query||"")),n}function Fs(t){let e=t.split(/\r?\n/).find(n=>n.trim().length>0)||"",r=Ki.exec(e);return r?{kind:"gate",gate:r[2]==="implementation"?"impl":r[2],reviewer:r[3],verdict:r[4],time:r[5]?r[5].trim():void 0,text:e.trim()}:Zi.test(e)&&e.trim().length<=80?{kind:"phase",text:e.trim()}:{kind:"assistant",text:t}}function Ji(t,e){if(t.type==="assistant"){let r=t.message,n=r&&Array.isArray(r.content)?r.content:[],s=[];for(let o of n)if(_t(o)){if(o.type==="text"&&typeof o.text=="string")s.push(Fs(o.text));else if(o.type==="tool_use"){let i=Qi(o);typeof o.id=="string"&&e.set(o.id,i),s.push(i)}}return s}if(t.type==="user"){let r=t.message,n=r&&Array.isArray(r.content)?r.content:[];for(let s of n)if(_t(s)&&s.type==="tool_result"){let o=e.get(String(s.tool_use_id));if(o){let i=Xi(s.content);o.result=i,o.output=typeof s.content=="string"?s.content:i}}return[]}if(t.type==="result"){let r=t.is_error===!1&&t.subtype==="success";return[{kind:"result",success:r,text:typeof t.result=="string"?t.result:r?"DONE":""}]}return[]}function ea(t){if(t.type==="item.completed"&&_t(t.item)){let e=t.item;return e.type==="agent_message"&&typeof e.text=="string"?[Fs(e.text)]:e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}if(t.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(t.type==="turn.failed"){let e=t.error;return[{kind:"error",text:e&&typeof e.message=="string"?e.message:"turn failed"}]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:[]}function ta(t){let e=t.type;return typeof e=="string"&&(e==="error"||e.startsWith("thread.")||e.startsWith("turn.")||e.startsWith("item."))}function Bs(t){let e=[],r=new Map,n=Array.isArray(t)?t:[];for(let s of n){let o=s;if(typeof s=="string"){let l=s.trim();if(l.length===0)continue;try{o=JSON.parse(l)}catch{continue}}if(!_t(o))continue;let i=ta(o)?ea(o):Ji(o,r);for(let l of i)e.push(l)}return e}function Tr(t,e={}){let{transport:r,sessionLogStore:n,onClose:s}=e,o=null,i={},l=!0,a=new Set,d=null;function f(){if(!o||!n)return[];let $=n.get(o);return Bs($?$.lines:[])}function _($,g){if(g.kind==="gate")return p`<div class="sv__gate">${g.text}</div>`;if(g.kind==="phase")return p`<div class="sv__phase">${g.text}</div>`;if(g.kind==="result")return p`<div
        class="sv__result${g.success?" sv__result--ok":" sv__result--fail"}"
      >
        ${g.success?"\u2713":"\u2717"}
        ${g.text||(g.success?"DONE":"\uC2E4\uD328")}
      </div>`;if(g.kind==="error")return p`<div class="sv__error">⛔ ${g.text}</div>`;if(g.kind==="blocker")return p`<div class="sv__error">⛔ ${g.text}</div>`;if(g.kind==="tool"){let M=a.has($),F=g.tool==="Bash"?g.command:g.path||g.command||"";return p`<div
        class="sv__tool${M?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>B($)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${g.icon}</span>
          <span class="sv__tool-name">${g.tool}</span>
          ${F?p`<span class="sv__tool-detail">${F}</span>`:""}
          ${typeof g.added=="number"?p`<span class="sv__diff-add">+${g.added}</span>`:""}
          ${typeof g.removed=="number"?p`<span class="sv__diff-del">−${g.removed}</span>`:""}
          ${g.result?p`<span class="sv__tool-ok">→ ${g.result}</span>`:""}
        </span>
        ${M?p`<pre class="sv__tool-expand">${k(g)}</pre>`:""}
      </div>`}return p`<div class="sv__as">${g.text}</div>`}function k($){let g=[];if($.input!==void 0)try{g.push(`input: ${JSON.stringify($.input,null,2)}`)}catch{}return typeof $.output=="string"&&$.output.length>0&&g.push(`output:
${$.output}`),g.join(`

`)}function v(){if(!o)return p``;let $=f(),g=[i.runner,i.model,i.effort].filter(Boolean).join(" \xB7 "),M=i.session_id||"",F=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${l?"ON":"OFF"}`;return p`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id">${o}</span>
        ${M?p`<button
              type="button"
              class="sv__session"
              title=${M}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${M}`}
              @click=${()=>z(M)}
            >
              ⧉ ${M.slice(0,8)}
            </button>`:""}
        ${g?p`<span class="sv__meta">${g}</span>`:""}
        ${i.worktree?p`<span class="sv__wt" title=${i.worktree}
              >${i.worktree}</span
            >`:""}
        <button
          type="button"
          class="sv__follow${l?" sv__follow--on":""}"
          aria-pressed=${l?"true":"false"}
          aria-label=${F}
          @click=${U}
        >
          <span class="sv__follow-full">⇣ ${F}</span>
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
        ${$.length===0?p`<div class="sv__empty">세션 로그 없음</div>`:$.map((W,Y)=>_(Y,W))}
      </div>
    </div>`}function y(){ie(v(),t),l&&I()}function I(){let $=t.querySelector(".sv__body");$&&($.scrollTop=$.scrollHeight)}function B($){a.has($)?a.delete($):a.add($),y()}function U(){l=!l,y()}function z($){Ht($).then(g=>{g?X("\uBCF5\uC0AC\uB428","success",1200):X("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function G($){!o||!$||(i={...i,...$},y())}function P($){let g=$.target;if(!g||!g.classList||!g.classList.contains("sv__body"))return;!(g.scrollHeight-g.scrollTop-g.clientHeight<=4)&&l&&(l=!1,y())}t.addEventListener("scroll",P,!0);function S($){let g=$&&$.attempt_id;g&&(o=g,i=$.meta||{},l=!0,a.clear(),!d&&n&&(d=n.subscribe(y)),r&&Promise.resolve(r("subscribe-session-log",{id:`session-log:${o}`,attempt_id:o})).catch(()=>{}),y())}function T(){let $=o;o=null,a.clear(),r&&$&&Promise.resolve(r("unsubscribe-session-log",{id:`session-log:${$}`})).catch(()=>{}),ie(p``,t),s&&s()}return{open:S,updateMeta:G,close:T,isOpen(){return o!==null},destroy(){d&&(d(),d=null),t.removeEventListener("scroll",P,!0),o=null,ie(p``,t)}}}function ra(t){let e=t&&t.metadata||{},r=[];return typeof e.spec_id=="string"&&e.spec_id.trim().length>0&&r.push({kind:"spec",path:e.spec_id.trim()}),typeof e.plan_path=="string"&&e.plan_path.trim().length>0&&r.push({kind:"plan",path:e.plan_path.trim()}),r}function qs(t,e){let r=ra(t);return p`
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
  `}var un=["opus","sonnet","haiku","fable"],pn=["low","medium","high","xhigh"],fn=["codex","opus","fable","self","skip"],hn=["opus","fable","sonnet","haiku"],na=["standard","fast_track"],mn={orchestration_model:"(\uAE30\uBCF8: opus)",orchestration_effort:"(\uAE30\uBCF8: CLI \uAE30\uBCF8)",review_model:"(\uAE30\uBCF8: codex)",impl_model:"(\uAE30\uBCF8: \uD2F0\uC5B4 \uC790\uB3D9)"};function Ar(t,e){let r=e&&e[t];return typeof r=="string"&&r.length>0?`(\uAE30\uBCF8: ${r} \u2014 \uC804\uC5ED)`:mn[t]||"(\uAE30\uBCF8)"}function tr(t,e,r,n,s,o){return p`
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
    ${tr("orchestration_model","orchestration_model",rr(un,Ar("orchestration_model",s)),n.orchestration_model||"",!1,e)}
    ${tr("orchestration_effort","orchestration_effort",rr(pn,Ar("orchestration_effort",s)),n.orchestration_effort||"",!1,e)}
    ${tr("review_model","review_model",rr(fn,Ar("review_model",s)),n.review_model||"",!1,e)}
    ${tr("impl_model","impl_model",rr(hn,Ar("impl_model",s)),n.impl_model||"",!1,e)}
    ${tr("workflow_mode","workflow_mode",rr(na),o,n.workflow_mode==="fast_track",e)}
  `}var{entries:Zs,setPrototypeOf:zs,isFrozen:sa,getPrototypeOf:oa,getOwnPropertyDescriptor:ia}=Object,{freeze:Fe,seal:Je,create:vn}=Object,{apply:$n,construct:xn}=typeof Reflect<"u"&&Reflect;Fe||(Fe=function(e){return e});Je||(Je=function(e){return e});$n||($n=function(e,r){for(var n=arguments.length,s=new Array(n>2?n-2:0),o=2;o<n;o++)s[o-2]=arguments[o];return e.apply(r,s)});xn||(xn=function(e){for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return new e(...n)});var Er=Be(Array.prototype.forEach),aa=Be(Array.prototype.lastIndexOf),Hs=Be(Array.prototype.pop),nr=Be(Array.prototype.push),la=Be(Array.prototype.splice),Rr=Be(String.prototype.toLowerCase),gn=Be(String.prototype.toString),_n=Be(String.prototype.match),sr=Be(String.prototype.replace),ca=Be(String.prototype.indexOf),da=Be(String.prototype.trim),st=Be(Object.prototype.hasOwnProperty),Pe=Be(RegExp.prototype.test),or=ua(TypeError);function Be(t){return function(e){e instanceof RegExp&&(e.lastIndex=0);for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return $n(t,e,n)}}function ua(t){return function(){for(var e=arguments.length,r=new Array(e),n=0;n<e;n++)r[n]=arguments[n];return xn(t,r)}}function J(t,e){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Rr;zs&&zs(t,null);let n=e.length;for(;n--;){let s=e[n];if(typeof s=="string"){let o=r(s);o!==s&&(sa(e)||(e[n]=o),s=o)}t[s]=!0}return t}function pa(t){for(let e=0;e<t.length;e++)st(t,e)||(t[e]=null);return t}function pt(t){let e=vn(null);for(let[r,n]of Zs(t))st(t,r)&&(Array.isArray(n)?e[r]=pa(n):n&&typeof n=="object"&&n.constructor===Object?e[r]=pt(n):e[r]=n);return e}function ir(t,e){for(;t!==null;){let n=ia(t,e);if(n){if(n.get)return Be(n.get);if(typeof n.value=="function")return Be(n.value)}t=oa(t)}function r(){return null}return r}var Ws=Fe(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),bn=Fe(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),wn=Fe(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),fa=Fe(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),kn=Fe(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),ha=Fe(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Gs=Fe(["#text"]),js=Fe(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),yn=Fe(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Ys=Fe(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Cr=Fe(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),ma=Je(/\{\{[\w\W]*|[\w\W]*\}\}/gm),ga=Je(/<%[\w\W]*|[\w\W]*%>/gm),_a=Je(/\$\{[\w\W]*/gm),ba=Je(/^data-[\-\w.\u00B7-\uFFFF]+$/),wa=Je(/^aria-[\-\w]+$/),Xs=Je(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),ka=Je(/^(?:\w+script|data):/i),ya=Je(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Qs=Je(/^html$/i),va=Je(/^[a-z][.\w]*(-[.\w]+)+$/i),Vs=Object.freeze({__proto__:null,ARIA_ATTR:wa,ATTR_WHITESPACE:ya,CUSTOM_ELEMENT:va,DATA_ATTR:ba,DOCTYPE_NAME:Qs,ERB_EXPR:ga,IS_ALLOWED_URI:Xs,IS_SCRIPT_OR_DATA:ka,MUSTACHE_EXPR:ma,TMPLIT_EXPR:_a}),ar={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},$a=function(){return typeof window>"u"?null:window},xa=function(e,r){if(typeof e!="object"||typeof e.createPolicy!="function")return null;let n=null,s="data-tt-policy-suffix";r&&r.hasAttribute(s)&&(n=r.getAttribute(s));let o="dompurify"+(n?"#"+n:"");try{return e.createPolicy(o,{createHTML(i){return i},createScriptURL(i){return i}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},Ks=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Js(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:$a(),e=D=>Js(D);if(e.version="3.3.0",e.removed=[],!t||!t.document||t.document.nodeType!==ar.document||!t.Element)return e.isSupported=!1,e;let{document:r}=t,n=r,s=n.currentScript,{DocumentFragment:o,HTMLTemplateElement:i,Node:l,Element:a,NodeFilter:d,NamedNodeMap:f=t.NamedNodeMap||t.MozNamedAttrMap,HTMLFormElement:_,DOMParser:k,trustedTypes:v}=t,y=a.prototype,I=ir(y,"cloneNode"),B=ir(y,"remove"),U=ir(y,"nextSibling"),z=ir(y,"childNodes"),G=ir(y,"parentNode");if(typeof i=="function"){let D=r.createElement("template");D.content&&D.content.ownerDocument&&(r=D.content.ownerDocument)}let P,S="",{implementation:T,createNodeIterator:$,createDocumentFragment:g,getElementsByTagName:M}=r,{importNode:F}=n,W=Ks();e.isSupported=typeof Zs=="function"&&typeof G=="function"&&T&&T.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:Y,ERB_EXPR:ee,TMPLIT_EXPR:re,DATA_ATTR:ye,ARIA_ATTR:Ge,IS_SCRIPT_OR_DATA:Ue,ATTR_WHITESPACE:_e,CUSTOM_ELEMENT:ve}=Vs,{IS_ALLOWED_URI:je}=Vs,ae=null,at=J({},[...Ws,...bn,...wn,...kn,...Gs]),de=null,Ye=J({},[...js,...yn,...Ys,...Cr]),se=Object.seal(vn(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Oe=null,Xe=null,$e=Object.seal(vn(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),Se=!0,be=!0,Me=!1,Ve=!0,Te=!1,le=!0,Ae=!1,Ne=!1,he=!1,xe=!1,ze=!1,Ee=!1,Ke=!0,et=!1,pe="user-content-",Ce=!0,Re=!1,Le={},R=null,c=J({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),h=null,A=J({},["audio","video","img","source","image","track"]),O=null,b=J({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),E="http://www.w3.org/1998/Math/MathML",x="http://www.w3.org/2000/svg",C="http://www.w3.org/1999/xhtml",K=C,te=!1,H=null,Z=J({},[E,x,C],gn),me=J({},["mi","mo","mn","ms","mtext"]),lt=J({},["annotation-xml"]),Rt=J({},["title","style","font","a","script"]),tt=null,ht=["application/xhtml+xml","text/html"],Lt="text/html",m=null,w=null,V=r.createElement("form"),j=function(u){return u instanceof RegExp||u instanceof Function},Q=function(){let u=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(w&&w===u)){if((!u||typeof u!="object")&&(u={}),u=pt(u),tt=ht.indexOf(u.PARSER_MEDIA_TYPE)===-1?Lt:u.PARSER_MEDIA_TYPE,m=tt==="application/xhtml+xml"?gn:Rr,ae=st(u,"ALLOWED_TAGS")?J({},u.ALLOWED_TAGS,m):at,de=st(u,"ALLOWED_ATTR")?J({},u.ALLOWED_ATTR,m):Ye,H=st(u,"ALLOWED_NAMESPACES")?J({},u.ALLOWED_NAMESPACES,gn):Z,O=st(u,"ADD_URI_SAFE_ATTR")?J(pt(b),u.ADD_URI_SAFE_ATTR,m):b,h=st(u,"ADD_DATA_URI_TAGS")?J(pt(A),u.ADD_DATA_URI_TAGS,m):A,R=st(u,"FORBID_CONTENTS")?J({},u.FORBID_CONTENTS,m):c,Oe=st(u,"FORBID_TAGS")?J({},u.FORBID_TAGS,m):pt({}),Xe=st(u,"FORBID_ATTR")?J({},u.FORBID_ATTR,m):pt({}),Le=st(u,"USE_PROFILES")?u.USE_PROFILES:!1,Se=u.ALLOW_ARIA_ATTR!==!1,be=u.ALLOW_DATA_ATTR!==!1,Me=u.ALLOW_UNKNOWN_PROTOCOLS||!1,Ve=u.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Te=u.SAFE_FOR_TEMPLATES||!1,le=u.SAFE_FOR_XML!==!1,Ae=u.WHOLE_DOCUMENT||!1,xe=u.RETURN_DOM||!1,ze=u.RETURN_DOM_FRAGMENT||!1,Ee=u.RETURN_TRUSTED_TYPE||!1,he=u.FORCE_BODY||!1,Ke=u.SANITIZE_DOM!==!1,et=u.SANITIZE_NAMED_PROPS||!1,Ce=u.KEEP_CONTENT!==!1,Re=u.IN_PLACE||!1,je=u.ALLOWED_URI_REGEXP||Xs,K=u.NAMESPACE||C,me=u.MATHML_TEXT_INTEGRATION_POINTS||me,lt=u.HTML_INTEGRATION_POINTS||lt,se=u.CUSTOM_ELEMENT_HANDLING||{},u.CUSTOM_ELEMENT_HANDLING&&j(u.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(se.tagNameCheck=u.CUSTOM_ELEMENT_HANDLING.tagNameCheck),u.CUSTOM_ELEMENT_HANDLING&&j(u.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(se.attributeNameCheck=u.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),u.CUSTOM_ELEMENT_HANDLING&&typeof u.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(se.allowCustomizedBuiltInElements=u.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Te&&(be=!1),ze&&(xe=!0),Le&&(ae=J({},Gs),de=[],Le.html===!0&&(J(ae,Ws),J(de,js)),Le.svg===!0&&(J(ae,bn),J(de,yn),J(de,Cr)),Le.svgFilters===!0&&(J(ae,wn),J(de,yn),J(de,Cr)),Le.mathMl===!0&&(J(ae,kn),J(de,Ys),J(de,Cr))),u.ADD_TAGS&&(typeof u.ADD_TAGS=="function"?$e.tagCheck=u.ADD_TAGS:(ae===at&&(ae=pt(ae)),J(ae,u.ADD_TAGS,m))),u.ADD_ATTR&&(typeof u.ADD_ATTR=="function"?$e.attributeCheck=u.ADD_ATTR:(de===Ye&&(de=pt(de)),J(de,u.ADD_ATTR,m))),u.ADD_URI_SAFE_ATTR&&J(O,u.ADD_URI_SAFE_ATTR,m),u.FORBID_CONTENTS&&(R===c&&(R=pt(R)),J(R,u.FORBID_CONTENTS,m)),Ce&&(ae["#text"]=!0),Ae&&J(ae,["html","head","body"]),ae.table&&(J(ae,["tbody"]),delete Oe.tbody),u.TRUSTED_TYPES_POLICY){if(typeof u.TRUSTED_TYPES_POLICY.createHTML!="function")throw or('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof u.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw or('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');P=u.TRUSTED_TYPES_POLICY,S=P.createHTML("")}else P===void 0&&(P=xa(v,s)),P!==null&&typeof S=="string"&&(S=P.createHTML(""));Fe&&Fe(u),w=u}},ue=J({},[...bn,...wn,...fa]),ct=J({},[...kn,...ha]),Qe=function(u){let L=G(u);(!L||!L.tagName)&&(L={namespaceURI:K,tagName:"template"});let q=Rr(u.tagName),fe=Rr(L.tagName);return H[u.namespaceURI]?u.namespaceURI===x?L.namespaceURI===C?q==="svg":L.namespaceURI===E?q==="svg"&&(fe==="annotation-xml"||me[fe]):!!ue[q]:u.namespaceURI===E?L.namespaceURI===C?q==="math":L.namespaceURI===x?q==="math"&&lt[fe]:!!ct[q]:u.namespaceURI===C?L.namespaceURI===x&&!lt[fe]||L.namespaceURI===E&&!me[fe]?!1:!ct[q]&&(Rt[q]||!ue[q]):!!(tt==="application/xhtml+xml"&&H[u.namespaceURI]):!1},Ze=function(u){nr(e.removed,{element:u});try{G(u).removeChild(u)}catch{B(u)}},dt=function(u,L){try{nr(e.removed,{attribute:L.getAttributeNode(u),from:L})}catch{nr(e.removed,{attribute:null,from:L})}if(L.removeAttribute(u),u==="is")if(xe||ze)try{Ze(L)}catch{}else try{L.setAttribute(u,"")}catch{}},zr=function(u){let L=null,q=null;if(he)u="<remove></remove>"+u;else{let ke=_n(u,/^[\r\n\t ]+/);q=ke&&ke[0]}tt==="application/xhtml+xml"&&K===C&&(u='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+u+"</body></html>");let fe=P?P.createHTML(u):u;if(K===C)try{L=new k().parseFromString(fe,tt)}catch{}if(!L||!L.documentElement){L=T.createDocument(K,"template",null);try{L.documentElement.innerHTML=te?S:fe}catch{}}let De=L.body||L.documentElement;return u&&q&&De.insertBefore(r.createTextNode(q),De.childNodes[0]||null),K===C?M.call(L,Ae?"html":"body")[0]:Ae?L.documentElement:De},jt=function(u){return $.call(u.ownerDocument||u,u,d.SHOW_ELEMENT|d.SHOW_COMMENT|d.SHOW_TEXT|d.SHOW_PROCESSING_INSTRUCTION|d.SHOW_CDATA_SECTION,null)},It=function(u){return u instanceof _&&(typeof u.nodeName!="string"||typeof u.textContent!="string"||typeof u.removeChild!="function"||!(u.attributes instanceof f)||typeof u.removeAttribute!="function"||typeof u.setAttribute!="function"||typeof u.namespaceURI!="string"||typeof u.insertBefore!="function"||typeof u.hasChildNodes!="function")},Yt=function(u){return typeof l=="function"&&u instanceof l};function rt(D,u,L){Er(D,q=>{q.call(e,u,L,w)})}let Vt=function(u){let L=null;if(rt(W.beforeSanitizeElements,u,null),It(u))return Ze(u),!0;let q=m(u.nodeName);if(rt(W.uponSanitizeElement,u,{tagName:q,allowedTags:ae}),le&&u.hasChildNodes()&&!Yt(u.firstElementChild)&&Pe(/<[/\w!]/g,u.innerHTML)&&Pe(/<[/\w!]/g,u.textContent)||u.nodeType===ar.progressingInstruction||le&&u.nodeType===ar.comment&&Pe(/<[/\w]/g,u.data))return Ze(u),!0;if(!($e.tagCheck instanceof Function&&$e.tagCheck(q))&&(!ae[q]||Oe[q])){if(!Oe[q]&&Ot(q)&&(se.tagNameCheck instanceof RegExp&&Pe(se.tagNameCheck,q)||se.tagNameCheck instanceof Function&&se.tagNameCheck(q)))return!1;if(Ce&&!R[q]){let fe=G(u)||u.parentNode,De=z(u)||u.childNodes;if(De&&fe){let ke=De.length;for(let He=ke-1;He>=0;--He){let ut=I(De[He],!0);ut.__removalCount=(u.__removalCount||0)+1,fe.insertBefore(ut,U(u))}}}return Ze(u),!0}return u instanceof a&&!Qe(u)||(q==="noscript"||q==="noembed"||q==="noframes")&&Pe(/<\/no(script|embed|frames)/i,u.innerHTML)?(Ze(u),!0):(Te&&u.nodeType===ar.text&&(L=u.textContent,Er([Y,ee,re],fe=>{L=sr(L,fe," ")}),u.textContent!==L&&(nr(e.removed,{element:u.cloneNode()}),u.textContent=L)),rt(W.afterSanitizeElements,u,null),!1)},Dt=function(u,L,q){if(Ke&&(L==="id"||L==="name")&&(q in r||q in V))return!1;if(!(be&&!Xe[L]&&Pe(ye,L))){if(!(Se&&Pe(Ge,L))){if(!($e.attributeCheck instanceof Function&&$e.attributeCheck(L,u))){if(!de[L]||Xe[L]){if(!(Ot(u)&&(se.tagNameCheck instanceof RegExp&&Pe(se.tagNameCheck,u)||se.tagNameCheck instanceof Function&&se.tagNameCheck(u))&&(se.attributeNameCheck instanceof RegExp&&Pe(se.attributeNameCheck,L)||se.attributeNameCheck instanceof Function&&se.attributeNameCheck(L,u))||L==="is"&&se.allowCustomizedBuiltInElements&&(se.tagNameCheck instanceof RegExp&&Pe(se.tagNameCheck,q)||se.tagNameCheck instanceof Function&&se.tagNameCheck(q))))return!1}else if(!O[L]){if(!Pe(je,sr(q,_e,""))){if(!((L==="src"||L==="xlink:href"||L==="href")&&u!=="script"&&ca(q,"data:")===0&&h[u])){if(!(Me&&!Pe(Ue,sr(q,_e,"")))){if(q)return!1}}}}}}}return!0},Ot=function(u){return u!=="annotation-xml"&&_n(u,ve)},mr=function(u){rt(W.beforeSanitizeAttributes,u,null);let{attributes:L}=u;if(!L||It(u))return;let q={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:de,forceKeepAttr:void 0},fe=L.length;for(;fe--;){let De=L[fe],{name:ke,namespaceURI:He,value:ut}=De,Mt=m(ke),Hr=ut,Ie=ke==="value"?Hr:da(Hr);if(q.attrName=Mt,q.attrValue=Ie,q.keepAttr=!0,q.forceKeepAttr=void 0,rt(W.uponSanitizeAttribute,u,q),Ie=q.attrValue,et&&(Mt==="id"||Mt==="name")&&(dt(ke,u),Ie=pe+Ie),le&&Pe(/((--!?|])>)|<\/(style|title|textarea)/i,Ie)){dt(ke,u);continue}if(Mt==="attributename"&&_n(Ie,"href")){dt(ke,u);continue}if(q.forceKeepAttr)continue;if(!q.keepAttr){dt(ke,u);continue}if(!Ve&&Pe(/\/>/i,Ie)){dt(ke,u);continue}Te&&Er([Y,ee,re],Vn=>{Ie=sr(Ie,Vn," ")});let Yn=m(u.nodeName);if(!Dt(Yn,Mt,Ie)){dt(ke,u);continue}if(P&&typeof v=="object"&&typeof v.getAttributeType=="function"&&!He)switch(v.getAttributeType(Yn,Mt)){case"TrustedHTML":{Ie=P.createHTML(Ie);break}case"TrustedScriptURL":{Ie=P.createScriptURL(Ie);break}}if(Ie!==Hr)try{He?u.setAttributeNS(He,ke,Ie):u.setAttribute(ke,Ie),It(u)?Ze(u):Hs(e.removed)}catch{dt(ke,u)}}rt(W.afterSanitizeAttributes,u,null)},N=function D(u){let L=null,q=jt(u);for(rt(W.beforeSanitizeShadowDOM,u,null);L=q.nextNode();)rt(W.uponSanitizeShadowNode,L,null),Vt(L),mr(L),L.content instanceof o&&D(L.content);rt(W.afterSanitizeShadowDOM,u,null)};return e.sanitize=function(D){let u=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},L=null,q=null,fe=null,De=null;if(te=!D,te&&(D="<!-->"),typeof D!="string"&&!Yt(D))if(typeof D.toString=="function"){if(D=D.toString(),typeof D!="string")throw or("dirty is not a string, aborting")}else throw or("toString is not a function");if(!e.isSupported)return D;if(Ne||Q(u),e.removed=[],typeof D=="string"&&(Re=!1),Re){if(D.nodeName){let ut=m(D.nodeName);if(!ae[ut]||Oe[ut])throw or("root node is forbidden and cannot be sanitized in-place")}}else if(D instanceof l)L=zr("<!---->"),q=L.ownerDocument.importNode(D,!0),q.nodeType===ar.element&&q.nodeName==="BODY"||q.nodeName==="HTML"?L=q:L.appendChild(q);else{if(!xe&&!Te&&!Ae&&D.indexOf("<")===-1)return P&&Ee?P.createHTML(D):D;if(L=zr(D),!L)return xe?null:Ee?S:""}L&&he&&Ze(L.firstChild);let ke=jt(Re?D:L);for(;fe=ke.nextNode();)Vt(fe),mr(fe),fe.content instanceof o&&N(fe.content);if(Re)return D;if(xe){if(ze)for(De=g.call(L.ownerDocument);L.firstChild;)De.appendChild(L.firstChild);else De=L;return(de.shadowroot||de.shadowrootmode)&&(De=F.call(n,De,!0)),De}let He=Ae?L.outerHTML:L.innerHTML;return Ae&&ae["!doctype"]&&L.ownerDocument&&L.ownerDocument.doctype&&L.ownerDocument.doctype.name&&Pe(Qs,L.ownerDocument.doctype.name)&&(He="<!DOCTYPE "+L.ownerDocument.doctype.name+`>
`+He),Te&&Er([Y,ee,re],ut=>{He=sr(He,ut," ")}),P&&Ee?P.createHTML(He):He},e.setConfig=function(){let D=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};Q(D),Ne=!0},e.clearConfig=function(){w=null,Ne=!1},e.isValidAttribute=function(D,u,L){w||Q({});let q=m(D),fe=m(u);return Dt(q,fe,L)},e.addHook=function(D,u){typeof u=="function"&&nr(W[D],u)},e.removeHook=function(D,u){if(u!==void 0){let L=aa(W[D],u);return L===-1?void 0:la(W[D],L,1)[0]}return Hs(W[D])},e.removeHooks=function(D){W[D]=[]},e.removeAllHooks=function(){W=Ks()},e}var eo=Js();var to={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},ro=t=>(...e)=>({_$litDirective$:t,values:e}),Lr=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,r,n){this._$Ct=e,this._$AM=r,this._$Ci=n}_$AS(e,r){return this.update(e,r)}update(e,r){return this.render(...r)}};var lr=class extends Lr{constructor(e){if(super(e),this.it=we,e.type!==to.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===we||e==null)return this._t=void 0,this.it=e;if(e===$t)return e;if(typeof e!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;let r=[e];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}};lr.directiveName="unsafeHTML",lr.resultType=1;var no=ro(lr);function En(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Ct=En();function uo(t){Ct=t}var pr={exec:()=>null};function ne(t,e=""){let r=typeof t=="string"?t:t.source,n={replace:(s,o)=>{let i=typeof o=="string"?o:o.source;return i=i.replace(qe.caret,"$1"),r=r.replace(s,i),n},getRegex:()=>new RegExp(r,e)};return n}var Sa=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),qe={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:t=>new RegExp(`^( {0,3}${t})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}#`),htmlBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}<(?:[a-z].*>|!--)`,"i")},Ta=/^(?:[ \t]*(?:\n|$))+/,Aa=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Ea=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,fr=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Ca=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Cn=/(?:[*+-]|\d{1,9}[.)])/,po=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,fo=ne(po).replace(/bull/g,Cn).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Ra=ne(po).replace(/bull/g,Cn).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Rn=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,La=/^[^\n]+/,Ln=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,Ia=ne(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Ln).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Da=ne(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Cn).getRegex(),Pr="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",In=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Oa=ne("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",In).replace("tag",Pr).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),ho=ne(Rn).replace("hr",fr).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Pr).getRegex(),Ma=ne(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",ho).getRegex(),Dn={blockquote:Ma,code:Aa,def:Ia,fences:Ea,heading:Ca,hr:fr,html:Oa,lheading:fo,list:Da,newline:Ta,paragraph:ho,table:pr,text:La},so=ne("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",fr).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Pr).getRegex(),Na={...Dn,lheading:Ra,table:so,paragraph:ne(Rn).replace("hr",fr).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",so).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Pr).getRegex()},Pa={...Dn,html:ne(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",In).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:pr,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:ne(Rn).replace("hr",fr).replace("heading",` *#{1,6} *[^
]`).replace("lheading",fo).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Fa=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Ba=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,mo=/^( {2,}|\\)\n(?!\s*$)/,qa=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Fr=/[\p{P}\p{S}]/u,On=/[\s\p{P}\p{S}]/u,go=/[^\s\p{P}\p{S}]/u,Ua=ne(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,On).getRegex(),_o=/(?!~)[\p{P}\p{S}]/u,za=/(?!~)[\s\p{P}\p{S}]/u,Ha=/(?:[^\s\p{P}\p{S}]|~)/u,Wa=ne(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",Sa?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),bo=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,Ga=ne(bo,"u").replace(/punct/g,Fr).getRegex(),ja=ne(bo,"u").replace(/punct/g,_o).getRegex(),wo="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Ya=ne(wo,"gu").replace(/notPunctSpace/g,go).replace(/punctSpace/g,On).replace(/punct/g,Fr).getRegex(),Va=ne(wo,"gu").replace(/notPunctSpace/g,Ha).replace(/punctSpace/g,za).replace(/punct/g,_o).getRegex(),Ka=ne("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,go).replace(/punctSpace/g,On).replace(/punct/g,Fr).getRegex(),Za=ne(/\\(punct)/,"gu").replace(/punct/g,Fr).getRegex(),Xa=ne(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Qa=ne(In).replace("(?:-->|$)","-->").getRegex(),Ja=ne("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Qa).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Or=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,el=ne(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Or).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),ko=ne(/^!?\[(label)\]\[(ref)\]/).replace("label",Or).replace("ref",Ln).getRegex(),yo=ne(/^!?\[(ref)\](?:\[\])?/).replace("ref",Ln).getRegex(),tl=ne("reflink|nolink(?!\\()","g").replace("reflink",ko).replace("nolink",yo).getRegex(),oo=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,Mn={_backpedal:pr,anyPunctuation:Za,autolink:Xa,blockSkip:Wa,br:mo,code:Ba,del:pr,emStrongLDelim:Ga,emStrongRDelimAst:Ya,emStrongRDelimUnd:Ka,escape:Fa,link:el,nolink:yo,punctuation:Ua,reflink:ko,reflinkSearch:tl,tag:Ja,text:qa,url:pr},rl={...Mn,link:ne(/^!?\[(label)\]\((.*?)\)/).replace("label",Or).getRegex(),reflink:ne(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Or).getRegex()},Sn={...Mn,emStrongRDelimAst:Va,emStrongLDelim:ja,url:ne(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",oo).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:ne(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",oo).getRegex()},nl={...Sn,br:ne(mo).replace("{2,}","*").getRegex(),text:ne(Sn.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Ir={normal:Dn,gfm:Na,pedantic:Pa},cr={normal:Mn,gfm:Sn,breaks:nl,pedantic:rl},sl={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},io=t=>sl[t];function ft(t,e){if(e){if(qe.escapeTest.test(t))return t.replace(qe.escapeReplace,io)}else if(qe.escapeTestNoEncode.test(t))return t.replace(qe.escapeReplaceNoEncode,io);return t}function ao(t){try{t=encodeURI(t).replace(qe.percentDecode,"%")}catch{return null}return t}function lo(t,e){let r=t.replace(qe.findPipe,(o,i,l)=>{let a=!1,d=i;for(;--d>=0&&l[d]==="\\";)a=!a;return a?"|":" |"}),n=r.split(qe.splitPipe),s=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),e)if(n.length>e)n.splice(e);else for(;n.length<e;)n.push("");for(;s<n.length;s++)n[s]=n[s].trim().replace(qe.slashPipe,"|");return n}function dr(t,e,r){let n=t.length;if(n===0)return"";let s=0;for(;s<n;){let o=t.charAt(n-s-1);if(o===e&&!r)s++;else if(o!==e&&r)s++;else break}return t.slice(0,n-s)}function ol(t,e){if(t.indexOf(e[1])===-1)return-1;let r=0;for(let n=0;n<t.length;n++)if(t[n]==="\\")n++;else if(t[n]===e[0])r++;else if(t[n]===e[1]&&(r--,r<0))return n;return r>0?-2:-1}function co(t,e,r,n,s){let o=e.href,i=e.title||null,l=t[1].replace(s.other.outputLinkReplace,"$1");n.state.inLink=!0;let a={type:t[0].charAt(0)==="!"?"image":"link",raw:r,href:o,title:i,text:l,tokens:n.inlineTokens(l)};return n.state.inLink=!1,a}function il(t,e,r){let n=t.match(r.other.indentCodeCompensation);if(n===null)return e;let s=n[1];return e.split(`
`).map(o=>{let i=o.match(r.other.beginningSpace);if(i===null)return o;let[l]=i;return l.length>=s.length?o.slice(s.length):o}).join(`
`)}var Mr=class{constructor(t){ce(this,"options");ce(this,"rules");ce(this,"lexer");this.options=t||Ct}space(t){let e=this.rules.block.newline.exec(t);if(e&&e[0].length>0)return{type:"space",raw:e[0]}}code(t){let e=this.rules.block.code.exec(t);if(e){let r=e[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:e[0],codeBlockStyle:"indented",text:this.options.pedantic?r:dr(r,`
`)}}}fences(t){let e=this.rules.block.fences.exec(t);if(e){let r=e[0],n=il(r,e[3]||"",this.rules);return{type:"code",raw:r,lang:e[2]?e[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):e[2],text:n}}}heading(t){let e=this.rules.block.heading.exec(t);if(e){let r=e[2].trim();if(this.rules.other.endingHash.test(r)){let n=dr(r,"#");(this.options.pedantic||!n||this.rules.other.endingSpaceChar.test(n))&&(r=n.trim())}return{type:"heading",raw:e[0],depth:e[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(t){let e=this.rules.block.hr.exec(t);if(e)return{type:"hr",raw:dr(e[0],`
`)}}blockquote(t){let e=this.rules.block.blockquote.exec(t);if(e){let r=dr(e[0],`
`).split(`
`),n="",s="",o=[];for(;r.length>0;){let i=!1,l=[],a;for(a=0;a<r.length;a++)if(this.rules.other.blockquoteStart.test(r[a]))l.push(r[a]),i=!0;else if(!i)l.push(r[a]);else break;r=r.slice(a);let d=l.join(`
`),f=d.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");n=n?`${n}
${d}`:d,s=s?`${s}
${f}`:f;let _=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(f,o,!0),this.lexer.state.top=_,r.length===0)break;let k=o.at(-1);if(k?.type==="code")break;if(k?.type==="blockquote"){let v=k,y=v.raw+`
`+r.join(`
`),I=this.blockquote(y);o[o.length-1]=I,n=n.substring(0,n.length-v.raw.length)+I.raw,s=s.substring(0,s.length-v.text.length)+I.text;break}else if(k?.type==="list"){let v=k,y=v.raw+`
`+r.join(`
`),I=this.list(y);o[o.length-1]=I,n=n.substring(0,n.length-k.raw.length)+I.raw,s=s.substring(0,s.length-v.raw.length)+I.raw,r=y.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:n,tokens:o,text:s}}}list(t){let e=this.rules.block.list.exec(t);if(e){let r=e[1].trim(),n=r.length>1,s={type:"list",raw:"",ordered:n,start:n?+r.slice(0,-1):"",loose:!1,items:[]};r=n?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=n?r:"[*+-]");let o=this.rules.other.listItemRegex(r),i=!1;for(;t;){let a=!1,d="",f="";if(!(e=o.exec(t))||this.rules.block.hr.test(t))break;d=e[0],t=t.substring(d.length);let _=e[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,I=>" ".repeat(3*I.length)),k=t.split(`
`,1)[0],v=!_.trim(),y=0;if(this.options.pedantic?(y=2,f=_.trimStart()):v?y=e[1].length+1:(y=e[2].search(this.rules.other.nonSpaceChar),y=y>4?1:y,f=_.slice(y),y+=e[1].length),v&&this.rules.other.blankLine.test(k)&&(d+=k+`
`,t=t.substring(k.length+1),a=!0),!a){let I=this.rules.other.nextBulletRegex(y),B=this.rules.other.hrRegex(y),U=this.rules.other.fencesBeginRegex(y),z=this.rules.other.headingBeginRegex(y),G=this.rules.other.htmlBeginRegex(y);for(;t;){let P=t.split(`
`,1)[0],S;if(k=P,this.options.pedantic?(k=k.replace(this.rules.other.listReplaceNesting,"  "),S=k):S=k.replace(this.rules.other.tabCharGlobal,"    "),U.test(k)||z.test(k)||G.test(k)||I.test(k)||B.test(k))break;if(S.search(this.rules.other.nonSpaceChar)>=y||!k.trim())f+=`
`+S.slice(y);else{if(v||_.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||U.test(_)||z.test(_)||B.test(_))break;f+=`
`+k}!v&&!k.trim()&&(v=!0),d+=P+`
`,t=t.substring(P.length+1),_=S.slice(y)}}s.loose||(i?s.loose=!0:this.rules.other.doubleBlankLine.test(d)&&(i=!0)),s.items.push({type:"list_item",raw:d,task:!!this.options.gfm&&this.rules.other.listIsTask.test(f),loose:!1,text:f,tokens:[]}),s.raw+=d}let l=s.items.at(-1);if(l)l.raw=l.raw.trimEnd(),l.text=l.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let a of s.items){if(this.lexer.state.top=!1,a.tokens=this.lexer.blockTokens(a.text,[]),a.task){if(a.text=a.text.replace(this.rules.other.listReplaceTask,""),a.tokens[0]?.type==="text"||a.tokens[0]?.type==="paragraph"){a.tokens[0].raw=a.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),a.tokens[0].text=a.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let f=this.lexer.inlineQueue.length-1;f>=0;f--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[f].src)){this.lexer.inlineQueue[f].src=this.lexer.inlineQueue[f].src.replace(this.rules.other.listReplaceTask,"");break}}let d=this.rules.other.listTaskCheckbox.exec(a.raw);if(d){let f={type:"checkbox",raw:d[0]+" ",checked:d[0]!=="[ ]"};a.checked=f.checked,s.loose?a.tokens[0]&&["paragraph","text"].includes(a.tokens[0].type)&&"tokens"in a.tokens[0]&&a.tokens[0].tokens?(a.tokens[0].raw=f.raw+a.tokens[0].raw,a.tokens[0].text=f.raw+a.tokens[0].text,a.tokens[0].tokens.unshift(f)):a.tokens.unshift({type:"paragraph",raw:f.raw,text:f.raw,tokens:[f]}):a.tokens.unshift(f)}}if(!s.loose){let d=a.tokens.filter(_=>_.type==="space"),f=d.length>0&&d.some(_=>this.rules.other.anyLine.test(_.raw));s.loose=f}}if(s.loose)for(let a of s.items){a.loose=!0;for(let d of a.tokens)d.type==="text"&&(d.type="paragraph")}return s}}html(t){let e=this.rules.block.html.exec(t);if(e)return{type:"html",block:!0,raw:e[0],pre:e[1]==="pre"||e[1]==="script"||e[1]==="style",text:e[0]}}def(t){let e=this.rules.block.def.exec(t);if(e){let r=e[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),n=e[2]?e[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=e[3]?e[3].substring(1,e[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):e[3];return{type:"def",tag:r,raw:e[0],href:n,title:s}}}table(t){let e=this.rules.block.table.exec(t);if(!e||!this.rules.other.tableDelimiter.test(e[2]))return;let r=lo(e[1]),n=e[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=e[3]?.trim()?e[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:e[0],header:[],align:[],rows:[]};if(r.length===n.length){for(let i of n)this.rules.other.tableAlignRight.test(i)?o.align.push("right"):this.rules.other.tableAlignCenter.test(i)?o.align.push("center"):this.rules.other.tableAlignLeft.test(i)?o.align.push("left"):o.align.push(null);for(let i=0;i<r.length;i++)o.header.push({text:r[i],tokens:this.lexer.inline(r[i]),header:!0,align:o.align[i]});for(let i of s)o.rows.push(lo(i,o.header.length).map((l,a)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:o.align[a]})));return o}}lheading(t){let e=this.rules.block.lheading.exec(t);if(e)return{type:"heading",raw:e[0],depth:e[2].charAt(0)==="="?1:2,text:e[1],tokens:this.lexer.inline(e[1])}}paragraph(t){let e=this.rules.block.paragraph.exec(t);if(e){let r=e[1].charAt(e[1].length-1)===`
`?e[1].slice(0,-1):e[1];return{type:"paragraph",raw:e[0],text:r,tokens:this.lexer.inline(r)}}}text(t){let e=this.rules.block.text.exec(t);if(e)return{type:"text",raw:e[0],text:e[0],tokens:this.lexer.inline(e[0])}}escape(t){let e=this.rules.inline.escape.exec(t);if(e)return{type:"escape",raw:e[0],text:e[1]}}tag(t){let e=this.rules.inline.tag.exec(t);if(e)return!this.lexer.state.inLink&&this.rules.other.startATag.test(e[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(e[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(e[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(e[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:e[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:e[0]}}link(t){let e=this.rules.inline.link.exec(t);if(e){let r=e[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;let o=dr(r.slice(0,-1),"\\");if((r.length-o.length)%2===0)return}else{let o=ol(e[2],"()");if(o===-2)return;if(o>-1){let i=(e[0].indexOf("!")===0?5:4)+e[1].length+o;e[2]=e[2].substring(0,o),e[0]=e[0].substring(0,i).trim(),e[3]=""}}let n=e[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(n);o&&(n=o[1],s=o[3])}else s=e[3]?e[3].slice(1,-1):"";return n=n.trim(),this.rules.other.startAngleBracket.test(n)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?n=n.slice(1):n=n.slice(1,-1)),co(e,{href:n&&n.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},e[0],this.lexer,this.rules)}}reflink(t,e){let r;if((r=this.rules.inline.reflink.exec(t))||(r=this.rules.inline.nolink.exec(t))){let n=(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=e[n.toLowerCase()];if(!s){let o=r[0].charAt(0);return{type:"text",raw:o,text:o}}return co(r,s,r[0],this.lexer,this.rules)}}emStrong(t,e,r=""){let n=this.rules.inline.emStrongLDelim.exec(t);if(!(!n||n[3]&&r.match(this.rules.other.unicodeAlphaNumeric))&&(!(n[1]||n[2])||!r||this.rules.inline.punctuation.exec(r))){let s=[...n[0]].length-1,o,i,l=s,a=0,d=n[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(d.lastIndex=0,e=e.slice(-1*t.length+s);(n=d.exec(e))!=null;){if(o=n[1]||n[2]||n[3]||n[4]||n[5]||n[6],!o)continue;if(i=[...o].length,n[3]||n[4]){l+=i;continue}else if((n[5]||n[6])&&s%3&&!((s+i)%3)){a+=i;continue}if(l-=i,l>0)continue;i=Math.min(i,i+l+a);let f=[...n[0]][0].length,_=t.slice(0,s+n.index+f+i);if(Math.min(s,i)%2){let v=_.slice(1,-1);return{type:"em",raw:_,text:v,tokens:this.lexer.inlineTokens(v)}}let k=_.slice(2,-2);return{type:"strong",raw:_,text:k,tokens:this.lexer.inlineTokens(k)}}}}codespan(t){let e=this.rules.inline.code.exec(t);if(e){let r=e[2].replace(this.rules.other.newLineCharGlobal," "),n=this.rules.other.nonSpaceChar.test(r),s=this.rules.other.startingSpaceChar.test(r)&&this.rules.other.endingSpaceChar.test(r);return n&&s&&(r=r.substring(1,r.length-1)),{type:"codespan",raw:e[0],text:r}}}br(t){let e=this.rules.inline.br.exec(t);if(e)return{type:"br",raw:e[0]}}del(t){let e=this.rules.inline.del.exec(t);if(e)return{type:"del",raw:e[0],text:e[2],tokens:this.lexer.inlineTokens(e[2])}}autolink(t){let e=this.rules.inline.autolink.exec(t);if(e){let r,n;return e[2]==="@"?(r=e[1],n="mailto:"+r):(r=e[1],n=r),{type:"link",raw:e[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}url(t){let e;if(e=this.rules.inline.url.exec(t)){let r,n;if(e[2]==="@")r=e[0],n="mailto:"+r;else{let s;do s=e[0],e[0]=this.rules.inline._backpedal.exec(e[0])?.[0]??"";while(s!==e[0]);r=e[0],e[1]==="www."?n="http://"+e[0]:n=e[0]}return{type:"link",raw:e[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(t){let e=this.rules.inline.text.exec(t);if(e){let r=this.lexer.state.inRawBlock;return{type:"text",raw:e[0],text:e[0],escaped:r}}}},ot=class Tn{constructor(e){ce(this,"tokens");ce(this,"options");ce(this,"state");ce(this,"inlineQueue");ce(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=e||Ct,this.options.tokenizer=this.options.tokenizer||new Mr,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let r={other:qe,block:Ir.normal,inline:cr.normal};this.options.pedantic?(r.block=Ir.pedantic,r.inline=cr.pedantic):this.options.gfm&&(r.block=Ir.gfm,this.options.breaks?r.inline=cr.breaks:r.inline=cr.gfm),this.tokenizer.rules=r}static get rules(){return{block:Ir,inline:cr}}static lex(e,r){return new Tn(r).lex(e)}static lexInline(e,r){return new Tn(r).inlineTokens(e)}lex(e){e=e.replace(qe.carriageReturn,`
`),this.blockTokens(e,this.tokens);for(let r=0;r<this.inlineQueue.length;r++){let n=this.inlineQueue[r];this.inlineTokens(n.src,n.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(e,r=[],n=!1){for(this.options.pedantic&&(e=e.replace(qe.tabCharGlobal,"    ").replace(qe.spaceLine,""));e;){let s;if(this.options.extensions?.block?.some(i=>(s=i.call({lexer:this},e,r))?(e=e.substring(s.raw.length),r.push(s),!0):!1))continue;if(s=this.tokenizer.space(e)){e=e.substring(s.raw.length);let i=r.at(-1);s.raw.length===1&&i!==void 0?i.raw+=`
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
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):r.push(s);continue}if(e){let i="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(i);break}else throw new Error(i)}}return this.state.top=!0,r}inline(e,r=[]){return this.inlineQueue.push({src:e,tokens:r}),r}inlineTokens(e,r=[]){let n=e,s=null;if(this.tokens.links){let a=Object.keys(this.tokens.links);if(a.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(n))!=null;)a.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(n=n.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(n))!=null;)n=n.slice(0,s.index)+"++"+n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(n))!=null;)o=s[2]?s[2].length:0,n=n.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let i=!1,l="";for(;e;){i||(l=""),i=!1;let a;if(this.options.extensions?.inline?.some(f=>(a=f.call({lexer:this},e,r))?(e=e.substring(a.raw.length),r.push(a),!0):!1))continue;if(a=this.tokenizer.escape(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.tag(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.link(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(a.raw.length);let f=r.at(-1);a.type==="text"&&f?.type==="text"?(f.raw+=a.raw,f.text+=a.text):r.push(a);continue}if(a=this.tokenizer.emStrong(e,n,l)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.codespan(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.br(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.del(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.autolink(e)){e=e.substring(a.raw.length),r.push(a);continue}if(!this.state.inLink&&(a=this.tokenizer.url(e))){e=e.substring(a.raw.length),r.push(a);continue}let d=e;if(this.options.extensions?.startInline){let f=1/0,_=e.slice(1),k;this.options.extensions.startInline.forEach(v=>{k=v.call({lexer:this},_),typeof k=="number"&&k>=0&&(f=Math.min(f,k))}),f<1/0&&f>=0&&(d=e.substring(0,f+1))}if(a=this.tokenizer.inlineText(d)){e=e.substring(a.raw.length),a.raw.slice(-1)!=="_"&&(l=a.raw.slice(-1)),i=!0;let f=r.at(-1);f?.type==="text"?(f.raw+=a.raw,f.text+=a.text):r.push(a);continue}if(e){let f="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(f);break}else throw new Error(f)}}return r}},Nr=class{constructor(t){ce(this,"options");ce(this,"parser");this.options=t||Ct}space(t){return""}code({text:t,lang:e,escaped:r}){let n=(e||"").match(qe.notSpaceStart)?.[0],s=t.replace(qe.endingNewline,"")+`
`;return n?'<pre><code class="language-'+ft(n)+'">'+(r?s:ft(s,!0))+`</code></pre>
`:"<pre><code>"+(r?s:ft(s,!0))+`</code></pre>
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
`}strong({tokens:t}){return`<strong>${this.parser.parseInline(t)}</strong>`}em({tokens:t}){return`<em>${this.parser.parseInline(t)}</em>`}codespan({text:t}){return`<code>${ft(t,!0)}</code>`}br(t){return"<br>"}del({tokens:t}){return`<del>${this.parser.parseInline(t)}</del>`}link({href:t,title:e,tokens:r}){let n=this.parser.parseInline(r),s=ao(t);if(s===null)return n;t=s;let o='<a href="'+t+'"';return e&&(o+=' title="'+ft(e)+'"'),o+=">"+n+"</a>",o}image({href:t,title:e,text:r,tokens:n}){n&&(r=this.parser.parseInline(n,this.parser.textRenderer));let s=ao(t);if(s===null)return ft(r);t=s;let o=`<img src="${t}" alt="${r}"`;return e&&(o+=` title="${ft(e)}"`),o+=">",o}text(t){return"tokens"in t&&t.tokens?this.parser.parseInline(t.tokens):"escaped"in t&&t.escaped?t.text:ft(t.text)}},Nn=class{strong({text:t}){return t}em({text:t}){return t}codespan({text:t}){return t}del({text:t}){return t}html({text:t}){return t}text({text:t}){return t}link({text:t}){return""+t}image({text:t}){return""+t}br(){return""}checkbox({raw:t}){return t}},it=class An{constructor(e){ce(this,"options");ce(this,"renderer");ce(this,"textRenderer");this.options=e||Ct,this.options.renderer=this.options.renderer||new Nr,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Nn}static parse(e,r){return new An(r).parse(e)}static parseInline(e,r){return new An(r).parseInline(e)}parse(e){let r="";for(let n=0;n<e.length;n++){let s=e[n];if(this.options.extensions?.renderers?.[s.type]){let i=s,l=this.options.extensions.renderers[i.type].call({parser:this},i);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(i.type)){r+=l||"";continue}}let o=s;switch(o.type){case"space":{r+=this.renderer.space(o);break}case"hr":{r+=this.renderer.hr(o);break}case"heading":{r+=this.renderer.heading(o);break}case"code":{r+=this.renderer.code(o);break}case"table":{r+=this.renderer.table(o);break}case"blockquote":{r+=this.renderer.blockquote(o);break}case"list":{r+=this.renderer.list(o);break}case"checkbox":{r+=this.renderer.checkbox(o);break}case"html":{r+=this.renderer.html(o);break}case"def":{r+=this.renderer.def(o);break}case"paragraph":{r+=this.renderer.paragraph(o);break}case"text":{r+=this.renderer.text(o);break}default:{let i='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return r}parseInline(e,r=this.renderer){let n="";for(let s=0;s<e.length;s++){let o=e[s];if(this.options.extensions?.renderers?.[o.type]){let l=this.options.extensions.renderers[o.type].call({parser:this},o);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){n+=l||"";continue}}let i=o;switch(i.type){case"escape":{n+=r.text(i);break}case"html":{n+=r.html(i);break}case"link":{n+=r.link(i);break}case"image":{n+=r.image(i);break}case"checkbox":{n+=r.checkbox(i);break}case"strong":{n+=r.strong(i);break}case"em":{n+=r.em(i);break}case"codespan":{n+=r.codespan(i);break}case"br":{n+=r.br(i);break}case"del":{n+=r.del(i);break}case"text":{n+=r.text(i);break}default:{let l='Token with "'+i.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return n}},Dr,ur=(Dr=class{constructor(t){ce(this,"options");ce(this,"block");this.options=t||Ct}preprocess(t){return t}postprocess(t){return t}processAllTokens(t){return t}emStrongMask(t){return t}provideLexer(){return this.block?ot.lex:ot.lexInline}provideParser(){return this.block?it.parse:it.parseInline}},ce(Dr,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),ce(Dr,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),Dr),al=class{constructor(...t){ce(this,"defaults",En());ce(this,"options",this.setOptions);ce(this,"parse",this.parseMarkdown(!0));ce(this,"parseInline",this.parseMarkdown(!1));ce(this,"Parser",it);ce(this,"Renderer",Nr);ce(this,"TextRenderer",Nn);ce(this,"Lexer",ot);ce(this,"Tokenizer",Mr);ce(this,"Hooks",ur);this.use(...t)}walkTokens(t,e){let r=[];for(let n of t)switch(r=r.concat(e.call(this,n)),n.type){case"table":{let s=n;for(let o of s.header)r=r.concat(this.walkTokens(o.tokens,e));for(let o of s.rows)for(let i of o)r=r.concat(this.walkTokens(i.tokens,e));break}case"list":{let s=n;r=r.concat(this.walkTokens(s.items,e));break}default:{let s=n;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let i=s[o].flat(1/0);r=r.concat(this.walkTokens(i,e))}):s.tokens&&(r=r.concat(this.walkTokens(s.tokens,e)))}}return r}use(...t){let e=this.defaults.extensions||{renderers:{},childTokens:{}};return t.forEach(r=>{let n={...r};if(n.async=this.defaults.async||n.async||!1,r.extensions&&(r.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=e.renderers[s.name];o?e.renderers[s.name]=function(...i){let l=s.renderer.apply(this,i);return l===!1&&(l=o.apply(this,i)),l}:e.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=e[s.level];o?o.unshift(s.tokenizer):e[s.level]=[s.tokenizer],s.start&&(s.level==="block"?e.startBlock?e.startBlock.push(s.start):e.startBlock=[s.start]:s.level==="inline"&&(e.startInline?e.startInline.push(s.start):e.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(e.childTokens[s.name]=s.childTokens)}),n.extensions=e),r.renderer){let s=this.defaults.renderer||new Nr(this.defaults);for(let o in r.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let i=o,l=r.renderer[i],a=s[i];s[i]=(...d)=>{let f=l.apply(s,d);return f===!1&&(f=a.apply(s,d)),f||""}}n.renderer=s}if(r.tokenizer){let s=this.defaults.tokenizer||new Mr(this.defaults);for(let o in r.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let i=o,l=r.tokenizer[i],a=s[i];s[i]=(...d)=>{let f=l.apply(s,d);return f===!1&&(f=a.apply(s,d)),f}}n.tokenizer=s}if(r.hooks){let s=this.defaults.hooks||new ur;for(let o in r.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let i=o,l=r.hooks[i],a=s[i];ur.passThroughHooks.has(o)?s[i]=d=>{if(this.defaults.async&&ur.passThroughHooksRespectAsync.has(o))return(async()=>{let _=await l.call(s,d);return a.call(s,_)})();let f=l.call(s,d);return a.call(s,f)}:s[i]=(...d)=>{if(this.defaults.async)return(async()=>{let _=await l.apply(s,d);return _===!1&&(_=await a.apply(s,d)),_})();let f=l.apply(s,d);return f===!1&&(f=a.apply(s,d)),f}}n.hooks=s}if(r.walkTokens){let s=this.defaults.walkTokens,o=r.walkTokens;n.walkTokens=function(i){let l=[];return l.push(o.call(this,i)),s&&(l=l.concat(s.call(this,i))),l}}this.defaults={...this.defaults,...n}}),this}setOptions(t){return this.defaults={...this.defaults,...t},this}lexer(t,e){return ot.lex(t,e??this.defaults)}parser(t,e){return it.parse(t,e??this.defaults)}parseMarkdown(t){return(e,r)=>{let n={...r},s={...this.defaults,...n},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&n.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof e>"u"||e===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof e!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(e)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=t),s.async)return(async()=>{let i=s.hooks?await s.hooks.preprocess(e):e,l=await(s.hooks?await s.hooks.provideLexer():t?ot.lex:ot.lexInline)(i,s),a=s.hooks?await s.hooks.processAllTokens(l):l;s.walkTokens&&await Promise.all(this.walkTokens(a,s.walkTokens));let d=await(s.hooks?await s.hooks.provideParser():t?it.parse:it.parseInline)(a,s);return s.hooks?await s.hooks.postprocess(d):d})().catch(o);try{s.hooks&&(e=s.hooks.preprocess(e));let i=(s.hooks?s.hooks.provideLexer():t?ot.lex:ot.lexInline)(e,s);s.hooks&&(i=s.hooks.processAllTokens(i)),s.walkTokens&&this.walkTokens(i,s.walkTokens);let l=(s.hooks?s.hooks.provideParser():t?it.parse:it.parseInline)(i,s);return s.hooks&&(l=s.hooks.postprocess(l)),l}catch(i){return o(i)}}}onError(t,e){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,t){let n="<p>An error occurred:</p><pre>"+ft(r.message+"",!0)+"</pre>";return e?Promise.resolve(n):n}if(e)return Promise.reject(r);throw r}}},Et=new al;function oe(t,e){return Et.parse(t,e)}oe.options=oe.setOptions=function(t){return Et.setOptions(t),oe.defaults=Et.defaults,uo(oe.defaults),oe};oe.getDefaults=En;oe.defaults=Ct;oe.use=function(...t){return Et.use(...t),oe.defaults=Et.defaults,uo(oe.defaults),oe};oe.walkTokens=function(t,e){return Et.walkTokens(t,e)};oe.parseInline=Et.parseInline;oe.Parser=it;oe.parser=it.parse;oe.Renderer=Nr;oe.TextRenderer=Nn;oe.Lexer=ot;oe.lexer=ot.lex;oe.Tokenizer=Mr;oe.Hooks=ur;oe.parse=oe;var md=oe.options,gd=oe.setOptions,_d=oe.use,bd=oe.walkTokens,wd=oe.parseInline;var kd=it.parse,yd=ot.lex;function vo(t){let e=oe.parse(t),r=eo.sanitize(e);return no(r)}function ll(t){return String(t||"").replace(/^docs\/(superpowers\/)?/,"")}function $o(t,e){let r=e.getWorkspacePath,n=e.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",i="",l="";function a(y){y.key==="Escape"&&s&&(y.preventDefault(),k())}document.addEventListener("keydown",a);function d(){return s?p`
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
            ${o==="loading"?p`<div class="mv__status">불러오는 중…</div>`:o==="error"?p`<div class="mv__status mv__status--error">
                    ${l||"\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}
                  </div>`:vo(i)}
          </div>
        </div>
      </div>
    `:p``}function f(){ie(d(),t)}async function _(y){s=y,o="loading",i="",l="",f();let I=r?r():"";if(!I){o="error",l="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",f();return}if(!n){o="error",l="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",f();return}let B="/api/doc?workspace="+encodeURIComponent(I)+"&path="+encodeURIComponent(y);try{let U=await n(B),z=await U.json().catch(()=>({}));if(!U.ok||!z||z.ok!==!0){o="error",l="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(z&&z.error||U.status)+")",f();return}i=String(z.content||""),o="ready",f()}catch{o="error",l="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",f()}}function k(){s=null,ie(p``,t)}function v(){document.removeEventListener("keydown",a),k()}return{open:_,close:k,destroy:v}}var cl={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function dl(t){if(typeof t!="number"||!Number.isFinite(t))return"";let e=new Date(t),r=String(e.getHours()).padStart(2,"0"),n=String(e.getMinutes()).padStart(2,"0");return`${r}:${n}`}function xo(t,e={}){let r=Array.isArray(t)?t:[];if(r.length===0)return p`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let n=new Set;for(let i of r)i&&typeof i.resumed_from=="string"&&i.resumed_from.length>0&&n.add(i.resumed_from);let s=i=>{if(!(i.status==="failed"||i.status==="orphaned"))return"";let a=typeof i.session_id=="string"&&i.session_id.length>0,d=n.has(i.attempt_id),f=a&&!d,_=a?d?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return p`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${i.attempt_id}
      ?disabled=${!f}
      title=${_}
      @click=${k=>{k.stopPropagation(),f&&e.onResume&&e.onResume(i.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},o=i=>{if(!(i.status==="failed"||i.status==="orphaned")||typeof i.cause!="string"||i.cause==="")return"";let a=i.cause_detail,d=a&&typeof a.reason=="string"&&a.reason.length>0?typeof a.command=="string"&&a.command.length>0?`${a.reason} \xB7 ${a.command}`:a.reason:i.cause;return p`<div class="detail-session__cause" title=${d}>
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
  `}var ul=["open","in_progress","deferred","resolved","closed"],pl=[0,1,2,3,4];function So(t,e){let r=e.issueStores,n=e.onClose,s=e.transport,o=e.onNavigate,i=e.queueStore,l=e.sessionLogStore,a=null,d=null,f={},_=!1,k=!1,v="",y="",I="";function B(){_=!1,k=!1,v="",y="",I=""}let U=document.createElement("div");U.className="md-viewer-root",document.body.appendChild(U);let z=$o(U,{getWorkspacePath:e.getWorkspacePath||(()=>"")}),G=document.createElement("div");G.className="session-log-root",document.body.appendChild(G);let P=Tr(G,{transport:s?(b,E)=>Promise.resolve(s(b,E)):void 0,sessionLogStore:l});function S(){if(!i||!a)return[];let b=i.get();return(b&&b.attempts?Object.values(b.attempts):[]).filter(x=>x&&x.bead_id===a).sort((x,C)=>(C.started_at||0)-(x.started_at||0)).map(x=>({attempt_id:x.attempt_id,bead_id:x.bead_id,status:x.status,started_at:typeof x.started_at=="number"?x.started_at:null,runner:x.runner||null,model:x.model||null,session_id:x.session_id||null,resumed_from:x.resumed_from||null,dismissed_at:typeof x.dismissed_at=="number"?x.dismissed_at:null,cause:typeof x.cause=="string"?x.cause:null,cause_detail:x.cause_detail||null}))}function T(b){let E=i?i.get():null,x=E&&E.attempts?E.attempts[b]:null;P.open({attempt_id:b,meta:x?{runner:x.runner||void 0,model:x.model||void 0,effort:x.effort||void 0,status:x.status||void 0,session_id:x.session_id||void 0}:{}})}async function $(b){if(!s||!b)return;let E=()=>{let C=i?i.get():null;return C&&typeof C.revision=="number"?C.revision:0},x=await s("worker-attempt-resume",{attempt_id:b,expected_revision:E()});if(x&&x.conflict){let C=x.queue&&typeof x.queue.revision=="number"?x.queue.revision:E();x=await s("worker-attempt-resume",{attempt_id:b,expected_revision:C})}x&&x.resumed===!1&&!x.conflict&&x.reason&&X(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${x.reason}`,"error",2400)}let g={onOpen:T,onResume:$};function M(){let b=i?i.get():null,E=b&&b.exec_defaults;return E&&typeof E=="object"?E:{}}let F=null;r&&r.subscribe&&(F=r.subscribe(()=>ee()));let W=null;i&&typeof i.subscribe=="function"&&(W=i.subscribe(()=>{a&&O()}));function Y(b){b.key==="Escape"&&a&&(b.preventDefault(),n())}document.addEventListener("keydown",Y);function ee(){if(a){if(r&&typeof r.snapshotFor=="function"){let b=r.snapshotFor("detail:"+a)||[];d=b.find(x=>x&&x.id===a)||b[0]||d}O()}}function re(b){Ht(b).then(E=>{E?X("\uBCF5\uC0AC\uB428","success",1200):X("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function ye(b){b.preventDefault(),b.stopPropagation(),a&&re(a)}function Ge(b,E){b.preventDefault(),b.stopPropagation(),re(E)}function Ue(b,E){b.preventDefault(),b.stopPropagation(),z.open(E)}function _e(b,E){f[b]=E,O(),!(!s||!a)&&Promise.resolve(s("update-exec-settings",{id:a,key:b,value:E})).catch(()=>{X("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}async function ve(b,E,x){if(!s||!a)return!1;try{let C=await Promise.resolve(s(b,E)),K=Array.isArray(C)?C[0]:C;return K&&typeof K=="object"&&K.id?(d=K,!0):(X(x,"error"),!1)}catch{return X(x,"error"),!1}}function je(b){setTimeout(()=>{try{let E=t.querySelector(b);E&&typeof E.focus=="function"&&E.focus()}catch{}},0)}function ae(){_=!0,v=d&&d.title||"",O(),je('.detail-edit__input[data-edit="title"]')}function at(b){v=b.target.value}function de(){_=!1,v="",O()}function Ye(){ve("edit-text",{id:a,field:"title",value:v},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(E=>{E&&(_=!1,v=""),O()})}function se(){k=!0,y=d&&d.description||"",O(),je('.detail-edit__textarea[data-edit="description"]')}function Oe(b){y=b.target.value}function Xe(){k=!1,y="",O()}function $e(){ve("edit-text",{id:a,field:"description",value:y},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(E=>{E&&(k=!1,y=""),O()})}function Se(b,E,x,C){if(b.key==="Escape"){b.stopPropagation(),x();return}b.key==="Enter"&&(!C||b.ctrlKey||b.metaKey)&&(b.preventDefault(),E())}function be(b){let E=b.target.value;ve("update-status",{id:a,status:E},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>O())}function Me(b){let E=Number(b.target.value);ve("update-priority",{id:a,priority:E},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>O())}function Ve(b){I=b.target.value}function Te(){let b=I.trim();b.length!==0&&ve("label-add",{id:a,label:b},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(E=>{E&&(I=""),O()})}function le(b){if(b.key==="Escape"){b.stopPropagation(),I="",O();return}b.key==="Enter"&&(b.preventDefault(),Te())}function Ae(b){ve("label-remove",{id:a,label:b},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>O())}let Ne={onCopyPath:Ge,onOpenDoc:Ue},he={onChange:_e};function xe(b){return typeof b=="string"?b:b&&typeof b=="object"?String(b.id||b.to||b.issue_id||b.depends_on||""):""}function ze(b){switch(b&&typeof b=="object"?String(b.dependency_type||b.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function Ee(b){let x=(Array.isArray(b.dependencies)?b.dependencies:[]).map(C=>({id:xe(C),icon:ze(C)})).filter(C=>C.id.length>0);return p`
      <div class="detail-section-label">의존성</div>
      ${x.length===0?p`<div class="detail-empty">의존성 없음</div>`:p`<div class="detail-deps">
            ${x.map(C=>o?p`<button
                    type="button"
                    class="detail-dep detail-dep--link"
                    @click=${()=>o(C.id)}
                  >
                    ${C.icon?`${C.icon} `:""}${C.id}
                  </button>`:p`<span class="detail-dep"
                    >${C.icon?`${C.icon} `:""}${C.id}</span
                  >`)}
          </div>`}
    `}function Ke(b){let E=b.metadata||{},x=b.workflow||{},C=x.stages||{},K=C.spec&&C.spec.stale,te=C.impl&&C.impl.stale,H=x.route_source==="derived",Z=x.route||E.route||"\u2014";return p`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${H?" detail-kv__v--derived":""}"
          title=${H?"route \uCD94\uB860\uAC12 (metadata \uBBF8\uD540)":"route"}
          >${H&&x.route?`${Z} ? (\uCD94\uB860)`:Z}</span
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
          >${E.impl_review||"\uC5C6\uC74C"}${te?" \xB7 stale":""}</span
        >
      </div>
      ${E.pr_url?p`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${E.pr_url}</span>
          </div>`:""}
    `}let et={route:["spec_backed","full_plan"]};async function pe(b,E){let x=E.target.value;if(b==="route"&&d&&d.metadata&&d.metadata.route==="full_plan"&&x!=="full_plan"&&!window.confirm(`full_plan \u2192 ${x||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){O();return}await ve("update-workflow-meta",{id:a,key:b,value:x},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),O()}function Ce(b){let E=b.metadata||{};return p` ${((C,K)=>{let te=et[C],H=typeof E[C]=="string"?E[C]:"";return p`<div class="detail-kv">
        <span class="detail-kv__k">${C}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${C}
          data-edit=${`wfmeta-${C}`}
          @change=${Z=>pe(C,Z)}
        >
          <option value="" ?selected=${!te.includes(H)}>
            ${K}
          </option>
          ${te.map(Z=>p`<option value=${Z} ?selected=${H===Z}>${Z}</option>`)}
        </select>
      </div>`})("route","(\uBBF8\uC124\uC815 \xB7 \uCD94\uB860)")} `}function Re(b){return _?p`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${v}
            @input=${at}
            @keydown=${E=>Se(E,Ye,de,!1)}
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
              @click=${de}
            >
              취소
            </button>
          </div>
        </div>
      `:p`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${b}</h2>
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${ae}
        >
          ✎
        </button>
      </div>
    `}function Le(b){let E=gt(b.created_at),x=gt(b.updated_at);return!E&&!x?p``:p`
      ${E?p`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${E}</span>
          </div>`:""}
      ${x?p`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${x}</span>
          </div>`:""}
    `}function R(b,E){return p`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${be}
        >
          ${ul.map(x=>p`<option value=${x} ?selected=${x===b}>${x}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${Me}
        >
          ${pl.map(x=>p`<option value=${String(x)} ?selected=${x===E}>
                P${x}
              </option>`)}
        </select>
      </div>
    `}function c(b){return p`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${k?"":p`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${se}
            >
              ✎
            </button>`}
      </div>
      ${k?p`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${y}
              @input=${Oe}
              @keydown=${E=>Se(E,$e,Xe,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${$e}
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
          </div>`:p`<div class="detail-overlay__desc">
            ${b||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function h(b){let E=Array.isArray(b.labels)?b.labels:[];return p`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${E.map(x=>p`<span class="detail-label-chip"
              >${x}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${x}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+x}
                @click=${()=>Ae(x)}
              >
                ×
              </button></span
            >`)}
        <span class="detail-label-add">
          <input
            class="detail-label-add__input"
            aria-label="라벨 추가"
            placeholder="라벨 추가"
            .value=${I}
            @input=${Ve}
            @keydown=${le}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${Te}
          >
            추가
          </button>
        </span>
      </div>
    `}function A(){if(!a)return p``;let b=d||{},E=String(b.id||a),x=b.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",C=b.status||"open",K=typeof b.priority=="number"?Math.max(0,Math.min(4,b.priority)):"",te=b.description||"",H={...b,metadata:{...b.metadata||{},...f}};return p`
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
            @click=${ye}
          >
            ${E}
          </button>
          ${Re(x)} ${R(C,K)}
          ${Le(b)} ${c(te)}
          ${h(b)} ${Ee(b)}
          ${Ke(b)} ${Ce(b)}
          ${qs(b,Ne)}
          ${Us(H,he,M())}
          ${xo(S(),g)}
        </div>
      </div>
    `}function O(){ie(A(),t)}return{load(b){b!==a&&(f={},B()),a=b,d=null,ee()},clear(){a=null,d=null,f={},B(),z.close(),P.close(),ie(p``,t)},destroy(){F&&(F(),F=null),W&&(W(),W=null),document.removeEventListener("keydown",Y),z.destroy(),U.parentNode&&U.parentNode.removeChild(U),P.destroy(),G.parentNode&&G.parentNode.removeChild(G),a=null,d=null,ie(p``,t)}}}var fl=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function To(t,e){return on(t,e)?"shown":e.hidden_labels.includes(t)?"hidden_exact":"hidden_prefix"}function hl(t,e,r){if(!r)return{hidden_labels:e.hidden_labels.includes(t)?e.hidden_labels:[...e.hidden_labels,t],visible_labels:e.visible_labels.filter(o=>o!==t)};let n=e.hidden_labels.filter(o=>o!==t);return e.hidden_prefixes.some(o=>o.length>0&&t.startsWith(o))?{hidden_labels:n,visible_labels:e.visible_labels.includes(t)?e.visible_labels:[...e.visible_labels,t]}:{hidden_labels:n}}function Ao(t,e){let{policyStore:r,transport:n,labelOptions:s}=e,o=document.createElement("dialog");o.id="display-settings-dialog",o.className="display-settings",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),t.appendChild(o);let i="";async function l(T){let $=r.get();if($)try{let g=await n("display-policy-set",{expected_revision:$.revision,policy:T($)});a(g),g&&g.conflict&&g.policy&&(g=await n("display-policy-set",{expected_revision:g.policy.revision,policy:T(g.policy)}),a(g)),g&&g.conflict&&X("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC","error",4e3)}catch{X("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function a(T){T&&T.policy&&typeof T.policy=="object"&&r.set(T.policy)}function d(T){let $=r.get();if(!$)return;let g=To(T,$)!=="shown";l(M=>hl(T,M,g))}function f(){let T=i.trim();T.length!==0&&(i="",l($=>$.hidden_prefixes.includes(T)?{hidden_prefixes:$.hidden_prefixes}:{hidden_prefixes:[...$.hidden_prefixes,T]}),B())}function _(T){l($=>({hidden_prefixes:$.hidden_prefixes.filter(g=>g!==T)}))}function k(T){let $=r.get();if(!$)return;let g=$.chips[T]===!1;l(()=>({chips:{[T]:g}}))}function v(T){let $=s();return p`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">라벨 표시</h3>
        <p class="display-settings__hint">
          라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을
          누르면 그 라벨만 예외로 다시 표시됩니다.
        </p>
        ${$.length===0?p`<div class="display-settings__empty">라벨 없음</div>`:p`<div class="display-settings__pills">
              ${$.map(g=>{let M=To(g,T);return p`<button
                  type="button"
                  class=${`display-settings__pill display-settings__pill--${M}`}
                  data-label=${g}
                  data-state=${M}
                  @click=${()=>d(g)}
                >
                  ${g}
                </button>`})}
            </div>`}
      </section>
    `}function y(T){return p`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">숨김 prefix</h3>
        <div class="display-settings__prefixes">
          ${T.hidden_prefixes.map($=>p`<span class="display-settings__prefix">
                ${$}
                <button
                  type="button"
                  class="display-settings__prefix-remove"
                  aria-label=${`${$} \uADDC\uCE59 \uC81C\uAC70`}
                  @click=${()=>_($)}
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
            @input=${$=>{i=String($.target.value||"")}}
          />
          <button type="button" @click=${f}>추가</button>
        </div>
      </section>
    `}function I(T){return p`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">카드 표시 요소</h3>
        <div class="display-settings__toggles">
          ${fl.map(([$,g])=>p`<label class="display-settings__toggle">
                <input
                  type="checkbox"
                  data-chip=${$}
                  .checked=${T.chips[$]!==!1}
                  @change=${()=>k($)}
                />
                <span>${g}</span>
              </label>`)}
        </div>
      </section>
    `}function B(){let T=r.get();ie(p`
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
            ${T?p`${v(T)} ${y(T)}
                ${I(T)}`:p`<div class="display-settings__empty">
                  표시 정책을 불러오는 중…
                </div>`}
          </div>
        </div>
      `,o)}let U=!1,z=()=>{U=!1};o.addEventListener("close",z),o.addEventListener("cancel",z);let G=null;r.subscribe&&(G=r.subscribe(()=>{U&&B()}));function P(){U||(i="",U=!0,B(),typeof o.showModal=="function"?o.showModal():o.setAttribute("open",""))}function S(){U&&(U=!1,typeof o.close=="function"?o.close():o.removeAttribute("open"))}return{open:P,close:S,destroy(){U=!1,o.removeEventListener("close",z),o.removeEventListener("cancel",z),G&&(G(),G=null),o.remove()}}}function Eo(t){let e=document.createElement("dialog");e.id="fatal-error-dialog",e.setAttribute("role","alertdialog"),e.setAttribute("aria-modal","true"),e.innerHTML=`
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
    </div>`,t.appendChild(e);let r=e.querySelector("#fatal-error-title"),n=e.querySelector("#fatal-error-message"),s=e.querySelector("#fatal-error-detail"),o=e.querySelector("#fatal-error-reload"),i=e.querySelector("#fatal-error-close"),l=()=>{if(typeof e.close=="function")try{e.close()}catch{}e.removeAttribute("open")},a=(d,f,_="")=>{r&&(r.textContent=d||"Unexpected Error"),n&&(n.textContent=f||"An unrecoverable error occurred.");let k=typeof _=="string"?_.trim():"";if(s&&(k.length>0?(s.textContent=k,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof e.showModal=="function")try{e.showModal(),e.setAttribute("open","")}catch{e.setAttribute("open","")}else e.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),i&&i.addEventListener("click",()=>l()),e.addEventListener("cancel",d=>{d.preventDefault(),l()}),{open:a,close:l,getElement(){return e}}}function Co(t,e,r){let n=ge("views:nav"),s=null;function o(a){return d=>{d.preventDefault(),n("click tab %s",a),r.gotoView(a)}}function i(){let d=e.getState().view==="worker"?"worker":"board";return p`
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
    `}function l(){ie(i(),t)}return l(),s=e.subscribe(()=>l()),{destroy(){s&&(s(),s=null),ie(p``,t)}}}var Ro=["bug","feature","task","epic","chore"];function Lo(t){switch((t||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var Io=["Critical","High","Medium","Low","Backlog"];function Do(t,e){let r=document.createElement("dialog");r.id="new-issue-dialog",r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true"),r.innerHTML=`
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
  `,t.appendChild(r);let n=r.querySelector("#new-issue-form"),s=r.querySelector("#new-title"),o=r.querySelector("#new-type"),i=r.querySelector("#new-priority"),l=r.querySelector("#new-labels"),a=r.querySelector("#new-description"),d=r.querySelector("#new-issue-error"),f=r.querySelector("#btn-cancel"),_=r.querySelector("#btn-create"),k=r.querySelector(".new-issue__close");function v(){o.replaceChildren();let S=document.createElement("option");S.value="",S.textContent="\u2014 Select \u2014",o.appendChild(S);for(let T of Ro){let $=document.createElement("option");$.value=T,$.textContent=Lo(T),o.appendChild($)}i.replaceChildren();for(let T=0;T<=4;T+=1){let $=document.createElement("option");$.value=String(T);let g=Io[T]||"Medium";$.textContent=`${T} \u2013 ${g}`,i.appendChild($)}}v();function y(){try{typeof r.close=="function"?r.close():r.removeAttribute("open")}catch{r.removeAttribute("open")}}function I(S){s.disabled=S,o.disabled=S,i.disabled=S,l.disabled=S,a.disabled=S,f.disabled=S,_.disabled=S,_.textContent=S?"Creating\u2026":"Create"}function B(){d.textContent=""}function U(S){d.textContent=S}function z(){try{let S=window.localStorage.getItem("beads-ui.new.type");S?o.value=S:o.value="";let T=window.localStorage.getItem("beads-ui.new.priority");T&&/^\d$/.test(T)?i.value=T:i.value="2"}catch{o.value="",i.value="2"}}function G(){let S=o.value||"",T=i.value||"";S.length>0&&window.localStorage.setItem("beads-ui.new.type",S),T.length>0&&window.localStorage.setItem("beads-ui.new.priority",T)}async function P(){B();let S=String(s.value||"").trim();if(S.length===0){U("Title is required"),s.focus();return}let T=Number(i.value||"2");if(!(T>=0&&T<=4)){U("Priority must be 0..4"),i.focus();return}let $=String(o.value||""),g=String(a.value||""),M={title:S};$.length>0&&(M.type=$),String(T).length>0&&(M.priority=T),g.length>0&&(M.description=g),I(!0);try{await e("create-issue",M)}catch{I(!1),U("Failed to create issue");return}G(),I(!1),y()}return r.addEventListener("cancel",S=>{S.preventDefault(),y()}),k.addEventListener("click",()=>y()),f.addEventListener("click",()=>y()),r.addEventListener("keydown",S=>{S.key==="Enter"&&(S.ctrlKey||S.metaKey)&&(S.preventDefault(),P())}),n.addEventListener("submit",S=>{S.preventDefault(),P()}),{open(){n.reset(),B(),z();try{"showModal"in r&&typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")}catch{r.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){y()}}}function Oo(t){if(typeof t!="number"||!Number.isFinite(t)||t<=0)return"";if(t<6e4)return`${Math.round(t/1e3)}\uCD08`;let e=t/6e4;return`${Number.isInteger(e)?e:Math.round(e*10)/10}\uBD84`}function Mo(t){return Array.isArray(t)?t.filter(e=>typeof e=="string").join(" "):""}var ml={deployed:{modifier:"ok",label:"\uC131\uACF5"},launched:{modifier:"launched",label:"\uBC1C\uC0AC\uB428"},failed:{modifier:"fail",label:"\uC2E4\uD328"}},gl=[{key:"orchestration_model",values:()=>un},{key:"orchestration_effort",values:()=>pn},{key:"review_model",values:()=>fn},{key:"impl_model",values:()=>hn}];function No(t,e){let{queueStore:r,transport:n,getWorkspacePath:s}=e,o=document.createElement("dialog");o.id="worker-exec-defaults-dialog",o.className="exec-defaults",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),t.appendChild(o);function i(){return r&&r.get()||{revision:0,exec_defaults:{}}}function l(){let g=i();return typeof g.revision=="number"?g.revision:0}function a(){let g=i().exec_defaults;return g&&typeof g=="object"?g:{}}function d(g){g&&g.queue&&r&&r.set(g.queue)}async function f(g,M){if(!n)return;let F={key:g,value:M||null};try{let W=await n("worker-queue-set-exec-default",{...F,expected_revision:l()});d(W),W&&W.conflict&&(W=await n("worker-queue-set-exec-default",{...F,expected_revision:l()}),d(W)),W&&W.conflict&&X("\uC804\uC5ED \uC2E4\uD589 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC","error",4e3)}catch{X("\uC804\uC5ED \uC2E4\uD589 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function _(g,M,F){let W=!!F&&!M.includes(F);return p`<div class="exec-defaults__row">
      <span class="exec-defaults__k">${g}</span>
      <select
        class="exec-defaults__sel"
        aria-label=${`\uC804\uC5ED ${g}`}
        data-key=${g}
        @change=${Y=>{f(g,Y.target.value)}}
      >
        <option value="" ?selected=${!F}>
          ${mn[g]||"(\uAE30\uBCF8)"}
        </option>
        ${W?p`<option value=${F} ?selected=${!0}>
              ${F} (비호환)
            </option>`:""}
        ${M.map(Y=>p`<option value=${Y} ?selected=${F===Y}>${Y}</option>`)}
      </select>
    </div>`}function k(){let g=i().workspace_info;return g&&typeof g=="object"?g:{}}function v(g,M){return p`<span
      class="exec-defaults__vd-badge exec-defaults__vd-badge--${g}"
      >${M}</span
    >`}function y(g){let M=g?Mo(g.cmd):"",F=g?Oo(g.timeout_ms):"",W=!!g&&g.source==="detected";return p`<div class="exec-defaults__vd-group" data-vd="verify">
      <div class="exec-defaults__vd-label">머지 전 검증 (verify)</div>
      ${M?p`<div class="exec-defaults__vd-line">
            <span class="exec-defaults__vd-cmd">${M}</span>
            ${W?v("detected","\uC790\uB3D9\uAC10\uC9C0"):v("config","config")}
            ${F?p`<span class="exec-defaults__vd-meta"
                  >timeout ${F}</span
                >`:""}
          </div>`:p`<div class="exec-defaults__vd-line exec-defaults__vd-absent">
            검증 없음
          </div>`}
    </div>`}function I(g){let M=g?Mo(g.cmd):"",F=g?Oo(g.timeout_ms):"",W=F?`timeout ${F} \xB7 verify \uD1B5\uACFC \uC2DC\uC5D0\uB9CC \uC2E4\uD589`:"verify \uD1B5\uACFC \uC2DC\uC5D0\uB9CC \uC2E4\uD589",Y=s&&s()||"<workspace \uACBD\uB85C>";return p`<div class="exec-defaults__vd-group" data-vd="deploy">
      <div class="exec-defaults__vd-label">머지 후 배포 (deploy)</div>
      ${M?p`<div class="exec-defaults__vd-line">
            <span class="exec-defaults__vd-cmd">${M}</span>
            ${v("config","config")}
            ${g.detached===!0?v("detached","detached"):""}
            <span class="exec-defaults__vd-meta">${W}</span>
          </div>`:p`<div class="exec-defaults__vd-line exec-defaults__vd-absent">
            배포 없음 —
            <span class="exec-defaults__vd-cmd"
              >[worker.deploy."${Y}"]</span
            >
            섹션으로 정의
          </div>`}
    </div>`}function B(g){if(!g||typeof g!="object")return"";let M=ml[String(g.outcome)];if(!M)return"";let F=g.outcome==="failed"&&g.reason?`${M.label} \xB7 ${g.reason}`:M.label,W=[gt(g.at),typeof g.bead_id=="string"?g.bead_id:"",typeof g.base_sha=="string"?g.base_sha.slice(0,7):""].filter(Y=>Y.length>0).join(" \xB7 ");return p`<div class="exec-defaults__vd-group" data-vd="last-deploy">
      <div class="exec-defaults__vd-label">마지막 배포</div>
      <div class="exec-defaults__vd-line">
        ${v(M.modifier,F)}
        ${W?p`<span class="exec-defaults__vd-meta">${W}</span>`:""}
      </div>
    </div>`}function U(g){return p`<section class="exec-defaults__vd">
      <p class="exec-defaults__vd-title">
        검증·배포 설정
        <span class="exec-defaults__vd-ro"
          >읽기 전용 — config.toml에서 정의</span
        >
      </p>
      ${y(g.verify_cmd)} ${I(g.deploy_cmd)}
      ${B(g.last_deploy)}
    </section>`}function z(){let g=a();ie(p`
        <div class="exec-defaults__container">
          <header class="exec-defaults__header">
            <div class="exec-defaults__title">전역 실행 설정</div>
            <button
              type="button"
              class="exec-defaults__close"
              aria-label="닫기"
              @click=${$}
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
            ${gl.map(M=>_(M.key,M.values(),g[M.key]||""))}
            ${U(k())}
          </div>
        </div>
      `,o)}let G=!1,P=()=>{G=!1};o.addEventListener("close",P),o.addEventListener("cancel",P);let S=null;r&&r.subscribe&&(S=r.subscribe(()=>{G&&z()}));function T(){G||(G=!0,z(),typeof o.showModal=="function"?o.showModal():o.setAttribute("open",""))}function $(){G&&(G=!1,typeof o.close=="function"?o.close():o.removeAttribute("open"))}return{open:T,close:$,destroy(){G=!1,o.removeEventListener("close",P),o.removeEventListener("cancel",P),S&&(S(),S=null),o.remove()}}}function Wt(t){return typeof t=="number"&&Number.isFinite(t)?t:0}function _l(t){return!t||typeof t!="object"?!1:typeof t.input_tokens=="number"||typeof t.output_tokens=="number"}function bl(t){return t>=1e6?`${(t/1e6).toFixed(1)}M`:t>=1e3?`${(t/1e3).toFixed(1)}k`:String(t)}function Gt(t){if(!_l(t))return null;let e=Wt(t?.input_tokens)+Wt(t?.output_tokens);return`\u03C4 ${bl(e)}`}function Br(t){if(!t||typeof t!="object")return"";let e=[`\uC785\uB825 ${Wt(t.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Wt(t.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${Wt(t.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Wt(t.cache_creation_input_tokens).toLocaleString("en-US")}`];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&e.push(`$${t.total_cost_usd.toFixed(2)}`),e.join(" \xB7 ")}function Pn(t,e){let r=null;for(let n of Object.values(t||{}))n&&n.bead_id===e&&(r=n.usage||null);return r}function Fn(t){let e=t.draggable&&!t.done,r=Array.isArray(t.badges)?t.badges:[],n=Gt(t.usage),s=t.merge_step||null;return p`<div
    class="worker-mini${e?"":" worker-mini--static"}${t.done?" worker-mini--done":""}${s?" worker-mini--merging":""}"
    style=${s?`--progress: ${s.percent}%`:""}
    draggable=${e?"true":"false"}
    data-bead-id=${t.id}
    data-lane=${t.lane}
  >
    ${e?p`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:""}
    <span class="worker-mini__id" title="클릭하면 ID 복사">${t.id}</span>
    <span class="worker-mini__title">${t.title}</span>
    ${t.pr_url&&t.pr_number?p`<a
          class="worker-mini__pr"
          href=${t.pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="PR 열기"
          >#${t.pr_number} ↗</a
        >`:""}
    ${r.map(o=>o===t.live_badge?p`<span
            class="worker-mini__badge worker-mini__badge--activity"
            title="서버가 이 PR을 처리하는 중입니다"
            ><span class="act-dot" aria-hidden="true"></span>${o}</span
          >`:p`<span
            class="worker-mini__badge${t.alert?" worker-mini__badge--alert":""}"
            >${o}</span
          >`)}
    ${t.reason?p`<span class="worker-mini__reason">${t.reason}</span>`:""}
    ${n?p`<span class="worker-usage" title=${Br(t.usage)}
          >${n}</span
        >`:""}
    ${s?p`<span class="merge-step"
          >${s.label}<span class="merge-step__n"
            >${s.index}/${s.total}</span
          ></span
        >`:""}
    ${t.merge_action?p`<button
          type="button"
          class="worker-mini__merge"
          data-bead-id=${t.id}
          ?disabled=${t.merge_enabled===!1}
          title=${t.merge_title||""}
        >
          머지
        </button>`:""}
    ${t.discard_action?p`<button
          type="button"
          class="worker-mini__discard"
          data-bead-id=${t.id}
          ?disabled=${t.discard_enabled===!1}
          title=${t.discard_enabled===!1?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
        >
          폐기
        </button>`:""}
  </div>`}function wl(t){let e=t.draggable&&!t.done,r=t.workflow,n=r&&r.chips||{},s=n.route||r&&r.route,o=n.route_source==="derived"||!!(r&&r.route_source==="derived"),i=typeof t.reason=="string"&&t.reason.startsWith("\u26D4");return p`<div
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
    ${r?Sr(r,t.status):""}
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
  </div>`}function bt(t){let e=!!t.collapsible&&!!t.collapsed,r=p`<span
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
                  </div>`:t.items.map(n=>t.lane==="candidate"?wl(n):Fn(n))}
          </div>`}
  </section>`}var Po=160;function Fo(t){return t.length>Po?`${t.slice(0,Po)}\u2026`:t}function kl(t){return!t||!t.reason?"":p`<div class="worker-banner__detail">
    가드:
    ${t.reason}${t.command?p` · <code>${Fo(t.command)}</code>`:""}
  </div>`}function yl(t){return t?p`<details class="worker-banner__tail">
    <summary>출력 tail</summary>
    <pre>${t}</pre>
  </details>`:""}function vl(t){if(!Number.isFinite(t)||t<0)return"0s";let e=Math.floor(t/1e3),r=Math.floor(e/60),n=e%60;return r>0?`${r}m ${String(n).padStart(2,"0")}s`:`${n}s`}function Bo(t){let e=Array.isArray(t.cleanupFailures)?t.cleanupFailures:[];return p`<div class="worker-banners">
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
          ${kl(t.failure.cause_detail)}
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
          ${yl(r.output_tail)}
        </div>`)}
  </div>`}function $l(t,e,r=null){let n=!!t.paused,s=n?"\uC77C\uC2DC\uC815\uC9C0":typeof t.started_at=="number"?vl(e-t.started_at):"\u2014",o=[t.runner,t.model].filter(Boolean).join(" \xB7 "),i=Gt(t.usage),l=t.attempt_id&&t.attempt_id===r;return p`<div
    class="rtile${l?" rtile--sel":""}${n?" rtile--paused":""}"
    data-bead-id=${t.bead_id}
    data-attempt-id=${t.attempt_id||""}
  >
    <div class="rtile__hd">
      <span class="rtile__dot" aria-hidden="true"></span>
      <span class="rtile__id">${t.bead_id}</span>
      ${t.resumed_from?p`<span
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
    ${o||i?p`<div class="rtile__meta">
          ${o?p`<span class="rtile__runner">${o}</span>`:""}
          ${i?p`<span class="worker-usage" title=${Br(t.usage)}
                >${i}</span
              >`:""}
        </div>`:""}
    <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일): 큐
         스냅샷에는 페이즈명도 진행률도 없으므로 진행 바는 만들지 않는다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
    ${n?"":p`<div class="rtile__accent" aria-hidden="true"></div>`}
  </div>`}function Bn(t,e=Date.now(),r=null){let n=Array.isArray(t)?t:[];return p`<div class="worker-rungrid" id="worker-rungrid">
    ${n.length===0?p`<div class="worker-rungrid__empty">실행 세션 없음</div>`:n.map(s=>$l(s,e,r))}
  </div>`}var xl="tab:worker:ready",Sl="tab:worker:blocked",qr=1;function zn(t){let e=t&&t.metadata;return!!(e&&typeof e=="object"&&e.spec_id)}var Uo="beads-ui.worker.candidate-filter",qn={show_blocked:!1,spec:"all"};function Tl(){try{let t=window.localStorage.getItem(Uo);if(!t)return{...qn};let e=JSON.parse(t);if(!e||typeof e!="object")return{...qn};let r=e.spec;return{show_blocked:e.show_blocked===!0,spec:r==="with"||r==="without"?r:"all"}}catch{return{...qn}}}function Al(t){try{window.localStorage.setItem(Uo,JSON.stringify(t))}catch{}}function El(t,e){let r=l=>e.show_blocked||!l.blocked,n=l=>e.spec==="all"||(e.spec==="with"?l.has_spec:!l.has_spec),s=[],o=0,i=0;for(let l of t){let a=r(l),d=n(l);a&&d?s.push(l):!a&&d?o+=1:a&&!d&&(i+=1)}return{visible:s,hidden_blocked:o,hidden_spec:i}}var Cl=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],zo="bdui.worker.candidate_sort",Rl=[{value:"spec",label:"spec \uC6B0\uC120"},{value:"board",label:"Board \uC21C\uC11C"},{value:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131\uC21C"}],Ur="spec";function Ll(){try{let t=window.localStorage.getItem(zo);return t==="board"||t==="created"||t==="spec"?t:Ur}catch{return Ur}}function Il(t){try{window.localStorage.setItem(zo,t)}catch{}}var Dl="(max-width: 640px)",Ho="beads-ui.worker.lane-collapsed",hr={queue:!0,done:!0};function Ol(){try{let t=window.localStorage.getItem(Ho);if(!t)return{...hr};let e=JSON.parse(t);return!e||typeof e!="object"?{...hr}:{queue:typeof e.queue=="boolean"?e.queue:hr.queue,done:typeof e.done=="boolean"?e.done:hr.done}}catch{return{...hr}}}function Ml(t){try{window.localStorage.setItem(Ho,JSON.stringify(t))}catch{}}function qo(t){let e=Array.isArray(t)&&t.length>0?t[0]:null;if(!e)return"";let r=typeof e.title=="string"?e.title:e.id||"";return r.length>22?`${r.slice(0,22)}\u2026`:r}function Nl(t,e,r){let n=Array.isArray(t)?t.slice():[];return e==="created"?n.sort(St):(n.sort(kr(r)),e==="board"?n:[...n.filter(zn),...n.filter(s=>!zn(s))])}function Pl(t){let e=t&&t.parent;return(typeof e=="string"?e.length>0:!!(e&&e.id))||/\.\d+$/.test(t&&t.id||"")}function Fl(t){let r=(Array.isArray(t?.dependencies)?t.dependencies:[]).map(n=>typeof n=="string"?n:n&&n.id).filter(Boolean);return r.length>0?`\u{1F512} ${r.join(", ")}`:"\u{1F512} blocked"}var Bl=["closed_unmerged","undecidable"],ql=[{from:"\uAD00\uCE21 \uB300\uAE30",activity:"checking",to:"\uD655\uC778\uC911"},{from:"\uB85C\uCEEC\uAC80\uC99D \uB300\uAE30",activity:"verifying",to:"\uB85C\uCEEC\uAC80\uC99D \uC2E4\uD589 \uC911"}];function Ul(t,e){for(let r of ql)if(t===r.from&&e===r.activity)return{label:r.to,live:!0};return{label:t,live:!1}}var Un=[{step:"merging",label:"\uBA38\uC9C0 \uC911"},{step:"base_sync",label:"base \uB3D9\uAE30\uD654"},{step:"post_merge_verify",label:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D"},{step:"deploy",label:"\uBC30\uD3EC"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"}];function zl(t){if(typeof t!="string"||t.length===0)return null;let e=Un.length,r=Un.findIndex(n=>n.step===t);return r<0?{label:t,index:0,total:e,percent:0}:{label:Un[r].label,index:r+1,total:e,percent:Math.round((r+1)/e*100)}}function Hl(t,e,r,n,s=null,o=null){let i=r[t]||null,l=i&&i.gate?i.gate:null,a=i&&i.pr?i.pr:null,d=[],f=Ul(l&&l.gate_badge||"",o&&o.activity||null);f.label&&d.push(f.label),l&&l.base_badge&&l.base_badge!==l.gate_badge&&d.push(l.base_badge),n&&d.push("\uC815\uB9AC \uC2E4\uD328");let _=!!l&&l.base_badge==="\uCDA9\uB3CC",k=!!l&&l.enabled===!0,v=zl(o&&o.merge_progress?o.merge_progress.step:null),y=!!n&&!!l&&l.tier==="merged";return{id:t,title:e,reason:n?"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644":"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",pr_number:a&&typeof a.number=="number"?a.number:null,pr_url:a&&typeof a.url=="string"?a.url:"",badges:d,live_badge:f.live?f.label:null,usage:s,alert:!!l&&Bl.includes(l.tier)||!!n,merge_action:!0,discard_action:!n&&!(l&&l.tier==="merged"),merge_step:v,discard_enabled:!v,merge_enabled:!v&&(k||_||y),merge_title:v?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${v.label}`:y?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uCC98\uC74C\uBD80\uD130 \uB2E4\uC2DC \uC218\uD589\uD569\uB2C8\uB2E4":_?"\uCDA9\uB3CC \u2014 \uD074\uB9AD\uD558\uBA74 \uCDA9\uB3CC \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4 (\uBA38\uC9C0\uD558\uC9C0 \uC54A\uC74C)":k?`\uBA38\uC9C0 (${l.gate_badge}) \u2014 \uD074\uB9AD \uC2DC\uC810\uC5D0 \uB2E4\uC2DC \uD655\uC778\uD569\uB2C8\uB2E4`:l&&l.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${l&&l.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function Hn(t,e={}){let{transport:r,issueStores:n,queueStore:s,sessionLogStore:o,uiOrderStore:i,gotoIssue:l,getWorkspacePath:a}=e,d=n?vr(n,i):null,f=$r({transport:r,uiOrderStore:i}),_=null,k=[],v=Tl(),y=Ll(),I=Ol(),B=!1,U=new Set,z=[],G=document.createElement("div");G.className="worker-console";let P=document.createElement("div");P.className="worker-top";let S=document.createElement("div");S.className="worker-drawer-overlay",S.hidden=!0;let T=document.createElement("div");T.className="worker-drawer-overlay__backdrop";let $=document.createElement("div");$.className="worker-drawer-host",S.append(T,$);let g=document.createElement("div");g.className="worker-lanes-host",G.append(P,S,g),t.appendChild(G);let M=null,F=Tr($,{transport:r,sessionLogStore:o,onClose:()=>{M=null,S.hidden=!0,le()}}),W=No(G,{queueStore:s,transport:r,getWorkspacePath:a});function Y(){return s&&s.get()||{revision:0,auto_advance:!1,slots:qr,queue:[],pr_wait:[],done:[]}}function ee(){let c=Y();return typeof c.revision=="number"?c.revision:0}function re(c){c&&c.queue&&s&&s.set(c.queue)}function ye(){let c=Y().queue;return Array.isArray(c)?c.length:0}async function Ge(c,h){if(!r)return;let A=await r("worker-queue-place",{bead_id:c,index:h,expected_revision:ee()});re(A),A&&A.conflict&&await r("worker-queue-place",{bead_id:c,index:h,expected_revision:ee()}).then(re)}async function Ue(c,h){if(!r)return;let A=await r("worker-queue-reorder",{bead_id:c,to_index:h,expected_revision:ee()});re(A),A&&A.conflict&&await r("worker-queue-reorder",{bead_id:c,to_index:h,expected_revision:ee()}).then(re)}async function _e(c){if(!r)return;let h=await r("worker-queue-remove",{bead_id:c,expected_revision:ee()});re(h),h&&h.conflict&&await r("worker-queue-remove",{bead_id:c,expected_revision:ee()}).then(re)}async function ve(c){!r||!c||await r("worker-attempt-stop",{attempt_id:c})}async function je(c){if(!r||!c)return;let h=await r("worker-attempt-pause",{attempt_id:c});h&&h.paused===!1&&h.reason&&X(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${h.reason}`,"error",2400)}async function ae(c){if(!r||!c)return;let h=await r("worker-attempt-resume",{attempt_id:c,expected_revision:ee()});re(h),h&&h.conflict&&(h=await r("worker-attempt-resume",{attempt_id:c,expected_revision:ee()}),re(h)),h&&h.resumed===!1&&!h.conflict&&h.reason&&X(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${h.reason}`,"error",2400)}async function at(c){if(!r||!c)return;let h=await r("worker-attempt-dismiss",{attempt_id:c,expected_revision:ee()});re(h),h&&h.conflict&&(h=await r("worker-attempt-dismiss",{attempt_id:c,expected_revision:ee()}),re(h)),h&&h.dismissed===!1&&!h.conflict&&h.reason&&X(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${h.reason}`,"error",2400)}async function de(c){if(!r||!c)return;U.add(c),le();let h;try{h=await r("worker-pr-merge",{bead_id:c,expected_revision:ee()}),re(h),h&&h.conflict&&(h=await r("worker-pr-merge",{bead_id:c,expected_revision:ee()}),re(h))}finally{U.delete(c),le()}if(!(!h||h.conflict)){if(h.action==="conflict_resolution"){X(h.ok?"\uCDA9\uB3CC \u2014 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 (\uBA38\uC9C0\uD558\uC9C0 \uC54A\uC74C)":`\uCDA9\uB3CC \uD574\uC18C \uB514\uC2A4\uD328\uCE58 \uC2E4\uD328: ${h.reason||""}`,h.ok?"success":"error",2800);return}if(h.ok){X("\uBA38\uC9C0 + \uC815\uB9AC \uC644\uB8CC","success",2e3);return}X(h.cleanup_step?`\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uC2E4\uD328(${h.cleanup_step}): ${h.reason||""}`:`\uBA38\uC9C0 \uAC70\uBD80: ${h.reason||""}`,"error",3200)}}async function Ye(c){if(!r||!c||!(typeof globalThis.confirm!="function"||globalThis.confirm(`${c}: PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4. \uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694. \uACC4\uC18D\uD560\uAE4C\uC694?`)))return;let A=await r("worker-pr-discard",{bead_id:c,expected_revision:ee()});if(re(A),A&&A.conflict&&(A=await r("worker-pr-discard",{bead_id:c,expected_revision:ee()}),re(A)),A&&A.discarded===!0){X("\uD3D0\uAE30 \uC644\uB8CC \u2014 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB2E4\uC2DC \uC2E4\uD589\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4","success",2400);return}A&&A.discarded===!1&&!A.conflict&&X(`\uD3D0\uAE30 \uAC70\uBD80: ${A.reason||""}`,"error",2800)}async function se(c){if(!r)return;let h=await r("worker-queue-toggle",{on:c,expected_revision:ee()});re(h),h&&h.conflict&&await r("worker-queue-toggle",{on:c,expected_revision:ee()}).then(re)}async function Oe(c){if(!r||!Number.isFinite(c))return;let h=Math.max(qr,Math.floor(c)),A=await r("worker-queue-set-slots",{slots:h,expected_revision:ee()});re(A),A&&A.conflict&&await r("worker-queue-set-slots",{slots:h,expected_revision:ee()}).then(re)}function Xe(){let c=Y(),h=d?d.selectBoardColumn(xl,"ready"):[],A=d?d.selectBoardColumn(Sl,"blocked"):[],O=new Map;for(let N of[...h,...A])O.set(N.id,N.title||N.id);let b=c.pr_wait||[],E=c.pr_observations||{},x=c.pr_activity||{},C=c.cleanup_failed||{},K=Object.entries(C).map(([N,D])=>({bead_id:N,step:D&&D.step?D.step:"",reason:D&&D.reason?D.reason:"",detail:D&&typeof D.detail=="string"?D.detail:null,output_tail:D&&typeof D.output_tail=="string"&&D.output_tail?D.output_tail:void 0})),te=c.queue||[],H=new Set([...te.map(N=>N.bead_id),...b.map(N=>N.bead_id),...c.done.map(N=>N.bead_id)]),Z=new Set(A.map(N=>N.id)),me=i?i.get()?.order||{}:{},lt=new Set,Rt=[];for(let N of[...h,...A])H.has(N.id)||lt.has(N.id)||Pl(N)||(lt.add(N.id),Rt.push(N));k=Nl(Rt,y,me);let tt=c.admission||{},ht=N=>{let D=tt[N];if(!D)return"";let u=typeof D.reason=="string"?D.reason:"",L=u.indexOf(":");return L>0&&L<u.length-1?`\u26D4 ${u.slice(0,L)} (${u.slice(L+1)})`:`\u26D4 ${u}`},Lt=k.map(N=>{let D=zn(N),u=Z.has(N.id),L=[];u&&L.push(Fl(N)),D||L.push("spec \uC5C6\uC74C");let q=ht(N.id);return q&&L.push(q),{id:N.id,title:N.title||N.id,reason:L.join(" \xB7 "),draggable:D,lane:"candidate",workflow:N.workflow,status:N.status,blocked:u,has_spec:D}}),m=El(Lt,v),w=m.visible,V=(N,D)=>N.map(u=>({id:u.bead_id,title:O.get(u.bead_id)||u.bead_id,reason:D==="done"?"":ht(u.bead_id),draggable:D!=="done",done:D==="done",lane:D,usage:D==="done"?Pn(c.attempts||{},u.bead_id):null})),j=c.attempts?Object.values(c.attempts):[],Q=new Set;for(let N of j)N&&typeof N.resumed_from=="string"&&N.resumed_from.length>0&&Q.add(N.resumed_from);let ue=new Map;for(let N of j)ue.set(N.bead_id,N.attempt_id);let ct=[],Qe=null;for(let N of j){let D=N.status==="paused"&&!Q.has(N.attempt_id);N.status==="running"||D?ct.push({bead_id:N.bead_id,attempt_id:N.attempt_id,title:O.get(N.bead_id)||N.bead_id,runner:N.runner||null,model:N.model||null,effort:N.effort||null,started_at:typeof N.started_at=="number"?N.started_at:null,resumed_from:N.resumed_from||null,paused:D,can_pause:typeof N.session_id=="string"&&N.session_id.length>0,usage:N.usage||null}):(N.status==="failed"||N.status==="orphaned")&&!(ue.get(N.bead_id)!==N.attempt_id)&&typeof N.dismissed_at!="number"&&(Qe=N)}let Ze=null;if(Qe){let N=typeof Qe.session_id=="string"&&Qe.session_id.length>0,D=Q.has(Qe.attempt_id),u=Qe.cause_detail;Ze={repo:Qe.repo||"",reason:Qe.cause||Qe.status,cause_detail:u&&typeof u.reason=="string"?{reason:u.reason,command:typeof u.command=="string"?u.command:null}:null,resume_attempt_id:Qe.attempt_id,resume_eligible:N&&!D,resume_reason:N?D?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}}let dt=new Set(ct.map(N=>N.bead_id)),jt=ct.filter(N=>!N.paused).length,It=(c.workspace_info||{}).slots,Yt=typeof It=="number"?It:typeof c.slots=="number"?c.slots:qr,rt=jt>Yt,Vt=V(c.done,"done"),Dt=0,Ot=0;for(let N of Vt){let D=N.usage;D&&typeof D=="object"&&(Dt+=Number.isFinite(D.input_tokens)?D.input_tokens:0,Ot+=Number.isFinite(D.output_tokens)?D.output_tokens:0)}let mr=Dt>0||Ot>0?Gt({input_tokens:Dt,output_tokens:Ot}):null;return{queue:c,idToTitle:O,candidates:w,candidate_hidden:{blocked:m.hidden_blocked,spec:m.hidden_spec},running:ct,live_count:jt,slots:Yt,over_cap:rt,failure:Ze,waiting:V(te.filter(N=>!dt.has(N.bead_id)),"queue"),pr_wait:b.map(N=>Hl(N.bead_id,O.get(N.bead_id)||N.bead_id,E,C[N.bead_id]||null,Pn(c.attempts||{},N.bead_id),x[N.bead_id]||(U.has(N.bead_id)?{activity:null,merge_progress:{step:"merging"}}:null))),done:Vt,token_total:mr,cleanup_failures:K}}function $e(c){let h=c.waiting.length>0?c.waiting[0].id:"\u2014";return p`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">
          <button
            type="button"
            class="worker-play${c.queue.auto_advance?" is-active":""}"
          >
            ${c.queue.auto_advance?"\u23F8 \uC77C\uC2DC\uC815\uC9C0":"\u25B6 \uC790\uB3D9 \uC9C4\uD589"}
          </button>
          <label class="worker-tgl worker-slots"
            >동시 실행
            <input
              type="number"
              class="worker-slots__input"
              min=${qr}
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
          </button>
        </div>
        <div class="worker-kpi">
          ${c.over_cap?p`<span
                class="worker-overcap"
                title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
                >cap 초과</span
              >`:""}
          <span class="worker-kpi__chip worker-kpi__chip--running"
            >실행 <b>${c.live_count}</b></span
          >
          <span class="worker-kpi__chip worker-kpi__chip--pr"
            >PR 대기 <b>${c.pr_wait.length}</b></span
          >
          <span class="worker-kpi__chip worker-kpi__chip--done"
            >오늘 완료 <b>${c.done.length}</b></span
          >
          ${c.token_total?p`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title="완료된 세션들의 토큰 합계 (입력+출력)"
                >${c.token_total}</span
              >`:""}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${h}</b></span
          >
        </div>
      </div>
      ${Bo({failure:c.failure,cleanupFailures:c.cleanup_failures})}`}function Se(c){if(c.running.length===0&&c.pr_wait.length===0)return"";let h=c.running.some(A=>!A.paused);return p`<section
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
          >${c.running.length+c.pr_wait.length}</span
        >
      </header>
      ${c.running.length>0?Bn(c.running,Date.now(),M):""}
      ${c.pr_wait.map(A=>Fn(A))}
    </section>`}function be(c){let h=c.candidate_hidden;return p`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${v.show_blocked}
        />
        🔒 blocked${h.blocked>0?` ${h.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${Cl.map(A=>p`<button
              type="button"
              class="worker-filter__chip${v.spec===A.value?" is-active":""}"
              data-spec=${A.value}
              aria-pressed=${v.spec===A.value?"true":"false"}
            >
              ${A.label}
            </button>`)}
        ${h.spec>0?p`<span class="worker-filter__hidden">숨김 ${h.spec}</span>`:""}
      </div>
    </div>`}function Me(){return p`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${y}
    >
      ${Rl.map(c=>p`<option value=${c.value} ?selected=${y===c.value}>
            ${c.label}
          </option>`)}
    </select>`}function Ve(c){let h=bt({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:c.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:Me(),controls:be(c)});return B?p`<div class="worker-lanes worker-lanes--mobile">
        ${Se(c)}
        ${bt({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:c.waiting,empty:"\uB4DC\uB798\uADF8 \uB610\uB294 [\uB300\uAE30\uB85C \u21B4]\uB85C \uBC30\uCE58",collapsible:!0,collapsed:I.queue,preview:qo(c.waiting)})}
        ${h}
        ${bt({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:c.done,empty:"\uC644\uB8CC \uC5C6\uC74C",collapsible:!0,collapsed:I.done,preview:c.token_total||qo(c.done)})}
      </div>`:p`<div class="worker-lanes">
      ${h}
      ${bt({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:c.waiting,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58"})}
      ${bt({id:"worker-pane-running",lane:"running",title:`\uC2E4\uD589 \uC911 \xB7 \uC2AC\uB86F ${c.slots}`,items:c.running,live:c.running.some(A=>!A.paused),body:Bn(c.running,Date.now(),M)})}
      ${bt({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:c.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C"})}
      ${bt({id:"worker-pane-done",lane:"done",title:`\uC644\uB8CC \xB7 \uC624\uB298 ${c.done.length}`,items:c.done,empty:"\uC644\uB8CC \uC5C6\uC74C"})}
    </div>`}function Te(c){I={...I,[c]:!I[c]},Ml(I),le()}function le(){let c=Xe();ie($e(c),P),ie(Ve(c),g)}function Ae(){if(typeof window.matchMedia!="function")return;let c=window.matchMedia(Dl);B=!!c.matches;let h=A=>{let O=!!(A&&typeof A.matches=="boolean"?A.matches:c.matches);O!==B&&(B=O,le())};typeof c.addEventListener=="function"?(c.addEventListener("change",h),z.push(()=>c.removeEventListener("change",h))):typeof c.addListener=="function"&&(c.addListener(h),z.push(()=>c.removeListener(h)))}function Ne(c){let h=c.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!h)return;let A=h.dataset.beadId||"",O=h.dataset.lane||"";_={bead_id:A,from_lane:O};try{c.dataTransfer?.setData("text/plain",A),c.dataTransfer&&(c.dataTransfer.effectAllowed="move")}catch{}}function he(c){let h=c.target?.closest?.(".worker-pane");if(!h)return;let A=h.dataset.lane||"";A!=="candidate"&&A!=="queue"||(c.preventDefault(),c.dataTransfer&&(c.dataTransfer.dropEffect="move"),h.classList.add("worker-pane--drag-over"))}function xe(c){c.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function ze(c,h){let A=k.find(x=>x.id===c);if(!A)return;let O=k.filter(x=>x.id!==c),b=O.length;if(h){let x=h.dataset.beadId;if(x===c)return;let C=O.findIndex(K=>K.id===x);C>=0&&(b=C)}let E=O.slice();E.splice(b,0,A),f.applyReorder(c,E,b)}function Ee(c){let h=c.target?.closest?.(".worker-pane");if(!h)return;c.preventDefault(),h.classList.remove("worker-pane--drag-over");let A=h.dataset.lane||"",O=_?.bead_id||c.dataTransfer?.getData("text/plain")||"",b=_?.from_lane||"";if(_=null,!O)return;let E=c.target?.closest?.(".worker-mini, .worker-card"),x=Array.from(h.querySelectorAll(".worker-mini, .worker-card")),C=x.length;if(E){let K=x.indexOf(E);K>=0&&(C=K)}if(h.classList.contains("worker-pane--collapsed")&&(C=ye()),A==="candidate"){if(b==="candidate"){ze(O,E);return}b==="queue"&&_e(O);return}A==="queue"&&(b==="queue"?Ue(O,C):Ge(O,C))}function Ke(c){v=c,Al(c),le()}function et(c){y=c==="board"||c==="created"||c==="spec"?c:Ur,Il(y),le()}function pe(c){let h=c.target?.closest?.(".worker-filter__blocked");if(h){Ke({...v,show_blocked:h.checked});return}let A=c.target?.closest?.(".worker-sort");if(A){et(A.value||Ur);return}let O=c.target?.closest?.(".worker-slots__input");if(!O)return;let b=Number.parseInt(O.value,10);if(!Number.isFinite(b)){le();return}Oe(b).then(le)}function Ce(c){return c?{runner:c.runner||void 0,model:c.model||void 0,effort:c.effort||void 0,worktree:c.worktree||void 0,status:c.status||void 0,session_id:c.session_id||void 0}:{}}function Re(c){let h=Y(),A=h.attempts?h.attempts[c]:null;M=c,S.hidden=!1,F.open({attempt_id:c,meta:Ce(A)}),le()}function Le(){if(!M)return;let c=Y(),h=c.attempts?c.attempts[M]:null;if(h){F.updateMeta(Ce(h));return}F.close()}function R(c){let h=c.target;if(h?.closest?.("#worker-exec-defaults-dialog"))return;if(h?.closest?.(".worker-exec-defaults-btn")){W.open();return}let A=h?.closest?.(".worker-banner__resume");if(A){let Z=A.dataset.attemptId;Z&&ae(Z);return}let O=h?.closest?.(".worker-banner__dismiss");if(O){let Z=O.dataset.attemptId;Z&&at(Z);return}if(h?.closest?.(".worker-play")){se(!Y().auto_advance);return}let b=h?.closest?.(".worker-pane__hd--toggle");if(b){let Z=b.dataset.lane;(Z==="queue"||Z==="done")&&Te(Z);return}let E=h?.closest?.(".worker-card__place");if(E){let Z=E.dataset.beadId;Z&&!E.disabled&&Ge(Z,ye());return}let x=h?.closest?.(".worker-filter__chip");if(x){let Z=x.dataset.spec;(Z==="all"||Z==="with"||Z==="without")&&Ke({...v,spec:Z});return}let C=h?.closest?.(".worker-mini__merge");if(C){de(C.dataset.beadId||"");return}let K=h?.closest?.(".worker-mini__discard");if(K){Ye(K.dataset.beadId||"");return}if(h?.closest?.(".worker-mini__pr"))return;if(h?.closest?.(".rtile__stop")){let me=h?.closest?.(".rtile")?.dataset?.attemptId;me&&ve(me);return}if(h?.closest?.(".rtile__pause")){let me=h?.closest?.(".rtile")?.dataset?.attemptId;me&&je(me);return}if(h?.closest?.(".rtile__resume")){let me=h?.closest?.(".rtile")?.dataset?.attemptId;me&&ae(me);return}if(h?.closest?.(".rtile__info")){let me=h?.closest?.(".rtile")?.dataset?.beadId;me&&l&&l(me);return}if(h?.closest?.(".worker-drawer-overlay__backdrop")){F.close();return}if(h?.closest?.(".worker-drawer-host"))return;let te=h?.closest?.(".rtile");if(te){let Z=te.dataset.attemptId;Z&&Re(Z);return}let H=h?.closest?.(".worker-mini, .worker-card");if(H){let Z=H.dataset.beadId;if(h?.closest?.(".worker-mini__id, .worker-card__id")){Z&&Ht(Z).then(me=>{me?X("\uBCF5\uC0AC\uB428","success",1200):X("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}Z&&l&&l(Z)}}return t.addEventListener("dragstart",Ne),t.addEventListener("dragover",he),t.addEventListener("dragleave",xe),t.addEventListener("drop",Ee),t.addEventListener("click",R),t.addEventListener("change",pe),Ae(),d&&z.push(d.subscribe(le)),s&&z.push(s.subscribe(()=>{le(),Le()})),le(),{load(){le()},destroy(){for(let c of z.splice(0))try{c()}catch{}t.removeEventListener("dragstart",Ne),t.removeEventListener("dragover",he),t.removeEventListener("dragleave",xe),t.removeEventListener("drop",Ee),t.removeEventListener("click",R),t.removeEventListener("change",pe);try{F.destroy()}catch{}S.hidden=!0;try{W.destroy()}catch{}ie(p``,t)}}}function Wn(t){if(!t)return"Unknown";let e=t.split("/").filter(Boolean);return e.length>0?e[e.length-1]:"Unknown"}function Wo(t,e,r,n=async()=>{},s=async()=>{}){let o=ge("views:workspace-picker"),i=null,l=!1,a=!1,d=!1;async function f(T){let g=T.target.value,F=e.getState().workspace?.current?.path||"";if(g&&g!==F){o("switching workspace to %s",g),l=!0,S();try{await r(g)}catch(W){o("workspace switch failed: %o",W)}finally{l=!1,S()}}}async function _(){let T=e.getState(),$=T.workspace?.current?.path||T.workspace?.available?.[0]?.path||"";if(!(!$||a)){o("git-pulling workspace %s",$),a=!0,S();try{await n($)}catch(g){o("workspace git pull failed: %o",g)}finally{a=!1,S()}}}function k(T){let $=T.target;$&&t.contains($)||I()}function v(T){T.key==="Escape"&&I()}function y(){d||(d=!0,document.addEventListener("mousedown",k),document.addEventListener("keydown",v),S())}function I(){d&&(d=!1,document.removeEventListener("mousedown",k),document.removeEventListener("keydown",v),S())}function B(){d?I():y()}async function U(T){let $=T.target,g=$.value,M=$.checked;o("toggling visibility %s \u2192 %s",g,String(M));try{await s(g,M)}catch(F){o("workspace visibility toggle failed: %o",F)}}function z(T){return T?p`
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
    `:p``}function G(T,$){return p`
      <div class="workspace-picker__manage">
        <button
          type="button"
          class="workspace-picker__manage-button"
          @click=${B}
          aria-haspopup="true"
          aria-expanded=${d?"true":"false"}
          aria-label="프로젝트 관리"
        >
          프로젝트 관리
        </button>
        ${d?p`
              <div
                class="workspace-picker__manage-popover"
                role="menu"
                aria-label="프로젝트 표시 선택"
              >
                ${T.map(g=>p`
                    <label
                      class="workspace-picker__manage-row"
                      title="${g.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${g.path}"
                        .checked=${!$.has(g.path)}
                        @change=${U}
                      />
                      <span class="workspace-picker__manage-name"
                        >${Wn(g.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function P(){let T=e.getState(),$=T.workspace?.current,g=T.workspace?.available||[],M=new Set(T.workspace?.hidden||[]),F=$?.path||g[0]?.path||"";if(g.length===0)return p``;let W=g.filter(Y=>!M.has(Y.path)||Y.path===F);if(W.length<=1){let Y=W[0]||g[0],ee=Wn(Y.path);return p`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${Y.path}"
            >${ee}</span
          >
          ${G(g,M)}
          ${z(F)}
          ${a?p`<span
                class="workspace-picker__loading"
                aria-hidden="true"
              ></span>`:""}
        </div>
      `}return p`
      <div class="workspace-picker">
        <select
          class="workspace-picker__select"
          @change=${f}
          ?disabled=${l||a}
          aria-label="Select project workspace"
        >
          ${W.map(Y=>p`
              <option
                value="${Y.path}"
                ?selected=${Y.path===F}
                title="${Y.path}"
              >
                ${Wn(Y.path)}
              </option>
            `)}
        </select>
        ${G(g,M)}
        ${z(F)}
        ${l||a?p`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function S(){ie(P(),t)}return S(),i=e.subscribe(()=>S()),{destroy(){i&&(i(),i=null),document.removeEventListener("mousedown",k),document.removeEventListener("keydown",v),ie(p``,t)}}}var Go=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-queue-set-slots","worker-queue-set-exec-default","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-pr-merge","worker-pr-discard","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append"];function Gn(){let t=Date.now().toString(36),e=Math.random().toString(36).slice(2,8);return`${t}-${e}`}function jo(t,e,r=Gn()){return{id:r,type:t,payload:e}}function Yo(t={}){let e=ge("ws"),r={initialMs:t.backoff?.initialMs??1e3,maxMs:t.backoff?.maxMs??3e4,factor:t.backoff?.factor??2,jitterRatio:t.backoff?.jitterRatio??.2},n=()=>t.url&&t.url.length>0?t.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",i=0,l=null,a=!0,d=new Map,f=[],_=new Map,k=new Set;function v(P){for(let S of Array.from(k))try{S(P)}catch{}}function y(){if(!a||l)return;o="reconnecting",e("ws reconnecting\u2026"),v(o);let P=Math.min(r.maxMs||0,(r.initialMs||0)*Math.pow(r.factor||1,i)),S=(r.jitterRatio||0)*P,T=Math.max(0,Math.round(P+(Math.random()*2-1)*S));e("ws retry in %d ms (attempt %d)",T,i+1),l=setTimeout(()=>{l=null,G()},T)}function I(P){try{s?.send(JSON.stringify(P))}catch(S){e("ws send failed",S)}}function B(){for(o="open",e("ws open"),v(o),i=0;f.length;){let P=f.shift();P&&I(P)}}function U(P){let S;try{S=JSON.parse(String(P.data))}catch{e("ws received non-JSON message");return}if(!S||typeof S.id!="string"||typeof S.type!="string"){e("ws received invalid envelope");return}if(d.has(S.id)){let $=d.get(S.id);d.delete(S.id),S.ok?$?.resolve(S.payload):$?.reject(S.error||new Error("ws error"));return}let T=_.get(S.type);if(T&&T.size>0)for(let $ of Array.from(T))try{$(S.payload)}catch(g){e("ws event handler error",g)}else e("ws received unhandled message type: %s",S.type)}function z(){o="closed",e("ws closed"),v(o);for(let[P,S]of d.entries())S.reject(new Error("ws disconnected")),d.delete(P);i+=1,y()}function G(){if(!a)return;let P=n();try{s=new WebSocket(P),e("ws connecting %s",P),o="connecting",v(o),s.addEventListener("open",B),s.addEventListener("message",U),s.addEventListener("error",()=>{}),s.addEventListener("close",z)}catch(S){e("ws connect failed %o",S),y()}}return G(),{send(P,S){if(!Go.includes(P))return Promise.reject(new Error(`unknown message type: ${P}`));let T=Gn(),$=jo(P,S,T);return e("send %s id=%s",P,T),new Promise((g,M)=>{d.set(T,{resolve:g,reject:M,type:P}),s&&s.readyState===s.OPEN?I($):(e("queue %s id=%s (state=%s)",P,T,o),f.push($))})},on(P,S){_.has(P)||_.set(P,new Set);let T=_.get(P);return T?.add(S),()=>{T?.delete(S)}},onConnection(P){return k.add(P),()=>{k.delete(P)}},reconnect(){a=!0,l&&(clearTimeout(l),l=null),i=0,G()},close(){a=!1,l&&(clearTimeout(l),l=null);try{s?.close()}catch{}},getState(){return o}}}function Wl(){let t=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof t?.workspace_config?.default_workspace=="string"&&t.workspace_config.default_workspace.length>0?t.workspace_config.default_workspace:null}}}async function Gl(t,e){try{let n=await(await fetch("/api/config")).json();t.setState({config:n})}catch(r){e("config refresh failed",r)}}var jn=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],Vo=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"]],Ko="worker:queue",Zo="ui:order",Xo="ui:display-policy",wt="tab:board:closed",Qo="beads-ui.board.closed-range";function jl(t){let e=ge("main");e("bootstrap start");let r=p`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;ie(r,t);let n=document.getElementById("top-nav"),s=document.getElementById("board-root"),o=document.getElementById("worker-root"),i=document.getElementById("detail-panel");if(s&&o&&i){let g=function(m,w){let V="Request failed",j="";if(m&&typeof m=="object"){let ue=m;if(typeof ue.message=="string"&&ue.message.length>0&&(V=ue.message),typeof ue.details=="string")j=ue.details;else if(ue.details&&typeof ue.details=="object")try{j=JSON.stringify(ue.details,null,2)}catch{j=""}}else typeof m=="string"&&m.length>0&&(V=m);let Q=w&&w.length>0?`Failed to load ${w}`:"Request failed";$.open(Q,V,j)},se=function(m){return`${C.getState().workspace.current?.path||""}\0${m}`},Oe=function(){Ue&&(Ue().catch(()=>{}),Ue=null),_e=null,ve=null},$e=function(m){je=m;let w=()=>{je!==m||C.getState().selected_id!==m||(je=null,Xe(m))};if(!de){at.then(w);return}w()},Ve=function(){let m=is(Me);return m===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:m}}},Te=function(m){if(m)for(let[w,V]of jn){if(Se.has(w)||be.has(w))continue;let j=w===wt?Ve():{type:V};try{Y.register(w,j)}catch(Q){e("register %s store failed: %o",w,Q)}be.add(w),W.subscribeList(w,j).then(Q=>{Se.set(w,Q)}).catch(Q=>{e("subscribe %s failed: %o",w,Q),g(Q,"board")}).finally(()=>{be.delete(w)})}else Ae()},Ae=function(){for(let[m]of jn){let w=Se.get(m);w&&(w().catch(()=>{}),Se.delete(m));try{Y.unregister(m)}catch(V){e("unregister %s failed: %o",m,V)}}},xe=function(m){if(!m){ze();return}for(let[w,V]of Vo)if(!(Ne.has(w)||be.has(w))){try{Y.register(w,{type:V})}catch(j){e("register %s store failed: %o",w,j)}be.add(w),W.subscribeList(w,{type:V}).then(j=>{Ne.set(w,j)}).catch(j=>{e("subscribe %s failed: %o",w,j),g(j,"worker")}).finally(()=>{be.delete(w)})}he||(F("subscribe-worker-queue",{id:Ko}).catch(w=>{e("subscribe-worker-queue failed: %o",w)}),he=()=>F("unsubscribe-worker-queue",{id:Ko}))},ze=function(){for(let[m]of Vo){let w=Ne.get(m);w&&(w().catch(()=>{}),Ne.delete(m));try{Y.unregister(m)}catch(V){e("unregister %s failed: %o",m,V)}}he&&(he().catch(()=>{}),he=null)},Ke=function(){Ee||(F("subscribe-ui-order",{id:Zo}).catch(m=>{e("subscribe-ui-order failed: %o",m)}),Ee=()=>F("unsubscribe-ui-order",{id:Zo}))},et=function(){Ee&&(Ee().catch(()=>{}),Ee=null),re.clear()},Ce=function(){pe||(F("subscribe-display-policy",{id:Xo}).catch(m=>{e("subscribe-display-policy failed: %o",m)}),pe=()=>F("unsubscribe-display-policy",{id:Xo}))},Re=function(){pe&&(pe().catch(()=>{}),pe=null),ye.clear()},O=function(m){if(!m)return"Unknown";let w=m.split("/").filter(Boolean);return w.length>0?w[w.length-1]:"Unknown"};var l=g,a=se,d=Oe,f=$e,_=Ve,k=Te,v=Ae,y=xe,I=ze,B=Ke,U=et,z=Ce,G=Re,P=O;let S=document.getElementById("header-loading"),T=Cs(S),$=Eo(t),M=Yo(),F=T.wrapSend((m,w)=>M.send(m,w)),W=vs(F),Y=$s(),ee=Ss(),re=xs(),ye=as(),Ge=ls();M.on("ui-order-snapshot",m=>{let w=m;if(w&&typeof w.revision=="number")try{re.set({revision:w.revision,order:w.order&&typeof w.order=="object"?w.order:{}})}catch{}}),M.on("display-policy-snapshot",m=>{let w=m;if(w&&w.policy&&typeof w.policy=="object")try{ye.set(w.policy)}catch{}}),M.on("session-log-snapshot",m=>{let w=m;if(w&&typeof w.attempt_id=="string")try{Ge.set(w.attempt_id,Array.isArray(w.lines)?w.lines:[])}catch{}}),M.on("session-log-append",m=>{let w=m;if(w&&typeof w.attempt_id=="string")try{Ge.append(w.attempt_id,w.event)}catch{}}),M.on("snapshot",m=>{let w=m,V=w&&typeof w.id=="string"?w.id:"",j=V?Y.getStore(V):null;if(j&&w&&w.type==="snapshot")try{j.applyPush(w)}catch{}}),M.on("upsert",m=>{let w=m,V=w&&typeof w.id=="string"?w.id:"",j=V?Y.getStore(V):null;if(j&&w&&w.type==="upsert")try{j.applyPush(w)}catch{}}),M.on("delete",m=>{let w=m,V=w&&typeof w.id=="string"?w.id:"",j=V?Y.getStore(V):null;if(j&&w&&w.type==="delete")try{j.applyPush(w)}catch{}});let Ue=null,_e=null,ve=null,je=null,ae=()=>{},at=new Promise(m=>{ae=()=>m(void 0)}),de=!1,Ye=!1;async function Xe(m){let w=se(m);if(w===_e||w===ve)return;ve=w;let V=`detail:${m}`,j={type:"issue-detail",params:{id:m}};try{Y.register(V,j)}catch(Q){e("register detail store failed: %o",Q)}try{let Q=await W.subscribeList(V,j);if(C.getState().selected_id!==m||se(m)!==w){await Q().catch(()=>{});return}Ue&&await Ue().catch(()=>{}),Ue=Q,_e=w}catch(Q){e("detail subscribe failed: %o",Q),g(Q,"issue details")}finally{ve===w&&(ve=null)}}let Se=new Map,be=new Set,Me=_r;try{let m=window.localStorage.getItem(Qo);en(m)&&(Me=m)}catch{}async function le(m){if(!en(m)||m===Me)return;Me=m;try{window.localStorage.setItem(Qo,m)}catch{}let w=Se.get(wt);if(!w)return;Se.delete(wt),await w().catch(()=>{});let V=Ve();try{Y.register(wt,V)}catch(j){e("register %s store failed: %o",wt,j)}try{let j=await W.subscribeList(wt,V);Se.set(wt,j)}catch(j){e("re-subscribe %s failed: %o",wt,j),g(j,"board")}}let Ne=new Map,he=null,Ee=null,pe=null;async function Le(){pe=null,ye.clear(),he=null;let m=C.getState().workspace.current?.path;if(m)try{await M.send("set-workspace",{path:m})}catch(w){e("workspace restore after reconnect failed: %o",w);return}Ce(),xe(C.getState().view==="worker")}async function R(){e("clearing all subscriptions for workspace switch"),Ae(),ze(),ee.clear(),et(),Ke(),Re(),Ce(),Oe();let m=C.getState();if(m.selected_id)try{Y.unregister(`detail:${m.selected_id}`)}catch{}let w=C.getState();Te(w.view==="board"),xe(w.view==="worker"),w.selected_id&&$e(w.selected_id)}async function c(m){e("requesting workspace switch to %s",m),Ye=!0;try{let w=await M.send("set-workspace",{path:m});e("workspace switch result: %o",w),w&&w.workspace&&(C.setState({workspace:{current:{path:w.workspace.root_dir,database:w.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",m),w.changed&&(await R(),X("Switched to "+O(m),"success",2e3)))}catch(w){throw e("workspace switch failed: %o",w),X("Failed to switch workspace","error",3e3),w}finally{Ye=!1}}async function h(m){e("requesting workspace git pull for %s",m);try{let w=await M.send("git-pull-workspace",{});e("workspace git pull result: %o",w);let V=w?.status;if(V==="up_to_date"){X("Already up to date","success",2e3);return}if(V==="stash_pop_conflict"){X("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}X("Git pulled "+O(m),"success",2e3)}catch(w){e("workspace git pull failed: %o",w);let V=w?.code,j=w?.message;if(V==="rebase_conflict"){X("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(V==="rebase_conflict_abort_failed"){X("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(V==="busy"){X("Git pull skipped: another operation is running","warning",3e3);return}let Q=j?`: ${j}`:"";throw X(`Git pull failed${Q}`,"error",3e3),w}}async function A(m,w){e("setting workspace visibility %s \u2192 %s",m,String(w));try{await M.send("set-workspace-visibility",{path:m,visible:w}),await b()}catch(V){e("workspace visibility update failed: %o",V),X("Failed to update project visibility","error",3e3)}}async function b(){try{let m=await M.send("list-workspaces",{});if(e("workspaces loaded: %o",m),m&&Array.isArray(m.workspaces)){let w=m.workspaces.map(ue=>({path:ue.path,database:ue.database,pid:ue.pid,version:ue.version})),V=m.current?{path:m.current.root_dir,database:m.current.db_path}:null,j=Array.isArray(m.hidden)?m.hidden.filter(ue=>typeof ue=="string"):[];C.setState({workspace:{current:V,available:w,hidden:j}});let Q=window.localStorage.getItem("beads-ui.workspace");Q&&(!w.some(ct=>ct.path===Q)||j.includes(Q)?window.localStorage.removeItem("beads-ui.workspace"):V&&Q!==V.path&&(e("restoring saved workspace preference: %s",Q),await c(Q)))}}catch(m){e("failed to load workspaces: %o",m)}}M.on("workspace-changed",m=>{e("workspace-changed event: %o",m),m&&m.root_dir&&(C.setState({workspace:{current:{path:m.root_dir,database:m.db_path}}}),b(),R())});let E=!1;if(typeof M.onConnection=="function"){let m=w=>{e("ws state %s",w),w==="reconnecting"||w==="closed"?(E=!0,X("Connection lost. Reconnecting\u2026","error",4e3)):w==="open"&&E&&(E=!1,X("Reconnected","success",2200),Gl(C,(V,j)=>{e(`${V}: %o`,j)}),Le())};M.onConnection(m)}let x="board";try{let m=window.localStorage.getItem("beads-ui.view");(m==="board"||m==="worker")&&(x=m)}catch(m){e("view parse error: %o",m)}let C=Es({config:Wl(),view:x});M.on("worker-queue-snapshot",m=>{let w=m;if(!w||!w.queue)return;let V=C.getState().workspace.current?.path;if(typeof V=="string"&&V.length>0&&w.root_dir!==V){e("dropping worker-queue snapshot for %s",String(w.root_dir));return}try{ee.set(w.queue)}catch{}});let K=Ts(C);K.start();let te=async(m,w)=>{try{return await F(m,w)}catch{return[]}};n&&Co(n,C,K);let H=document.getElementById("workspace-picker");H&&Wo(H,C,c,h,A);let Z=Do(t,(m,w)=>F(m,w));try{let m=document.getElementById("new-issue-btn");m&&m.addEventListener("click",()=>Z.open())}catch{}let me=Ao(t,{policyStore:ye,transport:(m,w)=>F(m,w),labelOptions:()=>{let m=new Set;for(let[w]of jn)for(let V of Y.snapshotFor(w)||[]){let j=V.labels;if(Array.isArray(j))for(let Q of j)typeof Q=="string"&&Q.length>0&&m.add(Q)}return Array.from(m).sort()}});try{let m=document.getElementById("display-settings-btn");m&&m.addEventListener("click",()=>me.open())}catch{}let lt=Ns(s,{gotoIssue:m=>K.gotoIssue(m),issueStores:Y,transport:te,uiOrderStore:re,displayPolicyStore:ye,closedRange:Me,onClosedRangeChange:m=>{le(m)},onNewIssue:()=>Z.open()}),Rt=Hn(o,{transport:te,issueStores:Y,queueStore:ee,sessionLogStore:Ge,uiOrderStore:re,gotoIssue:m=>C.setState({selected_id:m}),getWorkspacePath:()=>C.getState().workspace.current?.path}),tt=So(i,{issueStores:Y,transport:te,queueStore:ee,sessionLogStore:Ge,getWorkspacePath:()=>C.getState().workspace.current?.path,onNavigate:m=>{C.getState().view==="worker"?C.setState({selected_id:m}):K.gotoIssue(m)},onClose:()=>{let m=C.getState();C.setState({selected_id:null});try{K.gotoView(m.view==="worker"?"worker":"board")}catch{}}}),ht=C.getState().selected_id;ht&&(i.hidden=!1,tt.load(ht),$e(ht)),C.subscribe(m=>{let w=m.selected_id;w?(i.hidden=!1,tt.load(w),Ye||$e(w)):(tt.clear(),i.hidden=!0,Oe())});let Lt=m=>{s.hidden=m.view!=="board",o.hidden=m.view!=="worker",Te(m.view==="board"),xe(m.view==="worker"),!m.selected_id&&m.view==="board"&&lt.load(),m.view==="worker"&&Rt.load(),window.localStorage.setItem("beads-ui.view",m.view)};C.subscribe(Lt),Lt(C.getState()),Ke(),Ce(),b().finally(()=>{de=!0,ae()}),window.addEventListener("keydown",m=>{let w=m.ctrlKey||m.metaKey,V=String(m.key||"").toLowerCase(),j=m.target,Q=j&&j.tagName?String(j.tagName).toLowerCase():"",ue=Q==="input"||Q==="textarea"||Q==="select"||j&&typeof j.isContentEditable=="boolean"&&j.isContentEditable;w&&V==="n"&&(ue||(m.preventDefault(),Z.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let r=window.localStorage.getItem("beads-ui.theme"),n=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=r==="dark"||r==="light"?r:n?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let t=document.getElementById("theme-switch");t&&t.addEventListener("change",()=>{let r=t.checked?"dark":"light";document.documentElement.setAttribute("data-theme",r),window.localStorage.setItem("beads-ui.theme",r)});let e=document.getElementById("app");e&&jl(e)});export{jl as bootstrap,Wl as readBootstrapConfig,Gl as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
