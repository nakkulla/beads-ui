var Rc=Object.create;var xs=Object.defineProperty;var Ic=Object.getOwnPropertyDescriptor;var Lc=Object.getOwnPropertyNames;var Oc=Object.getPrototypeOf,Dc=Object.prototype.hasOwnProperty;var Mc=(e,t,r)=>t in e?xs(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var Ss=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var Nc=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of Lc(t))!Dc.call(e,s)&&s!==r&&xs(e,s,{get:()=>t[s],enumerable:!(n=Ic(t,s))||n.enumerable});return e};var Pc=(e,t,r)=>(r=e!=null?Rc(Oc(e)):{},Nc(t||!e||!e.__esModule?xs(r,"default",{value:e,enumerable:!0}):r,e));var tt=(e,t,r)=>Mc(e,typeof t!="symbol"?t+"":t,r);var ka=Ss((c_,wa)=>{var Nr=1e3,Pr=Nr*60,Fr=Pr*60,Sr=Fr*24,jc=Sr*7,zc=Sr*365.25;wa.exports=function(e,t){t=t||{};var r=typeof e;if(r==="string"&&e.length>0)return Hc(e);if(r==="number"&&isFinite(e))return t.long?Gc(e):Wc(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function Hc(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var r=parseFloat(t[1]),n=(t[2]||"ms").toLowerCase();switch(n){case"years":case"year":case"yrs":case"yr":case"y":return r*zc;case"weeks":case"week":case"w":return r*jc;case"days":case"day":case"d":return r*Sr;case"hours":case"hour":case"hrs":case"hr":case"h":return r*Fr;case"minutes":case"minute":case"mins":case"min":case"m":return r*Pr;case"seconds":case"second":case"secs":case"sec":case"s":return r*Nr;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r;default:return}}}}function Wc(e){var t=Math.abs(e);return t>=Sr?Math.round(e/Sr)+"d":t>=Fr?Math.round(e/Fr)+"h":t>=Pr?Math.round(e/Pr)+"m":t>=Nr?Math.round(e/Nr)+"s":e+"ms"}function Gc(e){var t=Math.abs(e);return t>=Sr?On(e,t,Sr,"day"):t>=Fr?On(e,t,Fr,"hour"):t>=Pr?On(e,t,Pr,"minute"):t>=Nr?On(e,t,Nr,"second"):e+" ms"}function On(e,t,r,n){var s=t>=r*1.5;return Math.round(e/r)+" "+n+(s?"s":"")}});var xa=Ss((d_,$a)=>{function Yc(e){r.debug=r,r.default=r,r.coerce=c,r.disable=a,r.enable=s,r.enabled=i,r.humanize=ka(),r.destroy=u,Object.keys(e).forEach(f=>{r[f]=e[f]}),r.names=[],r.skips=[],r.formatters={};function t(f){let _=0;for(let b=0;b<f.length;b++)_=(_<<5)-_+f.charCodeAt(b),_|=0;return r.colors[Math.abs(_)%r.colors.length]}r.selectColor=t;function r(f){let _,b=null,T,$;function E(...U){if(!E.enabled)return;let x=E,V=Number(new Date),ee=V-(_||V);x.diff=ee,x.prev=_,x.curr=V,_=V,U[0]=r.coerce(U[0]),typeof U[0]!="string"&&U.unshift("%O");let O=0;U[0]=U[0].replace(/%([a-zA-Z%])/g,(S,z)=>{if(S==="%%")return"%";O++;let L=r.formatters[z];if(typeof L=="function"){let pe=U[O];S=L.call(x,pe),U.splice(O,1),O--}return S}),r.formatArgs.call(x,U),(x.log||r.log).apply(x,U)}return E.namespace=f,E.useColors=r.useColors(),E.color=r.selectColor(f),E.extend=n,E.destroy=r.destroy,Object.defineProperty(E,"enabled",{enumerable:!0,configurable:!1,get:()=>b!==null?b:(T!==r.namespaces&&(T=r.namespaces,$=r.enabled(f)),$),set:U=>{b=U}}),typeof r.init=="function"&&r.init(E),E}function n(f,_){let b=r(this.namespace+(typeof _>"u"?":":_)+f);return b.log=this.log,b}function s(f){r.save(f),r.namespaces=f,r.names=[],r.skips=[];let _=(typeof f=="string"?f:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let b of _)b[0]==="-"?r.skips.push(b.slice(1)):r.names.push(b)}function o(f,_){let b=0,T=0,$=-1,E=0;for(;b<f.length;)if(T<_.length&&(_[T]===f[b]||_[T]==="*"))_[T]==="*"?($=T,E=b,T++):(b++,T++);else if($!==-1)T=$+1,E++,b=E;else return!1;for(;T<_.length&&_[T]==="*";)T++;return T===_.length}function a(){let f=[...r.names,...r.skips.map(_=>"-"+_)].join(",");return r.enable(""),f}function i(f){for(let _ of r.skips)if(o(f,_))return!1;for(let _ of r.names)if(o(f,_))return!0;return!1}function c(f){return f instanceof Error?f.stack||f.message:f}function u(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return r.enable(r.load()),r}$a.exports=Yc});var Sa=Ss((St,Dn)=>{St.formatArgs=Kc;St.save=Zc;St.load=Xc;St.useColors=Vc;St.storage=Qc();St.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();St.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function Vc(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function Kc(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+Dn.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let r=0,n=0;e[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(r++,s==="%c"&&(n=r))}),e.splice(n,0,t)}St.log=console.debug||console.log||(()=>{});function Zc(e){try{e?St.storage.setItem("debug",e):St.storage.removeItem("debug")}catch{}}function Xc(){let e;try{e=St.storage.getItem("debug")||St.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function Qc(){try{return localStorage}catch{}}Dn.exports=xa()(St);var{formatters:Jc}=Dn.exports;Jc.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var Xr=globalThis,Ln=Xr.trustedTypes,ia=Ln?Ln.createPolicy("lit-html",{createHTML:e=>e}):void 0,fa="$lit$",cr=`lit$${Math.random().toFixed(9).slice(2)}$`,_a="?"+cr,Fc=`<${_a}>`,kr=document,Qr=()=>kr.createComment(""),Jr=e=>e===null||typeof e!="object"&&typeof e!="function",Ls=Array.isArray,qc=e=>Ls(e)||typeof e?.[Symbol.iterator]=="function",As=`[ 	
\f\r]`,Zr=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,la=/-->/g,ca=/>/g,yr=RegExp(`>|${As}(?:([^\\s"'>=/]+)(${As}*=${As}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),da=/'/g,ua=/"/g,ma=/^(?:script|style|textarea|title)$/i,Os=e=>(t,...r)=>({_$litType$:e,strings:t,values:r}),l=Os(1),Jt=Os(2),r_=Os(3),$r=Symbol.for("lit-noChange"),ct=Symbol.for("lit-nothing"),pa=new WeakMap,wr=kr.createTreeWalker(kr,129);function ga(e,t){if(!Ls(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return ia!==void 0?ia.createHTML(t):t}var Bc=(e,t)=>{let r=e.length-1,n=[],s,o=t===2?"<svg>":t===3?"<math>":"",a=Zr;for(let i=0;i<r;i++){let c=e[i],u,f,_=-1,b=0;for(;b<c.length&&(a.lastIndex=b,f=a.exec(c),f!==null);)b=a.lastIndex,a===Zr?f[1]==="!--"?a=la:f[1]!==void 0?a=ca:f[2]!==void 0?(ma.test(f[2])&&(s=RegExp("</"+f[2],"g")),a=yr):f[3]!==void 0&&(a=yr):a===yr?f[0]===">"?(a=s??Zr,_=-1):f[1]===void 0?_=-2:(_=a.lastIndex-f[2].length,u=f[1],a=f[3]===void 0?yr:f[3]==='"'?ua:da):a===ua||a===da?a=yr:a===la||a===ca?a=Zr:(a=yr,s=void 0);let T=a===yr&&e[i+1].startsWith("/>")?" ":"";o+=a===Zr?c+Fc:_>=0?(n.push(u),c.slice(0,_)+fa+c.slice(_)+cr+T):c+cr+(_===-2?i:T)}return[ga(e,o+(e[r]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),n]},en=class e{constructor({strings:t,_$litType$:r},n){let s;this.parts=[];let o=0,a=0,i=t.length-1,c=this.parts,[u,f]=Bc(t,r);if(this.el=e.createElement(u,n),wr.currentNode=this.el.content,r===2||r===3){let _=this.el.content.firstChild;_.replaceWith(..._.childNodes)}for(;(s=wr.nextNode())!==null&&c.length<i;){if(s.nodeType===1){if(s.hasAttributes())for(let _ of s.getAttributeNames())if(_.endsWith(fa)){let b=f[a++],T=s.getAttribute(_).split(cr),$=/([.?@])?(.*)/.exec(b);c.push({type:1,index:o,name:$[2],strings:T,ctor:$[1]==="."?Es:$[1]==="?"?Cs:$[1]==="@"?Rs:Mr}),s.removeAttribute(_)}else _.startsWith(cr)&&(c.push({type:6,index:o}),s.removeAttribute(_));if(ma.test(s.tagName)){let _=s.textContent.split(cr),b=_.length-1;if(b>0){s.textContent=Ln?Ln.emptyScript:"";for(let T=0;T<b;T++)s.append(_[T],Qr()),wr.nextNode(),c.push({type:2,index:++o});s.append(_[b],Qr())}}}else if(s.nodeType===8)if(s.data===_a)c.push({type:2,index:o});else{let _=-1;for(;(_=s.data.indexOf(cr,_+1))!==-1;)c.push({type:7,index:o}),_+=cr.length-1}o++}}static createElement(t,r){let n=kr.createElement("template");return n.innerHTML=t,n}};function Dr(e,t,r=e,n){if(t===$r)return t;let s=n!==void 0?r._$Co?.[n]:r._$Cl,o=Jr(t)?void 0:t._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(e),s._$AT(e,r,n)),n!==void 0?(r._$Co??(r._$Co=[]))[n]=s:r._$Cl=s),s!==void 0&&(t=Dr(e,s._$AS(e,t.values),s,n)),t}var Ts=class{constructor(t,r){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:r},parts:n}=this._$AD,s=(t?.creationScope??kr).importNode(r,!0);wr.currentNode=s;let o=wr.nextNode(),a=0,i=0,c=n[0];for(;c!==void 0;){if(a===c.index){let u;c.type===2?u=new tn(o,o.nextSibling,this,t):c.type===1?u=new c.ctor(o,c.name,c.strings,this,t):c.type===6&&(u=new Is(o,this,t)),this._$AV.push(u),c=n[++i]}a!==c?.index&&(o=wr.nextNode(),a++)}return wr.currentNode=kr,s}p(t){let r=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(t,n,r),r+=n.strings.length-2):n._$AI(t[r])),r++}},tn=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,r,n,s){this.type=2,this._$AH=ct,this._$AN=void 0,this._$AA=t,this._$AB=r,this._$AM=n,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,r=this._$AM;return r!==void 0&&t?.nodeType===11&&(t=r.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,r=this){t=Dr(this,t,r),Jr(t)?t===ct||t==null||t===""?(this._$AH!==ct&&this._$AR(),this._$AH=ct):t!==this._$AH&&t!==$r&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):qc(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==ct&&Jr(this._$AH)?this._$AA.nextSibling.data=t:this.T(kr.createTextNode(t)),this._$AH=t}$(t){let{values:r,_$litType$:n}=t,s=typeof n=="number"?this._$AC(t):(n.el===void 0&&(n.el=en.createElement(ga(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===s)this._$AH.p(r);else{let o=new Ts(s,this),a=o.u(this.options);o.p(r),this.T(a),this._$AH=o}}_$AC(t){let r=pa.get(t.strings);return r===void 0&&pa.set(t.strings,r=new en(t)),r}k(t){Ls(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,n,s=0;for(let o of t)s===r.length?r.push(n=new e(this.O(Qr()),this.O(Qr()),this,this.options)):n=r[s],n._$AI(o),s++;s<r.length&&(this._$AR(n&&n._$AB.nextSibling,s),r.length=s)}_$AR(t=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);t!==this._$AB;){let n=t.nextSibling;t.remove(),t=n}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},Mr=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,r,n,s,o){this.type=1,this._$AH=ct,this._$AN=void 0,this.element=t,this.name=r,this._$AM=s,this.options=o,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=ct}_$AI(t,r=this,n,s){let o=this.strings,a=!1;if(o===void 0)t=Dr(this,t,r,0),a=!Jr(t)||t!==this._$AH&&t!==$r,a&&(this._$AH=t);else{let i=t,c,u;for(t=o[0],c=0;c<o.length-1;c++)u=Dr(this,i[n+c],r,c),u===$r&&(u=this._$AH[c]),a||(a=!Jr(u)||u!==this._$AH[c]),u===ct?t=ct:t!==ct&&(t+=(u??"")+o[c+1]),this._$AH[c]=u}a&&!s&&this.j(t)}j(t){t===ct?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Es=class extends Mr{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===ct?void 0:t}},Cs=class extends Mr{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==ct)}},Rs=class extends Mr{constructor(t,r,n,s,o){super(t,r,n,s,o),this.type=5}_$AI(t,r=this){if((t=Dr(this,t,r,0)??ct)===$r)return;let n=this._$AH,s=t===ct&&n!==ct||t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive,o=t!==ct&&(n===ct||s);s&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Is=class{constructor(t,r,n){this.element=t,this.type=6,this._$AN=void 0,this._$AM=r,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(t){Dr(this,t)}};var Uc=Xr.litHtmlPolyfillSupport;Uc?.(en,tn),(Xr.litHtmlVersions??(Xr.litHtmlVersions=[])).push("3.3.1");var Ue=(e,t,r)=>{let n=r?.renderBefore??t,s=n._$litPart$;if(s===void 0){let o=r?.renderBefore??null;n._$litPart$=s=new tn(t.insertBefore(Qr(),o),o,void 0,r??{})}return s._$AI(e),s};var At="today",Gt=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}];function Rt(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function xr(e,t=Date.now()){switch(e){case"today":{let r=new Date(t);return r.setHours(0,0,0,0),r.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function ha(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function ba(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function va(){let e=null,t=[],r=new Set;function n(){for(let s of Array.from(r))try{s()}catch{}}return{get(){return e},getWorkspacesState(){return t},set(s,o){e=Array.isArray(s)?s:null,t=Array.isArray(o)?o:[],n()},clear(){e=null,t=[],n()},subscribe(s){return r.add(s),()=>r.delete(s)}}}function ya(){let e=new Map,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{set(n,s,o=null){e.set(n,{lines:Array.isArray(s)?[...s]:[],last_event_at:typeof o=="number"?o:null}),r()},append(n,s){let o=e.get(n)||{lines:[],last_event_at:null};o.lines=[...o.lines,s],o.last_event_at=Date.now(),e.set(n,o),r()},get(n){return e.get(n)||null},clear(n){typeof n=="string"?e.delete(n):e.clear(),r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}var Aa=Pc(Sa(),1);function ot(e){return(0,Aa.default)(`beads-ui:${e}`)}function Ft(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function Ar(e,t){let r=Ft(e.created_at),n=Ft(t.created_at);if(r!==n)return r<n?1:-1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function Ca(e,t){let r=Ft(e.created_at),n=Ft(t.created_at);if(r!==n)return r<n?-1:1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function Ra(e,t){let r=Ft(e.updated_at),n=Ft(t.updated_at);if(r!==n)return r<n?1:-1;let s=e.id,o=t.id;return s<o?-1:s>o?1:0}function Ia(e,t){let r=e.priority??2,n=t.priority??2;if(r!==n)return r-n;let s=Ft(e.created_at),o=Ft(t.created_at);if(s!==o)return s<o?1:-1;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function La(e,t){let r=e.closed_at??0,n=t.closed_at??0;if(r!==n)return r<n?1:-1;let s=e?.id,o=t?.id;return s<o?-1:s>o?1:0}var ed=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function Ta(e){let t=e&&e.metadata,r=t?t.task_order:void 0;if(r==null||r==="")return Number.POSITIVE_INFINITY;let n=Number(r);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function Ea(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let r=ed.exec(t);if(!r)return Number.POSITIVE_INFINITY;let n=Number(r[1]);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function Oa(e,t){let r=Ta(e),n=Ta(t);if(r!==n)return r<n?-1:1;let s=Ea(e),o=Ea(t);if(s!==o)return s<o?-1:1;let a=Ft(e&&e.created_at),i=Ft(t&&t.created_at);if(a!==i)return a<i?-1:1;let c=e&&e.id,u=t&&t.id;return c===u?0:String(c)<String(u)?-1:1}var Ds=2**20;function qr(e,t){let r=e&&e.id;return t&&typeof r=="string"&&Object.prototype.hasOwnProperty.call(t,r)&&typeof t[r]=="number"&&Number.isFinite(t[r])?t[r]:-Ft(e&&e.created_at)}function Mn(e){return(t,r)=>{let n=qr(t,e),s=qr(r,e);if(n!==s)return n<s?-1:1;let o=t?.id,a=r?.id;return o<a?-1:o>a?1:0}}function Ms(e,t,r){let n=Array.isArray(e)?e:[],s=n.length,o=Math.max(0,Math.min(t,s-1)),a=o-1>=0?n[o-1]:null,i=o+1<s?n[o+1]:null;if(!a&&!i)return{rank:0};if(!a)return{rank:qr(i,r)-Ds};if(!i)return{rank:qr(a,r)+Ds};let c=qr(a,r),u=qr(i,r),f=(c+u)/2;return c<f&&f<u?{rank:f}:{renormalize:n.map((_,b)=>({bead_id:_.id,rank:b*Ds}))}}function Ns(e,t={}){let r=ot(`issue-store:${e}`),n=new Map,s=[],o=0,a=new Set,i=!1,c=t.sort||Ar;function u(){for(let b of Array.from(a))try{b()}catch{}}function f(){s=Array.from(n.values()).sort(c)}function _(b){if(i||!b||b.id!==e)return;let T=Number(b.revision)||0;if(r("apply %s rev=%d",b.type,T),!(T<=o&&b.type!=="snapshot")){if(b.type==="snapshot"){if(T<=o)return;n.clear();let $=Array.isArray(b.issues)?b.issues:[];for(let E of $)E&&typeof E.id=="string"&&E.id.length>0&&n.set(E.id,E);f(),o=T,u();return}if(b.type==="upsert"){let $=b.issue;if($&&typeof $.id=="string"&&$.id.length>0){let E=n.get($.id);if(!E)n.set($.id,$);else{let U=Number.isFinite(E.updated_at)?E.updated_at:0,x=Number.isFinite($.updated_at)?$.updated_at:0;if(U<=x){for(let V of Object.keys(E))V in $||delete E[V];for(let[V,ee]of Object.entries($))E[V]=ee}}f()}o=T,u()}else if(b.type==="delete"){let $=String(b.issue_id||"");$&&(n.delete($),f()),o=T,u()}}}return{id:e,subscribe(b){return a.add(b),()=>{a.delete(b)}},applyPush:_,snapshot(){return s},size(){return n.size},getById(b){return n.get(b)},dispose(){i=!0,n.clear(),s=[],a.clear(),o=0}}}function Nn(e){let t=String(e.type||"").trim(),r={};if(e.params&&typeof e.params=="object"){let s=Object.keys(e.params).sort();for(let o of s){let a=e.params[o];r[o]=String(a)}}let n=new URLSearchParams(r).toString();return n.length>0?`${t}?${n}`:t}function Da(e){let t=ot("subs"),r=new Map,n=new Map;function s(i,c){t("applyDelta %s +%d ~%d -%d",i,(c.added||[]).length,(c.updated||[]).length,(c.removed||[]).length);let u=n.get(i);if(!u||u.size===0)return;let f=Array.isArray(c.added)?c.added:[],_=Array.isArray(c.updated)?c.updated:[],b=Array.isArray(c.removed)?c.removed:[];for(let T of Array.from(u)){let $=r.get(T);if(!$)continue;let E=$.itemsById;for(let U of f)typeof U=="string"&&U.length>0&&E.set(U,!0);for(let U of _)typeof U=="string"&&U.length>0&&E.set(U,!0);for(let U of b)typeof U=="string"&&U.length>0&&E.delete(U)}}async function o(i,c){let u=Nn(c);if(t("subscribe %s key=%s",i,u),!r.has(i))r.set(i,{key:u,itemsById:new Map});else{let _=r.get(i);if(_&&_.key!==u){let b=n.get(_.key);b&&(b.delete(i),b.size===0&&n.delete(_.key)),r.set(i,{key:u,itemsById:new Map})}}n.has(u)||n.set(u,new Set);let f=n.get(u);f&&f.add(i);try{await e("subscribe-list",{id:i,type:c.type,params:c.params})}catch(_){let b=r.get(i)||null;if(b){let T=n.get(b.key);T&&(T.delete(i),T.size===0&&n.delete(b.key))}throw r.delete(i),_}return async()=>{t("unsubscribe %s key=%s",i,u);try{await e("unsubscribe-list",{id:i})}catch{}let _=r.get(i)||null;if(_){let b=n.get(_.key);b&&(b.delete(i),b.size===0&&n.delete(_.key))}r.delete(i)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:Nn,selectors:{getIds(i){let c=r.get(i);return c?Array.from(c.itemsById.keys()):[]},has(i,c){let u=r.get(i);return u?u.itemsById.has(c):!1},count(i){let c=r.get(i);return c?c.itemsById.size:0},getItemsById(i){let c=r.get(i),u={};if(!c)return u;for(let f of c.itemsById.keys())u[f]=!0;return u}}}}function Ma(){let e=ot("issue-stores"),t=new Map,r=new Map,n=new Set,s=new Map;function o(){for(let c of Array.from(n))try{c()}catch{}}function a(c,u,f){let _=u?Nn(u):"",b=r.get(c)||"",T=t.has(c);if(e("register %s key=%s (prev=%s)",c,_,b),T&&b&&_&&b!==_){let $=t.get(c);if($)try{$.dispose()}catch{}let E=s.get(c);if(E){try{E()}catch{}s.delete(c)}let U=Ns(c,f);t.set(c,U);let x=U.subscribe(()=>o());s.set(c,x)}else if(!T){let $=Ns(c,f);t.set(c,$);let E=$.subscribe(()=>o());s.set(c,E)}return r.set(c,_),()=>i(c)}function i(c){e("unregister %s",c),r.delete(c);let u=t.get(c);u&&(u.dispose(),t.delete(c));let f=s.get(c);if(f){try{f()}catch{}s.delete(c)}}return{register:a,unregister:i,getStore(c){return t.get(c)||null},snapshotFor(c){let u=t.get(c);return u?u.snapshot().slice():[]},subscribe(c){return n.add(c),()=>n.delete(c)}}}function Na(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Pa(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Ps(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function td(e){let t=String(e||""),r=t.startsWith("#")?t.slice(1):t,n=r.indexOf("?"),s=n>=0?r.slice(n+1):"";if(s){let i=new URLSearchParams(s).get("issue");if(i)return decodeURIComponent(i)}let o=/^\/issue\/([^\s?#]+)/.exec(r);return o&&o[1]?decodeURIComponent(o[1]):null}function rd(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function Fa(e){let t=ot("router"),r=()=>{let n=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(n),o=s&&s[1]?decodeURIComponent(s[1]):td(n),a=rd(n);if(t("hash change \u2192 view=%s id=%s",a,o),e.setState({selected_id:a==="worker"?null:o,view:a,worker:{selected_parent_id:a==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(n)){let c=o?`#/${a}?issue=${encodeURIComponent(o)}`:`#/${a}`;window.location.hash!==c&&(window.location.hash=c)}};return{start(){window.addEventListener("hashchange",r),r()},stop(){window.removeEventListener("hashchange",r)},gotoIssue(n){let s=e.getState?e.getState():{view:"board"},o=s.view==="worker"||s.view==="monitor"?s.view:"board",a=Ps(o,n);t("goto issue %s (view=%s)",n,o),window.location.hash!==a?window.location.hash=a:e.setState({selected_id:o==="worker"?null:n,view:o,worker:{selected_parent_id:o==="worker"?n:null}})},gotoView(n){let s=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},o=n==="worker"?s.worker?.selected_parent_id:s.selected_id,a=o?Ps(n,o):`#/${n}`;t("goto view %s (id=%s)",n,o||""),window.location.hash!==a?window.location.hash=a:e.setState({view:n,selected_id:n==="worker"?null:s.selected_id})}}}var nd=Object.freeze({workspace_config:{default_workspace:null}});function qa(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:nd.workspace_config.default_workspace}}}function Ba(e={}){let t=ot("state"),r={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:qa(e.config)},n=new Set;function s(){for(let o of Array.from(n))try{o(r)}catch{}}return{getState(){return r},setState(o){let a={...r,...o,filters:{...r.filters,...o.filters||{}},board:{...r.board,...o.board||{}},worker:{...r.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:r.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:r.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:r.workspace.hidden},config:o.config!==void 0?qa(o.config):r.config},i=a.workspace.current?.path!==r.workspace.current?.path||a.workspace.available.length!==r.workspace.available.length||a.workspace.hidden.length!==r.workspace.hidden.length||a.workspace.hidden.some((u,f)=>u!==r.workspace.hidden[f]),c=a.config.workspace_config.default_workspace!==r.config.workspace_config.default_workspace;a.selected_id===r.selected_id&&a.view===r.view&&a.filters.status===r.filters.status&&a.filters.search===r.filters.search&&a.filters.type===r.filters.type&&a.board.closed_filter===r.board.closed_filter&&a.worker.selected_parent_id===r.worker.selected_parent_id&&a.worker.show_closed_children.length===r.worker.show_closed_children.length&&a.worker.show_closed_children.every((u,f)=>u===r.worker.show_closed_children[f])&&!i&&!c||(r=a,t("state change %o",{selected_id:r.selected_id,view:r.view,filters:r.filters,board:r.board,worker:r.worker,workspace:r.workspace.current?.path,config:{default_workspace:r.config.workspace_config.default_workspace}}),s())},subscribe(o){return n.add(o),()=>n.delete(o)}}}function Ua(e){let t=ot("activity"),r=0,n=new Map,s=1;function o(){if(!e)return;let u=r>0;e.toggleAttribute("hidden",!u),e.setAttribute("aria-busy",u?"true":"false")}function a(){r+=1,t("start count=%d",r),o()}function i(){let u=r;r=Math.max(0,r-1),u<=0?t("done called but count was already %d",u):t("done count=%d\u2192%d",u,r),o()}function c(u){return async(_,b)=>{let T=s++,$=Date.now();n.set(T,{type:_,start_ts:$}),t("request start id=%d type=%s count=%d",T,_,r+1),a();let E=!1,U=()=>{E||(E=!0,n.delete(T),i())},x=setTimeout(()=>{E||(t("request TIMEOUT id=%d type=%s elapsed=%dms",T,_,Date.now()-$),U())},3e4);try{let V=await u(_,b),ee=Date.now()-$;return t("request done id=%d type=%s elapsed=%dms",T,_,ee),V}catch(V){let ee=Date.now()-$;throw t("request error id=%d type=%s elapsed=%dms err=%o",T,_,ee,V),V}finally{clearTimeout(x),U()}}}return o(),{wrapSend:c,start:a,done:i,getCount:()=>r,getActiveRequests:()=>{let u=Date.now();return Array.from(n.entries()).map(([f,_])=>({id:f,type:_.type,elapsed_ms:u-_.start_ts}))}}}function Q(e,t="info",r=2800){let n=document.createElement("div");n.className="toast",n.textContent=e,n.style.position="fixed",n.style.right="12px",n.style.bottom="12px",n.style.zIndex="1000",n.style.color="#fff",n.style.padding="8px 10px",n.style.borderRadius="4px",n.style.fontSize="12px",t==="success"?n.style.background="#156d36":t==="warning"?n.style.background="#a36a00":t==="error"?n.style.background="#9f2011":n.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(n),setTimeout(()=>{try{n.remove()}catch{}},r)}function Pn(e=void 0,t=void 0){function r(){if(!t||typeof t.get!="function")return null;let o=t.get();return o&&o.order?o.order:{}}function n(o,a,i){let c=e&&e.snapshotFor?e.snapshotFor(o).slice():[];if(a==="closed")return c.sort(La),c;switch(i){case"created_desc":return c.sort(Ar),c;case"created_asc":return c.sort(Ca),c;case"updated_desc":return c.sort(Ra),c;case"priority":return c.sort(Ia),c;case"manual":default:{let u=r();return u?c.sort(Mn(u)):c.sort(Ar),c}}}function s(o){let a=[];return e&&typeof e.subscribe=="function"&&a.push(e.subscribe(o)),t&&typeof t.subscribe=="function"&&a.push(t.subscribe(o)),()=>{for(let i of a)try{i()}catch{}}}return{selectBoardColumn:n,subscribe:s}}function er(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function pt(e){let t=er(e);if(t===null)return"";let r=new Date(t),n=s=>String(s).padStart(2,"0");return`${r.getFullYear()}-${n(r.getMonth()+1)}-${n(r.getDate())} ${n(r.getHours())}:${n(r.getMinutes())}`}function Tt(e,t){let r=er(e);if(r===null)return"";let s=(typeof t=="number"?t:Date.now())-r;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let a=Math.floor(s/36e5);if(a<24)return`${a}\uC2DC\uAC04 \uC804`;let i=Math.floor(s/864e5);if(i<7)return`${i}\uC77C \uC804`;let c=Math.floor(i/7);if(i<30)return`${c}\uC8FC \uC804`;let u=Math.floor(i/30);return u<12?`${u}\uAC1C\uC6D4 \uC804`:`${Math.floor(i/365)}\uB144 \uC804`}function Fn(e){if(!Array.isArray(e))return null;let t=null,r=-1;for(let n of e){if(!n||n.status!=="in_progress")continue;let s=er(n.updated_at)??0;if(t===null||s>r){t=n,r=s;continue}s===r&&String(n.id)<String(t.id)&&(t=n)}return t}function qn(e){let t=e.transport,r=e.uiOrderStore;function n(a,i){return"renormalize"in a?a.renormalize:[{bead_id:i,rank:a.rank}]}function s(a,i){let c={...a.order};for(let u of i)c[u.bead_id]=u.rank;r&&r.set({revision:a.revision,order:c})}async function o(a,i,c){if(!t||!r)return;let u=r.get()||{revision:0,order:{}},f=n(Ms(i,c,u.order),a);s(u,f);let _=await t("ui-order-set",{expected_revision:u.revision,entries:f});if(_&&_.conflict){let b={revision:typeof _.revision=="number"?_.revision:0,order:_.order||{}};r.set(b);let T=n(Ms(i,c,b.order),a);s(b,T);let $=await t("ui-order-set",{expected_revision:b.revision,entries:T});$&&$.applied&&r.set({revision:typeof $.revision=="number"?$.revision:0,order:$.order||{}})}else _&&_.applied&&r.set({revision:typeof _.revision=="number"?_.revision:0,order:_.order||{}})}return{applyReorder:o}}function Bn(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Fs(e,t){return!t||typeof e!="string"||e.length===0||Bn(t.visible_labels).includes(e)?!0:Bn(t.hidden_labels).includes(e)?!1:!Bn(t.hidden_prefixes).some(r=>r.length>0&&e.startsWith(r))}function Un(e,t){return Bn(e).filter(r=>Fs(r,t))}function dr(e,t){let r=e&&e.chips?e.chips[t]:void 0;return typeof r=="boolean"?r:!0}var sd={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},za={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},ja={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},od={review:"\u2713",skip:"\u2298"},ur={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function ad(e,t,r){if(!(r==="in_progress"||r==="resolved"))return null;for(let s of e){let o=t[s];if(o&&o.fill==="dim"&&o.stale!==!0)return s}return null}function Ha(e){let t=e&&e.fill||"none";return t==="none"?ur.none:e&&e.stale===!0?ur.stale:t==="dim"?ur.dim:e&&e.glyph==="review"?ur.review:e&&e.glyph==="skip"?ur.skip:ur.done}function id(e){if(!e||e.fill==="none"||!e.approval_state)return Ha(e);let t=[];return e.glyph==="review"?t.push(ur.review):e.glyph==="skip"&&t.push(ur.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function ld(e,t,r){let n=sd[e]||e,s=t&&t.fill||"none",o=!!t&&t.stale===!0,a=od[t&&t.glyph||""]||"",i="bar";s==="dim"?i+=` b-${n} dim`:s==="full"&&(i+=` b-${n} full`),o&&(i+=" stale"),r&&(i+=" cur");let c=s==="none"?"lbl":`lbl l-${n} on`,u=r?`color: var(--stage-${n}-on)`:"";return l`
    <div class="seg">
      <div class=${i} style=${u}>${a}</div>
      <div class=${c}>
        ${za[e]||e}
      </div>
    </div>
  `}function jn(e,t){if(!e||!e.stages)return"";let r=ja[e.route]||ja.spec_backed,n=e.stages,s=ad(r,n,String(t||"open")),o=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${r.map(a=>`${za[a]||a} ${a==="plan"?id(n[a]||{}):Ha(n[a]||{})}`).join(" \xB7 ")}`;return l`
    <div class="stp" role="img" aria-label=${o}>
      ${r.map(a=>ld(a,n[a]||{},a===s))}
    </div>
  `}function cd(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var Wa=2;function dd(e){if(!e)return[];let t=[];if(e.external){let n=e.reason?`\u23F8 blocked: ${e.reason}`:"\u23F8 blocked";t.push(l`<span class="ctl-chip ctl-chip--blocked">${n}</span>`)}let r=Array.isArray(e.blockers)?e.blockers:[];if(r.length>0){let n=r.slice(0,Wa).join(", "),s=r.length-Wa,o=`\u26D3 blocked: ${n}${s>0?` +${s}`:""}`;t.push(l`<span class="ctl-chip ctl-chip--blocked-dep">${o}</span>`)}return t}function ud(e,t){let r=t.policy||null,n=e.workflow&&e.workflow.chips||{},s=[];if(n.route&&dr(r,"route")){let a=n.route_source==="derived";s.push(l`<span
        class="ctl-chip ctl-chip--route${a?" is-derived":""}"
        title=${a?"route \uBBF8\uD540 (metadata unset)":"route"}
        >${a?"unset":n.route}</span
      >`)}if(n.fast_track&&dr(r,"fast_track")&&s.push(l`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),n.pr&&dr(r,"pr")){let a=n.pr.number;s.push(l`<span class="ctl-chip ctl-chip--pr"
        >${`PR${a!=null?` #${a}`:""}`}</span
      >`)}if(n.exec_receipt){let a=n.exec_receipt;s.push(l`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${a.kind}:${a.actor}@${a.sha}`}
        >${`exec ${a.kind==="delegated"?a.actor:`main:${a.actor}`} \xB7 ${a.sha.slice(0,7)}`}</span
      >`)}if(n.impl_entry){let a=n.impl_entry;s.push(l`<span
        class="ctl-chip ctl-chip--impl-entry"
        title=${`impl_entry ${a.actor}@${a.sha}`}
        >${`impl ${a.actor} \xB7 ${a.sha.slice(0,7)}`}</span
      >`)}for(let a of Un(e.labels,r))s.push(l`<span class="ctl-chip ctl-chip--label">${a}</span>`);return e.from_id&&dr(r,"from")&&s.push(l`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${a=>{a.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(a,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),dr(r,"blocked")&&s.push(...dd(e.blocked_info)),t.cleanupFailureFor&&t.cleanupFailureFor(e.id)&&dr(r,"blocked")&&s.push(l`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 멈춤</span>`),s.length===0?"":l`<div class="board-card__chips">${s}</div>`}function pd(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function fd(e){let t=Tt(e.created_at),r=Tt(e.updated_at);return!t&&!r?"":l`<span class="board-card__times">
    ${t?l`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${pt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}
    ${t&&r?l`<span class="board-card__time-sep">·</span>`:""}
    ${r?l`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${pt(e.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </span>`}function _d(e,t){let r=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]},n=r.total||0,s=t.isExpanded?t.isExpanded(e.id):!0,o=n>0?r.children.slice().sort(Oa):r.children;return l`
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
        ${fd(e)}
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
                  @click=${c=>t.onChildClick&&t.onChildClick(c,a.id)}
                >
                  <span class=${pd(a.status)}>●</span>
                  <span class="board-card__roll-child-ord">${i+1}</span>
                  <span class="board-card__roll-child-title"
                    >${a.title||a.id}</span
                  >
                </button>`)}
          </div>`:""}
    </div>
  `}function zn(e,t){let r=cd(e.priority);return l`
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
      ${ud(e,t)}
      ${e.workflow&&dr(t.policy||null,"stepper")?jn(e.workflow,e.status):""}
      ${_d(e,t)}
    </article>
  `}function Br(e,t){let r=Array.isArray(e.items)?e.items.length:0,n=e.is_closed===!0;return l`
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
              ${Gt.map(o=>l`<option
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
        ${e.items.map(o=>zn(o,t))}
      </div>
    </section>
  `}function Ga(e,t,r){return l`
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
          ${e.items.length===0?l`<div class="deferred-popup__empty">Deferred 이슈 없음</div>`:e.items.map(n=>zn(n,t))}
        </div>
      </div>
    </dialog>
  `}var md=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],gd=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],hd=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function bd(e,t,r){let n=e.labels.length,s=n>0?`\uB77C\uBCA8 ${n}`:"\uB77C\uBCA8";return l`
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
  `}function Ya(e,t,r){return l`
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
        ${md.map(n=>l`<option
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
        ${gd.map(n=>l`<option
              value=${n.value}
              ?selected=${e.type===n.value}
            >
              ${n.label}
            </option>`)}
      </select>
      ${bd(e,t,r)}
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
        ${hd.map(n=>l`<option
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
  `}var vd=200,yd={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},wd=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),Va="beads-ui.board.sort",Ka=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function kd(){try{let e=window.localStorage.getItem(Va);if(e&&Ka.has(e))return e}catch{}return"created_desc"}function Za(e,t){let r=ot("views:board"),n=t.gotoIssue,s=t.issueStores,o=t.transport,a=t.uiOrderStore,i=t.displayPolicyStore,c=t.workerQueueStore,u=t.onClosedRangeChange,f=t.onNewIssue,_=t.closedRange||At,b=s?Pn(s,a):null,T=qn({transport:o,uiOrderStore:a}),$=[],E=[],U=[],x=[],V=[],ee=[],O=!1,D=0,S=kd(),z=new Map,L=new Map,pe=new Map,ve=new Set,ae={search:"",priority:"",type:"",labels:[]},be=!1,Ce=null;function Ge(B){return String(B.status||"open")==="open"}function Xe(B){let Y=String(B.status||"open");return Y==="open"||Y==="blocked"}function ze(B){let Y=ae.search.trim().toLowerCase(),oe=ae.priority,de=ae.type,te=ae.labels;return B.filter(Te=>{if(Y){let Ke=String(Te.id||"").toLowerCase(),Qe=String(Te.title||"").toLowerCase();if(!Ke.includes(Y)&&!Qe.includes(Y))return!1}if(oe!==""&&String(Te.priority)!==oe||de!==""&&String(Te.issue_type||"")!==de)return!1;if(te.length>0){let Ke=Array.isArray(Te.labels)?Te.labels:[];if(!te.some(Qe=>Ke.includes(Qe)))return!1}return!0})}function Se(){let B=new Set;for(let Y of[$,E,U,x,V,ee])for(let oe of Y){let de=Array.isArray(oe.labels)?oe.labels:[];for(let te of de)typeof te=="string"&&te.length>0&&B.add(te)}return Array.from(B).sort()}function xe(){return ae.search.trim()!==""||ae.priority!==""||ae.type!==""||ae.labels.length>0}function _e(){try{if(b){let B=b.selectBoardColumn("tab:board:in-progress","in_progress",S),Y=b.selectBoardColumn("tab:board:blocked","blocked",S).filter(Xe),oe=new Set(B.map(we=>we.id)),de=b.selectBoardColumn("tab:board:ready","ready",S).filter(we=>Ge(we)&&!oe.has(we.id)),te=b.selectBoardColumn("tab:board:resolved","resolved",S),Te=b.selectBoardColumn("tab:board:deferred","deferred",S),Ke=b.selectBoardColumn("tab:board:closed","closed").slice(0,vd),Qe=[...Y,...de,...B,...te,...Ke];ge(Qe);let $e=new Set;for(let we of Qe)we&&we.id&&!qs(we)&&$e.add(we.id);let Ye=!xe();$=Ye?rn(Y,$e):Y,E=Ye?rn(de,$e):de,U=Ye?rn(B,$e):B,x=Ye?rn(te,$e):te,V=Te,D=Te.length,ee=Ye?rn(Ke,$e):Ke,z=new Map;for(let we of $)z.set(we.id,"open");for(let we of E)z.set(we.id,"open");for(let we of U)z.set(we.id,"in_progress");for(let we of x)z.set(we.id,"resolved");for(let we of V)z.set(we.id,"deferred");for(let we of ee)z.set(we.id,"closed");L=new Map;for(let we of $)L.set(we.id,"blocked-col");for(let we of E)L.set(we.id,"ready-col");for(let we of U)L.set(we.id,"in-progress-col");for(let we of x)L.set(we.id,"resolved-col");for(let we of ee)L.set(we.id,"closed-col")}Oe()}catch{$=[],E=[],U=[],x=[],V=[],ee=[],pe=new Map,Oe()}}function ge(B){let Y=new Map;for(let de of B)de&&de.id&&!Y.has(de.id)&&Y.set(de.id,de);let oe=new Map;for(let de of Y.values()){let te=qs(de);if(!te)continue;let Te=oe.get(te);Te||(Te=[],oe.set(te,Te)),Te.push({id:de.id,title:de.title,status:de.status,metadata:de.metadata,created_at:de.created_at,updated_at:de.updated_at})}pe=oe}function he(B){let Y=pe.get(B)||[],oe=0;for(let te of Y)(te.status==="resolved"||te.status==="closed")&&(oe+=1);let de=Fn(Y);return{total:Y.length,count:oe,current:de,children:Y}}function G(B){return!ve.has(B)}function K(B,Y){B.preventDefault(),B.stopPropagation(),ve.has(Y)?ve.delete(Y):ve.add(Y),Oe()}function Re(B,Y){B.preventDefault(),B.stopPropagation(),n(Y)}function me(B,Y){B.preventDefault(),B.stopPropagation(),n(Y)}function fe(B,Y){Ce||n(Y)}function I(B,Y){B.preventDefault(),B.stopPropagation(),$d(Y).then(oe=>{oe&&Q("\uBCF5\uC0AC\uB428","success",1200)})}function R(B,Y){Ce=Y,B.dataTransfer&&(B.dataTransfer.setData("text/plain",Y),B.dataTransfer.effectAllowed="move"),B.target.classList.add("board-card--dragging")}function ie(B){B.target.classList.remove("board-card--dragging"),_t(),setTimeout(()=>{Ce=null},0)}function De(B){let Y=String(B.target.value||"");!Y||Y===_||(_=Y,u&&u(Y),Oe())}function Ae(){return i?i.get():null}function je(B){let Y=c?c.get():null,oe=Y?Y.cleanup_failed:null;if(!oe||typeof oe!="object"||Array.isArray(oe))return null;let de=oe[B];return!de||typeof de!="object"||Array.isArray(de)?null:de}let Me={onCardClick:fe,onCopyId:I,onDragStart:R,onDragEnd:ie,onClosedRangeChange:De,rollupFor:he,isExpanded:G,onRollupToggle:K,onChildClick:Re,onFromChipClick:me,cleanupFailureFor:je,get policy(){return Ae()}};function Le(B,Y){Ce||(C(),n(Y))}function Ie(B,Y){B.preventDefault(),B.stopPropagation(),C(),n(Y)}let Je={...Me,onCardClick:Le,onChildClick:Ie,onFromChipClick:Ie,get policy(){return Ae()}};function M(B){let Y=B.target,oe=e.querySelector(".board-filter__labels");Y&&oe&&oe.contains(Y)||X()}function H(B){B.key==="Escape"&&X()}function q(){be||(be=!0,document.addEventListener("mousedown",M),document.addEventListener("keydown",H),Oe())}function X(){be&&(be=!1,document.removeEventListener("mousedown",M),document.removeEventListener("keydown",H),Oe())}function ce(B){B.key==="Escape"&&C()}function w(){O||(O=!0,document.addEventListener("keydown",ce),Oe())}function C(){O&&(O=!1,document.removeEventListener("keydown",ce),Oe())}let W={onClose:C,onOverlayClick(B){B.target===B.currentTarget&&C()}},le={onSearchInput(B){ae.search=String(B.target.value||""),_e()},onPriorityChange(B){ae.priority=String(B.target.value||""),_e()},onTypeChange(B){ae.type=String(B.target.value||""),_e()},onSortChange(B){let Y=String(B.target.value||"");if(!(!Ka.has(Y)||Y===S)){S=Y;try{window.localStorage.setItem(Va,Y)}catch{}_e()}},onDeferredToggle(){O?C():w()},onLabelMenuToggle(){be?X():q()},onLabelToggle(B){let Y=ae.labels.indexOf(B);Y===-1?ae.labels.push(B):ae.labels.splice(Y,1),_e()},onLabelClear(){ae.labels.length!==0&&(ae.labels=[],_e())},onNewIssue(){f&&f()}};function ne(){return l`
      <div class="board-view">
        ${Ya(ae,le,{sort_mode:S,deferred_popup_open:O,deferred_count:D,label_options:Se(),label_menu_open:be})}
        <div class="board-root">
          ${Br({title:"Blocked",id:"blocked-col",items:ze($)},Me)}
          ${Br({title:"Ready",id:"ready-col",items:ze(E)},Me)}
          ${Br({title:"In progress",id:"in-progress-col",items:ze(U)},Me)}
          ${Br({title:"Resolved",id:"resolved-col",items:ze(x)},Me)}
          ${Br({title:"Closed",id:"closed-col",items:ze(ee),is_closed:!0,closed_range:_},Me)}
        </div>
        ${O?Ga({items:ze(V),count:D},Je,W):""}
      </div>
    `}function Oe(){Ue(ne(),e),Ne()}function Ne(){try{let B=e.querySelector("#deferred-popup");B&&!B.open&&(typeof B.showModal=="function"?B.showModal():B.setAttribute("open",""));let Y=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let oe of Y)Array.from(oe.querySelectorAll(".board-card")).forEach((te,Te)=>{te.tabIndex=Te===0?0:-1})}catch{}}async function et(B,Y){if(!o){Q("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:B,status:Y}),Q("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(oe){r("update-status failed: %o",oe),Q("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function Fe(B){switch(B){case"blocked-col":return $;case"ready-col":return E;case"in-progress-col":return U;case"resolved-col":return x;default:return[]}}function ut(B,Y,oe){if(!o||!a)return;let de=Fe(B),te=de.find(Ye=>Ye.id===Y);if(!te)return;let Te=de.filter(Ye=>Ye.id!==Y),Ke=oe.closest?oe.closest(".board-card"):null,Qe=Te.length;if(Ke){let Ye=Ke.getAttribute("data-issue-id");if(Ye===Y)return;let we=Te.findIndex(dt=>dt.id===Ye);we>=0&&(Qe=we)}let $e=Te.slice();$e.splice(Qe,0,te),T.applyReorder(Y,$e,Qe)}function _t(){for(let B of Array.from(e.querySelectorAll(".board-column--drag-over")))B.classList.remove("board-column--drag-over")}let rt=null;e.addEventListener("dragover",B=>{B.preventDefault(),B.dataTransfer&&(B.dataTransfer.dropEffect="move");let oe=B.target.closest(".board-column");oe&&oe!==rt&&(rt&&rt.classList.remove("board-column--drag-over"),oe.classList.add("board-column--drag-over"),rt=oe)}),e.addEventListener("dragleave",B=>{let Y=B.relatedTarget;(!Y||!e.contains(Y))&&rt&&(rt.classList.remove("board-column--drag-over"),rt=null)}),e.addEventListener("drop",B=>{B.preventDefault(),rt&&(rt.classList.remove("board-column--drag-over"),rt=null);let Y=B.target,oe=Y.closest(".board-column");if(!oe)return;let de=B.dataTransfer?.getData("text/plain")||"";if(!de)return;let te=oe.id,Te=L.get(de);if(Te&&Te===te){if(wd.has(te)){if(S!=="manual"){Q("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}ut(te,de,Y)}return}let Ke=yd[te];if(!Ke){Q("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}z.get(de)!==Ke&&et(de,Ke)}),e.addEventListener("keydown",B=>{let Y=B.target;if(!(Y instanceof HTMLElement))return;let oe=String(Y.tagName||"").toLowerCase();if(oe==="input"||oe==="textarea"||oe==="select"||oe==="button"||oe==="a"||Y.isContentEditable===!0)return;let de=Y.closest(".board-card");if(!de)return;let te=String(B.key||"");if(te==="Enter"||te===" "){B.preventDefault();let $e=de.getAttribute("data-issue-id");$e&&n($e);return}if(te!=="ArrowUp"&&te!=="ArrowDown"&&te!=="ArrowLeft"&&te!=="ArrowRight")return;B.preventDefault();let Te=de.closest(".board-column");if(!Te)return;let Ke=Array.from(Te.querySelectorAll(".board-card")),Qe=Ke.indexOf(de);if(te==="ArrowDown"&&Qe<Ke.length-1){nt(de,Ke[Qe+1]);return}if(te==="ArrowUp"&&Qe>0){nt(de,Ke[Qe-1]);return}if(te==="ArrowLeft"||te==="ArrowRight"){let $e=Array.from(e.querySelectorAll(".board-column")),Ye=$e.indexOf(Te),we=te==="ArrowRight"?1:-1,dt=Ye+we;for(;dt>=0&&dt<$e.length;){let bt=$e[dt].querySelector(".board-card");if(bt){nt(de,bt);return}dt+=we}}});function nt(B,Y){try{B.tabIndex=-1,Y.tabIndex=0,Y.focus()}catch{}}let st=null;b&&b.subscribe&&(st=b.subscribe(()=>{try{_e()}catch{}}));let at=null;i&&i.subscribe&&(at=i.subscribe(()=>{try{_e()}catch{}}));let mt=null;return c&&c.subscribe&&(mt=c.subscribe(()=>{Oe()})),{async load(){r("load"),_e()},clear(){X(),C(),st&&(st(),st=null),at&&(at(),at=null),mt&&(mt(),mt=null),e.replaceChildren(),$=[],E=[],U=[],x=[],V=[],ee=[],z=new Map,L=new Map}}}function qs(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function rn(e,t){return e.filter(r=>{let n=qs(r);return!(n&&t.has(n))})}async function $d(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let r=!1;try{r=document.execCommand("copy")}finally{t.remove()}return r}catch{return!1}}async function Tr(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let r=document.createElement("textarea");r.value=t,r.style.position="fixed",r.style.left="-9999px",document.body.appendChild(r),r.select();let n=!1;try{n=document.execCommand("copy")}finally{r.remove()}return n}catch{return!1}}function Yt(e){return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,e.speed==="fast"?"Fast":null].filter(Boolean).join(" \xB7 ")}function pr(e){return typeof e.resumed_from!="string"||e.resumed_from.length===0?null:`${e.continuation_mode==="session"?"session \uC774\uC5B4\uBC1B\uC74C":e.continuation_mode==="fresh"?"\uC0C8 session\uC73C\uB85C \uC774\uC5B4\uBC1B\uC74C":"\uC774\uC804 attempt\uC5D0\uC11C \uC774\uC5B4\uBC1B\uC74C"} (from ${e.resumed_from})`}function xd(e,t=document){let r=t.createElement("dialog");r.className="continuation-dialog";let n=t.createElement("button"),s=t.createElement("button"),o=t.createElement("button"),a=t.createElement("h2"),i=t.createElement("p");return a.textContent="\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4",i.textContent=`${Yt(e.prior||{})||"\uC774\uC804 \uC124\uC815"} \u2192 ${Yt(e.current||{})||"\uD604\uC7AC \uC124\uC815"}`,n.type="button",n.textContent="\uAE30\uC874 session \uC774\uC5B4\uD558\uAE30",n.disabled=e.prior_available===!1,s.type="button",s.textContent="\uD604\uC7AC preset\uC73C\uB85C \uC0C8 session",o.type="button",o.textContent="\uCDE8\uC18C",r.append(a,i,n,s,o),t.body.append(r),new Promise(c=>{let u=f=>{typeof r.close=="function"&&r.close(),r.remove(),c(f)};n.addEventListener("click",()=>u("prior_session")),s.addEventListener("click",()=>u("fresh_current")),o.addEventListener("click",()=>u(null)),r.addEventListener("cancel",f=>{f.preventDefault(),u(null)}),typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")})}async function tr(e,t,r={}){let n=e;for(r.onResult?.(n);n?.continuation_mismatch;){let s=n.continuation_mismatch,o=await xd(s);if(o===null)return n;n=await t(o,s.decision_token),r.onResult?.(n),n?.conflict&&r.refresh&&(n=await r.refresh(n),r.onResult?.(n))}return n}var ti="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function ft(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var rr=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],nn=[...rr,"reasoning_output_tokens"],Sd=["implementation","review-consult"];function Bs(e){let t=0;for(let r of rr)t+=ft(e?.[r]);return t}function Ad(e){return!e||typeof e!="object"?!1:rr.some(t=>Number.isFinite(e[t]))}function Xa(e){return!e||typeof e!="object"?!1:nn.some(t=>Number.isFinite(e[t]))}function Td(e){let t={};for(let r of nn)e&&Number.isFinite(e[r])&&(t[r]=e[r]);return t}function Qa(e){let t={};for(let r of nn)Number.isFinite(e[r])&&(t[r]=e[r]);return e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function Ja(e,t){return e==="codex"?ft(t.input_tokens)+ft(t.output_tokens):Bs(t)}function Ed(e){return e==="claude"?"Claude":"Codex"}function Cd(e){return`\u03C4 ${ri(e)}`}function Rd(e,t){let r=t.breakdown||{},n=[`\uC785\uB825 ${ft(r.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${ft(r.output_tokens).toLocaleString("en-US")}`];e==="claude"?n.push(`\uCE90\uC2DC\uC77D\uAE30 ${ft(r.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${ft(r.cache_creation_input_tokens).toLocaleString("en-US")}`):(n.push(`\uCE90\uC2DC\uC77D\uAE30 ${ft(r.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${ft(r.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(r.reasoning_output_tokens)&&n.push(`\uCD94\uB860\uCD9C\uB825 ${ft(r.reasoning_output_tokens).toLocaleString("en-US")}`));let o=[e==="claude"?"Claude subtotal = \uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"Codex subtotal = \uC785\uB825 + \uCD9C\uB825; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset",`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,n.join(" \xB7 ")];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&o.push(`$${t.total_cost_usd.toFixed(2)}`),t.replayed&&o.push(ti),o.join(`
`)}function ht(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let r of["claude","codex"]){let n=e.providers[r];n&&t.push({provider:r,label:`${Ed(r)} ${Cd(n.subtotal)}${typeof n.total_cost_usd=="number"&&Number.isFinite(n.total_cost_usd)?` \xB7 $${n.total_cost_usd.toFixed(2)}`:""}`,tooltip:Rd(r,n)})}return t}function Wn(e){let t={},r={claude:!0,codex:!1},n={claude:0,codex:0};for(let s of e)if(!(!s||!s.providers))for(let o of["claude","codex"]){let a=s.providers[o];if(!a)continue;let i=t[o];i||(i={subtotal:0,breakdown:{}},t[o]=i),i.subtotal+=a.subtotal;for(let c of nn)Number.isFinite(a.breakdown[c])&&(i.breakdown[c]=ft(i.breakdown[c])+ft(a.breakdown[c]));a.replayed&&(i.replayed=!0),o==="claude"&&(typeof a.total_cost_usd=="number"&&Number.isFinite(a.total_cost_usd)?n.claude+=a.total_cost_usd:r.claude=!1)}return t.claude&&r.claude&&(t.claude.total_cost_usd=n.claude),Object.keys(t).length===0?null:{providers:t,roles:{}}}function Us(e){return!e||typeof e!="object"?null:It({attempt:{...e,bead_id:"__attempt__"}},"__attempt__")}function Id(e){return e==="codex"?"codex":"claude"}function fr(){return{subtotal:0,breakdown:Td(null),legs:[],replayed:!1,outer_count:0,outer_cost:0,outer_cost_count:0}}function Hn(e,t,r){e.subtotal+=t.subtotal;for(let n of nn)Number.isFinite(t.usage[n])&&(e.breakdown[n]=ft(e.breakdown[n])+ft(t.usage[n]));e.legs.push(t),t.replayed===!0&&(e.replayed=!0),r&&(e.outer_count+=1,typeof t.usage.total_cost_usd=="number"&&Number.isFinite(t.usage.total_cost_usd)&&(e.outer_cost+=t.usage.total_cost_usd,e.outer_cost_count+=1))}function ei(e,t){let r={subtotal:e.subtotal,breakdown:e.breakdown};return t&&(r.legs=e.legs),e.replayed&&(r.replayed=!0),r}function ri(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function Ur(e){return Ad(e)?`\u03C4 ${ri(Bs(e))}`:null}function qt(e){let t=Ur(e);if(!t)return null;let r=e?.total_cost_usd;return typeof r=="number"&&Number.isFinite(r)?`${t} \xB7 $${r.toFixed(2)}`:t}function jr(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${ft(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${ft(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${ft(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${ft(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let r=[`\uCD1D ${Bs(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&r.push(ti),r.join(`
`)}function It(e,t){let r={claude:fr(),codex:fr()},n={orchestrator:{claude:fr(),codex:fr()},implementation:{claude:fr(),codex:fr()},"review-consult":{claude:fr(),codex:fr()}},s=new Set;for(let i of Object.values(e||{})){if(!i||i.bead_id!==t)continue;let c=i.usage;if(Xa(c)){let f=Id(i.runner),_=Qa(c),b={provider:f,role:"orchestrator",attempt_id:String(i.attempt_id||""),usage:_,subtotal:Ja(f,_)};_.replayed===!0&&(b.replayed=!0),typeof i.model=="string"&&(b.model=i.model),typeof i.session_id=="string"&&(b.session_id=i.session_id),Hn(r[f],b,!0),Hn(n.orchestrator[f],b,!0)}let u=Array.isArray(i.usage_legs)?i.usage_legs:[];for(let f of u){if(!f||f.provider!=="codex"||!Sd.includes(f.role)||!Xa(f.usage))continue;let _=typeof f.receipt_id=="string"&&f.receipt_id.length>0?f.receipt_id:null;if(!_||s.has(_))continue;s.add(_);let b=Qa(f.usage),T={provider:"codex",role:f.role,attempt_id:String(i.attempt_id||""),usage:b,subtotal:Ja("codex",b)};T.receipt_id=_,typeof f.model=="string"&&(T.model=f.model),typeof f.session_id=="string"?T.session_id=f.session_id:typeof f.thread_id=="string"&&(T.session_id=f.thread_id),typeof f.turn_id=="string"&&(T.turn_id=f.turn_id),typeof f.completed_at=="string"&&(T.completed_at=f.completed_at),b.replayed===!0&&(T.replayed=!0),Hn(r.codex,T,!1),Hn(n[T.role].codex,T,!1)}}let o={};for(let i of["claude","codex"]){let c=r[i];if(c.legs.length===0)continue;let u=ei(c,!1);i==="claude"&&c.outer_count>0&&c.outer_cost_count===c.outer_count&&(u.total_cost_usd=c.outer_cost),o[i]=u}if(Object.keys(o).length===0)return null;let a={};for(let i of["orchestrator","implementation","review-consult"]){let c={};for(let u of["claude","codex"]){let f=n[i][u];f.legs.length>0&&(c[u]={...ei(f,!0),legs:f.legs})}Object.keys(c).length>0&&(a[i]=c)}return{providers:o,roles:a}}var{entries:ui,setPrototypeOf:ni,isFrozen:Ld,getPrototypeOf:Od,getOwnPropertyDescriptor:Dd}=Object,{freeze:wt,seal:Lt,create:Vs}=Object,{apply:Ks,construct:Zs}=typeof Reflect<"u"&&Reflect;wt||(wt=function(t){return t});Lt||(Lt=function(t){return t});Ks||(Ks=function(t,r){for(var n=arguments.length,s=new Array(n>2?n-2:0),o=2;o<n;o++)s[o-2]=arguments[o];return t.apply(r,s)});Zs||(Zs=function(t){for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return new t(...n)});var Gn=kt(Array.prototype.forEach),Md=kt(Array.prototype.lastIndexOf),si=kt(Array.prototype.pop),sn=kt(Array.prototype.push),Nd=kt(Array.prototype.splice),Vn=kt(String.prototype.toLowerCase),js=kt(String.prototype.toString),zs=kt(String.prototype.match),on=kt(String.prototype.replace),Pd=kt(String.prototype.indexOf),Fd=kt(String.prototype.trim),Bt=kt(Object.prototype.hasOwnProperty),yt=kt(RegExp.prototype.test),an=qd(TypeError);function kt(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return Ks(e,t,n)}}function qd(e){return function(){for(var t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];return Zs(e,r)}}function Be(e,t){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Vn;ni&&ni(e,null);let n=t.length;for(;n--;){let s=t[n];if(typeof s=="string"){let o=r(s);o!==s&&(Ld(t)||(t[n]=o),s=o)}e[s]=!0}return e}function Bd(e){for(let t=0;t<e.length;t++)Bt(e,t)||(e[t]=null);return e}function nr(e){let t=Vs(null);for(let[r,n]of ui(e))Bt(e,r)&&(Array.isArray(n)?t[r]=Bd(n):n&&typeof n=="object"&&n.constructor===Object?t[r]=nr(n):t[r]=n);return t}function ln(e,t){for(;e!==null;){let n=Dd(e,t);if(n){if(n.get)return kt(n.get);if(typeof n.value=="function")return kt(n.value)}e=Od(e)}function r(){return null}return r}var oi=wt(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Hs=wt(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Ws=wt(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Ud=wt(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Gs=wt(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),jd=wt(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),ai=wt(["#text"]),ii=wt(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),Ys=wt(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),li=wt(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Yn=wt(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),zd=Lt(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Hd=Lt(/<%[\w\W]*|[\w\W]*%>/gm),Wd=Lt(/\$\{[\w\W]*/gm),Gd=Lt(/^data-[\-\w.\u00B7-\uFFFF]+$/),Yd=Lt(/^aria-[\-\w]+$/),pi=Lt(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Vd=Lt(/^(?:\w+script|data):/i),Kd=Lt(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),fi=Lt(/^html$/i),Zd=Lt(/^[a-z][.\w]*(-[.\w]+)+$/i),ci=Object.freeze({__proto__:null,ARIA_ATTR:Yd,ATTR_WHITESPACE:Kd,CUSTOM_ELEMENT:Zd,DATA_ATTR:Gd,DOCTYPE_NAME:fi,ERB_EXPR:Hd,IS_ALLOWED_URI:pi,IS_SCRIPT_OR_DATA:Vd,MUSTACHE_EXPR:zd,TMPLIT_EXPR:Wd}),cn={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},Xd=function(){return typeof window>"u"?null:window},Qd=function(t,r){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let n=null,s="data-tt-policy-suffix";r&&r.hasAttribute(s)&&(n=r.getAttribute(s));let o="dompurify"+(n?"#"+n:"");try{return t.createPolicy(o,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},di=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function _i(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Xd(),t=j=>_i(j);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==cn.document||!e.Element)return t.isSupported=!1,t;let{document:r}=e,n=r,s=n.currentScript,{DocumentFragment:o,HTMLTemplateElement:a,Node:i,Element:c,NodeFilter:u,NamedNodeMap:f=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:_,DOMParser:b,trustedTypes:T}=e,$=c.prototype,E=ln($,"cloneNode"),U=ln($,"remove"),x=ln($,"nextSibling"),V=ln($,"childNodes"),ee=ln($,"parentNode");if(typeof a=="function"){let j=r.createElement("template");j.content&&j.content.ownerDocument&&(r=j.content.ownerDocument)}let O,D="",{implementation:S,createNodeIterator:z,createDocumentFragment:L,getElementsByTagName:pe}=r,{importNode:ve}=n,ae=di();t.isSupported=typeof ui=="function"&&typeof ee=="function"&&S&&S.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:be,ERB_EXPR:Ce,TMPLIT_EXPR:Ge,DATA_ATTR:Xe,ARIA_ATTR:ze,IS_SCRIPT_OR_DATA:Se,ATTR_WHITESPACE:xe,CUSTOM_ELEMENT:_e}=ci,{IS_ALLOWED_URI:ge}=ci,he=null,G=Be({},[...oi,...Hs,...Ws,...Gs,...ai]),K=null,Re=Be({},[...ii,...Ys,...li,...Yn]),me=Object.seal(Vs(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),fe=null,I=null,R=Object.seal(Vs(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),ie=!0,De=!0,Ae=!1,je=!0,Me=!1,Le=!0,Ie=!1,Je=!1,M=!1,H=!1,q=!1,X=!1,ce=!0,w=!1,C="user-content-",W=!0,le=!1,ne={},Oe=null,Ne=Be({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),et=null,Fe=Be({},["audio","video","img","source","image","track"]),ut=null,_t=Be({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),rt="http://www.w3.org/1998/Math/MathML",nt="http://www.w3.org/2000/svg",st="http://www.w3.org/1999/xhtml",at=st,mt=!1,B=null,Y=Be({},[rt,nt,st],js),oe=Be({},["mi","mo","mn","ms","mtext"]),de=Be({},["annotation-xml"]),te=Be({},["title","style","font","a","script"]),Te=null,Ke=["application/xhtml+xml","text/html"],Qe="text/html",$e=null,Ye=null,we=r.createElement("form"),dt=function(g){return g instanceof RegExp||g instanceof Function},bt=function(){let g=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(Ye&&Ye===g)){if((!g||typeof g!="object")&&(g={}),g=nr(g),Te=Ke.indexOf(g.PARSER_MEDIA_TYPE)===-1?Qe:g.PARSER_MEDIA_TYPE,$e=Te==="application/xhtml+xml"?js:Vn,he=Bt(g,"ALLOWED_TAGS")?Be({},g.ALLOWED_TAGS,$e):G,K=Bt(g,"ALLOWED_ATTR")?Be({},g.ALLOWED_ATTR,$e):Re,B=Bt(g,"ALLOWED_NAMESPACES")?Be({},g.ALLOWED_NAMESPACES,js):Y,ut=Bt(g,"ADD_URI_SAFE_ATTR")?Be(nr(_t),g.ADD_URI_SAFE_ATTR,$e):_t,et=Bt(g,"ADD_DATA_URI_TAGS")?Be(nr(Fe),g.ADD_DATA_URI_TAGS,$e):Fe,Oe=Bt(g,"FORBID_CONTENTS")?Be({},g.FORBID_CONTENTS,$e):Ne,fe=Bt(g,"FORBID_TAGS")?Be({},g.FORBID_TAGS,$e):nr({}),I=Bt(g,"FORBID_ATTR")?Be({},g.FORBID_ATTR,$e):nr({}),ne=Bt(g,"USE_PROFILES")?g.USE_PROFILES:!1,ie=g.ALLOW_ARIA_ATTR!==!1,De=g.ALLOW_DATA_ATTR!==!1,Ae=g.ALLOW_UNKNOWN_PROTOCOLS||!1,je=g.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Me=g.SAFE_FOR_TEMPLATES||!1,Le=g.SAFE_FOR_XML!==!1,Ie=g.WHOLE_DOCUMENT||!1,H=g.RETURN_DOM||!1,q=g.RETURN_DOM_FRAGMENT||!1,X=g.RETURN_TRUSTED_TYPE||!1,M=g.FORCE_BODY||!1,ce=g.SANITIZE_DOM!==!1,w=g.SANITIZE_NAMED_PROPS||!1,W=g.KEEP_CONTENT!==!1,le=g.IN_PLACE||!1,ge=g.ALLOWED_URI_REGEXP||pi,at=g.NAMESPACE||st,oe=g.MATHML_TEXT_INTEGRATION_POINTS||oe,de=g.HTML_INTEGRATION_POINTS||de,me=g.CUSTOM_ELEMENT_HANDLING||{},g.CUSTOM_ELEMENT_HANDLING&&dt(g.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(me.tagNameCheck=g.CUSTOM_ELEMENT_HANDLING.tagNameCheck),g.CUSTOM_ELEMENT_HANDLING&&dt(g.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(me.attributeNameCheck=g.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),g.CUSTOM_ELEMENT_HANDLING&&typeof g.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(me.allowCustomizedBuiltInElements=g.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Me&&(De=!1),q&&(H=!0),ne&&(he=Be({},ai),K=[],ne.html===!0&&(Be(he,oi),Be(K,ii)),ne.svg===!0&&(Be(he,Hs),Be(K,Ys),Be(K,Yn)),ne.svgFilters===!0&&(Be(he,Ws),Be(K,Ys),Be(K,Yn)),ne.mathMl===!0&&(Be(he,Gs),Be(K,li),Be(K,Yn))),g.ADD_TAGS&&(typeof g.ADD_TAGS=="function"?R.tagCheck=g.ADD_TAGS:(he===G&&(he=nr(he)),Be(he,g.ADD_TAGS,$e))),g.ADD_ATTR&&(typeof g.ADD_ATTR=="function"?R.attributeCheck=g.ADD_ATTR:(K===Re&&(K=nr(K)),Be(K,g.ADD_ATTR,$e))),g.ADD_URI_SAFE_ATTR&&Be(ut,g.ADD_URI_SAFE_ATTR,$e),g.FORBID_CONTENTS&&(Oe===Ne&&(Oe=nr(Oe)),Be(Oe,g.FORBID_CONTENTS,$e)),W&&(he["#text"]=!0),Ie&&Be(he,["html","head","body"]),he.table&&(Be(he,["tbody"]),delete fe.tbody),g.TRUSTED_TYPES_POLICY){if(typeof g.TRUSTED_TYPES_POLICY.createHTML!="function")throw an('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof g.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw an('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');O=g.TRUSTED_TYPES_POLICY,D=O.createHTML("")}else O===void 0&&(O=Qd(T,s)),O!==null&&typeof D=="string"&&(D=O.createHTML(""));wt&&wt(g),Ye=g}},Zt=Be({},[...Hs,...Ws,...Ud]),zt=Be({},[...Gs,...jd]),Xt=function(g){let A=ee(g);(!A||!A.tagName)&&(A={namespaceURI:at,tagName:"template"});let Z=Vn(g.tagName),ue=Vn(A.tagName);return B[g.namespaceURI]?g.namespaceURI===nt?A.namespaceURI===st?Z==="svg":A.namespaceURI===rt?Z==="svg"&&(ue==="annotation-xml"||oe[ue]):!!Zt[Z]:g.namespaceURI===rt?A.namespaceURI===st?Z==="math":A.namespaceURI===nt?Z==="math"&&de[ue]:!!zt[Z]:g.namespaceURI===st?A.namespaceURI===nt&&!de[ue]||A.namespaceURI===rt&&!oe[ue]?!1:!zt[Z]&&(te[Z]||!Zt[Z]):!!(Te==="application/xhtml+xml"&&B[g.namespaceURI]):!1},gt=function(g){sn(t.removed,{element:g});try{ee(g).removeChild(g)}catch{U(g)}},xt=function(g,A){try{sn(t.removed,{attribute:A.getAttributeNode(g),from:A})}catch{sn(t.removed,{attribute:null,from:A})}if(A.removeAttribute(g),g==="is")if(H||q)try{gt(A)}catch{}else try{A.setAttribute(g,"")}catch{}},Ot=function(g){let A=null,Z=null;if(M)g="<remove></remove>"+g;else{let He=zs(g,/^[\r\n\t ]+/);Z=He&&He[0]}Te==="application/xhtml+xml"&&at===st&&(g='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+g+"</body></html>");let ue=O?O.createHTML(g):g;if(at===st)try{A=new b().parseFromString(ue,Te)}catch{}if(!A||!A.documentElement){A=S.createDocument(at,"template",null);try{A.documentElement.innerHTML=mt?D:ue}catch{}}let Pe=A.body||A.documentElement;return g&&Z&&Pe.insertBefore(r.createTextNode(Z),Pe.childNodes[0]||null),at===st?pe.call(A,Ie?"html":"body")[0]:Ie?A.documentElement:Pe},Dt=function(g){return z.call(g.ownerDocument||g,g,u.SHOW_ELEMENT|u.SHOW_COMMENT|u.SHOW_TEXT|u.SHOW_PROCESSING_INSTRUCTION|u.SHOW_CDATA_SECTION,null)},Mt=function(g){return g instanceof _&&(typeof g.nodeName!="string"||typeof g.textContent!="string"||typeof g.removeChild!="function"||!(g.attributes instanceof f)||typeof g.removeAttribute!="function"||typeof g.setAttribute!="function"||typeof g.namespaceURI!="string"||typeof g.insertBefore!="function"||typeof g.hasChildNodes!="function")},Ht=function(g){return typeof i=="function"&&g instanceof i};function Ee(j,g,A){Gn(j,Z=>{Z.call(t,g,A,Ye)})}let vt=function(g){let A=null;if(Ee(ae.beforeSanitizeElements,g,null),Mt(g))return gt(g),!0;let Z=$e(g.nodeName);if(Ee(ae.uponSanitizeElement,g,{tagName:Z,allowedTags:he}),Le&&g.hasChildNodes()&&!Ht(g.firstElementChild)&&yt(/<[/\w!]/g,g.innerHTML)&&yt(/<[/\w!]/g,g.textContent)||g.nodeType===cn.progressingInstruction||Le&&g.nodeType===cn.comment&&yt(/<[/\w]/g,g.data))return gt(g),!0;if(!(R.tagCheck instanceof Function&&R.tagCheck(Z))&&(!he[Z]||fe[Z])){if(!fe[Z]&&y(Z)&&(me.tagNameCheck instanceof RegExp&&yt(me.tagNameCheck,Z)||me.tagNameCheck instanceof Function&&me.tagNameCheck(Z)))return!1;if(W&&!Oe[Z]){let ue=ee(g)||g.parentNode,Pe=V(g)||g.childNodes;if(Pe&&ue){let He=Pe.length;for(let m=He-1;m>=0;--m){let d=E(Pe[m],!0);d.__removalCount=(g.__removalCount||0)+1,ue.insertBefore(d,x(g))}}}return gt(g),!0}return g instanceof c&&!Xt(g)||(Z==="noscript"||Z==="noembed"||Z==="noframes")&&yt(/<\/no(script|embed|frames)/i,g.innerHTML)?(gt(g),!0):(Me&&g.nodeType===cn.text&&(A=g.textContent,Gn([be,Ce,Ge],ue=>{A=on(A,ue," ")}),g.textContent!==A&&(sn(t.removed,{element:g.cloneNode()}),g.textContent=A)),Ee(ae.afterSanitizeElements,g,null),!1)},p=function(g,A,Z){if(ce&&(A==="id"||A==="name")&&(Z in r||Z in we))return!1;if(!(De&&!I[A]&&yt(Xe,A))){if(!(ie&&yt(ze,A))){if(!(R.attributeCheck instanceof Function&&R.attributeCheck(A,g))){if(!K[A]||I[A]){if(!(y(g)&&(me.tagNameCheck instanceof RegExp&&yt(me.tagNameCheck,g)||me.tagNameCheck instanceof Function&&me.tagNameCheck(g))&&(me.attributeNameCheck instanceof RegExp&&yt(me.attributeNameCheck,A)||me.attributeNameCheck instanceof Function&&me.attributeNameCheck(A,g))||A==="is"&&me.allowCustomizedBuiltInElements&&(me.tagNameCheck instanceof RegExp&&yt(me.tagNameCheck,Z)||me.tagNameCheck instanceof Function&&me.tagNameCheck(Z))))return!1}else if(!ut[A]){if(!yt(ge,on(Z,xe,""))){if(!((A==="src"||A==="xlink:href"||A==="href")&&g!=="script"&&Pd(Z,"data:")===0&&et[g])){if(!(Ae&&!yt(Se,on(Z,xe,"")))){if(Z)return!1}}}}}}}return!0},y=function(g){return g!=="annotation-xml"&&zs(g,_e)},N=function(g){Ee(ae.beforeSanitizeAttributes,g,null);let{attributes:A}=g;if(!A||Mt(g))return;let Z={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:K,forceKeepAttr:void 0},ue=A.length;for(;ue--;){let Pe=A[ue],{name:He,namespaceURI:m,value:d}=Pe,k=$e(He),v=d,F=He==="value"?v:Fd(v);if(Z.attrName=k,Z.attrValue=F,Z.keepAttr=!0,Z.forceKeepAttr=void 0,Ee(ae.uponSanitizeAttribute,g,Z),F=Z.attrValue,w&&(k==="id"||k==="name")&&(xt(He,g),F=C+F),Le&&yt(/((--!?|])>)|<\/(style|title|textarea)/i,F)){xt(He,g);continue}if(k==="attributename"&&zs(F,"href")){xt(He,g);continue}if(Z.forceKeepAttr)continue;if(!Z.keepAttr){xt(He,g);continue}if(!je&&yt(/\/>/i,F)){xt(He,g);continue}Me&&Gn([be,Ce,Ge],ye=>{F=on(F,ye," ")});let J=$e(g.nodeName);if(!p(J,k,F)){xt(He,g);continue}if(O&&typeof T=="object"&&typeof T.getAttributeType=="function"&&!m)switch(T.getAttributeType(J,k)){case"TrustedHTML":{F=O.createHTML(F);break}case"TrustedScriptURL":{F=O.createScriptURL(F);break}}if(F!==v)try{m?g.setAttributeNS(m,He,F):g.setAttribute(He,F),Mt(g)?gt(g):si(t.removed)}catch{xt(He,g)}}Ee(ae.afterSanitizeAttributes,g,null)},se=function j(g){let A=null,Z=Dt(g);for(Ee(ae.beforeSanitizeShadowDOM,g,null);A=Z.nextNode();)Ee(ae.uponSanitizeShadowNode,A,null),vt(A),N(A),A.content instanceof o&&j(A.content);Ee(ae.afterSanitizeShadowDOM,g,null)};return t.sanitize=function(j){let g=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},A=null,Z=null,ue=null,Pe=null;if(mt=!j,mt&&(j="<!-->"),typeof j!="string"&&!Ht(j))if(typeof j.toString=="function"){if(j=j.toString(),typeof j!="string")throw an("dirty is not a string, aborting")}else throw an("toString is not a function");if(!t.isSupported)return j;if(Je||bt(g),t.removed=[],typeof j=="string"&&(le=!1),le){if(j.nodeName){let d=$e(j.nodeName);if(!he[d]||fe[d])throw an("root node is forbidden and cannot be sanitized in-place")}}else if(j instanceof i)A=Ot("<!---->"),Z=A.ownerDocument.importNode(j,!0),Z.nodeType===cn.element&&Z.nodeName==="BODY"||Z.nodeName==="HTML"?A=Z:A.appendChild(Z);else{if(!H&&!Me&&!Ie&&j.indexOf("<")===-1)return O&&X?O.createHTML(j):j;if(A=Ot(j),!A)return H?null:X?D:""}A&&M&&gt(A.firstChild);let He=Dt(le?j:A);for(;ue=He.nextNode();)vt(ue),N(ue),ue.content instanceof o&&se(ue.content);if(le)return j;if(H){if(q)for(Pe=L.call(A.ownerDocument);A.firstChild;)Pe.appendChild(A.firstChild);else Pe=A;return(K.shadowroot||K.shadowrootmode)&&(Pe=ve.call(n,Pe,!0)),Pe}let m=Ie?A.outerHTML:A.innerHTML;return Ie&&he["!doctype"]&&A.ownerDocument&&A.ownerDocument.doctype&&A.ownerDocument.doctype.name&&yt(fi,A.ownerDocument.doctype.name)&&(m="<!DOCTYPE "+A.ownerDocument.doctype.name+`>
`+m),Me&&Gn([be,Ce,Ge],d=>{m=on(m,d," ")}),O&&X?O.createHTML(m):m},t.setConfig=function(){let j=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};bt(j),Je=!0},t.clearConfig=function(){Ye=null,Je=!1},t.isValidAttribute=function(j,g,A){Ye||bt({});let Z=$e(j),ue=$e(g);return p(Z,ue,A)},t.addHook=function(j,g){typeof g=="function"&&sn(ae[j],g)},t.removeHook=function(j,g){if(g!==void 0){let A=Md(ae[j],g);return A===-1?void 0:Nd(ae[j],A,1)[0]}return si(ae[j])},t.removeHooks=function(j){ae[j]=[]},t.removeAllHooks=function(){ae=di()},t}var mi=_i();var gi={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},hi=e=>(...t)=>({_$litDirective$:e,values:t}),Kn=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,r,n){this._$Ct=t,this._$AM=r,this._$Ci=n}_$AS(t,r){return this.update(t,r)}update(t,r){return this.render(...r)}};var dn=class extends Kn{constructor(t){if(super(t),this.it=ct,t.type!==gi.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===ct||t==null)return this._t=void 0,this.it=t;if(t===$r)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let r=[t];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}};dn.directiveName="unsafeHTML",dn.resultType=1;var bi=hi(dn);function eo(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Cr=eo();function Si(e){Cr=e}var _n={exec:()=>null};function We(e,t=""){let r=typeof e=="string"?e:e.source,n={replace:(s,o)=>{let a=typeof o=="string"?o:o.source;return a=a.replace($t.caret,"$1"),r=r.replace(s,a),n},getRegex:()=>new RegExp(r,t)};return n}var Jd=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),$t={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},eu=/^(?:[ \t]*(?:\n|$))+/,tu=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,ru=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,mn=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,nu=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,to=/(?:[*+-]|\d{1,9}[.)])/,Ai=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Ti=We(Ai).replace(/bull/g,to).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),su=We(Ai).replace(/bull/g,to).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),ro=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,ou=/^[^\n]+/,no=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,au=We(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",no).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),iu=We(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,to).getRegex(),ts="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",so=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,lu=We("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",so).replace("tag",ts).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Ei=We(ro).replace("hr",mn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",ts).getRegex(),cu=We(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Ei).getRegex(),oo={blockquote:cu,code:tu,def:au,fences:ru,heading:nu,hr:mn,html:lu,lheading:Ti,list:iu,newline:eu,paragraph:Ei,table:_n,text:ou},vi=We("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",mn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",ts).getRegex(),du={...oo,lheading:su,table:vi,paragraph:We(ro).replace("hr",mn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",vi).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",ts).getRegex()},uu={...oo,html:We(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",so).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:_n,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:We(ro).replace("hr",mn).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Ti).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},pu=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,fu=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Ci=/^( {2,}|\\)\n(?!\s*$)/,_u=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,rs=/[\p{P}\p{S}]/u,ao=/[\s\p{P}\p{S}]/u,Ri=/[^\s\p{P}\p{S}]/u,mu=We(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,ao).getRegex(),Ii=/(?!~)[\p{P}\p{S}]/u,gu=/(?!~)[\s\p{P}\p{S}]/u,hu=/(?:[^\s\p{P}\p{S}]|~)/u,bu=We(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",Jd?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),Li=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,vu=We(Li,"u").replace(/punct/g,rs).getRegex(),yu=We(Li,"u").replace(/punct/g,Ii).getRegex(),Oi="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",wu=We(Oi,"gu").replace(/notPunctSpace/g,Ri).replace(/punctSpace/g,ao).replace(/punct/g,rs).getRegex(),ku=We(Oi,"gu").replace(/notPunctSpace/g,hu).replace(/punctSpace/g,gu).replace(/punct/g,Ii).getRegex(),$u=We("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,Ri).replace(/punctSpace/g,ao).replace(/punct/g,rs).getRegex(),xu=We(/\\(punct)/,"gu").replace(/punct/g,rs).getRegex(),Su=We(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Au=We(so).replace("(?:-->|$)","-->").getRegex(),Tu=We("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Au).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Qn=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,Eu=We(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Qn).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Di=We(/^!?\[(label)\]\[(ref)\]/).replace("label",Qn).replace("ref",no).getRegex(),Mi=We(/^!?\[(ref)\](?:\[\])?/).replace("ref",no).getRegex(),Cu=We("reflink|nolink(?!\\()","g").replace("reflink",Di).replace("nolink",Mi).getRegex(),yi=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,io={_backpedal:_n,anyPunctuation:xu,autolink:Su,blockSkip:bu,br:Ci,code:fu,del:_n,emStrongLDelim:vu,emStrongRDelimAst:wu,emStrongRDelimUnd:$u,escape:pu,link:Eu,nolink:Mi,punctuation:mu,reflink:Di,reflinkSearch:Cu,tag:Tu,text:_u,url:_n},Ru={...io,link:We(/^!?\[(label)\]\((.*?)\)/).replace("label",Qn).getRegex(),reflink:We(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Qn).getRegex()},Xs={...io,emStrongRDelimAst:ku,emStrongLDelim:yu,url:We(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",yi).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:We(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",yi).getRegex()},Iu={...Xs,br:We(Ci).replace("{2,}","*").getRegex(),text:We(Xs.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Zn={normal:oo,gfm:du,pedantic:uu},un={normal:io,gfm:Xs,breaks:Iu,pedantic:Ru},Lu={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},wi=e=>Lu[e];function sr(e,t){if(t){if($t.escapeTest.test(e))return e.replace($t.escapeReplace,wi)}else if($t.escapeTestNoEncode.test(e))return e.replace($t.escapeReplaceNoEncode,wi);return e}function ki(e){try{e=encodeURI(e).replace($t.percentDecode,"%")}catch{return null}return e}function $i(e,t){let r=e.replace($t.findPipe,(o,a,i)=>{let c=!1,u=a;for(;--u>=0&&i[u]==="\\";)c=!c;return c?"|":" |"}),n=r.split($t.splitPipe),s=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),t)if(n.length>t)n.splice(t);else for(;n.length<t;)n.push("");for(;s<n.length;s++)n[s]=n[s].trim().replace($t.slashPipe,"|");return n}function pn(e,t,r){let n=e.length;if(n===0)return"";let s=0;for(;s<n;){let o=e.charAt(n-s-1);if(o===t&&!r)s++;else if(o!==t&&r)s++;else break}return e.slice(0,n-s)}function Ou(e,t){if(e.indexOf(t[1])===-1)return-1;let r=0;for(let n=0;n<e.length;n++)if(e[n]==="\\")n++;else if(e[n]===t[0])r++;else if(e[n]===t[1]&&(r--,r<0))return n;return r>0?-2:-1}function xi(e,t,r,n,s){let o=t.href,a=t.title||null,i=e[1].replace(s.other.outputLinkReplace,"$1");n.state.inLink=!0;let c={type:e[0].charAt(0)==="!"?"image":"link",raw:r,href:o,title:a,text:i,tokens:n.inlineTokens(i)};return n.state.inLink=!1,c}function Du(e,t,r){let n=e.match(r.other.indentCodeCompensation);if(n===null)return t;let s=n[1];return t.split(`
`).map(o=>{let a=o.match(r.other.beginningSpace);if(a===null)return o;let[i]=a;return i.length>=s.length?o.slice(s.length):o}).join(`
`)}var Jn=class{constructor(e){tt(this,"options");tt(this,"rules");tt(this,"lexer");this.options=e||Cr}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let r=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?r:pn(r,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let r=t[0],n=Du(r,t[3]||"",this.rules);return{type:"code",raw:r,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:n}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let r=t[2].trim();if(this.rules.other.endingHash.test(r)){let n=pn(r,"#");(this.options.pedantic||!n||this.rules.other.endingSpaceChar.test(n))&&(r=n.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:pn(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let r=pn(t[0],`
`).split(`
`),n="",s="",o=[];for(;r.length>0;){let a=!1,i=[],c;for(c=0;c<r.length;c++)if(this.rules.other.blockquoteStart.test(r[c]))i.push(r[c]),a=!0;else if(!a)i.push(r[c]);else break;r=r.slice(c);let u=i.join(`
`),f=u.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");n=n?`${n}
${u}`:u,s=s?`${s}
${f}`:f;let _=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(f,o,!0),this.lexer.state.top=_,r.length===0)break;let b=o.at(-1);if(b?.type==="code")break;if(b?.type==="blockquote"){let T=b,$=T.raw+`
`+r.join(`
`),E=this.blockquote($);o[o.length-1]=E,n=n.substring(0,n.length-T.raw.length)+E.raw,s=s.substring(0,s.length-T.text.length)+E.text;break}else if(b?.type==="list"){let T=b,$=T.raw+`
`+r.join(`
`),E=this.list($);o[o.length-1]=E,n=n.substring(0,n.length-b.raw.length)+E.raw,s=s.substring(0,s.length-T.raw.length)+E.raw,r=$.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:n,tokens:o,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let r=t[1].trim(),n=r.length>1,s={type:"list",raw:"",ordered:n,start:n?+r.slice(0,-1):"",loose:!1,items:[]};r=n?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=n?r:"[*+-]");let o=this.rules.other.listItemRegex(r),a=!1;for(;e;){let c=!1,u="",f="";if(!(t=o.exec(e))||this.rules.block.hr.test(e))break;u=t[0],e=e.substring(u.length);let _=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,E=>" ".repeat(3*E.length)),b=e.split(`
`,1)[0],T=!_.trim(),$=0;if(this.options.pedantic?($=2,f=_.trimStart()):T?$=t[1].length+1:($=t[2].search(this.rules.other.nonSpaceChar),$=$>4?1:$,f=_.slice($),$+=t[1].length),T&&this.rules.other.blankLine.test(b)&&(u+=b+`
`,e=e.substring(b.length+1),c=!0),!c){let E=this.rules.other.nextBulletRegex($),U=this.rules.other.hrRegex($),x=this.rules.other.fencesBeginRegex($),V=this.rules.other.headingBeginRegex($),ee=this.rules.other.htmlBeginRegex($);for(;e;){let O=e.split(`
`,1)[0],D;if(b=O,this.options.pedantic?(b=b.replace(this.rules.other.listReplaceNesting,"  "),D=b):D=b.replace(this.rules.other.tabCharGlobal,"    "),x.test(b)||V.test(b)||ee.test(b)||E.test(b)||U.test(b))break;if(D.search(this.rules.other.nonSpaceChar)>=$||!b.trim())f+=`
`+D.slice($);else{if(T||_.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||x.test(_)||V.test(_)||U.test(_))break;f+=`
`+b}!T&&!b.trim()&&(T=!0),u+=O+`
`,e=e.substring(O.length+1),_=D.slice($)}}s.loose||(a?s.loose=!0:this.rules.other.doubleBlankLine.test(u)&&(a=!0)),s.items.push({type:"list_item",raw:u,task:!!this.options.gfm&&this.rules.other.listIsTask.test(f),loose:!1,text:f,tokens:[]}),s.raw+=u}let i=s.items.at(-1);if(i)i.raw=i.raw.trimEnd(),i.text=i.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let c of s.items){if(this.lexer.state.top=!1,c.tokens=this.lexer.blockTokens(c.text,[]),c.task){if(c.text=c.text.replace(this.rules.other.listReplaceTask,""),c.tokens[0]?.type==="text"||c.tokens[0]?.type==="paragraph"){c.tokens[0].raw=c.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),c.tokens[0].text=c.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let f=this.lexer.inlineQueue.length-1;f>=0;f--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[f].src)){this.lexer.inlineQueue[f].src=this.lexer.inlineQueue[f].src.replace(this.rules.other.listReplaceTask,"");break}}let u=this.rules.other.listTaskCheckbox.exec(c.raw);if(u){let f={type:"checkbox",raw:u[0]+" ",checked:u[0]!=="[ ]"};c.checked=f.checked,s.loose?c.tokens[0]&&["paragraph","text"].includes(c.tokens[0].type)&&"tokens"in c.tokens[0]&&c.tokens[0].tokens?(c.tokens[0].raw=f.raw+c.tokens[0].raw,c.tokens[0].text=f.raw+c.tokens[0].text,c.tokens[0].tokens.unshift(f)):c.tokens.unshift({type:"paragraph",raw:f.raw,text:f.raw,tokens:[f]}):c.tokens.unshift(f)}}if(!s.loose){let u=c.tokens.filter(_=>_.type==="space"),f=u.length>0&&u.some(_=>this.rules.other.anyLine.test(_.raw));s.loose=f}}if(s.loose)for(let c of s.items){c.loose=!0;for(let u of c.tokens)u.type==="text"&&(u.type="paragraph")}return s}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let r=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),n=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:r,raw:t[0],href:n,title:s}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let r=$i(t[1]),n=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(r.length===n.length){for(let a of n)this.rules.other.tableAlignRight.test(a)?o.align.push("right"):this.rules.other.tableAlignCenter.test(a)?o.align.push("center"):this.rules.other.tableAlignLeft.test(a)?o.align.push("left"):o.align.push(null);for(let a=0;a<r.length;a++)o.header.push({text:r[a],tokens:this.lexer.inline(r[a]),header:!0,align:o.align[a]});for(let a of s)o.rows.push($i(a,o.header.length).map((i,c)=>({text:i,tokens:this.lexer.inline(i),header:!1,align:o.align[c]})));return o}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let r=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:r,tokens:this.lexer.inline(r)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let r=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;let o=pn(r.slice(0,-1),"\\");if((r.length-o.length)%2===0)return}else{let o=Ou(t[2],"()");if(o===-2)return;if(o>-1){let a=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,a).trim(),t[3]=""}}let n=t[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(n);o&&(n=o[1],s=o[3])}else s=t[3]?t[3].slice(1,-1):"";return n=n.trim(),this.rules.other.startAngleBracket.test(n)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?n=n.slice(1):n=n.slice(1,-1)),xi(t,{href:n&&n.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let r;if((r=this.rules.inline.reflink.exec(e))||(r=this.rules.inline.nolink.exec(e))){let n=(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[n.toLowerCase()];if(!s){let o=r[0].charAt(0);return{type:"text",raw:o,text:o}}return xi(r,s,r[0],this.lexer,this.rules)}}emStrong(e,t,r=""){let n=this.rules.inline.emStrongLDelim.exec(e);if(!(!n||n[3]&&r.match(this.rules.other.unicodeAlphaNumeric))&&(!(n[1]||n[2])||!r||this.rules.inline.punctuation.exec(r))){let s=[...n[0]].length-1,o,a,i=s,c=0,u=n[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(u.lastIndex=0,t=t.slice(-1*e.length+s);(n=u.exec(t))!=null;){if(o=n[1]||n[2]||n[3]||n[4]||n[5]||n[6],!o)continue;if(a=[...o].length,n[3]||n[4]){i+=a;continue}else if((n[5]||n[6])&&s%3&&!((s+a)%3)){c+=a;continue}if(i-=a,i>0)continue;a=Math.min(a,a+i+c);let f=[...n[0]][0].length,_=e.slice(0,s+n.index+f+a);if(Math.min(s,a)%2){let T=_.slice(1,-1);return{type:"em",raw:_,text:T,tokens:this.lexer.inlineTokens(T)}}let b=_.slice(2,-2);return{type:"strong",raw:_,text:b,tokens:this.lexer.inlineTokens(b)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let r=t[2].replace(this.rules.other.newLineCharGlobal," "),n=this.rules.other.nonSpaceChar.test(r),s=this.rules.other.startingSpaceChar.test(r)&&this.rules.other.endingSpaceChar.test(r);return n&&s&&(r=r.substring(1,r.length-1)),{type:"codespan",raw:t[0],text:r}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let r,n;return t[2]==="@"?(r=t[1],n="mailto:"+r):(r=t[1],n=r),{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let r,n;if(t[2]==="@")r=t[0],n="mailto:"+r;else{let s;do s=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(s!==t[0]);r=t[0],t[1]==="www."?n="http://"+t[0]:n=t[0]}return{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let r=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:r}}}},Ut=class Qs{constructor(t){tt(this,"tokens");tt(this,"options");tt(this,"state");tt(this,"inlineQueue");tt(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||Cr,this.options.tokenizer=this.options.tokenizer||new Jn,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let r={other:$t,block:Zn.normal,inline:un.normal};this.options.pedantic?(r.block=Zn.pedantic,r.inline=un.pedantic):this.options.gfm&&(r.block=Zn.gfm,this.options.breaks?r.inline=un.breaks:r.inline=un.gfm),this.tokenizer.rules=r}static get rules(){return{block:Zn,inline:un}}static lex(t,r){return new Qs(r).lex(t)}static lexInline(t,r){return new Qs(r).inlineTokens(t)}lex(t){t=t.replace($t.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let r=0;r<this.inlineQueue.length;r++){let n=this.inlineQueue[r];this.inlineTokens(n.src,n.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,r=[],n=!1){for(this.options.pedantic&&(t=t.replace($t.tabCharGlobal,"    ").replace($t.spaceLine,""));t;){let s;if(this.options.extensions?.block?.some(a=>(s=a.call({lexer:this},t,r))?(t=t.substring(s.raw.length),r.push(s),!0):!1))continue;if(s=this.tokenizer.space(t)){t=t.substring(s.raw.length);let a=r.at(-1);s.raw.length===1&&a!==void 0?a.raw+=`
`:r.push(s);continue}if(s=this.tokenizer.code(t)){t=t.substring(s.raw.length);let a=r.at(-1);a?.type==="paragraph"||a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.at(-1).src=a.text):r.push(s);continue}if(s=this.tokenizer.fences(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.heading(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.hr(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.blockquote(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.list(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.html(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.def(t)){t=t.substring(s.raw.length);let a=r.at(-1);a?.type==="paragraph"||a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.raw,this.inlineQueue.at(-1).src=a.text):this.tokens.links[s.tag]||(this.tokens.links[s.tag]={href:s.href,title:s.title},r.push(s));continue}if(s=this.tokenizer.table(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.lheading(t)){t=t.substring(s.raw.length),r.push(s);continue}let o=t;if(this.options.extensions?.startBlock){let a=1/0,i=t.slice(1),c;this.options.extensions.startBlock.forEach(u=>{c=u.call({lexer:this},i),typeof c=="number"&&c>=0&&(a=Math.min(a,c))}),a<1/0&&a>=0&&(o=t.substring(0,a+1))}if(this.state.top&&(s=this.tokenizer.paragraph(o))){let a=r.at(-1);n&&a?.type==="paragraph"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):r.push(s),n=o.length!==t.length,t=t.substring(s.raw.length);continue}if(s=this.tokenizer.text(t)){t=t.substring(s.raw.length);let a=r.at(-1);a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):r.push(s);continue}if(t){let a="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(a);break}else throw new Error(a)}}return this.state.top=!0,r}inline(t,r=[]){return this.inlineQueue.push({src:t,tokens:r}),r}inlineTokens(t,r=[]){let n=t,s=null;if(this.tokens.links){let c=Object.keys(this.tokens.links);if(c.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(n))!=null;)c.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(n=n.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(n))!=null;)n=n.slice(0,s.index)+"++"+n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(n))!=null;)o=s[2]?s[2].length:0,n=n.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let a=!1,i="";for(;t;){a||(i=""),a=!1;let c;if(this.options.extensions?.inline?.some(f=>(c=f.call({lexer:this},t,r))?(t=t.substring(c.raw.length),r.push(c),!0):!1))continue;if(c=this.tokenizer.escape(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.tag(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.link(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(c.raw.length);let f=r.at(-1);c.type==="text"&&f?.type==="text"?(f.raw+=c.raw,f.text+=c.text):r.push(c);continue}if(c=this.tokenizer.emStrong(t,n,i)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.codespan(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.br(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.del(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.autolink(t)){t=t.substring(c.raw.length),r.push(c);continue}if(!this.state.inLink&&(c=this.tokenizer.url(t))){t=t.substring(c.raw.length),r.push(c);continue}let u=t;if(this.options.extensions?.startInline){let f=1/0,_=t.slice(1),b;this.options.extensions.startInline.forEach(T=>{b=T.call({lexer:this},_),typeof b=="number"&&b>=0&&(f=Math.min(f,b))}),f<1/0&&f>=0&&(u=t.substring(0,f+1))}if(c=this.tokenizer.inlineText(u)){t=t.substring(c.raw.length),c.raw.slice(-1)!=="_"&&(i=c.raw.slice(-1)),a=!0;let f=r.at(-1);f?.type==="text"?(f.raw+=c.raw,f.text+=c.text):r.push(c);continue}if(t){let f="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(f);break}else throw new Error(f)}}return r}},es=class{constructor(e){tt(this,"options");tt(this,"parser");this.options=e||Cr}space(e){return""}code({text:e,lang:t,escaped:r}){let n=(t||"").match($t.notSpaceStart)?.[0],s=e.replace($t.endingNewline,"")+`
`;return n?'<pre><code class="language-'+sr(n)+'">'+(r?s:sr(s,!0))+`</code></pre>
`:"<pre><code>"+(r?s:sr(s,!0))+`</code></pre>
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${sr(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:r}){let n=this.parser.parseInline(r),s=ki(e);if(s===null)return n;e=s;let o='<a href="'+e+'"';return t&&(o+=' title="'+sr(t)+'"'),o+=">"+n+"</a>",o}image({href:e,title:t,text:r,tokens:n}){n&&(r=this.parser.parseInline(n,this.parser.textRenderer));let s=ki(e);if(s===null)return sr(r);e=s;let o=`<img src="${e}" alt="${r}"`;return t&&(o+=` title="${sr(t)}"`),o+=">",o}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:sr(e.text)}},lo=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},jt=class Js{constructor(t){tt(this,"options");tt(this,"renderer");tt(this,"textRenderer");this.options=t||Cr,this.options.renderer=this.options.renderer||new es,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new lo}static parse(t,r){return new Js(r).parse(t)}static parseInline(t,r){return new Js(r).parseInline(t)}parse(t){let r="";for(let n=0;n<t.length;n++){let s=t[n];if(this.options.extensions?.renderers?.[s.type]){let a=s,i=this.options.extensions.renderers[a.type].call({parser:this},a);if(i!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(a.type)){r+=i||"";continue}}let o=s;switch(o.type){case"space":{r+=this.renderer.space(o);break}case"hr":{r+=this.renderer.hr(o);break}case"heading":{r+=this.renderer.heading(o);break}case"code":{r+=this.renderer.code(o);break}case"table":{r+=this.renderer.table(o);break}case"blockquote":{r+=this.renderer.blockquote(o);break}case"list":{r+=this.renderer.list(o);break}case"checkbox":{r+=this.renderer.checkbox(o);break}case"html":{r+=this.renderer.html(o);break}case"def":{r+=this.renderer.def(o);break}case"paragraph":{r+=this.renderer.paragraph(o);break}case"text":{r+=this.renderer.text(o);break}default:{let a='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return r}parseInline(t,r=this.renderer){let n="";for(let s=0;s<t.length;s++){let o=t[s];if(this.options.extensions?.renderers?.[o.type]){let i=this.options.extensions.renderers[o.type].call({parser:this},o);if(i!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){n+=i||"";continue}}let a=o;switch(a.type){case"escape":{n+=r.text(a);break}case"html":{n+=r.html(a);break}case"link":{n+=r.link(a);break}case"image":{n+=r.image(a);break}case"checkbox":{n+=r.checkbox(a);break}case"strong":{n+=r.strong(a);break}case"em":{n+=r.em(a);break}case"codespan":{n+=r.codespan(a);break}case"br":{n+=r.br(a);break}case"del":{n+=r.del(a);break}case"text":{n+=r.text(a);break}default:{let i='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return n}},Xn,fn=(Xn=class{constructor(e){tt(this,"options");tt(this,"block");this.options=e||Cr}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?Ut.lex:Ut.lexInline}provideParser(){return this.block?jt.parse:jt.parseInline}},tt(Xn,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),tt(Xn,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),Xn),Mu=class{constructor(...e){tt(this,"defaults",eo());tt(this,"options",this.setOptions);tt(this,"parse",this.parseMarkdown(!0));tt(this,"parseInline",this.parseMarkdown(!1));tt(this,"Parser",jt);tt(this,"Renderer",es);tt(this,"TextRenderer",lo);tt(this,"Lexer",Ut);tt(this,"Tokenizer",Jn);tt(this,"Hooks",fn);this.use(...e)}walkTokens(e,t){let r=[];for(let n of e)switch(r=r.concat(t.call(this,n)),n.type){case"table":{let s=n;for(let o of s.header)r=r.concat(this.walkTokens(o.tokens,t));for(let o of s.rows)for(let a of o)r=r.concat(this.walkTokens(a.tokens,t));break}case"list":{let s=n;r=r.concat(this.walkTokens(s.items,t));break}default:{let s=n;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let a=s[o].flat(1/0);r=r.concat(this.walkTokens(a,t))}):s.tokens&&(r=r.concat(this.walkTokens(s.tokens,t)))}}return r}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(r=>{let n={...r};if(n.async=this.defaults.async||n.async||!1,r.extensions&&(r.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=t.renderers[s.name];o?t.renderers[s.name]=function(...a){let i=s.renderer.apply(this,a);return i===!1&&(i=o.apply(this,a)),i}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=t[s.level];o?o.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),n.extensions=t),r.renderer){let s=this.defaults.renderer||new es(this.defaults);for(let o in r.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let a=o,i=r.renderer[a],c=s[a];s[a]=(...u)=>{let f=i.apply(s,u);return f===!1&&(f=c.apply(s,u)),f||""}}n.renderer=s}if(r.tokenizer){let s=this.defaults.tokenizer||new Jn(this.defaults);for(let o in r.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let a=o,i=r.tokenizer[a],c=s[a];s[a]=(...u)=>{let f=i.apply(s,u);return f===!1&&(f=c.apply(s,u)),f}}n.tokenizer=s}if(r.hooks){let s=this.defaults.hooks||new fn;for(let o in r.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let a=o,i=r.hooks[a],c=s[a];fn.passThroughHooks.has(o)?s[a]=u=>{if(this.defaults.async&&fn.passThroughHooksRespectAsync.has(o))return(async()=>{let _=await i.call(s,u);return c.call(s,_)})();let f=i.call(s,u);return c.call(s,f)}:s[a]=(...u)=>{if(this.defaults.async)return(async()=>{let _=await i.apply(s,u);return _===!1&&(_=await c.apply(s,u)),_})();let f=i.apply(s,u);return f===!1&&(f=c.apply(s,u)),f}}n.hooks=s}if(r.walkTokens){let s=this.defaults.walkTokens,o=r.walkTokens;n.walkTokens=function(a){let i=[];return i.push(o.call(this,a)),s&&(i=i.concat(s.call(this,a))),i}}this.defaults={...this.defaults,...n}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Ut.lex(e,t??this.defaults)}parser(e,t){return jt.parse(e,t??this.defaults)}parseMarkdown(e){return(t,r)=>{let n={...r},s={...this.defaults,...n},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&n.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=e),s.async)return(async()=>{let a=s.hooks?await s.hooks.preprocess(t):t,i=await(s.hooks?await s.hooks.provideLexer():e?Ut.lex:Ut.lexInline)(a,s),c=s.hooks?await s.hooks.processAllTokens(i):i;s.walkTokens&&await Promise.all(this.walkTokens(c,s.walkTokens));let u=await(s.hooks?await s.hooks.provideParser():e?jt.parse:jt.parseInline)(c,s);return s.hooks?await s.hooks.postprocess(u):u})().catch(o);try{s.hooks&&(t=s.hooks.preprocess(t));let a=(s.hooks?s.hooks.provideLexer():e?Ut.lex:Ut.lexInline)(t,s);s.hooks&&(a=s.hooks.processAllTokens(a)),s.walkTokens&&this.walkTokens(a,s.walkTokens);let i=(s.hooks?s.hooks.provideParser():e?jt.parse:jt.parseInline)(a,s);return s.hooks&&(i=s.hooks.postprocess(i)),i}catch(a){return o(a)}}}onError(e,t){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let n="<p>An error occurred:</p><pre>"+sr(r.message+"",!0)+"</pre>";return t?Promise.resolve(n):n}if(t)return Promise.reject(r);throw r}}},Er=new Mu;function Ze(e,t){return Er.parse(e,t)}Ze.options=Ze.setOptions=function(e){return Er.setOptions(e),Ze.defaults=Er.defaults,Si(Ze.defaults),Ze};Ze.getDefaults=eo;Ze.defaults=Cr;Ze.use=function(...e){return Er.use(...e),Ze.defaults=Er.defaults,Si(Ze.defaults),Ze};Ze.walkTokens=function(e,t){return Er.walkTokens(e,t)};Ze.parseInline=Er.parseInline;Ze.Parser=jt;Ze.parser=jt.parse;Ze.Renderer=es;Ze.TextRenderer=lo;Ze.Lexer=Ut;Ze.lexer=Ut.lex;Ze.Tokenizer=Jn;Ze.Hooks=fn;Ze.parse=Ze;var Sm=Ze.options,Am=Ze.setOptions,Tm=Ze.use,Em=Ze.walkTokens,Cm=Ze.parseInline;var Rm=jt.parse,Im=Ut.lex;function _r(e){let t=Ze.parse(e),r=mi.sanitize(t);return bi(r)}function or(e,t){return l`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function zr(e){return e.loading?l`<div class="prompt-block__status">불러오는 중…</div>`:e.error?l`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function ns(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=n=>String(n).padStart(2,"0");return`${t.getFullYear()}-${r(t.getMonth()+1)}-${r(t.getDate())} ${r(t.getHours())}:${r(t.getMinutes())}`}var Nu={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},Pu=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,Fu=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function mr(e){return!!e&&typeof e=="object"}function co(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function Ni(e,t){let r=co(e),n=co(t),s=new Map;for(let i of r)s.set(i,(s.get(i)||0)+1);let o=0;for(let i of n){let c=s.get(i)||0;c>0?s.set(i,c-1):o+=1}let a=0;for(let i of s.values())a+=i;return{added:o,removed:a}}function qu(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(s=>mr(s)&&typeof s.text=="string"?s.text:"").join(""):mr(e)&&typeof e.text=="string"&&(t=e.text);let n=(String(t).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return n.length>120?`${n.slice(0,117)}\u2026`:n}function Bu(e){let t=String(e.name||""),r=e.input||{},n={kind:"tool",tool:t,icon:Nu[t]||"\u{1F527}",input:r,expandable:!0};if((t==="Read"||t==="Write")&&(n.path=String(r.file_path||r.path||"")),t==="Write"&&(n.added=co(r.content).length),t==="Edit"){n.path=String(r.file_path||r.path||"");let{added:s,removed:o}=Ni(r.old_string,r.new_string);n.added=s,n.removed=o}if(t==="MultiEdit"){n.path=String(r.file_path||r.path||"");let s=0,o=0,a=Array.isArray(r.edits)?r.edits:[];for(let i of a){let c=Ni(mr(i)?i.old_string:"",mr(i)?i.new_string:"");s+=c.added,o+=c.removed}n.added=s,n.removed=o}return t==="Bash"&&(n.command=String(r.command||"")),(t==="Grep"||t==="Glob")&&(n.command=String(r.pattern||r.query||"")),n}function Pi(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}function Fi(e){let t=e.split(/\r?\n/).find(n=>n.trim().length>0)||"",r=Pu.exec(t);return r?{kind:"gate",gate:r[2]==="implementation"?"impl":r[2],reviewer:r[3],verdict:r[4],time:r[5]?r[5].trim():void 0,text:t.trim()}:Fu.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function Uu(e,t){if(e.type==="assistant"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[],s=[];for(let o of n)if(mr(o)){if(o.type==="text"&&typeof o.text=="string")s.push(Fi(o.text));else if(o.type==="thinking"){let a=Pi(o.thinking);a&&s.push(a)}else if(o.type==="tool_use"){let a=Bu(o);typeof o.id=="string"&&t.set(o.id,a),s.push(a)}}return s}if(e.type==="user"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[];for(let s of n)if(mr(s)&&s.type==="tool_result"){let o=t.get(String(s.tool_use_id));if(o){let a=qu(s.content);o.result=a,o.output=typeof s.content=="string"?s.content:a}}return[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success";return[{kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""}]}return[]}function ju(e){if(e.type==="item.completed"&&mr(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[Fi(t.text)];if(t.type==="reasoning"){let r=Pi(t.text);return r?[r]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function zu(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function qi(e){let t=[],r=new Map,n=Array.isArray(e)?e:[];for(let s of n){let o=s;if(typeof s=="string"){let i=s.trim();if(i.length===0)continue;try{o=JSON.parse(i)}catch{continue}}if(!mr(o))continue;let a=zu(o)?ju(o):Uu(o,r);for(let i of a)t.push(i)}return t}var Hu=5,Wu=10,Gu=/Task\s+#(\d+)/,Yu=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,Vu=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function ss(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function Ku(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function Zu(e){for(let t=e.length-1;t>=0;t-=1){let r=e[t];if(r.kind==="phase"||r.kind==="gate")return r.text||null}return null}function Xu(e){let t=new Map,r=0;for(let s of e){if(s.kind!=="tool")continue;r+=1;let o=s.input||{};if(s.tool==="TaskCreate"){let c=Gu.exec(s.output||s.result||""),u=String(o.activeForm||o.subject||"").trim();if(!c||u.length===0)continue;t.set(c[1],{label:u,active:o.status==="in_progress"?r:0});continue}if(s.tool!=="TaskUpdate")continue;let a=t.get(String(o.taskId??""));if(!a)continue;let i=o.activeForm||o.subject;typeof i=="string"&&i.trim().length>0&&(a.label=i.trim()),typeof o.status=="string"&&(a.active=o.status==="in_progress"?r:0)}let n=null;for(let s of t.values())s.active>0&&(!n||s.active>n.active)&&(n=s);return n?n.label:null}function Qu(e){if(e.tool==="Bash"){let t=e.command||"";return Yu.test(t)?"~ PR/\uAC8C\uC2DC \uC911":Vu.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function Ju(e){let t=e.filter(s=>s.kind==="tool").slice(-Wu),r=new Map;t.forEach((s,o)=>{let a=Qu(s);if(!a)return;let i=r.get(a)||{count:0,last:-1};i.count+=1,i.last=o,r.set(a,i)});let n=null;for(let[s,o]of r)(!n||o.count>n.count||o.count===n.count&&o.last>n.last)&&(n={label:s,count:o.count,last:o.last});return n?n.label:null}function ep(e){let t=Zu(e);if(t)return{text:t,guess:!1};let r=Xu(e);if(r)return{text:r,guess:!1};let n=Ju(e);return n?{text:n,guess:!0}:null}function tp(e,t){if(typeof e!="number")return"";let r=Math.max(0,Math.floor((t-e)/1e3));return r<60?`${r}\uCD08 \uC804`:Tt(e,t)}function os(e,t={}){let{transport:r,sessionLogStore:n,onClose:s}=t,o=null,a={},i=!0,c=new Set,u=new Set,f=null,_=null,b=!1,T=!1,$=!1,E=null,U=null;function x(){b=!1,T=!1,$=!1,E=null,U=null}async function V(I){if(r){T=!0,$=!1,xe();try{let R=await Promise.resolve(r("get-attempt-prompt",{attempt_id:I}));if(o!==I)return;!R||typeof R!="object"||Array.isArray(R)?$=!0:(E=R,U=I)}catch{o===I&&($=!0)}finally{o===I&&(T=!1,xe())}}}function ee(){if(b=!b,b&&o&&U!==o){V(o);return}xe()}function O(){if(!b)return"";let I=zr({loading:T,error:$});if(I)return l`<div class="sv__prompt" data-seam="attempt-prompt">
        ${I}
      </div>`;if(!E)return"";if(E.missing)return l`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let R=ns(E.recorded_at);return l`<div class="sv__prompt" data-seam="attempt-prompt">
      ${R?l`<div class="prompt-block__meta">${R} 발송</div>`:""}
      ${typeof E.task_prompt=="string"?or("\uACFC\uC5C5 (user)",E.task_prompt):""}
      ${typeof E.system_prompt=="string"?or("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",E.system_prompt):""}
    </div>`}function D(){if(!o||!n)return[];let I=n.get(o);return qi(I?I.lines:[])}function S(){if(!o||!n)return null;let I=n.get(o),R=I?I.last_event_at:null;return typeof R=="number"?R:null}function z(){return a.status==="running"}function L(){if(z()&&o){_||(_=setInterval(()=>xe(),1e3));return}pe()}function pe(){_&&(clearInterval(_),_=null)}function ve(I){let R=[],ie=0;for(;ie<I.length;){let De=I[ie];if(De.kind==="tool"){let Ae=ie;for(;Ae<I.length&&I[Ae].kind==="tool"&&I[Ae].tool===De.tool;)Ae+=1;if(Ae-ie>=Hu&&!u.has(ie)){R.push({kind:"group",idx:ie,tool:De.tool||"",lines:I.slice(ie,Ae).map((je,Me)=>({idx:ie+Me,line:je}))}),ie=Ae;continue}}R.push({kind:"line",idx:ie,line:De}),ie+=1}return R}function ae(I){for(let R=I.length-1;R>=0;R-=1){let ie=I[R];if(ie.kind==="result"||ie.kind==="error")return null;if(ie.kind==="tool"&&!Object.hasOwn(ie,"result"))return ie}return null}function be(I){for(let R=I.length-1;R>=0;R-=1)if(I[R].kind==="thinking")return I[R];return null}function Ce(I,R){if(R.kind==="gate")return l`<div class="sv__gate">${R.text}</div>`;if(R.kind==="phase")return l`<div class="sv__phase">${R.text}</div>`;if(R.kind==="result")return l`<div
        class="sv__result${R.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${R.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${_r(R.text||(R.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(R.kind==="thinking"){let ie=c.has(I);return l`<div
        class="sv__think${ie?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>ge(I)}
      >
        <span class="sv__think-line">💭 ${ss(R.text)}</span>
        ${ie?l`<pre class="sv__think-expand">${R.text}</pre>`:""}
      </div>`}if(R.kind==="error")return l`<div class="sv__error">⛔ ${R.text}</div>`;if(R.kind==="blocker")return l`<div class="sv__error">⛔ ${R.text}</div>`;if(R.kind==="tool"){let ie=c.has(I),De=R.tool==="Bash"?Ku(R.command):0,Ae=R.tool==="Bash"?De>1?ss(R.command):R.command:R.path||R.command||"";return l`<div
        class="sv__tool${ie?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>ge(I)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${R.icon}</span>
          <span class="sv__tool-name">${R.tool}</span>
          ${Ae?l`<span class="sv__tool-detail">${Ae}</span>`:""}
          ${De>1?l`<span class="sv__tool-more">⋯ ${De}줄</span>`:""}
          ${typeof R.added=="number"?l`<span class="sv__diff-add">+${R.added}</span>`:""}
          ${typeof R.removed=="number"?l`<span class="sv__diff-del">−${R.removed}</span>`:""}
          ${R.result?l`<span class="sv__tool-ok">→ ${R.result}</span>`:""}
        </span>
        ${ie?l`<pre class="sv__tool-expand">${Ge(R)}</pre>`:""}
      </div>`}return l`<div class="sv__as">${_r(R.text||"")}</div>`}function Ge(I){let R=[];if(I.tool==="Bash"&&typeof I.command=="string"&&I.command.length>0)R.push(I.command);else if(I.input!==void 0)try{R.push(`input: ${JSON.stringify(I.input,null,2)}`)}catch{}return typeof I.output=="string"&&I.output.length>0&&R.push(`output:
${I.output}`),R.join(`

`)}function Xe(){if(!o)return l``;let I=D(),R=[a.runner,a.model,a.effort].filter(Boolean).join(" \xB7 "),ie=a.session_id||"",De=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${i?"ON":"OFF"}`,Ae=z(),je=Ae?tp(S(),Date.now()):"",Me=Ae?ae(I):null,Le=Ae?be(I):null,Ie=ep(I);return l`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id">${o}</span>
        ${Ie?l`<span
              class="sv__stage${Ie.guess?" sv__stage--guess":""}"
              title=${Ie.text}
              >${Ie.text}</span
            >`:""}
        ${Ae?l`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${je?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${je}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${je?l`<span class="sv__live-ago">${je}</span>`:""}</span
            >`:""}
        ${ie?l`<button
              type="button"
              class="sv__session"
              title=${ie}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${ie}`}
              @click=${()=>G(ie)}
            >
              ⧉ ${ie.slice(0,8)}
            </button>`:""}
        ${R?l`<span class="sv__meta">${R}</span>`:""}
        ${a.worktree?l`<span class="sv__wt" title=${a.worktree}
              >${a.worktree}</span
            >`:""}
        <button
          type="button"
          class="sv__prompt-toggle${b?" sv__prompt-toggle--on":""}"
          data-seam="attempt-prompt-toggle"
          aria-pressed=${b?"true":"false"}
          aria-label="발송 프롬프트 보기"
          title="이 세션에 실제로 보낸 시스템·과업 프롬프트"
          @click=${ee}
        >
          ✉ 프롬프트
        </button>
        <button
          type="button"
          class="sv__follow${i?" sv__follow--on":""}"
          aria-pressed=${i?"true":"false"}
          aria-label=${De}
          @click=${he}
        >
          <span class="sv__follow-full">⇣ ${De}</span>
          <span class="sv__follow-short">⇣ ${i?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>fe()}
        >
          ✕
        </button>
      </div>
      ${O()}
      <div class="sv__body">
        ${I.length===0?l`<div class="sv__empty">세션 로그 없음</div>`:ve(I).map(Je=>Je.kind==="group"?ze(Je):Ce(Je.idx,Je.line))}
      </div>
      ${Me||Le?l`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${Me?l`<span class="sv__now-icon">${Me.icon}</span>
                  <span class="sv__now-name">${Me.tool}</span>
                  <span class="sv__now-detail"
                    >${Me.tool==="Bash"?ss(Me.command):Me.path||Me.command||""}</span
                  >`:""}
            ${Le?l`<span class="sv__now-think"
                  >💭 ${ss(Le.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function ze(I){return l`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>Se(I.idx)}
    >
      <span class="sv__group-icon">${I.lines[0].line.icon}</span>
      <span class="sv__group-name">${I.tool}</span>
      <span class="sv__group-count">${I.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function Se(I){u.add(I),xe()}function xe(){Ue(Xe(),e),L(),i&&_e()}function _e(){let I=e.querySelector(".sv__body");I&&(I.scrollTop=I.scrollHeight)}function ge(I){c.has(I)?c.delete(I):c.add(I),xe()}function he(){i=!i,xe()}function G(I){Tr(I).then(R=>{R?Q("\uBCF5\uC0AC\uB428","success",1200):Q("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function K(I){!o||!I||(a={...a,...I},xe())}function Re(I){let R=I.target;if(!R||!R.classList||!R.classList.contains("sv__body"))return;!(R.scrollHeight-R.scrollTop-R.clientHeight<=4)&&i&&(i=!1,xe())}e.addEventListener("scroll",Re,!0);function me(I){let R=I&&I.attempt_id;R&&(o=R,a=I.meta||{},i=!0,c.clear(),u.clear(),x(),!f&&n&&(f=n.subscribe(xe)),r&&Promise.resolve(r("subscribe-session-log",{id:`session-log:${o}`,attempt_id:o})).catch(()=>{}),xe())}function fe(){let I=o;o=null,c.clear(),u.clear(),x(),pe(),r&&I&&Promise.resolve(r("unsubscribe-session-log",{id:`session-log:${I}`})).catch(()=>{}),Ue(l``,e),s&&s()}return{open:me,updateMeta:K,close:fe,isOpen(){return o!==null},destroy(){pe(),f&&(f(),f=null),e.removeEventListener("scroll",Re,!0),o=null,Ue(l``,e)}}}function gn(e){let t=e&&typeof e=="object"?e:{},r=t.metadata&&typeof t.metadata=="object"?t.metadata:{},n=Bi(t.spec_id),s=Bi(r.spec_id);return n?{path:n,source:"native",conflict:s.length>0&&s!==n}:s?{path:s,source:"metadata",conflict:!1}:{path:"",source:"none",conflict:!1}}function Bi(e){return typeof e=="string"?e.trim():""}function rp(e){return["plan_review","plan_approval","plan_check"].some(t=>{let r=e[t];return typeof r=="string"&&r.trim().length>0})}function np(e){let t=e&&e.metadata||{},r=gn(e),n=[];return r.path&&n.push({kind:"spec",path:r.path,missing_state:null}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&n.push({kind:"plan",path:t.plan_path.trim(),missing_state:rp(t)?null:"plan_pending"}),n}function Ui(e,t){let r=np(e);return l`
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
  `}var sp="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",op=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,ap=/^\*\*결론\*\* — (.+)$/;function as(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==sp)return null;let r=op.exec(t[1]||"");if(!r)return null;let n=r[1].split(" ")[0],s=r[2],o=r[3],a=2;for(;a<t.length&&t[a].trim().length===0;)a+=1;let i=a<t.length?ap.exec(t[a]):null,c=i?i[1].replace(/\s+/g," ").trim():"",u=i?a+1:a;return{lane:n,identifier:s,timestamp:o,conclusion:c,body:t.slice(u).join(`
`).trim()}}var ji=20;function zi(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let r=String(t.getMonth()+1).padStart(2,"0"),n=String(t.getDate()).padStart(2,"0"),s=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0");return`${r}-${n} ${s}:${o}`}function ip(e){return e.length>ji?`${e.slice(0,ji)}\u2026`:e}function lp(e,t,r,n){let s=`${t.lane} ${ip(t.identifier)}`;return l`<div class="detail-report">
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
        <span class="detail-report__time">${zi(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${n&&t.body.length>0?l`<div class="detail-report__body">
          ${_r(t.body)}
        </div>`:""}
  </div>`}function cp(e){return l`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${zi(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${_r(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function Hi(e,t={},r={}){let n=Array.isArray(e)?e.filter(Boolean):[],s=r.expanded||new Set,o=typeof r.draft=="string"?r.draft:"",a=r.sending===!0,i=n.slice().sort((c,u)=>String(u.created_at||"").localeCompare(String(c.created_at||"")));return l`
    <div class="detail-section-label">댓글 (${n.length})</div>
    ${r.error?l`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:i.length===0?l`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:l`<div class="detail-comments" data-seam="comments">
            ${i.map(c=>{let u=as(typeof c.text=="string"?c.text:"");return u?lp(c,u,t,s.has(c.id)):cp(c)})}
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
  `}var dp=["codex","opus","fable","self","skip"],up=["codex","fable","skip"],pp=["low","medium","high","xhigh"],fp=["standard","fast_track"],Rr=["orchestration_model","orchestration_effort","orchestration_speed","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_runtime","impl_model","impl_effort"],po=["impl_runtime","orchestration_model"],hn=[{id:"worker-detail",label:"\uC6CC\uCEE4 \uC0C1\uC138",keys:["orchestration_effort","orchestration_speed"]},{id:"implementation-detail",label:"\uAD6C\uD604 \uC0C1\uC138",keys:["impl_model","impl_effort"]},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort"]}],fo={orchestration_model:{title:"\uC6CC\uCEE4 \uC2E4\uD589 \uBAA8\uB378"},orchestration_effort:{title:"\uC6CC\uCEE4 reasoning effort"},orchestration_speed:{title:"\uC6CC\uCEE4 \uC2E4\uD589 \uC18D\uB3C4",help:"Fast\uB294 \uC9C0\uC6D0 \uBAA8\uB378\uC744 \uB354 \uBE60\uB974\uAC8C \uC2E4\uD589\uD558\uBA70 \uC0AC\uC6A9\uB7C9 \uBE44\uC6A9\uC774 \uC99D\uAC00\uD569\uB2C8\uB2E4."},spec_review_model:{title:"\uC2A4\uD399 \uB9AC\uBDF0\uC5B4"},spec_review_effort:{title:"\uC2A4\uD399 \uB9AC\uBDF0 reasoning effort"},plan_review_model:{title:"\uACC4\uD68D \uB9AC\uBDF0\uC5B4"},plan_review_effort:{title:"\uACC4\uD68D \uB9AC\uBDF0 reasoning effort"},impl_review_model:{title:"\uAD6C\uD604 \uB9AC\uBDF0\uC5B4"},impl_review_effort:{title:"\uAD6C\uD604 \uB9AC\uBDF0 reasoning effort"},impl_runtime:{title:"\uAD6C\uD604 runtime"},impl_model:{title:"\uAD6C\uD604 \uBAA8\uB378",help:"\uC6CC\uD06C\uD50C\uB85C\uAC00 \uBCF5\uC7A1 \uAD6C\uD604\uC778\uC9C0, \uBC94\uC704\uAC00 \uD55C\uC815\uB41C \uAD6C\uD604\uC778\uC9C0 \uD310\uB2E8\uD574 \uD604\uC7AC runtime\uC758 \uAD6C\uD604\uC6A9 \uBAA8\uB378\uC744 \uC120\uD0DD\uD569\uB2C8\uB2E4."},impl_effort:{title:"\uAD6C\uD604 reasoning effort",help:"\uC790\uB3D9 \uC120\uD0DD\uC774\uBA74 workflow tier\uC5D0 \uC120\uC5B8\uB41C effort\uB97C, \uBAA8\uB378\uB9CC \uC9C1\uC811 \uC9C0\uC815\uD588\uC73C\uBA74 \uD574\uB2F9 \uD558\uC704 \uC5D0\uC774\uC804\uD2B8 \uD638\uCD9C\uC758 \uAE30\uBCF8 effort\uB97C \uC0AC\uC6A9\uD569\uB2C8\uB2E4."},workflow_mode:{title:"\uC6CC\uD06C\uD50C\uB85C \uBAA8\uB4DC"}},Wi={spec_review_effort:"spec_review_model",impl_review_effort:"impl_review_model",plan_review_effort:"plan_review_model"},_p=["self","skip"],mp="opus",_o={orchestration_model:"(\uAE30\uBCF8: opus)",orchestration_effort:"(\uAE30\uBCF8: CLI \uAE30\uBCF8)",orchestration_speed:"(\uAE30\uBCF8: Standard)",spec_review_model:"(\uAE30\uBCF8: codex)",spec_review_effort:"(\uAE30\uBCF8: \uD504\uB9AC\uC14B)",impl_review_model:"(\uAE30\uBCF8: codex)",impl_review_effort:"(\uAE30\uBCF8: \uD504\uB9AC\uC14B)",impl_runtime:"(\uAE30\uBCF8: orchestration runtime \uC0C1\uC18D)",plan_review_model:"(\uAE30\uBCF8: codex)",plan_review_effort:"(\uAE30\uBCF8: \uD504\uB9AC\uC14B)",impl_model:"(\uAE30\uBCF8: \uC791\uC5C5 \uC131\uACA9\uC5D0 \uB530\uB77C \uAD6C\uD604 \uBAA8\uB378 \uC790\uB3D9 \uC120\uD0DD)",impl_effort:"(\uAE30\uBCF8: \uC120\uD0DD\uB41C \uAD6C\uD604 \uC5D0\uC774\uC804\uD2B8\uC758 reasoning effort \uC0AC\uC6A9)"};function mo(e){let t=fo[e]||{title:e};return l`<span data-exec-setting-label>
    <span data-exec-setting-title>${t.title}</span>
    <code data-exec-setting-key>${e}</code>
    ${t.help?l`<small data-exec-setting-help=${e}>${t.help}</small>`:""}
  </span>`}function gp(e,t,r=""){let n=t&&t[e];return typeof n=="string"&&n.length>0?`(\uAE30\uBCF8: ${e==="orchestration_speed"?n==="default"?"Standard":n==="fast"?"Fast":n:n} \u2014 ${r||"\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4 \uD504\uB9AC\uC14B"})`:_o[e]||"(\uAE30\uBCF8)"}function Hr(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Ir(e){if(!Hr(e)||!Hr(e.runners))return null;let t=Object.entries(e.runners).filter(([,r])=>Hr(r)&&Hr(r.models));return t.length>0?t:null}function uo(e){return{value:e,label:e}}function go(e){return{label:null,options:[{value:e,label:`${e} (\uBE44\uD638\uD658)`}]}}function Gi(e,t,r=null){let n=Ir(e);if(!n)return t?[{label:null,options:[uo(t)]}]:[];let s=n.filter(([a])=>r===null||a===r).map(([a,i])=>({label:a,options:Object.keys(i.models).map(uo)})),o=s.some(a=>a.options.some(i=>i.value===t));return t&&!o?[go(t),...s]:s}function gr(e,t){let r={label:null,options:e.map(uo)};return t&&!e.includes(t)?[go(t),r]:[r]}function ar(e,t){let r=Ir(e);if(!r||!t)return null;for(let[n,s]of r)if(Object.hasOwn(s.models,t))return n;return null}function ho(e,t){return Hr(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function hp(e,t){return Hr(t)&&Array.isArray(t.orchestration_efforts)?t.orchestration_efforts.slice():ho(e,t)}function bp(e,t){let r=Ir(e);if(!r||!t)return[];for(let[,n]of r)if(Object.hasOwn(n.models,t))return hp(n,n.models[t]);return[]}function vp(e,t){let r=Ir(e);if(!r||!t)return[];for(let[,n]of r){if(!Object.hasOwn(n.models,t))continue;let s=n.models[t];return Array.isArray(s.speed_tiers)?s.speed_tiers.slice():["default"]}return[]}function bo(e,t){let r=Ir(e);if(!r||!t)return[];for(let[,n]of r)if(Object.hasOwn(n.models,t))return ho(n,n.models[t]);return[]}function Ki(e){let t=Ir(e);if(!t)return[];let r=[];for(let[,n]of t)for(let s of Object.values(n.models))for(let o of ho(n,s))r.includes(o)||r.push(o);return r}function Zi(e,t){if(!t)return Ki(e);let n=Ir(e)?.find(([o])=>o===t)?.[1];if(!n)return[];let s=[];for(let o of Object.keys(n.models))for(let a of bo(e,o))s.includes(a)||s.push(a);return s}function ls(e,t,r){let n={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},s=n.impl_runtime==="inherit"?r:n.impl_runtime==="claude"||n.impl_runtime==="codex"?n.impl_runtime:null;if(n.impl_runtime==="inherit"&&!s)return n.impl_model="",n.impl_effort="",n;let o=ar(t,n.impl_model);if(n.impl_model&&(!s||o!==s))return n.impl_model="",n.impl_effort="",n;let a=n.impl_model?bo(t,n.impl_model):Zi(t,s);return n.impl_effort&&a.length>0&&!a.includes(n.impl_effort)&&(n.impl_effort=""),n}function Wr(e){let{selectedOf:t,effectiveOf:r,runner_catalog:n,controller_runtime:s}=e,o=r("orchestration_model")||mp,a=r("impl_model"),i=r("impl_runtime"),c=i==="claude"||i==="codex"?i:i==="inherit"?s===void 0?ar(n,o):s:null;return Rr.map(u=>{let f=t(u),_,b=!1;return u==="orchestration_model"?_=Gi(n,f):u==="impl_runtime"?_=gr(["inherit","claude","codex"],f):u==="impl_model"?(_=c?Gi(n,f,c):f?[go(f)]:[],b=i==="inherit"&&c===null):u==="orchestration_effort"?_=gr(bp(n,o),f):u==="orchestration_speed"?_=yp(vp(n,o),f):u==="impl_effort"?(_=gr(a?bo(n,a):c?Zi(n,c):Ki(n),f),b=i==="inherit"&&c===null):u==="plan_review_model"?_=gr(up,f):Object.hasOwn(Wi,u)?(_=gr(pp,f),b=_p.includes(r(Wi[u]))):_=gr(dp,f),{key:u,groups:_,selected:f,disabled:b,runner:u==="orchestration_model"?ar(n,o):null}})}function is(e,t,r){return l`
    ${typeof r=="string"?l`<option value="" ?selected=${!t}>${r}</option>`:""}
    ${e.map(n=>n.label===null?n.options.map(s=>Yi(s,t)):l`<optgroup label=${n.label}>
            ${n.options.map(s=>Yi(s,t))}
          </optgroup>`)}
  `}function yp(e,t){return gr(e,t).map(r=>({...r,options:r.options.map(n=>{let s=n.label.endsWith("(\uBE44\uD638\uD658)"),o=n.value==="default"?"Standard":n.value==="fast"?"Fast":null;return{...n,label:s?o?`${o} (\uBE44\uD638\uD658)`:n.label:o||n.label}})}))}function Yi(e,t){return l`<option value=${e.value} ?selected=${e.value===t}>
    ${e.label}
  </option>`}function Vi(e,t,r,n,s,o,a){return l`
    <div class="detail-kv">
      <span class="detail-kv__k">${mo(e)}</span>
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
        ${o?l`<span class="detail-kv__note" data-runner-for=${e}
              >${o}</span
            >`:""}
      </span>
    </div>
  `}function wp(e,t,r,n){return e.some(s=>t(s))?"\uC774\uC288 \uD540":e.some(s=>r(s))?`\uD504\uB9AC\uC14B \u300C${n||"\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4 \uD504\uB9AC\uC14B"}\u300D`:"\uAE30\uBCF8"}function kp(e,t,r){let n=[t("orchestration_model")||"opus"],s=t("orchestration_effort"),o=t("orchestration_speed");s&&n.push(`effort ${s}`),o&&o!=="default"&&n.push(`speed ${o==="fast"?"Fast":o}`);let a=`${t("impl_runtime")||"inherit"} \xB7 ${t("impl_model")||"auto"}`,i=[["\uC2A4\uD399","spec_review_model","spec_review_effort"],["\uACC4\uD68D","plan_review_model","plan_review_effort"],["\uAD6C\uD604","impl_review_model","impl_review_effort"]].map(([u,f,_])=>{let b=t(f)||"codex",T=t(_);return`${u} ${b}${T?`/${T}`:""}`}),c=[{id:"worker",label:"\uC6CC\uCEE4",keys:Rr.slice(0,3),value:n.join(" \xB7 ")},{id:"implementation",label:"\uAD6C\uD604",keys:["impl_runtime","impl_model","impl_effort"],value:a},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort"],value:i.join(" \xB7 ")}];return l`<section
    class="detail-exec-presets exec-settings-summary"
    data-exec-settings-summary
  >
    ${c.map(u=>l`<div
          class="workflow-summary__row exec-settings-summary__row"
          data-exec-summary=${u.id}
        >
          <span class="workflow-summary__label">${u.label}</span>
          <span class="detail-kv__vgroup">
            <span class="workflow-summary__value">${u.value}</span>
            <span class="detail-kv__v" data-exec-source
              >${wp(u.keys,e,t,r)}</span
            >
          </span>
        </div>`)}
  </section>`}function Xi(e,t,r,n,s=""){let o=e&&e.metadata||{},a=r&&typeof r=="object"?r:{},i=$=>typeof o[$]=="string"?o[$]:"",c=$=>{let E=i($);return E||(typeof a[$]=="string"?a[$]:"")},u=Wr({selectedOf:i,effectiveOf:c,runner_catalog:n}),f=o.workflow_mode==="fast_track"?"fast_track":"standard",_=new Map(u.map($=>[$.key,$])),b=hn.flatMap($=>$.keys).filter($=>i($)).length,T=$=>{let E=_.get($);return E?Vi(E.key,is(E.groups,E.selected,gp(E.key,a,s)),E.selected,!!E.selected,E.disabled,E.runner,t):""};return l`
    <div class="detail-section-label">실행 설정 (수정 가능)</div>
    ${kp(i,c,s)}
    <section class="exec-settings-core" data-exec-settings-core>
      ${Vi("workflow_mode",is(gr(fp,f),f),f,o.workflow_mode==="fast_track",!1,null,t)}
      ${po.map(T)}
    </section>
    <details
      class="detail-exec-presets exec-settings-advanced"
      data-exec-settings-advanced
    >
      <summary>고급 설정 — ${b}개 변경됨</summary>
      ${hn.map($=>l`<section
            class="exec-settings-advanced__group"
            data-exec-settings-group=${$.id}
          >
            <h4>${$.label}</h4>
            ${$.keys.map(T)}
          </section>`)}
    </details>
  `}function $p(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function Qi(e,t){let r=t.getWorkspacePath,n=t.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",a="",i="";function c($){$.key==="Escape"&&s&&($.preventDefault(),b())}document.addEventListener("keydown",c);function u(){return s?l`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>b()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${$p(s)}</span
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
            ${o==="loading"?l`<div class="mv__status">불러오는 중…</div>`:o==="pending"?l`<div class="mv__status">${i}</div>`:o==="error"?l`<div class="mv__status mv__status--error">
                      ${i||"\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}
                    </div>`:_r(a)}
          </div>
        </div>
      </div>
    `:l``}function f(){Ue(u(),e)}async function _($,E={}){s=$,o="loading",a="",i="",f();let U=r?r():"";if(!U){o="error",i="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",f();return}if(!n){o="error",i="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",f();return}let x="/api/doc?workspace="+encodeURIComponent(U)+"&path="+encodeURIComponent($);try{let V=await n(x),ee=await V.json().catch(()=>({}));if(!V.ok||!ee||ee.ok!==!0){if(ee?.error==="not_found"&&E.missing_state==="plan_pending"){o="pending",i="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",f();return}o="error",i="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(ee&&ee.error||V.status)+")",f();return}a=String(ee.content||""),o="ready",f()}catch{o="error",i="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",f()}}function b(){s=null,Ue(l``,e)}function T(){document.removeEventListener("keydown",c),b()}return{open:_,close:b,destroy:T}}var xp=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],tl="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function Sp(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function Ap(e){let t=ht(e);if(t.length>0)return t.map(s=>l`<span class="detail-usage-total" title=${s.tooltip}
          >${s.label}</span
        >`);let r=Ur(e);if(!r||!e)return"";let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return l`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${r.replace(/^τ /,"\u03C4 \uCD1D ")}${n}</span
    >${e.replayed?l`<span class="detail-usage-partial" title=${tl}
          >부분 집계</span
        >`:""}`}function Ji(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function el(e){if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?rl(t):""}function Tp(e){return e?["implementation","review-consult"].flatMap(r=>{let n=e.roles[r]?.codex;return n?n.legs.map(s=>{let a=ht({providers:{codex:{subtotal:s.subtotal,breakdown:s.usage,...s.replayed?{replayed:!0}:{}}},roles:{}})[0];return l`<div class="detail-session__leg detail-session__usage-detail">
        <span class="detail-session__leg-role detail-session__usage-label"
          >${r}</span
        >
        <span class="detail-session__leg-meta detail-session__usage-value"
          >${[s.provider,s.model].filter(Boolean).join(" \xB7 ")}</span
        >
        ${s.session_id?l`<span
              class="detail-session__leg-sid detail-session__sid"
              title=${s.session_id}
              >${s.session_id.slice(0,8)}</span
            >`:""}
        ${el(s.completed_at)?l`<span class="detail-session__leg-time detail-session__time"
              >${el(s.completed_at)}</span
            >`:""}
        ${a?l`<span class="detail-session__usage" title=${a.tooltip}
              >${a.label}</span
            >`:""}
      </div>`}):[]}):""}function Ep(e,t){let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,n=[...xp,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return l`<div class="detail-session__usage-detail">
    ${n.map(s=>l`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${s.label}</span
          ><span class="detail-session__usage-value"
            >${Sp(e[s.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${r===null?"":l`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${r.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?l`<span class="detail-session__usage-note">${tl}</span>`:""}
  </div>`}var Cp={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function rl(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=String(t.getHours()).padStart(2,"0"),n=String(t.getMinutes()).padStart(2,"0");return`${r}:${n}`}function Rp(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,n])=>typeof n=="string"&&n.length>0).map(([n,s])=>`${n}=${s}`).join(" \xB7 "):"",r=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return l`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${r}</span>
    ${t?l`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}function nl(e,t={},r={}){let n=Array.isArray(e)?e:[],s=r.expanded||new Set;if(n.length===0)return l`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let o=new Set;for(let u of n)u&&typeof u.resumed_from=="string"&&u.resumed_from.length>0&&o.add(u.resumed_from);let a=u=>{if(!(u.status==="failed"||u.status==="orphaned"))return"";let _=typeof u.session_id=="string"&&u.session_id.length>0,b=o.has(u.attempt_id),T=_&&!b,$=_?b?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return l`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${u.attempt_id}
      ?disabled=${!T}
      title=${$}
      @click=${E=>{E.stopPropagation(),T&&t.onResume&&t.onResume(u.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},i=u=>{if(!(u.status==="failed"||u.status==="orphaned")||typeof u.cause!="string"||u.cause==="")return"";let _=u.cause_detail,b=_&&typeof _.reason=="string"&&_.reason.length>0?typeof _.command=="string"&&_.command.length>0?`${_.reason} \xB7 ${_.command}`:_.reason:u.cause;return l`<div class="detail-session__cause" title=${b}>
      ${u.cause}
    </div>`},c=u=>{let f=Ji(Us(u));if(ht(f).length===0&&!Ur(u.usage))return"";let _=s.has(u.attempt_id);return l`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${u.attempt_id}
      aria-expanded=${_?"true":"false"}
      title=${_?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${b=>{b.stopPropagation(),t.onToggleUsage&&t.onToggleUsage(u.attempt_id)}}
    >
      τ 자세히
    </button>`};return l`
    <div class="detail-section-label">
      세션 이력${Ap(r.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${n.map(u=>{let f=Us(u),_=Ji(f),b=ht(_);return l`<div class="detail-session-row">
          <button
            type="button"
            class="detail-session detail-session--${u.status||"unknown"}"
            data-attempt-id=${u.attempt_id}
            @click=${()=>t.onOpen&&t.onOpen(u.attempt_id)}
          >
            <span class="detail-session__glyph"
              >${Cp[u.status||""]||"\xB7"}</span
            >
            <span class="detail-session__id">${u.attempt_id}</span>
            ${pr(u)?l`<span
                  class="detail-session__resumed"
                  title=${pr(u)}
                  >↻</span
                >`:""}
            <span class="detail-session__meta">${Yt(u)}</span>
            ${b.length>0?l`<span class="detail-session__role">orchestrator</span>`:""}
            ${u.session_id?l`<span class="detail-session__sid" title=${u.session_id}
                  >${String(u.session_id).slice(0,8)}</span
                >`:""}
            ${b.length>0?b.map(T=>l`<span
                      class="detail-session__usage"
                      title=${T.tooltip}
                      >${T.label}</span
                    >`):Ur(u.usage)?l`<span class="detail-session__usage"
                    >${Ur(u.usage)}</span
                  >`:""}
            <span class="detail-session__time">${rl(u.started_at)}</span>
          </button>
          ${c(u)} ${a(u)} ${i(u)} ${Rp(u)}
          ${s.has(u.attempt_id)&&u.usage?Ep(u.usage,u.runner==="codex"?"codex":"claude"):""}
          ${Tp(f)}
        </div>`})}
    </div>
  `}function sl(e,t={}){return l`
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
          ${Ip(e)}
        </div>`:""}
  `}function Ip(e){let t=zr(e);if(t)return t;let r=e.data;if(!r)return"";if(r.missing)return l`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof r.default_task_prompt=="string"?or("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",r.default_task_prompt):""}`;let n=ns(r.recorded_at);return l`<div class="detail-prompt__meta">
      ${r.attempt_id}${n?` \xB7 ${n}`:""}
    </div>
    ${typeof r.task_prompt=="string"?or("\uACFC\uC5C5 (user)",r.task_prompt):""}
    ${typeof r.system_prompt=="string"?or("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",r.system_prompt):""}`}var Lp=["open","in_progress","deferred","resolved","closed"],Op=[0,1,2,3,4];function ol(e,t){let r=t.issueStores,n=t.onClose,s=t.transport,o=t.onNavigate,a=t.queueStore,i=t.execPresetStore,c=t.sessionLogStore,u=null,f=null,_={},b="",T=!1,$=!1,E=!1,U="",x="",V="";function ee(){$=!1,E=!1,U="",x="",V=""}let O=[],D=null,S=null,z=!1,L="",pe=!1,ve=0,ae=new Set;function be(){O=[],D=null,S=null,z=!1,L="",pe=!1,ve+=1,ae.clear()}async function Ce(d){if(!s)return;let k=++ve;try{let v=await Promise.resolve(s("get-comments",{id:d}));if(k!==ve||d!==u)return;O=Array.isArray(v)?v:[],z=!1}catch{if(k!==ve||d!==u)return;z=!0}m()}function Ge(){if(!s||!u)return;let d=f&&typeof f.comment_count=="number"?f.comment_count:null;if(D!==u){D=u,S=d,Ce(u);return}d!==null&&d!==S&&(S=d,Ce(u))}function Xe(d){ae.has(d)?ae.delete(d):ae.add(d),m()}function ze(d){let k=L.trim().length===0;L=d,k!==(d.trim().length===0)&&m()}async function Se(){let d=L.trim();if(!s||!u||d.length===0||pe)return;let k=u;pe=!0,m();let v=!1;try{let F=await Promise.resolve(s("add-comment",{id:k,text:d}));Array.isArray(F)&&F.length>0&&(v=!0,k===u&&(O=F,z=!1,L="",S=F.length))}catch{v=!1}v||Q("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),k===u&&(pe=!1),m()}let xe={onToggle:Xe,onDraftInput:ze,onSubmit:Se},_e=document.createElement("div");_e.className="md-viewer-root",document.body.appendChild(_e);let ge=Qi(_e,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),he=document.createElement("div");he.className="session-log-root",document.body.appendChild(he);let G=os(he,{transport:s?(d,k)=>Promise.resolve(s(d,k)):void 0,sessionLogStore:c}),K=!1,Re=!1,me=!1,fe=null,I=null,R=0;function ie(d){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${d}`}function De(){K=!1,Re=!1,me=!1,fe=null,I=null,R+=1}async function Ae(d){if(!s)return;let k=++R;Re=!0,me=!1,m();try{let v=await Promise.resolve(s("get-bead-prompt",{bead_id:d}));if(k!==R)return;!v||typeof v!="object"||Array.isArray(v)?me=!0:(fe=v,I=ie(d))}catch{k===R&&(me=!0)}finally{k===R&&(Re=!1,m())}}function je(){if(K=!K,K&&u&&I!==ie(u)){fe=null,Ae(u);return}m()}function Me(){if(!a||!u)return[];let d=a.get();return(d&&d.attempts?Object.values(d.attempts):[]).filter(v=>v&&v.bead_id===u).sort((v,F)=>(F.started_at||0)-(v.started_at||0)).map(v=>({attempt_id:v.attempt_id,bead_id:v.bead_id,status:v.status,started_at:typeof v.started_at=="number"?v.started_at:null,runner:v.runner||null,model:v.model||null,effort:v.effort||null,speed:v.speed||null,session_id:v.session_id||null,resumed_from:v.resumed_from||null,continuation_mode:v.continuation_mode||null,dismissed_at:typeof v.dismissed_at=="number"?v.dismissed_at:null,cause:typeof v.cause=="string"?v.cause:null,cause_detail:v.cause_detail||null,exec_default_preset_id:typeof v.exec_default_preset_id=="string"?v.exec_default_preset_id:null,exec_default_preset_revision:typeof v.exec_default_preset_revision=="number"?v.exec_default_preset_revision:null,exec_values:v.exec_values&&typeof v.exec_values=="object"?v.exec_values:null,usage:v.usage||null,usage_legs:Array.isArray(v.usage_legs)?v.usage_legs:[]}))}function Le(){if(!a||!u)return null;let d=a.get();return It(d&&d.attempts||{},u)}let Ie=new Set;function Je(d){Ie.has(d)?Ie.delete(d):Ie.add(d),m()}function M(d){let k=a?a.get():null,v=k&&k.attempts?k.attempts[d]:null;G.open({attempt_id:d,meta:v?{runner:v.runner||void 0,model:v.model||void 0,effort:v.effort||void 0,status:v.status||void 0,session_id:v.session_id||void 0}:{}})}async function H(d){if(!s||!d)return;let k=()=>{let ye=a?a.get():null;return ye&&typeof ye.revision=="number"?ye.revision:0},v=async(ye={})=>await s("worker-attempt-resume",{attempt_id:d,expected_revision:k(),...ye}),F=ye=>{ye?.queue&&a?.set&&a.set(ye.queue)},J=await v();if(F(J),J&&J.conflict){let ye=J.queue&&typeof J.queue.revision=="number"?J.queue.revision:k();J=await s("worker-attempt-resume",{attempt_id:d,expected_revision:ye}),F(J)}J=await tr(J,(ye,it)=>v({continuation:ye,decision_token:it}),{onResult:F,refresh:()=>v()}),J&&J.resumed===!1&&!J.conflict&&J.reason&&Q(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${J.reason}`,"error",2400)}let q={onOpen:M,onResume:H,onToggleUsage:Je};function X(){let d=a?a.get():null,k=d&&d.default_exec_preset_id,v=typeof k=="string"?W()?.presets.find(F=>F.id===k):null;return v&&v.compatible!==!1&&v.settings?v.settings:{}}function ce(){let d=a?a.get():null,k=d&&d.default_exec_preset_id,v=typeof k=="string"?W()?.presets.find(F=>F.id===k):null;return v&&v.compatible!==!1&&typeof v.name=="string"?v.name:""}function w(){let d=a?a.get():null;return d&&d.runner_catalog||null}function C(){let d=f?.metadata&&typeof f.metadata=="object"?f.metadata:{},v=(Object.hasOwn(_,"orchestration_model")?_.orchestration_model:void 0)||(typeof d.orchestration_model=="string"?d.orchestration_model:"")||(typeof X().orchestration_model=="string"?X().orchestration_model:"")||"opus";return ar(w(),v)}function W(){let d=i?i.get():null;return!d||typeof d.revision!="number"?null:{revision:d.revision,presets:Array.isArray(d.presets)?d.presets:[]}}function le(d){let k=d&&d.settings&&typeof d.settings=="object"?d.settings:{},v=F=>typeof k[F]=="string"?k[F]:F==="impl_runtime"&&typeof k.impl_model=="string"&&ar(w(),k.impl_model)||"";return Wr({selectedOf:v,effectiveOf:v,runner_catalog:w()}).some(F=>F.groups.some(J=>J.options.some(ye=>ye.value===F.selected&&ye.label.endsWith("(\uBE44\uD638\uD658)"))))}function ne(d){i&&d&&typeof d.revision=="number"&&Array.isArray(d.presets)&&i.set({revision:d.revision,presets:d.presets})}async function Oe(){let d=W(),k=d?.presets.find(v=>v.id===b);if(!(!s||!u||!d||!k||le(k)||T)){T=!0,m();try{let v=await Promise.resolve(s("apply-exec-preset",{id:u,preset_id:k.id,expected_revision:d.revision}));if(v&&v.conflict){ne(v),Q("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let F=v&&Array.isArray(v.issue)?v.issue[0]:v?.issue;if(v&&v.applied&&F&&typeof F=="object"){f=F;for(let J of Rr)delete _[J];Q("\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",2400);return}v&&v.error==="bd_readback_failed"?Q("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):Q("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(v){v&&typeof v=="object"&&v.code==="bd_readback_failed"?Q("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):Q("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{T=!1,m()}}}function Ne(){let d=W();if(d&&d.presets.length===0)return l`<section class="detail-exec-presets">
        <div class="detail-section-label">실행 프리셋</div>
        <p>전역 실행 설정에서 프리셋을 추가하세요.</p>
        <button
          type="button"
          data-open-exec-presets
          @click=${()=>t.onOpenExecPresets?.()}
        >
          전역 실행 설정 열기
        </button>
      </section>`;let k=d?d.presets:[],v=k.find(J=>J.id===b),F=v?le(v):!1;return l`<section class="detail-exec-presets">
      <div class="detail-section-label">실행 프리셋</div>
      <div class="detail-exec-presets__controls">
        <select
          data-exec-preset-select
          aria-label="실행 프리셋"
          ?disabled=${d===null||T}
          @change=${J=>{b=J.target.value,m()}}
        >
          <option value="" ?selected=${b===""}>
            ${d===null?"\uBD88\uB7EC\uC624\uB294 \uC911\u2026":"\uD504\uB9AC\uC14B \uC120\uD0DD"}
          </option>
          ${k.map(J=>{let ye=le(J);return l`<option
              value=${J.id}
              ?selected=${J.id===b}
            >
              ${J.name}${ye?" (\uBE44\uD638\uD658)":""}
            </option>`})}
        </select>
        <button
          type="button"
          data-apply-exec-preset
          ?disabled=${d===null||!v||F||T}
          @click=${()=>{Oe()}}
        >
          12개 설정 적용
        </button>
      </div>
      <p>적용하면 현재 이슈 실행 설정 전체를 교체합니다.</p>
    </section>`}let et=null;r&&r.subscribe&&(et=r.subscribe(()=>rt()));let Fe=null;a&&typeof a.subscribe=="function"&&(Fe=a.subscribe(()=>{u&&m()}));let ut=null;i&&typeof i.subscribe=="function"&&(ut=i.subscribe(()=>{u&&m()}));function _t(d){d.key==="Escape"&&u&&(d.preventDefault(),n())}document.addEventListener("keydown",_t);function rt(){if(u){if(r&&typeof r.snapshotFor=="function"){let d=r.snapshotFor("detail:"+u)||[];f=d.find(v=>v&&v.id===u)||d[0]||f}Ge(),m()}}function nt(d){Tr(d).then(k=>{k?Q("\uBCF5\uC0AC\uB428","success",1200):Q("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function st(d){d.preventDefault(),d.stopPropagation(),u&&nt(u)}function at(d,k){d.preventDefault(),d.stopPropagation(),nt(k)}function mt(d,k,v){d.preventDefault(),d.stopPropagation(),ge.open(k,{missing_state:v})}function B(d,k){_[d]=k,m(),!(!s||!u)&&Promise.resolve(s("update-exec-settings",{id:u,key:d,value:k})).catch(()=>{Q("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}function Y(d,k){let v=f||{},F=v.metadata&&typeof v.metadata=="object"?v.metadata:{},J={};for(let qe of["impl_runtime","impl_model","impl_effort"])J[qe]=Object.hasOwn(_,qe)?_[qe]:typeof F[qe]=="string"?F[qe]:"";J[d]=k;let ye=ls(J,w(),C()),it={};for(let qe of["impl_runtime","impl_model","impl_effort"])it[qe]=_[qe],_[qe]=ye[qe]||"";m(),!(!s||!u)&&Promise.resolve(s("update-impl-target",{id:u,...ye,orchestration_runtime:C()})).then(qe=>{let Nt=Array.isArray(qe)?qe[0]:qe;if(!Nt||typeof Nt!="object"||!Nt.id)throw new Error("implementation target readback failed");f=Nt;for(let ke of["impl_runtime","impl_model","impl_effort"])delete _[ke];m()}).catch(()=>{for(let qe of["impl_runtime","impl_model","impl_effort"])it[qe]===void 0?delete _[qe]:_[qe]=it[qe];m(),Q("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error")})}async function oe(d,k,v){if(!s||!u)return!1;try{let F=await Promise.resolve(s(d,k)),J=Array.isArray(F)?F[0]:F;return J&&typeof J=="object"&&J.id?(f=J,!0):(Q(v,"error"),!1)}catch{return Q(v,"error"),!1}}function de(d){setTimeout(()=>{try{let k=e.querySelector(d);k&&typeof k.focus=="function"&&k.focus()}catch{}},0)}function te(){$=!0,U=f&&f.title||"",m(),de('.detail-edit__input[data-edit="title"]')}function Te(d){U=d.target.value}function Ke(){$=!1,U="",m()}function Qe(){oe("edit-text",{id:u,field:"title",value:U},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(k=>{k&&($=!1,U=""),m()})}function $e(){E=!0,x=f&&f.description||"",m(),de('.detail-edit__textarea[data-edit="description"]')}function Ye(d){x=d.target.value}function we(){E=!1,x="",m()}function dt(){oe("edit-text",{id:u,field:"description",value:x},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(k=>{k&&(E=!1,x=""),m()})}function bt(d,k,v,F){if(d.key==="Escape"){d.stopPropagation(),v();return}d.key==="Enter"&&(!F||d.ctrlKey||d.metaKey)&&(d.preventDefault(),k())}function Zt(d){let k=d.target.value;oe("update-status",{id:u,status:k},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>m())}function zt(d){let k=Number(d.target.value);oe("update-priority",{id:u,priority:k},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>m())}function Xt(d){V=d.target.value}function gt(){let d=V.trim();d.length!==0&&oe("label-add",{id:u,label:d},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(k=>{k&&(V=""),m()})}function xt(d){if(d.key==="Escape"){d.stopPropagation(),V="",m();return}d.key==="Enter"&&(d.preventDefault(),gt())}function Ot(d){oe("label-remove",{id:u,label:d},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>m())}let Dt={onCopyPath:at,onOpenDoc:mt},Mt={onChange:B,onImplTargetChange:Y};function Ht(d){return typeof d=="string"?d:d&&typeof d=="object"?String(d.id||d.to||d.issue_id||d.depends_on||""):""}function Ee(d){switch(d&&typeof d=="object"?String(d.dependency_type||d.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function vt(d){let v=(Array.isArray(d.dependencies)?d.dependencies:[]).map(F=>({id:Ht(F),icon:Ee(F)})).filter(F=>F.id.length>0);return l`
      <div class="detail-section-label">의존성</div>
      ${v.length===0?l`<div class="detail-empty">의존성 없음</div>`:l`<div class="detail-deps">
            ${v.map(F=>o?l`<button
                    type="button"
                    class="detail-dep detail-dep--link"
                    @click=${()=>o(F.id)}
                  >
                    ${F.icon?`${F.icon} `:""}${F.id}
                  </button>`:l`<span class="detail-dep"
                    >${F.icon?`${F.icon} `:""}${F.id}</span
                  >`)}
          </div>`}
    `}function p(d){let k=d.metadata||{},v=d.workflow||{},F=v.stages||{},J=F.spec&&F.spec.stale,ye=F.impl&&F.impl.stale,it=F.plan||null,qe=v.route_source==="derived",Nt=v.route||k.route||"\u2014";return l`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${qe?" detail-kv__v--derived":""}"
          title=${qe?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${qe?"unset":Nt}</span
        >
      </div>
      ${v.route!=="quick_fix"||Object.hasOwn(k,"spec_review")?l`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${k.spec_review||"\uC5C6\uC74C"}${J?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${v.route==="full_plan"?l`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${it?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${it?.approval_receipt||"\uC5C6\uC74C"}${it?.approval_state==="stale"?" \xB7 stale":it?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${v.route!=="quick_fix"||Object.hasOwn(k,"impl_review")?l`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${k.impl_review||"\uC5C6\uC74C"}${ye?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${v.exec_receipt?l`<div class="detail-kv">
            <span class="detail-kv__k">exec_receipt</span>
            <span class="detail-kv__v detail-kv__v--wrap"
              >${`${v.exec_receipt.kind}:${v.exec_receipt.actor}@${v.exec_receipt.sha}`}</span
            >
          </div>`:""}
      ${v.impl_entry?l`<div class="detail-kv">
            <span class="detail-kv__k">impl_entry</span>
            <span class="detail-kv__v"
              >${`${v.impl_entry.actor}@${v.impl_entry.sha}`}</span
            >
          </div>`:""}
      ${k.pr_url?l`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${k.pr_url}</span>
          </div>`:""}
    `}let y={route:["quick_fix","spec_backed","full_plan"]};async function N(d,k){let v=k.target.value;if(d==="route"&&f&&f.metadata&&f.metadata.route==="full_plan"&&v!=="full_plan"&&!window.confirm(`full_plan \u2192 ${v||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){m();return}await oe("update-workflow-meta",{id:u,key:d,value:v},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),m()}function se(d){let k=d.metadata||{};return l` ${((F,J)=>{let ye=y[F],it=typeof k[F]=="string"?k[F]:"";return l`<div class="detail-kv">
        <span class="detail-kv__k">${F}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${F}
          data-edit=${`wfmeta-${F}`}
          @change=${qe=>N(F,qe)}
        >
          <option value="" ?selected=${!ye.includes(it)}>
            ${J}
          </option>
          ${ye.map(qe=>l`<option value=${qe} ?selected=${it===qe}>${qe}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function j(d,k){return $?l`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${U}
            @input=${Te}
            @keydown=${v=>bt(v,Qe,Ke,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${Qe}
            >
              저장
            </button>
            <button
              type="button"
              class="detail-edit__cancel"
              data-edit="title-cancel"
              @click=${Ke}
            >
              취소
            </button>
          </div>
        </div>
      `:l`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${d}</h2>
        ${ht(k).map(v=>l`<span class="detail-usage-total" title=${v.tooltip}
              >${v.label}</span
            >`)}
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${te}
        >
          ✎
        </button>
      </div>
    `}function g(d){let k=pt(d.created_at),v=pt(d.updated_at);return!k&&!v?l``:l`
      ${k?l`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${k}</span>
          </div>`:""}
      ${v?l`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${v}</span>
          </div>`:""}
    `}function A(d,k){return l`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${Zt}
        >
          ${Lp.map(v=>l`<option value=${v} ?selected=${v===d}>${v}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${zt}
        >
          ${Op.map(v=>l`<option value=${String(v)} ?selected=${v===k}>
                P${v}
              </option>`)}
        </select>
      </div>
    `}function Z(d){return l`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${E?"":l`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${$e}
            >
              ✎
            </button>`}
      </div>
      ${E?l`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${x}
              @input=${Ye}
              @keydown=${k=>bt(k,dt,we,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${dt}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${we}
              >
                취소
              </button>
            </div>
          </div>`:l`<div class="detail-overlay__desc">
            ${d||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function ue(d){let k=typeof d.notes=="string"?d.notes:"";return k.trim().length===0?l``:l`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${k}</div>
    `}function Pe(d){let k=Array.isArray(d.labels)?d.labels:[];return l`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${k.map(v=>l`<span class="detail-label-chip"
              >${v}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${v}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+v}
                @click=${()=>Ot(v)}
              >
                ×
              </button></span
            >`)}
        <span class="detail-label-add">
          <input
            class="detail-label-add__input"
            aria-label="라벨 추가"
            placeholder="라벨 추가"
            .value=${V}
            @input=${Xt}
            @keydown=${xt}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${gt}
          >
            추가
          </button>
        </span>
      </div>
    `}function He(){if(!u)return l``;let d=f||{},k=String(d.id||u),v=d.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",F=Le(),J=d.status||"open",ye=typeof d.priority=="number"?Math.max(0,Math.min(4,d.priority)):"",it=d.description||"",qe={...d,metadata:{...d.metadata||{},..._}};return l`
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
            @click=${st}
          >
            ${k}
          </button>
          ${j(v,F)}
          ${A(J,ye)} ${g(d)}
          ${Z(it)}
          ${Hi(O,xe,{expanded:ae,draft:L,sending:pe,error:z})}
          ${ue(d)} ${Pe(d)} ${vt(d)}
          ${p(d)} ${se(d)}
          ${Ui(d,Dt)}
          ${Ne()}
          ${Xi(qe,Mt,X(),w(),ce())}
          ${sl({expanded:K,loading:Re,error:me,data:fe},{onToggle:je})}
          ${nl(Me(),q,{total:F,expanded:Ie})}
        </div>
      </div>
    `}function m(){Ue(He(),e)}return{load(d){d!==u&&(_={},b="",ee(),be(),De()),u=d,f=null,rt()},clear(){u=null,f=null,_={},b="",T=!1,ee(),be(),De(),ge.close(),G.close(),Ue(l``,e)},destroy(){et&&(et(),et=null),Fe&&(Fe(),Fe=null),ut&&(ut(),ut=null),document.removeEventListener("keydown",_t),ge.destroy(),_e.parentNode&&_e.parentNode.removeChild(_e),G.destroy(),he.parentNode&&he.parentNode.removeChild(he),u=null,f=null,b="",T=!1,be(),De(),Ue(l``,e)}}}var Dp=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function al(e,t){return Fs(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function Mp(e,t,r){if(!r)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(o=>o!==e)};let n=t.hidden_labels.filter(o=>o!==e);return t.hidden_prefixes.some(o=>o.length>0&&e.startsWith(o))?{hidden_labels:n,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:n}}function il(e,t){let{policyStore:r,transport:n,labelOptions:s}=t,o=document.createElement("dialog");o.id="display-settings-dialog",o.className="display-settings",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),e.appendChild(o);let a="";async function i(S){let z=r.get();if(z)try{let L=await n("display-policy-set",{expected_revision:z.revision,policy:S(z)});c(L),L&&L.conflict&&L.policy&&(L=await n("display-policy-set",{expected_revision:L.policy.revision,policy:S(L.policy)}),c(L)),L&&L.conflict&&Q("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC","error",4e3)}catch{Q("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function c(S){S&&S.policy&&typeof S.policy=="object"&&r.set(S.policy)}function u(S){let z=r.get();if(!z)return;let L=al(S,z)!=="shown";i(pe=>Mp(S,pe,L))}function f(){let S=a.trim();S.length!==0&&(a="",i(z=>z.hidden_prefixes.includes(S)?{hidden_prefixes:z.hidden_prefixes}:{hidden_prefixes:[...z.hidden_prefixes,S]}),U())}function _(S){i(z=>({hidden_prefixes:z.hidden_prefixes.filter(L=>L!==S)}))}function b(S){let z=r.get();if(!z)return;let L=z.chips[S]===!1;i(()=>({chips:{[S]:L}}))}function T(S){let z=s();return l`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">라벨 표시</h3>
        <p class="display-settings__hint">
          라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을
          누르면 그 라벨만 예외로 다시 표시됩니다.
        </p>
        ${z.length===0?l`<div class="display-settings__empty">라벨 없음</div>`:l`<div class="display-settings__pills">
              ${z.map(L=>{let pe=al(L,S);return l`<button
                  type="button"
                  class=${`display-settings__pill display-settings__pill--${pe}`}
                  data-label=${L}
                  data-state=${pe}
                  @click=${()=>u(L)}
                >
                  ${L}
                </button>`})}
            </div>`}
      </section>
    `}function $(S){return l`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">숨김 prefix</h3>
        <div class="display-settings__prefixes">
          ${S.hidden_prefixes.map(z=>l`<span class="display-settings__prefix">
                ${z}
                <button
                  type="button"
                  class="display-settings__prefix-remove"
                  aria-label=${`${z} \uADDC\uCE59 \uC81C\uAC70`}
                  @click=${()=>_(z)}
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
            @input=${z=>{a=String(z.target.value||"")}}
          />
          <button type="button" @click=${f}>추가</button>
        </div>
      </section>
    `}function E(S){return l`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">카드 표시 요소</h3>
        <div class="display-settings__toggles">
          ${Dp.map(([z,L])=>l`<label class="display-settings__toggle">
                <input
                  type="checkbox"
                  data-chip=${z}
                  .checked=${S.chips[z]!==!1}
                  @change=${()=>b(z)}
                />
                <span>${L}</span>
              </label>`)}
        </div>
      </section>
    `}function U(){let S=r.get();Ue(l`
        <div class="display-settings__container">
          <header class="display-settings__header">
            <div class="display-settings__title">표시 설정</div>
            <button
              type="button"
              class="display-settings__close"
              aria-label="닫기"
              @click=${D}
            >
              ×
            </button>
          </header>
          <div class="display-settings__body">
            ${S?l`${T(S)} ${$(S)}
                ${E(S)}`:l`<div class="display-settings__empty">
                  표시 정책을 불러오는 중…
                </div>`}
          </div>
        </div>
      `,o)}let x=!1,V=()=>{x=!1};o.addEventListener("close",V),o.addEventListener("cancel",V);let ee=null;r.subscribe&&(ee=r.subscribe(()=>{x&&U()}));function O(){x||(a="",x=!0,U(),typeof o.showModal=="function"?o.showModal():o.setAttribute("open",""))}function D(){x&&(x=!1,typeof o.close=="function"?o.close():o.removeAttribute("open"))}return{open:O,close:D,destroy(){x=!1,o.removeEventListener("close",V),o.removeEventListener("cancel",V),ee&&(ee(),ee=null),o.remove()}}}function ll(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let r=t.querySelector("#fatal-error-title"),n=t.querySelector("#fatal-error-message"),s=t.querySelector("#fatal-error-detail"),o=t.querySelector("#fatal-error-reload"),a=t.querySelector("#fatal-error-close"),i=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},c=(u,f,_="")=>{r&&(r.textContent=u||"Unexpected Error"),n&&(n.textContent=f||"An unrecoverable error occurred.");let b=typeof _=="string"?_.trim():"";if(s&&(b.length>0?(s.textContent=b,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),a&&a.addEventListener("click",()=>i()),t.addEventListener("cancel",u=>{u.preventDefault(),i()}),{open:c,close:i,getElement(){return t}}}function Np(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";if(e<6e4)return`${Math.round(e/1e3)}\uCD08`;let t=e/6e4;return`${Number.isInteger(t)?t:Math.round(t*10)/10}\uBD84`}function Pp(e){return Array.isArray(e)?e.filter(t=>typeof t=="string").join(" "):""}function cs(e,t){let{queueStore:r,presetStore:n,transport:s,getWorkspacePath:o}=t,a=document.createElement("dialog");a.id="worker-exec-defaults-dialog",a.className="exec-defaults",a.setAttribute("role","dialog"),a.setAttribute("aria-modal","true"),e.appendChild(a);let i=null,c=!1;function u(){return r&&r.get()||{revision:0,exec_defaults:{}}}function f(){let w=u();return typeof w.revision=="number"?w.revision:0}function _(){let w=n?n.get():null;return!w||typeof w.revision!="number"?null:{revision:w.revision,presets:Array.isArray(w.presets)?w.presets:[]}}function b(w){n&&w&&typeof w.revision=="number"&&Array.isArray(w.presets)&&n.set({revision:w.revision,presets:w.presets})}function T(w){w&&w.queue&&r&&r.set(w.queue)}function $(){return u().runner_catalog??null}let E=null;function U(){if(E!==null)return E;let w=u().default_exec_preset_id;return typeof w=="string"&&w.length>0?w:null}async function x(w){if(!s)return;let C=_();if(!C)return;E=w||"";let W=D(w);if(Le(),!W.viable){Q(W.missing?"\uC120\uD0DD\uD55C \uD504\uB9AC\uC14B\uC744 \uCC3E\uC744 \uC218 \uC5C6\uC5B4 \uC800\uC7A5\uD558\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.":"\uBE44\uD638\uD658 \uD504\uB9AC\uC14B\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4 \uAE30\uBCF8\uAC12\uC73C\uB85C \uC800\uC7A5\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.","error",4e3),E=null,Le();return}try{let le=await s("worker-queue-set-default-exec-preset",{preset_id:w||null,expected_queue_revision:f(),expected_preset_revision:C.revision});T(le),le&&le.presets&&n&&n.set(le.presets),le&&le.conflict?Q("\uAE30\uBCF8 \uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uC120\uD0DD\uC744 \uAC80\uD1A0\uD55C \uB4A4 \uB2E4\uC2DC \uC800\uC7A5\uD558\uC138\uC694.","error",4e3):le&&le.applied||Q("\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4 \uAE30\uBCF8 \uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328","error",4e3)}catch{Q("\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4 \uAE30\uBCF8 \uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328","error",4e3)}E=null,Le()}function V(w){i={id:w.id,name:w.name,settings:{...w.settings||{}}},z(),c=!1,Le()}function ee(){i={id:null,name:"",settings:{}},c=!1,Le()}function O(w){let C=w&&w.settings&&typeof w.settings=="object"?w.settings:{},W=le=>typeof C[le]=="string"?C[le]:le==="impl_runtime"&&typeof C.impl_model=="string"&&ar($(),C.impl_model)||"";return Wr({selectedOf:W,effectiveOf:W,runner_catalog:$()}).some(le=>le.groups.some(ne=>ne.options.some(Oe=>Oe.value===le.selected&&Oe.label.endsWith("(\uBE44\uD638\uD658)"))))}function D(w){if(!w)return{viable:!0,missing:!1,incompatible:!1,preset:null};let W=_()?.presets.find(ne=>ne.id===w);if(!W||W.migration_pending===!0)return{viable:!1,missing:!0,incompatible:!1,preset:null};let le=W.compatible===!1||O(W);return{viable:!le,missing:!1,incompatible:le,preset:W}}function S(){let w=i?.settings.orchestration_model;return typeof w!="string"?null:ar($(),w)}function z(){if(!i)return;let w=ls({impl_runtime:i.settings.impl_runtime||"",impl_model:i.settings.impl_model||"",impl_effort:i.settings.impl_effort||""},$(),S());for(let C of["impl_runtime","impl_model","impl_effort"])w[C]?i.settings[C]=w[C]:delete i.settings[C]}function L(w){let C=w&&w.settings&&typeof w.settings=="object"?w.settings:{},W=Rr.filter(ne=>typeof C[ne]=="string").length,le=Rr.filter(ne=>typeof C[ne]=="string").map(ne=>`${fo[ne]?.title||ne}: ${C[ne]}`);return{count:`${W}/12 \uC9C0\uC815`,choices:le.length>0?le.join(" \xB7 "):"\uBAA8\uB4E0 \uD56D\uBAA9 \uAE30\uBCF8\uAC12"}}async function pe(w){if(!s||!window.confirm(`\u201C${w.name}\u201D \uD504\uB9AC\uC14B\uC744 \uC0AD\uC81C\uD560\uAE4C\uC694? \uC774\uBBF8 \uC801\uC6A9\uB41C \uC774\uC288\uB294 \uBCC0\uACBD\uB418\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.`))return;let C=_();if(C)try{let W=await s("exec-preset-delete",{expected_revision:C.revision,id:w.id});b(W),W&&W.conflict&&Q("\uD504\uB9AC\uC14B\uC774 \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uB2E4\uC2DC \uD655\uC778\uD558\uC138\uC694.","error",4e3)}catch{Q("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328","error",4e3)}}async function ve(w=!1){if(!s||!i)return;let C=_();if(!C)return;let W=w||i.id===null,le={expected_revision:C.revision,...W?{}:{id:i.id},name:i.name,settings:{...i.settings}};try{let ne=await s(W?"exec-preset-create":"exec-preset-update",le);if(b(ne),ne&&ne.conflict){c=!0,Le();return}if(ne&&ne.applied){i=null,c=!1,Le();return}Q("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328","error",4e3)}catch{Q("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function ae(w){return l`<div class="exec-defaults__row exec-preset-editor__row">
      <span class="exec-defaults__k">${mo(w.key)}</span>
      <select
        class="exec-defaults__sel"
        data-preset-key=${w.key}
        ?disabled=${w.disabled}
        @change=${C=>{if(!i)return;let W=C.target.value;W?i.settings[w.key]=W:delete i.settings[w.key],(w.key==="impl_runtime"||w.key==="impl_model"||w.key==="impl_effort"||w.key==="orchestration_model")&&z(),c=!1,Le()}}
      >
        ${is(w.groups,w.selected,_o[w.key]||"(\uAE30\uBCF8)")}
      </select>
    </div>`}function be(){if(!i)return"";let w=Ne=>typeof i?.settings[Ne]=="string"?i.settings[Ne]:"",C=Wr({selectedOf:w,effectiveOf:w,runner_catalog:$(),controller_runtime:S()}),W=hn.flatMap(Ne=>Ne.keys).filter(Ne=>typeof i?.settings[Ne]=="string").length,le=Ne=>{let et=C.find(Fe=>Fe.key===Ne);return et?ae(et):""},ne=_(),Oe=i.id!==null&&ne!==null&&!ne.presets.some(Ne=>Ne.id===i?.id);return l`<div class="exec-preset-editor" data-preset-editor>
      <label class="exec-preset-editor__name">
        프리셋 이름
        <input
          type="text"
          value=${i.name}
          data-preset-name
          @input=${Ne=>{i&&(i.name=Ne.target.value,c=!1)}}
        />
      </label>
      ${c?l`<p class="exec-preset-editor__conflict" data-preset-conflict>
            다른 곳에서 변경됨 — 최신 목록을 확인한 뒤 다시 저장하세요.
          </p>`:""}
      ${Oe?l`<p class="exec-preset-editor__conflict">
            편집하던 프리셋이 다른 곳에서 삭제됐습니다.
          </p>`:""}
      <section class="exec-preset-editor__core" data-preset-core>
        ${po.map(le)}
      </section>
      <details class="exec-preset-editor__advanced" data-preset-advanced>
        <summary>고급 설정 — ${W}개 변경됨</summary>
        ${hn.map(Ne=>l`<section
              class="exec-preset-editor__group"
              data-preset-group=${Ne.id}
            >
              <h4>${Ne.label}</h4>
              ${Ne.keys.map(le)}
            </section>`)}
      </details>
      <div class="exec-preset-editor__actions">
        ${Oe?l`<button
              type="button"
              data-preset-save-as-new
              @click=${()=>{ve(!0)}}
            >
              새 프리셋으로 저장
            </button>`:l`<button
              type="button"
              data-preset-save
              @click=${()=>{ve(!1)}}
            >
              저장
            </button>`}
        <button
          type="button"
          data-preset-cancel
          @click=${()=>{i=null,c=!1,Le()}}
        >
          취소
        </button>
      </div>
    </div>`}function Ce(){let w=_(),C=w?w.presets.filter(ne=>ne?.migration_pending!==!0):[],W=U()||"",le=D(W);return l`<section class="exec-presets" data-exec-presets>
      <div class="exec-presets__heading">
        <h3>공용 실행 프리셋</h3>
        <button type="button" data-preset-new @click=${ee}>
          + 새 프리셋
        </button>
      </div>
      <p class="exec-defaults__hint">
        모든 워크스페이스에서 공유하며, 이슈에 적용하면 값이 복사됩니다.
      </p>
      ${w===null?l`<p class="exec-presets__empty">프리셋을 불러오는 중…</p>`:C.length===0?l`<p class="exec-presets__empty">
              아직 공용 프리셋이 없습니다.
            </p>`:C.map(ne=>{let Oe=L(ne),Ne=D(ne.id),et=ne.id===W,Fe=Ne.missing?"\uD504\uB9AC\uC14B\uC744 \uCC3E\uC744 \uC218 \uC5C6\uC5B4 \uAE30\uBCF8\uC73C\uB85C \uC9C0\uC815\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":Ne.incompatible?"\uBE44\uD638\uD658 \uD504\uB9AC\uC14B\uC740 \uAE30\uBCF8\uC73C\uB85C \uC9C0\uC815\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"",ut=typeof ne.reference_count=="number",_t=ut?ne.reference_count:null,rt=Array.isArray(ne.reference_summary)?ne.reference_summary.map(nt=>nt?.display_name||nt?.workspace_key).filter(Boolean).join(", "):"";return l`<article
                class="exec-preset-card"
                data-preset-id=${ne.id}
              >
                <div class="exec-preset-card__main">
                  <strong>${ne.name}</strong>
                  ${et?l`<span
                        class="exec-defaults__vd-badge"
                        data-workspace-default-badge
                        >워크스페이스 기본</span
                      >`:""}
                  <span>${Oe.count}</span>
                  <span data-preset-references=${ne.id}
                    >${ut?`\uCC38\uC870 ${_t}\uAC1C`:"\uCC38\uC870 \uD655\uC778 \uBD88\uAC00"}</span
                  >
                  ${Ne.incompatible?l`<span data-preset-incompatible>비호환</span>`:""}
                  <small>${Oe.choices}</small>
                  ${rt?l`<small data-preset-impact=${ne.id}
                        >업데이트 영향: ${rt}</small
                      >`:""}
                </div>
                <div class="exec-preset-card__actions">
                  ${et?l`<button
                        type="button"
                        data-workspace-preset-release=${ne.id}
                        @click=${()=>{x("")}}
                      >
                        기본 해제
                      </button>`:l`<button
                        type="button"
                        data-workspace-preset-assign=${ne.id}
                        ?disabled=${!Ne.viable}
                        title=${Fe}
                        @click=${()=>{x(ne.id)}}
                      >
                        기본으로
                      </button>`}
                  <button
                    type="button"
                    data-preset-edit=${ne.id}
                    @click=${()=>V(ne)}
                  >
                    편집
                  </button>
                  <button
                    type="button"
                    data-preset-delete=${ne.id}
                    ?disabled=${_t===null||_t>0||ne.reference_scan_complete===!1}
                    title=${_t===null?"\uCC38\uC870 \uC218\uB97C \uD655\uC778\uD560 \uC218 \uC5C6\uC5B4 \uC0AD\uC81C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":_t>0?"\uCC38\uC870 \uC911\uC778 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC788\uC5B4 \uC0AD\uC81C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":ne.reference_scan_complete===!1?"\uCC38\uC870 \uC2A4\uCE94\uC774 \uC644\uB8CC\uB418\uC9C0 \uC54A\uC544 \uC0AD\uC81C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":""}
                    @click=${()=>{pe(ne)}}
                  >
                    삭제
                  </button>
                </div>
              </article>`})}
      ${w!==null&&W&&le.missing?l`<article class="exec-preset-card" data-workspace-preset-missing>
            <div class="exec-preset-card__main">
              <strong>워크스페이스 기본 프리셋을 찾을 수 없습니다</strong>
              <span class="exec-defaults__vd-badge" data-workspace-default-badge
                >워크스페이스 기본</span
              >
              <small>
                참조 ${W} · 실행이 차단됩니다. 기본을 해제하거나 다른
                프리셋을 지정하세요.
              </small>
            </div>
            <div class="exec-preset-card__actions">
              <button
                type="button"
                data-workspace-preset-release=${W}
                @click=${()=>{x("")}}
              >
                기본 해제
              </button>
            </div>
          </article>`:""}
      ${be()}
    </section>`}function Ge(){let w=u().workspace_info;return w&&typeof w=="object"?w:{}}function Xe(w,C){return l`<span
      class="exec-defaults__vd-badge exec-defaults__vd-badge--${w}"
      >${C}</span
    >`}function ze(w){let C=w?Pp(w.cmd):"",W=w?Np(w.timeout_ms):"",le=o&&o()||"<workspace \uACBD\uB85C>";return l`<div class="exec-defaults__vd-group" data-vd="verify">
      <div class="exec-defaults__vd-label">머지 전 검증 (verify)</div>
      ${C?l`<div class="exec-defaults__vd-line">
            <span class="exec-defaults__vd-cmd">${C}</span>
            ${Xe("config","config")}
            ${W?l`<span class="exec-defaults__vd-meta"
                  >timeout ${W}</span
                >`:""}
          </div>`:l`<div class="exec-defaults__vd-line exec-defaults__vd-absent">
            ${Xe("absent","\uC548 \uD568")} 검증 없음 —
            <span class="exec-defaults__vd-cmd"
              >[worker.verify."${le}"]</span
            >
            섹션으로 정의
          </div>`}
    </div>`}let Se=!1,xe=!1,_e=!1,ge=null;async function he(){if(s){xe=!0,_e=!1,Le();try{let w=await Promise.resolve(s("get-worker-system-prompt",{}));!w||typeof w!="object"||Array.isArray(w)?_e=!0:ge=w}catch{_e=!0}finally{xe=!1,Le()}}}function G(){if(Se=!Se,Se&&!ge){he();return}Le()}function K(){return l`<section class="exec-defaults__sp" data-seam="system-prompt">
      <p class="exec-defaults__vd-title">
        워커 시스템 프롬프트
        <span class="exec-defaults__vd-ro">읽기 전용 — 서버가 조립</span>
        <button
          type="button"
          class="exec-defaults__sp-toggle"
          data-seam="system-prompt-toggle"
          aria-expanded=${Se?"true":"false"}
          @click=${G}
        >
          ${Se?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
        </button>
      </p>
      ${Se?Re():""}
    </section>`}function Re(){let w=zr({loading:xe,error:_e});if(w)return w;if(!ge)return"";let C=Array.isArray(ge.variants)?ge.variants:[];return l`<div class="exec-defaults__sp-body">
      ${ge.target_base_placeholder?l`<div class="prompt-block__meta">
            \`${ge.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${C.map(W=>l`<div class="exec-defaults__sp-variant" data-variant=${W.key}>
            <div class="exec-defaults__sp-cond">${W.condition}</div>
            ${or(W.label,W.system_prompt)}
          </div>`)}
    </div>`}function me(w){if(typeof w!="number"||!Number.isFinite(w))return"";let C=w/6e4;return Number.isInteger(C)?`timeout ${C}\uBD84`:`timeout ${Math.round(w/1e3)}\uCD08`}function fe(w){let C=me(w);return C?Xe("config",C):""}function I(w){let C=typeof w.base_sha=="string"?w.base_sha:"",W=`${w.source_path||"repo-ops/config.toml"} @ ${w.base_ref||"?"}${C?`@${C.slice(0,7)}`:""}`;return l`<section class="exec-defaults__vd" data-seam="repo-ops">
      <p class="exec-defaults__vd-title">
        저장소 작업 선언
        <span class="exec-defaults__vd-src">${W}</span>
      </p>
      <div class="exec-defaults__lane" data-lane="verify">
        <span class="exec-defaults__lane-k">머지 전 검증</span>
        <span class="exec-defaults__lane-v"
          >${w.verify?l`<code class="exec-defaults__vd-cmd"
                  >${w.verify.script}</code
                >${fe(w.verify.timeout_ms)}`:l`선언 없음${Xe("absent","verify \uC5C6\uC774 \uD310\uC815")}`}</span
        >
        <span class="exec-defaults__lane-d"
          >${w.verify?"\uBA38\uC9C0 \uC804\uC5D0 \uC774 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uD1B5\uACFC\uD574\uC57C \uC790\uACA9\uC744 \uC5BB\uC2B5\uB2C8\uB2E4.":"\uBA38\uC9C0 \uC790\uACA9\uC740 PR/base/head \uC2E0\uC120\uB3C4\xB7mergeability\xB7\uB9AC\uBDF0 \uC601\uC218\uC99D\uC73C\uB85C\uB9CC \uD310\uC815\uD569\uB2C8\uB2E4."}</span
        >
      </div>
      <div class="exec-defaults__lane" data-lane="deploy">
        <span class="exec-defaults__lane-k">머지 후 배포</span>
        <span class="exec-defaults__lane-v"
          >${w.deploy?l`<code class="exec-defaults__vd-cmd"
                  >${w.deploy.script}</code
                >${fe(w.deploy.timeout_ms)}`:l`선언 없음${Xe("absent","\uBC30\uD3EC \uC5C6\uC74C")}`}</span
        >
        <span class="exec-defaults__lane-d"
          >${w.deploy?l`Worker가 <code>.worktrees/.repo-ops-deploy</code>에서 대상
                SHA로 정렬한 뒤 1회 실행합니다.`:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC \uB2E8\uACC4 \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4."}</span
        >
      </div>
    </section>`}function R(w){let C=w.repo_ops&&typeof w.repo_ops=="object"?w.repo_ops:null;return C&&C.status==="resolved"?I(C):C&&(C.status==="pending"||C.status==="error")?l`<section class="exec-defaults__vd" data-seam="repo-ops">
        <p class="exec-defaults__vd-title">
          저장소 작업 선언
          <span class="exec-defaults__vd-ro">읽기 전용 — config에서 정의</span>
        </p>
        <div
          class="exec-defaults__vd-line exec-defaults__vd-absent"
          data-seam="repo-ops-status"
        >
          ${C.status==="pending"?"\uC120\uC5B8 \uD655\uC778 \uC911":l`선언 읽기
              실패${C.error_code?l` — <code>${C.error_code}</code>`:""}`}
        </div>
      </section>`:l`<section class="exec-defaults__vd">
      <p class="exec-defaults__vd-title">
        검증 설정
        <span class="exec-defaults__vd-ro">읽기 전용 — config에서 정의</span>
      </p>
      ${ze(w.verify_cmd)}
    </section>`}async function ie(w){if(!s)return;let C=await s("worker-auto-repair-toggle",{on:w,expected_revision:f()});if(T(C),C&&C.conflict){let W=await s("worker-auto-repair-toggle",{on:w,expected_revision:f()});T(W)}Le()}let De={owned_deploy_worktree_fetch_detached_alignment_recreate:"\uC804\uC6A9 \uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC \uC815\uB82C\xB7\uBCF5\uAD6C",recovered_pre_execution_fetch_timeout_retry_once:"fetch \uD0C0\uC784\uC544\uC6C3 1\uD68C \uBCF5\uAD6C",repo_serial_lock_wait:"\uC800\uC7A5\uC18C \uC21C\uCC28 \uC2E4\uD589 \uB300\uAE30",restart_operation_adoption:"\uC7AC\uC2DC\uC791 \uD6C4 \uC791\uC5C5 \uC778\uACC4",exact_input_exit_zero_evidence_adoption:"\uB3D9\uC77C \uC785\uB825 \uC131\uACF5 \uC99D\uAC70 \uC778\uACC4",descendant_success_covers_ancestor_rows:"\uCD5C\uC2E0 SHA \uC131\uACF5\uC774 \uC774\uC804 \uD589 \uCEE4\uBC84",owned_verify_candidate_cleanup:"\uAC80\uC99D \uC784\uC2DC \uCCB4\uD06C\uC544\uC6C3 \uC815\uB9AC",script_retry:"\uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4",auto_repair_session:"\uC790\uB3D9 \uD574\uACB0 \uC138\uC158",user_triggered_session:"\uC0AC\uC6A9\uC790 \uD574\uACB0 \uC138\uC158",automatic:"\uC790\uB3D9",user_action_only:"\uC0AC\uC6A9\uC790 \uD074\uB9AD",script_identity_present:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC788\uC744 \uB54C\uB9CC",per_completion_chain:"\uC644\uB8CC \uCCB4\uC778\uB2F9",unbounded:"\uD69F\uC218 \uC81C\uD55C \uC5C6\uC74C",bounded_single_script_retry_exceeded:"\uB2E8\uC77C \uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4 \uD55C\uB3C4 \uCD08\uACFC",baseline_failure_ignore:"\uAE30\uC874 \uC2E4\uD328 \uBB34\uC2DC",config_or_script_deletion_to_bypass_gate:"\uC124\uC815\xB7\uC2A4\uD06C\uB9BD\uD2B8 \uC0AD\uC81C\uB85C \uAC8C\uC774\uD2B8 \uC6B0\uD68C",credential_entry:"\uC790\uACA9\uC99D\uBA85 \uC785\uB825\xB7\uCD9C\uB825",destructive_action:"\uD30C\uAD34\uC801 \uC791\uC5C5",history_rewrite:"\uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131",agent_self_report_as_success:"\uC138\uC158 \uC790\uAE30\uBCF4\uACE0\uB97C \uC131\uACF5 \uCC98\uB9AC",unbounded_repair_session_retry:"\uBB34\uD55C \uD574\uACB0 \uC138\uC158 \uBC18\uBCF5"};function Ae(w,C,W){return l`<div class="exec-defaults__policy-group" data-policy=${W}>
      <div class="exec-defaults__policy-label">${w}</div>
      <ul class="exec-defaults__policy-list">
        ${C.map(le=>l`<li data-token=${le}>
              ${De[le]||le}
            </li>`)}
      </ul>
    </div>`}function je(w){return l`<div
      class="exec-defaults__policy-group"
      data-policy="resolution-ladder"
    >
      <div class="exec-defaults__policy-label">해결 사다리</div>
      <ol class="exec-defaults__policy-list">
        ${w.map(C=>{let W=[De[C.trigger]||C.trigger];return Number.isInteger(C.attempts_per_operation_attempt)?W.push(`operation\uB2F9 ${C.attempts_per_operation_attempt}\uD68C`):Number.isInteger(C.attempts)?W.push(`${De[C.budget]||C.budget} ${C.attempts}\uD68C`):Number.isInteger(C.sessions_per_user_action)&&W.push(`${C.sessions_per_user_action}\uD68C`,De[C.user_actions]||C.user_actions),C.applies_when&&W.push(De[C.applies_when]||C.applies_when),l`<li data-token=${C.id}>
            <strong>${De[C.id]||C.id}</strong>
            <span>${W.filter(Boolean).join(" \xB7 ")}</span>
          </li>`})}
      </ol>
    </div>`}function Me(){let w=u(),C=w.auto_repair!==!1,W=w.repo_operation_policy&&typeof w.repo_operation_policy=="object"?w.repo_operation_policy:null,le=Array.isArray(w.repo_operations)?w.repo_operations:[],ne=le.find(Fe=>Fe.state==="repairing"),Oe=le.filter(Fe=>Fe.state==="failed"||Fe.state==="repairing"),Ne=Oe.length?Math.min(...Oe.map(Fe=>typeof Fe.repair?.remaining=="number"?Fe.repair.remaining:0)):W?.auto_repair?.resolution_ladder?.find(Fe=>Fe.id==="auto_repair_session")?.attempts??1,et=Array.isArray(W?.auto_repair?.resolution_ladder)?W.auto_repair.resolution_ladder:[];return l`<section class="exec-defaults__repair" data-seam="auto-repair">
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
          .checked=${C}
          @change=${Fe=>{ie(Fe.target.checked)}}
        />
        검증·배포 실패를 자동으로 해결 시도
      </label>
      <div class="exec-defaults__repair-state">
        <span class="exec-defaults__repair-value" data-seam="auto-repair-value"
          >${C?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}</span
        >
        <span
          class="exec-defaults__repair-budget"
          data-seam="auto-repair-budget"
          >남은 자동 해결 ${Ne}회</span
        >
        <span
          class="exec-defaults__repair-session"
          data-seam="auto-repair-session"
          >${ne?`\uD574\uACB0 \uC138\uC158 \uC2E4\uD589 \uC911 \xB7 ${ne.repair?.owner_bead||ne.operation_id}`:"\uC2E4\uD589 \uC911\uC778 \uD574\uACB0 \uC138\uC158 \uC5C6\uC74C"}</span
        >
      </div>
      ${W?l`<details class="exec-defaults__policy" data-seam="policy-lists">
            <summary>
              Worker 자동 처리 기준
              <span class="exec-defaults__policy-count"
                >자동 ${(W.worker_automatic||[]).length} · 해결 사다리
                ${et.length} · 금지
                ${(W.never_automatic||[]).length}</span
              >
            </summary>
            ${Ae("Worker\uAC00 \uC790\uB3D9 \uCC98\uB9AC",W.worker_automatic||[],"worker-automatic")}
            ${W.supported===!1||W.schema_version!==2?l`<div
                  class="exec-defaults__policy-group"
                  data-policy="resolution-ladder"
                >
                  ${`\uACC4\uC57D \uC2A4\uD0A4\uB9C8 \uBD88\uC77C\uCE58 \u2014 \uC790\uB3D9 \uD574\uACB0\uC774 \uC815\uC9C0\uB418\uC5C8\uC2B5\uB2C8\uB2E4 (v${W.schema_version})`}
                </div>`:je(et)}
            ${Ae("\uC790\uB3D9\uC73C\uB85C \uD558\uC9C0 \uC54A\uC74C",W.never_automatic||[],"never-automatic")}
          </details>`:""}
    </section>`}function Le(){Ue(l`
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
            ${Ce()} ${R(Ge())}
            ${Me()} ${K()}
          </div>
        </div>
      `,a)}let Ie=!1,Je=()=>{Ie=!1},M=w=>{w.target===w.currentTarget&&ce()};a.addEventListener("close",Je),a.addEventListener("cancel",Je),a.addEventListener("click",M);let H=null;r&&r.subscribe&&(H=r.subscribe(()=>{Ie&&Le()}));let q=null;n&&n.subscribe&&(q=n.subscribe(()=>{Ie&&Le()}));function X(){Ie||(Ie=!0,Le(),typeof a.showModal=="function"?a.showModal():a.setAttribute("open",""))}function ce(){Ie&&(Ie=!1,typeof a.close=="function"?a.close():a.removeAttribute("open"))}return{open:X,close:ce,destroy(){Ie=!1,a.removeEventListener("close",Je),a.removeEventListener("cancel",Je),a.removeEventListener("click",M),H&&(H(),H=null),q&&(q(),q=null),a.remove()}}}function ds(e){return typeof e=="string"&&e.length>=7?e.slice(0,7):"\u2014"}function vo(e){if(typeof e!="number"||!Number.isFinite(e)||e<0)return"\u2014";if(e<1e3)return`${Math.round(e)}ms`;let t=e/1e3;if(t<60)return`${t.toFixed(1)}\uCD08`;let r=Math.floor(t/60);return`${r}\uBD84 ${Math.round(t-r*60)}\uCD08`}function us(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";let t=new Date(e);return`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`}function Fp(e,t){let r=Array.isArray(e)?e:[],n=Array.isArray(t)?t:[];if(r.length===0&&n.length===0)return null;let s=null;for(let i of r)i.kind!=="deploy"||i.state!=="succeeded"||typeof i.target_sha!="string"||(!s||(typeof i.finished_at=="number"?i.finished_at:0)>(typeof s.finished_at=="number"?s.finished_at:0))&&(s=i);let o=r.filter(i=>i.state==="failed"&&!i.dismissed&&!i.superseded_by).length+n.length,a=r.some(i=>i.state==="repairing");return{deploy:s?{sha:ds(s.target_sha),at:typeof s.finished_at=="number"?s.finished_at:null,elapsed_ms:typeof s.elapsed_ms=="number"?s.elapsed_ms:null}:null,unresolved:o,repairing:a,badge:o>0?{tone:"act",label:`\uD574\uACB0 \uD544\uC694 ${o}`}:a?{tone:"live",label:"\uC790\uB3D9 \uD574\uACB0 \uC911"}:{tone:"quiet",label:"\uBAA8\uB450 \uC815\uC0C1"}}}function cl(e,t){let r=Fp(e,t);return r?l`<button
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
            title=${r.deploy.at?pt(r.deploy.at):""}
            >${us(r.deploy.at)}${r.deploy.elapsed_ms!==null?` \xB7 ${vo(r.deploy.elapsed_ms)}`:""}</span
          >
        </span>`:""}
    <span class="worker-repo-strip__spacer"></span>
    <span
      class="worker-repo-strip__badge worker-repo-strip__badge--${r.badge.tone}"
      >${r.badge.label}</span
    >
  </button>`:""}function Gr(e){let t=Tt(e.created_at),r=Tt(e.updated_at);return!t&&!r?"":l`<div class="worker-mini__meta">
    ${t?l`<span title=${`\uC0DD\uC131 ${pt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&r?l`<span>·</span>`:""}${r?l`<span title=${`\uC218\uC815 ${pt(e.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </div>`}function qp(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function bn(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function ps(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function Vt(e,t,r={}){let s=Object.values(e&&typeof e=="object"?e:{}).filter(f=>f&&f.bead_id===t&&f.phase!=="done").sort((f,_)=>(f.requested_at||0)-(_.requested_at||0)).at(-1),o=typeof r.attempt_id=="string"&&r.attempt_id.length>0?r.attempt_id:typeof s?.attempt_id=="string"?s.attempt_id:null,a=r.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":r.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":r.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,i=typeof s?.last_error=="string"?s.last_error:null,c=s?qp(s.phase):null,u=r.merged||s?.mode==="merged_revert"?"merged":"unmerged";return{action:!r.external&&!r.done,enabled:!a&&(!s||!!i),label:i?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:a||(i?`\uD3D0\uAE30 \uC2E4\uD328: ${i} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:s?`${c||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:u==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:o,operation:s||null,progress:c,error:i,confirmation:u}}function ir(e){let t=e.discard;if(!t||!t.operation)return"";let r=t.operation,n=r.backup?.path,s=r.original_pr,o=r.revert_pr;return l`<div
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
  </div>`}function yo(e){let t=e.draggable&&!e.done,r=Array.isArray(e.badges)?e.badges:[],n=ht(e.usage),s=qt(e.usage),o=e.merge_step||null,a=e.lane==="pr_wait"||!!e.revise_action,i=e.lane==="done"&&!a,c=i?Tt(e.done_at):"",u=e.selectable?l`<input
        class="worker-mini__select"
        type="checkbox"
        data-bead-id=${e.id}
        aria-label=${`${e.id} \uC120\uD0DD`}
        .checked=${e.selected===!0}
      />`:"",f=t?l`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",_=e.worker_serial===!0?l`<span class="worker-mini__serial">머지까지 단독</span>`:e.worker_serial===null?l`<span class="worker-mini__serial worker-mini__serial--unknown"
            >실행 방식 확인 중</span
          >`:"",b=e.workspace_name?l`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",T=l`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,$=l`<span class="worker-mini__title">${e.title}</span>`,E=e.pr_url&&e.pr_number?l`<a
          class="worker-mini__pr"
          href=${e.pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="PR 열기"
          >#${e.pr_number} ↗</a
        >`:"",U=e.completion_repair_pr_url&&e.completion_repair_pr_number?l`<a
          class="worker-mini__pr worker-mini__repair-pr"
          href=${e.completion_repair_pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="repair PR 열기"
          >repair #${e.completion_repair_pr_number} ↗</a
        >`:"",x=r.map(be=>be===e.live_badge?l`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${be}</span
        >`:l`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${be===e.completion_badge&&e.completion_title||""}
          >${be}</span
        >`),V=e.reason?l`<span class="worker-mini__reason">${e.reason}</span>`:"",ee=n.length>0?n.map(be=>l`<span class="worker-usage" title=${be.tooltip}
              >${be.label}</span
            >`):s?l`<span class="worker-usage" title=${jr(e.usage)}
            >${s}</span
          >`:"",O=o?l`<span class="merge-step"
        >${o.label}<span class="merge-step__n"
          >${o.index}/${o.total}</span
        ></span
      >`:"",D=e.merge_action?l`<button
        type="button"
        class="worker-mini__merge"
        data-bead-id=${e.id}
        ?disabled=${e.merge_enabled===!1}
        title=${e.merge_title||""}
      >
        ${e.merge_label||"\uBA38\uC9C0"}
      </button>`:"",S=e.cancel_action?l`<button
        type="button"
        class="worker-mini__merge-cancel"
        data-bead-id=${e.id}
        ?disabled=${e.cancel_enabled===!1}
        title=${e.cancel_title||""}
      >
        취소
      </button>`:"",z=e.timeline_action?l`<button
        type="button"
        class="worker-mini__timeline"
        data-bead-id=${e.id}
        title="저장소 작업이 끝나지 않아 머지 액션이 잠겼습니다 — 타임라인에서 원인과 해결 버튼을 볼 수 있습니다"
      >
        저장소 작업 보기
      </button>`:"",L=e.discard,pe=L?.action||e.discard_action?l`<button
          type="button"
          class="worker-mini__discard"
          data-bead-id=${e.id}
          data-attempt-id=${L?.attempt_id||""}
          data-operation-id=${L?.operation?.operation_id||""}
          data-discard-mode=${L?.confirmation||"unmerged"}
          ?disabled=${L?!L.enabled:e.discard_enabled===!1}
          title=${L?L.title:e.discard_enabled===!1?e.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
        >
          ${L?.label||"\uD3D0\uAE30"}
        </button>`:"",ve=e.revise_action?l`<button
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
        </button>`:"",ae=!!(s||o||e.merge_action||e.cancel_action||e.timeline_action||e.discard_action||L?.operation||e.revise_action);return l`<div
    class="worker-mini${a?" worker-mini--card":""}${e.selected?" worker-mini--selected":""}${t?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${o?" worker-mini--merging":""}${e.external?" worker-mini--external":""}"
    style=${o?`--progress: ${o.percent}%`:""}
    draggable=${t?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${i?l`<div class="worker-mini__row1">${b}${T}${$}</div>
          <div class="worker-mini__row2">
            ${ee}${c?l`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${pt(e.done_at)}`}
                  >완료 ${c}</span
                >`:""}${x}${O}
            <span class="worker-mini__actions"
              >${D}${S}${z}${pe}</span
            >
            ${Gr(e)}
          </div>`:a?l`<div class="worker-mini__head">
              ${u}${f}${b}${T}${E}${U}${x}${_}${V}
            </div>
            <div class="worker-mini__body">${$}</div>
            ${ae?l`<div class="worker-mini__foot">
                  ${ee}${O}
                  <span class="worker-mini__actions"
                    >${D}${S}${z}${pe}${ve}</span
                  >
                  ${ir(e)}
                </div>`:""}
            ${Gr(e)}`:l`<div class="worker-mini__line">
              ${u}${f}${b}${T}${$}${E}${U}${x}${_}${V}${ee}${O}${D}${S}${z}${pe}
            </div>
            ${ir(e)} ${Gr(e)}`}
  </div>`}function Bp(e){let t=e.draggable&&!e.done,r=e.workflow,n=r&&r.chips||{},s=n.route||r&&r.route,o=n.route_source==="derived"||!!(r&&r.route_source==="derived"),a=e.is_quick_fix===!0||!!r&&r.route==="quick_fix",i=typeof e.reason=="string"&&e.reason.startsWith("\u26D4");return l`<div
    class="worker-card${t?"":" worker-card--static"}"
    draggable=${t?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    <div class="worker-card__head">
      ${t?l`<span class="worker-card__grip" aria-hidden="true">⠿</span>`:""}
      ${e.workspace_name?l`<span class="worker-card__repo" title=${e.root_dir||""}
            >${e.workspace_name}</span
          >`:""}
      <span class="worker-card__id" title="클릭하면 ID 복사">${e.id}</span>
      ${r&&s?l`<span
            class="ctl-chip ctl-chip--route${o?" is-derived":""}"
            title=${o?"route \uBBF8\uD540 (metadata unset)":"route"}
            >${o?"unset":s}</span
          >`:""}
    </div>
    <div class="worker-card__title">${e.title}</div>
    ${r?jn(r,e.status):""}
    <div
      class="worker-card__foot${e.reason?"":" worker-card__foot--actions-only"}"
    >
      ${e.reason?l`<span
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
    ${Gr(e)}
  </div>`}function Kt(e){let t=!!e.collapsible&&!!e.collapsed,r=l`<span
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
                  </div>`:e.items.map(n=>e.lane==="candidate"?Bp(n):yo(n))}
          </div>`}
  </section>`}var dl=[{step:"merging",label:"\uBA38\uC9C0 \uC911",index:1},{step:"base_containment",label:"base \uD3EC\uD568 \uD655\uC778",index:2},{step:"repo_operations",label:"\uC800\uC7A5\uC18C \uC791\uC5C5",index:3},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC",index:4},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC",index:5},{step:"parent_close",label:"\uBD80\uBAA8 close",index:6}],vn=dl.filter(e=>e.step!=="merging").map(e=>({step:e.step,label:e.label}));function wo(e){if(typeof e!="string"||e.length===0)return null;let t=6,r=dl.find(n=>n.step===e);return r?{label:r.label,index:r.index,total:t,percent:Math.round(r.index/t*100)}:{label:e,index:0,total:t,percent:0}}function ul(e){let t=vn.findIndex(r=>r.step===e);return vn.map((r,n)=>({step:r.step,label:r.label,state:t<0?"todo":n<t?"done":n===t?"stall":"todo"}))}function Lr(e){let t=vn.find(r=>r.step===e);return t?t.label:typeof e=="string"?e:""}function Up(e){let t=vn.findIndex(r=>r.step===e);return t<0?null:{index:t+1,total:vn.length}}function fs(e){let t=Up(e);return t?`\uBA38\uC9C0 \uC644\uB8CC \xB7 \uC815\uB9AC ${t.total}\uB2E8\uACC4 \uC911 ${t.index}\uB2E8\uACC4\uC5D0\uC11C \uBA48\uCDA4`:"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644"}var pl={verify_failed:"\uAC80\uC99D \uC2E4\uD328",verify_cmd_failed:"\uAC80\uC99D \uC2E4\uD328",verify_script_failure:"\uAC80\uC99D \uC2E4\uD328",deploy_failed:"\uBC30\uD3EC \uC2E4\uD328",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328",interrupted_without_terminal_exit:"\uC911\uB2E8\uB428"},fl={repo_ops_worktree_unowned:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uAC00 \uC544\uC9C1 Worker \uC18C\uC720\uAC00 \uC544\uB2C8\uC5B4\uC11C \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804\uC5D0 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",verify_cmd_failed:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D \uBA85\uB839\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",gh_observation_failed:"GitHub\uC5D0\uC11C PR \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_script_failure:"\uAC80\uC99D \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",deploy_script_failure:"\uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",interrupted_without_terminal_exit:"\uC791\uC5C5\uC774 \uC885\uB8CC \uAE30\uB85D \uC5C6\uC774 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4."};function _l(e){return typeof e!="string"||e.length===0?[]:e.split(":").filter(t=>t.length>0)}function ko(e){for(let t of _l(e))if(Object.hasOwn(pl,t))return pl[t];return null}function $o(e){let t=null;for(let r of _l(e))Object.hasOwn(fl,r)&&(t=fl[r]);return t}function _s(e){let t=ko(e),r=$o(e);return t&&r?`${t} \u2014 ${r}`:t||r?t||r:typeof e=="string"?e:""}function ml(e,t){let r=ko(e)??ko(t),n=$o(t)??$o(e);return r&&n?`${r} \u2014 ${n}`:r||n?r||n:typeof t=="string"?t:""}var gl=160;function jp(e){return e.length>gl?`${e.slice(0,gl)}\u2026`:e}function zp(e){return!e||!e.reason?"":l`<div class="worker-banner__detail">
    가드:
    ${e.reason}${e.command?l` · <code>${jp(e.command)}</code>`:""}
  </div>`}function Hp(e){return e?l`<details class="worker-banner__raw">
    <summary>세부</summary>
    <dl class="worker-banner__kv">
      <div>
        <dt>실패 코드</dt>
        <dd>${e}</dd>
      </div>
    </dl>
  </details>`:""}function xo(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),r=Math.floor(t/60),n=t%60;return r>0?`${r}m ${String(n).padStart(2,"0")}s`:`${n}s`}function hl(e){let t=e.failure?_s(e.failure.reason):"";return l`<div class="worker-banners">
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
                title="이 실패를 처리 완료로 표시하고 배너를 닫습니다"
                aria-label="배너 닫기"
              >
                ✕
              </button>`:""}
          ${zp(e.failure.cause_detail)}
          ${Hp(e.failure.reason)}
          ${ir({discard:e.failure.discard})}
        </div>`:""}
  </div>`}function Wp(e,t,r=null){let n=e.failed===!0,s=!!e.paused,o=n?e.status_label||(e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):s?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?xo(t-e.started_at):"\u2014",a=Yt(e),i=pr(e),c=ht(e.usage),u=qt(e.usage),f=e.conflict_resolution?s?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,_=e.base_exception||null,b=e.attempt_id&&e.attempt_id===r,T=e.discard?.action?l`<button
        type="button"
        class="rtile__discard"
        data-operation-id=${e.discard.operation?.operation_id||""}
        ?disabled=${!e.discard.enabled}
        title=${e.discard.title}
        aria-label=${e.discard.label}
      >
        ${e.discard.label}
      </button>`:"";return l`<div
    class="rtile${b?" rtile--sel":""}${s?" rtile--paused":""}${n?" rtile--failed":""}"
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
            ${T}
            <button
              type="button"
              class="rtile__dismiss"
              title="실패 기록 닫기"
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
            ${T}`}
    </div>
    <div class="rtile__title">${e.title}</div>
    ${e.current_child?l`<div class="rtile__child" title="현재 진행중 child">
          └ ${e.current_child}
        </div>`:""}
    ${a||c.length>0||u||f||_?l`<div class="rtile__meta">
          ${f?l`<span class="worker-mini__badge">${f}</span>`:""}
          ${_?l`<span
                class="worker-mini__badge"
                title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
                >${_}</span
              >`:""}
          ${a?l`<span class="rtile__runner">${a}</span>`:""}
          ${c.length>0?c.map($=>l`<span class="worker-usage" title=${$.tooltip}
                    >${$.label}</span
                  >`):u?l`<span
                  class="worker-usage"
                  title=${jr(e.usage)}
                  >${u}</span
                >`:""}
        </div>`:""}
    ${Gr(e)} ${ir(e)}
    <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일): 큐
         스냅샷에는 페이즈명도 진행률도 없으므로 진행 바는 만들지 않는다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
    ${n||s?"":l`<div class="rtile__accent" aria-hidden="true"></div>`}
  </div>`}function So(e,t=Date.now(),r=null){let n=Array.isArray(e)?e:[];return l`<div class="worker-rungrid" id="worker-rungrid">
    ${n.length===0?l`<div class="worker-rungrid__empty">실행 세션 없음</div>`:n.map(s=>Wp(s,t,r))}
  </div>`}function hr(e){return l`<svg
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
  </svg>`}function Ao(){return hr(Jt`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function To(){return hr(Jt`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function bl(){return hr(Jt`<rect x="4.3" y="4.3" width="7.4" height="7.4" rx="1.2" />`)}function vl(){return hr(Jt`<path d="M4.4 4.4 11.6 11.6M11.6 4.4 4.4 11.6" />`)}function yl(){return hr(Jt`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function wl(){return hr(Jt`<rect x="2.6" y="2.6" width="7.4" height="7.4" rx="1.2" />
    <path d="M6 13.4h6a1.4 1.4 0 0 0 1.4-1.4V6" />`)}function kl(){return hr(Jt`<circle cx="8" cy="8" r="2.1" />
    <path
      d="M8 1.9v1.8M8 12.3v1.8M1.9 8h1.8M12.3 8h1.8M3.7 3.7l1.3 1.3M11 11l1.3 1.3M12.3 3.7 11 5M5 11l-1.3 1.3"
    />`)}function $l(){return hr(Jt`<path d="M3 3.6 8.2 8 3 12.4z" />
    <path d="M8.8 3.6 14 8l-5.2 4.4z" />`)}var yn=1,Gp=6e4,Yp={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328"},Vp=new Set(["auto_merge","merged","merge","done"]),xl={running:3,paused:2,failed:1};function Kp(e,t){let r=null,n=-1/0;for(let s of Object.values(e)){if(!s||s.bead_id!==t||s.status==="running")continue;let o=typeof s.finished_at=="number"?s.finished_at:typeof s.started_at=="number"?s.started_at:0;o>=n&&(n=o,r=s)}return r}function Zp(e,t){let r=Object.values(e||{}),n=new Set,s=new Map;for(let a of r)!a||typeof a.bead_id!="string"||(typeof a.resumed_from=="string"&&a.resumed_from.length>0&&n.add(a.resumed_from),s.set(a.bead_id,a.attempt_id));let o=new Map;for(let a of r){if(!a||typeof a.bead_id!="string"||a.bead_id.length===0)continue;let i=null;if(a.status==="running")i="running";else if(a.status==="paused"&&!n.has(a.attempt_id))i="paused";else if(a.status==="failed"||a.status==="orphaned"){let _=t.get(a.bead_id),b=typeof _=="number"&&_>0&&typeof a.finished_at=="number"&&_>=a.finished_at;s.get(a.bead_id)===a.attempt_id&&!b&&typeof a.dismissed_at!="number"&&(i="failed")}if(!i)continue;let c=typeof a.started_at=="number"?a.started_at:null,u=o.get(a.bead_id);if(u){let _=xl[u.run_state],b=xl[i];if(_>b||_===b&&(u.started_at??0)>(c??0))continue}let f=typeof a.session_id=="string"&&a.session_id.length>0;o.set(a.bead_id,{attempt_id:typeof a.attempt_id=="string"?a.attempt_id:"",run_state:i,started_at:c,last_event_at:typeof a.last_event_at=="number"?a.last_event_at:null,runner:typeof a.runner=="string"?a.runner:null,model:typeof a.model=="string"?a.model:null,effort:typeof a.effort=="string"?a.effort:null,speed:typeof a.speed=="string"?a.speed:null,resumed_from:typeof a.resumed_from=="string"?a.resumed_from:null,continuation_mode:a.continuation_mode==="session"||a.continuation_mode==="fresh"?a.continuation_mode:null,usage:It(e,a.bead_id),can_pause:i==="running"&&f,can_resume:i!=="running"&&f&&!n.has(a.attempt_id)})}return o}function Sl(e,t){let r=e[t];if(!r)return"";if(r.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let n=typeof r.reason=="string"?r.reason:"",s=n.indexOf(":");return s>0&&s<n.length-1?`\u26D4 ${n.slice(0,s)} (${n.slice(s+1)})`:`\u26D4 ${n}`}function Et(e){return e&&typeof e=="object"?e:{}}function Eo(e,t,r){let n=Array.isArray(e)?e:[],s=Array.isArray(t)?t:[],o=r&&typeof r.done_since=="number"?r.done_since:void 0,a=new Map;for(let x of s)x&&typeof x.root_dir=="string"&&a.set(x.root_dir,x);let i=[],c=[],u=[],f=[],_=[],b=new Map;for(let x of n){if(!x||typeof x.root_dir!="string")continue;let V=x.root_dir,ee=x.name||V,O=a.get(V),D=O&&typeof O.revision=="number"?O.revision:typeof x.revision=="number"?x.revision:0,S=Et(x.attempts),z=Et(x.bead_titles),L=Et(x.pr_observations),pe=Et(x.admission),ve=Et(x.revise_parked),ae=Et(x.merge_queue_state),be=Et(x.cleanup_failed),Ce=Et(x.discard_operations),Ge=Array.isArray(x.merge_queue)?x.merge_queue:[],Xe=new Set(Ge.filter(G=>G&&typeof G.bead_id=="string").map(G=>G.bead_id)),ze=new Map(Ge.filter(G=>G&&typeof G.bead_id=="string").map(G=>[G.bead_id,G])),Se=Array.isArray(x.queue)?x.queue:[],xe=Array.isArray(x.done)?x.done:[],_e=new Map;for(let G of xe)G&&typeof G.bead_id=="string"&&typeof G.added_at=="number"&&_e.set(G.bead_id,G.added_at);let ge=G=>({id:G,title:z[G]||G,root_dir:V,workspace_name:ee,expected_revision:D,draggable:!1}),he=new Set;for(let[G,K]of Zp(S,_e))he.add(G),c.push({...ge(G),lane:"running",attempt_id:K.attempt_id,run_state:K.run_state,can_pause:K.can_pause,can_resume:K.can_resume,started_at:K.started_at,last_event_at:K.last_event_at,runner:K.runner,model:K.model,effort:K.effort,speed:K.speed,resumed_from:K.resumed_from,continuation_mode:K.continuation_mode,usage:K.usage,discard:Vt(Ce,G,{attempt_id:K.attempt_id}),badges:K.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:K.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:[],alert:K.run_state==="failed"});for(let G of Array.isArray(x.pr_wait)?x.pr_wait:[]){let K=G&&G.bead_id;if(typeof K!="string"||he.has(K))continue;he.add(K);let Re=Et(L[K]),me=Et(Re.pr),fe=Re.gate?Et(Re.gate):null,I=Xe.has(K),R=ze.get(K)?.continuation_action||null,ie=!!R&&R.continuation===null,De=ae.active===K,Ae=G.external===!0,je=be[K]||null,Me=!!fe&&fe.base_badge==="\uCDA9\uB3CC",Le=!!je&&["child_sweep","branch_cleanup","parent_close"].includes(je.step)&&!!fe&&fe.tier==="merged",Ie=Ae&&!!je&&!!fe&&fe.tier==="merged",Je=!!fe&&["closed_unmerged","review","undecidable"].includes(fe.tier),M=Vt(Ce,K,{external:Ae,merge_active:De,merge_queued:I,merged:!!je||fe?.tier==="merged"}),H=!!M.operation;u.push({...ge(K),lane:"pr_wait",pr_number:typeof me.number=="number"?me.number:null,pr_url:typeof me.url=="string"?me.url:void 0,external:Ae,usage:It(S,K),badges:ie?["\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"]:je?[Lr(je.step)?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${Lr(je.step)}`:"\uC815\uB9AC \uBA48\uCDA4"]:typeof fe?.gate_badge=="string"&&fe.gate_badge.length>0?[fe.gate_badge]:[],alert:!!je||Je,reason:je?fs(je.step):"PR \uB300\uAE30",merge_action:!I||ie,merge_enabled:!H&&(ie||fe?.enabled===!0||Me||Le||Ie),merge_label:ie?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":Ie||Le?"\uC815\uB9AC \uC7AC\uAC1C":Me&&!Le?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:ie?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":H?M.error?`\uD3D0\uAE30 \uC2E4\uD328: ${M.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${M.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:Ie?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Le?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Me?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":fe?.enabled===!0?`\uBA38\uC9C0 (${fe.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${fe?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:I&&!ie,cancel_enabled:!De,continuation_mismatch:R?.mismatch||null,discard:M,discard_action:M.action,discard_enabled:M.enabled,discard_title:M.title})}for(let G=0;G<Se.length;G++){let K=Se[G],Re=K&&K.bead_id;if(typeof Re!="string"||he.has(Re))continue;he.add(Re);let me=ve[Re],fe=Vt(Ce,Re),I=fe.operation?fe:null,R={...ge(Re),lane:"queue",draggable:!I,discard:I||void 0,reason:Sl(pe,Re),queue_position:G+1,queue_index:G,queue_length:Se.length,badges:me?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!me,revise_action:!!me,revise_enabled:!!me&&!I,revise_title:me?me.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${me.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""};f.push(R);let ie=b.get(V);ie?ie.push(R):b.set(V,[R])}for(let G of Array.isArray(x.runnable)?x.runnable:[]){let K=G&&G.bead_id;typeof K!="string"||he.has(K)||(he.add(K),i.push({...ge(K),title:G.title||z[K]||K,lane:"runnable",draggable:!0,reason:Sl(pe,K),created_at:G.created_at??void 0,updated_at:G.updated_at??void 0,labels:Array.isArray(G.labels)?G.labels:[],spec_reviewer:typeof G.spec_reviewer=="string"?G.spec_reviewer:void 0,plan_state:G.plan_state==="approved"||G.plan_state==="authored"?G.plan_state:"none",workflow:G.route?{route:G.route,chips:{route:G.route}}:null,place_index:Se.length}))}for(let G of xe){let K=G&&G.bead_id;if(typeof K!="string"||he.has(K)||(he.add(K),o!==void 0&&typeof G.added_at=="number"&&G.added_at<o))continue;let Re=Kp(S,K);_.push({...ge(K),lane:"done",done:!0,usage:It(S,K),done_at:typeof G.added_at=="number"?G.added_at:void 0,done_kind:Re&&typeof Re.done_kind=="string"?Re.done_kind:null})}}let T=new Map;s.forEach((x,V)=>{x&&typeof x.root_dir=="string"&&T.set(x.root_dir,V)});let $=r&&r.running_sort==="repo"?"repo":"started";c.sort((x,V)=>{if($==="repo"){let D=T.get(x.root_dir)??Number.MAX_SAFE_INTEGER,S=T.get(V.root_dir)??Number.MAX_SAFE_INTEGER;if(D!==S)return D-S}let ee=typeof x.started_at=="number"&&Number.isFinite(x.started_at)?x.started_at:null,O=typeof V.started_at=="number"&&Number.isFinite(V.started_at)?V.started_at:null;return ee!==null&&O!==null&&ee!==O?ee-O:ee===null&&O!==null?1:ee!==null&&O===null?-1:x.id.localeCompare(V.id)}),_.sort((x,V)=>(V.done_at??0)-(x.done_at??0));let E=s.length>0?s:n.map(x=>({root_dir:x&&x.root_dir,name:x&&x.name,auto_advance:x&&x.auto_advance,auto_merge:x&&x.auto_merge,slots:x&&x.slots,revision:x&&x.revision,exec_defaults:x&&x.exec_defaults,default_exec_preset_id:x&&x.default_exec_preset_id,runner_catalog:x&&x.runner_catalog})),U=[];for(let x of E)!x||typeof x.root_dir!="string"||U.push({root_dir:x.root_dir,name:x.name||x.root_dir,auto_advance:x.auto_advance===!0,auto_merge:x.auto_merge===!0,slots:typeof x.slots=="number"&&x.slots>=yn?x.slots:yn,revision:typeof x.revision=="number"?x.revision:0,exec_defaults:Et(x.exec_defaults),default_exec_preset_id:typeof x.default_exec_preset_id=="string"?x.default_exec_preset_id:null,runner_catalog:Et(x.runner_catalog),items:b.get(x.root_dir)||[]});return{runnable:i,queue:f,queue_groups:U,running:c,pr_wait:u,done:_,automation:{total:U.length,both_on:U.filter(x=>x.auto_advance&&x.auto_merge).length}}}function Xp(e,t){if(typeof e!="number"||!Number.isFinite(e))return"";let n=t-e<Gp;return l`<span
    class="mon-beat${n?" mon-beat--live":""}"
    title=${`\uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${pt(e)}`}
    ><span class="mon-beat__dot" aria-hidden="true"></span>${n?"":l`<span class="mon-beat__age"
          >${Tt(e,t)}</span
        >`}</span
  >`}function wn(e){return l`<div class="mon-c__title">${e.title}</div>`}function kn(e){return l`<span class="mon-c__id" title="클릭하면 상세로 이동"
    >${e.id}</span
  >`}function ms(e){return e.workspace_name?l`<span class="mon-c__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:""}function Co(e){let t=ht(e.usage),r=qt(e.usage);return t.length>0?t.map(n=>l`<span class="mon-c__usage" title=${n.tooltip}
          >${n.label}</span
        >`):r?l`<span class="mon-c__usage" title=${jr(e.usage)}
        >${r}</span
      >`:""}function Ro(e){return(Array.isArray(e.badges)?e.badges:[]).map(r=>l`<span class="mon-c__badge${e.alert?" mon-c__badge--alert":""}"
        >${r}</span
      >`)}function Qp(e){return l`<span class="mon-c__ops">
    ${e.run_state==="running"?l`<button
          type="button"
          class="mon-op mon-op--pause"
          ?disabled=${e.can_pause===!1}
          aria-label="일시정지"
          title="일시정지 — 세션을 끊고 이어하기 가능 상태로 둡니다"
        >
          ${To()}
        </button>`:l`<button
          type="button"
          class="mon-op mon-op--resume"
          ?disabled=${e.can_resume===!1}
          aria-label="이어하기"
          title="이어하기"
        >
          ${Ao()}
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
          ${vl()}
        </button>`:""}
  </span>`}function Jp(e,t){let r=typeof e.started_at=="number"?xo(t-e.started_at):"";return l`${wn(e)}
    <div class="mon-c__meta">
      ${Ro(e)}${Xp(e.last_event_at,t)}${kn(e)}${ms(e)}
      ${Yt(e)?l`<span class="mon-c__model">${Yt(e)}</span>`:""}
      ${pr(e)?l`<span
            class="rtile__resumed"
            title=${pr(e)}
            >↻</span
          >`:""}
      ${r?l`<span class="mon-live__elapsed">${r}</span>`:""}
      ${Co(e)}${Qp(e)}${ir(e)}
    </div>`}function ef(e){let t=e.workflow,n=(t&&t.chips||{}).route||t&&t.route,s=typeof e.spec_reviewer=="string"?e.spec_reviewer:"",o=e.plan_state==="approved"?"plan \u2713":e.plan_state==="authored"?"plan \u270E":"plan \u2013",a=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),i=Tt(e.updated_at);return l`${wn(e)}
    <div class="mon-c__meta">
      <span class="mon-c__grip" aria-hidden="true">⠿</span>${kn(e)}
      ${n?l`<span class="ctl-chip ctl-chip--route">${n}</span>`:""}
      ${s?l`<span
            class="ctl-chip mon-c__review${s==="skipped"?" mon-c__review--dim":""}"
            >spec:${s}</span
          >`:""}
      ${n==="full_plan"?l`<span
            class="ctl-chip mon-c__plan${e.plan_state==="none"?" mon-c__review--dim":""}"
            >${o}</span
          >`:""}
      ${Un(e.labels,null).map(c=>l`<span class="ctl-chip ctl-chip--label">${c}</span>`)}
      ${ms(e)}
      ${i?l`<span title=${`\uC218\uC815 ${pt(e.updated_at)}`}
            >수정 ${i}</span
          >`:""}
      ${e.reason?l`<span
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
    </div>`}function tf(e){let t=!!e.discard?.operation;return l`${wn(e)}
    <div class="mon-c__meta">
      <span class="mon-c__grip" aria-hidden="true">⠿</span>
      <span class="mon-live__pos">#${e.queue_position}</span>${kn(e)}
      ${Ro(e)}
      ${e.reason?l`<span class="mon-c__reason">${e.reason}</span>`:""}
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
    ${ir(e)}
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
        </div>`:""}`}function rf(e){let t=!!(qt(e.usage)||e.merge_action||e.cancel_action||e.discard_action);return l`${wn(e)}
    <div class="mon-c__meta">
      ${kn(e)}${ms(e)}
      ${e.pr_url&&e.pr_number?l`<a
            class="mon-c__pr"
            href=${e.pr_url}
            target="_blank"
            rel="noreferrer noopener"
            title="PR 열기"
            >#${e.pr_number} ↗</a
          >`:""}
      ${Ro(e)}
      ${e.reason?l`<span class="mon-c__reason">${e.reason}</span>`:""}
    </div>
    ${t?l`<div class="mon-c__tail">
          ${Co(e)}
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
          ${ir(e)}
        </div>`:""}`}function nf(e,t){let r=e.done_kind||"",n=r?Yp[r]||r:"",s=Tt(e.done_at,t);return l`${wn(e)}
    <div class="mon-c__meta">
      ${kn(e)}${ms(e)}
      ${n?l`<span
            class="mon-live__kind${Vp.has(r)?" mon-live__kind--ok":" mon-live__kind--warn"}"
            >${n}</span
          >`:""}
      ${Co(e)}
      ${s?l`<span title=${`\uC644\uB8CC ${pt(e.done_at)}`}
            >완료 ${s}</span
          >`:""}
    </div>`}function Al(e,t){return e.lane==="running"?Jp(e,t):e.lane==="runnable"?ef(e):e.lane==="queue"?tf(e):e.lane==="pr_wait"?rf(e):nf(e,t)}function Tl(e){let t=String(e.revision);return l`<header
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
        ${e.auto_advance?To():Ao()}
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
        ${yl()}
        <span class="mon-ctl__label">머지</span>
      </button>
      <label class="mon-ctl mon-ctl--slots" title="동시에 실행할 세션 수">
        ${wl()}
        <span class="mon-ctl__label">슬롯</span>
        <input
          type="number"
          class="mon-slots__input"
          min=${yn}
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
        ${kl()}
        <span class="mon-ctl__label">설정</span>
      </button>
    </span>
  </header>`}function El(e){let{total:t,both_on:r}=e.automation,n=t>0&&r===t,s=e.running_sort==="repo"?"repo":"started",o=Gt.find(i=>i.value===e.done_range)?.label||"",a=Array.isArray(e.token_total)?e.token_total:e.token_total?[{label:e.token_total,tooltip:e.token_tooltip}]:[];return l`<div class="mon-top">
    <button
      type="button"
      class="mon-auto-all${n?" is-active":""}"
      data-on=${n?"false":"true"}
      aria-pressed=${n?"true":"false"}
      ?disabled=${t===0}
      title=${n?"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uB055\uB2C8\uB2E4 (\uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4)":"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uCF2D\uB2C8\uB2E4"}
    >
      ${n?bl():$l()}
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
        ${Gt.map(i=>l`<option
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
  </div>`}function Cl(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function Rl(e){let t=(Array.isArray(e)?e:[]).map(i=>i&&i.usage).filter(i=>i&&typeof i=="object"&&"providers"in i);if(t.length>0)return ht(Wn(t));let r={};for(let i of rr)r[i]=0;let n=!1,s=0,o=0,a=0;for(let i of Array.isArray(e)?e:[]){let c=i&&i.usage;if(c&&typeof c=="object"){let u=!1;for(let f of rr){let _=c[f];typeof _=="number"&&Number.isFinite(_)&&(r[f]+=_,n=!0,u=!0)}if(u){o+=1;let f=c.total_cost_usd;typeof f=="number"&&Number.isFinite(f)&&(s+=f,a+=1)}}}return o>0&&a===o&&(r.total_cost_usd=s),n?qt(r):null}var Ll="bdui.monitor.done-range",Ol="bdui.monitor.running_sort";function sf(){try{let e=window.localStorage.getItem(Ll);return Rt(e)?e:At}catch{return At}}function of(e){try{window.localStorage.setItem(Ll,e)}catch{}}function af(){try{return window.localStorage.getItem(Ol)==="repo"?"repo":"started"}catch{return"started"}}function lf(e){try{window.localStorage.setItem(Ol,e)}catch{}}var Dl="tab:monitor:pipeline",cf=1e3,df=[{lane:"runnable",pane:"candidate",title:"\uC2E4\uD589\uAC00\uB2A5",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589\uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}];function Il(e,t){let r=(e.lane==="runnable"||e.lane==="queue")&&e.draggable!==!1;return l`<div
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
    ${Al(e,t)}
  </div>`}function Ml(e,t){let r=ot("views:monitor"),n=t.gotoIssue,s=t.pipelineStore,o=t.transport,a=t.execPresetStore,i=t.getWorkspacePath,c=t.switchWorkspace,u=t.now||(()=>Date.now()),f=t.confirm||(M=>typeof globalThis.confirm!="function"||globalThis.confirm(M)),_=sf(),b=af();function T(){let M=Gt.find(H=>H.value===_);return M?M.label:""}let $=document.createElement("div");$.className="mon",e.appendChild($);let E=Eo(null,null),U=null,x=new Map,V=new Set;function ee(M){return E.queue_groups.find(H=>H.root_dir===M)||null}let D=cs(e,{queueStore:{get(){if(!U)return{revision:0,exec_defaults:{},default_exec_preset_id:null};let M=x.get(U);if(M)return M;let H=ee(U),q=s&&s.get?s.get():null,X=(Array.isArray(q)?q:[]).find(ce=>ce&&ce.root_dir===U);return{revision:H?H.revision:0,exec_defaults:H?H.exec_defaults:{},default_exec_preset_id:H?H.default_exec_preset_id:null,runner_catalog:H?H.runner_catalog:null,workspace_info:X?X.workspace_info:void 0}},set(M){U&&x.set(U,M);for(let H of Array.from(V))H()},subscribe(M){return V.add(M),()=>V.delete(M)}},presetStore:a,transport:o?(M,H)=>o(M,M==="worker-queue-set-default-exec-preset"||M==="get-worker-system-prompt"?{...H||{},root_dir:U}:H):void 0,getWorkspacePath:()=>U||void 0}),S=null,z=null;async function L(M,H,q,X,ce=!0){if(!o||!q)return null;let w=await o(M,{...H,root_dir:q,expected_revision:X});if(w&&w.conflict&&ce){w.queue&&x.set(q,w.queue);let C=w.queue&&typeof w.queue.revision=="number"?w.queue.revision:X;w=await o(M,{...H,root_dir:q,expected_revision:C})}return w&&w.queue&&q&&x.set(q,w.queue),w}function pe(M,H){let q=x.get(M),X=s&&s.get?s.get():null,ce=(Array.isArray(X)?X:[]).find(C=>C?.root_dir===M);return(q||ce)?.merge_queue?.find(C=>C.bead_id===H)?.continuation_action}async function ve(M,H,q,X){let ce=await L(M,H,q,X),w=x.get(q)?.revision??ce?.queue?.revision??X;return tr(ce,(C,W)=>L(M,{...H,continuation:C,decision_token:W},q,w,!1),{refresh:C=>L(M,H,q,C?.queue?.revision??x.get(q)?.revision??w,!1)})}async function ae(M,H,q,X){let ce=await tr({continuation_mismatch:X},(C,W)=>L("worker-merge-queue-add",{bead_id:H,continuation:C,decision_token:W},M,q,!1)),w=ce?.queue?.merge_queue?.find(C=>C.bead_id===H)?.continuation_action;ce?.applied!==!0&&w?.continuation===null&&w.mismatch&&await ae(M,H,ce.queue.revision,w.mismatch)}async function be(M,H,q){let X=await L("worker-discard",M,H,q);if(X&&X.discarded===!0){Q(ps(X),"success",5e3);return}if(X&&X.reason){Q(`\uD3D0\uAE30 \uC2E4\uD328: ${X.reason}`,"error");return}if(X&&X.accepted&&X.pending==="merged_revert"){Q("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if(X&&X.accepted){Q(`\uD3D0\uAE30 \uC9C4\uD589: ${X.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}X&&!X.conflict&&Q("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function Ce(M,H,q){return!o||!q?null:await o(M,{...H,root_dir:q})}async function Ge(M){if(!o||!M&&!f("\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB055\uB2C8\uB2E4. \uAC01 \uB808\uD3EC\uC758 \uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uD568\uAED8 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?"))return;let H=await o("monitor-auto-toggle",{on:M}),q=H&&Array.isArray(H.failed)?H.failed:[];q.length>0&&Q(`\uC790\uB3D9\uD654 ${M?"\uCF1C\uAE30":"\uB044\uAE30"} \uC77C\uBD80 \uC2E4\uD328: ${q.map(X=>X.root_dir).join(", ")}`,"error",3200)}async function Xe(){let M=new Map;for(let H of E.pr_wait)M.has(H.root_dir)||M.set(H.root_dir,H.expected_revision);for(let[H,q]of M)await L("worker-merge-queue-add-all",{},H,q)}let ze=null,Se=!1,xe=null;function _e(){xe!==null&&clearTimeout(xe),xe=setTimeout(()=>{xe=null,Se=!1},0)}function ge(M){let H=M.target;return typeof H?.closest=="function"?H.closest(".mon-group"):null}function he(M){let H=ge(M);return!H||!ze?null:(H.getAttribute("data-root-dir")||"")===ze.root_dir?H:null}function G(){for(let M of Array.from($.querySelectorAll(".mon-group--drag-over")))M.classList.remove("mon-group--drag-over")}function K(M){let H=M.target,q=typeof H?.closest=="function"?H.closest('.mon-card[draggable="true"]'):null;if(q){ze={bead_id:q.getAttribute("data-issue-id")||"",lane:q.getAttribute("data-lane")||"",root_dir:q.getAttribute("data-root-dir")||"",revision:Number(q.getAttribute("data-revision")||0)||0,queue_index:Number(q.getAttribute("data-queue-index")),queue_length:Number(q.getAttribute("data-queue-length")),place_index:Number(q.getAttribute("data-place-index"))},Se=!0;try{M.dataTransfer?.setData("text/plain",ze.bead_id),M.dataTransfer&&(M.dataTransfer.effectAllowed="move")}catch{}}}function Re(M){let H=he(M);H&&(M.preventDefault(),M.dataTransfer&&(M.dataTransfer.dropEffect="move"),H.classList.add("mon-group--drag-over"))}function me(M){ge(M)?.classList.remove("mon-group--drag-over")}function fe(){ze=null,G(),_e()}function I(M){let H=he(M),q=ze;if(ze=null,G(),!H||!q||!q.bead_id)return;M.preventDefault();let X=M.target,ce=typeof X?.closest=="function"?X.closest('.mon-card[data-lane="queue"]'):null,w=ce&&H.contains(ce)?Number(ce.getAttribute("data-queue-index")):NaN;if(q.lane==="runnable"){let le=Number.isFinite(w)?w:q.place_index;if(!Number.isFinite(le))return;L("worker-queue-place",{bead_id:q.bead_id,index:le},q.root_dir,q.revision);return}if(q.lane!=="queue"||ce&&ce.getAttribute("data-issue-id")===q.bead_id)return;let C=q.queue_index,W=Number.isFinite(w)?C>w?w:w-1:q.queue_length-1;!Number.isFinite(W)||W<0||W===C||L("worker-queue-reorder",{bead_id:q.bead_id,to_index:W},q.root_dir,q.revision)}function R(M){let H={runnable:E.runnable,queue:E.queue,running:E.running,pr_wait:E.pr_wait,done:E.done};return l`${El({automation:E.automation,counts:{running:E.running.length,queue:E.queue.length,pr_wait:E.pr_wait.length},running_sort:b,done_range:_,token_total:Rl(E.done),token_tooltip:Cl(T())})}
      <div class="worker-lanes mon-lanes">
        ${df.map(q=>{let X=H[q.lane],ce=q.lane==="queue"?E.queue_groups.length>0?l`${E.queue_groups.map(w=>l`<div
                        class="mon-group"
                        data-root-dir=${w.root_dir}
                      >
                        ${Tl(w)}
                        <div class="mon-group__list">
                          ${w.items.map(C=>Il(C,M))}
                        </div>
                      </div>`)}`:void 0:X.length>0?l`${X.map(w=>Il(w,M))}`:void 0;return Kt({id:`monitor-${q.lane}`,lane:q.pane,title:q.lane==="done"?`\uC644\uB8CC\xB7${T()}`:q.title,items:X,empty:q.empty,body:ce,live:q.lane==="running"&&X.length>0,header_control:q.lane==="pr_wait"&&X.length>0?l`<button
                    type="button"
                    class="mon-lane-op mon-merge-all"
                    title="자격이 생기는 PR을 각 레포의 머지 큐에 한 번에 넣습니다"
                  >
                    일괄 머지
                  </button>`:""})})}
      </div>`}function ie(){let M=s&&s.get?s.get():null,H=s&&s.getWorkspacesState?s.getWorkspacesState():[],q=u();E=Eo(M,H,{done_since:xr(_,q),running_sort:b}),Ue(R(q),$)}function De(M,H){let q=i?i():void 0;if(!H||!q||H===q||!c){n(M);return}c(H).then(()=>{n(M)}).catch(X=>{r("workspace switch for %s failed: %o",H,X)})}function Ae(M){return{root_dir:M.getAttribute("data-root-dir")||"",revision:Number(M.getAttribute("data-revision")||0)||0}}function je(M,H){let{root_dir:q,revision:X}=Ae(M),ce=M.getAttribute("data-issue-id")||"",w=H.dataset.attemptId||M.getAttribute("data-attempt-id")||"",C=H.classList;if(C.contains("worker-card__place")){L("worker-queue-place",{bead_id:ce,index:Number(M.getAttribute("data-place-index")||0)||0},q,X);return}if(C.contains("mon-op--up")||C.contains("mon-op--down")){let W=Number(M.getAttribute("data-queue-index")||0)||0,le=C.contains("mon-op--up")?W-1:W+1;if(le<0)return;L("worker-queue-reorder",{bead_id:ce,to_index:le},q,X);return}if(C.contains("mon-op--remove")){L("worker-queue-remove",{bead_id:ce},q,X);return}if(C.contains("mon-op--pause")){Ce("worker-attempt-pause",{attempt_id:w},q);return}if(C.contains("mon-op--discard")){if(!f(bn(ce,"unmerged")))return;be({bead_id:ce,...w?{attempt_id:w}:{},...H.dataset.operationId?{operation_id:H.dataset.operationId}:{}},q,X);return}if(C.contains("mon-op--resume")){ve("worker-attempt-resume",{attempt_id:w},q,X);return}if(C.contains("mon-op--dismiss")){L("worker-attempt-dismiss",{attempt_id:w},q,X);return}if(C.contains("worker-mini__merge")){let W=pe(q,ce);W?.mismatch&&W.continuation===null?ae(q,ce,X,W.mismatch):L("worker-merge-queue-add",{bead_id:ce},q,X);return}if(C.contains("worker-mini__merge-cancel")){L("worker-merge-queue-remove",{bead_id:ce},q,X);return}if(C.contains("worker-mini__discard")){let W=H.dataset.discardMode==="merged"?"merged":"unmerged";if(!f(bn(ce,W)))return;be({bead_id:ce,...w?{attempt_id:w}:{},...H.dataset.operationId?{operation_id:H.dataset.operationId}:{}},q,X);return}if(C.contains("worker-mini__revise-fix")){ve("worker-revise-fix",{bead_id:ce},q,X);return}C.contains("worker-mini__revise-approve")&&L("worker-revise-approve",{bead_id:ce},q,X)}function Me(M){let H=Se;Se=!1;let q=M.target;if(!q||typeof q.closest!="function"||q.closest("dialog")||q.closest("a"))return;let X=q.closest(".mon-running-sort");if(X){M.preventDefault(),b=X.getAttribute("data-sort")==="repo"?"repo":"started",lf(b),ie();return}let ce=q.closest(".mon-auto-all");if(ce){M.preventDefault(),Ge(ce.getAttribute("data-on")==="true");return}if(q.closest(".mon-merge-all")){M.preventDefault(),Xe();return}let C=q.closest(".mon-ctl--advance");if(C){M.preventDefault();let{root_dir:et,revision:Fe}=Ae(C);L("worker-automation-toggle",{on:C.getAttribute("data-on")==="true"},et,Fe);return}let W=q.closest(".mon-ctl--merge-auto");if(W){M.preventDefault();let{root_dir:et,revision:Fe}=Ae(W);L("worker-merge-auto-toggle",{on:W.getAttribute("data-on")==="true"},et,Fe);return}let le=q.closest(".mon-ctl--exec");if(le){M.preventDefault(),U=le.getAttribute("data-root-dir")||null,x.delete(U||""),D.open();return}let ne=q.closest(".mon-card");if(!ne)return;let Oe=q.closest("button");if(Oe){M.preventDefault(),je(ne,Oe);return}let Ne=ne.getAttribute("data-issue-id");Ne&&!H&&(M.preventDefault(),De(Ne,ne.getAttribute("data-root-dir")||""))}function Le(M){let H=M.target;if(!H||typeof H.closest!="function")return;let q=H.closest(".mon-done-range");if(q){_=Rt(q.value)?q.value:At,of(_),ie();return}let X=H.closest(".mon-slots__input");if(!X)return;let{root_dir:ce,revision:w}=Ae(X),C=Number(X.value);if(!Number.isFinite(C))return;let W=Math.max(yn,Math.floor(C));L("worker-queue-set-slots",{slots:W},ce,w)}e.addEventListener("click",Me),e.addEventListener("change",Le),e.addEventListener("dragstart",K),e.addEventListener("dragover",Re),e.addEventListener("dragleave",me),e.addEventListener("drop",I),e.addEventListener("dragend",fe),s&&typeof s.subscribe=="function"&&(S=s.subscribe(()=>{try{x.clear(),ie();for(let M of Array.from(V))M()}catch{}}));function Ie(){z!==null&&(clearInterval(z),z=null)}function Je(){xe!==null&&(clearTimeout(xe),xe=null)}return{load(){r("load"),ie(),z===null&&(z=setInterval(()=>{try{ie()}catch{}},cf))},pause(){Ie()},clear(){Ie(),Je(),S&&(S(),S=null),e.removeEventListener("click",Me),e.removeEventListener("change",Le),e.removeEventListener("dragstart",K),e.removeEventListener("dragover",Re),e.removeEventListener("dragleave",me),e.removeEventListener("drop",I),e.removeEventListener("dragend",fe),D.destroy(),V.clear(),e.replaceChildren()}}}function Nl(e,t,r){let n=ot("views:nav"),s=null;function o(c){return u=>{u.preventDefault(),n("click tab %s",c),r.gotoView(c)}}function a(){let c=t.getState(),u=c.view==="worker"||c.view==="monitor"?c.view:"board";return l`
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
    `}function i(){Ue(a(),e)}return i(),s=t.subscribe(()=>i()),{destroy(){s&&(s(),s=null),Ue(l``,e)}}}var Pl=["bug","feature","task","epic","chore"];function Fl(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var ql=["Critical","High","Medium","Low","Backlog"];function Bl(e,t){let r=document.createElement("dialog");r.id="new-issue-dialog",r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true"),r.innerHTML=`
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
  `,e.appendChild(r);let n=r.querySelector("#new-issue-form"),s=r.querySelector("#new-title"),o=r.querySelector("#new-type"),a=r.querySelector("#new-priority"),i=r.querySelector("#new-labels"),c=r.querySelector("#new-description"),u=r.querySelector("#new-issue-error"),f=r.querySelector("#btn-cancel"),_=r.querySelector("#btn-create"),b=r.querySelector(".new-issue__close");function T(){o.replaceChildren();let D=document.createElement("option");D.value="",D.textContent="\u2014 Select \u2014",o.appendChild(D);for(let S of Pl){let z=document.createElement("option");z.value=S,z.textContent=Fl(S),o.appendChild(z)}a.replaceChildren();for(let S=0;S<=4;S+=1){let z=document.createElement("option");z.value=String(S);let L=ql[S]||"Medium";z.textContent=`${S} \u2013 ${L}`,a.appendChild(z)}}T();function $(){try{typeof r.close=="function"?r.close():r.removeAttribute("open")}catch{r.removeAttribute("open")}}function E(D){s.disabled=D,o.disabled=D,a.disabled=D,i.disabled=D,c.disabled=D,f.disabled=D,_.disabled=D,_.textContent=D?"Creating\u2026":"Create"}function U(){u.textContent=""}function x(D){u.textContent=D}function V(){try{let D=window.localStorage.getItem("beads-ui.new.type");D?o.value=D:o.value="";let S=window.localStorage.getItem("beads-ui.new.priority");S&&/^\d$/.test(S)?a.value=S:a.value="2"}catch{o.value="",a.value="2"}}function ee(){let D=o.value||"",S=a.value||"";D.length>0&&window.localStorage.setItem("beads-ui.new.type",D),S.length>0&&window.localStorage.setItem("beads-ui.new.priority",S)}async function O(){U();let D=String(s.value||"").trim();if(D.length===0){x("Title is required"),s.focus();return}let S=Number(a.value||"2");if(!(S>=0&&S<=4)){x("Priority must be 0..4"),a.focus();return}let z=String(o.value||""),L=String(c.value||""),pe={title:D};z.length>0&&(pe.type=z),String(S).length>0&&(pe.priority=S),L.length>0&&(pe.description=L),E(!0);try{await t("create-issue",pe)}catch{E(!1),x("Failed to create issue");return}ee(),E(!1),$()}return r.addEventListener("cancel",D=>{D.preventDefault(),$()}),b.addEventListener("click",()=>$()),f.addEventListener("click",()=>$()),r.addEventListener("keydown",D=>{D.key==="Enter"&&(D.ctrlKey||D.metaKey)&&(D.preventDefault(),O())}),n.addEventListener("submit",D=>{D.preventDefault(),O()}),{open(){n.reset(),U(),V();try{"showModal"in r&&typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")}catch{r.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){$()}}}var uf=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function Ul(e){return String(e).padStart(2,"0")}function pf(e,t){let r=Math.max(0,Math.ceil((e-t)/6e4)),n=Math.floor(r/1440),s=Math.floor(r%1440/60),o=r%60;return n>0?`${n}d${s>0?` ${s}h`:""}`:s>0?`${s}h${o>0?` ${o}m`:""}`:`${o}m`}function ff(e,t=Date.now()){let r=Date.parse(e);if(!Number.isFinite(r))return"";let n=new Date(r),s=new Date(t),o=`${Ul(n.getHours())}:${Ul(n.getMinutes())}`,i=n.getFullYear()===s.getFullYear()&&n.getMonth()===s.getMonth()&&n.getDate()===s.getDate()?o:`${uf[n.getMonth()]} ${n.getDate()} ${o}`;return`${pf(r,t)} \xB7 ${i}`}function _f(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}var jl=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage"}];function zl(e){let t=!1,r=null,n=new Map;function s(){Ue(l``,e),e.hidden=!0}function o(){let c=jl.filter(f=>n.has(f.key));if(c.length===0){s();return}let u=Date.now();Ue(l`<div class="usage-meter" aria-label="Usage">
        ${c.map(f=>{let _=n.get(f.key),b=typeof _.ageSeconds=="number"&&_.ageSeconds>600,T=b?`${Math.floor(_.ageSeconds/60)}\uBD84 \uC804 \uCE21\uC815`:"";return l`<span
            class="usage-meter__group${b?" usage-meter__group--stale":""}"
            aria-label=${`${f.label} usage`}
          >
            <span class="usage-meter__provider">${f.label}</span>
            ${_.windows.map($=>{let E=typeof $.pct=="number"&&Number.isFinite($.pct)?$.pct:0,U=Math.min(100,Math.max(0,E)),V=`resets ${ff($.resetsAt,u)}${b?` \xB7 ${T}`:""}`;return l`<span
                class="usage-meter__window ${_f(U)}"
                style=${`--progress: ${U}%`}
                title=${V}
              >
                <span class="usage-meter__label">${$.key}</span>
                <span class="usage-meter__track" aria-hidden="true">
                  <span class="usage-meter__fill"></span>
                </span>
                <span class="usage-meter__pct">${U}%</span>
              </span>`})}
          </span>`})}
      </div>`,e),e.hidden=!1}async function a(c){try{let u=await fetch(c.endpoint);if(!u.ok)return null;let f=await u.json();return!f||f.available!==!0||!Array.isArray(f.windows)?null:f}catch{return null}}async function i(){let c=await Promise.all(jl.map(async u=>({provider:u,payload:await a(u)})));if(!t){for(let u of c)u.payload?n.set(u.provider.key,u.payload):n.delete(u.provider.key);o()}}return s(),i(),r=setInterval(()=>{i()},6e4),{destroy(){t=!0,r!==null&&(clearInterval(r),r=null),s()}}}var mf="worker-ineligible";function Io(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Hl(e){return Io(e).includes(mf)}var Lo="worker-serial";function $n(e){return Io(e).includes(Lo)}var gf=20,Wl={verify:"\uBA38\uC9C0 \uC804 \uAC80\uC99D",deploy:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC"},Gl={verify_script_failure:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0",verify_script_failure_pre_merge:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0 \uD6C4 \uBA38\uC9C0",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328 \uD574\uACB0",interrupted_without_terminal_exit:"\uC911\uB2E8\uB41C \uC791\uC5C5 \uC9C4\uB2E8"};function hf(e,t,r=gf){let n=[];for(let s of Array.isArray(e)?e:[])!s||typeof s!="object"||n.push({type:"operation",id:s.operation_id,at:typeof s.finished_at=="number"?s.finished_at:typeof s.requested_at=="number"?s.requested_at:null,operation:s});for(let s of Array.isArray(t)?t:[])!s||typeof s!="object"||n.push({type:"cleanup",id:s.bead_id,at:typeof s.at=="number"?s.at:null,cleanup:s});return n.sort((s,o)=>s.at===null&&o.at===null?String(s.id||"").localeCompare(String(o.id||"")):s.at===null?1:o.at===null?-1:o.at-s.at),n.slice(0,Math.max(0,r))}function Yl(e){if(e.type==="cleanup")return"warn";let t=e.operation.state;return t==="succeeded"?"ok":t==="failed"?"fail":"live"}function bf(e){if(e.type==="cleanup")return"\uBA48\uCDA4";switch(e.operation.state){case"succeeded":return"\uC131\uACF5";case"failed":return"\uC2E4\uD328";case"repairing":return"\uC790\uB3D9 \uD574\uACB0 \uC911";case"retry_pending":return"\uC7AC\uC2DC\uB3C4 \uC911";case"running":return"\uC2E4\uD589 \uC911";default:return"\uB300\uAE30"}}function Vl(e){let t=e.filter(r=>r.value);return t.length===0?"":l`<details class="worker-ev__details">
    <summary>세부</summary>
    <dl class="worker-ev__kv">
      ${t.map(r=>l`<div>
            <dt>${r.term}</dt>
            <dd>${r.value}</dd>
          </div>`)}
    </dl>
  </details>`}function Kl(e,t="",r=!1){return!e&&!t?"":l`<p
    class="worker-ev__explain${r?" worker-ev__explain--warn":""}"
  >
    <span class="worker-ev__cause">${e}</span>${t?l`<br />${t}`:""}
  </p>`}function vf(e){if(e.state!=="failed"||e.superseded_by)return"";let t=e.repair||{},r=typeof t.remaining=="number"?t.remaining:0,n=e.failure_kind==="verify_script_failure"&&e.verify_stage==="pre_merge"?"verify_script_failure_pre_merge":e.failure_kind||"",s=r<=0;return l`<div class="worker-ev__acts">
    <button
      type="button"
      class="worker-ev__btn worker-ev__btn--primary worker-repo-op__resolve"
      data-operation-id=${e.operation_id}
      data-failure-kind=${e.failure_kind||""}
      title="해결 세션을 엽니다"
    >
      ${Object.hasOwn(Gl,n)?Gl[n]:"\uC2E4\uD328 \uD574\uACB0 \uC138\uC158 \uC2DC\uC791"}
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
  </div>`}function yf(e){let t=e.operation,r=t.state==="failed",n=t.failure?t.failure.code:"";return l`<li
    class="worker-ev"
    data-operation-id=${t.operation_id}
    data-state=${t.state}
  >
    <span
      class="worker-ev__t"
      title=${e.at?pt(e.at):""}
      >${us(e.at)||"\u2014"}</span
    >
    <span class="worker-ev__node" aria-hidden="true"
      ><span class="worker-ev__dot worker-ev__dot--${Yl(e)}"></span
    ></span>
    <div class="worker-ev__body">
      <div class="worker-ev__line1">
        <span class="worker-ev__what"
          >${Object.hasOwn(Wl,t.kind)?Wl[t.kind]:t.kind}</span
        >
        <span class="worker-ev__meta"
          >${t.target_base}@${ds(t.target_sha)}${typeof t.elapsed_ms=="number"?` \xB7 ${vo(t.elapsed_ms)}`:""}</span
        >
        <span class="worker-ev__st worker-ev__st--${Yl(e)}"
          >${bf(e)}</span
        >
        ${t.dismissed?l`<span class="worker-ev__st worker-ev__st--quiet">접수됨</span>`:""}
        ${t.superseded_by?l`<span class="worker-ev__st worker-ev__st--quiet">덮임</span>`:""}
      </div>
      ${r?Kl(ml(t.failure_kind,n)):""}
      ${vf(t)}
      ${Vl([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:r?n:""},{term:"script",value:[t.script_path||"",t.script_blob_sha?`blob ${ds(t.script_blob_sha)}`:"",Number.isInteger(t.exit_code)?`exit ${t.exit_code}`:""].filter(Boolean).join(" \xB7 ")},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function wf(e){let t=e.cleanup,r=Lr(t.step);return l`<li
    class="worker-ev"
    data-bead-id=${t.bead_id}
    data-state="cleanup_stalled"
  >
    <span
      class="worker-ev__t"
      title=${e.at?pt(e.at):""}
      >${us(e.at)||"\u2014"}</span
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
        ${ul(t.step).map(n=>l`<li
              class="worker-step worker-step--${n.state}"
              data-step=${n.step}
            >
              <span class="worker-step__pip" aria-hidden="true"></span>
              <span class="worker-step__lb">${n.label}</span>
            </li>`)}
      </ol>
      ${Kl(_s(t.reason),typeof t.retry_count=="number"&&t.retry_count>0?`${t.retry_count}\uD68C \uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uD6C4\uC5D0\uB3C4 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.`:"\uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.",!0)}
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
      ${Vl([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:t.reason||""},{term:"\uC9C4\uB2E8",value:t.detail||""},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function kf(e){return l`<section class="worker-repo-drawer" data-seam="repo-ops-timeline">
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
          ${e.events.map(t=>t.type==="cleanup"?wf(t):yf(t))}
        </ul>`}
  </section>`}function Zl(e,t={}){let r=null;function n(){Ue(r?kf(r):l``,e)}e.addEventListener("click",a=>{a.target?.closest?.('[data-seam="repo-ops-close"]')&&o()});function s(a){r={events:hf(a.operations,a.cleanup_failures),repo:a.repo||""},n()}function o(){r!==null&&(r=null,n(),t.onClose&&t.onClose())}return{open:s,close:o,isOpen:()=>r!==null,refresh(a){r&&s(a)}}}var $f="tab:worker:ready",xf="tab:worker:blocked",Sf="tab:worker:in-progress",Af="tab:worker:closed",xn=1,Tf=new Set(["done","failed","orphaned","stopped","discarded"]);function Xl(e){return gn(e).path.length>0}var ec="beads-ui.worker.candidate-filter",Oo={show_blocked:!1,spec:"all"};function Ef(){try{let e=window.localStorage.getItem(ec);if(!e)return{...Oo};let t=JSON.parse(e);if(!t||typeof t!="object")return{...Oo};let r=t.spec;return{show_blocked:t.show_blocked===!0,spec:r==="with"||r==="without"?r:"all"}}catch{return{...Oo}}}function Cf(e){try{window.localStorage.setItem(ec,JSON.stringify(e))}catch{}}function Rf(e,t){let r=i=>t.show_blocked||!i.blocked,n=i=>t.spec==="all"||(t.spec==="with"?i.has_spec:!i.has_spec),s=[],o=0,a=0;for(let i of e){let c=r(i),u=n(i);c&&u?s.push(i):!c&&u?o+=1:c&&!u&&(a+=1)}return{visible:s,hidden_blocked:o,hidden_spec:a}}var If=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],tc="bdui.worker.candidate_sort",Lf=[{value:"spec",label:"spec \uC6B0\uC120"},{value:"board",label:"Board \uC21C\uC11C"},{value:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131\uC21C"}],gs="spec";function Of(){try{let e=window.localStorage.getItem(tc);return e==="board"||e==="created"||e==="spec"?e:gs}catch{return gs}}function Df(e){try{window.localStorage.setItem(tc,e)}catch{}}var rc="bdui.worker.done-range";function Mf(){try{let e=window.localStorage.getItem(rc);return Rt(e)?e:At}catch{return At}}function Nf(e){try{window.localStorage.setItem(rc,e)}catch{}}var Pf="(max-width: 640px)",nc="beads-ui.worker.lane-collapsed",Sn={queue:!0,done:!0};function Ff(){try{let e=window.localStorage.getItem(nc);if(!e)return{...Sn};let t=JSON.parse(e);return!t||typeof t!="object"?{...Sn}:{queue:typeof t.queue=="boolean"?t.queue:Sn.queue,done:typeof t.done=="boolean"?t.done:Sn.done}}catch{return{...Sn}}}function qf(e){try{window.localStorage.setItem(nc,JSON.stringify(e))}catch{}}function Ql(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let r=typeof t.title=="string"?t.title:t.id||"";return r.length>22?`${r.slice(0,22)}\u2026`:r}function Bf(e,t,r){let n=Array.isArray(e)?e.slice():[];return t==="created"?n.sort(Ar):(n.sort(Mn(r)),t==="board"?n:[...n.filter(Xl),...n.filter(s=>!Xl(s))])}function Uf(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function jf(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function zf(e){let r=(Array.isArray(e?.dependencies)?e.dependencies:[]).map(n=>typeof n=="string"?n:n&&n.id).filter(Boolean);return r.length>0?`\u{1F512} ${r.join(", ")}`:"\u{1F512} blocked"}var Hf=["closed_unmerged","review","undecidable"],Wf=[{from:"\uAD00\uCE21 \uB300\uAE30",activity:"checking",to:"\uD655\uC778\uC911"},{from:"\uAC80\uC99D \uB300\uAE30",activity:"verifying",to:"\uAC80\uC99D \uC911"}];function Gf(e,t){for(let r of Wf)if(e===r.from&&t===r.activity)return{label:r.to,live:!0};return{label:e,live:!1}}function Jl(e){switch(e){case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";default:return e}}function Yf(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}function Do(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}function Vf(e){if(!e||typeof e!="object")return null;let t=Number.isInteger(e.repair_sessions_used)?Math.max(0,e.repair_sessions_used):0,r=Number.isInteger(e.repair_session_cap)?Math.max(0,e.repair_session_cap):0,n=e.current_repair&&typeof e.current_repair=="object"?e.current_repair:null,s=n&&typeof n.pr_number=="number"?n.pr_number:null,o="";switch(e.phase){case"gating":o="root \uC7AC\uAC80\uC99D \uC911";break;case"repairing":o=e.subject_role==="root"?`\uC790\uB3D9\uBCF5\uAD6C ${t}/${r} \xB7 \uC6D0 PR \uC218\uC815 \uC911`:`\uC790\uB3D9\uBCF5\uAD6C ${t}/${r} \xB7 repair PR \uC900\uBE44 \uC911`;break;case"waiting_repair_pr":o=s?`repair PR #${s} \uB300\uAE30`:"repair PR \uB300\uAE30";break;case"merging":o=e.subject_role==="repair"?s?`repair PR #${s} \uBA38\uC9C0 \uC911`:"repair PR \uBA38\uC9C0 \uC911":"root \uBA38\uC9C0 \uC911";break;case"cleaning":o="\uC815\uB9AC \uBCF5\uAD6C \uC911";break;case"paused":o="\uC790\uB3D9\uBCF5\uAD6C \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":o=`\uC0AC\uB78C \uD655\uC778 \uD544\uC694 \xB7 ${e.terminal_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`;break;case"completed":return null;default:return null}let a=[`\uBCF5\uAD6C \uC138\uC158 ${t}/${r}`];return e.head_sha&&a.push(`head ${e.head_sha}`),e.base_sha&&a.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&a.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`),e.active_attempt_id&&a.push(`attempt ${e.active_attempt_id}`),n&&typeof n.bead_id=="string"&&a.push(`repair ${n.bead_id}`),e.evidence&&a.push(e.evidence),e.log_path&&a.push(e.log_path),{badge:o,title:a.join(`
`),alert:e.phase==="needs_human",lock_actions:e.phase!=="paused"&&e.phase!=="needs_human",repair_pr_url:n&&typeof n.pr_url=="string"?n.pr_url:"",repair_pr_number:s}}function Kf(e,t,r,n,s=null,o=null,a=null,i=!1,c=null,u=!0,f=null,_=null,b=null,T={},$=!1){let E=!!c&&c.position>0,U=!!c?.continuation_action&&c.continuation_action.continuation===null,x=!!c&&c.active===!0,V=c&&c.failure||null,ee=r[e]||null,O=ee&&ee.gate?ee.gate:null,D=ee&&ee.pr?ee.pr:null,S=Vf(b),z=Yf(c?c.resolution:null),L=[];i&&L.push("\uC138\uC158");let pe=a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":z?z.badge:a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":null,ve=Gf(i&&O&&O.tier==="closed_unmerged"?"\uB2EB\uD798":O&&O.gate_badge||"",pe?null:o&&o.activity||null);if(pe&&L.push(pe),ve.label&&L.push(ve.label),O&&O.base_badge&&O.base_badge!==O.gate_badge&&L.push(O.base_badge),_&&L.push(_),n){let ge=Lr(n.step);L.push(ge?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${ge}`:"\uC815\uB9AC \uBA48\uCDA4")}S&&L.push(S.badge),E&&!x&&L.push(`\uBA38\uC9C0 \uB300\uAE30 #${c.position}`),V&&L.push(`\uC77C\uAD04 \uBA38\uC9C0 \uC2E4\uD328: ${Jl(V)}`),U&&L.push("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"),f&&L.push(`\uC790\uB3D9 \uC81C\uC678: ${Jl(f)}`);let ae=!!O&&O.base_badge==="\uCDA9\uB3CC",be=!!O&&O.enabled===!0,Ce=wo(o&&o.merge_progress?o.merge_progress.step:null),Ge=!!n&&["child_sweep","branch_cleanup","parent_close"].includes(n.step)&&!!O&&O.tier==="merged",Xe=i&&!!n&&!!O&&O.tier==="merged",ze=i&&ae&&u===!1,Se=Vt(T,e,{external:i,merge_active:x||!!Ce,merge_queued:E,conflict_active:!!a,cleanup_active:!1,merged:!!n||O?.tier==="merged"}),xe=!!Se.operation,_e=!Ge&&!!n&&n.step==="repo_operations";return{id:e,title:t,reason:n?fs(n.step):"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",worker_serial:$,external:i,pr_number:D&&typeof D.number=="number"?D.number:null,pr_url:D&&typeof D.url=="string"?D.url:"",completion_badge:S?S.badge:null,completion_title:S?S.title:"",completion_repair_pr_url:S?S.repair_pr_url:"",completion_repair_pr_number:S?S.repair_pr_number:null,badges:L,live_badge:a==="paused"?null:z?.live||a==="running"?pe:ve.live?ve.label:null,usage:s,alert:!!O&&Hf.includes(O.tier)||!!n||!!V||!!(S&&S.alert),merge_action:_e?!1:!E||U,timeline_action:_e,cancel_action:E&&!U,cancel_enabled:!x&&!(S&&S.lock_actions),cancel_title:S&&S.lock_actions?"\uC790\uB3D9\uBCF5\uAD6C \uC911 \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694":x?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:Se,discard_action:Se.action,merge_step:Ce,discard_enabled:Se.enabled,discard_title:Se.title,merge_enabled:!Ce&&!a&&!xe&&!(S&&S.lock_actions)&&!ze&&!_e&&(be||ae||Ge||Xe),merge_label:U?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":Ge||Xe?"\uC815\uB9AC \uC7AC\uAC1C":ae&&!Ce&&!Ge?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:xe?Se.error?`\uD3D0\uAE30 \uC2E4\uD328: ${Se.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${Se.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:U?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":Ce?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${Ce.label}`:Xe?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":ze?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":Ge?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":ae?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":be?`\uBA38\uC9C0 (${O.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:O&&O.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${O&&O.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function Mo(e,t={}){let{transport:r,issueStores:n,queueStore:s,execPresetStore:o,sessionLogStore:a,uiOrderStore:i,gotoIssue:c,getWorkspacePath:u,doneRange:f,onDoneRangeChange:_}=t,b=n?Pn(n,i):null,T=qn({transport:r,uiOrderStore:i}),$=null,E=[],U=Ef(),x=Of(),V=Rt(f)?f:Mf(),ee=new Map;function O(){let p=Gt.find(y=>y.value===V);return p?p.label:"\uC624\uB298"}let D=Ff(),S=!1,z=new Set,L=new Set,pe=new Set,ve=new Set,ae="ordinary",be=!1,Ce=new Map,Ge=[],Xe=document.createElement("div");Xe.className="worker-console";let ze=document.createElement("div");ze.className="worker-top";let Se=document.createElement("div");Se.className="worker-drawer-overlay",Se.hidden=!0;let xe=document.createElement("div");xe.className="worker-drawer-overlay__backdrop";let _e=document.createElement("div");_e.className="worker-drawer-host";let ge=document.createElement("div");ge.className="worker-drawer-host",ge.hidden=!0,Se.append(xe,_e,ge);let he=document.createElement("div");he.className="worker-lanes-host",Xe.append(ze,Se,he),e.appendChild(Xe);let G=null,K=os(_e,{transport:r,sessionLogStore:a,onClose:()=>{G=null,Se.hidden=!0,te()}}),Re=Zl(ge,{onClose:()=>{ge.hidden=!0,Se.hidden=!0,te()}}),me=cs(Xe,{queueStore:s,presetStore:o,transport:r,getWorkspacePath:u});function fe(){return s&&s.get()||{revision:0,auto_advance:!1,auto_merge:!1,pr_wait_holds_slot:!1,slots:xn,queue:[],pr_wait:[],done:[]}}function I(){let p=fe();return typeof p.revision=="number"?p.revision:0}function R(p){p&&p.queue&&s&&s.set(p.queue)}function ie(){let p=fe().queue;return Array.isArray(p)?p.length:0}async function De(p,y){if(!r)return;let N=await r("worker-queue-place",{bead_id:p,index:y,expected_revision:I()});R(N),N&&N.conflict&&await r("worker-queue-place",{bead_id:p,index:y,expected_revision:I()}).then(R)}async function Ae(p,y){if(!r)return;let N=await r("worker-queue-reorder",{bead_id:p,to_index:y,expected_revision:I()});R(N),N&&N.conflict&&await r("worker-queue-reorder",{bead_id:p,to_index:y,expected_revision:I()}).then(R)}async function je(p){if(!r)return;let y=await r("worker-queue-remove",{bead_id:p,expected_revision:I()});R(y),y&&y.conflict&&await r("worker-queue-remove",{bead_id:p,expected_revision:I()}).then(R)}async function Me(){if(!r||be)return;let y=(Array.isArray(fe().queue)?fe().queue:[]).map(A=>A.bead_id).filter(A=>ve.has(A));if(y.length===0)return;if(y.some(A=>{let Z=Ce.get(A);return Z!==!0&&Z!==!1})){Q("\uC2E4\uD589 \uBC29\uC2DD \uD655\uC778 \uC911","warning");return}let N=ae==="serial",se=y.filter(A=>Ce.get(A)!==N);if(se.length===0){ve.clear(),te(),Q("\uC774\uBBF8 \uAC19\uC740 \uC2E4\uD589 \uBC29\uC2DD\uC785\uB2C8\uB2E4","info");return}be=!0,te();let j=[],g=0;try{for(let A of se){let Z=await Promise.resolve(r(N?"label-add":"label-remove",{id:A,label:Lo})).catch(()=>[]),ue=Array.isArray(Z)?Z[0]:Z,Pe=ue&&typeof ue=="object"?ue.labels:null;ue&&typeof ue=="object"&&ue.id===A&&Array.isArray(Pe)&&$n(Pe)===N?g+=1:j.push(A)}if(j.length===0){ve.clear(),Q(`${g}\uAC1C \uC2E4\uD589 \uBC29\uC2DD \uBCC0\uACBD`,"success");return}ve.clear();for(let A of j)ve.add(A);Q(`${se.length}\uAC1C \uC911 ${g}\uAC1C \uBCC0\uACBD \xB7 ${j.length}\uAC1C \uC2E4\uD328 (${j.join(", ")})`,"error")}finally{be=!1,te()}}async function Le(p){if(!r||!p)return;let y=await r("worker-attempt-pause",{attempt_id:p});y&&y.paused===!1&&y.reason&&Q(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${y.reason}`,"error",2400)}async function Ie(p){if(!r||!p)return;let y=async(se={})=>await r("worker-attempt-resume",{attempt_id:p,expected_revision:I(),...se}),N=await y();R(N),N&&N.conflict&&(N=await r("worker-attempt-resume",{attempt_id:p,expected_revision:I()}),R(N)),N=await tr(N,(se,j)=>y({continuation:se,decision_token:j}),{onResult:R,refresh:()=>y()}),N&&N.resumed===!1&&!N.conflict&&N.reason&&Q(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${N.reason}`,"error",2400)}async function Je(p){if(!r||!p)return;let y=await r("worker-attempt-dismiss",{attempt_id:p,expected_revision:I()});R(y),y&&y.conflict&&(y=await r("worker-attempt-dismiss",{attempt_id:p,expected_revision:I()}),R(y)),y&&y.dismissed===!1&&!y.conflict&&y.reason&&Q(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${y.reason}`,"error",2400)}async function M(p,y,N=!0){if(!r)return null;let se=r,j=await se(p,{...y,expected_revision:I()});return R(j),j&&j.conflict&&N&&(j=await se(p,{...y,expected_revision:I()}),R(j)),j}async function H(p){if(!r||!p)return;let y=fe().merge_queue?.find(se=>se.bead_id===p)?.continuation_action;if(y?.mismatch&&y.continuation===null){await X(p,y.mismatch);return}z.add(p),te();let N;try{N=await M("worker-merge-queue-add",{bead_id:p})}finally{z.delete(p),te()}!N||N.conflict||N.applied||Q("\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)","error",2400)}async function q(p){if(!(!r||!p||L.has(p))){L.add(p),te();try{let y=await r("worker-cleanup-retry",{bead_id:p,expected_revision:I()});R(y),y&&!y.retried&&!y.conflict&&y.reason&&Q(`\uC815\uB9AC \uC7AC\uAC1C \uAC70\uBD80: ${y.reason}`,"error",2400)}finally{L.delete(p),te()}}}async function X(p,y){let N=await tr({continuation_mismatch:y},(j,g)=>M("worker-merge-queue-add",{bead_id:p,continuation:j,decision_token:g},!1)),se=N?.queue?.merge_queue?.find(j=>j.bead_id===p)?.continuation_action;if(N?.applied!==!0&&se?.continuation===null&&se.mismatch){await X(p,se.mismatch);return}N&&N.applied===!1&&!N.conflict&&Q("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD\uC774 \uCD5C\uC2E0 \uC0C1\uD0DC\uC640 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4","error",2800)}async function ce(p){if(!r)return;let y=await M("worker-merge-auto-toggle",{on:p});!y||y.conflict||Q(p?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",p?"success":"info",2400)}async function w(p){if(!r||!p)return;let y=await M("worker-merge-queue-remove",{bead_id:p});y&&!y.conflict&&!y.applied&&y.reason==="merge_active"&&Q("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function C(){await M("worker-merge-queue-remove",{all:!0})}async function W(p,y=null,N="unmerged",se=null){if(!r||!p)return;let j=bn(p,N);if(!(typeof globalThis.confirm!="function"||globalThis.confirm(j)))return;let A=await r("worker-discard",{bead_id:p,...y?{attempt_id:y}:{},...se?{operation_id:se}:{},expected_revision:I()});if(R(A),A&&A.conflict&&(A=await r("worker-discard",{bead_id:p,...y?{attempt_id:y}:{},...se?{operation_id:se}:{},expected_revision:I()}),R(A)),A&&A.discarded===!0){Q(ps(A),"success",5e3);return}if(A&&A.reason){Q(`\uD3D0\uAE30 \uC2E4\uD328: ${A.reason}`,"error",2800);return}if(A&&A.accepted&&A.pending==="merged_revert"){Q("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(A&&A.accepted&&!A.discarded){Q(`\uD3D0\uAE30 \uC9C4\uD589: ${A.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}A&&!A.conflict&&Q("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function le(p,y){if(!r||!y||pe.has(y))return;pe.add(y),te();let N;try{let se=async(j={})=>await r(p,{bead_id:y,expected_revision:I(),...j});N=await se(),R(N),N&&N.conflict&&(N=await r(p,{bead_id:y,expected_revision:I()}),R(N)),p==="worker-revise-fix"&&(N=await tr(N,(j,g)=>se({continuation:j,decision_token:g}),{onResult:R,refresh:()=>se()}))}finally{pe.delete(y),te()}if(!(!N||N.conflict)){if(N.ok){Q(p==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}Q(`\uCC98\uBD84 \uAC70\uBD80: ${N.reason||""}`,"error",3e3)}}async function ne(p){if(!r)return;let y=await r("worker-automation-toggle",{on:p,expected_revision:I()});R(y),y&&y.conflict&&await r("worker-automation-toggle",{on:p,expected_revision:I()}).then(R)}async function Oe(p){if(!r||!p)return;let y=await r("worker-repo-operation-repair",{operation_id:p});if(R(y),y&&y.ok===!1){Q(`\uD574\uACB0 \uC138\uC158 \uAC70\uBD80: ${y.reason||""}`,"error",3e3);return}y&&y.ok===!0&&Q("\uD574\uACB0 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4","success",2400)}async function Ne(p){if(!r||!p)return;let y=await r("worker-repo-operation-dismiss",{operation_id:p});R(y),y&&y.ok===!1&&Q(`\uAE30\uB85D \uB2EB\uAE30 \uAC70\uBD80: ${y.reason||""}`,"error",3e3)}async function et(p){if(!r||!Number.isFinite(p))return;let y=Math.max(xn,Math.floor(p)),N=await r("worker-queue-set-slots",{slots:y,expected_revision:I()});R(N),N&&N.conflict&&await r("worker-queue-set-slots",{slots:y,expected_revision:I()}).then(R)}async function Fe(p){if(!r)return;let y=await r("worker-queue-set-pr-wait-hold",{on:p,expected_revision:I()});R(y),y&&y.conflict&&await r("worker-queue-set-pr-wait-hold",{on:p,expected_revision:I()}).then(R)}function ut(){let p=fe(),y=b?b.selectBoardColumn($f,"ready"):[],N=b?b.selectBoardColumn(xf,"blocked"):[],se=b?b.selectBoardColumn(Af,"closed"):[],j=b?b.selectBoardColumn(Sf,"in_progress"):[],g=new Map;for(let h of j){let P=jf(h);if(!P)continue;let re=g.get(P);re?re.push(h):g.set(P,[h])}let A=h=>{let P=Fn(g.get(h)||[]);return P?P.title||P.id:null},Z=p.bead_titles||{},ue=new Map;for(let[h,P]of Object.entries(Z))typeof P=="string"&&P.length>0&&ue.set(h,P);for(let h of[...y,...N])ue.set(h.id,h.title||h.id);Ce.clear();let Pe=p.bead_times&&typeof p.bead_times=="object"&&!Array.isArray(p.bead_times)?p.bead_times:{},He=p.bead_labels&&typeof p.bead_labels=="object"&&!Array.isArray(p.bead_labels)?p.bead_labels:{};for(let[h,P]of Object.entries(He))Array.isArray(P)&&Ce.set(h,$n(P));for(let h of[...y,...N]){let P=h.labels;if(!Array.isArray(P))continue;if(!Ce.has(h.id)){Ce.set(h.id,$n(P));continue}let re=Pe[h.id],Ve=er(re&&typeof re=="object"?re.updated_at:null),Wt=er(h.updated_at);Wt!==null&&Ve!==null&&Wt>Ve&&Ce.set(h.id,$n(P))}let m=new Map;for(let[h,P]of Object.entries(Pe))P&&typeof P=="object"&&m.set(h,P);for(let h of[...y,...N])m.set(h.id,{created_at:h.created_at,updated_at:h.updated_at});let d=h=>m.get(h)||{},k=p.pr_wait||[],v=p.pr_observations||{},F=p.pr_activity||{},J=p.cleanup_failed||{},ye=Object.entries(J).map(([h,P])=>({bead_id:h,step:P&&P.step?P.step:"",reason:P&&P.reason?P.reason:"",at:P&&typeof P.at=="number"?P.at:null,detail:P&&typeof P.detail=="string"?P.detail:null,output_tail:P&&typeof P.output_tail=="string"&&P.output_tail?P.output_tail:void 0,log_path:P&&typeof P.log_path=="string"&&P.log_path?P.log_path:void 0,retry_count:P&&typeof P.retry_count=="number"&&Number.isInteger(P.retry_count)&&P.retry_count>0?P.retry_count:0,failure_code:P&&typeof P.failure_code=="string"?P.failure_code:void 0,subject_id:P&&typeof P.subject_id=="string"?P.subject_id:void 0,repair_eligible:!!(P&&P.repair_eligible),repair:P&&P.repair?P.repair:void 0})),it=p.queue||[],qe=new Set(it.map(h=>h.bead_id));for(let h of ve)qe.has(h)||ve.delete(h);let Nt=new Set([...it.map(h=>h.bead_id),...k.map(h=>h.bead_id),...p.done.map(h=>h.bead_id)]),ke=new Set(N.map(h=>h.id)),lt=i?i.get()?.order||{}:{},Or=new Set,qo=[];for(let h of[...y,...N])Nt.has(h.id)||Or.has(h.id)||Uf(h)||Hl(h.labels)||(Or.add(h.id),qo.push(h));E=Bf(qo,x,lt);let mc=p.admission||{},Bo=h=>{let P=mc[h];if(!P)return"";if(P.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let re=typeof P.reason=="string"?P.reason:"",Ve=re.indexOf(":");return Ve>0&&Ve<re.length-1?`\u26D4 ${re.slice(0,Ve)} (${re.slice(Ve+1)})`:`\u26D4 ${re}`},gc=E.map(h=>{let P=gn(h),re=P.path.length>0,Ve=h.workflow?.route==="quick_fix"||h.metadata&&h.metadata.route==="quick_fix",Wt=!Ve&&re&&!P.conflict,lr=ke.has(h.id),Ct=[];lr&&Ct.push(zf(h)),Ve?Ct.push("quick_fix \xB7 \uC6CC\uCEE4 \uBE44\uB300\uC0C1"):P.conflict?Ct.push("spec_id_conflict"):re||Ct.push("spec \uC5C6\uC74C");let In=Bo(h.id);return In&&Ct.push(In),{id:h.id,title:h.title||h.id,reason:Ct.join(" \xB7 "),draggable:Wt,lane:"candidate",created_at:h.created_at,updated_at:h.updated_at,workflow:h.workflow,is_quick_fix:Ve,status:h.status,blocked:lr,has_spec:re}}),hs=Rf(gc,U),hc=hs.visible,bc=p.revise_parked||{},Yr=p.discard_operations&&typeof p.discard_operations=="object"&&!Array.isArray(p.discard_operations)?p.discard_operations:{},Uo=(h,P)=>h.map(re=>{let Ve=P==="queue"?bc[re.bead_id]:null,Wt=P==="queue"?Vt(Yr,re.bead_id):null,lr=Wt?.operation?Wt:null,Ct=P==="queue"?Ce.has(re.bead_id)?Ce.get(re.bead_id)||!1:null:!1,In=Ct===!0&&(Object.values(p.attempts||{}).some(Qt=>Qt&&Qt.bead_id!==re.bead_id&&!Tf.has(Qt.status))||k.some(Qt=>Qt.bead_id!==re.bead_id)||Object.values(Yr).some(Qt=>Qt&&Qt.bead_id!==re.bead_id&&Qt.phase!=="done")),aa=P==="done"?[]:[Bo(re.bead_id)];return In&&aa.unshift("\uB2E4\uB978 \uC791\uC5C5 \uC885\uB8CC \uB300\uAE30 \xB7 \uBA38\uC9C0\uAE4C\uC9C0 \uB2E8\uB3C5"),{id:re.bead_id,title:ue.get(re.bead_id)||re.bead_id,reason:aa.filter(Boolean).join(" \xB7 "),draggable:P!=="done"&&!lr,done:P==="done",lane:P,selectable:P==="queue",selected:P==="queue"&&ve.has(re.bead_id),worker_serial:Ct,discard:lr,badges:Ve?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!Ve,revise_action:!!Ve,revise_enabled:!!Ve&&!lr&&!pe.has(re.bead_id),revise_title:Ve?Ve.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${Ve.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":"",usage:P==="done"?It(p.attempts||{},re.bead_id):null,done_at:P==="done"&&typeof re.added_at=="number"?re.added_at:void 0,...d(re.bead_id)}}),jo=new Map;for(let h of p.done)h&&typeof h.bead_id=="string"&&typeof h.added_at=="number"&&jo.set(h.bead_id,h.added_at);let Vr=p.attempts?Object.values(p.attempts):[],bs=new Set;for(let h of Vr)h&&typeof h.resumed_from=="string"&&h.resumed_from.length>0&&bs.add(h.resumed_from);let vs=new Map;for(let h of Vr)vs.set(h.bead_id,h.attempt_id);let ys=new Map;for(let h of Vr)ys.set(h.attempt_id,h);function ws(h){let P=new Set,re=h;for(;re&&!P.has(re.attempt_id);){if(re.conflict_resolution===!0)return!0;P.add(re.attempt_id),re=typeof re.resumed_from=="string"&&re.resumed_from.length>0&&ys.get(re.resumed_from)||null}return!1}let An=typeof p.declared_base=="string"?p.declared_base:null;function vc(h){let P=null;for(let re of Vr)!re||re.bead_id!==h||ws(re)||(P===null||(typeof re.started_at=="number"?re.started_at:0)>=(typeof P.started_at=="number"?P.started_at:0))&&(P=re);return P&&typeof P.target_base=="string"?P.target_base:null}let zo=[],Ho=[],yc=h=>{let P=vs.get(h.bead_id)!==h.attempt_id,re=jo.get(h.bead_id),Ve=typeof re=="number"&&re>0&&typeof h.finished_at=="number"&&re>=h.finished_at;return!P&&!Ve&&typeof h.dismissed_at!="number"},Wo=h=>{let P=typeof h.session_id=="string"&&h.session_id.length>0,re=bs.has(h.attempt_id);return{eligible:P&&!re,reason:P?re?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}},Pt=null;for(let h of Vr){let P=h.status==="paused"&&!bs.has(h.attempt_id);if(h.status==="running"||P)Ho.push({bead_id:h.bead_id,attempt_id:h.attempt_id,title:ue.get(h.bead_id)||h.bead_id,runner:h.runner||null,model:h.model||null,effort:h.effort||null,speed:h.speed||null,continuation_mode:h.continuation_mode||null,started_at:typeof h.started_at=="number"?h.started_at:null,resumed_from:h.resumed_from||null,paused:P,conflict_resolution:ws(h),base_exception:Do(An,h.target_base),can_pause:typeof h.session_id=="string"&&h.session_id.length>0,discard:Vt(Yr,h.bead_id,{attempt_id:h.attempt_id}),usage:It(p.attempts||{},h.bead_id),current_child:A(h.bead_id),...d(h.bead_id)});else if((h.status==="failed"||h.status==="orphaned")&&yc(h)){let re=Wo(h);zo.push({bead_id:h.bead_id,attempt_id:h.attempt_id,title:ue.get(h.bead_id)||h.bead_id,runner:h.runner||null,model:h.model||null,effort:h.effort||null,speed:h.speed||null,continuation_mode:h.continuation_mode||null,started_at:typeof h.started_at=="number"?h.started_at:null,resumed_from:h.resumed_from||null,failed:!0,status:h.status,status_label:h.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328",discard:Vt(Yr,h.bead_id,{attempt_id:h.attempt_id}),resume_eligible:re.eligible,resume_reason:re.reason,conflict_resolution:ws(h),base_exception:Do(An,h.target_base),usage:It(p.attempts||{},h.bead_id),current_child:A(h.bead_id),...d(h.bead_id)}),Pt=h}}let Tn=[...zo,...Ho],Go=null;if(Pt){let h=Wo(Pt),P=Pt.cause_detail;Go={bead_id:Pt.bead_id,repo:Pt.repo||"",reason:Pt.cause||Pt.status,cause_detail:P&&typeof P.reason=="string"?{reason:P.reason,command:typeof P.command=="string"?P.command:null}:null,resume_attempt_id:Pt.attempt_id,resume_eligible:h.eligible,resume_reason:h.reason,discard:Vt(Yr,Pt.bead_id,{attempt_id:Pt.attempt_id})}}let wc=new Set(Tn.map(h=>h.bead_id)),ks=Array.isArray(p.merge_queue)?p.merge_queue:[],Yo=new Map,Vo=new Map,Ko=new Map;ks.forEach((h,P)=>{h&&typeof h.bead_id=="string"&&(Yo.set(h.bead_id,P+1),Vo.set(h.bead_id,h.resolution),Ko.set(h.bead_id,h.continuation_action||null))});let Zo=p.merge_queue_state||{active:null,failures:{}},kc=Zo.failures||{},$c=p.auto_merge_skips||{},Xo=h=>{let P=$c[h];if(!P)return null;let re=v[h],Ve=re&&re.pr?re.pr.head_sha:null;return Ve&&Ve===P.head_sha?P.reason||"":null},En=new Map;for(let h of Tn)h.failed!==!0&&h.conflict_resolution&&(h.paused?En.has(h.bead_id)||En.set(h.bead_id,"paused"):En.set(h.bead_id,"running"));let Qo=Tn.filter(h=>!h.paused&&h.failed!==!0).length,Jo=(p.workspace_info||{}).slots,xc=typeof Jo=="number"?Jo:typeof p.slots=="number"?p.slots:xn,ea=p.pr_wait_holds_slot===!0?xn:xc,Sc=Qo>ea,Cn=xr(V),Ac=(Array.isArray(p.done)?p.done.slice():[]).filter(h=>Cn===void 0||typeof h.added_at!="number"||h.added_at>=Cn).sort((h,P)=>(P.added_at||0)-(h.added_at||0)),Kr=Uo(Ac,"done"),Tc=new Set((Array.isArray(p.done)?p.done:[]).map(h=>h?.bead_id).filter(h=>typeof h=="string")),ta=[],Ec=u?.()||"";for(let h of se){let P=er(h.closed_at);if(typeof h.id!="string"||Tc.has(h.id)||P===null||Cn!==void 0&&P<Cn||typeof h.comment_count!="number"||h.comment_count<=0)continue;let re=`${Ec}\0${h.id}\0${String(h.updated_at)}\0${h.comment_count}`,Ve=ee.get(re);Ve===void 0&&r&&(ee.set(re,"pending"),Promise.resolve(r("get-comments",{id:h.id})).then(Wt=>{let lr=Array.isArray(Wt)&&Wt.some(Ct=>as(typeof Ct?.text=="string"?Ct.text:"")?.lane==="session");ee.set(re,lr?"session":"not-session"),te()}).catch(()=>{ee.set(re,"failed"),te()})),Ve==="session"&&ta.push({id:h.id,title:h.title||h.id,reason:"",draggable:!1,done:!0,lane:"done",selectable:!1,selected:!1,worker_serial:!1,badges:["\uC138\uC158 \uC791\uC5C5"],alert:!1,usage:null,done_at:P,created_at:h.created_at,updated_at:h.updated_at})}Kr.push(...ta),Kr.sort((h,P)=>(P.done_at||0)-(h.done_at||0));let Rn={};for(let h of rr)Rn[h]=0;let ra=!1,na=0,$s=0,sa=0;for(let h of Kr){let P=h.usage;if(P&&typeof P=="object"){let re=!1;for(let Ve of rr)Number.isFinite(P[Ve])&&(Rn[Ve]+=P[Ve],ra=!0,re=!0);re&&($s+=1,Number.isFinite(P.total_cost_usd)&&(na+=P.total_cost_usd,sa+=1))}}$s>0&&sa===$s&&(Rn.total_cost_usd=na);let oa=Kr.map(h=>h.usage).filter(h=>h&&typeof h=="object"&&h.providers),Cc=oa.length>0?ht(Wn(oa)):ra?qt(Rn):null;return{queue:p,idToTitle:ue,candidates:hc,candidate_hidden:{blocked:hs.hidden_blocked,spec:hs.hidden_spec},running:Tn,live_count:Qo,slots:ea,over_cap:Sc,failure:Go,waiting:Uo(it.filter(h=>!wc.has(h.bead_id)),"queue"),pr_wait:k.map(h=>Kf(h.bead_id,ue.get(h.bead_id)||h.bead_id,v,J[h.bead_id]||null,It(p.attempts||{},h.bead_id),F[h.bead_id]||(z.has(h.bead_id)||L.has(h.bead_id)?{activity:null,merge_progress:{step:"merging"}}:null),En.get(h.bead_id)||null,h.external===!0,{position:Yo.get(h.bead_id)||0,active:Zo.active===h.bead_id,failure:kc[h.bead_id]||null,resolution:Vo.get(h.bead_id),continuation_action:Ko.get(h.bead_id)},h.wt_present!==!1,p.auto_merge===!0?Xo(h.bead_id):null,Do(An,vc(h.bead_id)),p.completion_status&&typeof p.completion_status=="object"&&!Array.isArray(p.completion_status)&&p.completion_status[h.bead_id]||null,p.discard_operations&&typeof p.discard_operations=="object"&&!Array.isArray(p.discard_operations)?p.discard_operations:{},ys.get(vs.get(h.bead_id)||"")?.worker_serial===!0)).map(h=>({...h,...d(h.id)})),merge_queue_length:ks.length,merge_queue_running:ks.length>0,auto_excluded:k.map(h=>h.bead_id).filter(h=>Xo(h)!==null),verify_cmd_present:!!(p.workspace_info||{}).verify_cmd,declared_base:An,done:Kr,token_total:Cc,cleanup_failures:ye,repo_operations:Array.isArray(p.repo_operations)?p.repo_operations:[]}}function _t(p){let y=p.waiting.length>0?p.waiting[0].id:"\u2014",N=l`<button
      type="button"
      class="worker-play${p.queue.auto_advance?" is-active":""}"
    >
      ${p.queue.auto_advance?"\u23F8 \uC790\uB3D9\uD654 \uBA48\uCDA4":"\u25B6 \uC790\uB3D9\uD654"}
    </button>`,se=Y(p),j=p.over_cap?l`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",g=l`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${p.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${p.pr_wait.length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${O()} 완료 <b>${p.done.length}</b></span
      >`,A=l`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${p.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${p.declared_base||"?"}</span
    >`,Z=l`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${xn}
          step="1"
          .value=${String(p.slots)}
          ?disabled=${p.queue.pr_wait_holds_slot===!0}
          title=${p.queue.pr_wait_holds_slot===!0?"\uBA38\uC9C0\uAE4C\uC9C0 \uC21C\uCC28 \uC2E4\uD589 \uC911 \u2014 \uD574\uC81C\uD558\uBA74 \uC800\uC7A5\uB41C \uB3D9\uC2DC \uC2E4\uD589 \uC218\uB85C \uB3CC\uC544\uAC11\uB2C8\uB2E4":"\uB3D9\uC2DC\uC5D0 \uC2E4\uD589\uD560 \uC138\uC158 \uC218 (\uCD5C\uC18C 1 = \uC21C\uCC28 \uC2E4\uD589)"}
      /></label>
      <label
        class="worker-tgl"
        title="각 이슈가 PR 머지·정리를 마칠 때까지 다음 이슈를 시작하지 않습니다"
      >
        <input
          type="checkbox"
          class="worker-pr-wait-hold"
          .checked=${p.queue.pr_wait_holds_slot===!0}
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
      </button>`,ue=hl({failure:p.failure}),Pe=cl(p.repo_operations,p.cleanup_failures);return S?l`<div class="worker-ribbon">
          ${N} ${se}
          <div class="worker-kpi worker-kpi--ribbon">${j}${g}</div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${Z}</div>
          <div class="worker-kpi">${A}</div>
        </div>
        ${Pe}${ue}`:l`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${N}${se}${Z}</div>
        <div class="worker-kpi">
          ${j}${g}${A}
          ${(Array.isArray(p.token_total)?p.token_total:p.token_total?[{label:p.token_total,tooltip:`${O()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(He=>l`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${He.tooltip}
                >${O()} 완료 · 누적 ${He.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${y}</b></span
          >
        </div>
      </div>
      ${Pe}${ue}`}function rt(p){if(p.running.length===0&&p.pr_wait.length===0)return"";let y=p.running.some(N=>!N.paused&&N.failed!==!0);return l`<section
      class="worker-now${y?" worker-pane--live":""}"
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
      ${p.running.length>0?So(p.running,Date.now(),G):""}
      ${p.pr_wait.map(N=>yo(N))}
    </section>`}function nt(p){let y=p.candidate_hidden;return l`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${U.show_blocked}
        />
        🔒 blocked${y.blocked>0?` ${y.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${If.map(N=>l`<button
              type="button"
              class="worker-filter__chip${U.spec===N.value?" is-active":""}"
              data-spec=${N.value}
              aria-pressed=${U.spec===N.value?"true":"false"}
            >
              ${N.label}
            </button>`)}
        ${y.spec>0?l`<span class="worker-filter__hidden">숨김 ${y.spec}</span>`:""}
      </div>
    </div>`}function st(){return l`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${x}
    >
      ${Lf.map(p=>l`<option value=${p.value} ?selected=${x===p.value}>
            ${p.label}
          </option>`)}
    </select>`}function at(){return l`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${V}
      >
        ${Gt.map(p=>l`<option value=${p.value} ?selected=${V===p.value}>
              ${p.label}
            </option>`)}
      </select>
    </div>`}function mt(){if(ve.size===0)return"";let p=Array.from(ve),y=p.some(N=>{let se=Ce.get(N);return se!==!0&&se!==!1});return l`<div
      class="worker-bulk"
      role="group"
      aria-label="실행 방식 일괄 변경"
    >
      <span class="worker-bulk__count">${p.length}개 선택</span>
      <select
        class="worker-bulk__mode"
        aria-label="실행 방식"
        .value=${ae}
        ?disabled=${be}
      >
        <option value="ordinary">일반 병렬</option>
        <option value="serial">🔒 머지까지 단독</option>
      </select>
      <button
        type="button"
        class="worker-bulk__apply"
        ?disabled=${y||be}
        title=${y?"\uC120\uD0DD\uD55C \uC791\uC5C5\uC758 \uC2E4\uD589 \uBC29\uC2DD\uC744 \uD655\uC778\uD558\uB294 \uC911\uC785\uB2C8\uB2E4":be?"\uC2E4\uD589 \uBC29\uC2DD \uBCC0\uACBD \uC911\uC785\uB2C8\uB2E4":"\uC120\uD0DD\uD55C \uC791\uC5C5\uC5D0 \uC801\uC6A9"}
      >
        적용
      </button>
      <span class="worker-bulk__hint">선택한 대기 작업에만 적용됩니다</span>
    </div>`}function B(p){let y=(p.queue.pr_wait||[]).filter(g=>g&&g.external!==!0&&typeof g.bead_id=="string"),N=new Set(p.running.filter(g=>!g.paused&&g.failed!==!0).map(g=>g.bead_id));for(let g of y)N.add(g.bead_id);let se=!(p.queue.pr_wait_holds_slot!==!0||p.queue.auto_advance!==!0||p.queue.auto_merge===!0||y.length===0||p.waiting.length===0||N.size<p.slots),j=p.pr_wait.some(g=>g.worker_serial===!0);if(!(!se&&!(j&&p.queue.auto_merge!==!0)))return l`${se?l`<div class="worker-stat worker-pr-wait-hint">
          PR 머지 대기 중 — 다음 이슈는 머지·정리 완료 후 시작됩니다 (자동 머지
          꺼짐)
        </div>`:""}${j&&p.queue.auto_merge!==!0?l`<div
          class="worker-stat worker-pr-wait-hint worker-pr-wait-hint--serial"
        >
          단독 실행 작업의 PR 머지·정리가 끝날 때까지 다음 작업이 시작되지
          않습니다 (자동 머지 꺼짐)
        </div>`:""}`}function Y(p){let y=p.queue.auto_merge===!0;if(p.merge_queue_running)return l`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop${y?" is-active":""}"
        title=${y?"\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB044\uACE0 \uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)":"\uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)"}
      >
        ${y?"\u23F8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8":"\uC77C\uAD04 \uBA38\uC9C0 \uC911\uB2E8"} ${p.merge_queue_length}
      </button>`;if(y)return l`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop is-active"
        title="자동 머지 켜짐 — 자격이 생기는 PR을 계속 큐에 넣습니다. 클릭하면 끕니다"
      >
        ⏸ 자동 머지
      </button>`;let N=new Set(p.auto_excluded),se=p.pr_wait.filter(j=>j.merge_action&&j.merge_enabled&&!N.has(j.id)).length;return l`<button
      type="button"
      class="worker-merge-all"
      title=${p.verify_cmd_present?"\uCF1C \uB450\uBA74 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uCDA9\uB3CC \uD574\uC18C\xB7\uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uCF1C \uB450\uBA74 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uCDA9\uB3CC \uD574\uC18C\xB7\uBA38\uC9C0\uD569\uB2C8\uB2E4 \u2014 \uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uB294 verify \uC120\uC5B8\uC774 \uC5C6\uC5B4 \uCD94\uAC00 \uAC80\uC99D \uC5C6\uC774 \uBA38\uC9C0\uB429\uB2C8\uB2E4"}
    >
      ▶ 자동 머지${se>0?` ${se}`:""}
    </button>`}function oe(p){let y=Kt({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:p.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:st(),controls:nt(p)});return S?l`<div class="worker-lanes worker-lanes--mobile">
        ${rt(p)}
        ${Kt({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:p.waiting,empty:"\uB4DC\uB798\uADF8 \uB610\uB294 [\uB300\uAE30\uB85C \u21B4]\uB85C \uBC30\uCE58",controls:l`${mt()}${B(p)}`,collapsible:!0,collapsed:D.queue,preview:Ql(p.waiting)})}
        ${y}
        ${Kt({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:p.done,empty:`${O()} \uC644\uB8CC \uC5C6\uC74C`,controls:at(),collapsible:!0,collapsed:D.done,preview:Array.isArray(p.token_total)?p.token_total.map(N=>N.label).join(" \xB7 "):p.token_total||Ql(p.done)})}
      </div>`:l`<div class="worker-lanes">
      ${y}
      ${Kt({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:p.waiting,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58",controls:l`${mt()}${B(p)}`})}
      ${Kt({id:"worker-pane-running",lane:"running",title:`\uC2E4\uD589 \uC911 \xB7 \uC2AC\uB86F ${p.slots}`,items:p.running,live:p.running.some(N=>!N.paused&&N.failed!==!0),body:So(p.running,Date.now(),G)})}
      ${Kt({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:p.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C"})}
      ${Kt({id:"worker-pane-done",lane:"done",title:`\uC644\uB8CC \xB7 ${O()} ${p.done.length}`,items:p.done,empty:`${O()} \uC644\uB8CC \uC5C6\uC74C`,controls:at()})}
    </div>`}function de(p){D={...D,[p]:!D[p]},qf(D),te()}function te(){let p=ut();Ue(_t(p),ze),Ue(oe(p),he)}function Te(){let p=document.querySelector(".app-header");if(!p)return;let y=()=>{let N=Math.round(p.getBoundingClientRect().height);Xe.style.setProperty("--worker-ribbon-top",`${N}px`)};if(y(),typeof ResizeObserver=="function"){let N=new ResizeObserver(y);N.observe(p),Ge.push(()=>N.disconnect())}else window.addEventListener("resize",y),Ge.push(()=>window.removeEventListener("resize",y))}function Ke(){if(typeof window.matchMedia!="function")return;let p=window.matchMedia(Pf);S=!!p.matches;let y=N=>{let se=!!(N&&typeof N.matches=="boolean"?N.matches:p.matches);se!==S&&(S=se,te())};typeof p.addEventListener=="function"?(p.addEventListener("change",y),Ge.push(()=>p.removeEventListener("change",y))):typeof p.addListener=="function"&&(p.addListener(y),Ge.push(()=>p.removeListener(y)))}let Qe=null;function $e(p){Qe=p.target instanceof Element?p.target:null}function Ye(p){let N=p.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!N)return;if(Qe&&N.contains(Qe)&&Qe.closest("input, button, a")){p.preventDefault();return}let se=N.dataset.beadId||"",j=N.dataset.lane||"";$={bead_id:se,from_lane:j};try{p.dataTransfer?.setData("text/plain",se),p.dataTransfer&&(p.dataTransfer.effectAllowed="move")}catch{}}function we(p){let y=p.target?.closest?.(".worker-pane");if(!y)return;let N=y.dataset.lane||"";N!=="candidate"&&N!=="queue"||(p.preventDefault(),p.dataTransfer&&(p.dataTransfer.dropEffect="move"),y.classList.add("worker-pane--drag-over"))}function dt(p){p.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function bt(p,y){let N=E.find(A=>A.id===p);if(!N)return;let se=E.filter(A=>A.id!==p),j=se.length;if(y){let A=y.dataset.beadId;if(A===p)return;let Z=se.findIndex(ue=>ue.id===A);Z>=0&&(j=Z)}let g=se.slice();g.splice(j,0,N),T.applyReorder(p,g,j)}function Zt(p){let y=p.target?.closest?.(".worker-pane");if(!y)return;p.preventDefault(),y.classList.remove("worker-pane--drag-over");let N=y.dataset.lane||"",se=$?.bead_id||p.dataTransfer?.getData("text/plain")||"",j=$?.from_lane||"";if($=null,!se)return;let g=p.target?.closest?.(".worker-mini, .worker-card"),A=Array.from(y.querySelectorAll(".worker-mini, .worker-card")),Z=A.length;if(g){let ue=A.indexOf(g);ue>=0&&(Z=ue)}if(y.classList.contains("worker-pane--collapsed")&&(Z=ie()),N==="candidate"){if(j==="candidate"){bt(se,g);return}j==="queue"&&je(se);return}N==="queue"&&(j==="queue"?Ae(se,Z):De(se,Z))}function zt(p){U=p,Cf(p),te()}function Xt(p){x=p==="board"||p==="created"||p==="spec"?p:gs,Df(x),te()}function gt(p){V=Rt(p)?p:At,Nf(V),_?.(V),te()}function xt(p){let y=p.target?.closest?.(".worker-mini__select");if(y){let Pe=y.dataset.beadId||"";Pe&&(y.checked?ve.add(Pe):ve.delete(Pe),te());return}let N=p.target?.closest?.(".worker-bulk__mode");if(N){ae=N.value==="serial"?"serial":"ordinary";return}let se=p.target?.closest?.(".worker-filter__blocked");if(se){zt({...U,show_blocked:se.checked});return}let j=p.target?.closest?.(".worker-done-range");if(j){gt(j.value);return}let g=p.target?.closest?.(".worker-sort");if(g){Xt(g.value||gs);return}let A=p.target?.closest?.(".worker-pr-wait-hold");if(A){Fe(A.checked);return}let Z=p.target?.closest?.(".worker-slots__input");if(!Z)return;let ue=Number.parseInt(Z.value,10);if(!Number.isFinite(ue)){te();return}et(ue).then(te)}function Ot(p){return p?{runner:p.runner||void 0,model:p.model||void 0,effort:p.effort||void 0,worktree:p.worktree||void 0,status:p.status||void 0,session_id:p.session_id||void 0}:{}}function Dt(){let p=ut();return{operations:p.repo_operations,cleanup_failures:p.cleanup_failures,repo:u&&u()||""}}function Mt(){G&&K.close(),ge.hidden=!1,Se.hidden=!1,Re.open(Dt()),te()}function Ht(p){let y=fe(),N=y.attempts?y.attempts[p]:null;G=p,Re.close(),ge.hidden=!0,Se.hidden=!1,K.open({attempt_id:p,meta:Ot(N)}),te()}function Ee(){if(Re.isOpen()&&Re.refresh(Dt()),!G)return;let p=fe(),y=p.attempts?p.attempts[G]:null;if(y){K.updateMeta(Ot(y));return}K.close()}function vt(p){let y=p.target,N=y?.closest?.(".worker-bulk__apply");if(N){N.disabled||Me();return}if(y?.closest?.(".worker-mini__select, .worker-mini__serial, .worker-mini__grip")||y?.closest?.("#worker-exec-defaults-dialog"))return;if(y?.closest?.(".worker-exec-defaults-btn")){me.open();return}if(y?.closest?.(".worker-repo-strip")||y?.closest?.(".worker-mini__timeline")){Mt();return}let se=y?.closest?.(".worker-repo-op__session");if(se){let ke=se.dataset.attemptId;ke&&Ht(ke);return}let j=y?.closest?.(".worker-repo-op__resolve");if(j){Oe(j.dataset.operationId||"");return}let g=y?.closest?.(".worker-repo-op__dismiss");if(g){Ne(g.dataset.operationId||"");return}let A=y?.closest?.(".worker-cleanup__resume");if(A){let ke=A.dataset.beadId;ke&&q(ke);return}let Z=y?.closest?.(".worker-banner__resume");if(Z){let ke=Z.dataset.attemptId;ke&&Ie(ke);return}let ue=y?.closest?.(".worker-banner__discard");if(ue){let ke=ue.dataset.confirmation==="merged"?"merged":"unmerged";W(ue.dataset.beadId||"",ue.dataset.attemptId||null,ke,ue.dataset.operationId||null);return}let Pe=y?.closest?.(".worker-banner__dismiss");if(Pe){let ke=Pe.dataset.attemptId;ke&&Je(ke);return}if(y?.closest?.(".worker-play")){ne(!fe().auto_advance);return}let He=y?.closest?.(".worker-merge-all");if(He){He.classList.contains("worker-merge-all--stop")?fe().auto_merge===!0?ce(!1):C():ce(!0);return}let m=y?.closest?.(".worker-pane__hd--toggle");if(m){let ke=m.dataset.lane;(ke==="queue"||ke==="done")&&de(ke);return}let d=y?.closest?.(".worker-card__place");if(d){let ke=d.dataset.beadId;ke&&!d.disabled&&De(ke,ie());return}let k=y?.closest?.(".worker-filter__chip");if(k){let ke=k.dataset.spec;(ke==="all"||ke==="with"||ke==="without")&&zt({...U,spec:ke});return}let v=y?.closest?.(".worker-mini__merge");if(v){let ke=v.dataset.beadId||"";fe().cleanup_failed?.[ke]?q(ke):H(ke);return}let F=y?.closest?.(".worker-mini__merge-cancel");if(F){w(F.dataset.beadId||"");return}let J=y?.closest?.(".worker-mini__discard");if(J){W(J.dataset.beadId||"",J.dataset.attemptId||null,J.dataset.discardMode==="merged"?"merged":"unmerged",J.dataset.operationId||null);return}let ye=y?.closest?.(".worker-mini__revise-fix");if(ye){le("worker-revise-fix",ye.dataset.beadId||"");return}let it=y?.closest?.(".worker-mini__revise-approve");if(it){le("worker-revise-approve",it.dataset.beadId||"");return}if(y?.closest?.(".worker-mini__pr"))return;if(y?.closest?.(".rtile__discard")){let ke=y?.closest?.(".rtile"),lt=ke?.dataset?.beadId,Or=ke?.dataset?.attemptId;lt&&W(lt,Or||null,"unmerged",y?.closest?.(".rtile__discard")?.dataset.operationId||null);return}if(y?.closest?.(".rtile__dismiss")){let lt=y?.closest?.(".rtile")?.dataset?.attemptId;lt&&Je(lt);return}if(y?.closest?.(".rtile__pause")){let lt=y?.closest?.(".rtile")?.dataset?.attemptId;lt&&Le(lt);return}if(y?.closest?.(".rtile__resume")){let lt=y?.closest?.(".rtile")?.dataset?.attemptId;lt&&Ie(lt);return}if(y?.closest?.(".rtile__session")){let lt=y?.closest?.(".rtile")?.dataset?.attemptId;lt&&Ht(lt);return}if(y?.closest?.(".worker-drawer-overlay__backdrop")){Re.close(),K.close();return}if(y?.closest?.(".worker-drawer-host"))return;let qe=y?.closest?.(".rtile");if(qe){if(y?.closest?.(".rtile__id")){let lt=qe.dataset.beadId;lt&&Tr(lt).then(Or=>{Or?Q("\uBCF5\uC0AC\uB428","success",1200):Q("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let ke=qe.dataset.beadId;ke&&c&&c(ke);return}let Nt=y?.closest?.(".worker-mini, .worker-card");if(Nt){let ke=Nt.dataset.beadId;if(y?.closest?.(".worker-mini__id, .worker-card__id")){ke&&Tr(ke).then(lt=>{lt?Q("\uBCF5\uC0AC\uB428","success",1200):Q("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}ke&&c&&c(ke)}}return e.addEventListener("pointerdown",$e),e.addEventListener("dragstart",Ye),e.addEventListener("dragover",we),e.addEventListener("dragleave",dt),e.addEventListener("drop",Zt),e.addEventListener("click",vt),e.addEventListener("change",xt),Ke(),Te(),b&&Ge.push(b.subscribe(()=>{for(let[p,y]of ee)y==="failed"&&ee.delete(p);te()})),s&&Ge.push(s.subscribe(()=>{te(),Ee()})),te(),{load(){te()},openExecDefaults(){me.open()},destroy(){for(let p of Ge.splice(0))try{p()}catch{}e.removeEventListener("pointerdown",$e),e.removeEventListener("dragstart",Ye),e.removeEventListener("dragover",we),e.removeEventListener("dragleave",dt),e.removeEventListener("drop",Zt),e.removeEventListener("click",vt),e.removeEventListener("change",xt);try{K.destroy()}catch{}Se.hidden=!0;try{me.destroy()}catch{}Ue(l``,e)}}}function No(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function sc(e,t,r,n=async()=>{},s=async()=>{}){let o=ot("views:workspace-picker"),a=null,i=!1,c=!1,u=!1;async function f(S){let L=S.target.value,ve=t.getState().workspace?.current?.path||"";if(L&&L!==ve){o("switching workspace to %s",L),i=!0,D();try{await r(L)}catch(ae){o("workspace switch failed: %o",ae)}finally{i=!1,D()}}}async function _(){let S=t.getState(),z=S.workspace?.current?.path||S.workspace?.available?.[0]?.path||"";if(!(!z||c)){o("git-pulling workspace %s",z),c=!0,D();try{await n(z)}catch(L){o("workspace git pull failed: %o",L)}finally{c=!1,D()}}}function b(S){let z=S.target;z&&e.contains(z)||E()}function T(S){S.key==="Escape"&&E()}function $(){u||(u=!0,document.addEventListener("mousedown",b),document.addEventListener("keydown",T),D())}function E(){u&&(u=!1,document.removeEventListener("mousedown",b),document.removeEventListener("keydown",T),D())}function U(){u?E():$()}async function x(S){let z=S.target,L=z.value,pe=z.checked;o("toggling visibility %s \u2192 %s",L,String(pe));try{await s(L,pe)}catch(ve){o("workspace visibility toggle failed: %o",ve)}}function V(S){return S?l`
      <button
        type="button"
        class="workspace-picker__git-pull-button"
        @click=${_}
        ?disabled=${i||c}
        aria-label="Git Pull"
        title="Git Pull"
      >
        <span aria-hidden="true">⬇</span>
      </button>
    `:l``}function ee(S,z){return l`
      <div class="workspace-picker__manage">
        <button
          type="button"
          class="workspace-picker__manage-button"
          @click=${U}
          aria-haspopup="true"
          aria-expanded=${u?"true":"false"}
          aria-label="프로젝트 관리"
        >
          프로젝트 관리
        </button>
        ${u?l`
              <div
                class="workspace-picker__manage-popover"
                role="menu"
                aria-label="프로젝트 표시 선택"
              >
                ${S.map(L=>l`
                    <label
                      class="workspace-picker__manage-row"
                      title="${L.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${L.path}"
                        .checked=${!z.has(L.path)}
                        @change=${x}
                      />
                      <span class="workspace-picker__manage-name"
                        >${No(L.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function O(){let S=t.getState(),z=S.workspace?.current,L=S.workspace?.available||[],pe=new Set(S.workspace?.hidden||[]),ve=z?.path||L[0]?.path||"";if(L.length===0)return l``;let ae=L.filter(be=>!pe.has(be.path)||be.path===ve);if(ae.length<=1){let be=ae[0]||L[0],Ce=No(be.path);return l`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${be.path}"
            >${Ce}</span
          >
          ${ee(L,pe)}
          ${V(ve)}
          ${c?l`<span
                class="workspace-picker__loading"
                aria-hidden="true"
              ></span>`:""}
        </div>
      `}return l`
      <div class="workspace-picker">
        <select
          class="workspace-picker__select"
          @change=${f}
          ?disabled=${i||c}
          aria-label="Select project workspace"
        >
          ${ae.map(be=>l`
              <option
                value="${be.path}"
                ?selected=${be.path===ve}
                title="${be.path}"
              >
                ${No(be.path)}
              </option>
            `)}
        </select>
        ${ee(L,pe)}
        ${V(ve)}
        ${i||c?l`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function D(){Ue(O(),e)}return D(),a=t.subscribe(()=>D()),{destroy(){a&&(a(),a=null),document.removeEventListener("mousedown",b),document.removeEventListener("keydown",T),Ue(l``,e)}}}var oc=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-automation-toggle","worker-auto-repair-toggle","worker-repo-operation-repair","worker-repo-operation-dismiss","worker-queue-set-slots","worker-queue-set-pr-wait-hold","worker-queue-set-default-exec-preset","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-cleanup-retry","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-worker-system-prompt","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-exec-presets","unsubscribe-exec-presets","exec-presets-snapshot","exec-preset-create","exec-preset-update","exec-preset-delete","apply-exec-preset","monitor-auto-toggle"];function Po(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function ac(e,t,r=Po()){return{id:r,type:e,payload:t}}function ic(e={}){let t=ot("ws"),r={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},n=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",a=0,i=null,c=!0,u=new Map,f=[],_=new Map,b=new Set;function T(O){for(let D of Array.from(b))try{D(O)}catch{}}function $(){if(!c||i)return;o="reconnecting",t("ws reconnecting\u2026"),T(o);let O=Math.min(r.maxMs||0,(r.initialMs||0)*Math.pow(r.factor||1,a)),D=(r.jitterRatio||0)*O,S=Math.max(0,Math.round(O+(Math.random()*2-1)*D));t("ws retry in %d ms (attempt %d)",S,a+1),i=setTimeout(()=>{i=null,ee()},S)}function E(O){try{s?.send(JSON.stringify(O))}catch(D){t("ws send failed",D)}}function U(){for(o="open",t("ws open"),T(o),a=0;f.length;){let O=f.shift();O&&E(O)}}function x(O){let D;try{D=JSON.parse(String(O.data))}catch{t("ws received non-JSON message");return}if(!D||typeof D.id!="string"||typeof D.type!="string"){t("ws received invalid envelope");return}if(u.has(D.id)){let z=u.get(D.id);u.delete(D.id),D.ok?z?.resolve(D.payload):z?.reject(D.error||new Error("ws error"));return}let S=_.get(D.type);if(S&&S.size>0)for(let z of Array.from(S))try{z(D.payload)}catch(L){t("ws event handler error",L)}else t("ws received unhandled message type: %s",D.type)}function V(){o="closed",t("ws closed"),T(o);for(let[O,D]of u.entries())D.reject(new Error("ws disconnected")),u.delete(O);a+=1,$()}function ee(){if(!c)return;let O=n();try{s=new WebSocket(O),t("ws connecting %s",O),o="connecting",T(o),s.addEventListener("open",U),s.addEventListener("message",x),s.addEventListener("error",()=>{}),s.addEventListener("close",V)}catch(D){t("ws connect failed %o",D),$()}}return ee(),{send(O,D){if(!oc.includes(O))return Promise.reject(new Error(`unknown message type: ${O}`));let S=Po(),z=ac(O,D,S);return t("send %s id=%s",O,S),new Promise((L,pe)=>{u.set(S,{resolve:L,reject:pe,type:O}),s&&s.readyState===s.OPEN?E(z):(t("queue %s id=%s (state=%s)",O,S,o),f.push(z))})},on(O,D){_.has(O)||_.set(O,new Set);let S=_.get(O);return S?.add(D),()=>{S?.delete(D)}},onConnection(O){return b.add(O),()=>{b.delete(O)}},reconnect(){c=!0,i&&(clearTimeout(i),i=null),a=0,ee()},close(){c=!1,i&&(clearTimeout(i),i=null);try{s?.close()}catch{}},getState(){return o}}}function Zf(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function Xf(e,t){try{let n=await(await fetch("/api/config")).json();e.setState({config:n})}catch(r){t("config refresh failed",r)}}var Fo=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],lc=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"],["tab:worker:closed","closed-issues"]],br="tab:worker:closed",Qf="bdui.worker.done-range",cc=Dl,dc="worker:queue",uc="ui:order",pc="ui:display-policy",fc="exec:presets",vr="tab:board:closed",_c="beads-ui.board.closed-range";function Jf(e){let t=ot("main");t("bootstrap start");let r=l`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;Ue(r,e);let n=document.getElementById("top-nav"),s=document.getElementById("usage-meter"),o=document.getElementById("board-root"),a=document.getElementById("worker-root"),i=document.getElementById("monitor-root"),c=document.getElementById("detail-panel");if(s&&zl(s),o&&a&&i&&c){let xe=function(m,d){let k="Request failed",v="";if(m&&typeof m=="object"){let J=m;if(typeof J.message=="string"&&J.message.length>0&&(k=J.message),typeof J.details=="string")v=J.details;else if(J.details&&typeof J.details=="object")try{v=JSON.stringify(J.details,null,2)}catch{v=""}}else typeof m=="string"&&m.length>0&&(k=m);let F=d&&d.length>0?`Failed to load ${d}`:"Request failed";Se.open(F,k,v)},M=function(m){return`${Ee.getState().workspace.current?.path||""}\0${m}`},H=function(){ie&&(ie().catch(()=>{}),ie=null),De=null,Ae=null},X=function(m){je=m;let d=()=>{je!==m||Ee.getState().selected_id!==m||(je=null,q(m))};if(!Ie){Le.then(d);return}d()},W=function(m,d,k,v,F){return k!==C[d]?(F().catch(()=>{}),!1):(m.set(v,F),!0)},le=function(){let m=Ee.getState();Fe(m.view==="board"),at(m.view==="worker"),de(m.view==="monitor"),B(m.view==="board"||m.view==="worker"||!!m.selected_id)},Ne=function(){let m=xr(ne);return m===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:m}}},et=function(){let m=xr(Oe);return m===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:m}}},Fe=function(m){if(m)for(let[d,k]of Fo){if(ce.has(d)||w.has(d))continue;let v=d===vr?Ne():{type:k};try{G.register(d,v)}catch(ye){t("register %s store failed: %o",d,ye)}w.add(d);let F=C.board,J=!1;he.subscribeList(d,v).then(ye=>{J=!W(ce,"board",F,d,ye)}).catch(ye=>{t("subscribe %s failed: %o",d,ye),xe(ye,"board")}).finally(()=>{w.delete(d),J&&le()})}else rt()},rt=function(){C.board+=1;for(let[m]of Fo){let d=ce.get(m);d&&(d().catch(()=>{}),ce.delete(m));try{G.unregister(m)}catch(k){t("unregister %s failed: %o",m,k)}}},at=function(m){if(!m){mt();return}for(let[d,k]of lc){if(nt.has(d)||w.has(d))continue;let v=d===br?et():{type:k};try{G.register(d,v)}catch(ye){t("register %s store failed: %o",d,ye)}w.add(d);let F=C.worker,J=!1;he.subscribeList(d,v).then(ye=>{J=!W(nt,"worker",F,d,ye)}).catch(ye=>{t("subscribe %s failed: %o",d,ye),xe(ye,"worker")}).finally(()=>{w.delete(d),J&&le()})}},mt=function(){C.worker+=1;for(let[m]of lc){let d=nt.get(m);d&&(d().catch(()=>{}),nt.delete(m));try{G.unregister(m)}catch(k){t("unregister %s failed: %o",m,k)}}},B=function(m){if(!m){Y();return}st||(ge("subscribe-worker-queue",{id:dc}).catch(d=>{t("subscribe-worker-queue failed: %o",d)}),st=()=>ge("unsubscribe-worker-queue",{id:dc}))},Y=function(){st&&(st().catch(()=>{}),st=null)},de=function(m){if(!m){te();return}oe||(ge("subscribe-monitor-pipeline",{id:cc}).catch(d=>{t("subscribe-monitor-pipeline failed: %o",d)}),oe=()=>ge("unsubscribe-monitor-pipeline",{id:cc}))},te=function(){oe&&(oe().catch(()=>{}),oe=null)},Ke=function(){Te||(ge("subscribe-ui-order",{id:uc}).catch(m=>{t("subscribe-ui-order failed: %o",m)}),Te=()=>ge("unsubscribe-ui-order",{id:uc}))},Qe=function(){Te&&(Te().catch(()=>{}),Te=null),me.clear()},Ye=function(){$e||(ge("subscribe-display-policy",{id:pc}).catch(m=>{t("subscribe-display-policy failed: %o",m)}),$e=()=>ge("unsubscribe-display-policy",{id:pc}))},we=function(){$e&&($e().catch(()=>{}),$e=null),fe.clear()},bt=function(){dt||(ge("subscribe-exec-presets",{id:fc}).catch(m=>{t("subscribe-exec-presets failed: %o",m)}),dt=()=>ge("unsubscribe-exec-presets",{id:fc}))},Ot=function(m){if(!m)return"Unknown";let d=m.split("/").filter(Boolean);return d.length>0?d[d.length-1]:"Unknown"};var u=xe,f=M,_=H,b=X,T=W,$=le,E=Ne,U=et,x=Fe,V=rt,ee=at,O=mt,D=B,S=Y,z=de,L=te,pe=Ke,ve=Qe,ae=Ye,be=we,Ce=bt,Ge=Ot;let Xe=document.getElementById("header-loading"),ze=Ua(Xe),Se=ll(e),_e=ic(),ge=ze.wrapSend((m,d)=>_e.send(m,d)),he=Da(ge),G=Ma(),K=Pa(),Re=va(),me=Na(),fe=ha(),I=ba(),R=ya();_e.on("exec-presets-snapshot",m=>{let d=m;d&&typeof d.revision=="number"&&Array.isArray(d.presets)&&I.set({revision:d.revision,presets:d.presets})}),_e.on("monitor-pipeline-snapshot",m=>{let d=m;if(!(!d||!Array.isArray(d.workspaces)))try{Re.set(d.workspaces,d.workspaces_state)}catch{}}),_e.on("ui-order-snapshot",m=>{let d=m;if(d&&typeof d.revision=="number")try{me.set({revision:d.revision,order:d.order&&typeof d.order=="object"?d.order:{}})}catch{}}),_e.on("display-policy-snapshot",m=>{let d=m;if(d&&d.policy&&typeof d.policy=="object")try{fe.set(d.policy)}catch{}}),_e.on("session-log-snapshot",m=>{let d=m;if(d&&typeof d.attempt_id=="string")try{R.set(d.attempt_id,Array.isArray(d.lines)?d.lines:[],typeof d.last_event_at=="number"?d.last_event_at:null)}catch{}}),_e.on("session-log-append",m=>{let d=m;if(d&&typeof d.attempt_id=="string")try{R.append(d.attempt_id,d.event)}catch{}}),_e.on("snapshot",m=>{let d=m,k=d&&typeof d.id=="string"?d.id:"",v=k?G.getStore(k):null;if(v&&d&&d.type==="snapshot")try{v.applyPush(d)}catch{}}),_e.on("upsert",m=>{let d=m,k=d&&typeof d.id=="string"?d.id:"",v=k?G.getStore(k):null;if(v&&d&&d.type==="upsert")try{v.applyPush(d)}catch{}}),_e.on("delete",m=>{let d=m,k=d&&typeof d.id=="string"?d.id:"",v=k?G.getStore(k):null;if(v&&d&&d.type==="delete")try{v.applyPush(d)}catch{}});let ie=null,De=null,Ae=null,je=null,Me=()=>{},Le=new Promise(m=>{Me=()=>m(void 0)}),Ie=!1,Je=!1;async function q(m){let d=M(m);if(d===De||d===Ae)return;Ae=d;let k=`detail:${m}`,v={type:"issue-detail",params:{id:m}};try{G.register(k,v)}catch(F){t("register detail store failed: %o",F)}try{let F=await he.subscribeList(k,v);if(Ee.getState().selected_id!==m||M(m)!==d){await F().catch(()=>{});return}ie&&await ie().catch(()=>{}),ie=F,De=d}catch(F){t("detail subscribe failed: %o",F),xe(F,"issue details")}finally{Ae===d&&(Ae=null)}}let ce=new Map,w=new Set,C={board:0,worker:0},ne=At;try{let m=window.localStorage.getItem(_c);Rt(m)&&(ne=m)}catch{}let Oe=At;try{let m=window.localStorage.getItem(Qf);Rt(m)&&(Oe=m)}catch{}async function ut(m){if(!Rt(m)||m===ne)return;ne=m;try{window.localStorage.setItem(_c,m)}catch{}let d=ce.get(vr);if(!d)return;ce.delete(vr),await d().catch(()=>{});let k=Ne();try{G.register(vr,k)}catch(v){t("register %s store failed: %o",vr,v)}try{let v=await he.subscribeList(vr,k);ce.set(vr,v)}catch(v){t("re-subscribe %s failed: %o",vr,v),xe(v,"board")}}async function _t(m){if(!Rt(m)||m===Oe)return;Oe=m;let d=nt.get(br);if(!d)return;nt.delete(br),await d().catch(()=>{});let k=et();try{G.register(br,k)}catch(v){t("register %s store failed: %o",br,v)}try{let v=await he.subscribeList(br,k);nt.set(br,v)}catch(v){t("re-subscribe %s failed: %o",br,v),xe(v,"worker")}}let nt=new Map,st=null,oe=null,Te=null,$e=null,dt=null;async function Zt(){$e=null,fe.clear(),dt=null,I.clear(),st=null,oe=null,ce.clear(),nt.clear(),C.board+=1,C.worker+=1,bt();let m=Ee.getState().workspace.current?.path;if(m)try{await _e.send("set-workspace",{path:m})}catch(k){t("workspace restore after reconnect failed: %o",k);return}Ye();let d=Ee.getState();Fe(d.view==="board"),at(d.view==="worker"),de(d.view==="monitor"),B(d.view==="board"||d.view==="worker"||!!d.selected_id)}async function zt(){t("clearing all subscriptions for workspace switch"),rt(),mt(),Y(),K.clear(),Qe(),Ke(),we(),Ye(),H();let m=Ee.getState();if(m.selected_id)try{G.unregister(`detail:${m.selected_id}`)}catch{}let d=Ee.getState();Fe(d.view==="board"),at(d.view==="worker"),de(d.view==="monitor"),B(d.view==="board"||d.view==="worker"||!!d.selected_id),d.selected_id&&X(d.selected_id)}async function Xt(m){t("requesting workspace switch to %s",m),Je=!0;try{let d=await _e.send("set-workspace",{path:m});t("workspace switch result: %o",d),d&&d.workspace&&(Ee.setState({workspace:{current:{path:d.workspace.root_dir,database:d.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",m),d.changed&&(await zt(),Q("Switched to "+Ot(m),"success",2e3)))}catch(d){throw t("workspace switch failed: %o",d),Q("Failed to switch workspace","error",3e3),d}finally{Je=!1}}async function gt(m){t("requesting workspace git pull for %s",m);try{let d=await _e.send("git-pull-workspace",{});t("workspace git pull result: %o",d);let k=d?.status;if(k==="up_to_date"){Q("Already up to date","success",2e3);return}if(k==="stash_pop_conflict"){Q("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}Q("Git pulled "+Ot(m),"success",2e3)}catch(d){t("workspace git pull failed: %o",d);let k=d?.code,v=d?.message;if(k==="rebase_conflict"){Q("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(k==="rebase_conflict_abort_failed"){Q("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(k==="busy"){Q("Git pull skipped: another operation is running","warning",3e3);return}let F=v?`: ${v}`:"";throw Q(`Git pull failed${F}`,"error",3e3),d}}async function xt(m,d){t("setting workspace visibility %s \u2192 %s",m,String(d));try{await _e.send("set-workspace-visibility",{path:m,visible:d}),await Dt()}catch(k){t("workspace visibility update failed: %o",k),Q("Failed to update project visibility","error",3e3)}}async function Dt(){try{let m=await _e.send("list-workspaces",{});if(t("workspaces loaded: %o",m),m&&Array.isArray(m.workspaces)){let d=m.workspaces.map(J=>({path:J.path,database:J.database,pid:J.pid,version:J.version})),k=m.current?{path:m.current.root_dir,database:m.current.db_path}:null,v=Array.isArray(m.hidden)?m.hidden.filter(J=>typeof J=="string"):[];Ee.setState({workspace:{current:k,available:d,hidden:v}});let F=window.localStorage.getItem("beads-ui.workspace");F&&(!d.some(ye=>ye.path===F)||v.includes(F)?window.localStorage.removeItem("beads-ui.workspace"):k&&F!==k.path&&(t("restoring saved workspace preference: %s",F),await Xt(F)))}}catch(m){t("failed to load workspaces: %o",m)}}_e.on("workspace-changed",m=>{t("workspace-changed event: %o",m),m&&m.root_dir&&(Ee.setState({workspace:{current:{path:m.root_dir,database:m.db_path}}}),Dt(),zt())});let Mt=!1;if(typeof _e.onConnection=="function"){let m=d=>{t("ws state %s",d),d==="reconnecting"||d==="closed"?(Mt=!0,Q("Connection lost. Reconnecting\u2026","error",4e3)):d==="open"&&Mt&&(Mt=!1,Q("Reconnected","success",2200),Xf(Ee,(k,v)=>{t(`${k}: %o`,v)}),Zt())};_e.onConnection(m)}let Ht="board";try{let m=window.localStorage.getItem("beads-ui.view");(m==="board"||m==="worker"||m==="monitor")&&(Ht=m)}catch(m){t("view parse error: %o",m)}let Ee=Ba({config:Zf(),view:Ht});_e.on("worker-queue-snapshot",m=>{let d=m;if(!d||!d.queue)return;let k=Ee.getState().workspace.current?.path;if(typeof k=="string"&&k.length>0&&d.root_dir!==k){t("dropping worker-queue snapshot for %s",String(d.root_dir));return}try{K.set(d.queue)}catch{}});let vt=Fa(Ee);vt.start();let p=new Set(["get-comments","exec-preset-create","exec-preset-update","exec-preset-delete","apply-exec-preset"]),y=async(m,d)=>{try{return await ge(m,d)}catch(k){if(p.has(m))throw k;return[]}};n&&Nl(n,Ee,vt);let N=document.getElementById("workspace-picker");N&&sc(N,Ee,Xt,gt,xt);let se=Bl(e,(m,d)=>ge(m,d));try{let m=document.getElementById("new-issue-btn");m&&m.addEventListener("click",()=>se.open())}catch{}let j=il(e,{policyStore:fe,transport:(m,d)=>ge(m,d),labelOptions:()=>{let m=new Set;for(let[d]of Fo)for(let k of G.snapshotFor(d)||[]){let v=k.labels;if(Array.isArray(v))for(let F of v)typeof F=="string"&&F.length>0&&m.add(F)}return Array.from(m).sort()}});try{let m=document.getElementById("display-settings-btn");m&&m.addEventListener("click",()=>j.open())}catch{}let g=Za(o,{gotoIssue:m=>vt.gotoIssue(m),issueStores:G,transport:y,workerQueueStore:K,uiOrderStore:me,displayPolicyStore:fe,closedRange:ne,onClosedRangeChange:m=>{ut(m)},onNewIssue:()=>se.open()}),A=Mo(a,{transport:y,issueStores:G,queueStore:K,execPresetStore:I,sessionLogStore:R,uiOrderStore:me,gotoIssue:m=>Ee.setState({selected_id:m}),getWorkspacePath:()=>Ee.getState().workspace.current?.path,doneRange:Oe,onDoneRangeChange:m=>{_t(m)}}),Z=Ml(i,{transport:y,pipelineStore:Re,execPresetStore:I,gotoIssue:m=>vt.gotoIssue(m),getWorkspacePath:()=>Ee.getState().workspace.current?.path,switchWorkspace:m=>Xt(m)}),ue=ol(c,{issueStores:G,transport:y,queueStore:K,execPresetStore:I,sessionLogStore:R,getWorkspacePath:()=>Ee.getState().workspace.current?.path,onNavigate:m=>{Ee.getState().view==="worker"?Ee.setState({selected_id:m}):vt.gotoIssue(m)},onClose:()=>{let m=Ee.getState();Ee.setState({selected_id:null});try{vt.gotoView(m.view==="worker"||m.view==="monitor"?m.view:"board")}catch{}},onOpenExecPresets:()=>{Ee.setState({selected_id:null}),vt.gotoView("worker"),A.openExecDefaults()}}),Pe=Ee.getState().selected_id;Pe&&(c.hidden=!1,ue.load(Pe),X(Pe)),Ee.subscribe(m=>{let d=m.selected_id;d?(c.hidden=!1,ue.load(d),Je||X(d)):(ue.clear(),c.hidden=!0,H())});let He=m=>{o.hidden=m.view!=="board",a.hidden=m.view!=="worker",i.hidden=m.view!=="monitor",Fe(m.view==="board"),at(m.view==="worker"),de(m.view==="monitor"),B(m.view==="board"||m.view==="worker"||!!m.selected_id),!m.selected_id&&m.view==="board"&&g.load(),m.view==="worker"&&A.load(),m.view==="monitor"?Z.load():Z.pause(),window.localStorage.setItem("beads-ui.view",m.view)};Ee.subscribe(He),He(Ee.getState()),Ke(),Ye(),bt(),Dt().finally(()=>{Ie=!0,Me()}),window.addEventListener("keydown",m=>{let d=m.ctrlKey||m.metaKey,k=String(m.key||"").toLowerCase(),v=m.target,F=v&&v.tagName?String(v.tagName).toLowerCase():"",J=F==="input"||F==="textarea"||F==="select"||v&&typeof v.isContentEditable=="boolean"&&v.isContentEditable;d&&k==="n"&&(J||(m.preventDefault(),se.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let r=window.localStorage.getItem("beads-ui.theme"),n=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=r==="dark"||r==="light"?r:n?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let r=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",r),window.localStorage.setItem("beads-ui.theme",r)});let t=document.getElementById("app");t&&Jf(t)});export{Jf as bootstrap,Zf as readBootstrapConfig,Xf as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
