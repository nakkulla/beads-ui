var rc=Object.create;var ms=Object.defineProperty;var nc=Object.getOwnPropertyDescriptor;var sc=Object.getOwnPropertyNames;var oc=Object.getPrototypeOf,ac=Object.prototype.hasOwnProperty;var ic=(e,t,r)=>t in e?ms(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var gs=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var lc=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of sc(t))!ac.call(e,s)&&s!==r&&ms(e,s,{get:()=>t[s],enumerable:!(n=nc(t,s))||n.enumerable});return e};var cc=(e,t,r)=>(r=e!=null?rc(oc(e)):{},lc(t||!e||!e.__esModule?ms(r,"default",{value:e,enumerable:!0}):r,e));var Qe=(e,t,r)=>ic(e,typeof t!="symbol"?t+"":t,r);var la=gs((If,ia)=>{var Lr=1e3,Or=Lr*60,Dr=Or*60,$r=Dr*24,_c=$r*7,mc=$r*365.25;ia.exports=function(e,t){t=t||{};var r=typeof e;if(r==="string"&&e.length>0)return gc(e);if(r==="number"&&isFinite(e))return t.long?bc(e):hc(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function gc(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var r=parseFloat(t[1]),n=(t[2]||"ms").toLowerCase();switch(n){case"years":case"year":case"yrs":case"yr":case"y":return r*mc;case"weeks":case"week":case"w":return r*_c;case"days":case"day":case"d":return r*$r;case"hours":case"hour":case"hrs":case"hr":case"h":return r*Dr;case"minutes":case"minute":case"mins":case"min":case"m":return r*Or;case"seconds":case"second":case"secs":case"sec":case"s":return r*Lr;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r;default:return}}}}function hc(e){var t=Math.abs(e);return t>=$r?Math.round(e/$r)+"d":t>=Dr?Math.round(e/Dr)+"h":t>=Or?Math.round(e/Or)+"m":t>=Lr?Math.round(e/Lr)+"s":e+"ms"}function bc(e){var t=Math.abs(e);return t>=$r?En(e,t,$r,"day"):t>=Dr?En(e,t,Dr,"hour"):t>=Or?En(e,t,Or,"minute"):t>=Lr?En(e,t,Lr,"second"):e+" ms"}function En(e,t,r,n){var s=t>=r*1.5;return Math.round(e/r)+" "+n+(s?"s":"")}});var da=gs((Lf,ca)=>{function vc(e){r.debug=r,r.default=r,r.coerce=l,r.disable=a,r.enable=s,r.enabled=i,r.humanize=la(),r.destroy=u,Object.keys(e).forEach(p=>{r[p]=e[p]}),r.names=[],r.skips=[],r.formatters={};function t(p){let m=0;for(let h=0;h<p.length;h++)m=(m<<5)-m+p.charCodeAt(h),m|=0;return r.colors[Math.abs(m)%r.colors.length]}r.selectColor=t;function r(p){let m,h=null,T,$;function E(...F){if(!E.enabled)return;let x=E,G=Number(new Date),X=G-(m||G);x.diff=X,x.prev=m,x.curr=G,m=G,F[0]=r.coerce(F[0]),typeof F[0]!="string"&&F.unshift("%O");let I=0;F[0]=F[0].replace(/%([a-zA-Z%])/g,(A,U)=>{if(A==="%%")return"%";I++;let R=r.formatters[U];if(typeof R=="function"){let oe=F[I];A=R.call(x,oe),F.splice(I,1),I--}return A}),r.formatArgs.call(x,F),(x.log||r.log).apply(x,F)}return E.namespace=p,E.useColors=r.useColors(),E.color=r.selectColor(p),E.extend=n,E.destroy=r.destroy,Object.defineProperty(E,"enabled",{enumerable:!0,configurable:!1,get:()=>h!==null?h:(T!==r.namespaces&&(T=r.namespaces,$=r.enabled(p)),$),set:F=>{h=F}}),typeof r.init=="function"&&r.init(E),E}function n(p,m){let h=r(this.namespace+(typeof m>"u"?":":m)+p);return h.log=this.log,h}function s(p){r.save(p),r.namespaces=p,r.names=[],r.skips=[];let m=(typeof p=="string"?p:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let h of m)h[0]==="-"?r.skips.push(h.slice(1)):r.names.push(h)}function o(p,m){let h=0,T=0,$=-1,E=0;for(;h<p.length;)if(T<m.length&&(m[T]===p[h]||m[T]==="*"))m[T]==="*"?($=T,E=h,T++):(h++,T++);else if($!==-1)T=$+1,E++,h=E;else return!1;for(;T<m.length&&m[T]==="*";)T++;return T===m.length}function a(){let p=[...r.names,...r.skips.map(m=>"-"+m)].join(",");return r.enable(""),p}function i(p){for(let m of r.skips)if(o(p,m))return!1;for(let m of r.names)if(o(p,m))return!0;return!1}function l(p){return p instanceof Error?p.stack||p.message:p}function u(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return r.enable(r.load()),r}ca.exports=vc});var ua=gs((At,Cn)=>{At.formatArgs=wc;At.save=kc;At.load=$c;At.useColors=yc;At.storage=xc();At.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();At.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function yc(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function wc(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+Cn.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let r=0,n=0;e[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(r++,s==="%c"&&(n=r))}),e.splice(n,0,t)}At.log=console.debug||console.log||(()=>{});function kc(e){try{e?At.storage.setItem("debug",e):At.storage.removeItem("debug")}catch{}}function $c(){let e;try{e=At.storage.getItem("debug")||At.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function xc(){try{return localStorage}catch{}}Cn.exports=da()(At);var{formatters:Sc}=Cn.exports;Sc.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var Yr=globalThis,Tn=Yr.trustedTypes,Yo=Tn?Tn.createPolicy("lit-html",{createHTML:e=>e}):void 0,Jo="$lit$",ir=`lit$${Math.random().toFixed(9).slice(2)}$`,ea="?"+ir,dc=`<${ea}>`,yr=document,Vr=()=>yr.createComment(""),Kr=e=>e===null||typeof e!="object"&&typeof e!="function",$s=Array.isArray,uc=e=>$s(e)||typeof e?.[Symbol.iterator]=="function",hs=`[ 	
\f\r]`,Gr=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Vo=/-->/g,Ko=/>/g,br=RegExp(`>|${hs}(?:([^\\s"'>=/]+)(${hs}*=${hs}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Zo=/'/g,Xo=/"/g,ta=/^(?:script|style|textarea|title)$/i,xs=e=>(t,...r)=>({_$litType$:e,strings:t,values:r}),c=xs(1),Kt=xs(2),xf=xs(3),wr=Symbol.for("lit-noChange"),pt=Symbol.for("lit-nothing"),Qo=new WeakMap,vr=yr.createTreeWalker(yr,129);function ra(e,t){if(!$s(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return Yo!==void 0?Yo.createHTML(t):t}var pc=(e,t)=>{let r=e.length-1,n=[],s,o=t===2?"<svg>":t===3?"<math>":"",a=Gr;for(let i=0;i<r;i++){let l=e[i],u,p,m=-1,h=0;for(;h<l.length&&(a.lastIndex=h,p=a.exec(l),p!==null);)h=a.lastIndex,a===Gr?p[1]==="!--"?a=Vo:p[1]!==void 0?a=Ko:p[2]!==void 0?(ta.test(p[2])&&(s=RegExp("</"+p[2],"g")),a=br):p[3]!==void 0&&(a=br):a===br?p[0]===">"?(a=s??Gr,m=-1):p[1]===void 0?m=-2:(m=a.lastIndex-p[2].length,u=p[1],a=p[3]===void 0?br:p[3]==='"'?Xo:Zo):a===Xo||a===Zo?a=br:a===Vo||a===Ko?a=Gr:(a=br,s=void 0);let T=a===br&&e[i+1].startsWith("/>")?" ":"";o+=a===Gr?l+dc:m>=0?(n.push(u),l.slice(0,m)+Jo+l.slice(m)+ir+T):l+ir+(m===-2?i:T)}return[ra(e,o+(e[r]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),n]},Zr=class e{constructor({strings:t,_$litType$:r},n){let s;this.parts=[];let o=0,a=0,i=t.length-1,l=this.parts,[u,p]=pc(t,r);if(this.el=e.createElement(u,n),vr.currentNode=this.el.content,r===2||r===3){let m=this.el.content.firstChild;m.replaceWith(...m.childNodes)}for(;(s=vr.nextNode())!==null&&l.length<i;){if(s.nodeType===1){if(s.hasAttributes())for(let m of s.getAttributeNames())if(m.endsWith(Jo)){let h=p[a++],T=s.getAttribute(m).split(ir),$=/([.?@])?(.*)/.exec(h);l.push({type:1,index:o,name:$[2],strings:T,ctor:$[1]==="."?vs:$[1]==="?"?ys:$[1]==="@"?ws:Ir}),s.removeAttribute(m)}else m.startsWith(ir)&&(l.push({type:6,index:o}),s.removeAttribute(m));if(ta.test(s.tagName)){let m=s.textContent.split(ir),h=m.length-1;if(h>0){s.textContent=Tn?Tn.emptyScript:"";for(let T=0;T<h;T++)s.append(m[T],Vr()),vr.nextNode(),l.push({type:2,index:++o});s.append(m[h],Vr())}}}else if(s.nodeType===8)if(s.data===ea)l.push({type:2,index:o});else{let m=-1;for(;(m=s.data.indexOf(ir,m+1))!==-1;)l.push({type:7,index:o}),m+=ir.length-1}o++}}static createElement(t,r){let n=yr.createElement("template");return n.innerHTML=t,n}};function Rr(e,t,r=e,n){if(t===wr)return t;let s=n!==void 0?r._$Co?.[n]:r._$Cl,o=Kr(t)?void 0:t._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(e),s._$AT(e,r,n)),n!==void 0?(r._$Co??(r._$Co=[]))[n]=s:r._$Cl=s),s!==void 0&&(t=Rr(e,s._$AS(e,t.values),s,n)),t}var bs=class{constructor(t,r){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:r},parts:n}=this._$AD,s=(t?.creationScope??yr).importNode(r,!0);vr.currentNode=s;let o=vr.nextNode(),a=0,i=0,l=n[0];for(;l!==void 0;){if(a===l.index){let u;l.type===2?u=new Xr(o,o.nextSibling,this,t):l.type===1?u=new l.ctor(o,l.name,l.strings,this,t):l.type===6&&(u=new ks(o,this,t)),this._$AV.push(u),l=n[++i]}a!==l?.index&&(o=vr.nextNode(),a++)}return vr.currentNode=yr,s}p(t){let r=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(t,n,r),r+=n.strings.length-2):n._$AI(t[r])),r++}},Xr=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,r,n,s){this.type=2,this._$AH=pt,this._$AN=void 0,this._$AA=t,this._$AB=r,this._$AM=n,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,r=this._$AM;return r!==void 0&&t?.nodeType===11&&(t=r.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,r=this){t=Rr(this,t,r),Kr(t)?t===pt||t==null||t===""?(this._$AH!==pt&&this._$AR(),this._$AH=pt):t!==this._$AH&&t!==wr&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):uc(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==pt&&Kr(this._$AH)?this._$AA.nextSibling.data=t:this.T(yr.createTextNode(t)),this._$AH=t}$(t){let{values:r,_$litType$:n}=t,s=typeof n=="number"?this._$AC(t):(n.el===void 0&&(n.el=Zr.createElement(ra(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===s)this._$AH.p(r);else{let o=new bs(s,this),a=o.u(this.options);o.p(r),this.T(a),this._$AH=o}}_$AC(t){let r=Qo.get(t.strings);return r===void 0&&Qo.set(t.strings,r=new Zr(t)),r}k(t){$s(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,n,s=0;for(let o of t)s===r.length?r.push(n=new e(this.O(Vr()),this.O(Vr()),this,this.options)):n=r[s],n._$AI(o),s++;s<r.length&&(this._$AR(n&&n._$AB.nextSibling,s),r.length=s)}_$AR(t=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);t!==this._$AB;){let n=t.nextSibling;t.remove(),t=n}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},Ir=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,r,n,s,o){this.type=1,this._$AH=pt,this._$AN=void 0,this.element=t,this.name=r,this._$AM=s,this.options=o,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=pt}_$AI(t,r=this,n,s){let o=this.strings,a=!1;if(o===void 0)t=Rr(this,t,r,0),a=!Kr(t)||t!==this._$AH&&t!==wr,a&&(this._$AH=t);else{let i=t,l,u;for(t=o[0],l=0;l<o.length-1;l++)u=Rr(this,i[n+l],r,l),u===wr&&(u=this._$AH[l]),a||(a=!Kr(u)||u!==this._$AH[l]),u===pt?t=pt:t!==pt&&(t+=(u??"")+o[l+1]),this._$AH[l]=u}a&&!s&&this.j(t)}j(t){t===pt?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},vs=class extends Ir{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===pt?void 0:t}},ys=class extends Ir{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==pt)}},ws=class extends Ir{constructor(t,r,n,s,o){super(t,r,n,s,o),this.type=5}_$AI(t,r=this){if((t=Rr(this,t,r,0)??pt)===wr)return;let n=this._$AH,s=t===pt&&n!==pt||t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive,o=t!==pt&&(n===pt||s);s&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},ks=class{constructor(t,r,n){this.element=t,this.type=6,this._$AN=void 0,this._$AM=r,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(t){Rr(this,t)}};var fc=Yr.litHtmlPolyfillSupport;fc?.(Zr,Xr),(Yr.litHtmlVersions??(Yr.litHtmlVersions=[])).push("3.3.1");var je=(e,t,r)=>{let n=r?.renderBefore??t,s=n._$litPart$;if(s===void 0){let o=r?.renderBefore??null;n._$litPart$=s=new Xr(t.insertBefore(Vr(),o),o,void 0,r??{})}return s._$AI(e),s};var Et="today",Ht=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}];function Ot(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function kr(e,t=Date.now()){switch(e){case"today":{let r=new Date(t);return r.setHours(0,0,0,0),r.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function na(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function sa(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function oa(){let e=null,t=[],r=new Set;function n(){for(let s of Array.from(r))try{s()}catch{}}return{get(){return e},getWorkspacesState(){return t},set(s,o){e=Array.isArray(s)?s:null,t=Array.isArray(o)?o:[],n()},clear(){e=null,t=[],n()},subscribe(s){return r.add(s),()=>r.delete(s)}}}function aa(){let e=new Map,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{set(n,s,o=null){e.set(n,{lines:Array.isArray(s)?[...s]:[],last_event_at:typeof o=="number"?o:null}),r()},append(n,s){let o=e.get(n)||{lines:[],last_event_at:null};o.lines=[...o.lines,s],o.last_event_at=Date.now(),e.set(n,o),r()},get(n){return e.get(n)||null},clear(n){typeof n=="string"?e.delete(n):e.clear(),r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}var pa=cc(ua(),1);function at(e){return(0,pa.default)(`beads-ui:${e}`)}function Nt(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function xr(e,t){let r=Nt(e.created_at),n=Nt(t.created_at);if(r!==n)return r<n?1:-1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function ma(e,t){let r=Nt(e.created_at),n=Nt(t.created_at);if(r!==n)return r<n?-1:1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function ga(e,t){let r=Nt(e.updated_at),n=Nt(t.updated_at);if(r!==n)return r<n?1:-1;let s=e.id,o=t.id;return s<o?-1:s>o?1:0}function ha(e,t){let r=e.priority??2,n=t.priority??2;if(r!==n)return r-n;let s=Nt(e.created_at),o=Nt(t.created_at);if(s!==o)return s<o?1:-1;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function ba(e,t){let r=e.closed_at??0,n=t.closed_at??0;if(r!==n)return r<n?1:-1;let s=e?.id,o=t?.id;return s<o?-1:s>o?1:0}var Ac=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function fa(e){let t=e&&e.metadata,r=t?t.task_order:void 0;if(r==null||r==="")return Number.POSITIVE_INFINITY;let n=Number(r);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function _a(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let r=Ac.exec(t);if(!r)return Number.POSITIVE_INFINITY;let n=Number(r[1]);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function va(e,t){let r=fa(e),n=fa(t);if(r!==n)return r<n?-1:1;let s=_a(e),o=_a(t);if(s!==o)return s<o?-1:1;let a=Nt(e&&e.created_at),i=Nt(t&&t.created_at);if(a!==i)return a<i?-1:1;let l=e&&e.id,u=t&&t.id;return l===u?0:String(l)<String(u)?-1:1}var Ss=2**20;function Mr(e,t){let r=e&&e.id;return t&&typeof r=="string"&&Object.prototype.hasOwnProperty.call(t,r)&&typeof t[r]=="number"&&Number.isFinite(t[r])?t[r]:-Nt(e&&e.created_at)}function Rn(e){return(t,r)=>{let n=Mr(t,e),s=Mr(r,e);if(n!==s)return n<s?-1:1;let o=t?.id,a=r?.id;return o<a?-1:o>a?1:0}}function As(e,t,r){let n=Array.isArray(e)?e:[],s=n.length,o=Math.max(0,Math.min(t,s-1)),a=o-1>=0?n[o-1]:null,i=o+1<s?n[o+1]:null;if(!a&&!i)return{rank:0};if(!a)return{rank:Mr(i,r)-Ss};if(!i)return{rank:Mr(a,r)+Ss};let l=Mr(a,r),u=Mr(i,r),p=(l+u)/2;return l<p&&p<u?{rank:p}:{renormalize:n.map((m,h)=>({bead_id:m.id,rank:h*Ss}))}}function Ts(e,t={}){let r=at(`issue-store:${e}`),n=new Map,s=[],o=0,a=new Set,i=!1,l=t.sort||xr;function u(){for(let h of Array.from(a))try{h()}catch{}}function p(){s=Array.from(n.values()).sort(l)}function m(h){if(i||!h||h.id!==e)return;let T=Number(h.revision)||0;if(r("apply %s rev=%d",h.type,T),!(T<=o&&h.type!=="snapshot")){if(h.type==="snapshot"){if(T<=o)return;n.clear();let $=Array.isArray(h.issues)?h.issues:[];for(let E of $)E&&typeof E.id=="string"&&E.id.length>0&&n.set(E.id,E);p(),o=T,u();return}if(h.type==="upsert"){let $=h.issue;if($&&typeof $.id=="string"&&$.id.length>0){let E=n.get($.id);if(!E)n.set($.id,$);else{let F=Number.isFinite(E.updated_at)?E.updated_at:0,x=Number.isFinite($.updated_at)?$.updated_at:0;if(F<=x){for(let G of Object.keys(E))G in $||delete E[G];for(let[G,X]of Object.entries($))E[G]=X}}p()}o=T,u()}else if(h.type==="delete"){let $=String(h.issue_id||"");$&&(n.delete($),p()),o=T,u()}}}return{id:e,subscribe(h){return a.add(h),()=>{a.delete(h)}},applyPush:m,snapshot(){return s},size(){return n.size},getById(h){return n.get(h)},dispose(){i=!0,n.clear(),s=[],a.clear(),o=0}}}function In(e){let t=String(e.type||"").trim(),r={};if(e.params&&typeof e.params=="object"){let s=Object.keys(e.params).sort();for(let o of s){let a=e.params[o];r[o]=String(a)}}let n=new URLSearchParams(r).toString();return n.length>0?`${t}?${n}`:t}function ya(e){let t=at("subs"),r=new Map,n=new Map;function s(i,l){t("applyDelta %s +%d ~%d -%d",i,(l.added||[]).length,(l.updated||[]).length,(l.removed||[]).length);let u=n.get(i);if(!u||u.size===0)return;let p=Array.isArray(l.added)?l.added:[],m=Array.isArray(l.updated)?l.updated:[],h=Array.isArray(l.removed)?l.removed:[];for(let T of Array.from(u)){let $=r.get(T);if(!$)continue;let E=$.itemsById;for(let F of p)typeof F=="string"&&F.length>0&&E.set(F,!0);for(let F of m)typeof F=="string"&&F.length>0&&E.set(F,!0);for(let F of h)typeof F=="string"&&F.length>0&&E.delete(F)}}async function o(i,l){let u=In(l);if(t("subscribe %s key=%s",i,u),!r.has(i))r.set(i,{key:u,itemsById:new Map});else{let m=r.get(i);if(m&&m.key!==u){let h=n.get(m.key);h&&(h.delete(i),h.size===0&&n.delete(m.key)),r.set(i,{key:u,itemsById:new Map})}}n.has(u)||n.set(u,new Set);let p=n.get(u);p&&p.add(i);try{await e("subscribe-list",{id:i,type:l.type,params:l.params})}catch(m){let h=r.get(i)||null;if(h){let T=n.get(h.key);T&&(T.delete(i),T.size===0&&n.delete(h.key))}throw r.delete(i),m}return async()=>{t("unsubscribe %s key=%s",i,u);try{await e("unsubscribe-list",{id:i})}catch{}let m=r.get(i)||null;if(m){let h=n.get(m.key);h&&(h.delete(i),h.size===0&&n.delete(m.key))}r.delete(i)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:In,selectors:{getIds(i){let l=r.get(i);return l?Array.from(l.itemsById.keys()):[]},has(i,l){let u=r.get(i);return u?u.itemsById.has(l):!1},count(i){let l=r.get(i);return l?l.itemsById.size:0},getItemsById(i){let l=r.get(i),u={};if(!l)return u;for(let p of l.itemsById.keys())u[p]=!0;return u}}}}function wa(){let e=at("issue-stores"),t=new Map,r=new Map,n=new Set,s=new Map;function o(){for(let l of Array.from(n))try{l()}catch{}}function a(l,u,p){let m=u?In(u):"",h=r.get(l)||"",T=t.has(l);if(e("register %s key=%s (prev=%s)",l,m,h),T&&h&&m&&h!==m){let $=t.get(l);if($)try{$.dispose()}catch{}let E=s.get(l);if(E){try{E()}catch{}s.delete(l)}let F=Ts(l,p);t.set(l,F);let x=F.subscribe(()=>o());s.set(l,x)}else if(!T){let $=Ts(l,p);t.set(l,$);let E=$.subscribe(()=>o());s.set(l,E)}return r.set(l,m),()=>i(l)}function i(l){e("unregister %s",l),r.delete(l);let u=t.get(l);u&&(u.dispose(),t.delete(l));let p=s.get(l);if(p){try{p()}catch{}s.delete(l)}}return{register:a,unregister:i,getStore(l){return t.get(l)||null},snapshotFor(l){let u=t.get(l);return u?u.snapshot().slice():[]},subscribe(l){return n.add(l),()=>n.delete(l)}}}function ka(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function $a(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Es(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function Tc(e){let t=String(e||""),r=t.startsWith("#")?t.slice(1):t,n=r.indexOf("?"),s=n>=0?r.slice(n+1):"";if(s){let i=new URLSearchParams(s).get("issue");if(i)return decodeURIComponent(i)}let o=/^\/issue\/([^\s?#]+)/.exec(r);return o&&o[1]?decodeURIComponent(o[1]):null}function Ec(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function xa(e){let t=at("router"),r=()=>{let n=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(n),o=s&&s[1]?decodeURIComponent(s[1]):Tc(n),a=Ec(n);if(t("hash change \u2192 view=%s id=%s",a,o),e.setState({selected_id:a==="worker"?null:o,view:a,worker:{selected_parent_id:a==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(n)){let l=o?`#/${a}?issue=${encodeURIComponent(o)}`:`#/${a}`;window.location.hash!==l&&(window.location.hash=l)}};return{start(){window.addEventListener("hashchange",r),r()},stop(){window.removeEventListener("hashchange",r)},gotoIssue(n){let s=e.getState?e.getState():{view:"board"},o=s.view==="worker"||s.view==="monitor"?s.view:"board",a=Es(o,n);t("goto issue %s (view=%s)",n,o),window.location.hash!==a?window.location.hash=a:e.setState({selected_id:o==="worker"?null:n,view:o,worker:{selected_parent_id:o==="worker"?n:null}})},gotoView(n){let s=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},o=n==="worker"?s.worker?.selected_parent_id:s.selected_id,a=o?Es(n,o):`#/${n}`;t("goto view %s (id=%s)",n,o||""),window.location.hash!==a?window.location.hash=a:e.setState({view:n,selected_id:n==="worker"?null:s.selected_id})}}}var Cc=Object.freeze({workspace_config:{default_workspace:null}});function Sa(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:Cc.workspace_config.default_workspace}}}function Aa(e={}){let t=at("state"),r={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:Sa(e.config)},n=new Set;function s(){for(let o of Array.from(n))try{o(r)}catch{}}return{getState(){return r},setState(o){let a={...r,...o,filters:{...r.filters,...o.filters||{}},board:{...r.board,...o.board||{}},worker:{...r.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:r.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:r.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:r.workspace.hidden},config:o.config!==void 0?Sa(o.config):r.config},i=a.workspace.current?.path!==r.workspace.current?.path||a.workspace.available.length!==r.workspace.available.length||a.workspace.hidden.length!==r.workspace.hidden.length||a.workspace.hidden.some((u,p)=>u!==r.workspace.hidden[p]),l=a.config.workspace_config.default_workspace!==r.config.workspace_config.default_workspace;a.selected_id===r.selected_id&&a.view===r.view&&a.filters.status===r.filters.status&&a.filters.search===r.filters.search&&a.filters.type===r.filters.type&&a.board.closed_filter===r.board.closed_filter&&a.worker.selected_parent_id===r.worker.selected_parent_id&&a.worker.show_closed_children.length===r.worker.show_closed_children.length&&a.worker.show_closed_children.every((u,p)=>u===r.worker.show_closed_children[p])&&!i&&!l||(r=a,t("state change %o",{selected_id:r.selected_id,view:r.view,filters:r.filters,board:r.board,worker:r.worker,workspace:r.workspace.current?.path,config:{default_workspace:r.config.workspace_config.default_workspace}}),s())},subscribe(o){return n.add(o),()=>n.delete(o)}}}function Ta(e){let t=at("activity"),r=0,n=new Map,s=1;function o(){if(!e)return;let u=r>0;e.toggleAttribute("hidden",!u),e.setAttribute("aria-busy",u?"true":"false")}function a(){r+=1,t("start count=%d",r),o()}function i(){let u=r;r=Math.max(0,r-1),u<=0?t("done called but count was already %d",u):t("done count=%d\u2192%d",u,r),o()}function l(u){return async(m,h)=>{let T=s++,$=Date.now();n.set(T,{type:m,start_ts:$}),t("request start id=%d type=%s count=%d",T,m,r+1),a();let E=!1,F=()=>{E||(E=!0,n.delete(T),i())},x=setTimeout(()=>{E||(t("request TIMEOUT id=%d type=%s elapsed=%dms",T,m,Date.now()-$),F())},3e4);try{let G=await u(m,h),X=Date.now()-$;return t("request done id=%d type=%s elapsed=%dms",T,m,X),G}catch(G){let X=Date.now()-$;throw t("request error id=%d type=%s elapsed=%dms err=%o",T,m,X,G),G}finally{clearTimeout(x),F()}}}return o(),{wrapSend:l,start:a,done:i,getCount:()=>r,getActiveRequests:()=>{let u=Date.now();return Array.from(n.entries()).map(([p,m])=>({id:p,type:m.type,elapsed_ms:u-m.start_ts}))}}}function K(e,t="info",r=2800){let n=document.createElement("div");n.className="toast",n.textContent=e,n.style.position="fixed",n.style.right="12px",n.style.bottom="12px",n.style.zIndex="1000",n.style.color="#fff",n.style.padding="8px 10px",n.style.borderRadius="4px",n.style.fontSize="12px",t==="success"?n.style.background="#156d36":t==="warning"?n.style.background="#a36a00":t==="error"?n.style.background="#9f2011":n.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(n),setTimeout(()=>{try{n.remove()}catch{}},r)}function Ln(e=void 0,t=void 0){function r(){if(!t||typeof t.get!="function")return null;let o=t.get();return o&&o.order?o.order:{}}function n(o,a,i){let l=e&&e.snapshotFor?e.snapshotFor(o).slice():[];if(a==="closed")return l.sort(ba),l;switch(i){case"created_desc":return l.sort(xr),l;case"created_asc":return l.sort(ma),l;case"updated_desc":return l.sort(ga),l;case"priority":return l.sort(ha),l;case"manual":default:{let u=r();return u?l.sort(Rn(u)):l.sort(xr),l}}}function s(o){let a=[];return e&&typeof e.subscribe=="function"&&a.push(e.subscribe(o)),t&&typeof t.subscribe=="function"&&a.push(t.subscribe(o)),()=>{for(let i of a)try{i()}catch{}}}return{selectBoardColumn:n,subscribe:s}}function Zt(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function Tt(e){let t=Zt(e);if(t===null)return"";let r=new Date(t),n=s=>String(s).padStart(2,"0");return`${r.getFullYear()}-${n(r.getMonth()+1)}-${n(r.getDate())} ${n(r.getHours())}:${n(r.getMinutes())}`}function Ct(e,t){let r=Zt(e);if(r===null)return"";let s=(typeof t=="number"?t:Date.now())-r;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let a=Math.floor(s/36e5);if(a<24)return`${a}\uC2DC\uAC04 \uC804`;let i=Math.floor(s/864e5);if(i<7)return`${i}\uC77C \uC804`;let l=Math.floor(i/7);if(i<30)return`${l}\uC8FC \uC804`;let u=Math.floor(i/30);return u<12?`${u}\uAC1C\uC6D4 \uC804`:`${Math.floor(i/365)}\uB144 \uC804`}function On(e){if(!Array.isArray(e))return null;let t=null,r=-1;for(let n of e){if(!n||n.status!=="in_progress")continue;let s=Zt(n.updated_at)??0;if(t===null||s>r){t=n,r=s;continue}s===r&&String(n.id)<String(t.id)&&(t=n)}return t}function Dn(e){let t=e.transport,r=e.uiOrderStore;function n(a,i){return"renormalize"in a?a.renormalize:[{bead_id:i,rank:a.rank}]}function s(a,i){let l={...a.order};for(let u of i)l[u.bead_id]=u.rank;r&&r.set({revision:a.revision,order:l})}async function o(a,i,l){if(!t||!r)return;let u=r.get()||{revision:0,order:{}},p=n(As(i,l,u.order),a);s(u,p);let m=await t("ui-order-set",{expected_revision:u.revision,entries:p});if(m&&m.conflict){let h={revision:typeof m.revision=="number"?m.revision:0,order:m.order||{}};r.set(h);let T=n(As(i,l,h.order),a);s(h,T);let $=await t("ui-order-set",{expected_revision:h.revision,entries:T});$&&$.applied&&r.set({revision:typeof $.revision=="number"?$.revision:0,order:$.order||{}})}else m&&m.applied&&r.set({revision:typeof m.revision=="number"?m.revision:0,order:m.order||{}})}return{applyReorder:o}}function Mn(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Cs(e,t){return!t||typeof e!="string"||e.length===0||Mn(t.visible_labels).includes(e)?!0:Mn(t.hidden_labels).includes(e)?!1:!Mn(t.hidden_prefixes).some(r=>r.length>0&&e.startsWith(r))}function Pn(e,t){return Mn(e).filter(r=>Cs(r,t))}function lr(e,t){let r=e&&e.chips?e.chips[t]:void 0;return typeof r=="boolean"?r:!0}var Rc={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},Ca={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},Ea={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},Ic={review:"\u2713",skip:"\u2298"},cr={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function Lc(e,t,r){if(!(r==="in_progress"||r==="resolved"))return null;for(let s of e){let o=t[s];if(o&&o.fill==="dim"&&o.stale!==!0)return s}return null}function Ra(e){let t=e&&e.fill||"none";return t==="none"?cr.none:e&&e.stale===!0?cr.stale:t==="dim"?cr.dim:e&&e.glyph==="review"?cr.review:e&&e.glyph==="skip"?cr.skip:cr.done}function Oc(e){if(!e||e.fill==="none"||!e.approval_state)return Ra(e);let t=[];return e.glyph==="review"?t.push(cr.review):e.glyph==="skip"&&t.push(cr.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function Dc(e,t,r){let n=Rc[e]||e,s=t&&t.fill||"none",o=!!t&&t.stale===!0,a=Ic[t&&t.glyph||""]||"",i="bar";s==="dim"?i+=` b-${n} dim`:s==="full"&&(i+=` b-${n} full`),o&&(i+=" stale"),r&&(i+=" cur");let l=s==="none"?"lbl":`lbl l-${n} on`,u=r?`color: var(--stage-${n}-on)`:"";return c`
    <div class="seg">
      <div class=${i} style=${u}>${a}</div>
      <div class=${l}>
        ${Ca[e]||e}
      </div>
    </div>
  `}function Nn(e,t){if(!e||!e.stages)return"";let r=Ea[e.route]||Ea.spec_backed,n=e.stages,s=Lc(r,n,String(t||"open")),o=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${r.map(a=>`${Ca[a]||a} ${a==="plan"?Oc(n[a]||{}):Ra(n[a]||{})}`).join(" \xB7 ")}`;return c`
    <div class="stp" role="img" aria-label=${o}>
      ${r.map(a=>Dc(a,n[a]||{},a===s))}
    </div>
  `}function Mc(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var Ia=2;function Pc(e){if(!e)return[];let t=[];if(e.external){let n=e.reason?`\u23F8 blocked: ${e.reason}`:"\u23F8 blocked";t.push(c`<span class="ctl-chip ctl-chip--blocked">${n}</span>`)}let r=Array.isArray(e.blockers)?e.blockers:[];if(r.length>0){let n=r.slice(0,Ia).join(", "),s=r.length-Ia,o=`\u26D3 blocked: ${n}${s>0?` +${s}`:""}`;t.push(c`<span class="ctl-chip ctl-chip--blocked-dep">${o}</span>`)}return t}function Nc(e,t){let r=t.policy||null,n=e.workflow&&e.workflow.chips||{},s=[];if(n.route&&lr(r,"route")){let a=n.route_source==="derived";s.push(c`<span
        class="ctl-chip ctl-chip--route${a?" is-derived":""}"
        title=${a?"route \uBBF8\uD540 (metadata unset)":"route"}
        >${a?"unset":n.route}</span
      >`)}if(n.fast_track&&lr(r,"fast_track")&&s.push(c`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),n.pr&&lr(r,"pr")){let a=n.pr.number;s.push(c`<span class="ctl-chip ctl-chip--pr"
        >${`PR${a!=null?` #${a}`:""}`}</span
      >`)}for(let a of Pn(e.labels,r))s.push(c`<span class="ctl-chip ctl-chip--label">${a}</span>`);return e.from_id&&lr(r,"from")&&s.push(c`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${a=>{a.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(a,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),lr(r,"blocked")&&s.push(...Pc(e.blocked_info)),t.cleanupFailureFor&&t.cleanupFailureFor(e.id)&&lr(r,"blocked")&&s.push(c`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 실패</span>`),s.length===0?"":c`<div class="board-card__chips">${s}</div>`}function Fc(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function qc(e){let t=Ct(e.created_at),r=Ct(e.updated_at);return!t&&!r?"":c`<span class="board-card__times">
    ${t?c`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${Tt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}
    ${t&&r?c`<span class="board-card__time-sep">·</span>`:""}
    ${r?c`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${Tt(e.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </span>`}function Bc(e,t){let r=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]},n=r.total||0,s=t.isExpanded?t.isExpanded(e.id):!0,o=n>0?r.children.slice().sort(va):r.children;return c`
    <div class="board-card__roll">
      <div class="board-card__roll-meta">
        ${n>0?c`<button
              type="button"
              class="board-card__roll-toggle"
              aria-expanded=${s?"true":"false"}
              @click=${a=>t.onRollupToggle&&t.onRollupToggle(a,e.id)}
            >
              children ${r.count}/${n} ${s?"\u25B4":"\u25BE"}
            </button>`:c`<span class="board-card__roll-none">children 없음</span>`}
        ${qc(e)}
      </div>
      ${n>0&&r.current?c`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${r.current.title||r.current.id}</span
            >
          </div>`:""}
      ${s&&n>0?c`<div class="board-card__roll-list">
            ${o.map((a,i)=>c`<button
                  type="button"
                  class="board-card__roll-child"
                  @click=${l=>t.onChildClick&&t.onChildClick(l,a.id)}
                >
                  <span class=${Fc(a.status)}>●</span>
                  <span class="board-card__roll-child-ord">${i+1}</span>
                  <span class="board-card__roll-child-title"
                    >${a.title||a.id}</span
                  >
                </button>`)}
          </div>`:""}
    </div>
  `}function Fn(e,t){let r=Mc(e.priority);return c`
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
        ${r?c`<span class="board-card__pri">${r}</span>`:""}
      </div>
      <div class="board-card__title">${e.title||"(\uC81C\uBAA9 \uC5C6\uC74C)"}</div>
      ${Nc(e,t)}
      ${e.workflow&&lr(t.policy||null,"stepper")?Nn(e.workflow,e.status):""}
      ${Bc(e,t)}
    </article>
  `}function Pr(e,t){let r=Array.isArray(e.items)?e.items.length:0,n=e.is_closed===!0;return c`
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
        ${n?c`<select
              class="board-column__closed-range"
              aria-label="Closed period"
              @change=${t.onClosedRangeChange}
            >
              ${Ht.map(o=>c`<option
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
        ${e.items.map(o=>Fn(o,t))}
      </div>
    </section>
  `}function La(e,t,r){return c`
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
          ${e.items.length===0?c`<div class="deferred-popup__empty">Deferred 이슈 없음</div>`:e.items.map(n=>Fn(n,t))}
        </div>
      </div>
    </dialog>
  `}var Uc=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],jc=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],zc=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function Hc(e,t,r){let n=e.labels.length,s=n>0?`\uB77C\uBCA8 ${n}`:"\uB77C\uBCA8";return c`
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
      ${r.label_menu_open?c`<div class="board-filter__label-menu" role="group">
            ${r.label_options.length===0?c`<div class="board-filter__label-empty">라벨 없음</div>`:r.label_options.map(o=>c`<label class="board-filter__label-row">
                      <input
                        type="checkbox"
                        .checked=${e.labels.includes(o)}
                        @change=${()=>t.onLabelToggle(o)}
                      />
                      <span>${o}</span>
                    </label>`)}
            ${n>0?c`<button
                  type="button"
                  class="board-filter__label-clear"
                  @click=${t.onLabelClear}
                >
                  선택 해제
                </button>`:""}
          </div>`:""}
    </div>
  `}function Oa(e,t,r){return c`
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
        ${Uc.map(n=>c`<option
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
        ${jc.map(n=>c`<option
              value=${n.value}
              ?selected=${e.type===n.value}
            >
              ${n.label}
            </option>`)}
      </select>
      ${Hc(e,t,r)}
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
        ${zc.map(n=>c`<option
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
  `}var Wc=200,Gc={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},Yc=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),Da="beads-ui.board.sort",Ma=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function Vc(){try{let e=window.localStorage.getItem(Da);if(e&&Ma.has(e))return e}catch{}return"created_desc"}function Pa(e,t){let r=at("views:board"),n=t.gotoIssue,s=t.issueStores,o=t.transport,a=t.uiOrderStore,i=t.displayPolicyStore,l=t.workerQueueStore,u=t.onClosedRangeChange,p=t.onNewIssue,m=t.closedRange||Et,h=s?Ln(s,a):null,T=Dn({transport:o,uiOrderStore:a}),$=[],E=[],F=[],x=[],G=[],X=[],I=!1,O=0,A=Vc(),U=new Map,R=new Map,oe=new Map,Ce=new Set,ne={search:"",priority:"",type:"",labels:[]},me=!1,Oe=null;function Ve(N){return String(N.status||"open")==="open"}function st(N){let Y=String(N.status||"open");return Y==="open"||Y==="blocked"}function Pe(N){let Y=ne.search.trim().toLowerCase(),se=ne.priority,pe=ne.type,$e=ne.labels;return N.filter(Ee=>{if(Y){let Ge=String(Ee.id||"").toLowerCase(),et=String(Ee.title||"").toLowerCase();if(!Ge.includes(Y)&&!et.includes(Y))return!1}if(se!==""&&String(Ee.priority)!==se||pe!==""&&String(Ee.issue_type||"")!==pe)return!1;if($e.length>0){let Ge=Array.isArray(Ee.labels)?Ee.labels:[];if(!$e.some(et=>Ge.includes(et)))return!1}return!0})}function De(){let N=new Set;for(let Y of[$,E,F,x,G,X])for(let se of Y){let pe=Array.isArray(se.labels)?se.labels:[];for(let $e of pe)typeof $e=="string"&&$e.length>0&&N.add($e)}return Array.from(N).sort()}function Ae(){return ne.search.trim()!==""||ne.priority!==""||ne.type!==""||ne.labels.length>0}function ge(){try{if(h){let N=h.selectBoardColumn("tab:board:in-progress","in_progress",A),Y=h.selectBoardColumn("tab:board:blocked","blocked",A).filter(st),se=new Set(N.map(Se=>Se.id)),pe=h.selectBoardColumn("tab:board:ready","ready",A).filter(Se=>Ve(Se)&&!se.has(Se.id)),$e=h.selectBoardColumn("tab:board:resolved","resolved",A),Ee=h.selectBoardColumn("tab:board:deferred","deferred",A),Ge=h.selectBoardColumn("tab:board:closed","closed").slice(0,Wc),et=[...Y,...pe,...N,...$e,...Ge];ve(et);let Te=new Set;for(let Se of et)Se&&Se.id&&!Rs(Se)&&Te.add(Se.id);let Ke=!Ae();$=Ke?Qr(Y,Te):Y,E=Ke?Qr(pe,Te):pe,F=Ke?Qr(N,Te):N,x=Ke?Qr($e,Te):$e,G=Ee,O=Ee.length,X=Ke?Qr(Ge,Te):Ge,U=new Map;for(let Se of $)U.set(Se.id,"open");for(let Se of E)U.set(Se.id,"open");for(let Se of F)U.set(Se.id,"in_progress");for(let Se of x)U.set(Se.id,"resolved");for(let Se of G)U.set(Se.id,"deferred");for(let Se of X)U.set(Se.id,"closed");R=new Map;for(let Se of $)R.set(Se.id,"blocked-col");for(let Se of E)R.set(Se.id,"ready-col");for(let Se of F)R.set(Se.id,"in-progress-col");for(let Se of x)R.set(Se.id,"resolved-col");for(let Se of X)R.set(Se.id,"closed-col")}He()}catch{$=[],E=[],F=[],x=[],G=[],X=[],oe=new Map,He()}}function ve(N){let Y=new Map;for(let pe of N)pe&&pe.id&&!Y.has(pe.id)&&Y.set(pe.id,pe);let se=new Map;for(let pe of Y.values()){let $e=Rs(pe);if(!$e)continue;let Ee=se.get($e);Ee||(Ee=[],se.set($e,Ee)),Ee.push({id:pe.id,title:pe.title,status:pe.status,metadata:pe.metadata,created_at:pe.created_at,updated_at:pe.updated_at})}oe=se}function he(N){let Y=oe.get(N)||[],se=0;for(let $e of Y)($e.status==="resolved"||$e.status==="closed")&&(se+=1);let pe=On(Y);return{total:Y.length,count:se,current:pe,children:Y}}function V(N){return!Ce.has(N)}function W(N,Y){N.preventDefault(),N.stopPropagation(),Ce.has(Y)?Ce.delete(Y):Ce.add(Y),He()}function _e(N,Y){N.preventDefault(),N.stopPropagation(),n(Y)}function Z(N,Y){N.preventDefault(),N.stopPropagation(),n(Y)}function ye(N,Y){Oe||n(Y)}function j(N,Y){N.preventDefault(),N.stopPropagation(),Kc(Y).then(se=>{se&&K("\uBCF5\uC0AC\uB428","success",1200)})}function P(N,Y){Oe=Y,N.dataTransfer&&(N.dataTransfer.setData("text/plain",Y),N.dataTransfer.effectAllowed="move"),N.target.classList.add("board-card--dragging")}function ce(N){N.target.classList.remove("board-card--dragging"),It(),setTimeout(()=>{Oe=null},0)}function we(N){let Y=String(N.target.value||"");!Y||Y===m||(m=Y,u&&u(Y),He())}function ke(){return i?i.get():null}function Ue(N){let Y=l?l.get():null,se=Y?Y.cleanup_failed:null;if(!se||typeof se!="object"||Array.isArray(se))return null;let pe=se[N];return!pe||typeof pe!="object"||Array.isArray(pe)?null:pe}let Re={onCardClick:ye,onCopyId:j,onDragStart:P,onDragEnd:ce,onClosedRangeChange:we,rollupFor:he,isExpanded:V,onRollupToggle:W,onChildClick:_e,onFromChipClick:Z,cleanupFailureFor:Ue,get policy(){return ke()}};function ze(N,Y){Oe||(Q(),n(Y))}function Ne(N,Y){N.preventDefault(),N.stopPropagation(),Q(),n(Y)}let tt={...Re,onCardClick:ze,onChildClick:Ne,onFromChipClick:Ne,get policy(){return ke()}};function D(N){let Y=N.target,se=e.querySelector(".board-filter__labels");Y&&se&&se.contains(Y)||C()}function b(N){N.key==="Escape"&&C()}function S(){me||(me=!0,document.addEventListener("mousedown",D),document.addEventListener("keydown",b),He())}function C(){me&&(me=!1,document.removeEventListener("mousedown",D),document.removeEventListener("keydown",b),He())}function H(N){N.key==="Escape"&&Q()}function q(){I||(I=!0,document.addEventListener("keydown",H),He())}function Q(){I&&(I=!1,document.removeEventListener("keydown",H),He())}let ue={onClose:Q,onOverlayClick(N){N.target===N.currentTarget&&Q()}},Ie={onSearchInput(N){ne.search=String(N.target.value||""),ge()},onPriorityChange(N){ne.priority=String(N.target.value||""),ge()},onTypeChange(N){ne.type=String(N.target.value||""),ge()},onSortChange(N){let Y=String(N.target.value||"");if(!(!Ma.has(Y)||Y===A)){A=Y;try{window.localStorage.setItem(Da,Y)}catch{}ge()}},onDeferredToggle(){I?Q():q()},onLabelMenuToggle(){me?C():S()},onLabelToggle(N){let Y=ne.labels.indexOf(N);Y===-1?ne.labels.push(N):ne.labels.splice(Y,1),ge()},onLabelClear(){ne.labels.length!==0&&(ne.labels=[],ge())},onNewIssue(){p&&p()}};function Je(){return c`
      <div class="board-view">
        ${Oa(ne,Ie,{sort_mode:A,deferred_popup_open:I,deferred_count:O,label_options:De(),label_menu_open:me})}
        <div class="board-root">
          ${Pr({title:"Blocked",id:"blocked-col",items:Pe($)},Re)}
          ${Pr({title:"Ready",id:"ready-col",items:Pe(E)},Re)}
          ${Pr({title:"In progress",id:"in-progress-col",items:Pe(F)},Re)}
          ${Pr({title:"Resolved",id:"resolved-col",items:Pe(x)},Re)}
          ${Pr({title:"Closed",id:"closed-col",items:Pe(X),is_closed:!0,closed_range:m},Re)}
        </div>
        ${I?La({items:Pe(G),count:O},tt,ue):""}
      </div>
    `}function He(){je(Je(),e),dt()}function dt(){try{let N=e.querySelector("#deferred-popup");N&&!N.open&&(typeof N.showModal=="function"?N.showModal():N.setAttribute("open",""));let Y=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let se of Y)Array.from(se.querySelectorAll(".board-card")).forEach(($e,Ee)=>{$e.tabIndex=Ee===0?0:-1})}catch{}}async function it(N,Y){if(!o){K("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:N,status:Y}),K("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(se){r("update-status failed: %o",se),K("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function ot(N){switch(N){case"blocked-col":return $;case"ready-col":return E;case"in-progress-col":return F;case"resolved-col":return x;default:return[]}}function vt(N,Y,se){if(!o||!a)return;let pe=ot(N),$e=pe.find(Ke=>Ke.id===Y);if(!$e)return;let Ee=pe.filter(Ke=>Ke.id!==Y),Ge=se.closest?se.closest(".board-card"):null,et=Ee.length;if(Ge){let Ke=Ge.getAttribute("data-issue-id");if(Ke===Y)return;let Se=Ee.findIndex(ft=>ft.id===Ke);Se>=0&&(et=Se)}let Te=Ee.slice();Te.splice(et,0,$e),T.applyReorder(Y,Te,et)}function It(){for(let N of Array.from(e.querySelectorAll(".board-column--drag-over")))N.classList.remove("board-column--drag-over")}let rt=null;e.addEventListener("dragover",N=>{N.preventDefault(),N.dataTransfer&&(N.dataTransfer.dropEffect="move");let se=N.target.closest(".board-column");se&&se!==rt&&(rt&&rt.classList.remove("board-column--drag-over"),se.classList.add("board-column--drag-over"),rt=se)}),e.addEventListener("dragleave",N=>{let Y=N.relatedTarget;(!Y||!e.contains(Y))&&rt&&(rt.classList.remove("board-column--drag-over"),rt=null)}),e.addEventListener("drop",N=>{N.preventDefault(),rt&&(rt.classList.remove("board-column--drag-over"),rt=null);let Y=N.target,se=Y.closest(".board-column");if(!se)return;let pe=N.dataTransfer?.getData("text/plain")||"";if(!pe)return;let $e=se.id,Ee=R.get(pe);if(Ee&&Ee===$e){if(Yc.has($e)){if(A!=="manual"){K("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}vt($e,pe,Y)}return}let Ge=Gc[$e];if(!Ge){K("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}U.get(pe)!==Ge&&it(pe,Ge)}),e.addEventListener("keydown",N=>{let Y=N.target;if(!(Y instanceof HTMLElement))return;let se=String(Y.tagName||"").toLowerCase();if(se==="input"||se==="textarea"||se==="select"||se==="button"||se==="a"||Y.isContentEditable===!0)return;let pe=Y.closest(".board-card");if(!pe)return;let $e=String(N.key||"");if($e==="Enter"||$e===" "){N.preventDefault();let Te=pe.getAttribute("data-issue-id");Te&&n(Te);return}if($e!=="ArrowUp"&&$e!=="ArrowDown"&&$e!=="ArrowLeft"&&$e!=="ArrowRight")return;N.preventDefault();let Ee=pe.closest(".board-column");if(!Ee)return;let Ge=Array.from(Ee.querySelectorAll(".board-card")),et=Ge.indexOf(pe);if($e==="ArrowDown"&&et<Ge.length-1){lt(pe,Ge[et+1]);return}if($e==="ArrowUp"&&et>0){lt(pe,Ge[et-1]);return}if($e==="ArrowLeft"||$e==="ArrowRight"){let Te=Array.from(e.querySelectorAll(".board-column")),Ke=Te.indexOf(Ee),Se=$e==="ArrowRight"?1:-1,ft=Ke+Se;for(;ft>=0&&ft<Te.length;){let bt=Te[ft].querySelector(".board-card");if(bt){lt(pe,bt);return}ft+=Se}}});function lt(N,Y){try{N.tabIndex=-1,Y.tabIndex=0,Y.focus()}catch{}}let nt=null;h&&h.subscribe&&(nt=h.subscribe(()=>{try{ge()}catch{}}));let ut=null;i&&i.subscribe&&(ut=i.subscribe(()=>{try{ge()}catch{}}));let Me=null;return l&&l.subscribe&&(Me=l.subscribe(()=>{He()})),{async load(){r("load"),ge()},clear(){C(),Q(),nt&&(nt(),nt=null),ut&&(ut(),ut=null),Me&&(Me(),Me=null),e.replaceChildren(),$=[],E=[],F=[],x=[],G=[],X=[],U=new Map,R=new Map}}}function Rs(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function Qr(e,t){return e.filter(r=>{let n=Rs(r);return!(n&&t.has(n))})}async function Kc(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let r=!1;try{r=document.execCommand("copy")}finally{t.remove()}return r}catch{return!1}}async function Sr(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let r=document.createElement("textarea");r.value=t,r.style.position="fixed",r.style.left="-9999px",document.body.appendChild(r),r.select();let n=!1;try{n=document.execCommand("copy")}finally{r.remove()}return n}catch{return!1}}function Wt(e){return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,e.speed==="fast"?"Fast":null].filter(Boolean).join(" \xB7 ")}function dr(e){return typeof e.resumed_from!="string"||e.resumed_from.length===0?null:`${e.continuation_mode==="session"?"session \uC774\uC5B4\uBC1B\uC74C":e.continuation_mode==="fresh"?"\uC0C8 session\uC73C\uB85C \uC774\uC5B4\uBC1B\uC74C":"\uC774\uC804 attempt\uC5D0\uC11C \uC774\uC5B4\uBC1B\uC74C"} (from ${e.resumed_from})`}function Zc(e,t=document){let r=t.createElement("dialog");r.className="continuation-dialog";let n=t.createElement("button"),s=t.createElement("button"),o=t.createElement("button"),a=t.createElement("h2"),i=t.createElement("p");return a.textContent="\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4",i.textContent=`${Wt(e.prior||{})||"\uC774\uC804 \uC124\uC815"} \u2192 ${Wt(e.current||{})||"\uD604\uC7AC \uC124\uC815"}`,n.type="button",n.textContent="\uAE30\uC874 session \uC774\uC5B4\uD558\uAE30",n.disabled=e.prior_available===!1,s.type="button",s.textContent="\uD604\uC7AC preset\uC73C\uB85C \uC0C8 session",o.type="button",o.textContent="\uCDE8\uC18C",r.append(a,i,n,s,o),t.body.append(r),new Promise(l=>{let u=p=>{typeof r.close=="function"&&r.close(),r.remove(),l(p)};n.addEventListener("click",()=>u("prior_session")),s.addEventListener("click",()=>u("fresh_current")),o.addEventListener("click",()=>u(null)),r.addEventListener("cancel",p=>{p.preventDefault(),u(null)}),typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")})}async function Xt(e,t,r={}){let n=e;for(r.onResult?.(n);n?.continuation_mismatch;){let s=n.continuation_mismatch,o=await Zc(s);if(o===null)return n;n=await t(o,s.decision_token),r.onResult?.(n),n?.conflict&&r.refresh&&(n=await r.refresh(n),r.onResult?.(n))}return n}var Ua="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function mt(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var Qt=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],Jr=[...Qt,"reasoning_output_tokens"],Xc=["implementation","review-consult"];function Is(e){let t=0;for(let r of Qt)t+=mt(e?.[r]);return t}function Qc(e){return!e||typeof e!="object"?!1:Qt.some(t=>Number.isFinite(e[t]))}function Na(e){return!e||typeof e!="object"?!1:Jr.some(t=>Number.isFinite(e[t]))}function Jc(e){let t={};for(let r of Jr)e&&Number.isFinite(e[r])&&(t[r]=e[r]);return t}function Fa(e){let t={};for(let r of Jr)Number.isFinite(e[r])&&(t[r]=e[r]);return e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function qa(e,t){return e==="codex"?mt(t.input_tokens)+mt(t.output_tokens):Is(t)}function ed(e){return e==="claude"?"Claude":"Codex"}function td(e){return`\u03C4 ${ja(e)}`}function rd(e,t){let r=t.breakdown||{},n=[`\uC785\uB825 ${mt(r.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${mt(r.output_tokens).toLocaleString("en-US")}`];e==="claude"?n.push(`\uCE90\uC2DC\uC77D\uAE30 ${mt(r.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${mt(r.cache_creation_input_tokens).toLocaleString("en-US")}`):(n.push(`\uCE90\uC2DC\uC77D\uAE30 ${mt(r.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${mt(r.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(r.reasoning_output_tokens)&&n.push(`\uCD94\uB860\uCD9C\uB825 ${mt(r.reasoning_output_tokens).toLocaleString("en-US")}`));let o=[e==="claude"?"Claude subtotal = \uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"Codex subtotal = \uC785\uB825 + \uCD9C\uB825; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset",`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,n.join(" \xB7 ")];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&o.push(`$${t.total_cost_usd.toFixed(2)}`),t.replayed&&o.push(Ua),o.join(`
`)}function ht(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let r of["claude","codex"]){let n=e.providers[r];n&&t.push({provider:r,label:`${ed(r)} ${td(n.subtotal)}${typeof n.total_cost_usd=="number"&&Number.isFinite(n.total_cost_usd)?` \xB7 $${n.total_cost_usd.toFixed(2)}`:""}`,tooltip:rd(r,n)})}return t}function Bn(e){let t={},r={claude:!0,codex:!1},n={claude:0,codex:0};for(let s of e)if(!(!s||!s.providers))for(let o of["claude","codex"]){let a=s.providers[o];if(!a)continue;let i=t[o];i||(i={subtotal:0,breakdown:{}},t[o]=i),i.subtotal+=a.subtotal;for(let l of Jr)Number.isFinite(a.breakdown[l])&&(i.breakdown[l]=mt(i.breakdown[l])+mt(a.breakdown[l]));a.replayed&&(i.replayed=!0),o==="claude"&&(typeof a.total_cost_usd=="number"&&Number.isFinite(a.total_cost_usd)?n.claude+=a.total_cost_usd:r.claude=!1)}return t.claude&&r.claude&&(t.claude.total_cost_usd=n.claude),Object.keys(t).length===0?null:{providers:t,roles:{}}}function Ls(e){return!e||typeof e!="object"?null:Dt({attempt:{...e,bead_id:"__attempt__"}},"__attempt__")}function nd(e){return e==="codex"?"codex":"claude"}function ur(){return{subtotal:0,breakdown:Jc(null),legs:[],replayed:!1,outer_count:0,outer_cost:0,outer_cost_count:0}}function qn(e,t,r){e.subtotal+=t.subtotal;for(let n of Jr)Number.isFinite(t.usage[n])&&(e.breakdown[n]=mt(e.breakdown[n])+mt(t.usage[n]));e.legs.push(t),t.replayed===!0&&(e.replayed=!0),r&&(e.outer_count+=1,typeof t.usage.total_cost_usd=="number"&&Number.isFinite(t.usage.total_cost_usd)&&(e.outer_cost+=t.usage.total_cost_usd,e.outer_cost_count+=1))}function Ba(e,t){let r={subtotal:e.subtotal,breakdown:e.breakdown};return t&&(r.legs=e.legs),e.replayed&&(r.replayed=!0),r}function ja(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function Nr(e){return Qc(e)?`\u03C4 ${ja(Is(e))}`:null}function Ft(e){let t=Nr(e);if(!t)return null;let r=e?.total_cost_usd;return typeof r=="number"&&Number.isFinite(r)?`${t} \xB7 $${r.toFixed(2)}`:t}function Fr(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${mt(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${mt(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${mt(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${mt(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let r=[`\uCD1D ${Is(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&r.push(Ua),r.join(`
`)}function Dt(e,t){let r={claude:ur(),codex:ur()},n={orchestrator:{claude:ur(),codex:ur()},implementation:{claude:ur(),codex:ur()},"review-consult":{claude:ur(),codex:ur()}},s=new Set;for(let i of Object.values(e||{})){if(!i||i.bead_id!==t)continue;let l=i.usage;if(Na(l)){let p=nd(i.runner),m=Fa(l),h={provider:p,role:"orchestrator",attempt_id:String(i.attempt_id||""),usage:m,subtotal:qa(p,m)};m.replayed===!0&&(h.replayed=!0),typeof i.model=="string"&&(h.model=i.model),typeof i.session_id=="string"&&(h.session_id=i.session_id),qn(r[p],h,!0),qn(n.orchestrator[p],h,!0)}let u=Array.isArray(i.usage_legs)?i.usage_legs:[];for(let p of u){if(!p||p.provider!=="codex"||!Xc.includes(p.role)||!Na(p.usage))continue;let m=typeof p.receipt_id=="string"&&p.receipt_id.length>0?p.receipt_id:null;if(!m||s.has(m))continue;s.add(m);let h=Fa(p.usage),T={provider:"codex",role:p.role,attempt_id:String(i.attempt_id||""),usage:h,subtotal:qa("codex",h)};T.receipt_id=m,typeof p.model=="string"&&(T.model=p.model),typeof p.session_id=="string"?T.session_id=p.session_id:typeof p.thread_id=="string"&&(T.session_id=p.thread_id),typeof p.turn_id=="string"&&(T.turn_id=p.turn_id),typeof p.completed_at=="string"&&(T.completed_at=p.completed_at),h.replayed===!0&&(T.replayed=!0),qn(r.codex,T,!1),qn(n[T.role].codex,T,!1)}}let o={};for(let i of["claude","codex"]){let l=r[i];if(l.legs.length===0)continue;let u=Ba(l,!1);i==="claude"&&l.outer_count>0&&l.outer_cost_count===l.outer_count&&(u.total_cost_usd=l.outer_cost),o[i]=u}if(Object.keys(o).length===0)return null;let a={};for(let i of["orchestrator","implementation","review-consult"]){let l={};for(let u of["claude","codex"]){let p=n[i][u];p.legs.length>0&&(l[u]={...Ba(p,!0),legs:p.legs})}Object.keys(l).length>0&&(a[i]=l)}return{providers:o,roles:a}}var{entries:Xa,setPrototypeOf:za,isFrozen:sd,getPrototypeOf:od,getOwnPropertyDescriptor:ad}=Object,{freeze:kt,seal:Mt,create:qs}=Object,{apply:Bs,construct:Us}=typeof Reflect<"u"&&Reflect;kt||(kt=function(t){return t});Mt||(Mt=function(t){return t});Bs||(Bs=function(t,r){for(var n=arguments.length,s=new Array(n>2?n-2:0),o=2;o<n;o++)s[o-2]=arguments[o];return t.apply(r,s)});Us||(Us=function(t){for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return new t(...n)});var Un=$t(Array.prototype.forEach),id=$t(Array.prototype.lastIndexOf),Ha=$t(Array.prototype.pop),en=$t(Array.prototype.push),ld=$t(Array.prototype.splice),zn=$t(String.prototype.toLowerCase),Os=$t(String.prototype.toString),Ds=$t(String.prototype.match),tn=$t(String.prototype.replace),cd=$t(String.prototype.indexOf),dd=$t(String.prototype.trim),qt=$t(Object.prototype.hasOwnProperty),wt=$t(RegExp.prototype.test),rn=ud(TypeError);function $t(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return Bs(e,t,n)}}function ud(e){return function(){for(var t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];return Us(e,r)}}function Fe(e,t){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:zn;za&&za(e,null);let n=t.length;for(;n--;){let s=t[n];if(typeof s=="string"){let o=r(s);o!==s&&(sd(t)||(t[n]=o),s=o)}e[s]=!0}return e}function pd(e){for(let t=0;t<e.length;t++)qt(e,t)||(e[t]=null);return e}function Jt(e){let t=qs(null);for(let[r,n]of Xa(e))qt(e,r)&&(Array.isArray(n)?t[r]=pd(n):n&&typeof n=="object"&&n.constructor===Object?t[r]=Jt(n):t[r]=n);return t}function nn(e,t){for(;e!==null;){let n=ad(e,t);if(n){if(n.get)return $t(n.get);if(typeof n.value=="function")return $t(n.value)}e=od(e)}function r(){return null}return r}var Wa=kt(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Ms=kt(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Ps=kt(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),fd=kt(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Ns=kt(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),_d=kt(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Ga=kt(["#text"]),Ya=kt(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),Fs=kt(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Va=kt(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),jn=kt(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),md=Mt(/\{\{[\w\W]*|[\w\W]*\}\}/gm),gd=Mt(/<%[\w\W]*|[\w\W]*%>/gm),hd=Mt(/\$\{[\w\W]*/gm),bd=Mt(/^data-[\-\w.\u00B7-\uFFFF]+$/),vd=Mt(/^aria-[\-\w]+$/),Qa=Mt(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),yd=Mt(/^(?:\w+script|data):/i),wd=Mt(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Ja=Mt(/^html$/i),kd=Mt(/^[a-z][.\w]*(-[.\w]+)+$/i),Ka=Object.freeze({__proto__:null,ARIA_ATTR:vd,ATTR_WHITESPACE:wd,CUSTOM_ELEMENT:kd,DATA_ATTR:bd,DOCTYPE_NAME:Ja,ERB_EXPR:gd,IS_ALLOWED_URI:Qa,IS_SCRIPT_OR_DATA:yd,MUSTACHE_EXPR:md,TMPLIT_EXPR:hd}),sn={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},$d=function(){return typeof window>"u"?null:window},xd=function(t,r){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let n=null,s="data-tt-policy-suffix";r&&r.hasAttribute(s)&&(n=r.getAttribute(s));let o="dompurify"+(n?"#"+n:"");try{return t.createPolicy(o,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},Za=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function ei(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:$d(),t=le=>ei(le);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==sn.document||!e.Element)return t.isSupported=!1,t;let{document:r}=e,n=r,s=n.currentScript,{DocumentFragment:o,HTMLTemplateElement:a,Node:i,Element:l,NodeFilter:u,NamedNodeMap:p=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:m,DOMParser:h,trustedTypes:T}=e,$=l.prototype,E=nn($,"cloneNode"),F=nn($,"remove"),x=nn($,"nextSibling"),G=nn($,"childNodes"),X=nn($,"parentNode");if(typeof a=="function"){let le=r.createElement("template");le.content&&le.content.ownerDocument&&(r=le.content.ownerDocument)}let I,O="",{implementation:A,createNodeIterator:U,createDocumentFragment:R,getElementsByTagName:oe}=r,{importNode:Ce}=n,ne=Za();t.isSupported=typeof Xa=="function"&&typeof X=="function"&&A&&A.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:me,ERB_EXPR:Oe,TMPLIT_EXPR:Ve,DATA_ATTR:st,ARIA_ATTR:Pe,IS_SCRIPT_OR_DATA:De,ATTR_WHITESPACE:Ae,CUSTOM_ELEMENT:ge}=Ka,{IS_ALLOWED_URI:ve}=Ka,he=null,V=Fe({},[...Wa,...Ms,...Ps,...Ns,...Ga]),W=null,_e=Fe({},[...Ya,...Fs,...Va,...jn]),Z=Object.seal(qs(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),ye=null,j=null,P=Object.seal(qs(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),ce=!0,we=!0,ke=!1,Ue=!0,Re=!1,ze=!0,Ne=!1,tt=!1,D=!1,b=!1,S=!1,C=!1,H=!0,q=!1,Q="user-content-",ue=!0,Ie=!1,Je={},He=null,dt=Fe({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),it=null,ot=Fe({},["audio","video","img","source","image","track"]),vt=null,It=Fe({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),rt="http://www.w3.org/1998/Math/MathML",lt="http://www.w3.org/2000/svg",nt="http://www.w3.org/1999/xhtml",ut=nt,Me=!1,N=null,Y=Fe({},[rt,lt,nt],Os),se=Fe({},["mi","mo","mn","ms","mtext"]),pe=Fe({},["annotation-xml"]),$e=Fe({},["title","style","font","a","script"]),Ee=null,Ge=["application/xhtml+xml","text/html"],et="text/html",Te=null,Ke=null,Se=r.createElement("form"),ft=function(v){return v instanceof RegExp||v instanceof Function},bt=function(){let v=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(Ke&&Ke===v)){if((!v||typeof v!="object")&&(v={}),v=Jt(v),Ee=Ge.indexOf(v.PARSER_MEDIA_TYPE)===-1?et:v.PARSER_MEDIA_TYPE,Te=Ee==="application/xhtml+xml"?Os:zn,he=qt(v,"ALLOWED_TAGS")?Fe({},v.ALLOWED_TAGS,Te):V,W=qt(v,"ALLOWED_ATTR")?Fe({},v.ALLOWED_ATTR,Te):_e,N=qt(v,"ALLOWED_NAMESPACES")?Fe({},v.ALLOWED_NAMESPACES,Os):Y,vt=qt(v,"ADD_URI_SAFE_ATTR")?Fe(Jt(It),v.ADD_URI_SAFE_ATTR,Te):It,it=qt(v,"ADD_DATA_URI_TAGS")?Fe(Jt(ot),v.ADD_DATA_URI_TAGS,Te):ot,He=qt(v,"FORBID_CONTENTS")?Fe({},v.FORBID_CONTENTS,Te):dt,ye=qt(v,"FORBID_TAGS")?Fe({},v.FORBID_TAGS,Te):Jt({}),j=qt(v,"FORBID_ATTR")?Fe({},v.FORBID_ATTR,Te):Jt({}),Je=qt(v,"USE_PROFILES")?v.USE_PROFILES:!1,ce=v.ALLOW_ARIA_ATTR!==!1,we=v.ALLOW_DATA_ATTR!==!1,ke=v.ALLOW_UNKNOWN_PROTOCOLS||!1,Ue=v.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Re=v.SAFE_FOR_TEMPLATES||!1,ze=v.SAFE_FOR_XML!==!1,Ne=v.WHOLE_DOCUMENT||!1,b=v.RETURN_DOM||!1,S=v.RETURN_DOM_FRAGMENT||!1,C=v.RETURN_TRUSTED_TYPE||!1,D=v.FORCE_BODY||!1,H=v.SANITIZE_DOM!==!1,q=v.SANITIZE_NAMED_PROPS||!1,ue=v.KEEP_CONTENT!==!1,Ie=v.IN_PLACE||!1,ve=v.ALLOWED_URI_REGEXP||Qa,ut=v.NAMESPACE||nt,se=v.MATHML_TEXT_INTEGRATION_POINTS||se,pe=v.HTML_INTEGRATION_POINTS||pe,Z=v.CUSTOM_ELEMENT_HANDLING||{},v.CUSTOM_ELEMENT_HANDLING&&ft(v.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(Z.tagNameCheck=v.CUSTOM_ELEMENT_HANDLING.tagNameCheck),v.CUSTOM_ELEMENT_HANDLING&&ft(v.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(Z.attributeNameCheck=v.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),v.CUSTOM_ELEMENT_HANDLING&&typeof v.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(Z.allowCustomizedBuiltInElements=v.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Re&&(we=!1),S&&(b=!0),Je&&(he=Fe({},Ga),W=[],Je.html===!0&&(Fe(he,Wa),Fe(W,Ya)),Je.svg===!0&&(Fe(he,Ms),Fe(W,Fs),Fe(W,jn)),Je.svgFilters===!0&&(Fe(he,Ps),Fe(W,Fs),Fe(W,jn)),Je.mathMl===!0&&(Fe(he,Ns),Fe(W,Va),Fe(W,jn))),v.ADD_TAGS&&(typeof v.ADD_TAGS=="function"?P.tagCheck=v.ADD_TAGS:(he===V&&(he=Jt(he)),Fe(he,v.ADD_TAGS,Te))),v.ADD_ATTR&&(typeof v.ADD_ATTR=="function"?P.attributeCheck=v.ADD_ATTR:(W===_e&&(W=Jt(W)),Fe(W,v.ADD_ATTR,Te))),v.ADD_URI_SAFE_ATTR&&Fe(vt,v.ADD_URI_SAFE_ATTR,Te),v.FORBID_CONTENTS&&(He===dt&&(He=Jt(He)),Fe(He,v.FORBID_CONTENTS,Te)),ue&&(he["#text"]=!0),Ne&&Fe(he,["html","head","body"]),he.table&&(Fe(he,["tbody"]),delete ye.tbody),v.TRUSTED_TYPES_POLICY){if(typeof v.TRUSTED_TYPES_POLICY.createHTML!="function")throw rn('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof v.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw rn('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');I=v.TRUSTED_TYPES_POLICY,O=I.createHTML("")}else I===void 0&&(I=xd(T,s)),I!==null&&typeof O=="string"&&(O=I.createHTML(""));kt&&kt(v),Ke=v}},sr=Fe({},[...Ms,...Ps,...fd]),jt=Fe({},[...Ns,..._d]),f=function(v){let z=X(v);(!z||!z.tagName)&&(z={namespaceURI:ut,tagName:"template"});let ee=zn(v.tagName),qe=zn(z.tagName);return N[v.namespaceURI]?v.namespaceURI===lt?z.namespaceURI===nt?ee==="svg":z.namespaceURI===rt?ee==="svg"&&(qe==="annotation-xml"||se[qe]):!!sr[ee]:v.namespaceURI===rt?z.namespaceURI===nt?ee==="math":z.namespaceURI===lt?ee==="math"&&pe[qe]:!!jt[ee]:v.namespaceURI===nt?z.namespaceURI===lt&&!pe[qe]||z.namespaceURI===rt&&!se[qe]?!1:!jt[ee]&&($e[ee]||!sr[ee]):!!(Ee==="application/xhtml+xml"&&N[v.namespaceURI]):!1},w=function(v){en(t.removed,{element:v});try{X(v).removeChild(v)}catch{F(v)}},L=function(v,z){try{en(t.removed,{attribute:z.getAttributeNode(v),from:z})}catch{en(t.removed,{attribute:null,from:z})}if(z.removeAttribute(v),v==="is")if(b||S)try{w(z)}catch{}else try{z.setAttribute(v,"")}catch{}},re=function(v){let z=null,ee=null;if(D)v="<remove></remove>"+v;else{let de=Ds(v,/^[\r\n\t ]+/);ee=de&&de[0]}Ee==="application/xhtml+xml"&&ut===nt&&(v='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+v+"</body></html>");let qe=I?I.createHTML(v):v;if(ut===nt)try{z=new h().parseFromString(qe,Ee)}catch{}if(!z||!z.documentElement){z=A.createDocument(ut,"template",null);try{z.documentElement.innerHTML=Me?O:qe}catch{}}let Xe=z.body||z.documentElement;return v&&ee&&Xe.insertBefore(r.createTextNode(ee),Xe.childNodes[0]||null),ut===nt?oe.call(z,Ne?"html":"body")[0]:Ne?z.documentElement:Xe},fe=function(v){return U.call(v.ownerDocument||v,v,u.SHOW_ELEMENT|u.SHOW_COMMENT|u.SHOW_TEXT|u.SHOW_PROCESSING_INSTRUCTION|u.SHOW_CDATA_SECTION,null)},be=function(v){return v instanceof m&&(typeof v.nodeName!="string"||typeof v.textContent!="string"||typeof v.removeChild!="function"||!(v.attributes instanceof p)||typeof v.removeAttribute!="function"||typeof v.setAttribute!="function"||typeof v.namespaceURI!="string"||typeof v.insertBefore!="function"||typeof v.hasChildNodes!="function")},ae=function(v){return typeof i=="function"&&v instanceof i};function ie(le,v,z){Un(le,ee=>{ee.call(t,v,z,Ke)})}let Le=function(v){let z=null;if(ie(ne.beforeSanitizeElements,v,null),be(v))return w(v),!0;let ee=Te(v.nodeName);if(ie(ne.uponSanitizeElement,v,{tagName:ee,allowedTags:he}),ze&&v.hasChildNodes()&&!ae(v.firstElementChild)&&wt(/<[/\w!]/g,v.innerHTML)&&wt(/<[/\w!]/g,v.textContent)||v.nodeType===sn.progressingInstruction||ze&&v.nodeType===sn.comment&&wt(/<[/\w]/g,v.data))return w(v),!0;if(!(P.tagCheck instanceof Function&&P.tagCheck(ee))&&(!he[ee]||ye[ee])){if(!ye[ee]&&_t(ee)&&(Z.tagNameCheck instanceof RegExp&&wt(Z.tagNameCheck,ee)||Z.tagNameCheck instanceof Function&&Z.tagNameCheck(ee)))return!1;if(ue&&!He[ee]){let qe=X(v)||v.parentNode,Xe=G(v)||v.childNodes;if(Xe&&qe){let de=Xe.length;for(let _=de-1;_>=0;--_){let d=E(Xe[_],!0);d.__removalCount=(v.__removalCount||0)+1,qe.insertBefore(d,x(v))}}}return w(v),!0}return v instanceof l&&!f(v)||(ee==="noscript"||ee==="noembed"||ee==="noframes")&&wt(/<\/no(script|embed|frames)/i,v.innerHTML)?(w(v),!0):(Re&&v.nodeType===sn.text&&(z=v.textContent,Un([me,Oe,Ve],qe=>{z=tn(z,qe," ")}),v.textContent!==z&&(en(t.removed,{element:v.cloneNode()}),v.textContent=z)),ie(ne.afterSanitizeElements,v,null),!1)},ct=function(v,z,ee){if(H&&(z==="id"||z==="name")&&(ee in r||ee in Se))return!1;if(!(we&&!j[z]&&wt(st,z))){if(!(ce&&wt(Pe,z))){if(!(P.attributeCheck instanceof Function&&P.attributeCheck(z,v))){if(!W[z]||j[z]){if(!(_t(v)&&(Z.tagNameCheck instanceof RegExp&&wt(Z.tagNameCheck,v)||Z.tagNameCheck instanceof Function&&Z.tagNameCheck(v))&&(Z.attributeNameCheck instanceof RegExp&&wt(Z.attributeNameCheck,z)||Z.attributeNameCheck instanceof Function&&Z.attributeNameCheck(z,v))||z==="is"&&Z.allowCustomizedBuiltInElements&&(Z.tagNameCheck instanceof RegExp&&wt(Z.tagNameCheck,ee)||Z.tagNameCheck instanceof Function&&Z.tagNameCheck(ee))))return!1}else if(!vt[z]){if(!wt(ve,tn(ee,Ae,""))){if(!((z==="src"||z==="xlink:href"||z==="href")&&v!=="script"&&cd(ee,"data:")===0&&it[v])){if(!(ke&&!wt(De,tn(ee,Ae,"")))){if(ee)return!1}}}}}}}return!0},_t=function(v){return v!=="annotation-xml"&&Ds(v,ge)},St=function(v){ie(ne.beforeSanitizeAttributes,v,null);let{attributes:z}=v;if(!z||be(v))return;let ee={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:W,forceKeepAttr:void 0},qe=z.length;for(;qe--;){let Xe=z[qe],{name:de,namespaceURI:_,value:d}=Xe,k=Te(de),y=d,M=de==="value"?y:dd(y);if(ee.attrName=k,ee.attrValue=M,ee.keepAttr=!0,ee.forceKeepAttr=void 0,ie(ne.uponSanitizeAttribute,v,ee),M=ee.attrValue,q&&(k==="id"||k==="name")&&(L(de,v),M=Q+M),ze&&wt(/((--!?|])>)|<\/(style|title|textarea)/i,M)){L(de,v);continue}if(k==="attributename"&&Ds(M,"href")){L(de,v);continue}if(ee.forceKeepAttr)continue;if(!ee.keepAttr){L(de,v);continue}if(!Ue&&wt(/\/>/i,M)){L(de,v);continue}Re&&Un([me,Oe,Ve],xe=>{M=tn(M,xe," ")});let J=Te(v.nodeName);if(!ct(J,k,M)){L(de,v);continue}if(I&&typeof T=="object"&&typeof T.getAttributeType=="function"&&!_)switch(T.getAttributeType(J,k)){case"TrustedHTML":{M=I.createHTML(M);break}case"TrustedScriptURL":{M=I.createScriptURL(M);break}}if(M!==y)try{_?v.setAttributeNS(_,de,M):v.setAttribute(de,M),be(v)?w(v):Ha(t.removed)}catch{L(de,v)}}ie(ne.afterSanitizeAttributes,v,null)},yt=function le(v){let z=null,ee=fe(v);for(ie(ne.beforeSanitizeShadowDOM,v,null);z=ee.nextNode();)ie(ne.uponSanitizeShadowNode,z,null),Le(z),St(z),z.content instanceof o&&le(z.content);ie(ne.afterSanitizeShadowDOM,v,null)};return t.sanitize=function(le){let v=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},z=null,ee=null,qe=null,Xe=null;if(Me=!le,Me&&(le="<!-->"),typeof le!="string"&&!ae(le))if(typeof le.toString=="function"){if(le=le.toString(),typeof le!="string")throw rn("dirty is not a string, aborting")}else throw rn("toString is not a function");if(!t.isSupported)return le;if(tt||bt(v),t.removed=[],typeof le=="string"&&(Ie=!1),Ie){if(le.nodeName){let d=Te(le.nodeName);if(!he[d]||ye[d])throw rn("root node is forbidden and cannot be sanitized in-place")}}else if(le instanceof i)z=re("<!---->"),ee=z.ownerDocument.importNode(le,!0),ee.nodeType===sn.element&&ee.nodeName==="BODY"||ee.nodeName==="HTML"?z=ee:z.appendChild(ee);else{if(!b&&!Re&&!Ne&&le.indexOf("<")===-1)return I&&C?I.createHTML(le):le;if(z=re(le),!z)return b?null:C?O:""}z&&D&&w(z.firstChild);let de=fe(Ie?le:z);for(;qe=de.nextNode();)Le(qe),St(qe),qe.content instanceof o&&yt(qe.content);if(Ie)return le;if(b){if(S)for(Xe=R.call(z.ownerDocument);z.firstChild;)Xe.appendChild(z.firstChild);else Xe=z;return(W.shadowroot||W.shadowrootmode)&&(Xe=Ce.call(n,Xe,!0)),Xe}let _=Ne?z.outerHTML:z.innerHTML;return Ne&&he["!doctype"]&&z.ownerDocument&&z.ownerDocument.doctype&&z.ownerDocument.doctype.name&&wt(Ja,z.ownerDocument.doctype.name)&&(_="<!DOCTYPE "+z.ownerDocument.doctype.name+`>
`+_),Re&&Un([me,Oe,Ve],d=>{_=tn(_,d," ")}),I&&C?I.createHTML(_):_},t.setConfig=function(){let le=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};bt(le),tt=!0},t.clearConfig=function(){Ke=null,tt=!1},t.isValidAttribute=function(le,v,z){Ke||bt({});let ee=Te(le),qe=Te(v);return ct(ee,qe,z)},t.addHook=function(le,v){typeof v=="function"&&en(ne[le],v)},t.removeHook=function(le,v){if(v!==void 0){let z=id(ne[le],v);return z===-1?void 0:ld(ne[le],z,1)[0]}return Ha(ne[le])},t.removeHooks=function(le){ne[le]=[]},t.removeAllHooks=function(){ne=Za()},t}var ti=ei();var ri={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},ni=e=>(...t)=>({_$litDirective$:e,values:t}),Hn=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,r,n){this._$Ct=t,this._$AM=r,this._$Ci=n}_$AS(t,r){return this.update(t,r)}update(t,r){return this.render(...r)}};var on=class extends Hn{constructor(t){if(super(t),this.it=pt,t.type!==ri.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===pt||t==null)return this._t=void 0,this.it=t;if(t===wr)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let r=[t];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}};on.directiveName="unsafeHTML",on.resultType=1;var si=ni(on);function Ws(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Tr=Ws();function ui(e){Tr=e}var dn={exec:()=>null};function We(e,t=""){let r=typeof e=="string"?e:e.source,n={replace:(s,o)=>{let a=typeof o=="string"?o:o.source;return a=a.replace(xt.caret,"$1"),r=r.replace(s,a),n},getRegex:()=>new RegExp(r,t)};return n}var Sd=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),xt={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},Ad=/^(?:[ \t]*(?:\n|$))+/,Td=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Ed=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,un=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Cd=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Gs=/(?:[*+-]|\d{1,9}[.)])/,pi=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,fi=We(pi).replace(/bull/g,Gs).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Rd=We(pi).replace(/bull/g,Gs).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Ys=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Id=/^[^\n]+/,Vs=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,Ld=We(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Vs).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Od=We(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Gs).getRegex(),Zn="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Ks=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Dd=We("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",Ks).replace("tag",Zn).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),_i=We(Ys).replace("hr",un).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Zn).getRegex(),Md=We(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",_i).getRegex(),Zs={blockquote:Md,code:Td,def:Ld,fences:Ed,heading:Cd,hr:un,html:Dd,lheading:fi,list:Od,newline:Ad,paragraph:_i,table:dn,text:Id},oi=We("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",un).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Zn).getRegex(),Pd={...Zs,lheading:Rd,table:oi,paragraph:We(Ys).replace("hr",un).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",oi).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Zn).getRegex()},Nd={...Zs,html:We(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",Ks).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:dn,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:We(Ys).replace("hr",un).replace("heading",` *#{1,6} *[^
]`).replace("lheading",fi).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Fd=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,qd=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,mi=/^( {2,}|\\)\n(?!\s*$)/,Bd=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Xn=/[\p{P}\p{S}]/u,Xs=/[\s\p{P}\p{S}]/u,gi=/[^\s\p{P}\p{S}]/u,Ud=We(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Xs).getRegex(),hi=/(?!~)[\p{P}\p{S}]/u,jd=/(?!~)[\s\p{P}\p{S}]/u,zd=/(?:[^\s\p{P}\p{S}]|~)/u,Hd=We(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",Sd?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),bi=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,Wd=We(bi,"u").replace(/punct/g,Xn).getRegex(),Gd=We(bi,"u").replace(/punct/g,hi).getRegex(),vi="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Yd=We(vi,"gu").replace(/notPunctSpace/g,gi).replace(/punctSpace/g,Xs).replace(/punct/g,Xn).getRegex(),Vd=We(vi,"gu").replace(/notPunctSpace/g,zd).replace(/punctSpace/g,jd).replace(/punct/g,hi).getRegex(),Kd=We("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,gi).replace(/punctSpace/g,Xs).replace(/punct/g,Xn).getRegex(),Zd=We(/\\(punct)/,"gu").replace(/punct/g,Xn).getRegex(),Xd=We(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Qd=We(Ks).replace("(?:-->|$)","-->").getRegex(),Jd=We("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Qd).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Yn=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,eu=We(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Yn).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),yi=We(/^!?\[(label)\]\[(ref)\]/).replace("label",Yn).replace("ref",Vs).getRegex(),wi=We(/^!?\[(ref)\](?:\[\])?/).replace("ref",Vs).getRegex(),tu=We("reflink|nolink(?!\\()","g").replace("reflink",yi).replace("nolink",wi).getRegex(),ai=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,Qs={_backpedal:dn,anyPunctuation:Zd,autolink:Xd,blockSkip:Hd,br:mi,code:qd,del:dn,emStrongLDelim:Wd,emStrongRDelimAst:Yd,emStrongRDelimUnd:Kd,escape:Fd,link:eu,nolink:wi,punctuation:Ud,reflink:yi,reflinkSearch:tu,tag:Jd,text:Bd,url:dn},ru={...Qs,link:We(/^!?\[(label)\]\((.*?)\)/).replace("label",Yn).getRegex(),reflink:We(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Yn).getRegex()},js={...Qs,emStrongRDelimAst:Vd,emStrongLDelim:Gd,url:We(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",ai).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:We(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",ai).getRegex()},nu={...js,br:We(mi).replace("{2,}","*").getRegex(),text:We(js.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Wn={normal:Zs,gfm:Pd,pedantic:Nd},an={normal:Qs,gfm:js,breaks:nu,pedantic:ru},su={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},ii=e=>su[e];function er(e,t){if(t){if(xt.escapeTest.test(e))return e.replace(xt.escapeReplace,ii)}else if(xt.escapeTestNoEncode.test(e))return e.replace(xt.escapeReplaceNoEncode,ii);return e}function li(e){try{e=encodeURI(e).replace(xt.percentDecode,"%")}catch{return null}return e}function ci(e,t){let r=e.replace(xt.findPipe,(o,a,i)=>{let l=!1,u=a;for(;--u>=0&&i[u]==="\\";)l=!l;return l?"|":" |"}),n=r.split(xt.splitPipe),s=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),t)if(n.length>t)n.splice(t);else for(;n.length<t;)n.push("");for(;s<n.length;s++)n[s]=n[s].trim().replace(xt.slashPipe,"|");return n}function ln(e,t,r){let n=e.length;if(n===0)return"";let s=0;for(;s<n;){let o=e.charAt(n-s-1);if(o===t&&!r)s++;else if(o!==t&&r)s++;else break}return e.slice(0,n-s)}function ou(e,t){if(e.indexOf(t[1])===-1)return-1;let r=0;for(let n=0;n<e.length;n++)if(e[n]==="\\")n++;else if(e[n]===t[0])r++;else if(e[n]===t[1]&&(r--,r<0))return n;return r>0?-2:-1}function di(e,t,r,n,s){let o=t.href,a=t.title||null,i=e[1].replace(s.other.outputLinkReplace,"$1");n.state.inLink=!0;let l={type:e[0].charAt(0)==="!"?"image":"link",raw:r,href:o,title:a,text:i,tokens:n.inlineTokens(i)};return n.state.inLink=!1,l}function au(e,t,r){let n=e.match(r.other.indentCodeCompensation);if(n===null)return t;let s=n[1];return t.split(`
`).map(o=>{let a=o.match(r.other.beginningSpace);if(a===null)return o;let[i]=a;return i.length>=s.length?o.slice(s.length):o}).join(`
`)}var Vn=class{constructor(e){Qe(this,"options");Qe(this,"rules");Qe(this,"lexer");this.options=e||Tr}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let r=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?r:ln(r,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let r=t[0],n=au(r,t[3]||"",this.rules);return{type:"code",raw:r,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:n}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let r=t[2].trim();if(this.rules.other.endingHash.test(r)){let n=ln(r,"#");(this.options.pedantic||!n||this.rules.other.endingSpaceChar.test(n))&&(r=n.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:ln(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let r=ln(t[0],`
`).split(`
`),n="",s="",o=[];for(;r.length>0;){let a=!1,i=[],l;for(l=0;l<r.length;l++)if(this.rules.other.blockquoteStart.test(r[l]))i.push(r[l]),a=!0;else if(!a)i.push(r[l]);else break;r=r.slice(l);let u=i.join(`
`),p=u.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");n=n?`${n}
${u}`:u,s=s?`${s}
${p}`:p;let m=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(p,o,!0),this.lexer.state.top=m,r.length===0)break;let h=o.at(-1);if(h?.type==="code")break;if(h?.type==="blockquote"){let T=h,$=T.raw+`
`+r.join(`
`),E=this.blockquote($);o[o.length-1]=E,n=n.substring(0,n.length-T.raw.length)+E.raw,s=s.substring(0,s.length-T.text.length)+E.text;break}else if(h?.type==="list"){let T=h,$=T.raw+`
`+r.join(`
`),E=this.list($);o[o.length-1]=E,n=n.substring(0,n.length-h.raw.length)+E.raw,s=s.substring(0,s.length-T.raw.length)+E.raw,r=$.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:n,tokens:o,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let r=t[1].trim(),n=r.length>1,s={type:"list",raw:"",ordered:n,start:n?+r.slice(0,-1):"",loose:!1,items:[]};r=n?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=n?r:"[*+-]");let o=this.rules.other.listItemRegex(r),a=!1;for(;e;){let l=!1,u="",p="";if(!(t=o.exec(e))||this.rules.block.hr.test(e))break;u=t[0],e=e.substring(u.length);let m=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,E=>" ".repeat(3*E.length)),h=e.split(`
`,1)[0],T=!m.trim(),$=0;if(this.options.pedantic?($=2,p=m.trimStart()):T?$=t[1].length+1:($=t[2].search(this.rules.other.nonSpaceChar),$=$>4?1:$,p=m.slice($),$+=t[1].length),T&&this.rules.other.blankLine.test(h)&&(u+=h+`
`,e=e.substring(h.length+1),l=!0),!l){let E=this.rules.other.nextBulletRegex($),F=this.rules.other.hrRegex($),x=this.rules.other.fencesBeginRegex($),G=this.rules.other.headingBeginRegex($),X=this.rules.other.htmlBeginRegex($);for(;e;){let I=e.split(`
`,1)[0],O;if(h=I,this.options.pedantic?(h=h.replace(this.rules.other.listReplaceNesting,"  "),O=h):O=h.replace(this.rules.other.tabCharGlobal,"    "),x.test(h)||G.test(h)||X.test(h)||E.test(h)||F.test(h))break;if(O.search(this.rules.other.nonSpaceChar)>=$||!h.trim())p+=`
`+O.slice($);else{if(T||m.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||x.test(m)||G.test(m)||F.test(m))break;p+=`
`+h}!T&&!h.trim()&&(T=!0),u+=I+`
`,e=e.substring(I.length+1),m=O.slice($)}}s.loose||(a?s.loose=!0:this.rules.other.doubleBlankLine.test(u)&&(a=!0)),s.items.push({type:"list_item",raw:u,task:!!this.options.gfm&&this.rules.other.listIsTask.test(p),loose:!1,text:p,tokens:[]}),s.raw+=u}let i=s.items.at(-1);if(i)i.raw=i.raw.trimEnd(),i.text=i.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let l of s.items){if(this.lexer.state.top=!1,l.tokens=this.lexer.blockTokens(l.text,[]),l.task){if(l.text=l.text.replace(this.rules.other.listReplaceTask,""),l.tokens[0]?.type==="text"||l.tokens[0]?.type==="paragraph"){l.tokens[0].raw=l.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),l.tokens[0].text=l.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let p=this.lexer.inlineQueue.length-1;p>=0;p--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[p].src)){this.lexer.inlineQueue[p].src=this.lexer.inlineQueue[p].src.replace(this.rules.other.listReplaceTask,"");break}}let u=this.rules.other.listTaskCheckbox.exec(l.raw);if(u){let p={type:"checkbox",raw:u[0]+" ",checked:u[0]!=="[ ]"};l.checked=p.checked,s.loose?l.tokens[0]&&["paragraph","text"].includes(l.tokens[0].type)&&"tokens"in l.tokens[0]&&l.tokens[0].tokens?(l.tokens[0].raw=p.raw+l.tokens[0].raw,l.tokens[0].text=p.raw+l.tokens[0].text,l.tokens[0].tokens.unshift(p)):l.tokens.unshift({type:"paragraph",raw:p.raw,text:p.raw,tokens:[p]}):l.tokens.unshift(p)}}if(!s.loose){let u=l.tokens.filter(m=>m.type==="space"),p=u.length>0&&u.some(m=>this.rules.other.anyLine.test(m.raw));s.loose=p}}if(s.loose)for(let l of s.items){l.loose=!0;for(let u of l.tokens)u.type==="text"&&(u.type="paragraph")}return s}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let r=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),n=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:r,raw:t[0],href:n,title:s}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let r=ci(t[1]),n=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(r.length===n.length){for(let a of n)this.rules.other.tableAlignRight.test(a)?o.align.push("right"):this.rules.other.tableAlignCenter.test(a)?o.align.push("center"):this.rules.other.tableAlignLeft.test(a)?o.align.push("left"):o.align.push(null);for(let a=0;a<r.length;a++)o.header.push({text:r[a],tokens:this.lexer.inline(r[a]),header:!0,align:o.align[a]});for(let a of s)o.rows.push(ci(a,o.header.length).map((i,l)=>({text:i,tokens:this.lexer.inline(i),header:!1,align:o.align[l]})));return o}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let r=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:r,tokens:this.lexer.inline(r)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let r=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;let o=ln(r.slice(0,-1),"\\");if((r.length-o.length)%2===0)return}else{let o=ou(t[2],"()");if(o===-2)return;if(o>-1){let a=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,a).trim(),t[3]=""}}let n=t[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(n);o&&(n=o[1],s=o[3])}else s=t[3]?t[3].slice(1,-1):"";return n=n.trim(),this.rules.other.startAngleBracket.test(n)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?n=n.slice(1):n=n.slice(1,-1)),di(t,{href:n&&n.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let r;if((r=this.rules.inline.reflink.exec(e))||(r=this.rules.inline.nolink.exec(e))){let n=(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[n.toLowerCase()];if(!s){let o=r[0].charAt(0);return{type:"text",raw:o,text:o}}return di(r,s,r[0],this.lexer,this.rules)}}emStrong(e,t,r=""){let n=this.rules.inline.emStrongLDelim.exec(e);if(!(!n||n[3]&&r.match(this.rules.other.unicodeAlphaNumeric))&&(!(n[1]||n[2])||!r||this.rules.inline.punctuation.exec(r))){let s=[...n[0]].length-1,o,a,i=s,l=0,u=n[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(u.lastIndex=0,t=t.slice(-1*e.length+s);(n=u.exec(t))!=null;){if(o=n[1]||n[2]||n[3]||n[4]||n[5]||n[6],!o)continue;if(a=[...o].length,n[3]||n[4]){i+=a;continue}else if((n[5]||n[6])&&s%3&&!((s+a)%3)){l+=a;continue}if(i-=a,i>0)continue;a=Math.min(a,a+i+l);let p=[...n[0]][0].length,m=e.slice(0,s+n.index+p+a);if(Math.min(s,a)%2){let T=m.slice(1,-1);return{type:"em",raw:m,text:T,tokens:this.lexer.inlineTokens(T)}}let h=m.slice(2,-2);return{type:"strong",raw:m,text:h,tokens:this.lexer.inlineTokens(h)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let r=t[2].replace(this.rules.other.newLineCharGlobal," "),n=this.rules.other.nonSpaceChar.test(r),s=this.rules.other.startingSpaceChar.test(r)&&this.rules.other.endingSpaceChar.test(r);return n&&s&&(r=r.substring(1,r.length-1)),{type:"codespan",raw:t[0],text:r}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let r,n;return t[2]==="@"?(r=t[1],n="mailto:"+r):(r=t[1],n=r),{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let r,n;if(t[2]==="@")r=t[0],n="mailto:"+r;else{let s;do s=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(s!==t[0]);r=t[0],t[1]==="www."?n="http://"+t[0]:n=t[0]}return{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let r=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:r}}}},Bt=class zs{constructor(t){Qe(this,"tokens");Qe(this,"options");Qe(this,"state");Qe(this,"inlineQueue");Qe(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||Tr,this.options.tokenizer=this.options.tokenizer||new Vn,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let r={other:xt,block:Wn.normal,inline:an.normal};this.options.pedantic?(r.block=Wn.pedantic,r.inline=an.pedantic):this.options.gfm&&(r.block=Wn.gfm,this.options.breaks?r.inline=an.breaks:r.inline=an.gfm),this.tokenizer.rules=r}static get rules(){return{block:Wn,inline:an}}static lex(t,r){return new zs(r).lex(t)}static lexInline(t,r){return new zs(r).inlineTokens(t)}lex(t){t=t.replace(xt.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let r=0;r<this.inlineQueue.length;r++){let n=this.inlineQueue[r];this.inlineTokens(n.src,n.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,r=[],n=!1){for(this.options.pedantic&&(t=t.replace(xt.tabCharGlobal,"    ").replace(xt.spaceLine,""));t;){let s;if(this.options.extensions?.block?.some(a=>(s=a.call({lexer:this},t,r))?(t=t.substring(s.raw.length),r.push(s),!0):!1))continue;if(s=this.tokenizer.space(t)){t=t.substring(s.raw.length);let a=r.at(-1);s.raw.length===1&&a!==void 0?a.raw+=`
`:r.push(s);continue}if(s=this.tokenizer.code(t)){t=t.substring(s.raw.length);let a=r.at(-1);a?.type==="paragraph"||a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.at(-1).src=a.text):r.push(s);continue}if(s=this.tokenizer.fences(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.heading(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.hr(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.blockquote(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.list(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.html(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.def(t)){t=t.substring(s.raw.length);let a=r.at(-1);a?.type==="paragraph"||a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.raw,this.inlineQueue.at(-1).src=a.text):this.tokens.links[s.tag]||(this.tokens.links[s.tag]={href:s.href,title:s.title},r.push(s));continue}if(s=this.tokenizer.table(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.lheading(t)){t=t.substring(s.raw.length),r.push(s);continue}let o=t;if(this.options.extensions?.startBlock){let a=1/0,i=t.slice(1),l;this.options.extensions.startBlock.forEach(u=>{l=u.call({lexer:this},i),typeof l=="number"&&l>=0&&(a=Math.min(a,l))}),a<1/0&&a>=0&&(o=t.substring(0,a+1))}if(this.state.top&&(s=this.tokenizer.paragraph(o))){let a=r.at(-1);n&&a?.type==="paragraph"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):r.push(s),n=o.length!==t.length,t=t.substring(s.raw.length);continue}if(s=this.tokenizer.text(t)){t=t.substring(s.raw.length);let a=r.at(-1);a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):r.push(s);continue}if(t){let a="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(a);break}else throw new Error(a)}}return this.state.top=!0,r}inline(t,r=[]){return this.inlineQueue.push({src:t,tokens:r}),r}inlineTokens(t,r=[]){let n=t,s=null;if(this.tokens.links){let l=Object.keys(this.tokens.links);if(l.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(n))!=null;)l.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(n=n.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(n))!=null;)n=n.slice(0,s.index)+"++"+n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(n))!=null;)o=s[2]?s[2].length:0,n=n.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let a=!1,i="";for(;t;){a||(i=""),a=!1;let l;if(this.options.extensions?.inline?.some(p=>(l=p.call({lexer:this},t,r))?(t=t.substring(l.raw.length),r.push(l),!0):!1))continue;if(l=this.tokenizer.escape(t)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.tag(t)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.link(t)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(l.raw.length);let p=r.at(-1);l.type==="text"&&p?.type==="text"?(p.raw+=l.raw,p.text+=l.text):r.push(l);continue}if(l=this.tokenizer.emStrong(t,n,i)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.codespan(t)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.br(t)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.del(t)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.autolink(t)){t=t.substring(l.raw.length),r.push(l);continue}if(!this.state.inLink&&(l=this.tokenizer.url(t))){t=t.substring(l.raw.length),r.push(l);continue}let u=t;if(this.options.extensions?.startInline){let p=1/0,m=t.slice(1),h;this.options.extensions.startInline.forEach(T=>{h=T.call({lexer:this},m),typeof h=="number"&&h>=0&&(p=Math.min(p,h))}),p<1/0&&p>=0&&(u=t.substring(0,p+1))}if(l=this.tokenizer.inlineText(u)){t=t.substring(l.raw.length),l.raw.slice(-1)!=="_"&&(i=l.raw.slice(-1)),a=!0;let p=r.at(-1);p?.type==="text"?(p.raw+=l.raw,p.text+=l.text):r.push(l);continue}if(t){let p="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(p);break}else throw new Error(p)}}return r}},Kn=class{constructor(e){Qe(this,"options");Qe(this,"parser");this.options=e||Tr}space(e){return""}code({text:e,lang:t,escaped:r}){let n=(t||"").match(xt.notSpaceStart)?.[0],s=e.replace(xt.endingNewline,"")+`
`;return n?'<pre><code class="language-'+er(n)+'">'+(r?s:er(s,!0))+`</code></pre>
`:"<pre><code>"+(r?s:er(s,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}def(e){return""}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return`<hr>
`}list(e){let t=e.ordered,r=e.start,n="";for(let a=0;a<e.items.length;a++){let i=e.items[a];n+=this.listitem(i)}let s=t?"ol":"ul",o=t&&r!==1?' start="'+r+'"':"";return"<"+s+o+`>
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${er(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:r}){let n=this.parser.parseInline(r),s=li(e);if(s===null)return n;e=s;let o='<a href="'+e+'"';return t&&(o+=' title="'+er(t)+'"'),o+=">"+n+"</a>",o}image({href:e,title:t,text:r,tokens:n}){n&&(r=this.parser.parseInline(n,this.parser.textRenderer));let s=li(e);if(s===null)return er(r);e=s;let o=`<img src="${e}" alt="${r}"`;return t&&(o+=` title="${er(t)}"`),o+=">",o}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:er(e.text)}},Js=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},Ut=class Hs{constructor(t){Qe(this,"options");Qe(this,"renderer");Qe(this,"textRenderer");this.options=t||Tr,this.options.renderer=this.options.renderer||new Kn,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Js}static parse(t,r){return new Hs(r).parse(t)}static parseInline(t,r){return new Hs(r).parseInline(t)}parse(t){let r="";for(let n=0;n<t.length;n++){let s=t[n];if(this.options.extensions?.renderers?.[s.type]){let a=s,i=this.options.extensions.renderers[a.type].call({parser:this},a);if(i!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(a.type)){r+=i||"";continue}}let o=s;switch(o.type){case"space":{r+=this.renderer.space(o);break}case"hr":{r+=this.renderer.hr(o);break}case"heading":{r+=this.renderer.heading(o);break}case"code":{r+=this.renderer.code(o);break}case"table":{r+=this.renderer.table(o);break}case"blockquote":{r+=this.renderer.blockquote(o);break}case"list":{r+=this.renderer.list(o);break}case"checkbox":{r+=this.renderer.checkbox(o);break}case"html":{r+=this.renderer.html(o);break}case"def":{r+=this.renderer.def(o);break}case"paragraph":{r+=this.renderer.paragraph(o);break}case"text":{r+=this.renderer.text(o);break}default:{let a='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return r}parseInline(t,r=this.renderer){let n="";for(let s=0;s<t.length;s++){let o=t[s];if(this.options.extensions?.renderers?.[o.type]){let i=this.options.extensions.renderers[o.type].call({parser:this},o);if(i!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){n+=i||"";continue}}let a=o;switch(a.type){case"escape":{n+=r.text(a);break}case"html":{n+=r.html(a);break}case"link":{n+=r.link(a);break}case"image":{n+=r.image(a);break}case"checkbox":{n+=r.checkbox(a);break}case"strong":{n+=r.strong(a);break}case"em":{n+=r.em(a);break}case"codespan":{n+=r.codespan(a);break}case"br":{n+=r.br(a);break}case"del":{n+=r.del(a);break}case"text":{n+=r.text(a);break}default:{let i='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return n}},Gn,cn=(Gn=class{constructor(e){Qe(this,"options");Qe(this,"block");this.options=e||Tr}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?Bt.lex:Bt.lexInline}provideParser(){return this.block?Ut.parse:Ut.parseInline}},Qe(Gn,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),Qe(Gn,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),Gn),iu=class{constructor(...e){Qe(this,"defaults",Ws());Qe(this,"options",this.setOptions);Qe(this,"parse",this.parseMarkdown(!0));Qe(this,"parseInline",this.parseMarkdown(!1));Qe(this,"Parser",Ut);Qe(this,"Renderer",Kn);Qe(this,"TextRenderer",Js);Qe(this,"Lexer",Bt);Qe(this,"Tokenizer",Vn);Qe(this,"Hooks",cn);this.use(...e)}walkTokens(e,t){let r=[];for(let n of e)switch(r=r.concat(t.call(this,n)),n.type){case"table":{let s=n;for(let o of s.header)r=r.concat(this.walkTokens(o.tokens,t));for(let o of s.rows)for(let a of o)r=r.concat(this.walkTokens(a.tokens,t));break}case"list":{let s=n;r=r.concat(this.walkTokens(s.items,t));break}default:{let s=n;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let a=s[o].flat(1/0);r=r.concat(this.walkTokens(a,t))}):s.tokens&&(r=r.concat(this.walkTokens(s.tokens,t)))}}return r}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(r=>{let n={...r};if(n.async=this.defaults.async||n.async||!1,r.extensions&&(r.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=t.renderers[s.name];o?t.renderers[s.name]=function(...a){let i=s.renderer.apply(this,a);return i===!1&&(i=o.apply(this,a)),i}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=t[s.level];o?o.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),n.extensions=t),r.renderer){let s=this.defaults.renderer||new Kn(this.defaults);for(let o in r.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let a=o,i=r.renderer[a],l=s[a];s[a]=(...u)=>{let p=i.apply(s,u);return p===!1&&(p=l.apply(s,u)),p||""}}n.renderer=s}if(r.tokenizer){let s=this.defaults.tokenizer||new Vn(this.defaults);for(let o in r.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let a=o,i=r.tokenizer[a],l=s[a];s[a]=(...u)=>{let p=i.apply(s,u);return p===!1&&(p=l.apply(s,u)),p}}n.tokenizer=s}if(r.hooks){let s=this.defaults.hooks||new cn;for(let o in r.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let a=o,i=r.hooks[a],l=s[a];cn.passThroughHooks.has(o)?s[a]=u=>{if(this.defaults.async&&cn.passThroughHooksRespectAsync.has(o))return(async()=>{let m=await i.call(s,u);return l.call(s,m)})();let p=i.call(s,u);return l.call(s,p)}:s[a]=(...u)=>{if(this.defaults.async)return(async()=>{let m=await i.apply(s,u);return m===!1&&(m=await l.apply(s,u)),m})();let p=i.apply(s,u);return p===!1&&(p=l.apply(s,u)),p}}n.hooks=s}if(r.walkTokens){let s=this.defaults.walkTokens,o=r.walkTokens;n.walkTokens=function(a){let i=[];return i.push(o.call(this,a)),s&&(i=i.concat(s.call(this,a))),i}}this.defaults={...this.defaults,...n}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Bt.lex(e,t??this.defaults)}parser(e,t){return Ut.parse(e,t??this.defaults)}parseMarkdown(e){return(t,r)=>{let n={...r},s={...this.defaults,...n},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&n.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=e),s.async)return(async()=>{let a=s.hooks?await s.hooks.preprocess(t):t,i=await(s.hooks?await s.hooks.provideLexer():e?Bt.lex:Bt.lexInline)(a,s),l=s.hooks?await s.hooks.processAllTokens(i):i;s.walkTokens&&await Promise.all(this.walkTokens(l,s.walkTokens));let u=await(s.hooks?await s.hooks.provideParser():e?Ut.parse:Ut.parseInline)(l,s);return s.hooks?await s.hooks.postprocess(u):u})().catch(o);try{s.hooks&&(t=s.hooks.preprocess(t));let a=(s.hooks?s.hooks.provideLexer():e?Bt.lex:Bt.lexInline)(t,s);s.hooks&&(a=s.hooks.processAllTokens(a)),s.walkTokens&&this.walkTokens(a,s.walkTokens);let i=(s.hooks?s.hooks.provideParser():e?Ut.parse:Ut.parseInline)(a,s);return s.hooks&&(i=s.hooks.postprocess(i)),i}catch(a){return o(a)}}}onError(e,t){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let n="<p>An error occurred:</p><pre>"+er(r.message+"",!0)+"</pre>";return t?Promise.resolve(n):n}if(t)return Promise.reject(r);throw r}}},Ar=new iu;function Ze(e,t){return Ar.parse(e,t)}Ze.options=Ze.setOptions=function(e){return Ar.setOptions(e),Ze.defaults=Ar.defaults,ui(Ze.defaults),Ze};Ze.getDefaults=Ws;Ze.defaults=Tr;Ze.use=function(...e){return Ar.use(...e),Ze.defaults=Ar.defaults,ui(Ze.defaults),Ze};Ze.walkTokens=function(e,t){return Ar.walkTokens(e,t)};Ze.parseInline=Ar.parseInline;Ze.Parser=Ut;Ze.parser=Ut.parse;Ze.Renderer=Kn;Ze.TextRenderer=Js;Ze.Lexer=Bt;Ze.lexer=Bt.lex;Ze.Tokenizer=Vn;Ze.Hooks=cn;Ze.parse=Ze;var Y_=Ze.options,V_=Ze.setOptions,K_=Ze.use,Z_=Ze.walkTokens,X_=Ze.parseInline;var Q_=Ut.parse,J_=Bt.lex;function pr(e){let t=Ze.parse(e),r=ti.sanitize(t);return si(r)}function tr(e,t){return c`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function qr(e){return e.loading?c`<div class="prompt-block__status">불러오는 중…</div>`:e.error?c`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function Qn(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=n=>String(n).padStart(2,"0");return`${t.getFullYear()}-${r(t.getMonth()+1)}-${r(t.getDate())} ${r(t.getHours())}:${r(t.getMinutes())}`}var lu={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},cu=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,du=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function fr(e){return!!e&&typeof e=="object"}function eo(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function ki(e,t){let r=eo(e),n=eo(t),s=new Map;for(let i of r)s.set(i,(s.get(i)||0)+1);let o=0;for(let i of n){let l=s.get(i)||0;l>0?s.set(i,l-1):o+=1}let a=0;for(let i of s.values())a+=i;return{added:o,removed:a}}function uu(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(s=>fr(s)&&typeof s.text=="string"?s.text:"").join(""):fr(e)&&typeof e.text=="string"&&(t=e.text);let n=(String(t).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return n.length>120?`${n.slice(0,117)}\u2026`:n}function pu(e){let t=String(e.name||""),r=e.input||{},n={kind:"tool",tool:t,icon:lu[t]||"\u{1F527}",input:r,expandable:!0};if((t==="Read"||t==="Write")&&(n.path=String(r.file_path||r.path||"")),t==="Write"&&(n.added=eo(r.content).length),t==="Edit"){n.path=String(r.file_path||r.path||"");let{added:s,removed:o}=ki(r.old_string,r.new_string);n.added=s,n.removed=o}if(t==="MultiEdit"){n.path=String(r.file_path||r.path||"");let s=0,o=0,a=Array.isArray(r.edits)?r.edits:[];for(let i of a){let l=ki(fr(i)?i.old_string:"",fr(i)?i.new_string:"");s+=l.added,o+=l.removed}n.added=s,n.removed=o}return t==="Bash"&&(n.command=String(r.command||"")),(t==="Grep"||t==="Glob")&&(n.command=String(r.pattern||r.query||"")),n}function $i(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}function xi(e){let t=e.split(/\r?\n/).find(n=>n.trim().length>0)||"",r=cu.exec(t);return r?{kind:"gate",gate:r[2]==="implementation"?"impl":r[2],reviewer:r[3],verdict:r[4],time:r[5]?r[5].trim():void 0,text:t.trim()}:du.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function fu(e,t){if(e.type==="assistant"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[],s=[];for(let o of n)if(fr(o)){if(o.type==="text"&&typeof o.text=="string")s.push(xi(o.text));else if(o.type==="thinking"){let a=$i(o.thinking);a&&s.push(a)}else if(o.type==="tool_use"){let a=pu(o);typeof o.id=="string"&&t.set(o.id,a),s.push(a)}}return s}if(e.type==="user"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[];for(let s of n)if(fr(s)&&s.type==="tool_result"){let o=t.get(String(s.tool_use_id));if(o){let a=uu(s.content);o.result=a,o.output=typeof s.content=="string"?s.content:a}}return[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success";return[{kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""}]}return[]}function _u(e){if(e.type==="item.completed"&&fr(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[xi(t.text)];if(t.type==="reasoning"){let r=$i(t.text);return r?[r]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function mu(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function Si(e){let t=[],r=new Map,n=Array.isArray(e)?e:[];for(let s of n){let o=s;if(typeof s=="string"){let i=s.trim();if(i.length===0)continue;try{o=JSON.parse(i)}catch{continue}}if(!fr(o))continue;let a=mu(o)?_u(o):fu(o,r);for(let i of a)t.push(i)}return t}var gu=5,hu=10,bu=/Task\s+#(\d+)/,vu=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,yu=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function Jn(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function wu(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function ku(e){for(let t=e.length-1;t>=0;t-=1){let r=e[t];if(r.kind==="phase"||r.kind==="gate")return r.text||null}return null}function $u(e){let t=new Map,r=0;for(let s of e){if(s.kind!=="tool")continue;r+=1;let o=s.input||{};if(s.tool==="TaskCreate"){let l=bu.exec(s.output||s.result||""),u=String(o.activeForm||o.subject||"").trim();if(!l||u.length===0)continue;t.set(l[1],{label:u,active:o.status==="in_progress"?r:0});continue}if(s.tool!=="TaskUpdate")continue;let a=t.get(String(o.taskId??""));if(!a)continue;let i=o.activeForm||o.subject;typeof i=="string"&&i.trim().length>0&&(a.label=i.trim()),typeof o.status=="string"&&(a.active=o.status==="in_progress"?r:0)}let n=null;for(let s of t.values())s.active>0&&(!n||s.active>n.active)&&(n=s);return n?n.label:null}function xu(e){if(e.tool==="Bash"){let t=e.command||"";return vu.test(t)?"~ PR/\uAC8C\uC2DC \uC911":yu.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function Su(e){let t=e.filter(s=>s.kind==="tool").slice(-hu),r=new Map;t.forEach((s,o)=>{let a=xu(s);if(!a)return;let i=r.get(a)||{count:0,last:-1};i.count+=1,i.last=o,r.set(a,i)});let n=null;for(let[s,o]of r)(!n||o.count>n.count||o.count===n.count&&o.last>n.last)&&(n={label:s,count:o.count,last:o.last});return n?n.label:null}function Au(e){let t=ku(e);if(t)return{text:t,guess:!1};let r=$u(e);if(r)return{text:r,guess:!1};let n=Su(e);return n?{text:n,guess:!0}:null}function Tu(e,t){if(typeof e!="number")return"";let r=Math.max(0,Math.floor((t-e)/1e3));return r<60?`${r}\uCD08 \uC804`:Ct(e,t)}function es(e,t={}){let{transport:r,sessionLogStore:n,onClose:s}=t,o=null,a={},i=!0,l=new Set,u=new Set,p=null,m=null,h=!1,T=!1,$=!1,E=null,F=null;function x(){h=!1,T=!1,$=!1,E=null,F=null}async function G(j){if(r){T=!0,$=!1,Ae();try{let P=await Promise.resolve(r("get-attempt-prompt",{attempt_id:j}));if(o!==j)return;!P||typeof P!="object"||Array.isArray(P)?$=!0:(E=P,F=j)}catch{o===j&&($=!0)}finally{o===j&&(T=!1,Ae())}}}function X(){if(h=!h,h&&o&&F!==o){G(o);return}Ae()}function I(){if(!h)return"";let j=qr({loading:T,error:$});if(j)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        ${j}
      </div>`;if(!E)return"";if(E.missing)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let P=Qn(E.recorded_at);return c`<div class="sv__prompt" data-seam="attempt-prompt">
      ${P?c`<div class="prompt-block__meta">${P} 발송</div>`:""}
      ${typeof E.task_prompt=="string"?tr("\uACFC\uC5C5 (user)",E.task_prompt):""}
      ${typeof E.system_prompt=="string"?tr("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",E.system_prompt):""}
    </div>`}function O(){if(!o||!n)return[];let j=n.get(o);return Si(j?j.lines:[])}function A(){if(!o||!n)return null;let j=n.get(o),P=j?j.last_event_at:null;return typeof P=="number"?P:null}function U(){return a.status==="running"}function R(){if(U()&&o){m||(m=setInterval(()=>Ae(),1e3));return}oe()}function oe(){m&&(clearInterval(m),m=null)}function Ce(j){let P=[],ce=0;for(;ce<j.length;){let we=j[ce];if(we.kind==="tool"){let ke=ce;for(;ke<j.length&&j[ke].kind==="tool"&&j[ke].tool===we.tool;)ke+=1;if(ke-ce>=gu&&!u.has(ce)){P.push({kind:"group",idx:ce,tool:we.tool||"",lines:j.slice(ce,ke).map((Ue,Re)=>({idx:ce+Re,line:Ue}))}),ce=ke;continue}}P.push({kind:"line",idx:ce,line:we}),ce+=1}return P}function ne(j){for(let P=j.length-1;P>=0;P-=1){let ce=j[P];if(ce.kind==="result"||ce.kind==="error")return null;if(ce.kind==="tool"&&!Object.hasOwn(ce,"result"))return ce}return null}function me(j){for(let P=j.length-1;P>=0;P-=1)if(j[P].kind==="thinking")return j[P];return null}function Oe(j,P){if(P.kind==="gate")return c`<div class="sv__gate">${P.text}</div>`;if(P.kind==="phase")return c`<div class="sv__phase">${P.text}</div>`;if(P.kind==="result")return c`<div
        class="sv__result${P.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${P.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${pr(P.text||(P.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(P.kind==="thinking"){let ce=l.has(j);return c`<div
        class="sv__think${ce?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>ve(j)}
      >
        <span class="sv__think-line">💭 ${Jn(P.text)}</span>
        ${ce?c`<pre class="sv__think-expand">${P.text}</pre>`:""}
      </div>`}if(P.kind==="error")return c`<div class="sv__error">⛔ ${P.text}</div>`;if(P.kind==="blocker")return c`<div class="sv__error">⛔ ${P.text}</div>`;if(P.kind==="tool"){let ce=l.has(j),we=P.tool==="Bash"?wu(P.command):0,ke=P.tool==="Bash"?we>1?Jn(P.command):P.command:P.path||P.command||"";return c`<div
        class="sv__tool${ce?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>ve(j)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${P.icon}</span>
          <span class="sv__tool-name">${P.tool}</span>
          ${ke?c`<span class="sv__tool-detail">${ke}</span>`:""}
          ${we>1?c`<span class="sv__tool-more">⋯ ${we}줄</span>`:""}
          ${typeof P.added=="number"?c`<span class="sv__diff-add">+${P.added}</span>`:""}
          ${typeof P.removed=="number"?c`<span class="sv__diff-del">−${P.removed}</span>`:""}
          ${P.result?c`<span class="sv__tool-ok">→ ${P.result}</span>`:""}
        </span>
        ${ce?c`<pre class="sv__tool-expand">${Ve(P)}</pre>`:""}
      </div>`}return c`<div class="sv__as">${pr(P.text||"")}</div>`}function Ve(j){let P=[];if(j.tool==="Bash"&&typeof j.command=="string"&&j.command.length>0)P.push(j.command);else if(j.input!==void 0)try{P.push(`input: ${JSON.stringify(j.input,null,2)}`)}catch{}return typeof j.output=="string"&&j.output.length>0&&P.push(`output:
${j.output}`),P.join(`

`)}function st(){if(!o)return c``;let j=O(),P=[a.runner,a.model,a.effort].filter(Boolean).join(" \xB7 "),ce=a.session_id||"",we=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${i?"ON":"OFF"}`,ke=U(),Ue=ke?Tu(A(),Date.now()):"",Re=ke?ne(j):null,ze=ke?me(j):null,Ne=Au(j);return c`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id">${o}</span>
        ${Ne?c`<span
              class="sv__stage${Ne.guess?" sv__stage--guess":""}"
              title=${Ne.text}
              >${Ne.text}</span
            >`:""}
        ${ke?c`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${Ue?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${Ue}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${Ue?c`<span class="sv__live-ago">${Ue}</span>`:""}</span
            >`:""}
        ${ce?c`<button
              type="button"
              class="sv__session"
              title=${ce}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${ce}`}
              @click=${()=>V(ce)}
            >
              ⧉ ${ce.slice(0,8)}
            </button>`:""}
        ${P?c`<span class="sv__meta">${P}</span>`:""}
        ${a.worktree?c`<span class="sv__wt" title=${a.worktree}
              >${a.worktree}</span
            >`:""}
        <button
          type="button"
          class="sv__prompt-toggle${h?" sv__prompt-toggle--on":""}"
          data-seam="attempt-prompt-toggle"
          aria-pressed=${h?"true":"false"}
          aria-label="발송 프롬프트 보기"
          title="이 세션에 실제로 보낸 시스템·과업 프롬프트"
          @click=${X}
        >
          ✉ 프롬프트
        </button>
        <button
          type="button"
          class="sv__follow${i?" sv__follow--on":""}"
          aria-pressed=${i?"true":"false"}
          aria-label=${we}
          @click=${he}
        >
          <span class="sv__follow-full">⇣ ${we}</span>
          <span class="sv__follow-short">⇣ ${i?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>ye()}
        >
          ✕
        </button>
      </div>
      ${I()}
      <div class="sv__body">
        ${j.length===0?c`<div class="sv__empty">세션 로그 없음</div>`:Ce(j).map(tt=>tt.kind==="group"?Pe(tt):Oe(tt.idx,tt.line))}
      </div>
      ${Re||ze?c`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${Re?c`<span class="sv__now-icon">${Re.icon}</span>
                  <span class="sv__now-name">${Re.tool}</span>
                  <span class="sv__now-detail"
                    >${Re.tool==="Bash"?Jn(Re.command):Re.path||Re.command||""}</span
                  >`:""}
            ${ze?c`<span class="sv__now-think"
                  >💭 ${Jn(ze.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function Pe(j){return c`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>De(j.idx)}
    >
      <span class="sv__group-icon">${j.lines[0].line.icon}</span>
      <span class="sv__group-name">${j.tool}</span>
      <span class="sv__group-count">${j.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function De(j){u.add(j),Ae()}function Ae(){je(st(),e),R(),i&&ge()}function ge(){let j=e.querySelector(".sv__body");j&&(j.scrollTop=j.scrollHeight)}function ve(j){l.has(j)?l.delete(j):l.add(j),Ae()}function he(){i=!i,Ae()}function V(j){Sr(j).then(P=>{P?K("\uBCF5\uC0AC\uB428","success",1200):K("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function W(j){!o||!j||(a={...a,...j},Ae())}function _e(j){let P=j.target;if(!P||!P.classList||!P.classList.contains("sv__body"))return;!(P.scrollHeight-P.scrollTop-P.clientHeight<=4)&&i&&(i=!1,Ae())}e.addEventListener("scroll",_e,!0);function Z(j){let P=j&&j.attempt_id;P&&(o=P,a=j.meta||{},i=!0,l.clear(),u.clear(),x(),!p&&n&&(p=n.subscribe(Ae)),r&&Promise.resolve(r("subscribe-session-log",{id:`session-log:${o}`,attempt_id:o})).catch(()=>{}),Ae())}function ye(){let j=o;o=null,l.clear(),u.clear(),x(),oe(),r&&j&&Promise.resolve(r("unsubscribe-session-log",{id:`session-log:${j}`})).catch(()=>{}),je(c``,e),s&&s()}return{open:Z,updateMeta:W,close:ye,isOpen(){return o!==null},destroy(){oe(),p&&(p(),p=null),e.removeEventListener("scroll",_e,!0),o=null,je(c``,e)}}}function pn(e){let t=e&&typeof e=="object"?e:{},r=t.metadata&&typeof t.metadata=="object"?t.metadata:{},n=Ai(t.spec_id),s=Ai(r.spec_id);return n?{path:n,source:"native",conflict:s.length>0&&s!==n}:s?{path:s,source:"metadata",conflict:!1}:{path:"",source:"none",conflict:!1}}function Ai(e){return typeof e=="string"?e.trim():""}function Eu(e){return["plan_review","plan_approval","plan_check"].some(t=>{let r=e[t];return typeof r=="string"&&r.trim().length>0})}function Cu(e){let t=e&&e.metadata||{},r=pn(e),n=[];return r.path&&n.push({kind:"spec",path:r.path,missing_state:null}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&n.push({kind:"plan",path:t.plan_path.trim(),missing_state:Eu(t)?null:"plan_pending"}),n}function Ti(e,t){let r=Cu(e);return c`
    <div class="detail-section-label">Artifacts</div>
    ${r.length===0?c`<div class="detail-empty">산출물 없음</div>`:c`
          ${r.map(n=>c`<div class="detail-art">
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
  `}var Ru="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",Iu=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,Lu=/^\*\*결론\*\* — (.+)$/;function ts(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==Ru)return null;let r=Iu.exec(t[1]||"");if(!r)return null;let n=r[1].split(" ")[0],s=r[2],o=r[3],a=2;for(;a<t.length&&t[a].trim().length===0;)a+=1;let i=a<t.length?Lu.exec(t[a]):null,l=i?i[1].replace(/\s+/g," ").trim():"",u=i?a+1:a;return{lane:n,identifier:s,timestamp:o,conclusion:l,body:t.slice(u).join(`
`).trim()}}var Ei=20;function Ci(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let r=String(t.getMonth()+1).padStart(2,"0"),n=String(t.getDate()).padStart(2,"0"),s=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0");return`${r}-${n} ${s}:${o}`}function Ou(e){return e.length>Ei?`${e.slice(0,Ei)}\u2026`:e}function Du(e,t,r,n){let s=`${t.lane} ${Ou(t.identifier)}`;return c`<div class="detail-report">
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
        <span class="detail-report__time">${Ci(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${n&&t.body.length>0?c`<div class="detail-report__body">
          ${pr(t.body)}
        </div>`:""}
  </div>`}function Mu(e){return c`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${Ci(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${pr(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function Ri(e,t={},r={}){let n=Array.isArray(e)?e.filter(Boolean):[],s=r.expanded||new Set,o=typeof r.draft=="string"?r.draft:"",a=r.sending===!0,i=n.slice().sort((l,u)=>String(u.created_at||"").localeCompare(String(l.created_at||"")));return c`
    <div class="detail-section-label">댓글 (${n.length})</div>
    ${r.error?c`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:i.length===0?c`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:c`<div class="detail-comments" data-seam="comments">
            ${i.map(l=>{let u=ts(typeof l.text=="string"?l.text:"");return u?Du(l,u,t,s.has(l.id)):Mu(l)})}
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
  `}var Pu=["codex","opus","fable","self","skip"],Nu=["codex","fable","skip"],Fu=["low","medium","high","xhigh"],qu=["standard","fast_track"],Er=["orchestration_model","orchestration_effort","orchestration_speed","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_runtime","impl_model","impl_effort"],ro=["impl_runtime","orchestration_model"],fn=[{id:"worker-detail",label:"\uC6CC\uCEE4 \uC0C1\uC138",keys:["orchestration_effort","orchestration_speed"]},{id:"implementation-detail",label:"\uAD6C\uD604 \uC0C1\uC138",keys:["impl_model","impl_effort"]},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort"]}],no={orchestration_model:{title:"\uC6CC\uCEE4 \uC2E4\uD589 \uBAA8\uB378"},orchestration_effort:{title:"\uC6CC\uCEE4 reasoning effort"},orchestration_speed:{title:"\uC6CC\uCEE4 \uC2E4\uD589 \uC18D\uB3C4",help:"Fast\uB294 \uC9C0\uC6D0 \uBAA8\uB378\uC744 \uB354 \uBE60\uB974\uAC8C \uC2E4\uD589\uD558\uBA70 \uC0AC\uC6A9\uB7C9 \uBE44\uC6A9\uC774 \uC99D\uAC00\uD569\uB2C8\uB2E4."},spec_review_model:{title:"\uC2A4\uD399 \uB9AC\uBDF0\uC5B4"},spec_review_effort:{title:"\uC2A4\uD399 \uB9AC\uBDF0 reasoning effort"},plan_review_model:{title:"\uACC4\uD68D \uB9AC\uBDF0\uC5B4"},plan_review_effort:{title:"\uACC4\uD68D \uB9AC\uBDF0 reasoning effort"},impl_review_model:{title:"\uAD6C\uD604 \uB9AC\uBDF0\uC5B4"},impl_review_effort:{title:"\uAD6C\uD604 \uB9AC\uBDF0 reasoning effort"},impl_runtime:{title:"\uAD6C\uD604 runtime"},impl_model:{title:"\uAD6C\uD604 \uBAA8\uB378",help:"\uC6CC\uD06C\uD50C\uB85C\uAC00 \uBCF5\uC7A1 \uAD6C\uD604\uC778\uC9C0, \uBC94\uC704\uAC00 \uD55C\uC815\uB41C \uAD6C\uD604\uC778\uC9C0 \uD310\uB2E8\uD574 \uD604\uC7AC runtime\uC758 \uAD6C\uD604\uC6A9 \uBAA8\uB378\uC744 \uC120\uD0DD\uD569\uB2C8\uB2E4."},impl_effort:{title:"\uAD6C\uD604 reasoning effort",help:"\uC790\uB3D9 \uC120\uD0DD\uC774\uBA74 workflow tier\uC5D0 \uC120\uC5B8\uB41C effort\uB97C, \uBAA8\uB378\uB9CC \uC9C1\uC811 \uC9C0\uC815\uD588\uC73C\uBA74 \uD574\uB2F9 \uD558\uC704 \uC5D0\uC774\uC804\uD2B8 \uD638\uCD9C\uC758 \uAE30\uBCF8 effort\uB97C \uC0AC\uC6A9\uD569\uB2C8\uB2E4."},workflow_mode:{title:"\uC6CC\uD06C\uD50C\uB85C \uBAA8\uB4DC"}},Ii={spec_review_effort:"spec_review_model",impl_review_effort:"impl_review_model",plan_review_effort:"plan_review_model"},Bu=["self","skip"],Uu="opus",so={orchestration_model:"(\uAE30\uBCF8: opus)",orchestration_effort:"(\uAE30\uBCF8: CLI \uAE30\uBCF8)",orchestration_speed:"(\uAE30\uBCF8: Standard)",spec_review_model:"(\uAE30\uBCF8: codex)",spec_review_effort:"(\uAE30\uBCF8: \uD504\uB9AC\uC14B)",impl_review_model:"(\uAE30\uBCF8: codex)",impl_review_effort:"(\uAE30\uBCF8: \uD504\uB9AC\uC14B)",impl_runtime:"(\uAE30\uBCF8: orchestration runtime \uC0C1\uC18D)",plan_review_model:"(\uAE30\uBCF8: codex)",plan_review_effort:"(\uAE30\uBCF8: \uD504\uB9AC\uC14B)",impl_model:"(\uAE30\uBCF8: \uC791\uC5C5 \uC131\uACA9\uC5D0 \uB530\uB77C \uAD6C\uD604 \uBAA8\uB378 \uC790\uB3D9 \uC120\uD0DD)",impl_effort:"(\uAE30\uBCF8: \uC120\uD0DD\uB41C \uAD6C\uD604 \uC5D0\uC774\uC804\uD2B8\uC758 reasoning effort \uC0AC\uC6A9)"};function oo(e){let t=no[e]||{title:e};return c`<span data-exec-setting-label>
    <span data-exec-setting-title>${t.title}</span>
    <code data-exec-setting-key>${e}</code>
    ${t.help?c`<small data-exec-setting-help=${e}>${t.help}</small>`:""}
  </span>`}function ju(e,t,r=""){let n=t&&t[e];return typeof n=="string"&&n.length>0?`(\uAE30\uBCF8: ${e==="orchestration_speed"?n==="default"?"Standard":n==="fast"?"Fast":n:n} \u2014 ${r||"\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4 \uD504\uB9AC\uC14B"})`:so[e]||"(\uAE30\uBCF8)"}function Br(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Cr(e){if(!Br(e)||!Br(e.runners))return null;let t=Object.entries(e.runners).filter(([,r])=>Br(r)&&Br(r.models));return t.length>0?t:null}function to(e){return{value:e,label:e}}function ao(e){return{label:null,options:[{value:e,label:`${e} (\uBE44\uD638\uD658)`}]}}function Li(e,t,r=null){let n=Cr(e);if(!n)return t?[{label:null,options:[to(t)]}]:[];let s=n.filter(([a])=>r===null||a===r).map(([a,i])=>({label:a,options:Object.keys(i.models).map(to)})),o=s.some(a=>a.options.some(i=>i.value===t));return t&&!o?[ao(t),...s]:s}function _r(e,t){let r={label:null,options:e.map(to)};return t&&!e.includes(t)?[ao(t),r]:[r]}function rr(e,t){let r=Cr(e);if(!r||!t)return null;for(let[n,s]of r)if(Object.hasOwn(s.models,t))return n;return null}function io(e,t){return Br(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function zu(e,t){return Br(t)&&Array.isArray(t.orchestration_efforts)?t.orchestration_efforts.slice():io(e,t)}function Hu(e,t){let r=Cr(e);if(!r||!t)return[];for(let[,n]of r)if(Object.hasOwn(n.models,t))return zu(n,n.models[t]);return[]}function Wu(e,t){let r=Cr(e);if(!r||!t)return[];for(let[,n]of r){if(!Object.hasOwn(n.models,t))continue;let s=n.models[t];return Array.isArray(s.speed_tiers)?s.speed_tiers.slice():["default"]}return[]}function lo(e,t){let r=Cr(e);if(!r||!t)return[];for(let[,n]of r)if(Object.hasOwn(n.models,t))return io(n,n.models[t]);return[]}function Mi(e){let t=Cr(e);if(!t)return[];let r=[];for(let[,n]of t)for(let s of Object.values(n.models))for(let o of io(n,s))r.includes(o)||r.push(o);return r}function Pi(e,t){if(!t)return Mi(e);let n=Cr(e)?.find(([o])=>o===t)?.[1];if(!n)return[];let s=[];for(let o of Object.keys(n.models))for(let a of lo(e,o))s.includes(a)||s.push(a);return s}function ns(e,t,r){let n={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},s=n.impl_runtime==="inherit"?r:n.impl_runtime==="claude"||n.impl_runtime==="codex"?n.impl_runtime:null;if(n.impl_runtime==="inherit"&&!s)return n.impl_model="",n.impl_effort="",n;let o=rr(t,n.impl_model);if(n.impl_model&&(!s||o!==s))return n.impl_model="",n.impl_effort="",n;let a=n.impl_model?lo(t,n.impl_model):Pi(t,s);return n.impl_effort&&a.length>0&&!a.includes(n.impl_effort)&&(n.impl_effort=""),n}function Ur(e){let{selectedOf:t,effectiveOf:r,runner_catalog:n,controller_runtime:s}=e,o=r("orchestration_model")||Uu,a=r("impl_model"),i=r("impl_runtime"),l=i==="claude"||i==="codex"?i:i==="inherit"?s===void 0?rr(n,o):s:null;return Er.map(u=>{let p=t(u),m,h=!1;return u==="orchestration_model"?m=Li(n,p):u==="impl_runtime"?m=_r(["inherit","claude","codex"],p):u==="impl_model"?(m=l?Li(n,p,l):p?[ao(p)]:[],h=i==="inherit"&&l===null):u==="orchestration_effort"?m=_r(Hu(n,o),p):u==="orchestration_speed"?m=Gu(Wu(n,o),p):u==="impl_effort"?(m=_r(a?lo(n,a):l?Pi(n,l):Mi(n),p),h=i==="inherit"&&l===null):u==="plan_review_model"?m=_r(Nu,p):Object.hasOwn(Ii,u)?(m=_r(Fu,p),h=Bu.includes(r(Ii[u]))):m=_r(Pu,p),{key:u,groups:m,selected:p,disabled:h,runner:u==="orchestration_model"?rr(n,o):null}})}function rs(e,t,r){return c`
    ${typeof r=="string"?c`<option value="" ?selected=${!t}>${r}</option>`:""}
    ${e.map(n=>n.label===null?n.options.map(s=>Oi(s,t)):c`<optgroup label=${n.label}>
            ${n.options.map(s=>Oi(s,t))}
          </optgroup>`)}
  `}function Gu(e,t){return _r(e,t).map(r=>({...r,options:r.options.map(n=>{let s=n.label.endsWith("(\uBE44\uD638\uD658)"),o=n.value==="default"?"Standard":n.value==="fast"?"Fast":null;return{...n,label:s?o?`${o} (\uBE44\uD638\uD658)`:n.label:o||n.label}})}))}function Oi(e,t){return c`<option value=${e.value} ?selected=${e.value===t}>
    ${e.label}
  </option>`}function Di(e,t,r,n,s,o,a){return c`
    <div class="detail-kv">
      <span class="detail-kv__k">${oo(e)}</span>
      <span class="detail-kv__vgroup">
        <select
          class=${n?"detail-kv__v detail-kv__v--sel":"detail-kv__v"}
          aria-label=${e}
          data-key=${e}
          ?disabled=${s}
          @change=${i=>(e==="impl_runtime"||e==="impl_model"||e==="impl_effort")&&a.onImplTargetChange?a.onImplTargetChange(e,i.target.value):a.onChange(e,i.target.value)}
        >
          ${t}
        </select>
        ${o?c`<span class="detail-kv__note" data-runner-for=${e}
              >${o}</span
            >`:""}
      </span>
    </div>
  `}function Yu(e,t,r,n){return e.some(s=>t(s))?"\uC774\uC288 \uD540":e.some(s=>r(s))?`\uD504\uB9AC\uC14B \u300C${n||"\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4 \uD504\uB9AC\uC14B"}\u300D`:"\uAE30\uBCF8"}function Vu(e,t,r){let n=[t("orchestration_model")||"opus"],s=t("orchestration_effort"),o=t("orchestration_speed");s&&n.push(`effort ${s}`),o&&o!=="default"&&n.push(`speed ${o==="fast"?"Fast":o}`);let a=`${t("impl_runtime")||"inherit"} \xB7 ${t("impl_model")||"auto"}`,i=[["\uC2A4\uD399","spec_review_model","spec_review_effort"],["\uACC4\uD68D","plan_review_model","plan_review_effort"],["\uAD6C\uD604","impl_review_model","impl_review_effort"]].map(([u,p,m])=>{let h=t(p)||"codex",T=t(m);return`${u} ${h}${T?`/${T}`:""}`}),l=[{id:"worker",label:"\uC6CC\uCEE4",keys:Er.slice(0,3),value:n.join(" \xB7 ")},{id:"implementation",label:"\uAD6C\uD604",keys:["impl_runtime","impl_model","impl_effort"],value:a},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort"],value:i.join(" \xB7 ")}];return c`<section
    class="detail-exec-presets exec-settings-summary"
    data-exec-settings-summary
  >
    ${l.map(u=>c`<div
          class="workflow-summary__row exec-settings-summary__row"
          data-exec-summary=${u.id}
        >
          <span class="workflow-summary__label">${u.label}</span>
          <span class="detail-kv__vgroup">
            <span class="workflow-summary__value">${u.value}</span>
            <span class="detail-kv__v" data-exec-source
              >${Yu(u.keys,e,t,r)}</span
            >
          </span>
        </div>`)}
  </section>`}function Ni(e,t,r,n,s=""){let o=e&&e.metadata||{},a=r&&typeof r=="object"?r:{},i=$=>typeof o[$]=="string"?o[$]:"",l=$=>{let E=i($);return E||(typeof a[$]=="string"?a[$]:"")},u=Ur({selectedOf:i,effectiveOf:l,runner_catalog:n}),p=o.workflow_mode==="fast_track"?"fast_track":"standard",m=new Map(u.map($=>[$.key,$])),h=fn.flatMap($=>$.keys).filter($=>i($)).length,T=$=>{let E=m.get($);return E?Di(E.key,rs(E.groups,E.selected,ju(E.key,a,s)),E.selected,!!E.selected,E.disabled,E.runner,t):""};return c`
    <div class="detail-section-label">실행 설정 (수정 가능)</div>
    ${Vu(i,l,s)}
    <section class="exec-settings-core" data-exec-settings-core>
      ${Di("workflow_mode",rs(_r(qu,p),p),p,o.workflow_mode==="fast_track",!1,null,t)}
      ${ro.map(T)}
    </section>
    <details
      class="detail-exec-presets exec-settings-advanced"
      data-exec-settings-advanced
    >
      <summary>고급 설정 — ${h}개 변경됨</summary>
      ${fn.map($=>c`<section
            class="exec-settings-advanced__group"
            data-exec-settings-group=${$.id}
          >
            <h4>${$.label}</h4>
            ${$.keys.map(T)}
          </section>`)}
    </details>
  `}function Ku(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function Fi(e,t){let r=t.getWorkspacePath,n=t.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",a="",i="";function l($){$.key==="Escape"&&s&&($.preventDefault(),h())}document.addEventListener("keydown",l);function u(){return s?c`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>h()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${Ku(s)}</span
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
            ${o==="loading"?c`<div class="mv__status">불러오는 중…</div>`:o==="pending"?c`<div class="mv__status">${i}</div>`:o==="error"?c`<div class="mv__status mv__status--error">
                      ${i||"\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}
                    </div>`:pr(a)}
          </div>
        </div>
      </div>
    `:c``}function p(){je(u(),e)}async function m($,E={}){s=$,o="loading",a="",i="",p();let F=r?r():"";if(!F){o="error",i="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",p();return}if(!n){o="error",i="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",p();return}let x="/api/doc?workspace="+encodeURIComponent(F)+"&path="+encodeURIComponent($);try{let G=await n(x),X=await G.json().catch(()=>({}));if(!G.ok||!X||X.ok!==!0){if(X?.error==="not_found"&&E.missing_state==="plan_pending"){o="pending",i="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",p();return}o="error",i="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(X&&X.error||G.status)+")",p();return}a=String(X.content||""),o="ready",p()}catch{o="error",i="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",p()}}function h(){s=null,je(c``,e)}function T(){document.removeEventListener("keydown",l),h()}return{open:m,close:h,destroy:T}}var Zu=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],Ui="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function Xu(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function Qu(e){let t=ht(e);if(t.length>0)return t.map(s=>c`<span class="detail-usage-total" title=${s.tooltip}
          >${s.label}</span
        >`);let r=Nr(e);if(!r||!e)return"";let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return c`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${r.replace(/^τ /,"\u03C4 \uCD1D ")}${n}</span
    >${e.replayed?c`<span class="detail-usage-partial" title=${Ui}
          >부분 집계</span
        >`:""}`}function qi(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function Bi(e){if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?ji(t):""}function Ju(e){return e?["implementation","review-consult"].flatMap(r=>{let n=e.roles[r]?.codex;return n?n.legs.map(s=>{let a=ht({providers:{codex:{subtotal:s.subtotal,breakdown:s.usage,...s.replayed?{replayed:!0}:{}}},roles:{}})[0];return c`<div class="detail-session__leg detail-session__usage-detail">
        <span class="detail-session__leg-role detail-session__usage-label"
          >${r}</span
        >
        <span class="detail-session__leg-meta detail-session__usage-value"
          >${[s.provider,s.model].filter(Boolean).join(" \xB7 ")}</span
        >
        ${s.session_id?c`<span
              class="detail-session__leg-sid detail-session__sid"
              title=${s.session_id}
              >${s.session_id.slice(0,8)}</span
            >`:""}
        ${Bi(s.completed_at)?c`<span class="detail-session__leg-time detail-session__time"
              >${Bi(s.completed_at)}</span
            >`:""}
        ${a?c`<span class="detail-session__usage" title=${a.tooltip}
              >${a.label}</span
            >`:""}
      </div>`}):[]}):""}function ep(e,t){let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,n=[...Zu,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return c`<div class="detail-session__usage-detail">
    ${n.map(s=>c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${s.label}</span
          ><span class="detail-session__usage-value"
            >${Xu(e[s.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${r===null?"":c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${r.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?c`<span class="detail-session__usage-note">${Ui}</span>`:""}
  </div>`}var tp={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function ji(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=String(t.getHours()).padStart(2,"0"),n=String(t.getMinutes()).padStart(2,"0");return`${r}:${n}`}function rp(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,n])=>typeof n=="string"&&n.length>0).map(([n,s])=>`${n}=${s}`).join(" \xB7 "):"",r=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return c`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${r}</span>
    ${t?c`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}function zi(e,t={},r={}){let n=Array.isArray(e)?e:[],s=r.expanded||new Set;if(n.length===0)return c`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let o=new Set;for(let u of n)u&&typeof u.resumed_from=="string"&&u.resumed_from.length>0&&o.add(u.resumed_from);let a=u=>{if(!(u.status==="failed"||u.status==="orphaned"))return"";let m=typeof u.session_id=="string"&&u.session_id.length>0,h=o.has(u.attempt_id),T=m&&!h,$=m?h?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return c`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${u.attempt_id}
      ?disabled=${!T}
      title=${$}
      @click=${E=>{E.stopPropagation(),T&&t.onResume&&t.onResume(u.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},i=u=>{if(!(u.status==="failed"||u.status==="orphaned")||typeof u.cause!="string"||u.cause==="")return"";let m=u.cause_detail,h=m&&typeof m.reason=="string"&&m.reason.length>0?typeof m.command=="string"&&m.command.length>0?`${m.reason} \xB7 ${m.command}`:m.reason:u.cause;return c`<div class="detail-session__cause" title=${h}>
      ${u.cause}
    </div>`},l=u=>{let p=qi(Ls(u));if(ht(p).length===0&&!Nr(u.usage))return"";let m=s.has(u.attempt_id);return c`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${u.attempt_id}
      aria-expanded=${m?"true":"false"}
      title=${m?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${h=>{h.stopPropagation(),t.onToggleUsage&&t.onToggleUsage(u.attempt_id)}}
    >
      τ 자세히
    </button>`};return c`
    <div class="detail-section-label">
      세션 이력${Qu(r.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${n.map(u=>{let p=Ls(u),m=qi(p),h=ht(m);return c`<div class="detail-session-row">
          <button
            type="button"
            class="detail-session detail-session--${u.status||"unknown"}"
            data-attempt-id=${u.attempt_id}
            @click=${()=>t.onOpen&&t.onOpen(u.attempt_id)}
          >
            <span class="detail-session__glyph"
              >${tp[u.status||""]||"\xB7"}</span
            >
            <span class="detail-session__id">${u.attempt_id}</span>
            ${dr(u)?c`<span
                  class="detail-session__resumed"
                  title=${dr(u)}
                  >↻</span
                >`:""}
            <span class="detail-session__meta">${Wt(u)}</span>
            ${h.length>0?c`<span class="detail-session__role">orchestrator</span>`:""}
            ${u.session_id?c`<span class="detail-session__sid" title=${u.session_id}
                  >${String(u.session_id).slice(0,8)}</span
                >`:""}
            ${h.length>0?h.map(T=>c`<span
                      class="detail-session__usage"
                      title=${T.tooltip}
                      >${T.label}</span
                    >`):Nr(u.usage)?c`<span class="detail-session__usage"
                    >${Nr(u.usage)}</span
                  >`:""}
            <span class="detail-session__time">${ji(u.started_at)}</span>
          </button>
          ${l(u)} ${a(u)} ${i(u)} ${rp(u)}
          ${s.has(u.attempt_id)&&u.usage?ep(u.usage,u.runner==="codex"?"codex":"claude"):""}
          ${Ju(p)}
        </div>`})}
    </div>
  `}function Hi(e,t={}){return c`
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
    ${e.expanded?c`<div class="detail-prompt" data-seam="task-prompt">
          ${np(e)}
        </div>`:""}
  `}function np(e){let t=qr(e);if(t)return t;let r=e.data;if(!r)return"";if(r.missing)return c`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof r.default_task_prompt=="string"?tr("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",r.default_task_prompt):""}`;let n=Qn(r.recorded_at);return c`<div class="detail-prompt__meta">
      ${r.attempt_id}${n?` \xB7 ${n}`:""}
    </div>
    ${typeof r.task_prompt=="string"?tr("\uACFC\uC5C5 (user)",r.task_prompt):""}
    ${typeof r.system_prompt=="string"?tr("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",r.system_prompt):""}`}var sp=["open","in_progress","deferred","resolved","closed"],op=[0,1,2,3,4];function Wi(e,t){let r=t.issueStores,n=t.onClose,s=t.transport,o=t.onNavigate,a=t.queueStore,i=t.execPresetStore,l=t.sessionLogStore,u=null,p=null,m={},h="",T=!1,$=!1,E=!1,F="",x="",G="";function X(){$=!1,E=!1,F="",x="",G=""}let I=[],O=null,A=null,U=!1,R="",oe=!1,Ce=0,ne=new Set;function me(){I=[],O=null,A=null,U=!1,R="",oe=!1,Ce+=1,ne.clear()}async function Oe(d){if(!s)return;let k=++Ce;try{let y=await Promise.resolve(s("get-comments",{id:d}));if(k!==Ce||d!==u)return;I=Array.isArray(y)?y:[],U=!1}catch{if(k!==Ce||d!==u)return;U=!0}_()}function Ve(){if(!s||!u)return;let d=p&&typeof p.comment_count=="number"?p.comment_count:null;if(O!==u){O=u,A=d,Oe(u);return}d!==null&&d!==A&&(A=d,Oe(u))}function st(d){ne.has(d)?ne.delete(d):ne.add(d),_()}function Pe(d){let k=R.trim().length===0;R=d,k!==(d.trim().length===0)&&_()}async function De(){let d=R.trim();if(!s||!u||d.length===0||oe)return;let k=u;oe=!0,_();let y=!1;try{let M=await Promise.resolve(s("add-comment",{id:k,text:d}));Array.isArray(M)&&M.length>0&&(y=!0,k===u&&(I=M,U=!1,R="",A=M.length))}catch{y=!1}y||K("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),k===u&&(oe=!1),_()}let Ae={onToggle:st,onDraftInput:Pe,onSubmit:De},ge=document.createElement("div");ge.className="md-viewer-root",document.body.appendChild(ge);let ve=Fi(ge,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),he=document.createElement("div");he.className="session-log-root",document.body.appendChild(he);let V=es(he,{transport:s?(d,k)=>Promise.resolve(s(d,k)):void 0,sessionLogStore:l}),W=!1,_e=!1,Z=!1,ye=null,j=null,P=0;function ce(d){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${d}`}function we(){W=!1,_e=!1,Z=!1,ye=null,j=null,P+=1}async function ke(d){if(!s)return;let k=++P;_e=!0,Z=!1,_();try{let y=await Promise.resolve(s("get-bead-prompt",{bead_id:d}));if(k!==P)return;!y||typeof y!="object"||Array.isArray(y)?Z=!0:(ye=y,j=ce(d))}catch{k===P&&(Z=!0)}finally{k===P&&(_e=!1,_())}}function Ue(){if(W=!W,W&&u&&j!==ce(u)){ye=null,ke(u);return}_()}function Re(){if(!a||!u)return[];let d=a.get();return(d&&d.attempts?Object.values(d.attempts):[]).filter(y=>y&&y.bead_id===u).sort((y,M)=>(M.started_at||0)-(y.started_at||0)).map(y=>({attempt_id:y.attempt_id,bead_id:y.bead_id,status:y.status,started_at:typeof y.started_at=="number"?y.started_at:null,runner:y.runner||null,model:y.model||null,effort:y.effort||null,speed:y.speed||null,session_id:y.session_id||null,resumed_from:y.resumed_from||null,continuation_mode:y.continuation_mode||null,dismissed_at:typeof y.dismissed_at=="number"?y.dismissed_at:null,cause:typeof y.cause=="string"?y.cause:null,cause_detail:y.cause_detail||null,exec_default_preset_id:typeof y.exec_default_preset_id=="string"?y.exec_default_preset_id:null,exec_default_preset_revision:typeof y.exec_default_preset_revision=="number"?y.exec_default_preset_revision:null,exec_values:y.exec_values&&typeof y.exec_values=="object"?y.exec_values:null,usage:y.usage||null,usage_legs:Array.isArray(y.usage_legs)?y.usage_legs:[]}))}function ze(){if(!a||!u)return null;let d=a.get();return Dt(d&&d.attempts||{},u)}let Ne=new Set;function tt(d){Ne.has(d)?Ne.delete(d):Ne.add(d),_()}function D(d){let k=a?a.get():null,y=k&&k.attempts?k.attempts[d]:null;V.open({attempt_id:d,meta:y?{runner:y.runner||void 0,model:y.model||void 0,effort:y.effort||void 0,status:y.status||void 0,session_id:y.session_id||void 0}:{}})}async function b(d){if(!s||!d)return;let k=()=>{let xe=a?a.get():null;return xe&&typeof xe.revision=="number"?xe.revision:0},y=async(xe={})=>await s("worker-attempt-resume",{attempt_id:d,expected_revision:k(),...xe}),M=xe=>{xe?.queue&&a?.set&&a.set(xe.queue)},J=await y();if(M(J),J&&J.conflict){let xe=J.queue&&typeof J.queue.revision=="number"?J.queue.revision:k();J=await s("worker-attempt-resume",{attempt_id:d,expected_revision:xe}),M(J)}J=await Xt(J,(xe,gt)=>y({continuation:xe,decision_token:gt}),{onResult:M,refresh:()=>y()}),J&&J.resumed===!1&&!J.conflict&&J.reason&&K(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${J.reason}`,"error",2400)}let S={onOpen:D,onResume:b,onToggleUsage:tt};function C(){let d=a?a.get():null,k=d&&d.default_exec_preset_id,y=typeof k=="string"?ue()?.presets.find(M=>M.id===k):null;return y&&y.compatible!==!1&&y.settings?y.settings:{}}function H(){let d=a?a.get():null,k=d&&d.default_exec_preset_id,y=typeof k=="string"?ue()?.presets.find(M=>M.id===k):null;return y&&y.compatible!==!1&&typeof y.name=="string"?y.name:""}function q(){let d=a?a.get():null;return d&&d.runner_catalog||null}function Q(){let d=p?.metadata&&typeof p.metadata=="object"?p.metadata:{},y=(Object.hasOwn(m,"orchestration_model")?m.orchestration_model:void 0)||(typeof d.orchestration_model=="string"?d.orchestration_model:"")||(typeof C().orchestration_model=="string"?C().orchestration_model:"")||"opus";return rr(q(),y)}function ue(){let d=i?i.get():null;return!d||typeof d.revision!="number"?null:{revision:d.revision,presets:Array.isArray(d.presets)?d.presets:[]}}function Ie(d){let k=d&&d.settings&&typeof d.settings=="object"?d.settings:{},y=M=>typeof k[M]=="string"?k[M]:M==="impl_runtime"&&typeof k.impl_model=="string"&&rr(q(),k.impl_model)||"";return Ur({selectedOf:y,effectiveOf:y,runner_catalog:q()}).some(M=>M.groups.some(J=>J.options.some(xe=>xe.value===M.selected&&xe.label.endsWith("(\uBE44\uD638\uD658)"))))}function Je(d){i&&d&&typeof d.revision=="number"&&Array.isArray(d.presets)&&i.set({revision:d.revision,presets:d.presets})}async function He(){let d=ue(),k=d?.presets.find(y=>y.id===h);if(!(!s||!u||!d||!k||Ie(k)||T)){T=!0,_();try{let y=await Promise.resolve(s("apply-exec-preset",{id:u,preset_id:k.id,expected_revision:d.revision}));if(y&&y.conflict){Je(y),K("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let M=y&&Array.isArray(y.issue)?y.issue[0]:y?.issue;if(y&&y.applied&&M&&typeof M=="object"){p=M;for(let J of Er)delete m[J];K("\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",2400);return}y&&y.error==="bd_readback_failed"?K("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):K("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(y){y&&typeof y=="object"&&y.code==="bd_readback_failed"?K("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):K("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{T=!1,_()}}}function dt(){let d=ue();if(d&&d.presets.length===0)return c`<section class="detail-exec-presets">
        <div class="detail-section-label">실행 프리셋</div>
        <p>전역 실행 설정에서 프리셋을 추가하세요.</p>
        <button
          type="button"
          data-open-exec-presets
          @click=${()=>t.onOpenExecPresets?.()}
        >
          전역 실행 설정 열기
        </button>
      </section>`;let k=d?d.presets:[],y=k.find(J=>J.id===h),M=y?Ie(y):!1;return c`<section class="detail-exec-presets">
      <div class="detail-section-label">실행 프리셋</div>
      <div class="detail-exec-presets__controls">
        <select
          data-exec-preset-select
          aria-label="실행 프리셋"
          ?disabled=${d===null||T}
          @change=${J=>{h=J.target.value,_()}}
        >
          <option value="" ?selected=${h===""}>
            ${d===null?"\uBD88\uB7EC\uC624\uB294 \uC911\u2026":"\uD504\uB9AC\uC14B \uC120\uD0DD"}
          </option>
          ${k.map(J=>{let xe=Ie(J);return c`<option
              value=${J.id}
              ?selected=${J.id===h}
            >
              ${J.name}${xe?" (\uBE44\uD638\uD658)":""}
            </option>`})}
        </select>
        <button
          type="button"
          data-apply-exec-preset
          ?disabled=${d===null||!y||M||T}
          @click=${()=>{He()}}
        >
          12개 설정 적용
        </button>
      </div>
      <p>적용하면 현재 이슈 실행 설정 전체를 교체합니다.</p>
    </section>`}let it=null;r&&r.subscribe&&(it=r.subscribe(()=>rt()));let ot=null;a&&typeof a.subscribe=="function"&&(ot=a.subscribe(()=>{u&&_()}));let vt=null;i&&typeof i.subscribe=="function"&&(vt=i.subscribe(()=>{u&&_()}));function It(d){d.key==="Escape"&&u&&(d.preventDefault(),n())}document.addEventListener("keydown",It);function rt(){if(u){if(r&&typeof r.snapshotFor=="function"){let d=r.snapshotFor("detail:"+u)||[];p=d.find(y=>y&&y.id===u)||d[0]||p}Ve(),_()}}function lt(d){Sr(d).then(k=>{k?K("\uBCF5\uC0AC\uB428","success",1200):K("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function nt(d){d.preventDefault(),d.stopPropagation(),u&&lt(u)}function ut(d,k){d.preventDefault(),d.stopPropagation(),lt(k)}function Me(d,k,y){d.preventDefault(),d.stopPropagation(),ve.open(k,{missing_state:y})}function N(d,k){m[d]=k,_(),!(!s||!u)&&Promise.resolve(s("update-exec-settings",{id:u,key:d,value:k})).catch(()=>{K("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}function Y(d,k){let y=p||{},M=y.metadata&&typeof y.metadata=="object"?y.metadata:{},J={};for(let Be of["impl_runtime","impl_model","impl_effort"])J[Be]=Object.hasOwn(m,Be)?m[Be]:typeof M[Be]=="string"?M[Be]:"";J[d]=k;let xe=ns(J,q(),Q()),gt={};for(let Be of["impl_runtime","impl_model","impl_effort"])gt[Be]=m[Be],m[Be]=xe[Be]||"";_(),!(!s||!u)&&Promise.resolve(s("update-impl-target",{id:u,...xe,orchestration_runtime:Q()})).then(Be=>{let or=Array.isArray(Be)?Be[0]:Be;if(!or||typeof or!="object"||!or.id)throw new Error("implementation target readback failed");p=or;for(let ls of["impl_runtime","impl_model","impl_effort"])delete m[ls];_()}).catch(()=>{for(let Be of["impl_runtime","impl_model","impl_effort"])gt[Be]===void 0?delete m[Be]:m[Be]=gt[Be];_(),K("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error")})}async function se(d,k,y){if(!s||!u)return!1;try{let M=await Promise.resolve(s(d,k)),J=Array.isArray(M)?M[0]:M;return J&&typeof J=="object"&&J.id?(p=J,!0):(K(y,"error"),!1)}catch{return K(y,"error"),!1}}function pe(d){setTimeout(()=>{try{let k=e.querySelector(d);k&&typeof k.focus=="function"&&k.focus()}catch{}},0)}function $e(){$=!0,F=p&&p.title||"",_(),pe('.detail-edit__input[data-edit="title"]')}function Ee(d){F=d.target.value}function Ge(){$=!1,F="",_()}function et(){se("edit-text",{id:u,field:"title",value:F},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(k=>{k&&($=!1,F=""),_()})}function Te(){E=!0,x=p&&p.description||"",_(),pe('.detail-edit__textarea[data-edit="description"]')}function Ke(d){x=d.target.value}function Se(){E=!1,x="",_()}function ft(){se("edit-text",{id:u,field:"description",value:x},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(k=>{k&&(E=!1,x=""),_()})}function bt(d,k,y,M){if(d.key==="Escape"){d.stopPropagation(),y();return}d.key==="Enter"&&(!M||d.ctrlKey||d.metaKey)&&(d.preventDefault(),k())}function sr(d){let k=d.target.value;se("update-status",{id:u,status:k},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>_())}function jt(d){let k=Number(d.target.value);se("update-priority",{id:u,priority:k},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>_())}function f(d){G=d.target.value}function w(){let d=G.trim();d.length!==0&&se("label-add",{id:u,label:d},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(k=>{k&&(G=""),_()})}function L(d){if(d.key==="Escape"){d.stopPropagation(),G="",_();return}d.key==="Enter"&&(d.preventDefault(),w())}function re(d){se("label-remove",{id:u,label:d},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>_())}let fe={onCopyPath:ut,onOpenDoc:Me},be={onChange:N,onImplTargetChange:Y};function ae(d){return typeof d=="string"?d:d&&typeof d=="object"?String(d.id||d.to||d.issue_id||d.depends_on||""):""}function ie(d){switch(d&&typeof d=="object"?String(d.dependency_type||d.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function Le(d){let y=(Array.isArray(d.dependencies)?d.dependencies:[]).map(M=>({id:ae(M),icon:ie(M)})).filter(M=>M.id.length>0);return c`
      <div class="detail-section-label">의존성</div>
      ${y.length===0?c`<div class="detail-empty">의존성 없음</div>`:c`<div class="detail-deps">
            ${y.map(M=>o?c`<button
                    type="button"
                    class="detail-dep detail-dep--link"
                    @click=${()=>o(M.id)}
                  >
                    ${M.icon?`${M.icon} `:""}${M.id}
                  </button>`:c`<span class="detail-dep"
                    >${M.icon?`${M.icon} `:""}${M.id}</span
                  >`)}
          </div>`}
    `}function ct(d){let k=d.metadata||{},y=d.workflow||{},M=y.stages||{},J=M.spec&&M.spec.stale,xe=M.impl&&M.impl.stale,gt=M.plan||null,Be=y.route_source==="derived",or=y.route||k.route||"\u2014";return c`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${Be?" detail-kv__v--derived":""}"
          title=${Be?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${Be?"unset":or}</span
        >
      </div>
      ${y.route!=="quick_fix"||Object.hasOwn(k,"spec_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${k.spec_review||"\uC5C6\uC74C"}${J?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${y.route==="full_plan"?c`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${gt?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${gt?.approval_receipt||"\uC5C6\uC74C"}${gt?.approval_state==="stale"?" \xB7 stale":gt?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${y.route!=="quick_fix"||Object.hasOwn(k,"impl_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${k.impl_review||"\uC5C6\uC74C"}${xe?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${k.pr_url?c`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${k.pr_url}</span>
          </div>`:""}
    `}let _t={route:["quick_fix","spec_backed","full_plan"]};async function St(d,k){let y=k.target.value;if(d==="route"&&p&&p.metadata&&p.metadata.route==="full_plan"&&y!=="full_plan"&&!window.confirm(`full_plan \u2192 ${y||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){_();return}await se("update-workflow-meta",{id:u,key:d,value:y},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),_()}function yt(d){let k=d.metadata||{};return c` ${((M,J)=>{let xe=_t[M],gt=typeof k[M]=="string"?k[M]:"";return c`<div class="detail-kv">
        <span class="detail-kv__k">${M}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${M}
          data-edit=${`wfmeta-${M}`}
          @change=${Be=>St(M,Be)}
        >
          <option value="" ?selected=${!xe.includes(gt)}>
            ${J}
          </option>
          ${xe.map(Be=>c`<option value=${Be} ?selected=${gt===Be}>${Be}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function le(d,k){return $?c`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${F}
            @input=${Ee}
            @keydown=${y=>bt(y,et,Ge,!1)}
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
              @click=${Ge}
            >
              취소
            </button>
          </div>
        </div>
      `:c`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${d}</h2>
        ${ht(k).map(y=>c`<span class="detail-usage-total" title=${y.tooltip}
              >${y.label}</span
            >`)}
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${$e}
        >
          ✎
        </button>
      </div>
    `}function v(d){let k=Tt(d.created_at),y=Tt(d.updated_at);return!k&&!y?c``:c`
      ${k?c`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${k}</span>
          </div>`:""}
      ${y?c`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${y}</span>
          </div>`:""}
    `}function z(d,k){return c`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${sr}
        >
          ${sp.map(y=>c`<option value=${y} ?selected=${y===d}>${y}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${jt}
        >
          ${op.map(y=>c`<option value=${String(y)} ?selected=${y===k}>
                P${y}
              </option>`)}
        </select>
      </div>
    `}function ee(d){return c`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${E?"":c`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${Te}
            >
              ✎
            </button>`}
      </div>
      ${E?c`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${x}
              @input=${Ke}
              @keydown=${k=>bt(k,ft,Se,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${ft}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${Se}
              >
                취소
              </button>
            </div>
          </div>`:c`<div class="detail-overlay__desc">
            ${d||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function qe(d){let k=typeof d.notes=="string"?d.notes:"";return k.trim().length===0?c``:c`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${k}</div>
    `}function Xe(d){let k=Array.isArray(d.labels)?d.labels:[];return c`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${k.map(y=>c`<span class="detail-label-chip"
              >${y}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${y}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+y}
                @click=${()=>re(y)}
              >
                ×
              </button></span
            >`)}
        <span class="detail-label-add">
          <input
            class="detail-label-add__input"
            aria-label="라벨 추가"
            placeholder="라벨 추가"
            .value=${G}
            @input=${f}
            @keydown=${L}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${w}
          >
            추가
          </button>
        </span>
      </div>
    `}function de(){if(!u)return c``;let d=p||{},k=String(d.id||u),y=d.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",M=ze(),J=d.status||"open",xe=typeof d.priority=="number"?Math.max(0,Math.min(4,d.priority)):"",gt=d.description||"",Be={...d,metadata:{...d.metadata||{},...m}};return c`
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
            ${k}
          </button>
          ${le(y,M)}
          ${z(J,xe)} ${v(d)}
          ${ee(gt)}
          ${Ri(I,Ae,{expanded:ne,draft:R,sending:oe,error:U})}
          ${qe(d)} ${Xe(d)} ${Le(d)}
          ${ct(d)} ${yt(d)}
          ${Ti(d,fe)}
          ${dt()}
          ${Ni(Be,be,C(),q(),H())}
          ${Hi({expanded:W,loading:_e,error:Z,data:ye},{onToggle:Ue})}
          ${zi(Re(),S,{total:M,expanded:Ne})}
        </div>
      </div>
    `}function _(){je(de(),e)}return{load(d){d!==u&&(m={},h="",X(),me(),we()),u=d,p=null,rt()},clear(){u=null,p=null,m={},h="",T=!1,X(),me(),we(),ve.close(),V.close(),je(c``,e)},destroy(){it&&(it(),it=null),ot&&(ot(),ot=null),vt&&(vt(),vt=null),document.removeEventListener("keydown",It),ve.destroy(),ge.parentNode&&ge.parentNode.removeChild(ge),V.destroy(),he.parentNode&&he.parentNode.removeChild(he),u=null,p=null,h="",T=!1,me(),we(),je(c``,e)}}}var ap=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function Gi(e,t){return Cs(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function ip(e,t,r){if(!r)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(o=>o!==e)};let n=t.hidden_labels.filter(o=>o!==e);return t.hidden_prefixes.some(o=>o.length>0&&e.startsWith(o))?{hidden_labels:n,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:n}}function Yi(e,t){let{policyStore:r,transport:n,labelOptions:s}=t,o=document.createElement("dialog");o.id="display-settings-dialog",o.className="display-settings",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),e.appendChild(o);let a="";async function i(A){let U=r.get();if(U)try{let R=await n("display-policy-set",{expected_revision:U.revision,policy:A(U)});l(R),R&&R.conflict&&R.policy&&(R=await n("display-policy-set",{expected_revision:R.policy.revision,policy:A(R.policy)}),l(R)),R&&R.conflict&&K("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC","error",4e3)}catch{K("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function l(A){A&&A.policy&&typeof A.policy=="object"&&r.set(A.policy)}function u(A){let U=r.get();if(!U)return;let R=Gi(A,U)!=="shown";i(oe=>ip(A,oe,R))}function p(){let A=a.trim();A.length!==0&&(a="",i(U=>U.hidden_prefixes.includes(A)?{hidden_prefixes:U.hidden_prefixes}:{hidden_prefixes:[...U.hidden_prefixes,A]}),F())}function m(A){i(U=>({hidden_prefixes:U.hidden_prefixes.filter(R=>R!==A)}))}function h(A){let U=r.get();if(!U)return;let R=U.chips[A]===!1;i(()=>({chips:{[A]:R}}))}function T(A){let U=s();return c`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">라벨 표시</h3>
        <p class="display-settings__hint">
          라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을
          누르면 그 라벨만 예외로 다시 표시됩니다.
        </p>
        ${U.length===0?c`<div class="display-settings__empty">라벨 없음</div>`:c`<div class="display-settings__pills">
              ${U.map(R=>{let oe=Gi(R,A);return c`<button
                  type="button"
                  class=${`display-settings__pill display-settings__pill--${oe}`}
                  data-label=${R}
                  data-state=${oe}
                  @click=${()=>u(R)}
                >
                  ${R}
                </button>`})}
            </div>`}
      </section>
    `}function $(A){return c`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">숨김 prefix</h3>
        <div class="display-settings__prefixes">
          ${A.hidden_prefixes.map(U=>c`<span class="display-settings__prefix">
                ${U}
                <button
                  type="button"
                  class="display-settings__prefix-remove"
                  aria-label=${`${U} \uADDC\uCE59 \uC81C\uAC70`}
                  @click=${()=>m(U)}
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
            @input=${U=>{a=String(U.target.value||"")}}
          />
          <button type="button" @click=${p}>추가</button>
        </div>
      </section>
    `}function E(A){return c`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">카드 표시 요소</h3>
        <div class="display-settings__toggles">
          ${ap.map(([U,R])=>c`<label class="display-settings__toggle">
                <input
                  type="checkbox"
                  data-chip=${U}
                  .checked=${A.chips[U]!==!1}
                  @change=${()=>h(U)}
                />
                <span>${R}</span>
              </label>`)}
        </div>
      </section>
    `}function F(){let A=r.get();je(c`
        <div class="display-settings__container">
          <header class="display-settings__header">
            <div class="display-settings__title">표시 설정</div>
            <button
              type="button"
              class="display-settings__close"
              aria-label="닫기"
              @click=${O}
            >
              ×
            </button>
          </header>
          <div class="display-settings__body">
            ${A?c`${T(A)} ${$(A)}
                ${E(A)}`:c`<div class="display-settings__empty">
                  표시 정책을 불러오는 중…
                </div>`}
          </div>
        </div>
      `,o)}let x=!1,G=()=>{x=!1};o.addEventListener("close",G),o.addEventListener("cancel",G);let X=null;r.subscribe&&(X=r.subscribe(()=>{x&&F()}));function I(){x||(a="",x=!0,F(),typeof o.showModal=="function"?o.showModal():o.setAttribute("open",""))}function O(){x&&(x=!1,typeof o.close=="function"?o.close():o.removeAttribute("open"))}return{open:I,close:O,destroy(){x=!1,o.removeEventListener("close",G),o.removeEventListener("cancel",G),X&&(X(),X=null),o.remove()}}}function Vi(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let r=t.querySelector("#fatal-error-title"),n=t.querySelector("#fatal-error-message"),s=t.querySelector("#fatal-error-detail"),o=t.querySelector("#fatal-error-reload"),a=t.querySelector("#fatal-error-close"),i=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},l=(u,p,m="")=>{r&&(r.textContent=u||"Unexpected Error"),n&&(n.textContent=p||"An unrecoverable error occurred.");let h=typeof m=="string"?m.trim():"";if(s&&(h.length>0?(s.textContent=h,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),a&&a.addEventListener("click",()=>i()),t.addEventListener("cancel",u=>{u.preventDefault(),i()}),{open:l,close:i,getElement(){return t}}}function lp(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";if(e<6e4)return`${Math.round(e/1e3)}\uCD08`;let t=e/6e4;return`${Number.isInteger(t)?t:Math.round(t*10)/10}\uBD84`}function cp(e){return Array.isArray(e)?e.filter(t=>typeof t=="string").join(" "):""}function ss(e,t){let{queueStore:r,presetStore:n,transport:s,getWorkspacePath:o}=t,a=document.createElement("dialog");a.id="worker-exec-defaults-dialog",a.className="exec-defaults",a.setAttribute("role","dialog"),a.setAttribute("aria-modal","true"),e.appendChild(a);let i=null,l=!1;function u(){return r&&r.get()||{revision:0,exec_defaults:{}}}function p(){let b=u();return typeof b.revision=="number"?b.revision:0}function m(){let b=n?n.get():null;return!b||typeof b.revision!="number"?null:{revision:b.revision,presets:Array.isArray(b.presets)?b.presets:[]}}function h(b){n&&b&&typeof b.revision=="number"&&Array.isArray(b.presets)&&n.set({revision:b.revision,presets:b.presets})}function T(b){b&&b.queue&&r&&r.set(b.queue)}function $(){return u().runner_catalog??null}let E=null;function F(){if(E!==null)return E;let b=u().default_exec_preset_id;return typeof b=="string"&&b.length>0?b:null}async function x(b){if(!s)return;let S=m();if(!S)return;E=b||"";let C=O(b);if(we(),!C.viable){K(C.missing?"\uC120\uD0DD\uD55C \uD504\uB9AC\uC14B\uC744 \uCC3E\uC744 \uC218 \uC5C6\uC5B4 \uC800\uC7A5\uD558\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.":"\uBE44\uD638\uD658 \uD504\uB9AC\uC14B\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4 \uAE30\uBCF8\uAC12\uC73C\uB85C \uC800\uC7A5\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.","error",4e3),E=null,we();return}try{let H=await s("worker-queue-set-default-exec-preset",{preset_id:b||null,expected_queue_revision:p(),expected_preset_revision:S.revision});T(H),H&&H.presets&&n&&n.set(H.presets),H&&H.conflict?K("\uAE30\uBCF8 \uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uC120\uD0DD\uC744 \uAC80\uD1A0\uD55C \uB4A4 \uB2E4\uC2DC \uC800\uC7A5\uD558\uC138\uC694.","error",4e3):H&&H.applied||K("\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4 \uAE30\uBCF8 \uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328","error",4e3)}catch{K("\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4 \uAE30\uBCF8 \uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328","error",4e3)}E=null,we()}function G(b){i={id:b.id,name:b.name,settings:{...b.settings||{}}},U(),l=!1,we()}function X(){i={id:null,name:"",settings:{}},l=!1,we()}function I(b){let S=b&&b.settings&&typeof b.settings=="object"?b.settings:{},C=H=>typeof S[H]=="string"?S[H]:H==="impl_runtime"&&typeof S.impl_model=="string"&&rr($(),S.impl_model)||"";return Ur({selectedOf:C,effectiveOf:C,runner_catalog:$()}).some(H=>H.groups.some(q=>q.options.some(Q=>Q.value===H.selected&&Q.label.endsWith("(\uBE44\uD638\uD658)"))))}function O(b){if(!b)return{viable:!0,missing:!1,incompatible:!1,preset:null};let C=m()?.presets.find(q=>q.id===b);if(!C||C.migration_pending===!0)return{viable:!1,missing:!0,incompatible:!1,preset:null};let H=C.compatible===!1||I(C);return{viable:!H,missing:!1,incompatible:H,preset:C}}function A(){let b=i?.settings.orchestration_model;return typeof b!="string"?null:rr($(),b)}function U(){if(!i)return;let b=ns({impl_runtime:i.settings.impl_runtime||"",impl_model:i.settings.impl_model||"",impl_effort:i.settings.impl_effort||""},$(),A());for(let S of["impl_runtime","impl_model","impl_effort"])b[S]?i.settings[S]=b[S]:delete i.settings[S]}function R(b){let S=b&&b.settings&&typeof b.settings=="object"?b.settings:{},C=Er.filter(q=>typeof S[q]=="string").length,H=Er.filter(q=>typeof S[q]=="string").map(q=>`${no[q]?.title||q}: ${S[q]}`);return{count:`${C}/12 \uC9C0\uC815`,choices:H.length>0?H.join(" \xB7 "):"\uBAA8\uB4E0 \uD56D\uBAA9 \uAE30\uBCF8\uAC12"}}async function oe(b){if(!s||!window.confirm(`\u201C${b.name}\u201D \uD504\uB9AC\uC14B\uC744 \uC0AD\uC81C\uD560\uAE4C\uC694? \uC774\uBBF8 \uC801\uC6A9\uB41C \uC774\uC288\uB294 \uBCC0\uACBD\uB418\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.`))return;let S=m();if(S)try{let C=await s("exec-preset-delete",{expected_revision:S.revision,id:b.id});h(C),C&&C.conflict&&K("\uD504\uB9AC\uC14B\uC774 \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uB2E4\uC2DC \uD655\uC778\uD558\uC138\uC694.","error",4e3)}catch{K("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328","error",4e3)}}async function Ce(b=!1){if(!s||!i)return;let S=m();if(!S)return;let C=b||i.id===null,H={expected_revision:S.revision,...C?{}:{id:i.id},name:i.name,settings:{...i.settings}};try{let q=await s(C?"exec-preset-create":"exec-preset-update",H);if(h(q),q&&q.conflict){l=!0,we();return}if(q&&q.applied){i=null,l=!1,we();return}K("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328","error",4e3)}catch{K("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function ne(b){return c`<div class="exec-defaults__row exec-preset-editor__row">
      <span class="exec-defaults__k">${oo(b.key)}</span>
      <select
        class="exec-defaults__sel"
        data-preset-key=${b.key}
        ?disabled=${b.disabled}
        @change=${S=>{if(!i)return;let C=S.target.value;C?i.settings[b.key]=C:delete i.settings[b.key],(b.key==="impl_runtime"||b.key==="impl_model"||b.key==="impl_effort"||b.key==="orchestration_model")&&U(),l=!1,we()}}
      >
        ${rs(b.groups,b.selected,so[b.key]||"(\uAE30\uBCF8)")}
      </select>
    </div>`}function me(){if(!i)return"";let b=ue=>typeof i?.settings[ue]=="string"?i.settings[ue]:"",S=Ur({selectedOf:b,effectiveOf:b,runner_catalog:$(),controller_runtime:A()}),C=fn.flatMap(ue=>ue.keys).filter(ue=>typeof i?.settings[ue]=="string").length,H=ue=>{let Ie=S.find(Je=>Je.key===ue);return Ie?ne(Ie):""},q=m(),Q=i.id!==null&&q!==null&&!q.presets.some(ue=>ue.id===i?.id);return c`<div class="exec-preset-editor" data-preset-editor>
      <label class="exec-preset-editor__name">
        프리셋 이름
        <input
          type="text"
          value=${i.name}
          data-preset-name
          @input=${ue=>{i&&(i.name=ue.target.value,l=!1)}}
        />
      </label>
      ${l?c`<p class="exec-preset-editor__conflict" data-preset-conflict>
            다른 곳에서 변경됨 — 최신 목록을 확인한 뒤 다시 저장하세요.
          </p>`:""}
      ${Q?c`<p class="exec-preset-editor__conflict">
            편집하던 프리셋이 다른 곳에서 삭제됐습니다.
          </p>`:""}
      <section class="exec-preset-editor__core" data-preset-core>
        ${ro.map(H)}
      </section>
      <details class="exec-preset-editor__advanced" data-preset-advanced>
        <summary>고급 설정 — ${C}개 변경됨</summary>
        ${fn.map(ue=>c`<section
              class="exec-preset-editor__group"
              data-preset-group=${ue.id}
            >
              <h4>${ue.label}</h4>
              ${ue.keys.map(H)}
            </section>`)}
      </details>
      <div class="exec-preset-editor__actions">
        ${Q?c`<button
              type="button"
              data-preset-save-as-new
              @click=${()=>{Ce(!0)}}
            >
              새 프리셋으로 저장
            </button>`:c`<button
              type="button"
              data-preset-save
              @click=${()=>{Ce(!1)}}
            >
              저장
            </button>`}
        <button
          type="button"
          data-preset-cancel
          @click=${()=>{i=null,l=!1,we()}}
        >
          취소
        </button>
      </div>
    </div>`}function Oe(){let b=m(),S=b?b.presets.filter(q=>q?.migration_pending!==!0):[],C=F()||"",H=O(C);return c`<section class="exec-presets" data-exec-presets>
      <div class="exec-presets__heading">
        <h3>공용 실행 프리셋</h3>
        <button type="button" data-preset-new @click=${X}>
          + 새 프리셋
        </button>
      </div>
      <p class="exec-defaults__hint">
        모든 워크스페이스에서 공유하며, 이슈에 적용하면 값이 복사됩니다.
      </p>
      ${b===null?c`<p class="exec-presets__empty">프리셋을 불러오는 중…</p>`:S.length===0?c`<p class="exec-presets__empty">
              아직 공용 프리셋이 없습니다.
            </p>`:S.map(q=>{let Q=R(q),ue=O(q.id),Ie=q.id===C,Je=ue.missing?"\uD504\uB9AC\uC14B\uC744 \uCC3E\uC744 \uC218 \uC5C6\uC5B4 \uAE30\uBCF8\uC73C\uB85C \uC9C0\uC815\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":ue.incompatible?"\uBE44\uD638\uD658 \uD504\uB9AC\uC14B\uC740 \uAE30\uBCF8\uC73C\uB85C \uC9C0\uC815\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"",He=typeof q.reference_count=="number",dt=He?q.reference_count:null,it=Array.isArray(q.reference_summary)?q.reference_summary.map(ot=>ot?.display_name||ot?.workspace_key).filter(Boolean).join(", "):"";return c`<article
                class="exec-preset-card"
                data-preset-id=${q.id}
              >
                <div class="exec-preset-card__main">
                  <strong>${q.name}</strong>
                  ${Ie?c`<span
                        class="exec-defaults__vd-badge"
                        data-workspace-default-badge
                        >워크스페이스 기본</span
                      >`:""}
                  <span>${Q.count}</span>
                  <span data-preset-references=${q.id}
                    >${He?`\uCC38\uC870 ${dt}\uAC1C`:"\uCC38\uC870 \uD655\uC778 \uBD88\uAC00"}</span
                  >
                  ${ue.incompatible?c`<span data-preset-incompatible>비호환</span>`:""}
                  <small>${Q.choices}</small>
                  ${it?c`<small data-preset-impact=${q.id}
                        >업데이트 영향: ${it}</small
                      >`:""}
                </div>
                <div class="exec-preset-card__actions">
                  ${Ie?c`<button
                        type="button"
                        data-workspace-preset-release=${q.id}
                        @click=${()=>{x("")}}
                      >
                        기본 해제
                      </button>`:c`<button
                        type="button"
                        data-workspace-preset-assign=${q.id}
                        ?disabled=${!ue.viable}
                        title=${Je}
                        @click=${()=>{x(q.id)}}
                      >
                        기본으로
                      </button>`}
                  <button
                    type="button"
                    data-preset-edit=${q.id}
                    @click=${()=>G(q)}
                  >
                    편집
                  </button>
                  <button
                    type="button"
                    data-preset-delete=${q.id}
                    ?disabled=${dt===null||dt>0||q.reference_scan_complete===!1}
                    title=${dt===null?"\uCC38\uC870 \uC218\uB97C \uD655\uC778\uD560 \uC218 \uC5C6\uC5B4 \uC0AD\uC81C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":dt>0?"\uCC38\uC870 \uC911\uC778 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC788\uC5B4 \uC0AD\uC81C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":q.reference_scan_complete===!1?"\uCC38\uC870 \uC2A4\uCE94\uC774 \uC644\uB8CC\uB418\uC9C0 \uC54A\uC544 \uC0AD\uC81C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":""}
                    @click=${()=>{oe(q)}}
                  >
                    삭제
                  </button>
                </div>
              </article>`})}
      ${b!==null&&C&&H.missing?c`<article class="exec-preset-card" data-workspace-preset-missing>
            <div class="exec-preset-card__main">
              <strong>워크스페이스 기본 프리셋을 찾을 수 없습니다</strong>
              <span class="exec-defaults__vd-badge" data-workspace-default-badge
                >워크스페이스 기본</span
              >
              <small>
                참조 ${C} · 실행이 차단됩니다. 기본을 해제하거나 다른
                프리셋을 지정하세요.
              </small>
            </div>
            <div class="exec-preset-card__actions">
              <button
                type="button"
                data-workspace-preset-release=${C}
                @click=${()=>{x("")}}
              >
                기본 해제
              </button>
            </div>
          </article>`:""}
      ${me()}
    </section>`}function Ve(){let b=u().workspace_info;return b&&typeof b=="object"?b:{}}function st(b,S){return c`<span
      class="exec-defaults__vd-badge exec-defaults__vd-badge--${b}"
      >${S}</span
    >`}function Pe(b){let S=b?cp(b.cmd):"",C=b?lp(b.timeout_ms):"",H=o&&o()||"<workspace \uACBD\uB85C>";return c`<div class="exec-defaults__vd-group" data-vd="verify">
      <div class="exec-defaults__vd-label">머지 전 검증 (verify)</div>
      ${S?c`<div class="exec-defaults__vd-line">
            <span class="exec-defaults__vd-cmd">${S}</span>
            ${st("config","config")}
            ${C?c`<span class="exec-defaults__vd-meta"
                  >timeout ${C}</span
                >`:""}
          </div>`:c`<div class="exec-defaults__vd-line exec-defaults__vd-absent">
            ${st("absent","\uC548 \uD568")} 검증 없음 —
            <span class="exec-defaults__vd-cmd"
              >[worker.verify."${H}"]</span
            >
            섹션으로 정의
          </div>`}
    </div>`}let De=!1,Ae=!1,ge=!1,ve=null;async function he(){if(s){Ae=!0,ge=!1,we();try{let b=await Promise.resolve(s("get-worker-system-prompt",{}));!b||typeof b!="object"||Array.isArray(b)?ge=!0:ve=b}catch{ge=!0}finally{Ae=!1,we()}}}function V(){if(De=!De,De&&!ve){he();return}we()}function W(){return c`<section class="exec-defaults__sp" data-seam="system-prompt">
      <p class="exec-defaults__vd-title">
        워커 시스템 프롬프트
        <span class="exec-defaults__vd-ro">읽기 전용 — 서버가 조립</span>
        <button
          type="button"
          class="exec-defaults__sp-toggle"
          data-seam="system-prompt-toggle"
          aria-expanded=${De?"true":"false"}
          @click=${V}
        >
          ${De?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
        </button>
      </p>
      ${De?_e():""}
    </section>`}function _e(){let b=qr({loading:Ae,error:ge});if(b)return b;if(!ve)return"";let S=Array.isArray(ve.variants)?ve.variants:[];return c`<div class="exec-defaults__sp-body">
      ${ve.target_base_placeholder?c`<div class="prompt-block__meta">
            \`${ve.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${S.map(C=>c`<div class="exec-defaults__sp-variant" data-variant=${C.key}>
            <div class="exec-defaults__sp-cond">${C.condition}</div>
            ${tr(C.label,C.system_prompt)}
          </div>`)}
    </div>`}function Z(b){return c`<section class="exec-defaults__vd">
      <p class="exec-defaults__vd-title">
        검증 설정
        <span class="exec-defaults__vd-ro">읽기 전용 — config에서 정의</span>
      </p>
      ${Pe(b.verify_cmd)}
    </section>`}async function ye(b){if(!s)return;let S=await s("worker-auto-repair-toggle",{on:b,expected_revision:p()});if(T(S),S&&S.conflict){let C=await s("worker-auto-repair-toggle",{on:b,expected_revision:p()});T(C)}we()}let j={owned_deploy_worktree_fetch_detached_alignment_recreate:"\uC804\uC6A9 \uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC \uC815\uB82C\xB7\uBCF5\uAD6C",recovered_pre_execution_fetch_timeout_retry_once:"fetch \uD0C0\uC784\uC544\uC6C3 1\uD68C \uBCF5\uAD6C",repo_serial_lock_wait:"\uC800\uC7A5\uC18C \uC21C\uCC28 \uC2E4\uD589 \uB300\uAE30",restart_operation_adoption:"\uC7AC\uC2DC\uC791 \uD6C4 \uC791\uC5C5 \uC778\uACC4",exact_input_exit_zero_evidence_adoption:"\uB3D9\uC77C \uC785\uB825 \uC131\uACF5 \uC99D\uAC70 \uC778\uACC4",descendant_success_covers_ancestor_rows:"\uCD5C\uC2E0 SHA \uC131\uACF5\uC774 \uC774\uC804 \uD589 \uCEE4\uBC84",owned_verify_candidate_cleanup:"\uAC80\uC99D \uC784\uC2DC \uCCB4\uD06C\uC544\uC6C3 \uC815\uB9AC",verify_script_failure:"\uAC80\uC99D \uC2E4\uD328",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328",interrupted_without_terminal_exit:"\uC911\uB2E8\uB41C \uC791\uC5C5",whole_command_retry:"\uBA85\uB839 \uD1B5\uC9F8 \uC7AC\uC2DC\uB3C4",baseline_failure_ignore:"\uAE30\uC874 \uC2E4\uD328 \uBB34\uC2DC",config_or_script_deletion_to_bypass_gate:"\uC124\uC815\xB7\uC2A4\uD06C\uB9BD\uD2B8 \uC0AD\uC81C\uB85C \uAC8C\uC774\uD2B8 \uC6B0\uD68C",credential_entry:"\uC790\uACA9\uC99D\uBA85 \uC785\uB825\xB7\uCD9C\uB825",destructive_action:"\uD30C\uAD34\uC801 \uC791\uC5C5",history_rewrite:"\uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131",agent_self_report_as_success:"\uC138\uC158 \uC790\uAE30\uBCF4\uACE0\uB97C \uC131\uACF5 \uCC98\uB9AC",unbounded_repair_session_retry:"\uBB34\uD55C \uD574\uACB0 \uC138\uC158 \uBC18\uBCF5"};function P(b,S,C){return c`<div class="exec-defaults__policy-group" data-policy=${C}>
      <div class="exec-defaults__policy-label">${b}</div>
      <ul class="exec-defaults__policy-list">
        ${S.map(H=>c`<li data-token=${H}>
              ${j[H]||H}
            </li>`)}
      </ul>
    </div>`}function ce(){let b=u(),S=b.auto_repair!==!1,C=b.repo_operation_policy&&typeof b.repo_operation_policy=="object"?b.repo_operation_policy:null,H=Array.isArray(b.repo_operations)?b.repo_operations:[],q=H.find(Ie=>Ie.state==="repairing"),Q=H.filter(Ie=>Ie.state==="failed"||Ie.state==="repairing"),ue=Q.length?Math.min(...Q.map(Ie=>typeof Ie.repair?.remaining=="number"?Ie.repair.remaining:0)):C?.auto_repair?.budget_per_completion_chain??1;return c`<section class="exec-defaults__repair" data-seam="auto-repair">
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
          .checked=${S}
          @change=${Ie=>{ye(Ie.target.checked)}}
        />
        검증·배포 실패를 자동으로 해결 시도
      </label>
      <div class="exec-defaults__repair-state">
        <span class="exec-defaults__repair-value" data-seam="auto-repair-value"
          >${S?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}</span
        >
        <span
          class="exec-defaults__repair-budget"
          data-seam="auto-repair-budget"
          >남은 자동 해결 ${ue}회</span
        >
        <span
          class="exec-defaults__repair-session"
          data-seam="auto-repair-session"
          >${q?`\uD574\uACB0 \uC138\uC158 \uC2E4\uD589 \uC911 \xB7 ${q.repair?.owner_bead||q.operation_id}`:"\uC2E4\uD589 \uC911\uC778 \uD574\uACB0 \uC138\uC158 \uC5C6\uC74C"}</span
        >
      </div>
      ${C?c`<div class="exec-defaults__policy">
            ${P("Worker\uAC00 \uC790\uB3D9 \uCC98\uB9AC",C.worker_automatic||[],"worker-automatic")}
            ${P(`\uC790\uB3D9 \uD574\uACB0 \uC138\uC158 (\uC644\uB8CC \uCCB4\uC778\uB2F9 \uCD5C\uB300 ${C.auto_repair?.budget_per_completion_chain??1}\uD68C)`,C.auto_repair?.eligible||[],"auto-repair-eligible")}
            ${P("\uC790\uB3D9\uC73C\uB85C \uD558\uC9C0 \uC54A\uC74C",C.never_automatic||[],"never-automatic")}
          </div>`:""}
    </section>`}function we(){je(c`
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
            ${Oe()} ${Z(Ve())}
            ${ce()} ${W()}
          </div>
        </div>
      `,a)}let ke=!1,Ue=()=>{ke=!1},Re=b=>{b.target===b.currentTarget&&D()};a.addEventListener("close",Ue),a.addEventListener("cancel",Ue),a.addEventListener("click",Re);let ze=null;r&&r.subscribe&&(ze=r.subscribe(()=>{ke&&we()}));let Ne=null;n&&n.subscribe&&(Ne=n.subscribe(()=>{ke&&we()}));function tt(){ke||(ke=!0,we(),typeof a.showModal=="function"?a.showModal():a.setAttribute("open",""))}function D(){ke&&(ke=!1,typeof a.close=="function"?a.close():a.removeAttribute("open"))}return{open:tt,close:D,destroy(){ke=!1,a.removeEventListener("close",Ue),a.removeEventListener("cancel",Ue),a.removeEventListener("click",Re),ze&&(ze(),ze=null),Ne&&(Ne(),Ne=null),a.remove()}}}var dp={queued:"\uB300\uAE30",running:"\uC2E4\uD589 \uC911",succeeded:"\uC131\uACF5",failed:"\uC2E4\uD328",repairing:"\uC790\uB3D9 \uD574\uACB0 \uC911"},Ki={verify_script_failure:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0",verify_script_failure_pre_merge:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0 \uD6C4 \uBA38\uC9C0",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328 \uD574\uACB0",interrupted_without_terminal_exit:"\uC911\uB2E8\uB41C \uC791\uC5C5 \uC9C4\uB2E8",other:"\uC2E4\uD328 \uD574\uACB0"};function co(e){return typeof e=="string"&&e.length>=7?e.slice(0,7):"\u2014"}function up(e){if(typeof e!="number"||!Number.isFinite(e)||e<0)return"\u2014";if(e<1e3)return`${Math.round(e)}ms`;let t=e/1e3;if(t<60)return`${t.toFixed(1)}\uCD08`;let r=Math.floor(t/60);return`${r}\uBD84 ${Math.round(t-r*60)}\uCD08`}function pp(e){let t=e.failure||null,r=e.repair||{},n=e.failure_kind==="verify_script_failure"&&e.verify_stage==="pre_merge"?"verify_script_failure_pre_merge":e.failure_kind||"other";return c`<article
    class="worker-repo-op"
    data-operation-id=${e.operation_id}
    data-state=${e.state}
    data-kind=${e.kind}
  >
    <div class="worker-repo-op__head">
      <span class="worker-repo-op__kind">${e.kind}</span>
      <span class="worker-repo-op__state"
        >${dp[e.state]||e.state}</span
      >
      <code class="worker-repo-op__target" title=${e.target_sha||""}
        >${e.target_base}@${co(e.target_sha)}</code
      >
      <code class="worker-repo-op__tree" title="target tree"
        >tree ${co(e.target_tree)}</code
      >
      <span class="worker-repo-op__elapsed"
        >${up(e.elapsed_ms)}</span
      >
    </div>
    <div class="worker-repo-op__meta">
      <code class="worker-repo-op__script"
        >${e.script_path||"(\uACBD\uB85C \uBBF8\uAE30\uB85D)"}</code
      >
      <code class="worker-repo-op__blob"
        >blob ${co(e.script_blob_sha)}</code
      >
      ${Number.isInteger(e.exit_code)?c`<span class="worker-repo-op__exit"
            >exit ${e.exit_code}</span
          >`:""}
      ${e.signal?c`<span class="worker-repo-op__signal"
            >signal ${e.signal}</span
          >`:""}
    </div>
    ${t?c`<div class="worker-repo-op__failure">
          <code>${t.code}</code>
          ${t.detail?c`<span class="worker-repo-op__detail"
                >${t.detail}</span
              >`:""}
        </div>`:""}
    ${e.output_tail?c`<details class="worker-repo-op__output">
          <summary>출력 마지막 부분</summary>
          <pre>${e.output_tail}</pre>
        </details>`:""}
    ${e.log_path?c`<div class="worker-repo-op__log">
          전체 로그 <code>${e.log_path}</code>
        </div>`:""}
    <div class="worker-repo-op__actions">
      <span class="worker-repo-op__budget"
        >자동 해결 남음
        ${r.remaining??0}/${r.auto_budget??1}</span
      >
      ${r.attempt_id?c`<button
            type="button"
            class="worker-repo-op__session"
            data-attempt-id=${r.attempt_id}
          >
            해결 세션 보기
          </button>`:""}
      ${e.state==="failed"?c`<button
            type="button"
            class="worker-repo-op__resolve"
            data-operation-id=${e.operation_id}
            data-failure-kind=${e.failure_kind||"other"}
          >
            ${Ki[n]||Ki.other}
          </button>`:""}
    </div>
  </article>`}function Zi(e){let t=Array.isArray(e)?e:[];if(t.length===0)return"";let r=t.filter(n=>n.state==="failed"||n.state==="repairing").length;return c`<details
    class="worker-repo-ops"
    aria-label="레포 오퍼레이션"
    ?open=${r>0}
  >
    <summary class="worker-repo-ops__summary">
      <b>레포 오퍼레이션</b>
      <span class="worker-repo-ops__count">${t.length}건</span>
      ${r>0?c`<span class="worker-repo-ops__failing"
            >해결 필요 ${r}</span
          >`:""}
    </summary>
    <div class="worker-repo-ops__list">
      ${t.map(n=>pp(n))}
    </div>
  </details>`}function jr(e){let t=Ct(e.created_at),r=Ct(e.updated_at);return!t&&!r?"":c`<div class="worker-mini__meta">
    ${t?c`<span title=${`\uC0DD\uC131 ${Tt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&r?c`<span>·</span>`:""}${r?c`<span title=${`\uC218\uC815 ${Tt(e.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </div>`}function fp(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function _n(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function os(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function Gt(e,t,r={}){let s=Object.values(e&&typeof e=="object"?e:{}).filter(p=>p&&p.bead_id===t&&p.phase!=="done").sort((p,m)=>(p.requested_at||0)-(m.requested_at||0)).at(-1),o=typeof r.attempt_id=="string"&&r.attempt_id.length>0?r.attempt_id:typeof s?.attempt_id=="string"?s.attempt_id:null,a=r.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":r.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":r.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,i=typeof s?.last_error=="string"?s.last_error:null,l=s?fp(s.phase):null,u=r.merged||s?.mode==="merged_revert"?"merged":"unmerged";return{action:!r.external&&!r.done,enabled:!a&&(!s||!!i),label:i?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:a||(i?`\uD3D0\uAE30 \uC2E4\uD328: ${i} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:s?`${l||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:u==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:o,operation:s||null,progress:l,error:i,confirmation:u}}function nr(e){let t=e.discard;if(!t||!t.operation)return"";let r=t.operation,n=r.backup?.path,s=r.original_pr,o=r.revert_pr;return c`<div
    class="worker-discard-receipt"
    role=${t.error?"alert":"status"}
  >
    <span>${t.progress}</span>
    ${t.error?c`<span>폐기 실패: ${t.error}</span>`:""}
    <code>작업: ${r.operation_id}</code>
    ${n?c`<code>백업: ${n}</code>`:t.error?c`<span>아직 아무것도 삭제하지 않음</span>`:""}
    ${s?.url?c`<a href=${s.url} target="_blank" rel="noreferrer noopener"
          >원본 PR #${s.number||"?"}</a
        >`:""}
    ${o?.url?c`<a href=${o.url} target="_blank" rel="noreferrer noopener"
          >revert PR #${o.number||"?"} ·
          ${o.state||"\uC0C1\uD0DC \uBBF8\uD655\uC778"}</a
        >`:""}
  </div>`}function uo(e){let t=e.draggable&&!e.done,r=t&&e.lane==="queue",n=Array.isArray(e.badges)?e.badges:[],s=ht(e.usage),o=Ft(e.usage),a=e.merge_step||null,i=e.lane==="pr_wait"||!!e.revise_action,l=e.lane==="done"&&!i,u=l?Ct(e.done_at):"",p=e.selectable?c`<input
        class="worker-mini__select"
        type="checkbox"
        data-bead-id=${e.id}
        aria-label=${`${e.id} \uC120\uD0DD`}
        .checked=${e.selected===!0}
      />`:"",m=r?c`<button
        type="button"
        class="worker-mini__grip"
        draggable="true"
        data-bead-id=${e.id}
        aria-label=${`${e.id} \uC21C\uC11C \uBCC0\uACBD`}
        title="순서 변경"
      >
        ⠿
      </button>`:t?c`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",h=e.worker_serial===!0?c`<span class="worker-mini__serial">머지까지 단독</span>`:e.worker_serial===null?c`<span class="worker-mini__serial worker-mini__serial--unknown"
            >실행 방식 확인 중</span
          >`:"",T=e.workspace_name?c`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",$=c`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,E=c`<span class="worker-mini__title">${e.title}</span>`,F=e.pr_url&&e.pr_number?c`<a
          class="worker-mini__pr"
          href=${e.pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="PR 열기"
          >#${e.pr_number} ↗</a
        >`:"",x=e.completion_repair_pr_url&&e.completion_repair_pr_number?c`<a
          class="worker-mini__pr worker-mini__repair-pr"
          href=${e.completion_repair_pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="repair PR 열기"
          >repair #${e.completion_repair_pr_number} ↗</a
        >`:"",G=n.map(me=>me===e.live_badge?c`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${me}</span
        >`:c`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${me===e.completion_badge&&e.completion_title||""}
          >${me}</span
        >`),X=e.reason?c`<span class="worker-mini__reason">${e.reason}</span>`:"",I=s.length>0?s.map(me=>c`<span class="worker-usage" title=${me.tooltip}
              >${me.label}</span
            >`):o?c`<span class="worker-usage" title=${Fr(e.usage)}
            >${o}</span
          >`:"",O=a?c`<span class="merge-step"
        >${a.label}<span class="merge-step__n"
          >${a.index}/${a.total}</span
        ></span
      >`:"",A=e.merge_action?c`<button
        type="button"
        class="worker-mini__merge"
        data-bead-id=${e.id}
        ?disabled=${e.merge_enabled===!1}
        title=${e.merge_title||""}
      >
        ${e.merge_label||"\uBA38\uC9C0"}
      </button>`:"",U=e.cancel_action?c`<button
        type="button"
        class="worker-mini__merge-cancel"
        data-bead-id=${e.id}
        ?disabled=${e.cancel_enabled===!1}
        title=${e.cancel_title||""}
      >
        취소
      </button>`:"",R=e.discard,oe=R?.action||e.discard_action?c`<button
          type="button"
          class="worker-mini__discard"
          data-bead-id=${e.id}
          data-attempt-id=${R?.attempt_id||""}
          data-operation-id=${R?.operation?.operation_id||""}
          data-discard-mode=${R?.confirmation||"unmerged"}
          ?disabled=${R?!R.enabled:e.discard_enabled===!1}
          title=${R?R.title:e.discard_enabled===!1?e.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
        >
          ${R?.label||"\uD3D0\uAE30"}
        </button>`:"",Ce=e.revise_action?c`<button
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
        </button>`:"",ne=!!(o||a||e.merge_action||e.cancel_action||e.discard_action||R?.operation||e.revise_action);return c`<div
    class="worker-mini${i?" worker-mini--card":""}${e.selected?" worker-mini--selected":""}${t?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${a?" worker-mini--merging":""}${e.external?" worker-mini--external":""}"
    style=${a?`--progress: ${a.percent}%`:""}
    draggable=${t&&!r?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${l?c`<div class="worker-mini__row1">${T}${$}${E}</div>
          <div class="worker-mini__row2">
            ${I}${u?c`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${Tt(e.done_at)}`}
                  >완료 ${u}</span
                >`:""}${G}${O}
            <span class="worker-mini__actions"
              >${A}${U}${oe}</span
            >
            ${jr(e)}
          </div>`:i?c`<div class="worker-mini__head">
              ${p}${m}${T}${$}${F}${x}${G}${h}${X}
            </div>
            <div class="worker-mini__body">${E}</div>
            ${ne?c`<div class="worker-mini__foot">
                  ${I}${O}
                  <span class="worker-mini__actions"
                    >${A}${U}${oe}${Ce}</span
                  >
                  ${nr(e)}
                </div>`:""}
            ${jr(e)}`:c`<div class="worker-mini__line">
              ${p}${m}${T}${$}${E}${F}${x}${G}${h}${X}${I}${O}${A}${U}${oe}
            </div>
            ${nr(e)} ${jr(e)}`}
  </div>`}function _p(e){let t=e.draggable&&!e.done,r=e.workflow,n=r&&r.chips||{},s=n.route||r&&r.route,o=n.route_source==="derived"||!!(r&&r.route_source==="derived"),a=e.is_quick_fix===!0||!!r&&r.route==="quick_fix",i=typeof e.reason=="string"&&e.reason.startsWith("\u26D4");return c`<div
    class="worker-card${t?"":" worker-card--static"}"
    draggable=${t?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    <div class="worker-card__head">
      ${t?c`<span class="worker-card__grip" aria-hidden="true">⠿</span>`:""}
      ${e.workspace_name?c`<span class="worker-card__repo" title=${e.root_dir||""}
            >${e.workspace_name}</span
          >`:""}
      <span class="worker-card__id" title="클릭하면 ID 복사">${e.id}</span>
      ${r&&s?c`<span
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
      ${e.reason?c`<span
            class="worker-card__reason${i?" worker-card__reason--danger":""}"
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
    ${jr(e)}
  </div>`}function Yt(e){let t=!!e.collapsible&&!!e.collapsed,r=c`<span
      class="worker-pane__dot worker-pane__dot--${e.lane}"
      aria-hidden="true"
    ></span>
    <span class="worker-pane__title">${e.title}</span>
    ${t&&e.preview?c`<span class="worker-pane__preview">${e.preview}</span>`:""}
    <span class="worker-pane__count">${e.items.length}</span>`;return c`<section
    class="worker-pane worker-pane--lane-${e.lane}${e.src?" worker-pane--src":""}${e.live?" worker-pane--live":""}${e.collapsible?" worker-pane--collapsible":""}${t?" worker-pane--collapsed":""}"
    id=${e.id}
    data-lane=${e.lane}
  >
    ${e.collapsible?c`<button
          type="button"
          class="worker-pane__hd worker-pane__hd--toggle"
          data-lane=${e.lane}
          aria-expanded=${t?"false":"true"}
        >
          ${r}
          <span class="worker-pane__caret" aria-hidden="true"
            >${t?"\u25B8":"\u25BE"}</span
          >
        </button>`:c`<header class="worker-pane__hd">
          ${r}${e.header_control?e.header_control:""}
        </header>`}
    ${t?"":c`${e.controls?e.controls:""}
          <div class="worker-pane__body">
            ${e.body?e.body:e.items.length===0?c`<div class="worker-pane__empty">
                    ${e.empty||""}
                  </div>`:e.items.map(n=>e.lane==="candidate"?_p(n):uo(n))}
          </div>`}
  </section>`}var Xi=160;function Qi(e){return e.length>Xi?`${e.slice(0,Xi)}\u2026`:e}function mp(e){return!e||!e.reason?"":c`<div class="worker-banner__detail">
    가드:
    ${e.reason}${e.command?c` · <code>${Qi(e.command)}</code>`:""}
  </div>`}function gp(e){return e?c`<details class="worker-banner__tail">
    <summary>출력 tail</summary>
    <pre>${e}</pre>
  </details>`:""}function hp(e){return e?c`<div class="worker-banner__log-path">
    전체 로그: <code>${e}</code>
  </div>`:""}function po(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),r=Math.floor(t/60),n=t%60;return r>0?`${r}m ${String(n).padStart(2,"0")}s`:`${n}s`}function Ji(e){let t=Array.isArray(e.cleanupFailures)?e.cleanupFailures:[];return c`<div class="worker-banners">
    ${e.failure?c`<div class="worker-banner worker-banner--failure" role="alert">
          ⛔ ${e.failure.repo||"repo"} 세션 실패 —
          ${e.failure.reason||""}. 자동 진행을 껐습니다, 수동 ▶ 필요.
          ${e.failure.resume_attempt_id?c`<button
                type="button"
                class="worker-banner__resume"
                data-attempt-id=${e.failure.resume_attempt_id}
                ?disabled=${!e.failure.resume_eligible}
                title=${e.failure.resume_eligible?"\uCD5C\uADFC \uC2E4\uD328 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":e.failure.resume_reason||"\uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}
              >
                ↻ 이어하기
              </button>`:""}
          ${e.failure.discard?.action?c`<button
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
          ${e.failure.resume_attempt_id?c`<button
                type="button"
                class="worker-banner__dismiss"
                data-attempt-id=${e.failure.resume_attempt_id}
                title="이 실패를 처리 완료로 표시하고 배너를 닫습니다"
                aria-label="배너 닫기"
              >
                ✕
              </button>`:""}
          ${mp(e.failure.cause_detail)}
          ${nr({discard:e.failure.discard})}
        </div>`:""}
    ${t.map(r=>c`<div
          class="worker-banner worker-banner--cleanup"
          role="alert"
          data-bead-id=${r.bead_id}
        >
          ⚠ ${r.bead_id} 머지 완료 — 머지 후 정리가 <b>${r.step}</b> 단계에서
          멈췄습니다 (${r.reason}).
          ${typeof r.retry_count=="number"&&Number.isInteger(r.retry_count)&&r.retry_count>0?c`${r.retry_count}회 자동 재시도 후에도 실패했습니다 — `:""}정리를
          사람이 마무리하세요.
          ${r.detail?c`<div class="worker-banner__detail">
                <code>${Qi(r.detail)}</code>
              </div>`:""}
          ${hp(r.log_path)} ${gp(r.output_tail)}
        </div>`)}
  </div>`}function bp(e,t,r=null){let n=e.failed===!0,s=!!e.paused,o=n?e.status_label||(e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):s?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?po(t-e.started_at):"\u2014",a=Wt(e),i=dr(e),l=ht(e.usage),u=Ft(e.usage),p=e.conflict_resolution?s?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,m=e.base_exception||null,h=e.attempt_id&&e.attempt_id===r,T=e.discard?.action?c`<button
        type="button"
        class="rtile__discard"
        data-operation-id=${e.discard.operation?.operation_id||""}
        ?disabled=${!e.discard.enabled}
        title=${e.discard.title}
        aria-label=${e.discard.label}
      >
        ${e.discard.label}
      </button>`:"";return c`<div
    class="rtile${h?" rtile--sel":""}${s?" rtile--paused":""}${n?" rtile--failed":""}"
    data-bead-id=${e.bead_id}
    data-attempt-id=${e.attempt_id||""}
  >
    <div class="rtile__hd">
      <span class="rtile__dot" aria-hidden="true"></span>
      <span class="rtile__id" title="클릭하면 ID 복사">${e.bead_id}</span>
      ${i?c`<span class="rtile__resumed" title=${i}>↻</span>`:""}
      <span class="rtile__elapsed">${o}</span>
      ${n?c`<button
              type="button"
              class="rtile__resume"
              ?disabled=${e.resume_eligible===!1}
              title=${e.resume_eligible===!1?e.resume_reason||"\uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uAC19\uC740 \uC138\uC158\uC73C\uB85C \uC774\uC5B4\uC11C \uC9C4\uD589"}
              aria-label="이어하기"
            >
              ↻ 이어하기
            </button>
            ${T}
            <button
              type="button"
              class="rtile__dismiss"
              title="실패 기록 닫기"
              aria-label="실패 기록 닫기"
            >
              ✕
            </button>`:c`<button
              type="button"
              class="rtile__session"
              title="라이브 세션 열기"
              aria-label="라이브 세션 열기"
            >
              ▤ 세션
            </button>
            ${s?c`<button
                  type="button"
                  class="rtile__resume"
                  title="같은 세션으로 이어서 재개"
                  aria-label="재개"
                >
                  ▶
                </button>`:c`<button
                  type="button"
                  class="rtile__pause"
                  ?disabled=${e.can_pause===!1}
                  title=${e.can_pause===!1?"\uC138\uC158 ID \uAE30\uB85D \uC804 \u2014 \uC77C\uC2DC\uC815\uC9C0 \uBD88\uAC00":"\uC77C\uC2DC\uC815\uC9C0 (\uAC19\uC740 \uC138\uC158\uC73C\uB85C \uC7AC\uAC1C \uAC00\uB2A5)"}
                  aria-label="일시정지"
                >
                  ⏸
                </button>`}
            ${T}`}
    </div>
    <div class="rtile__title">${e.title}</div>
    ${e.current_child?c`<div class="rtile__child" title="현재 진행중 child">
          └ ${e.current_child}
        </div>`:""}
    ${a||l.length>0||u||p||m?c`<div class="rtile__meta">
          ${p?c`<span class="worker-mini__badge">${p}</span>`:""}
          ${m?c`<span
                class="worker-mini__badge"
                title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
                >${m}</span
              >`:""}
          ${a?c`<span class="rtile__runner">${a}</span>`:""}
          ${l.length>0?l.map($=>c`<span class="worker-usage" title=${$.tooltip}
                    >${$.label}</span
                  >`):u?c`<span
                  class="worker-usage"
                  title=${Fr(e.usage)}
                  >${u}</span
                >`:""}
        </div>`:""}
    ${jr(e)} ${nr(e)}
    <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일): 큐
         스냅샷에는 페이즈명도 진행률도 없으므로 진행 바는 만들지 않는다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
    ${n||s?"":c`<div class="rtile__accent" aria-hidden="true"></div>`}
  </div>`}function fo(e,t=Date.now(),r=null){let n=Array.isArray(e)?e:[];return c`<div class="worker-rungrid" id="worker-rungrid">
    ${n.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:n.map(s=>bp(s,t,r))}
  </div>`}function mr(e){return c`<svg
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
  </svg>`}function _o(){return mr(Kt`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function mo(){return mr(Kt`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function el(){return mr(Kt`<rect x="4.3" y="4.3" width="7.4" height="7.4" rx="1.2" />`)}function tl(){return mr(Kt`<path d="M4.4 4.4 11.6 11.6M11.6 4.4 4.4 11.6" />`)}function rl(){return mr(Kt`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function nl(){return mr(Kt`<rect x="2.6" y="2.6" width="7.4" height="7.4" rx="1.2" />
    <path d="M6 13.4h6a1.4 1.4 0 0 0 1.4-1.4V6" />`)}function sl(){return mr(Kt`<circle cx="8" cy="8" r="2.1" />
    <path
      d="M8 1.9v1.8M8 12.3v1.8M1.9 8h1.8M12.3 8h1.8M3.7 3.7l1.3 1.3M11 11l1.3 1.3M12.3 3.7 11 5M5 11l-1.3 1.3"
    />`)}function ol(){return mr(Kt`<path d="M3 3.6 8.2 8 3 12.4z" />
    <path d="M8.8 3.6 14 8l-5.2 4.4z" />`)}var mn=1,vp=6e4,yp={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328"},wp=new Set(["auto_merge","merged","merge","done"]),al={running:3,paused:2,failed:1};function kp(e,t){let r=null,n=-1/0;for(let s of Object.values(e)){if(!s||s.bead_id!==t||s.status==="running")continue;let o=typeof s.finished_at=="number"?s.finished_at:typeof s.started_at=="number"?s.started_at:0;o>=n&&(n=o,r=s)}return r}function $p(e,t){let r=Object.values(e||{}),n=new Set,s=new Map;for(let a of r)!a||typeof a.bead_id!="string"||(typeof a.resumed_from=="string"&&a.resumed_from.length>0&&n.add(a.resumed_from),s.set(a.bead_id,a.attempt_id));let o=new Map;for(let a of r){if(!a||typeof a.bead_id!="string"||a.bead_id.length===0)continue;let i=null;if(a.status==="running")i="running";else if(a.status==="paused"&&!n.has(a.attempt_id))i="paused";else if(a.status==="failed"||a.status==="orphaned"){let m=t.get(a.bead_id),h=typeof m=="number"&&m>0&&typeof a.finished_at=="number"&&m>=a.finished_at;s.get(a.bead_id)===a.attempt_id&&!h&&typeof a.dismissed_at!="number"&&(i="failed")}if(!i)continue;let l=typeof a.started_at=="number"?a.started_at:null,u=o.get(a.bead_id);if(u){let m=al[u.run_state],h=al[i];if(m>h||m===h&&(u.started_at??0)>(l??0))continue}let p=typeof a.session_id=="string"&&a.session_id.length>0;o.set(a.bead_id,{attempt_id:typeof a.attempt_id=="string"?a.attempt_id:"",run_state:i,started_at:l,last_event_at:typeof a.last_event_at=="number"?a.last_event_at:null,runner:typeof a.runner=="string"?a.runner:null,model:typeof a.model=="string"?a.model:null,effort:typeof a.effort=="string"?a.effort:null,speed:typeof a.speed=="string"?a.speed:null,resumed_from:typeof a.resumed_from=="string"?a.resumed_from:null,continuation_mode:a.continuation_mode==="session"||a.continuation_mode==="fresh"?a.continuation_mode:null,usage:Dt(e,a.bead_id),can_pause:i==="running"&&p,can_resume:i!=="running"&&p&&!n.has(a.attempt_id)})}return o}function il(e,t){let r=e[t];if(!r)return"";if(r.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let n=typeof r.reason=="string"?r.reason:"",s=n.indexOf(":");return s>0&&s<n.length-1?`\u26D4 ${n.slice(0,s)} (${n.slice(s+1)})`:`\u26D4 ${n}`}function Rt(e){return e&&typeof e=="object"?e:{}}function go(e,t,r){let n=Array.isArray(e)?e:[],s=Array.isArray(t)?t:[],o=r&&typeof r.done_since=="number"?r.done_since:void 0,a=new Map;for(let x of s)x&&typeof x.root_dir=="string"&&a.set(x.root_dir,x);let i=[],l=[],u=[],p=[],m=[],h=new Map;for(let x of n){if(!x||typeof x.root_dir!="string")continue;let G=x.root_dir,X=x.name||G,I=a.get(G),O=I&&typeof I.revision=="number"?I.revision:typeof x.revision=="number"?x.revision:0,A=Rt(x.attempts),U=Rt(x.bead_titles),R=Rt(x.pr_observations),oe=Rt(x.admission),Ce=Rt(x.revise_parked),ne=Rt(x.merge_queue_state),me=Rt(x.cleanup_failed),Oe=Rt(x.discard_operations),Ve=Array.isArray(x.merge_queue)?x.merge_queue:[],st=new Set(Ve.filter(V=>V&&typeof V.bead_id=="string").map(V=>V.bead_id)),Pe=new Map(Ve.filter(V=>V&&typeof V.bead_id=="string").map(V=>[V.bead_id,V])),De=Array.isArray(x.queue)?x.queue:[],Ae=Array.isArray(x.done)?x.done:[],ge=new Map;for(let V of Ae)V&&typeof V.bead_id=="string"&&typeof V.added_at=="number"&&ge.set(V.bead_id,V.added_at);let ve=V=>({id:V,title:U[V]||V,root_dir:G,workspace_name:X,expected_revision:O,draggable:!1}),he=new Set;for(let[V,W]of $p(A,ge))he.add(V),l.push({...ve(V),lane:"running",attempt_id:W.attempt_id,run_state:W.run_state,can_pause:W.can_pause,can_resume:W.can_resume,started_at:W.started_at,last_event_at:W.last_event_at,runner:W.runner,model:W.model,effort:W.effort,speed:W.speed,resumed_from:W.resumed_from,continuation_mode:W.continuation_mode,usage:W.usage,discard:Gt(Oe,V,{attempt_id:W.attempt_id}),badges:W.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:W.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:[],alert:W.run_state==="failed"});for(let V of Array.isArray(x.pr_wait)?x.pr_wait:[]){let W=V&&V.bead_id;if(typeof W!="string"||he.has(W))continue;he.add(W);let _e=Rt(R[W]),Z=Rt(_e.pr),ye=_e.gate?Rt(_e.gate):null,j=st.has(W),P=Pe.get(W)?.continuation_action||null,ce=!!P&&P.continuation===null,we=ne.active===W,ke=V.external===!0,Ue=me[W]||null,Re=!!ye&&ye.base_badge==="\uCDA9\uB3CC",ze=!!Ue&&["child_sweep","branch_cleanup","parent_close"].includes(Ue.step)&&!!ye&&ye.tier==="merged",Ne=ke&&!!ye&&ye.tier==="merged",tt=!!ye&&["closed_unmerged","review","undecidable"].includes(ye.tier),D=Gt(Oe,W,{external:ke,merge_active:we,merge_queued:j,merged:!!Ue||ye?.tier==="merged"}),b=!!D.operation;u.push({...ve(W),lane:"pr_wait",pr_number:typeof Z.number=="number"?Z.number:null,pr_url:typeof Z.url=="string"?Z.url:void 0,external:ke,usage:Dt(A,W),badges:ce?["\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"]:Ue?["\uC815\uB9AC \uC2E4\uD328"]:typeof ye?.gate_badge=="string"&&ye.gate_badge.length>0?[ye.gate_badge]:[],alert:!!Ue||tt,reason:Ue?"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644":"PR \uB300\uAE30",merge_action:!j||ce,merge_enabled:!b&&(ce||ye?.enabled===!0||Re||ze||Ne),merge_label:ce?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":Ne||ze?"\uC815\uB9AC":Re&&!ze?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:ce?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":b?D.error?`\uD3D0\uAE30 \uC2E4\uD328: ${D.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${D.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:Ne?"\uBA38\uC9C0\uB428 \u2014 \uD074\uB9AD\uD558\uBA74 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC\uB97C \uC218\uD589\uD569\uB2C8\uB2E4":ze?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Re?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":ye?.enabled===!0?`\uBA38\uC9C0 (${ye.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${ye?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:j&&!ce,cancel_enabled:!we,continuation_mismatch:P?.mismatch||null,discard:D,discard_action:D.action,discard_enabled:D.enabled,discard_title:D.title})}for(let V=0;V<De.length;V++){let W=De[V],_e=W&&W.bead_id;if(typeof _e!="string"||he.has(_e))continue;he.add(_e);let Z=Ce[_e],ye=Gt(Oe,_e),j=ye.operation?ye:null,P={...ve(_e),lane:"queue",draggable:!j,discard:j||void 0,reason:il(oe,_e),queue_position:V+1,queue_index:V,queue_length:De.length,badges:Z?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!Z,revise_action:!!Z,revise_enabled:!!Z&&!j,revise_title:Z?Z.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${Z.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""};p.push(P);let ce=h.get(G);ce?ce.push(P):h.set(G,[P])}for(let V of Array.isArray(x.runnable)?x.runnable:[]){let W=V&&V.bead_id;typeof W!="string"||he.has(W)||(he.add(W),i.push({...ve(W),title:V.title||U[W]||W,lane:"runnable",draggable:!0,reason:il(oe,W),created_at:V.created_at??void 0,updated_at:V.updated_at??void 0,labels:Array.isArray(V.labels)?V.labels:[],spec_reviewer:typeof V.spec_reviewer=="string"?V.spec_reviewer:void 0,plan_state:V.plan_state==="approved"||V.plan_state==="authored"?V.plan_state:"none",workflow:V.route?{route:V.route,chips:{route:V.route}}:null,place_index:De.length}))}for(let V of Ae){let W=V&&V.bead_id;if(typeof W!="string"||he.has(W)||(he.add(W),o!==void 0&&typeof V.added_at=="number"&&V.added_at<o))continue;let _e=kp(A,W);m.push({...ve(W),lane:"done",done:!0,usage:Dt(A,W),done_at:typeof V.added_at=="number"?V.added_at:void 0,done_kind:_e&&typeof _e.done_kind=="string"?_e.done_kind:null})}}let T=new Map;s.forEach((x,G)=>{x&&typeof x.root_dir=="string"&&T.set(x.root_dir,G)});let $=r&&r.running_sort==="repo"?"repo":"started";l.sort((x,G)=>{if($==="repo"){let O=T.get(x.root_dir)??Number.MAX_SAFE_INTEGER,A=T.get(G.root_dir)??Number.MAX_SAFE_INTEGER;if(O!==A)return O-A}let X=typeof x.started_at=="number"&&Number.isFinite(x.started_at)?x.started_at:null,I=typeof G.started_at=="number"&&Number.isFinite(G.started_at)?G.started_at:null;return X!==null&&I!==null&&X!==I?X-I:X===null&&I!==null?1:X!==null&&I===null?-1:x.id.localeCompare(G.id)}),m.sort((x,G)=>(G.done_at??0)-(x.done_at??0));let E=s.length>0?s:n.map(x=>({root_dir:x&&x.root_dir,name:x&&x.name,auto_advance:x&&x.auto_advance,auto_merge:x&&x.auto_merge,slots:x&&x.slots,revision:x&&x.revision,exec_defaults:x&&x.exec_defaults,default_exec_preset_id:x&&x.default_exec_preset_id,runner_catalog:x&&x.runner_catalog})),F=[];for(let x of E)!x||typeof x.root_dir!="string"||F.push({root_dir:x.root_dir,name:x.name||x.root_dir,auto_advance:x.auto_advance===!0,auto_merge:x.auto_merge===!0,slots:typeof x.slots=="number"&&x.slots>=mn?x.slots:mn,revision:typeof x.revision=="number"?x.revision:0,exec_defaults:Rt(x.exec_defaults),default_exec_preset_id:typeof x.default_exec_preset_id=="string"?x.default_exec_preset_id:null,runner_catalog:Rt(x.runner_catalog),items:h.get(x.root_dir)||[]});return{runnable:i,queue:p,queue_groups:F,running:l,pr_wait:u,done:m,automation:{total:F.length,both_on:F.filter(x=>x.auto_advance&&x.auto_merge).length}}}function xp(e,t){if(typeof e!="number"||!Number.isFinite(e))return"";let n=t-e<vp;return c`<span
    class="mon-beat${n?" mon-beat--live":""}"
    title=${`\uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${Tt(e)}`}
    ><span class="mon-beat__dot" aria-hidden="true"></span>${n?"":c`<span class="mon-beat__age"
          >${Ct(e,t)}</span
        >`}</span
  >`}function gn(e){return c`<div class="mon-c__title">${e.title}</div>`}function hn(e){return c`<span class="mon-c__id" title="클릭하면 상세로 이동"
    >${e.id}</span
  >`}function as(e){return e.workspace_name?c`<span class="mon-c__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:""}function ho(e){let t=ht(e.usage),r=Ft(e.usage);return t.length>0?t.map(n=>c`<span class="mon-c__usage" title=${n.tooltip}
          >${n.label}</span
        >`):r?c`<span class="mon-c__usage" title=${Fr(e.usage)}
        >${r}</span
      >`:""}function bo(e){return(Array.isArray(e.badges)?e.badges:[]).map(r=>c`<span class="mon-c__badge${e.alert?" mon-c__badge--alert":""}"
        >${r}</span
      >`)}function Sp(e){return c`<span class="mon-c__ops">
    ${e.run_state==="running"?c`<button
          type="button"
          class="mon-op mon-op--pause"
          ?disabled=${e.can_pause===!1}
          aria-label="일시정지"
          title="일시정지 — 세션을 끊고 이어하기 가능 상태로 둡니다"
        >
          ${mo()}
        </button>`:c`<button
          type="button"
          class="mon-op mon-op--resume"
          ?disabled=${e.can_resume===!1}
          aria-label="이어하기"
          title="이어하기"
        >
          ${_o()}
        </button>`}
    ${e.discard?.action?c`<button
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
    ${e.run_state==="failed"?c`<button
          type="button"
          class="mon-op mon-op--dismiss"
          aria-label="실패 기록 닫기"
          title="실패 기록 닫기"
        >
          ${tl()}
        </button>`:""}
  </span>`}function Ap(e,t){let r=typeof e.started_at=="number"?po(t-e.started_at):"";return c`${gn(e)}
    <div class="mon-c__meta">
      ${bo(e)}${xp(e.last_event_at,t)}${hn(e)}${as(e)}
      ${Wt(e)?c`<span class="mon-c__model">${Wt(e)}</span>`:""}
      ${dr(e)?c`<span
            class="rtile__resumed"
            title=${dr(e)}
            >↻</span
          >`:""}
      ${r?c`<span class="mon-live__elapsed">${r}</span>`:""}
      ${ho(e)}${Sp(e)}${nr(e)}
    </div>`}function Tp(e){let t=e.workflow,n=(t&&t.chips||{}).route||t&&t.route,s=typeof e.spec_reviewer=="string"?e.spec_reviewer:"",o=e.plan_state==="approved"?"plan \u2713":e.plan_state==="authored"?"plan \u270E":"plan \u2013",a=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),i=Ct(e.updated_at);return c`${gn(e)}
    <div class="mon-c__meta">
      <span class="mon-c__grip" aria-hidden="true">⠿</span>${hn(e)}
      ${n?c`<span class="ctl-chip ctl-chip--route">${n}</span>`:""}
      ${s?c`<span
            class="ctl-chip mon-c__review${s==="skipped"?" mon-c__review--dim":""}"
            >spec:${s}</span
          >`:""}
      ${n==="full_plan"?c`<span
            class="ctl-chip mon-c__plan${e.plan_state==="none"?" mon-c__review--dim":""}"
            >${o}</span
          >`:""}
      ${Pn(e.labels,null).map(l=>c`<span class="ctl-chip ctl-chip--label">${l}</span>`)}
      ${as(e)}
      ${i?c`<span title=${`\uC218\uC815 ${Tt(e.updated_at)}`}
            >수정 ${i}</span
          >`:""}
      ${e.reason?c`<span
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
    </div>`}function Ep(e){let t=!!e.discard?.operation;return c`${gn(e)}
    <div class="mon-c__meta">
      <span class="mon-c__grip" aria-hidden="true">⠿</span>
      <span class="mon-live__pos">#${e.queue_position}</span>${hn(e)}
      ${bo(e)}
      ${e.reason?c`<span class="mon-c__reason">${e.reason}</span>`:""}
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
        ${t?c`<button
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
    ${e.revise_action?c`<div class="mon-c__tail">
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
        </div>`:""}`}function Cp(e){let t=!!(Ft(e.usage)||e.merge_action||e.cancel_action||e.discard_action);return c`${gn(e)}
    <div class="mon-c__meta">
      ${hn(e)}${as(e)}
      ${e.pr_url&&e.pr_number?c`<a
            class="mon-c__pr"
            href=${e.pr_url}
            target="_blank"
            rel="noreferrer noopener"
            title="PR 열기"
            >#${e.pr_number} ↗</a
          >`:""}
      ${bo(e)}
      ${e.reason?c`<span class="mon-c__reason">${e.reason}</span>`:""}
    </div>
    ${t?c`<div class="mon-c__tail">
          ${ho(e)}
          ${e.merge_action?c`<button
                type="button"
                class="worker-mini__merge"
                data-bead-id=${e.id}
                ?disabled=${e.merge_enabled===!1}
                title=${e.merge_title||""}
              >
                ${e.merge_label||"\uBA38\uC9C0"}
              </button>`:""}
          ${e.cancel_action?c`<button
                type="button"
                class="worker-mini__merge-cancel"
                data-bead-id=${e.id}
                ?disabled=${e.cancel_enabled===!1}
                title=${e.cancel_title||""}
              >
                취소
              </button>`:""}
          ${e.discard_action?c`<button
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
        </div>`:""}`}function Rp(e,t){let r=e.done_kind||"",n=r?yp[r]||r:"",s=Ct(e.done_at,t);return c`${gn(e)}
    <div class="mon-c__meta">
      ${hn(e)}${as(e)}
      ${n?c`<span
            class="mon-live__kind${wp.has(r)?" mon-live__kind--ok":" mon-live__kind--warn"}"
            >${n}</span
          >`:""}
      ${ho(e)}
      ${s?c`<span title=${`\uC644\uB8CC ${Tt(e.done_at)}`}
            >완료 ${s}</span
          >`:""}
    </div>`}function ll(e,t){return e.lane==="running"?Ap(e,t):e.lane==="runnable"?Tp(e):e.lane==="queue"?Ep(e):e.lane==="pr_wait"?Cp(e):Rp(e,t)}function cl(e){let t=String(e.revision);return c`<header
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
        ${e.auto_advance?mo():_o()}
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
        ${rl()}
        <span class="mon-ctl__label">머지</span>
      </button>
      <label class="mon-ctl mon-ctl--slots" title="동시에 실행할 세션 수">
        ${nl()}
        <span class="mon-ctl__label">슬롯</span>
        <input
          type="number"
          class="mon-slots__input"
          min=${mn}
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
        ${sl()}
        <span class="mon-ctl__label">설정</span>
      </button>
    </span>
  </header>`}function dl(e){let{total:t,both_on:r}=e.automation,n=t>0&&r===t,s=e.running_sort==="repo"?"repo":"started",o=Ht.find(i=>i.value===e.done_range)?.label||"",a=Array.isArray(e.token_total)?e.token_total:e.token_total?[{label:e.token_total,tooltip:e.token_tooltip}]:[];return c`<div class="mon-top">
    <button
      type="button"
      class="mon-auto-all${n?" is-active":""}"
      data-on=${n?"false":"true"}
      aria-pressed=${n?"true":"false"}
      ?disabled=${t===0}
      title=${n?"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uB055\uB2C8\uB2E4 (\uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4)":"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uCF2D\uB2C8\uB2E4"}
    >
      ${n?el():ol()}
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
        ${Ht.map(i=>c`<option
              value=${i.value}
              ?selected=${e.done_range===i.value}
            >
              ${i.label}
            </option>`)}
      </select>
      ${a.map(i=>c`<span
            class="mon-kpi__chip mon-kpi__chip--tokens"
            title=${i.tooltip}
            >${o} 완료 · 누적 ${i.label}</span
          >`)}
    </div>
  </div>`}function ul(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function pl(e){let t=(Array.isArray(e)?e:[]).map(i=>i&&i.usage).filter(i=>i&&typeof i=="object"&&"providers"in i);if(t.length>0)return ht(Bn(t));let r={};for(let i of Qt)r[i]=0;let n=!1,s=0,o=0,a=0;for(let i of Array.isArray(e)?e:[]){let l=i&&i.usage;if(l&&typeof l=="object"){let u=!1;for(let p of Qt){let m=l[p];typeof m=="number"&&Number.isFinite(m)&&(r[p]+=m,n=!0,u=!0)}if(u){o+=1;let p=l.total_cost_usd;typeof p=="number"&&Number.isFinite(p)&&(s+=p,a+=1)}}}return o>0&&a===o&&(r.total_cost_usd=s),n?Ft(r):null}var _l="bdui.monitor.done-range",ml="bdui.monitor.running_sort";function Ip(){try{let e=window.localStorage.getItem(_l);return Ot(e)?e:Et}catch{return Et}}function Lp(e){try{window.localStorage.setItem(_l,e)}catch{}}function Op(){try{return window.localStorage.getItem(ml)==="repo"?"repo":"started"}catch{return"started"}}function Dp(e){try{window.localStorage.setItem(ml,e)}catch{}}var gl="tab:monitor:pipeline",Mp=1e3,Pp=[{lane:"runnable",pane:"candidate",title:"\uC2E4\uD589\uAC00\uB2A5",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589\uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}];function fl(e,t){let r=(e.lane==="runnable"||e.lane==="queue")&&e.draggable!==!1;return c`<div
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
    ${ll(e,t)}
  </div>`}function hl(e,t){let r=at("views:monitor"),n=t.gotoIssue,s=t.pipelineStore,o=t.transport,a=t.execPresetStore,i=t.getWorkspacePath,l=t.switchWorkspace,u=t.now||(()=>Date.now()),p=t.confirm||(D=>typeof globalThis.confirm!="function"||globalThis.confirm(D)),m=Ip(),h=Op();function T(){let D=Ht.find(b=>b.value===m);return D?D.label:""}let $=document.createElement("div");$.className="mon",e.appendChild($);let E=go(null,null),F=null,x=new Map,G=new Set;function X(D){return E.queue_groups.find(b=>b.root_dir===D)||null}let O=ss(e,{queueStore:{get(){if(!F)return{revision:0,exec_defaults:{},default_exec_preset_id:null};let D=x.get(F);if(D)return D;let b=X(F),S=s&&s.get?s.get():null,C=(Array.isArray(S)?S:[]).find(H=>H&&H.root_dir===F);return{revision:b?b.revision:0,exec_defaults:b?b.exec_defaults:{},default_exec_preset_id:b?b.default_exec_preset_id:null,runner_catalog:b?b.runner_catalog:null,workspace_info:C?C.workspace_info:void 0}},set(D){F&&x.set(F,D);for(let b of Array.from(G))b()},subscribe(D){return G.add(D),()=>G.delete(D)}},presetStore:a,transport:o?(D,b)=>o(D,D==="worker-queue-set-default-exec-preset"||D==="get-worker-system-prompt"?{...b||{},root_dir:F}:b):void 0,getWorkspacePath:()=>F||void 0}),A=null,U=null;async function R(D,b,S,C,H=!0){if(!o||!S)return null;let q=await o(D,{...b,root_dir:S,expected_revision:C});if(q&&q.conflict&&H){q.queue&&x.set(S,q.queue);let Q=q.queue&&typeof q.queue.revision=="number"?q.queue.revision:C;q=await o(D,{...b,root_dir:S,expected_revision:Q})}return q&&q.queue&&S&&x.set(S,q.queue),q}function oe(D,b){let S=x.get(D),C=s&&s.get?s.get():null,H=(Array.isArray(C)?C:[]).find(Q=>Q?.root_dir===D);return(S||H)?.merge_queue?.find(Q=>Q.bead_id===b)?.continuation_action}async function Ce(D,b,S,C){let H=await R(D,b,S,C),q=x.get(S)?.revision??H?.queue?.revision??C;return Xt(H,(Q,ue)=>R(D,{...b,continuation:Q,decision_token:ue},S,q,!1),{refresh:Q=>R(D,b,S,Q?.queue?.revision??x.get(S)?.revision??q,!1)})}async function ne(D,b,S,C){let H=await Xt({continuation_mismatch:C},(Q,ue)=>R("worker-merge-queue-add",{bead_id:b,continuation:Q,decision_token:ue},D,S,!1)),q=H?.queue?.merge_queue?.find(Q=>Q.bead_id===b)?.continuation_action;H?.applied!==!0&&q?.continuation===null&&q.mismatch&&await ne(D,b,H.queue.revision,q.mismatch)}async function me(D,b,S){let C=await R("worker-discard",D,b,S);if(C&&C.discarded===!0){K(os(C),"success",5e3);return}if(C&&C.reason){K(`\uD3D0\uAE30 \uC2E4\uD328: ${C.reason}`,"error");return}if(C&&C.accepted&&C.pending==="merged_revert"){K("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if(C&&C.accepted){K(`\uD3D0\uAE30 \uC9C4\uD589: ${C.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}C&&!C.conflict&&K("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function Oe(D,b,S){return!o||!S?null:await o(D,{...b,root_dir:S})}async function Ve(D){if(!o||!D&&!p("\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB055\uB2C8\uB2E4. \uAC01 \uB808\uD3EC\uC758 \uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uD568\uAED8 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?"))return;let b=await o("monitor-auto-toggle",{on:D}),S=b&&Array.isArray(b.failed)?b.failed:[];S.length>0&&K(`\uC790\uB3D9\uD654 ${D?"\uCF1C\uAE30":"\uB044\uAE30"} \uC77C\uBD80 \uC2E4\uD328: ${S.map(C=>C.root_dir).join(", ")}`,"error",3200)}async function st(){let D=new Map;for(let b of E.pr_wait)D.has(b.root_dir)||D.set(b.root_dir,b.expected_revision);for(let[b,S]of D)await R("worker-merge-queue-add-all",{},b,S)}let Pe=null,De=!1,Ae=null;function ge(){Ae!==null&&clearTimeout(Ae),Ae=setTimeout(()=>{Ae=null,De=!1},0)}function ve(D){let b=D.target;return typeof b?.closest=="function"?b.closest(".mon-group"):null}function he(D){let b=ve(D);return!b||!Pe?null:(b.getAttribute("data-root-dir")||"")===Pe.root_dir?b:null}function V(){for(let D of Array.from($.querySelectorAll(".mon-group--drag-over")))D.classList.remove("mon-group--drag-over")}function W(D){let b=D.target,S=typeof b?.closest=="function"?b.closest('.mon-card[draggable="true"]'):null;if(S){Pe={bead_id:S.getAttribute("data-issue-id")||"",lane:S.getAttribute("data-lane")||"",root_dir:S.getAttribute("data-root-dir")||"",revision:Number(S.getAttribute("data-revision")||0)||0,queue_index:Number(S.getAttribute("data-queue-index")),queue_length:Number(S.getAttribute("data-queue-length")),place_index:Number(S.getAttribute("data-place-index"))},De=!0;try{D.dataTransfer?.setData("text/plain",Pe.bead_id),D.dataTransfer&&(D.dataTransfer.effectAllowed="move")}catch{}}}function _e(D){let b=he(D);b&&(D.preventDefault(),D.dataTransfer&&(D.dataTransfer.dropEffect="move"),b.classList.add("mon-group--drag-over"))}function Z(D){ve(D)?.classList.remove("mon-group--drag-over")}function ye(){Pe=null,V(),ge()}function j(D){let b=he(D),S=Pe;if(Pe=null,V(),!b||!S||!S.bead_id)return;D.preventDefault();let C=D.target,H=typeof C?.closest=="function"?C.closest('.mon-card[data-lane="queue"]'):null,q=H&&b.contains(H)?Number(H.getAttribute("data-queue-index")):NaN;if(S.lane==="runnable"){let Ie=Number.isFinite(q)?q:S.place_index;if(!Number.isFinite(Ie))return;R("worker-queue-place",{bead_id:S.bead_id,index:Ie},S.root_dir,S.revision);return}if(S.lane!=="queue"||H&&H.getAttribute("data-issue-id")===S.bead_id)return;let Q=S.queue_index,ue=Number.isFinite(q)?Q>q?q:q-1:S.queue_length-1;!Number.isFinite(ue)||ue<0||ue===Q||R("worker-queue-reorder",{bead_id:S.bead_id,to_index:ue},S.root_dir,S.revision)}function P(D){let b={runnable:E.runnable,queue:E.queue,running:E.running,pr_wait:E.pr_wait,done:E.done};return c`${dl({automation:E.automation,counts:{running:E.running.length,queue:E.queue.length,pr_wait:E.pr_wait.length},running_sort:h,done_range:m,token_total:pl(E.done),token_tooltip:ul(T())})}
      <div class="worker-lanes mon-lanes">
        ${Pp.map(S=>{let C=b[S.lane],H=S.lane==="queue"?E.queue_groups.length>0?c`${E.queue_groups.map(q=>c`<div
                        class="mon-group"
                        data-root-dir=${q.root_dir}
                      >
                        ${cl(q)}
                        <div class="mon-group__list">
                          ${q.items.map(Q=>fl(Q,D))}
                        </div>
                      </div>`)}`:void 0:C.length>0?c`${C.map(q=>fl(q,D))}`:void 0;return Yt({id:`monitor-${S.lane}`,lane:S.pane,title:S.lane==="done"?`\uC644\uB8CC\xB7${T()}`:S.title,items:C,empty:S.empty,body:H,live:S.lane==="running"&&C.length>0,header_control:S.lane==="pr_wait"&&C.length>0?c`<button
                    type="button"
                    class="mon-lane-op mon-merge-all"
                    title="자격이 생기는 PR을 각 레포의 머지 큐에 한 번에 넣습니다"
                  >
                    일괄 머지
                  </button>`:""})})}
      </div>`}function ce(){let D=s&&s.get?s.get():null,b=s&&s.getWorkspacesState?s.getWorkspacesState():[],S=u();E=go(D,b,{done_since:kr(m,S),running_sort:h}),je(P(S),$)}function we(D,b){let S=i?i():void 0;if(!b||!S||b===S||!l){n(D);return}l(b).then(()=>{n(D)}).catch(C=>{r("workspace switch for %s failed: %o",b,C)})}function ke(D){return{root_dir:D.getAttribute("data-root-dir")||"",revision:Number(D.getAttribute("data-revision")||0)||0}}function Ue(D,b){let{root_dir:S,revision:C}=ke(D),H=D.getAttribute("data-issue-id")||"",q=b.dataset.attemptId||D.getAttribute("data-attempt-id")||"",Q=b.classList;if(Q.contains("worker-card__place")){R("worker-queue-place",{bead_id:H,index:Number(D.getAttribute("data-place-index")||0)||0},S,C);return}if(Q.contains("mon-op--up")||Q.contains("mon-op--down")){let ue=Number(D.getAttribute("data-queue-index")||0)||0,Ie=Q.contains("mon-op--up")?ue-1:ue+1;if(Ie<0)return;R("worker-queue-reorder",{bead_id:H,to_index:Ie},S,C);return}if(Q.contains("mon-op--remove")){R("worker-queue-remove",{bead_id:H},S,C);return}if(Q.contains("mon-op--pause")){Oe("worker-attempt-pause",{attempt_id:q},S);return}if(Q.contains("mon-op--discard")){if(!p(_n(H,"unmerged")))return;me({bead_id:H,...q?{attempt_id:q}:{},...b.dataset.operationId?{operation_id:b.dataset.operationId}:{}},S,C);return}if(Q.contains("mon-op--resume")){Ce("worker-attempt-resume",{attempt_id:q},S,C);return}if(Q.contains("mon-op--dismiss")){R("worker-attempt-dismiss",{attempt_id:q},S,C);return}if(Q.contains("worker-mini__merge")){let ue=oe(S,H);ue?.mismatch&&ue.continuation===null?ne(S,H,C,ue.mismatch):R("worker-merge-queue-add",{bead_id:H},S,C);return}if(Q.contains("worker-mini__merge-cancel")){R("worker-merge-queue-remove",{bead_id:H},S,C);return}if(Q.contains("worker-mini__discard")){let ue=b.dataset.discardMode==="merged"?"merged":"unmerged";if(!p(_n(H,ue)))return;me({bead_id:H,...q?{attempt_id:q}:{},...b.dataset.operationId?{operation_id:b.dataset.operationId}:{}},S,C);return}if(Q.contains("worker-mini__revise-fix")){Ce("worker-revise-fix",{bead_id:H},S,C);return}Q.contains("worker-mini__revise-approve")&&R("worker-revise-approve",{bead_id:H},S,C)}function Re(D){let b=De;De=!1;let S=D.target;if(!S||typeof S.closest!="function"||S.closest("dialog")||S.closest("a"))return;let C=S.closest(".mon-running-sort");if(C){D.preventDefault(),h=C.getAttribute("data-sort")==="repo"?"repo":"started",Dp(h),ce();return}let H=S.closest(".mon-auto-all");if(H){D.preventDefault(),Ve(H.getAttribute("data-on")==="true");return}if(S.closest(".mon-merge-all")){D.preventDefault(),st();return}let Q=S.closest(".mon-ctl--advance");if(Q){D.preventDefault();let{root_dir:it,revision:ot}=ke(Q);R("worker-automation-toggle",{on:Q.getAttribute("data-on")==="true"},it,ot);return}let ue=S.closest(".mon-ctl--merge-auto");if(ue){D.preventDefault();let{root_dir:it,revision:ot}=ke(ue);R("worker-merge-auto-toggle",{on:ue.getAttribute("data-on")==="true"},it,ot);return}let Ie=S.closest(".mon-ctl--exec");if(Ie){D.preventDefault(),F=Ie.getAttribute("data-root-dir")||null,x.delete(F||""),O.open();return}let Je=S.closest(".mon-card");if(!Je)return;let He=S.closest("button");if(He){D.preventDefault(),Ue(Je,He);return}let dt=Je.getAttribute("data-issue-id");dt&&!b&&(D.preventDefault(),we(dt,Je.getAttribute("data-root-dir")||""))}function ze(D){let b=D.target;if(!b||typeof b.closest!="function")return;let S=b.closest(".mon-done-range");if(S){m=Ot(S.value)?S.value:Et,Lp(m),ce();return}let C=b.closest(".mon-slots__input");if(!C)return;let{root_dir:H,revision:q}=ke(C),Q=Number(C.value);if(!Number.isFinite(Q))return;let ue=Math.max(mn,Math.floor(Q));R("worker-queue-set-slots",{slots:ue},H,q)}e.addEventListener("click",Re),e.addEventListener("change",ze),e.addEventListener("dragstart",W),e.addEventListener("dragover",_e),e.addEventListener("dragleave",Z),e.addEventListener("drop",j),e.addEventListener("dragend",ye),s&&typeof s.subscribe=="function"&&(A=s.subscribe(()=>{try{x.clear(),ce();for(let D of Array.from(G))D()}catch{}}));function Ne(){U!==null&&(clearInterval(U),U=null)}function tt(){Ae!==null&&(clearTimeout(Ae),Ae=null)}return{load(){r("load"),ce(),U===null&&(U=setInterval(()=>{try{ce()}catch{}},Mp))},pause(){Ne()},clear(){Ne(),tt(),A&&(A(),A=null),e.removeEventListener("click",Re),e.removeEventListener("change",ze),e.removeEventListener("dragstart",W),e.removeEventListener("dragover",_e),e.removeEventListener("dragleave",Z),e.removeEventListener("drop",j),e.removeEventListener("dragend",ye),O.destroy(),G.clear(),e.replaceChildren()}}}function bl(e,t,r){let n=at("views:nav"),s=null;function o(l){return u=>{u.preventDefault(),n("click tab %s",l),r.gotoView(l)}}function a(){let l=t.getState(),u=l.view==="worker"||l.view==="monitor"?l.view:"board";return c`
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
    `}function i(){je(a(),e)}return i(),s=t.subscribe(()=>i()),{destroy(){s&&(s(),s=null),je(c``,e)}}}var vl=["bug","feature","task","epic","chore"];function yl(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var wl=["Critical","High","Medium","Low","Backlog"];function kl(e,t){let r=document.createElement("dialog");r.id="new-issue-dialog",r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true"),r.innerHTML=`
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
  `,e.appendChild(r);let n=r.querySelector("#new-issue-form"),s=r.querySelector("#new-title"),o=r.querySelector("#new-type"),a=r.querySelector("#new-priority"),i=r.querySelector("#new-labels"),l=r.querySelector("#new-description"),u=r.querySelector("#new-issue-error"),p=r.querySelector("#btn-cancel"),m=r.querySelector("#btn-create"),h=r.querySelector(".new-issue__close");function T(){o.replaceChildren();let O=document.createElement("option");O.value="",O.textContent="\u2014 Select \u2014",o.appendChild(O);for(let A of vl){let U=document.createElement("option");U.value=A,U.textContent=yl(A),o.appendChild(U)}a.replaceChildren();for(let A=0;A<=4;A+=1){let U=document.createElement("option");U.value=String(A);let R=wl[A]||"Medium";U.textContent=`${A} \u2013 ${R}`,a.appendChild(U)}}T();function $(){try{typeof r.close=="function"?r.close():r.removeAttribute("open")}catch{r.removeAttribute("open")}}function E(O){s.disabled=O,o.disabled=O,a.disabled=O,i.disabled=O,l.disabled=O,p.disabled=O,m.disabled=O,m.textContent=O?"Creating\u2026":"Create"}function F(){u.textContent=""}function x(O){u.textContent=O}function G(){try{let O=window.localStorage.getItem("beads-ui.new.type");O?o.value=O:o.value="";let A=window.localStorage.getItem("beads-ui.new.priority");A&&/^\d$/.test(A)?a.value=A:a.value="2"}catch{o.value="",a.value="2"}}function X(){let O=o.value||"",A=a.value||"";O.length>0&&window.localStorage.setItem("beads-ui.new.type",O),A.length>0&&window.localStorage.setItem("beads-ui.new.priority",A)}async function I(){F();let O=String(s.value||"").trim();if(O.length===0){x("Title is required"),s.focus();return}let A=Number(a.value||"2");if(!(A>=0&&A<=4)){x("Priority must be 0..4"),a.focus();return}let U=String(o.value||""),R=String(l.value||""),oe={title:O};U.length>0&&(oe.type=U),String(A).length>0&&(oe.priority=A),R.length>0&&(oe.description=R),E(!0);try{await t("create-issue",oe)}catch{E(!1),x("Failed to create issue");return}X(),E(!1),$()}return r.addEventListener("cancel",O=>{O.preventDefault(),$()}),h.addEventListener("click",()=>$()),p.addEventListener("click",()=>$()),r.addEventListener("keydown",O=>{O.key==="Enter"&&(O.ctrlKey||O.metaKey)&&(O.preventDefault(),I())}),n.addEventListener("submit",O=>{O.preventDefault(),I()}),{open(){n.reset(),F(),G();try{"showModal"in r&&typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")}catch{r.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){$()}}}var Np=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function $l(e){return String(e).padStart(2,"0")}function Fp(e,t){let r=Math.max(0,Math.ceil((e-t)/6e4)),n=Math.floor(r/1440),s=Math.floor(r%1440/60),o=r%60;return n>0?`${n}d${s>0?` ${s}h`:""}`:s>0?`${s}h${o>0?` ${o}m`:""}`:`${o}m`}function qp(e,t=Date.now()){let r=Date.parse(e);if(!Number.isFinite(r))return"";let n=new Date(r),s=new Date(t),o=`${$l(n.getHours())}:${$l(n.getMinutes())}`,i=n.getFullYear()===s.getFullYear()&&n.getMonth()===s.getMonth()&&n.getDate()===s.getDate()?o:`${Np[n.getMonth()]} ${n.getDate()} ${o}`;return`${Fp(r,t)} \xB7 ${i}`}function Bp(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}var xl=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage"}];function Sl(e){let t=!1,r=null,n=new Map;function s(){je(c``,e),e.hidden=!0}function o(){let l=xl.filter(p=>n.has(p.key));if(l.length===0){s();return}let u=Date.now();je(c`<div class="usage-meter" aria-label="Usage">
        ${l.map(p=>{let m=n.get(p.key),h=typeof m.ageSeconds=="number"&&m.ageSeconds>600,T=h?`${Math.floor(m.ageSeconds/60)}\uBD84 \uC804 \uCE21\uC815`:"";return c`<span
            class="usage-meter__group${h?" usage-meter__group--stale":""}"
            aria-label=${`${p.label} usage`}
          >
            <span class="usage-meter__provider">${p.label}</span>
            ${m.windows.map($=>{let E=typeof $.pct=="number"&&Number.isFinite($.pct)?$.pct:0,F=Math.min(100,Math.max(0,E)),G=`resets ${qp($.resetsAt,u)}${h?` \xB7 ${T}`:""}`;return c`<span
                class="usage-meter__window ${Bp(F)}"
                style=${`--progress: ${F}%`}
                title=${G}
              >
                <span class="usage-meter__label">${$.key}</span>
                <span class="usage-meter__track" aria-hidden="true">
                  <span class="usage-meter__fill"></span>
                </span>
                <span class="usage-meter__pct">${F}%</span>
              </span>`})}
          </span>`})}
      </div>`,e),e.hidden=!1}async function a(l){try{let u=await fetch(l.endpoint);if(!u.ok)return null;let p=await u.json();return!p||p.available!==!0||!Array.isArray(p.windows)?null:p}catch{return null}}async function i(){let l=await Promise.all(xl.map(async u=>({provider:u,payload:await a(u)})));if(!t){for(let u of l)u.payload?n.set(u.provider.key,u.payload):n.delete(u.provider.key);o()}}return s(),i(),r=setInterval(()=>{i()},6e4),{destroy(){t=!0,r!==null&&(clearInterval(r),r=null),s()}}}var Up="worker-ineligible";function vo(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Al(e){return vo(e).includes(Up)}var yo="worker-serial";function bn(e){return vo(e).includes(yo)}var jp="tab:worker:ready",zp="tab:worker:blocked",Hp="tab:worker:in-progress",Wp="tab:worker:closed",vn=1,Gp=new Set(["done","failed","orphaned","stopped","discarded"]);function Tl(e){return pn(e).path.length>0}var Rl="beads-ui.worker.candidate-filter",wo={show_blocked:!1,spec:"all"};function Yp(){try{let e=window.localStorage.getItem(Rl);if(!e)return{...wo};let t=JSON.parse(e);if(!t||typeof t!="object")return{...wo};let r=t.spec;return{show_blocked:t.show_blocked===!0,spec:r==="with"||r==="without"?r:"all"}}catch{return{...wo}}}function Vp(e){try{window.localStorage.setItem(Rl,JSON.stringify(e))}catch{}}function Kp(e,t){let r=i=>t.show_blocked||!i.blocked,n=i=>t.spec==="all"||(t.spec==="with"?i.has_spec:!i.has_spec),s=[],o=0,a=0;for(let i of e){let l=r(i),u=n(i);l&&u?s.push(i):!l&&u?o+=1:l&&!u&&(a+=1)}return{visible:s,hidden_blocked:o,hidden_spec:a}}var Zp=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],Il="bdui.worker.candidate_sort",Xp=[{value:"spec",label:"spec \uC6B0\uC120"},{value:"board",label:"Board \uC21C\uC11C"},{value:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131\uC21C"}],is="spec";function Qp(){try{let e=window.localStorage.getItem(Il);return e==="board"||e==="created"||e==="spec"?e:is}catch{return is}}function Jp(e){try{window.localStorage.setItem(Il,e)}catch{}}var Ll="bdui.worker.done-range";function ef(){try{let e=window.localStorage.getItem(Ll);return Ot(e)?e:Et}catch{return Et}}function tf(e){try{window.localStorage.setItem(Ll,e)}catch{}}var rf="(max-width: 640px)",Ol="beads-ui.worker.lane-collapsed",yn={queue:!0,done:!0};function nf(){try{let e=window.localStorage.getItem(Ol);if(!e)return{...yn};let t=JSON.parse(e);return!t||typeof t!="object"?{...yn}:{queue:typeof t.queue=="boolean"?t.queue:yn.queue,done:typeof t.done=="boolean"?t.done:yn.done}}catch{return{...yn}}}function sf(e){try{window.localStorage.setItem(Ol,JSON.stringify(e))}catch{}}function El(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let r=typeof t.title=="string"?t.title:t.id||"";return r.length>22?`${r.slice(0,22)}\u2026`:r}function of(e,t,r){let n=Array.isArray(e)?e.slice():[];return t==="created"?n.sort(xr):(n.sort(Rn(r)),t==="board"?n:[...n.filter(Tl),...n.filter(s=>!Tl(s))])}function af(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function lf(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function cf(e){let r=(Array.isArray(e?.dependencies)?e.dependencies:[]).map(n=>typeof n=="string"?n:n&&n.id).filter(Boolean);return r.length>0?`\u{1F512} ${r.join(", ")}`:"\u{1F512} blocked"}var df=["closed_unmerged","review","undecidable"],uf=[{from:"\uAD00\uCE21 \uB300\uAE30",activity:"checking",to:"\uD655\uC778\uC911"},{from:"\uAC80\uC99D \uB300\uAE30",activity:"verifying",to:"\uAC80\uC99D \uC911"}];function pf(e,t){for(let r of uf)if(e===r.from&&t===r.activity)return{label:r.to,live:!0};return{label:e,live:!1}}var ff=[{step:"merging",label:"\uBA38\uC9C0 \uC911",index:1},{step:"base_containment",label:"base \uD3EC\uD568 \uD655\uC778",index:2},{step:"repo_operations",label:"\uC800\uC7A5\uC18C \uC791\uC5C5",index:3},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC",index:4},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC",index:5},{step:"parent_close",label:"\uBD80\uBAA8 close",index:6}];function _f(e){if(typeof e!="string"||e.length===0)return null;let t=6,r=ff.find(n=>n.step===e);return r?{label:r.label,index:r.index,total:t,percent:Math.round(r.index/t*100)}:{label:e,index:0,total:t,percent:0}}function Cl(e){switch(e){case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";default:return e}}function mf(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}function ko(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}function gf(e){if(!e||typeof e!="object")return null;let t=Number.isInteger(e.repair_sessions_used)?Math.max(0,e.repair_sessions_used):0,r=Number.isInteger(e.repair_session_cap)?Math.max(0,e.repair_session_cap):0,n=e.current_repair&&typeof e.current_repair=="object"?e.current_repair:null,s=n&&typeof n.pr_number=="number"?n.pr_number:null,o="";switch(e.phase){case"gating":o="root \uC7AC\uAC80\uC99D \uC911";break;case"repairing":o=e.subject_role==="root"?`\uC790\uB3D9\uBCF5\uAD6C ${t}/${r} \xB7 \uC6D0 PR \uC218\uC815 \uC911`:`\uC790\uB3D9\uBCF5\uAD6C ${t}/${r} \xB7 repair PR \uC900\uBE44 \uC911`;break;case"waiting_repair_pr":o=s?`repair PR #${s} \uB300\uAE30`:"repair PR \uB300\uAE30";break;case"merging":o=e.subject_role==="repair"?s?`repair PR #${s} \uBA38\uC9C0 \uC911`:"repair PR \uBA38\uC9C0 \uC911":"root \uBA38\uC9C0 \uC911";break;case"cleaning":o="\uC815\uB9AC \uBCF5\uAD6C \uC911";break;case"paused":o="\uC790\uB3D9\uBCF5\uAD6C \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":o=`\uC0AC\uB78C \uD655\uC778 \uD544\uC694 \xB7 ${e.terminal_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`;break;case"completed":return null;default:return null}let a=[`\uBCF5\uAD6C \uC138\uC158 ${t}/${r}`];return e.head_sha&&a.push(`head ${e.head_sha}`),e.base_sha&&a.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&a.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`),e.active_attempt_id&&a.push(`attempt ${e.active_attempt_id}`),n&&typeof n.bead_id=="string"&&a.push(`repair ${n.bead_id}`),e.evidence&&a.push(e.evidence),e.log_path&&a.push(e.log_path),{badge:o,title:a.join(`
`),alert:e.phase==="needs_human",lock_actions:e.phase!=="paused"&&e.phase!=="needs_human",repair_pr_url:n&&typeof n.pr_url=="string"?n.pr_url:"",repair_pr_number:s}}function hf(e,t,r,n,s=null,o=null,a=null,i=!1,l=null,u=!0,p=null,m=null,h=null,T={},$=!1){let E=!!l&&l.position>0,F=!!l?.continuation_action&&l.continuation_action.continuation===null,x=!!l&&l.active===!0,G=l&&l.failure||null,X=r[e]||null,I=X&&X.gate?X.gate:null,O=X&&X.pr?X.pr:null,A=gf(h),U=mf(l?l.resolution:null),R=[];i&&R.push("\uC138\uC158");let oe=a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":U?U.badge:a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":null,Ce=pf(i&&I&&I.tier==="closed_unmerged"?"\uB2EB\uD798":I&&I.gate_badge||"",oe?null:o&&o.activity||null);oe&&R.push(oe),Ce.label&&R.push(Ce.label),I&&I.base_badge&&I.base_badge!==I.gate_badge&&R.push(I.base_badge),m&&R.push(m),n&&R.push("\uC815\uB9AC \uC2E4\uD328"),A&&R.push(A.badge),E&&!x&&R.push(`\uBA38\uC9C0 \uB300\uAE30 #${l.position}`),G&&R.push(`\uC77C\uAD04 \uBA38\uC9C0 \uC2E4\uD328: ${Cl(G)}`),F&&R.push("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"),p&&R.push(`\uC790\uB3D9 \uC81C\uC678: ${Cl(p)}`);let ne=!!I&&I.base_badge==="\uCDA9\uB3CC",me=!!I&&I.enabled===!0,Oe=_f(o&&o.merge_progress?o.merge_progress.step:null),Ve=!!n&&["child_sweep","branch_cleanup","parent_close"].includes(n.step)&&!!I&&I.tier==="merged",st=i&&!!I&&I.tier==="merged",Pe=i&&ne&&u===!1,De=Gt(T,e,{external:i,merge_active:x||!!Oe,merge_queued:E,conflict_active:!!a,cleanup_active:!1,merged:!!n||I?.tier==="merged"}),Ae=!!De.operation,ge=!Ve&&!!n&&n.step==="repo_operations";return{id:e,title:t,reason:Ve||n?"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644":"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",worker_serial:$,external:i,pr_number:O&&typeof O.number=="number"?O.number:null,pr_url:O&&typeof O.url=="string"?O.url:"",completion_badge:A?A.badge:null,completion_title:A?A.title:"",completion_repair_pr_url:A?A.repair_pr_url:"",completion_repair_pr_number:A?A.repair_pr_number:null,badges:R,live_badge:a==="paused"?null:U?.live||a==="running"?oe:Ce.live?Ce.label:null,usage:s,alert:!!I&&df.includes(I.tier)||!!n||!!G||!!(A&&A.alert),merge_action:ge?!1:!E||F,cancel_action:E&&!F,cancel_enabled:!x&&!(A&&A.lock_actions),cancel_title:A&&A.lock_actions?"\uC790\uB3D9\uBCF5\uAD6C \uC911 \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694":x?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:De,discard_action:De.action,merge_step:Oe,discard_enabled:De.enabled,discard_title:De.title,merge_enabled:!Oe&&!a&&!Ae&&!(A&&A.lock_actions)&&!Pe&&!ge&&(me||ne||Ve||st),merge_label:F?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":Ve||st?"\uC815\uB9AC":ne&&!Oe&&!Ve?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:Ae?De.error?`\uD3D0\uAE30 \uC2E4\uD328: ${De.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${De.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:F?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":Oe?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${Oe.label}`:st?"\uBA38\uC9C0\uB428 \u2014 \uD074\uB9AD\uD558\uBA74 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC\uB97C \uC218\uD589\uD569\uB2C8\uB2E4":Pe?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":Ve?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":ne?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":me?`\uBA38\uC9C0 (${I.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:I&&I.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${I&&I.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function $o(e,t={}){let{transport:r,issueStores:n,queueStore:s,execPresetStore:o,sessionLogStore:a,uiOrderStore:i,gotoIssue:l,getWorkspacePath:u,doneRange:p,onDoneRangeChange:m}=t,h=n?Ln(n,i):null,T=Dn({transport:r,uiOrderStore:i}),$=null,E=[],F=Yp(),x=Qp(),G=Ot(p)?p:ef(),X=new Map;function I(){let f=Ht.find(w=>w.value===G);return f?f.label:"\uC624\uB298"}let O=nf(),A=!1,U=new Set,R=new Set,oe=new Set,Ce="ordinary",ne=!1,me=new Map,Oe=[],Ve=document.createElement("div");Ve.className="worker-console";let st=document.createElement("div");st.className="worker-top";let Pe=document.createElement("div");Pe.className="worker-drawer-overlay",Pe.hidden=!0;let De=document.createElement("div");De.className="worker-drawer-overlay__backdrop";let Ae=document.createElement("div");Ae.className="worker-drawer-host",Pe.append(De,Ae);let ge=document.createElement("div");ge.className="worker-lanes-host",Ve.append(st,Pe,ge),e.appendChild(Ve);let ve=null,he=es(Ae,{transport:r,sessionLogStore:a,onClose:()=>{ve=null,Pe.hidden=!0,Me()}}),V=ss(Ve,{queueStore:s,presetStore:o,transport:r,getWorkspacePath:u});function W(){return s&&s.get()||{revision:0,auto_advance:!1,auto_merge:!1,pr_wait_holds_slot:!1,slots:vn,queue:[],pr_wait:[],done:[]}}function _e(){let f=W();return typeof f.revision=="number"?f.revision:0}function Z(f){f&&f.queue&&s&&s.set(f.queue)}function ye(){let f=W().queue;return Array.isArray(f)?f.length:0}async function j(f,w){if(!r)return;let L=await r("worker-queue-place",{bead_id:f,index:w,expected_revision:_e()});Z(L),L&&L.conflict&&await r("worker-queue-place",{bead_id:f,index:w,expected_revision:_e()}).then(Z)}async function P(f,w){if(!r)return;let L=await r("worker-queue-reorder",{bead_id:f,to_index:w,expected_revision:_e()});Z(L),L&&L.conflict&&await r("worker-queue-reorder",{bead_id:f,to_index:w,expected_revision:_e()}).then(Z)}async function ce(f){if(!r)return;let w=await r("worker-queue-remove",{bead_id:f,expected_revision:_e()});Z(w),w&&w.conflict&&await r("worker-queue-remove",{bead_id:f,expected_revision:_e()}).then(Z)}async function we(){if(!r||ne)return;let w=(Array.isArray(W().queue)?W().queue:[]).map(ae=>ae.bead_id).filter(ae=>oe.has(ae));if(w.length===0)return;if(w.some(ae=>{let ie=me.get(ae);return ie!==!0&&ie!==!1})){K("\uC2E4\uD589 \uBC29\uC2DD \uD655\uC778 \uC911","warning");return}let L=Ce==="serial",re=w.filter(ae=>me.get(ae)!==L);if(re.length===0){oe.clear(),Me(),K("\uC774\uBBF8 \uAC19\uC740 \uC2E4\uD589 \uBC29\uC2DD\uC785\uB2C8\uB2E4","info");return}ne=!0,Me();let fe=[],be=0;try{for(let ae of re){let ie=await Promise.resolve(r(L?"label-add":"label-remove",{id:ae,label:yo})).catch(()=>[]),Le=Array.isArray(ie)?ie[0]:ie,ct=Le&&typeof Le=="object"?Le.labels:null;Le&&typeof Le=="object"&&Le.id===ae&&Array.isArray(ct)&&bn(ct)===L?be+=1:fe.push(ae)}if(fe.length===0){oe.clear(),K(`${be}\uAC1C \uC2E4\uD589 \uBC29\uC2DD \uBCC0\uACBD`,"success");return}oe.clear();for(let ae of fe)oe.add(ae);K(`${re.length}\uAC1C \uC911 ${be}\uAC1C \uBCC0\uACBD \xB7 ${fe.length}\uAC1C \uC2E4\uD328 (${fe.join(", ")})`,"error")}finally{ne=!1,Me()}}async function ke(f){if(!r||!f)return;let w=await r("worker-attempt-pause",{attempt_id:f});w&&w.paused===!1&&w.reason&&K(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${w.reason}`,"error",2400)}async function Ue(f){if(!r||!f)return;let w=async(re={})=>await r("worker-attempt-resume",{attempt_id:f,expected_revision:_e(),...re}),L=await w();Z(L),L&&L.conflict&&(L=await r("worker-attempt-resume",{attempt_id:f,expected_revision:_e()}),Z(L)),L=await Xt(L,(re,fe)=>w({continuation:re,decision_token:fe}),{onResult:Z,refresh:()=>w()}),L&&L.resumed===!1&&!L.conflict&&L.reason&&K(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${L.reason}`,"error",2400)}async function Re(f){if(!r||!f)return;let w=await r("worker-attempt-dismiss",{attempt_id:f,expected_revision:_e()});Z(w),w&&w.conflict&&(w=await r("worker-attempt-dismiss",{attempt_id:f,expected_revision:_e()}),Z(w)),w&&w.dismissed===!1&&!w.conflict&&w.reason&&K(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${w.reason}`,"error",2400)}async function ze(f,w,L=!0){if(!r)return null;let re=r,fe=await re(f,{...w,expected_revision:_e()});return Z(fe),fe&&fe.conflict&&L&&(fe=await re(f,{...w,expected_revision:_e()}),Z(fe)),fe}async function Ne(f){if(!r||!f)return;let w=W().merge_queue?.find(re=>re.bead_id===f)?.continuation_action;if(w?.mismatch&&w.continuation===null){await tt(f,w.mismatch);return}U.add(f),Me();let L;try{L=await ze("worker-merge-queue-add",{bead_id:f})}finally{U.delete(f),Me()}!L||L.conflict||L.applied||K("\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)","error",2400)}async function tt(f,w){let L=await Xt({continuation_mismatch:w},(fe,be)=>ze("worker-merge-queue-add",{bead_id:f,continuation:fe,decision_token:be},!1)),re=L?.queue?.merge_queue?.find(fe=>fe.bead_id===f)?.continuation_action;if(L?.applied!==!0&&re?.continuation===null&&re.mismatch){await tt(f,re.mismatch);return}L&&L.applied===!1&&!L.conflict&&K("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD\uC774 \uCD5C\uC2E0 \uC0C1\uD0DC\uC640 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4","error",2800)}async function D(f){if(!r)return;let w=await ze("worker-merge-auto-toggle",{on:f});!w||w.conflict||K(f?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",f?"success":"info",2400)}async function b(f){if(!r||!f)return;let w=await ze("worker-merge-queue-remove",{bead_id:f});w&&!w.conflict&&!w.applied&&w.reason==="merge_active"&&K("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function S(){await ze("worker-merge-queue-remove",{all:!0})}async function C(f,w=null,L="unmerged",re=null){if(!r||!f)return;let fe=_n(f,L);if(!(typeof globalThis.confirm!="function"||globalThis.confirm(fe)))return;let ae=await r("worker-discard",{bead_id:f,...w?{attempt_id:w}:{},...re?{operation_id:re}:{},expected_revision:_e()});if(Z(ae),ae&&ae.conflict&&(ae=await r("worker-discard",{bead_id:f,...w?{attempt_id:w}:{},...re?{operation_id:re}:{},expected_revision:_e()}),Z(ae)),ae&&ae.discarded===!0){K(os(ae),"success",5e3);return}if(ae&&ae.reason){K(`\uD3D0\uAE30 \uC2E4\uD328: ${ae.reason}`,"error",2800);return}if(ae&&ae.accepted&&ae.pending==="merged_revert"){K("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(ae&&ae.accepted&&!ae.discarded){K(`\uD3D0\uAE30 \uC9C4\uD589: ${ae.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}ae&&!ae.conflict&&K("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function H(f,w){if(!r||!w||R.has(w))return;R.add(w),Me();let L;try{let re=async(fe={})=>await r(f,{bead_id:w,expected_revision:_e(),...fe});L=await re(),Z(L),L&&L.conflict&&(L=await r(f,{bead_id:w,expected_revision:_e()}),Z(L)),f==="worker-revise-fix"&&(L=await Xt(L,(fe,be)=>re({continuation:fe,decision_token:be}),{onResult:Z,refresh:()=>re()}))}finally{R.delete(w),Me()}if(!(!L||L.conflict)){if(L.ok){K(f==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}K(`\uCC98\uBD84 \uAC70\uBD80: ${L.reason||""}`,"error",3e3)}}async function q(f){if(!r)return;let w=await r("worker-automation-toggle",{on:f,expected_revision:_e()});Z(w),w&&w.conflict&&await r("worker-automation-toggle",{on:f,expected_revision:_e()}).then(Z)}async function Q(f){if(!r||!f)return;let w=await r("worker-repo-operation-repair",{operation_id:f});if(Z(w),w&&w.ok===!1){K(`\uD574\uACB0 \uC138\uC158 \uAC70\uBD80: ${w.reason||""}`,"error",3e3);return}w&&w.ok===!0&&K("\uD574\uACB0 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4","success",2400)}async function ue(f){if(!r||!Number.isFinite(f))return;let w=Math.max(vn,Math.floor(f)),L=await r("worker-queue-set-slots",{slots:w,expected_revision:_e()});Z(L),L&&L.conflict&&await r("worker-queue-set-slots",{slots:w,expected_revision:_e()}).then(Z)}async function Ie(f){if(!r)return;let w=await r("worker-queue-set-pr-wait-hold",{on:f,expected_revision:_e()});Z(w),w&&w.conflict&&await r("worker-queue-set-pr-wait-hold",{on:f,expected_revision:_e()}).then(Z)}function Je(){let f=W(),w=h?h.selectBoardColumn(jp,"ready"):[],L=h?h.selectBoardColumn(zp,"blocked"):[],re=h?h.selectBoardColumn(Wp,"closed"):[],fe=h?h.selectBoardColumn(Hp,"in_progress"):[],be=new Map;for(let g of fe){let B=lf(g);if(!B)continue;let te=be.get(B);te?te.push(g):be.set(B,[g])}let ae=g=>{let B=On(be.get(g)||[]);return B?B.title||B.id:null},ie=f.bead_titles||{},Le=new Map;for(let[g,B]of Object.entries(ie))typeof B=="string"&&B.length>0&&Le.set(g,B);for(let g of[...w,...L])Le.set(g.id,g.title||g.id);me.clear();let ct=f.bead_times&&typeof f.bead_times=="object"&&!Array.isArray(f.bead_times)?f.bead_times:{},_t=f.bead_labels&&typeof f.bead_labels=="object"&&!Array.isArray(f.bead_labels)?f.bead_labels:{};for(let[g,B]of Object.entries(_t))Array.isArray(B)&&me.set(g,bn(B));for(let g of[...w,...L]){let B=g.labels;if(!Array.isArray(B))continue;if(!me.has(g.id)){me.set(g.id,bn(B));continue}let te=ct[g.id],Ye=Zt(te&&typeof te=="object"?te.updated_at:null),zt=Zt(g.updated_at);zt!==null&&Ye!==null&&zt>Ye&&me.set(g.id,bn(B))}let St=new Map;for(let[g,B]of Object.entries(ct))B&&typeof B=="object"&&St.set(g,B);for(let g of[...w,...L])St.set(g.id,{created_at:g.created_at,updated_at:g.updated_at});let yt=g=>St.get(g)||{},le=f.pr_wait||[],v=f.pr_observations||{},z=f.pr_activity||{},ee=f.cleanup_failed||{},qe=Object.entries(ee).map(([g,B])=>({bead_id:g,step:B&&B.step?B.step:"",reason:B&&B.reason?B.reason:"",detail:B&&typeof B.detail=="string"?B.detail:null,output_tail:B&&typeof B.output_tail=="string"&&B.output_tail?B.output_tail:void 0,log_path:B&&typeof B.log_path=="string"&&B.log_path?B.log_path:void 0,retry_count:B&&typeof B.retry_count=="number"&&Number.isInteger(B.retry_count)&&B.retry_count>0?B.retry_count:0})),Xe=f.queue||[],de=new Set(Xe.map(g=>g.bead_id));for(let g of oe)de.has(g)||oe.delete(g);let _=new Set([...Xe.map(g=>g.bead_id),...le.map(g=>g.bead_id),...f.done.map(g=>g.bead_id)]),d=new Set(L.map(g=>g.id)),k=i?i.get()?.order||{}:{},y=new Set,M=[];for(let g of[...w,...L])_.has(g.id)||y.has(g.id)||af(g)||Al(g.labels)||(y.add(g.id),M.push(g));E=of(M,x,k);let J=f.admission||{},xe=g=>{let B=J[g];if(!B)return"";if(B.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let te=typeof B.reason=="string"?B.reason:"",Ye=te.indexOf(":");return Ye>0&&Ye<te.length-1?`\u26D4 ${te.slice(0,Ye)} (${te.slice(Ye+1)})`:`\u26D4 ${te}`},gt=E.map(g=>{let B=pn(g),te=B.path.length>0,Ye=g.workflow?.route==="quick_fix"||g.metadata&&g.metadata.route==="quick_fix",zt=!Ye&&te&&!B.conflict,ar=d.has(g.id),Lt=[];ar&&Lt.push(cf(g)),Ye?Lt.push("quick_fix \xB7 \uC6CC\uCEE4 \uBE44\uB300\uC0C1"):B.conflict?Lt.push("spec_id_conflict"):te||Lt.push("spec \uC5C6\uC74C");let An=xe(g.id);return An&&Lt.push(An),{id:g.id,title:g.title||g.id,reason:Lt.join(" \xB7 "),draggable:zt,lane:"candidate",created_at:g.created_at,updated_at:g.updated_at,workflow:g.workflow,is_quick_fix:Ye,status:g.status,blocked:ar,has_spec:te}}),Be=Kp(gt,F),or=Be.visible,ls=f.revise_parked||{},zr=f.discard_operations&&typeof f.discard_operations=="object"&&!Array.isArray(f.discard_operations)?f.discard_operations:{},To=(g,B)=>g.map(te=>{let Ye=B==="queue"?ls[te.bead_id]:null,zt=B==="queue"?Gt(zr,te.bead_id):null,ar=zt?.operation?zt:null,Lt=B==="queue"?me.has(te.bead_id)?me.get(te.bead_id)||!1:null:!1,An=Lt===!0&&(Object.values(f.attempts||{}).some(Vt=>Vt&&Vt.bead_id!==te.bead_id&&!Gp.has(Vt.status))||le.some(Vt=>Vt.bead_id!==te.bead_id)||Object.values(zr).some(Vt=>Vt&&Vt.bead_id!==te.bead_id&&Vt.phase!=="done")),Go=B==="done"?[]:[xe(te.bead_id)];return An&&Go.unshift("\uB2E4\uB978 \uC791\uC5C5 \uC885\uB8CC \uB300\uAE30 \xB7 \uBA38\uC9C0\uAE4C\uC9C0 \uB2E8\uB3C5"),{id:te.bead_id,title:Le.get(te.bead_id)||te.bead_id,reason:Go.filter(Boolean).join(" \xB7 "),draggable:B!=="done"&&!ar,done:B==="done",lane:B,selectable:B==="queue",selected:B==="queue"&&oe.has(te.bead_id),worker_serial:Lt,discard:ar,badges:Ye?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!Ye,revise_action:!!Ye,revise_enabled:!!Ye&&!ar&&!R.has(te.bead_id),revise_title:Ye?Ye.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${Ye.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":"",usage:B==="done"?Dt(f.attempts||{},te.bead_id):null,done_at:B==="done"&&typeof te.added_at=="number"?te.added_at:void 0,...yt(te.bead_id)}}),Eo=new Map;for(let g of f.done)g&&typeof g.bead_id=="string"&&typeof g.added_at=="number"&&Eo.set(g.bead_id,g.added_at);let Hr=f.attempts?Object.values(f.attempts):[],cs=new Set;for(let g of Hr)g&&typeof g.resumed_from=="string"&&g.resumed_from.length>0&&cs.add(g.resumed_from);let ds=new Map;for(let g of Hr)ds.set(g.bead_id,g.attempt_id);let us=new Map;for(let g of Hr)us.set(g.attempt_id,g);function ps(g){let B=new Set,te=g;for(;te&&!B.has(te.attempt_id);){if(te.conflict_resolution===!0)return!0;B.add(te.attempt_id),te=typeof te.resumed_from=="string"&&te.resumed_from.length>0&&us.get(te.resumed_from)||null}return!1}let wn=typeof f.declared_base=="string"?f.declared_base:null;function Wl(g){let B=null;for(let te of Hr)!te||te.bead_id!==g||ps(te)||(B===null||(typeof te.started_at=="number"?te.started_at:0)>=(typeof B.started_at=="number"?B.started_at:0))&&(B=te);return B&&typeof B.target_base=="string"?B.target_base:null}let Co=[],Ro=[],Gl=g=>{let B=ds.get(g.bead_id)!==g.attempt_id,te=Eo.get(g.bead_id),Ye=typeof te=="number"&&te>0&&typeof g.finished_at=="number"&&te>=g.finished_at;return!B&&!Ye&&typeof g.dismissed_at!="number"},Io=g=>{let B=typeof g.session_id=="string"&&g.session_id.length>0,te=cs.has(g.attempt_id);return{eligible:B&&!te,reason:B?te?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}},Pt=null;for(let g of Hr){let B=g.status==="paused"&&!cs.has(g.attempt_id);if(g.status==="running"||B)Ro.push({bead_id:g.bead_id,attempt_id:g.attempt_id,title:Le.get(g.bead_id)||g.bead_id,runner:g.runner||null,model:g.model||null,effort:g.effort||null,speed:g.speed||null,continuation_mode:g.continuation_mode||null,started_at:typeof g.started_at=="number"?g.started_at:null,resumed_from:g.resumed_from||null,paused:B,conflict_resolution:ps(g),base_exception:ko(wn,g.target_base),can_pause:typeof g.session_id=="string"&&g.session_id.length>0,discard:Gt(zr,g.bead_id,{attempt_id:g.attempt_id}),usage:Dt(f.attempts||{},g.bead_id),current_child:ae(g.bead_id),...yt(g.bead_id)});else if((g.status==="failed"||g.status==="orphaned")&&Gl(g)){let te=Io(g);Co.push({bead_id:g.bead_id,attempt_id:g.attempt_id,title:Le.get(g.bead_id)||g.bead_id,runner:g.runner||null,model:g.model||null,effort:g.effort||null,speed:g.speed||null,continuation_mode:g.continuation_mode||null,started_at:typeof g.started_at=="number"?g.started_at:null,resumed_from:g.resumed_from||null,failed:!0,status:g.status,status_label:g.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328",discard:Gt(zr,g.bead_id,{attempt_id:g.attempt_id}),resume_eligible:te.eligible,resume_reason:te.reason,conflict_resolution:ps(g),base_exception:ko(wn,g.target_base),usage:Dt(f.attempts||{},g.bead_id),current_child:ae(g.bead_id),...yt(g.bead_id)}),Pt=g}}let kn=[...Co,...Ro],Lo=null;if(Pt){let g=Io(Pt),B=Pt.cause_detail;Lo={bead_id:Pt.bead_id,repo:Pt.repo||"",reason:Pt.cause||Pt.status,cause_detail:B&&typeof B.reason=="string"?{reason:B.reason,command:typeof B.command=="string"?B.command:null}:null,resume_attempt_id:Pt.attempt_id,resume_eligible:g.eligible,resume_reason:g.reason,discard:Gt(zr,Pt.bead_id,{attempt_id:Pt.attempt_id})}}let Yl=new Set(kn.map(g=>g.bead_id)),fs=Array.isArray(f.merge_queue)?f.merge_queue:[],Oo=new Map,Do=new Map,Mo=new Map;fs.forEach((g,B)=>{g&&typeof g.bead_id=="string"&&(Oo.set(g.bead_id,B+1),Do.set(g.bead_id,g.resolution),Mo.set(g.bead_id,g.continuation_action||null))});let Po=f.merge_queue_state||{active:null,failures:{}},Vl=Po.failures||{},Kl=f.auto_merge_skips||{},No=g=>{let B=Kl[g];if(!B)return null;let te=v[g],Ye=te&&te.pr?te.pr.head_sha:null;return Ye&&Ye===B.head_sha?B.reason||"":null},$n=new Map;for(let g of kn)g.failed!==!0&&g.conflict_resolution&&(g.paused?$n.has(g.bead_id)||$n.set(g.bead_id,"paused"):$n.set(g.bead_id,"running"));let Fo=kn.filter(g=>!g.paused&&g.failed!==!0).length,qo=(f.workspace_info||{}).slots,Zl=typeof qo=="number"?qo:typeof f.slots=="number"?f.slots:vn,Bo=f.pr_wait_holds_slot===!0?vn:Zl,Xl=Fo>Bo,xn=kr(G),Ql=(Array.isArray(f.done)?f.done.slice():[]).filter(g=>xn===void 0||typeof g.added_at!="number"||g.added_at>=xn).sort((g,B)=>(B.added_at||0)-(g.added_at||0)),Wr=To(Ql,"done"),Jl=new Set((Array.isArray(f.done)?f.done:[]).map(g=>g?.bead_id).filter(g=>typeof g=="string")),Uo=[],ec=u?.()||"";for(let g of re){let B=Zt(g.closed_at);if(typeof g.id!="string"||Jl.has(g.id)||B===null||xn!==void 0&&B<xn||typeof g.comment_count!="number"||g.comment_count<=0)continue;let te=`${ec}\0${g.id}\0${String(g.updated_at)}\0${g.comment_count}`,Ye=X.get(te);Ye===void 0&&r&&(X.set(te,"pending"),Promise.resolve(r("get-comments",{id:g.id})).then(zt=>{let ar=Array.isArray(zt)&&zt.some(Lt=>ts(typeof Lt?.text=="string"?Lt.text:"")?.lane==="session");X.set(te,ar?"session":"not-session"),Me()}).catch(()=>{X.set(te,"failed"),Me()})),Ye==="session"&&Uo.push({id:g.id,title:g.title||g.id,reason:"",draggable:!1,done:!0,lane:"done",selectable:!1,selected:!1,worker_serial:!1,badges:["\uC138\uC158 \uC791\uC5C5"],alert:!1,usage:null,done_at:B,created_at:g.created_at,updated_at:g.updated_at})}Wr.push(...Uo),Wr.sort((g,B)=>(B.done_at||0)-(g.done_at||0));let Sn={};for(let g of Qt)Sn[g]=0;let jo=!1,zo=0,_s=0,Ho=0;for(let g of Wr){let B=g.usage;if(B&&typeof B=="object"){let te=!1;for(let Ye of Qt)Number.isFinite(B[Ye])&&(Sn[Ye]+=B[Ye],jo=!0,te=!0);te&&(_s+=1,Number.isFinite(B.total_cost_usd)&&(zo+=B.total_cost_usd,Ho+=1))}}_s>0&&Ho===_s&&(Sn.total_cost_usd=zo);let Wo=Wr.map(g=>g.usage).filter(g=>g&&typeof g=="object"&&g.providers),tc=Wo.length>0?ht(Bn(Wo)):jo?Ft(Sn):null;return{queue:f,idToTitle:Le,candidates:or,candidate_hidden:{blocked:Be.hidden_blocked,spec:Be.hidden_spec},running:kn,live_count:Fo,slots:Bo,over_cap:Xl,failure:Lo,waiting:To(Xe.filter(g=>!Yl.has(g.bead_id)),"queue"),pr_wait:le.map(g=>hf(g.bead_id,Le.get(g.bead_id)||g.bead_id,v,ee[g.bead_id]||null,Dt(f.attempts||{},g.bead_id),z[g.bead_id]||(U.has(g.bead_id)?{activity:null,merge_progress:{step:"merging"}}:null),$n.get(g.bead_id)||null,g.external===!0,{position:Oo.get(g.bead_id)||0,active:Po.active===g.bead_id,failure:Vl[g.bead_id]||null,resolution:Do.get(g.bead_id),continuation_action:Mo.get(g.bead_id)},g.wt_present!==!1,f.auto_merge===!0?No(g.bead_id):null,ko(wn,Wl(g.bead_id)),f.completion_status&&typeof f.completion_status=="object"&&!Array.isArray(f.completion_status)&&f.completion_status[g.bead_id]||null,f.discard_operations&&typeof f.discard_operations=="object"&&!Array.isArray(f.discard_operations)?f.discard_operations:{},us.get(ds.get(g.bead_id)||"")?.worker_serial===!0)).map(g=>({...g,...yt(g.id)})),merge_queue_length:fs.length,merge_queue_running:fs.length>0,auto_excluded:le.map(g=>g.bead_id).filter(g=>No(g)!==null),verify_cmd_present:!!(f.workspace_info||{}).verify_cmd,declared_base:wn,done:Wr,token_total:tc,cleanup_failures:qe,repo_operations:Array.isArray(f.repo_operations)?f.repo_operations:[]}}function He(f){let w=f.waiting.length>0?f.waiting[0].id:"\u2014",L=c`<button
      type="button"
      class="worker-play${f.queue.auto_advance?" is-active":""}"
    >
      ${f.queue.auto_advance?"\u23F8 \uC790\uB3D9\uD654 \uBA48\uCDA4":"\u25B6 \uC790\uB3D9\uD654"}
    </button>`,re=lt(f),fe=f.over_cap?c`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",be=c`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${f.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${f.pr_wait.length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${I()} 완료 <b>${f.done.length}</b></span
      >`,ae=c`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${f.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${f.declared_base||"?"}</span
    >`,ie=c`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${vn}
          step="1"
          .value=${String(f.slots)}
          ?disabled=${f.queue.pr_wait_holds_slot===!0}
          title=${f.queue.pr_wait_holds_slot===!0?"\uBA38\uC9C0\uAE4C\uC9C0 \uC21C\uCC28 \uC2E4\uD589 \uC911 \u2014 \uD574\uC81C\uD558\uBA74 \uC800\uC7A5\uB41C \uB3D9\uC2DC \uC2E4\uD589 \uC218\uB85C \uB3CC\uC544\uAC11\uB2C8\uB2E4":"\uB3D9\uC2DC\uC5D0 \uC2E4\uD589\uD560 \uC138\uC158 \uC218 (\uCD5C\uC18C 1 = \uC21C\uCC28 \uC2E4\uD589)"}
      /></label>
      <label
        class="worker-tgl"
        title="각 이슈가 PR 머지·정리를 마칠 때까지 다음 이슈를 시작하지 않습니다"
      >
        <input
          type="checkbox"
          class="worker-pr-wait-hold"
          .checked=${f.queue.pr_wait_holds_slot===!0}
        />
        머지까지 순차 실행
      </label>
      <button
        type="button"
        class="worker-exec-defaults-btn"
        aria-haspopup="dialog"
        aria-label="전역 실행 설정"
        title="전역 실행 설정"
      >
        ⚙
      </button>`,Le=Ji({failure:f.failure,cleanupFailures:f.cleanup_failures}),ct=Zi(f.repo_operations);return A?c`<div class="worker-ribbon">
          ${L} ${re}
          <div class="worker-kpi worker-kpi--ribbon">${fe}${be}</div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${ie}</div>
          <div class="worker-kpi">${ae}</div>
        </div>
        ${ct}${Le}`:c`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${L}${re}${ie}</div>
        <div class="worker-kpi">
          ${fe}${be}${ae}
          ${(Array.isArray(f.token_total)?f.token_total:f.token_total?[{label:f.token_total,tooltip:`${I()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(_t=>c`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${_t.tooltip}
                >${I()} 완료 · 누적 ${_t.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${w}</b></span
          >
        </div>
      </div>
      ${ct}${Le}`}function dt(f){if(f.running.length===0&&f.pr_wait.length===0)return"";let w=f.running.some(L=>!L.paused&&L.failed!==!0);return c`<section
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
          >${f.running.length+f.pr_wait.length}</span
        >
      </header>
      ${f.running.length>0?fo(f.running,Date.now(),ve):""}
      ${f.pr_wait.map(L=>uo(L))}
    </section>`}function it(f){let w=f.candidate_hidden;return c`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${F.show_blocked}
        />
        🔒 blocked${w.blocked>0?` ${w.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${Zp.map(L=>c`<button
              type="button"
              class="worker-filter__chip${F.spec===L.value?" is-active":""}"
              data-spec=${L.value}
              aria-pressed=${F.spec===L.value?"true":"false"}
            >
              ${L.label}
            </button>`)}
        ${w.spec>0?c`<span class="worker-filter__hidden">숨김 ${w.spec}</span>`:""}
      </div>
    </div>`}function ot(){return c`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${x}
    >
      ${Xp.map(f=>c`<option value=${f.value} ?selected=${x===f.value}>
            ${f.label}
          </option>`)}
    </select>`}function vt(){return c`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${G}
      >
        ${Ht.map(f=>c`<option value=${f.value} ?selected=${G===f.value}>
              ${f.label}
            </option>`)}
      </select>
    </div>`}function It(){if(oe.size===0)return"";let f=Array.from(oe),w=f.some(L=>{let re=me.get(L);return re!==!0&&re!==!1});return c`<div
      class="worker-bulk"
      role="group"
      aria-label="실행 방식 일괄 변경"
    >
      <span class="worker-bulk__count">${f.length}개 선택</span>
      <select
        class="worker-bulk__mode"
        aria-label="실행 방식"
        .value=${Ce}
        ?disabled=${ne}
      >
        <option value="ordinary">일반 병렬</option>
        <option value="serial">🔒 머지까지 단독</option>
      </select>
      <button
        type="button"
        class="worker-bulk__apply"
        ?disabled=${w||ne}
        title=${w?"\uC120\uD0DD\uD55C \uC791\uC5C5\uC758 \uC2E4\uD589 \uBC29\uC2DD\uC744 \uD655\uC778\uD558\uB294 \uC911\uC785\uB2C8\uB2E4":ne?"\uC2E4\uD589 \uBC29\uC2DD \uBCC0\uACBD \uC911\uC785\uB2C8\uB2E4":"\uC120\uD0DD\uD55C \uC791\uC5C5\uC5D0 \uC801\uC6A9"}
      >
        적용
      </button>
      <span class="worker-bulk__hint">선택한 대기 작업에만 적용됩니다</span>
    </div>`}function rt(f){let w=(f.queue.pr_wait||[]).filter(be=>be&&be.external!==!0&&typeof be.bead_id=="string"),L=new Set(f.running.filter(be=>!be.paused&&be.failed!==!0).map(be=>be.bead_id));for(let be of w)L.add(be.bead_id);let re=!(f.queue.pr_wait_holds_slot!==!0||f.queue.auto_advance!==!0||f.queue.auto_merge===!0||w.length===0||f.waiting.length===0||L.size<f.slots),fe=f.pr_wait.some(be=>be.worker_serial===!0);if(!(!re&&!(fe&&f.queue.auto_merge!==!0)))return c`${re?c`<div class="worker-stat worker-pr-wait-hint">
          PR 머지 대기 중 — 다음 이슈는 머지·정리 완료 후 시작됩니다 (자동 머지
          꺼짐)
        </div>`:""}${fe&&f.queue.auto_merge!==!0?c`<div
          class="worker-stat worker-pr-wait-hint worker-pr-wait-hint--serial"
        >
          단독 실행 작업의 PR 머지·정리가 끝날 때까지 다음 작업이 시작되지
          않습니다 (자동 머지 꺼짐)
        </div>`:""}`}function lt(f){let w=f.queue.auto_merge===!0;if(f.merge_queue_running)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop${w?" is-active":""}"
        title=${w?"\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB044\uACE0 \uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)":"\uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)"}
      >
        ${w?"\u23F8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8":"\uC77C\uAD04 \uBA38\uC9C0 \uC911\uB2E8"} ${f.merge_queue_length}
      </button>`;if(w)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop is-active"
        title="자동 머지 켜짐 — 자격이 생기는 PR을 계속 큐에 넣습니다. 클릭하면 끕니다"
      >
        ⏸ 자동 머지
      </button>`;let L=new Set(f.auto_excluded),re=f.pr_wait.filter(fe=>fe.merge_action&&fe.merge_enabled&&!L.has(fe.id)).length;return c`<button
      type="button"
      class="worker-merge-all"
      title=${f.verify_cmd_present?"\uCF1C \uB450\uBA74 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uCDA9\uB3CC \uD574\uC18C\xB7\uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uCF1C \uB450\uBA74 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uCDA9\uB3CC \uD574\uC18C\xB7\uBA38\uC9C0\uD569\uB2C8\uB2E4 \u2014 \uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uB294 verify \uC120\uC5B8\uC774 \uC5C6\uC5B4 \uCD94\uAC00 \uAC80\uC99D \uC5C6\uC774 \uBA38\uC9C0\uB429\uB2C8\uB2E4"}
    >
      ▶ 자동 머지${re>0?` ${re}`:""}
    </button>`}function nt(f){let w=Yt({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:f.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:ot(),controls:it(f)});return A?c`<div class="worker-lanes worker-lanes--mobile">
        ${dt(f)}
        ${Yt({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:f.waiting,empty:"\uB4DC\uB798\uADF8 \uB610\uB294 [\uB300\uAE30\uB85C \u21B4]\uB85C \uBC30\uCE58",controls:c`${It()}${rt(f)}`,collapsible:!0,collapsed:O.queue,preview:El(f.waiting)})}
        ${w}
        ${Yt({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:f.done,empty:`${I()} \uC644\uB8CC \uC5C6\uC74C`,controls:vt(),collapsible:!0,collapsed:O.done,preview:Array.isArray(f.token_total)?f.token_total.map(L=>L.label).join(" \xB7 "):f.token_total||El(f.done)})}
      </div>`:c`<div class="worker-lanes">
      ${w}
      ${Yt({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:f.waiting,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58",controls:c`${It()}${rt(f)}`})}
      ${Yt({id:"worker-pane-running",lane:"running",title:`\uC2E4\uD589 \uC911 \xB7 \uC2AC\uB86F ${f.slots}`,items:f.running,live:f.running.some(L=>!L.paused&&L.failed!==!0),body:fo(f.running,Date.now(),ve)})}
      ${Yt({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:f.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C"})}
      ${Yt({id:"worker-pane-done",lane:"done",title:`\uC644\uB8CC \xB7 ${I()} ${f.done.length}`,items:f.done,empty:`${I()} \uC644\uB8CC \uC5C6\uC74C`,controls:vt()})}
    </div>`}function ut(f){O={...O,[f]:!O[f]},sf(O),Me()}function Me(){let f=Je();je(He(f),st),je(nt(f),ge)}function N(){let f=document.querySelector(".app-header");if(!f)return;let w=()=>{let L=Math.round(f.getBoundingClientRect().height);Ve.style.setProperty("--worker-ribbon-top",`${L}px`)};if(w(),typeof ResizeObserver=="function"){let L=new ResizeObserver(w);L.observe(f),Oe.push(()=>L.disconnect())}else window.addEventListener("resize",w),Oe.push(()=>window.removeEventListener("resize",w))}function Y(){if(typeof window.matchMedia!="function")return;let f=window.matchMedia(rf);A=!!f.matches;let w=L=>{let re=!!(L&&typeof L.matches=="boolean"?L.matches:f.matches);re!==A&&(A=re,Me())};typeof f.addEventListener=="function"?(f.addEventListener("change",w),Oe.push(()=>f.removeEventListener("change",w))):typeof f.addListener=="function"&&(f.addListener(w),Oe.push(()=>f.removeListener(w)))}function se(f){let w=f.target,L=w?.closest?.(".worker-mini__grip"),re=L?L.closest('.worker-mini[data-lane="queue"]'):w?.closest?.('.worker-card[draggable="true"]');if(!re)return;let fe=re.dataset.beadId||"",be=re.dataset.lane||"";$={bead_id:fe,from_lane:be};try{f.dataTransfer?.setData("text/plain",fe),f.dataTransfer&&(f.dataTransfer.effectAllowed="move")}catch{}}function pe(f){let w=f.target?.closest?.(".worker-pane");if(!w)return;let L=w.dataset.lane||"";L!=="candidate"&&L!=="queue"||(f.preventDefault(),f.dataTransfer&&(f.dataTransfer.dropEffect="move"),w.classList.add("worker-pane--drag-over"))}function $e(f){f.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function Ee(f,w){let L=E.find(ae=>ae.id===f);if(!L)return;let re=E.filter(ae=>ae.id!==f),fe=re.length;if(w){let ae=w.dataset.beadId;if(ae===f)return;let ie=re.findIndex(Le=>Le.id===ae);ie>=0&&(fe=ie)}let be=re.slice();be.splice(fe,0,L),T.applyReorder(f,be,fe)}function Ge(f){let w=f.target?.closest?.(".worker-pane");if(!w)return;f.preventDefault(),w.classList.remove("worker-pane--drag-over");let L=w.dataset.lane||"",re=$?.bead_id||f.dataTransfer?.getData("text/plain")||"",fe=$?.from_lane||"";if($=null,!re)return;let be=f.target?.closest?.(".worker-mini, .worker-card"),ae=Array.from(w.querySelectorAll(".worker-mini, .worker-card")),ie=ae.length;if(be){let Le=ae.indexOf(be);Le>=0&&(ie=Le)}if(w.classList.contains("worker-pane--collapsed")&&(ie=ye()),L==="candidate"){if(fe==="candidate"){Ee(re,be);return}fe==="queue"&&ce(re);return}L==="queue"&&(fe==="queue"?P(re,ie):j(re,ie))}function et(f){F=f,Vp(f),Me()}function Te(f){x=f==="board"||f==="created"||f==="spec"?f:is,Jp(x),Me()}function Ke(f){G=Ot(f)?f:Et,tf(G),m?.(G),Me()}function Se(f){let w=f.target?.closest?.(".worker-mini__select");if(w){let ct=w.dataset.beadId||"";ct&&(w.checked?oe.add(ct):oe.delete(ct),Me());return}let L=f.target?.closest?.(".worker-bulk__mode");if(L){Ce=L.value==="serial"?"serial":"ordinary";return}let re=f.target?.closest?.(".worker-filter__blocked");if(re){et({...F,show_blocked:re.checked});return}let fe=f.target?.closest?.(".worker-done-range");if(fe){Ke(fe.value);return}let be=f.target?.closest?.(".worker-sort");if(be){Te(be.value||is);return}let ae=f.target?.closest?.(".worker-pr-wait-hold");if(ae){Ie(ae.checked);return}let ie=f.target?.closest?.(".worker-slots__input");if(!ie)return;let Le=Number.parseInt(ie.value,10);if(!Number.isFinite(Le)){Me();return}ue(Le).then(Me)}function ft(f){return f?{runner:f.runner||void 0,model:f.model||void 0,effort:f.effort||void 0,worktree:f.worktree||void 0,status:f.status||void 0,session_id:f.session_id||void 0}:{}}function bt(f){let w=W(),L=w.attempts?w.attempts[f]:null;ve=f,Pe.hidden=!1,he.open({attempt_id:f,meta:ft(L)}),Me()}function sr(){if(!ve)return;let f=W(),w=f.attempts?f.attempts[ve]:null;if(w){he.updateMeta(ft(w));return}he.close()}function jt(f){let w=f.target,L=w?.closest?.(".worker-bulk__apply");if(L){L.disabled||we();return}if(w?.closest?.(".worker-mini__select, .worker-mini__serial, .worker-mini__grip")||w?.closest?.("#worker-exec-defaults-dialog"))return;if(w?.closest?.(".worker-exec-defaults-btn")){V.open();return}let re=w?.closest?.(".worker-repo-op__session");if(re){let de=re.dataset.attemptId;de&&bt(de);return}let fe=w?.closest?.(".worker-repo-op__resolve");if(fe){Q(fe.dataset.operationId||"");return}let be=w?.closest?.(".worker-banner__resume");if(be){let de=be.dataset.attemptId;de&&Ue(de);return}let ae=w?.closest?.(".worker-banner__discard");if(ae){let de=ae.dataset.confirmation==="merged"?"merged":"unmerged";C(ae.dataset.beadId||"",ae.dataset.attemptId||null,de,ae.dataset.operationId||null);return}let ie=w?.closest?.(".worker-banner__dismiss");if(ie){let de=ie.dataset.attemptId;de&&Re(de);return}if(w?.closest?.(".worker-play")){q(!W().auto_advance);return}let Le=w?.closest?.(".worker-merge-all");if(Le){Le.classList.contains("worker-merge-all--stop")?W().auto_merge===!0?D(!1):S():D(!0);return}let ct=w?.closest?.(".worker-pane__hd--toggle");if(ct){let de=ct.dataset.lane;(de==="queue"||de==="done")&&ut(de);return}let _t=w?.closest?.(".worker-card__place");if(_t){let de=_t.dataset.beadId;de&&!_t.disabled&&j(de,ye());return}let St=w?.closest?.(".worker-filter__chip");if(St){let de=St.dataset.spec;(de==="all"||de==="with"||de==="without")&&et({...F,spec:de});return}let yt=w?.closest?.(".worker-mini__merge");if(yt){Ne(yt.dataset.beadId||"");return}let le=w?.closest?.(".worker-mini__merge-cancel");if(le){b(le.dataset.beadId||"");return}let v=w?.closest?.(".worker-mini__discard");if(v){C(v.dataset.beadId||"",v.dataset.attemptId||null,v.dataset.discardMode==="merged"?"merged":"unmerged",v.dataset.operationId||null);return}let z=w?.closest?.(".worker-mini__revise-fix");if(z){H("worker-revise-fix",z.dataset.beadId||"");return}let ee=w?.closest?.(".worker-mini__revise-approve");if(ee){H("worker-revise-approve",ee.dataset.beadId||"");return}if(w?.closest?.(".worker-mini__pr"))return;if(w?.closest?.(".rtile__discard")){let de=w?.closest?.(".rtile"),_=de?.dataset?.beadId,d=de?.dataset?.attemptId;_&&C(_,d||null,"unmerged",w?.closest?.(".rtile__discard")?.dataset.operationId||null);return}if(w?.closest?.(".rtile__dismiss")){let _=w?.closest?.(".rtile")?.dataset?.attemptId;_&&Re(_);return}if(w?.closest?.(".rtile__pause")){let _=w?.closest?.(".rtile")?.dataset?.attemptId;_&&ke(_);return}if(w?.closest?.(".rtile__resume")){let _=w?.closest?.(".rtile")?.dataset?.attemptId;_&&Ue(_);return}if(w?.closest?.(".rtile__session")){let _=w?.closest?.(".rtile")?.dataset?.attemptId;_&&bt(_);return}if(w?.closest?.(".worker-drawer-overlay__backdrop")){he.close();return}if(w?.closest?.(".worker-drawer-host"))return;let qe=w?.closest?.(".rtile");if(qe){if(w?.closest?.(".rtile__id")){let _=qe.dataset.beadId;_&&Sr(_).then(d=>{d?K("\uBCF5\uC0AC\uB428","success",1200):K("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let de=qe.dataset.beadId;de&&l&&l(de);return}let Xe=w?.closest?.(".worker-mini, .worker-card");if(Xe){let de=Xe.dataset.beadId;if(w?.closest?.(".worker-mini__id, .worker-card__id")){de&&Sr(de).then(_=>{_?K("\uBCF5\uC0AC\uB428","success",1200):K("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}de&&l&&l(de)}}return e.addEventListener("dragstart",se),e.addEventListener("dragover",pe),e.addEventListener("dragleave",$e),e.addEventListener("drop",Ge),e.addEventListener("click",jt),e.addEventListener("change",Se),Y(),N(),h&&Oe.push(h.subscribe(()=>{for(let[f,w]of X)w==="failed"&&X.delete(f);Me()})),s&&Oe.push(s.subscribe(()=>{Me(),sr()})),Me(),{load(){Me()},openExecDefaults(){V.open()},destroy(){for(let f of Oe.splice(0))try{f()}catch{}e.removeEventListener("dragstart",se),e.removeEventListener("dragover",pe),e.removeEventListener("dragleave",$e),e.removeEventListener("drop",Ge),e.removeEventListener("click",jt),e.removeEventListener("change",Se);try{he.destroy()}catch{}Pe.hidden=!0;try{V.destroy()}catch{}je(c``,e)}}}function xo(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function Dl(e,t,r,n=async()=>{},s=async()=>{}){let o=at("views:workspace-picker"),a=null,i=!1,l=!1,u=!1;async function p(A){let R=A.target.value,Ce=t.getState().workspace?.current?.path||"";if(R&&R!==Ce){o("switching workspace to %s",R),i=!0,O();try{await r(R)}catch(ne){o("workspace switch failed: %o",ne)}finally{i=!1,O()}}}async function m(){let A=t.getState(),U=A.workspace?.current?.path||A.workspace?.available?.[0]?.path||"";if(!(!U||l)){o("git-pulling workspace %s",U),l=!0,O();try{await n(U)}catch(R){o("workspace git pull failed: %o",R)}finally{l=!1,O()}}}function h(A){let U=A.target;U&&e.contains(U)||E()}function T(A){A.key==="Escape"&&E()}function $(){u||(u=!0,document.addEventListener("mousedown",h),document.addEventListener("keydown",T),O())}function E(){u&&(u=!1,document.removeEventListener("mousedown",h),document.removeEventListener("keydown",T),O())}function F(){u?E():$()}async function x(A){let U=A.target,R=U.value,oe=U.checked;o("toggling visibility %s \u2192 %s",R,String(oe));try{await s(R,oe)}catch(Ce){o("workspace visibility toggle failed: %o",Ce)}}function G(A){return A?c`
      <button
        type="button"
        class="workspace-picker__git-pull-button"
        @click=${m}
        ?disabled=${i||l}
        aria-label="Git Pull"
        title="Git Pull"
      >
        <span aria-hidden="true">⬇</span>
      </button>
    `:c``}function X(A,U){return c`
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
        ${u?c`
              <div
                class="workspace-picker__manage-popover"
                role="menu"
                aria-label="프로젝트 표시 선택"
              >
                ${A.map(R=>c`
                    <label
                      class="workspace-picker__manage-row"
                      title="${R.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${R.path}"
                        .checked=${!U.has(R.path)}
                        @change=${x}
                      />
                      <span class="workspace-picker__manage-name"
                        >${xo(R.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function I(){let A=t.getState(),U=A.workspace?.current,R=A.workspace?.available||[],oe=new Set(A.workspace?.hidden||[]),Ce=U?.path||R[0]?.path||"";if(R.length===0)return c``;let ne=R.filter(me=>!oe.has(me.path)||me.path===Ce);if(ne.length<=1){let me=ne[0]||R[0],Oe=xo(me.path);return c`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${me.path}"
            >${Oe}</span
          >
          ${X(R,oe)}
          ${G(Ce)}
          ${l?c`<span
                class="workspace-picker__loading"
                aria-hidden="true"
              ></span>`:""}
        </div>
      `}return c`
      <div class="workspace-picker">
        <select
          class="workspace-picker__select"
          @change=${p}
          ?disabled=${i||l}
          aria-label="Select project workspace"
        >
          ${ne.map(me=>c`
              <option
                value="${me.path}"
                ?selected=${me.path===Ce}
                title="${me.path}"
              >
                ${xo(me.path)}
              </option>
            `)}
        </select>
        ${X(R,oe)}
        ${G(Ce)}
        ${i||l?c`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function O(){je(I(),e)}return O(),a=t.subscribe(()=>O()),{destroy(){a&&(a(),a=null),document.removeEventListener("mousedown",h),document.removeEventListener("keydown",T),je(c``,e)}}}var Ml=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-automation-toggle","worker-auto-repair-toggle","worker-repo-operation-repair","worker-queue-set-slots","worker-queue-set-pr-wait-hold","worker-queue-set-default-exec-preset","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-worker-system-prompt","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-exec-presets","unsubscribe-exec-presets","exec-presets-snapshot","exec-preset-create","exec-preset-update","exec-preset-delete","apply-exec-preset","monitor-auto-toggle"];function So(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function Pl(e,t,r=So()){return{id:r,type:e,payload:t}}function Nl(e={}){let t=at("ws"),r={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},n=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",a=0,i=null,l=!0,u=new Map,p=[],m=new Map,h=new Set;function T(I){for(let O of Array.from(h))try{O(I)}catch{}}function $(){if(!l||i)return;o="reconnecting",t("ws reconnecting\u2026"),T(o);let I=Math.min(r.maxMs||0,(r.initialMs||0)*Math.pow(r.factor||1,a)),O=(r.jitterRatio||0)*I,A=Math.max(0,Math.round(I+(Math.random()*2-1)*O));t("ws retry in %d ms (attempt %d)",A,a+1),i=setTimeout(()=>{i=null,X()},A)}function E(I){try{s?.send(JSON.stringify(I))}catch(O){t("ws send failed",O)}}function F(){for(o="open",t("ws open"),T(o),a=0;p.length;){let I=p.shift();I&&E(I)}}function x(I){let O;try{O=JSON.parse(String(I.data))}catch{t("ws received non-JSON message");return}if(!O||typeof O.id!="string"||typeof O.type!="string"){t("ws received invalid envelope");return}if(u.has(O.id)){let U=u.get(O.id);u.delete(O.id),O.ok?U?.resolve(O.payload):U?.reject(O.error||new Error("ws error"));return}let A=m.get(O.type);if(A&&A.size>0)for(let U of Array.from(A))try{U(O.payload)}catch(R){t("ws event handler error",R)}else t("ws received unhandled message type: %s",O.type)}function G(){o="closed",t("ws closed"),T(o);for(let[I,O]of u.entries())O.reject(new Error("ws disconnected")),u.delete(I);a+=1,$()}function X(){if(!l)return;let I=n();try{s=new WebSocket(I),t("ws connecting %s",I),o="connecting",T(o),s.addEventListener("open",F),s.addEventListener("message",x),s.addEventListener("error",()=>{}),s.addEventListener("close",G)}catch(O){t("ws connect failed %o",O),$()}}return X(),{send(I,O){if(!Ml.includes(I))return Promise.reject(new Error(`unknown message type: ${I}`));let A=So(),U=Pl(I,O,A);return t("send %s id=%s",I,A),new Promise((R,oe)=>{u.set(A,{resolve:R,reject:oe,type:I}),s&&s.readyState===s.OPEN?E(U):(t("queue %s id=%s (state=%s)",I,A,o),p.push(U))})},on(I,O){m.has(I)||m.set(I,new Set);let A=m.get(I);return A?.add(O),()=>{A?.delete(O)}},onConnection(I){return h.add(I),()=>{h.delete(I)}},reconnect(){l=!0,i&&(clearTimeout(i),i=null),a=0,X()},close(){l=!1,i&&(clearTimeout(i),i=null);try{s?.close()}catch{}},getState(){return o}}}function bf(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function vf(e,t){try{let n=await(await fetch("/api/config")).json();e.setState({config:n})}catch(r){t("config refresh failed",r)}}var Ao=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],Fl=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"],["tab:worker:closed","closed-issues"]],gr="tab:worker:closed",yf="bdui.worker.done-range",ql=gl,Bl="worker:queue",Ul="ui:order",jl="ui:display-policy",zl="exec:presets",hr="tab:board:closed",Hl="beads-ui.board.closed-range";function wf(e){let t=at("main");t("bootstrap start");let r=c`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;je(r,e);let n=document.getElementById("top-nav"),s=document.getElementById("usage-meter"),o=document.getElementById("board-root"),a=document.getElementById("worker-root"),i=document.getElementById("monitor-root"),l=document.getElementById("detail-panel");if(s&&Sl(s),o&&a&&i&&l){let Ae=function(_,d){let k="Request failed",y="";if(_&&typeof _=="object"){let J=_;if(typeof J.message=="string"&&J.message.length>0&&(k=J.message),typeof J.details=="string")y=J.details;else if(J.details&&typeof J.details=="object")try{y=JSON.stringify(J.details,null,2)}catch{y=""}}else typeof _=="string"&&_.length>0&&(k=_);let M=d&&d.length>0?`Failed to load ${d}`:"Request failed";De.open(M,k,y)},D=function(_){return`${ie.getState().workspace.current?.path||""}\0${_}`},b=function(){ce&&(ce().catch(()=>{}),ce=null),we=null,ke=null},C=function(_){Ue=_;let d=()=>{Ue!==_||ie.getState().selected_id!==_||(Ue=null,S(_))};if(!Ne){ze.then(d);return}d()},ue=function(_,d,k,y,M){return k!==Q[d]?(M().catch(()=>{}),!1):(_.set(y,M),!0)},Ie=function(){let _=ie.getState();ot(_.view==="board"),ut(_.view==="worker"),pe(_.view==="monitor"),N(_.view==="board"||_.view==="worker"||!!_.selected_id)},dt=function(){let _=kr(Je);return _===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:_}}},it=function(){let _=kr(He);return _===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:_}}},ot=function(_){if(_)for(let[d,k]of Ao){if(H.has(d)||q.has(d))continue;let y=d===hr?dt():{type:k};try{V.register(d,y)}catch(xe){t("register %s store failed: %o",d,xe)}q.add(d);let M=Q.board,J=!1;he.subscribeList(d,y).then(xe=>{J=!ue(H,"board",M,d,xe)}).catch(xe=>{t("subscribe %s failed: %o",d,xe),Ae(xe,"board")}).finally(()=>{q.delete(d),J&&Ie()})}else rt()},rt=function(){Q.board+=1;for(let[_]of Ao){let d=H.get(_);d&&(d().catch(()=>{}),H.delete(_));try{V.unregister(_)}catch(k){t("unregister %s failed: %o",_,k)}}},ut=function(_){if(!_){Me();return}for(let[d,k]of Fl){if(lt.has(d)||q.has(d))continue;let y=d===gr?it():{type:k};try{V.register(d,y)}catch(xe){t("register %s store failed: %o",d,xe)}q.add(d);let M=Q.worker,J=!1;he.subscribeList(d,y).then(xe=>{J=!ue(lt,"worker",M,d,xe)}).catch(xe=>{t("subscribe %s failed: %o",d,xe),Ae(xe,"worker")}).finally(()=>{q.delete(d),J&&Ie()})}},Me=function(){Q.worker+=1;for(let[_]of Fl){let d=lt.get(_);d&&(d().catch(()=>{}),lt.delete(_));try{V.unregister(_)}catch(k){t("unregister %s failed: %o",_,k)}}},N=function(_){if(!_){Y();return}nt||(ve("subscribe-worker-queue",{id:Bl}).catch(d=>{t("subscribe-worker-queue failed: %o",d)}),nt=()=>ve("unsubscribe-worker-queue",{id:Bl}))},Y=function(){nt&&(nt().catch(()=>{}),nt=null)},pe=function(_){if(!_){$e();return}se||(ve("subscribe-monitor-pipeline",{id:ql}).catch(d=>{t("subscribe-monitor-pipeline failed: %o",d)}),se=()=>ve("unsubscribe-monitor-pipeline",{id:ql}))},$e=function(){se&&(se().catch(()=>{}),se=null)},Ge=function(){Ee||(ve("subscribe-ui-order",{id:Ul}).catch(_=>{t("subscribe-ui-order failed: %o",_)}),Ee=()=>ve("unsubscribe-ui-order",{id:Ul}))},et=function(){Ee&&(Ee().catch(()=>{}),Ee=null),Z.clear()},Ke=function(){Te||(ve("subscribe-display-policy",{id:jl}).catch(_=>{t("subscribe-display-policy failed: %o",_)}),Te=()=>ve("unsubscribe-display-policy",{id:jl}))},Se=function(){Te&&(Te().catch(()=>{}),Te=null),ye.clear()},bt=function(){ft||(ve("subscribe-exec-presets",{id:zl}).catch(_=>{t("subscribe-exec-presets failed: %o",_)}),ft=()=>ve("unsubscribe-exec-presets",{id:zl}))},re=function(_){if(!_)return"Unknown";let d=_.split("/").filter(Boolean);return d.length>0?d[d.length-1]:"Unknown"};var u=Ae,p=D,m=b,h=C,T=ue,$=Ie,E=dt,F=it,x=ot,G=rt,X=ut,I=Me,O=N,A=Y,U=pe,R=$e,oe=Ge,Ce=et,ne=Ke,me=Se,Oe=bt,Ve=re;let st=document.getElementById("header-loading"),Pe=Ta(st),De=Vi(e),ge=Nl(),ve=Pe.wrapSend((_,d)=>ge.send(_,d)),he=ya(ve),V=wa(),W=$a(),_e=oa(),Z=ka(),ye=na(),j=sa(),P=aa();ge.on("exec-presets-snapshot",_=>{let d=_;d&&typeof d.revision=="number"&&Array.isArray(d.presets)&&j.set({revision:d.revision,presets:d.presets})}),ge.on("monitor-pipeline-snapshot",_=>{let d=_;if(!(!d||!Array.isArray(d.workspaces)))try{_e.set(d.workspaces,d.workspaces_state)}catch{}}),ge.on("ui-order-snapshot",_=>{let d=_;if(d&&typeof d.revision=="number")try{Z.set({revision:d.revision,order:d.order&&typeof d.order=="object"?d.order:{}})}catch{}}),ge.on("display-policy-snapshot",_=>{let d=_;if(d&&d.policy&&typeof d.policy=="object")try{ye.set(d.policy)}catch{}}),ge.on("session-log-snapshot",_=>{let d=_;if(d&&typeof d.attempt_id=="string")try{P.set(d.attempt_id,Array.isArray(d.lines)?d.lines:[],typeof d.last_event_at=="number"?d.last_event_at:null)}catch{}}),ge.on("session-log-append",_=>{let d=_;if(d&&typeof d.attempt_id=="string")try{P.append(d.attempt_id,d.event)}catch{}}),ge.on("snapshot",_=>{let d=_,k=d&&typeof d.id=="string"?d.id:"",y=k?V.getStore(k):null;if(y&&d&&d.type==="snapshot")try{y.applyPush(d)}catch{}}),ge.on("upsert",_=>{let d=_,k=d&&typeof d.id=="string"?d.id:"",y=k?V.getStore(k):null;if(y&&d&&d.type==="upsert")try{y.applyPush(d)}catch{}}),ge.on("delete",_=>{let d=_,k=d&&typeof d.id=="string"?d.id:"",y=k?V.getStore(k):null;if(y&&d&&d.type==="delete")try{y.applyPush(d)}catch{}});let ce=null,we=null,ke=null,Ue=null,Re=()=>{},ze=new Promise(_=>{Re=()=>_(void 0)}),Ne=!1,tt=!1;async function S(_){let d=D(_);if(d===we||d===ke)return;ke=d;let k=`detail:${_}`,y={type:"issue-detail",params:{id:_}};try{V.register(k,y)}catch(M){t("register detail store failed: %o",M)}try{let M=await he.subscribeList(k,y);if(ie.getState().selected_id!==_||D(_)!==d){await M().catch(()=>{});return}ce&&await ce().catch(()=>{}),ce=M,we=d}catch(M){t("detail subscribe failed: %o",M),Ae(M,"issue details")}finally{ke===d&&(ke=null)}}let H=new Map,q=new Set,Q={board:0,worker:0},Je=Et;try{let _=window.localStorage.getItem(Hl);Ot(_)&&(Je=_)}catch{}let He=Et;try{let _=window.localStorage.getItem(yf);Ot(_)&&(He=_)}catch{}async function vt(_){if(!Ot(_)||_===Je)return;Je=_;try{window.localStorage.setItem(Hl,_)}catch{}let d=H.get(hr);if(!d)return;H.delete(hr),await d().catch(()=>{});let k=dt();try{V.register(hr,k)}catch(y){t("register %s store failed: %o",hr,y)}try{let y=await he.subscribeList(hr,k);H.set(hr,y)}catch(y){t("re-subscribe %s failed: %o",hr,y),Ae(y,"board")}}async function It(_){if(!Ot(_)||_===He)return;He=_;let d=lt.get(gr);if(!d)return;lt.delete(gr),await d().catch(()=>{});let k=it();try{V.register(gr,k)}catch(y){t("register %s store failed: %o",gr,y)}try{let y=await he.subscribeList(gr,k);lt.set(gr,y)}catch(y){t("re-subscribe %s failed: %o",gr,y),Ae(y,"worker")}}let lt=new Map,nt=null,se=null,Ee=null,Te=null,ft=null;async function sr(){Te=null,ye.clear(),ft=null,j.clear(),nt=null,se=null,H.clear(),lt.clear(),Q.board+=1,Q.worker+=1,bt();let _=ie.getState().workspace.current?.path;if(_)try{await ge.send("set-workspace",{path:_})}catch(k){t("workspace restore after reconnect failed: %o",k);return}Ke();let d=ie.getState();ot(d.view==="board"),ut(d.view==="worker"),pe(d.view==="monitor"),N(d.view==="board"||d.view==="worker"||!!d.selected_id)}async function jt(){t("clearing all subscriptions for workspace switch"),rt(),Me(),Y(),W.clear(),et(),Ge(),Se(),Ke(),b();let _=ie.getState();if(_.selected_id)try{V.unregister(`detail:${_.selected_id}`)}catch{}let d=ie.getState();ot(d.view==="board"),ut(d.view==="worker"),pe(d.view==="monitor"),N(d.view==="board"||d.view==="worker"||!!d.selected_id),d.selected_id&&C(d.selected_id)}async function f(_){t("requesting workspace switch to %s",_),tt=!0;try{let d=await ge.send("set-workspace",{path:_});t("workspace switch result: %o",d),d&&d.workspace&&(ie.setState({workspace:{current:{path:d.workspace.root_dir,database:d.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",_),d.changed&&(await jt(),K("Switched to "+re(_),"success",2e3)))}catch(d){throw t("workspace switch failed: %o",d),K("Failed to switch workspace","error",3e3),d}finally{tt=!1}}async function w(_){t("requesting workspace git pull for %s",_);try{let d=await ge.send("git-pull-workspace",{});t("workspace git pull result: %o",d);let k=d?.status;if(k==="up_to_date"){K("Already up to date","success",2e3);return}if(k==="stash_pop_conflict"){K("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}K("Git pulled "+re(_),"success",2e3)}catch(d){t("workspace git pull failed: %o",d);let k=d?.code,y=d?.message;if(k==="rebase_conflict"){K("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(k==="rebase_conflict_abort_failed"){K("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(k==="busy"){K("Git pull skipped: another operation is running","warning",3e3);return}let M=y?`: ${y}`:"";throw K(`Git pull failed${M}`,"error",3e3),d}}async function L(_,d){t("setting workspace visibility %s \u2192 %s",_,String(d));try{await ge.send("set-workspace-visibility",{path:_,visible:d}),await fe()}catch(k){t("workspace visibility update failed: %o",k),K("Failed to update project visibility","error",3e3)}}async function fe(){try{let _=await ge.send("list-workspaces",{});if(t("workspaces loaded: %o",_),_&&Array.isArray(_.workspaces)){let d=_.workspaces.map(J=>({path:J.path,database:J.database,pid:J.pid,version:J.version})),k=_.current?{path:_.current.root_dir,database:_.current.db_path}:null,y=Array.isArray(_.hidden)?_.hidden.filter(J=>typeof J=="string"):[];ie.setState({workspace:{current:k,available:d,hidden:y}});let M=window.localStorage.getItem("beads-ui.workspace");M&&(!d.some(xe=>xe.path===M)||y.includes(M)?window.localStorage.removeItem("beads-ui.workspace"):k&&M!==k.path&&(t("restoring saved workspace preference: %s",M),await f(M)))}}catch(_){t("failed to load workspaces: %o",_)}}ge.on("workspace-changed",_=>{t("workspace-changed event: %o",_),_&&_.root_dir&&(ie.setState({workspace:{current:{path:_.root_dir,database:_.db_path}}}),fe(),jt())});let be=!1;if(typeof ge.onConnection=="function"){let _=d=>{t("ws state %s",d),d==="reconnecting"||d==="closed"?(be=!0,K("Connection lost. Reconnecting\u2026","error",4e3)):d==="open"&&be&&(be=!1,K("Reconnected","success",2200),vf(ie,(k,y)=>{t(`${k}: %o`,y)}),sr())};ge.onConnection(_)}let ae="board";try{let _=window.localStorage.getItem("beads-ui.view");(_==="board"||_==="worker"||_==="monitor")&&(ae=_)}catch(_){t("view parse error: %o",_)}let ie=Aa({config:bf(),view:ae});ge.on("worker-queue-snapshot",_=>{let d=_;if(!d||!d.queue)return;let k=ie.getState().workspace.current?.path;if(typeof k=="string"&&k.length>0&&d.root_dir!==k){t("dropping worker-queue snapshot for %s",String(d.root_dir));return}try{W.set(d.queue)}catch{}});let Le=xa(ie);Le.start();let ct=new Set(["get-comments","exec-preset-create","exec-preset-update","exec-preset-delete","apply-exec-preset"]),_t=async(_,d)=>{try{return await ve(_,d)}catch(k){if(ct.has(_))throw k;return[]}};n&&bl(n,ie,Le);let St=document.getElementById("workspace-picker");St&&Dl(St,ie,f,w,L);let yt=kl(e,(_,d)=>ve(_,d));try{let _=document.getElementById("new-issue-btn");_&&_.addEventListener("click",()=>yt.open())}catch{}let le=Yi(e,{policyStore:ye,transport:(_,d)=>ve(_,d),labelOptions:()=>{let _=new Set;for(let[d]of Ao)for(let k of V.snapshotFor(d)||[]){let y=k.labels;if(Array.isArray(y))for(let M of y)typeof M=="string"&&M.length>0&&_.add(M)}return Array.from(_).sort()}});try{let _=document.getElementById("display-settings-btn");_&&_.addEventListener("click",()=>le.open())}catch{}let v=Pa(o,{gotoIssue:_=>Le.gotoIssue(_),issueStores:V,transport:_t,workerQueueStore:W,uiOrderStore:Z,displayPolicyStore:ye,closedRange:Je,onClosedRangeChange:_=>{vt(_)},onNewIssue:()=>yt.open()}),z=$o(a,{transport:_t,issueStores:V,queueStore:W,execPresetStore:j,sessionLogStore:P,uiOrderStore:Z,gotoIssue:_=>ie.setState({selected_id:_}),getWorkspacePath:()=>ie.getState().workspace.current?.path,doneRange:He,onDoneRangeChange:_=>{It(_)}}),ee=hl(i,{transport:_t,pipelineStore:_e,execPresetStore:j,gotoIssue:_=>Le.gotoIssue(_),getWorkspacePath:()=>ie.getState().workspace.current?.path,switchWorkspace:_=>f(_)}),qe=Wi(l,{issueStores:V,transport:_t,queueStore:W,execPresetStore:j,sessionLogStore:P,getWorkspacePath:()=>ie.getState().workspace.current?.path,onNavigate:_=>{ie.getState().view==="worker"?ie.setState({selected_id:_}):Le.gotoIssue(_)},onClose:()=>{let _=ie.getState();ie.setState({selected_id:null});try{Le.gotoView(_.view==="worker"||_.view==="monitor"?_.view:"board")}catch{}},onOpenExecPresets:()=>{ie.setState({selected_id:null}),Le.gotoView("worker"),z.openExecDefaults()}}),Xe=ie.getState().selected_id;Xe&&(l.hidden=!1,qe.load(Xe),C(Xe)),ie.subscribe(_=>{let d=_.selected_id;d?(l.hidden=!1,qe.load(d),tt||C(d)):(qe.clear(),l.hidden=!0,b())});let de=_=>{o.hidden=_.view!=="board",a.hidden=_.view!=="worker",i.hidden=_.view!=="monitor",ot(_.view==="board"),ut(_.view==="worker"),pe(_.view==="monitor"),N(_.view==="board"||_.view==="worker"||!!_.selected_id),!_.selected_id&&_.view==="board"&&v.load(),_.view==="worker"&&z.load(),_.view==="monitor"?ee.load():ee.pause(),window.localStorage.setItem("beads-ui.view",_.view)};ie.subscribe(de),de(ie.getState()),Ge(),Ke(),bt(),fe().finally(()=>{Ne=!0,Re()}),window.addEventListener("keydown",_=>{let d=_.ctrlKey||_.metaKey,k=String(_.key||"").toLowerCase(),y=_.target,M=y&&y.tagName?String(y.tagName).toLowerCase():"",J=M==="input"||M==="textarea"||M==="select"||y&&typeof y.isContentEditable=="boolean"&&y.isContentEditable;d&&k==="n"&&(J||(_.preventDefault(),yt.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let r=window.localStorage.getItem("beads-ui.theme"),n=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=r==="dark"||r==="light"?r:n?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let r=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",r),window.localStorage.setItem("beads-ui.theme",r)});let t=document.getElementById("app");t&&wf(t)});export{wf as bootstrap,bf as readBootstrapConfig,vf as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
