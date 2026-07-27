var Jo=Object.create;var Wr=Object.defineProperty;var ei=Object.getOwnPropertyDescriptor;var ti=Object.getOwnPropertyNames;var ri=Object.getPrototypeOf,ni=Object.prototype.hasOwnProperty;var si=(t,e,r)=>e in t?Wr(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r;var Gr=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports);var oi=(t,e,r,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of ti(e))!ni.call(t,s)&&s!==r&&Wr(t,s,{get:()=>e[s],enumerable:!(n=ei(e,s))||n.enumerable});return t};var ii=(t,e,r)=>(r=t!=null?Jo(ri(t)):{},oi(e||!t||!t.__esModule?Wr(r,"default",{value:t,enumerable:!0}):r,t));var ce=(t,e,r)=>si(t,typeof e!="symbol"?e+"":e,r);var ds=Gr((ec,cs)=>{var Mt=1e3,Nt=Mt*60,Pt=Nt*60,$t=Pt*24,ui=$t*7,pi=$t*365.25;cs.exports=function(t,e){e=e||{};var r=typeof t;if(r==="string"&&t.length>0)return fi(t);if(r==="number"&&isFinite(t))return e.long?gi(t):hi(t);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(t))};function fi(t){if(t=String(t),!(t.length>100)){var e=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(t);if(e){var r=parseFloat(e[1]),n=(e[2]||"ms").toLowerCase();switch(n){case"years":case"year":case"yrs":case"yr":case"y":return r*pi;case"weeks":case"week":case"w":return r*ui;case"days":case"day":case"d":return r*$t;case"hours":case"hour":case"hrs":case"hr":case"h":return r*Pt;case"minutes":case"minute":case"mins":case"min":case"m":return r*Nt;case"seconds":case"second":case"secs":case"sec":case"s":return r*Mt;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r;default:return}}}}function hi(t){var e=Math.abs(t);return e>=$t?Math.round(t/$t)+"d":e>=Pt?Math.round(t/Pt)+"h":e>=Nt?Math.round(t/Nt)+"m":e>=Mt?Math.round(t/Mt)+"s":t+"ms"}function gi(t){var e=Math.abs(t);return e>=$t?br(t,e,$t,"day"):e>=Pt?br(t,e,Pt,"hour"):e>=Nt?br(t,e,Nt,"minute"):e>=Mt?br(t,e,Mt,"second"):t+" ms"}function br(t,e,r,n){var s=e>=r*1.5;return Math.round(t/r)+" "+n+(s?"s":"")}});var ps=Gr((tc,us)=>{function mi(t){r.debug=r,r.default=r,r.coerce=a,r.disable=i,r.enable=s,r.enabled=l,r.humanize=ds(),r.destroy=u,Object.keys(t).forEach(h=>{r[h]=t[h]}),r.names=[],r.skips=[],r.formatters={};function e(h){let b=0;for(let k=0;k<h.length;k++)b=(b<<5)-b+h.charCodeAt(k),b|=0;return r.colors[Math.abs(b)%r.colors.length]}r.selectColor=e;function r(h){let b,k=null,x,$;function I(...F){if(!I.enabled)return;let B=I,q=Number(new Date),H=q-(b||q);B.diff=H,B.prev=b,B.curr=q,b=q,F[0]=r.coerce(F[0]),typeof F[0]!="string"&&F.unshift("%O");let N=0;F[0]=F[0].replace(/%([a-zA-Z%])/g,(C,S)=>{if(C==="%%")return"%";N++;let m=r.formatters[S];if(typeof m=="function"){let D=F[N];C=m.call(B,D),F.splice(N,1),N--}return C}),r.formatArgs.call(B,F),(B.log||r.log).apply(B,F)}return I.namespace=h,I.useColors=r.useColors(),I.color=r.selectColor(h),I.extend=n,I.destroy=r.destroy,Object.defineProperty(I,"enabled",{enumerable:!0,configurable:!1,get:()=>k!==null?k:(x!==r.namespaces&&(x=r.namespaces,$=r.enabled(h)),$),set:F=>{k=F}}),typeof r.init=="function"&&r.init(I),I}function n(h,b){let k=r(this.namespace+(typeof b>"u"?":":b)+h);return k.log=this.log,k}function s(h){r.save(h),r.namespaces=h,r.names=[],r.skips=[];let b=(typeof h=="string"?h:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let k of b)k[0]==="-"?r.skips.push(k.slice(1)):r.names.push(k)}function o(h,b){let k=0,x=0,$=-1,I=0;for(;k<h.length;)if(x<b.length&&(b[x]===h[k]||b[x]==="*"))b[x]==="*"?($=x,I=k,x++):(k++,x++);else if($!==-1)x=$+1,I++,k=I;else return!1;for(;x<b.length&&b[x]==="*";)x++;return x===b.length}function i(){let h=[...r.names,...r.skips.map(b=>"-"+b)].join(",");return r.enable(""),h}function l(h){for(let b of r.skips)if(o(h,b))return!1;for(let b of r.names)if(o(h,b))return!0;return!1}function a(h){return h instanceof Error?h.stack||h.message:h}function u(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return r.enable(r.load()),r}us.exports=mi});var fs=Gr((Ge,wr)=>{Ge.formatArgs=bi;Ge.save=wi;Ge.load=ki;Ge.useColors=_i;Ge.storage=yi();Ge.destroy=(()=>{let t=!1;return()=>{t||(t=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();Ge.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function _i(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let t;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(t=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(t[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function bi(t){if(t[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+t[0]+(this.useColors?"%c ":" ")+"+"+wr.exports.humanize(this.diff),!this.useColors)return;let e="color: "+this.color;t.splice(1,0,e,"color: inherit");let r=0,n=0;t[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(r++,s==="%c"&&(n=r))}),t.splice(n,0,e)}Ge.log=console.debug||console.log||(()=>{});function wi(t){try{t?Ge.storage.setItem("debug",t):Ge.storage.removeItem("debug")}catch{}}function ki(){let t;try{t=Ge.storage.getItem("debug")||Ge.storage.getItem("DEBUG")}catch{}return!t&&typeof process<"u"&&"env"in process&&(t=process.env.DEBUG),t}function yi(){try{return localStorage}catch{}}wr.exports=ps()(Ge);var{formatters:vi}=wr.exports;vi.j=function(t){try{return JSON.stringify(t)}catch(e){return"[UnexpectedJSONParseError]: "+e.message}}});var Kt=globalThis,mr=Kt.trustedTypes,Kn=mr?mr.createPolicy("lit-html",{createHTML:t=>t}):void 0,ts="$lit$",ut=`lit$${Math.random().toFixed(9).slice(2)}$`,rs="?"+ut,ai=`<${rs}>`,yt=document,Zt=()=>yt.createComment(""),Xt=t=>t===null||typeof t!="object"&&typeof t!="function",Qr=Array.isArray,li=t=>Qr(t)||typeof t?.[Symbol.iterator]=="function",jr=`[ 	
\f\r]`,Vt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Zn=/-->/g,Xn=/>/g,wt=RegExp(`>|${jr}(?:([^\\s"'>=/]+)(${jr}*=${jr}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Qn=/'/g,Jn=/"/g,ns=/^(?:script|style|textarea|title)$/i,Jr=t=>(e,...r)=>({_$litType$:t,strings:e,values:r}),p=Jr(1),Vl=Jr(2),Kl=Jr(3),vt=Symbol.for("lit-noChange"),ke=Symbol.for("lit-nothing"),es=new WeakMap,kt=yt.createTreeWalker(yt,129);function ss(t,e){if(!Qr(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return Kn!==void 0?Kn.createHTML(e):e}var ci=(t,e)=>{let r=t.length-1,n=[],s,o=e===2?"<svg>":e===3?"<math>":"",i=Vt;for(let l=0;l<r;l++){let a=t[l],u,h,b=-1,k=0;for(;k<a.length&&(i.lastIndex=k,h=i.exec(a),h!==null);)k=i.lastIndex,i===Vt?h[1]==="!--"?i=Zn:h[1]!==void 0?i=Xn:h[2]!==void 0?(ns.test(h[2])&&(s=RegExp("</"+h[2],"g")),i=wt):h[3]!==void 0&&(i=wt):i===wt?h[0]===">"?(i=s??Vt,b=-1):h[1]===void 0?b=-2:(b=i.lastIndex-h[2].length,u=h[1],i=h[3]===void 0?wt:h[3]==='"'?Jn:Qn):i===Jn||i===Qn?i=wt:i===Zn||i===Xn?i=Vt:(i=wt,s=void 0);let x=i===wt&&t[l+1].startsWith("/>")?" ":"";o+=i===Vt?a+ai:b>=0?(n.push(u),a.slice(0,b)+ts+a.slice(b)+ut+x):a+ut+(b===-2?l:x)}return[ss(t,o+(t[r]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),n]},Qt=class t{constructor({strings:e,_$litType$:r},n){let s;this.parts=[];let o=0,i=0,l=e.length-1,a=this.parts,[u,h]=ci(e,r);if(this.el=t.createElement(u,n),kt.currentNode=this.el.content,r===2||r===3){let b=this.el.content.firstChild;b.replaceWith(...b.childNodes)}for(;(s=kt.nextNode())!==null&&a.length<l;){if(s.nodeType===1){if(s.hasAttributes())for(let b of s.getAttributeNames())if(b.endsWith(ts)){let k=h[i++],x=s.getAttribute(b).split(ut),$=/([.?@])?(.*)/.exec(k);a.push({type:1,index:o,name:$[2],strings:x,ctor:$[1]==="."?Vr:$[1]==="?"?Kr:$[1]==="@"?Zr:Ot}),s.removeAttribute(b)}else b.startsWith(ut)&&(a.push({type:6,index:o}),s.removeAttribute(b));if(ns.test(s.tagName)){let b=s.textContent.split(ut),k=b.length-1;if(k>0){s.textContent=mr?mr.emptyScript:"";for(let x=0;x<k;x++)s.append(b[x],Zt()),kt.nextNode(),a.push({type:2,index:++o});s.append(b[k],Zt())}}}else if(s.nodeType===8)if(s.data===rs)a.push({type:2,index:o});else{let b=-1;for(;(b=s.data.indexOf(ut,b+1))!==-1;)a.push({type:7,index:o}),b+=ut.length-1}o++}}static createElement(e,r){let n=yt.createElement("template");return n.innerHTML=e,n}};function Dt(t,e,r=t,n){if(e===vt)return e;let s=n!==void 0?r._$Co?.[n]:r._$Cl,o=Xt(e)?void 0:e._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(t),s._$AT(t,r,n)),n!==void 0?(r._$Co??(r._$Co=[]))[n]=s:r._$Cl=s),s!==void 0&&(e=Dt(t,s._$AS(t,e.values),s,n)),e}var Yr=class{constructor(e,r){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:r},parts:n}=this._$AD,s=(e?.creationScope??yt).importNode(r,!0);kt.currentNode=s;let o=kt.nextNode(),i=0,l=0,a=n[0];for(;a!==void 0;){if(i===a.index){let u;a.type===2?u=new Jt(o,o.nextSibling,this,e):a.type===1?u=new a.ctor(o,a.name,a.strings,this,e):a.type===6&&(u=new Xr(o,this,e)),this._$AV.push(u),a=n[++l]}i!==a?.index&&(o=kt.nextNode(),i++)}return kt.currentNode=yt,s}p(e){let r=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(e,n,r),r+=n.strings.length-2):n._$AI(e[r])),r++}},Jt=class t{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,r,n,s){this.type=2,this._$AH=ke,this._$AN=void 0,this._$AA=e,this._$AB=r,this._$AM=n,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,r=this._$AM;return r!==void 0&&e?.nodeType===11&&(e=r.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,r=this){e=Dt(this,e,r),Xt(e)?e===ke||e==null||e===""?(this._$AH!==ke&&this._$AR(),this._$AH=ke):e!==this._$AH&&e!==vt&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):li(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==ke&&Xt(this._$AH)?this._$AA.nextSibling.data=e:this.T(yt.createTextNode(e)),this._$AH=e}$(e){let{values:r,_$litType$:n}=e,s=typeof n=="number"?this._$AC(e):(n.el===void 0&&(n.el=Qt.createElement(ss(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===s)this._$AH.p(r);else{let o=new Yr(s,this),i=o.u(this.options);o.p(r),this.T(i),this._$AH=o}}_$AC(e){let r=es.get(e.strings);return r===void 0&&es.set(e.strings,r=new Qt(e)),r}k(e){Qr(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,n,s=0;for(let o of e)s===r.length?r.push(n=new t(this.O(Zt()),this.O(Zt()),this,this.options)):n=r[s],n._$AI(o),s++;s<r.length&&(this._$AR(n&&n._$AB.nextSibling,s),r.length=s)}_$AR(e=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);e!==this._$AB;){let n=e.nextSibling;e.remove(),e=n}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},Ot=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,r,n,s,o){this.type=1,this._$AH=ke,this._$AN=void 0,this.element=e,this.name=r,this._$AM=s,this.options=o,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=ke}_$AI(e,r=this,n,s){let o=this.strings,i=!1;if(o===void 0)e=Dt(this,e,r,0),i=!Xt(e)||e!==this._$AH&&e!==vt,i&&(this._$AH=e);else{let l=e,a,u;for(e=o[0],a=0;a<o.length-1;a++)u=Dt(this,l[n+a],r,a),u===vt&&(u=this._$AH[a]),i||(i=!Xt(u)||u!==this._$AH[a]),u===ke?e=ke:e!==ke&&(e+=(u??"")+o[a+1]),this._$AH[a]=u}i&&!s&&this.j(e)}j(e){e===ke?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},Vr=class extends Ot{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===ke?void 0:e}},Kr=class extends Ot{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==ke)}},Zr=class extends Ot{constructor(e,r,n,s,o){super(e,r,n,s,o),this.type=5}_$AI(e,r=this){if((e=Dt(this,e,r,0)??ke)===vt)return;let n=this._$AH,s=e===ke&&n!==ke||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,o=e!==ke&&(n===ke||s);s&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},Xr=class{constructor(e,r,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=r,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){Dt(this,e)}};var di=Kt.litHtmlPolyfillSupport;di?.(Qt,Jt),(Kt.litHtmlVersions??(Kt.litHtmlVersions=[])).push("3.3.1");var ie=(t,e,r)=>{let n=r?.renderBefore??e,s=n._$litPart$;if(s===void 0){let o=r?.renderBefore??null;n._$litPart$=s=new Jt(e.insertBefore(Zt(),o),o,void 0,r??{})}return s._$AI(t),s};var _r="today",os=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}];function en(t){return t==="today"||t==="7d"||t==="30d"||t==="all"}function is(t,e=Date.now()){switch(t){case"today":{let r=new Date(e);return r.setHours(0,0,0,0),r.getTime()}case"7d":return e-7*864e5;case"30d":return e-30*864e5;case"all":default:return}}function as(){let t=null,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{get(){return t},set(n){t=n,r()},clear(){t=null,r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}function ls(){let t=new Map,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{set(n,s){t.set(n,{lines:Array.isArray(s)?[...s]:[]}),r()},append(n,s){let o=t.get(n)||{lines:[]};o.lines=[...o.lines,s],t.set(n,o),r()},get(n){return t.get(n)||null},clear(n){typeof n=="string"?t.delete(n):t.clear(),r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}var hs=ii(fs(),1);function me(t){return(0,hs.default)(`beads-ui:${t}`)}function rt(t){if(typeof t=="number")return Number.isFinite(t)?t:0;if(typeof t=="string"){let e=Date.parse(t);return Number.isFinite(e)?e:0}return 0}function xt(t,e){let r=rt(t.created_at),n=rt(e.created_at);if(r!==n)return r<n?1:-1;let s=t.priority??2,o=e.priority??2;if(s!==o)return s-o;let i=t.id,l=e.id;return i<l?-1:i>l?1:0}function _s(t,e){let r=rt(t.created_at),n=rt(e.created_at);if(r!==n)return r<n?-1:1;let s=t.priority??2,o=e.priority??2;if(s!==o)return s-o;let i=t.id,l=e.id;return i<l?-1:i>l?1:0}function bs(t,e){let r=rt(t.updated_at),n=rt(e.updated_at);if(r!==n)return r<n?1:-1;let s=t.id,o=e.id;return s<o?-1:s>o?1:0}function ws(t,e){let r=t.priority??2,n=e.priority??2;if(r!==n)return r-n;let s=rt(t.created_at),o=rt(e.created_at);if(s!==o)return s<o?1:-1;let i=t.id,l=e.id;return i<l?-1:i>l?1:0}function ks(t,e){let r=t.closed_at??0,n=e.closed_at??0;if(r!==n)return r<n?1:-1;let s=t?.id,o=e?.id;return s<o?-1:s>o?1:0}var $i=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function gs(t){let e=t&&t.metadata,r=e?e.task_order:void 0;if(r==null||r==="")return Number.POSITIVE_INFINITY;let n=Number(r);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function ms(t){let e=t&&t.title;if(typeof e!="string")return Number.POSITIVE_INFINITY;let r=$i.exec(e);if(!r)return Number.POSITIVE_INFINITY;let n=Number(r[1]);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function ys(t,e){let r=gs(t),n=gs(e);if(r!==n)return r<n?-1:1;let s=ms(t),o=ms(e);if(s!==o)return s<o?-1:1;let i=rt(t&&t.created_at),l=rt(e&&e.created_at);if(i!==l)return i<l?-1:1;let a=t&&t.id,u=e&&e.id;return a===u?0:String(a)<String(u)?-1:1}var tn=2**20;function Ft(t,e){let r=t&&t.id;return e&&typeof r=="string"&&Object.prototype.hasOwnProperty.call(e,r)&&typeof e[r]=="number"&&Number.isFinite(e[r])?e[r]:-rt(t&&t.created_at)}function kr(t){return(e,r)=>{let n=Ft(e,t),s=Ft(r,t);if(n!==s)return n<s?-1:1;let o=e?.id,i=r?.id;return o<i?-1:o>i?1:0}}function rn(t,e,r){let n=Array.isArray(t)?t:[],s=n.length,o=Math.max(0,Math.min(e,s-1)),i=o-1>=0?n[o-1]:null,l=o+1<s?n[o+1]:null;if(!i&&!l)return{rank:0};if(!i)return{rank:Ft(l,r)-tn};if(!l)return{rank:Ft(i,r)+tn};let a=Ft(i,r),u=Ft(l,r),h=(a+u)/2;return a<h&&h<u?{rank:h}:{renormalize:n.map((b,k)=>({bead_id:b.id,rank:k*tn}))}}function nn(t,e={}){let r=me(`issue-store:${t}`),n=new Map,s=[],o=0,i=new Set,l=!1,a=e.sort||xt;function u(){for(let k of Array.from(i))try{k()}catch{}}function h(){s=Array.from(n.values()).sort(a)}function b(k){if(l||!k||k.id!==t)return;let x=Number(k.revision)||0;if(r("apply %s rev=%d",k.type,x),!(x<=o&&k.type!=="snapshot")){if(k.type==="snapshot"){if(x<=o)return;n.clear();let $=Array.isArray(k.issues)?k.issues:[];for(let I of $)I&&typeof I.id=="string"&&I.id.length>0&&n.set(I.id,I);h(),o=x,u();return}if(k.type==="upsert"){let $=k.issue;if($&&typeof $.id=="string"&&$.id.length>0){let I=n.get($.id);if(!I)n.set($.id,$);else{let F=Number.isFinite(I.updated_at)?I.updated_at:0,B=Number.isFinite($.updated_at)?$.updated_at:0;if(F<=B){for(let q of Object.keys(I))q in $||delete I[q];for(let[q,H]of Object.entries($))I[q]=H}}h()}o=x,u()}else if(k.type==="delete"){let $=String(k.issue_id||"");$&&(n.delete($),h()),o=x,u()}}}return{id:t,subscribe(k){return i.add(k),()=>{i.delete(k)}},applyPush:b,snapshot(){return s},size(){return n.size},getById(k){return n.get(k)},dispose(){l=!0,n.clear(),s=[],i.clear(),o=0}}}function yr(t){let e=String(t.type||"").trim(),r={};if(t.params&&typeof t.params=="object"){let s=Object.keys(t.params).sort();for(let o of s){let i=t.params[o];r[o]=String(i)}}let n=new URLSearchParams(r).toString();return n.length>0?`${e}?${n}`:e}function vs(t){let e=me("subs"),r=new Map,n=new Map;function s(l,a){e("applyDelta %s +%d ~%d -%d",l,(a.added||[]).length,(a.updated||[]).length,(a.removed||[]).length);let u=n.get(l);if(!u||u.size===0)return;let h=Array.isArray(a.added)?a.added:[],b=Array.isArray(a.updated)?a.updated:[],k=Array.isArray(a.removed)?a.removed:[];for(let x of Array.from(u)){let $=r.get(x);if(!$)continue;let I=$.itemsById;for(let F of h)typeof F=="string"&&F.length>0&&I.set(F,!0);for(let F of b)typeof F=="string"&&F.length>0&&I.set(F,!0);for(let F of k)typeof F=="string"&&F.length>0&&I.delete(F)}}async function o(l,a){let u=yr(a);if(e("subscribe %s key=%s",l,u),!r.has(l))r.set(l,{key:u,itemsById:new Map});else{let b=r.get(l);if(b&&b.key!==u){let k=n.get(b.key);k&&(k.delete(l),k.size===0&&n.delete(b.key)),r.set(l,{key:u,itemsById:new Map})}}n.has(u)||n.set(u,new Set);let h=n.get(u);h&&h.add(l);try{await t("subscribe-list",{id:l,type:a.type,params:a.params})}catch(b){let k=r.get(l)||null;if(k){let x=n.get(k.key);x&&(x.delete(l),x.size===0&&n.delete(k.key))}throw r.delete(l),b}return async()=>{e("unsubscribe %s key=%s",l,u);try{await t("unsubscribe-list",{id:l})}catch{}let b=r.get(l)||null;if(b){let k=n.get(b.key);k&&(k.delete(l),k.size===0&&n.delete(b.key))}r.delete(l)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:yr,selectors:{getIds(l){let a=r.get(l);return a?Array.from(a.itemsById.keys()):[]},has(l,a){let u=r.get(l);return u?u.itemsById.has(a):!1},count(l){let a=r.get(l);return a?a.itemsById.size:0},getItemsById(l){let a=r.get(l),u={};if(!a)return u;for(let h of a.itemsById.keys())u[h]=!0;return u}}}}function $s(){let t=me("issue-stores"),e=new Map,r=new Map,n=new Set,s=new Map;function o(){for(let a of Array.from(n))try{a()}catch{}}function i(a,u,h){let b=u?yr(u):"",k=r.get(a)||"",x=e.has(a);if(t("register %s key=%s (prev=%s)",a,b,k),x&&k&&b&&k!==b){let $=e.get(a);if($)try{$.dispose()}catch{}let I=s.get(a);if(I){try{I()}catch{}s.delete(a)}let F=nn(a,h);e.set(a,F);let B=F.subscribe(()=>o());s.set(a,B)}else if(!x){let $=nn(a,h);e.set(a,$);let I=$.subscribe(()=>o());s.set(a,I)}return r.set(a,b),()=>l(a)}function l(a){t("unregister %s",a),r.delete(a);let u=e.get(a);u&&(u.dispose(),e.delete(a));let h=s.get(a);if(h){try{h()}catch{}s.delete(a)}}return{register:i,unregister:l,getStore(a){return e.get(a)||null},snapshotFor(a){let u=e.get(a);return u?u.snapshot().slice():[]},subscribe(a){return n.add(a),()=>n.delete(a)}}}function xs(){let t=null,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{get(){return t},set(n){t=n,r()},clear(){t=null,r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}function Ss(){let t=null,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{get(){return t},set(n){t=n,r()},clear(){t=null,r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}function sn(t,e){return`#/${t==="worker"?"worker":"board"}?issue=${encodeURIComponent(e)}`}function xi(t){let e=String(t||""),r=e.startsWith("#")?e.slice(1):e,n=r.indexOf("?"),s=n>=0?r.slice(n+1):"";if(s){let l=new URLSearchParams(s).get("issue");if(l)return decodeURIComponent(l)}let o=/^\/issue\/([^\s?#]+)/.exec(r);return o&&o[1]?decodeURIComponent(o[1]):null}function Si(t){let e=String(t||"");return/^#\/worker(\b|\/|$)/.test(e)?"worker":"board"}function Ts(t){let e=me("router"),r=()=>{let n=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(n),o=s&&s[1]?decodeURIComponent(s[1]):xi(n),i=Si(n);if(e("hash change \u2192 view=%s id=%s",i,o),t.setState({selected_id:i==="worker"?null:o,view:i,worker:{selected_parent_id:i==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(n)){let a=o?`#/${i}?issue=${encodeURIComponent(o)}`:`#/${i}`;window.location.hash!==a&&(window.location.hash=a)}};return{start(){window.addEventListener("hashchange",r),r()},stop(){window.removeEventListener("hashchange",r)},gotoIssue(n){let o=(t.getState?t.getState():{view:"board"}).view==="worker"?"worker":"board",i=sn(o,n);e("goto issue %s (view=%s)",n,o),window.location.hash!==i?window.location.hash=i:t.setState({selected_id:o==="worker"?null:n,view:o,worker:{selected_parent_id:o==="worker"?n:null}})},gotoView(n){let s=t.getState?t.getState():{selected_id:null,worker:{selected_parent_id:null}},o=n==="worker"?s.worker?.selected_parent_id:s.selected_id,i=o?sn(n,o):`#/${n}`;e("goto view %s (id=%s)",n,o||""),window.location.hash!==i?window.location.hash=i:t.setState({view:n,selected_id:n==="worker"?null:s.selected_id})}}}var Ti=Object.freeze({workspace_config:{default_workspace:null}});function As(t){return{workspace_config:{default_workspace:typeof t?.workspace_config?.default_workspace=="string"&&t.workspace_config.default_workspace.length>0?t.workspace_config.default_workspace:Ti.workspace_config.default_workspace}}}function Es(t={}){let e=me("state"),r={selected_id:t.selected_id??null,view:t.view??"board",filters:{status:t.filters?.status??"all",search:t.filters?.search??"",type:typeof t.filters?.type=="string"?t.filters?.type:""},board:{closed_filter:t.board?.closed_filter==="3"||t.board?.closed_filter==="7"||t.board?.closed_filter==="today"?t.board?.closed_filter:"today",show_deferred_column:t.board?.show_deferred_column===!0},worker:{selected_parent_id:t.worker?.selected_parent_id??null,show_closed_children:Array.isArray(t.worker?.show_closed_children)?t.worker.show_closed_children:[]},workspace:{current:t.workspace?.current??null,available:t.workspace?.available??[],hidden:t.workspace?.hidden??[]},config:As(t.config)},n=new Set;function s(){for(let o of Array.from(n))try{o(r)}catch{}}return{getState(){return r},setState(o){let i={...r,...o,filters:{...r.filters,...o.filters||{}},board:{...r.board,...o.board||{}},worker:{...r.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:r.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:r.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:r.workspace.hidden},config:o.config!==void 0?As(o.config):r.config},l=i.workspace.current?.path!==r.workspace.current?.path||i.workspace.available.length!==r.workspace.available.length||i.workspace.hidden.length!==r.workspace.hidden.length||i.workspace.hidden.some((u,h)=>u!==r.workspace.hidden[h]),a=i.config.workspace_config.default_workspace!==r.config.workspace_config.default_workspace;i.selected_id===r.selected_id&&i.view===r.view&&i.filters.status===r.filters.status&&i.filters.search===r.filters.search&&i.filters.type===r.filters.type&&i.board.closed_filter===r.board.closed_filter&&i.board.show_deferred_column===r.board.show_deferred_column&&i.worker.selected_parent_id===r.worker.selected_parent_id&&i.worker.show_closed_children.length===r.worker.show_closed_children.length&&i.worker.show_closed_children.every((u,h)=>u===r.worker.show_closed_children[h])&&!l&&!a||(r=i,e("state change %o",{selected_id:r.selected_id,view:r.view,filters:r.filters,board:r.board,worker:r.worker,workspace:r.workspace.current?.path,config:{default_workspace:r.config.workspace_config.default_workspace}}),s())},subscribe(o){return n.add(o),()=>n.delete(o)}}}function Cs(t){let e=me("activity"),r=0,n=new Map,s=1;function o(){if(!t)return;let u=r>0;t.toggleAttribute("hidden",!u),t.setAttribute("aria-busy",u?"true":"false")}function i(){r+=1,e("start count=%d",r),o()}function l(){let u=r;r=Math.max(0,r-1),u<=0?e("done called but count was already %d",u):e("done count=%d\u2192%d",u,r),o()}function a(u){return async(b,k)=>{let x=s++,$=Date.now();n.set(x,{type:b,start_ts:$}),e("request start id=%d type=%s count=%d",x,b,r+1),i();let I=!1,F=()=>{I||(I=!0,n.delete(x),l())},B=setTimeout(()=>{I||(e("request TIMEOUT id=%d type=%s elapsed=%dms",x,b,Date.now()-$),F())},3e4);try{let q=await u(b,k),H=Date.now()-$;return e("request done id=%d type=%s elapsed=%dms",x,b,H),q}catch(q){let H=Date.now()-$;throw e("request error id=%d type=%s elapsed=%dms err=%o",x,b,H,q),q}finally{clearTimeout(B),F()}}}return o(),{wrapSend:a,start:i,done:l,getCount:()=>r,getActiveRequests:()=>{let u=Date.now();return Array.from(n.entries()).map(([h,b])=>({id:h,type:b.type,elapsed_ms:u-b.start_ts}))}}}function K(t,e="info",r=2800){let n=document.createElement("div");n.className="toast",n.textContent=t,n.style.position="fixed",n.style.right="12px",n.style.bottom="12px",n.style.zIndex="1000",n.style.color="#fff",n.style.padding="8px 10px",n.style.borderRadius="4px",n.style.fontSize="12px",e==="success"?n.style.background="#156d36":e==="warning"?n.style.background="#a36a00":e==="error"?n.style.background="#9f2011":n.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(n),setTimeout(()=>{try{n.remove()}catch{}},r)}function vr(t=void 0,e=void 0){function r(){if(!e||typeof e.get!="function")return null;let o=e.get();return o&&o.order?o.order:{}}function n(o,i,l){let a=t&&t.snapshotFor?t.snapshotFor(o).slice():[];if(i==="closed")return a.sort(ks),a;switch(l){case"created_desc":return a.sort(xt),a;case"created_asc":return a.sort(_s),a;case"updated_desc":return a.sort(bs),a;case"priority":return a.sort(ws),a;case"manual":default:{let u=r();return u?a.sort(kr(u)):a.sort(xt),a}}}function s(o){let i=[];return t&&typeof t.subscribe=="function"&&i.push(t.subscribe(o)),e&&typeof e.subscribe=="function"&&i.push(e.subscribe(o)),()=>{for(let l of i)try{l()}catch{}}}return{selectBoardColumn:n,subscribe:s}}function $r(t){let e=t.transport,r=t.uiOrderStore;function n(i,l){return"renormalize"in i?i.renormalize:[{bead_id:l,rank:i.rank}]}function s(i,l){let a={...i.order};for(let u of l)a[u.bead_id]=u.rank;r&&r.set({revision:i.revision,order:a})}async function o(i,l,a){if(!e||!r)return;let u=r.get()||{revision:0,order:{}},h=n(rn(l,a,u.order),i);s(u,h);let b=await e("ui-order-set",{expected_revision:u.revision,entries:h});if(b&&b.conflict){let k={revision:typeof b.revision=="number"?b.revision:0,order:b.order||{}};r.set(k);let x=n(rn(l,a,k.order),i);s(k,x);let $=await e("ui-order-set",{expected_revision:k.revision,entries:x});$&&$.applied&&r.set({revision:typeof $.revision=="number"?$.revision:0,order:$.order||{}})}else b&&b.applied&&r.set({revision:typeof b.revision=="number"?b.revision:0,order:b.order||{}})}return{applyReorder:o}}function xr(t){return Array.isArray(t)?t.filter(e=>typeof e=="string"):[]}function on(t,e){return!e||typeof t!="string"||t.length===0||xr(e.visible_labels).includes(t)?!0:xr(e.hidden_labels).includes(t)?!1:!xr(e.hidden_prefixes).some(r=>r.length>0&&t.startsWith(r))}function Rs(t,e){return xr(t).filter(r=>on(r,e))}function St(t,e){let r=t&&t.chips?t.chips[e]:void 0;return typeof r=="boolean"?r:!0}function an(t){if(!t)return null;if(typeof t=="number")return Number.isFinite(t)?t:null;let e=Date.parse(t);return Number.isFinite(e)?e:null}function pt(t){let e=an(t);if(e===null)return"";let r=new Date(e),n=s=>String(s).padStart(2,"0");return`${r.getFullYear()}-${n(r.getMonth()+1)}-${n(r.getDate())} ${n(r.getHours())}:${n(r.getMinutes())}`}function ln(t,e){let r=an(t);if(r===null)return"";let s=(typeof e=="number"?e:Date.now())-r;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let i=Math.floor(s/36e5);if(i<24)return`${i}\uC2DC\uAC04 \uC804`;let l=Math.floor(s/864e5);if(l<7)return`${l}\uC77C \uC804`;let a=Math.floor(l/7);if(l<30)return`${a}\uC8FC \uC804`;let u=Math.floor(l/30);return u<12?`${u}\uAC1C\uC6D4 \uC804`:`${Math.floor(l/365)}\uB144 \uC804`}var Ai={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg"},Ei={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge"},Ci={spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},Ri={reviewed:"\u2713",skip:"\u2298",stale:"\u2713"};function Li(t,e,r){if(!(r==="in_progress"||r==="resolved"))return null;for(let s of t)if(e[s]&&e[s].state==="dim")return s;return null}function Ii(t,e,r){let n=Ai[t]||t,s=e&&e.state||"empty",o=Ri[s]||"",i="bar";s==="dim"?i+=` b-${n} dim`:s==="on"||s==="reviewed"||s==="skip"?i+=` b-${n} on`:s==="stale"&&(i+=` b-${n} stale`),r&&(i+=" glow");let l=s==="empty"?"lbl":`lbl l-${n} on`,a=r?`color: var(--stage-${n}-on)`:"";return p`
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
  `}function Di(t){return typeof t!="number"||!Number.isFinite(t)?"":`P${Math.max(0,Math.min(4,t))}`}var Ls=2;function Oi(t){if(!t)return[];let e=[];if(t.external){let n=t.reason?`\u23F8 blocked: ${t.reason}`:"\u23F8 blocked";e.push(p`<span class="ctl-chip ctl-chip--blocked">${n}</span>`)}let r=Array.isArray(t.blockers)?t.blockers:[];if(r.length>0){let n=r.slice(0,Ls).join(", "),s=r.length-Ls,o=`\u26D3 blocked: ${n}${s>0?` +${s}`:""}`;e.push(p`<span class="ctl-chip ctl-chip--blocked-dep">${o}</span>`)}return e}function Mi(t,e){let r=e.policy||null,n=t.workflow&&t.workflow.chips||{},s=[];if(n.route&&St(r,"route")){let o=n.route_source==="derived";s.push(p`<span
        class="ctl-chip ctl-chip--route${o?" is-derived":""}"
        title=${o?"route \uCD94\uB860\uAC12 (metadata \uBBF8\uD540)":"route"}
        >${o?`${n.route} ?`:n.route}</span
      >`)}if(n.fast_track&&St(r,"fast_track")&&s.push(p`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),n.pr&&St(r,"pr")){let o=n.pr.number;s.push(p`<span class="ctl-chip ctl-chip--pr"
        >${`PR${o!=null?` #${o}`:""}`}</span
      >`)}for(let o of Rs(t.labels,r))s.push(p`<span class="ctl-chip ctl-chip--label">${o}</span>`);return t.from_id&&St(r,"from")&&s.push(p`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${t.from_id} \uC5F4\uAE30`}
        @click=${o=>{o.stopPropagation(),e.onFromChipClick&&e.onFromChipClick(o,String(t.from_id))}}
      >
        ↩ from ${t.from_id}
      </button>`),St(r,"blocked")&&s.push(...Oi(t.blocked_info)),s.length===0?"":p`<div class="board-card__chips">${s}</div>`}function Ni(t){switch(t){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function Pi(t){let e=ln(t.created_at),r=ln(t.updated_at);return!e&&!r?"":p`<span class="board-card__times">
    ${e?p`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${pt(t.created_at)}`}
          >생성 ${e}</span
        >`:""}
    ${e&&r?p`<span class="board-card__time-sep">·</span>`:""}
    ${r?p`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${pt(t.updated_at)}`}
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
      ${t.workflow&&St(e.policy||null,"stepper")?Sr(t.workflow,t.status):""}
      ${Fi(t,e)}
    </article>
  `}function Tt(t,e){let r=Array.isArray(t.items)?t.items.length:0,n=t.is_closed===!0;return p`
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
  `}var Hi=200,Wi={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","deferred-col":"deferred","closed-col":"closed"},Gi=new Set(["blocked-col","ready-col","in-progress-col","resolved-col","deferred-col"]),Os="beads-ui.board.sort",Ms=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function ji(){try{let t=window.localStorage.getItem(Os);if(t&&Ms.has(t))return t}catch{}return"created_desc"}function Ns(t,e){let r=me("views:board"),n=e.gotoIssue,s=e.issueStores,o=e.transport,i=e.uiOrderStore,l=e.displayPolicyStore,a=e.onClosedRangeChange,u=e.onNewIssue,h=e.closedRange||_r,b=s?vr(s,i):null,k=$r({transport:o,uiOrderStore:i}),x=[],$=[],I=[],F=[],B=[],q=[],H=!1,N=0,E=ji(),C=new Map,S=new Map,m=new Map,D=new Set,P={search:"",priority:"",type:"",labels:[]},z=!1,j=null;function ee(L){return String(L.status||"open")==="open"}function re(L){let O=String(L.status||"open");return O==="open"||O==="blocked"}function ve(L){let O=P.search.trim().toLowerCase(),d=P.priority,f=P.type,y=P.labels;return L.filter(g=>{if(O){let A=String(g.id||"").toLowerCase(),T=String(g.title||"").toLowerCase();if(!A.includes(O)&&!T.includes(O))return!1}if(d!==""&&String(g.priority)!==d||f!==""&&String(g.issue_type||"")!==f)return!1;if(y.length>0){let A=Array.isArray(g.labels)?g.labels:[];if(!y.some(T=>A.includes(T)))return!1}return!0})}function je(){let L=new Set;for(let O of[x,$,I,F,B,q])for(let d of O){let f=Array.isArray(d.labels)?d.labels:[];for(let y of f)typeof y=="string"&&y.length>0&&L.add(y)}return Array.from(L).sort()}function ze(){return P.search.trim()!==""||P.priority!==""||P.type!==""||P.labels.length>0}function _e(){try{if(b){let L=b.selectBoardColumn("tab:board:in-progress","in_progress",E),O=b.selectBoardColumn("tab:board:blocked","blocked",E).filter(re),d=new Set(L.map(U=>U.id)),f=b.selectBoardColumn("tab:board:ready","ready",E).filter(U=>ee(U)&&!d.has(U.id)),y=b.selectBoardColumn("tab:board:resolved","resolved",E),g=b.selectBoardColumn("tab:board:deferred","deferred",E),A=H?g:[],T=b.selectBoardColumn("tab:board:closed","closed").slice(0,Hi),R=[...O,...f,...L,...y,...A,...T];$e(R);let Y=new Set;for(let U of R)U&&U.id&&!cn(U)&&Y.add(U.id);let Q=!ze();x=Q?Bt(O,Y):O,$=Q?Bt(f,Y):f,I=Q?Bt(L,Y):L,F=Q?Bt(y,Y):y,B=Q?Bt(A,Y):A,N=g.length,q=Q?Bt(T,Y):T,C=new Map;for(let U of x)C.set(U.id,"open");for(let U of $)C.set(U.id,"open");for(let U of I)C.set(U.id,"in_progress");for(let U of F)C.set(U.id,"resolved");for(let U of B)C.set(U.id,"deferred");for(let U of q)C.set(U.id,"closed");S=new Map;for(let U of x)S.set(U.id,"blocked-col");for(let U of $)S.set(U.id,"ready-col");for(let U of I)S.set(U.id,"in-progress-col");for(let U of F)S.set(U.id,"resolved-col");for(let U of B)S.set(U.id,"deferred-col");for(let U of q)S.set(U.id,"closed-col")}fe()}catch{x=[],$=[],I=[],F=[],B=[],q=[],m=new Map,fe()}}function $e(L){let O=new Map;for(let f of L)f&&f.id&&!O.has(f.id)&&O.set(f.id,f);let d=new Map;for(let f of O.values()){let y=cn(f);if(!y)continue;let g=d.get(y);g||(g=[],d.set(y,g)),g.push({id:f.id,title:f.title,status:f.status,metadata:f.metadata,created_at:f.created_at})}m=d}function Ye(L){let O=m.get(L)||[],d=0,f=null;for(let y of O)(y.status==="resolved"||y.status==="closed")&&(d+=1),!f&&y.status==="in_progress"&&(f=y);return{total:O.length,count:d,current:f,children:O}}function ae(L){return!D.has(L)}function it(L,O){L.preventDefault(),L.stopPropagation(),D.has(O)?D.delete(O):D.add(O),fe()}function de(L,O){L.preventDefault(),L.stopPropagation(),n(O)}function Ve(L,O){L.preventDefault(),L.stopPropagation(),n(O)}function se(L,O){j||n(O)}function Me(L,O){L.preventDefault(),L.stopPropagation(),Yi(O).then(d=>{d&&K("\uBCF5\uC0AC\uB428","success",1200)})}function Xe(L,O){j=O,L.dataTransfer&&(L.dataTransfer.setData("text/plain",O),L.dataTransfer.effectAllowed="move"),L.target.classList.add("board-card--dragging")}function Se(L){L.target.classList.remove("board-card--dragging"),Qe(),setTimeout(()=>{j=null},0)}function Ee(L){let O=String(L.target.value||"");!O||O===h||(h=O,a&&a(O),fe())}let be={onCardClick:se,onCopyId:Me,onDragStart:Xe,onDragEnd:Se,onClosedRangeChange:Ee,rollupFor:Ye,isExpanded:ae,onRollupToggle:it,onChildClick:de,onFromChipClick:Ve,get policy(){return l?l.get():null}};function Ne(L){let O=L.target,d=t.querySelector(".board-filter__labels");O&&d&&d.contains(O)||le()}function Ke(L){L.key==="Escape"&&le()}function Ce(){z||(z=!0,document.addEventListener("mousedown",Ne),document.addEventListener("keydown",Ke),fe())}function le(){z&&(z=!1,document.removeEventListener("mousedown",Ne),document.removeEventListener("keydown",Ke),fe())}let Re={onSearchInput(L){P.search=String(L.target.value||""),_e()},onPriorityChange(L){P.priority=String(L.target.value||""),_e()},onTypeChange(L){P.type=String(L.target.value||""),_e()},onSortChange(L){let O=String(L.target.value||"");if(!(!Ms.has(O)||O===E)){E=O;try{window.localStorage.setItem(Os,O)}catch{}_e()}},onDeferredToggle(){H=!H,_e()},onLabelMenuToggle(){z?le():Ce()},onLabelToggle(L){let O=P.labels.indexOf(L);O===-1?P.labels.push(L):P.labels.splice(O,1),_e()},onLabelClear(){P.labels.length!==0&&(P.labels=[],_e())},onNewIssue(){u&&u()}};function He(){let L=H?"board-root board-root--deferred":"board-root";return p`
      <div class="board-view">
        ${Ds(P,Re,{sort_mode:E,show_deferred:H,deferred_count:N,label_options:je(),label_menu_open:z})}
        <div class=${L}>
          ${Tt({title:"Blocked",id:"blocked-col",items:ve(x)},be)}
          ${Tt({title:"Ready",id:"ready-col",items:ve($)},be)}
          ${Tt({title:"In progress",id:"in-progress-col",items:ve(I)},be)}
          ${Tt({title:"Resolved",id:"resolved-col",items:ve(F)},be)}
          ${H?Tt({title:"Deferred",id:"deferred-col",items:ve(B)},be):""}
          ${Tt({title:"Closed",id:"closed-col",items:ve(q),is_closed:!0,closed_range:h},be)}
        </div>
      </div>
    `}function fe(){ie(He(),t),Te()}function Te(){try{let L=Array.from(t.querySelectorAll(".board-column"));for(let O of L)Array.from(O.querySelectorAll(".board-card")).forEach((f,y)=>{f.tabIndex=y===0?0:-1})}catch{}}async function Pe(L,O){if(!o){K("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:L,status:O}),K("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(d){r("update-status failed: %o",d),K("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function Oe(L){switch(L){case"blocked-col":return x;case"ready-col":return $;case"in-progress-col":return I;case"resolved-col":return F;case"deferred-col":return B;default:return[]}}function Ze(L,O,d){if(!o||!i)return;let f=Oe(L),y=f.find(Y=>Y.id===O);if(!y)return;let g=f.filter(Y=>Y.id!==O),A=d.closest?d.closest(".board-card"):null,T=g.length;if(A){let Y=A.getAttribute("data-issue-id");if(Y===O)return;let Q=g.findIndex(U=>U.id===Y);Q>=0&&(T=Q)}let R=g.slice();R.splice(T,0,y),k.applyReorder(O,R,T)}function Qe(){for(let L of Array.from(t.querySelectorAll(".board-column--drag-over")))L.classList.remove("board-column--drag-over")}let pe=null;t.addEventListener("dragover",L=>{L.preventDefault(),L.dataTransfer&&(L.dataTransfer.dropEffect="move");let d=L.target.closest(".board-column");d&&d!==pe&&(pe&&pe.classList.remove("board-column--drag-over"),d.classList.add("board-column--drag-over"),pe=d)}),t.addEventListener("dragleave",L=>{let O=L.relatedTarget;(!O||!t.contains(O))&&pe&&(pe.classList.remove("board-column--drag-over"),pe=null)}),t.addEventListener("drop",L=>{L.preventDefault(),pe&&(pe.classList.remove("board-column--drag-over"),pe=null);let O=L.target,d=O.closest(".board-column");if(!d)return;let f=L.dataTransfer?.getData("text/plain")||"";if(!f)return;let y=d.id,g=S.get(f);if(g&&g===y){if(Gi.has(y)){if(E!=="manual"){K("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}Ze(y,f,O)}return}let A=Wi[y];if(!A){K("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}C.get(f)!==A&&Pe(f,A)}),t.addEventListener("keydown",L=>{let O=L.target;if(!(O instanceof HTMLElement))return;let d=String(O.tagName||"").toLowerCase();if(d==="input"||d==="textarea"||d==="select"||d==="button"||d==="a"||O.isContentEditable===!0)return;let f=O.closest(".board-card");if(!f)return;let y=String(L.key||"");if(y==="Enter"||y===" "){L.preventDefault();let R=f.getAttribute("data-issue-id");R&&n(R);return}if(y!=="ArrowUp"&&y!=="ArrowDown"&&y!=="ArrowLeft"&&y!=="ArrowRight")return;L.preventDefault();let g=f.closest(".board-column");if(!g)return;let A=Array.from(g.querySelectorAll(".board-card")),T=A.indexOf(f);if(y==="ArrowDown"&&T<A.length-1){Le(f,A[T+1]);return}if(y==="ArrowUp"&&T>0){Le(f,A[T-1]);return}if(y==="ArrowLeft"||y==="ArrowRight"){let R=Array.from(t.querySelectorAll(".board-column")),Y=R.indexOf(g),Q=y==="ArrowRight"?1:-1,U=Y+Q;for(;U>=0&&U<R.length;){let he=R[U].querySelector(".board-card");if(he){Le(f,he);return}U+=Q}}});function Le(L,O){try{L.tabIndex=-1,O.tabIndex=0,O.focus()}catch{}}let Ae=null;b&&b.subscribe&&(Ae=b.subscribe(()=>{try{_e()}catch{}}));let Ie=null;return l&&l.subscribe&&(Ie=l.subscribe(()=>{try{_e()}catch{}})),{async load(){r("load"),_e()},clear(){le(),Ae&&(Ae(),Ae=null),Ie&&(Ie(),Ie=null),t.replaceChildren(),x=[],$=[],I=[],F=[],B=[],q=[],C=new Map,S=new Map}}}function cn(t){let e=t&&t.parent;return typeof e=="string"?e:e&&e.id?String(e.id):""}function Bt(t,e){return t.filter(r=>{let n=cn(r);return!(n&&e.has(n))})}async function Yi(t){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(t)),!0;let e=document.createElement("textarea");e.value=String(t),e.style.position="fixed",e.style.left="-9999px",document.body.appendChild(e),e.select();let r=!1;try{r=document.execCommand("copy")}finally{e.remove()}return r}catch{return!1}}async function qt(t){let e=String(t);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(e),!0}catch{}try{let r=document.createElement("textarea");r.value=e,r.style.position="fixed",r.style.left="-9999px",document.body.appendChild(r),r.select();let n=!1;try{n=document.execCommand("copy")}finally{r.remove()}return n}catch{return!1}}var Vi={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},Ki=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,Zi=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function ft(t){return!!t&&typeof t=="object"}function dn(t){return typeof t!="string"||t.length===0?[]:t.split(/\r?\n/)}function Ps(t,e){let r=dn(t),n=dn(e),s=new Map;for(let l of r)s.set(l,(s.get(l)||0)+1);let o=0;for(let l of n){let a=s.get(l)||0;a>0?s.set(l,a-1):o+=1}let i=0;for(let l of s.values())i+=l;return{added:o,removed:i}}function Xi(t){let e="";typeof t=="string"?e=t:Array.isArray(t)?e=t.map(s=>ft(s)&&typeof s.text=="string"?s.text:"").join(""):ft(t)&&typeof t.text=="string"&&(e=t.text);let n=(String(e).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return n.length>120?`${n.slice(0,117)}\u2026`:n}function Qi(t){let e=String(t.name||""),r=t.input||{},n={kind:"tool",tool:e,icon:Vi[e]||"\u{1F527}",input:r,expandable:!0};if((e==="Read"||e==="Write")&&(n.path=String(r.file_path||r.path||"")),e==="Write"&&(n.added=dn(r.content).length),e==="Edit"){n.path=String(r.file_path||r.path||"");let{added:s,removed:o}=Ps(r.old_string,r.new_string);n.added=s,n.removed=o}if(e==="MultiEdit"){n.path=String(r.file_path||r.path||"");let s=0,o=0,i=Array.isArray(r.edits)?r.edits:[];for(let l of i){let a=Ps(ft(l)?l.old_string:"",ft(l)?l.new_string:"");s+=a.added,o+=a.removed}n.added=s,n.removed=o}return e==="Bash"&&(n.command=String(r.command||"")),(e==="Grep"||e==="Glob")&&(n.command=String(r.pattern||r.query||"")),n}function Fs(t){let e=t.split(/\r?\n/).find(n=>n.trim().length>0)||"",r=Ki.exec(e);return r?{kind:"gate",gate:r[2]==="implementation"?"impl":r[2],reviewer:r[3],verdict:r[4],time:r[5]?r[5].trim():void 0,text:e.trim()}:Zi.test(e)&&e.trim().length<=80?{kind:"phase",text:e.trim()}:{kind:"assistant",text:t}}function Ji(t,e){if(t.type==="assistant"){let r=t.message,n=r&&Array.isArray(r.content)?r.content:[],s=[];for(let o of n)if(ft(o)){if(o.type==="text"&&typeof o.text=="string")s.push(Fs(o.text));else if(o.type==="tool_use"){let i=Qi(o);typeof o.id=="string"&&e.set(o.id,i),s.push(i)}}return s}if(t.type==="user"){let r=t.message,n=r&&Array.isArray(r.content)?r.content:[];for(let s of n)if(ft(s)&&s.type==="tool_result"){let o=e.get(String(s.tool_use_id));if(o){let i=Xi(s.content);o.result=i,o.output=typeof s.content=="string"?s.content:i}}return[]}if(t.type==="result"){let r=t.is_error===!1&&t.subtype==="success";return[{kind:"result",success:r,text:typeof t.result=="string"?t.result:r?"DONE":""}]}return[]}function ea(t){if(t.type==="item.completed"&&ft(t.item)){let e=t.item;return e.type==="agent_message"&&typeof e.text=="string"?[Fs(e.text)]:e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}if(t.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(t.type==="turn.failed"){let e=t.error;return[{kind:"error",text:e&&typeof e.message=="string"?e.message:"turn failed"}]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:[]}function ta(t){let e=t.type;return typeof e=="string"&&(e==="error"||e.startsWith("thread.")||e.startsWith("turn.")||e.startsWith("item."))}function Bs(t){let e=[],r=new Map,n=Array.isArray(t)?t:[];for(let s of n){let o=s;if(typeof s=="string"){let l=s.trim();if(l.length===0)continue;try{o=JSON.parse(l)}catch{continue}}if(!ft(o))continue;let i=ta(o)?ea(o):Ji(o,r);for(let l of i)e.push(l)}return e}function Tr(t,e={}){let{transport:r,sessionLogStore:n,onClose:s}=e,o=null,i={},l=!0,a=new Set,u=null;function h(){if(!o||!n)return[];let S=n.get(o);return Bs(S?S.lines:[])}function b(S,m){if(m.kind==="gate")return p`<div class="sv__gate">${m.text}</div>`;if(m.kind==="phase")return p`<div class="sv__phase">${m.text}</div>`;if(m.kind==="result")return p`<div
        class="sv__result${m.success?" sv__result--ok":" sv__result--fail"}"
      >
        ${m.success?"\u2713":"\u2717"}
        ${m.text||(m.success?"DONE":"\uC2E4\uD328")}
      </div>`;if(m.kind==="error")return p`<div class="sv__error">⛔ ${m.text}</div>`;if(m.kind==="blocker")return p`<div class="sv__error">⛔ ${m.text}</div>`;if(m.kind==="tool"){let D=a.has(S),P=m.tool==="Bash"?m.command:m.path||m.command||"";return p`<div
        class="sv__tool${D?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>F(S)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${m.icon}</span>
          <span class="sv__tool-name">${m.tool}</span>
          ${P?p`<span class="sv__tool-detail">${P}</span>`:""}
          ${typeof m.added=="number"?p`<span class="sv__diff-add">+${m.added}</span>`:""}
          ${typeof m.removed=="number"?p`<span class="sv__diff-del">−${m.removed}</span>`:""}
          ${m.result?p`<span class="sv__tool-ok">→ ${m.result}</span>`:""}
        </span>
        ${D?p`<pre class="sv__tool-expand">${k(m)}</pre>`:""}
      </div>`}return p`<div class="sv__as">${m.text}</div>`}function k(S){let m=[];if(S.input!==void 0)try{m.push(`input: ${JSON.stringify(S.input,null,2)}`)}catch{}return typeof S.output=="string"&&S.output.length>0&&m.push(`output:
${S.output}`),m.join(`

`)}function x(){if(!o)return p``;let S=h(),m=[i.runner,i.model,i.effort].filter(Boolean).join(" \xB7 "),D=i.session_id||"",P=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${l?"ON":"OFF"}`;return p`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id">${o}</span>
        ${D?p`<button
              type="button"
              class="sv__session"
              title=${D}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${D}`}
              @click=${()=>q(D)}
            >
              ⧉ ${D.slice(0,8)}
            </button>`:""}
        ${m?p`<span class="sv__meta">${m}</span>`:""}
        ${i.worktree?p`<span class="sv__wt" title=${i.worktree}
              >${i.worktree}</span
            >`:""}
        <button
          type="button"
          class="sv__follow${l?" sv__follow--on":""}"
          aria-pressed=${l?"true":"false"}
          aria-label=${P}
          @click=${B}
        >
          <span class="sv__follow-full">⇣ ${P}</span>
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
        ${S.length===0?p`<div class="sv__empty">세션 로그 없음</div>`:S.map((z,j)=>b(j,z))}
      </div>
    </div>`}function $(){ie(x(),t),l&&I()}function I(){let S=t.querySelector(".sv__body");S&&(S.scrollTop=S.scrollHeight)}function F(S){a.has(S)?a.delete(S):a.add(S),$()}function B(){l=!l,$()}function q(S){qt(S).then(m=>{m?K("\uBCF5\uC0AC\uB428","success",1200):K("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function H(S){!o||!S||(i={...i,...S},$())}function N(S){let m=S.target;if(!m||!m.classList||!m.classList.contains("sv__body"))return;!(m.scrollHeight-m.scrollTop-m.clientHeight<=4)&&l&&(l=!1,$())}t.addEventListener("scroll",N,!0);function E(S){let m=S&&S.attempt_id;m&&(o=m,i=S.meta||{},l=!0,a.clear(),!u&&n&&(u=n.subscribe($)),r&&Promise.resolve(r("subscribe-session-log",{id:`session-log:${o}`,attempt_id:o})).catch(()=>{}),$())}function C(){let S=o;o=null,a.clear(),r&&S&&Promise.resolve(r("unsubscribe-session-log",{id:`session-log:${S}`})).catch(()=>{}),ie(p``,t),s&&s()}return{open:E,updateMeta:H,close:C,isOpen(){return o!==null},destroy(){u&&(u(),u=null),t.removeEventListener("scroll",N,!0),o=null,ie(p``,t)}}}function ra(t){let e=t&&t.metadata||{},r=[];return typeof e.spec_id=="string"&&e.spec_id.trim().length>0&&r.push({kind:"spec",path:e.spec_id.trim()}),typeof e.plan_path=="string"&&e.plan_path.trim().length>0&&r.push({kind:"plan",path:e.plan_path.trim()}),r}function qs(t,e){let r=ra(t);return p`
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
  `}var un=["opus","sonnet","haiku","fable"],pn=["low","medium","high","xhigh"],fn=["codex","opus","fable","self","skip"],hn=["opus","fable","sonnet","haiku"],na=["standard","fast_track"],gn={orchestration_model:"(\uAE30\uBCF8: opus)",orchestration_effort:"(\uAE30\uBCF8: CLI \uAE30\uBCF8)",review_model:"(\uAE30\uBCF8: codex)",impl_model:"(\uAE30\uBCF8: \uD2F0\uC5B4 \uC790\uB3D9)"};function Ar(t,e){let r=e&&e[t];return typeof r=="string"&&r.length>0?`(\uAE30\uBCF8: ${r} \u2014 \uC804\uC5ED)`:gn[t]||"(\uAE30\uBCF8)"}function er(t,e,r,n,s,o){return p`
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
  `}function tr(t,e){let r=t.map(n=>({value:n,label:n}));return typeof e=="string"?[{value:"",label:e},...r]:r}function Us(t,e,r){let n=t&&t.metadata||{},s=r&&typeof r=="object"?r:{},o=n.workflow_mode==="fast_track"?"fast_track":"standard";return p`
    <div class="detail-section-label">실행 설정 (수정 가능)</div>
    ${er("orchestration_model","orchestration_model",tr(un,Ar("orchestration_model",s)),n.orchestration_model||"",!1,e)}
    ${er("orchestration_effort","orchestration_effort",tr(pn,Ar("orchestration_effort",s)),n.orchestration_effort||"",!1,e)}
    ${er("review_model","review_model",tr(fn,Ar("review_model",s)),n.review_model||"",!1,e)}
    ${er("impl_model","impl_model",tr(hn,Ar("impl_model",s)),n.impl_model||"",!1,e)}
    ${er("workflow_mode","workflow_mode",tr(na),o,n.workflow_mode==="fast_track",e)}
  `}var{entries:Zs,setPrototypeOf:zs,isFrozen:sa,getPrototypeOf:oa,getOwnPropertyDescriptor:ia}=Object,{freeze:Be,seal:tt,create:vn}=Object,{apply:$n,construct:xn}=typeof Reflect<"u"&&Reflect;Be||(Be=function(e){return e});tt||(tt=function(e){return e});$n||($n=function(e,r){for(var n=arguments.length,s=new Array(n>2?n-2:0),o=2;o<n;o++)s[o-2]=arguments[o];return e.apply(r,s)});xn||(xn=function(e){for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return new e(...n)});var Er=qe(Array.prototype.forEach),aa=qe(Array.prototype.lastIndexOf),Hs=qe(Array.prototype.pop),rr=qe(Array.prototype.push),la=qe(Array.prototype.splice),Rr=qe(String.prototype.toLowerCase),mn=qe(String.prototype.toString),_n=qe(String.prototype.match),nr=qe(String.prototype.replace),ca=qe(String.prototype.indexOf),da=qe(String.prototype.trim),nt=qe(Object.prototype.hasOwnProperty),Fe=qe(RegExp.prototype.test),sr=ua(TypeError);function qe(t){return function(e){e instanceof RegExp&&(e.lastIndex=0);for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return $n(t,e,n)}}function ua(t){return function(){for(var e=arguments.length,r=new Array(e),n=0;n<e;n++)r[n]=arguments[n];return xn(t,r)}}function J(t,e){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Rr;zs&&zs(t,null);let n=e.length;for(;n--;){let s=e[n];if(typeof s=="string"){let o=r(s);o!==s&&(sa(e)||(e[n]=o),s=o)}t[s]=!0}return t}function pa(t){for(let e=0;e<t.length;e++)nt(t,e)||(t[e]=null);return t}function ct(t){let e=vn(null);for(let[r,n]of Zs(t))nt(t,r)&&(Array.isArray(n)?e[r]=pa(n):n&&typeof n=="object"&&n.constructor===Object?e[r]=ct(n):e[r]=n);return e}function or(t,e){for(;t!==null;){let n=ia(t,e);if(n){if(n.get)return qe(n.get);if(typeof n.value=="function")return qe(n.value)}t=oa(t)}function r(){return null}return r}var Ws=Be(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),bn=Be(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),wn=Be(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),fa=Be(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),kn=Be(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),ha=Be(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Gs=Be(["#text"]),js=Be(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),yn=Be(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Ys=Be(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Cr=Be(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),ga=tt(/\{\{[\w\W]*|[\w\W]*\}\}/gm),ma=tt(/<%[\w\W]*|[\w\W]*%>/gm),_a=tt(/\$\{[\w\W]*/gm),ba=tt(/^data-[\-\w.\u00B7-\uFFFF]+$/),wa=tt(/^aria-[\-\w]+$/),Xs=tt(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),ka=tt(/^(?:\w+script|data):/i),ya=tt(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Qs=tt(/^html$/i),va=tt(/^[a-z][.\w]*(-[.\w]+)+$/i),Vs=Object.freeze({__proto__:null,ARIA_ATTR:wa,ATTR_WHITESPACE:ya,CUSTOM_ELEMENT:va,DATA_ATTR:ba,DOCTYPE_NAME:Qs,ERB_EXPR:ma,IS_ALLOWED_URI:Xs,IS_SCRIPT_OR_DATA:ka,MUSTACHE_EXPR:ga,TMPLIT_EXPR:_a}),ir={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},$a=function(){return typeof window>"u"?null:window},xa=function(e,r){if(typeof e!="object"||typeof e.createPolicy!="function")return null;let n=null,s="data-tt-policy-suffix";r&&r.hasAttribute(s)&&(n=r.getAttribute(s));let o="dompurify"+(n?"#"+n:"");try{return e.createPolicy(o,{createHTML(i){return i},createScriptURL(i){return i}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},Ks=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Js(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:$a(),e=G=>Js(G);if(e.version="3.3.0",e.removed=[],!t||!t.document||t.document.nodeType!==ir.document||!t.Element)return e.isSupported=!1,e;let{document:r}=t,n=r,s=n.currentScript,{DocumentFragment:o,HTMLTemplateElement:i,Node:l,Element:a,NodeFilter:u,NamedNodeMap:h=t.NamedNodeMap||t.MozNamedAttrMap,HTMLFormElement:b,DOMParser:k,trustedTypes:x}=t,$=a.prototype,I=or($,"cloneNode"),F=or($,"remove"),B=or($,"nextSibling"),q=or($,"childNodes"),H=or($,"parentNode");if(typeof i=="function"){let G=r.createElement("template");G.content&&G.content.ownerDocument&&(r=G.content.ownerDocument)}let N,E="",{implementation:C,createNodeIterator:S,createDocumentFragment:m,getElementsByTagName:D}=r,{importNode:P}=n,z=Ks();e.isSupported=typeof Zs=="function"&&typeof H=="function"&&C&&C.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:j,ERB_EXPR:ee,TMPLIT_EXPR:re,DATA_ATTR:ve,ARIA_ATTR:je,IS_SCRIPT_OR_DATA:ze,ATTR_WHITESPACE:_e,CUSTOM_ELEMENT:$e}=Vs,{IS_ALLOWED_URI:Ye}=Vs,ae=null,it=J({},[...Ws,...bn,...wn,...kn,...Gs]),de=null,Ve=J({},[...js,...yn,...Ys,...Cr]),se=Object.seal(vn(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Me=null,Xe=null,Se=Object.seal(vn(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),Ee=!0,be=!0,Ne=!1,Ke=!0,Ce=!1,le=!0,Re=!1,He=!1,fe=!1,Te=!1,Pe=!1,Oe=!1,Ze=!0,Qe=!1,pe="user-content-",Le=!0,Ae=!1,Ie={},L=null,O=J({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),d=null,f=J({},["audio","video","img","source","image","track"]),y=null,g=J({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),A="http://www.w3.org/1998/Math/MathML",T="http://www.w3.org/2000/svg",R="http://www.w3.org/1999/xhtml",Y=R,Q=!1,U=null,he=J({},[A,T,R],mn),X=J({},["mi","mo","mn","ms","mtext"]),ge=J({},["annotation-xml"]),Ct=J({},["title","style","font","a","script"]),Je=null,mt=["application/xhtml+xml","text/html"],_t="text/html",_=null,w=null,V=r.createElement("form"),W=function(c){return c instanceof RegExp||c instanceof Function},Z=function(){let c=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(w&&w===c)){if((!c||typeof c!="object")&&(c={}),c=ct(c),Je=mt.indexOf(c.PARSER_MEDIA_TYPE)===-1?_t:c.PARSER_MEDIA_TYPE,_=Je==="application/xhtml+xml"?mn:Rr,ae=nt(c,"ALLOWED_TAGS")?J({},c.ALLOWED_TAGS,_):it,de=nt(c,"ALLOWED_ATTR")?J({},c.ALLOWED_ATTR,_):Ve,U=nt(c,"ALLOWED_NAMESPACES")?J({},c.ALLOWED_NAMESPACES,mn):he,y=nt(c,"ADD_URI_SAFE_ATTR")?J(ct(g),c.ADD_URI_SAFE_ATTR,_):g,d=nt(c,"ADD_DATA_URI_TAGS")?J(ct(f),c.ADD_DATA_URI_TAGS,_):f,L=nt(c,"FORBID_CONTENTS")?J({},c.FORBID_CONTENTS,_):O,Me=nt(c,"FORBID_TAGS")?J({},c.FORBID_TAGS,_):ct({}),Xe=nt(c,"FORBID_ATTR")?J({},c.FORBID_ATTR,_):ct({}),Ie=nt(c,"USE_PROFILES")?c.USE_PROFILES:!1,Ee=c.ALLOW_ARIA_ATTR!==!1,be=c.ALLOW_DATA_ATTR!==!1,Ne=c.ALLOW_UNKNOWN_PROTOCOLS||!1,Ke=c.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Ce=c.SAFE_FOR_TEMPLATES||!1,le=c.SAFE_FOR_XML!==!1,Re=c.WHOLE_DOCUMENT||!1,Te=c.RETURN_DOM||!1,Pe=c.RETURN_DOM_FRAGMENT||!1,Oe=c.RETURN_TRUSTED_TYPE||!1,fe=c.FORCE_BODY||!1,Ze=c.SANITIZE_DOM!==!1,Qe=c.SANITIZE_NAMED_PROPS||!1,Le=c.KEEP_CONTENT!==!1,Ae=c.IN_PLACE||!1,Ye=c.ALLOWED_URI_REGEXP||Xs,Y=c.NAMESPACE||R,X=c.MATHML_TEXT_INTEGRATION_POINTS||X,ge=c.HTML_INTEGRATION_POINTS||ge,se=c.CUSTOM_ELEMENT_HANDLING||{},c.CUSTOM_ELEMENT_HANDLING&&W(c.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(se.tagNameCheck=c.CUSTOM_ELEMENT_HANDLING.tagNameCheck),c.CUSTOM_ELEMENT_HANDLING&&W(c.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(se.attributeNameCheck=c.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),c.CUSTOM_ELEMENT_HANDLING&&typeof c.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(se.allowCustomizedBuiltInElements=c.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Ce&&(be=!1),Pe&&(Te=!0),Ie&&(ae=J({},Gs),de=[],Ie.html===!0&&(J(ae,Ws),J(de,js)),Ie.svg===!0&&(J(ae,bn),J(de,yn),J(de,Cr)),Ie.svgFilters===!0&&(J(ae,wn),J(de,yn),J(de,Cr)),Ie.mathMl===!0&&(J(ae,kn),J(de,Ys),J(de,Cr))),c.ADD_TAGS&&(typeof c.ADD_TAGS=="function"?Se.tagCheck=c.ADD_TAGS:(ae===it&&(ae=ct(ae)),J(ae,c.ADD_TAGS,_))),c.ADD_ATTR&&(typeof c.ADD_ATTR=="function"?Se.attributeCheck=c.ADD_ATTR:(de===Ve&&(de=ct(de)),J(de,c.ADD_ATTR,_))),c.ADD_URI_SAFE_ATTR&&J(y,c.ADD_URI_SAFE_ATTR,_),c.FORBID_CONTENTS&&(L===O&&(L=ct(L)),J(L,c.FORBID_CONTENTS,_)),Le&&(ae["#text"]=!0),Re&&J(ae,["html","head","body"]),ae.table&&(J(ae,["tbody"]),delete Me.tbody),c.TRUSTED_TYPES_POLICY){if(typeof c.TRUSTED_TYPES_POLICY.createHTML!="function")throw sr('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof c.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw sr('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');N=c.TRUSTED_TYPES_POLICY,E=N.createHTML("")}else N===void 0&&(N=xa(x,s)),N!==null&&typeof E=="string"&&(E=N.createHTML(""));Be&&Be(c),w=c}},ue=J({},[...bn,...wn,...fa]),bt=J({},[...kn,...ha]),Rt=function(c){let v=H(c);(!v||!v.tagName)&&(v={namespaceURI:Y,tagName:"template"});let M=Rr(c.tagName),te=Rr(v.tagName);return U[c.namespaceURI]?c.namespaceURI===T?v.namespaceURI===R?M==="svg":v.namespaceURI===A?M==="svg"&&(te==="annotation-xml"||X[te]):!!ue[M]:c.namespaceURI===A?v.namespaceURI===R?M==="math":v.namespaceURI===T?M==="math"&&ge[te]:!!bt[M]:c.namespaceURI===R?v.namespaceURI===T&&!ge[te]||v.namespaceURI===A&&!X[te]?!1:!bt[M]&&(Ct[M]||!ue[M]):!!(Je==="application/xhtml+xml"&&U[c.namespaceURI]):!1},we=function(c){rr(e.removed,{element:c});try{H(c).removeChild(c)}catch{F(c)}},at=function(c,v){try{rr(e.removed,{attribute:v.getAttributeNode(c),from:v})}catch{rr(e.removed,{attribute:null,from:v})}if(v.removeAttribute(c),c==="is")if(Te||Pe)try{we(v)}catch{}else try{v.setAttribute(c,"")}catch{}},hr=function(c){let v=null,M=null;if(fe)c="<remove></remove>"+c;else{let ye=_n(c,/^[\r\n\t ]+/);M=ye&&ye[0]}Je==="application/xhtml+xml"&&Y===R&&(c='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+c+"</body></html>");let te=N?N.createHTML(c):c;if(Y===R)try{v=new k().parseFromString(te,Je)}catch{}if(!v||!v.documentElement){v=C.createDocument(Y,"template",null);try{v.documentElement.innerHTML=Q?E:te}catch{}}let xe=v.body||v.documentElement;return c&&M&&xe.insertBefore(r.createTextNode(M),xe.childNodes[0]||null),Y===R?D.call(v,Re?"html":"body")[0]:Re?v.documentElement:xe},zr=function(c){return S.call(c.ownerDocument||c,c,u.SHOW_ELEMENT|u.SHOW_COMMENT|u.SHOW_TEXT|u.SHOW_PROCESSING_INSTRUCTION|u.SHOW_CDATA_SECTION,null)},Lt=function(c){return c instanceof b&&(typeof c.nodeName!="string"||typeof c.textContent!="string"||typeof c.removeChild!="function"||!(c.attributes instanceof h)||typeof c.removeAttribute!="function"||typeof c.setAttribute!="function"||typeof c.namespaceURI!="string"||typeof c.insertBefore!="function"||typeof c.hasChildNodes!="function")},Ht=function(c){return typeof l=="function"&&c instanceof l};function et(G,c,v){Er(G,M=>{M.call(e,c,v,w)})}let gr=function(c){let v=null;if(et(z.beforeSanitizeElements,c,null),Lt(c))return we(c),!0;let M=_(c.nodeName);if(et(z.uponSanitizeElement,c,{tagName:M,allowedTags:ae}),le&&c.hasChildNodes()&&!Ht(c.firstElementChild)&&Fe(/<[/\w!]/g,c.innerHTML)&&Fe(/<[/\w!]/g,c.textContent)||c.nodeType===ir.progressingInstruction||le&&c.nodeType===ir.comment&&Fe(/<[/\w]/g,c.data))return we(c),!0;if(!(Se.tagCheck instanceof Function&&Se.tagCheck(M))&&(!ae[M]||Me[M])){if(!Me[M]&&Gt(M)&&(se.tagNameCheck instanceof RegExp&&Fe(se.tagNameCheck,M)||se.tagNameCheck instanceof Function&&se.tagNameCheck(M)))return!1;if(Le&&!L[M]){let te=H(c)||c.parentNode,xe=q(c)||c.childNodes;if(xe&&te){let ye=xe.length;for(let We=ye-1;We>=0;--We){let lt=I(xe[We],!0);lt.__removalCount=(c.__removalCount||0)+1,te.insertBefore(lt,B(c))}}}return we(c),!0}return c instanceof a&&!Rt(c)||(M==="noscript"||M==="noembed"||M==="noframes")&&Fe(/<\/no(script|embed|frames)/i,c.innerHTML)?(we(c),!0):(Ce&&c.nodeType===ir.text&&(v=c.textContent,Er([j,ee,re],te=>{v=nr(v,te," ")}),c.textContent!==v&&(rr(e.removed,{element:c.cloneNode()}),c.textContent=v)),et(z.afterSanitizeElements,c,null),!1)},Wt=function(c,v,M){if(Ze&&(v==="id"||v==="name")&&(M in r||M in V))return!1;if(!(be&&!Xe[v]&&Fe(ve,v))){if(!(Ee&&Fe(je,v))){if(!(Se.attributeCheck instanceof Function&&Se.attributeCheck(v,c))){if(!de[v]||Xe[v]){if(!(Gt(c)&&(se.tagNameCheck instanceof RegExp&&Fe(se.tagNameCheck,c)||se.tagNameCheck instanceof Function&&se.tagNameCheck(c))&&(se.attributeNameCheck instanceof RegExp&&Fe(se.attributeNameCheck,v)||se.attributeNameCheck instanceof Function&&se.attributeNameCheck(v,c))||v==="is"&&se.allowCustomizedBuiltInElements&&(se.tagNameCheck instanceof RegExp&&Fe(se.tagNameCheck,M)||se.tagNameCheck instanceof Function&&se.tagNameCheck(M))))return!1}else if(!y[v]){if(!Fe(Ye,nr(M,_e,""))){if(!((v==="src"||v==="xlink:href"||v==="href")&&c!=="script"&&ca(M,"data:")===0&&d[c])){if(!(Ne&&!Fe(ze,nr(M,_e,"")))){if(M)return!1}}}}}}}return!0},Gt=function(c){return c!=="annotation-xml"&&_n(c,$e)},jt=function(c){et(z.beforeSanitizeAttributes,c,null);let{attributes:v}=c;if(!v||Lt(c))return;let M={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:de,forceKeepAttr:void 0},te=v.length;for(;te--;){let xe=v[te],{name:ye,namespaceURI:We,value:lt}=xe,It=_(ye),Hr=lt,De=ye==="value"?Hr:da(Hr);if(M.attrName=It,M.attrValue=De,M.keepAttr=!0,M.forceKeepAttr=void 0,et(z.uponSanitizeAttribute,c,M),De=M.attrValue,Qe&&(It==="id"||It==="name")&&(at(ye,c),De=pe+De),le&&Fe(/((--!?|])>)|<\/(style|title|textarea)/i,De)){at(ye,c);continue}if(It==="attributename"&&_n(De,"href")){at(ye,c);continue}if(M.forceKeepAttr)continue;if(!M.keepAttr){at(ye,c);continue}if(!Ke&&Fe(/\/>/i,De)){at(ye,c);continue}Ce&&Er([j,ee,re],Vn=>{De=nr(De,Vn," ")});let Yn=_(c.nodeName);if(!Wt(Yn,It,De)){at(ye,c);continue}if(N&&typeof x=="object"&&typeof x.getAttributeType=="function"&&!We)switch(x.getAttributeType(Yn,It)){case"TrustedHTML":{De=N.createHTML(De);break}case"TrustedScriptURL":{De=N.createScriptURL(De);break}}if(De!==Hr)try{We?c.setAttributeNS(We,ye,De):c.setAttribute(ye,De),Lt(c)?we(c):Hs(e.removed)}catch{at(ye,c)}}et(z.afterSanitizeAttributes,c,null)},Yt=function G(c){let v=null,M=zr(c);for(et(z.beforeSanitizeShadowDOM,c,null);v=M.nextNode();)et(z.uponSanitizeShadowNode,v,null),gr(v),jt(v),v.content instanceof o&&G(v.content);et(z.afterSanitizeShadowDOM,c,null)};return e.sanitize=function(G){let c=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},v=null,M=null,te=null,xe=null;if(Q=!G,Q&&(G="<!-->"),typeof G!="string"&&!Ht(G))if(typeof G.toString=="function"){if(G=G.toString(),typeof G!="string")throw sr("dirty is not a string, aborting")}else throw sr("toString is not a function");if(!e.isSupported)return G;if(He||Z(c),e.removed=[],typeof G=="string"&&(Ae=!1),Ae){if(G.nodeName){let lt=_(G.nodeName);if(!ae[lt]||Me[lt])throw sr("root node is forbidden and cannot be sanitized in-place")}}else if(G instanceof l)v=hr("<!---->"),M=v.ownerDocument.importNode(G,!0),M.nodeType===ir.element&&M.nodeName==="BODY"||M.nodeName==="HTML"?v=M:v.appendChild(M);else{if(!Te&&!Ce&&!Re&&G.indexOf("<")===-1)return N&&Oe?N.createHTML(G):G;if(v=hr(G),!v)return Te?null:Oe?E:""}v&&fe&&we(v.firstChild);let ye=zr(Ae?G:v);for(;te=ye.nextNode();)gr(te),jt(te),te.content instanceof o&&Yt(te.content);if(Ae)return G;if(Te){if(Pe)for(xe=m.call(v.ownerDocument);v.firstChild;)xe.appendChild(v.firstChild);else xe=v;return(de.shadowroot||de.shadowrootmode)&&(xe=P.call(n,xe,!0)),xe}let We=Re?v.outerHTML:v.innerHTML;return Re&&ae["!doctype"]&&v.ownerDocument&&v.ownerDocument.doctype&&v.ownerDocument.doctype.name&&Fe(Qs,v.ownerDocument.doctype.name)&&(We="<!DOCTYPE "+v.ownerDocument.doctype.name+`>
`+We),Ce&&Er([j,ee,re],lt=>{We=nr(We,lt," ")}),N&&Oe?N.createHTML(We):We},e.setConfig=function(){let G=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};Z(G),He=!0},e.clearConfig=function(){w=null,He=!1},e.isValidAttribute=function(G,c,v){w||Z({});let M=_(G),te=_(c);return Wt(M,te,v)},e.addHook=function(G,c){typeof c=="function"&&rr(z[G],c)},e.removeHook=function(G,c){if(c!==void 0){let v=aa(z[G],c);return v===-1?void 0:la(z[G],v,1)[0]}return Hs(z[G])},e.removeHooks=function(G){z[G]=[]},e.removeAllHooks=function(){z=Ks()},e}var eo=Js();var to={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},ro=t=>(...e)=>({_$litDirective$:t,values:e}),Lr=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,r,n){this._$Ct=e,this._$AM=r,this._$Ci=n}_$AS(e,r){return this.update(e,r)}update(e,r){return this.render(...r)}};var ar=class extends Lr{constructor(e){if(super(e),this.it=ke,e.type!==to.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===ke||e==null)return this._t=void 0,this.it=e;if(e===vt)return e;if(typeof e!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;let r=[e];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}};ar.directiveName="unsafeHTML",ar.resultType=1;var no=ro(ar);function En(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Et=En();function uo(t){Et=t}var ur={exec:()=>null};function ne(t,e=""){let r=typeof t=="string"?t:t.source,n={replace:(s,o)=>{let i=typeof o=="string"?o:o.source;return i=i.replace(Ue.caret,"$1"),r=r.replace(s,i),n},getRegex:()=>new RegExp(r,e)};return n}var Sa=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),Ue={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:t=>new RegExp(`^( {0,3}${t})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}#`),htmlBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}<(?:[a-z].*>|!--)`,"i")},Ta=/^(?:[ \t]*(?:\n|$))+/,Aa=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Ea=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,pr=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Ca=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Cn=/(?:[*+-]|\d{1,9}[.)])/,po=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,fo=ne(po).replace(/bull/g,Cn).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Ra=ne(po).replace(/bull/g,Cn).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Rn=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,La=/^[^\n]+/,Ln=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,Ia=ne(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Ln).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Da=ne(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Cn).getRegex(),Pr="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",In=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Oa=ne("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",In).replace("tag",Pr).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),ho=ne(Rn).replace("hr",pr).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Pr).getRegex(),Ma=ne(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",ho).getRegex(),Dn={blockquote:Ma,code:Aa,def:Ia,fences:Ea,heading:Ca,hr:pr,html:Oa,lheading:fo,list:Da,newline:Ta,paragraph:ho,table:ur,text:La},so=ne("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",pr).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Pr).getRegex(),Na={...Dn,lheading:Ra,table:so,paragraph:ne(Rn).replace("hr",pr).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",so).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Pr).getRegex()},Pa={...Dn,html:ne(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",In).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:ur,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:ne(Rn).replace("hr",pr).replace("heading",` *#{1,6} *[^
]`).replace("lheading",fo).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Fa=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Ba=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,go=/^( {2,}|\\)\n(?!\s*$)/,qa=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Fr=/[\p{P}\p{S}]/u,On=/[\s\p{P}\p{S}]/u,mo=/[^\s\p{P}\p{S}]/u,Ua=ne(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,On).getRegex(),_o=/(?!~)[\p{P}\p{S}]/u,za=/(?!~)[\s\p{P}\p{S}]/u,Ha=/(?:[^\s\p{P}\p{S}]|~)/u,Wa=ne(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",Sa?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),bo=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,Ga=ne(bo,"u").replace(/punct/g,Fr).getRegex(),ja=ne(bo,"u").replace(/punct/g,_o).getRegex(),wo="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Ya=ne(wo,"gu").replace(/notPunctSpace/g,mo).replace(/punctSpace/g,On).replace(/punct/g,Fr).getRegex(),Va=ne(wo,"gu").replace(/notPunctSpace/g,Ha).replace(/punctSpace/g,za).replace(/punct/g,_o).getRegex(),Ka=ne("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,mo).replace(/punctSpace/g,On).replace(/punct/g,Fr).getRegex(),Za=ne(/\\(punct)/,"gu").replace(/punct/g,Fr).getRegex(),Xa=ne(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Qa=ne(In).replace("(?:-->|$)","-->").getRegex(),Ja=ne("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Qa).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Or=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,el=ne(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Or).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),ko=ne(/^!?\[(label)\]\[(ref)\]/).replace("label",Or).replace("ref",Ln).getRegex(),yo=ne(/^!?\[(ref)\](?:\[\])?/).replace("ref",Ln).getRegex(),tl=ne("reflink|nolink(?!\\()","g").replace("reflink",ko).replace("nolink",yo).getRegex(),oo=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,Mn={_backpedal:ur,anyPunctuation:Za,autolink:Xa,blockSkip:Wa,br:go,code:Ba,del:ur,emStrongLDelim:Ga,emStrongRDelimAst:Ya,emStrongRDelimUnd:Ka,escape:Fa,link:el,nolink:yo,punctuation:Ua,reflink:ko,reflinkSearch:tl,tag:Ja,text:qa,url:ur},rl={...Mn,link:ne(/^!?\[(label)\]\((.*?)\)/).replace("label",Or).getRegex(),reflink:ne(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Or).getRegex()},Sn={...Mn,emStrongRDelimAst:Va,emStrongLDelim:ja,url:ne(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",oo).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:ne(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",oo).getRegex()},nl={...Sn,br:ne(go).replace("{2,}","*").getRegex(),text:ne(Sn.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Ir={normal:Dn,gfm:Na,pedantic:Pa},lr={normal:Mn,gfm:Sn,breaks:nl,pedantic:rl},sl={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},io=t=>sl[t];function dt(t,e){if(e){if(Ue.escapeTest.test(t))return t.replace(Ue.escapeReplace,io)}else if(Ue.escapeTestNoEncode.test(t))return t.replace(Ue.escapeReplaceNoEncode,io);return t}function ao(t){try{t=encodeURI(t).replace(Ue.percentDecode,"%")}catch{return null}return t}function lo(t,e){let r=t.replace(Ue.findPipe,(o,i,l)=>{let a=!1,u=i;for(;--u>=0&&l[u]==="\\";)a=!a;return a?"|":" |"}),n=r.split(Ue.splitPipe),s=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),e)if(n.length>e)n.splice(e);else for(;n.length<e;)n.push("");for(;s<n.length;s++)n[s]=n[s].trim().replace(Ue.slashPipe,"|");return n}function cr(t,e,r){let n=t.length;if(n===0)return"";let s=0;for(;s<n;){let o=t.charAt(n-s-1);if(o===e&&!r)s++;else if(o!==e&&r)s++;else break}return t.slice(0,n-s)}function ol(t,e){if(t.indexOf(e[1])===-1)return-1;let r=0;for(let n=0;n<t.length;n++)if(t[n]==="\\")n++;else if(t[n]===e[0])r++;else if(t[n]===e[1]&&(r--,r<0))return n;return r>0?-2:-1}function co(t,e,r,n,s){let o=e.href,i=e.title||null,l=t[1].replace(s.other.outputLinkReplace,"$1");n.state.inLink=!0;let a={type:t[0].charAt(0)==="!"?"image":"link",raw:r,href:o,title:i,text:l,tokens:n.inlineTokens(l)};return n.state.inLink=!1,a}function il(t,e,r){let n=t.match(r.other.indentCodeCompensation);if(n===null)return e;let s=n[1];return e.split(`
`).map(o=>{let i=o.match(r.other.beginningSpace);if(i===null)return o;let[l]=i;return l.length>=s.length?o.slice(s.length):o}).join(`
`)}var Mr=class{constructor(t){ce(this,"options");ce(this,"rules");ce(this,"lexer");this.options=t||Et}space(t){let e=this.rules.block.newline.exec(t);if(e&&e[0].length>0)return{type:"space",raw:e[0]}}code(t){let e=this.rules.block.code.exec(t);if(e){let r=e[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:e[0],codeBlockStyle:"indented",text:this.options.pedantic?r:cr(r,`
`)}}}fences(t){let e=this.rules.block.fences.exec(t);if(e){let r=e[0],n=il(r,e[3]||"",this.rules);return{type:"code",raw:r,lang:e[2]?e[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):e[2],text:n}}}heading(t){let e=this.rules.block.heading.exec(t);if(e){let r=e[2].trim();if(this.rules.other.endingHash.test(r)){let n=cr(r,"#");(this.options.pedantic||!n||this.rules.other.endingSpaceChar.test(n))&&(r=n.trim())}return{type:"heading",raw:e[0],depth:e[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(t){let e=this.rules.block.hr.exec(t);if(e)return{type:"hr",raw:cr(e[0],`
`)}}blockquote(t){let e=this.rules.block.blockquote.exec(t);if(e){let r=cr(e[0],`
`).split(`
`),n="",s="",o=[];for(;r.length>0;){let i=!1,l=[],a;for(a=0;a<r.length;a++)if(this.rules.other.blockquoteStart.test(r[a]))l.push(r[a]),i=!0;else if(!i)l.push(r[a]);else break;r=r.slice(a);let u=l.join(`
`),h=u.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");n=n?`${n}
${u}`:u,s=s?`${s}
${h}`:h;let b=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(h,o,!0),this.lexer.state.top=b,r.length===0)break;let k=o.at(-1);if(k?.type==="code")break;if(k?.type==="blockquote"){let x=k,$=x.raw+`
`+r.join(`
`),I=this.blockquote($);o[o.length-1]=I,n=n.substring(0,n.length-x.raw.length)+I.raw,s=s.substring(0,s.length-x.text.length)+I.text;break}else if(k?.type==="list"){let x=k,$=x.raw+`
`+r.join(`
`),I=this.list($);o[o.length-1]=I,n=n.substring(0,n.length-k.raw.length)+I.raw,s=s.substring(0,s.length-x.raw.length)+I.raw,r=$.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:n,tokens:o,text:s}}}list(t){let e=this.rules.block.list.exec(t);if(e){let r=e[1].trim(),n=r.length>1,s={type:"list",raw:"",ordered:n,start:n?+r.slice(0,-1):"",loose:!1,items:[]};r=n?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=n?r:"[*+-]");let o=this.rules.other.listItemRegex(r),i=!1;for(;t;){let a=!1,u="",h="";if(!(e=o.exec(t))||this.rules.block.hr.test(t))break;u=e[0],t=t.substring(u.length);let b=e[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,I=>" ".repeat(3*I.length)),k=t.split(`
`,1)[0],x=!b.trim(),$=0;if(this.options.pedantic?($=2,h=b.trimStart()):x?$=e[1].length+1:($=e[2].search(this.rules.other.nonSpaceChar),$=$>4?1:$,h=b.slice($),$+=e[1].length),x&&this.rules.other.blankLine.test(k)&&(u+=k+`
`,t=t.substring(k.length+1),a=!0),!a){let I=this.rules.other.nextBulletRegex($),F=this.rules.other.hrRegex($),B=this.rules.other.fencesBeginRegex($),q=this.rules.other.headingBeginRegex($),H=this.rules.other.htmlBeginRegex($);for(;t;){let N=t.split(`
`,1)[0],E;if(k=N,this.options.pedantic?(k=k.replace(this.rules.other.listReplaceNesting,"  "),E=k):E=k.replace(this.rules.other.tabCharGlobal,"    "),B.test(k)||q.test(k)||H.test(k)||I.test(k)||F.test(k))break;if(E.search(this.rules.other.nonSpaceChar)>=$||!k.trim())h+=`
`+E.slice($);else{if(x||b.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||B.test(b)||q.test(b)||F.test(b))break;h+=`
`+k}!x&&!k.trim()&&(x=!0),u+=N+`
`,t=t.substring(N.length+1),b=E.slice($)}}s.loose||(i?s.loose=!0:this.rules.other.doubleBlankLine.test(u)&&(i=!0)),s.items.push({type:"list_item",raw:u,task:!!this.options.gfm&&this.rules.other.listIsTask.test(h),loose:!1,text:h,tokens:[]}),s.raw+=u}let l=s.items.at(-1);if(l)l.raw=l.raw.trimEnd(),l.text=l.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let a of s.items){if(this.lexer.state.top=!1,a.tokens=this.lexer.blockTokens(a.text,[]),a.task){if(a.text=a.text.replace(this.rules.other.listReplaceTask,""),a.tokens[0]?.type==="text"||a.tokens[0]?.type==="paragraph"){a.tokens[0].raw=a.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),a.tokens[0].text=a.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let h=this.lexer.inlineQueue.length-1;h>=0;h--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[h].src)){this.lexer.inlineQueue[h].src=this.lexer.inlineQueue[h].src.replace(this.rules.other.listReplaceTask,"");break}}let u=this.rules.other.listTaskCheckbox.exec(a.raw);if(u){let h={type:"checkbox",raw:u[0]+" ",checked:u[0]!=="[ ]"};a.checked=h.checked,s.loose?a.tokens[0]&&["paragraph","text"].includes(a.tokens[0].type)&&"tokens"in a.tokens[0]&&a.tokens[0].tokens?(a.tokens[0].raw=h.raw+a.tokens[0].raw,a.tokens[0].text=h.raw+a.tokens[0].text,a.tokens[0].tokens.unshift(h)):a.tokens.unshift({type:"paragraph",raw:h.raw,text:h.raw,tokens:[h]}):a.tokens.unshift(h)}}if(!s.loose){let u=a.tokens.filter(b=>b.type==="space"),h=u.length>0&&u.some(b=>this.rules.other.anyLine.test(b.raw));s.loose=h}}if(s.loose)for(let a of s.items){a.loose=!0;for(let u of a.tokens)u.type==="text"&&(u.type="paragraph")}return s}}html(t){let e=this.rules.block.html.exec(t);if(e)return{type:"html",block:!0,raw:e[0],pre:e[1]==="pre"||e[1]==="script"||e[1]==="style",text:e[0]}}def(t){let e=this.rules.block.def.exec(t);if(e){let r=e[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),n=e[2]?e[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=e[3]?e[3].substring(1,e[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):e[3];return{type:"def",tag:r,raw:e[0],href:n,title:s}}}table(t){let e=this.rules.block.table.exec(t);if(!e||!this.rules.other.tableDelimiter.test(e[2]))return;let r=lo(e[1]),n=e[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=e[3]?.trim()?e[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:e[0],header:[],align:[],rows:[]};if(r.length===n.length){for(let i of n)this.rules.other.tableAlignRight.test(i)?o.align.push("right"):this.rules.other.tableAlignCenter.test(i)?o.align.push("center"):this.rules.other.tableAlignLeft.test(i)?o.align.push("left"):o.align.push(null);for(let i=0;i<r.length;i++)o.header.push({text:r[i],tokens:this.lexer.inline(r[i]),header:!0,align:o.align[i]});for(let i of s)o.rows.push(lo(i,o.header.length).map((l,a)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:o.align[a]})));return o}}lheading(t){let e=this.rules.block.lheading.exec(t);if(e)return{type:"heading",raw:e[0],depth:e[2].charAt(0)==="="?1:2,text:e[1],tokens:this.lexer.inline(e[1])}}paragraph(t){let e=this.rules.block.paragraph.exec(t);if(e){let r=e[1].charAt(e[1].length-1)===`
`?e[1].slice(0,-1):e[1];return{type:"paragraph",raw:e[0],text:r,tokens:this.lexer.inline(r)}}}text(t){let e=this.rules.block.text.exec(t);if(e)return{type:"text",raw:e[0],text:e[0],tokens:this.lexer.inline(e[0])}}escape(t){let e=this.rules.inline.escape.exec(t);if(e)return{type:"escape",raw:e[0],text:e[1]}}tag(t){let e=this.rules.inline.tag.exec(t);if(e)return!this.lexer.state.inLink&&this.rules.other.startATag.test(e[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(e[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(e[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(e[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:e[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:e[0]}}link(t){let e=this.rules.inline.link.exec(t);if(e){let r=e[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;let o=cr(r.slice(0,-1),"\\");if((r.length-o.length)%2===0)return}else{let o=ol(e[2],"()");if(o===-2)return;if(o>-1){let i=(e[0].indexOf("!")===0?5:4)+e[1].length+o;e[2]=e[2].substring(0,o),e[0]=e[0].substring(0,i).trim(),e[3]=""}}let n=e[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(n);o&&(n=o[1],s=o[3])}else s=e[3]?e[3].slice(1,-1):"";return n=n.trim(),this.rules.other.startAngleBracket.test(n)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?n=n.slice(1):n=n.slice(1,-1)),co(e,{href:n&&n.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},e[0],this.lexer,this.rules)}}reflink(t,e){let r;if((r=this.rules.inline.reflink.exec(t))||(r=this.rules.inline.nolink.exec(t))){let n=(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=e[n.toLowerCase()];if(!s){let o=r[0].charAt(0);return{type:"text",raw:o,text:o}}return co(r,s,r[0],this.lexer,this.rules)}}emStrong(t,e,r=""){let n=this.rules.inline.emStrongLDelim.exec(t);if(!(!n||n[3]&&r.match(this.rules.other.unicodeAlphaNumeric))&&(!(n[1]||n[2])||!r||this.rules.inline.punctuation.exec(r))){let s=[...n[0]].length-1,o,i,l=s,a=0,u=n[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(u.lastIndex=0,e=e.slice(-1*t.length+s);(n=u.exec(e))!=null;){if(o=n[1]||n[2]||n[3]||n[4]||n[5]||n[6],!o)continue;if(i=[...o].length,n[3]||n[4]){l+=i;continue}else if((n[5]||n[6])&&s%3&&!((s+i)%3)){a+=i;continue}if(l-=i,l>0)continue;i=Math.min(i,i+l+a);let h=[...n[0]][0].length,b=t.slice(0,s+n.index+h+i);if(Math.min(s,i)%2){let x=b.slice(1,-1);return{type:"em",raw:b,text:x,tokens:this.lexer.inlineTokens(x)}}let k=b.slice(2,-2);return{type:"strong",raw:b,text:k,tokens:this.lexer.inlineTokens(k)}}}}codespan(t){let e=this.rules.inline.code.exec(t);if(e){let r=e[2].replace(this.rules.other.newLineCharGlobal," "),n=this.rules.other.nonSpaceChar.test(r),s=this.rules.other.startingSpaceChar.test(r)&&this.rules.other.endingSpaceChar.test(r);return n&&s&&(r=r.substring(1,r.length-1)),{type:"codespan",raw:e[0],text:r}}}br(t){let e=this.rules.inline.br.exec(t);if(e)return{type:"br",raw:e[0]}}del(t){let e=this.rules.inline.del.exec(t);if(e)return{type:"del",raw:e[0],text:e[2],tokens:this.lexer.inlineTokens(e[2])}}autolink(t){let e=this.rules.inline.autolink.exec(t);if(e){let r,n;return e[2]==="@"?(r=e[1],n="mailto:"+r):(r=e[1],n=r),{type:"link",raw:e[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}url(t){let e;if(e=this.rules.inline.url.exec(t)){let r,n;if(e[2]==="@")r=e[0],n="mailto:"+r;else{let s;do s=e[0],e[0]=this.rules.inline._backpedal.exec(e[0])?.[0]??"";while(s!==e[0]);r=e[0],e[1]==="www."?n="http://"+e[0]:n=e[0]}return{type:"link",raw:e[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(t){let e=this.rules.inline.text.exec(t);if(e){let r=this.lexer.state.inRawBlock;return{type:"text",raw:e[0],text:e[0],escaped:r}}}},st=class Tn{constructor(e){ce(this,"tokens");ce(this,"options");ce(this,"state");ce(this,"inlineQueue");ce(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=e||Et,this.options.tokenizer=this.options.tokenizer||new Mr,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let r={other:Ue,block:Ir.normal,inline:lr.normal};this.options.pedantic?(r.block=Ir.pedantic,r.inline=lr.pedantic):this.options.gfm&&(r.block=Ir.gfm,this.options.breaks?r.inline=lr.breaks:r.inline=lr.gfm),this.tokenizer.rules=r}static get rules(){return{block:Ir,inline:lr}}static lex(e,r){return new Tn(r).lex(e)}static lexInline(e,r){return new Tn(r).inlineTokens(e)}lex(e){e=e.replace(Ue.carriageReturn,`
`),this.blockTokens(e,this.tokens);for(let r=0;r<this.inlineQueue.length;r++){let n=this.inlineQueue[r];this.inlineTokens(n.src,n.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(e,r=[],n=!1){for(this.options.pedantic&&(e=e.replace(Ue.tabCharGlobal,"    ").replace(Ue.spaceLine,""));e;){let s;if(this.options.extensions?.block?.some(i=>(s=i.call({lexer:this},e,r))?(e=e.substring(s.raw.length),r.push(s),!0):!1))continue;if(s=this.tokenizer.space(e)){e=e.substring(s.raw.length);let i=r.at(-1);s.raw.length===1&&i!==void 0?i.raw+=`
`:r.push(s);continue}if(s=this.tokenizer.code(e)){e=e.substring(s.raw.length);let i=r.at(-1);i?.type==="paragraph"||i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+s.raw,i.text+=`
`+s.text,this.inlineQueue.at(-1).src=i.text):r.push(s);continue}if(s=this.tokenizer.fences(e)){e=e.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.heading(e)){e=e.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.hr(e)){e=e.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.blockquote(e)){e=e.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.list(e)){e=e.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.html(e)){e=e.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.def(e)){e=e.substring(s.raw.length);let i=r.at(-1);i?.type==="paragraph"||i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+s.raw,i.text+=`
`+s.raw,this.inlineQueue.at(-1).src=i.text):this.tokens.links[s.tag]||(this.tokens.links[s.tag]={href:s.href,title:s.title},r.push(s));continue}if(s=this.tokenizer.table(e)){e=e.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.lheading(e)){e=e.substring(s.raw.length),r.push(s);continue}let o=e;if(this.options.extensions?.startBlock){let i=1/0,l=e.slice(1),a;this.options.extensions.startBlock.forEach(u=>{a=u.call({lexer:this},l),typeof a=="number"&&a>=0&&(i=Math.min(i,a))}),i<1/0&&i>=0&&(o=e.substring(0,i+1))}if(this.state.top&&(s=this.tokenizer.paragraph(o))){let i=r.at(-1);n&&i?.type==="paragraph"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+s.raw,i.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):r.push(s),n=o.length!==e.length,e=e.substring(s.raw.length);continue}if(s=this.tokenizer.text(e)){e=e.substring(s.raw.length);let i=r.at(-1);i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+s.raw,i.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):r.push(s);continue}if(e){let i="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(i);break}else throw new Error(i)}}return this.state.top=!0,r}inline(e,r=[]){return this.inlineQueue.push({src:e,tokens:r}),r}inlineTokens(e,r=[]){let n=e,s=null;if(this.tokens.links){let a=Object.keys(this.tokens.links);if(a.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(n))!=null;)a.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(n=n.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(n))!=null;)n=n.slice(0,s.index)+"++"+n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(n))!=null;)o=s[2]?s[2].length:0,n=n.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let i=!1,l="";for(;e;){i||(l=""),i=!1;let a;if(this.options.extensions?.inline?.some(h=>(a=h.call({lexer:this},e,r))?(e=e.substring(a.raw.length),r.push(a),!0):!1))continue;if(a=this.tokenizer.escape(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.tag(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.link(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(a.raw.length);let h=r.at(-1);a.type==="text"&&h?.type==="text"?(h.raw+=a.raw,h.text+=a.text):r.push(a);continue}if(a=this.tokenizer.emStrong(e,n,l)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.codespan(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.br(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.del(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.autolink(e)){e=e.substring(a.raw.length),r.push(a);continue}if(!this.state.inLink&&(a=this.tokenizer.url(e))){e=e.substring(a.raw.length),r.push(a);continue}let u=e;if(this.options.extensions?.startInline){let h=1/0,b=e.slice(1),k;this.options.extensions.startInline.forEach(x=>{k=x.call({lexer:this},b),typeof k=="number"&&k>=0&&(h=Math.min(h,k))}),h<1/0&&h>=0&&(u=e.substring(0,h+1))}if(a=this.tokenizer.inlineText(u)){e=e.substring(a.raw.length),a.raw.slice(-1)!=="_"&&(l=a.raw.slice(-1)),i=!0;let h=r.at(-1);h?.type==="text"?(h.raw+=a.raw,h.text+=a.text):r.push(a);continue}if(e){let h="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(h);break}else throw new Error(h)}}return r}},Nr=class{constructor(t){ce(this,"options");ce(this,"parser");this.options=t||Et}space(t){return""}code({text:t,lang:e,escaped:r}){let n=(e||"").match(Ue.notSpaceStart)?.[0],s=t.replace(Ue.endingNewline,"")+`
`;return n?'<pre><code class="language-'+dt(n)+'">'+(r?s:dt(s,!0))+`</code></pre>
`:"<pre><code>"+(r?s:dt(s,!0))+`</code></pre>
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
`}strong({tokens:t}){return`<strong>${this.parser.parseInline(t)}</strong>`}em({tokens:t}){return`<em>${this.parser.parseInline(t)}</em>`}codespan({text:t}){return`<code>${dt(t,!0)}</code>`}br(t){return"<br>"}del({tokens:t}){return`<del>${this.parser.parseInline(t)}</del>`}link({href:t,title:e,tokens:r}){let n=this.parser.parseInline(r),s=ao(t);if(s===null)return n;t=s;let o='<a href="'+t+'"';return e&&(o+=' title="'+dt(e)+'"'),o+=">"+n+"</a>",o}image({href:t,title:e,text:r,tokens:n}){n&&(r=this.parser.parseInline(n,this.parser.textRenderer));let s=ao(t);if(s===null)return dt(r);t=s;let o=`<img src="${t}" alt="${r}"`;return e&&(o+=` title="${dt(e)}"`),o+=">",o}text(t){return"tokens"in t&&t.tokens?this.parser.parseInline(t.tokens):"escaped"in t&&t.escaped?t.text:dt(t.text)}},Nn=class{strong({text:t}){return t}em({text:t}){return t}codespan({text:t}){return t}del({text:t}){return t}html({text:t}){return t}text({text:t}){return t}link({text:t}){return""+t}image({text:t}){return""+t}br(){return""}checkbox({raw:t}){return t}},ot=class An{constructor(e){ce(this,"options");ce(this,"renderer");ce(this,"textRenderer");this.options=e||Et,this.options.renderer=this.options.renderer||new Nr,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Nn}static parse(e,r){return new An(r).parse(e)}static parseInline(e,r){return new An(r).parseInline(e)}parse(e){let r="";for(let n=0;n<e.length;n++){let s=e[n];if(this.options.extensions?.renderers?.[s.type]){let i=s,l=this.options.extensions.renderers[i.type].call({parser:this},i);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(i.type)){r+=l||"";continue}}let o=s;switch(o.type){case"space":{r+=this.renderer.space(o);break}case"hr":{r+=this.renderer.hr(o);break}case"heading":{r+=this.renderer.heading(o);break}case"code":{r+=this.renderer.code(o);break}case"table":{r+=this.renderer.table(o);break}case"blockquote":{r+=this.renderer.blockquote(o);break}case"list":{r+=this.renderer.list(o);break}case"checkbox":{r+=this.renderer.checkbox(o);break}case"html":{r+=this.renderer.html(o);break}case"def":{r+=this.renderer.def(o);break}case"paragraph":{r+=this.renderer.paragraph(o);break}case"text":{r+=this.renderer.text(o);break}default:{let i='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return r}parseInline(e,r=this.renderer){let n="";for(let s=0;s<e.length;s++){let o=e[s];if(this.options.extensions?.renderers?.[o.type]){let l=this.options.extensions.renderers[o.type].call({parser:this},o);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){n+=l||"";continue}}let i=o;switch(i.type){case"escape":{n+=r.text(i);break}case"html":{n+=r.html(i);break}case"link":{n+=r.link(i);break}case"image":{n+=r.image(i);break}case"checkbox":{n+=r.checkbox(i);break}case"strong":{n+=r.strong(i);break}case"em":{n+=r.em(i);break}case"codespan":{n+=r.codespan(i);break}case"br":{n+=r.br(i);break}case"del":{n+=r.del(i);break}case"text":{n+=r.text(i);break}default:{let l='Token with "'+i.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return n}},Dr,dr=(Dr=class{constructor(t){ce(this,"options");ce(this,"block");this.options=t||Et}preprocess(t){return t}postprocess(t){return t}processAllTokens(t){return t}emStrongMask(t){return t}provideLexer(){return this.block?st.lex:st.lexInline}provideParser(){return this.block?ot.parse:ot.parseInline}},ce(Dr,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),ce(Dr,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),Dr),al=class{constructor(...t){ce(this,"defaults",En());ce(this,"options",this.setOptions);ce(this,"parse",this.parseMarkdown(!0));ce(this,"parseInline",this.parseMarkdown(!1));ce(this,"Parser",ot);ce(this,"Renderer",Nr);ce(this,"TextRenderer",Nn);ce(this,"Lexer",st);ce(this,"Tokenizer",Mr);ce(this,"Hooks",dr);this.use(...t)}walkTokens(t,e){let r=[];for(let n of t)switch(r=r.concat(e.call(this,n)),n.type){case"table":{let s=n;for(let o of s.header)r=r.concat(this.walkTokens(o.tokens,e));for(let o of s.rows)for(let i of o)r=r.concat(this.walkTokens(i.tokens,e));break}case"list":{let s=n;r=r.concat(this.walkTokens(s.items,e));break}default:{let s=n;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let i=s[o].flat(1/0);r=r.concat(this.walkTokens(i,e))}):s.tokens&&(r=r.concat(this.walkTokens(s.tokens,e)))}}return r}use(...t){let e=this.defaults.extensions||{renderers:{},childTokens:{}};return t.forEach(r=>{let n={...r};if(n.async=this.defaults.async||n.async||!1,r.extensions&&(r.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=e.renderers[s.name];o?e.renderers[s.name]=function(...i){let l=s.renderer.apply(this,i);return l===!1&&(l=o.apply(this,i)),l}:e.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=e[s.level];o?o.unshift(s.tokenizer):e[s.level]=[s.tokenizer],s.start&&(s.level==="block"?e.startBlock?e.startBlock.push(s.start):e.startBlock=[s.start]:s.level==="inline"&&(e.startInline?e.startInline.push(s.start):e.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(e.childTokens[s.name]=s.childTokens)}),n.extensions=e),r.renderer){let s=this.defaults.renderer||new Nr(this.defaults);for(let o in r.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let i=o,l=r.renderer[i],a=s[i];s[i]=(...u)=>{let h=l.apply(s,u);return h===!1&&(h=a.apply(s,u)),h||""}}n.renderer=s}if(r.tokenizer){let s=this.defaults.tokenizer||new Mr(this.defaults);for(let o in r.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let i=o,l=r.tokenizer[i],a=s[i];s[i]=(...u)=>{let h=l.apply(s,u);return h===!1&&(h=a.apply(s,u)),h}}n.tokenizer=s}if(r.hooks){let s=this.defaults.hooks||new dr;for(let o in r.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let i=o,l=r.hooks[i],a=s[i];dr.passThroughHooks.has(o)?s[i]=u=>{if(this.defaults.async&&dr.passThroughHooksRespectAsync.has(o))return(async()=>{let b=await l.call(s,u);return a.call(s,b)})();let h=l.call(s,u);return a.call(s,h)}:s[i]=(...u)=>{if(this.defaults.async)return(async()=>{let b=await l.apply(s,u);return b===!1&&(b=await a.apply(s,u)),b})();let h=l.apply(s,u);return h===!1&&(h=a.apply(s,u)),h}}n.hooks=s}if(r.walkTokens){let s=this.defaults.walkTokens,o=r.walkTokens;n.walkTokens=function(i){let l=[];return l.push(o.call(this,i)),s&&(l=l.concat(s.call(this,i))),l}}this.defaults={...this.defaults,...n}}),this}setOptions(t){return this.defaults={...this.defaults,...t},this}lexer(t,e){return st.lex(t,e??this.defaults)}parser(t,e){return ot.parse(t,e??this.defaults)}parseMarkdown(t){return(e,r)=>{let n={...r},s={...this.defaults,...n},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&n.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof e>"u"||e===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof e!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(e)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=t),s.async)return(async()=>{let i=s.hooks?await s.hooks.preprocess(e):e,l=await(s.hooks?await s.hooks.provideLexer():t?st.lex:st.lexInline)(i,s),a=s.hooks?await s.hooks.processAllTokens(l):l;s.walkTokens&&await Promise.all(this.walkTokens(a,s.walkTokens));let u=await(s.hooks?await s.hooks.provideParser():t?ot.parse:ot.parseInline)(a,s);return s.hooks?await s.hooks.postprocess(u):u})().catch(o);try{s.hooks&&(e=s.hooks.preprocess(e));let i=(s.hooks?s.hooks.provideLexer():t?st.lex:st.lexInline)(e,s);s.hooks&&(i=s.hooks.processAllTokens(i)),s.walkTokens&&this.walkTokens(i,s.walkTokens);let l=(s.hooks?s.hooks.provideParser():t?ot.parse:ot.parseInline)(i,s);return s.hooks&&(l=s.hooks.postprocess(l)),l}catch(i){return o(i)}}}onError(t,e){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,t){let n="<p>An error occurred:</p><pre>"+dt(r.message+"",!0)+"</pre>";return e?Promise.resolve(n):n}if(e)return Promise.reject(r);throw r}}},At=new al;function oe(t,e){return At.parse(t,e)}oe.options=oe.setOptions=function(t){return At.setOptions(t),oe.defaults=At.defaults,uo(oe.defaults),oe};oe.getDefaults=En;oe.defaults=Et;oe.use=function(...t){return At.use(...t),oe.defaults=At.defaults,uo(oe.defaults),oe};oe.walkTokens=function(t,e){return At.walkTokens(t,e)};oe.parseInline=At.parseInline;oe.Parser=ot;oe.parser=ot.parse;oe.Renderer=Nr;oe.TextRenderer=Nn;oe.Lexer=st;oe.lexer=st.lex;oe.Tokenizer=Mr;oe.Hooks=dr;oe.parse=oe;var gd=oe.options,md=oe.setOptions,_d=oe.use,bd=oe.walkTokens,wd=oe.parseInline;var kd=ot.parse,yd=st.lex;function vo(t){let e=oe.parse(t),r=eo.sanitize(e);return no(r)}function ll(t){return String(t||"").replace(/^docs\/(superpowers\/)?/,"")}function $o(t,e){let r=e.getWorkspacePath,n=e.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",i="",l="";function a($){$.key==="Escape"&&s&&($.preventDefault(),k())}document.addEventListener("keydown",a);function u(){return s?p`
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
    `:p``}function h(){ie(u(),t)}async function b($){s=$,o="loading",i="",l="",h();let I=r?r():"";if(!I){o="error",l="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",h();return}if(!n){o="error",l="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",h();return}let F="/api/doc?workspace="+encodeURIComponent(I)+"&path="+encodeURIComponent($);try{let B=await n(F),q=await B.json().catch(()=>({}));if(!B.ok||!q||q.ok!==!0){o="error",l="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(q&&q.error||B.status)+")",h();return}i=String(q.content||""),o="ready",h()}catch{o="error",l="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",h()}}function k(){s=null,ie(p``,t)}function x(){document.removeEventListener("keydown",a),k()}return{open:b,close:k,destroy:x}}var cl={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function dl(t){if(typeof t!="number"||!Number.isFinite(t))return"";let e=new Date(t),r=String(e.getHours()).padStart(2,"0"),n=String(e.getMinutes()).padStart(2,"0");return`${r}:${n}`}function xo(t,e={}){let r=Array.isArray(t)?t:[];if(r.length===0)return p`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let n=new Set;for(let i of r)i&&typeof i.resumed_from=="string"&&i.resumed_from.length>0&&n.add(i.resumed_from);let s=i=>{if(!(i.status==="failed"||i.status==="orphaned"))return"";let a=typeof i.session_id=="string"&&i.session_id.length>0,u=n.has(i.attempt_id),h=a&&!u,b=a?u?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return p`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${i.attempt_id}
      ?disabled=${!h}
      title=${b}
      @click=${k=>{k.stopPropagation(),h&&e.onResume&&e.onResume(i.attempt_id)}}
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
  `}var ul=["open","in_progress","deferred","resolved","closed"],pl=[0,1,2,3,4];function So(t,e){let r=e.issueStores,n=e.onClose,s=e.transport,o=e.onNavigate,i=e.queueStore,l=e.sessionLogStore,a=null,u=null,h={},b=!1,k=!1,x="",$="",I="";function F(){b=!1,k=!1,x="",$="",I=""}let B=document.createElement("div");B.className="md-viewer-root",document.body.appendChild(B);let q=$o(B,{getWorkspacePath:e.getWorkspacePath||(()=>"")}),H=document.createElement("div");H.className="session-log-root",document.body.appendChild(H);let N=Tr(H,{transport:s?(g,A)=>Promise.resolve(s(g,A)):void 0,sessionLogStore:l});function E(){if(!i||!a)return[];let g=i.get();return(g&&g.attempts?Object.values(g.attempts):[]).filter(T=>T&&T.bead_id===a).sort((T,R)=>(R.started_at||0)-(T.started_at||0)).map(T=>({attempt_id:T.attempt_id,bead_id:T.bead_id,status:T.status,started_at:typeof T.started_at=="number"?T.started_at:null,runner:T.runner||null,model:T.model||null,session_id:T.session_id||null,resumed_from:T.resumed_from||null,dismissed_at:typeof T.dismissed_at=="number"?T.dismissed_at:null,cause:typeof T.cause=="string"?T.cause:null,cause_detail:T.cause_detail||null}))}function C(g){let A=i?i.get():null,T=A&&A.attempts?A.attempts[g]:null;N.open({attempt_id:g,meta:T?{runner:T.runner||void 0,model:T.model||void 0,effort:T.effort||void 0,status:T.status||void 0,session_id:T.session_id||void 0}:{}})}async function S(g){if(!s||!g)return;let A=()=>{let R=i?i.get():null;return R&&typeof R.revision=="number"?R.revision:0},T=await s("worker-attempt-resume",{attempt_id:g,expected_revision:A()});if(T&&T.conflict){let R=T.queue&&typeof T.queue.revision=="number"?T.queue.revision:A();T=await s("worker-attempt-resume",{attempt_id:g,expected_revision:R})}T&&T.resumed===!1&&!T.conflict&&T.reason&&K(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${T.reason}`,"error",2400)}let m={onOpen:C,onResume:S};function D(){let g=i?i.get():null,A=g&&g.exec_defaults;return A&&typeof A=="object"?A:{}}let P=null;r&&r.subscribe&&(P=r.subscribe(()=>ee()));let z=null;i&&typeof i.subscribe=="function"&&(z=i.subscribe(()=>{a&&y()}));function j(g){g.key==="Escape"&&a&&(g.preventDefault(),n())}document.addEventListener("keydown",j);function ee(){if(a){if(r&&typeof r.snapshotFor=="function"){let g=r.snapshotFor("detail:"+a)||[];u=g.find(T=>T&&T.id===a)||g[0]||u}y()}}function re(g){qt(g).then(A=>{A?K("\uBCF5\uC0AC\uB428","success",1200):K("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function ve(g){g.preventDefault(),g.stopPropagation(),a&&re(a)}function je(g,A){g.preventDefault(),g.stopPropagation(),re(A)}function ze(g,A){g.preventDefault(),g.stopPropagation(),q.open(A)}function _e(g,A){h[g]=A,y(),!(!s||!a)&&Promise.resolve(s("update-exec-settings",{id:a,key:g,value:A})).catch(()=>{K("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}async function $e(g,A,T){if(!s||!a)return!1;try{let R=await Promise.resolve(s(g,A)),Y=Array.isArray(R)?R[0]:R;return Y&&typeof Y=="object"&&Y.id?(u=Y,!0):(K(T,"error"),!1)}catch{return K(T,"error"),!1}}function Ye(g){setTimeout(()=>{try{let A=t.querySelector(g);A&&typeof A.focus=="function"&&A.focus()}catch{}},0)}function ae(){b=!0,x=u&&u.title||"",y(),Ye('.detail-edit__input[data-edit="title"]')}function it(g){x=g.target.value}function de(){b=!1,x="",y()}function Ve(){$e("edit-text",{id:a,field:"title",value:x},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(A=>{A&&(b=!1,x=""),y()})}function se(){k=!0,$=u&&u.description||"",y(),Ye('.detail-edit__textarea[data-edit="description"]')}function Me(g){$=g.target.value}function Xe(){k=!1,$="",y()}function Se(){$e("edit-text",{id:a,field:"description",value:$},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(A=>{A&&(k=!1,$=""),y()})}function Ee(g,A,T,R){if(g.key==="Escape"){g.stopPropagation(),T();return}g.key==="Enter"&&(!R||g.ctrlKey||g.metaKey)&&(g.preventDefault(),A())}function be(g){let A=g.target.value;$e("update-status",{id:a,status:A},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>y())}function Ne(g){let A=Number(g.target.value);$e("update-priority",{id:a,priority:A},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>y())}function Ke(g){I=g.target.value}function Ce(){let g=I.trim();g.length!==0&&$e("label-add",{id:a,label:g},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(A=>{A&&(I=""),y()})}function le(g){if(g.key==="Escape"){g.stopPropagation(),I="",y();return}g.key==="Enter"&&(g.preventDefault(),Ce())}function Re(g){$e("label-remove",{id:a,label:g},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>y())}let He={onCopyPath:je,onOpenDoc:ze},fe={onChange:_e};function Te(g){return typeof g=="string"?g:g&&typeof g=="object"?String(g.id||g.to||g.issue_id||g.depends_on||""):""}function Pe(g){switch(g&&typeof g=="object"?String(g.dependency_type||g.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function Oe(g){let T=(Array.isArray(g.dependencies)?g.dependencies:[]).map(R=>({id:Te(R),icon:Pe(R)})).filter(R=>R.id.length>0);return p`
      <div class="detail-section-label">의존성</div>
      ${T.length===0?p`<div class="detail-empty">의존성 없음</div>`:p`<div class="detail-deps">
            ${T.map(R=>o?p`<button
                    type="button"
                    class="detail-dep detail-dep--link"
                    @click=${()=>o(R.id)}
                  >
                    ${R.icon?`${R.icon} `:""}${R.id}
                  </button>`:p`<span class="detail-dep"
                    >${R.icon?`${R.icon} `:""}${R.id}</span
                  >`)}
          </div>`}
    `}function Ze(g){let A=g.metadata||{},T=g.workflow||{},R=T.stages||{},Y=R.spec&&R.spec.stale,Q=R.impl&&R.impl.stale,U=T.route_source==="derived",he=T.route||A.route||"\u2014";return p`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${U?" detail-kv__v--derived":""}"
          title=${U?"route \uCD94\uB860\uAC12 (metadata \uBBF8\uD540)":"route"}
          >${U&&T.route?`${he} ? (\uCD94\uB860)`:he}</span
        >
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">spec_review</span>
        <span class="detail-kv__v"
          >${A.spec_review||"\uC5C6\uC74C"}${Y?" \xB7 stale":""}</span
        >
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">impl_review</span>
        <span class="detail-kv__v"
          >${A.impl_review||"\uC5C6\uC74C"}${Q?" \xB7 stale":""}</span
        >
      </div>
      ${A.pr_url?p`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${A.pr_url}</span>
          </div>`:""}
    `}let Qe={route:["spec_backed","full_plan"]};async function pe(g,A){let T=A.target.value;if(g==="route"&&u&&u.metadata&&u.metadata.route==="full_plan"&&T!=="full_plan"&&!window.confirm(`full_plan \u2192 ${T||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){y();return}await $e("update-workflow-meta",{id:a,key:g,value:T},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),y()}function Le(g){let A=g.metadata||{};return p` ${((R,Y)=>{let Q=Qe[R],U=typeof A[R]=="string"?A[R]:"";return p`<div class="detail-kv">
        <span class="detail-kv__k">${R}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${R}
          data-edit=${`wfmeta-${R}`}
          @change=${he=>pe(R,he)}
        >
          <option value="" ?selected=${!Q.includes(U)}>
            ${Y}
          </option>
          ${Q.map(he=>p`<option value=${he} ?selected=${U===he}>${he}</option>`)}
        </select>
      </div>`})("route","(\uBBF8\uC124\uC815 \xB7 \uCD94\uB860)")} `}function Ae(g){return b?p`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${x}
            @input=${it}
            @keydown=${A=>Ee(A,Ve,de,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${Ve}
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
          @click=${ae}
        >
          ✎
        </button>
      </div>
    `}function Ie(g){let A=pt(g.created_at),T=pt(g.updated_at);return!A&&!T?p``:p`
      ${A?p`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${A}</span>
          </div>`:""}
      ${T?p`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${T}</span>
          </div>`:""}
    `}function L(g,A){return p`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${be}
        >
          ${ul.map(T=>p`<option value=${T} ?selected=${T===g}>${T}</option>`)}
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
          ${pl.map(T=>p`<option value=${String(T)} ?selected=${T===A}>
                P${T}
              </option>`)}
        </select>
      </div>
    `}function O(g){return p`
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
              .value=${$}
              @input=${Me}
              @keydown=${A=>Ee(A,Se,Xe,!0)}
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
                @click=${Xe}
              >
                취소
              </button>
            </div>
          </div>`:p`<div class="detail-overlay__desc">
            ${g||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function d(g){let A=Array.isArray(g.labels)?g.labels:[];return p`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${A.map(T=>p`<span class="detail-label-chip"
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
            .value=${I}
            @input=${Ke}
            @keydown=${le}
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
    `}function f(){if(!a)return p``;let g=u||{},A=String(g.id||a),T=g.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",R=g.status||"open",Y=typeof g.priority=="number"?Math.max(0,Math.min(4,g.priority)):"",Q=g.description||"",U={...g,metadata:{...g.metadata||{},...h}};return p`
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
            @click=${ve}
          >
            ${A}
          </button>
          ${Ae(T)} ${L(R,Y)}
          ${Ie(g)} ${O(Q)}
          ${d(g)} ${Oe(g)}
          ${Ze(g)} ${Le(g)}
          ${qs(g,He)}
          ${Us(U,fe,D())}
          ${xo(E(),m)}
        </div>
      </div>
    `}function y(){ie(f(),t)}return{load(g){g!==a&&(h={},F()),a=g,u=null,ee()},clear(){a=null,u=null,h={},F(),q.close(),N.close(),ie(p``,t)},destroy(){P&&(P(),P=null),z&&(z(),z=null),document.removeEventListener("keydown",j),q.destroy(),B.parentNode&&B.parentNode.removeChild(B),N.destroy(),H.parentNode&&H.parentNode.removeChild(H),a=null,u=null,ie(p``,t)}}}var fl=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function To(t,e){return on(t,e)?"shown":e.hidden_labels.includes(t)?"hidden_exact":"hidden_prefix"}function hl(t,e,r){if(!r)return{hidden_labels:e.hidden_labels.includes(t)?e.hidden_labels:[...e.hidden_labels,t],visible_labels:e.visible_labels.filter(o=>o!==t)};let n=e.hidden_labels.filter(o=>o!==t);return e.hidden_prefixes.some(o=>o.length>0&&t.startsWith(o))?{hidden_labels:n,visible_labels:e.visible_labels.includes(t)?e.visible_labels:[...e.visible_labels,t]}:{hidden_labels:n}}function Ao(t,e){let{policyStore:r,transport:n,labelOptions:s}=e,o=document.createElement("dialog");o.id="display-settings-dialog",o.className="display-settings",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),t.appendChild(o);let i="";async function l(C){let S=r.get();if(S)try{let m=await n("display-policy-set",{expected_revision:S.revision,policy:C(S)});a(m),m&&m.conflict&&m.policy&&(m=await n("display-policy-set",{expected_revision:m.policy.revision,policy:C(m.policy)}),a(m)),m&&m.conflict&&K("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC","error",4e3)}catch{K("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function a(C){C&&C.policy&&typeof C.policy=="object"&&r.set(C.policy)}function u(C){let S=r.get();if(!S)return;let m=To(C,S)!=="shown";l(D=>hl(C,D,m))}function h(){let C=i.trim();C.length!==0&&(i="",l(S=>S.hidden_prefixes.includes(C)?{hidden_prefixes:S.hidden_prefixes}:{hidden_prefixes:[...S.hidden_prefixes,C]}),F())}function b(C){l(S=>({hidden_prefixes:S.hidden_prefixes.filter(m=>m!==C)}))}function k(C){let S=r.get();if(!S)return;let m=S.chips[C]===!1;l(()=>({chips:{[C]:m}}))}function x(C){let S=s();return p`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">라벨 표시</h3>
        <p class="display-settings__hint">
          라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을
          누르면 그 라벨만 예외로 다시 표시됩니다.
        </p>
        ${S.length===0?p`<div class="display-settings__empty">라벨 없음</div>`:p`<div class="display-settings__pills">
              ${S.map(m=>{let D=To(m,C);return p`<button
                  type="button"
                  class=${`display-settings__pill display-settings__pill--${D}`}
                  data-label=${m}
                  data-state=${D}
                  @click=${()=>u(m)}
                >
                  ${m}
                </button>`})}
            </div>`}
      </section>
    `}function $(C){return p`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">숨김 prefix</h3>
        <div class="display-settings__prefixes">
          ${C.hidden_prefixes.map(S=>p`<span class="display-settings__prefix">
                ${S}
                <button
                  type="button"
                  class="display-settings__prefix-remove"
                  aria-label=${`${S} \uADDC\uCE59 \uC81C\uAC70`}
                  @click=${()=>b(S)}
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
            @input=${S=>{i=String(S.target.value||"")}}
          />
          <button type="button" @click=${h}>추가</button>
        </div>
      </section>
    `}function I(C){return p`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">카드 표시 요소</h3>
        <div class="display-settings__toggles">
          ${fl.map(([S,m])=>p`<label class="display-settings__toggle">
                <input
                  type="checkbox"
                  data-chip=${S}
                  .checked=${C.chips[S]!==!1}
                  @change=${()=>k(S)}
                />
                <span>${m}</span>
              </label>`)}
        </div>
      </section>
    `}function F(){let C=r.get();ie(p`
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
            ${C?p`${x(C)} ${$(C)}
                ${I(C)}`:p`<div class="display-settings__empty">
                  표시 정책을 불러오는 중…
                </div>`}
          </div>
        </div>
      `,o)}let B=!1,q=()=>{B=!1};o.addEventListener("close",q),o.addEventListener("cancel",q);let H=null;r.subscribe&&(H=r.subscribe(()=>{B&&F()}));function N(){B||(i="",B=!0,F(),typeof o.showModal=="function"?o.showModal():o.setAttribute("open",""))}function E(){B&&(B=!1,typeof o.close=="function"?o.close():o.removeAttribute("open"))}return{open:N,close:E,destroy(){B=!1,o.removeEventListener("close",q),o.removeEventListener("cancel",q),H&&(H(),H=null),o.remove()}}}function Eo(t){let e=document.createElement("dialog");e.id="fatal-error-dialog",e.setAttribute("role","alertdialog"),e.setAttribute("aria-modal","true"),e.innerHTML=`
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
    </div>`,t.appendChild(e);let r=e.querySelector("#fatal-error-title"),n=e.querySelector("#fatal-error-message"),s=e.querySelector("#fatal-error-detail"),o=e.querySelector("#fatal-error-reload"),i=e.querySelector("#fatal-error-close"),l=()=>{if(typeof e.close=="function")try{e.close()}catch{}e.removeAttribute("open")},a=(u,h,b="")=>{r&&(r.textContent=u||"Unexpected Error"),n&&(n.textContent=h||"An unrecoverable error occurred.");let k=typeof b=="string"?b.trim():"";if(s&&(k.length>0?(s.textContent=k,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof e.showModal=="function")try{e.showModal(),e.setAttribute("open","")}catch{e.setAttribute("open","")}else e.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),i&&i.addEventListener("click",()=>l()),e.addEventListener("cancel",u=>{u.preventDefault(),l()}),{open:a,close:l,getElement(){return e}}}function Co(t,e,r){let n=me("views:nav"),s=null;function o(a){return u=>{u.preventDefault(),n("click tab %s",a),r.gotoView(a)}}function i(){let u=e.getState().view==="worker"?"worker":"board";return p`
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
  `,t.appendChild(r);let n=r.querySelector("#new-issue-form"),s=r.querySelector("#new-title"),o=r.querySelector("#new-type"),i=r.querySelector("#new-priority"),l=r.querySelector("#new-labels"),a=r.querySelector("#new-description"),u=r.querySelector("#new-issue-error"),h=r.querySelector("#btn-cancel"),b=r.querySelector("#btn-create"),k=r.querySelector(".new-issue__close");function x(){o.replaceChildren();let E=document.createElement("option");E.value="",E.textContent="\u2014 Select \u2014",o.appendChild(E);for(let C of Ro){let S=document.createElement("option");S.value=C,S.textContent=Lo(C),o.appendChild(S)}i.replaceChildren();for(let C=0;C<=4;C+=1){let S=document.createElement("option");S.value=String(C);let m=Io[C]||"Medium";S.textContent=`${C} \u2013 ${m}`,i.appendChild(S)}}x();function $(){try{typeof r.close=="function"?r.close():r.removeAttribute("open")}catch{r.removeAttribute("open")}}function I(E){s.disabled=E,o.disabled=E,i.disabled=E,l.disabled=E,a.disabled=E,h.disabled=E,b.disabled=E,b.textContent=E?"Creating\u2026":"Create"}function F(){u.textContent=""}function B(E){u.textContent=E}function q(){try{let E=window.localStorage.getItem("beads-ui.new.type");E?o.value=E:o.value="";let C=window.localStorage.getItem("beads-ui.new.priority");C&&/^\d$/.test(C)?i.value=C:i.value="2"}catch{o.value="",i.value="2"}}function H(){let E=o.value||"",C=i.value||"";E.length>0&&window.localStorage.setItem("beads-ui.new.type",E),C.length>0&&window.localStorage.setItem("beads-ui.new.priority",C)}async function N(){F();let E=String(s.value||"").trim();if(E.length===0){B("Title is required"),s.focus();return}let C=Number(i.value||"2");if(!(C>=0&&C<=4)){B("Priority must be 0..4"),i.focus();return}let S=String(o.value||""),m=String(a.value||""),D={title:E};S.length>0&&(D.type=S),String(C).length>0&&(D.priority=C),m.length>0&&(D.description=m),I(!0);try{await e("create-issue",D)}catch{I(!1),B("Failed to create issue");return}H(),I(!1),$()}return r.addEventListener("cancel",E=>{E.preventDefault(),$()}),k.addEventListener("click",()=>$()),h.addEventListener("click",()=>$()),r.addEventListener("keydown",E=>{E.key==="Enter"&&(E.ctrlKey||E.metaKey)&&(E.preventDefault(),N())}),n.addEventListener("submit",E=>{E.preventDefault(),N()}),{open(){n.reset(),F(),q();try{"showModal"in r&&typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")}catch{r.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){$()}}}function Oo(t){if(typeof t!="number"||!Number.isFinite(t)||t<=0)return"";if(t<6e4)return`${Math.round(t/1e3)}\uCD08`;let e=t/6e4;return`${Number.isInteger(e)?e:Math.round(e*10)/10}\uBD84`}function Mo(t){return Array.isArray(t)?t.filter(e=>typeof e=="string").join(" "):""}var gl={deployed:{modifier:"ok",label:"\uC131\uACF5"},launched:{modifier:"launched",label:"\uBC1C\uC0AC\uB428"},failed:{modifier:"fail",label:"\uC2E4\uD328"}},ml=[{key:"orchestration_model",values:()=>un},{key:"orchestration_effort",values:()=>pn},{key:"review_model",values:()=>fn},{key:"impl_model",values:()=>hn}];function No(t,e){let{queueStore:r,transport:n,getWorkspacePath:s}=e,o=document.createElement("dialog");o.id="worker-exec-defaults-dialog",o.className="exec-defaults",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),t.appendChild(o);function i(){return r&&r.get()||{revision:0,exec_defaults:{}}}function l(){let m=i();return typeof m.revision=="number"?m.revision:0}function a(){let m=i().exec_defaults;return m&&typeof m=="object"?m:{}}function u(m){m&&m.queue&&r&&r.set(m.queue)}async function h(m,D){if(!n)return;let P={key:m,value:D||null};try{let z=await n("worker-queue-set-exec-default",{...P,expected_revision:l()});u(z),z&&z.conflict&&(z=await n("worker-queue-set-exec-default",{...P,expected_revision:l()}),u(z)),z&&z.conflict&&K("\uC804\uC5ED \uC2E4\uD589 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC","error",4e3)}catch{K("\uC804\uC5ED \uC2E4\uD589 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function b(m,D,P){let z=!!P&&!D.includes(P);return p`<div class="exec-defaults__row">
      <span class="exec-defaults__k">${m}</span>
      <select
        class="exec-defaults__sel"
        aria-label=${`\uC804\uC5ED ${m}`}
        data-key=${m}
        @change=${j=>{h(m,j.target.value)}}
      >
        <option value="" ?selected=${!P}>
          ${gn[m]||"(\uAE30\uBCF8)"}
        </option>
        ${z?p`<option value=${P} ?selected=${!0}>
              ${P} (비호환)
            </option>`:""}
        ${D.map(j=>p`<option value=${j} ?selected=${P===j}>${j}</option>`)}
      </select>
    </div>`}function k(){let m=i().workspace_info;return m&&typeof m=="object"?m:{}}function x(m,D){return p`<span
      class="exec-defaults__vd-badge exec-defaults__vd-badge--${m}"
      >${D}</span
    >`}function $(m){let D=m?Mo(m.cmd):"",P=m?Oo(m.timeout_ms):"",z=!!m&&m.source==="detected";return p`<div class="exec-defaults__vd-group" data-vd="verify">
      <div class="exec-defaults__vd-label">머지 전 검증 (verify)</div>
      ${D?p`<div class="exec-defaults__vd-line">
            <span class="exec-defaults__vd-cmd">${D}</span>
            ${z?x("detected","\uC790\uB3D9\uAC10\uC9C0"):x("config","config")}
            ${P?p`<span class="exec-defaults__vd-meta"
                  >timeout ${P}</span
                >`:""}
          </div>`:p`<div class="exec-defaults__vd-line exec-defaults__vd-absent">
            검증 없음
          </div>`}
    </div>`}function I(m){let D=m?Mo(m.cmd):"",P=m?Oo(m.timeout_ms):"",z=P?`timeout ${P} \xB7 verify \uD1B5\uACFC \uC2DC\uC5D0\uB9CC \uC2E4\uD589`:"verify \uD1B5\uACFC \uC2DC\uC5D0\uB9CC \uC2E4\uD589",j=s&&s()||"<workspace \uACBD\uB85C>";return p`<div class="exec-defaults__vd-group" data-vd="deploy">
      <div class="exec-defaults__vd-label">머지 후 배포 (deploy)</div>
      ${D?p`<div class="exec-defaults__vd-line">
            <span class="exec-defaults__vd-cmd">${D}</span>
            ${x("config","config")}
            ${m.detached===!0?x("detached","detached"):""}
            <span class="exec-defaults__vd-meta">${z}</span>
          </div>`:p`<div class="exec-defaults__vd-line exec-defaults__vd-absent">
            배포 없음 —
            <span class="exec-defaults__vd-cmd"
              >[worker.deploy."${j}"]</span
            >
            섹션으로 정의
          </div>`}
    </div>`}function F(m){if(!m||typeof m!="object")return"";let D=gl[String(m.outcome)];if(!D)return"";let P=m.outcome==="failed"&&m.reason?`${D.label} \xB7 ${m.reason}`:D.label,z=[pt(m.at),typeof m.bead_id=="string"?m.bead_id:"",typeof m.base_sha=="string"?m.base_sha.slice(0,7):""].filter(j=>j.length>0).join(" \xB7 ");return p`<div class="exec-defaults__vd-group" data-vd="last-deploy">
      <div class="exec-defaults__vd-label">마지막 배포</div>
      <div class="exec-defaults__vd-line">
        ${x(D.modifier,P)}
        ${z?p`<span class="exec-defaults__vd-meta">${z}</span>`:""}
      </div>
    </div>`}function B(m){return p`<section class="exec-defaults__vd">
      <p class="exec-defaults__vd-title">
        검증·배포 설정
        <span class="exec-defaults__vd-ro"
          >읽기 전용 — config.toml에서 정의</span
        >
      </p>
      ${$(m.verify_cmd)} ${I(m.deploy_cmd)}
      ${F(m.last_deploy)}
    </section>`}function q(){let m=a();ie(p`
        <div class="exec-defaults__container">
          <header class="exec-defaults__header">
            <div class="exec-defaults__title">전역 실행 설정</div>
            <button
              type="button"
              class="exec-defaults__close"
              aria-label="닫기"
              @click=${S}
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
            ${ml.map(D=>b(D.key,D.values(),m[D.key]||""))}
            ${B(k())}
          </div>
        </div>
      `,o)}let H=!1,N=()=>{H=!1};o.addEventListener("close",N),o.addEventListener("cancel",N);let E=null;r&&r.subscribe&&(E=r.subscribe(()=>{H&&q()}));function C(){H||(H=!0,q(),typeof o.showModal=="function"?o.showModal():o.setAttribute("open",""))}function S(){H&&(H=!1,typeof o.close=="function"?o.close():o.removeAttribute("open"))}return{open:C,close:S,destroy(){H=!1,o.removeEventListener("close",N),o.removeEventListener("cancel",N),E&&(E(),E=null),o.remove()}}}function Ut(t){return typeof t=="number"&&Number.isFinite(t)?t:0}function _l(t){return!t||typeof t!="object"?!1:typeof t.input_tokens=="number"||typeof t.output_tokens=="number"}function bl(t){return t>=1e6?`${(t/1e6).toFixed(1)}M`:t>=1e3?`${(t/1e3).toFixed(1)}k`:String(t)}function zt(t){if(!_l(t))return null;let e=Ut(t?.input_tokens)+Ut(t?.output_tokens);return`\u03C4 ${bl(e)}`}function Br(t){if(!t||typeof t!="object")return"";let e=[`\uC785\uB825 ${Ut(t.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Ut(t.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${Ut(t.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Ut(t.cache_creation_input_tokens).toLocaleString("en-US")}`];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&e.push(`$${t.total_cost_usd.toFixed(2)}`),e.join(" \xB7 ")}function Pn(t,e){let r=null;for(let n of Object.values(t||{}))n&&n.bead_id===e&&(r=n.usage||null);return r}function Fn(t){let e=t.draggable&&!t.done,r=Array.isArray(t.badges)?t.badges:[],n=zt(t.usage),s=t.merge_step||null;return p`<div
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
  </div>`}function ht(t){let e=!!t.collapsible&&!!t.collapsed,r=p`<span
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
  </div>`}function $l(t,e,r=null){let n=!!t.paused,s=n?"\uC77C\uC2DC\uC815\uC9C0":typeof t.started_at=="number"?vl(e-t.started_at):"\u2014",o=[t.runner,t.model].filter(Boolean).join(" \xB7 "),i=zt(t.usage),l=t.attempt_id&&t.attempt_id===r;return p`<div
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
  </div>`}var xl="tab:worker:ready",Sl="tab:worker:blocked",qr=1;function zn(t){let e=t&&t.metadata;return!!(e&&typeof e=="object"&&e.spec_id)}var Uo="beads-ui.worker.candidate-filter",qn={show_blocked:!1,spec:"all"};function Tl(){try{let t=window.localStorage.getItem(Uo);if(!t)return{...qn};let e=JSON.parse(t);if(!e||typeof e!="object")return{...qn};let r=e.spec;return{show_blocked:e.show_blocked===!0,spec:r==="with"||r==="without"?r:"all"}}catch{return{...qn}}}function Al(t){try{window.localStorage.setItem(Uo,JSON.stringify(t))}catch{}}function El(t,e){let r=l=>e.show_blocked||!l.blocked,n=l=>e.spec==="all"||(e.spec==="with"?l.has_spec:!l.has_spec),s=[],o=0,i=0;for(let l of t){let a=r(l),u=n(l);a&&u?s.push(l):!a&&u?o+=1:a&&!u&&(i+=1)}return{visible:s,hidden_blocked:o,hidden_spec:i}}var Cl=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],zo="bdui.worker.candidate_sort",Rl=[{value:"spec",label:"spec \uC6B0\uC120"},{value:"board",label:"Board \uC21C\uC11C"},{value:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131\uC21C"}],Ur="spec";function Ll(){try{let t=window.localStorage.getItem(zo);return t==="board"||t==="created"||t==="spec"?t:Ur}catch{return Ur}}function Il(t){try{window.localStorage.setItem(zo,t)}catch{}}var Dl="(max-width: 640px)",Ho="beads-ui.worker.lane-collapsed",fr={queue:!0,done:!0};function Ol(){try{let t=window.localStorage.getItem(Ho);if(!t)return{...fr};let e=JSON.parse(t);return!e||typeof e!="object"?{...fr}:{queue:typeof e.queue=="boolean"?e.queue:fr.queue,done:typeof e.done=="boolean"?e.done:fr.done}}catch{return{...fr}}}function Ml(t){try{window.localStorage.setItem(Ho,JSON.stringify(t))}catch{}}function qo(t){let e=Array.isArray(t)&&t.length>0?t[0]:null;if(!e)return"";let r=typeof e.title=="string"?e.title:e.id||"";return r.length>22?`${r.slice(0,22)}\u2026`:r}function Nl(t,e,r){let n=Array.isArray(t)?t.slice():[];return e==="created"?n.sort(xt):(n.sort(kr(r)),e==="board"?n:[...n.filter(zn),...n.filter(s=>!zn(s))])}function Pl(t){let e=t&&t.parent;return(typeof e=="string"?e.length>0:!!(e&&e.id))||/\.\d+$/.test(t&&t.id||"")}function Fl(t){let r=(Array.isArray(t?.dependencies)?t.dependencies:[]).map(n=>typeof n=="string"?n:n&&n.id).filter(Boolean);return r.length>0?`\u{1F512} ${r.join(", ")}`:"\u{1F512} blocked"}var Bl=["closed_unmerged","undecidable"],ql=[{from:"\uAD00\uCE21 \uB300\uAE30",activity:"checking",to:"\uD655\uC778\uC911"},{from:"\uB85C\uCEEC\uAC80\uC99D \uB300\uAE30",activity:"verifying",to:"\uB85C\uCEEC\uAC80\uC99D \uC2E4\uD589 \uC911"}];function Ul(t,e){for(let r of ql)if(t===r.from&&e===r.activity)return{label:r.to,live:!0};return{label:t,live:!1}}var Un=[{step:"merging",label:"\uBA38\uC9C0 \uC911"},{step:"base_sync",label:"base \uB3D9\uAE30\uD654"},{step:"post_merge_verify",label:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D"},{step:"deploy",label:"\uBC30\uD3EC"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"}];function zl(t){if(typeof t!="string"||t.length===0)return null;let e=Un.length,r=Un.findIndex(n=>n.step===t);return r<0?{label:t,index:0,total:e,percent:0}:{label:Un[r].label,index:r+1,total:e,percent:Math.round((r+1)/e*100)}}function Hl(t,e,r,n,s=null,o=null){let i=r[t]||null,l=i&&i.gate?i.gate:null,a=i&&i.pr?i.pr:null,u=[],h=Ul(l&&l.gate_badge||"",o&&o.activity||null);h.label&&u.push(h.label),l&&l.base_badge&&l.base_badge!==l.gate_badge&&u.push(l.base_badge),n&&u.push("\uC815\uB9AC \uC2E4\uD328");let b=!!l&&l.base_badge==="\uCDA9\uB3CC",k=!!l&&l.enabled===!0,x=zl(o&&o.merge_progress?o.merge_progress.step:null),$=!!n&&!!l&&l.tier==="merged";return{id:t,title:e,reason:n?"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644":"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",pr_number:a&&typeof a.number=="number"?a.number:null,pr_url:a&&typeof a.url=="string"?a.url:"",badges:u,live_badge:h.live?h.label:null,usage:s,alert:!!l&&Bl.includes(l.tier)||!!n,merge_action:!0,discard_action:!n&&!(l&&l.tier==="merged"),merge_step:x,discard_enabled:!x,merge_enabled:!x&&(k||b||$),merge_title:x?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${x.label}`:$?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uCC98\uC74C\uBD80\uD130 \uB2E4\uC2DC \uC218\uD589\uD569\uB2C8\uB2E4":b?"\uCDA9\uB3CC \u2014 \uD074\uB9AD\uD558\uBA74 \uCDA9\uB3CC \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4 (\uBA38\uC9C0\uD558\uC9C0 \uC54A\uC74C)":k?`\uBA38\uC9C0 (${l.gate_badge}) \u2014 \uD074\uB9AD \uC2DC\uC810\uC5D0 \uB2E4\uC2DC \uD655\uC778\uD569\uB2C8\uB2E4`:l&&l.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${l&&l.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function Hn(t,e={}){let{transport:r,issueStores:n,queueStore:s,sessionLogStore:o,uiOrderStore:i,gotoIssue:l,getWorkspacePath:a}=e,u=n?vr(n,i):null,h=$r({transport:r,uiOrderStore:i}),b=null,k=[],x=Tl(),$=Ll(),I=Ol(),F=!1,B=new Set,q=[],H=document.createElement("div");H.className="worker-console";let N=document.createElement("div");N.className="worker-top";let E=document.createElement("div");E.className="worker-drawer-overlay",E.hidden=!0;let C=document.createElement("div");C.className="worker-drawer-overlay__backdrop";let S=document.createElement("div");S.className="worker-drawer-host",E.append(C,S);let m=document.createElement("div");m.className="worker-lanes-host",H.append(N,E,m),t.appendChild(H);let D=null,P=Tr(S,{transport:r,sessionLogStore:o,onClose:()=>{D=null,E.hidden=!0,le()}}),z=No(H,{queueStore:s,transport:r,getWorkspacePath:a});function j(){return s&&s.get()||{revision:0,auto_advance:!1,slots:qr,queue:[],pr_wait:[],done:[]}}function ee(){let d=j();return typeof d.revision=="number"?d.revision:0}function re(d){d&&d.queue&&s&&s.set(d.queue)}function ve(){let d=j().queue;return Array.isArray(d)?d.length:0}async function je(d,f){if(!r)return;let y=await r("worker-queue-place",{bead_id:d,index:f,expected_revision:ee()});re(y),y&&y.conflict&&await r("worker-queue-place",{bead_id:d,index:f,expected_revision:ee()}).then(re)}async function ze(d,f){if(!r)return;let y=await r("worker-queue-reorder",{bead_id:d,to_index:f,expected_revision:ee()});re(y),y&&y.conflict&&await r("worker-queue-reorder",{bead_id:d,to_index:f,expected_revision:ee()}).then(re)}async function _e(d){if(!r)return;let f=await r("worker-queue-remove",{bead_id:d,expected_revision:ee()});re(f),f&&f.conflict&&await r("worker-queue-remove",{bead_id:d,expected_revision:ee()}).then(re)}async function $e(d){!r||!d||await r("worker-attempt-stop",{attempt_id:d})}async function Ye(d){if(!r||!d)return;let f=await r("worker-attempt-pause",{attempt_id:d});f&&f.paused===!1&&f.reason&&K(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${f.reason}`,"error",2400)}async function ae(d){if(!r||!d)return;let f=await r("worker-attempt-resume",{attempt_id:d,expected_revision:ee()});re(f),f&&f.conflict&&(f=await r("worker-attempt-resume",{attempt_id:d,expected_revision:ee()}),re(f)),f&&f.resumed===!1&&!f.conflict&&f.reason&&K(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${f.reason}`,"error",2400)}async function it(d){if(!r||!d)return;let f=await r("worker-attempt-dismiss",{attempt_id:d,expected_revision:ee()});re(f),f&&f.conflict&&(f=await r("worker-attempt-dismiss",{attempt_id:d,expected_revision:ee()}),re(f)),f&&f.dismissed===!1&&!f.conflict&&f.reason&&K(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${f.reason}`,"error",2400)}async function de(d){if(!r||!d)return;B.add(d),le();let f;try{f=await r("worker-pr-merge",{bead_id:d,expected_revision:ee()}),re(f),f&&f.conflict&&(f=await r("worker-pr-merge",{bead_id:d,expected_revision:ee()}),re(f))}finally{B.delete(d),le()}if(!(!f||f.conflict)){if(f.action==="conflict_resolution"){K(f.ok?"\uCDA9\uB3CC \u2014 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 (\uBA38\uC9C0\uD558\uC9C0 \uC54A\uC74C)":`\uCDA9\uB3CC \uD574\uC18C \uB514\uC2A4\uD328\uCE58 \uC2E4\uD328: ${f.reason||""}`,f.ok?"success":"error",2800);return}if(f.ok){K("\uBA38\uC9C0 + \uC815\uB9AC \uC644\uB8CC","success",2e3);return}K(f.cleanup_step?`\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uC2E4\uD328(${f.cleanup_step}): ${f.reason||""}`:`\uBA38\uC9C0 \uAC70\uBD80: ${f.reason||""}`,"error",3200)}}async function Ve(d){if(!r||!d||!(typeof globalThis.confirm!="function"||globalThis.confirm(`${d}: PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4. \uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694. \uACC4\uC18D\uD560\uAE4C\uC694?`)))return;let y=await r("worker-pr-discard",{bead_id:d,expected_revision:ee()});if(re(y),y&&y.conflict&&(y=await r("worker-pr-discard",{bead_id:d,expected_revision:ee()}),re(y)),y&&y.discarded===!0){K("\uD3D0\uAE30 \uC644\uB8CC \u2014 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB2E4\uC2DC \uC2E4\uD589\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4","success",2400);return}y&&y.discarded===!1&&!y.conflict&&K(`\uD3D0\uAE30 \uAC70\uBD80: ${y.reason||""}`,"error",2800)}async function se(d){if(!r)return;let f=await r("worker-queue-toggle",{on:d,expected_revision:ee()});re(f),f&&f.conflict&&await r("worker-queue-toggle",{on:d,expected_revision:ee()}).then(re)}async function Me(d){if(!r||!Number.isFinite(d))return;let f=Math.max(qr,Math.floor(d)),y=await r("worker-queue-set-slots",{slots:f,expected_revision:ee()});re(y),y&&y.conflict&&await r("worker-queue-set-slots",{slots:f,expected_revision:ee()}).then(re)}function Xe(){let d=j(),f=u?u.selectBoardColumn(xl,"ready"):[],y=u?u.selectBoardColumn(Sl,"blocked"):[],g=new Map;for(let c of[...f,...y])g.set(c.id,c.title||c.id);let A=d.pr_wait||[],T=d.pr_observations||{},R=d.pr_activity||{},Y=d.cleanup_failed||{},Q=Object.entries(Y).map(([c,v])=>({bead_id:c,step:v&&v.step?v.step:"",reason:v&&v.reason?v.reason:"",detail:v&&typeof v.detail=="string"?v.detail:null,output_tail:v&&typeof v.output_tail=="string"&&v.output_tail?v.output_tail:void 0})),U=d.queue||[],he=new Set([...U.map(c=>c.bead_id),...A.map(c=>c.bead_id),...d.done.map(c=>c.bead_id)]),X=new Set(y.map(c=>c.id)),ge=i?i.get()?.order||{}:{},Ct=new Set,Je=[];for(let c of[...f,...y])he.has(c.id)||Ct.has(c.id)||Pl(c)||(Ct.add(c.id),Je.push(c));k=Nl(Je,$,ge);let mt=d.admission||{},_t=c=>{let v=mt[c];if(!v)return"";let M=typeof v.reason=="string"?v.reason:"",te=M.indexOf(":");return te>0&&te<M.length-1?`\u26D4 ${M.slice(0,te)} (${M.slice(te+1)})`:`\u26D4 ${M}`},_=k.map(c=>{let v=zn(c),M=X.has(c.id),te=[];M&&te.push(Fl(c)),v||te.push("spec \uC5C6\uC74C");let xe=_t(c.id);return xe&&te.push(xe),{id:c.id,title:c.title||c.id,reason:te.join(" \xB7 "),draggable:v,lane:"candidate",workflow:c.workflow,status:c.status,blocked:M,has_spec:v}}),w=El(_,x),V=w.visible,W=(c,v)=>c.map(M=>({id:M.bead_id,title:g.get(M.bead_id)||M.bead_id,reason:v==="done"?"":_t(M.bead_id),draggable:v!=="done",done:v==="done",lane:v,usage:v==="done"?Pn(d.attempts||{},M.bead_id):null})),Z=d.attempts?Object.values(d.attempts):[],ue=new Set;for(let c of Z)c&&typeof c.resumed_from=="string"&&c.resumed_from.length>0&&ue.add(c.resumed_from);let bt=new Map;for(let c of Z)bt.set(c.bead_id,c.attempt_id);let Rt=[],we=null;for(let c of Z){let v=c.status==="paused"&&!ue.has(c.attempt_id);c.status==="running"||v?Rt.push({bead_id:c.bead_id,attempt_id:c.attempt_id,title:g.get(c.bead_id)||c.bead_id,runner:c.runner||null,model:c.model||null,effort:c.effort||null,started_at:typeof c.started_at=="number"?c.started_at:null,resumed_from:c.resumed_from||null,paused:v,can_pause:typeof c.session_id=="string"&&c.session_id.length>0,usage:c.usage||null}):(c.status==="failed"||c.status==="orphaned")&&!(bt.get(c.bead_id)!==c.attempt_id)&&typeof c.dismissed_at!="number"&&(we=c)}let at=null;if(we){let c=typeof we.session_id=="string"&&we.session_id.length>0,v=ue.has(we.attempt_id),M=we.cause_detail;at={repo:we.repo||"",reason:we.cause||we.status,cause_detail:M&&typeof M.reason=="string"?{reason:M.reason,command:typeof M.command=="string"?M.command:null}:null,resume_attempt_id:we.attempt_id,resume_eligible:c&&!v,resume_reason:c?v?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}}let hr=new Set(Rt.map(c=>c.bead_id)),Lt=Rt.filter(c=>!c.paused).length,Ht=(d.workspace_info||{}).slots,et=typeof Ht=="number"?Ht:typeof d.slots=="number"?d.slots:qr,gr=Lt>et,Wt=W(d.done,"done"),Gt=0,jt=0,Yt=!1;for(let c of Wt){let v=c.usage;v&&typeof v=="object"&&(Number.isFinite(v.input_tokens)&&(Gt+=v.input_tokens,Yt=!0),Number.isFinite(v.output_tokens)&&(jt+=v.output_tokens,Yt=!0))}let G=Yt?zt({input_tokens:Gt,output_tokens:jt}):null;return{queue:d,idToTitle:g,candidates:V,candidate_hidden:{blocked:w.hidden_blocked,spec:w.hidden_spec},running:Rt,live_count:Lt,slots:et,over_cap:gr,failure:at,waiting:W(U.filter(c=>!hr.has(c.bead_id)),"queue"),pr_wait:A.map(c=>Hl(c.bead_id,g.get(c.bead_id)||c.bead_id,T,Y[c.bead_id]||null,Pn(d.attempts||{},c.bead_id),R[c.bead_id]||(B.has(c.bead_id)?{activity:null,merge_progress:{step:"merging"}}:null))),done:Wt,token_total:G,cleanup_failures:Q}}function Se(d){let f=d.waiting.length>0?d.waiting[0].id:"\u2014",y=p`<button
      type="button"
      class="worker-play${d.queue.auto_advance?" is-active":""}"
    >
      ${d.queue.auto_advance?"\u23F8 \uC77C\uC2DC\uC815\uC9C0":"\u25B6 \uC790\uB3D9 \uC9C4\uD589"}
    </button>`,g=d.over_cap?p`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",A=p`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${d.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${d.pr_wait.length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >오늘 완료 <b>${d.done.length}</b></span
      >`,T=p`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${qr}
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
      </button>`,R=Bo({failure:d.failure,cleanupFailures:d.cleanup_failures});return F?p`<div class="worker-ribbon">
          ${y}
          <div class="worker-kpi worker-kpi--ribbon">${g}${A}</div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${T}</div>
        </div>
        ${R}`:p`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${y}${T}</div>
        <div class="worker-kpi">
          ${g}${A}
          ${d.token_total?p`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title="완료된 세션들의 토큰 합계 (입력+출력)"
                >${d.token_total}</span
              >`:""}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${f}</b></span
          >
        </div>
      </div>
      ${R}`}function Ee(d){if(d.running.length===0&&d.pr_wait.length===0)return"";let f=d.running.some(y=>!y.paused);return p`<section
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
          >${d.running.length+d.pr_wait.length}</span
        >
      </header>
      ${d.running.length>0?Bn(d.running,Date.now(),D):""}
      ${d.pr_wait.map(y=>Fn(y))}
    </section>`}function be(d){let f=d.candidate_hidden;return p`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${x.show_blocked}
        />
        🔒 blocked${f.blocked>0?` ${f.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${Cl.map(y=>p`<button
              type="button"
              class="worker-filter__chip${x.spec===y.value?" is-active":""}"
              data-spec=${y.value}
              aria-pressed=${x.spec===y.value?"true":"false"}
            >
              ${y.label}
            </button>`)}
        ${f.spec>0?p`<span class="worker-filter__hidden">숨김 ${f.spec}</span>`:""}
      </div>
    </div>`}function Ne(){return p`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${$}
    >
      ${Rl.map(d=>p`<option value=${d.value} ?selected=${$===d.value}>
            ${d.label}
          </option>`)}
    </select>`}function Ke(d){let f=ht({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:d.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:Ne(),controls:be(d)});return F?p`<div class="worker-lanes worker-lanes--mobile">
        ${Ee(d)}
        ${ht({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:d.waiting,empty:"\uB4DC\uB798\uADF8 \uB610\uB294 [\uB300\uAE30\uB85C \u21B4]\uB85C \uBC30\uCE58",collapsible:!0,collapsed:I.queue,preview:qo(d.waiting)})}
        ${f}
        ${ht({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:d.done,empty:"\uC644\uB8CC \uC5C6\uC74C",collapsible:!0,collapsed:I.done,preview:d.token_total||qo(d.done)})}
      </div>`:p`<div class="worker-lanes">
      ${f}
      ${ht({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:d.waiting,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58"})}
      ${ht({id:"worker-pane-running",lane:"running",title:`\uC2E4\uD589 \uC911 \xB7 \uC2AC\uB86F ${d.slots}`,items:d.running,live:d.running.some(y=>!y.paused),body:Bn(d.running,Date.now(),D)})}
      ${ht({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:d.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C"})}
      ${ht({id:"worker-pane-done",lane:"done",title:`\uC644\uB8CC \xB7 \uC624\uB298 ${d.done.length}`,items:d.done,empty:"\uC644\uB8CC \uC5C6\uC74C"})}
    </div>`}function Ce(d){I={...I,[d]:!I[d]},Ml(I),le()}function le(){let d=Xe();ie(Se(d),N),ie(Ke(d),m)}function Re(){let d=document.querySelector(".app-header");if(!d)return;let f=()=>{let y=Math.round(d.getBoundingClientRect().height);H.style.setProperty("--worker-ribbon-top",`${y}px`)};if(f(),typeof ResizeObserver=="function"){let y=new ResizeObserver(f);y.observe(d),q.push(()=>y.disconnect())}else window.addEventListener("resize",f),q.push(()=>window.removeEventListener("resize",f))}function He(){if(typeof window.matchMedia!="function")return;let d=window.matchMedia(Dl);F=!!d.matches;let f=y=>{let g=!!(y&&typeof y.matches=="boolean"?y.matches:d.matches);g!==F&&(F=g,le())};typeof d.addEventListener=="function"?(d.addEventListener("change",f),q.push(()=>d.removeEventListener("change",f))):typeof d.addListener=="function"&&(d.addListener(f),q.push(()=>d.removeListener(f)))}function fe(d){let f=d.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!f)return;let y=f.dataset.beadId||"",g=f.dataset.lane||"";b={bead_id:y,from_lane:g};try{d.dataTransfer?.setData("text/plain",y),d.dataTransfer&&(d.dataTransfer.effectAllowed="move")}catch{}}function Te(d){let f=d.target?.closest?.(".worker-pane");if(!f)return;let y=f.dataset.lane||"";y!=="candidate"&&y!=="queue"||(d.preventDefault(),d.dataTransfer&&(d.dataTransfer.dropEffect="move"),f.classList.add("worker-pane--drag-over"))}function Pe(d){d.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function Oe(d,f){let y=k.find(R=>R.id===d);if(!y)return;let g=k.filter(R=>R.id!==d),A=g.length;if(f){let R=f.dataset.beadId;if(R===d)return;let Y=g.findIndex(Q=>Q.id===R);Y>=0&&(A=Y)}let T=g.slice();T.splice(A,0,y),h.applyReorder(d,T,A)}function Ze(d){let f=d.target?.closest?.(".worker-pane");if(!f)return;d.preventDefault(),f.classList.remove("worker-pane--drag-over");let y=f.dataset.lane||"",g=b?.bead_id||d.dataTransfer?.getData("text/plain")||"",A=b?.from_lane||"";if(b=null,!g)return;let T=d.target?.closest?.(".worker-mini, .worker-card"),R=Array.from(f.querySelectorAll(".worker-mini, .worker-card")),Y=R.length;if(T){let Q=R.indexOf(T);Q>=0&&(Y=Q)}if(f.classList.contains("worker-pane--collapsed")&&(Y=ve()),y==="candidate"){if(A==="candidate"){Oe(g,T);return}A==="queue"&&_e(g);return}y==="queue"&&(A==="queue"?ze(g,Y):je(g,Y))}function Qe(d){x=d,Al(d),le()}function pe(d){$=d==="board"||d==="created"||d==="spec"?d:Ur,Il($),le()}function Le(d){let f=d.target?.closest?.(".worker-filter__blocked");if(f){Qe({...x,show_blocked:f.checked});return}let y=d.target?.closest?.(".worker-sort");if(y){pe(y.value||Ur);return}let g=d.target?.closest?.(".worker-slots__input");if(!g)return;let A=Number.parseInt(g.value,10);if(!Number.isFinite(A)){le();return}Me(A).then(le)}function Ae(d){return d?{runner:d.runner||void 0,model:d.model||void 0,effort:d.effort||void 0,worktree:d.worktree||void 0,status:d.status||void 0,session_id:d.session_id||void 0}:{}}function Ie(d){let f=j(),y=f.attempts?f.attempts[d]:null;D=d,E.hidden=!1,P.open({attempt_id:d,meta:Ae(y)}),le()}function L(){if(!D)return;let d=j(),f=d.attempts?d.attempts[D]:null;if(f){P.updateMeta(Ae(f));return}P.close()}function O(d){let f=d.target;if(f?.closest?.("#worker-exec-defaults-dialog"))return;if(f?.closest?.(".worker-exec-defaults-btn")){z.open();return}let y=f?.closest?.(".worker-banner__resume");if(y){let X=y.dataset.attemptId;X&&ae(X);return}let g=f?.closest?.(".worker-banner__dismiss");if(g){let X=g.dataset.attemptId;X&&it(X);return}if(f?.closest?.(".worker-play")){se(!j().auto_advance);return}let A=f?.closest?.(".worker-pane__hd--toggle");if(A){let X=A.dataset.lane;(X==="queue"||X==="done")&&Ce(X);return}let T=f?.closest?.(".worker-card__place");if(T){let X=T.dataset.beadId;X&&!T.disabled&&je(X,ve());return}let R=f?.closest?.(".worker-filter__chip");if(R){let X=R.dataset.spec;(X==="all"||X==="with"||X==="without")&&Qe({...x,spec:X});return}let Y=f?.closest?.(".worker-mini__merge");if(Y){de(Y.dataset.beadId||"");return}let Q=f?.closest?.(".worker-mini__discard");if(Q){Ve(Q.dataset.beadId||"");return}if(f?.closest?.(".worker-mini__pr"))return;if(f?.closest?.(".rtile__stop")){let ge=f?.closest?.(".rtile")?.dataset?.attemptId;ge&&$e(ge);return}if(f?.closest?.(".rtile__pause")){let ge=f?.closest?.(".rtile")?.dataset?.attemptId;ge&&Ye(ge);return}if(f?.closest?.(".rtile__resume")){let ge=f?.closest?.(".rtile")?.dataset?.attemptId;ge&&ae(ge);return}if(f?.closest?.(".rtile__info")){let ge=f?.closest?.(".rtile")?.dataset?.beadId;ge&&l&&l(ge);return}if(f?.closest?.(".worker-drawer-overlay__backdrop")){P.close();return}if(f?.closest?.(".worker-drawer-host"))return;let U=f?.closest?.(".rtile");if(U){let X=U.dataset.attemptId;X&&Ie(X);return}let he=f?.closest?.(".worker-mini, .worker-card");if(he){let X=he.dataset.beadId;if(f?.closest?.(".worker-mini__id, .worker-card__id")){X&&qt(X).then(ge=>{ge?K("\uBCF5\uC0AC\uB428","success",1200):K("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}X&&l&&l(X)}}return t.addEventListener("dragstart",fe),t.addEventListener("dragover",Te),t.addEventListener("dragleave",Pe),t.addEventListener("drop",Ze),t.addEventListener("click",O),t.addEventListener("change",Le),He(),Re(),u&&q.push(u.subscribe(le)),s&&q.push(s.subscribe(()=>{le(),L()})),le(),{load(){le()},destroy(){for(let d of q.splice(0))try{d()}catch{}t.removeEventListener("dragstart",fe),t.removeEventListener("dragover",Te),t.removeEventListener("dragleave",Pe),t.removeEventListener("drop",Ze),t.removeEventListener("click",O),t.removeEventListener("change",Le);try{P.destroy()}catch{}E.hidden=!0;try{z.destroy()}catch{}ie(p``,t)}}}function Wn(t){if(!t)return"Unknown";let e=t.split("/").filter(Boolean);return e.length>0?e[e.length-1]:"Unknown"}function Wo(t,e,r,n=async()=>{},s=async()=>{}){let o=me("views:workspace-picker"),i=null,l=!1,a=!1,u=!1;async function h(C){let m=C.target.value,P=e.getState().workspace?.current?.path||"";if(m&&m!==P){o("switching workspace to %s",m),l=!0,E();try{await r(m)}catch(z){o("workspace switch failed: %o",z)}finally{l=!1,E()}}}async function b(){let C=e.getState(),S=C.workspace?.current?.path||C.workspace?.available?.[0]?.path||"";if(!(!S||a)){o("git-pulling workspace %s",S),a=!0,E();try{await n(S)}catch(m){o("workspace git pull failed: %o",m)}finally{a=!1,E()}}}function k(C){let S=C.target;S&&t.contains(S)||I()}function x(C){C.key==="Escape"&&I()}function $(){u||(u=!0,document.addEventListener("mousedown",k),document.addEventListener("keydown",x),E())}function I(){u&&(u=!1,document.removeEventListener("mousedown",k),document.removeEventListener("keydown",x),E())}function F(){u?I():$()}async function B(C){let S=C.target,m=S.value,D=S.checked;o("toggling visibility %s \u2192 %s",m,String(D));try{await s(m,D)}catch(P){o("workspace visibility toggle failed: %o",P)}}function q(C){return C?p`
      <button
        type="button"
        class="workspace-picker__git-pull-button"
        @click=${b}
        ?disabled=${l||a}
        aria-label="Git Pull"
        title="Git Pull"
      >
        <span aria-hidden="true">⬇</span>
      </button>
    `:p``}function H(C,S){return p`
      <div class="workspace-picker__manage">
        <button
          type="button"
          class="workspace-picker__manage-button"
          @click=${F}
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
                ${C.map(m=>p`
                    <label
                      class="workspace-picker__manage-row"
                      title="${m.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${m.path}"
                        .checked=${!S.has(m.path)}
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
    `}function N(){let C=e.getState(),S=C.workspace?.current,m=C.workspace?.available||[],D=new Set(C.workspace?.hidden||[]),P=S?.path||m[0]?.path||"";if(m.length===0)return p``;let z=m.filter(j=>!D.has(j.path)||j.path===P);if(z.length<=1){let j=z[0]||m[0],ee=Wn(j.path);return p`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${j.path}"
            >${ee}</span
          >
          ${H(m,D)}
          ${q(P)}
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
          ?disabled=${l||a}
          aria-label="Select project workspace"
        >
          ${z.map(j=>p`
              <option
                value="${j.path}"
                ?selected=${j.path===P}
                title="${j.path}"
              >
                ${Wn(j.path)}
              </option>
            `)}
        </select>
        ${H(m,D)}
        ${q(P)}
        ${l||a?p`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function E(){ie(N(),t)}return E(),i=e.subscribe(()=>E()),{destroy(){i&&(i(),i=null),document.removeEventListener("mousedown",k),document.removeEventListener("keydown",x),ie(p``,t)}}}var Go=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-queue-set-slots","worker-queue-set-exec-default","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-pr-merge","worker-pr-discard","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append"];function Gn(){let t=Date.now().toString(36),e=Math.random().toString(36).slice(2,8);return`${t}-${e}`}function jo(t,e,r=Gn()){return{id:r,type:t,payload:e}}function Yo(t={}){let e=me("ws"),r={initialMs:t.backoff?.initialMs??1e3,maxMs:t.backoff?.maxMs??3e4,factor:t.backoff?.factor??2,jitterRatio:t.backoff?.jitterRatio??.2},n=()=>t.url&&t.url.length>0?t.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",i=0,l=null,a=!0,u=new Map,h=[],b=new Map,k=new Set;function x(N){for(let E of Array.from(k))try{E(N)}catch{}}function $(){if(!a||l)return;o="reconnecting",e("ws reconnecting\u2026"),x(o);let N=Math.min(r.maxMs||0,(r.initialMs||0)*Math.pow(r.factor||1,i)),E=(r.jitterRatio||0)*N,C=Math.max(0,Math.round(N+(Math.random()*2-1)*E));e("ws retry in %d ms (attempt %d)",C,i+1),l=setTimeout(()=>{l=null,H()},C)}function I(N){try{s?.send(JSON.stringify(N))}catch(E){e("ws send failed",E)}}function F(){for(o="open",e("ws open"),x(o),i=0;h.length;){let N=h.shift();N&&I(N)}}function B(N){let E;try{E=JSON.parse(String(N.data))}catch{e("ws received non-JSON message");return}if(!E||typeof E.id!="string"||typeof E.type!="string"){e("ws received invalid envelope");return}if(u.has(E.id)){let S=u.get(E.id);u.delete(E.id),E.ok?S?.resolve(E.payload):S?.reject(E.error||new Error("ws error"));return}let C=b.get(E.type);if(C&&C.size>0)for(let S of Array.from(C))try{S(E.payload)}catch(m){e("ws event handler error",m)}else e("ws received unhandled message type: %s",E.type)}function q(){o="closed",e("ws closed"),x(o);for(let[N,E]of u.entries())E.reject(new Error("ws disconnected")),u.delete(N);i+=1,$()}function H(){if(!a)return;let N=n();try{s=new WebSocket(N),e("ws connecting %s",N),o="connecting",x(o),s.addEventListener("open",F),s.addEventListener("message",B),s.addEventListener("error",()=>{}),s.addEventListener("close",q)}catch(E){e("ws connect failed %o",E),$()}}return H(),{send(N,E){if(!Go.includes(N))return Promise.reject(new Error(`unknown message type: ${N}`));let C=Gn(),S=jo(N,E,C);return e("send %s id=%s",N,C),new Promise((m,D)=>{u.set(C,{resolve:m,reject:D,type:N}),s&&s.readyState===s.OPEN?I(S):(e("queue %s id=%s (state=%s)",N,C,o),h.push(S))})},on(N,E){b.has(N)||b.set(N,new Set);let C=b.get(N);return C?.add(E),()=>{C?.delete(E)}},onConnection(N){return k.add(N),()=>{k.delete(N)}},reconnect(){a=!0,l&&(clearTimeout(l),l=null),i=0,H()},close(){a=!1,l&&(clearTimeout(l),l=null);try{s?.close()}catch{}},getState(){return o}}}function Wl(){let t=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof t?.workspace_config?.default_workspace=="string"&&t.workspace_config.default_workspace.length>0?t.workspace_config.default_workspace:null}}}async function Gl(t,e){try{let n=await(await fetch("/api/config")).json();t.setState({config:n})}catch(r){e("config refresh failed",r)}}var jn=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],Vo=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"]],Ko="worker:queue",Zo="ui:order",Xo="ui:display-policy",gt="tab:board:closed",Qo="beads-ui.board.closed-range";function jl(t){let e=me("main");e("bootstrap start");let r=p`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;ie(r,t);let n=document.getElementById("top-nav"),s=document.getElementById("board-root"),o=document.getElementById("worker-root"),i=document.getElementById("detail-panel");if(s&&o&&i){let m=function(_,w){let V="Request failed",W="";if(_&&typeof _=="object"){let ue=_;if(typeof ue.message=="string"&&ue.message.length>0&&(V=ue.message),typeof ue.details=="string")W=ue.details;else if(ue.details&&typeof ue.details=="object")try{W=JSON.stringify(ue.details,null,2)}catch{W=""}}else typeof _=="string"&&_.length>0&&(V=_);let Z=w&&w.length>0?`Failed to load ${w}`:"Request failed";S.open(Z,V,W)},se=function(_){return`${R.getState().workspace.current?.path||""}\0${_}`},Me=function(){ze&&(ze().catch(()=>{}),ze=null),_e=null,$e=null},Se=function(_){Ye=_;let w=()=>{Ye!==_||R.getState().selected_id!==_||(Ye=null,Xe(_))};if(!de){it.then(w);return}w()},Ke=function(){let _=is(Ne);return _===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:_}}},Ce=function(_){if(_)for(let[w,V]of jn){if(Ee.has(w)||be.has(w))continue;let W=w===gt?Ke():{type:V};try{j.register(w,W)}catch(Z){e("register %s store failed: %o",w,Z)}be.add(w),z.subscribeList(w,W).then(Z=>{Ee.set(w,Z)}).catch(Z=>{e("subscribe %s failed: %o",w,Z),m(Z,"board")}).finally(()=>{be.delete(w)})}else Re()},Re=function(){for(let[_]of jn){let w=Ee.get(_);w&&(w().catch(()=>{}),Ee.delete(_));try{j.unregister(_)}catch(V){e("unregister %s failed: %o",_,V)}}},Te=function(_){if(!_){Pe();return}for(let[w,V]of Vo)if(!(He.has(w)||be.has(w))){try{j.register(w,{type:V})}catch(W){e("register %s store failed: %o",w,W)}be.add(w),z.subscribeList(w,{type:V}).then(W=>{He.set(w,W)}).catch(W=>{e("subscribe %s failed: %o",w,W),m(W,"worker")}).finally(()=>{be.delete(w)})}fe||(P("subscribe-worker-queue",{id:Ko}).catch(w=>{e("subscribe-worker-queue failed: %o",w)}),fe=()=>P("unsubscribe-worker-queue",{id:Ko}))},Pe=function(){for(let[_]of Vo){let w=He.get(_);w&&(w().catch(()=>{}),He.delete(_));try{j.unregister(_)}catch(V){e("unregister %s failed: %o",_,V)}}fe&&(fe().catch(()=>{}),fe=null)},Ze=function(){Oe||(P("subscribe-ui-order",{id:Zo}).catch(_=>{e("subscribe-ui-order failed: %o",_)}),Oe=()=>P("unsubscribe-ui-order",{id:Zo}))},Qe=function(){Oe&&(Oe().catch(()=>{}),Oe=null),re.clear()},Le=function(){pe||(P("subscribe-display-policy",{id:Xo}).catch(_=>{e("subscribe-display-policy failed: %o",_)}),pe=()=>P("unsubscribe-display-policy",{id:Xo}))},Ae=function(){pe&&(pe().catch(()=>{}),pe=null),ve.clear()},y=function(_){if(!_)return"Unknown";let w=_.split("/").filter(Boolean);return w.length>0?w[w.length-1]:"Unknown"};var l=m,a=se,u=Me,h=Se,b=Ke,k=Ce,x=Re,$=Te,I=Pe,F=Ze,B=Qe,q=Le,H=Ae,N=y;let E=document.getElementById("header-loading"),C=Cs(E),S=Eo(t),D=Yo(),P=C.wrapSend((_,w)=>D.send(_,w)),z=vs(P),j=$s(),ee=Ss(),re=xs(),ve=as(),je=ls();D.on("ui-order-snapshot",_=>{let w=_;if(w&&typeof w.revision=="number")try{re.set({revision:w.revision,order:w.order&&typeof w.order=="object"?w.order:{}})}catch{}}),D.on("display-policy-snapshot",_=>{let w=_;if(w&&w.policy&&typeof w.policy=="object")try{ve.set(w.policy)}catch{}}),D.on("session-log-snapshot",_=>{let w=_;if(w&&typeof w.attempt_id=="string")try{je.set(w.attempt_id,Array.isArray(w.lines)?w.lines:[])}catch{}}),D.on("session-log-append",_=>{let w=_;if(w&&typeof w.attempt_id=="string")try{je.append(w.attempt_id,w.event)}catch{}}),D.on("snapshot",_=>{let w=_,V=w&&typeof w.id=="string"?w.id:"",W=V?j.getStore(V):null;if(W&&w&&w.type==="snapshot")try{W.applyPush(w)}catch{}}),D.on("upsert",_=>{let w=_,V=w&&typeof w.id=="string"?w.id:"",W=V?j.getStore(V):null;if(W&&w&&w.type==="upsert")try{W.applyPush(w)}catch{}}),D.on("delete",_=>{let w=_,V=w&&typeof w.id=="string"?w.id:"",W=V?j.getStore(V):null;if(W&&w&&w.type==="delete")try{W.applyPush(w)}catch{}});let ze=null,_e=null,$e=null,Ye=null,ae=()=>{},it=new Promise(_=>{ae=()=>_(void 0)}),de=!1,Ve=!1;async function Xe(_){let w=se(_);if(w===_e||w===$e)return;$e=w;let V=`detail:${_}`,W={type:"issue-detail",params:{id:_}};try{j.register(V,W)}catch(Z){e("register detail store failed: %o",Z)}try{let Z=await z.subscribeList(V,W);if(R.getState().selected_id!==_||se(_)!==w){await Z().catch(()=>{});return}ze&&await ze().catch(()=>{}),ze=Z,_e=w}catch(Z){e("detail subscribe failed: %o",Z),m(Z,"issue details")}finally{$e===w&&($e=null)}}let Ee=new Map,be=new Set,Ne=_r;try{let _=window.localStorage.getItem(Qo);en(_)&&(Ne=_)}catch{}async function le(_){if(!en(_)||_===Ne)return;Ne=_;try{window.localStorage.setItem(Qo,_)}catch{}let w=Ee.get(gt);if(!w)return;Ee.delete(gt),await w().catch(()=>{});let V=Ke();try{j.register(gt,V)}catch(W){e("register %s store failed: %o",gt,W)}try{let W=await z.subscribeList(gt,V);Ee.set(gt,W)}catch(W){e("re-subscribe %s failed: %o",gt,W),m(W,"board")}}let He=new Map,fe=null,Oe=null,pe=null;async function Ie(){pe=null,ve.clear(),fe=null;let _=R.getState().workspace.current?.path;if(_)try{await D.send("set-workspace",{path:_})}catch(w){e("workspace restore after reconnect failed: %o",w);return}Le(),Te(R.getState().view==="worker")}async function L(){e("clearing all subscriptions for workspace switch"),Re(),Pe(),ee.clear(),Qe(),Ze(),Ae(),Le(),Me();let _=R.getState();if(_.selected_id)try{j.unregister(`detail:${_.selected_id}`)}catch{}let w=R.getState();Ce(w.view==="board"),Te(w.view==="worker"),w.selected_id&&Se(w.selected_id)}async function O(_){e("requesting workspace switch to %s",_),Ve=!0;try{let w=await D.send("set-workspace",{path:_});e("workspace switch result: %o",w),w&&w.workspace&&(R.setState({workspace:{current:{path:w.workspace.root_dir,database:w.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",_),w.changed&&(await L(),K("Switched to "+y(_),"success",2e3)))}catch(w){throw e("workspace switch failed: %o",w),K("Failed to switch workspace","error",3e3),w}finally{Ve=!1}}async function d(_){e("requesting workspace git pull for %s",_);try{let w=await D.send("git-pull-workspace",{});e("workspace git pull result: %o",w);let V=w?.status;if(V==="up_to_date"){K("Already up to date","success",2e3);return}if(V==="stash_pop_conflict"){K("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}K("Git pulled "+y(_),"success",2e3)}catch(w){e("workspace git pull failed: %o",w);let V=w?.code,W=w?.message;if(V==="rebase_conflict"){K("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(V==="rebase_conflict_abort_failed"){K("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(V==="busy"){K("Git pull skipped: another operation is running","warning",3e3);return}let Z=W?`: ${W}`:"";throw K(`Git pull failed${Z}`,"error",3e3),w}}async function f(_,w){e("setting workspace visibility %s \u2192 %s",_,String(w));try{await D.send("set-workspace-visibility",{path:_,visible:w}),await g()}catch(V){e("workspace visibility update failed: %o",V),K("Failed to update project visibility","error",3e3)}}async function g(){try{let _=await D.send("list-workspaces",{});if(e("workspaces loaded: %o",_),_&&Array.isArray(_.workspaces)){let w=_.workspaces.map(ue=>({path:ue.path,database:ue.database,pid:ue.pid,version:ue.version})),V=_.current?{path:_.current.root_dir,database:_.current.db_path}:null,W=Array.isArray(_.hidden)?_.hidden.filter(ue=>typeof ue=="string"):[];R.setState({workspace:{current:V,available:w,hidden:W}});let Z=window.localStorage.getItem("beads-ui.workspace");Z&&(!w.some(bt=>bt.path===Z)||W.includes(Z)?window.localStorage.removeItem("beads-ui.workspace"):V&&Z!==V.path&&(e("restoring saved workspace preference: %s",Z),await O(Z)))}}catch(_){e("failed to load workspaces: %o",_)}}D.on("workspace-changed",_=>{e("workspace-changed event: %o",_),_&&_.root_dir&&(R.setState({workspace:{current:{path:_.root_dir,database:_.db_path}}}),g(),L())});let A=!1;if(typeof D.onConnection=="function"){let _=w=>{e("ws state %s",w),w==="reconnecting"||w==="closed"?(A=!0,K("Connection lost. Reconnecting\u2026","error",4e3)):w==="open"&&A&&(A=!1,K("Reconnected","success",2200),Gl(R,(V,W)=>{e(`${V}: %o`,W)}),Ie())};D.onConnection(_)}let T="board";try{let _=window.localStorage.getItem("beads-ui.view");(_==="board"||_==="worker")&&(T=_)}catch(_){e("view parse error: %o",_)}let R=Es({config:Wl(),view:T});D.on("worker-queue-snapshot",_=>{let w=_;if(!w||!w.queue)return;let V=R.getState().workspace.current?.path;if(typeof V=="string"&&V.length>0&&w.root_dir!==V){e("dropping worker-queue snapshot for %s",String(w.root_dir));return}try{ee.set(w.queue)}catch{}});let Y=Ts(R);Y.start();let Q=async(_,w)=>{try{return await P(_,w)}catch{return[]}};n&&Co(n,R,Y);let U=document.getElementById("workspace-picker");U&&Wo(U,R,O,d,f);let he=Do(t,(_,w)=>P(_,w));try{let _=document.getElementById("new-issue-btn");_&&_.addEventListener("click",()=>he.open())}catch{}let X=Ao(t,{policyStore:ve,transport:(_,w)=>P(_,w),labelOptions:()=>{let _=new Set;for(let[w]of jn)for(let V of j.snapshotFor(w)||[]){let W=V.labels;if(Array.isArray(W))for(let Z of W)typeof Z=="string"&&Z.length>0&&_.add(Z)}return Array.from(_).sort()}});try{let _=document.getElementById("display-settings-btn");_&&_.addEventListener("click",()=>X.open())}catch{}let ge=Ns(s,{gotoIssue:_=>Y.gotoIssue(_),issueStores:j,transport:Q,uiOrderStore:re,displayPolicyStore:ve,closedRange:Ne,onClosedRangeChange:_=>{le(_)},onNewIssue:()=>he.open()}),Ct=Hn(o,{transport:Q,issueStores:j,queueStore:ee,sessionLogStore:je,uiOrderStore:re,gotoIssue:_=>R.setState({selected_id:_}),getWorkspacePath:()=>R.getState().workspace.current?.path}),Je=So(i,{issueStores:j,transport:Q,queueStore:ee,sessionLogStore:je,getWorkspacePath:()=>R.getState().workspace.current?.path,onNavigate:_=>{R.getState().view==="worker"?R.setState({selected_id:_}):Y.gotoIssue(_)},onClose:()=>{let _=R.getState();R.setState({selected_id:null});try{Y.gotoView(_.view==="worker"?"worker":"board")}catch{}}}),mt=R.getState().selected_id;mt&&(i.hidden=!1,Je.load(mt),Se(mt)),R.subscribe(_=>{let w=_.selected_id;w?(i.hidden=!1,Je.load(w),Ve||Se(w)):(Je.clear(),i.hidden=!0,Me())});let _t=_=>{s.hidden=_.view!=="board",o.hidden=_.view!=="worker",Ce(_.view==="board"),Te(_.view==="worker"),!_.selected_id&&_.view==="board"&&ge.load(),_.view==="worker"&&Ct.load(),window.localStorage.setItem("beads-ui.view",_.view)};R.subscribe(_t),_t(R.getState()),Ze(),Le(),g().finally(()=>{de=!0,ae()}),window.addEventListener("keydown",_=>{let w=_.ctrlKey||_.metaKey,V=String(_.key||"").toLowerCase(),W=_.target,Z=W&&W.tagName?String(W.tagName).toLowerCase():"",ue=Z==="input"||Z==="textarea"||Z==="select"||W&&typeof W.isContentEditable=="boolean"&&W.isContentEditable;w&&V==="n"&&(ue||(_.preventDefault(),he.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let r=window.localStorage.getItem("beads-ui.theme"),n=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=r==="dark"||r==="light"?r:n?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let t=document.getElementById("theme-switch");t&&t.addEventListener("change",()=>{let r=t.checked?"dark":"light";document.documentElement.setAttribute("data-theme",r),window.localStorage.setItem("beads-ui.theme",r)});let e=document.getElementById("app");e&&jl(e)});export{jl as bootstrap,Wl as readBootstrapConfig,Gl as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
