var wi=Object.create;var $n=Object.defineProperty;var vi=Object.getOwnPropertyDescriptor;var ki=Object.getOwnPropertyNames;var yi=Object.getPrototypeOf,$i=Object.prototype.hasOwnProperty;var xi=(e,t,r)=>t in e?$n(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var xn=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var Si=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of ki(t))!$i.call(e,s)&&s!==r&&$n(e,s,{get:()=>t[s],enumerable:!(n=vi(t,s))||n.enumerable});return e};var Ai=(e,t,r)=>(r=e!=null?wi(yi(e)):{},Si(t||!e||!e.__esModule?$n(r,"default",{value:e,enumerable:!0}):r,e));var Ne=(e,t,r)=>xi(e,typeof t!="symbol"?t+"":t,r);var to=xn((Kd,eo)=>{var cr=1e3,dr=cr*60,ur=dr*60,Zt=ur*24,Li=Zt*7,Ii=Zt*365.25;eo.exports=function(e,t){t=t||{};var r=typeof e;if(r==="string"&&e.length>0)return Di(e);if(r==="number"&&isFinite(e))return t.long?Mi(e):Oi(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function Di(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var r=parseFloat(t[1]),n=(t[2]||"ms").toLowerCase();switch(n){case"years":case"year":case"yrs":case"yr":case"y":return r*Ii;case"weeks":case"week":case"w":return r*Li;case"days":case"day":case"d":return r*Zt;case"hours":case"hour":case"hrs":case"hr":case"h":return r*ur;case"minutes":case"minute":case"mins":case"min":case"m":return r*dr;case"seconds":case"second":case"secs":case"sec":case"s":return r*cr;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r;default:return}}}}function Oi(e){var t=Math.abs(e);return t>=Zt?Math.round(e/Zt)+"d":t>=ur?Math.round(e/ur)+"h":t>=dr?Math.round(e/dr)+"m":t>=cr?Math.round(e/cr)+"s":e+"ms"}function Mi(e){var t=Math.abs(e);return t>=Zt?Vr(e,t,Zt,"day"):t>=ur?Vr(e,t,ur,"hour"):t>=dr?Vr(e,t,dr,"minute"):t>=cr?Vr(e,t,cr,"second"):e+" ms"}function Vr(e,t,r,n){var s=t>=r*1.5;return Math.round(e/r)+" "+n+(s?"s":"")}});var no=xn((Zd,ro)=>{function Ni(e){r.debug=r,r.default=r,r.coerce=i,r.disable=a,r.enable=s,r.enabled=l,r.humanize=to(),r.destroy=d,Object.keys(e).forEach(f=>{r[f]=e[f]}),r.names=[],r.skips=[],r.formatters={};function t(f){let _=0;for(let m=0;m<f.length;m++)_=(_<<5)-_+f.charCodeAt(m),_|=0;return r.colors[Math.abs(_)%r.colors.length]}r.selectColor=t;function r(f){let _,m=null,$,x;function g(...R){if(!g.enabled)return;let H=g,W=Number(new Date),j=W-(_||W);H.diff=j,H.prev=_,H.curr=W,_=W,R[0]=r.coerce(R[0]),typeof R[0]!="string"&&R.unshift("%O");let P=0;R[0]=R[0].replace(/%([a-zA-Z%])/g,(S,O)=>{if(S==="%%")return"%";P++;let y=r.formatters[O];if(typeof y=="function"){let K=R[P];S=y.call(H,K),R.splice(P,1),P--}return S}),r.formatArgs.call(H,R),(H.log||r.log).apply(H,R)}return g.namespace=f,g.useColors=r.useColors(),g.color=r.selectColor(f),g.extend=n,g.destroy=r.destroy,Object.defineProperty(g,"enabled",{enumerable:!0,configurable:!1,get:()=>m!==null?m:($!==r.namespaces&&($=r.namespaces,x=r.enabled(f)),x),set:R=>{m=R}}),typeof r.init=="function"&&r.init(g),g}function n(f,_){let m=r(this.namespace+(typeof _>"u"?":":_)+f);return m.log=this.log,m}function s(f){r.save(f),r.namespaces=f,r.names=[],r.skips=[];let _=(typeof f=="string"?f:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let m of _)m[0]==="-"?r.skips.push(m.slice(1)):r.names.push(m)}function o(f,_){let m=0,$=0,x=-1,g=0;for(;m<f.length;)if($<_.length&&(_[$]===f[m]||_[$]==="*"))_[$]==="*"?(x=$,g=m,$++):(m++,$++);else if(x!==-1)$=x+1,g++,m=g;else return!1;for(;$<_.length&&_[$]==="*";)$++;return $===_.length}function a(){let f=[...r.names,...r.skips.map(_=>"-"+_)].join(",");return r.enable(""),f}function l(f){for(let _ of r.skips)if(o(f,_))return!1;for(let _ of r.names)if(o(f,_))return!0;return!1}function i(f){return f instanceof Error?f.stack||f.message:f}function d(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return r.enable(r.load()),r}ro.exports=Ni});var so=xn((gt,Kr)=>{gt.formatArgs=Fi;gt.save=qi;gt.load=Bi;gt.useColors=Pi;gt.storage=Ui();gt.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();gt.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function Pi(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function Fi(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+Kr.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let r=0,n=0;e[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(r++,s==="%c"&&(n=r))}),e.splice(n,0,t)}gt.log=console.debug||console.log||(()=>{});function qi(e){try{e?gt.storage.setItem("debug",e):gt.storage.removeItem("debug")}catch{}}function Bi(){let e;try{e=gt.storage.getItem("debug")||gt.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function Ui(){try{return localStorage}catch{}}Kr.exports=no()(gt);var{formatters:zi}=Kr.exports;zi.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var vr=globalThis,Yr=vr.trustedTypes,Us=Yr?Yr.createPolicy("lit-html",{createHTML:e=>e}):void 0,Ys="$lit$",Ut=`lit$${Math.random().toFixed(9).slice(2)}$`,Vs="?"+Ut,Ti=`<${Vs}>`,Vt=document,kr=()=>Vt.createComment(""),yr=e=>e===null||typeof e!="object"&&typeof e!="function",Ln=Array.isArray,Ei=e=>Ln(e)||typeof e?.[Symbol.iterator]=="function",Sn=`[ 	
\f\r]`,wr=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,zs=/-->/g,Hs=/>/g,jt=RegExp(`>|${Sn}(?:([^\\s"'>=/]+)(${Sn}*=${Sn}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ws=/'/g,Gs=/"/g,Ks=/^(?:script|style|textarea|title)$/i,In=e=>(t,...r)=>({_$litType$:e,strings:t,values:r}),c=In(1),Ot=In(2),Hd=In(3),Kt=Symbol.for("lit-noChange"),Ve=Symbol.for("lit-nothing"),js=new WeakMap,Yt=Vt.createTreeWalker(Vt,129);function Zs(e,t){if(!Ln(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return Us!==void 0?Us.createHTML(t):t}var Ci=(e,t)=>{let r=e.length-1,n=[],s,o=t===2?"<svg>":t===3?"<math>":"",a=wr;for(let l=0;l<r;l++){let i=e[l],d,f,_=-1,m=0;for(;m<i.length&&(a.lastIndex=m,f=a.exec(i),f!==null);)m=a.lastIndex,a===wr?f[1]==="!--"?a=zs:f[1]!==void 0?a=Hs:f[2]!==void 0?(Ks.test(f[2])&&(s=RegExp("</"+f[2],"g")),a=jt):f[3]!==void 0&&(a=jt):a===jt?f[0]===">"?(a=s??wr,_=-1):f[1]===void 0?_=-2:(_=a.lastIndex-f[2].length,d=f[1],a=f[3]===void 0?jt:f[3]==='"'?Gs:Ws):a===Gs||a===Ws?a=jt:a===zs||a===Hs?a=wr:(a=jt,s=void 0);let $=a===jt&&e[l+1].startsWith("/>")?" ":"";o+=a===wr?i+Ti:_>=0?(n.push(d),i.slice(0,_)+Ys+i.slice(_)+Ut+$):i+Ut+(_===-2?l:$)}return[Zs(e,o+(e[r]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),n]},$r=class e{constructor({strings:t,_$litType$:r},n){let s;this.parts=[];let o=0,a=0,l=t.length-1,i=this.parts,[d,f]=Ci(t,r);if(this.el=e.createElement(d,n),Yt.currentNode=this.el.content,r===2||r===3){let _=this.el.content.firstChild;_.replaceWith(..._.childNodes)}for(;(s=Yt.nextNode())!==null&&i.length<l;){if(s.nodeType===1){if(s.hasAttributes())for(let _ of s.getAttributeNames())if(_.endsWith(Ys)){let m=f[a++],$=s.getAttribute(_).split(Ut),x=/([.?@])?(.*)/.exec(m);i.push({type:1,index:o,name:x[2],strings:$,ctor:x[1]==="."?Tn:x[1]==="?"?En:x[1]==="@"?Cn:ir}),s.removeAttribute(_)}else _.startsWith(Ut)&&(i.push({type:6,index:o}),s.removeAttribute(_));if(Ks.test(s.tagName)){let _=s.textContent.split(Ut),m=_.length-1;if(m>0){s.textContent=Yr?Yr.emptyScript:"";for(let $=0;$<m;$++)s.append(_[$],kr()),Yt.nextNode(),i.push({type:2,index:++o});s.append(_[m],kr())}}}else if(s.nodeType===8)if(s.data===Vs)i.push({type:2,index:o});else{let _=-1;for(;(_=s.data.indexOf(Ut,_+1))!==-1;)i.push({type:7,index:o}),_+=Ut.length-1}o++}}static createElement(t,r){let n=Vt.createElement("template");return n.innerHTML=t,n}};function ar(e,t,r=e,n){if(t===Kt)return t;let s=n!==void 0?r._$Co?.[n]:r._$Cl,o=yr(t)?void 0:t._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(e),s._$AT(e,r,n)),n!==void 0?(r._$Co??(r._$Co=[]))[n]=s:r._$Cl=s),s!==void 0&&(t=ar(e,s._$AS(e,t.values),s,n)),t}var An=class{constructor(t,r){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:r},parts:n}=this._$AD,s=(t?.creationScope??Vt).importNode(r,!0);Yt.currentNode=s;let o=Yt.nextNode(),a=0,l=0,i=n[0];for(;i!==void 0;){if(a===i.index){let d;i.type===2?d=new xr(o,o.nextSibling,this,t):i.type===1?d=new i.ctor(o,i.name,i.strings,this,t):i.type===6&&(d=new Rn(o,this,t)),this._$AV.push(d),i=n[++l]}a!==i?.index&&(o=Yt.nextNode(),a++)}return Yt.currentNode=Vt,s}p(t){let r=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(t,n,r),r+=n.strings.length-2):n._$AI(t[r])),r++}},xr=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,r,n,s){this.type=2,this._$AH=Ve,this._$AN=void 0,this._$AA=t,this._$AB=r,this._$AM=n,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,r=this._$AM;return r!==void 0&&t?.nodeType===11&&(t=r.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,r=this){t=ar(this,t,r),yr(t)?t===Ve||t==null||t===""?(this._$AH!==Ve&&this._$AR(),this._$AH=Ve):t!==this._$AH&&t!==Kt&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Ei(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==Ve&&yr(this._$AH)?this._$AA.nextSibling.data=t:this.T(Vt.createTextNode(t)),this._$AH=t}$(t){let{values:r,_$litType$:n}=t,s=typeof n=="number"?this._$AC(t):(n.el===void 0&&(n.el=$r.createElement(Zs(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===s)this._$AH.p(r);else{let o=new An(s,this),a=o.u(this.options);o.p(r),this.T(a),this._$AH=o}}_$AC(t){let r=js.get(t.strings);return r===void 0&&js.set(t.strings,r=new $r(t)),r}k(t){Ln(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,n,s=0;for(let o of t)s===r.length?r.push(n=new e(this.O(kr()),this.O(kr()),this,this.options)):n=r[s],n._$AI(o),s++;s<r.length&&(this._$AR(n&&n._$AB.nextSibling,s),r.length=s)}_$AR(t=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);t!==this._$AB;){let n=t.nextSibling;t.remove(),t=n}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},ir=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,r,n,s,o){this.type=1,this._$AH=Ve,this._$AN=void 0,this.element=t,this.name=r,this._$AM=s,this.options=o,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=Ve}_$AI(t,r=this,n,s){let o=this.strings,a=!1;if(o===void 0)t=ar(this,t,r,0),a=!yr(t)||t!==this._$AH&&t!==Kt,a&&(this._$AH=t);else{let l=t,i,d;for(t=o[0],i=0;i<o.length-1;i++)d=ar(this,l[n+i],r,i),d===Kt&&(d=this._$AH[i]),a||(a=!yr(d)||d!==this._$AH[i]),d===Ve?t=Ve:t!==Ve&&(t+=(d??"")+o[i+1]),this._$AH[i]=d}a&&!s&&this.j(t)}j(t){t===Ve?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Tn=class extends ir{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Ve?void 0:t}},En=class extends ir{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==Ve)}},Cn=class extends ir{constructor(t,r,n,s,o){super(t,r,n,s,o),this.type=5}_$AI(t,r=this){if((t=ar(this,t,r,0)??Ve)===Kt)return;let n=this._$AH,s=t===Ve&&n!==Ve||t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive,o=t!==Ve&&(n===Ve||s);s&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Rn=class{constructor(t,r,n){this.element=t,this.type=6,this._$AN=void 0,this._$AM=r,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(t){ar(this,t)}};var Ri=vr.litHtmlPolyfillSupport;Ri?.($r,xr),(vr.litHtmlVersions??(vr.litHtmlVersions=[])).push("3.3.1");var Re=(e,t,r)=>{let n=r?.renderBefore??t,s=n._$litPart$;if(s===void 0){let o=r?.renderBefore??null;n._$litPart$=s=new xr(t.insertBefore(kr(),o),o,void 0,r??{})}return s._$AI(e),s};var vt="today",Ct=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}];function Mt(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function lr(e,t=Date.now()){switch(e){case"today":{let r=new Date(t);return r.setHours(0,0,0,0),r.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function Xs(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Qs(){let e=null,t=[],r=new Set;function n(){for(let s of Array.from(r))try{s()}catch{}}return{get(){return e},getWorkspacesState(){return t},set(s,o){e=Array.isArray(s)?s:null,t=Array.isArray(o)?o:[],n()},clear(){e=null,t=[],n()},subscribe(s){return r.add(s),()=>r.delete(s)}}}function Js(){let e=new Map,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{set(n,s,o=null){e.set(n,{lines:Array.isArray(s)?[...s]:[],last_event_at:typeof o=="number"?o:null}),r()},append(n,s){let o=e.get(n)||{lines:[],last_event_at:null};o.lines=[...o.lines,s],o.last_event_at=Date.now(),e.set(n,o),r()},get(n){return e.get(n)||null},clear(n){typeof n=="string"?e.delete(n):e.clear(),r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}var oo=Ai(so(),1);function We(e){return(0,oo.default)(`beads-ui:${e}`)}function yt(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function Xt(e,t){let r=yt(e.created_at),n=yt(t.created_at);if(r!==n)return r<n?1:-1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,l=t.id;return a<l?-1:a>l?1:0}function lo(e,t){let r=yt(e.created_at),n=yt(t.created_at);if(r!==n)return r<n?-1:1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,l=t.id;return a<l?-1:a>l?1:0}function co(e,t){let r=yt(e.updated_at),n=yt(t.updated_at);if(r!==n)return r<n?1:-1;let s=e.id,o=t.id;return s<o?-1:s>o?1:0}function uo(e,t){let r=e.priority??2,n=t.priority??2;if(r!==n)return r-n;let s=yt(e.created_at),o=yt(t.created_at);if(s!==o)return s<o?1:-1;let a=e.id,l=t.id;return a<l?-1:a>l?1:0}function po(e,t){let r=e.closed_at??0,n=t.closed_at??0;if(r!==n)return r<n?1:-1;let s=e?.id,o=t?.id;return s<o?-1:s>o?1:0}var Hi=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function ao(e){let t=e&&e.metadata,r=t?t.task_order:void 0;if(r==null||r==="")return Number.POSITIVE_INFINITY;let n=Number(r);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function io(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let r=Hi.exec(t);if(!r)return Number.POSITIVE_INFINITY;let n=Number(r[1]);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function fo(e,t){let r=ao(e),n=ao(t);if(r!==n)return r<n?-1:1;let s=io(e),o=io(t);if(s!==o)return s<o?-1:1;let a=yt(e&&e.created_at),l=yt(t&&t.created_at);if(a!==l)return a<l?-1:1;let i=e&&e.id,d=t&&t.id;return i===d?0:String(i)<String(d)?-1:1}var Dn=2**20;function pr(e,t){let r=e&&e.id;return t&&typeof r=="string"&&Object.prototype.hasOwnProperty.call(t,r)&&typeof t[r]=="number"&&Number.isFinite(t[r])?t[r]:-yt(e&&e.created_at)}function Zr(e){return(t,r)=>{let n=pr(t,e),s=pr(r,e);if(n!==s)return n<s?-1:1;let o=t?.id,a=r?.id;return o<a?-1:o>a?1:0}}function On(e,t,r){let n=Array.isArray(e)?e:[],s=n.length,o=Math.max(0,Math.min(t,s-1)),a=o-1>=0?n[o-1]:null,l=o+1<s?n[o+1]:null;if(!a&&!l)return{rank:0};if(!a)return{rank:pr(l,r)-Dn};if(!l)return{rank:pr(a,r)+Dn};let i=pr(a,r),d=pr(l,r),f=(i+d)/2;return i<f&&f<d?{rank:f}:{renormalize:n.map((_,m)=>({bead_id:_.id,rank:m*Dn}))}}function Mn(e,t={}){let r=We(`issue-store:${e}`),n=new Map,s=[],o=0,a=new Set,l=!1,i=t.sort||Xt;function d(){for(let m of Array.from(a))try{m()}catch{}}function f(){s=Array.from(n.values()).sort(i)}function _(m){if(l||!m||m.id!==e)return;let $=Number(m.revision)||0;if(r("apply %s rev=%d",m.type,$),!($<=o&&m.type!=="snapshot")){if(m.type==="snapshot"){if($<=o)return;n.clear();let x=Array.isArray(m.issues)?m.issues:[];for(let g of x)g&&typeof g.id=="string"&&g.id.length>0&&n.set(g.id,g);f(),o=$,d();return}if(m.type==="upsert"){let x=m.issue;if(x&&typeof x.id=="string"&&x.id.length>0){let g=n.get(x.id);if(!g)n.set(x.id,x);else{let R=Number.isFinite(g.updated_at)?g.updated_at:0,H=Number.isFinite(x.updated_at)?x.updated_at:0;if(R<=H){for(let W of Object.keys(g))W in x||delete g[W];for(let[W,j]of Object.entries(x))g[W]=j}}f()}o=$,d()}else if(m.type==="delete"){let x=String(m.issue_id||"");x&&(n.delete(x),f()),o=$,d()}}}return{id:e,subscribe(m){return a.add(m),()=>{a.delete(m)}},applyPush:_,snapshot(){return s},size(){return n.size},getById(m){return n.get(m)},dispose(){l=!0,n.clear(),s=[],a.clear(),o=0}}}function Xr(e){let t=String(e.type||"").trim(),r={};if(e.params&&typeof e.params=="object"){let s=Object.keys(e.params).sort();for(let o of s){let a=e.params[o];r[o]=String(a)}}let n=new URLSearchParams(r).toString();return n.length>0?`${t}?${n}`:t}function _o(e){let t=We("subs"),r=new Map,n=new Map;function s(l,i){t("applyDelta %s +%d ~%d -%d",l,(i.added||[]).length,(i.updated||[]).length,(i.removed||[]).length);let d=n.get(l);if(!d||d.size===0)return;let f=Array.isArray(i.added)?i.added:[],_=Array.isArray(i.updated)?i.updated:[],m=Array.isArray(i.removed)?i.removed:[];for(let $ of Array.from(d)){let x=r.get($);if(!x)continue;let g=x.itemsById;for(let R of f)typeof R=="string"&&R.length>0&&g.set(R,!0);for(let R of _)typeof R=="string"&&R.length>0&&g.set(R,!0);for(let R of m)typeof R=="string"&&R.length>0&&g.delete(R)}}async function o(l,i){let d=Xr(i);if(t("subscribe %s key=%s",l,d),!r.has(l))r.set(l,{key:d,itemsById:new Map});else{let _=r.get(l);if(_&&_.key!==d){let m=n.get(_.key);m&&(m.delete(l),m.size===0&&n.delete(_.key)),r.set(l,{key:d,itemsById:new Map})}}n.has(d)||n.set(d,new Set);let f=n.get(d);f&&f.add(l);try{await e("subscribe-list",{id:l,type:i.type,params:i.params})}catch(_){let m=r.get(l)||null;if(m){let $=n.get(m.key);$&&($.delete(l),$.size===0&&n.delete(m.key))}throw r.delete(l),_}return async()=>{t("unsubscribe %s key=%s",l,d);try{await e("unsubscribe-list",{id:l})}catch{}let _=r.get(l)||null;if(_){let m=n.get(_.key);m&&(m.delete(l),m.size===0&&n.delete(_.key))}r.delete(l)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:Xr,selectors:{getIds(l){let i=r.get(l);return i?Array.from(i.itemsById.keys()):[]},has(l,i){let d=r.get(l);return d?d.itemsById.has(i):!1},count(l){let i=r.get(l);return i?i.itemsById.size:0},getItemsById(l){let i=r.get(l),d={};if(!i)return d;for(let f of i.itemsById.keys())d[f]=!0;return d}}}}function ho(){let e=We("issue-stores"),t=new Map,r=new Map,n=new Set,s=new Map;function o(){for(let i of Array.from(n))try{i()}catch{}}function a(i,d,f){let _=d?Xr(d):"",m=r.get(i)||"",$=t.has(i);if(e("register %s key=%s (prev=%s)",i,_,m),$&&m&&_&&m!==_){let x=t.get(i);if(x)try{x.dispose()}catch{}let g=s.get(i);if(g){try{g()}catch{}s.delete(i)}let R=Mn(i,f);t.set(i,R);let H=R.subscribe(()=>o());s.set(i,H)}else if(!$){let x=Mn(i,f);t.set(i,x);let g=x.subscribe(()=>o());s.set(i,g)}return r.set(i,_),()=>l(i)}function l(i){e("unregister %s",i),r.delete(i);let d=t.get(i);d&&(d.dispose(),t.delete(i));let f=s.get(i);if(f){try{f()}catch{}s.delete(i)}}return{register:a,unregister:l,getStore(i){return t.get(i)||null},snapshotFor(i){let d=t.get(i);return d?d.snapshot().slice():[]},subscribe(i){return n.add(i),()=>n.delete(i)}}}function go(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function mo(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Nn(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function Wi(e){let t=String(e||""),r=t.startsWith("#")?t.slice(1):t,n=r.indexOf("?"),s=n>=0?r.slice(n+1):"";if(s){let l=new URLSearchParams(s).get("issue");if(l)return decodeURIComponent(l)}let o=/^\/issue\/([^\s?#]+)/.exec(r);return o&&o[1]?decodeURIComponent(o[1]):null}function Gi(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function bo(e){let t=We("router"),r=()=>{let n=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(n),o=s&&s[1]?decodeURIComponent(s[1]):Wi(n),a=Gi(n);if(t("hash change \u2192 view=%s id=%s",a,o),e.setState({selected_id:a==="worker"?null:o,view:a,worker:{selected_parent_id:a==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(n)){let i=o?`#/${a}?issue=${encodeURIComponent(o)}`:`#/${a}`;window.location.hash!==i&&(window.location.hash=i)}};return{start(){window.addEventListener("hashchange",r),r()},stop(){window.removeEventListener("hashchange",r)},gotoIssue(n){let s=e.getState?e.getState():{view:"board"},o=s.view==="worker"||s.view==="monitor"?s.view:"board",a=Nn(o,n);t("goto issue %s (view=%s)",n,o),window.location.hash!==a?window.location.hash=a:e.setState({selected_id:o==="worker"?null:n,view:o,worker:{selected_parent_id:o==="worker"?n:null}})},gotoView(n){let s=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},o=n==="worker"?s.worker?.selected_parent_id:s.selected_id,a=o?Nn(n,o):`#/${n}`;t("goto view %s (id=%s)",n,o||""),window.location.hash!==a?window.location.hash=a:e.setState({view:n,selected_id:n==="worker"?null:s.selected_id})}}}var ji=Object.freeze({workspace_config:{default_workspace:null}});function wo(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:ji.workspace_config.default_workspace}}}function vo(e={}){let t=We("state"),r={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today",show_deferred_column:e.board?.show_deferred_column===!0},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:wo(e.config)},n=new Set;function s(){for(let o of Array.from(n))try{o(r)}catch{}}return{getState(){return r},setState(o){let a={...r,...o,filters:{...r.filters,...o.filters||{}},board:{...r.board,...o.board||{}},worker:{...r.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:r.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:r.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:r.workspace.hidden},config:o.config!==void 0?wo(o.config):r.config},l=a.workspace.current?.path!==r.workspace.current?.path||a.workspace.available.length!==r.workspace.available.length||a.workspace.hidden.length!==r.workspace.hidden.length||a.workspace.hidden.some((d,f)=>d!==r.workspace.hidden[f]),i=a.config.workspace_config.default_workspace!==r.config.workspace_config.default_workspace;a.selected_id===r.selected_id&&a.view===r.view&&a.filters.status===r.filters.status&&a.filters.search===r.filters.search&&a.filters.type===r.filters.type&&a.board.closed_filter===r.board.closed_filter&&a.board.show_deferred_column===r.board.show_deferred_column&&a.worker.selected_parent_id===r.worker.selected_parent_id&&a.worker.show_closed_children.length===r.worker.show_closed_children.length&&a.worker.show_closed_children.every((d,f)=>d===r.worker.show_closed_children[f])&&!l&&!i||(r=a,t("state change %o",{selected_id:r.selected_id,view:r.view,filters:r.filters,board:r.board,worker:r.worker,workspace:r.workspace.current?.path,config:{default_workspace:r.config.workspace_config.default_workspace}}),s())},subscribe(o){return n.add(o),()=>n.delete(o)}}}function ko(e){let t=We("activity"),r=0,n=new Map,s=1;function o(){if(!e)return;let d=r>0;e.toggleAttribute("hidden",!d),e.setAttribute("aria-busy",d?"true":"false")}function a(){r+=1,t("start count=%d",r),o()}function l(){let d=r;r=Math.max(0,r-1),d<=0?t("done called but count was already %d",d):t("done count=%d\u2192%d",d,r),o()}function i(d){return async(_,m)=>{let $=s++,x=Date.now();n.set($,{type:_,start_ts:x}),t("request start id=%d type=%s count=%d",$,_,r+1),a();let g=!1,R=()=>{g||(g=!0,n.delete($),l())},H=setTimeout(()=>{g||(t("request TIMEOUT id=%d type=%s elapsed=%dms",$,_,Date.now()-x),R())},3e4);try{let W=await d(_,m),j=Date.now()-x;return t("request done id=%d type=%s elapsed=%dms",$,_,j),W}catch(W){let j=Date.now()-x;throw t("request error id=%d type=%s elapsed=%dms err=%o",$,_,j,W),W}finally{clearTimeout(H),R()}}}return o(),{wrapSend:i,start:a,done:l,getCount:()=>r,getActiveRequests:()=>{let d=Date.now();return Array.from(n.entries()).map(([f,_])=>({id:f,type:_.type,elapsed_ms:d-_.start_ts}))}}}function ie(e,t="info",r=2800){let n=document.createElement("div");n.className="toast",n.textContent=e,n.style.position="fixed",n.style.right="12px",n.style.bottom="12px",n.style.zIndex="1000",n.style.color="#fff",n.style.padding="8px 10px",n.style.borderRadius="4px",n.style.fontSize="12px",t==="success"?n.style.background="#156d36":t==="warning"?n.style.background="#a36a00":t==="error"?n.style.background="#9f2011":n.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(n),setTimeout(()=>{try{n.remove()}catch{}},r)}function Qr(e=void 0,t=void 0){function r(){if(!t||typeof t.get!="function")return null;let o=t.get();return o&&o.order?o.order:{}}function n(o,a,l){let i=e&&e.snapshotFor?e.snapshotFor(o).slice():[];if(a==="closed")return i.sort(po),i;switch(l){case"created_desc":return i.sort(Xt),i;case"created_asc":return i.sort(lo),i;case"updated_desc":return i.sort(co),i;case"priority":return i.sort(uo),i;case"manual":default:{let d=r();return d?i.sort(Zr(d)):i.sort(Xt),i}}}function s(o){let a=[];return e&&typeof e.subscribe=="function"&&a.push(e.subscribe(o)),t&&typeof t.subscribe=="function"&&a.push(t.subscribe(o)),()=>{for(let l of a)try{l()}catch{}}}return{selectBoardColumn:n,subscribe:s}}function Sr(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function dt(e){let t=Sr(e);if(t===null)return"";let r=new Date(t),n=s=>String(s).padStart(2,"0");return`${r.getFullYear()}-${n(r.getMonth()+1)}-${n(r.getDate())} ${n(r.getHours())}:${n(r.getMinutes())}`}function bt(e,t){let r=Sr(e);if(r===null)return"";let s=(typeof t=="number"?t:Date.now())-r;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let a=Math.floor(s/36e5);if(a<24)return`${a}\uC2DC\uAC04 \uC804`;let l=Math.floor(s/864e5);if(l<7)return`${l}\uC77C \uC804`;let i=Math.floor(l/7);if(l<30)return`${i}\uC8FC \uC804`;let d=Math.floor(l/30);return d<12?`${d}\uAC1C\uC6D4 \uC804`:`${Math.floor(l/365)}\uB144 \uC804`}function Jr(e){if(!Array.isArray(e))return null;let t=null,r=-1;for(let n of e){if(!n||n.status!=="in_progress")continue;let s=Sr(n.updated_at)??0;if(t===null||s>r){t=n,r=s;continue}s===r&&String(n.id)<String(t.id)&&(t=n)}return t}function en(e){let t=e.transport,r=e.uiOrderStore;function n(a,l){return"renormalize"in a?a.renormalize:[{bead_id:l,rank:a.rank}]}function s(a,l){let i={...a.order};for(let d of l)i[d.bead_id]=d.rank;r&&r.set({revision:a.revision,order:i})}async function o(a,l,i){if(!t||!r)return;let d=r.get()||{revision:0,order:{}},f=n(On(l,i,d.order),a);s(d,f);let _=await t("ui-order-set",{expected_revision:d.revision,entries:f});if(_&&_.conflict){let m={revision:typeof _.revision=="number"?_.revision:0,order:_.order||{}};r.set(m);let $=n(On(l,i,m.order),a);s(m,$);let x=await t("ui-order-set",{expected_revision:m.revision,entries:$});x&&x.applied&&r.set({revision:typeof x.revision=="number"?x.revision:0,order:x.order||{}})}else _&&_.applied&&r.set({revision:typeof _.revision=="number"?_.revision:0,order:_.order||{}})}return{applyReorder:o}}function tn(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Pn(e,t){return!t||typeof e!="string"||e.length===0||tn(t.visible_labels).includes(e)?!0:tn(t.hidden_labels).includes(e)?!1:!tn(t.hidden_prefixes).some(r=>r.length>0&&e.startsWith(r))}function yo(e,t){return tn(e).filter(r=>Pn(r,t))}function Qt(e,t){let r=e&&e.chips?e.chips[t]:void 0;return typeof r=="boolean"?r:!0}var Yi={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg"},$o={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge"},Vi={spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},Ki={review:"\u2713",skip:"\u2298"},fr={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function Zi(e,t,r){if(!(r==="in_progress"||r==="resolved"))return null;for(let s of e){let o=t[s];if(o&&o.fill==="dim"&&o.stale!==!0)return s}return null}function Xi(e){let t=e&&e.fill||"none";return t==="none"?fr.none:e&&e.stale===!0?fr.stale:t==="dim"?fr.dim:e&&e.glyph==="review"?fr.review:e&&e.glyph==="skip"?fr.skip:fr.done}function Qi(e,t,r){let n=Yi[e]||e,s=t&&t.fill||"none",o=!!t&&t.stale===!0,a=Ki[t&&t.glyph||""]||"",l="bar";s==="dim"?l+=` b-${n} dim`:s==="full"&&(l+=` b-${n} full`),o&&(l+=" stale"),r&&(l+=" cur");let i=s==="none"?"lbl":`lbl l-${n} on`,d=r?`color: var(--stage-${n}-on)`:"";return c`
    <div class="seg">
      <div class=${l} style=${d}>${a}</div>
      <div class=${i}>
        ${$o[e]||e}
      </div>
    </div>
  `}function rn(e,t){if(!e||!e.stages)return"";let r=e.route==="full_plan"?"full_plan":"spec_backed",n=Vi[r],s=e.stages,o=Zi(n,s,String(t||"open")),a=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${n.map(l=>`${$o[l]||l} ${Xi(s[l]||{})}`).join(" \xB7 ")}`;return c`
    <div class="stp" role="img" aria-label=${a}>
      ${n.map(l=>Qi(l,s[l]||{},l===o))}
    </div>
  `}function Ji(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var xo=2;function el(e){if(!e)return[];let t=[];if(e.external){let n=e.reason?`\u23F8 blocked: ${e.reason}`:"\u23F8 blocked";t.push(c`<span class="ctl-chip ctl-chip--blocked">${n}</span>`)}let r=Array.isArray(e.blockers)?e.blockers:[];if(r.length>0){let n=r.slice(0,xo).join(", "),s=r.length-xo,o=`\u26D3 blocked: ${n}${s>0?` +${s}`:""}`;t.push(c`<span class="ctl-chip ctl-chip--blocked-dep">${o}</span>`)}return t}function tl(e,t){let r=t.policy||null,n=e.workflow&&e.workflow.chips||{},s=[];if(n.route&&Qt(r,"route")){let o=n.route_source==="derived";s.push(c`<span
        class="ctl-chip ctl-chip--route${o?" is-derived":""}"
        title=${o?"route \uCD94\uB860\uAC12 (metadata \uBBF8\uD540)":"route"}
        >${o?`${n.route} ?`:n.route}</span
      >`)}if(n.fast_track&&Qt(r,"fast_track")&&s.push(c`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),n.pr&&Qt(r,"pr")){let o=n.pr.number;s.push(c`<span class="ctl-chip ctl-chip--pr"
        >${`PR${o!=null?` #${o}`:""}`}</span
      >`)}for(let o of yo(e.labels,r))s.push(c`<span class="ctl-chip ctl-chip--label">${o}</span>`);return e.from_id&&Qt(r,"from")&&s.push(c`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${o=>{o.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(o,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),Qt(r,"blocked")&&s.push(...el(e.blocked_info)),s.length===0?"":c`<div class="board-card__chips">${s}</div>`}function rl(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function nl(e){let t=bt(e.created_at),r=bt(e.updated_at);return!t&&!r?"":c`<span class="board-card__times">
    ${t?c`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${dt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}
    ${t&&r?c`<span class="board-card__time-sep">·</span>`:""}
    ${r?c`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${dt(e.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </span>`}function sl(e,t){let r=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]},n=r.total||0,s=t.isExpanded?t.isExpanded(e.id):!0,o=n>0?r.children.slice().sort(fo):r.children;return c`
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
        ${nl(e)}
      </div>
      ${n>0&&r.current?c`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${r.current.title||r.current.id}</span
            >
          </div>`:""}
      ${s&&n>0?c`<div class="board-card__roll-list">
            ${o.map((a,l)=>c`<button
                  type="button"
                  class="board-card__roll-child"
                  @click=${i=>t.onChildClick&&t.onChildClick(i,a.id)}
                >
                  <span class=${rl(a.status)}>●</span>
                  <span class="board-card__roll-child-ord">${l+1}</span>
                  <span class="board-card__roll-child-title"
                    >${a.title||a.id}</span
                  >
                </button>`)}
          </div>`:""}
    </div>
  `}function So(e,t){let r=Ji(e.priority);return c`
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
      ${tl(e,t)}
      ${e.workflow&&Qt(t.policy||null,"stepper")?rn(e.workflow,e.status):""}
      ${sl(e,t)}
    </article>
  `}function Jt(e,t){let r=Array.isArray(e.items)?e.items.length:0,n=e.is_closed===!0;return c`
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
              ${Ct.map(o=>c`<option
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
        ${e.items.map(o=>So(o,t))}
      </div>
    </section>
  `}var ol=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],al=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],il=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function ll(e,t,r){let n=e.labels.length,s=n>0?`\uB77C\uBCA8 ${n}`:"\uB77C\uBCA8";return c`
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
  `}function Ao(e,t,r){return c`
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
        ${ol.map(n=>c`<option
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
        ${al.map(n=>c`<option
              value=${n.value}
              ?selected=${e.type===n.value}
            >
              ${n.label}
            </option>`)}
      </select>
      ${ll(e,t,r)}
      <span class="board-filter__spacer"></span>
      <button
        type="button"
        class=${r.show_deferred?"board-filter__deferred is-on":"board-filter__deferred"}
        aria-pressed=${r.show_deferred?"true":"false"}
        @click=${t.onDeferredToggle}
      >
        Deferred ${r.deferred_count}
      </button>
      <select
        class="board-filter__select board-filter__sort"
        aria-label="정렬 규칙"
        @change=${t.onSortChange}
      >
        ${il.map(n=>c`<option
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
  `}var cl=200,dl={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","deferred-col":"deferred","closed-col":"closed"},ul=new Set(["blocked-col","ready-col","in-progress-col","resolved-col","deferred-col"]),To="beads-ui.board.sort",Eo=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function pl(){try{let e=window.localStorage.getItem(To);if(e&&Eo.has(e))return e}catch{}return"created_desc"}function Co(e,t){let r=We("views:board"),n=t.gotoIssue,s=t.issueStores,o=t.transport,a=t.uiOrderStore,l=t.displayPolicyStore,i=t.onClosedRangeChange,d=t.onNewIssue,f=t.closedRange||vt,_=s?Qr(s,a):null,m=en({transport:o,uiOrderStore:a}),$=[],x=[],g=[],R=[],H=[],W=[],j=!1,P=0,A=pl(),S=new Map,O=new Map,y=new Map,K=new Set,V={search:"",priority:"",type:"",labels:[]},Z=!1,le=null;function xe(N){return String(N.status||"open")==="open"}function Fe(N){let U=String(N.status||"open");return U==="open"||U==="blocked"}function $e(N){let U=V.search.trim().toLowerCase(),ne=V.priority,te=V.type,oe=V.labels;return N.filter(ve=>{if(U){let ye=String(ve.id||"").toLowerCase(),Te=String(ve.title||"").toLowerCase();if(!ye.includes(U)&&!Te.includes(U))return!1}if(ne!==""&&String(ve.priority)!==ne||te!==""&&String(ve.issue_type||"")!==te)return!1;if(oe.length>0){let ye=Array.isArray(ve.labels)?ve.labels:[];if(!oe.some(Te=>ye.includes(Te)))return!1}return!0})}function X(){let N=new Set;for(let U of[$,x,g,R,H,W])for(let ne of U){let te=Array.isArray(ne.labels)?ne.labels:[];for(let oe of te)typeof oe=="string"&&oe.length>0&&N.add(oe)}return Array.from(N).sort()}function L(){return V.search.trim()!==""||V.priority!==""||V.type!==""||V.labels.length>0}function T(){try{if(_){let N=_.selectBoardColumn("tab:board:in-progress","in_progress",A),U=_.selectBoardColumn("tab:board:blocked","blocked",A).filter(Fe),ne=new Set(N.map(E=>E.id)),te=_.selectBoardColumn("tab:board:ready","ready",A).filter(E=>xe(E)&&!ne.has(E.id)),oe=_.selectBoardColumn("tab:board:resolved","resolved",A),ve=_.selectBoardColumn("tab:board:deferred","deferred",A),ye=j?ve:[],Te=_.selectBoardColumn("tab:board:closed","closed").slice(0,cl),pe=[...U,...te,...N,...oe,...ye,...Te];B(pe);let v=new Set;for(let E of pe)E&&E.id&&!Fn(E)&&v.add(E.id);let q=!L();$=q?_r(U,v):U,x=q?_r(te,v):te,g=q?_r(N,v):N,R=q?_r(oe,v):oe,H=q?_r(ye,v):ye,P=ve.length,W=q?_r(Te,v):Te,S=new Map;for(let E of $)S.set(E.id,"open");for(let E of x)S.set(E.id,"open");for(let E of g)S.set(E.id,"in_progress");for(let E of R)S.set(E.id,"resolved");for(let E of H)S.set(E.id,"deferred");for(let E of W)S.set(E.id,"closed");O=new Map;for(let E of $)O.set(E.id,"blocked-col");for(let E of x)O.set(E.id,"ready-col");for(let E of g)O.set(E.id,"in-progress-col");for(let E of R)O.set(E.id,"resolved-col");for(let E of H)O.set(E.id,"deferred-col");for(let E of W)O.set(E.id,"closed-col")}de()}catch{$=[],x=[],g=[],R=[],H=[],W=[],y=new Map,de()}}function B(N){let U=new Map;for(let te of N)te&&te.id&&!U.has(te.id)&&U.set(te.id,te);let ne=new Map;for(let te of U.values()){let oe=Fn(te);if(!oe)continue;let ve=ne.get(oe);ve||(ve=[],ne.set(oe,ve)),ve.push({id:te.id,title:te.title,status:te.status,metadata:te.metadata,created_at:te.created_at,updated_at:te.updated_at})}y=ne}function he(N){let U=y.get(N)||[],ne=0;for(let oe of U)(oe.status==="resolved"||oe.status==="closed")&&(ne+=1);let te=Jr(U);return{total:U.length,count:ne,current:te,children:U}}function ee(N){return!K.has(N)}function ue(N,U){N.preventDefault(),N.stopPropagation(),K.has(U)?K.delete(U):K.add(U),de()}function se(N,U){N.preventDefault(),N.stopPropagation(),n(U)}function ze(N,U){N.preventDefault(),N.stopPropagation(),n(U)}function fe(N,U){le||n(U)}function Pe(N,U){N.preventDefault(),N.stopPropagation(),fl(U).then(ne=>{ne&&ie("\uBCF5\uC0AC\uB428","success",1200)})}function Ge(N,U){le=U,N.dataTransfer&&(N.dataTransfer.setData("text/plain",U),N.dataTransfer.effectAllowed="move"),N.target.classList.add("board-card--dragging")}function Ue(N){N.target.classList.remove("board-card--dragging"),Qe(),setTimeout(()=>{le=null},0)}function nt(N){let U=String(N.target.value||"");!U||U===f||(f=U,i&&i(U),de())}let Xe={onCardClick:fe,onCopyId:Pe,onDragStart:Ge,onDragEnd:Ue,onClosedRangeChange:nt,rollupFor:he,isExpanded:ee,onRollupToggle:ue,onChildClick:se,onFromChipClick:ze,get policy(){return l?l.get():null}};function F(N){let U=N.target,ne=e.querySelector(".board-filter__labels");U&&ne&&ne.contains(U)||re()}function G(N){N.key==="Escape"&&re()}function M(){Z||(Z=!0,document.addEventListener("mousedown",F),document.addEventListener("keydown",G),de())}function re(){Z&&(Z=!1,document.removeEventListener("mousedown",F),document.removeEventListener("keydown",G),de())}let ce={onSearchInput(N){V.search=String(N.target.value||""),T()},onPriorityChange(N){V.priority=String(N.target.value||""),T()},onTypeChange(N){V.type=String(N.target.value||""),T()},onSortChange(N){let U=String(N.target.value||"");if(!(!Eo.has(U)||U===A)){A=U;try{window.localStorage.setItem(To,U)}catch{}T()}},onDeferredToggle(){j=!j,T()},onLabelMenuToggle(){Z?re():M()},onLabelToggle(N){let U=V.labels.indexOf(N);U===-1?V.labels.push(N):V.labels.splice(U,1),T()},onLabelClear(){V.labels.length!==0&&(V.labels=[],T())},onNewIssue(){d&&d()}};function ge(){let N=j?"board-root board-root--deferred":"board-root";return c`
      <div class="board-view">
        ${Ao(V,ce,{sort_mode:A,show_deferred:j,deferred_count:P,label_options:X(),label_menu_open:Z})}
        <div class=${N}>
          ${Jt({title:"Blocked",id:"blocked-col",items:$e($)},Xe)}
          ${Jt({title:"Ready",id:"ready-col",items:$e(x)},Xe)}
          ${Jt({title:"In progress",id:"in-progress-col",items:$e(g)},Xe)}
          ${Jt({title:"Resolved",id:"resolved-col",items:$e(R)},Xe)}
          ${j?Jt({title:"Deferred",id:"deferred-col",items:$e(H)},Xe):""}
          ${Jt({title:"Closed",id:"closed-col",items:$e(W),is_closed:!0,closed_range:f},Xe)}
        </div>
      </div>
    `}function de(){Re(ge(),e),Se()}function Se(){try{let N=Array.from(e.querySelectorAll(".board-column"));for(let U of N)Array.from(U.querySelectorAll(".board-card")).forEach((te,oe)=>{te.tabIndex=oe===0?0:-1})}catch{}}async function Ie(N,U){if(!o){ie("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:N,status:U}),ie("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(ne){r("update-status failed: %o",ne),ie("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function st(N){switch(N){case"blocked-col":return $;case"ready-col":return x;case"in-progress-col":return g;case"resolved-col":return R;case"deferred-col":return H;default:return[]}}function it(N,U,ne){if(!o||!a)return;let te=st(N),oe=te.find(v=>v.id===U);if(!oe)return;let ve=te.filter(v=>v.id!==U),ye=ne.closest?ne.closest(".board-card"):null,Te=ve.length;if(ye){let v=ye.getAttribute("data-issue-id");if(v===U)return;let q=ve.findIndex(E=>E.id===v);q>=0&&(Te=q)}let pe=ve.slice();pe.splice(Te,0,oe),m.applyReorder(U,pe,Te)}function Qe(){for(let N of Array.from(e.querySelectorAll(".board-column--drag-over")))N.classList.remove("board-column--drag-over")}let He=null;e.addEventListener("dragover",N=>{N.preventDefault(),N.dataTransfer&&(N.dataTransfer.dropEffect="move");let ne=N.target.closest(".board-column");ne&&ne!==He&&(He&&He.classList.remove("board-column--drag-over"),ne.classList.add("board-column--drag-over"),He=ne)}),e.addEventListener("dragleave",N=>{let U=N.relatedTarget;(!U||!e.contains(U))&&He&&(He.classList.remove("board-column--drag-over"),He=null)}),e.addEventListener("drop",N=>{N.preventDefault(),He&&(He.classList.remove("board-column--drag-over"),He=null);let U=N.target,ne=U.closest(".board-column");if(!ne)return;let te=N.dataTransfer?.getData("text/plain")||"";if(!te)return;let oe=ne.id,ve=O.get(te);if(ve&&ve===oe){if(ul.has(oe)){if(A!=="manual"){ie("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}it(oe,te,U)}return}let ye=dl[oe];if(!ye){ie("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}S.get(te)!==ye&&Ie(te,ye)}),e.addEventListener("keydown",N=>{let U=N.target;if(!(U instanceof HTMLElement))return;let ne=String(U.tagName||"").toLowerCase();if(ne==="input"||ne==="textarea"||ne==="select"||ne==="button"||ne==="a"||U.isContentEditable===!0)return;let te=U.closest(".board-card");if(!te)return;let oe=String(N.key||"");if(oe==="Enter"||oe===" "){N.preventDefault();let pe=te.getAttribute("data-issue-id");pe&&n(pe);return}if(oe!=="ArrowUp"&&oe!=="ArrowDown"&&oe!=="ArrowLeft"&&oe!=="ArrowRight")return;N.preventDefault();let ve=te.closest(".board-column");if(!ve)return;let ye=Array.from(ve.querySelectorAll(".board-card")),Te=ye.indexOf(te);if(oe==="ArrowDown"&&Te<ye.length-1){ot(te,ye[Te+1]);return}if(oe==="ArrowUp"&&Te>0){ot(te,ye[Te-1]);return}if(oe==="ArrowLeft"||oe==="ArrowRight"){let pe=Array.from(e.querySelectorAll(".board-column")),v=pe.indexOf(ve),q=oe==="ArrowRight"?1:-1,E=v+q;for(;E>=0&&E<pe.length;){let J=pe[E].querySelector(".board-card");if(J){ot(te,J);return}E+=q}}});function ot(N,U){try{N.tabIndex=-1,U.tabIndex=0,U.focus()}catch{}}let Ae=null;_&&_.subscribe&&(Ae=_.subscribe(()=>{try{T()}catch{}}));let Je=null;return l&&l.subscribe&&(Je=l.subscribe(()=>{try{T()}catch{}})),{async load(){r("load"),T()},clear(){re(),Ae&&(Ae(),Ae=null),Je&&(Je(),Je=null),e.replaceChildren(),$=[],x=[],g=[],R=[],H=[],W=[],S=new Map,O=new Map}}}function Fn(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function _r(e,t){return e.filter(r=>{let n=Fn(r);return!(n&&t.has(n))})}async function fl(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let r=!1;try{r=document.execCommand("copy")}finally{t.remove()}return r}catch{return!1}}async function er(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let r=document.createElement("textarea");r.value=t,r.style.position="fixed",r.style.left="-9999px",document.body.appendChild(r),r.select();let n=!1;try{n=document.execCommand("copy")}finally{r.remove()}return n}catch{return!1}}var _l="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function tr(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var Nt=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"];function Ro(e){let t=0;for(let r of Nt)t+=tr(e?.[r]);return t}function Lo(e){return!e||typeof e!="object"?!1:Nt.some(t=>Number.isFinite(e[t]))}function hl(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function hr(e){return Lo(e)?`\u03C4 ${hl(Ro(e))}`:null}function $t(e){let t=hr(e);if(!t)return null;let r=e?.total_cost_usd;return typeof r=="number"&&Number.isFinite(r)?`${t} \xB7 $${r.toFixed(2)}`:t}function gr(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${tr(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${tr(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${tr(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${tr(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let r=[`\uCD1D ${Ro(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&r.push(_l),r.join(`
`)}function Rt(e,t){let r={input_tokens:0,output_tokens:0,cache_read_input_tokens:0,cache_creation_input_tokens:0},n=0,s=0,o=0,a=!1;for(let l of Object.values(e||{})){if(!l||l.bead_id!==t)continue;let i=l.usage;if(Lo(i)){n+=1;for(let d of Nt)r[d]=tr(r[d])+tr(i[d]);typeof i.total_cost_usd=="number"&&Number.isFinite(i.total_cost_usd)&&(s+=i.total_cost_usd,o+=1),i.replayed===!0&&(a=!0)}}return n===0?null:(o===n&&(r.total_cost_usd=s),a&&(r.replayed=!0),r)}var gl={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},ml=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,bl=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function zt(e){return!!e&&typeof e=="object"}function qn(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function Io(e,t){let r=qn(e),n=qn(t),s=new Map;for(let l of r)s.set(l,(s.get(l)||0)+1);let o=0;for(let l of n){let i=s.get(l)||0;i>0?s.set(l,i-1):o+=1}let a=0;for(let l of s.values())a+=l;return{added:o,removed:a}}function wl(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(s=>zt(s)&&typeof s.text=="string"?s.text:"").join(""):zt(e)&&typeof e.text=="string"&&(t=e.text);let n=(String(t).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return n.length>120?`${n.slice(0,117)}\u2026`:n}function vl(e){let t=String(e.name||""),r=e.input||{},n={kind:"tool",tool:t,icon:gl[t]||"\u{1F527}",input:r,expandable:!0};if((t==="Read"||t==="Write")&&(n.path=String(r.file_path||r.path||"")),t==="Write"&&(n.added=qn(r.content).length),t==="Edit"){n.path=String(r.file_path||r.path||"");let{added:s,removed:o}=Io(r.old_string,r.new_string);n.added=s,n.removed=o}if(t==="MultiEdit"){n.path=String(r.file_path||r.path||"");let s=0,o=0,a=Array.isArray(r.edits)?r.edits:[];for(let l of a){let i=Io(zt(l)?l.old_string:"",zt(l)?l.new_string:"");s+=i.added,o+=i.removed}n.added=s,n.removed=o}return t==="Bash"&&(n.command=String(r.command||"")),(t==="Grep"||t==="Glob")&&(n.command=String(r.pattern||r.query||"")),n}function Do(e){let t=e.split(/\r?\n/).find(n=>n.trim().length>0)||"",r=ml.exec(t);return r?{kind:"gate",gate:r[2]==="implementation"?"impl":r[2],reviewer:r[3],verdict:r[4],time:r[5]?r[5].trim():void 0,text:t.trim()}:bl.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function kl(e,t){if(e.type==="assistant"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[],s=[];for(let o of n)if(zt(o)){if(o.type==="text"&&typeof o.text=="string")s.push(Do(o.text));else if(o.type==="tool_use"){let a=vl(o);typeof o.id=="string"&&t.set(o.id,a),s.push(a)}}return s}if(e.type==="user"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[];for(let s of n)if(zt(s)&&s.type==="tool_result"){let o=t.get(String(s.tool_use_id));if(o){let a=wl(s.content);o.result=a,o.output=typeof s.content=="string"?s.content:a}}return[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success";return[{kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""}]}return[]}function yl(e){if(e.type==="item.completed"&&zt(e.item)){let t=e.item;return t.type==="agent_message"&&typeof t.text=="string"?[Do(t.text)]:t.type==="error"?[{kind:"error",text:String(t.message||"")}]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function $l(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function Oo(e){let t=[],r=new Map,n=Array.isArray(e)?e:[];for(let s of n){let o=s;if(typeof s=="string"){let l=s.trim();if(l.length===0)continue;try{o=JSON.parse(l)}catch{continue}}if(!zt(o))continue;let a=$l(o)?yl(o):kl(o,r);for(let l of a)t.push(l)}return t}var xl=5;function Sl(e,t){if(typeof e!="number")return"";let r=Math.max(0,Math.floor((t-e)/1e3));return r<60?`${r}\uCD08 \uC804`:bt(e,t)}function nn(e,t={}){let{transport:r,sessionLogStore:n,onClose:s}=t,o=null,a={},l=!0,i=new Set,d=new Set,f=null,_=null;function m(){if(!o||!n)return[];let L=n.get(o);return Oo(L?L.lines:[])}function $(){if(!o||!n)return null;let L=n.get(o),T=L?L.last_event_at:null;return typeof T=="number"?T:null}function x(){return a.status==="running"}function g(){if(x()&&o){_||(_=setInterval(()=>y(),1e3));return}R()}function R(){_&&(clearInterval(_),_=null)}function H(L){let T=[],B=0;for(;B<L.length;){let he=L[B];if(he.kind==="tool"){let ee=B;for(;ee<L.length&&L[ee].kind==="tool"&&L[ee].tool===he.tool;)ee+=1;if(ee-B>=xl&&!d.has(B)){T.push({kind:"group",idx:B,tool:he.tool||"",lines:L.slice(B,ee).map((ue,se)=>({idx:B+se,line:ue}))}),B=ee;continue}}T.push({kind:"line",idx:B,line:he}),B+=1}return T}function W(L){for(let T=L.length-1;T>=0;T-=1){let B=L[T];if(B.kind==="result"||B.kind==="error")return null;if(B.kind==="tool"&&!Object.hasOwn(B,"result"))return B}return null}function j(L,T){if(T.kind==="gate")return c`<div class="sv__gate">${T.text}</div>`;if(T.kind==="phase")return c`<div class="sv__phase">${T.text}</div>`;if(T.kind==="result")return c`<div
        class="sv__result${T.success?" sv__result--ok":" sv__result--fail"}"
      >
        ${T.success?"\u2713":"\u2717"}
        ${T.text||(T.success?"DONE":"\uC2E4\uD328")}
      </div>`;if(T.kind==="error")return c`<div class="sv__error">⛔ ${T.text}</div>`;if(T.kind==="blocker")return c`<div class="sv__error">⛔ ${T.text}</div>`;if(T.kind==="tool"){let B=i.has(L),he=T.tool==="Bash"?T.command:T.path||T.command||"";return c`<div
        class="sv__tool${B?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>V(L)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${T.icon}</span>
          <span class="sv__tool-name">${T.tool}</span>
          ${he?c`<span class="sv__tool-detail">${he}</span>`:""}
          ${typeof T.added=="number"?c`<span class="sv__diff-add">+${T.added}</span>`:""}
          ${typeof T.removed=="number"?c`<span class="sv__diff-del">−${T.removed}</span>`:""}
          ${T.result?c`<span class="sv__tool-ok">→ ${T.result}</span>`:""}
        </span>
        ${B?c`<pre class="sv__tool-expand">${P(T)}</pre>`:""}
      </div>`}return c`<div class="sv__as">${T.text}</div>`}function P(L){let T=[];if(L.input!==void 0)try{T.push(`input: ${JSON.stringify(L.input,null,2)}`)}catch{}return typeof L.output=="string"&&L.output.length>0&&T.push(`output:
${L.output}`),T.join(`

`)}function A(){if(!o)return c``;let L=m(),T=[a.runner,a.model,a.effort].filter(Boolean).join(" \xB7 "),B=a.session_id||"",he=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${l?"ON":"OFF"}`,ee=x(),ue=ee?Sl($(),Date.now()):"",se=ee?W(L):null;return c`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id">${o}</span>
        ${ee?c`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${ue?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${ue}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${ue?c`<span class="sv__live-ago">${ue}</span>`:""}</span
            >`:""}
        ${B?c`<button
              type="button"
              class="sv__session"
              title=${B}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${B}`}
              @click=${()=>le(B)}
            >
              ⧉ ${B.slice(0,8)}
            </button>`:""}
        ${T?c`<span class="sv__meta">${T}</span>`:""}
        ${a.worktree?c`<span class="sv__wt" title=${a.worktree}
              >${a.worktree}</span
            >`:""}
        <button
          type="button"
          class="sv__follow${l?" sv__follow--on":""}"
          aria-pressed=${l?"true":"false"}
          aria-label=${he}
          @click=${Z}
        >
          <span class="sv__follow-full">⇣ ${he}</span>
          <span class="sv__follow-short">⇣ ${l?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>X()}
        >
          ✕
        </button>
      </div>
      <div class="sv__body">
        ${L.length===0?c`<div class="sv__empty">세션 로그 없음</div>`:H(L).map(ze=>ze.kind==="group"?S(ze):j(ze.idx,ze.line))}
      </div>
      ${se?c`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            <span class="sv__now-icon">${se.icon}</span>
            <span class="sv__now-name">${se.tool}</span>
            <span class="sv__now-detail"
              >${se.tool==="Bash"?se.command:se.path||se.command||""}</span
            >
          </div>`:""}
    </div>`}function S(L){return c`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>O(L.idx)}
    >
      <span class="sv__group-icon">${L.lines[0].line.icon}</span>
      <span class="sv__group-name">${L.tool}</span>
      <span class="sv__group-count">${L.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function O(L){d.add(L),y()}function y(){Re(A(),e),g(),l&&K()}function K(){let L=e.querySelector(".sv__body");L&&(L.scrollTop=L.scrollHeight)}function V(L){i.has(L)?i.delete(L):i.add(L),y()}function Z(){l=!l,y()}function le(L){er(L).then(T=>{T?ie("\uBCF5\uC0AC\uB428","success",1200):ie("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function xe(L){!o||!L||(a={...a,...L},y())}function Fe(L){let T=L.target;if(!T||!T.classList||!T.classList.contains("sv__body"))return;!(T.scrollHeight-T.scrollTop-T.clientHeight<=4)&&l&&(l=!1,y())}e.addEventListener("scroll",Fe,!0);function $e(L){let T=L&&L.attempt_id;T&&(o=T,a=L.meta||{},l=!0,i.clear(),d.clear(),!f&&n&&(f=n.subscribe(y)),r&&Promise.resolve(r("subscribe-session-log",{id:`session-log:${o}`,attempt_id:o})).catch(()=>{}),y())}function X(){let L=o;o=null,i.clear(),d.clear(),R(),r&&L&&Promise.resolve(r("unsubscribe-session-log",{id:`session-log:${L}`})).catch(()=>{}),Re(c``,e),s&&s()}return{open:$e,updateMeta:xe,close:X,isOpen(){return o!==null},destroy(){R(),f&&(f(),f=null),e.removeEventListener("scroll",Fe,!0),o=null,Re(c``,e)}}}function Al(e){let t=e&&e.metadata||{},r=[];return typeof t.spec_id=="string"&&t.spec_id.trim().length>0&&r.push({kind:"spec",path:t.spec_id.trim()}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&r.push({kind:"plan",path:t.plan_path.trim()}),r}function Mo(e,t){let r=Al(e);return c`
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
                  @click=${s=>t.onOpenDoc(s,n.path)}
                >
                  열기
                </button>
              </div>`)}
          <div class="detail-art__cap">경로 클릭 = 복사 · 열기 = 뷰어</div>
        `}
  `}var Bn=["opus","sonnet","haiku","fable"],Un=["low","medium","high","xhigh"],zn=["codex","opus","fable","self","skip"],Hn=["opus","fable","sonnet","haiku"],Tl=["standard","fast_track"],Wn={orchestration_model:"(\uAE30\uBCF8: opus)",orchestration_effort:"(\uAE30\uBCF8: CLI \uAE30\uBCF8)",review_model:"(\uAE30\uBCF8: codex)",impl_model:"(\uAE30\uBCF8: \uD2F0\uC5B4 \uC790\uB3D9)"};function sn(e,t){let r=t&&t[e];return typeof r=="string"&&r.length>0?`(\uAE30\uBCF8: ${r} \u2014 \uC804\uC5ED)`:Wn[e]||"(\uAE30\uBCF8)"}function Ar(e,t,r,n,s,o){return c`
    <div class="detail-kv">
      <span class="detail-kv__k">${t}</span>
      <select
        class=${s?"detail-kv__v detail-kv__v--sel":"detail-kv__v"}
        aria-label=${t}
        data-key=${e}
        @change=${a=>o.onChange(e,a.target.value)}
      >
        ${r.map(a=>c`<option value=${a.value} ?selected=${a.value===n}>
              ${a.label}
            </option>`)}
      </select>
    </div>
  `}function Tr(e,t){let r=e.map(n=>({value:n,label:n}));return typeof t=="string"?[{value:"",label:t},...r]:r}function No(e,t,r){let n=e&&e.metadata||{},s=r&&typeof r=="object"?r:{},o=n.workflow_mode==="fast_track"?"fast_track":"standard";return c`
    <div class="detail-section-label">실행 설정 (수정 가능)</div>
    ${Ar("orchestration_model","orchestration_model",Tr(Bn,sn("orchestration_model",s)),n.orchestration_model||"",!1,t)}
    ${Ar("orchestration_effort","orchestration_effort",Tr(Un,sn("orchestration_effort",s)),n.orchestration_effort||"",!1,t)}
    ${Ar("review_model","review_model",Tr(zn,sn("review_model",s)),n.review_model||"",!1,t)}
    ${Ar("impl_model","impl_model",Tr(Hn,sn("impl_model",s)),n.impl_model||"",!1,t)}
    ${Ar("workflow_mode","workflow_mode",Tr(Tl),o,n.workflow_mode==="fast_track",t)}
  `}var{entries:Go,setPrototypeOf:Po,isFrozen:El,getPrototypeOf:Cl,getOwnPropertyDescriptor:Rl}=Object,{freeze:ft,seal:kt,create:Xn}=Object,{apply:Qn,construct:Jn}=typeof Reflect<"u"&&Reflect;ft||(ft=function(t){return t});kt||(kt=function(t){return t});Qn||(Qn=function(t,r){for(var n=arguments.length,s=new Array(n>2?n-2:0),o=2;o<n;o++)s[o-2]=arguments[o];return t.apply(r,s)});Jn||(Jn=function(t){for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return new t(...n)});var on=_t(Array.prototype.forEach),Ll=_t(Array.prototype.lastIndexOf),Fo=_t(Array.prototype.pop),Er=_t(Array.prototype.push),Il=_t(Array.prototype.splice),ln=_t(String.prototype.toLowerCase),Gn=_t(String.prototype.toString),jn=_t(String.prototype.match),Cr=_t(String.prototype.replace),Dl=_t(String.prototype.indexOf),Ol=_t(String.prototype.trim),xt=_t(Object.prototype.hasOwnProperty),pt=_t(RegExp.prototype.test),Rr=Ml(TypeError);function _t(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return Qn(e,t,n)}}function Ml(e){return function(){for(var t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];return Jn(e,r)}}function ke(e,t){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:ln;Po&&Po(e,null);let n=t.length;for(;n--;){let s=t[n];if(typeof s=="string"){let o=r(s);o!==s&&(El(t)||(t[n]=o),s=o)}e[s]=!0}return e}function Nl(e){for(let t=0;t<e.length;t++)xt(e,t)||(e[t]=null);return e}function Pt(e){let t=Xn(null);for(let[r,n]of Go(e))xt(e,r)&&(Array.isArray(n)?t[r]=Nl(n):n&&typeof n=="object"&&n.constructor===Object?t[r]=Pt(n):t[r]=n);return t}function Lr(e,t){for(;e!==null;){let n=Rl(e,t);if(n){if(n.get)return _t(n.get);if(typeof n.value=="function")return _t(n.value)}e=Cl(e)}function r(){return null}return r}var qo=ft(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Yn=ft(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Vn=ft(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Pl=ft(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Kn=ft(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Fl=ft(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Bo=ft(["#text"]),Uo=ft(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),Zn=ft(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),zo=ft(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),an=ft(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),ql=kt(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Bl=kt(/<%[\w\W]*|[\w\W]*%>/gm),Ul=kt(/\$\{[\w\W]*/gm),zl=kt(/^data-[\-\w.\u00B7-\uFFFF]+$/),Hl=kt(/^aria-[\-\w]+$/),jo=kt(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Wl=kt(/^(?:\w+script|data):/i),Gl=kt(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Yo=kt(/^html$/i),jl=kt(/^[a-z][.\w]*(-[.\w]+)+$/i),Ho=Object.freeze({__proto__:null,ARIA_ATTR:Hl,ATTR_WHITESPACE:Gl,CUSTOM_ELEMENT:jl,DATA_ATTR:zl,DOCTYPE_NAME:Yo,ERB_EXPR:Bl,IS_ALLOWED_URI:jo,IS_SCRIPT_OR_DATA:Wl,MUSTACHE_EXPR:ql,TMPLIT_EXPR:Ul}),Ir={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},Yl=function(){return typeof window>"u"?null:window},Vl=function(t,r){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let n=null,s="data-tt-policy-suffix";r&&r.hasAttribute(s)&&(n=r.getAttribute(s));let o="dompurify"+(n?"#"+n:"");try{return t.createPolicy(o,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},Wo=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Vo(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Yl(),t=I=>Vo(I);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==Ir.document||!e.Element)return t.isSupported=!1,t;let{document:r}=e,n=r,s=n.currentScript,{DocumentFragment:o,HTMLTemplateElement:a,Node:l,Element:i,NodeFilter:d,NamedNodeMap:f=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:_,DOMParser:m,trustedTypes:$}=e,x=i.prototype,g=Lr(x,"cloneNode"),R=Lr(x,"remove"),H=Lr(x,"nextSibling"),W=Lr(x,"childNodes"),j=Lr(x,"parentNode");if(typeof a=="function"){let I=r.createElement("template");I.content&&I.content.ownerDocument&&(r=I.content.ownerDocument)}let P,A="",{implementation:S,createNodeIterator:O,createDocumentFragment:y,getElementsByTagName:K}=r,{importNode:V}=n,Z=Wo();t.isSupported=typeof Go=="function"&&typeof j=="function"&&S&&S.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:le,ERB_EXPR:xe,TMPLIT_EXPR:Fe,DATA_ATTR:$e,ARIA_ATTR:X,IS_SCRIPT_OR_DATA:L,ATTR_WHITESPACE:T,CUSTOM_ELEMENT:B}=Ho,{IS_ALLOWED_URI:he}=Ho,ee=null,ue=ke({},[...qo,...Yn,...Vn,...Kn,...Bo]),se=null,ze=ke({},[...Uo,...Zn,...zo,...an]),fe=Object.seal(Xn(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Pe=null,Ge=null,Ue=Object.seal(Xn(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),nt=!0,Xe=!0,F=!1,G=!0,M=!1,re=!0,ce=!1,ge=!1,de=!1,Se=!1,Ie=!1,st=!1,it=!0,Qe=!1,He="user-content-",ot=!0,Ae=!1,Je={},N=null,U=ke({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),ne=null,te=ke({},["audio","video","img","source","image","track"]),oe=null,ve=ke({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),ye="http://www.w3.org/1998/Math/MathML",Te="http://www.w3.org/2000/svg",pe="http://www.w3.org/1999/xhtml",v=pe,q=!1,E=null,J=ke({},[ye,Te,pe],Gn),je=ke({},["mi","mo","mn","ms","mtext"]),u=ke({},["annotation-xml"]),w=ke({},["title","style","font","a","script"]),D=null,_e=["application/xhtml+xml","text/html"],Oe="text/html",be=null,De=null,qe=r.createElement("form"),et=function(p){return p instanceof RegExp||p instanceof Function},lt=function(){let p=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(De&&De===p)){if((!p||typeof p!="object")&&(p={}),p=Pt(p),D=_e.indexOf(p.PARSER_MEDIA_TYPE)===-1?Oe:p.PARSER_MEDIA_TYPE,be=D==="application/xhtml+xml"?Gn:ln,ee=xt(p,"ALLOWED_TAGS")?ke({},p.ALLOWED_TAGS,be):ue,se=xt(p,"ALLOWED_ATTR")?ke({},p.ALLOWED_ATTR,be):ze,E=xt(p,"ALLOWED_NAMESPACES")?ke({},p.ALLOWED_NAMESPACES,Gn):J,oe=xt(p,"ADD_URI_SAFE_ATTR")?ke(Pt(ve),p.ADD_URI_SAFE_ATTR,be):ve,ne=xt(p,"ADD_DATA_URI_TAGS")?ke(Pt(te),p.ADD_DATA_URI_TAGS,be):te,N=xt(p,"FORBID_CONTENTS")?ke({},p.FORBID_CONTENTS,be):U,Pe=xt(p,"FORBID_TAGS")?ke({},p.FORBID_TAGS,be):Pt({}),Ge=xt(p,"FORBID_ATTR")?ke({},p.FORBID_ATTR,be):Pt({}),Je=xt(p,"USE_PROFILES")?p.USE_PROFILES:!1,nt=p.ALLOW_ARIA_ATTR!==!1,Xe=p.ALLOW_DATA_ATTR!==!1,F=p.ALLOW_UNKNOWN_PROTOCOLS||!1,G=p.ALLOW_SELF_CLOSE_IN_ATTR!==!1,M=p.SAFE_FOR_TEMPLATES||!1,re=p.SAFE_FOR_XML!==!1,ce=p.WHOLE_DOCUMENT||!1,Se=p.RETURN_DOM||!1,Ie=p.RETURN_DOM_FRAGMENT||!1,st=p.RETURN_TRUSTED_TYPE||!1,de=p.FORCE_BODY||!1,it=p.SANITIZE_DOM!==!1,Qe=p.SANITIZE_NAMED_PROPS||!1,ot=p.KEEP_CONTENT!==!1,Ae=p.IN_PLACE||!1,he=p.ALLOWED_URI_REGEXP||jo,v=p.NAMESPACE||pe,je=p.MATHML_TEXT_INTEGRATION_POINTS||je,u=p.HTML_INTEGRATION_POINTS||u,fe=p.CUSTOM_ELEMENT_HANDLING||{},p.CUSTOM_ELEMENT_HANDLING&&et(p.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(fe.tagNameCheck=p.CUSTOM_ELEMENT_HANDLING.tagNameCheck),p.CUSTOM_ELEMENT_HANDLING&&et(p.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(fe.attributeNameCheck=p.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),p.CUSTOM_ELEMENT_HANDLING&&typeof p.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(fe.allowCustomizedBuiltInElements=p.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),M&&(Xe=!1),Ie&&(Se=!0),Je&&(ee=ke({},Bo),se=[],Je.html===!0&&(ke(ee,qo),ke(se,Uo)),Je.svg===!0&&(ke(ee,Yn),ke(se,Zn),ke(se,an)),Je.svgFilters===!0&&(ke(ee,Vn),ke(se,Zn),ke(se,an)),Je.mathMl===!0&&(ke(ee,Kn),ke(se,zo),ke(se,an))),p.ADD_TAGS&&(typeof p.ADD_TAGS=="function"?Ue.tagCheck=p.ADD_TAGS:(ee===ue&&(ee=Pt(ee)),ke(ee,p.ADD_TAGS,be))),p.ADD_ATTR&&(typeof p.ADD_ATTR=="function"?Ue.attributeCheck=p.ADD_ATTR:(se===ze&&(se=Pt(se)),ke(se,p.ADD_ATTR,be))),p.ADD_URI_SAFE_ATTR&&ke(oe,p.ADD_URI_SAFE_ATTR,be),p.FORBID_CONTENTS&&(N===U&&(N=Pt(N)),ke(N,p.FORBID_CONTENTS,be)),ot&&(ee["#text"]=!0),ce&&ke(ee,["html","head","body"]),ee.table&&(ke(ee,["tbody"]),delete Pe.tbody),p.TRUSTED_TYPES_POLICY){if(typeof p.TRUSTED_TYPES_POLICY.createHTML!="function")throw Rr('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof p.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Rr('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');P=p.TRUSTED_TYPES_POLICY,A=P.createHTML("")}else P===void 0&&(P=Vl($,s)),P!==null&&typeof A=="string"&&(A=P.createHTML(""));ft&&ft(p),De=p}},we=ke({},[...Yn,...Vn,...Pl]),ct=ke({},[...Kn,...Fl]),wt=function(p){let C=j(p);(!C||!C.tagName)&&(C={namespaceURI:v,tagName:"template"});let Y=ln(p.tagName),Be=ln(C.tagName);return E[p.namespaceURI]?p.namespaceURI===Te?C.namespaceURI===pe?Y==="svg":C.namespaceURI===ye?Y==="svg"&&(Be==="annotation-xml"||je[Be]):!!we[Y]:p.namespaceURI===ye?C.namespaceURI===pe?Y==="math":C.namespaceURI===Te?Y==="math"&&u[Be]:!!ct[Y]:p.namespaceURI===pe?C.namespaceURI===Te&&!u[Be]||C.namespaceURI===ye&&!je[Be]?!1:!ct[Y]&&(w[Y]||!we[Y]):!!(D==="application/xhtml+xml"&&E[p.namespaceURI]):!1},tt=function(p){Er(t.removed,{element:p});try{j(p).removeChild(p)}catch{R(p)}},at=function(p,C){try{Er(t.removed,{attribute:C.getAttributeNode(p),from:C})}catch{Er(t.removed,{attribute:null,from:C})}if(C.removeAttribute(p),p==="is")if(Se||Ie)try{tt(C)}catch{}else try{C.setAttribute(p,"")}catch{}},me=function(p){let C=null,Y=null;if(de)p="<remove></remove>"+p;else{let Ye=jn(p,/^[\r\n\t ]+/);Y=Ye&&Ye[0]}D==="application/xhtml+xml"&&v===pe&&(p='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+p+"</body></html>");let Be=P?P.createHTML(p):p;if(v===pe)try{C=new m().parseFromString(Be,D)}catch{}if(!C||!C.documentElement){C=S.createDocument(v,"template",null);try{C.documentElement.innerHTML=q?A:Be}catch{}}let rt=C.body||C.documentElement;return p&&Y&&rt.insertBefore(r.createTextNode(Y),rt.childNodes[0]||null),v===pe?K.call(C,ce?"html":"body")[0]:ce?C.documentElement:rt},Ee=function(p){return O.call(p.ownerDocument||p,p,d.SHOW_ELEMENT|d.SHOW_COMMENT|d.SHOW_TEXT|d.SHOW_PROCESSING_INSTRUCTION|d.SHOW_CDATA_SECTION,null)},It=function(p){return p instanceof _&&(typeof p.nodeName!="string"||typeof p.textContent!="string"||typeof p.removeChild!="function"||!(p.attributes instanceof f)||typeof p.removeAttribute!="function"||typeof p.setAttribute!="function"||typeof p.namespaceURI!="string"||typeof p.insertBefore!="function"||typeof p.hasChildNodes!="function")},qt=function(p){return typeof l=="function"&&p instanceof l};function ut(I,p,C){on(I,Y=>{Y.call(t,p,C,De)})}let Bt=function(p){let C=null;if(ut(Z.beforeSanitizeElements,p,null),It(p))return tt(p),!0;let Y=be(p.nodeName);if(ut(Z.uponSanitizeElement,p,{tagName:Y,allowedTags:ee}),re&&p.hasChildNodes()&&!qt(p.firstElementChild)&&pt(/<[/\w!]/g,p.innerHTML)&&pt(/<[/\w!]/g,p.textContent)||p.nodeType===Ir.progressingInstruction||re&&p.nodeType===Ir.comment&&pt(/<[/\w]/g,p.data))return tt(p),!0;if(!(Ue.tagCheck instanceof Function&&Ue.tagCheck(Y))&&(!ee[Y]||Pe[Y])){if(!Pe[Y]&&h(Y)&&(fe.tagNameCheck instanceof RegExp&&pt(fe.tagNameCheck,Y)||fe.tagNameCheck instanceof Function&&fe.tagNameCheck(Y)))return!1;if(ot&&!N[Y]){let Be=j(p)||p.parentNode,rt=W(p)||p.childNodes;if(rt&&Be){let Ye=rt.length;for(let Ke=Ye-1;Ke>=0;--Ke){let mt=g(rt[Ke],!0);mt.__removalCount=(p.__removalCount||0)+1,Be.insertBefore(mt,H(p))}}}return tt(p),!0}return p instanceof i&&!wt(p)||(Y==="noscript"||Y==="noembed"||Y==="noframes")&&pt(/<\/no(script|embed|frames)/i,p.innerHTML)?(tt(p),!0):(M&&p.nodeType===Ir.text&&(C=p.textContent,on([le,xe,Fe],Be=>{C=Cr(C,Be," ")}),p.textContent!==C&&(Er(t.removed,{element:p.cloneNode()}),p.textContent=C)),ut(Z.afterSanitizeElements,p,null),!1)},Gt=function(p,C,Y){if(it&&(C==="id"||C==="name")&&(Y in r||Y in qe))return!1;if(!(Xe&&!Ge[C]&&pt($e,C))){if(!(nt&&pt(X,C))){if(!(Ue.attributeCheck instanceof Function&&Ue.attributeCheck(C,p))){if(!se[C]||Ge[C]){if(!(h(p)&&(fe.tagNameCheck instanceof RegExp&&pt(fe.tagNameCheck,p)||fe.tagNameCheck instanceof Function&&fe.tagNameCheck(p))&&(fe.attributeNameCheck instanceof RegExp&&pt(fe.attributeNameCheck,C)||fe.attributeNameCheck instanceof Function&&fe.attributeNameCheck(C,p))||C==="is"&&fe.allowCustomizedBuiltInElements&&(fe.tagNameCheck instanceof RegExp&&pt(fe.tagNameCheck,Y)||fe.tagNameCheck instanceof Function&&fe.tagNameCheck(Y))))return!1}else if(!oe[C]){if(!pt(he,Cr(Y,T,""))){if(!((C==="src"||C==="xlink:href"||C==="href")&&p!=="script"&&Dl(Y,"data:")===0&&ne[p])){if(!(F&&!pt(L,Cr(Y,T,"")))){if(Y)return!1}}}}}}}return!0},h=function(p){return p!=="annotation-xml"&&jn(p,B)},b=function(p){ut(Z.beforeSanitizeAttributes,p,null);let{attributes:C}=p;if(!C||It(p))return;let Y={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:se,forceKeepAttr:void 0},Be=C.length;for(;Be--;){let rt=C[Be],{name:Ye,namespaceURI:Ke,value:mt}=rt,Dt=be(Ye),sr=mt,Ze=Ye==="value"?sr:Ol(sr);if(Y.attrName=Dt,Y.attrValue=Ze,Y.keepAttr=!0,Y.forceKeepAttr=void 0,ut(Z.uponSanitizeAttribute,p,Y),Ze=Y.attrValue,Qe&&(Dt==="id"||Dt==="name")&&(at(Ye,p),Ze=He+Ze),re&&pt(/((--!?|])>)|<\/(style|title|textarea)/i,Ze)){at(Ye,p);continue}if(Dt==="attributename"&&jn(Ze,"href")){at(Ye,p);continue}if(Y.forceKeepAttr)continue;if(!Y.keepAttr){at(Ye,p);continue}if(!G&&pt(/\/>/i,Ze)){at(Ye,p);continue}M&&on([le,xe,Fe],Hr=>{Ze=Cr(Ze,Hr," ")});let or=be(p.nodeName);if(!Gt(or,Dt,Ze)){at(Ye,p);continue}if(P&&typeof $=="object"&&typeof $.getAttributeType=="function"&&!Ke)switch($.getAttributeType(or,Dt)){case"TrustedHTML":{Ze=P.createHTML(Ze);break}case"TrustedScriptURL":{Ze=P.createScriptURL(Ze);break}}if(Ze!==sr)try{Ke?p.setAttributeNS(Ke,Ye,Ze):p.setAttribute(Ye,Ze),It(p)?tt(p):Fo(t.removed)}catch{at(Ye,p)}}ut(Z.afterSanitizeAttributes,p,null)},Q=function I(p){let C=null,Y=Ee(p);for(ut(Z.beforeSanitizeShadowDOM,p,null);C=Y.nextNode();)ut(Z.uponSanitizeShadowNode,C,null),Bt(C),b(C),C.content instanceof o&&I(C.content);ut(Z.afterSanitizeShadowDOM,p,null)};return t.sanitize=function(I){let p=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},C=null,Y=null,Be=null,rt=null;if(q=!I,q&&(I="<!-->"),typeof I!="string"&&!qt(I))if(typeof I.toString=="function"){if(I=I.toString(),typeof I!="string")throw Rr("dirty is not a string, aborting")}else throw Rr("toString is not a function");if(!t.isSupported)return I;if(ge||lt(p),t.removed=[],typeof I=="string"&&(Ae=!1),Ae){if(I.nodeName){let mt=be(I.nodeName);if(!ee[mt]||Pe[mt])throw Rr("root node is forbidden and cannot be sanitized in-place")}}else if(I instanceof l)C=me("<!---->"),Y=C.ownerDocument.importNode(I,!0),Y.nodeType===Ir.element&&Y.nodeName==="BODY"||Y.nodeName==="HTML"?C=Y:C.appendChild(Y);else{if(!Se&&!M&&!ce&&I.indexOf("<")===-1)return P&&st?P.createHTML(I):I;if(C=me(I),!C)return Se?null:st?A:""}C&&de&&tt(C.firstChild);let Ye=Ee(Ae?I:C);for(;Be=Ye.nextNode();)Bt(Be),b(Be),Be.content instanceof o&&Q(Be.content);if(Ae)return I;if(Se){if(Ie)for(rt=y.call(C.ownerDocument);C.firstChild;)rt.appendChild(C.firstChild);else rt=C;return(se.shadowroot||se.shadowrootmode)&&(rt=V.call(n,rt,!0)),rt}let Ke=ce?C.outerHTML:C.innerHTML;return ce&&ee["!doctype"]&&C.ownerDocument&&C.ownerDocument.doctype&&C.ownerDocument.doctype.name&&pt(Yo,C.ownerDocument.doctype.name)&&(Ke="<!DOCTYPE "+C.ownerDocument.doctype.name+`>
`+Ke),M&&on([le,xe,Fe],mt=>{Ke=Cr(Ke,mt," ")}),P&&st?P.createHTML(Ke):Ke},t.setConfig=function(){let I=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};lt(I),ge=!0},t.clearConfig=function(){De=null,ge=!1},t.isValidAttribute=function(I,p,C){De||lt({});let Y=be(I),Be=be(p);return Gt(Y,Be,C)},t.addHook=function(I,p){typeof p=="function"&&Er(Z[I],p)},t.removeHook=function(I,p){if(p!==void 0){let C=Ll(Z[I],p);return C===-1?void 0:Il(Z[I],C,1)[0]}return Fo(Z[I])},t.removeHooks=function(I){Z[I]=[]},t.removeAllHooks=function(){Z=Wo()},t}var Ko=Vo();var Zo={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Xo=e=>(...t)=>({_$litDirective$:e,values:t}),cn=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,r,n){this._$Ct=t,this._$AM=r,this._$Ci=n}_$AS(t,r){return this.update(t,r)}update(t,r){return this.render(...r)}};var Dr=class extends cn{constructor(t){if(super(t),this.it=Ve,t.type!==Zo.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===Ve||t==null)return this._t=void 0,this.it=t;if(t===Kt)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let r=[t];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}};Dr.directiveName="unsafeHTML",Dr.resultType=1;var Qo=Xo(Dr);function ns(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var nr=ns();function oa(e){nr=e}var Pr={exec:()=>null};function Ce(e,t=""){let r=typeof e=="string"?e:e.source,n={replace:(s,o)=>{let a=typeof o=="string"?o:o.source;return a=a.replace(ht.caret,"$1"),r=r.replace(s,a),n},getRegex:()=>new RegExp(r,t)};return n}var Kl=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),ht={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},Zl=/^(?:[ \t]*(?:\n|$))+/,Xl=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Ql=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,Fr=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Jl=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,ss=/(?:[*+-]|\d{1,9}[.)])/,aa=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,ia=Ce(aa).replace(/bull/g,ss).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),ec=Ce(aa).replace(/bull/g,ss).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),os=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,tc=/^[^\n]+/,as=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,rc=Ce(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",as).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),nc=Ce(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,ss).getRegex(),hn="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",is=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,sc=Ce("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",is).replace("tag",hn).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),la=Ce(os).replace("hr",Fr).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",hn).getRegex(),oc=Ce(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",la).getRegex(),ls={blockquote:oc,code:Xl,def:rc,fences:Ql,heading:Jl,hr:Fr,html:sc,lheading:ia,list:nc,newline:Zl,paragraph:la,table:Pr,text:tc},Jo=Ce("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",Fr).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",hn).getRegex(),ac={...ls,lheading:ec,table:Jo,paragraph:Ce(os).replace("hr",Fr).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Jo).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",hn).getRegex()},ic={...ls,html:Ce(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",is).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Pr,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:Ce(os).replace("hr",Fr).replace("heading",` *#{1,6} *[^
]`).replace("lheading",ia).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},lc=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,cc=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,ca=/^( {2,}|\\)\n(?!\s*$)/,dc=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,gn=/[\p{P}\p{S}]/u,cs=/[\s\p{P}\p{S}]/u,da=/[^\s\p{P}\p{S}]/u,uc=Ce(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,cs).getRegex(),ua=/(?!~)[\p{P}\p{S}]/u,pc=/(?!~)[\s\p{P}\p{S}]/u,fc=/(?:[^\s\p{P}\p{S}]|~)/u,_c=Ce(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",Kl?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),pa=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,hc=Ce(pa,"u").replace(/punct/g,gn).getRegex(),gc=Ce(pa,"u").replace(/punct/g,ua).getRegex(),fa="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",mc=Ce(fa,"gu").replace(/notPunctSpace/g,da).replace(/punctSpace/g,cs).replace(/punct/g,gn).getRegex(),bc=Ce(fa,"gu").replace(/notPunctSpace/g,fc).replace(/punctSpace/g,pc).replace(/punct/g,ua).getRegex(),wc=Ce("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,da).replace(/punctSpace/g,cs).replace(/punct/g,gn).getRegex(),vc=Ce(/\\(punct)/,"gu").replace(/punct/g,gn).getRegex(),kc=Ce(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),yc=Ce(is).replace("(?:-->|$)","-->").getRegex(),$c=Ce("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",yc).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),pn=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,xc=Ce(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",pn).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),_a=Ce(/^!?\[(label)\]\[(ref)\]/).replace("label",pn).replace("ref",as).getRegex(),ha=Ce(/^!?\[(ref)\](?:\[\])?/).replace("ref",as).getRegex(),Sc=Ce("reflink|nolink(?!\\()","g").replace("reflink",_a).replace("nolink",ha).getRegex(),ea=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,ds={_backpedal:Pr,anyPunctuation:vc,autolink:kc,blockSkip:_c,br:ca,code:cc,del:Pr,emStrongLDelim:hc,emStrongRDelimAst:mc,emStrongRDelimUnd:wc,escape:lc,link:xc,nolink:ha,punctuation:uc,reflink:_a,reflinkSearch:Sc,tag:$c,text:dc,url:Pr},Ac={...ds,link:Ce(/^!?\[(label)\]\((.*?)\)/).replace("label",pn).getRegex(),reflink:Ce(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",pn).getRegex()},es={...ds,emStrongRDelimAst:bc,emStrongLDelim:gc,url:Ce(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",ea).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:Ce(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",ea).getRegex()},Tc={...es,br:Ce(ca).replace("{2,}","*").getRegex(),text:Ce(es.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},dn={normal:ls,gfm:ac,pedantic:ic},Or={normal:ds,gfm:es,breaks:Tc,pedantic:Ac},Ec={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},ta=e=>Ec[e];function Ft(e,t){if(t){if(ht.escapeTest.test(e))return e.replace(ht.escapeReplace,ta)}else if(ht.escapeTestNoEncode.test(e))return e.replace(ht.escapeReplaceNoEncode,ta);return e}function ra(e){try{e=encodeURI(e).replace(ht.percentDecode,"%")}catch{return null}return e}function na(e,t){let r=e.replace(ht.findPipe,(o,a,l)=>{let i=!1,d=a;for(;--d>=0&&l[d]==="\\";)i=!i;return i?"|":" |"}),n=r.split(ht.splitPipe),s=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),t)if(n.length>t)n.splice(t);else for(;n.length<t;)n.push("");for(;s<n.length;s++)n[s]=n[s].trim().replace(ht.slashPipe,"|");return n}function Mr(e,t,r){let n=e.length;if(n===0)return"";let s=0;for(;s<n;){let o=e.charAt(n-s-1);if(o===t&&!r)s++;else if(o!==t&&r)s++;else break}return e.slice(0,n-s)}function Cc(e,t){if(e.indexOf(t[1])===-1)return-1;let r=0;for(let n=0;n<e.length;n++)if(e[n]==="\\")n++;else if(e[n]===t[0])r++;else if(e[n]===t[1]&&(r--,r<0))return n;return r>0?-2:-1}function sa(e,t,r,n,s){let o=t.href,a=t.title||null,l=e[1].replace(s.other.outputLinkReplace,"$1");n.state.inLink=!0;let i={type:e[0].charAt(0)==="!"?"image":"link",raw:r,href:o,title:a,text:l,tokens:n.inlineTokens(l)};return n.state.inLink=!1,i}function Rc(e,t,r){let n=e.match(r.other.indentCodeCompensation);if(n===null)return t;let s=n[1];return t.split(`
`).map(o=>{let a=o.match(r.other.beginningSpace);if(a===null)return o;let[l]=a;return l.length>=s.length?o.slice(s.length):o}).join(`
`)}var fn=class{constructor(e){Ne(this,"options");Ne(this,"rules");Ne(this,"lexer");this.options=e||nr}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let r=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?r:Mr(r,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let r=t[0],n=Rc(r,t[3]||"",this.rules);return{type:"code",raw:r,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:n}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let r=t[2].trim();if(this.rules.other.endingHash.test(r)){let n=Mr(r,"#");(this.options.pedantic||!n||this.rules.other.endingSpaceChar.test(n))&&(r=n.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:Mr(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let r=Mr(t[0],`
`).split(`
`),n="",s="",o=[];for(;r.length>0;){let a=!1,l=[],i;for(i=0;i<r.length;i++)if(this.rules.other.blockquoteStart.test(r[i]))l.push(r[i]),a=!0;else if(!a)l.push(r[i]);else break;r=r.slice(i);let d=l.join(`
`),f=d.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");n=n?`${n}
${d}`:d,s=s?`${s}
${f}`:f;let _=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(f,o,!0),this.lexer.state.top=_,r.length===0)break;let m=o.at(-1);if(m?.type==="code")break;if(m?.type==="blockquote"){let $=m,x=$.raw+`
`+r.join(`
`),g=this.blockquote(x);o[o.length-1]=g,n=n.substring(0,n.length-$.raw.length)+g.raw,s=s.substring(0,s.length-$.text.length)+g.text;break}else if(m?.type==="list"){let $=m,x=$.raw+`
`+r.join(`
`),g=this.list(x);o[o.length-1]=g,n=n.substring(0,n.length-m.raw.length)+g.raw,s=s.substring(0,s.length-$.raw.length)+g.raw,r=x.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:n,tokens:o,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let r=t[1].trim(),n=r.length>1,s={type:"list",raw:"",ordered:n,start:n?+r.slice(0,-1):"",loose:!1,items:[]};r=n?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=n?r:"[*+-]");let o=this.rules.other.listItemRegex(r),a=!1;for(;e;){let i=!1,d="",f="";if(!(t=o.exec(e))||this.rules.block.hr.test(e))break;d=t[0],e=e.substring(d.length);let _=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,g=>" ".repeat(3*g.length)),m=e.split(`
`,1)[0],$=!_.trim(),x=0;if(this.options.pedantic?(x=2,f=_.trimStart()):$?x=t[1].length+1:(x=t[2].search(this.rules.other.nonSpaceChar),x=x>4?1:x,f=_.slice(x),x+=t[1].length),$&&this.rules.other.blankLine.test(m)&&(d+=m+`
`,e=e.substring(m.length+1),i=!0),!i){let g=this.rules.other.nextBulletRegex(x),R=this.rules.other.hrRegex(x),H=this.rules.other.fencesBeginRegex(x),W=this.rules.other.headingBeginRegex(x),j=this.rules.other.htmlBeginRegex(x);for(;e;){let P=e.split(`
`,1)[0],A;if(m=P,this.options.pedantic?(m=m.replace(this.rules.other.listReplaceNesting,"  "),A=m):A=m.replace(this.rules.other.tabCharGlobal,"    "),H.test(m)||W.test(m)||j.test(m)||g.test(m)||R.test(m))break;if(A.search(this.rules.other.nonSpaceChar)>=x||!m.trim())f+=`
`+A.slice(x);else{if($||_.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||H.test(_)||W.test(_)||R.test(_))break;f+=`
`+m}!$&&!m.trim()&&($=!0),d+=P+`
`,e=e.substring(P.length+1),_=A.slice(x)}}s.loose||(a?s.loose=!0:this.rules.other.doubleBlankLine.test(d)&&(a=!0)),s.items.push({type:"list_item",raw:d,task:!!this.options.gfm&&this.rules.other.listIsTask.test(f),loose:!1,text:f,tokens:[]}),s.raw+=d}let l=s.items.at(-1);if(l)l.raw=l.raw.trimEnd(),l.text=l.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let i of s.items){if(this.lexer.state.top=!1,i.tokens=this.lexer.blockTokens(i.text,[]),i.task){if(i.text=i.text.replace(this.rules.other.listReplaceTask,""),i.tokens[0]?.type==="text"||i.tokens[0]?.type==="paragraph"){i.tokens[0].raw=i.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),i.tokens[0].text=i.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let f=this.lexer.inlineQueue.length-1;f>=0;f--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[f].src)){this.lexer.inlineQueue[f].src=this.lexer.inlineQueue[f].src.replace(this.rules.other.listReplaceTask,"");break}}let d=this.rules.other.listTaskCheckbox.exec(i.raw);if(d){let f={type:"checkbox",raw:d[0]+" ",checked:d[0]!=="[ ]"};i.checked=f.checked,s.loose?i.tokens[0]&&["paragraph","text"].includes(i.tokens[0].type)&&"tokens"in i.tokens[0]&&i.tokens[0].tokens?(i.tokens[0].raw=f.raw+i.tokens[0].raw,i.tokens[0].text=f.raw+i.tokens[0].text,i.tokens[0].tokens.unshift(f)):i.tokens.unshift({type:"paragraph",raw:f.raw,text:f.raw,tokens:[f]}):i.tokens.unshift(f)}}if(!s.loose){let d=i.tokens.filter(_=>_.type==="space"),f=d.length>0&&d.some(_=>this.rules.other.anyLine.test(_.raw));s.loose=f}}if(s.loose)for(let i of s.items){i.loose=!0;for(let d of i.tokens)d.type==="text"&&(d.type="paragraph")}return s}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let r=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),n=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:r,raw:t[0],href:n,title:s}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let r=na(t[1]),n=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(r.length===n.length){for(let a of n)this.rules.other.tableAlignRight.test(a)?o.align.push("right"):this.rules.other.tableAlignCenter.test(a)?o.align.push("center"):this.rules.other.tableAlignLeft.test(a)?o.align.push("left"):o.align.push(null);for(let a=0;a<r.length;a++)o.header.push({text:r[a],tokens:this.lexer.inline(r[a]),header:!0,align:o.align[a]});for(let a of s)o.rows.push(na(a,o.header.length).map((l,i)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:o.align[i]})));return o}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let r=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:r,tokens:this.lexer.inline(r)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let r=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;let o=Mr(r.slice(0,-1),"\\");if((r.length-o.length)%2===0)return}else{let o=Cc(t[2],"()");if(o===-2)return;if(o>-1){let a=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,a).trim(),t[3]=""}}let n=t[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(n);o&&(n=o[1],s=o[3])}else s=t[3]?t[3].slice(1,-1):"";return n=n.trim(),this.rules.other.startAngleBracket.test(n)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?n=n.slice(1):n=n.slice(1,-1)),sa(t,{href:n&&n.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let r;if((r=this.rules.inline.reflink.exec(e))||(r=this.rules.inline.nolink.exec(e))){let n=(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[n.toLowerCase()];if(!s){let o=r[0].charAt(0);return{type:"text",raw:o,text:o}}return sa(r,s,r[0],this.lexer,this.rules)}}emStrong(e,t,r=""){let n=this.rules.inline.emStrongLDelim.exec(e);if(!(!n||n[3]&&r.match(this.rules.other.unicodeAlphaNumeric))&&(!(n[1]||n[2])||!r||this.rules.inline.punctuation.exec(r))){let s=[...n[0]].length-1,o,a,l=s,i=0,d=n[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(d.lastIndex=0,t=t.slice(-1*e.length+s);(n=d.exec(t))!=null;){if(o=n[1]||n[2]||n[3]||n[4]||n[5]||n[6],!o)continue;if(a=[...o].length,n[3]||n[4]){l+=a;continue}else if((n[5]||n[6])&&s%3&&!((s+a)%3)){i+=a;continue}if(l-=a,l>0)continue;a=Math.min(a,a+l+i);let f=[...n[0]][0].length,_=e.slice(0,s+n.index+f+a);if(Math.min(s,a)%2){let $=_.slice(1,-1);return{type:"em",raw:_,text:$,tokens:this.lexer.inlineTokens($)}}let m=_.slice(2,-2);return{type:"strong",raw:_,text:m,tokens:this.lexer.inlineTokens(m)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let r=t[2].replace(this.rules.other.newLineCharGlobal," "),n=this.rules.other.nonSpaceChar.test(r),s=this.rules.other.startingSpaceChar.test(r)&&this.rules.other.endingSpaceChar.test(r);return n&&s&&(r=r.substring(1,r.length-1)),{type:"codespan",raw:t[0],text:r}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let r,n;return t[2]==="@"?(r=t[1],n="mailto:"+r):(r=t[1],n=r),{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let r,n;if(t[2]==="@")r=t[0],n="mailto:"+r;else{let s;do s=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(s!==t[0]);r=t[0],t[1]==="www."?n="http://"+t[0]:n=t[0]}return{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let r=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:r}}}},St=class ts{constructor(t){Ne(this,"tokens");Ne(this,"options");Ne(this,"state");Ne(this,"inlineQueue");Ne(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||nr,this.options.tokenizer=this.options.tokenizer||new fn,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let r={other:ht,block:dn.normal,inline:Or.normal};this.options.pedantic?(r.block=dn.pedantic,r.inline=Or.pedantic):this.options.gfm&&(r.block=dn.gfm,this.options.breaks?r.inline=Or.breaks:r.inline=Or.gfm),this.tokenizer.rules=r}static get rules(){return{block:dn,inline:Or}}static lex(t,r){return new ts(r).lex(t)}static lexInline(t,r){return new ts(r).inlineTokens(t)}lex(t){t=t.replace(ht.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let r=0;r<this.inlineQueue.length;r++){let n=this.inlineQueue[r];this.inlineTokens(n.src,n.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,r=[],n=!1){for(this.options.pedantic&&(t=t.replace(ht.tabCharGlobal,"    ").replace(ht.spaceLine,""));t;){let s;if(this.options.extensions?.block?.some(a=>(s=a.call({lexer:this},t,r))?(t=t.substring(s.raw.length),r.push(s),!0):!1))continue;if(s=this.tokenizer.space(t)){t=t.substring(s.raw.length);let a=r.at(-1);s.raw.length===1&&a!==void 0?a.raw+=`
`:r.push(s);continue}if(s=this.tokenizer.code(t)){t=t.substring(s.raw.length);let a=r.at(-1);a?.type==="paragraph"||a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.at(-1).src=a.text):r.push(s);continue}if(s=this.tokenizer.fences(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.heading(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.hr(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.blockquote(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.list(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.html(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.def(t)){t=t.substring(s.raw.length);let a=r.at(-1);a?.type==="paragraph"||a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.raw,this.inlineQueue.at(-1).src=a.text):this.tokens.links[s.tag]||(this.tokens.links[s.tag]={href:s.href,title:s.title},r.push(s));continue}if(s=this.tokenizer.table(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.lheading(t)){t=t.substring(s.raw.length),r.push(s);continue}let o=t;if(this.options.extensions?.startBlock){let a=1/0,l=t.slice(1),i;this.options.extensions.startBlock.forEach(d=>{i=d.call({lexer:this},l),typeof i=="number"&&i>=0&&(a=Math.min(a,i))}),a<1/0&&a>=0&&(o=t.substring(0,a+1))}if(this.state.top&&(s=this.tokenizer.paragraph(o))){let a=r.at(-1);n&&a?.type==="paragraph"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):r.push(s),n=o.length!==t.length,t=t.substring(s.raw.length);continue}if(s=this.tokenizer.text(t)){t=t.substring(s.raw.length);let a=r.at(-1);a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):r.push(s);continue}if(t){let a="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(a);break}else throw new Error(a)}}return this.state.top=!0,r}inline(t,r=[]){return this.inlineQueue.push({src:t,tokens:r}),r}inlineTokens(t,r=[]){let n=t,s=null;if(this.tokens.links){let i=Object.keys(this.tokens.links);if(i.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(n))!=null;)i.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(n=n.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(n))!=null;)n=n.slice(0,s.index)+"++"+n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(n))!=null;)o=s[2]?s[2].length:0,n=n.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let a=!1,l="";for(;t;){a||(l=""),a=!1;let i;if(this.options.extensions?.inline?.some(f=>(i=f.call({lexer:this},t,r))?(t=t.substring(i.raw.length),r.push(i),!0):!1))continue;if(i=this.tokenizer.escape(t)){t=t.substring(i.raw.length),r.push(i);continue}if(i=this.tokenizer.tag(t)){t=t.substring(i.raw.length),r.push(i);continue}if(i=this.tokenizer.link(t)){t=t.substring(i.raw.length),r.push(i);continue}if(i=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(i.raw.length);let f=r.at(-1);i.type==="text"&&f?.type==="text"?(f.raw+=i.raw,f.text+=i.text):r.push(i);continue}if(i=this.tokenizer.emStrong(t,n,l)){t=t.substring(i.raw.length),r.push(i);continue}if(i=this.tokenizer.codespan(t)){t=t.substring(i.raw.length),r.push(i);continue}if(i=this.tokenizer.br(t)){t=t.substring(i.raw.length),r.push(i);continue}if(i=this.tokenizer.del(t)){t=t.substring(i.raw.length),r.push(i);continue}if(i=this.tokenizer.autolink(t)){t=t.substring(i.raw.length),r.push(i);continue}if(!this.state.inLink&&(i=this.tokenizer.url(t))){t=t.substring(i.raw.length),r.push(i);continue}let d=t;if(this.options.extensions?.startInline){let f=1/0,_=t.slice(1),m;this.options.extensions.startInline.forEach($=>{m=$.call({lexer:this},_),typeof m=="number"&&m>=0&&(f=Math.min(f,m))}),f<1/0&&f>=0&&(d=t.substring(0,f+1))}if(i=this.tokenizer.inlineText(d)){t=t.substring(i.raw.length),i.raw.slice(-1)!=="_"&&(l=i.raw.slice(-1)),a=!0;let f=r.at(-1);f?.type==="text"?(f.raw+=i.raw,f.text+=i.text):r.push(i);continue}if(t){let f="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(f);break}else throw new Error(f)}}return r}},_n=class{constructor(e){Ne(this,"options");Ne(this,"parser");this.options=e||nr}space(e){return""}code({text:e,lang:t,escaped:r}){let n=(t||"").match(ht.notSpaceStart)?.[0],s=e.replace(ht.endingNewline,"")+`
`;return n?'<pre><code class="language-'+Ft(n)+'">'+(r?s:Ft(s,!0))+`</code></pre>
`:"<pre><code>"+(r?s:Ft(s,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}def(e){return""}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return`<hr>
`}list(e){let t=e.ordered,r=e.start,n="";for(let a=0;a<e.items.length;a++){let l=e.items[a];n+=this.listitem(l)}let s=t?"ol":"ul",o=t&&r!==1?' start="'+r+'"':"";return"<"+s+o+`>
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${Ft(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:r}){let n=this.parser.parseInline(r),s=ra(e);if(s===null)return n;e=s;let o='<a href="'+e+'"';return t&&(o+=' title="'+Ft(t)+'"'),o+=">"+n+"</a>",o}image({href:e,title:t,text:r,tokens:n}){n&&(r=this.parser.parseInline(n,this.parser.textRenderer));let s=ra(e);if(s===null)return Ft(r);e=s;let o=`<img src="${e}" alt="${r}"`;return t&&(o+=` title="${Ft(t)}"`),o+=">",o}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:Ft(e.text)}},us=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},At=class rs{constructor(t){Ne(this,"options");Ne(this,"renderer");Ne(this,"textRenderer");this.options=t||nr,this.options.renderer=this.options.renderer||new _n,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new us}static parse(t,r){return new rs(r).parse(t)}static parseInline(t,r){return new rs(r).parseInline(t)}parse(t){let r="";for(let n=0;n<t.length;n++){let s=t[n];if(this.options.extensions?.renderers?.[s.type]){let a=s,l=this.options.extensions.renderers[a.type].call({parser:this},a);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(a.type)){r+=l||"";continue}}let o=s;switch(o.type){case"space":{r+=this.renderer.space(o);break}case"hr":{r+=this.renderer.hr(o);break}case"heading":{r+=this.renderer.heading(o);break}case"code":{r+=this.renderer.code(o);break}case"table":{r+=this.renderer.table(o);break}case"blockquote":{r+=this.renderer.blockquote(o);break}case"list":{r+=this.renderer.list(o);break}case"checkbox":{r+=this.renderer.checkbox(o);break}case"html":{r+=this.renderer.html(o);break}case"def":{r+=this.renderer.def(o);break}case"paragraph":{r+=this.renderer.paragraph(o);break}case"text":{r+=this.renderer.text(o);break}default:{let a='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return r}parseInline(t,r=this.renderer){let n="";for(let s=0;s<t.length;s++){let o=t[s];if(this.options.extensions?.renderers?.[o.type]){let l=this.options.extensions.renderers[o.type].call({parser:this},o);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){n+=l||"";continue}}let a=o;switch(a.type){case"escape":{n+=r.text(a);break}case"html":{n+=r.html(a);break}case"link":{n+=r.link(a);break}case"image":{n+=r.image(a);break}case"checkbox":{n+=r.checkbox(a);break}case"strong":{n+=r.strong(a);break}case"em":{n+=r.em(a);break}case"codespan":{n+=r.codespan(a);break}case"br":{n+=r.br(a);break}case"del":{n+=r.del(a);break}case"text":{n+=r.text(a);break}default:{let l='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return n}},un,Nr=(un=class{constructor(e){Ne(this,"options");Ne(this,"block");this.options=e||nr}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?St.lex:St.lexInline}provideParser(){return this.block?At.parse:At.parseInline}},Ne(un,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),Ne(un,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),un),Lc=class{constructor(...e){Ne(this,"defaults",ns());Ne(this,"options",this.setOptions);Ne(this,"parse",this.parseMarkdown(!0));Ne(this,"parseInline",this.parseMarkdown(!1));Ne(this,"Parser",At);Ne(this,"Renderer",_n);Ne(this,"TextRenderer",us);Ne(this,"Lexer",St);Ne(this,"Tokenizer",fn);Ne(this,"Hooks",Nr);this.use(...e)}walkTokens(e,t){let r=[];for(let n of e)switch(r=r.concat(t.call(this,n)),n.type){case"table":{let s=n;for(let o of s.header)r=r.concat(this.walkTokens(o.tokens,t));for(let o of s.rows)for(let a of o)r=r.concat(this.walkTokens(a.tokens,t));break}case"list":{let s=n;r=r.concat(this.walkTokens(s.items,t));break}default:{let s=n;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let a=s[o].flat(1/0);r=r.concat(this.walkTokens(a,t))}):s.tokens&&(r=r.concat(this.walkTokens(s.tokens,t)))}}return r}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(r=>{let n={...r};if(n.async=this.defaults.async||n.async||!1,r.extensions&&(r.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=t.renderers[s.name];o?t.renderers[s.name]=function(...a){let l=s.renderer.apply(this,a);return l===!1&&(l=o.apply(this,a)),l}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=t[s.level];o?o.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),n.extensions=t),r.renderer){let s=this.defaults.renderer||new _n(this.defaults);for(let o in r.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let a=o,l=r.renderer[a],i=s[a];s[a]=(...d)=>{let f=l.apply(s,d);return f===!1&&(f=i.apply(s,d)),f||""}}n.renderer=s}if(r.tokenizer){let s=this.defaults.tokenizer||new fn(this.defaults);for(let o in r.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let a=o,l=r.tokenizer[a],i=s[a];s[a]=(...d)=>{let f=l.apply(s,d);return f===!1&&(f=i.apply(s,d)),f}}n.tokenizer=s}if(r.hooks){let s=this.defaults.hooks||new Nr;for(let o in r.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let a=o,l=r.hooks[a],i=s[a];Nr.passThroughHooks.has(o)?s[a]=d=>{if(this.defaults.async&&Nr.passThroughHooksRespectAsync.has(o))return(async()=>{let _=await l.call(s,d);return i.call(s,_)})();let f=l.call(s,d);return i.call(s,f)}:s[a]=(...d)=>{if(this.defaults.async)return(async()=>{let _=await l.apply(s,d);return _===!1&&(_=await i.apply(s,d)),_})();let f=l.apply(s,d);return f===!1&&(f=i.apply(s,d)),f}}n.hooks=s}if(r.walkTokens){let s=this.defaults.walkTokens,o=r.walkTokens;n.walkTokens=function(a){let l=[];return l.push(o.call(this,a)),s&&(l=l.concat(s.call(this,a))),l}}this.defaults={...this.defaults,...n}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return St.lex(e,t??this.defaults)}parser(e,t){return At.parse(e,t??this.defaults)}parseMarkdown(e){return(t,r)=>{let n={...r},s={...this.defaults,...n},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&n.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=e),s.async)return(async()=>{let a=s.hooks?await s.hooks.preprocess(t):t,l=await(s.hooks?await s.hooks.provideLexer():e?St.lex:St.lexInline)(a,s),i=s.hooks?await s.hooks.processAllTokens(l):l;s.walkTokens&&await Promise.all(this.walkTokens(i,s.walkTokens));let d=await(s.hooks?await s.hooks.provideParser():e?At.parse:At.parseInline)(i,s);return s.hooks?await s.hooks.postprocess(d):d})().catch(o);try{s.hooks&&(t=s.hooks.preprocess(t));let a=(s.hooks?s.hooks.provideLexer():e?St.lex:St.lexInline)(t,s);s.hooks&&(a=s.hooks.processAllTokens(a)),s.walkTokens&&this.walkTokens(a,s.walkTokens);let l=(s.hooks?s.hooks.provideParser():e?At.parse:At.parseInline)(a,s);return s.hooks&&(l=s.hooks.postprocess(l)),l}catch(a){return o(a)}}}onError(e,t){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let n="<p>An error occurred:</p><pre>"+Ft(r.message+"",!0)+"</pre>";return t?Promise.resolve(n):n}if(t)return Promise.reject(r);throw r}}},rr=new Lc;function Le(e,t){return rr.parse(e,t)}Le.options=Le.setOptions=function(e){return rr.setOptions(e),Le.defaults=rr.defaults,oa(Le.defaults),Le};Le.getDefaults=ns;Le.defaults=nr;Le.use=function(...e){return rr.use(...e),Le.defaults=rr.defaults,oa(Le.defaults),Le};Le.walkTokens=function(e,t){return rr.walkTokens(e,t)};Le.parseInline=rr.parseInline;Le.Parser=At;Le.parser=At.parse;Le.Renderer=_n;Le.TextRenderer=us;Le.Lexer=St;Le.lexer=St.lex;Le.Tokenizer=fn;Le.Hooks=Nr;Le.parse=Le;var hp=Le.options,gp=Le.setOptions,mp=Le.use,bp=Le.walkTokens,wp=Le.parseInline;var vp=At.parse,kp=St.lex;function ga(e){let t=Le.parse(e),r=Ko.sanitize(t);return Qo(r)}function Ic(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function ma(e,t){let r=t.getWorkspacePath,n=t.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",a="",l="";function i(x){x.key==="Escape"&&s&&(x.preventDefault(),m())}document.addEventListener("keydown",i);function d(){return s?c`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>m()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${Ic(s)}</span
            >
            <button
              type="button"
              class="mv__close"
              aria-label="닫기"
              @click=${()=>m()}
            >
              ✕
            </button>
          </div>
          <div class="mv__body">
            ${o==="loading"?c`<div class="mv__status">불러오는 중…</div>`:o==="error"?c`<div class="mv__status mv__status--error">
                    ${l||"\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}
                  </div>`:ga(a)}
          </div>
        </div>
      </div>
    `:c``}function f(){Re(d(),e)}async function _(x){s=x,o="loading",a="",l="",f();let g=r?r():"";if(!g){o="error",l="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",f();return}if(!n){o="error",l="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",f();return}let R="/api/doc?workspace="+encodeURIComponent(g)+"&path="+encodeURIComponent(x);try{let H=await n(R),W=await H.json().catch(()=>({}));if(!H.ok||!W||W.ok!==!0){o="error",l="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(W&&W.error||H.status)+")",f();return}a=String(W.content||""),o="ready",f()}catch{o="error",l="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",f()}}function m(){s=null,Re(c``,e)}function $(){document.removeEventListener("keydown",i),m()}return{open:_,close:m,destroy:$}}var Dc=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"},{key:"cache_creation_input_tokens",label:"\uCE90\uC2DC \uC0DD\uC131"}],ba="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function Oc(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function Mc(e){let t=hr(e);if(!t||!e)return"";let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return c`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${t.replace(/^τ /,"\u03C4 \uCD1D ")}${r}</span
    >${e.replayed?c`<span class="detail-usage-partial" title=${ba}
          >부분 집계</span
        >`:""}`}function Nc(e){let t=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null;return c`<div class="detail-session__usage-detail">
    ${Dc.map(r=>c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${r.label}</span
          ><span class="detail-session__usage-value"
            >${Oc(e[r.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${t===null?"":c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${t.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?c`<span class="detail-session__usage-note">${ba}</span>`:""}
  </div>`}var Pc={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function Fc(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=String(t.getHours()).padStart(2,"0"),n=String(t.getMinutes()).padStart(2,"0");return`${r}:${n}`}function wa(e,t={},r={}){let n=Array.isArray(e)?e:[],s=r.expanded||new Set;if(n.length===0)return c`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let o=new Set;for(let d of n)d&&typeof d.resumed_from=="string"&&d.resumed_from.length>0&&o.add(d.resumed_from);let a=d=>{if(!(d.status==="failed"||d.status==="orphaned"))return"";let _=typeof d.session_id=="string"&&d.session_id.length>0,m=o.has(d.attempt_id),$=_&&!m,x=_?m?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return c`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${d.attempt_id}
      ?disabled=${!$}
      title=${x}
      @click=${g=>{g.stopPropagation(),$&&t.onResume&&t.onResume(d.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},l=d=>{if(!(d.status==="failed"||d.status==="orphaned")||typeof d.cause!="string"||d.cause==="")return"";let _=d.cause_detail,m=_&&typeof _.reason=="string"&&_.reason.length>0?typeof _.command=="string"&&_.command.length>0?`${_.reason} \xB7 ${_.command}`:_.reason:d.cause;return c`<div class="detail-session__cause" title=${m}>
      ${d.cause}
    </div>`},i=d=>{if(!hr(d.usage))return"";let f=s.has(d.attempt_id);return c`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${d.attempt_id}
      aria-expanded=${f?"true":"false"}
      title=${f?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${_=>{_.stopPropagation(),t.onToggleUsage&&t.onToggleUsage(d.attempt_id)}}
    >
      τ 자세히
    </button>`};return c`
    <div class="detail-section-label">
      세션 이력${Mc(r.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${n.map(d=>c`<div class="detail-session-row">
            <button
              type="button"
              class="detail-session detail-session--${d.status||"unknown"}"
              data-attempt-id=${d.attempt_id}
              @click=${()=>t.onOpen&&t.onOpen(d.attempt_id)}
            >
              <span class="detail-session__glyph"
                >${Pc[d.status||""]||"\xB7"}</span
              >
              <span class="detail-session__id">${d.attempt_id}</span>
              ${d.resumed_from?c`<span
                    class="detail-session__resumed"
                    title=${`\uC774\uC5B4\uBC1B\uC740 \uC138\uC158 (from ${d.resumed_from})`}
                    >↻</span
                  >`:""}
              <span class="detail-session__meta"
                >${[d.runner,d.model].filter(Boolean).join(" \xB7 ")}</span
              >
              ${d.session_id?c`<span class="detail-session__sid" title=${d.session_id}
                    >${String(d.session_id).slice(0,8)}</span
                  >`:""}
              ${hr(d.usage)?c`<span class="detail-session__usage"
                    >${hr(d.usage)}</span
                  >`:""}
              <span class="detail-session__time"
                >${Fc(d.started_at)}</span
              >
            </button>
            ${i(d)} ${a(d)} ${l(d)}
            ${s.has(d.attempt_id)&&d.usage?Nc(d.usage):""}
          </div>`)}
    </div>
  `}var qc=["open","in_progress","deferred","resolved","closed"],Bc=[0,1,2,3,4];function va(e,t){let r=t.issueStores,n=t.onClose,s=t.transport,o=t.onNavigate,a=t.queueStore,l=t.sessionLogStore,i=null,d=null,f={},_=!1,m=!1,$="",x="",g="";function R(){_=!1,m=!1,$="",x="",g=""}let H=document.createElement("div");H.className="md-viewer-root",document.body.appendChild(H);let W=ma(H,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),j=document.createElement("div");j.className="session-log-root",document.body.appendChild(j);let P=nn(j,{transport:s?(v,q)=>Promise.resolve(s(v,q)):void 0,sessionLogStore:l});function A(){if(!a||!i)return[];let v=a.get();return(v&&v.attempts?Object.values(v.attempts):[]).filter(E=>E&&E.bead_id===i).sort((E,J)=>(J.started_at||0)-(E.started_at||0)).map(E=>({attempt_id:E.attempt_id,bead_id:E.bead_id,status:E.status,started_at:typeof E.started_at=="number"?E.started_at:null,runner:E.runner||null,model:E.model||null,session_id:E.session_id||null,resumed_from:E.resumed_from||null,dismissed_at:typeof E.dismissed_at=="number"?E.dismissed_at:null,cause:typeof E.cause=="string"?E.cause:null,cause_detail:E.cause_detail||null,usage:E.usage||null}))}function S(){if(!a||!i)return null;let v=a.get();return Rt(v&&v.attempts||{},i)}let O=new Set;function y(v){O.has(v)?O.delete(v):O.add(v),pe()}function K(v){let q=a?a.get():null,E=q&&q.attempts?q.attempts[v]:null;P.open({attempt_id:v,meta:E?{runner:E.runner||void 0,model:E.model||void 0,effort:E.effort||void 0,status:E.status||void 0,session_id:E.session_id||void 0}:{}})}async function V(v){if(!s||!v)return;let q=()=>{let J=a?a.get():null;return J&&typeof J.revision=="number"?J.revision:0},E=await s("worker-attempt-resume",{attempt_id:v,expected_revision:q()});if(E&&E.conflict){let J=E.queue&&typeof E.queue.revision=="number"?E.queue.revision:q();E=await s("worker-attempt-resume",{attempt_id:v,expected_revision:J})}E&&E.resumed===!1&&!E.conflict&&E.reason&&ie(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${E.reason}`,"error",2400)}let Z={onOpen:K,onResume:V,onToggleUsage:y};function le(){let v=a?a.get():null,q=v&&v.exec_defaults;return q&&typeof q=="object"?q:{}}let xe=null;r&&r.subscribe&&(xe=r.subscribe(()=>X()));let Fe=null;a&&typeof a.subscribe=="function"&&(Fe=a.subscribe(()=>{i&&pe()}));function $e(v){v.key==="Escape"&&i&&(v.preventDefault(),n())}document.addEventListener("keydown",$e);function X(){if(i){if(r&&typeof r.snapshotFor=="function"){let v=r.snapshotFor("detail:"+i)||[];d=v.find(E=>E&&E.id===i)||v[0]||d}pe()}}function L(v){er(v).then(q=>{q?ie("\uBCF5\uC0AC\uB428","success",1200):ie("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function T(v){v.preventDefault(),v.stopPropagation(),i&&L(i)}function B(v,q){v.preventDefault(),v.stopPropagation(),L(q)}function he(v,q){v.preventDefault(),v.stopPropagation(),W.open(q)}function ee(v,q){f[v]=q,pe(),!(!s||!i)&&Promise.resolve(s("update-exec-settings",{id:i,key:v,value:q})).catch(()=>{ie("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}async function ue(v,q,E){if(!s||!i)return!1;try{let J=await Promise.resolve(s(v,q)),je=Array.isArray(J)?J[0]:J;return je&&typeof je=="object"&&je.id?(d=je,!0):(ie(E,"error"),!1)}catch{return ie(E,"error"),!1}}function se(v){setTimeout(()=>{try{let q=e.querySelector(v);q&&typeof q.focus=="function"&&q.focus()}catch{}},0)}function ze(){_=!0,$=d&&d.title||"",pe(),se('.detail-edit__input[data-edit="title"]')}function fe(v){$=v.target.value}function Pe(){_=!1,$="",pe()}function Ge(){ue("edit-text",{id:i,field:"title",value:$},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(q=>{q&&(_=!1,$=""),pe()})}function Ue(){m=!0,x=d&&d.description||"",pe(),se('.detail-edit__textarea[data-edit="description"]')}function nt(v){x=v.target.value}function Xe(){m=!1,x="",pe()}function F(){ue("edit-text",{id:i,field:"description",value:x},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(q=>{q&&(m=!1,x=""),pe()})}function G(v,q,E,J){if(v.key==="Escape"){v.stopPropagation(),E();return}v.key==="Enter"&&(!J||v.ctrlKey||v.metaKey)&&(v.preventDefault(),q())}function M(v){let q=v.target.value;ue("update-status",{id:i,status:q},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>pe())}function re(v){let q=Number(v.target.value);ue("update-priority",{id:i,priority:q},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>pe())}function ce(v){g=v.target.value}function ge(){let v=g.trim();v.length!==0&&ue("label-add",{id:i,label:v},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(q=>{q&&(g=""),pe()})}function de(v){if(v.key==="Escape"){v.stopPropagation(),g="",pe();return}v.key==="Enter"&&(v.preventDefault(),ge())}function Se(v){ue("label-remove",{id:i,label:v},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>pe())}let Ie={onCopyPath:B,onOpenDoc:he},st={onChange:ee};function it(v){return typeof v=="string"?v:v&&typeof v=="object"?String(v.id||v.to||v.issue_id||v.depends_on||""):""}function Qe(v){switch(v&&typeof v=="object"?String(v.dependency_type||v.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function He(v){let E=(Array.isArray(v.dependencies)?v.dependencies:[]).map(J=>({id:it(J),icon:Qe(J)})).filter(J=>J.id.length>0);return c`
      <div class="detail-section-label">의존성</div>
      ${E.length===0?c`<div class="detail-empty">의존성 없음</div>`:c`<div class="detail-deps">
            ${E.map(J=>o?c`<button
                    type="button"
                    class="detail-dep detail-dep--link"
                    @click=${()=>o(J.id)}
                  >
                    ${J.icon?`${J.icon} `:""}${J.id}
                  </button>`:c`<span class="detail-dep"
                    >${J.icon?`${J.icon} `:""}${J.id}</span
                  >`)}
          </div>`}
    `}function ot(v){let q=v.metadata||{},E=v.workflow||{},J=E.stages||{},je=J.spec&&J.spec.stale,u=J.impl&&J.impl.stale,w=E.route_source==="derived",D=E.route||q.route||"\u2014";return c`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${w?" detail-kv__v--derived":""}"
          title=${w?"route \uCD94\uB860\uAC12 (metadata \uBBF8\uD540)":"route"}
          >${w&&E.route?`${D} ? (\uCD94\uB860)`:D}</span
        >
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">spec_review</span>
        <span class="detail-kv__v"
          >${q.spec_review||"\uC5C6\uC74C"}${je?" \xB7 stale":""}</span
        >
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">impl_review</span>
        <span class="detail-kv__v"
          >${q.impl_review||"\uC5C6\uC74C"}${u?" \xB7 stale":""}</span
        >
      </div>
      ${q.pr_url?c`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${q.pr_url}</span>
          </div>`:""}
    `}let Ae={route:["spec_backed","full_plan"]};async function Je(v,q){let E=q.target.value;if(v==="route"&&d&&d.metadata&&d.metadata.route==="full_plan"&&E!=="full_plan"&&!window.confirm(`full_plan \u2192 ${E||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){pe();return}await ue("update-workflow-meta",{id:i,key:v,value:E},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),pe()}function N(v){let q=v.metadata||{};return c` ${((J,je)=>{let u=Ae[J],w=typeof q[J]=="string"?q[J]:"";return c`<div class="detail-kv">
        <span class="detail-kv__k">${J}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${J}
          data-edit=${`wfmeta-${J}`}
          @change=${D=>Je(J,D)}
        >
          <option value="" ?selected=${!u.includes(w)}>
            ${je}
          </option>
          ${u.map(D=>c`<option value=${D} ?selected=${w===D}>${D}</option>`)}
        </select>
      </div>`})("route","(\uBBF8\uC124\uC815 \xB7 \uCD94\uB860)")} `}function U(v){return _?c`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${$}
            @input=${fe}
            @keydown=${q=>G(q,Ge,Pe,!1)}
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
              @click=${Pe}
            >
              취소
            </button>
          </div>
        </div>
      `:c`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${v}</h2>
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${ze}
        >
          ✎
        </button>
      </div>
    `}function ne(v){let q=dt(v.created_at),E=dt(v.updated_at);return!q&&!E?c``:c`
      ${q?c`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${q}</span>
          </div>`:""}
      ${E?c`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${E}</span>
          </div>`:""}
    `}function te(v,q){return c`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${M}
        >
          ${qc.map(E=>c`<option value=${E} ?selected=${E===v}>${E}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${re}
        >
          ${Bc.map(E=>c`<option value=${String(E)} ?selected=${E===q}>
                P${E}
              </option>`)}
        </select>
      </div>
    `}function oe(v){return c`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${m?"":c`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${Ue}
            >
              ✎
            </button>`}
      </div>
      ${m?c`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${x}
              @input=${nt}
              @keydown=${q=>G(q,F,Xe,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${F}
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
          </div>`:c`<div class="detail-overlay__desc">
            ${v||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function ve(v){let q=typeof v.notes=="string"?v.notes:"";return q.trim().length===0?c``:c`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${q}</div>
    `}function ye(v){let q=Array.isArray(v.labels)?v.labels:[];return c`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${q.map(E=>c`<span class="detail-label-chip"
              >${E}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${E}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+E}
                @click=${()=>Se(E)}
              >
                ×
              </button></span
            >`)}
        <span class="detail-label-add">
          <input
            class="detail-label-add__input"
            aria-label="라벨 추가"
            placeholder="라벨 추가"
            .value=${g}
            @input=${ce}
            @keydown=${de}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${ge}
          >
            추가
          </button>
        </span>
      </div>
    `}function Te(){if(!i)return c``;let v=d||{},q=String(v.id||i),E=v.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",J=v.status||"open",je=typeof v.priority=="number"?Math.max(0,Math.min(4,v.priority)):"",u=v.description||"",w={...v,metadata:{...v.metadata||{},...f}};return c`
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
            @click=${T}
          >
            ${q}
          </button>
          ${U(E)} ${te(J,je)}
          ${ne(v)} ${oe(u)}
          ${ve(v)} ${ye(v)} ${He(v)}
          ${ot(v)} ${N(v)}
          ${Mo(v,Ie)}
          ${No(w,st,le())}
          ${wa(A(),Z,{total:S(),expanded:O})}
        </div>
      </div>
    `}function pe(){Re(Te(),e)}return{load(v){v!==i&&(f={},R()),i=v,d=null,X()},clear(){i=null,d=null,f={},R(),W.close(),P.close(),Re(c``,e)},destroy(){xe&&(xe(),xe=null),Fe&&(Fe(),Fe=null),document.removeEventListener("keydown",$e),W.destroy(),H.parentNode&&H.parentNode.removeChild(H),P.destroy(),j.parentNode&&j.parentNode.removeChild(j),i=null,d=null,Re(c``,e)}}}var Uc=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function ka(e,t){return Pn(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function zc(e,t,r){if(!r)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(o=>o!==e)};let n=t.hidden_labels.filter(o=>o!==e);return t.hidden_prefixes.some(o=>o.length>0&&e.startsWith(o))?{hidden_labels:n,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:n}}function ya(e,t){let{policyStore:r,transport:n,labelOptions:s}=t,o=document.createElement("dialog");o.id="display-settings-dialog",o.className="display-settings",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),e.appendChild(o);let a="";async function l(S){let O=r.get();if(O)try{let y=await n("display-policy-set",{expected_revision:O.revision,policy:S(O)});i(y),y&&y.conflict&&y.policy&&(y=await n("display-policy-set",{expected_revision:y.policy.revision,policy:S(y.policy)}),i(y)),y&&y.conflict&&ie("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC","error",4e3)}catch{ie("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function i(S){S&&S.policy&&typeof S.policy=="object"&&r.set(S.policy)}function d(S){let O=r.get();if(!O)return;let y=ka(S,O)!=="shown";l(K=>zc(S,K,y))}function f(){let S=a.trim();S.length!==0&&(a="",l(O=>O.hidden_prefixes.includes(S)?{hidden_prefixes:O.hidden_prefixes}:{hidden_prefixes:[...O.hidden_prefixes,S]}),R())}function _(S){l(O=>({hidden_prefixes:O.hidden_prefixes.filter(y=>y!==S)}))}function m(S){let O=r.get();if(!O)return;let y=O.chips[S]===!1;l(()=>({chips:{[S]:y}}))}function $(S){let O=s();return c`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">라벨 표시</h3>
        <p class="display-settings__hint">
          라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을
          누르면 그 라벨만 예외로 다시 표시됩니다.
        </p>
        ${O.length===0?c`<div class="display-settings__empty">라벨 없음</div>`:c`<div class="display-settings__pills">
              ${O.map(y=>{let K=ka(y,S);return c`<button
                  type="button"
                  class=${`display-settings__pill display-settings__pill--${K}`}
                  data-label=${y}
                  data-state=${K}
                  @click=${()=>d(y)}
                >
                  ${y}
                </button>`})}
            </div>`}
      </section>
    `}function x(S){return c`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">숨김 prefix</h3>
        <div class="display-settings__prefixes">
          ${S.hidden_prefixes.map(O=>c`<span class="display-settings__prefix">
                ${O}
                <button
                  type="button"
                  class="display-settings__prefix-remove"
                  aria-label=${`${O} \uADDC\uCE59 \uC81C\uAC70`}
                  @click=${()=>_(O)}
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
            @input=${O=>{a=String(O.target.value||"")}}
          />
          <button type="button" @click=${f}>추가</button>
        </div>
      </section>
    `}function g(S){return c`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">카드 표시 요소</h3>
        <div class="display-settings__toggles">
          ${Uc.map(([O,y])=>c`<label class="display-settings__toggle">
                <input
                  type="checkbox"
                  data-chip=${O}
                  .checked=${S.chips[O]!==!1}
                  @change=${()=>m(O)}
                />
                <span>${y}</span>
              </label>`)}
        </div>
      </section>
    `}function R(){let S=r.get();Re(c`
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
            ${S?c`${$(S)} ${x(S)}
                ${g(S)}`:c`<div class="display-settings__empty">
                  표시 정책을 불러오는 중…
                </div>`}
          </div>
        </div>
      `,o)}let H=!1,W=()=>{H=!1};o.addEventListener("close",W),o.addEventListener("cancel",W);let j=null;r.subscribe&&(j=r.subscribe(()=>{H&&R()}));function P(){H||(a="",H=!0,R(),typeof o.showModal=="function"?o.showModal():o.setAttribute("open",""))}function A(){H&&(H=!1,typeof o.close=="function"?o.close():o.removeAttribute("open"))}return{open:P,close:A,destroy(){H=!1,o.removeEventListener("close",W),o.removeEventListener("cancel",W),j&&(j(),j=null),o.remove()}}}function $a(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let r=t.querySelector("#fatal-error-title"),n=t.querySelector("#fatal-error-message"),s=t.querySelector("#fatal-error-detail"),o=t.querySelector("#fatal-error-reload"),a=t.querySelector("#fatal-error-close"),l=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},i=(d,f,_="")=>{r&&(r.textContent=d||"Unexpected Error"),n&&(n.textContent=f||"An unrecoverable error occurred.");let m=typeof _=="string"?_.trim():"";if(s&&(m.length>0?(s.textContent=m,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),a&&a.addEventListener("click",()=>l()),t.addEventListener("cancel",d=>{d.preventDefault(),l()}),{open:i,close:l,getElement(){return t}}}function xa(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";if(e<6e4)return`${Math.round(e/1e3)}\uCD08`;let t=e/6e4;return`${Number.isInteger(t)?t:Math.round(t*10)/10}\uBD84`}function Sa(e){return Array.isArray(e)?e.filter(t=>typeof t=="string").join(" "):""}var Hc={deployed:{modifier:"ok",label:"\uC131\uACF5"},launched:{modifier:"launched",label:"\uBC1C\uC0AC\uB428 \xB7 \uACB0\uACFC \uBBF8\uAD00\uCE21"},failed:{modifier:"fail",label:"\uC2E4\uD328"}},Aa=160;function Wc(e){return e.length>Aa?`${e.slice(0,Aa)}\u2026`:e}var Gc=[{key:"orchestration_model",values:()=>Bn},{key:"orchestration_effort",values:()=>Un},{key:"review_model",values:()=>zn},{key:"impl_model",values:()=>Hn}];function mn(e,t){let{queueStore:r,transport:n,getWorkspacePath:s}=t,o=document.createElement("dialog");o.id="worker-exec-defaults-dialog",o.className="exec-defaults",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),e.appendChild(o);function a(){return r&&r.get()||{revision:0,exec_defaults:{}}}function l(){let y=a();return typeof y.revision=="number"?y.revision:0}function i(){let y=a().exec_defaults;return y&&typeof y=="object"?y:{}}function d(y){y&&y.queue&&r&&r.set(y.queue)}async function f(y,K){if(!n)return;let V={key:y,value:K||null};try{let Z=await n("worker-queue-set-exec-default",{...V,expected_revision:l()});d(Z),Z&&Z.conflict&&(Z=await n("worker-queue-set-exec-default",{...V,expected_revision:l()}),d(Z)),Z&&Z.conflict&&ie("\uC804\uC5ED \uC2E4\uD589 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC","error",4e3)}catch{ie("\uC804\uC5ED \uC2E4\uD589 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function _(y,K,V){let Z=!!V&&!K.includes(V);return c`<div class="exec-defaults__row">
      <span class="exec-defaults__k">${y}</span>
      <select
        class="exec-defaults__sel"
        aria-label=${`\uC804\uC5ED ${y}`}
        data-key=${y}
        @change=${le=>{f(y,le.target.value)}}
      >
        <option value="" ?selected=${!V}>
          ${Wn[y]||"(\uAE30\uBCF8)"}
        </option>
        ${Z?c`<option value=${V} ?selected=${!0}>
              ${V} (비호환)
            </option>`:""}
        ${K.map(le=>c`<option value=${le} ?selected=${V===le}>${le}</option>`)}
      </select>
    </div>`}function m(){let y=a().workspace_info;return y&&typeof y=="object"?y:{}}function $(y,K){return c`<span
      class="exec-defaults__vd-badge exec-defaults__vd-badge--${y}"
      >${K}</span
    >`}function x(y){let K=y?Sa(y.cmd):"",V=y?xa(y.timeout_ms):"",Z=s&&s()||"<workspace \uACBD\uB85C>";return c`<div class="exec-defaults__vd-group" data-vd="verify">
      <div class="exec-defaults__vd-label">머지 전 검증 (verify)</div>
      ${K?c`<div class="exec-defaults__vd-line">
            <span class="exec-defaults__vd-cmd">${K}</span>
            ${$("config","config")}
            ${V?c`<span class="exec-defaults__vd-meta"
                  >timeout ${V}</span
                >`:""}
          </div>`:c`<div class="exec-defaults__vd-line exec-defaults__vd-absent">
            검증 없음 —
            <span class="exec-defaults__vd-cmd"
              >[worker.verify."${Z}"]</span
            >
            섹션으로 정의
          </div>`}
    </div>`}function g(y){let K=y?Sa(y.cmd):"",V=y?xa(y.timeout_ms):"",Z=V?`timeout ${V} \xB7 verify \uD1B5\uACFC \uC2DC\uC5D0\uB9CC \uC2E4\uD589`:"verify \uD1B5\uACFC \uC2DC\uC5D0\uB9CC \uC2E4\uD589",le=s&&s()||"<workspace \uACBD\uB85C>";return c`<div class="exec-defaults__vd-group" data-vd="deploy">
      <div class="exec-defaults__vd-label">머지 후 배포 (deploy)</div>
      ${K?c`<div class="exec-defaults__vd-line">
            <span class="exec-defaults__vd-cmd">${K}</span>
            ${$("config","config")}
            ${y.detached===!0?$("detached","detached"):""}
            <span class="exec-defaults__vd-meta">${Z}</span>
          </div>`:c`<div class="exec-defaults__vd-line exec-defaults__vd-absent">
            배포 없음 —
            <span class="exec-defaults__vd-cmd"
              >[worker.deploy."${le}"]</span
            >
            섹션으로 정의
          </div>`}
    </div>`}function R(y){if(!y||typeof y!="object")return"";let K=Hc[String(y.outcome)];if(!K)return"";let V=y.outcome==="failed"&&y.reason?`${K.label} \xB7 ${y.reason}`:K.label,Z=[dt(y.at),typeof y.bead_id=="string"?y.bead_id:"",typeof y.base_sha=="string"?y.base_sha.slice(0,7):""].filter(Fe=>Fe.length>0).join(" \xB7 "),le=typeof y.detail=="string"&&y.detail.length>0?Wc(y.detail):"",xe=typeof y.log_path=="string"&&y.log_path.length>0?y.log_path:"";return c`<div class="exec-defaults__vd-group" data-vd="last-deploy">
      <div class="exec-defaults__vd-label">마지막 배포</div>
      <div class="exec-defaults__vd-line">
        ${$(K.modifier,V)}
        ${Z?c`<span class="exec-defaults__vd-meta">${Z}</span>`:""}
      </div>
      ${le?c`<div class="exec-defaults__vd-line" data-vd-part="detail">
            <code class="exec-defaults__vd-cmd">${le}</code>
          </div>`:""}
      ${xe?c`<div class="exec-defaults__vd-line" data-vd-part="log-path">
            전체 로그:
            <code class="exec-defaults__vd-cmd">${xe}</code>
          </div>`:""}
    </div>`}function H(y){return c`<section class="exec-defaults__vd">
      <p class="exec-defaults__vd-title">
        검증·배포 설정
        <span class="exec-defaults__vd-ro"
          >읽기 전용 — config.toml에서 정의</span
        >
      </p>
      ${x(y.verify_cmd)} ${g(y.deploy_cmd)}
      ${R(y.last_deploy)}
    </section>`}function W(){let y=i();Re(c`
        <div class="exec-defaults__container">
          <header class="exec-defaults__header">
            <div class="exec-defaults__title">전역 실행 설정</div>
            <button
              type="button"
              class="exec-defaults__close"
              aria-label="닫기"
              @click=${O}
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
            ${Gc.map(K=>_(K.key,K.values(),y[K.key]||""))}
            ${H(m())}
          </div>
        </div>
      `,o)}let j=!1,P=()=>{j=!1};o.addEventListener("close",P),o.addEventListener("cancel",P);let A=null;r&&r.subscribe&&(A=r.subscribe(()=>{j&&W()}));function S(){j||(j=!0,W(),typeof o.showModal=="function"?o.showModal():o.setAttribute("open",""))}function O(){j&&(j=!1,typeof o.close=="function"?o.close():o.removeAttribute("open"))}return{open:S,close:O,destroy(){j=!1,o.removeEventListener("close",P),o.removeEventListener("cancel",P),A&&(A(),A=null),o.remove()}}}function mr(e){let t=bt(e.created_at),r=bt(e.updated_at);return!t&&!r?"":c`<div class="worker-mini__meta">
    ${t?c`<span title=${`\uC0DD\uC131 ${dt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&r?c`<span>·</span>`:""}${r?c`<span title=${`\uC218\uC815 ${dt(e.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </div>`}function ps(e){let t=e.draggable&&!e.done,r=Array.isArray(e.badges)?e.badges:[],n=$t(e.usage),s=e.merge_step||null,o=e.lane==="pr_wait"||!!e.revise_action,a=e.lane==="done"&&!o,l=a?bt(e.done_at):"",i=t?c`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",d=e.workspace_name?c`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",f=c`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,_=c`<span class="worker-mini__title">${e.title}</span>`,m=e.pr_url&&e.pr_number?c`<a
          class="worker-mini__pr"
          href=${e.pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="PR 열기"
          >#${e.pr_number} ↗</a
        >`:"",$=r.map(S=>S===e.live_badge?c`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${S}</span
        >`:c`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          >${S}</span
        >`),x=e.reason?c`<span class="worker-mini__reason">${e.reason}</span>`:"",g=n?c`<span class="worker-usage" title=${gr(e.usage)}
        >${n}</span
      >`:"",R=s?c`<span class="merge-step"
        >${s.label}<span class="merge-step__n"
          >${s.index}/${s.total}</span
        ></span
      >`:"",H=e.merge_action?c`<button
        type="button"
        class="worker-mini__merge"
        data-bead-id=${e.id}
        ?disabled=${e.merge_enabled===!1}
        title=${e.merge_title||""}
      >
        ${e.merge_label||"\uBA38\uC9C0"}
      </button>`:"",W=e.cancel_action?c`<button
        type="button"
        class="worker-mini__merge-cancel"
        data-bead-id=${e.id}
        ?disabled=${e.cancel_enabled===!1}
        title=${e.cancel_title||""}
      >
        취소
      </button>`:"",j=e.discard_action?c`<button
        type="button"
        class="worker-mini__discard"
        data-bead-id=${e.id}
        ?disabled=${e.discard_enabled===!1}
        title=${e.discard_enabled===!1?e.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
      >
        폐기
      </button>`:"",P=e.revise_action?c`<button
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
        </button>`:"",A=!!(n||s||e.merge_action||e.cancel_action||e.discard_action||e.revise_action);return c`<div
    class="worker-mini${o?" worker-mini--card":""}${t?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${s?" worker-mini--merging":""}${e.external?" worker-mini--external":""}"
    style=${s?`--progress: ${s.percent}%`:""}
    draggable=${t?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${a?c`<div class="worker-mini__row1">${d}${f}${_}</div>
          <div class="worker-mini__row2">
            ${g}${l?c`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${dt(e.done_at)}`}
                  >완료 ${l}</span
                >`:""}${$}${R}
            <span class="worker-mini__actions"
              >${H}${W}${j}</span
            >
            ${mr(e)}
          </div>`:o?c`<div class="worker-mini__head">
              ${i}${d}${f}${m}${$}${x}
            </div>
            <div class="worker-mini__body">${_}</div>
            ${A?c`<div class="worker-mini__foot">
                  ${g}${R}
                  <span class="worker-mini__actions"
                    >${H}${W}${j}${P}</span
                  >
                </div>`:""}
            ${mr(e)}`:c`<div class="worker-mini__line">
              ${i}${d}${f}${_}${m}${$}${x}${g}${R}${H}${W}${j}
            </div>
            ${mr(e)}`}
  </div>`}function jc(e){let t=e.draggable&&!e.done,r=e.workflow,n=r&&r.chips||{},s=n.route||r&&r.route,o=n.route_source==="derived"||!!(r&&r.route_source==="derived"),a=typeof e.reason=="string"&&e.reason.startsWith("\u26D4");return c`<div
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
            title=${o?"route \uCD94\uB860\uAC12 (metadata \uBBF8\uD540)":"route"}
            >${o?`${s} ?`:s}</span
          >`:""}
    </div>
    <div class="worker-card__title">${e.title}</div>
    ${r?rn(r,e.status):""}
    <div
      class="worker-card__foot${e.reason?"":" worker-card__foot--actions-only"}"
    >
      ${e.reason?c`<span
            class="worker-card__reason${a?" worker-card__reason--danger":""}"
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
        title=${t?"\uB300\uAE30 \uD050 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00":"spec\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}
      >
        대기로 ↴
      </button>
    </div>
    ${mr(e)}
  </div>`}function Lt(e){let t=!!e.collapsible&&!!e.collapsed,r=c`<span
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
                  </div>`:e.items.map(n=>e.lane==="candidate"?jc(n):ps(n))}
          </div>`}
  </section>`}var Ta=160;function fs(e){return e.length>Ta?`${e.slice(0,Ta)}\u2026`:e}function Yc(e){return!e||!e.reason?"":c`<div class="worker-banner__detail">
    가드:
    ${e.reason}${e.command?c` · <code>${fs(e.command)}</code>`:""}
  </div>`}function Vc(e){return e?c`<details class="worker-banner__tail">
    <summary>출력 tail</summary>
    <pre>${e}</pre>
  </details>`:""}function Kc(e){return e?c`<div class="worker-banner__log-path">
    전체 로그: <code>${e}</code>
  </div>`:""}function _s(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),r=Math.floor(t/60),n=t%60;return r>0?`${r}m ${String(n).padStart(2,"0")}s`:`${n}s`}function Zc(e){if(!e||!e.reason)return"";let t=e.reason.startsWith("export_removal_failed:");return c`<div
    class="worker-banner worker-banner--ship"
    role="alert"
    data-bead-id=${e.bead_id||""}
  >
    ⚠ ${e.bead_id||"(bead \uBBF8\uC0C1)"} 머지 완료 — capability 발행이
    실패했습니다 (${e.reason}). bead는 closed지만
    ${t?c`취소 처분된 자손의 <code>export:</code> 라벨이 남아 있어 다음
          스윕이 이를 다시 발행 대상으로 읽습니다.`:c`<code>provides:</code> 라벨이 없어 이 capability에 걸린 external
          의존은 계속 막혀 있습니다.`}
    ${e.detail?c`<div class="worker-banner__detail">
          남은 작업: <code>${fs(e.detail)}</code>
        </div>`:""}
    <div class="worker-banner__detail">
      ${t?c`수동 복구:
            <code
              >bd -C &lt;워크스페이스&gt; label remove &lt;id&gt;
              export:&lt;capability&gt;</code
            >
            실행 후 <code>bd show &lt;id&gt; --json</code>으로 라벨이 사라졌는지
            확인하세요 — 이 자손은 ship하지 마세요.`:c`수동 복구:
            <code>bd -C &lt;워크스페이스&gt; ship &lt;capability&gt;</code> 실행
            후 <code>bd show &lt;id&gt; --json</code>으로
            <code>provides:</code> 라벨을 확인하세요.`}
    </div>
    ${e.pr_url?c`<div class="worker-banner__detail">
          <code>${e.pr_url}</code>
        </div>`:""}
  </div>`}function Ea(e){let t=Array.isArray(e.cleanupFailures)?e.cleanupFailures:[];return c`<div class="worker-banners">
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
          ${e.failure.resume_attempt_id?c`<button
                type="button"
                class="worker-banner__dismiss"
                data-attempt-id=${e.failure.resume_attempt_id}
                title="이 실패를 처리 완료로 표시하고 배너를 닫습니다"
                aria-label="배너 닫기"
              >
                ✕
              </button>`:""}
          ${Yc(e.failure.cause_detail)}
        </div>`:""}
    ${t.map(r=>c`<div
          class="worker-banner worker-banner--cleanup"
          role="alert"
          data-bead-id=${r.bead_id}
        >
          ⚠ ${r.bead_id} 머지 완료 — 머지 후 정리가 <b>${r.step}</b> 단계에서
          멈췄습니다 (${r.reason}).
          <!-- capability 발행은 close 뒤에 오는 유일한 단계라 실패해도 close를
               롤백하지 않는다 (UI-4ii4). "resolved로 남아 있다"는 다른 모든
               단계에만 참이므로 여기서만 문안을 바꾼다. -->
          ${r.step==="ship_exported_capabilities"?"bead\uB294 closed\uB85C \uB0A8\uC544 \uC788\uACE0(close\uB294 \uB864\uBC31\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4)":"bead\uB294 resolved\uB85C \uB0A8\uC544 \uC788\uACE0"}
          자동 재시도는 하지 않습니다 — 정리를 사람이 마무리하세요.
          ${r.detail?c`<div class="worker-banner__detail">
                <code>${fs(r.detail)}</code>
              </div>`:""}
          ${Kc(r.log_path)} ${Vc(r.output_tail)}
        </div>`)}
    ${Zc(e.shipFailure)}
  </div>`}function Xc(e,t,r=null){let n=!!e.paused,s=n?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?_s(t-e.started_at):"\u2014",o=[e.runner,e.model].filter(Boolean).join(" \xB7 "),a=$t(e.usage),l=e.conflict_resolution?n?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,i=e.base_exception||null,d=e.attempt_id&&e.attempt_id===r;return c`<div
    class="rtile${d?" rtile--sel":""}${n?" rtile--paused":""}"
    data-bead-id=${e.bead_id}
    data-attempt-id=${e.attempt_id||""}
  >
    <div class="rtile__hd">
      <span class="rtile__dot" aria-hidden="true"></span>
      <span class="rtile__id" title="클릭하면 ID 복사">${e.bead_id}</span>
      ${e.resumed_from?c`<span
            class="rtile__resumed"
            title=${`\uC774\uC5B4\uBC1B\uC740 \uC138\uC158 (from ${e.resumed_from})`}
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
      ${n?c`<button
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
      <button type="button" class="rtile__stop" title="폐기" aria-label="폐기">
        ■
      </button>
    </div>
    <div class="rtile__title">${e.title}</div>
    ${e.current_child?c`<div class="rtile__child" title="현재 진행중 child">
          └ ${e.current_child}
        </div>`:""}
    ${o||a||l||i?c`<div class="rtile__meta">
          ${l?c`<span class="worker-mini__badge">${l}</span>`:""}
          ${i?c`<span
                class="worker-mini__badge"
                title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
                >${i}</span
              >`:""}
          ${o?c`<span class="rtile__runner">${o}</span>`:""}
          ${a?c`<span class="worker-usage" title=${gr(e.usage)}
                >${a}</span
              >`:""}
        </div>`:""}
    ${mr(e)}
    <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일): 큐
         스냅샷에는 페이즈명도 진행률도 없으므로 진행 바는 만들지 않는다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
    ${n?"":c`<div class="rtile__accent" aria-hidden="true"></div>`}
  </div>`}function hs(e,t=Date.now(),r=null){let n=Array.isArray(e)?e:[];return c`<div class="worker-rungrid" id="worker-rungrid">
    ${n.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:n.map(s=>Xc(s,t,r))}
  </div>`}function Ht(e){return c`<svg
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
  </svg>`}function gs(){return Ht(Ot`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function ms(){return Ht(Ot`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function bs(){return Ht(Ot`<rect x="4.3" y="4.3" width="7.4" height="7.4" rx="1.2" />`)}function Ca(){return Ht(Ot`<path d="M4.4 4.4 11.6 11.6M11.6 4.4 4.4 11.6" />`)}function Ra(){return Ht(Ot`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function La(){return Ht(Ot`<rect x="2.6" y="2.6" width="7.4" height="7.4" rx="1.2" />
    <path d="M6 13.4h6a1.4 1.4 0 0 0 1.4-1.4V6" />`)}function Ia(){return Ht(Ot`<circle cx="8" cy="8" r="2.1" />
    <path
      d="M8 1.9v1.8M8 12.3v1.8M1.9 8h1.8M12.3 8h1.8M3.7 3.7l1.3 1.3M11 11l1.3 1.3M12.3 3.7 11 5M5 11l-1.3 1.3"
    />`)}function Da(){return Ht(Ot`<path d="M3 3.6 8.2 8 3 12.4z" />
    <path d="M8.8 3.6 14 8l-5.2 4.4z" />`)}var qr=1,Qc=6e4,Jc={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328"},ed=new Set(["auto_merge","merged","merge","done"]),Oa={running:3,paused:2,failed:1};function td(e,t){let r=null,n=-1/0;for(let s of Object.values(e)){if(!s||s.bead_id!==t||s.status==="running")continue;let o=typeof s.finished_at=="number"?s.finished_at:typeof s.started_at=="number"?s.started_at:0;o>=n&&(n=o,r=s)}return r}function rd(e,t){let r=Object.values(e||{}),n=new Set,s=new Map;for(let a of r)!a||typeof a.bead_id!="string"||(typeof a.resumed_from=="string"&&a.resumed_from.length>0&&n.add(a.resumed_from),s.set(a.bead_id,a.attempt_id));let o=new Map;for(let a of r){if(!a||typeof a.bead_id!="string"||a.bead_id.length===0)continue;let l=null;if(a.status==="running")l="running";else if(a.status==="paused"&&!n.has(a.attempt_id))l="paused";else if(a.status==="failed"||a.status==="orphaned"){let _=t.get(a.bead_id),m=typeof _=="number"&&_>0&&typeof a.finished_at=="number"&&_>=a.finished_at;s.get(a.bead_id)===a.attempt_id&&!m&&typeof a.dismissed_at!="number"&&(l="failed")}if(!l)continue;let i=typeof a.started_at=="number"?a.started_at:null,d=o.get(a.bead_id);if(d){let _=Oa[d.run_state],m=Oa[l];if(_>m||_===m&&(d.started_at??0)>(i??0))continue}let f=typeof a.session_id=="string"&&a.session_id.length>0;o.set(a.bead_id,{attempt_id:typeof a.attempt_id=="string"?a.attempt_id:"",run_state:l,started_at:i,last_event_at:typeof a.last_event_at=="number"?a.last_event_at:null,model:typeof a.model=="string"?a.model:null,usage:Rt(e,a.bead_id),can_pause:l==="running"&&f,can_resume:l!=="running"&&f&&!n.has(a.attempt_id)})}return o}function Ma(e,t){let r=e[t];if(!r)return"";if(r.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let n=typeof r.reason=="string"?r.reason:"",s=n.indexOf(":");return s>0&&s<n.length-1?`\u26D4 ${n.slice(0,s)} (${n.slice(s+1)})`:`\u26D4 ${n}`}function Tt(e){return e&&typeof e=="object"?e:{}}function ws(e,t,r){let n=Array.isArray(e)?e:[],s=Array.isArray(t)?t:[],o=r&&typeof r.done_since=="number"?r.done_since:void 0,a=new Map;for(let g of s)g&&typeof g.root_dir=="string"&&a.set(g.root_dir,g);let l=[],i=[],d=[],f=[],_=[],m=new Map;for(let g of n){if(!g||typeof g.root_dir!="string")continue;let R=g.root_dir,H=g.name||R,W=a.get(R),j=W&&typeof W.revision=="number"?W.revision:typeof g.revision=="number"?g.revision:0,P=Tt(g.attempts),A=Tt(g.bead_titles),S=Tt(g.pr_observations),O=Tt(g.admission),y=Tt(g.revise_parked),K=Tt(g.merge_queue_state),V=Tt(g.cleanup_failed),Z=Array.isArray(g.merge_queue)?g.merge_queue:[],le=new Set(Z.filter(T=>T&&typeof T.bead_id=="string").map(T=>T.bead_id)),xe=Array.isArray(g.queue)?g.queue:[],Fe=Array.isArray(g.done)?g.done:[],$e=new Map;for(let T of Fe)T&&typeof T.bead_id=="string"&&typeof T.added_at=="number"&&$e.set(T.bead_id,T.added_at);let X=T=>({id:T,title:A[T]||T,root_dir:R,workspace_name:H,expected_revision:j,draggable:!1}),L=new Set;for(let[T,B]of rd(P,$e))L.add(T),i.push({...X(T),lane:"running",attempt_id:B.attempt_id,run_state:B.run_state,can_pause:B.can_pause,can_resume:B.can_resume,started_at:B.started_at,last_event_at:B.last_event_at,model:B.model,usage:B.usage,badges:B.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:B.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:[],alert:B.run_state==="failed"});for(let T of Array.isArray(g.pr_wait)?g.pr_wait:[]){let B=T&&T.bead_id;if(typeof B!="string"||L.has(B))continue;L.add(B);let he=Tt(S[B]),ee=Tt(he.pr),ue=he.gate?Tt(he.gate):null,se=le.has(B),ze=K.active===B,fe=T.external===!0,Pe=V[B]||null,Ge=!!ue&&ue.base_badge==="\uCDA9\uB3CC",Ue=!!Pe&&!!ue&&ue.tier==="merged",nt=fe&&!!ue&&ue.tier==="merged";d.push({...X(B),lane:"pr_wait",pr_number:typeof ee.number=="number"?ee.number:null,pr_url:typeof ee.url=="string"?ee.url:void 0,external:fe,usage:Rt(P,B),badges:Pe?["\uC815\uB9AC \uC2E4\uD328"]:[],alert:!!Pe,reason:Pe?"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644":"PR \uB300\uAE30",merge_action:!se,merge_enabled:ue?.enabled===!0||Ge||Ue||nt,merge_label:nt?"\uC815\uB9AC":Ge&&!Ue?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:nt?"\uBA38\uC9C0\uB428 \u2014 \uD074\uB9AD\uD558\uBA74 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC\uB97C \uC218\uD589\uD569\uB2C8\uB2E4":Ue?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uCC98\uC74C\uBD80\uD130 \uB2E4\uC2DC \uC218\uD589\uD569\uB2C8\uB2E4":Ge?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":ue?.enabled===!0?`\uBA38\uC9C0 (${ue.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${ue?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:se,cancel_enabled:!ze,discard_action:!fe&&!Pe&&!(ue&&ue.tier==="merged"),discard_enabled:!ze&&!se,discard_title:se?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":void 0})}for(let T=0;T<xe.length;T++){let B=xe[T],he=B&&B.bead_id;if(typeof he!="string"||L.has(he))continue;L.add(he);let ee=y[he],ue={...X(he),lane:"queue",reason:Ma(O,he),queue_position:T+1,queue_index:T,queue_length:xe.length,badges:ee?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!ee,revise_action:!!ee,revise_enabled:!!ee,revise_title:ee?ee.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${ee.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""};f.push(ue);let se=m.get(R);se?se.push(ue):m.set(R,[ue])}for(let T of Array.isArray(g.runnable)?g.runnable:[]){let B=T&&T.bead_id;typeof B!="string"||L.has(B)||(L.add(B),l.push({...X(B),title:T.title||A[B]||B,lane:"runnable",draggable:!0,reason:Ma(O,B),created_at:T.created_at??void 0,updated_at:T.updated_at??void 0,workflow:T.route?{route:T.route,chips:{route:T.route}}:null,place_index:xe.length}))}for(let T of Fe){let B=T&&T.bead_id;if(typeof B!="string"||L.has(B)||(L.add(B),o!==void 0&&typeof T.added_at=="number"&&T.added_at<o))continue;let he=td(P,B);_.push({...X(B),lane:"done",done:!0,usage:Rt(P,B),done_at:typeof T.added_at=="number"?T.added_at:void 0,done_kind:he&&typeof he.done_kind=="string"?he.done_kind:null})}}i.sort((g,R)=>(R.last_event_at??0)-(g.last_event_at??0)),_.sort((g,R)=>(R.done_at??0)-(g.done_at??0));let $=s.length>0?s:n.map(g=>({root_dir:g&&g.root_dir,name:g&&g.name,auto_advance:g&&g.auto_advance,auto_merge:g&&g.auto_merge,slots:g&&g.slots,revision:g&&g.revision,exec_defaults:g&&g.exec_defaults})),x=[];for(let g of $)!g||typeof g.root_dir!="string"||x.push({root_dir:g.root_dir,name:g.name||g.root_dir,auto_advance:g.auto_advance===!0,auto_merge:g.auto_merge===!0,slots:typeof g.slots=="number"&&g.slots>=qr?g.slots:qr,revision:typeof g.revision=="number"?g.revision:0,exec_defaults:Tt(g.exec_defaults),items:m.get(g.root_dir)||[]});return{runnable:l,queue:f,queue_groups:x,running:i,pr_wait:d,done:_,automation:{total:x.length,both_on:x.filter(g=>g.auto_advance&&g.auto_merge).length}}}function nd(e,t){if(typeof e!="number"||!Number.isFinite(e))return"";let n=t-e<Qc;return c`<span
    class="mon-beat${n?" mon-beat--live":""}"
    title=${`\uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${dt(e)}`}
    ><span class="mon-beat__dot" aria-hidden="true"></span>${n?"":c`<span class="mon-beat__age"
          >${bt(e,t)}</span
        >`}</span
  >`}function Br(e){return c`<div class="mon-c__title">${e.title}</div>`}function Ur(e){return c`<span class="mon-c__id" title="클릭하면 상세로 이동"
    >${e.id}</span
  >`}function bn(e){return e.workspace_name?c`<span class="mon-c__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:""}function vs(e){let t=$t(e.usage);return t?c`<span class="mon-c__usage" title=${gr(e.usage)}
        >${t}</span
      >`:""}function ks(e){return(Array.isArray(e.badges)?e.badges:[]).map(r=>c`<span class="mon-c__badge${e.alert?" mon-c__badge--alert":""}"
        >${r}</span
      >`)}function sd(e){return c`<span class="mon-c__ops">
    ${e.run_state==="running"?c`<button
          type="button"
          class="mon-op mon-op--pause"
          ?disabled=${e.can_pause===!1}
          aria-label="일시정지"
          title="일시정지 — 세션을 끊고 이어하기 가능 상태로 둡니다"
        >
          ${ms()}
        </button>`:c`<button
          type="button"
          class="mon-op mon-op--resume"
          ?disabled=${e.can_resume===!1}
          aria-label="이어하기"
          title="이어하기"
        >
          ${gs()}
        </button>`}
    <button
      type="button"
      class="mon-op mon-op--stop"
      aria-label="중단"
      title="중단 — 세션을 죽이고 대기 큐에서 뺍니다"
    >
      ${bs()}
    </button>
    ${e.run_state==="failed"?c`<button
          type="button"
          class="mon-op mon-op--dismiss"
          aria-label="실패 기록 닫기"
          title="실패 기록 닫기"
        >
          ${Ca()}
        </button>`:""}
  </span>`}function od(e,t){let r=typeof e.started_at=="number"?_s(t-e.started_at):"";return c`${Br(e)}
    <div class="mon-c__meta">
      ${ks(e)}${nd(e.last_event_at,t)}${Ur(e)}${bn(e)}
      ${e.model?c`<span class="mon-c__model">${e.model}</span>`:""}
      ${r?c`<span class="mon-live__elapsed">${r}</span>`:""}
      ${vs(e)}${sd(e)}
    </div>`}function ad(e){let t=e.workflow,n=(t&&t.chips||{}).route||t&&t.route,s=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),o=bt(e.updated_at);return c`${Br(e)}
    <div class="mon-c__meta">
      <span class="mon-c__grip" aria-hidden="true">⠿</span>${Ur(e)}
      ${n?c`<span class="ctl-chip ctl-chip--route">${n}</span>`:""}
      ${bn(e)}
      ${o?c`<span title=${`\uC218\uC815 ${dt(e.updated_at)}`}
            >수정 ${o}</span
          >`:""}
      ${e.reason?c`<span
            class="mon-c__reason${s?" mon-c__reason--danger":""}"
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
    </div>`}function id(e){return c`${Br(e)}
    <div class="mon-c__meta">
      <span class="mon-c__grip" aria-hidden="true">⠿</span>
      <span class="mon-live__pos">#${e.queue_position}</span>${Ur(e)}
      ${ks(e)}
      ${e.reason?c`<span class="mon-c__reason">${e.reason}</span>`:""}
      <span class="mon-c__ops">
        <button
          type="button"
          class="mon-op mon-op--up"
          ?disabled=${(e.queue_position??1)<=1}
          aria-label="한 칸 앞으로"
          title="한 칸 앞으로"
        >
          ↑
        </button>
        <button
          type="button"
          class="mon-op mon-op--down"
          ?disabled=${(e.queue_index??0)>=(e.queue_length??1)-1}
          aria-label="한 칸 뒤로"
          title="한 칸 뒤로"
        >
          ↓
        </button>
        <button
          type="button"
          class="mon-op mon-op--remove"
          aria-label="대기 큐에서 제거"
          title="대기 큐에서 제거"
        >
          ✕
        </button>
      </span>
    </div>
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
        </div>`:""}`}function ld(e){let t=!!($t(e.usage)||e.merge_action||e.cancel_action||e.discard_action);return c`${Br(e)}
    <div class="mon-c__meta">
      ${Ur(e)}${bn(e)}
      ${e.pr_url&&e.pr_number?c`<a
            class="mon-c__pr"
            href=${e.pr_url}
            target="_blank"
            rel="noreferrer noopener"
            title="PR 열기"
            >#${e.pr_number} ↗</a
          >`:""}
      ${ks(e)}
      ${e.reason?c`<span class="mon-c__reason">${e.reason}</span>`:""}
    </div>
    ${t?c`<div class="mon-c__tail">
          ${vs(e)}
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
                ?disabled=${e.discard_enabled===!1}
                title=${e.discard_enabled===!1?e.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C)"}
              >
                폐기
              </button>`:""}
        </div>`:""}`}function cd(e,t){let r=e.done_kind||"",n=r?Jc[r]||r:"",s=bt(e.done_at,t);return c`${Br(e)}
    <div class="mon-c__meta">
      ${Ur(e)}${bn(e)}
      ${n?c`<span
            class="mon-live__kind${ed.has(r)?" mon-live__kind--ok":" mon-live__kind--warn"}"
            >${n}</span
          >`:""}
      ${vs(e)}
      ${s?c`<span title=${`\uC644\uB8CC ${dt(e.done_at)}`}
            >완료 ${s}</span
          >`:""}
    </div>`}function Na(e,t){return e.lane==="running"?od(e,t):e.lane==="runnable"?ad(e):e.lane==="queue"?id(e):e.lane==="pr_wait"?ld(e):cd(e,t)}function Pa(e){let t=String(e.revision);return c`<header
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
        title=${e.auto_advance?"\uC790\uB3D9 \uC9C4\uD589 \uCF1C\uC9D0 \u2014 \uD074\uB9AD\uD558\uBA74 \uBA48\uCDA5\uB2C8\uB2E4":"\uC790\uB3D9 \uC9C4\uD589 \uAEBC\uC9D0 \u2014 \uD074\uB9AD\uD558\uBA74 \uB300\uAE30 \uD050\uB97C \uB514\uC2A4\uD328\uCE58\uD569\uB2C8\uB2E4"}
      >
        ${e.auto_advance?ms():gs()}
        <span class="mon-ctl__label">진행</span>
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
        ${Ra()}
        <span class="mon-ctl__label">머지</span>
      </button>
      <label class="mon-ctl mon-ctl--slots" title="동시에 실행할 세션 수">
        ${La()}
        <span class="mon-ctl__label">슬롯</span>
        <input
          type="number"
          class="mon-slots__input"
          min=${qr}
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
        ${Ia()}
        <span class="mon-ctl__label">설정</span>
      </button>
    </span>
  </header>`}function Fa(e){let{total:t,both_on:r}=e.automation,n=t>0&&r===t,s=Ct.find(o=>o.value===e.done_range)?.label||"";return c`<div class="mon-top">
    <button
      type="button"
      class="mon-auto-all${n?" is-active":""}"
      data-on=${n?"false":"true"}
      aria-pressed=${n?"true":"false"}
      ?disabled=${t===0}
      title=${n?"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uB055\uB2C8\uB2E4 (\uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4)":"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uCF2D\uB2C8\uB2E4"}
    >
      ${n?bs():Da()}
      <span class="mon-auto-all__label"
        >${n?"\uC804\uCCB4 \uC790\uB3D9\uD654 \uBA48\uCDA4":`\uC804\uCCB4 \uC790\uB3D9\uD654 ${r}/${t}`}</span
      >
    </button>
    <div class="mon-kpi">
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
        ${Ct.map(o=>c`<option
              value=${o.value}
              ?selected=${e.done_range===o.value}
            >
              ${o.label}
            </option>`)}
      </select>
      ${e.token_total?c`<span
            class="mon-kpi__chip mon-kpi__chip--tokens"
            title=${e.token_tooltip}
            >${s} 완료 · 누적 ${e.token_total}</span
          >`:""}
    </div>
  </div>`}function qa(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function Ba(e){let t={};for(let a of Nt)t[a]=0;let r=!1,n=0,s=0,o=0;for(let a of Array.isArray(e)?e:[]){let l=a&&a.usage;if(l&&typeof l=="object"){let i=!1;for(let d of Nt){let f=l[d];typeof f=="number"&&Number.isFinite(f)&&(t[d]+=f,r=!0,i=!0)}if(i){s+=1;let d=l.total_cost_usd;typeof d=="number"&&Number.isFinite(d)&&(n+=d,o+=1)}}}return s>0&&o===s&&(t.total_cost_usd=n),r?$t(t):null}var za="bdui.monitor.done-range";function dd(){try{let e=window.localStorage.getItem(za);return Mt(e)?e:vt}catch{return vt}}function ud(e){try{window.localStorage.setItem(za,e)}catch{}}var Ha="tab:monitor:pipeline",pd=1e3,fd=[{lane:"runnable",pane:"candidate",title:"\uC2E4\uD589\uAC00\uB2A5",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589\uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}];function Ua(e,t){let r=e.lane==="runnable"||e.lane==="queue";return c`<div
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
    ${Na(e,t)}
  </div>`}function Wa(e,t){let r=We("views:monitor"),n=t.gotoIssue,s=t.pipelineStore,o=t.transport,a=t.getWorkspacePath,l=t.switchWorkspace,i=t.now||(()=>Date.now()),d=t.confirm||(F=>typeof globalThis.confirm!="function"||globalThis.confirm(F)),f=dd();function _(){let F=Ct.find(G=>G.value===f);return F?F.label:""}let m=document.createElement("div");m.className="mon",e.appendChild(m);let $=ws(null,null),x=null,g=new Map,R=new Set;function H(F){return $.queue_groups.find(G=>G.root_dir===F)||null}let j=mn(e,{queueStore:{get(){if(!x)return{revision:0,exec_defaults:{}};let F=g.get(x);if(F)return F;let G=H(x),M=s&&s.get?s.get():null,re=(Array.isArray(M)?M:[]).find(ce=>ce&&ce.root_dir===x);return{revision:G?G.revision:0,exec_defaults:G?G.exec_defaults:{},workspace_info:re?re.workspace_info:void 0}},set(F){x&&g.set(x,F);for(let G of Array.from(R))G()},subscribe(F){return R.add(F),()=>R.delete(F)}},transport:o?(F,G)=>o(F,{...G||{},root_dir:x}):void 0,getWorkspacePath:()=>x||void 0}),P=null,A=null;async function S(F,G,M,re){if(!o||!M)return null;let ce=await o(F,{...G,root_dir:M,expected_revision:re});if(ce&&ce.conflict){let ge=ce.queue&&typeof ce.queue.revision=="number"?ce.queue.revision:re;ce=await o(F,{...G,root_dir:M,expected_revision:ge})}return ce&&ce.queue&&M&&g.set(M,ce.queue),ce}async function O(F,G,M){return!o||!M?null:await o(F,{...G,root_dir:M})}async function y(F){if(!o||!F&&!d("\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB055\uB2C8\uB2E4. \uAC01 \uB808\uD3EC\uC758 \uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uD568\uAED8 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?"))return;let G=await o("monitor-auto-toggle",{on:F}),M=G&&Array.isArray(G.failed)?G.failed:[];M.length>0&&ie(`\uC790\uB3D9\uD654 ${F?"\uCF1C\uAE30":"\uB044\uAE30"} \uC77C\uBD80 \uC2E4\uD328: ${M.map(re=>re.root_dir).join(", ")}`,"error",3200)}async function K(){let F=new Map;for(let G of $.pr_wait)F.has(G.root_dir)||F.set(G.root_dir,G.expected_revision);for(let[G,M]of F)await S("worker-merge-queue-add-all",{},G,M)}let V=null,Z=!1,le=null;function xe(){le!==null&&clearTimeout(le),le=setTimeout(()=>{le=null,Z=!1},0)}function Fe(F){let G=F.target;return typeof G?.closest=="function"?G.closest(".mon-group"):null}function $e(F){let G=Fe(F);return!G||!V?null:(G.getAttribute("data-root-dir")||"")===V.root_dir?G:null}function X(){for(let F of Array.from(m.querySelectorAll(".mon-group--drag-over")))F.classList.remove("mon-group--drag-over")}function L(F){let G=F.target,M=typeof G?.closest=="function"?G.closest('.mon-card[draggable="true"]'):null;if(M){V={bead_id:M.getAttribute("data-issue-id")||"",lane:M.getAttribute("data-lane")||"",root_dir:M.getAttribute("data-root-dir")||"",revision:Number(M.getAttribute("data-revision")||0)||0,queue_index:Number(M.getAttribute("data-queue-index")),queue_length:Number(M.getAttribute("data-queue-length")),place_index:Number(M.getAttribute("data-place-index"))},Z=!0;try{F.dataTransfer?.setData("text/plain",V.bead_id),F.dataTransfer&&(F.dataTransfer.effectAllowed="move")}catch{}}}function T(F){let G=$e(F);G&&(F.preventDefault(),F.dataTransfer&&(F.dataTransfer.dropEffect="move"),G.classList.add("mon-group--drag-over"))}function B(F){Fe(F)?.classList.remove("mon-group--drag-over")}function he(){V=null,X(),xe()}function ee(F){let G=$e(F),M=V;if(V=null,X(),!G||!M||!M.bead_id)return;F.preventDefault();let re=F.target,ce=typeof re?.closest=="function"?re.closest('.mon-card[data-lane="queue"]'):null,ge=ce&&G.contains(ce)?Number(ce.getAttribute("data-queue-index")):NaN;if(M.lane==="runnable"){let Ie=Number.isFinite(ge)?ge:M.place_index;if(!Number.isFinite(Ie))return;S("worker-queue-place",{bead_id:M.bead_id,index:Ie},M.root_dir,M.revision);return}if(M.lane!=="queue"||ce&&ce.getAttribute("data-issue-id")===M.bead_id)return;let de=M.queue_index,Se=Number.isFinite(ge)?de>ge?ge:ge-1:M.queue_length-1;!Number.isFinite(Se)||Se<0||Se===de||S("worker-queue-reorder",{bead_id:M.bead_id,to_index:Se},M.root_dir,M.revision)}function ue(F){let G={runnable:$.runnable,queue:$.queue,running:$.running,pr_wait:$.pr_wait,done:$.done};return c`${Fa({automation:$.automation,counts:{running:$.running.length,queue:$.queue.length,pr_wait:$.pr_wait.length},done_range:f,token_total:Ba($.done),token_tooltip:qa(_())})}
      <div class="worker-lanes mon-lanes">
        ${fd.map(M=>{let re=G[M.lane],ce=M.lane==="queue"?$.queue_groups.length>0?c`${$.queue_groups.map(ge=>c`<div
                        class="mon-group"
                        data-root-dir=${ge.root_dir}
                      >
                        ${Pa(ge)}
                        <div class="mon-group__list">
                          ${ge.items.map(de=>Ua(de,F))}
                        </div>
                      </div>`)}`:void 0:re.length>0?c`${re.map(ge=>Ua(ge,F))}`:void 0;return Lt({id:`monitor-${M.lane}`,lane:M.pane,title:M.lane==="done"?`\uC644\uB8CC\xB7${_()}`:M.title,items:re,empty:M.empty,body:ce,live:M.lane==="running"&&re.length>0,header_control:M.lane==="pr_wait"&&re.length>0?c`<button
                    type="button"
                    class="mon-lane-op mon-merge-all"
                    title="자격이 생기는 PR을 각 레포의 머지 큐에 한 번에 넣습니다"
                  >
                    일괄 머지
                  </button>`:""})})}
      </div>`}function se(){let F=s&&s.get?s.get():null,G=s&&s.getWorkspacesState?s.getWorkspacesState():[],M=i();$=ws(F,G,{done_since:lr(f,M)}),Re(ue(M),m)}function ze(F,G){let M=a?a():void 0;if(!G||!M||G===M||!l){n(F);return}l(G).then(()=>{n(F)}).catch(re=>{r("workspace switch for %s failed: %o",G,re)})}function fe(F){return{root_dir:F.getAttribute("data-root-dir")||"",revision:Number(F.getAttribute("data-revision")||0)||0}}function Pe(F,G){let{root_dir:M,revision:re}=fe(F),ce=F.getAttribute("data-issue-id")||"",ge=F.getAttribute("data-attempt-id")||"",de=G.classList;if(de.contains("worker-card__place")){S("worker-queue-place",{bead_id:ce,index:Number(F.getAttribute("data-place-index")||0)||0},M,re);return}if(de.contains("mon-op--up")||de.contains("mon-op--down")){let Se=Number(F.getAttribute("data-queue-index")||0)||0,Ie=de.contains("mon-op--up")?Se-1:Se+1;if(Ie<0)return;S("worker-queue-reorder",{bead_id:ce,to_index:Ie},M,re);return}if(de.contains("mon-op--remove")){S("worker-queue-remove",{bead_id:ce},M,re);return}if(de.contains("mon-op--pause")){O("worker-attempt-pause",{attempt_id:ge},M);return}if(de.contains("mon-op--stop")){O("worker-attempt-stop",{attempt_id:ge},M);return}if(de.contains("mon-op--resume")){S("worker-attempt-resume",{attempt_id:ge},M,re);return}if(de.contains("mon-op--dismiss")){S("worker-attempt-dismiss",{attempt_id:ge},M,re);return}if(de.contains("worker-mini__merge")){S("worker-merge-queue-add",{bead_id:ce},M,re);return}if(de.contains("worker-mini__merge-cancel")){S("worker-merge-queue-remove",{bead_id:ce},M,re);return}if(de.contains("worker-mini__discard")){if(!d(`${ce}: PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4. \uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`))return;S("worker-pr-discard",{bead_id:ce},M,re);return}if(de.contains("worker-mini__revise-fix")){S("worker-revise-fix",{bead_id:ce},M,re);return}de.contains("worker-mini__revise-approve")&&S("worker-revise-approve",{bead_id:ce},M,re)}function Ge(F){let G=Z;Z=!1;let M=F.target;if(!M||typeof M.closest!="function"||M.closest("dialog")||M.closest("a"))return;let re=M.closest(".mon-auto-all");if(re){F.preventDefault(),y(re.getAttribute("data-on")==="true");return}if(M.closest(".mon-merge-all")){F.preventDefault(),K();return}let ge=M.closest(".mon-ctl--advance");if(ge){F.preventDefault();let{root_dir:Qe,revision:He}=fe(ge);S("worker-queue-toggle",{on:ge.getAttribute("data-on")==="true"},Qe,He);return}let de=M.closest(".mon-ctl--merge-auto");if(de){F.preventDefault();let{root_dir:Qe,revision:He}=fe(de);S("worker-merge-auto-toggle",{on:de.getAttribute("data-on")==="true"},Qe,He);return}let Se=M.closest(".mon-ctl--exec");if(Se){F.preventDefault(),x=Se.getAttribute("data-root-dir")||null,g.delete(x||""),j.open();return}let Ie=M.closest(".mon-card");if(!Ie)return;let st=M.closest("button");if(st){F.preventDefault(),Pe(Ie,st);return}let it=Ie.getAttribute("data-issue-id");it&&!G&&(F.preventDefault(),ze(it,Ie.getAttribute("data-root-dir")||""))}function Ue(F){let G=F.target;if(!G||typeof G.closest!="function")return;let M=G.closest(".mon-done-range");if(M){f=Mt(M.value)?M.value:vt,ud(f),se();return}let re=G.closest(".mon-slots__input");if(!re)return;let{root_dir:ce,revision:ge}=fe(re),de=Number(re.value);if(!Number.isFinite(de))return;let Se=Math.max(qr,Math.floor(de));S("worker-queue-set-slots",{slots:Se},ce,ge)}e.addEventListener("click",Ge),e.addEventListener("change",Ue),e.addEventListener("dragstart",L),e.addEventListener("dragover",T),e.addEventListener("dragleave",B),e.addEventListener("drop",ee),e.addEventListener("dragend",he),s&&typeof s.subscribe=="function"&&(P=s.subscribe(()=>{try{g.clear(),se();for(let F of Array.from(R))F()}catch{}}));function nt(){A!==null&&(clearInterval(A),A=null)}function Xe(){le!==null&&(clearTimeout(le),le=null)}return{load(){r("load"),se(),A===null&&(A=setInterval(()=>{try{se()}catch{}},pd))},pause(){nt()},clear(){nt(),Xe(),P&&(P(),P=null),e.removeEventListener("click",Ge),e.removeEventListener("change",Ue),e.removeEventListener("dragstart",L),e.removeEventListener("dragover",T),e.removeEventListener("dragleave",B),e.removeEventListener("drop",ee),e.removeEventListener("dragend",he),j.destroy(),R.clear(),e.replaceChildren()}}}function Ga(e,t,r){let n=We("views:nav"),s=null;function o(i){return d=>{d.preventDefault(),n("click tab %s",i),r.gotoView(i)}}function a(){let i=t.getState(),d=i.view==="worker"||i.view==="monitor"?i.view:"board";return c`
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
        <a
          href="#/monitor"
          class="ctl-tab ${d==="monitor"?"is-active":""}"
          @click=${o("monitor")}
          >Monitor</a
        >
      </div>
    `}function l(){Re(a(),e)}return l(),s=t.subscribe(()=>l()),{destroy(){s&&(s(),s=null),Re(c``,e)}}}var ja=["bug","feature","task","epic","chore"];function Ya(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var Va=["Critical","High","Medium","Low","Backlog"];function Ka(e,t){let r=document.createElement("dialog");r.id="new-issue-dialog",r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true"),r.innerHTML=`
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
  `,e.appendChild(r);let n=r.querySelector("#new-issue-form"),s=r.querySelector("#new-title"),o=r.querySelector("#new-type"),a=r.querySelector("#new-priority"),l=r.querySelector("#new-labels"),i=r.querySelector("#new-description"),d=r.querySelector("#new-issue-error"),f=r.querySelector("#btn-cancel"),_=r.querySelector("#btn-create"),m=r.querySelector(".new-issue__close");function $(){o.replaceChildren();let A=document.createElement("option");A.value="",A.textContent="\u2014 Select \u2014",o.appendChild(A);for(let S of ja){let O=document.createElement("option");O.value=S,O.textContent=Ya(S),o.appendChild(O)}a.replaceChildren();for(let S=0;S<=4;S+=1){let O=document.createElement("option");O.value=String(S);let y=Va[S]||"Medium";O.textContent=`${S} \u2013 ${y}`,a.appendChild(O)}}$();function x(){try{typeof r.close=="function"?r.close():r.removeAttribute("open")}catch{r.removeAttribute("open")}}function g(A){s.disabled=A,o.disabled=A,a.disabled=A,l.disabled=A,i.disabled=A,f.disabled=A,_.disabled=A,_.textContent=A?"Creating\u2026":"Create"}function R(){d.textContent=""}function H(A){d.textContent=A}function W(){try{let A=window.localStorage.getItem("beads-ui.new.type");A?o.value=A:o.value="";let S=window.localStorage.getItem("beads-ui.new.priority");S&&/^\d$/.test(S)?a.value=S:a.value="2"}catch{o.value="",a.value="2"}}function j(){let A=o.value||"",S=a.value||"";A.length>0&&window.localStorage.setItem("beads-ui.new.type",A),S.length>0&&window.localStorage.setItem("beads-ui.new.priority",S)}async function P(){R();let A=String(s.value||"").trim();if(A.length===0){H("Title is required"),s.focus();return}let S=Number(a.value||"2");if(!(S>=0&&S<=4)){H("Priority must be 0..4"),a.focus();return}let O=String(o.value||""),y=String(i.value||""),K={title:A};O.length>0&&(K.type=O),String(S).length>0&&(K.priority=S),y.length>0&&(K.description=y),g(!0);try{await t("create-issue",K)}catch{g(!1),H("Failed to create issue");return}j(),g(!1),x()}return r.addEventListener("cancel",A=>{A.preventDefault(),x()}),m.addEventListener("click",()=>x()),f.addEventListener("click",()=>x()),r.addEventListener("keydown",A=>{A.key==="Enter"&&(A.ctrlKey||A.metaKey)&&(A.preventDefault(),P())}),n.addEventListener("submit",A=>{A.preventDefault(),P()}),{open(){n.reset(),R(),W();try{"showModal"in r&&typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")}catch{r.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){x()}}}var _d="tab:worker:ready",hd="tab:worker:blocked",gd="tab:worker:in-progress",wn=1;function xs(e){let t=e&&e.metadata;return!!(t&&typeof t=="object"&&t.spec_id)}var Ja="beads-ui.worker.candidate-filter",ys={show_blocked:!1,spec:"all"};function md(){try{let e=window.localStorage.getItem(Ja);if(!e)return{...ys};let t=JSON.parse(e);if(!t||typeof t!="object")return{...ys};let r=t.spec;return{show_blocked:t.show_blocked===!0,spec:r==="with"||r==="without"?r:"all"}}catch{return{...ys}}}function bd(e){try{window.localStorage.setItem(Ja,JSON.stringify(e))}catch{}}function wd(e,t){let r=l=>t.show_blocked||!l.blocked,n=l=>t.spec==="all"||(t.spec==="with"?l.has_spec:!l.has_spec),s=[],o=0,a=0;for(let l of e){let i=r(l),d=n(l);i&&d?s.push(l):!i&&d?o+=1:i&&!d&&(a+=1)}return{visible:s,hidden_blocked:o,hidden_spec:a}}var vd=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],ei="bdui.worker.candidate_sort",kd=[{value:"spec",label:"spec \uC6B0\uC120"},{value:"board",label:"Board \uC21C\uC11C"},{value:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131\uC21C"}],vn="spec";function yd(){try{let e=window.localStorage.getItem(ei);return e==="board"||e==="created"||e==="spec"?e:vn}catch{return vn}}function $d(e){try{window.localStorage.setItem(ei,e)}catch{}}var ti="bdui.worker.done-range";function xd(){try{let e=window.localStorage.getItem(ti);return Mt(e)?e:vt}catch{return vt}}function Sd(e){try{window.localStorage.setItem(ti,e)}catch{}}var Ad="(max-width: 640px)",ri="beads-ui.worker.lane-collapsed",zr={queue:!0,done:!0};function Td(){try{let e=window.localStorage.getItem(ri);if(!e)return{...zr};let t=JSON.parse(e);return!t||typeof t!="object"?{...zr}:{queue:typeof t.queue=="boolean"?t.queue:zr.queue,done:typeof t.done=="boolean"?t.done:zr.done}}catch{return{...zr}}}function Ed(e){try{window.localStorage.setItem(ri,JSON.stringify(e))}catch{}}function Za(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let r=typeof t.title=="string"?t.title:t.id||"";return r.length>22?`${r.slice(0,22)}\u2026`:r}function Cd(e,t,r){let n=Array.isArray(e)?e.slice():[];return t==="created"?n.sort(Xt):(n.sort(Zr(r)),t==="board"?n:[...n.filter(xs),...n.filter(s=>!xs(s))])}function Rd(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function Ld(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function Id(e){let r=(Array.isArray(e?.dependencies)?e.dependencies:[]).map(n=>typeof n=="string"?n:n&&n.id).filter(Boolean);return r.length>0?`\u{1F512} ${r.join(", ")}`:"\u{1F512} blocked"}var Dd=["closed_unmerged","undecidable"],Od=[{from:"\uAD00\uCE21 \uB300\uAE30",activity:"checking",to:"\uD655\uC778\uC911"},{from:"\uB85C\uCEEC\uAC80\uC99D \uB300\uAE30",activity:"verifying",to:"\uB85C\uCEEC\uAC80\uC99D \uC2E4\uD589 \uC911"}];function Md(e,t){for(let r of Od)if(e===r.from&&t===r.activity)return{label:r.to,live:!0};return{label:e,live:!1}}var $s=[{step:"merging",label:"\uBA38\uC9C0 \uC911"},{step:"base_sync",label:"base \uB3D9\uAE30\uD654"},{step:"post_merge_verify",label:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D"},{step:"deploy",label:"\uBC30\uD3EC"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"},{step:"ship_exported_capabilities",label:"capability \uBC1C\uD589"}];function Nd(e){if(typeof e!="string"||e.length===0)return null;let t=$s.length,r=$s.findIndex(n=>n.step===e);return r<0?{label:e,index:0,total:t,percent:0}:{label:$s[r].label,index:r+1,total:t,percent:Math.round((r+1)/t*100)}}function Xa(e){switch(e){case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";default:return e}}function Qa(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}function Pd(e,t,r,n,s=null,o=null,a=null,l=!1,i=null,d=!0,f=null,_=null){let m=!!i&&i.position>0,$=!!i&&i.active===!0,x=i&&i.failure||null,g=r[e]||null,R=g&&g.gate?g.gate:null,H=g&&g.pr?g.pr:null,W=[];l&&W.push("\uC138\uC158");let j=a?a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":null,P=Md(l&&R&&R.tier==="closed_unmerged"?"\uB2EB\uD798":R&&R.gate_badge||"",j?null:o&&o.activity||null);j&&W.push(j),P.label&&W.push(P.label),R&&R.base_badge&&R.base_badge!==R.gate_badge&&W.push(R.base_badge),_&&W.push(_),n&&W.push("\uC815\uB9AC \uC2E4\uD328"),m&&!$&&W.push(`\uBA38\uC9C0 \uB300\uAE30 #${i.position}`),x&&W.push(`\uC77C\uAD04 \uBA38\uC9C0 \uC2E4\uD328: ${Xa(x)}`),f&&W.push(`\uC790\uB3D9 \uC81C\uC678: ${Xa(f)}`);let A=!!R&&R.base_badge==="\uCDA9\uB3CC",S=!!R&&R.enabled===!0,O=Nd(o&&o.merge_progress?o.merge_progress.step:null),y=!!n&&!!R&&R.tier==="merged",K=l&&!!R&&R.tier==="merged",V=l&&A&&d===!1;return{id:e,title:t,reason:n?"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644":"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",external:l,pr_number:H&&typeof H.number=="number"?H.number:null,pr_url:H&&typeof H.url=="string"?H.url:"",badges:W,live_badge:a==="running"?j:j?null:P.live?P.label:null,usage:s,alert:!!R&&Dd.includes(R.tier)||!!n||!!x,merge_action:!m,cancel_action:m,cancel_enabled:!$,cancel_title:$?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard_action:!l&&!n&&!(R&&R.tier==="merged"),merge_step:O,discard_enabled:!O&&!a&&!m,discard_title:a?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":m?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":void 0,merge_enabled:!O&&!a&&!V&&(S||A||y||K),merge_label:K?"\uC815\uB9AC":A&&!O&&!y?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:O?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${O.label}`:K?"\uBA38\uC9C0\uB428 \u2014 \uD074\uB9AD\uD558\uBA74 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC\uB97C \uC218\uD589\uD569\uB2C8\uB2E4":V?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":y?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uCC98\uC74C\uBD80\uD130 \uB2E4\uC2DC \uC218\uD589\uD569\uB2C8\uB2E4":A?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":S?`\uBA38\uC9C0 (${R.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:R&&R.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${R&&R.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function Ss(e,t={}){let{transport:r,issueStores:n,queueStore:s,sessionLogStore:o,uiOrderStore:a,gotoIssue:l,getWorkspacePath:i}=t,d=n?Qr(n,a):null,f=en({transport:r,uiOrderStore:a}),_=null,m=[],$=md(),x=yd(),g=xd();function R(){let u=Ct.find(w=>w.value===g);return u?u.label:"\uC624\uB298"}let H=Td(),W=!1,j=new Set,P=new Set,A=[],S=document.createElement("div");S.className="worker-console";let O=document.createElement("div");O.className="worker-top";let y=document.createElement("div");y.className="worker-drawer-overlay",y.hidden=!0;let K=document.createElement("div");K.className="worker-drawer-overlay__backdrop";let V=document.createElement("div");V.className="worker-drawer-host",y.append(K,V);let Z=document.createElement("div");Z.className="worker-lanes-host",S.append(O,y,Z),e.appendChild(S);let le=null,xe=nn(V,{transport:r,sessionLogStore:o,onClose:()=>{le=null,y.hidden=!0,Ae()}}),Fe=mn(S,{queueStore:s,transport:r,getWorkspacePath:i});function $e(){return s&&s.get()||{revision:0,auto_advance:!1,auto_merge:!1,slots:wn,queue:[],pr_wait:[],done:[]}}function X(){let u=$e();return typeof u.revision=="number"?u.revision:0}function L(u){u&&u.queue&&s&&s.set(u.queue)}function T(){let u=$e().queue;return Array.isArray(u)?u.length:0}async function B(u,w){if(!r)return;let D=await r("worker-queue-place",{bead_id:u,index:w,expected_revision:X()});L(D),D&&D.conflict&&await r("worker-queue-place",{bead_id:u,index:w,expected_revision:X()}).then(L)}async function he(u,w){if(!r)return;let D=await r("worker-queue-reorder",{bead_id:u,to_index:w,expected_revision:X()});L(D),D&&D.conflict&&await r("worker-queue-reorder",{bead_id:u,to_index:w,expected_revision:X()}).then(L)}async function ee(u){if(!r)return;let w=await r("worker-queue-remove",{bead_id:u,expected_revision:X()});L(w),w&&w.conflict&&await r("worker-queue-remove",{bead_id:u,expected_revision:X()}).then(L)}async function ue(u){!r||!u||await r("worker-attempt-stop",{attempt_id:u})}async function se(u){if(!r||!u)return;let w=await r("worker-attempt-pause",{attempt_id:u});w&&w.paused===!1&&w.reason&&ie(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${w.reason}`,"error",2400)}async function ze(u){if(!r||!u)return;let w=await r("worker-attempt-resume",{attempt_id:u,expected_revision:X()});L(w),w&&w.conflict&&(w=await r("worker-attempt-resume",{attempt_id:u,expected_revision:X()}),L(w)),w&&w.resumed===!1&&!w.conflict&&w.reason&&ie(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${w.reason}`,"error",2400)}async function fe(u){if(!r||!u)return;let w=await r("worker-attempt-dismiss",{attempt_id:u,expected_revision:X()});L(w),w&&w.conflict&&(w=await r("worker-attempt-dismiss",{attempt_id:u,expected_revision:X()}),L(w)),w&&w.dismissed===!1&&!w.conflict&&w.reason&&ie(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${w.reason}`,"error",2400)}async function Pe(u,w){if(!r)return null;let D=r,_e=await D(u,{...w,expected_revision:X()});return L(_e),_e&&_e.conflict&&(_e=await D(u,{...w,expected_revision:X()}),L(_e)),_e}async function Ge(u){if(!r||!u)return;j.add(u),Ae();let w;try{w=await Pe("worker-merge-queue-add",{bead_id:u})}finally{j.delete(u),Ae()}!w||w.conflict||w.applied||ie("\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)","error",2400)}async function Ue(u){if(!r)return;let w=await Pe("worker-merge-auto-toggle",{on:u});!w||w.conflict||ie(u?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",u?"success":"info",2400)}async function nt(u){if(!r||!u)return;let w=await Pe("worker-merge-queue-remove",{bead_id:u});w&&!w.conflict&&!w.applied&&w.reason==="merge_active"&&ie("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function Xe(){await Pe("worker-merge-queue-remove",{all:!0})}async function F(u){if(!r||!u||!(typeof globalThis.confirm!="function"||globalThis.confirm(`${u}: PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4. \uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694. \uACC4\uC18D\uD560\uAE4C\uC694?`)))return;let D=await r("worker-pr-discard",{bead_id:u,expected_revision:X()});if(L(D),D&&D.conflict&&(D=await r("worker-pr-discard",{bead_id:u,expected_revision:X()}),L(D)),D&&D.discarded===!0){ie("\uD3D0\uAE30 \uC644\uB8CC \u2014 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB2E4\uC2DC \uC2E4\uD589\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4","success",2400);return}D&&D.discarded===!1&&!D.conflict&&ie(`\uD3D0\uAE30 \uAC70\uBD80: ${D.reason||""}`,"error",2800)}async function G(u,w){if(!r||!w||P.has(w))return;P.add(w),Ae();let D;try{D=await r(u,{bead_id:w,expected_revision:X()}),L(D),D&&D.conflict&&(D=await r(u,{bead_id:w,expected_revision:X()}),L(D))}finally{P.delete(w),Ae()}if(!(!D||D.conflict)){if(D.ok){ie(u==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}ie(`\uCC98\uBD84 \uAC70\uBD80: ${D.reason||""}`,"error",3e3)}}async function M(u){if(!r)return;let w=await r("worker-queue-toggle",{on:u,expected_revision:X()});L(w),w&&w.conflict&&await r("worker-queue-toggle",{on:u,expected_revision:X()}).then(L)}async function re(u){await M(u),await Ue(u)}async function ce(u){if(!r||!Number.isFinite(u))return;let w=Math.max(wn,Math.floor(u)),D=await r("worker-queue-set-slots",{slots:w,expected_revision:X()});L(D),D&&D.conflict&&await r("worker-queue-set-slots",{slots:w,expected_revision:X()}).then(L)}function ge(){let u=$e(),w=d?d.selectBoardColumn(_d,"ready"):[],D=d?d.selectBoardColumn(hd,"blocked"):[],_e=d?d.selectBoardColumn(gd,"in_progress"):[],Oe=new Map;for(let k of _e){let z=Ld(k);if(!z)continue;let ae=Oe.get(z);ae?ae.push(k):Oe.set(z,[k])}let be=k=>{let z=Jr(Oe.get(k)||[]);return z?z.title||z.id:null},De=u.bead_titles||{},qe=new Map;for(let[k,z]of Object.entries(De))typeof z=="string"&&z.length>0&&qe.set(k,z);for(let k of[...w,...D])qe.set(k.id,k.title||k.id);let et=u.bead_times||{},lt=new Map;for(let[k,z]of Object.entries(et))z&&typeof z=="object"&&lt.set(k,z);for(let k of[...w,...D])lt.set(k.id,{created_at:k.created_at,updated_at:k.updated_at});let we=k=>lt.get(k)||{},ct=u.pr_wait||[],wt=u.pr_observations||{},tt=u.pr_activity||{},at=u.cleanup_failed||{},me=Object.entries(at).map(([k,z])=>({bead_id:k,step:z&&z.step?z.step:"",reason:z&&z.reason?z.reason:"",detail:z&&typeof z.detail=="string"?z.detail:null,output_tail:z&&typeof z.output_tail=="string"&&z.output_tail?z.output_tail:void 0,log_path:z&&typeof z.log_path=="string"&&z.log_path?z.log_path:void 0})),Ee=u.ship_failure||null,It=Ee&&typeof Ee.reason=="string"&&Ee.reason?{bead_id:typeof Ee.bead_id=="string"?Ee.bead_id:"",reason:Ee.reason,detail:typeof Ee.detail=="string"?Ee.detail:null,pr_url:typeof Ee.pr_url=="string"?Ee.pr_url:null}:null,qt=u.queue||[],ut=new Set([...qt.map(k=>k.bead_id),...ct.map(k=>k.bead_id),...u.done.map(k=>k.bead_id)]),Bt=new Set(D.map(k=>k.id)),Gt=a?a.get()?.order||{}:{},h=new Set,b=[];for(let k of[...w,...D])ut.has(k.id)||h.has(k.id)||Rd(k)||(h.add(k.id),b.push(k));m=Cd(b,x,Gt);let Q=u.admission||{},I=k=>{let z=Q[k];if(!z)return"";if(z.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let ae=typeof z.reason=="string"?z.reason:"",Me=ae.indexOf(":");return Me>0&&Me<ae.length-1?`\u26D4 ${ae.slice(0,Me)} (${ae.slice(Me+1)})`:`\u26D4 ${ae}`},p=m.map(k=>{let z=xs(k),ae=Bt.has(k.id),Me=[];ae&&Me.push(Id(k)),z||Me.push("spec \uC5C6\uC74C");let jr=I(k.id);return jr&&Me.push(jr),{id:k.id,title:k.title||k.id,reason:Me.join(" \xB7 "),draggable:z,lane:"candidate",created_at:k.created_at,updated_at:k.updated_at,workflow:k.workflow,status:k.status,blocked:ae,has_spec:z}}),C=wd(p,$),Y=C.visible,Be=u.revise_parked||{},rt=(k,z)=>k.map(ae=>{let Me=z==="queue"?Be[ae.bead_id]:null;return{id:ae.bead_id,title:qe.get(ae.bead_id)||ae.bead_id,reason:z==="done"?"":I(ae.bead_id),draggable:z!=="done",done:z==="done",lane:z,badges:Me?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!Me,revise_action:!!Me,revise_enabled:!!Me&&!P.has(ae.bead_id),revise_title:Me?Me.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${Me.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":"",usage:z==="done"?Rt(u.attempts||{},ae.bead_id):null,done_at:z==="done"&&typeof ae.added_at=="number"?ae.added_at:void 0,...we(ae.bead_id)}}),Ye=new Map;for(let k of u.done)k&&typeof k.bead_id=="string"&&typeof k.added_at=="number"&&Ye.set(k.bead_id,k.added_at);let Ke=u.attempts?Object.values(u.attempts):[],mt=new Set;for(let k of Ke)k&&typeof k.resumed_from=="string"&&k.resumed_from.length>0&&mt.add(k.resumed_from);let Dt=new Map;for(let k of Ke)Dt.set(k.bead_id,k.attempt_id);let sr=new Map;for(let k of Ke)sr.set(k.attempt_id,k);function Ze(k){let z=new Set,ae=k;for(;ae&&!z.has(ae.attempt_id);){if(ae.conflict_resolution===!0)return!0;z.add(ae.attempt_id),ae=typeof ae.resumed_from=="string"&&ae.resumed_from.length>0&&sr.get(ae.resumed_from)||null}return!1}let or=typeof u.declared_base=="string"?u.declared_base:null;function Hr(k){let z=null;for(let ae of Ke)!ae||ae.bead_id!==k||Ze(ae)||(z===null||(typeof ae.started_at=="number"?ae.started_at:0)>=(typeof z.started_at=="number"?z.started_at:0))&&(z=ae);return z&&typeof z.target_base=="string"?z.target_base:null}let br=[],Et=null;for(let k of Ke){let z=k.status==="paused"&&!mt.has(k.attempt_id);if(k.status==="running"||z)br.push({bead_id:k.bead_id,attempt_id:k.attempt_id,title:qe.get(k.bead_id)||k.bead_id,runner:k.runner||null,model:k.model||null,effort:k.effort||null,started_at:typeof k.started_at=="number"?k.started_at:null,resumed_from:k.resumed_from||null,paused:z,conflict_resolution:Ze(k),base_exception:Qa(or,k.target_base),can_pause:typeof k.session_id=="string"&&k.session_id.length>0,usage:Rt(u.attempts||{},k.bead_id),current_child:be(k.bead_id),...we(k.bead_id)});else if(k.status==="failed"||k.status==="orphaned"){let ae=Dt.get(k.bead_id)!==k.attempt_id,Me=Ye.get(k.bead_id),jr=typeof Me=="number"&&Me>0&&typeof k.finished_at=="number"&&Me>=k.finished_at;!ae&&!jr&&typeof k.dismissed_at!="number"&&(Et=k)}}let Cs=null;if(Et){let k=typeof Et.session_id=="string"&&Et.session_id.length>0,z=mt.has(Et.attempt_id),ae=Et.cause_detail;Cs={repo:Et.repo||"",reason:Et.cause||Et.status,cause_detail:ae&&typeof ae.reason=="string"?{reason:ae.reason,command:typeof ae.command=="string"?ae.command:null}:null,resume_attempt_id:Et.attempt_id,resume_eligible:k&&!z,resume_reason:k?z?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}}let fi=new Set(br.map(k=>k.bead_id)),kn=Array.isArray(u.merge_queue)?u.merge_queue:[],Rs=new Map;kn.forEach((k,z)=>{k&&typeof k.bead_id=="string"&&Rs.set(k.bead_id,z+1)});let Ls=u.merge_queue_state||{active:null,failures:{}},_i=Ls.failures||{},hi=u.auto_merge_skips||{},Is=k=>{let z=hi[k];if(!z)return null;let ae=wt[k],Me=ae&&ae.pr?ae.pr.head_sha:null;return Me&&Me===z.head_sha?z.reason||"":null},Wr=new Map;for(let k of br)k.conflict_resolution&&(k.paused?Wr.has(k.bead_id)||Wr.set(k.bead_id,"paused"):Wr.set(k.bead_id,"running"));let Ds=br.filter(k=>!k.paused).length,Os=(u.workspace_info||{}).slots,Ms=typeof Os=="number"?Os:typeof u.slots=="number"?u.slots:wn,gi=Ds>Ms,Ns=lr(g),mi=(Array.isArray(u.done)?u.done.slice():[]).filter(k=>Ns===void 0||typeof k.added_at!="number"||k.added_at>=Ns).sort((k,z)=>(z.added_at||0)-(k.added_at||0)),Ps=rt(mi,"done"),Gr={};for(let k of Nt)Gr[k]=0;let Fs=!1,qs=0,yn=0,Bs=0;for(let k of Ps){let z=k.usage;if(z&&typeof z=="object"){let ae=!1;for(let Me of Nt)Number.isFinite(z[Me])&&(Gr[Me]+=z[Me],Fs=!0,ae=!0);ae&&(yn+=1,Number.isFinite(z.total_cost_usd)&&(qs+=z.total_cost_usd,Bs+=1))}}yn>0&&Bs===yn&&(Gr.total_cost_usd=qs);let bi=Fs?$t(Gr):null;return{queue:u,idToTitle:qe,candidates:Y,candidate_hidden:{blocked:C.hidden_blocked,spec:C.hidden_spec},running:br,live_count:Ds,slots:Ms,over_cap:gi,failure:Cs,waiting:rt(qt.filter(k=>!fi.has(k.bead_id)),"queue"),pr_wait:ct.map(k=>Pd(k.bead_id,qe.get(k.bead_id)||k.bead_id,wt,at[k.bead_id]||null,Rt(u.attempts||{},k.bead_id),tt[k.bead_id]||(j.has(k.bead_id)?{activity:null,merge_progress:{step:"merging"}}:null),Wr.get(k.bead_id)||null,k.external===!0,{position:Rs.get(k.bead_id)||0,active:Ls.active===k.bead_id,failure:_i[k.bead_id]||null},k.wt_present!==!1,u.auto_merge===!0?Is(k.bead_id):null,Qa(or,Hr(k.bead_id)))).map(k=>({...k,...we(k.id)})),merge_queue_length:kn.length,merge_queue_running:kn.length>0,auto_excluded:ct.map(k=>k.bead_id).filter(k=>Is(k)!==null),verify_cmd_present:!!(u.workspace_info||{}).verify_cmd,declared_base:or,done:Ps,token_total:bi,cleanup_failures:me,ship_failure:It}}function de(u){let w=u.waiting.length>0?u.waiting[0].id:"\u2014",D=c`<button
      type="button"
      class="worker-play${u.queue.auto_advance?" is-active":""}"
    >
      ${u.queue.auto_advance?"\u23F8 \uC77C\uC2DC\uC815\uC9C0":"\u25B6 \uC790\uB3D9 \uC9C4\uD589"}
    </button>`,_e=u.queue.auto_advance===!0&&u.queue.auto_merge===!0,Oe=c`<button
      type="button"
      class="worker-auto-all${_e?" is-active":""}"
      title=${_e?"\uC790\uB3D9 \uC9C4\uD589\uACFC \uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uB055\uB2C8\uB2E4":"\uC790\uB3D9 \uC9C4\uD589\uACFC \uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uCF2D\uB2C8\uB2E4"}
      aria-pressed=${_e?"true":"false"}
    >
      ${_e?"\u23F9 \uC804\uCCB4 \uC790\uB3D9\uD654":"\u23F5\u23F5 \uC804\uCCB4 \uC790\uB3D9\uD654"}
    </button>`,be=u.over_cap?c`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",De=c`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${u.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${u.pr_wait.length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${R()} 완료 <b>${u.done.length}</b></span
      >`,qe=c`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${u.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${u.declared_base||"?"}</span
    >`,et=c`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${wn}
          step="1"
          .value=${String(u.slots)}
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
      </button>`,lt=Ea({failure:u.failure,cleanupFailures:u.cleanup_failures,shipFailure:u.ship_failure});return W?c`<div class="worker-ribbon">
          ${D}
          <div class="worker-kpi worker-kpi--ribbon">${be}${De}</div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${Oe}${et}</div>
          <div class="worker-kpi">${qe}</div>
        </div>
        ${lt}`:c`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${D}${Oe}${et}</div>
        <div class="worker-kpi">
          ${be}${De}${qe}
          ${u.token_total?c`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${`${R()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}
                >${R()} 완료 · 누적 ${u.token_total}</span
              >`:""}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${w}</b></span
          >
        </div>
      </div>
      ${lt}`}function Se(u){if(u.running.length===0&&u.pr_wait.length===0)return"";let w=u.running.some(D=>!D.paused);return c`<section
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
          >${u.running.length+u.pr_wait.length}</span
        >
        ${Qe(u)}
      </header>
      ${u.running.length>0?hs(u.running,Date.now(),le):""}
      ${u.pr_wait.map(D=>ps(D))}
    </section>`}function Ie(u){let w=u.candidate_hidden;return c`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${$.show_blocked}
        />
        🔒 blocked${w.blocked>0?` ${w.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${vd.map(D=>c`<button
              type="button"
              class="worker-filter__chip${$.spec===D.value?" is-active":""}"
              data-spec=${D.value}
              aria-pressed=${$.spec===D.value?"true":"false"}
            >
              ${D.label}
            </button>`)}
        ${w.spec>0?c`<span class="worker-filter__hidden">숨김 ${w.spec}</span>`:""}
      </div>
    </div>`}function st(){return c`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${x}
    >
      ${kd.map(u=>c`<option value=${u.value} ?selected=${x===u.value}>
            ${u.label}
          </option>`)}
    </select>`}function it(){return c`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${g}
      >
        ${Ct.map(u=>c`<option value=${u.value} ?selected=${g===u.value}>
              ${u.label}
            </option>`)}
      </select>
    </div>`}function Qe(u){let w=u.queue.auto_merge===!0;if(u.merge_queue_running)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop${w?" is-active":""}"
        title=${w?"\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB044\uACE0 \uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)":"\uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)"}
      >
        ${w?"\u23F8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8":"\uC77C\uAD04 \uBA38\uC9C0 \uC911\uB2E8"} ${u.merge_queue_length}
      </button>`;if(w)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop is-active"
        title="자동 머지 켜짐 — 자격이 생기는 PR을 계속 큐에 넣습니다. 클릭하면 끕니다"
      >
        ⏸ 자동 머지
      </button>`;let D=new Set(u.auto_excluded),_e=u.pr_wait.filter(Oe=>Oe.merge_action&&Oe.merge_enabled&&!D.has(Oe.id)).length;return c`<button
      type="button"
      class="worker-merge-all"
      title=${u.verify_cmd_present?"\uCF1C \uB450\uBA74 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uCDA9\uB3CC \uD574\uC18C\xB7\uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uCF1C \uB450\uBA74 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uCDA9\uB3CC \uD574\uC18C\xB7\uBA38\uC9C0\uD569\uB2C8\uB2E4 \u2014 \uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uB294 \uAC80\uC99D \uC2E0\uD638\uAC00 \uC5C6\uC5B4 CI\xB7\uB85C\uCEEC\uAC80\uC99D \uC5C6\uC774 \uBA38\uC9C0\uB429\uB2C8\uB2E4"}
    >
      ▶ 자동 머지${_e>0?` ${_e}`:""}
    </button>`}function He(u){let w=Lt({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:u.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:st(),controls:Ie(u)});return W?c`<div class="worker-lanes worker-lanes--mobile">
        ${Se(u)}
        ${Lt({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:u.waiting,empty:"\uB4DC\uB798\uADF8 \uB610\uB294 [\uB300\uAE30\uB85C \u21B4]\uB85C \uBC30\uCE58",collapsible:!0,collapsed:H.queue,preview:Za(u.waiting)})}
        ${w}
        ${Lt({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:u.done,empty:`${R()} \uC644\uB8CC \uC5C6\uC74C`,controls:it(),collapsible:!0,collapsed:H.done,preview:u.token_total||Za(u.done)})}
      </div>`:c`<div class="worker-lanes">
      ${w}
      ${Lt({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:u.waiting,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58"})}
      ${Lt({id:"worker-pane-running",lane:"running",title:`\uC2E4\uD589 \uC911 \xB7 \uC2AC\uB86F ${u.slots}`,items:u.running,live:u.running.some(D=>!D.paused),body:hs(u.running,Date.now(),le)})}
      ${Lt({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:u.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C",header_control:Qe(u)})}
      ${Lt({id:"worker-pane-done",lane:"done",title:`\uC644\uB8CC \xB7 ${R()} ${u.done.length}`,items:u.done,empty:`${R()} \uC644\uB8CC \uC5C6\uC74C`,controls:it()})}
    </div>`}function ot(u){H={...H,[u]:!H[u]},Ed(H),Ae()}function Ae(){let u=ge();Re(de(u),O),Re(He(u),Z)}function Je(){let u=document.querySelector(".app-header");if(!u)return;let w=()=>{let D=Math.round(u.getBoundingClientRect().height);S.style.setProperty("--worker-ribbon-top",`${D}px`)};if(w(),typeof ResizeObserver=="function"){let D=new ResizeObserver(w);D.observe(u),A.push(()=>D.disconnect())}else window.addEventListener("resize",w),A.push(()=>window.removeEventListener("resize",w))}function N(){if(typeof window.matchMedia!="function")return;let u=window.matchMedia(Ad);W=!!u.matches;let w=D=>{let _e=!!(D&&typeof D.matches=="boolean"?D.matches:u.matches);_e!==W&&(W=_e,Ae())};typeof u.addEventListener=="function"?(u.addEventListener("change",w),A.push(()=>u.removeEventListener("change",w))):typeof u.addListener=="function"&&(u.addListener(w),A.push(()=>u.removeListener(w)))}function U(u){let w=u.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!w)return;let D=w.dataset.beadId||"",_e=w.dataset.lane||"";_={bead_id:D,from_lane:_e};try{u.dataTransfer?.setData("text/plain",D),u.dataTransfer&&(u.dataTransfer.effectAllowed="move")}catch{}}function ne(u){let w=u.target?.closest?.(".worker-pane");if(!w)return;let D=w.dataset.lane||"";D!=="candidate"&&D!=="queue"||(u.preventDefault(),u.dataTransfer&&(u.dataTransfer.dropEffect="move"),w.classList.add("worker-pane--drag-over"))}function te(u){u.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function oe(u,w){let D=m.find(De=>De.id===u);if(!D)return;let _e=m.filter(De=>De.id!==u),Oe=_e.length;if(w){let De=w.dataset.beadId;if(De===u)return;let qe=_e.findIndex(et=>et.id===De);qe>=0&&(Oe=qe)}let be=_e.slice();be.splice(Oe,0,D),f.applyReorder(u,be,Oe)}function ve(u){let w=u.target?.closest?.(".worker-pane");if(!w)return;u.preventDefault(),w.classList.remove("worker-pane--drag-over");let D=w.dataset.lane||"",_e=_?.bead_id||u.dataTransfer?.getData("text/plain")||"",Oe=_?.from_lane||"";if(_=null,!_e)return;let be=u.target?.closest?.(".worker-mini, .worker-card"),De=Array.from(w.querySelectorAll(".worker-mini, .worker-card")),qe=De.length;if(be){let et=De.indexOf(be);et>=0&&(qe=et)}if(w.classList.contains("worker-pane--collapsed")&&(qe=T()),D==="candidate"){if(Oe==="candidate"){oe(_e,be);return}Oe==="queue"&&ee(_e);return}D==="queue"&&(Oe==="queue"?he(_e,qe):B(_e,qe))}function ye(u){$=u,bd(u),Ae()}function Te(u){x=u==="board"||u==="created"||u==="spec"?u:vn,$d(x),Ae()}function pe(u){g=Mt(u)?u:vt,Sd(g),Ae()}function v(u){let w=u.target?.closest?.(".worker-filter__blocked");if(w){ye({...$,show_blocked:w.checked});return}let D=u.target?.closest?.(".worker-done-range");if(D){pe(D.value);return}let _e=u.target?.closest?.(".worker-sort");if(_e){Te(_e.value||vn);return}let Oe=u.target?.closest?.(".worker-slots__input");if(!Oe)return;let be=Number.parseInt(Oe.value,10);if(!Number.isFinite(be)){Ae();return}ce(be).then(Ae)}function q(u){return u?{runner:u.runner||void 0,model:u.model||void 0,effort:u.effort||void 0,worktree:u.worktree||void 0,status:u.status||void 0,session_id:u.session_id||void 0}:{}}function E(u){let w=$e(),D=w.attempts?w.attempts[u]:null;le=u,y.hidden=!1,xe.open({attempt_id:u,meta:q(D)}),Ae()}function J(){if(!le)return;let u=$e(),w=u.attempts?u.attempts[le]:null;if(w){xe.updateMeta(q(w));return}xe.close()}function je(u){let w=u.target;if(w?.closest?.("#worker-exec-defaults-dialog"))return;if(w?.closest?.(".worker-exec-defaults-btn")){Fe.open();return}let D=w?.closest?.(".worker-banner__resume");if(D){let me=D.dataset.attemptId;me&&ze(me);return}let _e=w?.closest?.(".worker-banner__dismiss");if(_e){let me=_e.dataset.attemptId;me&&fe(me);return}if(w?.closest?.(".worker-play")){M(!$e().auto_advance);return}if(w?.closest?.(".worker-auto-all")){let me=$e();re(!(me.auto_advance===!0&&me.auto_merge===!0));return}let Oe=w?.closest?.(".worker-merge-all");if(Oe){Oe.classList.contains("worker-merge-all--stop")?$e().auto_merge===!0?Ue(!1):Xe():Ue(!0);return}let be=w?.closest?.(".worker-pane__hd--toggle");if(be){let me=be.dataset.lane;(me==="queue"||me==="done")&&ot(me);return}let De=w?.closest?.(".worker-card__place");if(De){let me=De.dataset.beadId;me&&!De.disabled&&B(me,T());return}let qe=w?.closest?.(".worker-filter__chip");if(qe){let me=qe.dataset.spec;(me==="all"||me==="with"||me==="without")&&ye({...$,spec:me});return}let et=w?.closest?.(".worker-mini__merge");if(et){Ge(et.dataset.beadId||"");return}let lt=w?.closest?.(".worker-mini__merge-cancel");if(lt){nt(lt.dataset.beadId||"");return}let we=w?.closest?.(".worker-mini__discard");if(we){F(we.dataset.beadId||"");return}let ct=w?.closest?.(".worker-mini__revise-fix");if(ct){G("worker-revise-fix",ct.dataset.beadId||"");return}let wt=w?.closest?.(".worker-mini__revise-approve");if(wt){G("worker-revise-approve",wt.dataset.beadId||"");return}if(w?.closest?.(".worker-mini__pr"))return;if(w?.closest?.(".rtile__stop")){let Ee=w?.closest?.(".rtile")?.dataset?.attemptId;Ee&&ue(Ee);return}if(w?.closest?.(".rtile__pause")){let Ee=w?.closest?.(".rtile")?.dataset?.attemptId;Ee&&se(Ee);return}if(w?.closest?.(".rtile__resume")){let Ee=w?.closest?.(".rtile")?.dataset?.attemptId;Ee&&ze(Ee);return}if(w?.closest?.(".rtile__session")){let Ee=w?.closest?.(".rtile")?.dataset?.attemptId;Ee&&E(Ee);return}if(w?.closest?.(".worker-drawer-overlay__backdrop")){xe.close();return}if(w?.closest?.(".worker-drawer-host"))return;let tt=w?.closest?.(".rtile");if(tt){if(w?.closest?.(".rtile__id")){let Ee=tt.dataset.beadId;Ee&&er(Ee).then(It=>{It?ie("\uBCF5\uC0AC\uB428","success",1200):ie("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let me=tt.dataset.beadId;me&&l&&l(me);return}let at=w?.closest?.(".worker-mini, .worker-card");if(at){let me=at.dataset.beadId;if(w?.closest?.(".worker-mini__id, .worker-card__id")){me&&er(me).then(Ee=>{Ee?ie("\uBCF5\uC0AC\uB428","success",1200):ie("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}me&&l&&l(me)}}return e.addEventListener("dragstart",U),e.addEventListener("dragover",ne),e.addEventListener("dragleave",te),e.addEventListener("drop",ve),e.addEventListener("click",je),e.addEventListener("change",v),N(),Je(),d&&A.push(d.subscribe(Ae)),s&&A.push(s.subscribe(()=>{Ae(),J()})),Ae(),{load(){Ae()},destroy(){for(let u of A.splice(0))try{u()}catch{}e.removeEventListener("dragstart",U),e.removeEventListener("dragover",ne),e.removeEventListener("dragleave",te),e.removeEventListener("drop",ve),e.removeEventListener("click",je),e.removeEventListener("change",v);try{xe.destroy()}catch{}y.hidden=!0;try{Fe.destroy()}catch{}Re(c``,e)}}}function As(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function ni(e,t,r,n=async()=>{},s=async()=>{}){let o=We("views:workspace-picker"),a=null,l=!1,i=!1,d=!1;async function f(S){let y=S.target.value,V=t.getState().workspace?.current?.path||"";if(y&&y!==V){o("switching workspace to %s",y),l=!0,A();try{await r(y)}catch(Z){o("workspace switch failed: %o",Z)}finally{l=!1,A()}}}async function _(){let S=t.getState(),O=S.workspace?.current?.path||S.workspace?.available?.[0]?.path||"";if(!(!O||i)){o("git-pulling workspace %s",O),i=!0,A();try{await n(O)}catch(y){o("workspace git pull failed: %o",y)}finally{i=!1,A()}}}function m(S){let O=S.target;O&&e.contains(O)||g()}function $(S){S.key==="Escape"&&g()}function x(){d||(d=!0,document.addEventListener("mousedown",m),document.addEventListener("keydown",$),A())}function g(){d&&(d=!1,document.removeEventListener("mousedown",m),document.removeEventListener("keydown",$),A())}function R(){d?g():x()}async function H(S){let O=S.target,y=O.value,K=O.checked;o("toggling visibility %s \u2192 %s",y,String(K));try{await s(y,K)}catch(V){o("workspace visibility toggle failed: %o",V)}}function W(S){return S?c`
      <button
        type="button"
        class="workspace-picker__git-pull-button"
        @click=${_}
        ?disabled=${l||i}
        aria-label="Git Pull"
        title="Git Pull"
      >
        <span aria-hidden="true">⬇</span>
      </button>
    `:c``}function j(S,O){return c`
      <div class="workspace-picker__manage">
        <button
          type="button"
          class="workspace-picker__manage-button"
          @click=${R}
          aria-haspopup="true"
          aria-expanded=${d?"true":"false"}
          aria-label="프로젝트 관리"
        >
          프로젝트 관리
        </button>
        ${d?c`
              <div
                class="workspace-picker__manage-popover"
                role="menu"
                aria-label="프로젝트 표시 선택"
              >
                ${S.map(y=>c`
                    <label
                      class="workspace-picker__manage-row"
                      title="${y.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${y.path}"
                        .checked=${!O.has(y.path)}
                        @change=${H}
                      />
                      <span class="workspace-picker__manage-name"
                        >${As(y.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function P(){let S=t.getState(),O=S.workspace?.current,y=S.workspace?.available||[],K=new Set(S.workspace?.hidden||[]),V=O?.path||y[0]?.path||"";if(y.length===0)return c``;let Z=y.filter(le=>!K.has(le.path)||le.path===V);if(Z.length<=1){let le=Z[0]||y[0],xe=As(le.path);return c`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${le.path}"
            >${xe}</span
          >
          ${j(y,K)}
          ${W(V)}
          ${i?c`<span
                class="workspace-picker__loading"
                aria-hidden="true"
              ></span>`:""}
        </div>
      `}return c`
      <div class="workspace-picker">
        <select
          class="workspace-picker__select"
          @change=${f}
          ?disabled=${l||i}
          aria-label="Select project workspace"
        >
          ${Z.map(le=>c`
              <option
                value="${le.path}"
                ?selected=${le.path===V}
                title="${le.path}"
              >
                ${As(le.path)}
              </option>
            `)}
        </select>
        ${j(y,K)}
        ${W(V)}
        ${l||i?c`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function A(){Re(P(),e)}return A(),a=t.subscribe(()=>A()),{destroy(){a&&(a(),a=null),document.removeEventListener("mousedown",m),document.removeEventListener("keydown",$),Re(c``,e)}}}var si=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-queue-set-slots","worker-queue-set-exec-default","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","monitor-auto-toggle"];function Ts(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function oi(e,t,r=Ts()){return{id:r,type:e,payload:t}}function ai(e={}){let t=We("ws"),r={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},n=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",a=0,l=null,i=!0,d=new Map,f=[],_=new Map,m=new Set;function $(P){for(let A of Array.from(m))try{A(P)}catch{}}function x(){if(!i||l)return;o="reconnecting",t("ws reconnecting\u2026"),$(o);let P=Math.min(r.maxMs||0,(r.initialMs||0)*Math.pow(r.factor||1,a)),A=(r.jitterRatio||0)*P,S=Math.max(0,Math.round(P+(Math.random()*2-1)*A));t("ws retry in %d ms (attempt %d)",S,a+1),l=setTimeout(()=>{l=null,j()},S)}function g(P){try{s?.send(JSON.stringify(P))}catch(A){t("ws send failed",A)}}function R(){for(o="open",t("ws open"),$(o),a=0;f.length;){let P=f.shift();P&&g(P)}}function H(P){let A;try{A=JSON.parse(String(P.data))}catch{t("ws received non-JSON message");return}if(!A||typeof A.id!="string"||typeof A.type!="string"){t("ws received invalid envelope");return}if(d.has(A.id)){let O=d.get(A.id);d.delete(A.id),A.ok?O?.resolve(A.payload):O?.reject(A.error||new Error("ws error"));return}let S=_.get(A.type);if(S&&S.size>0)for(let O of Array.from(S))try{O(A.payload)}catch(y){t("ws event handler error",y)}else t("ws received unhandled message type: %s",A.type)}function W(){o="closed",t("ws closed"),$(o);for(let[P,A]of d.entries())A.reject(new Error("ws disconnected")),d.delete(P);a+=1,x()}function j(){if(!i)return;let P=n();try{s=new WebSocket(P),t("ws connecting %s",P),o="connecting",$(o),s.addEventListener("open",R),s.addEventListener("message",H),s.addEventListener("error",()=>{}),s.addEventListener("close",W)}catch(A){t("ws connect failed %o",A),x()}}return j(),{send(P,A){if(!si.includes(P))return Promise.reject(new Error(`unknown message type: ${P}`));let S=Ts(),O=oi(P,A,S);return t("send %s id=%s",P,S),new Promise((y,K)=>{d.set(S,{resolve:y,reject:K,type:P}),s&&s.readyState===s.OPEN?g(O):(t("queue %s id=%s (state=%s)",P,S,o),f.push(O))})},on(P,A){_.has(P)||_.set(P,new Set);let S=_.get(P);return S?.add(A),()=>{S?.delete(A)}},onConnection(P){return m.add(P),()=>{m.delete(P)}},reconnect(){i=!0,l&&(clearTimeout(l),l=null),a=0,j()},close(){i=!1,l&&(clearTimeout(l),l=null);try{s?.close()}catch{}},getState(){return o}}}function Fd(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function qd(e,t){try{let n=await(await fetch("/api/config")).json();e.setState({config:n})}catch(r){t("config refresh failed",r)}}var Es=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],ii=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"]],li=Ha,ci="worker:queue",di="ui:order",ui="ui:display-policy",Wt="tab:board:closed",pi="beads-ui.board.closed-range";function Bd(e){let t=We("main");t("bootstrap start");let r=c`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;Re(r,e);let n=document.getElementById("top-nav"),s=document.getElementById("board-root"),o=document.getElementById("worker-root"),a=document.getElementById("monitor-root"),l=document.getElementById("detail-panel");if(s&&o&&a&&l){let $e=function(h,b){let Q="Request failed",I="";if(h&&typeof h=="object"){let C=h;if(typeof C.message=="string"&&C.message.length>0&&(Q=C.message),typeof C.details=="string")I=C.details;else if(C.details&&typeof C.details=="object")try{I=JSON.stringify(C.details,null,2)}catch{I=""}}else typeof h=="string"&&h.length>0&&(Q=h);let p=b&&b.length>0?`Failed to load ${b}`:"Request failed";Fe.open(p,Q,I)},M=function(h){return`${we.getState().workspace.current?.path||""}\0${h}`},re=function(){fe&&(fe().catch(()=>{}),fe=null),Pe=null,Ge=null},ge=function(h){Ue=h;let b=()=>{Ue!==h||we.getState().selected_id!==h||(Ue=null,ce(h))};if(!F){Xe.then(b);return}b()},st=function(h,b,Q,I,p){return Q!==Ie[b]?(p().catch(()=>{}),!1):(h.set(I,p),!0)},it=function(){let h=we.getState().view;ot(h==="board"),ne(h==="worker"),Te(h==="monitor"),oe(h==="worker")},He=function(){let h=lr(Qe);return h===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:h}}},ot=function(h){if(h)for(let[b,Q]of Es){if(de.has(b)||Se.has(b))continue;let I=b===Wt?He():{type:Q};try{B.register(b,I)}catch(Y){t("register %s store failed: %o",b,Y)}Se.add(b);let p=Ie.board,C=!1;T.subscribeList(b,I).then(Y=>{C=!st(de,"board",p,b,Y)}).catch(Y=>{t("subscribe %s failed: %o",b,Y),$e(Y,"board")}).finally(()=>{Se.delete(b),C&&it()})}else Je()},Je=function(){Ie.board+=1;for(let[h]of Es){let b=de.get(h);b&&(b().catch(()=>{}),de.delete(h));try{B.unregister(h)}catch(Q){t("unregister %s failed: %o",h,Q)}}},ne=function(h){if(!h){te();return}for(let[b,Q]of ii){if(N.has(b)||Se.has(b))continue;try{B.register(b,{type:Q})}catch(C){t("register %s store failed: %o",b,C)}Se.add(b);let I=Ie.worker,p=!1;T.subscribeList(b,{type:Q}).then(C=>{p=!st(N,"worker",I,b,C)}).catch(C=>{t("subscribe %s failed: %o",b,C),$e(C,"worker")}).finally(()=>{Se.delete(b),p&&it()})}},te=function(){Ie.worker+=1;for(let[h]of ii){let b=N.get(h);b&&(b().catch(()=>{}),N.delete(h));try{B.unregister(h)}catch(Q){t("unregister %s failed: %o",h,Q)}}},oe=function(h){if(!h){ve();return}U||(L("subscribe-worker-queue",{id:ci}).catch(b=>{t("subscribe-worker-queue failed: %o",b)}),U=()=>L("unsubscribe-worker-queue",{id:ci}))},ve=function(){U&&(U().catch(()=>{}),U=null)},Te=function(h){if(!h){pe();return}ye||(L("subscribe-monitor-pipeline",{id:li}).catch(b=>{t("subscribe-monitor-pipeline failed: %o",b)}),ye=()=>L("unsubscribe-monitor-pipeline",{id:li}))},pe=function(){ye&&(ye().catch(()=>{}),ye=null)},q=function(){v||(L("subscribe-ui-order",{id:di}).catch(h=>{t("subscribe-ui-order failed: %o",h)}),v=()=>L("unsubscribe-ui-order",{id:di}))},E=function(){v&&(v().catch(()=>{}),v=null),ue.clear()},je=function(){J||(L("subscribe-display-policy",{id:ui}).catch(h=>{t("subscribe-display-policy failed: %o",h)}),J=()=>L("unsubscribe-display-policy",{id:ui}))},u=function(){J&&(J().catch(()=>{}),J=null),se.clear()},De=function(h){if(!h)return"Unknown";let b=h.split("/").filter(Boolean);return b.length>0?b[b.length-1]:"Unknown"};var i=$e,d=M,f=re,_=ge,m=st,$=it,x=He,g=ot,R=Je,H=ne,W=te,j=oe,P=ve,A=Te,S=pe,O=q,y=E,K=je,V=u,Z=De;let le=document.getElementById("header-loading"),xe=ko(le),Fe=$a(e),X=ai(),L=xe.wrapSend((h,b)=>X.send(h,b)),T=_o(L),B=ho(),he=mo(),ee=Qs(),ue=go(),se=Xs(),ze=Js();X.on("monitor-pipeline-snapshot",h=>{let b=h;if(!(!b||!Array.isArray(b.workspaces)))try{ee.set(b.workspaces,b.workspaces_state)}catch{}}),X.on("ui-order-snapshot",h=>{let b=h;if(b&&typeof b.revision=="number")try{ue.set({revision:b.revision,order:b.order&&typeof b.order=="object"?b.order:{}})}catch{}}),X.on("display-policy-snapshot",h=>{let b=h;if(b&&b.policy&&typeof b.policy=="object")try{se.set(b.policy)}catch{}}),X.on("session-log-snapshot",h=>{let b=h;if(b&&typeof b.attempt_id=="string")try{ze.set(b.attempt_id,Array.isArray(b.lines)?b.lines:[],typeof b.last_event_at=="number"?b.last_event_at:null)}catch{}}),X.on("session-log-append",h=>{let b=h;if(b&&typeof b.attempt_id=="string")try{ze.append(b.attempt_id,b.event)}catch{}}),X.on("snapshot",h=>{let b=h,Q=b&&typeof b.id=="string"?b.id:"",I=Q?B.getStore(Q):null;if(I&&b&&b.type==="snapshot")try{I.applyPush(b)}catch{}}),X.on("upsert",h=>{let b=h,Q=b&&typeof b.id=="string"?b.id:"",I=Q?B.getStore(Q):null;if(I&&b&&b.type==="upsert")try{I.applyPush(b)}catch{}}),X.on("delete",h=>{let b=h,Q=b&&typeof b.id=="string"?b.id:"",I=Q?B.getStore(Q):null;if(I&&b&&b.type==="delete")try{I.applyPush(b)}catch{}});let fe=null,Pe=null,Ge=null,Ue=null,nt=()=>{},Xe=new Promise(h=>{nt=()=>h(void 0)}),F=!1,G=!1;async function ce(h){let b=M(h);if(b===Pe||b===Ge)return;Ge=b;let Q=`detail:${h}`,I={type:"issue-detail",params:{id:h}};try{B.register(Q,I)}catch(p){t("register detail store failed: %o",p)}try{let p=await T.subscribeList(Q,I);if(we.getState().selected_id!==h||M(h)!==b){await p().catch(()=>{});return}fe&&await fe().catch(()=>{}),fe=p,Pe=b}catch(p){t("detail subscribe failed: %o",p),$e(p,"issue details")}finally{Ge===b&&(Ge=null)}}let de=new Map,Se=new Set,Ie={board:0,worker:0},Qe=vt;try{let h=window.localStorage.getItem(pi);Mt(h)&&(Qe=h)}catch{}async function Ae(h){if(!Mt(h)||h===Qe)return;Qe=h;try{window.localStorage.setItem(pi,h)}catch{}let b=de.get(Wt);if(!b)return;de.delete(Wt),await b().catch(()=>{});let Q=He();try{B.register(Wt,Q)}catch(I){t("register %s store failed: %o",Wt,I)}try{let I=await T.subscribeList(Wt,Q);de.set(Wt,I)}catch(I){t("re-subscribe %s failed: %o",Wt,I),$e(I,"board")}}let N=new Map,U=null,ye=null,v=null,J=null;async function w(){J=null,se.clear(),U=null,ye=null,de.clear(),N.clear(),Ie.board+=1,Ie.worker+=1;let h=we.getState().workspace.current?.path;if(h)try{await X.send("set-workspace",{path:h})}catch(Q){t("workspace restore after reconnect failed: %o",Q);return}je();let b=we.getState().view;ot(b==="board"),ne(b==="worker"),Te(b==="monitor"),oe(b==="worker")}async function D(){t("clearing all subscriptions for workspace switch"),Je(),te(),ve(),he.clear(),E(),q(),u(),je(),re();let h=we.getState();if(h.selected_id)try{B.unregister(`detail:${h.selected_id}`)}catch{}let b=we.getState();ot(b.view==="board"),ne(b.view==="worker"),Te(b.view==="monitor"),oe(b.view==="worker"),b.selected_id&&ge(b.selected_id)}async function _e(h){t("requesting workspace switch to %s",h),G=!0;try{let b=await X.send("set-workspace",{path:h});t("workspace switch result: %o",b),b&&b.workspace&&(we.setState({workspace:{current:{path:b.workspace.root_dir,database:b.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",h),b.changed&&(await D(),ie("Switched to "+De(h),"success",2e3)))}catch(b){throw t("workspace switch failed: %o",b),ie("Failed to switch workspace","error",3e3),b}finally{G=!1}}async function Oe(h){t("requesting workspace git pull for %s",h);try{let b=await X.send("git-pull-workspace",{});t("workspace git pull result: %o",b);let Q=b?.status;if(Q==="up_to_date"){ie("Already up to date","success",2e3);return}if(Q==="stash_pop_conflict"){ie("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}ie("Git pulled "+De(h),"success",2e3)}catch(b){t("workspace git pull failed: %o",b);let Q=b?.code,I=b?.message;if(Q==="rebase_conflict"){ie("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(Q==="rebase_conflict_abort_failed"){ie("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(Q==="busy"){ie("Git pull skipped: another operation is running","warning",3e3);return}let p=I?`: ${I}`:"";throw ie(`Git pull failed${p}`,"error",3e3),b}}async function be(h,b){t("setting workspace visibility %s \u2192 %s",h,String(b));try{await X.send("set-workspace-visibility",{path:h,visible:b}),await qe()}catch(Q){t("workspace visibility update failed: %o",Q),ie("Failed to update project visibility","error",3e3)}}async function qe(){try{let h=await X.send("list-workspaces",{});if(t("workspaces loaded: %o",h),h&&Array.isArray(h.workspaces)){let b=h.workspaces.map(C=>({path:C.path,database:C.database,pid:C.pid,version:C.version})),Q=h.current?{path:h.current.root_dir,database:h.current.db_path}:null,I=Array.isArray(h.hidden)?h.hidden.filter(C=>typeof C=="string"):[];we.setState({workspace:{current:Q,available:b,hidden:I}});let p=window.localStorage.getItem("beads-ui.workspace");p&&(!b.some(Y=>Y.path===p)||I.includes(p)?window.localStorage.removeItem("beads-ui.workspace"):Q&&p!==Q.path&&(t("restoring saved workspace preference: %s",p),await _e(p)))}}catch(h){t("failed to load workspaces: %o",h)}}X.on("workspace-changed",h=>{t("workspace-changed event: %o",h),h&&h.root_dir&&(we.setState({workspace:{current:{path:h.root_dir,database:h.db_path}}}),qe(),D())});let et=!1;if(typeof X.onConnection=="function"){let h=b=>{t("ws state %s",b),b==="reconnecting"||b==="closed"?(et=!0,ie("Connection lost. Reconnecting\u2026","error",4e3)):b==="open"&&et&&(et=!1,ie("Reconnected","success",2200),qd(we,(Q,I)=>{t(`${Q}: %o`,I)}),w())};X.onConnection(h)}let lt="board";try{let h=window.localStorage.getItem("beads-ui.view");(h==="board"||h==="worker"||h==="monitor")&&(lt=h)}catch(h){t("view parse error: %o",h)}let we=vo({config:Fd(),view:lt});X.on("worker-queue-snapshot",h=>{let b=h;if(!b||!b.queue)return;let Q=we.getState().workspace.current?.path;if(typeof Q=="string"&&Q.length>0&&b.root_dir!==Q){t("dropping worker-queue snapshot for %s",String(b.root_dir));return}try{he.set(b.queue)}catch{}});let ct=bo(we);ct.start();let wt=async(h,b)=>{try{return await L(h,b)}catch{return[]}};n&&Ga(n,we,ct);let tt=document.getElementById("workspace-picker");tt&&ni(tt,we,_e,Oe,be);let at=Ka(e,(h,b)=>L(h,b));try{let h=document.getElementById("new-issue-btn");h&&h.addEventListener("click",()=>at.open())}catch{}let me=ya(e,{policyStore:se,transport:(h,b)=>L(h,b),labelOptions:()=>{let h=new Set;for(let[b]of Es)for(let Q of B.snapshotFor(b)||[]){let I=Q.labels;if(Array.isArray(I))for(let p of I)typeof p=="string"&&p.length>0&&h.add(p)}return Array.from(h).sort()}});try{let h=document.getElementById("display-settings-btn");h&&h.addEventListener("click",()=>me.open())}catch{}let Ee=Co(s,{gotoIssue:h=>ct.gotoIssue(h),issueStores:B,transport:wt,uiOrderStore:ue,displayPolicyStore:se,closedRange:Qe,onClosedRangeChange:h=>{Ae(h)},onNewIssue:()=>at.open()}),It=Ss(o,{transport:wt,issueStores:B,queueStore:he,sessionLogStore:ze,uiOrderStore:ue,gotoIssue:h=>we.setState({selected_id:h}),getWorkspacePath:()=>we.getState().workspace.current?.path}),qt=Wa(a,{transport:wt,pipelineStore:ee,gotoIssue:h=>ct.gotoIssue(h),getWorkspacePath:()=>we.getState().workspace.current?.path,switchWorkspace:h=>_e(h)}),ut=va(l,{issueStores:B,transport:wt,queueStore:he,sessionLogStore:ze,getWorkspacePath:()=>we.getState().workspace.current?.path,onNavigate:h=>{we.getState().view==="worker"?we.setState({selected_id:h}):ct.gotoIssue(h)},onClose:()=>{let h=we.getState();we.setState({selected_id:null});try{ct.gotoView(h.view==="worker"||h.view==="monitor"?h.view:"board")}catch{}}}),Bt=we.getState().selected_id;Bt&&(l.hidden=!1,ut.load(Bt),ge(Bt)),we.subscribe(h=>{let b=h.selected_id;b?(l.hidden=!1,ut.load(b),G||ge(b)):(ut.clear(),l.hidden=!0,re())});let Gt=h=>{s.hidden=h.view!=="board",o.hidden=h.view!=="worker",a.hidden=h.view!=="monitor",ot(h.view==="board"),ne(h.view==="worker"),Te(h.view==="monitor"),oe(h.view==="worker"),!h.selected_id&&h.view==="board"&&Ee.load(),h.view==="worker"&&It.load(),h.view==="monitor"?qt.load():qt.pause(),window.localStorage.setItem("beads-ui.view",h.view)};we.subscribe(Gt),Gt(we.getState()),q(),je(),qe().finally(()=>{F=!0,nt()}),window.addEventListener("keydown",h=>{let b=h.ctrlKey||h.metaKey,Q=String(h.key||"").toLowerCase(),I=h.target,p=I&&I.tagName?String(I.tagName).toLowerCase():"",C=p==="input"||p==="textarea"||p==="select"||I&&typeof I.isContentEditable=="boolean"&&I.isContentEditable;b&&Q==="n"&&(C||(h.preventDefault(),at.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let r=window.localStorage.getItem("beads-ui.theme"),n=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=r==="dark"||r==="light"?r:n?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let r=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",r),window.localStorage.setItem("beads-ui.theme",r)});let t=document.getElementById("app");t&&Bd(t)});export{Bd as bootstrap,Fd as readBootstrapConfig,qd as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
