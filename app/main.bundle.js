var Pd=Object.create;var Qs=Object.defineProperty;var Dd=Object.getOwnPropertyDescriptor;var Md=Object.getOwnPropertyNames;var Nd=Object.getPrototypeOf,Fd=Object.prototype.hasOwnProperty;var qd=(e,t,r)=>t in e?Qs(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var Js=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var Bd=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of Md(t))!Fd.call(e,s)&&s!==r&&Qs(e,s,{get:()=>t[s],enumerable:!(n=Dd(t,s))||n.enumerable});return e};var jd=(e,t,r)=>(r=e!=null?Pd(Nd(e)):{},Bd(t||!e||!e.__esModule?Qs(r,"default",{value:e,enumerable:!0}):r,e));var rt=(e,t,r)=>qd(e,typeof t!="symbol"?t+"":t,r);var ri=Js((Rm,ti)=>{var jr=1e3,Ur=jr*60,Wr=Ur*60,Ir=Wr*24,zd=Ir*7,Hd=Ir*365.25;ti.exports=function(e,t){t=t||{};var r=typeof e;if(r==="string"&&e.length>0)return Gd(e);if(r==="number"&&isFinite(e))return t.long?Yd(e):Vd(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function Gd(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var r=parseFloat(t[1]),n=(t[2]||"ms").toLowerCase();switch(n){case"years":case"year":case"yrs":case"yr":case"y":return r*Hd;case"weeks":case"week":case"w":return r*zd;case"days":case"day":case"d":return r*Ir;case"hours":case"hour":case"hrs":case"hr":case"h":return r*Wr;case"minutes":case"minute":case"mins":case"min":case"m":return r*Ur;case"seconds":case"second":case"secs":case"sec":case"s":return r*jr;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r;default:return}}}}function Vd(e){var t=Math.abs(e);return t>=Ir?Math.round(e/Ir)+"d":t>=Wr?Math.round(e/Wr)+"h":t>=Ur?Math.round(e/Ur)+"m":t>=jr?Math.round(e/jr)+"s":e+"ms"}function Yd(e){var t=Math.abs(e);return t>=Ir?zn(e,t,Ir,"day"):t>=Wr?zn(e,t,Wr,"hour"):t>=Ur?zn(e,t,Ur,"minute"):t>=jr?zn(e,t,jr,"second"):e+" ms"}function zn(e,t,r,n){var s=t>=r*1.5;return Math.round(e/r)+" "+n+(s?"s":"")}});var si=Js((Im,ni)=>{function Kd(e){r.debug=r,r.default=r,r.coerce=c,r.disable=a,r.enable=s,r.enabled=l,r.humanize=ri(),r.destroy=u,Object.keys(e).forEach(f=>{r[f]=e[f]}),r.names=[],r.skips=[],r.formatters={};function t(f){let _=0;for(let b=0;b<f.length;b++)_=(_<<5)-_+f.charCodeAt(b),_|=0;return r.colors[Math.abs(_)%r.colors.length]}r.selectColor=t;function r(f){let _,b=null,E,k;function M(...P){if(!M.enabled)return;let A=M,j=Number(new Date),ee=j-(_||j);A.diff=ee,A.prev=_,A.curr=j,_=j,P[0]=r.coerce(P[0]),typeof P[0]!="string"&&P.unshift("%O");let x=0;P[0]=P[0].replace(/%([a-zA-Z%])/g,(S,H)=>{if(S==="%%")return"%";x++;let Y=r.formatters[H];if(typeof Y=="function"){let he=P[x];S=Y.call(A,he),P.splice(x,1),x--}return S}),r.formatArgs.call(A,P),(A.log||r.log).apply(A,P)}return M.namespace=f,M.useColors=r.useColors(),M.color=r.selectColor(f),M.extend=n,M.destroy=r.destroy,Object.defineProperty(M,"enabled",{enumerable:!0,configurable:!1,get:()=>b!==null?b:(E!==r.namespaces&&(E=r.namespaces,k=r.enabled(f)),k),set:P=>{b=P}}),typeof r.init=="function"&&r.init(M),M}function n(f,_){let b=r(this.namespace+(typeof _>"u"?":":_)+f);return b.log=this.log,b}function s(f){r.save(f),r.namespaces=f,r.names=[],r.skips=[];let _=(typeof f=="string"?f:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let b of _)b[0]==="-"?r.skips.push(b.slice(1)):r.names.push(b)}function o(f,_){let b=0,E=0,k=-1,M=0;for(;b<f.length;)if(E<_.length&&(_[E]===f[b]||_[E]==="*"))_[E]==="*"?(k=E,M=b,E++):(b++,E++);else if(k!==-1)E=k+1,M++,b=M;else return!1;for(;E<_.length&&_[E]==="*";)E++;return E===_.length}function a(){let f=[...r.names,...r.skips.map(_=>"-"+_)].join(",");return r.enable(""),f}function l(f){for(let _ of r.skips)if(o(f,_))return!1;for(let _ of r.names)if(o(f,_))return!0;return!1}function c(f){return f instanceof Error?f.stack||f.message:f}function u(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return r.enable(r.load()),r}ni.exports=Kd});var oi=Js((Ct,Hn)=>{Ct.formatArgs=Xd;Ct.save=Qd;Ct.load=Jd;Ct.useColors=Zd;Ct.storage=eu();Ct.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();Ct.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function Zd(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function Xd(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+Hn.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let r=0,n=0;e[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(r++,s==="%c"&&(n=r))}),e.splice(n,0,t)}Ct.log=console.debug||console.log||(()=>{});function Qd(e){try{e?Ct.storage.setItem("debug",e):Ct.storage.removeItem("debug")}catch{}}function Jd(){let e;try{e=Ct.storage.getItem("debug")||Ct.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function eu(){try{return localStorage}catch{}}Hn.exports=si()(Ct);var{formatters:tu}=Hn.exports;tu.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var rn=globalThis,Fn=rn.trustedTypes,Ba=Fn?Fn.createPolicy("lit-html",{createHTML:e=>e}):void 0,to="$lit$",ar=`lit$${Math.random().toFixed(9).slice(2)}$`,ro="?"+ar,Ud=`<${ro}>`,Er=document,nn=()=>Er.createComment(""),sn=e=>e===null||typeof e!="object"&&typeof e!="function",no=Array.isArray,Ga=e=>no(e)||typeof e?.[Symbol.iterator]=="function",eo=`[ 	
\f\r]`,tn=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ja=/-->/g,Ua=/>/g,Sr=RegExp(`>|${eo}(?:([^\\s"'>=/]+)(${eo}*=${eo}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Wa=/'/g,za=/"/g,Va=/^(?:script|style|textarea|title)$/i,so=e=>(t,...r)=>({_$litType$:e,strings:t,values:r}),i=so(1),gr=so(2),$m=so(3),Mt=Symbol.for("lit-noChange"),lt=Symbol.for("lit-nothing"),Ha=new WeakMap,Ar=Er.createTreeWalker(Er,129);function Ya(e,t){if(!no(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return Ba!==void 0?Ba.createHTML(t):t}var Ka=(e,t)=>{let r=e.length-1,n=[],s,o=t===2?"<svg>":t===3?"<math>":"",a=tn;for(let l=0;l<r;l++){let c=e[l],u,f,_=-1,b=0;for(;b<c.length&&(a.lastIndex=b,f=a.exec(c),f!==null);)b=a.lastIndex,a===tn?f[1]==="!--"?a=ja:f[1]!==void 0?a=Ua:f[2]!==void 0?(Va.test(f[2])&&(s=RegExp("</"+f[2],"g")),a=Sr):f[3]!==void 0&&(a=Sr):a===Sr?f[0]===">"?(a=s??tn,_=-1):f[1]===void 0?_=-2:(_=a.lastIndex-f[2].length,u=f[1],a=f[3]===void 0?Sr:f[3]==='"'?za:Wa):a===za||a===Wa?a=Sr:a===ja||a===Ua?a=tn:(a=Sr,s=void 0);let E=a===Sr&&e[l+1].startsWith("/>")?" ":"";o+=a===tn?c+Ud:_>=0?(n.push(u),c.slice(0,_)+to+c.slice(_)+ar+E):c+ar+(_===-2?l:E)}return[Ya(e,o+(e[r]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),n]},on=class e{constructor({strings:t,_$litType$:r},n){let s;this.parts=[];let o=0,a=0,l=t.length-1,c=this.parts,[u,f]=Ka(t,r);if(this.el=e.createElement(u,n),Ar.currentNode=this.el.content,r===2||r===3){let _=this.el.content.firstChild;_.replaceWith(..._.childNodes)}for(;(s=Ar.nextNode())!==null&&c.length<l;){if(s.nodeType===1){if(s.hasAttributes())for(let _ of s.getAttributeNames())if(_.endsWith(to)){let b=f[a++],E=s.getAttribute(_).split(ar),k=/([.?@])?(.*)/.exec(b);c.push({type:1,index:o,name:k[2],strings:E,ctor:k[1]==="."?Bn:k[1]==="?"?jn:k[1]==="@"?Un:Cr}),s.removeAttribute(_)}else _.startsWith(ar)&&(c.push({type:6,index:o}),s.removeAttribute(_));if(Va.test(s.tagName)){let _=s.textContent.split(ar),b=_.length-1;if(b>0){s.textContent=Fn?Fn.emptyScript:"";for(let E=0;E<b;E++)s.append(_[E],nn()),Ar.nextNode(),c.push({type:2,index:++o});s.append(_[b],nn())}}}else if(s.nodeType===8)if(s.data===ro)c.push({type:2,index:o});else{let _=-1;for(;(_=s.data.indexOf(ar,_+1))!==-1;)c.push({type:7,index:o}),_+=ar.length-1}o++}}static createElement(t,r){let n=Er.createElement("template");return n.innerHTML=t,n}};function Tr(e,t,r=e,n){if(t===Mt)return t;let s=n!==void 0?r._$Co?.[n]:r._$Cl,o=sn(t)?void 0:t._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(e),s._$AT(e,r,n)),n!==void 0?(r._$Co??(r._$Co=[]))[n]=s:r._$Cl=s),s!==void 0&&(t=Tr(e,s._$AS(e,t.values),s,n)),t}var qn=class{constructor(t,r){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:r},parts:n}=this._$AD,s=(t?.creationScope??Er).importNode(r,!0);Ar.currentNode=s;let o=Ar.nextNode(),a=0,l=0,c=n[0];for(;c!==void 0;){if(a===c.index){let u;c.type===2?u=new Br(o,o.nextSibling,this,t):c.type===1?u=new c.ctor(o,c.name,c.strings,this,t):c.type===6&&(u=new Wn(o,this,t)),this._$AV.push(u),c=n[++l]}a!==c?.index&&(o=Ar.nextNode(),a++)}return Ar.currentNode=Er,s}p(t){let r=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(t,n,r),r+=n.strings.length-2):n._$AI(t[r])),r++}},Br=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,r,n,s){this.type=2,this._$AH=lt,this._$AN=void 0,this._$AA=t,this._$AB=r,this._$AM=n,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,r=this._$AM;return r!==void 0&&t?.nodeType===11&&(t=r.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,r=this){t=Tr(this,t,r),sn(t)?t===lt||t==null||t===""?(this._$AH!==lt&&this._$AR(),this._$AH=lt):t!==this._$AH&&t!==Mt&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Ga(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==lt&&sn(this._$AH)?this._$AA.nextSibling.data=t:this.T(Er.createTextNode(t)),this._$AH=t}$(t){let{values:r,_$litType$:n}=t,s=typeof n=="number"?this._$AC(t):(n.el===void 0&&(n.el=on.createElement(Ya(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===s)this._$AH.p(r);else{let o=new qn(s,this),a=o.u(this.options);o.p(r),this.T(a),this._$AH=o}}_$AC(t){let r=Ha.get(t.strings);return r===void 0&&Ha.set(t.strings,r=new on(t)),r}k(t){no(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,n,s=0;for(let o of t)s===r.length?r.push(n=new e(this.O(nn()),this.O(nn()),this,this.options)):n=r[s],n._$AI(o),s++;s<r.length&&(this._$AR(n&&n._$AB.nextSibling,s),r.length=s)}_$AR(t=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);t!==this._$AB;){let n=t.nextSibling;t.remove(),t=n}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},Cr=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,r,n,s,o){this.type=1,this._$AH=lt,this._$AN=void 0,this.element=t,this.name=r,this._$AM=s,this.options=o,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=lt}_$AI(t,r=this,n,s){let o=this.strings,a=!1;if(o===void 0)t=Tr(this,t,r,0),a=!sn(t)||t!==this._$AH&&t!==Mt,a&&(this._$AH=t);else{let l=t,c,u;for(t=o[0],c=0;c<o.length-1;c++)u=Tr(this,l[n+c],r,c),u===Mt&&(u=this._$AH[c]),a||(a=!sn(u)||u!==this._$AH[c]),u===lt?t=lt:t!==lt&&(t+=(u??"")+o[c+1]),this._$AH[c]=u}a&&!s&&this.j(t)}j(t){t===lt?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Bn=class extends Cr{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===lt?void 0:t}},jn=class extends Cr{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==lt)}},Un=class extends Cr{constructor(t,r,n,s,o){super(t,r,n,s,o),this.type=5}_$AI(t,r=this){if((t=Tr(this,t,r,0)??lt)===Mt)return;let n=this._$AH,s=t===lt&&n!==lt||t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive,o=t!==lt&&(n===lt||s);s&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Wn=class{constructor(t,r,n){this.element=t,this.type=6,this._$AN=void 0,this._$AM=r,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(t){Tr(this,t)}},Za={M:to,P:ar,A:ro,C:1,L:Ka,R:qn,D:Ga,V:Tr,I:Br,H:Cr,N:jn,U:Un,B:Bn,F:Wn},Wd=rn.litHtmlPolyfillSupport;Wd?.(on,Br),(rn.litHtmlVersions??(rn.litHtmlVersions=[])).push("3.3.1");var je=(e,t,r)=>{let n=r?.renderBefore??t,s=n._$litPart$;if(s===void 0){let o=r?.renderBefore??null;n._$litPart$=s=new Br(t.insertBefore(nn(),o),o,void 0,r??{})}return s._$AI(e),s};var Lt="today",tr=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}];function Nt(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function Rr(e,t=Date.now()){switch(e){case"today":{let r=new Date(t);return r.setHours(0,0,0,0),r.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function Xa(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Qa(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Ja(){let e=null,t=[],r=new Set;function n(){for(let s of Array.from(r))try{s()}catch{}}return{get(){return e},getWorkspacesState(){return t},set(s,o){e=Array.isArray(s)?s:null,t=Array.isArray(o)?o:[],n()},clear(){e=null,t=[],n()},subscribe(s){return r.add(s),()=>r.delete(s)}}}function ei(){let e=new Map,t=new Set;function r(s){return s.startsWith("session-log:")?s:`session-log:${s}`}function n(){for(let s of Array.from(t))try{s()}catch{}}return{set(s,o,a=null){e.set(r(s),{lines:Array.isArray(o)?[...o]:[],last_event_at:typeof a=="number"?a:null}),n()},append(s,o){let a=r(s),l=e.get(a)||{lines:[],last_event_at:null};l.lines=[...l.lines,o],l.last_event_at=Date.now(),e.set(a,l),n()},get(s){return e.get(r(s))||null},clear(s){typeof s=="string"?e.delete(r(s)):e.clear(),n()},subscribe(s){return t.add(s),()=>t.delete(s)}}}var ai=jd(oi(),1);function at(e){return(0,ai.default)(`beads-ui:${e}`)}function zt(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function Lr(e,t){let r=zt(e.created_at),n=zt(t.created_at);if(r!==n)return r<n?1:-1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,l=t.id;return a<l?-1:a>l?1:0}function ci(e,t){let r=zt(e.created_at),n=zt(t.created_at);if(r!==n)return r<n?-1:1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,l=t.id;return a<l?-1:a>l?1:0}function di(e,t){let r=zt(e.updated_at),n=zt(t.updated_at);if(r!==n)return r<n?1:-1;let s=e.id,o=t.id;return s<o?-1:s>o?1:0}function ui(e,t){let r=e.priority??2,n=t.priority??2;if(r!==n)return r-n;let s=zt(e.created_at),o=zt(t.created_at);if(s!==o)return s<o?1:-1;let a=e.id,l=t.id;return a<l?-1:a>l?1:0}function pi(e,t){let r=e.closed_at??0,n=t.closed_at??0;if(r!==n)return r<n?1:-1;let s=e?.id,o=t?.id;return s<o?-1:s>o?1:0}var ru=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function ii(e){let t=e&&e.metadata,r=t?t.task_order:void 0;if(r==null||r==="")return Number.POSITIVE_INFINITY;let n=Number(r);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function li(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let r=ru.exec(t);if(!r)return Number.POSITIVE_INFINITY;let n=Number(r[1]);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function fi(e,t){let r=ii(e),n=ii(t);if(r!==n)return r<n?-1:1;let s=li(e),o=li(t);if(s!==o)return s<o?-1:1;let a=zt(e&&e.created_at),l=zt(t&&t.created_at);if(a!==l)return a<l?-1:1;let c=e&&e.id,u=t&&t.id;return c===u?0:String(c)<String(u)?-1:1}var oo=2**20;function zr(e,t){let r=e&&e.id;return t&&typeof r=="string"&&Object.prototype.hasOwnProperty.call(t,r)&&typeof t[r]=="number"&&Number.isFinite(t[r])?t[r]:-zt(e&&e.created_at)}function Gn(e){return(t,r)=>{let n=zr(t,e),s=zr(r,e);if(n!==s)return n<s?-1:1;let o=t?.id,a=r?.id;return o<a?-1:o>a?1:0}}function ao(e,t,r){let n=Array.isArray(e)?e:[],s=n.length,o=Math.max(0,Math.min(t,s-1)),a=o-1>=0?n[o-1]:null,l=o+1<s?n[o+1]:null;if(!a&&!l)return{rank:0};if(!a)return{rank:zr(l,r)-oo};if(!l)return{rank:zr(a,r)+oo};let c=zr(a,r),u=zr(l,r),f=(c+u)/2;return c<f&&f<u?{rank:f}:{renormalize:n.map((_,b)=>({bead_id:_.id,rank:b*oo}))}}function io(e,t={}){let r=at(`issue-store:${e}`),n=new Map,s=[],o=0,a=new Set,l=!1,c=t.sort||Lr;function u(){for(let b of Array.from(a))try{b()}catch{}}function f(){s=Array.from(n.values()).sort(c)}function _(b){if(l||!b||b.id!==e)return;let E=Number(b.revision)||0;if(r("apply %s rev=%d",b.type,E),!(E<=o&&b.type!=="snapshot")){if(b.type==="snapshot"){if(E<=o)return;n.clear();let k=Array.isArray(b.issues)?b.issues:[];for(let M of k)M&&typeof M.id=="string"&&M.id.length>0&&n.set(M.id,M);f(),o=E,u();return}if(b.type==="upsert"){let k=b.issue;if(k&&typeof k.id=="string"&&k.id.length>0){let M=n.get(k.id);if(!M)n.set(k.id,k);else{let P=Number.isFinite(M.updated_at)?M.updated_at:0,A=Number.isFinite(k.updated_at)?k.updated_at:0;if(P<=A){for(let j of Object.keys(M))j in k||delete M[j];for(let[j,ee]of Object.entries(k))M[j]=ee}}f()}o=E,u()}else if(b.type==="delete"){let k=String(b.issue_id||"");k&&(n.delete(k),f()),o=E,u()}}}return{id:e,subscribe(b){return a.add(b),()=>{a.delete(b)}},applyPush:_,snapshot(){return s},size(){return n.size},getById(b){return n.get(b)},dispose(){l=!0,n.clear(),s=[],a.clear(),o=0}}}function Vn(e){let t=String(e.type||"").trim(),r={};if(e.params&&typeof e.params=="object"){let s=Object.keys(e.params).sort();for(let o of s){let a=e.params[o];r[o]=String(a)}}let n=new URLSearchParams(r).toString();return n.length>0?`${t}?${n}`:t}function _i(e){let t=at("subs"),r=new Map,n=new Map;function s(l,c){t("applyDelta %s +%d ~%d -%d",l,(c.added||[]).length,(c.updated||[]).length,(c.removed||[]).length);let u=n.get(l);if(!u||u.size===0)return;let f=Array.isArray(c.added)?c.added:[],_=Array.isArray(c.updated)?c.updated:[],b=Array.isArray(c.removed)?c.removed:[];for(let E of Array.from(u)){let k=r.get(E);if(!k)continue;let M=k.itemsById;for(let P of f)typeof P=="string"&&P.length>0&&M.set(P,!0);for(let P of _)typeof P=="string"&&P.length>0&&M.set(P,!0);for(let P of b)typeof P=="string"&&P.length>0&&M.delete(P)}}async function o(l,c){let u=Vn(c);if(t("subscribe %s key=%s",l,u),!r.has(l))r.set(l,{key:u,itemsById:new Map});else{let _=r.get(l);if(_&&_.key!==u){let b=n.get(_.key);b&&(b.delete(l),b.size===0&&n.delete(_.key)),r.set(l,{key:u,itemsById:new Map})}}n.has(u)||n.set(u,new Set);let f=n.get(u);f&&f.add(l);try{await e("subscribe-list",{id:l,type:c.type,params:c.params})}catch(_){let b=r.get(l)||null;if(b){let E=n.get(b.key);E&&(E.delete(l),E.size===0&&n.delete(b.key))}throw r.delete(l),_}return async()=>{t("unsubscribe %s key=%s",l,u);try{await e("unsubscribe-list",{id:l})}catch{}let _=r.get(l)||null;if(_){let b=n.get(_.key);b&&(b.delete(l),b.size===0&&n.delete(_.key))}r.delete(l)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:Vn,selectors:{getIds(l){let c=r.get(l);return c?Array.from(c.itemsById.keys()):[]},has(l,c){let u=r.get(l);return u?u.itemsById.has(c):!1},count(l){let c=r.get(l);return c?c.itemsById.size:0},getItemsById(l){let c=r.get(l),u={};if(!c)return u;for(let f of c.itemsById.keys())u[f]=!0;return u}}}}function mi(){let e=at("issue-stores"),t=new Map,r=new Map,n=new Set,s=new Map;function o(){for(let c of Array.from(n))try{c()}catch{}}function a(c,u,f){let _=u?Vn(u):"",b=r.get(c)||"",E=t.has(c);if(e("register %s key=%s (prev=%s)",c,_,b),E&&b&&_&&b!==_){let k=t.get(c);if(k)try{k.dispose()}catch{}let M=s.get(c);if(M){try{M()}catch{}s.delete(c)}let P=io(c,f);t.set(c,P);let A=P.subscribe(()=>o());s.set(c,A)}else if(!E){let k=io(c,f);t.set(c,k);let M=k.subscribe(()=>o());s.set(c,M)}return r.set(c,_),()=>l(c)}function l(c){e("unregister %s",c),r.delete(c);let u=t.get(c);u&&(u.dispose(),t.delete(c));let f=s.get(c);if(f){try{f()}catch{}s.delete(c)}}return{register:a,unregister:l,getStore(c){return t.get(c)||null},snapshotFor(c){let u=t.get(c);return u?u.snapshot().slice():[]},subscribe(c){return n.add(c),()=>n.delete(c)}}}function gi(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function bi(){let e=null,t=!1,r=new Set;function n(){for(let s of Array.from(r))try{s()}catch{}}return{get(){return e},set(s){e=s,n()},isPending(){return t},setPending(s){let o=s===!0;o!==t&&(t=o,n())},clear(){e=null,t=!1,n()},subscribe(s){return r.add(s),()=>r.delete(s)}}}function hi(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function lo(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function nu(e){let t=String(e||""),r=t.startsWith("#")?t.slice(1):t,n=r.indexOf("?"),s=n>=0?r.slice(n+1):"";if(s){let l=new URLSearchParams(s).get("issue");if(l)return decodeURIComponent(l)}let o=/^\/issue\/([^\s?#]+)/.exec(r);return o&&o[1]?decodeURIComponent(o[1]):null}function su(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function yi(e){let t=at("router"),r=()=>{let n=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(n),o=s&&s[1]?decodeURIComponent(s[1]):nu(n),a=su(n);if(t("hash change \u2192 view=%s id=%s",a,o),e.setState({selected_id:a==="worker"?null:o,view:a,worker:{selected_parent_id:a==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(n)){let c=o?`#/${a}?issue=${encodeURIComponent(o)}`:`#/${a}`;window.location.hash!==c&&(window.location.hash=c)}};return{start(){window.addEventListener("hashchange",r),r()},stop(){window.removeEventListener("hashchange",r)},gotoIssue(n){let s=e.getState?e.getState():{view:"board"},o=s.view==="worker"||s.view==="monitor"?s.view:"board",a=lo(o,n);t("goto issue %s (view=%s)",n,o),window.location.hash!==a?window.location.hash=a:e.setState({selected_id:o==="worker"?null:n,view:o,worker:{selected_parent_id:o==="worker"?n:null}})},gotoView(n){let s=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},o=n==="worker"?s.worker?.selected_parent_id:s.selected_id,a=o?lo(n,o):`#/${n}`;t("goto view %s (id=%s)",n,o||""),window.location.hash!==a?window.location.hash=a:e.setState({view:n,selected_id:n==="worker"?null:s.selected_id})}}}var ou=Object.freeze({workspace_config:{default_workspace:null}});function vi(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:ou.workspace_config.default_workspace}}}function wi(e={}){let t=at("state"),r={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:vi(e.config)},n=new Set;function s(){for(let o of Array.from(n))try{o(r)}catch{}}return{getState(){return r},setState(o){let a={...r,...o,filters:{...r.filters,...o.filters||{}},board:{...r.board,...o.board||{}},worker:{...r.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:r.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:r.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:r.workspace.hidden},config:o.config!==void 0?vi(o.config):r.config},l=a.workspace.current?.path!==r.workspace.current?.path||a.workspace.available.length!==r.workspace.available.length||a.workspace.hidden.length!==r.workspace.hidden.length||a.workspace.hidden.some((u,f)=>u!==r.workspace.hidden[f]),c=a.config.workspace_config.default_workspace!==r.config.workspace_config.default_workspace;a.selected_id===r.selected_id&&a.view===r.view&&a.filters.status===r.filters.status&&a.filters.search===r.filters.search&&a.filters.type===r.filters.type&&a.board.closed_filter===r.board.closed_filter&&a.worker.selected_parent_id===r.worker.selected_parent_id&&a.worker.show_closed_children.length===r.worker.show_closed_children.length&&a.worker.show_closed_children.every((u,f)=>u===r.worker.show_closed_children[f])&&!l&&!c||(r=a,t("state change %o",{selected_id:r.selected_id,view:r.view,filters:r.filters,board:r.board,worker:r.worker,workspace:r.workspace.current?.path,config:{default_workspace:r.config.workspace_config.default_workspace}}),s())},subscribe(o){return n.add(o),()=>n.delete(o)}}}function ki(e){let t=at("activity"),r=0,n=new Map,s=1;function o(){if(!e)return;let u=r>0;e.toggleAttribute("hidden",!u),e.setAttribute("aria-busy",u?"true":"false")}function a(){r+=1,t("start count=%d",r),o()}function l(){let u=r;r=Math.max(0,r-1),u<=0?t("done called but count was already %d",u):t("done count=%d\u2192%d",u,r),o()}function c(u){return async(_,b)=>{let E=s++,k=Date.now();n.set(E,{type:_,start_ts:k}),t("request start id=%d type=%s count=%d",E,_,r+1),a();let M=!1,P=()=>{M||(M=!0,n.delete(E),l())},A=setTimeout(()=>{M||(t("request TIMEOUT id=%d type=%s elapsed=%dms",E,_,Date.now()-k),P())},3e4);try{let j=await u(_,b),ee=Date.now()-k;return t("request done id=%d type=%s elapsed=%dms",E,_,ee),j}catch(j){let ee=Date.now()-k;throw t("request error id=%d type=%s elapsed=%dms err=%o",E,_,ee,j),j}finally{clearTimeout(A),P()}}}return o(),{wrapSend:c,start:a,done:l,getCount:()=>r,getActiveRequests:()=>{let u=Date.now();return Array.from(n.entries()).map(([f,_])=>({id:f,type:_.type,elapsed_ms:u-_.start_ts}))}}}function ie(e,t="info",r=2800){let n=document.createElement("div");n.className="toast",n.textContent=e,n.style.position="fixed",n.style.right="12px",n.style.bottom="12px",n.style.zIndex="1000",n.style.color="#fff",n.style.padding="8px 10px",n.style.borderRadius="4px",n.style.fontSize="12px",t==="success"?n.style.background="#156d36":t==="warning"?n.style.background="#a36a00":t==="error"?n.style.background="#9f2011":n.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(n),setTimeout(()=>{try{n.remove()}catch{}},r)}function Yn(e=void 0,t=void 0){function r(){if(!t||typeof t.get!="function")return null;let o=t.get();return o&&o.order?o.order:{}}function n(o,a,l){let c=e&&e.snapshotFor?e.snapshotFor(o).slice():[];if(a==="closed")return c.sort(pi),c;switch(l){case"created_desc":return c.sort(Lr),c;case"created_asc":return c.sort(ci),c;case"updated_desc":return c.sort(di),c;case"priority":return c.sort(ui),c;case"manual":default:{let u=r();return u?c.sort(Gn(u)):c.sort(Lr),c}}}function s(o){let a=[];return e&&typeof e.subscribe=="function"&&a.push(e.subscribe(o)),t&&typeof t.subscribe=="function"&&a.push(t.subscribe(o)),()=>{for(let l of a)try{l()}catch{}}}return{selectBoardColumn:n,subscribe:s}}function Or(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function mt(e){let t=Or(e);if(t===null)return"";let r=new Date(t),n=s=>String(s).padStart(2,"0");return`${r.getFullYear()}-${n(r.getMonth()+1)}-${n(r.getDate())} ${n(r.getHours())}:${n(r.getMinutes())}`}function Ot(e,t){let r=Or(e);if(r===null)return"";let s=(typeof t=="number"?t:Date.now())-r;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let a=Math.floor(s/36e5);if(a<24)return`${a}\uC2DC\uAC04 \uC804`;let l=Math.floor(s/864e5);if(l<7)return`${l}\uC77C \uC804`;let c=Math.floor(l/7);if(l<30)return`${c}\uC8FC \uC804`;let u=Math.floor(l/30);return u<12?`${u}\uAC1C\uC6D4 \uC804`:`${Math.floor(l/365)}\uB144 \uC804`}function Kn(e){if(!Array.isArray(e))return null;let t=null,r=-1;for(let n of e){if(!n||n.status!=="in_progress")continue;let s=Or(n.updated_at)??0;if(t===null||s>r){t=n,r=s;continue}s===r&&String(n.id)<String(t.id)&&(t=n)}return t}function Zn(e){let t=e.transport,r=e.uiOrderStore;function n(a,l){return"renormalize"in a?a.renormalize:[{bead_id:l,rank:a.rank}]}function s(a,l){let c={...a.order};for(let u of l)c[u.bead_id]=u.rank;r&&r.set({revision:a.revision,order:c})}async function o(a,l,c){if(!t||!r)return;let u=r.get()||{revision:0,order:{}},f=n(ao(l,c,u.order),a);s(u,f);let _=await t("ui-order-set",{expected_revision:u.revision,entries:f});if(_&&_.conflict){let b={revision:typeof _.revision=="number"?_.revision:0,order:_.order||{}};r.set(b);let E=n(ao(l,c,b.order),a);s(b,E);let k=await t("ui-order-set",{expected_revision:b.revision,entries:E});k&&k.applied&&r.set({revision:typeof k.revision=="number"?k.revision:0,order:k.order||{}})}else _&&_.applied&&r.set({revision:typeof _.revision=="number"?_.revision:0,order:_.order||{}})}return{applyReorder:o}}function Xn(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function co(e,t){return!t||typeof e!="string"||e.length===0||Xn(t.visible_labels).includes(e)?!0:Xn(t.hidden_labels).includes(e)?!1:!Xn(t.hidden_prefixes).some(r=>r.length>0&&e.startsWith(r))}function Qn(e,t){return Xn(e).filter(r=>co(r,t))}function br(e,t){let r=e&&e.chips?e.chips[t]:void 0;return typeof r=="boolean"?r:!0}var au={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},xi={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},$i={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},iu={review:"\u2713",skip:"\u2298"},hr={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function lu(e,t,r){if(!(r==="in_progress"||r==="resolved"))return null;for(let s of e){let o=t[s];if(o&&o.fill==="dim"&&o.stale!==!0)return s}return null}function Si(e){let t=e&&e.fill||"none";return t==="none"?hr.none:e&&e.stale===!0?hr.stale:t==="dim"?hr.dim:e&&e.glyph==="review"?hr.review:e&&e.glyph==="skip"?hr.skip:hr.done}function cu(e){if(!e||e.fill==="none"||!e.approval_state)return Si(e);let t=[];return e.glyph==="review"?t.push(hr.review):e.glyph==="skip"&&t.push(hr.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function du(e,t,r){let n=au[e]||e,s=t&&t.fill||"none",o=!!t&&t.stale===!0,a=iu[t&&t.glyph||""]||"",l="bar";s==="dim"?l+=` b-${n} dim`:s==="full"&&(l+=` b-${n} full`),o&&(l+=" stale"),r&&(l+=" cur");let c=s==="none"?"lbl":`lbl l-${n} on`,u=r?`color: var(--stage-${n}-on)`:"";return i`
    <div class="seg">
      <div class=${l} style=${u}>${a}</div>
      <div class=${c}>
        ${xi[e]||e}
      </div>
    </div>
  `}function Jn(e,t){if(!e||!e.stages)return"";let r=$i[e.route]||$i.spec_backed,n=e.stages,s=lu(r,n,String(t||"open")),o=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${r.map(a=>`${xi[a]||a} ${a==="plan"?cu(n[a]||{}):Si(n[a]||{})}`).join(" \xB7 ")}`;return i`
    <div class="stp" role="img" aria-label=${o}>
      ${r.map(a=>du(a,n[a]||{},a===s))}
    </div>
  `}function uu(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var Ai=2;function pu(e){if(!e)return[];let t=[];if(e.external){let n=e.reason?`\u23F8 blocked: ${e.reason}`:"\u23F8 blocked";t.push(i`<span class="ctl-chip ctl-chip--blocked">${n}</span>`)}let r=Array.isArray(e.blockers)?e.blockers:[];if(r.length>0){let n=r.slice(0,Ai).join(", "),s=r.length-Ai,o=`\u26D3 blocked: ${n}${s>0?` +${s}`:""}`;t.push(i`<span class="ctl-chip ctl-chip--blocked-dep">${o}</span>`)}return t}function uo(e){return e==="delegated"?"\uC704\uC784":e==="main"?"\uBA54\uC778":null}function es(e,t){if(!e)return null;let r=uo(e.kind),n=e.reason,s=e.kind==="delegated"?n===null:typeof n=="string"&&n.trim().length>0&&!/[\r\n]/.test(n);if(!r||!s)return null;let o=uo(t?.kind),a=o!==null&&t?.kind!==e.kind,l=`\uACC4\uD68D \xB7 ${r}${a?` \u2192 ${o}`:""}`,c=`planned_execution ${e.kind}${typeof n=="string"?`:${n}`:""}`,u=t?` \xB7 exec_receipt ${t.kind}:${t.actor}@${t.sha}`:"";return{kind:e.kind,label:l,title:`${c}${u}`}}function Ei(e,t){let r=es(e,t);return r?i`<span
        class="ctl-chip ctl-chip--planned"
        data-kind=${r.kind}
        title=${r.title}
        >${r.label}</span
      >`:null}function fu(e){if(!e)return null;let t=uo(e.kind);return t?i`<span
    class="ctl-chip ctl-chip--exec-receipt"
    title=${`exec_receipt ${e.kind}:${e.actor}@${e.sha}`}
    >${`\uC2E4\uD589 \xB7 ${t}`}</span
  >`:null}function _u(e,t){let r=t.policy||null,n=e.workflow&&e.workflow.chips||{},s=[];if(n.route&&br(r,"route")){let l=n.route_source==="derived";s.push(i`<span
        class="ctl-chip ctl-chip--route${l?" is-derived":""}"
        title=${l?"route \uBBF8\uD540 (metadata unset)":"route"}
        >${l?"unset":n.route}</span
      >`)}if(n.fast_track&&br(r,"fast_track")&&s.push(i`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),n.pr&&br(r,"pr")){let l=n.pr.number;s.push(i`<span class="ctl-chip ctl-chip--pr"
        >${`PR${l!=null?` #${l}`:""}`}</span
      >`)}let o=Ei(n.planned_execution,n.exec_receipt);if(o&&s.push(o),n.exec_receipt){let l=n.exec_receipt;s.push(i`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${l.kind}:${l.actor}@${l.sha}`}
        >${`exec ${l.kind==="delegated"?l.actor:`main:${l.actor}`} \xB7 ${l.sha.slice(0,7)}`}</span
      >`)}if(n.impl_entry){let l=n.impl_entry;s.push(i`<span
        class="ctl-chip ctl-chip--impl-entry"
        title=${`impl_entry ${l.actor}@${l.sha}`}
        >${`impl ${l.actor} \xB7 ${l.sha.slice(0,7)}`}</span
      >`)}for(let l of Qn(e.labels,r))s.push(i`<span class="ctl-chip ctl-chip--label">${l}</span>`);return e.from_id&&br(r,"from")&&s.push(i`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${l=>{l.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(l,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),br(r,"blocked")&&s.push(...pu(e.blocked_info)),t.cleanupFailureFor&&t.cleanupFailureFor(e.id)&&br(r,"blocked")&&s.push(i`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 멈춤</span>`),s.length===0?"":i`<div class="board-card__chips">${s}</div>`}function mu(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function gu(e){let t=Ot(e.created_at),r=Ot(e.updated_at);return!t&&!r?"":i`<span class="board-card__times">
    ${t?i`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${mt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}
    ${t&&r?i`<span class="board-card__time-sep">·</span>`:""}
    ${r?i`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${mt(e.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </span>`}function bu(e,t){let r=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]},n=r.total||0,s=t.isExpanded?t.isExpanded(e.id):!0,o=n>0?r.children.slice().sort(fi):r.children;return i`
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
        ${gu(e)}
      </div>
      ${n>0&&r.current?i`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${r.current.title||r.current.id}</span
            >
          </div>`:""}
      ${s&&n>0?i`<div class="board-card__roll-list">
            ${o.map((a,l)=>i`<button
                  type="button"
                  class="board-card__roll-child"
                  @click=${c=>t.onChildClick&&t.onChildClick(c,a.id)}
                >
                  <span class=${mu(a.status)}>●</span>
                  <span class="board-card__roll-child-ord">${l+1}</span>
                  <span class="board-card__roll-child-title"
                    >${a.title||a.id}</span
                  >
                  ${es(a.workflow?.chips?.planned_execution,a.workflow?.chips?.exec_receipt)?i`<span class="board-card__roll-child-chips">
                        ${Ei(a.workflow?.chips?.planned_execution,a.workflow?.chips?.exec_receipt)}
                        ${fu(a.workflow?.chips?.exec_receipt)}
                      </span>`:""}
                </button>`)}
          </div>`:""}
    </div>
  `}function ts(e,t){let r=uu(e.priority);return i`
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
      ${_u(e,t)}
      ${e.workflow&&br(t.policy||null,"stepper")?Jn(e.workflow,e.status):""}
      ${bu(e,t)}
    </article>
  `}function Hr(e,t){let r=Array.isArray(e.items)?e.items.length:0,n=e.is_closed===!0;return i`
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
              ${tr.map(o=>i`<option
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
        ${e.items.map(o=>ts(o,t))}
      </div>
    </section>
  `}function Ti(e,t,r){return i`
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
          ${e.items.length===0?i`<div class="deferred-popup__empty">Deferred 이슈 없음</div>`:e.items.map(n=>ts(n,t))}
        </div>
      </div>
    </dialog>
  `}var hu=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],yu=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],vu=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function wu(e,t,r){let n=e.labels.length,s=n>0?`\uB77C\uBCA8 ${n}`:"\uB77C\uBCA8";return i`
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
  `}function Ci(e,t,r){return i`
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
        ${hu.map(n=>i`<option
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
        ${yu.map(n=>i`<option
              value=${n.value}
              ?selected=${e.type===n.value}
            >
              ${n.label}
            </option>`)}
      </select>
      ${wu(e,t,r)}
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
        ${vu.map(n=>i`<option
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
  `}var ku=200,$u={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},xu=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),Ri="beads-ui.board.sort",Ii=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function Su(){try{let e=window.localStorage.getItem(Ri);if(e&&Ii.has(e))return e}catch{}return"created_desc"}function Li(e,t){let r=at("views:board"),n=t.gotoIssue,s=t.issueStores,o=t.transport,a=t.uiOrderStore,l=t.displayPolicyStore,c=t.workerQueueStore,u=t.onClosedRangeChange,f=t.onNewIssue,_=t.closedRange||Lt,b=s?Yn(s,a):null,E=Zn({transport:o,uiOrderStore:a}),k=[],M=[],P=[],A=[],j=[],ee=[],x=!1,w=0,S=Su(),H=new Map,Y=new Map,he=new Map,le=new Set,se={search:"",priority:"",type:"",labels:[]},de=!1,Ne=null;function Ue(W){return String(W.status||"open")==="open"}function Ge(W){let J=String(W.status||"open");return J==="open"||J==="blocked"}function ze(W){let J=se.search.trim().toLowerCase(),ye=se.priority,ve=se.type,oe=se.labels;return W.filter(De=>{if(J){let tt=String(De.id||"").toLowerCase(),Ye=String(De.title||"").toLowerCase();if(!tt.includes(J)&&!Ye.includes(J))return!1}if(ye!==""&&String(De.priority)!==ye||ve!==""&&String(De.issue_type||"")!==ve)return!1;if(oe.length>0){let tt=Array.isArray(De.labels)?De.labels:[];if(!oe.some(Ye=>tt.includes(Ye)))return!1}return!0})}function Ze(){let W=new Set;for(let J of[k,M,P,A,j,ee])for(let ye of J){let ve=Array.isArray(ye.labels)?ye.labels:[];for(let oe of ve)typeof oe=="string"&&oe.length>0&&W.add(oe)}return Array.from(W).sort()}function qe(){return se.search.trim()!==""||se.priority!==""||se.type!==""||se.labels.length>0}function ke(){try{if(b){let W=b.selectBoardColumn("tab:board:in-progress","in_progress",S),J=b.selectBoardColumn("tab:board:blocked","blocked",S).filter(Ge),ye=new Set(W.map(Ae=>Ae.id)),ve=b.selectBoardColumn("tab:board:ready","ready",S).filter(Ae=>Ue(Ae)&&!ye.has(Ae.id)),oe=b.selectBoardColumn("tab:board:resolved","resolved",S),De=b.selectBoardColumn("tab:board:deferred","deferred",S),tt=b.selectBoardColumn("tab:board:closed","closed").slice(0,ku),Ye=[...J,...ve,...W,...oe,...tt];we(Ye);let Pe=new Set;for(let Ae of Ye)Ae&&Ae.id&&!po(Ae)&&Pe.add(Ae.id);let Xe=!qe();k=Xe?an(J,Pe):J,M=Xe?an(ve,Pe):ve,P=Xe?an(W,Pe):W,A=Xe?an(oe,Pe):oe,j=De,w=De.length,ee=Xe?an(tt,Pe):tt,H=new Map;for(let Ae of k)H.set(Ae.id,"open");for(let Ae of M)H.set(Ae.id,"open");for(let Ae of P)H.set(Ae.id,"in_progress");for(let Ae of A)H.set(Ae.id,"resolved");for(let Ae of j)H.set(Ae.id,"deferred");for(let Ae of ee)H.set(Ae.id,"closed");Y=new Map;for(let Ae of k)Y.set(Ae.id,"blocked-col");for(let Ae of M)Y.set(Ae.id,"ready-col");for(let Ae of P)Y.set(Ae.id,"in-progress-col");for(let Ae of A)Y.set(Ae.id,"resolved-col");for(let Ae of ee)Y.set(Ae.id,"closed-col")}Re()}catch{k=[],M=[],P=[],A=[],j=[],ee=[],he=new Map,Re()}}function we(W){let J=new Map;for(let ve of W)ve&&ve.id&&!J.has(ve.id)&&J.set(ve.id,ve);let ye=new Map;for(let ve of J.values()){let oe=po(ve);if(!oe)continue;let De=ye.get(oe);De||(De=[],ye.set(oe,De)),De.push({id:ve.id,title:ve.title,status:ve.status,metadata:ve.metadata,workflow:ve.workflow,created_at:ve.created_at,updated_at:ve.updated_at})}he=ye}function xe(W){let J=he.get(W)||[],ye=0;for(let oe of J)(oe.status==="resolved"||oe.status==="closed")&&(ye+=1);let ve=Kn(J);return{total:J.length,count:ye,current:ve,children:J}}function Ie(W){return!le.has(W)}function _e(W,J){W.preventDefault(),W.stopPropagation(),le.has(J)?le.delete(J):le.add(J),Re()}function X(W,J){W.preventDefault(),W.stopPropagation(),n(J)}function G(W,J){W.preventDefault(),W.stopPropagation(),n(J)}function $e(W,J){Ne||n(J)}function pe(W,J){W.preventDefault(),W.stopPropagation(),Au(J).then(ye=>{ye&&ie("\uBCF5\uC0AC\uB428","success",1200)})}function ae(W,J){Ne=J,W.dataTransfer&&(W.dataTransfer.setData("text/plain",J),W.dataTransfer.effectAllowed="move"),W.target.classList.add("board-card--dragging")}function U(W){W.target.classList.remove("board-card--dragging"),yt(),setTimeout(()=>{Ne=null},0)}function B(W){let J=String(W.target.value||"");!J||J===_||(_=J,u&&u(J),Re())}function T(){return l?l.get():null}function z(W){let J=c?c.get():null,ye=J?J.cleanup_failed:null;if(!ye||typeof ye!="object"||Array.isArray(ye))return null;let ve=ye[W];return!ve||typeof ve!="object"||Array.isArray(ve)?null:ve}let R={onCardClick:$e,onCopyId:pe,onDragStart:ae,onDragEnd:U,onClosedRangeChange:B,rollupFor:xe,isExpanded:Ie,onRollupToggle:_e,onChildClick:X,onFromChipClick:G,cleanupFailureFor:z,get policy(){return T()}};function K(W,J){Ne||($(),n(J))}function Z(W,J){W.preventDefault(),W.stopPropagation(),$(),n(J)}let ce={...R,onCardClick:K,onChildClick:Z,onFromChipClick:Z,get policy(){return T()}};function fe(W){let J=W.target,ye=e.querySelector(".board-filter__labels");J&&ye&&ye.contains(J)||N()}function be(W){W.key==="Escape"&&N()}function C(){de||(de=!0,document.addEventListener("mousedown",fe),document.addEventListener("keydown",be),Re())}function N(){de&&(de=!1,document.removeEventListener("mousedown",fe),document.removeEventListener("keydown",be),Re())}function te(W){W.key==="Escape"&&$()}function Q(){x||(x=!0,document.addEventListener("keydown",te),Re())}function $(){x&&(x=!1,document.removeEventListener("keydown",te),Re())}let D={onClose:$,onOverlayClick(W){W.target===W.currentTarget&&$()}},V={onSearchInput(W){se.search=String(W.target.value||""),ke()},onPriorityChange(W){se.priority=String(W.target.value||""),ke()},onTypeChange(W){se.type=String(W.target.value||""),ke()},onSortChange(W){let J=String(W.target.value||"");if(!(!Ii.has(J)||J===S)){S=J;try{window.localStorage.setItem(Ri,J)}catch{}ke()}},onDeferredToggle(){x?$():Q()},onLabelMenuToggle(){de?N():C()},onLabelToggle(W){let J=se.labels.indexOf(W);J===-1?se.labels.push(W):se.labels.splice(J,1),ke()},onLabelClear(){se.labels.length!==0&&(se.labels=[],ke())},onNewIssue(){f&&f()}};function Le(){return i`
      <div class="board-view">
        ${Ci(se,V,{sort_mode:S,deferred_popup_open:x,deferred_count:w,label_options:Ze(),label_menu_open:de})}
        <div class="board-root">
          ${Hr({title:"Blocked",id:"blocked-col",items:ze(k)},R)}
          ${Hr({title:"Ready",id:"ready-col",items:ze(M)},R)}
          ${Hr({title:"In progress",id:"in-progress-col",items:ze(P)},R)}
          ${Hr({title:"Resolved",id:"resolved-col",items:ze(A)},R)}
          ${Hr({title:"Closed",id:"closed-col",items:ze(ee),is_closed:!0,closed_range:_},R)}
        </div>
        ${x?Ti({items:ze(j),count:w},ce,D):""}
      </div>
    `}function Re(){je(Le(),e),Fe()}function Fe(){try{let W=e.querySelector("#deferred-popup");W&&!W.open&&(typeof W.showModal=="function"?W.showModal():W.setAttribute("open",""));let J=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let ye of J)Array.from(ye.querySelectorAll(".board-card")).forEach((oe,De)=>{oe.tabIndex=De===0?0:-1})}catch{}}async function Ce(W,J){if(!o){ie("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:W,status:J}),ie("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(ye){r("update-status failed: %o",ye),ie("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function et(W){switch(W){case"blocked-col":return k;case"ready-col":return M;case"in-progress-col":return P;case"resolved-col":return A;default:return[]}}function ht(W,J,ye){if(!o||!a)return;let ve=et(W),oe=ve.find(Xe=>Xe.id===J);if(!oe)return;let De=ve.filter(Xe=>Xe.id!==J),tt=ye.closest?ye.closest(".board-card"):null,Ye=De.length;if(tt){let Xe=tt.getAttribute("data-issue-id");if(Xe===J)return;let Ae=De.findIndex(_t=>_t.id===Xe);Ae>=0&&(Ye=Ae)}let Pe=De.slice();Pe.splice(Ye,0,oe),E.applyReorder(J,Pe,Ye)}function yt(){for(let W of Array.from(e.querySelectorAll(".board-column--drag-over")))W.classList.remove("board-column--drag-over")}let ot=null;e.addEventListener("dragover",W=>{W.preventDefault(),W.dataTransfer&&(W.dataTransfer.dropEffect="move");let ye=W.target.closest(".board-column");ye&&ye!==ot&&(ot&&ot.classList.remove("board-column--drag-over"),ye.classList.add("board-column--drag-over"),ot=ye)}),e.addEventListener("dragleave",W=>{let J=W.relatedTarget;(!J||!e.contains(J))&&ot&&(ot.classList.remove("board-column--drag-over"),ot=null)}),e.addEventListener("drop",W=>{W.preventDefault(),ot&&(ot.classList.remove("board-column--drag-over"),ot=null);let J=W.target,ye=J.closest(".board-column");if(!ye)return;let ve=W.dataTransfer?.getData("text/plain")||"";if(!ve)return;let oe=ye.id,De=Y.get(ve);if(De&&De===oe){if(xu.has(oe)){if(S!=="manual"){ie("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}ht(oe,ve,J)}return}let tt=$u[oe];if(!tt){ie("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}H.get(ve)!==tt&&Ce(ve,tt)}),e.addEventListener("keydown",W=>{let J=W.target;if(!(J instanceof HTMLElement))return;let ye=String(J.tagName||"").toLowerCase();if(ye==="input"||ye==="textarea"||ye==="select"||ye==="button"||ye==="a"||J.isContentEditable===!0)return;let ve=J.closest(".board-card");if(!ve)return;let oe=String(W.key||"");if(oe==="Enter"||oe===" "){W.preventDefault();let Pe=ve.getAttribute("data-issue-id");Pe&&n(Pe);return}if(oe!=="ArrowUp"&&oe!=="ArrowDown"&&oe!=="ArrowLeft"&&oe!=="ArrowRight")return;W.preventDefault();let De=ve.closest(".board-column");if(!De)return;let tt=Array.from(De.querySelectorAll(".board-card")),Ye=tt.indexOf(ve);if(oe==="ArrowDown"&&Ye<tt.length-1){$t(ve,tt[Ye+1]);return}if(oe==="ArrowUp"&&Ye>0){$t(ve,tt[Ye-1]);return}if(oe==="ArrowLeft"||oe==="ArrowRight"){let Pe=Array.from(e.querySelectorAll(".board-column")),Xe=Pe.indexOf(De),Ae=oe==="ArrowRight"?1:-1,_t=Xe+Ae;for(;_t>=0&&_t<Pe.length;){let Tt=Pe[_t].querySelector(".board-card");if(Tt){$t(ve,Tt);return}_t+=Ae}}});function $t(W,J){try{W.tabIndex=-1,J.tabIndex=0,J.focus()}catch{}}let it=null;b&&b.subscribe&&(it=b.subscribe(()=>{try{ke()}catch{}}));let st=null;l&&l.subscribe&&(st=l.subscribe(()=>{try{ke()}catch{}}));let pt=null;return c&&c.subscribe&&(pt=c.subscribe(()=>{Re()})),{async load(){r("load"),ke()},clear(){N(),$(),it&&(it(),it=null),st&&(st(),st=null),pt&&(pt(),pt=null),e.replaceChildren(),k=[],M=[],P=[],A=[],j=[],ee=[],H=new Map,Y=new Map}}}function po(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function an(e,t){return e.filter(r=>{let n=po(r);return!(n&&t.has(n))})}async function Au(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let r=!1;try{r=document.execCommand("copy")}finally{t.remove()}return r}catch{return!1}}async function ir(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let r=document.createElement("textarea");r.value=t,r.style.position="fixed",r.style.left="-9999px",document.body.appendChild(r),r.select();let n=!1;try{n=document.execCommand("copy")}finally{r.remove()}return n}catch{return!1}}function rr(e){return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,e.speed==="fast"?"Fast":null].filter(Boolean).join(" \xB7 ")}function yr(e){return typeof e.resumed_from!="string"||e.resumed_from.length===0?null:`${e.continuation_mode==="session"?"session \uC774\uC5B4\uBC1B\uC74C":e.continuation_mode==="fresh"?"\uC0C8 session\uC73C\uB85C \uC774\uC5B4\uBC1B\uC74C":"\uC774\uC804 attempt\uC5D0\uC11C \uC774\uC5B4\uBC1B\uC74C"} (from ${e.resumed_from})`}function Eu(e,t=document){let r=t.createElement("dialog");r.className="continuation-dialog";let n=t.createElement("button"),s=t.createElement("button"),o=t.createElement("button"),a=t.createElement("h2"),l=t.createElement("p");return a.textContent="\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4",l.textContent=`${rr(e.prior||{})||"\uC774\uC804 \uC124\uC815"} \u2192 ${rr(e.current||{})||"\uD604\uC7AC \uC124\uC815"}`,n.type="button",n.textContent="\uAE30\uC874 session \uC774\uC5B4\uD558\uAE30",n.disabled=e.prior_available===!1,s.type="button",s.textContent="\uD604\uC7AC preset\uC73C\uB85C \uC0C8 session",o.type="button",o.textContent="\uCDE8\uC18C",r.append(a,l,n,s,o),t.body.append(r),new Promise(c=>{let u=f=>{typeof r.close=="function"&&r.close(),r.remove(),c(f)};n.addEventListener("click",()=>u("prior_session")),s.addEventListener("click",()=>u("fresh_current")),o.addEventListener("click",()=>u(null)),r.addEventListener("cancel",f=>{f.preventDefault(),u(null)}),typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")})}async function lr(e,t,r={}){let n=e;for(r.onResult?.(n);n?.continuation_mismatch;){let s=n.continuation_mismatch,o=await Eu(s);if(o===null)return n;n=await t(o,s.decision_token),r.onResult?.(n),n?.conflict&&r.refresh&&(n=await r.refresh(n),r.onResult?.(n))}return n}function Gr(e=document){let t=e.createElement("dialog");t.className="resume-instructions-dialog";let r=e.createElement("h2"),n=e.createElement("textarea"),s=e.createElement("div"),o=e.createElement("button"),a=e.createElement("button");return r.textContent="\uC138\uC158 \uC774\uC5B4\uD558\uAE30",n.placeholder="\uCD94\uAC00 \uC9C0\uCE68 (\uC120\uD0DD) \u2014 \uBE44\uC6CC\uB450\uBA74 \uAE30\uBCF8 \uC808\uCC28\uB85C \uC7AC\uAC1C",n.maxLength=4e3,s.className="resume-instructions-dialog__actions",o.type="button",o.textContent="\uC774\uC5B4\uD558\uAE30",a.type="button",a.textContent="\uCDE8\uC18C",s.append(o,a),t.append(r,n,s),e.body.append(t),new Promise(l=>{let c=!1,u=_=>{c||(c=!0,typeof t.close=="function"&&t.close(),t.remove(),l(_))},f=()=>u(n.value.trim());o.addEventListener("click",f),a.addEventListener("click",()=>u(null)),n.addEventListener("keydown",_=>{_.key==="Enter"&&(_.ctrlKey||_.metaKey)&&(_.preventDefault(),f())}),t.addEventListener("cancel",_=>{_.preventDefault(),u(null)}),typeof t.showModal=="function"?t.showModal():t.setAttribute("open",""),n.focus()})}var Ni="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function gt(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var cr=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],ln=[...cr,"reasoning_output_tokens"],Tu=["implementation","review-consult"];function fo(e){let t=0;for(let r of cr)t+=gt(e?.[r]);return t}function Cu(e){return!e||typeof e!="object"?!1:cr.some(t=>Number.isFinite(e[t]))}function Oi(e){return!e||typeof e!="object"?!1:ln.some(t=>Number.isFinite(e[t]))}function Ru(e){let t={};for(let r of ln)e&&Number.isFinite(e[r])&&(t[r]=e[r]);return t}function Pi(e){let t={};for(let r of ln)Number.isFinite(e[r])&&(t[r]=e[r]);return e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function Di(e,t){return e==="codex"?gt(t.input_tokens)+gt(t.output_tokens):fo(t)}function Iu(e){return e==="claude"?"Claude":"Codex"}function Lu(e){return`\u03C4 ${Fi(e)}`}function Ou(e,t){let r=t.breakdown||{},n=[`\uC785\uB825 ${gt(r.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${gt(r.output_tokens).toLocaleString("en-US")}`];e==="claude"?n.push(`\uCE90\uC2DC\uC77D\uAE30 ${gt(r.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${gt(r.cache_creation_input_tokens).toLocaleString("en-US")}`):(n.push(`\uCE90\uC2DC\uC77D\uAE30 ${gt(r.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${gt(r.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(r.reasoning_output_tokens)&&n.push(`\uCD94\uB860\uCD9C\uB825 ${gt(r.reasoning_output_tokens).toLocaleString("en-US")}`));let o=[e==="claude"?"Claude subtotal = \uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"Codex subtotal = \uC785\uB825 + \uCD9C\uB825; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset",`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,n.join(" \xB7 ")];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&o.push(`$${t.total_cost_usd.toFixed(2)}`),t.replayed&&o.push(Ni),o.join(`
`)}function bt(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let r of["claude","codex"]){let n=e.providers[r];n&&t.push({provider:r,label:`${Iu(r)} ${Lu(n.subtotal)}${typeof n.total_cost_usd=="number"&&Number.isFinite(n.total_cost_usd)?` \xB7 $${n.total_cost_usd.toFixed(2)}`:""}`,tooltip:Ou(r,n)})}return t}function ns(e){let t={},r={claude:!0,codex:!1},n={claude:0,codex:0};for(let s of e)if(!(!s||!s.providers))for(let o of["claude","codex"]){let a=s.providers[o];if(!a)continue;let l=t[o];l||(l={subtotal:0,breakdown:{}},t[o]=l),l.subtotal+=a.subtotal;for(let c of ln)Number.isFinite(a.breakdown[c])&&(l.breakdown[c]=gt(l.breakdown[c])+gt(a.breakdown[c]));a.replayed&&(l.replayed=!0),o==="claude"&&(typeof a.total_cost_usd=="number"&&Number.isFinite(a.total_cost_usd)?n.claude+=a.total_cost_usd:r.claude=!1)}return t.claude&&r.claude&&(t.claude.total_cost_usd=n.claude),Object.keys(t).length===0?null:{providers:t,roles:{}}}function _o(e){return!e||typeof e!="object"?null:Ft({attempt:{...e,bead_id:"__attempt__"}},"__attempt__")}function Pu(e){return e==="codex"?"codex":"claude"}function vr(){return{subtotal:0,breakdown:Ru(null),legs:[],replayed:!1,outer_count:0,outer_cost:0,outer_cost_count:0}}function rs(e,t,r){e.subtotal+=t.subtotal;for(let n of ln)Number.isFinite(t.usage[n])&&(e.breakdown[n]=gt(e.breakdown[n])+gt(t.usage[n]));e.legs.push(t),t.replayed===!0&&(e.replayed=!0),r&&(e.outer_count+=1,typeof t.usage.total_cost_usd=="number"&&Number.isFinite(t.usage.total_cost_usd)&&(e.outer_cost+=t.usage.total_cost_usd,e.outer_cost_count+=1))}function Mi(e,t){let r={subtotal:e.subtotal,breakdown:e.breakdown};return t&&(r.legs=e.legs),e.replayed&&(r.replayed=!0),r}function Fi(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function Vr(e){return Cu(e)?`\u03C4 ${Fi(fo(e))}`:null}function Ht(e){let t=Vr(e);if(!t)return null;let r=e?.total_cost_usd;return typeof r=="number"&&Number.isFinite(r)?`${t} \xB7 $${r.toFixed(2)}`:t}function Yr(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${gt(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${gt(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${gt(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${gt(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let r=[`\uCD1D ${fo(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&r.push(Ni),r.join(`
`)}function Ft(e,t){let r={claude:vr(),codex:vr()},n={orchestrator:{claude:vr(),codex:vr()},implementation:{claude:vr(),codex:vr()},"review-consult":{claude:vr(),codex:vr()}},s=new Set;for(let l of Object.values(e||{})){if(!l||l.bead_id!==t)continue;let c=l.usage;if(Oi(c)){let f=Pu(l.runner),_=Pi(c),b={provider:f,role:"orchestrator",attempt_id:String(l.attempt_id||""),usage:_,subtotal:Di(f,_)};_.replayed===!0&&(b.replayed=!0),typeof l.model=="string"&&(b.model=l.model),typeof l.session_id=="string"&&(b.session_id=l.session_id),rs(r[f],b,!0),rs(n.orchestrator[f],b,!0)}let u=Array.isArray(l.usage_legs)?l.usage_legs:[];for(let f of u){if(!f||f.provider!=="codex"||!Tu.includes(f.role)||!Oi(f.usage))continue;let _=typeof f.receipt_id=="string"&&f.receipt_id.length>0?f.receipt_id:null;if(!_||s.has(_))continue;s.add(_);let b=Pi(f.usage),E={provider:"codex",role:f.role,attempt_id:String(l.attempt_id||""),usage:b,subtotal:Di("codex",b)};E.receipt_id=_,typeof f.model=="string"&&(E.model=f.model),typeof f.session_id=="string"?E.session_id=f.session_id:typeof f.thread_id=="string"&&(E.session_id=f.thread_id),typeof f.turn_id=="string"&&(E.turn_id=f.turn_id),typeof f.completed_at=="string"&&(E.completed_at=f.completed_at),b.replayed===!0&&(E.replayed=!0),rs(r.codex,E,!1),rs(n[E.role].codex,E,!1)}}let o={};for(let l of["claude","codex"]){let c=r[l];if(c.legs.length===0)continue;let u=Mi(c,!1);l==="claude"&&c.outer_count>0&&c.outer_cost_count===c.outer_count&&(u.total_cost_usd=c.outer_cost),o[l]=u}if(Object.keys(o).length===0)return null;let a={};for(let l of["orchestrator","implementation","review-consult"]){let c={};for(let u of["claude","codex"]){let f=n[l][u];f.legs.length>0&&(c[u]={...Mi(f,!0),legs:f.legs})}Object.keys(c).length>0&&(a[l]=c)}return{providers:o,roles:a}}var{entries:Vi,setPrototypeOf:qi,isFrozen:Du,getPrototypeOf:Mu,getOwnPropertyDescriptor:Nu}=Object,{freeze:St,seal:qt,create:wo}=Object,{apply:ko,construct:$o}=typeof Reflect<"u"&&Reflect;St||(St=function(t){return t});qt||(qt=function(t){return t});ko||(ko=function(t,r){for(var n=arguments.length,s=new Array(n>2?n-2:0),o=2;o<n;o++)s[o-2]=arguments[o];return t.apply(r,s)});$o||($o=function(t){for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return new t(...n)});var ss=At(Array.prototype.forEach),Fu=At(Array.prototype.lastIndexOf),Bi=At(Array.prototype.pop),cn=At(Array.prototype.push),qu=At(Array.prototype.splice),as=At(String.prototype.toLowerCase),mo=At(String.prototype.toString),go=At(String.prototype.match),dn=At(String.prototype.replace),Bu=At(String.prototype.indexOf),ju=At(String.prototype.trim),Gt=At(Object.prototype.hasOwnProperty),xt=At(RegExp.prototype.test),un=Uu(TypeError);function At(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return ko(e,t,n)}}function Uu(e){return function(){for(var t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];return $o(e,r)}}function We(e,t){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:as;qi&&qi(e,null);let n=t.length;for(;n--;){let s=t[n];if(typeof s=="string"){let o=r(s);o!==s&&(Du(t)||(t[n]=o),s=o)}e[s]=!0}return e}function Wu(e){for(let t=0;t<e.length;t++)Gt(e,t)||(e[t]=null);return e}function dr(e){let t=wo(null);for(let[r,n]of Vi(e))Gt(e,r)&&(Array.isArray(n)?t[r]=Wu(n):n&&typeof n=="object"&&n.constructor===Object?t[r]=dr(n):t[r]=n);return t}function pn(e,t){for(;e!==null;){let n=Nu(e,t);if(n){if(n.get)return At(n.get);if(typeof n.value=="function")return At(n.value)}e=Mu(e)}function r(){return null}return r}var ji=St(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),bo=St(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),ho=St(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),zu=St(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),yo=St(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Hu=St(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Ui=St(["#text"]),Wi=St(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),vo=St(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),zi=St(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),os=St(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Gu=qt(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Vu=qt(/<%[\w\W]*|[\w\W]*%>/gm),Yu=qt(/\$\{[\w\W]*/gm),Ku=qt(/^data-[\-\w.\u00B7-\uFFFF]+$/),Zu=qt(/^aria-[\-\w]+$/),Yi=qt(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Xu=qt(/^(?:\w+script|data):/i),Qu=qt(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Ki=qt(/^html$/i),Ju=qt(/^[a-z][.\w]*(-[.\w]+)+$/i),Hi=Object.freeze({__proto__:null,ARIA_ATTR:Zu,ATTR_WHITESPACE:Qu,CUSTOM_ELEMENT:Ju,DATA_ATTR:Ku,DOCTYPE_NAME:Ki,ERB_EXPR:Vu,IS_ALLOWED_URI:Yi,IS_SCRIPT_OR_DATA:Xu,MUSTACHE_EXPR:Gu,TMPLIT_EXPR:Yu}),fn={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},ep=function(){return typeof window>"u"?null:window},tp=function(t,r){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let n=null,s="data-tt-policy-suffix";r&&r.hasAttribute(s)&&(n=r.getAttribute(s));let o="dompurify"+(n?"#"+n:"");try{return t.createPolicy(o,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},Gi=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Zi(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:ep(),t=q=>Zi(q);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==fn.document||!e.Element)return t.isSupported=!1,t;let{document:r}=e,n=r,s=n.currentScript,{DocumentFragment:o,HTMLTemplateElement:a,Node:l,Element:c,NodeFilter:u,NamedNodeMap:f=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:_,DOMParser:b,trustedTypes:E}=e,k=c.prototype,M=pn(k,"cloneNode"),P=pn(k,"remove"),A=pn(k,"nextSibling"),j=pn(k,"childNodes"),ee=pn(k,"parentNode");if(typeof a=="function"){let q=r.createElement("template");q.content&&q.content.ownerDocument&&(r=q.content.ownerDocument)}let x,w="",{implementation:S,createNodeIterator:H,createDocumentFragment:Y,getElementsByTagName:he}=r,{importNode:le}=n,se=Gi();t.isSupported=typeof Vi=="function"&&typeof ee=="function"&&S&&S.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:de,ERB_EXPR:Ne,TMPLIT_EXPR:Ue,DATA_ATTR:Ge,ARIA_ATTR:ze,IS_SCRIPT_OR_DATA:Ze,ATTR_WHITESPACE:qe,CUSTOM_ELEMENT:ke}=Hi,{IS_ALLOWED_URI:we}=Hi,xe=null,Ie=We({},[...ji,...bo,...ho,...yo,...Ui]),_e=null,X=We({},[...Wi,...vo,...zi,...os]),G=Object.seal(wo(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),$e=null,pe=null,ae=Object.seal(wo(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),U=!0,B=!0,T=!1,z=!0,R=!1,K=!0,Z=!1,ce=!1,fe=!1,be=!1,C=!1,N=!1,te=!0,Q=!1,$="user-content-",D=!0,V=!1,Le={},Re=null,Fe=We({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),Ce=null,et=We({},["audio","video","img","source","image","track"]),ht=null,yt=We({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),ot="http://www.w3.org/1998/Math/MathML",$t="http://www.w3.org/2000/svg",it="http://www.w3.org/1999/xhtml",st=it,pt=!1,W=null,J=We({},[ot,$t,it],mo),ye=We({},["mi","mo","mn","ms","mtext"]),ve=We({},["annotation-xml"]),oe=We({},["title","style","font","a","script"]),De=null,tt=["application/xhtml+xml","text/html"],Ye="text/html",Pe=null,Xe=null,Ae=r.createElement("form"),_t=function(y){return y instanceof RegExp||y instanceof Function},Tt=function(){let y=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(Xe&&Xe===y)){if((!y||typeof y!="object")&&(y={}),y=dr(y),De=tt.indexOf(y.PARSER_MEDIA_TYPE)===-1?Ye:y.PARSER_MEDIA_TYPE,Pe=De==="application/xhtml+xml"?mo:as,xe=Gt(y,"ALLOWED_TAGS")?We({},y.ALLOWED_TAGS,Pe):Ie,_e=Gt(y,"ALLOWED_ATTR")?We({},y.ALLOWED_ATTR,Pe):X,W=Gt(y,"ALLOWED_NAMESPACES")?We({},y.ALLOWED_NAMESPACES,mo):J,ht=Gt(y,"ADD_URI_SAFE_ATTR")?We(dr(yt),y.ADD_URI_SAFE_ATTR,Pe):yt,Ce=Gt(y,"ADD_DATA_URI_TAGS")?We(dr(et),y.ADD_DATA_URI_TAGS,Pe):et,Re=Gt(y,"FORBID_CONTENTS")?We({},y.FORBID_CONTENTS,Pe):Fe,$e=Gt(y,"FORBID_TAGS")?We({},y.FORBID_TAGS,Pe):dr({}),pe=Gt(y,"FORBID_ATTR")?We({},y.FORBID_ATTR,Pe):dr({}),Le=Gt(y,"USE_PROFILES")?y.USE_PROFILES:!1,U=y.ALLOW_ARIA_ATTR!==!1,B=y.ALLOW_DATA_ATTR!==!1,T=y.ALLOW_UNKNOWN_PROTOCOLS||!1,z=y.ALLOW_SELF_CLOSE_IN_ATTR!==!1,R=y.SAFE_FOR_TEMPLATES||!1,K=y.SAFE_FOR_XML!==!1,Z=y.WHOLE_DOCUMENT||!1,be=y.RETURN_DOM||!1,C=y.RETURN_DOM_FRAGMENT||!1,N=y.RETURN_TRUSTED_TYPE||!1,fe=y.FORCE_BODY||!1,te=y.SANITIZE_DOM!==!1,Q=y.SANITIZE_NAMED_PROPS||!1,D=y.KEEP_CONTENT!==!1,V=y.IN_PLACE||!1,we=y.ALLOWED_URI_REGEXP||Yi,st=y.NAMESPACE||it,ye=y.MATHML_TEXT_INTEGRATION_POINTS||ye,ve=y.HTML_INTEGRATION_POINTS||ve,G=y.CUSTOM_ELEMENT_HANDLING||{},y.CUSTOM_ELEMENT_HANDLING&&_t(y.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(G.tagNameCheck=y.CUSTOM_ELEMENT_HANDLING.tagNameCheck),y.CUSTOM_ELEMENT_HANDLING&&_t(y.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(G.attributeNameCheck=y.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),y.CUSTOM_ELEMENT_HANDLING&&typeof y.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(G.allowCustomizedBuiltInElements=y.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),R&&(B=!1),C&&(be=!0),Le&&(xe=We({},Ui),_e=[],Le.html===!0&&(We(xe,ji),We(_e,Wi)),Le.svg===!0&&(We(xe,bo),We(_e,vo),We(_e,os)),Le.svgFilters===!0&&(We(xe,ho),We(_e,vo),We(_e,os)),Le.mathMl===!0&&(We(xe,yo),We(_e,zi),We(_e,os))),y.ADD_TAGS&&(typeof y.ADD_TAGS=="function"?ae.tagCheck=y.ADD_TAGS:(xe===Ie&&(xe=dr(xe)),We(xe,y.ADD_TAGS,Pe))),y.ADD_ATTR&&(typeof y.ADD_ATTR=="function"?ae.attributeCheck=y.ADD_ATTR:(_e===X&&(_e=dr(_e)),We(_e,y.ADD_ATTR,Pe))),y.ADD_URI_SAFE_ATTR&&We(ht,y.ADD_URI_SAFE_ATTR,Pe),y.FORBID_CONTENTS&&(Re===Fe&&(Re=dr(Re)),We(Re,y.FORBID_CONTENTS,Pe)),D&&(xe["#text"]=!0),Z&&We(xe,["html","head","body"]),xe.table&&(We(xe,["tbody"]),delete $e.tbody),y.TRUSTED_TYPES_POLICY){if(typeof y.TRUSTED_TYPES_POLICY.createHTML!="function")throw un('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof y.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw un('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');x=y.TRUSTED_TYPES_POLICY,w=x.createHTML("")}else x===void 0&&(x=tp(E,s)),x!==null&&typeof w=="string"&&(w=x.createHTML(""));St&&St(y),Xe=y}},Pt=We({},[...bo,...ho,...zu]),Dt=We({},[...yo,...Hu]),xr=function(y){let I=ee(y);(!I||!I.tagName)&&(I={namespaceURI:st,tagName:"template"});let ne=as(y.tagName),Ee=as(I.tagName);return W[y.namespaceURI]?y.namespaceURI===$t?I.namespaceURI===it?ne==="svg":I.namespaceURI===ot?ne==="svg"&&(Ee==="annotation-xml"||ye[Ee]):!!Pt[ne]:y.namespaceURI===ot?I.namespaceURI===it?ne==="math":I.namespaceURI===$t?ne==="math"&&ve[Ee]:!!Dt[ne]:y.namespaceURI===it?I.namespaceURI===$t&&!ve[Ee]||I.namespaceURI===ot&&!ye[Ee]?!1:!Dt[ne]&&(oe[ne]||!Pt[ne]):!!(De==="application/xhtml+xml"&&W[y.namespaceURI]):!1},vt=function(y){cn(t.removed,{element:y});try{ee(y).removeChild(y)}catch{P(y)}},kt=function(y,I){try{cn(t.removed,{attribute:I.getAttributeNode(y),from:I})}catch{cn(t.removed,{attribute:null,from:I})}if(I.removeAttribute(y),y==="is")if(be||C)try{vt(I)}catch{}else try{I.setAttribute(y,"")}catch{}},Qt=function(y){let I=null,ne=null;if(fe)y="<remove></remove>"+y;else{let Be=go(y,/^[\r\n\t ]+/);ne=Be&&Be[0]}De==="application/xhtml+xml"&&st===it&&(y='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+y+"</body></html>");let Ee=x?x.createHTML(y):y;if(st===it)try{I=new b().parseFromString(Ee,De)}catch{}if(!I||!I.documentElement){I=S.createDocument(st,"template",null);try{I.documentElement.innerHTML=pt?w:Ee}catch{}}let Je=I.body||I.documentElement;return y&&ne&&Je.insertBefore(r.createTextNode(ne),Je.childNodes[0]||null),st===it?he.call(I,Z?"html":"body")[0]:Z?I.documentElement:Je},or=function(y){return H.call(y.ownerDocument||y,y,u.SHOW_ELEMENT|u.SHOW_COMMENT|u.SHOW_TEXT|u.SHOW_PROCESSING_INSTRUCTION|u.SHOW_CDATA_SECTION,null)},jt=function(y){return y instanceof _&&(typeof y.nodeName!="string"||typeof y.textContent!="string"||typeof y.removeChild!="function"||!(y.attributes instanceof f)||typeof y.removeAttribute!="function"||typeof y.setAttribute!="function"||typeof y.namespaceURI!="string"||typeof y.insertBefore!="function"||typeof y.hasChildNodes!="function")},Ut=function(y){return typeof l=="function"&&y instanceof l};function wt(q,y,I){ss(q,ne=>{ne.call(t,y,I,Xe)})}let Jt=function(y){let I=null;if(wt(se.beforeSanitizeElements,y,null),jt(y))return vt(y),!0;let ne=Pe(y.nodeName);if(wt(se.uponSanitizeElement,y,{tagName:ne,allowedTags:xe}),K&&y.hasChildNodes()&&!Ut(y.firstElementChild)&&xt(/<[/\w!]/g,y.innerHTML)&&xt(/<[/\w!]/g,y.textContent)||y.nodeType===fn.progressingInstruction||K&&y.nodeType===fn.comment&&xt(/<[/\w]/g,y.data))return vt(y),!0;if(!(ae.tagCheck instanceof Function&&ae.tagCheck(ne))&&(!xe[ne]||$e[ne])){if(!$e[ne]&&v(ne)&&(G.tagNameCheck instanceof RegExp&&xt(G.tagNameCheck,ne)||G.tagNameCheck instanceof Function&&G.tagNameCheck(ne)))return!1;if(D&&!Re[ne]){let Ee=ee(y)||y.parentNode,Je=j(y)||y.childNodes;if(Je&&Ee){let Be=Je.length;for(let Ke=Be-1;Ke>=0;--Ke){let Se=M(Je[Ke],!0);Se.__removalCount=(y.__removalCount||0)+1,Ee.insertBefore(Se,A(y))}}}return vt(y),!0}return y instanceof c&&!xr(y)||(ne==="noscript"||ne==="noembed"||ne==="noframes")&&xt(/<\/no(script|embed|frames)/i,y.innerHTML)?(vt(y),!0):(R&&y.nodeType===fn.text&&(I=y.textContent,ss([de,Ne,Ue],Ee=>{I=dn(I,Ee," ")}),y.textContent!==I&&(cn(t.removed,{element:y.cloneNode()}),y.textContent=I)),wt(se.afterSanitizeElements,y,null),!1)},p=function(y,I,ne){if(te&&(I==="id"||I==="name")&&(ne in r||ne in Ae))return!1;if(!(B&&!pe[I]&&xt(Ge,I))){if(!(U&&xt(ze,I))){if(!(ae.attributeCheck instanceof Function&&ae.attributeCheck(I,y))){if(!_e[I]||pe[I]){if(!(v(y)&&(G.tagNameCheck instanceof RegExp&&xt(G.tagNameCheck,y)||G.tagNameCheck instanceof Function&&G.tagNameCheck(y))&&(G.attributeNameCheck instanceof RegExp&&xt(G.attributeNameCheck,I)||G.attributeNameCheck instanceof Function&&G.attributeNameCheck(I,y))||I==="is"&&G.allowCustomizedBuiltInElements&&(G.tagNameCheck instanceof RegExp&&xt(G.tagNameCheck,ne)||G.tagNameCheck instanceof Function&&G.tagNameCheck(ne))))return!1}else if(!ht[I]){if(!xt(we,dn(ne,qe,""))){if(!((I==="src"||I==="xlink:href"||I==="href")&&y!=="script"&&Bu(ne,"data:")===0&&Ce[y])){if(!(T&&!xt(Ze,dn(ne,qe,"")))){if(ne)return!1}}}}}}}return!0},v=function(y){return y!=="annotation-xml"&&go(y,ke)},F=function(y){wt(se.beforeSanitizeAttributes,y,null);let{attributes:I}=y;if(!I||jt(y))return;let ne={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:_e,forceKeepAttr:void 0},Ee=I.length;for(;Ee--;){let Je=I[Ee],{name:Be,namespaceURI:Ke,value:Se}=Je,d=Pe(Be),m=Se,h=Be==="value"?m:ju(m);if(ne.attrName=d,ne.attrValue=h,ne.keepAttr=!0,ne.forceKeepAttr=void 0,wt(se.uponSanitizeAttribute,y,ne),h=ne.attrValue,Q&&(d==="id"||d==="name")&&(kt(Be,y),h=$+h),K&&xt(/((--!?|])>)|<\/(style|title|textarea)/i,h)){kt(Be,y);continue}if(d==="attributename"&&go(h,"href")){kt(Be,y);continue}if(ne.forceKeepAttr)continue;if(!ne.keepAttr){kt(Be,y);continue}if(!z&&xt(/\/>/i,h)){kt(Be,y);continue}R&&ss([de,Ne,Ue],me=>{h=dn(h,me," ")});let L=Pe(y.nodeName);if(!p(L,d,h)){kt(Be,y);continue}if(x&&typeof E=="object"&&typeof E.getAttributeType=="function"&&!Ke)switch(E.getAttributeType(L,d)){case"TrustedHTML":{h=x.createHTML(h);break}case"TrustedScriptURL":{h=x.createScriptURL(h);break}}if(h!==m)try{Ke?y.setAttributeNS(Ke,Be,h):y.setAttribute(Be,h),jt(y)?vt(y):Bi(t.removed)}catch{kt(Be,y)}}wt(se.afterSanitizeAttributes,y,null)},re=function q(y){let I=null,ne=or(y);for(wt(se.beforeSanitizeShadowDOM,y,null);I=ne.nextNode();)wt(se.uponSanitizeShadowNode,I,null),Jt(I),F(I),I.content instanceof o&&q(I.content);wt(se.afterSanitizeShadowDOM,y,null)};return t.sanitize=function(q){let y=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},I=null,ne=null,Ee=null,Je=null;if(pt=!q,pt&&(q="<!-->"),typeof q!="string"&&!Ut(q))if(typeof q.toString=="function"){if(q=q.toString(),typeof q!="string")throw un("dirty is not a string, aborting")}else throw un("toString is not a function");if(!t.isSupported)return q;if(ce||Tt(y),t.removed=[],typeof q=="string"&&(V=!1),V){if(q.nodeName){let Se=Pe(q.nodeName);if(!xe[Se]||$e[Se])throw un("root node is forbidden and cannot be sanitized in-place")}}else if(q instanceof l)I=Qt("<!---->"),ne=I.ownerDocument.importNode(q,!0),ne.nodeType===fn.element&&ne.nodeName==="BODY"||ne.nodeName==="HTML"?I=ne:I.appendChild(ne);else{if(!be&&!R&&!Z&&q.indexOf("<")===-1)return x&&N?x.createHTML(q):q;if(I=Qt(q),!I)return be?null:N?w:""}I&&fe&&vt(I.firstChild);let Be=or(V?q:I);for(;Ee=Be.nextNode();)Jt(Ee),F(Ee),Ee.content instanceof o&&re(Ee.content);if(V)return q;if(be){if(C)for(Je=Y.call(I.ownerDocument);I.firstChild;)Je.appendChild(I.firstChild);else Je=I;return(_e.shadowroot||_e.shadowrootmode)&&(Je=le.call(n,Je,!0)),Je}let Ke=Z?I.outerHTML:I.innerHTML;return Z&&xe["!doctype"]&&I.ownerDocument&&I.ownerDocument.doctype&&I.ownerDocument.doctype.name&&xt(Ki,I.ownerDocument.doctype.name)&&(Ke="<!DOCTYPE "+I.ownerDocument.doctype.name+`>
`+Ke),R&&ss([de,Ne,Ue],Se=>{Ke=dn(Ke,Se," ")}),x&&N?x.createHTML(Ke):Ke},t.setConfig=function(){let q=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};Tt(q),ce=!0},t.clearConfig=function(){Xe=null,ce=!1},t.isValidAttribute=function(q,y,I){Xe||Tt({});let ne=Pe(q),Ee=Pe(y);return p(ne,Ee,I)},t.addHook=function(q,y){typeof y=="function"&&cn(se[q],y)},t.removeHook=function(q,y){if(y!==void 0){let I=Fu(se[q],y);return I===-1?void 0:qu(se[q],I,1)[0]}return Bi(se[q])},t.removeHooks=function(q){se[q]=[]},t.removeAllHooks=function(){se=Gi()},t}var Xi=Zi();var ur={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},is=e=>(...t)=>({_$litDirective$:e,values:t}),Kr=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,r,n){this._$Ct=t,this._$AM=r,this._$Ci=n}_$AS(t,r){return this.update(t,r)}update(t,r){return this.render(...r)}};var _n=class extends Kr{constructor(t){if(super(t),this.it=lt,t.type!==ur.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===lt||t==null)return this._t=void 0,this.it=t;if(t===Mt)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let r=[t];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}};_n.directiveName="unsafeHTML",_n.resultType=1;var Qi=is(_n);function Eo(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Dr=Eo();function ol(e){Dr=e}var hn={exec:()=>null};function Ve(e,t=""){let r=typeof e=="string"?e:e.source,n={replace:(s,o)=>{let a=typeof o=="string"?o:o.source;return a=a.replace(Et.caret,"$1"),r=r.replace(s,a),n},getRegex:()=>new RegExp(r,t)};return n}var rp=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),Et={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},np=/^(?:[ \t]*(?:\n|$))+/,sp=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,op=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,yn=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,ap=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,To=/(?:[*+-]|\d{1,9}[.)])/,al=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,il=Ve(al).replace(/bull/g,To).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),ip=Ve(al).replace(/bull/g,To).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Co=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,lp=/^[^\n]+/,Ro=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,cp=Ve(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Ro).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),dp=Ve(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,To).getRegex(),fs="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Io=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,up=Ve("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",Io).replace("tag",fs).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),ll=Ve(Co).replace("hr",yn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",fs).getRegex(),pp=Ve(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",ll).getRegex(),Lo={blockquote:pp,code:sp,def:cp,fences:op,heading:ap,hr:yn,html:up,lheading:il,list:dp,newline:np,paragraph:ll,table:hn,text:lp},Ji=Ve("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",yn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",fs).getRegex(),fp={...Lo,lheading:ip,table:Ji,paragraph:Ve(Co).replace("hr",yn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Ji).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",fs).getRegex()},_p={...Lo,html:Ve(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",Io).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:hn,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:Ve(Co).replace("hr",yn).replace("heading",` *#{1,6} *[^
]`).replace("lheading",il).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},mp=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,gp=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,cl=/^( {2,}|\\)\n(?!\s*$)/,bp=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,_s=/[\p{P}\p{S}]/u,Oo=/[\s\p{P}\p{S}]/u,dl=/[^\s\p{P}\p{S}]/u,hp=Ve(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Oo).getRegex(),ul=/(?!~)[\p{P}\p{S}]/u,yp=/(?!~)[\s\p{P}\p{S}]/u,vp=/(?:[^\s\p{P}\p{S}]|~)/u,wp=Ve(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",rp?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),pl=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,kp=Ve(pl,"u").replace(/punct/g,_s).getRegex(),$p=Ve(pl,"u").replace(/punct/g,ul).getRegex(),fl="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",xp=Ve(fl,"gu").replace(/notPunctSpace/g,dl).replace(/punctSpace/g,Oo).replace(/punct/g,_s).getRegex(),Sp=Ve(fl,"gu").replace(/notPunctSpace/g,vp).replace(/punctSpace/g,yp).replace(/punct/g,ul).getRegex(),Ap=Ve("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,dl).replace(/punctSpace/g,Oo).replace(/punct/g,_s).getRegex(),Ep=Ve(/\\(punct)/,"gu").replace(/punct/g,_s).getRegex(),Tp=Ve(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Cp=Ve(Io).replace("(?:-->|$)","-->").getRegex(),Rp=Ve("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Cp).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),ds=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,Ip=Ve(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",ds).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),_l=Ve(/^!?\[(label)\]\[(ref)\]/).replace("label",ds).replace("ref",Ro).getRegex(),ml=Ve(/^!?\[(ref)\](?:\[\])?/).replace("ref",Ro).getRegex(),Lp=Ve("reflink|nolink(?!\\()","g").replace("reflink",_l).replace("nolink",ml).getRegex(),el=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,Po={_backpedal:hn,anyPunctuation:Ep,autolink:Tp,blockSkip:wp,br:cl,code:gp,del:hn,emStrongLDelim:kp,emStrongRDelimAst:xp,emStrongRDelimUnd:Ap,escape:mp,link:Ip,nolink:ml,punctuation:hp,reflink:_l,reflinkSearch:Lp,tag:Rp,text:bp,url:hn},Op={...Po,link:Ve(/^!?\[(label)\]\((.*?)\)/).replace("label",ds).getRegex(),reflink:Ve(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",ds).getRegex()},xo={...Po,emStrongRDelimAst:Sp,emStrongLDelim:$p,url:Ve(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",el).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:Ve(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",el).getRegex()},Pp={...xo,br:Ve(cl).replace("{2,}","*").getRegex(),text:Ve(xo.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},ls={normal:Lo,gfm:fp,pedantic:_p},mn={normal:Po,gfm:xo,breaks:Pp,pedantic:Op},Dp={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},tl=e=>Dp[e];function pr(e,t){if(t){if(Et.escapeTest.test(e))return e.replace(Et.escapeReplace,tl)}else if(Et.escapeTestNoEncode.test(e))return e.replace(Et.escapeReplaceNoEncode,tl);return e}function rl(e){try{e=encodeURI(e).replace(Et.percentDecode,"%")}catch{return null}return e}function nl(e,t){let r=e.replace(Et.findPipe,(o,a,l)=>{let c=!1,u=a;for(;--u>=0&&l[u]==="\\";)c=!c;return c?"|":" |"}),n=r.split(Et.splitPipe),s=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),t)if(n.length>t)n.splice(t);else for(;n.length<t;)n.push("");for(;s<n.length;s++)n[s]=n[s].trim().replace(Et.slashPipe,"|");return n}function gn(e,t,r){let n=e.length;if(n===0)return"";let s=0;for(;s<n;){let o=e.charAt(n-s-1);if(o===t&&!r)s++;else if(o!==t&&r)s++;else break}return e.slice(0,n-s)}function Mp(e,t){if(e.indexOf(t[1])===-1)return-1;let r=0;for(let n=0;n<e.length;n++)if(e[n]==="\\")n++;else if(e[n]===t[0])r++;else if(e[n]===t[1]&&(r--,r<0))return n;return r>0?-2:-1}function sl(e,t,r,n,s){let o=t.href,a=t.title||null,l=e[1].replace(s.other.outputLinkReplace,"$1");n.state.inLink=!0;let c={type:e[0].charAt(0)==="!"?"image":"link",raw:r,href:o,title:a,text:l,tokens:n.inlineTokens(l)};return n.state.inLink=!1,c}function Np(e,t,r){let n=e.match(r.other.indentCodeCompensation);if(n===null)return t;let s=n[1];return t.split(`
`).map(o=>{let a=o.match(r.other.beginningSpace);if(a===null)return o;let[l]=a;return l.length>=s.length?o.slice(s.length):o}).join(`
`)}var us=class{constructor(e){rt(this,"options");rt(this,"rules");rt(this,"lexer");this.options=e||Dr}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let r=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?r:gn(r,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let r=t[0],n=Np(r,t[3]||"",this.rules);return{type:"code",raw:r,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:n}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let r=t[2].trim();if(this.rules.other.endingHash.test(r)){let n=gn(r,"#");(this.options.pedantic||!n||this.rules.other.endingSpaceChar.test(n))&&(r=n.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:gn(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let r=gn(t[0],`
`).split(`
`),n="",s="",o=[];for(;r.length>0;){let a=!1,l=[],c;for(c=0;c<r.length;c++)if(this.rules.other.blockquoteStart.test(r[c]))l.push(r[c]),a=!0;else if(!a)l.push(r[c]);else break;r=r.slice(c);let u=l.join(`
`),f=u.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");n=n?`${n}
${u}`:u,s=s?`${s}
${f}`:f;let _=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(f,o,!0),this.lexer.state.top=_,r.length===0)break;let b=o.at(-1);if(b?.type==="code")break;if(b?.type==="blockquote"){let E=b,k=E.raw+`
`+r.join(`
`),M=this.blockquote(k);o[o.length-1]=M,n=n.substring(0,n.length-E.raw.length)+M.raw,s=s.substring(0,s.length-E.text.length)+M.text;break}else if(b?.type==="list"){let E=b,k=E.raw+`
`+r.join(`
`),M=this.list(k);o[o.length-1]=M,n=n.substring(0,n.length-b.raw.length)+M.raw,s=s.substring(0,s.length-E.raw.length)+M.raw,r=k.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:n,tokens:o,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let r=t[1].trim(),n=r.length>1,s={type:"list",raw:"",ordered:n,start:n?+r.slice(0,-1):"",loose:!1,items:[]};r=n?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=n?r:"[*+-]");let o=this.rules.other.listItemRegex(r),a=!1;for(;e;){let c=!1,u="",f="";if(!(t=o.exec(e))||this.rules.block.hr.test(e))break;u=t[0],e=e.substring(u.length);let _=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,M=>" ".repeat(3*M.length)),b=e.split(`
`,1)[0],E=!_.trim(),k=0;if(this.options.pedantic?(k=2,f=_.trimStart()):E?k=t[1].length+1:(k=t[2].search(this.rules.other.nonSpaceChar),k=k>4?1:k,f=_.slice(k),k+=t[1].length),E&&this.rules.other.blankLine.test(b)&&(u+=b+`
`,e=e.substring(b.length+1),c=!0),!c){let M=this.rules.other.nextBulletRegex(k),P=this.rules.other.hrRegex(k),A=this.rules.other.fencesBeginRegex(k),j=this.rules.other.headingBeginRegex(k),ee=this.rules.other.htmlBeginRegex(k);for(;e;){let x=e.split(`
`,1)[0],w;if(b=x,this.options.pedantic?(b=b.replace(this.rules.other.listReplaceNesting,"  "),w=b):w=b.replace(this.rules.other.tabCharGlobal,"    "),A.test(b)||j.test(b)||ee.test(b)||M.test(b)||P.test(b))break;if(w.search(this.rules.other.nonSpaceChar)>=k||!b.trim())f+=`
`+w.slice(k);else{if(E||_.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||A.test(_)||j.test(_)||P.test(_))break;f+=`
`+b}!E&&!b.trim()&&(E=!0),u+=x+`
`,e=e.substring(x.length+1),_=w.slice(k)}}s.loose||(a?s.loose=!0:this.rules.other.doubleBlankLine.test(u)&&(a=!0)),s.items.push({type:"list_item",raw:u,task:!!this.options.gfm&&this.rules.other.listIsTask.test(f),loose:!1,text:f,tokens:[]}),s.raw+=u}let l=s.items.at(-1);if(l)l.raw=l.raw.trimEnd(),l.text=l.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let c of s.items){if(this.lexer.state.top=!1,c.tokens=this.lexer.blockTokens(c.text,[]),c.task){if(c.text=c.text.replace(this.rules.other.listReplaceTask,""),c.tokens[0]?.type==="text"||c.tokens[0]?.type==="paragraph"){c.tokens[0].raw=c.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),c.tokens[0].text=c.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let f=this.lexer.inlineQueue.length-1;f>=0;f--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[f].src)){this.lexer.inlineQueue[f].src=this.lexer.inlineQueue[f].src.replace(this.rules.other.listReplaceTask,"");break}}let u=this.rules.other.listTaskCheckbox.exec(c.raw);if(u){let f={type:"checkbox",raw:u[0]+" ",checked:u[0]!=="[ ]"};c.checked=f.checked,s.loose?c.tokens[0]&&["paragraph","text"].includes(c.tokens[0].type)&&"tokens"in c.tokens[0]&&c.tokens[0].tokens?(c.tokens[0].raw=f.raw+c.tokens[0].raw,c.tokens[0].text=f.raw+c.tokens[0].text,c.tokens[0].tokens.unshift(f)):c.tokens.unshift({type:"paragraph",raw:f.raw,text:f.raw,tokens:[f]}):c.tokens.unshift(f)}}if(!s.loose){let u=c.tokens.filter(_=>_.type==="space"),f=u.length>0&&u.some(_=>this.rules.other.anyLine.test(_.raw));s.loose=f}}if(s.loose)for(let c of s.items){c.loose=!0;for(let u of c.tokens)u.type==="text"&&(u.type="paragraph")}return s}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let r=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),n=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:r,raw:t[0],href:n,title:s}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let r=nl(t[1]),n=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(r.length===n.length){for(let a of n)this.rules.other.tableAlignRight.test(a)?o.align.push("right"):this.rules.other.tableAlignCenter.test(a)?o.align.push("center"):this.rules.other.tableAlignLeft.test(a)?o.align.push("left"):o.align.push(null);for(let a=0;a<r.length;a++)o.header.push({text:r[a],tokens:this.lexer.inline(r[a]),header:!0,align:o.align[a]});for(let a of s)o.rows.push(nl(a,o.header.length).map((l,c)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:o.align[c]})));return o}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let r=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:r,tokens:this.lexer.inline(r)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let r=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;let o=gn(r.slice(0,-1),"\\");if((r.length-o.length)%2===0)return}else{let o=Mp(t[2],"()");if(o===-2)return;if(o>-1){let a=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,a).trim(),t[3]=""}}let n=t[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(n);o&&(n=o[1],s=o[3])}else s=t[3]?t[3].slice(1,-1):"";return n=n.trim(),this.rules.other.startAngleBracket.test(n)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?n=n.slice(1):n=n.slice(1,-1)),sl(t,{href:n&&n.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let r;if((r=this.rules.inline.reflink.exec(e))||(r=this.rules.inline.nolink.exec(e))){let n=(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[n.toLowerCase()];if(!s){let o=r[0].charAt(0);return{type:"text",raw:o,text:o}}return sl(r,s,r[0],this.lexer,this.rules)}}emStrong(e,t,r=""){let n=this.rules.inline.emStrongLDelim.exec(e);if(!(!n||n[3]&&r.match(this.rules.other.unicodeAlphaNumeric))&&(!(n[1]||n[2])||!r||this.rules.inline.punctuation.exec(r))){let s=[...n[0]].length-1,o,a,l=s,c=0,u=n[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(u.lastIndex=0,t=t.slice(-1*e.length+s);(n=u.exec(t))!=null;){if(o=n[1]||n[2]||n[3]||n[4]||n[5]||n[6],!o)continue;if(a=[...o].length,n[3]||n[4]){l+=a;continue}else if((n[5]||n[6])&&s%3&&!((s+a)%3)){c+=a;continue}if(l-=a,l>0)continue;a=Math.min(a,a+l+c);let f=[...n[0]][0].length,_=e.slice(0,s+n.index+f+a);if(Math.min(s,a)%2){let E=_.slice(1,-1);return{type:"em",raw:_,text:E,tokens:this.lexer.inlineTokens(E)}}let b=_.slice(2,-2);return{type:"strong",raw:_,text:b,tokens:this.lexer.inlineTokens(b)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let r=t[2].replace(this.rules.other.newLineCharGlobal," "),n=this.rules.other.nonSpaceChar.test(r),s=this.rules.other.startingSpaceChar.test(r)&&this.rules.other.endingSpaceChar.test(r);return n&&s&&(r=r.substring(1,r.length-1)),{type:"codespan",raw:t[0],text:r}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let r,n;return t[2]==="@"?(r=t[1],n="mailto:"+r):(r=t[1],n=r),{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let r,n;if(t[2]==="@")r=t[0],n="mailto:"+r;else{let s;do s=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(s!==t[0]);r=t[0],t[1]==="www."?n="http://"+t[0]:n=t[0]}return{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let r=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:r}}}},Vt=class So{constructor(t){rt(this,"tokens");rt(this,"options");rt(this,"state");rt(this,"inlineQueue");rt(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||Dr,this.options.tokenizer=this.options.tokenizer||new us,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let r={other:Et,block:ls.normal,inline:mn.normal};this.options.pedantic?(r.block=ls.pedantic,r.inline=mn.pedantic):this.options.gfm&&(r.block=ls.gfm,this.options.breaks?r.inline=mn.breaks:r.inline=mn.gfm),this.tokenizer.rules=r}static get rules(){return{block:ls,inline:mn}}static lex(t,r){return new So(r).lex(t)}static lexInline(t,r){return new So(r).inlineTokens(t)}lex(t){t=t.replace(Et.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let r=0;r<this.inlineQueue.length;r++){let n=this.inlineQueue[r];this.inlineTokens(n.src,n.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,r=[],n=!1){for(this.options.pedantic&&(t=t.replace(Et.tabCharGlobal,"    ").replace(Et.spaceLine,""));t;){let s;if(this.options.extensions?.block?.some(a=>(s=a.call({lexer:this},t,r))?(t=t.substring(s.raw.length),r.push(s),!0):!1))continue;if(s=this.tokenizer.space(t)){t=t.substring(s.raw.length);let a=r.at(-1);s.raw.length===1&&a!==void 0?a.raw+=`
`:r.push(s);continue}if(s=this.tokenizer.code(t)){t=t.substring(s.raw.length);let a=r.at(-1);a?.type==="paragraph"||a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.at(-1).src=a.text):r.push(s);continue}if(s=this.tokenizer.fences(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.heading(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.hr(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.blockquote(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.list(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.html(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.def(t)){t=t.substring(s.raw.length);let a=r.at(-1);a?.type==="paragraph"||a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.raw,this.inlineQueue.at(-1).src=a.text):this.tokens.links[s.tag]||(this.tokens.links[s.tag]={href:s.href,title:s.title},r.push(s));continue}if(s=this.tokenizer.table(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.lheading(t)){t=t.substring(s.raw.length),r.push(s);continue}let o=t;if(this.options.extensions?.startBlock){let a=1/0,l=t.slice(1),c;this.options.extensions.startBlock.forEach(u=>{c=u.call({lexer:this},l),typeof c=="number"&&c>=0&&(a=Math.min(a,c))}),a<1/0&&a>=0&&(o=t.substring(0,a+1))}if(this.state.top&&(s=this.tokenizer.paragraph(o))){let a=r.at(-1);n&&a?.type==="paragraph"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):r.push(s),n=o.length!==t.length,t=t.substring(s.raw.length);continue}if(s=this.tokenizer.text(t)){t=t.substring(s.raw.length);let a=r.at(-1);a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):r.push(s);continue}if(t){let a="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(a);break}else throw new Error(a)}}return this.state.top=!0,r}inline(t,r=[]){return this.inlineQueue.push({src:t,tokens:r}),r}inlineTokens(t,r=[]){let n=t,s=null;if(this.tokens.links){let c=Object.keys(this.tokens.links);if(c.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(n))!=null;)c.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(n=n.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(n))!=null;)n=n.slice(0,s.index)+"++"+n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(n))!=null;)o=s[2]?s[2].length:0,n=n.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let a=!1,l="";for(;t;){a||(l=""),a=!1;let c;if(this.options.extensions?.inline?.some(f=>(c=f.call({lexer:this},t,r))?(t=t.substring(c.raw.length),r.push(c),!0):!1))continue;if(c=this.tokenizer.escape(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.tag(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.link(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(c.raw.length);let f=r.at(-1);c.type==="text"&&f?.type==="text"?(f.raw+=c.raw,f.text+=c.text):r.push(c);continue}if(c=this.tokenizer.emStrong(t,n,l)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.codespan(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.br(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.del(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.autolink(t)){t=t.substring(c.raw.length),r.push(c);continue}if(!this.state.inLink&&(c=this.tokenizer.url(t))){t=t.substring(c.raw.length),r.push(c);continue}let u=t;if(this.options.extensions?.startInline){let f=1/0,_=t.slice(1),b;this.options.extensions.startInline.forEach(E=>{b=E.call({lexer:this},_),typeof b=="number"&&b>=0&&(f=Math.min(f,b))}),f<1/0&&f>=0&&(u=t.substring(0,f+1))}if(c=this.tokenizer.inlineText(u)){t=t.substring(c.raw.length),c.raw.slice(-1)!=="_"&&(l=c.raw.slice(-1)),a=!0;let f=r.at(-1);f?.type==="text"?(f.raw+=c.raw,f.text+=c.text):r.push(c);continue}if(t){let f="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(f);break}else throw new Error(f)}}return r}},ps=class{constructor(e){rt(this,"options");rt(this,"parser");this.options=e||Dr}space(e){return""}code({text:e,lang:t,escaped:r}){let n=(t||"").match(Et.notSpaceStart)?.[0],s=e.replace(Et.endingNewline,"")+`
`;return n?'<pre><code class="language-'+pr(n)+'">'+(r?s:pr(s,!0))+`</code></pre>
`:"<pre><code>"+(r?s:pr(s,!0))+`</code></pre>
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${pr(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:r}){let n=this.parser.parseInline(r),s=rl(e);if(s===null)return n;e=s;let o='<a href="'+e+'"';return t&&(o+=' title="'+pr(t)+'"'),o+=">"+n+"</a>",o}image({href:e,title:t,text:r,tokens:n}){n&&(r=this.parser.parseInline(n,this.parser.textRenderer));let s=rl(e);if(s===null)return pr(r);e=s;let o=`<img src="${e}" alt="${r}"`;return t&&(o+=` title="${pr(t)}"`),o+=">",o}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:pr(e.text)}},Do=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},Yt=class Ao{constructor(t){rt(this,"options");rt(this,"renderer");rt(this,"textRenderer");this.options=t||Dr,this.options.renderer=this.options.renderer||new ps,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Do}static parse(t,r){return new Ao(r).parse(t)}static parseInline(t,r){return new Ao(r).parseInline(t)}parse(t){let r="";for(let n=0;n<t.length;n++){let s=t[n];if(this.options.extensions?.renderers?.[s.type]){let a=s,l=this.options.extensions.renderers[a.type].call({parser:this},a);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(a.type)){r+=l||"";continue}}let o=s;switch(o.type){case"space":{r+=this.renderer.space(o);break}case"hr":{r+=this.renderer.hr(o);break}case"heading":{r+=this.renderer.heading(o);break}case"code":{r+=this.renderer.code(o);break}case"table":{r+=this.renderer.table(o);break}case"blockquote":{r+=this.renderer.blockquote(o);break}case"list":{r+=this.renderer.list(o);break}case"checkbox":{r+=this.renderer.checkbox(o);break}case"html":{r+=this.renderer.html(o);break}case"def":{r+=this.renderer.def(o);break}case"paragraph":{r+=this.renderer.paragraph(o);break}case"text":{r+=this.renderer.text(o);break}default:{let a='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return r}parseInline(t,r=this.renderer){let n="";for(let s=0;s<t.length;s++){let o=t[s];if(this.options.extensions?.renderers?.[o.type]){let l=this.options.extensions.renderers[o.type].call({parser:this},o);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){n+=l||"";continue}}let a=o;switch(a.type){case"escape":{n+=r.text(a);break}case"html":{n+=r.html(a);break}case"link":{n+=r.link(a);break}case"image":{n+=r.image(a);break}case"checkbox":{n+=r.checkbox(a);break}case"strong":{n+=r.strong(a);break}case"em":{n+=r.em(a);break}case"codespan":{n+=r.codespan(a);break}case"br":{n+=r.br(a);break}case"del":{n+=r.del(a);break}case"text":{n+=r.text(a);break}default:{let l='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return n}},cs,bn=(cs=class{constructor(e){rt(this,"options");rt(this,"block");this.options=e||Dr}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?Vt.lex:Vt.lexInline}provideParser(){return this.block?Yt.parse:Yt.parseInline}},rt(cs,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),rt(cs,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),cs),Fp=class{constructor(...e){rt(this,"defaults",Eo());rt(this,"options",this.setOptions);rt(this,"parse",this.parseMarkdown(!0));rt(this,"parseInline",this.parseMarkdown(!1));rt(this,"Parser",Yt);rt(this,"Renderer",ps);rt(this,"TextRenderer",Do);rt(this,"Lexer",Vt);rt(this,"Tokenizer",us);rt(this,"Hooks",bn);this.use(...e)}walkTokens(e,t){let r=[];for(let n of e)switch(r=r.concat(t.call(this,n)),n.type){case"table":{let s=n;for(let o of s.header)r=r.concat(this.walkTokens(o.tokens,t));for(let o of s.rows)for(let a of o)r=r.concat(this.walkTokens(a.tokens,t));break}case"list":{let s=n;r=r.concat(this.walkTokens(s.items,t));break}default:{let s=n;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let a=s[o].flat(1/0);r=r.concat(this.walkTokens(a,t))}):s.tokens&&(r=r.concat(this.walkTokens(s.tokens,t)))}}return r}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(r=>{let n={...r};if(n.async=this.defaults.async||n.async||!1,r.extensions&&(r.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=t.renderers[s.name];o?t.renderers[s.name]=function(...a){let l=s.renderer.apply(this,a);return l===!1&&(l=o.apply(this,a)),l}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=t[s.level];o?o.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),n.extensions=t),r.renderer){let s=this.defaults.renderer||new ps(this.defaults);for(let o in r.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let a=o,l=r.renderer[a],c=s[a];s[a]=(...u)=>{let f=l.apply(s,u);return f===!1&&(f=c.apply(s,u)),f||""}}n.renderer=s}if(r.tokenizer){let s=this.defaults.tokenizer||new us(this.defaults);for(let o in r.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let a=o,l=r.tokenizer[a],c=s[a];s[a]=(...u)=>{let f=l.apply(s,u);return f===!1&&(f=c.apply(s,u)),f}}n.tokenizer=s}if(r.hooks){let s=this.defaults.hooks||new bn;for(let o in r.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let a=o,l=r.hooks[a],c=s[a];bn.passThroughHooks.has(o)?s[a]=u=>{if(this.defaults.async&&bn.passThroughHooksRespectAsync.has(o))return(async()=>{let _=await l.call(s,u);return c.call(s,_)})();let f=l.call(s,u);return c.call(s,f)}:s[a]=(...u)=>{if(this.defaults.async)return(async()=>{let _=await l.apply(s,u);return _===!1&&(_=await c.apply(s,u)),_})();let f=l.apply(s,u);return f===!1&&(f=c.apply(s,u)),f}}n.hooks=s}if(r.walkTokens){let s=this.defaults.walkTokens,o=r.walkTokens;n.walkTokens=function(a){let l=[];return l.push(o.call(this,a)),s&&(l=l.concat(s.call(this,a))),l}}this.defaults={...this.defaults,...n}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Vt.lex(e,t??this.defaults)}parser(e,t){return Yt.parse(e,t??this.defaults)}parseMarkdown(e){return(t,r)=>{let n={...r},s={...this.defaults,...n},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&n.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=e),s.async)return(async()=>{let a=s.hooks?await s.hooks.preprocess(t):t,l=await(s.hooks?await s.hooks.provideLexer():e?Vt.lex:Vt.lexInline)(a,s),c=s.hooks?await s.hooks.processAllTokens(l):l;s.walkTokens&&await Promise.all(this.walkTokens(c,s.walkTokens));let u=await(s.hooks?await s.hooks.provideParser():e?Yt.parse:Yt.parseInline)(c,s);return s.hooks?await s.hooks.postprocess(u):u})().catch(o);try{s.hooks&&(t=s.hooks.preprocess(t));let a=(s.hooks?s.hooks.provideLexer():e?Vt.lex:Vt.lexInline)(t,s);s.hooks&&(a=s.hooks.processAllTokens(a)),s.walkTokens&&this.walkTokens(a,s.walkTokens);let l=(s.hooks?s.hooks.provideParser():e?Yt.parse:Yt.parseInline)(a,s);return s.hooks&&(l=s.hooks.postprocess(l)),l}catch(a){return o(a)}}}onError(e,t){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let n="<p>An error occurred:</p><pre>"+pr(r.message+"",!0)+"</pre>";return t?Promise.resolve(n):n}if(t)return Promise.reject(r);throw r}}},Pr=new Fp;function Qe(e,t){return Pr.parse(e,t)}Qe.options=Qe.setOptions=function(e){return Pr.setOptions(e),Qe.defaults=Pr.defaults,ol(Qe.defaults),Qe};Qe.getDefaults=Eo;Qe.defaults=Dr;Qe.use=function(...e){return Pr.use(...e),Qe.defaults=Pr.defaults,ol(Qe.defaults),Qe};Qe.walkTokens=function(e,t){return Pr.walkTokens(e,t)};Qe.parseInline=Pr.parseInline;Qe.Parser=Yt;Qe.parser=Yt.parse;Qe.Renderer=ps;Qe.TextRenderer=Do;Qe.Lexer=Vt;Qe.lexer=Vt.lex;Qe.Tokenizer=us;Qe.Hooks=bn;Qe.parse=Qe;var Yg=Qe.options,Kg=Qe.setOptions,Zg=Qe.use,Xg=Qe.walkTokens,Qg=Qe.parseInline;var Jg=Yt.parse,eb=Vt.lex;function wr(e){let t=Qe.parse(e),r=Xi.sanitize(t);return Qi(r)}function fr(e,t){return i`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function Zr(e){return e.loading?i`<div class="prompt-block__status">불러오는 중…</div>`:e.error?i`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function ms(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=n=>String(n).padStart(2,"0");return`${t.getFullYear()}-${r(t.getMonth()+1)}-${r(t.getDate())} ${r(t.getHours())}:${r(t.getMinutes())}`}var qp={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},Bp={command_execution:"\uBA85\uB839 \uC2E4\uD589",file_change:"\uD30C\uC77C \uBCC0\uACBD",mcp_call:"MCP \uD638\uCD9C",web_search:"\uC6F9 \uAC80\uC0C9",plan:"\uACC4\uD68D"},jp=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,Up=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function nr(e){return!!e&&typeof e=="object"}function Mo(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function gl(e,t){let r=Mo(e),n=Mo(t),s=new Map;for(let l of r)s.set(l,(s.get(l)||0)+1);let o=0;for(let l of n){let c=s.get(l)||0;c>0?s.set(l,c-1):o+=1}let a=0;for(let l of s.values())a+=l;return{added:o,removed:a}}function Wp(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(s=>nr(s)&&typeof s.text=="string"?s.text:"").join(""):nr(e)&&typeof e.text=="string"&&(t=e.text);let n=(String(t).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return n.length>120?`${n.slice(0,117)}\u2026`:n}function zp(e){let t=String(e.name||""),r=e.input||{},n={kind:"tool",tool:t,icon:qp[t]||"\u{1F527}",input:r,expandable:!0};if((t==="Read"||t==="Write")&&(n.path=String(r.file_path||r.path||"")),t==="Write"&&(n.added=Mo(r.content).length),t==="Edit"){n.path=String(r.file_path||r.path||"");let{added:s,removed:o}=gl(r.old_string,r.new_string);n.added=s,n.removed=o}if(t==="MultiEdit"){n.path=String(r.file_path||r.path||"");let s=0,o=0,a=Array.isArray(r.edits)?r.edits:[];for(let l of a){let c=gl(nr(l)?l.old_string:"",nr(l)?l.new_string:"");s+=c.added,o+=c.removed}n.added=s,n.removed=o}return t==="Bash"&&(n.command=String(r.command||"")),(t==="Grep"||t==="Glob")&&(n.command=String(r.pattern||r.query||"")),n}function No(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}function Fo(e){let t=e.split(/\r?\n/).find(n=>n.trim().length>0)||"",r=jp.exec(t);return r?{kind:"gate",gate:r[2]==="implementation"?"impl":r[2],reviewer:r[3],verdict:r[4],time:r[5]?r[5].trim():void 0,text:t.trim()}:Up.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function Hp(e,t){if(e.type==="assistant"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[],s=[];for(let o of n)if(nr(o)){if(o.type==="text"&&typeof o.text=="string")s.push(Fo(o.text));else if(o.type==="thinking"){let a=No(o.thinking);a&&s.push(a)}else if(o.type==="tool_use"){let a=zp(o);typeof o.id=="string"&&t.set(o.id,a),s.push(a)}}return s}if(e.type==="user"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[];for(let s of n)if(nr(s)&&s.type==="tool_result"){let o=t.get(String(s.tool_use_id));if(o){let a=Wp(s.content);o.result=a,o.output=typeof s.content=="string"?s.content:a}}return[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success";return[{kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""}]}return[]}function Gp(e){if(e.type==="item.completed"&&nr(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[Fo(t.text)];if(t.type==="reasoning"){let r=No(t.text);return r?[r]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function Vp(e){if(e.schema!=="codex-delegation-monitor-v1"||!nr(e.event))return[];let t=e.event;if(t.type==="session.started"||t.type==="turn.started")return[];if((t.type==="item.started"||t.type==="item.completed")&&nr(t.item)){let r=t.item;if(typeof r.id!="string"||r.id.length===0)return[];if(t.type==="item.completed"&&r.kind==="agent_message"&&typeof r.text=="string"&&r.text.trim().length>0)return[Fo(r.text)];if(t.type==="item.completed"&&r.kind==="reasoning"){let l=No(r.text);return l?[l]:[]}if(r.kind!=="activity"||typeof r.activity!="string")return[];let n=Bp[r.activity];if(!n)return[];let s="\uC2DC\uC791",o="\u2026",a={kind:"tool",tool:"",icon:o,expandable:!1};if(t.type==="item.completed"){if(r.status==="completed")s="\uC644\uB8CC",o="\u2713";else if(r.status==="failed")s="\uC2E4\uD328",o="\u2717";else return[];a.result=""}return a.tool=`${n} \xB7 ${s}`,a.icon=o,[a]}return t.type==="turn.completed"&&t.status==="completed"?[{kind:"result",success:!0,text:"DONE"}]:t.type==="turn.failed"&&(t.status==="failed"||t.status==="interrupted")&&typeof t.error_code=="string"&&t.error_code.length>0?[{kind:"error",text:t.error_code}]:[]}function Yp(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function bl(e){let t=[],r=new Map,n=Array.isArray(e)?e:[];for(let s of n){let o=s;if(typeof s=="string"){let l=s.trim();if(l.length===0)continue;try{o=JSON.parse(l)}catch{continue}}if(!nr(o))continue;let a=o.schema==="codex-delegation-monitor-v1"?Vp(o):Yp(o)?Gp(o):Hp(o,r);for(let l of a)t.push(l)}return t}var Kp=5,Zp=10,Xp=/Task\s+#(\d+)/,Qp=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,Jp=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function gs(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function ef(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function tf(e){for(let t=e.length-1;t>=0;t-=1){let r=e[t];if(r.kind==="phase"||r.kind==="gate")return r.text||null}return null}function rf(e){let t=new Map,r=0;for(let s of e){if(s.kind!=="tool")continue;r+=1;let o=s.input||{};if(s.tool==="TaskCreate"){let c=Xp.exec(s.output||s.result||""),u=String(o.activeForm||o.subject||"").trim();if(!c||u.length===0)continue;t.set(c[1],{label:u,active:o.status==="in_progress"?r:0});continue}if(s.tool!=="TaskUpdate")continue;let a=t.get(String(o.taskId??""));if(!a)continue;let l=o.activeForm||o.subject;typeof l=="string"&&l.trim().length>0&&(a.label=l.trim()),typeof o.status=="string"&&(a.active=o.status==="in_progress"?r:0)}let n=null;for(let s of t.values())s.active>0&&(!n||s.active>n.active)&&(n=s);return n?n.label:null}function nf(e){if(e.tool==="Bash"){let t=e.command||"";return Qp.test(t)?"~ PR/\uAC8C\uC2DC \uC911":Jp.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function sf(e){let t=e.filter(s=>s.kind==="tool").slice(-Zp),r=new Map;t.forEach((s,o)=>{let a=nf(s);if(!a)return;let l=r.get(a)||{count:0,last:-1};l.count+=1,l.last=o,r.set(a,l)});let n=null;for(let[s,o]of r)(!n||o.count>n.count||o.count===n.count&&o.last>n.last)&&(n={label:s,count:o.count,last:o.last});return n?n.label:null}function of(e){let t=tf(e);if(t)return{text:t,guess:!1};let r=rf(e);if(r)return{text:r,guess:!1};let n=sf(e);return n?{text:n,guess:!0}:null}function af(e,t){if(typeof e!="number")return"";let r=Math.max(0,Math.floor((t-e)/1e3));return r<60?`${r}\uCD08 \uC804`:Ot(e,t)}function bs(e,t={}){let{transport:r,sessionLogStore:n,onClose:s}=t,o=null,a=null,l=null,c={},u=!0,f=new Set,_=new Set,b=null,E=null,k=!1,M=!1,P=!1,A=null,j=null;function ee(){k=!1,M=!1,P=!1,A=null,j=null}async function x(U){if(r){M=!0,P=!1,we();try{let B=await Promise.resolve(r("get-attempt-prompt",{attempt_id:U}));if(o!==U)return;!B||typeof B!="object"||Array.isArray(B)?P=!0:(A=B,j=U)}catch{o===U&&(P=!0)}finally{o===U&&(M=!1,we())}}}function w(){if(k=!k,k&&o&&j!==o){x(o);return}we()}function S(){if(!k)return"";let U=Zr({loading:M,error:P});if(U)return i`<div class="sv__prompt" data-seam="attempt-prompt">
        ${U}
      </div>`;if(!A)return"";if(A.missing)return i`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let B=ms(A.recorded_at);return i`<div class="sv__prompt" data-seam="attempt-prompt">
      ${B?i`<div class="prompt-block__meta">${B} 발송</div>`:""}
      ${typeof A.task_prompt=="string"?fr("\uACFC\uC5C5 (user)",A.task_prompt):""}
      ${typeof A.system_prompt=="string"?fr("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",A.system_prompt):""}
    </div>`}function H(){if(!l||!n)return[];let U=n.get(l);return bl(U?U.lines:[])}function Y(){if(!l||!n)return null;let U=n.get(l),B=U?U.last_event_at:null;return typeof B=="number"?B:null}function he(){return c.status==="running"}function le(){if(he()&&o){E||(E=setInterval(()=>we(),1e3));return}se()}function se(){E&&(clearInterval(E),E=null)}function de(U){let B=[],T=0;for(;T<U.length;){let z=U[T];if(z.kind==="tool"){let R=T;for(;R<U.length&&U[R].kind==="tool"&&U[R].tool===z.tool;)R+=1;if(R-T>=Kp&&!_.has(T)){B.push({kind:"group",idx:T,tool:z.tool||"",lines:U.slice(T,R).map((K,Z)=>({idx:T+Z,line:K}))}),T=R;continue}}B.push({kind:"line",idx:T,line:z}),T+=1}return B}function Ne(U){for(let B=U.length-1;B>=0;B-=1){let T=U[B];if(T.kind==="result"||T.kind==="error")return null;if(T.kind==="tool"&&!Object.hasOwn(T,"result"))return T}return null}function Ue(U){for(let B=U.length-1;B>=0;B-=1)if(U[B].kind==="thinking")return U[B];return null}function Ge(U,B){if(B.kind==="gate")return i`<div class="sv__gate">${B.text}</div>`;if(B.kind==="phase")return i`<div class="sv__phase">${B.text}</div>`;if(B.kind==="result")return i`<div
        class="sv__result${B.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${B.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${wr(B.text||(B.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(B.kind==="thinking"){let T=f.has(U);return i`<div
        class="sv__think${T?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>Ie(U)}
      >
        <span class="sv__think-line">💭 ${gs(B.text)}</span>
        ${T?i`<pre class="sv__think-expand">${B.text}</pre>`:""}
      </div>`}if(B.kind==="error")return i`<div class="sv__error">⛔ ${B.text}</div>`;if(B.kind==="blocker")return i`<div class="sv__error">⛔ ${B.text}</div>`;if(B.kind==="tool"){let T=f.has(U),z=B.tool==="Bash"?ef(B.command):0,R=B.tool==="Bash"?z>1?gs(B.command):B.command:B.path||B.command||"";return i`<div
        class="sv__tool${T?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>Ie(U)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${B.icon}</span>
          <span class="sv__tool-name">${B.tool}</span>
          ${R?i`<span class="sv__tool-detail">${R}</span>`:""}
          ${z>1?i`<span class="sv__tool-more">⋯ ${z}줄</span>`:""}
          ${typeof B.added=="number"?i`<span class="sv__diff-add">+${B.added}</span>`:""}
          ${typeof B.removed=="number"?i`<span class="sv__diff-del">−${B.removed}</span>`:""}
          ${B.result?i`<span class="sv__tool-ok">→ ${B.result}</span>`:""}
        </span>
        ${T?i`<pre class="sv__tool-expand">${ze(B)}</pre>`:""}
      </div>`}return i`<div class="sv__as">${wr(B.text||"")}</div>`}function ze(U){let B=[];if(U.tool==="Bash"&&typeof U.command=="string"&&U.command.length>0)B.push(U.command);else if(U.input!==void 0)try{B.push(`input: ${JSON.stringify(U.input,null,2)}`)}catch{}return typeof U.output=="string"&&U.output.length>0&&B.push(`output:
${U.output}`),B.join(`

`)}function Ze(){if(!o)return i``;let U=H(),B=(a?[c.model]:[c.runner,c.model,c.effort]).filter(Boolean).join(" \xB7 "),T=c.session_id||"",z=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${u?"ON":"OFF"}`,R=he(),K=R?af(Y(),Date.now()):"",Z=R?Ne(U):null,ce=R?Ue(U):null,fe=of(U);return i`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id">${a?c.role||"":o}</span>
        ${fe?i`<span
              class="sv__stage${fe.guess?" sv__stage--guess":""}"
              title=${fe.text}
              >${fe.text}</span
            >`:""}
        ${R?i`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${K?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${K}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${K?i`<span class="sv__live-ago">${K}</span>`:""}</span
            >`:""}
        ${T?i`<button
              type="button"
              class="sv__session"
              title=${T}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${T}`}
              @click=${()=>X(T)}
            >
              ⧉ ${T.slice(0,8)}
            </button>`:""}
        ${B?i`<span class="sv__meta">${B}</span>`:""}
        ${c.worktree?i`<span class="sv__wt" title=${c.worktree}
              >${c.worktree}</span
            >`:""}
        ${a?"":i`<button
              type="button"
              class="sv__prompt-toggle${k?" sv__prompt-toggle--on":""}"
              data-seam="attempt-prompt-toggle"
              aria-pressed=${k?"true":"false"}
              aria-label="발송 프롬프트 보기"
              title="이 세션에 실제로 보낸 시스템·과업 프롬프트"
              @click=${w}
            >
              ✉ 프롬프트
            </button>`}
        <button
          type="button"
          class="sv__follow${u?" sv__follow--on":""}"
          aria-pressed=${u?"true":"false"}
          aria-label=${z}
          @click=${_e}
        >
          <span class="sv__follow-full">⇣ ${z}</span>
          <span class="sv__follow-short">⇣ ${u?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>ae()}
        >
          ✕
        </button>
      </div>
      ${a?"":S()}
      <div class="sv__body">
        ${U.length===0?i`<div class="sv__empty">세션 로그 없음</div>`:de(U).map(be=>be.kind==="group"?qe(be):Ge(be.idx,be.line))}
      </div>
      ${Z||ce?i`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${Z?i`<span class="sv__now-icon">${Z.icon}</span>
                  <span class="sv__now-name">${Z.tool}</span>
                  <span class="sv__now-detail"
                    >${Z.tool==="Bash"?gs(Z.command):Z.path||Z.command||""}</span
                  >`:""}
            ${ce?i`<span class="sv__now-think"
                  >💭 ${gs(ce.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function qe(U){return i`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>ke(U.idx)}
    >
      <span class="sv__group-icon">${U.lines[0].line.icon}</span>
      <span class="sv__group-name">${U.tool}</span>
      <span class="sv__group-count">${U.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function ke(U){_.add(U),we()}function we(){je(Ze(),e),le(),u&&xe()}function xe(){let U=e.querySelector(".sv__body");U&&(U.scrollTop=U.scrollHeight)}function Ie(U){f.has(U)?f.delete(U):f.add(U),we()}function _e(){u=!u,we()}function X(U){ir(U).then(B=>{B?ie("\uBCF5\uC0AC\uB428","success",1200):ie("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function G(U){!o||!U||(c={...c,...U},we())}function $e(U){let B=U.target;if(!B||!B.classList||!B.classList.contains("sv__body"))return;!(B.scrollHeight-B.scrollTop-B.clientHeight<=4)&&u&&(u=!1,we())}e.addEventListener("scroll",$e,!0);function pe(U){let B=U&&U.attempt_id;if(!B)return;let T=l;o=B,a=typeof U.launch_id=="string"&&U.launch_id.length>0?U.launch_id:null,l=a?`session-log:${o}:${a}`:`session-log:${o}`,r&&T&&T!==l&&Promise.resolve(r("unsubscribe-session-log",{id:T})).catch(()=>{}),c=U.meta||{},u=!0,f.clear(),_.clear(),ee(),!b&&n&&(b=n.subscribe(we)),r&&Promise.resolve(r("subscribe-session-log",{id:l,attempt_id:o,...a?{launch_id:a}:{}})).catch(()=>{}),we()}function ae(){let U=l;o=null,a=null,l=null,f.clear(),_.clear(),ee(),se(),r&&U&&Promise.resolve(r("unsubscribe-session-log",{id:U})).catch(()=>{}),je(i``,e),s&&s()}return{open:pe,updateMeta:G,close:ae,isOpen(){return o!==null},destroy(){se(),b&&(b(),b=null),e.removeEventListener("scroll",$e,!0),o=null,a=null,l=null,je(i``,e)}}}function vn(e){let t=e&&typeof e=="object"?e:{},r=t.metadata&&typeof t.metadata=="object"?t.metadata:{},n=hl(t.spec_id),s=hl(r.spec_id);return n?{path:n,source:"native",conflict:s.length>0&&s!==n}:s?{path:s,source:"metadata",conflict:!1}:{path:"",source:"none",conflict:!1}}function hl(e){return typeof e=="string"?e.trim():""}function lf(e){return["plan_review","plan_approval","plan_check"].some(t=>{let r=e[t];return typeof r=="string"&&r.trim().length>0})}function cf(e){let t=e&&e.metadata||{},r=vn(e),n=[];return r.path&&n.push({kind:"spec",path:r.path,missing_state:null}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&n.push({kind:"plan",path:t.plan_path.trim(),missing_state:lf(t)?null:"plan_pending"}),n}function yl(e,t){let r=cf(e);return i`
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
  `}var df="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",uf=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,pf=/^\*\*결론\*\* — (.+)$/;function hs(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==df)return null;let r=uf.exec(t[1]||"");if(!r)return null;let n=r[1].split(" ")[0],s=r[2],o=r[3],a=2;for(;a<t.length&&t[a].trim().length===0;)a+=1;let l=a<t.length?pf.exec(t[a]):null,c=l?l[1].replace(/\s+/g," ").trim():"",u=l?a+1:a;return{lane:n,identifier:s,timestamp:o,conclusion:c,body:t.slice(u).join(`
`).trim()}}var vl=20;function wl(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let r=String(t.getMonth()+1).padStart(2,"0"),n=String(t.getDate()).padStart(2,"0"),s=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0");return`${r}-${n} ${s}:${o}`}function ff(e){return e.length>vl?`${e.slice(0,vl)}\u2026`:e}function _f(e,t,r,n){let s=`${t.lane} ${ff(t.identifier)}`;return i`<div class="detail-report">
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
        <span class="detail-report__time">${wl(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${n&&t.body.length>0?i`<div class="detail-report__body">
          ${wr(t.body)}
        </div>`:""}
  </div>`}function mf(e){return i`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${wl(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${wr(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function kl(e,t={},r={}){let n=Array.isArray(e)?e.filter(Boolean):[],s=r.expanded||new Set,o=typeof r.draft=="string"?r.draft:"",a=r.sending===!0,l=n.slice().sort((c,u)=>String(u.created_at||"").localeCompare(String(c.created_at||"")));return i`
    <div class="detail-section-label">댓글 (${n.length})</div>
    ${r.error?i`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:l.length===0?i`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:i`<div class="detail-comments" data-seam="comments">
            ${l.map(c=>{let u=hs(typeof c.text=="string"?c.text:"");return u?_f(c,u,t,s.has(c.id)):mf(c)})}
          </div>`}
    <div class="detail-comment-compose">
      <textarea
        class="detail-comment-compose__input"
        aria-label="댓글 추가"
        placeholder="댓글 추가"
        rows="3"
        ?disabled=${a}
        .value=${o}
        @input=${c=>t.onDraftInput&&t.onDraftInput(c.target.value)}
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
  `}var{I:Ob}=Za;var $l=e=>e.strings===void 0;var gf={},xl=(e,t=gf)=>e._$AH=t;var Mr=is(class extends Kr{constructor(e){if(super(e),e.type!==ur.PROPERTY&&e.type!==ur.ATTRIBUTE&&e.type!==ur.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!$l(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===Mt||t===lt)return t;let r=e.element,n=e.name;if(e.type===ur.PROPERTY){if(t===r[n])return Mt}else if(e.type===ur.BOOLEAN_ATTRIBUTE){if(!!t===r.hasAttribute(n))return Mt}else if(e.type===ur.ATTRIBUTE&&r.getAttribute(n)===t+"")return Mt;return xl(e),t}});var qo=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"],ys=["orchestration_model","orchestration_effort","orchestration_speed"],Sl=["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"],vs=["delegated","main"],ws=["inherit","claude","codex"],wn=["default","fast"],ks=["standard","fast_track"],kn=["codex","opus","fable","self","skip"],$s=["codex","fable","skip"],xs=["low","medium","high","xhigh"],Bt="auto";function _r(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Al(e){if(!_r(e)||!_r(e.runners))return[];let t=[];for(let[r,n]of Object.entries(e.runners))_r(n)&&_r(n.models)&&t.push([r,Object.keys(n.models)]);return t}function El(e){return e?.impl_dispatch==="main"}function Ss(e,t){let r=Al(e),n=t&&t!=="inherit"?r.filter(([s])=>s===t):r;return[Bt,...n.flatMap(([,s])=>s)]}function Xr(e,t,r){if(!_r(e)||!_r(e.runners))return[Bt];let n=[];for(let[s,o]of Object.entries(e.runners))if(!(!_r(o)||!_r(o.models))&&!(t&&t!=="inherit"&&s!==t))for(let[a,l]of Object.entries(o.models)){if(r&&r!==Bt&&a!==r)continue;let c=_r(l)?l.efforts:null;if(Array.isArray(c))for(let u of c)typeof u=="string"&&!n.includes(u)&&n.push(u)}return[Bt,...n]}function As(e,t){let r=Al(e);return(t?r.filter(([s])=>s===t):r).flatMap(([,s])=>s)}function Tl(e,t){let r={};for(let n of qo){let s=e?.[n],o=t?.[n];s!==o&&(r[n]=typeof o=="string"&&o.length>0?o:null)}return r}function Cl(e,t){let r={};for(let n of ys){let s=e?.[n]??null,o=t?.[n]??null;s!==o&&(r[n]=typeof o=="string"&&o.length>0?o:null)}return r}var Bo=[{id:"workflow",label:"\uC6CC\uD06C\uD50C\uB85C\uC6B0",keys:["workflow_mode"]},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort"]},{id:"implementation",label:"\uAD6C\uD604",keys:["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]},{id:"worker",label:"Worker",keys:[...ys]}],jo={workflow_mode:"\uBAA8\uB4DC",spec_review_model:"\uC0AC\uC591 \uB9AC\uBDF0",spec_review_effort:"\uC0AC\uC591 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_dispatch:"\uC2E4\uD589 \uBC29\uC2DD",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uBAA8\uB378",impl_effort:"effort",impl_speed:"\uC18D\uB3C4",orchestration_model:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",orchestration_effort:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",orchestration_speed:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4"},Il={pin:"\uD540",global:"\uC804\uC5ED",base:"\uAE30\uBCF8"};function Rl(e){return typeof e=="string"&&e.length>0?e:null}function bf(e,t,r){let n=Rl(t?.[e]);if(n!==null)return{value:n,source:"pin"};let s=Rl(r?.[e]);return s!==null?{value:s,source:"global"}:{value:null,source:"base"}}function Es(e,t,r){return e.map(n=>({key:n,...bf(n,t,r)}))}function Ll(e,t,r){let n={pin:0,global:0,base:0};for(let s of Es(e,t,r))n[s.source]+=1;return n}function Ol(e,t,r){return{id:e,key:t,value:typeof r=="string"?r:""}}function Pl(e,t,r){return typeof t!="string"||t.length===0?null:{id:e,preset_id:t,expected_revision:r}}var Ub=[...qo,...ys];var hf=[{id:"spec",label:"spec \uB9AC\uBDF0",receipt:"spec_review"},{id:"impl",label:"\uAD6C\uD604",receipt:null},{id:"impl_review",label:"impl \uB9AC\uBDF0",receipt:"impl_review"},{id:"pr",label:"PR",receipt:null}],yf={pin:"pin",global:"global",base:"base"};function vf(e){return i`<span
    class=${`detail-layer-rail detail-layer-rail--${yf[e]}`}
    data-source=${e}
    aria-hidden="true"
    ><i></i><i></i><i></i
  ></span>`}function wf(e,t,r){switch(e){case"workflow_mode":return ks;case"spec_review_model":case"impl_review_model":return kn;case"plan_review_model":return $s;case"spec_review_effort":case"plan_review_effort":case"impl_review_effort":return xs;case"impl_dispatch":return vs;case"impl_runtime":return ws;case"impl_model":return Ss(r,t.impl_runtime);case"impl_effort":return Xr(r,t.impl_runtime,t.impl_model);case"impl_speed":case"orchestration_speed":return wn;case"orchestration_model":return As(r,null);case"orchestration_effort":return Xr(r,void 0,t.orchestration_model||Bt).filter(n=>n!==Bt);default:return[]}}function kf(e,t){return i`<div class="detail-effective__row" data-key=${e.key}>
    ${vf(e.source)}
    <span class="detail-effective__k"
      >${jo[e.key]||e.key}</span
    >
    <span
      class=${`detail-effective__v${e.source==="base"?" detail-effective__v--dim":""}`}
      >${e.value??"(harness \uAE30\uBCF8)"}</span
    >
    <span
      class=${`detail-effective__badge detail-effective__badge--${e.source}`}
      >${Il[e.source]}</span
    >
    ${t.expanded?i`<select
          class="detail-effective__edit"
          data-edit-key=${e.key}
          aria-label=${`${jo[e.key]||e.key} \uD3B8\uC9D1`}
          @change=${r=>{let n=String(r.target.value);t.onEdit(e.key,n.length===0?null:n)}}
        >
          <option value="" ?selected=${e.source!=="pin"}>(기본)</option>
          ${t.options.map(r=>i`<option
                value=${r}
                ?selected=${e.source==="pin"&&e.value===r}
              >
                ${r===Bt?"\uC790\uB3D9":r}
              </option>`)}
        </select>`:""}
  </div>`}function Dl(e,t){let r=Bo.flatMap(o=>o.keys),n=Ll(r,e.metadata,e.workspace_values),s={};for(let o of Es(r,e.metadata,e.workspace_values))o.value!==null&&(s[o.key]=o.value);return i`<section
    class=${`detail-effective${e.expanded?" detail-effective--open":""}`}
    data-seam="effective-settings"
  >
    <button
      type="button"
      class="detail-effective__head"
      data-seam="effective-settings-toggle"
      aria-expanded=${e.expanded?"true":"false"}
      @click=${t.onToggle}
    >
      <span class="detail-effective__t">유효 실행 설정</span>
      <span class="detail-effective__summary">${$f(s)}</span>
      <span class="detail-effective__counts">
        <span class="detail-effective__count detail-effective__count--pin"
          >핀 ${n.pin}</span
        >
        <span class="detail-effective__count detail-effective__count--global"
          >전역 ${n.global}</span
        >
      </span>
      <span class="detail-effective__chev">▸</span>
    </button>
    <div class="detail-effective__body">
      ${Bo.map(o=>i`
          <div class="detail-effective__subhead">${o.label}</div>
          ${Es(o.keys,e.metadata,e.workspace_values).map(a=>kf(a,{expanded:e.expanded,options:wf(a.key,s,e.catalog),onEdit:t.onEdit}))}
        `)}
      <div class="detail-effective__foot">
        <select
          data-impl-preset-select
          aria-label="구현 프리셋"
          .value=${Mr(e.preset_id)}
          ?disabled=${e.preset_busy}
          @change=${o=>t.onPresetSelect(String(o.target.value))}
        >
          <option value="" ?selected=${e.preset_id===""}>
            구현 프리셋…
          </option>
          ${e.presets.map(o=>i`<option
                value=${o.id}
                ?selected=${o.id===e.preset_id}
              >
                ${o.name}${o.compatible===!1?" (\uBE44\uD638\uD658)":""}
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
        <span class="detail-effective__hint">구현 키 5개를 핀으로 기록</span>
      </div>
    </div>
  </section>`}function $f(e){let t=[];if(typeof e.workflow_mode=="string"&&t.push(String(e.workflow_mode)),e.impl_dispatch==="main")t.push("\uBA54\uC778");else if(e.impl_dispatch==="delegated"){let r=typeof e.impl_runtime=="string"?` ${e.impl_runtime}`:"";t.push(`\uC704\uC784${r}`)}else typeof e.impl_runtime=="string"&&t.push(`\uC704\uC784 ${e.impl_runtime}`);return typeof e.impl_model=="string"&&t.push(String(e.impl_model)),t.length>0?t.join(" \xB7 "):"\uAE30\uBCF8"}function Ml(e){let t=e&&typeof e.metadata=="object"&&e.metadata?e.metadata:{},r=e&&typeof e.workflow=="object"&&e.workflow?e.workflow:{},n=r.stages||{},s=r.route||t.route||null,o=typeof t.pr_url=="string"?t.pr_url:"",a=typeof t.exec_receipt=="string"?t.exec_receipt:"",l=es(r.planned_execution,r.exec_receipt);return i`<section class="detail-summary" data-seam="detail-summary">
    <div class="detail-summary__chips">
      <span class="detail-summary__chip detail-summary__chip--status"
        >${e?.status||"\u2014"}</span
      >
      ${s?i`<span class="detail-summary__chip detail-summary__chip--route"
            >${s}</span
          >`:""}
      ${t.workflow_mode==="fast_track"?i`<span class="detail-summary__chip detail-summary__chip--mode"
            >fast_track</span
          >`:""}
      ${o?i`<a
            class="detail-summary__chip detail-summary__chip--pr"
            href=${o}
            target="_blank"
            rel="noreferrer"
            >PR</a
          >`:""}
      ${l?i`<span
            class="detail-summary__chip detail-summary__chip--planned ctl-chip--planned"
            data-kind=${l.kind}
            title=${l.title}
            >${l.label}</span
          >`:""}
      ${a?i`<span
            class="detail-summary__chip detail-summary__chip--receipt"
            title=${a}
            >${a.split("@")[0]}</span
          >`:""}
    </div>
    <div class="detail-summary__gates">
      ${hf.map(c=>{let u=c.receipt&&typeof t[c.receipt]=="string"?String(t[c.receipt]):"",f=n[c.id],_=u.length>0||f?.fill==="full",b=!_&&f?.fill==="dim",E=f?.stale===!0;return i`<span
          class=${`detail-summary__gate${_?" detail-summary__gate--on":""}${b?" detail-summary__gate--current":""}${E?" detail-summary__gate--stale":""}`}
          data-gate=${c.id}
        >
          <span class="detail-summary__gate-pill">${c.label}</span>
          ${u?i`<span class="detail-summary__gate-sha"
                >${u.split("@")[1]?.slice(0,7)||""}</span
              >`:""}
        </span>`})}
    </div>
  </section>`}var Nl=["orchestration_model","orchestration_effort","orchestration_speed","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_runtime","impl_model","impl_effort"];function $n(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Ts(e){if(!$n(e)||!$n(e.runners))return null;let t=Object.entries(e.runners).filter(([,r])=>$n(r)&&$n(r.models));return t.length>0?t:null}function Uo(e,t){let r=Ts(e);if(!r||!t)return null;for(let[n,s]of r)if(Object.hasOwn(s.models,t))return n;return null}function Fl(e,t){return $n(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function ql(e,t){let r=Ts(e);if(!r||!t)return[];for(let[,n]of r)if(Object.hasOwn(n.models,t))return Fl(n,n.models[t]);return[]}function xf(e){let t=Ts(e);if(!t)return[];let r=[];for(let[,n]of t)for(let s of Object.values(n.models))for(let o of Fl(n,s))r.includes(o)||r.push(o);return r}function Sf(e,t){if(!t)return xf(e);let n=Ts(e)?.find(([o])=>o===t)?.[1];if(!n)return[];let s=[];for(let o of Object.keys(n.models))for(let a of ql(e,o))s.includes(a)||s.push(a);return s}function Bl(e,t,r){let n={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},s=n.impl_runtime==="inherit"?r:n.impl_runtime==="claude"||n.impl_runtime==="codex"?n.impl_runtime:null;if(n.impl_runtime==="inherit"&&!s)return n.impl_model="",n.impl_effort="",n;let o=Uo(t,n.impl_model);if(n.impl_model&&(!s||o!==s))return n.impl_model="",n.impl_effort="",n;let a=n.impl_model?ql(t,n.impl_model):Sf(t,s);return n.impl_effort&&a.length>0&&!a.includes(n.impl_effort)&&(n.impl_effort=""),n}function Af(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function jl(e,t){let r=t.getWorkspacePath,n=t.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",a="",l="";function c(k){k.key==="Escape"&&s&&(k.preventDefault(),b())}document.addEventListener("keydown",c);function u(){return s?i`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>b()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${Af(s)}</span
            >
            <button
              type="button"
              class="mv__close"
              aria-label="닫기"
              @click=${()=>b()}
            >
              ✕
            </button>
          </div>
          <div class="mv__body">
            ${o==="loading"?i`<div class="mv__status">불러오는 중…</div>`:o==="pending"?i`<div class="mv__status">${l}</div>`:o==="error"?i`<div class="mv__status mv__status--error">
                      ${l||"\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}
                    </div>`:wr(a)}
          </div>
        </div>
      </div>
    `:i``}function f(){je(u(),e)}async function _(k,M={}){s=k,o="loading",a="",l="",f();let P=r?r():"";if(!P){o="error",l="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",f();return}if(!n){o="error",l="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",f();return}let A="/api/doc?workspace="+encodeURIComponent(P)+"&path="+encodeURIComponent(k);try{let j=await n(A),ee=await j.json().catch(()=>({}));if(!j.ok||!ee||ee.ok!==!0){if(ee?.error==="not_found"&&M.missing_state==="plan_pending"){o="pending",l="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",f();return}o="error",l="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(ee&&ee.error||j.status)+")",f();return}a=String(ee.content||""),o="ready",f()}catch{o="error",l="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",f()}}function b(){s=null,je(i``,e)}function E(){document.removeEventListener("keydown",c),b()}return{open:_,close:b,destroy:E}}var Ef=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],Wl="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",Cs=["implementation","review-consult"],Tf=["running","done","failed","interrupted"],Cf={running:"\u25CF",done:"\u2713",failed:"\u2717",interrupted:"\u26A0"};function Rf(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function If(e){let t=bt(e);if(t.length>0)return t.map(s=>i`<span class="detail-usage-total" title=${s.tooltip}
          >${s.label}</span
        >`);let r=Vr(e);if(!r||!e)return"";let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return i`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${r.replace(/^τ /,"\u03C4 \uCD1D ")}${n}</span
    >${e.replayed?i`<span class="detail-usage-partial" title=${Wl}
          >부분 집계</span
        >`:""}`}function Ul(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function Wo(e){if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?zo(t):""}function Lf(e){if(!e||typeof e!="object"||Array.isArray(e))return null;let t=e;return typeof t.launch_id!="string"||t.launch_id.length===0||t.provider!=="codex"||!Cs.includes(t.role)||typeof t.model!="string"||t.model.length===0||typeof t.session_id!="string"||t.session_id.length===0||!Tf.includes(t.status)||typeof t.started_at!="number"||!Number.isFinite(t.started_at)||typeof t.last_event_at!="number"||!Number.isFinite(t.last_event_at)||!(t.completed_at===null||typeof t.completed_at=="string"&&Number.isFinite(Date.parse(t.completed_at)))||!(t.turn_id===null||typeof t.turn_id=="string")?null:t}function Of(e,t){let n=bt({providers:{codex:{subtotal:t.subtotal,breakdown:t.usage,...t.replayed?{replayed:!0}:{}}},roles:{}})[0];return i`<div class="detail-session__leg detail-session__usage-detail">
    <span class="detail-session__leg-role detail-session__usage-label"
      >${e}</span
    >
    <span class="detail-session__leg-meta detail-session__usage-value"
      >${[t.provider,t.model].filter(Boolean).join(" \xB7 ")}</span
    >
    ${t.session_id?i`<span
          class="detail-session__leg-sid detail-session__sid"
          title=${t.session_id}
          >${t.session_id.slice(0,8)}</span
        >`:""}
    ${Wo(t.completed_at)?i`<span class="detail-session__leg-time detail-session__time"
          >${Wo(t.completed_at)}</span
        >`:""}
    ${n?i`<span class="detail-session__usage" title=${n.tooltip}
          >${n.label}</span
        >`:""}
  </div>`}function Pf(e,t,r,n){let s=e.status==="running"?null:t,a=(s?bt({providers:{codex:{subtotal:s.subtotal,breakdown:s.usage,...s.replayed?{replayed:!0}:{}}},roles:{}}):[])[0],l=e.status==="running"?zo(e.last_event_at):s?Wo(s.completed_at):"";return i`<button
    type="button"
    class="detail-session__leg detail-session__usage-detail detail-session__leg--${e.status}"
    data-launch-id=${e.launch_id}
    @click=${()=>n.onOpenDelegation&&n.onOpenDelegation(r,e.launch_id)}
  >
    <span class="detail-session__leg-glyph" aria-hidden="true"
      >${Cf[e.status]}</span
    >
    <span class="detail-session__leg-role detail-session__usage-label"
      >${e.role}</span
    >
    <span class="detail-session__leg-meta detail-session__usage-value"
      >codex · ${e.model}</span
    >
    <span
      class="detail-session__leg-sid detail-session__sid"
      title=${e.session_id}
      >${e.session_id.slice(0,8)}</span
    >
    ${l?i`<span class="detail-session__leg-time detail-session__time"
          >${l}</span
        >`:""}
    ${a?i`<span class="detail-session__usage" title=${a.tooltip}
          >${a.label}</span
        >`:""}
  </button>`}function Df(e,t){return e.role===t.role&&e.model===t.model&&e.session_id===t.session_id}function Mf(e,t,r){let n=[],s=new Set,o=Array.isArray(e.delegation_sessions)?e.delegation_sessions:[];for(let f of o){let _=Lf(f);!_||s.has(_.launch_id)||(s.add(_.launch_id),n.push(_))}n.sort((f,_)=>f.started_at-_.started_at);let a={implementation:[],"review-consult":[]};if(t)for(let f of Cs){let _=t.roles[f]?.codex;a[f]=_?[..._.legs]:[]}let l=Cs.flatMap(f=>a[f]),c=new Set,u=[];for(let f of Cs){for(let _ of n.filter(b=>b.role===f)){let b=l.find(E=>E.receipt_id===_.launch_id)||null;b&&!Df(_,b)||(b&&c.add(b.receipt_id),u.push(Pf(_,b,e.attempt_id,r)))}for(let _ of a[f])c.has(_.receipt_id)||u.push(Of(f,_))}return u}function Nf(e,t){let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,n=[...Ef,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return i`<div class="detail-session__usage-detail">
    ${n.map(s=>i`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${s.label}</span
          ><span class="detail-session__usage-value"
            >${Rf(e[s.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${r===null?"":i`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${r.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?i`<span class="detail-session__usage-note">${Wl}</span>`:""}
  </div>`}var Ff={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function zo(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=String(t.getHours()).padStart(2,"0"),n=String(t.getMinutes()).padStart(2,"0");return`${r}:${n}`}function qf(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,n])=>typeof n=="string"&&n.length>0).map(([n,s])=>`${n}=${s}`).join(" \xB7 "):"",r=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return i`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${r}</span>
    ${t?i`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}function zl(e,t={},r={}){let n=Array.isArray(e)?e:[],s=r.expanded||new Set;if(n.length===0)return i`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let o=new Set;for(let u of n)u&&typeof u.resumed_from=="string"&&u.resumed_from.length>0&&o.add(u.resumed_from);let a=u=>{if(!(u.status==="failed"||u.status==="orphaned"))return"";let _=typeof u.session_id=="string"&&u.session_id.length>0,b=o.has(u.attempt_id),E=_&&!b,k=_?b?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return i`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${u.attempt_id}
      ?disabled=${!E}
      title=${k}
      @click=${M=>{M.stopPropagation(),E&&t.onResume&&t.onResume(u.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},l=u=>{if(!(u.status==="failed"||u.status==="orphaned")||typeof u.cause!="string"||u.cause==="")return"";let _=u.cause_detail,b=_&&typeof _.reason=="string"&&_.reason.length>0?typeof _.command=="string"&&_.command.length>0?`${_.reason} \xB7 ${_.command}`:_.reason:u.cause;return i`<div class="detail-session__cause" title=${b}>
      ${u.cause}
    </div>`},c=u=>{let f=Ul(_o(u));if(bt(f).length===0&&!Vr(u.usage))return"";let _=s.has(u.attempt_id);return i`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${u.attempt_id}
      aria-expanded=${_?"true":"false"}
      title=${_?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${b=>{b.stopPropagation(),t.onToggleUsage&&t.onToggleUsage(u.attempt_id)}}
    >
      τ 자세히
    </button>`};return i`
    <div class="detail-section-label">
      세션 이력${If(r.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${n.map(u=>{let f=_o(u),_=Ul(f),b=bt(_);return i`<div class="detail-session-row">
          <button
            type="button"
            class="detail-session detail-session--${u.status||"unknown"}"
            data-attempt-id=${u.attempt_id}
            @click=${()=>t.onOpen&&t.onOpen(u.attempt_id)}
          >
            <span class="detail-session__glyph"
              >${Ff[u.status||""]||"\xB7"}</span
            >
            <span class="detail-session__id">${u.attempt_id}</span>
            ${yr(u)?i`<span
                  class="detail-session__resumed"
                  title=${yr(u)}
                  >↻</span
                >`:""}
            <span class="detail-session__meta">${rr(u)}</span>
            ${b.length>0?i`<span class="detail-session__role">orchestrator</span>`:""}
            ${u.session_id?i`<span class="detail-session__sid" title=${u.session_id}
                  >${String(u.session_id).slice(0,8)}</span
                >`:""}
            ${b.length>0?b.map(E=>i`<span
                      class="detail-session__usage"
                      title=${E.tooltip}
                      >${E.label}</span
                    >`):Vr(u.usage)?i`<span class="detail-session__usage"
                    >${Vr(u.usage)}</span
                  >`:""}
            <span class="detail-session__time">${zo(u.started_at)}</span>
          </button>
          ${c(u)} ${a(u)} ${l(u)} ${qf(u)}
          ${s.has(u.attempt_id)&&u.usage?Nf(u.usage,u.runner==="codex"?"codex":"claude"):""}
          ${Mf(u,f,t)}
        </div>`})}
    </div>
  `}function Hl(e,t={}){return i`
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
          ${Bf(e)}
        </div>`:""}
  `}function Bf(e){let t=Zr(e);if(t)return t;let r=e.data;if(!r)return"";if(r.missing)return i`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof r.default_task_prompt=="string"?fr("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",r.default_task_prompt):""}`;let n=ms(r.recorded_at);return i`<div class="detail-prompt__meta">
      ${r.attempt_id}${n?` \xB7 ${n}`:""}
    </div>
    ${typeof r.task_prompt=="string"?fr("\uACFC\uC5C5 (user)",r.task_prompt):""}
    ${typeof r.system_prompt=="string"?fr("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",r.system_prompt):""}`}var jf=["open","in_progress","deferred","resolved","closed"],Uf=[0,1,2,3,4];function Gl(e,t){let r=t.issueStores,n=t.onClose,s=t.transport,o=t.onNavigate,a=t.queueStore,l=t.execPresetStore,c=t.sessionLogStore,u=null,f=null,_={},b="",E=!1,k=!1,M={},P=!1,A=!1,j="",ee="",x="";function w(){P=!1,A=!1,j="",ee="",x=""}let S=[],H=null,Y=null,he=!1,le="",se=!1,de=0,Ne=new Set;function Ue(){S=[],H=null,Y=null,he=!1,le="",se=!1,de+=1,Ne.clear()}async function Ge(d){if(!s)return;let m=++de;try{let h=await Promise.resolve(s("get-comments",{id:d}));if(m!==de||d!==u)return;S=Array.isArray(h)?h:[],he=!1}catch{if(m!==de||d!==u)return;he=!0}Se()}function ze(){if(!s||!u)return;let d=f&&typeof f.comment_count=="number"?f.comment_count:null;if(H!==u){H=u,Y=d,Ge(u);return}d!==null&&d!==Y&&(Y=d,Ge(u))}function Ze(d){Ne.has(d)?Ne.delete(d):Ne.add(d),Se()}function qe(d){let m=le.trim().length===0;le=d,m!==(d.trim().length===0)&&Se()}async function ke(){let d=le.trim();if(!s||!u||d.length===0||se)return;let m=u;se=!0,Se();let h=!1;try{let L=await Promise.resolve(s("add-comment",{id:m,text:d}));Array.isArray(L)&&L.length>0&&(h=!0,m===u&&(S=L,he=!1,le="",Y=L.length))}catch{h=!1}h||ie("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),m===u&&(se=!1),Se()}let we={onToggle:Ze,onDraftInput:qe,onSubmit:ke},xe=document.createElement("div");xe.className="md-viewer-root",document.body.appendChild(xe);let Ie=jl(xe,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),_e=document.createElement("div");_e.className="session-log-root",document.body.appendChild(_e);let X=bs(_e,{transport:s?(d,m)=>Promise.resolve(s(d,m)):void 0,sessionLogStore:c}),G=!1,$e=!1,pe=!1,ae=null,U=null,B=0;function T(d){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${d}`}function z(){G=!1,$e=!1,pe=!1,ae=null,U=null,B+=1}async function R(d){if(!s)return;let m=++B;$e=!0,pe=!1,Se();try{let h=await Promise.resolve(s("get-bead-prompt",{bead_id:d}));if(m!==B)return;!h||typeof h!="object"||Array.isArray(h)?pe=!0:(ae=h,U=T(d))}catch{m===B&&(pe=!0)}finally{m===B&&($e=!1,Se())}}function K(){if(G=!G,G&&u&&U!==T(u)){ae=null,R(u);return}Se()}function Z(){if(!a||!u)return[];let d=a.get();return(d&&d.attempts?Object.values(d.attempts):[]).filter(h=>h&&h.bead_id===u).sort((h,L)=>(L.started_at||0)-(h.started_at||0)).map(h=>({attempt_id:h.attempt_id,bead_id:h.bead_id,status:h.status,started_at:typeof h.started_at=="number"?h.started_at:null,runner:h.runner||null,model:h.model||null,effort:h.effort||null,speed:h.speed||null,session_id:h.session_id||null,resumed_from:h.resumed_from||null,continuation_mode:h.continuation_mode||null,dismissed_at:typeof h.dismissed_at=="number"?h.dismissed_at:null,cause:typeof h.cause=="string"?h.cause:null,cause_detail:h.cause_detail||null,exec_default_preset_id:typeof h.exec_default_preset_id=="string"?h.exec_default_preset_id:null,exec_default_preset_revision:typeof h.exec_default_preset_revision=="number"?h.exec_default_preset_revision:null,exec_values:h.exec_values&&typeof h.exec_values=="object"?h.exec_values:null,usage:h.usage||null,usage_legs:Array.isArray(h.usage_legs)?h.usage_legs:[],delegation_sessions:Array.isArray(h.delegation_sessions)?h.delegation_sessions:[]}))}function ce(){if(!a||!u)return null;let d=a.get();return Ft(d&&d.attempts||{},u)}let fe=new Set;function be(d){fe.has(d)?fe.delete(d):fe.add(d),Se()}function C(d){let m=a?a.get():null,h=m&&m.attempts?m.attempts[d]:null;X.open({attempt_id:d,meta:h?{runner:h.runner||void 0,model:h.model||void 0,effort:h.effort||void 0,status:h.status||void 0,session_id:h.session_id||void 0}:{}})}function N(d,m){let h=a?a.get():null,L=h&&h.attempts?h.attempts[d]:null,ge=(L&&Array.isArray(L.delegation_sessions)?L.delegation_sessions:[]).find(Te=>Te&&typeof Te=="object"&&Te.launch_id===m);ge&&X.open({attempt_id:d,launch_id:m,meta:{runner:"codex",role:ge.role,model:ge.model,session_id:ge.session_id,status:ge.status}})}async function te(d){if(!s||!d)return;let m=await Gr();if(m===null)return;let h=()=>{let Te=a?a.get():null;return Te&&typeof Te.revision=="number"?Te.revision:0},L=async(Te={},Me=h())=>await s("worker-attempt-resume",{attempt_id:d,expected_revision:Me,...m!==""?{instructions:m}:{},...Te}),me=Te=>{Te?.queue&&a?.set&&a.set(Te.queue)},ge=await L();if(me(ge),ge&&ge.conflict){let Te=ge.queue&&typeof ge.queue.revision=="number"?ge.queue.revision:h();ge=await L({},Te),me(ge)}ge=await lr(ge,(Te,Me)=>L({continuation:Te,decision_token:Me}),{onResult:me,refresh:()=>L()}),ge&&ge.resumed===!1&&!ge.conflict&&ge.reason&&ie(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${ge.reason}`,"error",2400)}let Q={onOpen:C,onOpenDelegation:N,onResume:te,onToggleUsage:be};function $(){let d=a?a.get():null,m={...M};for(let h of["orchestration_model","orchestration_effort","orchestration_speed"]){let L=d&&d[h];typeof L=="string"&&(m[h]=L)}return m}async function D(){if(s){try{let d=await Promise.resolve(s("get-session-defaults",{}));M=d&&d.values&&typeof d.values=="object"?d.values:{}}catch{M={}}Se()}}function V(){let d=a?a.get():null;return d&&d.runner_catalog||null}function Le(){let d=f?.metadata&&typeof f.metadata=="object"?f.metadata:{},h=(Object.hasOwn(_,"orchestration_model")?_.orchestration_model:void 0)||(typeof d.orchestration_model=="string"?d.orchestration_model:"")||(typeof $().orchestration_model=="string"?$().orchestration_model:"")||"opus";return Uo(V(),h)}function Re(){let d=l?l.get():null;return!d||typeof d.revision!="number"?null:{revision:d.revision,presets:Array.isArray(d.presets)?d.presets:[]}}function Fe(d){return d?.compatible===!1}function Ce(d){l&&d&&typeof d.revision=="number"&&Array.isArray(d.presets)&&l.set({revision:d.revision,presets:d.presets})}async function et(){let d=Re(),m=d?.presets.find(h=>h.id===b);if(!(!s||!u||!d||!m||Fe(m)||E)){E=!0,Se();try{let h=await Promise.resolve(s("apply-impl-preset",Pl(u,m.id,d.revision)));if(h&&h.conflict){Ce(h),ie("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let L=h&&Array.isArray(h.issue)?h.issue[0]:h?.issue;if(h&&h.applied&&L&&typeof L=="object"){f=L;for(let me of Nl)delete _[me];ie("\uAD6C\uD604 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",2400);return}h&&h.error==="bd_readback_failed"?ie("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):ie("\uAD6C\uD604 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(h){h&&typeof h=="object"&&h.code==="bd_readback_failed"?ie("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):ie("\uAD6C\uD604 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{E=!1,Se()}}}let ht=null;r&&r.subscribe&&(ht=r.subscribe(()=>it()));let yt=null;a&&typeof a.subscribe=="function"&&(yt=a.subscribe(()=>{u&&Se()}));let ot=null;l&&typeof l.subscribe=="function"&&(ot=l.subscribe(()=>{u&&Se()}));function $t(d){d.key==="Escape"&&u&&(d.preventDefault(),n())}document.addEventListener("keydown",$t);function it(){if(u){if(r&&typeof r.snapshotFor=="function"){let d=r.snapshotFor("detail:"+u)||[];f=d.find(h=>h&&h.id===u)||d[0]||f}ze(),Se()}}function st(d){ir(d).then(m=>{m?ie("\uBCF5\uC0AC\uB428","success",1200):ie("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function pt(d){d.preventDefault(),d.stopPropagation(),u&&st(u)}function W(d,m){d.preventDefault(),d.stopPropagation(),st(m)}function J(d,m,h){d.preventDefault(),d.stopPropagation(),Ie.open(m,{missing_state:h})}function ye(d,m){_[d]=m,Se(),!(!s||!u)&&Promise.resolve(s("update-exec-settings",Ol(u,d,m.length===0?null:m))).catch(()=>{ie("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}function ve(d,m){let h=f||{},L=h.metadata&&typeof h.metadata=="object"?h.metadata:{},me={};for(let Me of["impl_runtime","impl_model","impl_effort"])me[Me]=Object.hasOwn(_,Me)?_[Me]:typeof L[Me]=="string"?L[Me]:"";me[d]=m;let ge=Bl(me,V(),Le()),Te={};for(let Me of["impl_runtime","impl_model","impl_effort"])Te[Me]=_[Me],_[Me]=ge[Me]||"";Se(),!(!s||!u)&&Promise.resolve(s("update-impl-target",{id:u,...ge,orchestration_runtime:Le()})).then(Me=>{let ft=Array.isArray(Me)?Me[0]:Me;if(!ft||typeof ft!="object"||!ft.id)throw new Error("implementation target readback failed");f=ft;for(let er of["impl_runtime","impl_model","impl_effort"])delete _[er];Se()}).catch(()=>{for(let Me of["impl_runtime","impl_model","impl_effort"])Te[Me]===void 0?delete _[Me]:_[Me]=Te[Me];Se(),ie("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error")})}async function oe(d,m,h){if(!s||!u)return!1;try{let L=await Promise.resolve(s(d,m)),me=Array.isArray(L)?L[0]:L;return me&&typeof me=="object"&&me.id?(f=me,!0):(ie(h,"error"),!1)}catch{return ie(h,"error"),!1}}function De(d){setTimeout(()=>{try{let m=e.querySelector(d);m&&typeof m.focus=="function"&&m.focus()}catch{}},0)}function tt(){P=!0,j=f&&f.title||"",Se(),De('.detail-edit__input[data-edit="title"]')}function Ye(d){j=d.target.value}function Pe(){P=!1,j="",Se()}function Xe(){oe("edit-text",{id:u,field:"title",value:j},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(m=>{m&&(P=!1,j=""),Se()})}function Ae(){A=!0,ee=f&&f.description||"",Se(),De('.detail-edit__textarea[data-edit="description"]')}function _t(d){ee=d.target.value}function Tt(){A=!1,ee="",Se()}function Pt(){oe("edit-text",{id:u,field:"description",value:ee},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(m=>{m&&(A=!1,ee=""),Se()})}function Dt(d,m,h,L){if(d.key==="Escape"){d.stopPropagation(),h();return}d.key==="Enter"&&(!L||d.ctrlKey||d.metaKey)&&(d.preventDefault(),m())}function xr(d){let m=d.target.value;oe("update-status",{id:u,status:m},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>Se())}function vt(d){let m=Number(d.target.value);oe("update-priority",{id:u,priority:m},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>Se())}function kt(d){x=d.target.value}function Qt(){let d=x.trim();d.length!==0&&oe("label-add",{id:u,label:d},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(m=>{m&&(x=""),Se()})}function or(d){if(d.key==="Escape"){d.stopPropagation(),x="",Se();return}d.key==="Enter"&&(d.preventDefault(),Qt())}function jt(d){oe("label-remove",{id:u,label:d},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>Se())}let Ut={onCopyPath:W,onOpenDoc:J};function wt(d){return typeof d=="string"?d:d&&typeof d=="object"?String(d.id||d.to||d.issue_id||d.depends_on||""):""}function Jt(d){switch(d&&typeof d=="object"?String(d.dependency_type||d.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function p(d){let h=(Array.isArray(d.dependencies)?d.dependencies:[]).map(L=>({id:wt(L),icon:Jt(L)})).filter(L=>L.id.length>0);return i`
      <div class="detail-section-label">의존성</div>
      ${h.length===0?i`<div class="detail-empty">의존성 없음</div>`:i`<div class="detail-deps">
            ${h.map(L=>o?i`<button
                    type="button"
                    class="detail-dep detail-dep--link"
                    @click=${()=>o(L.id)}
                  >
                    ${L.icon?`${L.icon} `:""}${L.id}
                  </button>`:i`<span class="detail-dep"
                    >${L.icon?`${L.icon} `:""}${L.id}</span
                  >`)}
          </div>`}
    `}function v(d){let m=d.metadata||{},h=d.workflow||{},L=h.stages||{},me=L.spec&&L.spec.stale,ge=L.impl&&L.impl.stale,Te=L.plan||null,Me=h.route_source==="derived",ft=h.route||m.route||"\u2014";return i`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${Me?" detail-kv__v--derived":""}"
          title=${Me?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${Me?"unset":ft}</span
        >
      </div>
      ${h.route!=="quick_fix"||Object.hasOwn(m,"spec_review")?i`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${m.spec_review||"\uC5C6\uC74C"}${me?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${h.route==="full_plan"?i`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${Te?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${Te?.approval_receipt||"\uC5C6\uC74C"}${Te?.approval_state==="stale"?" \xB7 stale":Te?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${h.route!=="quick_fix"||Object.hasOwn(m,"impl_review")?i`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${m.impl_review||"\uC5C6\uC74C"}${ge?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${h.planned_execution?i`<div class="detail-kv">
              <span class="detail-kv__k">planned_execution</span>
              <span class="detail-kv__v">${h.planned_execution.kind}</span>
            </div>
            ${h.planned_execution.kind==="main"?i`<div class="detail-kv">
                  <span class="detail-kv__k">planned_execution_reason</span>
                  <span class="detail-kv__v detail-kv__v--wrap"
                    >${h.planned_execution.reason}</span
                  >
                </div>`:""}`:""}
      ${h.exec_receipt?i`<div class="detail-kv">
            <span class="detail-kv__k">exec_receipt</span>
            <span class="detail-kv__v detail-kv__v--wrap"
              >${`${h.exec_receipt.kind}:${h.exec_receipt.actor}@${h.exec_receipt.sha}`}</span
            >
          </div>`:""}
      ${h.impl_entry?i`<div class="detail-kv">
            <span class="detail-kv__k">impl_entry</span>
            <span class="detail-kv__v"
              >${`${h.impl_entry.actor}@${h.impl_entry.sha}`}</span
            >
          </div>`:""}
      ${m.pr_url?i`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${m.pr_url}</span>
          </div>`:""}
    `}let F={route:["quick_fix","spec_backed","full_plan"]};async function re(d,m){let h=m.target.value;if(d==="route"&&f&&f.metadata&&f.metadata.route==="full_plan"&&h!=="full_plan"&&!window.confirm(`full_plan \u2192 ${h||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){Se();return}await oe("update-workflow-meta",{id:u,key:d,value:h},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),Se()}function q(d){let m=d.metadata||{};return i` ${((L,me)=>{let ge=F[L],Te=typeof m[L]=="string"?m[L]:"";return i`<div class="detail-kv">
        <span class="detail-kv__k">${L}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${L}
          data-edit=${`wfmeta-${L}`}
          @change=${Me=>re(L,Me)}
        >
          <option value="" ?selected=${!ge.includes(Te)}>
            ${me}
          </option>
          ${ge.map(Me=>i`<option value=${Me} ?selected=${Te===Me}>${Me}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function y(d,m){return P?i`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${j}
            @input=${Ye}
            @keydown=${h=>Dt(h,Xe,Pe,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${Xe}
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
      `:i`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${d}</h2>
        ${bt(m).map(h=>i`<span class="detail-usage-total" title=${h.tooltip}
              >${h.label}</span
            >`)}
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${tt}
        >
          ✎
        </button>
      </div>
    `}function I(d){let m=mt(d.created_at),h=mt(d.updated_at);return!m&&!h?i``:i`
      ${m?i`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${m}</span>
          </div>`:""}
      ${h?i`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${h}</span>
          </div>`:""}
    `}function ne(d,m){return i`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${xr}
        >
          ${jf.map(h=>i`<option value=${h} ?selected=${h===d}>${h}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${vt}
        >
          ${Uf.map(h=>i`<option value=${String(h)} ?selected=${h===m}>
                P${h}
              </option>`)}
        </select>
      </div>
    `}function Ee(d){return i`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${A?"":i`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${Ae}
            >
              ✎
            </button>`}
      </div>
      ${A?i`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${ee}
              @input=${_t}
              @keydown=${m=>Dt(m,Pt,Tt,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${Pt}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${Tt}
              >
                취소
              </button>
            </div>
          </div>`:i`<div class="detail-overlay__desc">
            ${d||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function Je(d){let m=typeof d.notes=="string"?d.notes:"";return m.trim().length===0?i``:i`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${m}</div>
    `}function Be(d){let m=Array.isArray(d.labels)?d.labels:[];return i`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${m.map(h=>i`<span class="detail-label-chip"
              >${h}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${h}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+h}
                @click=${()=>jt(h)}
              >
                ×
              </button></span
            >`)}
        <span class="detail-label-add">
          <input
            class="detail-label-add__input"
            aria-label="라벨 추가"
            placeholder="라벨 추가"
            .value=${x}
            @input=${kt}
            @keydown=${or}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${Qt}
          >
            추가
          </button>
        </span>
      </div>
    `}function Ke(){if(!u)return i``;let d=f||{},m=String(d.id||u),h=d.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",L=ce(),me=d.status||"open",ge=typeof d.priority=="number"?Math.max(0,Math.min(4,d.priority)):"",Te=d.description||"",Me={...d,metadata:{...d.metadata||{},..._}};return i`
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
            @click=${pt}
          >
            ${m}
          </button>
          ${y(h,L)}
          ${Ml(Me)}
          ${Dl({metadata:Me.metadata,workspace_values:$(),catalog:V(),expanded:k,presets:Re()?.presets||[],preset_id:b,preset_busy:E},{onToggle:()=>{k=!k,Se()},onEdit:(ft,er)=>{if(ft==="impl_runtime"||ft==="impl_model"||ft==="impl_effort"){ve(ft,er??"");return}ye(ft,er??"")},onPresetSelect:ft=>{b=ft,Se()},onPresetApply:()=>{et()}})}
          ${ne(me,ge)} ${I(d)}
          ${Ee(Te)}
          ${kl(S,we,{expanded:Ne,draft:le,sending:se,error:he})}
          ${Je(d)} ${Be(d)} ${p(d)}
          ${v(d)} ${q(d)}
          ${yl(d,Ut)}
          ${Hl({expanded:G,loading:$e,error:pe,data:ae},{onToggle:K})}
          ${zl(Z(),Q,{total:L,expanded:fe})}
        </div>
      </div>
    `}function Se(){je(Ke(),e)}return{load(d){d!==u&&(_={},b="",k=!1,w(),Ue(),z()),u=d,f=null,it(),D()},clear(){u=null,f=null,_={},b="",E=!1,w(),Ue(),z(),Ie.close(),X.close(),je(i``,e)},destroy(){ht&&(ht(),ht=null),yt&&(yt(),yt=null),ot&&(ot(),ot=null),document.removeEventListener("keydown",$t),Ie.destroy(),xe.parentNode&&xe.parentNode.removeChild(xe),X.destroy(),_e.parentNode&&_e.parentNode.removeChild(_e),u=null,f=null,b="",E=!1,Ue(),z(),je(i``,e)}}}function Vl(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let r=t.querySelector("#fatal-error-title"),n=t.querySelector("#fatal-error-message"),s=t.querySelector("#fatal-error-detail"),o=t.querySelector("#fatal-error-reload"),a=t.querySelector("#fatal-error-close"),l=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},c=(u,f,_="")=>{r&&(r.textContent=u||"Unexpected Error"),n&&(n.textContent=f||"An unrecoverable error occurred.");let b=typeof _=="string"?_.trim():"";if(s&&(b.length>0?(s.textContent=b,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),a&&a.addEventListener("click",()=>l()),t.addEventListener("cancel",u=>{u.preventDefault(),l()}),{open:c,close:l,getElement(){return t}}}function Rs(e){return typeof e=="string"&&e.length>=7?e.slice(0,7):"\u2014"}function Is(e){if(typeof e!="number"||!Number.isFinite(e)||e<0)return"\u2014";if(e<1e3)return`${Math.round(e)}ms`;let t=e/1e3;if(t<60)return`${t.toFixed(1)}\uCD08`;let r=Math.floor(t/60);if(r<60)return`${r}\uBD84 ${Math.round(t-r*60)}\uCD08`;let n=Math.floor(r/60),s=r%60;return`${n}\uC2DC\uAC04 ${s}\uBD84`}function Yl(e,t){if(typeof e!="object"||e===null)return null;let r=0,n=!1;for(let s of Object.values(e)){if(typeof s!="object"||s===null)continue;let o=s;if(o.bead_id!==t)continue;let a=o.started_at,l=o.finished_at;typeof a!="number"||typeof l!="number"||!Number.isFinite(a)||!Number.isFinite(l)||l<a||(r+=l-a,n=!0)}return n?r:null}function Ls(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";let t=new Date(e);return`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`}function Wf(e,t){let r=Array.isArray(e)?e:[],n=Array.isArray(t)?t:[];if(r.length===0&&n.length===0)return null;let s=null;for(let l of r)l.kind!=="deploy"||l.state!=="succeeded"||typeof l.target_sha!="string"||(!s||(typeof l.finished_at=="number"?l.finished_at:0)>(typeof s.finished_at=="number"?s.finished_at:0))&&(s=l);let o=r.filter(l=>l.state==="failed"&&!l.dismissed&&!l.superseded_by).length+n.length,a=r.some(l=>l.state==="repairing");return{deploy:s?{sha:Rs(s.target_sha),at:typeof s.finished_at=="number"?s.finished_at:null,elapsed_ms:typeof s.elapsed_ms=="number"?s.elapsed_ms:null}:null,unresolved:o,repairing:a,badge:o>0?{tone:"act",label:`\uD574\uACB0 \uD544\uC694 ${o}`}:a?{tone:"live",label:"\uC790\uB3D9 \uD574\uACB0 \uC911"}:{tone:"quiet",label:"\uBAA8\uB450 \uC815\uC0C1"}}}function Kl(e,t){let r=Wf(e,t);return r?i`<button
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
            title=${r.deploy.at?mt(r.deploy.at):""}
            >${Ls(r.deploy.at)}${r.deploy.elapsed_ms!==null?` \xB7 ${Is(r.deploy.elapsed_ms)}`:""}</span
          >
        </span>`:""}
    <span class="worker-repo-strip__spacer"></span>
    <span
      class="worker-repo-strip__badge worker-repo-strip__badge--${r.badge.tone}"
      >${r.badge.label}</span
    >
  </button>`:""}function Qr(e){let t=Ot(e.created_at),r=Ot(e.updated_at);return!t&&!r?"":i`<div class="worker-mini__meta">
    ${t?i`<span title=${`\uC0DD\uC131 ${mt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&r?i`<span>·</span>`:""}${r?i`<span title=${`\uC218\uC815 ${mt(e.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </div>`}function zf(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function xn(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function Os(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function sr(e,t,r={}){let s=Object.values(e&&typeof e=="object"?e:{}).filter(_=>_&&_.bead_id===t&&_.phase!=="done").sort((_,b)=>(_.requested_at||0)-(b.requested_at||0)).at(-1),o=typeof r.attempt_id=="string"&&r.attempt_id.length>0?r.attempt_id:typeof s?.attempt_id=="string"?s.attempt_id:null,a=r.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":r.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":r.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,l=typeof s?.last_error=="string"?s.last_error:null,c=s?zf(s.phase):null,u=s?.kind==="stale_work_backup_fresh",f=r.merged||s?.mode==="merged_revert"?"merged":"unmerged";return{action:!r.external&&!r.done,enabled:!a&&(!s||!!l),label:u?l?"\uBC31\uC5C5 \uC815\uB9AC \uC7AC\uC2DC\uB3C4":"\uBC31\uC5C5 \uD6C4 \uC0C8\uB85C \uC2DC\uC791":l?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:a||(l?u?`\uBC31\uC5C5 \uB4A4 \uC815\uB9AC \uC2E4\uD328: ${l} \u2014 \uC6D0\uBCF8\uACFC \uAC80\uC99D \uC601\uC218\uC99D\uC744 \uBCF4\uC874\uD55C \uCC44 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:`\uD3D0\uAE30 \uC2E4\uD328: ${l} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:s?`${c||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:f==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:o,operation:s||null,progress:c,error:l,confirmation:f}}function mr(e){let t=e.discard;if(!t||!t.operation)return"";let r=t.operation,n=r.kind==="stale_work_backup_fresh"&&!t.error?null:r.backup?.path,s=r.original_pr,o=r.revert_pr;return i`<div
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
  </div>`}var Hf={dirty_unique:"\uCD5C\uC2E0 base\uC5D0 \uC5C6\uB294 \uB85C\uCEEC \uBCC0\uACBD\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",untracked_present:"\uCD94\uC801\uB418\uC9C0 \uC54A\uC740 \uD30C\uC77C\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",branch_ahead:"\uB85C\uCEEC branch\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",head_ahead:"worktree HEAD\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_not_contained:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 \uCD5C\uC2E0 base\uC5D0 \uD3EC\uD568\uB410\uC74C\uC744 \uC99D\uBA85\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ahead_merge_commit:"\uB85C\uCEEC branch\uC5D0 \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 merge commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_submodule_path:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 submodule \uACBD\uB85C\uB97C \uBCC0\uACBD\uD569\uB2C8\uB2E4",archive_failed:"\uACE0\uC720 commit \uBC31\uC5C5\uC744 \uC548\uC804\uD558\uAC8C \uAC80\uC99D\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ref_delete_failed:"\uD655\uC778\uB41C local branch\uB97C \uC548\uC804\uD558\uAC8C \uC0AD\uC81C\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",resume_available:"\uC774\uC5B4\uAC08 \uC218 \uC788\uB294 \uC774\uC804 Worker session\uC774 \uC788\uC2B5\uB2C8\uB2E4",observe_failed:"Git \uC0C1\uD0DC\uB97C \uC548\uC804\uD558\uAC8C \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",identity_changed:"\uD655\uC778 \uC911 worktree \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4",ownership_unknown:"Worker \uC18C\uC720 worktree\uC778\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"};function Zl(e,t=!1){if(!e||typeof e!="object")return null;let r=e;if(r.reason!=="worktree_stale_work"||!r.stale_work||typeof r.stale_work!="object")return null;let n=r.stale_work,s=n.residue==="branch"?"branch":"worktree",o=n.state==="unique"?"unique":"unknown",a=n.summary&&typeof n.summary=="object"?n.summary:{};function l(u){return Number.isInteger(a[u])?Number(a[u]):0}let c=typeof n.cause=="string"?n.cause:"observe_failed";return{residue:s,state:o,title:s==="branch"?"\uC774\uC804 \uBE0C\uB79C\uCE58 \uBCF4\uC874\uB428":o==="unique"?"\uC774\uC804 \uC791\uC5C5 \uBCF4\uC874\uB428":"\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",cause:Hf[c]||"\uC548\uC804\uD558\uAC8C \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 \uC774\uC804 \uC791\uC5C5\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",summary:s==="branch"?`\uACE0\uC720 commit ${l("branch_ahead")}`:[`staged ${l("staged_count")}`,`unstaged ${l("unstaged_count")}`,`untracked ${l("untracked_count")}`,`branch ahead ${l("branch_ahead")}`,`HEAD ahead ${l("head_ahead")}`].join(" \xB7 "),action_id:typeof n.action_id=="string"?n.action_id:"",can_resume:n.can_resume===!0,can_continue:n.can_continue===!0,can_backup_fresh:n.can_backup_fresh===!0,can_recheck:n.can_recheck===!0,locked:t}}function Ho(e){let t=e.draggable&&!e.done,r=Array.isArray(e.badges)?e.badges:[],n=bt(e.usage),s=Ht(e.usage),o=e.merge_step||null,a=e.lane==="pr_wait"||!!e.revise_action||!!e.stale_work,l=e.lane==="done"&&!a,c=l?Ot(e.done_at):"",u=t?i`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",f=typeof e.seq=="number"?i`<span class="worker-mini__seq" aria-hidden="true"
          >${e.seq}</span
        >`:"",_=e.worker_serial===!0?i`<span
          class="worker-mini__serial worker-mini__serial--legacy"
          title="legacy worker-serial 라벨 잔재 — 스케줄링에 사용되지 않습니다"
          >worker-serial</span
        >`:"",b=e.workspace_name?i`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",E=i`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,k=i`<span class="worker-mini__title">${e.title}</span>`,M=e.pr_url&&e.pr_number?i`<a
          class="worker-mini__pr"
          href=${e.pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="PR 열기"
          >#${e.pr_number} ↗</a
        >`:"",P=e.completion_repair_pr_url&&e.completion_repair_pr_number?i`<a
          class="worker-mini__pr worker-mini__repair-pr"
          href=${e.completion_repair_pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="repair PR 열기"
          >repair #${e.completion_repair_pr_number} ↗</a
        >`:"",A=r.map(Ge=>Ge===e.live_badge?i`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${Ge}</span
        >`:i`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${Ge===e.completion_badge&&e.completion_title||""}
          >${Ge}</span
        >`),j=e.reason?i`<span class="worker-mini__reason">${e.reason}</span>`:"",ee=n.length>0?n.map(Ge=>i`<span class="worker-usage" title=${Ge.tooltip}
              >${Ge.label}</span
            >`):s?i`<span class="worker-usage" title=${Yr(e.usage)}
            >${s}</span
          >`:"",x=o?i`<span
        class="merge-step${o.failed?" merge-step--failed":""}"
        style=${`--progress: ${o.percent}%`}
        >${o.label}${o.index>0?i`<span class="merge-step__n"
              >${o.index}/${o.total}</span
            >`:""}</span
      >`:"",w=e.merge_action?i`<button
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
      </button>`:"",Y=e.discard,he=Y?.action||e.discard_action?i`<button
          type="button"
          class="worker-mini__discard"
          data-bead-id=${e.id}
          data-attempt-id=${Y?.attempt_id||""}
          data-operation-id=${Y?.operation?.operation_id||""}
          data-discard-mode=${Y?.confirmation||"unmerged"}
          ?disabled=${Y?!Y.enabled:e.discard_enabled===!1}
          title=${Y?Y.title:e.discard_enabled===!1?e.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
        >
          ${Y?.label||"\uD3D0\uAE30"}
        </button>`:"",le=e.stale_work||null,se=le?i`${le.can_resume||le.can_continue?i`<button
            type="button"
            class="worker-mini__stale-continue"
            data-bead-id=${e.id}
            data-action-id=${le.action_id}
            ?disabled=${le.locked}
          >
            기존 작업 이어가기
          </button>`:""}${le.can_backup_fresh?i`<button
            type="button"
            class="worker-mini__stale-backup"
            data-bead-id=${e.id}
            data-action-id=${le.action_id}
            ?disabled=${le.locked}
          >
            백업 후 새로 시작
          </button>`:""}${le.can_recheck?i`<button
            type="button"
            class="worker-mini__stale-recheck"
            data-bead-id=${e.id}
            data-action-id=${le.action_id}
            ?disabled=${le.locked}
          >
            다시 확인
          </button>`:""}`:"",de=le?i`<div class="worker-mini__stale">
        <strong>${le.title}</strong>
        <span>${le.summary}</span>
        <span>${le.cause}</span>
        ${le.can_backup_fresh?i`<small
              >Git-ignored dependency/build output은 archive에 포함되지
              않습니다</small
            >`:""}
      </div>`:"",Ne=e.revise_action?i`<button
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
        </button>`:"",Ue=!!(s||o||e.merge_action||e.cancel_action||e.timeline_action||e.discard_action||Y?.operation||e.revise_action||le);return i`<div
    class="worker-mini${a?" worker-mini--card":""}${t?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${e.ghost?" worker-mini--ghost":""}${o?" worker-mini--merging":""}${o?.failed?" worker-mini--merge-failed":""}${e.external?" worker-mini--external":""}"
    style=${o?`--progress: ${o.percent}%`:""}
    draggable=${t?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${l?i`<div class="worker-mini__row1">${b}${E}${k}</div>
          <div class="worker-mini__row2">
            ${ee}${c?i`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${mt(e.done_at)}`}
                  >완료 ${c}</span
                >`:""}${typeof e.work_ms=="number"?i`<span
                  class="worker-mini__work"
                  title="attempt 실행 시간 합산 (재개 세션 포함)"
                  >작업 ${Is(e.work_ms)}</span
                >`:""}${A}${x}
            <span class="worker-mini__actions"
              >${w}${S}${H}${he}</span
            >
            ${Qr(e)}
          </div>`:a?i`<div class="worker-mini__head">
              ${u}${f}${b}${E}${M}${P}${A}${_}${j}
            </div>
            <div class="worker-mini__body">${k}${de}</div>
            ${Ue?i`<div class="worker-mini__foot">
                  ${ee}${x}
                  <span class="worker-mini__actions"
                    >${w}${S}${H}${he}${Ne}${se}</span
                  >
                  ${mr(e)}
                </div>`:""}
            ${Qr(e)}`:i`<div class="worker-mini__line">
              ${u}${f}${b}${E}${k}${M}${P}${A}${_}${j}${ee}${x}${w}${S}${H}${he}
            </div>
            ${mr(e)} ${Qr(e)}`}
  </div>`}function Gf(e){let t=e.draggable&&!e.done,r=e.workflow,n=r&&r.chips||{},s=n.route||r&&r.route,o=n.route_source==="derived"||!!(r&&r.route_source==="derived"),a=e.is_quick_fix===!0||!!r&&r.route==="quick_fix",l=typeof e.reason=="string"&&e.reason.startsWith("\u26D4");return i`<div
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
    ${r?Jn(r,e.status):""}
    <div
      class="worker-card__foot${e.reason?"":" worker-card__foot--actions-only"}"
    >
      ${e.reason?i`<span
            class="worker-card__reason${l?" worker-card__reason--danger":""}"
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
    ${Qr(e)}
  </div>`}function Kt(e){let t=!!e.collapsible&&!!e.collapsed,r=i`<span
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
                  </div>`:e.items.map(n=>e.lane==="candidate"?Gf(n):Ho(n))}
          </div>`}
  </section>`}var Xl=[{step:"merge",label:"\uBA38\uC9C0",index:1},{step:"base",label:"base",index:2},{step:"verify",label:"\uAC80\uC99D",index:3},{step:"deploy",label:"\uBC30\uD3EC",index:4},{step:"child",label:"\uC790\uC2DD",index:5},{step:"branch",label:"\uBE0C\uB79C\uCE58",index:6},{step:"close",label:"close",index:7}],Sn=[{step:"base_containment",label:"base \uD3EC\uD568 \uD655\uC778"},{step:"repo_operations",label:"\uC800\uC7A5\uC18C \uC791\uC5C5"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"}];function Ps(e,t){let r=Xl.find(s=>s.step===e);if(!r)return null;let n=Xl.length;return{step:r.step,label:t,index:r.index,total:n,percent:Math.round(r.index/n*100)}}function Ql(e){let t=Sn.findIndex(r=>r.step===e);return Sn.map((r,n)=>({step:r.step,label:r.label,state:t<0?"todo":n<t?"done":n===t?"stall":"todo"}))}function Nr(e){let t=Sn.find(r=>r.step===e);return t?t.label:typeof e=="string"?e:""}function Vf(e){let t=Sn.findIndex(r=>r.step===e);return t<0?null:{index:t+1,total:Sn.length}}function Ds(e){let t=Vf(e);return t?`\uBA38\uC9C0 \uC644\uB8CC \xB7 \uC815\uB9AC ${t.total}\uB2E8\uACC4 \uC911 ${t.index}\uB2E8\uACC4\uC5D0\uC11C \uBA48\uCDA4`:"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644"}var Vo=new Set(["queued","running","retry_pending","repairing"]),Jl=new Set(["failed","succeeded"]),Yf={queued:"\uB300\uAE30",running:"\uC911",retry_pending:"\uC7AC\uC2DC\uB3C4 \uB300\uAE30",repairing:"\uC790\uB3D9 \uD574\uACB0 \uC911",failed:"\uC2E4\uD328",succeeded:"\uC644\uB8CC \xB7 \uC815\uB9AC \uC7AC\uAC1C \uB300\uAE30"},An={base_containment:{step:"base",label:"base \uD655\uC778 \uC911"},child_sweep:{step:"child",label:"\uC790\uC2DD \uC815\uB9AC \uC911"},branch_cleanup:{step:"branch",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC \uC911"},parent_close:{step:"close",label:"\uBD80\uBAA8 close \uC911"}},Kf={merging:{step:"merge",label:"\uBA38\uC9C0 \uC911"},base_containment:An.base_containment,child_sweep:An.child_sweep,branch_cleanup:An.branch_cleanup,parent_close:An.parent_close};function Zf(e){return typeof e=="string"&&/^[0-9a-f]{40}$/.test(e)}function Xf(e,t,r){return!["verify","deploy"].includes(e.kind)||![...Vo,...Jl].includes(e.state)||![null,void 0,""].includes(e.superseded_by)||!Array.isArray(e.subjects)?!1:e.subjects.some(n=>n&&typeof n=="object"&&n.bead_id===t&&n.merged_sha===r)}function Qf(e,t){let r=(t.kind==="deploy"?2:1)-(e.kind==="deploy"?2:1);if(r!==0)return r;let n=u=>u.state==="succeeded"?1:2,s=n(t)-n(e);if(s!==0)return s;let o=typeof e.requested_at=="number"?e.requested_at:0,a=typeof t.requested_at=="number"?t.requested_at:0;if(o!==a)return a-o;let l=typeof e.operation_id=="string"?e.operation_id:"",c=typeof t.operation_id=="string"?t.operation_id:"";return l.localeCompare(c)}function Go(e,t=!1){let r=e.kind,n=r==="verify"?"\uAC80\uC99D":"\uBC30\uD3EC",s=t?"failed":e.state,o=Yf[s];if(!o)return null;let a=Ps(r,`${n} ${o}`);return a?{...a,active:Vo.has(s),failed:s==="failed"}:null}function Jf(e){return!e||typeof e!="object"?null:Kf[e.step]||null}function Ms(e){if(!e||typeof e.bead_id!="string")return null;let t=e.bead_id,r=e.merge_progress&&typeof e.merge_progress=="object"?e.merge_progress:{},n=Jf(r),s=e.cleanup_failed&&typeof e.cleanup_failed=="object"?e.cleanup_failed:null,o=["child_sweep","branch_cleanup","parent_close"].includes(typeof e.cleanup_cursor=="string"?e.cleanup_cursor:""),a=!o&&(e.cleanup_cursor==="repo_operations"||r.step==="repo_operations"),l=Zf(e.merge_sha)?e.merge_sha:null,c=!o&&l&&Array.isArray(e.repo_operations)?e.repo_operations.filter(k=>k&&typeof k=="object"&&Xf(k,t,l)).sort(Qf):[],u=a?c:[],f=u.find(k=>Vo.has(k.state));if(f)return Go(f);if(s)return s.step==="repo_operations"&&c[0]?Go(c[0],!0):null;let _=u.find(k=>Jl.has(k.state)?k.state!=="succeeded"||e.cleanup_cursor==="repo_operations":!1);if(_)return Go(_);if(n){let k=Ps(n.step,n.label);return k?{...k,active:!0,failed:!1}:null}let b=typeof e.cleanup_cursor=="string"?An[e.cleanup_cursor]:null;if(!b)return null;let E=Ps(b.step,b.label);return E?{...E,active:!0,failed:!1}:null}function Ns(e){return!!e&&e.step!=="merge"&&e.failed!==!0}var ec={verify_failed:"\uAC80\uC99D \uC2E4\uD328",verify_cmd_failed:"\uAC80\uC99D \uC2E4\uD328",verify_script_failure:"\uAC80\uC99D \uC2E4\uD328",deploy_failed:"\uBC30\uD3EC \uC2E4\uD328",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328",interrupted_without_terminal_exit:"\uC911\uB2E8\uB428"},tc={repo_ops_worktree_unowned:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uAC00 \uC544\uC9C1 Worker \uC18C\uC720\uAC00 \uC544\uB2C8\uC5B4\uC11C \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804\uC5D0 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",verify_cmd_failed:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D \uBA85\uB839\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",gh_observation_failed:"GitHub\uC5D0\uC11C PR \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_script_failure:"\uAC80\uC99D \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",deploy_script_failure:"\uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",interrupted_without_terminal_exit:"\uC791\uC5C5\uC774 \uC885\uB8CC \uAE30\uB85D \uC5C6\uC774 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",base_unresolved:"PR\uC774 \uC5B4\uB290 base \uBE0C\uB79C\uCE58\uB85C \uBA38\uC9C0\uB418\uB294\uC9C0 \uD655\uC815\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ref_unobserved:"PR\uC758 base \uBE0C\uB79C\uCE58\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",merge_sha_unobserved:"\uBA38\uC9C0 \uCEE4\uBC0B SHA\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_fetch_failed:"\uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uB97C fetch\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_rev_unavailable:"fetch\uD55C \uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uC758 \uCEE4\uBC0B\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ff_diverged:"\uB85C\uCEEC base \uBE0C\uB79C\uCE58\uAC00 \uC6D0\uACA9\uACFC \uAC08\uB77C\uC838 fast-forward\uB85C \uC815\uB82C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",deployment_target_not_covering_merge:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",deployment_candidate_ancestry_check_failed:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uB294\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."};function rc(e){return typeof e!="string"||e.length===0?[]:e.split(":").filter(t=>t.length>0)}function Yo(e){for(let t of rc(e))if(Object.hasOwn(ec,t))return ec[t];return null}function Ko(e){let t=null;for(let r of rc(e))Object.hasOwn(tc,r)&&(t=tc[r]);return t}function Fs(e){let t=Yo(e),r=Ko(e);return t&&r?`${t} \u2014 ${r}`:t||r?t||r:typeof e=="string"?e:""}function nc(e,t){let r=Yo(e)??Yo(t),n=Ko(t)??Ko(e);return r&&n?`${r} \u2014 ${n}`:r||n?r||n:typeof t=="string"?t:""}var sc=160;function e_(e){return e.length>sc?`${e.slice(0,sc)}\u2026`:e}function t_(e){return!e||!e.reason?"":i`<div class="worker-banner__detail">
    가드:
    ${e.reason}${e.command?i` · <code>${e_(e.command)}</code>`:""}
  </div>`}function r_(e){return e?i`<details class="worker-banner__raw">
    <summary>세부</summary>
    <dl class="worker-banner__kv">
      <div>
        <dt>실패 코드</dt>
        <dd>${e}</dd>
      </div>
    </dl>
  </details>`:""}function Zo(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),r=Math.floor(t/60),n=t%60;return r>0?`${r}m ${String(n).padStart(2,"0")}s`:`${n}s`}function oc(e){let t=e.failure?Fs(e.failure.reason):"";return i`<div class="worker-banners">
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
          ${t_(e.failure.cause_detail)}
          ${r_(e.failure.reason)}
          ${mr({discard:e.failure.discard})}
        </div>`:""}
  </div>`}function n_(e,t,r=null){let n=e.failed===!0,s=!!e.paused,o=n?e.status_label||(e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):s?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?Zo(t-e.started_at):"\u2014",a=rr(e),l=yr(e),c=bt(e.usage),u=Ht(e.usage),f=e.conflict_resolution?s?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,_=e.base_exception||null,b=e.attempt_id&&e.attempt_id===r,E=e.discard?.action?i`<button
        type="button"
        class="rtile__discard"
        data-operation-id=${e.discard.operation?.operation_id||""}
        ?disabled=${!e.discard.enabled}
        title=${e.discard.title}
        aria-label=${e.discard.label}
      >
        ${e.discard.label}
      </button>`:"";return i`<div
    class="rtile${b?" rtile--sel":""}${s?" rtile--paused":""}${n?" rtile--failed":""}"
    data-bead-id=${e.bead_id}
    data-attempt-id=${e.attempt_id||""}
  >
    <div class="rtile__hd">
      <span class="rtile__dot" aria-hidden="true"></span>
      <span class="rtile__id" title="클릭하면 ID 복사">${e.bead_id}</span>
      ${l?i`<span class="rtile__resumed" title=${l}>↻</span>`:""}
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
            ${E}
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
            ${E}`}
    </div>
    <div class="rtile__title">${e.title}</div>
    ${e.current_child?i`<div class="rtile__child" title="현재 진행중 child">
          └ ${e.current_child}
        </div>`:""}
    ${a||c.length>0||u||f||_?i`<div class="rtile__meta">
          ${f?i`<span class="worker-mini__badge">${f}</span>`:""}
          ${_?i`<span
                class="worker-mini__badge"
                title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
                >${_}</span
              >`:""}
          ${a?i`<span class="rtile__runner">${a}</span>`:""}
          ${c.length>0?c.map(k=>i`<span class="worker-usage" title=${k.tooltip}
                    >${k.label}</span
                  >`):u?i`<span
                  class="worker-usage"
                  title=${Yr(e.usage)}
                  >${u}</span
                >`:""}
        </div>`:""}
    ${Qr(e)} ${mr(e)}
    <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일): 큐
         스냅샷에는 페이즈명도 진행률도 없으므로 진행 바는 만들지 않는다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
    ${n||s?"":i`<div class="rtile__accent" aria-hidden="true"></div>`}
  </div>`}function Xo(e,t=Date.now(),r=null){let n=Array.isArray(e)?e:[];return i`<div class="worker-rungrid" id="worker-rungrid">
    ${n.length===0?i`<div class="worker-rungrid__empty">실행 세션 없음</div>`:n.map(s=>n_(s,t,r))}
  </div>`}function Fr(e){return i`<svg
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
  </svg>`}function Qo(){return Fr(gr`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function Jo(){return Fr(gr`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function ac(){return Fr(gr`<rect x="4.3" y="4.3" width="7.4" height="7.4" rx="1.2" />`)}function ic(){return Fr(gr`<path d="M4.4 4.4 11.6 11.6M11.6 4.4 4.4 11.6" />`)}function lc(){return Fr(gr`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function cc(){return Fr(gr`<rect x="2.6" y="2.6" width="7.4" height="7.4" rx="1.2" />
    <path d="M6 13.4h6a1.4 1.4 0 0 0 1.4-1.4V6" />`)}function dc(){return Fr(gr`<path d="M3 3.6 8.2 8 3 12.4z" />
    <path d="M8.8 3.6 14 8l-5.2 4.4z" />`)}var En=1,s_=6e4,o_={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328"},a_=new Set(["auto_merge","merged","merge","done"]),uc={running:3,paused:2,failed:1};function i_(e,t){let r=null,n=-1/0;for(let s of Object.values(e)){if(!s||s.bead_id!==t||s.status==="running")continue;let o=typeof s.finished_at=="number"?s.finished_at:typeof s.started_at=="number"?s.started_at:0;o>=n&&(n=o,r=s)}return r}function l_(e,t){let r=Object.values(e||{}),n=new Set,s=new Map;for(let a of r)!a||typeof a.bead_id!="string"||(typeof a.resumed_from=="string"&&a.resumed_from.length>0&&n.add(a.resumed_from),s.set(a.bead_id,a.attempt_id));let o=new Map;for(let a of r){if(!a||typeof a.bead_id!="string"||a.bead_id.length===0)continue;let l=null;if(a.status==="running")l="running";else if(a.status==="paused"&&!n.has(a.attempt_id))l="paused";else if(a.status==="failed"||a.status==="orphaned"){let _=t.get(a.bead_id),b=typeof _=="number"&&_>0&&typeof a.finished_at=="number"&&_>=a.finished_at;s.get(a.bead_id)===a.attempt_id&&!b&&typeof a.dismissed_at!="number"&&(l="failed")}if(!l)continue;let c=typeof a.started_at=="number"?a.started_at:null,u=o.get(a.bead_id);if(u){let _=uc[u.run_state],b=uc[l];if(_>b||_===b&&(u.started_at??0)>(c??0))continue}let f=typeof a.session_id=="string"&&a.session_id.length>0;o.set(a.bead_id,{attempt_id:typeof a.attempt_id=="string"?a.attempt_id:"",run_state:l,started_at:c,last_event_at:typeof a.last_event_at=="number"?a.last_event_at:null,runner:typeof a.runner=="string"?a.runner:null,model:typeof a.model=="string"?a.model:null,effort:typeof a.effort=="string"?a.effort:null,speed:typeof a.speed=="string"?a.speed:null,resumed_from:typeof a.resumed_from=="string"?a.resumed_from:null,continuation_mode:a.continuation_mode==="session"||a.continuation_mode==="fresh"?a.continuation_mode:null,usage:Ft(e,a.bead_id),can_pause:l==="running"&&f,can_resume:l!=="running"&&f&&!n.has(a.attempt_id)})}return o}function pc(e,t){let r=e[t];if(!r)return"";if(r.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let n=typeof r.reason=="string"?r.reason:"",s=n.indexOf(":");return s>0&&s<n.length-1?`\u26D4 ${n.slice(0,s)} (${n.slice(s+1)})`:`\u26D4 ${n}`}function Rt(e){return e&&typeof e=="object"?e:{}}function ea(e,t,r){let n=Array.isArray(e)?e:[],s=Array.isArray(t)?t:[],o=r&&typeof r.done_since=="number"?r.done_since:void 0,a=new Map;for(let A of s)A&&typeof A.root_dir=="string"&&a.set(A.root_dir,A);let l=[],c=[],u=[],f=[],_=[],b=new Map;for(let A of n){if(!A||typeof A.root_dir!="string")continue;let j=A.root_dir,ee=A.name||j,x=a.get(j),w=x&&typeof x.revision=="number"?x.revision:typeof A.revision=="number"?A.revision:0,S=Rt(A.attempts),H=Rt(A.bead_titles),Y=Rt(A.pr_observations),he=Rt(A.admission),le=Rt(A.revise_parked),se=Rt(A.merge_queue_state),de=Rt(A.cleanup_failed),Ne=Rt(A.discard_operations),Ue=Rt(A.pr_activity),Ge=Array.isArray(A.repo_operations)?A.repo_operations:[],ze=Array.isArray(A.merge_queue)?A.merge_queue:[],Ze=new Set(ze.filter(X=>X&&typeof X.bead_id=="string").map(X=>X.bead_id)),qe=new Map(ze.filter(X=>X&&typeof X.bead_id=="string").map(X=>[X.bead_id,X])),ke=Array.isArray(A.queue)?A.queue:[],we=Array.isArray(A.done)?A.done:[],xe=new Map;for(let X of we)X&&typeof X.bead_id=="string"&&typeof X.added_at=="number"&&xe.set(X.bead_id,X.added_at);let Ie=X=>({id:X,title:H[X]||X,root_dir:j,workspace_name:ee,expected_revision:w,draggable:!1}),_e=new Set;for(let[X,G]of l_(S,xe))_e.add(X),c.push({...Ie(X),lane:"running",attempt_id:G.attempt_id,run_state:G.run_state,can_pause:G.can_pause,can_resume:G.can_resume,started_at:G.started_at,last_event_at:G.last_event_at,runner:G.runner,model:G.model,effort:G.effort,speed:G.speed,resumed_from:G.resumed_from,continuation_mode:G.continuation_mode,usage:G.usage,discard:sr(Ne,X,{attempt_id:G.attempt_id}),badges:G.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:G.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:[],alert:G.run_state==="failed"});for(let X of Array.isArray(A.pr_wait)?A.pr_wait:[]){let G=X&&X.bead_id;if(typeof G!="string"||_e.has(G))continue;_e.add(G);let $e=Rt(Y[G]),pe=Rt($e.pr),ae=$e.gate?Rt($e.gate):null,U=Ze.has(G),B=qe.get(G)?.continuation_action||null,T=!!B&&B.continuation===null,z=se.active===G,R=X.external===!0,K=de[G]||null,Z=Rt(Ue[G]),ce=Ms({bead_id:G,merge_sha:X.merge_sha,cleanup_cursor:X.cleanup_cursor,merge_progress:Z.merge_progress||null,cleanup_failed:K,repo_operations:Ge}),fe=Ns(ce),be=!!ae&&ae.base_badge==="\uCDA9\uB3CC",C=!!K&&["child_sweep","branch_cleanup","parent_close"].includes(K.step)&&!!ae&&ae.tier==="merged",N=R&&!!K&&!!ae&&ae.tier==="merged",te=!!ae&&["closed_unmerged","review","undecidable"].includes(ae.tier),Q=sr(Ne,G,{external:R,merge_active:z||ce?.step==="merge",merge_queued:U,cleanup_active:fe,merged:!!K||ae?.tier==="merged"}),$=!!Q.operation;u.push({...Ie(G),lane:"pr_wait",pr_number:typeof pe.number=="number"?pe.number:null,pr_url:typeof pe.url=="string"?pe.url:void 0,external:R,usage:Ft(S,G),merge_step:ce,badges:T?["\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"]:ce?[ae?.tier==="merged"?"\uBA38\uC9C0\uB428":"\uBA38\uC9C0 \uC911"]:K?[Nr(K.step)?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${Nr(K.step)}`:"\uC815\uB9AC \uBA48\uCDA4"]:typeof ae?.gate_badge=="string"&&ae.gate_badge.length>0?[ae.gate_badge]:[],alert:ce?ce.failed===!0:!!K||te,reason:K&&ce?.active!==!0?Ds(K.step):"PR \uB300\uAE30",merge_action:ae?.tier==="merged"&&!C&&!N?!1:!U||T,merge_enabled:!$&&(T||ae?.enabled===!0||be||C||N),merge_label:T?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":N||C?"\uC815\uB9AC \uC7AC\uAC1C":be&&!C?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:T?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":$?Q.error?`\uD3D0\uAE30 \uC2E4\uD328: ${Q.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${Q.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:N?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":C?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":be?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":ae?.enabled===!0?`\uBA38\uC9C0 (${ae.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${ae?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:U&&!T,cancel_enabled:!z,continuation_mismatch:B?.mismatch||null,discard:Q,discard_action:Q.action,discard_enabled:Q.enabled,discard_title:Q.title})}for(let X=0;X<ke.length;X++){let G=ke[X],$e=G&&G.bead_id;if(typeof $e!="string"||_e.has($e))continue;_e.add($e);let pe=le[$e],ae=sr(Ne,$e),U=ae.operation?ae:null,B={...Ie($e),lane:"queue",draggable:!U,discard:U||void 0,reason:pc(he,$e),queue_position:X+1,queue_index:X,queue_length:ke.length,badges:pe?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!pe,revise_action:!!pe,revise_enabled:!!pe&&!U,revise_title:pe?pe.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${pe.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""};f.push(B);let T=b.get(j);T?T.push(B):b.set(j,[B])}for(let X of Array.isArray(A.runnable)?A.runnable:[]){let G=X&&X.bead_id;typeof G!="string"||_e.has(G)||(_e.add(G),l.push({...Ie(G),title:X.title||H[G]||G,lane:"runnable",draggable:!0,reason:pc(he,G),created_at:X.created_at??void 0,updated_at:X.updated_at??void 0,labels:Array.isArray(X.labels)?X.labels:[],spec_reviewer:typeof X.spec_reviewer=="string"?X.spec_reviewer:void 0,plan_state:X.plan_state==="approved"||X.plan_state==="authored"?X.plan_state:"none",workflow:X.route?{route:X.route,chips:{route:X.route}}:null,place_index:ke.length}))}for(let X of we){let G=X&&X.bead_id;if(typeof G!="string"||_e.has(G)||(_e.add(G),o!==void 0&&typeof X.added_at=="number"&&X.added_at<o))continue;let $e=i_(S,G);_.push({...Ie(G),lane:"done",done:!0,usage:Ft(S,G),done_at:typeof X.added_at=="number"?X.added_at:void 0,done_kind:$e&&typeof $e.done_kind=="string"?$e.done_kind:null})}}let E=new Map;s.forEach((A,j)=>{A&&typeof A.root_dir=="string"&&E.set(A.root_dir,j)});let k=r&&r.running_sort==="repo"?"repo":"started";c.sort((A,j)=>{if(k==="repo"){let w=E.get(A.root_dir)??Number.MAX_SAFE_INTEGER,S=E.get(j.root_dir)??Number.MAX_SAFE_INTEGER;if(w!==S)return w-S}let ee=typeof A.started_at=="number"&&Number.isFinite(A.started_at)?A.started_at:null,x=typeof j.started_at=="number"&&Number.isFinite(j.started_at)?j.started_at:null;return ee!==null&&x!==null&&ee!==x?ee-x:ee===null&&x!==null?1:ee!==null&&x===null?-1:A.id.localeCompare(j.id)}),_.sort((A,j)=>(j.done_at??0)-(A.done_at??0));let M=s.length>0?s:n.map(A=>({root_dir:A&&A.root_dir,name:A&&A.name,auto_advance:A&&A.auto_advance,auto_merge:A&&A.auto_merge,slots:A&&A.slots,revision:A&&A.revision,runner_catalog:A&&A.runner_catalog})),P=[];for(let A of M)!A||typeof A.root_dir!="string"||P.push({root_dir:A.root_dir,name:A.name||A.root_dir,auto_advance:A.auto_advance===!0,auto_merge:A.auto_merge===!0,slots:typeof A.slots=="number"&&A.slots>=En?A.slots:En,revision:typeof A.revision=="number"?A.revision:0,runner_catalog:Rt(A.runner_catalog),items:b.get(A.root_dir)||[]});return{runnable:l,queue:f,queue_groups:P,running:c,pr_wait:u,done:_,automation:{total:P.length,both_on:P.filter(A=>A.auto_advance&&A.auto_merge).length}}}function c_(e,t){if(typeof e!="number"||!Number.isFinite(e))return"";let n=t-e<s_;return i`<span
    class="mon-beat${n?" mon-beat--live":""}"
    title=${`\uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${mt(e)}`}
    ><span class="mon-beat__dot" aria-hidden="true"></span>${n?"":i`<span class="mon-beat__age"
          >${Ot(e,t)}</span
        >`}</span
  >`}function Tn(e){return i`<div class="mon-c__title">${e.title}</div>`}function Cn(e){return i`<span class="mon-c__id" title="클릭하면 상세로 이동"
    >${e.id}</span
  >`}function qs(e){return e.workspace_name?i`<span class="mon-c__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:""}function ta(e){let t=bt(e.usage),r=Ht(e.usage);return t.length>0?t.map(n=>i`<span class="mon-c__usage" title=${n.tooltip}
          >${n.label}</span
        >`):r?i`<span class="mon-c__usage" title=${Yr(e.usage)}
        >${r}</span
      >`:""}function ra(e){return(Array.isArray(e.badges)?e.badges:[]).map(r=>i`<span class="mon-c__badge${e.alert?" mon-c__badge--alert":""}"
        >${r}</span
      >`)}function d_(e){return i`<span class="mon-c__ops">
    ${e.run_state==="running"?i`<button
          type="button"
          class="mon-op mon-op--pause"
          ?disabled=${e.can_pause===!1}
          aria-label="일시정지"
          title="일시정지 — 세션을 끊고 이어하기 가능 상태로 둡니다"
        >
          ${Jo()}
        </button>`:i`<button
          type="button"
          class="mon-op mon-op--resume"
          ?disabled=${e.can_resume===!1}
          aria-label="이어하기"
          title="이어하기"
        >
          ${Qo()}
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
          ${ic()}
        </button>`:""}
  </span>`}function u_(e,t){let r=typeof e.started_at=="number"?Zo(t-e.started_at):"";return i`${Tn(e)}
    <div class="mon-c__meta">
      ${ra(e)}${c_(e.last_event_at,t)}${Cn(e)}${qs(e)}
      ${rr(e)?i`<span class="mon-c__model">${rr(e)}</span>`:""}
      ${yr(e)?i`<span
            class="rtile__resumed"
            title=${yr(e)}
            >↻</span
          >`:""}
      ${r?i`<span class="mon-live__elapsed">${r}</span>`:""}
      ${ta(e)}${d_(e)}${mr(e)}
    </div>`}function p_(e){let t=e.workflow,n=(t&&t.chips||{}).route||t&&t.route,s=typeof e.spec_reviewer=="string"?e.spec_reviewer:"",o=e.plan_state==="approved"?"plan \u2713":e.plan_state==="authored"?"plan \u270E":"plan \u2013",a=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),l=Ot(e.updated_at);return i`${Tn(e)}
    <div class="mon-c__meta">
      <span class="mon-c__grip" aria-hidden="true">⠿</span>${Cn(e)}
      ${n?i`<span class="ctl-chip ctl-chip--route">${n}</span>`:""}
      ${s?i`<span
            class="ctl-chip mon-c__review${s==="skipped"?" mon-c__review--dim":""}"
            >spec:${s}</span
          >`:""}
      ${n==="full_plan"?i`<span
            class="ctl-chip mon-c__plan${e.plan_state==="none"?" mon-c__review--dim":""}"
            >${o}</span
          >`:""}
      ${Qn(e.labels,null).map(c=>i`<span class="ctl-chip ctl-chip--label">${c}</span>`)}
      ${qs(e)}
      ${l?i`<span title=${`\uC218\uC815 ${mt(e.updated_at)}`}
            >수정 ${l}</span
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
    </div>`}function f_(e){let t=!!e.discard?.operation;return i`${Tn(e)}
    <div class="mon-c__meta">
      <span class="mon-c__grip" aria-hidden="true">⠿</span>
      <span class="mon-live__pos">#${e.queue_position}</span>${Cn(e)}
      ${ra(e)}
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
    ${mr(e)}
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
        </div>`:""}`}function __(e){let t=e.merge_step||null,r=!!(Ht(e.usage)||t||e.merge_action||e.cancel_action||e.discard_action);return i`${Tn(e)}
    <div class="mon-c__meta">
      ${Cn(e)}${qs(e)}
      ${e.pr_url&&e.pr_number?i`<a
            class="mon-c__pr"
            href=${e.pr_url}
            target="_blank"
            rel="noreferrer noopener"
            title="PR 열기"
            >#${e.pr_number} ↗</a
          >`:""}
      ${ra(e)}
      ${e.reason?i`<span class="mon-c__reason">${e.reason}</span>`:""}
    </div>
    ${r?i`<div class="mon-c__tail">
          ${ta(e)}${t?i`<span
                class="merge-step${t.failed?" merge-step--failed":""}"
                style=${`--progress: ${t.percent}%`}
                >${t.label}${t.index>0?i`<span class="merge-step__n"
                      >${t.index}/${t.total}</span
                    >`:""}</span
              >`:""}
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
          ${mr(e)}
        </div>`:""}`}function m_(e,t){let r=e.done_kind||"",n=r?o_[r]||r:"",s=Ot(e.done_at,t);return i`${Tn(e)}
    <div class="mon-c__meta">
      ${Cn(e)}${qs(e)}
      ${n?i`<span
            class="mon-live__kind${a_.has(r)?" mon-live__kind--ok":" mon-live__kind--warn"}"
            >${n}</span
          >`:""}
      ${ta(e)}
      ${s?i`<span title=${`\uC644\uB8CC ${mt(e.done_at)}`}
            >완료 ${s}</span
          >`:""}
    </div>`}function fc(e,t){return e.lane==="running"?u_(e,t):e.lane==="runnable"?p_(e):e.lane==="queue"?f_(e):e.lane==="pr_wait"?__(e):m_(e,t)}function _c(e){let t=String(e.revision);return i`<header
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
        ${e.auto_advance?Jo():Qo()}
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
        ${lc()}
        <span class="mon-ctl__label">머지</span>
      </button>
      <label class="mon-ctl mon-ctl--slots" title="동시에 실행할 세션 수">
        ${cc()}
        <span class="mon-ctl__label">슬롯</span>
        <input
          type="number"
          class="mon-slots__input"
          min=${En}
          step="1"
          data-root-dir=${e.root_dir}
          data-revision=${t}
          aria-label=${`${e.name} \uB3D9\uC2DC \uC2E4\uD589 \uC2AC\uB86F`}
          .value=${String(e.slots)}
        />
      </label>
    </span>
  </header>`}function mc(e){let{total:t,both_on:r}=e.automation,n=t>0&&r===t,s=e.running_sort==="repo"?"repo":"started",o=tr.find(l=>l.value===e.done_range)?.label||"",a=Array.isArray(e.token_total)?e.token_total:e.token_total?[{label:e.token_total,tooltip:e.token_tooltip}]:[];return i`<div class="mon-top">
    <button
      type="button"
      class="mon-auto-all${n?" is-active":""}"
      data-on=${n?"false":"true"}
      aria-pressed=${n?"true":"false"}
      ?disabled=${t===0}
      title=${n?"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uB055\uB2C8\uB2E4 (\uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4)":"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uCF2D\uB2C8\uB2E4"}
    >
      ${n?ac():dc()}
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
        ${tr.map(l=>i`<option
              value=${l.value}
              ?selected=${e.done_range===l.value}
            >
              ${l.label}
            </option>`)}
      </select>
      ${a.map(l=>i`<span
            class="mon-kpi__chip mon-kpi__chip--tokens"
            title=${l.tooltip}
            >${o} 완료 · 누적 ${l.label}</span
          >`)}
    </div>
  </div>`}function gc(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function bc(e){let t=(Array.isArray(e)?e:[]).map(l=>l&&l.usage).filter(l=>l&&typeof l=="object"&&"providers"in l);if(t.length>0)return bt(ns(t));let r={};for(let l of cr)r[l]=0;let n=!1,s=0,o=0,a=0;for(let l of Array.isArray(e)?e:[]){let c=l&&l.usage;if(c&&typeof c=="object"){let u=!1;for(let f of cr){let _=c[f];typeof _=="number"&&Number.isFinite(_)&&(r[f]+=_,n=!0,u=!0)}if(u){o+=1;let f=c.total_cost_usd;typeof f=="number"&&Number.isFinite(f)&&(s+=f,a+=1)}}}return o>0&&a===o&&(r.total_cost_usd=s),n?Ht(r):null}var yc="bdui.monitor.done-range",vc="bdui.monitor.running_sort";function g_(){try{let e=window.localStorage.getItem(yc);return Nt(e)?e:Lt}catch{return Lt}}function b_(e){try{window.localStorage.setItem(yc,e)}catch{}}function h_(){try{return window.localStorage.getItem(vc)==="repo"?"repo":"started"}catch{return"started"}}function y_(e){try{window.localStorage.setItem(vc,e)}catch{}}var wc="tab:monitor:pipeline",v_=1e3,w_=[{lane:"runnable",pane:"candidate",title:"\uC2E4\uD589\uAC00\uB2A5",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589\uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}];function hc(e,t){let r=(e.lane==="runnable"||e.lane==="queue")&&e.draggable!==!1;return i`<div
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
    ${fc(e,t)}
  </div>`}function kc(e,t){let r=at("views:monitor"),n=t.gotoIssue,s=t.pipelineStore,o=t.transport,a=t.getWorkspacePath,l=t.switchWorkspace,c=t.now||(()=>Date.now()),u=t.confirm||(T=>typeof globalThis.confirm!="function"||globalThis.confirm(T)),f=g_(),_=h_();function b(){let T=tr.find(z=>z.value===f);return T?T.label:""}let E=document.createElement("div");E.className="mon",e.appendChild(E);let k=ea(null,null),M=new Map,P=null,A=null;async function j(T,z,R,K,Z=!0){if(!o||!R)return null;let ce=await o(T,{...z,root_dir:R,expected_revision:K});if(ce&&ce.conflict&&Z){ce.queue&&M.set(R,ce.queue);let fe=ce.queue&&typeof ce.queue.revision=="number"?ce.queue.revision:K;ce=await o(T,{...z,root_dir:R,expected_revision:fe})}return ce&&ce.queue&&R&&M.set(R,ce.queue),ce}function ee(T,z){let R=M.get(T),K=s&&s.get?s.get():null,Z=(Array.isArray(K)?K:[]).find(fe=>fe?.root_dir===T);return(R||Z)?.merge_queue?.find(fe=>fe.bead_id===z)?.continuation_action}async function x(T,z,R,K){let Z=await j(T,z,R,K),ce=M.get(R)?.revision??Z?.queue?.revision??K;return lr(Z,(fe,be)=>j(T,{...z,continuation:fe,decision_token:be},R,ce,!1),{refresh:fe=>j(T,z,R,fe?.queue?.revision??M.get(R)?.revision??ce,!1)})}async function w(T,z,R,K){let Z=await lr({continuation_mismatch:K},(fe,be)=>j("worker-merge-queue-add",{bead_id:z,continuation:fe,decision_token:be},T,R,!1)),ce=Z?.queue?.merge_queue?.find(fe=>fe.bead_id===z)?.continuation_action;Z?.applied!==!0&&ce?.continuation===null&&ce.mismatch&&await w(T,z,Z.queue.revision,ce.mismatch)}async function S(T,z,R){let K=await j("worker-discard",T,z,R);if(K&&K.discarded===!0){ie(Os(K),"success",5e3);return}if(K&&K.reason){ie(`\uD3D0\uAE30 \uC2E4\uD328: ${K.reason}`,"error");return}if(K&&K.accepted&&K.pending==="merged_revert"){ie("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if(K&&K.accepted){ie(`\uD3D0\uAE30 \uC9C4\uD589: ${K.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}K&&!K.conflict&&ie("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function H(T,z,R){return!o||!R?null:await o(T,{...z,root_dir:R})}async function Y(T){if(!o||!T&&!u("\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB055\uB2C8\uB2E4. \uAC01 \uB808\uD3EC\uC758 \uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uD568\uAED8 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?"))return;let z=await o("monitor-auto-toggle",{on:T}),R=z&&Array.isArray(z.failed)?z.failed:[];R.length>0&&ie(`\uC790\uB3D9\uD654 ${T?"\uCF1C\uAE30":"\uB044\uAE30"} \uC77C\uBD80 \uC2E4\uD328: ${R.map(K=>K.root_dir).join(", ")}`,"error",3200)}async function he(){let T=new Map;for(let z of k.pr_wait)T.has(z.root_dir)||T.set(z.root_dir,z.expected_revision);for(let[z,R]of T)await j("worker-merge-queue-add-all",{},z,R)}let le=null,se=!1,de=null;function Ne(){de!==null&&clearTimeout(de),de=setTimeout(()=>{de=null,se=!1},0)}function Ue(T){let z=T.target;return typeof z?.closest=="function"?z.closest(".mon-group"):null}function Ge(T){let z=Ue(T);return!z||!le?null:(z.getAttribute("data-root-dir")||"")===le.root_dir?z:null}function ze(){for(let T of Array.from(E.querySelectorAll(".mon-group--drag-over")))T.classList.remove("mon-group--drag-over")}function Ze(T){let z=T.target,R=typeof z?.closest=="function"?z.closest('.mon-card[draggable="true"]'):null;if(R){le={bead_id:R.getAttribute("data-issue-id")||"",lane:R.getAttribute("data-lane")||"",root_dir:R.getAttribute("data-root-dir")||"",revision:Number(R.getAttribute("data-revision")||0)||0,queue_index:Number(R.getAttribute("data-queue-index")),queue_length:Number(R.getAttribute("data-queue-length")),place_index:Number(R.getAttribute("data-place-index"))},se=!0;try{T.dataTransfer?.setData("text/plain",le.bead_id),T.dataTransfer&&(T.dataTransfer.effectAllowed="move")}catch{}}}function qe(T){let z=Ge(T);z&&(T.preventDefault(),T.dataTransfer&&(T.dataTransfer.dropEffect="move"),z.classList.add("mon-group--drag-over"))}function ke(T){Ue(T)?.classList.remove("mon-group--drag-over")}function we(){le=null,ze(),Ne()}function xe(T){let z=Ge(T),R=le;if(le=null,ze(),!z||!R||!R.bead_id)return;T.preventDefault();let K=T.target,Z=typeof K?.closest=="function"?K.closest('.mon-card[data-lane="queue"]'):null,ce=Z&&z.contains(Z)?Number(Z.getAttribute("data-queue-index")):NaN;if(R.lane==="runnable"){let C=Number.isFinite(ce)?ce:R.place_index;if(!Number.isFinite(C))return;j("worker-queue-place",{bead_id:R.bead_id,index:C},R.root_dir,R.revision);return}if(R.lane!=="queue"||Z&&Z.getAttribute("data-issue-id")===R.bead_id)return;let fe=R.queue_index,be=Number.isFinite(ce)?fe>ce?ce:ce-1:R.queue_length-1;!Number.isFinite(be)||be<0||be===fe||j("worker-queue-reorder",{bead_id:R.bead_id,to_index:be},R.root_dir,R.revision)}function Ie(T){let z={runnable:k.runnable,queue:k.queue,running:k.running,pr_wait:k.pr_wait,done:k.done};return i`${mc({automation:k.automation,counts:{running:k.running.length,queue:k.queue.length,pr_wait:k.pr_wait.length},running_sort:_,done_range:f,token_total:bc(k.done),token_tooltip:gc(b())})}
      <div class="worker-lanes mon-lanes">
        ${w_.map(R=>{let K=z[R.lane],Z=R.lane==="queue"?k.queue_groups.length>0?i`${k.queue_groups.map(ce=>i`<div
                        class="mon-group"
                        data-root-dir=${ce.root_dir}
                      >
                        ${_c(ce)}
                        <div class="mon-group__list">
                          ${ce.items.map(fe=>hc(fe,T))}
                        </div>
                      </div>`)}`:void 0:K.length>0?i`${K.map(ce=>hc(ce,T))}`:void 0;return Kt({id:`monitor-${R.lane}`,lane:R.pane,title:R.lane==="done"?`\uC644\uB8CC\xB7${b()}`:R.title,items:K,empty:R.empty,body:Z,live:R.lane==="running"&&K.length>0,header_control:R.lane==="pr_wait"&&K.length>0?i`<button
                    type="button"
                    class="mon-lane-op mon-merge-all"
                    title="자격이 생기는 PR을 각 레포의 머지 큐에 한 번에 넣습니다"
                  >
                    일괄 머지
                  </button>`:""})})}
      </div>`}function _e(){let T=s&&s.get?s.get():null,z=s&&s.getWorkspacesState?s.getWorkspacesState():[],R=c();k=ea(T,z,{done_since:Rr(f,R),running_sort:_}),je(Ie(R),E)}function X(T,z){let R=a?a():void 0;if(!z||!R||z===R||!l){n(T);return}l(z).then(()=>{n(T)}).catch(K=>{r("workspace switch for %s failed: %o",z,K)})}function G(T){return{root_dir:T.getAttribute("data-root-dir")||"",revision:Number(T.getAttribute("data-revision")||0)||0}}function $e(T,z){let{root_dir:R,revision:K}=G(T),Z=T.getAttribute("data-issue-id")||"",ce=z.dataset.attemptId||T.getAttribute("data-attempt-id")||"",fe=z.classList;if(fe.contains("worker-card__place")){j("worker-queue-place",{bead_id:Z,index:Number(T.getAttribute("data-place-index")||0)||0},R,K);return}if(fe.contains("mon-op--up")||fe.contains("mon-op--down")){let be=Number(T.getAttribute("data-queue-index")||0)||0,C=fe.contains("mon-op--up")?be-1:be+1;if(C<0)return;j("worker-queue-reorder",{bead_id:Z,to_index:C},R,K);return}if(fe.contains("mon-op--remove")){j("worker-queue-remove",{bead_id:Z},R,K);return}if(fe.contains("mon-op--pause")){H("worker-attempt-pause",{attempt_id:ce},R);return}if(fe.contains("mon-op--discard")){if(!u(xn(Z,"unmerged")))return;S({bead_id:Z,...ce?{attempt_id:ce}:{},...z.dataset.operationId?{operation_id:z.dataset.operationId}:{}},R,K);return}if(fe.contains("mon-op--resume")){Gr().then(be=>{if(be!==null)return x("worker-attempt-resume",{attempt_id:ce,...be!==""?{instructions:be}:{}},R,K)});return}if(fe.contains("mon-op--dismiss")){j("worker-attempt-dismiss",{attempt_id:ce},R,K);return}if(fe.contains("worker-mini__merge")){let be=ee(R,Z);be?.mismatch&&be.continuation===null?w(R,Z,K,be.mismatch):j("worker-merge-queue-add",{bead_id:Z},R,K);return}if(fe.contains("worker-mini__merge-cancel")){j("worker-merge-queue-remove",{bead_id:Z},R,K);return}if(fe.contains("worker-mini__discard")){let be=z.dataset.discardMode==="merged"?"merged":"unmerged";if(!u(xn(Z,be)))return;S({bead_id:Z,...ce?{attempt_id:ce}:{},...z.dataset.operationId?{operation_id:z.dataset.operationId}:{}},R,K);return}if(fe.contains("worker-mini__revise-fix")){x("worker-revise-fix",{bead_id:Z},R,K);return}fe.contains("worker-mini__revise-approve")&&j("worker-revise-approve",{bead_id:Z},R,K)}function pe(T){let z=se;se=!1;let R=T.target;if(!R||typeof R.closest!="function"||R.closest("dialog")||R.closest("a"))return;let K=R.closest(".mon-running-sort");if(K){T.preventDefault(),_=K.getAttribute("data-sort")==="repo"?"repo":"started",y_(_),_e();return}let Z=R.closest(".mon-auto-all");if(Z){T.preventDefault(),Y(Z.getAttribute("data-on")==="true");return}if(R.closest(".mon-merge-all")){T.preventDefault(),he();return}let fe=R.closest(".mon-ctl--advance");if(fe){T.preventDefault();let{root_dir:Q,revision:$}=G(fe);j("worker-automation-toggle",{on:fe.getAttribute("data-on")==="true"},Q,$);return}let be=R.closest(".mon-ctl--merge-auto");if(be){T.preventDefault();let{root_dir:Q,revision:$}=G(be);j("worker-merge-auto-toggle",{on:be.getAttribute("data-on")==="true"},Q,$);return}let C=R.closest(".mon-card");if(!C)return;let N=R.closest("button");if(N){T.preventDefault(),$e(C,N);return}let te=C.getAttribute("data-issue-id");te&&!z&&(T.preventDefault(),X(te,C.getAttribute("data-root-dir")||""))}function ae(T){let z=T.target;if(!z||typeof z.closest!="function")return;let R=z.closest(".mon-done-range");if(R){f=Nt(R.value)?R.value:Lt,b_(f),_e();return}let K=z.closest(".mon-slots__input");if(!K)return;let{root_dir:Z,revision:ce}=G(K),fe=Number(K.value);if(!Number.isFinite(fe))return;let be=Math.max(En,Math.floor(fe));j("worker-queue-set-slots",{slots:be},Z,ce)}e.addEventListener("click",pe),e.addEventListener("change",ae),e.addEventListener("dragstart",Ze),e.addEventListener("dragover",qe),e.addEventListener("dragleave",ke),e.addEventListener("drop",xe),e.addEventListener("dragend",we),s&&typeof s.subscribe=="function"&&(P=s.subscribe(()=>{try{M.clear(),_e()}catch{}}));function U(){A!==null&&(clearInterval(A),A=null)}function B(){de!==null&&(clearTimeout(de),de=null)}return{load(){r("load"),_e(),A===null&&(A=setInterval(()=>{try{_e()}catch{}},v_))},pause(){U()},clear(){U(),B(),P&&(P(),P=null),e.removeEventListener("click",pe),e.removeEventListener("change",ae),e.removeEventListener("dragstart",Ze),e.removeEventListener("dragover",qe),e.removeEventListener("dragleave",ke),e.removeEventListener("drop",xe),e.removeEventListener("dragend",we),e.replaceChildren()}}}function $c(e,t,r){let n=at("views:nav"),s=null;function o(c){return u=>{u.preventDefault(),n("click tab %s",c),r.gotoView(c)}}function a(){let c=t.getState(),u=c.view==="worker"||c.view==="monitor"?c.view:"board";return i`
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
    `}function l(){je(a(),e)}return l(),s=t.subscribe(()=>l()),{destroy(){s&&(s(),s=null),je(i``,e)}}}var xc=["bug","feature","task","epic","chore"];function Sc(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var Ac=["Critical","High","Medium","Low","Backlog"];function Ec(e,t){let r=document.createElement("dialog");r.id="new-issue-dialog",r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true"),r.innerHTML=`
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
  `,e.appendChild(r);let n=r.querySelector("#new-issue-form"),s=r.querySelector("#new-title"),o=r.querySelector("#new-type"),a=r.querySelector("#new-priority"),l=r.querySelector("#new-labels"),c=r.querySelector("#new-description"),u=r.querySelector("#new-issue-error"),f=r.querySelector("#btn-cancel"),_=r.querySelector("#btn-create"),b=r.querySelector(".new-issue__close");function E(){o.replaceChildren();let w=document.createElement("option");w.value="",w.textContent="\u2014 Select \u2014",o.appendChild(w);for(let S of xc){let H=document.createElement("option");H.value=S,H.textContent=Sc(S),o.appendChild(H)}a.replaceChildren();for(let S=0;S<=4;S+=1){let H=document.createElement("option");H.value=String(S);let Y=Ac[S]||"Medium";H.textContent=`${S} \u2013 ${Y}`,a.appendChild(H)}}E();function k(){try{typeof r.close=="function"?r.close():r.removeAttribute("open")}catch{r.removeAttribute("open")}}function M(w){s.disabled=w,o.disabled=w,a.disabled=w,l.disabled=w,c.disabled=w,f.disabled=w,_.disabled=w,_.textContent=w?"Creating\u2026":"Create"}function P(){u.textContent=""}function A(w){u.textContent=w}function j(){try{let w=window.localStorage.getItem("beads-ui.new.type");w?o.value=w:o.value="";let S=window.localStorage.getItem("beads-ui.new.priority");S&&/^\d$/.test(S)?a.value=S:a.value="2"}catch{o.value="",a.value="2"}}function ee(){let w=o.value||"",S=a.value||"";w.length>0&&window.localStorage.setItem("beads-ui.new.type",w),S.length>0&&window.localStorage.setItem("beads-ui.new.priority",S)}async function x(){P();let w=String(s.value||"").trim();if(w.length===0){A("Title is required"),s.focus();return}let S=Number(a.value||"2");if(!(S>=0&&S<=4)){A("Priority must be 0..4"),a.focus();return}let H=String(o.value||""),Y=String(c.value||""),he={title:w};H.length>0&&(he.type=H),String(S).length>0&&(he.priority=S),Y.length>0&&(he.description=Y),M(!0);try{await t("create-issue",he)}catch{M(!1),A("Failed to create issue");return}ee(),M(!1),k()}return r.addEventListener("cancel",w=>{w.preventDefault(),k()}),b.addEventListener("click",()=>k()),f.addEventListener("click",()=>k()),r.addEventListener("keydown",w=>{w.key==="Enter"&&(w.ctrlKey||w.metaKey)&&(w.preventDefault(),x())}),n.addEventListener("submit",w=>{w.preventDefault(),x()}),{open(){n.reset(),P(),j();try{"showModal"in r&&typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")}catch{r.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){k()}}}var k_=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function $_(e,t){return co(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function Tc(e,t,r){return i`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">라벨 표시</div>
      <p class="settings-dialog__hint-block">
        라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을 누르면
        그 라벨만 예외로 다시 표시됩니다.
      </p>
      ${t.length===0?i`<div class="settings-dialog__empty">라벨 없음</div>`:i`<div class="settings-dialog__pills">
            ${t.map(n=>{let s=$_(n,e);return i`<button
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
  `}function Cc(e,t,r){return i`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">숨김 prefix</div>
      <div class="settings-dialog__prefixes">
        ${e.hidden_prefixes.map(n=>i`<span class="settings-dialog__prefix">
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
  `}function Rc(e,t){return i`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">카드 표시 요소</div>
      <div class="settings-dialog__toggles">
        ${k_.map(([r,n])=>i`<label class="settings-dialog__toggle">
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
  `}var x_=[{id:"session",label:"\uC138\uC158",glyph:"\u25C6"},{id:"worker",label:"Worker",glyph:"\u25A4"},{id:"display",label:"\uD45C\uC2DC",glyph:"\u25EB"}],Zt="";function Xt(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Ic(e,t){let{transport:r,policyStore:n,labelOptions:s}=t,o=t.notify||($=>ie($,"error",4e3)),a=document.createElement("dialog");a.id="settings-dialog",a.className="settings-dialog",a.setAttribute("role","dialog"),a.setAttribute("aria-modal","true"),a.setAttribute("aria-label","\uC124\uC815"),e.appendChild(a);let l="session",c=!1,u="",f={},_={},b=[],E=!1,k=null,M={},P="",A="",j=!1,ee=!1,x=!1,w=null;function S(){let $=t.queueStore?.get();return Xt($)?$.runner_catalog:null}function H(){let $=t.implPresetStore?.get();return Xt($)&&Array.isArray($.presets)?$:null}async function Y(){E=!0,Z();try{let $=await r("get-session-defaults",{});f=Xt($?.values)?{...$.values}:{},_={...f},b=Array.isArray($?.warnings)?$.warnings:[]}catch($){b=["kv_read_failed"],o(`\uC138\uC158 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${$ instanceof Error?$.message:String($)}`)}finally{E=!1,Z()}}async function he(){let $=Tl(f,_);if(Object.keys($).length!==0){try{let D=await r("set-session-defaults",{values:$});f=Xt(D?.values)?{...D.values}:{},_={...f},b=Array.isArray(D?.warnings)?D.warnings:[]}catch(D){o(`\uC138\uC158 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${D instanceof Error?D.message:String(D)}`)}Z()}}function le($,D){D===Zt?delete _[$]:_[$]=D,Z(),he()}async function se(){let $=t.queueStore?.get();if(!Xt($))return;let D={orchestration_model:$.orchestration_model??null,orchestration_effort:$.orchestration_effort??null,orchestration_speed:$.orchestration_speed??null},V=Cl(D,{...D,...M});if(Object.keys(V).length!==0){try{let Le=await r("worker-queue-set-orchestration-defaults",{expected_revision:$.revision,values:V});if(Le&&Le.applied===!1){o("Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC");return}M={}}catch(Le){o(`Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${Le instanceof Error?Le.message:String(Le)}`)}Z()}}function de($,D){M[$]=D===Zt?null:D,Z(),se()}async function Ne($){let D=t.queueStore?.get();if(!(!Xt(D)||$<1)){try{await r("worker-queue-set-slots",{expected_revision:D.revision,slots:$})}catch(V){o(`slots \uC800\uC7A5 \uC2E4\uD328: ${V instanceof Error?V.message:String(V)}`)}Z()}}function Ue(){let $={};for(let D of Sl){let V=_[D];typeof V=="string"&&V.length>0&&($[D]=V)}return $}async function Ge(){let $=H();if(!$)return;let D=Ue();if(Object.keys(D).length===0){o("\uC800\uC7A5\uD560 \uAD6C\uD604 \uAC12\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uBA3C\uC800 \uAD6C\uD604 \uADF8\uB8F9\uC744 \uC120\uD0DD\uD558\uC138\uC694");return}let V=($.presets||[]).find(Re=>Re.id===P),Le=A.trim()||(V?V.name:"");if(!Le){o("\uD504\uB9AC\uC14B \uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694");return}try{let Re=V?await r("impl-preset-update",{expected_revision:$.revision,id:V.id,name:Le,settings:D}):await r("impl-preset-create",{expected_revision:$.revision,name:Le,settings:D});if(Re&&Re.applied){if(A="",!V&&Array.isArray(Re.presets)){let Fe=Re.presets.find(Ce=>Ce.name===Le);P=Fe?Fe.id:P}Z()}else o("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),Z()}catch(Re){o(`\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: ${Re instanceof Error?Re.message:String(Re)}`)}}async function ze(){let $=H();if(!(!$||P.length===0))try{let D=await r("impl-preset-delete",{expected_revision:$.revision,id:P});D&&D.applied?(P="",Z()):(o("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),Z())}catch(D){o(`\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: ${D instanceof Error?D.message:String(D)}`)}}async function Ze(){let $=H();if(!(!$||P.length===0)){try{let D=await r("apply-impl-preset-global",{preset_id:P,expected_revision:$.revision});D&&D.applied?(f=Xt(D.values)?{...D.values}:{},_={...f},b=Array.isArray(D.warnings)?D.warnings:[]):D&&D.conflict&&o("\uAD6C\uD604 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: \uD504\uB9AC\uC14B\uC774 \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4")}catch(D){o(`\uAD6C\uD604 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: ${D instanceof Error?D.message:String(D)}`)}Z()}}async function qe(){ee=!0,x=!1,Z();try{let $=await r("get-worker-system-prompt",{});!$||typeof $!="object"||Array.isArray($)?x=!0:w=$}catch{x=!0}finally{ee=!1,Z()}}function ke(){if(j=!j,j&&!w){qe();return}Z()}function we(){let $=Zr({loading:ee,error:x});if($)return $;if(!w)return"";let D=Array.isArray(w.variants)?w.variants:[];return i`<div class="settings-dialog__sp-body">
      ${w.target_base_placeholder?i`<div class="prompt-block__meta">
            \`${w.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${D.map(V=>i`<div class="settings-dialog__sp-variant" data-variant=${V.key}>
            <div class="settings-dialog__sp-cond">${V.condition}</div>
            ${fr(V.label,V.system_prompt)}
          </div>`)}
    </div>`}function xe(){return i`<section
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
        aria-expanded=${j?"true":"false"}
        @click=${ke}
      >
        ${j?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
      </button>
      ${j?we():""}
    </section>`}function Ie($,D,V,Le,Re,Fe){let Ce=Re[$]??Zt;return i`<select
      class=${Ce===Zt?"settings-dialog__unset":""}
      data-key=${$}
      aria-label=${D}
      ?disabled=${Fe===!0}
      .value=${Mr(String(Ce))}
      @change=${et=>Le($,String(et.target.value))}
    >
      <option value=${Zt} ?selected=${Ce===Zt}>(기본)</option>
      ${V.map(et=>i`<option value=${et} ?selected=${et===Ce}>
            ${et===Bt?"\uC790\uB3D9":et}
          </option>`)}
    </select>`}function _e($,D,V,Le,Re,Fe=!1){return i`<div
      class=${`settings-dialog__row${Fe?" settings-dialog__row--off":""}`}
    >
      <span class="settings-dialog__row-label">${D}</span>
      <span class="settings-dialog__controls">
        ${Ie($,D,V,Le,Re,Fe)}
      </span>
    </div>`}function X($,D,V,Le,Re){return i`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">
        <i
          class="settings-dialog__stage-dot"
          style=${`background: var(--stage-${D}-on)`}
        ></i>
        ${$}
      </span>
      <span class="settings-dialog__controls">
        ${Ie(V,`${$} \uBAA8\uB378`,Le,le,_,!1)}
        ${Ie(Re,`${$} effort`,xs,le,_,!1)}
      </span>
    </div>`}function G(){let $=S(),D=El(_),V=_.impl_runtime,Le=_.impl_model,Re=H();return i`
      <section
        class=${`settings-dialog__pane${l==="session"?" settings-dialog__pane--active":""}`}
        role="tabpanel"
        id="settings-pane-session"
        aria-label="세션 기본값"
      >
        <header class="settings-dialog__pane-head"><h2>세션 기본값</h2></header>
        <p class="settings-dialog__pane-sub">
          모든 세션(터미널 대화형 포함)이 따르는 전역 기본값입니다. 이슈에 핀이
          있으면 핀이 우선합니다.
        </p>
        ${b.length>0?i`<div class="settings-dialog__banner" role="alert">
              워크스페이스 기본값을 일부 읽지 못했습니다 —
              ${b.join(", ")}
            </div>`:""}
        ${E?i`<div class="settings-dialog__empty">불러오는 중…</div>`:i`
              <div class="settings-dialog__group">
                <div class="settings-dialog__group-title">워크플로우</div>
                <div class="settings-dialog__row">
                  <span class="settings-dialog__row-label">모드</span>
                  <span class="settings-dialog__controls">
                    <span class="settings-dialog__seg" role="group">
                      <button
                        type="button"
                        data-mode=${Zt}
                        aria-pressed=${String(!_.workflow_mode)}
                        @click=${()=>le("workflow_mode",Zt)}
                      >
                        (기본)
                      </button>
                      ${ks.map(Fe=>i`<button
                            type="button"
                            data-mode=${Fe}
                            aria-pressed=${String(_.workflow_mode===Fe)}
                            @click=${()=>le("workflow_mode",Fe)}
                          >
                            ${Fe}
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
                ${X("\uC0AC\uC591 \uB9AC\uBDF0","spec","spec_review_model",kn,"spec_review_effort")}
                ${X("\uACC4\uD68D \uB9AC\uBDF0","plan","plan_review_model",$s,"plan_review_effort")}
                ${X("\uAD6C\uD604 \uB9AC\uBDF0","impl","impl_review_model",kn,"impl_review_effort")}
              </div>

              <div class="settings-dialog__group">
                <div class="settings-dialog__group-title">
                  구현
                  <span class="settings-dialog__hint"
                    >이슈 핀이 있으면 핀이 우선합니다</span
                  >
                </div>
                ${_e("impl_dispatch","\uC2E4\uD589 \uBC29\uC2DD",vs,le,_)}
                ${_e("impl_runtime","\uC704\uC784 \uB300\uC0C1",ws,le,_,D)}
                ${_e("impl_model","\uBAA8\uB378",Ss($,V),le,_,D)}
                ${_e("impl_effort","effort",Xr($,V,Le),le,_,D)}
                ${_e("impl_speed","\uC18D\uB3C4",wn,le,_,D)}
              </div>

              <div class="settings-dialog__preset-bar">
                <select
                  aria-label="구현 프리셋"
                  .value=${Mr(P)}
                  @change=${Fe=>{P=String(Fe.target.value),Z()}}
                >
                  <option value="" ?selected=${P===""}>
                    구현 프리셋…
                  </option>
                  ${(Re?.presets||[]).map(Fe=>i`<option
                        value=${Fe.id}
                        ?selected=${Fe.id===P}
                      >
                        ${Fe.name}
                      </option>`)}
                </select>
                <button
                  type="button"
                  class="settings-dialog__btn settings-dialog__btn--primary"
                  ?disabled=${P.length===0}
                  @click=${Ze}
                >
                  전역 기본값으로 적용
                </button>
                <input
                  type="text"
                  class="settings-dialog__preset-name"
                  placeholder=${P?"\uC774\uB984 (\uBE44\uC6B0\uBA74 \uC720\uC9C0)":"\uC0C8 \uD504\uB9AC\uC14B \uC774\uB984"}
                  aria-label="프리셋 이름"
                  .value=${Mr(A)}
                  @input=${Fe=>{A=String(Fe.target.value)}}
                />
                <button
                  type="button"
                  class="settings-dialog__btn"
                  data-preset-save
                  @click=${Ge}
                >
                  ${P?"\uAC31\uC2E0":"\uC800\uC7A5"}
                </button>
                <button
                  type="button"
                  class="settings-dialog__btn"
                  data-preset-delete
                  ?disabled=${P.length===0}
                  @click=${ze}
                >
                  삭제
                </button>
              </div>
            `}
      </section>
    `}function $e(){let $=t.queueStore?.get(),D=S(),V={orchestration_model:M.orchestration_model??(Xt($)?$.orchestration_model:null),orchestration_effort:M.orchestration_effort??(Xt($)?$.orchestration_effort:null),orchestration_speed:M.orchestration_speed??(Xt($)?$.orchestration_speed:null)},Le=As(D,k),Re=Xr(D,k||void 0,V.orchestration_model||Bt).filter(Ce=>Ce!==Bt),Fe=Xt($)&&typeof $.slots=="number"?$.slots:2;return i`
      <section
        class=${`settings-dialog__pane${l==="worker"?" settings-dialog__pane--active":""}`}
        role="tabpanel"
        id="settings-pane-worker"
        aria-label="Worker 설정"
      >
        <header class="settings-dialog__pane-head"><h2>Worker 설정</h2></header>
        <p class="settings-dialog__pane-sub">
          Worker가 세션을 띄울 때 쓰는 오케스트레이션 설정과 동시 실행 수입니다.
        </p>
        <div class="settings-dialog__group">
          <div class="settings-dialog__group-title">오케스트레이션</div>
          <div class="settings-dialog__row">
            <span class="settings-dialog__row-label">런타임</span>
            <span class="settings-dialog__controls">
              <select
                aria-label="런타임"
                data-key="orchestration_runtime_filter"
                .value=${Mr(k||Zt)}
                @change=${Ce=>{let et=String(Ce.target.value);k=et===Zt?null:et,Z()}}
              >
                <option value=${Zt} ?selected=${!k}>
                  전체
                </option>
                <option
                  value="claude"
                  ?selected=${k==="claude"}
                >
                  claude
                </option>
                <option
                  value="codex"
                  ?selected=${k==="codex"}
                >
                  codex
                </option>
              </select>
              <span class="settings-dialog__hint">모델 목록을 좁힙니다</span>
            </span>
          </div>
          ${_e("orchestration_model","\uBAA8\uB378",Le,de,V)}
          ${_e("orchestration_effort","effort",Re,de,V)}
          ${_e("orchestration_speed","\uC18D\uB3C4",wn,de,V)}
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
                  @click=${()=>Ne(Fe-1)}
                >
                  −
                </button>
                <span class="settings-dialog__stepper-value">${Fe}</span>
                <button
                  type="button"
                  aria-label="slots 증가"
                  @click=${()=>Ne(Fe+1)}
                >
                  +
                </button>
              </span>
            </span>
          </div>
        </div>
        ${xe()}
      </section>
    `}function pe(){let $=n.get();return i`
      <section
        class=${`settings-dialog__pane${l==="display"?" settings-dialog__pane--active":""}`}
        role="tabpanel"
        id="settings-pane-display"
        aria-label="표시 설정"
      >
        <header class="settings-dialog__pane-head"><h2>표시 설정</h2></header>
        <p class="settings-dialog__pane-sub">
          이 워크스페이스의 라벨·칩 표시 정책입니다.
        </p>
        ${$?i`
              ${Tc($,s(),T)}
              ${Cc($,u,{onDraft:D=>{u=D},onAdd:z,onRemove:R})}
              ${Rc($,K)}
            `:i`<div class="settings-dialog__empty">
              표시 정책을 불러오는 중…
            </div>`}
      </section>
    `}async function ae($){let D=n.get();if(D)try{let V=await r("display-policy-set",{expected_revision:D.revision,policy:$(D)});U(V),V&&V.conflict&&V.policy&&(V=await r("display-policy-set",{expected_revision:V.policy.revision,policy:$(V.policy)}),U(V)),V&&V.conflict&&o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC")}catch{o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328")}}function U($){$&&$.policy&&typeof $.policy=="object"&&n.set($.policy)}function B($){ae($)}function T($){let D=n.get();if(!D)return;let V=!S_($,D);B(Le=>A_($,Le,V))}function z(){let $=u.trim();$.length!==0&&(u="",B(D=>D.hidden_prefixes.includes($)?{hidden_prefixes:D.hidden_prefixes}:{hidden_prefixes:[...D.hidden_prefixes,$]}),Z())}function R($){B(D=>({hidden_prefixes:D.hidden_prefixes.filter(V=>V!==$)}))}function K($){let D=n.get();if(!D)return;let V=D.chips[$]===!1;B(()=>({chips:{[$]:V}}))}function Z(){je(i`
        <div class="settings-dialog__container">
          <nav
            class="settings-dialog__rail"
            role="tablist"
            aria-orientation="vertical"
          >
            <div class="settings-dialog__rail-title">설정</div>
            ${x_.map($=>i`<button
                  type="button"
                  class="settings-dialog__tab"
                  role="tab"
                  data-tab=${$.id}
                  aria-selected=${String(l===$.id)}
                  aria-controls=${`settings-pane-${$.id}`}
                  @click=${()=>ce($.id)}
                >
                  <span class="settings-dialog__glyph">${$.glyph}</span>
                  ${$.label}
                </button>`)}
            <button
              type="button"
              class="settings-dialog__close"
              aria-label="닫기"
              @click=${Q}
            >
              닫기
            </button>
          </nav>
          <div class="settings-dialog__panes">
            ${G()} ${$e()} ${pe()}
          </div>
        </div>
      `,a)}function ce($){l=$,Z()}let fe=()=>{c=!1,t.onOpenChange?.(!1)};a.addEventListener("close",fe),a.addEventListener("cancel",fe);let be=$=>{$.target===a&&Q()};a.addEventListener("click",be);let C=null;n.subscribe&&(C=n.subscribe(()=>{c&&Z()}));let N=null;t.implPresetStore?.subscribe&&(N=t.implPresetStore.subscribe(()=>{c&&Z()}));function te($="session"){c||(c=!0,t.onOpenChange?.(!0),l=$,u="",M={},Z(),typeof a.showModal=="function"?a.showModal():a.setAttribute("open",""),Y())}function Q(){c&&(c=!1,t.onOpenChange?.(!1),typeof a.close=="function"?a.close():a.removeAttribute("open"))}return{open:te,close:Q,sessionDraft:()=>({..._}),destroy(){c=!1,a.removeEventListener("close",fe),a.removeEventListener("cancel",fe),a.removeEventListener("click",be),C&&(C(),C=null),N&&(N(),N=null),a.remove()}}}function S_(e,t){return t.visible_labels.includes(e)?!0:t.hidden_labels.includes(e)?!1:!t.hidden_prefixes.some(r=>r.length>0&&e.startsWith(r))}function A_(e,t,r){if(!r)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(o=>o!==e)};let n=t.hidden_labels.filter(o=>o!==e);return t.hidden_prefixes.some(o=>o.length>0&&e.startsWith(o))?{hidden_labels:n,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:n}}var E_=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function Lc(e){return String(e).padStart(2,"0")}function T_(e,t){let r=Math.max(0,Math.ceil((e-t)/6e4)),n=Math.floor(r/1440),s=Math.floor(r%1440/60),o=r%60;return n>0?`${n}d${s>0?` ${s}h`:""}`:s>0?`${s}h${o>0?` ${o}m`:""}`:`${o}m`}function C_(e,t=Date.now()){let r=Date.parse(e);if(!Number.isFinite(r))return"";let n=new Date(r),s=new Date(t),o=`${Lc(n.getHours())}:${Lc(n.getMinutes())}`,l=n.getFullYear()===s.getFullYear()&&n.getMonth()===s.getMonth()&&n.getDate()===s.getDate()?o:`${E_[n.getMonth()]} ${n.getDate()} ${o}`;return`${T_(r,t)} \xB7 ${l}`}function R_(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}var Oc=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage"}];function Pc(e){let t=!1,r=null,n=new Map;function s(){je(i``,e),e.hidden=!0}function o(){let c=Oc.filter(f=>n.has(f.key));if(c.length===0){s();return}let u=Date.now();je(i`<div class="usage-meter" aria-label="Usage">
        ${c.map(f=>{let _=n.get(f.key),b=typeof _.ageSeconds=="number"&&_.ageSeconds>600,E=b?`${Math.floor(_.ageSeconds/60)}\uBD84 \uC804 \uCE21\uC815`:"";return i`<span
            class="usage-meter__group${b?" usage-meter__group--stale":""}"
            aria-label=${`${f.label} usage`}
          >
            <span class="usage-meter__provider">${f.label}</span>
            ${_.windows.map(k=>{let M=typeof k.pct=="number"&&Number.isFinite(k.pct)?k.pct:0,P=Math.min(100,Math.max(0,M)),j=`resets ${C_(k.resetsAt,u)}${b?` \xB7 ${E}`:""}`;return i`<span
                class="usage-meter__window ${R_(P)}"
                style=${`--progress: ${P}%`}
                title=${j}
              >
                <span class="usage-meter__label">${k.key}</span>
                <span class="usage-meter__track" aria-hidden="true">
                  <span class="usage-meter__fill"></span>
                </span>
                <span class="usage-meter__pct">${P}%</span>
              </span>`})}
          </span>`})}
      </div>`,e),e.hidden=!1}async function a(c){try{let u=await fetch(c.endpoint);if(!u.ok)return null;let f=await u.json();return!f||f.available!==!0||!Array.isArray(f.windows)?null:f}catch{return null}}async function l(){let c=await Promise.all(Oc.map(async u=>({provider:u,payload:await a(u)})));if(!t){for(let u of c)u.payload?n.set(u.provider.key,u.payload):n.delete(u.provider.key);o()}}return s(),l(),r=setInterval(()=>{l()},6e4),{destroy(){t=!0,r!==null&&(clearInterval(r),r=null),s()}}}function Dc(e){let t=e.attempts?Object.values(e.attempts):[],r=new Map;for(let s of t)s&&r.set(s.bead_id,s.attempt_id);let n=new Map;for(let s of e.done||[])s&&typeof s.bead_id=="string"&&typeof s.added_at=="number"&&n.set(s.bead_id,s.added_at);return s=>{let o=r.get(s.bead_id)!==s.attempt_id,a=n.get(s.bead_id),l=typeof a=="number"&&a>0&&typeof s.finished_at=="number"&&a>=s.finished_at;return!o&&!l&&typeof s.dismissed_at!="number"}}var I_="worker-ineligible";function na(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Mc(e){return na(e).includes(I_)}var L_="worker-serial";function sa(e){return na(e).includes(L_)}function oa(e,t,r){if(typeof t!="string"||typeof r!="string")return[];let n=e?.runners;if(!n||!Object.hasOwn(n,t))return[];let s=n[t],o=s?.models;if(!o||!Object.hasOwn(o,r))return[];let a=o[r]?.efforts;return Array.isArray(a)?a.slice():Array.isArray(s.efforts)?s.efforts.slice():[]}var O_=new Set(["done","failed","orphaned","stopped","discarded"]);function Nc(e,t){let{queueStore:r,analysisStore:n,transport:s}=t,o=document.createElement("dialog");o.id="worker-parallel-analysis-dialog",o.className="pa",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),e.appendChild(o);let a=new Map,l=new Map,c=!1,u=null,f=null;function _(){return r&&r.get()||{revision:0,queue:[],serial_lanes:[],serial_lane_count:0,attempts:{},pr_wait:[]}}function b(){return n&&n.get()||{settings:{revision:0,runner:null,model:null,effort:null},job:null,last_good:null}}function E(){let C=_(),N=new Set;for(let te of Object.values(C.attempts||{})){let Q=te;Q&&typeof Q.bead_id=="string"&&!O_.has(Q.status)&&N.add(Q.bead_id)}for(let te of Array.isArray(C.pr_wait)?C.pr_wait:[])te&&typeof te.bead_id=="string"&&N.add(te.bead_id);for(let te of Object.values(C.discard_operations||{})){let Q=te;Q&&Q.phase!=="done"&&typeof Q.bead_id=="string"&&N.add(Q.bead_id)}return N}function k(C){return C.filter(N=>M(N)===null)}function M(C){let N=_();for(let te of Array.isArray(N.serial_lanes)?N.serial_lanes:[])if(Array.isArray(te?.entries)&&te.entries.some(Q=>Q.bead_id===C))return te.id;return(Array.isArray(N.queue)?N.queue:[]).some(te=>te.bead_id===C)?"parallel":null}function P(C,N){let te=a.get(C);return te||[...N.order]}function A(C){if(C.length<2)return!1;let N=M(C[0]);if(!N||N==="parallel")return!1;let te=_(),Q=(Array.isArray(te.serial_lanes)?te.serial_lanes:[]).find(D=>D.id===N)?.entries.map(D=>D.bead_id);if(!Array.isArray(Q))return!1;let $=C.map(D=>Q.indexOf(D));return $.every(D=>D>=0)&&$.every((D,V)=>V===0||D>$[V-1])}function j(){let C=_(),N=Array.isArray(C.serial_lanes)?C.serial_lanes:[],te=N.find(Q=>Array.isArray(Q.entries)&&Q.entries.length===0);return te?te.id:N[0]?.id||"s1"}function ee(C){let N=_().bead_titles||{};return typeof N[C]=="string"?N[C]:C}async function x(C,N){if(!s||c)return null;c=!0,T();try{return await s(C,N)}finally{c=!1,T()}}async function w(C){n?.setPending?.(!0);try{let N=await x("worker-parallel-analysis-start",{force:C});N&&N.applied===!1&&N.reason&&ie(`\uBD84\uC11D \uC2E4\uD328: ${N.reason}`,"error",2800)}finally{n?.setPending?.(!1)}}async function S(){let C=b().job;!s||!C||await s("worker-parallel-analysis-cancel",{job_id:C.job_id})}function H(){return _().runner_catalog}function Y(C){return Object.keys(H()?.runners?.[C]?.models||{})}function he(C){let N=Y(C),te=H()?.runners?.[C]?.default_model;return typeof te=="string"&&N.includes(te)?te:N[0]||""}function le(){let C=b().settings,N=u||C.runner||"claude",te=Y(N),Q=u?he(N):C.model||te[0]||"",$=oa(H(),N,Q),D=C.effort||"",V=$.includes(D)?D:$[0]||"";return{runner:N,model:Q,effort:V,models:te,efforts:$}}async function se(C){let N=b().settings,te=await x("worker-parallel-analysis-settings-update",{expected_revision:N.revision,runner:C.runner,model:C.model,effort:C.effort});(!te||te.applied!==!0)&&(u=null,T(),te&&te.reason&&ie(`\uBD84\uC11D \uC124\uC815 \uAC70\uBD80: ${te.reason}`,"error",2800))}function de(C){u=C,T();let N=le();se({runner:C,model:N.model,effort:N.effort})}function Ne(C){let N=le(),te=oa(H(),N.runner,C);se({runner:N.runner,model:C,effort:te.includes(N.effort)?N.effort:te[0]||""})}function Ue(C){let N=le();se({runner:N.runner,model:N.model,effort:C})}async function Ge(C,N){if(!s||c)return;let te=P(C,N),Q=b();if(te.length<2||!Q.last_good){ie("\uC81C\uCD9C\uD558\uB824\uBA74 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4","warning");return}let $=l.get(C)||j(),D=()=>({snapshot_digest:Q.last_good.identity_digest,group_index:C,lane:$,ordered_bead_ids:te,expected_revision:_().revision});c=!0,T();try{let V=await s("worker-parallel-analysis-submit",D());V&&V.queue&&r&&r.set(V.queue),V&&V.applied!==!0&&V.conflict===!0&&(V=await s("worker-parallel-analysis-submit",D()),V&&V.queue&&r&&r.set(V.queue)),V&&V.applied===!0?(a.delete(C),ie(`\uC9C1\uB82C \uB808\uC778 ${$}\uC5D0 ${te.length}\uAC1C \uBC30\uCE58`,"success")):ie(`\uC81C\uCD9C \uAC70\uBD80: ${V?.reason||"conflict"} (\uD050 \uBB34\uBCC0\uACBD)`,"error",2800)}finally{c=!1,T()}}function ze(C,N,te){a.set(C,P(C,N).filter(Q=>Q!==te)),T()}function Ze(C){a.delete(C),T()}function qe(C,N,te,Q){let $=[...P(C,N)],D=$.indexOf(te),V=D+Q;D<0||V<0||V>=$.length||($.splice(V,0,...$.splice(D,1)),a.set(C,$),T())}function ke(){let C=b().settings,N=Object.keys(H()?.runners||{}),te=le();return i`<div class="pa-settings">
      <label class="pa-settings__field"
        >러너
        <select
          class="pa-settings__runner"
          aria-label="분석 러너"
          @change=${Q=>de(Q.target.value)}
        >
          ${N.map(Q=>i`<option
                value=${Q}
                ?selected=${te.runner===Q}
              >
                ${Q}
              </option>`)}
        </select>
      </label>
      <label class="pa-settings__field"
        >분석 모델
        <select
          class="pa-settings__model"
          aria-label="분석 모델"
          @change=${Q=>Ne(Q.target.value)}
        >
          ${te.models.map(Q=>i`<option
                value=${Q}
                ?selected=${te.model===Q}
              >
                ${Q}
              </option>`)}
        </select>
      </label>
      <label class="pa-settings__field"
        >effort
        <select
          class="pa-settings__effort-select"
          aria-label="분석 effort"
          @change=${Q=>Ue(Q.target.value)}
        >
          ${te.efforts.map(Q=>i`<option
                value=${Q}
                ?selected=${te.effort===Q}
              >
                ${Q}
              </option>`)}
        </select>
      </label>
      ${we(C)}
    </div>`}function we(C){return!Ie(C)||xe(C)?i`<span class="pa-settings__unset">분석 모델 설정 필요</span>`:C.compatible===!1?i`<span class="pa-settings__incompatible"
        >설정 비호환 — 저장된 ${C.runner}/${C.model} · effort
        ${C.effort} 을(를) 카탈로그가 더는 제공하지 않습니다</span
      >`:C.is_default===!0?i`<span class="pa-settings__default">기본값</span>`:""}function xe(C){return C.is_default===!0&&C.compatible===!1}function Ie(C){return!!(C.runner&&C.model&&C.effort)}function _e(C){return Ie(C)&&C.compatible!==!1}function X(C){let N=Math.max(0,Math.floor(C/1e3)),te=Math.floor(N/60),Q=N%60;return`${te}:${String(Q).padStart(2,"0")}`}function G(C){let N=C.job;if(N){let te=typeof N.started_at=="number"?N.started_at:0,Q=`${N.runner||"?"}/${N.model||"?"}`,$=te?` \xB7 \uACBD\uACFC ${X(Date.now()-te)}`:"";return i`<span class="pa-meta__progress"
        >분석 중 — ${Q} · effort ${N.effort||"?"}${$}</span
      >`}return $e()?i`<span class="pa-meta__progress"
          >준비 중 — 대상과 아티팩트 수집 중</span
        >`:""}function $e(){return n?.isPending?.()===!0}function pe(C){let N=_(),te=(Array.isArray(N.queue)?N.queue.length:0)+(Array.isArray(N.serial_lanes)?N.serial_lanes:[]).reduce((V,Le)=>V+(Array.isArray(Le.entries)?Le.entries.length:0),0),Q=!!C.job,$=_e(C.settings),D=Q||c||$e();return i`<div class="pa-meta">
      <span class="pa-meta__targets">대상 ${te}</span>
      ${C.last_good?i`<span class="pa-meta__at"
            >분석 ${new Date(C.last_good.at||0).toLocaleString()}</span
          >`:i`<span class="pa-meta__at">분석 결과 없음</span>`}
      ${G(C)}
      <button
        type="button"
        class="pa-run"
        ?disabled=${!$||D}
        @click=${()=>{w(!1)}}
      >
        ✳ 분석
      </button>
      <button
        type="button"
        class="pa-rerun"
        ?disabled=${!$||D}
        @click=${()=>{w(!0)}}
      >
        재분석
      </button>
      <button
        type="button"
        class="pa-cancel"
        ?disabled=${!Q}
        @click=${()=>{S()}}
      >
        취소
      </button>
    </div>`}function ae(C,N){let te=P(C,N),Q=E(),$=te.filter(Ce=>Q.has(Ce)),D=k(te),V=A(te),Le=Array.isArray(_().serial_lanes)?_().serial_lanes:[],Re=l.get(C)||j(),Fe=N.eligible!==!0||te.length<2||$.length>0||D.length>0||V||c;return i`<section class="pa-group" data-group-index=${String(C)}>
      <header class="pa-group__head">
        <span class="pa-group__confidence">${N.confidence}</span>
        ${N.categories.map(Ce=>i`<span class="pa-group__category">${Ce}</span>`)}
        ${V?i`<span class="pa-group__applied">✓ 이미 반영됨</span>`:""}
        ${N.eligible===!0?"":i`<span class="pa-group__weak">근거 부족 — 제출 불가</span>`}
        ${D.length>0?i`<span class="pa-group__stale"
              >stale — ${D.join(", ")} 대기 영역 이탈</span
            >`:""}
      </header>
      <p class="pa-group__reason">${N.reason}</p>
      <ol class="pa-group__members">
        ${te.map((Ce,et)=>i`<li class="pa-member" data-bead-id=${Ce}>
              <span class="pa-member__seq">${et+1}</span>
              <span class="pa-member__title">${ee(Ce)}</span>
              ${Q.has(Ce)?i`<span class="pa-member__active">실행 중</span>`:""}
              <button
                type="button"
                class="pa-member__up"
                data-bead-id=${Ce}
                ?disabled=${et===0}
                aria-label=${`${Ce} \uC704\uB85C`}
                @click=${()=>qe(C,N,Ce,-1)}
              >
                ↑
              </button>
              <button
                type="button"
                class="pa-member__down"
                data-bead-id=${Ce}
                ?disabled=${et===te.length-1}
                aria-label=${`${Ce} \uC544\uB798\uB85C`}
                @click=${()=>qe(C,N,Ce,1)}
              >
                ↓
              </button>
              <button
                type="button"
                class="pa-member__exclude"
                data-bead-id=${Ce}
                aria-label=${`${Ce} \uC81C\uC678`}
                @click=${()=>ze(C,N,Ce)}
              >
                ✕
              </button>
            </li>`)}
      </ol>
      <ul class="pa-group__evidence">
        ${N.evidence.map(Ce=>i`<li class="pa-evidence">
              <code>${Ce.path}</code>
              <span class="pa-evidence__locator">${Ce.locator}</span>
            </li>`)}
      </ul>
      <footer class="pa-group__foot">
        <button
          type="button"
          class="pa-group__restore"
          @click=${()=>Ze(C)}
        >
          제안으로 되돌리기
        </button>
        <label class="pa-group__lane-field"
          >제출
          <select
            class="pa-group__lane"
            aria-label="제출 대상 레인"
            @change=${Ce=>{l.set(C,Ce.target.value),T()}}
          >
            ${Le.map((Ce,et)=>i`<option
                  value=${Ce.id}
                  ?selected=${Re===Ce.id}
                >
                  직렬 ${et+1}
                </option>`)}
          </select>
        </label>
        <button
          type="button"
          class="pa-group__submit"
          ?disabled=${Fe}
          @click=${()=>{Ge(C,N)}}
        >
          제출
        </button>
      </footer>
    </section>`}function U(C){let N=Array.isArray(C.issues)?C.issues:[],te=N.filter($=>$.verdict==="parallel_ok").length,Q=N.filter($=>$.verdict==="uncertain").length;return i`<div class="pa-summary">
      <span>parallel_ok ${te}</span>
      <span>uncertain ${Q}</span>
    </div>`}function B(){let C=z&&!!b().job;if(C&&f===null){f=setInterval(()=>T(),1e3);return}!C&&f!==null&&(clearInterval(f),f=null)}function T(){let C=b();u&&C.settings.runner===u&&(u=null);let N=C.last_good?.result;B(),je(i`
        <div class="pa__container">
          <header class="pa__header">
            <div class="pa__title">병렬성 분석</div>
            <button
              type="button"
              class="pa__close"
              aria-label="닫기"
              @click=${be}
            >
              ×
            </button>
          </header>
          <div class="pa__body">
            ${ke()} ${pe(C)}
            ${N?i`${N.groups.map((te,Q)=>ae(Q,te))}
                ${N.groups.length===0?i`<p class="pa-empty">직렬 권장 그룹 없음</p>`:""}
                ${U(N)}`:i`<p class="pa-empty">
                  아직 분석 결과가 없습니다 — [✳ 분석]을 눌러 시작하세요
                </p>`}
          </div>
        </div>
      `,o)}let z=!1,R=()=>{z=!1,B()},K=C=>{C.target===C.currentTarget&&be()};o.addEventListener("close",R),o.addEventListener("cancel",R),o.addEventListener("click",K);let Z=null;r&&r.subscribe&&(Z=r.subscribe(()=>{z&&T()}));let ce=null;n&&n.subscribe&&(ce=n.subscribe(()=>{z&&T()}));function fe(){z||(z=!0,T(),typeof o.showModal=="function"?o.showModal():o.setAttribute("open",""))}function be(){z&&(z=!1,B(),typeof o.close=="function"?o.close():o.removeAttribute("open"))}return{open:fe,close:be,destroy(){z=!1,f!==null&&(clearInterval(f),f=null),o.removeEventListener("close",R),o.removeEventListener("cancel",R),o.removeEventListener("click",K),Z&&(Z(),Z=null),ce&&(ce(),ce=null),o.remove()}}}var Fc=new Set(["sh","bash","zsh","dash","ksh"]),qc=/('(?:[^']*)'|"(?:\\.|[^"\\])*"|#.*|\$(?:\{[^}\n]*\}|[A-Za-z_][A-Za-z0-9_]*|[?#@*!$0-9-])|\b(?:if|then|else|elif|fi|for|while|until|do|done|case|esac|in|function|select|time)\b)/g;function Bc(e){let t=e.split("/");return t[t.length-1]||""}function P_(e){let t=e.split(`
`,1)[0];if(!t.startsWith("#!"))return!1;let r=t.slice(2).trim().split(/\s+/).filter(Boolean);if(r.length===0)return!1;let n=Bc(r[0]);if(n!=="env")return Fc.has(n);let s=r.slice(1).find(o=>!o.startsWith("-")&&!o.includes("="));return s!==void 0&&Fc.has(Bc(s))}function D_(e){return e.startsWith("#")?"comment":e.startsWith("'")||e.startsWith('"')?"string":e.startsWith("$")?"variable":"keyword"}function M_(e){let t=[],r=0;qc.lastIndex=0;for(let n of e.matchAll(qc)){let s=n.index;s>r&&t.push({text:e.slice(r,s),kind:"plain"}),t.push({text:n[0],kind:D_(n[0])}),r=s+n[0].length}return r<e.length&&t.push({text:e.slice(r),kind:"plain"}),t.length===0&&t.push({text:e,kind:"plain"}),t}function N_(e){return{bad_request:"\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",forbidden:"\uB4F1\uB85D\uB418\uC9C0 \uC54A\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB294 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",lane_not_declared:"\uD604\uC7AC \uACE0\uC815 \uC120\uC5B8\uC5D0 \uD574\uB2F9 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",stale_declaration:"\uC800\uC7A5\uC18C \uC791\uC5C5 \uC120\uC5B8\uC774 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uD654\uBA74\uC5D0\uC11C \uB2E4\uC2DC \uC5F4\uC5B4 \uC8FC\uC138\uC694.",too_large:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uB108\uBB34 \uCEE4\uC11C \uD654\uBA74\uC5D0 \uD45C\uC2DC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",unsupported_content:"\uD14D\uC2A4\uD2B8 \uD615\uC2DD\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB9CC \uD45C\uC2DC\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",unreadable:"\uACE0\uC815\uB41C \uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."}[e]||"\uC2A4\uD06C\uB9BD\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."}function jc(e){let t=e.getWorkspacePath,r=e.fetchImpl||globalThis.fetch?.bind(globalThis),n=document.createElement("div");n.className="repo-ops-script-viewer-root",document.body.appendChild(n);let s=null,o="loading",a="",l="",c=0,u=null,f=!1;function _(w,S){return S?M_(w).map(H=>H.kind==="plain"?H.text:i`<span
            class="repo-ops-script-viewer__token repo-ops-script-viewer__token--${H.kind}"
            >${H.text}</span
          >`):w}function b(){if(!s)return i``;let w=o==="ready"&&P_(a),S=o==="ready"?a.split(`
`):[];return i`<div
      class="repo-ops-script-viewer"
      role="dialog"
      aria-modal="true"
      aria-label=${`\uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9: ${s.path}`}
    >
      <div
        class="repo-ops-script-viewer__backdrop"
        @click=${()=>ee()}
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
              @click=${()=>{k()}}
            >
              복사
            </button>
            <button
              type="button"
              class="repo-ops-script-viewer__close"
              aria-label="스크립트 팝업 닫기"
              @click=${()=>ee()}
            >
              ✕
            </button>
          </div>
        </header>
        <div class="repo-ops-script-viewer__body" aria-live="polite">
          ${o==="loading"?i`<div class="repo-ops-script-viewer__status">
                스크립트 불러오는 중…
              </div>`:o==="error"?i`<div
                  class="repo-ops-script-viewer__status repo-ops-script-viewer__status--error"
                >
                  ${l}
                </div>`:i`<div class="repo-ops-script-viewer__code" tabindex="0">
                  ${S.map((H,Y)=>i`<div class="repo-ops-script-viewer__row">
                        <span
                          class="repo-ops-script-viewer__line-number"
                          aria-hidden="true"
                          >${Y+1}</span
                        ><code class="repo-ops-script-viewer__code-line"
                          >${_(H,w)}</code
                        >
                      </div>`)}
                </div>`}
        </div>
      </section>
    </div>`}function E(){je(b(),n)}async function k(){if(o!=="ready")return;let w=await ir(a);ie(w?"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC\uB428":"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC \uC2E4\uD328",w?"success":"error")}function M(w){w.key==="Escape"&&s&&(w.preventDefault(),ee())}function P(){f||(document.addEventListener("keydown",M),f=!0)}function A(){f&&(document.removeEventListener("keydown",M),f=!1)}async function j(w,S=null){let H=++c;P(),s={...w},u=S||(document.activeElement instanceof HTMLElement?document.activeElement:null),o="loading",a="",l="",E(),n.querySelector(".repo-ops-script-viewer__close")?.focus();let he=t?t():"";if(!he){o="error",l="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",E();return}if(!r){o="error",l="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD \uAE30\uB2A5\uC744 \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",E();return}let le="/api/repo-ops-script?workspace="+encodeURIComponent(he)+"&lane="+encodeURIComponent(w.lane)+"&base_sha="+encodeURIComponent(w.base_sha);try{let se=await r(le),de=await se.json().catch(()=>({}));if(H!==c)return;if((t?t():"")!==he){ee();return}if(!se.ok||!de||de.ok!==!0){o="error",l=N_(de&&typeof de.error=="string"?de.error:""),E();return}s={lane:de.lane,base_sha:de.base_sha,path:de.path,base_ref:de.base_ref},a=String(de.content),o="ready",E()}catch{if(H!==c)return;o="error",l="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",E()}}function ee(){c+=1,A(),s=null,a="",E();let w=u;u=null,w?.isConnected&&w.focus()}function x(){ee(),n.remove()}return{open:j,close:ee,destroy:x}}function Uc(e){let t=e.queueStore,r=e.transport,n=e.onChanged||(()=>{}),s=e.onOpenScript;function o(){return t&&t.get()||{}}function a(){let x=o();return typeof x.revision=="number"?x.revision:0}function l(x){t&&x&&x.queue&&typeof x.queue=="object"&&t.set(x.queue)}function c(){let x=o().workspace_info;return x&&typeof x=="object"?x:{}}function u(x,w){return i`<span
      class="worker-repo-ops__vd-badge worker-repo-ops__vd-badge--${x}"
      >${w}</span
    >`}function f(x){if(typeof x!="number"||!Number.isFinite(x))return"";let w=x/6e4;return Number.isInteger(w)?`timeout ${w}\uBD84`:`timeout ${Math.round(x/1e3)}\uCD08`}function _(x){let w=f(x);return w?u("config",w):""}function b(x,w,S){return i`<button
      type="button"
      class="worker-repo-ops__vd-cmd worker-repo-ops__vd-cmd--link"
      .textContent=${S.script}
      @click=${H=>{s&&s({lane:x,base_sha:w.base_sha,path:S.script,base_ref:w.base_ref},H.currentTarget)}}
    ></button>`}function E(x){let w=typeof x.base_sha=="string"?x.base_sha:"",S=`${x.source_path||"repo-ops/config.toml"} @ ${x.base_ref||"?"}${w?`@${w.slice(0,7)}`:""}`;return i`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">
        저장소 작업 선언
        <span class="worker-repo-ops__vd-src">${S}</span>
      </p>
      <div class="worker-repo-ops__lane" data-lane="verify">
        <span class="worker-repo-ops__lane-k">머지 전 검증</span>
        <span class="worker-repo-ops__lane-v"
          >${x.verify?i`${b("verify",x,x.verify)}
              ${_(x.verify.timeout_ms)}`:i`선언 없음${u("absent","verify \uC5C6\uC774 \uD310\uC815")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${x.verify?"\uBA38\uC9C0 \uC804\uC5D0 \uC774 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uD1B5\uACFC\uD574\uC57C \uC790\uACA9\uC744 \uC5BB\uC2B5\uB2C8\uB2E4.":"\uBA38\uC9C0 \uC790\uACA9\uC740 PR/base/head \uC2E0\uC120\uB3C4\xB7mergeability\xB7\uB9AC\uBDF0 \uC601\uC218\uC99D\uC73C\uB85C\uB9CC \uD310\uC815\uD569\uB2C8\uB2E4."}</span
        >
      </div>
      <div class="worker-repo-ops__lane" data-lane="deploy">
        <span class="worker-repo-ops__lane-k">머지 후 배포</span>
        <span class="worker-repo-ops__lane-v"
          >${x.deploy?i`${b("deploy",x,x.deploy)}
              ${_(x.deploy.timeout_ms)}`:i`선언 없음${u("absent","\uBC30\uD3EC \uC5C6\uC74C")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${x.deploy?i`Worker가 <code>.worktrees/.repo-ops-deploy</code>에서 대상
                SHA로 정렬한 뒤 1회 실행합니다.`:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC \uB2E8\uACC4 \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4."}</span
        >
      </div>
    </section>`}function k(x){let w=x.repo_ops&&typeof x.repo_ops=="object"?x.repo_ops:null;return w&&(w.status==="resolved"||w.status==="absent")?E(w):w&&(w.status==="pending"||w.status==="error")?i`<section class="worker-repo-ops__vd" data-seam="repo-ops">
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
          ${w.status==="pending"?"\uC120\uC5B8 \uD655\uC778 \uC911":i`선언 읽기
              실패${w.error_code?i` — <code>${w.error_code}</code>`:""}`}
        </div>
      </section>`:i`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">저장소 작업 선언</p>
      <div class="worker-repo-ops__vd-line worker-repo-ops__vd-absent">
        선언 확인 중
      </div>
    </section>`}async function M(x){if(!r)return;let w=await r("worker-auto-repair-toggle",{on:x,expected_revision:a()});if(l(w),w&&w.conflict){let S=await r("worker-auto-repair-toggle",{on:x,expected_revision:a()});l(S)}n()}let P={owned_deploy_worktree_fetch_detached_alignment_recreate:"\uC804\uC6A9 \uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC \uC815\uB82C\xB7\uBCF5\uAD6C",recovered_pre_execution_fetch_timeout_retry_once:"fetch \uD0C0\uC784\uC544\uC6C3 1\uD68C \uBCF5\uAD6C",repo_serial_lock_wait:"\uC800\uC7A5\uC18C \uC21C\uCC28 \uC2E4\uD589 \uB300\uAE30",restart_operation_adoption:"\uC7AC\uC2DC\uC791 \uD6C4 \uC791\uC5C5 \uC778\uACC4",exact_input_exit_zero_evidence_adoption:"\uB3D9\uC77C \uC785\uB825 \uC131\uACF5 \uC99D\uAC70 \uC778\uACC4",descendant_success_covers_ancestor_rows:"\uCD5C\uC2E0 SHA \uC131\uACF5\uC774 \uC774\uC804 \uD589 \uCEE4\uBC84",owned_verify_candidate_cleanup:"\uAC80\uC99D \uC784\uC2DC \uCCB4\uD06C\uC544\uC6C3 \uC815\uB9AC",script_retry:"\uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4",auto_repair_session:"\uC790\uB3D9 \uD574\uACB0 \uC138\uC158",user_triggered_session:"\uC0AC\uC6A9\uC790 \uD574\uACB0 \uC138\uC158",automatic:"\uC790\uB3D9",user_action_only:"\uC0AC\uC6A9\uC790 \uD074\uB9AD",script_identity_present:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC788\uC744 \uB54C\uB9CC",per_completion_chain:"\uC644\uB8CC \uCCB4\uC778\uB2F9",unbounded:"\uD69F\uC218 \uC81C\uD55C \uC5C6\uC74C",bounded_single_script_retry_exceeded:"\uB2E8\uC77C \uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4 \uD55C\uB3C4 \uCD08\uACFC",baseline_failure_ignore:"\uAE30\uC874 \uC2E4\uD328 \uBB34\uC2DC",config_or_script_deletion_to_bypass_gate:"\uC124\uC815\xB7\uC2A4\uD06C\uB9BD\uD2B8 \uC0AD\uC81C\uB85C \uAC8C\uC774\uD2B8 \uC6B0\uD68C",credential_entry:"\uC790\uACA9\uC99D\uBA85 \uC785\uB825\xB7\uCD9C\uB825",destructive_action:"\uD30C\uAD34\uC801 \uC791\uC5C5",history_rewrite:"\uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131",agent_self_report_as_success:"\uC138\uC158 \uC790\uAE30\uBCF4\uACE0\uB97C \uC131\uACF5 \uCC98\uB9AC",unbounded_repair_session_retry:"\uBB34\uD55C \uD574\uACB0 \uC138\uC158 \uBC18\uBCF5"};function A(x,w,S){return i`<div class="worker-repo-ops__policy-group" data-policy=${S}>
      <div class="worker-repo-ops__policy-label">${x}</div>
      <ul class="worker-repo-ops__policy-list">
        ${w.map(H=>i`<li data-token=${H}>
              ${P[H]||H}
            </li>`)}
      </ul>
    </div>`}function j(x){return i`<div
      class="worker-repo-ops__policy-group"
      data-policy="resolution-ladder"
    >
      <div class="worker-repo-ops__policy-label">해결 사다리</div>
      <ol class="worker-repo-ops__policy-list">
        ${x.map(w=>{let S=[P[w.trigger]||w.trigger];return Number.isInteger(w.attempts_per_operation_attempt)?S.push(`operation\uB2F9 ${w.attempts_per_operation_attempt}\uD68C`):Number.isInteger(w.attempts)?S.push(`${P[w.budget]||w.budget} ${w.attempts}\uD68C`):Number.isInteger(w.sessions_per_user_action)&&S.push(`${w.sessions_per_user_action}\uD68C`,P[w.user_actions]||w.user_actions),w.applies_when&&S.push(P[w.applies_when]||w.applies_when),i`<li data-token=${w.id}>
            <strong>${P[w.id]||w.id}</strong>
            <span>${S.filter(Boolean).join(" \xB7 ")}</span>
          </li>`})}
      </ol>
    </div>`}function ee(){let x=o(),w=x.auto_repair!==!1,S=x.repo_operation_policy&&typeof x.repo_operation_policy=="object"?x.repo_operation_policy:null,H=Array.isArray(x.repo_operations)?x.repo_operations:[],Y=H.find(de=>de.state==="repairing"),he=H.filter(de=>de.state==="failed"||de.state==="repairing"),le=he.length?Math.min(...he.map(de=>typeof de.repair?.remaining=="number"?de.repair.remaining:0)):S?.auto_repair?.resolution_ladder?.find(de=>de.id==="auto_repair_session")?.attempts??1,se=Array.isArray(S?.auto_repair?.resolution_ladder)?S.auto_repair.resolution_ladder:[];return i`<section
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
          .checked=${w}
          @change=${de=>{M(de.target.checked)}}
        />
        검증·배포 실패를 자동으로 해결 시도
      </label>
      <div class="worker-repo-ops__repair-state">
        <span
          class="worker-repo-ops__repair-value"
          data-seam="auto-repair-value"
          >${w?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}</span
        >
        <span
          class="worker-repo-ops__repair-budget"
          data-seam="auto-repair-budget"
          >남은 자동 해결 ${le}회</span
        >
        <span
          class="worker-repo-ops__repair-session"
          data-seam="auto-repair-session"
          >${Y?`\uD574\uACB0 \uC138\uC158 \uC2E4\uD589 \uC911 \xB7 ${Y.repair?.owner_bead||Y.operation_id}`:"\uC2E4\uD589 \uC911\uC778 \uD574\uACB0 \uC138\uC158 \uC5C6\uC74C"}</span
        >
      </div>
      ${S?i`<details
            class="worker-repo-ops__policy"
            data-seam="policy-lists"
          >
            <summary>
              Worker 자동 처리 기준
              <span class="worker-repo-ops__policy-count"
                >자동 ${(S.worker_automatic||[]).length} · 해결 사다리
                ${se.length} · 금지
                ${(S.never_automatic||[]).length}</span
              >
            </summary>
            ${A("Worker\uAC00 \uC790\uB3D9 \uCC98\uB9AC",S.worker_automatic||[],"worker-automatic")}
            ${S.supported===!1||S.schema_version!==2?i`<div
                  class="worker-repo-ops__policy-group"
                  data-policy="resolution-ladder"
                >
                  ${`\uACC4\uC57D \uC2A4\uD0A4\uB9C8 \uBD88\uC77C\uCE58 \u2014 \uC790\uB3D9 \uD574\uACB0\uC774 \uC815\uC9C0\uB418\uC5C8\uC2B5\uB2C8\uB2E4 (v${S.schema_version})`}
                </div>`:j(se)}
            ${A("\uC790\uB3D9\uC73C\uB85C \uD558\uC9C0 \uC54A\uC74C",S.never_automatic||[],"never-automatic")}
          </details>`:""}
    </section>`}return{template(){return i`<details class="worker-repo-ops-settings">
        <summary class="worker-repo-ops-settings__summary">
          저장소 작업 · 검증/배포 선언 · 자동 해결
        </summary>
        ${k(c())} ${ee()}
      </details>`}}}var F_=20,Wc={verify:"\uBA38\uC9C0 \uC804 \uAC80\uC99D",deploy:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC"},zc={verify_script_failure:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0",verify_script_failure_pre_merge:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0 \uD6C4 \uBA38\uC9C0",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328 \uD574\uACB0",interrupted_without_terminal_exit:"\uC911\uB2E8\uB41C \uC791\uC5C5 \uC9C4\uB2E8"};function q_(e,t,r=F_){let n=[];for(let s of Array.isArray(e)?e:[])!s||typeof s!="object"||n.push({type:"operation",id:s.operation_id,at:typeof s.finished_at=="number"?s.finished_at:typeof s.requested_at=="number"?s.requested_at:null,operation:s});for(let s of Array.isArray(t)?t:[])!s||typeof s!="object"||n.push({type:"cleanup",id:s.bead_id,at:typeof s.at=="number"?s.at:null,cleanup:s});return n.sort((s,o)=>s.at===null&&o.at===null?String(s.id||"").localeCompare(String(o.id||"")):s.at===null?1:o.at===null?-1:o.at-s.at),n.slice(0,Math.max(0,r))}function Hc(e){if(e.type==="cleanup")return"warn";let t=e.operation.state;return t==="succeeded"?"ok":t==="failed"?"fail":"live"}function B_(e){if(e.type==="cleanup")return"\uBA48\uCDA4";switch(e.operation.state){case"succeeded":return"\uC131\uACF5";case"failed":return"\uC2E4\uD328";case"repairing":return"\uC790\uB3D9 \uD574\uACB0 \uC911";case"retry_pending":return"\uC7AC\uC2DC\uB3C4 \uC911";case"running":return"\uC2E4\uD589 \uC911";default:return"\uB300\uAE30"}}function Gc(e){let t=e.filter(r=>r.value);return t.length===0?"":i`<details class="worker-ev__details">
    <summary>세부</summary>
    <dl class="worker-ev__kv">
      ${t.map(r=>i`<div>
            <dt>${r.term}</dt>
            <dd>${r.value}</dd>
          </div>`)}
    </dl>
  </details>`}function Vc(e,t="",r=!1){return!e&&!t?"":i`<p
    class="worker-ev__explain${r?" worker-ev__explain--warn":""}"
  >
    <span class="worker-ev__cause">${e}</span>${t?i`<br />${t}`:""}
  </p>`}function j_(e){if(e.state!=="failed"||e.superseded_by)return"";let t=e.repair||{},r=typeof t.remaining=="number"?t.remaining:0,n=e.failure_kind==="verify_script_failure"&&e.verify_stage==="pre_merge"?"verify_script_failure_pre_merge":e.failure_kind||"",s=r<=0;return i`<div class="worker-ev__acts">
    <button
      type="button"
      class="worker-ev__btn worker-ev__btn--primary worker-repo-op__resolve"
      data-operation-id=${e.operation_id}
      data-failure-kind=${e.failure_kind||""}
      title="해결 세션을 엽니다"
    >
      ${Object.hasOwn(zc,n)?zc[n]:"\uC2E4\uD328 \uD574\uACB0 \uC138\uC158 \uC2DC\uC791"}
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
  </div>`}function U_(e){let t=e.operation,r=t.state==="failed",n=t.failure?t.failure.code:"";return i`<li
    class="worker-ev"
    data-operation-id=${t.operation_id}
    data-state=${t.state}
  >
    <span
      class="worker-ev__t"
      title=${e.at?mt(e.at):""}
      >${Ls(e.at)||"\u2014"}</span
    >
    <span class="worker-ev__node" aria-hidden="true"
      ><span class="worker-ev__dot worker-ev__dot--${Hc(e)}"></span
    ></span>
    <div class="worker-ev__body">
      <div class="worker-ev__line1">
        <span class="worker-ev__what"
          >${Object.hasOwn(Wc,t.kind)?Wc[t.kind]:t.kind}</span
        >
        <span class="worker-ev__meta"
          >${t.target_base}@${Rs(t.target_sha)}${typeof t.elapsed_ms=="number"?` \xB7 ${Is(t.elapsed_ms)}`:""}</span
        >
        <span class="worker-ev__st worker-ev__st--${Hc(e)}"
          >${B_(e)}</span
        >
        ${t.dismissed?i`<span class="worker-ev__st worker-ev__st--quiet">접수됨</span>`:""}
        ${t.superseded_by?i`<span class="worker-ev__st worker-ev__st--quiet">덮임</span>`:""}
      </div>
      ${r?Vc(nc(t.failure_kind,n)):""}
      ${j_(t)}
      ${Gc([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:r?n:""},{term:"script",value:[t.script_path||"",t.script_blob_sha?`blob ${Rs(t.script_blob_sha)}`:"",Number.isInteger(t.exit_code)?`exit ${t.exit_code}`:""].filter(Boolean).join(" \xB7 ")},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function W_(e){let t=e.cleanup,r=Nr(t.step);return i`<li
    class="worker-ev"
    data-bead-id=${t.bead_id}
    data-state="cleanup_stalled"
  >
    <span
      class="worker-ev__t"
      title=${e.at?mt(e.at):""}
      >${Ls(e.at)||"\u2014"}</span
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
        ${Ql(t.step).map(n=>i`<li
              class="worker-step worker-step--${n.state}"
              data-step=${n.step}
            >
              <span class="worker-step__pip" aria-hidden="true"></span>
              <span class="worker-step__lb">${n.label}</span>
            </li>`)}
      </ol>
      ${Vc(Fs(t.reason),typeof t.retry_count=="number"&&t.retry_count>0?`${t.retry_count}\uD68C \uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uD6C4\uC5D0\uB3C4 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.`:"\uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.",!0)}
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
      ${Gc([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:t.reason||""},{term:"\uC9C4\uB2E8",value:t.detail||""},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function z_(e){return i`<section class="worker-repo-drawer" data-seam="repo-ops-timeline">
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
          ${e.events.map(t=>t.type==="cleanup"?W_(t):U_(t))}
        </ul>`}
  </section>`}function Yc(e,t={}){let r=null;function n(){je(r?z_(r):i``,e)}e.addEventListener("click",a=>{a.target?.closest?.('[data-seam="repo-ops-close"]')&&o()});function s(a){r={events:q_(a.operations,a.cleanup_failures),repo:a.repo||""},n()}function o(){r!==null&&(r=null,n(),t.onClose&&t.onClose())}return{open:s,close:o,isOpen:()=>r!==null,refresh(a){r&&s(a)}}}var H_="tab:worker:ready",G_="tab:worker:blocked",V_="tab:worker:in-progress",Y_="tab:worker:closed",Bs=1,Kc=5;function Zc(e){return vn(e).path.length>0}var Jc="beads-ui.worker.candidate-filter",aa={show_blocked:!1,spec:"all"};function K_(){try{let e=window.localStorage.getItem(Jc);if(!e)return{...aa};let t=JSON.parse(e);if(!t||typeof t!="object")return{...aa};let r=t.spec;return{show_blocked:t.show_blocked===!0,spec:r==="with"||r==="without"?r:"all"}}catch{return{...aa}}}function Z_(e){try{window.localStorage.setItem(Jc,JSON.stringify(e))}catch{}}function X_(e,t){let r=l=>t.show_blocked||!l.blocked,n=l=>t.spec==="all"||(t.spec==="with"?l.has_spec:!l.has_spec),s=[],o=0,a=0;for(let l of e){let c=r(l),u=n(l);c&&u?s.push(l):!c&&u?o+=1:c&&!u&&(a+=1)}return{visible:s,hidden_blocked:o,hidden_spec:a}}var Q_=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],ed="bdui.worker.candidate_sort",J_=[{value:"spec",label:"spec \uC6B0\uC120"},{value:"board",label:"Board \uC21C\uC11C"},{value:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131\uC21C"}],js="spec";function em(){try{let e=window.localStorage.getItem(ed);return e==="board"||e==="created"||e==="spec"?e:js}catch{return js}}function tm(e){try{window.localStorage.setItem(ed,e)}catch{}}var td="bdui.worker.done-range";function rm(){try{let e=window.localStorage.getItem(td);return Nt(e)?e:Lt}catch{return Lt}}function nm(e){try{window.localStorage.setItem(td,e)}catch{}}var sm="(max-width: 640px)",rd="beads-ui.worker.lane-collapsed",Rn={queue:!0,done:!0};function om(){try{let e=window.localStorage.getItem(rd);if(!e)return{...Rn};let t=JSON.parse(e);return!t||typeof t!="object"?{...Rn}:{queue:typeof t.queue=="boolean"?t.queue:Rn.queue,done:typeof t.done=="boolean"?t.done:Rn.done}}catch{return{...Rn}}}function am(e){try{window.localStorage.setItem(rd,JSON.stringify(e))}catch{}}function Xc(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let r=typeof t.title=="string"?t.title:t.id||"";return r.length>22?`${r.slice(0,22)}\u2026`:r}function im(e,t,r){let n=Array.isArray(e)?e.slice():[];return t==="created"?n.sort(Lr):(n.sort(Gn(r)),t==="board"?n:[...n.filter(Zc),...n.filter(s=>!Zc(s))])}function lm(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function cm(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function dm(e){let t=e?.blocked_info;if(t&&typeof t=="object"){let s=Array.isArray(t.blockers)?t.blockers.filter(o=>typeof o=="string"&&o.length>0):[];return s.length>0?`\u{1F512} ${s.join(", ")}`:"\u{1F512} blocked"}let n=(Array.isArray(e?.dependencies)?e.dependencies:[]).map(s=>{if(typeof s=="string")return s;if(!s||typeof s!="object")return"";let o=s.type??s.dependency_type;return o!==void 0&&o!=="blocks"?"":s.depends_on_id||s.id||""}).filter(Boolean);return n.length>0?`\u{1F512} ${n.join(", ")}`:"\u{1F512} blocked"}function Qc(e){switch(e){case"not_in_pr_wait":return"PR \uB300\uAE30 \uC0C1\uD0DC \uB3D9\uAE30\uD654 \uC2E4\uD328";case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";case"spec_id_missing":return"\uC2A4\uD399 ID \uAE30\uB85D \uC5C6\uC74C";default:return e}}function um(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}function pm(e){if(!e||typeof e!="object")return null;switch(e.state){case"pending":return{badge:"implementation review \uB300\uAE30",live:!1,alert:!1};case"reviewing":return{badge:"implementation review \uC911",live:!0,alert:!1};case"revising":return{badge:"review \uC218\uC815 \uC911 \xB7 1\uD68C",live:!0,alert:!1};case"failed":{let r=(typeof e.failure_reason=="string"?e.failure_reason:"").replace(/[\u0000-\u001f\u007f]/g," ").slice(0,120);return{badge:r.trim().length>0?`review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328: ${r.trim()}`:"review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328",live:!1,alert:!0}}default:return null}}function ia(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}function fm(e){if(!e||typeof e!="object")return null;let t=Number.isInteger(e.repair_sessions_used)?Math.max(0,e.repair_sessions_used):0,r=Number.isInteger(e.repair_session_cap)?Math.max(0,e.repair_session_cap):0,n=e.current_repair&&typeof e.current_repair=="object"?e.current_repair:null,s=n&&typeof n.pr_number=="number"?n.pr_number:null,o="";switch(e.phase){case"gating":o="root \uC7AC\uAC80\uC99D \uC911";break;case"repairing":o=e.subject_role==="root"?`\uC790\uB3D9\uBCF5\uAD6C ${t}/${r} \xB7 \uC6D0 PR \uC218\uC815 \uC911`:`\uC790\uB3D9\uBCF5\uAD6C ${t}/${r} \xB7 repair PR \uC900\uBE44 \uC911`;break;case"waiting_repair_pr":o=s?`repair PR #${s} \uB300\uAE30`:"repair PR \uB300\uAE30";break;case"merging":o=e.subject_role==="repair"?s?`repair PR #${s} \uBA38\uC9C0 \uC911`:"repair PR \uBA38\uC9C0 \uC911":"root \uBA38\uC9C0 \uC911";break;case"cleaning":o="\uC815\uB9AC \uBCF5\uAD6C \uC911";break;case"paused":o="\uC790\uB3D9\uBCF5\uAD6C \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":o=`\uC0AC\uB78C \uD655\uC778 \uD544\uC694 \xB7 ${e.terminal_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`;break;case"completed":return null;default:return null}let a=[o,`\uBCF5\uAD6C \uC138\uC158 ${t}/${r}`];return e.head_sha&&a.push(`head ${e.head_sha}`),e.base_sha&&a.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&a.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`),e.active_attempt_id&&a.push(`attempt ${e.active_attempt_id}`),n&&typeof n.bead_id=="string"&&a.push(`repair ${n.bead_id}`),e.evidence&&a.push(e.evidence),e.log_path&&a.push(e.log_path),{badge:o,title:a.join(`
`),alert:e.phase==="needs_human",lock_actions:e.phase!=="paused"&&e.phase!=="needs_human",repair_pr_url:n&&typeof n.pr_url=="string"?n.pr_url:"",repair_pr_number:s}}function _m(e){let t=e.queue_failure?`\uBA38\uC9C0 \uC2E4\uD328 \uC6D0\uBB38: ${e.queue_failure}`:e.auto_skip?`\uC790\uB3D9 \uC81C\uC678 \uC6D0\uBB38: ${e.auto_skip}`:"",r=(n,s={})=>{let o=[s.title||"",t].filter(Boolean);return{label:n,title:o.join(`
`),live:s.live===!0,alert:s.alert===!0}};return e.continuation_required?r("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694",{alert:!0}):e.merge_step?e.gate?.tier==="merged"?r("\uBA38\uC9C0\uB428",{title:e.merge_step.label,alert:e.merge_step.failed===!0}):r("\uBA38\uC9C0 \uC911",{title:e.merge_step.label,live:!0}):e.conflict_badge?r(e.conflict_badge,{live:e.conflict_live===!0}):e.head_review&&e.head_review.state!=="failed"?r("\uB9AC\uBDF0 \uC9C4\uD589 \uC911",{title:e.head_review.badge,live:e.head_review.live===!0}):e.recovery?.lock_actions?r("\uC790\uB3D9\uBCF5\uAD6C \uC911",{title:e.recovery.title,live:!0}):e.cleanup_failed?r(e.cleanup_label?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${e.cleanup_label}`:"\uC815\uB9AC \uBA48\uCDA4",{title:e.cleanup_failed.reason||"",alert:!0}):e.base_exception?r("\uB2E4\uB978 base \uB300\uC0C1",{title:e.base_exception,alert:!0}):e.conflicting?r("\uCDA9\uB3CC \uD574\uACB0 \uD544\uC694",{alert:!0}):e.gate?.reason==="base_behind"?r("base \uAC31\uC2E0 \uD544\uC694",{alert:!0}):e.gate?.reason==="review_receipt_missing"||e.gate?.reason==="review_receipt_stale"?r("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694",{alert:!0}):e.gate?.reason==="spec_id_missing"?r("\uC2A4\uD399 ID \uB204\uB77D",{title:"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id \uD544\uC694",alert:!0}):e.gate?.reason==="review_receipt_invalid"?r("\uB9AC\uBDF0 \uAE30\uB85D \uC624\uB958",{title:"review_receipt_invalid",alert:!0}):e.head_review?.state==="failed"?r("\uB9AC\uBDF0 \uC2E4\uD328",{title:e.head_review.failure_reason||"",alert:!0}):e.recovery?r(e.recovery.badge,{title:e.recovery.title,alert:!0}):e.gate?.tier==="verify"&&e.gate.gate_badge==="\uAC80\uC99D \uC2E4\uD328"?r("\uAC80\uC99D \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.queue_failure?r(`\uBA38\uC9C0 \uC2E4\uD328 \u2014 ${Qc(e.queue_failure)}`,{title:e.queue_failure,alert:!0}):e.auto_skip?r(`\uC790\uB3D9 \uC81C\uC678 \u2014 ${Qc(e.auto_skip)}`,{title:e.auto_skip,alert:!0}):e.queued&&!e.queue_active?r(`\uBA38\uC9C0 \uB300\uAE30 #${e.queue_position}`):e.gate?.enabled===!0?r("\uBA38\uC9C0 \uAC00\uB2A5"):e.gate?.tier==="merged"?r("\uBA38\uC9C0\uB428"):e.gate?.tier==="closed_unmerged"?r("\uB2EB\uD798",{alert:!0}):e.activity?r("\uD655\uC778 \uC911",{live:!0}):e.gate?.tier==="undecidable"||e.gate?.reason==="mergeability_unknown"?r("\uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.gate?.tier==="unobserved"||e.gate?.tier==="verify"||e.gate?.gate_badge==="\uAD00\uCE21 \uB300\uAE30"?r("\uD655\uC778 \uC911"):e.gate?.gate_badge?r(e.gate.gate_badge,{title:e.gate.reason||"",alert:e.gate.enabled!==!0}):null}function mm(e,t,r,n,s=null,o=null,a=null,l=!1,c=null,u=!0,f=null,_=null,b=null,E={},k=!1,M=!1,P={}){let A=!!c&&c.position>0,j=!!c?.continuation_action&&c.continuation_action.continuation===null,ee=!!c&&c.active===!0,x=c&&c.failure||null,w=r[e]||null,S=w&&w.gate?w.gate:null,H=w&&w.pr?w.pr:null,Y=fm(b),he=um(c?c.resolution:null),le=pm(c?c.head_review:null),se=c&&c.head_review||null,de=c&&c.authority||null,Ne=!!se&&["pending","reviewing","revising"].includes(se.state),Ue=A&&!ee&&(se?.state==="failed"||!de||de.source==="automatic"&&!M),Ge=a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":he?he.badge:a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":null,ze=!!S&&S.base_badge==="\uCDA9\uB3CC",Ze=!!S&&S.enabled===!0,qe=Ms({bead_id:e,merge_sha:P.merge_sha,cleanup_cursor:P.cleanup_cursor,merge_progress:o&&o.merge_progress?o.merge_progress:null,cleanup_failed:n,repo_operations:P.repo_operations}),ke=Ns(qe),we=!!n&&["child_sweep","branch_cleanup","parent_close"].includes(n.step)&&!!S&&S.tier==="merged",xe=l&&!!n&&!!S&&S.tier==="merged",Ie=Ue&&(Ze||ze||S?.reason==="base_behind"||S?.reason==="review_receipt_missing"||S?.reason==="review_receipt_stale"||we||xe),_e=l&&ze&&u===!1,X=sr(E,e,{external:l,merge_active:ee||qe?.step==="merge",merge_queued:A,conflict_active:!!a,cleanup_active:ke,merged:!!n||S?.tier==="merged"}),G=!!X.operation,$e=!we&&!!n&&n.step==="repo_operations",pe=_m({continuation_required:j,merge_step:qe,conflict_badge:Ge,conflict_live:he?.live===!0||a==="running",head_review:se&&le?{...le,state:se.state,failure_reason:se.failure_reason}:null,recovery:Y,cleanup_failed:n,cleanup_label:n?Nr(n.step):null,base_exception:_,conflicting:ze,gate:S,queue_failure:x,auto_skip:f,queued:A,queue_active:ee,queue_position:c?c.position:0,activity:Ge?null:o&&o.activity||null}),ae=pe?.live===!0&&pe.title?i`<span title=${pe.title}>${pe.label}</span>`:pe?.label||null;return{id:e,title:l?i`${t}<span class="muted"> · 세션</span>`:t,reason:n&&qe?.active!==!0?Ds(n.step):"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",worker_serial:k,external:l,pr_number:H&&typeof H.number=="number"?H.number:null,pr_url:H&&typeof H.url=="string"?H.url:"",completion_badge:pe?.live!==!0&&pe?.title?pe.label:null,completion_title:pe?.title||"",completion_repair_pr_url:Y?Y.repair_pr_url:"",completion_repair_pr_number:Y?Y.repair_pr_number:null,badges:ae?[ae]:[],live_badge:pe?.live===!0?ae:null,usage:s,alert:pe?.alert===!0,merge_action:S?.tier==="merged"&&!we&&!xe||$e?!1:!A||j||Ue,timeline_action:$e,cancel_action:A&&!j,cancel_enabled:(!ee||Ne)&&!(Y&&Y.lock_actions),cancel_title:Y&&Y.lock_actions?"\uC790\uB3D9\uBCF5\uAD6C \uC911 \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694":ee&&!Ne?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":Ne?"review \uC9C4\uD589\uC744 \uCDE8\uC18C\uD558\uACE0 \uBA38\uC9C0 \uAD8C\uD55C\uC744 \uD3D0\uAE30\uD569\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:X,discard_action:X.action,merge_step:qe,discard_enabled:X.enabled,discard_title:X.title,merge_enabled:!qe&&!a&&!G&&!_&&!(Y&&Y.lock_actions)&&!_e&&!$e&&(Ze||ze||S?.reason==="base_behind"||S?.reason==="review_receipt_missing"||S?.reason==="review_receipt_stale"||we||xe||Ie),merge_label:j?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":we||xe?"\uC815\uB9AC \uC7AC\uAC1C":ze&&!qe&&!we?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":S?.reason==="base_behind"?"base \uAC31\uC2E0 \uD6C4 \uBA38\uC9C0":S?.reason==="review_receipt_missing"||S?.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0":Ue?"\uB2E4\uC2DC \uBA38\uC9C0":void 0,merge_title:G?X.error?`\uD3D0\uAE30 \uC2E4\uD328: ${X.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${X.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:j?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":qe?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${qe.label}`:xe?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":_e?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":we?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":ze?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":S?.reason==="base_behind"?"base\uB97C \uC790\uB3D9 \uAC31\uC2E0\uD55C \uB4A4 \uBA38\uC9C0\uD569\uB2C8\uB2E4":S?.reason==="review_receipt_missing"||S?.reason==="review_receipt_stale"?"\uC790\uB3D9 \uB9AC\uBDF0 \uC138\uC158 \uD6C4 \uC2B9\uC778\uB418\uBA74 \uBA38\uC9C0\uD569\uB2C8\uB2E4":S?.reason==="spec_id_missing"?"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id\uB85C \uAE30\uB85D\uD55C \uB4A4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":Ze?`\uBA38\uC9C0 (${S.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:S&&S.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${S&&S.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function la(e,t={}){let{transport:r,issueStores:n,queueStore:s,analysisStore:o,sessionLogStore:a,uiOrderStore:l,gotoIssue:c,getWorkspacePath:u,doneRange:f,onDoneRangeChange:_}=t,b=n?Yn(n,l):null,E=Zn({transport:r,uiOrderStore:l}),k=null,M=[],P=K_(),A=em(),j=Nt(f)?f:rm(),ee=new Map;function x(){let p=tr.find(v=>v.value===j);return p?p.label:"\uC624\uB298"}let w=om(),S=!1,H=new Set,Y=new Set,he=new Set,le=new Set,se=[],de=document.createElement("div");de.className="worker-console";let Ne=document.createElement("div");Ne.className="worker-top";let Ue=document.createElement("div");Ue.className="worker-drawer-overlay",Ue.hidden=!0;let Ge=document.createElement("div");Ge.className="worker-drawer-overlay__backdrop";let ze=document.createElement("div");ze.className="worker-drawer-host";let Ze=document.createElement("div");Ze.className="worker-drawer-host",Ze.hidden=!0,Ue.append(Ge,ze,Ze);let qe=document.createElement("div");qe.className="worker-lanes-host",de.append(Ne,Ue,qe),e.appendChild(de);let ke=null,we=bs(ze,{transport:r,sessionLogStore:a,onClose:()=>{ke=null,Ue.hidden=!0,oe()}}),xe=Yc(Ze,{onClose:()=>{Ze.hidden=!0,Ue.hidden=!0,oe()}}),Ie=jc({getWorkspacePath:u||(()=>"")}),_e=u&&u()||"",X=Uc({queueStore:s,transport:r,onChanged:()=>oe(),onOpenScript:(p,v)=>{Ie.open(p,v)}}),G=o?Nc(de,{queueStore:s,analysisStore:o,transport:r}):null;function $e(){return s&&s.get()||{revision:0,auto_advance:!1,auto_merge:!1,slots:Bs,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]}}function pe(){let p=$e();return typeof p.revision=="number"?p.revision:0}function ae(p){p&&p.queue&&s&&s.set(p.queue)}function U(){let p=$e().queue;return Array.isArray(p)?p.length:0}async function B(p,v,F){if(!r)return;let re=()=>({bead_id:p,...v==="parallel"?{}:{lane:v},index:F,expected_revision:pe()}),q=await r("worker-queue-place",re());ae(q),q&&q.conflict&&await r("worker-queue-place",re()).then(ae)}async function T(p,v,F){if(!r)return;let re=()=>({bead_id:p,...v==="parallel"?{}:{lane:v},to_index:F,expected_revision:pe()}),q=await r("worker-queue-reorder",re());ae(q),q&&q.conflict&&await r("worker-queue-reorder",re()).then(ae)}async function z(p){if(!r)return;let v=await r("worker-queue-remove",{bead_id:p,expected_revision:pe()});ae(v),v&&v.conflict&&await r("worker-queue-remove",{bead_id:p,expected_revision:pe()}).then(ae)}async function R(p){if(!r||!p)return;let v=await r("worker-attempt-pause",{attempt_id:p});v&&v.paused===!1&&v.reason&&ie(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${v.reason}`,"error",2400)}async function K(p){if(!r||!p)return;let v=await Gr();if(v===null)return;let F=async(q={})=>await r("worker-attempt-resume",{attempt_id:p,expected_revision:pe(),...v!==""?{instructions:v}:{},...q}),re=await F();ae(re),re&&re.conflict&&(re=await F(),ae(re)),re=await lr(re,(q,y)=>F({continuation:q,decision_token:y}),{onResult:ae,refresh:()=>F()}),re&&re.resumed===!1&&!re.conflict&&re.reason&&ie(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${re.reason}`,"error",2400)}async function Z(p){if(!r||!p)return;let v=await r("worker-attempt-dismiss",{attempt_id:p,expected_revision:pe()});ae(v),v&&v.conflict&&(v=await r("worker-attempt-dismiss",{attempt_id:p,expected_revision:pe()}),ae(v)),v&&v.dismissed===!1&&!v.conflict&&v.reason&&ie(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${v.reason}`,"error",2400)}async function ce(p,v,F=!0){if(!r)return null;let re=r,q=await re(p,{...v,expected_revision:pe()});return ae(q),q&&q.conflict&&F&&(q=await re(p,{...v,expected_revision:pe()}),ae(q)),q}async function fe(p){if(!r||!p)return;let v=$e().merge_queue?.find(re=>re.bead_id===p)?.continuation_action;if(v?.mismatch&&v.continuation===null){await C(p,v.mismatch);return}H.add(p),oe();let F;try{F=await ce("worker-merge-queue-add",{bead_id:p})}finally{H.delete(p),oe()}!F||F.conflict||F.applied||ie("\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)","error",2400)}async function be(p){if(!(!r||!p||Y.has(p))){Y.add(p),oe();try{let v=await r("worker-cleanup-retry",{bead_id:p,expected_revision:pe()});ae(v),v&&!v.retried&&!v.conflict&&v.reason&&ie(`\uC815\uB9AC \uC7AC\uAC1C \uAC70\uBD80: ${v.reason}`,"error",2400)}finally{Y.delete(p),oe()}}}async function C(p,v){let F=await lr({continuation_mismatch:v},(q,y)=>ce("worker-merge-queue-add",{bead_id:p,continuation:q,decision_token:y},!1)),re=F?.queue?.merge_queue?.find(q=>q.bead_id===p)?.continuation_action;if(F?.applied!==!0&&re?.continuation===null&&re.mismatch){await C(p,re.mismatch);return}F&&F.applied===!1&&!F.conflict&&ie("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD\uC774 \uCD5C\uC2E0 \uC0C1\uD0DC\uC640 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4","error",2800)}async function N(p){if(!r)return;let v=await ce("worker-merge-auto-toggle",{on:p});!v||v.conflict||ie(p?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",p?"success":"info",2400)}async function te(p){if(!r||!p)return;let v=await ce("worker-merge-queue-remove",{bead_id:p});v&&!v.conflict&&!v.applied&&v.reason==="merge_active"&&ie("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function Q(){await ce("worker-merge-queue-remove",{all:!0})}async function $(p,v=null,F="unmerged",re=null){if(!r||!p)return;let q=xn(p,F);if(!(!!re||typeof globalThis.confirm!="function"||globalThis.confirm(q)))return;let I=await r("worker-discard",{bead_id:p,...v?{attempt_id:v}:{},...re?{operation_id:re}:{},expected_revision:pe()});if(ae(I),I&&I.conflict&&(I=await r("worker-discard",{bead_id:p,...v?{attempt_id:v}:{},...re?{operation_id:re}:{},expected_revision:pe()}),ae(I)),I&&I.discarded===!0){ie(Os(I),"success",5e3);return}if(I&&I.reason){ie(`\uD3D0\uAE30 \uC2E4\uD328: ${I.reason}`,"error",2800);return}if(I&&I.accepted&&I.pending==="merged_revert"){ie("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(I&&I.accepted&&!I.discarded){ie(`\uD3D0\uAE30 \uC9C4\uD589: ${I.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}I&&!I.conflict&&ie("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function D(p,v,F){if(!(!r||!v||!F||le.has(v))){le.add(v),oe();try{let re=await r(p,{bead_id:v,action_id:F,expected_revision:pe()});ae(re),re?.conflict?ie("\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694.","error",2800):!re?.ok&&re?.reason&&ie(`\uC774\uC804 \uC791\uC5C5 \uCC98\uB9AC \uAC70\uBD80: ${String(re.reason)}`,"error",2800)}finally{le.delete(v),oe()}}}async function V(p,v){if(!r||!v||he.has(v))return;he.add(v),oe();let F;try{let re=async(q={})=>await r(p,{bead_id:v,expected_revision:pe(),...q});F=await re(),ae(F),F&&F.conflict&&(F=await r(p,{bead_id:v,expected_revision:pe()}),ae(F)),p==="worker-revise-fix"&&(F=await lr(F,(q,y)=>re({continuation:q,decision_token:y}),{onResult:ae,refresh:()=>re()}))}finally{he.delete(v),oe()}if(!(!F||F.conflict)){if(F.ok){ie(p==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}ie(`\uCC98\uBD84 \uAC70\uBD80: ${F.reason||""}`,"error",3e3)}}async function Le(p){if(!r)return;let v=await r("worker-automation-toggle",{on:p,expected_revision:pe()});ae(v),v&&v.conflict&&await r("worker-automation-toggle",{on:p,expected_revision:pe()}).then(ae)}async function Re(p){if(!r||!p)return;let v=await r("worker-repo-operation-repair",{operation_id:p});if(ae(v),v&&v.ok===!1){ie(`\uD574\uACB0 \uC138\uC158 \uAC70\uBD80: ${v.reason||""}`,"error",3e3);return}v&&v.ok===!0&&ie("\uD574\uACB0 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4","success",2400)}async function Fe(p){if(!r||!p)return;let v=await r("worker-repo-operation-dismiss",{operation_id:p});ae(v),v&&v.ok===!1&&ie(`\uAE30\uB85D \uB2EB\uAE30 \uAC70\uBD80: ${v.reason||""}`,"error",3e3)}async function Ce(p){if(!r||!Number.isFinite(p))return;let v=Math.max(Bs,Math.floor(p)),F=await r("worker-queue-set-slots",{slots:v,expected_revision:pe()});ae(F),F&&F.conflict&&await r("worker-queue-set-slots",{slots:v,expected_revision:pe()}).then(ae)}async function et(p){if(!r||!Number.isInteger(p)||p<1||p>Kc)return;let v=$e(),F=(Array.isArray(v.serial_lanes)?v.serial_lanes:[]).slice(p).reduce((y,I)=>y+(Array.isArray(I?.entries)?I.entries.length:0),0),re=()=>({count:p,expected_revision:pe()}),q=await r("worker-queue-set-serial-lane-count",re());ae(q),q&&q.conflict&&(q=await r("worker-queue-set-serial-lane-count",re()),ae(q)),q&&q.applied&&F>0&&ie(`\uC9C1\uB82C \uB808\uC778 \uCD95\uC18C \u2014 ${F}\uAC1C \uD56D\uBAA9\uC774 \uBCD1\uB82C \uB300\uAE30\uB85C \uC774\uB3D9`)}function ht(){let p=$e(),v=b?b.selectBoardColumn(H_,"ready"):[],F=b?b.selectBoardColumn(G_,"blocked"):[],re=b?b.selectBoardColumn(Y_,"closed"):[],q=b?b.selectBoardColumn(V_,"in_progress"):[],y=new Map;for(let g of q){let O=cm(g);if(!O)continue;let ue=y.get(O);ue?ue.push(g):y.set(O,[g])}let I=g=>{let O=Kn(y.get(g)||[]);return O?O.title||O.id:null},ne=p.bead_titles||{},Ee=new Map;for(let[g,O]of Object.entries(ne))typeof O=="string"&&O.length>0&&Ee.set(g,O);for(let g of[...v,...F])Ee.set(g.id,g.title||g.id);let Je=p.bead_times&&typeof p.bead_times=="object"&&!Array.isArray(p.bead_times)?p.bead_times:{},Be=p.bead_labels&&typeof p.bead_labels=="object"&&!Array.isArray(p.bead_labels)?p.bead_labels:{},Ke=new Map;for(let[g,O]of Object.entries(Be))Array.isArray(O)&&Ke.set(g,sa(O));for(let g of[...v,...F]){let O=g.labels;Array.isArray(O)&&!Ke.has(g.id)&&Ke.set(g.id,sa(O))}let Se=new Map,d=o?.get()?.last_good?.result?.groups;for(let g of Array.isArray(d)?d:[]){if(g?.eligible!==!0||!Array.isArray(g.members))continue;let O=g.members.map(He=>{let dt=(Array.isArray(p.serial_lanes)?p.serial_lanes:[]).find(It=>It.entries.some(ut=>ut.bead_id===He));return dt?dt.id:null});if(!(O.every(He=>He!==null)&&new Set(O).size===1))for(let He of g.members)Se.set(He,g.members.filter(dt=>dt!==He))}let m=p.bead_blocked_by&&typeof p.bead_blocked_by=="object"&&!Array.isArray(p.bead_blocked_by)?p.bead_blocked_by:{},h=new Map;for(let[g,O]of Object.entries(Je))O&&typeof O=="object"&&h.set(g,O);for(let g of[...v,...F])h.set(g.id,{created_at:g.created_at,updated_at:g.updated_at});let L=g=>h.get(g)||{},me=p.pr_wait||[],ge=p.pr_observations||{},Te=p.pr_activity||{},Me=p.cleanup_failed||{},ft=Object.entries(Me).map(([g,O])=>({bead_id:g,step:O&&O.step?O.step:"",reason:O&&O.reason?O.reason:"",at:O&&typeof O.at=="number"?O.at:null,detail:O&&typeof O.detail=="string"?O.detail:null,output_tail:O&&typeof O.output_tail=="string"&&O.output_tail?O.output_tail:void 0,log_path:O&&typeof O.log_path=="string"&&O.log_path?O.log_path:void 0,retry_count:O&&typeof O.retry_count=="number"&&Number.isInteger(O.retry_count)&&O.retry_count>0?O.retry_count:0,failure_code:O&&typeof O.failure_code=="string"?O.failure_code:void 0,subject_id:O&&typeof O.subject_id=="string"?O.subject_id:void 0,repair_eligible:!!(O&&O.repair_eligible),repair:O&&O.repair?O.repair:void 0})),er=p.queue||[],Oe=new Set([...er.map(g=>g.bead_id),...(Array.isArray(p.serial_lanes)?p.serial_lanes:[]).flatMap(g=>(Array.isArray(g?.entries)?g.entries:[]).map(O=>O.bead_id)),...me.map(g=>g.bead_id),...p.done.map(g=>g.bead_id)]),ct=new Set(F.map(g=>g.id)),Jr=l?l.get()?.order||{}:{},pa=new Set,fa=[];for(let g of[...v,...F])Oe.has(g.id)||pa.has(g.id)||lm(g)||Mc(g.labels)||(pa.add(g.id),fa.push(g));M=im(fa,A,Jr);let md=p.admission||{},_a=g=>{let O=md[g];if(!O)return"";if(O.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let ue=typeof O.reason=="string"?O.reason:"",He=ue.indexOf(":");return He>0&&He<ue.length-1?`\u26D4 ${ue.slice(0,He)} (${ue.slice(He+1)})`:`\u26D4 ${ue}`},gd=M.map(g=>{let O=vn(g),ue=O.path.length>0,He=g.workflow?.route==="quick_fix"||g.metadata&&g.metadata.route==="quick_fix",dt=!He&&ue&&!O.conflict,It=ct.has(g.id),ut=[];It&&ut.push(dm(g)),He?ut.push("quick_fix \xB7 \uC6CC\uCEE4 \uBE44\uB300\uC0C1"):O.conflict?ut.push("spec_id_conflict"):ue||ut.push("spec \uC5C6\uC74C");let nt=_a(g.id);return nt&&ut.push(nt),{id:g.id,title:g.title||g.id,reason:ut.join(" \xB7 "),draggable:dt,lane:"candidate",created_at:g.created_at,updated_at:g.updated_at,workflow:g.workflow,is_quick_fix:He,status:g.status,blocked:It,has_spec:ue}}),Us=X_(gd,P),bd=Us.visible,hd=p.revise_parked||{},In=p.discard_operations&&typeof p.discard_operations=="object"&&!Array.isArray(p.discard_operations)?p.discard_operations:{},Ws=(g,O)=>g.map((ue,He)=>{let dt=O!=="done",It=O!=="done"&&O!=="queue",ut=dt?hd[ue.bead_id]:null,nt=dt?sr(In,ue.bead_id):null,Nn=nt?.operation?nt:null,Id=dt&&Ke.get(ue.bead_id)===!0,Fa=m[ue.bead_id]||[],Ks=p.admission&&typeof p.admission=="object"?p.admission[ue.bead_id]:null,Zs=dt?Zl(Ks,!!Nn||le.has(ue.bead_id)):null,Ld=dt&&!Zs?_a(ue.bead_id):null,Od=dt?[Ld]:[],qa=dt&&Fa.length>0&&typeof Ks?.reason=="string"&&Ks.reason.startsWith("not_ready")?[`\u23F8 ${Fa.join(", ")} \uC644\uB8CC \uB300\uAE30 (blocks)`]:[],Xs=dt?Se.get(ue.bead_id):void 0;return Xs&&Xs.length>0&&qa.push(`\u2733 serial \uAD8C\uC7A5 \xB7 ${Xs.join(", ")}\uC640`),{id:ue.bead_id,title:Ee.get(ue.bead_id)||ue.bead_id,reason:Od.filter(Boolean).join(" \xB7 "),draggable:dt&&!Nn&&!Zs,done:O==="done",lane:O,seq:It?He+1:void 0,worker_serial:Id,discard:Nn,stale_work:Zs,badges:[...qa,...ut?["\u23F8 REVISE \uD30C\uD0B9"]:[]],alert:!!ut,revise_action:!!ut,revise_enabled:!!ut&&!Nn&&!he.has(ue.bead_id),revise_title:ut?ut.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${ut.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":"",usage:O==="done"?Ft(p.attempts||{},ue.bead_id):null,work_ms:O==="done"?Yl(p.attempts||{},ue.bead_id):null,done_at:O==="done"&&typeof ue.added_at=="number"?ue.added_at:void 0,...L(ue.bead_id)}}),qr=p.attempts?Object.values(p.attempts):[],zs=new Set;for(let g of qr)g&&typeof g.resumed_from=="string"&&g.resumed_from.length>0&&zs.add(g.resumed_from);let ma=new Map;for(let g of qr)ma.set(g.bead_id,g.attempt_id);let Hs=new Map;for(let g of qr)Hs.set(g.attempt_id,g);function Gs(g){let O=new Set,ue=g;for(;ue&&!O.has(ue.attempt_id);){if(ue.conflict_resolution===!0)return!0;O.add(ue.attempt_id),ue=typeof ue.resumed_from=="string"&&ue.resumed_from.length>0&&Hs.get(ue.resumed_from)||null}return!1}let Ln=typeof p.declared_base=="string"?p.declared_base:null;function yd(g){let O=null;for(let ue of qr)!ue||ue.bead_id!==g||Gs(ue)||(O===null||(typeof ue.started_at=="number"?ue.started_at:0)>=(typeof O.started_at=="number"?O.started_at:0))&&(O=ue);return O&&typeof O.target_base=="string"?O.target_base:null}let ga=[],ba=[],vd=Dc(p),ha=g=>{let O=typeof g.session_id=="string"&&g.session_id.length>0,ue=zs.has(g.attempt_id);return{eligible:O&&!ue,reason:O?ue?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}},Wt=null;for(let g of qr){let O=g.status==="paused"&&!zs.has(g.attempt_id);if(g.status==="running"||O)ba.push({bead_id:g.bead_id,attempt_id:g.attempt_id,title:Ee.get(g.bead_id)||g.bead_id,runner:g.runner||null,model:g.model||null,effort:g.effort||null,speed:g.speed||null,continuation_mode:g.continuation_mode||null,started_at:typeof g.started_at=="number"?g.started_at:null,resumed_from:g.resumed_from||null,paused:O,conflict_resolution:Gs(g),base_exception:ia(Ln,g.target_base),can_pause:typeof g.session_id=="string"&&g.session_id.length>0,discard:sr(In,g.bead_id,{attempt_id:g.attempt_id}),usage:Ft(p.attempts||{},g.bead_id),current_child:I(g.bead_id),...L(g.bead_id)});else if((g.status==="failed"||g.status==="orphaned")&&vd(g)){let ue=ha(g);ga.push({bead_id:g.bead_id,attempt_id:g.attempt_id,title:Ee.get(g.bead_id)||g.bead_id,runner:g.runner||null,model:g.model||null,effort:g.effort||null,speed:g.speed||null,continuation_mode:g.continuation_mode||null,started_at:typeof g.started_at=="number"?g.started_at:null,resumed_from:g.resumed_from||null,failed:!0,status:g.status,status_label:g.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328",discard:sr(In,g.bead_id,{attempt_id:g.attempt_id}),resume_eligible:ue.eligible,resume_reason:ue.reason,conflict_resolution:Gs(g),base_exception:ia(Ln,g.target_base),usage:Ft(p.attempts||{},g.bead_id),current_child:I(g.bead_id),...L(g.bead_id)}),Wt=g}}let On=[...ga,...ba],ya=null;if(Wt){let g=ha(Wt),O=Wt.cause_detail;ya={bead_id:Wt.bead_id,repo:Wt.repo||"",reason:Wt.cause||Wt.status,cause_detail:O&&typeof O.reason=="string"?{reason:O.reason,command:typeof O.command=="string"?O.command:null}:null,resume_attempt_id:Wt.attempt_id,resume_eligible:g.eligible,resume_reason:g.reason,discard:sr(In,Wt.bead_id,{attempt_id:Wt.attempt_id})}}let va=new Set(On.map(g=>g.bead_id)),Vs=Array.isArray(p.merge_queue)?p.merge_queue:[],wa=new Map,ka=new Map,$a=new Map,xa=new Map,Sa=new Map;Vs.forEach((g,O)=>{g&&typeof g.bead_id=="string"&&(wa.set(g.bead_id,O+1),ka.set(g.bead_id,g.resolution),$a.set(g.bead_id,g.continuation_action||null),xa.set(g.bead_id,g.head_review||null),Sa.set(g.bead_id,g.authority||null))});let Aa=p.merge_queue_state||{active:null,failures:{}},wd=Aa.failures||{},kd=p.auto_merge_skips||{},Ea=g=>{let O=kd[g];if(!O)return null;let ue=ge[g],He=ue&&ue.pr?ue.pr.head_sha:null;return He&&He===O.head_sha?O.reason||"":null},Pn=new Map;for(let g of On)g.failed!==!0&&g.conflict_resolution&&(g.paused?Pn.has(g.bead_id)||Pn.set(g.bead_id,"paused"):Pn.set(g.bead_id,"running"));let Ta=On.filter(g=>!g.paused&&g.failed!==!0).length,Ca=(p.workspace_info||{}).slots,Ra=typeof Ca=="number"?Ca:typeof p.slots=="number"?p.slots:Bs,$d=Ta>Ra,Dn=Rr(j),xd=(Array.isArray(p.done)?p.done.slice():[]).filter(g=>Dn===void 0||typeof g.added_at!="number"||g.added_at>=Dn).sort((g,O)=>(O.added_at||0)-(g.added_at||0)),en=Ws(xd,"done"),Sd=new Set((Array.isArray(p.done)?p.done:[]).map(g=>g?.bead_id).filter(g=>typeof g=="string")),Ia=[],Ad=u?.()||"";for(let g of re){let O=Or(g.closed_at);if(typeof g.id!="string"||Sd.has(g.id)||O===null||Dn!==void 0&&O<Dn||typeof g.comment_count!="number"||g.comment_count<=0)continue;let ue=`${Ad}\0${g.id}\0${String(g.updated_at)}\0${g.comment_count}`,He=ee.get(ue);He===void 0&&r&&(ee.set(ue,"pending"),Promise.resolve(r("get-comments",{id:g.id})).then(dt=>{let It=Array.isArray(dt)&&dt.some(ut=>hs(typeof ut?.text=="string"?ut.text:"")?.lane==="session");ee.set(ue,It?"session":"not-session"),oe()}).catch(()=>{ee.set(ue,"failed"),oe()})),He==="session"&&Ia.push({id:g.id,title:g.title||g.id,reason:"",draggable:!1,done:!0,lane:"done",selectable:!1,selected:!1,worker_serial:!1,badges:["\uC138\uC158 \uC791\uC5C5"],alert:!1,usage:null,work_ms:null,done_at:O,created_at:g.created_at,updated_at:g.updated_at})}en.push(...Ia),en.sort((g,O)=>(O.done_at||0)-(g.done_at||0));let Mn={};for(let g of cr)Mn[g]=0;let La=!1,Oa=0,Ys=0,Pa=0;for(let g of en){let O=g.usage;if(O&&typeof O=="object"){let ue=!1;for(let He of cr)Number.isFinite(O[He])&&(Mn[He]+=O[He],La=!0,ue=!0);ue&&(Ys+=1,Number.isFinite(O.total_cost_usd)&&(Oa+=O.total_cost_usd,Pa+=1))}}Ys>0&&Pa===Ys&&(Mn.total_cost_usd=Oa);let Da=en.map(g=>g.usage).filter(g=>g&&typeof g=="object"&&g.providers),Ed=Da.length>0?bt(ns(Da)):La?Ht(Mn):null,Td=p.lane_states&&typeof p.lane_states=="object"&&!Array.isArray(p.lane_states)?p.lane_states:{},Cd=Array.isArray(p.serial_lanes)?p.serial_lanes:[],Ma=g=>{if(me.some(He=>He.bead_id===g))return"PR \uB300\uAE30 \xB7 \uC810\uC720";let O=qr.filter(He=>He&&He.bead_id===g),ue=O.length>0?O[O.length-1].status:null;return ue==="failed"||ue==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":ue==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720"},Na=Cd.filter(g=>g&&typeof g.id=="string"&&Array.isArray(g.entries)).map((g,O)=>{let ue=Td[g.id]||{},He=new Map((Array.isArray(ue.corrections)?ue.corrections:[]).filter(nt=>nt&&typeof nt.bead_id=="string"&&typeof nt.after=="string").map(nt=>[nt.bead_id,nt.after])),dt=Ws(g.entries.filter(nt=>!va.has(nt.bead_id)),g.id).map(nt=>He.has(nt.id)?{...nt,badges:[`\u{1F517} ${He.get(nt.id)} \uB4A4 (blocks \uC790\uB3D9)`,...nt.badges]}:nt),It=Array.isArray(ue.occupied_by)?ue.occupied_by.filter(nt=>typeof nt=="string"):[],ut=It.map(nt=>({id:nt,title:Ee.get(nt)||nt,draggable:!1,lane:g.id,ghost:!0,badges:[Ma(nt)]}));return{id:g.id,index:O+1,rows:[...ut,...dt],occupied:It.length>0,badge:It.length>0?Ma(It[0]):"\uB300\uAE30",cycle:ue.cycle===!0}}),Rd=typeof p.serial_lane_count=="number"?p.serial_lane_count:Na.length;return{queue:p,idToTitle:Ee,candidates:bd,candidate_hidden:{blocked:Us.hidden_blocked,spec:Us.hidden_spec},running:On,live_count:Ta,slots:Ra,over_cap:$d,failure:ya,waiting:Ws(er.filter(g=>!va.has(g.bead_id)),"queue"),serial_lanes:Na,serial_lane_count:Rd,pr_wait:me.map(g=>mm(g.bead_id,Ee.get(g.bead_id)||g.bead_id,ge,Me[g.bead_id]||null,Ft(p.attempts||{},g.bead_id),Te[g.bead_id]||(H.has(g.bead_id)||Y.has(g.bead_id)?{activity:null,merge_progress:{step:"merging"}}:null),Pn.get(g.bead_id)||null,g.external===!0,{position:wa.get(g.bead_id)||0,active:Aa.active===g.bead_id,failure:wd[g.bead_id]||null,resolution:ka.get(g.bead_id),continuation_action:$a.get(g.bead_id),head_review:xa.get(g.bead_id)||null,authority:Sa.get(g.bead_id)||null},g.wt_present!==!1,p.auto_merge===!0?Ea(g.bead_id):null,ia(Ln,yd(g.bead_id)),p.completion_status&&typeof p.completion_status=="object"&&!Array.isArray(p.completion_status)&&p.completion_status[g.bead_id]||null,p.discard_operations&&typeof p.discard_operations=="object"&&!Array.isArray(p.discard_operations)?p.discard_operations:{},Hs.get(ma.get(g.bead_id)||"")?.worker_serial===!0,p.auto_merge===!0,{merge_sha:g.merge_sha,cleanup_cursor:g.cleanup_cursor,repo_operations:Array.isArray(p.repo_operations)?p.repo_operations:[]})).map(g=>({...g,...L(g.id)})),merge_queue_length:Vs.length,merge_queue_running:Vs.length>0,auto_excluded:me.map(g=>g.bead_id).filter(g=>Ea(g)!==null),declared_base:Ln,done:en,token_total:Ed,cleanup_failures:ft,repo_operations:Array.isArray(p.repo_operations)?p.repo_operations:[]}}function yt(){let v=!!o?.get()?.job,F=!v&&o?.isPending?.()===!0,re=v?"\uBD84\uC11D \uC911":F?"\uC900\uBE44 \uC911":"";return i`<button
      type="button"
      class=${re?"worker-analysis-btn worker-analysis-btn--running":"worker-analysis-btn"}
      aria-busy=${re?"true":"false"}
      title="대기 이슈의 병렬 실행 가능성을 분석해 직렬 그룹을 제안합니다 (클릭할 때만 실행)"
    >
      ✳ 병렬성
      분석${re?i`<span class="worker-analysis-btn__badge">${re}</span>`:""}
    </button>`}function ot(p){let v=p.waiting.length>0?p.waiting[0].id:"\u2014",F=i`<button
      type="button"
      class="worker-play${p.queue.auto_advance?" is-active":""}"
    >
      ${p.queue.auto_advance?"\u23F8 \uC790\uB3D9\uD654 \uBA48\uCDA4":"\u25B6 \uC790\uB3D9\uD654"}
    </button>`,re=J(p),q=p.over_cap?i`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",y=i`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${p.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${p.pr_wait.length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${x()} 완료 <b>${p.done.length}</b></span
      >`,I=i`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${p.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${p.declared_base||"?"}</span
    >`,ne=i`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${Bs}
          step="1"
          .value=${String(p.slots)}
          title="동시에 실행할 세션 수 (최소 1 = 순차 실행)"
      /></label>
      <label
        class="worker-tgl worker-serial-lanes"
        title="고정 직렬 레인 수 (1~5). 축소 시 잘린 레인의 대기 항목은 병렬 대기로 돌아갑니다"
        >직렬 레인
        <select class="worker-serial-lane-count" aria-label="직렬 레인 수">
          ${Array.from({length:Kc},(Be,Ke)=>Ke+1).map(Be=>i`<option
                value=${String(Be)}
                ?selected=${p.serial_lane_count===Be}
              >
                ${Be}
              </option>`)}
        </select>
      </label>
      ${o?yt():""} `,Ee=oc({failure:p.failure}),Je=Kl(p.repo_operations,p.cleanup_failures);return S?i`<div class="worker-ribbon">
          ${F} ${re}
          <div class="worker-kpi worker-kpi--ribbon">${q}${y}</div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${ne}</div>
          <div class="worker-kpi">${I}</div>
        </div>
        ${Je}${X.template()}${Ee}`:i`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${F}${re}${ne}</div>
        <div class="worker-kpi">
          ${q}${y}${I}
          ${(Array.isArray(p.token_total)?p.token_total:p.token_total?[{label:p.token_total,tooltip:`${x()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(Be=>i`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${Be.tooltip}
                >${x()} 완료 · 누적 ${Be.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${v}</b></span
          >
        </div>
      </div>
      ${Je}${X.template()}${Ee}`}function $t(p){if(p.running.length===0&&p.pr_wait.length===0)return"";let v=p.running.some(F=>!F.paused&&F.failed!==!0);return i`<section
      class="worker-now${v?" worker-pane--live":""}"
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
      ${p.running.length>0?Xo(p.running,Date.now(),ke):""}
      ${p.pr_wait.map(F=>Ho(F))}
    </section>`}function it(p){let v=p.candidate_hidden;return i`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${P.show_blocked}
        />
        🔒 blocked${v.blocked>0?` ${v.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${Q_.map(F=>i`<button
              type="button"
              class="worker-filter__chip${P.spec===F.value?" is-active":""}"
              data-spec=${F.value}
              aria-pressed=${P.spec===F.value?"true":"false"}
            >
              ${F.label}
            </button>`)}
        ${v.spec>0?i`<span class="worker-filter__hidden">숨김 ${v.spec}</span>`:""}
      </div>
    </div>`}function st(){return i`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${A}
    >
      ${J_.map(p=>i`<option value=${p.value} ?selected=${A===p.value}>
            ${p.label}
          </option>`)}
    </select>`}function pt(){return i`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${j}
      >
        ${tr.map(p=>i`<option value=${p.value} ?selected=${j===p.value}>
              ${p.label}
            </option>`)}
      </select>
    </div>`}function W(p){let v=i`<span
      class="worker-lane__badge${p.occupied?" worker-lane__badge--held":""}"
      >${p.badge}</span
    >`,F=p.cycle?i`<div class="worker-lane__cycle">
          ⚠ blocks 순환 감지 — 자동 정렬을 생략했습니다
        </div>`:"";return Kt({id:`worker-pane-lane-${p.id}`,lane:p.id,title:`\uC9C1\uB82C ${p.index}`,items:p.rows,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uD589\uC744 \uC5EC\uAE30\uB85C \uB4DC\uB798\uADF8",header_control:v,controls:F})}function J(p){let v=p.queue.auto_merge===!0;if(p.merge_queue_running)return i`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop${v?" is-active":""}"
        title=${v?"\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB044\uACE0 \uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)":"\uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)"}
      >
        ${v?"\u23F8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8":"\uC77C\uAD04 \uBA38\uC9C0 \uC911\uB2E8"} ${p.merge_queue_length}
      </button>`;if(v)return i`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop is-active"
        title="자동 머지 켜짐 — 자격이 생기는 PR을 계속 큐에 넣습니다. 클릭하면 끕니다"
      >
        ⏸ 자동 머지
      </button>`;let F=new Set(p.auto_excluded),re=p.pr_wait.filter(q=>q.merge_action&&q.merge_enabled&&!F.has(q.id)).length;return i`<button
      type="button"
      class="worker-merge-all"
      title="켜 두면 자격이 생기는 PR을 계속 큐에 넣어 순서대로 충돌 해소·머지합니다"
    >
      ▶ 자동 머지${re>0?` ${re}`:""}
    </button>`}function ye(p){let v=Kt({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:p.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:st(),controls:it(p)});return S?i`<div class="worker-lanes worker-lanes--mobile">
        ${$t(p)}
        ${Kt({id:"worker-pane-queue",lane:"queue",title:"\uBCD1\uB82C \uB300\uAE30",items:p.waiting,empty:"\uB4DC\uB798\uADF8 \uB610\uB294 [\uB300\uAE30\uB85C \u21B4]\uB85C \uBC30\uCE58",collapsible:!0,collapsed:w.queue,preview:Xc(p.waiting)})}
        ${p.serial_lanes.map(F=>W(F))}
        ${v}
        ${Kt({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:p.done,empty:`${x()} \uC644\uB8CC \uC5C6\uC74C`,controls:pt(),collapsible:!0,collapsed:w.done,preview:Array.isArray(p.token_total)?p.token_total.map(F=>F.label).join(" \xB7 "):p.token_total||Xc(p.done)})}
      </div>`:i`<div class="worker-lanes">
      ${v}
      <div class="worker-wait">
        ${Kt({id:"worker-pane-queue",lane:"queue",title:"\uBCD1\uB82C \uB300\uAE30",items:p.waiting,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58"})}
        ${p.serial_lanes.map(F=>W(F))}
      </div>
      ${Kt({id:"worker-pane-running",lane:"running",title:`\uC2E4\uD589 \uC911 \xB7 \uC2AC\uB86F ${p.slots}`,items:p.running,live:p.running.some(F=>!F.paused&&F.failed!==!0),body:Xo(p.running,Date.now(),ke)})}
      ${Kt({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:p.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C"})}
      ${Kt({id:"worker-pane-done",lane:"done",title:`\uC644\uB8CC \xB7 ${x()} ${p.done.length}`,items:p.done,empty:`${x()} \uC644\uB8CC \uC5C6\uC74C`,controls:pt()})}
    </div>`}function ve(p){w={...w,[p]:!w[p]},am(w),oe()}function oe(){let p=ht();je(ot(p),Ne),je(ye(p),qe)}function De(){let p=document.querySelector(".app-header");if(!p)return;let v=()=>{let F=Math.round(p.getBoundingClientRect().height);de.style.setProperty("--worker-ribbon-top",`${F}px`)};if(v(),typeof ResizeObserver=="function"){let F=new ResizeObserver(v);F.observe(p),se.push(()=>F.disconnect())}else window.addEventListener("resize",v),se.push(()=>window.removeEventListener("resize",v))}function tt(){if(typeof window.matchMedia!="function")return;let p=window.matchMedia(sm);S=!!p.matches;let v=F=>{let re=!!(F&&typeof F.matches=="boolean"?F.matches:p.matches);re!==S&&(S=re,oe())};typeof p.addEventListener=="function"?(p.addEventListener("change",v),se.push(()=>p.removeEventListener("change",v))):typeof p.addListener=="function"&&(p.addListener(v),se.push(()=>p.removeListener(v)))}let Ye=null;function Pe(p){Ye=p.target instanceof Element?p.target:null}function Xe(p){let F=p.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!F)return;if(Ye&&F.contains(Ye)&&Ye.closest("input, button, a")){p.preventDefault();return}let re=F.dataset.beadId||"",q=F.dataset.lane||"";k={bead_id:re,from_lane:q};try{p.dataTransfer?.setData("text/plain",re),p.dataTransfer&&(p.dataTransfer.effectAllowed="move")}catch{}}function Ae(p){let v=p.target?.closest?.(".worker-pane");if(!v)return;let F=v.dataset.lane||"";F!=="candidate"&&F!=="queue"&&!/^s[1-5]$/.test(F)||(p.preventDefault(),p.dataTransfer&&(p.dataTransfer.dropEffect="move"),v.classList.add("worker-pane--drag-over"))}function _t(p){p.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function Tt(p,v){let F=M.find(I=>I.id===p);if(!F)return;let re=M.filter(I=>I.id!==p),q=re.length;if(v){let I=v.dataset.beadId;if(I===p)return;let ne=re.findIndex(Ee=>Ee.id===I);ne>=0&&(q=ne)}let y=re.slice();y.splice(q,0,F),E.applyReorder(p,y,q)}function Pt(p){let v=p.target?.closest?.(".worker-pane");if(!v)return;p.preventDefault(),v.classList.remove("worker-pane--drag-over");let F=v.dataset.lane||"",re=k?.bead_id||p.dataTransfer?.getData("text/plain")||"",q=k?.from_lane||"";if(k=null,!re)return;let y=p.target?.closest?.(".worker-mini, .worker-card"),I=Array.from(v.querySelectorAll(".worker-mini, .worker-card")),ne=I.length;if(y){let Ee=I.indexOf(y);Ee>=0&&(ne=Ee)}if(ne=Math.max(0,ne-v.querySelectorAll(".worker-mini--ghost").length),v.classList.contains("worker-pane--collapsed")&&(ne=U()),F==="candidate"){if(q==="candidate"){Tt(re,y);return}(q==="queue"||/^s[1-5]$/.test(q))&&z(re);return}if(F==="queue"||/^s[1-5]$/.test(F)){let Ee=F==="queue"?"parallel":F;q===F?T(re,Ee,ne):B(re,Ee,ne)}}function Dt(p){P=p,Z_(p),oe()}function xr(p){A=p==="board"||p==="created"||p==="spec"?p:js,tm(A),oe()}function vt(p){j=Nt(p)?p:Lt,nm(j),_?.(j),oe()}function kt(p){let v=p.target?.closest?.(".worker-serial-lane-count");if(v){let ne=Number.parseInt(v.value,10);Number.isFinite(ne)&&et(ne).then(oe);return}let F=p.target?.closest?.(".worker-filter__blocked");if(F){Dt({...P,show_blocked:F.checked});return}let re=p.target?.closest?.(".worker-done-range");if(re){vt(re.value);return}let q=p.target?.closest?.(".worker-sort");if(q){xr(q.value||js);return}let y=p.target?.closest?.(".worker-slots__input");if(!y)return;let I=Number.parseInt(y.value,10);if(!Number.isFinite(I)){oe();return}Ce(I).then(oe)}function Qt(p){return p?{runner:p.runner||void 0,model:p.model||void 0,effort:p.effort||void 0,worktree:p.worktree||void 0,status:p.status||void 0,session_id:p.session_id||void 0}:{}}function or(){let p=ht();return{operations:p.repo_operations,cleanup_failures:p.cleanup_failures,repo:u&&u()||""}}function jt(){ke&&we.close(),Ze.hidden=!1,Ue.hidden=!1,xe.open(or()),oe()}function Ut(p){let v=$e(),F=v.attempts?v.attempts[p]:null;ke=p,xe.close(),Ze.hidden=!0,Ue.hidden=!1,we.open({attempt_id:p,meta:Qt(F)}),oe()}function wt(){if(xe.isOpen()&&xe.refresh(or()),!ke)return;let p=$e(),v=p.attempts?p.attempts[ke]:null;if(v){we.updateMeta(Qt(v));return}we.close()}function Jt(p){let v=p.target;if(v?.closest?.(".worker-mini__serial, .worker-mini__grip")||v?.closest?.("#worker-parallel-analysis-dialog"))return;if(v?.closest?.(".worker-analysis-btn")){G?.open();return}if(v?.closest?.(".worker-repo-strip")||v?.closest?.(".worker-mini__timeline")){jt();return}let F=v?.closest?.(".worker-repo-op__session");if(F){let Oe=F.dataset.attemptId;Oe&&Ut(Oe);return}let re=v?.closest?.(".worker-repo-op__resolve");if(re){Re(re.dataset.operationId||"");return}let q=v?.closest?.(".worker-repo-op__dismiss");if(q){Fe(q.dataset.operationId||"");return}let y=v?.closest?.(".worker-cleanup__resume");if(y){let Oe=y.dataset.beadId;Oe&&be(Oe);return}let I=v?.closest?.(".worker-banner__resume");if(I){let Oe=I.dataset.attemptId;Oe&&K(Oe);return}let ne=v?.closest?.(".worker-banner__discard");if(ne){let Oe=ne.dataset.confirmation==="merged"?"merged":"unmerged";$(ne.dataset.beadId||"",ne.dataset.attemptId||null,Oe,ne.dataset.operationId||null);return}let Ee=v?.closest?.(".worker-banner__dismiss");if(Ee){let Oe=Ee.dataset.attemptId;Oe&&Z(Oe);return}if(v?.closest?.(".worker-play")){Le(!$e().auto_advance);return}let Je=v?.closest?.(".worker-merge-all");if(Je){Je.classList.contains("worker-merge-all--stop")?$e().auto_merge===!0?N(!1):Q():N(!0);return}let Be=v?.closest?.(".worker-pane__hd--toggle");if(Be){let Oe=Be.dataset.lane;(Oe==="queue"||Oe==="done")&&ve(Oe);return}let Ke=v?.closest?.(".worker-card__place");if(Ke){let Oe=Ke.dataset.beadId;Oe&&!Ke.disabled&&B(Oe,"parallel",U());return}let Se=v?.closest?.(".worker-filter__chip");if(Se){let Oe=Se.dataset.spec;(Oe==="all"||Oe==="with"||Oe==="without")&&Dt({...P,spec:Oe});return}let d=v?.closest?.(".worker-mini__merge");if(d){let Oe=d.dataset.beadId||"";$e().cleanup_failed?.[Oe]?be(Oe):fe(Oe);return}let m=v?.closest?.(".worker-mini__merge-cancel");if(m){te(m.dataset.beadId||"");return}let h=v?.closest?.(".worker-mini__discard");if(h){$(h.dataset.beadId||"",h.dataset.attemptId||null,h.dataset.discardMode==="merged"?"merged":"unmerged",h.dataset.operationId||null);return}let L=v?.closest?.(".worker-mini__stale-continue");if(L){D("worker-stale-work-continue",L.dataset.beadId||"",L.dataset.actionId||"");return}let me=v?.closest?.(".worker-mini__stale-backup");if(me){D("worker-stale-work-backup-fresh",me.dataset.beadId||"",me.dataset.actionId||"");return}let ge=v?.closest?.(".worker-mini__stale-recheck");if(ge){D("worker-stale-work-recheck",ge.dataset.beadId||"",ge.dataset.actionId||"");return}let Te=v?.closest?.(".worker-mini__revise-fix");if(Te){V("worker-revise-fix",Te.dataset.beadId||"");return}let Me=v?.closest?.(".worker-mini__revise-approve");if(Me){V("worker-revise-approve",Me.dataset.beadId||"");return}if(v?.closest?.(".worker-mini__pr"))return;if(v?.closest?.(".rtile__discard")){let Oe=v?.closest?.(".rtile"),ct=Oe?.dataset?.beadId,Jr=Oe?.dataset?.attemptId;ct&&$(ct,Jr||null,"unmerged",v?.closest?.(".rtile__discard")?.dataset.operationId||null);return}if(v?.closest?.(".rtile__dismiss")){let ct=v?.closest?.(".rtile")?.dataset?.attemptId;ct&&Z(ct);return}if(v?.closest?.(".rtile__pause")){let ct=v?.closest?.(".rtile")?.dataset?.attemptId;ct&&R(ct);return}if(v?.closest?.(".rtile__resume")){let ct=v?.closest?.(".rtile")?.dataset?.attemptId;ct&&K(ct);return}if(v?.closest?.(".rtile__session")){let ct=v?.closest?.(".rtile")?.dataset?.attemptId;ct&&Ut(ct);return}if(v?.closest?.(".worker-drawer-overlay__backdrop")){xe.close(),we.close();return}if(v?.closest?.(".worker-drawer-host"))return;let ft=v?.closest?.(".rtile");if(ft){if(v?.closest?.(".rtile__id")){let ct=ft.dataset.beadId;ct&&ir(ct).then(Jr=>{Jr?ie("\uBCF5\uC0AC\uB428","success",1200):ie("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let Oe=ft.dataset.beadId;Oe&&c&&c(Oe);return}let er=v?.closest?.(".worker-mini, .worker-card");if(er){let Oe=er.dataset.beadId;if(v?.closest?.(".worker-mini__id, .worker-card__id")){Oe&&ir(Oe).then(ct=>{ct?ie("\uBCF5\uC0AC\uB428","success",1200):ie("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}Oe&&c&&c(Oe)}}return e.addEventListener("pointerdown",Pe),e.addEventListener("dragstart",Xe),e.addEventListener("dragover",Ae),e.addEventListener("dragleave",_t),e.addEventListener("drop",Pt),e.addEventListener("click",Jt),e.addEventListener("change",kt),tt(),De(),b&&se.push(b.subscribe(()=>{for(let[p,v]of ee)v==="failed"&&ee.delete(p);oe()})),s&&se.push(s.subscribe(()=>{let p=u&&u()||"";p!==_e&&(_e=p,Ie.close()),oe(),wt()})),o&&typeof o.subscribe=="function"&&se.push(o.subscribe(()=>oe())),oe(),{load(){oe()},destroy(){for(let p of se.splice(0))try{p()}catch{}e.removeEventListener("pointerdown",Pe),e.removeEventListener("dragstart",Xe),e.removeEventListener("dragover",Ae),e.removeEventListener("dragleave",_t),e.removeEventListener("drop",Pt),e.removeEventListener("click",Jt),e.removeEventListener("change",kt);try{we.destroy()}catch{}Ue.hidden=!0;try{G?.destroy()}catch{}try{Ie.destroy()}catch{}je(i``,e)}}}function ca(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function nd(e,t,r,n=async()=>{},s=async()=>{}){let o=at("views:workspace-picker"),a=null,l=!1,c=!1,u=!1;async function f(S){let Y=S.target.value,le=t.getState().workspace?.current?.path||"";if(Y&&Y!==le){o("switching workspace to %s",Y),l=!0,w();try{await r(Y)}catch(se){o("workspace switch failed: %o",se)}finally{l=!1,w()}}}async function _(){let S=t.getState(),H=S.workspace?.current?.path||S.workspace?.available?.[0]?.path||"";if(!(!H||c)){o("git-pulling workspace %s",H),c=!0,w();try{await n(H)}catch(Y){o("workspace git pull failed: %o",Y)}finally{c=!1,w()}}}function b(S){let H=S.target;H&&e.contains(H)||M()}function E(S){S.key==="Escape"&&M()}function k(){u||(u=!0,document.addEventListener("mousedown",b),document.addEventListener("keydown",E),w())}function M(){u&&(u=!1,document.removeEventListener("mousedown",b),document.removeEventListener("keydown",E),w())}function P(){u?M():k()}async function A(S){let H=S.target,Y=H.value,he=H.checked;o("toggling visibility %s \u2192 %s",Y,String(he));try{await s(Y,he)}catch(le){o("workspace visibility toggle failed: %o",le)}}function j(S){return S?i`
      <button
        type="button"
        class="workspace-picker__git-pull-button"
        @click=${_}
        ?disabled=${l||c}
        aria-label="Git Pull"
        title="Git Pull"
      >
        <span aria-hidden="true">⬇</span>
      </button>
    `:i``}function ee(S,H){return i`
      <div class="workspace-picker__manage">
        <button
          type="button"
          class="workspace-picker__manage-button"
          @click=${P}
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
                ${S.map(Y=>i`
                    <label
                      class="workspace-picker__manage-row"
                      title="${Y.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${Y.path}"
                        .checked=${!H.has(Y.path)}
                        @change=${A}
                      />
                      <span class="workspace-picker__manage-name"
                        >${ca(Y.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function x(){let S=t.getState(),H=S.workspace?.current,Y=S.workspace?.available||[],he=new Set(S.workspace?.hidden||[]),le=H?.path||Y[0]?.path||"";if(Y.length===0)return i``;let se=Y.filter(de=>!he.has(de.path)||de.path===le);if(se.length<=1){let de=se[0]||Y[0],Ne=ca(de.path);return i`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${de.path}"
            >${Ne}</span
          >
          ${ee(Y,he)}
          ${j(le)}
          ${c?i`<span
                class="workspace-picker__loading"
                aria-hidden="true"
              ></span>`:""}
        </div>
      `}return i`
      <div class="workspace-picker">
        <select
          class="workspace-picker__select"
          @change=${f}
          ?disabled=${l||c}
          aria-label="Select project workspace"
        >
          ${se.map(de=>i`
              <option
                value="${de.path}"
                ?selected=${de.path===le}
                title="${de.path}"
              >
                ${ca(de.path)}
              </option>
            `)}
        </select>
        ${ee(Y,he)}
        ${j(le)}
        ${l||c?i`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function w(){je(x(),e)}return w(),a=t.subscribe(()=>w()),{destroy(){a&&(a(),a=null),document.removeEventListener("mousedown",b),document.removeEventListener("keydown",E),je(i``,e)}}}var sd=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","get-session-defaults","set-session-defaults","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-automation-toggle","worker-auto-repair-toggle","worker-repo-operation-repair","worker-repo-operation-dismiss","worker-queue-set-slots","worker-queue-set-serial-lane-count","subscribe-worker-parallel-analysis","unsubscribe-worker-parallel-analysis","worker-parallel-analysis-snapshot","worker-parallel-analysis-start","worker-parallel-analysis-cancel","worker-parallel-analysis-settings-update","worker-parallel-analysis-submit","worker-queue-set-orchestration-defaults","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-cleanup-retry","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-stale-work-continue","worker-stale-work-backup-fresh","worker-stale-work-recheck","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-worker-system-prompt","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-impl-presets","unsubscribe-impl-presets","impl-presets-snapshot","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","monitor-auto-toggle"];function da(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function od(e,t,r=da()){return{id:r,type:e,payload:t}}function ad(e={}){let t=at("ws"),r={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},n=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",a=0,l=null,c=!0,u=new Map,f=[],_=new Map,b=new Set;function E(x){for(let w of Array.from(b))try{w(x)}catch{}}function k(){if(!c||l)return;o="reconnecting",t("ws reconnecting\u2026"),E(o);let x=Math.min(r.maxMs||0,(r.initialMs||0)*Math.pow(r.factor||1,a)),w=(r.jitterRatio||0)*x,S=Math.max(0,Math.round(x+(Math.random()*2-1)*w));t("ws retry in %d ms (attempt %d)",S,a+1),l=setTimeout(()=>{l=null,ee()},S)}function M(x){try{s?.send(JSON.stringify(x))}catch(w){t("ws send failed",w)}}function P(){for(o="open",t("ws open"),E(o),a=0;f.length;){let x=f.shift();x&&M(x)}}function A(x){let w;try{w=JSON.parse(String(x.data))}catch{t("ws received non-JSON message");return}if(!w||typeof w.id!="string"||typeof w.type!="string"){t("ws received invalid envelope");return}if(u.has(w.id)){let H=u.get(w.id);u.delete(w.id),w.ok?H?.resolve(w.payload):H?.reject(w.error||new Error("ws error"));return}let S=_.get(w.type);if(S&&S.size>0)for(let H of Array.from(S))try{H(w.payload)}catch(Y){t("ws event handler error",Y)}else t("ws received unhandled message type: %s",w.type)}function j(){o="closed",t("ws closed"),E(o);for(let[x,w]of u.entries())w.reject(new Error("ws disconnected")),u.delete(x);a+=1,k()}function ee(){if(!c)return;let x=n();try{s=new WebSocket(x),t("ws connecting %s",x),o="connecting",E(o),s.addEventListener("open",P),s.addEventListener("message",A),s.addEventListener("error",()=>{}),s.addEventListener("close",j)}catch(w){t("ws connect failed %o",w),k()}}return ee(),{send(x,w){if(!sd.includes(x))return Promise.reject(new Error(`unknown message type: ${x}`));let S=da(),H=od(x,w,S);return t("send %s id=%s",x,S),new Promise((Y,he)=>{u.set(S,{resolve:Y,reject:he,type:x}),s&&s.readyState===s.OPEN?M(H):(t("queue %s id=%s (state=%s)",x,S,o),f.push(H))})},on(x,w){_.has(x)||_.set(x,new Set);let S=_.get(x);return S?.add(w),()=>{S?.delete(w)}},onConnection(x){return b.add(x),()=>{b.delete(x)}},reconnect(){c=!0,l&&(clearTimeout(l),l=null),a=0,ee()},close(){c=!1,l&&(clearTimeout(l),l=null);try{s?.close()}catch{}},getState(){return o}}}function gm(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function bm(e,t){try{let n=await(await fetch("/api/config")).json();e.setState({config:n})}catch(r){t("config refresh failed",r)}}var ua=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],id=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"],["tab:worker:closed","closed-issues"]],kr="tab:worker:closed",hm="bdui.worker.done-range",ld=wc,cd="worker:queue",dd="worker:parallel-analysis",ud="ui:order",pd="ui:display-policy",fd="exec:presets",$r="tab:board:closed",_d="beads-ui.board.closed-range";function ym(e){let t=at("main");t("bootstrap start");let r=i`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;je(r,e);let n=document.getElementById("top-nav"),s=document.getElementById("usage-meter"),o=document.getElementById("board-root"),a=document.getElementById("worker-root"),l=document.getElementById("monitor-root"),c=document.getElementById("detail-panel");if(s&&Pc(s),o&&a&&l&&c){let qe=function(d,m){let h="Request failed",L="";if(d&&typeof d=="object"){let ge=d;if(typeof ge.message=="string"&&ge.message.length>0&&(h=ge.message),typeof ge.details=="string")L=ge.details;else if(ge.details&&typeof ge.details=="object")try{L=JSON.stringify(ge.details,null,2)}catch{L=""}}else typeof d=="string"&&d.length>0&&(h=d);let me=m&&m.length>0?`Failed to load ${m}`:"Request failed";Ze.open(me,h,L)},be=function(d){return`${p.getState().workspace.current?.path||""}\0${d}`},C=function(){B&&(B().catch(()=>{}),B=null),T=null,z=null},te=function(d){R=d;let m=()=>{R!==d||p.getState().selected_id!==d||(R=null,N(d))};if(!ce){Z.then(m);return}m()},V=function(d,m,h,L,me){return h!==D[m]?(me().catch(()=>{}),!1):(d.set(L,me),!0)},Re=function(){let d=p.getState();yt(d.view==="board"),W(d.view==="worker"),De(d.view==="monitor"),ye(d.view==="board"||d.view==="worker"||Le||!!d.selected_id)},et=function(){let d=Rr(Fe);return d===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:d}}},ht=function(){let d=Rr(Ce);return d===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:d}}},yt=function(d){if(d)for(let[m,h]of ua){if(Q.has(m)||$.has(m))continue;let L=m===$r?et():{type:h};try{Ie.register(m,L)}catch(Te){t("register %s store failed: %o",m,Te)}$.add(m);let me=D.board,ge=!1;xe.subscribeList(m,L).then(Te=>{ge=!V(Q,"board",me,m,Te)}).catch(Te=>{t("subscribe %s failed: %o",m,Te),qe(Te,"board")}).finally(()=>{$.delete(m),ge&&Re()})}else it()},it=function(){D.board+=1;for(let[d]of ua){let m=Q.get(d);m&&(m().catch(()=>{}),Q.delete(d));try{Ie.unregister(d)}catch(h){t("unregister %s failed: %o",d,h)}}},W=function(d){if(!d){J();return}for(let[m,h]of id){if(st.has(m)||$.has(m))continue;let L=m===kr?ht():{type:h};try{Ie.register(m,L)}catch(Te){t("register %s store failed: %o",m,Te)}$.add(m);let me=D.worker,ge=!1;xe.subscribeList(m,L).then(Te=>{ge=!V(st,"worker",me,m,Te)}).catch(Te=>{t("subscribe %s failed: %o",m,Te),qe(Te,"worker")}).finally(()=>{$.delete(m),ge&&Re()})}},J=function(){D.worker+=1;for(let[d]of id){let m=st.get(d);m&&(m().catch(()=>{}),st.delete(d));try{Ie.unregister(d)}catch(h){t("unregister %s failed: %o",d,h)}}},ye=function(d){if(!d){ve();return}pt||(we("subscribe-worker-queue",{id:cd}).catch(m=>{t("subscribe-worker-queue failed: %o",m)}),we("subscribe-worker-parallel-analysis",{id:dd}).catch(m=>{t("subscribe-worker-parallel-analysis failed: %o",m)}),pt=()=>(we("unsubscribe-worker-parallel-analysis",{id:dd}),we("unsubscribe-worker-queue",{id:cd})))},ve=function(){pt&&(pt().catch(()=>{}),pt=null),X.clear()},De=function(d){if(!d){tt();return}oe||(we("subscribe-monitor-pipeline",{id:ld}).catch(m=>{t("subscribe-monitor-pipeline failed: %o",m)}),oe=()=>we("unsubscribe-monitor-pipeline",{id:ld}))},tt=function(){oe&&(oe().catch(()=>{}),oe=null)},Pe=function(){Ye||(we("subscribe-ui-order",{id:ud}).catch(d=>{t("subscribe-ui-order failed: %o",d)}),Ye=()=>we("unsubscribe-ui-order",{id:ud}))},Xe=function(){Ye&&(Ye().catch(()=>{}),Ye=null),$e.clear()},_t=function(){Ae||(we("subscribe-display-policy",{id:pd}).catch(d=>{t("subscribe-display-policy failed: %o",d)}),Ae=()=>we("unsubscribe-display-policy",{id:pd}))},Tt=function(){Ae&&(Ae().catch(()=>{}),Ae=null),pe.clear()},Dt=function(){Pt||(we("subscribe-impl-presets",{id:fd}).catch(d=>{t("subscribe-impl-presets failed: %o",d)}),Pt=()=>we("unsubscribe-impl-presets",{id:fd}))},jt=function(d){if(!d)return"Unknown";let m=d.split("/").filter(Boolean);return m.length>0?m[m.length-1]:"Unknown"};var u=qe,f=be,_=C,b=te,E=V,k=Re,M=et,P=ht,A=yt,j=it,ee=W,x=J,w=ye,S=ve,H=De,Y=tt,he=Pe,le=Xe,se=_t,de=Tt,Ne=Dt,Ue=jt;let Ge=document.getElementById("header-loading"),ze=ki(Ge),Ze=Vl(e),ke=ad(),we=ze.wrapSend((d,m)=>ke.send(d,m)),xe=_i(we),Ie=mi(),_e=hi(),X=bi(),G=Ja(),$e=gi(),pe=Xa(),ae=Qa(),U=ei();ke.on("impl-presets-snapshot",d=>{let m=d;m&&typeof m.revision=="number"&&Array.isArray(m.presets)&&ae.set({revision:m.revision,presets:m.presets})}),ke.on("monitor-pipeline-snapshot",d=>{let m=d;if(!(!m||!Array.isArray(m.workspaces)))try{G.set(m.workspaces,m.workspaces_state)}catch{}}),ke.on("ui-order-snapshot",d=>{let m=d;if(m&&typeof m.revision=="number")try{$e.set({revision:m.revision,order:m.order&&typeof m.order=="object"?m.order:{}})}catch{}}),ke.on("display-policy-snapshot",d=>{let m=d;if(m&&m.policy&&typeof m.policy=="object")try{pe.set(m.policy)}catch{}}),ke.on("session-log-snapshot",d=>{let m=d;if(m&&typeof m.id=="string")try{U.set(m.id,Array.isArray(m.lines)?m.lines:[],typeof m.last_event_at=="number"?m.last_event_at:null)}catch{}}),ke.on("session-log-append",d=>{let m=d;if(m&&typeof m.id=="string")try{U.append(m.id,m.event)}catch{}}),ke.on("snapshot",d=>{let m=d,h=m&&typeof m.id=="string"?m.id:"",L=h?Ie.getStore(h):null;if(L&&m&&m.type==="snapshot")try{L.applyPush(m)}catch{}}),ke.on("upsert",d=>{let m=d,h=m&&typeof m.id=="string"?m.id:"",L=h?Ie.getStore(h):null;if(L&&m&&m.type==="upsert")try{L.applyPush(m)}catch{}}),ke.on("delete",d=>{let m=d,h=m&&typeof m.id=="string"?m.id:"",L=h?Ie.getStore(h):null;if(L&&m&&m.type==="delete")try{L.applyPush(m)}catch{}});let B=null,T=null,z=null,R=null,K=()=>{},Z=new Promise(d=>{K=()=>d(void 0)}),ce=!1,fe=!1;async function N(d){let m=be(d);if(m===T||m===z)return;z=m;let h=`detail:${d}`,L={type:"issue-detail",params:{id:d}};try{Ie.register(h,L)}catch(me){t("register detail store failed: %o",me)}try{let me=await xe.subscribeList(h,L);if(p.getState().selected_id!==d||be(d)!==m){await me().catch(()=>{});return}B&&await B().catch(()=>{}),B=me,T=m}catch(me){t("detail subscribe failed: %o",me),qe(me,"issue details")}finally{z===m&&(z=null)}}let Q=new Map,$=new Set,D={board:0,worker:0},Le=!1,Fe=Lt;try{let d=window.localStorage.getItem(_d);Nt(d)&&(Fe=d)}catch{}let Ce=Lt;try{let d=window.localStorage.getItem(hm);Nt(d)&&(Ce=d)}catch{}async function ot(d){if(!Nt(d)||d===Fe)return;Fe=d;try{window.localStorage.setItem(_d,d)}catch{}let m=Q.get($r);if(!m)return;Q.delete($r),await m().catch(()=>{});let h=et();try{Ie.register($r,h)}catch(L){t("register %s store failed: %o",$r,L)}try{let L=await xe.subscribeList($r,h);Q.set($r,L)}catch(L){t("re-subscribe %s failed: %o",$r,L),qe(L,"board")}}async function $t(d){if(!Nt(d)||d===Ce)return;Ce=d;let m=st.get(kr);if(!m)return;st.delete(kr),await m().catch(()=>{});let h=ht();try{Ie.register(kr,h)}catch(L){t("register %s store failed: %o",kr,L)}try{let L=await xe.subscribeList(kr,h);st.set(kr,L)}catch(L){t("re-subscribe %s failed: %o",kr,L),qe(L,"worker")}}let st=new Map,pt=null,oe=null,Ye=null,Ae=null,Pt=null;async function xr(){Ae=null,pe.clear(),Pt=null,ae.clear(),pt=null,oe=null,Q.clear(),st.clear(),D.board+=1,D.worker+=1,Dt();let d=p.getState().workspace.current?.path;if(d)try{await ke.send("set-workspace",{path:d})}catch(h){t("workspace restore after reconnect failed: %o",h);return}_t();let m=p.getState();yt(m.view==="board"),W(m.view==="worker"),De(m.view==="monitor"),ye(m.view==="board"||m.view==="worker"||!!m.selected_id)}async function vt(){t("clearing all subscriptions for workspace switch"),it(),J(),ve(),_e.clear(),Xe(),Pe(),Tt(),_t(),C();let d=p.getState();if(d.selected_id)try{Ie.unregister(`detail:${d.selected_id}`)}catch{}let m=p.getState();yt(m.view==="board"),W(m.view==="worker"),De(m.view==="monitor"),ye(m.view==="board"||m.view==="worker"||!!m.selected_id),m.selected_id&&te(m.selected_id)}async function kt(d){t("requesting workspace switch to %s",d),fe=!0;try{let m=await ke.send("set-workspace",{path:d});t("workspace switch result: %o",m),m&&m.workspace&&(p.setState({workspace:{current:{path:m.workspace.root_dir,database:m.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",d),m.changed&&(await vt(),ie("Switched to "+jt(d),"success",2e3)))}catch(m){throw t("workspace switch failed: %o",m),ie("Failed to switch workspace","error",3e3),m}finally{fe=!1}}async function Qt(d){t("requesting workspace git pull for %s",d);try{let m=await ke.send("git-pull-workspace",{});t("workspace git pull result: %o",m);let h=m?.status;if(h==="up_to_date"){ie("Already up to date","success",2e3);return}if(h==="stash_pop_conflict"){ie("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}ie("Git pulled "+jt(d),"success",2e3)}catch(m){t("workspace git pull failed: %o",m);let h=m?.code,L=m?.message;if(h==="rebase_conflict"){ie("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(h==="rebase_conflict_abort_failed"){ie("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(h==="busy"){ie("Git pull skipped: another operation is running","warning",3e3);return}let me=L?`: ${L}`:"";throw ie(`Git pull failed${me}`,"error",3e3),m}}async function or(d,m){t("setting workspace visibility %s \u2192 %s",d,String(m));try{await ke.send("set-workspace-visibility",{path:d,visible:m}),await Ut()}catch(h){t("workspace visibility update failed: %o",h),ie("Failed to update project visibility","error",3e3)}}async function Ut(){try{let d=await ke.send("list-workspaces",{});if(t("workspaces loaded: %o",d),d&&Array.isArray(d.workspaces)){let m=d.workspaces.map(ge=>({path:ge.path,database:ge.database,pid:ge.pid,version:ge.version})),h=d.current?{path:d.current.root_dir,database:d.current.db_path}:null,L=Array.isArray(d.hidden)?d.hidden.filter(ge=>typeof ge=="string"):[];p.setState({workspace:{current:h,available:m,hidden:L}});let me=window.localStorage.getItem("beads-ui.workspace");me&&(!m.some(Te=>Te.path===me)||L.includes(me)?window.localStorage.removeItem("beads-ui.workspace"):h&&me!==h.path&&(t("restoring saved workspace preference: %s",me),await kt(me)))}}catch(d){t("failed to load workspaces: %o",d)}}ke.on("workspace-changed",d=>{t("workspace-changed event: %o",d),d&&d.root_dir&&(p.setState({workspace:{current:{path:d.root_dir,database:d.db_path}}}),Ut(),vt())});let wt=!1;if(typeof ke.onConnection=="function"){let d=m=>{t("ws state %s",m),m==="reconnecting"||m==="closed"?(wt=!0,ie("Connection lost. Reconnecting\u2026","error",4e3)):m==="open"&&wt&&(wt=!1,ie("Reconnected","success",2200),bm(p,(h,L)=>{t(`${h}: %o`,L)}),xr())};ke.onConnection(d)}let Jt="board";try{let d=window.localStorage.getItem("beads-ui.view");(d==="board"||d==="worker"||d==="monitor")&&(Jt=d)}catch(d){t("view parse error: %o",d)}let p=wi({config:gm(),view:Jt});ke.on("worker-queue-snapshot",d=>{let m=d;if(!m||!m.queue)return;let h=p.getState().workspace.current?.path;if(typeof h=="string"&&h.length>0&&m.root_dir!==h){t("dropping worker-queue snapshot for %s",String(m.root_dir));return}try{_e.set(m.queue)}catch{}}),ke.on("worker-parallel-analysis-snapshot",d=>{let m=d;if(!m)return;let h=p.getState().workspace.current?.path;if(!(typeof h=="string"&&h.length>0&&typeof m.root_dir=="string"&&m.root_dir!==h))try{X.set({settings:m.settings,job:m.job??null,last_good:m.last_good??null})}catch{}});let v=yi(p);v.start();let F=new Set(["get-comments","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","get-session-defaults","set-session-defaults"]),re=async(d,m)=>{try{return await we(d,m)}catch(h){if(F.has(d))throw h;return[]}};n&&$c(n,p,v);let q=document.getElementById("workspace-picker");q&&nd(q,p,kt,Qt,or);let y=Ec(e,(d,m)=>we(d,m));try{let d=document.getElementById("new-issue-btn");d&&d.addEventListener("click",()=>y.open())}catch{}let I=Ic(e,{policyStore:pe,queueStore:_e,implPresetStore:ae,transport:(d,m)=>we(d,m),onOpenChange:d=>{Le=d,Re()},labelOptions:()=>{let d=new Set;for(let[m]of ua)for(let h of Ie.snapshotFor(m)||[]){let L=h.labels;if(Array.isArray(L))for(let me of L)typeof me=="string"&&me.length>0&&d.add(me)}return Array.from(d).sort()}});try{let d=document.getElementById("display-settings-btn");d&&(d.setAttribute("aria-label","\uC124\uC815"),d.setAttribute("title","\uC124\uC815"),d.addEventListener("click",()=>I.open()))}catch{}let ne=Li(o,{gotoIssue:d=>v.gotoIssue(d),issueStores:Ie,transport:re,workerQueueStore:_e,uiOrderStore:$e,displayPolicyStore:pe,closedRange:Fe,onClosedRangeChange:d=>{ot(d)},onNewIssue:()=>y.open()}),Ee=la(a,{transport:re,issueStores:Ie,queueStore:_e,analysisStore:X,sessionLogStore:U,uiOrderStore:$e,gotoIssue:d=>p.setState({selected_id:d}),getWorkspacePath:()=>p.getState().workspace.current?.path,doneRange:Ce,onDoneRangeChange:d=>{$t(d)}}),Je=kc(l,{transport:re,pipelineStore:G,execPresetStore:ae,gotoIssue:d=>v.gotoIssue(d),getWorkspacePath:()=>p.getState().workspace.current?.path,switchWorkspace:d=>kt(d)}),Be=Gl(c,{issueStores:Ie,transport:re,queueStore:_e,execPresetStore:ae,sessionLogStore:U,getWorkspacePath:()=>p.getState().workspace.current?.path,onNavigate:d=>{p.getState().view==="worker"?p.setState({selected_id:d}):v.gotoIssue(d)},onClose:()=>{let d=p.getState();p.setState({selected_id:null});try{v.gotoView(d.view==="worker"||d.view==="monitor"?d.view:"board")}catch{}},onOpenExecPresets:()=>{I.open("session")}}),Ke=p.getState().selected_id;Ke&&(c.hidden=!1,Be.load(Ke),te(Ke)),p.subscribe(d=>{let m=d.selected_id;m?(c.hidden=!1,Be.load(m),fe||te(m)):(Be.clear(),c.hidden=!0,C())});let Se=d=>{o.hidden=d.view!=="board",a.hidden=d.view!=="worker",l.hidden=d.view!=="monitor",yt(d.view==="board"),W(d.view==="worker"),De(d.view==="monitor"),ye(d.view==="board"||d.view==="worker"||Le||!!d.selected_id),!d.selected_id&&d.view==="board"&&ne.load(),d.view==="worker"&&Ee.load(),d.view==="monitor"?Je.load():Je.pause(),window.localStorage.setItem("beads-ui.view",d.view)};p.subscribe(Se),Se(p.getState()),Pe(),_t(),Dt(),Ut().finally(()=>{ce=!0,K()}),window.addEventListener("keydown",d=>{let m=d.ctrlKey||d.metaKey,h=String(d.key||"").toLowerCase(),L=d.target,me=L&&L.tagName?String(L.tagName).toLowerCase():"",ge=me==="input"||me==="textarea"||me==="select"||L&&typeof L.isContentEditable=="boolean"&&L.isContentEditable;m&&h==="n"&&(ge||(d.preventDefault(),y.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let r=window.localStorage.getItem("beads-ui.theme"),n=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=r==="dark"||r==="light"?r:n?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let r=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",r),window.localStorage.setItem("beads-ui.theme",r)});let t=document.getElementById("app");t&&ym(t)});export{ym as bootstrap,gm as readBootstrapConfig,bm as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
