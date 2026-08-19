var Dd=Object.create;var eo=Object.defineProperty;var Md=Object.getOwnPropertyDescriptor;var Nd=Object.getOwnPropertyNames;var Fd=Object.getPrototypeOf,qd=Object.prototype.hasOwnProperty;var Bd=(e,t,r)=>t in e?eo(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var to=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var jd=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of Nd(t))!qd.call(e,s)&&s!==r&&eo(e,s,{get:()=>t[s],enumerable:!(n=Md(t,s))||n.enumerable});return e};var Ud=(e,t,r)=>(r=e!=null?Dd(Fd(e)):{},jd(t||!e||!e.__esModule?eo(r,"default",{value:e,enumerable:!0}):r,e));var rt=(e,t,r)=>Bd(e,typeof t!="symbol"?t+"":t,r);var oi=to((Om,si)=>{var Wr=1e3,zr=Wr*60,Hr=zr*60,Lr=Hr*24,Hd=Lr*7,Gd=Lr*365.25;si.exports=function(e,t){t=t||{};var r=typeof e;if(r==="string"&&e.length>0)return Vd(e);if(r==="number"&&isFinite(e))return t.long?Kd(e):Yd(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function Vd(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var r=parseFloat(t[1]),n=(t[2]||"ms").toLowerCase();switch(n){case"years":case"year":case"yrs":case"yr":case"y":return r*Gd;case"weeks":case"week":case"w":return r*Hd;case"days":case"day":case"d":return r*Lr;case"hours":case"hour":case"hrs":case"hr":case"h":return r*Hr;case"minutes":case"minute":case"mins":case"min":case"m":return r*zr;case"seconds":case"second":case"secs":case"sec":case"s":return r*Wr;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r;default:return}}}}function Yd(e){var t=Math.abs(e);return t>=Lr?Math.round(e/Lr)+"d":t>=Hr?Math.round(e/Hr)+"h":t>=zr?Math.round(e/zr)+"m":t>=Wr?Math.round(e/Wr)+"s":e+"ms"}function Kd(e){var t=Math.abs(e);return t>=Lr?Yn(e,t,Lr,"day"):t>=Hr?Yn(e,t,Hr,"hour"):t>=zr?Yn(e,t,zr,"minute"):t>=Wr?Yn(e,t,Wr,"second"):e+" ms"}function Yn(e,t,r,n){var s=t>=r*1.5;return Math.round(e/r)+" "+n+(s?"s":"")}});var ii=to((Pm,ai)=>{function Zd(e){r.debug=r,r.default=r,r.coerce=c,r.disable=a,r.enable=s,r.enabled=l,r.humanize=oi(),r.destroy=u,Object.keys(e).forEach(f=>{r[f]=e[f]}),r.names=[],r.skips=[],r.formatters={};function t(f){let _=0;for(let b=0;b<f.length;b++)_=(_<<5)-_+f.charCodeAt(b),_|=0;return r.colors[Math.abs(_)%r.colors.length]}r.selectColor=t;function r(f){let _,b=null,A,k;function M(...P){if(!M.enabled)return;let S=M,U=Number(new Date),Q=U-(_||U);S.diff=Q,S.prev=_,S.curr=U,_=U,P[0]=r.coerce(P[0]),typeof P[0]!="string"&&P.unshift("%O");let x=0;P[0]=P[0].replace(/%([a-zA-Z%])/g,(C,N)=>{if(C==="%%")return"%";x++;let J=r.formatters[N];if(typeof J=="function"){let fe=P[x];C=J.call(S,fe),P.splice(x,1),x--}return C}),r.formatArgs.call(S,P),(S.log||r.log).apply(S,P)}return M.namespace=f,M.useColors=r.useColors(),M.color=r.selectColor(f),M.extend=n,M.destroy=r.destroy,Object.defineProperty(M,"enabled",{enumerable:!0,configurable:!1,get:()=>b!==null?b:(A!==r.namespaces&&(A=r.namespaces,k=r.enabled(f)),k),set:P=>{b=P}}),typeof r.init=="function"&&r.init(M),M}function n(f,_){let b=r(this.namespace+(typeof _>"u"?":":_)+f);return b.log=this.log,b}function s(f){r.save(f),r.namespaces=f,r.names=[],r.skips=[];let _=(typeof f=="string"?f:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let b of _)b[0]==="-"?r.skips.push(b.slice(1)):r.names.push(b)}function o(f,_){let b=0,A=0,k=-1,M=0;for(;b<f.length;)if(A<_.length&&(_[A]===f[b]||_[A]==="*"))_[A]==="*"?(k=A,M=b,A++):(b++,A++);else if(k!==-1)A=k+1,M++,b=M;else return!1;for(;A<_.length&&_[A]==="*";)A++;return A===_.length}function a(){let f=[...r.names,...r.skips.map(_=>"-"+_)].join(",");return r.enable(""),f}function l(f){for(let _ of r.skips)if(o(f,_))return!1;for(let _ of r.names)if(o(f,_))return!0;return!1}function c(f){return f instanceof Error?f.stack||f.message:f}function u(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return r.enable(r.load()),r}ai.exports=Zd});var li=to((Ct,Kn)=>{Ct.formatArgs=Qd;Ct.save=Jd;Ct.load=eu;Ct.useColors=Xd;Ct.storage=tu();Ct.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();Ct.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function Xd(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function Qd(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+Kn.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let r=0,n=0;e[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(r++,s==="%c"&&(n=r))}),e.splice(n,0,t)}Ct.log=console.debug||console.log||(()=>{});function Jd(e){try{e?Ct.storage.setItem("debug",e):Ct.storage.removeItem("debug")}catch{}}function eu(){let e;try{e=Ct.storage.getItem("debug")||Ct.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function tu(){try{return localStorage}catch{}}Kn.exports=ii()(Ct);var{formatters:ru}=Kn.exports;ru.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var sn=globalThis,Un=sn.trustedTypes,Wa=Un?Un.createPolicy("lit-html",{createHTML:e=>e}):void 0,no="$lit$",ir=`lit$${Math.random().toFixed(9).slice(2)}$`,so="?"+ir,Wd=`<${so}>`,Tr=document,on=()=>Tr.createComment(""),an=e=>e===null||typeof e!="object"&&typeof e!="function",oo=Array.isArray,Ka=e=>oo(e)||typeof e?.[Symbol.iterator]=="function",ro=`[ 	
\f\r]`,nn=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,za=/-->/g,Ha=/>/g,Ar=RegExp(`>|${ro}(?:([^\\s"'>=/]+)(${ro}*=${ro}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ga=/'/g,Va=/"/g,Za=/^(?:script|style|textarea|title)$/i,ao=e=>(t,...r)=>({_$litType$:e,strings:t,values:r}),i=ao(1),br=ao(2),Am=ao(3),Dt=Symbol.for("lit-noChange"),ct=Symbol.for("lit-nothing"),Ya=new WeakMap,Er=Tr.createTreeWalker(Tr,129);function Xa(e,t){if(!oo(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return Wa!==void 0?Wa.createHTML(t):t}var Qa=(e,t)=>{let r=e.length-1,n=[],s,o=t===2?"<svg>":t===3?"<math>":"",a=nn;for(let l=0;l<r;l++){let c=e[l],u,f,_=-1,b=0;for(;b<c.length&&(a.lastIndex=b,f=a.exec(c),f!==null);)b=a.lastIndex,a===nn?f[1]==="!--"?a=za:f[1]!==void 0?a=Ha:f[2]!==void 0?(Za.test(f[2])&&(s=RegExp("</"+f[2],"g")),a=Ar):f[3]!==void 0&&(a=Ar):a===Ar?f[0]===">"?(a=s??nn,_=-1):f[1]===void 0?_=-2:(_=a.lastIndex-f[2].length,u=f[1],a=f[3]===void 0?Ar:f[3]==='"'?Va:Ga):a===Va||a===Ga?a=Ar:a===za||a===Ha?a=nn:(a=Ar,s=void 0);let A=a===Ar&&e[l+1].startsWith("/>")?" ":"";o+=a===nn?c+Wd:_>=0?(n.push(u),c.slice(0,_)+no+c.slice(_)+ir+A):c+ir+(_===-2?l:A)}return[Xa(e,o+(e[r]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),n]},ln=class e{constructor({strings:t,_$litType$:r},n){let s;this.parts=[];let o=0,a=0,l=t.length-1,c=this.parts,[u,f]=Qa(t,r);if(this.el=e.createElement(u,n),Er.currentNode=this.el.content,r===2||r===3){let _=this.el.content.firstChild;_.replaceWith(..._.childNodes)}for(;(s=Er.nextNode())!==null&&c.length<l;){if(s.nodeType===1){if(s.hasAttributes())for(let _ of s.getAttributeNames())if(_.endsWith(no)){let b=f[a++],A=s.getAttribute(_).split(ir),k=/([.?@])?(.*)/.exec(b);c.push({type:1,index:o,name:k[2],strings:A,ctor:k[1]==="."?zn:k[1]==="?"?Hn:k[1]==="@"?Gn:Rr}),s.removeAttribute(_)}else _.startsWith(ir)&&(c.push({type:6,index:o}),s.removeAttribute(_));if(Za.test(s.tagName)){let _=s.textContent.split(ir),b=_.length-1;if(b>0){s.textContent=Un?Un.emptyScript:"";for(let A=0;A<b;A++)s.append(_[A],on()),Er.nextNode(),c.push({type:2,index:++o});s.append(_[b],on())}}}else if(s.nodeType===8)if(s.data===so)c.push({type:2,index:o});else{let _=-1;for(;(_=s.data.indexOf(ir,_+1))!==-1;)c.push({type:7,index:o}),_+=ir.length-1}o++}}static createElement(t,r){let n=Tr.createElement("template");return n.innerHTML=t,n}};function Cr(e,t,r=e,n){if(t===Dt)return t;let s=n!==void 0?r._$Co?.[n]:r._$Cl,o=an(t)?void 0:t._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(e),s._$AT(e,r,n)),n!==void 0?(r._$Co??(r._$Co=[]))[n]=s:r._$Cl=s),s!==void 0&&(t=Cr(e,s._$AS(e,t.values),s,n)),t}var Wn=class{constructor(t,r){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:r},parts:n}=this._$AD,s=(t?.creationScope??Tr).importNode(r,!0);Er.currentNode=s;let o=Er.nextNode(),a=0,l=0,c=n[0];for(;c!==void 0;){if(a===c.index){let u;c.type===2?u=new Ur(o,o.nextSibling,this,t):c.type===1?u=new c.ctor(o,c.name,c.strings,this,t):c.type===6&&(u=new Vn(o,this,t)),this._$AV.push(u),c=n[++l]}a!==c?.index&&(o=Er.nextNode(),a++)}return Er.currentNode=Tr,s}p(t){let r=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(t,n,r),r+=n.strings.length-2):n._$AI(t[r])),r++}},Ur=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,r,n,s){this.type=2,this._$AH=ct,this._$AN=void 0,this._$AA=t,this._$AB=r,this._$AM=n,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,r=this._$AM;return r!==void 0&&t?.nodeType===11&&(t=r.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,r=this){t=Cr(this,t,r),an(t)?t===ct||t==null||t===""?(this._$AH!==ct&&this._$AR(),this._$AH=ct):t!==this._$AH&&t!==Dt&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Ka(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==ct&&an(this._$AH)?this._$AA.nextSibling.data=t:this.T(Tr.createTextNode(t)),this._$AH=t}$(t){let{values:r,_$litType$:n}=t,s=typeof n=="number"?this._$AC(t):(n.el===void 0&&(n.el=ln.createElement(Xa(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===s)this._$AH.p(r);else{let o=new Wn(s,this),a=o.u(this.options);o.p(r),this.T(a),this._$AH=o}}_$AC(t){let r=Ya.get(t.strings);return r===void 0&&Ya.set(t.strings,r=new ln(t)),r}k(t){oo(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,n,s=0;for(let o of t)s===r.length?r.push(n=new e(this.O(on()),this.O(on()),this,this.options)):n=r[s],n._$AI(o),s++;s<r.length&&(this._$AR(n&&n._$AB.nextSibling,s),r.length=s)}_$AR(t=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);t!==this._$AB;){let n=t.nextSibling;t.remove(),t=n}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},Rr=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,r,n,s,o){this.type=1,this._$AH=ct,this._$AN=void 0,this.element=t,this.name=r,this._$AM=s,this.options=o,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=ct}_$AI(t,r=this,n,s){let o=this.strings,a=!1;if(o===void 0)t=Cr(this,t,r,0),a=!an(t)||t!==this._$AH&&t!==Dt,a&&(this._$AH=t);else{let l=t,c,u;for(t=o[0],c=0;c<o.length-1;c++)u=Cr(this,l[n+c],r,c),u===Dt&&(u=this._$AH[c]),a||(a=!an(u)||u!==this._$AH[c]),u===ct?t=ct:t!==ct&&(t+=(u??"")+o[c+1]),this._$AH[c]=u}a&&!s&&this.j(t)}j(t){t===ct?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},zn=class extends Rr{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===ct?void 0:t}},Hn=class extends Rr{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==ct)}},Gn=class extends Rr{constructor(t,r,n,s,o){super(t,r,n,s,o),this.type=5}_$AI(t,r=this){if((t=Cr(this,t,r,0)??ct)===Dt)return;let n=this._$AH,s=t===ct&&n!==ct||t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive,o=t!==ct&&(n===ct||s);s&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Vn=class{constructor(t,r,n){this.element=t,this.type=6,this._$AN=void 0,this._$AM=r,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(t){Cr(this,t)}},Ja={M:no,P:ir,A:so,C:1,L:Qa,R:Wn,D:Ka,V:Cr,I:Ur,H:Rr,N:Hn,U:Gn,B:zn,F:Vn},zd=sn.litHtmlPolyfillSupport;zd?.(ln,Ur),(sn.litHtmlVersions??(sn.litHtmlVersions=[])).push("3.3.1");var je=(e,t,r)=>{let n=r?.renderBefore??t,s=n._$litPart$;if(s===void 0){let o=r?.renderBefore??null;n._$litPart$=s=new Ur(t.insertBefore(on(),o),o,void 0,r??{})}return s._$AI(e),s};var It="today",rr=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}];function Mt(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function Ir(e,t=Date.now()){switch(e){case"today":{let r=new Date(t);return r.setHours(0,0,0,0),r.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function ei(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function ti(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function ri(){let e=null,t=[],r=new Set;function n(){for(let s of Array.from(r))try{s()}catch{}}return{get(){return e},getWorkspacesState(){return t},set(s,o){e=Array.isArray(s)?s:null,t=Array.isArray(o)?o:[],n()},clear(){e=null,t=[],n()},subscribe(s){return r.add(s),()=>r.delete(s)}}}function ni(){let e=new Map,t=new Set;function r(s){return s.startsWith("session-log:")?s:`session-log:${s}`}function n(){for(let s of Array.from(t))try{s()}catch{}}return{set(s,o,a=null){e.set(r(s),{lines:Array.isArray(o)?[...o]:[],last_event_at:typeof a=="number"?a:null}),n()},append(s,o){let a=r(s),l=e.get(a)||{lines:[],last_event_at:null};l.lines=[...l.lines,o],l.last_event_at=Date.now(),e.set(a,l),n()},get(s){return e.get(r(s))||null},clear(s){typeof s=="string"?e.delete(r(s)):e.clear(),n()},subscribe(s){return t.add(s),()=>t.delete(s)}}}var ci=Ud(li(),1);function it(e){return(0,ci.default)(`beads-ui:${e}`)}function Ht(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function Or(e,t){let r=Ht(e.created_at),n=Ht(t.created_at);if(r!==n)return r<n?1:-1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,l=t.id;return a<l?-1:a>l?1:0}function pi(e,t){let r=Ht(e.created_at),n=Ht(t.created_at);if(r!==n)return r<n?-1:1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,l=t.id;return a<l?-1:a>l?1:0}function fi(e,t){let r=Ht(e.updated_at),n=Ht(t.updated_at);if(r!==n)return r<n?1:-1;let s=e.id,o=t.id;return s<o?-1:s>o?1:0}function _i(e,t){let r=e.priority??2,n=t.priority??2;if(r!==n)return r-n;let s=Ht(e.created_at),o=Ht(t.created_at);if(s!==o)return s<o?1:-1;let a=e.id,l=t.id;return a<l?-1:a>l?1:0}function mi(e,t){let r=e.closed_at??0,n=t.closed_at??0;if(r!==n)return r<n?1:-1;let s=e?.id,o=t?.id;return s<o?-1:s>o?1:0}var nu=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function di(e){let t=e&&e.metadata,r=t?t.task_order:void 0;if(r==null||r==="")return Number.POSITIVE_INFINITY;let n=Number(r);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function ui(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let r=nu.exec(t);if(!r)return Number.POSITIVE_INFINITY;let n=Number(r[1]);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function gi(e,t){let r=di(e),n=di(t);if(r!==n)return r<n?-1:1;let s=ui(e),o=ui(t);if(s!==o)return s<o?-1:1;let a=Ht(e&&e.created_at),l=Ht(t&&t.created_at);if(a!==l)return a<l?-1:1;let c=e&&e.id,u=t&&t.id;return c===u?0:String(c)<String(u)?-1:1}var io=2**20;function Gr(e,t){let r=e&&e.id;return t&&typeof r=="string"&&Object.prototype.hasOwnProperty.call(t,r)&&typeof t[r]=="number"&&Number.isFinite(t[r])?t[r]:-Ht(e&&e.created_at)}function Zn(e){return(t,r)=>{let n=Gr(t,e),s=Gr(r,e);if(n!==s)return n<s?-1:1;let o=t?.id,a=r?.id;return o<a?-1:o>a?1:0}}function lo(e,t,r){let n=Array.isArray(e)?e:[],s=n.length,o=Math.max(0,Math.min(t,s-1)),a=o-1>=0?n[o-1]:null,l=o+1<s?n[o+1]:null;if(!a&&!l)return{rank:0};if(!a)return{rank:Gr(l,r)-io};if(!l)return{rank:Gr(a,r)+io};let c=Gr(a,r),u=Gr(l,r),f=(c+u)/2;return c<f&&f<u?{rank:f}:{renormalize:n.map((_,b)=>({bead_id:_.id,rank:b*io}))}}function co(e,t={}){let r=it(`issue-store:${e}`),n=new Map,s=[],o=0,a=new Set,l=!1,c=t.sort||Or;function u(){for(let b of Array.from(a))try{b()}catch{}}function f(){s=Array.from(n.values()).sort(c)}function _(b){if(l||!b||b.id!==e)return;let A=Number(b.revision)||0;if(r("apply %s rev=%d",b.type,A),!(A<=o&&b.type!=="snapshot")){if(b.type==="snapshot"){if(A<=o)return;n.clear();let k=Array.isArray(b.issues)?b.issues:[];for(let M of k)M&&typeof M.id=="string"&&M.id.length>0&&n.set(M.id,M);f(),o=A,u();return}if(b.type==="upsert"){let k=b.issue;if(k&&typeof k.id=="string"&&k.id.length>0){let M=n.get(k.id);if(!M)n.set(k.id,k);else{let P=Number.isFinite(M.updated_at)?M.updated_at:0,S=Number.isFinite(k.updated_at)?k.updated_at:0;if(P<=S){for(let U of Object.keys(M))U in k||delete M[U];for(let[U,Q]of Object.entries(k))M[U]=Q}}f()}o=A,u()}else if(b.type==="delete"){let k=String(b.issue_id||"");k&&(n.delete(k),f()),o=A,u()}}}return{id:e,subscribe(b){return a.add(b),()=>{a.delete(b)}},applyPush:_,snapshot(){return s},size(){return n.size},getById(b){return n.get(b)},dispose(){l=!0,n.clear(),s=[],a.clear(),o=0}}}function Xn(e){let t=String(e.type||"").trim(),r={};if(e.params&&typeof e.params=="object"){let s=Object.keys(e.params).sort();for(let o of s){let a=e.params[o];r[o]=String(a)}}let n=new URLSearchParams(r).toString();return n.length>0?`${t}?${n}`:t}function bi(e){let t=it("subs"),r=new Map,n=new Map;function s(l,c){t("applyDelta %s +%d ~%d -%d",l,(c.added||[]).length,(c.updated||[]).length,(c.removed||[]).length);let u=n.get(l);if(!u||u.size===0)return;let f=Array.isArray(c.added)?c.added:[],_=Array.isArray(c.updated)?c.updated:[],b=Array.isArray(c.removed)?c.removed:[];for(let A of Array.from(u)){let k=r.get(A);if(!k)continue;let M=k.itemsById;for(let P of f)typeof P=="string"&&P.length>0&&M.set(P,!0);for(let P of _)typeof P=="string"&&P.length>0&&M.set(P,!0);for(let P of b)typeof P=="string"&&P.length>0&&M.delete(P)}}async function o(l,c){let u=Xn(c);if(t("subscribe %s key=%s",l,u),!r.has(l))r.set(l,{key:u,itemsById:new Map});else{let _=r.get(l);if(_&&_.key!==u){let b=n.get(_.key);b&&(b.delete(l),b.size===0&&n.delete(_.key)),r.set(l,{key:u,itemsById:new Map})}}n.has(u)||n.set(u,new Set);let f=n.get(u);f&&f.add(l);try{await e("subscribe-list",{id:l,type:c.type,params:c.params})}catch(_){let b=r.get(l)||null;if(b){let A=n.get(b.key);A&&(A.delete(l),A.size===0&&n.delete(b.key))}throw r.delete(l),_}return async()=>{t("unsubscribe %s key=%s",l,u);try{await e("unsubscribe-list",{id:l})}catch{}let _=r.get(l)||null;if(_){let b=n.get(_.key);b&&(b.delete(l),b.size===0&&n.delete(_.key))}r.delete(l)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:Xn,selectors:{getIds(l){let c=r.get(l);return c?Array.from(c.itemsById.keys()):[]},has(l,c){let u=r.get(l);return u?u.itemsById.has(c):!1},count(l){let c=r.get(l);return c?c.itemsById.size:0},getItemsById(l){let c=r.get(l),u={};if(!c)return u;for(let f of c.itemsById.keys())u[f]=!0;return u}}}}function hi(){let e=it("issue-stores"),t=new Map,r=new Map,n=new Set,s=new Map;function o(){for(let c of Array.from(n))try{c()}catch{}}function a(c,u,f){let _=u?Xn(u):"",b=r.get(c)||"",A=t.has(c);if(e("register %s key=%s (prev=%s)",c,_,b),A&&b&&_&&b!==_){let k=t.get(c);if(k)try{k.dispose()}catch{}let M=s.get(c);if(M){try{M()}catch{}s.delete(c)}let P=co(c,f);t.set(c,P);let S=P.subscribe(()=>o());s.set(c,S)}else if(!A){let k=co(c,f);t.set(c,k);let M=k.subscribe(()=>o());s.set(c,M)}return r.set(c,_),()=>l(c)}function l(c){e("unregister %s",c),r.delete(c);let u=t.get(c);u&&(u.dispose(),t.delete(c));let f=s.get(c);if(f){try{f()}catch{}s.delete(c)}}return{register:a,unregister:l,getStore(c){return t.get(c)||null},snapshotFor(c){let u=t.get(c);return u?u.snapshot().slice():[]},subscribe(c){return n.add(c),()=>n.delete(c)}}}function yi(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function vi(){let e=null,t=!1,r=new Set;function n(){for(let s of Array.from(r))try{s()}catch{}}return{get(){return e},set(s){e=s,n()},isPending(){return t},setPending(s){let o=s===!0;o!==t&&(t=o,n())},clear(){e=null,t=!1,n()},subscribe(s){return r.add(s),()=>r.delete(s)}}}function wi(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function uo(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function su(e){let t=String(e||""),r=t.startsWith("#")?t.slice(1):t,n=r.indexOf("?"),s=n>=0?r.slice(n+1):"";if(s){let l=new URLSearchParams(s).get("issue");if(l)return decodeURIComponent(l)}let o=/^\/issue\/([^\s?#]+)/.exec(r);return o&&o[1]?decodeURIComponent(o[1]):null}function ou(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function ki(e){let t=it("router"),r=()=>{let n=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(n),o=s&&s[1]?decodeURIComponent(s[1]):su(n),a=ou(n);if(t("hash change \u2192 view=%s id=%s",a,o),e.setState({selected_id:a==="worker"?null:o,view:a,worker:{selected_parent_id:a==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(n)){let c=o?`#/${a}?issue=${encodeURIComponent(o)}`:`#/${a}`;window.location.hash!==c&&(window.location.hash=c)}};return{start(){window.addEventListener("hashchange",r),r()},stop(){window.removeEventListener("hashchange",r)},gotoIssue(n){let s=e.getState?e.getState():{view:"board"},o=s.view==="worker"||s.view==="monitor"?s.view:"board",a=uo(o,n);t("goto issue %s (view=%s)",n,o),window.location.hash!==a?window.location.hash=a:e.setState({selected_id:o==="worker"?null:n,view:o,worker:{selected_parent_id:o==="worker"?n:null}})},gotoView(n){let s=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},o=n==="worker"?s.worker?.selected_parent_id:s.selected_id,a=o?uo(n,o):`#/${n}`;t("goto view %s (id=%s)",n,o||""),window.location.hash!==a?window.location.hash=a:e.setState({view:n,selected_id:n==="worker"?null:s.selected_id})}}}var au=Object.freeze({workspace_config:{default_workspace:null}});function $i(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:au.workspace_config.default_workspace}}}function xi(e={}){let t=it("state"),r={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:$i(e.config)},n=new Set;function s(){for(let o of Array.from(n))try{o(r)}catch{}}return{getState(){return r},setState(o){let a={...r,...o,filters:{...r.filters,...o.filters||{}},board:{...r.board,...o.board||{}},worker:{...r.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:r.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:r.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:r.workspace.hidden},config:o.config!==void 0?$i(o.config):r.config},l=a.workspace.current?.path!==r.workspace.current?.path||a.workspace.available.length!==r.workspace.available.length||a.workspace.hidden.length!==r.workspace.hidden.length||a.workspace.hidden.some((u,f)=>u!==r.workspace.hidden[f]),c=a.config.workspace_config.default_workspace!==r.config.workspace_config.default_workspace;a.selected_id===r.selected_id&&a.view===r.view&&a.filters.status===r.filters.status&&a.filters.search===r.filters.search&&a.filters.type===r.filters.type&&a.board.closed_filter===r.board.closed_filter&&a.worker.selected_parent_id===r.worker.selected_parent_id&&a.worker.show_closed_children.length===r.worker.show_closed_children.length&&a.worker.show_closed_children.every((u,f)=>u===r.worker.show_closed_children[f])&&!l&&!c||(r=a,t("state change %o",{selected_id:r.selected_id,view:r.view,filters:r.filters,board:r.board,worker:r.worker,workspace:r.workspace.current?.path,config:{default_workspace:r.config.workspace_config.default_workspace}}),s())},subscribe(o){return n.add(o),()=>n.delete(o)}}}function Si(e){let t=it("activity"),r=0,n=new Map,s=1;function o(){if(!e)return;let u=r>0;e.toggleAttribute("hidden",!u),e.setAttribute("aria-busy",u?"true":"false")}function a(){r+=1,t("start count=%d",r),o()}function l(){let u=r;r=Math.max(0,r-1),u<=0?t("done called but count was already %d",u):t("done count=%d\u2192%d",u,r),o()}function c(u){return async(_,b)=>{let A=s++,k=Date.now();n.set(A,{type:_,start_ts:k}),t("request start id=%d type=%s count=%d",A,_,r+1),a();let M=!1,P=()=>{M||(M=!0,n.delete(A),l())},S=setTimeout(()=>{M||(t("request TIMEOUT id=%d type=%s elapsed=%dms",A,_,Date.now()-k),P())},3e4);try{let U=await u(_,b),Q=Date.now()-k;return t("request done id=%d type=%s elapsed=%dms",A,_,Q),U}catch(U){let Q=Date.now()-k;throw t("request error id=%d type=%s elapsed=%dms err=%o",A,_,Q,U),U}finally{clearTimeout(S),P()}}}return o(),{wrapSend:c,start:a,done:l,getCount:()=>r,getActiveRequests:()=>{let u=Date.now();return Array.from(n.entries()).map(([f,_])=>({id:f,type:_.type,elapsed_ms:u-_.start_ts}))}}}function de(e,t="info",r=2800){let n=document.createElement("div");n.className="toast",n.textContent=e,n.style.position="fixed",n.style.right="12px",n.style.bottom="12px",n.style.zIndex="1000",n.style.color="#fff",n.style.padding="8px 10px",n.style.borderRadius="4px",n.style.fontSize="12px",t==="success"?n.style.background="#156d36":t==="warning"?n.style.background="#a36a00":t==="error"?n.style.background="#9f2011":n.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(n),setTimeout(()=>{try{n.remove()}catch{}},r)}function Qn(e=void 0,t=void 0){function r(){if(!t||typeof t.get!="function")return null;let o=t.get();return o&&o.order?o.order:{}}function n(o,a,l){let c=e&&e.snapshotFor?e.snapshotFor(o).slice():[];if(a==="closed")return c.sort(mi),c;switch(l){case"created_desc":return c.sort(Or),c;case"created_asc":return c.sort(pi),c;case"updated_desc":return c.sort(fi),c;case"priority":return c.sort(_i),c;case"manual":default:{let u=r();return u?c.sort(Zn(u)):c.sort(Or),c}}}function s(o){let a=[];return e&&typeof e.subscribe=="function"&&a.push(e.subscribe(o)),t&&typeof t.subscribe=="function"&&a.push(t.subscribe(o)),()=>{for(let l of a)try{l()}catch{}}}return{selectBoardColumn:n,subscribe:s}}function Pr(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function _t(e){let t=Pr(e);if(t===null)return"";let r=new Date(t),n=s=>String(s).padStart(2,"0");return`${r.getFullYear()}-${n(r.getMonth()+1)}-${n(r.getDate())} ${n(r.getHours())}:${n(r.getMinutes())}`}function Lt(e,t){let r=Pr(e);if(r===null)return"";let s=(typeof t=="number"?t:Date.now())-r;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let a=Math.floor(s/36e5);if(a<24)return`${a}\uC2DC\uAC04 \uC804`;let l=Math.floor(s/864e5);if(l<7)return`${l}\uC77C \uC804`;let c=Math.floor(l/7);if(l<30)return`${c}\uC8FC \uC804`;let u=Math.floor(l/30);return u<12?`${u}\uAC1C\uC6D4 \uC804`:`${Math.floor(l/365)}\uB144 \uC804`}function Jn(e){if(!Array.isArray(e))return null;let t=null,r=-1;for(let n of e){if(!n||n.status!=="in_progress")continue;let s=Pr(n.updated_at)??0;if(t===null||s>r){t=n,r=s;continue}s===r&&String(n.id)<String(t.id)&&(t=n)}return t}function es(e){let t=e.transport,r=e.uiOrderStore;function n(a,l){return"renormalize"in a?a.renormalize:[{bead_id:l,rank:a.rank}]}function s(a,l){let c={...a.order};for(let u of l)c[u.bead_id]=u.rank;r&&r.set({revision:a.revision,order:c})}async function o(a,l,c){if(!t||!r)return;let u=r.get()||{revision:0,order:{}},f=n(lo(l,c,u.order),a);s(u,f);let _=await t("ui-order-set",{expected_revision:u.revision,entries:f});if(_&&_.conflict){let b={revision:typeof _.revision=="number"?_.revision:0,order:_.order||{}};r.set(b);let A=n(lo(l,c,b.order),a);s(b,A);let k=await t("ui-order-set",{expected_revision:b.revision,entries:A});k&&k.applied&&r.set({revision:typeof k.revision=="number"?k.revision:0,order:k.order||{}})}else _&&_.applied&&r.set({revision:typeof _.revision=="number"?_.revision:0,order:_.order||{}})}return{applyReorder:o}}function ts(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function po(e,t){return!t||typeof e!="string"||e.length===0||ts(t.visible_labels).includes(e)?!0:ts(t.hidden_labels).includes(e)?!1:!ts(t.hidden_prefixes).some(r=>r.length>0&&e.startsWith(r))}function rs(e,t){return ts(e).filter(r=>po(r,t))}function hr(e,t){let r=e&&e.chips?e.chips[t]:void 0;return typeof r=="boolean"?r:!0}var iu={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},Ei={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},Ai={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},lu={review:"\u2713",skip:"\u2298"},yr={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function cu(e,t,r){if(!(r==="in_progress"||r==="resolved"))return null;for(let s of e){let o=t[s];if(o&&o.fill==="dim"&&o.stale!==!0)return s}return null}function Ti(e){let t=e&&e.fill||"none";return t==="none"?yr.none:e&&e.stale===!0?yr.stale:t==="dim"?yr.dim:e&&e.glyph==="review"?yr.review:e&&e.glyph==="skip"?yr.skip:yr.done}function du(e){if(!e||e.fill==="none"||!e.approval_state)return Ti(e);let t=[];return e.glyph==="review"?t.push(yr.review):e.glyph==="skip"&&t.push(yr.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function uu(e,t,r){let n=iu[e]||e,s=t&&t.fill||"none",o=!!t&&t.stale===!0,a=lu[t&&t.glyph||""]||"",l="bar";s==="dim"?l+=` b-${n} dim`:s==="full"&&(l+=` b-${n} full`),o&&(l+=" stale"),r&&(l+=" cur");let c=s==="none"?"lbl":`lbl l-${n} on`,u=r?`color: var(--stage-${n}-on)`:"";return i`
    <div class="seg">
      <div class=${l} style=${u}>${a}</div>
      <div class=${c}>
        ${Ei[e]||e}
      </div>
    </div>
  `}function ns(e,t){if(!e||!e.stages)return"";let r=Ai[e.route]||Ai.spec_backed,n=e.stages,s=cu(r,n,String(t||"open")),o=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${r.map(a=>`${Ei[a]||a} ${a==="plan"?du(n[a]||{}):Ti(n[a]||{})}`).join(" \xB7 ")}`;return i`
    <div class="stp" role="img" aria-label=${o}>
      ${r.map(a=>uu(a,n[a]||{},a===s))}
    </div>
  `}function pu(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var Ci=2;function fu(e){if(!e)return[];let t=[];if(e.external){let n=e.reason?`\u23F8 blocked: ${e.reason}`:"\u23F8 blocked";t.push(i`<span class="ctl-chip ctl-chip--blocked">${n}</span>`)}let r=Array.isArray(e.blockers)?e.blockers:[];if(r.length>0){let n=r.slice(0,Ci).join(", "),s=r.length-Ci,o=`\u26D3 blocked: ${n}${s>0?` +${s}`:""}`;t.push(i`<span class="ctl-chip ctl-chip--blocked-dep">${o}</span>`)}return t}function fo(e){return e==="delegated"?"\uC704\uC784":e==="main"?"\uBA54\uC778":null}function ss(e,t){if(!e)return null;let r=fo(e.kind),n=e.reason,s=e.kind==="delegated"?n===null:typeof n=="string"&&n.trim().length>0&&!/[\r\n]/.test(n);if(!r||!s)return null;let o=fo(t?.kind),a=o!==null&&t?.kind!==e.kind,l=`\uACC4\uD68D \xB7 ${r}${a?` \u2192 ${o}`:""}`,c=`planned_execution ${e.kind}${typeof n=="string"?`:${n}`:""}`,u=t?` \xB7 exec_receipt ${t.kind}:${t.actor}@${t.sha}`:"";return{kind:e.kind,label:l,title:`${c}${u}`}}function Ri(e,t){let r=ss(e,t);return r?i`<span
        class="ctl-chip ctl-chip--planned"
        data-kind=${r.kind}
        title=${r.title}
        >${r.label}</span
      >`:null}function _u(e){if(!e)return null;let t=fo(e.kind);return t?i`<span
    class="ctl-chip ctl-chip--exec-receipt"
    title=${`exec_receipt ${e.kind}:${e.actor}@${e.sha}`}
    >${`\uC2E4\uD589 \xB7 ${t}`}</span
  >`:null}function mu(e,t){let r=t.policy||null,n=e.workflow&&e.workflow.chips||{},s=[];if(n.route&&hr(r,"route")){let l=n.route_source==="derived";s.push(i`<span
        class="ctl-chip ctl-chip--route${l?" is-derived":""}"
        title=${l?"route \uBBF8\uD540 (metadata unset)":"route"}
        >${l?"unset":n.route}</span
      >`)}if(n.fast_track&&hr(r,"fast_track")&&s.push(i`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),n.pr&&hr(r,"pr")){let l=n.pr.number;s.push(i`<span class="ctl-chip ctl-chip--pr"
        >${`PR${l!=null?` #${l}`:""}`}</span
      >`)}let o=Ri(n.planned_execution,n.exec_receipt);if(o&&s.push(o),n.exec_receipt){let l=n.exec_receipt;s.push(i`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${l.kind}:${l.actor}@${l.sha}`}
        >${`exec ${l.kind==="delegated"?l.actor:`main:${l.actor}`} \xB7 ${l.sha.slice(0,7)}`}</span
      >`)}if(n.impl_entry){let l=n.impl_entry;s.push(i`<span
        class="ctl-chip ctl-chip--impl-entry"
        title=${`impl_entry ${l.actor}@${l.sha}`}
        >${`impl ${l.actor} \xB7 ${l.sha.slice(0,7)}`}</span
      >`)}for(let l of rs(e.labels,r))s.push(i`<span class="ctl-chip ctl-chip--label">${l}</span>`);return e.from_id&&hr(r,"from")&&s.push(i`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${l=>{l.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(l,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),hr(r,"blocked")&&s.push(...fu(e.blocked_info)),t.cleanupFailureFor&&t.cleanupFailureFor(e.id)&&hr(r,"blocked")&&s.push(i`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 멈춤</span>`),s.length===0?"":i`<div class="board-card__chips">${s}</div>`}function gu(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function bu(e){let t=Lt(e.created_at),r=Lt(e.updated_at);return!t&&!r?"":i`<span class="board-card__times">
    ${t?i`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${_t(e.created_at)}`}
          >생성 ${t}</span
        >`:""}
    ${t&&r?i`<span class="board-card__time-sep">·</span>`:""}
    ${r?i`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${_t(e.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </span>`}function hu(e,t){let r=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]},n=r.total||0,s=t.isExpanded?t.isExpanded(e.id):!0,o=n>0?r.children.slice().sort(gi):r.children;return i`
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
        ${bu(e)}
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
                  <span class=${gu(a.status)}>●</span>
                  <span class="board-card__roll-child-ord">${l+1}</span>
                  <span class="board-card__roll-child-title"
                    >${a.title||a.id}</span
                  >
                  ${ss(a.workflow?.chips?.planned_execution,a.workflow?.chips?.exec_receipt)?i`<span class="board-card__roll-child-chips">
                        ${Ri(a.workflow?.chips?.planned_execution,a.workflow?.chips?.exec_receipt)}
                        ${_u(a.workflow?.chips?.exec_receipt)}
                      </span>`:""}
                </button>`)}
          </div>`:""}
    </div>
  `}function os(e,t){let r=pu(e.priority);return i`
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
      ${mu(e,t)}
      ${e.workflow&&hr(t.policy||null,"stepper")?ns(e.workflow,e.status):""}
      ${hu(e,t)}
    </article>
  `}function Vr(e,t){let r=Array.isArray(e.items)?e.items.length:0,n=e.is_closed===!0;return i`
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
              ${rr.map(o=>i`<option
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
        ${e.items.map(o=>os(o,t))}
      </div>
    </section>
  `}function Ii(e,t,r){return i`
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
          ${e.items.length===0?i`<div class="deferred-popup__empty">Deferred 이슈 없음</div>`:e.items.map(n=>os(n,t))}
        </div>
      </div>
    </dialog>
  `}var yu=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],vu=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],wu=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function ku(e,t,r){let n=e.labels.length,s=n>0?`\uB77C\uBCA8 ${n}`:"\uB77C\uBCA8";return i`
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
  `}function Li(e,t,r){return i`
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
        ${yu.map(n=>i`<option
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
        ${vu.map(n=>i`<option
              value=${n.value}
              ?selected=${e.type===n.value}
            >
              ${n.label}
            </option>`)}
      </select>
      ${ku(e,t,r)}
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
        ${wu.map(n=>i`<option
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
  `}var $u=200,xu={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},Su=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),Oi="beads-ui.board.sort",Pi=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function Au(){try{let e=window.localStorage.getItem(Oi);if(e&&Pi.has(e))return e}catch{}return"created_desc"}function Di(e,t){let r=it("views:board"),n=t.gotoIssue,s=t.issueStores,o=t.transport,a=t.uiOrderStore,l=t.displayPolicyStore,c=t.workerQueueStore,u=t.onClosedRangeChange,f=t.onNewIssue,_=t.closedRange||It,b=s?Qn(s,a):null,A=es({transport:o,uiOrderStore:a}),k=[],M=[],P=[],S=[],U=[],Q=[],x=!1,w=0,C=Au(),N=new Map,J=new Map,fe=new Map,ce=new Set,ie={search:"",priority:"",type:"",labels:[]},le=!1,Fe=null;function Ue(z){return String(z.status||"open")==="open"}function ze(z){let X=String(z.status||"open");return X==="open"||X==="blocked"}function Ye(z){let X=ie.search.trim().toLowerCase(),ve=ie.priority,we=ie.type,oe=ie.labels;return z.filter(De=>{if(X){let tt=String(De.id||"").toLowerCase(),Ke=String(De.title||"").toLowerCase();if(!tt.includes(X)&&!Ke.includes(X))return!1}if(ve!==""&&String(De.priority)!==ve||we!==""&&String(De.issue_type||"")!==we)return!1;if(oe.length>0){let tt=Array.isArray(De.labels)?De.labels:[];if(!oe.some(Ke=>tt.includes(Ke)))return!1}return!0})}function He(){let z=new Set;for(let X of[k,M,P,S,U,Q])for(let ve of X){let we=Array.isArray(ve.labels)?ve.labels:[];for(let oe of we)typeof oe=="string"&&oe.length>0&&z.add(oe)}return Array.from(z).sort()}function Ge(){return ie.search.trim()!==""||ie.priority!==""||ie.type!==""||ie.labels.length>0}function ge(){try{if(b){let z=b.selectBoardColumn("tab:board:in-progress","in_progress",C),X=b.selectBoardColumn("tab:board:blocked","blocked",C).filter(ze),ve=new Set(z.map(Ee=>Ee.id)),we=b.selectBoardColumn("tab:board:ready","ready",C).filter(Ee=>Ue(Ee)&&!ve.has(Ee.id)),oe=b.selectBoardColumn("tab:board:resolved","resolved",C),De=b.selectBoardColumn("tab:board:deferred","deferred",C),tt=b.selectBoardColumn("tab:board:closed","closed").slice(0,$u),Ke=[...X,...we,...z,...oe,...tt];xe(Ke);let Pe=new Set;for(let Ee of Ke)Ee&&Ee.id&&!_o(Ee)&&Pe.add(Ee.id);let Xe=!Ge();k=Xe?cn(X,Pe):X,M=Xe?cn(we,Pe):we,P=Xe?cn(z,Pe):z,S=Xe?cn(oe,Pe):oe,U=De,w=De.length,Q=Xe?cn(tt,Pe):tt,N=new Map;for(let Ee of k)N.set(Ee.id,"open");for(let Ee of M)N.set(Ee.id,"open");for(let Ee of P)N.set(Ee.id,"in_progress");for(let Ee of S)N.set(Ee.id,"resolved");for(let Ee of U)N.set(Ee.id,"deferred");for(let Ee of Q)N.set(Ee.id,"closed");J=new Map;for(let Ee of k)J.set(Ee.id,"blocked-col");for(let Ee of M)J.set(Ee.id,"ready-col");for(let Ee of P)J.set(Ee.id,"in-progress-col");for(let Ee of S)J.set(Ee.id,"resolved-col");for(let Ee of Q)J.set(Ee.id,"closed-col")}Ie()}catch{k=[],M=[],P=[],S=[],U=[],Q=[],fe=new Map,Ie()}}function xe(z){let X=new Map;for(let we of z)we&&we.id&&!X.has(we.id)&&X.set(we.id,we);let ve=new Map;for(let we of X.values()){let oe=_o(we);if(!oe)continue;let De=ve.get(oe);De||(De=[],ve.set(oe,De)),De.push({id:we.id,title:we.title,status:we.status,metadata:we.metadata,workflow:we.workflow,created_at:we.created_at,updated_at:we.updated_at})}fe=ve}function ke(z){let X=fe.get(z)||[],ve=0;for(let oe of X)(oe.status==="resolved"||oe.status==="closed")&&(ve+=1);let we=Jn(X);return{total:X.length,count:ve,current:we,children:X}}function Ae(z){return!ce.has(z)}function _e(z,X){z.preventDefault(),z.stopPropagation(),ce.has(X)?ce.delete(X):ce.add(X),Ie()}function ne(z,X){z.preventDefault(),z.stopPropagation(),n(X)}function G(z,X){z.preventDefault(),z.stopPropagation(),n(X)}function $e(z,X){Fe||n(X)}function be(z,X){z.preventDefault(),z.stopPropagation(),Eu(X).then(ve=>{ve&&de("\uBCF5\uC0AC\uB428","success",1200)})}function ee(z,X){Fe=X,z.dataTransfer&&(z.dataTransfer.setData("text/plain",X),z.dataTransfer.effectAllowed="move"),z.target.classList.add("board-card--dragging")}function W(z){z.target.classList.remove("board-card--dragging"),ht(),setTimeout(()=>{Fe=null},0)}function j(z){let X=String(z.target.value||"");!X||X===_||(_=X,u&&u(X),Ie())}function E(){return l?l.get():null}function H(z){let X=c?c.get():null,ve=X?X.cleanup_failed:null;if(!ve||typeof ve!="object"||Array.isArray(ve))return null;let we=ve[z];return!we||typeof we!="object"||Array.isArray(we)?null:we}let R={onCardClick:$e,onCopyId:be,onDragStart:ee,onDragEnd:W,onClosedRangeChange:j,rollupFor:ke,isExpanded:Ae,onRollupToggle:_e,onChildClick:ne,onFromChipClick:G,cleanupFailureFor:H,get policy(){return E()}};function Y(z,X){Fe||($(),n(X))}function K(z,X){z.preventDefault(),z.stopPropagation(),$(),n(X)}let ue={...R,onCardClick:Y,onChildClick:K,onFromChipClick:K,get policy(){return E()}};function pe(z){let X=z.target,ve=e.querySelector(".board-filter__labels");X&&ve&&ve.contains(X)||F()}function ye(z){z.key==="Escape"&&F()}function T(){le||(le=!0,document.addEventListener("mousedown",pe),document.addEventListener("keydown",ye),Ie())}function F(){le&&(le=!1,document.removeEventListener("mousedown",pe),document.removeEventListener("keydown",ye),Ie())}function te(z){z.key==="Escape"&&$()}function Z(){x||(x=!0,document.addEventListener("keydown",te),Ie())}function $(){x&&(x=!1,document.removeEventListener("keydown",te),Ie())}let D={onClose:$,onOverlayClick(z){z.target===z.currentTarget&&$()}},V={onSearchInput(z){ie.search=String(z.target.value||""),ge()},onPriorityChange(z){ie.priority=String(z.target.value||""),ge()},onTypeChange(z){ie.type=String(z.target.value||""),ge()},onSortChange(z){let X=String(z.target.value||"");if(!(!Pi.has(X)||X===C)){C=X;try{window.localStorage.setItem(Oi,X)}catch{}ge()}},onDeferredToggle(){x?$():Z()},onLabelMenuToggle(){le?F():T()},onLabelToggle(z){let X=ie.labels.indexOf(z);X===-1?ie.labels.push(z):ie.labels.splice(X,1),ge()},onLabelClear(){ie.labels.length!==0&&(ie.labels=[],ge())},onNewIssue(){f&&f()}};function Le(){return i`
      <div class="board-view">
        ${Li(ie,V,{sort_mode:C,deferred_popup_open:x,deferred_count:w,label_options:He(),label_menu_open:le})}
        <div class="board-root">
          ${Vr({title:"Blocked",id:"blocked-col",items:Ye(k)},R)}
          ${Vr({title:"Ready",id:"ready-col",items:Ye(M)},R)}
          ${Vr({title:"In progress",id:"in-progress-col",items:Ye(P)},R)}
          ${Vr({title:"Resolved",id:"resolved-col",items:Ye(S)},R)}
          ${Vr({title:"Closed",id:"closed-col",items:Ye(Q),is_closed:!0,closed_range:_},R)}
        </div>
        ${x?Ii({items:Ye(U),count:w},ue,D):""}
      </div>
    `}function Ie(){je(Le(),e),Ne()}function Ne(){try{let z=e.querySelector("#deferred-popup");z&&!z.open&&(typeof z.showModal=="function"?z.showModal():z.setAttribute("open",""));let X=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let ve of X)Array.from(ve.querySelectorAll(".board-card")).forEach((oe,De)=>{oe.tabIndex=De===0?0:-1})}catch{}}async function Re(z,X){if(!o){de("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:z,status:X}),de("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(ve){r("update-status failed: %o",ve),de("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function et(z){switch(z){case"blocked-col":return k;case"ready-col":return M;case"in-progress-col":return P;case"resolved-col":return S;default:return[]}}function bt(z,X,ve){if(!o||!a)return;let we=et(z),oe=we.find(Xe=>Xe.id===X);if(!oe)return;let De=we.filter(Xe=>Xe.id!==X),tt=ve.closest?ve.closest(".board-card"):null,Ke=De.length;if(tt){let Xe=tt.getAttribute("data-issue-id");if(Xe===X)return;let Ee=De.findIndex(ft=>ft.id===Xe);Ee>=0&&(Ke=Ee)}let Pe=De.slice();Pe.splice(Ke,0,oe),A.applyReorder(X,Pe,Ke)}function ht(){for(let z of Array.from(e.querySelectorAll(".board-column--drag-over")))z.classList.remove("board-column--drag-over")}let at=null;e.addEventListener("dragover",z=>{z.preventDefault(),z.dataTransfer&&(z.dataTransfer.dropEffect="move");let ve=z.target.closest(".board-column");ve&&ve!==at&&(at&&at.classList.remove("board-column--drag-over"),ve.classList.add("board-column--drag-over"),at=ve)}),e.addEventListener("dragleave",z=>{let X=z.relatedTarget;(!X||!e.contains(X))&&at&&(at.classList.remove("board-column--drag-over"),at=null)}),e.addEventListener("drop",z=>{z.preventDefault(),at&&(at.classList.remove("board-column--drag-over"),at=null);let X=z.target,ve=X.closest(".board-column");if(!ve)return;let we=z.dataTransfer?.getData("text/plain")||"";if(!we)return;let oe=ve.id,De=J.get(we);if(De&&De===oe){if(Su.has(oe)){if(C!=="manual"){de("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}bt(oe,we,X)}return}let tt=xu[oe];if(!tt){de("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}N.get(we)!==tt&&Re(we,tt)}),e.addEventListener("keydown",z=>{let X=z.target;if(!(X instanceof HTMLElement))return;let ve=String(X.tagName||"").toLowerCase();if(ve==="input"||ve==="textarea"||ve==="select"||ve==="button"||ve==="a"||X.isContentEditable===!0)return;let we=X.closest(".board-card");if(!we)return;let oe=String(z.key||"");if(oe==="Enter"||oe===" "){z.preventDefault();let Pe=we.getAttribute("data-issue-id");Pe&&n(Pe);return}if(oe!=="ArrowUp"&&oe!=="ArrowDown"&&oe!=="ArrowLeft"&&oe!=="ArrowRight")return;z.preventDefault();let De=we.closest(".board-column");if(!De)return;let tt=Array.from(De.querySelectorAll(".board-card")),Ke=tt.indexOf(we);if(oe==="ArrowDown"&&Ke<tt.length-1){$t(we,tt[Ke+1]);return}if(oe==="ArrowUp"&&Ke>0){$t(we,tt[Ke-1]);return}if(oe==="ArrowLeft"||oe==="ArrowRight"){let Pe=Array.from(e.querySelectorAll(".board-column")),Xe=Pe.indexOf(De),Ee=oe==="ArrowRight"?1:-1,ft=Xe+Ee;for(;ft>=0&&ft<Pe.length;){let Tt=Pe[ft].querySelector(".board-card");if(Tt){$t(we,Tt);return}ft+=Ee}}});function $t(z,X){try{z.tabIndex=-1,X.tabIndex=0,X.focus()}catch{}}let lt=null;b&&b.subscribe&&(lt=b.subscribe(()=>{try{ge()}catch{}}));let st=null;l&&l.subscribe&&(st=l.subscribe(()=>{try{ge()}catch{}}));let ut=null;return c&&c.subscribe&&(ut=c.subscribe(()=>{Ie()})),{async load(){r("load"),ge()},clear(){F(),$(),lt&&(lt(),lt=null),st&&(st(),st=null),ut&&(ut(),ut=null),e.replaceChildren(),k=[],M=[],P=[],S=[],U=[],Q=[],N=new Map,J=new Map}}}function _o(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function cn(e,t){return e.filter(r=>{let n=_o(r);return!(n&&t.has(n))})}async function Eu(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let r=!1;try{r=document.execCommand("copy")}finally{t.remove()}return r}catch{return!1}}async function lr(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let r=document.createElement("textarea");r.value=t,r.style.position="fixed",r.style.left="-9999px",document.body.appendChild(r),r.select();let n=!1;try{n=document.execCommand("copy")}finally{r.remove()}return n}catch{return!1}}function nr(e){return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,e.speed==="fast"?"Fast":null].filter(Boolean).join(" \xB7 ")}function vr(e){return typeof e.resumed_from!="string"||e.resumed_from.length===0?null:`${e.continuation_mode==="session"?"session \uC774\uC5B4\uBC1B\uC74C":e.continuation_mode==="fresh"?"\uC0C8 session\uC73C\uB85C \uC774\uC5B4\uBC1B\uC74C":"\uC774\uC804 attempt\uC5D0\uC11C \uC774\uC5B4\uBC1B\uC74C"} (from ${e.resumed_from})`}function Tu(e,t=document){let r=t.createElement("dialog");r.className="continuation-dialog";let n=t.createElement("button"),s=t.createElement("button"),o=t.createElement("button"),a=t.createElement("h2"),l=t.createElement("p");return a.textContent="\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4",l.textContent=`${nr(e.prior||{})||"\uC774\uC804 \uC124\uC815"} \u2192 ${nr(e.current||{})||"\uD604\uC7AC \uC124\uC815"}`,n.type="button",n.textContent="\uAE30\uC874 session \uC774\uC5B4\uD558\uAE30",n.disabled=e.prior_available===!1,s.type="button",s.textContent="\uD604\uC7AC preset\uC73C\uB85C \uC0C8 session",o.type="button",o.textContent="\uCDE8\uC18C",r.append(a,l,n,s,o),t.body.append(r),new Promise(c=>{let u=f=>{typeof r.close=="function"&&r.close(),r.remove(),c(f)};n.addEventListener("click",()=>u("prior_session")),s.addEventListener("click",()=>u("fresh_current")),o.addEventListener("click",()=>u(null)),r.addEventListener("cancel",f=>{f.preventDefault(),u(null)}),typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")})}async function cr(e,t,r={}){let n=e;for(r.onResult?.(n);n?.continuation_mismatch;){let s=n.continuation_mismatch,o=await Tu(s);if(o===null)return n;n=await t(o,s.decision_token),r.onResult?.(n),n?.conflict&&r.refresh&&(n=await r.refresh(n),r.onResult?.(n))}return n}function Yr(e=document){let t=e.createElement("dialog");t.className="resume-instructions-dialog";let r=e.createElement("h2"),n=e.createElement("textarea"),s=e.createElement("div"),o=e.createElement("button"),a=e.createElement("button");return r.textContent="\uC138\uC158 \uC774\uC5B4\uD558\uAE30",n.placeholder="\uCD94\uAC00 \uC9C0\uCE68 (\uC120\uD0DD) \u2014 \uBE44\uC6CC\uB450\uBA74 \uAE30\uBCF8 \uC808\uCC28\uB85C \uC7AC\uAC1C",n.maxLength=4e3,s.className="resume-instructions-dialog__actions",o.type="button",o.textContent="\uC774\uC5B4\uD558\uAE30",a.type="button",a.textContent="\uCDE8\uC18C",s.append(o,a),t.append(r,n,s),e.body.append(t),new Promise(l=>{let c=!1,u=_=>{c||(c=!0,typeof t.close=="function"&&t.close(),t.remove(),l(_))},f=()=>u(n.value.trim());o.addEventListener("click",f),a.addEventListener("click",()=>u(null)),n.addEventListener("keydown",_=>{_.key==="Enter"&&(_.ctrlKey||_.metaKey)&&(_.preventDefault(),f())}),t.addEventListener("cancel",_=>{_.preventDefault(),u(null)}),typeof t.showModal=="function"?t.showModal():t.setAttribute("open",""),n.focus()})}var Bi="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function mt(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var dr=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],dn=[...dr,"reasoning_output_tokens"],Cu=["implementation","review-consult"];function mo(e){let t=0;for(let r of dr)t+=mt(e?.[r]);return t}function Ru(e){return!e||typeof e!="object"?!1:dr.some(t=>Number.isFinite(e[t]))}function Mi(e){return!e||typeof e!="object"?!1:dn.some(t=>Number.isFinite(e[t]))}function Iu(e){let t={};for(let r of dn)e&&Number.isFinite(e[r])&&(t[r]=e[r]);return t}function Ni(e){let t={};for(let r of dn)Number.isFinite(e[r])&&(t[r]=e[r]);return e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function Fi(e,t){return e==="codex"?mt(t.input_tokens)+mt(t.output_tokens):mo(t)}function Lu(e){return e==="claude"?"Claude":"Codex"}function Ou(e){return`\u03C4 ${ji(e)}`}function Pu(e,t){let r=t.breakdown||{},n=[`\uC785\uB825 ${mt(r.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${mt(r.output_tokens).toLocaleString("en-US")}`];e==="claude"?n.push(`\uCE90\uC2DC\uC77D\uAE30 ${mt(r.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${mt(r.cache_creation_input_tokens).toLocaleString("en-US")}`):(n.push(`\uCE90\uC2DC\uC77D\uAE30 ${mt(r.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${mt(r.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(r.reasoning_output_tokens)&&n.push(`\uCD94\uB860\uCD9C\uB825 ${mt(r.reasoning_output_tokens).toLocaleString("en-US")}`));let o=[e==="claude"?"Claude subtotal = \uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"Codex subtotal = \uC785\uB825 + \uCD9C\uB825; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset",`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,n.join(" \xB7 ")];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&o.push(`$${t.total_cost_usd.toFixed(2)}`),t.replayed&&o.push(Bi),o.join(`
`)}function gt(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let r of["claude","codex"]){let n=e.providers[r];n&&t.push({provider:r,label:`${Lu(r)} ${Ou(n.subtotal)}${typeof n.total_cost_usd=="number"&&Number.isFinite(n.total_cost_usd)?` \xB7 $${n.total_cost_usd.toFixed(2)}`:""}`,tooltip:Pu(r,n)})}return t}function is(e){let t={},r={claude:!0,codex:!1},n={claude:0,codex:0};for(let s of e)if(!(!s||!s.providers))for(let o of["claude","codex"]){let a=s.providers[o];if(!a)continue;let l=t[o];l||(l={subtotal:0,breakdown:{}},t[o]=l),l.subtotal+=a.subtotal;for(let c of dn)Number.isFinite(a.breakdown[c])&&(l.breakdown[c]=mt(l.breakdown[c])+mt(a.breakdown[c]));a.replayed&&(l.replayed=!0),o==="claude"&&(typeof a.total_cost_usd=="number"&&Number.isFinite(a.total_cost_usd)?n.claude+=a.total_cost_usd:r.claude=!1)}return t.claude&&r.claude&&(t.claude.total_cost_usd=n.claude),Object.keys(t).length===0?null:{providers:t,roles:{}}}function go(e){return!e||typeof e!="object"?null:Nt({attempt:{...e,bead_id:"__attempt__"}},"__attempt__")}function Du(e){return e==="codex"?"codex":"claude"}function wr(){return{subtotal:0,breakdown:Iu(null),legs:[],replayed:!1,outer_count:0,outer_cost:0,outer_cost_count:0}}function as(e,t,r){e.subtotal+=t.subtotal;for(let n of dn)Number.isFinite(t.usage[n])&&(e.breakdown[n]=mt(e.breakdown[n])+mt(t.usage[n]));e.legs.push(t),t.replayed===!0&&(e.replayed=!0),r&&(e.outer_count+=1,typeof t.usage.total_cost_usd=="number"&&Number.isFinite(t.usage.total_cost_usd)&&(e.outer_cost+=t.usage.total_cost_usd,e.outer_cost_count+=1))}function qi(e,t){let r={subtotal:e.subtotal,breakdown:e.breakdown};return t&&(r.legs=e.legs),e.replayed&&(r.replayed=!0),r}function ji(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function Kr(e){return Ru(e)?`\u03C4 ${ji(mo(e))}`:null}function Gt(e){let t=Kr(e);if(!t)return null;let r=e?.total_cost_usd;return typeof r=="number"&&Number.isFinite(r)?`${t} \xB7 $${r.toFixed(2)}`:t}function Zr(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${mt(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${mt(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${mt(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${mt(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let r=[`\uCD1D ${mo(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&r.push(Bi),r.join(`
`)}function Nt(e,t){let r={claude:wr(),codex:wr()},n={orchestrator:{claude:wr(),codex:wr()},implementation:{claude:wr(),codex:wr()},"review-consult":{claude:wr(),codex:wr()}},s=new Set;for(let l of Object.values(e||{})){if(!l||l.bead_id!==t)continue;let c=l.usage;if(Mi(c)){let f=Du(l.runner),_=Ni(c),b={provider:f,role:"orchestrator",attempt_id:String(l.attempt_id||""),usage:_,subtotal:Fi(f,_)};_.replayed===!0&&(b.replayed=!0),typeof l.model=="string"&&(b.model=l.model),typeof l.session_id=="string"&&(b.session_id=l.session_id),as(r[f],b,!0),as(n.orchestrator[f],b,!0)}let u=Array.isArray(l.usage_legs)?l.usage_legs:[];for(let f of u){if(!f||f.provider!=="codex"||!Cu.includes(f.role)||!Mi(f.usage))continue;let _=typeof f.receipt_id=="string"&&f.receipt_id.length>0?f.receipt_id:null;if(!_||s.has(_))continue;s.add(_);let b=Ni(f.usage),A={provider:"codex",role:f.role,attempt_id:String(l.attempt_id||""),usage:b,subtotal:Fi("codex",b)};A.receipt_id=_,typeof f.model=="string"&&(A.model=f.model),typeof f.session_id=="string"?A.session_id=f.session_id:typeof f.thread_id=="string"&&(A.session_id=f.thread_id),typeof f.turn_id=="string"&&(A.turn_id=f.turn_id),typeof f.completed_at=="string"&&(A.completed_at=f.completed_at),b.replayed===!0&&(A.replayed=!0),as(r.codex,A,!1),as(n[A.role].codex,A,!1)}}let o={};for(let l of["claude","codex"]){let c=r[l];if(c.legs.length===0)continue;let u=qi(c,!1);l==="claude"&&c.outer_count>0&&c.outer_cost_count===c.outer_count&&(u.total_cost_usd=c.outer_cost),o[l]=u}if(Object.keys(o).length===0)return null;let a={};for(let l of["orchestrator","implementation","review-consult"]){let c={};for(let u of["claude","codex"]){let f=n[l][u];f.legs.length>0&&(c[u]={...qi(f,!0),legs:f.legs})}Object.keys(c).length>0&&(a[l]=c)}return{providers:o,roles:a}}var{entries:Zi,setPrototypeOf:Ui,isFrozen:Mu,getPrototypeOf:Nu,getOwnPropertyDescriptor:Fu}=Object,{freeze:St,seal:Ft,create:$o}=Object,{apply:xo,construct:So}=typeof Reflect<"u"&&Reflect;St||(St=function(t){return t});Ft||(Ft=function(t){return t});xo||(xo=function(t,r){for(var n=arguments.length,s=new Array(n>2?n-2:0),o=2;o<n;o++)s[o-2]=arguments[o];return t.apply(r,s)});So||(So=function(t){for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return new t(...n)});var ls=At(Array.prototype.forEach),qu=At(Array.prototype.lastIndexOf),Wi=At(Array.prototype.pop),un=At(Array.prototype.push),Bu=At(Array.prototype.splice),ds=At(String.prototype.toLowerCase),bo=At(String.prototype.toString),ho=At(String.prototype.match),pn=At(String.prototype.replace),ju=At(String.prototype.indexOf),Uu=At(String.prototype.trim),Vt=At(Object.prototype.hasOwnProperty),xt=At(RegExp.prototype.test),fn=Wu(TypeError);function At(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return xo(e,t,n)}}function Wu(e){return function(){for(var t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];return So(e,r)}}function We(e,t){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:ds;Ui&&Ui(e,null);let n=t.length;for(;n--;){let s=t[n];if(typeof s=="string"){let o=r(s);o!==s&&(Mu(t)||(t[n]=o),s=o)}e[s]=!0}return e}function zu(e){for(let t=0;t<e.length;t++)Vt(e,t)||(e[t]=null);return e}function ur(e){let t=$o(null);for(let[r,n]of Zi(e))Vt(e,r)&&(Array.isArray(n)?t[r]=zu(n):n&&typeof n=="object"&&n.constructor===Object?t[r]=ur(n):t[r]=n);return t}function _n(e,t){for(;e!==null;){let n=Fu(e,t);if(n){if(n.get)return At(n.get);if(typeof n.value=="function")return At(n.value)}e=Nu(e)}function r(){return null}return r}var zi=St(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),yo=St(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),vo=St(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Hu=St(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),wo=St(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Gu=St(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Hi=St(["#text"]),Gi=St(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),ko=St(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Vi=St(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),cs=St(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Vu=Ft(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Yu=Ft(/<%[\w\W]*|[\w\W]*%>/gm),Ku=Ft(/\$\{[\w\W]*/gm),Zu=Ft(/^data-[\-\w.\u00B7-\uFFFF]+$/),Xu=Ft(/^aria-[\-\w]+$/),Xi=Ft(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Qu=Ft(/^(?:\w+script|data):/i),Ju=Ft(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Qi=Ft(/^html$/i),ep=Ft(/^[a-z][.\w]*(-[.\w]+)+$/i),Yi=Object.freeze({__proto__:null,ARIA_ATTR:Xu,ATTR_WHITESPACE:Ju,CUSTOM_ELEMENT:ep,DATA_ATTR:Zu,DOCTYPE_NAME:Qi,ERB_EXPR:Yu,IS_ALLOWED_URI:Xi,IS_SCRIPT_OR_DATA:Qu,MUSTACHE_EXPR:Vu,TMPLIT_EXPR:Ku}),mn={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},tp=function(){return typeof window>"u"?null:window},rp=function(t,r){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let n=null,s="data-tt-policy-suffix";r&&r.hasAttribute(s)&&(n=r.getAttribute(s));let o="dompurify"+(n?"#"+n:"");try{return t.createPolicy(o,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},Ki=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Ji(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:tp(),t=B=>Ji(B);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==mn.document||!e.Element)return t.isSupported=!1,t;let{document:r}=e,n=r,s=n.currentScript,{DocumentFragment:o,HTMLTemplateElement:a,Node:l,Element:c,NodeFilter:u,NamedNodeMap:f=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:_,DOMParser:b,trustedTypes:A}=e,k=c.prototype,M=_n(k,"cloneNode"),P=_n(k,"remove"),S=_n(k,"nextSibling"),U=_n(k,"childNodes"),Q=_n(k,"parentNode");if(typeof a=="function"){let B=r.createElement("template");B.content&&B.content.ownerDocument&&(r=B.content.ownerDocument)}let x,w="",{implementation:C,createNodeIterator:N,createDocumentFragment:J,getElementsByTagName:fe}=r,{importNode:ce}=n,ie=Ki();t.isSupported=typeof Zi=="function"&&typeof Q=="function"&&C&&C.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:le,ERB_EXPR:Fe,TMPLIT_EXPR:Ue,DATA_ATTR:ze,ARIA_ATTR:Ye,IS_SCRIPT_OR_DATA:He,ATTR_WHITESPACE:Ge,CUSTOM_ELEMENT:ge}=Yi,{IS_ALLOWED_URI:xe}=Yi,ke=null,Ae=We({},[...zi,...yo,...vo,...wo,...Hi]),_e=null,ne=We({},[...Gi,...ko,...Vi,...cs]),G=Object.seal($o(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),$e=null,be=null,ee=Object.seal($o(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),W=!0,j=!0,E=!1,H=!0,R=!1,Y=!0,K=!1,ue=!1,pe=!1,ye=!1,T=!1,F=!1,te=!0,Z=!1,$="user-content-",D=!0,V=!1,Le={},Ie=null,Ne=We({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),Re=null,et=We({},["audio","video","img","source","image","track"]),bt=null,ht=We({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),at="http://www.w3.org/1998/Math/MathML",$t="http://www.w3.org/2000/svg",lt="http://www.w3.org/1999/xhtml",st=lt,ut=!1,z=null,X=We({},[at,$t,lt],bo),ve=We({},["mi","mo","mn","ms","mtext"]),we=We({},["annotation-xml"]),oe=We({},["title","style","font","a","script"]),De=null,tt=["application/xhtml+xml","text/html"],Ke="text/html",Pe=null,Xe=null,Ee=r.createElement("form"),ft=function(y){return y instanceof RegExp||y instanceof Function},Tt=function(){let y=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(Xe&&Xe===y)){if((!y||typeof y!="object")&&(y={}),y=ur(y),De=tt.indexOf(y.PARSER_MEDIA_TYPE)===-1?Ke:y.PARSER_MEDIA_TYPE,Pe=De==="application/xhtml+xml"?bo:ds,ke=Vt(y,"ALLOWED_TAGS")?We({},y.ALLOWED_TAGS,Pe):Ae,_e=Vt(y,"ALLOWED_ATTR")?We({},y.ALLOWED_ATTR,Pe):ne,z=Vt(y,"ALLOWED_NAMESPACES")?We({},y.ALLOWED_NAMESPACES,bo):X,bt=Vt(y,"ADD_URI_SAFE_ATTR")?We(ur(ht),y.ADD_URI_SAFE_ATTR,Pe):ht,Re=Vt(y,"ADD_DATA_URI_TAGS")?We(ur(et),y.ADD_DATA_URI_TAGS,Pe):et,Ie=Vt(y,"FORBID_CONTENTS")?We({},y.FORBID_CONTENTS,Pe):Ne,$e=Vt(y,"FORBID_TAGS")?We({},y.FORBID_TAGS,Pe):ur({}),be=Vt(y,"FORBID_ATTR")?We({},y.FORBID_ATTR,Pe):ur({}),Le=Vt(y,"USE_PROFILES")?y.USE_PROFILES:!1,W=y.ALLOW_ARIA_ATTR!==!1,j=y.ALLOW_DATA_ATTR!==!1,E=y.ALLOW_UNKNOWN_PROTOCOLS||!1,H=y.ALLOW_SELF_CLOSE_IN_ATTR!==!1,R=y.SAFE_FOR_TEMPLATES||!1,Y=y.SAFE_FOR_XML!==!1,K=y.WHOLE_DOCUMENT||!1,ye=y.RETURN_DOM||!1,T=y.RETURN_DOM_FRAGMENT||!1,F=y.RETURN_TRUSTED_TYPE||!1,pe=y.FORCE_BODY||!1,te=y.SANITIZE_DOM!==!1,Z=y.SANITIZE_NAMED_PROPS||!1,D=y.KEEP_CONTENT!==!1,V=y.IN_PLACE||!1,xe=y.ALLOWED_URI_REGEXP||Xi,st=y.NAMESPACE||lt,ve=y.MATHML_TEXT_INTEGRATION_POINTS||ve,we=y.HTML_INTEGRATION_POINTS||we,G=y.CUSTOM_ELEMENT_HANDLING||{},y.CUSTOM_ELEMENT_HANDLING&&ft(y.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(G.tagNameCheck=y.CUSTOM_ELEMENT_HANDLING.tagNameCheck),y.CUSTOM_ELEMENT_HANDLING&&ft(y.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(G.attributeNameCheck=y.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),y.CUSTOM_ELEMENT_HANDLING&&typeof y.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(G.allowCustomizedBuiltInElements=y.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),R&&(j=!1),T&&(ye=!0),Le&&(ke=We({},Hi),_e=[],Le.html===!0&&(We(ke,zi),We(_e,Gi)),Le.svg===!0&&(We(ke,yo),We(_e,ko),We(_e,cs)),Le.svgFilters===!0&&(We(ke,vo),We(_e,ko),We(_e,cs)),Le.mathMl===!0&&(We(ke,wo),We(_e,Vi),We(_e,cs))),y.ADD_TAGS&&(typeof y.ADD_TAGS=="function"?ee.tagCheck=y.ADD_TAGS:(ke===Ae&&(ke=ur(ke)),We(ke,y.ADD_TAGS,Pe))),y.ADD_ATTR&&(typeof y.ADD_ATTR=="function"?ee.attributeCheck=y.ADD_ATTR:(_e===ne&&(_e=ur(_e)),We(_e,y.ADD_ATTR,Pe))),y.ADD_URI_SAFE_ATTR&&We(bt,y.ADD_URI_SAFE_ATTR,Pe),y.FORBID_CONTENTS&&(Ie===Ne&&(Ie=ur(Ie)),We(Ie,y.FORBID_CONTENTS,Pe)),D&&(ke["#text"]=!0),K&&We(ke,["html","head","body"]),ke.table&&(We(ke,["tbody"]),delete $e.tbody),y.TRUSTED_TYPES_POLICY){if(typeof y.TRUSTED_TYPES_POLICY.createHTML!="function")throw fn('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof y.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw fn('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');x=y.TRUSTED_TYPES_POLICY,w=x.createHTML("")}else x===void 0&&(x=rp(A,s)),x!==null&&typeof w=="string"&&(w=x.createHTML(""));St&&St(y),Xe=y}},Ot=We({},[...yo,...vo,...Hu]),Pt=We({},[...wo,...Gu]),Sr=function(y){let I=Q(y);(!I||!I.tagName)&&(I={namespaceURI:st,tagName:"template"});let se=ds(y.tagName),Te=ds(I.tagName);return z[y.namespaceURI]?y.namespaceURI===$t?I.namespaceURI===lt?se==="svg":I.namespaceURI===at?se==="svg"&&(Te==="annotation-xml"||ve[Te]):!!Ot[se]:y.namespaceURI===at?I.namespaceURI===lt?se==="math":I.namespaceURI===$t?se==="math"&&we[Te]:!!Pt[se]:y.namespaceURI===lt?I.namespaceURI===$t&&!we[Te]||I.namespaceURI===at&&!ve[Te]?!1:!Pt[se]&&(oe[se]||!Ot[se]):!!(De==="application/xhtml+xml"&&z[y.namespaceURI]):!1},yt=function(y){un(t.removed,{element:y});try{Q(y).removeChild(y)}catch{P(y)}},wt=function(y,I){try{un(t.removed,{attribute:I.getAttributeNode(y),from:I})}catch{un(t.removed,{attribute:null,from:I})}if(I.removeAttribute(y),y==="is")if(ye||T)try{yt(I)}catch{}else try{I.setAttribute(y,"")}catch{}},Jt=function(y){let I=null,se=null;if(pe)y="<remove></remove>"+y;else{let Be=ho(y,/^[\r\n\t ]+/);se=Be&&Be[0]}De==="application/xhtml+xml"&&st===lt&&(y='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+y+"</body></html>");let Te=x?x.createHTML(y):y;if(st===lt)try{I=new b().parseFromString(Te,De)}catch{}if(!I||!I.documentElement){I=C.createDocument(st,"template",null);try{I.documentElement.innerHTML=ut?w:Te}catch{}}let Je=I.body||I.documentElement;return y&&se&&Je.insertBefore(r.createTextNode(se),Je.childNodes[0]||null),st===lt?fe.call(I,K?"html":"body")[0]:K?I.documentElement:Je},ar=function(y){return N.call(y.ownerDocument||y,y,u.SHOW_ELEMENT|u.SHOW_COMMENT|u.SHOW_TEXT|u.SHOW_PROCESSING_INSTRUCTION|u.SHOW_CDATA_SECTION,null)},Bt=function(y){return y instanceof _&&(typeof y.nodeName!="string"||typeof y.textContent!="string"||typeof y.removeChild!="function"||!(y.attributes instanceof f)||typeof y.removeAttribute!="function"||typeof y.setAttribute!="function"||typeof y.namespaceURI!="string"||typeof y.insertBefore!="function"||typeof y.hasChildNodes!="function")},jt=function(y){return typeof l=="function"&&y instanceof l};function vt(B,y,I){ls(B,se=>{se.call(t,y,I,Xe)})}let er=function(y){let I=null;if(vt(ie.beforeSanitizeElements,y,null),Bt(y))return yt(y),!0;let se=Pe(y.nodeName);if(vt(ie.uponSanitizeElement,y,{tagName:se,allowedTags:ke}),Y&&y.hasChildNodes()&&!jt(y.firstElementChild)&&xt(/<[/\w!]/g,y.innerHTML)&&xt(/<[/\w!]/g,y.textContent)||y.nodeType===mn.progressingInstruction||Y&&y.nodeType===mn.comment&&xt(/<[/\w]/g,y.data))return yt(y),!0;if(!(ee.tagCheck instanceof Function&&ee.tagCheck(se))&&(!ke[se]||$e[se])){if(!$e[se]&&v(se)&&(G.tagNameCheck instanceof RegExp&&xt(G.tagNameCheck,se)||G.tagNameCheck instanceof Function&&G.tagNameCheck(se)))return!1;if(D&&!Ie[se]){let Te=Q(y)||y.parentNode,Je=U(y)||y.childNodes;if(Je&&Te){let Be=Je.length;for(let Ze=Be-1;Ze>=0;--Ze){let Se=M(Je[Ze],!0);Se.__removalCount=(y.__removalCount||0)+1,Te.insertBefore(Se,S(y))}}}return yt(y),!0}return y instanceof c&&!Sr(y)||(se==="noscript"||se==="noembed"||se==="noframes")&&xt(/<\/no(script|embed|frames)/i,y.innerHTML)?(yt(y),!0):(R&&y.nodeType===mn.text&&(I=y.textContent,ls([le,Fe,Ue],Te=>{I=pn(I,Te," ")}),y.textContent!==I&&(un(t.removed,{element:y.cloneNode()}),y.textContent=I)),vt(ie.afterSanitizeElements,y,null),!1)},p=function(y,I,se){if(te&&(I==="id"||I==="name")&&(se in r||se in Ee))return!1;if(!(j&&!be[I]&&xt(ze,I))){if(!(W&&xt(Ye,I))){if(!(ee.attributeCheck instanceof Function&&ee.attributeCheck(I,y))){if(!_e[I]||be[I]){if(!(v(y)&&(G.tagNameCheck instanceof RegExp&&xt(G.tagNameCheck,y)||G.tagNameCheck instanceof Function&&G.tagNameCheck(y))&&(G.attributeNameCheck instanceof RegExp&&xt(G.attributeNameCheck,I)||G.attributeNameCheck instanceof Function&&G.attributeNameCheck(I,y))||I==="is"&&G.allowCustomizedBuiltInElements&&(G.tagNameCheck instanceof RegExp&&xt(G.tagNameCheck,se)||G.tagNameCheck instanceof Function&&G.tagNameCheck(se))))return!1}else if(!bt[I]){if(!xt(xe,pn(se,Ge,""))){if(!((I==="src"||I==="xlink:href"||I==="href")&&y!=="script"&&ju(se,"data:")===0&&Re[y])){if(!(E&&!xt(He,pn(se,Ge,"")))){if(se)return!1}}}}}}}return!0},v=function(y){return y!=="annotation-xml"&&ho(y,ge)},q=function(y){vt(ie.beforeSanitizeAttributes,y,null);let{attributes:I}=y;if(!I||Bt(y))return;let se={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:_e,forceKeepAttr:void 0},Te=I.length;for(;Te--;){let Je=I[Te],{name:Be,namespaceURI:Ze,value:Se}=Je,d=Pe(Be),m=Se,h=Be==="value"?m:Uu(m);if(se.attrName=d,se.attrValue=h,se.keepAttr=!0,se.forceKeepAttr=void 0,vt(ie.uponSanitizeAttribute,y,se),h=se.attrValue,Z&&(d==="id"||d==="name")&&(wt(Be,y),h=$+h),Y&&xt(/((--!?|])>)|<\/(style|title|textarea)/i,h)){wt(Be,y);continue}if(d==="attributename"&&ho(h,"href")){wt(Be,y);continue}if(se.forceKeepAttr)continue;if(!se.keepAttr){wt(Be,y);continue}if(!H&&xt(/\/>/i,h)){wt(Be,y);continue}R&&ls([le,Fe,Ue],me=>{h=pn(h,me," ")});let O=Pe(y.nodeName);if(!p(O,d,h)){wt(Be,y);continue}if(x&&typeof A=="object"&&typeof A.getAttributeType=="function"&&!Ze)switch(A.getAttributeType(O,d)){case"TrustedHTML":{h=x.createHTML(h);break}case"TrustedScriptURL":{h=x.createScriptURL(h);break}}if(h!==m)try{Ze?y.setAttributeNS(Ze,Be,h):y.setAttribute(Be,h),Bt(y)?yt(y):Wi(t.removed)}catch{wt(Be,y)}}vt(ie.afterSanitizeAttributes,y,null)},re=function B(y){let I=null,se=ar(y);for(vt(ie.beforeSanitizeShadowDOM,y,null);I=se.nextNode();)vt(ie.uponSanitizeShadowNode,I,null),er(I),q(I),I.content instanceof o&&B(I.content);vt(ie.afterSanitizeShadowDOM,y,null)};return t.sanitize=function(B){let y=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},I=null,se=null,Te=null,Je=null;if(ut=!B,ut&&(B="<!-->"),typeof B!="string"&&!jt(B))if(typeof B.toString=="function"){if(B=B.toString(),typeof B!="string")throw fn("dirty is not a string, aborting")}else throw fn("toString is not a function");if(!t.isSupported)return B;if(ue||Tt(y),t.removed=[],typeof B=="string"&&(V=!1),V){if(B.nodeName){let Se=Pe(B.nodeName);if(!ke[Se]||$e[Se])throw fn("root node is forbidden and cannot be sanitized in-place")}}else if(B instanceof l)I=Jt("<!---->"),se=I.ownerDocument.importNode(B,!0),se.nodeType===mn.element&&se.nodeName==="BODY"||se.nodeName==="HTML"?I=se:I.appendChild(se);else{if(!ye&&!R&&!K&&B.indexOf("<")===-1)return x&&F?x.createHTML(B):B;if(I=Jt(B),!I)return ye?null:F?w:""}I&&pe&&yt(I.firstChild);let Be=ar(V?B:I);for(;Te=Be.nextNode();)er(Te),q(Te),Te.content instanceof o&&re(Te.content);if(V)return B;if(ye){if(T)for(Je=J.call(I.ownerDocument);I.firstChild;)Je.appendChild(I.firstChild);else Je=I;return(_e.shadowroot||_e.shadowrootmode)&&(Je=ce.call(n,Je,!0)),Je}let Ze=K?I.outerHTML:I.innerHTML;return K&&ke["!doctype"]&&I.ownerDocument&&I.ownerDocument.doctype&&I.ownerDocument.doctype.name&&xt(Qi,I.ownerDocument.doctype.name)&&(Ze="<!DOCTYPE "+I.ownerDocument.doctype.name+`>
`+Ze),R&&ls([le,Fe,Ue],Se=>{Ze=pn(Ze,Se," ")}),x&&F?x.createHTML(Ze):Ze},t.setConfig=function(){let B=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};Tt(B),ue=!0},t.clearConfig=function(){Xe=null,ue=!1},t.isValidAttribute=function(B,y,I){Xe||Tt({});let se=Pe(B),Te=Pe(y);return p(se,Te,I)},t.addHook=function(B,y){typeof y=="function"&&un(ie[B],y)},t.removeHook=function(B,y){if(y!==void 0){let I=qu(ie[B],y);return I===-1?void 0:Bu(ie[B],I,1)[0]}return Wi(ie[B])},t.removeHooks=function(B){ie[B]=[]},t.removeAllHooks=function(){ie=Ki()},t}var el=Ji();var pr={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},us=e=>(...t)=>({_$litDirective$:e,values:t}),Xr=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,r,n){this._$Ct=t,this._$AM=r,this._$Ci=n}_$AS(t,r){return this.update(t,r)}update(t,r){return this.render(...r)}};var gn=class extends Xr{constructor(t){if(super(t),this.it=ct,t.type!==pr.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===ct||t==null)return this._t=void 0,this.it=t;if(t===Dt)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let r=[t];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}};gn.directiveName="unsafeHTML",gn.resultType=1;var tl=us(gn);function Co(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Mr=Co();function ll(e){Mr=e}var vn={exec:()=>null};function Ve(e,t=""){let r=typeof e=="string"?e:e.source,n={replace:(s,o)=>{let a=typeof o=="string"?o:o.source;return a=a.replace(Et.caret,"$1"),r=r.replace(s,a),n},getRegex:()=>new RegExp(r,t)};return n}var np=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),Et={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},sp=/^(?:[ \t]*(?:\n|$))+/,op=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,ap=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,wn=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,ip=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Ro=/(?:[*+-]|\d{1,9}[.)])/,cl=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,dl=Ve(cl).replace(/bull/g,Ro).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),lp=Ve(cl).replace(/bull/g,Ro).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Io=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,cp=/^[^\n]+/,Lo=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,dp=Ve(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Lo).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),up=Ve(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Ro).getRegex(),bs="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Oo=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,pp=Ve("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",Oo).replace("tag",bs).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),ul=Ve(Io).replace("hr",wn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",bs).getRegex(),fp=Ve(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",ul).getRegex(),Po={blockquote:fp,code:op,def:dp,fences:ap,heading:ip,hr:wn,html:pp,lheading:dl,list:up,newline:sp,paragraph:ul,table:vn,text:cp},rl=Ve("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",wn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",bs).getRegex(),_p={...Po,lheading:lp,table:rl,paragraph:Ve(Io).replace("hr",wn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",rl).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",bs).getRegex()},mp={...Po,html:Ve(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",Oo).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:vn,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:Ve(Io).replace("hr",wn).replace("heading",` *#{1,6} *[^
]`).replace("lheading",dl).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},gp=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,bp=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,pl=/^( {2,}|\\)\n(?!\s*$)/,hp=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,hs=/[\p{P}\p{S}]/u,Do=/[\s\p{P}\p{S}]/u,fl=/[^\s\p{P}\p{S}]/u,yp=Ve(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Do).getRegex(),_l=/(?!~)[\p{P}\p{S}]/u,vp=/(?!~)[\s\p{P}\p{S}]/u,wp=/(?:[^\s\p{P}\p{S}]|~)/u,kp=Ve(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",np?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),ml=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,$p=Ve(ml,"u").replace(/punct/g,hs).getRegex(),xp=Ve(ml,"u").replace(/punct/g,_l).getRegex(),gl="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Sp=Ve(gl,"gu").replace(/notPunctSpace/g,fl).replace(/punctSpace/g,Do).replace(/punct/g,hs).getRegex(),Ap=Ve(gl,"gu").replace(/notPunctSpace/g,wp).replace(/punctSpace/g,vp).replace(/punct/g,_l).getRegex(),Ep=Ve("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,fl).replace(/punctSpace/g,Do).replace(/punct/g,hs).getRegex(),Tp=Ve(/\\(punct)/,"gu").replace(/punct/g,hs).getRegex(),Cp=Ve(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Rp=Ve(Oo).replace("(?:-->|$)","-->").getRegex(),Ip=Ve("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Rp).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),_s=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,Lp=Ve(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",_s).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),bl=Ve(/^!?\[(label)\]\[(ref)\]/).replace("label",_s).replace("ref",Lo).getRegex(),hl=Ve(/^!?\[(ref)\](?:\[\])?/).replace("ref",Lo).getRegex(),Op=Ve("reflink|nolink(?!\\()","g").replace("reflink",bl).replace("nolink",hl).getRegex(),nl=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,Mo={_backpedal:vn,anyPunctuation:Tp,autolink:Cp,blockSkip:kp,br:pl,code:bp,del:vn,emStrongLDelim:$p,emStrongRDelimAst:Sp,emStrongRDelimUnd:Ep,escape:gp,link:Lp,nolink:hl,punctuation:yp,reflink:bl,reflinkSearch:Op,tag:Ip,text:hp,url:vn},Pp={...Mo,link:Ve(/^!?\[(label)\]\((.*?)\)/).replace("label",_s).getRegex(),reflink:Ve(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",_s).getRegex()},Ao={...Mo,emStrongRDelimAst:Ap,emStrongLDelim:xp,url:Ve(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",nl).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:Ve(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",nl).getRegex()},Dp={...Ao,br:Ve(pl).replace("{2,}","*").getRegex(),text:Ve(Ao.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},ps={normal:Po,gfm:_p,pedantic:mp},bn={normal:Mo,gfm:Ao,breaks:Dp,pedantic:Pp},Mp={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},sl=e=>Mp[e];function fr(e,t){if(t){if(Et.escapeTest.test(e))return e.replace(Et.escapeReplace,sl)}else if(Et.escapeTestNoEncode.test(e))return e.replace(Et.escapeReplaceNoEncode,sl);return e}function ol(e){try{e=encodeURI(e).replace(Et.percentDecode,"%")}catch{return null}return e}function al(e,t){let r=e.replace(Et.findPipe,(o,a,l)=>{let c=!1,u=a;for(;--u>=0&&l[u]==="\\";)c=!c;return c?"|":" |"}),n=r.split(Et.splitPipe),s=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),t)if(n.length>t)n.splice(t);else for(;n.length<t;)n.push("");for(;s<n.length;s++)n[s]=n[s].trim().replace(Et.slashPipe,"|");return n}function hn(e,t,r){let n=e.length;if(n===0)return"";let s=0;for(;s<n;){let o=e.charAt(n-s-1);if(o===t&&!r)s++;else if(o!==t&&r)s++;else break}return e.slice(0,n-s)}function Np(e,t){if(e.indexOf(t[1])===-1)return-1;let r=0;for(let n=0;n<e.length;n++)if(e[n]==="\\")n++;else if(e[n]===t[0])r++;else if(e[n]===t[1]&&(r--,r<0))return n;return r>0?-2:-1}function il(e,t,r,n,s){let o=t.href,a=t.title||null,l=e[1].replace(s.other.outputLinkReplace,"$1");n.state.inLink=!0;let c={type:e[0].charAt(0)==="!"?"image":"link",raw:r,href:o,title:a,text:l,tokens:n.inlineTokens(l)};return n.state.inLink=!1,c}function Fp(e,t,r){let n=e.match(r.other.indentCodeCompensation);if(n===null)return t;let s=n[1];return t.split(`
`).map(o=>{let a=o.match(r.other.beginningSpace);if(a===null)return o;let[l]=a;return l.length>=s.length?o.slice(s.length):o}).join(`
`)}var ms=class{constructor(e){rt(this,"options");rt(this,"rules");rt(this,"lexer");this.options=e||Mr}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let r=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?r:hn(r,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let r=t[0],n=Fp(r,t[3]||"",this.rules);return{type:"code",raw:r,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:n}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let r=t[2].trim();if(this.rules.other.endingHash.test(r)){let n=hn(r,"#");(this.options.pedantic||!n||this.rules.other.endingSpaceChar.test(n))&&(r=n.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:hn(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let r=hn(t[0],`
`).split(`
`),n="",s="",o=[];for(;r.length>0;){let a=!1,l=[],c;for(c=0;c<r.length;c++)if(this.rules.other.blockquoteStart.test(r[c]))l.push(r[c]),a=!0;else if(!a)l.push(r[c]);else break;r=r.slice(c);let u=l.join(`
`),f=u.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");n=n?`${n}
${u}`:u,s=s?`${s}
${f}`:f;let _=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(f,o,!0),this.lexer.state.top=_,r.length===0)break;let b=o.at(-1);if(b?.type==="code")break;if(b?.type==="blockquote"){let A=b,k=A.raw+`
`+r.join(`
`),M=this.blockquote(k);o[o.length-1]=M,n=n.substring(0,n.length-A.raw.length)+M.raw,s=s.substring(0,s.length-A.text.length)+M.text;break}else if(b?.type==="list"){let A=b,k=A.raw+`
`+r.join(`
`),M=this.list(k);o[o.length-1]=M,n=n.substring(0,n.length-b.raw.length)+M.raw,s=s.substring(0,s.length-A.raw.length)+M.raw,r=k.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:n,tokens:o,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let r=t[1].trim(),n=r.length>1,s={type:"list",raw:"",ordered:n,start:n?+r.slice(0,-1):"",loose:!1,items:[]};r=n?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=n?r:"[*+-]");let o=this.rules.other.listItemRegex(r),a=!1;for(;e;){let c=!1,u="",f="";if(!(t=o.exec(e))||this.rules.block.hr.test(e))break;u=t[0],e=e.substring(u.length);let _=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,M=>" ".repeat(3*M.length)),b=e.split(`
`,1)[0],A=!_.trim(),k=0;if(this.options.pedantic?(k=2,f=_.trimStart()):A?k=t[1].length+1:(k=t[2].search(this.rules.other.nonSpaceChar),k=k>4?1:k,f=_.slice(k),k+=t[1].length),A&&this.rules.other.blankLine.test(b)&&(u+=b+`
`,e=e.substring(b.length+1),c=!0),!c){let M=this.rules.other.nextBulletRegex(k),P=this.rules.other.hrRegex(k),S=this.rules.other.fencesBeginRegex(k),U=this.rules.other.headingBeginRegex(k),Q=this.rules.other.htmlBeginRegex(k);for(;e;){let x=e.split(`
`,1)[0],w;if(b=x,this.options.pedantic?(b=b.replace(this.rules.other.listReplaceNesting,"  "),w=b):w=b.replace(this.rules.other.tabCharGlobal,"    "),S.test(b)||U.test(b)||Q.test(b)||M.test(b)||P.test(b))break;if(w.search(this.rules.other.nonSpaceChar)>=k||!b.trim())f+=`
`+w.slice(k);else{if(A||_.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||S.test(_)||U.test(_)||P.test(_))break;f+=`
`+b}!A&&!b.trim()&&(A=!0),u+=x+`
`,e=e.substring(x.length+1),_=w.slice(k)}}s.loose||(a?s.loose=!0:this.rules.other.doubleBlankLine.test(u)&&(a=!0)),s.items.push({type:"list_item",raw:u,task:!!this.options.gfm&&this.rules.other.listIsTask.test(f),loose:!1,text:f,tokens:[]}),s.raw+=u}let l=s.items.at(-1);if(l)l.raw=l.raw.trimEnd(),l.text=l.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let c of s.items){if(this.lexer.state.top=!1,c.tokens=this.lexer.blockTokens(c.text,[]),c.task){if(c.text=c.text.replace(this.rules.other.listReplaceTask,""),c.tokens[0]?.type==="text"||c.tokens[0]?.type==="paragraph"){c.tokens[0].raw=c.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),c.tokens[0].text=c.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let f=this.lexer.inlineQueue.length-1;f>=0;f--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[f].src)){this.lexer.inlineQueue[f].src=this.lexer.inlineQueue[f].src.replace(this.rules.other.listReplaceTask,"");break}}let u=this.rules.other.listTaskCheckbox.exec(c.raw);if(u){let f={type:"checkbox",raw:u[0]+" ",checked:u[0]!=="[ ]"};c.checked=f.checked,s.loose?c.tokens[0]&&["paragraph","text"].includes(c.tokens[0].type)&&"tokens"in c.tokens[0]&&c.tokens[0].tokens?(c.tokens[0].raw=f.raw+c.tokens[0].raw,c.tokens[0].text=f.raw+c.tokens[0].text,c.tokens[0].tokens.unshift(f)):c.tokens.unshift({type:"paragraph",raw:f.raw,text:f.raw,tokens:[f]}):c.tokens.unshift(f)}}if(!s.loose){let u=c.tokens.filter(_=>_.type==="space"),f=u.length>0&&u.some(_=>this.rules.other.anyLine.test(_.raw));s.loose=f}}if(s.loose)for(let c of s.items){c.loose=!0;for(let u of c.tokens)u.type==="text"&&(u.type="paragraph")}return s}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let r=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),n=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:r,raw:t[0],href:n,title:s}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let r=al(t[1]),n=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(r.length===n.length){for(let a of n)this.rules.other.tableAlignRight.test(a)?o.align.push("right"):this.rules.other.tableAlignCenter.test(a)?o.align.push("center"):this.rules.other.tableAlignLeft.test(a)?o.align.push("left"):o.align.push(null);for(let a=0;a<r.length;a++)o.header.push({text:r[a],tokens:this.lexer.inline(r[a]),header:!0,align:o.align[a]});for(let a of s)o.rows.push(al(a,o.header.length).map((l,c)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:o.align[c]})));return o}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let r=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:r,tokens:this.lexer.inline(r)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let r=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;let o=hn(r.slice(0,-1),"\\");if((r.length-o.length)%2===0)return}else{let o=Np(t[2],"()");if(o===-2)return;if(o>-1){let a=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,a).trim(),t[3]=""}}let n=t[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(n);o&&(n=o[1],s=o[3])}else s=t[3]?t[3].slice(1,-1):"";return n=n.trim(),this.rules.other.startAngleBracket.test(n)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?n=n.slice(1):n=n.slice(1,-1)),il(t,{href:n&&n.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let r;if((r=this.rules.inline.reflink.exec(e))||(r=this.rules.inline.nolink.exec(e))){let n=(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[n.toLowerCase()];if(!s){let o=r[0].charAt(0);return{type:"text",raw:o,text:o}}return il(r,s,r[0],this.lexer,this.rules)}}emStrong(e,t,r=""){let n=this.rules.inline.emStrongLDelim.exec(e);if(!(!n||n[3]&&r.match(this.rules.other.unicodeAlphaNumeric))&&(!(n[1]||n[2])||!r||this.rules.inline.punctuation.exec(r))){let s=[...n[0]].length-1,o,a,l=s,c=0,u=n[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(u.lastIndex=0,t=t.slice(-1*e.length+s);(n=u.exec(t))!=null;){if(o=n[1]||n[2]||n[3]||n[4]||n[5]||n[6],!o)continue;if(a=[...o].length,n[3]||n[4]){l+=a;continue}else if((n[5]||n[6])&&s%3&&!((s+a)%3)){c+=a;continue}if(l-=a,l>0)continue;a=Math.min(a,a+l+c);let f=[...n[0]][0].length,_=e.slice(0,s+n.index+f+a);if(Math.min(s,a)%2){let A=_.slice(1,-1);return{type:"em",raw:_,text:A,tokens:this.lexer.inlineTokens(A)}}let b=_.slice(2,-2);return{type:"strong",raw:_,text:b,tokens:this.lexer.inlineTokens(b)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let r=t[2].replace(this.rules.other.newLineCharGlobal," "),n=this.rules.other.nonSpaceChar.test(r),s=this.rules.other.startingSpaceChar.test(r)&&this.rules.other.endingSpaceChar.test(r);return n&&s&&(r=r.substring(1,r.length-1)),{type:"codespan",raw:t[0],text:r}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let r,n;return t[2]==="@"?(r=t[1],n="mailto:"+r):(r=t[1],n=r),{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let r,n;if(t[2]==="@")r=t[0],n="mailto:"+r;else{let s;do s=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(s!==t[0]);r=t[0],t[1]==="www."?n="http://"+t[0]:n=t[0]}return{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let r=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:r}}}},Yt=class Eo{constructor(t){rt(this,"tokens");rt(this,"options");rt(this,"state");rt(this,"inlineQueue");rt(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||Mr,this.options.tokenizer=this.options.tokenizer||new ms,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let r={other:Et,block:ps.normal,inline:bn.normal};this.options.pedantic?(r.block=ps.pedantic,r.inline=bn.pedantic):this.options.gfm&&(r.block=ps.gfm,this.options.breaks?r.inline=bn.breaks:r.inline=bn.gfm),this.tokenizer.rules=r}static get rules(){return{block:ps,inline:bn}}static lex(t,r){return new Eo(r).lex(t)}static lexInline(t,r){return new Eo(r).inlineTokens(t)}lex(t){t=t.replace(Et.carriageReturn,`
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
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):r.push(s);continue}if(t){let a="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(a);break}else throw new Error(a)}}return this.state.top=!0,r}inline(t,r=[]){return this.inlineQueue.push({src:t,tokens:r}),r}inlineTokens(t,r=[]){let n=t,s=null;if(this.tokens.links){let c=Object.keys(this.tokens.links);if(c.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(n))!=null;)c.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(n=n.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(n))!=null;)n=n.slice(0,s.index)+"++"+n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(n))!=null;)o=s[2]?s[2].length:0,n=n.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let a=!1,l="";for(;t;){a||(l=""),a=!1;let c;if(this.options.extensions?.inline?.some(f=>(c=f.call({lexer:this},t,r))?(t=t.substring(c.raw.length),r.push(c),!0):!1))continue;if(c=this.tokenizer.escape(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.tag(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.link(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(c.raw.length);let f=r.at(-1);c.type==="text"&&f?.type==="text"?(f.raw+=c.raw,f.text+=c.text):r.push(c);continue}if(c=this.tokenizer.emStrong(t,n,l)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.codespan(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.br(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.del(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.autolink(t)){t=t.substring(c.raw.length),r.push(c);continue}if(!this.state.inLink&&(c=this.tokenizer.url(t))){t=t.substring(c.raw.length),r.push(c);continue}let u=t;if(this.options.extensions?.startInline){let f=1/0,_=t.slice(1),b;this.options.extensions.startInline.forEach(A=>{b=A.call({lexer:this},_),typeof b=="number"&&b>=0&&(f=Math.min(f,b))}),f<1/0&&f>=0&&(u=t.substring(0,f+1))}if(c=this.tokenizer.inlineText(u)){t=t.substring(c.raw.length),c.raw.slice(-1)!=="_"&&(l=c.raw.slice(-1)),a=!0;let f=r.at(-1);f?.type==="text"?(f.raw+=c.raw,f.text+=c.text):r.push(c);continue}if(t){let f="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(f);break}else throw new Error(f)}}return r}},gs=class{constructor(e){rt(this,"options");rt(this,"parser");this.options=e||Mr}space(e){return""}code({text:e,lang:t,escaped:r}){let n=(t||"").match(Et.notSpaceStart)?.[0],s=e.replace(Et.endingNewline,"")+`
`;return n?'<pre><code class="language-'+fr(n)+'">'+(r?s:fr(s,!0))+`</code></pre>
`:"<pre><code>"+(r?s:fr(s,!0))+`</code></pre>
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${fr(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:r}){let n=this.parser.parseInline(r),s=ol(e);if(s===null)return n;e=s;let o='<a href="'+e+'"';return t&&(o+=' title="'+fr(t)+'"'),o+=">"+n+"</a>",o}image({href:e,title:t,text:r,tokens:n}){n&&(r=this.parser.parseInline(n,this.parser.textRenderer));let s=ol(e);if(s===null)return fr(r);e=s;let o=`<img src="${e}" alt="${r}"`;return t&&(o+=` title="${fr(t)}"`),o+=">",o}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:fr(e.text)}},No=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},Kt=class To{constructor(t){rt(this,"options");rt(this,"renderer");rt(this,"textRenderer");this.options=t||Mr,this.options.renderer=this.options.renderer||new gs,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new No}static parse(t,r){return new To(r).parse(t)}static parseInline(t,r){return new To(r).parseInline(t)}parse(t){let r="";for(let n=0;n<t.length;n++){let s=t[n];if(this.options.extensions?.renderers?.[s.type]){let a=s,l=this.options.extensions.renderers[a.type].call({parser:this},a);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(a.type)){r+=l||"";continue}}let o=s;switch(o.type){case"space":{r+=this.renderer.space(o);break}case"hr":{r+=this.renderer.hr(o);break}case"heading":{r+=this.renderer.heading(o);break}case"code":{r+=this.renderer.code(o);break}case"table":{r+=this.renderer.table(o);break}case"blockquote":{r+=this.renderer.blockquote(o);break}case"list":{r+=this.renderer.list(o);break}case"checkbox":{r+=this.renderer.checkbox(o);break}case"html":{r+=this.renderer.html(o);break}case"def":{r+=this.renderer.def(o);break}case"paragraph":{r+=this.renderer.paragraph(o);break}case"text":{r+=this.renderer.text(o);break}default:{let a='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return r}parseInline(t,r=this.renderer){let n="";for(let s=0;s<t.length;s++){let o=t[s];if(this.options.extensions?.renderers?.[o.type]){let l=this.options.extensions.renderers[o.type].call({parser:this},o);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){n+=l||"";continue}}let a=o;switch(a.type){case"escape":{n+=r.text(a);break}case"html":{n+=r.html(a);break}case"link":{n+=r.link(a);break}case"image":{n+=r.image(a);break}case"checkbox":{n+=r.checkbox(a);break}case"strong":{n+=r.strong(a);break}case"em":{n+=r.em(a);break}case"codespan":{n+=r.codespan(a);break}case"br":{n+=r.br(a);break}case"del":{n+=r.del(a);break}case"text":{n+=r.text(a);break}default:{let l='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return n}},fs,yn=(fs=class{constructor(e){rt(this,"options");rt(this,"block");this.options=e||Mr}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?Yt.lex:Yt.lexInline}provideParser(){return this.block?Kt.parse:Kt.parseInline}},rt(fs,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),rt(fs,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),fs),qp=class{constructor(...e){rt(this,"defaults",Co());rt(this,"options",this.setOptions);rt(this,"parse",this.parseMarkdown(!0));rt(this,"parseInline",this.parseMarkdown(!1));rt(this,"Parser",Kt);rt(this,"Renderer",gs);rt(this,"TextRenderer",No);rt(this,"Lexer",Yt);rt(this,"Tokenizer",ms);rt(this,"Hooks",yn);this.use(...e)}walkTokens(e,t){let r=[];for(let n of e)switch(r=r.concat(t.call(this,n)),n.type){case"table":{let s=n;for(let o of s.header)r=r.concat(this.walkTokens(o.tokens,t));for(let o of s.rows)for(let a of o)r=r.concat(this.walkTokens(a.tokens,t));break}case"list":{let s=n;r=r.concat(this.walkTokens(s.items,t));break}default:{let s=n;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let a=s[o].flat(1/0);r=r.concat(this.walkTokens(a,t))}):s.tokens&&(r=r.concat(this.walkTokens(s.tokens,t)))}}return r}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(r=>{let n={...r};if(n.async=this.defaults.async||n.async||!1,r.extensions&&(r.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=t.renderers[s.name];o?t.renderers[s.name]=function(...a){let l=s.renderer.apply(this,a);return l===!1&&(l=o.apply(this,a)),l}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=t[s.level];o?o.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),n.extensions=t),r.renderer){let s=this.defaults.renderer||new gs(this.defaults);for(let o in r.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let a=o,l=r.renderer[a],c=s[a];s[a]=(...u)=>{let f=l.apply(s,u);return f===!1&&(f=c.apply(s,u)),f||""}}n.renderer=s}if(r.tokenizer){let s=this.defaults.tokenizer||new ms(this.defaults);for(let o in r.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let a=o,l=r.tokenizer[a],c=s[a];s[a]=(...u)=>{let f=l.apply(s,u);return f===!1&&(f=c.apply(s,u)),f}}n.tokenizer=s}if(r.hooks){let s=this.defaults.hooks||new yn;for(let o in r.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let a=o,l=r.hooks[a],c=s[a];yn.passThroughHooks.has(o)?s[a]=u=>{if(this.defaults.async&&yn.passThroughHooksRespectAsync.has(o))return(async()=>{let _=await l.call(s,u);return c.call(s,_)})();let f=l.call(s,u);return c.call(s,f)}:s[a]=(...u)=>{if(this.defaults.async)return(async()=>{let _=await l.apply(s,u);return _===!1&&(_=await c.apply(s,u)),_})();let f=l.apply(s,u);return f===!1&&(f=c.apply(s,u)),f}}n.hooks=s}if(r.walkTokens){let s=this.defaults.walkTokens,o=r.walkTokens;n.walkTokens=function(a){let l=[];return l.push(o.call(this,a)),s&&(l=l.concat(s.call(this,a))),l}}this.defaults={...this.defaults,...n}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Yt.lex(e,t??this.defaults)}parser(e,t){return Kt.parse(e,t??this.defaults)}parseMarkdown(e){return(t,r)=>{let n={...r},s={...this.defaults,...n},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&n.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=e),s.async)return(async()=>{let a=s.hooks?await s.hooks.preprocess(t):t,l=await(s.hooks?await s.hooks.provideLexer():e?Yt.lex:Yt.lexInline)(a,s),c=s.hooks?await s.hooks.processAllTokens(l):l;s.walkTokens&&await Promise.all(this.walkTokens(c,s.walkTokens));let u=await(s.hooks?await s.hooks.provideParser():e?Kt.parse:Kt.parseInline)(c,s);return s.hooks?await s.hooks.postprocess(u):u})().catch(o);try{s.hooks&&(t=s.hooks.preprocess(t));let a=(s.hooks?s.hooks.provideLexer():e?Yt.lex:Yt.lexInline)(t,s);s.hooks&&(a=s.hooks.processAllTokens(a)),s.walkTokens&&this.walkTokens(a,s.walkTokens);let l=(s.hooks?s.hooks.provideParser():e?Kt.parse:Kt.parseInline)(a,s);return s.hooks&&(l=s.hooks.postprocess(l)),l}catch(a){return o(a)}}}onError(e,t){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let n="<p>An error occurred:</p><pre>"+fr(r.message+"",!0)+"</pre>";return t?Promise.resolve(n):n}if(t)return Promise.reject(r);throw r}}},Dr=new qp;function Qe(e,t){return Dr.parse(e,t)}Qe.options=Qe.setOptions=function(e){return Dr.setOptions(e),Qe.defaults=Dr.defaults,ll(Qe.defaults),Qe};Qe.getDefaults=Co;Qe.defaults=Mr;Qe.use=function(...e){return Dr.use(...e),Qe.defaults=Dr.defaults,ll(Qe.defaults),Qe};Qe.walkTokens=function(e,t){return Dr.walkTokens(e,t)};Qe.parseInline=Dr.parseInline;Qe.Parser=Kt;Qe.parser=Kt.parse;Qe.Renderer=gs;Qe.TextRenderer=No;Qe.Lexer=Yt;Qe.lexer=Yt.lex;Qe.Tokenizer=ms;Qe.Hooks=yn;Qe.parse=Qe;var Xg=Qe.options,Qg=Qe.setOptions,Jg=Qe.use,eb=Qe.walkTokens,tb=Qe.parseInline;var rb=Kt.parse,nb=Yt.lex;function kr(e){let t=Qe.parse(e),r=el.sanitize(t);return tl(r)}function _r(e,t){return i`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function Qr(e){return e.loading?i`<div class="prompt-block__status">불러오는 중…</div>`:e.error?i`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function ys(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=n=>String(n).padStart(2,"0");return`${t.getFullYear()}-${r(t.getMonth()+1)}-${r(t.getDate())} ${r(t.getHours())}:${r(t.getMinutes())}`}var Bp={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},jp={command_execution:"\uBA85\uB839 \uC2E4\uD589",file_change:"\uD30C\uC77C \uBCC0\uACBD",mcp_call:"MCP \uD638\uCD9C",web_search:"\uC6F9 \uAC80\uC0C9",plan:"\uACC4\uD68D"},Up=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,Wp=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function sr(e){return!!e&&typeof e=="object"}function Fo(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function yl(e,t){let r=Fo(e),n=Fo(t),s=new Map;for(let l of r)s.set(l,(s.get(l)||0)+1);let o=0;for(let l of n){let c=s.get(l)||0;c>0?s.set(l,c-1):o+=1}let a=0;for(let l of s.values())a+=l;return{added:o,removed:a}}function zp(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(s=>sr(s)&&typeof s.text=="string"?s.text:"").join(""):sr(e)&&typeof e.text=="string"&&(t=e.text);let n=(String(t).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return n.length>120?`${n.slice(0,117)}\u2026`:n}function Hp(e){let t=String(e.name||""),r=e.input||{},n={kind:"tool",tool:t,icon:Bp[t]||"\u{1F527}",input:r,expandable:!0};if((t==="Read"||t==="Write")&&(n.path=String(r.file_path||r.path||"")),t==="Write"&&(n.added=Fo(r.content).length),t==="Edit"){n.path=String(r.file_path||r.path||"");let{added:s,removed:o}=yl(r.old_string,r.new_string);n.added=s,n.removed=o}if(t==="MultiEdit"){n.path=String(r.file_path||r.path||"");let s=0,o=0,a=Array.isArray(r.edits)?r.edits:[];for(let l of a){let c=yl(sr(l)?l.old_string:"",sr(l)?l.new_string:"");s+=c.added,o+=c.removed}n.added=s,n.removed=o}return t==="Bash"&&(n.command=String(r.command||"")),(t==="Grep"||t==="Glob")&&(n.command=String(r.pattern||r.query||"")),n}function qo(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}function Bo(e){let t=e.split(/\r?\n/).find(n=>n.trim().length>0)||"",r=Up.exec(t);return r?{kind:"gate",gate:r[2]==="implementation"?"impl":r[2],reviewer:r[3],verdict:r[4],time:r[5]?r[5].trim():void 0,text:t.trim()}:Wp.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function Gp(e,t){if(e.type==="assistant"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[],s=[];for(let o of n)if(sr(o)){if(o.type==="text"&&typeof o.text=="string")s.push(Bo(o.text));else if(o.type==="thinking"){let a=qo(o.thinking);a&&s.push(a)}else if(o.type==="tool_use"){let a=Hp(o);typeof o.id=="string"&&t.set(o.id,a),s.push(a)}}return s}if(e.type==="user"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[];for(let s of n)if(sr(s)&&s.type==="tool_result"){let o=t.get(String(s.tool_use_id));if(o){let a=zp(s.content);o.result=a,o.output=typeof s.content=="string"?s.content:a}}return[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success";return[{kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""}]}return[]}function Vp(e){if(e.type==="item.completed"&&sr(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[Bo(t.text)];if(t.type==="reasoning"){let r=qo(t.text);return r?[r]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function Yp(e){if(e.schema!=="codex-delegation-monitor-v1"||!sr(e.event))return[];let t=e.event;if(t.type==="session.started"||t.type==="turn.started")return[];if((t.type==="item.started"||t.type==="item.completed")&&sr(t.item)){let r=t.item;if(typeof r.id!="string"||r.id.length===0)return[];if(t.type==="item.completed"&&r.kind==="agent_message"&&typeof r.text=="string"&&r.text.trim().length>0)return[Bo(r.text)];if(t.type==="item.completed"&&r.kind==="reasoning"){let l=qo(r.text);return l?[l]:[]}if(r.kind!=="activity"||typeof r.activity!="string")return[];let n=jp[r.activity];if(!n)return[];let s="\uC2DC\uC791",o="\u2026",a={kind:"tool",tool:"",icon:o,expandable:!1};if(t.type==="item.completed"){if(r.status==="completed")s="\uC644\uB8CC",o="\u2713";else if(r.status==="failed")s="\uC2E4\uD328",o="\u2717";else return[];a.result=""}return a.tool=`${n} \xB7 ${s}`,a.icon=o,[a]}return t.type==="turn.completed"&&t.status==="completed"?[{kind:"result",success:!0,text:"DONE"}]:t.type==="turn.failed"&&(t.status==="failed"||t.status==="interrupted")&&typeof t.error_code=="string"&&t.error_code.length>0?[{kind:"error",text:t.error_code}]:[]}function Kp(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function vl(e){let t=[],r=new Map,n=Array.isArray(e)?e:[];for(let s of n){let o=s;if(typeof s=="string"){let l=s.trim();if(l.length===0)continue;try{o=JSON.parse(l)}catch{continue}}if(!sr(o))continue;let a=o.schema==="codex-delegation-monitor-v1"?Yp(o):Kp(o)?Vp(o):Gp(o,r);for(let l of a)t.push(l)}return t}var Zp=5,Xp=10,Qp=/Task\s+#(\d+)/,Jp=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,ef=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function vs(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function tf(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function rf(e){for(let t=e.length-1;t>=0;t-=1){let r=e[t];if(r.kind==="phase"||r.kind==="gate")return r.text||null}return null}function nf(e){let t=new Map,r=0;for(let s of e){if(s.kind!=="tool")continue;r+=1;let o=s.input||{};if(s.tool==="TaskCreate"){let c=Qp.exec(s.output||s.result||""),u=String(o.activeForm||o.subject||"").trim();if(!c||u.length===0)continue;t.set(c[1],{label:u,active:o.status==="in_progress"?r:0});continue}if(s.tool!=="TaskUpdate")continue;let a=t.get(String(o.taskId??""));if(!a)continue;let l=o.activeForm||o.subject;typeof l=="string"&&l.trim().length>0&&(a.label=l.trim()),typeof o.status=="string"&&(a.active=o.status==="in_progress"?r:0)}let n=null;for(let s of t.values())s.active>0&&(!n||s.active>n.active)&&(n=s);return n?n.label:null}function sf(e){if(e.tool==="Bash"){let t=e.command||"";return Jp.test(t)?"~ PR/\uAC8C\uC2DC \uC911":ef.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function of(e){let t=e.filter(s=>s.kind==="tool").slice(-Xp),r=new Map;t.forEach((s,o)=>{let a=sf(s);if(!a)return;let l=r.get(a)||{count:0,last:-1};l.count+=1,l.last=o,r.set(a,l)});let n=null;for(let[s,o]of r)(!n||o.count>n.count||o.count===n.count&&o.last>n.last)&&(n={label:s,count:o.count,last:o.last});return n?n.label:null}function af(e){let t=rf(e);if(t)return{text:t,guess:!1};let r=nf(e);if(r)return{text:r,guess:!1};let n=of(e);return n?{text:n,guess:!0}:null}function lf(e,t){if(typeof e!="number")return"";let r=Math.max(0,Math.floor((t-e)/1e3));return r<60?`${r}\uCD08 \uC804`:Lt(e,t)}function ws(e,t={}){let{transport:r,sessionLogStore:n,onClose:s}=t,o=null,a=null,l=null,c={},u=!0,f=new Set,_=new Set,b=null,A=null,k=!1,M=!1,P=!1,S=null,U=null;function Q(){k=!1,M=!1,P=!1,S=null,U=null}async function x(W){if(r){M=!0,P=!1,xe();try{let j=await Promise.resolve(r("get-attempt-prompt",{attempt_id:W}));if(o!==W)return;!j||typeof j!="object"||Array.isArray(j)?P=!0:(S=j,U=W)}catch{o===W&&(P=!0)}finally{o===W&&(M=!1,xe())}}}function w(){if(k=!k,k&&o&&U!==o){x(o);return}xe()}function C(){if(!k)return"";let W=Qr({loading:M,error:P});if(W)return i`<div class="sv__prompt" data-seam="attempt-prompt">
        ${W}
      </div>`;if(!S)return"";if(S.missing)return i`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let j=ys(S.recorded_at);return i`<div class="sv__prompt" data-seam="attempt-prompt">
      ${j?i`<div class="prompt-block__meta">${j} 발송</div>`:""}
      ${typeof S.task_prompt=="string"?_r("\uACFC\uC5C5 (user)",S.task_prompt):""}
      ${typeof S.system_prompt=="string"?_r("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",S.system_prompt):""}
    </div>`}function N(){if(!l||!n)return[];let W=n.get(l);return vl(W?W.lines:[])}function J(){if(!l||!n)return null;let W=n.get(l),j=W?W.last_event_at:null;return typeof j=="number"?j:null}function fe(){return c.status==="running"}function ce(){if(fe()&&o){A||(A=setInterval(()=>xe(),1e3));return}ie()}function ie(){A&&(clearInterval(A),A=null)}function le(W){let j=[],E=0;for(;E<W.length;){let H=W[E];if(H.kind==="tool"){let R=E;for(;R<W.length&&W[R].kind==="tool"&&W[R].tool===H.tool;)R+=1;if(R-E>=Zp&&!_.has(E)){j.push({kind:"group",idx:E,tool:H.tool||"",lines:W.slice(E,R).map((Y,K)=>({idx:E+K,line:Y}))}),E=R;continue}}j.push({kind:"line",idx:E,line:H}),E+=1}return j}function Fe(W){for(let j=W.length-1;j>=0;j-=1){let E=W[j];if(E.kind==="result"||E.kind==="error")return null;if(E.kind==="tool"&&!Object.hasOwn(E,"result"))return E}return null}function Ue(W){for(let j=W.length-1;j>=0;j-=1)if(W[j].kind==="thinking")return W[j];return null}function ze(W,j){if(j.kind==="gate")return i`<div class="sv__gate">${j.text}</div>`;if(j.kind==="phase")return i`<div class="sv__phase">${j.text}</div>`;if(j.kind==="result")return i`<div
        class="sv__result${j.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${j.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${kr(j.text||(j.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(j.kind==="thinking"){let E=f.has(W);return i`<div
        class="sv__think${E?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>Ae(W)}
      >
        <span class="sv__think-line">💭 ${vs(j.text)}</span>
        ${E?i`<pre class="sv__think-expand">${j.text}</pre>`:""}
      </div>`}if(j.kind==="error")return i`<div class="sv__error">⛔ ${j.text}</div>`;if(j.kind==="blocker")return i`<div class="sv__error">⛔ ${j.text}</div>`;if(j.kind==="tool"){let E=f.has(W),H=j.tool==="Bash"?tf(j.command):0,R=j.tool==="Bash"?H>1?vs(j.command):j.command:j.path||j.command||"";return i`<div
        class="sv__tool${E?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>Ae(W)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${j.icon}</span>
          <span class="sv__tool-name">${j.tool}</span>
          ${R?i`<span class="sv__tool-detail">${R}</span>`:""}
          ${H>1?i`<span class="sv__tool-more">⋯ ${H}줄</span>`:""}
          ${typeof j.added=="number"?i`<span class="sv__diff-add">+${j.added}</span>`:""}
          ${typeof j.removed=="number"?i`<span class="sv__diff-del">−${j.removed}</span>`:""}
          ${j.result?i`<span class="sv__tool-ok">→ ${j.result}</span>`:""}
        </span>
        ${E?i`<pre class="sv__tool-expand">${Ye(j)}</pre>`:""}
      </div>`}return i`<div class="sv__as">${kr(j.text||"")}</div>`}function Ye(W){let j=[];if(W.tool==="Bash"&&typeof W.command=="string"&&W.command.length>0)j.push(W.command);else if(W.input!==void 0)try{j.push(`input: ${JSON.stringify(W.input,null,2)}`)}catch{}return typeof W.output=="string"&&W.output.length>0&&j.push(`output:
${W.output}`),j.join(`

`)}function He(){if(!o)return i``;let W=N(),j=(a?[c.model]:[c.runner,c.model,c.effort]).filter(Boolean).join(" \xB7 "),E=c.session_id||"",H=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${u?"ON":"OFF"}`,R=fe(),Y=R?lf(J(),Date.now()):"",K=R?Fe(W):null,ue=R?Ue(W):null,pe=af(W);return i`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id">${a?c.role||"":o}</span>
        ${pe?i`<span
              class="sv__stage${pe.guess?" sv__stage--guess":""}"
              title=${pe.text}
              >${pe.text}</span
            >`:""}
        ${R?i`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${Y?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${Y}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${Y?i`<span class="sv__live-ago">${Y}</span>`:""}</span
            >`:""}
        ${E?i`<button
              type="button"
              class="sv__session"
              title=${E}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${E}`}
              @click=${()=>ne(E)}
            >
              ⧉ ${E.slice(0,8)}
            </button>`:""}
        ${j?i`<span class="sv__meta">${j}</span>`:""}
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
          aria-label=${H}
          @click=${_e}
        >
          <span class="sv__follow-full">⇣ ${H}</span>
          <span class="sv__follow-short">⇣ ${u?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>ee()}
        >
          ✕
        </button>
      </div>
      ${a?"":C()}
      <div class="sv__body">
        ${W.length===0?i`<div class="sv__empty">세션 로그 없음</div>`:le(W).map(ye=>ye.kind==="group"?Ge(ye):ze(ye.idx,ye.line))}
      </div>
      ${K||ue?i`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${K?i`<span class="sv__now-icon">${K.icon}</span>
                  <span class="sv__now-name">${K.tool}</span>
                  <span class="sv__now-detail"
                    >${K.tool==="Bash"?vs(K.command):K.path||K.command||""}</span
                  >`:""}
            ${ue?i`<span class="sv__now-think"
                  >💭 ${vs(ue.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function Ge(W){return i`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>ge(W.idx)}
    >
      <span class="sv__group-icon">${W.lines[0].line.icon}</span>
      <span class="sv__group-name">${W.tool}</span>
      <span class="sv__group-count">${W.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function ge(W){_.add(W),xe()}function xe(){je(He(),e),ce(),u&&ke()}function ke(){let W=e.querySelector(".sv__body");W&&(W.scrollTop=W.scrollHeight)}function Ae(W){f.has(W)?f.delete(W):f.add(W),xe()}function _e(){u=!u,xe()}function ne(W){lr(W).then(j=>{j?de("\uBCF5\uC0AC\uB428","success",1200):de("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function G(W){!o||!W||(c={...c,...W},xe())}function $e(W){let j=W.target;if(!j||!j.classList||!j.classList.contains("sv__body"))return;!(j.scrollHeight-j.scrollTop-j.clientHeight<=4)&&u&&(u=!1,xe())}e.addEventListener("scroll",$e,!0);function be(W){let j=W&&W.attempt_id;if(!j)return;let E=l;o=j,a=typeof W.launch_id=="string"&&W.launch_id.length>0?W.launch_id:null,l=a?`session-log:${o}:${a}`:`session-log:${o}`,r&&E&&E!==l&&Promise.resolve(r("unsubscribe-session-log",{id:E})).catch(()=>{}),c=W.meta||{},u=!0,f.clear(),_.clear(),Q(),!b&&n&&(b=n.subscribe(xe)),r&&Promise.resolve(r("subscribe-session-log",{id:l,attempt_id:o,...a?{launch_id:a}:{}})).catch(()=>{}),xe()}function ee(){let W=l;o=null,a=null,l=null,f.clear(),_.clear(),Q(),ie(),r&&W&&Promise.resolve(r("unsubscribe-session-log",{id:W})).catch(()=>{}),je(i``,e),s&&s()}return{open:be,updateMeta:G,close:ee,isOpen(){return o!==null},destroy(){ie(),b&&(b(),b=null),e.removeEventListener("scroll",$e,!0),o=null,a=null,l=null,je(i``,e)}}}function kn(e){let t=e&&typeof e=="object"?e:{},r=t.metadata&&typeof t.metadata=="object"?t.metadata:{},n=wl(t.spec_id),s=wl(r.spec_id);return n?{path:n,source:"native",conflict:s.length>0&&s!==n}:s?{path:s,source:"metadata",conflict:!1}:{path:"",source:"none",conflict:!1}}function wl(e){return typeof e=="string"?e.trim():""}function cf(e){return["plan_review","plan_approval","plan_check"].some(t=>{let r=e[t];return typeof r=="string"&&r.trim().length>0})}function df(e){let t=e&&e.metadata||{},r=kn(e),n=[];return r.path&&n.push({kind:"spec",path:r.path,missing_state:null}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&n.push({kind:"plan",path:t.plan_path.trim(),missing_state:cf(t)?null:"plan_pending"}),n}function kl(e,t){let r=df(e);return i`
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
  `}var uf="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",pf=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,ff=/^\*\*결론\*\* — (.+)$/;function ks(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==uf)return null;let r=pf.exec(t[1]||"");if(!r)return null;let n=r[1].split(" ")[0],s=r[2],o=r[3],a=2;for(;a<t.length&&t[a].trim().length===0;)a+=1;let l=a<t.length?ff.exec(t[a]):null,c=l?l[1].replace(/\s+/g," ").trim():"",u=l?a+1:a;return{lane:n,identifier:s,timestamp:o,conclusion:c,body:t.slice(u).join(`
`).trim()}}var $l=20;function xl(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let r=String(t.getMonth()+1).padStart(2,"0"),n=String(t.getDate()).padStart(2,"0"),s=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0");return`${r}-${n} ${s}:${o}`}function _f(e){return e.length>$l?`${e.slice(0,$l)}\u2026`:e}function mf(e,t,r,n){let s=`${t.lane} ${_f(t.identifier)}`;return i`<div class="detail-report">
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
        <span class="detail-report__time">${xl(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${n&&t.body.length>0?i`<div class="detail-report__body">
          ${kr(t.body)}
        </div>`:""}
  </div>`}function gf(e){return i`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${xl(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${kr(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function Sl(e,t={},r={}){let n=Array.isArray(e)?e.filter(Boolean):[],s=r.expanded||new Set,o=typeof r.draft=="string"?r.draft:"",a=r.sending===!0,l=n.slice().sort((c,u)=>String(u.created_at||"").localeCompare(String(c.created_at||"")));return i`
    <div class="detail-section-label">댓글 (${n.length})</div>
    ${r.error?i`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:l.length===0?i`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:i`<div class="detail-comments" data-seam="comments">
            ${l.map(c=>{let u=ks(typeof c.text=="string"?c.text:"");return u?mf(c,u,t,s.has(c.id)):gf(c)})}
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
  `}var{I:Mb}=Ja;var Al=e=>e.strings===void 0;var bf={},El=(e,t=bf)=>e._$AH=t;var Nr=us(class extends Xr{constructor(e){if(super(e),e.type!==pr.PROPERTY&&e.type!==pr.ATTRIBUTE&&e.type!==pr.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!Al(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===Dt||t===ct)return t;let r=e.element,n=e.name;if(e.type===pr.PROPERTY){if(t===r[n])return Dt}else if(e.type===pr.BOOLEAN_ATTRIBUTE){if(!!t===r.hasAttribute(n))return Dt}else if(e.type===pr.ATTRIBUTE&&r.getAttribute(n)===t+"")return Dt;return El(e),t}});var jo=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"],$s=["orchestration_model","orchestration_effort","orchestration_speed"],Tl=["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"],xs=["delegated","main"],Ss=["inherit","claude","codex"],$n=["default","fast"],As=["standard","fast_track"],xn=["codex","opus","fable","self","skip"],Es=["codex","fable","skip"],Ts=["low","medium","high","xhigh"],qt="auto";function mr(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Cl(e){if(!mr(e)||!mr(e.runners))return[];let t=[];for(let[r,n]of Object.entries(e.runners))mr(n)&&mr(n.models)&&t.push([r,Object.keys(n.models)]);return t}function Rl(e){return e?.impl_dispatch==="main"}function Cs(e,t){let r=Cl(e),n=t&&t!=="inherit"?r.filter(([s])=>s===t):r;return[qt,...n.flatMap(([,s])=>s)]}function Jr(e,t,r){if(!mr(e)||!mr(e.runners))return[qt];let n=[];for(let[s,o]of Object.entries(e.runners))if(!(!mr(o)||!mr(o.models))&&!(t&&t!=="inherit"&&s!==t))for(let[a,l]of Object.entries(o.models)){if(r&&r!==qt&&a!==r)continue;let c=mr(l)?l.efforts:null;if(Array.isArray(c))for(let u of c)typeof u=="string"&&!n.includes(u)&&n.push(u)}return[qt,...n]}function Rs(e,t){let r=Cl(e);return(t?r.filter(([s])=>s===t):r).flatMap(([,s])=>s)}function Il(e,t){let r={};for(let n of jo){let s=e?.[n],o=t?.[n];s!==o&&(r[n]=typeof o=="string"&&o.length>0?o:null)}return r}function Ll(e,t){let r={};for(let n of $s){let s=e?.[n]??null,o=t?.[n]??null;s!==o&&(r[n]=typeof o=="string"&&o.length>0?o:null)}return r}var Uo=[{id:"workflow",label:"\uC6CC\uD06C\uD50C\uB85C\uC6B0",keys:["workflow_mode"]},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort"]},{id:"implementation",label:"\uAD6C\uD604",keys:["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]},{id:"worker",label:"Worker",keys:[...$s]}],Wo={workflow_mode:"\uBAA8\uB4DC",spec_review_model:"\uC0AC\uC591 \uB9AC\uBDF0",spec_review_effort:"\uC0AC\uC591 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_dispatch:"\uC2E4\uD589 \uBC29\uC2DD",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uBAA8\uB378",impl_effort:"effort",impl_speed:"\uC18D\uB3C4",orchestration_model:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",orchestration_effort:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",orchestration_speed:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4"},Pl={pin:"\uD540",global:"\uC804\uC5ED",base:"\uAE30\uBCF8"};function Ol(e){return typeof e=="string"&&e.length>0?e:null}function hf(e,t,r){let n=Ol(t?.[e]);if(n!==null)return{value:n,source:"pin"};let s=Ol(r?.[e]);return s!==null?{value:s,source:"global"}:{value:null,source:"base"}}function Is(e,t,r){return e.map(n=>({key:n,...hf(n,t,r)}))}function Dl(e,t,r){let n={pin:0,global:0,base:0};for(let s of Is(e,t,r))n[s.source]+=1;return n}function Ml(e,t,r){return{id:e,key:t,value:typeof r=="string"?r:""}}function Nl(e,t,r){return typeof t!="string"||t.length===0?null:{id:e,preset_id:t,expected_revision:r}}var Hb=[...jo,...$s];var yf=[{id:"spec",label:"spec \uB9AC\uBDF0",receipt:"spec_review"},{id:"impl",label:"\uAD6C\uD604",receipt:null},{id:"impl_review",label:"impl \uB9AC\uBDF0",receipt:"impl_review"},{id:"pr",label:"PR",receipt:null}],vf={pin:"pin",global:"global",base:"base"};function wf(e){return i`<span
    class=${`detail-layer-rail detail-layer-rail--${vf[e]}`}
    data-source=${e}
    aria-hidden="true"
    ><i></i><i></i><i></i
  ></span>`}function kf(e,t,r){switch(e){case"workflow_mode":return As;case"spec_review_model":case"impl_review_model":return xn;case"plan_review_model":return Es;case"spec_review_effort":case"plan_review_effort":case"impl_review_effort":return Ts;case"impl_dispatch":return xs;case"impl_runtime":return Ss;case"impl_model":return Cs(r,t.impl_runtime);case"impl_effort":return Jr(r,t.impl_runtime,t.impl_model);case"impl_speed":case"orchestration_speed":return $n;case"orchestration_model":return Rs(r,null);case"orchestration_effort":return Jr(r,void 0,t.orchestration_model||qt).filter(n=>n!==qt);default:return[]}}function $f(e,t){return i`<div class="detail-effective__row" data-key=${e.key}>
    ${wf(e.source)}
    <span class="detail-effective__k"
      >${Wo[e.key]||e.key}</span
    >
    <span
      class=${`detail-effective__v${e.source==="base"?" detail-effective__v--dim":""}`}
      >${e.value??"(harness \uAE30\uBCF8)"}</span
    >
    <span
      class=${`detail-effective__badge detail-effective__badge--${e.source}`}
      >${Pl[e.source]}</span
    >
    ${t.expanded?i`<select
          class="detail-effective__edit"
          data-edit-key=${e.key}
          aria-label=${`${Wo[e.key]||e.key} \uD3B8\uC9D1`}
          @change=${r=>{let n=String(r.target.value);t.onEdit(e.key,n.length===0?null:n)}}
        >
          <option value="" ?selected=${e.source!=="pin"}>(기본)</option>
          ${t.options.map(r=>i`<option
                value=${r}
                ?selected=${e.source==="pin"&&e.value===r}
              >
                ${r===qt?"\uC790\uB3D9":r}
              </option>`)}
        </select>`:""}
  </div>`}function Fl(e,t){let r=Uo.flatMap(o=>o.keys),n=Dl(r,e.metadata,e.workspace_values),s={};for(let o of Is(r,e.metadata,e.workspace_values))o.value!==null&&(s[o.key]=o.value);return i`<section
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
      <span class="detail-effective__summary">${xf(s)}</span>
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
      ${Uo.map(o=>i`
          <div class="detail-effective__subhead">${o.label}</div>
          ${Is(o.keys,e.metadata,e.workspace_values).map(a=>$f(a,{expanded:e.expanded,options:kf(a.key,s,e.catalog),onEdit:t.onEdit}))}
        `)}
      <div class="detail-effective__foot">
        <select
          data-impl-preset-select
          aria-label="구현 프리셋"
          .value=${Nr(e.preset_id)}
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
  </section>`}function xf(e){let t=[];if(typeof e.workflow_mode=="string"&&t.push(String(e.workflow_mode)),e.impl_dispatch==="main")t.push("\uBA54\uC778");else if(e.impl_dispatch==="delegated"){let r=typeof e.impl_runtime=="string"?` ${e.impl_runtime}`:"";t.push(`\uC704\uC784${r}`)}else typeof e.impl_runtime=="string"&&t.push(`\uC704\uC784 ${e.impl_runtime}`);return typeof e.impl_model=="string"&&t.push(String(e.impl_model)),t.length>0?t.join(" \xB7 "):"\uAE30\uBCF8"}function ql(e){let t=e&&typeof e.metadata=="object"&&e.metadata?e.metadata:{},r=e&&typeof e.workflow=="object"&&e.workflow?e.workflow:{},n=r.stages||{},s=r.route||t.route||null,o=typeof t.pr_url=="string"?t.pr_url:"",a=typeof t.exec_receipt=="string"?t.exec_receipt:"",l=ss(r.planned_execution,r.exec_receipt);return i`<section class="detail-summary" data-seam="detail-summary">
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
      ${yf.map(c=>{let u=c.receipt&&typeof t[c.receipt]=="string"?String(t[c.receipt]):"",f=n[c.id],_=u.length>0||f?.fill==="full",b=!_&&f?.fill==="dim",A=f?.stale===!0;return i`<span
          class=${`detail-summary__gate${_?" detail-summary__gate--on":""}${b?" detail-summary__gate--current":""}${A?" detail-summary__gate--stale":""}`}
          data-gate=${c.id}
        >
          <span class="detail-summary__gate-pill">${c.label}</span>
          ${u?i`<span class="detail-summary__gate-sha"
                >${u.split("@")[1]?.slice(0,7)||""}</span
              >`:""}
        </span>`})}
    </div>
  </section>`}var Bl=["orchestration_model","orchestration_effort","orchestration_speed","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_runtime","impl_model","impl_effort"];function Sn(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Ls(e){if(!Sn(e)||!Sn(e.runners))return null;let t=Object.entries(e.runners).filter(([,r])=>Sn(r)&&Sn(r.models));return t.length>0?t:null}function zo(e,t){let r=Ls(e);if(!r||!t)return null;for(let[n,s]of r)if(Object.hasOwn(s.models,t))return n;return null}function jl(e,t){return Sn(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function Ul(e,t){let r=Ls(e);if(!r||!t)return[];for(let[,n]of r)if(Object.hasOwn(n.models,t))return jl(n,n.models[t]);return[]}function Sf(e){let t=Ls(e);if(!t)return[];let r=[];for(let[,n]of t)for(let s of Object.values(n.models))for(let o of jl(n,s))r.includes(o)||r.push(o);return r}function Af(e,t){if(!t)return Sf(e);let n=Ls(e)?.find(([o])=>o===t)?.[1];if(!n)return[];let s=[];for(let o of Object.keys(n.models))for(let a of Ul(e,o))s.includes(a)||s.push(a);return s}function Wl(e,t,r){let n={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},s=n.impl_runtime==="inherit"?r:n.impl_runtime==="claude"||n.impl_runtime==="codex"?n.impl_runtime:null;if(n.impl_runtime==="inherit"&&!s)return n.impl_model="",n.impl_effort="",n;let o=zo(t,n.impl_model);if(n.impl_model&&(!s||o!==s))return n.impl_model="",n.impl_effort="",n;let a=n.impl_model?Ul(t,n.impl_model):Af(t,s);return n.impl_effort&&a.length>0&&!a.includes(n.impl_effort)&&(n.impl_effort=""),n}function Ef(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function zl(e,t){let r=t.getWorkspacePath,n=t.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",a="",l="";function c(k){k.key==="Escape"&&s&&(k.preventDefault(),b())}document.addEventListener("keydown",c);function u(){return s?i`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>b()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${Ef(s)}</span
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
                    </div>`:kr(a)}
          </div>
        </div>
      </div>
    `:i``}function f(){je(u(),e)}async function _(k,M={}){s=k,o="loading",a="",l="",f();let P=r?r():"";if(!P){o="error",l="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",f();return}if(!n){o="error",l="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",f();return}let S="/api/doc?workspace="+encodeURIComponent(P)+"&path="+encodeURIComponent(k);try{let U=await n(S),Q=await U.json().catch(()=>({}));if(!U.ok||!Q||Q.ok!==!0){if(Q?.error==="not_found"&&M.missing_state==="plan_pending"){o="pending",l="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",f();return}o="error",l="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(Q&&Q.error||U.status)+")",f();return}a=String(Q.content||""),o="ready",f()}catch{o="error",l="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",f()}}function b(){s=null,je(i``,e)}function A(){document.removeEventListener("keydown",c),b()}return{open:_,close:b,destroy:A}}var Tf=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],Gl="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",Os=["implementation","review-consult"],Cf=["running","done","failed","interrupted"],Rf={running:"\u25CF",done:"\u2713",failed:"\u2717",interrupted:"\u26A0"};function If(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function Lf(e){let t=gt(e);if(t.length>0)return t.map(s=>i`<span class="detail-usage-total" title=${s.tooltip}
          >${s.label}</span
        >`);let r=Kr(e);if(!r||!e)return"";let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return i`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${r.replace(/^τ /,"\u03C4 \uCD1D ")}${n}</span
    >${e.replayed?i`<span class="detail-usage-partial" title=${Gl}
          >부분 집계</span
        >`:""}`}function Hl(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function Ho(e){if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?Go(t):""}function Of(e){if(!e||typeof e!="object"||Array.isArray(e))return null;let t=e;return typeof t.launch_id!="string"||t.launch_id.length===0||t.provider!=="codex"||!Os.includes(t.role)||typeof t.model!="string"||t.model.length===0||typeof t.session_id!="string"||t.session_id.length===0||!Cf.includes(t.status)||typeof t.started_at!="number"||!Number.isFinite(t.started_at)||typeof t.last_event_at!="number"||!Number.isFinite(t.last_event_at)||!(t.completed_at===null||typeof t.completed_at=="string"&&Number.isFinite(Date.parse(t.completed_at)))||!(t.turn_id===null||typeof t.turn_id=="string")?null:t}function Pf(e,t){let n=gt({providers:{codex:{subtotal:t.subtotal,breakdown:t.usage,...t.replayed?{replayed:!0}:{}}},roles:{}})[0];return i`<div class="detail-session__leg detail-session__usage-detail">
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
    ${Ho(t.completed_at)?i`<span class="detail-session__leg-time detail-session__time"
          >${Ho(t.completed_at)}</span
        >`:""}
    ${n?i`<span class="detail-session__usage" title=${n.tooltip}
          >${n.label}</span
        >`:""}
  </div>`}function Df(e,t,r,n){let s=e.status==="running"?null:t,a=(s?gt({providers:{codex:{subtotal:s.subtotal,breakdown:s.usage,...s.replayed?{replayed:!0}:{}}},roles:{}}):[])[0],l=e.status==="running"?Go(e.last_event_at):s?Ho(s.completed_at):"";return i`<button
    type="button"
    class="detail-session__leg detail-session__usage-detail detail-session__leg--${e.status}"
    data-launch-id=${e.launch_id}
    @click=${()=>n.onOpenDelegation&&n.onOpenDelegation(r,e.launch_id)}
  >
    <span class="detail-session__leg-glyph" aria-hidden="true"
      >${Rf[e.status]}</span
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
  </button>`}function Mf(e,t){return e.role===t.role&&e.model===t.model&&e.session_id===t.session_id}function Nf(e,t,r){let n=[],s=new Set,o=Array.isArray(e.delegation_sessions)?e.delegation_sessions:[];for(let f of o){let _=Of(f);!_||s.has(_.launch_id)||(s.add(_.launch_id),n.push(_))}n.sort((f,_)=>f.started_at-_.started_at);let a={implementation:[],"review-consult":[]};if(t)for(let f of Os){let _=t.roles[f]?.codex;a[f]=_?[..._.legs]:[]}let l=Os.flatMap(f=>a[f]),c=new Set,u=[];for(let f of Os){for(let _ of n.filter(b=>b.role===f)){let b=l.find(A=>A.receipt_id===_.launch_id)||null;b&&!Mf(_,b)||(b&&c.add(b.receipt_id),u.push(Df(_,b,e.attempt_id,r)))}for(let _ of a[f])c.has(_.receipt_id)||u.push(Pf(f,_))}return u}function Ff(e,t){let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,n=[...Tf,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return i`<div class="detail-session__usage-detail">
    ${n.map(s=>i`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${s.label}</span
          ><span class="detail-session__usage-value"
            >${If(e[s.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${r===null?"":i`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${r.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?i`<span class="detail-session__usage-note">${Gl}</span>`:""}
  </div>`}var qf={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function Go(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=String(t.getHours()).padStart(2,"0"),n=String(t.getMinutes()).padStart(2,"0");return`${r}:${n}`}function Bf(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,n])=>typeof n=="string"&&n.length>0).map(([n,s])=>`${n}=${s}`).join(" \xB7 "):"",r=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return i`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${r}</span>
    ${t?i`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}function Vl(e,t={},r={}){let n=Array.isArray(e)?e:[],s=r.expanded||new Set;if(n.length===0)return i`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let o=new Set;for(let u of n)u&&typeof u.resumed_from=="string"&&u.resumed_from.length>0&&o.add(u.resumed_from);let a=u=>{if(!(u.status==="failed"||u.status==="orphaned"))return"";let _=typeof u.session_id=="string"&&u.session_id.length>0,b=o.has(u.attempt_id),A=_&&!b,k=_?b?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return i`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${u.attempt_id}
      ?disabled=${!A}
      title=${k}
      @click=${M=>{M.stopPropagation(),A&&t.onResume&&t.onResume(u.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},l=u=>{if(!(u.status==="failed"||u.status==="orphaned")||typeof u.cause!="string"||u.cause==="")return"";let _=u.cause_detail,b=_&&typeof _.reason=="string"&&_.reason.length>0?typeof _.command=="string"&&_.command.length>0?`${_.reason} \xB7 ${_.command}`:_.reason:u.cause;return i`<div class="detail-session__cause" title=${b}>
      ${u.cause}
    </div>`},c=u=>{let f=Hl(go(u));if(gt(f).length===0&&!Kr(u.usage))return"";let _=s.has(u.attempt_id);return i`<button
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
      세션 이력${Lf(r.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${n.map(u=>{let f=go(u),_=Hl(f),b=gt(_);return i`<div class="detail-session-row">
          <button
            type="button"
            class="detail-session detail-session--${u.status||"unknown"}"
            data-attempt-id=${u.attempt_id}
            @click=${()=>t.onOpen&&t.onOpen(u.attempt_id)}
          >
            <span class="detail-session__glyph"
              >${qf[u.status||""]||"\xB7"}</span
            >
            <span class="detail-session__id">${u.attempt_id}</span>
            ${vr(u)?i`<span
                  class="detail-session__resumed"
                  title=${vr(u)}
                  >↻</span
                >`:""}
            <span class="detail-session__meta">${nr(u)}</span>
            ${b.length>0?i`<span class="detail-session__role">orchestrator</span>`:""}
            ${u.session_id?i`<span class="detail-session__sid" title=${u.session_id}
                  >${String(u.session_id).slice(0,8)}</span
                >`:""}
            ${b.length>0?b.map(A=>i`<span
                      class="detail-session__usage"
                      title=${A.tooltip}
                      >${A.label}</span
                    >`):Kr(u.usage)?i`<span class="detail-session__usage"
                    >${Kr(u.usage)}</span
                  >`:""}
            <span class="detail-session__time">${Go(u.started_at)}</span>
          </button>
          ${c(u)} ${a(u)} ${l(u)} ${Bf(u)}
          ${s.has(u.attempt_id)&&u.usage?Ff(u.usage,u.runner==="codex"?"codex":"claude"):""}
          ${Nf(u,f,t)}
        </div>`})}
    </div>
  `}function Yl(e,t={}){return i`
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
          ${jf(e)}
        </div>`:""}
  `}function jf(e){let t=Qr(e);if(t)return t;let r=e.data;if(!r)return"";if(r.missing)return i`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof r.default_task_prompt=="string"?_r("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",r.default_task_prompt):""}`;let n=ys(r.recorded_at);return i`<div class="detail-prompt__meta">
      ${r.attempt_id}${n?` \xB7 ${n}`:""}
    </div>
    ${typeof r.task_prompt=="string"?_r("\uACFC\uC5C5 (user)",r.task_prompt):""}
    ${typeof r.system_prompt=="string"?_r("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",r.system_prompt):""}`}var Uf=["open","in_progress","deferred","resolved","closed"],Wf=[0,1,2,3,4];function Kl(e,t){let r=t.issueStores,n=t.onClose,s=t.transport,o=t.onNavigate,a=t.queueStore,l=t.execPresetStore,c=t.sessionLogStore,u=null,f=null,_={},b="",A=!1,k=!1,M={},P=!1,S=!1,U="",Q="",x="";function w(){P=!1,S=!1,U="",Q="",x=""}let C=[],N=null,J=null,fe=!1,ce="",ie=!1,le=0,Fe=new Set;function Ue(){C=[],N=null,J=null,fe=!1,ce="",ie=!1,le+=1,Fe.clear()}async function ze(d){if(!s)return;let m=++le;try{let h=await Promise.resolve(s("get-comments",{id:d}));if(m!==le||d!==u)return;C=Array.isArray(h)?h:[],fe=!1}catch{if(m!==le||d!==u)return;fe=!0}Se()}function Ye(){if(!s||!u)return;let d=f&&typeof f.comment_count=="number"?f.comment_count:null;if(N!==u){N=u,J=d,ze(u);return}d!==null&&d!==J&&(J=d,ze(u))}function He(d){Fe.has(d)?Fe.delete(d):Fe.add(d),Se()}function Ge(d){let m=ce.trim().length===0;ce=d,m!==(d.trim().length===0)&&Se()}async function ge(){let d=ce.trim();if(!s||!u||d.length===0||ie)return;let m=u;ie=!0,Se();let h=!1;try{let O=await Promise.resolve(s("add-comment",{id:m,text:d}));Array.isArray(O)&&O.length>0&&(h=!0,m===u&&(C=O,fe=!1,ce="",J=O.length))}catch{h=!1}h||de("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),m===u&&(ie=!1),Se()}let xe={onToggle:He,onDraftInput:Ge,onSubmit:ge},ke=document.createElement("div");ke.className="md-viewer-root",document.body.appendChild(ke);let Ae=zl(ke,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),_e=document.createElement("div");_e.className="session-log-root",document.body.appendChild(_e);let ne=ws(_e,{transport:s?(d,m)=>Promise.resolve(s(d,m)):void 0,sessionLogStore:c}),G=!1,$e=!1,be=!1,ee=null,W=null,j=0;function E(d){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${d}`}function H(){G=!1,$e=!1,be=!1,ee=null,W=null,j+=1}async function R(d){if(!s)return;let m=++j;$e=!0,be=!1,Se();try{let h=await Promise.resolve(s("get-bead-prompt",{bead_id:d}));if(m!==j)return;!h||typeof h!="object"||Array.isArray(h)?be=!0:(ee=h,W=E(d))}catch{m===j&&(be=!0)}finally{m===j&&($e=!1,Se())}}function Y(){if(G=!G,G&&u&&W!==E(u)){ee=null,R(u);return}Se()}function K(){if(!a||!u)return[];let d=a.get();return(d&&d.attempts?Object.values(d.attempts):[]).filter(h=>h&&h.bead_id===u).sort((h,O)=>(O.started_at||0)-(h.started_at||0)).map(h=>({attempt_id:h.attempt_id,bead_id:h.bead_id,status:h.status,started_at:typeof h.started_at=="number"?h.started_at:null,runner:h.runner||null,model:h.model||null,effort:h.effort||null,speed:h.speed||null,session_id:h.session_id||null,resumed_from:h.resumed_from||null,continuation_mode:h.continuation_mode||null,dismissed_at:typeof h.dismissed_at=="number"?h.dismissed_at:null,cause:typeof h.cause=="string"?h.cause:null,cause_detail:h.cause_detail||null,exec_default_preset_id:typeof h.exec_default_preset_id=="string"?h.exec_default_preset_id:null,exec_default_preset_revision:typeof h.exec_default_preset_revision=="number"?h.exec_default_preset_revision:null,exec_values:h.exec_values&&typeof h.exec_values=="object"?h.exec_values:null,usage:h.usage||null,usage_legs:Array.isArray(h.usage_legs)?h.usage_legs:[],delegation_sessions:Array.isArray(h.delegation_sessions)?h.delegation_sessions:[]}))}function ue(){if(!a||!u)return null;let d=a.get();return Nt(d&&d.attempts||{},u)}let pe=new Set;function ye(d){pe.has(d)?pe.delete(d):pe.add(d),Se()}function T(d){let m=a?a.get():null,h=m&&m.attempts?m.attempts[d]:null;ne.open({attempt_id:d,meta:h?{runner:h.runner||void 0,model:h.model||void 0,effort:h.effort||void 0,status:h.status||void 0,session_id:h.session_id||void 0}:{}})}function F(d,m){let h=a?a.get():null,O=h&&h.attempts?h.attempts[d]:null,he=(O&&Array.isArray(O.delegation_sessions)?O.delegation_sessions:[]).find(Ce=>Ce&&typeof Ce=="object"&&Ce.launch_id===m);he&&ne.open({attempt_id:d,launch_id:m,meta:{runner:"codex",role:he.role,model:he.model,session_id:he.session_id,status:he.status}})}async function te(d){if(!s||!d)return;let m=await Yr();if(m===null)return;let h=()=>{let Ce=a?a.get():null;return Ce&&typeof Ce.revision=="number"?Ce.revision:0},O=async(Ce={},Me=h())=>await s("worker-attempt-resume",{attempt_id:d,expected_revision:Me,...m!==""?{instructions:m}:{},...Ce}),me=Ce=>{Ce?.queue&&a?.set&&a.set(Ce.queue)},he=await O();if(me(he),he&&he.conflict){let Ce=he.queue&&typeof he.queue.revision=="number"?he.queue.revision:h();he=await O({},Ce),me(he)}he=await cr(he,(Ce,Me)=>O({continuation:Ce,decision_token:Me}),{onResult:me,refresh:()=>O()}),he&&he.resumed===!1&&!he.conflict&&he.reason&&de(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${he.reason}`,"error",2400)}let Z={onOpen:T,onOpenDelegation:F,onResume:te,onToggleUsage:ye};function $(){let d=a?a.get():null,m={...M};for(let h of["orchestration_model","orchestration_effort","orchestration_speed"]){let O=d&&d[h];typeof O=="string"&&(m[h]=O)}return m}async function D(){if(s){try{let d=await Promise.resolve(s("get-session-defaults",{}));M=d&&d.values&&typeof d.values=="object"?d.values:{}}catch{M={}}Se()}}function V(){let d=a?a.get():null;return d&&d.runner_catalog||null}function Le(){let d=f?.metadata&&typeof f.metadata=="object"?f.metadata:{},h=(Object.hasOwn(_,"orchestration_model")?_.orchestration_model:void 0)||(typeof d.orchestration_model=="string"?d.orchestration_model:"")||(typeof $().orchestration_model=="string"?$().orchestration_model:"")||"opus";return zo(V(),h)}function Ie(){let d=l?l.get():null;return!d||typeof d.revision!="number"?null:{revision:d.revision,presets:Array.isArray(d.presets)?d.presets:[]}}function Ne(d){return d?.compatible===!1}function Re(d){l&&d&&typeof d.revision=="number"&&Array.isArray(d.presets)&&l.set({revision:d.revision,presets:d.presets})}async function et(){let d=Ie(),m=d?.presets.find(h=>h.id===b);if(!(!s||!u||!d||!m||Ne(m)||A)){A=!0,Se();try{let h=await Promise.resolve(s("apply-impl-preset",Nl(u,m.id,d.revision)));if(h&&h.conflict){Re(h),de("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let O=h&&Array.isArray(h.issue)?h.issue[0]:h?.issue;if(h&&h.applied&&O&&typeof O=="object"){f=O;for(let me of Bl)delete _[me];de("\uAD6C\uD604 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",2400);return}h&&h.error==="bd_readback_failed"?de("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):de("\uAD6C\uD604 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(h){h&&typeof h=="object"&&h.code==="bd_readback_failed"?de("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):de("\uAD6C\uD604 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{A=!1,Se()}}}let bt=null;r&&r.subscribe&&(bt=r.subscribe(()=>lt()));let ht=null;a&&typeof a.subscribe=="function"&&(ht=a.subscribe(()=>{u&&Se()}));let at=null;l&&typeof l.subscribe=="function"&&(at=l.subscribe(()=>{u&&Se()}));function $t(d){d.key==="Escape"&&u&&(d.preventDefault(),n())}document.addEventListener("keydown",$t);function lt(){if(u){if(r&&typeof r.snapshotFor=="function"){let d=r.snapshotFor("detail:"+u)||[];f=d.find(h=>h&&h.id===u)||d[0]||f}Ye(),Se()}}function st(d){lr(d).then(m=>{m?de("\uBCF5\uC0AC\uB428","success",1200):de("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function ut(d){d.preventDefault(),d.stopPropagation(),u&&st(u)}function z(d,m){d.preventDefault(),d.stopPropagation(),st(m)}function X(d,m,h){d.preventDefault(),d.stopPropagation(),Ae.open(m,{missing_state:h})}function ve(d,m){_[d]=m,Se(),!(!s||!u)&&Promise.resolve(s("update-exec-settings",Ml(u,d,m.length===0?null:m))).catch(()=>{de("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}function we(d,m){let h=f||{},O=h.metadata&&typeof h.metadata=="object"?h.metadata:{},me={};for(let Me of["impl_runtime","impl_model","impl_effort"])me[Me]=Object.hasOwn(_,Me)?_[Me]:typeof O[Me]=="string"?O[Me]:"";me[d]=m;let he=Wl(me,V(),Le()),Ce={};for(let Me of["impl_runtime","impl_model","impl_effort"])Ce[Me]=_[Me],_[Me]=he[Me]||"";Se(),!(!s||!u)&&Promise.resolve(s("update-impl-target",{id:u,...he,orchestration_runtime:Le()})).then(Me=>{let pt=Array.isArray(Me)?Me[0]:Me;if(!pt||typeof pt!="object"||!pt.id)throw new Error("implementation target readback failed");f=pt;for(let tr of["impl_runtime","impl_model","impl_effort"])delete _[tr];Se()}).catch(()=>{for(let Me of["impl_runtime","impl_model","impl_effort"])Ce[Me]===void 0?delete _[Me]:_[Me]=Ce[Me];Se(),de("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error")})}async function oe(d,m,h){if(!s||!u)return!1;try{let O=await Promise.resolve(s(d,m)),me=Array.isArray(O)?O[0]:O;return me&&typeof me=="object"&&me.id?(f=me,!0):(de(h,"error"),!1)}catch{return de(h,"error"),!1}}function De(d){setTimeout(()=>{try{let m=e.querySelector(d);m&&typeof m.focus=="function"&&m.focus()}catch{}},0)}function tt(){P=!0,U=f&&f.title||"",Se(),De('.detail-edit__input[data-edit="title"]')}function Ke(d){U=d.target.value}function Pe(){P=!1,U="",Se()}function Xe(){oe("edit-text",{id:u,field:"title",value:U},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(m=>{m&&(P=!1,U=""),Se()})}function Ee(){S=!0,Q=f&&f.description||"",Se(),De('.detail-edit__textarea[data-edit="description"]')}function ft(d){Q=d.target.value}function Tt(){S=!1,Q="",Se()}function Ot(){oe("edit-text",{id:u,field:"description",value:Q},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(m=>{m&&(S=!1,Q=""),Se()})}function Pt(d,m,h,O){if(d.key==="Escape"){d.stopPropagation(),h();return}d.key==="Enter"&&(!O||d.ctrlKey||d.metaKey)&&(d.preventDefault(),m())}function Sr(d){let m=d.target.value;oe("update-status",{id:u,status:m},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>Se())}function yt(d){let m=Number(d.target.value);oe("update-priority",{id:u,priority:m},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>Se())}function wt(d){x=d.target.value}function Jt(){let d=x.trim();d.length!==0&&oe("label-add",{id:u,label:d},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(m=>{m&&(x=""),Se()})}function ar(d){if(d.key==="Escape"){d.stopPropagation(),x="",Se();return}d.key==="Enter"&&(d.preventDefault(),Jt())}function Bt(d){oe("label-remove",{id:u,label:d},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>Se())}let jt={onCopyPath:z,onOpenDoc:X};function vt(d){return typeof d=="string"?d:d&&typeof d=="object"?String(d.id||d.to||d.issue_id||d.depends_on||""):""}function er(d){switch(d&&typeof d=="object"?String(d.dependency_type||d.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function p(d){let h=(Array.isArray(d.dependencies)?d.dependencies:[]).map(O=>({id:vt(O),icon:er(O)})).filter(O=>O.id.length>0);return i`
      <div class="detail-section-label">의존성</div>
      ${h.length===0?i`<div class="detail-empty">의존성 없음</div>`:i`<div class="detail-deps">
            ${h.map(O=>o?i`<button
                    type="button"
                    class="detail-dep detail-dep--link"
                    @click=${()=>o(O.id)}
                  >
                    ${O.icon?`${O.icon} `:""}${O.id}
                  </button>`:i`<span class="detail-dep"
                    >${O.icon?`${O.icon} `:""}${O.id}</span
                  >`)}
          </div>`}
    `}function v(d){let m=d.metadata||{},h=d.workflow||{},O=h.stages||{},me=O.spec&&O.spec.stale,he=O.impl&&O.impl.stale,Ce=O.plan||null,Me=h.route_source==="derived",pt=h.route||m.route||"\u2014";return i`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${Me?" detail-kv__v--derived":""}"
          title=${Me?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${Me?"unset":pt}</span
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
              <span class="detail-kv__v">${Ce?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${Ce?.approval_receipt||"\uC5C6\uC74C"}${Ce?.approval_state==="stale"?" \xB7 stale":Ce?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${h.route!=="quick_fix"||Object.hasOwn(m,"impl_review")?i`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${m.impl_review||"\uC5C6\uC74C"}${he?" \xB7 stale":""}</span
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
    `}let q={route:["quick_fix","spec_backed","full_plan"]};async function re(d,m){let h=m.target.value;if(d==="route"&&f&&f.metadata&&f.metadata.route==="full_plan"&&h!=="full_plan"&&!window.confirm(`full_plan \u2192 ${h||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){Se();return}await oe("update-workflow-meta",{id:u,key:d,value:h},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),Se()}function B(d){let m=d.metadata||{};return i` ${((O,me)=>{let he=q[O],Ce=typeof m[O]=="string"?m[O]:"";return i`<div class="detail-kv">
        <span class="detail-kv__k">${O}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${O}
          data-edit=${`wfmeta-${O}`}
          @change=${Me=>re(O,Me)}
        >
          <option value="" ?selected=${!he.includes(Ce)}>
            ${me}
          </option>
          ${he.map(Me=>i`<option value=${Me} ?selected=${Ce===Me}>${Me}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function y(d,m){return P?i`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${U}
            @input=${Ke}
            @keydown=${h=>Pt(h,Xe,Pe,!1)}
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
        ${gt(m).map(h=>i`<span class="detail-usage-total" title=${h.tooltip}
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
    `}function I(d){let m=_t(d.created_at),h=_t(d.updated_at);return!m&&!h?i``:i`
      ${m?i`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${m}</span>
          </div>`:""}
      ${h?i`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${h}</span>
          </div>`:""}
    `}function se(d,m){return i`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${Sr}
        >
          ${Uf.map(h=>i`<option value=${h} ?selected=${h===d}>${h}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${yt}
        >
          ${Wf.map(h=>i`<option value=${String(h)} ?selected=${h===m}>
                P${h}
              </option>`)}
        </select>
      </div>
    `}function Te(d){return i`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${S?"":i`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${Ee}
            >
              ✎
            </button>`}
      </div>
      ${S?i`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${Q}
              @input=${ft}
              @keydown=${m=>Pt(m,Ot,Tt,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${Ot}
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
                @click=${()=>Bt(h)}
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
            @input=${wt}
            @keydown=${ar}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${Jt}
          >
            추가
          </button>
        </span>
      </div>
    `}function Ze(){if(!u)return i``;let d=f||{},m=String(d.id||u),h=d.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",O=ue(),me=d.status||"open",he=typeof d.priority=="number"?Math.max(0,Math.min(4,d.priority)):"",Ce=d.description||"",Me={...d,metadata:{...d.metadata||{},..._}};return i`
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
            @click=${ut}
          >
            ${m}
          </button>
          ${y(h,O)}
          ${ql(Me)}
          ${Fl({metadata:Me.metadata,workspace_values:$(),catalog:V(),expanded:k,presets:Ie()?.presets||[],preset_id:b,preset_busy:A},{onToggle:()=>{k=!k,Se()},onEdit:(pt,tr)=>{if(pt==="impl_runtime"||pt==="impl_model"||pt==="impl_effort"){we(pt,tr??"");return}ve(pt,tr??"")},onPresetSelect:pt=>{b=pt,Se()},onPresetApply:()=>{et()}})}
          ${se(me,he)} ${I(d)}
          ${Te(Ce)}
          ${Sl(C,xe,{expanded:Fe,draft:ce,sending:ie,error:fe})}
          ${Je(d)} ${Be(d)} ${p(d)}
          ${v(d)} ${B(d)}
          ${kl(d,jt)}
          ${Yl({expanded:G,loading:$e,error:be,data:ee},{onToggle:Y})}
          ${Vl(K(),Z,{total:O,expanded:pe})}
        </div>
      </div>
    `}function Se(){je(Ze(),e)}return{load(d){d!==u&&(_={},b="",k=!1,w(),Ue(),H()),u=d,f=null,lt(),D()},clear(){u=null,f=null,_={},b="",A=!1,w(),Ue(),H(),Ae.close(),ne.close(),je(i``,e)},destroy(){bt&&(bt(),bt=null),ht&&(ht(),ht=null),at&&(at(),at=null),document.removeEventListener("keydown",$t),Ae.destroy(),ke.parentNode&&ke.parentNode.removeChild(ke),ne.destroy(),_e.parentNode&&_e.parentNode.removeChild(_e),u=null,f=null,b="",A=!1,Ue(),H(),je(i``,e)}}}function Zl(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let r=t.querySelector("#fatal-error-title"),n=t.querySelector("#fatal-error-message"),s=t.querySelector("#fatal-error-detail"),o=t.querySelector("#fatal-error-reload"),a=t.querySelector("#fatal-error-close"),l=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},c=(u,f,_="")=>{r&&(r.textContent=u||"Unexpected Error"),n&&(n.textContent=f||"An unrecoverable error occurred.");let b=typeof _=="string"?_.trim():"";if(s&&(b.length>0?(s.textContent=b,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),a&&a.addEventListener("click",()=>l()),t.addEventListener("cancel",u=>{u.preventDefault(),l()}),{open:c,close:l,getElement(){return t}}}function Ps(e){return typeof e=="string"&&e.length>=7?e.slice(0,7):"\u2014"}function Ds(e){if(typeof e!="number"||!Number.isFinite(e)||e<0)return"\u2014";if(e<1e3)return`${Math.round(e)}ms`;let t=e/1e3;if(t<60)return`${t.toFixed(1)}\uCD08`;let r=Math.floor(t/60);if(r<60)return`${r}\uBD84 ${Math.round(t-r*60)}\uCD08`;let n=Math.floor(r/60),s=r%60;return`${n}\uC2DC\uAC04 ${s}\uBD84`}function Xl(e,t){if(typeof e!="object"||e===null)return null;let r=0,n=!1;for(let s of Object.values(e)){if(typeof s!="object"||s===null)continue;let o=s;if(o.bead_id!==t)continue;let a=o.started_at,l=o.finished_at;typeof a!="number"||typeof l!="number"||!Number.isFinite(a)||!Number.isFinite(l)||l<a||(r+=l-a,n=!0)}return n?r:null}function Ms(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";let t=new Date(e);return`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`}function zf(e,t){let r=Array.isArray(e)?e:[],n=Array.isArray(t)?t:[];if(r.length===0&&n.length===0)return null;let s=null;for(let l of r)l.kind!=="deploy"||l.state!=="succeeded"||typeof l.target_sha!="string"||(!s||(typeof l.finished_at=="number"?l.finished_at:0)>(typeof s.finished_at=="number"?s.finished_at:0))&&(s=l);let o=r.filter(l=>l.state==="failed"&&!l.dismissed&&!l.superseded_by).length+n.length,a=r.some(l=>l.state==="repairing");return{deploy:s?{sha:Ps(s.target_sha),at:typeof s.finished_at=="number"?s.finished_at:null,elapsed_ms:typeof s.elapsed_ms=="number"?s.elapsed_ms:null}:null,unresolved:o,repairing:a,badge:o>0?{tone:"act",label:`\uD574\uACB0 \uD544\uC694 ${o}`}:a?{tone:"live",label:"\uC790\uB3D9 \uD574\uACB0 \uC911"}:{tone:"quiet",label:"\uBAA8\uB450 \uC815\uC0C1"}}}function Ql(e,t){let r=zf(e,t);return r?i`<button
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
            title=${r.deploy.at?_t(r.deploy.at):""}
            >${Ms(r.deploy.at)}${r.deploy.elapsed_ms!==null?` \xB7 ${Ds(r.deploy.elapsed_ms)}`:""}</span
          >
        </span>`:""}
    <span class="worker-repo-strip__spacer"></span>
    <span
      class="worker-repo-strip__badge worker-repo-strip__badge--${r.badge.tone}"
      >${r.badge.label}</span
    >
  </button>`:""}function en(e){let t=Lt(e.created_at),r=Lt(e.updated_at);return!t&&!r?"":i`<div class="worker-mini__meta">
    ${t?i`<span title=${`\uC0DD\uC131 ${_t(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&r?i`<span>·</span>`:""}${r?i`<span title=${`\uC218\uC815 ${_t(e.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </div>`}function Hf(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function An(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function Ns(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function or(e,t,r={}){let s=Object.values(e&&typeof e=="object"?e:{}).filter(_=>_&&_.bead_id===t&&_.phase!=="done").sort((_,b)=>(_.requested_at||0)-(b.requested_at||0)).at(-1),o=typeof r.attempt_id=="string"&&r.attempt_id.length>0?r.attempt_id:typeof s?.attempt_id=="string"?s.attempt_id:null,a=r.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":r.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":r.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,l=typeof s?.last_error=="string"?s.last_error:null,c=s?Hf(s.phase):null,u=s?.kind==="stale_work_backup_fresh",f=r.merged||s?.mode==="merged_revert"?"merged":"unmerged";return{action:!r.external&&!r.done,enabled:!a&&(!s||!!l),label:u?l?"\uBC31\uC5C5 \uC815\uB9AC \uC7AC\uC2DC\uB3C4":"\uBC31\uC5C5 \uD6C4 \uC0C8\uB85C \uC2DC\uC791":l?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:a||(l?u?`\uBC31\uC5C5 \uB4A4 \uC815\uB9AC \uC2E4\uD328: ${l} \u2014 \uC6D0\uBCF8\uACFC \uAC80\uC99D \uC601\uC218\uC99D\uC744 \uBCF4\uC874\uD55C \uCC44 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:`\uD3D0\uAE30 \uC2E4\uD328: ${l} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:s?`${c||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:f==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:o,operation:s||null,progress:c,error:l,confirmation:f}}function gr(e){let t=e.discard;if(!t||!t.operation)return"";let r=t.operation,n=r.kind==="stale_work_backup_fresh"&&!t.error?null:r.backup?.path,s=r.original_pr,o=r.revert_pr;return i`<div
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
  </div>`}var Gf={dirty_unique:"\uCD5C\uC2E0 base\uC5D0 \uC5C6\uB294 \uB85C\uCEEC \uBCC0\uACBD\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",untracked_present:"\uCD94\uC801\uB418\uC9C0 \uC54A\uC740 \uD30C\uC77C\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",branch_ahead:"\uB85C\uCEEC branch\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",head_ahead:"worktree HEAD\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_not_contained:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 \uCD5C\uC2E0 base\uC5D0 \uD3EC\uD568\uB410\uC74C\uC744 \uC99D\uBA85\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ahead_merge_commit:"\uB85C\uCEEC branch\uC5D0 \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 merge commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_submodule_path:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 submodule \uACBD\uB85C\uB97C \uBCC0\uACBD\uD569\uB2C8\uB2E4",archive_failed:"\uACE0\uC720 commit \uBC31\uC5C5\uC744 \uC548\uC804\uD558\uAC8C \uAC80\uC99D\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ref_delete_failed:"\uD655\uC778\uB41C local branch\uB97C \uC548\uC804\uD558\uAC8C \uC0AD\uC81C\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",resume_available:"\uC774\uC5B4\uAC08 \uC218 \uC788\uB294 \uC774\uC804 Worker session\uC774 \uC788\uC2B5\uB2C8\uB2E4",observe_failed:"Git \uC0C1\uD0DC\uB97C \uC548\uC804\uD558\uAC8C \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",identity_changed:"\uD655\uC778 \uC911 worktree \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4",ownership_unknown:"Worker \uC18C\uC720 worktree\uC778\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"};function Jl(e,t=!1){if(!e||typeof e!="object")return null;let r=e;if(r.reason!=="worktree_stale_work"||!r.stale_work||typeof r.stale_work!="object")return null;let n=r.stale_work,s=n.residue==="branch"?"branch":"worktree",o=n.state==="unique"?"unique":"unknown",a=n.summary&&typeof n.summary=="object"?n.summary:{};function l(u){return Number.isInteger(a[u])?Number(a[u]):0}let c=typeof n.cause=="string"?n.cause:"observe_failed";return{residue:s,state:o,title:s==="branch"?"\uC774\uC804 \uBE0C\uB79C\uCE58 \uBCF4\uC874\uB428":o==="unique"?"\uC774\uC804 \uC791\uC5C5 \uBCF4\uC874\uB428":"\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",cause:Gf[c]||"\uC548\uC804\uD558\uAC8C \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 \uC774\uC804 \uC791\uC5C5\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",summary:s==="branch"?`\uACE0\uC720 commit ${l("branch_ahead")}`:[`staged ${l("staged_count")}`,`unstaged ${l("unstaged_count")}`,`untracked ${l("untracked_count")}`,`branch ahead ${l("branch_ahead")}`,`HEAD ahead ${l("head_ahead")}`].join(" \xB7 "),action_id:typeof n.action_id=="string"?n.action_id:"",can_resume:n.can_resume===!0,can_continue:n.can_continue===!0,can_backup_fresh:n.can_backup_fresh===!0,can_recheck:n.can_recheck===!0,locked:t}}function Vo(e){let t=e.draggable&&!e.done,r=Array.isArray(e.badges)?e.badges:[],n=gt(e.usage),s=Gt(e.usage),o=e.merge_step||null,a=e.lane==="pr_wait"||!!e.revise_action||!!e.stale_work,l=e.lane==="done"&&!a,c=l?Lt(e.done_at):"",u=t?i`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",f=typeof e.seq=="number"?i`<span class="worker-mini__seq" aria-hidden="true"
          >${e.seq}</span
        >`:"",_=e.worker_serial===!0?i`<span
          class="worker-mini__serial worker-mini__serial--legacy"
          title="legacy worker-serial 라벨 잔재 — 스케줄링에 사용되지 않습니다"
          >worker-serial</span
        >`:"",b=e.workspace_name?i`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",A=i`<span class="worker-mini__id" title="클릭하면 ID 복사"
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
        >`:"",S=r.map(ze=>ze===e.live_badge?i`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${ze}</span
        >`:i`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${ze===e.completion_badge&&e.completion_title||""}
          >${ze}</span
        >`),U=e.reason?i`<span class="worker-mini__reason">${e.reason}</span>`:"",Q=n.length>0?n.map(ze=>i`<span class="worker-usage" title=${ze.tooltip}
              >${ze.label}</span
            >`):s?i`<span class="worker-usage" title=${Zr(e.usage)}
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
      </button>`:"",C=e.cancel_action?i`<button
        type="button"
        class="worker-mini__merge-cancel"
        data-bead-id=${e.id}
        ?disabled=${e.cancel_enabled===!1}
        title=${e.cancel_title||""}
      >
        취소
      </button>`:"",N=e.timeline_action?i`<button
        type="button"
        class="worker-mini__timeline"
        data-bead-id=${e.id}
        title="저장소 작업이 끝나지 않아 머지 액션이 잠겼습니다 — 타임라인에서 원인과 해결 버튼을 볼 수 있습니다"
      >
        저장소 작업 보기
      </button>`:"",J=e.discard,fe=J?.action||e.discard_action?i`<button
          type="button"
          class="worker-mini__discard"
          data-bead-id=${e.id}
          data-attempt-id=${J?.attempt_id||""}
          data-operation-id=${J?.operation?.operation_id||""}
          data-discard-mode=${J?.confirmation||"unmerged"}
          ?disabled=${J?!J.enabled:e.discard_enabled===!1}
          title=${J?J.title:e.discard_enabled===!1?e.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
        >
          ${J?.label||"\uD3D0\uAE30"}
        </button>`:"",ce=e.stale_work||null,ie=ce?i`${ce.can_resume||ce.can_continue?i`<button
            type="button"
            class="worker-mini__stale-continue"
            data-bead-id=${e.id}
            data-action-id=${ce.action_id}
            ?disabled=${ce.locked}
          >
            기존 작업 이어가기
          </button>`:""}${ce.can_backup_fresh?i`<button
            type="button"
            class="worker-mini__stale-backup"
            data-bead-id=${e.id}
            data-action-id=${ce.action_id}
            ?disabled=${ce.locked}
          >
            백업 후 새로 시작
          </button>`:""}${ce.can_recheck?i`<button
            type="button"
            class="worker-mini__stale-recheck"
            data-bead-id=${e.id}
            data-action-id=${ce.action_id}
            ?disabled=${ce.locked}
          >
            다시 확인
          </button>`:""}`:"",le=ce?i`<div class="worker-mini__stale">
        <strong>${ce.title}</strong>
        <span>${ce.summary}</span>
        <span>${ce.cause}</span>
        ${ce.can_backup_fresh?i`<small
              >Git-ignored dependency/build output은 archive에 포함되지
              않습니다</small
            >`:""}
      </div>`:"",Fe=e.revise_action?i`<button
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
        </button>`:"",Ue=!!(s||o||e.merge_action||e.cancel_action||e.timeline_action||e.discard_action||J?.operation||e.revise_action||ce);return i`<div
    class="worker-mini${a?" worker-mini--card":""}${t?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${e.ghost?" worker-mini--ghost":""}${o?" worker-mini--merging":""}${o?.failed?" worker-mini--merge-failed":""}${e.external?" worker-mini--external":""}"
    style=${o?`--progress: ${o.percent}%`:""}
    draggable=${t?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${l?i`<div class="worker-mini__row1">${b}${A}${k}</div>
          <div class="worker-mini__row2">
            ${Q}${c?i`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${_t(e.done_at)}`}
                  >완료 ${c}</span
                >`:""}${typeof e.work_ms=="number"?i`<span
                  class="worker-mini__work"
                  title="attempt 실행 시간 합산 (재개 세션 포함)"
                  >작업 ${Ds(e.work_ms)}</span
                >`:""}${S}${x}
            <span class="worker-mini__actions"
              >${w}${C}${N}${fe}</span
            >
            ${en(e)}
          </div>`:a?i`<div class="worker-mini__head">
              ${u}${f}${b}${A}${M}${P}${S}${_}${U}
            </div>
            <div class="worker-mini__body">${k}${le}</div>
            ${Ue?i`<div class="worker-mini__foot">
                  ${Q}${x}
                  <span class="worker-mini__actions"
                    >${w}${C}${N}${fe}${Fe}${ie}</span
                  >
                  ${gr(e)}
                </div>`:""}
            ${en(e)}`:i`<div class="worker-mini__line">
              ${u}${f}${b}${A}${k}${M}${P}${S}${_}${U}${Q}${x}${w}${C}${N}${fe}
            </div>
            ${gr(e)} ${en(e)}`}
  </div>`}function Vf(e){let t=e.draggable&&!e.done,r=e.workflow,n=r&&r.chips||{},s=n.route||r&&r.route,o=n.route_source==="derived"||!!(r&&r.route_source==="derived"),a=typeof e.reason=="string"&&e.reason.split(" \xB7 ").includes("missing_description"),l=typeof e.reason=="string"&&e.reason.startsWith("\u26D4");return i`<div
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
    ${r?ns(r,e.status):""}
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
        title=${t?"\uB300\uAE30 \uD050 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00":a?"description\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"spec\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}
      >
        대기로 ↴
      </button>
    </div>
    ${en(e)}
  </div>`}function Zt(e){let t=!!e.collapsible&&!!e.collapsed,r=i`<span
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
                  </div>`:e.items.map(n=>e.lane==="candidate"?Vf(n):Vo(n))}
          </div>`}
  </section>`}var ec=[{step:"merge",label:"\uBA38\uC9C0",index:1},{step:"base",label:"base",index:2},{step:"verify",label:"\uAC80\uC99D",index:3},{step:"deploy",label:"\uBC30\uD3EC",index:4},{step:"child",label:"\uC790\uC2DD",index:5},{step:"branch",label:"\uBE0C\uB79C\uCE58",index:6},{step:"close",label:"close",index:7}],En=[{step:"base_containment",label:"base \uD3EC\uD568 \uD655\uC778"},{step:"repo_operations",label:"\uC800\uC7A5\uC18C \uC791\uC5C5"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"}];function Fs(e,t){let r=ec.find(s=>s.step===e);if(!r)return null;let n=ec.length;return{step:r.step,label:t,index:r.index,total:n,percent:Math.round(r.index/n*100)}}function tc(e){let t=En.findIndex(r=>r.step===e);return En.map((r,n)=>({step:r.step,label:r.label,state:t<0?"todo":n<t?"done":n===t?"stall":"todo"}))}function Fr(e){let t=En.find(r=>r.step===e);return t?t.label:typeof e=="string"?e:""}function Yf(e){let t=En.findIndex(r=>r.step===e);return t<0?null:{index:t+1,total:En.length}}function qs(e){let t=Yf(e);return t?`\uBA38\uC9C0 \uC644\uB8CC \xB7 \uC815\uB9AC ${t.total}\uB2E8\uACC4 \uC911 ${t.index}\uB2E8\uACC4\uC5D0\uC11C \uBA48\uCDA4`:"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644"}var Ko=new Set(["queued","running","retry_pending","repairing"]),rc=new Set(["failed","succeeded"]),Kf={queued:"\uB300\uAE30",running:"\uC911",retry_pending:"\uC7AC\uC2DC\uB3C4 \uB300\uAE30",repairing:"\uC790\uB3D9 \uD574\uACB0 \uC911",failed:"\uC2E4\uD328",succeeded:"\uC644\uB8CC \xB7 \uC815\uB9AC \uC7AC\uAC1C \uB300\uAE30"},Tn={base_containment:{step:"base",label:"base \uD655\uC778 \uC911"},child_sweep:{step:"child",label:"\uC790\uC2DD \uC815\uB9AC \uC911"},branch_cleanup:{step:"branch",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC \uC911"},parent_close:{step:"close",label:"\uBD80\uBAA8 close \uC911"}},Zf={merging:{step:"merge",label:"\uBA38\uC9C0 \uC911"},base_containment:Tn.base_containment,child_sweep:Tn.child_sweep,branch_cleanup:Tn.branch_cleanup,parent_close:Tn.parent_close};function Xf(e){return typeof e=="string"&&/^[0-9a-f]{40}$/.test(e)}function Qf(e,t,r){return!["verify","deploy"].includes(e.kind)||![...Ko,...rc].includes(e.state)||![null,void 0,""].includes(e.superseded_by)||!Array.isArray(e.subjects)?!1:e.subjects.some(n=>n&&typeof n=="object"&&n.bead_id===t&&n.merged_sha===r)}function Jf(e,t){let r=(t.kind==="deploy"?2:1)-(e.kind==="deploy"?2:1);if(r!==0)return r;let n=u=>u.state==="succeeded"?1:2,s=n(t)-n(e);if(s!==0)return s;let o=typeof e.requested_at=="number"?e.requested_at:0,a=typeof t.requested_at=="number"?t.requested_at:0;if(o!==a)return a-o;let l=typeof e.operation_id=="string"?e.operation_id:"",c=typeof t.operation_id=="string"?t.operation_id:"";return l.localeCompare(c)}function Yo(e,t=!1){let r=e.kind,n=r==="verify"?"\uAC80\uC99D":"\uBC30\uD3EC",s=t?"failed":e.state,o=Kf[s];if(!o)return null;let a=Fs(r,`${n} ${o}`);return a?{...a,active:Ko.has(s),failed:s==="failed"}:null}function e_(e){return!e||typeof e!="object"?null:Zf[e.step]||null}function Cn(e){if(!e||typeof e.bead_id!="string")return null;let t=e.bead_id,r=e.merge_progress&&typeof e.merge_progress=="object"?e.merge_progress:{},n=e_(r),s=e.cleanup_failed&&typeof e.cleanup_failed=="object"?e.cleanup_failed:null,o=["child_sweep","branch_cleanup","parent_close"].includes(typeof e.cleanup_cursor=="string"?e.cleanup_cursor:""),a=!o&&(e.cleanup_cursor==="repo_operations"||r.step==="repo_operations"),l=Xf(e.merge_sha)?e.merge_sha:null,c=!o&&l&&Array.isArray(e.repo_operations)?e.repo_operations.filter(k=>k&&typeof k=="object"&&Qf(k,t,l)).sort(Jf):[],u=a?c:[],f=u.find(k=>Ko.has(k.state));if(f)return Yo(f);if(s)return s.step==="repo_operations"&&c[0]?Yo(c[0],!0):null;let _=u.find(k=>rc.has(k.state)?k.state!=="succeeded"||e.cleanup_cursor==="repo_operations":!1);if(_)return Yo(_);if(n){let k=Fs(n.step,n.label);return k?{...k,active:!0,failed:!1}:null}let b=typeof e.cleanup_cursor=="string"?Tn[e.cleanup_cursor]:null;if(!b)return null;let A=Fs(b.step,b.label);return A?{...A,active:!0,failed:!1}:null}function Bs(e){return!!e&&e.step!=="merge"&&e.failed!==!0}var nc={verify_failed:"\uAC80\uC99D \uC2E4\uD328",verify_cmd_failed:"\uAC80\uC99D \uC2E4\uD328",verify_script_failure:"\uAC80\uC99D \uC2E4\uD328",deploy_failed:"\uBC30\uD3EC \uC2E4\uD328",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328",interrupted_without_terminal_exit:"\uC911\uB2E8\uB428"},sc={repo_ops_worktree_unowned:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uAC00 \uC544\uC9C1 Worker \uC18C\uC720\uAC00 \uC544\uB2C8\uC5B4\uC11C \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804\uC5D0 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",verify_cmd_failed:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D \uBA85\uB839\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",gh_observation_failed:"GitHub\uC5D0\uC11C PR \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_script_failure:"\uAC80\uC99D \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",deploy_script_failure:"\uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",interrupted_without_terminal_exit:"\uC791\uC5C5\uC774 \uC885\uB8CC \uAE30\uB85D \uC5C6\uC774 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",base_unresolved:"PR\uC774 \uC5B4\uB290 base \uBE0C\uB79C\uCE58\uB85C \uBA38\uC9C0\uB418\uB294\uC9C0 \uD655\uC815\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ref_unobserved:"PR\uC758 base \uBE0C\uB79C\uCE58\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",merge_sha_unobserved:"\uBA38\uC9C0 \uCEE4\uBC0B SHA\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_fetch_failed:"\uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uB97C fetch\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_rev_unavailable:"fetch\uD55C \uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uC758 \uCEE4\uBC0B\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ff_diverged:"\uB85C\uCEEC base \uBE0C\uB79C\uCE58\uAC00 \uC6D0\uACA9\uACFC \uAC08\uB77C\uC838 fast-forward\uB85C \uC815\uB82C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",deployment_target_not_covering_merge:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",deployment_candidate_ancestry_check_failed:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uB294\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."};function oc(e){return typeof e!="string"||e.length===0?[]:e.split(":").filter(t=>t.length>0)}function Zo(e){for(let t of oc(e))if(Object.hasOwn(nc,t))return nc[t];return null}function Xo(e){let t=null;for(let r of oc(e))Object.hasOwn(sc,r)&&(t=sc[r]);return t}function js(e){let t=Zo(e),r=Xo(e);return t&&r?`${t} \u2014 ${r}`:t||r?t||r:typeof e=="string"?e:""}function ac(e,t){let r=Zo(e)??Zo(t),n=Xo(t)??Xo(e);return r&&n?`${r} \u2014 ${n}`:r||n?r||n:typeof t=="string"?t:""}var ic=160;function t_(e){return e.length>ic?`${e.slice(0,ic)}\u2026`:e}function r_(e){return!e||!e.reason?"":i`<div class="worker-banner__detail">
    가드:
    ${e.reason}${e.command?i` · <code>${t_(e.command)}</code>`:""}
  </div>`}function n_(e){return e?i`<details class="worker-banner__raw">
    <summary>세부</summary>
    <dl class="worker-banner__kv">
      <div>
        <dt>실패 코드</dt>
        <dd>${e}</dd>
      </div>
    </dl>
  </details>`:""}function Qo(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),r=Math.floor(t/60),n=t%60;return r>0?`${r}m ${String(n).padStart(2,"0")}s`:`${n}s`}function lc(e){let t=e.failure?js(e.failure.reason):"";return i`<div class="worker-banners">
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
                title="실패 알림 닫기 — 레인에는 남습니다"
                aria-label="배너 닫기"
              >
                ✕
              </button>`:""}
          ${r_(e.failure.cause_detail)}
          ${n_(e.failure.reason)}
          ${gr({discard:e.failure.discard})}
        </div>`:""}
  </div>`}function s_(e,t,r=null){let n=e.failed===!0,s=!!e.paused,o=n?e.status_label||(e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):s?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?Qo(t-e.started_at):"\u2014",a=nr(e),l=vr(e),c=gt(e.usage),u=Gt(e.usage),f=e.conflict_resolution?s?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,_=e.base_exception||null,b=e.landing,A=e.attempt_id&&e.attempt_id===r,k=e.discard?.action?i`<button
        type="button"
        class="rtile__discard"
        data-operation-id=${e.discard.operation?.operation_id||""}
        ?disabled=${!e.discard.enabled}
        title=${e.discard.title}
        aria-label=${e.discard.label}
      >
        ${e.discard.label}
      </button>`:"";return i`<div
    class="rtile${A?" rtile--sel":""}${s?" rtile--paused":""}${n?" rtile--failed":""}"
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
            ${k}
            <button
              type="button"
              class="rtile__dismiss"
              title="실패 알림 닫기 — 레인에는 남습니다"
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
            ${k}`}
    </div>
    <div class="rtile__title">${e.title}</div>
    ${e.current_child?i`<div class="rtile__child" title="현재 진행중 child">
          └ ${e.current_child}
        </div>`:""}
    ${b?i`<div class="rtile__landing">
          <span
            class="merge-step${b.failed?" merge-step--failed":""}"
            style=${`--progress: ${b.percent}%`}
            >${b.label}${b.index>0?i`<span class="merge-step__n"
                  >${b.index}/${b.total}</span
                >`:""}</span
          >
        </div>`:""}
    ${a||c.length>0||u||f||_?i`<div class="rtile__meta">
          ${f?i`<span class="worker-mini__badge">${f}</span>`:""}
          ${_?i`<span
                class="worker-mini__badge"
                title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
                >${_}</span
              >`:""}
          ${a?i`<span class="rtile__runner">${a}</span>`:""}
          ${c.length>0?c.map(M=>i`<span class="worker-usage" title=${M.tooltip}
                    >${M.label}</span
                  >`):u?i`<span
                  class="worker-usage"
                  title=${Zr(e.usage)}
                  >${u}</span
                >`:""}
        </div>`:""}
    ${en(e)} ${gr(e)}
    <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일).
         quick_fix landing의 실제 진행은 위의 별도 진행 줄이 소유한다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
    ${n||s?"":i`<div class="rtile__accent" aria-hidden="true"></div>`}
  </div>`}function Jo(e,t=Date.now(),r=null){let n=Array.isArray(e)?e:[];return i`<div class="worker-rungrid" id="worker-rungrid">
    ${n.length===0?i`<div class="worker-rungrid__empty">실행 세션 없음</div>`:n.map(s=>s_(s,t,r))}
  </div>`}function qr(e){return i`<svg
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
  </svg>`}function ea(){return qr(br`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function ta(){return qr(br`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function cc(){return qr(br`<rect x="4.3" y="4.3" width="7.4" height="7.4" rx="1.2" />`)}function dc(){return qr(br`<path d="M4.4 4.4 11.6 11.6M11.6 4.4 4.4 11.6" />`)}function uc(){return qr(br`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function pc(){return qr(br`<rect x="2.6" y="2.6" width="7.4" height="7.4" rx="1.2" />
    <path d="M6 13.4h6a1.4 1.4 0 0 0 1.4-1.4V6" />`)}function fc(){return qr(br`<path d="M3 3.6 8.2 8 3 12.4z" />
    <path d="M8.8 3.6 14 8l-5.2 4.4z" />`)}var Rn=1,o_=6e4,a_={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328"},i_=new Set(["auto_merge","merged","merge","done"]),_c={running:3,paused:2,failed:1};function l_(e,t){let r=null,n=-1/0;for(let s of Object.values(e)){if(!s||s.bead_id!==t||s.status==="running")continue;let o=typeof s.finished_at=="number"?s.finished_at:typeof s.started_at=="number"?s.started_at:0;o>=n&&(n=o,r=s)}return r}function c_(e,t){let r=Object.values(e||{}),n=new Set,s=new Map;for(let a of r)!a||typeof a.bead_id!="string"||(typeof a.resumed_from=="string"&&a.resumed_from.length>0&&n.add(a.resumed_from),s.set(a.bead_id,a.attempt_id));let o=new Map;for(let a of r){if(!a||typeof a.bead_id!="string"||a.bead_id.length===0)continue;let l=null;if(a.status==="running")l="running";else if(a.status==="paused"&&!n.has(a.attempt_id))l="paused";else if(a.status==="failed"||a.status==="orphaned"){let _=t.get(a.bead_id),b=typeof _=="number"&&_>0&&typeof a.finished_at=="number"&&_>=a.finished_at;s.get(a.bead_id)===a.attempt_id&&!b&&typeof a.dismissed_at!="number"&&(l="failed")}if(!l)continue;let c=typeof a.started_at=="number"?a.started_at:null,u=o.get(a.bead_id);if(u){let _=_c[u.run_state],b=_c[l];if(_>b||_===b&&(u.started_at??0)>(c??0))continue}let f=typeof a.session_id=="string"&&a.session_id.length>0;o.set(a.bead_id,{attempt_id:typeof a.attempt_id=="string"?a.attempt_id:"",run_state:l,started_at:c,last_event_at:typeof a.last_event_at=="number"?a.last_event_at:null,runner:typeof a.runner=="string"?a.runner:null,model:typeof a.model=="string"?a.model:null,effort:typeof a.effort=="string"?a.effort:null,speed:typeof a.speed=="string"?a.speed:null,resumed_from:typeof a.resumed_from=="string"?a.resumed_from:null,continuation_mode:a.continuation_mode==="session"||a.continuation_mode==="fresh"?a.continuation_mode:null,usage:Nt(e,a.bead_id),can_pause:l==="running"&&f,can_resume:l!=="running"&&f&&!n.has(a.attempt_id)})}return o}function mc(e,t){let r=e[t];if(!r)return"";if(r.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let n=typeof r.reason=="string"?r.reason:"",s=n.indexOf(":");return s>0&&s<n.length-1?`\u26D4 ${n.slice(0,s)} (${n.slice(s+1)})`:`\u26D4 ${n}`}function Rt(e){return e&&typeof e=="object"?e:{}}function ra(e,t,r){let n=Array.isArray(e)?e:[],s=Array.isArray(t)?t:[],o=r&&typeof r.done_since=="number"?r.done_since:void 0,a=new Map;for(let S of s)S&&typeof S.root_dir=="string"&&a.set(S.root_dir,S);let l=[],c=[],u=[],f=[],_=[],b=new Map;for(let S of n){if(!S||typeof S.root_dir!="string")continue;let U=S.root_dir,Q=S.name||U,x=a.get(U),w=x&&typeof x.revision=="number"?x.revision:typeof S.revision=="number"?S.revision:0,C=Rt(S.attempts),N=Rt(S.bead_titles),J=Rt(S.pr_observations),fe=Rt(S.admission),ce=Rt(S.revise_parked),ie=Rt(S.merge_queue_state),le=Rt(S.cleanup_failed),Fe=Rt(S.discard_operations),Ue=Rt(S.pr_activity),ze=Array.isArray(S.repo_operations)?S.repo_operations:[],Ye=Array.isArray(S.merge_queue)?S.merge_queue:[],He=new Set(Ye.filter(ne=>ne&&typeof ne.bead_id=="string").map(ne=>ne.bead_id)),Ge=new Map(Ye.filter(ne=>ne&&typeof ne.bead_id=="string").map(ne=>[ne.bead_id,ne])),ge=Array.isArray(S.queue)?S.queue:[],xe=Array.isArray(S.done)?S.done:[],ke=new Map;for(let ne of xe)ne&&typeof ne.bead_id=="string"&&typeof ne.added_at=="number"&&ke.set(ne.bead_id,ne.added_at);let Ae=ne=>({id:ne,title:N[ne]||ne,root_dir:U,workspace_name:Q,expected_revision:w,draggable:!1}),_e=new Set;for(let[ne,G]of c_(C,ke))_e.add(ne),c.push({...Ae(ne),lane:"running",attempt_id:G.attempt_id,run_state:G.run_state,can_pause:G.can_pause,can_resume:G.can_resume,started_at:G.started_at,last_event_at:G.last_event_at,runner:G.runner,model:G.model,effort:G.effort,speed:G.speed,resumed_from:G.resumed_from,continuation_mode:G.continuation_mode,usage:G.usage,discard:or(Fe,ne,{attempt_id:G.attempt_id}),badges:G.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:G.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:[],alert:G.run_state==="failed"});for(let ne of Array.isArray(S.pr_wait)?S.pr_wait:[]){let G=ne&&ne.bead_id;if(typeof G!="string"||_e.has(G))continue;_e.add(G);let $e=Rt(J[G]),be=Rt($e.pr),ee=$e.gate?Rt($e.gate):null,W=He.has(G),j=Ge.get(G)?.continuation_action||null,E=!!j&&j.continuation===null,H=ie.active===G,R=ne.external===!0,Y=le[G]||null,K=Rt(Ue[G]),ue=Cn({bead_id:G,merge_sha:ne.merge_sha,cleanup_cursor:ne.cleanup_cursor,merge_progress:K.merge_progress||null,cleanup_failed:Y,repo_operations:ze}),pe=Bs(ue),ye=!!ee&&ee.base_badge==="\uCDA9\uB3CC",T=!!Y&&["child_sweep","branch_cleanup","parent_close"].includes(Y.step)&&!!ee&&ee.tier==="merged",F=R&&!!Y&&!!ee&&ee.tier==="merged",te=!!ee&&["closed_unmerged","review","undecidable"].includes(ee.tier),Z=or(Fe,G,{external:R,merge_active:H||ue?.step==="merge",merge_queued:W,cleanup_active:pe,merged:!!Y||ee?.tier==="merged"}),$=!!Z.operation;u.push({...Ae(G),lane:"pr_wait",pr_number:typeof be.number=="number"?be.number:null,pr_url:typeof be.url=="string"?be.url:void 0,external:R,usage:Nt(C,G),merge_step:ue,badges:E?["\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"]:ue?[ee?.tier==="merged"?"\uBA38\uC9C0\uB428":"\uBA38\uC9C0 \uC911"]:Y?[Fr(Y.step)?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${Fr(Y.step)}`:"\uC815\uB9AC \uBA48\uCDA4"]:typeof ee?.gate_badge=="string"&&ee.gate_badge.length>0?[ee.gate_badge]:[],alert:ue?ue.failed===!0:!!Y||te,reason:Y&&ue?.active!==!0?qs(Y.step):"PR \uB300\uAE30",merge_action:ee?.tier==="merged"&&!T&&!F?!1:!W||E,merge_enabled:!$&&(E||ee?.enabled===!0||ye||T||F),merge_label:E?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":F||T?"\uC815\uB9AC \uC7AC\uAC1C":ye&&!T?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:E?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":$?Z.error?`\uD3D0\uAE30 \uC2E4\uD328: ${Z.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${Z.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:F?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":T?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":ye?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":ee?.enabled===!0?`\uBA38\uC9C0 (${ee.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${ee?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:W&&!E,cancel_enabled:!H,continuation_mismatch:j?.mismatch||null,discard:Z,discard_action:Z.action,discard_enabled:Z.enabled,discard_title:Z.title})}for(let ne=0;ne<ge.length;ne++){let G=ge[ne],$e=G&&G.bead_id;if(typeof $e!="string"||_e.has($e))continue;_e.add($e);let be=ce[$e],ee=or(Fe,$e),W=ee.operation?ee:null,j={...Ae($e),lane:"queue",draggable:!W,discard:W||void 0,reason:mc(fe,$e),queue_position:ne+1,queue_index:ne,queue_length:ge.length,badges:be?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!be,revise_action:!!be,revise_enabled:!!be&&!W,revise_title:be?be.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${be.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""};f.push(j);let E=b.get(U);E?E.push(j):b.set(U,[j])}for(let ne of Array.isArray(S.runnable)?S.runnable:[]){let G=ne&&ne.bead_id;typeof G!="string"||_e.has(G)||(_e.add(G),l.push({...Ae(G),title:ne.title||N[G]||G,lane:"runnable",draggable:!0,reason:mc(fe,G),created_at:ne.created_at??void 0,updated_at:ne.updated_at??void 0,labels:Array.isArray(ne.labels)?ne.labels:[],spec_reviewer:typeof ne.spec_reviewer=="string"?ne.spec_reviewer:void 0,plan_state:ne.plan_state==="approved"||ne.plan_state==="authored"?ne.plan_state:"none",workflow:ne.route?{route:ne.route,chips:{route:ne.route}}:null,place_index:ge.length}))}for(let ne of xe){let G=ne&&ne.bead_id;if(typeof G!="string"||_e.has(G)||(_e.add(G),o!==void 0&&typeof ne.added_at=="number"&&ne.added_at<o))continue;let $e=l_(C,G);_.push({...Ae(G),lane:"done",done:!0,usage:Nt(C,G),done_at:typeof ne.added_at=="number"?ne.added_at:void 0,done_kind:$e&&typeof $e.done_kind=="string"?$e.done_kind:null})}}let A=new Map;s.forEach((S,U)=>{S&&typeof S.root_dir=="string"&&A.set(S.root_dir,U)});let k=r&&r.running_sort==="repo"?"repo":"started";c.sort((S,U)=>{if(k==="repo"){let w=A.get(S.root_dir)??Number.MAX_SAFE_INTEGER,C=A.get(U.root_dir)??Number.MAX_SAFE_INTEGER;if(w!==C)return w-C}let Q=typeof S.started_at=="number"&&Number.isFinite(S.started_at)?S.started_at:null,x=typeof U.started_at=="number"&&Number.isFinite(U.started_at)?U.started_at:null;return Q!==null&&x!==null&&Q!==x?Q-x:Q===null&&x!==null?1:Q!==null&&x===null?-1:S.id.localeCompare(U.id)}),_.sort((S,U)=>(U.done_at??0)-(S.done_at??0));let M=s.length>0?s:n.map(S=>({root_dir:S&&S.root_dir,name:S&&S.name,auto_advance:S&&S.auto_advance,auto_merge:S&&S.auto_merge,slots:S&&S.slots,revision:S&&S.revision,runner_catalog:S&&S.runner_catalog})),P=[];for(let S of M)!S||typeof S.root_dir!="string"||P.push({root_dir:S.root_dir,name:S.name||S.root_dir,auto_advance:S.auto_advance===!0,auto_merge:S.auto_merge===!0,slots:typeof S.slots=="number"&&S.slots>=Rn?S.slots:Rn,revision:typeof S.revision=="number"?S.revision:0,runner_catalog:Rt(S.runner_catalog),items:b.get(S.root_dir)||[]});return{runnable:l,queue:f,queue_groups:P,running:c,pr_wait:u,done:_,automation:{total:P.length,both_on:P.filter(S=>S.auto_advance&&S.auto_merge).length}}}function d_(e,t){if(typeof e!="number"||!Number.isFinite(e))return"";let n=t-e<o_;return i`<span
    class="mon-beat${n?" mon-beat--live":""}"
    title=${`\uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${_t(e)}`}
    ><span class="mon-beat__dot" aria-hidden="true"></span>${n?"":i`<span class="mon-beat__age"
          >${Lt(e,t)}</span
        >`}</span
  >`}function In(e){return i`<div class="mon-c__title">${e.title}</div>`}function Ln(e){return i`<span class="mon-c__id" title="클릭하면 상세로 이동"
    >${e.id}</span
  >`}function Us(e){return e.workspace_name?i`<span class="mon-c__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:""}function na(e){let t=gt(e.usage),r=Gt(e.usage);return t.length>0?t.map(n=>i`<span class="mon-c__usage" title=${n.tooltip}
          >${n.label}</span
        >`):r?i`<span class="mon-c__usage" title=${Zr(e.usage)}
        >${r}</span
      >`:""}function sa(e){return(Array.isArray(e.badges)?e.badges:[]).map(r=>i`<span class="mon-c__badge${e.alert?" mon-c__badge--alert":""}"
        >${r}</span
      >`)}function u_(e){return i`<span class="mon-c__ops">
    ${e.run_state==="running"?i`<button
          type="button"
          class="mon-op mon-op--pause"
          ?disabled=${e.can_pause===!1}
          aria-label="일시정지"
          title="일시정지 — 세션을 끊고 이어하기 가능 상태로 둡니다"
        >
          ${ta()}
        </button>`:i`<button
          type="button"
          class="mon-op mon-op--resume"
          ?disabled=${e.can_resume===!1}
          aria-label="이어하기"
          title="이어하기"
        >
          ${ea()}
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
          ${dc()}
        </button>`:""}
  </span>`}function p_(e,t){let r=typeof e.started_at=="number"?Qo(t-e.started_at):"";return i`${In(e)}
    <div class="mon-c__meta">
      ${sa(e)}${d_(e.last_event_at,t)}${Ln(e)}${Us(e)}
      ${nr(e)?i`<span class="mon-c__model">${nr(e)}</span>`:""}
      ${vr(e)?i`<span
            class="rtile__resumed"
            title=${vr(e)}
            >↻</span
          >`:""}
      ${r?i`<span class="mon-live__elapsed">${r}</span>`:""}
      ${na(e)}${u_(e)}${gr(e)}
    </div>`}function f_(e){let t=e.workflow,n=(t&&t.chips||{}).route||t&&t.route,s=typeof e.spec_reviewer=="string"?e.spec_reviewer:"",o=e.plan_state==="approved"?"plan \u2713":e.plan_state==="authored"?"plan \u270E":"plan \u2013",a=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),l=Lt(e.updated_at);return i`${In(e)}
    <div class="mon-c__meta">
      <span class="mon-c__grip" aria-hidden="true">⠿</span>${Ln(e)}
      ${n?i`<span class="ctl-chip ctl-chip--route">${n}</span>`:""}
      ${s?i`<span
            class="ctl-chip mon-c__review${s==="skipped"?" mon-c__review--dim":""}"
            >spec:${s}</span
          >`:""}
      ${n==="full_plan"?i`<span
            class="ctl-chip mon-c__plan${e.plan_state==="none"?" mon-c__review--dim":""}"
            >${o}</span
          >`:""}
      ${rs(e.labels,null).map(c=>i`<span class="ctl-chip ctl-chip--label">${c}</span>`)}
      ${Us(e)}
      ${l?i`<span title=${`\uC218\uC815 ${_t(e.updated_at)}`}
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
    </div>`}function __(e){let t=!!e.discard?.operation;return i`${In(e)}
    <div class="mon-c__meta">
      <span class="mon-c__grip" aria-hidden="true">⠿</span>
      <span class="mon-live__pos">#${e.queue_position}</span>${Ln(e)}
      ${sa(e)}
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
    ${gr(e)}
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
        </div>`:""}`}function m_(e){let t=e.merge_step||null,r=!!(Gt(e.usage)||t||e.merge_action||e.cancel_action||e.discard_action);return i`${In(e)}
    <div class="mon-c__meta">
      ${Ln(e)}${Us(e)}
      ${e.pr_url&&e.pr_number?i`<a
            class="mon-c__pr"
            href=${e.pr_url}
            target="_blank"
            rel="noreferrer noopener"
            title="PR 열기"
            >#${e.pr_number} ↗</a
          >`:""}
      ${sa(e)}
      ${e.reason?i`<span class="mon-c__reason">${e.reason}</span>`:""}
    </div>
    ${r?i`<div class="mon-c__tail">
          ${na(e)}${t?i`<span
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
          ${gr(e)}
        </div>`:""}`}function g_(e,t){let r=e.done_kind||"",n=r?a_[r]||r:"",s=Lt(e.done_at,t);return i`${In(e)}
    <div class="mon-c__meta">
      ${Ln(e)}${Us(e)}
      ${n?i`<span
            class="mon-live__kind${i_.has(r)?" mon-live__kind--ok":" mon-live__kind--warn"}"
            >${n}</span
          >`:""}
      ${na(e)}
      ${s?i`<span title=${`\uC644\uB8CC ${_t(e.done_at)}`}
            >완료 ${s}</span
          >`:""}
    </div>`}function gc(e,t){return e.lane==="running"?p_(e,t):e.lane==="runnable"?f_(e):e.lane==="queue"?__(e):e.lane==="pr_wait"?m_(e):g_(e,t)}function bc(e){let t=String(e.revision);return i`<header
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
        ${e.auto_advance?ta():ea()}
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
        ${uc()}
        <span class="mon-ctl__label">머지</span>
      </button>
      <label class="mon-ctl mon-ctl--slots" title="동시에 실행할 세션 수">
        ${pc()}
        <span class="mon-ctl__label">슬롯</span>
        <input
          type="number"
          class="mon-slots__input"
          min=${Rn}
          step="1"
          data-root-dir=${e.root_dir}
          data-revision=${t}
          aria-label=${`${e.name} \uB3D9\uC2DC \uC2E4\uD589 \uC2AC\uB86F`}
          .value=${String(e.slots)}
        />
      </label>
    </span>
  </header>`}function hc(e){let{total:t,both_on:r}=e.automation,n=t>0&&r===t,s=e.running_sort==="repo"?"repo":"started",o=rr.find(l=>l.value===e.done_range)?.label||"",a=Array.isArray(e.token_total)?e.token_total:e.token_total?[{label:e.token_total,tooltip:e.token_tooltip}]:[];return i`<div class="mon-top">
    <button
      type="button"
      class="mon-auto-all${n?" is-active":""}"
      data-on=${n?"false":"true"}
      aria-pressed=${n?"true":"false"}
      ?disabled=${t===0}
      title=${n?"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uB055\uB2C8\uB2E4 (\uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4)":"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uCF2D\uB2C8\uB2E4"}
    >
      ${n?cc():fc()}
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
        ${rr.map(l=>i`<option
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
  </div>`}function yc(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function vc(e){let t=(Array.isArray(e)?e:[]).map(l=>l&&l.usage).filter(l=>l&&typeof l=="object"&&"providers"in l);if(t.length>0)return gt(is(t));let r={};for(let l of dr)r[l]=0;let n=!1,s=0,o=0,a=0;for(let l of Array.isArray(e)?e:[]){let c=l&&l.usage;if(c&&typeof c=="object"){let u=!1;for(let f of dr){let _=c[f];typeof _=="number"&&Number.isFinite(_)&&(r[f]+=_,n=!0,u=!0)}if(u){o+=1;let f=c.total_cost_usd;typeof f=="number"&&Number.isFinite(f)&&(s+=f,a+=1)}}}return o>0&&a===o&&(r.total_cost_usd=s),n?Gt(r):null}var kc="bdui.monitor.done-range",$c="bdui.monitor.running_sort";function b_(){try{let e=window.localStorage.getItem(kc);return Mt(e)?e:It}catch{return It}}function h_(e){try{window.localStorage.setItem(kc,e)}catch{}}function y_(){try{return window.localStorage.getItem($c)==="repo"?"repo":"started"}catch{return"started"}}function v_(e){try{window.localStorage.setItem($c,e)}catch{}}var xc="tab:monitor:pipeline",w_=1e3,k_=[{lane:"runnable",pane:"candidate",title:"\uC2E4\uD589\uAC00\uB2A5",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589\uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}];function wc(e,t){let r=(e.lane==="runnable"||e.lane==="queue")&&e.draggable!==!1;return i`<div
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
    ${gc(e,t)}
  </div>`}function Sc(e,t){let r=it("views:monitor"),n=t.gotoIssue,s=t.pipelineStore,o=t.transport,a=t.getWorkspacePath,l=t.switchWorkspace,c=t.now||(()=>Date.now()),u=t.confirm||(E=>typeof globalThis.confirm!="function"||globalThis.confirm(E)),f=b_(),_=y_();function b(){let E=rr.find(H=>H.value===f);return E?E.label:""}let A=document.createElement("div");A.className="mon",e.appendChild(A);let k=ra(null,null),M=new Map,P=null,S=null;async function U(E,H,R,Y,K=!0){if(!o||!R)return null;let ue=await o(E,{...H,root_dir:R,expected_revision:Y});if(ue&&ue.conflict&&K){ue.queue&&M.set(R,ue.queue);let pe=ue.queue&&typeof ue.queue.revision=="number"?ue.queue.revision:Y;ue=await o(E,{...H,root_dir:R,expected_revision:pe})}return ue&&ue.queue&&R&&M.set(R,ue.queue),ue}function Q(E,H){let R=M.get(E),Y=s&&s.get?s.get():null,K=(Array.isArray(Y)?Y:[]).find(pe=>pe?.root_dir===E);return(R||K)?.merge_queue?.find(pe=>pe.bead_id===H)?.continuation_action}async function x(E,H,R,Y){let K=await U(E,H,R,Y),ue=M.get(R)?.revision??K?.queue?.revision??Y;return cr(K,(pe,ye)=>U(E,{...H,continuation:pe,decision_token:ye},R,ue,!1),{refresh:pe=>U(E,H,R,pe?.queue?.revision??M.get(R)?.revision??ue,!1)})}async function w(E,H,R,Y){let K=await cr({continuation_mismatch:Y},(pe,ye)=>U("worker-merge-queue-add",{bead_id:H,continuation:pe,decision_token:ye},E,R,!1)),ue=K?.queue?.merge_queue?.find(pe=>pe.bead_id===H)?.continuation_action;K?.applied!==!0&&ue?.continuation===null&&ue.mismatch&&await w(E,H,K.queue.revision,ue.mismatch)}async function C(E,H,R){let Y=await U("worker-discard",E,H,R);if(Y&&Y.discarded===!0){de(Ns(Y),"success",5e3);return}if(Y&&Y.reason){de(`\uD3D0\uAE30 \uC2E4\uD328: ${Y.reason}`,"error");return}if(Y&&Y.accepted&&Y.pending==="merged_revert"){de("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if(Y&&Y.accepted){de(`\uD3D0\uAE30 \uC9C4\uD589: ${Y.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}Y&&!Y.conflict&&de("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function N(E,H,R){return!o||!R?null:await o(E,{...H,root_dir:R})}async function J(E){if(!o||!E&&!u("\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB055\uB2C8\uB2E4. \uAC01 \uB808\uD3EC\uC758 \uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uD568\uAED8 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?"))return;let H=await o("monitor-auto-toggle",{on:E}),R=H&&Array.isArray(H.failed)?H.failed:[];R.length>0&&de(`\uC790\uB3D9\uD654 ${E?"\uCF1C\uAE30":"\uB044\uAE30"} \uC77C\uBD80 \uC2E4\uD328: ${R.map(Y=>Y.root_dir).join(", ")}`,"error",3200)}async function fe(){let E=new Map;for(let H of k.pr_wait)E.has(H.root_dir)||E.set(H.root_dir,H.expected_revision);for(let[H,R]of E)await U("worker-merge-queue-add-all",{},H,R)}let ce=null,ie=!1,le=null;function Fe(){le!==null&&clearTimeout(le),le=setTimeout(()=>{le=null,ie=!1},0)}function Ue(E){let H=E.target;return typeof H?.closest=="function"?H.closest(".mon-group"):null}function ze(E){let H=Ue(E);return!H||!ce?null:(H.getAttribute("data-root-dir")||"")===ce.root_dir?H:null}function Ye(){for(let E of Array.from(A.querySelectorAll(".mon-group--drag-over")))E.classList.remove("mon-group--drag-over")}function He(E){let H=E.target,R=typeof H?.closest=="function"?H.closest('.mon-card[draggable="true"]'):null;if(R){ce={bead_id:R.getAttribute("data-issue-id")||"",lane:R.getAttribute("data-lane")||"",root_dir:R.getAttribute("data-root-dir")||"",revision:Number(R.getAttribute("data-revision")||0)||0,queue_index:Number(R.getAttribute("data-queue-index")),queue_length:Number(R.getAttribute("data-queue-length")),place_index:Number(R.getAttribute("data-place-index"))},ie=!0;try{E.dataTransfer?.setData("text/plain",ce.bead_id),E.dataTransfer&&(E.dataTransfer.effectAllowed="move")}catch{}}}function Ge(E){let H=ze(E);H&&(E.preventDefault(),E.dataTransfer&&(E.dataTransfer.dropEffect="move"),H.classList.add("mon-group--drag-over"))}function ge(E){Ue(E)?.classList.remove("mon-group--drag-over")}function xe(){ce=null,Ye(),Fe()}function ke(E){let H=ze(E),R=ce;if(ce=null,Ye(),!H||!R||!R.bead_id)return;E.preventDefault();let Y=E.target,K=typeof Y?.closest=="function"?Y.closest('.mon-card[data-lane="queue"]'):null,ue=K&&H.contains(K)?Number(K.getAttribute("data-queue-index")):NaN;if(R.lane==="runnable"){let T=Number.isFinite(ue)?ue:R.place_index;if(!Number.isFinite(T))return;U("worker-queue-place",{bead_id:R.bead_id,index:T},R.root_dir,R.revision);return}if(R.lane!=="queue"||K&&K.getAttribute("data-issue-id")===R.bead_id)return;let pe=R.queue_index,ye=Number.isFinite(ue)?pe>ue?ue:ue-1:R.queue_length-1;!Number.isFinite(ye)||ye<0||ye===pe||U("worker-queue-reorder",{bead_id:R.bead_id,to_index:ye},R.root_dir,R.revision)}function Ae(E){let H={runnable:k.runnable,queue:k.queue,running:k.running,pr_wait:k.pr_wait,done:k.done};return i`${hc({automation:k.automation,counts:{running:k.running.length,queue:k.queue.length,pr_wait:k.pr_wait.length},running_sort:_,done_range:f,token_total:vc(k.done),token_tooltip:yc(b())})}
      <div class="worker-lanes mon-lanes">
        ${k_.map(R=>{let Y=H[R.lane],K=R.lane==="queue"?k.queue_groups.length>0?i`${k.queue_groups.map(ue=>i`<div
                        class="mon-group"
                        data-root-dir=${ue.root_dir}
                      >
                        ${bc(ue)}
                        <div class="mon-group__list">
                          ${ue.items.map(pe=>wc(pe,E))}
                        </div>
                      </div>`)}`:void 0:Y.length>0?i`${Y.map(ue=>wc(ue,E))}`:void 0;return Zt({id:`monitor-${R.lane}`,lane:R.pane,title:R.lane==="done"?`\uC644\uB8CC\xB7${b()}`:R.title,items:Y,empty:R.empty,body:K,live:R.lane==="running"&&Y.length>0,header_control:R.lane==="pr_wait"&&Y.length>0?i`<button
                    type="button"
                    class="mon-lane-op mon-merge-all"
                    title="자격이 생기는 PR을 각 레포의 머지 큐에 한 번에 넣습니다"
                  >
                    일괄 머지
                  </button>`:""})})}
      </div>`}function _e(){let E=s&&s.get?s.get():null,H=s&&s.getWorkspacesState?s.getWorkspacesState():[],R=c();k=ra(E,H,{done_since:Ir(f,R),running_sort:_}),je(Ae(R),A)}function ne(E,H){let R=a?a():void 0;if(!H||!R||H===R||!l){n(E);return}l(H).then(()=>{n(E)}).catch(Y=>{r("workspace switch for %s failed: %o",H,Y)})}function G(E){return{root_dir:E.getAttribute("data-root-dir")||"",revision:Number(E.getAttribute("data-revision")||0)||0}}function $e(E,H){let{root_dir:R,revision:Y}=G(E),K=E.getAttribute("data-issue-id")||"",ue=H.dataset.attemptId||E.getAttribute("data-attempt-id")||"",pe=H.classList;if(pe.contains("worker-card__place")){U("worker-queue-place",{bead_id:K,index:Number(E.getAttribute("data-place-index")||0)||0},R,Y);return}if(pe.contains("mon-op--up")||pe.contains("mon-op--down")){let ye=Number(E.getAttribute("data-queue-index")||0)||0,T=pe.contains("mon-op--up")?ye-1:ye+1;if(T<0)return;U("worker-queue-reorder",{bead_id:K,to_index:T},R,Y);return}if(pe.contains("mon-op--remove")){U("worker-queue-remove",{bead_id:K},R,Y);return}if(pe.contains("mon-op--pause")){N("worker-attempt-pause",{attempt_id:ue},R);return}if(pe.contains("mon-op--discard")){if(!u(An(K,"unmerged")))return;C({bead_id:K,...ue?{attempt_id:ue}:{},...H.dataset.operationId?{operation_id:H.dataset.operationId}:{}},R,Y);return}if(pe.contains("mon-op--resume")){Yr().then(ye=>{if(ye!==null)return x("worker-attempt-resume",{attempt_id:ue,...ye!==""?{instructions:ye}:{}},R,Y)});return}if(pe.contains("mon-op--dismiss")){U("worker-attempt-dismiss",{attempt_id:ue},R,Y);return}if(pe.contains("worker-mini__merge")){let ye=Q(R,K);ye?.mismatch&&ye.continuation===null?w(R,K,Y,ye.mismatch):U("worker-merge-queue-add",{bead_id:K},R,Y);return}if(pe.contains("worker-mini__merge-cancel")){U("worker-merge-queue-remove",{bead_id:K},R,Y);return}if(pe.contains("worker-mini__discard")){let ye=H.dataset.discardMode==="merged"?"merged":"unmerged";if(!u(An(K,ye)))return;C({bead_id:K,...ue?{attempt_id:ue}:{},...H.dataset.operationId?{operation_id:H.dataset.operationId}:{}},R,Y);return}if(pe.contains("worker-mini__revise-fix")){x("worker-revise-fix",{bead_id:K},R,Y);return}pe.contains("worker-mini__revise-approve")&&U("worker-revise-approve",{bead_id:K},R,Y)}function be(E){let H=ie;ie=!1;let R=E.target;if(!R||typeof R.closest!="function"||R.closest("dialog")||R.closest("a"))return;let Y=R.closest(".mon-running-sort");if(Y){E.preventDefault(),_=Y.getAttribute("data-sort")==="repo"?"repo":"started",v_(_),_e();return}let K=R.closest(".mon-auto-all");if(K){E.preventDefault(),J(K.getAttribute("data-on")==="true");return}if(R.closest(".mon-merge-all")){E.preventDefault(),fe();return}let pe=R.closest(".mon-ctl--advance");if(pe){E.preventDefault();let{root_dir:Z,revision:$}=G(pe);U("worker-automation-toggle",{on:pe.getAttribute("data-on")==="true"},Z,$);return}let ye=R.closest(".mon-ctl--merge-auto");if(ye){E.preventDefault();let{root_dir:Z,revision:$}=G(ye);U("worker-merge-auto-toggle",{on:ye.getAttribute("data-on")==="true"},Z,$);return}let T=R.closest(".mon-card");if(!T)return;let F=R.closest("button");if(F){E.preventDefault(),$e(T,F);return}let te=T.getAttribute("data-issue-id");te&&!H&&(E.preventDefault(),ne(te,T.getAttribute("data-root-dir")||""))}function ee(E){let H=E.target;if(!H||typeof H.closest!="function")return;let R=H.closest(".mon-done-range");if(R){f=Mt(R.value)?R.value:It,h_(f),_e();return}let Y=H.closest(".mon-slots__input");if(!Y)return;let{root_dir:K,revision:ue}=G(Y),pe=Number(Y.value);if(!Number.isFinite(pe))return;let ye=Math.max(Rn,Math.floor(pe));U("worker-queue-set-slots",{slots:ye},K,ue)}e.addEventListener("click",be),e.addEventListener("change",ee),e.addEventListener("dragstart",He),e.addEventListener("dragover",Ge),e.addEventListener("dragleave",ge),e.addEventListener("drop",ke),e.addEventListener("dragend",xe),s&&typeof s.subscribe=="function"&&(P=s.subscribe(()=>{try{M.clear(),_e()}catch{}}));function W(){S!==null&&(clearInterval(S),S=null)}function j(){le!==null&&(clearTimeout(le),le=null)}return{load(){r("load"),_e(),S===null&&(S=setInterval(()=>{try{_e()}catch{}},w_))},pause(){W()},clear(){W(),j(),P&&(P(),P=null),e.removeEventListener("click",be),e.removeEventListener("change",ee),e.removeEventListener("dragstart",He),e.removeEventListener("dragover",Ge),e.removeEventListener("dragleave",ge),e.removeEventListener("drop",ke),e.removeEventListener("dragend",xe),e.replaceChildren()}}}function Ac(e,t,r){let n=it("views:nav"),s=null;function o(c){return u=>{u.preventDefault(),n("click tab %s",c),r.gotoView(c)}}function a(){let c=t.getState(),u=c.view==="worker"||c.view==="monitor"?c.view:"board";return i`
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
    `}function l(){je(a(),e)}return l(),s=t.subscribe(()=>l()),{destroy(){s&&(s(),s=null),je(i``,e)}}}var Ec=["bug","feature","task","epic","chore"];function Tc(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var Cc=["Critical","High","Medium","Low","Backlog"];function Rc(e,t){let r=document.createElement("dialog");r.id="new-issue-dialog",r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true"),r.innerHTML=`
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
  `,e.appendChild(r);let n=r.querySelector("#new-issue-form"),s=r.querySelector("#new-title"),o=r.querySelector("#new-type"),a=r.querySelector("#new-priority"),l=r.querySelector("#new-labels"),c=r.querySelector("#new-description"),u=r.querySelector("#new-issue-error"),f=r.querySelector("#btn-cancel"),_=r.querySelector("#btn-create"),b=r.querySelector(".new-issue__close");function A(){o.replaceChildren();let w=document.createElement("option");w.value="",w.textContent="\u2014 Select \u2014",o.appendChild(w);for(let C of Ec){let N=document.createElement("option");N.value=C,N.textContent=Tc(C),o.appendChild(N)}a.replaceChildren();for(let C=0;C<=4;C+=1){let N=document.createElement("option");N.value=String(C);let J=Cc[C]||"Medium";N.textContent=`${C} \u2013 ${J}`,a.appendChild(N)}}A();function k(){try{typeof r.close=="function"?r.close():r.removeAttribute("open")}catch{r.removeAttribute("open")}}function M(w){s.disabled=w,o.disabled=w,a.disabled=w,l.disabled=w,c.disabled=w,f.disabled=w,_.disabled=w,_.textContent=w?"Creating\u2026":"Create"}function P(){u.textContent=""}function S(w){u.textContent=w}function U(){try{let w=window.localStorage.getItem("beads-ui.new.type");w?o.value=w:o.value="";let C=window.localStorage.getItem("beads-ui.new.priority");C&&/^\d$/.test(C)?a.value=C:a.value="2"}catch{o.value="",a.value="2"}}function Q(){let w=o.value||"",C=a.value||"";w.length>0&&window.localStorage.setItem("beads-ui.new.type",w),C.length>0&&window.localStorage.setItem("beads-ui.new.priority",C)}async function x(){P();let w=String(s.value||"").trim();if(w.length===0){S("Title is required"),s.focus();return}let C=Number(a.value||"2");if(!(C>=0&&C<=4)){S("Priority must be 0..4"),a.focus();return}let N=String(o.value||""),J=String(c.value||""),fe={title:w};N.length>0&&(fe.type=N),String(C).length>0&&(fe.priority=C),J.length>0&&(fe.description=J),M(!0);try{await t("create-issue",fe)}catch{M(!1),S("Failed to create issue");return}Q(),M(!1),k()}return r.addEventListener("cancel",w=>{w.preventDefault(),k()}),b.addEventListener("click",()=>k()),f.addEventListener("click",()=>k()),r.addEventListener("keydown",w=>{w.key==="Enter"&&(w.ctrlKey||w.metaKey)&&(w.preventDefault(),x())}),n.addEventListener("submit",w=>{w.preventDefault(),x()}),{open(){n.reset(),P(),U();try{"showModal"in r&&typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")}catch{r.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){k()}}}var $_=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function x_(e,t){return po(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function Ic(e,t,r){return i`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">라벨 표시</div>
      <p class="settings-dialog__hint-block">
        라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을 누르면
        그 라벨만 예외로 다시 표시됩니다.
      </p>
      ${t.length===0?i`<div class="settings-dialog__empty">라벨 없음</div>`:i`<div class="settings-dialog__pills">
            ${t.map(n=>{let s=x_(n,e);return i`<button
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
  `}function Lc(e,t,r){return i`
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
  `}function Oc(e,t){return i`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">카드 표시 요소</div>
      <div class="settings-dialog__toggles">
        ${$_.map(([r,n])=>i`<label class="settings-dialog__toggle">
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
  `}var S_=[{id:"session",label:"\uC138\uC158",glyph:"\u25C6"},{id:"worker",label:"Worker",glyph:"\u25A4"},{id:"display",label:"\uD45C\uC2DC",glyph:"\u25EB"}],Xt="";function Qt(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Pc(e,t){let{transport:r,policyStore:n,labelOptions:s}=t,o=t.notify||($=>de($,"error",4e3)),a=document.createElement("dialog");a.id="settings-dialog",a.className="settings-dialog",a.setAttribute("role","dialog"),a.setAttribute("aria-modal","true"),a.setAttribute("aria-label","\uC124\uC815"),e.appendChild(a);let l="session",c=!1,u="",f={},_={},b=[],A=!1,k=null,M={},P="",S="",U=!1,Q=!1,x=!1,w=null;function C(){let $=t.queueStore?.get();return Qt($)?$.runner_catalog:null}function N(){let $=t.implPresetStore?.get();return Qt($)&&Array.isArray($.presets)?$:null}async function J(){A=!0,K();try{let $=await r("get-session-defaults",{});f=Qt($?.values)?{...$.values}:{},_={...f},b=Array.isArray($?.warnings)?$.warnings:[]}catch($){b=["kv_read_failed"],o(`\uC138\uC158 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${$ instanceof Error?$.message:String($)}`)}finally{A=!1,K()}}async function fe(){let $=Il(f,_);if(Object.keys($).length!==0){try{let D=await r("set-session-defaults",{values:$});f=Qt(D?.values)?{...D.values}:{},_={...f},b=Array.isArray(D?.warnings)?D.warnings:[]}catch(D){o(`\uC138\uC158 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${D instanceof Error?D.message:String(D)}`)}K()}}function ce($,D){D===Xt?delete _[$]:_[$]=D,K(),fe()}async function ie(){let $=t.queueStore?.get();if(!Qt($))return;let D={orchestration_model:$.orchestration_model??null,orchestration_effort:$.orchestration_effort??null,orchestration_speed:$.orchestration_speed??null},V=Ll(D,{...D,...M});if(Object.keys(V).length!==0){try{let Le=await r("worker-queue-set-orchestration-defaults",{expected_revision:$.revision,values:V});if(Le&&Le.applied===!1){o("Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC");return}M={}}catch(Le){o(`Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${Le instanceof Error?Le.message:String(Le)}`)}K()}}function le($,D){M[$]=D===Xt?null:D,K(),ie()}async function Fe($){let D=t.queueStore?.get();if(!(!Qt(D)||$<1)){try{await r("worker-queue-set-slots",{expected_revision:D.revision,slots:$})}catch(V){o(`slots \uC800\uC7A5 \uC2E4\uD328: ${V instanceof Error?V.message:String(V)}`)}K()}}function Ue(){let $={};for(let D of Tl){let V=_[D];typeof V=="string"&&V.length>0&&($[D]=V)}return $}async function ze(){let $=N();if(!$)return;let D=Ue();if(Object.keys(D).length===0){o("\uC800\uC7A5\uD560 \uAD6C\uD604 \uAC12\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uBA3C\uC800 \uAD6C\uD604 \uADF8\uB8F9\uC744 \uC120\uD0DD\uD558\uC138\uC694");return}let V=($.presets||[]).find(Ie=>Ie.id===P),Le=S.trim()||(V?V.name:"");if(!Le){o("\uD504\uB9AC\uC14B \uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694");return}try{let Ie=V?await r("impl-preset-update",{expected_revision:$.revision,id:V.id,name:Le,settings:D}):await r("impl-preset-create",{expected_revision:$.revision,name:Le,settings:D});if(Ie&&Ie.applied){if(S="",!V&&Array.isArray(Ie.presets)){let Ne=Ie.presets.find(Re=>Re.name===Le);P=Ne?Ne.id:P}K()}else o("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),K()}catch(Ie){o(`\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: ${Ie instanceof Error?Ie.message:String(Ie)}`)}}async function Ye(){let $=N();if(!(!$||P.length===0))try{let D=await r("impl-preset-delete",{expected_revision:$.revision,id:P});D&&D.applied?(P="",K()):(o("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),K())}catch(D){o(`\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: ${D instanceof Error?D.message:String(D)}`)}}async function He(){let $=N();if(!(!$||P.length===0)){try{let D=await r("apply-impl-preset-global",{preset_id:P,expected_revision:$.revision});D&&D.applied?(f=Qt(D.values)?{...D.values}:{},_={...f},b=Array.isArray(D.warnings)?D.warnings:[]):D&&D.conflict&&o("\uAD6C\uD604 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: \uD504\uB9AC\uC14B\uC774 \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4")}catch(D){o(`\uAD6C\uD604 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: ${D instanceof Error?D.message:String(D)}`)}K()}}async function Ge(){Q=!0,x=!1,K();try{let $=await r("get-worker-system-prompt",{});!$||typeof $!="object"||Array.isArray($)?x=!0:w=$}catch{x=!0}finally{Q=!1,K()}}function ge(){if(U=!U,U&&!w){Ge();return}K()}function xe(){let $=Qr({loading:Q,error:x});if($)return $;if(!w)return"";let D=Array.isArray(w.variants)?w.variants:[];return i`<div class="settings-dialog__sp-body">
      ${w.target_base_placeholder?i`<div class="prompt-block__meta">
            \`${w.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${D.map(V=>i`<div class="settings-dialog__sp-variant" data-variant=${V.key}>
            <div class="settings-dialog__sp-cond">${V.condition}</div>
            ${_r(V.label,V.system_prompt)}
          </div>`)}
    </div>`}function ke(){return i`<section
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
        aria-expanded=${U?"true":"false"}
        @click=${ge}
      >
        ${U?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
      </button>
      ${U?xe():""}
    </section>`}function Ae($,D,V,Le,Ie,Ne){let Re=Ie[$]??Xt;return i`<select
      class=${Re===Xt?"settings-dialog__unset":""}
      data-key=${$}
      aria-label=${D}
      ?disabled=${Ne===!0}
      .value=${Nr(String(Re))}
      @change=${et=>Le($,String(et.target.value))}
    >
      <option value=${Xt} ?selected=${Re===Xt}>(기본)</option>
      ${V.map(et=>i`<option value=${et} ?selected=${et===Re}>
            ${et===qt?"\uC790\uB3D9":et}
          </option>`)}
    </select>`}function _e($,D,V,Le,Ie,Ne=!1){return i`<div
      class=${`settings-dialog__row${Ne?" settings-dialog__row--off":""}`}
    >
      <span class="settings-dialog__row-label">${D}</span>
      <span class="settings-dialog__controls">
        ${Ae($,D,V,Le,Ie,Ne)}
      </span>
    </div>`}function ne($,D,V,Le,Ie){return i`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">
        <i
          class="settings-dialog__stage-dot"
          style=${`background: var(--stage-${D}-on)`}
        ></i>
        ${$}
      </span>
      <span class="settings-dialog__controls">
        ${Ae(V,`${$} \uBAA8\uB378`,Le,ce,_,!1)}
        ${Ae(Ie,`${$} effort`,Ts,ce,_,!1)}
      </span>
    </div>`}function G(){let $=C(),D=Rl(_),V=_.impl_runtime,Le=_.impl_model,Ie=N();return i`
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
        ${A?i`<div class="settings-dialog__empty">불러오는 중…</div>`:i`
              <div class="settings-dialog__group">
                <div class="settings-dialog__group-title">워크플로우</div>
                <div class="settings-dialog__row">
                  <span class="settings-dialog__row-label">모드</span>
                  <span class="settings-dialog__controls">
                    <span class="settings-dialog__seg" role="group">
                      <button
                        type="button"
                        data-mode=${Xt}
                        aria-pressed=${String(!_.workflow_mode)}
                        @click=${()=>ce("workflow_mode",Xt)}
                      >
                        (기본)
                      </button>
                      ${As.map(Ne=>i`<button
                            type="button"
                            data-mode=${Ne}
                            aria-pressed=${String(_.workflow_mode===Ne)}
                            @click=${()=>ce("workflow_mode",Ne)}
                          >
                            ${Ne}
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
                ${ne("\uC0AC\uC591 \uB9AC\uBDF0","spec","spec_review_model",xn,"spec_review_effort")}
                ${ne("\uACC4\uD68D \uB9AC\uBDF0","plan","plan_review_model",Es,"plan_review_effort")}
                ${ne("\uAD6C\uD604 \uB9AC\uBDF0","impl","impl_review_model",xn,"impl_review_effort")}
              </div>

              <div class="settings-dialog__group">
                <div class="settings-dialog__group-title">
                  구현
                  <span class="settings-dialog__hint"
                    >이슈 핀이 있으면 핀이 우선합니다</span
                  >
                </div>
                ${_e("impl_dispatch","\uC2E4\uD589 \uBC29\uC2DD",xs,ce,_)}
                ${_e("impl_runtime","\uC704\uC784 \uB300\uC0C1",Ss,ce,_,D)}
                ${_e("impl_model","\uBAA8\uB378",Cs($,V),ce,_,D)}
                ${_e("impl_effort","effort",Jr($,V,Le),ce,_,D)}
                ${_e("impl_speed","\uC18D\uB3C4",$n,ce,_,D)}
              </div>

              <div class="settings-dialog__preset-bar">
                <select
                  aria-label="구현 프리셋"
                  .value=${Nr(P)}
                  @change=${Ne=>{P=String(Ne.target.value),K()}}
                >
                  <option value="" ?selected=${P===""}>
                    구현 프리셋…
                  </option>
                  ${(Ie?.presets||[]).map(Ne=>i`<option
                        value=${Ne.id}
                        ?selected=${Ne.id===P}
                      >
                        ${Ne.name}
                      </option>`)}
                </select>
                <button
                  type="button"
                  class="settings-dialog__btn settings-dialog__btn--primary"
                  ?disabled=${P.length===0}
                  @click=${He}
                >
                  전역 기본값으로 적용
                </button>
                <input
                  type="text"
                  class="settings-dialog__preset-name"
                  placeholder=${P?"\uC774\uB984 (\uBE44\uC6B0\uBA74 \uC720\uC9C0)":"\uC0C8 \uD504\uB9AC\uC14B \uC774\uB984"}
                  aria-label="프리셋 이름"
                  .value=${Nr(S)}
                  @input=${Ne=>{S=String(Ne.target.value)}}
                />
                <button
                  type="button"
                  class="settings-dialog__btn"
                  data-preset-save
                  @click=${ze}
                >
                  ${P?"\uAC31\uC2E0":"\uC800\uC7A5"}
                </button>
                <button
                  type="button"
                  class="settings-dialog__btn"
                  data-preset-delete
                  ?disabled=${P.length===0}
                  @click=${Ye}
                >
                  삭제
                </button>
              </div>
            `}
      </section>
    `}function $e(){let $=t.queueStore?.get(),D=C(),V={orchestration_model:M.orchestration_model??(Qt($)?$.orchestration_model:null),orchestration_effort:M.orchestration_effort??(Qt($)?$.orchestration_effort:null),orchestration_speed:M.orchestration_speed??(Qt($)?$.orchestration_speed:null)},Le=Rs(D,k),Ie=Jr(D,k||void 0,V.orchestration_model||qt).filter(Re=>Re!==qt),Ne=Qt($)&&typeof $.slots=="number"?$.slots:2;return i`
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
                .value=${Nr(k||Xt)}
                @change=${Re=>{let et=String(Re.target.value);k=et===Xt?null:et,K()}}
              >
                <option value=${Xt} ?selected=${!k}>
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
          ${_e("orchestration_model","\uBAA8\uB378",Le,le,V)}
          ${_e("orchestration_effort","effort",Ie,le,V)}
          ${_e("orchestration_speed","\uC18D\uB3C4",$n,le,V)}
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
                  @click=${()=>Fe(Ne-1)}
                >
                  −
                </button>
                <span class="settings-dialog__stepper-value">${Ne}</span>
                <button
                  type="button"
                  aria-label="slots 증가"
                  @click=${()=>Fe(Ne+1)}
                >
                  +
                </button>
              </span>
            </span>
          </div>
        </div>
        ${ke()}
      </section>
    `}function be(){let $=n.get();return i`
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
              ${Ic($,s(),E)}
              ${Lc($,u,{onDraft:D=>{u=D},onAdd:H,onRemove:R})}
              ${Oc($,Y)}
            `:i`<div class="settings-dialog__empty">
              표시 정책을 불러오는 중…
            </div>`}
      </section>
    `}async function ee($){let D=n.get();if(D)try{let V=await r("display-policy-set",{expected_revision:D.revision,policy:$(D)});W(V),V&&V.conflict&&V.policy&&(V=await r("display-policy-set",{expected_revision:V.policy.revision,policy:$(V.policy)}),W(V)),V&&V.conflict&&o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC")}catch{o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328")}}function W($){$&&$.policy&&typeof $.policy=="object"&&n.set($.policy)}function j($){ee($)}function E($){let D=n.get();if(!D)return;let V=!A_($,D);j(Le=>E_($,Le,V))}function H(){let $=u.trim();$.length!==0&&(u="",j(D=>D.hidden_prefixes.includes($)?{hidden_prefixes:D.hidden_prefixes}:{hidden_prefixes:[...D.hidden_prefixes,$]}),K())}function R($){j(D=>({hidden_prefixes:D.hidden_prefixes.filter(V=>V!==$)}))}function Y($){let D=n.get();if(!D)return;let V=D.chips[$]===!1;j(()=>({chips:{[$]:V}}))}function K(){je(i`
        <div class="settings-dialog__container">
          <nav
            class="settings-dialog__rail"
            role="tablist"
            aria-orientation="vertical"
          >
            <div class="settings-dialog__rail-title">설정</div>
            ${S_.map($=>i`<button
                  type="button"
                  class="settings-dialog__tab"
                  role="tab"
                  data-tab=${$.id}
                  aria-selected=${String(l===$.id)}
                  aria-controls=${`settings-pane-${$.id}`}
                  @click=${()=>ue($.id)}
                >
                  <span class="settings-dialog__glyph">${$.glyph}</span>
                  ${$.label}
                </button>`)}
            <button
              type="button"
              class="settings-dialog__close"
              aria-label="닫기"
              @click=${Z}
            >
              닫기
            </button>
          </nav>
          <div class="settings-dialog__panes">
            ${G()} ${$e()} ${be()}
          </div>
        </div>
      `,a)}function ue($){l=$,K()}let pe=()=>{c=!1,t.onOpenChange?.(!1)};a.addEventListener("close",pe),a.addEventListener("cancel",pe);let ye=$=>{$.target===a&&Z()};a.addEventListener("click",ye);let T=null;n.subscribe&&(T=n.subscribe(()=>{c&&K()}));let F=null;t.implPresetStore?.subscribe&&(F=t.implPresetStore.subscribe(()=>{c&&K()}));function te($="session"){c||(c=!0,t.onOpenChange?.(!0),l=$,u="",M={},K(),typeof a.showModal=="function"?a.showModal():a.setAttribute("open",""),J())}function Z(){c&&(c=!1,t.onOpenChange?.(!1),typeof a.close=="function"?a.close():a.removeAttribute("open"))}return{open:te,close:Z,sessionDraft:()=>({..._}),destroy(){c=!1,a.removeEventListener("close",pe),a.removeEventListener("cancel",pe),a.removeEventListener("click",ye),T&&(T(),T=null),F&&(F(),F=null),a.remove()}}}function A_(e,t){return t.visible_labels.includes(e)?!0:t.hidden_labels.includes(e)?!1:!t.hidden_prefixes.some(r=>r.length>0&&e.startsWith(r))}function E_(e,t,r){if(!r)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(o=>o!==e)};let n=t.hidden_labels.filter(o=>o!==e);return t.hidden_prefixes.some(o=>o.length>0&&e.startsWith(o))?{hidden_labels:n,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:n}}var T_=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function Dc(e){return String(e).padStart(2,"0")}function C_(e,t){let r=Math.max(0,Math.ceil((e-t)/6e4)),n=Math.floor(r/1440),s=Math.floor(r%1440/60),o=r%60;return n>0?`${n}d${s>0?` ${s}h`:""}`:s>0?`${s}h${o>0?` ${o}m`:""}`:`${o}m`}function R_(e,t=Date.now()){let r=Date.parse(e);if(!Number.isFinite(r))return"";let n=new Date(r),s=new Date(t),o=`${Dc(n.getHours())}:${Dc(n.getMinutes())}`,l=n.getFullYear()===s.getFullYear()&&n.getMonth()===s.getMonth()&&n.getDate()===s.getDate()?o:`${T_[n.getMonth()]} ${n.getDate()} ${o}`;return`${C_(r,t)} \xB7 ${l}`}function I_(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}var Mc=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage"}];function Nc(e){let t=!1,r=null,n=new Map;function s(){je(i``,e),e.hidden=!0}function o(){let c=Mc.filter(f=>n.has(f.key));if(c.length===0){s();return}let u=Date.now();je(i`<div class="usage-meter" aria-label="Usage">
        ${c.map(f=>{let _=n.get(f.key),b=typeof _.ageSeconds=="number"&&_.ageSeconds>600,A=b?`${Math.floor(_.ageSeconds/60)}\uBD84 \uC804 \uCE21\uC815`:"";return i`<span
            class="usage-meter__group${b?" usage-meter__group--stale":""}"
            aria-label=${`${f.label} usage`}
          >
            <span class="usage-meter__provider">${f.label}</span>
            ${_.windows.map(k=>{let M=typeof k.pct=="number"&&Number.isFinite(k.pct)?k.pct:0,P=Math.min(100,Math.max(0,M)),U=`resets ${R_(k.resetsAt,u)}${b?` \xB7 ${A}`:""}`;return i`<span
                class="usage-meter__window ${I_(P)}"
                style=${`--progress: ${P}%`}
                title=${U}
              >
                <span class="usage-meter__label">${k.key}</span>
                <span class="usage-meter__track" aria-hidden="true">
                  <span class="usage-meter__fill"></span>
                </span>
                <span class="usage-meter__pct">${P}%</span>
              </span>`})}
          </span>`})}
      </div>`,e),e.hidden=!1}async function a(c){try{let u=await fetch(c.endpoint);if(!u.ok)return null;let f=await u.json();return!f||f.available!==!0||!Array.isArray(f.windows)?null:f}catch{return null}}async function l(){let c=await Promise.all(Mc.map(async u=>({provider:u,payload:await a(u)})));if(!t){for(let u of c)u.payload?n.set(u.provider.key,u.payload):n.delete(u.provider.key);o()}}return s(),l(),r=setInterval(()=>{l()},6e4),{destroy(){t=!0,r!==null&&(clearInterval(r),r=null),s()}}}function Fc(e){let t=e.attempts?Object.values(e.attempts):[],r=new Map;for(let s of t)s&&r.set(s.bead_id,s.attempt_id);let n=new Map;for(let s of e.done||[])s&&typeof s.bead_id=="string"&&typeof s.added_at=="number"&&n.set(s.bead_id,s.added_at);return s=>{let o=r.get(s.bead_id)!==s.attempt_id,a=n.get(s.bead_id),l=typeof a=="number"&&a>0&&typeof s.finished_at=="number"&&a>=s.finished_at;return!o&&!l&&typeof s.dismissed_at!="number"}}var L_="worker-ineligible";function oa(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function aa(e){return oa(e).includes(L_)}var O_="worker-serial";function ia(e){return oa(e).includes(O_)}function la(e,t,r){if(typeof t!="string"||typeof r!="string")return[];let n=e?.runners;if(!n||!Object.hasOwn(n,t))return[];let s=n[t],o=s?.models;if(!o||!Object.hasOwn(o,r))return[];let a=o[r]?.efforts;return Array.isArray(a)?a.slice():Array.isArray(s.efforts)?s.efforts.slice():[]}var P_=new Set(["done","failed","orphaned","stopped","discarded"]);function qc(e,t){let{queueStore:r,analysisStore:n,transport:s}=t,o=document.createElement("dialog");o.id="worker-parallel-analysis-dialog",o.className="pa",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),e.appendChild(o);let a=new Map,l=new Map,c=!1,u=null,f=null;function _(){return r&&r.get()||{revision:0,queue:[],serial_lanes:[],serial_lane_count:0,attempts:{},pr_wait:[]}}function b(){return n&&n.get()||{settings:{revision:0,runner:null,model:null,effort:null},job:null,last_good:null}}function A(){let T=_(),F=new Set;for(let te of Object.values(T.attempts||{})){let Z=te;Z&&typeof Z.bead_id=="string"&&!P_.has(Z.status)&&F.add(Z.bead_id)}for(let te of Array.isArray(T.pr_wait)?T.pr_wait:[])te&&typeof te.bead_id=="string"&&F.add(te.bead_id);for(let te of Object.values(T.discard_operations||{})){let Z=te;Z&&Z.phase!=="done"&&typeof Z.bead_id=="string"&&F.add(Z.bead_id)}return F}function k(T){return T.filter(F=>M(F)===null)}function M(T){let F=_();for(let te of Array.isArray(F.serial_lanes)?F.serial_lanes:[])if(Array.isArray(te?.entries)&&te.entries.some(Z=>Z.bead_id===T))return te.id;return(Array.isArray(F.queue)?F.queue:[]).some(te=>te.bead_id===T)?"parallel":null}function P(T,F){let te=a.get(T);return te||[...F.order]}function S(T){if(T.length<2)return!1;let F=M(T[0]);if(!F||F==="parallel")return!1;let te=_(),Z=(Array.isArray(te.serial_lanes)?te.serial_lanes:[]).find(D=>D.id===F)?.entries.map(D=>D.bead_id);if(!Array.isArray(Z))return!1;let $=T.map(D=>Z.indexOf(D));return $.every(D=>D>=0)&&$.every((D,V)=>V===0||D>$[V-1])}function U(){let T=_(),F=Array.isArray(T.serial_lanes)?T.serial_lanes:[],te=F.find(Z=>Array.isArray(Z.entries)&&Z.entries.length===0);return te?te.id:F[0]?.id||"s1"}function Q(T){let F=_().bead_titles||{};return typeof F[T]=="string"?F[T]:T}async function x(T,F){if(!s||c)return null;c=!0,E();try{return await s(T,F)}finally{c=!1,E()}}async function w(T){n?.setPending?.(!0);try{let F=await x("worker-parallel-analysis-start",{force:T});F&&F.applied===!1&&F.reason&&de(`\uBD84\uC11D \uC2E4\uD328: ${F.reason}`,"error",2800)}finally{n?.setPending?.(!1)}}async function C(){let T=b().job;!s||!T||await s("worker-parallel-analysis-cancel",{job_id:T.job_id})}function N(){return _().runner_catalog}function J(T){return Object.keys(N()?.runners?.[T]?.models||{})}function fe(T){let F=J(T),te=N()?.runners?.[T]?.default_model;return typeof te=="string"&&F.includes(te)?te:F[0]||""}function ce(){let T=b().settings,F=u||T.runner||"claude",te=J(F),Z=u?fe(F):T.model||te[0]||"",$=la(N(),F,Z),D=T.effort||"",V=$.includes(D)?D:$[0]||"";return{runner:F,model:Z,effort:V,models:te,efforts:$}}async function ie(T){let F=b().settings,te=await x("worker-parallel-analysis-settings-update",{expected_revision:F.revision,runner:T.runner,model:T.model,effort:T.effort});(!te||te.applied!==!0)&&(u=null,E(),te&&te.reason&&de(`\uBD84\uC11D \uC124\uC815 \uAC70\uBD80: ${te.reason}`,"error",2800))}function le(T){u=T,E();let F=ce();ie({runner:T,model:F.model,effort:F.effort})}function Fe(T){let F=ce(),te=la(N(),F.runner,T);ie({runner:F.runner,model:T,effort:te.includes(F.effort)?F.effort:te[0]||""})}function Ue(T){let F=ce();ie({runner:F.runner,model:F.model,effort:T})}async function ze(T,F){if(!s||c)return;let te=P(T,F),Z=b();if(te.length<2||!Z.last_good){de("\uC81C\uCD9C\uD558\uB824\uBA74 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4","warning");return}let $=l.get(T)||U(),D=()=>({snapshot_digest:Z.last_good.identity_digest,group_index:T,lane:$,ordered_bead_ids:te,expected_revision:_().revision});c=!0,E();try{let V=await s("worker-parallel-analysis-submit",D());V&&V.queue&&r&&r.set(V.queue),V&&V.applied!==!0&&V.conflict===!0&&(V=await s("worker-parallel-analysis-submit",D()),V&&V.queue&&r&&r.set(V.queue)),V&&V.applied===!0?(a.delete(T),de(`\uC9C1\uB82C \uB808\uC778 ${$}\uC5D0 ${te.length}\uAC1C \uBC30\uCE58`,"success")):de(`\uC81C\uCD9C \uAC70\uBD80: ${V?.reason||"conflict"} (\uD050 \uBB34\uBCC0\uACBD)`,"error",2800)}finally{c=!1,E()}}function Ye(T,F,te){a.set(T,P(T,F).filter(Z=>Z!==te)),E()}function He(T){a.delete(T),E()}function Ge(T,F,te,Z){let $=[...P(T,F)],D=$.indexOf(te),V=D+Z;D<0||V<0||V>=$.length||($.splice(V,0,...$.splice(D,1)),a.set(T,$),E())}function ge(){let T=b().settings,F=Object.keys(N()?.runners||{}),te=ce();return i`<div class="pa-settings">
      <label class="pa-settings__field"
        >러너
        <select
          class="pa-settings__runner"
          aria-label="분석 러너"
          @change=${Z=>le(Z.target.value)}
        >
          ${F.map(Z=>i`<option
                value=${Z}
                ?selected=${te.runner===Z}
              >
                ${Z}
              </option>`)}
        </select>
      </label>
      <label class="pa-settings__field"
        >분석 모델
        <select
          class="pa-settings__model"
          aria-label="분석 모델"
          @change=${Z=>Fe(Z.target.value)}
        >
          ${te.models.map(Z=>i`<option
                value=${Z}
                ?selected=${te.model===Z}
              >
                ${Z}
              </option>`)}
        </select>
      </label>
      <label class="pa-settings__field"
        >effort
        <select
          class="pa-settings__effort-select"
          aria-label="분석 effort"
          @change=${Z=>Ue(Z.target.value)}
        >
          ${te.efforts.map(Z=>i`<option
                value=${Z}
                ?selected=${te.effort===Z}
              >
                ${Z}
              </option>`)}
        </select>
      </label>
      ${xe(T)}
    </div>`}function xe(T){return!Ae(T)||ke(T)?i`<span class="pa-settings__unset">분석 모델 설정 필요</span>`:T.compatible===!1?i`<span class="pa-settings__incompatible"
        >설정 비호환 — 저장된 ${T.runner}/${T.model} · effort
        ${T.effort} 을(를) 카탈로그가 더는 제공하지 않습니다</span
      >`:T.is_default===!0?i`<span class="pa-settings__default">기본값</span>`:""}function ke(T){return T.is_default===!0&&T.compatible===!1}function Ae(T){return!!(T.runner&&T.model&&T.effort)}function _e(T){return Ae(T)&&T.compatible!==!1}function ne(T){let F=Math.max(0,Math.floor(T/1e3)),te=Math.floor(F/60),Z=F%60;return`${te}:${String(Z).padStart(2,"0")}`}function G(T){let F=T.job;if(F){let te=typeof F.started_at=="number"?F.started_at:0,Z=`${F.runner||"?"}/${F.model||"?"}`,$=te?` \xB7 \uACBD\uACFC ${ne(Date.now()-te)}`:"";return i`<span class="pa-meta__progress"
        >분석 중 — ${Z} · effort ${F.effort||"?"}${$}</span
      >`}return $e()?i`<span class="pa-meta__progress"
          >준비 중 — 대상과 아티팩트 수집 중</span
        >`:""}function $e(){return n?.isPending?.()===!0}function be(T){let F=_(),te=(Array.isArray(F.queue)?F.queue.length:0)+(Array.isArray(F.serial_lanes)?F.serial_lanes:[]).reduce((V,Le)=>V+(Array.isArray(Le.entries)?Le.entries.length:0),0),Z=!!T.job,$=_e(T.settings),D=Z||c||$e();return i`<div class="pa-meta">
      <span class="pa-meta__targets">대상 ${te}</span>
      ${T.last_good?i`<span class="pa-meta__at"
            >분석 ${new Date(T.last_good.at||0).toLocaleString()}</span
          >`:i`<span class="pa-meta__at">분석 결과 없음</span>`}
      ${G(T)}
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
        ?disabled=${!Z}
        @click=${()=>{C()}}
      >
        취소
      </button>
    </div>`}function ee(T,F){let te=P(T,F),Z=A(),$=te.filter(Re=>Z.has(Re)),D=k(te),V=S(te),Le=Array.isArray(_().serial_lanes)?_().serial_lanes:[],Ie=l.get(T)||U(),Ne=F.eligible!==!0||te.length<2||$.length>0||D.length>0||V||c;return i`<section class="pa-group" data-group-index=${String(T)}>
      <header class="pa-group__head">
        <span class="pa-group__confidence">${F.confidence}</span>
        ${F.categories.map(Re=>i`<span class="pa-group__category">${Re}</span>`)}
        ${V?i`<span class="pa-group__applied">✓ 이미 반영됨</span>`:""}
        ${F.eligible===!0?"":i`<span class="pa-group__weak">근거 부족 — 제출 불가</span>`}
        ${D.length>0?i`<span class="pa-group__stale"
              >stale — ${D.join(", ")} 대기 영역 이탈</span
            >`:""}
      </header>
      <p class="pa-group__reason">${F.reason}</p>
      <ol class="pa-group__members">
        ${te.map((Re,et)=>i`<li class="pa-member" data-bead-id=${Re}>
              <span class="pa-member__seq">${et+1}</span>
              <span class="pa-member__title">${Q(Re)}</span>
              ${Z.has(Re)?i`<span class="pa-member__active">실행 중</span>`:""}
              <button
                type="button"
                class="pa-member__up"
                data-bead-id=${Re}
                ?disabled=${et===0}
                aria-label=${`${Re} \uC704\uB85C`}
                @click=${()=>Ge(T,F,Re,-1)}
              >
                ↑
              </button>
              <button
                type="button"
                class="pa-member__down"
                data-bead-id=${Re}
                ?disabled=${et===te.length-1}
                aria-label=${`${Re} \uC544\uB798\uB85C`}
                @click=${()=>Ge(T,F,Re,1)}
              >
                ↓
              </button>
              <button
                type="button"
                class="pa-member__exclude"
                data-bead-id=${Re}
                aria-label=${`${Re} \uC81C\uC678`}
                @click=${()=>Ye(T,F,Re)}
              >
                ✕
              </button>
            </li>`)}
      </ol>
      <ul class="pa-group__evidence">
        ${F.evidence.map(Re=>i`<li class="pa-evidence">
              <code>${Re.path}</code>
              <span class="pa-evidence__locator">${Re.locator}</span>
            </li>`)}
      </ul>
      <footer class="pa-group__foot">
        <button
          type="button"
          class="pa-group__restore"
          @click=${()=>He(T)}
        >
          제안으로 되돌리기
        </button>
        <label class="pa-group__lane-field"
          >제출
          <select
            class="pa-group__lane"
            aria-label="제출 대상 레인"
            @change=${Re=>{l.set(T,Re.target.value),E()}}
          >
            ${Le.map((Re,et)=>i`<option
                  value=${Re.id}
                  ?selected=${Ie===Re.id}
                >
                  직렬 ${et+1}
                </option>`)}
          </select>
        </label>
        <button
          type="button"
          class="pa-group__submit"
          ?disabled=${Ne}
          @click=${()=>{ze(T,F)}}
        >
          제출
        </button>
      </footer>
    </section>`}function W(T){let F=Array.isArray(T.issues)?T.issues:[],te=F.filter($=>$.verdict==="parallel_ok").length,Z=F.filter($=>$.verdict==="uncertain").length;return i`<div class="pa-summary">
      <span>parallel_ok ${te}</span>
      <span>uncertain ${Z}</span>
    </div>`}function j(){let T=H&&!!b().job;if(T&&f===null){f=setInterval(()=>E(),1e3);return}!T&&f!==null&&(clearInterval(f),f=null)}function E(){let T=b();u&&T.settings.runner===u&&(u=null);let F=T.last_good?.result;j(),je(i`
        <div class="pa__container">
          <header class="pa__header">
            <div class="pa__title">병렬성 분석</div>
            <button
              type="button"
              class="pa__close"
              aria-label="닫기"
              @click=${ye}
            >
              ×
            </button>
          </header>
          <div class="pa__body">
            ${ge()} ${be(T)}
            ${F?i`${F.groups.map((te,Z)=>ee(Z,te))}
                ${F.groups.length===0?i`<p class="pa-empty">직렬 권장 그룹 없음</p>`:""}
                ${W(F)}`:i`<p class="pa-empty">
                  아직 분석 결과가 없습니다 — [✳ 분석]을 눌러 시작하세요
                </p>`}
          </div>
        </div>
      `,o)}let H=!1,R=()=>{H=!1,j()},Y=T=>{T.target===T.currentTarget&&ye()};o.addEventListener("close",R),o.addEventListener("cancel",R),o.addEventListener("click",Y);let K=null;r&&r.subscribe&&(K=r.subscribe(()=>{H&&E()}));let ue=null;n&&n.subscribe&&(ue=n.subscribe(()=>{H&&E()}));function pe(){H||(H=!0,E(),typeof o.showModal=="function"?o.showModal():o.setAttribute("open",""))}function ye(){H&&(H=!1,j(),typeof o.close=="function"?o.close():o.removeAttribute("open"))}return{open:pe,close:ye,destroy(){H=!1,f!==null&&(clearInterval(f),f=null),o.removeEventListener("close",R),o.removeEventListener("cancel",R),o.removeEventListener("click",Y),K&&(K(),K=null),ue&&(ue(),ue=null),o.remove()}}}var Bc=new Set(["sh","bash","zsh","dash","ksh"]),jc=/('(?:[^']*)'|"(?:\\.|[^"\\])*"|#.*|\$(?:\{[^}\n]*\}|[A-Za-z_][A-Za-z0-9_]*|[?#@*!$0-9-])|\b(?:if|then|else|elif|fi|for|while|until|do|done|case|esac|in|function|select|time)\b)/g;function Uc(e){let t=e.split("/");return t[t.length-1]||""}function D_(e){let t=e.split(`
`,1)[0];if(!t.startsWith("#!"))return!1;let r=t.slice(2).trim().split(/\s+/).filter(Boolean);if(r.length===0)return!1;let n=Uc(r[0]);if(n!=="env")return Bc.has(n);let s=r.slice(1).find(o=>!o.startsWith("-")&&!o.includes("="));return s!==void 0&&Bc.has(Uc(s))}function M_(e){return e.startsWith("#")?"comment":e.startsWith("'")||e.startsWith('"')?"string":e.startsWith("$")?"variable":"keyword"}function N_(e){let t=[],r=0;jc.lastIndex=0;for(let n of e.matchAll(jc)){let s=n.index;s>r&&t.push({text:e.slice(r,s),kind:"plain"}),t.push({text:n[0],kind:M_(n[0])}),r=s+n[0].length}return r<e.length&&t.push({text:e.slice(r),kind:"plain"}),t.length===0&&t.push({text:e,kind:"plain"}),t}function F_(e){return{bad_request:"\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",forbidden:"\uB4F1\uB85D\uB418\uC9C0 \uC54A\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB294 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",lane_not_declared:"\uD604\uC7AC \uACE0\uC815 \uC120\uC5B8\uC5D0 \uD574\uB2F9 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",stale_declaration:"\uC800\uC7A5\uC18C \uC791\uC5C5 \uC120\uC5B8\uC774 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uD654\uBA74\uC5D0\uC11C \uB2E4\uC2DC \uC5F4\uC5B4 \uC8FC\uC138\uC694.",too_large:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uB108\uBB34 \uCEE4\uC11C \uD654\uBA74\uC5D0 \uD45C\uC2DC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",unsupported_content:"\uD14D\uC2A4\uD2B8 \uD615\uC2DD\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB9CC \uD45C\uC2DC\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",unreadable:"\uACE0\uC815\uB41C \uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."}[e]||"\uC2A4\uD06C\uB9BD\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."}function Wc(e){let t=e.getWorkspacePath,r=e.fetchImpl||globalThis.fetch?.bind(globalThis),n=document.createElement("div");n.className="repo-ops-script-viewer-root",document.body.appendChild(n);let s=null,o="loading",a="",l="",c=0,u=null,f=!1;function _(w,C){return C?N_(w).map(N=>N.kind==="plain"?N.text:i`<span
            class="repo-ops-script-viewer__token repo-ops-script-viewer__token--${N.kind}"
            >${N.text}</span
          >`):w}function b(){if(!s)return i``;let w=o==="ready"&&D_(a),C=o==="ready"?a.split(`
`):[];return i`<div
      class="repo-ops-script-viewer"
      role="dialog"
      aria-modal="true"
      aria-label=${`\uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9: ${s.path}`}
    >
      <div
        class="repo-ops-script-viewer__backdrop"
        @click=${()=>Q()}
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
              @click=${()=>Q()}
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
                  ${C.map((N,J)=>i`<div class="repo-ops-script-viewer__row">
                        <span
                          class="repo-ops-script-viewer__line-number"
                          aria-hidden="true"
                          >${J+1}</span
                        ><code class="repo-ops-script-viewer__code-line"
                          >${_(N,w)}</code
                        >
                      </div>`)}
                </div>`}
        </div>
      </section>
    </div>`}function A(){je(b(),n)}async function k(){if(o!=="ready")return;let w=await lr(a);de(w?"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC\uB428":"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC \uC2E4\uD328",w?"success":"error")}function M(w){w.key==="Escape"&&s&&(w.preventDefault(),Q())}function P(){f||(document.addEventListener("keydown",M),f=!0)}function S(){f&&(document.removeEventListener("keydown",M),f=!1)}async function U(w,C=null){let N=++c;P(),s={...w},u=C||(document.activeElement instanceof HTMLElement?document.activeElement:null),o="loading",a="",l="",A(),n.querySelector(".repo-ops-script-viewer__close")?.focus();let fe=t?t():"";if(!fe){o="error",l="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",A();return}if(!r){o="error",l="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD \uAE30\uB2A5\uC744 \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",A();return}let ce="/api/repo-ops-script?workspace="+encodeURIComponent(fe)+"&lane="+encodeURIComponent(w.lane)+"&base_sha="+encodeURIComponent(w.base_sha);try{let ie=await r(ce),le=await ie.json().catch(()=>({}));if(N!==c)return;if((t?t():"")!==fe){Q();return}if(!ie.ok||!le||le.ok!==!0){o="error",l=F_(le&&typeof le.error=="string"?le.error:""),A();return}s={lane:le.lane,base_sha:le.base_sha,path:le.path,base_ref:le.base_ref},a=String(le.content),o="ready",A()}catch{if(N!==c)return;o="error",l="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",A()}}function Q(){c+=1,S(),s=null,a="",A();let w=u;u=null,w?.isConnected&&w.focus()}function x(){Q(),n.remove()}return{open:U,close:Q,destroy:x}}function zc(e){let t=e.queueStore,r=e.transport,n=e.onChanged||(()=>{}),s=e.onOpenScript;function o(){return t&&t.get()||{}}function a(){let x=o();return typeof x.revision=="number"?x.revision:0}function l(x){t&&x&&x.queue&&typeof x.queue=="object"&&t.set(x.queue)}function c(){let x=o().workspace_info;return x&&typeof x=="object"?x:{}}function u(x,w){return i`<span
      class="worker-repo-ops__vd-badge worker-repo-ops__vd-badge--${x}"
      >${w}</span
    >`}function f(x){if(typeof x!="number"||!Number.isFinite(x))return"";let w=x/6e4;return Number.isInteger(w)?`timeout ${w}\uBD84`:`timeout ${Math.round(x/1e3)}\uCD08`}function _(x){let w=f(x);return w?u("config",w):""}function b(x,w,C){return i`<button
      type="button"
      class="worker-repo-ops__vd-cmd worker-repo-ops__vd-cmd--link"
      .textContent=${C.script}
      @click=${N=>{s&&s({lane:x,base_sha:w.base_sha,path:C.script,base_ref:w.base_ref},N.currentTarget)}}
    ></button>`}function A(x){let w=typeof x.base_sha=="string"?x.base_sha:"",C=`${x.source_path||"repo-ops/config.toml"} @ ${x.base_ref||"?"}${w?`@${w.slice(0,7)}`:""}`;return i`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">
        저장소 작업 선언
        <span class="worker-repo-ops__vd-src">${C}</span>
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
    </section>`}function k(x){let w=x.repo_ops&&typeof x.repo_ops=="object"?x.repo_ops:null;return w&&(w.status==="resolved"||w.status==="absent")?A(w):w&&(w.status==="pending"||w.status==="error")?i`<section class="worker-repo-ops__vd" data-seam="repo-ops">
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
    </section>`}async function M(x){if(!r)return;let w=await r("worker-auto-repair-toggle",{on:x,expected_revision:a()});if(l(w),w&&w.conflict){let C=await r("worker-auto-repair-toggle",{on:x,expected_revision:a()});l(C)}n()}let P={owned_deploy_worktree_fetch_detached_alignment_recreate:"\uC804\uC6A9 \uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC \uC815\uB82C\xB7\uBCF5\uAD6C",recovered_pre_execution_fetch_timeout_retry_once:"fetch \uD0C0\uC784\uC544\uC6C3 1\uD68C \uBCF5\uAD6C",repo_serial_lock_wait:"\uC800\uC7A5\uC18C \uC21C\uCC28 \uC2E4\uD589 \uB300\uAE30",restart_operation_adoption:"\uC7AC\uC2DC\uC791 \uD6C4 \uC791\uC5C5 \uC778\uACC4",exact_input_exit_zero_evidence_adoption:"\uB3D9\uC77C \uC785\uB825 \uC131\uACF5 \uC99D\uAC70 \uC778\uACC4",descendant_success_covers_ancestor_rows:"\uCD5C\uC2E0 SHA \uC131\uACF5\uC774 \uC774\uC804 \uD589 \uCEE4\uBC84",owned_verify_candidate_cleanup:"\uAC80\uC99D \uC784\uC2DC \uCCB4\uD06C\uC544\uC6C3 \uC815\uB9AC",script_retry:"\uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4",auto_repair_session:"\uC790\uB3D9 \uD574\uACB0 \uC138\uC158",user_triggered_session:"\uC0AC\uC6A9\uC790 \uD574\uACB0 \uC138\uC158",automatic:"\uC790\uB3D9",user_action_only:"\uC0AC\uC6A9\uC790 \uD074\uB9AD",script_identity_present:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC788\uC744 \uB54C\uB9CC",per_completion_chain:"\uC644\uB8CC \uCCB4\uC778\uB2F9",unbounded:"\uD69F\uC218 \uC81C\uD55C \uC5C6\uC74C",bounded_single_script_retry_exceeded:"\uB2E8\uC77C \uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4 \uD55C\uB3C4 \uCD08\uACFC",baseline_failure_ignore:"\uAE30\uC874 \uC2E4\uD328 \uBB34\uC2DC",config_or_script_deletion_to_bypass_gate:"\uC124\uC815\xB7\uC2A4\uD06C\uB9BD\uD2B8 \uC0AD\uC81C\uB85C \uAC8C\uC774\uD2B8 \uC6B0\uD68C",credential_entry:"\uC790\uACA9\uC99D\uBA85 \uC785\uB825\xB7\uCD9C\uB825",destructive_action:"\uD30C\uAD34\uC801 \uC791\uC5C5",history_rewrite:"\uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131",agent_self_report_as_success:"\uC138\uC158 \uC790\uAE30\uBCF4\uACE0\uB97C \uC131\uACF5 \uCC98\uB9AC",unbounded_repair_session_retry:"\uBB34\uD55C \uD574\uACB0 \uC138\uC158 \uBC18\uBCF5"};function S(x,w,C){return i`<div class="worker-repo-ops__policy-group" data-policy=${C}>
      <div class="worker-repo-ops__policy-label">${x}</div>
      <ul class="worker-repo-ops__policy-list">
        ${w.map(N=>i`<li data-token=${N}>
              ${P[N]||N}
            </li>`)}
      </ul>
    </div>`}function U(x){return i`<div
      class="worker-repo-ops__policy-group"
      data-policy="resolution-ladder"
    >
      <div class="worker-repo-ops__policy-label">해결 사다리</div>
      <ol class="worker-repo-ops__policy-list">
        ${x.map(w=>{let C=[P[w.trigger]||w.trigger];return Number.isInteger(w.attempts_per_operation_attempt)?C.push(`operation\uB2F9 ${w.attempts_per_operation_attempt}\uD68C`):Number.isInteger(w.attempts)?C.push(`${P[w.budget]||w.budget} ${w.attempts}\uD68C`):Number.isInteger(w.sessions_per_user_action)&&C.push(`${w.sessions_per_user_action}\uD68C`,P[w.user_actions]||w.user_actions),w.applies_when&&C.push(P[w.applies_when]||w.applies_when),i`<li data-token=${w.id}>
            <strong>${P[w.id]||w.id}</strong>
            <span>${C.filter(Boolean).join(" \xB7 ")}</span>
          </li>`})}
      </ol>
    </div>`}function Q(){let x=o(),w=x.auto_repair!==!1,C=x.repo_operation_policy&&typeof x.repo_operation_policy=="object"?x.repo_operation_policy:null,N=Array.isArray(x.repo_operations)?x.repo_operations:[],J=N.find(le=>le.state==="repairing"),fe=N.filter(le=>le.state==="failed"||le.state==="repairing"),ce=fe.length?Math.min(...fe.map(le=>typeof le.repair?.remaining=="number"?le.repair.remaining:0)):C?.auto_repair?.resolution_ladder?.find(le=>le.id==="auto_repair_session")?.attempts??1,ie=Array.isArray(C?.auto_repair?.resolution_ladder)?C.auto_repair.resolution_ladder:[];return i`<section
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
          @change=${le=>{M(le.target.checked)}}
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
          >남은 자동 해결 ${ce}회</span
        >
        <span
          class="worker-repo-ops__repair-session"
          data-seam="auto-repair-session"
          >${J?`\uD574\uACB0 \uC138\uC158 \uC2E4\uD589 \uC911 \xB7 ${J.repair?.owner_bead||J.operation_id}`:"\uC2E4\uD589 \uC911\uC778 \uD574\uACB0 \uC138\uC158 \uC5C6\uC74C"}</span
        >
      </div>
      ${C?i`<details
            class="worker-repo-ops__policy"
            data-seam="policy-lists"
          >
            <summary>
              Worker 자동 처리 기준
              <span class="worker-repo-ops__policy-count"
                >자동 ${(C.worker_automatic||[]).length} · 해결 사다리
                ${ie.length} · 금지
                ${(C.never_automatic||[]).length}</span
              >
            </summary>
            ${S("Worker\uAC00 \uC790\uB3D9 \uCC98\uB9AC",C.worker_automatic||[],"worker-automatic")}
            ${C.supported===!1||C.schema_version!==2?i`<div
                  class="worker-repo-ops__policy-group"
                  data-policy="resolution-ladder"
                >
                  ${`\uACC4\uC57D \uC2A4\uD0A4\uB9C8 \uBD88\uC77C\uCE58 \u2014 \uC790\uB3D9 \uD574\uACB0\uC774 \uC815\uC9C0\uB418\uC5C8\uC2B5\uB2C8\uB2E4 (v${C.schema_version})`}
                </div>`:U(ie)}
            ${S("\uC790\uB3D9\uC73C\uB85C \uD558\uC9C0 \uC54A\uC74C",C.never_automatic||[],"never-automatic")}
          </details>`:""}
    </section>`}return{template(){return i`<details class="worker-repo-ops-settings">
        <summary class="worker-repo-ops-settings__summary">
          저장소 작업 · 검증/배포 선언 · 자동 해결
        </summary>
        ${k(c())} ${Q()}
      </details>`}}}var q_=20,Hc={verify:"\uBA38\uC9C0 \uC804 \uAC80\uC99D",deploy:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC"},Gc={verify_script_failure:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0",verify_script_failure_pre_merge:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0 \uD6C4 \uBA38\uC9C0",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328 \uD574\uACB0",interrupted_without_terminal_exit:"\uC911\uB2E8\uB41C \uC791\uC5C5 \uC9C4\uB2E8"};function B_(e,t,r=q_){let n=[];for(let s of Array.isArray(e)?e:[])!s||typeof s!="object"||n.push({type:"operation",id:s.operation_id,at:typeof s.finished_at=="number"?s.finished_at:typeof s.requested_at=="number"?s.requested_at:null,operation:s});for(let s of Array.isArray(t)?t:[])!s||typeof s!="object"||n.push({type:"cleanup",id:s.bead_id,at:typeof s.at=="number"?s.at:null,cleanup:s});return n.sort((s,o)=>s.at===null&&o.at===null?String(s.id||"").localeCompare(String(o.id||"")):s.at===null?1:o.at===null?-1:o.at-s.at),n.slice(0,Math.max(0,r))}function Vc(e){if(e.type==="cleanup")return"warn";let t=e.operation.state;return t==="succeeded"?"ok":t==="failed"?"fail":"live"}function j_(e){if(e.type==="cleanup")return"\uBA48\uCDA4";switch(e.operation.state){case"succeeded":return"\uC131\uACF5";case"failed":return"\uC2E4\uD328";case"repairing":return"\uC790\uB3D9 \uD574\uACB0 \uC911";case"retry_pending":return"\uC7AC\uC2DC\uB3C4 \uC911";case"running":return"\uC2E4\uD589 \uC911";default:return"\uB300\uAE30"}}function Yc(e){let t=e.filter(r=>r.value);return t.length===0?"":i`<details class="worker-ev__details">
    <summary>세부</summary>
    <dl class="worker-ev__kv">
      ${t.map(r=>i`<div>
            <dt>${r.term}</dt>
            <dd>${r.value}</dd>
          </div>`)}
    </dl>
  </details>`}function Kc(e,t="",r=!1){return!e&&!t?"":i`<p
    class="worker-ev__explain${r?" worker-ev__explain--warn":""}"
  >
    <span class="worker-ev__cause">${e}</span>${t?i`<br />${t}`:""}
  </p>`}function U_(e){if(e.state!=="failed"||e.superseded_by)return"";let t=e.repair||{},r=typeof t.remaining=="number"?t.remaining:0,n=e.failure_kind==="verify_script_failure"&&e.verify_stage==="pre_merge"?"verify_script_failure_pre_merge":e.failure_kind||"",s=r<=0;return i`<div class="worker-ev__acts">
    <button
      type="button"
      class="worker-ev__btn worker-ev__btn--primary worker-repo-op__resolve"
      data-operation-id=${e.operation_id}
      data-failure-kind=${e.failure_kind||""}
      title="해결 세션을 엽니다"
    >
      ${Object.hasOwn(Gc,n)?Gc[n]:"\uC2E4\uD328 \uD574\uACB0 \uC138\uC158 \uC2DC\uC791"}
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
  </div>`}function W_(e){let t=e.operation,r=t.state==="failed",n=t.failure?t.failure.code:"";return i`<li
    class="worker-ev"
    data-operation-id=${t.operation_id}
    data-state=${t.state}
  >
    <span
      class="worker-ev__t"
      title=${e.at?_t(e.at):""}
      >${Ms(e.at)||"\u2014"}</span
    >
    <span class="worker-ev__node" aria-hidden="true"
      ><span class="worker-ev__dot worker-ev__dot--${Vc(e)}"></span
    ></span>
    <div class="worker-ev__body">
      <div class="worker-ev__line1">
        <span class="worker-ev__what"
          >${Object.hasOwn(Hc,t.kind)?Hc[t.kind]:t.kind}</span
        >
        <span class="worker-ev__meta"
          >${t.target_base}@${Ps(t.target_sha)}${typeof t.elapsed_ms=="number"?` \xB7 ${Ds(t.elapsed_ms)}`:""}</span
        >
        <span class="worker-ev__st worker-ev__st--${Vc(e)}"
          >${j_(e)}</span
        >
        ${t.dismissed?i`<span class="worker-ev__st worker-ev__st--quiet">접수됨</span>`:""}
        ${t.superseded_by?i`<span class="worker-ev__st worker-ev__st--quiet">덮임</span>`:""}
      </div>
      ${r?Kc(ac(t.failure_kind,n)):""}
      ${U_(t)}
      ${Yc([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:r?n:""},{term:"script",value:[t.script_path||"",t.script_blob_sha?`blob ${Ps(t.script_blob_sha)}`:"",Number.isInteger(t.exit_code)?`exit ${t.exit_code}`:""].filter(Boolean).join(" \xB7 ")},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function z_(e){let t=e.cleanup,r=Fr(t.step);return i`<li
    class="worker-ev"
    data-bead-id=${t.bead_id}
    data-state="cleanup_stalled"
  >
    <span
      class="worker-ev__t"
      title=${e.at?_t(e.at):""}
      >${Ms(e.at)||"\u2014"}</span
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
        ${tc(t.step).map(n=>i`<li
              class="worker-step worker-step--${n.state}"
              data-step=${n.step}
            >
              <span class="worker-step__pip" aria-hidden="true"></span>
              <span class="worker-step__lb">${n.label}</span>
            </li>`)}
      </ol>
      ${Kc(js(t.reason),typeof t.retry_count=="number"&&t.retry_count>0?`${t.retry_count}\uD68C \uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uD6C4\uC5D0\uB3C4 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.`:"\uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.",!0)}
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
      ${Yc([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:t.reason||""},{term:"\uC9C4\uB2E8",value:t.detail||""},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function H_(e){return i`<section class="worker-repo-drawer" data-seam="repo-ops-timeline">
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
          ${e.events.map(t=>t.type==="cleanup"?z_(t):W_(t))}
        </ul>`}
  </section>`}function Zc(e,t={}){let r=null;function n(){je(r?H_(r):i``,e)}e.addEventListener("click",a=>{a.target?.closest?.('[data-seam="repo-ops-close"]')&&o()});function s(a){r={events:B_(a.operations,a.cleanup_failures),repo:a.repo||""},n()}function o(){r!==null&&(r=null,n(),t.onClose&&t.onClose())}return{open:s,close:o,isOpen:()=>r!==null,refresh(a){r&&s(a)}}}var G_="tab:worker:ready",V_="tab:worker:blocked",Y_="tab:worker:in-progress",K_="tab:worker:closed",Ws=1,Xc=5;function Qc(e){return kn(e).path.length>0}var td="beads-ui.worker.candidate-filter",ca={show_blocked:!1,spec:"all"};function Z_(){try{let e=window.localStorage.getItem(td);if(!e)return{...ca};let t=JSON.parse(e);if(!t||typeof t!="object")return{...ca};let r=t.spec;return{show_blocked:t.show_blocked===!0,spec:r==="with"||r==="without"?r:"all"}}catch{return{...ca}}}function X_(e){try{window.localStorage.setItem(td,JSON.stringify(e))}catch{}}function Q_(e,t){let r=l=>t.show_blocked||!l.blocked,n=l=>t.spec==="all"||(t.spec==="with"?l.has_spec:!l.has_spec),s=[],o=0,a=0;for(let l of e){let c=r(l),u=n(l);c&&u?s.push(l):!c&&u?o+=1:c&&!u&&(a+=1)}return{visible:s,hidden_blocked:o,hidden_spec:a}}var J_=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],rd="bdui.worker.candidate_sort",em=[{value:"spec",label:"spec \uC6B0\uC120"},{value:"board",label:"Board \uC21C\uC11C"},{value:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131\uC21C"}],zs="spec";function tm(){try{let e=window.localStorage.getItem(rd);return e==="board"||e==="created"||e==="spec"?e:zs}catch{return zs}}function rm(e){try{window.localStorage.setItem(rd,e)}catch{}}var nd="bdui.worker.done-range";function nm(){try{let e=window.localStorage.getItem(nd);return Mt(e)?e:It}catch{return It}}function sm(e){try{window.localStorage.setItem(nd,e)}catch{}}var om="(max-width: 640px)",sd="beads-ui.worker.lane-collapsed",On={queue:!0,done:!0};function am(){try{let e=window.localStorage.getItem(sd);if(!e)return{...On};let t=JSON.parse(e);return!t||typeof t!="object"?{...On}:{queue:typeof t.queue=="boolean"?t.queue:On.queue,done:typeof t.done=="boolean"?t.done:On.done}}catch{return{...On}}}function im(e){try{window.localStorage.setItem(sd,JSON.stringify(e))}catch{}}function Jc(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let r=typeof t.title=="string"?t.title:t.id||"";return r.length>22?`${r.slice(0,22)}\u2026`:r}function lm(e,t,r){let n=Array.isArray(e)?e.slice():[];return t==="created"?n.sort(Or):(n.sort(Zn(r)),t==="board"?n:[...n.filter(Qc),...n.filter(s=>!Qc(s))])}function cm(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function dm(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function um(e){let t=e?.blocked_info;if(t&&typeof t=="object"){let s=Array.isArray(t.blockers)?t.blockers.filter(o=>typeof o=="string"&&o.length>0):[];return s.length>0?`\u{1F512} ${s.join(", ")}`:"\u{1F512} blocked"}let n=(Array.isArray(e?.dependencies)?e.dependencies:[]).map(s=>{if(typeof s=="string")return s;if(!s||typeof s!="object")return"";let o=s.type??s.dependency_type;return o!==void 0&&o!=="blocks"?"":s.depends_on_id||s.id||""}).filter(Boolean);return n.length>0?`\u{1F512} ${n.join(", ")}`:"\u{1F512} blocked"}function ed(e){switch(e){case"not_in_pr_wait":return"PR \uB300\uAE30 \uC0C1\uD0DC \uB3D9\uAE30\uD654 \uC2E4\uD328";case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";case"spec_id_missing":return"\uC2A4\uD399 ID \uAE30\uB85D \uC5C6\uC74C";default:return e}}function pm(e){if(e==="lane_occupied")return"\uC2E4\uD589 \uB808\uC778\uC5D0 \uB0A8\uC544 \uC788\uC5B4 \uBA38\uC9C0 \uB300\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4";let t="\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)";return typeof e=="string"&&e.length>0?`${t}: ${e}`:t}function fm(e){return e==="worker_sessions_busy"?"\uD574\uC18C \uB300\uAE30 \u2014 \uC2E4\uD589 \uC2AC\uB86F \uB300\uAE30 \uC911":null}function _m(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}function mm(e){if(!e||typeof e!="object")return null;switch(e.state){case"pending":return{badge:"implementation review \uB300\uAE30",live:!1,alert:!1};case"reviewing":return{badge:"implementation review \uC911",live:!0,alert:!1};case"revising":return{badge:"review \uC218\uC815 \uC911 \xB7 1\uD68C",live:!0,alert:!1};case"failed":{let r=(typeof e.failure_reason=="string"?e.failure_reason:"").replace(/[\u0000-\u001f\u007f]/g," ").slice(0,120);return{badge:r.trim().length>0?`review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328: ${r.trim()}`:"review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328",live:!1,alert:!0}}default:return null}}function da(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}function gm(e){if(!e||typeof e!="object")return null;let t=Number.isInteger(e.repair_sessions_used)?Math.max(0,e.repair_sessions_used):0,r=Number.isInteger(e.repair_session_cap)?Math.max(0,e.repair_session_cap):0,n=e.current_repair&&typeof e.current_repair=="object"?e.current_repair:null,s=n&&typeof n.pr_number=="number"?n.pr_number:null,o="";switch(e.phase){case"gating":o="root \uC7AC\uAC80\uC99D \uC911";break;case"repairing":o=e.subject_role==="root"?`\uC790\uB3D9\uBCF5\uAD6C ${t}/${r} \xB7 \uC6D0 PR \uC218\uC815 \uC911`:`\uC790\uB3D9\uBCF5\uAD6C ${t}/${r} \xB7 repair PR \uC900\uBE44 \uC911`;break;case"waiting_repair_pr":o=s?`repair PR #${s} \uB300\uAE30`:"repair PR \uB300\uAE30";break;case"merging":o=e.subject_role==="repair"?s?`repair PR #${s} \uBA38\uC9C0 \uC911`:"repair PR \uBA38\uC9C0 \uC911":"root \uBA38\uC9C0 \uC911";break;case"cleaning":o="\uC815\uB9AC \uBCF5\uAD6C \uC911";break;case"paused":o="\uC790\uB3D9\uBCF5\uAD6C \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":o=`\uC0AC\uB78C \uD655\uC778 \uD544\uC694 \xB7 ${e.terminal_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`;break;case"completed":return null;default:return null}let a=[o,`\uBCF5\uAD6C \uC138\uC158 ${t}/${r}`];return e.head_sha&&a.push(`head ${e.head_sha}`),e.base_sha&&a.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&a.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`),e.active_attempt_id&&a.push(`attempt ${e.active_attempt_id}`),n&&typeof n.bead_id=="string"&&a.push(`repair ${n.bead_id}`),e.evidence&&a.push(e.evidence),e.log_path&&a.push(e.log_path),{badge:o,title:a.join(`
`),alert:e.phase==="needs_human",lock_actions:e.phase!=="paused"&&e.phase!=="needs_human",repair_pr_url:n&&typeof n.pr_url=="string"?n.pr_url:"",repair_pr_number:s}}function bm(e){let t=e.queue_failure?`\uBA38\uC9C0 \uC2E4\uD328 \uC6D0\uBB38: ${e.queue_failure}`:e.auto_skip?`\uC790\uB3D9 \uC81C\uC678 \uC6D0\uBB38: ${e.auto_skip}`:"",r=(n,s={})=>{let o=[s.title||"",t].filter(Boolean);return{label:n,title:o.join(`
`),live:s.live===!0,alert:s.alert===!0}};return e.continuation_required?r("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694",{alert:!0}):e.merge_step?e.gate?.tier==="merged"?r("\uBA38\uC9C0\uB428",{title:e.merge_step.label,alert:e.merge_step.failed===!0}):r("\uBA38\uC9C0 \uC911",{title:e.merge_step.label,live:!0}):e.conflict_badge?r(e.conflict_badge,{live:e.conflict_live===!0}):e.head_review&&e.head_review.state!=="failed"?r("\uB9AC\uBDF0 \uC9C4\uD589 \uC911",{title:e.head_review.badge,live:e.head_review.live===!0}):e.recovery?.lock_actions?r("\uC790\uB3D9\uBCF5\uAD6C \uC911",{title:e.recovery.title,live:!0}):e.cleanup_failed?r(e.cleanup_label?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${e.cleanup_label}`:"\uC815\uB9AC \uBA48\uCDA4",{title:e.cleanup_failed.reason||"",alert:!0}):e.base_exception?r("\uB2E4\uB978 base \uB300\uC0C1",{title:e.base_exception,alert:!0}):e.conflicting?r("\uCDA9\uB3CC \uD574\uACB0 \uD544\uC694",{alert:!0}):e.gate?.reason==="base_behind"?r("base \uAC31\uC2E0 \uD544\uC694",{alert:!0}):e.gate?.reason==="review_receipt_missing"||e.gate?.reason==="review_receipt_stale"?r("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694",{title:e.gate.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2C8\uAC70\uB098 \uC870\uC0C1 \uD655\uC778\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131\xB7\uBE0C\uB79C\uCE58 \uB9AC\uC14B \uBCF5\uAD6C \uACBD\uB85C\uB85C, \uAD00\uCE21\uB41C \uCD5C\uC885 head \uC804\uCCB4\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uD569\uB2C8\uB2E4":"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uAD00\uCE21\uB41C \uCD5C\uC885 head \uC804\uCCB4\uB97C \uB9AC\uBDF0\uD574\uC57C \uBA38\uC9C0\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4",alert:!0}):e.gate?.reason==="spec_id_missing"?r("\uC2A4\uD399 ID \uB204\uB77D",{title:"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id \uD544\uC694",alert:!0}):e.gate?.reason==="review_receipt_invalid"?r("\uB9AC\uBDF0 \uAE30\uB85D \uC624\uB958",{title:"review_receipt_invalid",alert:!0}):e.head_review?.state==="failed"?r("\uB9AC\uBDF0 \uC2E4\uD328",{title:e.head_review.failure_reason||"",alert:!0}):e.recovery?r(e.recovery.badge,{title:e.recovery.title,alert:!0}):e.gate?.tier==="verify"&&e.gate.gate_badge==="\uAC80\uC99D \uC2E4\uD328"?r("\uAC80\uC99D \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.queue_failure?r(`\uBA38\uC9C0 \uC2E4\uD328 \u2014 ${ed(e.queue_failure)}`,{title:e.queue_failure,alert:!0}):e.auto_skip?r(`\uC790\uB3D9 \uC81C\uC678 \u2014 ${ed(e.auto_skip)}`,{title:e.auto_skip,alert:!0}):e.queued&&!e.queue_active?r(`\uBA38\uC9C0 \uB300\uAE30 #${e.queue_position}`):e.gate?.enabled===!0?r("\uBA38\uC9C0 \uAC00\uB2A5"):e.gate?.tier==="merged"?r("\uBA38\uC9C0\uB428"):e.gate?.tier==="closed_unmerged"?r("\uB2EB\uD798",{alert:!0}):e.activity?r("\uD655\uC778 \uC911",{live:!0}):e.gate?.tier==="undecidable"||e.gate?.reason==="mergeability_unknown"?r("\uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.gate?.tier==="unobserved"||e.gate?.tier==="verify"||e.gate?.gate_badge==="\uAD00\uCE21 \uB300\uAE30"?r("\uD655\uC778 \uC911"):e.gate?.gate_badge?r(e.gate.gate_badge,{title:e.gate.reason||"",alert:e.gate.enabled!==!0}):null}function hm(e,t,r,n,s=null,o=null,a=null,l=!1,c=null,u=!0,f=null,_=null,b=null,A={},k=!1,M=!1,P={}){let S=!!c&&c.position>0,U=!!c?.continuation_action&&c.continuation_action.continuation===null,Q=!!c&&c.active===!0,x=c&&c.failure||null,w=fm(c?c.waiting:null),C=r[e]||null,N=C&&C.gate?C.gate:null,J=C&&C.pr?C.pr:null,fe=gm(b),ce=_m(c?c.resolution:null),ie=mm(c?c.head_review:null),le=c&&c.head_review||null,Fe=c&&c.authority||null,Ue=!!le&&["pending","reviewing","revising"].includes(le.state),ze=S&&!Q&&(le?.state==="failed"||!Fe||Fe.source==="automatic"&&!M),Ye=a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":ce?ce.badge:a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":w,He=!!N&&N.base_badge==="\uCDA9\uB3CC",Ge=!!N&&N.enabled===!0,ge=Cn({bead_id:e,merge_sha:P.merge_sha,cleanup_cursor:P.cleanup_cursor,merge_progress:o&&o.merge_progress?o.merge_progress:null,cleanup_failed:n,repo_operations:P.repo_operations}),xe=Bs(ge),ke=!!n&&["child_sweep","branch_cleanup","parent_close"].includes(n.step)&&!!N&&N.tier==="merged",Ae=l&&!!n&&!!N&&N.tier==="merged",_e=ze&&(Ge||He||N?.reason==="base_behind"||N?.reason==="review_receipt_missing"||N?.reason==="review_receipt_stale"||ke||Ae),ne=l&&He&&u===!1,G=or(A,e,{external:l,merge_active:Q||ge?.step==="merge",merge_queued:S,conflict_active:!!a,cleanup_active:xe,merged:!!n||N?.tier==="merged"}),$e=!!G.operation,be=!ke&&!!n&&n.step==="repo_operations",ee=bm({continuation_required:U,merge_step:ge,conflict_badge:Ye,conflict_live:ce?.live===!0||a==="running",head_review:le&&ie?{...ie,state:le.state,failure_reason:le.failure_reason}:null,recovery:fe,cleanup_failed:n,cleanup_label:n?Fr(n.step):null,base_exception:_,conflicting:He,gate:N,queue_failure:x,auto_skip:f,queued:S,queue_active:Q,queue_position:c?c.position:0,activity:Ye?null:o&&o.activity||null}),W=ee?.live===!0&&ee.title?i`<span title=${ee.title}>${ee.label}</span>`:ee?.label||null;return{id:e,title:l?i`${t}<span class="muted"> · 세션</span>`:t,reason:n&&ge?.active!==!0?qs(n.step):"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",worker_serial:k,external:l,pr_number:J&&typeof J.number=="number"?J.number:null,pr_url:J&&typeof J.url=="string"?J.url:"",completion_badge:ee?.live!==!0&&ee?.title?ee.label:null,completion_title:ee?.title||"",completion_repair_pr_url:fe?fe.repair_pr_url:"",completion_repair_pr_number:fe?fe.repair_pr_number:null,badges:W?[W]:[],live_badge:ee?.live===!0?W:null,usage:s,alert:ee?.alert===!0,merge_action:N?.tier==="merged"&&!ke&&!Ae||be?!1:!S||U||ze,timeline_action:be,cancel_action:S&&!U,cancel_enabled:(!Q||Ue)&&!(fe&&fe.lock_actions),cancel_title:fe&&fe.lock_actions?"\uC790\uB3D9\uBCF5\uAD6C \uC911 \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694":Q&&!Ue?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":Ue?"review \uC9C4\uD589\uC744 \uCDE8\uC18C\uD558\uACE0 \uBA38\uC9C0 \uAD8C\uD55C\uC744 \uD3D0\uAE30\uD569\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:G,discard_action:G.action,merge_step:ge,discard_enabled:G.enabled,discard_title:G.title,merge_enabled:!ge&&!a&&!$e&&!_&&!(fe&&fe.lock_actions)&&!ne&&!be&&(Ge||He||N?.reason==="base_behind"||N?.reason==="review_receipt_missing"||N?.reason==="review_receipt_stale"||ke||Ae||_e),merge_label:U?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":ke||Ae?"\uC815\uB9AC \uC7AC\uAC1C":He&&!ge&&!ke?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":N?.reason==="base_behind"?"base \uAC31\uC2E0 \uD6C4 \uBA38\uC9C0":N?.reason==="review_receipt_missing"||N?.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0":ze?"\uB2E4\uC2DC \uBA38\uC9C0":void 0,merge_title:$e?G.error?`\uD3D0\uAE30 \uC2E4\uD328: ${G.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${G.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:U?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":ge?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${ge.label}`:Ae?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":ne?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":ke?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":He?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":N?.reason==="base_behind"?"base\uB97C \uC790\uB3D9 \uAC31\uC2E0\uD55C \uB4A4 \uBA38\uC9C0\uD569\uB2C8\uB2E4":N?.reason==="review_receipt_missing"||N?.reason==="review_receipt_stale"?"\uC790\uB3D9 \uB9AC\uBDF0 \uC138\uC158 \uD6C4 \uC2B9\uC778\uB418\uBA74 \uBA38\uC9C0\uD569\uB2C8\uB2E4":N?.reason==="spec_id_missing"?"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id\uB85C \uAE30\uB85D\uD55C \uB4A4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":Ge?`\uBA38\uC9C0 (${N.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:N&&N.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${N&&N.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function ua(e,t={}){let{transport:r,issueStores:n,queueStore:s,analysisStore:o,sessionLogStore:a,uiOrderStore:l,gotoIssue:c,getWorkspacePath:u,doneRange:f,onDoneRangeChange:_}=t,b=n?Qn(n,l):null,A=es({transport:r,uiOrderStore:l}),k=null,M=[],P=Z_(),S=tm(),U=Mt(f)?f:nm(),Q=new Map;function x(){let p=rr.find(v=>v.value===U);return p?p.label:"\uC624\uB298"}let w=am(),C=!1,N=new Set,J=new Set,fe=new Set,ce=new Set,ie=[],le=document.createElement("div");le.className="worker-console";let Fe=document.createElement("div");Fe.className="worker-top";let Ue=document.createElement("div");Ue.className="worker-drawer-overlay",Ue.hidden=!0;let ze=document.createElement("div");ze.className="worker-drawer-overlay__backdrop";let Ye=document.createElement("div");Ye.className="worker-drawer-host";let He=document.createElement("div");He.className="worker-drawer-host",He.hidden=!0,Ue.append(ze,Ye,He);let Ge=document.createElement("div");Ge.className="worker-lanes-host",le.append(Fe,Ue,Ge),e.appendChild(le);let ge=null,xe=ws(Ye,{transport:r,sessionLogStore:a,onClose:()=>{ge=null,Ue.hidden=!0,oe()}}),ke=Zc(He,{onClose:()=>{He.hidden=!0,Ue.hidden=!0,oe()}}),Ae=Wc({getWorkspacePath:u||(()=>"")}),_e=u&&u()||"",ne=zc({queueStore:s,transport:r,onChanged:()=>oe(),onOpenScript:(p,v)=>{Ae.open(p,v)}}),G=o?qc(le,{queueStore:s,analysisStore:o,transport:r}):null;function $e(){return s&&s.get()||{revision:0,auto_advance:!1,auto_merge:!1,slots:Ws,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]}}function be(){let p=$e();return typeof p.revision=="number"?p.revision:0}function ee(p){p&&p.queue&&s&&s.set(p.queue)}function W(){let p=$e().queue;return Array.isArray(p)?p.length:0}async function j(p,v,q){if(!r)return;let re=()=>({bead_id:p,...v==="parallel"?{}:{lane:v},index:q,expected_revision:be()}),B=await r("worker-queue-place",re());ee(B),B&&B.conflict&&await r("worker-queue-place",re()).then(ee)}async function E(p,v,q){if(!r)return;let re=()=>({bead_id:p,...v==="parallel"?{}:{lane:v},to_index:q,expected_revision:be()}),B=await r("worker-queue-reorder",re());ee(B),B&&B.conflict&&await r("worker-queue-reorder",re()).then(ee)}async function H(p){if(!r)return;let v=await r("worker-queue-remove",{bead_id:p,expected_revision:be()});ee(v),v&&v.conflict&&await r("worker-queue-remove",{bead_id:p,expected_revision:be()}).then(ee)}async function R(p){if(!r||!p)return;let v=await r("worker-attempt-pause",{attempt_id:p});v&&v.paused===!1&&v.reason&&de(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${v.reason}`,"error",2400)}async function Y(p){if(!r||!p)return;let v=await Yr();if(v===null)return;let q=async(B={})=>await r("worker-attempt-resume",{attempt_id:p,expected_revision:be(),...v!==""?{instructions:v}:{},...B}),re=await q();ee(re),re&&re.conflict&&(re=await q(),ee(re)),re=await cr(re,(B,y)=>q({continuation:B,decision_token:y}),{onResult:ee,refresh:()=>q()}),re&&re.resumed===!1&&!re.conflict&&re.reason&&de(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${re.reason}`,"error",2400)}async function K(p){if(!r||!p)return;let v=await r("worker-attempt-dismiss",{attempt_id:p,expected_revision:be()});ee(v),v&&v.conflict&&(v=await r("worker-attempt-dismiss",{attempt_id:p,expected_revision:be()}),ee(v)),v&&v.dismissed===!1&&!v.conflict&&v.reason&&de(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${v.reason}`,"error",2400)}async function ue(p,v,q=!0){if(!r)return null;let re=r,B=await re(p,{...v,expected_revision:be()});return ee(B),B&&B.conflict&&q&&(B=await re(p,{...v,expected_revision:be()}),ee(B)),B}async function pe(p){if(!r||!p)return;let v=$e().merge_queue?.find(re=>re.bead_id===p)?.continuation_action;if(v?.mismatch&&v.continuation===null){await T(p,v.mismatch);return}N.add(p),oe();let q;try{q=await ue("worker-merge-queue-add",{bead_id:p})}finally{N.delete(p),oe()}!q||q.conflict||q.applied||de(pm(q.reason),"error",2400)}async function ye(p){if(!(!r||!p||J.has(p))){J.add(p),oe();try{let v=await r("worker-cleanup-retry",{bead_id:p,expected_revision:be()});ee(v),v&&!v.retried&&!v.conflict&&v.reason&&de(`\uC815\uB9AC \uC7AC\uAC1C \uAC70\uBD80: ${v.reason}`,"error",2400)}finally{J.delete(p),oe()}}}async function T(p,v){let q=await cr({continuation_mismatch:v},(B,y)=>ue("worker-merge-queue-add",{bead_id:p,continuation:B,decision_token:y},!1)),re=q?.queue?.merge_queue?.find(B=>B.bead_id===p)?.continuation_action;if(q?.applied!==!0&&re?.continuation===null&&re.mismatch){await T(p,re.mismatch);return}q&&q.applied===!1&&!q.conflict&&de("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD\uC774 \uCD5C\uC2E0 \uC0C1\uD0DC\uC640 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4","error",2800)}async function F(p){if(!r)return;let v=await ue("worker-merge-auto-toggle",{on:p});!v||v.conflict||de(p?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",p?"success":"info",2400)}async function te(p){if(!r||!p)return;let v=await ue("worker-merge-queue-remove",{bead_id:p});v&&!v.conflict&&!v.applied&&v.reason==="merge_active"&&de("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function Z(){await ue("worker-merge-queue-remove",{all:!0})}async function $(p,v=null,q="unmerged",re=null){if(!r||!p)return;let B=An(p,q);if(!(!!re||typeof globalThis.confirm!="function"||globalThis.confirm(B)))return;let I=await r("worker-discard",{bead_id:p,...v?{attempt_id:v}:{},...re?{operation_id:re}:{},expected_revision:be()});if(ee(I),I&&I.conflict&&(I=await r("worker-discard",{bead_id:p,...v?{attempt_id:v}:{},...re?{operation_id:re}:{},expected_revision:be()}),ee(I)),I&&I.discarded===!0){de(Ns(I),"success",5e3);return}if(I&&I.reason){de(`\uD3D0\uAE30 \uC2E4\uD328: ${I.reason}`,"error",2800);return}if(I&&I.accepted&&I.pending==="merged_revert"){de("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(I&&I.accepted&&!I.discarded){de(`\uD3D0\uAE30 \uC9C4\uD589: ${I.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}I&&!I.conflict&&de("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function D(p,v,q){if(!(!r||!v||!q||ce.has(v))){ce.add(v),oe();try{let re=await r(p,{bead_id:v,action_id:q,expected_revision:be()});ee(re),re?.conflict?de("\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694.","error",2800):!re?.ok&&re?.reason&&de(`\uC774\uC804 \uC791\uC5C5 \uCC98\uB9AC \uAC70\uBD80: ${String(re.reason)}`,"error",2800)}finally{ce.delete(v),oe()}}}async function V(p,v){if(!r||!v||fe.has(v))return;fe.add(v),oe();let q;try{let re=async(B={})=>await r(p,{bead_id:v,expected_revision:be(),...B});q=await re(),ee(q),q&&q.conflict&&(q=await r(p,{bead_id:v,expected_revision:be()}),ee(q)),p==="worker-revise-fix"&&(q=await cr(q,(B,y)=>re({continuation:B,decision_token:y}),{onResult:ee,refresh:()=>re()}))}finally{fe.delete(v),oe()}if(!(!q||q.conflict)){if(q.ok){de(p==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}de(`\uCC98\uBD84 \uAC70\uBD80: ${q.reason||""}`,"error",3e3)}}async function Le(p){if(!r)return;let v=await r("worker-automation-toggle",{on:p,expected_revision:be()});ee(v),v&&v.conflict&&await r("worker-automation-toggle",{on:p,expected_revision:be()}).then(ee)}async function Ie(p){if(!r||!p)return;let v=await r("worker-repo-operation-repair",{operation_id:p});if(ee(v),v&&v.ok===!1){de(`\uD574\uACB0 \uC138\uC158 \uAC70\uBD80: ${v.reason||""}`,"error",3e3);return}v&&v.ok===!0&&de("\uD574\uACB0 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4","success",2400)}async function Ne(p){if(!r||!p)return;let v=await r("worker-repo-operation-dismiss",{operation_id:p});ee(v),v&&v.ok===!1&&de(`\uAE30\uB85D \uB2EB\uAE30 \uAC70\uBD80: ${v.reason||""}`,"error",3e3)}async function Re(p){if(!r||!Number.isFinite(p))return;let v=Math.max(Ws,Math.floor(p)),q=await r("worker-queue-set-slots",{slots:v,expected_revision:be()});ee(q),q&&q.conflict&&await r("worker-queue-set-slots",{slots:v,expected_revision:be()}).then(ee)}async function et(p){if(!r||!Number.isInteger(p)||p<1||p>Xc)return;let v=$e(),q=(Array.isArray(v.serial_lanes)?v.serial_lanes:[]).slice(p).reduce((y,I)=>y+(Array.isArray(I?.entries)?I.entries.length:0),0),re=()=>({count:p,expected_revision:be()}),B=await r("worker-queue-set-serial-lane-count",re());ee(B),B&&B.conflict&&(B=await r("worker-queue-set-serial-lane-count",re()),ee(B)),B&&B.applied&&q>0&&de(`\uC9C1\uB82C \uB808\uC778 \uCD95\uC18C \u2014 ${q}\uAC1C \uD56D\uBAA9\uC774 \uBCD1\uB82C \uB300\uAE30\uB85C \uC774\uB3D9`)}function bt(){let p=$e(),v=b?b.selectBoardColumn(G_,"ready"):[],q=b?b.selectBoardColumn(V_,"blocked"):[],re=b?b.selectBoardColumn(K_,"closed"):[],B=b?b.selectBoardColumn(Y_,"in_progress"):[],y=new Map;for(let g of B){let L=dm(g);if(!L)continue;let ae=y.get(L);ae?ae.push(g):y.set(L,[g])}let I=g=>{let L=Jn(y.get(g)||[]);return L?L.title||L.id:null},se=p.bead_titles||{},Te=new Map;for(let[g,L]of Object.entries(se))typeof L=="string"&&L.length>0&&Te.set(g,L);for(let g of[...v,...q])Te.set(g.id,g.title||g.id);let Je=p.bead_times&&typeof p.bead_times=="object"&&!Array.isArray(p.bead_times)?p.bead_times:{},Be=p.bead_labels&&typeof p.bead_labels=="object"&&!Array.isArray(p.bead_labels)?p.bead_labels:{},Ze=new Map;for(let[g,L]of Object.entries(Be))Array.isArray(L)&&Ze.set(g,ia(L));for(let g of[...v,...q]){let L=g.labels;Array.isArray(L)&&!Ze.has(g.id)&&Ze.set(g.id,ia(L))}let Se=new Map,d=o?.get()?.last_good?.result?.groups;for(let g of Array.isArray(d)?d:[]){if(g?.eligible!==!0||!Array.isArray(g.members))continue;let L=g.members.map(qe=>{let ot=(Array.isArray(p.serial_lanes)?p.serial_lanes:[]).find(Wt=>Wt.entries.some(kt=>kt.bead_id===qe));return ot?ot.id:null});if(!(L.every(qe=>qe!==null)&&new Set(L).size===1))for(let qe of g.members)Se.set(qe,g.members.filter(ot=>ot!==qe))}let m=p.bead_blocked_by&&typeof p.bead_blocked_by=="object"&&!Array.isArray(p.bead_blocked_by)?p.bead_blocked_by:{},h=new Map;for(let[g,L]of Object.entries(Je))L&&typeof L=="object"&&h.set(g,L);for(let g of[...v,...q])h.set(g.id,{created_at:g.created_at,updated_at:g.updated_at});let O=g=>h.get(g)||{},me=p.pr_wait||[],he=p.pr_observations||{},Ce=p.pr_activity||{},Me=p.cleanup_failed||{},pt=Object.entries(Me).map(([g,L])=>({bead_id:g,step:L&&L.step?L.step:"",reason:L&&L.reason?L.reason:"",at:L&&typeof L.at=="number"?L.at:null,detail:L&&typeof L.detail=="string"?L.detail:null,output_tail:L&&typeof L.output_tail=="string"&&L.output_tail?L.output_tail:void 0,log_path:L&&typeof L.log_path=="string"&&L.log_path?L.log_path:void 0,retry_count:L&&typeof L.retry_count=="number"&&Number.isInteger(L.retry_count)&&L.retry_count>0?L.retry_count:0,failure_code:L&&typeof L.failure_code=="string"?L.failure_code:void 0,subject_id:L&&typeof L.subject_id=="string"?L.subject_id:void 0,repair_eligible:!!(L&&L.repair_eligible),repair:L&&L.repair?L.repair:void 0})),tr=p.queue||[],Oe=new Set([...tr.map(g=>g.bead_id),...(Array.isArray(p.serial_lanes)?p.serial_lanes:[]).flatMap(g=>(Array.isArray(g?.entries)?g.entries:[]).map(L=>L.bead_id)),...me.map(g=>g.bead_id),...p.done.map(g=>g.bead_id)]),dt=new Set(q.map(g=>g.id)),tn=l?l.get()?.order||{}:{},ma=new Set,ga=[];for(let g of[...v,...q])Oe.has(g.id)||ma.has(g.id)||cm(g)||Object.hasOwn(g,"labels")&&aa(g.labels)||(ma.add(g.id),ga.push(g));M=lm(ga,S,tn);let bd=p.admission||{},ba=g=>{let L=bd[g];if(!L)return"";if(L.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let ae=typeof L.reason=="string"?L.reason:"",qe=ae.indexOf(":");return qe>0&&qe<ae.length-1?`\u26D4 ${ae.slice(0,qe)} (${ae.slice(qe+1)})`:`\u26D4 ${ae}`},hd=M.map(g=>{let L=kn(g),ae=L.path.length>0,qe=g.workflow?.route==="quick_fix"||g.metadata&&g.metadata.route==="quick_fix",ot=!Object.hasOwn(g,"description")||typeof g.description=="string"&&g.description.trim().length>0,kt=!(Object.hasOwn(g,"labels")&&aa(g.labels))&&(qe?ot:ae&&!L.conflict),nt=dt.has(g.id),zt=[];nt&&zt.push(um(g)),qe&&!ot?zt.push("missing_description"):!qe&&L.conflict?zt.push("spec_id_conflict"):!qe&&!ae&&zt.push("spec \uC5C6\uC74C");let jn=ba(g.id);return jn&&zt.push(jn),{id:g.id,title:g.title||g.id,reason:zt.join(" \xB7 "),draggable:kt,lane:"candidate",created_at:g.created_at,updated_at:g.updated_at,workflow:g.workflow,is_quick_fix:qe,status:g.status,blocked:nt,has_spec:ae}}),Hs=Q_(hd,P),yd=Hs.visible,vd=p.revise_parked||{},Pn=p.discard_operations&&typeof p.discard_operations=="object"&&!Array.isArray(p.discard_operations)?p.discard_operations:{},Gs=(g,L)=>g.map((ae,qe)=>{let ot=L!=="done",Wt=L!=="done"&&L!=="queue",kt=ot?vd[ae.bead_id]:null,nt=ot?or(Pn,ae.bead_id):null,zt=nt?.operation?nt:null,jn=ot&&Ze.get(ae.bead_id)===!0,ja=m[ae.bead_id]||[],Xs=p.admission&&typeof p.admission=="object"?p.admission[ae.bead_id]:null,Qs=ot?Jl(Xs,!!zt||ce.has(ae.bead_id)):null,Od=ot&&!Qs?ba(ae.bead_id):null,Pd=ot?[Od]:[],Ua=ot&&ja.length>0&&typeof Xs?.reason=="string"&&Xs.reason.startsWith("not_ready")?[`\u23F8 ${ja.join(", ")} \uC644\uB8CC \uB300\uAE30 (blocks)`]:[],Js=ot?Se.get(ae.bead_id):void 0;return Js&&Js.length>0&&Ua.push(`\u2733 serial \uAD8C\uC7A5 \xB7 ${Js.join(", ")}\uC640`),{id:ae.bead_id,title:Te.get(ae.bead_id)||ae.bead_id,reason:Pd.filter(Boolean).join(" \xB7 "),draggable:ot&&!zt&&!Qs,done:L==="done",lane:L,seq:Wt?qe+1:void 0,worker_serial:jn,discard:zt,stale_work:Qs,badges:[...Ua,...kt?["\u23F8 REVISE \uD30C\uD0B9"]:[]],alert:!!kt,revise_action:!!kt,revise_enabled:!!kt&&!zt&&!fe.has(ae.bead_id),revise_title:kt?kt.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${kt.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":"",usage:L==="done"?Nt(p.attempts||{},ae.bead_id):null,work_ms:L==="done"?Xl(p.attempts||{},ae.bead_id):null,done_at:L==="done"&&typeof ae.added_at=="number"?ae.added_at:void 0,...O(ae.bead_id)}}),Br=p.attempts?Object.values(p.attempts):[],Vs=new Set;for(let g of Br)g&&typeof g.resumed_from=="string"&&g.resumed_from.length>0&&Vs.add(g.resumed_from);let ha=new Map;for(let g of Br)ha.set(g.bead_id,g.attempt_id);let Dn=new Map;for(let g of Br)Dn.set(g.attempt_id,g);function Ys(g){let L=new Set,ae=g;for(;ae&&!L.has(ae.attempt_id);){if(ae.conflict_resolution===!0)return!0;L.add(ae.attempt_id),ae=typeof ae.resumed_from=="string"&&ae.resumed_from.length>0&&Dn.get(ae.resumed_from)||null}return!1}let Mn=typeof p.declared_base=="string"?p.declared_base:null;function wd(g){let L=null;for(let ae of Br)!ae||ae.bead_id!==g||Ys(ae)||(L===null||(typeof ae.started_at=="number"?ae.started_at:0)>=(typeof L.started_at=="number"?L.started_at:0))&&(L=ae);return L&&typeof L.target_base=="string"?L.target_base:null}let ya=[],va=[],kd=Fc(p),wa=g=>{let L=typeof g.session_id=="string"&&g.session_id.length>0,ae=Vs.has(g.attempt_id);return{eligible:L&&!ae,reason:L?ae?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}},Ut=null;for(let g of Br){let L=g.status==="paused"&&!Vs.has(g.attempt_id);if(g.status==="running"||L)va.push({bead_id:g.bead_id,attempt_id:g.attempt_id,title:Te.get(g.bead_id)||g.bead_id,runner:g.runner||null,model:g.model||null,effort:g.effort||null,speed:g.speed||null,continuation_mode:g.continuation_mode||null,started_at:typeof g.started_at=="number"?g.started_at:null,resumed_from:g.resumed_from||null,paused:L,conflict_resolution:Ys(g),base_exception:da(Mn,g.target_base),can_pause:typeof g.session_id=="string"&&g.session_id.length>0,discard:or(Pn,g.bead_id,{attempt_id:g.attempt_id}),usage:Nt(p.attempts||{},g.bead_id),current_child:I(g.bead_id),...O(g.bead_id)});else if((g.status==="failed"||g.status==="orphaned")&&kd(g)){let ae=wa(g);ya.push({bead_id:g.bead_id,attempt_id:g.attempt_id,title:Te.get(g.bead_id)||g.bead_id,runner:g.runner||null,model:g.model||null,effort:g.effort||null,speed:g.speed||null,continuation_mode:g.continuation_mode||null,started_at:typeof g.started_at=="number"?g.started_at:null,resumed_from:g.resumed_from||null,failed:!0,status:g.status,status_label:g.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328",discard:or(Pn,g.bead_id,{attempt_id:g.attempt_id}),resume_eligible:ae.eligible,resume_reason:ae.reason,conflict_resolution:Ys(g),base_exception:da(Mn,g.target_base),usage:Nt(p.attempts||{},g.bead_id),current_child:I(g.bead_id),...O(g.bead_id)}),Ut=g}}let Nn=[...ya,...va].map(g=>{let L=Dn.get(g.attempt_id),ae=L?.quickfix_landing;if(L?.quickfix_lane!==!0||!ae||typeof ae!="object")return g;let qe=typeof ae.reason=="string"&&ae.reason.length>0?ae.reason:null,ot=Cn({bead_id:L.bead_id,merge_sha:ae.head_sha,cleanup_cursor:ae.cursor,cleanup_failed:qe?{step:ae.cursor,reason:qe}:null,repo_operations:Array.isArray(p.repo_operations)?p.repo_operations:[]});return ot?{...g,landing:ot}:g}),ka=null;if(Ut){let g=wa(Ut),L=Ut.cause_detail;ka={bead_id:Ut.bead_id,repo:Ut.repo||"",reason:Ut.cause||Ut.status,cause_detail:L&&typeof L.reason=="string"?{reason:L.reason,command:typeof L.command=="string"?L.command:null}:null,resume_attempt_id:Ut.attempt_id,resume_eligible:g.eligible,resume_reason:g.reason,discard:or(Pn,Ut.bead_id,{attempt_id:Ut.attempt_id})}}let $a=new Set(Nn.map(g=>g.bead_id)),Ks=Array.isArray(p.merge_queue)?p.merge_queue:[],xa=new Map,Sa=new Map,Aa=new Map,Ea=new Map,Ta=new Map;Ks.forEach((g,L)=>{g&&typeof g.bead_id=="string"&&(xa.set(g.bead_id,L+1),Sa.set(g.bead_id,g.resolution),Aa.set(g.bead_id,g.continuation_action||null),Ea.set(g.bead_id,g.head_review||null),Ta.set(g.bead_id,g.authority||null))});let jr=p.merge_queue_state||{active:null,failures:{}},$d=jr.failures||{},Ca=jr.waiting&&typeof jr.waiting.bead_id=="string"&&typeof jr.waiting.reason=="string"?jr.waiting:null,xd=p.auto_merge_skips||{},Ra=g=>{let L=xd[g];if(!L)return null;let ae=he[g],qe=ae&&ae.pr?ae.pr.head_sha:null;return qe&&qe===L.head_sha?L.reason||"":null},Fn=new Map;for(let g of Nn)g.failed!==!0&&g.conflict_resolution&&(g.paused?Fn.has(g.bead_id)||Fn.set(g.bead_id,"paused"):Fn.set(g.bead_id,"running"));let Ia=Nn.filter(g=>!g.paused&&g.failed!==!0).length,La=(p.workspace_info||{}).slots,Oa=typeof La=="number"?La:typeof p.slots=="number"?p.slots:Ws,Sd=Ia>Oa,qn=Ir(U),Ad=(Array.isArray(p.done)?p.done.slice():[]).filter(g=>qn===void 0||typeof g.added_at!="number"||g.added_at>=qn).sort((g,L)=>(L.added_at||0)-(g.added_at||0)),rn=Gs(Ad,"done"),Ed=new Set((Array.isArray(p.done)?p.done:[]).map(g=>g?.bead_id).filter(g=>typeof g=="string")),Pa=[],Td=u?.()||"";for(let g of re){let L=Pr(g.closed_at);if(typeof g.id!="string"||Ed.has(g.id)||L===null||qn!==void 0&&L<qn||typeof g.comment_count!="number"||g.comment_count<=0)continue;let ae=`${Td}\0${g.id}\0${String(g.updated_at)}\0${g.comment_count}`,qe=Q.get(ae);qe===void 0&&r&&(Q.set(ae,"pending"),Promise.resolve(r("get-comments",{id:g.id})).then(ot=>{let Wt=Array.isArray(ot)&&ot.some(kt=>ks(typeof kt?.text=="string"?kt.text:"")?.lane==="session");Q.set(ae,Wt?"session":"not-session"),oe()}).catch(()=>{Q.set(ae,"failed"),oe()})),qe==="session"&&Pa.push({id:g.id,title:g.title||g.id,reason:"",draggable:!1,done:!0,lane:"done",selectable:!1,selected:!1,worker_serial:!1,badges:["\uC138\uC158 \uC791\uC5C5"],alert:!1,usage:null,work_ms:null,done_at:L,created_at:g.created_at,updated_at:g.updated_at})}rn.push(...Pa),rn.sort((g,L)=>(L.done_at||0)-(g.done_at||0));let Bn={};for(let g of dr)Bn[g]=0;let Da=!1,Ma=0,Zs=0,Na=0;for(let g of rn){let L=g.usage;if(L&&typeof L=="object"){let ae=!1;for(let qe of dr)Number.isFinite(L[qe])&&(Bn[qe]+=L[qe],Da=!0,ae=!0);ae&&(Zs+=1,Number.isFinite(L.total_cost_usd)&&(Ma+=L.total_cost_usd,Na+=1))}}Zs>0&&Na===Zs&&(Bn.total_cost_usd=Ma);let Fa=rn.map(g=>g.usage).filter(g=>g&&typeof g=="object"&&g.providers),Cd=Fa.length>0?gt(is(Fa)):Da?Gt(Bn):null,Rd=p.lane_states&&typeof p.lane_states=="object"&&!Array.isArray(p.lane_states)?p.lane_states:{},Id=Array.isArray(p.serial_lanes)?p.serial_lanes:[],qa=g=>{if(me.some(qe=>qe.bead_id===g))return"PR \uB300\uAE30 \xB7 \uC810\uC720";let L=Br.filter(qe=>qe&&qe.bead_id===g),ae=L.length>0?L[L.length-1].status:null;return ae==="failed"||ae==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":ae==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720"},Ba=Id.filter(g=>g&&typeof g.id=="string"&&Array.isArray(g.entries)).map((g,L)=>{let ae=Rd[g.id]||{},qe=new Map((Array.isArray(ae.corrections)?ae.corrections:[]).filter(nt=>nt&&typeof nt.bead_id=="string"&&typeof nt.after=="string").map(nt=>[nt.bead_id,nt.after])),ot=Gs(g.entries.filter(nt=>!$a.has(nt.bead_id)),g.id).map(nt=>qe.has(nt.id)?{...nt,badges:[`\u{1F517} ${qe.get(nt.id)} \uB4A4 (blocks \uC790\uB3D9)`,...nt.badges]}:nt),Wt=Array.isArray(ae.occupied_by)?ae.occupied_by.filter(nt=>typeof nt=="string"):[],kt=Wt.map(nt=>({id:nt,title:Te.get(nt)||nt,draggable:!1,lane:g.id,ghost:!0,badges:[qa(nt)]}));return{id:g.id,index:L+1,rows:[...kt,...ot],occupied:Wt.length>0,badge:Wt.length>0?qa(Wt[0]):"\uB300\uAE30",cycle:ae.cycle===!0}}),Ld=typeof p.serial_lane_count=="number"?p.serial_lane_count:Ba.length;return{queue:p,idToTitle:Te,candidates:yd,candidate_hidden:{blocked:Hs.hidden_blocked,spec:Hs.hidden_spec},running:Nn,live_count:Ia,slots:Oa,over_cap:Sd,failure:ka,waiting:Gs(tr.filter(g=>!$a.has(g.bead_id)),"queue"),serial_lanes:Ba,serial_lane_count:Ld,pr_wait:me.map(g=>hm(g.bead_id,Te.get(g.bead_id)||g.bead_id,he,Me[g.bead_id]||null,Nt(p.attempts||{},g.bead_id),Ce[g.bead_id]||(N.has(g.bead_id)||J.has(g.bead_id)?{activity:null,merge_progress:{step:"merging"}}:null),Fn.get(g.bead_id)||null,g.external===!0,{position:xa.get(g.bead_id)||0,active:jr.active===g.bead_id,failure:$d[g.bead_id]||null,waiting:Ca?.bead_id===g.bead_id?Ca.reason:null,resolution:Sa.get(g.bead_id),continuation_action:Aa.get(g.bead_id),head_review:Ea.get(g.bead_id)||null,authority:Ta.get(g.bead_id)||null},g.wt_present!==!1,p.auto_merge===!0?Ra(g.bead_id):null,da(Mn,wd(g.bead_id)),p.completion_status&&typeof p.completion_status=="object"&&!Array.isArray(p.completion_status)&&p.completion_status[g.bead_id]||null,p.discard_operations&&typeof p.discard_operations=="object"&&!Array.isArray(p.discard_operations)?p.discard_operations:{},Dn.get(ha.get(g.bead_id)||"")?.worker_serial===!0,p.auto_merge===!0,{merge_sha:g.merge_sha,cleanup_cursor:g.cleanup_cursor,repo_operations:Array.isArray(p.repo_operations)?p.repo_operations:[]})).map(g=>({...g,...O(g.id)})),merge_queue_length:Ks.length,merge_queue_running:Ks.length>0,auto_excluded:me.map(g=>g.bead_id).filter(g=>Ra(g)!==null),declared_base:Mn,done:rn,token_total:Cd,cleanup_failures:pt,repo_operations:Array.isArray(p.repo_operations)?p.repo_operations:[]}}function ht(){let v=!!o?.get()?.job,q=!v&&o?.isPending?.()===!0,re=v?"\uBD84\uC11D \uC911":q?"\uC900\uBE44 \uC911":"";return i`<button
      type="button"
      class=${re?"worker-analysis-btn worker-analysis-btn--running":"worker-analysis-btn"}
      aria-busy=${re?"true":"false"}
      title="대기 이슈의 병렬 실행 가능성을 분석해 직렬 그룹을 제안합니다 (클릭할 때만 실행)"
    >
      ✳ 병렬성
      분석${re?i`<span class="worker-analysis-btn__badge">${re}</span>`:""}
    </button>`}function at(p){let v=p.waiting.length>0?p.waiting[0].id:"\u2014",q=i`<button
      type="button"
      class="worker-play${p.queue.auto_advance?" is-active":""}"
    >
      ${p.queue.auto_advance?"\u23F8 \uC790\uB3D9\uD654 \uBA48\uCDA4":"\u25B6 \uC790\uB3D9\uD654"}
    </button>`,re=X(p),B=p.over_cap?i`<span
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
    >`,se=i`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${Ws}
          step="1"
          .value=${String(p.slots)}
          title="동시에 실행할 세션 수 (최소 1 = 순차 실행)"
      /></label>
      <label
        class="worker-tgl worker-serial-lanes"
        title="고정 직렬 레인 수 (1~5). 축소 시 잘린 레인의 대기 항목은 병렬 대기로 돌아갑니다"
        >직렬 레인
        <select class="worker-serial-lane-count" aria-label="직렬 레인 수">
          ${Array.from({length:Xc},(Be,Ze)=>Ze+1).map(Be=>i`<option
                value=${String(Be)}
                ?selected=${p.serial_lane_count===Be}
              >
                ${Be}
              </option>`)}
        </select>
      </label>
      ${o?ht():""} `,Te=lc({failure:p.failure}),Je=Ql(p.repo_operations,p.cleanup_failures);return C?i`<div class="worker-ribbon">
          ${q} ${re}
          <div class="worker-kpi worker-kpi--ribbon">${B}${y}</div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${se}</div>
          <div class="worker-kpi">${I}</div>
        </div>
        ${Je}${ne.template()}${Te}`:i`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${q}${re}${se}</div>
        <div class="worker-kpi">
          ${B}${y}${I}
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
      ${Je}${ne.template()}${Te}`}function $t(p){if(p.running.length===0&&p.pr_wait.length===0)return"";let v=p.running.some(q=>!q.paused&&q.failed!==!0);return i`<section
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
      ${p.running.length>0?Jo(p.running,Date.now(),ge):""}
      ${p.pr_wait.map(q=>Vo(q))}
    </section>`}function lt(p){let v=p.candidate_hidden;return i`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${P.show_blocked}
        />
        🔒 blocked${v.blocked>0?` ${v.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${J_.map(q=>i`<button
              type="button"
              class="worker-filter__chip${P.spec===q.value?" is-active":""}"
              data-spec=${q.value}
              aria-pressed=${P.spec===q.value?"true":"false"}
            >
              ${q.label}
            </button>`)}
        ${v.spec>0?i`<span class="worker-filter__hidden">숨김 ${v.spec}</span>`:""}
      </div>
    </div>`}function st(){return i`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${S}
    >
      ${em.map(p=>i`<option value=${p.value} ?selected=${S===p.value}>
            ${p.label}
          </option>`)}
    </select>`}function ut(){return i`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${U}
      >
        ${rr.map(p=>i`<option value=${p.value} ?selected=${U===p.value}>
              ${p.label}
            </option>`)}
      </select>
    </div>`}function z(p){let v=i`<span
      class="worker-lane__badge${p.occupied?" worker-lane__badge--held":""}"
      >${p.badge}</span
    >`,q=p.cycle?i`<div class="worker-lane__cycle">
          ⚠ blocks 순환 감지 — 자동 정렬을 생략했습니다
        </div>`:"";return Zt({id:`worker-pane-lane-${p.id}`,lane:p.id,title:`\uC9C1\uB82C ${p.index}`,items:p.rows,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uD589\uC744 \uC5EC\uAE30\uB85C \uB4DC\uB798\uADF8",header_control:v,controls:q})}function X(p){let v=p.queue.auto_merge===!0;if(p.merge_queue_running)return i`<button
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
      </button>`;let q=new Set(p.auto_excluded),re=p.pr_wait.filter(B=>B.merge_action&&B.merge_enabled&&!q.has(B.id)).length;return i`<button
      type="button"
      class="worker-merge-all"
      title="켜 두면 자격이 생기는 PR을 계속 큐에 넣어 순서대로 충돌 해소·머지합니다"
    >
      ▶ 자동 머지${re>0?` ${re}`:""}
    </button>`}function ve(p){let v=Zt({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:p.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:st(),controls:lt(p)});return C?i`<div class="worker-lanes worker-lanes--mobile">
        ${$t(p)}
        ${Zt({id:"worker-pane-queue",lane:"queue",title:"\uBCD1\uB82C \uB300\uAE30",items:p.waiting,empty:"\uB4DC\uB798\uADF8 \uB610\uB294 [\uB300\uAE30\uB85C \u21B4]\uB85C \uBC30\uCE58",collapsible:!0,collapsed:w.queue,preview:Jc(p.waiting)})}
        ${p.serial_lanes.map(q=>z(q))}
        ${v}
        ${Zt({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:p.done,empty:`${x()} \uC644\uB8CC \uC5C6\uC74C`,controls:ut(),collapsible:!0,collapsed:w.done,preview:Array.isArray(p.token_total)?p.token_total.map(q=>q.label).join(" \xB7 "):p.token_total||Jc(p.done)})}
      </div>`:i`<div class="worker-lanes">
      ${v}
      <div class="worker-wait">
        ${Zt({id:"worker-pane-queue",lane:"queue",title:"\uBCD1\uB82C \uB300\uAE30",items:p.waiting,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58"})}
        ${p.serial_lanes.map(q=>z(q))}
      </div>
      ${Zt({id:"worker-pane-running",lane:"running",title:`\uC2E4\uD589 \uC911 \xB7 \uC2AC\uB86F ${p.slots}`,items:p.running,live:p.running.some(q=>!q.paused&&q.failed!==!0),body:Jo(p.running,Date.now(),ge)})}
      ${Zt({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:p.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C"})}
      ${Zt({id:"worker-pane-done",lane:"done",title:`\uC644\uB8CC \xB7 ${x()} ${p.done.length}`,items:p.done,empty:`${x()} \uC644\uB8CC \uC5C6\uC74C`,controls:ut()})}
    </div>`}function we(p){w={...w,[p]:!w[p]},im(w),oe()}function oe(){let p=bt();je(at(p),Fe),je(ve(p),Ge)}function De(){let p=document.querySelector(".app-header");if(!p)return;let v=()=>{let q=Math.round(p.getBoundingClientRect().height);le.style.setProperty("--worker-ribbon-top",`${q}px`)};if(v(),typeof ResizeObserver=="function"){let q=new ResizeObserver(v);q.observe(p),ie.push(()=>q.disconnect())}else window.addEventListener("resize",v),ie.push(()=>window.removeEventListener("resize",v))}function tt(){if(typeof window.matchMedia!="function")return;let p=window.matchMedia(om);C=!!p.matches;let v=q=>{let re=!!(q&&typeof q.matches=="boolean"?q.matches:p.matches);re!==C&&(C=re,oe())};typeof p.addEventListener=="function"?(p.addEventListener("change",v),ie.push(()=>p.removeEventListener("change",v))):typeof p.addListener=="function"&&(p.addListener(v),ie.push(()=>p.removeListener(v)))}let Ke=null;function Pe(p){Ke=p.target instanceof Element?p.target:null}function Xe(p){let q=p.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!q)return;if(Ke&&q.contains(Ke)&&Ke.closest("input, button, a")){p.preventDefault();return}let re=q.dataset.beadId||"",B=q.dataset.lane||"";k={bead_id:re,from_lane:B};try{p.dataTransfer?.setData("text/plain",re),p.dataTransfer&&(p.dataTransfer.effectAllowed="move")}catch{}}function Ee(p){let v=p.target?.closest?.(".worker-pane");if(!v)return;let q=v.dataset.lane||"";q!=="candidate"&&q!=="queue"&&!/^s[1-5]$/.test(q)||(p.preventDefault(),p.dataTransfer&&(p.dataTransfer.dropEffect="move"),v.classList.add("worker-pane--drag-over"))}function ft(p){p.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function Tt(p,v){let q=M.find(I=>I.id===p);if(!q)return;let re=M.filter(I=>I.id!==p),B=re.length;if(v){let I=v.dataset.beadId;if(I===p)return;let se=re.findIndex(Te=>Te.id===I);se>=0&&(B=se)}let y=re.slice();y.splice(B,0,q),A.applyReorder(p,y,B)}function Ot(p){let v=p.target?.closest?.(".worker-pane");if(!v)return;p.preventDefault(),v.classList.remove("worker-pane--drag-over");let q=v.dataset.lane||"",re=k?.bead_id||p.dataTransfer?.getData("text/plain")||"",B=k?.from_lane||"";if(k=null,!re)return;let y=p.target?.closest?.(".worker-mini, .worker-card"),I=Array.from(v.querySelectorAll(".worker-mini, .worker-card")),se=I.length;if(y){let Te=I.indexOf(y);Te>=0&&(se=Te)}if(se=Math.max(0,se-v.querySelectorAll(".worker-mini--ghost").length),v.classList.contains("worker-pane--collapsed")&&(se=W()),q==="candidate"){if(B==="candidate"){Tt(re,y);return}(B==="queue"||/^s[1-5]$/.test(B))&&H(re);return}if(q==="queue"||/^s[1-5]$/.test(q)){let Te=q==="queue"?"parallel":q;B===q?E(re,Te,se):j(re,Te,se)}}function Pt(p){P=p,X_(p),oe()}function Sr(p){S=p==="board"||p==="created"||p==="spec"?p:zs,rm(S),oe()}function yt(p){U=Mt(p)?p:It,sm(U),_?.(U),oe()}function wt(p){let v=p.target?.closest?.(".worker-serial-lane-count");if(v){let se=Number.parseInt(v.value,10);Number.isFinite(se)&&et(se).then(oe);return}let q=p.target?.closest?.(".worker-filter__blocked");if(q){Pt({...P,show_blocked:q.checked});return}let re=p.target?.closest?.(".worker-done-range");if(re){yt(re.value);return}let B=p.target?.closest?.(".worker-sort");if(B){Sr(B.value||zs);return}let y=p.target?.closest?.(".worker-slots__input");if(!y)return;let I=Number.parseInt(y.value,10);if(!Number.isFinite(I)){oe();return}Re(I).then(oe)}function Jt(p){return p?{runner:p.runner||void 0,model:p.model||void 0,effort:p.effort||void 0,worktree:p.worktree||void 0,status:p.status||void 0,session_id:p.session_id||void 0}:{}}function ar(){let p=bt();return{operations:p.repo_operations,cleanup_failures:p.cleanup_failures,repo:u&&u()||""}}function Bt(){ge&&xe.close(),He.hidden=!1,Ue.hidden=!1,ke.open(ar()),oe()}function jt(p){let v=$e(),q=v.attempts?v.attempts[p]:null;ge=p,ke.close(),He.hidden=!0,Ue.hidden=!1,xe.open({attempt_id:p,meta:Jt(q)}),oe()}function vt(){if(ke.isOpen()&&ke.refresh(ar()),!ge)return;let p=$e(),v=p.attempts?p.attempts[ge]:null;if(v){xe.updateMeta(Jt(v));return}xe.close()}function er(p){let v=p.target;if(v?.closest?.(".worker-mini__serial, .worker-mini__grip")||v?.closest?.("#worker-parallel-analysis-dialog"))return;if(v?.closest?.(".worker-analysis-btn")){G?.open();return}if(v?.closest?.(".worker-repo-strip")||v?.closest?.(".worker-mini__timeline")){Bt();return}let q=v?.closest?.(".worker-repo-op__session");if(q){let Oe=q.dataset.attemptId;Oe&&jt(Oe);return}let re=v?.closest?.(".worker-repo-op__resolve");if(re){Ie(re.dataset.operationId||"");return}let B=v?.closest?.(".worker-repo-op__dismiss");if(B){Ne(B.dataset.operationId||"");return}let y=v?.closest?.(".worker-cleanup__resume");if(y){let Oe=y.dataset.beadId;Oe&&ye(Oe);return}let I=v?.closest?.(".worker-banner__resume");if(I){let Oe=I.dataset.attemptId;Oe&&Y(Oe);return}let se=v?.closest?.(".worker-banner__discard");if(se){let Oe=se.dataset.confirmation==="merged"?"merged":"unmerged";$(se.dataset.beadId||"",se.dataset.attemptId||null,Oe,se.dataset.operationId||null);return}let Te=v?.closest?.(".worker-banner__dismiss");if(Te){let Oe=Te.dataset.attemptId;Oe&&K(Oe);return}if(v?.closest?.(".worker-play")){Le(!$e().auto_advance);return}let Je=v?.closest?.(".worker-merge-all");if(Je){Je.classList.contains("worker-merge-all--stop")?$e().auto_merge===!0?F(!1):Z():F(!0);return}let Be=v?.closest?.(".worker-pane__hd--toggle");if(Be){let Oe=Be.dataset.lane;(Oe==="queue"||Oe==="done")&&we(Oe);return}let Ze=v?.closest?.(".worker-card__place");if(Ze){let Oe=Ze.dataset.beadId;Oe&&!Ze.disabled&&j(Oe,"parallel",W());return}let Se=v?.closest?.(".worker-filter__chip");if(Se){let Oe=Se.dataset.spec;(Oe==="all"||Oe==="with"||Oe==="without")&&Pt({...P,spec:Oe});return}let d=v?.closest?.(".worker-mini__merge");if(d){let Oe=d.dataset.beadId||"";$e().cleanup_failed?.[Oe]?ye(Oe):pe(Oe);return}let m=v?.closest?.(".worker-mini__merge-cancel");if(m){te(m.dataset.beadId||"");return}let h=v?.closest?.(".worker-mini__discard");if(h){$(h.dataset.beadId||"",h.dataset.attemptId||null,h.dataset.discardMode==="merged"?"merged":"unmerged",h.dataset.operationId||null);return}let O=v?.closest?.(".worker-mini__stale-continue");if(O){D("worker-stale-work-continue",O.dataset.beadId||"",O.dataset.actionId||"");return}let me=v?.closest?.(".worker-mini__stale-backup");if(me){D("worker-stale-work-backup-fresh",me.dataset.beadId||"",me.dataset.actionId||"");return}let he=v?.closest?.(".worker-mini__stale-recheck");if(he){D("worker-stale-work-recheck",he.dataset.beadId||"",he.dataset.actionId||"");return}let Ce=v?.closest?.(".worker-mini__revise-fix");if(Ce){V("worker-revise-fix",Ce.dataset.beadId||"");return}let Me=v?.closest?.(".worker-mini__revise-approve");if(Me){V("worker-revise-approve",Me.dataset.beadId||"");return}if(v?.closest?.(".worker-mini__pr"))return;if(v?.closest?.(".rtile__discard")){let Oe=v?.closest?.(".rtile"),dt=Oe?.dataset?.beadId,tn=Oe?.dataset?.attemptId;dt&&$(dt,tn||null,"unmerged",v?.closest?.(".rtile__discard")?.dataset.operationId||null);return}if(v?.closest?.(".rtile__dismiss")){let dt=v?.closest?.(".rtile")?.dataset?.attemptId;dt&&K(dt);return}if(v?.closest?.(".rtile__pause")){let dt=v?.closest?.(".rtile")?.dataset?.attemptId;dt&&R(dt);return}if(v?.closest?.(".rtile__resume")){let dt=v?.closest?.(".rtile")?.dataset?.attemptId;dt&&Y(dt);return}if(v?.closest?.(".rtile__session")){let dt=v?.closest?.(".rtile")?.dataset?.attemptId;dt&&jt(dt);return}if(v?.closest?.(".worker-drawer-overlay__backdrop")){ke.close(),xe.close();return}if(v?.closest?.(".worker-drawer-host"))return;let pt=v?.closest?.(".rtile");if(pt){if(v?.closest?.(".rtile__id")){let dt=pt.dataset.beadId;dt&&lr(dt).then(tn=>{tn?de("\uBCF5\uC0AC\uB428","success",1200):de("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let Oe=pt.dataset.beadId;Oe&&c&&c(Oe);return}let tr=v?.closest?.(".worker-mini, .worker-card");if(tr){let Oe=tr.dataset.beadId;if(v?.closest?.(".worker-mini__id, .worker-card__id")){Oe&&lr(Oe).then(dt=>{dt?de("\uBCF5\uC0AC\uB428","success",1200):de("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}Oe&&c&&c(Oe)}}return e.addEventListener("pointerdown",Pe),e.addEventListener("dragstart",Xe),e.addEventListener("dragover",Ee),e.addEventListener("dragleave",ft),e.addEventListener("drop",Ot),e.addEventListener("click",er),e.addEventListener("change",wt),tt(),De(),b&&ie.push(b.subscribe(()=>{for(let[p,v]of Q)v==="failed"&&Q.delete(p);oe()})),s&&ie.push(s.subscribe(()=>{let p=u&&u()||"";p!==_e&&(_e=p,Ae.close()),oe(),vt()})),o&&typeof o.subscribe=="function"&&ie.push(o.subscribe(()=>oe())),oe(),{load(){oe()},destroy(){for(let p of ie.splice(0))try{p()}catch{}e.removeEventListener("pointerdown",Pe),e.removeEventListener("dragstart",Xe),e.removeEventListener("dragover",Ee),e.removeEventListener("dragleave",ft),e.removeEventListener("drop",Ot),e.removeEventListener("click",er),e.removeEventListener("change",wt);try{xe.destroy()}catch{}Ue.hidden=!0;try{G?.destroy()}catch{}try{Ae.destroy()}catch{}je(i``,e)}}}function pa(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function od(e,t,r,n=async()=>{},s=async()=>{}){let o=it("views:workspace-picker"),a=null,l=!1,c=!1,u=!1;async function f(C){let J=C.target.value,ce=t.getState().workspace?.current?.path||"";if(J&&J!==ce){o("switching workspace to %s",J),l=!0,w();try{await r(J)}catch(ie){o("workspace switch failed: %o",ie)}finally{l=!1,w()}}}async function _(){let C=t.getState(),N=C.workspace?.current?.path||C.workspace?.available?.[0]?.path||"";if(!(!N||c)){o("git-pulling workspace %s",N),c=!0,w();try{await n(N)}catch(J){o("workspace git pull failed: %o",J)}finally{c=!1,w()}}}function b(C){let N=C.target;N&&e.contains(N)||M()}function A(C){C.key==="Escape"&&M()}function k(){u||(u=!0,document.addEventListener("mousedown",b),document.addEventListener("keydown",A),w())}function M(){u&&(u=!1,document.removeEventListener("mousedown",b),document.removeEventListener("keydown",A),w())}function P(){u?M():k()}async function S(C){let N=C.target,J=N.value,fe=N.checked;o("toggling visibility %s \u2192 %s",J,String(fe));try{await s(J,fe)}catch(ce){o("workspace visibility toggle failed: %o",ce)}}function U(C){return C?i`
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
    `:i``}function Q(C,N){return i`
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
                ${C.map(J=>i`
                    <label
                      class="workspace-picker__manage-row"
                      title="${J.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${J.path}"
                        .checked=${!N.has(J.path)}
                        @change=${S}
                      />
                      <span class="workspace-picker__manage-name"
                        >${pa(J.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function x(){let C=t.getState(),N=C.workspace?.current,J=C.workspace?.available||[],fe=new Set(C.workspace?.hidden||[]),ce=N?.path||J[0]?.path||"";if(J.length===0)return i``;let ie=J.filter(le=>!fe.has(le.path)||le.path===ce);if(ie.length<=1){let le=ie[0]||J[0],Fe=pa(le.path);return i`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${le.path}"
            >${Fe}</span
          >
          ${Q(J,fe)}
          ${U(ce)}
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
          ${ie.map(le=>i`
              <option
                value="${le.path}"
                ?selected=${le.path===ce}
                title="${le.path}"
              >
                ${pa(le.path)}
              </option>
            `)}
        </select>
        ${Q(J,fe)}
        ${U(ce)}
        ${l||c?i`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function w(){je(x(),e)}return w(),a=t.subscribe(()=>w()),{destroy(){a&&(a(),a=null),document.removeEventListener("mousedown",b),document.removeEventListener("keydown",A),je(i``,e)}}}var ad=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","get-session-defaults","set-session-defaults","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-automation-toggle","worker-auto-repair-toggle","worker-repo-operation-repair","worker-repo-operation-dismiss","worker-queue-set-slots","worker-queue-set-serial-lane-count","subscribe-worker-parallel-analysis","unsubscribe-worker-parallel-analysis","worker-parallel-analysis-snapshot","worker-parallel-analysis-start","worker-parallel-analysis-cancel","worker-parallel-analysis-settings-update","worker-parallel-analysis-submit","worker-queue-set-orchestration-defaults","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-cleanup-retry","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-stale-work-continue","worker-stale-work-backup-fresh","worker-stale-work-recheck","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-worker-system-prompt","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-impl-presets","unsubscribe-impl-presets","impl-presets-snapshot","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","monitor-auto-toggle"];function fa(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function id(e,t,r=fa()){return{id:r,type:e,payload:t}}function ld(e={}){let t=it("ws"),r={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},n=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",a=0,l=null,c=!0,u=new Map,f=[],_=new Map,b=new Set;function A(x){for(let w of Array.from(b))try{w(x)}catch{}}function k(){if(!c||l)return;o="reconnecting",t("ws reconnecting\u2026"),A(o);let x=Math.min(r.maxMs||0,(r.initialMs||0)*Math.pow(r.factor||1,a)),w=(r.jitterRatio||0)*x,C=Math.max(0,Math.round(x+(Math.random()*2-1)*w));t("ws retry in %d ms (attempt %d)",C,a+1),l=setTimeout(()=>{l=null,Q()},C)}function M(x){try{s?.send(JSON.stringify(x))}catch(w){t("ws send failed",w)}}function P(){for(o="open",t("ws open"),A(o),a=0;f.length;){let x=f.shift();x&&M(x)}}function S(x){let w;try{w=JSON.parse(String(x.data))}catch{t("ws received non-JSON message");return}if(!w||typeof w.id!="string"||typeof w.type!="string"){t("ws received invalid envelope");return}if(u.has(w.id)){let N=u.get(w.id);u.delete(w.id),w.ok?N?.resolve(w.payload):N?.reject(w.error||new Error("ws error"));return}let C=_.get(w.type);if(C&&C.size>0)for(let N of Array.from(C))try{N(w.payload)}catch(J){t("ws event handler error",J)}else t("ws received unhandled message type: %s",w.type)}function U(){o="closed",t("ws closed"),A(o);for(let[x,w]of u.entries())w.reject(new Error("ws disconnected")),u.delete(x);a+=1,k()}function Q(){if(!c)return;let x=n();try{s=new WebSocket(x),t("ws connecting %s",x),o="connecting",A(o),s.addEventListener("open",P),s.addEventListener("message",S),s.addEventListener("error",()=>{}),s.addEventListener("close",U)}catch(w){t("ws connect failed %o",w),k()}}return Q(),{send(x,w){if(!ad.includes(x))return Promise.reject(new Error(`unknown message type: ${x}`));let C=fa(),N=id(x,w,C);return t("send %s id=%s",x,C),new Promise((J,fe)=>{u.set(C,{resolve:J,reject:fe,type:x}),s&&s.readyState===s.OPEN?M(N):(t("queue %s id=%s (state=%s)",x,C,o),f.push(N))})},on(x,w){_.has(x)||_.set(x,new Set);let C=_.get(x);return C?.add(w),()=>{C?.delete(w)}},onConnection(x){return b.add(x),()=>{b.delete(x)}},reconnect(){c=!0,l&&(clearTimeout(l),l=null),a=0,Q()},close(){c=!1,l&&(clearTimeout(l),l=null);try{s?.close()}catch{}},getState(){return o}}}function ym(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function vm(e,t){try{let n=await(await fetch("/api/config")).json();e.setState({config:n})}catch(r){t("config refresh failed",r)}}var _a=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],cd=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"],["tab:worker:closed","closed-issues"]],$r="tab:worker:closed",wm="bdui.worker.done-range",dd=xc,ud="worker:queue",pd="worker:parallel-analysis",fd="ui:order",_d="ui:display-policy",md="exec:presets",xr="tab:board:closed",gd="beads-ui.board.closed-range";function km(e){let t=it("main");t("bootstrap start");let r=i`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;je(r,e);let n=document.getElementById("top-nav"),s=document.getElementById("usage-meter"),o=document.getElementById("board-root"),a=document.getElementById("worker-root"),l=document.getElementById("monitor-root"),c=document.getElementById("detail-panel");if(s&&Nc(s),o&&a&&l&&c){let Ge=function(d,m){let h="Request failed",O="";if(d&&typeof d=="object"){let he=d;if(typeof he.message=="string"&&he.message.length>0&&(h=he.message),typeof he.details=="string")O=he.details;else if(he.details&&typeof he.details=="object")try{O=JSON.stringify(he.details,null,2)}catch{O=""}}else typeof d=="string"&&d.length>0&&(h=d);let me=m&&m.length>0?`Failed to load ${m}`:"Request failed";He.open(me,h,O)},ye=function(d){return`${p.getState().workspace.current?.path||""}\0${d}`},T=function(){j&&(j().catch(()=>{}),j=null),E=null,H=null},te=function(d){R=d;let m=()=>{R!==d||p.getState().selected_id!==d||(R=null,F(d))};if(!ue){K.then(m);return}m()},V=function(d,m,h,O,me){return h!==D[m]?(me().catch(()=>{}),!1):(d.set(O,me),!0)},Ie=function(){let d=p.getState();ht(d.view==="board"),z(d.view==="worker"),De(d.view==="monitor"),ve(d.view==="board"||d.view==="worker"||Le||!!d.selected_id)},et=function(){let d=Ir(Ne);return d===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:d}}},bt=function(){let d=Ir(Re);return d===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:d}}},ht=function(d){if(d)for(let[m,h]of _a){if(Z.has(m)||$.has(m))continue;let O=m===xr?et():{type:h};try{Ae.register(m,O)}catch(Ce){t("register %s store failed: %o",m,Ce)}$.add(m);let me=D.board,he=!1;ke.subscribeList(m,O).then(Ce=>{he=!V(Z,"board",me,m,Ce)}).catch(Ce=>{t("subscribe %s failed: %o",m,Ce),Ge(Ce,"board")}).finally(()=>{$.delete(m),he&&Ie()})}else lt()},lt=function(){D.board+=1;for(let[d]of _a){let m=Z.get(d);m&&(m().catch(()=>{}),Z.delete(d));try{Ae.unregister(d)}catch(h){t("unregister %s failed: %o",d,h)}}},z=function(d){if(!d){X();return}for(let[m,h]of cd){if(st.has(m)||$.has(m))continue;let O=m===$r?bt():{type:h};try{Ae.register(m,O)}catch(Ce){t("register %s store failed: %o",m,Ce)}$.add(m);let me=D.worker,he=!1;ke.subscribeList(m,O).then(Ce=>{he=!V(st,"worker",me,m,Ce)}).catch(Ce=>{t("subscribe %s failed: %o",m,Ce),Ge(Ce,"worker")}).finally(()=>{$.delete(m),he&&Ie()})}},X=function(){D.worker+=1;for(let[d]of cd){let m=st.get(d);m&&(m().catch(()=>{}),st.delete(d));try{Ae.unregister(d)}catch(h){t("unregister %s failed: %o",d,h)}}},ve=function(d){if(!d){we();return}ut||(xe("subscribe-worker-queue",{id:ud}).catch(m=>{t("subscribe-worker-queue failed: %o",m)}),xe("subscribe-worker-parallel-analysis",{id:pd}).catch(m=>{t("subscribe-worker-parallel-analysis failed: %o",m)}),ut=()=>(xe("unsubscribe-worker-parallel-analysis",{id:pd}),xe("unsubscribe-worker-queue",{id:ud})))},we=function(){ut&&(ut().catch(()=>{}),ut=null),ne.clear()},De=function(d){if(!d){tt();return}oe||(xe("subscribe-monitor-pipeline",{id:dd}).catch(m=>{t("subscribe-monitor-pipeline failed: %o",m)}),oe=()=>xe("unsubscribe-monitor-pipeline",{id:dd}))},tt=function(){oe&&(oe().catch(()=>{}),oe=null)},Pe=function(){Ke||(xe("subscribe-ui-order",{id:fd}).catch(d=>{t("subscribe-ui-order failed: %o",d)}),Ke=()=>xe("unsubscribe-ui-order",{id:fd}))},Xe=function(){Ke&&(Ke().catch(()=>{}),Ke=null),$e.clear()},ft=function(){Ee||(xe("subscribe-display-policy",{id:_d}).catch(d=>{t("subscribe-display-policy failed: %o",d)}),Ee=()=>xe("unsubscribe-display-policy",{id:_d}))},Tt=function(){Ee&&(Ee().catch(()=>{}),Ee=null),be.clear()},Pt=function(){Ot||(xe("subscribe-impl-presets",{id:md}).catch(d=>{t("subscribe-impl-presets failed: %o",d)}),Ot=()=>xe("unsubscribe-impl-presets",{id:md}))},Bt=function(d){if(!d)return"Unknown";let m=d.split("/").filter(Boolean);return m.length>0?m[m.length-1]:"Unknown"};var u=Ge,f=ye,_=T,b=te,A=V,k=Ie,M=et,P=bt,S=ht,U=lt,Q=z,x=X,w=ve,C=we,N=De,J=tt,fe=Pe,ce=Xe,ie=ft,le=Tt,Fe=Pt,Ue=Bt;let ze=document.getElementById("header-loading"),Ye=Si(ze),He=Zl(e),ge=ld(),xe=Ye.wrapSend((d,m)=>ge.send(d,m)),ke=bi(xe),Ae=hi(),_e=wi(),ne=vi(),G=ri(),$e=yi(),be=ei(),ee=ti(),W=ni();ge.on("impl-presets-snapshot",d=>{let m=d;m&&typeof m.revision=="number"&&Array.isArray(m.presets)&&ee.set({revision:m.revision,presets:m.presets})}),ge.on("monitor-pipeline-snapshot",d=>{let m=d;if(!(!m||!Array.isArray(m.workspaces)))try{G.set(m.workspaces,m.workspaces_state)}catch{}}),ge.on("ui-order-snapshot",d=>{let m=d;if(m&&typeof m.revision=="number")try{$e.set({revision:m.revision,order:m.order&&typeof m.order=="object"?m.order:{}})}catch{}}),ge.on("display-policy-snapshot",d=>{let m=d;if(m&&m.policy&&typeof m.policy=="object")try{be.set(m.policy)}catch{}}),ge.on("session-log-snapshot",d=>{let m=d;if(m&&typeof m.id=="string")try{W.set(m.id,Array.isArray(m.lines)?m.lines:[],typeof m.last_event_at=="number"?m.last_event_at:null)}catch{}}),ge.on("session-log-append",d=>{let m=d;if(m&&typeof m.id=="string")try{W.append(m.id,m.event)}catch{}}),ge.on("snapshot",d=>{let m=d,h=m&&typeof m.id=="string"?m.id:"",O=h?Ae.getStore(h):null;if(O&&m&&m.type==="snapshot")try{O.applyPush(m)}catch{}}),ge.on("upsert",d=>{let m=d,h=m&&typeof m.id=="string"?m.id:"",O=h?Ae.getStore(h):null;if(O&&m&&m.type==="upsert")try{O.applyPush(m)}catch{}}),ge.on("delete",d=>{let m=d,h=m&&typeof m.id=="string"?m.id:"",O=h?Ae.getStore(h):null;if(O&&m&&m.type==="delete")try{O.applyPush(m)}catch{}});let j=null,E=null,H=null,R=null,Y=()=>{},K=new Promise(d=>{Y=()=>d(void 0)}),ue=!1,pe=!1;async function F(d){let m=ye(d);if(m===E||m===H)return;H=m;let h=`detail:${d}`,O={type:"issue-detail",params:{id:d}};try{Ae.register(h,O)}catch(me){t("register detail store failed: %o",me)}try{let me=await ke.subscribeList(h,O);if(p.getState().selected_id!==d||ye(d)!==m){await me().catch(()=>{});return}j&&await j().catch(()=>{}),j=me,E=m}catch(me){t("detail subscribe failed: %o",me),Ge(me,"issue details")}finally{H===m&&(H=null)}}let Z=new Map,$=new Set,D={board:0,worker:0},Le=!1,Ne=It;try{let d=window.localStorage.getItem(gd);Mt(d)&&(Ne=d)}catch{}let Re=It;try{let d=window.localStorage.getItem(wm);Mt(d)&&(Re=d)}catch{}async function at(d){if(!Mt(d)||d===Ne)return;Ne=d;try{window.localStorage.setItem(gd,d)}catch{}let m=Z.get(xr);if(!m)return;Z.delete(xr),await m().catch(()=>{});let h=et();try{Ae.register(xr,h)}catch(O){t("register %s store failed: %o",xr,O)}try{let O=await ke.subscribeList(xr,h);Z.set(xr,O)}catch(O){t("re-subscribe %s failed: %o",xr,O),Ge(O,"board")}}async function $t(d){if(!Mt(d)||d===Re)return;Re=d;let m=st.get($r);if(!m)return;st.delete($r),await m().catch(()=>{});let h=bt();try{Ae.register($r,h)}catch(O){t("register %s store failed: %o",$r,O)}try{let O=await ke.subscribeList($r,h);st.set($r,O)}catch(O){t("re-subscribe %s failed: %o",$r,O),Ge(O,"worker")}}let st=new Map,ut=null,oe=null,Ke=null,Ee=null,Ot=null;async function Sr(){Ee=null,be.clear(),Ot=null,ee.clear(),ut=null,oe=null,Z.clear(),st.clear(),D.board+=1,D.worker+=1,Pt();let d=p.getState().workspace.current?.path;if(d)try{await ge.send("set-workspace",{path:d})}catch(h){t("workspace restore after reconnect failed: %o",h);return}ft();let m=p.getState();ht(m.view==="board"),z(m.view==="worker"),De(m.view==="monitor"),ve(m.view==="board"||m.view==="worker"||!!m.selected_id)}async function yt(){t("clearing all subscriptions for workspace switch"),lt(),X(),we(),_e.clear(),Xe(),Pe(),Tt(),ft(),T();let d=p.getState();if(d.selected_id)try{Ae.unregister(`detail:${d.selected_id}`)}catch{}let m=p.getState();ht(m.view==="board"),z(m.view==="worker"),De(m.view==="monitor"),ve(m.view==="board"||m.view==="worker"||!!m.selected_id),m.selected_id&&te(m.selected_id)}async function wt(d){t("requesting workspace switch to %s",d),pe=!0;try{let m=await ge.send("set-workspace",{path:d});t("workspace switch result: %o",m),m&&m.workspace&&(p.setState({workspace:{current:{path:m.workspace.root_dir,database:m.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",d),m.changed&&(await yt(),de("Switched to "+Bt(d),"success",2e3)))}catch(m){throw t("workspace switch failed: %o",m),de("Failed to switch workspace","error",3e3),m}finally{pe=!1}}async function Jt(d){t("requesting workspace git pull for %s",d);try{let m=await ge.send("git-pull-workspace",{});t("workspace git pull result: %o",m);let h=m?.status;if(h==="up_to_date"){de("Already up to date","success",2e3);return}if(h==="stash_pop_conflict"){de("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}de("Git pulled "+Bt(d),"success",2e3)}catch(m){t("workspace git pull failed: %o",m);let h=m?.code,O=m?.message;if(h==="rebase_conflict"){de("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(h==="rebase_conflict_abort_failed"){de("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(h==="busy"){de("Git pull skipped: another operation is running","warning",3e3);return}let me=O?`: ${O}`:"";throw de(`Git pull failed${me}`,"error",3e3),m}}async function ar(d,m){t("setting workspace visibility %s \u2192 %s",d,String(m));try{await ge.send("set-workspace-visibility",{path:d,visible:m}),await jt()}catch(h){t("workspace visibility update failed: %o",h),de("Failed to update project visibility","error",3e3)}}async function jt(){try{let d=await ge.send("list-workspaces",{});if(t("workspaces loaded: %o",d),d&&Array.isArray(d.workspaces)){let m=d.workspaces.map(he=>({path:he.path,database:he.database,pid:he.pid,version:he.version})),h=d.current?{path:d.current.root_dir,database:d.current.db_path}:null,O=Array.isArray(d.hidden)?d.hidden.filter(he=>typeof he=="string"):[];p.setState({workspace:{current:h,available:m,hidden:O}});let me=window.localStorage.getItem("beads-ui.workspace");me&&(!m.some(Ce=>Ce.path===me)||O.includes(me)?window.localStorage.removeItem("beads-ui.workspace"):h&&me!==h.path&&(t("restoring saved workspace preference: %s",me),await wt(me)))}}catch(d){t("failed to load workspaces: %o",d)}}ge.on("workspace-changed",d=>{t("workspace-changed event: %o",d),d&&d.root_dir&&(p.setState({workspace:{current:{path:d.root_dir,database:d.db_path}}}),jt(),yt())});let vt=!1;if(typeof ge.onConnection=="function"){let d=m=>{t("ws state %s",m),m==="reconnecting"||m==="closed"?(vt=!0,de("Connection lost. Reconnecting\u2026","error",4e3)):m==="open"&&vt&&(vt=!1,de("Reconnected","success",2200),vm(p,(h,O)=>{t(`${h}: %o`,O)}),Sr())};ge.onConnection(d)}let er="board";try{let d=window.localStorage.getItem("beads-ui.view");(d==="board"||d==="worker"||d==="monitor")&&(er=d)}catch(d){t("view parse error: %o",d)}let p=xi({config:ym(),view:er});ge.on("worker-queue-snapshot",d=>{let m=d;if(!m||!m.queue)return;let h=p.getState().workspace.current?.path;if(typeof h=="string"&&h.length>0&&m.root_dir!==h){t("dropping worker-queue snapshot for %s",String(m.root_dir));return}try{_e.set(m.queue)}catch{}}),ge.on("worker-parallel-analysis-snapshot",d=>{let m=d;if(!m)return;let h=p.getState().workspace.current?.path;if(!(typeof h=="string"&&h.length>0&&typeof m.root_dir=="string"&&m.root_dir!==h))try{ne.set({settings:m.settings,job:m.job??null,last_good:m.last_good??null})}catch{}});let v=ki(p);v.start();let q=new Set(["get-comments","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","get-session-defaults","set-session-defaults"]),re=async(d,m)=>{try{return await xe(d,m)}catch(h){if(q.has(d))throw h;return[]}};n&&Ac(n,p,v);let B=document.getElementById("workspace-picker");B&&od(B,p,wt,Jt,ar);let y=Rc(e,(d,m)=>xe(d,m));try{let d=document.getElementById("new-issue-btn");d&&d.addEventListener("click",()=>y.open())}catch{}let I=Pc(e,{policyStore:be,queueStore:_e,implPresetStore:ee,transport:(d,m)=>xe(d,m),onOpenChange:d=>{Le=d,Ie()},labelOptions:()=>{let d=new Set;for(let[m]of _a)for(let h of Ae.snapshotFor(m)||[]){let O=h.labels;if(Array.isArray(O))for(let me of O)typeof me=="string"&&me.length>0&&d.add(me)}return Array.from(d).sort()}});try{let d=document.getElementById("display-settings-btn");d&&(d.setAttribute("aria-label","\uC124\uC815"),d.setAttribute("title","\uC124\uC815"),d.addEventListener("click",()=>I.open()))}catch{}let se=Di(o,{gotoIssue:d=>v.gotoIssue(d),issueStores:Ae,transport:re,workerQueueStore:_e,uiOrderStore:$e,displayPolicyStore:be,closedRange:Ne,onClosedRangeChange:d=>{at(d)},onNewIssue:()=>y.open()}),Te=ua(a,{transport:re,issueStores:Ae,queueStore:_e,analysisStore:ne,sessionLogStore:W,uiOrderStore:$e,gotoIssue:d=>p.setState({selected_id:d}),getWorkspacePath:()=>p.getState().workspace.current?.path,doneRange:Re,onDoneRangeChange:d=>{$t(d)}}),Je=Sc(l,{transport:re,pipelineStore:G,execPresetStore:ee,gotoIssue:d=>v.gotoIssue(d),getWorkspacePath:()=>p.getState().workspace.current?.path,switchWorkspace:d=>wt(d)}),Be=Kl(c,{issueStores:Ae,transport:re,queueStore:_e,execPresetStore:ee,sessionLogStore:W,getWorkspacePath:()=>p.getState().workspace.current?.path,onNavigate:d=>{p.getState().view==="worker"?p.setState({selected_id:d}):v.gotoIssue(d)},onClose:()=>{let d=p.getState();p.setState({selected_id:null});try{v.gotoView(d.view==="worker"||d.view==="monitor"?d.view:"board")}catch{}},onOpenExecPresets:()=>{I.open("session")}}),Ze=p.getState().selected_id;Ze&&(c.hidden=!1,Be.load(Ze),te(Ze)),p.subscribe(d=>{let m=d.selected_id;m?(c.hidden=!1,Be.load(m),pe||te(m)):(Be.clear(),c.hidden=!0,T())});let Se=d=>{o.hidden=d.view!=="board",a.hidden=d.view!=="worker",l.hidden=d.view!=="monitor",ht(d.view==="board"),z(d.view==="worker"),De(d.view==="monitor"),ve(d.view==="board"||d.view==="worker"||Le||!!d.selected_id),!d.selected_id&&d.view==="board"&&se.load(),d.view==="worker"&&Te.load(),d.view==="monitor"?Je.load():Je.pause(),window.localStorage.setItem("beads-ui.view",d.view)};p.subscribe(Se),Se(p.getState()),Pe(),ft(),Pt(),jt().finally(()=>{ue=!0,Y()}),window.addEventListener("keydown",d=>{let m=d.ctrlKey||d.metaKey,h=String(d.key||"").toLowerCase(),O=d.target,me=O&&O.tagName?String(O.tagName).toLowerCase():"",he=me==="input"||me==="textarea"||me==="select"||O&&typeof O.isContentEditable=="boolean"&&O.isContentEditable;m&&h==="n"&&(he||(d.preventDefault(),y.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let r=window.localStorage.getItem("beads-ui.theme"),n=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=r==="dark"||r==="light"?r:n?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let r=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",r),window.localStorage.setItem("beads-ui.theme",r)});let t=document.getElementById("app");t&&km(t)});export{km as bootstrap,ym as readBootstrapConfig,vm as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
