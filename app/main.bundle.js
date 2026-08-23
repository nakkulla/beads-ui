var wd=Object.create;var bo=Object.defineProperty;var kd=Object.getOwnPropertyDescriptor;var $d=Object.getOwnPropertyNames;var xd=Object.getPrototypeOf,Ad=Object.prototype.hasOwnProperty;var Sd=(e,t,r)=>t in e?bo(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var ho=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var Ed=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of $d(t))!Ad.call(e,s)&&s!==r&&bo(e,s,{get:()=>t[s],enumerable:!(n=kd(t,s))||n.enumerable});return e};var Td=(e,t,r)=>(r=e!=null?wd(xd(e)):{},Ed(t||!e||!e.__esModule?bo(r,"default",{value:e,enumerable:!0}):r,e));var lt=(e,t,r)=>Sd(e,typeof t!="symbol"?t+"":t,r);var Ai=ho((qg,xi)=>{var Qr=1e3,Jr=Qr*60,en=Jr*60,qr=en*24,Id=qr*7,Ld=qr*365.25;xi.exports=function(e,t){t=t||{};var r=typeof e;if(r==="string"&&e.length>0)return Od(e);if(r==="number"&&isFinite(e))return t.long?Pd(e):Md(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function Od(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var r=parseFloat(t[1]),n=(t[2]||"ms").toLowerCase();switch(n){case"years":case"year":case"yrs":case"yr":case"y":return r*Ld;case"weeks":case"week":case"w":return r*Id;case"days":case"day":case"d":return r*qr;case"hours":case"hour":case"hrs":case"hr":case"h":return r*en;case"minutes":case"minute":case"mins":case"min":case"m":return r*Jr;case"seconds":case"second":case"secs":case"sec":case"s":return r*Qr;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r;default:return}}}}function Md(e){var t=Math.abs(e);return t>=qr?Math.round(e/qr)+"d":t>=en?Math.round(e/en)+"h":t>=Jr?Math.round(e/Jr)+"m":t>=Qr?Math.round(e/Qr)+"s":e+"ms"}function Pd(e){var t=Math.abs(e);return t>=qr?cs(e,t,qr,"day"):t>=en?cs(e,t,en,"hour"):t>=Jr?cs(e,t,Jr,"minute"):t>=Qr?cs(e,t,Qr,"second"):e+" ms"}function cs(e,t,r,n){var s=t>=r*1.5;return Math.round(e/r)+" "+n+(s?"s":"")}});var Ei=ho((Fg,Si)=>{function Dd(e){r.debug=r,r.default=r,r.coerce=u,r.disable=a,r.enable=s,r.enabled=i,r.humanize=Ai(),r.destroy=d,Object.keys(e).forEach(f=>{r[f]=e[f]}),r.names=[],r.skips=[],r.formatters={};function t(f){let _=0;for(let h=0;h<f.length;h++)_=(_<<5)-_+f.charCodeAt(h),_|=0;return r.colors[Math.abs(_)%r.colors.length]}r.selectColor=t;function r(f){let _,h=null,C,A;function I(...D){if(!I.enabled)return;let V=I,Y=Number(new Date),W=Y-(_||Y);V.diff=W,V.prev=_,V.curr=Y,_=Y,D[0]=r.coerce(D[0]),typeof D[0]!="string"&&D.unshift("%O");let R=0;D[0]=D[0].replace(/%([a-zA-Z%])/g,(P,w)=>{if(P==="%%")return"%";R++;let B=r.formatters[w];if(typeof B=="function"){let te=D[R];P=B.call(V,te),D.splice(R,1),R--}return P}),r.formatArgs.call(V,D),(V.log||r.log).apply(V,D)}return I.namespace=f,I.useColors=r.useColors(),I.color=r.selectColor(f),I.extend=n,I.destroy=r.destroy,Object.defineProperty(I,"enabled",{enumerable:!0,configurable:!1,get:()=>h!==null?h:(C!==r.namespaces&&(C=r.namespaces,A=r.enabled(f)),A),set:D=>{h=D}}),typeof r.init=="function"&&r.init(I),I}function n(f,_){let h=r(this.namespace+(typeof _>"u"?":":_)+f);return h.log=this.log,h}function s(f){r.save(f),r.namespaces=f,r.names=[],r.skips=[];let _=(typeof f=="string"?f:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let h of _)h[0]==="-"?r.skips.push(h.slice(1)):r.names.push(h)}function o(f,_){let h=0,C=0,A=-1,I=0;for(;h<f.length;)if(C<_.length&&(_[C]===f[h]||_[C]==="*"))_[C]==="*"?(A=C,I=h,C++):(h++,C++);else if(A!==-1)C=A+1,I++,h=I;else return!1;for(;C<_.length&&_[C]==="*";)C++;return C===_.length}function a(){let f=[...r.names,...r.skips.map(_=>"-"+_)].join(",");return r.enable(""),f}function i(f){for(let _ of r.skips)if(o(f,_))return!1;for(let _ of r.names)if(o(f,_))return!0;return!1}function u(f){return f instanceof Error?f.stack||f.message:f}function d(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return r.enable(r.load()),r}Si.exports=Dd});var Ti=ho((Mt,us)=>{Mt.formatArgs=qd;Mt.save=Fd;Mt.load=jd;Mt.useColors=Nd;Mt.storage=Bd();Mt.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();Mt.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function Nd(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function qd(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+us.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let r=0,n=0;e[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(r++,s==="%c"&&(n=r))}),e.splice(n,0,t)}Mt.log=console.debug||console.log||(()=>{});function Fd(e){try{e?Mt.storage.setItem("debug",e):Mt.storage.removeItem("debug")}catch{}}function jd(){let e;try{e=Mt.storage.getItem("debug")||Mt.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function Bd(){try{return localStorage}catch{}}us.exports=Ei()(Mt);var{formatters:Ud}=us.exports;Ud.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var gn=globalThis,ns=gn.trustedTypes,ci=ns?ns.createPolicy("lit-html",{createHTML:e=>e}):void 0,vo="$lit$",_r=`lit$${Math.random().toFixed(9).slice(2)}$`,wo="?"+_r,Cd=`<${wo}>`,Mr=document,bn=()=>Mr.createComment(""),hn=e=>e===null||typeof e!="object"&&typeof e!="function",ko=Array.isArray,mi=e=>ko(e)||typeof e?.[Symbol.iterator]=="function",yo=`[ 	
\f\r]`,mn=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ui=/-->/g,di=/>/g,Lr=RegExp(`>|${yo}(?:([^\\s"'>=/]+)(${yo}*=${yo}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),pi=/'/g,fi=/"/g,gi=/^(?:script|style|textarea|title)$/i,$o=e=>(t,...r)=>({_$litType$:e,strings:t,values:r}),l=$o(1),$r=$o(2),Ig=$o(3),jt=Symbol.for("lit-noChange"),mt=Symbol.for("lit-nothing"),_i=new WeakMap,Or=Mr.createTreeWalker(Mr,129);function bi(e,t){if(!ko(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return ci!==void 0?ci.createHTML(t):t}var hi=(e,t)=>{let r=e.length-1,n=[],s,o=t===2?"<svg>":t===3?"<math>":"",a=mn;for(let i=0;i<r;i++){let u=e[i],d,f,_=-1,h=0;for(;h<u.length&&(a.lastIndex=h,f=a.exec(u),f!==null);)h=a.lastIndex,a===mn?f[1]==="!--"?a=ui:f[1]!==void 0?a=di:f[2]!==void 0?(gi.test(f[2])&&(s=RegExp("</"+f[2],"g")),a=Lr):f[3]!==void 0&&(a=Lr):a===Lr?f[0]===">"?(a=s??mn,_=-1):f[1]===void 0?_=-2:(_=a.lastIndex-f[2].length,d=f[1],a=f[3]===void 0?Lr:f[3]==='"'?fi:pi):a===fi||a===pi?a=Lr:a===ui||a===di?a=mn:(a=Lr,s=void 0);let C=a===Lr&&e[i+1].startsWith("/>")?" ":"";o+=a===mn?u+Cd:_>=0?(n.push(d),u.slice(0,_)+vo+u.slice(_)+_r+C):u+_r+(_===-2?i:C)}return[bi(e,o+(e[r]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),n]},yn=class e{constructor({strings:t,_$litType$:r},n){let s;this.parts=[];let o=0,a=0,i=t.length-1,u=this.parts,[d,f]=hi(t,r);if(this.el=e.createElement(d,n),Or.currentNode=this.el.content,r===2||r===3){let _=this.el.content.firstChild;_.replaceWith(..._.childNodes)}for(;(s=Or.nextNode())!==null&&u.length<i;){if(s.nodeType===1){if(s.hasAttributes())for(let _ of s.getAttributeNames())if(_.endsWith(vo)){let h=f[a++],C=s.getAttribute(_).split(_r),A=/([.?@])?(.*)/.exec(h);u.push({type:1,index:o,name:A[2],strings:C,ctor:A[1]==="."?os:A[1]==="?"?as:A[1]==="@"?is:Dr}),s.removeAttribute(_)}else _.startsWith(_r)&&(u.push({type:6,index:o}),s.removeAttribute(_));if(gi.test(s.tagName)){let _=s.textContent.split(_r),h=_.length-1;if(h>0){s.textContent=ns?ns.emptyScript:"";for(let C=0;C<h;C++)s.append(_[C],bn()),Or.nextNode(),u.push({type:2,index:++o});s.append(_[h],bn())}}}else if(s.nodeType===8)if(s.data===wo)u.push({type:2,index:o});else{let _=-1;for(;(_=s.data.indexOf(_r,_+1))!==-1;)u.push({type:7,index:o}),_+=_r.length-1}o++}}static createElement(t,r){let n=Mr.createElement("template");return n.innerHTML=t,n}};function Pr(e,t,r=e,n){if(t===jt)return t;let s=n!==void 0?r._$Co?.[n]:r._$Cl,o=hn(t)?void 0:t._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(e),s._$AT(e,r,n)),n!==void 0?(r._$Co??(r._$Co=[]))[n]=s:r._$Cl=s),s!==void 0&&(t=Pr(e,s._$AS(e,t.values),s,n)),t}var ss=class{constructor(t,r){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:r},parts:n}=this._$AD,s=(t?.creationScope??Mr).importNode(r,!0);Or.currentNode=s;let o=Or.nextNode(),a=0,i=0,u=n[0];for(;u!==void 0;){if(a===u.index){let d;u.type===2?d=new Xr(o,o.nextSibling,this,t):u.type===1?d=new u.ctor(o,u.name,u.strings,this,t):u.type===6&&(d=new ls(o,this,t)),this._$AV.push(d),u=n[++i]}a!==u?.index&&(o=Or.nextNode(),a++)}return Or.currentNode=Mr,s}p(t){let r=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(t,n,r),r+=n.strings.length-2):n._$AI(t[r])),r++}},Xr=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,r,n,s){this.type=2,this._$AH=mt,this._$AN=void 0,this._$AA=t,this._$AB=r,this._$AM=n,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,r=this._$AM;return r!==void 0&&t?.nodeType===11&&(t=r.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,r=this){t=Pr(this,t,r),hn(t)?t===mt||t==null||t===""?(this._$AH!==mt&&this._$AR(),this._$AH=mt):t!==this._$AH&&t!==jt&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):mi(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==mt&&hn(this._$AH)?this._$AA.nextSibling.data=t:this.T(Mr.createTextNode(t)),this._$AH=t}$(t){let{values:r,_$litType$:n}=t,s=typeof n=="number"?this._$AC(t):(n.el===void 0&&(n.el=yn.createElement(bi(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===s)this._$AH.p(r);else{let o=new ss(s,this),a=o.u(this.options);o.p(r),this.T(a),this._$AH=o}}_$AC(t){let r=_i.get(t.strings);return r===void 0&&_i.set(t.strings,r=new yn(t)),r}k(t){ko(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,n,s=0;for(let o of t)s===r.length?r.push(n=new e(this.O(bn()),this.O(bn()),this,this.options)):n=r[s],n._$AI(o),s++;s<r.length&&(this._$AR(n&&n._$AB.nextSibling,s),r.length=s)}_$AR(t=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);t!==this._$AB;){let n=t.nextSibling;t.remove(),t=n}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},Dr=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,r,n,s,o){this.type=1,this._$AH=mt,this._$AN=void 0,this.element=t,this.name=r,this._$AM=s,this.options=o,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=mt}_$AI(t,r=this,n,s){let o=this.strings,a=!1;if(o===void 0)t=Pr(this,t,r,0),a=!hn(t)||t!==this._$AH&&t!==jt,a&&(this._$AH=t);else{let i=t,u,d;for(t=o[0],u=0;u<o.length-1;u++)d=Pr(this,i[n+u],r,u),d===jt&&(d=this._$AH[u]),a||(a=!hn(d)||d!==this._$AH[u]),d===mt?t=mt:t!==mt&&(t+=(d??"")+o[u+1]),this._$AH[u]=d}a&&!s&&this.j(t)}j(t){t===mt?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},os=class extends Dr{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===mt?void 0:t}},as=class extends Dr{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==mt)}},is=class extends Dr{constructor(t,r,n,s,o){super(t,r,n,s,o),this.type=5}_$AI(t,r=this){if((t=Pr(this,t,r,0)??mt)===jt)return;let n=this._$AH,s=t===mt&&n!==mt||t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive,o=t!==mt&&(n===mt||s);s&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},ls=class{constructor(t,r,n){this.element=t,this.type=6,this._$AN=void 0,this._$AM=r,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(t){Pr(this,t)}},yi={M:vo,P:_r,A:wo,C:1,L:hi,R:ss,D:mi,V:Pr,I:Xr,H:Dr,N:as,U:is,B:os,F:ls},Rd=gn.litHtmlPolyfillSupport;Rd?.(yn,Xr),(gn.litHtmlVersions??(gn.litHtmlVersions=[])).push("3.3.1");var Ge=(e,t,r)=>{let n=r?.renderBefore??t,s=n._$litPart$;if(s===void 0){let o=r?.renderBefore??null;n._$litPart$=s=new Xr(t.insertBefore(bn(),o),o,void 0,r??{})}return s._$AI(e),s};var Dt="today",lr=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}];function Bt(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function Nr(e,t=Date.now()){switch(e){case"today":{let r=new Date(t);return r.setHours(0,0,0,0),r.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function vi(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function wi(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function ki(){let e=null,t=[],r=new Set;function n(){for(let s of Array.from(r))try{s()}catch{}}return{get(){return e},getWorkspacesState(){return t},set(s,o){e=Array.isArray(s)?s:null,t=Array.isArray(o)?o:[],n()},clear(){e=null,t=[],n()},subscribe(s){return r.add(s),()=>r.delete(s)}}}function $i(){let e=new Map,t=new Set;function r(s){return s.startsWith("session-log:")?s:`session-log:${s}`}function n(){for(let s of Array.from(t))try{s()}catch{}}return{set(s,o,a=null){e.set(r(s),{lines:Array.isArray(o)?[...o]:[],last_event_at:typeof a=="number"?a:null}),n()},append(s,o){let a=r(s),i=e.get(a)||{lines:[],last_event_at:null};i.lines=[...i.lines,o],i.last_event_at=Date.now(),e.set(a,i),n()},get(s){return e.get(r(s))||null},clear(s){typeof s=="string"?e.delete(r(s)):e.clear(),n()},subscribe(s){return t.add(s),()=>t.delete(s)}}}var Ci=Td(Ti(),1);function ft(e){return(0,Ci.default)(`beads-ui:${e}`)}function Yt(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function Fr(e,t){let r=Yt(e.created_at),n=Yt(t.created_at);if(r!==n)return r<n?1:-1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function Li(e,t){let r=Yt(e.created_at),n=Yt(t.created_at);if(r!==n)return r<n?-1:1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function Oi(e,t){let r=Yt(e.updated_at),n=Yt(t.updated_at);if(r!==n)return r<n?1:-1;let s=e.id,o=t.id;return s<o?-1:s>o?1:0}function Mi(e,t){let r=e.priority??2,n=t.priority??2;if(r!==n)return r-n;let s=Yt(e.created_at),o=Yt(t.created_at);if(s!==o)return s<o?1:-1;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function Pi(e,t){let r=e.closed_at??0,n=t.closed_at??0;if(r!==n)return r<n?1:-1;let s=e?.id,o=t?.id;return s<o?-1:s>o?1:0}var Wd=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function Ri(e){let t=e&&e.metadata,r=t?t.task_order:void 0;if(r==null||r==="")return Number.POSITIVE_INFINITY;let n=Number(r);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function Ii(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let r=Wd.exec(t);if(!r)return Number.POSITIVE_INFINITY;let n=Number(r[1]);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function Di(e,t){let r=Ri(e),n=Ri(t);if(r!==n)return r<n?-1:1;let s=Ii(e),o=Ii(t);if(s!==o)return s<o?-1:1;let a=Yt(e&&e.created_at),i=Yt(t&&t.created_at);if(a!==i)return a<i?-1:1;let u=e&&e.id,d=t&&t.id;return u===d?0:String(u)<String(d)?-1:1}var xo=2**20;function tn(e,t){let r=e&&e.id;return t&&typeof r=="string"&&Object.prototype.hasOwnProperty.call(t,r)&&typeof t[r]=="number"&&Number.isFinite(t[r])?t[r]:-Yt(e&&e.created_at)}function ds(e){return(t,r)=>{let n=tn(t,e),s=tn(r,e);if(n!==s)return n<s?-1:1;let o=t?.id,a=r?.id;return o<a?-1:o>a?1:0}}function Ao(e,t,r){let n=Array.isArray(e)?e:[],s=n.length,o=Math.max(0,Math.min(t,s-1)),a=o-1>=0?n[o-1]:null,i=o+1<s?n[o+1]:null;if(!a&&!i)return{rank:0};if(!a)return{rank:tn(i,r)-xo};if(!i)return{rank:tn(a,r)+xo};let u=tn(a,r),d=tn(i,r),f=(u+d)/2;return u<f&&f<d?{rank:f}:{renormalize:n.map((_,h)=>({bead_id:_.id,rank:h*xo}))}}function So(e,t={}){let r=ft(`issue-store:${e}`),n=new Map,s=[],o=0,a=new Set,i=!1,u=t.sort||Fr;function d(){for(let h of Array.from(a))try{h()}catch{}}function f(){s=Array.from(n.values()).sort(u)}function _(h){if(i||!h||h.id!==e)return;let C=Number(h.revision)||0;if(r("apply %s rev=%d",h.type,C),!(C<=o&&h.type!=="snapshot")){if(h.type==="snapshot"){if(C<=o)return;n.clear();let A=Array.isArray(h.issues)?h.issues:[];for(let I of A)I&&typeof I.id=="string"&&I.id.length>0&&n.set(I.id,I);f(),o=C,d();return}if(h.type==="upsert"){let A=h.issue;if(A&&typeof A.id=="string"&&A.id.length>0){let I=n.get(A.id);if(!I)n.set(A.id,A);else{let D=Number.isFinite(I.updated_at)?I.updated_at:0,V=Number.isFinite(A.updated_at)?A.updated_at:0;if(D<=V){for(let Y of Object.keys(I))Y in A||delete I[Y];for(let[Y,W]of Object.entries(A))I[Y]=W}}f()}o=C,d()}else if(h.type==="delete"){let A=String(h.issue_id||"");A&&(n.delete(A),f()),o=C,d()}}}return{id:e,subscribe(h){return a.add(h),()=>{a.delete(h)}},applyPush:_,snapshot(){return s},size(){return n.size},getById(h){return n.get(h)},dispose(){i=!0,n.clear(),s=[],a.clear(),o=0}}}function ps(e){let t=String(e.type||"").trim(),r={};if(e.params&&typeof e.params=="object"){let s=Object.keys(e.params).sort();for(let o of s){let a=e.params[o];r[o]=String(a)}}let n=new URLSearchParams(r).toString();return n.length>0?`${t}?${n}`:t}function Ni(e){let t=ft("subs"),r=new Map,n=new Map;function s(i,u){t("applyDelta %s +%d ~%d -%d",i,(u.added||[]).length,(u.updated||[]).length,(u.removed||[]).length);let d=n.get(i);if(!d||d.size===0)return;let f=Array.isArray(u.added)?u.added:[],_=Array.isArray(u.updated)?u.updated:[],h=Array.isArray(u.removed)?u.removed:[];for(let C of Array.from(d)){let A=r.get(C);if(!A)continue;let I=A.itemsById;for(let D of f)typeof D=="string"&&D.length>0&&I.set(D,!0);for(let D of _)typeof D=="string"&&D.length>0&&I.set(D,!0);for(let D of h)typeof D=="string"&&D.length>0&&I.delete(D)}}async function o(i,u){let d=ps(u);if(t("subscribe %s key=%s",i,d),!r.has(i))r.set(i,{key:d,itemsById:new Map});else{let _=r.get(i);if(_&&_.key!==d){let h=n.get(_.key);h&&(h.delete(i),h.size===0&&n.delete(_.key)),r.set(i,{key:d,itemsById:new Map})}}n.has(d)||n.set(d,new Set);let f=n.get(d);f&&f.add(i);try{await e("subscribe-list",{id:i,type:u.type,params:u.params})}catch(_){let h=r.get(i)||null;if(h){let C=n.get(h.key);C&&(C.delete(i),C.size===0&&n.delete(h.key))}throw r.delete(i),_}return async()=>{t("unsubscribe %s key=%s",i,d);try{await e("unsubscribe-list",{id:i})}catch{}let _=r.get(i)||null;if(_){let h=n.get(_.key);h&&(h.delete(i),h.size===0&&n.delete(_.key))}r.delete(i)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:ps,selectors:{getIds(i){let u=r.get(i);return u?Array.from(u.itemsById.keys()):[]},has(i,u){let d=r.get(i);return d?d.itemsById.has(u):!1},count(i){let u=r.get(i);return u?u.itemsById.size:0},getItemsById(i){let u=r.get(i),d={};if(!u)return d;for(let f of u.itemsById.keys())d[f]=!0;return d}}}}function qi(){let e=ft("issue-stores"),t=new Map,r=new Map,n=new Set,s=new Map;function o(){for(let u of Array.from(n))try{u()}catch{}}function a(u,d,f){let _=d?ps(d):"",h=r.get(u)||"",C=t.has(u);if(e("register %s key=%s (prev=%s)",u,_,h),C&&h&&_&&h!==_){let A=t.get(u);if(A)try{A.dispose()}catch{}let I=s.get(u);if(I){try{I()}catch{}s.delete(u)}let D=So(u,f);t.set(u,D);let V=D.subscribe(()=>o());s.set(u,V)}else if(!C){let A=So(u,f);t.set(u,A);let I=A.subscribe(()=>o());s.set(u,I)}return r.set(u,_),()=>i(u)}function i(u){e("unregister %s",u),r.delete(u);let d=t.get(u);d&&(d.dispose(),t.delete(u));let f=s.get(u);if(f){try{f()}catch{}s.delete(u)}}return{register:a,unregister:i,getStore(u){return t.get(u)||null},snapshotFor(u){let d=t.get(u);return d?d.snapshot().slice():[]},subscribe(u){return n.add(u),()=>n.delete(u)}}}function Fi(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function ji(){let e=null,t=!1,r=new Set;function n(){for(let s of Array.from(r))try{s()}catch{}}return{get(){return e},set(s){e=s,n()},isPending(){return t},setPending(s){let o=s===!0;o!==t&&(t=o,n())},clear(){e=null,t=!1,n()},subscribe(s){return r.add(s),()=>r.delete(s)}}}function Bi(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Eo(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function zd(e){let t=String(e||""),r=t.startsWith("#")?t.slice(1):t,n=r.indexOf("?"),s=n>=0?r.slice(n+1):"";if(s){let i=new URLSearchParams(s).get("issue");if(i)return decodeURIComponent(i)}let o=/^\/issue\/([^\s?#]+)/.exec(r);return o&&o[1]?decodeURIComponent(o[1]):null}function Hd(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function Ui(e){let t=ft("router"),r=()=>{let n=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(n),o=s&&s[1]?decodeURIComponent(s[1]):zd(n),a=Hd(n);if(t("hash change \u2192 view=%s id=%s",a,o),e.setState({selected_id:a==="worker"?null:o,view:a,worker:{selected_parent_id:a==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(n)){let u=o?`#/${a}?issue=${encodeURIComponent(o)}`:`#/${a}`;window.location.hash!==u&&(window.location.hash=u)}};return{start(){window.addEventListener("hashchange",r),r()},stop(){window.removeEventListener("hashchange",r)},gotoIssue(n){let s=e.getState?e.getState():{view:"board"},o=s.view==="worker"||s.view==="monitor"?s.view:"board",a=Eo(o,n);t("goto issue %s (view=%s)",n,o),window.location.hash!==a?window.location.hash=a:e.setState({selected_id:o==="worker"?null:n,view:o,worker:{selected_parent_id:o==="worker"?n:null}})},gotoView(n){let s=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},o=n==="worker"?s.worker?.selected_parent_id:s.selected_id,a=o?Eo(n,o):`#/${n}`;t("goto view %s (id=%s)",n,o||""),window.location.hash!==a?window.location.hash=a:e.setState({view:n,selected_id:n==="worker"?null:s.selected_id})}}}var Gd=Object.freeze({workspace_config:{default_workspace:null}});function Wi(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:Gd.workspace_config.default_workspace}}}function zi(e={}){let t=ft("state"),r={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:Wi(e.config)},n=new Set;function s(){for(let o of Array.from(n))try{o(r)}catch{}}return{getState(){return r},setState(o){let a={...r,...o,filters:{...r.filters,...o.filters||{}},board:{...r.board,...o.board||{}},worker:{...r.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:r.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:r.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:r.workspace.hidden},config:o.config!==void 0?Wi(o.config):r.config},i=a.workspace.current?.path!==r.workspace.current?.path||a.workspace.available.length!==r.workspace.available.length||a.workspace.hidden.length!==r.workspace.hidden.length||a.workspace.hidden.some((d,f)=>d!==r.workspace.hidden[f]),u=a.config.workspace_config.default_workspace!==r.config.workspace_config.default_workspace;a.selected_id===r.selected_id&&a.view===r.view&&a.filters.status===r.filters.status&&a.filters.search===r.filters.search&&a.filters.type===r.filters.type&&a.board.closed_filter===r.board.closed_filter&&a.worker.selected_parent_id===r.worker.selected_parent_id&&a.worker.show_closed_children.length===r.worker.show_closed_children.length&&a.worker.show_closed_children.every((d,f)=>d===r.worker.show_closed_children[f])&&!i&&!u||(r=a,t("state change %o",{selected_id:r.selected_id,view:r.view,filters:r.filters,board:r.board,worker:r.worker,workspace:r.workspace.current?.path,config:{default_workspace:r.config.workspace_config.default_workspace}}),s())},subscribe(o){return n.add(o),()=>n.delete(o)}}}function Hi(e){let t=ft("activity"),r=0,n=new Map,s=1;function o(){if(!e)return;let d=r>0;e.toggleAttribute("hidden",!d),e.setAttribute("aria-busy",d?"true":"false")}function a(){r+=1,t("start count=%d",r),o()}function i(){let d=r;r=Math.max(0,r-1),d<=0?t("done called but count was already %d",d):t("done count=%d\u2192%d",d,r),o()}function u(d){return async(_,h)=>{let C=s++,A=Date.now();n.set(C,{type:_,start_ts:A}),t("request start id=%d type=%s count=%d",C,_,r+1),a();let I=!1,D=()=>{I||(I=!0,n.delete(C),i())},V=setTimeout(()=>{I||(t("request TIMEOUT id=%d type=%s elapsed=%dms",C,_,Date.now()-A),D())},3e4);try{let Y=await d(_,h),W=Date.now()-A;return t("request done id=%d type=%s elapsed=%dms",C,_,W),Y}catch(Y){let W=Date.now()-A;throw t("request error id=%d type=%s elapsed=%dms err=%o",C,_,W,Y),Y}finally{clearTimeout(V),D()}}}return o(),{wrapSend:u,start:a,done:i,getCount:()=>r,getActiveRequests:()=>{let d=Date.now();return Array.from(n.entries()).map(([f,_])=>({id:f,type:_.type,elapsed_ms:d-_.start_ts}))}}}function se(e,t="info",r=2800){let n=document.createElement("div");n.className="toast",n.textContent=e,n.style.position="fixed",n.style.right="12px",n.style.bottom="12px",n.style.zIndex="1000",n.style.color="#fff",n.style.padding="8px 10px",n.style.borderRadius="4px",n.style.fontSize="12px",t==="success"?n.style.background="#156d36":t==="warning"?n.style.background="#a36a00":t==="error"?n.style.background="#9f2011":n.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(n),setTimeout(()=>{try{n.remove()}catch{}},r)}function fs(e=void 0,t=void 0){function r(){if(!t||typeof t.get!="function")return null;let o=t.get();return o&&o.order?o.order:{}}function n(o,a,i){let u=e&&e.snapshotFor?e.snapshotFor(o).slice():[];if(a==="closed")return u.sort(Pi),u;switch(i){case"created_desc":return u.sort(Fr),u;case"created_asc":return u.sort(Li),u;case"updated_desc":return u.sort(Oi),u;case"priority":return u.sort(Mi),u;case"manual":default:{let d=r();return d?u.sort(ds(d)):u.sort(Fr),u}}}function s(o){let a=[];return e&&typeof e.subscribe=="function"&&a.push(e.subscribe(o)),t&&typeof t.subscribe=="function"&&a.push(t.subscribe(o)),()=>{for(let i of a)try{i()}catch{}}}return{selectBoardColumn:n,subscribe:s}}function jr(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function kt(e){let t=jr(e);if(t===null)return"";let r=new Date(t),n=s=>String(s).padStart(2,"0");return`${r.getFullYear()}-${n(r.getMonth()+1)}-${n(r.getDate())} ${n(r.getHours())}:${n(r.getMinutes())}`}function Nt(e,t){let r=jr(e);if(r===null)return"";let s=(typeof t=="number"?t:Date.now())-r;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let a=Math.floor(s/36e5);if(a<24)return`${a}\uC2DC\uAC04 \uC804`;let i=Math.floor(s/864e5);if(i<7)return`${i}\uC77C \uC804`;let u=Math.floor(i/7);if(i<30)return`${u}\uC8FC \uC804`;let d=Math.floor(i/30);return d<12?`${d}\uAC1C\uC6D4 \uC804`:`${Math.floor(i/365)}\uB144 \uC804`}function _s(e){if(!Array.isArray(e))return null;let t=null,r=-1;for(let n of e){if(!n||n.status!=="in_progress")continue;let s=jr(n.updated_at)??0;if(t===null||s>r){t=n,r=s;continue}s===r&&String(n.id)<String(t.id)&&(t=n)}return t}function ms(e){let t=e.transport,r=e.uiOrderStore;function n(a,i){return"renormalize"in a?a.renormalize:[{bead_id:i,rank:a.rank}]}function s(a,i){let u={...a.order};for(let d of i)u[d.bead_id]=d.rank;r&&r.set({revision:a.revision,order:u})}async function o(a,i,u){if(!t||!r)return;let d=r.get()||{revision:0,order:{}},f=n(Ao(i,u,d.order),a);s(d,f);let _=await t("ui-order-set",{expected_revision:d.revision,entries:f});if(_&&_.conflict){let h={revision:typeof _.revision=="number"?_.revision:0,order:_.order||{}};r.set(h);let C=n(Ao(i,u,h.order),a);s(h,C);let A=await t("ui-order-set",{expected_revision:h.revision,entries:C});A&&A.applied&&r.set({revision:typeof A.revision=="number"?A.revision:0,order:A.order||{}})}else _&&_.applied&&r.set({revision:typeof _.revision=="number"?_.revision:0,order:_.order||{}})}return{applyReorder:o}}function gs(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function To(e,t){return!t||typeof e!="string"||e.length===0||gs(t.visible_labels).includes(e)?!0:gs(t.hidden_labels).includes(e)?!1:!gs(t.hidden_prefixes).some(r=>r.length>0&&e.startsWith(r))}function bs(e,t){return gs(e).filter(r=>To(r,t))}function xr(e,t){let r=e&&e.chips?e.chips[t]:void 0;return typeof r=="boolean"?r:!0}var Vd={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},Vi={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},Gi={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},Kd={review:"\u2713",skip:"\u2298"},Ar={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function Yd(e,t,r){if(!(r==="in_progress"||r==="resolved"))return null;for(let s of e){let o=t[s];if(o&&o.fill==="dim"&&o.stale!==!0)return s}return null}function Ki(e){let t=e&&e.fill||"none";return t==="none"?Ar.none:e&&e.stale===!0?Ar.stale:t==="dim"?Ar.dim:e&&e.glyph==="review"?Ar.review:e&&e.glyph==="skip"?Ar.skip:Ar.done}function Zd(e){if(!e||e.fill==="none"||!e.approval_state)return Ki(e);let t=[];return e.glyph==="review"?t.push(Ar.review):e.glyph==="skip"&&t.push(Ar.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function Xd(e,t,r){let n=Vd[e]||e,s=t&&t.fill||"none",o=!!t&&t.stale===!0,a=Kd[t&&t.glyph||""]||"",i="bar";s==="dim"?i+=` b-${n} dim`:s==="full"&&(i+=` b-${n} full`),o&&(i+=" stale"),r&&(i+=" cur");let u=s==="none"?"lbl":`lbl l-${n} on`,d=r?`color: var(--stage-${n}-on)`:"";return l`
    <div class="seg">
      <div class=${i} style=${d}>${a}</div>
      <div class=${u}>
        ${Vi[e]||e}
      </div>
    </div>
  `}function hs(e,t){if(!e||!e.stages)return"";let r=Gi[e.route]||Gi.spec_backed,n=e.stages,s=Yd(r,n,String(t||"open")),o=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${r.map(a=>`${Vi[a]||a} ${a==="plan"?Zd(n[a]||{}):Ki(n[a]||{})}`).join(" \xB7 ")}`;return l`
    <div class="stp" role="img" aria-label=${o}>
      ${r.map(a=>Xd(a,n[a]||{},a===s))}
    </div>
  `}function Qd(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var Yi=2;function Jd(e){if(!e)return[];let t=[];if(e.external){let n=e.reason?`\u23F8 blocked: ${e.reason}`:"\u23F8 blocked";t.push(l`<span class="ctl-chip ctl-chip--blocked">${n}</span>`)}let r=Array.isArray(e.blockers)?e.blockers:[];if(r.length>0){let n=r.slice(0,Yi).join(", "),s=r.length-Yi,o=`\u26D3 blocked: ${n}${s>0?` +${s}`:""}`;t.push(l`<span class="ctl-chip ctl-chip--blocked-dep">${o}</span>`)}return t}function Co(e){return e==="delegated"?"\uC704\uC784":e==="main"?"\uBA54\uC778":null}function Zi(e){return e.effort?`${e.actor}:${e.effort}`:e.actor}function Br(e){return`${e.kind}:${Zi(e)}@${e.sha}`}function ys(e,t){if(!e)return null;let r=Co(e.kind),n=e.reason,s=e.kind==="delegated"?n===null:typeof n=="string"&&n.trim().length>0&&!/[\r\n]/.test(n);if(!r||!s)return null;let o=Co(t?.kind),a=o!==null&&t?.kind!==e.kind,i=`\uACC4\uD68D \xB7 ${r}${a?` \u2192 ${o}`:""}`,u=`planned_execution ${e.kind}${typeof n=="string"?`:${n}`:""}`,d=t?` \xB7 exec_receipt ${Br(t)}`:"";return{kind:e.kind,label:i,title:`${u}${d}`}}function Xi(e,t){let r=ys(e,t);return r?l`<span
        class="ctl-chip ctl-chip--planned"
        data-kind=${r.kind}
        title=${r.title}
        >${r.label}</span
      >`:null}function ep(e){if(!e)return null;let t=Co(e.kind);return t?l`<span
    class="ctl-chip ctl-chip--exec-receipt"
    title=${`exec_receipt ${Br(e)}`}
    >${`\uC2E4\uD589 \xB7 ${t}`}</span
  >`:null}function tp(e,t){let r=t.policy||null,n=e.workflow&&e.workflow.chips||{},s=[];if(n.route&&xr(r,"route")){let i=n.route_source==="derived";s.push(l`<span
        class="ctl-chip ctl-chip--route${i?" is-derived":""}"
        title=${i?"route \uBBF8\uD540 (metadata unset)":"route"}
        >${i?"unset":n.route}</span
      >`)}if(n.fast_track&&xr(r,"fast_track")&&s.push(l`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),n.pr&&xr(r,"pr")){let i=n.pr.number;s.push(l`<span class="ctl-chip ctl-chip--pr"
        >${`PR${i!=null?` #${i}`:""}`}</span
      >`)}let o=Xi(n.planned_execution,n.exec_receipt);if(o&&s.push(o),n.exec_receipt){let i=n.exec_receipt;s.push(l`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${Br(i)}`}
        >${`exec ${i.kind==="delegated"?Zi(i):`main:${i.actor}`} \xB7 ${i.sha.slice(0,7)}`}</span
      >`)}if(n.impl_entry){let i=n.impl_entry;s.push(l`<span
        class="ctl-chip ctl-chip--impl-entry"
        title=${`impl_entry ${i.actor}@${i.sha}`}
        >${`impl ${i.actor} \xB7 ${i.sha.slice(0,7)}`}</span
      >`)}for(let i of bs(e.labels,r))s.push(l`<span class="ctl-chip ctl-chip--label">${i}</span>`);return e.from_id&&xr(r,"from")&&s.push(l`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${i=>{i.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(i,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),xr(r,"blocked")&&s.push(...Jd(e.blocked_info)),t.cleanupFailureFor&&t.cleanupFailureFor(e.id)&&xr(r,"blocked")&&s.push(l`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 멈춤</span>`),s.length===0?"":l`<div class="board-card__chips">${s}</div>`}function rp(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function np(e){let t=Nt(e.created_at),r=Nt(e.updated_at);return!t&&!r?"":l`<span class="board-card__times">
    ${t?l`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${kt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}
    ${t&&r?l`<span class="board-card__time-sep">·</span>`:""}
    ${r?l`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${kt(e.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </span>`}function sp(e,t){let r=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]},n=r.total||0,s=t.isExpanded?t.isExpanded(e.id):!0,o=n>0?r.children.slice().sort(Di):r.children;return l`
    <div class="board-card__roll">
      <div class="board-card__roll-meta">
        ${n>0?l`<button
              type="button"
              class="board-card__roll-toggle"
              aria-expanded=${s?"true":"false"}
              @click=${a=>t.onRollupToggle&&t.onRollupToggle(a,e.id)}
            >
              children ${r.count}/${n} ${s?"\u25B4":"\u25BE"}
            </button>`:l`<span class="board-card__roll-none">children 없음</span>`}
        ${np(e)}
      </div>
      ${n>0&&r.current?l`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${r.current.title||r.current.id}</span
            >
          </div>`:""}
      ${s&&n>0?l`<div class="board-card__roll-list">
            ${o.map((a,i)=>l`<button
                  type="button"
                  class="board-card__roll-child"
                  @click=${u=>t.onChildClick&&t.onChildClick(u,a.id)}
                >
                  <span class=${rp(a.status)}>●</span>
                  <span class="board-card__roll-child-ord">${i+1}</span>
                  <span class="board-card__roll-child-title"
                    >${a.title||a.id}</span
                  >
                  ${ys(a.workflow?.chips?.planned_execution,a.workflow?.chips?.exec_receipt)?l`<span class="board-card__roll-child-chips">
                        ${Xi(a.workflow?.chips?.planned_execution,a.workflow?.chips?.exec_receipt)}
                        ${ep(a.workflow?.chips?.exec_receipt)}
                      </span>`:""}
                </button>`)}
          </div>`:""}
    </div>
  `}function vs(e,t){let r=Qd(e.priority);return l`
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
        ${r?l`<span class="board-card__pri">${r}</span>`:""}
      </div>
      <div class="board-card__title">${e.title||"(\uC81C\uBAA9 \uC5C6\uC74C)"}</div>
      ${tp(e,t)}
      ${e.workflow&&xr(t.policy||null,"stepper")?hs(e.workflow,e.status):""}
      ${sp(e,t)}
    </article>
  `}function rn(e,t){let r=Array.isArray(e.items)?e.items.length:0,n=e.is_closed===!0;return l`
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
        ${n?l`<select
              class="board-column__closed-range"
              aria-label="Closed period"
              @change=${t.onClosedRangeChange}
            >
              ${lr.map(o=>l`<option
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
        ${e.items.map(o=>vs(o,t))}
      </div>
    </section>
  `}function Qi(e,t,r){return l`
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
          ${e.items.length===0?l`<div class="deferred-popup__empty">Deferred 이슈 없음</div>`:e.items.map(n=>vs(n,t))}
        </div>
      </div>
    </dialog>
  `}var op=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],ap=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],ip=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function lp(e,t,r){let n=e.labels.length,s=n>0?`\uB77C\uBCA8 ${n}`:"\uB77C\uBCA8";return l`
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
      ${r.label_menu_open?l`<div class="board-filter__label-menu" role="group">
            ${r.label_options.length===0?l`<div class="board-filter__label-empty">라벨 없음</div>`:r.label_options.map(o=>l`<label class="board-filter__label-row">
                      <input
                        type="checkbox"
                        .checked=${e.labels.includes(o)}
                        @change=${()=>t.onLabelToggle(o)}
                      />
                      <span>${o}</span>
                    </label>`)}
            ${n>0?l`<button
                  type="button"
                  class="board-filter__label-clear"
                  @click=${t.onLabelClear}
                >
                  선택 해제
                </button>`:""}
          </div>`:""}
    </div>
  `}function Ji(e,t,r){return l`
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
        ${op.map(n=>l`<option
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
        ${ap.map(n=>l`<option
              value=${n.value}
              ?selected=${e.type===n.value}
            >
              ${n.label}
            </option>`)}
      </select>
      ${lp(e,t,r)}
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
        ${ip.map(n=>l`<option
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
  `}var cp=200,up={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},dp=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),el="beads-ui.board.sort",tl=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function pp(){try{let e=window.localStorage.getItem(el);if(e&&tl.has(e))return e}catch{}return"created_desc"}function rl(e,t){let r=ft("views:board"),n=t.gotoIssue,s=t.issueStores,o=t.transport,a=t.uiOrderStore,i=t.displayPolicyStore,u=t.workerQueueStore,d=t.onClosedRangeChange,f=t.onNewIssue,_=t.closedRange||Dt,h=s?fs(s,a):null,C=ms({transport:o,uiOrderStore:a}),A=[],I=[],D=[],V=[],Y=[],W=[],R=!1,S=0,P=pp(),w=new Map,B=new Map,te=new Map,le=new Set,M={search:"",priority:"",type:"",labels:[]},L=!1,ue=null;function ge(j){return String(j.status||"open")==="open"}function $e(j){let J=String(j.status||"open");return J==="open"||J==="blocked"}function Be(j){let J=M.search.trim().toLowerCase(),pe=M.priority,v=M.type,T=M.labels;return j.filter(N=>{if(J){let X=String(N.id||"").toLowerCase(),we=String(N.title||"").toLowerCase();if(!X.includes(J)&&!we.includes(J))return!1}if(pe!==""&&String(N.priority)!==pe||v!==""&&String(N.issue_type||"")!==v)return!1;if(T.length>0){let X=Array.isArray(N.labels)?N.labels:[];if(!T.some(we=>X.includes(we)))return!1}return!0})}function Qe(){let j=new Set;for(let J of[A,I,D,V,Y,W])for(let pe of J){let v=Array.isArray(pe.labels)?pe.labels:[];for(let T of v)typeof T=="string"&&T.length>0&&j.add(T)}return Array.from(j).sort()}function Ve(){return M.search.trim()!==""||M.priority!==""||M.type!==""||M.labels.length>0}function Me(){try{if(h){let j=h.selectBoardColumn("tab:board:in-progress","in_progress",P),J=h.selectBoardColumn("tab:board:blocked","blocked",P).filter($e),pe=new Set(j.map(Le=>Le.id)),v=h.selectBoardColumn("tab:board:ready","ready",P).filter(Le=>ge(Le)&&!pe.has(Le.id)),T=h.selectBoardColumn("tab:board:resolved","resolved",P),N=h.selectBoardColumn("tab:board:deferred","deferred",P),X=h.selectBoardColumn("tab:board:closed","closed").slice(0,cp),we=[...J,...v,...j,...T,...X];Ue(we);let Q=new Set;for(let Le of we)Le&&Le.id&&!Ro(Le)&&Q.add(Le.id);let xe=!Ve();A=xe?vn(J,Q):J,I=xe?vn(v,Q):v,D=xe?vn(j,Q):j,V=xe?vn(T,Q):T,Y=N,S=N.length,W=xe?vn(X,Q):X,w=new Map;for(let Le of A)w.set(Le.id,"open");for(let Le of I)w.set(Le.id,"open");for(let Le of D)w.set(Le.id,"in_progress");for(let Le of V)w.set(Le.id,"resolved");for(let Le of Y)w.set(Le.id,"deferred");for(let Le of W)w.set(Le.id,"closed");B=new Map;for(let Le of A)B.set(Le.id,"blocked-col");for(let Le of I)B.set(Le.id,"ready-col");for(let Le of D)B.set(Le.id,"in-progress-col");for(let Le of V)B.set(Le.id,"resolved-col");for(let Le of W)B.set(Le.id,"closed-col")}O()}catch{A=[],I=[],D=[],V=[],Y=[],W=[],te=new Map,O()}}function Ue(j){let J=new Map;for(let v of j)v&&v.id&&!J.has(v.id)&&J.set(v.id,v);let pe=new Map;for(let v of J.values()){let T=Ro(v);if(!T)continue;let N=pe.get(T);N||(N=[],pe.set(T,N)),N.push({id:v.id,title:v.title,status:v.status,metadata:v.metadata,workflow:v.workflow,created_at:v.created_at,updated_at:v.updated_at})}te=pe}function ie(j){let J=te.get(j)||[],pe=0;for(let T of J)(T.status==="resolved"||T.status==="closed")&&(pe+=1);let v=_s(J);return{total:J.length,count:pe,current:v,children:J}}function Ae(j){return!le.has(j)}function Ie(j,J){j.preventDefault(),j.stopPropagation(),le.has(J)?le.delete(J):le.add(J),O()}function Ee(j,J){j.preventDefault(),j.stopPropagation(),n(J)}function be(j,J){j.preventDefault(),j.stopPropagation(),n(J)}function We(j,J){ue||n(J)}function et(j,J){j.preventDefault(),j.stopPropagation(),fp(J).then(pe=>{pe&&se("\uBCF5\uC0AC\uB428","success",1200)})}function Te(j,J){ue=J,j.dataTransfer&&(j.dataTransfer.setData("text/plain",J),j.dataTransfer.effectAllowed="move"),j.target.classList.add("board-card--dragging")}function tt(j){j.target.classList.remove("board-card--dragging"),je(),setTimeout(()=>{ue=null},0)}function K(j){let J=String(j.target.value||"");!J||J===_||(_=J,d&&d(J),O())}function F(){return i?i.get():null}function re(j){let J=u?u.get():null,pe=J?J.cleanup_failed:null;if(!pe||typeof pe!="object"||Array.isArray(pe))return null;let v=pe[j];return!v||typeof v!="object"||Array.isArray(v)?null:v}let Oe={onCardClick:We,onCopyId:et,onDragStart:Te,onDragEnd:tt,onClosedRangeChange:K,rollupFor:ie,isExpanded:Ae,onRollupToggle:Ie,onChildClick:Ee,onFromChipClick:be,cleanupFailureFor:re,get policy(){return F()}};function Fe(j,J){ue||(de(),n(J))}function ze(j,J){j.preventDefault(),j.stopPropagation(),de(),n(J)}let Ce={...Oe,onCardClick:Fe,onChildClick:ze,onFromChipClick:ze,get policy(){return F()}};function ct(j){let J=j.target,pe=e.querySelector(".board-filter__labels");J&&pe&&pe.contains(J)||ee()}function Ye(j){j.key==="Escape"&&ee()}function H(){L||(L=!0,document.addEventListener("mousedown",ct),document.addEventListener("keydown",Ye),O())}function ee(){L&&(L=!1,document.removeEventListener("mousedown",ct),document.removeEventListener("keydown",Ye),O())}function De(j){j.key==="Escape"&&de()}function rt(){R||(R=!0,document.addEventListener("keydown",De),O())}function de(){R&&(R=!1,document.removeEventListener("keydown",De),O())}let b={onClose:de,onOverlayClick(j){j.target===j.currentTarget&&de()}},$={onSearchInput(j){M.search=String(j.target.value||""),Me()},onPriorityChange(j){M.priority=String(j.target.value||""),Me()},onTypeChange(j){M.type=String(j.target.value||""),Me()},onSortChange(j){let J=String(j.target.value||"");if(!(!tl.has(J)||J===P)){P=J;try{window.localStorage.setItem(el,J)}catch{}Me()}},onDeferredToggle(){R?de():rt()},onLabelMenuToggle(){L?ee():H()},onLabelToggle(j){let J=M.labels.indexOf(j);J===-1?M.labels.push(j):M.labels.splice(J,1),Me()},onLabelClear(){M.labels.length!==0&&(M.labels=[],Me())},onNewIssue(){f&&f()}};function k(){return l`
      <div class="board-view">
        ${Ji(M,$,{sort_mode:P,deferred_popup_open:R,deferred_count:S,label_options:Qe(),label_menu_open:L})}
        <div class="board-root">
          ${rn({title:"Blocked",id:"blocked-col",items:Be(A)},Oe)}
          ${rn({title:"Ready",id:"ready-col",items:Be(I)},Oe)}
          ${rn({title:"In progress",id:"in-progress-col",items:Be(D)},Oe)}
          ${rn({title:"Resolved",id:"resolved-col",items:Be(V)},Oe)}
          ${rn({title:"Closed",id:"closed-col",items:Be(W),is_closed:!0,closed_range:_},Oe)}
        </div>
        ${R?Qi({items:Be(Y),count:S},Ce,b):""}
      </div>
    `}function O(){Ge(k(),e),G()}function G(){try{let j=e.querySelector("#deferred-popup");j&&!j.open&&(typeof j.showModal=="function"?j.showModal():j.setAttribute("open",""));let J=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let pe of J)Array.from(pe.querySelectorAll(".board-card")).forEach((T,N)=>{T.tabIndex=N===0?0:-1})}catch{}}async function Z(j,J){if(!o){se("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:j,status:J}),se("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(pe){r("update-status failed: %o",pe),se("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function ne(j){switch(j){case"blocked-col":return A;case"ready-col":return I;case"in-progress-col":return D;case"resolved-col":return V;default:return[]}}function ce(j,J,pe){if(!o||!a)return;let v=ne(j),T=v.find(xe=>xe.id===J);if(!T)return;let N=v.filter(xe=>xe.id!==J),X=pe.closest?pe.closest(".board-card"):null,we=N.length;if(X){let xe=X.getAttribute("data-issue-id");if(xe===J)return;let Le=N.findIndex(gt=>gt.id===xe);Le>=0&&(we=Le)}let Q=N.slice();Q.splice(we,0,T),C.applyReorder(J,Q,we)}function je(){for(let j of Array.from(e.querySelectorAll(".board-column--drag-over")))j.classList.remove("board-column--drag-over")}let me=null;e.addEventListener("dragover",j=>{j.preventDefault(),j.dataTransfer&&(j.dataTransfer.dropEffect="move");let pe=j.target.closest(".board-column");pe&&pe!==me&&(me&&me.classList.remove("board-column--drag-over"),pe.classList.add("board-column--drag-over"),me=pe)}),e.addEventListener("dragleave",j=>{let J=j.relatedTarget;(!J||!e.contains(J))&&me&&(me.classList.remove("board-column--drag-over"),me=null)}),e.addEventListener("drop",j=>{j.preventDefault(),me&&(me.classList.remove("board-column--drag-over"),me=null);let J=j.target,pe=J.closest(".board-column");if(!pe)return;let v=j.dataTransfer?.getData("text/plain")||"";if(!v)return;let T=pe.id,N=B.get(v);if(N&&N===T){if(dp.has(T)){if(P!=="manual"){se("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}ce(T,v,J)}return}let X=up[T];if(!X){se("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}w.get(v)!==X&&Z(v,X)}),e.addEventListener("keydown",j=>{let J=j.target;if(!(J instanceof HTMLElement))return;let pe=String(J.tagName||"").toLowerCase();if(pe==="input"||pe==="textarea"||pe==="select"||pe==="button"||pe==="a"||J.isContentEditable===!0)return;let v=J.closest(".board-card");if(!v)return;let T=String(j.key||"");if(T==="Enter"||T===" "){j.preventDefault();let Q=v.getAttribute("data-issue-id");Q&&n(Q);return}if(T!=="ArrowUp"&&T!=="ArrowDown"&&T!=="ArrowLeft"&&T!=="ArrowRight")return;j.preventDefault();let N=v.closest(".board-column");if(!N)return;let X=Array.from(N.querySelectorAll(".board-card")),we=X.indexOf(v);if(T==="ArrowDown"&&we<X.length-1){Se(v,X[we+1]);return}if(T==="ArrowUp"&&we>0){Se(v,X[we-1]);return}if(T==="ArrowLeft"||T==="ArrowRight"){let Q=Array.from(e.querySelectorAll(".board-column")),xe=Q.indexOf(N),Le=T==="ArrowRight"?1:-1,gt=xe+Le;for(;gt>=0&&gt<Q.length;){let ht=Q[gt].querySelector(".board-card");if(ht){Se(v,ht);return}gt+=Le}}});function Se(j,J){try{j.tabIndex=-1,J.tabIndex=0,J.focus()}catch{}}let he=null;h&&h.subscribe&&(he=h.subscribe(()=>{try{Me()}catch{}}));let st=null;i&&i.subscribe&&(st=i.subscribe(()=>{try{Me()}catch{}}));let ot=null;return u&&u.subscribe&&(ot=u.subscribe(()=>{O()})),{async load(){r("load"),Me()},clear(){ee(),de(),he&&(he(),he=null),st&&(st(),st=null),ot&&(ot(),ot=null),e.replaceChildren(),A=[],I=[],D=[],V=[],Y=[],W=[],w=new Map,B=new Map}}}function Ro(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function vn(e,t){return e.filter(r=>{let n=Ro(r);return!(n&&t.has(n))})}async function fp(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let r=!1;try{r=document.execCommand("copy")}finally{t.remove()}return r}catch{return!1}}async function Zt(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let r=document.createElement("textarea");r.value=t,r.style.position="fixed",r.style.left="-9999px",document.body.appendChild(r),r.select();let n=!1;try{n=document.execCommand("copy")}finally{r.remove()}return n}catch{return!1}}function cr(e){return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,e.speed==="fast"?"Fast":null].filter(Boolean).join(" \xB7 ")}function Sr(e){return typeof e.resumed_from!="string"||e.resumed_from.length===0?null:`${e.continuation_mode==="session"?"session \uC774\uC5B4\uBC1B\uC74C":e.continuation_mode==="fresh"?"\uC0C8 session\uC73C\uB85C \uC774\uC5B4\uBC1B\uC74C":"\uC774\uC804 attempt\uC5D0\uC11C \uC774\uC5B4\uBC1B\uC74C"} (from ${e.resumed_from})`}function _p(e,t=document){let r=t.createElement("dialog");r.className="continuation-dialog";let n=t.createElement("button"),s=t.createElement("button"),o=t.createElement("button"),a=t.createElement("h2"),i=t.createElement("p");return a.textContent="\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4",i.textContent=`${cr(e.prior||{})||"\uC774\uC804 \uC124\uC815"} \u2192 ${cr(e.current||{})||"\uD604\uC7AC \uC124\uC815"}`,n.type="button",n.textContent="\uAE30\uC874 session \uC774\uC5B4\uD558\uAE30",n.disabled=e.prior_available===!1,s.type="button",s.textContent="\uD604\uC7AC preset\uC73C\uB85C \uC0C8 session",o.type="button",o.textContent="\uCDE8\uC18C",r.append(a,i,n,s,o),t.body.append(r),new Promise(u=>{let d=f=>{typeof r.close=="function"&&r.close(),r.remove(),u(f)};n.addEventListener("click",()=>d("prior_session")),s.addEventListener("click",()=>d("fresh_current")),o.addEventListener("click",()=>d(null)),r.addEventListener("cancel",f=>{f.preventDefault(),d(null)}),typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")})}async function mr(e,t,r={}){let n=e;for(r.onResult?.(n);n?.continuation_mismatch;){let s=n.continuation_mismatch,o=await _p(s);if(o===null)return n;n=await t(o,s.decision_token),r.onResult?.(n),n?.conflict&&r.refresh&&(n=await r.refresh(n),r.onResult?.(n))}return n}var mp=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed","orchestration_model","orchestration_effort","orchestration_speed"],nl={spec_review_effort:"spec_review_model",plan_review_effort:"plan_review_model",impl_review_effort:"impl_review_model"},gp=new Set(["native-fixed-posture","unsupported","claude-runner-model-default","catalog-validated","provider-tier-or-runtime-model-default","actual-effort"]);function Et(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function yt(e){return typeof e=="string"&&e.length>0?e:null}function ws(e){return e.startsWith("gpt-")?e.slice(4):e}function bt(e,t,r,n,s){return{value:e,source:t,display:r,full_value:n,resolution:s}}function il(e,t,r){let n=yt(t[e]);if(n!==null)return{value:n,source:"pin"};let s=yt(r[e]);return s===null?null:{value:s,source:"global"}}function wn(e,t,r,n){return il(e,t,r)||{value:n,source:"base"}}function sl(e,t,r,n){let s=r?.implementation?.model_catalog;if(t&&Et(s?.[t])){let a=yt(s[t][e]);if(a!==null)return a}if(t&&Array.isArray(s?.[t])&&s[t].includes(e))return e;if(!t&&Et(s)){for(let a of Object.values(s))if(Et(a)){let i=yt(a[e]);if(i!==null)return i}else if(Array.isArray(a)&&a.includes(e))return e}let o=n?.model_index?.[e];return yt(n?.runners?.[o]?.models?.[e]?.id)||e}function bp(e,t){return yt(t?.review?.reviewers?.[e]?.model)||e}function kn(e,t,r=!1){if(e==="default")return bt(e,t,`default (\uC77C\uBC18 \xB7 ${t==="pin"?"\uD540":"\uC804\uC5ED \uACE0\uC815"})`,e,"explicit");let n=r?ws(e):e;return bt(e,t,n,e,"explicit")}function hp(e,t,r){let n=t?.implementation?.model_catalog?.[e],s=[];Et(n)?s.push(...Object.keys(n)):Array.isArray(n)&&s.push(...n.filter(a=>typeof a=="string"));let o=r?.runners?.[e]?.models;if(Et(o))for(let a of Object.keys(o))s.includes(a)||s.push(a);return s}function ol(e){return bt(e.value,e.source,`${e.value} (\uBE44\uD638\uD658)`,e.value,"incompatible")}function al(e,t,r){let n=il(e,t,r);return n?kn(n.value,n.source):bt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable")}function nn(e){let t=Et(e.pin)?e.pin:{},r=Et(e.global)?e.global:{},n=Et(e.execution_defaults)?e.execution_defaults:null,s=n?.supported===!0&&Et(n.session)?n.session:null,o=n?.supported===!0&&Et(n.orchestration)?n.orchestration:null,a=Et(e.runner_catalog)?e.runner_catalog:null,i={};if(s){let u=wn("workflow_mode",t,r,yt(s.workflow_mode_default));i.workflow_mode=u.source==="base"?bt(u.value,"base",u.value||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",u.value,"default"):kn(u.value,u.source);for(let A of["spec_review","plan_review","impl_review"]){let I=`${A}_model`,D=yt(A==="plan_review"?u.value==="fast_track"?s.plan_review?.fast_track_default:s.plan_review?.standard_recommended:s.review?.default),V=wn(I,t,r,D);if(V.value===null)i[I]=bt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");else if(V.value!=="self"&&V.value!=="skip"&&!Et(s.review?.reviewers?.[V.value]))i[I]=ol(bt(V.value,V.source,"",null,"explicit"));else{let Y=bp(V.value,s);i[I]=bt(V.value,V.source,ws(Y),Y,V.source==="base"?"default":"explicit")}}for(let[A,I]of Object.entries(nl)){let D=i[I].value;if(D==="self"||D==="skip"){i[A]=bt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable");continue}let V=yt(s.review?.reviewers?.[D||""]?.effort),Y=wn(A,t,r,V);i[A]=Y.value===null?bt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):bt(Y.value,Y.source,Y.value,Y.value,Y.source==="base"?"default":"explicit")}let d=Et(s.implementation?.default)?s.implementation.default:{},f=yt(e.route),_=f!==null&&["quick_fix","spec_backed","full_plan"].includes(f),h=Et(s.implementation?.route_defaults)?s.implementation.route_defaults:{},C=_&&Et(h[f])?h[f]:{};for(let A of["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]){let I=wn(A,t,r,A==="impl_dispatch"?yt(C.dispatch)||yt(d.dispatch):yt(d[A.replace("impl_","")]));i[A]=I.value===null?bt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):bt(I.value,I.source,I.value,I.value,I.source==="base"?"default":"explicit")}if(i.impl_dispatch.value==="main"){i.impl_dispatch.display="\uBA54\uC778";for(let A of["impl_runtime","impl_model","impl_effort","impl_speed"])i[A]=bt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else{if(i.impl_dispatch.value==="delegated"&&(i.impl_dispatch.display="\uC704\uC784"),i.impl_runtime.value==="inherit"&&(i.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",i.impl_runtime.resolution="dynamic"),i.impl_model.value!==null){let A=i.impl_runtime.value==="inherit"?yt(e.controller_runtime):i.impl_runtime.value,I=A?hp(A,s,a):[];if(i.impl_model.value!=="auto"&&I.length>0&&!I.includes(i.impl_model.value))i.impl_model=ol(i.impl_model);else{let D=sl(i.impl_model.value,A,s,a);i.impl_model.display=ws(D),i.impl_model.full_value=D}}if(i.impl_effort.value==="auto"){let A=yt(e.transport)||(i.impl_runtime.value==="codex"?"codex-native-spawn":i.impl_runtime.value==="claude"?"implement-claude":null),I=A?yt(s.implementation?.effort_by_transport?.[A]?.auto):null;I&&!gp.has(I)?(i.impl_effort.display=`${I} (\uBE44\uD638\uD658)`,i.impl_effort.full_value=I,i.impl_effort.resolution="incompatible"):(i.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",i.impl_effort.resolution="dynamic")}i.impl_speed.value==="default"&&(i.impl_speed=i.impl_speed.source==="base"?bt("default","base","default (\uC77C\uBC18)","default","default"):kn("default",i.impl_speed.source))}}else for(let u of mp.filter(d=>!d.startsWith("orchestration_")))i[u]=al(u,t,r);if(!s){for(let[u,d]of Object.entries(nl))(i[d].value==="self"||i[d].value==="skip")&&(i[u]=bt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable"));if(i.impl_dispatch.value==="main"){i.impl_dispatch.display="\uBA54\uC778";for(let u of["impl_runtime","impl_model","impl_effort","impl_speed"])i[u]=bt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else i.impl_dispatch.value==="delegated"&&(i.impl_dispatch.display="\uC704\uC784"),i.impl_runtime.value==="inherit"&&(i.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",i.impl_runtime.resolution="dynamic"),i.impl_effort.value==="auto"&&(i.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",i.impl_effort.resolution="dynamic")}for(let u of["orchestration_model","orchestration_effort","orchestration_speed"]){if(!o){i[u]=al(u,t,r);continue}let d=u.replace("orchestration_",""),f=yt(o[d]),_=wn(u,t,r,f);if(u==="orchestration_effort"&&_.source==="base"){i[u]=bt(null,"base","CLI \uAE30\uBCF8 (\uBBF8\uC9C0\uC815)",null,"default");continue}if(_.value===null){i[u]=bt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");continue}if(u==="orchestration_model"){let h=_.source==="base"?yt(o.model_id)||_.value:sl(_.value,null,s,a);i[u]=bt(_.value,_.source,ws(h),h,_.source==="base"?"default":"explicit");continue}if(_.value==="default"){i[u]=_.source==="base"?bt("default","base","default (\uC77C\uBC18)","default","default"):kn("default",_.source);continue}i[u]=kn(_.value,_.source)}return i}function yp(e,t){let r=t&&e.value==="default"?"default (\uC77C\uBC18)":e.display;if(!t||e.source==="pin")return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${e.display}`;let n=e.source==="global"?"\uC804\uC5ED":"harness";return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${r} (${n})`}function ks(e){let t=Et(e.pin)?e.pin:{},r=Et(e.global)?e.global:{},n=f=>nn({pin:e.layer==="pin"?f:t,global:e.layer==="pin"?r:f,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog,controller_runtime:e.controller_runtime}),s=e.layer==="pin"?t:r,o={...s};delete o[e.key];let a=n(o)[e.key],i=n(s)[e.key],u=yt(s[e.key]),d=[...e.choices];return u!==null&&!d.includes(u)&&d.unshift(u),{unset_label:yp(a,e.layer==="pin"),full_value:a.full_value,unavailable:a.resolution==="unavailable",disabled:i?.resolution==="not_applicable",options:d.map(f=>{let _=n({...s,[e.key]:f})[e.key];return{value:f,label:_.display,full_value:_.full_value}})}}function sn(e=document){let t=e.createElement("dialog");t.className="resume-instructions-dialog";let r=e.createElement("h2"),n=e.createElement("textarea"),s=e.createElement("div"),o=e.createElement("button"),a=e.createElement("button");return r.textContent="\uC138\uC158 \uC774\uC5B4\uD558\uAE30",n.placeholder="\uCD94\uAC00 \uC9C0\uCE68 (\uC120\uD0DD) \u2014 \uBE44\uC6CC\uB450\uBA74 \uAE30\uBCF8 \uC808\uCC28\uB85C \uC7AC\uAC1C",n.maxLength=4e3,s.className="resume-instructions-dialog__actions",o.type="button",o.textContent="\uC774\uC5B4\uD558\uAE30",a.type="button",a.textContent="\uCDE8\uC18C",s.append(o,a),t.append(r,n,s),e.body.append(t),new Promise(i=>{let u=!1,d=_=>{u||(u=!0,typeof t.close=="function"&&t.close(),t.remove(),i(_))},f=()=>d(n.value.trim());o.addEventListener("click",f),a.addEventListener("click",()=>d(null)),n.addEventListener("keydown",_=>{_.key==="Enter"&&(_.ctrlKey||_.metaKey)&&(_.preventDefault(),f())}),t.addEventListener("cancel",_=>{_.preventDefault(),d(null)}),typeof t.showModal=="function"?t.showModal():t.setAttribute("open",""),n.focus()})}var pl="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function $t(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var gr=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],$n=[...gr,"reasoning_output_tokens"],vp=["implementation","review-consult"];function Io(e){let t=0;for(let r of gr)t+=$t(e?.[r]);return t}function wp(e){return!e||typeof e!="object"?!1:gr.some(t=>Number.isFinite(e[t]))}function ll(e){return!e||typeof e!="object"?!1:$n.some(t=>Number.isFinite(e[t]))}function kp(e){let t={};for(let r of $n)e&&Number.isFinite(e[r])&&(t[r]=e[r]);return t}function cl(e){let t={};for(let r of $n)Number.isFinite(e[r])&&(t[r]=e[r]);return e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function ul(e,t){return e==="codex"?$t(t.input_tokens)+$t(t.output_tokens):Io(t)}function $p(e){return e==="claude"?"Claude":"Codex"}function xp(e){return`\u03C4 ${fl(e)}`}function Ap(e,t){let r=t.breakdown||{},n=[`\uC785\uB825 ${$t(r.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${$t(r.output_tokens).toLocaleString("en-US")}`];e==="claude"?n.push(`\uCE90\uC2DC\uC77D\uAE30 ${$t(r.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${$t(r.cache_creation_input_tokens).toLocaleString("en-US")}`):(n.push(`\uCE90\uC2DC\uC77D\uAE30 ${$t(r.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${$t(r.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(r.reasoning_output_tokens)&&n.push(`\uCD94\uB860\uCD9C\uB825 ${$t(r.reasoning_output_tokens).toLocaleString("en-US")}`));let o=[e==="claude"?"Claude subtotal = \uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"Codex subtotal = \uC785\uB825 + \uCD9C\uB825; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset",`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,n.join(" \xB7 ")];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&o.push(`$${t.total_cost_usd.toFixed(2)}`),t.replayed&&o.push(pl),o.join(`
`)}function xt(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let r of["claude","codex"]){let n=e.providers[r];n&&t.push({provider:r,label:`${$p(r)} ${xp(n.subtotal)}${typeof n.total_cost_usd=="number"&&Number.isFinite(n.total_cost_usd)?` \xB7 $${n.total_cost_usd.toFixed(2)}`:""}`,tooltip:Ap(r,n)})}return t}function xs(e){let t={},r={claude:!0,codex:!1},n={claude:0,codex:0};for(let s of e)if(!(!s||!s.providers))for(let o of["claude","codex"]){let a=s.providers[o];if(!a)continue;let i=t[o];i||(i={subtotal:0,breakdown:{}},t[o]=i),i.subtotal+=a.subtotal;for(let u of $n)Number.isFinite(a.breakdown[u])&&(i.breakdown[u]=$t(i.breakdown[u])+$t(a.breakdown[u]));a.replayed&&(i.replayed=!0),o==="claude"&&(typeof a.total_cost_usd=="number"&&Number.isFinite(a.total_cost_usd)?n.claude+=a.total_cost_usd:r.claude=!1)}return t.claude&&r.claude&&(t.claude.total_cost_usd=n.claude),Object.keys(t).length===0?null:{providers:t,roles:{}}}function Lo(e){return!e||typeof e!="object"?null:Ut({attempt:{...e,bead_id:"__attempt__"}},"__attempt__")}function Sp(e){return e==="codex"?"codex":"claude"}function Er(){return{subtotal:0,breakdown:kp(null),legs:[],replayed:!1,outer_count:0,outer_cost:0,outer_cost_count:0}}function $s(e,t,r){e.subtotal+=t.subtotal;for(let n of $n)Number.isFinite(t.usage[n])&&(e.breakdown[n]=$t(e.breakdown[n])+$t(t.usage[n]));e.legs.push(t),t.replayed===!0&&(e.replayed=!0),r&&(e.outer_count+=1,typeof t.usage.total_cost_usd=="number"&&Number.isFinite(t.usage.total_cost_usd)&&(e.outer_cost+=t.usage.total_cost_usd,e.outer_cost_count+=1))}function dl(e,t){let r={subtotal:e.subtotal,breakdown:e.breakdown};return t&&(r.legs=e.legs),e.replayed&&(r.replayed=!0),r}function fl(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function on(e){return wp(e)?`\u03C4 ${fl(Io(e))}`:null}function Xt(e){let t=on(e);if(!t)return null;let r=e?.total_cost_usd;return typeof r=="number"&&Number.isFinite(r)?`${t} \xB7 $${r.toFixed(2)}`:t}function an(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${$t(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${$t(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${$t(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${$t(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let r=[`\uCD1D ${Io(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&r.push(pl),r.join(`
`)}function Ut(e,t){let r={claude:Er(),codex:Er()},n={orchestrator:{claude:Er(),codex:Er()},implementation:{claude:Er(),codex:Er()},"review-consult":{claude:Er(),codex:Er()}},s=new Set;for(let i of Object.values(e||{})){if(!i||i.bead_id!==t)continue;let u=i.usage;if(ll(u)){let f=Sp(i.runner),_=cl(u),h={provider:f,role:"orchestrator",attempt_id:String(i.attempt_id||""),usage:_,subtotal:ul(f,_)};_.replayed===!0&&(h.replayed=!0),typeof i.model=="string"&&(h.model=i.model),typeof i.session_id=="string"&&(h.session_id=i.session_id),$s(r[f],h,!0),$s(n.orchestrator[f],h,!0)}let d=Array.isArray(i.usage_legs)?i.usage_legs:[];for(let f of d){if(!f||f.provider!=="codex"||!vp.includes(f.role)||!ll(f.usage))continue;let _=typeof f.receipt_id=="string"&&f.receipt_id.length>0?f.receipt_id:null;if(!_||s.has(_))continue;s.add(_);let h=cl(f.usage),C={provider:"codex",role:f.role,attempt_id:String(i.attempt_id||""),usage:h,subtotal:ul("codex",h)};C.receipt_id=_,typeof f.model=="string"&&(C.model=f.model),typeof f.effort=="string"&&f.effort.trim().length>0&&(C.effort=f.effort),typeof f.session_id=="string"?C.session_id=f.session_id:typeof f.thread_id=="string"&&(C.session_id=f.thread_id),typeof f.turn_id=="string"&&(C.turn_id=f.turn_id),typeof f.completed_at=="string"&&(C.completed_at=f.completed_at),h.replayed===!0&&(C.replayed=!0),$s(r.codex,C,!1),$s(n[C.role].codex,C,!1)}}let o={};for(let i of["claude","codex"]){let u=r[i];if(u.legs.length===0)continue;let d=dl(u,!1);i==="claude"&&u.outer_count>0&&u.outer_cost_count===u.outer_count&&(d.total_cost_usd=u.outer_cost),o[i]=d}if(Object.keys(o).length===0)return null;let a={};for(let i of["orchestrator","implementation","review-consult"]){let u={};for(let d of["claude","codex"]){let f=n[i][d];f.legs.length>0&&(u[d]={...dl(f,!0),legs:f.legs})}Object.keys(u).length>0&&(a[i]=u)}return{providers:o,roles:a}}var{entries:kl,setPrototypeOf:_l,isFrozen:Ep,getPrototypeOf:Tp,getOwnPropertyDescriptor:Cp}=Object,{freeze:Rt,seal:Wt,create:Fo}=Object,{apply:jo,construct:Bo}=typeof Reflect<"u"&&Reflect;Rt||(Rt=function(t){return t});Wt||(Wt=function(t){return t});jo||(jo=function(t,r){for(var n=arguments.length,s=new Array(n>2?n-2:0),o=2;o<n;o++)s[o-2]=arguments[o];return t.apply(r,s)});Bo||(Bo=function(t){for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return new t(...n)});var As=It(Array.prototype.forEach),Rp=It(Array.prototype.lastIndexOf),ml=It(Array.prototype.pop),xn=It(Array.prototype.push),Ip=It(Array.prototype.splice),Es=It(String.prototype.toLowerCase),Oo=It(String.prototype.toString),Mo=It(String.prototype.match),An=It(String.prototype.replace),Lp=It(String.prototype.indexOf),Op=It(String.prototype.trim),Qt=It(Object.prototype.hasOwnProperty),Ct=It(RegExp.prototype.test),Sn=Mp(TypeError);function It(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return jo(e,t,n)}}function Mp(e){return function(){for(var t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];return Bo(e,r)}}function Xe(e,t){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Es;_l&&_l(e,null);let n=t.length;for(;n--;){let s=t[n];if(typeof s=="string"){let o=r(s);o!==s&&(Ep(t)||(t[n]=o),s=o)}e[s]=!0}return e}function Pp(e){for(let t=0;t<e.length;t++)Qt(e,t)||(e[t]=null);return e}function br(e){let t=Fo(null);for(let[r,n]of kl(e))Qt(e,r)&&(Array.isArray(n)?t[r]=Pp(n):n&&typeof n=="object"&&n.constructor===Object?t[r]=br(n):t[r]=n);return t}function En(e,t){for(;e!==null;){let n=Cp(e,t);if(n){if(n.get)return It(n.get);if(typeof n.value=="function")return It(n.value)}e=Tp(e)}function r(){return null}return r}var gl=Rt(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Po=Rt(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Do=Rt(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Dp=Rt(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),No=Rt(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Np=Rt(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),bl=Rt(["#text"]),hl=Rt(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),qo=Rt(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),yl=Rt(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Ss=Rt(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),qp=Wt(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Fp=Wt(/<%[\w\W]*|[\w\W]*%>/gm),jp=Wt(/\$\{[\w\W]*/gm),Bp=Wt(/^data-[\-\w.\u00B7-\uFFFF]+$/),Up=Wt(/^aria-[\-\w]+$/),$l=Wt(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Wp=Wt(/^(?:\w+script|data):/i),zp=Wt(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),xl=Wt(/^html$/i),Hp=Wt(/^[a-z][.\w]*(-[.\w]+)+$/i),vl=Object.freeze({__proto__:null,ARIA_ATTR:Up,ATTR_WHITESPACE:zp,CUSTOM_ELEMENT:Hp,DATA_ATTR:Bp,DOCTYPE_NAME:xl,ERB_EXPR:Fp,IS_ALLOWED_URI:$l,IS_SCRIPT_OR_DATA:Wp,MUSTACHE_EXPR:qp,TMPLIT_EXPR:jp}),Tn={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},Gp=function(){return typeof window>"u"?null:window},Vp=function(t,r){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let n=null,s="data-tt-policy-suffix";r&&r.hasAttribute(s)&&(n=r.getAttribute(s));let o="dompurify"+(n?"#"+n:"");try{return t.createPolicy(o,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},wl=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Al(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Gp(),t=ye=>Al(ye);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==Tn.document||!e.Element)return t.isSupported=!1,t;let{document:r}=e,n=r,s=n.currentScript,{DocumentFragment:o,HTMLTemplateElement:a,Node:i,Element:u,NodeFilter:d,NamedNodeMap:f=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:_,DOMParser:h,trustedTypes:C}=e,A=u.prototype,I=En(A,"cloneNode"),D=En(A,"remove"),V=En(A,"nextSibling"),Y=En(A,"childNodes"),W=En(A,"parentNode");if(typeof a=="function"){let ye=r.createElement("template");ye.content&&ye.content.ownerDocument&&(r=ye.content.ownerDocument)}let R,S="",{implementation:P,createNodeIterator:w,createDocumentFragment:B,getElementsByTagName:te}=r,{importNode:le}=n,M=wl();t.isSupported=typeof kl=="function"&&typeof W=="function"&&P&&P.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:L,ERB_EXPR:ue,TMPLIT_EXPR:ge,DATA_ATTR:$e,ARIA_ATTR:Be,IS_SCRIPT_OR_DATA:Qe,ATTR_WHITESPACE:Ve,CUSTOM_ELEMENT:Me}=vl,{IS_ALLOWED_URI:Ue}=vl,ie=null,Ae=Xe({},[...gl,...Po,...Do,...No,...bl]),Ie=null,Ee=Xe({},[...hl,...qo,...yl,...Ss]),be=Object.seal(Fo(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),We=null,et=null,Te=Object.seal(Fo(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),tt=!0,K=!0,F=!1,re=!0,Oe=!1,Fe=!0,ze=!1,Ce=!1,ct=!1,Ye=!1,H=!1,ee=!1,De=!0,rt=!1,de="user-content-",b=!0,$=!1,k={},O=null,G=Xe({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),Z=null,ne=Xe({},["audio","video","img","source","image","track"]),ce=null,je=Xe({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),me="http://www.w3.org/1998/Math/MathML",Se="http://www.w3.org/2000/svg",he="http://www.w3.org/1999/xhtml",st=he,ot=!1,j=null,J=Xe({},[me,Se,he],Oo),pe=Xe({},["mi","mo","mn","ms","mtext"]),v=Xe({},["annotation-xml"]),T=Xe({},["title","style","font","a","script"]),N=null,X=["application/xhtml+xml","text/html"],we="text/html",Q=null,xe=null,Le=r.createElement("form"),gt=function(c){return c instanceof RegExp||c instanceof Function},ht=function(){let c=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(xe&&xe===c)){if((!c||typeof c!="object")&&(c={}),c=br(c),N=X.indexOf(c.PARSER_MEDIA_TYPE)===-1?we:c.PARSER_MEDIA_TYPE,Q=N==="application/xhtml+xml"?Oo:Es,ie=Qt(c,"ALLOWED_TAGS")?Xe({},c.ALLOWED_TAGS,Q):Ae,Ie=Qt(c,"ALLOWED_ATTR")?Xe({},c.ALLOWED_ATTR,Q):Ee,j=Qt(c,"ALLOWED_NAMESPACES")?Xe({},c.ALLOWED_NAMESPACES,Oo):J,ce=Qt(c,"ADD_URI_SAFE_ATTR")?Xe(br(je),c.ADD_URI_SAFE_ATTR,Q):je,Z=Qt(c,"ADD_DATA_URI_TAGS")?Xe(br(ne),c.ADD_DATA_URI_TAGS,Q):ne,O=Qt(c,"FORBID_CONTENTS")?Xe({},c.FORBID_CONTENTS,Q):G,We=Qt(c,"FORBID_TAGS")?Xe({},c.FORBID_TAGS,Q):br({}),et=Qt(c,"FORBID_ATTR")?Xe({},c.FORBID_ATTR,Q):br({}),k=Qt(c,"USE_PROFILES")?c.USE_PROFILES:!1,tt=c.ALLOW_ARIA_ATTR!==!1,K=c.ALLOW_DATA_ATTR!==!1,F=c.ALLOW_UNKNOWN_PROTOCOLS||!1,re=c.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Oe=c.SAFE_FOR_TEMPLATES||!1,Fe=c.SAFE_FOR_XML!==!1,ze=c.WHOLE_DOCUMENT||!1,Ye=c.RETURN_DOM||!1,H=c.RETURN_DOM_FRAGMENT||!1,ee=c.RETURN_TRUSTED_TYPE||!1,ct=c.FORCE_BODY||!1,De=c.SANITIZE_DOM!==!1,rt=c.SANITIZE_NAMED_PROPS||!1,b=c.KEEP_CONTENT!==!1,$=c.IN_PLACE||!1,Ue=c.ALLOWED_URI_REGEXP||$l,st=c.NAMESPACE||he,pe=c.MATHML_TEXT_INTEGRATION_POINTS||pe,v=c.HTML_INTEGRATION_POINTS||v,be=c.CUSTOM_ELEMENT_HANDLING||{},c.CUSTOM_ELEMENT_HANDLING&&gt(c.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(be.tagNameCheck=c.CUSTOM_ELEMENT_HANDLING.tagNameCheck),c.CUSTOM_ELEMENT_HANDLING&&gt(c.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(be.attributeNameCheck=c.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),c.CUSTOM_ELEMENT_HANDLING&&typeof c.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(be.allowCustomizedBuiltInElements=c.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Oe&&(K=!1),H&&(Ye=!0),k&&(ie=Xe({},bl),Ie=[],k.html===!0&&(Xe(ie,gl),Xe(Ie,hl)),k.svg===!0&&(Xe(ie,Po),Xe(Ie,qo),Xe(Ie,Ss)),k.svgFilters===!0&&(Xe(ie,Do),Xe(Ie,qo),Xe(Ie,Ss)),k.mathMl===!0&&(Xe(ie,No),Xe(Ie,yl),Xe(Ie,Ss))),c.ADD_TAGS&&(typeof c.ADD_TAGS=="function"?Te.tagCheck=c.ADD_TAGS:(ie===Ae&&(ie=br(ie)),Xe(ie,c.ADD_TAGS,Q))),c.ADD_ATTR&&(typeof c.ADD_ATTR=="function"?Te.attributeCheck=c.ADD_ATTR:(Ie===Ee&&(Ie=br(Ie)),Xe(Ie,c.ADD_ATTR,Q))),c.ADD_URI_SAFE_ATTR&&Xe(ce,c.ADD_URI_SAFE_ATTR,Q),c.FORBID_CONTENTS&&(O===G&&(O=br(O)),Xe(O,c.FORBID_CONTENTS,Q)),b&&(ie["#text"]=!0),ze&&Xe(ie,["html","head","body"]),ie.table&&(Xe(ie,["tbody"]),delete We.tbody),c.TRUSTED_TYPES_POLICY){if(typeof c.TRUSTED_TYPES_POLICY.createHTML!="function")throw Sn('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof c.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Sn('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');R=c.TRUSTED_TYPES_POLICY,S=R.createHTML("")}else R===void 0&&(R=Vp(C,s)),R!==null&&typeof S=="string"&&(S=R.createHTML(""));Rt&&Rt(c),xe=c}},Ze=Xe({},[...Po,...Do,...Dp]),St=Xe({},[...No,...Np]),zt=function(c){let m=W(c);(!m||!m.tagName)&&(m={namespaceURI:st,tagName:"template"});let E=Es(c.tagName),z=Es(m.tagName);return j[c.namespaceURI]?c.namespaceURI===Se?m.namespaceURI===he?E==="svg":m.namespaceURI===me?E==="svg"&&(z==="annotation-xml"||pe[z]):!!Ze[E]:c.namespaceURI===me?m.namespaceURI===he?E==="math":m.namespaceURI===Se?E==="math"&&v[z]:!!St[E]:c.namespaceURI===he?m.namespaceURI===Se&&!v[z]||m.namespaceURI===me&&!pe[z]?!1:!St[E]&&(T[E]||!Ze[E]):!!(N==="application/xhtml+xml"&&j[c.namespaceURI]):!1},vt=function(c){xn(t.removed,{element:c});try{W(c).removeChild(c)}catch{D(c)}},Ot=function(c,m){try{xn(t.removed,{attribute:m.getAttributeNode(c),from:m})}catch{xn(t.removed,{attribute:null,from:m})}if(m.removeAttribute(c),c==="is")if(Ye||H)try{vt(m)}catch{}else try{m.setAttribute(c,"")}catch{}},rr=function(c){let m=null,E=null;if(ct)c="<remove></remove>"+c;else{let ke=Mo(c,/^[\r\n\t ]+/);E=ke&&ke[0]}N==="application/xhtml+xml"&&st===he&&(c='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+c+"</body></html>");let z=R?R.createHTML(c):c;if(st===he)try{m=new h().parseFromString(z,N)}catch{}if(!m||!m.documentElement){m=P.createDocument(st,"template",null);try{m.documentElement.innerHTML=ot?S:z}catch{}}let oe=m.body||m.documentElement;return c&&E&&oe.insertBefore(r.createTextNode(E),oe.childNodes[0]||null),st===he?te.call(m,ze?"html":"body")[0]:ze?m.documentElement:oe},nr=function(c){return w.call(c.ownerDocument||c,c,d.SHOW_ELEMENT|d.SHOW_COMMENT|d.SHOW_TEXT|d.SHOW_PROCESSING_INSTRUCTION|d.SHOW_CDATA_SECTION,null)},sr=function(c){return c instanceof _&&(typeof c.nodeName!="string"||typeof c.textContent!="string"||typeof c.removeChild!="function"||!(c.attributes instanceof f)||typeof c.removeAttribute!="function"||typeof c.setAttribute!="function"||typeof c.namespaceURI!="string"||typeof c.insertBefore!="function"||typeof c.hasChildNodes!="function")},fr=function(c){return typeof i=="function"&&c instanceof i};function wt(ye,c,m){As(ye,E=>{E.call(t,c,m,xe)})}let Ht=function(c){let m=null;if(wt(M.beforeSanitizeElements,c,null),sr(c))return vt(c),!0;let E=Q(c.nodeName);if(wt(M.uponSanitizeElement,c,{tagName:E,allowedTags:ie}),Fe&&c.hasChildNodes()&&!fr(c.firstElementChild)&&Ct(/<[/\w!]/g,c.innerHTML)&&Ct(/<[/\w!]/g,c.textContent)||c.nodeType===Tn.progressingInstruction||Fe&&c.nodeType===Tn.comment&&Ct(/<[/\w]/g,c.data))return vt(c),!0;if(!(Te.tagCheck instanceof Function&&Te.tagCheck(E))&&(!ie[E]||We[E])){if(!We[E]&&ar(E)&&(be.tagNameCheck instanceof RegExp&&Ct(be.tagNameCheck,E)||be.tagNameCheck instanceof Function&&be.tagNameCheck(E)))return!1;if(b&&!O[E]){let z=W(c)||c.parentNode,oe=Y(c)||c.childNodes;if(oe&&z){let ke=oe.length;for(let fe=ke-1;fe>=0;--fe){let Ke=I(oe[fe],!0);Ke.__removalCount=(c.__removalCount||0)+1,z.insertBefore(Ke,V(c))}}}return vt(c),!0}return c instanceof u&&!zt(c)||(E==="noscript"||E==="noembed"||E==="noframes")&&Ct(/<\/no(script|embed|frames)/i,c.innerHTML)?(vt(c),!0):(Oe&&c.nodeType===Tn.text&&(m=c.textContent,As([L,ue,ge],z=>{m=An(m,z," ")}),c.textContent!==m&&(xn(t.removed,{element:c.cloneNode()}),c.textContent=m)),wt(M.afterSanitizeElements,c,null),!1)},or=function(c,m,E){if(De&&(m==="id"||m==="name")&&(E in r||E in Le))return!1;if(!(K&&!et[m]&&Ct($e,m))){if(!(tt&&Ct(Be,m))){if(!(Te.attributeCheck instanceof Function&&Te.attributeCheck(m,c))){if(!Ie[m]||et[m]){if(!(ar(c)&&(be.tagNameCheck instanceof RegExp&&Ct(be.tagNameCheck,c)||be.tagNameCheck instanceof Function&&be.tagNameCheck(c))&&(be.attributeNameCheck instanceof RegExp&&Ct(be.attributeNameCheck,m)||be.attributeNameCheck instanceof Function&&be.attributeNameCheck(m,c))||m==="is"&&be.allowCustomizedBuiltInElements&&(be.tagNameCheck instanceof RegExp&&Ct(be.tagNameCheck,E)||be.tagNameCheck instanceof Function&&be.tagNameCheck(E))))return!1}else if(!ce[m]){if(!Ct(Ue,An(E,Ve,""))){if(!((m==="src"||m==="xlink:href"||m==="href")&&c!=="script"&&Lp(E,"data:")===0&&Z[c])){if(!(F&&!Ct(Qe,An(E,Ve,"")))){if(E)return!1}}}}}}}return!0},ar=function(c){return c!=="annotation-xml"&&Mo(c,Me)},Je=function(c){wt(M.beforeSanitizeAttributes,c,null);let{attributes:m}=c;if(!m||sr(c))return;let E={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:Ie,forceKeepAttr:void 0},z=m.length;for(;z--;){let oe=m[z],{name:ke,namespaceURI:fe,value:Ke}=oe,nt=Q(ke),Ne=Ke,p=ke==="value"?Ne:Op(Ne);if(E.attrName=nt,E.attrValue=p,E.keepAttr=!0,E.forceKeepAttr=void 0,wt(M.uponSanitizeAttribute,c,E),p=E.attrValue,rt&&(nt==="id"||nt==="name")&&(Ot(ke,c),p=de+p),Fe&&Ct(/((--!?|])>)|<\/(style|title|textarea)/i,p)){Ot(ke,c);continue}if(nt==="attributename"&&Mo(p,"href")){Ot(ke,c);continue}if(E.forceKeepAttr)continue;if(!E.keepAttr){Ot(ke,c);continue}if(!re&&Ct(/\/>/i,p)){Ot(ke,c);continue}Oe&&As([L,ue,ge],x=>{p=An(p,x," ")});let g=Q(c.nodeName);if(!or(g,nt,p)){Ot(ke,c);continue}if(R&&typeof C=="object"&&typeof C.getAttributeType=="function"&&!fe)switch(C.getAttributeType(g,nt)){case"TrustedHTML":{p=R.createHTML(p);break}case"TrustedScriptURL":{p=R.createScriptURL(p);break}}if(p!==Ne)try{fe?c.setAttributeNS(fe,ke,p):c.setAttribute(ke,p),sr(c)?vt(c):ml(t.removed)}catch{Ot(ke,c)}}wt(M.afterSanitizeAttributes,c,null)},Pt=function ye(c){let m=null,E=nr(c);for(wt(M.beforeSanitizeShadowDOM,c,null);m=E.nextNode();)wt(M.uponSanitizeShadowNode,m,null),Ht(m),Je(m),m.content instanceof o&&ye(m.content);wt(M.afterSanitizeShadowDOM,c,null)};return t.sanitize=function(ye){let c=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},m=null,E=null,z=null,oe=null;if(ot=!ye,ot&&(ye="<!-->"),typeof ye!="string"&&!fr(ye))if(typeof ye.toString=="function"){if(ye=ye.toString(),typeof ye!="string")throw Sn("dirty is not a string, aborting")}else throw Sn("toString is not a function");if(!t.isSupported)return ye;if(Ce||ht(c),t.removed=[],typeof ye=="string"&&($=!1),$){if(ye.nodeName){let Ke=Q(ye.nodeName);if(!ie[Ke]||We[Ke])throw Sn("root node is forbidden and cannot be sanitized in-place")}}else if(ye instanceof i)m=rr("<!---->"),E=m.ownerDocument.importNode(ye,!0),E.nodeType===Tn.element&&E.nodeName==="BODY"||E.nodeName==="HTML"?m=E:m.appendChild(E);else{if(!Ye&&!Oe&&!ze&&ye.indexOf("<")===-1)return R&&ee?R.createHTML(ye):ye;if(m=rr(ye),!m)return Ye?null:ee?S:""}m&&ct&&vt(m.firstChild);let ke=nr($?ye:m);for(;z=ke.nextNode();)Ht(z),Je(z),z.content instanceof o&&Pt(z.content);if($)return ye;if(Ye){if(H)for(oe=B.call(m.ownerDocument);m.firstChild;)oe.appendChild(m.firstChild);else oe=m;return(Ie.shadowroot||Ie.shadowrootmode)&&(oe=le.call(n,oe,!0)),oe}let fe=ze?m.outerHTML:m.innerHTML;return ze&&ie["!doctype"]&&m.ownerDocument&&m.ownerDocument.doctype&&m.ownerDocument.doctype.name&&Ct(xl,m.ownerDocument.doctype.name)&&(fe="<!DOCTYPE "+m.ownerDocument.doctype.name+`>
`+fe),Oe&&As([L,ue,ge],Ke=>{fe=An(fe,Ke," ")}),R&&ee?R.createHTML(fe):fe},t.setConfig=function(){let ye=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};ht(ye),Ce=!0},t.clearConfig=function(){xe=null,Ce=!1},t.isValidAttribute=function(ye,c,m){xe||ht({});let E=Q(ye),z=Q(c);return or(E,z,m)},t.addHook=function(ye,c){typeof c=="function"&&xn(M[ye],c)},t.removeHook=function(ye,c){if(c!==void 0){let m=Rp(M[ye],c);return m===-1?void 0:Ip(M[ye],m,1)[0]}return ml(M[ye])},t.removeHooks=function(ye){M[ye]=[]},t.removeAllHooks=function(){M=wl()},t}var Sl=Al();var hr={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Ts=e=>(...t)=>({_$litDirective$:e,values:t}),ln=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,r,n){this._$Ct=t,this._$AM=r,this._$Ci=n}_$AS(t,r){return this.update(t,r)}update(t,r){return this.render(...r)}};var Cn=class extends ln{constructor(t){if(super(t),this.it=mt,t.type!==hr.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===mt||t==null)return this._t=void 0,this.it=t;if(t===jt)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let r=[t];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}};Cn.directiveName="unsafeHTML",Cn.resultType=1;var El=Ts(Cn);function Ho(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Wr=Ho();function Ml(e){Wr=e}var On={exec:()=>null};function at(e,t=""){let r=typeof e=="string"?e:e.source,n={replace:(s,o)=>{let a=typeof o=="string"?o:o.source;return a=a.replace(Lt.caret,"$1"),r=r.replace(s,a),n},getRegex:()=>new RegExp(r,t)};return n}var Kp=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),Lt={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},Yp=/^(?:[ \t]*(?:\n|$))+/,Zp=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Xp=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,Mn=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Qp=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Go=/(?:[*+-]|\d{1,9}[.)])/,Pl=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Dl=at(Pl).replace(/bull/g,Go).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Jp=at(Pl).replace(/bull/g,Go).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Vo=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,ef=/^[^\n]+/,Ko=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,tf=at(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Ko).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),rf=at(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Go).getRegex(),Ms="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Yo=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,nf=at("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",Yo).replace("tag",Ms).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Nl=at(Vo).replace("hr",Mn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ms).getRegex(),sf=at(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Nl).getRegex(),Zo={blockquote:sf,code:Zp,def:tf,fences:Xp,heading:Qp,hr:Mn,html:nf,lheading:Dl,list:rf,newline:Yp,paragraph:Nl,table:On,text:ef},Tl=at("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",Mn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ms).getRegex(),of={...Zo,lheading:Jp,table:Tl,paragraph:at(Vo).replace("hr",Mn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Tl).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ms).getRegex()},af={...Zo,html:at(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",Yo).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:On,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:at(Vo).replace("hr",Mn).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Dl).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},lf=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,cf=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,ql=/^( {2,}|\\)\n(?!\s*$)/,uf=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Ps=/[\p{P}\p{S}]/u,Xo=/[\s\p{P}\p{S}]/u,Fl=/[^\s\p{P}\p{S}]/u,df=at(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Xo).getRegex(),jl=/(?!~)[\p{P}\p{S}]/u,pf=/(?!~)[\s\p{P}\p{S}]/u,ff=/(?:[^\s\p{P}\p{S}]|~)/u,_f=at(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",Kp?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),Bl=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,mf=at(Bl,"u").replace(/punct/g,Ps).getRegex(),gf=at(Bl,"u").replace(/punct/g,jl).getRegex(),Ul="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",bf=at(Ul,"gu").replace(/notPunctSpace/g,Fl).replace(/punctSpace/g,Xo).replace(/punct/g,Ps).getRegex(),hf=at(Ul,"gu").replace(/notPunctSpace/g,ff).replace(/punctSpace/g,pf).replace(/punct/g,jl).getRegex(),yf=at("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,Fl).replace(/punctSpace/g,Xo).replace(/punct/g,Ps).getRegex(),vf=at(/\\(punct)/,"gu").replace(/punct/g,Ps).getRegex(),wf=at(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),kf=at(Yo).replace("(?:-->|$)","-->").getRegex(),$f=at("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",kf).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Is=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,xf=at(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Is).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Wl=at(/^!?\[(label)\]\[(ref)\]/).replace("label",Is).replace("ref",Ko).getRegex(),zl=at(/^!?\[(ref)\](?:\[\])?/).replace("ref",Ko).getRegex(),Af=at("reflink|nolink(?!\\()","g").replace("reflink",Wl).replace("nolink",zl).getRegex(),Cl=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,Qo={_backpedal:On,anyPunctuation:vf,autolink:wf,blockSkip:_f,br:ql,code:cf,del:On,emStrongLDelim:mf,emStrongRDelimAst:bf,emStrongRDelimUnd:yf,escape:lf,link:xf,nolink:zl,punctuation:df,reflink:Wl,reflinkSearch:Af,tag:$f,text:uf,url:On},Sf={...Qo,link:at(/^!?\[(label)\]\((.*?)\)/).replace("label",Is).getRegex(),reflink:at(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Is).getRegex()},Uo={...Qo,emStrongRDelimAst:hf,emStrongLDelim:gf,url:at(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",Cl).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:at(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",Cl).getRegex()},Ef={...Uo,br:at(ql).replace("{2,}","*").getRegex(),text:at(Uo.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Cs={normal:Zo,gfm:of,pedantic:af},Rn={normal:Qo,gfm:Uo,breaks:Ef,pedantic:Sf},Tf={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Rl=e=>Tf[e];function yr(e,t){if(t){if(Lt.escapeTest.test(e))return e.replace(Lt.escapeReplace,Rl)}else if(Lt.escapeTestNoEncode.test(e))return e.replace(Lt.escapeReplaceNoEncode,Rl);return e}function Il(e){try{e=encodeURI(e).replace(Lt.percentDecode,"%")}catch{return null}return e}function Ll(e,t){let r=e.replace(Lt.findPipe,(o,a,i)=>{let u=!1,d=a;for(;--d>=0&&i[d]==="\\";)u=!u;return u?"|":" |"}),n=r.split(Lt.splitPipe),s=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),t)if(n.length>t)n.splice(t);else for(;n.length<t;)n.push("");for(;s<n.length;s++)n[s]=n[s].trim().replace(Lt.slashPipe,"|");return n}function In(e,t,r){let n=e.length;if(n===0)return"";let s=0;for(;s<n;){let o=e.charAt(n-s-1);if(o===t&&!r)s++;else if(o!==t&&r)s++;else break}return e.slice(0,n-s)}function Cf(e,t){if(e.indexOf(t[1])===-1)return-1;let r=0;for(let n=0;n<e.length;n++)if(e[n]==="\\")n++;else if(e[n]===t[0])r++;else if(e[n]===t[1]&&(r--,r<0))return n;return r>0?-2:-1}function Ol(e,t,r,n,s){let o=t.href,a=t.title||null,i=e[1].replace(s.other.outputLinkReplace,"$1");n.state.inLink=!0;let u={type:e[0].charAt(0)==="!"?"image":"link",raw:r,href:o,title:a,text:i,tokens:n.inlineTokens(i)};return n.state.inLink=!1,u}function Rf(e,t,r){let n=e.match(r.other.indentCodeCompensation);if(n===null)return t;let s=n[1];return t.split(`
`).map(o=>{let a=o.match(r.other.beginningSpace);if(a===null)return o;let[i]=a;return i.length>=s.length?o.slice(s.length):o}).join(`
`)}var Ls=class{constructor(e){lt(this,"options");lt(this,"rules");lt(this,"lexer");this.options=e||Wr}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let r=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?r:In(r,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let r=t[0],n=Rf(r,t[3]||"",this.rules);return{type:"code",raw:r,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:n}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let r=t[2].trim();if(this.rules.other.endingHash.test(r)){let n=In(r,"#");(this.options.pedantic||!n||this.rules.other.endingSpaceChar.test(n))&&(r=n.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:In(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let r=In(t[0],`
`).split(`
`),n="",s="",o=[];for(;r.length>0;){let a=!1,i=[],u;for(u=0;u<r.length;u++)if(this.rules.other.blockquoteStart.test(r[u]))i.push(r[u]),a=!0;else if(!a)i.push(r[u]);else break;r=r.slice(u);let d=i.join(`
`),f=d.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");n=n?`${n}
${d}`:d,s=s?`${s}
${f}`:f;let _=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(f,o,!0),this.lexer.state.top=_,r.length===0)break;let h=o.at(-1);if(h?.type==="code")break;if(h?.type==="blockquote"){let C=h,A=C.raw+`
`+r.join(`
`),I=this.blockquote(A);o[o.length-1]=I,n=n.substring(0,n.length-C.raw.length)+I.raw,s=s.substring(0,s.length-C.text.length)+I.text;break}else if(h?.type==="list"){let C=h,A=C.raw+`
`+r.join(`
`),I=this.list(A);o[o.length-1]=I,n=n.substring(0,n.length-h.raw.length)+I.raw,s=s.substring(0,s.length-C.raw.length)+I.raw,r=A.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:n,tokens:o,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let r=t[1].trim(),n=r.length>1,s={type:"list",raw:"",ordered:n,start:n?+r.slice(0,-1):"",loose:!1,items:[]};r=n?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=n?r:"[*+-]");let o=this.rules.other.listItemRegex(r),a=!1;for(;e;){let u=!1,d="",f="";if(!(t=o.exec(e))||this.rules.block.hr.test(e))break;d=t[0],e=e.substring(d.length);let _=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,I=>" ".repeat(3*I.length)),h=e.split(`
`,1)[0],C=!_.trim(),A=0;if(this.options.pedantic?(A=2,f=_.trimStart()):C?A=t[1].length+1:(A=t[2].search(this.rules.other.nonSpaceChar),A=A>4?1:A,f=_.slice(A),A+=t[1].length),C&&this.rules.other.blankLine.test(h)&&(d+=h+`
`,e=e.substring(h.length+1),u=!0),!u){let I=this.rules.other.nextBulletRegex(A),D=this.rules.other.hrRegex(A),V=this.rules.other.fencesBeginRegex(A),Y=this.rules.other.headingBeginRegex(A),W=this.rules.other.htmlBeginRegex(A);for(;e;){let R=e.split(`
`,1)[0],S;if(h=R,this.options.pedantic?(h=h.replace(this.rules.other.listReplaceNesting,"  "),S=h):S=h.replace(this.rules.other.tabCharGlobal,"    "),V.test(h)||Y.test(h)||W.test(h)||I.test(h)||D.test(h))break;if(S.search(this.rules.other.nonSpaceChar)>=A||!h.trim())f+=`
`+S.slice(A);else{if(C||_.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||V.test(_)||Y.test(_)||D.test(_))break;f+=`
`+h}!C&&!h.trim()&&(C=!0),d+=R+`
`,e=e.substring(R.length+1),_=S.slice(A)}}s.loose||(a?s.loose=!0:this.rules.other.doubleBlankLine.test(d)&&(a=!0)),s.items.push({type:"list_item",raw:d,task:!!this.options.gfm&&this.rules.other.listIsTask.test(f),loose:!1,text:f,tokens:[]}),s.raw+=d}let i=s.items.at(-1);if(i)i.raw=i.raw.trimEnd(),i.text=i.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let u of s.items){if(this.lexer.state.top=!1,u.tokens=this.lexer.blockTokens(u.text,[]),u.task){if(u.text=u.text.replace(this.rules.other.listReplaceTask,""),u.tokens[0]?.type==="text"||u.tokens[0]?.type==="paragraph"){u.tokens[0].raw=u.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),u.tokens[0].text=u.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let f=this.lexer.inlineQueue.length-1;f>=0;f--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[f].src)){this.lexer.inlineQueue[f].src=this.lexer.inlineQueue[f].src.replace(this.rules.other.listReplaceTask,"");break}}let d=this.rules.other.listTaskCheckbox.exec(u.raw);if(d){let f={type:"checkbox",raw:d[0]+" ",checked:d[0]!=="[ ]"};u.checked=f.checked,s.loose?u.tokens[0]&&["paragraph","text"].includes(u.tokens[0].type)&&"tokens"in u.tokens[0]&&u.tokens[0].tokens?(u.tokens[0].raw=f.raw+u.tokens[0].raw,u.tokens[0].text=f.raw+u.tokens[0].text,u.tokens[0].tokens.unshift(f)):u.tokens.unshift({type:"paragraph",raw:f.raw,text:f.raw,tokens:[f]}):u.tokens.unshift(f)}}if(!s.loose){let d=u.tokens.filter(_=>_.type==="space"),f=d.length>0&&d.some(_=>this.rules.other.anyLine.test(_.raw));s.loose=f}}if(s.loose)for(let u of s.items){u.loose=!0;for(let d of u.tokens)d.type==="text"&&(d.type="paragraph")}return s}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let r=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),n=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:r,raw:t[0],href:n,title:s}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let r=Ll(t[1]),n=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(r.length===n.length){for(let a of n)this.rules.other.tableAlignRight.test(a)?o.align.push("right"):this.rules.other.tableAlignCenter.test(a)?o.align.push("center"):this.rules.other.tableAlignLeft.test(a)?o.align.push("left"):o.align.push(null);for(let a=0;a<r.length;a++)o.header.push({text:r[a],tokens:this.lexer.inline(r[a]),header:!0,align:o.align[a]});for(let a of s)o.rows.push(Ll(a,o.header.length).map((i,u)=>({text:i,tokens:this.lexer.inline(i),header:!1,align:o.align[u]})));return o}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let r=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:r,tokens:this.lexer.inline(r)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let r=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;let o=In(r.slice(0,-1),"\\");if((r.length-o.length)%2===0)return}else{let o=Cf(t[2],"()");if(o===-2)return;if(o>-1){let a=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,a).trim(),t[3]=""}}let n=t[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(n);o&&(n=o[1],s=o[3])}else s=t[3]?t[3].slice(1,-1):"";return n=n.trim(),this.rules.other.startAngleBracket.test(n)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?n=n.slice(1):n=n.slice(1,-1)),Ol(t,{href:n&&n.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let r;if((r=this.rules.inline.reflink.exec(e))||(r=this.rules.inline.nolink.exec(e))){let n=(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[n.toLowerCase()];if(!s){let o=r[0].charAt(0);return{type:"text",raw:o,text:o}}return Ol(r,s,r[0],this.lexer,this.rules)}}emStrong(e,t,r=""){let n=this.rules.inline.emStrongLDelim.exec(e);if(!(!n||n[3]&&r.match(this.rules.other.unicodeAlphaNumeric))&&(!(n[1]||n[2])||!r||this.rules.inline.punctuation.exec(r))){let s=[...n[0]].length-1,o,a,i=s,u=0,d=n[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(d.lastIndex=0,t=t.slice(-1*e.length+s);(n=d.exec(t))!=null;){if(o=n[1]||n[2]||n[3]||n[4]||n[5]||n[6],!o)continue;if(a=[...o].length,n[3]||n[4]){i+=a;continue}else if((n[5]||n[6])&&s%3&&!((s+a)%3)){u+=a;continue}if(i-=a,i>0)continue;a=Math.min(a,a+i+u);let f=[...n[0]][0].length,_=e.slice(0,s+n.index+f+a);if(Math.min(s,a)%2){let C=_.slice(1,-1);return{type:"em",raw:_,text:C,tokens:this.lexer.inlineTokens(C)}}let h=_.slice(2,-2);return{type:"strong",raw:_,text:h,tokens:this.lexer.inlineTokens(h)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let r=t[2].replace(this.rules.other.newLineCharGlobal," "),n=this.rules.other.nonSpaceChar.test(r),s=this.rules.other.startingSpaceChar.test(r)&&this.rules.other.endingSpaceChar.test(r);return n&&s&&(r=r.substring(1,r.length-1)),{type:"codespan",raw:t[0],text:r}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let r,n;return t[2]==="@"?(r=t[1],n="mailto:"+r):(r=t[1],n=r),{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let r,n;if(t[2]==="@")r=t[0],n="mailto:"+r;else{let s;do s=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(s!==t[0]);r=t[0],t[1]==="www."?n="http://"+t[0]:n=t[0]}return{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let r=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:r}}}},Jt=class Wo{constructor(t){lt(this,"tokens");lt(this,"options");lt(this,"state");lt(this,"inlineQueue");lt(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||Wr,this.options.tokenizer=this.options.tokenizer||new Ls,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let r={other:Lt,block:Cs.normal,inline:Rn.normal};this.options.pedantic?(r.block=Cs.pedantic,r.inline=Rn.pedantic):this.options.gfm&&(r.block=Cs.gfm,this.options.breaks?r.inline=Rn.breaks:r.inline=Rn.gfm),this.tokenizer.rules=r}static get rules(){return{block:Cs,inline:Rn}}static lex(t,r){return new Wo(r).lex(t)}static lexInline(t,r){return new Wo(r).inlineTokens(t)}lex(t){t=t.replace(Lt.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let r=0;r<this.inlineQueue.length;r++){let n=this.inlineQueue[r];this.inlineTokens(n.src,n.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,r=[],n=!1){for(this.options.pedantic&&(t=t.replace(Lt.tabCharGlobal,"    ").replace(Lt.spaceLine,""));t;){let s;if(this.options.extensions?.block?.some(a=>(s=a.call({lexer:this},t,r))?(t=t.substring(s.raw.length),r.push(s),!0):!1))continue;if(s=this.tokenizer.space(t)){t=t.substring(s.raw.length);let a=r.at(-1);s.raw.length===1&&a!==void 0?a.raw+=`
`:r.push(s);continue}if(s=this.tokenizer.code(t)){t=t.substring(s.raw.length);let a=r.at(-1);a?.type==="paragraph"||a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.at(-1).src=a.text):r.push(s);continue}if(s=this.tokenizer.fences(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.heading(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.hr(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.blockquote(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.list(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.html(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.def(t)){t=t.substring(s.raw.length);let a=r.at(-1);a?.type==="paragraph"||a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.raw,this.inlineQueue.at(-1).src=a.text):this.tokens.links[s.tag]||(this.tokens.links[s.tag]={href:s.href,title:s.title},r.push(s));continue}if(s=this.tokenizer.table(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.lheading(t)){t=t.substring(s.raw.length),r.push(s);continue}let o=t;if(this.options.extensions?.startBlock){let a=1/0,i=t.slice(1),u;this.options.extensions.startBlock.forEach(d=>{u=d.call({lexer:this},i),typeof u=="number"&&u>=0&&(a=Math.min(a,u))}),a<1/0&&a>=0&&(o=t.substring(0,a+1))}if(this.state.top&&(s=this.tokenizer.paragraph(o))){let a=r.at(-1);n&&a?.type==="paragraph"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):r.push(s),n=o.length!==t.length,t=t.substring(s.raw.length);continue}if(s=this.tokenizer.text(t)){t=t.substring(s.raw.length);let a=r.at(-1);a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):r.push(s);continue}if(t){let a="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(a);break}else throw new Error(a)}}return this.state.top=!0,r}inline(t,r=[]){return this.inlineQueue.push({src:t,tokens:r}),r}inlineTokens(t,r=[]){let n=t,s=null;if(this.tokens.links){let u=Object.keys(this.tokens.links);if(u.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(n))!=null;)u.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(n=n.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(n))!=null;)n=n.slice(0,s.index)+"++"+n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(n))!=null;)o=s[2]?s[2].length:0,n=n.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let a=!1,i="";for(;t;){a||(i=""),a=!1;let u;if(this.options.extensions?.inline?.some(f=>(u=f.call({lexer:this},t,r))?(t=t.substring(u.raw.length),r.push(u),!0):!1))continue;if(u=this.tokenizer.escape(t)){t=t.substring(u.raw.length),r.push(u);continue}if(u=this.tokenizer.tag(t)){t=t.substring(u.raw.length),r.push(u);continue}if(u=this.tokenizer.link(t)){t=t.substring(u.raw.length),r.push(u);continue}if(u=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(u.raw.length);let f=r.at(-1);u.type==="text"&&f?.type==="text"?(f.raw+=u.raw,f.text+=u.text):r.push(u);continue}if(u=this.tokenizer.emStrong(t,n,i)){t=t.substring(u.raw.length),r.push(u);continue}if(u=this.tokenizer.codespan(t)){t=t.substring(u.raw.length),r.push(u);continue}if(u=this.tokenizer.br(t)){t=t.substring(u.raw.length),r.push(u);continue}if(u=this.tokenizer.del(t)){t=t.substring(u.raw.length),r.push(u);continue}if(u=this.tokenizer.autolink(t)){t=t.substring(u.raw.length),r.push(u);continue}if(!this.state.inLink&&(u=this.tokenizer.url(t))){t=t.substring(u.raw.length),r.push(u);continue}let d=t;if(this.options.extensions?.startInline){let f=1/0,_=t.slice(1),h;this.options.extensions.startInline.forEach(C=>{h=C.call({lexer:this},_),typeof h=="number"&&h>=0&&(f=Math.min(f,h))}),f<1/0&&f>=0&&(d=t.substring(0,f+1))}if(u=this.tokenizer.inlineText(d)){t=t.substring(u.raw.length),u.raw.slice(-1)!=="_"&&(i=u.raw.slice(-1)),a=!0;let f=r.at(-1);f?.type==="text"?(f.raw+=u.raw,f.text+=u.text):r.push(u);continue}if(t){let f="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(f);break}else throw new Error(f)}}return r}},Os=class{constructor(e){lt(this,"options");lt(this,"parser");this.options=e||Wr}space(e){return""}code({text:e,lang:t,escaped:r}){let n=(t||"").match(Lt.notSpaceStart)?.[0],s=e.replace(Lt.endingNewline,"")+`
`;return n?'<pre><code class="language-'+yr(n)+'">'+(r?s:yr(s,!0))+`</code></pre>
`:"<pre><code>"+(r?s:yr(s,!0))+`</code></pre>
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${yr(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:r}){let n=this.parser.parseInline(r),s=Il(e);if(s===null)return n;e=s;let o='<a href="'+e+'"';return t&&(o+=' title="'+yr(t)+'"'),o+=">"+n+"</a>",o}image({href:e,title:t,text:r,tokens:n}){n&&(r=this.parser.parseInline(n,this.parser.textRenderer));let s=Il(e);if(s===null)return yr(r);e=s;let o=`<img src="${e}" alt="${r}"`;return t&&(o+=` title="${yr(t)}"`),o+=">",o}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:yr(e.text)}},Jo=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},er=class zo{constructor(t){lt(this,"options");lt(this,"renderer");lt(this,"textRenderer");this.options=t||Wr,this.options.renderer=this.options.renderer||new Os,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Jo}static parse(t,r){return new zo(r).parse(t)}static parseInline(t,r){return new zo(r).parseInline(t)}parse(t){let r="";for(let n=0;n<t.length;n++){let s=t[n];if(this.options.extensions?.renderers?.[s.type]){let a=s,i=this.options.extensions.renderers[a.type].call({parser:this},a);if(i!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(a.type)){r+=i||"";continue}}let o=s;switch(o.type){case"space":{r+=this.renderer.space(o);break}case"hr":{r+=this.renderer.hr(o);break}case"heading":{r+=this.renderer.heading(o);break}case"code":{r+=this.renderer.code(o);break}case"table":{r+=this.renderer.table(o);break}case"blockquote":{r+=this.renderer.blockquote(o);break}case"list":{r+=this.renderer.list(o);break}case"checkbox":{r+=this.renderer.checkbox(o);break}case"html":{r+=this.renderer.html(o);break}case"def":{r+=this.renderer.def(o);break}case"paragraph":{r+=this.renderer.paragraph(o);break}case"text":{r+=this.renderer.text(o);break}default:{let a='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return r}parseInline(t,r=this.renderer){let n="";for(let s=0;s<t.length;s++){let o=t[s];if(this.options.extensions?.renderers?.[o.type]){let i=this.options.extensions.renderers[o.type].call({parser:this},o);if(i!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){n+=i||"";continue}}let a=o;switch(a.type){case"escape":{n+=r.text(a);break}case"html":{n+=r.html(a);break}case"link":{n+=r.link(a);break}case"image":{n+=r.image(a);break}case"checkbox":{n+=r.checkbox(a);break}case"strong":{n+=r.strong(a);break}case"em":{n+=r.em(a);break}case"codespan":{n+=r.codespan(a);break}case"br":{n+=r.br(a);break}case"del":{n+=r.del(a);break}case"text":{n+=r.text(a);break}default:{let i='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return n}},Rs,Ln=(Rs=class{constructor(e){lt(this,"options");lt(this,"block");this.options=e||Wr}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?Jt.lex:Jt.lexInline}provideParser(){return this.block?er.parse:er.parseInline}},lt(Rs,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),lt(Rs,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),Rs),If=class{constructor(...e){lt(this,"defaults",Ho());lt(this,"options",this.setOptions);lt(this,"parse",this.parseMarkdown(!0));lt(this,"parseInline",this.parseMarkdown(!1));lt(this,"Parser",er);lt(this,"Renderer",Os);lt(this,"TextRenderer",Jo);lt(this,"Lexer",Jt);lt(this,"Tokenizer",Ls);lt(this,"Hooks",Ln);this.use(...e)}walkTokens(e,t){let r=[];for(let n of e)switch(r=r.concat(t.call(this,n)),n.type){case"table":{let s=n;for(let o of s.header)r=r.concat(this.walkTokens(o.tokens,t));for(let o of s.rows)for(let a of o)r=r.concat(this.walkTokens(a.tokens,t));break}case"list":{let s=n;r=r.concat(this.walkTokens(s.items,t));break}default:{let s=n;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let a=s[o].flat(1/0);r=r.concat(this.walkTokens(a,t))}):s.tokens&&(r=r.concat(this.walkTokens(s.tokens,t)))}}return r}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(r=>{let n={...r};if(n.async=this.defaults.async||n.async||!1,r.extensions&&(r.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=t.renderers[s.name];o?t.renderers[s.name]=function(...a){let i=s.renderer.apply(this,a);return i===!1&&(i=o.apply(this,a)),i}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=t[s.level];o?o.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),n.extensions=t),r.renderer){let s=this.defaults.renderer||new Os(this.defaults);for(let o in r.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let a=o,i=r.renderer[a],u=s[a];s[a]=(...d)=>{let f=i.apply(s,d);return f===!1&&(f=u.apply(s,d)),f||""}}n.renderer=s}if(r.tokenizer){let s=this.defaults.tokenizer||new Ls(this.defaults);for(let o in r.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let a=o,i=r.tokenizer[a],u=s[a];s[a]=(...d)=>{let f=i.apply(s,d);return f===!1&&(f=u.apply(s,d)),f}}n.tokenizer=s}if(r.hooks){let s=this.defaults.hooks||new Ln;for(let o in r.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let a=o,i=r.hooks[a],u=s[a];Ln.passThroughHooks.has(o)?s[a]=d=>{if(this.defaults.async&&Ln.passThroughHooksRespectAsync.has(o))return(async()=>{let _=await i.call(s,d);return u.call(s,_)})();let f=i.call(s,d);return u.call(s,f)}:s[a]=(...d)=>{if(this.defaults.async)return(async()=>{let _=await i.apply(s,d);return _===!1&&(_=await u.apply(s,d)),_})();let f=i.apply(s,d);return f===!1&&(f=u.apply(s,d)),f}}n.hooks=s}if(r.walkTokens){let s=this.defaults.walkTokens,o=r.walkTokens;n.walkTokens=function(a){let i=[];return i.push(o.call(this,a)),s&&(i=i.concat(s.call(this,a))),i}}this.defaults={...this.defaults,...n}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Jt.lex(e,t??this.defaults)}parser(e,t){return er.parse(e,t??this.defaults)}parseMarkdown(e){return(t,r)=>{let n={...r},s={...this.defaults,...n},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&n.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=e),s.async)return(async()=>{let a=s.hooks?await s.hooks.preprocess(t):t,i=await(s.hooks?await s.hooks.provideLexer():e?Jt.lex:Jt.lexInline)(a,s),u=s.hooks?await s.hooks.processAllTokens(i):i;s.walkTokens&&await Promise.all(this.walkTokens(u,s.walkTokens));let d=await(s.hooks?await s.hooks.provideParser():e?er.parse:er.parseInline)(u,s);return s.hooks?await s.hooks.postprocess(d):d})().catch(o);try{s.hooks&&(t=s.hooks.preprocess(t));let a=(s.hooks?s.hooks.provideLexer():e?Jt.lex:Jt.lexInline)(t,s);s.hooks&&(a=s.hooks.processAllTokens(a)),s.walkTokens&&this.walkTokens(a,s.walkTokens);let i=(s.hooks?s.hooks.provideParser():e?er.parse:er.parseInline)(a,s);return s.hooks&&(i=s.hooks.postprocess(i)),i}catch(a){return o(a)}}}onError(e,t){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let n="<p>An error occurred:</p><pre>"+yr(r.message+"",!0)+"</pre>";return t?Promise.resolve(n):n}if(t)return Promise.reject(r);throw r}}},Ur=new If;function it(e,t){return Ur.parse(e,t)}it.options=it.setOptions=function(e){return Ur.setOptions(e),it.defaults=Ur.defaults,Ml(it.defaults),it};it.getDefaults=Ho;it.defaults=Wr;it.use=function(...e){return Ur.use(...e),it.defaults=Ur.defaults,Ml(it.defaults),it};it.walkTokens=function(e,t){return Ur.walkTokens(e,t)};it.parseInline=Ur.parseInline;it.Parser=er;it.parser=er.parse;it.Renderer=Os;it.TextRenderer=Jo;it.Lexer=Jt;it.lexer=Jt.lex;it.Tokenizer=Ls;it.Hooks=Ln;it.parse=it;var nh=it.options,sh=it.setOptions,oh=it.use,ah=it.walkTokens,ih=it.parseInline;var lh=er.parse,ch=Jt.lex;function Tr(e){let t=it.parse(e),r=Sl.sanitize(t);return El(r)}function vr(e,t){return l`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function cn(e){return e.loading?l`<div class="prompt-block__status">불러오는 중…</div>`:e.error?l`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function Ds(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=n=>String(n).padStart(2,"0");return`${t.getFullYear()}-${r(t.getMonth()+1)}-${r(t.getDate())} ${r(t.getHours())}:${r(t.getMinutes())}`}var Lf={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},Of={command_execution:"\uBA85\uB839 \uC2E4\uD589",file_change:"\uD30C\uC77C \uBCC0\uACBD",mcp_call:"MCP \uD638\uCD9C",web_search:"\uC6F9 \uAC80\uC0C9",plan:"\uACC4\uD68D"},Mf=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,Pf=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function ur(e){return!!e&&typeof e=="object"}function ea(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function Hl(e,t){let r=ea(e),n=ea(t),s=new Map;for(let i of r)s.set(i,(s.get(i)||0)+1);let o=0;for(let i of n){let u=s.get(i)||0;u>0?s.set(i,u-1):o+=1}let a=0;for(let i of s.values())a+=i;return{added:o,removed:a}}function Df(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(s=>ur(s)&&typeof s.text=="string"?s.text:"").join(""):ur(e)&&typeof e.text=="string"&&(t=e.text);let n=(String(t).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return n.length>120?`${n.slice(0,117)}\u2026`:n}function Nf(e){let t=String(e.name||""),r=e.input||{},n={kind:"tool",tool:t,icon:Lf[t]||"\u{1F527}",input:r,expandable:!0};if((t==="Read"||t==="Write")&&(n.path=String(r.file_path||r.path||"")),t==="Write"&&(n.added=ea(r.content).length),t==="Edit"){n.path=String(r.file_path||r.path||"");let{added:s,removed:o}=Hl(r.old_string,r.new_string);n.added=s,n.removed=o}if(t==="MultiEdit"){n.path=String(r.file_path||r.path||"");let s=0,o=0,a=Array.isArray(r.edits)?r.edits:[];for(let i of a){let u=Hl(ur(i)?i.old_string:"",ur(i)?i.new_string:"");s+=u.added,o+=u.removed}n.added=s,n.removed=o}return t==="Bash"&&(n.command=String(r.command||"")),(t==="Grep"||t==="Glob")&&(n.command=String(r.pattern||r.query||"")),n}function ta(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}function ra(e){let t=e.split(/\r?\n/).find(n=>n.trim().length>0)||"",r=Mf.exec(t);return r?{kind:"gate",gate:r[2]==="implementation"?"impl":r[2],reviewer:r[3],verdict:r[4],time:r[5]?r[5].trim():void 0,text:t.trim()}:Pf.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function qf(e,t){if(e.type==="assistant"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[],s=[];for(let o of n)if(ur(o)){if(o.type==="text"&&typeof o.text=="string")s.push(ra(o.text));else if(o.type==="thinking"){let a=ta(o.thinking);a&&s.push(a)}else if(o.type==="tool_use"){let a=Nf(o);typeof o.id=="string"&&t.set(o.id,a),s.push(a)}}return s}if(e.type==="user"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[];for(let s of n)if(ur(s)&&s.type==="tool_result"){let o=t.get(String(s.tool_use_id));if(o){let a=Df(s.content);o.result=a,o.output=typeof s.content=="string"?s.content:a}}return[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success";return[{kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""}]}return[]}function Ff(e){if(e.type==="item.completed"&&ur(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[ra(t.text)];if(t.type==="reasoning"){let r=ta(t.text);return r?[r]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function jf(e){if(e.schema!=="codex-delegation-monitor-v1"||!ur(e.event))return[];let t=e.event;if(t.type==="session.started"||t.type==="turn.started")return[];if((t.type==="item.started"||t.type==="item.completed")&&ur(t.item)){let r=t.item;if(typeof r.id!="string"||r.id.length===0)return[];if(t.type==="item.completed"&&r.kind==="agent_message"&&typeof r.text=="string"&&r.text.trim().length>0)return[ra(r.text)];if(t.type==="item.completed"&&r.kind==="reasoning"){let i=ta(r.text);return i?[i]:[]}if(r.kind!=="activity"||typeof r.activity!="string")return[];let n=Of[r.activity];if(!n)return[];let s="\uC2DC\uC791",o="\u2026",a={kind:"tool",tool:"",icon:o,expandable:!1};if(t.type==="item.completed"){if(r.status==="completed")s="\uC644\uB8CC",o="\u2713";else if(r.status==="failed")s="\uC2E4\uD328",o="\u2717";else return[];a.result=""}return a.tool=`${n} \xB7 ${s}`,a.icon=o,[a]}return t.type==="turn.completed"&&t.status==="completed"?[{kind:"result",success:!0,text:"DONE"}]:t.type==="turn.failed"&&(t.status==="failed"||t.status==="interrupted")&&typeof t.error_code=="string"&&t.error_code.length>0?[{kind:"error",text:t.error_code}]:[]}function Bf(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function Gl(e){let t=[],r=new Map,n=Array.isArray(e)?e:[];for(let s of n){let o=s;if(typeof s=="string"){let i=s.trim();if(i.length===0)continue;try{o=JSON.parse(i)}catch{continue}}if(!ur(o))continue;let a=o.schema==="codex-delegation-monitor-v1"?jf(o):Bf(o)?Ff(o):qf(o,r);for(let i of a)t.push(i)}return t}var Uf=5,Wf=10,zf=/Task\s+#(\d+)/,Hf=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,Gf=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function Ns(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function Vf(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function Kf(e){for(let t=e.length-1;t>=0;t-=1){let r=e[t];if(r.kind==="phase"||r.kind==="gate")return r.text||null}return null}function Yf(e){let t=new Map,r=0;for(let s of e){if(s.kind!=="tool")continue;r+=1;let o=s.input||{};if(s.tool==="TaskCreate"){let u=zf.exec(s.output||s.result||""),d=String(o.activeForm||o.subject||"").trim();if(!u||d.length===0)continue;t.set(u[1],{label:d,active:o.status==="in_progress"?r:0});continue}if(s.tool!=="TaskUpdate")continue;let a=t.get(String(o.taskId??""));if(!a)continue;let i=o.activeForm||o.subject;typeof i=="string"&&i.trim().length>0&&(a.label=i.trim()),typeof o.status=="string"&&(a.active=o.status==="in_progress"?r:0)}let n=null;for(let s of t.values())s.active>0&&(!n||s.active>n.active)&&(n=s);return n?n.label:null}function Zf(e){if(e.tool==="Bash"){let t=e.command||"";return Hf.test(t)?"~ PR/\uAC8C\uC2DC \uC911":Gf.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function Xf(e){let t=e.filter(s=>s.kind==="tool").slice(-Wf),r=new Map;t.forEach((s,o)=>{let a=Zf(s);if(!a)return;let i=r.get(a)||{count:0,last:-1};i.count+=1,i.last=o,r.set(a,i)});let n=null;for(let[s,o]of r)(!n||o.count>n.count||o.count===n.count&&o.last>n.last)&&(n={label:s,count:o.count,last:o.last});return n?n.label:null}function Qf(e){let t=Kf(e);if(t)return{text:t,guess:!1};let r=Yf(e);if(r)return{text:r,guess:!1};let n=Xf(e);return n?{text:n,guess:!0}:null}function Jf(e,t){if(typeof e!="number")return"";let r=Math.max(0,Math.floor((t-e)/1e3));return r<60?`${r}\uCD08 \uC804`:Nt(e,t)}function qs(e,t={}){let{transport:r,sessionLogStore:n,onClose:s}=t,o=null,a=null,i=null,u=!1,d={},f=!0,_=new Set,h=new Set,C=null,A=null,I=!1,D=!1,V=!1,Y=null,W=null;function R(){I=!1,D=!1,V=!1,Y=null,W=null}async function S(K){if(r){D=!0,V=!1,ie();try{let F=await Promise.resolve(r("get-attempt-prompt",{attempt_id:K}));if(o!==K)return;!F||typeof F!="object"||Array.isArray(F)?V=!0:(Y=F,W=K)}catch{o===K&&(V=!0)}finally{o===K&&(D=!1,ie())}}}function P(){if(I=!I,I&&o&&W!==o){S(o);return}ie()}function w(){if(!I)return"";let K=cn({loading:D,error:V});if(K)return l`<div class="sv__prompt" data-seam="attempt-prompt">
        ${K}
      </div>`;if(!Y)return"";if(Y.missing)return l`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let F=Ds(Y.recorded_at);return l`<div class="sv__prompt" data-seam="attempt-prompt">
      ${F?l`<div class="prompt-block__meta">${F} 발송</div>`:""}
      ${typeof Y.task_prompt=="string"?vr("\uACFC\uC5C5 (user)",Y.task_prompt):""}
      ${typeof Y.system_prompt=="string"?vr("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",Y.system_prompt):""}
    </div>`}function B(){if(!i||!n)return[];let K=n.get(i);return Gl(K?K.lines:[])}function te(){if(!i||!n)return null;let K=n.get(i),F=K?K.last_event_at:null;return typeof F=="number"?F:null}function le(){return d.status==="running"}function M(){if(le()&&o){A||(A=setInterval(()=>ie(),1e3));return}L()}function L(){A&&(clearInterval(A),A=null)}function ue(K){let F=[],re=0;for(;re<K.length;){let Oe=K[re];if(Oe.kind==="tool"){let Fe=re;for(;Fe<K.length&&K[Fe].kind==="tool"&&K[Fe].tool===Oe.tool;)Fe+=1;if(Fe-re>=Uf&&!h.has(re)){F.push({kind:"group",idx:re,tool:Oe.tool||"",lines:K.slice(re,Fe).map((ze,Ce)=>({idx:re+Ce,line:ze}))}),re=Fe;continue}}F.push({kind:"line",idx:re,line:Oe}),re+=1}return F}function ge(K){for(let F=K.length-1;F>=0;F-=1){let re=K[F];if(re.kind==="result"||re.kind==="error")return null;if(re.kind==="tool"&&!Object.hasOwn(re,"result"))return re}return null}function $e(K){for(let F=K.length-1;F>=0;F-=1)if(K[F].kind==="thinking")return K[F];return null}function Be(K,F){if(F.kind==="gate")return l`<div class="sv__gate">${F.text}</div>`;if(F.kind==="phase")return l`<div class="sv__phase">${F.text}</div>`;if(F.kind==="result")return l`<div
        class="sv__result${F.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${F.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${Tr(F.text||(F.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(F.kind==="thinking"){let re=_.has(K);return l`<div
        class="sv__think${re?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>Ie(K)}
      >
        <span class="sv__think-line">💭 ${Ns(F.text)}</span>
        ${re?l`<pre class="sv__think-expand">${F.text}</pre>`:""}
      </div>`}if(F.kind==="error")return l`<div class="sv__error">⛔ ${F.text}</div>`;if(F.kind==="blocker")return l`<div class="sv__error">⛔ ${F.text}</div>`;if(F.kind==="tool"){let re=_.has(K),Oe=F.tool==="Bash"?Vf(F.command):0,Fe=F.tool==="Bash"?Oe>1?Ns(F.command):F.command:F.path||F.command||"";return l`<div
        class="sv__tool${re?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>Ie(K)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${F.icon}</span>
          <span class="sv__tool-name">${F.tool}</span>
          ${Fe?l`<span class="sv__tool-detail">${Fe}</span>`:""}
          ${Oe>1?l`<span class="sv__tool-more">⋯ ${Oe}줄</span>`:""}
          ${typeof F.added=="number"?l`<span class="sv__diff-add">+${F.added}</span>`:""}
          ${typeof F.removed=="number"?l`<span class="sv__diff-del">−${F.removed}</span>`:""}
          ${F.result?l`<span class="sv__tool-ok">→ ${F.result}</span>`:""}
        </span>
        ${re?l`<pre class="sv__tool-expand">${Qe(F)}</pre>`:""}
      </div>`}return l`<div class="sv__as">${Tr(F.text||"")}</div>`}function Qe(K){let F=[];if(K.tool==="Bash"&&typeof K.command=="string"&&K.command.length>0)F.push(K.command);else if(K.input!==void 0)try{F.push(`input: ${JSON.stringify(K.input,null,2)}`)}catch{}return typeof K.output=="string"&&K.output.length>0&&F.push(`output:
${K.output}`),F.join(`

`)}function Ve(){if(!o)return l``;let K=B(),F=(a?[d.model,d.effort]:[d.runner,d.model,d.effort]).filter(Boolean).join(" \xB7 "),re=d.session_id||"",Oe=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${f?"ON":"OFF"}`,Fe=le(),ze=Fe?Jf(te(),Date.now()):"",Ce=Fe?ge(K):null,ct=Fe?$e(K):null,Ye=Qf(K);return l`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id">${a?d.role||"":o}</span>
        ${Ye?l`<span
              class="sv__stage${Ye.guess?" sv__stage--guess":""}"
              title=${Ye.text}
              >${Ye.text}</span
            >`:""}
        ${Fe?l`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${ze?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${ze}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${ze?l`<span class="sv__live-ago">${ze}</span>`:""}</span
            >`:""}
        ${re?l`<button
              type="button"
              class="sv__session"
              title=${re}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${re}`}
              @click=${()=>be(re)}
            >
              ⧉ ${re.slice(0,8)}
            </button>`:""}
        ${F?l`<span class="sv__meta">${F}</span>`:""}
        ${d.worktree?l`<span class="sv__wt" title=${d.worktree}
              >${d.worktree}</span
            >`:""}
        ${a||u?"":l`<button
              type="button"
              class="sv__prompt-toggle${I?" sv__prompt-toggle--on":""}"
              data-seam="attempt-prompt-toggle"
              aria-pressed=${I?"true":"false"}
              aria-label="발송 프롬프트 보기"
              title="이 세션에 실제로 보낸 시스템·과업 프롬프트"
              @click=${P}
            >
              ✉ 프롬프트
            </button>`}
        <button
          type="button"
          class="sv__follow${f?" sv__follow--on":""}"
          aria-pressed=${f?"true":"false"}
          aria-label=${Oe}
          @click=${Ee}
        >
          <span class="sv__follow-full">⇣ ${Oe}</span>
          <span class="sv__follow-short">⇣ ${f?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>tt()}
        >
          ✕
        </button>
      </div>
      ${a||u?"":w()}
      <div class="sv__body">
        ${K.length===0?l`<div class="sv__empty">세션 로그 없음</div>`:ue(K).map(H=>H.kind==="group"?Me(H):Be(H.idx,H.line))}
      </div>
      ${Ce||ct?l`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${Ce?l`<span class="sv__now-icon">${Ce.icon}</span>
                  <span class="sv__now-name">${Ce.tool}</span>
                  <span class="sv__now-detail"
                    >${Ce.tool==="Bash"?Ns(Ce.command):Ce.path||Ce.command||""}</span
                  >`:""}
            ${ct?l`<span class="sv__now-think"
                  >💭 ${Ns(ct.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function Me(K){return l`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>Ue(K.idx)}
    >
      <span class="sv__group-icon">${K.lines[0].line.icon}</span>
      <span class="sv__group-name">${K.tool}</span>
      <span class="sv__group-count">${K.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function Ue(K){h.add(K),ie()}function ie(){Ge(Ve(),e),M(),f&&Ae()}function Ae(){let K=e.querySelector(".sv__body");K&&(K.scrollTop=K.scrollHeight)}function Ie(K){_.has(K)?_.delete(K):_.add(K),ie()}function Ee(){f=!f,ie()}function be(K){Zt(K).then(F=>{F?se("\uBCF5\uC0AC\uB428","success",1200):se("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function We(K){!o||!K||(d={...d,...K},ie())}function et(K){let F=K.target;if(!F||!F.classList||!F.classList.contains("sv__body"))return;!(F.scrollHeight-F.scrollTop-F.clientHeight<=4)&&f&&(f=!1,ie())}e.addEventListener("scroll",et,!0);function Te(K){let F=K&&K.attempt_id;if(!F)return;let re=i;o=F,a=typeof K.launch_id=="string"&&K.launch_id.length>0?K.launch_id:null,i=a?`session-log:${o}:${a}`:`session-log:${o}`,r&&re&&re!==i&&Promise.resolve(r("unsubscribe-session-log",{id:re})).catch(()=>{}),d=K.meta||{},u=K.hide_prompt===!0,f=!0,_.clear(),h.clear(),R(),!C&&n&&(C=n.subscribe(ie)),r&&Promise.resolve(r("subscribe-session-log",{id:i,attempt_id:o,...a?{launch_id:a}:{}})).catch(()=>{}),ie()}function tt(){let K=i;o=null,a=null,i=null,u=!1,_.clear(),h.clear(),R(),L(),r&&K&&Promise.resolve(r("unsubscribe-session-log",{id:K})).catch(()=>{}),Ge(l``,e),s&&s()}return{open:Te,updateMeta:We,close:tt,isOpen(){return o!==null},destroy(){L(),C&&(C(),C=null),e.removeEventListener("scroll",et,!0),o=null,a=null,i=null,u=!1,Ge(l``,e)}}}function Fs(e){let t=e&&typeof e=="object"?e:{},r=t.metadata&&typeof t.metadata=="object"?t.metadata:{},n=na(t.spec_id),s=na(r.spec_id);return n?{path:n,source:"native",conflict:s.length>0&&s!==n}:s?{path:s,source:"metadata",conflict:!1}:{path:"",source:"none",conflict:!1}}function na(e){return typeof e=="string"?e.trim():""}function Vl(e){let t=Fs(e);if(t.path)return t;let r=na(e_(e).spec_path);return r?{path:r,source:"draft",conflict:!1}:t}function e_(e){let t=e&&typeof e=="object"?e:{};return t.metadata&&typeof t.metadata=="object"?t.metadata:{}}function t_(e){return["plan_review","plan_approval","plan_check"].some(t=>{let r=e[t];return typeof r=="string"&&r.trim().length>0})}function r_(e){let t=e&&e.metadata||{},r=Vl(e),n=[];return r.path&&n.push({kind:"spec",path:r.path,missing_state:r.source==="draft"?"spec_draft":null}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&n.push({kind:"plan",path:t.plan_path.trim(),missing_state:t_(t)?null:"plan_pending"}),n}function Kl(e,t){let r=r_(e);return l`
    <div class="detail-section-label">Artifacts</div>
    ${r.length===0?l`<div class="detail-empty">산출물 없음</div>`:l`
          ${r.map(n=>l`<div class="detail-art">
                <span class="detail-art__ic" aria-hidden="true">▤</span>
                <button
                  type="button"
                  class="detail-art__path"
                  title=${`${n.path} \xB7 \uD074\uB9AD\uD558\uBA74 \uBCF5\uC0AC`}
                  @click=${s=>t.onCopyPath(s,n.path)}
                >
                  ${n.path}
                </button>
                ${n.missing_state==="spec_draft"?l`<span class="detail-art__badge">draft</span>`:null}
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
  `}var n_="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",s_=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,o_=/^\*\*결론\*\* — (.+)$/;function js(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==n_)return null;let r=s_.exec(t[1]||"");if(!r)return null;let n=r[1].split(" ")[0],s=r[2],o=r[3],a=2;for(;a<t.length&&t[a].trim().length===0;)a+=1;let i=a<t.length?o_.exec(t[a]):null,u=i?i[1].replace(/\s+/g," ").trim():"",d=i?a+1:a;return{lane:n,identifier:s,timestamp:o,conclusion:u,body:t.slice(d).join(`
`).trim()}}var Yl=20;function Zl(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let r=String(t.getMonth()+1).padStart(2,"0"),n=String(t.getDate()).padStart(2,"0"),s=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0");return`${r}-${n} ${s}:${o}`}function a_(e){return e.length>Yl?`${e.slice(0,Yl)}\u2026`:e}function i_(e,t,r,n){let s=`${t.lane} ${a_(t.identifier)}`;return l`<div class="detail-report">
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
        <span class="detail-report__time">${Zl(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${n&&t.body.length>0?l`<div class="detail-report__body">
          ${Tr(t.body)}
        </div>`:""}
  </div>`}function l_(e){return l`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${Zl(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${Tr(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function Xl(e,t={},r={}){let n=Array.isArray(e)?e.filter(Boolean):[],s=r.expanded||new Set,o=typeof r.draft=="string"?r.draft:"",a=r.sending===!0,i=n.slice().sort((u,d)=>String(d.created_at||"").localeCompare(String(u.created_at||"")));return l`
    <div class="detail-section-label">댓글 (${n.length})</div>
    ${r.error?l`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:i.length===0?l`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:l`<div class="detail-comments" data-seam="comments">
            ${i.map(u=>{let d=js(typeof u.text=="string"?u.text:"");return d?i_(u,d,t,s.has(u.id)):l_(u)})}
          </div>`}
    <div class="detail-comment-compose">
      <textarea
        class="detail-comment-compose__input"
        aria-label="댓글 추가"
        placeholder="댓글 추가"
        rows="3"
        ?disabled=${a}
        .value=${o}
        @input=${u=>t.onDraftInput&&t.onDraftInput(u.target.value)}
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
  `}var{I:Uh}=yi;var Ql=e=>e.strings===void 0;var c_={},Jl=(e,t=c_)=>e._$AH=t;var zr=Ts(class extends ln{constructor(e){if(super(e),e.type!==hr.PROPERTY&&e.type!==hr.ATTRIBUTE&&e.type!==hr.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!Ql(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===jt||t===mt)return t;let r=e.element,n=e.name;if(e.type===hr.PROPERTY){if(t===r[n])return jt}else if(e.type===hr.BOOLEAN_ATTRIBUTE){if(!!t===r.hasAttribute(n))return jt}else if(e.type===hr.ATTRIBUTE&&r.getAttribute(n)===t+"")return jt;return Jl(e),t}});var Bs=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"],u_=Bs.filter(e=>e!=="impl_dispatch"),Cr=["orchestration_model","orchestration_effort","orchestration_speed"],ec=[...Bs,...Cr],tc=["delegated","main"],Us=["inherit","claude","codex"],Pn=["default","fast"],Dn=["standard","fast_track"],Nn=["codex","opus","fable","self","skip"],Ws=["codex","fable","skip"],zs=["low","medium","high","xhigh"],dr="auto";function wr(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function rc(e){if(!wr(e)||!wr(e.runners))return[];let t=[];for(let[r,n]of Object.entries(e.runners))wr(n)&&wr(n.models)&&t.push([r,Object.keys(n.models)]);return t}function Hs(e,t){let r=rc(e),n=t&&t!=="inherit"?r.filter(([s])=>s===t):r;return[dr,...n.flatMap(([,s])=>s)]}function un(e,t,r){if(!wr(e)||!wr(e.runners))return[dr];let n=[];for(let[s,o]of Object.entries(e.runners))if(!(!wr(o)||!wr(o.models))&&!(t&&t!=="inherit"&&s!==t))for(let[a,i]of Object.entries(o.models)){if(r&&r!==dr&&a!==r)continue;let u=wr(i)?i.efforts:null;if(Array.isArray(u))for(let d of u)typeof d=="string"&&!n.includes(d)&&n.push(d)}return[dr,...n]}function Gs(e,t){let r=rc(e);return(t?r.filter(([s])=>s===t):r).flatMap(([,s])=>s)}function sa(e,t,r,n,s){return ks({key:e,choices:t,layer:"global",global:r,execution_defaults:n,runner_catalog:s})}function nc(e,t){let r={};for(let n of u_){let s=e?.[n],o=t?.[n];s!==o&&(r[n]=typeof o=="string"&&o.length>0?o:null)}return r}function sc(e,t){let r={};for(let n of Cr){let s=e?.[n]??null,o=t?.[n]??null;s!==o&&(r[n]=typeof o=="string"&&o.length>0?o:null)}return r}var oa=[{id:"workflow",label:"\uC6CC\uD06C\uD50C\uB85C\uC6B0",keys:["workflow_mode"]},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort"]},{id:"implementation",label:"\uAD6C\uD604",keys:["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]},{id:"worker",label:"Worker",keys:[...Cr]}],aa={workflow_mode:"\uBAA8\uB4DC",spec_review_model:"\uC0AC\uC591 \uB9AC\uBDF0",spec_review_effort:"\uC0AC\uC591 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_dispatch:"\uC2E4\uD589 \uBC29\uC2DD",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uBAA8\uB378",impl_effort:"effort",impl_speed:"\uC18D\uB3C4",orchestration_model:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",orchestration_effort:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",orchestration_speed:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4"},oc={pin:"\uD540",global:"\uC804\uC5ED",base:"\uAE30\uBCF8"};function ia(e,t,r,n,s,o=null){let a=nn({pin:t,global:r,execution_defaults:n,runner_catalog:s,route:t&&typeof t.route=="string"?t.route:null,controller_runtime:o});return e.map(i=>({key:i,...a[i]}))}function ac(e,t,r,n,s,o=null){let a={pin:0,global:0,base:0};for(let i of ia(e,t,r,n,s,o))a[i.source]+=1;return a}function ic(e,t,r){return{id:e,key:t,value:typeof r=="string"?r:""}}function lc(e,t,r){return typeof t!="string"||t.length===0?null:{id:e,preset_id:t,expected_revision:r}}var Jh=[...Bs,...Cr];var d_=[{id:"spec",label:"spec \uB9AC\uBDF0",receipt:"spec_review"},{id:"impl",label:"\uAD6C\uD604",receipt:null},{id:"impl_review",label:"impl \uB9AC\uBDF0",receipt:"impl_review"},{id:"pr",label:"PR",receipt:null}],p_={pin:"pin",global:"global",base:"base"};function f_(e){return l`<span
    class=${`detail-layer-rail detail-layer-rail--${p_[e]}`}
    data-source=${e}
    aria-hidden="true"
    ><i></i><i></i><i></i
  ></span>`}function __(e,t,r){switch(e){case"workflow_mode":return Dn;case"spec_review_model":case"impl_review_model":return Nn;case"plan_review_model":return Ws;case"spec_review_effort":case"plan_review_effort":case"impl_review_effort":return zs;case"impl_dispatch":return tc;case"impl_runtime":return Us;case"impl_model":return Hs(r,t.impl_runtime);case"impl_effort":return un(r,t.impl_runtime,t.impl_model);case"impl_speed":case"orchestration_speed":return Pn;case"orchestration_model":return Gs(r,null);case"orchestration_effort":return un(r,void 0,t.orchestration_model||dr).filter(n=>n!==dr);default:return[]}}function m_(e,t){return l`<div class="detail-effective__row" data-key=${e.key}>
    ${f_(e.source)}
    <span class="detail-effective__k"
      >${aa[e.key]||e.key}</span
    >
    <span
      class=${`detail-effective__v${e.source==="base"?" detail-effective__v--dim":""}`}
      title=${e.full_value||""}
      >${e.display}</span
    >
    <span
      class=${`detail-effective__badge detail-effective__badge--${e.source}`}
      >${oc[e.source]}</span
    >
    ${t.expanded?l`<select
          class="detail-effective__edit"
          data-edit-key=${e.key}
          aria-label=${`${aa[e.key]||e.key} \uD3B8\uC9D1`}
          ?disabled=${e.resolution==="not_applicable"}
          @change=${r=>{let n=String(r.target.value);t.onEdit(e.key,n.length===0?null:n)}}
        >
          <option
            value=""
            title=${t.default_full_value||""}
            ?selected=${e.source!=="pin"}
          >
            ${t.default_label}
          </option>
          ${t.options.map(r=>l`<option
                value=${r.value}
                title=${r.full_value||""}
                ?selected=${e.source==="pin"&&e.value===r.value}
              >
                ${r.label}
              </option>`)}
        </select>`:""}
  </div>`}function cc(e,t){let r=oa.flatMap(u=>u.keys),n=ia(r,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),s=ac(r,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),o=Object.fromEntries(n.map(u=>[u.key,u])),a=Object.fromEntries(n.filter(u=>u.value!==null).map(u=>[u.key,u.value])),i=n.filter(u=>u.full_value&&u.display!==u.full_value).map(u=>u.full_value).join(" \xB7 ");return l`<details
    class=${`detail-effective${e.expanded?" detail-effective--open":""}`}
    data-seam="effective-settings"
    ?open=${e.expanded}
    @toggle=${u=>t.onToggle(u.currentTarget.open)}
  >
    <summary
      class="detail-effective__head"
      data-seam="effective-settings-toggle"
      @click=${u=>{u.preventDefault();let d=u.currentTarget.parentElement;t.onToggle(!d.open)}}
    >
      <span class="detail-effective__t">유효 실행 설정</span>
      <span class="detail-effective__summary" title=${i}
        >${g_(o)}</span
      >
      <span class="detail-effective__counts">
        <span class="detail-effective__count detail-effective__count--pin"
          >핀 ${s.pin}</span
        >
        <span class="detail-effective__count detail-effective__count--global"
          >전역 ${s.global}</span
        >
        <span class="detail-effective__count detail-effective__count--base"
          >기본 ${s.base}</span
        >
      </span>
      <span class="detail-effective__chev">▸</span>
    </summary>
    ${e.expanded?l`<div class="detail-effective__body">
          ${oa.map(u=>l`
              <div class="detail-effective__subhead">${u.label}</div>
              ${n.filter(d=>u.keys.includes(d.key)).map(d=>{let f=ks({key:d.key,choices:__(d.key,a,e.catalog),layer:"pin",pin:e.metadata,global:e.workspace_values,execution_defaults:e.execution_defaults,runner_catalog:e.catalog,controller_runtime:e.controller_runtime||null});return m_(d,{expanded:e.expanded,options:f.options,default_label:f.unset_label,default_full_value:f.full_value,onEdit:t.onEdit})})}
            `)}
          <div class="detail-effective__foot">
            <select
              data-impl-preset-select
              aria-label="실행 프리셋"
              .value=${zr(e.preset_id)}
              ?disabled=${e.preset_busy}
              @change=${u=>t.onPresetSelect(String(u.target.value))}
            >
              <option value="" ?selected=${e.preset_id===""}>
                실행 프리셋…
              </option>
              ${e.presets.map(u=>l`<option
                    value=${u.id}
                    ?selected=${u.id===e.preset_id}
                  >
                    ${u.name}${u.compatible===!1?" (\uBE44\uD638\uD658)":""}
                  </option>`)}
            </select>
            <button
              type="button"
              data-apply-impl-preset
              ?disabled=${e.preset_id.length===0||e.preset_busy}
              @click=${t.onPresetApply}
            >
              이 이슈에 적용
            </button>
            <span class="detail-effective__hint"
              >세션 키 12개를 핀으로 기록</span
            >
            ${(e.skipped_orchestration_keys||[]).length>0?l`<span
                  class="detail-effective__hint"
                  data-preset-skip-notice
                  >오케스트레이션 3키는 Bead에 핀할 수 없어 건너뜀</span
                >`:""}
          </div>
        </div>`:""}
  </details>`}function g_(e){let t=[];if(e.workflow_mode&&t.push(e.workflow_mode.display),e.impl_dispatch?.value==="main")t.push("\uBA54\uC778");else if(e.impl_dispatch?.value==="delegated"){let r=e.impl_runtime?` ${e.impl_runtime.display}`:"";t.push(`\uC704\uC784${r}`)}for(let r of["impl_model","impl_effort","impl_speed"])e[r]?.resolution!=="not_applicable"&&t.push(e[r]?.display||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00");return t.join(" \xB7 ")}function b_(e){if(!e||typeof e!="object")return null;let{kind:t,actor:r,effort:n,sha:s}=e;return typeof t!="string"||typeof r!="string"||typeof s!="string"?null:{kind:t,actor:r,effort:typeof n=="string"?n:null,sha:s}}function uc(e){let t=e&&typeof e.metadata=="object"&&e.metadata?e.metadata:{},r=e&&typeof e.workflow=="object"&&e.workflow?e.workflow:{},n=r.stages||{},s=r.route||t.route||null,o=typeof t.pr_url=="string"?t.pr_url:"",a=typeof t.exec_receipt=="string"?t.exec_receipt:"",i=b_(r.exec_receipt),u=i?Br(i):a,d=i?`${i.kind}:${i.actor}`:a.split("@")[0],f=ys(r.planned_execution,r.exec_receipt);return l`<section class="detail-summary" data-seam="detail-summary">
    <div class="detail-summary__chips">
      <span class="detail-summary__chip detail-summary__chip--status"
        >${e?.status||"\u2014"}</span
      >
      ${s?l`<span class="detail-summary__chip detail-summary__chip--route"
            >${s}</span
          >`:""}
      ${t.workflow_mode==="fast_track"?l`<span class="detail-summary__chip detail-summary__chip--mode"
            >fast_track</span
          >`:""}
      ${o?l`<a
            class="detail-summary__chip detail-summary__chip--pr"
            href=${o}
            target="_blank"
            rel="noreferrer"
            >PR</a
          >`:""}
      ${f?l`<span
            class="detail-summary__chip detail-summary__chip--planned ctl-chip--planned"
            data-kind=${f.kind}
            title=${f.title}
            >${f.label}</span
          >`:""}
      ${u?l`<span
            class="detail-summary__chip detail-summary__chip--receipt"
            title=${u}
            >${d}${i?.effort?l`${" "}<span
                    class="detail-summary__chip-effort"
                    data-seam="exec-receipt-effort"
                    >${i.effort}</span
                  >`:""}</span
          >`:""}
    </div>
    <div class="detail-summary__gates">
      ${d_.map(_=>{let h=_.receipt&&typeof t[_.receipt]=="string"?String(t[_.receipt]):"",C=n[_.id],A=h.length>0||C?.fill==="full",I=!A&&C?.fill==="dim",D=C?.stale===!0;return l`<span
          class=${`detail-summary__gate${A?" detail-summary__gate--on":""}${I?" detail-summary__gate--current":""}${D?" detail-summary__gate--stale":""}`}
          data-gate=${_.id}
        >
          <span class="detail-summary__gate-pill">${_.label}</span>
          ${h?l`<span class="detail-summary__gate-sha"
                >${h.split("@")[1]?.slice(0,7)||""}</span
              >`:""}
        </span>`})}
    </div>
  </section>`}var dc=["orchestration_model","orchestration_effort","orchestration_speed","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_runtime","impl_model","impl_effort"];function qn(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Vs(e){if(!qn(e)||!qn(e.runners))return null;let t=Object.entries(e.runners).filter(([,r])=>qn(r)&&qn(r.models));return t.length>0?t:null}function la(e,t){let r=Vs(e);if(!r||!t)return null;for(let[n,s]of r)if(Object.hasOwn(s.models,t))return n;return null}function pc(e,t){return qn(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function fc(e,t){let r=Vs(e);if(!r||!t)return[];for(let[,n]of r)if(Object.hasOwn(n.models,t))return pc(n,n.models[t]);return[]}function h_(e){let t=Vs(e);if(!t)return[];let r=[];for(let[,n]of t)for(let s of Object.values(n.models))for(let o of pc(n,s))r.includes(o)||r.push(o);return r}function y_(e,t){if(!t)return h_(e);let n=Vs(e)?.find(([o])=>o===t)?.[1];if(!n)return[];let s=[];for(let o of Object.keys(n.models))for(let a of fc(e,o))s.includes(a)||s.push(a);return s}function _c(e,t,r){let n={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},s=n.impl_runtime==="inherit"?r:n.impl_runtime==="claude"||n.impl_runtime==="codex"?n.impl_runtime:null;if(n.impl_runtime==="inherit"&&!s)return n.impl_model="",n.impl_effort="",n;let o=la(t,n.impl_model);if(n.impl_model&&(!s||o!==s))return n.impl_model="",n.impl_effort="",n;let a=n.impl_model?fc(t,n.impl_model):y_(t,s);return n.impl_effort&&a.length>0&&!a.includes(n.impl_effort)&&(n.impl_effort=""),n}function v_(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function mc(e,t){let r=t.getWorkspacePath,n=t.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",a="",i="";function u(A){A.key==="Escape"&&s&&(A.preventDefault(),h())}document.addEventListener("keydown",u);function d(){return s?l`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>h()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${v_(s)}</span
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
            ${o==="loading"?l`<div class="mv__status">불러오는 중…</div>`:o==="pending"?l`<div class="mv__status">${i}</div>`:o==="error"?l`<div class="mv__status mv__status--error">
                      ${i||"\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}
                    </div>`:Tr(a)}
          </div>
        </div>
      </div>
    `:l``}function f(){Ge(d(),e)}async function _(A,I={}){s=A,o="loading",a="",i="",f();let D=r?r():"";if(!D){o="error",i="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",f();return}if(!n){o="error",i="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",f();return}let V="/api/doc?workspace="+encodeURIComponent(D)+"&path="+encodeURIComponent(A);try{let Y=await n(V),W=await Y.json().catch(()=>({}));if(!Y.ok||!W||W.ok!==!0){if(W?.error==="not_found"&&I.missing_state==="plan_pending"){o="pending",i="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",f();return}o="error",i="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(W&&W.error||Y.status)+")",f();return}a=String(W.content||""),o="ready",f()}catch{o="error",i="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",f()}}function h(){s=null,Ge(l``,e)}function C(){document.removeEventListener("keydown",u),h()}return{open:_,close:h,destroy:C}}var w_=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],bc="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",Ks=["implementation","review-consult"],k_=["running","done","failed","interrupted"],$_={running:"\u25CF",done:"\u2713",failed:"\u2717",interrupted:"\u26A0"};function x_(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function A_(e){let t=xt(e);if(t.length>0)return t.map(s=>l`<span class="detail-usage-total" title=${s.tooltip}
          >${s.label}</span
        >`);let r=on(e);if(!r||!e)return"";let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return l`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${r.replace(/^τ /,"\u03C4 \uCD1D ")}${n}</span
    >${e.replayed?l`<span class="detail-usage-partial" title=${bc}
          >부분 집계</span
        >`:""}`}function gc(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function ca(e){if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?ua(t):""}function S_(e){if(!e||typeof e!="object"||Array.isArray(e))return null;let t=e;return typeof t.launch_id!="string"||t.launch_id.length===0||t.provider!=="codex"||!Ks.includes(t.role)||typeof t.model!="string"||t.model.length===0||!(!("effort"in t)||t.effort===null||typeof t.effort=="string"&&t.effort.trim().length>0)||typeof t.session_id!="string"||t.session_id.length===0||!k_.includes(t.status)||typeof t.started_at!="number"||!Number.isFinite(t.started_at)||typeof t.last_event_at!="number"||!Number.isFinite(t.last_event_at)||!(t.completed_at===null||typeof t.completed_at=="string"&&Number.isFinite(Date.parse(t.completed_at)))||!(t.turn_id===null||typeof t.turn_id=="string")?null:t}function E_(e,t){let n=xt({providers:{codex:{subtotal:t.subtotal,breakdown:t.usage,...t.replayed?{replayed:!0}:{}}},roles:{}})[0];return l`<div class="detail-session__leg detail-session__usage-detail">
    <span class="detail-session__leg-role detail-session__usage-label"
      >${e}</span
    >
    <span class="detail-session__leg-meta detail-session__usage-value"
      >${[t.provider,t.model,t.effort].filter(Boolean).join(" \xB7 ")}</span
    >
    ${t.session_id?l`<span
          class="detail-session__leg-sid detail-session__sid"
          title=${t.session_id}
          >${t.session_id.slice(0,8)}</span
        >`:""}
    ${ca(t.completed_at)?l`<span class="detail-session__leg-time detail-session__time"
          >${ca(t.completed_at)}</span
        >`:""}
    ${n?l`<span class="detail-session__usage" title=${n.tooltip}
          >${n.label}</span
        >`:""}
  </div>`}function T_(e,t,r,n){let s=e.status==="running"?null:t,a=(s?xt({providers:{codex:{subtotal:s.subtotal,breakdown:s.usage,...s.replayed?{replayed:!0}:{}}},roles:{}}):[])[0],i=e.status==="running"?ua(e.last_event_at):s?ca(s.completed_at):"";return l`<button
    type="button"
    class="detail-session__leg detail-session__usage-detail detail-session__leg--${e.status}"
    data-launch-id=${e.launch_id}
    @click=${()=>n.onOpenDelegation&&n.onOpenDelegation(r,e.launch_id)}
  >
    <span class="detail-session__leg-glyph" aria-hidden="true"
      >${$_[e.status]}</span
    >
    <span class="detail-session__leg-role detail-session__usage-label"
      >${e.role}</span
    >
    <span class="detail-session__leg-meta detail-session__usage-value"
      >${["codex",e.model,e.effort].filter(Boolean).join(" \xB7 ")}</span
    >
    <span
      class="detail-session__leg-sid detail-session__sid"
      title=${e.session_id}
      >${e.session_id.slice(0,8)}</span
    >
    ${i?l`<span class="detail-session__leg-time detail-session__time"
          >${i}</span
        >`:""}
    ${a?l`<span class="detail-session__usage" title=${a.tooltip}
          >${a.label}</span
        >`:""}
  </button>`}function C_(e,t){return e.role===t.role&&e.model===t.model&&e.session_id===t.session_id}function R_(e,t,r){let n=[],s=new Set,o=Array.isArray(e.delegation_sessions)?e.delegation_sessions:[];for(let f of o){let _=S_(f);!_||s.has(_.launch_id)||(s.add(_.launch_id),n.push(_))}n.sort((f,_)=>f.started_at-_.started_at);let a={implementation:[],"review-consult":[]};if(t)for(let f of Ks){let _=t.roles[f]?.codex;a[f]=_?[..._.legs]:[]}let i=Ks.flatMap(f=>a[f]),u=new Set,d=[];for(let f of Ks){for(let _ of n.filter(h=>h.role===f)){let h=i.find(C=>C.receipt_id===_.launch_id)||null;h&&!C_(_,h)||(h&&u.add(h.receipt_id),d.push(T_(_,h,e.attempt_id,r)))}for(let _ of a[f])u.has(_.receipt_id)||d.push(E_(f,_))}return d}function I_(e,t){let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,n=[...w_,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return l`<div class="detail-session__usage-detail">
    ${n.map(s=>l`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${s.label}</span
          ><span class="detail-session__usage-value"
            >${x_(e[s.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${r===null?"":l`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${r.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?l`<span class="detail-session__usage-note">${bc}</span>`:""}
  </div>`}var L_={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function ua(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=String(t.getHours()).padStart(2,"0"),n=String(t.getMinutes()).padStart(2,"0");return`${r}:${n}`}function O_(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,n])=>typeof n=="string"&&n.length>0).map(([n,s])=>`${n}=${s}`).join(" \xB7 "):"",r=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return l`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${r}</span>
    ${t?l`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}function hc(e,t={},r={}){let n=Array.isArray(e)?e:[],s=r.expanded||new Set;if(n.length===0)return l`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let o=new Set;for(let d of n)d&&typeof d.resumed_from=="string"&&d.resumed_from.length>0&&o.add(d.resumed_from);let a=d=>{if(!(d.status==="failed"||d.status==="orphaned"))return"";let _=typeof d.session_id=="string"&&d.session_id.length>0,h=o.has(d.attempt_id),C=_&&!h,A=_?h?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return l`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${d.attempt_id}
      ?disabled=${!C}
      title=${A}
      @click=${I=>{I.stopPropagation(),C&&t.onResume&&t.onResume(d.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},i=d=>{if(!(d.status==="failed"||d.status==="orphaned")||typeof d.cause!="string"||d.cause==="")return"";let _=d.cause_detail,h=_&&typeof _.reason=="string"&&_.reason.length>0?typeof _.command=="string"&&_.command.length>0?`${_.reason} \xB7 ${_.command}`:_.reason:d.cause;return l`<div class="detail-session__cause" title=${h}>
      ${d.cause}
    </div>`},u=d=>{let f=gc(Lo(d));if(xt(f).length===0&&!on(d.usage))return"";let _=s.has(d.attempt_id);return l`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${d.attempt_id}
      aria-expanded=${_?"true":"false"}
      title=${_?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${h=>{h.stopPropagation(),t.onToggleUsage&&t.onToggleUsage(d.attempt_id)}}
    >
      τ 자세히
    </button>`};return l`
    <div class="detail-section-label">
      세션 이력${A_(r.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${n.map(d=>{let f=Lo(d),_=gc(f),h=xt(_);return l`<div class="detail-session-row">
          <button
            type="button"
            class="detail-session detail-session--${d.status||"unknown"}"
            data-attempt-id=${d.attempt_id}
            @click=${()=>t.onOpen&&t.onOpen(d.attempt_id)}
          >
            <span class="detail-session__glyph"
              >${L_[d.status||""]||"\xB7"}</span
            >
            <span class="detail-session__id">${d.attempt_id}</span>
            ${Sr(d)?l`<span
                  class="detail-session__resumed"
                  title=${Sr(d)}
                  >↻</span
                >`:""}
            <span class="detail-session__meta">${cr(d)}</span>
            ${h.length>0?l`<span class="detail-session__role">orchestrator</span>`:""}
            ${d.session_id?l`<span class="detail-session__sid" title=${d.session_id}
                  >${String(d.session_id).slice(0,8)}</span
                >`:""}
            ${h.length>0?h.map(C=>l`<span
                      class="detail-session__usage"
                      title=${C.tooltip}
                      >${C.label}</span
                    >`):on(d.usage)?l`<span class="detail-session__usage"
                    >${on(d.usage)}</span
                  >`:""}
            <span class="detail-session__time">${ua(d.started_at)}</span>
          </button>
          ${u(d)} ${a(d)} ${i(d)} ${O_(d)}
          ${s.has(d.attempt_id)&&d.usage?I_(d.usage,d.runner==="codex"?"codex":"claude"):""}
          ${R_(d,f,t)}
        </div>`})}
    </div>
  `}function yc(e,t={}){return l`
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
    ${e.expanded?l`<div class="detail-prompt" data-seam="task-prompt">
          ${M_(e)}
        </div>`:""}
  `}function M_(e){let t=cn(e);if(t)return t;let r=e.data;if(!r)return"";if(r.missing)return l`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof r.default_task_prompt=="string"?vr("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",r.default_task_prompt):""}`;let n=Ds(r.recorded_at);return l`<div class="detail-prompt__meta">
      ${r.attempt_id}${n?` \xB7 ${n}`:""}
    </div>
    ${typeof r.task_prompt=="string"?vr("\uACFC\uC5C5 (user)",r.task_prompt):""}
    ${typeof r.system_prompt=="string"?vr("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",r.system_prompt):""}`}var P_=["open","in_progress","deferred","resolved","closed"],D_=[0,1,2,3,4];function vc(e,t){let r=t.issueStores,n=t.onClose,s=t.transport,o=t.onNavigate,a=t.queueStore,i=t.execPresetStore,u=t.sessionLogStore,d=null,f=null,_={},h="",C=!1,A=[],I=!1,D={},V=!1,Y=!1,W="",R="",S="";function P(){V=!1,Y=!1,W="",R="",S=""}let w=[],B=null,te=null,le=!1,M="",L=!1,ue=0,ge=new Set;function $e(){w=[],B=null,te=null,le=!1,M="",L=!1,ue+=1,ge.clear()}async function Be(p){if(!s)return;let g=++ue;try{let x=await Promise.resolve(s("get-comments",{id:p}));if(g!==ue||p!==d)return;w=Array.isArray(x)?x:[],le=!1}catch{if(g!==ue||p!==d)return;le=!0}Ne()}function Qe(){if(!s||!d)return;let p=f&&typeof f.comment_count=="number"?f.comment_count:null;if(B!==d){B=d,te=p,Be(d);return}p!==null&&p!==te&&(te=p,Be(d))}function Ve(p){ge.has(p)?ge.delete(p):ge.add(p),Ne()}function Me(p){let g=M.trim().length===0;M=p,g!==(p.trim().length===0)&&Ne()}async function Ue(){let p=M.trim();if(!s||!d||p.length===0||L)return;let g=d;L=!0,Ne();let x=!1;try{let U=await Promise.resolve(s("add-comment",{id:g,text:p}));Array.isArray(U)&&U.length>0&&(x=!0,g===d&&(w=U,le=!1,M="",te=U.length))}catch{x=!1}x||se("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),g===d&&(L=!1),Ne()}let ie={onToggle:Ve,onDraftInput:Me,onSubmit:Ue},Ae=document.createElement("div");Ae.className="md-viewer-root",document.body.appendChild(Ae);let Ie=mc(Ae,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),Ee=document.createElement("div");Ee.className="session-log-root",document.body.appendChild(Ee);let be=qs(Ee,{transport:s?(p,g)=>Promise.resolve(s(p,g)):void 0,sessionLogStore:u}),We=!1,et=!1,Te=!1,tt=null,K=null,F=0;function re(p){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${p}`}function Oe(){We=!1,et=!1,Te=!1,tt=null,K=null,F+=1}async function Fe(p){if(!s)return;let g=++F;et=!0,Te=!1,Ne();try{let x=await Promise.resolve(s("get-bead-prompt",{bead_id:p}));if(g!==F)return;!x||typeof x!="object"||Array.isArray(x)?Te=!0:(tt=x,K=re(p))}catch{g===F&&(Te=!0)}finally{g===F&&(et=!1,Ne())}}function ze(){if(We=!We,We&&d&&K!==re(d)){tt=null,Fe(d);return}Ne()}function Ce(){if(!a||!d)return[];let p=a.get();return(p&&p.attempts?Object.values(p.attempts):[]).filter(x=>x&&x.bead_id===d).sort((x,U)=>(U.started_at||0)-(x.started_at||0)).map(x=>({attempt_id:x.attempt_id,bead_id:x.bead_id,status:x.status,started_at:typeof x.started_at=="number"?x.started_at:null,runner:x.runner||null,model:x.model||null,effort:x.effort||x.observed_effort||null,speed:x.speed||null,session_id:x.session_id||null,resumed_from:x.resumed_from||null,continuation_mode:x.continuation_mode||null,dismissed_at:typeof x.dismissed_at=="number"?x.dismissed_at:null,cause:typeof x.cause=="string"?x.cause:null,cause_detail:x.cause_detail||null,exec_default_preset_id:typeof x.exec_default_preset_id=="string"?x.exec_default_preset_id:null,exec_default_preset_revision:typeof x.exec_default_preset_revision=="number"?x.exec_default_preset_revision:null,exec_values:x.exec_values&&typeof x.exec_values=="object"?x.exec_values:null,usage:x.usage||null,usage_legs:Array.isArray(x.usage_legs)?x.usage_legs:[],delegation_sessions:Array.isArray(x.delegation_sessions)?x.delegation_sessions:[]}))}function ct(){if(!a||!d)return null;let p=a.get();return Ut(p&&p.attempts||{},d)}let Ye=new Set;function H(p){Ye.has(p)?Ye.delete(p):Ye.add(p),Ne()}function ee(p){let g=a?a.get():null,x=g&&g.attempts?g.attempts[p]:null;be.open({attempt_id:p,meta:x?{runner:x.runner||void 0,model:x.model||void 0,effort:x.effort||void 0,status:x.status||void 0,session_id:x.session_id||void 0}:{}})}function De(p,g){let x=a?a.get():null,U=x&&x.attempts?x.attempts[p]:null,_e=(U&&Array.isArray(U.delegation_sessions)?U.delegation_sessions:[]).find(Re=>Re&&typeof Re=="object"&&Re.launch_id===g);_e&&be.open({attempt_id:p,launch_id:g,meta:{runner:"codex",role:_e.role,model:_e.model,effort:_e.effort,session_id:_e.session_id,status:_e.status}})}async function rt(p){if(!s||!p)return;let g=await sn();if(g===null)return;let x=()=>{let Re=a?a.get():null;return Re&&typeof Re.revision=="number"?Re.revision:0},U=async(Re={},qe=x())=>await s("worker-attempt-resume",{attempt_id:p,expected_revision:qe,...g!==""?{instructions:g}:{},...Re}),ve=Re=>{Re?.queue&&a?.set&&a.set(Re.queue)},_e=await U();if(ve(_e),_e&&_e.conflict){let Re=_e.queue&&typeof _e.queue.revision=="number"?_e.queue.revision:x();_e=await U({},Re),ve(_e)}_e=await mr(_e,(Re,qe)=>U({continuation:Re,decision_token:qe}),{onResult:ve,refresh:()=>U()}),_e&&_e.resumed===!1&&!_e.conflict&&_e.reason&&se(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${_e.reason}`,"error",2400)}let de={onOpen:ee,onOpenDelegation:De,onResume:rt,onToggleUsage:H};function b(){let p=a?a.get():null,g={...D};for(let x of["orchestration_model","orchestration_effort","orchestration_speed"]){let U=p&&p[x];typeof U=="string"&&(g[x]=U)}return g}async function $(){if(s){try{let p=await Promise.resolve(s("get-session-defaults",{}));D=p&&p.values&&typeof p.values=="object"?p.values:{}}catch{D={}}Ne()}}function k(){let p=a?a.get():null;return p&&p.runner_catalog||null}function O(){let p=a?a.get():null;return p&&typeof p.execution_defaults=="object"?p.execution_defaults:null}function G(){let p=f?.metadata&&typeof f.metadata=="object"?f.metadata:{},x=nn({pin:{...p,..._},global:b(),execution_defaults:O(),runner_catalog:k(),route:typeof p.route=="string"?p.route:null}).orchestration_model.value||"";return la(k(),x)}function Z(){let p=i?i.get():null;return!p||typeof p.revision!="number"?null:{revision:p.revision,presets:Array.isArray(p.presets)?p.presets:[]}}function ne(p){return p?.compatible===!1}function ce(p){i&&p&&typeof p.revision=="number"&&Array.isArray(p.presets)&&i.set({revision:p.revision,presets:p.presets})}async function je(){let p=Z(),g=p?.presets.find(x=>x.id===h);if(!(!s||!d||!p||!g||ne(g)||C)){C=!0,A=[],Ne();try{let x=await Promise.resolve(s("apply-impl-preset",lc(d,g.id,p.revision)));if(x&&x.conflict){ce(x),se("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let U=x&&Array.isArray(x.issue)?x.issue[0]:x?.issue;if(x&&x.applied&&U&&typeof U=="object"){f=U,A=Array.isArray(x.skipped_orchestration_keys)?x.skipped_orchestration_keys.filter(ve=>typeof ve=="string"):[];for(let ve of dc)delete _[ve];se(A.length>0?"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4. \uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 3\uD0A4\uB294 Bead\uC5D0 \uD540\uD560 \uC218 \uC5C6\uC5B4 \uAC74\uB108\uB6F0\uC5C8\uC2B5\uB2C8\uB2E4.":"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",4e3);return}x&&x.error==="bd_readback_failed"?se("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):se("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(x){x&&typeof x=="object"&&x.code==="bd_readback_failed"?se("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):se("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{C=!1,Ne()}}}let me=null;r&&r.subscribe&&(me=r.subscribe(()=>ot()));let Se=null;a&&typeof a.subscribe=="function"&&(Se=a.subscribe(()=>{d&&Ne()}));let he=null;i&&typeof i.subscribe=="function"&&(he=i.subscribe(()=>{d&&Ne()}));function st(p){p.key==="Escape"&&d&&(p.preventDefault(),n())}document.addEventListener("keydown",st);function ot(){if(d){if(r&&typeof r.snapshotFor=="function"){let p=r.snapshotFor("detail:"+d)||[];f=p.find(x=>x&&x.id===d)||p[0]||f}Qe(),Ne()}}function j(p){Zt(p).then(g=>{g?se("\uBCF5\uC0AC\uB428","success",1200):se("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function J(p){p.preventDefault(),p.stopPropagation(),d&&j(d)}function pe(p,g){p.preventDefault(),p.stopPropagation(),j(g)}function v(p,g,x){p.preventDefault(),p.stopPropagation(),Ie.open(g,{missing_state:x})}function T(p,g){_[p]=g,Ne(),!(!s||!d)&&Promise.resolve(s("update-exec-settings",ic(d,p,g.length===0?null:g))).catch(()=>{se("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}function N(p,g){let x=f||{},U=x.metadata&&typeof x.metadata=="object"?x.metadata:{},ve={};for(let qe of["impl_runtime","impl_model","impl_effort"])ve[qe]=Object.hasOwn(_,qe)?_[qe]:typeof U[qe]=="string"?U[qe]:"";ve[p]=g;let _e=_c(ve,k(),G()),Re={};for(let qe of["impl_runtime","impl_model","impl_effort"])Re[qe]=_[qe],_[qe]=_e[qe]||"";Ne(),!(!s||!d)&&Promise.resolve(s("update-impl-target",{id:d,..._e,orchestration_runtime:G()})).then(qe=>{let _t=Array.isArray(qe)?qe[0]:qe;if(!_t||typeof _t!="object"||!_t.id)throw new Error("implementation target readback failed");f=_t;for(let ir of["impl_runtime","impl_model","impl_effort"])delete _[ir];Ne()}).catch(()=>{for(let qe of["impl_runtime","impl_model","impl_effort"])Re[qe]===void 0?delete _[qe]:_[qe]=Re[qe];Ne(),se("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error")})}async function X(p,g,x){if(!s||!d)return!1;try{let U=await Promise.resolve(s(p,g)),ve=Array.isArray(U)?U[0]:U;return ve&&typeof ve=="object"&&ve.id?(f=ve,!0):(se(x,"error"),!1)}catch{return se(x,"error"),!1}}function we(p){setTimeout(()=>{try{let g=e.querySelector(p);g&&typeof g.focus=="function"&&g.focus()}catch{}},0)}function Q(){V=!0,W=f&&f.title||"",Ne(),we('.detail-edit__input[data-edit="title"]')}function xe(p){W=p.target.value}function Le(){V=!1,W="",Ne()}function gt(){X("edit-text",{id:d,field:"title",value:W},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(g=>{g&&(V=!1,W=""),Ne()})}function ht(){Y=!0,R=f&&f.description||"",Ne(),we('.detail-edit__textarea[data-edit="description"]')}function Ze(p){R=p.target.value}function St(){Y=!1,R="",Ne()}function zt(){X("edit-text",{id:d,field:"description",value:R},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(g=>{g&&(Y=!1,R=""),Ne()})}function vt(p,g,x,U){if(p.key==="Escape"){p.stopPropagation(),x();return}p.key==="Enter"&&(!U||p.ctrlKey||p.metaKey)&&(p.preventDefault(),g())}function Ot(p){let g=p.target.value;X("update-status",{id:d,status:g},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>Ne())}function rr(p){let g=Number(p.target.value);X("update-priority",{id:d,priority:g},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>Ne())}function nr(p){S=p.target.value}function sr(){let p=S.trim();p.length!==0&&X("label-add",{id:d,label:p},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(g=>{g&&(S=""),Ne()})}function fr(p){if(p.key==="Escape"){p.stopPropagation(),S="",Ne();return}p.key==="Enter"&&(p.preventDefault(),sr())}function wt(p){X("label-remove",{id:d,label:p},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>Ne())}let Ht={onCopyPath:pe,onOpenDoc:v};function or(p){return typeof p=="string"?p:p&&typeof p=="object"?String(p.id||p.to||p.issue_id||p.depends_on||""):""}function ar(p){switch(p&&typeof p=="object"?String(p.dependency_type||p.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function Je(p){let x=(Array.isArray(p.dependencies)?p.dependencies:[]).map(U=>({id:or(U),icon:ar(U)})).filter(U=>U.id.length>0);return l`
      <div class="detail-section-label">의존성</div>
      ${x.length===0?l`<div class="detail-empty">의존성 없음</div>`:l`<div class="detail-deps">
            ${x.map(U=>o?l`<button
                    type="button"
                    class="detail-dep detail-dep--link"
                    @click=${()=>o(U.id)}
                  >
                    ${U.icon?`${U.icon} `:""}${U.id}
                  </button>`:l`<span class="detail-dep"
                    >${U.icon?`${U.icon} `:""}${U.id}</span
                  >`)}
          </div>`}
    `}function Pt(p){let g=p.metadata||{},x=p.workflow||{},U=x.stages||{},ve=U.spec&&U.spec.stale,_e=U.impl&&U.impl.stale,Re=U.plan||null,qe=x.route_source==="derived",_t=x.route||g.route||"\u2014";return l`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${qe?" detail-kv__v--derived":""}"
          title=${qe?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${qe?"unset":_t}</span
        >
      </div>
      ${x.route!=="quick_fix"||Object.hasOwn(g,"spec_review")?l`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${g.spec_review||"\uC5C6\uC74C"}${ve?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${x.route==="full_plan"?l`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${Re?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${Re?.approval_receipt||"\uC5C6\uC74C"}${Re?.approval_state==="stale"?" \xB7 stale":Re?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${x.route!=="quick_fix"||Object.hasOwn(g,"impl_review")?l`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${g.impl_review||"\uC5C6\uC74C"}${_e?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${x.planned_execution?l`<div class="detail-kv">
              <span class="detail-kv__k">planned_execution</span>
              <span class="detail-kv__v">${x.planned_execution.kind}</span>
            </div>
            ${x.planned_execution.kind==="main"?l`<div class="detail-kv">
                  <span class="detail-kv__k">planned_execution_reason</span>
                  <span class="detail-kv__v detail-kv__v--wrap"
                    >${x.planned_execution.reason}</span
                  >
                </div>`:""}`:""}
      ${x.exec_receipt?l`<div class="detail-kv">
            <span class="detail-kv__k">exec_receipt</span>
            <span class="detail-kv__v detail-kv__v--wrap"
              >${Br(x.exec_receipt)}</span
            >
          </div>`:""}
      ${x.impl_entry?l`<div class="detail-kv">
            <span class="detail-kv__k">impl_entry</span>
            <span class="detail-kv__v"
              >${`${x.impl_entry.actor}@${x.impl_entry.sha}`}</span
            >
          </div>`:""}
      ${g.pr_url?l`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${g.pr_url}</span>
          </div>`:""}
    `}let ye={route:["quick_fix","spec_backed","full_plan"]};async function c(p,g){let x=g.target.value;if(p==="route"&&f&&f.metadata&&f.metadata.route==="full_plan"&&x!=="full_plan"&&!window.confirm(`full_plan \u2192 ${x||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){Ne();return}await X("update-workflow-meta",{id:d,key:p,value:x},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),Ne()}function m(p){let g=p.metadata||{};return l` ${((U,ve)=>{let _e=ye[U],Re=typeof g[U]=="string"?g[U]:"";return l`<div class="detail-kv">
        <span class="detail-kv__k">${U}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${U}
          data-edit=${`wfmeta-${U}`}
          @change=${qe=>c(U,qe)}
        >
          <option value="" ?selected=${!_e.includes(Re)}>
            ${ve}
          </option>
          ${_e.map(qe=>l`<option value=${qe} ?selected=${Re===qe}>${qe}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function E(p,g){return V?l`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${W}
            @input=${xe}
            @keydown=${x=>vt(x,gt,Le,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${gt}
            >
              저장
            </button>
            <button
              type="button"
              class="detail-edit__cancel"
              data-edit="title-cancel"
              @click=${Le}
            >
              취소
            </button>
          </div>
        </div>
      `:l`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${p}</h2>
        ${xt(g).map(x=>l`<span class="detail-usage-total" title=${x.tooltip}
              >${x.label}</span
            >`)}
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${Q}
        >
          ✎
        </button>
      </div>
    `}function z(p){let g=kt(p.created_at),x=kt(p.updated_at);return!g&&!x?l``:l`
      ${g?l`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${g}</span>
          </div>`:""}
      ${x?l`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${x}</span>
          </div>`:""}
    `}function oe(p,g){return l`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${Ot}
        >
          ${P_.map(x=>l`<option value=${x} ?selected=${x===p}>${x}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${rr}
        >
          ${D_.map(x=>l`<option value=${String(x)} ?selected=${x===g}>
                P${x}
              </option>`)}
        </select>
      </div>
    `}function ke(p){return l`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${Y?"":l`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${ht}
            >
              ✎
            </button>`}
      </div>
      ${Y?l`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${R}
              @input=${Ze}
              @keydown=${g=>vt(g,zt,St,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${zt}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${St}
              >
                취소
              </button>
            </div>
          </div>`:l`<div class="detail-overlay__desc">
            ${p||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function fe(p){let g=typeof p.notes=="string"?p.notes:"";return g.trim().length===0?l``:l`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${g}</div>
    `}function Ke(p){let g=Array.isArray(p.labels)?p.labels:[];return l`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${g.map(x=>l`<span class="detail-label-chip"
              >${x}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${x}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+x}
                @click=${()=>wt(x)}
              >
                ×
              </button></span
            >`)}
        <span class="detail-label-add">
          <input
            class="detail-label-add__input"
            aria-label="라벨 추가"
            placeholder="라벨 추가"
            .value=${S}
            @input=${nr}
            @keydown=${fr}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${sr}
          >
            추가
          </button>
        </span>
      </div>
    `}function nt(){if(!d)return l``;let p=f||{},g=String(p.id||d),x=p.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",U=ct(),ve=p.status||"open",_e=typeof p.priority=="number"?Math.max(0,Math.min(4,p.priority)):"",Re=p.description||"",qe={...p,metadata:{...p.metadata||{},..._}};return l`
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
            @click=${J}
          >
            ${g}
          </button>
          ${E(x,U)}
          ${uc(qe)}
          ${cc({metadata:qe.metadata,workspace_values:b(),catalog:k(),execution_defaults:O(),expanded:I,presets:Z()?.presets||[],preset_id:h,preset_busy:C,skipped_orchestration_keys:A},{onToggle:_t=>{I=_t,Ne()},onEdit:(_t,ir)=>{if(_t==="impl_runtime"||_t==="impl_model"||_t==="impl_effort"){N(_t,ir??"");return}T(_t,ir??"")},onPresetSelect:_t=>{h=_t,A=[],Ne()},onPresetApply:()=>{je()}})}
          ${oe(ve,_e)} ${z(p)}
          ${ke(Re)}
          ${Xl(w,ie,{expanded:ge,draft:M,sending:L,error:le})}
          ${fe(p)} ${Ke(p)} ${Je(p)}
          ${Pt(p)} ${m(p)}
          ${Kl(p,Ht)}
          ${yc({expanded:We,loading:et,error:Te,data:tt},{onToggle:ze})}
          ${hc(Ce(),de,{total:U,expanded:Ye})}
        </div>
      </div>
    `}function Ne(){Ge(nt(),e)}return{load(p){p!==d&&(_={},h="",A=[],I=!1,P(),$e(),Oe()),d=p,f=null,ot(),$()},clear(){d=null,f=null,_={},h="",C=!1,A=[],I=!1,P(),$e(),Oe(),Ie.close(),be.close(),Ge(l``,e)},destroy(){me&&(me(),me=null),Se&&(Se(),Se=null),he&&(he(),he=null),document.removeEventListener("keydown",st),Ie.destroy(),Ae.parentNode&&Ae.parentNode.removeChild(Ae),be.destroy(),Ee.parentNode&&Ee.parentNode.removeChild(Ee),d=null,f=null,h="",C=!1,A=[],$e(),Oe(),Ge(l``,e)}}}function wc(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let r=t.querySelector("#fatal-error-title"),n=t.querySelector("#fatal-error-message"),s=t.querySelector("#fatal-error-detail"),o=t.querySelector("#fatal-error-reload"),a=t.querySelector("#fatal-error-close"),i=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},u=(d,f,_="")=>{r&&(r.textContent=d||"Unexpected Error"),n&&(n.textContent=f||"An unrecoverable error occurred.");let h=typeof _=="string"?_.trim():"";if(s&&(h.length>0?(s.textContent=h,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),a&&a.addEventListener("click",()=>i()),t.addEventListener("cancel",d=>{d.preventDefault(),i()}),{open:u,close:i,getElement(){return t}}}function Ys(e){return typeof e=="string"&&e.length>=7?e.slice(0,7):"\u2014"}function Zs(e){if(typeof e!="number"||!Number.isFinite(e)||e<0)return"\u2014";if(e<1e3)return`${Math.round(e)}ms`;let t=e/1e3;if(t<60)return`${t.toFixed(1)}\uCD08`;let r=Math.floor(t/60);if(r<60)return`${r}\uBD84 ${Math.round(t-r*60)}\uCD08`;let n=Math.floor(r/60),s=r%60;return`${n}\uC2DC\uAC04 ${s}\uBD84`}function kc(e,t){if(typeof e!="object"||e===null)return null;let r=0,n=!1;for(let s of Object.values(e)){if(typeof s!="object"||s===null)continue;let o=s;if(o.bead_id!==t)continue;let a=o.started_at,i=o.finished_at;typeof a!="number"||typeof i!="number"||!Number.isFinite(a)||!Number.isFinite(i)||i<a||(r+=i-a,n=!0)}return n?r:null}function Xs(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";let t=new Date(e);return`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`}function N_(e,t){let r=Array.isArray(e)?e:[],n=Array.isArray(t)?t:[];if(r.length===0&&n.length===0)return null;let s=null;for(let i of r)i.kind!=="deploy"||i.state!=="succeeded"||typeof i.target_sha!="string"||(!s||(typeof i.finished_at=="number"?i.finished_at:0)>(typeof s.finished_at=="number"?s.finished_at:0))&&(s=i);let o=r.filter(i=>i.state==="failed"&&!i.dismissed&&!i.superseded_by).length+n.length,a=r.some(i=>i.state==="repairing");return{deploy:s?{sha:Ys(s.target_sha),at:typeof s.finished_at=="number"?s.finished_at:null,elapsed_ms:typeof s.elapsed_ms=="number"?s.elapsed_ms:null}:null,unresolved:o,repairing:a,badge:o>0?{tone:"act",label:`\uD574\uACB0 \uD544\uC694 ${o}`}:a?{tone:"live",label:"\uC790\uB3D9 \uD574\uACB0 \uC911"}:{tone:"quiet",label:"\uBAA8\uB450 \uC815\uC0C1"}}}function $c(e,t){let r=N_(e,t);return r?l`<button
    type="button"
    class="worker-repo-strip"
    data-seam="repo-ops-strip"
    aria-label="저장소 작업 타임라인 열기"
  >
    <span class="worker-repo-strip__cue" aria-hidden="true">▸</span>
    <span class="worker-repo-strip__name">저장소 작업</span>
    ${r.deploy?l`<span class="worker-repo-strip__fact">
          배포
          <code class="worker-repo-strip__sha">${r.deploy.sha}</code>
          <span class="worker-repo-strip__ok">✓ 최신</span>
          <span
            class="worker-repo-strip__ago"
            title=${r.deploy.at?kt(r.deploy.at):""}
            >${Xs(r.deploy.at)}${r.deploy.elapsed_ms!==null?` \xB7 ${Zs(r.deploy.elapsed_ms)}`:""}</span
          >
        </span>`:""}
    <span class="worker-repo-strip__spacer"></span>
    <span
      class="worker-repo-strip__badge worker-repo-strip__badge--${r.badge.tone}"
      >${r.badge.label}</span
    >
  </button>`:""}function dn(e){let t=Nt(e.created_at),r=Nt(e.updated_at);return!t&&!r?"":l`<div class="worker-mini__meta">
    ${t?l`<span title=${`\uC0DD\uC131 ${kt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&r?l`<span>·</span>`:""}${r?l`<span title=${`\uC218\uC815 ${kt(e.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </div>`}function q_(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function Fn(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function Qs(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function pr(e,t,r={}){let s=Object.values(e&&typeof e=="object"?e:{}).filter(_=>_&&_.bead_id===t&&_.phase!=="done").sort((_,h)=>(_.requested_at||0)-(h.requested_at||0)).at(-1),o=typeof r.attempt_id=="string"&&r.attempt_id.length>0?r.attempt_id:typeof s?.attempt_id=="string"?s.attempt_id:null,a=r.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":r.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":r.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,i=typeof s?.last_error=="string"?s.last_error:null,u=s?q_(s.phase):null,d=s?.kind==="stale_work_backup_fresh",f=r.merged||s?.mode==="merged_revert"?"merged":"unmerged";return{action:!r.external&&!r.done,enabled:!a&&(!s||!!i),label:d?i?"\uBC31\uC5C5 \uC815\uB9AC \uC7AC\uC2DC\uB3C4":"\uBC31\uC5C5 \uD6C4 \uC0C8\uB85C \uC2DC\uC791":i?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:a||(i?d?`\uBC31\uC5C5 \uB4A4 \uC815\uB9AC \uC2E4\uD328: ${i} \u2014 \uC6D0\uBCF8\uACFC \uAC80\uC99D \uC601\uC218\uC99D\uC744 \uBCF4\uC874\uD55C \uCC44 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:`\uD3D0\uAE30 \uC2E4\uD328: ${i} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:s?`${u||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:f==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:o,operation:s||null,progress:u,error:i,confirmation:f}}function kr(e){let t=e.discard;if(!t||!t.operation)return"";let r=t.operation,n=r.kind==="stale_work_backup_fresh"&&!t.error?null:r.backup?.path,s=r.original_pr,o=r.revert_pr;return l`<div
    class="worker-discard-receipt"
    role=${t.error?"alert":"status"}
  >
    <span>${t.progress}</span>
    ${t.error?l`<span>폐기 실패: ${t.error}</span>`:""}
    <code>작업: ${r.operation_id}</code>
    ${n?l`<code>백업: ${n}</code>`:t.error?l`<span>아직 아무것도 삭제하지 않음</span>`:""}
    ${s?.url?l`<a href=${s.url} target="_blank" rel="noreferrer noopener"
          >원본 PR #${s.number||"?"}</a
        >`:""}
    ${o?.url?l`<a href=${o.url} target="_blank" rel="noreferrer noopener"
          >revert PR #${o.number||"?"} ·
          ${o.state||"\uC0C1\uD0DC \uBBF8\uD655\uC778"}</a
        >`:""}
  </div>`}var F_={dirty_unique:"\uCD5C\uC2E0 base\uC5D0 \uC5C6\uB294 \uB85C\uCEEC \uBCC0\uACBD\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",untracked_present:"\uCD94\uC801\uB418\uC9C0 \uC54A\uC740 \uD30C\uC77C\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",branch_ahead:"\uB85C\uCEEC branch\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",head_ahead:"worktree HEAD\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_not_contained:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 \uCD5C\uC2E0 base\uC5D0 \uD3EC\uD568\uB410\uC74C\uC744 \uC99D\uBA85\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ahead_merge_commit:"\uB85C\uCEEC branch\uC5D0 \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 merge commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_submodule_path:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 submodule \uACBD\uB85C\uB97C \uBCC0\uACBD\uD569\uB2C8\uB2E4",archive_failed:"\uACE0\uC720 commit \uBC31\uC5C5\uC744 \uC548\uC804\uD558\uAC8C \uAC80\uC99D\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ref_delete_failed:"\uD655\uC778\uB41C local branch\uB97C \uC548\uC804\uD558\uAC8C \uC0AD\uC81C\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",resume_available:"\uC774\uC5B4\uAC08 \uC218 \uC788\uB294 \uC774\uC804 Worker session\uC774 \uC788\uC2B5\uB2C8\uB2E4",observe_failed:"Git \uC0C1\uD0DC\uB97C \uC548\uC804\uD558\uAC8C \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",identity_changed:"\uD655\uC778 \uC911 worktree \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4",ownership_unknown:"Worker \uC18C\uC720 worktree\uC778\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"};function xc(e,t=!1){if(!e||typeof e!="object")return null;let r=e;if(r.reason!=="worktree_stale_work"||!r.stale_work||typeof r.stale_work!="object")return null;let n=r.stale_work,s=n.residue==="branch"?"branch":"worktree",o=n.state==="unique"?"unique":"unknown",a=n.summary&&typeof n.summary=="object"?n.summary:{};function i(d){return Number.isInteger(a[d])?Number(a[d]):0}let u=typeof n.cause=="string"?n.cause:"observe_failed";return{residue:s,state:o,title:s==="branch"?"\uC774\uC804 \uBE0C\uB79C\uCE58 \uBCF4\uC874\uB428":o==="unique"?"\uC774\uC804 \uC791\uC5C5 \uBCF4\uC874\uB428":"\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",cause:F_[u]||"\uC548\uC804\uD558\uAC8C \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 \uC774\uC804 \uC791\uC5C5\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",summary:s==="branch"?`\uACE0\uC720 commit ${i("branch_ahead")}`:[`staged ${i("staged_count")}`,`unstaged ${i("unstaged_count")}`,`untracked ${i("untracked_count")}`,`branch ahead ${i("branch_ahead")}`,`HEAD ahead ${i("head_ahead")}`].join(" \xB7 "),action_id:typeof n.action_id=="string"?n.action_id:"",can_resume:n.can_resume===!0,can_continue:n.can_continue===!0,can_backup_fresh:n.can_backup_fresh===!0,can_recheck:n.can_recheck===!0,locked:t}}function da(e){let t=e.draggable&&!e.done,r=Array.isArray(e.badges)?e.badges:[],n=xt(e.usage),s=Xt(e.usage),o=e.merge_step||null,a=e.lane==="pr_wait"||!!e.revise_action||!!e.stale_work,i=e.lane==="done"&&!a,u=i?Nt(e.done_at):"",d=t?l`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",f=typeof e.seq=="number"?l`<span class="worker-mini__seq" aria-hidden="true"
          >${e.seq}</span
        >`:"",_=e.worker_serial===!0?l`<span
          class="worker-mini__serial worker-mini__serial--legacy"
          title="legacy worker-serial 라벨 잔재 — 스케줄링에 사용되지 않습니다"
          >worker-serial</span
        >`:"",h=e.workspace_name?l`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",C=l`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,A=l`<span class="worker-mini__title">${e.title}</span>`,I=e.pr_url&&e.pr_number?l`<a
          class="worker-mini__pr"
          href=${e.pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="PR 열기"
          >#${e.pr_number} ↗</a
        >`:"",D=e.completion_repair_pr_url&&e.completion_repair_pr_number?l`<a
          class="worker-mini__pr worker-mini__repair-pr"
          href=${e.completion_repair_pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="repair PR 열기"
          >repair #${e.completion_repair_pr_number} ↗</a
        >`:"",V=r.map($e=>$e===e.live_badge?l`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${$e}</span
        >`:l`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${$e===e.completion_badge&&e.completion_title||""}
          >${$e}</span
        >`),Y=e.reason?l`<span class="worker-mini__reason">${e.reason}</span>`:"",W=n.length>0?n.map($e=>l`<span class="worker-usage" title=${$e.tooltip}
              >${$e.label}</span
            >`):s?l`<span class="worker-usage" title=${an(e.usage)}
            >${s}</span
          >`:"",R=o?l`<span
        class="merge-step${o.failed?" merge-step--failed":""}"
        style=${`--progress: ${o.percent}%`}
        >${o.label}${o.index>0?l`<span class="merge-step__n"
              >${o.index}/${o.total}</span
            >`:""}</span
      >`:"",S=e.merge_action?l`<button
        type="button"
        class="worker-mini__merge"
        data-bead-id=${e.id}
        ?disabled=${e.merge_enabled===!1}
        title=${e.merge_title||""}
      >
        ${e.merge_label||"\uBA38\uC9C0"}
      </button>`:"",P=e.cancel_action?l`<button
        type="button"
        class="worker-mini__merge-cancel"
        data-bead-id=${e.id}
        ?disabled=${e.cancel_enabled===!1}
        title=${e.cancel_title||""}
      >
        취소
      </button>`:"",w=e.timeline_action?l`<button
        type="button"
        class="worker-mini__timeline"
        data-bead-id=${e.id}
        title="저장소 작업이 끝나지 않아 머지 액션이 잠겼습니다 — 타임라인에서 원인과 해결 버튼을 볼 수 있습니다"
      >
        저장소 작업 보기
      </button>`:"",B=e.discard,te=B?.action||e.discard_action?l`<button
          type="button"
          class="worker-mini__discard"
          data-bead-id=${e.id}
          data-attempt-id=${B?.attempt_id||""}
          data-operation-id=${B?.operation?.operation_id||""}
          data-discard-mode=${B?.confirmation||"unmerged"}
          ?disabled=${B?!B.enabled:e.discard_enabled===!1}
          title=${B?B.title:e.discard_enabled===!1?e.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
        >
          ${B?.label||"\uD3D0\uAE30"}
        </button>`:"",le=e.stale_work||null,M=le?l`${le.can_resume||le.can_continue?l`<button
            type="button"
            class="worker-mini__stale-continue"
            data-bead-id=${e.id}
            data-action-id=${le.action_id}
            ?disabled=${le.locked}
          >
            기존 작업 이어가기
          </button>`:""}${le.can_backup_fresh?l`<button
            type="button"
            class="worker-mini__stale-backup"
            data-bead-id=${e.id}
            data-action-id=${le.action_id}
            ?disabled=${le.locked}
          >
            백업 후 새로 시작
          </button>`:""}${le.can_recheck?l`<button
            type="button"
            class="worker-mini__stale-recheck"
            data-bead-id=${e.id}
            data-action-id=${le.action_id}
            ?disabled=${le.locked}
          >
            다시 확인
          </button>`:""}`:"",L=le?l`<div class="worker-mini__stale">
        <strong>${le.title}</strong>
        <span>${le.summary}</span>
        <span>${le.cause}</span>
        ${le.can_backup_fresh?l`<small
              >Git-ignored dependency/build output은 archive에 포함되지
              않습니다</small
            >`:""}
      </div>`:"",ue=e.revise_action?l`<button
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
        </button>`:"",ge=!!(s||o||e.merge_action||e.cancel_action||e.timeline_action||e.discard_action||B?.operation||e.revise_action||le);return l`<div
    class="worker-mini${a?" worker-mini--card":""}${t?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${e.ghost?" worker-mini--ghost":""}${o?" worker-mini--merging":""}${o?.failed?" worker-mini--merge-failed":""}${e.external?" worker-mini--external":""}"
    style=${o?`--progress: ${o.percent}%`:""}
    draggable=${t?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${i?l`<div class="worker-mini__row1">${h}${C}${A}</div>
          <div class="worker-mini__row2">
            ${W}${u?l`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${kt(e.done_at)}`}
                  >완료 ${u}</span
                >`:""}${typeof e.work_ms=="number"?l`<span
                  class="worker-mini__work"
                  title="attempt 실행 시간 합산 (재개 세션 포함)"
                  >작업 ${Zs(e.work_ms)}</span
                >`:""}${V}${R}
            <span class="worker-mini__actions"
              >${S}${P}${w}${te}</span
            >
            ${dn(e)}
          </div>`:a?l`<div class="worker-mini__head">
              ${d}${f}${h}${C}${I}${D}${V}${_}${Y}
            </div>
            <div class="worker-mini__body">${A}${L}</div>
            ${ge?l`<div class="worker-mini__foot">
                  ${W}${R}
                  <span class="worker-mini__actions"
                    >${S}${P}${w}${te}${ue}${M}</span
                  >
                  ${kr(e)}
                </div>`:""}
            ${dn(e)}`:l`<div class="worker-mini__line">
              ${d}${f}${h}${C}${A}${I}${D}${V}${_}${Y}${W}${R}${S}${P}${w}${te}
            </div>
            ${kr(e)} ${dn(e)}`}
  </div>`}function j_(e,t=null){let r=e.draggable&&!e.done,n=r&&t&&t.bead_id===e.id,s=e.workflow,o=s&&s.chips||{},a=o.route||s&&s.route,i=o.route_source==="derived"||!!(s&&s.route_source==="derived"),u=typeof e.reason=="string"&&e.reason.split(" \xB7 ").includes("missing_description"),d=typeof e.reason=="string"&&e.reason.startsWith("\u26D4");return l`<div
    class="worker-card${r?"":" worker-card--static"}"
    draggable=${r?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    <div class="worker-card__head">
      ${r?l`<span class="worker-card__grip" aria-hidden="true">⠿</span>`:""}
      ${e.workspace_name?l`<span class="worker-card__repo" title=${e.root_dir||""}
            >${e.workspace_name}</span
          >`:""}
      <span class="worker-card__id" title="클릭하면 ID 복사">${e.id}</span>
      ${s&&a?l`<span
            class="ctl-chip ctl-chip--route${i?" is-derived":""}"
            title=${i?"route \uBBF8\uD540 (metadata unset)":"route"}
            >${i?"unset":a}</span
          >`:""}
    </div>
    <div class="worker-card__title">${e.title}</div>
    ${s?hs(s,e.status):""}
    <div
      class="worker-card__foot${e.reason?"":" worker-card__foot--actions-only"}"
    >
      ${n?l`<div class="worker-card__place-menu">
            ${t.lanes.map(f=>l`<button
                  type="button"
                  class="worker-card__place-lane"
                  data-bead-id=${e.id}
                  data-lane=${f.id}
                  title="${f.label} 대기 맨 뒤에 추가"
                >
                  <span>${f.label}</span>
                  <span class="worker-card__place-count">${f.count}</span>
                </button>`)}
            <button
              type="button"
              class="worker-card__place-cancel"
              data-bead-id=${e.id}
              title="레인 선택 취소"
              aria-label="레인 선택 취소"
            >
              ✕
            </button>
          </div>`:l`${e.reason?l`<span
                  class="worker-card__reason${d?" worker-card__reason--danger":""}"
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
              ?disabled=${!r}
              title=${r?"\uB300\uAE30 \uD050 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00":u?"description\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"spec\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}
            >
              대기로 ↴
            </button>`}
    </div>
    ${dn(e)}
  </div>`}function tr(e){let t=!!e.collapsible&&!!e.collapsed,r=l`<span
      class="worker-pane__dot worker-pane__dot--${e.lane}"
      aria-hidden="true"
    ></span>
    <span class="worker-pane__title">${e.title}</span>
    ${t&&e.preview?l`<span class="worker-pane__preview">${e.preview}</span>`:""}
    <span class="worker-pane__count">${e.items.length}</span>`;return l`<section
    class="worker-pane worker-pane--lane-${e.lane}${e.src?" worker-pane--src":""}${e.live?" worker-pane--live":""}${e.collapsible?" worker-pane--collapsible":""}${t?" worker-pane--collapsed":""}"
    id=${e.id}
    data-lane=${e.lane}
  >
    ${e.collapsible?l`<button
          type="button"
          class="worker-pane__hd worker-pane__hd--toggle"
          data-lane=${e.lane}
          aria-expanded=${t?"false":"true"}
        >
          ${r}
          <span class="worker-pane__caret" aria-hidden="true"
            >${t?"\u25B8":"\u25BE"}</span
          >
        </button>`:l`<header class="worker-pane__hd">
          ${r}${e.header_control?e.header_control:""}
        </header>`}
    ${t?"":l`${e.controls?e.controls:""}
          <div class="worker-pane__body">
            ${e.body?e.body:e.items.length===0?l`<div class="worker-pane__empty">
                    ${e.empty||""}
                  </div>`:e.items.map(n=>e.lane==="candidate"?j_(n,e.place_menu):da(n))}
          </div>`}
  </section>`}function pa(e,t){return`${e}\0${t}`}function fa(e){let t=new Map;for(let r of Array.isArray(e?.running)?e.running:[])t.set(r.id,{root_dir:r.root_dir,workspace_name:r.workspace_name,lane:"running",state:"running"});for(let r of Array.isArray(e?.pr_wait)?e.pr_wait:[])t.set(r.id,{root_dir:r.root_dir,workspace_name:r.workspace_name,lane:"pr_wait",state:"pr_wait"});for(let r of Array.isArray(e?.queue_groups)?e.queue_groups:[]){let n=Array.isArray(r.sublanes?.parallel)?r.sublanes.parallel:Array.isArray(r.items)?r.items:[];for(let s of n)t.set(s.id,{root_dir:s.root_dir,workspace_name:s.workspace_name,lane:"parallel",position:s.queue_position});for(let s of Array.isArray(r.sublanes?.serial)?r.sublanes.serial:[])for(let o of s.items)t.set(o.id,{root_dir:o.root_dir,workspace_name:o.workspace_name,lane:s.id,position:o.queue_position})}for(let r of Array.isArray(e?.runnable)?e.runnable:[])t.set(r.id,{root_dir:r.root_dir,workspace_name:r.workspace_name,lane:"runnable",state:"runnable"});for(let r of Array.isArray(e?.done)?e.done:[])t.set(r.id,{root_dir:r.root_dir,workspace_name:r.workspace_name,lane:"done",state:"done"});return t}function B_(e,t){let r=Array.isArray(t)?t:[],n=e.indexOf("-"),s=n>0?e.slice(0,n):e;return r.some(o=>typeof o?.issue_prefix=="string"&&o.issue_prefix===s)?"internal":r.length>0&&r.every(o=>typeof o?.issue_prefix=="string")?"external":"unknown"}function U_(e,t){return e==="internal"&&t===void 0}function Ac(e){if(e.state==="running")return"\uC2E4\uD589\uC911";if(e.state==="pr_wait")return"PR \uB300\uAE30";if(e.state==="runnable")return"\uC2E4\uD589\uAC00\uB2A5";if(e.state==="done")return"\uC644\uB8CC";let t=e.lane==="parallel"?"\uBCD1\uB82C":e.lane;return`${e.workspace_name} \xB7 ${t} #${e.position}`}function Sc(e,t,r,n){let s=r.get(e);if(!!(s&&t&&s.root_dir===t.root_dir&&s.lane===t.lane&&typeof s.position=="number"&&typeof t.position=="number"&&s.position<t.position))return{id:e,label:`\u{1F512} ${e} (\uAC19\uC740 \uB808\uC778 \uC55E)`,scope:null,same_lane_ahead:!0,missing_internal:!1};if(s)return{id:e,label:`\u{1F512} ${e} (${Ac(s)})`,scope:null,same_lane_ahead:!1,missing_internal:!1};let a=B_(e,n);return{id:e,label:`\u{1F512} ${e} (${a==="internal"?"\uBBF8\uC801\uC7AC":a==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778"})`,scope:a,same_lane_ahead:!1,missing_internal:U_(a,s)}}function Ec(e){let t=Array.isArray(e)?e:[],r=new Map,n=new Map,s=new Map;for(let i of t)for(let u of Array.isArray(i.sublanes?.serial)?i.sublanes.serial:[]){let d=pa(i.root_dir,u.id);r.set(d,{root_dir:i.root_dir,workspace_name:i.name,lane:u.id}),s.set(d,[]);for(let f of Array.isArray(u.items)?u.items:[])n.set(f.id,d)}for(let i of t)for(let u of Array.isArray(i.sublanes?.serial)?i.sublanes.serial:[]){let d=pa(i.root_dir,u.id),f=Array.isArray(u.items)?u.items[0]:null,h=!!f&&f.queue_index===0&&(!Array.isArray(u.occupied_by)||u.occupied_by.length===0)&&Array.isArray(f.blocked_by)?f.blocked_by:[],C=s.get(d);if(C)for(let A of h){let I=n.get(A);I&&I!==d&&!C.includes(I)&&C.push(I)}}let o=(i,u)=>{let d=new Set,f=[i];for(;f.length>0;){let _=f.pop();if(_===u)return!0;!_||d.has(_)||(d.add(_),f.push(...s.get(_)||[]))}return!1},a=new Map;for(let[i,u]of s){let d=[];for(let f of u){let _=r.get(f);o(f,i)&&_&&d.push(_)}d.length>0&&a.set(i,d)}return a}function Tc(e){let t=fa(e),r=new Map;for(let n of[...Array.isArray(e?.runnable)?e.runnable:[],...Array.isArray(e?.queue)?e.queue:[],...Array.isArray(e?.running)?e.running:[],...Array.isArray(e?.pr_wait)?e.pr_wait:[]])r.has(n.id)||r.set(n.id,n);return Array.from(r.values()).map(n=>({id:n.id,title:n.title,root_dir:n.root_dir,workspace_name:n.workspace_name,location:t.has(n.id)?(()=>{let s=t.get(n.id),o=Ac(s);return s.state?`${s.workspace_name} \xB7 ${o}`:o})():""}))}function Cc(e,t){return pa(e,t)}var Rc=[{step:"merge",label:"\uBA38\uC9C0",index:1},{step:"base",label:"base",index:2},{step:"verify",label:"\uAC80\uC99D",index:3},{step:"deploy",label:"\uBC30\uD3EC",index:4},{step:"child",label:"\uC790\uC2DD",index:5},{step:"branch",label:"\uBE0C\uB79C\uCE58",index:6},{step:"close",label:"close",index:7}],jn=[{step:"base_containment",label:"base \uD3EC\uD568 \uD655\uC778"},{step:"repo_operations",label:"\uC800\uC7A5\uC18C \uC791\uC5C5"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"}];function Js(e,t){let r=Rc.find(s=>s.step===e);if(!r)return null;let n=Rc.length;return{step:r.step,label:t,index:r.index,total:n,percent:Math.round(r.index/n*100)}}function Ic(e){let t=jn.findIndex(r=>r.step===e);return jn.map((r,n)=>({step:r.step,label:r.label,state:t<0?"todo":n<t?"done":n===t?"stall":"todo"}))}function Hr(e){let t=jn.find(r=>r.step===e);return t?t.label:typeof e=="string"?e:""}function W_(e){let t=jn.findIndex(r=>r.step===e);return t<0?null:{index:t+1,total:jn.length}}function eo(e){let t=W_(e);return t?`\uBA38\uC9C0 \uC644\uB8CC \xB7 \uC815\uB9AC ${t.total}\uB2E8\uACC4 \uC911 ${t.index}\uB2E8\uACC4\uC5D0\uC11C \uBA48\uCDA4`:"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644"}var ma=new Set(["queued","running","retry_pending","repairing"]),Lc=new Set(["failed","succeeded"]),z_={queued:"\uB300\uAE30",running:"\uC911",retry_pending:"\uC7AC\uC2DC\uB3C4 \uB300\uAE30",repairing:"\uC790\uB3D9 \uD574\uACB0 \uC911",failed:"\uC2E4\uD328",succeeded:"\uC644\uB8CC \xB7 \uC815\uB9AC \uC7AC\uAC1C \uB300\uAE30"},Bn={base_containment:{step:"base",label:"base \uD655\uC778 \uC911"},child_sweep:{step:"child",label:"\uC790\uC2DD \uC815\uB9AC \uC911"},branch_cleanup:{step:"branch",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC \uC911"},parent_close:{step:"close",label:"\uBD80\uBAA8 close \uC911"}},H_={merging:{step:"merge",label:"\uBA38\uC9C0 \uC911"},base_containment:Bn.base_containment,child_sweep:Bn.child_sweep,branch_cleanup:Bn.branch_cleanup,parent_close:Bn.parent_close};function G_(e){return typeof e=="string"&&/^[0-9a-f]{40}$/.test(e)}function V_(e,t,r){return!["verify","deploy"].includes(e.kind)||![...ma,...Lc].includes(e.state)||![null,void 0,""].includes(e.superseded_by)||!Array.isArray(e.subjects)?!1:e.subjects.some(n=>n&&typeof n=="object"&&n.bead_id===t&&n.merged_sha===r)}function K_(e,t){let r=(t.kind==="deploy"?2:1)-(e.kind==="deploy"?2:1);if(r!==0)return r;let n=d=>d.state==="succeeded"?1:2,s=n(t)-n(e);if(s!==0)return s;let o=typeof e.requested_at=="number"?e.requested_at:0,a=typeof t.requested_at=="number"?t.requested_at:0;if(o!==a)return a-o;let i=typeof e.operation_id=="string"?e.operation_id:"",u=typeof t.operation_id=="string"?t.operation_id:"";return i.localeCompare(u)}function _a(e,t=!1){let r=e.kind,n=r==="verify"?"\uAC80\uC99D":"\uBC30\uD3EC",s=t?"failed":e.state,o=z_[s];if(!o)return null;let a=Js(r,`${n} ${o}`);return a?{...a,active:ma.has(s),failed:s==="failed"}:null}function Y_(e){return!e||typeof e!="object"?null:H_[e.step]||null}function Un(e){if(!e||typeof e.bead_id!="string")return null;let t=e.bead_id,r=e.merge_progress&&typeof e.merge_progress=="object"?e.merge_progress:{},n=Y_(r),s=e.cleanup_failed&&typeof e.cleanup_failed=="object"?e.cleanup_failed:null,o=["child_sweep","branch_cleanup","parent_close"].includes(typeof e.cleanup_cursor=="string"?e.cleanup_cursor:""),a=!o&&(e.cleanup_cursor==="repo_operations"||r.step==="repo_operations"),i=G_(e.merge_sha)?e.merge_sha:null,u=!o&&i&&Array.isArray(e.repo_operations)?e.repo_operations.filter(A=>A&&typeof A=="object"&&V_(A,t,i)).sort(K_):[],d=a?u:[],f=d.find(A=>ma.has(A.state));if(f)return _a(f);if(s)return s.step==="repo_operations"&&u[0]?_a(u[0],!0):null;let _=d.find(A=>Lc.has(A.state)?A.state!=="succeeded"||e.cleanup_cursor==="repo_operations":!1);if(_)return _a(_);if(n){let A=Js(n.step,n.label);return A?{...A,active:!0,failed:!1}:null}let h=typeof e.cleanup_cursor=="string"?Bn[e.cleanup_cursor]:null;if(!h)return null;let C=Js(h.step,h.label);return C?{...C,active:!0,failed:!1}:null}function to(e){return!!e&&e.step!=="merge"&&e.failed!==!0}var Oc={verify_failed:"\uAC80\uC99D \uC2E4\uD328",verify_cmd_failed:"\uAC80\uC99D \uC2E4\uD328",verify_script_failure:"\uAC80\uC99D \uC2E4\uD328",deploy_failed:"\uBC30\uD3EC \uC2E4\uD328",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328",interrupted_without_terminal_exit:"\uC911\uB2E8\uB428"},Mc={repo_ops_worktree_unowned:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uAC00 \uC544\uC9C1 Worker \uC18C\uC720\uAC00 \uC544\uB2C8\uC5B4\uC11C \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804\uC5D0 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",verify_cmd_failed:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D \uBA85\uB839\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",gh_observation_failed:"GitHub\uC5D0\uC11C PR \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_script_failure:"\uAC80\uC99D \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",deploy_script_failure:"\uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",interrupted_without_terminal_exit:"\uC791\uC5C5\uC774 \uC885\uB8CC \uAE30\uB85D \uC5C6\uC774 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",base_unresolved:"PR\uC774 \uC5B4\uB290 base \uBE0C\uB79C\uCE58\uB85C \uBA38\uC9C0\uB418\uB294\uC9C0 \uD655\uC815\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ref_unobserved:"PR\uC758 base \uBE0C\uB79C\uCE58\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",merge_sha_unobserved:"\uBA38\uC9C0 \uCEE4\uBC0B SHA\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_fetch_failed:"\uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uB97C fetch\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_rev_unavailable:"fetch\uD55C \uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uC758 \uCEE4\uBC0B\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ff_diverged:"\uB85C\uCEEC base \uBE0C\uB79C\uCE58\uAC00 \uC6D0\uACA9\uACFC \uAC08\uB77C\uC838 fast-forward\uB85C \uC815\uB82C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",deployment_target_not_covering_merge:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",deployment_candidate_ancestry_check_failed:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uB294\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."};function Pc(e){return typeof e!="string"||e.length===0?[]:e.split(":").filter(t=>t.length>0)}function ga(e){for(let t of Pc(e))if(Object.hasOwn(Oc,t))return Oc[t];return null}function ba(e){let t=null;for(let r of Pc(e))Object.hasOwn(Mc,r)&&(t=Mc[r]);return t}function ro(e){let t=ga(e),r=ba(e);return t&&r?`${t} \u2014 ${r}`:t||r?t||r:typeof e=="string"?e:""}function Dc(e,t){let r=ga(e)??ga(t),n=ba(t)??ba(e);return r&&n?`${r} \u2014 ${n}`:r||n?r||n:typeof t=="string"?t:""}var Nc=160;function Z_(e){return e.length>Nc?`${e.slice(0,Nc)}\u2026`:e}function X_(e){return!e||!e.reason?"":l`<div class="worker-banner__detail">
    가드:
    ${e.reason}${e.command?l` · <code>${Z_(e.command)}</code>`:""}
  </div>`}function Q_(e){return e?l`<details class="worker-banner__raw">
    <summary>세부</summary>
    <dl class="worker-banner__kv">
      <div>
        <dt>실패 코드</dt>
        <dd>${e}</dd>
      </div>
    </dl>
  </details>`:""}function ha(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),r=Math.floor(t/60),n=t%60;return r>0?`${r}m ${String(n).padStart(2,"0")}s`:`${n}s`}function qc(e){let t=e.failure?ro(e.failure.reason):"";return l`<div class="worker-banners">
    ${e.failure?l`<div class="worker-banner worker-banner--failure" role="alert">
          ⛔ ${e.failure.repo||"repo"} 세션 실패 —
          ${t}${t&&!t.endsWith(".")?".":""}
          자동 진행을 껐습니다, 수동 ▶ 필요.
          ${e.failure.resume_attempt_id?l`<button
                type="button"
                class="worker-banner__resume"
                data-attempt-id=${e.failure.resume_attempt_id}
                ?disabled=${!e.failure.resume_eligible}
                title=${e.failure.resume_eligible?"\uCD5C\uADFC \uC2E4\uD328 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":e.failure.resume_reason||"\uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}
              >
                ↻ 이어하기
              </button>`:""}
          ${e.failure.discard?.action?l`<button
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
          ${e.failure.resume_attempt_id?l`<button
                type="button"
                class="worker-banner__dismiss"
                data-attempt-id=${e.failure.resume_attempt_id}
                title="실패 알림 닫기 — 레인에는 남습니다"
                aria-label="배너 닫기"
              >
                ✕
              </button>`:""}
          ${X_(e.failure.cause_detail)}
          ${Q_(e.failure.reason)}
          ${kr({discard:e.failure.discard})}
        </div>`:""}
  </div>`}function J_(e,t,r=null){let n=e.failed===!0,s=!!e.paused,o=n?e.status_label||(e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):s?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?ha(t-e.started_at):"\u2014",a=cr(e),i=Sr(e),u=xt(e.usage),d=Xt(e.usage),f=e.conflict_resolution?s?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,_=e.base_exception||null,h=e.landing,C=e.attempt_id&&e.attempt_id===r,A=e.discard?.action?l`<button
        type="button"
        class="rtile__discard"
        data-operation-id=${e.discard.operation?.operation_id||""}
        ?disabled=${!e.discard.enabled}
        title=${e.discard.title}
        aria-label=${e.discard.label}
      >
        ${e.discard.label}
      </button>`:"";return l`<div
    class="rtile${C?" rtile--sel":""}${s?" rtile--paused":""}${n?" rtile--failed":""}"
    data-bead-id=${e.bead_id}
    data-attempt-id=${e.attempt_id||""}
  >
    <div class="rtile__hd">
      <span class="rtile__dot" aria-hidden="true"></span>
      <span class="rtile__id" title="클릭하면 ID 복사">${e.bead_id}</span>
      ${i?l`<span class="rtile__resumed" title=${i}>↻</span>`:""}
      <span class="rtile__elapsed">${o}</span>
      ${n?l`<button
              type="button"
              class="rtile__resume"
              ?disabled=${e.resume_eligible===!1}
              title=${e.resume_eligible===!1?e.resume_reason||"\uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uAC19\uC740 \uC138\uC158\uC73C\uB85C \uC774\uC5B4\uC11C \uC9C4\uD589"}
              aria-label="이어하기"
            >
              ↻ 이어하기
            </button>
            ${A}
            <button
              type="button"
              class="rtile__dismiss"
              title="실패 알림 닫기 — 레인에는 남습니다"
              aria-label="실패 기록 닫기"
            >
              ✕
            </button>`:l`<button
              type="button"
              class="rtile__session"
              title="라이브 세션 열기"
              aria-label="라이브 세션 열기"
            >
              ▤ 세션
            </button>
            ${s?l`<button
                  type="button"
                  class="rtile__resume"
                  title="같은 세션으로 이어서 재개"
                  aria-label="재개"
                >
                  ▶
                </button>`:l`<button
                  type="button"
                  class="rtile__pause"
                  ?disabled=${e.can_pause===!1}
                  title=${e.can_pause===!1?"\uC138\uC158 ID \uAE30\uB85D \uC804 \u2014 \uC77C\uC2DC\uC815\uC9C0 \uBD88\uAC00":"\uC77C\uC2DC\uC815\uC9C0 (\uAC19\uC740 \uC138\uC158\uC73C\uB85C \uC7AC\uAC1C \uAC00\uB2A5)"}
                  aria-label="일시정지"
                >
                  ⏸
                </button>`}
            ${A}`}
    </div>
    <div class="rtile__title">${e.title}</div>
    ${e.current_child?l`<div class="rtile__child" title="현재 진행중 child">
          └ ${e.current_child}
        </div>`:""}
    ${h?l`<div class="rtile__landing">
          <span
            class="merge-step${h.failed?" merge-step--failed":""}"
            style=${`--progress: ${h.percent}%`}
            >${h.label}${h.index>0?l`<span class="merge-step__n"
                  >${h.index}/${h.total}</span
                >`:""}</span
          >
        </div>`:""}
    ${a||u.length>0||d||f||_?l`<div class="rtile__meta">
          ${f?l`<span class="worker-mini__badge">${f}</span>`:""}
          ${_?l`<span
                class="worker-mini__badge"
                title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
                >${_}</span
              >`:""}
          ${a?l`<span class="rtile__runner">${a}</span>`:""}
          ${u.length>0?u.map(I=>l`<span class="worker-usage" title=${I.tooltip}
                    >${I.label}</span
                  >`):d?l`<span
                  class="worker-usage"
                  title=${an(e.usage)}
                  >${d}</span
                >`:""}
        </div>`:""}
    ${dn(e)} ${kr(e)}
    <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일).
         quick_fix landing의 실제 진행은 위의 별도 진행 줄이 소유한다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
    ${n||s?"":l`<div class="rtile__accent" aria-hidden="true"></div>`}
  </div>`}function ya(e,t=Date.now(),r=null){let n=Array.isArray(e)?e:[];return l`<div class="worker-rungrid" id="worker-rungrid">
    ${n.length===0?l`<div class="worker-rungrid__empty">실행 세션 없음</div>`:n.map(s=>J_(s,t,r))}
  </div>`}function Gr(e){return l`<svg
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
  </svg>`}function va(){return Gr($r`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function wa(){return Gr($r`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function Fc(){return Gr($r`<rect x="4.3" y="4.3" width="7.4" height="7.4" rx="1.2" />`)}function jc(){return Gr($r`<path d="M4.4 4.4 11.6 11.6M11.6 4.4 4.4 11.6" />`)}function Bc(){return Gr($r`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function Uc(){return Gr($r`<rect x="2.6" y="2.6" width="7.4" height="7.4" rx="1.2" />
    <path d="M6 13.4h6a1.4 1.4 0 0 0 1.4-1.4V6" />`)}function Wc(){return Gr($r`<path d="M3 3.6 8.2 8 3 12.4z" />
    <path d="M8.8 3.6 14 8l-5.2 4.4z" />`)}var Wn=1,em=6e4,tm={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328"},rm=new Set(["auto_merge","merged","merge","done"]),zc={running:3,paused:2,failed:1};function nm(e,t){let r=null,n=-1/0;for(let s of Object.values(e)){if(!s||s.bead_id!==t||s.status==="running")continue;let o=typeof s.finished_at=="number"?s.finished_at:typeof s.started_at=="number"?s.started_at:0;o>=n&&(n=o,r=s)}return r}function sm(e,t){let r=Object.values(e||{}),n=new Set,s=new Map;for(let a of r)!a||typeof a.bead_id!="string"||(typeof a.resumed_from=="string"&&a.resumed_from.length>0&&n.add(a.resumed_from),s.set(a.bead_id,a.attempt_id));let o=new Map;for(let a of r){if(!a||typeof a.bead_id!="string"||a.bead_id.length===0)continue;let i=null;if(a.status==="running")i="running";else if(a.status==="paused"&&!n.has(a.attempt_id))i="paused";else if(a.status==="failed"||a.status==="orphaned"){let _=t.get(a.bead_id),h=typeof _=="number"&&_>0&&typeof a.finished_at=="number"&&_>=a.finished_at;s.get(a.bead_id)===a.attempt_id&&!h&&typeof a.dismissed_at!="number"&&(i="failed")}if(!i)continue;let u=typeof a.started_at=="number"?a.started_at:null,d=o.get(a.bead_id);if(d){let _=zc[d.run_state],h=zc[i];if(_>h||_===h&&(d.started_at??0)>(u??0))continue}let f=typeof a.session_id=="string"&&a.session_id.length>0;o.set(a.bead_id,{attempt_id:typeof a.attempt_id=="string"?a.attempt_id:"",run_state:i,started_at:u,last_event_at:typeof a.last_event_at=="number"?a.last_event_at:null,runner:typeof a.runner=="string"?a.runner:null,model:typeof a.model=="string"?a.model:null,effort:typeof a.effort=="string"?a.effort:null,speed:typeof a.speed=="string"?a.speed:null,resumed_from:typeof a.resumed_from=="string"?a.resumed_from:null,continuation_mode:a.continuation_mode==="session"||a.continuation_mode==="fresh"?a.continuation_mode:null,usage:Ut(e,a.bead_id),can_pause:i==="running"&&f,can_resume:i!=="running"&&f&&!n.has(a.attempt_id)})}return o}function Hc(e,t){let r=e[t];if(!r)return"";if(r.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let n=typeof r.reason=="string"?r.reason:"",s=n.indexOf(":");return s>0&&s<n.length-1?`\u26D4 ${n.slice(0,s)} (${n.slice(s+1)})`:`\u26D4 ${n}`}function At(e){return e&&typeof e=="object"?e:{}}function ka(e,t,r){let n=Array.isArray(e)?e:[],s=Array.isArray(t)?t:[],o=r&&typeof r.done_since=="number"?r.done_since:void 0,a=new Map;for(let w of s)w&&typeof w.root_dir=="string"&&a.set(w.root_dir,w);let i=[],u=[],d=[],f=[],_=[],h=[],C=new Map,A=new Map,I=new Map;for(let w of n){if(!w||typeof w.root_dir!="string")continue;let B=w.root_dir,te=w.name||B,le=a.get(B),M=le&&typeof le.revision=="number"?le.revision:typeof w.revision=="number"?w.revision:0,L=At(w.attempts),ue=At(w.bead_titles),ge=At(w.pr_observations),$e=At(w.admission),Be=At(w.revise_parked),Qe=At(w.merge_queue_state),Ve=At(w.cleanup_failed),Me=At(w.discard_operations),Ue=At(w.bead_blocked_by),ie=At(w.pr_activity),Ae=Array.isArray(w.repo_operations)?w.repo_operations:[],Ie=Array.isArray(w.merge_queue)?w.merge_queue:[],Ee=new Set(Ie.filter(H=>H&&typeof H.bead_id=="string").map(H=>H.bead_id)),be=new Map(Ie.filter(H=>H&&typeof H.bead_id=="string").map(H=>[H.bead_id,H])),We=Array.isArray(w.queue)?w.queue:[],et=(Array.isArray(w.serial_lanes)?w.serial_lanes:[]).filter(H=>H&&/^s[1-5]$/.test(H.id)&&Array.isArray(H.entries)),Te=At(w.lane_states),tt=typeof w.serial_lane_count=="number"?Math.max(0,Math.min(5,Math.floor(w.serial_lane_count))):Math.min(5,et.length);I.set(B,tt);let K=new Map(et.map(H=>[H.id,H])),F=new Map;for(let H of et)for(let ee of H.entries)ee&&typeof ee.bead_id=="string"&&F.set(ee.bead_id,H.id);let re=Array.isArray(w.done)?w.done:[];for(let H of re)H&&typeof H.bead_id=="string"&&h.push({id:H.bead_id,root_dir:B,workspace_name:te});let Oe=new Map;for(let H of re)H&&typeof H.bead_id=="string"&&typeof H.added_at=="number"&&Oe.set(H.bead_id,H.added_at);let Fe=H=>({id:H,title:ue[H]||H,root_dir:B,workspace_name:te,expected_revision:M,draggable:!1}),ze=new Set;for(let[H,ee]of sm(L,Oe))ze.add(H),u.push({...Fe(H),lane:"running",...F.has(H)?{serial_lane_id:F.get(H)}:{},attempt_id:ee.attempt_id,run_state:ee.run_state,can_pause:ee.can_pause,can_resume:ee.can_resume,started_at:ee.started_at,last_event_at:ee.last_event_at,runner:ee.runner,model:ee.model,effort:ee.effort,speed:ee.speed,resumed_from:ee.resumed_from,continuation_mode:ee.continuation_mode,usage:ee.usage,discard:pr(Me,H,{attempt_id:ee.attempt_id}),badges:ee.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:ee.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:[],alert:ee.run_state==="failed"});for(let H of Array.isArray(w.pr_wait)?w.pr_wait:[]){let ee=H&&H.bead_id;if(typeof ee!="string"||ze.has(ee))continue;ze.add(ee);let De=At(ge[ee]),rt=At(De.pr),de=De.gate?At(De.gate):null,b=Ee.has(ee),$=be.get(ee)?.continuation_action||null,k=!!$&&$.continuation===null,O=Qe.active===ee,G=H.external===!0,Z=Ve[ee]||null,ne=At(ie[ee]),ce=Un({bead_id:ee,merge_sha:H.merge_sha,cleanup_cursor:H.cleanup_cursor,merge_progress:ne.merge_progress||null,cleanup_failed:Z,repo_operations:Ae}),je=to(ce),me=!!de&&de.base_badge==="\uCDA9\uB3CC",Se=!!Z&&["child_sweep","branch_cleanup","parent_close"].includes(Z.step)&&!!de&&de.tier==="merged",he=G&&!!Z&&!!de&&de.tier==="merged",st=!!de&&["closed_unmerged","review","undecidable"].includes(de.tier),ot=pr(Me,ee,{external:G,merge_active:O||ce?.step==="merge",merge_queued:b,cleanup_active:je,merged:!!Z||de?.tier==="merged"}),j=!!ot.operation;d.push({...Fe(ee),lane:"pr_wait",pr_number:typeof rt.number=="number"?rt.number:null,pr_url:typeof rt.url=="string"?rt.url:void 0,external:G,usage:Ut(L,ee),merge_step:ce,badges:k?["\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"]:ce?[de?.tier==="merged"?"\uBA38\uC9C0\uB428":"\uBA38\uC9C0 \uC911"]:Z?[Hr(Z.step)?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${Hr(Z.step)}`:"\uC815\uB9AC \uBA48\uCDA4"]:typeof de?.gate_badge=="string"&&de.gate_badge.length>0?[de.gate_badge]:[],alert:ce?ce.failed===!0:!!Z||st,reason:Z&&ce?.active!==!0?eo(Z.step):"PR \uB300\uAE30",merge_action:de?.tier==="merged"&&!Se&&!he?!1:!b||k,merge_enabled:!j&&(k||de?.enabled===!0||me||Se||he),merge_label:k?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":he||Se?"\uC815\uB9AC \uC7AC\uAC1C":me&&!Se?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:k?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":j?ot.error?`\uD3D0\uAE30 \uC2E4\uD328: ${ot.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${ot.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:he?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Se?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":me?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":de?.enabled===!0?`\uBA38\uC9C0 (${de.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${de?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:b&&!k,cancel_enabled:!O,continuation_mismatch:$?.mismatch||null,discard:ot,discard_action:ot.action,discard_enabled:ot.enabled,discard_title:ot.title})}let Ce=(H,ee,De,rt)=>{let de=H&&H.bead_id;if(typeof de!="string"||ze.has(de))return null;ze.add(de);let b=Be[de],$=pr(Me,de),k=$.operation?$:null,O={...Fe(de),lane:ee,draggable:!k,discard:k||void 0,reason:Hc($e,de),queue_position:De+1,queue_index:De,queue_length:rt,badges:b?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!b,revise_action:!!b,revise_enabled:!!b&&!k,revise_title:b?b.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${b.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""};return Object.hasOwn(Ue,de)&&(O.blocked_by=Array.isArray(Ue[de])?Ue[de].filter(G=>typeof G=="string"&&G.length>0):[]),O};for(let H=0;H<We.length;H++){let ee=Ce(We[H],"queue",H,We.length);if(!ee)continue;f.push(ee);let De=C.get(B);De?De.push(ee):C.set(B,[ee])}let ct=[];for(let H=0;H<et.length;H++){let ee=et[H],De=[];for(let de=0;de<ee.entries.length;de++){let b=Ce(ee.entries[de],ee.id,de,ee.entries.length);b&&(De.push(b),f.push(b))}if(De.length===0)continue;let rt=At(Te[ee.id]);ct.push({id:ee.id,index:H,items:De,occupied_by:Array.isArray(rt.occupied_by)?rt.occupied_by.filter(de=>typeof de=="string"):[],corrections:Array.isArray(rt.corrections)?rt.corrections.length:0,cycle:rt.cycle===!0})}A.set(B,ct);let Ye=Array.from({length:tt},(H,ee)=>{let De=`s${ee+1}`,rt=K.get(De),de=rt&&Array.isArray(rt.entries)?rt.entries:[],b=At(Te[De]);return{id:De,index:de.length,length:de.length,occupied_by:Array.isArray(b.occupied_by)?b.occupied_by.filter($=>typeof $=="string"):[]}});for(let H of Array.isArray(w.runnable)?w.runnable:[]){let ee=H&&H.bead_id;typeof ee!="string"||ze.has(ee)||(ze.add(ee),i.push({...Fe(ee),title:H.title||ue[ee]||ee,lane:"runnable",draggable:!0,reason:Hc($e,ee),created_at:H.created_at??void 0,updated_at:H.updated_at??void 0,labels:Array.isArray(H.labels)?H.labels:[],spec_reviewer:typeof H.spec_reviewer=="string"?H.spec_reviewer:void 0,plan_state:H.plan_state==="approved"||H.plan_state==="authored"?H.plan_state:"none",workflow:H.route?{route:H.route,chips:{route:H.route}}:null,blocked:H.blocked===!0,...Array.isArray(H.blocked_by)?{blocked_by:H.blocked_by.filter(De=>typeof De=="string"&&De.length>0)}:{},place_index:We.length,place_lanes:Ye}))}for(let H of re){let ee=H&&H.bead_id;if(typeof ee!="string"||ze.has(ee)||(ze.add(ee),o!==void 0&&typeof H.added_at=="number"&&H.added_at<o))continue;let De=nm(L,ee);_.push({...Fe(ee),lane:"done",done:!0,usage:Ut(L,ee),done_at:typeof H.added_at=="number"?H.added_at:void 0,done_kind:De&&typeof De.done_kind=="string"?De.done_kind:null})}}let D=new Map;s.forEach((w,B)=>{w&&typeof w.root_dir=="string"&&D.set(w.root_dir,B)});let V=r&&r.running_sort==="repo"?"repo":"started";u.sort((w,B)=>{if(V==="repo"){let M=D.get(w.root_dir)??Number.MAX_SAFE_INTEGER,L=D.get(B.root_dir)??Number.MAX_SAFE_INTEGER;if(M!==L)return M-L}let te=typeof w.started_at=="number"&&Number.isFinite(w.started_at)?w.started_at:null,le=typeof B.started_at=="number"&&Number.isFinite(B.started_at)?B.started_at:null;return te!==null&&le!==null&&te!==le?te-le:te===null&&le!==null?1:te!==null&&le===null?-1:w.id.localeCompare(B.id)}),_.sort((w,B)=>(B.done_at??0)-(w.done_at??0));let Y=s.length>0?s:n.map(w=>({root_dir:w&&w.root_dir,name:w&&w.name,auto_advance:w&&w.auto_advance,auto_merge:w&&w.auto_merge,slots:w&&w.slots,revision:w&&w.revision,runner_catalog:w&&w.runner_catalog})),W=[];for(let w of Y){if(!w||typeof w.root_dir!="string")continue;let B=C.get(w.root_dir)||[],te=A.get(w.root_dir)||[];W.push({root_dir:w.root_dir,name:w.name||w.root_dir,auto_advance:w.auto_advance===!0,auto_merge:w.auto_merge===!0,slots:typeof w.slots=="number"&&w.slots>=Wn?w.slots:Wn,revision:typeof w.revision=="number"?w.revision:0,runner_catalog:At(w.runner_catalog),items:B,sublanes:{parallel:B,serial:te},serial_lane_count:I.get(w.root_dir)||0})}let R={runnable:i,queue:f,queue_groups:W,running:u,pr_wait:d,done:_,automation:{total:W.length,both_on:W.filter(w=>w.auto_advance&&w.auto_merge).length}},S=fa(R);for(let w of h)S.has(w.id)||S.set(w.id,{root_dir:w.root_dir,workspace_name:w.workspace_name,lane:"done",state:"done"});for(let w of[...R.queue,...R.runnable]){if(!Object.hasOwn(w,"blocked_by"))continue;let B=S.get(w.id);w.blockers=(w.blocked_by||[]).map(te=>Sc(te,B,S,s)),w.blocker_warnings=w.blockers.filter(te=>te.missing_internal).map(te=>`\u26A0 \uC120\uD589 ${te.id}\uAC00 \uC5B4\uB290 \uB808\uC778\uC5D0\uB3C4 \uC5C6\uACE0 \uC2E4\uD589 \uC911\uB3C4 \uC544\uB2D8 \u2014 \uC218\uB3D9 \uAC1C\uC785 \uC804\uAE4C\uC9C0 \uC774 \uC790\uB9AC\uC5D0\uC11C \uC815\uC9C0`),w.blocker_warnings.length>0&&(w.alert=!0)}let P=Ec(R.queue_groups);for(let w of R.queue_groups)for(let B of w.sublanes.serial){let te=P.get(Cc(w.root_dir,B.id));te&&(B.cross_wait_peers=te)}return R}function om(e,t){if(typeof e!="number"||!Number.isFinite(e))return"";let n=t-e<em;return l`<span
    class="mon-beat${n?" mon-beat--live":""}"
    title=${`\uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${kt(e)}`}
    ><span class="mon-beat__dot" aria-hidden="true"></span>${n?"":l`<span class="mon-beat__age"
          >${Nt(e,t)}</span
        >`}</span
  >`}function zn(e){return l`<div class="mon-c__title">${e.title}</div>`}function Hn(e){return l`<span class="mon-c__id" title="클릭하면 상세로 이동"
    >${e.id}</span
  >`}function no(e){return e.workspace_name?l`<span class="mon-c__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:""}function $a(e){let t=xt(e.usage),r=Xt(e.usage);return t.length>0?t.map(n=>l`<span class="mon-c__usage" title=${n.tooltip}
          >${n.label}</span
        >`):r?l`<span class="mon-c__usage" title=${an(e.usage)}
        >${r}</span
      >`:""}function xa(e){return(Array.isArray(e.badges)?e.badges:[]).map(r=>l`<span class="mon-c__badge${e.alert?" mon-c__badge--alert":""}"
        >${r}</span
      >`)}function am(e){return l`<span class="mon-c__ops">
    ${e.run_state==="running"?l`<button
          type="button"
          class="mon-op mon-op--pause"
          ?disabled=${e.can_pause===!1}
          aria-label="일시정지"
          title="일시정지 — 세션을 끊고 이어하기 가능 상태로 둡니다"
        >
          ${wa()}
        </button>`:l`<button
          type="button"
          class="mon-op mon-op--resume"
          ?disabled=${e.can_resume===!1}
          aria-label="이어하기"
          title="이어하기"
        >
          ${va()}
        </button>`}
    ${e.discard?.action?l`<button
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
    ${e.run_state==="failed"?l`<button
          type="button"
          class="mon-op mon-op--dismiss"
          aria-label="실패 기록 닫기"
          title="실패 기록 닫기"
        >
          ${jc()}
        </button>`:""}
  </span>`}function Gc(e){if(!Object.hasOwn(e,"blocked_by"))return"";let t=Array.isArray(e.blockers)?e.blockers:[];return t.length===0?e.blocked?l`<span class="mon-blocker">🔒 blocked</span>`:"":t.map(r=>l`<span
        class="mon-blocker${r.same_lane_ahead?" mon-blocker--normal":""}"
      >
        <span>${r.label}</span>
        <button
          type="button"
          class="mon-blocker__remove"
          data-blocker-id=${r.id}
          aria-label=${`\uC120\uD589 ${r.id} \uC5F0\uACB0 \uD574\uC81C`}
          title="직렬 연결 해제"
        >
          ✕
        </button>
      </span>`)}function Vc(e){let t=Array.isArray(e.blocker_warnings)?e.blocker_warnings:[];return t.length>0?l`<div class="mon-blocker-warnings">
        ${t.map(r=>l`<div class="mon-blocker-warning">${r}</div>`)}
      </div>`:""}function Kc(){return l`<span class="mon-link mon-popover-owner">
    <button
      type="button"
      class="mon-link__trigger"
      aria-haspopup="dialog"
      aria-expanded="false"
      title="직렬로 연결"
    >
      🔗
    </button>
    <span class="mon-link__popover mon-card-popover" role="dialog" hidden>
      <input
        type="search"
        class="mon-link__search"
        placeholder="id·제목·위치 검색"
        aria-label="직렬로 연결할 버드 검색"
        autocomplete="off"
      />
      <span class="mon-link__list"></span>
      <button type="button" class="mon-link__direct" hidden></button>
      <span class="mon-link__empty" hidden>검색 결과 없음</span>
      <span class="mon-link__error" role="alert" hidden></span>
    </span>
  </span>`}function im(e,t){let r=typeof e.started_at=="number"?ha(t-e.started_at):"";return l`${zn(e)}
    <div class="mon-c__meta">
      ${xa(e)}${om(e.last_event_at,t)}${Hn(e)}${no(e)}
      ${cr(e)?l`<span class="mon-c__model">${cr(e)}</span>`:""}
      ${Sr(e)?l`<span
            class="rtile__resumed"
            title=${Sr(e)}
            >↻</span
          >`:""}
      ${e.serial_lane_id?l`<span class="mon-c__lane">${e.serial_lane_id}</span>`:""}
      ${r?l`<span class="mon-live__elapsed">${r}</span>`:""}
      ${$a(e)}${am(e)}${kr(e)}
    </div>`}function lm(e){let t=e.workflow,n=(t&&t.chips||{}).route||t&&t.route,s=typeof e.spec_reviewer=="string"?e.spec_reviewer:"",o=e.plan_state==="approved"?"plan \u2713":e.plan_state==="authored"?"plan \u270E":"plan \u2013",a=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),i=Nt(e.updated_at);return l`${zn(e)}
    <div class="mon-c__meta">
      <span class="mon-c__grip" aria-hidden="true">⠿</span>${Hn(e)}
      ${n?l`<span class="ctl-chip ctl-chip--route">${n}</span>`:""}
      ${s?l`<span
            class="ctl-chip mon-c__review${s==="skipped"?" mon-c__review--dim":""}"
            >spec:${s}</span
          >`:""}
      ${n==="full_plan"?l`<span
            class="ctl-chip mon-c__plan${e.plan_state==="none"?" mon-c__review--dim":""}"
            >${o}</span
          >`:""}
      ${bs(e.labels,null).map(u=>l`<span class="ctl-chip ctl-chip--label">${u}</span>`)}
      ${no(e)}
      ${i?l`<span title=${`\uC218\uC815 ${kt(e.updated_at)}`}
            >수정 ${i}</span
          >`:""}
      ${e.reason?l`<span
            class="mon-c__reason${a?" mon-c__reason--danger":""}"
            >${e.reason}</span
          >`:""}
      ${Gc(e)}
      <span class="mon-c__ops">
        ${Kc()}
        <span class="mon-place mon-popover-owner">
          <button
            type="button"
            class="worker-card__place"
            data-bead-id=${e.id}
            aria-haspopup="menu"
            aria-expanded="false"
            title="적재할 대기 레인 선택"
          >
            대기로 ↴
          </button>
          <span class="mon-place__popover mon-card-popover" role="menu" hidden>
            <button
              type="button"
              class="mon-place__choice"
              data-lane="parallel"
              data-place-index=${String(e.place_index??0)}
              role="menuitem"
              aria-label=${`\uBCD1\uB82C \xB7 \uB300\uAE30 ${e.place_index??0}`}
            >
              <strong>병렬</strong><span>대기 ${e.place_index??0}</span>
            </button>
            ${(e.place_lanes||[]).map(u=>l`<button
                  type="button"
                  class="mon-place__choice"
                  data-lane=${u.id}
                  data-place-index=${String(u.index)}
                  role="menuitem"
                  aria-label=${`${u.id} \xB7 ${u.occupied_by.length>0?`\uC810\uC720 ${u.occupied_by.join(", ")}`:"\uBBF8\uC810\uC720"} \xB7 \uB300\uAE30 ${u.length}`}
                >
                  <strong>${u.id}</strong
                  ><span
                    >${u.occupied_by.length>0?`\uC810\uC720 ${u.occupied_by.join(", ")}`:"\uBBF8\uC810\uC720"}
                    · 대기 ${u.length}</span
                  >
                </button>`)}
          </span>
        </span>
      </span>
    </div>
    ${Vc(e)}`}function cm(e){let t=!!e.discard?.operation;return l`${zn(e)}
    <div class="mon-c__meta">
      <span class="mon-c__grip" aria-hidden="true">⠿</span>
      <span class="mon-live__pos">#${e.queue_position}</span>${Hn(e)}
      ${xa(e)}
      ${e.reason?l`<span class="mon-c__reason">${e.reason}</span>`:""}
      ${Gc(e)}
      <span class="mon-c__ops">
        ${Kc()}
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
        ${t?l`<button
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
    ${Vc(e)} ${kr(e)}
    ${e.revise_action?l`<div class="mon-c__tail">
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
        </div>`:""}`}function um(e){let t=e.merge_step||null,r=!!(Xt(e.usage)||t||e.merge_action||e.cancel_action||e.discard_action);return l`${zn(e)}
    <div class="mon-c__meta">
      ${Hn(e)}${no(e)}
      ${e.pr_url&&e.pr_number?l`<a
            class="mon-c__pr"
            href=${e.pr_url}
            target="_blank"
            rel="noreferrer noopener"
            title="PR 열기"
            >#${e.pr_number} ↗</a
          >`:""}
      ${xa(e)}
      ${e.reason?l`<span class="mon-c__reason">${e.reason}</span>`:""}
    </div>
    ${r?l`<div class="mon-c__tail">
          ${$a(e)}${t?l`<span
                class="merge-step${t.failed?" merge-step--failed":""}"
                style=${`--progress: ${t.percent}%`}
                >${t.label}${t.index>0?l`<span class="merge-step__n"
                      >${t.index}/${t.total}</span
                    >`:""}</span
              >`:""}
          ${e.merge_action?l`<button
                type="button"
                class="worker-mini__merge"
                data-bead-id=${e.id}
                ?disabled=${e.merge_enabled===!1}
                title=${e.merge_title||""}
              >
                ${e.merge_label||"\uBA38\uC9C0"}
              </button>`:""}
          ${e.cancel_action?l`<button
                type="button"
                class="worker-mini__merge-cancel"
                data-bead-id=${e.id}
                ?disabled=${e.cancel_enabled===!1}
                title=${e.cancel_title||""}
              >
                취소
              </button>`:""}
          ${e.discard_action?l`<button
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
          ${kr(e)}
        </div>`:""}`}function dm(e,t){let r=e.done_kind||"",n=r?tm[r]||r:"",s=Nt(e.done_at,t);return l`${zn(e)}
    <div class="mon-c__meta">
      ${Hn(e)}${no(e)}
      ${n?l`<span
            class="mon-live__kind${rm.has(r)?" mon-live__kind--ok":" mon-live__kind--warn"}"
            >${n}</span
          >`:""}
      ${$a(e)}
      ${s?l`<span title=${`\uC644\uB8CC ${kt(e.done_at)}`}
            >완료 ${s}</span
          >`:""}
    </div>`}function Yc(e,t){return e.lane==="running"?im(e,t):e.lane==="runnable"?lm(e):e.lane==="queue"||/^s[1-5]$/.test(e.lane)?cm(e):e.lane==="pr_wait"?um(e):dm(e,t)}function Zc(e){let t=String(e.revision),r=e.sublanes?e.sublanes.parallel.length+e.sublanes.serial.reduce((n,s)=>n+s.items.length,0):e.items.length;return l`<header
    class="mon-group__hd${r===0?" is-empty":""}"
    data-root-dir=${e.root_dir}
    data-revision=${t}
  >
    <span class="mon-group__name" title=${e.root_dir}>${e.name}</span>
    <span class="mon-group__count">${r}</span>
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
        ${e.auto_advance?wa():va()}
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
        ${Bc()}
        <span class="mon-ctl__label">머지</span>
      </button>
      <label class="mon-ctl mon-ctl--slots" title="동시에 실행할 세션 수">
        ${Uc()}
        <span class="mon-ctl__label">슬롯</span>
        <input
          type="number"
          class="mon-slots__input"
          min=${Wn}
          step="1"
          data-root-dir=${e.root_dir}
          data-revision=${t}
          aria-label=${`${e.name} \uB3D9\uC2DC \uC2E4\uD589 \uC2AC\uB86F`}
          .value=${String(e.slots)}
        />
      </label>
    </span>
  </header>`}function Xc(e){let{total:t,both_on:r}=e.automation,n=t>0&&r===t,s=e.running_sort==="repo"?"repo":"started",o=lr.find(i=>i.value===e.done_range)?.label||"",a=Array.isArray(e.token_total)?e.token_total:e.token_total?[{label:e.token_total,tooltip:e.token_tooltip}]:[];return l`<div class="mon-top">
    <button
      type="button"
      class="mon-auto-all${n?" is-active":""}"
      data-on=${n?"false":"true"}
      aria-pressed=${n?"true":"false"}
      ?disabled=${t===0}
      title=${n?"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uB055\uB2C8\uB2E4 (\uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4)":"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uCF2D\uB2C8\uB2E4"}
    >
      ${n?Fc():Wc()}
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
        ${lr.map(i=>l`<option
              value=${i.value}
              ?selected=${e.done_range===i.value}
            >
              ${i.label}
            </option>`)}
      </select>
      ${a.map(i=>l`<span
            class="mon-kpi__chip mon-kpi__chip--tokens"
            title=${i.tooltip}
            >${o} 완료 · 누적 ${i.label}</span
          >`)}
    </div>
  </div>`}function Qc(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function Jc(e){let t=(Array.isArray(e)?e:[]).map(i=>i&&i.usage).filter(i=>i&&typeof i=="object"&&"providers"in i);if(t.length>0)return xt(xs(t));let r={};for(let i of gr)r[i]=0;let n=!1,s=0,o=0,a=0;for(let i of Array.isArray(e)?e:[]){let u=i&&i.usage;if(u&&typeof u=="object"){let d=!1;for(let f of gr){let _=u[f];typeof _=="number"&&Number.isFinite(_)&&(r[f]+=_,n=!0,d=!0)}if(d){o+=1;let f=u.total_cost_usd;typeof f=="number"&&Number.isFinite(f)&&(s+=f,a+=1)}}}return o>0&&a===o&&(r.total_cost_usd=s),n?Xt(r):null}var eu="bdui.monitor.done-range",tu="bdui.monitor.running_sort",ru="beads-ui.monitor.candidate-filter",Aa={show_blocked:!1};function pm(){try{let e=window.localStorage.getItem(ru);if(!e)return{...Aa};let t=JSON.parse(e);return!t||typeof t!="object"?{...Aa}:{show_blocked:t.show_blocked===!0}}catch{return{...Aa}}}function fm(e){try{window.localStorage.setItem(ru,JSON.stringify({show_blocked:e.show_blocked}))}catch{}}function _m(e,t){if(t.show_blocked)return{visible:e,hidden_blocked:0};let r=e.filter(n=>n.blocked!==!0);return{visible:r,hidden_blocked:e.length-r.length}}function mm(){try{let e=window.localStorage.getItem(eu);return Bt(e)?e:Dt}catch{return Dt}}function gm(e){try{window.localStorage.setItem(eu,e)}catch{}}function bm(){try{return window.localStorage.getItem(tu)==="repo"?"repo":"started"}catch{return"started"}}function hm(e){try{window.localStorage.setItem(tu,e)}catch{}}var nu="tab:monitor:pipeline",ym=1e3,vm=[{lane:"runnable",pane:"candidate",title:"\uC2E4\uD589\uAC00\uB2A5",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589\uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}];function so(e,t){let r=(e.lane==="runnable"||e.lane==="queue")&&e.draggable!==!1;return l`<div
    class="mon-card mon-card--${e.lane}${e.alert?" mon-card--alert":""}${e.blocked?" mon-card--blocked":""}"
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
    ${Yc(e,t)}
  </div>`}function wm(e,t){let r=e.serial_lane_count>0||e.sublanes.serial.length>0,n=r?l`<section class="mon-sublane mon-sublane--parallel">
        <header class="mon-sublane__hd">
          <span class="mon-sublane__name">병렬</span>
          <span class="mon-sublane__count"
            >대기 ${e.sublanes.parallel.length}</span
          >
        </header>
        <div class="mon-group__list">
          ${e.sublanes.parallel.map(s=>so(s,t))}
        </div>
      </section>`:l`<div class="mon-group__list">
        ${e.items.map(s=>so(s,t))}
      </div>`;return l`<div class="mon-group" data-root-dir=${e.root_dir}>
    ${Zc(e)} ${n}
    ${r?e.sublanes.serial.map(s=>l`<section
              class="mon-sublane mon-sublane--serial"
              data-serial-lane=${s.id}
            >
              <header class="mon-sublane__hd">
                <span class="mon-sublane__name">${s.id}</span>
                <span class="mon-sublane__count"
                  >대기 ${s.items.length}</span
                >
                ${s.occupied_by.length>0?l`<span class="mon-sublane__held"
                      >${`\u25CF \uC810\uC720 \uC911 \xB7 ${s.occupied_by.join(", ")} (\uBA38\uC9C0\uAE4C\uC9C0 \uC720\uC9C0)`}</span
                    >`:""}
                ${s.corrections>0?l`<span class="mon-sublane__corrections"
                      >순서 자동 교정 ${s.corrections}건</span
                    >`:""}
                ${s.cross_wait_peers?.map(o=>l`<span class="mon-sublane__cross-wait"
                      >⚠ 상호 정지 — ${o.workspace_name}·${o.lane}과 교차
                      대기</span
                    >`)}
              </header>
              ${s.cycle?l`<div class="mon-sublane__cycle">
                    ⛔ 의존 사이클 — 자동 교정 불가
                  </div>`:""}
              <div class="mon-group__list">
                ${s.items.map(o=>so(o,t))}
              </div>
            </section>`):""}
  </div>`}function su(e,t){let r=ft("views:monitor"),n=t.gotoIssue,s=t.pipelineStore,o=t.transport,a=t.getWorkspacePath,i=t.switchWorkspace,u=t.now||(()=>Date.now()),d=t.confirm||(b=>typeof globalThis.confirm!="function"||globalThis.confirm(b)),f=mm(),_=bm(),h=pm();function C(){let b=lr.find($=>$.value===f);return b?b.label:""}let A=document.createElement("div");A.className="mon",e.appendChild(A);let I=ka(null,null),D=new Map,V=null,Y=null;async function W(b,$,k,O,G=!0){if(!o||!k)return null;let Z=await o(b,{...$,root_dir:k,expected_revision:O});if(Z&&Z.conflict&&G){Z.queue&&D.set(k,Z.queue);let ne=Z.queue&&typeof Z.queue.revision=="number"?Z.queue.revision:O;Z=await o(b,{...$,root_dir:k,expected_revision:ne})}return Z&&Z.queue&&k&&D.set(k,Z.queue),Z}function R(b,$){let k=D.get(b),O=s&&s.get?s.get():null,G=(Array.isArray(O)?O:[]).find(ne=>ne?.root_dir===b);return(k||G)?.merge_queue?.find(ne=>ne.bead_id===$)?.continuation_action}async function S(b,$,k,O){let G=await W(b,$,k,O),Z=D.get(k)?.revision??G?.queue?.revision??O;return mr(G,(ne,ce)=>W(b,{...$,continuation:ne,decision_token:ce},k,Z,!1),{refresh:ne=>W(b,$,k,ne?.queue?.revision??D.get(k)?.revision??Z,!1)})}async function P(b,$,k,O){let G=await mr({continuation_mismatch:O},(ne,ce)=>W("worker-merge-queue-add",{bead_id:$,continuation:ne,decision_token:ce},b,k,!1)),Z=G?.queue?.merge_queue?.find(ne=>ne.bead_id===$)?.continuation_action;G?.applied!==!0&&Z?.continuation===null&&Z.mismatch&&await P(b,$,G.queue.revision,Z.mismatch)}async function w(b,$,k){let O=await W("worker-discard",b,$,k);if(O&&O.discarded===!0){se(Qs(O),"success",5e3);return}if(O&&O.reason){se(`\uD3D0\uAE30 \uC2E4\uD328: ${O.reason}`,"error");return}if(O&&O.accepted&&O.pending==="merged_revert"){se("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if(O&&O.accepted){se(`\uD3D0\uAE30 \uC9C4\uD589: ${O.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}O&&!O.conflict&&se("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function B(b,$,k){return!o||!k?null:await o(b,{...$,root_dir:k})}async function te(b){if(!o||!b&&!d("\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB055\uB2C8\uB2E4. \uAC01 \uB808\uD3EC\uC758 \uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uD568\uAED8 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?"))return;let $=await o("monitor-auto-toggle",{on:b}),k=$&&Array.isArray($.failed)?$.failed:[];k.length>0&&se(`\uC790\uB3D9\uD654 ${b?"\uCF1C\uAE30":"\uB044\uAE30"} \uC77C\uBD80 \uC2E4\uD328: ${k.map(O=>O.root_dir).join(", ")}`,"error",3200)}async function le(){let b=new Map;for(let $ of I.pr_wait)b.has($.root_dir)||b.set($.root_dir,$.expected_revision);for(let[$,k]of b)await W("worker-merge-queue-add-all",{},$,k)}let M=null,L=!1,ue=null;function ge(){ue!==null&&clearTimeout(ue),ue=setTimeout(()=>{ue=null,L=!1},0)}function $e(b){let $=b.target;return typeof $?.closest=="function"?$.closest(".mon-group"):null}function Be(b){let $=$e(b);return!$||!M?null:($.getAttribute("data-root-dir")||"")===M.root_dir?$:null}function Qe(){for(let b of Array.from(A.querySelectorAll(".mon-group--drag-over")))b.classList.remove("mon-group--drag-over")}function Ve(b){let $=b.target,k=typeof $?.closest=="function"?$.closest('.mon-card[draggable="true"]'):null;if(k){M={bead_id:k.getAttribute("data-issue-id")||"",lane:k.getAttribute("data-lane")||"",root_dir:k.getAttribute("data-root-dir")||"",revision:Number(k.getAttribute("data-revision")||0)||0,queue_index:Number(k.getAttribute("data-queue-index")),queue_length:Number(k.getAttribute("data-queue-length")),place_index:Number(k.getAttribute("data-place-index"))},L=!0;try{b.dataTransfer?.setData("text/plain",M.bead_id),b.dataTransfer&&(b.dataTransfer.effectAllowed="move")}catch{}}}function Me(b){let $=Be(b);$&&(b.preventDefault(),b.dataTransfer&&(b.dataTransfer.dropEffect="move"),$.classList.add("mon-group--drag-over"))}function Ue(b){$e(b)?.classList.remove("mon-group--drag-over")}function ie(){M=null,Qe(),ge()}function Ae(b){let $=Be(b),k=M;if(M=null,Qe(),!$||!k||!k.bead_id)return;b.preventDefault();let O=b.target,G=typeof O?.closest=="function"?O.closest('.mon-card[data-lane="queue"]'):null,Z=G&&$.contains(G)?Number(G.getAttribute("data-queue-index")):NaN;if(k.lane==="runnable"){let je=Number.isFinite(Z)?Z:k.place_index;if(!Number.isFinite(je))return;W("worker-queue-place",{bead_id:k.bead_id,index:je},k.root_dir,k.revision);return}if(k.lane!=="queue"||G&&G.getAttribute("data-issue-id")===k.bead_id)return;let ne=k.queue_index,ce=Number.isFinite(Z)?ne>Z?Z:Z-1:k.queue_length-1;!Number.isFinite(ce)||ce<0||ce===ne||W("worker-queue-reorder",{bead_id:k.bead_id,to_index:ce},k.root_dir,k.revision)}function Ie(b){let $=_m(I.runnable,h),k={runnable:$.visible,queue:I.queue,running:I.running,pr_wait:I.pr_wait,done:I.done};return l`${Xc({automation:I.automation,counts:{running:I.running.length,queue:I.queue.length,pr_wait:I.pr_wait.length},running_sort:_,done_range:f,token_total:Jc(I.done),token_tooltip:Qc(C())})}
      <div class="worker-lanes mon-lanes">
        ${vm.map(O=>{let G=k[O.lane],Z=O.lane==="queue"?I.queue_groups.length>0?l`${I.queue_groups.map(ne=>wm(ne,b))}`:void 0:G.length>0?l`${G.map(ne=>so(ne,b))}`:void 0;return tr({id:`monitor-${O.lane}`,lane:O.pane,title:O.lane==="done"?`\uC644\uB8CC\xB7${C()}`:O.title,items:G,empty:O.empty,body:Z,live:O.lane==="running"&&G.length>0,header_control:O.lane==="runnable"?l`<span class="mon-candidate-filter">
                    <label
                      class="worker-filter__tgl"
                      title="blocked 이슈 표시 (기본 숨김)"
                    >
                      <input
                        type="checkbox"
                        class="mon-filter__blocked"
                        .checked=${h.show_blocked}
                      />
                      🔒 blocked
                    </label>
                    ${$.hidden_blocked>0?l`<span class="worker-filter__hidden"
                          >숨김 ${$.hidden_blocked}건</span
                        >`:""}
                  </span>`:O.lane==="pr_wait"&&G.length>0?l`<button
                      type="button"
                      class="mon-lane-op mon-merge-all"
                      title="자격이 생기는 PR을 각 레포의 머지 큐에 한 번에 넣습니다"
                    >
                      일괄 머지
                    </button>`:""})})}
      </div>`}function Ee(){let b=s&&s.get?s.get():null,$=s&&s.getWorkspacesState?s.getWorkspacesState():[],k=u();I=ka(b,$,{done_since:Nr(f,k),running_sort:_}),Ge(Ie(k),A)}function be(b,$){let k=a?a():void 0;if(!$||!k||$===k||!i){n(b);return}i($).then(()=>{n(b)}).catch(O=>{r("workspace switch for %s failed: %o",$,O)})}function We(b){return{root_dir:b.getAttribute("data-root-dir")||"",revision:Number(b.getAttribute("data-revision")||0)||0}}function et(b){if(typeof b=="string"&&b.length>0)return b;if(b&&typeof b=="object"){let $=b;if(typeof $.message=="string"&&$.message.length>0)return $.message;if(typeof $.error=="string"&&$.error.length>0)return $.error;if($.error&&typeof $.error=="object"&&typeof $.error.message=="string")return $.error.message}return"\uC5F0\uACB0\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4"}function Te(b,$){let k=b.querySelector(".mon-link__trigger"),O=b.querySelector(".mon-link__popover"),G=b.querySelector(".mon-link__error");!k||!O||!G||(Oe(),O.hidden=!1,k.setAttribute("aria-expanded","true"),G.textContent=$,G.hidden=!1)}async function tt(b,$,k){let O=$.getAttribute("data-root-dir")||"",G=$.getAttribute("data-issue-id")||"";if(!(!G||!k||k===G))try{await B(b,{a:G,b:k},O),Oe()}catch(Z){Te($,et(Z))}}function K(b,$){let{root_dir:k,revision:O}=We(b),G=b.getAttribute("data-issue-id")||"",Z=$.dataset.attemptId||b.getAttribute("data-attempt-id")||"",ne=$.classList;if(ne.contains("mon-link__trigger")){ze($);return}if(ne.contains("mon-link__candidate")||ne.contains("mon-link__direct")){let ce=$.dataset.targetId||"";tt("dep-add",b,ce);return}if(ne.contains("mon-blocker__remove")){let ce=$.dataset.blockerId||"";tt("dep-remove",b,ce);return}if(ne.contains("mon-place__choice")){let ce=$.dataset.lane||"parallel",je=Number($.dataset.placeIndex||0)||0;Oe(),W("worker-queue-place",{bead_id:G,...ce==="parallel"?{}:{lane:ce},index:je},k,O);return}if(ne.contains("worker-card__place")){Fe($);return}if(ne.contains("mon-op--up")||ne.contains("mon-op--down")){let ce=Number(b.getAttribute("data-queue-index")||0)||0,je=ne.contains("mon-op--up")?ce-1:ce+1;if(je<0)return;W("worker-queue-reorder",{bead_id:G,.../^s[1-5]$/.test(b.dataset.lane||"")?{lane:b.dataset.lane}:{},to_index:je},k,O);return}if(ne.contains("mon-op--remove")){W("worker-queue-remove",{bead_id:G},k,O);return}if(ne.contains("mon-op--pause")){B("worker-attempt-pause",{attempt_id:Z},k);return}if(ne.contains("mon-op--discard")){if(!d(Fn(G,"unmerged")))return;w({bead_id:G,...Z?{attempt_id:Z}:{},...$.dataset.operationId?{operation_id:$.dataset.operationId}:{}},k,O);return}if(ne.contains("mon-op--resume")){sn().then(ce=>{if(ce!==null)return S("worker-attempt-resume",{attempt_id:Z,...ce!==""?{instructions:ce}:{}},k,O)});return}if(ne.contains("mon-op--dismiss")){W("worker-attempt-dismiss",{attempt_id:Z},k,O);return}if(ne.contains("worker-mini__merge")){let ce=R(k,G);ce?.mismatch&&ce.continuation===null?P(k,G,O,ce.mismatch):W("worker-merge-queue-add",{bead_id:G},k,O);return}if(ne.contains("worker-mini__merge-cancel")){W("worker-merge-queue-remove",{bead_id:G},k,O);return}if(ne.contains("worker-mini__discard")){let ce=$.dataset.discardMode==="merged"?"merged":"unmerged";if(!d(Fn(G,ce)))return;w({bead_id:G,...Z?{attempt_id:Z}:{},...$.dataset.operationId?{operation_id:$.dataset.operationId}:{}},k,O);return}if(ne.contains("worker-mini__revise-fix")){S("worker-revise-fix",{bead_id:G},k,O);return}ne.contains("worker-mini__revise-approve")&&W("worker-revise-approve",{bead_id:G},k,O)}function F(b){b.querySelector(".mon-link__list")?.replaceChildren();let k=b.querySelector(".mon-link__search");k&&(k.value="");let O=b.querySelector(".mon-link__direct");O&&(O.hidden=!0,O.dataset.targetId="",O.textContent="");let G=b.querySelector(".mon-link__empty");G&&(G.hidden=!0);let Z=b.querySelector(".mon-link__error");Z&&(Z.hidden=!0,Z.textContent="")}function re(b,$){let k=b.querySelector(".mon-link__list");if(!k)return;let O=document.createDocumentFragment(),G=Tc(I).filter(Z=>Z.id!==$);for(let Z of G){let ne=document.createElement("button");ne.type="button",ne.className="mon-link__candidate",ne.dataset.targetId=Z.id,ne.dataset.search=`${Z.id} ${Z.title} ${Z.location}`.toLocaleLowerCase();let ce=document.createElement("strong");ce.textContent=Z.id;let je=document.createElement("span");je.textContent=Z.title;let me=document.createElement("small");me.textContent=Z.location,ne.append(ce,je,me),O.append(ne)}k.replaceChildren(O)}function Oe(){for(let b of Array.from(A.querySelectorAll(".mon-card-popover"))){let $=b;$.hidden=!0,$.classList.contains("mon-link__popover")&&F($)}for(let b of Array.from(A.querySelectorAll('[aria-expanded="true"]')))b.setAttribute("aria-expanded","false")}function Fe(b){let k=b.closest(".mon-place")?.querySelector(".mon-place__popover")||null;if(!k)return;let O=k.hidden;Oe(),O&&(k.hidden=!1,b.setAttribute("aria-expanded","true"))}function ze(b){let k=b.closest(".mon-link")?.querySelector(".mon-link__popover")||null;if(!k)return;let O=k.hidden;if(Oe(),O){let G=b.closest(".mon-card");re(k,G?.getAttribute("data-issue-id")||""),k.hidden=!1,b.setAttribute("aria-expanded","true");let Z=k.querySelector(".mon-link__search");Z&&(Ce(Z),Z.focus())}}function Ce(b){let $=b.closest(".mon-link__popover"),k=b.closest(".mon-card");if(!$||!k)return;let O=b.value.trim(),G=O.toLocaleLowerCase(),Z=0,ne=!1;for(let he of Array.from($.querySelectorAll(".mon-link__candidate"))){let st=he,ot=st.dataset.targetId||"",j=G.length===0||(st.dataset.search||"").includes(G);st.hidden=!j,j&&(Z+=1),ot.toLocaleLowerCase()===G&&(ne=!0)}let ce=$.querySelector(".mon-link__direct"),je=k.getAttribute("data-issue-id")||"";if(ce){let he=O.length>0&&!ne&&G!==je.toLocaleLowerCase();ce.hidden=!he,ce.dataset.targetId=he?O:"",ce.textContent=he?`\uC9C1\uC811 \uC785\uB825 \xB7 ${O}`:"",he&&(Z+=1)}let me=$.querySelector(".mon-link__empty");me&&(me.hidden=Z>0);let Se=$.querySelector(".mon-link__error");Se&&(Se.hidden=!0,Se.textContent="")}function ct(b){let $=b.target;$&&A.contains($)&&typeof $.closest=="function"&&$.closest(".mon-popover-owner")||Oe()}function Ye(b){if(b.key!=="Escape")return;let $=A.querySelector('[aria-expanded="true"]');Oe(),$?.focus()}function H(b){let $=L;L=!1;let k=b.target;if(!k||typeof k.closest!="function"||k.closest("dialog")||k.closest("a"))return;let O=k.closest(".mon-running-sort");if(O){b.preventDefault(),_=O.getAttribute("data-sort")==="repo"?"repo":"started",hm(_),Ee();return}let G=k.closest(".mon-auto-all");if(G){b.preventDefault(),te(G.getAttribute("data-on")==="true");return}if(k.closest(".mon-merge-all")){b.preventDefault(),le();return}let ne=k.closest(".mon-ctl--advance");if(ne){b.preventDefault();let{root_dir:he,revision:st}=We(ne);W("worker-automation-toggle",{on:ne.getAttribute("data-on")==="true"},he,st);return}let ce=k.closest(".mon-ctl--merge-auto");if(ce){b.preventDefault();let{root_dir:he,revision:st}=We(ce);W("worker-merge-auto-toggle",{on:ce.getAttribute("data-on")==="true"},he,st);return}let je=k.closest(".mon-card");if(!je)return;let me=k.closest("button");if(me){b.preventDefault(),K(je,me);return}let Se=je.getAttribute("data-issue-id");Se&&!$&&(b.preventDefault(),be(Se,je.getAttribute("data-root-dir")||""))}function ee(b){let $=b.target;if(!$||typeof $.closest!="function")return;let k=$.closest(".mon-filter__blocked");if(k){h={show_blocked:k.checked},fm(h),Ee();return}let O=$.closest(".mon-done-range");if(O){f=Bt(O.value)?O.value:Dt,gm(f),Ee();return}let G=$.closest(".mon-slots__input");if(!G)return;let{root_dir:Z,revision:ne}=We(G),ce=Number(G.value);if(!Number.isFinite(ce))return;let je=Math.max(Wn,Math.floor(ce));W("worker-queue-set-slots",{slots:je},Z,ne)}function De(b){let $=b.target;$?.classList.contains("mon-link__search")&&Ce($)}e.addEventListener("click",H),e.addEventListener("change",ee),e.addEventListener("input",De),e.addEventListener("dragstart",Ve),e.addEventListener("dragover",Me),e.addEventListener("dragleave",Ue),e.addEventListener("drop",Ae),e.addEventListener("dragend",ie),document.addEventListener("click",ct),document.addEventListener("keydown",Ye),s&&typeof s.subscribe=="function"&&(V=s.subscribe(()=>{try{D.clear(),Ee()}catch{}}));function rt(){Y!==null&&(clearInterval(Y),Y=null)}function de(){ue!==null&&(clearTimeout(ue),ue=null)}return{load(){r("load"),Ee(),Y===null&&(Y=setInterval(()=>{try{if(A.querySelector(".mon-card-popover:not([hidden])"))return;Ee()}catch{}},ym))},pause(){rt()},clear(){rt(),de(),V&&(V(),V=null),e.removeEventListener("click",H),e.removeEventListener("change",ee),e.removeEventListener("input",De),e.removeEventListener("dragstart",Ve),e.removeEventListener("dragover",Me),e.removeEventListener("dragleave",Ue),e.removeEventListener("drop",Ae),e.removeEventListener("dragend",ie),document.removeEventListener("click",ct),document.removeEventListener("keydown",Ye),e.replaceChildren()}}}function ou(e,t,r){let n=ft("views:nav"),{global_element:s,repo_element:o}=e,a=null;function i(h){return C=>{C.preventDefault(),n("click tab %s",h),r.gotoView(h)}}function u(){let h=t.getState();return h.view==="worker"||h.view==="monitor"?h.view:"board"}function d(){let h=u();return l`
      <a
        href="#/monitor"
        class="ctl-tab ctl-tab--monitor ${h==="monitor"?"is-active":""}"
        @click=${i("monitor")}
      >
        <span class="ctl-tab__dots" aria-hidden="true"
          ><i></i><i></i><i></i><i></i
        ></span>
        Monitor
      </a>
    `}function f(){let h=u();return l`
      <div class="ctl-tabs">
        <a
          href="#/board"
          class="ctl-tab ${h==="board"?"is-active":""}"
          @click=${i("board")}
          >Board</a
        >
        <a
          href="#/worker"
          class="ctl-tab ${h==="worker"?"is-active":""}"
          @click=${i("worker")}
          >Worker</a
        >
      </div>
    `}function _(){s&&Ge(d(),s),o&&Ge(f(),o)}return _(),a=t.subscribe(()=>_()),{destroy(){a&&(a(),a=null),s&&Ge(l``,s),o&&Ge(l``,o)}}}var au=["bug","feature","task","epic","chore"];function iu(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var lu=["Critical","High","Medium","Low","Backlog"];function cu(e,t){let r=document.createElement("dialog");r.id="new-issue-dialog",r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true"),r.innerHTML=`
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
  `,e.appendChild(r);let n=r.querySelector("#new-issue-form"),s=r.querySelector("#new-title"),o=r.querySelector("#new-type"),a=r.querySelector("#new-priority"),i=r.querySelector("#new-labels"),u=r.querySelector("#new-description"),d=r.querySelector("#new-issue-error"),f=r.querySelector("#btn-cancel"),_=r.querySelector("#btn-create"),h=r.querySelector(".new-issue__close");function C(){o.replaceChildren();let S=document.createElement("option");S.value="",S.textContent="\u2014 Select \u2014",o.appendChild(S);for(let P of au){let w=document.createElement("option");w.value=P,w.textContent=iu(P),o.appendChild(w)}a.replaceChildren();for(let P=0;P<=4;P+=1){let w=document.createElement("option");w.value=String(P);let B=lu[P]||"Medium";w.textContent=`${P} \u2013 ${B}`,a.appendChild(w)}}C();function A(){try{typeof r.close=="function"?r.close():r.removeAttribute("open")}catch{r.removeAttribute("open")}}function I(S){s.disabled=S,o.disabled=S,a.disabled=S,i.disabled=S,u.disabled=S,f.disabled=S,_.disabled=S,_.textContent=S?"Creating\u2026":"Create"}function D(){d.textContent=""}function V(S){d.textContent=S}function Y(){try{let S=window.localStorage.getItem("beads-ui.new.type");S?o.value=S:o.value="";let P=window.localStorage.getItem("beads-ui.new.priority");P&&/^\d$/.test(P)?a.value=P:a.value="2"}catch{o.value="",a.value="2"}}function W(){let S=o.value||"",P=a.value||"";S.length>0&&window.localStorage.setItem("beads-ui.new.type",S),P.length>0&&window.localStorage.setItem("beads-ui.new.priority",P)}async function R(){D();let S=String(s.value||"").trim();if(S.length===0){V("Title is required"),s.focus();return}let P=Number(a.value||"2");if(!(P>=0&&P<=4)){V("Priority must be 0..4"),a.focus();return}let w=String(o.value||""),B=String(u.value||""),te={title:S};w.length>0&&(te.type=w),String(P).length>0&&(te.priority=P),B.length>0&&(te.description=B),I(!0);try{await t("create-issue",te)}catch{I(!1),V("Failed to create issue");return}W(),I(!1),A()}return r.addEventListener("cancel",S=>{S.preventDefault(),A()}),h.addEventListener("click",()=>A()),f.addEventListener("click",()=>A()),r.addEventListener("keydown",S=>{S.key==="Enter"&&(S.ctrlKey||S.metaKey)&&(S.preventDefault(),R())}),n.addEventListener("submit",S=>{S.preventDefault(),R()}),{open(){n.reset(),D(),Y();try{"showModal"in r&&typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")}catch{r.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){A()}}}var km=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function $m(e,t){return To(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function uu(e,t,r){return l`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">라벨 표시</div>
      <p class="settings-dialog__hint-block">
        라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을 누르면
        그 라벨만 예외로 다시 표시됩니다.
      </p>
      ${t.length===0?l`<div class="settings-dialog__empty">라벨 없음</div>`:l`<div class="settings-dialog__pills">
            ${t.map(n=>{let s=$m(n,e);return l`<button
                type="button"
                class=${`settings-dialog__pill settings-dialog__pill--${s}`}
                data-label=${n}
                data-state=${s}
                @click=${()=>r(n)}
              >
                ${n}
              </button>`})}
          </div>`}
    </section>
  `}function du(e,t,r){return l`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">숨김 prefix</div>
      <div class="settings-dialog__prefixes">
        ${e.hidden_prefixes.map(n=>l`<span class="settings-dialog__prefix">
              ${n}
              <button
                type="button"
                class="settings-dialog__prefix-remove"
                aria-label=${`${n} \uADDC\uCE59 \uC81C\uAC70`}
                @click=${()=>r.onRemove(n)}
              >
                ×
              </button>
            </span>`)}
      </div>
      <div class="settings-dialog__prefix-add">
        <input
          type="text"
          class="settings-dialog__prefix-input"
          aria-label="숨길 prefix"
          placeholder="예: reviewed:"
          .value=${t}
          @input=${n=>r.onDraft(String(n.target.value||""))}
        />
        <button
          type="button"
          class="settings-dialog__btn"
          @click=${r.onAdd}
        >
          추가
        </button>
      </div>
    </section>
  `}function pu(e,t){return l`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">카드 표시 요소</div>
      <div class="settings-dialog__toggles">
        ${km.map(([r,n])=>l`<label class="settings-dialog__toggle">
              <input
                type="checkbox"
                data-chip=${r}
                .checked=${e.chips[r]!==!1}
                @change=${()=>t(r)}
              />
              <span>${n}</span>
            </label>`)}
      </div>
    </section>
  `}var xm=[{id:"execution",label:"\uC2E4\uD589",glyph:"\u25C6"},{id:"display",label:"\uD45C\uC2DC",glyph:"\u25EB"}],qt="";function Ft(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function fu(e,t){let{transport:r,policyStore:n,labelOptions:s}=t,o=t.notify||(b=>se(b,"error",4e3)),a=document.createElement("dialog");a.id="settings-dialog",a.className="settings-dialog",a.setAttribute("role","dialog"),a.setAttribute("aria-modal","true"),a.setAttribute("aria-label","\uC124\uC815"),e.appendChild(a);let i="execution",u=!1,d="",f={},_={},h=[],C=!1,A=null,I={},D="",V="",Y=!1,W=!1,R=!1,S=null;function P(){let b=t.queueStore?.get();return Ft(b)?b.runner_catalog:null}function w(){let b=t.queueStore?.get();return Ft(b)&&Ft(b.execution_defaults)?b.execution_defaults:null}function B(){let b=t.implPresetStore?.get();return Ft(b)&&Array.isArray(b.presets)?b:null}async function te(){C=!0,Ce();try{let b=await r("get-session-defaults",{});f=Ft(b?.values)?{...b.values}:{},_={...f},h=Array.isArray(b?.warnings)?b.warnings:[]}catch(b){h=["kv_read_failed"],o(`\uC138\uC158 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${b instanceof Error?b.message:String(b)}`)}finally{C=!1,Ce()}}async function le(){let b=nc(f,_);if(Object.keys(b).length!==0){try{let $=await r("set-session-defaults",{values:b});f=Ft($?.values)?{...$.values}:{},_={...f},h=Array.isArray($?.warnings)?$.warnings:[]}catch($){o(`\uC138\uC158 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${$ instanceof Error?$.message:String($)}`)}Ce()}}function M(b,$){$===qt?delete _[b]:_[b]=$,Ce(),le()}async function L(){let b=t.queueStore?.get();if(!Ft(b))return;let $={orchestration_model:b.orchestration_model??null,orchestration_effort:b.orchestration_effort??null,orchestration_speed:b.orchestration_speed??null},k=sc($,{...$,...I});if(Object.keys(k).length!==0){try{let O=await r("worker-queue-set-orchestration-defaults",{expected_revision:b.revision,values:k});if(O&&O.applied===!1){o("Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC");return}I={}}catch(O){o(`Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${O instanceof Error?O.message:String(O)}`)}Ce()}}function ue(b,$){I[b]=$===qt?null:$,Ce(),L()}async function ge(b){let $=t.queueStore?.get();if(!(!Ft($)||b<1)){try{await r("worker-queue-set-slots",{expected_revision:$.revision,slots:b})}catch(k){o(`slots \uC800\uC7A5 \uC2E4\uD328: ${k instanceof Error?k.message:String(k)}`)}Ce()}}function $e(){let b={},$=We();for(let k of ec){let O=Cr.includes(k)?$[k]:_[k];typeof O=="string"&&O.length>0&&(b[k]=O)}return b}async function Be(){let b=B();if(!b)return;let $=$e();if(Object.keys($).length===0){o("\uC800\uC7A5\uD560 \uC2E4\uD589 \uC124\uC815\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uBA3C\uC800 \uC2E4\uD589 \uAC12\uC744 \uC120\uD0DD\uD558\uC138\uC694");return}let k=(b.presets||[]).find(G=>G.id===D),O=V.trim()||(k?k.name:"");if(!O){o("\uD504\uB9AC\uC14B \uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694");return}try{let G=k?await r("impl-preset-update",{expected_revision:b.revision,id:k.id,name:O,settings:$}):await r("impl-preset-create",{expected_revision:b.revision,name:O,settings:$});if(G&&G.applied){if(V="",!k&&Array.isArray(G.presets)){let Z=G.presets.find(ne=>ne.name===O);D=Z?Z.id:D}Ce()}else o("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),Ce()}catch(G){o(`\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: ${G instanceof Error?G.message:String(G)}`)}}async function Qe(){let b=B();if(!(!b||D.length===0))try{let $=await r("impl-preset-delete",{expected_revision:b.revision,id:D});$&&$.applied?(D="",Ce()):(o("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),Ce())}catch($){o(`\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: ${$ instanceof Error?$.message:String($)}`)}}async function Ve(){let b=B(),$=t.queueStore?.get();if(!(!b||!Ft($)||D.length===0)){try{let k=await r("apply-impl-preset-global",{preset_id:D,expected_revision:b.revision,expected_queue_revision:$.revision});k&&k.applied?(f=Ft(k.values)?{...k.values}:{},_={...f},h=Array.isArray(k.warnings)?k.warnings:[],Ft(k.queue)&&(t.queueStore?.set?.(k.queue),I={}),k.queue_applied===!1&&o("\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uAC12\uC740 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694")):k&&k.conflict&&o("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: \uD504\uB9AC\uC14B\uC774 \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4")}catch(k){o(`\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: ${k instanceof Error?k.message:String(k)}`)}Ce()}}async function Me(){W=!0,R=!1,Ce();try{let b=await r("get-worker-system-prompt",{});!b||typeof b!="object"||Array.isArray(b)?R=!0:S=b}catch{R=!0}finally{W=!1,Ce()}}function Ue(){if(Y=!Y,Y&&!S){Me();return}Ce()}function ie(){let b=cn({loading:W,error:R});if(b)return b;if(!S)return"";let $=Array.isArray(S.variants)?S.variants:[];return l`<div class="settings-dialog__sp-body">
      ${S.target_base_placeholder?l`<div class="prompt-block__meta">
            \`${S.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${$.map(k=>l`<div class="settings-dialog__sp-variant" data-variant=${k.key}>
            <div class="settings-dialog__sp-cond">${k.condition}</div>
            ${vr(k.label,k.system_prompt)}
          </div>`)}
    </div>`}function Ae(){return l`<section
      class="settings-dialog__group"
      data-seam="system-prompt"
    >
      <div class="settings-dialog__group-title">
        워커 시스템 프롬프트
        <span class="settings-dialog__hint">읽기 전용 — 서버가 조립</span>
      </div>
      <button
        type="button"
        class="settings-dialog__btn"
        data-seam="system-prompt-toggle"
        aria-expanded=${Y?"true":"false"}
        @click=${Ue}
      >
        ${Y?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
      </button>
      ${Y?ie():""}
    </section>`}function Ie(b,$,k,O,G,Z){let ne=G[b]??qt,ce=sa(b,k,G,w(),P()),je=ce.options.find(Se=>Se.value===ne),me=ne===qt?ce.full_value:je?.full_value;return l`<select
        class=${ne===qt?"settings-dialog__unset":""}
        data-key=${b}
        aria-label=${$}
        title=${me||""}
        ?disabled=${Z===!0||ce.disabled}
        .value=${zr(String(ne))}
        @change=${Se=>O(b,String(Se.target.value))}
      >
        <option value=${qt} ?selected=${ne===qt}>
          ${ce.unset_label}
        </option>
        ${ce.options.map(Se=>l`<option
              value=${Se.value}
              title=${Se.full_value||""}
              ?selected=${Se.value===ne}
            >
              ${Se.label}
            </option>`)}
      </select>
      ${ne===qt?l`<span class="settings-dialog__source-badge">기본</span>`:""}`}function Ee(b,$,k,O,G,Z=!1){return l`<div
      class=${`settings-dialog__row${Z?" settings-dialog__row--off":""}`}
    >
      <span class="settings-dialog__row-label">${$}</span>
      <span class="settings-dialog__controls">
        ${Ie(b,$,k,O,G,Z)}
      </span>
    </div>`}function be(b,$,k,O,G){return l`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">
        <i
          class="settings-dialog__stage-dot"
          style=${`background: var(--stage-${$}-on)`}
        ></i>
        ${b}
      </span>
      <span class="settings-dialog__controls">
        ${Ie(k,`${b} \uBAA8\uB378`,O,M,_,!1)}
        ${Ie(G,`${b} effort`,zs,M,_,!1)}
      </span>
    </div>`}function We(){let b=t.queueStore?.get(),$={};for(let k of Cr)$[k]=Object.prototype.hasOwnProperty.call(I,k)?I[k]:Ft(b)&&typeof b[k]=="string"?b[k]:null;return $}function et(){let b=P(),$=_.impl_runtime,k=_.impl_model,O=B(),G=t.queueStore?.get(),Z=We(),ne=Gs(b,A),ce=un(b,A||void 0,Z.orchestration_model||dr).filter(he=>he!==dr),je=Ft(G)&&typeof G.slots=="number"?G.slots:2,me=w()?.supported===!0,Se=sa("workflow_mode",Dn,_,w(),b);return l`
      <section
        class=${`settings-dialog__pane${i==="execution"?" settings-dialog__pane--active":""}`}
        role="tabpanel"
        id="settings-pane-execution"
        aria-label="실행 설정"
      >
        <header class="settings-dialog__pane-head"><h2>실행 설정</h2></header>
        <p class="settings-dialog__pane-sub">
          세션 기본값과 Worker 오케스트레이션을 한곳에서 편집합니다. 저장소와
          저장 경로는 설정 그룹별로 유지됩니다.
        </p>
        ${h.length>0?l`<div class="settings-dialog__banner" role="alert">
              워크스페이스 기본값을 일부 읽지 못했습니다 —
              ${h.join(", ")}
            </div>`:""}
        ${me?"":l`<div
              class="settings-dialog__banner settings-dialog__banner--projection"
              data-execution-defaults-warning
              role="alert"
            >
              실행 기본값 projection을 확인할 수 없습니다 — 기본값 확인 불가
            </div>`}
        ${C?l`<div class="settings-dialog__empty">불러오는 중…</div>`:l`
              <div class="settings-dialog__preset-bar">
                <select
                  aria-label="실행 프리셋"
                  .value=${zr(D)}
                  @change=${he=>{D=String(he.target.value),Ce()}}
                >
                  <option value="" ?selected=${D===""}>
                    실행 프리셋…
                  </option>
                  ${(O?.presets||[]).map(he=>l`<option
                        value=${he.id}
                        ?selected=${he.id===D}
                      >
                        ${he.name}
                      </option>`)}
                </select>
                <button
                  type="button"
                  class="settings-dialog__btn settings-dialog__btn--primary"
                  data-preset-apply-global
                  ?disabled=${D.length===0}
                  @click=${Ve}
                >
                  전역 기본값으로 적용
                </button>
                <input
                  type="text"
                  class="settings-dialog__preset-name"
                  placeholder=${D?"\uC774\uB984 (\uBE44\uC6B0\uBA74 \uC720\uC9C0)":"\uC0C8 \uD504\uB9AC\uC14B \uC774\uB984"}
                  aria-label="프리셋 이름"
                  .value=${zr(V)}
                  @input=${he=>{V=String(he.target.value)}}
                />
                <button
                  type="button"
                  class="settings-dialog__btn"
                  data-preset-save
                  @click=${Be}
                >
                  ${D?"\uAC31\uC2E0":"\uC800\uC7A5"}
                </button>
                <button
                  type="button"
                  class="settings-dialog__btn"
                  data-preset-delete
                  ?disabled=${D.length===0}
                  @click=${Qe}
                >
                  삭제
                </button>
              </div>

              <div class="settings-dialog__group">
                <div class="settings-dialog__group-title">오케스트레이션</div>
                <div class="settings-dialog__row">
                  <span class="settings-dialog__row-label">런타임</span>
                  <span class="settings-dialog__controls">
                    <select
                      aria-label="런타임"
                      data-key="orchestration_runtime_filter"
                      .value=${zr(A||qt)}
                      @change=${he=>{let st=String(he.target.value);A=st===qt?null:st,Ce()}}
                    >
                      <option
                        value=${qt}
                        ?selected=${!A}
                      >
                        전체
                      </option>
                      <option
                        value="claude"
                        ?selected=${A==="claude"}
                      >
                        claude
                      </option>
                      <option
                        value="codex"
                        ?selected=${A==="codex"}
                      >
                        codex
                      </option>
                    </select>
                    <span class="settings-dialog__hint"
                      >모델 목록을 좁힙니다</span
                    >
                  </span>
                </div>
                ${Ee("orchestration_model","\uBAA8\uB378",ne,ue,Z)}
                ${Ee("orchestration_effort","effort",ce,ue,Z)}
                ${Ee("orchestration_speed","\uC18D\uB3C4",Pn,ue,Z)}
              </div>

              <div class="settings-dialog__group">
                <div class="settings-dialog__group-title">워크플로우</div>
                <div class="settings-dialog__row">
                  <span class="settings-dialog__row-label">모드</span>
                  <span class="settings-dialog__controls">
                    <span class="settings-dialog__seg" role="group">
                      <button
                        type="button"
                        data-mode=${qt}
                        aria-pressed=${String(!_.workflow_mode)}
                        @click=${()=>M("workflow_mode",qt)}
                      >
                        ${Se.unset_label}
                      </button>
                      ${_.workflow_mode?"":l`<span class="settings-dialog__source-badge"
                            >기본</span
                          >`}
                      ${Dn.map(he=>l`<button
                            type="button"
                            data-mode=${he}
                            aria-pressed=${String(_.workflow_mode===he)}
                            @click=${()=>M("workflow_mode",he)}
                          >
                            ${he}
                          </button>`)}
                    </span>
                  </span>
                </div>
              </div>

              <div class="settings-dialog__group">
                <div class="settings-dialog__group-title">
                  리뷰 게이트
                  <span class="settings-dialog__hint">모델 · effort</span>
                </div>
                ${be("\uC0AC\uC591 \uB9AC\uBDF0","spec","spec_review_model",Nn,"spec_review_effort")}
                ${be("\uACC4\uD68D \uB9AC\uBDF0","plan","plan_review_model",Ws,"plan_review_effort")}
                ${be("\uAD6C\uD604 \uB9AC\uBDF0","impl","impl_review_model",Nn,"impl_review_effort")}
              </div>

              <div class="settings-dialog__group">
                <div class="settings-dialog__group-title">
                  구현
                  <span class="settings-dialog__hint"
                    >이슈 핀이 있으면 핀이 우선합니다</span
                  >
                </div>
                ${Ee("impl_runtime","\uC704\uC784 \uB300\uC0C1",Us,M,_)}
                ${Ee("impl_model","\uBAA8\uB378",Hs(b,$),M,_)}
                ${Ee("impl_effort","effort",un(b,$,k),M,_)}
                ${Ee("impl_speed","\uC18D\uB3C4",Pn,M,_)}
              </div>

              <div class="settings-dialog__group">
                <div class="settings-dialog__group-title">동시 실행</div>
                <div class="settings-dialog__row">
                  <span class="settings-dialog__row-label">slots</span>
                  <span class="settings-dialog__controls">
                    <span class="settings-dialog__stepper">
                      <button
                        type="button"
                        aria-label="slots 감소"
                        @click=${()=>ge(je-1)}
                      >
                        −
                      </button>
                      <span class="settings-dialog__stepper-value"
                        >${je}</span
                      >
                      <button
                        type="button"
                        aria-label="slots 증가"
                        @click=${()=>ge(je+1)}
                      >
                        +
                      </button>
                    </span>
                  </span>
                </div>
              </div>
              ${Ae()}
            `}
      </section>
    `}function Te(){let b=n.get();return l`
      <section
        class=${`settings-dialog__pane${i==="display"?" settings-dialog__pane--active":""}`}
        role="tabpanel"
        id="settings-pane-display"
        aria-label="표시 설정"
      >
        <header class="settings-dialog__pane-head"><h2>표시 설정</h2></header>
        <p class="settings-dialog__pane-sub">
          이 워크스페이스의 라벨·칩 표시 정책입니다.
        </p>
        ${b?l`
              ${uu(b,s(),re)}
              ${du(b,d,{onDraft:$=>{d=$},onAdd:Oe,onRemove:Fe})}
              ${pu(b,ze)}
            `:l`<div class="settings-dialog__empty">
              표시 정책을 불러오는 중…
            </div>`}
      </section>
    `}async function tt(b){let $=n.get();if($)try{let k=await r("display-policy-set",{expected_revision:$.revision,policy:b($)});K(k),k&&k.conflict&&k.policy&&(k=await r("display-policy-set",{expected_revision:k.policy.revision,policy:b(k.policy)}),K(k)),k&&k.conflict&&o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC")}catch{o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328")}}function K(b){b&&b.policy&&typeof b.policy=="object"&&n.set(b.policy)}function F(b){tt(b)}function re(b){let $=n.get();if(!$)return;let k=!Am(b,$);F(O=>Sm(b,O,k))}function Oe(){let b=d.trim();b.length!==0&&(d="",F($=>$.hidden_prefixes.includes(b)?{hidden_prefixes:$.hidden_prefixes}:{hidden_prefixes:[...$.hidden_prefixes,b]}),Ce())}function Fe(b){F($=>({hidden_prefixes:$.hidden_prefixes.filter(k=>k!==b)}))}function ze(b){let $=n.get();if(!$)return;let k=$.chips[b]===!1;F(()=>({chips:{[b]:k}}))}function Ce(){Ge(l`
        <div class="settings-dialog__container">
          <nav
            class="settings-dialog__rail"
            role="tablist"
            aria-orientation="vertical"
          >
            <div class="settings-dialog__rail-title">설정</div>
            ${xm.map(b=>l`<button
                  type="button"
                  class="settings-dialog__tab"
                  role="tab"
                  data-tab=${b.id}
                  aria-selected=${String(i===b.id)}
                  aria-controls=${`settings-pane-${b.id}`}
                  @click=${()=>ct(b.id)}
                >
                  <span class="settings-dialog__glyph">${b.glyph}</span>
                  ${b.label}
                </button>`)}
            <button
              type="button"
              class="settings-dialog__close"
              aria-label="닫기"
              @click=${de}
            >
              닫기
            </button>
          </nav>
          <div class="settings-dialog__panes">
            ${et()} ${Te()}
          </div>
        </div>
      `,a)}function ct(b){i=b,Ce()}let Ye=()=>{u=!1,t.onOpenChange?.(!1)};a.addEventListener("close",Ye),a.addEventListener("cancel",Ye);let H=b=>{b.target===a&&de()};a.addEventListener("click",H);let ee=null;n.subscribe&&(ee=n.subscribe(()=>{u&&Ce()}));let De=null;t.implPresetStore?.subscribe&&(De=t.implPresetStore.subscribe(()=>{u&&Ce()}));function rt(b="execution"){u||(u=!0,t.onOpenChange?.(!0),i=b,d="",I={},Ce(),typeof a.showModal=="function"?a.showModal():a.setAttribute("open",""),te())}function de(){u&&(u=!1,t.onOpenChange?.(!1),typeof a.close=="function"?a.close():a.removeAttribute("open"))}return{open:rt,close:de,sessionDraft:()=>({..._}),destroy(){u=!1,a.removeEventListener("close",Ye),a.removeEventListener("cancel",Ye),a.removeEventListener("click",H),ee&&(ee(),ee=null),De&&(De(),De=null),a.remove()}}}function Am(e,t){return t.visible_labels.includes(e)?!0:t.hidden_labels.includes(e)?!1:!t.hidden_prefixes.some(r=>r.length>0&&e.startsWith(r))}function Sm(e,t,r){if(!r)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(o=>o!==e)};let n=t.hidden_labels.filter(o=>o!==e);return t.hidden_prefixes.some(o=>o.length>0&&e.startsWith(o))?{hidden_labels:n,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:n}}var Em=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],_u="usage-meter-card",mu=600,Tm=["token_expired","relogin_required"];function gu(e){return String(e).padStart(2,"0")}function Cm(e,t){let r=Math.max(0,Math.ceil((e-t)/6e4)),n=Math.floor(r/1440),s=Math.floor(r%1440/60),o=r%60;return n>0?`${n}d${s>0?` ${s}h`:""}`:s>0?`${s}h${o>0?` ${o}m`:""}`:`${o}m`}function Rm(e,t=Date.now()){let r=Date.parse(e);if(!Number.isFinite(r))return"";let n=new Date(r),s=new Date(t),o=`${gu(n.getHours())}:${gu(n.getMinutes())}`,i=n.getFullYear()===s.getFullYear()&&n.getMonth()===s.getMonth()&&n.getDate()===s.getDate()?o:`${Em[n.getMonth()]} ${n.getDate()} ${o}`;return`${Cm(r,t)} \xB7 ${i}`}function Im(e){let t=Math.max(0,Math.floor(e));return t<60?`${t}\uCD08 \uC804`:t<3600?`${Math.floor(t/60)}\uBD84 \uC804`:`${Math.floor(t/3600)}\uC2DC\uAC04 \uC804`}function bu(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}function hu(e){let t=typeof e=="number"&&Number.isFinite(e)?e:0;return Math.min(100,Math.max(0,t))}var yu=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage",switch_endpoint:"/api/claude-account/switch",tool:"cswap"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage",switch_endpoint:"/api/codex-account/switch",tool:"codex-auth"}];function wu(e){let t=[];for(let r of e){if(!r||typeof r!="object")continue;let n=r;typeof n.key!="string"||n.key.length===0||typeof n.pct!="number"||!Number.isFinite(n.pct)||t.push({key:n.key,pct:n.pct,resetsAt:typeof n.resetsAt=="string"?n.resetsAt:""})}return t}function Lm(e){if(!e||typeof e!="object")return null;let t=e;return!Number.isInteger(t.number)||t.number<=0||typeof t.email!="string"||t.email.length===0||typeof t.status!="string"||t.status.length===0||typeof t.active!="boolean"||!Array.isArray(t.windows)?null:{number:t.number,email:t.email,alias:typeof t.alias=="string"&&t.alias.length>0?t.alias:null,plan:typeof t.plan=="string"&&t.plan.length>0?t.plan:null,active:t.active,status:t.status,windows:wu(t.windows),fetchedAt:typeof t.fetchedAt=="string"?t.fetchedAt:null,ageSeconds:typeof t.ageSeconds=="number"&&Number.isFinite(t.ageSeconds)?t.ageSeconds:null}}function Om(e){if(!e||typeof e!="object")return null;let t=e,r=[];if(Array.isArray(t.accounts))for(let s of t.accounts){let o=Lm(s);o&&r.push(o)}let n=t.available===!0&&Array.isArray(t.windows);return!n&&r.length===0?null:{available:n,windows:n?wu(t.windows):[],ageSeconds:typeof t.ageSeconds=="number"&&Number.isFinite(t.ageSeconds)?t.ageSeconds:null,accounts:r}}function vu(e,t){return`${e}:${t}`}function ku(e){let t=!1,r=null,n=new Map,s=null,o=new Map,a=new Map,i=0;function u(){Ge(l``,e),e.hidden=!0}function d(M){r!==M&&(r===null&&(document.addEventListener("mousedown",_),document.addEventListener("keydown",h)),r=M)}function f(){r!==null&&(r=null,document.removeEventListener("mousedown",_),document.removeEventListener("keydown",h))}function _(M){let L=M.target;L&&e.contains(L)||(f(),B())}function h(M){M.key==="Escape"&&(f(),B())}function C(M){r===M?f():d(M),B()}function A(){f(),B()}async function I(M,L){if(n.has(M.key))return;let ue=vu(M.key,L);n.set(M.key,L),a.delete(ue),B();let ge=null;try{ge=await(await fetch(M.switch_endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({number:L})})).json()}catch{ge=null}if(t)return;if(n.delete(M.key),!ge||ge.ok!==!0){let Be=ge&&typeof ge.error=="string"&&ge.error.length>0?ge.error:"network_error";a.set(ue,{kind:"error",text:`\uC804\uD658 \uC2E4\uD328 \u2014 ${Be}`}),B();return}let $e=Array.isArray(ge.warnings)?ge.warnings.filter(Be=>typeof Be=="string"&&Be.length>0):[];$e.length>0&&a.set(ue,{kind:"warn",text:$e.join(" \xB7 ")}),B(),await le()}function D(M,L,ue,ge){let $e=hu(M.pct),Qe=`resets ${Rm(M.resetsAt,ge)}${L?` \xB7 ${ue}`:""}`;return l`<span
      class="usage-meter__window ${bu($e)}"
      style=${`--progress: ${$e}%`}
      title=${Qe}
    >
      <span class="usage-meter__label">${M.key}</span>
      <span class="usage-meter__track" aria-hidden="true">
        <span class="usage-meter__fill"></span>
      </span>
      <span class="usage-meter__pct">${$e}%</span>
    </span>`}function V(M,L,ue){let ge=L.available&&typeof L.ageSeconds=="number"&&L.ageSeconds>mu,$e=ge&&typeof L.ageSeconds=="number"?`${Math.floor(L.ageSeconds/60)}\uBD84 \uC804 \uCE21\uC815`:"",Be=L.accounts.filter(Ue=>!Ue.active).length,Qe=`usage-meter__group${ge?" usage-meter__group--stale":""}`,Ve=l`<span class="usage-meter__provider"
        >${M.label}</span
      >
      ${L.available?L.windows.map(Ue=>D(Ue,ge,$e,ue)):l`<span class="usage-meter__empty">사용량 없음</span>`}
      ${Be>0?l`<span class="usage-meter__badge">+${Be}</span>`:""}`;if(L.accounts.length===0)return l`<span
        class=${Qe}
        aria-label=${`${M.label} usage`}
        >${Ve}</span
      >`;let Me=r===M.key;return l`<button
      type="button"
      class=${`usage-meter__toggle ${Qe}`}
      aria-label=${`${M.label} usage`}
      aria-expanded=${Me?"true":"false"}
      aria-controls=${_u}
      @click=${()=>C(M.key)}
    >
      ${Ve}
    </button>`}function Y(M,L){return l`<span class="usage-meter" aria-label="Usage">
      ${M.map(ue=>V(ue.provider,ue.snapshot,L))}
    </span>`}function W(M){let L=hu(M.pct);return l`<span
      class="usage-meter__account-window ${bu(L)}"
      style=${`--progress: ${L}%`}
    >
      <span class="usage-meter__account-key">${M.key}</span>
      <span class="usage-meter__account-track" aria-hidden="true">
        <span class="usage-meter__account-fill"></span>
      </span>
      <span class="usage-meter__account-pct">${L}%</span>
    </span>`}function R(M,L){return Tm.includes(L)?`\uD1A0\uD070 \uB9CC\uB8CC \u2014 ${M.tool} \uC7AC\uB85C\uADF8\uC778 \uD544\uC694`:"\uC0AC\uC6A9\uB7C9 \uC5C6\uC74C"}function S(M,L){let ue=L.status==="ok",ge=typeof L.ageSeconds=="number"&&L.ageSeconds>mu,$e=a.get(vu(M.key,L.number)),Be=n.get(M.key),Qe=Be!==void 0,Ve=Be===L.number,Me=["usage-meter__account"];return L.active&&Me.push("usage-meter__account--active"),ue||Me.push("usage-meter__account--unavailable"),ge&&Me.push("usage-meter__account--stale"),l`<div class=${Me.join(" ")}>
      <div class="usage-meter__account-head">
        <span class="usage-meter__account-label" title=${L.email}
          >${L.alias===null?L.email:L.alias}</span
        >
        ${L.plan===null?"":l`<span class="usage-meter__account-tag">${L.plan}</span>`}
        ${L.active?l`<span
              class="usage-meter__account-tag usage-meter__account-tag--active"
              >active</span
            >`:""}
        ${L.ageSeconds===null?"":l`<span class="usage-meter__account-age"
              >${Im(L.ageSeconds)}</span
            >`}
        ${L.active?"":l`<button
              type="button"
              class="usage-meter__switch"
              ?disabled=${Qe}
              @click=${()=>{I(M,L.number)}}
            >
              ${Ve?"\uC804\uD658 \uC911\u2026":"\uC804\uD658"}
            </button>`}
      </div>
      ${ue?l`<div class="usage-meter__account-windows">
            ${L.windows.map(Ue=>W(Ue))}
          </div>`:l`<div class="usage-meter__account-status">
            ${R(M,L.status)}
          </div>`}
      ${$e===void 0?"":l`<div
            class="usage-meter__account-message usage-meter__account-message--${$e.kind}"
          >
            ${$e.text}
          </div>`}
    </div>`}function P(M,L){let ue=L.accounts.filter(ge=>ge.active).length;return l`<section class="usage-meter__section">
      <h2 class="usage-meter__section-title">
        ${M.label} · 활성 ${ue} / 전체
        ${L.accounts.length}
      </h2>
      ${L.accounts.map(ge=>S(M,ge))}
    </section>`}function w(M){return l`<div
      class="usage-meter__card"
      id=${_u}
      role="dialog"
      aria-label=${`${M.provider.label} \uACC4\uC815 \uC0AC\uC6A9\uB7C9`}
    >
      ${P(M.provider,M.snapshot)}
      <p class="usage-meter__note">전환은 새로 시작하는 세션부터 적용됩니다.</p>
    </div>`}function B(){let M=[];for(let ge of yu){let $e=o.get(ge.key);$e&&M.push({provider:ge,snapshot:$e})}if(M.length===0){f(),u();return}let L=M.find(ge=>ge.provider.key===r&&ge.snapshot.accounts.length>0);L||f();let ue=Date.now();Ge(l`${Y(M,ue)}
      ${L?l`<div
              class="usage-meter__scrim"
              aria-hidden="true"
              @mousedown=${A}
            ></div>
            ${w(L)}`:""}`,e),e.hidden=!1}async function te(M){try{let L=await fetch(M.endpoint);return L.ok?Om(await L.json()):null}catch{return null}}async function le(){i+=1;let M=i,L=await Promise.all(yu.map(async ue=>({provider:ue,snapshot:await te(ue)})));if(!(t||M!==i)){for(let ue of L)ue.snapshot?o.set(ue.provider.key,ue.snapshot):o.delete(ue.provider.key);B()}}return u(),le(),s=setInterval(()=>{le()},6e4),{destroy(){t=!0,s!==null&&(clearInterval(s),s=null),f(),u()}}}function $u(e){let t=e.attempts?Object.values(e.attempts):[],r=new Map;for(let s of t)s&&r.set(s.bead_id,s.attempt_id);let n=new Map;for(let s of e.done||[])s&&typeof s.bead_id=="string"&&typeof s.added_at=="number"&&n.set(s.bead_id,s.added_at);return s=>{let o=r.get(s.bead_id)!==s.attempt_id,a=n.get(s.bead_id),i=typeof a=="number"&&a>0&&typeof s.finished_at=="number"&&a>=s.finished_at;return!o&&!i&&typeof s.dismissed_at!="number"}}var Mm="worker-ineligible";function Sa(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Ea(e){return Sa(e).includes(Mm)}var Pm="worker-serial";function Ta(e){return Sa(e).includes(Pm)}function Ca(e,t,r){if(typeof t!="string"||typeof r!="string")return[];let n=e?.runners;if(!n||!Object.hasOwn(n,t))return[];let s=n[t],o=s?.models;if(!o||!Object.hasOwn(o,r))return[];let a=o[r]?.efforts;return Array.isArray(a)?a.slice():Array.isArray(s.efforts)?s.efforts.slice():[]}var Dm=new Set(["done","failed","orphaned","stopped","discarded"]),Nm={spec_missing:"\uC2A4\uD399 \uC5C6\uC74C",route:"route \uBBF8\uB2EC",spec_review:"\uC2A4\uD399 \uB9AC\uBDF0 \uC5C6\uC74C",spec_conflict:"\uC2A4\uD399 \uCDA9\uB3CC",phase_child:"phase child",worker_ineligible:"worker \uC81C\uC678"},qm={running:"\uC2E4\uD589 \uC911",success:"\uC131\uACF5",failure:"\uC2E4\uD328",cancelled:"\uCDE8\uC18C",interrupted:"\uC911\uB2E8"},Fm={running:"running",success:"done",failure:"failed",cancelled:"stopped",interrupted:"orphaned"};function Ra(e){return{runner:e.runner||void 0,model:e.model||void 0,effort:e.effort||void 0,status:Fm[e.outcome]||(typeof e.job_id=="string"?"running":void 0),session_id:e.session_id||void 0}}function xu(e,t){let{queueStore:r,analysisStore:n,transport:s,getWorkspacePath:o,onOpenTranscript:a}=t,i=document.createElement("dialog");i.id="worker-parallel-analysis-dialog",i.className="pa",i.setAttribute("role","dialog"),i.setAttribute("aria-modal","true"),e.appendChild(i);let u=new Map,d=new Map,f=!1,_=null,h=null,C=null,A=new Set,I=!1,D=0,V=null,Y=new Set;function W(){return r&&r.get()||{revision:0,queue:[],serial_lanes:[],serial_lane_count:0,attempts:{},pr_wait:[]}}function R(){return n&&n.get()||{settings:{revision:0,runner:null,model:null,effort:null},job:null,runs:[],last_good:null}}function S(){return o&&o()||""}async function P(){if(!s)return;let v=++D;I=!0,C=null,A.clear(),me();try{let T=await s("worker-parallel-analysis-targets",{root_dir:S()});if(v!==D||!Se)return;let N=Array.isArray(T?.qualified)?T.qualified:[],X=Array.isArray(T?.excluded)?T.excluded:[];C={qualified:N,excluded:X};for(let we of N)we&&typeof we.id=="string"&&A.add(we.id)}catch{v===D&&Se&&(C={qualified:[],excluded:[]},se("\uBD84\uC11D \uB300\uC0C1\uC744 \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4","error",2800))}finally{v===D&&(I=!1,Se&&me())}}function w(v){return Array.isArray(v.runs)?v.runs:[]}function B(){let v=W(),T=new Set;for(let N of Object.values(v.attempts||{})){let X=N;X&&typeof X.bead_id=="string"&&!Dm.has(X.status)&&T.add(X.bead_id)}for(let N of Array.isArray(v.pr_wait)?v.pr_wait:[])N&&typeof N.bead_id=="string"&&T.add(N.bead_id);for(let N of Object.values(v.discard_operations||{})){let X=N;X&&X.phase!=="done"&&typeof X.bead_id=="string"&&T.add(X.bead_id)}return T}function te(v){return v.filter(T=>le(T)===null)}function le(v){let T=W();for(let N of Array.isArray(T.serial_lanes)?T.serial_lanes:[])if(Array.isArray(N?.entries)&&N.entries.some(X=>X.bead_id===v))return N.id;return(Array.isArray(T.queue)?T.queue:[]).some(N=>N.bead_id===v)?"parallel":null}function M(v,T){let N=u.get(v);return N||[...T.order]}function L(v){if(v.length<2)return!1;let T=le(v[0]);if(!T||T==="parallel")return!1;let N=W(),X=(Array.isArray(N.serial_lanes)?N.serial_lanes:[]).find(Q=>Q.id===T)?.entries.map(Q=>Q.bead_id);if(!Array.isArray(X))return!1;let we=v.map(Q=>X.indexOf(Q));return we.every(Q=>Q>=0)&&we.every((Q,xe)=>xe===0||Q>we[xe-1])}function ue(){let v=W(),T=Array.isArray(v.serial_lanes)?v.serial_lanes:[],N=T.find(X=>Array.isArray(X.entries)&&X.entries.length===0);return N?N.id:T[0]?.id||"s1"}function ge(v){let T=W().bead_titles||{};return typeof T[v]=="string"?T[v]:v}async function $e(v,T){if(!s||f)return null;f=!0,me();try{return await s(v,T)}finally{f=!1,me()}}async function Be(v){n?.setPending?.(!0);try{let T=await $e("worker-parallel-analysis-start",{force:v,target_ids:Array.from(A)});T&&T.applied===!1&&T.reason&&(T.reason==="target_not_qualified"&&Array.isArray(T.detail)?se(`\uBD84\uC11D \uB300\uC0C1 \uC790\uACA9 \uBCC0\uACBD: ${T.detail.join(", ")}`,"error",3200):se(`\uBD84\uC11D \uC2E4\uD328: ${T.reason}`,"error",2800))}finally{n?.setPending?.(!1)}}async function Qe(){let v=R().job;!s||!v||await s("worker-parallel-analysis-cancel",{job_id:v.job_id})}async function Ve(v){if(!(!s||Y.has(v))){Y.add(v),me();try{let T=await s("worker-parallel-analysis-prompt",{root_dir:S(),run_id:v});if(!Se)return;if(T?.ok===!0&&typeof T.prompt=="string"){V={run_id:v,prompt:T.prompt};return}se(T?.reason==="not_found"?"\uC800\uC7A5\uB41C \uBD84\uC11D \uD504\uB86C\uD504\uD2B8\uB97C \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBD84\uC11D \uD504\uB86C\uD504\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4","error",2800)}finally{Y.delete(v),me()}}}function Me(){V=null,me()}async function Ue(){if(!V)return;let v=await Zt(V.prompt);se(v?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",v?"success":"error",1400)}function ie(v,T){a&&a(v,Ra(T))}function Ae(){return W().runner_catalog}function Ie(v){return Object.keys(Ae()?.runners?.[v]?.models||{})}function Ee(v){let T=Ie(v),N=Ae()?.runners?.[v]?.default_model;return typeof N=="string"&&T.includes(N)?N:T[0]||""}function be(){let v=R().settings,T=_||v.runner||"claude",N=Ie(T),X=_?Ee(T):v.model||N[0]||"",we=Ca(Ae(),T,X),Q=v.effort||"",xe=we.includes(Q)?Q:we[0]||"";return{runner:T,model:X,effort:xe,models:N,efforts:we}}async function We(v){let T=R().settings,N=await $e("worker-parallel-analysis-settings-update",{expected_revision:T.revision,runner:v.runner,model:v.model,effort:v.effort});(!N||N.applied!==!0)&&(_=null,me(),N&&N.reason&&se(`\uBD84\uC11D \uC124\uC815 \uAC70\uBD80: ${N.reason}`,"error",2800))}function et(v){_=v,me();let T=be();We({runner:v,model:T.model,effort:T.effort})}function Te(v){let T=be(),N=Ca(Ae(),T.runner,v);We({runner:T.runner,model:v,effort:N.includes(T.effort)?T.effort:N[0]||""})}function tt(v){let T=be();We({runner:T.runner,model:T.model,effort:v})}async function K(v,T){if(!s||f)return;let N=M(v,T),X=R();if(N.length<2||!X.last_good){se("\uC81C\uCD9C\uD558\uB824\uBA74 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4","warning");return}let we=d.get(v)||ue(),Q=()=>({snapshot_digest:X.last_good.identity_digest,group_index:v,lane:we,ordered_bead_ids:N,expected_revision:W().revision});f=!0,me();try{let xe=await s("worker-parallel-analysis-submit",Q());xe&&xe.queue&&r&&r.set(xe.queue),xe&&xe.applied!==!0&&xe.conflict===!0&&(xe=await s("worker-parallel-analysis-submit",Q()),xe&&xe.queue&&r&&r.set(xe.queue)),xe&&xe.applied===!0?(u.delete(v),se(`\uC9C1\uB82C \uB808\uC778 ${we}\uC5D0 ${N.length}\uAC1C \uBC30\uCE58`,"success")):se(`\uC81C\uCD9C \uAC70\uBD80: ${xe?.reason||"conflict"} (\uD050 \uBB34\uBCC0\uACBD)`,"error",2800)}finally{f=!1,me()}}function F(v,T,N){u.set(v,M(v,T).filter(X=>X!==N)),me()}function re(v){u.delete(v),me()}function Oe(v,T,N,X){let we=[...M(v,T)],Q=we.indexOf(N),xe=Q+X;Q<0||xe<0||xe>=we.length||(we.splice(xe,0,...we.splice(Q,1)),u.set(v,we),me())}function Fe(){let v=R().settings,T=Object.keys(Ae()?.runners||{}),N=be();return l`<div class="pa-settings">
      <label class="pa-settings__field"
        >러너
        <select
          class="pa-settings__runner"
          aria-label="분석 러너"
          @change=${X=>et(X.target.value)}
        >
          ${T.map(X=>l`<option
                value=${X}
                ?selected=${N.runner===X}
              >
                ${X}
              </option>`)}
        </select>
      </label>
      <label class="pa-settings__field"
        >분석 모델
        <select
          class="pa-settings__model"
          aria-label="분석 모델"
          @change=${X=>Te(X.target.value)}
        >
          ${N.models.map(X=>l`<option
                value=${X}
                ?selected=${N.model===X}
              >
                ${X}
              </option>`)}
        </select>
      </label>
      <label class="pa-settings__field"
        >effort
        <select
          class="pa-settings__effort-select"
          aria-label="분석 effort"
          @change=${X=>tt(X.target.value)}
        >
          ${N.efforts.map(X=>l`<option
                value=${X}
                ?selected=${N.effort===X}
              >
                ${X}
              </option>`)}
        </select>
      </label>
      ${ze(v)}
    </div>`}function ze(v){return!ct(v)||Ce(v)?l`<span class="pa-settings__unset">분석 모델 설정 필요</span>`:v.compatible===!1?l`<span class="pa-settings__incompatible"
        >설정 비호환 — 저장된 ${v.runner}/${v.model} · effort
        ${v.effort} 을(를) 카탈로그가 더는 제공하지 않습니다</span
      >`:v.is_default===!0?l`<span class="pa-settings__default">기본값</span>`:""}function Ce(v){return v.is_default===!0&&v.compatible===!1}function ct(v){return!!(v.runner&&v.model&&v.effort)}function Ye(v){return ct(v)&&v.compatible!==!1}function H(v){let T=Math.max(0,Math.floor(v/1e3)),N=Math.floor(T/60),X=T%60;return`${N}:${String(X).padStart(2,"0")}`}function ee(v){let T=v.job;if(T){let N=typeof T.started_at=="number"?T.started_at:0,X=`${T.runner||"?"}/${T.model||"?"}`,we=N?` \xB7 \uACBD\uACFC ${H(Date.now()-N)}`:"",Q=typeof T.session_id=="string"?T.session_id:"",xe=w(v).find(Le=>Le.run_id===T.job_id);return l`<span class="pa-meta__progress">
        <span
          >분석 중 — ${X} · effort ${T.effort||"?"}${we}</span
        >
        ${Q?l`<code class="pa-session-id" title=${Q}
              >${Q.slice(0,8)}</code
            >`:""}
        <button
          type="button"
          class="pa-monitor"
          @click=${()=>ie(T.job_id,xe||T)}
        >
          모니터링
        </button>
        <button
          type="button"
          class="pa-prompt-open"
          ?disabled=${xe?.prompt_saved!==!0||Y.has(T.job_id)}
          @click=${()=>{Ve(T.job_id)}}
        >
          프롬프트
        </button>
      </span>`}return De()?l`<span class="pa-meta__progress"
          >준비 중 — 대상과 아티팩트 수집 중</span
        >`:""}function De(){return n?.isPending?.()===!0}function rt(v){let T=!!v.job,N=Ye(v.settings),X=C!==null&&A.size===0,we=T||f||De()||I;return l`<div class="pa-meta">
      ${v.last_good?l`<span class="pa-meta__at"
            >분석 ${new Date(v.last_good.at||0).toLocaleString()}</span
          >`:l`<span class="pa-meta__at">분석 결과 없음</span>`}
      ${ee(v)}
      <button
        type="button"
        class="pa-run"
        ?disabled=${!N||we||X}
        @click=${()=>{Be(!1)}}
      >
        ✳ 분석
      </button>
      <button
        type="button"
        class="pa-rerun"
        ?disabled=${!N||we||X}
        @click=${()=>{Be(!0)}}
      >
        재분석
      </button>
      <button
        type="button"
        class="pa-cancel"
        ?disabled=${!T}
        @click=${()=>{Qe()}}
      >
        취소
      </button>
    </div>`}function de(v){return typeof v=="string"&&v.length>0?v:"\uBBF8\uBC30\uCE58"}function b(v,T){T?A.add(v):A.delete(v),me()}function $(v){let T=Array.isArray(v.scope)?v.scope:[],N=Array.isArray(v.overlaps)?v.overlaps:[];return T.length===0&&N.length===0?l``:l`<span class="pa-target__signals">
      ${T.length>0?l`<details class="pa-target__scope" title=${T.join(`
`)}>
            <summary>scope ${T.length}</summary>
            <ul>
              ${T.map(X=>l`<li><code>${X}</code></li>`)}
            </ul>
          </details>`:""}
      ${N.length>0?l`<span
            class="pa-target__overlaps"
            title=${`\uACB9\uCE68: ${N.join(", ")}`}
            >겹침 ${N.join(", ")}</span
          >`:""}
    </span>`}function k(){let v=C?.qualified||[],T=C?.excluded||[];return l`<section class="pa-targets">
      <header class="pa-targets__header">
        <strong>분석 대상</strong>
        <span class="pa-targets__summary"
          >${I?"\uC870\uD68C \uC911\u2026":`\uC790\uACA9 ${v.length} \xB7 \uC81C\uC678 ${T.length}`}</span
        >
      </header>
      ${C&&v.length>0?l`<ul class="pa-targets__list">
            ${v.map(N=>l`<li class="pa-target">
                  <label class="pa-target__label">
                    <input
                      type="checkbox"
                      class="pa-target__check"
                      data-target-id=${N.id}
                      .checked=${A.has(N.id)}
                      @change=${X=>b(N.id,X.target.checked)}
                    />
                    <span class="pa-target__title">${N.title}</span>
                  </label>
                  <span class="pa-target__meta">
                    ${$(N)}
                    <span class="pa-target__route">${N.route}</span>
                    <span class="pa-target__lane"
                      >${de(N.lane)}</span
                    >
                  </span>
                </li>`)}
          </ul>`:C&&v.length===0?l`<p class="pa-empty">자격 있는 분석 대상이 없습니다</p>`:""}
      ${C&&T.length>0?l`<details class="pa-targets__excluded">
            <summary>제외 대상 ${T.length}</summary>
            <ul class="pa-targets__list">
              ${T.map(N=>l`<li class="pa-target pa-target--excluded">
                    <label class="pa-target__label">
                      <input type="checkbox" disabled />
                      <span class="pa-target__title">${N.title}</span>
                    </label>
                    <span class="pa-target__meta">
                      <span class="pa-target__reason"
                        >${Nm[N.reason]||N.reason}</span
                      >
                      <span class="pa-target__lane"
                        >${de(N.lane)}</span
                      >
                    </span>
                  </li>`)}
            </ul>
          </details>`:""}
    </section>`}function O(v){let T=typeof v.session_id=="string"&&v.session_id.length>0,N=T?v.session_id:"";return l`<li class="pa-run-row">
      <span class="pa-run-row__status pa-run-row__status--${v.outcome}"
        >${qm[v.outcome]||v.outcome}</span
      >
      <time class="pa-run-row__time"
        >${new Date(v.started_at||0).toLocaleString()}</time
      >
      <span class="pa-run-row__identity"
        >${v.runner||"?"} / ${v.model||"?"} / ${v.effort||"?"}</span
      >
      ${T?l`<code class="pa-session-id" title=${N}
            >${N.slice(0,8)}</code
          >`:l`<span class="pa-run-row__no-session">세션 없음</span>`}
      ${v.outcome==="failure"&&v.reason?l`<span class="pa-run-row__reason">${v.reason}</span>`:""}
      <span class="pa-run-row__actions">
        <button
          type="button"
          class="pa-run-row__monitor"
          @click=${()=>ie(v.run_id,v)}
        >
          모니터링
        </button>
        <button
          type="button"
          class="pa-run-row__prompt"
          ?disabled=${v.prompt_saved!==!0||Y.has(v.run_id)}
          @click=${()=>{Ve(v.run_id)}}
        >
          프롬프트
        </button>
      </span>
    </li>`}function G(v){return l`<section class="pa-runs">
      <header class="pa-runs__header"><strong>최근 실행</strong></header>
      ${v.length>0?l`<ul class="pa-runs__list">
            ${v.map(T=>O(T))}
          </ul>`:l`<p class="pa-empty">실행 이력 없음</p>`}
    </section>`}function Z(){return V?l`<div
      class="pa-prompt-popup"
      role="dialog"
      aria-modal="true"
      aria-label="분석 프롬프트"
    >
      <div class="pa-prompt-popup__backdrop" @click=${Me}></div>
      <section class="pa-prompt-popup__panel">
        <header class="pa-prompt-popup__header">
          <div class="pa-prompt-popup__identity">
            <strong>분석 프롬프트</strong>
            <code>${V.run_id}</code>
          </div>
          <div class="pa-prompt-popup__actions">
            <button type="button" @click=${()=>{Ue()}}>
              복사
            </button>
            <button
              type="button"
              class="pa-prompt-popup__close"
              aria-label="분석 프롬프트 팝업 닫기"
              @click=${Me}
            >
              ✕
            </button>
          </div>
        </header>
        <pre class="pa-prompt-popup__content" tabindex="0">
${V.prompt}</pre
        >
      </section>
    </div>`:""}function ne(v,T){let N=M(v,T),X=B(),we=N.filter(Ze=>X.has(Ze)),Q=te(N),xe=L(N),Le=Array.isArray(W().serial_lanes)?W().serial_lanes:[],gt=d.get(v)||ue(),ht=T.eligible!==!0||N.length<2||we.length>0||Q.length>0||xe||f;return l`<section class="pa-group" data-group-index=${String(v)}>
      <header class="pa-group__head">
        <span class="pa-group__confidence">${T.confidence}</span>
        ${T.categories.map(Ze=>l`<span class="pa-group__category">${Ze}</span>`)}
        ${xe?l`<span class="pa-group__applied">✓ 이미 반영됨</span>`:""}
        ${T.eligible===!0?"":l`<span class="pa-group__weak">근거 부족 — 제출 불가</span>`}
        ${Q.length>0?l`<span class="pa-group__stale"
              >stale — ${Q.join(", ")} 대기 영역 이탈</span
            >`:""}
      </header>
      <p class="pa-group__reason">${T.reason}</p>
      <ol class="pa-group__members">
        ${N.map((Ze,St)=>l`<li class="pa-member" data-bead-id=${Ze}>
              <span class="pa-member__seq">${St+1}</span>
              <span class="pa-member__title">${ge(Ze)}</span>
              ${X.has(Ze)?l`<span class="pa-member__active">실행 중</span>`:""}
              <button
                type="button"
                class="pa-member__up"
                data-bead-id=${Ze}
                ?disabled=${St===0}
                aria-label=${`${Ze} \uC704\uB85C`}
                @click=${()=>Oe(v,T,Ze,-1)}
              >
                ↑
              </button>
              <button
                type="button"
                class="pa-member__down"
                data-bead-id=${Ze}
                ?disabled=${St===N.length-1}
                aria-label=${`${Ze} \uC544\uB798\uB85C`}
                @click=${()=>Oe(v,T,Ze,1)}
              >
                ↓
              </button>
              <button
                type="button"
                class="pa-member__exclude"
                data-bead-id=${Ze}
                aria-label=${`${Ze} \uC81C\uC678`}
                @click=${()=>F(v,T,Ze)}
              >
                ✕
              </button>
            </li>`)}
      </ol>
      <ul class="pa-group__evidence">
        ${T.evidence.map(Ze=>l`<li class="pa-evidence">
              <code>${Ze.path}</code>
              <span class="pa-evidence__locator">${Ze.locator}</span>
            </li>`)}
      </ul>
      <footer class="pa-group__foot">
        <button
          type="button"
          class="pa-group__restore"
          @click=${()=>re(v)}
        >
          제안으로 되돌리기
        </button>
        <label class="pa-group__lane-field"
          >제출
          <select
            class="pa-group__lane"
            aria-label="제출 대상 레인"
            @change=${Ze=>{d.set(v,Ze.target.value),me()}}
          >
            ${Le.map((Ze,St)=>l`<option
                  value=${Ze.id}
                  ?selected=${gt===Ze.id}
                >
                  직렬 ${St+1}
                </option>`)}
          </select>
        </label>
        <button
          type="button"
          class="pa-group__submit"
          ?disabled=${ht}
          @click=${()=>{K(v,T)}}
        >
          제출
        </button>
      </footer>
    </section>`}function ce(v){let T=Array.isArray(v.issues)?v.issues:[],N=T.filter(we=>we.verdict==="parallel_ok").length,X=T.filter(we=>we.verdict==="uncertain").length;return l`<div class="pa-summary">
      <span>parallel_ok ${N}</span>
      <span>uncertain ${X}</span>
    </div>`}function je(){let v=Se&&!!R().job;if(v&&h===null){h=setInterval(()=>me(),1e3);return}!v&&h!==null&&(clearInterval(h),h=null)}function me(){let v=R();_&&v.settings.runner===_&&(_=null);let T=v.last_good?.result;je(),Ge(l`
        <div class="pa__container">
          <header class="pa__header">
            <div class="pa__title">병렬성 분석</div>
            <button
              type="button"
              class="pa__close"
              aria-label="닫기"
              @click=${pe}
            >
              ×
            </button>
          </header>
          <div class="pa__body">
            ${Fe()} ${rt(v)} ${k()}
            ${T?l`${T.groups.map((N,X)=>ne(X,N))}
                ${T.groups.length===0?l`<p class="pa-empty">직렬 권장 그룹 없음</p>`:""}
                ${ce(T)}`:l`<p class="pa-empty">
                  아직 분석 결과가 없습니다 — [✳ 분석]을 눌러 시작하세요
                </p>`}
            ${G(w(v))}
          </div>
        </div>
        ${Z()}
      `,i)}let Se=!1,he=()=>{Se=!1,V=null,D+=1,je()},st=v=>{v.target===v.currentTarget&&pe()};i.addEventListener("close",he),i.addEventListener("cancel",he),i.addEventListener("click",st);let ot=null;r&&r.subscribe&&(ot=r.subscribe(()=>{Se&&me()}));let j=null;n&&n.subscribe&&(j=n.subscribe(()=>{Se&&me()}));function J(){Se||(Se=!0,me(),P(),typeof i.showModal=="function"?i.showModal():i.setAttribute("open",""))}function pe(){Se&&(Se=!1,V=null,D+=1,je(),typeof i.close=="function"?i.close():i.removeAttribute("open"))}return{open:J,close:pe,destroy(){Se=!1,h!==null&&(clearInterval(h),h=null),i.removeEventListener("close",he),i.removeEventListener("cancel",he),i.removeEventListener("click",st),ot&&(ot(),ot=null),j&&(j(),j=null),i.remove()}}}var Au=new Set(["sh","bash","zsh","dash","ksh"]),Su=/('(?:[^']*)'|"(?:\\.|[^"\\])*"|#.*|\$(?:\{[^}\n]*\}|[A-Za-z_][A-Za-z0-9_]*|[?#@*!$0-9-])|\b(?:if|then|else|elif|fi|for|while|until|do|done|case|esac|in|function|select|time)\b)/g;function Eu(e){let t=e.split("/");return t[t.length-1]||""}function jm(e){let t=e.split(`
`,1)[0];if(!t.startsWith("#!"))return!1;let r=t.slice(2).trim().split(/\s+/).filter(Boolean);if(r.length===0)return!1;let n=Eu(r[0]);if(n!=="env")return Au.has(n);let s=r.slice(1).find(o=>!o.startsWith("-")&&!o.includes("="));return s!==void 0&&Au.has(Eu(s))}function Bm(e){return e.startsWith("#")?"comment":e.startsWith("'")||e.startsWith('"')?"string":e.startsWith("$")?"variable":"keyword"}function Um(e){let t=[],r=0;Su.lastIndex=0;for(let n of e.matchAll(Su)){let s=n.index;s>r&&t.push({text:e.slice(r,s),kind:"plain"}),t.push({text:n[0],kind:Bm(n[0])}),r=s+n[0].length}return r<e.length&&t.push({text:e.slice(r),kind:"plain"}),t.length===0&&t.push({text:e,kind:"plain"}),t}function Wm(e){return{bad_request:"\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",forbidden:"\uB4F1\uB85D\uB418\uC9C0 \uC54A\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB294 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",lane_not_declared:"\uD604\uC7AC \uACE0\uC815 \uC120\uC5B8\uC5D0 \uD574\uB2F9 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",stale_declaration:"\uC800\uC7A5\uC18C \uC791\uC5C5 \uC120\uC5B8\uC774 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uD654\uBA74\uC5D0\uC11C \uB2E4\uC2DC \uC5F4\uC5B4 \uC8FC\uC138\uC694.",too_large:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uB108\uBB34 \uCEE4\uC11C \uD654\uBA74\uC5D0 \uD45C\uC2DC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",unsupported_content:"\uD14D\uC2A4\uD2B8 \uD615\uC2DD\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB9CC \uD45C\uC2DC\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",unreadable:"\uACE0\uC815\uB41C \uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."}[e]||"\uC2A4\uD06C\uB9BD\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."}function Tu(e){let t=e.getWorkspacePath,r=e.fetchImpl||globalThis.fetch?.bind(globalThis),n=document.createElement("div");n.className="repo-ops-script-viewer-root",document.body.appendChild(n);let s=null,o="loading",a="",i="",u=0,d=null,f=!1;function _(S,P){return P?Um(S).map(w=>w.kind==="plain"?w.text:l`<span
            class="repo-ops-script-viewer__token repo-ops-script-viewer__token--${w.kind}"
            >${w.text}</span
          >`):S}function h(){if(!s)return l``;let S=o==="ready"&&jm(a),P=o==="ready"?a.split(`
`):[];return l`<div
      class="repo-ops-script-viewer"
      role="dialog"
      aria-modal="true"
      aria-label=${`\uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9: ${s.path}`}
    >
      <div
        class="repo-ops-script-viewer__backdrop"
        @click=${()=>W()}
      ></div>
      <section class="repo-ops-script-viewer__panel">
        <header class="repo-ops-script-viewer__header">
          <div class="repo-ops-script-viewer__identity">
            <span
              class="repo-ops-script-viewer__path"
              title=${s.path}
              >${s.path}</span
            >
            <span class="repo-ops-script-viewer__ref"
              >${s.base_ref}@${s.base_sha.slice(0,7)}</span
            >
          </div>
          <div class="repo-ops-script-viewer__actions">
            <button
              type="button"
              class="repo-ops-script-viewer__copy"
              ?disabled=${o!=="ready"}
              @click=${()=>{A()}}
            >
              복사
            </button>
            <button
              type="button"
              class="repo-ops-script-viewer__close"
              aria-label="스크립트 팝업 닫기"
              @click=${()=>W()}
            >
              ✕
            </button>
          </div>
        </header>
        <div class="repo-ops-script-viewer__body" aria-live="polite">
          ${o==="loading"?l`<div class="repo-ops-script-viewer__status">
                스크립트 불러오는 중…
              </div>`:o==="error"?l`<div
                  class="repo-ops-script-viewer__status repo-ops-script-viewer__status--error"
                >
                  ${i}
                </div>`:l`<div class="repo-ops-script-viewer__code" tabindex="0">
                  ${P.map((w,B)=>l`<div class="repo-ops-script-viewer__row">
                        <span
                          class="repo-ops-script-viewer__line-number"
                          aria-hidden="true"
                          >${B+1}</span
                        ><code class="repo-ops-script-viewer__code-line"
                          >${_(w,S)}</code
                        >
                      </div>`)}
                </div>`}
        </div>
      </section>
    </div>`}function C(){Ge(h(),n)}async function A(){if(o!=="ready")return;let S=await Zt(a);se(S?"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC\uB428":"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC \uC2E4\uD328",S?"success":"error")}function I(S){S.key==="Escape"&&s&&(S.preventDefault(),W())}function D(){f||(document.addEventListener("keydown",I),f=!0)}function V(){f&&(document.removeEventListener("keydown",I),f=!1)}async function Y(S,P=null){let w=++u;D(),s={...S},d=P||(document.activeElement instanceof HTMLElement?document.activeElement:null),o="loading",a="",i="",C(),n.querySelector(".repo-ops-script-viewer__close")?.focus();let te=t?t():"";if(!te){o="error",i="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",C();return}if(!r){o="error",i="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD \uAE30\uB2A5\uC744 \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",C();return}let le="/api/repo-ops-script?workspace="+encodeURIComponent(te)+"&lane="+encodeURIComponent(S.lane)+"&base_sha="+encodeURIComponent(S.base_sha);try{let M=await r(le),L=await M.json().catch(()=>({}));if(w!==u)return;if((t?t():"")!==te){W();return}if(!M.ok||!L||L.ok!==!0){o="error",i=Wm(L&&typeof L.error=="string"?L.error:""),C();return}s={lane:L.lane,base_sha:L.base_sha,path:L.path,base_ref:L.base_ref},a=String(L.content),o="ready",C()}catch{if(w!==u)return;o="error",i="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",C()}}function W(){u+=1,V(),s=null,a="",C();let S=d;d=null,S?.isConnected&&S.focus()}function R(){W(),n.remove()}return{open:Y,close:W,destroy:R}}function Cu(e){let t=e.queueStore,r=e.transport,n=e.onChanged||(()=>{}),s=e.onOpenScript;function o(){return t&&t.get()||{}}function a(){let R=o();return typeof R.revision=="number"?R.revision:0}function i(R){t&&R&&R.queue&&typeof R.queue=="object"&&t.set(R.queue)}function u(){let R=o().workspace_info;return R&&typeof R=="object"?R:{}}function d(R,S){return l`<span
      class="worker-repo-ops__vd-badge worker-repo-ops__vd-badge--${R}"
      >${S}</span
    >`}function f(R){if(typeof R!="number"||!Number.isFinite(R))return"";let S=R/6e4;return Number.isInteger(S)?`timeout ${S}\uBD84`:`timeout ${Math.round(R/1e3)}\uCD08`}function _(R){let S=f(R);return S?d("config",S):""}function h(R,S,P){return l`<button
      type="button"
      class="worker-repo-ops__vd-cmd worker-repo-ops__vd-cmd--link"
      .textContent=${P.script}
      @click=${w=>{s&&s({lane:R,base_sha:S.base_sha,path:P.script,base_ref:S.base_ref},w.currentTarget)}}
    ></button>`}function C(R){let S=typeof R.base_sha=="string"?R.base_sha:"",P=`${R.source_path||"repo-ops/config.toml"} @ ${R.base_ref||"?"}${S?`@${S.slice(0,7)}`:""}`;return l`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">
        저장소 작업 선언
        <span class="worker-repo-ops__vd-src">${P}</span>
      </p>
      <div class="worker-repo-ops__lane" data-lane="verify">
        <span class="worker-repo-ops__lane-k">머지 전 검증</span>
        <span class="worker-repo-ops__lane-v"
          >${R.verify?l`${h("verify",R,R.verify)}
              ${_(R.verify.timeout_ms)}`:l`선언 없음${d("absent","verify \uC5C6\uC774 \uD310\uC815")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${R.verify?"\uBA38\uC9C0 \uC804\uC5D0 \uC774 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uD1B5\uACFC\uD574\uC57C \uC790\uACA9\uC744 \uC5BB\uC2B5\uB2C8\uB2E4.":"\uBA38\uC9C0 \uC790\uACA9\uC740 PR/base/head \uC2E0\uC120\uB3C4\xB7mergeability\xB7\uB9AC\uBDF0 \uC601\uC218\uC99D\uC73C\uB85C\uB9CC \uD310\uC815\uD569\uB2C8\uB2E4."}</span
        >
      </div>
      <div class="worker-repo-ops__lane" data-lane="deploy">
        <span class="worker-repo-ops__lane-k">머지 후 배포</span>
        <span class="worker-repo-ops__lane-v"
          >${R.deploy?l`${h("deploy",R,R.deploy)}
              ${_(R.deploy.timeout_ms)}`:l`선언 없음${d("absent","\uBC30\uD3EC \uC5C6\uC74C")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${R.deploy?l`Worker가 <code>.worktrees/.repo-ops-deploy</code>에서 대상
                SHA로 정렬한 뒤 1회 실행합니다.`:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC \uB2E8\uACC4 \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4."}</span
        >
      </div>
    </section>`}function A(R){let S=R.repo_ops&&typeof R.repo_ops=="object"?R.repo_ops:null;return S&&(S.status==="resolved"||S.status==="absent")?C(S):S&&(S.status==="pending"||S.status==="error")?l`<section class="worker-repo-ops__vd" data-seam="repo-ops">
        <p class="worker-repo-ops__vd-title">
          저장소 작업 선언
          <span class="worker-repo-ops__vd-ro"
            >읽기 전용 — config에서 정의</span
          >
        </p>
        <div
          class="worker-repo-ops__vd-line worker-repo-ops__vd-absent"
          data-seam="repo-ops-status"
        >
          ${S.status==="pending"?"\uC120\uC5B8 \uD655\uC778 \uC911":l`선언 읽기
              실패${S.error_code?l` — <code>${S.error_code}</code>`:""}`}
        </div>
      </section>`:l`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">저장소 작업 선언</p>
      <div class="worker-repo-ops__vd-line worker-repo-ops__vd-absent">
        선언 확인 중
      </div>
    </section>`}async function I(R){if(!r)return;let S=await r("worker-auto-repair-toggle",{on:R,expected_revision:a()});if(i(S),S&&S.conflict){let P=await r("worker-auto-repair-toggle",{on:R,expected_revision:a()});i(P)}n()}let D={owned_deploy_worktree_fetch_detached_alignment_recreate:"\uC804\uC6A9 \uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC \uC815\uB82C\xB7\uBCF5\uAD6C",recovered_pre_execution_fetch_timeout_retry_once:"fetch \uD0C0\uC784\uC544\uC6C3 1\uD68C \uBCF5\uAD6C",repo_serial_lock_wait:"\uC800\uC7A5\uC18C \uC21C\uCC28 \uC2E4\uD589 \uB300\uAE30",restart_operation_adoption:"\uC7AC\uC2DC\uC791 \uD6C4 \uC791\uC5C5 \uC778\uACC4",exact_input_exit_zero_evidence_adoption:"\uB3D9\uC77C \uC785\uB825 \uC131\uACF5 \uC99D\uAC70 \uC778\uACC4",descendant_success_covers_ancestor_rows:"\uCD5C\uC2E0 SHA \uC131\uACF5\uC774 \uC774\uC804 \uD589 \uCEE4\uBC84",owned_verify_candidate_cleanup:"\uAC80\uC99D \uC784\uC2DC \uCCB4\uD06C\uC544\uC6C3 \uC815\uB9AC",script_retry:"\uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4",auto_repair_session:"\uC790\uB3D9 \uD574\uACB0 \uC138\uC158",user_triggered_session:"\uC0AC\uC6A9\uC790 \uD574\uACB0 \uC138\uC158",automatic:"\uC790\uB3D9",user_action_only:"\uC0AC\uC6A9\uC790 \uD074\uB9AD",script_identity_present:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC788\uC744 \uB54C\uB9CC",per_completion_chain:"\uC644\uB8CC \uCCB4\uC778\uB2F9",unbounded:"\uD69F\uC218 \uC81C\uD55C \uC5C6\uC74C",bounded_single_script_retry_exceeded:"\uB2E8\uC77C \uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4 \uD55C\uB3C4 \uCD08\uACFC",baseline_failure_ignore:"\uAE30\uC874 \uC2E4\uD328 \uBB34\uC2DC",config_or_script_deletion_to_bypass_gate:"\uC124\uC815\xB7\uC2A4\uD06C\uB9BD\uD2B8 \uC0AD\uC81C\uB85C \uAC8C\uC774\uD2B8 \uC6B0\uD68C",credential_entry:"\uC790\uACA9\uC99D\uBA85 \uC785\uB825\xB7\uCD9C\uB825",destructive_action:"\uD30C\uAD34\uC801 \uC791\uC5C5",history_rewrite:"\uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131",agent_self_report_as_success:"\uC138\uC158 \uC790\uAE30\uBCF4\uACE0\uB97C \uC131\uACF5 \uCC98\uB9AC",unbounded_repair_session_retry:"\uBB34\uD55C \uD574\uACB0 \uC138\uC158 \uBC18\uBCF5"};function V(R,S,P){return l`<div class="worker-repo-ops__policy-group" data-policy=${P}>
      <div class="worker-repo-ops__policy-label">${R}</div>
      <ul class="worker-repo-ops__policy-list">
        ${S.map(w=>l`<li data-token=${w}>
              ${D[w]||w}
            </li>`)}
      </ul>
    </div>`}function Y(R){return l`<div
      class="worker-repo-ops__policy-group"
      data-policy="resolution-ladder"
    >
      <div class="worker-repo-ops__policy-label">해결 사다리</div>
      <ol class="worker-repo-ops__policy-list">
        ${R.map(S=>{let P=[D[S.trigger]||S.trigger];return Number.isInteger(S.attempts_per_operation_attempt)?P.push(`operation\uB2F9 ${S.attempts_per_operation_attempt}\uD68C`):Number.isInteger(S.attempts)?P.push(`${D[S.budget]||S.budget} ${S.attempts}\uD68C`):Number.isInteger(S.sessions_per_user_action)&&P.push(`${S.sessions_per_user_action}\uD68C`,D[S.user_actions]||S.user_actions),S.applies_when&&P.push(D[S.applies_when]||S.applies_when),l`<li data-token=${S.id}>
            <strong>${D[S.id]||S.id}</strong>
            <span>${P.filter(Boolean).join(" \xB7 ")}</span>
          </li>`})}
      </ol>
    </div>`}function W(){let R=o(),S=R.auto_repair!==!1,P=R.repo_operation_policy&&typeof R.repo_operation_policy=="object"?R.repo_operation_policy:null,w=Array.isArray(R.repo_operations)?R.repo_operations:[],B=w.find(L=>L.state==="repairing"),te=w.filter(L=>L.state==="failed"||L.state==="repairing"),le=te.length?Math.min(...te.map(L=>typeof L.repair?.remaining=="number"?L.repair.remaining:0)):P?.auto_repair?.resolution_ladder?.find(L=>L.id==="auto_repair_session")?.attempts??1,M=Array.isArray(P?.auto_repair?.resolution_ladder)?P.auto_repair.resolution_ladder:[];return l`<section
      class="worker-repo-ops__repair"
      data-seam="auto-repair"
    >
      <p class="worker-repo-ops__vd-title">
        자동 해결
        <span class="worker-repo-ops__vd-ro"
          >자동화(대기열·머지)와 독립된 스위치</span
        >
      </p>
      <label class="worker-repo-ops__repair-toggle">
        <input
          type="checkbox"
          class="worker-repo-ops__repair-input"
          .checked=${S}
          @change=${L=>{I(L.target.checked)}}
        />
        검증·배포 실패를 자동으로 해결 시도
      </label>
      <div class="worker-repo-ops__repair-state">
        <span
          class="worker-repo-ops__repair-value"
          data-seam="auto-repair-value"
          >${S?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}</span
        >
        <span
          class="worker-repo-ops__repair-budget"
          data-seam="auto-repair-budget"
          >남은 자동 해결 ${le}회</span
        >
        <span
          class="worker-repo-ops__repair-session"
          data-seam="auto-repair-session"
          >${B?`\uD574\uACB0 \uC138\uC158 \uC2E4\uD589 \uC911 \xB7 ${B.repair?.owner_bead||B.operation_id}`:"\uC2E4\uD589 \uC911\uC778 \uD574\uACB0 \uC138\uC158 \uC5C6\uC74C"}</span
        >
      </div>
      ${P?l`<details
            class="worker-repo-ops__policy"
            data-seam="policy-lists"
          >
            <summary>
              Worker 자동 처리 기준
              <span class="worker-repo-ops__policy-count"
                >자동 ${(P.worker_automatic||[]).length} · 해결 사다리
                ${M.length} · 금지
                ${(P.never_automatic||[]).length}</span
              >
            </summary>
            ${V("Worker\uAC00 \uC790\uB3D9 \uCC98\uB9AC",P.worker_automatic||[],"worker-automatic")}
            ${P.supported===!1||P.schema_version!==2?l`<div
                  class="worker-repo-ops__policy-group"
                  data-policy="resolution-ladder"
                >
                  ${`\uACC4\uC57D \uC2A4\uD0A4\uB9C8 \uBD88\uC77C\uCE58 \u2014 \uC790\uB3D9 \uD574\uACB0\uC774 \uC815\uC9C0\uB418\uC5C8\uC2B5\uB2C8\uB2E4 (v${P.schema_version})`}
                </div>`:Y(M)}
            ${V("\uC790\uB3D9\uC73C\uB85C \uD558\uC9C0 \uC54A\uC74C",P.never_automatic||[],"never-automatic")}
          </details>`:""}
    </section>`}return{template(){return l`<details class="worker-repo-ops-settings">
        <summary class="worker-repo-ops-settings__summary">
          저장소 작업 · 검증/배포 선언 · 자동 해결
        </summary>
        ${A(u())} ${W()}
      </details>`}}}var zm=20,Ru={verify:"\uBA38\uC9C0 \uC804 \uAC80\uC99D",deploy:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC"},Iu={verify_script_failure:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0",verify_script_failure_pre_merge:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0 \uD6C4 \uBA38\uC9C0",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328 \uD574\uACB0",interrupted_without_terminal_exit:"\uC911\uB2E8\uB41C \uC791\uC5C5 \uC9C4\uB2E8"};function Hm(e,t,r=zm){let n=[];for(let s of Array.isArray(e)?e:[])!s||typeof s!="object"||n.push({type:"operation",id:s.operation_id,at:typeof s.finished_at=="number"?s.finished_at:typeof s.requested_at=="number"?s.requested_at:null,operation:s});for(let s of Array.isArray(t)?t:[])!s||typeof s!="object"||n.push({type:"cleanup",id:s.bead_id,at:typeof s.at=="number"?s.at:null,cleanup:s});return n.sort((s,o)=>s.at===null&&o.at===null?String(s.id||"").localeCompare(String(o.id||"")):s.at===null?1:o.at===null?-1:o.at-s.at),n.slice(0,Math.max(0,r))}function Lu(e){if(e.type==="cleanup")return"warn";let t=e.operation.state;return t==="succeeded"?"ok":t==="failed"?"fail":"live"}function Gm(e){if(e.type==="cleanup")return"\uBA48\uCDA4";switch(e.operation.state){case"succeeded":return"\uC131\uACF5";case"failed":return"\uC2E4\uD328";case"repairing":return"\uC790\uB3D9 \uD574\uACB0 \uC911";case"retry_pending":return"\uC7AC\uC2DC\uB3C4 \uC911";case"running":return"\uC2E4\uD589 \uC911";default:return"\uB300\uAE30"}}function Ou(e){let t=e.filter(r=>r.value);return t.length===0?"":l`<details class="worker-ev__details">
    <summary>세부</summary>
    <dl class="worker-ev__kv">
      ${t.map(r=>l`<div>
            <dt>${r.term}</dt>
            <dd>${r.value}</dd>
          </div>`)}
    </dl>
  </details>`}function Mu(e,t="",r=!1){return!e&&!t?"":l`<p
    class="worker-ev__explain${r?" worker-ev__explain--warn":""}"
  >
    <span class="worker-ev__cause">${e}</span>${t?l`<br />${t}`:""}
  </p>`}function Vm(e){if(e.state!=="failed"||e.superseded_by)return"";let t=e.repair||{},r=typeof t.remaining=="number"?t.remaining:0,n=e.failure_kind==="verify_script_failure"&&e.verify_stage==="pre_merge"?"verify_script_failure_pre_merge":e.failure_kind||"",s=r<=0;return l`<div class="worker-ev__acts">
    <button
      type="button"
      class="worker-ev__btn worker-ev__btn--primary worker-repo-op__resolve"
      data-operation-id=${e.operation_id}
      data-failure-kind=${e.failure_kind||""}
      title="해결 세션을 엽니다"
    >
      ${Object.hasOwn(Iu,n)?Iu[n]:"\uC2E4\uD328 \uD574\uACB0 \uC138\uC158 \uC2DC\uC791"}
    </button>
    <span class="worker-ev__btn-sub"
      >${s?"\uC790\uB3D9 \uD574\uACB0\uC744 \uB2E4 \uC37C\uC2B5\uB2C8\uB2E4 \xB7 \uB20C\uB7EC\uC11C \uD574\uACB0 \uC138\uC158\uC744 \uC5FD\uB2C8\uB2E4":`\uC790\uB3D9 \uD574\uACB0 ${r}\uD68C\uAC00 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4`}</span
    >
    ${t.attempt_id?l`<button
          type="button"
          class="worker-ev__btn worker-repo-op__session"
          data-attempt-id=${t.attempt_id}
        >
          해결 세션 보기
        </button>`:""}
    ${e.dismissed?"":l`<button
          type="button"
          class="worker-ev__btn worker-repo-op__dismiss"
          data-operation-id=${e.operation_id}
          title="사람이 확인한 실패로 접수합니다 — 기록은 그대로 남고 해결 필요 집계에서만 빠집니다"
        >
          기록 닫기
        </button>`}
  </div>`}function Km(e){let t=e.operation,r=t.state==="failed",n=t.failure?t.failure.code:"";return l`<li
    class="worker-ev"
    data-operation-id=${t.operation_id}
    data-state=${t.state}
  >
    <span
      class="worker-ev__t"
      title=${e.at?kt(e.at):""}
      >${Xs(e.at)||"\u2014"}</span
    >
    <span class="worker-ev__node" aria-hidden="true"
      ><span class="worker-ev__dot worker-ev__dot--${Lu(e)}"></span
    ></span>
    <div class="worker-ev__body">
      <div class="worker-ev__line1">
        <span class="worker-ev__what"
          >${Object.hasOwn(Ru,t.kind)?Ru[t.kind]:t.kind}</span
        >
        <span class="worker-ev__meta"
          >${t.target_base}@${Ys(t.target_sha)}${typeof t.elapsed_ms=="number"?` \xB7 ${Zs(t.elapsed_ms)}`:""}</span
        >
        <span class="worker-ev__st worker-ev__st--${Lu(e)}"
          >${Gm(e)}</span
        >
        ${t.dismissed?l`<span class="worker-ev__st worker-ev__st--quiet">접수됨</span>`:""}
        ${t.superseded_by?l`<span class="worker-ev__st worker-ev__st--quiet">덮임</span>`:""}
      </div>
      ${r?Mu(Dc(t.failure_kind,n)):""}
      ${Vm(t)}
      ${Ou([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:r?n:""},{term:"script",value:[t.script_path||"",t.script_blob_sha?`blob ${Ys(t.script_blob_sha)}`:"",Number.isInteger(t.exit_code)?`exit ${t.exit_code}`:""].filter(Boolean).join(" \xB7 ")},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function Ym(e){let t=e.cleanup,r=Hr(t.step);return l`<li
    class="worker-ev"
    data-bead-id=${t.bead_id}
    data-state="cleanup_stalled"
  >
    <span
      class="worker-ev__t"
      title=${e.at?kt(e.at):""}
      >${Xs(e.at)||"\u2014"}</span
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
        ${Ic(t.step).map(n=>l`<li
              class="worker-step worker-step--${n.state}"
              data-step=${n.step}
            >
              <span class="worker-step__pip" aria-hidden="true"></span>
              <span class="worker-step__lb">${n.label}</span>
            </li>`)}
      </ol>
      ${Mu(ro(t.reason),typeof t.retry_count=="number"&&t.retry_count>0?`${t.retry_count}\uD68C \uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uD6C4\uC5D0\uB3C4 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.`:"\uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.",!0)}
      <div class="worker-ev__acts">
        <button
          type="button"
          class="worker-ev__btn worker-ev__btn--warn worker-cleanup__resume"
          data-bead-id=${t.bead_id}
        >
          정리 재개${r?` \u2014 ${r} \uB2E8\uACC4\uBD80\uD130`:""}
        </button>
        ${t.repair_eligible?l`<button
              type="button"
              class="worker-ev__btn worker-ev__btn--primary worker-repo-op__resolve"
              data-operation-id=${`cleanup:${t.bead_id}`}
              data-failure-kind=${t.failure_code||t.reason||""}
            >
              실패 해결 세션 시작
            </button>`:""}
      </div>
      ${Ou([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:t.reason||""},{term:"\uC9C4\uB2E8",value:t.detail||""},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function Zm(e){return l`<section class="worker-repo-drawer" data-seam="repo-ops-timeline">
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
    ${e.events.length===0?l`<div class="worker-repo-drawer__empty">기록 없음</div>`:l`<ul class="worker-rail">
          ${e.events.map(t=>t.type==="cleanup"?Ym(t):Km(t))}
        </ul>`}
  </section>`}function Pu(e,t={}){let r=null;function n(){Ge(r?Zm(r):l``,e)}e.addEventListener("click",a=>{a.target?.closest?.('[data-seam="repo-ops-close"]')&&o()});function s(a){r={events:Hm(a.operations,a.cleanup_failures),repo:a.repo||""},n()}function o(){r!==null&&(r=null,n(),t.onClose&&t.onClose())}return{open:s,close:o,isOpen:()=>r!==null,refresh(a){r&&s(a)}}}var Xm="tab:worker:ready",Qm="tab:worker:blocked",Jm="tab:worker:in-progress",eg="tab:worker:closed",oo=1,Du=5;function Nu(e){return Fs(e).path.length>0}var Bu="beads-ui.worker.candidate-filter",Ia={show_blocked:!1,spec:"all"};function tg(){try{let e=window.localStorage.getItem(Bu);if(!e)return{...Ia};let t=JSON.parse(e);if(!t||typeof t!="object")return{...Ia};let r=t.spec;return{show_blocked:t.show_blocked===!0,spec:r==="with"||r==="without"?r:"all"}}catch{return{...Ia}}}function rg(e){try{window.localStorage.setItem(Bu,JSON.stringify(e))}catch{}}function ng(e,t){let r=i=>t.show_blocked||!i.blocked,n=i=>t.spec==="all"||(t.spec==="with"?i.has_spec:!i.has_spec),s=[],o=0,a=0;for(let i of e){let u=r(i),d=n(i);u&&d?s.push(i):!u&&d?o+=1:u&&!d&&(a+=1)}return{visible:s,hidden_blocked:o,hidden_spec:a}}var sg=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],Uu="bdui.worker.candidate_sort",og=[{value:"spec",label:"spec \uC6B0\uC120"},{value:"board",label:"Board \uC21C\uC11C"},{value:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131\uC21C"}],ao="spec";function ag(){try{let e=window.localStorage.getItem(Uu);return e==="board"||e==="created"||e==="spec"?e:ao}catch{return ao}}function ig(e){try{window.localStorage.setItem(Uu,e)}catch{}}var Wu="bdui.worker.done-range";function lg(){try{let e=window.localStorage.getItem(Wu);return Bt(e)?e:Dt}catch{return Dt}}function cg(e){try{window.localStorage.setItem(Wu,e)}catch{}}var ug="(max-width: 640px)",zu="beads-ui.worker.lane-collapsed",Gn={queue:!0,done:!0};function dg(){try{let e=window.localStorage.getItem(zu);if(!e)return{...Gn};let t=JSON.parse(e);return!t||typeof t!="object"?{...Gn}:{queue:typeof t.queue=="boolean"?t.queue:Gn.queue,done:typeof t.done=="boolean"?t.done:Gn.done}}catch{return{...Gn}}}function pg(e){try{window.localStorage.setItem(zu,JSON.stringify(e))}catch{}}function qu(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let r=typeof t.title=="string"?t.title:t.id||"";return r.length>22?`${r.slice(0,22)}\u2026`:r}function fg(e,t,r){let n=Array.isArray(e)?e.slice():[];return t==="created"?n.sort(Fr):(n.sort(ds(r)),t==="board"?n:[...n.filter(Nu),...n.filter(s=>!Nu(s))])}function _g(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function mg(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function gg(e){let t=e?.blocked_info;if(t&&typeof t=="object"){let s=Array.isArray(t.blockers)?t.blockers.filter(o=>typeof o=="string"&&o.length>0):[];return s.length>0?`\u{1F512} ${s.join(", ")}`:"\u{1F512} blocked"}let n=(Array.isArray(e?.dependencies)?e.dependencies:[]).map(s=>{if(typeof s=="string")return s;if(!s||typeof s!="object")return"";let o=s.type??s.dependency_type;return o!==void 0&&o!=="blocks"?"":s.depends_on_id||s.id||""}).filter(Boolean);return n.length>0?`\u{1F512} ${n.join(", ")}`:"\u{1F512} blocked"}function Fu(e){switch(e){case"not_in_pr_wait":return"PR \uB300\uAE30 \uC0C1\uD0DC \uB3D9\uAE30\uD654 \uC2E4\uD328";case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";case"spec_id_missing":return"\uC2A4\uD399 ID \uAE30\uB85D \uC5C6\uC74C";default:return e}}function bg(e){if(e==="lane_occupied")return"\uC2E4\uD589 \uB808\uC778\uC5D0 \uB0A8\uC544 \uC788\uC5B4 \uBA38\uC9C0 \uB300\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4";let t="\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)";return typeof e=="string"&&e.length>0?`${t}: ${e}`:t}function hg(e,t=null){if(e==="worker_sessions_busy")return"\uD574\uC18C \uB300\uAE30 \u2014 \uC2E4\uD589 \uC2AC\uB86F \uB300\uAE30 \uC911";if(typeof e!="string"||!e.startsWith("completion_waiting:"))return null;let r=e.slice(19);if(r.length===0)return null;switch(r){case"gating":{let n=t?.repair_sessions_used;return typeof n=="number"&&n>0?"\uC218\uC815 \uACB0\uACFC \uC7AC\uD655\uC778 \uC911":"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911"}case"repairing":return"\uC790\uB3D9 \uC218\uC815 \uC911";case"waiting_repair_pr":return"\uC218\uC815 PR \uB300\uAE30 \uC911";case"merging":return"\uBA38\uC9C0 \uC911";case"cleaning":return"\uB9C8\uBB34\uB9AC \uC911";case"paused":return"\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";case"needs_human":return"\uD655\uC778 \uD544\uC694";default:return null}}function yg(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}function vg(e){if(!e||typeof e!="object")return null;switch(e.state){case"pending":return{badge:"implementation review \uB300\uAE30",live:!1,alert:!1};case"reviewing":return{badge:"implementation review \uC911",live:!0,alert:!1};case"revising":return{badge:"review \uC218\uC815 \uC911 \xB7 1\uD68C",live:!0,alert:!1};case"failed":{let r=(typeof e.failure_reason=="string"?e.failure_reason:"").replace(/[\u0000-\u001f\u007f]/g," ").slice(0,120);return{badge:r.trim().length>0?`review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328: ${r.trim()}`:"review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328",live:!1,alert:!0}}default:return null}}function La(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}function wg(e){if(!e||typeof e!="object")return null;let t=Number.isInteger(e.repair_sessions_used)?Math.max(0,e.repair_sessions_used):0,r=Number.isInteger(e.repair_session_cap)?Math.max(0,e.repair_session_cap):0,n=e.current_repair&&typeof e.current_repair=="object"?e.current_repair:null,s=n&&typeof n.pr_number=="number"?n.pr_number:null,o="";switch(e.phase){case"gating":o=t>0?"\uC218\uC815 \uACB0\uACFC \uC7AC\uD655\uC778 \uC911":"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";break;case"repairing":o="\uC790\uB3D9 \uC218\uC815 \uC911";break;case"waiting_repair_pr":o=s?`\uC218\uC815 PR #${s} \uB300\uAE30 \uC911`:"\uC218\uC815 PR \uB300\uAE30 \uC911";break;case"merging":o=e.subject_role==="repair"?s?`\uC218\uC815 PR #${s} \uBA38\uC9C0 \uC911`:"\uC218\uC815 PR \uBA38\uC9C0 \uC911":"\uBA38\uC9C0 \uC911";break;case"cleaning":o="\uB9C8\uBB34\uB9AC \uC911";break;case"paused":o="\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":o="\uD655\uC778 \uD544\uC694";break;case"completed":return null;default:return null}let a=[o,`\uC790\uB3D9 \uC218\uC815 \uD69F\uC218 ${t}/${r}`];return e.head_sha&&a.push(`head ${e.head_sha}`),e.base_sha&&a.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&a.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`),e.active_attempt_id&&a.push(`attempt ${e.active_attempt_id}`),n&&typeof n.bead_id=="string"&&a.push(`repair ${n.bead_id}`),e.evidence&&a.push(e.evidence),e.log_path&&a.push(e.log_path),{badge:o,title:a.join(`
`),alert:e.phase==="needs_human",lock_actions:e.phase!=="paused"&&e.phase!=="needs_human",repair_pr_url:n&&typeof n.pr_url=="string"?n.pr_url:"",repair_pr_number:s}}function ju(e){if(!e||typeof e!="object")return[];let t=e.blocking_codes;return Array.isArray(t)?t.filter(r=>typeof r=="string"&&r.length>0):[]}function kg(e){let t=e.queue_failure?`\uBA38\uC9C0 \uC2E4\uD328 \uC6D0\uBB38: ${e.queue_failure}`:e.auto_skip?`\uC790\uB3D9 \uC81C\uC678 \uC6D0\uBB38: ${e.auto_skip}`:"",r=(n,s={})=>{let o=[s.title||"",t].filter(Boolean);return{label:n,title:o.join(`
`),live:s.live===!0,alert:s.alert===!0}};return e.continuation_required?r("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694",{alert:!0}):e.merge_step?e.gate?.tier==="merged"?r("\uBA38\uC9C0\uB428",{title:e.merge_step.label,alert:e.merge_step.failed===!0}):r("\uBA38\uC9C0 \uC911",{title:e.merge_step.label,live:!0}):e.conflict_badge?r(e.conflict_badge,{live:e.conflict_live===!0}):e.head_review&&e.head_review.state!=="failed"?r("\uB9AC\uBDF0 \uC9C4\uD589 \uC911",{title:e.head_review.badge,live:e.head_review.live===!0}):e.recovery?.lock_actions?r(e.recovery.badge,{title:e.recovery.title,live:!0}):e.cleanup_failed?r(e.cleanup_label?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${e.cleanup_label}`:"\uC815\uB9AC \uBA48\uCDA4",{title:e.cleanup_failed.reason||"",alert:!0}):e.base_exception?r("\uB2E4\uB978 base \uB300\uC0C1",{title:e.base_exception,alert:!0}):e.conflicting?r("\uCDA9\uB3CC \uD574\uACB0 \uD544\uC694",{alert:!0}):e.gate?.reason==="base_behind"?r("base \uAC31\uC2E0 \uD544\uC694",{alert:!0}):e.gate?.reason==="review_receipt_missing"||e.gate?.reason==="review_receipt_stale"?r("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694",{title:e.gate.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2C8\uAC70\uB098 \uC870\uC0C1 \uD655\uC778\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131\xB7\uBE0C\uB79C\uCE58 \uB9AC\uC14B \uBCF5\uAD6C \uACBD\uB85C\uB85C, \uAD00\uCE21\uB41C \uCD5C\uC885 head \uC804\uCCB4\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uD569\uB2C8\uB2E4":"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uAD00\uCE21\uB41C \uCD5C\uC885 head \uC804\uCCB4\uB97C \uB9AC\uBDF0\uD574\uC57C \uBA38\uC9C0\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4",alert:!0}):e.gate?.reason==="spec_id_missing"?r("\uC2A4\uD399 ID \uB204\uB77D",{title:"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id \uD544\uC694",alert:!0}):e.gate?.reason==="review_receipt_invalid"?r("\uB9AC\uBDF0 \uAE30\uB85D \uC624\uB958",{title:"review_receipt_invalid",alert:!0}):ju(e.receipt_check).length>0?r("\uC601\uC218\uC99D \uD655\uC778 \uD544\uC694",{title:`\uC131\uB9BD\uD558\uC9C0 \uC54A\uB294 \uC2E4\uD589 \uC601\uC218\uC99D \u2014 ${ju(e.receipt_check).join(", ")}`,alert:!0}):e.head_review?.state==="failed"?r("\uB9AC\uBDF0 \uC2E4\uD328",{title:e.head_review.failure_reason||"",alert:!0}):e.recovery?r(e.recovery.badge,{title:e.recovery.title,alert:!0}):e.gate?.tier==="verify"&&e.gate.gate_badge==="\uAC80\uC99D \uC2E4\uD328"?r("\uAC80\uC99D \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.queue_failure?r(`\uBA38\uC9C0 \uC2E4\uD328 \u2014 ${Fu(e.queue_failure)}`,{title:e.queue_failure,alert:!0}):e.auto_skip?r(`\uC790\uB3D9 \uC81C\uC678 \u2014 ${Fu(e.auto_skip)}`,{title:e.auto_skip,alert:!0}):e.queued&&!e.queue_active?r(`\uBA38\uC9C0 \uB300\uAE30 #${e.queue_position}`):e.gate?.enabled===!0?r("\uBA38\uC9C0 \uAC00\uB2A5"):e.gate?.tier==="merged"?r("\uBA38\uC9C0\uB428"):e.gate?.tier==="closed_unmerged"?r("\uB2EB\uD798",{alert:!0}):e.activity?r("\uD655\uC778 \uC911",{live:!0}):e.gate?.tier==="undecidable"||e.gate?.reason==="mergeability_unknown"?r("\uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.gate?.tier==="unobserved"||e.gate?.tier==="verify"||e.gate?.gate_badge==="\uAD00\uCE21 \uB300\uAE30"?r("\uD655\uC778 \uC911"):e.gate?.gate_badge?r(e.gate.gate_badge,{title:e.gate.reason||"",alert:e.gate.enabled!==!0}):null}function $g(e,t,r,n,s=null,o=null,a=null,i=!1,u=null,d=!0,f=null,_=null,h=null,C={},A=!1,I=!1,D={}){let V=!!u&&u.position>0,Y=!!u?.continuation_action&&u.continuation_action.continuation===null,W=!!u&&u.active===!0,R=u&&u.failure||null,S=hg(u?u.waiting:null,h),P=r[e]||null,w=P&&P.gate?P.gate:null,B=P&&P.pr?P.pr:null,te=wg(h),le=yg(u?u.resolution:null),M=vg(u?u.head_review:null),L=u&&u.head_review||null,ue=u&&u.authority||null,ge=!!L&&["pending","reviewing","revising"].includes(L.state),$e=V&&!W&&(L?.state==="failed"||!ue||ue.source==="automatic"&&!I),Be=a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":le?le.badge:a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":S,Qe=!!w&&w.base_badge==="\uCDA9\uB3CC",Ve=!!w&&w.enabled===!0,Me=Un({bead_id:e,merge_sha:D.merge_sha,cleanup_cursor:D.cleanup_cursor,merge_progress:o&&o.merge_progress?o.merge_progress:null,cleanup_failed:n,repo_operations:D.repo_operations}),Ue=to(Me),ie=!!n&&["child_sweep","branch_cleanup","parent_close"].includes(n.step)&&!!w&&w.tier==="merged",Ae=i&&!!n&&!!w&&w.tier==="merged",Ie=$e&&(Ve||Qe||w?.reason==="base_behind"||w?.reason==="review_receipt_missing"||w?.reason==="review_receipt_stale"||ie||Ae),Ee=i&&Qe&&d===!1,be=pr(C,e,{external:i,merge_active:W||Me?.step==="merge",merge_queued:V,conflict_active:!!a,cleanup_active:Ue,merged:!!n||w?.tier==="merged"}),We=!!be.operation,et=!ie&&!!n&&n.step==="repo_operations",Te=kg({continuation_required:Y,merge_step:Me,conflict_badge:Be,conflict_live:le?.live===!0||a==="running",head_review:L&&M?{...M,state:L.state,failure_reason:L.failure_reason}:null,recovery:te,cleanup_failed:n,cleanup_label:n?Hr(n.step):null,base_exception:_,conflicting:Qe,gate:w,receipt_check:P&&P.receipt_check?P.receipt_check:null,queue_failure:R,auto_skip:f,queued:V,queue_active:W,queue_position:u?u.position:0,activity:Be?null:o&&o.activity||null}),tt=Te?.live===!0&&Te.title?l`<span title=${Te.title}>${Te.label}</span>`:Te?.label||null;return{id:e,title:i?l`${t}<span class="muted"> · 세션</span>`:t,reason:n&&Me?.active!==!0?eo(n.step):"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",worker_serial:A,external:i,pr_number:B&&typeof B.number=="number"?B.number:null,pr_url:B&&typeof B.url=="string"?B.url:"",completion_badge:Te?.live!==!0&&Te?.title?Te.label:null,completion_title:Te?.title||"",completion_repair_pr_url:te?te.repair_pr_url:"",completion_repair_pr_number:te?te.repair_pr_number:null,badges:tt?[tt]:[],live_badge:Te?.live===!0?tt:null,usage:s,alert:Te?.alert===!0,merge_action:w?.tier==="merged"&&!ie&&!Ae||et?!1:!V||Y||$e,timeline_action:et,cancel_action:V&&!Y,cancel_enabled:(!W||ge)&&!(te&&te.lock_actions),cancel_title:te&&te.lock_actions?`${te.badge} \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694`:W&&!ge?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":ge?"review \uC9C4\uD589\uC744 \uCDE8\uC18C\uD558\uACE0 \uBA38\uC9C0 \uAD8C\uD55C\uC744 \uD3D0\uAE30\uD569\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:be,discard_action:be.action,merge_step:Me,discard_enabled:be.enabled,discard_title:be.title,merge_enabled:!Me&&!a&&!We&&!_&&!(te&&te.lock_actions)&&!Ee&&!et&&(Ve||Qe||w?.reason==="base_behind"||w?.reason==="review_receipt_missing"||w?.reason==="review_receipt_stale"||ie||Ae||Ie),merge_label:Y?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":ie||Ae?"\uC815\uB9AC \uC7AC\uAC1C":Qe&&!Me&&!ie?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":w?.reason==="base_behind"?"base \uAC31\uC2E0 \uD6C4 \uBA38\uC9C0":w?.reason==="review_receipt_missing"||w?.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0":$e?"\uB2E4\uC2DC \uBA38\uC9C0":void 0,merge_title:We?be.error?`\uD3D0\uAE30 \uC2E4\uD328: ${be.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${be.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:Y?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":Me?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${Me.label}`:Ae?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Ee?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":ie?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Qe?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":w?.reason==="base_behind"?"base\uB97C \uC790\uB3D9 \uAC31\uC2E0\uD55C \uB4A4 \uBA38\uC9C0\uD569\uB2C8\uB2E4":w?.reason==="review_receipt_missing"||w?.reason==="review_receipt_stale"?"\uC790\uB3D9 \uB9AC\uBDF0 \uC138\uC158 \uD6C4 \uC2B9\uC778\uB418\uBA74 \uBA38\uC9C0\uD569\uB2C8\uB2E4":w?.reason==="spec_id_missing"?"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id\uB85C \uAE30\uB85D\uD55C \uB4A4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":Ve?`\uBA38\uC9C0 (${w.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:w&&w.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${w&&w.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function Oa(e,t={}){let{transport:r,issueStores:n,queueStore:s,analysisStore:o,sessionLogStore:a,uiOrderStore:i,gotoIssue:u,getWorkspacePath:d,doneRange:f,onDoneRangeChange:_}=t,h=n?fs(n,i):null,C=ms({transport:r,uiOrderStore:i}),A=null,I=[],D=tg(),V=null,Y=ag(),W=Bt(f)?f:lg(),R=new Map;function S(){let c=lr.find(m=>m.value===W);return c?c.label:"\uC624\uB298"}let P=dg(),w=!1,B=new Set,te=new Set,le=new Set,M=new Set,L=[],ue=document.createElement("div");ue.className="worker-console";let ge=document.createElement("div");ge.className="worker-top";let $e=document.createElement("div");$e.className="worker-drawer-overlay",$e.hidden=!0;let Be=document.createElement("div");Be.className="worker-drawer-overlay__backdrop";let Qe=document.createElement("div");Qe.className="worker-drawer-host";let Ve=document.createElement("div");Ve.className="worker-drawer-host",Ve.hidden=!0,$e.append(Be,Qe,Ve);let Me=document.createElement("div");Me.className="worker-lanes-host",ue.append(ge,$e,Me),e.appendChild(ue);let Ue=null,ie=null,Ae=qs(Qe,{transport:r,sessionLogStore:a,onClose:()=>{Ue=null,ie=null,$e.hidden=!0,Q()}}),Ie=Pu(Ve,{onClose:()=>{Ve.hidden=!0,$e.hidden=!0,Q()}}),Ee=Tu({getWorkspacePath:d||(()=>"")}),be=d&&d()||"",We=Cu({queueStore:s,transport:r,onChanged:()=>Q(),onOpenScript:(c,m)=>{Ee.open(c,m)}}),et=o?xu(ue,{queueStore:s,analysisStore:o,transport:r,getWorkspacePath:d,onOpenTranscript:(c,m)=>Je(c,m)}):null;function Te(){return s&&s.get()||{revision:0,auto_advance:!1,auto_merge:!1,slots:oo,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]}}function tt(){let c=Te(),m=typeof c.serial_lane_count=="number"&&Number.isInteger(c.serial_lane_count)&&c.serial_lane_count>0?Math.min(c.serial_lane_count,5):0,E=Array.isArray(c.serial_lanes)?c.serial_lanes:[],z=[];for(let ke of E){if(z.length>=m)break;!ke||typeof ke.id!="string"||!/^s[1-5]$/.test(ke.id)||!Array.isArray(ke.entries)||z.push({id:ke.id,label:`\uC9C1\uB82C ${ke.id.slice(1)}`,count:ke.entries.length})}return z.length===0?null:[{id:"parallel",label:"\uBCD1\uB82C",count:(Array.isArray(c.queue)?c.queue:[]).length},...z]}function K(c){if(!V||!c.some(E=>E.id===V))return null;let m=tt();return m?{bead_id:V,lanes:m}:null}function F(){let c=Te();return typeof c.revision=="number"?c.revision:0}function re(c){c&&c.queue&&s&&s.set(c.queue)}function Oe(){let c=Te().queue;return Array.isArray(c)?c.length:0}async function Fe(c,m,E){if(!r)return;let z=()=>({bead_id:c,...m==="parallel"?{}:{lane:m},...E===void 0?{}:{index:E},expected_revision:F()}),oe=await r("worker-queue-place",z());re(oe),oe&&oe.conflict&&await r("worker-queue-place",z()).then(re)}async function ze(c,m,E){if(!r)return;let z=()=>({bead_id:c,...m==="parallel"?{}:{lane:m},to_index:E,expected_revision:F()}),oe=await r("worker-queue-reorder",z());re(oe),oe&&oe.conflict&&await r("worker-queue-reorder",z()).then(re)}async function Ce(c){if(!r)return;let m=await r("worker-queue-remove",{bead_id:c,expected_revision:F()});re(m),m&&m.conflict&&await r("worker-queue-remove",{bead_id:c,expected_revision:F()}).then(re)}async function ct(c){if(!r||!c)return;let m=await r("worker-attempt-pause",{attempt_id:c});m&&m.paused===!1&&m.reason&&se(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${m.reason}`,"error",2400)}async function Ye(c){if(!r||!c)return;let m=await sn();if(m===null)return;let E=async(oe={})=>await r("worker-attempt-resume",{attempt_id:c,expected_revision:F(),...m!==""?{instructions:m}:{},...oe}),z=await E();re(z),z&&z.conflict&&(z=await E(),re(z)),z=await mr(z,(oe,ke)=>E({continuation:oe,decision_token:ke}),{onResult:re,refresh:()=>E()}),z&&z.resumed===!1&&!z.conflict&&z.reason&&se(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${z.reason}`,"error",2400)}async function H(c){if(!r||!c)return;let m=await r("worker-attempt-dismiss",{attempt_id:c,expected_revision:F()});re(m),m&&m.conflict&&(m=await r("worker-attempt-dismiss",{attempt_id:c,expected_revision:F()}),re(m)),m&&m.dismissed===!1&&!m.conflict&&m.reason&&se(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${m.reason}`,"error",2400)}async function ee(c,m,E=!0){if(!r)return null;let z=r,oe=await z(c,{...m,expected_revision:F()});return re(oe),oe&&oe.conflict&&E&&(oe=await z(c,{...m,expected_revision:F()}),re(oe)),oe}async function De(c){if(!r||!c)return;let m=Te().merge_queue?.find(z=>z.bead_id===c)?.continuation_action;if(m?.mismatch&&m.continuation===null){await de(c,m.mismatch);return}B.add(c),Q();let E;try{E=await ee("worker-merge-queue-add",{bead_id:c})}finally{B.delete(c),Q()}!E||E.conflict||E.applied||se(bg(E.reason),"error",2400)}async function rt(c){if(!(!r||!c||te.has(c))){te.add(c),Q();try{let m=await r("worker-cleanup-retry",{bead_id:c,expected_revision:F()});re(m),m&&!m.retried&&!m.conflict&&m.reason&&se(`\uC815\uB9AC \uC7AC\uAC1C \uAC70\uBD80: ${m.reason}`,"error",2400)}finally{te.delete(c),Q()}}}async function de(c,m){let E=await mr({continuation_mismatch:m},(oe,ke)=>ee("worker-merge-queue-add",{bead_id:c,continuation:oe,decision_token:ke},!1)),z=E?.queue?.merge_queue?.find(oe=>oe.bead_id===c)?.continuation_action;if(E?.applied!==!0&&z?.continuation===null&&z.mismatch){await de(c,z.mismatch);return}E&&E.applied===!1&&!E.conflict&&se("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD\uC774 \uCD5C\uC2E0 \uC0C1\uD0DC\uC640 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4","error",2800)}async function b(c){if(!r)return;let m=await ee("worker-merge-auto-toggle",{on:c});!m||m.conflict||se(c?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",c?"success":"info",2400)}async function $(c){if(!r||!c)return;let m=await ee("worker-merge-queue-remove",{bead_id:c});m&&!m.conflict&&!m.applied&&m.reason==="merge_active"&&se("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function k(){await ee("worker-merge-queue-remove",{all:!0})}async function O(c,m=null,E="unmerged",z=null){if(!r||!c)return;let oe=Fn(c,E);if(!(!!z||typeof globalThis.confirm!="function"||globalThis.confirm(oe)))return;let fe=await r("worker-discard",{bead_id:c,...m?{attempt_id:m}:{},...z?{operation_id:z}:{},expected_revision:F()});if(re(fe),fe&&fe.conflict&&(fe=await r("worker-discard",{bead_id:c,...m?{attempt_id:m}:{},...z?{operation_id:z}:{},expected_revision:F()}),re(fe)),fe&&fe.discarded===!0){se(Qs(fe),"success",5e3);return}if(fe&&fe.reason){se(`\uD3D0\uAE30 \uC2E4\uD328: ${fe.reason}`,"error",2800);return}if(fe&&fe.accepted&&fe.pending==="merged_revert"){se("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(fe&&fe.accepted&&!fe.discarded){se(`\uD3D0\uAE30 \uC9C4\uD589: ${fe.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}fe&&!fe.conflict&&se("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function G(c,m,E){if(!(!r||!m||!E||M.has(m))){M.add(m),Q();try{let z=await r(c,{bead_id:m,action_id:E,expected_revision:F()});re(z),z?.conflict?se("\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694.","error",2800):!z?.ok&&z?.reason&&se(`\uC774\uC804 \uC791\uC5C5 \uCC98\uB9AC \uAC70\uBD80: ${String(z.reason)}`,"error",2800)}finally{M.delete(m),Q()}}}async function Z(c,m){if(!r||!m||le.has(m))return;le.add(m),Q();let E;try{let z=async(oe={})=>await r(c,{bead_id:m,expected_revision:F(),...oe});E=await z(),re(E),E&&E.conflict&&(E=await r(c,{bead_id:m,expected_revision:F()}),re(E)),c==="worker-revise-fix"&&(E=await mr(E,(oe,ke)=>z({continuation:oe,decision_token:ke}),{onResult:re,refresh:()=>z()}))}finally{le.delete(m),Q()}if(!(!E||E.conflict)){if(E.ok){se(c==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}se(`\uCC98\uBD84 \uAC70\uBD80: ${E.reason||""}`,"error",3e3)}}async function ne(c){if(!r)return;let m=await r("worker-automation-toggle",{on:c,expected_revision:F()});re(m),m&&m.conflict&&await r("worker-automation-toggle",{on:c,expected_revision:F()}).then(re)}async function ce(c){if(!r||!c)return;let m=await r("worker-repo-operation-repair",{operation_id:c});if(re(m),m&&m.ok===!1){se(`\uD574\uACB0 \uC138\uC158 \uAC70\uBD80: ${m.reason||""}`,"error",3e3);return}m&&m.ok===!0&&se("\uD574\uACB0 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4","success",2400)}async function je(c){if(!r||!c)return;let m=await r("worker-repo-operation-dismiss",{operation_id:c});re(m),m&&m.ok===!1&&se(`\uAE30\uB85D \uB2EB\uAE30 \uAC70\uBD80: ${m.reason||""}`,"error",3e3)}async function me(c){if(!r||!Number.isFinite(c))return;let m=Math.max(oo,Math.floor(c)),E=await r("worker-queue-set-slots",{slots:m,expected_revision:F()});re(E),E&&E.conflict&&await r("worker-queue-set-slots",{slots:m,expected_revision:F()}).then(re)}async function Se(c){if(!r||!Number.isInteger(c)||c<1||c>Du)return;let m=Te(),E=(Array.isArray(m.serial_lanes)?m.serial_lanes:[]).slice(c).reduce((ke,fe)=>ke+(Array.isArray(fe?.entries)?fe.entries.length:0),0),z=()=>({count:c,expected_revision:F()}),oe=await r("worker-queue-set-serial-lane-count",z());re(oe),oe&&oe.conflict&&(oe=await r("worker-queue-set-serial-lane-count",z()),re(oe)),oe&&oe.applied&&E>0&&se(`\uC9C1\uB82C \uB808\uC778 \uCD95\uC18C \u2014 ${E}\uAC1C \uD56D\uBAA9\uC774 \uBCD1\uB82C \uB300\uAE30\uB85C \uC774\uB3D9`)}function he(){let c=Te(),m=h?h.selectBoardColumn(Xm,"ready"):[],E=h?h.selectBoardColumn(Qm,"blocked"):[],z=h?h.selectBoardColumn(eg,"closed"):[],oe=h?h.selectBoardColumn(Jm,"in_progress"):[],ke=new Map;for(let y of oe){let q=mg(y);if(!q)continue;let ae=ke.get(q);ae?ae.push(y):ke.set(q,[y])}let fe=y=>{let q=_s(ke.get(y)||[]);return q?q.title||q.id:null},Ke=c.bead_titles||{},nt=new Map;for(let[y,q]of Object.entries(Ke))typeof q=="string"&&q.length>0&&nt.set(y,q);for(let y of[...m,...E])nt.set(y.id,y.title||y.id);let Ne=c.bead_times&&typeof c.bead_times=="object"&&!Array.isArray(c.bead_times)?c.bead_times:{},p=c.bead_labels&&typeof c.bead_labels=="object"&&!Array.isArray(c.bead_labels)?c.bead_labels:{},g=new Map;for(let[y,q]of Object.entries(p))Array.isArray(q)&&g.set(y,Ta(q));for(let y of[...m,...E]){let q=y.labels;Array.isArray(q)&&!g.has(y.id)&&g.set(y.id,Ta(q))}let x=new Map,U=o?.get()?.last_good?.result?.groups;for(let y of Array.isArray(U)?U:[]){if(y?.eligible!==!0||!Array.isArray(y.members))continue;let q=y.members.map(He=>{let pt=(Array.isArray(c.serial_lanes)?c.serial_lanes:[]).find(Vt=>Vt.entries.some(Tt=>Tt.bead_id===He));return pt?pt.id:null});if(!(q.every(He=>He!==null)&&new Set(q).size===1))for(let He of y.members)x.set(He,y.members.filter(pt=>pt!==He))}let ve=c.bead_blocked_by&&typeof c.bead_blocked_by=="object"&&!Array.isArray(c.bead_blocked_by)?c.bead_blocked_by:{},_e=new Map;for(let[y,q]of Object.entries(Ne))q&&typeof q=="object"&&_e.set(y,q);for(let y of[...m,...E])_e.set(y.id,{created_at:y.created_at,updated_at:y.updated_at});let Re=y=>_e.get(y)||{},qe=c.pr_wait||[],_t=c.pr_observations||{},ir=c.pr_activity||{},Vr=c.cleanup_failed||{},Vn=Object.entries(Vr).map(([y,q])=>({bead_id:y,step:q&&q.step?q.step:"",reason:q&&q.reason?q.reason:"",at:q&&typeof q.at=="number"?q.at:null,detail:q&&typeof q.detail=="string"?q.detail:null,output_tail:q&&typeof q.output_tail=="string"&&q.output_tail?q.output_tail:void 0,log_path:q&&typeof q.log_path=="string"&&q.log_path?q.log_path:void 0,retry_count:q&&typeof q.retry_count=="number"&&Number.isInteger(q.retry_count)&&q.retry_count>0?q.retry_count:0,failure_code:q&&typeof q.failure_code=="string"?q.failure_code:void 0,subject_id:q&&typeof q.subject_id=="string"?q.subject_id:void 0,repair_eligible:!!(q&&q.repair_eligible),repair:q&&q.repair?q.repair:void 0})),pn=c.queue||[],fn=new Set([...pn.map(y=>y.bead_id),...(Array.isArray(c.serial_lanes)?c.serial_lanes:[]).flatMap(y=>(Array.isArray(y?.entries)?y.entries:[]).map(q=>q.bead_id)),...qe.map(y=>y.bead_id),...c.done.map(y=>y.bead_id)]),Kn=new Set(E.map(y=>y.id)),Pe=i?i.get()?.order||{}:{},dt=new Set,Kr=[];for(let y of[...m,...E])fn.has(y.id)||dt.has(y.id)||_g(y)||Object.hasOwn(y,"labels")&&Ea(y.labels)||(dt.add(y.id),Kr.push(y));I=fg(Kr,Y,Pe);let nd=c.admission||{},Na=y=>{let q=nd[y];if(!q)return"";if(q.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let ae=typeof q.reason=="string"?q.reason:"",He=ae.indexOf(":");return He>0&&He<ae.length-1?`\u26D4 ${ae.slice(0,He)} (${ae.slice(He+1)})`:`\u26D4 ${ae}`},sd=I.map(y=>{let q=Fs(y),ae=q.path.length>0,He=y.workflow?.route==="quick_fix"||y.metadata&&y.metadata.route==="quick_fix",pt=!Object.hasOwn(y,"description")||typeof y.description=="string"&&y.description.trim().length>0,Tt=!(Object.hasOwn(y,"labels")&&Ea(y.labels))&&(He?pt:ae&&!q.conflict),ut=Kn.has(y.id),Kt=[];ut&&Kt.push(gg(y)),He&&!pt?Kt.push("missing_description"):!He&&q.conflict?Kt.push("spec_id_conflict"):!He&&!ae&&Kt.push("spec \uC5C6\uC74C");let rs=Na(y.id);return rs&&Kt.push(rs),{id:y.id,title:y.title||y.id,reason:Kt.join(" \xB7 "),draggable:Tt,lane:"candidate",created_at:y.created_at,updated_at:y.updated_at,workflow:y.workflow,is_quick_fix:He,status:y.status,blocked:ut,has_spec:ae}}),io=ng(sd,D),od=io.visible,ad=c.revise_parked||{},Yn=c.discard_operations&&typeof c.discard_operations=="object"&&!Array.isArray(c.discard_operations)?c.discard_operations:{},lo=(y,q)=>y.map((ae,He)=>{let pt=q!=="done",Vt=q!=="done"&&q!=="queue",Tt=pt?ad[ae.bead_id]:null,ut=pt?pr(Yn,ae.bead_id):null,Kt=ut?.operation?ut:null,rs=pt&&g.get(ae.bead_id)===!0,ii=ve[ae.bead_id]||[],_o=c.admission&&typeof c.admission=="object"?c.admission[ae.bead_id]:null,mo=pt?xc(_o,!!Kt||M.has(ae.bead_id)):null,yd=pt&&!mo?Na(ae.bead_id):null,vd=pt?[yd]:[],li=pt&&ii.length>0&&typeof _o?.reason=="string"&&_o.reason.startsWith("not_ready")?[`\u23F8 ${ii.join(", ")} \uC644\uB8CC \uB300\uAE30 (blocks)`]:[],go=pt?x.get(ae.bead_id):void 0;return go&&go.length>0&&li.push(`\u2733 serial \uAD8C\uC7A5 \xB7 ${go.join(", ")}\uC640`),{id:ae.bead_id,title:nt.get(ae.bead_id)||ae.bead_id,reason:vd.filter(Boolean).join(" \xB7 "),draggable:pt&&!Kt&&!mo,done:q==="done",lane:q,seq:Vt?He+1:void 0,worker_serial:rs,discard:Kt,stale_work:mo,badges:[...li,...Tt?["\u23F8 REVISE \uD30C\uD0B9"]:[]],alert:!!Tt,revise_action:!!Tt,revise_enabled:!!Tt&&!Kt&&!le.has(ae.bead_id),revise_title:Tt?Tt.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${Tt.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":"",usage:q==="done"?Ut(c.attempts||{},ae.bead_id):null,work_ms:q==="done"?kc(c.attempts||{},ae.bead_id):null,done_at:q==="done"&&typeof ae.added_at=="number"?ae.added_at:void 0,...Re(ae.bead_id)}}),Yr=c.attempts?Object.values(c.attempts):[],co=new Set;for(let y of Yr)y&&typeof y.resumed_from=="string"&&y.resumed_from.length>0&&co.add(y.resumed_from);let qa=new Map;for(let y of Yr)qa.set(y.bead_id,y.attempt_id);let Zn=new Map;for(let y of Yr)Zn.set(y.attempt_id,y);function uo(y){let q=new Set,ae=y;for(;ae&&!q.has(ae.attempt_id);){if(ae.conflict_resolution===!0)return!0;q.add(ae.attempt_id),ae=typeof ae.resumed_from=="string"&&ae.resumed_from.length>0&&Zn.get(ae.resumed_from)||null}return!1}let Xn=typeof c.declared_base=="string"?c.declared_base:null;function id(y){let q=null;for(let ae of Yr)!ae||ae.bead_id!==y||uo(ae)||(q===null||(typeof ae.started_at=="number"?ae.started_at:0)>=(typeof q.started_at=="number"?q.started_at:0))&&(q=ae);return q&&typeof q.target_base=="string"?q.target_base:null}let Fa=[],ja=[],ld=$u(c),Ba=y=>{let q=typeof y.session_id=="string"&&y.session_id.length>0,ae=co.has(y.attempt_id);return{eligible:q&&!ae,reason:q?ae?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}},Gt=null;for(let y of Yr){let q=y.status==="paused"&&!co.has(y.attempt_id);if(y.status==="running"||q)ja.push({bead_id:y.bead_id,attempt_id:y.attempt_id,title:nt.get(y.bead_id)||y.bead_id,runner:y.runner||null,model:y.model||null,effort:y.effort||null,speed:y.speed||null,continuation_mode:y.continuation_mode||null,started_at:typeof y.started_at=="number"?y.started_at:null,resumed_from:y.resumed_from||null,paused:q,conflict_resolution:uo(y),base_exception:La(Xn,y.target_base),can_pause:typeof y.session_id=="string"&&y.session_id.length>0,discard:pr(Yn,y.bead_id,{attempt_id:y.attempt_id}),usage:Ut(c.attempts||{},y.bead_id),current_child:fe(y.bead_id),...Re(y.bead_id)});else if((y.status==="failed"||y.status==="orphaned")&&ld(y)){let ae=Ba(y);Fa.push({bead_id:y.bead_id,attempt_id:y.attempt_id,title:nt.get(y.bead_id)||y.bead_id,runner:y.runner||null,model:y.model||null,effort:y.effort||null,speed:y.speed||null,continuation_mode:y.continuation_mode||null,started_at:typeof y.started_at=="number"?y.started_at:null,resumed_from:y.resumed_from||null,failed:!0,status:y.status,status_label:y.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328",discard:pr(Yn,y.bead_id,{attempt_id:y.attempt_id}),resume_eligible:ae.eligible,resume_reason:ae.reason,conflict_resolution:uo(y),base_exception:La(Xn,y.target_base),usage:Ut(c.attempts||{},y.bead_id),current_child:fe(y.bead_id),...Re(y.bead_id)}),Gt=y}}let Qn=[...Fa,...ja].map(y=>{let q=Zn.get(y.attempt_id),ae=q?.quickfix_landing;if(q?.quickfix_lane!==!0||!ae||typeof ae!="object")return y;let He=typeof ae.reason=="string"&&ae.reason.length>0?ae.reason:null,pt=Un({bead_id:q.bead_id,merge_sha:ae.head_sha,cleanup_cursor:ae.cursor,cleanup_failed:He?{step:ae.cursor,reason:He}:null,repo_operations:Array.isArray(c.repo_operations)?c.repo_operations:[]});return pt?{...y,landing:pt}:y}),Ua=null;if(Gt){let y=Ba(Gt),q=Gt.cause_detail;Ua={bead_id:Gt.bead_id,repo:Gt.repo||"",reason:Gt.cause||Gt.status,cause_detail:q&&typeof q.reason=="string"?{reason:q.reason,command:typeof q.command=="string"?q.command:null}:null,resume_attempt_id:Gt.attempt_id,resume_eligible:y.eligible,resume_reason:y.reason,discard:pr(Yn,Gt.bead_id,{attempt_id:Gt.attempt_id})}}let Wa=new Set(Qn.map(y=>y.bead_id)),po=Array.isArray(c.merge_queue)?c.merge_queue:[],za=new Map,Ha=new Map,Ga=new Map,Va=new Map,Ka=new Map;po.forEach((y,q)=>{y&&typeof y.bead_id=="string"&&(za.set(y.bead_id,q+1),Ha.set(y.bead_id,y.resolution),Ga.set(y.bead_id,y.continuation_action||null),Va.set(y.bead_id,y.head_review||null),Ka.set(y.bead_id,y.authority||null))});let Zr=c.merge_queue_state||{active:null,failures:{}},cd=Zr.failures||{},Ya=Zr.waiting&&typeof Zr.waiting.bead_id=="string"&&typeof Zr.waiting.reason=="string"?Zr.waiting:null,ud=c.auto_merge_skips||{},Za=y=>{let q=ud[y];if(!q)return null;let ae=_t[y],He=ae&&ae.pr?ae.pr.head_sha:null;return He&&He===q.head_sha?q.reason||"":null},Jn=new Map;for(let y of Qn)y.failed!==!0&&y.conflict_resolution&&(y.paused?Jn.has(y.bead_id)||Jn.set(y.bead_id,"paused"):Jn.set(y.bead_id,"running"));let Xa=Qn.filter(y=>!y.paused&&y.failed!==!0).length,Qa=(c.workspace_info||{}).slots,Ja=typeof Qa=="number"?Qa:typeof c.slots=="number"?c.slots:oo,dd=Xa>Ja,es=Nr(W),pd=(Array.isArray(c.done)?c.done.slice():[]).filter(y=>es===void 0||typeof y.added_at!="number"||y.added_at>=es).sort((y,q)=>(q.added_at||0)-(y.added_at||0)),_n=lo(pd,"done"),fd=new Set((Array.isArray(c.done)?c.done:[]).map(y=>y?.bead_id).filter(y=>typeof y=="string")),ei=[],_d=d?.()||"";for(let y of z){let q=jr(y.closed_at);if(typeof y.id!="string"||fd.has(y.id)||q===null||es!==void 0&&q<es||typeof y.comment_count!="number"||y.comment_count<=0)continue;let ae=`${_d}\0${y.id}\0${String(y.updated_at)}\0${y.comment_count}`,He=R.get(ae);He===void 0&&r&&(R.set(ae,"pending"),Promise.resolve(r("get-comments",{id:y.id})).then(pt=>{let Vt=Array.isArray(pt)&&pt.some(Tt=>js(typeof Tt?.text=="string"?Tt.text:"")?.lane==="session");R.set(ae,Vt?"session":"not-session"),Q()}).catch(()=>{R.set(ae,"failed"),Q()})),He==="session"&&ei.push({id:y.id,title:y.title||y.id,reason:"",draggable:!1,done:!0,lane:"done",selectable:!1,selected:!1,worker_serial:!1,badges:["\uC138\uC158 \uC791\uC5C5"],alert:!1,usage:null,work_ms:null,done_at:q,created_at:y.created_at,updated_at:y.updated_at})}_n.push(...ei),_n.sort((y,q)=>(q.done_at||0)-(y.done_at||0));let ts={};for(let y of gr)ts[y]=0;let ti=!1,ri=0,fo=0,ni=0;for(let y of _n){let q=y.usage;if(q&&typeof q=="object"){let ae=!1;for(let He of gr)Number.isFinite(q[He])&&(ts[He]+=q[He],ti=!0,ae=!0);ae&&(fo+=1,Number.isFinite(q.total_cost_usd)&&(ri+=q.total_cost_usd,ni+=1))}}fo>0&&ni===fo&&(ts.total_cost_usd=ri);let si=_n.map(y=>y.usage).filter(y=>y&&typeof y=="object"&&y.providers),md=si.length>0?xt(xs(si)):ti?Xt(ts):null,gd=c.lane_states&&typeof c.lane_states=="object"&&!Array.isArray(c.lane_states)?c.lane_states:{},bd=Array.isArray(c.serial_lanes)?c.serial_lanes:[],oi=y=>{if(qe.some(He=>He.bead_id===y))return"PR \uB300\uAE30 \xB7 \uC810\uC720";let q=Yr.filter(He=>He&&He.bead_id===y),ae=q.length>0?q[q.length-1].status:null;return ae==="failed"||ae==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":ae==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720"},ai=bd.filter(y=>y&&typeof y.id=="string"&&Array.isArray(y.entries)).map((y,q)=>{let ae=gd[y.id]||{},He=new Map((Array.isArray(ae.corrections)?ae.corrections:[]).filter(ut=>ut&&typeof ut.bead_id=="string"&&typeof ut.after=="string").map(ut=>[ut.bead_id,ut.after])),pt=lo(y.entries.filter(ut=>!Wa.has(ut.bead_id)),y.id).map(ut=>He.has(ut.id)?{...ut,badges:[`\u{1F517} ${He.get(ut.id)} \uB4A4 (blocks \uC790\uB3D9)`,...ut.badges]}:ut),Vt=Array.isArray(ae.occupied_by)?ae.occupied_by.filter(ut=>typeof ut=="string"):[],Tt=Vt.map(ut=>({id:ut,title:nt.get(ut)||ut,draggable:!1,lane:y.id,ghost:!0,badges:[oi(ut)]}));return{id:y.id,index:q+1,rows:[...Tt,...pt],occupied:Vt.length>0,badge:Vt.length>0?oi(Vt[0]):"\uB300\uAE30",cycle:ae.cycle===!0}}),hd=typeof c.serial_lane_count=="number"?c.serial_lane_count:ai.length;return{queue:c,idToTitle:nt,candidates:od,candidate_hidden:{blocked:io.hidden_blocked,spec:io.hidden_spec},running:Qn,live_count:Xa,slots:Ja,over_cap:dd,failure:Ua,waiting:lo(pn.filter(y=>!Wa.has(y.bead_id)),"queue"),serial_lanes:ai,serial_lane_count:hd,pr_wait:qe.map(y=>$g(y.bead_id,nt.get(y.bead_id)||y.bead_id,_t,Vr[y.bead_id]||null,Ut(c.attempts||{},y.bead_id),ir[y.bead_id]||(B.has(y.bead_id)||te.has(y.bead_id)?{activity:null,merge_progress:{step:"merging"}}:null),Jn.get(y.bead_id)||null,y.external===!0,{position:za.get(y.bead_id)||0,active:Zr.active===y.bead_id,failure:cd[y.bead_id]||null,waiting:Ya?.bead_id===y.bead_id?Ya.reason:null,resolution:Ha.get(y.bead_id),continuation_action:Ga.get(y.bead_id),head_review:Va.get(y.bead_id)||null,authority:Ka.get(y.bead_id)||null},y.wt_present!==!1,c.auto_merge===!0?Za(y.bead_id):null,La(Xn,id(y.bead_id)),c.completion_status&&typeof c.completion_status=="object"&&!Array.isArray(c.completion_status)&&c.completion_status[y.bead_id]||null,c.discard_operations&&typeof c.discard_operations=="object"&&!Array.isArray(c.discard_operations)?c.discard_operations:{},Zn.get(qa.get(y.bead_id)||"")?.worker_serial===!0,c.auto_merge===!0,{merge_sha:y.merge_sha,cleanup_cursor:y.cleanup_cursor,repo_operations:Array.isArray(c.repo_operations)?c.repo_operations:[]})).map(y=>({...y,...Re(y.id)})),merge_queue_length:po.length,merge_queue_running:po.length>0,auto_excluded:qe.map(y=>y.bead_id).filter(y=>Za(y)!==null),declared_base:Xn,done:_n,token_total:md,cleanup_failures:Vn,repo_operations:Array.isArray(c.repo_operations)?c.repo_operations:[]}}function st(){let m=!!o?.get()?.job,E=!m&&o?.isPending?.()===!0,z=m?"\uBD84\uC11D \uC911":E?"\uC900\uBE44 \uC911":"";return l`<button
      type="button"
      class=${z?"worker-analysis-btn worker-analysis-btn--running":"worker-analysis-btn"}
      aria-busy=${z?"true":"false"}
      title="대기 이슈의 병렬 실행 가능성을 분석해 직렬 그룹을 제안합니다 (클릭할 때만 실행)"
    >
      ✳ 병렬성
      분석${z?l`<span class="worker-analysis-btn__badge">${z}</span>`:""}
    </button>`}function ot(c){let m=c.waiting.length>0?c.waiting[0].id:"\u2014",E=l`<button
      type="button"
      class="worker-play${c.queue.auto_advance?" is-active":""}"
    >
      ${c.queue.auto_advance?"\u23F8 \uC790\uB3D9\uD654 \uBA48\uCDA4":"\u25B6 \uC790\uB3D9\uD654"}
    </button>`,z=N(c),oe=c.over_cap?l`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",ke=l`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${c.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${c.pr_wait.length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${S()} 완료 <b>${c.done.length}</b></span
      >`,fe=l`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${c.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${c.declared_base||"?"}</span
    >`,Ke=l`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${oo}
          step="1"
          .value=${String(c.slots)}
          title="동시에 실행할 세션 수 (최소 1 = 순차 실행)"
      /></label>
      <label
        class="worker-tgl worker-serial-lanes"
        title="고정 직렬 레인 수 (1~5). 축소 시 잘린 레인의 대기 항목은 병렬 대기로 돌아갑니다"
        >직렬 레인
        <select class="worker-serial-lane-count" aria-label="직렬 레인 수">
          ${Array.from({length:Du},(p,g)=>g+1).map(p=>l`<option
                value=${String(p)}
                ?selected=${c.serial_lane_count===p}
              >
                ${p}
              </option>`)}
        </select>
      </label>
      ${o?st():""} `,nt=qc({failure:c.failure}),Ne=$c(c.repo_operations,c.cleanup_failures);return w?l`<div class="worker-ribbon">
          ${E} ${z}
          <div class="worker-kpi worker-kpi--ribbon">${oe}${ke}</div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${Ke}</div>
          <div class="worker-kpi">${fe}</div>
        </div>
        ${Ne}${We.template()}${nt}`:l`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${E}${z}${Ke}</div>
        <div class="worker-kpi">
          ${oe}${ke}${fe}
          ${(Array.isArray(c.token_total)?c.token_total:c.token_total?[{label:c.token_total,tooltip:`${S()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(p=>l`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${p.tooltip}
                >${S()} 완료 · 누적 ${p.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${m}</b></span
          >
        </div>
      </div>
      ${Ne}${We.template()}${nt}`}function j(c){if(c.running.length===0&&c.pr_wait.length===0)return"";let m=c.running.some(E=>!E.paused&&E.failed!==!0);return l`<section
      class="worker-now${m?" worker-pane--live":""}"
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
      ${c.running.length>0?ya(c.running,Date.now(),Ue):""}
      ${c.pr_wait.map(E=>da(E))}
    </section>`}function J(c){let m=c.candidate_hidden;return l`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${D.show_blocked}
        />
        🔒 blocked${m.blocked>0?` ${m.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${sg.map(E=>l`<button
              type="button"
              class="worker-filter__chip${D.spec===E.value?" is-active":""}"
              data-spec=${E.value}
              aria-pressed=${D.spec===E.value?"true":"false"}
            >
              ${E.label}
            </button>`)}
        ${m.spec>0?l`<span class="worker-filter__hidden">숨김 ${m.spec}</span>`:""}
      </div>
    </div>`}function pe(){return l`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${Y}
    >
      ${og.map(c=>l`<option value=${c.value} ?selected=${Y===c.value}>
            ${c.label}
          </option>`)}
    </select>`}function v(){return l`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${W}
      >
        ${lr.map(c=>l`<option value=${c.value} ?selected=${W===c.value}>
              ${c.label}
            </option>`)}
      </select>
    </div>`}function T(c){let m=l`<span
      class="worker-lane__badge${c.occupied?" worker-lane__badge--held":""}"
      >${c.badge}</span
    >`,E=c.cycle?l`<div class="worker-lane__cycle">
          ⚠ blocks 순환 감지 — 자동 정렬을 생략했습니다
        </div>`:"";return tr({id:`worker-pane-lane-${c.id}`,lane:c.id,title:`\uC9C1\uB82C ${c.index}`,items:c.rows,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uD589\uC744 \uC5EC\uAE30\uB85C \uB4DC\uB798\uADF8",header_control:m,controls:E})}function N(c){let m=c.queue.auto_merge===!0;if(c.merge_queue_running)return l`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop${m?" is-active":""}"
        title=${m?"\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB044\uACE0 \uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)":"\uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)"}
      >
        ${m?"\u23F8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8":"\uC77C\uAD04 \uBA38\uC9C0 \uC911\uB2E8"} ${c.merge_queue_length}
      </button>`;if(m)return l`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop is-active"
        title="자동 머지 켜짐 — 자격이 생기는 PR을 계속 큐에 넣습니다. 클릭하면 끕니다"
      >
        ⏸ 자동 머지
      </button>`;let E=new Set(c.auto_excluded),z=c.pr_wait.filter(oe=>oe.merge_action&&oe.merge_enabled&&!E.has(oe.id)).length;return l`<button
      type="button"
      class="worker-merge-all"
      title="켜 두면 자격이 생기는 PR을 계속 큐에 넣어 순서대로 충돌 해소·머지합니다"
    >
      ▶ 자동 머지${z>0?` ${z}`:""}
    </button>`}function X(c){let m=tr({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:c.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:pe(),controls:J(c),place_menu:K(c.candidates)});return w?l`<div class="worker-lanes worker-lanes--mobile">
        ${j(c)}
        ${tr({id:"worker-pane-queue",lane:"queue",title:"\uBCD1\uB82C \uB300\uAE30",items:c.waiting,empty:"\uB4DC\uB798\uADF8 \uB610\uB294 [\uB300\uAE30\uB85C \u21B4]\uB85C \uBC30\uCE58",collapsible:!0,collapsed:P.queue,preview:qu(c.waiting)})}
        ${c.serial_lanes.map(E=>T(E))}
        ${m}
        ${tr({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:c.done,empty:`${S()} \uC644\uB8CC \uC5C6\uC74C`,controls:v(),collapsible:!0,collapsed:P.done,preview:Array.isArray(c.token_total)?c.token_total.map(E=>E.label).join(" \xB7 "):c.token_total||qu(c.done)})}
      </div>`:l`<div class="worker-lanes">
      ${m}
      <div class="worker-wait">
        ${tr({id:"worker-pane-queue",lane:"queue",title:"\uBCD1\uB82C \uB300\uAE30",items:c.waiting,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58"})}
        ${c.serial_lanes.map(E=>T(E))}
      </div>
      ${tr({id:"worker-pane-running",lane:"running",title:`\uC2E4\uD589 \uC911 \xB7 \uC2AC\uB86F ${c.slots}`,items:c.running,live:c.running.some(E=>!E.paused&&E.failed!==!0),body:ya(c.running,Date.now(),Ue)})}
      ${tr({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:c.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C"})}
      ${tr({id:"worker-pane-done",lane:"done",title:`\uC644\uB8CC \xB7 ${S()} ${c.done.length}`,items:c.done,empty:`${S()} \uC644\uB8CC \uC5C6\uC74C`,controls:v()})}
    </div>`}function we(c){P={...P,[c]:!P[c]},pg(P),Q()}function Q(){let c=he();Ge(ot(c),ge),Ge(X(c),Me)}function xe(){let c=document.querySelector(".app-header");if(!c)return;let m=()=>{let E=Math.round(c.getBoundingClientRect().height);ue.style.setProperty("--worker-ribbon-top",`${E}px`)};if(m(),typeof ResizeObserver=="function"){let E=new ResizeObserver(m);E.observe(c),L.push(()=>E.disconnect())}else window.addEventListener("resize",m),L.push(()=>window.removeEventListener("resize",m))}function Le(){if(typeof window.matchMedia!="function")return;let c=window.matchMedia(ug);w=!!c.matches;let m=E=>{let z=!!(E&&typeof E.matches=="boolean"?E.matches:c.matches);z!==w&&(w=z,Q())};typeof c.addEventListener=="function"?(c.addEventListener("change",m),L.push(()=>c.removeEventListener("change",m))):typeof c.addListener=="function"&&(c.addListener(m),L.push(()=>c.removeListener(m)))}let gt=null;function ht(c){gt=c.target instanceof Element?c.target:null}function Ze(c){let E=c.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!E)return;if(gt&&E.contains(gt)&&gt.closest("input, button, a")){c.preventDefault();return}let z=E.dataset.beadId||"",oe=E.dataset.lane||"";A={bead_id:z,from_lane:oe};try{c.dataTransfer?.setData("text/plain",z),c.dataTransfer&&(c.dataTransfer.effectAllowed="move")}catch{}}function St(c){let m=c.target?.closest?.(".worker-pane");if(!m)return;let E=m.dataset.lane||"";E!=="candidate"&&E!=="queue"&&!/^s[1-5]$/.test(E)||(c.preventDefault(),c.dataTransfer&&(c.dataTransfer.dropEffect="move"),m.classList.add("worker-pane--drag-over"))}function zt(c){c.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function vt(c,m){let E=I.find(fe=>fe.id===c);if(!E)return;let z=I.filter(fe=>fe.id!==c),oe=z.length;if(m){let fe=m.dataset.beadId;if(fe===c)return;let Ke=z.findIndex(nt=>nt.id===fe);Ke>=0&&(oe=Ke)}let ke=z.slice();ke.splice(oe,0,E),C.applyReorder(c,ke,oe)}function Ot(c){let m=c.target?.closest?.(".worker-pane");if(!m)return;c.preventDefault(),m.classList.remove("worker-pane--drag-over");let E=m.dataset.lane||"",z=A?.bead_id||c.dataTransfer?.getData("text/plain")||"",oe=A?.from_lane||"";if(A=null,!z)return;let ke=c.target?.closest?.(".worker-mini, .worker-card"),fe=Array.from(m.querySelectorAll(".worker-mini, .worker-card")),Ke=fe.length;if(ke){let nt=fe.indexOf(ke);nt>=0&&(Ke=nt)}if(Ke=Math.max(0,Ke-m.querySelectorAll(".worker-mini--ghost").length),m.classList.contains("worker-pane--collapsed")&&(Ke=Oe()),E==="candidate"){if(oe==="candidate"){vt(z,ke);return}(oe==="queue"||/^s[1-5]$/.test(oe))&&Ce(z);return}if(E==="queue"||/^s[1-5]$/.test(E)){let nt=E==="queue"?"parallel":E;oe===E?ze(z,nt,Ke):Fe(z,nt)}}function rr(c){D=c,rg(c),Q()}function nr(c){Y=c==="board"||c==="created"||c==="spec"?c:ao,ig(Y),Q()}function sr(c){W=Bt(c)?c:Dt,cg(W),_?.(W),Q()}function fr(c){let m=c.target?.closest?.(".worker-serial-lane-count");if(m){let Ke=Number.parseInt(m.value,10);Number.isFinite(Ke)&&Se(Ke).then(Q);return}let E=c.target?.closest?.(".worker-filter__blocked");if(E){rr({...D,show_blocked:E.checked});return}let z=c.target?.closest?.(".worker-done-range");if(z){sr(z.value);return}let oe=c.target?.closest?.(".worker-sort");if(oe){nr(oe.value||ao);return}let ke=c.target?.closest?.(".worker-slots__input");if(!ke)return;let fe=Number.parseInt(ke.value,10);if(!Number.isFinite(fe)){Q();return}me(fe).then(Q)}function wt(c){return c?{runner:c.runner||void 0,model:c.model||void 0,effort:c.effort||void 0,worktree:c.worktree||void 0,status:c.status||void 0,session_id:c.session_id||void 0}:{}}function Ht(){let c=he();return{operations:c.repo_operations,cleanup_failures:c.cleanup_failures,repo:d&&d()||""}}function or(){Ue&&Ae.close(),Ve.hidden=!1,$e.hidden=!1,Ie.open(Ht()),Q()}function ar(c){let m=Te(),E=m.attempts?m.attempts[c]:null;Ue=c,ie=null,Ie.close(),Ve.hidden=!0,$e.hidden=!1,Ae.open({attempt_id:c,meta:wt(E)}),Q()}function Je(c,m){Ue=null,ie=c,Ie.close(),Ve.hidden=!0,$e.hidden=!1,Ae.open({attempt_id:c,meta:m,hide_prompt:!0}),Q()}function Pt(){if(Ie.isOpen()&&Ie.refresh(Ht()),ie){let E=(o?.get()?.runs||[]).find(z=>z.run_id===ie);E?Ae.updateMeta(Ra(E)):Ae.close();return}if(!Ue)return;let c=Te(),m=c.attempts?c.attempts[Ue]:null;if(m){Ae.updateMeta(wt(m));return}Ae.close()}function ye(c){let m=c.target;if(m?.closest?.(".worker-mini__serial, .worker-mini__grip")||m?.closest?.("#worker-parallel-analysis-dialog"))return;if(m?.closest?.(".worker-analysis-btn")){et?.open();return}if(m?.closest?.(".worker-repo-strip")||m?.closest?.(".worker-mini__timeline")){or();return}let E=m?.closest?.(".worker-repo-op__session");if(E){let Pe=E.dataset.attemptId;Pe&&ar(Pe);return}let z=m?.closest?.(".worker-repo-op__resolve");if(z){ce(z.dataset.operationId||"");return}let oe=m?.closest?.(".worker-repo-op__dismiss");if(oe){je(oe.dataset.operationId||"");return}let ke=m?.closest?.(".worker-cleanup__resume");if(ke){let Pe=ke.dataset.beadId;Pe&&rt(Pe);return}let fe=m?.closest?.(".worker-banner__resume");if(fe){let Pe=fe.dataset.attemptId;Pe&&Ye(Pe);return}let Ke=m?.closest?.(".worker-banner__discard");if(Ke){let Pe=Ke.dataset.confirmation==="merged"?"merged":"unmerged";O(Ke.dataset.beadId||"",Ke.dataset.attemptId||null,Pe,Ke.dataset.operationId||null);return}let nt=m?.closest?.(".worker-banner__dismiss");if(nt){let Pe=nt.dataset.attemptId;Pe&&H(Pe);return}if(m?.closest?.(".worker-play")){ne(!Te().auto_advance);return}let Ne=m?.closest?.(".worker-merge-all");if(Ne){Ne.classList.contains("worker-merge-all--stop")?Te().auto_merge===!0?b(!1):k():b(!0);return}let p=m?.closest?.(".worker-pane__hd--toggle");if(p){let Pe=p.dataset.lane;(Pe==="queue"||Pe==="done")&&we(Pe);return}let g=m?.closest?.(".worker-card__place-lane");if(g){let Pe=g.dataset.beadId,dt=g.dataset.lane;Pe&&(dt==="parallel"||/^s[1-5]$/.test(dt||""))&&(V=null,Q(),Fe(Pe,dt));return}if(m?.closest?.(".worker-card__place-cancel")){V=null,Q();return}let U=m?.closest?.(".worker-card__place");if(U){let Pe=U.dataset.beadId;Pe&&!U.disabled&&(tt()?(V=Pe,Q()):Fe(Pe,"parallel"));return}let ve=m?.closest?.(".worker-filter__chip");if(ve){let Pe=ve.dataset.spec;(Pe==="all"||Pe==="with"||Pe==="without")&&rr({...D,spec:Pe});return}let _e=m?.closest?.(".worker-mini__merge");if(_e){let Pe=_e.dataset.beadId||"";Te().cleanup_failed?.[Pe]?rt(Pe):De(Pe);return}let Re=m?.closest?.(".worker-mini__merge-cancel");if(Re){$(Re.dataset.beadId||"");return}let qe=m?.closest?.(".worker-mini__discard");if(qe){O(qe.dataset.beadId||"",qe.dataset.attemptId||null,qe.dataset.discardMode==="merged"?"merged":"unmerged",qe.dataset.operationId||null);return}let _t=m?.closest?.(".worker-mini__stale-continue");if(_t){G("worker-stale-work-continue",_t.dataset.beadId||"",_t.dataset.actionId||"");return}let ir=m?.closest?.(".worker-mini__stale-backup");if(ir){G("worker-stale-work-backup-fresh",ir.dataset.beadId||"",ir.dataset.actionId||"");return}let Vr=m?.closest?.(".worker-mini__stale-recheck");if(Vr){G("worker-stale-work-recheck",Vr.dataset.beadId||"",Vr.dataset.actionId||"");return}let Vn=m?.closest?.(".worker-mini__revise-fix");if(Vn){Z("worker-revise-fix",Vn.dataset.beadId||"");return}let pn=m?.closest?.(".worker-mini__revise-approve");if(pn){Z("worker-revise-approve",pn.dataset.beadId||"");return}if(m?.closest?.(".worker-mini__pr"))return;if(m?.closest?.(".rtile__discard")){let Pe=m?.closest?.(".rtile"),dt=Pe?.dataset?.beadId,Kr=Pe?.dataset?.attemptId;dt&&O(dt,Kr||null,"unmerged",m?.closest?.(".rtile__discard")?.dataset.operationId||null);return}if(m?.closest?.(".rtile__dismiss")){let dt=m?.closest?.(".rtile")?.dataset?.attemptId;dt&&H(dt);return}if(m?.closest?.(".rtile__pause")){let dt=m?.closest?.(".rtile")?.dataset?.attemptId;dt&&ct(dt);return}if(m?.closest?.(".rtile__resume")){let dt=m?.closest?.(".rtile")?.dataset?.attemptId;dt&&Ye(dt);return}if(m?.closest?.(".rtile__session")){let dt=m?.closest?.(".rtile")?.dataset?.attemptId;dt&&ar(dt);return}if(m?.closest?.(".worker-drawer-overlay__backdrop")){Ie.close(),Ae.close();return}if(m?.closest?.(".worker-drawer-host"))return;let fn=m?.closest?.(".rtile");if(fn){if(m?.closest?.(".rtile__id")){let dt=fn.dataset.beadId;dt&&Zt(dt).then(Kr=>{Kr?se("\uBCF5\uC0AC\uB428","success",1200):se("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let Pe=fn.dataset.beadId;Pe&&u&&u(Pe);return}let Kn=m?.closest?.(".worker-mini, .worker-card");if(Kn){let Pe=Kn.dataset.beadId;if(m?.closest?.(".worker-mini__id, .worker-card__id")){Pe&&Zt(Pe).then(dt=>{dt?se("\uBCF5\uC0AC\uB428","success",1200):se("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}Pe&&u&&u(Pe)}}return e.addEventListener("pointerdown",ht),e.addEventListener("dragstart",Ze),e.addEventListener("dragover",St),e.addEventListener("dragleave",zt),e.addEventListener("drop",Ot),e.addEventListener("click",ye),e.addEventListener("change",fr),Le(),xe(),h&&L.push(h.subscribe(()=>{for(let[c,m]of R)m==="failed"&&R.delete(c);Q()})),s&&L.push(s.subscribe(()=>{let c=d&&d()||"";c!==be&&(be=c,Ee.close()),Q(),Pt()})),o&&typeof o.subscribe=="function"&&L.push(o.subscribe(()=>{Pt(),Q()})),Q(),{load(){Q()},destroy(){for(let c of L.splice(0))try{c()}catch{}e.removeEventListener("pointerdown",ht),e.removeEventListener("dragstart",Ze),e.removeEventListener("dragover",St),e.removeEventListener("dragleave",zt),e.removeEventListener("drop",Ot),e.removeEventListener("click",ye),e.removeEventListener("change",fr);try{Ae.destroy()}catch{}$e.hidden=!0;try{et?.destroy()}catch{}try{Ee.destroy()}catch{}Ge(l``,e)}}}function Ma(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function Hu(e,t,r,n=async()=>{},s=async()=>{}){let o=ft("views:workspace-picker"),a=null,i=!1,u=!1,d=!1;async function f(P){let B=P.target.value,le=t.getState().workspace?.current?.path||"";if(B&&B!==le){o("switching workspace to %s",B),i=!0,S();try{await r(B)}catch(M){o("workspace switch failed: %o",M)}finally{i=!1,S()}}}async function _(){let P=t.getState(),w=P.workspace?.current?.path||P.workspace?.available?.[0]?.path||"";if(!(!w||u)){o("git-pulling workspace %s",w),u=!0,S();try{await n(w)}catch(B){o("workspace git pull failed: %o",B)}finally{u=!1,S()}}}function h(P){let w=P.target;w&&e.contains(w)||I()}function C(P){P.key==="Escape"&&I()}function A(){d||(d=!0,document.addEventListener("mousedown",h),document.addEventListener("keydown",C),S())}function I(){d&&(d=!1,document.removeEventListener("mousedown",h),document.removeEventListener("keydown",C),S())}function D(){d?I():A()}async function V(P){let w=P.target,B=w.value,te=w.checked;o("toggling visibility %s \u2192 %s",B,String(te));try{await s(B,te)}catch(le){o("workspace visibility toggle failed: %o",le)}}function Y(P){return P?l`
      <button
        type="button"
        class="workspace-picker__git-pull-button"
        @click=${_}
        ?disabled=${i||u}
        aria-label="Git Pull"
        title="Git Pull"
      >
        <span aria-hidden="true">⬇</span>
      </button>
    `:l``}function W(P,w){return l`
      <div class="workspace-picker__manage">
        <button
          type="button"
          class="workspace-picker__manage-button"
          @click=${D}
          aria-haspopup="true"
          aria-expanded=${d?"true":"false"}
          aria-label="프로젝트 관리"
        >
          프로젝트 관리
        </button>
        ${d?l`
              <div
                class="workspace-picker__manage-popover"
                role="menu"
                aria-label="프로젝트 표시 선택"
              >
                ${P.map(B=>l`
                    <label
                      class="workspace-picker__manage-row"
                      title="${B.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${B.path}"
                        .checked=${!w.has(B.path)}
                        @change=${V}
                      />
                      <span class="workspace-picker__manage-name"
                        >${Ma(B.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function R(){let P=t.getState(),w=P.workspace?.current,B=P.workspace?.available||[],te=new Set(P.workspace?.hidden||[]),le=w?.path||B[0]?.path||"";if(B.length===0)return l``;let M=B.filter(L=>!te.has(L.path)||L.path===le);if(M.length<=1){let L=M[0]||B[0],ue=Ma(L.path);return l`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${L.path}"
            >${ue}</span
          >
          ${W(B,te)}
          ${Y(le)}
          ${u?l`<span
                class="workspace-picker__loading"
                aria-hidden="true"
              ></span>`:""}
        </div>
      `}return l`
      <div class="workspace-picker">
        <select
          class="workspace-picker__select"
          @change=${f}
          ?disabled=${i||u}
          aria-label="Select project workspace"
        >
          ${M.map(L=>l`
              <option
                value="${L.path}"
                ?selected=${L.path===le}
                title="${L.path}"
              >
                ${Ma(L.path)}
              </option>
            `)}
        </select>
        ${W(B,te)}
        ${Y(le)}
        ${i||u?l`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function S(){Ge(R(),e)}return S(),a=t.subscribe(()=>S()),{destroy(){a&&(a(),a=null),document.removeEventListener("mousedown",h),document.removeEventListener("keydown",C),Ge(l``,e)}}}var Gu=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","get-session-defaults","set-session-defaults","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-automation-toggle","worker-auto-repair-toggle","worker-repo-operation-repair","worker-repo-operation-dismiss","worker-queue-set-slots","worker-queue-set-serial-lane-count","subscribe-worker-parallel-analysis","unsubscribe-worker-parallel-analysis","worker-parallel-analysis-snapshot","worker-parallel-analysis-targets","worker-parallel-analysis-prompt","worker-parallel-analysis-start","worker-parallel-analysis-cancel","worker-parallel-analysis-settings-update","worker-parallel-analysis-submit","worker-queue-set-orchestration-defaults","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-cleanup-retry","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-stale-work-continue","worker-stale-work-backup-fresh","worker-stale-work-recheck","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-worker-system-prompt","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-impl-presets","unsubscribe-impl-presets","impl-presets-snapshot","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","monitor-auto-toggle"];function Pa(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function Vu(e,t,r=Pa()){return{id:r,type:e,payload:t}}function Ku(e={}){let t=ft("ws"),r={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},n=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",a=0,i=null,u=!0,d=new Map,f=[],_=new Map,h=new Set;function C(R){for(let S of Array.from(h))try{S(R)}catch{}}function A(){if(!u||i)return;o="reconnecting",t("ws reconnecting\u2026"),C(o);let R=Math.min(r.maxMs||0,(r.initialMs||0)*Math.pow(r.factor||1,a)),S=(r.jitterRatio||0)*R,P=Math.max(0,Math.round(R+(Math.random()*2-1)*S));t("ws retry in %d ms (attempt %d)",P,a+1),i=setTimeout(()=>{i=null,W()},P)}function I(R){try{s?.send(JSON.stringify(R))}catch(S){t("ws send failed",S)}}function D(){for(o="open",t("ws open"),C(o),a=0;f.length;){let R=f.shift();R&&I(R)}}function V(R){let S;try{S=JSON.parse(String(R.data))}catch{t("ws received non-JSON message");return}if(!S||typeof S.id!="string"||typeof S.type!="string"){t("ws received invalid envelope");return}if(d.has(S.id)){let w=d.get(S.id);d.delete(S.id),S.ok?w?.resolve(S.payload):w?.reject(S.error||new Error("ws error"));return}let P=_.get(S.type);if(P&&P.size>0)for(let w of Array.from(P))try{w(S.payload)}catch(B){t("ws event handler error",B)}else t("ws received unhandled message type: %s",S.type)}function Y(){o="closed",t("ws closed"),C(o);for(let[R,S]of d.entries())S.reject(new Error("ws disconnected")),d.delete(R);a+=1,A()}function W(){if(!u)return;let R=n();try{s=new WebSocket(R),t("ws connecting %s",R),o="connecting",C(o),s.addEventListener("open",D),s.addEventListener("message",V),s.addEventListener("error",()=>{}),s.addEventListener("close",Y)}catch(S){t("ws connect failed %o",S),A()}}return W(),{send(R,S){if(!Gu.includes(R))return Promise.reject(new Error(`unknown message type: ${R}`));let P=Pa(),w=Vu(R,S,P);return t("send %s id=%s",R,P),new Promise((B,te)=>{d.set(P,{resolve:B,reject:te,type:R}),s&&s.readyState===s.OPEN?I(w):(t("queue %s id=%s (state=%s)",R,P,o),f.push(w))})},on(R,S){_.has(R)||_.set(R,new Set);let P=_.get(R);return P?.add(S),()=>{P?.delete(S)}},onConnection(R){return h.add(R),()=>{h.delete(R)}},reconnect(){u=!0,i&&(clearTimeout(i),i=null),a=0,W()},close(){u=!1,i&&(clearTimeout(i),i=null);try{s?.close()}catch{}},getState(){return o}}}function xg(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function Ag(e,t){try{let n=await(await fetch("/api/config")).json();e.setState({config:n})}catch(r){t("config refresh failed",r)}}var Da=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],Yu=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"],["tab:worker:closed","closed-issues"]],Rr="tab:worker:closed",Sg="bdui.worker.done-range",Zu=nu,Xu="worker:queue",Qu="worker:parallel-analysis",Ju="ui:order",ed="ui:display-policy",td="exec:presets",Ir="tab:board:closed",rd="beads-ui.board.closed-range";function Eg(e){let t=ft("main");t("bootstrap start");let r=l`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;Ge(r,e);let n=document.getElementById("global-nav"),s=document.getElementById("top-nav"),o=document.getElementById("repo-scope"),a=document.getElementById("usage-meter"),i=document.getElementById("board-root"),u=document.getElementById("worker-root"),d=document.getElementById("monitor-root"),f=document.getElementById("detail-panel");if(a&&ku(a),i&&u&&d&&f){let Ue=function(p,g){let x="Request failed",U="";if(p&&typeof p=="object"){let _e=p;if(typeof _e.message=="string"&&_e.message.length>0&&(x=_e.message),typeof _e.details=="string")U=_e.details;else if(_e.details&&typeof _e.details=="object")try{U=JSON.stringify(_e.details,null,2)}catch{U=""}}else typeof p=="string"&&p.length>0&&(x=p);let ve=g&&g.length>0?`Failed to load ${g}`:"Request failed";Me.open(ve,x,U)},ee=function(p){return`${Je.getState().workspace.current?.path||""}\0${p}`},De=function(){re&&(re().catch(()=>{}),re=null),Oe=null,Fe=null},de=function(p){ze=p;let g=()=>{ze!==p||Je.getState().selected_id!==p||(ze=null,rt(p))};if(!Ye){ct.then(g);return}g()},O=function(p,g,x,U,ve){return x!==k[g]?(ve().catch(()=>{}),!1):(p.set(U,ve),!0)},Z=function(){let p=Je.getState();Se(p.view==="board"),pe(p.view==="worker"),we(p.view==="monitor"),T(p.view==="board"||p.view==="worker"||G||!!p.selected_id)},je=function(){let p=Nr(ne);return p===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:p}}},me=function(){let p=Nr(ce);return p===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:p}}},Se=function(p){if(p)for(let[g,x]of Da){if(b.has(g)||$.has(g))continue;let U=g===Ir?je():{type:x};try{Ee.register(g,U)}catch(Re){t("register %s store failed: %o",g,Re)}$.add(g);let ve=k.board,_e=!1;Ie.subscribeList(g,U).then(Re=>{_e=!O(b,"board",ve,g,Re)}).catch(Re=>{t("subscribe %s failed: %o",g,Re),Ue(Re,"board")}).finally(()=>{$.delete(g),_e&&Z()})}else ot()},ot=function(){k.board+=1;for(let[p]of Da){let g=b.get(p);g&&(g().catch(()=>{}),b.delete(p));try{Ee.unregister(p)}catch(x){t("unregister %s failed: %o",p,x)}}},pe=function(p){if(!p){v();return}for(let[g,x]of Yu){if(j.has(g)||$.has(g))continue;let U=g===Rr?me():{type:x};try{Ee.register(g,U)}catch(Re){t("register %s store failed: %o",g,Re)}$.add(g);let ve=k.worker,_e=!1;Ie.subscribeList(g,U).then(Re=>{_e=!O(j,"worker",ve,g,Re)}).catch(Re=>{t("subscribe %s failed: %o",g,Re),Ue(Re,"worker")}).finally(()=>{$.delete(g),_e&&Z()})}},v=function(){k.worker+=1;for(let[p]of Yu){let g=j.get(p);g&&(g().catch(()=>{}),j.delete(p));try{Ee.unregister(p)}catch(x){t("unregister %s failed: %o",p,x)}}},T=function(p){if(!p){N();return}J||(Ae("subscribe-worker-queue",{id:Xu}).catch(g=>{t("subscribe-worker-queue failed: %o",g)}),Ae("subscribe-worker-parallel-analysis",{id:Qu}).catch(g=>{t("subscribe-worker-parallel-analysis failed: %o",g)}),J=()=>(Ae("unsubscribe-worker-parallel-analysis",{id:Qu}),Ae("unsubscribe-worker-queue",{id:Xu})))},N=function(){J&&(J().catch(()=>{}),J=null),We.clear()},we=function(p){if(!p){Q();return}X||(Ae("subscribe-monitor-pipeline",{id:Zu}).catch(g=>{t("subscribe-monitor-pipeline failed: %o",g)}),X=()=>Ae("unsubscribe-monitor-pipeline",{id:Zu}))},Q=function(){X&&(X().catch(()=>{}),X=null)},Le=function(){xe||(Ae("subscribe-ui-order",{id:Ju}).catch(p=>{t("subscribe-ui-order failed: %o",p)}),xe=()=>Ae("unsubscribe-ui-order",{id:Ju}))},gt=function(){xe&&(xe().catch(()=>{}),xe=null),Te.clear()},Ze=function(){ht||(Ae("subscribe-display-policy",{id:ed}).catch(p=>{t("subscribe-display-policy failed: %o",p)}),ht=()=>Ae("unsubscribe-display-policy",{id:ed}))},St=function(){ht&&(ht().catch(()=>{}),ht=null),tt.clear()},vt=function(){zt||(Ae("subscribe-impl-presets",{id:td}).catch(p=>{t("subscribe-impl-presets failed: %o",p)}),zt=()=>Ae("unsubscribe-impl-presets",{id:td}))},wt=function(p){if(!p)return"Unknown";let g=p.split("/").filter(Boolean);return g.length>0?g[g.length-1]:"Unknown"};var _=Ue,h=ee,C=De,A=de,I=O,D=Z,V=je,Y=me,W=Se,R=ot,S=pe,P=v,w=T,B=N,te=we,le=Q,M=Le,L=gt,ue=Ze,ge=St,$e=vt,Be=wt;let Qe=document.getElementById("header-loading"),Ve=Hi(Qe),Me=wc(e),ie=Ku(),Ae=Ve.wrapSend((p,g)=>ie.send(p,g)),Ie=Ni(Ae),Ee=qi(),be=Bi(),We=ji(),et=ki(),Te=Fi(),tt=vi(),K=wi(),F=$i();ie.on("impl-presets-snapshot",p=>{let g=p;g&&typeof g.revision=="number"&&Array.isArray(g.presets)&&K.set({revision:g.revision,presets:g.presets})}),ie.on("monitor-pipeline-snapshot",p=>{let g=p;if(!(!g||!Array.isArray(g.workspaces)))try{et.set(g.workspaces,g.workspaces_state)}catch{}}),ie.on("ui-order-snapshot",p=>{let g=p;if(g&&typeof g.revision=="number")try{Te.set({revision:g.revision,order:g.order&&typeof g.order=="object"?g.order:{}})}catch{}}),ie.on("display-policy-snapshot",p=>{let g=p;if(g&&g.policy&&typeof g.policy=="object")try{tt.set(g.policy)}catch{}}),ie.on("session-log-snapshot",p=>{let g=p;if(g&&typeof g.id=="string")try{F.set(g.id,Array.isArray(g.lines)?g.lines:[],typeof g.last_event_at=="number"?g.last_event_at:null)}catch{}}),ie.on("session-log-append",p=>{let g=p;if(g&&typeof g.id=="string")try{F.append(g.id,g.event)}catch{}}),ie.on("snapshot",p=>{let g=p,x=g&&typeof g.id=="string"?g.id:"",U=x?Ee.getStore(x):null;if(U&&g&&g.type==="snapshot")try{U.applyPush(g)}catch{}}),ie.on("upsert",p=>{let g=p,x=g&&typeof g.id=="string"?g.id:"",U=x?Ee.getStore(x):null;if(U&&g&&g.type==="upsert")try{U.applyPush(g)}catch{}}),ie.on("delete",p=>{let g=p,x=g&&typeof g.id=="string"?g.id:"",U=x?Ee.getStore(x):null;if(U&&g&&g.type==="delete")try{U.applyPush(g)}catch{}});let re=null,Oe=null,Fe=null,ze=null,Ce=()=>{},ct=new Promise(p=>{Ce=()=>p(void 0)}),Ye=!1,H=!1;async function rt(p){let g=ee(p);if(g===Oe||g===Fe)return;Fe=g;let x=`detail:${p}`,U={type:"issue-detail",params:{id:p}};try{Ee.register(x,U)}catch(ve){t("register detail store failed: %o",ve)}try{let ve=await Ie.subscribeList(x,U);if(Je.getState().selected_id!==p||ee(p)!==g){await ve().catch(()=>{});return}re&&await re().catch(()=>{}),re=ve,Oe=g}catch(ve){t("detail subscribe failed: %o",ve),Ue(ve,"issue details")}finally{Fe===g&&(Fe=null)}}let b=new Map,$=new Set,k={board:0,worker:0},G=!1,ne=Dt;try{let p=window.localStorage.getItem(rd);Bt(p)&&(ne=p)}catch{}let ce=Dt;try{let p=window.localStorage.getItem(Sg);Bt(p)&&(ce=p)}catch{}async function he(p){if(!Bt(p)||p===ne)return;ne=p;try{window.localStorage.setItem(rd,p)}catch{}let g=b.get(Ir);if(!g)return;b.delete(Ir),await g().catch(()=>{});let x=je();try{Ee.register(Ir,x)}catch(U){t("register %s store failed: %o",Ir,U)}try{let U=await Ie.subscribeList(Ir,x);b.set(Ir,U)}catch(U){t("re-subscribe %s failed: %o",Ir,U),Ue(U,"board")}}async function st(p){if(!Bt(p)||p===ce)return;ce=p;let g=j.get(Rr);if(!g)return;j.delete(Rr),await g().catch(()=>{});let x=me();try{Ee.register(Rr,x)}catch(U){t("register %s store failed: %o",Rr,U)}try{let U=await Ie.subscribeList(Rr,x);j.set(Rr,U)}catch(U){t("re-subscribe %s failed: %o",Rr,U),Ue(U,"worker")}}let j=new Map,J=null,X=null,xe=null,ht=null,zt=null;async function Ot(){ht=null,tt.clear(),zt=null,K.clear(),J=null,X=null,b.clear(),j.clear(),k.board+=1,k.worker+=1,vt();let p=Je.getState().workspace.current?.path;if(p)try{await ie.send("set-workspace",{path:p})}catch(x){t("workspace restore after reconnect failed: %o",x);return}Ze();let g=Je.getState();Se(g.view==="board"),pe(g.view==="worker"),we(g.view==="monitor"),T(g.view==="board"||g.view==="worker"||!!g.selected_id)}async function rr(){t("clearing all subscriptions for workspace switch"),ot(),v(),N(),be.clear(),gt(),Le(),St(),Ze(),De();let p=Je.getState();if(p.selected_id)try{Ee.unregister(`detail:${p.selected_id}`)}catch{}let g=Je.getState();Se(g.view==="board"),pe(g.view==="worker"),we(g.view==="monitor"),T(g.view==="board"||g.view==="worker"||!!g.selected_id),g.selected_id&&de(g.selected_id)}async function nr(p){t("requesting workspace switch to %s",p),H=!0;try{let g=await ie.send("set-workspace",{path:p});t("workspace switch result: %o",g),g&&g.workspace&&(Je.setState({workspace:{current:{path:g.workspace.root_dir,database:g.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",p),g.changed&&(await rr(),se("Switched to "+wt(p),"success",2e3)))}catch(g){throw t("workspace switch failed: %o",g),se("Failed to switch workspace","error",3e3),g}finally{H=!1}}async function sr(p){t("requesting workspace git pull for %s",p);try{let g=await ie.send("git-pull-workspace",{});t("workspace git pull result: %o",g);let x=g?.status;if(x==="up_to_date"){se("Already up to date","success",2e3);return}if(x==="stash_pop_conflict"){se("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}se("Git pulled "+wt(p),"success",2e3)}catch(g){t("workspace git pull failed: %o",g);let x=g?.code,U=g?.message;if(x==="rebase_conflict"){se("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(x==="rebase_conflict_abort_failed"){se("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(x==="busy"){se("Git pull skipped: another operation is running","warning",3e3);return}let ve=U?`: ${U}`:"";throw se(`Git pull failed${ve}`,"error",3e3),g}}async function fr(p,g){t("setting workspace visibility %s \u2192 %s",p,String(g));try{await ie.send("set-workspace-visibility",{path:p,visible:g}),await Ht()}catch(x){t("workspace visibility update failed: %o",x),se("Failed to update project visibility","error",3e3)}}async function Ht(){try{let p=await ie.send("list-workspaces",{});if(t("workspaces loaded: %o",p),p&&Array.isArray(p.workspaces)){let g=p.workspaces.map(_e=>({path:_e.path,database:_e.database,pid:_e.pid,version:_e.version})),x=p.current?{path:p.current.root_dir,database:p.current.db_path}:null,U=Array.isArray(p.hidden)?p.hidden.filter(_e=>typeof _e=="string"):[];Je.setState({workspace:{current:x,available:g,hidden:U}});let ve=window.localStorage.getItem("beads-ui.workspace");ve&&(!g.some(Re=>Re.path===ve)||U.includes(ve)?window.localStorage.removeItem("beads-ui.workspace"):x&&ve!==x.path&&(t("restoring saved workspace preference: %s",ve),await nr(ve)))}}catch(p){t("failed to load workspaces: %o",p)}}ie.on("workspace-changed",p=>{t("workspace-changed event: %o",p),p&&p.root_dir&&(Je.setState({workspace:{current:{path:p.root_dir,database:p.db_path}}}),Ht(),rr())});let or=!1;if(typeof ie.onConnection=="function"){let p=g=>{t("ws state %s",g),g==="reconnecting"||g==="closed"?(or=!0,se("Connection lost. Reconnecting\u2026","error",4e3)):g==="open"&&or&&(or=!1,se("Reconnected","success",2200),Ag(Je,(x,U)=>{t(`${x}: %o`,U)}),Ot())};ie.onConnection(p)}let ar="board";try{let p=window.localStorage.getItem("beads-ui.view");(p==="board"||p==="worker"||p==="monitor")&&(ar=p)}catch(p){t("view parse error: %o",p)}let Je=zi({config:xg(),view:ar});ie.on("worker-queue-snapshot",p=>{let g=p;if(!g||!g.queue)return;let x=Je.getState().workspace.current?.path;if(typeof x=="string"&&x.length>0&&g.root_dir!==x){t("dropping worker-queue snapshot for %s",String(g.root_dir));return}try{be.set(g.queue)}catch{}}),ie.on("worker-parallel-analysis-snapshot",p=>{let g=p;if(!g)return;let x=Je.getState().workspace.current?.path;if(!(typeof x=="string"&&x.length>0&&typeof g.root_dir=="string"&&g.root_dir!==x))try{We.set({settings:g.settings,job:g.job??null,runs:Array.isArray(g.runs)?g.runs:[],last_good:g.last_good??null})}catch{}});let Pt=Ui(Je);Pt.start();let ye=new Set(["get-comments","dep-add","dep-remove","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","get-session-defaults","set-session-defaults"]),c=async(p,g)=>{try{return await Ae(p,g)}catch(x){if(ye.has(p))throw x;return[]}};ou({global_element:n,repo_element:s},Je,Pt);let m=document.getElementById("workspace-picker");m&&Hu(m,Je,nr,sr,fr);let E=cu(e,(p,g)=>Ae(p,g));try{let p=document.getElementById("new-issue-btn");p&&p.addEventListener("click",()=>E.open())}catch{}let z=fu(e,{policyStore:tt,queueStore:be,implPresetStore:K,transport:(p,g)=>Ae(p,g),onOpenChange:p=>{G=p,Z()},labelOptions:()=>{let p=new Set;for(let[g]of Da)for(let x of Ee.snapshotFor(g)||[]){let U=x.labels;if(Array.isArray(U))for(let ve of U)typeof ve=="string"&&ve.length>0&&p.add(ve)}return Array.from(p).sort()}});try{let p=document.getElementById("display-settings-btn");p&&(p.setAttribute("aria-label","\uC124\uC815"),p.setAttribute("title","\uC124\uC815"),p.addEventListener("click",()=>z.open()))}catch{}let oe=rl(i,{gotoIssue:p=>Pt.gotoIssue(p),issueStores:Ee,transport:c,workerQueueStore:be,uiOrderStore:Te,displayPolicyStore:tt,closedRange:ne,onClosedRangeChange:p=>{he(p)},onNewIssue:()=>E.open()}),ke=Oa(u,{transport:c,issueStores:Ee,queueStore:be,analysisStore:We,sessionLogStore:F,uiOrderStore:Te,gotoIssue:p=>Je.setState({selected_id:p}),getWorkspacePath:()=>Je.getState().workspace.current?.path,doneRange:ce,onDoneRangeChange:p=>{st(p)}}),fe=su(d,{transport:c,pipelineStore:et,execPresetStore:K,gotoIssue:p=>Pt.gotoIssue(p),getWorkspacePath:()=>Je.getState().workspace.current?.path,switchWorkspace:p=>nr(p)}),Ke=vc(f,{issueStores:Ee,transport:c,queueStore:be,execPresetStore:K,sessionLogStore:F,getWorkspacePath:()=>Je.getState().workspace.current?.path,onNavigate:p=>{Je.getState().view==="worker"?Je.setState({selected_id:p}):Pt.gotoIssue(p)},onClose:()=>{let p=Je.getState();Je.setState({selected_id:null});try{Pt.gotoView(p.view==="worker"||p.view==="monitor"?p.view:"board")}catch{}},onOpenExecPresets:()=>{z.open("execution")}}),nt=Je.getState().selected_id;nt&&(f.hidden=!1,Ke.load(nt),de(nt)),Je.subscribe(p=>{let g=p.selected_id;g?(f.hidden=!1,Ke.load(g),H||de(g)):(Ke.clear(),f.hidden=!0,De())});let Ne=p=>{i.hidden=p.view!=="board",u.hidden=p.view!=="worker",d.hidden=p.view!=="monitor",o&&o.classList.toggle("is-quiet",p.view==="monitor"),Se(p.view==="board"),pe(p.view==="worker"),we(p.view==="monitor"),T(p.view==="board"||p.view==="worker"||G||!!p.selected_id),!p.selected_id&&p.view==="board"&&oe.load(),p.view==="worker"&&ke.load(),p.view==="monitor"?fe.load():fe.pause(),window.localStorage.setItem("beads-ui.view",p.view)};Je.subscribe(Ne),Ne(Je.getState()),Le(),Ze(),vt(),Ht().finally(()=>{Ye=!0,Ce()}),window.addEventListener("keydown",p=>{let g=p.ctrlKey||p.metaKey,x=String(p.key||"").toLowerCase(),U=p.target,ve=U&&U.tagName?String(U.tagName).toLowerCase():"",_e=ve==="input"||ve==="textarea"||ve==="select"||U&&typeof U.isContentEditable=="boolean"&&U.isContentEditable;g&&x==="n"&&(_e||(p.preventDefault(),E.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let r=window.localStorage.getItem("beads-ui.theme"),n=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=r==="dark"||r==="light"?r:n?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let r=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",r),window.localStorage.setItem("beads-ui.theme",r)});let t=document.getElementById("app");t&&Eg(t)});export{Eg as bootstrap,xg as readBootstrapConfig,Ag as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
