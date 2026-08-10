var yl=Object.create;var Vr=Object.defineProperty;var wl=Object.getOwnPropertyDescriptor;var kl=Object.getOwnPropertyNames;var $l=Object.getPrototypeOf,xl=Object.prototype.hasOwnProperty;var Sl=(e,t,n)=>t in e?Vr(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var Kr=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var Al=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of kl(t))!xl.call(e,s)&&s!==n&&Vr(e,s,{get:()=>t[s],enumerable:!(r=wl(t,s))||r.enumerable});return e};var Tl=(e,t,n)=>(n=e!=null?yl($l(e)):{},Al(t||!e||!e.__esModule?Vr(n,"default",{value:e,enumerable:!0}):n,e));var ze=(e,t,n)=>Sl(e,typeof t!="symbol"?t+"":t,n);var Ro=Kr((Lp,Co)=>{var kn=1e3,$n=kn*60,xn=$n*60,pn=xn*24,Ll=pn*7,Dl=pn*365.25;Co.exports=function(e,t){t=t||{};var n=typeof e;if(n==="string"&&e.length>0)return Ol(e);if(n==="number"&&isFinite(e))return t.long?Ml(e):Pl(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function Ol(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var n=parseFloat(t[1]),r=(t[2]||"ms").toLowerCase();switch(r){case"years":case"year":case"yrs":case"yr":case"y":return n*Dl;case"weeks":case"week":case"w":return n*Ll;case"days":case"day":case"d":return n*pn;case"hours":case"hour":case"hrs":case"hr":case"h":return n*xn;case"minutes":case"minute":case"mins":case"min":case"m":return n*$n;case"seconds":case"second":case"secs":case"sec":case"s":return n*kn;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return n;default:return}}}}function Pl(e){var t=Math.abs(e);return t>=pn?Math.round(e/pn)+"d":t>=xn?Math.round(e/xn)+"h":t>=$n?Math.round(e/$n)+"m":t>=kn?Math.round(e/kn)+"s":e+"ms"}function Ml(e){var t=Math.abs(e);return t>=pn?dr(e,t,pn,"day"):t>=xn?dr(e,t,xn,"hour"):t>=$n?dr(e,t,$n,"minute"):t>=kn?dr(e,t,kn,"second"):e+" ms"}function dr(e,t,n,r){var s=t>=n*1.5;return Math.round(e/n)+" "+r+(s?"s":"")}});var Lo=Kr((Dp,Io)=>{function Nl(e){n.debug=n,n.default=n,n.coerce=l,n.disable=i,n.enable=s,n.enabled=a,n.humanize=Ro(),n.destroy=d,Object.keys(e).forEach(p=>{n[p]=e[p]}),n.names=[],n.skips=[],n.formatters={};function t(p){let f=0;for(let h=0;h<p.length;h++)f=(f<<5)-f+p.charCodeAt(h),f|=0;return n.colors[Math.abs(f)%n.colors.length]}n.selectColor=t;function n(p){let f,h=null,S,$;function y(...C){if(!y.enabled)return;let V=y,Z=Number(new Date),ne=Z-(f||Z);V.diff=ne,V.prev=f,V.curr=Z,f=Z,C[0]=n.coerce(C[0]),typeof C[0]!="string"&&C.unshift("%O");let q=0;C[0]=C[0].replace(/%([a-zA-Z%])/g,(A,E)=>{if(A==="%%")return"%";q++;let j=n.formatters[E];if(typeof j=="function"){let pe=C[q];A=j.call(V,pe),C.splice(q,1),q--}return A}),n.formatArgs.call(V,C),(V.log||n.log).apply(V,C)}return y.namespace=p,y.useColors=n.useColors(),y.color=n.selectColor(p),y.extend=r,y.destroy=n.destroy,Object.defineProperty(y,"enabled",{enumerable:!0,configurable:!1,get:()=>h!==null?h:(S!==n.namespaces&&(S=n.namespaces,$=n.enabled(p)),$),set:C=>{h=C}}),typeof n.init=="function"&&n.init(y),y}function r(p,f){let h=n(this.namespace+(typeof f>"u"?":":f)+p);return h.log=this.log,h}function s(p){n.save(p),n.namespaces=p,n.names=[],n.skips=[];let f=(typeof p=="string"?p:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let h of f)h[0]==="-"?n.skips.push(h.slice(1)):n.names.push(h)}function o(p,f){let h=0,S=0,$=-1,y=0;for(;h<p.length;)if(S<f.length&&(f[S]===p[h]||f[S]==="*"))f[S]==="*"?($=S,y=h,S++):(h++,S++);else if($!==-1)S=$+1,y++,h=y;else return!1;for(;S<f.length&&f[S]==="*";)S++;return S===f.length}function i(){let p=[...n.names,...n.skips.map(f=>"-"+f)].join(",");return n.enable(""),p}function a(p){for(let f of n.skips)if(o(p,f))return!1;for(let f of n.names)if(o(p,f))return!0;return!1}function l(p){return p instanceof Error?p.stack||p.message:p}function d(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return n.enable(n.load()),n}Io.exports=Nl});var Do=Kr((At,ur)=>{At.formatArgs=ql;At.save=Bl;At.load=Ul;At.useColors=Fl;At.storage=zl();At.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();At.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function Fl(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function ql(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+ur.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let n=0,r=0;e[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(n++,s==="%c"&&(r=n))}),e.splice(r,0,t)}At.log=console.debug||console.log||(()=>{});function Bl(e){try{e?At.storage.setItem("debug",e):At.storage.removeItem("debug")}catch{}}function Ul(){let e;try{e=At.storage.getItem("debug")||At.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function zl(){try{return localStorage}catch{}}ur.exports=Lo()(At);var{formatters:jl}=ur.exports;jl.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var On=globalThis,cr=On.trustedTypes,mo=cr?cr.createPolicy("lit-html",{createHTML:e=>e}):void 0,wo="$lit$",Qt=`lit$${Math.random().toFixed(9).slice(2)}$`,ko="?"+Qt,El=`<${ko}>`,dn=document,Pn=()=>dn.createComment(""),Mn=e=>e===null||typeof e!="object"&&typeof e!="function",ns=Array.isArray,Cl=e=>ns(e)||typeof e?.[Symbol.iterator]=="function",Zr=`[ 	
\f\r]`,Dn=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,go=/-->/g,ho=/>/g,ln=RegExp(`>|${Zr}(?:([^\\s"'>=/]+)(${Zr}*=${Zr}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),bo=/'/g,vo=/"/g,$o=/^(?:script|style|textarea|title)$/i,rs=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),c=rs(1),jt=rs(2),Sp=rs(3),un=Symbol.for("lit-noChange"),tt=Symbol.for("lit-nothing"),yo=new WeakMap,cn=dn.createTreeWalker(dn,129);function xo(e,t){if(!ns(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return mo!==void 0?mo.createHTML(t):t}var Rl=(e,t)=>{let n=e.length-1,r=[],s,o=t===2?"<svg>":t===3?"<math>":"",i=Dn;for(let a=0;a<n;a++){let l=e[a],d,p,f=-1,h=0;for(;h<l.length&&(i.lastIndex=h,p=i.exec(l),p!==null);)h=i.lastIndex,i===Dn?p[1]==="!--"?i=go:p[1]!==void 0?i=ho:p[2]!==void 0?($o.test(p[2])&&(s=RegExp("</"+p[2],"g")),i=ln):p[3]!==void 0&&(i=ln):i===ln?p[0]===">"?(i=s??Dn,f=-1):p[1]===void 0?f=-2:(f=i.lastIndex-p[2].length,d=p[1],i=p[3]===void 0?ln:p[3]==='"'?vo:bo):i===vo||i===bo?i=ln:i===go||i===ho?i=Dn:(i=ln,s=void 0);let S=i===ln&&e[a+1].startsWith("/>")?" ":"";o+=i===Dn?l+El:f>=0?(r.push(d),l.slice(0,f)+wo+l.slice(f)+Qt+S):l+Qt+(f===-2?a:S)}return[xo(e,o+(e[n]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),r]},Nn=class e{constructor({strings:t,_$litType$:n},r){let s;this.parts=[];let o=0,i=0,a=t.length-1,l=this.parts,[d,p]=Rl(t,n);if(this.el=e.createElement(d,r),cn.currentNode=this.el.content,n===2||n===3){let f=this.el.content.firstChild;f.replaceWith(...f.childNodes)}for(;(s=cn.nextNode())!==null&&l.length<a;){if(s.nodeType===1){if(s.hasAttributes())for(let f of s.getAttributeNames())if(f.endsWith(wo)){let h=p[i++],S=s.getAttribute(f).split(Qt),$=/([.?@])?(.*)/.exec(h);l.push({type:1,index:o,name:$[2],strings:S,ctor:$[1]==="."?Qr:$[1]==="?"?Jr:$[1]==="@"?es:yn}),s.removeAttribute(f)}else f.startsWith(Qt)&&(l.push({type:6,index:o}),s.removeAttribute(f));if($o.test(s.tagName)){let f=s.textContent.split(Qt),h=f.length-1;if(h>0){s.textContent=cr?cr.emptyScript:"";for(let S=0;S<h;S++)s.append(f[S],Pn()),cn.nextNode(),l.push({type:2,index:++o});s.append(f[h],Pn())}}}else if(s.nodeType===8)if(s.data===ko)l.push({type:2,index:o});else{let f=-1;for(;(f=s.data.indexOf(Qt,f+1))!==-1;)l.push({type:7,index:o}),f+=Qt.length-1}o++}}static createElement(t,n){let r=dn.createElement("template");return r.innerHTML=t,r}};function vn(e,t,n=e,r){if(t===un)return t;let s=r!==void 0?n._$Co?.[r]:n._$Cl,o=Mn(t)?void 0:t._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(e),s._$AT(e,n,r)),r!==void 0?(n._$Co??(n._$Co=[]))[r]=s:n._$Cl=s),s!==void 0&&(t=vn(e,s._$AS(e,t.values),s,r)),t}var Xr=class{constructor(t,n){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:n},parts:r}=this._$AD,s=(t?.creationScope??dn).importNode(n,!0);cn.currentNode=s;let o=cn.nextNode(),i=0,a=0,l=r[0];for(;l!==void 0;){if(i===l.index){let d;l.type===2?d=new Fn(o,o.nextSibling,this,t):l.type===1?d=new l.ctor(o,l.name,l.strings,this,t):l.type===6&&(d=new ts(o,this,t)),this._$AV.push(d),l=r[++a]}i!==l?.index&&(o=cn.nextNode(),i++)}return cn.currentNode=dn,s}p(t){let n=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,n),n+=r.strings.length-2):r._$AI(t[n])),n++}},Fn=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,n,r,s){this.type=2,this._$AH=tt,this._$AN=void 0,this._$AA=t,this._$AB=n,this._$AM=r,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,n=this._$AM;return n!==void 0&&t?.nodeType===11&&(t=n.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,n=this){t=vn(this,t,n),Mn(t)?t===tt||t==null||t===""?(this._$AH!==tt&&this._$AR(),this._$AH=tt):t!==this._$AH&&t!==un&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Cl(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==tt&&Mn(this._$AH)?this._$AA.nextSibling.data=t:this.T(dn.createTextNode(t)),this._$AH=t}$(t){let{values:n,_$litType$:r}=t,s=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=Nn.createElement(xo(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===s)this._$AH.p(n);else{let o=new Xr(s,this),i=o.u(this.options);o.p(n),this.T(i),this._$AH=o}}_$AC(t){let n=yo.get(t.strings);return n===void 0&&yo.set(t.strings,n=new Nn(t)),n}k(t){ns(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,s=0;for(let o of t)s===n.length?n.push(r=new e(this.O(Pn()),this.O(Pn()),this,this.options)):r=n[s],r._$AI(o),s++;s<n.length&&(this._$AR(r&&r._$AB.nextSibling,s),n.length=s)}_$AR(t=this._$AA.nextSibling,n){for(this._$AP?.(!1,!0,n);t!==this._$AB;){let r=t.nextSibling;t.remove(),t=r}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},yn=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,n,r,s,o){this.type=1,this._$AH=tt,this._$AN=void 0,this.element=t,this.name=n,this._$AM=s,this.options=o,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=tt}_$AI(t,n=this,r,s){let o=this.strings,i=!1;if(o===void 0)t=vn(this,t,n,0),i=!Mn(t)||t!==this._$AH&&t!==un,i&&(this._$AH=t);else{let a=t,l,d;for(t=o[0],l=0;l<o.length-1;l++)d=vn(this,a[r+l],n,l),d===un&&(d=this._$AH[l]),i||(i=!Mn(d)||d!==this._$AH[l]),d===tt?t=tt:t!==tt&&(t+=(d??"")+o[l+1]),this._$AH[l]=d}i&&!s&&this.j(t)}j(t){t===tt?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Qr=class extends yn{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===tt?void 0:t}},Jr=class extends yn{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==tt)}},es=class extends yn{constructor(t,n,r,s,o){super(t,n,r,s,o),this.type=5}_$AI(t,n=this){if((t=vn(this,t,n,0)??tt)===un)return;let r=this._$AH,s=t===tt&&r!==tt||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,o=t!==tt&&(r===tt||s);s&&this.element.removeEventListener(this.name,this,r),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},ts=class{constructor(t,n,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=n,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){vn(this,t)}};var Il=On.litHtmlPolyfillSupport;Il?.(Nn,Fn),(On.litHtmlVersions??(On.litHtmlVersions=[])).push("3.3.1");var Pe=(e,t,n)=>{let r=n?.renderBefore??t,s=r._$litPart$;if(s===void 0){let o=n?.renderBefore??null;r._$litPart$=s=new Fn(t.insertBefore(Pn(),o),o,void 0,n??{})}return s._$AI(e),s};var Rt="today",Ut=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}];function Ht(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function wn(e,t=Date.now()){switch(e){case"today":{let n=new Date(t);return n.setHours(0,0,0,0),n.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function So(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Ao(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function To(){let e=null,t=[],n=new Set;function r(){for(let s of Array.from(n))try{s()}catch{}}return{get(){return e},getWorkspacesState(){return t},set(s,o){e=Array.isArray(s)?s:null,t=Array.isArray(o)?o:[],r()},clear(){e=null,t=[],r()},subscribe(s){return n.add(s),()=>n.delete(s)}}}function Eo(){let e=new Map,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{set(r,s,o=null){e.set(r,{lines:Array.isArray(s)?[...s]:[],last_event_at:typeof o=="number"?o:null}),n()},append(r,s){let o=e.get(r)||{lines:[],last_event_at:null};o.lines=[...o.lines,s],o.last_event_at=Date.now(),e.set(r,o),n()},get(r){return e.get(r)||null},clear(r){typeof r=="string"?e.delete(r):e.clear(),n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}var Oo=Tl(Do(),1);function Ve(e){return(0,Oo.default)(`beads-ui:${e}`)}function Ot(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function fn(e,t){let n=Ot(e.created_at),r=Ot(t.created_at);if(n!==r)return n<r?1:-1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let i=e.id,a=t.id;return i<a?-1:i>a?1:0}function No(e,t){let n=Ot(e.created_at),r=Ot(t.created_at);if(n!==r)return n<r?-1:1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let i=e.id,a=t.id;return i<a?-1:i>a?1:0}function Fo(e,t){let n=Ot(e.updated_at),r=Ot(t.updated_at);if(n!==r)return n<r?1:-1;let s=e.id,o=t.id;return s<o?-1:s>o?1:0}function qo(e,t){let n=e.priority??2,r=t.priority??2;if(n!==r)return n-r;let s=Ot(e.created_at),o=Ot(t.created_at);if(s!==o)return s<o?1:-1;let i=e.id,a=t.id;return i<a?-1:i>a?1:0}function Bo(e,t){let n=e.closed_at??0,r=t.closed_at??0;if(n!==r)return n<r?1:-1;let s=e?.id,o=t?.id;return s<o?-1:s>o?1:0}var Hl=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function Po(e){let t=e&&e.metadata,n=t?t.task_order:void 0;if(n==null||n==="")return Number.POSITIVE_INFINITY;let r=Number(n);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function Mo(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let n=Hl.exec(t);if(!n)return Number.POSITIVE_INFINITY;let r=Number(n[1]);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function Uo(e,t){let n=Po(e),r=Po(t);if(n!==r)return n<r?-1:1;let s=Mo(e),o=Mo(t);if(s!==o)return s<o?-1:1;let i=Ot(e&&e.created_at),a=Ot(t&&t.created_at);if(i!==a)return i<a?-1:1;let l=e&&e.id,d=t&&t.id;return l===d?0:String(l)<String(d)?-1:1}var ss=2**20;function Sn(e,t){let n=e&&e.id;return t&&typeof n=="string"&&Object.prototype.hasOwnProperty.call(t,n)&&typeof t[n]=="number"&&Number.isFinite(t[n])?t[n]:-Ot(e&&e.created_at)}function pr(e){return(t,n)=>{let r=Sn(t,e),s=Sn(n,e);if(r!==s)return r<s?-1:1;let o=t?.id,i=n?.id;return o<i?-1:o>i?1:0}}function os(e,t,n){let r=Array.isArray(e)?e:[],s=r.length,o=Math.max(0,Math.min(t,s-1)),i=o-1>=0?r[o-1]:null,a=o+1<s?r[o+1]:null;if(!i&&!a)return{rank:0};if(!i)return{rank:Sn(a,n)-ss};if(!a)return{rank:Sn(i,n)+ss};let l=Sn(i,n),d=Sn(a,n),p=(l+d)/2;return l<p&&p<d?{rank:p}:{renormalize:r.map((f,h)=>({bead_id:f.id,rank:h*ss}))}}function is(e,t={}){let n=Ve(`issue-store:${e}`),r=new Map,s=[],o=0,i=new Set,a=!1,l=t.sort||fn;function d(){for(let h of Array.from(i))try{h()}catch{}}function p(){s=Array.from(r.values()).sort(l)}function f(h){if(a||!h||h.id!==e)return;let S=Number(h.revision)||0;if(n("apply %s rev=%d",h.type,S),!(S<=o&&h.type!=="snapshot")){if(h.type==="snapshot"){if(S<=o)return;r.clear();let $=Array.isArray(h.issues)?h.issues:[];for(let y of $)y&&typeof y.id=="string"&&y.id.length>0&&r.set(y.id,y);p(),o=S,d();return}if(h.type==="upsert"){let $=h.issue;if($&&typeof $.id=="string"&&$.id.length>0){let y=r.get($.id);if(!y)r.set($.id,$);else{let C=Number.isFinite(y.updated_at)?y.updated_at:0,V=Number.isFinite($.updated_at)?$.updated_at:0;if(C<=V){for(let Z of Object.keys(y))Z in $||delete y[Z];for(let[Z,ne]of Object.entries($))y[Z]=ne}}p()}o=S,d()}else if(h.type==="delete"){let $=String(h.issue_id||"");$&&(r.delete($),p()),o=S,d()}}}return{id:e,subscribe(h){return i.add(h),()=>{i.delete(h)}},applyPush:f,snapshot(){return s},size(){return r.size},getById(h){return r.get(h)},dispose(){a=!0,r.clear(),s=[],i.clear(),o=0}}}function fr(e){let t=String(e.type||"").trim(),n={};if(e.params&&typeof e.params=="object"){let s=Object.keys(e.params).sort();for(let o of s){let i=e.params[o];n[o]=String(i)}}let r=new URLSearchParams(n).toString();return r.length>0?`${t}?${r}`:t}function zo(e){let t=Ve("subs"),n=new Map,r=new Map;function s(a,l){t("applyDelta %s +%d ~%d -%d",a,(l.added||[]).length,(l.updated||[]).length,(l.removed||[]).length);let d=r.get(a);if(!d||d.size===0)return;let p=Array.isArray(l.added)?l.added:[],f=Array.isArray(l.updated)?l.updated:[],h=Array.isArray(l.removed)?l.removed:[];for(let S of Array.from(d)){let $=n.get(S);if(!$)continue;let y=$.itemsById;for(let C of p)typeof C=="string"&&C.length>0&&y.set(C,!0);for(let C of f)typeof C=="string"&&C.length>0&&y.set(C,!0);for(let C of h)typeof C=="string"&&C.length>0&&y.delete(C)}}async function o(a,l){let d=fr(l);if(t("subscribe %s key=%s",a,d),!n.has(a))n.set(a,{key:d,itemsById:new Map});else{let f=n.get(a);if(f&&f.key!==d){let h=r.get(f.key);h&&(h.delete(a),h.size===0&&r.delete(f.key)),n.set(a,{key:d,itemsById:new Map})}}r.has(d)||r.set(d,new Set);let p=r.get(d);p&&p.add(a);try{await e("subscribe-list",{id:a,type:l.type,params:l.params})}catch(f){let h=n.get(a)||null;if(h){let S=r.get(h.key);S&&(S.delete(a),S.size===0&&r.delete(h.key))}throw n.delete(a),f}return async()=>{t("unsubscribe %s key=%s",a,d);try{await e("unsubscribe-list",{id:a})}catch{}let f=n.get(a)||null;if(f){let h=r.get(f.key);h&&(h.delete(a),h.size===0&&r.delete(f.key))}n.delete(a)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:fr,selectors:{getIds(a){let l=n.get(a);return l?Array.from(l.itemsById.keys()):[]},has(a,l){let d=n.get(a);return d?d.itemsById.has(l):!1},count(a){let l=n.get(a);return l?l.itemsById.size:0},getItemsById(a){let l=n.get(a),d={};if(!l)return d;for(let p of l.itemsById.keys())d[p]=!0;return d}}}}function jo(){let e=Ve("issue-stores"),t=new Map,n=new Map,r=new Set,s=new Map;function o(){for(let l of Array.from(r))try{l()}catch{}}function i(l,d,p){let f=d?fr(d):"",h=n.get(l)||"",S=t.has(l);if(e("register %s key=%s (prev=%s)",l,f,h),S&&h&&f&&h!==f){let $=t.get(l);if($)try{$.dispose()}catch{}let y=s.get(l);if(y){try{y()}catch{}s.delete(l)}let C=is(l,p);t.set(l,C);let V=C.subscribe(()=>o());s.set(l,V)}else if(!S){let $=is(l,p);t.set(l,$);let y=$.subscribe(()=>o());s.set(l,y)}return n.set(l,f),()=>a(l)}function a(l){e("unregister %s",l),n.delete(l);let d=t.get(l);d&&(d.dispose(),t.delete(l));let p=s.get(l);if(p){try{p()}catch{}s.delete(l)}}return{register:i,unregister:a,getStore(l){return t.get(l)||null},snapshotFor(l){let d=t.get(l);return d?d.snapshot().slice():[]},subscribe(l){return r.add(l),()=>r.delete(l)}}}function Ho(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Wo(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function as(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function Wl(e){let t=String(e||""),n=t.startsWith("#")?t.slice(1):t,r=n.indexOf("?"),s=r>=0?n.slice(r+1):"";if(s){let a=new URLSearchParams(s).get("issue");if(a)return decodeURIComponent(a)}let o=/^\/issue\/([^\s?#]+)/.exec(n);return o&&o[1]?decodeURIComponent(o[1]):null}function Gl(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function Go(e){let t=Ve("router"),n=()=>{let r=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(r),o=s&&s[1]?decodeURIComponent(s[1]):Wl(r),i=Gl(r);if(t("hash change \u2192 view=%s id=%s",i,o),e.setState({selected_id:i==="worker"?null:o,view:i,worker:{selected_parent_id:i==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(r)){let l=o?`#/${i}?issue=${encodeURIComponent(o)}`:`#/${i}`;window.location.hash!==l&&(window.location.hash=l)}};return{start(){window.addEventListener("hashchange",n),n()},stop(){window.removeEventListener("hashchange",n)},gotoIssue(r){let s=e.getState?e.getState():{view:"board"},o=s.view==="worker"||s.view==="monitor"?s.view:"board",i=as(o,r);t("goto issue %s (view=%s)",r,o),window.location.hash!==i?window.location.hash=i:e.setState({selected_id:o==="worker"?null:r,view:o,worker:{selected_parent_id:o==="worker"?r:null}})},gotoView(r){let s=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},o=r==="worker"?s.worker?.selected_parent_id:s.selected_id,i=o?as(r,o):`#/${r}`;t("goto view %s (id=%s)",r,o||""),window.location.hash!==i?window.location.hash=i:e.setState({view:r,selected_id:r==="worker"?null:s.selected_id})}}}var Yl=Object.freeze({workspace_config:{default_workspace:null}});function Yo(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:Yl.workspace_config.default_workspace}}}function Vo(e={}){let t=Ve("state"),n={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:Yo(e.config)},r=new Set;function s(){for(let o of Array.from(r))try{o(n)}catch{}}return{getState(){return n},setState(o){let i={...n,...o,filters:{...n.filters,...o.filters||{}},board:{...n.board,...o.board||{}},worker:{...n.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:n.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:n.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:n.workspace.hidden},config:o.config!==void 0?Yo(o.config):n.config},a=i.workspace.current?.path!==n.workspace.current?.path||i.workspace.available.length!==n.workspace.available.length||i.workspace.hidden.length!==n.workspace.hidden.length||i.workspace.hidden.some((d,p)=>d!==n.workspace.hidden[p]),l=i.config.workspace_config.default_workspace!==n.config.workspace_config.default_workspace;i.selected_id===n.selected_id&&i.view===n.view&&i.filters.status===n.filters.status&&i.filters.search===n.filters.search&&i.filters.type===n.filters.type&&i.board.closed_filter===n.board.closed_filter&&i.worker.selected_parent_id===n.worker.selected_parent_id&&i.worker.show_closed_children.length===n.worker.show_closed_children.length&&i.worker.show_closed_children.every((d,p)=>d===n.worker.show_closed_children[p])&&!a&&!l||(n=i,t("state change %o",{selected_id:n.selected_id,view:n.view,filters:n.filters,board:n.board,worker:n.worker,workspace:n.workspace.current?.path,config:{default_workspace:n.config.workspace_config.default_workspace}}),s())},subscribe(o){return r.add(o),()=>r.delete(o)}}}function Ko(e){let t=Ve("activity"),n=0,r=new Map,s=1;function o(){if(!e)return;let d=n>0;e.toggleAttribute("hidden",!d),e.setAttribute("aria-busy",d?"true":"false")}function i(){n+=1,t("start count=%d",n),o()}function a(){let d=n;n=Math.max(0,n-1),d<=0?t("done called but count was already %d",d):t("done count=%d\u2192%d",d,n),o()}function l(d){return async(f,h)=>{let S=s++,$=Date.now();r.set(S,{type:f,start_ts:$}),t("request start id=%d type=%s count=%d",S,f,n+1),i();let y=!1,C=()=>{y||(y=!0,r.delete(S),a())},V=setTimeout(()=>{y||(t("request TIMEOUT id=%d type=%s elapsed=%dms",S,f,Date.now()-$),C())},3e4);try{let Z=await d(f,h),ne=Date.now()-$;return t("request done id=%d type=%s elapsed=%dms",S,f,ne),Z}catch(Z){let ne=Date.now()-$;throw t("request error id=%d type=%s elapsed=%dms err=%o",S,f,ne,Z),Z}finally{clearTimeout(V),C()}}}return o(),{wrapSend:l,start:i,done:a,getCount:()=>n,getActiveRequests:()=>{let d=Date.now();return Array.from(r.entries()).map(([p,f])=>({id:p,type:f.type,elapsed_ms:d-f.start_ts}))}}}function se(e,t="info",n=2800){let r=document.createElement("div");r.className="toast",r.textContent=e,r.style.position="fixed",r.style.right="12px",r.style.bottom="12px",r.style.zIndex="1000",r.style.color="#fff",r.style.padding="8px 10px",r.style.borderRadius="4px",r.style.fontSize="12px",t==="success"?r.style.background="#156d36":t==="warning"?r.style.background="#a36a00":t==="error"?r.style.background="#9f2011":r.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(r),setTimeout(()=>{try{r.remove()}catch{}},n)}function _r(e=void 0,t=void 0){function n(){if(!t||typeof t.get!="function")return null;let o=t.get();return o&&o.order?o.order:{}}function r(o,i,a){let l=e&&e.snapshotFor?e.snapshotFor(o).slice():[];if(i==="closed")return l.sort(Bo),l;switch(a){case"created_desc":return l.sort(fn),l;case"created_asc":return l.sort(No),l;case"updated_desc":return l.sort(Fo),l;case"priority":return l.sort(qo),l;case"manual":default:{let d=n();return d?l.sort(pr(d)):l.sort(fn),l}}}function s(o){let i=[];return e&&typeof e.subscribe=="function"&&i.push(e.subscribe(o)),t&&typeof t.subscribe=="function"&&i.push(t.subscribe(o)),()=>{for(let a of i)try{a()}catch{}}}return{selectBoardColumn:r,subscribe:s}}function qn(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function bt(e){let t=qn(e);if(t===null)return"";let n=new Date(t),r=s=>String(s).padStart(2,"0");return`${n.getFullYear()}-${r(n.getMonth()+1)}-${r(n.getDate())} ${r(n.getHours())}:${r(n.getMinutes())}`}function Ct(e,t){let n=qn(e);if(n===null)return"";let s=(typeof t=="number"?t:Date.now())-n;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let i=Math.floor(s/36e5);if(i<24)return`${i}\uC2DC\uAC04 \uC804`;let a=Math.floor(s/864e5);if(a<7)return`${a}\uC77C \uC804`;let l=Math.floor(a/7);if(a<30)return`${l}\uC8FC \uC804`;let d=Math.floor(a/30);return d<12?`${d}\uAC1C\uC6D4 \uC804`:`${Math.floor(a/365)}\uB144 \uC804`}function mr(e){if(!Array.isArray(e))return null;let t=null,n=-1;for(let r of e){if(!r||r.status!=="in_progress")continue;let s=qn(r.updated_at)??0;if(t===null||s>n){t=r,n=s;continue}s===n&&String(r.id)<String(t.id)&&(t=r)}return t}function gr(e){let t=e.transport,n=e.uiOrderStore;function r(i,a){return"renormalize"in i?i.renormalize:[{bead_id:a,rank:i.rank}]}function s(i,a){let l={...i.order};for(let d of a)l[d.bead_id]=d.rank;n&&n.set({revision:i.revision,order:l})}async function o(i,a,l){if(!t||!n)return;let d=n.get()||{revision:0,order:{}},p=r(os(a,l,d.order),i);s(d,p);let f=await t("ui-order-set",{expected_revision:d.revision,entries:p});if(f&&f.conflict){let h={revision:typeof f.revision=="number"?f.revision:0,order:f.order||{}};n.set(h);let S=r(os(a,l,h.order),i);s(h,S);let $=await t("ui-order-set",{expected_revision:h.revision,entries:S});$&&$.applied&&n.set({revision:typeof $.revision=="number"?$.revision:0,order:$.order||{}})}else f&&f.applied&&n.set({revision:typeof f.revision=="number"?f.revision:0,order:f.order||{}})}return{applyReorder:o}}function hr(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function ls(e,t){return!t||typeof e!="string"||e.length===0||hr(t.visible_labels).includes(e)?!0:hr(t.hidden_labels).includes(e)?!1:!hr(t.hidden_prefixes).some(n=>n.length>0&&e.startsWith(n))}function br(e,t){return hr(e).filter(n=>ls(n,t))}function Jt(e,t){let n=e&&e.chips?e.chips[t]:void 0;return typeof n=="boolean"?n:!0}var Vl={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},Xo={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},Zo={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},Kl={review:"\u2713",skip:"\u2298"},en={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function Zl(e,t,n){if(!(n==="in_progress"||n==="resolved"))return null;for(let s of e){let o=t[s];if(o&&o.fill==="dim"&&o.stale!==!0)return s}return null}function Qo(e){let t=e&&e.fill||"none";return t==="none"?en.none:e&&e.stale===!0?en.stale:t==="dim"?en.dim:e&&e.glyph==="review"?en.review:e&&e.glyph==="skip"?en.skip:en.done}function Xl(e){if(!e||e.fill==="none"||!e.approval_state)return Qo(e);let t=[];return e.glyph==="review"?t.push(en.review):e.glyph==="skip"&&t.push(en.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function Ql(e,t,n){let r=Vl[e]||e,s=t&&t.fill||"none",o=!!t&&t.stale===!0,i=Kl[t&&t.glyph||""]||"",a="bar";s==="dim"?a+=` b-${r} dim`:s==="full"&&(a+=` b-${r} full`),o&&(a+=" stale"),n&&(a+=" cur");let l=s==="none"?"lbl":`lbl l-${r} on`,d=n?`color: var(--stage-${r}-on)`:"";return c`
    <div class="seg">
      <div class=${a} style=${d}>${i}</div>
      <div class=${l}>
        ${Xo[e]||e}
      </div>
    </div>
  `}function vr(e,t){if(!e||!e.stages)return"";let n=Zo[e.route]||Zo.spec_backed,r=e.stages,s=Zl(n,r,String(t||"open")),o=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${n.map(i=>`${Xo[i]||i} ${i==="plan"?Xl(r[i]||{}):Qo(r[i]||{})}`).join(" \xB7 ")}`;return c`
    <div class="stp" role="img" aria-label=${o}>
      ${n.map(i=>Ql(i,r[i]||{},i===s))}
    </div>
  `}function Jl(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var Jo=2;function ec(e){if(!e)return[];let t=[];if(e.external){let r=e.reason?`\u23F8 blocked: ${e.reason}`:"\u23F8 blocked";t.push(c`<span class="ctl-chip ctl-chip--blocked">${r}</span>`)}let n=Array.isArray(e.blockers)?e.blockers:[];if(n.length>0){let r=n.slice(0,Jo).join(", "),s=n.length-Jo,o=`\u26D3 blocked: ${r}${s>0?` +${s}`:""}`;t.push(c`<span class="ctl-chip ctl-chip--blocked-dep">${o}</span>`)}return t}function tc(e,t){let n=t.policy||null,r=e.workflow&&e.workflow.chips||{},s=[];if(r.route&&Jt(n,"route")){let i=r.route_source==="derived";s.push(c`<span
        class="ctl-chip ctl-chip--route${i?" is-derived":""}"
        title=${i?"route \uBBF8\uD540 (metadata unset)":"route"}
        >${i?"unset":r.route}</span
      >`)}if(r.fast_track&&Jt(n,"fast_track")&&s.push(c`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),r.pr&&Jt(n,"pr")){let i=r.pr.number;s.push(c`<span class="ctl-chip ctl-chip--pr"
        >${`PR${i!=null?` #${i}`:""}`}</span
      >`)}for(let i of br(e.labels,n))s.push(c`<span class="ctl-chip ctl-chip--label">${i}</span>`);e.from_id&&Jt(n,"from")&&s.push(c`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${i=>{i.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(i,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),Jt(n,"blocked")&&s.push(...ec(e.blocked_info));let o=t.cleanupFailureFor?t.cleanupFailureFor(e.id):null;if(o&&Jt(n,"blocked")){let i=t.isCleanupDiagnosisPending?t.isCleanupDiagnosisPending(e.id):!1,a=o.diagnosis&&typeof o.diagnosis=="object"&&!Array.isArray(o.diagnosis)?o.diagnosis:null;if(s.push(c`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 실패</span>`),a){let l=a.malformed===!0||a.verdict==="malformed"?"\uD310\uC815 \uBD88\uAC00":String(a.verdict||"\uD310\uC815 \uBD88\uAC00"),d=typeof a.evidence=="string"?a.evidence.trim().slice(0,96):"",p=typeof a.fix_bead_id=="string"&&a.fix_bead_id.length>0?` \xB7 fix ${a.fix_bead_id}`:"",f=d?` \xB7 ${d}`:"";s.push(c`<span
          class="ctl-chip ctl-chip--cleanup board-card__cleanup-diagnosis"
          title=${d}
          >AI ${l}${f}${p}</span
        >`)}s.push(c`<button
        type="button"
        class="ctl-chip ctl-chip--cleanup board-card__cleanup-diagnose"
        data-bead-id=${e.id}
        ?disabled=${i}
        title="정리 실패 원인을 AI 세션으로 분류합니다"
        @click=${l=>{t.onCleanupDiagnose&&t.onCleanupDiagnose(l,e.id)}}
      >
        AI 정리
      </button>`)}return s.length===0?"":c`<div class="board-card__chips">${s}</div>`}function nc(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function rc(e){let t=Ct(e.created_at),n=Ct(e.updated_at);return!t&&!n?"":c`<span class="board-card__times">
    ${t?c`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${bt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}
    ${t&&n?c`<span class="board-card__time-sep">·</span>`:""}
    ${n?c`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${bt(e.updated_at)}`}
          >수정 ${n}</span
        >`:""}
  </span>`}function sc(e,t){let n=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]},r=n.total||0,s=t.isExpanded?t.isExpanded(e.id):!0,o=r>0?n.children.slice().sort(Uo):n.children;return c`
    <div class="board-card__roll">
      <div class="board-card__roll-meta">
        ${r>0?c`<button
              type="button"
              class="board-card__roll-toggle"
              aria-expanded=${s?"true":"false"}
              @click=${i=>t.onRollupToggle&&t.onRollupToggle(i,e.id)}
            >
              children ${n.count}/${r} ${s?"\u25B4":"\u25BE"}
            </button>`:c`<span class="board-card__roll-none">children 없음</span>`}
        ${rc(e)}
      </div>
      ${r>0&&n.current?c`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${n.current.title||n.current.id}</span
            >
          </div>`:""}
      ${s&&r>0?c`<div class="board-card__roll-list">
            ${o.map((i,a)=>c`<button
                  type="button"
                  class="board-card__roll-child"
                  @click=${l=>t.onChildClick&&t.onChildClick(l,i.id)}
                >
                  <span class=${nc(i.status)}>●</span>
                  <span class="board-card__roll-child-ord">${a+1}</span>
                  <span class="board-card__roll-child-title"
                    >${i.title||i.id}</span
                  >
                </button>`)}
          </div>`:""}
    </div>
  `}function yr(e,t){let n=Jl(e.priority);return c`
    <article
      class="board-card"
      data-issue-id=${e.id}
      role="listitem"
      tabindex="-1"
      draggable="true"
      @click=${r=>t.onCardClick(r,e.id)}
      @dragstart=${r=>t.onDragStart(r,e.id)}
      @dragend=${t.onDragEnd}
    >
      <div class="board-card__head">
        <button
          type="button"
          class="board-card__id"
          title="ID 복사"
          aria-label=${`\uC774\uC288 ID ${e.id} \uBCF5\uC0AC`}
          @click=${r=>t.onCopyId(r,e.id)}
        >
          ${e.id}
        </button>
        ${n?c`<span class="board-card__pri">${n}</span>`:""}
      </div>
      <div class="board-card__title">${e.title||"(\uC81C\uBAA9 \uC5C6\uC74C)"}</div>
      ${tc(e,t)}
      ${e.workflow&&Jt(t.policy||null,"stepper")?vr(e.workflow,e.status):""}
      ${sc(e,t)}
    </article>
  `}function An(e,t){let n=Array.isArray(e.items)?e.items.length:0,r=e.is_closed===!0;return c`
    <section class=${r?"board-column board-column--closed":"board-column"} id=${e.id}>
      <header
        class="board-column__header"
        id=${e.id+"-header"}
        role="heading"
        aria-level="2"
      >
        <div class="board-column__title">
          <span class="board-column__title-text">${e.title}</span>
          <span class="board-column__count" aria-label=${`${n}\uAC74`}
            >${n}</span
          >
        </div>
        ${r?c`<select
              class="board-column__closed-range"
              aria-label="Closed period"
              @change=${t.onClosedRangeChange}
            >
              ${Ut.map(o=>c`<option
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
        ${e.items.map(o=>yr(o,t))}
      </div>
    </section>
  `}function ei(e,t,n){return c`
    <dialog
      id="deferred-popup"
      class="deferred-popup"
      role="dialog"
      aria-modal="true"
      aria-labelledby="deferred-popup-title"
      @click=${n.onOverlayClick}
      @cancel=${n.onClose}
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
            @click=${n.onClose}
          >
            ×
          </button>
        </header>
        <div
          class="deferred-popup__body"
          role="list"
          aria-labelledby="deferred-popup-title"
        >
          ${e.items.length===0?c`<div class="deferred-popup__empty">Deferred 이슈 없음</div>`:e.items.map(r=>yr(r,t))}
        </div>
      </div>
    </dialog>
  `}var oc=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],ic=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],ac=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function lc(e,t,n){let r=e.labels.length,s=r>0?`\uB77C\uBCA8 ${r}`:"\uB77C\uBCA8";return c`
    <div class="board-filter__labels">
      <button
        type="button"
        class=${r>0?"board-filter__label-btn is-on":"board-filter__label-btn"}
        aria-haspopup="true"
        aria-expanded=${n.label_menu_open?"true":"false"}
        @click=${t.onLabelMenuToggle}
      >
        ${s} ▾
      </button>
      ${n.label_menu_open?c`<div class="board-filter__label-menu" role="group">
            ${n.label_options.length===0?c`<div class="board-filter__label-empty">라벨 없음</div>`:n.label_options.map(o=>c`<label class="board-filter__label-row">
                      <input
                        type="checkbox"
                        .checked=${e.labels.includes(o)}
                        @change=${()=>t.onLabelToggle(o)}
                      />
                      <span>${o}</span>
                    </label>`)}
            ${r>0?c`<button
                  type="button"
                  class="board-filter__label-clear"
                  @click=${t.onLabelClear}
                >
                  선택 해제
                </button>`:""}
          </div>`:""}
    </div>
  `}function ti(e,t,n){return c`
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
        ${oc.map(r=>c`<option
              value=${r.value}
              ?selected=${e.priority===r.value}
            >
              ${r.label}
            </option>`)}
      </select>
      <select
        class="board-filter__select"
        aria-label="타입 필터"
        @change=${t.onTypeChange}
      >
        ${ic.map(r=>c`<option
              value=${r.value}
              ?selected=${e.type===r.value}
            >
              ${r.label}
            </option>`)}
      </select>
      ${lc(e,t,n)}
      <span class="board-filter__spacer"></span>
      <button
        type="button"
        class=${n.deferred_popup_open?"board-filter__deferred is-on":"board-filter__deferred"}
        aria-haspopup="dialog"
        aria-expanded=${n.deferred_popup_open?"true":"false"}
        @click=${t.onDeferredToggle}
      >
        Deferred ${n.deferred_count}
      </button>
      <select
        class="board-filter__select board-filter__sort"
        aria-label="정렬 규칙"
        @change=${t.onSortChange}
      >
        ${ac.map(r=>c`<option
              value=${r.value}
              ?selected=${n.sort_mode===r.value}
            >
              ${r.label}
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
  `}var cc=200,dc={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},uc=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),ni="beads-ui.board.sort",ri=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function pc(){try{let e=window.localStorage.getItem(ni);if(e&&ri.has(e))return e}catch{}return"created_desc"}function si(e,t){let n=Ve("views:board"),r=t.gotoIssue,s=t.issueStores,o=t.transport,i=t.uiOrderStore,a=t.displayPolicyStore,l=t.workerQueueStore,d=t.onClosedRangeChange,p=t.onNewIssue,f=t.closedRange||Rt,h=s?_r(s,i):null,S=gr({transport:o,uiOrderStore:i}),$=[],y=[],C=[],V=[],Z=[],ne=[],q=!1,L=0,A=pc(),E=new Map,j=new Map,pe=new Map,xe=new Set,me=new Set,fe={search:"",priority:"",type:"",labels:[]},Ee=!1,Ue=null;function Ke(R){return String(R.status||"open")==="open"}function je(R){let N=String(R.status||"open");return N==="open"||N==="blocked"}function $e(R){let N=fe.search.trim().toLowerCase(),ee=fe.priority,u=fe.type,m=fe.labels;return R.filter(T=>{if(N){let X=String(T.id||"").toLowerCase(),he=String(T.title||"").toLowerCase();if(!X.includes(N)&&!he.includes(N))return!1}if(ee!==""&&String(T.priority)!==ee||u!==""&&String(T.issue_type||"")!==u)return!1;if(m.length>0){let X=Array.isArray(T.labels)?T.labels:[];if(!m.some(he=>X.includes(he)))return!1}return!0})}function D(){let R=new Set;for(let N of[$,y,C,V,Z,ne])for(let ee of N){let u=Array.isArray(ee.labels)?ee.labels:[];for(let m of u)typeof m=="string"&&m.length>0&&R.add(m)}return Array.from(R).sort()}function U(){return fe.search.trim()!==""||fe.priority!==""||fe.type!==""||fe.labels.length>0}function _e(){try{if(h){let R=h.selectBoardColumn("tab:board:in-progress","in_progress",A),N=h.selectBoardColumn("tab:board:blocked","blocked",A).filter(je),ee=new Set(R.map(ie=>ie.id)),u=h.selectBoardColumn("tab:board:ready","ready",A).filter(ie=>Ke(ie)&&!ee.has(ie.id)),m=h.selectBoardColumn("tab:board:resolved","resolved",A),T=h.selectBoardColumn("tab:board:deferred","deferred",A),X=h.selectBoardColumn("tab:board:closed","closed").slice(0,cc),he=[...N,...u,...R,...m,...X];oe(he);let Ae=new Set;for(let ie of he)ie&&ie.id&&!cs(ie)&&Ae.add(ie.id);let ye=!U();$=ye?Bn(N,Ae):N,y=ye?Bn(u,Ae):u,C=ye?Bn(R,Ae):R,V=ye?Bn(m,Ae):m,Z=T,L=T.length,ne=ye?Bn(X,Ae):X,E=new Map;for(let ie of $)E.set(ie.id,"open");for(let ie of y)E.set(ie.id,"open");for(let ie of C)E.set(ie.id,"in_progress");for(let ie of V)E.set(ie.id,"resolved");for(let ie of Z)E.set(ie.id,"deferred");for(let ie of ne)E.set(ie.id,"closed");j=new Map;for(let ie of $)j.set(ie.id,"blocked-col");for(let ie of y)j.set(ie.id,"ready-col");for(let ie of C)j.set(ie.id,"in-progress-col");for(let ie of V)j.set(ie.id,"resolved-col");for(let ie of ne)j.set(ie.id,"closed-col")}We()}catch{$=[],y=[],C=[],V=[],Z=[],ne=[],pe=new Map,We()}}function oe(R){let N=new Map;for(let u of R)u&&u.id&&!N.has(u.id)&&N.set(u.id,u);let ee=new Map;for(let u of N.values()){let m=cs(u);if(!m)continue;let T=ee.get(m);T||(T=[],ee.set(m,T)),T.push({id:u.id,title:u.title,status:u.status,metadata:u.metadata,created_at:u.created_at,updated_at:u.updated_at})}pe=ee}function ke(R){let N=pe.get(R)||[],ee=0;for(let m of N)(m.status==="resolved"||m.status==="closed")&&(ee+=1);let u=mr(N);return{total:N.length,count:ee,current:u,children:N}}function ge(R){return!xe.has(R)}function Be(R,N){R.preventDefault(),R.stopPropagation(),xe.has(N)?xe.delete(N):xe.add(N),We()}function be(R,N){R.preventDefault(),R.stopPropagation(),r(N)}function Ce(R,N){R.preventDefault(),R.stopPropagation(),r(N)}function F(R,N){Ue||r(N)}function O(R,N){R.preventDefault(),R.stopPropagation(),fc(N).then(ee=>{ee&&se("\uBCF5\uC0AC\uB428","success",1200)})}function re(R,N){Ue=N,R.dataTransfer&&(R.dataTransfer.setData("text/plain",N),R.dataTransfer.effectAllowed="move"),R.target.classList.add("board-card--dragging")}function Se(R){R.target.classList.remove("board-card--dragging"),gt(),setTimeout(()=>{Ue=null},0)}function Re(R){let N=String(R.target.value||"");!N||N===f||(f=N,d&&d(N),We())}function M(){return a?a.get():null}function B(R){let N=l?l.get():null,ee=N?N.cleanup_failed:null;if(!ee||typeof ee!="object"||Array.isArray(ee))return null;let u=ee[R];return!u||typeof u!="object"||Array.isArray(u)?null:u}function P(R,N){if(!R||typeof R!="object"||Array.isArray(R))return!1;let ee=Object.values(R),u=new Set;for(let m of ee)m&&typeof m=="object"&&typeof m.resumed_from=="string"&&m.resumed_from.length>0&&u.add(m.resumed_from);return ee.some(m=>m&&typeof m=="object"&&m.bead_id===N&&m.cleanup_diagnosis===!0&&(m.status==="running"||m.status==="paused"&&!u.has(m.attempt_id)))}function ae(R){let N=l?l.get():null;return me.has(R)||P(N?N.attempts:null,R)}function ce(R){R&&R.queue&&l&&l.set(R.queue)}async function w(R,N){if(R.preventDefault(),R.stopPropagation(),!o||!l||!B(N)||me.has(N))return;me.add(N),We();let ee;try{let u=l.get(),m=u&&typeof u.revision=="number"?u.revision:0;if(ee=await o("worker-cleanup-diagnose",{bead_id:N,expected_revision:m}),ce(ee),ee&&ee.conflict){let T=l.get(),X=T&&typeof T.revision=="number"?T.revision:0;ee=await o("worker-cleanup-diagnose",{bead_id:N,expected_revision:X}),ce(ee)}}finally{me.delete(N),We()}ee&&!ee.conflict&&ee.ok===!1&&ee.reason&&se(`AI \uC815\uB9AC \uAC70\uBD80: ${ee.reason}`,"error",2400)}let W={onCardClick:F,onCopyId:O,onDragStart:re,onDragEnd:Se,onClosedRangeChange:Re,rollupFor:ke,isExpanded:ge,onRollupToggle:Be,onChildClick:be,onFromChipClick:Ce,cleanupFailureFor:B,isCleanupDiagnosisPending:ae,onCleanupDiagnose:w,get policy(){return M()}};function H(R,N){Ue||(_t(),r(N))}function J(R,N){R.preventDefault(),R.stopPropagation(),_t(),r(N)}let de={...W,onCardClick:H,onChildClick:J,onFromChipClick:J,get policy(){return M()}};function Te(R){let N=R.target,ee=e.querySelector(".board-filter__labels");N&&ee&&ee.contains(N)||Xe()}function Ne(R){R.key==="Escape"&&Xe()}function Ze(){Ee||(Ee=!0,document.addEventListener("mousedown",Te),document.addEventListener("keydown",Ne),We())}function Xe(){Ee&&(Ee=!1,document.removeEventListener("mousedown",Te),document.removeEventListener("keydown",Ne),We())}function lt(R){R.key==="Escape"&&_t()}function st(){q||(q=!0,document.addEventListener("keydown",lt),We())}function _t(){q&&(q=!1,document.removeEventListener("keydown",lt),We())}let vt={onClose:_t,onOverlayClick(R){R.target===R.currentTarget&&_t()}},De={onSearchInput(R){fe.search=String(R.target.value||""),_e()},onPriorityChange(R){fe.priority=String(R.target.value||""),_e()},onTypeChange(R){fe.type=String(R.target.value||""),_e()},onSortChange(R){let N=String(R.target.value||"");if(!(!ri.has(N)||N===A)){A=N;try{window.localStorage.setItem(ni,N)}catch{}_e()}},onDeferredToggle(){q?_t():st()},onLabelMenuToggle(){Ee?Xe():Ze()},onLabelToggle(R){let N=fe.labels.indexOf(R);N===-1?fe.labels.push(R):fe.labels.splice(N,1),_e()},onLabelClear(){fe.labels.length!==0&&(fe.labels=[],_e())},onNewIssue(){p&&p()}};function ot(){return c`
      <div class="board-view">
        ${ti(fe,De,{sort_mode:A,deferred_popup_open:q,deferred_count:L,label_options:D(),label_menu_open:Ee})}
        <div class="board-root">
          ${An({title:"Blocked",id:"blocked-col",items:$e($)},W)}
          ${An({title:"Ready",id:"ready-col",items:$e(y)},W)}
          ${An({title:"In progress",id:"in-progress-col",items:$e(C)},W)}
          ${An({title:"Resolved",id:"resolved-col",items:$e(V)},W)}
          ${An({title:"Closed",id:"closed-col",items:$e(ne),is_closed:!0,closed_range:f},W)}
        </div>
        ${q?ei({items:$e(Z),count:L},de,vt):""}
      </div>
    `}function We(){Pe(ot(),e),mt()}function mt(){try{let R=e.querySelector("#deferred-popup");R&&!R.open&&(typeof R.showModal=="function"?R.showModal():R.setAttribute("open",""));let N=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let ee of N)Array.from(ee.querySelectorAll(".board-card")).forEach((m,T)=>{m.tabIndex=T===0?0:-1})}catch{}}async function ct(R,N){if(!o){se("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:R,status:N}),se("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(ee){n("update-status failed: %o",ee),se("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function nt(R){switch(R){case"blocked-col":return $;case"ready-col":return y;case"in-progress-col":return C;case"resolved-col":return V;default:return[]}}function it(R,N,ee){if(!o||!i)return;let u=nt(R),m=u.find(ye=>ye.id===N);if(!m)return;let T=u.filter(ye=>ye.id!==N),X=ee.closest?ee.closest(".board-card"):null,he=T.length;if(X){let ye=X.getAttribute("data-issue-id");if(ye===N)return;let ie=T.findIndex(Ie=>Ie.id===ye);ie>=0&&(he=ie)}let Ae=T.slice();Ae.splice(he,0,m),S.applyReorder(N,Ae,he)}function gt(){for(let R of Array.from(e.querySelectorAll(".board-column--drag-over")))R.classList.remove("board-column--drag-over")}let Je=null;e.addEventListener("dragover",R=>{R.preventDefault(),R.dataTransfer&&(R.dataTransfer.dropEffect="move");let ee=R.target.closest(".board-column");ee&&ee!==Je&&(Je&&Je.classList.remove("board-column--drag-over"),ee.classList.add("board-column--drag-over"),Je=ee)}),e.addEventListener("dragleave",R=>{let N=R.relatedTarget;(!N||!e.contains(N))&&Je&&(Je.classList.remove("board-column--drag-over"),Je=null)}),e.addEventListener("drop",R=>{R.preventDefault(),Je&&(Je.classList.remove("board-column--drag-over"),Je=null);let N=R.target,ee=N.closest(".board-column");if(!ee)return;let u=R.dataTransfer?.getData("text/plain")||"";if(!u)return;let m=ee.id,T=j.get(u);if(T&&T===m){if(uc.has(m)){if(A!=="manual"){se("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}it(m,u,N)}return}let X=dc[m];if(!X){se("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}E.get(u)!==X&&ct(u,X)}),e.addEventListener("keydown",R=>{let N=R.target;if(!(N instanceof HTMLElement))return;let ee=String(N.tagName||"").toLowerCase();if(ee==="input"||ee==="textarea"||ee==="select"||ee==="button"||ee==="a"||N.isContentEditable===!0)return;let u=N.closest(".board-card");if(!u)return;let m=String(R.key||"");if(m==="Enter"||m===" "){R.preventDefault();let Ae=u.getAttribute("data-issue-id");Ae&&r(Ae);return}if(m!=="ArrowUp"&&m!=="ArrowDown"&&m!=="ArrowLeft"&&m!=="ArrowRight")return;R.preventDefault();let T=u.closest(".board-column");if(!T)return;let X=Array.from(T.querySelectorAll(".board-card")),he=X.indexOf(u);if(m==="ArrowDown"&&he<X.length-1){yt(u,X[he+1]);return}if(m==="ArrowUp"&&he>0){yt(u,X[he-1]);return}if(m==="ArrowLeft"||m==="ArrowRight"){let Ae=Array.from(e.querySelectorAll(".board-column")),ye=Ae.indexOf(T),ie=m==="ArrowRight"?1:-1,Ie=ye+ie;for(;Ie>=0&&Ie<Ae.length;){let Ge=Ae[Ie].querySelector(".board-card");if(Ge){yt(u,Ge);return}Ie+=ie}}});function yt(R,N){try{R.tabIndex=-1,N.tabIndex=0,N.focus()}catch{}}let Qe=null;h&&h.subscribe&&(Qe=h.subscribe(()=>{try{_e()}catch{}}));let dt=null;a&&a.subscribe&&(dt=a.subscribe(()=>{try{_e()}catch{}}));let ut=null;return l&&l.subscribe&&(ut=l.subscribe(()=>{We()})),{async load(){n("load"),_e()},clear(){Xe(),_t(),Qe&&(Qe(),Qe=null),dt&&(dt(),dt=null),ut&&(ut(),ut=null),e.replaceChildren(),$=[],y=[],C=[],V=[],Z=[],ne=[],E=new Map,j=new Map}}}function cs(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function Bn(e,t){return e.filter(n=>{let r=cs(n);return!(r&&t.has(r))})}async function fc(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let n=!1;try{n=document.execCommand("copy")}finally{t.remove()}return n}catch{return!1}}async function _n(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let n=document.createElement("textarea");n.value=t,n.style.position="fixed",n.style.left="-9999px",document.body.appendChild(n),n.select();let r=!1;try{r=document.execCommand("copy")}finally{n.remove()}return r}catch{return!1}}var ci="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function pt(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var Wt=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],Un=[...Wt,"reasoning_output_tokens"],_c=["implementation","review-consult"];function ds(e){let t=0;for(let n of Wt)t+=pt(e?.[n]);return t}function mc(e){return!e||typeof e!="object"?!1:Wt.some(t=>Number.isFinite(e[t]))}function oi(e){return!e||typeof e!="object"?!1:Un.some(t=>Number.isFinite(e[t]))}function gc(e){let t={};for(let n of Un)e&&Number.isFinite(e[n])&&(t[n]=e[n]);return t}function ii(e){let t={};for(let n of Un)Number.isFinite(e[n])&&(t[n]=e[n]);return e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function ai(e,t){return e==="codex"?pt(t.input_tokens)+pt(t.output_tokens):ds(t)}function hc(e){return e==="claude"?"Claude":"Codex"}function bc(e){return`\u03C4 ${di(e)}`}function vc(e,t){let n=t.breakdown||{},r=[`\uC785\uB825 ${pt(n.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${pt(n.output_tokens).toLocaleString("en-US")}`];e==="claude"?r.push(`\uCE90\uC2DC\uC77D\uAE30 ${pt(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${pt(n.cache_creation_input_tokens).toLocaleString("en-US")}`):(r.push(`\uCE90\uC2DC\uC77D\uAE30 ${pt(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${pt(n.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(n.reasoning_output_tokens)&&r.push(`\uCD94\uB860\uCD9C\uB825 ${pt(n.reasoning_output_tokens).toLocaleString("en-US")}`));let o=[e==="claude"?"Claude subtotal = \uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"Codex subtotal = \uC785\uB825 + \uCD9C\uB825; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset",`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,r.join(" \xB7 ")];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&o.push(`$${t.total_cost_usd.toFixed(2)}`),t.replayed&&o.push(ci),o.join(`
`)}function ft(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let n of["claude","codex"]){let r=e.providers[n];r&&t.push({provider:n,label:`${hc(n)} ${bc(r.subtotal)}${typeof r.total_cost_usd=="number"&&Number.isFinite(r.total_cost_usd)?` \xB7 $${r.total_cost_usd.toFixed(2)}`:""}`,tooltip:vc(n,r)})}return t}function kr(e){let t={},n={claude:!0,codex:!1},r={claude:0,codex:0};for(let s of e)if(!(!s||!s.providers))for(let o of["claude","codex"]){let i=s.providers[o];if(!i)continue;let a=t[o];a||(a={subtotal:0,breakdown:{}},t[o]=a),a.subtotal+=i.subtotal;for(let l of Un)Number.isFinite(i.breakdown[l])&&(a.breakdown[l]=pt(a.breakdown[l])+pt(i.breakdown[l]));i.replayed&&(a.replayed=!0),o==="claude"&&(typeof i.total_cost_usd=="number"&&Number.isFinite(i.total_cost_usd)?r.claude+=i.total_cost_usd:n.claude=!1)}return t.claude&&n.claude&&(t.claude.total_cost_usd=r.claude),Object.keys(t).length===0?null:{providers:t,roles:{}}}function us(e){return!e||typeof e!="object"?null:Mt({attempt:{...e,bead_id:"__attempt__"}},"__attempt__")}function yc(e){return e==="codex"?"codex":"claude"}function tn(){return{subtotal:0,breakdown:gc(null),legs:[],replayed:!1,outer_count:0,outer_cost:0,outer_cost_count:0}}function wr(e,t,n){e.subtotal+=t.subtotal;for(let r of Un)Number.isFinite(t.usage[r])&&(e.breakdown[r]=pt(e.breakdown[r])+pt(t.usage[r]));e.legs.push(t),t.replayed===!0&&(e.replayed=!0),n&&(e.outer_count+=1,typeof t.usage.total_cost_usd=="number"&&Number.isFinite(t.usage.total_cost_usd)&&(e.outer_cost+=t.usage.total_cost_usd,e.outer_cost_count+=1))}function li(e,t){let n={subtotal:e.subtotal,breakdown:e.breakdown};return t&&(n.legs=e.legs),e.replayed&&(n.replayed=!0),n}function di(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function Tn(e){return mc(e)?`\u03C4 ${di(ds(e))}`:null}function Pt(e){let t=Tn(e);if(!t)return null;let n=e?.total_cost_usd;return typeof n=="number"&&Number.isFinite(n)?`${t} \xB7 $${n.toFixed(2)}`:t}function En(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${pt(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${pt(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${pt(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${pt(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let n=[`\uCD1D ${ds(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&n.push(ci),n.join(`
`)}function Mt(e,t){let n={claude:tn(),codex:tn()},r={orchestrator:{claude:tn(),codex:tn()},implementation:{claude:tn(),codex:tn()},"review-consult":{claude:tn(),codex:tn()}},s=new Set;for(let a of Object.values(e||{})){if(!a||a.bead_id!==t)continue;let l=a.usage;if(oi(l)){let p=yc(a.runner),f=ii(l),h={provider:p,role:"orchestrator",attempt_id:String(a.attempt_id||""),usage:f,subtotal:ai(p,f)};f.replayed===!0&&(h.replayed=!0),typeof a.model=="string"&&(h.model=a.model),typeof a.session_id=="string"&&(h.session_id=a.session_id),wr(n[p],h,!0),wr(r.orchestrator[p],h,!0)}let d=Array.isArray(a.usage_legs)?a.usage_legs:[];for(let p of d){if(!p||p.provider!=="codex"||!_c.includes(p.role)||!oi(p.usage))continue;let f=typeof p.receipt_id=="string"&&p.receipt_id.length>0?p.receipt_id:null;if(!f||s.has(f))continue;s.add(f);let h=ii(p.usage),S={provider:"codex",role:p.role,attempt_id:String(a.attempt_id||""),usage:h,subtotal:ai("codex",h)};S.receipt_id=f,typeof p.model=="string"&&(S.model=p.model),typeof p.session_id=="string"?S.session_id=p.session_id:typeof p.thread_id=="string"&&(S.session_id=p.thread_id),typeof p.turn_id=="string"&&(S.turn_id=p.turn_id),typeof p.completed_at=="string"&&(S.completed_at=p.completed_at),h.replayed===!0&&(S.replayed=!0),wr(n.codex,S,!1),wr(r[S.role].codex,S,!1)}}let o={};for(let a of["claude","codex"]){let l=n[a];if(l.legs.length===0)continue;let d=li(l,!1);a==="claude"&&l.outer_count>0&&l.outer_cost_count===l.outer_count&&(d.total_cost_usd=l.outer_cost),o[a]=d}if(Object.keys(o).length===0)return null;let i={};for(let a of["orchestrator","implementation","review-consult"]){let l={};for(let d of["claude","codex"]){let p=r[a][d];p.legs.length>0&&(l[d]={...li(p,!0),legs:p.legs})}Object.keys(l).length>0&&(i[a]=l)}return{providers:o,roles:i}}var{entries:vi,setPrototypeOf:ui,isFrozen:wc,getPrototypeOf:kc,getOwnPropertyDescriptor:$c}=Object,{freeze:kt,seal:It,create:bs}=Object,{apply:vs,construct:ys}=typeof Reflect<"u"&&Reflect;kt||(kt=function(t){return t});It||(It=function(t){return t});vs||(vs=function(t,n){for(var r=arguments.length,s=new Array(r>2?r-2:0),o=2;o<r;o++)s[o-2]=arguments[o];return t.apply(n,s)});ys||(ys=function(t){for(var n=arguments.length,r=new Array(n>1?n-1:0),s=1;s<n;s++)r[s-1]=arguments[s];return new t(...r)});var $r=$t(Array.prototype.forEach),xc=$t(Array.prototype.lastIndexOf),pi=$t(Array.prototype.pop),zn=$t(Array.prototype.push),Sc=$t(Array.prototype.splice),Sr=$t(String.prototype.toLowerCase),ps=$t(String.prototype.toString),fs=$t(String.prototype.match),jn=$t(String.prototype.replace),Ac=$t(String.prototype.indexOf),Tc=$t(String.prototype.trim),Nt=$t(Object.prototype.hasOwnProperty),wt=$t(RegExp.prototype.test),Hn=Ec(TypeError);function $t(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,r=new Array(n>1?n-1:0),s=1;s<n;s++)r[s-1]=arguments[s];return vs(e,t,r)}}function Ec(e){return function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return ys(e,n)}}function Le(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Sr;ui&&ui(e,null);let r=t.length;for(;r--;){let s=t[r];if(typeof s=="string"){let o=n(s);o!==s&&(wc(t)||(t[r]=o),s=o)}e[s]=!0}return e}function Cc(e){for(let t=0;t<e.length;t++)Nt(e,t)||(e[t]=null);return e}function Gt(e){let t=bs(null);for(let[n,r]of vi(e))Nt(e,n)&&(Array.isArray(r)?t[n]=Cc(r):r&&typeof r=="object"&&r.constructor===Object?t[n]=Gt(r):t[n]=r);return t}function Wn(e,t){for(;e!==null;){let r=$c(e,t);if(r){if(r.get)return $t(r.get);if(typeof r.value=="function")return $t(r.value)}e=kc(e)}function n(){return null}return n}var fi=kt(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),_s=kt(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),ms=kt(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Rc=kt(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),gs=kt(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Ic=kt(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),_i=kt(["#text"]),mi=kt(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),hs=kt(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),gi=kt(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),xr=kt(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Lc=It(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Dc=It(/<%[\w\W]*|[\w\W]*%>/gm),Oc=It(/\$\{[\w\W]*/gm),Pc=It(/^data-[\-\w.\u00B7-\uFFFF]+$/),Mc=It(/^aria-[\-\w]+$/),yi=It(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Nc=It(/^(?:\w+script|data):/i),Fc=It(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),wi=It(/^html$/i),qc=It(/^[a-z][.\w]*(-[.\w]+)+$/i),hi=Object.freeze({__proto__:null,ARIA_ATTR:Mc,ATTR_WHITESPACE:Fc,CUSTOM_ELEMENT:qc,DATA_ATTR:Pc,DOCTYPE_NAME:wi,ERB_EXPR:Dc,IS_ALLOWED_URI:yi,IS_SCRIPT_OR_DATA:Nc,MUSTACHE_EXPR:Lc,TMPLIT_EXPR:Oc}),Gn={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},Bc=function(){return typeof window>"u"?null:window},Uc=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let r=null,s="data-tt-policy-suffix";n&&n.hasAttribute(s)&&(r=n.getAttribute(s));let o="dompurify"+(r?"#"+r:"");try{return t.createPolicy(o,{createHTML(i){return i},createScriptURL(i){return i}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},bi=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function ki(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Bc(),t=le=>ki(le);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==Gn.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e,r=n,s=r.currentScript,{DocumentFragment:o,HTMLTemplateElement:i,Node:a,Element:l,NodeFilter:d,NamedNodeMap:p=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:f,DOMParser:h,trustedTypes:S}=e,$=l.prototype,y=Wn($,"cloneNode"),C=Wn($,"remove"),V=Wn($,"nextSibling"),Z=Wn($,"childNodes"),ne=Wn($,"parentNode");if(typeof i=="function"){let le=n.createElement("template");le.content&&le.content.ownerDocument&&(n=le.content.ownerDocument)}let q,L="",{implementation:A,createNodeIterator:E,createDocumentFragment:j,getElementsByTagName:pe}=n,{importNode:xe}=r,me=bi();t.isSupported=typeof vi=="function"&&typeof ne=="function"&&A&&A.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:fe,ERB_EXPR:Ee,TMPLIT_EXPR:Ue,DATA_ATTR:Ke,ARIA_ATTR:je,IS_SCRIPT_OR_DATA:$e,ATTR_WHITESPACE:D,CUSTOM_ELEMENT:U}=hi,{IS_ALLOWED_URI:_e}=hi,oe=null,ke=Le({},[...fi,..._s,...ms,...gs,..._i]),ge=null,Be=Le({},[...mi,...hs,...gi,...xr]),be=Object.seal(bs(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Ce=null,F=null,O=Object.seal(bs(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),re=!0,Se=!0,Re=!1,M=!0,B=!1,P=!0,ae=!1,ce=!1,w=!1,W=!1,H=!1,J=!1,de=!0,Te=!1,Ne="user-content-",Ze=!0,Xe=!1,lt={},st=null,_t=Le({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),vt=null,De=Le({},["audio","video","img","source","image","track"]),ot=null,We=Le({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),mt="http://www.w3.org/1998/Math/MathML",ct="http://www.w3.org/2000/svg",nt="http://www.w3.org/1999/xhtml",it=nt,gt=!1,Je=null,yt=Le({},[mt,ct,nt],ps),Qe=Le({},["mi","mo","mn","ms","mtext"]),dt=Le({},["annotation-xml"]),ut=Le({},["title","style","font","a","script"]),R=null,N=["application/xhtml+xml","text/html"],ee="text/html",u=null,m=null,T=n.createElement("form"),X=function(b){return b instanceof RegExp||b instanceof Function},he=function(){let b=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(m&&m===b)){if((!b||typeof b!="object")&&(b={}),b=Gt(b),R=N.indexOf(b.PARSER_MEDIA_TYPE)===-1?ee:b.PARSER_MEDIA_TYPE,u=R==="application/xhtml+xml"?ps:Sr,oe=Nt(b,"ALLOWED_TAGS")?Le({},b.ALLOWED_TAGS,u):ke,ge=Nt(b,"ALLOWED_ATTR")?Le({},b.ALLOWED_ATTR,u):Be,Je=Nt(b,"ALLOWED_NAMESPACES")?Le({},b.ALLOWED_NAMESPACES,ps):yt,ot=Nt(b,"ADD_URI_SAFE_ATTR")?Le(Gt(We),b.ADD_URI_SAFE_ATTR,u):We,vt=Nt(b,"ADD_DATA_URI_TAGS")?Le(Gt(De),b.ADD_DATA_URI_TAGS,u):De,st=Nt(b,"FORBID_CONTENTS")?Le({},b.FORBID_CONTENTS,u):_t,Ce=Nt(b,"FORBID_TAGS")?Le({},b.FORBID_TAGS,u):Gt({}),F=Nt(b,"FORBID_ATTR")?Le({},b.FORBID_ATTR,u):Gt({}),lt=Nt(b,"USE_PROFILES")?b.USE_PROFILES:!1,re=b.ALLOW_ARIA_ATTR!==!1,Se=b.ALLOW_DATA_ATTR!==!1,Re=b.ALLOW_UNKNOWN_PROTOCOLS||!1,M=b.ALLOW_SELF_CLOSE_IN_ATTR!==!1,B=b.SAFE_FOR_TEMPLATES||!1,P=b.SAFE_FOR_XML!==!1,ae=b.WHOLE_DOCUMENT||!1,W=b.RETURN_DOM||!1,H=b.RETURN_DOM_FRAGMENT||!1,J=b.RETURN_TRUSTED_TYPE||!1,w=b.FORCE_BODY||!1,de=b.SANITIZE_DOM!==!1,Te=b.SANITIZE_NAMED_PROPS||!1,Ze=b.KEEP_CONTENT!==!1,Xe=b.IN_PLACE||!1,_e=b.ALLOWED_URI_REGEXP||yi,it=b.NAMESPACE||nt,Qe=b.MATHML_TEXT_INTEGRATION_POINTS||Qe,dt=b.HTML_INTEGRATION_POINTS||dt,be=b.CUSTOM_ELEMENT_HANDLING||{},b.CUSTOM_ELEMENT_HANDLING&&X(b.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(be.tagNameCheck=b.CUSTOM_ELEMENT_HANDLING.tagNameCheck),b.CUSTOM_ELEMENT_HANDLING&&X(b.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(be.attributeNameCheck=b.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),b.CUSTOM_ELEMENT_HANDLING&&typeof b.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(be.allowCustomizedBuiltInElements=b.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),B&&(Se=!1),H&&(W=!0),lt&&(oe=Le({},_i),ge=[],lt.html===!0&&(Le(oe,fi),Le(ge,mi)),lt.svg===!0&&(Le(oe,_s),Le(ge,hs),Le(ge,xr)),lt.svgFilters===!0&&(Le(oe,ms),Le(ge,hs),Le(ge,xr)),lt.mathMl===!0&&(Le(oe,gs),Le(ge,gi),Le(ge,xr))),b.ADD_TAGS&&(typeof b.ADD_TAGS=="function"?O.tagCheck=b.ADD_TAGS:(oe===ke&&(oe=Gt(oe)),Le(oe,b.ADD_TAGS,u))),b.ADD_ATTR&&(typeof b.ADD_ATTR=="function"?O.attributeCheck=b.ADD_ATTR:(ge===Be&&(ge=Gt(ge)),Le(ge,b.ADD_ATTR,u))),b.ADD_URI_SAFE_ATTR&&Le(ot,b.ADD_URI_SAFE_ATTR,u),b.FORBID_CONTENTS&&(st===_t&&(st=Gt(st)),Le(st,b.FORBID_CONTENTS,u)),Ze&&(oe["#text"]=!0),ae&&Le(oe,["html","head","body"]),oe.table&&(Le(oe,["tbody"]),delete Ce.tbody),b.TRUSTED_TYPES_POLICY){if(typeof b.TRUSTED_TYPES_POLICY.createHTML!="function")throw Hn('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof b.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Hn('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');q=b.TRUSTED_TYPES_POLICY,L=q.createHTML("")}else q===void 0&&(q=Uc(S,s)),q!==null&&typeof L=="string"&&(L=q.createHTML(""));kt&&kt(b),m=b}},Ae=Le({},[..._s,...ms,...Rc]),ye=Le({},[...gs,...Ic]),ie=function(b){let z=ne(b);(!z||!z.tagName)&&(z={namespaceURI:it,tagName:"template"});let _=Sr(b.tagName),v=Sr(z.tagName);return Je[b.namespaceURI]?b.namespaceURI===ct?z.namespaceURI===nt?_==="svg":z.namespaceURI===mt?_==="svg"&&(v==="annotation-xml"||Qe[v]):!!Ae[_]:b.namespaceURI===mt?z.namespaceURI===nt?_==="math":z.namespaceURI===ct?_==="math"&&dt[v]:!!ye[_]:b.namespaceURI===nt?z.namespaceURI===ct&&!dt[v]||z.namespaceURI===mt&&!Qe[v]?!1:!ye[_]&&(ut[_]||!Ae[_]):!!(R==="application/xhtml+xml"&&Je[b.namespaceURI]):!1},Ie=function(b){zn(t.removed,{element:b});try{ne(b).removeChild(b)}catch{C(b)}},Ge=function(b,z){try{zn(t.removed,{attribute:z.getAttributeNode(b),from:z})}catch{zn(t.removed,{attribute:null,from:z})}if(z.removeAttribute(b),b==="is")if(W||H)try{Ie(z)}catch{}else try{z.setAttribute(b,"")}catch{}},we=function(b){let z=null,_=null;if(w)b="<remove></remove>"+b;else{let te=fs(b,/^[\r\n\t ]+/);_=te&&te[0]}R==="application/xhtml+xml"&&it===nt&&(b='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+b+"</body></html>");let v=q?q.createHTML(b):b;if(it===nt)try{z=new h().parseFromString(v,R)}catch{}if(!z||!z.documentElement){z=A.createDocument(it,"template",null);try{z.documentElement.innerHTML=gt?L:v}catch{}}let Q=z.body||z.documentElement;return b&&_&&Q.insertBefore(n.createTextNode(_),Q.childNodes[0]||null),it===nt?pe.call(z,ae?"html":"body")[0]:ae?z.documentElement:Q},at=function(b){return E.call(b.ownerDocument||b,b,d.SHOW_ELEMENT|d.SHOW_COMMENT|d.SHOW_TEXT|d.SHOW_PROCESSING_INSTRUCTION|d.SHOW_CDATA_SECTION,null)},Tt=function(b){return b instanceof f&&(typeof b.nodeName!="string"||typeof b.textContent!="string"||typeof b.removeChild!="function"||!(b.attributes instanceof p)||typeof b.removeAttribute!="function"||typeof b.setAttribute!="function"||typeof b.namespaceURI!="string"||typeof b.insertBefore!="function"||typeof b.hasChildNodes!="function")},St=function(b){return typeof a=="function"&&b instanceof a};function et(le,b,z){$r(le,_=>{_.call(t,b,z,m)})}let Et=function(b){let z=null;if(et(me.beforeSanitizeElements,b,null),Tt(b))return Ie(b),!0;let _=u(b.nodeName);if(et(me.uponSanitizeElement,b,{tagName:_,allowedTags:oe}),P&&b.hasChildNodes()&&!St(b.firstElementChild)&&wt(/<[/\w!]/g,b.innerHTML)&&wt(/<[/\w!]/g,b.textContent)||b.nodeType===Gn.progressingInstruction||P&&b.nodeType===Gn.comment&&wt(/<[/\w]/g,b.data))return Ie(b),!0;if(!(O.tagCheck instanceof Function&&O.tagCheck(_))&&(!oe[_]||Ce[_])){if(!Ce[_]&&Ye(_)&&(be.tagNameCheck instanceof RegExp&&wt(be.tagNameCheck,_)||be.tagNameCheck instanceof Function&&be.tagNameCheck(_)))return!1;if(Ze&&!st[_]){let v=ne(b)||b.parentNode,Q=Z(b)||b.childNodes;if(Q&&v){let te=Q.length;for(let K=te-1;K>=0;--K){let g=y(Q[K],!0);g.__removalCount=(b.__removalCount||0)+1,v.insertBefore(g,V(b))}}}return Ie(b),!0}return b instanceof l&&!ie(b)||(_==="noscript"||_==="noembed"||_==="noframes")&&wt(/<\/no(script|embed|frames)/i,b.innerHTML)?(Ie(b),!0):(B&&b.nodeType===Gn.text&&(z=b.textContent,$r([fe,Ee,Ue],v=>{z=jn(z,v," ")}),b.textContent!==z&&(zn(t.removed,{element:b.cloneNode()}),b.textContent=z)),et(me.afterSanitizeElements,b,null),!1)},ve=function(b,z,_){if(de&&(z==="id"||z==="name")&&(_ in n||_ in T))return!1;if(!(Se&&!F[z]&&wt(Ke,z))){if(!(re&&wt(je,z))){if(!(O.attributeCheck instanceof Function&&O.attributeCheck(z,b))){if(!ge[z]||F[z]){if(!(Ye(b)&&(be.tagNameCheck instanceof RegExp&&wt(be.tagNameCheck,b)||be.tagNameCheck instanceof Function&&be.tagNameCheck(b))&&(be.attributeNameCheck instanceof RegExp&&wt(be.attributeNameCheck,z)||be.attributeNameCheck instanceof Function&&be.attributeNameCheck(z,b))||z==="is"&&be.allowCustomizedBuiltInElements&&(be.tagNameCheck instanceof RegExp&&wt(be.tagNameCheck,_)||be.tagNameCheck instanceof Function&&be.tagNameCheck(_))))return!1}else if(!ot[z]){if(!wt(_e,jn(_,D,""))){if(!((z==="src"||z==="xlink:href"||z==="href")&&b!=="script"&&Ac(_,"data:")===0&&vt[b])){if(!(Re&&!wt($e,jn(_,D,"")))){if(_)return!1}}}}}}}return!0},Ye=function(b){return b!=="annotation-xml"&&fs(b,U)},Dt=function(b){et(me.beforeSanitizeAttributes,b,null);let{attributes:z}=b;if(!z||Tt(b))return;let _={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:ge,forceKeepAttr:void 0},v=z.length;for(;v--;){let Q=z[v],{name:te,namespaceURI:K,value:g}=Q,I=u(te),x=g,Y=te==="value"?x:Tc(x);if(_.attrName=I,_.attrValue=Y,_.keepAttr=!0,_.forceKeepAttr=void 0,et(me.uponSanitizeAttribute,b,_),Y=_.attrValue,Te&&(I==="id"||I==="name")&&(Ge(te,b),Y=Ne+Y),P&&wt(/((--!?|])>)|<\/(style|title|textarea)/i,Y)){Ge(te,b);continue}if(I==="attributename"&&fs(Y,"href")){Ge(te,b);continue}if(_.forceKeepAttr)continue;if(!_.keepAttr){Ge(te,b);continue}if(!M&&wt(/\/>/i,Y)){Ge(te,b);continue}B&&$r([fe,Ee,Ue],rt=>{Y=jn(Y,rt," ")});let Me=u(b.nodeName);if(!ve(Me,I,Y)){Ge(te,b);continue}if(q&&typeof S=="object"&&typeof S.getAttributeType=="function"&&!K)switch(S.getAttributeType(Me,I)){case"TrustedHTML":{Y=q.createHTML(Y);break}case"TrustedScriptURL":{Y=q.createScriptURL(Y);break}}if(Y!==x)try{K?b.setAttributeNS(K,te,Y):b.setAttribute(te,Y),Tt(b)?Ie(b):pi(t.removed)}catch{Ge(te,b)}}et(me.afterSanitizeAttributes,b,null)},Zt=function le(b){let z=null,_=at(b);for(et(me.beforeSanitizeShadowDOM,b,null);z=_.nextNode();)et(me.uponSanitizeShadowNode,z,null),Et(z),Dt(z),z.content instanceof o&&le(z.content);et(me.afterSanitizeShadowDOM,b,null)};return t.sanitize=function(le){let b=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},z=null,_=null,v=null,Q=null;if(gt=!le,gt&&(le="<!-->"),typeof le!="string"&&!St(le))if(typeof le.toString=="function"){if(le=le.toString(),typeof le!="string")throw Hn("dirty is not a string, aborting")}else throw Hn("toString is not a function");if(!t.isSupported)return le;if(ce||he(b),t.removed=[],typeof le=="string"&&(Xe=!1),Xe){if(le.nodeName){let g=u(le.nodeName);if(!oe[g]||Ce[g])throw Hn("root node is forbidden and cannot be sanitized in-place")}}else if(le instanceof a)z=we("<!---->"),_=z.ownerDocument.importNode(le,!0),_.nodeType===Gn.element&&_.nodeName==="BODY"||_.nodeName==="HTML"?z=_:z.appendChild(_);else{if(!W&&!B&&!ae&&le.indexOf("<")===-1)return q&&J?q.createHTML(le):le;if(z=we(le),!z)return W?null:J?L:""}z&&w&&Ie(z.firstChild);let te=at(Xe?le:z);for(;v=te.nextNode();)Et(v),Dt(v),v.content instanceof o&&Zt(v.content);if(Xe)return le;if(W){if(H)for(Q=j.call(z.ownerDocument);z.firstChild;)Q.appendChild(z.firstChild);else Q=z;return(ge.shadowroot||ge.shadowrootmode)&&(Q=xe.call(r,Q,!0)),Q}let K=ae?z.outerHTML:z.innerHTML;return ae&&oe["!doctype"]&&z.ownerDocument&&z.ownerDocument.doctype&&z.ownerDocument.doctype.name&&wt(wi,z.ownerDocument.doctype.name)&&(K="<!DOCTYPE "+z.ownerDocument.doctype.name+`>
`+K),B&&$r([fe,Ee,Ue],g=>{K=jn(K,g," ")}),q&&J?q.createHTML(K):K},t.setConfig=function(){let le=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};he(le),ce=!0},t.clearConfig=function(){m=null,ce=!1},t.isValidAttribute=function(le,b,z){m||he({});let _=u(le),v=u(b);return ve(_,v,z)},t.addHook=function(le,b){typeof b=="function"&&zn(me[le],b)},t.removeHook=function(le,b){if(b!==void 0){let z=xc(me[le],b);return z===-1?void 0:Sc(me[le],z,1)[0]}return pi(me[le])},t.removeHooks=function(le){me[le]=[]},t.removeAllHooks=function(){me=bi()},t}var $i=ki();var xi={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Si=e=>(...t)=>({_$litDirective$:e,values:t}),Ar=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,n,r){this._$Ct=t,this._$AM=n,this._$Ci=r}_$AS(t,n){return this.update(t,n)}update(t,n){return this.render(...n)}};var Yn=class extends Ar{constructor(t){if(super(t),this.it=tt,t.type!==xi.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===tt||t==null)return this._t=void 0,this.it=t;if(t===un)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let n=[t];return n.raw=n,this._t={_$litType$:this.constructor.resultType,strings:n,values:[]}}};Yn.directiveName="unsafeHTML",Yn.resultType=1;var Ai=Si(Yn);function xs(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var gn=xs();function Di(e){gn=e}var Xn={exec:()=>null};function Fe(e,t=""){let n=typeof e=="string"?e:e.source,r={replace:(s,o)=>{let i=typeof o=="string"?o:o.source;return i=i.replace(xt.caret,"$1"),n=n.replace(s,i),r},getRegex:()=>new RegExp(n,t)};return r}var zc=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),xt={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},jc=/^(?:[ \t]*(?:\n|$))+/,Hc=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Wc=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,Qn=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Gc=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Ss=/(?:[*+-]|\d{1,9}[.)])/,Oi=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Pi=Fe(Oi).replace(/bull/g,Ss).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Yc=Fe(Oi).replace(/bull/g,Ss).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),As=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Vc=/^[^\n]+/,Ts=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,Kc=Fe(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Ts).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Zc=Fe(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Ss).getRegex(),Lr="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Es=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Xc=Fe("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",Es).replace("tag",Lr).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Mi=Fe(As).replace("hr",Qn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Lr).getRegex(),Qc=Fe(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Mi).getRegex(),Cs={blockquote:Qc,code:Hc,def:Kc,fences:Wc,heading:Gc,hr:Qn,html:Xc,lheading:Pi,list:Zc,newline:jc,paragraph:Mi,table:Xn,text:Vc},Ti=Fe("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",Qn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Lr).getRegex(),Jc={...Cs,lheading:Yc,table:Ti,paragraph:Fe(As).replace("hr",Qn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Ti).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Lr).getRegex()},ed={...Cs,html:Fe(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",Es).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Xn,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:Fe(As).replace("hr",Qn).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Pi).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},td=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,nd=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Ni=/^( {2,}|\\)\n(?!\s*$)/,rd=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Dr=/[\p{P}\p{S}]/u,Rs=/[\s\p{P}\p{S}]/u,Fi=/[^\s\p{P}\p{S}]/u,sd=Fe(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Rs).getRegex(),qi=/(?!~)[\p{P}\p{S}]/u,od=/(?!~)[\s\p{P}\p{S}]/u,id=/(?:[^\s\p{P}\p{S}]|~)/u,ad=Fe(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",zc?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),Bi=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,ld=Fe(Bi,"u").replace(/punct/g,Dr).getRegex(),cd=Fe(Bi,"u").replace(/punct/g,qi).getRegex(),Ui="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",dd=Fe(Ui,"gu").replace(/notPunctSpace/g,Fi).replace(/punctSpace/g,Rs).replace(/punct/g,Dr).getRegex(),ud=Fe(Ui,"gu").replace(/notPunctSpace/g,id).replace(/punctSpace/g,od).replace(/punct/g,qi).getRegex(),pd=Fe("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,Fi).replace(/punctSpace/g,Rs).replace(/punct/g,Dr).getRegex(),fd=Fe(/\\(punct)/,"gu").replace(/punct/g,Dr).getRegex(),_d=Fe(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),md=Fe(Es).replace("(?:-->|$)","-->").getRegex(),gd=Fe("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",md).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Cr=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,hd=Fe(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Cr).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),zi=Fe(/^!?\[(label)\]\[(ref)\]/).replace("label",Cr).replace("ref",Ts).getRegex(),ji=Fe(/^!?\[(ref)\](?:\[\])?/).replace("ref",Ts).getRegex(),bd=Fe("reflink|nolink(?!\\()","g").replace("reflink",zi).replace("nolink",ji).getRegex(),Ei=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,Is={_backpedal:Xn,anyPunctuation:fd,autolink:_d,blockSkip:ad,br:Ni,code:nd,del:Xn,emStrongLDelim:ld,emStrongRDelimAst:dd,emStrongRDelimUnd:pd,escape:td,link:hd,nolink:ji,punctuation:sd,reflink:zi,reflinkSearch:bd,tag:gd,text:rd,url:Xn},vd={...Is,link:Fe(/^!?\[(label)\]\((.*?)\)/).replace("label",Cr).getRegex(),reflink:Fe(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Cr).getRegex()},ws={...Is,emStrongRDelimAst:ud,emStrongLDelim:cd,url:Fe(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",Ei).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:Fe(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",Ei).getRegex()},yd={...ws,br:Fe(Ni).replace("{2,}","*").getRegex(),text:Fe(ws.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Tr={normal:Cs,gfm:Jc,pedantic:ed},Vn={normal:Is,gfm:ws,breaks:yd,pedantic:vd},wd={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Ci=e=>wd[e];function Yt(e,t){if(t){if(xt.escapeTest.test(e))return e.replace(xt.escapeReplace,Ci)}else if(xt.escapeTestNoEncode.test(e))return e.replace(xt.escapeReplaceNoEncode,Ci);return e}function Ri(e){try{e=encodeURI(e).replace(xt.percentDecode,"%")}catch{return null}return e}function Ii(e,t){let n=e.replace(xt.findPipe,(o,i,a)=>{let l=!1,d=i;for(;--d>=0&&a[d]==="\\";)l=!l;return l?"|":" |"}),r=n.split(xt.splitPipe),s=0;if(r[0].trim()||r.shift(),r.length>0&&!r.at(-1)?.trim()&&r.pop(),t)if(r.length>t)r.splice(t);else for(;r.length<t;)r.push("");for(;s<r.length;s++)r[s]=r[s].trim().replace(xt.slashPipe,"|");return r}function Kn(e,t,n){let r=e.length;if(r===0)return"";let s=0;for(;s<r;){let o=e.charAt(r-s-1);if(o===t&&!n)s++;else if(o!==t&&n)s++;else break}return e.slice(0,r-s)}function kd(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let r=0;r<e.length;r++)if(e[r]==="\\")r++;else if(e[r]===t[0])n++;else if(e[r]===t[1]&&(n--,n<0))return r;return n>0?-2:-1}function Li(e,t,n,r,s){let o=t.href,i=t.title||null,a=e[1].replace(s.other.outputLinkReplace,"$1");r.state.inLink=!0;let l={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:o,title:i,text:a,tokens:r.inlineTokens(a)};return r.state.inLink=!1,l}function $d(e,t,n){let r=e.match(n.other.indentCodeCompensation);if(r===null)return t;let s=r[1];return t.split(`
`).map(o=>{let i=o.match(n.other.beginningSpace);if(i===null)return o;let[a]=i;return a.length>=s.length?o.slice(s.length):o}).join(`
`)}var Rr=class{constructor(e){ze(this,"options");ze(this,"rules");ze(this,"lexer");this.options=e||gn}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:Kn(n,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let n=t[0],r=$d(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:r}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){let r=Kn(n,"#");(this.options.pedantic||!r||this.rules.other.endingSpaceChar.test(r))&&(n=r.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:Kn(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let n=Kn(t[0],`
`).split(`
`),r="",s="",o=[];for(;n.length>0;){let i=!1,a=[],l;for(l=0;l<n.length;l++)if(this.rules.other.blockquoteStart.test(n[l]))a.push(n[l]),i=!0;else if(!i)a.push(n[l]);else break;n=n.slice(l);let d=a.join(`
`),p=d.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");r=r?`${r}
${d}`:d,s=s?`${s}
${p}`:p;let f=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(p,o,!0),this.lexer.state.top=f,n.length===0)break;let h=o.at(-1);if(h?.type==="code")break;if(h?.type==="blockquote"){let S=h,$=S.raw+`
`+n.join(`
`),y=this.blockquote($);o[o.length-1]=y,r=r.substring(0,r.length-S.raw.length)+y.raw,s=s.substring(0,s.length-S.text.length)+y.text;break}else if(h?.type==="list"){let S=h,$=S.raw+`
`+n.join(`
`),y=this.list($);o[o.length-1]=y,r=r.substring(0,r.length-h.raw.length)+y.raw,s=s.substring(0,s.length-S.raw.length)+y.raw,n=$.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:r,tokens:o,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim(),r=n.length>1,s={type:"list",raw:"",ordered:r,start:r?+n.slice(0,-1):"",loose:!1,items:[]};n=r?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=r?n:"[*+-]");let o=this.rules.other.listItemRegex(n),i=!1;for(;e;){let l=!1,d="",p="";if(!(t=o.exec(e))||this.rules.block.hr.test(e))break;d=t[0],e=e.substring(d.length);let f=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,y=>" ".repeat(3*y.length)),h=e.split(`
`,1)[0],S=!f.trim(),$=0;if(this.options.pedantic?($=2,p=f.trimStart()):S?$=t[1].length+1:($=t[2].search(this.rules.other.nonSpaceChar),$=$>4?1:$,p=f.slice($),$+=t[1].length),S&&this.rules.other.blankLine.test(h)&&(d+=h+`
`,e=e.substring(h.length+1),l=!0),!l){let y=this.rules.other.nextBulletRegex($),C=this.rules.other.hrRegex($),V=this.rules.other.fencesBeginRegex($),Z=this.rules.other.headingBeginRegex($),ne=this.rules.other.htmlBeginRegex($);for(;e;){let q=e.split(`
`,1)[0],L;if(h=q,this.options.pedantic?(h=h.replace(this.rules.other.listReplaceNesting,"  "),L=h):L=h.replace(this.rules.other.tabCharGlobal,"    "),V.test(h)||Z.test(h)||ne.test(h)||y.test(h)||C.test(h))break;if(L.search(this.rules.other.nonSpaceChar)>=$||!h.trim())p+=`
`+L.slice($);else{if(S||f.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||V.test(f)||Z.test(f)||C.test(f))break;p+=`
`+h}!S&&!h.trim()&&(S=!0),d+=q+`
`,e=e.substring(q.length+1),f=L.slice($)}}s.loose||(i?s.loose=!0:this.rules.other.doubleBlankLine.test(d)&&(i=!0)),s.items.push({type:"list_item",raw:d,task:!!this.options.gfm&&this.rules.other.listIsTask.test(p),loose:!1,text:p,tokens:[]}),s.raw+=d}let a=s.items.at(-1);if(a)a.raw=a.raw.trimEnd(),a.text=a.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let l of s.items){if(this.lexer.state.top=!1,l.tokens=this.lexer.blockTokens(l.text,[]),l.task){if(l.text=l.text.replace(this.rules.other.listReplaceTask,""),l.tokens[0]?.type==="text"||l.tokens[0]?.type==="paragraph"){l.tokens[0].raw=l.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),l.tokens[0].text=l.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let p=this.lexer.inlineQueue.length-1;p>=0;p--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[p].src)){this.lexer.inlineQueue[p].src=this.lexer.inlineQueue[p].src.replace(this.rules.other.listReplaceTask,"");break}}let d=this.rules.other.listTaskCheckbox.exec(l.raw);if(d){let p={type:"checkbox",raw:d[0]+" ",checked:d[0]!=="[ ]"};l.checked=p.checked,s.loose?l.tokens[0]&&["paragraph","text"].includes(l.tokens[0].type)&&"tokens"in l.tokens[0]&&l.tokens[0].tokens?(l.tokens[0].raw=p.raw+l.tokens[0].raw,l.tokens[0].text=p.raw+l.tokens[0].text,l.tokens[0].tokens.unshift(p)):l.tokens.unshift({type:"paragraph",raw:p.raw,text:p.raw,tokens:[p]}):l.tokens.unshift(p)}}if(!s.loose){let d=l.tokens.filter(f=>f.type==="space"),p=d.length>0&&d.some(f=>this.rules.other.anyLine.test(f.raw));s.loose=p}}if(s.loose)for(let l of s.items){l.loose=!0;for(let d of l.tokens)d.type==="text"&&(d.type="paragraph")}return s}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),r=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:r,title:s}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let n=Ii(t[1]),r=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===r.length){for(let i of r)this.rules.other.tableAlignRight.test(i)?o.align.push("right"):this.rules.other.tableAlignCenter.test(i)?o.align.push("center"):this.rules.other.tableAlignLeft.test(i)?o.align.push("left"):o.align.push(null);for(let i=0;i<n.length;i++)o.header.push({text:n[i],tokens:this.lexer.inline(n[i]),header:!0,align:o.align[i]});for(let i of s)o.rows.push(Ii(i,o.header.length).map((a,l)=>({text:a,tokens:this.lexer.inline(a),header:!1,align:o.align[l]})));return o}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;let o=Kn(n.slice(0,-1),"\\");if((n.length-o.length)%2===0)return}else{let o=kd(t[2],"()");if(o===-2)return;if(o>-1){let i=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,i).trim(),t[3]=""}}let r=t[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(r);o&&(r=o[1],s=o[3])}else s=t[3]?t[3].slice(1,-1):"";return r=r.trim(),this.rules.other.startAngleBracket.test(r)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?r=r.slice(1):r=r.slice(1,-1)),Li(t,{href:r&&r.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let r=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[r.toLowerCase()];if(!s){let o=n[0].charAt(0);return{type:"text",raw:o,text:o}}return Li(n,s,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let r=this.rules.inline.emStrongLDelim.exec(e);if(!(!r||r[3]&&n.match(this.rules.other.unicodeAlphaNumeric))&&(!(r[1]||r[2])||!n||this.rules.inline.punctuation.exec(n))){let s=[...r[0]].length-1,o,i,a=s,l=0,d=r[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(d.lastIndex=0,t=t.slice(-1*e.length+s);(r=d.exec(t))!=null;){if(o=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!o)continue;if(i=[...o].length,r[3]||r[4]){a+=i;continue}else if((r[5]||r[6])&&s%3&&!((s+i)%3)){l+=i;continue}if(a-=i,a>0)continue;i=Math.min(i,i+a+l);let p=[...r[0]][0].length,f=e.slice(0,s+r.index+p+i);if(Math.min(s,i)%2){let S=f.slice(1,-1);return{type:"em",raw:f,text:S,tokens:this.lexer.inlineTokens(S)}}let h=f.slice(2,-2);return{type:"strong",raw:f,text:h,tokens:this.lexer.inlineTokens(h)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," "),r=this.rules.other.nonSpaceChar.test(n),s=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return r&&s&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let n,r;return t[2]==="@"?(n=t[1],r="mailto:"+n):(n=t[1],r=n),{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let n,r;if(t[2]==="@")n=t[0],r="mailto:"+n;else{let s;do s=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(s!==t[0]);n=t[0],t[1]==="www."?r="http://"+t[0]:r=t[0]}return{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},Ft=class ks{constructor(t){ze(this,"tokens");ze(this,"options");ze(this,"state");ze(this,"inlineQueue");ze(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||gn,this.options.tokenizer=this.options.tokenizer||new Rr,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let n={other:xt,block:Tr.normal,inline:Vn.normal};this.options.pedantic?(n.block=Tr.pedantic,n.inline=Vn.pedantic):this.options.gfm&&(n.block=Tr.gfm,this.options.breaks?n.inline=Vn.breaks:n.inline=Vn.gfm),this.tokenizer.rules=n}static get rules(){return{block:Tr,inline:Vn}}static lex(t,n){return new ks(n).lex(t)}static lexInline(t,n){return new ks(n).inlineTokens(t)}lex(t){t=t.replace(xt.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){let r=this.inlineQueue[n];this.inlineTokens(r.src,r.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,n=[],r=!1){for(this.options.pedantic&&(t=t.replace(xt.tabCharGlobal,"    ").replace(xt.spaceLine,""));t;){let s;if(this.options.extensions?.block?.some(i=>(s=i.call({lexer:this},t,n))?(t=t.substring(s.raw.length),n.push(s),!0):!1))continue;if(s=this.tokenizer.space(t)){t=t.substring(s.raw.length);let i=n.at(-1);s.raw.length===1&&i!==void 0?i.raw+=`
`:n.push(s);continue}if(s=this.tokenizer.code(t)){t=t.substring(s.raw.length);let i=n.at(-1);i?.type==="paragraph"||i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+s.raw,i.text+=`
`+s.text,this.inlineQueue.at(-1).src=i.text):n.push(s);continue}if(s=this.tokenizer.fences(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.heading(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.hr(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.blockquote(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.list(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.html(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.def(t)){t=t.substring(s.raw.length);let i=n.at(-1);i?.type==="paragraph"||i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+s.raw,i.text+=`
`+s.raw,this.inlineQueue.at(-1).src=i.text):this.tokens.links[s.tag]||(this.tokens.links[s.tag]={href:s.href,title:s.title},n.push(s));continue}if(s=this.tokenizer.table(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.lheading(t)){t=t.substring(s.raw.length),n.push(s);continue}let o=t;if(this.options.extensions?.startBlock){let i=1/0,a=t.slice(1),l;this.options.extensions.startBlock.forEach(d=>{l=d.call({lexer:this},a),typeof l=="number"&&l>=0&&(i=Math.min(i,l))}),i<1/0&&i>=0&&(o=t.substring(0,i+1))}if(this.state.top&&(s=this.tokenizer.paragraph(o))){let i=n.at(-1);r&&i?.type==="paragraph"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+s.raw,i.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):n.push(s),r=o.length!==t.length,t=t.substring(s.raw.length);continue}if(s=this.tokenizer.text(t)){t=t.substring(s.raw.length);let i=n.at(-1);i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+s.raw,i.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):n.push(s);continue}if(t){let i="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(i);break}else throw new Error(i)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){let r=t,s=null;if(this.tokens.links){let l=Object.keys(this.tokens.links);if(l.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(r))!=null;)l.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(r=r.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(r))!=null;)r=r.slice(0,s.index)+"++"+r.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(r))!=null;)o=s[2]?s[2].length:0,r=r.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+r.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);r=this.options.hooks?.emStrongMask?.call({lexer:this},r)??r;let i=!1,a="";for(;t;){i||(a=""),i=!1;let l;if(this.options.extensions?.inline?.some(p=>(l=p.call({lexer:this},t,n))?(t=t.substring(l.raw.length),n.push(l),!0):!1))continue;if(l=this.tokenizer.escape(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.tag(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.link(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(l.raw.length);let p=n.at(-1);l.type==="text"&&p?.type==="text"?(p.raw+=l.raw,p.text+=l.text):n.push(l);continue}if(l=this.tokenizer.emStrong(t,r,a)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.codespan(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.br(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.del(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.autolink(t)){t=t.substring(l.raw.length),n.push(l);continue}if(!this.state.inLink&&(l=this.tokenizer.url(t))){t=t.substring(l.raw.length),n.push(l);continue}let d=t;if(this.options.extensions?.startInline){let p=1/0,f=t.slice(1),h;this.options.extensions.startInline.forEach(S=>{h=S.call({lexer:this},f),typeof h=="number"&&h>=0&&(p=Math.min(p,h))}),p<1/0&&p>=0&&(d=t.substring(0,p+1))}if(l=this.tokenizer.inlineText(d)){t=t.substring(l.raw.length),l.raw.slice(-1)!=="_"&&(a=l.raw.slice(-1)),i=!0;let p=n.at(-1);p?.type==="text"?(p.raw+=l.raw,p.text+=l.text):n.push(l);continue}if(t){let p="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(p);break}else throw new Error(p)}}return n}},Ir=class{constructor(e){ze(this,"options");ze(this,"parser");this.options=e||gn}space(e){return""}code({text:e,lang:t,escaped:n}){let r=(t||"").match(xt.notSpaceStart)?.[0],s=e.replace(xt.endingNewline,"")+`
`;return r?'<pre><code class="language-'+Yt(r)+'">'+(n?s:Yt(s,!0))+`</code></pre>
`:"<pre><code>"+(n?s:Yt(s,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}def(e){return""}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return`<hr>
`}list(e){let t=e.ordered,n=e.start,r="";for(let i=0;i<e.items.length;i++){let a=e.items[i];r+=this.listitem(a)}let s=t?"ol":"ul",o=t&&n!==1?' start="'+n+'"':"";return"<"+s+o+`>
`+r+"</"+s+`>
`}listitem(e){return`<li>${this.parser.parse(e.tokens)}</li>
`}checkbox({checked:e}){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox"> '}paragraph({tokens:e}){return`<p>${this.parser.parseInline(e)}</p>
`}table(e){let t="",n="";for(let s=0;s<e.header.length;s++)n+=this.tablecell(e.header[s]);t+=this.tablerow({text:n});let r="";for(let s=0;s<e.rows.length;s++){let o=e.rows[s];n="";for(let i=0;i<o.length;i++)n+=this.tablecell(o[i]);r+=this.tablerow({text:n})}return r&&(r=`<tbody>${r}</tbody>`),`<table>
<thead>
`+t+`</thead>
`+r+`</table>
`}tablerow({text:e}){return`<tr>
${e}</tr>
`}tablecell(e){let t=this.parser.parseInline(e.tokens),n=e.header?"th":"td";return(e.align?`<${n} align="${e.align}">`:`<${n}>`)+t+`</${n}>
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${Yt(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){let r=this.parser.parseInline(n),s=Ri(e);if(s===null)return r;e=s;let o='<a href="'+e+'"';return t&&(o+=' title="'+Yt(t)+'"'),o+=">"+r+"</a>",o}image({href:e,title:t,text:n,tokens:r}){r&&(n=this.parser.parseInline(r,this.parser.textRenderer));let s=Ri(e);if(s===null)return Yt(n);e=s;let o=`<img src="${e}" alt="${n}"`;return t&&(o+=` title="${Yt(t)}"`),o+=">",o}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:Yt(e.text)}},Ls=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},qt=class $s{constructor(t){ze(this,"options");ze(this,"renderer");ze(this,"textRenderer");this.options=t||gn,this.options.renderer=this.options.renderer||new Ir,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Ls}static parse(t,n){return new $s(n).parse(t)}static parseInline(t,n){return new $s(n).parseInline(t)}parse(t){let n="";for(let r=0;r<t.length;r++){let s=t[r];if(this.options.extensions?.renderers?.[s.type]){let i=s,a=this.options.extensions.renderers[i.type].call({parser:this},i);if(a!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(i.type)){n+=a||"";continue}}let o=s;switch(o.type){case"space":{n+=this.renderer.space(o);break}case"hr":{n+=this.renderer.hr(o);break}case"heading":{n+=this.renderer.heading(o);break}case"code":{n+=this.renderer.code(o);break}case"table":{n+=this.renderer.table(o);break}case"blockquote":{n+=this.renderer.blockquote(o);break}case"list":{n+=this.renderer.list(o);break}case"checkbox":{n+=this.renderer.checkbox(o);break}case"html":{n+=this.renderer.html(o);break}case"def":{n+=this.renderer.def(o);break}case"paragraph":{n+=this.renderer.paragraph(o);break}case"text":{n+=this.renderer.text(o);break}default:{let i='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return n}parseInline(t,n=this.renderer){let r="";for(let s=0;s<t.length;s++){let o=t[s];if(this.options.extensions?.renderers?.[o.type]){let a=this.options.extensions.renderers[o.type].call({parser:this},o);if(a!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){r+=a||"";continue}}let i=o;switch(i.type){case"escape":{r+=n.text(i);break}case"html":{r+=n.html(i);break}case"link":{r+=n.link(i);break}case"image":{r+=n.image(i);break}case"checkbox":{r+=n.checkbox(i);break}case"strong":{r+=n.strong(i);break}case"em":{r+=n.em(i);break}case"codespan":{r+=n.codespan(i);break}case"br":{r+=n.br(i);break}case"del":{r+=n.del(i);break}case"text":{r+=n.text(i);break}default:{let a='Token with "'+i.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return r}},Er,Zn=(Er=class{constructor(e){ze(this,"options");ze(this,"block");this.options=e||gn}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?Ft.lex:Ft.lexInline}provideParser(){return this.block?qt.parse:qt.parseInline}},ze(Er,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),ze(Er,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),Er),xd=class{constructor(...e){ze(this,"defaults",xs());ze(this,"options",this.setOptions);ze(this,"parse",this.parseMarkdown(!0));ze(this,"parseInline",this.parseMarkdown(!1));ze(this,"Parser",qt);ze(this,"Renderer",Ir);ze(this,"TextRenderer",Ls);ze(this,"Lexer",Ft);ze(this,"Tokenizer",Rr);ze(this,"Hooks",Zn);this.use(...e)}walkTokens(e,t){let n=[];for(let r of e)switch(n=n.concat(t.call(this,r)),r.type){case"table":{let s=r;for(let o of s.header)n=n.concat(this.walkTokens(o.tokens,t));for(let o of s.rows)for(let i of o)n=n.concat(this.walkTokens(i.tokens,t));break}case"list":{let s=r;n=n.concat(this.walkTokens(s.items,t));break}default:{let s=r;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let i=s[o].flat(1/0);n=n.concat(this.walkTokens(i,t))}):s.tokens&&(n=n.concat(this.walkTokens(s.tokens,t)))}}return n}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{let r={...n};if(r.async=this.defaults.async||r.async||!1,n.extensions&&(n.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=t.renderers[s.name];o?t.renderers[s.name]=function(...i){let a=s.renderer.apply(this,i);return a===!1&&(a=o.apply(this,i)),a}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=t[s.level];o?o.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),r.extensions=t),n.renderer){let s=this.defaults.renderer||new Ir(this.defaults);for(let o in n.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let i=o,a=n.renderer[i],l=s[i];s[i]=(...d)=>{let p=a.apply(s,d);return p===!1&&(p=l.apply(s,d)),p||""}}r.renderer=s}if(n.tokenizer){let s=this.defaults.tokenizer||new Rr(this.defaults);for(let o in n.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let i=o,a=n.tokenizer[i],l=s[i];s[i]=(...d)=>{let p=a.apply(s,d);return p===!1&&(p=l.apply(s,d)),p}}r.tokenizer=s}if(n.hooks){let s=this.defaults.hooks||new Zn;for(let o in n.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let i=o,a=n.hooks[i],l=s[i];Zn.passThroughHooks.has(o)?s[i]=d=>{if(this.defaults.async&&Zn.passThroughHooksRespectAsync.has(o))return(async()=>{let f=await a.call(s,d);return l.call(s,f)})();let p=a.call(s,d);return l.call(s,p)}:s[i]=(...d)=>{if(this.defaults.async)return(async()=>{let f=await a.apply(s,d);return f===!1&&(f=await l.apply(s,d)),f})();let p=a.apply(s,d);return p===!1&&(p=l.apply(s,d)),p}}r.hooks=s}if(n.walkTokens){let s=this.defaults.walkTokens,o=n.walkTokens;r.walkTokens=function(i){let a=[];return a.push(o.call(this,i)),s&&(a=a.concat(s.call(this,i))),a}}this.defaults={...this.defaults,...r}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Ft.lex(e,t??this.defaults)}parser(e,t){return qt.parse(e,t??this.defaults)}parseMarkdown(e){return(t,n)=>{let r={...n},s={...this.defaults,...r},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&r.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=e),s.async)return(async()=>{let i=s.hooks?await s.hooks.preprocess(t):t,a=await(s.hooks?await s.hooks.provideLexer():e?Ft.lex:Ft.lexInline)(i,s),l=s.hooks?await s.hooks.processAllTokens(a):a;s.walkTokens&&await Promise.all(this.walkTokens(l,s.walkTokens));let d=await(s.hooks?await s.hooks.provideParser():e?qt.parse:qt.parseInline)(l,s);return s.hooks?await s.hooks.postprocess(d):d})().catch(o);try{s.hooks&&(t=s.hooks.preprocess(t));let i=(s.hooks?s.hooks.provideLexer():e?Ft.lex:Ft.lexInline)(t,s);s.hooks&&(i=s.hooks.processAllTokens(i)),s.walkTokens&&this.walkTokens(i,s.walkTokens);let a=(s.hooks?s.hooks.provideParser():e?qt.parse:qt.parseInline)(i,s);return s.hooks&&(a=s.hooks.postprocess(a)),a}catch(i){return o(i)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let r="<p>An error occurred:</p><pre>"+Yt(n.message+"",!0)+"</pre>";return t?Promise.resolve(r):r}if(t)return Promise.reject(n);throw n}}},mn=new xd;function qe(e,t){return mn.parse(e,t)}qe.options=qe.setOptions=function(e){return mn.setOptions(e),qe.defaults=mn.defaults,Di(qe.defaults),qe};qe.getDefaults=xs;qe.defaults=gn;qe.use=function(...e){return mn.use(...e),qe.defaults=mn.defaults,Di(qe.defaults),qe};qe.walkTokens=function(e,t){return mn.walkTokens(e,t)};qe.parseInline=mn.parseInline;qe.Parser=qt;qe.parser=qt.parse;qe.Renderer=Ir;qe.TextRenderer=Ls;qe.Lexer=Ft;qe.lexer=Ft.lex;qe.Tokenizer=Rr;qe.Hooks=Zn;qe.parse=qe;var Gf=qe.options,Yf=qe.setOptions,Vf=qe.use,Kf=qe.walkTokens,Zf=qe.parseInline;var Xf=qt.parse,Qf=Ft.lex;function nn(e){let t=qe.parse(e),n=$i.sanitize(t);return Ai(n)}function Vt(e,t){return c`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function Cn(e){return e.loading?c`<div class="prompt-block__status">불러오는 중…</div>`:e.error?c`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function Or(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=r=>String(r).padStart(2,"0");return`${t.getFullYear()}-${n(t.getMonth()+1)}-${n(t.getDate())} ${n(t.getHours())}:${n(t.getMinutes())}`}var Sd={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},Ad=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,Td=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function rn(e){return!!e&&typeof e=="object"}function Ds(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function Hi(e,t){let n=Ds(e),r=Ds(t),s=new Map;for(let a of n)s.set(a,(s.get(a)||0)+1);let o=0;for(let a of r){let l=s.get(a)||0;l>0?s.set(a,l-1):o+=1}let i=0;for(let a of s.values())i+=a;return{added:o,removed:i}}function Ed(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(s=>rn(s)&&typeof s.text=="string"?s.text:"").join(""):rn(e)&&typeof e.text=="string"&&(t=e.text);let r=(String(t).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return r.length>120?`${r.slice(0,117)}\u2026`:r}function Cd(e){let t=String(e.name||""),n=e.input||{},r={kind:"tool",tool:t,icon:Sd[t]||"\u{1F527}",input:n,expandable:!0};if((t==="Read"||t==="Write")&&(r.path=String(n.file_path||n.path||"")),t==="Write"&&(r.added=Ds(n.content).length),t==="Edit"){r.path=String(n.file_path||n.path||"");let{added:s,removed:o}=Hi(n.old_string,n.new_string);r.added=s,r.removed=o}if(t==="MultiEdit"){r.path=String(n.file_path||n.path||"");let s=0,o=0,i=Array.isArray(n.edits)?n.edits:[];for(let a of i){let l=Hi(rn(a)?a.old_string:"",rn(a)?a.new_string:"");s+=l.added,o+=l.removed}r.added=s,r.removed=o}return t==="Bash"&&(r.command=String(n.command||"")),(t==="Grep"||t==="Glob")&&(r.command=String(n.pattern||n.query||"")),r}function Wi(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}function Gi(e){let t=e.split(/\r?\n/).find(r=>r.trim().length>0)||"",n=Ad.exec(t);return n?{kind:"gate",gate:n[2]==="implementation"?"impl":n[2],reviewer:n[3],verdict:n[4],time:n[5]?n[5].trim():void 0,text:t.trim()}:Td.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function Rd(e,t){if(e.type==="assistant"){let n=e.message,r=n&&Array.isArray(n.content)?n.content:[],s=[];for(let o of r)if(rn(o)){if(o.type==="text"&&typeof o.text=="string")s.push(Gi(o.text));else if(o.type==="thinking"){let i=Wi(o.thinking);i&&s.push(i)}else if(o.type==="tool_use"){let i=Cd(o);typeof o.id=="string"&&t.set(o.id,i),s.push(i)}}return s}if(e.type==="user"){let n=e.message,r=n&&Array.isArray(n.content)?n.content:[];for(let s of r)if(rn(s)&&s.type==="tool_result"){let o=t.get(String(s.tool_use_id));if(o){let i=Ed(s.content);o.result=i,o.output=typeof s.content=="string"?s.content:i}}return[]}if(e.type==="result"){let n=e.is_error===!1&&e.subtype==="success";return[{kind:"result",success:n,text:typeof e.result=="string"?e.result:n?"DONE":""}]}return[]}function Id(e){if(e.type==="item.completed"&&rn(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[Gi(t.text)];if(t.type==="reasoning"){let n=Wi(t.text);return n?[n]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function Ld(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function Yi(e){let t=[],n=new Map,r=Array.isArray(e)?e:[];for(let s of r){let o=s;if(typeof s=="string"){let a=s.trim();if(a.length===0)continue;try{o=JSON.parse(a)}catch{continue}}if(!rn(o))continue;let i=Ld(o)?Id(o):Rd(o,n);for(let a of i)t.push(a)}return t}var Dd=5,Od=10,Pd=/Task\s+#(\d+)/,Md=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,Nd=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function Pr(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function Fd(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function qd(e){for(let t=e.length-1;t>=0;t-=1){let n=e[t];if(n.kind==="phase"||n.kind==="gate")return n.text||null}return null}function Bd(e){let t=new Map,n=0;for(let s of e){if(s.kind!=="tool")continue;n+=1;let o=s.input||{};if(s.tool==="TaskCreate"){let l=Pd.exec(s.output||s.result||""),d=String(o.activeForm||o.subject||"").trim();if(!l||d.length===0)continue;t.set(l[1],{label:d,active:o.status==="in_progress"?n:0});continue}if(s.tool!=="TaskUpdate")continue;let i=t.get(String(o.taskId??""));if(!i)continue;let a=o.activeForm||o.subject;typeof a=="string"&&a.trim().length>0&&(i.label=a.trim()),typeof o.status=="string"&&(i.active=o.status==="in_progress"?n:0)}let r=null;for(let s of t.values())s.active>0&&(!r||s.active>r.active)&&(r=s);return r?r.label:null}function Ud(e){if(e.tool==="Bash"){let t=e.command||"";return Md.test(t)?"~ PR/\uAC8C\uC2DC \uC911":Nd.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function zd(e){let t=e.filter(s=>s.kind==="tool").slice(-Od),n=new Map;t.forEach((s,o)=>{let i=Ud(s);if(!i)return;let a=n.get(i)||{count:0,last:-1};a.count+=1,a.last=o,n.set(i,a)});let r=null;for(let[s,o]of n)(!r||o.count>r.count||o.count===r.count&&o.last>r.last)&&(r={label:s,count:o.count,last:o.last});return r?r.label:null}function jd(e){let t=qd(e);if(t)return{text:t,guess:!1};let n=Bd(e);if(n)return{text:n,guess:!1};let r=zd(e);return r?{text:r,guess:!0}:null}function Hd(e,t){if(typeof e!="number")return"";let n=Math.max(0,Math.floor((t-e)/1e3));return n<60?`${n}\uCD08 \uC804`:Ct(e,t)}function Mr(e,t={}){let{transport:n,sessionLogStore:r,onClose:s}=t,o=null,i={},a=!0,l=new Set,d=new Set,p=null,f=null,h=!1,S=!1,$=!1,y=null,C=null;function V(){h=!1,S=!1,$=!1,y=null,C=null}async function Z(F){if(n){S=!0,$=!1,D();try{let O=await Promise.resolve(n("get-attempt-prompt",{attempt_id:F}));if(o!==F)return;!O||typeof O!="object"||Array.isArray(O)?$=!0:(y=O,C=F)}catch{o===F&&($=!0)}finally{o===F&&(S=!1,D())}}}function ne(){if(h=!h,h&&o&&C!==o){Z(o);return}D()}function q(){if(!h)return"";let F=Cn({loading:S,error:$});if(F)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        ${F}
      </div>`;if(!y)return"";if(y.missing)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let O=Or(y.recorded_at);return c`<div class="sv__prompt" data-seam="attempt-prompt">
      ${O?c`<div class="prompt-block__meta">${O} 발송</div>`:""}
      ${typeof y.task_prompt=="string"?Vt("\uACFC\uC5C5 (user)",y.task_prompt):""}
      ${typeof y.system_prompt=="string"?Vt("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",y.system_prompt):""}
    </div>`}function L(){if(!o||!r)return[];let F=r.get(o);return Yi(F?F.lines:[])}function A(){if(!o||!r)return null;let F=r.get(o),O=F?F.last_event_at:null;return typeof O=="number"?O:null}function E(){return i.status==="running"}function j(){if(E()&&o){f||(f=setInterval(()=>D(),1e3));return}pe()}function pe(){f&&(clearInterval(f),f=null)}function xe(F){let O=[],re=0;for(;re<F.length;){let Se=F[re];if(Se.kind==="tool"){let Re=re;for(;Re<F.length&&F[Re].kind==="tool"&&F[Re].tool===Se.tool;)Re+=1;if(Re-re>=Dd&&!d.has(re)){O.push({kind:"group",idx:re,tool:Se.tool||"",lines:F.slice(re,Re).map((M,B)=>({idx:re+B,line:M}))}),re=Re;continue}}O.push({kind:"line",idx:re,line:Se}),re+=1}return O}function me(F){for(let O=F.length-1;O>=0;O-=1){let re=F[O];if(re.kind==="result"||re.kind==="error")return null;if(re.kind==="tool"&&!Object.hasOwn(re,"result"))return re}return null}function fe(F){for(let O=F.length-1;O>=0;O-=1)if(F[O].kind==="thinking")return F[O];return null}function Ee(F,O){if(O.kind==="gate")return c`<div class="sv__gate">${O.text}</div>`;if(O.kind==="phase")return c`<div class="sv__phase">${O.text}</div>`;if(O.kind==="result")return c`<div
        class="sv__result${O.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${O.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${nn(O.text||(O.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(O.kind==="thinking"){let re=l.has(F);return c`<div
        class="sv__think${re?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>_e(F)}
      >
        <span class="sv__think-line">💭 ${Pr(O.text)}</span>
        ${re?c`<pre class="sv__think-expand">${O.text}</pre>`:""}
      </div>`}if(O.kind==="error")return c`<div class="sv__error">⛔ ${O.text}</div>`;if(O.kind==="blocker")return c`<div class="sv__error">⛔ ${O.text}</div>`;if(O.kind==="tool"){let re=l.has(F),Se=O.tool==="Bash"?Fd(O.command):0,Re=O.tool==="Bash"?Se>1?Pr(O.command):O.command:O.path||O.command||"";return c`<div
        class="sv__tool${re?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>_e(F)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${O.icon}</span>
          <span class="sv__tool-name">${O.tool}</span>
          ${Re?c`<span class="sv__tool-detail">${Re}</span>`:""}
          ${Se>1?c`<span class="sv__tool-more">⋯ ${Se}줄</span>`:""}
          ${typeof O.added=="number"?c`<span class="sv__diff-add">+${O.added}</span>`:""}
          ${typeof O.removed=="number"?c`<span class="sv__diff-del">−${O.removed}</span>`:""}
          ${O.result?c`<span class="sv__tool-ok">→ ${O.result}</span>`:""}
        </span>
        ${re?c`<pre class="sv__tool-expand">${Ue(O)}</pre>`:""}
      </div>`}return c`<div class="sv__as">${nn(O.text||"")}</div>`}function Ue(F){let O=[];if(F.tool==="Bash"&&typeof F.command=="string"&&F.command.length>0)O.push(F.command);else if(F.input!==void 0)try{O.push(`input: ${JSON.stringify(F.input,null,2)}`)}catch{}return typeof F.output=="string"&&F.output.length>0&&O.push(`output:
${F.output}`),O.join(`

`)}function Ke(){if(!o)return c``;let F=L(),O=[i.runner,i.model,i.effort].filter(Boolean).join(" \xB7 "),re=i.session_id||"",Se=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${a?"ON":"OFF"}`,Re=E(),M=Re?Hd(A(),Date.now()):"",B=Re?me(F):null,P=Re?fe(F):null,ae=jd(F);return c`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id">${o}</span>
        ${ae?c`<span
              class="sv__stage${ae.guess?" sv__stage--guess":""}"
              title=${ae.text}
              >${ae.text}</span
            >`:""}
        ${Re?c`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${M?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${M}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${M?c`<span class="sv__live-ago">${M}</span>`:""}</span
            >`:""}
        ${re?c`<button
              type="button"
              class="sv__session"
              title=${re}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${re}`}
              @click=${()=>ke(re)}
            >
              ⧉ ${re.slice(0,8)}
            </button>`:""}
        ${O?c`<span class="sv__meta">${O}</span>`:""}
        ${i.worktree?c`<span class="sv__wt" title=${i.worktree}
              >${i.worktree}</span
            >`:""}
        <button
          type="button"
          class="sv__prompt-toggle${h?" sv__prompt-toggle--on":""}"
          data-seam="attempt-prompt-toggle"
          aria-pressed=${h?"true":"false"}
          aria-label="발송 프롬프트 보기"
          title="이 세션에 실제로 보낸 시스템·과업 프롬프트"
          @click=${ne}
        >
          ✉ 프롬프트
        </button>
        <button
          type="button"
          class="sv__follow${a?" sv__follow--on":""}"
          aria-pressed=${a?"true":"false"}
          aria-label=${Se}
          @click=${oe}
        >
          <span class="sv__follow-full">⇣ ${Se}</span>
          <span class="sv__follow-short">⇣ ${a?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>Ce()}
        >
          ✕
        </button>
      </div>
      ${q()}
      <div class="sv__body">
        ${F.length===0?c`<div class="sv__empty">세션 로그 없음</div>`:xe(F).map(ce=>ce.kind==="group"?je(ce):Ee(ce.idx,ce.line))}
      </div>
      ${B||P?c`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${B?c`<span class="sv__now-icon">${B.icon}</span>
                  <span class="sv__now-name">${B.tool}</span>
                  <span class="sv__now-detail"
                    >${B.tool==="Bash"?Pr(B.command):B.path||B.command||""}</span
                  >`:""}
            ${P?c`<span class="sv__now-think"
                  >💭 ${Pr(P.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function je(F){return c`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>$e(F.idx)}
    >
      <span class="sv__group-icon">${F.lines[0].line.icon}</span>
      <span class="sv__group-name">${F.tool}</span>
      <span class="sv__group-count">${F.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function $e(F){d.add(F),D()}function D(){Pe(Ke(),e),j(),a&&U()}function U(){let F=e.querySelector(".sv__body");F&&(F.scrollTop=F.scrollHeight)}function _e(F){l.has(F)?l.delete(F):l.add(F),D()}function oe(){a=!a,D()}function ke(F){_n(F).then(O=>{O?se("\uBCF5\uC0AC\uB428","success",1200):se("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function ge(F){!o||!F||(i={...i,...F},D())}function Be(F){let O=F.target;if(!O||!O.classList||!O.classList.contains("sv__body"))return;!(O.scrollHeight-O.scrollTop-O.clientHeight<=4)&&a&&(a=!1,D())}e.addEventListener("scroll",Be,!0);function be(F){let O=F&&F.attempt_id;O&&(o=O,i=F.meta||{},a=!0,l.clear(),d.clear(),V(),!p&&r&&(p=r.subscribe(D)),n&&Promise.resolve(n("subscribe-session-log",{id:`session-log:${o}`,attempt_id:o})).catch(()=>{}),D())}function Ce(){let F=o;o=null,l.clear(),d.clear(),V(),pe(),n&&F&&Promise.resolve(n("unsubscribe-session-log",{id:`session-log:${F}`})).catch(()=>{}),Pe(c``,e),s&&s()}return{open:be,updateMeta:ge,close:Ce,isOpen(){return o!==null},destroy(){pe(),p&&(p(),p=null),e.removeEventListener("scroll",Be,!0),o=null,Pe(c``,e)}}}function Jn(e){let t=e&&typeof e=="object"?e:{},n=t.metadata&&typeof t.metadata=="object"?t.metadata:{},r=Vi(t.spec_id),s=Vi(n.spec_id);return r?{path:r,source:"native",conflict:s.length>0&&s!==r}:s?{path:s,source:"metadata",conflict:!1}:{path:"",source:"none",conflict:!1}}function Vi(e){return typeof e=="string"?e.trim():""}function Wd(e){return["plan_review","plan_approval","plan_check"].some(t=>{let n=e[t];return typeof n=="string"&&n.trim().length>0})}function Gd(e){let t=e&&e.metadata||{},n=Jn(e),r=[];return n.path&&r.push({kind:"spec",path:n.path,missing_state:null}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&r.push({kind:"plan",path:t.plan_path.trim(),missing_state:Wd(t)?null:"plan_pending"}),r}function Ki(e,t){let n=Gd(e);return c`
    <div class="detail-section-label">Artifacts</div>
    ${n.length===0?c`<div class="detail-empty">산출물 없음</div>`:c`
          ${n.map(r=>c`<div class="detail-art">
                <span class="detail-art__ic" aria-hidden="true">▤</span>
                <button
                  type="button"
                  class="detail-art__path"
                  title=${`${r.path} \xB7 \uD074\uB9AD\uD558\uBA74 \uBCF5\uC0AC`}
                  @click=${s=>t.onCopyPath(s,r.path)}
                >
                  ${r.path}
                </button>
                <button
                  type="button"
                  class="detail-art__op"
                  @click=${s=>t.onOpenDoc(s,r.path,r.missing_state)}
                >
                  열기
                </button>
              </div>`)}
          <div class="detail-art__cap">경로 클릭 = 복사 · 열기 = 뷰어</div>
        `}
  `}var Yd="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",Vd=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,Kd=/^\*\*결론\*\* — (.+)$/;function Zi(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==Yd)return null;let n=Vd.exec(t[1]||"");if(!n)return null;let r=n[1].split(" ")[0],s=n[2],o=n[3],i=2;for(;i<t.length&&t[i].trim().length===0;)i+=1;let a=i<t.length?Kd.exec(t[i]):null,l=a?a[1].replace(/\s+/g," ").trim():"",d=a?i+1:i;return{lane:r,identifier:s,timestamp:o,conclusion:l,body:t.slice(d).join(`
`).trim()}}var Xi=20;function Qi(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let n=String(t.getMonth()+1).padStart(2,"0"),r=String(t.getDate()).padStart(2,"0"),s=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0");return`${n}-${r} ${s}:${o}`}function Zd(e){return e.length>Xi?`${e.slice(0,Xi)}\u2026`:e}function Xd(e,t,n,r){let s=`${t.lane} ${Zd(t.identifier)}`;return c`<div class="detail-report">
    <button
      type="button"
      class="detail-report__head"
      data-comment-id=${e.id}
      aria-expanded=${r?"true":"false"}
      @click=${()=>n.onToggle&&n.onToggle(e.id)}
    >
      <span class="detail-report__tri">${r?"\u25BE":"\u25B8"}</span>
      <span class="detail-report__glyph">🤖</span>
      <span class="detail-report__meta">
        <span class="detail-report__kind">작업 보고서</span>
        <span
          class="detail-report__lane${t.lane==="worker"?" detail-report__lane--worker":""}"
          title=${`${t.lane} ${t.identifier} \xB7 ${t.timestamp}`}
          >${s}</span
        >
        <span class="detail-report__time">${Qi(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${r&&t.body.length>0?c`<div class="detail-report__body">
          ${nn(t.body)}
        </div>`:""}
  </div>`}function Qd(e){return c`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${Qi(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${nn(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function Ji(e,t={},n={}){let r=Array.isArray(e)?e.filter(Boolean):[],s=n.expanded||new Set,o=typeof n.draft=="string"?n.draft:"",i=n.sending===!0,a=r.slice().sort((l,d)=>String(d.created_at||"").localeCompare(String(l.created_at||"")));return c`
    <div class="detail-section-label">댓글 (${r.length})</div>
    ${n.error?c`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:a.length===0?c`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:c`<div class="detail-comments" data-seam="comments">
            ${a.map(l=>{let d=Zi(typeof l.text=="string"?l.text:"");return d?Xd(l,d,t,s.has(l.id)):Qd(l)})}
          </div>`}
    <div class="detail-comment-compose">
      <textarea
        class="detail-comment-compose__input"
        aria-label="댓글 추가"
        placeholder="댓글 추가"
        rows="3"
        ?disabled=${i}
        .value=${o}
        @input=${l=>t.onDraftInput&&t.onDraftInput(l.target.value)}
      ></textarea>
      <div class="detail-comment-compose__row">
        <button
          type="button"
          class="detail-comment-compose__btn"
          ?disabled=${i||o.trim().length===0}
          @click=${()=>t.onSubmit&&t.onSubmit()}
        >
          댓글 추가
        </button>
      </div>
    </div>
  `}var Jd=["codex","opus","fable","self","skip"],eu=["codex","fable","skip"],tu=["low","medium","high","xhigh"],nu=["standard","fast_track"],Rn=["orchestration_model","orchestration_effort","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_runtime","impl_model","impl_effort"],Ps={orchestration_model:{title:"\uC6CC\uCEE4 \uC2E4\uD589 \uBAA8\uB378"},orchestration_effort:{title:"\uC6CC\uCEE4 reasoning effort"},spec_review_model:{title:"\uC2A4\uD399 \uB9AC\uBDF0\uC5B4"},spec_review_effort:{title:"\uC2A4\uD399 \uB9AC\uBDF0 reasoning effort"},plan_review_model:{title:"\uACC4\uD68D \uB9AC\uBDF0\uC5B4"},plan_review_effort:{title:"\uACC4\uD68D \uB9AC\uBDF0 reasoning effort"},impl_review_model:{title:"\uAD6C\uD604 \uB9AC\uBDF0\uC5B4"},impl_review_effort:{title:"\uAD6C\uD604 \uB9AC\uBDF0 reasoning effort"},impl_runtime:{title:"\uAD6C\uD604 runtime"},impl_model:{title:"\uAD6C\uD604 \uBAA8\uB378",help:"\uC6CC\uD06C\uD50C\uB85C\uAC00 \uBCF5\uC7A1 \uAD6C\uD604\uC778\uC9C0, \uBC94\uC704\uAC00 \uD55C\uC815\uB41C \uAD6C\uD604\uC778\uC9C0 \uD310\uB2E8\uD574 \uD604\uC7AC runtime\uC758 \uAD6C\uD604\uC6A9 \uBAA8\uB378\uC744 \uC120\uD0DD\uD569\uB2C8\uB2E4."},impl_effort:{title:"\uAD6C\uD604 reasoning effort",help:"\uC790\uB3D9 \uC120\uD0DD\uC774\uBA74 workflow tier\uC5D0 \uC120\uC5B8\uB41C effort\uB97C, \uBAA8\uB378\uB9CC \uC9C1\uC811 \uC9C0\uC815\uD588\uC73C\uBA74 \uD574\uB2F9 \uD558\uC704 \uC5D0\uC774\uC804\uD2B8 \uD638\uCD9C\uC758 \uAE30\uBCF8 effort\uB97C \uC0AC\uC6A9\uD569\uB2C8\uB2E4."},workflow_mode:{title:"\uC6CC\uD06C\uD50C\uB85C \uBAA8\uB4DC"}},ea={spec_review_effort:"spec_review_model",impl_review_effort:"impl_review_model",plan_review_effort:"plan_review_model"},ru=["self","skip"],su="opus",Ms={orchestration_model:"(\uAE30\uBCF8: opus)",orchestration_effort:"(\uAE30\uBCF8: CLI \uAE30\uBCF8)",spec_review_model:"(\uAE30\uBCF8: codex)",spec_review_effort:"(\uAE30\uBCF8: \uD504\uB9AC\uC14B)",impl_review_model:"(\uAE30\uBCF8: codex)",impl_review_effort:"(\uAE30\uBCF8: \uD504\uB9AC\uC14B)",impl_runtime:"(\uAE30\uBCF8: orchestration runtime \uC0C1\uC18D)",plan_review_model:"(\uAE30\uBCF8: codex)",plan_review_effort:"(\uAE30\uBCF8: \uD504\uB9AC\uC14B)",impl_model:"(\uAE30\uBCF8: \uC791\uC5C5 \uC131\uACA9\uC5D0 \uB530\uB77C \uAD6C\uD604 \uBAA8\uB378 \uC790\uB3D9 \uC120\uD0DD)",impl_effort:"(\uAE30\uBCF8: \uC120\uD0DD\uB41C \uAD6C\uD604 \uC5D0\uC774\uC804\uD2B8\uC758 reasoning effort \uC0AC\uC6A9)"};function Ns(e){let t=Ps[e]||{title:e};return c`<span data-exec-setting-label>
    <span data-exec-setting-title>${t.title}</span>
    <code data-exec-setting-key>${e}</code>
    ${t.help?c`<small data-exec-setting-help=${e}>${t.help}</small>`:""}
  </span>`}function ou(e,t,n=""){let r=t&&t[e];return typeof r=="string"&&r.length>0?`(\uAE30\uBCF8: ${r} \u2014 ${n||"\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4 \uD504\uB9AC\uC14B"})`:Ms[e]||"(\uAE30\uBCF8)"}function er(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function tr(e){if(!er(e)||!er(e.runners))return null;let t=Object.entries(e.runners).filter(([,n])=>er(n)&&er(n.models));return t.length>0?t:null}function Os(e){return{value:e,label:e}}function Fs(e){return{label:null,options:[{value:e,label:`${e} (\uBE44\uD638\uD658)`}]}}function ta(e,t,n=null){let r=tr(e);if(!r)return t?[{label:null,options:[Os(t)]}]:[];let s=r.filter(([i])=>n===null||i===n).map(([i,a])=>({label:i,options:Object.keys(a.models).map(Os)})),o=s.some(i=>i.options.some(a=>a.value===t));return t&&!o?[Fs(t),...s]:s}function hn(e,t){let n={label:null,options:e.map(Os)};return t&&!e.includes(t)?[Fs(t),n]:[n]}function Kt(e,t){let n=tr(e);if(!n||!t)return null;for(let[r,s]of n)if(Object.hasOwn(s.models,t))return r;return null}function sa(e,t){return er(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function Nr(e,t){let n=tr(e);if(!n||!t)return[];for(let[,r]of n)if(Object.hasOwn(r.models,t))return sa(r,r.models[t]);return[]}function oa(e){let t=tr(e);if(!t)return[];let n=[];for(let[,r]of t)for(let s of Object.values(r.models))for(let o of sa(r,s))n.includes(o)||n.push(o);return n}function ia(e,t){if(!t)return oa(e);let r=tr(e)?.find(([o])=>o===t)?.[1];if(!r)return[];let s=[];for(let o of Object.keys(r.models))for(let i of Nr(e,o))s.includes(i)||s.push(i);return s}function qr(e,t,n){let r={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},s=r.impl_runtime==="inherit"?n:r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:null;if(r.impl_runtime==="inherit"&&!s)return r.impl_model="",r.impl_effort="",r;let o=Kt(t,r.impl_model);if(r.impl_model&&(!s||o!==s))return r.impl_model="",r.impl_effort="",r;let i=r.impl_model?Nr(t,r.impl_model):ia(t,s);return r.impl_effort&&i.length>0&&!i.includes(r.impl_effort)&&(r.impl_effort=""),r}function In(e){let{selectedOf:t,effectiveOf:n,runner_catalog:r,controller_runtime:s}=e,o=n("orchestration_model")||su,i=n("impl_model"),a=n("impl_runtime"),l=a==="claude"||a==="codex"?a:a==="inherit"?s===void 0?Kt(r,o):s:null;return Rn.map(d=>{let p=t(d),f,h=!1;return d==="orchestration_model"?f=ta(r,p):d==="impl_runtime"?f=hn(["inherit","claude","codex"],p):d==="impl_model"?(f=l?ta(r,p,l):p?[Fs(p)]:[],h=a==="inherit"&&l===null):d==="orchestration_effort"?f=hn(Nr(r,o),p):d==="impl_effort"?(f=hn(i?Nr(r,i):l?ia(r,l):oa(r),p),h=a==="inherit"&&l===null):d==="plan_review_model"?f=hn(eu,p):Object.hasOwn(ea,d)?(f=hn(tu,p),h=ru.includes(n(ea[d]))):f=hn(Jd,p),{key:d,groups:f,selected:p,disabled:h,runner:d==="orchestration_model"?Kt(r,o):null}})}function Fr(e,t,n){return c`
    ${typeof n=="string"?c`<option value="" ?selected=${!t}>${n}</option>`:""}
    ${e.map(r=>r.label===null?r.options.map(s=>na(s,t)):c`<optgroup label=${r.label}>
            ${r.options.map(s=>na(s,t))}
          </optgroup>`)}
  `}function na(e,t){return c`<option value=${e.value} ?selected=${e.value===t}>
    ${e.label}
  </option>`}function ra(e,t,n,r,s,o,i){return c`
    <div class="detail-kv">
      <span class="detail-kv__k">${Ns(e)}</span>
      <span class="detail-kv__vgroup">
        <select
          class=${r?"detail-kv__v detail-kv__v--sel":"detail-kv__v"}
          aria-label=${e}
          data-key=${e}
          ?disabled=${s}
          @change=${a=>(e==="impl_runtime"||e==="impl_model"||e==="impl_effort")&&i.onImplTargetChange?i.onImplTargetChange(e,a.target.value):i.onChange(e,a.target.value)}
        >
          ${t}
        </select>
        ${o?c`<span class="detail-kv__note" data-runner-for=${e}
              >${o}</span
            >`:""}
      </span>
    </div>
  `}function aa(e,t,n,r,s=""){let o=e&&e.metadata||{},i=n&&typeof n=="object"?n:{},a=f=>typeof o[f]=="string"?o[f]:"",d=In({selectedOf:a,effectiveOf:f=>{let h=a(f);return h||(typeof i[f]=="string"?i[f]:"")},runner_catalog:r}),p=o.workflow_mode==="fast_track"?"fast_track":"standard";return c`
    <div class="detail-section-label">실행 설정 (수정 가능)</div>
    ${d.map(f=>ra(f.key,Fr(f.groups,f.selected,ou(f.key,i,s)),f.selected,!1,f.disabled,f.runner,t))}
    ${ra("workflow_mode",Fr(hn(nu,p),p),p,o.workflow_mode==="fast_track",!1,null,t)}
  `}function iu(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function la(e,t){let n=t.getWorkspacePath,r=t.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",i="",a="";function l($){$.key==="Escape"&&s&&($.preventDefault(),h())}document.addEventListener("keydown",l);function d(){return s?c`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>h()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${iu(s)}</span
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
            ${o==="loading"?c`<div class="mv__status">불러오는 중…</div>`:o==="pending"?c`<div class="mv__status">${a}</div>`:o==="error"?c`<div class="mv__status mv__status--error">
                      ${a||"\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}
                    </div>`:nn(i)}
          </div>
        </div>
      </div>
    `:c``}function p(){Pe(d(),e)}async function f($,y={}){s=$,o="loading",i="",a="",p();let C=n?n():"";if(!C){o="error",a="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",p();return}if(!r){o="error",a="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",p();return}let V="/api/doc?workspace="+encodeURIComponent(C)+"&path="+encodeURIComponent($);try{let Z=await r(V),ne=await Z.json().catch(()=>({}));if(!Z.ok||!ne||ne.ok!==!0){if(ne?.error==="not_found"&&y.missing_state==="plan_pending"){o="pending",a="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",p();return}o="error",a="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(ne&&ne.error||Z.status)+")",p();return}i=String(ne.content||""),o="ready",p()}catch{o="error",a="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",p()}}function h(){s=null,Pe(c``,e)}function S(){document.removeEventListener("keydown",l),h()}return{open:f,close:h,destroy:S}}var au=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],ua="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function lu(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function cu(e){let t=ft(e);if(t.length>0)return t.map(s=>c`<span class="detail-usage-total" title=${s.tooltip}
          >${s.label}</span
        >`);let n=Tn(e);if(!n||!e)return"";let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return c`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${n.replace(/^τ /,"\u03C4 \uCD1D ")}${r}</span
    >${e.replayed?c`<span class="detail-usage-partial" title=${ua}
          >부분 집계</span
        >`:""}`}function ca(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function da(e){if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?pa(t):""}function du(e){return e?["implementation","review-consult"].flatMap(n=>{let r=e.roles[n]?.codex;return r?r.legs.map(s=>{let i=ft({providers:{codex:{subtotal:s.subtotal,breakdown:s.usage,...s.replayed?{replayed:!0}:{}}},roles:{}})[0];return c`<div class="detail-session__leg detail-session__usage-detail">
        <span class="detail-session__leg-role detail-session__usage-label"
          >${n}</span
        >
        <span class="detail-session__leg-meta detail-session__usage-value"
          >${[s.provider,s.model].filter(Boolean).join(" \xB7 ")}</span
        >
        ${s.session_id?c`<span
              class="detail-session__leg-sid detail-session__sid"
              title=${s.session_id}
              >${s.session_id.slice(0,8)}</span
            >`:""}
        ${da(s.completed_at)?c`<span class="detail-session__leg-time detail-session__time"
              >${da(s.completed_at)}</span
            >`:""}
        ${i?c`<span class="detail-session__usage" title=${i.tooltip}
              >${i.label}</span
            >`:""}
      </div>`}):[]}):""}function uu(e,t){let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,r=[...au,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return c`<div class="detail-session__usage-detail">
    ${r.map(s=>c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${s.label}</span
          ><span class="detail-session__usage-value"
            >${lu(e[s.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${n===null?"":c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${n.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?c`<span class="detail-session__usage-note">${ua}</span>`:""}
  </div>`}var pu={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function pa(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=String(t.getHours()).padStart(2,"0"),r=String(t.getMinutes()).padStart(2,"0");return`${n}:${r}`}function fu(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,r])=>typeof r=="string"&&r.length>0).map(([r,s])=>`${r}=${s}`).join(" \xB7 "):"",n=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return c`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${n}</span>
    ${t?c`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}function fa(e,t={},n={}){let r=Array.isArray(e)?e:[],s=n.expanded||new Set;if(r.length===0)return c`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let o=new Set;for(let d of r)d&&typeof d.resumed_from=="string"&&d.resumed_from.length>0&&o.add(d.resumed_from);let i=d=>{if(!(d.status==="failed"||d.status==="orphaned"))return"";let f=typeof d.session_id=="string"&&d.session_id.length>0,h=o.has(d.attempt_id),S=f&&!h,$=f?h?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return c`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${d.attempt_id}
      ?disabled=${!S}
      title=${$}
      @click=${y=>{y.stopPropagation(),S&&t.onResume&&t.onResume(d.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},a=d=>{if(!(d.status==="failed"||d.status==="orphaned")||typeof d.cause!="string"||d.cause==="")return"";let f=d.cause_detail,h=f&&typeof f.reason=="string"&&f.reason.length>0?typeof f.command=="string"&&f.command.length>0?`${f.reason} \xB7 ${f.command}`:f.reason:d.cause;return c`<div class="detail-session__cause" title=${h}>
      ${d.cause}
    </div>`},l=d=>{let p=ca(us(d));if(ft(p).length===0&&!Tn(d.usage))return"";let f=s.has(d.attempt_id);return c`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${d.attempt_id}
      aria-expanded=${f?"true":"false"}
      title=${f?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${h=>{h.stopPropagation(),t.onToggleUsage&&t.onToggleUsage(d.attempt_id)}}
    >
      τ 자세히
    </button>`};return c`
    <div class="detail-section-label">
      세션 이력${cu(n.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${r.map(d=>{let p=us(d),f=ca(p),h=ft(f);return c`<div class="detail-session-row">
          <button
            type="button"
            class="detail-session detail-session--${d.status||"unknown"}"
            data-attempt-id=${d.attempt_id}
            @click=${()=>t.onOpen&&t.onOpen(d.attempt_id)}
          >
            <span class="detail-session__glyph"
              >${pu[d.status||""]||"\xB7"}</span
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
            ${h.length>0?c`<span class="detail-session__role">orchestrator</span>`:""}
            ${d.session_id?c`<span class="detail-session__sid" title=${d.session_id}
                  >${String(d.session_id).slice(0,8)}</span
                >`:""}
            ${h.length>0?h.map(S=>c`<span
                      class="detail-session__usage"
                      title=${S.tooltip}
                      >${S.label}</span
                    >`):Tn(d.usage)?c`<span class="detail-session__usage"
                    >${Tn(d.usage)}</span
                  >`:""}
            <span class="detail-session__time">${pa(d.started_at)}</span>
          </button>
          ${l(d)} ${i(d)} ${a(d)} ${fu(d)}
          ${s.has(d.attempt_id)&&d.usage?uu(d.usage,d.runner==="codex"?"codex":"claude"):""}
          ${du(p)}
        </div>`})}
    </div>
  `}function _a(e,t={}){return c`
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
          ${_u(e)}
        </div>`:""}
  `}function _u(e){let t=Cn(e);if(t)return t;let n=e.data;if(!n)return"";if(n.missing)return c`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof n.default_task_prompt=="string"?Vt("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",n.default_task_prompt):""}`;let r=Or(n.recorded_at);return c`<div class="detail-prompt__meta">
      ${n.attempt_id}${r?` \xB7 ${r}`:""}
    </div>
    ${typeof n.task_prompt=="string"?Vt("\uACFC\uC5C5 (user)",n.task_prompt):""}
    ${typeof n.system_prompt=="string"?Vt("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",n.system_prompt):""}`}var mu=["open","in_progress","deferred","resolved","closed"],gu=[0,1,2,3,4];function ma(e,t){let n=t.issueStores,r=t.onClose,s=t.transport,o=t.onNavigate,i=t.queueStore,a=t.execPresetStore,l=t.sessionLogStore,d=null,p=null,f={},h="",S=!1,$=!1,y=!1,C="",V="",Z="";function ne(){$=!1,y=!1,C="",V="",Z=""}let q=[],L=null,A=null,E=!1,j="",pe=!1,xe=0,me=new Set;function fe(){q=[],L=null,A=null,E=!1,j="",pe=!1,xe+=1,me.clear()}async function Ee(g){if(!s)return;let I=++xe;try{let x=await Promise.resolve(s("get-comments",{id:g}));if(I!==xe||g!==d)return;q=Array.isArray(x)?x:[],E=!1}catch{if(I!==xe||g!==d)return;E=!0}K()}function Ue(){if(!s||!d)return;let g=p&&typeof p.comment_count=="number"?p.comment_count:null;if(L!==d){L=d,A=g,Ee(d);return}g!==null&&g!==A&&(A=g,Ee(d))}function Ke(g){me.has(g)?me.delete(g):me.add(g),K()}function je(g){let I=j.trim().length===0;j=g,I!==(g.trim().length===0)&&K()}async function $e(){let g=j.trim();if(!s||!d||g.length===0||pe)return;let I=d;pe=!0,K();let x=!1;try{let Y=await Promise.resolve(s("add-comment",{id:I,text:g}));Array.isArray(Y)&&Y.length>0&&(x=!0,I===d&&(q=Y,E=!1,j="",A=Y.length))}catch{x=!1}x||se("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),I===d&&(pe=!1),K()}let D={onToggle:Ke,onDraftInput:je,onSubmit:$e},U=document.createElement("div");U.className="md-viewer-root",document.body.appendChild(U);let _e=la(U,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),oe=document.createElement("div");oe.className="session-log-root",document.body.appendChild(oe);let ke=Mr(oe,{transport:s?(g,I)=>Promise.resolve(s(g,I)):void 0,sessionLogStore:l}),ge=!1,Be=!1,be=!1,Ce=null,F=null,O=0;function re(g){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${g}`}function Se(){ge=!1,Be=!1,be=!1,Ce=null,F=null,O+=1}async function Re(g){if(!s)return;let I=++O;Be=!0,be=!1,K();try{let x=await Promise.resolve(s("get-bead-prompt",{bead_id:g}));if(I!==O)return;!x||typeof x!="object"||Array.isArray(x)?be=!0:(Ce=x,F=re(g))}catch{I===O&&(be=!0)}finally{I===O&&(Be=!1,K())}}function M(){if(ge=!ge,ge&&d&&F!==re(d)){Ce=null,Re(d);return}K()}function B(){if(!i||!d)return[];let g=i.get();return(g&&g.attempts?Object.values(g.attempts):[]).filter(x=>x&&x.bead_id===d).sort((x,Y)=>(Y.started_at||0)-(x.started_at||0)).map(x=>({attempt_id:x.attempt_id,bead_id:x.bead_id,status:x.status,started_at:typeof x.started_at=="number"?x.started_at:null,runner:x.runner||null,model:x.model||null,session_id:x.session_id||null,resumed_from:x.resumed_from||null,dismissed_at:typeof x.dismissed_at=="number"?x.dismissed_at:null,cause:typeof x.cause=="string"?x.cause:null,cause_detail:x.cause_detail||null,exec_default_preset_id:typeof x.exec_default_preset_id=="string"?x.exec_default_preset_id:null,exec_default_preset_revision:typeof x.exec_default_preset_revision=="number"?x.exec_default_preset_revision:null,exec_values:x.exec_values&&typeof x.exec_values=="object"?x.exec_values:null,usage:x.usage||null,usage_legs:Array.isArray(x.usage_legs)?x.usage_legs:[]}))}function P(){if(!i||!d)return null;let g=i.get();return Mt(g&&g.attempts||{},d)}let ae=new Set;function ce(g){ae.has(g)?ae.delete(g):ae.add(g),K()}function w(g){let I=i?i.get():null,x=I&&I.attempts?I.attempts[g]:null;ke.open({attempt_id:g,meta:x?{runner:x.runner||void 0,model:x.model||void 0,effort:x.effort||void 0,status:x.status||void 0,session_id:x.session_id||void 0}:{}})}async function W(g){if(!s||!g)return;let I=()=>{let Y=i?i.get():null;return Y&&typeof Y.revision=="number"?Y.revision:0},x=await s("worker-attempt-resume",{attempt_id:g,expected_revision:I()});if(x&&x.conflict){let Y=x.queue&&typeof x.queue.revision=="number"?x.queue.revision:I();x=await s("worker-attempt-resume",{attempt_id:g,expected_revision:Y})}x&&x.resumed===!1&&!x.conflict&&x.reason&&se(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${x.reason}`,"error",2400)}let H={onOpen:w,onResume:W,onToggleUsage:ce};function J(){let g=i?i.get():null,I=g&&g.default_exec_preset_id,x=typeof I=="string"?Ze()?.presets.find(Y=>Y.id===I):null;return x&&x.compatible!==!1&&x.settings?x.settings:{}}function de(){let g=i?i.get():null,I=g&&g.default_exec_preset_id,x=typeof I=="string"?Ze()?.presets.find(Y=>Y.id===I):null;return x&&x.compatible!==!1&&typeof x.name=="string"?x.name:""}function Te(){let g=i?i.get():null;return g&&g.runner_catalog||null}function Ne(){let g=p?.metadata&&typeof p.metadata=="object"?p.metadata:{},x=(Object.hasOwn(f,"orchestration_model")?f.orchestration_model:void 0)||(typeof g.orchestration_model=="string"?g.orchestration_model:"")||(typeof J().orchestration_model=="string"?J().orchestration_model:"")||"opus";return Kt(Te(),x)}function Ze(){let g=a?a.get():null;return!g||typeof g.revision!="number"?null:{revision:g.revision,presets:Array.isArray(g.presets)?g.presets:[]}}function Xe(g){let I=g&&g.settings&&typeof g.settings=="object"?g.settings:{},x=Y=>typeof I[Y]=="string"?I[Y]:Y==="impl_runtime"&&typeof I.impl_model=="string"&&Kt(Te(),I.impl_model)||"";return In({selectedOf:x,effectiveOf:x,runner_catalog:Te()}).some(Y=>Y.groups.some(Me=>Me.options.some(rt=>rt.value===Y.selected&&rt.label.endsWith("(\uBE44\uD638\uD658)"))))}function lt(g){a&&g&&typeof g.revision=="number"&&Array.isArray(g.presets)&&a.set({revision:g.revision,presets:g.presets})}async function st(){let g=Ze(),I=g?.presets.find(x=>x.id===h);if(!(!s||!d||!g||!I||Xe(I)||S)){S=!0,K();try{let x=await Promise.resolve(s("apply-exec-preset",{id:d,preset_id:I.id,expected_revision:g.revision}));if(x&&x.conflict){lt(x),se("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let Y=x&&Array.isArray(x.issue)?x.issue[0]:x?.issue;if(x&&x.applied&&Y&&typeof Y=="object"){p=Y;for(let Me of Rn)delete f[Me];se("\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",2400);return}x&&x.error==="bd_readback_failed"?se("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):se("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(x){x&&typeof x=="object"&&x.code==="bd_readback_failed"?se("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):se("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{S=!1,K()}}}function _t(){let g=Ze();if(g&&g.presets.length===0)return c`<section class="detail-exec-presets">
        <div class="detail-section-label">실행 프리셋</div>
        <p>전역 실행 설정에서 프리셋을 추가하세요.</p>
        <button
          type="button"
          data-open-exec-presets
          @click=${()=>t.onOpenExecPresets?.()}
        >
          전역 실행 설정 열기
        </button>
      </section>`;let I=g?g.presets:[],x=I.find(Me=>Me.id===h),Y=x?Xe(x):!1;return c`<section class="detail-exec-presets">
      <div class="detail-section-label">실행 프리셋</div>
      <div class="detail-exec-presets__controls">
        <select
          data-exec-preset-select
          aria-label="실행 프리셋"
          ?disabled=${g===null||S}
          @change=${Me=>{h=Me.target.value,K()}}
        >
          <option value="" ?selected=${h===""}>
            ${g===null?"\uBD88\uB7EC\uC624\uB294 \uC911\u2026":"\uD504\uB9AC\uC14B \uC120\uD0DD"}
          </option>
          ${I.map(Me=>{let rt=Xe(Me);return c`<option
              value=${Me.id}
              ?selected=${Me.id===h}
            >
              ${Me.name}${rt?" (\uBE44\uD638\uD658)":""}
            </option>`})}
        </select>
        <button
          type="button"
          data-apply-exec-preset
          ?disabled=${g===null||!x||Y||S}
          @click=${()=>{st()}}
        >
          11개 설정 적용
        </button>
      </div>
      <p>적용하면 현재 이슈 실행 설정 전체를 교체합니다.</p>
    </section>`}let vt=null;n&&n.subscribe&&(vt=n.subscribe(()=>mt()));let De=null;i&&typeof i.subscribe=="function"&&(De=i.subscribe(()=>{d&&K()}));let ot=null;a&&typeof a.subscribe=="function"&&(ot=a.subscribe(()=>{d&&K()}));function We(g){g.key==="Escape"&&d&&(g.preventDefault(),r())}document.addEventListener("keydown",We);function mt(){if(d){if(n&&typeof n.snapshotFor=="function"){let g=n.snapshotFor("detail:"+d)||[];p=g.find(x=>x&&x.id===d)||g[0]||p}Ue(),K()}}function ct(g){_n(g).then(I=>{I?se("\uBCF5\uC0AC\uB428","success",1200):se("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function nt(g){g.preventDefault(),g.stopPropagation(),d&&ct(d)}function it(g,I){g.preventDefault(),g.stopPropagation(),ct(I)}function gt(g,I,x){g.preventDefault(),g.stopPropagation(),_e.open(I,{missing_state:x})}function Je(g,I){f[g]=I,K(),!(!s||!d)&&Promise.resolve(s("update-exec-settings",{id:d,key:g,value:I})).catch(()=>{se("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}function yt(g,I){let x=p||{},Y=x.metadata&&typeof x.metadata=="object"?x.metadata:{},Me={};for(let Oe of["impl_runtime","impl_model","impl_effort"])Me[Oe]=Object.hasOwn(f,Oe)?f[Oe]:typeof Y[Oe]=="string"?Y[Oe]:"";Me[g]=I;let rt=qr(Me,Te(),Ne()),ht={};for(let Oe of["impl_runtime","impl_model","impl_effort"])ht[Oe]=f[Oe],f[Oe]=rt[Oe]||"";K(),!(!s||!d)&&Promise.resolve(s("update-impl-target",{id:d,...rt,orchestration_runtime:Ne()})).then(Oe=>{let Xt=Array.isArray(Oe)?Oe[0]:Oe;if(!Xt||typeof Xt!="object"||!Xt.id)throw new Error("implementation target readback failed");p=Xt;for(let an of["impl_runtime","impl_model","impl_effort"])delete f[an];K()}).catch(()=>{for(let Oe of["impl_runtime","impl_model","impl_effort"])ht[Oe]===void 0?delete f[Oe]:f[Oe]=ht[Oe];K(),se("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error")})}async function Qe(g,I,x){if(!s||!d)return!1;try{let Y=await Promise.resolve(s(g,I)),Me=Array.isArray(Y)?Y[0]:Y;return Me&&typeof Me=="object"&&Me.id?(p=Me,!0):(se(x,"error"),!1)}catch{return se(x,"error"),!1}}function dt(g){setTimeout(()=>{try{let I=e.querySelector(g);I&&typeof I.focus=="function"&&I.focus()}catch{}},0)}function ut(){$=!0,C=p&&p.title||"",K(),dt('.detail-edit__input[data-edit="title"]')}function R(g){C=g.target.value}function N(){$=!1,C="",K()}function ee(){Qe("edit-text",{id:d,field:"title",value:C},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(I=>{I&&($=!1,C=""),K()})}function u(){y=!0,V=p&&p.description||"",K(),dt('.detail-edit__textarea[data-edit="description"]')}function m(g){V=g.target.value}function T(){y=!1,V="",K()}function X(){Qe("edit-text",{id:d,field:"description",value:V},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(I=>{I&&(y=!1,V=""),K()})}function he(g,I,x,Y){if(g.key==="Escape"){g.stopPropagation(),x();return}g.key==="Enter"&&(!Y||g.ctrlKey||g.metaKey)&&(g.preventDefault(),I())}function Ae(g){let I=g.target.value;Qe("update-status",{id:d,status:I},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>K())}function ye(g){let I=Number(g.target.value);Qe("update-priority",{id:d,priority:I},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>K())}function ie(g){Z=g.target.value}function Ie(){let g=Z.trim();g.length!==0&&Qe("label-add",{id:d,label:g},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(I=>{I&&(Z=""),K()})}function Ge(g){if(g.key==="Escape"){g.stopPropagation(),Z="",K();return}g.key==="Enter"&&(g.preventDefault(),Ie())}function we(g){Qe("label-remove",{id:d,label:g},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>K())}let at={onCopyPath:it,onOpenDoc:gt},Tt={onChange:Je,onImplTargetChange:yt};function St(g){return typeof g=="string"?g:g&&typeof g=="object"?String(g.id||g.to||g.issue_id||g.depends_on||""):""}function et(g){switch(g&&typeof g=="object"?String(g.dependency_type||g.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function Et(g){let x=(Array.isArray(g.dependencies)?g.dependencies:[]).map(Y=>({id:St(Y),icon:et(Y)})).filter(Y=>Y.id.length>0);return c`
      <div class="detail-section-label">의존성</div>
      ${x.length===0?c`<div class="detail-empty">의존성 없음</div>`:c`<div class="detail-deps">
            ${x.map(Y=>o?c`<button
                    type="button"
                    class="detail-dep detail-dep--link"
                    @click=${()=>o(Y.id)}
                  >
                    ${Y.icon?`${Y.icon} `:""}${Y.id}
                  </button>`:c`<span class="detail-dep"
                    >${Y.icon?`${Y.icon} `:""}${Y.id}</span
                  >`)}
          </div>`}
    `}function ve(g){let I=g.metadata||{},x=g.workflow||{},Y=x.stages||{},Me=Y.spec&&Y.spec.stale,rt=Y.impl&&Y.impl.stale,ht=Y.plan||null,Oe=x.route_source==="derived",Xt=x.route||I.route||"\u2014";return c`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${Oe?" detail-kv__v--derived":""}"
          title=${Oe?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${Oe?"unset":Xt}</span
        >
      </div>
      ${x.route!=="quick_fix"||Object.hasOwn(I,"spec_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${I.spec_review||"\uC5C6\uC74C"}${Me?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${x.route==="full_plan"?c`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${ht?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${ht?.approval_receipt||"\uC5C6\uC74C"}${ht?.approval_state==="stale"?" \xB7 stale":ht?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${x.route!=="quick_fix"||Object.hasOwn(I,"impl_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${I.impl_review||"\uC5C6\uC74C"}${rt?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${I.pr_url?c`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${I.pr_url}</span>
          </div>`:""}
    `}let Ye={route:["quick_fix","spec_backed","full_plan"]};async function Dt(g,I){let x=I.target.value;if(g==="route"&&p&&p.metadata&&p.metadata.route==="full_plan"&&x!=="full_plan"&&!window.confirm(`full_plan \u2192 ${x||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){K();return}await Qe("update-workflow-meta",{id:d,key:g,value:x},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),K()}function Zt(g){let I=g.metadata||{};return c` ${((Y,Me)=>{let rt=Ye[Y],ht=typeof I[Y]=="string"?I[Y]:"";return c`<div class="detail-kv">
        <span class="detail-kv__k">${Y}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${Y}
          data-edit=${`wfmeta-${Y}`}
          @change=${Oe=>Dt(Y,Oe)}
        >
          <option value="" ?selected=${!rt.includes(ht)}>
            ${Me}
          </option>
          ${rt.map(Oe=>c`<option value=${Oe} ?selected=${ht===Oe}>${Oe}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function le(g,I){return $?c`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${C}
            @input=${R}
            @keydown=${x=>he(x,ee,N,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${ee}
            >
              저장
            </button>
            <button
              type="button"
              class="detail-edit__cancel"
              data-edit="title-cancel"
              @click=${N}
            >
              취소
            </button>
          </div>
        </div>
      `:c`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${g}</h2>
        ${ft(I).map(x=>c`<span class="detail-usage-total" title=${x.tooltip}
              >${x.label}</span
            >`)}
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${ut}
        >
          ✎
        </button>
      </div>
    `}function b(g){let I=bt(g.created_at),x=bt(g.updated_at);return!I&&!x?c``:c`
      ${I?c`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${I}</span>
          </div>`:""}
      ${x?c`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${x}</span>
          </div>`:""}
    `}function z(g,I){return c`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${Ae}
        >
          ${mu.map(x=>c`<option value=${x} ?selected=${x===g}>${x}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${ye}
        >
          ${gu.map(x=>c`<option value=${String(x)} ?selected=${x===I}>
                P${x}
              </option>`)}
        </select>
      </div>
    `}function _(g){return c`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${y?"":c`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${u}
            >
              ✎
            </button>`}
      </div>
      ${y?c`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${V}
              @input=${m}
              @keydown=${I=>he(I,X,T,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${X}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${T}
              >
                취소
              </button>
            </div>
          </div>`:c`<div class="detail-overlay__desc">
            ${g||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function v(g){let I=typeof g.notes=="string"?g.notes:"";return I.trim().length===0?c``:c`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${I}</div>
    `}function Q(g){let I=Array.isArray(g.labels)?g.labels:[];return c`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${I.map(x=>c`<span class="detail-label-chip"
              >${x}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${x}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+x}
                @click=${()=>we(x)}
              >
                ×
              </button></span
            >`)}
        <span class="detail-label-add">
          <input
            class="detail-label-add__input"
            aria-label="라벨 추가"
            placeholder="라벨 추가"
            .value=${Z}
            @input=${ie}
            @keydown=${Ge}
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
    `}function te(){if(!d)return c``;let g=p||{},I=String(g.id||d),x=g.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",Y=P(),Me=g.status||"open",rt=typeof g.priority=="number"?Math.max(0,Math.min(4,g.priority)):"",ht=g.description||"",Oe={...g,metadata:{...g.metadata||{},...f}};return c`
      <div class="detail-overlay" role="dialog" aria-modal="true">
        <div class="detail-overlay__backdrop" @click=${()=>r()}></div>
        <div class="detail-overlay__panel">
          <button
            type="button"
            class="detail-overlay__close"
            aria-label="닫기"
            @click=${()=>r()}
          >
            ✕
          </button>
          <button
            type="button"
            class="detail-overlay__id"
            title="ID 복사"
            @click=${nt}
          >
            ${I}
          </button>
          ${le(x,Y)}
          ${z(Me,rt)} ${b(g)}
          ${_(ht)}
          ${Ji(q,D,{expanded:me,draft:j,sending:pe,error:E})}
          ${v(g)} ${Q(g)} ${Et(g)}
          ${ve(g)} ${Zt(g)}
          ${Ki(g,at)}
          ${_t()}
          ${aa(Oe,Tt,J(),Te(),de())}
          ${_a({expanded:ge,loading:Be,error:be,data:Ce},{onToggle:M})}
          ${fa(B(),H,{total:Y,expanded:ae})}
        </div>
      </div>
    `}function K(){Pe(te(),e)}return{load(g){g!==d&&(f={},h="",ne(),fe(),Se()),d=g,p=null,mt()},clear(){d=null,p=null,f={},h="",S=!1,ne(),fe(),Se(),_e.close(),ke.close(),Pe(c``,e)},destroy(){vt&&(vt(),vt=null),De&&(De(),De=null),ot&&(ot(),ot=null),document.removeEventListener("keydown",We),_e.destroy(),U.parentNode&&U.parentNode.removeChild(U),ke.destroy(),oe.parentNode&&oe.parentNode.removeChild(oe),d=null,p=null,h="",S=!1,fe(),Se(),Pe(c``,e)}}}var hu=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function ga(e,t){return ls(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function bu(e,t,n){if(!n)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(o=>o!==e)};let r=t.hidden_labels.filter(o=>o!==e);return t.hidden_prefixes.some(o=>o.length>0&&e.startsWith(o))?{hidden_labels:r,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:r}}function ha(e,t){let{policyStore:n,transport:r,labelOptions:s}=t,o=document.createElement("dialog");o.id="display-settings-dialog",o.className="display-settings",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),e.appendChild(o);let i="";async function a(A){let E=n.get();if(E)try{let j=await r("display-policy-set",{expected_revision:E.revision,policy:A(E)});l(j),j&&j.conflict&&j.policy&&(j=await r("display-policy-set",{expected_revision:j.policy.revision,policy:A(j.policy)}),l(j)),j&&j.conflict&&se("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC","error",4e3)}catch{se("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function l(A){A&&A.policy&&typeof A.policy=="object"&&n.set(A.policy)}function d(A){let E=n.get();if(!E)return;let j=ga(A,E)!=="shown";a(pe=>bu(A,pe,j))}function p(){let A=i.trim();A.length!==0&&(i="",a(E=>E.hidden_prefixes.includes(A)?{hidden_prefixes:E.hidden_prefixes}:{hidden_prefixes:[...E.hidden_prefixes,A]}),C())}function f(A){a(E=>({hidden_prefixes:E.hidden_prefixes.filter(j=>j!==A)}))}function h(A){let E=n.get();if(!E)return;let j=E.chips[A]===!1;a(()=>({chips:{[A]:j}}))}function S(A){let E=s();return c`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">라벨 표시</h3>
        <p class="display-settings__hint">
          라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을
          누르면 그 라벨만 예외로 다시 표시됩니다.
        </p>
        ${E.length===0?c`<div class="display-settings__empty">라벨 없음</div>`:c`<div class="display-settings__pills">
              ${E.map(j=>{let pe=ga(j,A);return c`<button
                  type="button"
                  class=${`display-settings__pill display-settings__pill--${pe}`}
                  data-label=${j}
                  data-state=${pe}
                  @click=${()=>d(j)}
                >
                  ${j}
                </button>`})}
            </div>`}
      </section>
    `}function $(A){return c`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">숨김 prefix</h3>
        <div class="display-settings__prefixes">
          ${A.hidden_prefixes.map(E=>c`<span class="display-settings__prefix">
                ${E}
                <button
                  type="button"
                  class="display-settings__prefix-remove"
                  aria-label=${`${E} \uADDC\uCE59 \uC81C\uAC70`}
                  @click=${()=>f(E)}
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
            @input=${E=>{i=String(E.target.value||"")}}
          />
          <button type="button" @click=${p}>추가</button>
        </div>
      </section>
    `}function y(A){return c`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">카드 표시 요소</h3>
        <div class="display-settings__toggles">
          ${hu.map(([E,j])=>c`<label class="display-settings__toggle">
                <input
                  type="checkbox"
                  data-chip=${E}
                  .checked=${A.chips[E]!==!1}
                  @change=${()=>h(E)}
                />
                <span>${j}</span>
              </label>`)}
        </div>
      </section>
    `}function C(){let A=n.get();Pe(c`
        <div class="display-settings__container">
          <header class="display-settings__header">
            <div class="display-settings__title">표시 설정</div>
            <button
              type="button"
              class="display-settings__close"
              aria-label="닫기"
              @click=${L}
            >
              ×
            </button>
          </header>
          <div class="display-settings__body">
            ${A?c`${S(A)} ${$(A)}
                ${y(A)}`:c`<div class="display-settings__empty">
                  표시 정책을 불러오는 중…
                </div>`}
          </div>
        </div>
      `,o)}let V=!1,Z=()=>{V=!1};o.addEventListener("close",Z),o.addEventListener("cancel",Z);let ne=null;n.subscribe&&(ne=n.subscribe(()=>{V&&C()}));function q(){V||(i="",V=!0,C(),typeof o.showModal=="function"?o.showModal():o.setAttribute("open",""))}function L(){V&&(V=!1,typeof o.close=="function"?o.close():o.removeAttribute("open"))}return{open:q,close:L,destroy(){V=!1,o.removeEventListener("close",Z),o.removeEventListener("cancel",Z),ne&&(ne(),ne=null),o.remove()}}}function ba(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let n=t.querySelector("#fatal-error-title"),r=t.querySelector("#fatal-error-message"),s=t.querySelector("#fatal-error-detail"),o=t.querySelector("#fatal-error-reload"),i=t.querySelector("#fatal-error-close"),a=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},l=(d,p,f="")=>{n&&(n.textContent=d||"Unexpected Error"),r&&(r.textContent=p||"An unrecoverable error occurred.");let h=typeof f=="string"?f.trim():"";if(s&&(h.length>0?(s.textContent=h,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),i&&i.addEventListener("click",()=>a()),t.addEventListener("cancel",d=>{d.preventDefault(),a()}),{open:l,close:a,getElement(){return t}}}function va(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";if(e<6e4)return`${Math.round(e/1e3)}\uCD08`;let t=e/6e4;return`${Number.isInteger(t)?t:Math.round(t*10)/10}\uBD84`}function ya(e){return Array.isArray(e)?e.filter(t=>typeof t=="string").join(" "):""}var vu={deployed:{modifier:"ok",label:"\uC131\uACF5"},launched:{modifier:"launched",label:"\uBC1C\uC0AC\uB428 \xB7 \uACB0\uACFC \uBBF8\uAD00\uCE21"},failed:{modifier:"fail",label:"\uC2E4\uD328"}},wa=160;function yu(e){return e.length>wa?`${e.slice(0,wa)}\u2026`:e}function Br(e,t){let{queueStore:n,presetStore:r,transport:s,getWorkspacePath:o}=t,i=document.createElement("dialog");i.id="worker-exec-defaults-dialog",i.className="exec-defaults",i.setAttribute("role","dialog"),i.setAttribute("aria-modal","true"),e.appendChild(i);let a=null,l=!1;function d(){return n&&n.get()||{revision:0,exec_defaults:{}}}function p(){let w=d();return typeof w.revision=="number"?w.revision:0}function f(){let w=r?r.get():null;return!w||typeof w.revision!="number"?null:{revision:w.revision,presets:Array.isArray(w.presets)?w.presets:[]}}function h(w){r&&w&&typeof w.revision=="number"&&Array.isArray(w.presets)&&r.set({revision:w.revision,presets:w.presets})}function S(w){w&&w.queue&&n&&n.set(w.queue)}function $(){return d().runner_catalog??null}let y=null;function C(){if(y!==null)return y;let w=d().default_exec_preset_id;return typeof w=="string"&&w.length>0?w:null}async function V(w){if(!s)return;let W=f();if(!W)return;y=w||"";let H=L(w);if(re(),!H.viable){se(H.missing?"\uC120\uD0DD\uD55C \uD504\uB9AC\uC14B\uC744 \uCC3E\uC744 \uC218 \uC5C6\uC5B4 \uC800\uC7A5\uD558\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.":"\uBE44\uD638\uD658 \uD504\uB9AC\uC14B\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4 \uAE30\uBCF8\uAC12\uC73C\uB85C \uC800\uC7A5\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.","error",4e3);return}try{let J=await s("worker-queue-set-default-exec-preset",{preset_id:w||null,expected_queue_revision:p(),expected_preset_revision:W.revision});if(S(J),J&&J.presets&&r&&r.set(J.presets),J&&J.conflict){se("\uAE30\uBCF8 \uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uC120\uD0DD\uC744 \uAC80\uD1A0\uD55C \uB4A4 \uB2E4\uC2DC \uC800\uC7A5\uD558\uC138\uC694.","error",4e3);return}if(J&&J.applied){y=null,re();return}se("\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4 \uAE30\uBCF8 \uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328","error",4e3)}catch{se("\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4 \uAE30\uBCF8 \uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function Z(w){a={id:w.id,name:w.name,settings:{...w.settings||{}}},E(),l=!1,re()}function ne(){a={id:null,name:"",settings:{}},l=!1,re()}function q(w){let W=w&&w.settings&&typeof w.settings=="object"?w.settings:{},H=J=>typeof W[J]=="string"?W[J]:J==="impl_runtime"&&typeof W.impl_model=="string"&&Kt($(),W.impl_model)||"";return In({selectedOf:H,effectiveOf:H,runner_catalog:$()}).some(J=>J.groups.some(de=>de.options.some(Te=>Te.value===J.selected&&Te.label.endsWith("(\uBE44\uD638\uD658)"))))}function L(w){if(!w)return{viable:!0,missing:!1,incompatible:!1,preset:null};let H=f()?.presets.find(de=>de.id===w);if(!H||H.migration_pending===!0)return{viable:!1,missing:!0,incompatible:!1,preset:null};let J=H.compatible===!1||q(H);return{viable:!J,missing:!1,incompatible:J,preset:H}}function A(){let w=a?.settings.orchestration_model;return typeof w!="string"?null:Kt($(),w)}function E(){if(!a)return;let w=qr({impl_runtime:a.settings.impl_runtime||"",impl_model:a.settings.impl_model||"",impl_effort:a.settings.impl_effort||""},$(),A());for(let W of["impl_runtime","impl_model","impl_effort"])w[W]?a.settings[W]=w[W]:delete a.settings[W]}function j(w){let W=w&&w.settings&&typeof w.settings=="object"?w.settings:{},H=Rn.filter(de=>typeof W[de]=="string").length,J=Rn.filter(de=>typeof W[de]=="string").map(de=>`${Ps[de]?.title||de}: ${W[de]}`);return{count:`${H}/11 \uC9C0\uC815`,choices:J.length>0?J.join(" \xB7 "):"\uBAA8\uB4E0 \uD56D\uBAA9 \uAE30\uBCF8\uAC12"}}async function pe(w){if(!s||!window.confirm(`\u201C${w.name}\u201D \uD504\uB9AC\uC14B\uC744 \uC0AD\uC81C\uD560\uAE4C\uC694? \uC774\uBBF8 \uC801\uC6A9\uB41C \uC774\uC288\uB294 \uBCC0\uACBD\uB418\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.`))return;let W=f();if(W)try{let H=await s("exec-preset-delete",{expected_revision:W.revision,id:w.id});h(H),H&&H.conflict&&se("\uD504\uB9AC\uC14B\uC774 \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uB2E4\uC2DC \uD655\uC778\uD558\uC138\uC694.","error",4e3)}catch{se("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328","error",4e3)}}async function xe(w=!1){if(!s||!a)return;let W=f();if(!W)return;let H=w||a.id===null,J={expected_revision:W.revision,...H?{}:{id:a.id},name:a.name,settings:{...a.settings}};try{let de=await s(H?"exec-preset-create":"exec-preset-update",J);if(h(de),de&&de.conflict){l=!0,re();return}if(de&&de.applied){a=null,l=!1,re();return}se("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328","error",4e3)}catch{se("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function me(w){return c`<div class="exec-defaults__row exec-preset-editor__row">
      <span class="exec-defaults__k">${Ns(w.key)}</span>
      <select
        class="exec-defaults__sel"
        data-preset-key=${w.key}
        ?disabled=${w.disabled}
        @change=${W=>{if(!a)return;let H=W.target.value;H?a.settings[w.key]=H:delete a.settings[w.key],(w.key==="impl_runtime"||w.key==="impl_model"||w.key==="impl_effort"||w.key==="orchestration_model")&&E(),l=!1,re()}}
      >
        ${Fr(w.groups,w.selected,Ms[w.key]||"(\uAE30\uBCF8)")}
      </select>
    </div>`}function fe(){if(!a)return"";let w=de=>typeof a?.settings[de]=="string"?a.settings[de]:"",W=In({selectedOf:w,effectiveOf:w,runner_catalog:$(),controller_runtime:A()}),H=f(),J=a.id!==null&&H!==null&&!H.presets.some(de=>de.id===a?.id);return c`<div class="exec-preset-editor" data-preset-editor>
      <label class="exec-preset-editor__name">
        프리셋 이름
        <input
          type="text"
          value=${a.name}
          data-preset-name
          @input=${de=>{a&&(a.name=de.target.value,l=!1)}}
        />
      </label>
      ${l?c`<p class="exec-preset-editor__conflict" data-preset-conflict>
            다른 곳에서 변경됨 — 최신 목록을 확인한 뒤 다시 저장하세요.
          </p>`:""}
      ${J?c`<p class="exec-preset-editor__conflict">
            편집하던 프리셋이 다른 곳에서 삭제됐습니다.
          </p>`:""}
      ${W.map(me)}
      <div class="exec-preset-editor__actions">
        ${J?c`<button
              type="button"
              data-preset-save-as-new
              @click=${()=>{xe(!0)}}
            >
              새 프리셋으로 저장
            </button>`:c`<button
              type="button"
              data-preset-save
              @click=${()=>{xe(!1)}}
            >
              저장
            </button>`}
        <button
          type="button"
          data-preset-cancel
          @click=${()=>{a=null,l=!1,re()}}
        >
          취소
        </button>
      </div>
    </div>`}function Ee(){let w=f(),W=w?w.presets.filter(H=>H?.migration_pending!==!0):[];return c`<section class="exec-presets" data-exec-presets>
      <div class="exec-presets__heading">
        <h3>공용 실행 프리셋</h3>
        <button type="button" data-preset-new @click=${ne}>
          + 새 프리셋
        </button>
      </div>
      <p class="exec-defaults__hint">
        모든 워크스페이스에서 공유하며, 이슈에 적용하면 값이 복사됩니다.
      </p>
      ${w===null?c`<p class="exec-presets__empty">프리셋을 불러오는 중…</p>`:W.length===0?c`<p class="exec-presets__empty">
              아직 공용 프리셋이 없습니다.
            </p>`:W.map(H=>{let J=j(H),de=typeof H.reference_count=="number",Te=de?H.reference_count:null,Ne=Array.isArray(H.reference_summary)?H.reference_summary.map(Ze=>Ze?.display_name||Ze?.workspace_key).filter(Boolean).join(", "):"";return c`<article
                class="exec-preset-card"
                data-preset-id=${H.id}
              >
                <div class="exec-preset-card__main">
                  <strong>${H.name}</strong>
                  <span>${J.count}</span>
                  <span data-preset-references=${H.id}
                    >${de?`\uCC38\uC870 ${Te}\uAC1C`:"\uCC38\uC870 \uD655\uC778 \uBD88\uAC00"}</span
                  >
                  ${q(H)?c`<span data-preset-incompatible>비호환</span>`:""}
                  <small>${J.choices}</small>
                  ${Ne?c`<small data-preset-impact=${H.id}
                        >업데이트 영향: ${Ne}</small
                      >`:""}
                </div>
                <div class="exec-preset-card__actions">
                  <button
                    type="button"
                    data-preset-edit=${H.id}
                    @click=${()=>Z(H)}
                  >
                    편집
                  </button>
                  <button
                    type="button"
                    data-preset-delete=${H.id}
                    ?disabled=${Te===null||Te>0||H.reference_scan_complete===!1}
                    title=${Te===null?"\uCC38\uC870 \uC218\uB97C \uD655\uC778\uD560 \uC218 \uC5C6\uC5B4 \uC0AD\uC81C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":Te>0?"\uCC38\uC870 \uC911\uC778 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC788\uC5B4 \uC0AD\uC81C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":H.reference_scan_complete===!1?"\uCC38\uC870 \uC2A4\uCE94\uC774 \uC644\uB8CC\uB418\uC9C0 \uC54A\uC544 \uC0AD\uC81C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":""}
                    @click=${()=>{pe(H)}}
                  >
                    삭제
                  </button>
                </div>
              </article>`})}
      ${fe()}
    </section>`}function Ue(){let w=f(),W=w?w.presets.filter(Ne=>Ne?.migration_pending!==!0):[],H=C()||"",J=L(H),de=J.preset,Te=de?j(de):null;return c`<section class="exec-defaults__workspace" data-workspace-preset>
      <h3>현재 워크스페이스 기본 프리셋</h3>
      <p class="exec-defaults__hint">
        이 워크스페이스는 프리셋 하나를 참조합니다. 없음은 harness 기본값을
        사용합니다.
      </p>
      <select
        class="exec-defaults__sel"
        data-workspace-preset-select
        aria-label="워크스페이스 기본 프리셋"
        .value=${H}
        ?disabled=${w===null}
        @change=${Ne=>{V(Ne.target.value)}}
      >
        <option value="" ?selected=${H===""}>
          없음 — harness 기본값
        </option>
        ${H&&J.missing?c`<option value=${H} ?selected=${!0}>
              ${H} (선택한 프리셋 없음)
            </option>`:""}
        ${W.map(Ne=>c`<option
              value=${Ne.id}
              ?selected=${Ne.id===H}
              ?disabled=${Ne.compatible===!1}
            >
              ${Ne.name}${Ne.compatible===!1?" (\uBE44\uD638\uD658)":""}
            </option>`)}
      </select>
      ${de?c`<p data-workspace-preset-summary>
            ${Te?.count} · ${Te?.choices}
            ${J.incompatible?" \xB7 \uBE44\uD638\uD658":""}
          </p>`:""}
      ${J.missing?c`<p data-workspace-preset-missing>
            선택한 프리셋을 찾을 수 없습니다. 실행이 차단됩니다.
          </p>`:J.incompatible?c`<p data-workspace-preset-incompatible>
              선택한 프리셋이 비호환입니다. 실행이 차단됩니다.
            </p>`:""}
    </section>`}function Ke(){let w=d().workspace_info;return w&&typeof w=="object"?w:{}}function je(w,W){return c`<span
      class="exec-defaults__vd-badge exec-defaults__vd-badge--${w}"
      >${W}</span
    >`}function $e(w){let W=w?ya(w.cmd):"",H=w?va(w.timeout_ms):"",J=o&&o()||"<workspace \uACBD\uB85C>";return c`<div class="exec-defaults__vd-group" data-vd="verify">
      <div class="exec-defaults__vd-label">머지 전 검증 (verify)</div>
      ${W?c`<div class="exec-defaults__vd-line">
            <span class="exec-defaults__vd-cmd">${W}</span>
            ${je("config","config")}
            ${H?c`<span class="exec-defaults__vd-meta"
                  >timeout ${H}</span
                >`:""}
          </div>`:c`<div class="exec-defaults__vd-line exec-defaults__vd-absent">
            검증 없음 —
            <span class="exec-defaults__vd-cmd"
              >[worker.verify."${J}"]</span
            >
            섹션으로 정의
          </div>`}
    </div>`}function D(w){let W=w?ya(w.cmd):"",H=w?va(w.timeout_ms):"",J=H?`timeout ${H} \xB7 verify \uD1B5\uACFC \uC2DC\uC5D0\uB9CC \uC2E4\uD589`:"verify \uD1B5\uACFC \uC2DC\uC5D0\uB9CC \uC2E4\uD589",de=o&&o()||"<workspace \uACBD\uB85C>";return c`<div class="exec-defaults__vd-group" data-vd="deploy">
      <div class="exec-defaults__vd-label">머지 후 배포 (deploy)</div>
      ${W?c`<div class="exec-defaults__vd-line">
            <span class="exec-defaults__vd-cmd">${W}</span>
            ${je("config","config")}
            ${w.detached===!0?je("detached","detached"):""}
            <span class="exec-defaults__vd-meta">${J}</span>
          </div>`:c`<div class="exec-defaults__vd-line exec-defaults__vd-absent">
            배포 없음 —
            <span class="exec-defaults__vd-cmd"
              >[worker.deploy."${de}"]</span
            >
            섹션으로 정의
          </div>`}
    </div>`}function U(w){if(!w||typeof w!="object")return"";let W=vu[String(w.outcome)];if(!W)return"";let H=w.outcome==="failed"&&w.reason?`${W.label} \xB7 ${w.reason}`:W.label,J=[bt(w.at),typeof w.bead_id=="string"?w.bead_id:"",typeof w.base_sha=="string"?w.base_sha.slice(0,7):""].filter(Ne=>Ne.length>0).join(" \xB7 "),de=typeof w.detail=="string"&&w.detail.length>0?yu(w.detail):"",Te=typeof w.log_path=="string"&&w.log_path.length>0?w.log_path:"";return c`<div class="exec-defaults__vd-group" data-vd="last-deploy">
      <div class="exec-defaults__vd-label">마지막 배포</div>
      <div class="exec-defaults__vd-line">
        ${je(W.modifier,H)}
        ${J?c`<span class="exec-defaults__vd-meta">${J}</span>`:""}
      </div>
      ${de?c`<div class="exec-defaults__vd-line" data-vd-part="detail">
            <code class="exec-defaults__vd-cmd">${de}</code>
          </div>`:""}
      ${Te?c`<div class="exec-defaults__vd-line" data-vd-part="log-path">
            전체 로그:
            <code class="exec-defaults__vd-cmd">${Te}</code>
          </div>`:""}
    </div>`}let _e=!1,oe=!1,ke=!1,ge=null;async function Be(){if(s){oe=!0,ke=!1,re();try{let w=await Promise.resolve(s("get-worker-system-prompt",{}));!w||typeof w!="object"||Array.isArray(w)?ke=!0:ge=w}catch{ke=!0}finally{oe=!1,re()}}}function be(){if(_e=!_e,_e&&!ge){Be();return}re()}function Ce(){return c`<section class="exec-defaults__sp" data-seam="system-prompt">
      <p class="exec-defaults__vd-title">
        워커 시스템 프롬프트
        <span class="exec-defaults__vd-ro">읽기 전용 — 서버가 조립</span>
        <button
          type="button"
          class="exec-defaults__sp-toggle"
          data-seam="system-prompt-toggle"
          aria-expanded=${_e?"true":"false"}
          @click=${be}
        >
          ${_e?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
        </button>
      </p>
      ${_e?F():""}
    </section>`}function F(){let w=Cn({loading:oe,error:ke});if(w)return w;if(!ge)return"";let W=Array.isArray(ge.variants)?ge.variants:[];return c`<div class="exec-defaults__sp-body">
      ${ge.target_base_placeholder?c`<div class="prompt-block__meta">
            \`${ge.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${W.map(H=>c`<div class="exec-defaults__sp-variant" data-variant=${H.key}>
            <div class="exec-defaults__sp-cond">${H.condition}</div>
            ${Vt(H.label,H.system_prompt)}
          </div>`)}
    </div>`}function O(w){return c`<section class="exec-defaults__vd">
      <p class="exec-defaults__vd-title">
        검증·배포 설정
        <span class="exec-defaults__vd-ro"
          >읽기 전용 — config.toml에서 정의</span
        >
      </p>
      ${$e(w.verify_cmd)} ${D(w.deploy_cmd)}
      ${U(w.last_deploy)}
    </section>`}function re(){if(Pe(c`
        <div class="exec-defaults__container">
          <header class="exec-defaults__header">
            <div class="exec-defaults__title">전역 실행 설정</div>
            <button
              type="button"
              class="exec-defaults__close"
              aria-label="닫기"
              @click=${ce}
            >
              ×
            </button>
          </header>
          <div class="exec-defaults__body">
            ${Ee()} ${Ue()}
            ${O(Ke())}
            ${Ce()}
          </div>
        </div>
      `,i),y!==null){let w=i.querySelector("[data-workspace-preset-select]");w&&(w.value=y)}}let Se=!1,Re=()=>{Se=!1},M=w=>{w.target===w.currentTarget&&ce()};i.addEventListener("close",Re),i.addEventListener("cancel",Re),i.addEventListener("click",M);let B=null;n&&n.subscribe&&(B=n.subscribe(()=>{Se&&re()}));let P=null;r&&r.subscribe&&(P=r.subscribe(()=>{Se&&re()}));function ae(){Se||(Se=!0,re(),typeof i.showModal=="function"?i.showModal():i.setAttribute("open",""))}function ce(){Se&&(Se=!1,typeof i.close=="function"?i.close():i.removeAttribute("open"))}return{open:ae,close:ce,destroy(){Se=!1,i.removeEventListener("close",Re),i.removeEventListener("cancel",Re),i.removeEventListener("click",M),B&&(B(),B=null),P&&(P(),P=null),i.remove()}}}function Ln(e){let t=Ct(e.created_at),n=Ct(e.updated_at);return!t&&!n?"":c`<div class="worker-mini__meta">
    ${t?c`<span title=${`\uC0DD\uC131 ${bt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&n?c`<span>·</span>`:""}${n?c`<span title=${`\uC218\uC815 ${bt(e.updated_at)}`}
          >수정 ${n}</span
        >`:""}
  </div>`}function qs(e){let t=e.draggable&&!e.done,n=Array.isArray(e.badges)?e.badges:[],r=ft(e.usage),s=Pt(e.usage),o=e.merge_step||null,i=e.lane==="pr_wait"||!!e.revise_action,a=e.lane==="done"&&!i,l=a?Ct(e.done_at):"",d=t?c`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",p=e.workspace_name?c`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",f=c`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,h=c`<span class="worker-mini__title">${e.title}</span>`,S=e.pr_url&&e.pr_number?c`<a
          class="worker-mini__pr"
          href=${e.pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="PR 열기"
          >#${e.pr_number} ↗</a
        >`:"",$=n.map(E=>E===e.live_badge?c`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${E}</span
        >`:c`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          >${E}</span
        >`),y=e.reason?c`<span class="worker-mini__reason">${e.reason}</span>`:"",C=r.length>0?r.map(E=>c`<span class="worker-usage" title=${E.tooltip}
              >${E.label}</span
            >`):s?c`<span class="worker-usage" title=${En(e.usage)}
            >${s}</span
          >`:"",V=o?c`<span class="merge-step"
        >${o.label}<span class="merge-step__n"
          >${o.index}/${o.total}</span
        ></span
      >`:"",Z=e.merge_action?c`<button
        type="button"
        class="worker-mini__merge"
        data-bead-id=${e.id}
        ?disabled=${e.merge_enabled===!1}
        title=${e.merge_title||""}
      >
        ${e.merge_label||"\uBA38\uC9C0"}
      </button>`:"",ne=e.cancel_action?c`<button
        type="button"
        class="worker-mini__merge-cancel"
        data-bead-id=${e.id}
        ?disabled=${e.cancel_enabled===!1}
        title=${e.cancel_title||""}
      >
        취소
      </button>`:"",q=e.discard_action?c`<button
        type="button"
        class="worker-mini__discard"
        data-bead-id=${e.id}
        ?disabled=${e.discard_enabled===!1}
        title=${e.discard_enabled===!1?e.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
      >
        폐기
      </button>`:"",L=e.revise_action?c`<button
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
        </button>`:"",A=!!(s||o||e.merge_action||e.cancel_action||e.discard_action||e.revise_action);return c`<div
    class="worker-mini${i?" worker-mini--card":""}${t?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${o?" worker-mini--merging":""}${e.external?" worker-mini--external":""}"
    style=${o?`--progress: ${o.percent}%`:""}
    draggable=${t?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${a?c`<div class="worker-mini__row1">${p}${f}${h}</div>
          <div class="worker-mini__row2">
            ${C}${l?c`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${bt(e.done_at)}`}
                  >완료 ${l}</span
                >`:""}${$}${V}
            <span class="worker-mini__actions"
              >${Z}${ne}${q}</span
            >
            ${Ln(e)}
          </div>`:i?c`<div class="worker-mini__head">
              ${d}${p}${f}${S}${$}${y}
            </div>
            <div class="worker-mini__body">${h}</div>
            ${A?c`<div class="worker-mini__foot">
                  ${C}${V}
                  <span class="worker-mini__actions"
                    >${Z}${ne}${q}${L}</span
                  >
                </div>`:""}
            ${Ln(e)}`:c`<div class="worker-mini__line">
              ${d}${p}${f}${h}${S}${$}${y}${C}${V}${Z}${ne}${q}
            </div>
            ${Ln(e)}`}
  </div>`}function wu(e){let t=e.draggable&&!e.done,n=e.workflow,r=n&&n.chips||{},s=r.route||n&&n.route,o=r.route_source==="derived"||!!(n&&n.route_source==="derived"),i=e.is_quick_fix===!0||!!n&&n.route==="quick_fix",a=typeof e.reason=="string"&&e.reason.startsWith("\u26D4");return c`<div
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
      ${n&&s?c`<span
            class="ctl-chip ctl-chip--route${o?" is-derived":""}"
            title=${o?"route \uBBF8\uD540 (metadata unset)":"route"}
            >${o?"unset":s}</span
          >`:""}
    </div>
    <div class="worker-card__title">${e.title}</div>
    ${n?vr(n,e.status):""}
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
        title=${t?"\uB300\uAE30 \uD050 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00":i?"quick_fix route\uB294 \uC6CC\uCEE4 \uC2E4\uD589 \uB300\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4":"spec\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}
      >
        대기로 ↴
      </button>
    </div>
    ${Ln(e)}
  </div>`}function zt(e){let t=!!e.collapsible&&!!e.collapsed,n=c`<span
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
          ${n}
          <span class="worker-pane__caret" aria-hidden="true"
            >${t?"\u25B8":"\u25BE"}</span
          >
        </button>`:c`<header class="worker-pane__hd">
          ${n}${e.header_control?e.header_control:""}
        </header>`}
    ${t?"":c`${e.controls?e.controls:""}
          <div class="worker-pane__body">
            ${e.body?e.body:e.items.length===0?c`<div class="worker-pane__empty">
                    ${e.empty||""}
                  </div>`:e.items.map(r=>e.lane==="candidate"?wu(r):qs(r))}
          </div>`}
  </section>`}var ka=160;function Ur(e){return e.length>ka?`${e.slice(0,ka)}\u2026`:e}function ku(e){return!e||!e.reason?"":c`<div class="worker-banner__detail">
    가드:
    ${e.reason}${e.command?c` · <code>${Ur(e.command)}</code>`:""}
  </div>`}function $u(e){return e?c`<details class="worker-banner__tail">
    <summary>출력 tail</summary>
    <pre>${e}</pre>
  </details>`:""}function xu(e){return e?c`<div class="worker-banner__log-path">
    전체 로그: <code>${e}</code>
  </div>`:""}function Su(e){return!e||typeof e.verdict!="string"||typeof e.evidence!="string"?"":e.malformed===!0||e.verdict==="malformed"?c`<div class="worker-banner__detail">
      <b>진단 결과 형식 오류</b> · ${Ur(e.evidence)}
    </div>`:c`<div class="worker-banner__detail">
    진단: <b>${e.verdict}</b> · 근거:
    ${Ur(e.evidence)}
    ${e.verdict==="regression"&&e.fix_bead_id?c` · 수정 bead: ${e.fix_bead_id}`:""}
  </div>`}function Bs(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),n=Math.floor(t/60),r=t%60;return n>0?`${n}m ${String(r).padStart(2,"0")}s`:`${r}s`}function $a(e){let t=Array.isArray(e.cleanupFailures)?e.cleanupFailures:[];return c`<div class="worker-banners">
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
          ${ku(e.failure.cause_detail)}
        </div>`:""}
    ${t.map(n=>c`<div
          class="worker-banner worker-banner--cleanup"
          role="alert"
          data-bead-id=${n.bead_id}
        >
          ⚠ ${n.bead_id} 머지 완료 — 머지 후 정리가 <b>${n.step}</b> 단계에서
          멈췄습니다 (${n.reason}). 1회 자동 재시도 후에도 실패했습니다 — [AI
          정리]로 진단하거나 정리를 사람이 마무리하세요.
          <button
            type="button"
            class="worker-banner__cleanup-diagnose"
            data-bead-id=${n.bead_id}
            ?disabled=${n.diagnosis_pending===!0}
            title="정리 실패 원인을 AI 세션으로 분류합니다"
          >
            AI 정리
          </button>
          ${Su(n.diagnosis)}
          ${n.detail?c`<div class="worker-banner__detail">
                <code>${Ur(n.detail)}</code>
              </div>`:""}
          ${xu(n.log_path)} ${$u(n.output_tail)}
        </div>`)}
  </div>`}function Au(e,t,n=null){let r=!!e.paused,s=r?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?Bs(t-e.started_at):"\u2014",o=[e.runner,e.model].filter(Boolean).join(" \xB7 "),i=ft(e.usage),a=Pt(e.usage),l=e.conflict_resolution?r?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,d=e.base_exception||null,p=e.attempt_id&&e.attempt_id===n;return c`<div
    class="rtile${p?" rtile--sel":""}${r?" rtile--paused":""}"
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
      ${r?c`<button
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
    ${o||i.length>0||a||l||d?c`<div class="rtile__meta">
          ${l?c`<span class="worker-mini__badge">${l}</span>`:""}
          ${d?c`<span
                class="worker-mini__badge"
                title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
                >${d}</span
              >`:""}
          ${o?c`<span class="rtile__runner">${o}</span>`:""}
          ${i.length>0?i.map(f=>c`<span class="worker-usage" title=${f.tooltip}
                    >${f.label}</span
                  >`):a?c`<span
                  class="worker-usage"
                  title=${En(e.usage)}
                  >${a}</span
                >`:""}
        </div>`:""}
    ${Ln(e)}
    <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일): 큐
         스냅샷에는 페이즈명도 진행률도 없으므로 진행 바는 만들지 않는다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
    ${r?"":c`<div class="rtile__accent" aria-hidden="true"></div>`}
  </div>`}function Us(e,t=Date.now(),n=null){let r=Array.isArray(e)?e:[];return c`<div class="worker-rungrid" id="worker-rungrid">
    ${r.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:r.map(s=>Au(s,t,n))}
  </div>`}function sn(e){return c`<svg
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
  </svg>`}function zs(){return sn(jt`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function js(){return sn(jt`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function Hs(){return sn(jt`<rect x="4.3" y="4.3" width="7.4" height="7.4" rx="1.2" />`)}function xa(){return sn(jt`<path d="M4.4 4.4 11.6 11.6M11.6 4.4 4.4 11.6" />`)}function Sa(){return sn(jt`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function Aa(){return sn(jt`<rect x="2.6" y="2.6" width="7.4" height="7.4" rx="1.2" />
    <path d="M6 13.4h6a1.4 1.4 0 0 0 1.4-1.4V6" />`)}function Ta(){return sn(jt`<circle cx="8" cy="8" r="2.1" />
    <path
      d="M8 1.9v1.8M8 12.3v1.8M1.9 8h1.8M12.3 8h1.8M3.7 3.7l1.3 1.3M11 11l1.3 1.3M12.3 3.7 11 5M5 11l-1.3 1.3"
    />`)}function Ea(){return sn(jt`<path d="M3 3.6 8.2 8 3 12.4z" />
    <path d="M8.8 3.6 14 8l-5.2 4.4z" />`)}var nr=1,Tu=6e4,Eu={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328"},Cu=new Set(["auto_merge","merged","merge","done"]),Ca={running:3,paused:2,failed:1};function Ru(e,t){let n=null,r=-1/0;for(let s of Object.values(e)){if(!s||s.bead_id!==t||s.status==="running")continue;let o=typeof s.finished_at=="number"?s.finished_at:typeof s.started_at=="number"?s.started_at:0;o>=r&&(r=o,n=s)}return n}function Iu(e,t){let n=Object.values(e||{}),r=new Set,s=new Map;for(let i of n)!i||typeof i.bead_id!="string"||(typeof i.resumed_from=="string"&&i.resumed_from.length>0&&r.add(i.resumed_from),s.set(i.bead_id,i.attempt_id));let o=new Map;for(let i of n){if(!i||typeof i.bead_id!="string"||i.bead_id.length===0)continue;let a=null;if(i.status==="running")a="running";else if(i.status==="paused"&&!r.has(i.attempt_id))a="paused";else if(i.status==="failed"||i.status==="orphaned"){let f=t.get(i.bead_id),h=typeof f=="number"&&f>0&&typeof i.finished_at=="number"&&f>=i.finished_at;s.get(i.bead_id)===i.attempt_id&&!h&&typeof i.dismissed_at!="number"&&(a="failed")}if(!a)continue;let l=typeof i.started_at=="number"?i.started_at:null,d=o.get(i.bead_id);if(d){let f=Ca[d.run_state],h=Ca[a];if(f>h||f===h&&(d.started_at??0)>(l??0))continue}let p=typeof i.session_id=="string"&&i.session_id.length>0;o.set(i.bead_id,{attempt_id:typeof i.attempt_id=="string"?i.attempt_id:"",run_state:a,started_at:l,last_event_at:typeof i.last_event_at=="number"?i.last_event_at:null,model:typeof i.model=="string"?i.model:null,usage:Mt(e,i.bead_id),can_pause:a==="running"&&p,can_resume:a!=="running"&&p&&!r.has(i.attempt_id)})}return o}function Ra(e,t){let n=e[t];if(!n)return"";if(n.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let r=typeof n.reason=="string"?n.reason:"",s=r.indexOf(":");return s>0&&s<r.length-1?`\u26D4 ${r.slice(0,s)} (${r.slice(s+1)})`:`\u26D4 ${r}`}function Lt(e){return e&&typeof e=="object"?e:{}}function Ws(e,t,n){let r=Array.isArray(e)?e:[],s=Array.isArray(t)?t:[],o=n&&typeof n.done_since=="number"?n.done_since:void 0,i=new Map;for(let y of s)y&&typeof y.root_dir=="string"&&i.set(y.root_dir,y);let a=[],l=[],d=[],p=[],f=[],h=new Map;for(let y of r){if(!y||typeof y.root_dir!="string")continue;let C=y.root_dir,V=y.name||C,Z=i.get(C),ne=Z&&typeof Z.revision=="number"?Z.revision:typeof y.revision=="number"?y.revision:0,q=Lt(y.attempts),L=Lt(y.bead_titles),A=Lt(y.pr_observations),E=Lt(y.admission),j=Lt(y.revise_parked),pe=Lt(y.merge_queue_state),xe=Lt(y.cleanup_failed),me=Array.isArray(y.merge_queue)?y.merge_queue:[],fe=new Set(me.filter(D=>D&&typeof D.bead_id=="string").map(D=>D.bead_id)),Ee=Array.isArray(y.queue)?y.queue:[],Ue=Array.isArray(y.done)?y.done:[],Ke=new Map;for(let D of Ue)D&&typeof D.bead_id=="string"&&typeof D.added_at=="number"&&Ke.set(D.bead_id,D.added_at);let je=D=>({id:D,title:L[D]||D,root_dir:C,workspace_name:V,expected_revision:ne,draggable:!1}),$e=new Set;for(let[D,U]of Iu(q,Ke))$e.add(D),l.push({...je(D),lane:"running",attempt_id:U.attempt_id,run_state:U.run_state,can_pause:U.can_pause,can_resume:U.can_resume,started_at:U.started_at,last_event_at:U.last_event_at,model:U.model,usage:U.usage,badges:U.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:U.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:[],alert:U.run_state==="failed"});for(let D of Array.isArray(y.pr_wait)?y.pr_wait:[]){let U=D&&D.bead_id;if(typeof U!="string"||$e.has(U))continue;$e.add(U);let _e=Lt(A[U]),oe=Lt(_e.pr),ke=_e.gate?Lt(_e.gate):null,ge=fe.has(U),Be=pe.active===U,be=D.external===!0,Ce=xe[U]||null,F=!!ke&&ke.base_badge==="\uCDA9\uB3CC",O=!!Ce&&!!ke&&ke.tier==="merged",re=be&&!!ke&&ke.tier==="merged";d.push({...je(U),lane:"pr_wait",pr_number:typeof oe.number=="number"?oe.number:null,pr_url:typeof oe.url=="string"?oe.url:void 0,external:be,usage:Mt(q,U),badges:Ce?["\uC815\uB9AC \uC2E4\uD328"]:[],alert:!!Ce,reason:Ce?"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644":"PR \uB300\uAE30",merge_action:!ge,merge_enabled:ke?.enabled===!0||F||O||re,merge_label:re?"\uC815\uB9AC":F&&!O?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:re?"\uBA38\uC9C0\uB428 \u2014 \uD074\uB9AD\uD558\uBA74 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC\uB97C \uC218\uD589\uD569\uB2C8\uB2E4":O?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uCC98\uC74C\uBD80\uD130 \uB2E4\uC2DC \uC218\uD589\uD569\uB2C8\uB2E4":F?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":ke?.enabled===!0?`\uBA38\uC9C0 (${ke.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${ke?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:ge,cancel_enabled:!Be,discard_action:!be&&!Ce&&!(ke&&ke.tier==="merged"),discard_enabled:!Be&&!ge,discard_title:ge?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":void 0})}for(let D=0;D<Ee.length;D++){let U=Ee[D],_e=U&&U.bead_id;if(typeof _e!="string"||$e.has(_e))continue;$e.add(_e);let oe=j[_e],ke={...je(_e),lane:"queue",reason:Ra(E,_e),queue_position:D+1,queue_index:D,queue_length:Ee.length,badges:oe?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!oe,revise_action:!!oe,revise_enabled:!!oe,revise_title:oe?oe.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${oe.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""};p.push(ke);let ge=h.get(C);ge?ge.push(ke):h.set(C,[ke])}for(let D of Array.isArray(y.runnable)?y.runnable:[]){let U=D&&D.bead_id;typeof U!="string"||$e.has(U)||($e.add(U),a.push({...je(U),title:D.title||L[U]||U,lane:"runnable",draggable:!0,reason:Ra(E,U),created_at:D.created_at??void 0,updated_at:D.updated_at??void 0,labels:Array.isArray(D.labels)?D.labels:[],workflow:D.route?{route:D.route,chips:{route:D.route}}:null,place_index:Ee.length}))}for(let D of Ue){let U=D&&D.bead_id;if(typeof U!="string"||$e.has(U)||($e.add(U),o!==void 0&&typeof D.added_at=="number"&&D.added_at<o))continue;let _e=Ru(q,U);f.push({...je(U),lane:"done",done:!0,usage:Mt(q,U),done_at:typeof D.added_at=="number"?D.added_at:void 0,done_kind:_e&&typeof _e.done_kind=="string"?_e.done_kind:null})}}l.sort((y,C)=>(C.last_event_at??0)-(y.last_event_at??0)),f.sort((y,C)=>(C.done_at??0)-(y.done_at??0));let S=s.length>0?s:r.map(y=>({root_dir:y&&y.root_dir,name:y&&y.name,auto_advance:y&&y.auto_advance,auto_merge:y&&y.auto_merge,slots:y&&y.slots,revision:y&&y.revision,exec_defaults:y&&y.exec_defaults,default_exec_preset_id:y&&y.default_exec_preset_id,runner_catalog:y&&y.runner_catalog})),$=[];for(let y of S)!y||typeof y.root_dir!="string"||$.push({root_dir:y.root_dir,name:y.name||y.root_dir,auto_advance:y.auto_advance===!0,auto_merge:y.auto_merge===!0,slots:typeof y.slots=="number"&&y.slots>=nr?y.slots:nr,revision:typeof y.revision=="number"?y.revision:0,exec_defaults:Lt(y.exec_defaults),default_exec_preset_id:typeof y.default_exec_preset_id=="string"?y.default_exec_preset_id:null,runner_catalog:Lt(y.runner_catalog),items:h.get(y.root_dir)||[]});return{runnable:a,queue:p,queue_groups:$,running:l,pr_wait:d,done:f,automation:{total:$.length,both_on:$.filter(y=>y.auto_advance&&y.auto_merge).length}}}function Lu(e,t){if(typeof e!="number"||!Number.isFinite(e))return"";let r=t-e<Tu;return c`<span
    class="mon-beat${r?" mon-beat--live":""}"
    title=${`\uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${bt(e)}`}
    ><span class="mon-beat__dot" aria-hidden="true"></span>${r?"":c`<span class="mon-beat__age"
          >${Ct(e,t)}</span
        >`}</span
  >`}function rr(e){return c`<div class="mon-c__title">${e.title}</div>`}function sr(e){return c`<span class="mon-c__id" title="클릭하면 상세로 이동"
    >${e.id}</span
  >`}function zr(e){return e.workspace_name?c`<span class="mon-c__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:""}function Gs(e){let t=ft(e.usage),n=Pt(e.usage);return t.length>0?t.map(r=>c`<span class="mon-c__usage" title=${r.tooltip}
          >${r.label}</span
        >`):n?c`<span class="mon-c__usage" title=${En(e.usage)}
        >${n}</span
      >`:""}function Ys(e){return(Array.isArray(e.badges)?e.badges:[]).map(n=>c`<span class="mon-c__badge${e.alert?" mon-c__badge--alert":""}"
        >${n}</span
      >`)}function Du(e){return c`<span class="mon-c__ops">
    ${e.run_state==="running"?c`<button
          type="button"
          class="mon-op mon-op--pause"
          ?disabled=${e.can_pause===!1}
          aria-label="일시정지"
          title="일시정지 — 세션을 끊고 이어하기 가능 상태로 둡니다"
        >
          ${js()}
        </button>`:c`<button
          type="button"
          class="mon-op mon-op--resume"
          ?disabled=${e.can_resume===!1}
          aria-label="이어하기"
          title="이어하기"
        >
          ${zs()}
        </button>`}
    <button
      type="button"
      class="mon-op mon-op--stop"
      aria-label="중단"
      title="중단 — 세션을 죽이고 대기 큐에서 뺍니다"
    >
      ${Hs()}
    </button>
    ${e.run_state==="failed"?c`<button
          type="button"
          class="mon-op mon-op--dismiss"
          aria-label="실패 기록 닫기"
          title="실패 기록 닫기"
        >
          ${xa()}
        </button>`:""}
  </span>`}function Ou(e,t){let n=typeof e.started_at=="number"?Bs(t-e.started_at):"";return c`${rr(e)}
    <div class="mon-c__meta">
      ${Ys(e)}${Lu(e.last_event_at,t)}${sr(e)}${zr(e)}
      ${e.model?c`<span class="mon-c__model">${e.model}</span>`:""}
      ${n?c`<span class="mon-live__elapsed">${n}</span>`:""}
      ${Gs(e)}${Du(e)}
    </div>`}function Pu(e){let t=e.workflow,r=(t&&t.chips||{}).route||t&&t.route,s=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),o=Ct(e.updated_at);return c`${rr(e)}
    <div class="mon-c__meta">
      <span class="mon-c__grip" aria-hidden="true">⠿</span>${sr(e)}
      ${r?c`<span class="ctl-chip ctl-chip--route">${r}</span>`:""}
      ${br(e.labels,null).map(i=>c`<span class="ctl-chip ctl-chip--label">${i}</span>`)}
      ${zr(e)}
      ${o?c`<span title=${`\uC218\uC815 ${bt(e.updated_at)}`}
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
    </div>`}function Mu(e){return c`${rr(e)}
    <div class="mon-c__meta">
      <span class="mon-c__grip" aria-hidden="true">⠿</span>
      <span class="mon-live__pos">#${e.queue_position}</span>${sr(e)}
      ${Ys(e)}
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
        </div>`:""}`}function Nu(e){let t=!!(Pt(e.usage)||e.merge_action||e.cancel_action||e.discard_action);return c`${rr(e)}
    <div class="mon-c__meta">
      ${sr(e)}${zr(e)}
      ${e.pr_url&&e.pr_number?c`<a
            class="mon-c__pr"
            href=${e.pr_url}
            target="_blank"
            rel="noreferrer noopener"
            title="PR 열기"
            >#${e.pr_number} ↗</a
          >`:""}
      ${Ys(e)}
      ${e.reason?c`<span class="mon-c__reason">${e.reason}</span>`:""}
    </div>
    ${t?c`<div class="mon-c__tail">
          ${Gs(e)}
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
        </div>`:""}`}function Fu(e,t){let n=e.done_kind||"",r=n?Eu[n]||n:"",s=Ct(e.done_at,t);return c`${rr(e)}
    <div class="mon-c__meta">
      ${sr(e)}${zr(e)}
      ${r?c`<span
            class="mon-live__kind${Cu.has(n)?" mon-live__kind--ok":" mon-live__kind--warn"}"
            >${r}</span
          >`:""}
      ${Gs(e)}
      ${s?c`<span title=${`\uC644\uB8CC ${bt(e.done_at)}`}
            >완료 ${s}</span
          >`:""}
    </div>`}function Ia(e,t){return e.lane==="running"?Ou(e,t):e.lane==="runnable"?Pu(e):e.lane==="queue"?Mu(e):e.lane==="pr_wait"?Nu(e):Fu(e,t)}function La(e){let t=String(e.revision);return c`<header
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
        ${e.auto_advance?js():zs()}
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
        ${Sa()}
        <span class="mon-ctl__label">머지</span>
      </button>
      <label class="mon-ctl mon-ctl--slots" title="동시에 실행할 세션 수">
        ${Aa()}
        <span class="mon-ctl__label">슬롯</span>
        <input
          type="number"
          class="mon-slots__input"
          min=${nr}
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
        ${Ta()}
        <span class="mon-ctl__label">설정</span>
      </button>
    </span>
  </header>`}function Da(e){let{total:t,both_on:n}=e.automation,r=t>0&&n===t,s=Ut.find(i=>i.value===e.done_range)?.label||"",o=Array.isArray(e.token_total)?e.token_total:e.token_total?[{label:e.token_total,tooltip:e.token_tooltip}]:[];return c`<div class="mon-top">
    <button
      type="button"
      class="mon-auto-all${r?" is-active":""}"
      data-on=${r?"false":"true"}
      aria-pressed=${r?"true":"false"}
      ?disabled=${t===0}
      title=${r?"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uB055\uB2C8\uB2E4 (\uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4)":"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uCF2D\uB2C8\uB2E4"}
    >
      ${r?Hs():Ea()}
      <span class="mon-auto-all__label"
        >${r?"\uC804\uCCB4 \uC790\uB3D9\uD654 \uBA48\uCDA4":`\uC804\uCCB4 \uC790\uB3D9\uD654 ${n}/${t}`}</span
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
        ${Ut.map(i=>c`<option
              value=${i.value}
              ?selected=${e.done_range===i.value}
            >
              ${i.label}
            </option>`)}
      </select>
      ${o.map(i=>c`<span
            class="mon-kpi__chip mon-kpi__chip--tokens"
            title=${i.tooltip}
            >${s} 완료 · 누적 ${i.label}</span
          >`)}
    </div>
  </div>`}function Oa(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function Pa(e){let t=(Array.isArray(e)?e:[]).map(a=>a&&a.usage).filter(a=>a&&typeof a=="object"&&"providers"in a);if(t.length>0)return ft(kr(t));let n={};for(let a of Wt)n[a]=0;let r=!1,s=0,o=0,i=0;for(let a of Array.isArray(e)?e:[]){let l=a&&a.usage;if(l&&typeof l=="object"){let d=!1;for(let p of Wt){let f=l[p];typeof f=="number"&&Number.isFinite(f)&&(n[p]+=f,r=!0,d=!0)}if(d){o+=1;let p=l.total_cost_usd;typeof p=="number"&&Number.isFinite(p)&&(s+=p,i+=1)}}}return o>0&&i===o&&(n.total_cost_usd=s),r?Pt(n):null}var Na="bdui.monitor.done-range";function qu(){try{let e=window.localStorage.getItem(Na);return Ht(e)?e:Rt}catch{return Rt}}function Bu(e){try{window.localStorage.setItem(Na,e)}catch{}}var Fa="tab:monitor:pipeline",Uu=1e3,zu=[{lane:"runnable",pane:"candidate",title:"\uC2E4\uD589\uAC00\uB2A5",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589\uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}];function Ma(e,t){let n=e.lane==="runnable"||e.lane==="queue";return c`<div
    class="mon-card mon-card--${e.lane}${e.alert?" mon-card--alert":""}"
    draggable=${n?"true":"false"}
    data-issue-id=${e.id}
    data-root-dir=${e.root_dir}
    data-revision=${String(e.expected_revision)}
    data-lane=${e.lane}
    data-attempt-id=${e.attempt_id||""}
    data-place-index=${String(e.place_index??"")}
    data-queue-index=${String(e.queue_index??"")}
    data-queue-length=${String(e.queue_length??"")}
  >
    ${Ia(e,t)}
  </div>`}function qa(e,t){let n=Ve("views:monitor"),r=t.gotoIssue,s=t.pipelineStore,o=t.transport,i=t.execPresetStore,a=t.getWorkspacePath,l=t.switchWorkspace,d=t.now||(()=>Date.now()),p=t.confirm||(M=>typeof globalThis.confirm!="function"||globalThis.confirm(M)),f=qu();function h(){let M=Ut.find(B=>B.value===f);return M?M.label:""}let S=document.createElement("div");S.className="mon",e.appendChild(S);let $=Ws(null,null),y=null,C=new Map,V=new Set;function Z(M){return $.queue_groups.find(B=>B.root_dir===M)||null}let q=Br(e,{queueStore:{get(){if(!y)return{revision:0,exec_defaults:{},default_exec_preset_id:null};let M=C.get(y);if(M)return M;let B=Z(y),P=s&&s.get?s.get():null,ae=(Array.isArray(P)?P:[]).find(ce=>ce&&ce.root_dir===y);return{revision:B?B.revision:0,exec_defaults:B?B.exec_defaults:{},default_exec_preset_id:B?B.default_exec_preset_id:null,runner_catalog:B?B.runner_catalog:null,workspace_info:ae?ae.workspace_info:void 0}},set(M){y&&C.set(y,M);for(let B of Array.from(V))B()},subscribe(M){return V.add(M),()=>V.delete(M)}},presetStore:i,transport:o?(M,B)=>o(M,M==="worker-queue-set-default-exec-preset"||M==="get-worker-system-prompt"?{...B||{},root_dir:y}:B):void 0,getWorkspacePath:()=>y||void 0}),L=null,A=null;async function E(M,B,P,ae){if(!o||!P)return null;let ce=await o(M,{...B,root_dir:P,expected_revision:ae});if(ce&&ce.conflict){let w=ce.queue&&typeof ce.queue.revision=="number"?ce.queue.revision:ae;ce=await o(M,{...B,root_dir:P,expected_revision:w})}return ce&&ce.queue&&P&&C.set(P,ce.queue),ce}async function j(M,B,P){return!o||!P?null:await o(M,{...B,root_dir:P})}async function pe(M){if(!o||!M&&!p("\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB055\uB2C8\uB2E4. \uAC01 \uB808\uD3EC\uC758 \uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uD568\uAED8 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?"))return;let B=await o("monitor-auto-toggle",{on:M}),P=B&&Array.isArray(B.failed)?B.failed:[];P.length>0&&se(`\uC790\uB3D9\uD654 ${M?"\uCF1C\uAE30":"\uB044\uAE30"} \uC77C\uBD80 \uC2E4\uD328: ${P.map(ae=>ae.root_dir).join(", ")}`,"error",3200)}async function xe(){let M=new Map;for(let B of $.pr_wait)M.has(B.root_dir)||M.set(B.root_dir,B.expected_revision);for(let[B,P]of M)await E("worker-merge-queue-add-all",{},B,P)}let me=null,fe=!1,Ee=null;function Ue(){Ee!==null&&clearTimeout(Ee),Ee=setTimeout(()=>{Ee=null,fe=!1},0)}function Ke(M){let B=M.target;return typeof B?.closest=="function"?B.closest(".mon-group"):null}function je(M){let B=Ke(M);return!B||!me?null:(B.getAttribute("data-root-dir")||"")===me.root_dir?B:null}function $e(){for(let M of Array.from(S.querySelectorAll(".mon-group--drag-over")))M.classList.remove("mon-group--drag-over")}function D(M){let B=M.target,P=typeof B?.closest=="function"?B.closest('.mon-card[draggable="true"]'):null;if(P){me={bead_id:P.getAttribute("data-issue-id")||"",lane:P.getAttribute("data-lane")||"",root_dir:P.getAttribute("data-root-dir")||"",revision:Number(P.getAttribute("data-revision")||0)||0,queue_index:Number(P.getAttribute("data-queue-index")),queue_length:Number(P.getAttribute("data-queue-length")),place_index:Number(P.getAttribute("data-place-index"))},fe=!0;try{M.dataTransfer?.setData("text/plain",me.bead_id),M.dataTransfer&&(M.dataTransfer.effectAllowed="move")}catch{}}}function U(M){let B=je(M);B&&(M.preventDefault(),M.dataTransfer&&(M.dataTransfer.dropEffect="move"),B.classList.add("mon-group--drag-over"))}function _e(M){Ke(M)?.classList.remove("mon-group--drag-over")}function oe(){me=null,$e(),Ue()}function ke(M){let B=je(M),P=me;if(me=null,$e(),!B||!P||!P.bead_id)return;M.preventDefault();let ae=M.target,ce=typeof ae?.closest=="function"?ae.closest('.mon-card[data-lane="queue"]'):null,w=ce&&B.contains(ce)?Number(ce.getAttribute("data-queue-index")):NaN;if(P.lane==="runnable"){let J=Number.isFinite(w)?w:P.place_index;if(!Number.isFinite(J))return;E("worker-queue-place",{bead_id:P.bead_id,index:J},P.root_dir,P.revision);return}if(P.lane!=="queue"||ce&&ce.getAttribute("data-issue-id")===P.bead_id)return;let W=P.queue_index,H=Number.isFinite(w)?W>w?w:w-1:P.queue_length-1;!Number.isFinite(H)||H<0||H===W||E("worker-queue-reorder",{bead_id:P.bead_id,to_index:H},P.root_dir,P.revision)}function ge(M){let B={runnable:$.runnable,queue:$.queue,running:$.running,pr_wait:$.pr_wait,done:$.done};return c`${Da({automation:$.automation,counts:{running:$.running.length,queue:$.queue.length,pr_wait:$.pr_wait.length},done_range:f,token_total:Pa($.done),token_tooltip:Oa(h())})}
      <div class="worker-lanes mon-lanes">
        ${zu.map(P=>{let ae=B[P.lane],ce=P.lane==="queue"?$.queue_groups.length>0?c`${$.queue_groups.map(w=>c`<div
                        class="mon-group"
                        data-root-dir=${w.root_dir}
                      >
                        ${La(w)}
                        <div class="mon-group__list">
                          ${w.items.map(W=>Ma(W,M))}
                        </div>
                      </div>`)}`:void 0:ae.length>0?c`${ae.map(w=>Ma(w,M))}`:void 0;return zt({id:`monitor-${P.lane}`,lane:P.pane,title:P.lane==="done"?`\uC644\uB8CC\xB7${h()}`:P.title,items:ae,empty:P.empty,body:ce,live:P.lane==="running"&&ae.length>0,header_control:P.lane==="pr_wait"&&ae.length>0?c`<button
                    type="button"
                    class="mon-lane-op mon-merge-all"
                    title="자격이 생기는 PR을 각 레포의 머지 큐에 한 번에 넣습니다"
                  >
                    일괄 머지
                  </button>`:""})})}
      </div>`}function Be(){let M=s&&s.get?s.get():null,B=s&&s.getWorkspacesState?s.getWorkspacesState():[],P=d();$=Ws(M,B,{done_since:wn(f,P)}),Pe(ge(P),S)}function be(M,B){let P=a?a():void 0;if(!B||!P||B===P||!l){r(M);return}l(B).then(()=>{r(M)}).catch(ae=>{n("workspace switch for %s failed: %o",B,ae)})}function Ce(M){return{root_dir:M.getAttribute("data-root-dir")||"",revision:Number(M.getAttribute("data-revision")||0)||0}}function F(M,B){let{root_dir:P,revision:ae}=Ce(M),ce=M.getAttribute("data-issue-id")||"",w=M.getAttribute("data-attempt-id")||"",W=B.classList;if(W.contains("worker-card__place")){E("worker-queue-place",{bead_id:ce,index:Number(M.getAttribute("data-place-index")||0)||0},P,ae);return}if(W.contains("mon-op--up")||W.contains("mon-op--down")){let H=Number(M.getAttribute("data-queue-index")||0)||0,J=W.contains("mon-op--up")?H-1:H+1;if(J<0)return;E("worker-queue-reorder",{bead_id:ce,to_index:J},P,ae);return}if(W.contains("mon-op--remove")){E("worker-queue-remove",{bead_id:ce},P,ae);return}if(W.contains("mon-op--pause")){j("worker-attempt-pause",{attempt_id:w},P);return}if(W.contains("mon-op--stop")){j("worker-attempt-stop",{attempt_id:w},P);return}if(W.contains("mon-op--resume")){E("worker-attempt-resume",{attempt_id:w},P,ae);return}if(W.contains("mon-op--dismiss")){E("worker-attempt-dismiss",{attempt_id:w},P,ae);return}if(W.contains("worker-mini__merge")){E("worker-merge-queue-add",{bead_id:ce},P,ae);return}if(W.contains("worker-mini__merge-cancel")){E("worker-merge-queue-remove",{bead_id:ce},P,ae);return}if(W.contains("worker-mini__discard")){if(!p(`${ce}: PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4. \uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`))return;E("worker-pr-discard",{bead_id:ce},P,ae);return}if(W.contains("worker-mini__revise-fix")){E("worker-revise-fix",{bead_id:ce},P,ae);return}W.contains("worker-mini__revise-approve")&&E("worker-revise-approve",{bead_id:ce},P,ae)}function O(M){let B=fe;fe=!1;let P=M.target;if(!P||typeof P.closest!="function"||P.closest("dialog")||P.closest("a"))return;let ae=P.closest(".mon-auto-all");if(ae){M.preventDefault(),pe(ae.getAttribute("data-on")==="true");return}if(P.closest(".mon-merge-all")){M.preventDefault(),xe();return}let w=P.closest(".mon-ctl--advance");if(w){M.preventDefault();let{root_dir:Ne,revision:Ze}=Ce(w);E("worker-queue-toggle",{on:w.getAttribute("data-on")==="true"},Ne,Ze);return}let W=P.closest(".mon-ctl--merge-auto");if(W){M.preventDefault();let{root_dir:Ne,revision:Ze}=Ce(W);E("worker-merge-auto-toggle",{on:W.getAttribute("data-on")==="true"},Ne,Ze);return}let H=P.closest(".mon-ctl--exec");if(H){M.preventDefault(),y=H.getAttribute("data-root-dir")||null,C.delete(y||""),q.open();return}let J=P.closest(".mon-card");if(!J)return;let de=P.closest("button");if(de){M.preventDefault(),F(J,de);return}let Te=J.getAttribute("data-issue-id");Te&&!B&&(M.preventDefault(),be(Te,J.getAttribute("data-root-dir")||""))}function re(M){let B=M.target;if(!B||typeof B.closest!="function")return;let P=B.closest(".mon-done-range");if(P){f=Ht(P.value)?P.value:Rt,Bu(f),Be();return}let ae=B.closest(".mon-slots__input");if(!ae)return;let{root_dir:ce,revision:w}=Ce(ae),W=Number(ae.value);if(!Number.isFinite(W))return;let H=Math.max(nr,Math.floor(W));E("worker-queue-set-slots",{slots:H},ce,w)}e.addEventListener("click",O),e.addEventListener("change",re),e.addEventListener("dragstart",D),e.addEventListener("dragover",U),e.addEventListener("dragleave",_e),e.addEventListener("drop",ke),e.addEventListener("dragend",oe),s&&typeof s.subscribe=="function"&&(L=s.subscribe(()=>{try{C.clear(),Be();for(let M of Array.from(V))M()}catch{}}));function Se(){A!==null&&(clearInterval(A),A=null)}function Re(){Ee!==null&&(clearTimeout(Ee),Ee=null)}return{load(){n("load"),Be(),A===null&&(A=setInterval(()=>{try{Be()}catch{}},Uu))},pause(){Se()},clear(){Se(),Re(),L&&(L(),L=null),e.removeEventListener("click",O),e.removeEventListener("change",re),e.removeEventListener("dragstart",D),e.removeEventListener("dragover",U),e.removeEventListener("dragleave",_e),e.removeEventListener("drop",ke),e.removeEventListener("dragend",oe),q.destroy(),V.clear(),e.replaceChildren()}}}function Ba(e,t,n){let r=Ve("views:nav"),s=null;function o(l){return d=>{d.preventDefault(),r("click tab %s",l),n.gotoView(l)}}function i(){let l=t.getState(),d=l.view==="worker"||l.view==="monitor"?l.view:"board";return c`
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
    `}function a(){Pe(i(),e)}return a(),s=t.subscribe(()=>a()),{destroy(){s&&(s(),s=null),Pe(c``,e)}}}var Ua=["bug","feature","task","epic","chore"];function za(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var ja=["Critical","High","Medium","Low","Backlog"];function Ha(e,t){let n=document.createElement("dialog");n.id="new-issue-dialog",n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true"),n.innerHTML=`
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
  `,e.appendChild(n);let r=n.querySelector("#new-issue-form"),s=n.querySelector("#new-title"),o=n.querySelector("#new-type"),i=n.querySelector("#new-priority"),a=n.querySelector("#new-labels"),l=n.querySelector("#new-description"),d=n.querySelector("#new-issue-error"),p=n.querySelector("#btn-cancel"),f=n.querySelector("#btn-create"),h=n.querySelector(".new-issue__close");function S(){o.replaceChildren();let L=document.createElement("option");L.value="",L.textContent="\u2014 Select \u2014",o.appendChild(L);for(let A of Ua){let E=document.createElement("option");E.value=A,E.textContent=za(A),o.appendChild(E)}i.replaceChildren();for(let A=0;A<=4;A+=1){let E=document.createElement("option");E.value=String(A);let j=ja[A]||"Medium";E.textContent=`${A} \u2013 ${j}`,i.appendChild(E)}}S();function $(){try{typeof n.close=="function"?n.close():n.removeAttribute("open")}catch{n.removeAttribute("open")}}function y(L){s.disabled=L,o.disabled=L,i.disabled=L,a.disabled=L,l.disabled=L,p.disabled=L,f.disabled=L,f.textContent=L?"Creating\u2026":"Create"}function C(){d.textContent=""}function V(L){d.textContent=L}function Z(){try{let L=window.localStorage.getItem("beads-ui.new.type");L?o.value=L:o.value="";let A=window.localStorage.getItem("beads-ui.new.priority");A&&/^\d$/.test(A)?i.value=A:i.value="2"}catch{o.value="",i.value="2"}}function ne(){let L=o.value||"",A=i.value||"";L.length>0&&window.localStorage.setItem("beads-ui.new.type",L),A.length>0&&window.localStorage.setItem("beads-ui.new.priority",A)}async function q(){C();let L=String(s.value||"").trim();if(L.length===0){V("Title is required"),s.focus();return}let A=Number(i.value||"2");if(!(A>=0&&A<=4)){V("Priority must be 0..4"),i.focus();return}let E=String(o.value||""),j=String(l.value||""),pe={title:L};E.length>0&&(pe.type=E),String(A).length>0&&(pe.priority=A),j.length>0&&(pe.description=j),y(!0);try{await t("create-issue",pe)}catch{y(!1),V("Failed to create issue");return}ne(),y(!1),$()}return n.addEventListener("cancel",L=>{L.preventDefault(),$()}),h.addEventListener("click",()=>$()),p.addEventListener("click",()=>$()),n.addEventListener("keydown",L=>{L.key==="Enter"&&(L.ctrlKey||L.metaKey)&&(L.preventDefault(),q())}),r.addEventListener("submit",L=>{L.preventDefault(),q()}),{open(){r.reset(),C(),Z();try{"showModal"in n&&typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")}catch{n.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){$()}}}var ju=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function Wa(e){return String(e).padStart(2,"0")}function Hu(e,t){let n=Math.max(0,Math.ceil((e-t)/6e4)),r=Math.floor(n/1440),s=Math.floor(n%1440/60),o=n%60;return r>0?`${r}d${s>0?` ${s}h`:""}`:s>0?`${s}h${o>0?` ${o}m`:""}`:`${o}m`}function Wu(e,t=Date.now()){let n=Date.parse(e);if(!Number.isFinite(n))return"";let r=new Date(n),s=new Date(t),o=`${Wa(r.getHours())}:${Wa(r.getMinutes())}`,a=r.getFullYear()===s.getFullYear()&&r.getMonth()===s.getMonth()&&r.getDate()===s.getDate()?o:`${ju[r.getMonth()]} ${r.getDate()} ${o}`;return`${Hu(n,t)} \xB7 ${a}`}function Gu(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}function Ga(e){let t=!1,n=null;function r(){Pe(c``,e),e.hidden=!0}async function s(){try{let o=await fetch("/api/claude-usage");if(!o.ok)throw new Error(`usage request failed: ${o.status}`);let i=await o.json();if(t)return;if(!i||i.available!==!0||!Array.isArray(i.windows)){r();return}let a=typeof i.ageSeconds=="number"&&i.ageSeconds>600,l=a?`${Math.floor(i.ageSeconds/60)}\uBD84 \uC804 \uCE21\uC815`:"",d=Date.now();Pe(c`<div
          class="usage-meter${a?" usage-meter--stale":""}"
          aria-label="Claude Code usage"
        >
          ${i.windows.map(p=>{let f=typeof p.pct=="number"&&Number.isFinite(p.pct)?p.pct:0,h=Math.min(100,Math.max(0,f)),$=`resets ${Wu(p.resetsAt,d)}${a?` \xB7 ${l}`:""}`;return c`<span
              class="usage-meter__window ${Gu(f)}"
              style=${`--progress: ${h}%`}
              title=${$}
            >
              <span class="usage-meter__label">${p.key}</span>
              <span class="usage-meter__track" aria-hidden="true">
                <span class="usage-meter__fill"></span>
              </span>
              <span class="usage-meter__pct">${f}%</span>
            </span>`})}
        </div>`,e),e.hidden=!1}catch{t||r()}}return r(),s(),n=setInterval(()=>{s()},6e4),{destroy(){t=!0,n!==null&&(clearInterval(n),n=null),r()}}}var Yu="worker-ineligible";function Vu(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Ya(e){return Vu(e).includes(Yu)}var Ku="tab:worker:ready",Zu="tab:worker:blocked",Xu="tab:worker:in-progress",or=1;function Va(e){return Jn(e).path.length>0}var Qa="beads-ui.worker.candidate-filter",Vs={show_blocked:!1,spec:"all"};function Qu(e,t){if(!e||typeof e!="object"||Array.isArray(e))return!1;let n=Object.values(e),r=new Set;for(let s of n)s&&typeof s=="object"&&typeof s.resumed_from=="string"&&s.resumed_from.length>0&&r.add(s.resumed_from);return n.some(s=>s&&typeof s=="object"&&s.bead_id===t&&s.cleanup_diagnosis===!0&&(s.status==="running"||s.status==="paused"&&!r.has(s.attempt_id)))}function Ju(){try{let e=window.localStorage.getItem(Qa);if(!e)return{...Vs};let t=JSON.parse(e);if(!t||typeof t!="object")return{...Vs};let n=t.spec;return{show_blocked:t.show_blocked===!0,spec:n==="with"||n==="without"?n:"all"}}catch{return{...Vs}}}function ep(e){try{window.localStorage.setItem(Qa,JSON.stringify(e))}catch{}}function tp(e,t){let n=a=>t.show_blocked||!a.blocked,r=a=>t.spec==="all"||(t.spec==="with"?a.has_spec:!a.has_spec),s=[],o=0,i=0;for(let a of e){let l=n(a),d=r(a);l&&d?s.push(a):!l&&d?o+=1:l&&!d&&(i+=1)}return{visible:s,hidden_blocked:o,hidden_spec:i}}var np=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],Ja="bdui.worker.candidate_sort",rp=[{value:"spec",label:"spec \uC6B0\uC120"},{value:"board",label:"Board \uC21C\uC11C"},{value:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131\uC21C"}],jr="spec";function sp(){try{let e=window.localStorage.getItem(Ja);return e==="board"||e==="created"||e==="spec"?e:jr}catch{return jr}}function op(e){try{window.localStorage.setItem(Ja,e)}catch{}}var el="bdui.worker.done-range";function ip(){try{let e=window.localStorage.getItem(el);return Ht(e)?e:Rt}catch{return Rt}}function ap(e){try{window.localStorage.setItem(el,e)}catch{}}var lp="(max-width: 640px)",tl="beads-ui.worker.lane-collapsed",ir={queue:!0,done:!0};function cp(){try{let e=window.localStorage.getItem(tl);if(!e)return{...ir};let t=JSON.parse(e);return!t||typeof t!="object"?{...ir}:{queue:typeof t.queue=="boolean"?t.queue:ir.queue,done:typeof t.done=="boolean"?t.done:ir.done}}catch{return{...ir}}}function dp(e){try{window.localStorage.setItem(tl,JSON.stringify(e))}catch{}}function Ka(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let n=typeof t.title=="string"?t.title:t.id||"";return n.length>22?`${n.slice(0,22)}\u2026`:n}function up(e,t,n){let r=Array.isArray(e)?e.slice():[];return t==="created"?r.sort(fn):(r.sort(pr(n)),t==="board"?r:[...r.filter(Va),...r.filter(s=>!Va(s))])}function pp(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function fp(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function _p(e){let n=(Array.isArray(e?.dependencies)?e.dependencies:[]).map(r=>typeof r=="string"?r:r&&r.id).filter(Boolean);return n.length>0?`\u{1F512} ${n.join(", ")}`:"\u{1F512} blocked"}var mp=["closed_unmerged","undecidable"],gp=[{from:"\uAD00\uCE21 \uB300\uAE30",activity:"checking",to:"\uD655\uC778\uC911"},{from:"\uB85C\uCEEC\uAC80\uC99D \uB300\uAE30",activity:"verifying",to:"\uB85C\uCEEC\uAC80\uC99D \uC2E4\uD589 \uC911"}];function hp(e,t){for(let n of gp)if(e===n.from&&t===n.activity)return{label:n.to,live:!0};return{label:e,live:!1}}var Ks=[{step:"merging",label:"\uBA38\uC9C0 \uC911"},{step:"base_sync",label:"base \uB3D9\uAE30\uD654"},{step:"post_merge_verify",label:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D"},{step:"deploy",label:"\uBC30\uD3EC"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"}];function bp(e){if(typeof e!="string"||e.length===0)return null;let t=Ks.length,n=Ks.findIndex(r=>r.step===e);return n<0?{label:e,index:0,total:t,percent:0}:{label:Ks[n].label,index:n+1,total:t,percent:Math.round((n+1)/t*100)}}function Za(e){switch(e){case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";default:return e}}function Xa(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}function vp(e,t,n,r,s=null,o=null,i=null,a=!1,l=null,d=!0,p=null,f=null){let h=!!l&&l.position>0,S=!!l&&l.active===!0,$=l&&l.failure||null,y=n[e]||null,C=y&&y.gate?y.gate:null,V=y&&y.pr?y.pr:null,Z=[];a&&Z.push("\uC138\uC158");let ne=i?i==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":null,q=hp(a&&C&&C.tier==="closed_unmerged"?"\uB2EB\uD798":C&&C.gate_badge||"",ne?null:o&&o.activity||null);ne&&Z.push(ne),q.label&&Z.push(q.label),C&&C.base_badge&&C.base_badge!==C.gate_badge&&Z.push(C.base_badge),f&&Z.push(f),r&&Z.push("\uC815\uB9AC \uC2E4\uD328"),h&&!S&&Z.push(`\uBA38\uC9C0 \uB300\uAE30 #${l.position}`),$&&Z.push(`\uC77C\uAD04 \uBA38\uC9C0 \uC2E4\uD328: ${Za($)}`),p&&Z.push(`\uC790\uB3D9 \uC81C\uC678: ${Za(p)}`);let L=!!C&&C.base_badge==="\uCDA9\uB3CC",A=!!C&&C.enabled===!0,E=bp(o&&o.merge_progress?o.merge_progress.step:null),j=!!r&&!!C&&C.tier==="merged",pe=a&&!!C&&C.tier==="merged",xe=a&&L&&d===!1;return{id:e,title:t,reason:r?"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644":"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",external:a,pr_number:V&&typeof V.number=="number"?V.number:null,pr_url:V&&typeof V.url=="string"?V.url:"",badges:Z,live_badge:i==="running"?ne:ne?null:q.live?q.label:null,usage:s,alert:!!C&&mp.includes(C.tier)||!!r||!!$,merge_action:!h,cancel_action:h,cancel_enabled:!S,cancel_title:S?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard_action:!a&&!r&&!(C&&C.tier==="merged"),merge_step:E,discard_enabled:!E&&!i&&!h,discard_title:i?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":h?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":void 0,merge_enabled:!E&&!i&&!xe&&(A||L||j||pe),merge_label:pe?"\uC815\uB9AC":L&&!E&&!j?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:E?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${E.label}`:pe?"\uBA38\uC9C0\uB428 \u2014 \uD074\uB9AD\uD558\uBA74 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC\uB97C \uC218\uD589\uD569\uB2C8\uB2E4":xe?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":i==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":i==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":j?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uCC98\uC74C\uBD80\uD130 \uB2E4\uC2DC \uC218\uD589\uD569\uB2C8\uB2E4":L?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":A?`\uBA38\uC9C0 (${C.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:C&&C.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${C&&C.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function Zs(e,t={}){let{transport:n,issueStores:r,queueStore:s,execPresetStore:o,sessionLogStore:i,uiOrderStore:a,gotoIssue:l,getWorkspacePath:d}=t,p=r?_r(r,a):null,f=gr({transport:n,uiOrderStore:a}),h=null,S=[],$=Ju(),y=sp(),C=ip();function V(){let u=Ut.find(m=>m.value===C);return u?u.label:"\uC624\uB298"}let Z=cp(),ne=!1,q=new Set,L=new Set,A=new Set,E=[],j=document.createElement("div");j.className="worker-console";let pe=document.createElement("div");pe.className="worker-top";let xe=document.createElement("div");xe.className="worker-drawer-overlay",xe.hidden=!0;let me=document.createElement("div");me.className="worker-drawer-overlay__backdrop";let fe=document.createElement("div");fe.className="worker-drawer-host",xe.append(me,fe);let Ee=document.createElement("div");Ee.className="worker-lanes-host",j.append(pe,xe,Ee),e.appendChild(j);let Ue=null,Ke=Mr(fe,{transport:n,sessionLogStore:i,onClose:()=>{Ue=null,xe.hidden=!0,De()}}),je=Br(j,{queueStore:s,presetStore:o,transport:n,getWorkspacePath:d});function $e(){return s&&s.get()||{revision:0,auto_advance:!1,auto_merge:!1,pr_wait_holds_slot:!1,slots:or,queue:[],pr_wait:[],done:[]}}function D(){let u=$e();return typeof u.revision=="number"?u.revision:0}function U(u){u&&u.queue&&s&&s.set(u.queue)}function _e(){let u=$e().queue;return Array.isArray(u)?u.length:0}async function oe(u,m){if(!n)return;let T=await n("worker-queue-place",{bead_id:u,index:m,expected_revision:D()});U(T),T&&T.conflict&&await n("worker-queue-place",{bead_id:u,index:m,expected_revision:D()}).then(U)}async function ke(u,m){if(!n)return;let T=await n("worker-queue-reorder",{bead_id:u,to_index:m,expected_revision:D()});U(T),T&&T.conflict&&await n("worker-queue-reorder",{bead_id:u,to_index:m,expected_revision:D()}).then(U)}async function ge(u){if(!n)return;let m=await n("worker-queue-remove",{bead_id:u,expected_revision:D()});U(m),m&&m.conflict&&await n("worker-queue-remove",{bead_id:u,expected_revision:D()}).then(U)}async function Be(u){!n||!u||await n("worker-attempt-stop",{attempt_id:u})}async function be(u){if(!n||!u)return;let m=await n("worker-attempt-pause",{attempt_id:u});m&&m.paused===!1&&m.reason&&se(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${m.reason}`,"error",2400)}async function Ce(u){if(!n||!u)return;let m=await n("worker-attempt-resume",{attempt_id:u,expected_revision:D()});U(m),m&&m.conflict&&(m=await n("worker-attempt-resume",{attempt_id:u,expected_revision:D()}),U(m)),m&&m.resumed===!1&&!m.conflict&&m.reason&&se(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${m.reason}`,"error",2400)}async function F(u){if(!n||!u)return;let m=await n("worker-attempt-dismiss",{attempt_id:u,expected_revision:D()});U(m),m&&m.conflict&&(m=await n("worker-attempt-dismiss",{attempt_id:u,expected_revision:D()}),U(m)),m&&m.dismissed===!1&&!m.conflict&&m.reason&&se(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${m.reason}`,"error",2400)}async function O(u){if(!n||!u||A.has(u))return;A.add(u),De();let m;try{m=await n("worker-cleanup-diagnose",{bead_id:u,expected_revision:D()}),U(m),m&&m.conflict&&(m=await n("worker-cleanup-diagnose",{bead_id:u,expected_revision:D()}),U(m))}finally{A.delete(u),De()}m&&!m.conflict&&m.ok===!1&&m.reason&&se(`AI \uC815\uB9AC \uAC70\uBD80: ${m.reason}`,"error",2400)}async function re(u,m){if(!n)return null;let T=n,X=await T(u,{...m,expected_revision:D()});return U(X),X&&X.conflict&&(X=await T(u,{...m,expected_revision:D()}),U(X)),X}async function Se(u){if(!n||!u)return;q.add(u),De();let m;try{m=await re("worker-merge-queue-add",{bead_id:u})}finally{q.delete(u),De()}!m||m.conflict||m.applied||se("\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)","error",2400)}async function Re(u){if(!n)return;let m=await re("worker-merge-auto-toggle",{on:u});!m||m.conflict||se(u?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",u?"success":"info",2400)}async function M(u){if(!n||!u)return;let m=await re("worker-merge-queue-remove",{bead_id:u});m&&!m.conflict&&!m.applied&&m.reason==="merge_active"&&se("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function B(){await re("worker-merge-queue-remove",{all:!0})}async function P(u){if(!n||!u||!(typeof globalThis.confirm!="function"||globalThis.confirm(`${u}: PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4. \uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694. \uACC4\uC18D\uD560\uAE4C\uC694?`)))return;let T=await n("worker-pr-discard",{bead_id:u,expected_revision:D()});if(U(T),T&&T.conflict&&(T=await n("worker-pr-discard",{bead_id:u,expected_revision:D()}),U(T)),T&&T.discarded===!0){se("\uD3D0\uAE30 \uC644\uB8CC \u2014 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB2E4\uC2DC \uC2E4\uD589\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4","success",2400);return}T&&T.discarded===!1&&!T.conflict&&se(`\uD3D0\uAE30 \uAC70\uBD80: ${T.reason||""}`,"error",2800)}async function ae(u,m){if(!n||!m||L.has(m))return;L.add(m),De();let T;try{T=await n(u,{bead_id:m,expected_revision:D()}),U(T),T&&T.conflict&&(T=await n(u,{bead_id:m,expected_revision:D()}),U(T))}finally{L.delete(m),De()}if(!(!T||T.conflict)){if(T.ok){se(u==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}se(`\uCC98\uBD84 \uAC70\uBD80: ${T.reason||""}`,"error",3e3)}}async function ce(u){if(!n)return;let m=await n("worker-queue-toggle",{on:u,expected_revision:D()});U(m),m&&m.conflict&&await n("worker-queue-toggle",{on:u,expected_revision:D()}).then(U)}async function w(u){await ce(u),await Re(u)}async function W(u){if(!n||!Number.isFinite(u))return;let m=Math.max(or,Math.floor(u)),T=await n("worker-queue-set-slots",{slots:m,expected_revision:D()});U(T),T&&T.conflict&&await n("worker-queue-set-slots",{slots:m,expected_revision:D()}).then(U)}async function H(u){if(!n)return;let m=await n("worker-queue-set-pr-wait-hold",{on:u,expected_revision:D()});U(m),m&&m.conflict&&await n("worker-queue-set-pr-wait-hold",{on:u,expected_revision:D()}).then(U)}function J(){let u=$e(),m=p?p.selectBoardColumn(Ku,"ready"):[],T=p?p.selectBoardColumn(Zu,"blocked"):[],X=p?p.selectBoardColumn(Xu,"in_progress"):[],he=new Map;for(let k of X){let G=fp(k);if(!G)continue;let ue=he.get(G);ue?ue.push(k):he.set(G,[k])}let Ae=k=>{let G=mr(he.get(k)||[]);return G?G.title||G.id:null},ye=u.bead_titles||{},ie=new Map;for(let[k,G]of Object.entries(ye))typeof G=="string"&&G.length>0&&ie.set(k,G);for(let k of[...m,...T])ie.set(k.id,k.title||k.id);let Ie=u.bead_times||{},Ge=new Map;for(let[k,G]of Object.entries(Ie))G&&typeof G=="object"&&Ge.set(k,G);for(let k of[...m,...T])Ge.set(k.id,{created_at:k.created_at,updated_at:k.updated_at});let we=k=>Ge.get(k)||{},at=u.pr_wait||[],Tt=u.pr_observations||{},St=u.pr_activity||{},et=u.cleanup_failed||{},Et=Object.entries(et).map(([k,G])=>({bead_id:k,step:G&&G.step?G.step:"",reason:G&&G.reason?G.reason:"",detail:G&&typeof G.detail=="string"?G.detail:null,output_tail:G&&typeof G.output_tail=="string"&&G.output_tail?G.output_tail:void 0,log_path:G&&typeof G.log_path=="string"&&G.log_path?G.log_path:void 0,diagnosis:G&&G.diagnosis&&typeof G.diagnosis=="object"&&typeof G.diagnosis.verdict=="string"&&typeof G.diagnosis.evidence=="string"?{verdict:G.diagnosis.verdict,evidence:G.diagnosis.evidence,fix_bead_id:typeof G.diagnosis.fix_bead_id=="string"?G.diagnosis.fix_bead_id:null,malformed:G.diagnosis.malformed===!0}:null,diagnosis_pending:A.has(k)||Qu(u.attempts,k)})),ve=u.queue||[],Ye=new Set([...ve.map(k=>k.bead_id),...at.map(k=>k.bead_id),...u.done.map(k=>k.bead_id)]),Dt=new Set(T.map(k=>k.id)),Zt=a?a.get()?.order||{}:{},le=new Set,b=[];for(let k of[...m,...T])Ye.has(k.id)||le.has(k.id)||pp(k)||Ya(k.labels)||(le.add(k.id),b.push(k));S=up(b,y,Zt);let z=u.admission||{},_=k=>{let G=z[k];if(!G)return"";if(G.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let ue=typeof G.reason=="string"?G.reason:"",He=ue.indexOf(":");return He>0&&He<ue.length-1?`\u26D4 ${ue.slice(0,He)} (${ue.slice(He+1)})`:`\u26D4 ${ue}`},v=S.map(k=>{let G=Jn(k),ue=G.path.length>0,He=k.workflow?.route==="quick_fix"||k.metadata&&k.metadata.route==="quick_fix",Yr=!He&&ue&&!G.conflict,fo=Dt.has(k.id),bn=[];fo&&bn.push(_p(k)),He?bn.push("quick_fix \xB7 \uC6CC\uCEE4 \uBE44\uB300\uC0C1"):G.conflict?bn.push("spec_id_conflict"):ue||bn.push("spec \uC5C6\uC74C");let _o=_(k.id);return _o&&bn.push(_o),{id:k.id,title:k.title||k.id,reason:bn.join(" \xB7 "),draggable:Yr,lane:"candidate",created_at:k.created_at,updated_at:k.updated_at,workflow:k.workflow,is_quick_fix:He,status:k.status,blocked:fo,has_spec:ue}}),Q=tp(v,$),te=Q.visible,K=u.revise_parked||{},g=(k,G)=>k.map(ue=>{let He=G==="queue"?K[ue.bead_id]:null;return{id:ue.bead_id,title:ie.get(ue.bead_id)||ue.bead_id,reason:G==="done"?"":_(ue.bead_id),draggable:G!=="done",done:G==="done",lane:G,badges:He?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!He,revise_action:!!He,revise_enabled:!!He&&!L.has(ue.bead_id),revise_title:He?He.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${He.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":"",usage:G==="done"?Mt(u.attempts||{},ue.bead_id):null,done_at:G==="done"&&typeof ue.added_at=="number"?ue.added_at:void 0,...we(ue.bead_id)}}),I=new Map;for(let k of u.done)k&&typeof k.bead_id=="string"&&typeof k.added_at=="number"&&I.set(k.bead_id,k.added_at);let x=u.attempts?Object.values(u.attempts):[],Y=new Set;for(let k of x)k&&typeof k.resumed_from=="string"&&k.resumed_from.length>0&&Y.add(k.resumed_from);let Me=new Map;for(let k of x)Me.set(k.bead_id,k.attempt_id);let rt=new Map;for(let k of x)rt.set(k.attempt_id,k);function ht(k){let G=new Set,ue=k;for(;ue&&!G.has(ue.attempt_id);){if(ue.conflict_resolution===!0)return!0;G.add(ue.attempt_id),ue=typeof ue.resumed_from=="string"&&ue.resumed_from.length>0&&rt.get(ue.resumed_from)||null}return!1}let Oe=typeof u.declared_base=="string"?u.declared_base:null;function Xt(k){let G=null;for(let ue of x)!ue||ue.bead_id!==k||ht(ue)||(G===null||(typeof ue.started_at=="number"?ue.started_at:0)>=(typeof G.started_at=="number"?G.started_at:0))&&(G=ue);return G&&typeof G.target_base=="string"?G.target_base:null}let an=[],Bt=null;for(let k of x){let G=k.status==="paused"&&!Y.has(k.attempt_id);if(k.status==="running"||G)an.push({bead_id:k.bead_id,attempt_id:k.attempt_id,title:ie.get(k.bead_id)||k.bead_id,runner:k.runner||null,model:k.model||null,effort:k.effort||null,started_at:typeof k.started_at=="number"?k.started_at:null,resumed_from:k.resumed_from||null,paused:G,conflict_resolution:ht(k),base_exception:Xa(Oe,k.target_base),can_pause:typeof k.session_id=="string"&&k.session_id.length>0,usage:Mt(u.attempts||{},k.bead_id),current_child:Ae(k.bead_id),...we(k.bead_id)});else if(k.status==="failed"||k.status==="orphaned"){let ue=Me.get(k.bead_id)!==k.attempt_id,He=I.get(k.bead_id),Yr=typeof He=="number"&&He>0&&typeof k.finished_at=="number"&&He>=k.finished_at;!ue&&!Yr&&typeof k.dismissed_at!="number"&&(Bt=k)}}let eo=null;if(Bt){let k=typeof Bt.session_id=="string"&&Bt.session_id.length>0,G=Y.has(Bt.attempt_id),ue=Bt.cause_detail;eo={repo:Bt.repo||"",reason:Bt.cause||Bt.status,cause_detail:ue&&typeof ue.reason=="string"?{reason:ue.reason,command:typeof ue.command=="string"?ue.command:null}:null,resume_attempt_id:Bt.attempt_id,resume_eligible:k&&!G,resume_reason:k?G?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}}let fl=new Set(an.map(k=>k.bead_id)),Hr=Array.isArray(u.merge_queue)?u.merge_queue:[],to=new Map;Hr.forEach((k,G)=>{k&&typeof k.bead_id=="string"&&to.set(k.bead_id,G+1)});let no=u.merge_queue_state||{active:null,failures:{}},_l=no.failures||{},ml=u.auto_merge_skips||{},ro=k=>{let G=ml[k];if(!G)return null;let ue=Tt[k],He=ue&&ue.pr?ue.pr.head_sha:null;return He&&He===G.head_sha?G.reason||"":null},ar=new Map;for(let k of an)k.conflict_resolution&&(k.paused?ar.has(k.bead_id)||ar.set(k.bead_id,"paused"):ar.set(k.bead_id,"running"));let so=an.filter(k=>!k.paused).length,oo=(u.workspace_info||{}).slots,gl=typeof oo=="number"?oo:typeof u.slots=="number"?u.slots:or,io=u.pr_wait_holds_slot===!0?or:gl,hl=so>io,ao=wn(C),bl=(Array.isArray(u.done)?u.done.slice():[]).filter(k=>ao===void 0||typeof k.added_at!="number"||k.added_at>=ao).sort((k,G)=>(G.added_at||0)-(k.added_at||0)),Wr=g(bl,"done"),lr={};for(let k of Wt)lr[k]=0;let lo=!1,co=0,Gr=0,uo=0;for(let k of Wr){let G=k.usage;if(G&&typeof G=="object"){let ue=!1;for(let He of Wt)Number.isFinite(G[He])&&(lr[He]+=G[He],lo=!0,ue=!0);ue&&(Gr+=1,Number.isFinite(G.total_cost_usd)&&(co+=G.total_cost_usd,uo+=1))}}Gr>0&&uo===Gr&&(lr.total_cost_usd=co);let po=Wr.map(k=>k.usage).filter(k=>k&&typeof k=="object"&&k.providers),vl=po.length>0?ft(kr(po)):lo?Pt(lr):null;return{queue:u,idToTitle:ie,candidates:te,candidate_hidden:{blocked:Q.hidden_blocked,spec:Q.hidden_spec},running:an,live_count:so,slots:io,over_cap:hl,failure:eo,waiting:g(ve.filter(k=>!fl.has(k.bead_id)),"queue"),pr_wait:at.map(k=>vp(k.bead_id,ie.get(k.bead_id)||k.bead_id,Tt,et[k.bead_id]||null,Mt(u.attempts||{},k.bead_id),St[k.bead_id]||(q.has(k.bead_id)?{activity:null,merge_progress:{step:"merging"}}:null),ar.get(k.bead_id)||null,k.external===!0,{position:to.get(k.bead_id)||0,active:no.active===k.bead_id,failure:_l[k.bead_id]||null},k.wt_present!==!1,u.auto_merge===!0?ro(k.bead_id):null,Xa(Oe,Xt(k.bead_id)))).map(k=>({...k,...we(k.id)})),merge_queue_length:Hr.length,merge_queue_running:Hr.length>0,auto_excluded:at.map(k=>k.bead_id).filter(k=>ro(k)!==null),verify_cmd_present:!!(u.workspace_info||{}).verify_cmd,declared_base:Oe,done:Wr,token_total:vl,cleanup_failures:Et}}function de(u){let m=u.waiting.length>0?u.waiting[0].id:"\u2014",T=c`<button
      type="button"
      class="worker-play${u.queue.auto_advance?" is-active":""}"
    >
      ${u.queue.auto_advance?"\u23F8 \uC77C\uC2DC\uC815\uC9C0":"\u25B6 \uC790\uB3D9 \uC9C4\uD589"}
    </button>`,X=u.queue.auto_advance===!0&&u.queue.auto_merge===!0,he=c`<button
      type="button"
      class="worker-auto-all${X?" is-active":""}"
      title=${X?"\uC790\uB3D9 \uC9C4\uD589\uACFC \uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uB055\uB2C8\uB2E4":"\uC790\uB3D9 \uC9C4\uD589\uACFC \uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uCF2D\uB2C8\uB2E4"}
      aria-pressed=${X?"true":"false"}
    >
      ${X?"\u23F9 \uC804\uCCB4 \uC790\uB3D9\uD654":"\u23F5\u23F5 \uC804\uCCB4 \uC790\uB3D9\uD654"}
    </button>`,Ae=u.over_cap?c`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",ye=c`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${u.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${u.pr_wait.length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${V()} 완료 <b>${u.done.length}</b></span
      >`,ie=c`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${u.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${u.declared_base||"?"}</span
    >`,Ie=c`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${or}
          step="1"
          .value=${String(u.slots)}
          ?disabled=${u.queue.pr_wait_holds_slot===!0}
          title=${u.queue.pr_wait_holds_slot===!0?"\uBA38\uC9C0\uAE4C\uC9C0 \uC21C\uCC28 \uC2E4\uD589 \uC911 \u2014 \uD574\uC81C\uD558\uBA74 \uC800\uC7A5\uB41C \uB3D9\uC2DC \uC2E4\uD589 \uC218\uB85C \uB3CC\uC544\uAC11\uB2C8\uB2E4":"\uB3D9\uC2DC\uC5D0 \uC2E4\uD589\uD560 \uC138\uC158 \uC218 (\uCD5C\uC18C 1 = \uC21C\uCC28 \uC2E4\uD589)"}
      /></label>
      <label
        class="worker-tgl"
        title="각 이슈가 PR 머지·정리를 마칠 때까지 다음 이슈를 시작하지 않습니다"
      >
        <input
          type="checkbox"
          class="worker-pr-wait-hold"
          .checked=${u.queue.pr_wait_holds_slot===!0}
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
      </button>`,Ge=$a({failure:u.failure,cleanupFailures:u.cleanup_failures});return ne?c`<div class="worker-ribbon">
          ${T}
          <div class="worker-kpi worker-kpi--ribbon">${Ae}${ye}</div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${he}${Ie}</div>
          <div class="worker-kpi">${ie}</div>
        </div>
        ${Ge}`:c`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${T}${he}${Ie}</div>
        <div class="worker-kpi">
          ${Ae}${ye}${ie}
          ${(Array.isArray(u.token_total)?u.token_total:u.token_total?[{label:u.token_total,tooltip:`${V()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(we=>c`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${we.tooltip}
                >${V()} 완료 · 누적 ${we.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${m}</b></span
          >
        </div>
      </div>
      ${Ge}`}function Te(u){if(u.running.length===0&&u.pr_wait.length===0)return"";let m=u.running.some(T=>!T.paused);return c`<section
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
          >${u.running.length+u.pr_wait.length}</span
        >
        ${st(u)}
      </header>
      ${u.running.length>0?Us(u.running,Date.now(),Ue):""}
      ${u.pr_wait.map(T=>qs(T))}
    </section>`}function Ne(u){let m=u.candidate_hidden;return c`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${$.show_blocked}
        />
        🔒 blocked${m.blocked>0?` ${m.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${np.map(T=>c`<button
              type="button"
              class="worker-filter__chip${$.spec===T.value?" is-active":""}"
              data-spec=${T.value}
              aria-pressed=${$.spec===T.value?"true":"false"}
            >
              ${T.label}
            </button>`)}
        ${m.spec>0?c`<span class="worker-filter__hidden">숨김 ${m.spec}</span>`:""}
      </div>
    </div>`}function Ze(){return c`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${y}
    >
      ${rp.map(u=>c`<option value=${u.value} ?selected=${y===u.value}>
            ${u.label}
          </option>`)}
    </select>`}function Xe(){return c`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${C}
      >
        ${Ut.map(u=>c`<option value=${u.value} ?selected=${C===u.value}>
              ${u.label}
            </option>`)}
      </select>
    </div>`}function lt(u){let m=(u.queue.pr_wait||[]).filter(X=>X&&X.external!==!0&&typeof X.bead_id=="string"),T=new Set(u.running.filter(X=>!X.paused).map(X=>X.bead_id));for(let X of m)T.add(X.bead_id);if(!(u.queue.pr_wait_holds_slot!==!0||u.queue.auto_advance!==!0||u.queue.auto_merge===!0||m.length===0||u.waiting.length===0||T.size<u.slots))return c`<div class="worker-stat worker-pr-wait-hint">
      PR 머지 대기 중 — 다음 이슈는 머지·정리 완료 후 시작됩니다 (자동 머지
      꺼짐)
    </div>`}function st(u){let m=u.queue.auto_merge===!0;if(u.merge_queue_running)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop${m?" is-active":""}"
        title=${m?"\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB044\uACE0 \uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)":"\uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)"}
      >
        ${m?"\u23F8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8":"\uC77C\uAD04 \uBA38\uC9C0 \uC911\uB2E8"} ${u.merge_queue_length}
      </button>`;if(m)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop is-active"
        title="자동 머지 켜짐 — 자격이 생기는 PR을 계속 큐에 넣습니다. 클릭하면 끕니다"
      >
        ⏸ 자동 머지
      </button>`;let T=new Set(u.auto_excluded),X=u.pr_wait.filter(he=>he.merge_action&&he.merge_enabled&&!T.has(he.id)).length;return c`<button
      type="button"
      class="worker-merge-all"
      title=${u.verify_cmd_present?"\uCF1C \uB450\uBA74 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uCDA9\uB3CC \uD574\uC18C\xB7\uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uCF1C \uB450\uBA74 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uCDA9\uB3CC \uD574\uC18C\xB7\uBA38\uC9C0\uD569\uB2C8\uB2E4 \u2014 \uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uB294 \uAC80\uC99D \uC2E0\uD638\uAC00 \uC5C6\uC5B4 CI\xB7\uB85C\uCEEC\uAC80\uC99D \uC5C6\uC774 \uBA38\uC9C0\uB429\uB2C8\uB2E4"}
    >
      ▶ 자동 머지${X>0?` ${X}`:""}
    </button>`}function _t(u){let m=zt({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:u.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:Ze(),controls:Ne(u)});return ne?c`<div class="worker-lanes worker-lanes--mobile">
        ${Te(u)}
        ${zt({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:u.waiting,empty:"\uB4DC\uB798\uADF8 \uB610\uB294 [\uB300\uAE30\uB85C \u21B4]\uB85C \uBC30\uCE58",controls:lt(u),collapsible:!0,collapsed:Z.queue,preview:Ka(u.waiting)})}
        ${m}
        ${zt({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:u.done,empty:`${V()} \uC644\uB8CC \uC5C6\uC74C`,controls:Xe(),collapsible:!0,collapsed:Z.done,preview:Array.isArray(u.token_total)?u.token_total.map(T=>T.label).join(" \xB7 "):u.token_total||Ka(u.done)})}
      </div>`:c`<div class="worker-lanes">
      ${m}
      ${zt({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:u.waiting,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58",controls:lt(u)})}
      ${zt({id:"worker-pane-running",lane:"running",title:`\uC2E4\uD589 \uC911 \xB7 \uC2AC\uB86F ${u.slots}`,items:u.running,live:u.running.some(T=>!T.paused),body:Us(u.running,Date.now(),Ue)})}
      ${zt({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:u.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C",header_control:st(u)})}
      ${zt({id:"worker-pane-done",lane:"done",title:`\uC644\uB8CC \xB7 ${V()} ${u.done.length}`,items:u.done,empty:`${V()} \uC644\uB8CC \uC5C6\uC74C`,controls:Xe()})}
    </div>`}function vt(u){Z={...Z,[u]:!Z[u]},dp(Z),De()}function De(){let u=J();Pe(de(u),pe),Pe(_t(u),Ee)}function ot(){let u=document.querySelector(".app-header");if(!u)return;let m=()=>{let T=Math.round(u.getBoundingClientRect().height);j.style.setProperty("--worker-ribbon-top",`${T}px`)};if(m(),typeof ResizeObserver=="function"){let T=new ResizeObserver(m);T.observe(u),E.push(()=>T.disconnect())}else window.addEventListener("resize",m),E.push(()=>window.removeEventListener("resize",m))}function We(){if(typeof window.matchMedia!="function")return;let u=window.matchMedia(lp);ne=!!u.matches;let m=T=>{let X=!!(T&&typeof T.matches=="boolean"?T.matches:u.matches);X!==ne&&(ne=X,De())};typeof u.addEventListener=="function"?(u.addEventListener("change",m),E.push(()=>u.removeEventListener("change",m))):typeof u.addListener=="function"&&(u.addListener(m),E.push(()=>u.removeListener(m)))}function mt(u){let m=u.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!m)return;let T=m.dataset.beadId||"",X=m.dataset.lane||"";h={bead_id:T,from_lane:X};try{u.dataTransfer?.setData("text/plain",T),u.dataTransfer&&(u.dataTransfer.effectAllowed="move")}catch{}}function ct(u){let m=u.target?.closest?.(".worker-pane");if(!m)return;let T=m.dataset.lane||"";T!=="candidate"&&T!=="queue"||(u.preventDefault(),u.dataTransfer&&(u.dataTransfer.dropEffect="move"),m.classList.add("worker-pane--drag-over"))}function nt(u){u.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function it(u,m){let T=S.find(ye=>ye.id===u);if(!T)return;let X=S.filter(ye=>ye.id!==u),he=X.length;if(m){let ye=m.dataset.beadId;if(ye===u)return;let ie=X.findIndex(Ie=>Ie.id===ye);ie>=0&&(he=ie)}let Ae=X.slice();Ae.splice(he,0,T),f.applyReorder(u,Ae,he)}function gt(u){let m=u.target?.closest?.(".worker-pane");if(!m)return;u.preventDefault(),m.classList.remove("worker-pane--drag-over");let T=m.dataset.lane||"",X=h?.bead_id||u.dataTransfer?.getData("text/plain")||"",he=h?.from_lane||"";if(h=null,!X)return;let Ae=u.target?.closest?.(".worker-mini, .worker-card"),ye=Array.from(m.querySelectorAll(".worker-mini, .worker-card")),ie=ye.length;if(Ae){let Ie=ye.indexOf(Ae);Ie>=0&&(ie=Ie)}if(m.classList.contains("worker-pane--collapsed")&&(ie=_e()),T==="candidate"){if(he==="candidate"){it(X,Ae);return}he==="queue"&&ge(X);return}T==="queue"&&(he==="queue"?ke(X,ie):oe(X,ie))}function Je(u){$=u,ep(u),De()}function yt(u){y=u==="board"||u==="created"||u==="spec"?u:jr,op(y),De()}function Qe(u){C=Ht(u)?u:Rt,ap(C),De()}function dt(u){let m=u.target?.closest?.(".worker-filter__blocked");if(m){Je({...$,show_blocked:m.checked});return}let T=u.target?.closest?.(".worker-done-range");if(T){Qe(T.value);return}let X=u.target?.closest?.(".worker-sort");if(X){yt(X.value||jr);return}let he=u.target?.closest?.(".worker-pr-wait-hold");if(he){H(he.checked);return}let Ae=u.target?.closest?.(".worker-slots__input");if(!Ae)return;let ye=Number.parseInt(Ae.value,10);if(!Number.isFinite(ye)){De();return}W(ye).then(De)}function ut(u){return u?{runner:u.runner||void 0,model:u.model||void 0,effort:u.effort||void 0,worktree:u.worktree||void 0,status:u.status||void 0,session_id:u.session_id||void 0}:{}}function R(u){let m=$e(),T=m.attempts?m.attempts[u]:null;Ue=u,xe.hidden=!1,Ke.open({attempt_id:u,meta:ut(T)}),De()}function N(){if(!Ue)return;let u=$e(),m=u.attempts?u.attempts[Ue]:null;if(m){Ke.updateMeta(ut(m));return}Ke.close()}function ee(u){let m=u.target;if(m?.closest?.("#worker-exec-defaults-dialog"))return;if(m?.closest?.(".worker-exec-defaults-btn")){je.open();return}let T=m?.closest?.(".worker-banner__resume");if(T){let ve=T.dataset.attemptId;ve&&Ce(ve);return}let X=m?.closest?.(".worker-banner__dismiss");if(X){let ve=X.dataset.attemptId;ve&&F(ve);return}let he=m?.closest?.(".worker-banner__cleanup-diagnose");if(he){let ve=he.dataset.beadId;ve&&O(ve);return}if(m?.closest?.(".worker-play")){ce(!$e().auto_advance);return}if(m?.closest?.(".worker-auto-all")){let ve=$e();w(!(ve.auto_advance===!0&&ve.auto_merge===!0));return}let Ae=m?.closest?.(".worker-merge-all");if(Ae){Ae.classList.contains("worker-merge-all--stop")?$e().auto_merge===!0?Re(!1):B():Re(!0);return}let ye=m?.closest?.(".worker-pane__hd--toggle");if(ye){let ve=ye.dataset.lane;(ve==="queue"||ve==="done")&&vt(ve);return}let ie=m?.closest?.(".worker-card__place");if(ie){let ve=ie.dataset.beadId;ve&&!ie.disabled&&oe(ve,_e());return}let Ie=m?.closest?.(".worker-filter__chip");if(Ie){let ve=Ie.dataset.spec;(ve==="all"||ve==="with"||ve==="without")&&Je({...$,spec:ve});return}let Ge=m?.closest?.(".worker-mini__merge");if(Ge){Se(Ge.dataset.beadId||"");return}let we=m?.closest?.(".worker-mini__merge-cancel");if(we){M(we.dataset.beadId||"");return}let at=m?.closest?.(".worker-mini__discard");if(at){P(at.dataset.beadId||"");return}let Tt=m?.closest?.(".worker-mini__revise-fix");if(Tt){ae("worker-revise-fix",Tt.dataset.beadId||"");return}let St=m?.closest?.(".worker-mini__revise-approve");if(St){ae("worker-revise-approve",St.dataset.beadId||"");return}if(m?.closest?.(".worker-mini__pr"))return;if(m?.closest?.(".rtile__stop")){let Ye=m?.closest?.(".rtile")?.dataset?.attemptId;Ye&&Be(Ye);return}if(m?.closest?.(".rtile__pause")){let Ye=m?.closest?.(".rtile")?.dataset?.attemptId;Ye&&be(Ye);return}if(m?.closest?.(".rtile__resume")){let Ye=m?.closest?.(".rtile")?.dataset?.attemptId;Ye&&Ce(Ye);return}if(m?.closest?.(".rtile__session")){let Ye=m?.closest?.(".rtile")?.dataset?.attemptId;Ye&&R(Ye);return}if(m?.closest?.(".worker-drawer-overlay__backdrop")){Ke.close();return}if(m?.closest?.(".worker-drawer-host"))return;let et=m?.closest?.(".rtile");if(et){if(m?.closest?.(".rtile__id")){let Ye=et.dataset.beadId;Ye&&_n(Ye).then(Dt=>{Dt?se("\uBCF5\uC0AC\uB428","success",1200):se("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let ve=et.dataset.beadId;ve&&l&&l(ve);return}let Et=m?.closest?.(".worker-mini, .worker-card");if(Et){let ve=Et.dataset.beadId;if(m?.closest?.(".worker-mini__id, .worker-card__id")){ve&&_n(ve).then(Ye=>{Ye?se("\uBCF5\uC0AC\uB428","success",1200):se("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}ve&&l&&l(ve)}}return e.addEventListener("dragstart",mt),e.addEventListener("dragover",ct),e.addEventListener("dragleave",nt),e.addEventListener("drop",gt),e.addEventListener("click",ee),e.addEventListener("change",dt),We(),ot(),p&&E.push(p.subscribe(De)),s&&E.push(s.subscribe(()=>{De(),N()})),De(),{load(){De()},openExecDefaults(){je.open()},destroy(){for(let u of E.splice(0))try{u()}catch{}e.removeEventListener("dragstart",mt),e.removeEventListener("dragover",ct),e.removeEventListener("dragleave",nt),e.removeEventListener("drop",gt),e.removeEventListener("click",ee),e.removeEventListener("change",dt);try{Ke.destroy()}catch{}xe.hidden=!0;try{je.destroy()}catch{}Pe(c``,e)}}}function Xs(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function nl(e,t,n,r=async()=>{},s=async()=>{}){let o=Ve("views:workspace-picker"),i=null,a=!1,l=!1,d=!1;async function p(A){let j=A.target.value,xe=t.getState().workspace?.current?.path||"";if(j&&j!==xe){o("switching workspace to %s",j),a=!0,L();try{await n(j)}catch(me){o("workspace switch failed: %o",me)}finally{a=!1,L()}}}async function f(){let A=t.getState(),E=A.workspace?.current?.path||A.workspace?.available?.[0]?.path||"";if(!(!E||l)){o("git-pulling workspace %s",E),l=!0,L();try{await r(E)}catch(j){o("workspace git pull failed: %o",j)}finally{l=!1,L()}}}function h(A){let E=A.target;E&&e.contains(E)||y()}function S(A){A.key==="Escape"&&y()}function $(){d||(d=!0,document.addEventListener("mousedown",h),document.addEventListener("keydown",S),L())}function y(){d&&(d=!1,document.removeEventListener("mousedown",h),document.removeEventListener("keydown",S),L())}function C(){d?y():$()}async function V(A){let E=A.target,j=E.value,pe=E.checked;o("toggling visibility %s \u2192 %s",j,String(pe));try{await s(j,pe)}catch(xe){o("workspace visibility toggle failed: %o",xe)}}function Z(A){return A?c`
      <button
        type="button"
        class="workspace-picker__git-pull-button"
        @click=${f}
        ?disabled=${a||l}
        aria-label="Git Pull"
        title="Git Pull"
      >
        <span aria-hidden="true">⬇</span>
      </button>
    `:c``}function ne(A,E){return c`
      <div class="workspace-picker__manage">
        <button
          type="button"
          class="workspace-picker__manage-button"
          @click=${C}
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
                ${A.map(j=>c`
                    <label
                      class="workspace-picker__manage-row"
                      title="${j.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${j.path}"
                        .checked=${!E.has(j.path)}
                        @change=${V}
                      />
                      <span class="workspace-picker__manage-name"
                        >${Xs(j.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function q(){let A=t.getState(),E=A.workspace?.current,j=A.workspace?.available||[],pe=new Set(A.workspace?.hidden||[]),xe=E?.path||j[0]?.path||"";if(j.length===0)return c``;let me=j.filter(fe=>!pe.has(fe.path)||fe.path===xe);if(me.length<=1){let fe=me[0]||j[0],Ee=Xs(fe.path);return c`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${fe.path}"
            >${Ee}</span
          >
          ${ne(j,pe)}
          ${Z(xe)}
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
          ?disabled=${a||l}
          aria-label="Select project workspace"
        >
          ${me.map(fe=>c`
              <option
                value="${fe.path}"
                ?selected=${fe.path===xe}
                title="${fe.path}"
              >
                ${Xs(fe.path)}
              </option>
            `)}
        </select>
        ${ne(j,pe)}
        ${Z(xe)}
        ${a||l?c`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function L(){Pe(q(),e)}return L(),i=t.subscribe(()=>L()),{destroy(){i&&(i(),i=null),document.removeEventListener("mousedown",h),document.removeEventListener("keydown",S),Pe(c``,e)}}}var rl=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-queue-set-slots","worker-queue-set-pr-wait-hold","worker-queue-set-default-exec-preset","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-worker-system-prompt","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-exec-presets","unsubscribe-exec-presets","exec-presets-snapshot","exec-preset-create","exec-preset-update","exec-preset-delete","apply-exec-preset","monitor-auto-toggle"];function Qs(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function sl(e,t,n=Qs()){return{id:n,type:e,payload:t}}function ol(e={}){let t=Ve("ws"),n={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},r=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",i=0,a=null,l=!0,d=new Map,p=[],f=new Map,h=new Set;function S(q){for(let L of Array.from(h))try{L(q)}catch{}}function $(){if(!l||a)return;o="reconnecting",t("ws reconnecting\u2026"),S(o);let q=Math.min(n.maxMs||0,(n.initialMs||0)*Math.pow(n.factor||1,i)),L=(n.jitterRatio||0)*q,A=Math.max(0,Math.round(q+(Math.random()*2-1)*L));t("ws retry in %d ms (attempt %d)",A,i+1),a=setTimeout(()=>{a=null,ne()},A)}function y(q){try{s?.send(JSON.stringify(q))}catch(L){t("ws send failed",L)}}function C(){for(o="open",t("ws open"),S(o),i=0;p.length;){let q=p.shift();q&&y(q)}}function V(q){let L;try{L=JSON.parse(String(q.data))}catch{t("ws received non-JSON message");return}if(!L||typeof L.id!="string"||typeof L.type!="string"){t("ws received invalid envelope");return}if(d.has(L.id)){let E=d.get(L.id);d.delete(L.id),L.ok?E?.resolve(L.payload):E?.reject(L.error||new Error("ws error"));return}let A=f.get(L.type);if(A&&A.size>0)for(let E of Array.from(A))try{E(L.payload)}catch(j){t("ws event handler error",j)}else t("ws received unhandled message type: %s",L.type)}function Z(){o="closed",t("ws closed"),S(o);for(let[q,L]of d.entries())L.reject(new Error("ws disconnected")),d.delete(q);i+=1,$()}function ne(){if(!l)return;let q=r();try{s=new WebSocket(q),t("ws connecting %s",q),o="connecting",S(o),s.addEventListener("open",C),s.addEventListener("message",V),s.addEventListener("error",()=>{}),s.addEventListener("close",Z)}catch(L){t("ws connect failed %o",L),$()}}return ne(),{send(q,L){if(!rl.includes(q))return Promise.reject(new Error(`unknown message type: ${q}`));let A=Qs(),E=sl(q,L,A);return t("send %s id=%s",q,A),new Promise((j,pe)=>{d.set(A,{resolve:j,reject:pe,type:q}),s&&s.readyState===s.OPEN?y(E):(t("queue %s id=%s (state=%s)",q,A,o),p.push(E))})},on(q,L){f.has(q)||f.set(q,new Set);let A=f.get(q);return A?.add(L),()=>{A?.delete(L)}},onConnection(q){return h.add(q),()=>{h.delete(q)}},reconnect(){l=!0,a&&(clearTimeout(a),a=null),i=0,ne()},close(){l=!1,a&&(clearTimeout(a),a=null);try{s?.close()}catch{}},getState(){return o}}}function yp(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function wp(e,t){try{let r=await(await fetch("/api/config")).json();e.setState({config:r})}catch(n){t("config refresh failed",n)}}var Js=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],il=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"]],al=Fa,ll="worker:queue",cl="ui:order",dl="ui:display-policy",ul="exec:presets",on="tab:board:closed",pl="beads-ui.board.closed-range";function kp(e){let t=Ve("main");t("bootstrap start");let n=c`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;Pe(n,e);let r=document.getElementById("top-nav"),s=document.getElementById("usage-meter"),o=document.getElementById("board-root"),i=document.getElementById("worker-root"),a=document.getElementById("monitor-root"),l=document.getElementById("detail-panel");if(s&&Ga(s),o&&i&&a&&l){let $e=function(_,v){let Q="Request failed",te="";if(_&&typeof _=="object"){let g=_;if(typeof g.message=="string"&&g.message.length>0&&(Q=g.message),typeof g.details=="string")te=g.details;else if(g.details&&typeof g.details=="object")try{te=JSON.stringify(g.details,null,2)}catch{te=""}}else typeof _=="string"&&_.length>0&&(Q=_);let K=v&&v.length>0?`Failed to load ${v}`:"Request failed";je.open(K,Q,te)},ce=function(_){return`${we.getState().workspace.current?.path||""}\0${_}`},w=function(){O&&(O().catch(()=>{}),O=null),re=null,Se=null},H=function(_){Re=_;let v=()=>{Re!==_||we.getState().selected_id!==_||(Re=null,W(_))};if(!P){B.then(v);return}v()},Ne=function(_,v,Q,te,K){return Q!==Te[v]?(K().catch(()=>{}),!1):(_.set(te,K),!0)},Ze=function(){let _=we.getState();st(_.view==="board"),We(_.view==="worker"),gt(_.view==="monitor"),ct(_.view==="board"||_.view==="worker"||!!_.selected_id)},lt=function(){let _=wn(Xe);return _===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:_}}},st=function(_){if(_)for(let[v,Q]of Js){if(J.has(v)||de.has(v))continue;let te=v===on?lt():{type:Q};try{oe.register(v,te)}catch(I){t("register %s store failed: %o",v,I)}de.add(v);let K=Te.board,g=!1;_e.subscribeList(v,te).then(I=>{g=!Ne(J,"board",K,v,I)}).catch(I=>{t("subscribe %s failed: %o",v,I),$e(I,"board")}).finally(()=>{de.delete(v),g&&Ze()})}else vt()},vt=function(){Te.board+=1;for(let[_]of Js){let v=J.get(_);v&&(v().catch(()=>{}),J.delete(_));try{oe.unregister(_)}catch(Q){t("unregister %s failed: %o",_,Q)}}},We=function(_){if(!_){mt();return}for(let[v,Q]of il){if(De.has(v)||de.has(v))continue;try{oe.register(v,{type:Q})}catch(g){t("register %s store failed: %o",v,g)}de.add(v);let te=Te.worker,K=!1;_e.subscribeList(v,{type:Q}).then(g=>{K=!Ne(De,"worker",te,v,g)}).catch(g=>{t("subscribe %s failed: %o",v,g),$e(g,"worker")}).finally(()=>{de.delete(v),K&&Ze()})}},mt=function(){Te.worker+=1;for(let[_]of il){let v=De.get(_);v&&(v().catch(()=>{}),De.delete(_));try{oe.unregister(_)}catch(Q){t("unregister %s failed: %o",_,Q)}}},ct=function(_){if(!_){nt();return}ot||(U("subscribe-worker-queue",{id:ll}).catch(v=>{t("subscribe-worker-queue failed: %o",v)}),ot=()=>U("unsubscribe-worker-queue",{id:ll}))},nt=function(){ot&&(ot().catch(()=>{}),ot=null)},gt=function(_){if(!_){Je();return}it||(U("subscribe-monitor-pipeline",{id:al}).catch(v=>{t("subscribe-monitor-pipeline failed: %o",v)}),it=()=>U("unsubscribe-monitor-pipeline",{id:al}))},Je=function(){it&&(it().catch(()=>{}),it=null)},Qe=function(){yt||(U("subscribe-ui-order",{id:cl}).catch(_=>{t("subscribe-ui-order failed: %o",_)}),yt=()=>U("unsubscribe-ui-order",{id:cl}))},dt=function(){yt&&(yt().catch(()=>{}),yt=null),Be.clear()},R=function(){ut||(U("subscribe-display-policy",{id:dl}).catch(_=>{t("subscribe-display-policy failed: %o",_)}),ut=()=>U("unsubscribe-display-policy",{id:dl}))},N=function(){ut&&(ut().catch(()=>{}),ut=null),be.clear()},u=function(){ee||(U("subscribe-exec-presets",{id:ul}).catch(_=>{t("subscribe-exec-presets failed: %o",_)}),ee=()=>U("unsubscribe-exec-presets",{id:ul}))},ye=function(_){if(!_)return"Unknown";let v=_.split("/").filter(Boolean);return v.length>0?v[v.length-1]:"Unknown"};var d=$e,p=ce,f=w,h=H,S=Ne,$=Ze,y=lt,C=st,V=vt,Z=We,ne=mt,q=ct,L=nt,A=gt,E=Je,j=Qe,pe=dt,xe=R,me=N,fe=u,Ee=ye;let Ue=document.getElementById("header-loading"),Ke=Ko(Ue),je=ba(e),D=ol(),U=Ke.wrapSend((_,v)=>D.send(_,v)),_e=zo(U),oe=jo(),ke=Wo(),ge=To(),Be=Ho(),be=So(),Ce=Ao(),F=Eo();D.on("exec-presets-snapshot",_=>{let v=_;v&&typeof v.revision=="number"&&Array.isArray(v.presets)&&Ce.set({revision:v.revision,presets:v.presets})}),D.on("monitor-pipeline-snapshot",_=>{let v=_;if(!(!v||!Array.isArray(v.workspaces)))try{ge.set(v.workspaces,v.workspaces_state)}catch{}}),D.on("ui-order-snapshot",_=>{let v=_;if(v&&typeof v.revision=="number")try{Be.set({revision:v.revision,order:v.order&&typeof v.order=="object"?v.order:{}})}catch{}}),D.on("display-policy-snapshot",_=>{let v=_;if(v&&v.policy&&typeof v.policy=="object")try{be.set(v.policy)}catch{}}),D.on("session-log-snapshot",_=>{let v=_;if(v&&typeof v.attempt_id=="string")try{F.set(v.attempt_id,Array.isArray(v.lines)?v.lines:[],typeof v.last_event_at=="number"?v.last_event_at:null)}catch{}}),D.on("session-log-append",_=>{let v=_;if(v&&typeof v.attempt_id=="string")try{F.append(v.attempt_id,v.event)}catch{}}),D.on("snapshot",_=>{let v=_,Q=v&&typeof v.id=="string"?v.id:"",te=Q?oe.getStore(Q):null;if(te&&v&&v.type==="snapshot")try{te.applyPush(v)}catch{}}),D.on("upsert",_=>{let v=_,Q=v&&typeof v.id=="string"?v.id:"",te=Q?oe.getStore(Q):null;if(te&&v&&v.type==="upsert")try{te.applyPush(v)}catch{}}),D.on("delete",_=>{let v=_,Q=v&&typeof v.id=="string"?v.id:"",te=Q?oe.getStore(Q):null;if(te&&v&&v.type==="delete")try{te.applyPush(v)}catch{}});let O=null,re=null,Se=null,Re=null,M=()=>{},B=new Promise(_=>{M=()=>_(void 0)}),P=!1,ae=!1;async function W(_){let v=ce(_);if(v===re||v===Se)return;Se=v;let Q=`detail:${_}`,te={type:"issue-detail",params:{id:_}};try{oe.register(Q,te)}catch(K){t("register detail store failed: %o",K)}try{let K=await _e.subscribeList(Q,te);if(we.getState().selected_id!==_||ce(_)!==v){await K().catch(()=>{});return}O&&await O().catch(()=>{}),O=K,re=v}catch(K){t("detail subscribe failed: %o",K),$e(K,"issue details")}finally{Se===v&&(Se=null)}}let J=new Map,de=new Set,Te={board:0,worker:0},Xe=Rt;try{let _=window.localStorage.getItem(pl);Ht(_)&&(Xe=_)}catch{}async function _t(_){if(!Ht(_)||_===Xe)return;Xe=_;try{window.localStorage.setItem(pl,_)}catch{}let v=J.get(on);if(!v)return;J.delete(on),await v().catch(()=>{});let Q=lt();try{oe.register(on,Q)}catch(te){t("register %s store failed: %o",on,te)}try{let te=await _e.subscribeList(on,Q);J.set(on,te)}catch(te){t("re-subscribe %s failed: %o",on,te),$e(te,"board")}}let De=new Map,ot=null,it=null,yt=null,ut=null,ee=null;async function m(){ut=null,be.clear(),ee=null,Ce.clear(),ot=null,it=null,J.clear(),De.clear(),Te.board+=1,Te.worker+=1,u();let _=we.getState().workspace.current?.path;if(_)try{await D.send("set-workspace",{path:_})}catch(Q){t("workspace restore after reconnect failed: %o",Q);return}R();let v=we.getState();st(v.view==="board"),We(v.view==="worker"),gt(v.view==="monitor"),ct(v.view==="board"||v.view==="worker"||!!v.selected_id)}async function T(){t("clearing all subscriptions for workspace switch"),vt(),mt(),nt(),ke.clear(),dt(),Qe(),N(),R(),w();let _=we.getState();if(_.selected_id)try{oe.unregister(`detail:${_.selected_id}`)}catch{}let v=we.getState();st(v.view==="board"),We(v.view==="worker"),gt(v.view==="monitor"),ct(v.view==="board"||v.view==="worker"||!!v.selected_id),v.selected_id&&H(v.selected_id)}async function X(_){t("requesting workspace switch to %s",_),ae=!0;try{let v=await D.send("set-workspace",{path:_});t("workspace switch result: %o",v),v&&v.workspace&&(we.setState({workspace:{current:{path:v.workspace.root_dir,database:v.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",_),v.changed&&(await T(),se("Switched to "+ye(_),"success",2e3)))}catch(v){throw t("workspace switch failed: %o",v),se("Failed to switch workspace","error",3e3),v}finally{ae=!1}}async function he(_){t("requesting workspace git pull for %s",_);try{let v=await D.send("git-pull-workspace",{});t("workspace git pull result: %o",v);let Q=v?.status;if(Q==="up_to_date"){se("Already up to date","success",2e3);return}if(Q==="stash_pop_conflict"){se("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}se("Git pulled "+ye(_),"success",2e3)}catch(v){t("workspace git pull failed: %o",v);let Q=v?.code,te=v?.message;if(Q==="rebase_conflict"){se("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(Q==="rebase_conflict_abort_failed"){se("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(Q==="busy"){se("Git pull skipped: another operation is running","warning",3e3);return}let K=te?`: ${te}`:"";throw se(`Git pull failed${K}`,"error",3e3),v}}async function Ae(_,v){t("setting workspace visibility %s \u2192 %s",_,String(v));try{await D.send("set-workspace-visibility",{path:_,visible:v}),await ie()}catch(Q){t("workspace visibility update failed: %o",Q),se("Failed to update project visibility","error",3e3)}}async function ie(){try{let _=await D.send("list-workspaces",{});if(t("workspaces loaded: %o",_),_&&Array.isArray(_.workspaces)){let v=_.workspaces.map(g=>({path:g.path,database:g.database,pid:g.pid,version:g.version})),Q=_.current?{path:_.current.root_dir,database:_.current.db_path}:null,te=Array.isArray(_.hidden)?_.hidden.filter(g=>typeof g=="string"):[];we.setState({workspace:{current:Q,available:v,hidden:te}});let K=window.localStorage.getItem("beads-ui.workspace");K&&(!v.some(I=>I.path===K)||te.includes(K)?window.localStorage.removeItem("beads-ui.workspace"):Q&&K!==Q.path&&(t("restoring saved workspace preference: %s",K),await X(K)))}}catch(_){t("failed to load workspaces: %o",_)}}D.on("workspace-changed",_=>{t("workspace-changed event: %o",_),_&&_.root_dir&&(we.setState({workspace:{current:{path:_.root_dir,database:_.db_path}}}),ie(),T())});let Ie=!1;if(typeof D.onConnection=="function"){let _=v=>{t("ws state %s",v),v==="reconnecting"||v==="closed"?(Ie=!0,se("Connection lost. Reconnecting\u2026","error",4e3)):v==="open"&&Ie&&(Ie=!1,se("Reconnected","success",2200),wp(we,(Q,te)=>{t(`${Q}: %o`,te)}),m())};D.onConnection(_)}let Ge="board";try{let _=window.localStorage.getItem("beads-ui.view");(_==="board"||_==="worker"||_==="monitor")&&(Ge=_)}catch(_){t("view parse error: %o",_)}let we=Vo({config:yp(),view:Ge});D.on("worker-queue-snapshot",_=>{let v=_;if(!v||!v.queue)return;let Q=we.getState().workspace.current?.path;if(typeof Q=="string"&&Q.length>0&&v.root_dir!==Q){t("dropping worker-queue snapshot for %s",String(v.root_dir));return}try{ke.set(v.queue)}catch{}});let at=Go(we);at.start();let Tt=new Set(["get-comments","exec-preset-create","exec-preset-update","exec-preset-delete","apply-exec-preset"]),St=async(_,v)=>{try{return await U(_,v)}catch(Q){if(Tt.has(_))throw Q;return[]}};r&&Ba(r,we,at);let et=document.getElementById("workspace-picker");et&&nl(et,we,X,he,Ae);let Et=Ha(e,(_,v)=>U(_,v));try{let _=document.getElementById("new-issue-btn");_&&_.addEventListener("click",()=>Et.open())}catch{}let ve=ha(e,{policyStore:be,transport:(_,v)=>U(_,v),labelOptions:()=>{let _=new Set;for(let[v]of Js)for(let Q of oe.snapshotFor(v)||[]){let te=Q.labels;if(Array.isArray(te))for(let K of te)typeof K=="string"&&K.length>0&&_.add(K)}return Array.from(_).sort()}});try{let _=document.getElementById("display-settings-btn");_&&_.addEventListener("click",()=>ve.open())}catch{}let Ye=si(o,{gotoIssue:_=>at.gotoIssue(_),issueStores:oe,transport:St,workerQueueStore:ke,uiOrderStore:Be,displayPolicyStore:be,closedRange:Xe,onClosedRangeChange:_=>{_t(_)},onNewIssue:()=>Et.open()}),Dt=Zs(i,{transport:St,issueStores:oe,queueStore:ke,execPresetStore:Ce,sessionLogStore:F,uiOrderStore:Be,gotoIssue:_=>we.setState({selected_id:_}),getWorkspacePath:()=>we.getState().workspace.current?.path}),Zt=qa(a,{transport:St,pipelineStore:ge,execPresetStore:Ce,gotoIssue:_=>at.gotoIssue(_),getWorkspacePath:()=>we.getState().workspace.current?.path,switchWorkspace:_=>X(_)}),le=ma(l,{issueStores:oe,transport:St,queueStore:ke,execPresetStore:Ce,sessionLogStore:F,getWorkspacePath:()=>we.getState().workspace.current?.path,onNavigate:_=>{we.getState().view==="worker"?we.setState({selected_id:_}):at.gotoIssue(_)},onClose:()=>{let _=we.getState();we.setState({selected_id:null});try{at.gotoView(_.view==="worker"||_.view==="monitor"?_.view:"board")}catch{}},onOpenExecPresets:()=>{we.setState({selected_id:null}),at.gotoView("worker"),Dt.openExecDefaults()}}),b=we.getState().selected_id;b&&(l.hidden=!1,le.load(b),H(b)),we.subscribe(_=>{let v=_.selected_id;v?(l.hidden=!1,le.load(v),ae||H(v)):(le.clear(),l.hidden=!0,w())});let z=_=>{o.hidden=_.view!=="board",i.hidden=_.view!=="worker",a.hidden=_.view!=="monitor",st(_.view==="board"),We(_.view==="worker"),gt(_.view==="monitor"),ct(_.view==="board"||_.view==="worker"||!!_.selected_id),!_.selected_id&&_.view==="board"&&Ye.load(),_.view==="worker"&&Dt.load(),_.view==="monitor"?Zt.load():Zt.pause(),window.localStorage.setItem("beads-ui.view",_.view)};we.subscribe(z),z(we.getState()),Qe(),R(),u(),ie().finally(()=>{P=!0,M()}),window.addEventListener("keydown",_=>{let v=_.ctrlKey||_.metaKey,Q=String(_.key||"").toLowerCase(),te=_.target,K=te&&te.tagName?String(te.tagName).toLowerCase():"",g=K==="input"||K==="textarea"||K==="select"||te&&typeof te.isContentEditable=="boolean"&&te.isContentEditable;v&&Q==="n"&&(g||(_.preventDefault(),Et.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let n=window.localStorage.getItem("beads-ui.theme"),r=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=n==="dark"||n==="light"?n:r?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let n=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",n),window.localStorage.setItem("beads-ui.theme",n)});let t=document.getElementById("app");t&&kp(t)});export{kp as bootstrap,yp as readBootstrapConfig,wp as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
