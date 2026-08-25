var mf=Object.create;var $a=Object.defineProperty;var gf=Object.getOwnPropertyDescriptor;var hf=Object.getOwnPropertyNames;var bf=Object.getPrototypeOf,yf=Object.prototype.hasOwnProperty;var vf=(e,t,n)=>t in e?$a(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var xa=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var wf=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of hf(t))!yf.call(e,s)&&s!==n&&$a(e,s,{get:()=>t[s],enumerable:!(r=gf(t,s))||r.enumerable});return e};var kf=(e,t,n)=>(n=e!=null?mf(bf(e)):{},wf(t||!e||!e.__esModule?$a(n,"default",{value:e,enumerable:!0}):n,e));var At=(e,t,n)=>vf(e,typeof t!="symbol"?t+"":t,n);var Vl=xa((yy,Gl)=>{var Ar=1e3,Sr=Ar*60,Er=Sr*60,lr=Er*24,Af=lr*7,Sf=lr*365.25;Gl.exports=function(e,t){t=t||{};var n=typeof e;if(n==="string"&&e.length>0)return Ef(e);if(n==="number"&&isFinite(e))return t.long?Cf(e):Tf(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function Ef(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var n=parseFloat(t[1]),r=(t[2]||"ms").toLowerCase();switch(r){case"years":case"year":case"yrs":case"yr":case"y":return n*Sf;case"weeks":case"week":case"w":return n*Af;case"days":case"day":case"d":return n*lr;case"hours":case"hour":case"hrs":case"hr":case"h":return n*Er;case"minutes":case"minute":case"mins":case"min":case"m":return n*Sr;case"seconds":case"second":case"secs":case"sec":case"s":return n*Ar;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return n;default:return}}}}function Tf(e){var t=Math.abs(e);return t>=lr?Math.round(e/lr)+"d":t>=Er?Math.round(e/Er)+"h":t>=Sr?Math.round(e/Sr)+"m":t>=Ar?Math.round(e/Ar)+"s":e+"ms"}function Cf(e){var t=Math.abs(e);return t>=lr?Qs(e,t,lr,"day"):t>=Er?Qs(e,t,Er,"hour"):t>=Sr?Qs(e,t,Sr,"minute"):t>=Ar?Qs(e,t,Ar,"second"):e+" ms"}function Qs(e,t,n,r){var s=t>=n*1.5;return Math.round(e/n)+" "+r+(s?"s":"")}});var Yl=xa((vy,Kl)=>{function Rf(e){n.debug=n,n.default=n,n.coerce=c,n.disable=a,n.enable=s,n.enabled=i,n.humanize=Vl(),n.destroy=u,Object.keys(e).forEach(d=>{n[d]=e[d]}),n.names=[],n.skips=[],n.formatters={};function t(d){let _=0;for(let h=0;h<d.length;h++)_=(_<<5)-_+d.charCodeAt(h),_|=0;return n.colors[Math.abs(_)%n.colors.length]}n.selectColor=t;function n(d){let _,h=null,w,$;function P(...z){if(!P.enabled)return;let Q=P,ae=Number(new Date),N=ae-(_||ae);Q.diff=N,Q.prev=_,Q.curr=ae,_=ae,z[0]=n.coerce(z[0]),typeof z[0]!="string"&&z.unshift("%O");let M=0;z[0]=z[0].replace(/%([a-zA-Z%])/g,(G,E)=>{if(G==="%%")return"%";M++;let W=n.formatters[E];if(typeof W=="function"){let B=z[M];G=W.call(Q,B),z.splice(M,1),M--}return G}),n.formatArgs.call(Q,z),(Q.log||n.log).apply(Q,z)}return P.namespace=d,P.useColors=n.useColors(),P.color=n.selectColor(d),P.extend=r,P.destroy=n.destroy,Object.defineProperty(P,"enabled",{enumerable:!0,configurable:!1,get:()=>h!==null?h:(w!==n.namespaces&&(w=n.namespaces,$=n.enabled(d)),$),set:z=>{h=z}}),typeof n.init=="function"&&n.init(P),P}function r(d,_){let h=n(this.namespace+(typeof _>"u"?":":_)+d);return h.log=this.log,h}function s(d){n.save(d),n.namespaces=d,n.names=[],n.skips=[];let _=(typeof d=="string"?d:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let h of _)h[0]==="-"?n.skips.push(h.slice(1)):n.names.push(h)}function o(d,_){let h=0,w=0,$=-1,P=0;for(;h<d.length;)if(w<_.length&&(_[w]===d[h]||_[w]==="*"))_[w]==="*"?($=w,P=h,w++):(h++,w++);else if($!==-1)w=$+1,P++,h=P;else return!1;for(;w<_.length&&_[w]==="*";)w++;return w===_.length}function a(){let d=[...n.names,...n.skips.map(_=>"-"+_)].join(",");return n.enable(""),d}function i(d){for(let _ of n.skips)if(o(d,_))return!1;for(let _ of n.names)if(o(d,_))return!0;return!1}function c(d){return d instanceof Error?d.stack||d.message:d}function u(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return n.enable(n.load()),n}Kl.exports=Rf});var Zl=xa((en,Xs)=>{en.formatArgs=Lf;en.save=If;en.load=Pf;en.useColors=Of;en.storage=Mf();en.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();en.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function Of(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function Lf(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+Xs.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let n=0,r=0;e[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(n++,s==="%c"&&(r=n))}),e.splice(r,0,t)}en.log=console.debug||console.log||(()=>{});function If(e){try{e?en.storage.setItem("debug",e):en.storage.removeItem("debug")}catch{}}function Pf(){let e;try{e=en.storage.getItem("debug")||en.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function Mf(){try{return localStorage}catch{}}Xs.exports=Yl()(en);var{formatters:Df}=Xs.exports;Df.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var Jr=globalThis,Hs=Jr.trustedTypes,Ol=Hs?Hs.createPolicy("lit-html",{createHTML:e=>e}):void 0,Sa="$lit$",Rn=`lit$${Math.random().toFixed(9).slice(2)}$`,Ea="?"+Rn,$f=`<${Ea}>`,sr=document,es=()=>sr.createComment(""),ts=e=>e===null||typeof e!="object"&&typeof e!="function",Ta=Array.isArray,Nl=e=>Ta(e)||typeof e?.[Symbol.iterator]=="function",Aa=`[ 	
\f\r]`,Xr=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ll=/-->/g,Il=/>/g,nr=RegExp(`>|${Aa}(?:([^\\s"'>=/]+)(${Aa}*=${Aa}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Pl=/'/g,Ml=/"/g,ql=/^(?:script|style|textarea|title)$/i,Ca=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),l=Ca(1),xr=Ca(2),py=Ca(3),pn=Symbol.for("lit-noChange"),Mt=Symbol.for("lit-nothing"),Dl=new WeakMap,rr=sr.createTreeWalker(sr,129);function Fl(e,t){if(!Ta(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return Ol!==void 0?Ol.createHTML(t):t}var jl=(e,t)=>{let n=e.length-1,r=[],s,o=t===2?"<svg>":t===3?"<math>":"",a=Xr;for(let i=0;i<n;i++){let c=e[i],u,d,_=-1,h=0;for(;h<c.length&&(a.lastIndex=h,d=a.exec(c),d!==null);)h=a.lastIndex,a===Xr?d[1]==="!--"?a=Ll:d[1]!==void 0?a=Il:d[2]!==void 0?(ql.test(d[2])&&(s=RegExp("</"+d[2],"g")),a=nr):d[3]!==void 0&&(a=nr):a===nr?d[0]===">"?(a=s??Xr,_=-1):d[1]===void 0?_=-2:(_=a.lastIndex-d[2].length,u=d[1],a=d[3]===void 0?nr:d[3]==='"'?Ml:Pl):a===Ml||a===Pl?a=nr:a===Ll||a===Il?a=Xr:(a=nr,s=void 0);let w=a===nr&&e[i+1].startsWith("/>")?" ":"";o+=a===Xr?c+$f:_>=0?(r.push(u),c.slice(0,_)+Sa+c.slice(_)+Rn+w):c+Rn+(_===-2?i:w)}return[Fl(e,o+(e[n]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),r]},ns=class e{constructor({strings:t,_$litType$:n},r){let s;this.parts=[];let o=0,a=0,i=t.length-1,c=this.parts,[u,d]=jl(t,n);if(this.el=e.createElement(u,r),rr.currentNode=this.el.content,n===2||n===3){let _=this.el.content.firstChild;_.replaceWith(..._.childNodes)}for(;(s=rr.nextNode())!==null&&c.length<i;){if(s.nodeType===1){if(s.hasAttributes())for(let _ of s.getAttributeNames())if(_.endsWith(Sa)){let h=d[a++],w=s.getAttribute(_).split(Rn),$=/([.?@])?(.*)/.exec(h);c.push({type:1,index:o,name:$[2],strings:w,ctor:$[1]==="."?Vs:$[1]==="?"?Ks:$[1]==="@"?Ys:ar}),s.removeAttribute(_)}else _.startsWith(Rn)&&(c.push({type:6,index:o}),s.removeAttribute(_));if(ql.test(s.tagName)){let _=s.textContent.split(Rn),h=_.length-1;if(h>0){s.textContent=Hs?Hs.emptyScript:"";for(let w=0;w<h;w++)s.append(_[w],es()),rr.nextNode(),c.push({type:2,index:++o});s.append(_[h],es())}}}else if(s.nodeType===8)if(s.data===Ea)c.push({type:2,index:o});else{let _=-1;for(;(_=s.data.indexOf(Rn,_+1))!==-1;)c.push({type:7,index:o}),_+=Rn.length-1}o++}}static createElement(t,n){let r=sr.createElement("template");return r.innerHTML=t,r}};function or(e,t,n=e,r){if(t===pn)return t;let s=r!==void 0?n._$Co?.[r]:n._$Cl,o=ts(t)?void 0:t._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(e),s._$AT(e,n,r)),r!==void 0?(n._$Co??(n._$Co=[]))[r]=s:n._$Cl=s),s!==void 0&&(t=or(e,s._$AS(e,t.values),s,r)),t}var Gs=class{constructor(t,n){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:n},parts:r}=this._$AD,s=(t?.creationScope??sr).importNode(n,!0);rr.currentNode=s;let o=rr.nextNode(),a=0,i=0,c=r[0];for(;c!==void 0;){if(a===c.index){let u;c.type===2?u=new $r(o,o.nextSibling,this,t):c.type===1?u=new c.ctor(o,c.name,c.strings,this,t):c.type===6&&(u=new Zs(o,this,t)),this._$AV.push(u),c=r[++i]}a!==c?.index&&(o=rr.nextNode(),a++)}return rr.currentNode=sr,s}p(t){let n=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,n),n+=r.strings.length-2):r._$AI(t[n])),n++}},$r=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,n,r,s){this.type=2,this._$AH=Mt,this._$AN=void 0,this._$AA=t,this._$AB=n,this._$AM=r,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,n=this._$AM;return n!==void 0&&t?.nodeType===11&&(t=n.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,n=this){t=or(this,t,n),ts(t)?t===Mt||t==null||t===""?(this._$AH!==Mt&&this._$AR(),this._$AH=Mt):t!==this._$AH&&t!==pn&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Nl(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==Mt&&ts(this._$AH)?this._$AA.nextSibling.data=t:this.T(sr.createTextNode(t)),this._$AH=t}$(t){let{values:n,_$litType$:r}=t,s=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=ns.createElement(Fl(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===s)this._$AH.p(n);else{let o=new Gs(s,this),a=o.u(this.options);o.p(n),this.T(a),this._$AH=o}}_$AC(t){let n=Dl.get(t.strings);return n===void 0&&Dl.set(t.strings,n=new ns(t)),n}k(t){Ta(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,s=0;for(let o of t)s===n.length?n.push(r=new e(this.O(es()),this.O(es()),this,this.options)):r=n[s],r._$AI(o),s++;s<n.length&&(this._$AR(r&&r._$AB.nextSibling,s),n.length=s)}_$AR(t=this._$AA.nextSibling,n){for(this._$AP?.(!1,!0,n);t!==this._$AB;){let r=t.nextSibling;t.remove(),t=r}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},ar=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,n,r,s,o){this.type=1,this._$AH=Mt,this._$AN=void 0,this.element=t,this.name=n,this._$AM=s,this.options=o,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=Mt}_$AI(t,n=this,r,s){let o=this.strings,a=!1;if(o===void 0)t=or(this,t,n,0),a=!ts(t)||t!==this._$AH&&t!==pn,a&&(this._$AH=t);else{let i=t,c,u;for(t=o[0],c=0;c<o.length-1;c++)u=or(this,i[r+c],n,c),u===pn&&(u=this._$AH[c]),a||(a=!ts(u)||u!==this._$AH[c]),u===Mt?t=Mt:t!==Mt&&(t+=(u??"")+o[c+1]),this._$AH[c]=u}a&&!s&&this.j(t)}j(t){t===Mt?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Vs=class extends ar{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Mt?void 0:t}},Ks=class extends ar{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==Mt)}},Ys=class extends ar{constructor(t,n,r,s,o){super(t,n,r,s,o),this.type=5}_$AI(t,n=this){if((t=or(this,t,n,0)??Mt)===pn)return;let r=this._$AH,s=t===Mt&&r!==Mt||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,o=t!==Mt&&(r===Mt||s);s&&this.element.removeEventListener(this.name,this,r),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Zs=class{constructor(t,n,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=n,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){or(this,t)}},Bl={M:Sa,P:Rn,A:Ea,C:1,L:jl,R:Gs,D:Nl,V:or,I:$r,H:ar,N:Ks,U:Ys,B:Vs,F:Zs},xf=Jr.litHtmlPolyfillSupport;xf?.(ns,$r),(Jr.litHtmlVersions??(Jr.litHtmlVersions=[])).push("3.3.1");var Qe=(e,t,n)=>{let r=n?.renderBefore??t,s=r._$litPart$;if(s===void 0){let o=n?.renderBefore??null;r._$litPart$=s=new $r(t.insertBefore(es(),o),o,void 0,n??{})}return s._$AI(e),s};var on="today",Wn=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}];function fn(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function ir(e,t=Date.now()){switch(e){case"today":{let n=new Date(t);return n.setHours(0,0,0,0),n.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function Ul(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Wl(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function zl(){let e=null,t=[],n=new Set;function r(){for(let s of Array.from(n))try{s()}catch{}}return{get(){return e},getWorkspacesState(){return t},set(s,o){e=Array.isArray(s)?s:null,t=Array.isArray(o)?o:[],r()},clear(){e=null,t=[],r()},subscribe(s){return n.add(s),()=>n.delete(s)}}}function Hl(){let e=new Map,t=new Set;function n(s){return s.startsWith("session-log:")?s:`session-log:${s}`}function r(){for(let s of Array.from(t))try{s()}catch{}}return{set(s,o,a=null){e.set(n(s),{lines:Array.isArray(o)?[...o]:[],last_event_at:typeof a=="number"?a:null}),r()},append(s,o){let a=n(s),i=e.get(a)||{lines:[],last_event_at:null};i.lines=[...i.lines,o],i.last_event_at=Date.now(),e.set(a,i),r()},get(s){return e.get(n(s))||null},clear(s){typeof s=="string"?e.delete(n(s)):e.clear(),r()},subscribe(s){return t.add(s),()=>t.delete(s)}}}var Ql=kf(Zl(),1);function Lt(e){return(0,Ql.default)(`beads-ui:${e}`)}function yn(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function cr(e,t){let n=yn(e.created_at),r=yn(t.created_at);if(n!==r)return n<r?1:-1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function ec(e,t){let n=yn(e.created_at),r=yn(t.created_at);if(n!==r)return n<r?-1:1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function tc(e,t){let n=yn(e.updated_at),r=yn(t.updated_at);if(n!==r)return n<r?1:-1;let s=e.id,o=t.id;return s<o?-1:s>o?1:0}function nc(e,t){let n=e.priority??2,r=t.priority??2;if(n!==r)return n-r;let s=yn(e.created_at),o=yn(t.created_at);if(s!==o)return s<o?1:-1;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function rc(e,t){let n=e.closed_at??0,r=t.closed_at??0;if(n!==r)return n<r?1:-1;let s=e?.id,o=t?.id;return s<o?-1:s>o?1:0}var Nf=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function Xl(e){let t=e&&e.metadata,n=t?t.task_order:void 0;if(n==null||n==="")return Number.POSITIVE_INFINITY;let r=Number(n);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function Jl(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let n=Nf.exec(t);if(!n)return Number.POSITIVE_INFINITY;let r=Number(n[1]);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function sc(e,t){let n=Xl(e),r=Xl(t);if(n!==r)return n<r?-1:1;let s=Jl(e),o=Jl(t);if(s!==o)return s<o?-1:1;let a=yn(e&&e.created_at),i=yn(t&&t.created_at);if(a!==i)return a<i?-1:1;let c=e&&e.id,u=t&&t.id;return c===u?0:String(c)<String(u)?-1:1}var Ra=2**20;function Tr(e,t){let n=e&&e.id;return t&&typeof n=="string"&&Object.prototype.hasOwnProperty.call(t,n)&&typeof t[n]=="number"&&Number.isFinite(t[n])?t[n]:-yn(e&&e.created_at)}function Js(e){return(t,n)=>{let r=Tr(t,e),s=Tr(n,e);if(r!==s)return r<s?-1:1;let o=t?.id,a=n?.id;return o<a?-1:o>a?1:0}}function Oa(e,t,n){let r=Array.isArray(e)?e:[],s=r.length,o=Math.max(0,Math.min(t,s-1)),a=o-1>=0?r[o-1]:null,i=o+1<s?r[o+1]:null;if(!a&&!i)return{rank:0};if(!a)return{rank:Tr(i,n)-Ra};if(!i)return{rank:Tr(a,n)+Ra};let c=Tr(a,n),u=Tr(i,n),d=(c+u)/2;return c<d&&d<u?{rank:d}:{renormalize:r.map((_,h)=>({bead_id:_.id,rank:h*Ra}))}}function La(e,t={}){let n=Lt(`issue-store:${e}`),r=new Map,s=[],o=0,a=new Set,i=!1,c=t.sort||cr;function u(){for(let h of Array.from(a))try{h()}catch{}}function d(){s=Array.from(r.values()).sort(c)}function _(h){if(i||!h||h.id!==e)return;let w=Number(h.revision)||0;if(n("apply %s rev=%d",h.type,w),!(w<=o&&h.type!=="snapshot")){if(h.type==="snapshot"){if(w<=o)return;r.clear();let $=Array.isArray(h.issues)?h.issues:[];for(let P of $)P&&typeof P.id=="string"&&P.id.length>0&&r.set(P.id,P);d(),o=w,u();return}if(h.type==="upsert"){let $=h.issue;if($&&typeof $.id=="string"&&$.id.length>0){let P=r.get($.id);if(!P)r.set($.id,$);else{let z=Number.isFinite(P.updated_at)?P.updated_at:0,Q=Number.isFinite($.updated_at)?$.updated_at:0;if(z<=Q){for(let ae of Object.keys(P))ae in $||delete P[ae];for(let[ae,N]of Object.entries($))P[ae]=N}}d()}o=w,u()}else if(h.type==="delete"){let $=String(h.issue_id||"");$&&(r.delete($),d()),o=w,u()}}}return{id:e,subscribe(h){return a.add(h),()=>{a.delete(h)}},applyPush:_,snapshot(){return s},size(){return r.size},getById(h){return r.get(h)},dispose(){i=!0,r.clear(),s=[],a.clear(),o=0}}}function eo(e){let t=String(e.type||"").trim(),n={};if(e.params&&typeof e.params=="object"){let s=Object.keys(e.params).sort();for(let o of s){let a=e.params[o];n[o]=String(a)}}let r=new URLSearchParams(n).toString();return r.length>0?`${t}?${r}`:t}function oc(e){let t=Lt("subs"),n=new Map,r=new Map;function s(i,c){t("applyDelta %s +%d ~%d -%d",i,(c.added||[]).length,(c.updated||[]).length,(c.removed||[]).length);let u=r.get(i);if(!u||u.size===0)return;let d=Array.isArray(c.added)?c.added:[],_=Array.isArray(c.updated)?c.updated:[],h=Array.isArray(c.removed)?c.removed:[];for(let w of Array.from(u)){let $=n.get(w);if(!$)continue;let P=$.itemsById;for(let z of d)typeof z=="string"&&z.length>0&&P.set(z,!0);for(let z of _)typeof z=="string"&&z.length>0&&P.set(z,!0);for(let z of h)typeof z=="string"&&z.length>0&&P.delete(z)}}async function o(i,c){let u=eo(c);if(t("subscribe %s key=%s",i,u),!n.has(i))n.set(i,{key:u,itemsById:new Map});else{let _=n.get(i);if(_&&_.key!==u){let h=r.get(_.key);h&&(h.delete(i),h.size===0&&r.delete(_.key)),n.set(i,{key:u,itemsById:new Map})}}r.has(u)||r.set(u,new Set);let d=r.get(u);d&&d.add(i);try{await e("subscribe-list",{id:i,type:c.type,params:c.params})}catch(_){let h=n.get(i)||null;if(h){let w=r.get(h.key);w&&(w.delete(i),w.size===0&&r.delete(h.key))}throw n.delete(i),_}return async()=>{t("unsubscribe %s key=%s",i,u);try{await e("unsubscribe-list",{id:i})}catch{}let _=n.get(i)||null;if(_){let h=r.get(_.key);h&&(h.delete(i),h.size===0&&r.delete(_.key))}n.delete(i)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:eo,selectors:{getIds(i){let c=n.get(i);return c?Array.from(c.itemsById.keys()):[]},has(i,c){let u=n.get(i);return u?u.itemsById.has(c):!1},count(i){let c=n.get(i);return c?c.itemsById.size:0},getItemsById(i){let c=n.get(i),u={};if(!c)return u;for(let d of c.itemsById.keys())u[d]=!0;return u}}}}function ac(){let e=Lt("issue-stores"),t=new Map,n=new Map,r=new Set,s=new Map;function o(){for(let c of Array.from(r))try{c()}catch{}}function a(c,u,d){let _=u?eo(u):"",h=n.get(c)||"",w=t.has(c);if(e("register %s key=%s (prev=%s)",c,_,h),w&&h&&_&&h!==_){let $=t.get(c);if($)try{$.dispose()}catch{}let P=s.get(c);if(P){try{P()}catch{}s.delete(c)}let z=La(c,d);t.set(c,z);let Q=z.subscribe(()=>o());s.set(c,Q)}else if(!w){let $=La(c,d);t.set(c,$);let P=$.subscribe(()=>o());s.set(c,P)}return n.set(c,_),()=>i(c)}function i(c){e("unregister %s",c),n.delete(c);let u=t.get(c);u&&(u.dispose(),t.delete(c));let d=s.get(c);if(d){try{d()}catch{}s.delete(c)}}return{register:a,unregister:i,getStore(c){return t.get(c)||null},snapshotFor(c){let u=t.get(c);return u?u.snapshot().slice():[]},subscribe(c){return r.add(c),()=>r.delete(c)}}}function ic(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function lc(){let e=null,t=!1,n=new Set;function r(){for(let s of Array.from(n))try{s()}catch{}}return{get(){return e},set(s){e=s,r()},isPending(){return t},setPending(s){let o=s===!0;o!==t&&(t=o,r())},clear(){e=null,t=!1,r()},subscribe(s){return n.add(s),()=>n.delete(s)}}}function cc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Ia(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function qf(e){let t=String(e||""),n=t.startsWith("#")?t.slice(1):t,r=n.indexOf("?"),s=r>=0?n.slice(r+1):"";if(s){let i=new URLSearchParams(s).get("issue");if(i)return decodeURIComponent(i)}let o=/^\/issue\/([^\s?#]+)/.exec(n);return o&&o[1]?decodeURIComponent(o[1]):null}function Ff(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function uc(e){let t=Lt("router"),n=()=>{let r=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(r),o=s&&s[1]?decodeURIComponent(s[1]):qf(r),a=Ff(r);if(t("hash change \u2192 view=%s id=%s",a,o),e.setState({selected_id:a==="worker"?null:o,view:a,worker:{selected_parent_id:a==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(r)){let c=o?`#/${a}?issue=${encodeURIComponent(o)}`:`#/${a}`;window.location.hash!==c&&(window.location.hash=c)}};return{start(){window.addEventListener("hashchange",n),n()},stop(){window.removeEventListener("hashchange",n)},gotoIssue(r){let s=e.getState?e.getState():{view:"board"},o=s.view==="worker"||s.view==="monitor"?s.view:"board",a=Ia(o,r);t("goto issue %s (view=%s)",r,o),window.location.hash!==a?window.location.hash=a:e.setState({selected_id:o==="worker"?null:r,view:o,worker:{selected_parent_id:o==="worker"?r:null}})},gotoView(r){let s=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},o=r==="worker"?s.worker?.selected_parent_id:s.selected_id,a=o?Ia(r,o):`#/${r}`;t("goto view %s (id=%s)",r,o||""),window.location.hash!==a?window.location.hash=a:e.setState({view:r,selected_id:r==="worker"?null:s.selected_id})}}}var jf=Object.freeze({workspace_config:{default_workspace:null}});function dc(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:jf.workspace_config.default_workspace}}}function pc(e={}){let t=Lt("state"),n={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:dc(e.config)},r=new Set;function s(){for(let o of Array.from(r))try{o(n)}catch{}}return{getState(){return n},setState(o){let a={...n,...o,filters:{...n.filters,...o.filters||{}},board:{...n.board,...o.board||{}},worker:{...n.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:n.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:n.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:n.workspace.hidden},config:o.config!==void 0?dc(o.config):n.config},i=a.workspace.current?.path!==n.workspace.current?.path||a.workspace.available.length!==n.workspace.available.length||a.workspace.hidden.length!==n.workspace.hidden.length||a.workspace.hidden.some((u,d)=>u!==n.workspace.hidden[d]),c=a.config.workspace_config.default_workspace!==n.config.workspace_config.default_workspace;a.selected_id===n.selected_id&&a.view===n.view&&a.filters.status===n.filters.status&&a.filters.search===n.filters.search&&a.filters.type===n.filters.type&&a.board.closed_filter===n.board.closed_filter&&a.worker.selected_parent_id===n.worker.selected_parent_id&&a.worker.show_closed_children.length===n.worker.show_closed_children.length&&a.worker.show_closed_children.every((u,d)=>u===n.worker.show_closed_children[d])&&!i&&!c||(n=a,t("state change %o",{selected_id:n.selected_id,view:n.view,filters:n.filters,board:n.board,worker:n.worker,workspace:n.workspace.current?.path,config:{default_workspace:n.config.workspace_config.default_workspace}}),s())},subscribe(o){return r.add(o),()=>r.delete(o)}}}function fc(e){let t=Lt("activity"),n=0,r=new Map,s=1;function o(){if(!e)return;let u=n>0;e.toggleAttribute("hidden",!u),e.setAttribute("aria-busy",u?"true":"false")}function a(){n+=1,t("start count=%d",n),o()}function i(){let u=n;n=Math.max(0,n-1),u<=0?t("done called but count was already %d",u):t("done count=%d\u2192%d",u,n),o()}function c(u){return async(_,h)=>{let w=s++,$=Date.now();r.set(w,{type:_,start_ts:$}),t("request start id=%d type=%s count=%d",w,_,n+1),a();let P=!1,z=()=>{P||(P=!0,r.delete(w),i())},Q=setTimeout(()=>{P||(t("request TIMEOUT id=%d type=%s elapsed=%dms",w,_,Date.now()-$),z())},3e4);try{let ae=await u(_,h),N=Date.now()-$;return t("request done id=%d type=%s elapsed=%dms",w,_,N),ae}catch(ae){let N=Date.now()-$;throw t("request error id=%d type=%s elapsed=%dms err=%o",w,_,N,ae),ae}finally{clearTimeout(Q),z()}}}return o(),{wrapSend:c,start:a,done:i,getCount:()=>n,getActiveRequests:()=>{let u=Date.now();return Array.from(r.entries()).map(([d,_])=>({id:d,type:_.type,elapsed_ms:u-_.start_ts}))}}}function ue(e,t="info",n=2800){let r=document.createElement("div");r.className="toast",r.textContent=e,r.style.position="fixed",r.style.right="12px",r.style.bottom="12px",r.style.zIndex="1000",r.style.color="#fff",r.style.padding="8px 10px",r.style.borderRadius="4px",r.style.fontSize="12px",t==="success"?r.style.background="#156d36":t==="warning"?r.style.background="#a36a00":t==="error"?r.style.background="#9f2011":r.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(r),setTimeout(()=>{try{r.remove()}catch{}},n)}function to(e=void 0,t=void 0){function n(){if(!t||typeof t.get!="function")return null;let o=t.get();return o&&o.order?o.order:{}}function r(o,a,i){let c=e&&e.snapshotFor?e.snapshotFor(o).slice():[];if(a==="closed")return c.sort(rc),c;switch(i){case"created_desc":return c.sort(cr),c;case"created_asc":return c.sort(ec),c;case"updated_desc":return c.sort(tc),c;case"priority":return c.sort(nc),c;case"manual":default:{let u=n();return u?c.sort(Js(u)):c.sort(cr),c}}}function s(o){let a=[];return e&&typeof e.subscribe=="function"&&a.push(e.subscribe(o)),t&&typeof t.subscribe=="function"&&a.push(t.subscribe(o)),()=>{for(let i of a)try{i()}catch{}}}return{selectBoardColumn:r,subscribe:s}}function En(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function Wt(e){let t=En(e);if(t===null)return"";let n=new Date(t),r=s=>String(s).padStart(2,"0");return`${n.getFullYear()}-${r(n.getMonth()+1)}-${r(n.getDate())} ${r(n.getHours())}:${r(n.getMinutes())}`}function an(e,t){let n=En(e);if(n===null)return"";let s=(typeof t=="number"?t:Date.now())-n;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let a=Math.floor(s/36e5);if(a<24)return`${a}\uC2DC\uAC04 \uC804`;let i=Math.floor(s/864e5);if(i<7)return`${i}\uC77C \uC804`;let c=Math.floor(i/7);if(i<30)return`${c}\uC8FC \uC804`;let u=Math.floor(i/30);return u<12?`${u}\uAC1C\uC6D4 \uC804`:`${Math.floor(i/365)}\uB144 \uC804`}function _c(e){if(!Array.isArray(e))return null;let t=null,n=-1;for(let r of e){if(!r||r.status!=="in_progress")continue;let s=En(r.updated_at)??0;if(t===null||s>n){t=r,n=s;continue}s===n&&String(r.id)<String(t.id)&&(t=r)}return t}function no(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function ro(e){let t=new Map;for(let r of e)r&&r.id&&!t.has(r.id)&&t.set(r.id,r);let n=new Map;for(let r of t.values()){let s=no(r);if(!s)continue;let o=n.get(s);o||(o=[],n.set(s,o)),o.push({id:r.id,title:r.title,status:r.status,metadata:r.metadata,workflow:r.workflow,created_at:r.created_at,updated_at:r.updated_at})}return n}function so(e,t){let n=e.get(t)||[],r=0;for(let o of n)(o.status==="resolved"||o.status==="closed")&&(r+=1);let s=_c(n);return{total:n.length,count:r,current:s,children:n}}function oo(e){let t=e.transport,n=e.uiOrderStore;function r(a,i){return"renormalize"in a?a.renormalize:[{bead_id:i,rank:a.rank}]}function s(a,i){let c={...a.order};for(let u of i)c[u.bead_id]=u.rank;n&&n.set({revision:a.revision,order:c})}async function o(a,i,c){if(!t||!n)return;let u=n.get()||{revision:0,order:{}},d=r(Oa(i,c,u.order),a);s(u,d);let _=await t("ui-order-set",{expected_revision:u.revision,entries:d});if(_&&_.conflict){let h={revision:typeof _.revision=="number"?_.revision:0,order:_.order||{}};n.set(h);let w=r(Oa(i,c,h.order),a);s(h,w);let $=await t("ui-order-set",{expected_revision:h.revision,entries:w});$&&$.applied&&n.set({revision:typeof $.revision=="number"?$.revision:0,order:$.order||{}})}else _&&_.applied&&n.set({revision:typeof _.revision=="number"?_.revision:0,order:_.order||{}})}return{applyReorder:o}}function ao(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Pa(e,t){return!t||typeof e!="string"||e.length===0||ao(t.visible_labels).includes(e)?!0:ao(t.hidden_labels).includes(e)?!1:!ao(t.hidden_prefixes).some(n=>n.length>0&&e.startsWith(n))}function mc(e,t){return ao(e).filter(n=>Pa(n,t))}function zn(e,t){let n=e&&e.chips?e.chips[t]:void 0;return typeof n=="boolean"?n:!0}function Bf(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function Uf(e,t,n,r,s){return l`<button
    type="button"
    class="board-card__roll-toggle"
    data-roll-parent=${e}
    aria-expanded=${r?"true":"false"}
    @click=${s}
  >
    children ${t}/${n} ${r?"\u25B4":"\u25BE"}
  </button>`}function Wf(e,t,n,r){return l`<button
    type="button"
    class="board-card__roll-child"
    data-child-id=${e.id}
    @click=${r?s=>r(s,e.id):void 0}
  >
    <span class=${Bf(e.status)}>●</span>
    <span class="board-card__roll-child-ord">${t}</span>
    <span class="board-card__roll-child-title">${e.title||e.id}</span>
    ${n}
  </button>`}function io(e,t){let n=e.total||0,r=!!t.expanded,s=t.trailing??"",o=typeof t.empty_label=="string"&&t.empty_label.length>0?t.empty_label:null;if(n===0&&o===null)return"";let a=Array.isArray(e.children)?e.children:[],i=n>0?a.slice().sort(sc):a;return l`
    <div class="board-card__roll">
      <div class="board-card__roll-meta">
        ${n>0?Uf(t.parent_id,e.count,n,r,t.onToggle):l`<span class="board-card__roll-none">${o}</span>`}
        ${s}
      </div>
      ${n>0&&e.current?l`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${e.current.title||e.current.id}</span
            >
          </div>`:""}
      ${r&&n>0?l`<div class="board-card__roll-list">
            ${i.map((c,u)=>Wf(c,u+1,t.childChips?t.childChips(c):null,t.onChildClick))}
          </div>`:""}
    </div>
  `}var zf={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},hc={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},gc={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},Hf={review:"\u2713",skip:"\u2298"},Hn={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function Gf(e,t,n){if(!(n==="in_progress"||n==="resolved"))return null;for(let s of e){let o=t[s];if(o&&o.fill==="dim"&&o.stale!==!0)return s}return null}function bc(e){let t=e&&e.fill||"none";return t==="none"?Hn.none:e&&e.stale===!0?Hn.stale:t==="dim"?Hn.dim:e&&e.glyph==="review"?Hn.review:e&&e.glyph==="skip"?Hn.skip:Hn.done}function Vf(e){if(!e||e.fill==="none"||!e.approval_state)return bc(e);let t=[];return e.glyph==="review"?t.push(Hn.review):e.glyph==="skip"&&t.push(Hn.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function Kf(e,t,n,r){let s=zf[e]||e,o=t&&t.fill||"none",a=!!t&&t.stale===!0,i=Hf[t&&t.glyph||""]||"",c="bar";o==="dim"?c+=` b-${s} dim`:o==="full"&&(c+=` b-${s} full`),a&&(c+=" stale"),n&&(c+=" cur");let u=o==="none"?"lbl":`lbl l-${s} on`,d=n?`color: var(--stage-${s}-on)`:"",_=hc[e]||e,h=r?yc(t):null;if(!h)return l`
      <div class="seg">
        <div class=${c} style=${d}>${i}</div>
        <div class=${u}>${_}</div>
      </div>
    `;let w=`${_} \uBB38\uC11C \uC5F4\uAE30 \xB7 ${h.path}`;return l`
    <button
      type="button"
      class="seg seg--doc"
      aria-label=${w}
      title=${w}
      @click=${$=>{$.preventDefault(),$.stopPropagation(),r($,h,e)}}
    >
      <div class=${c} style=${d}>${i}</div>
      <div class=${u}>${_}</div>
    </button>
  `}function yc(e){let t=e?e.doc:null;return!t||typeof t.path!="string"||t.path.length===0?null:t}function lo(e,t,n={}){if(!e||!e.stages)return"";let r=n.onOpenDoc,s=gc[e.route]||gc.spec_backed,o=e.stages,a=Gf(s,o,String(t||"open")),i=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${s.map(u=>`${hc[u]||u} ${u==="plan"?Vf(o[u]||{}):bc(o[u]||{})}`).join(" \xB7 ")}`,c=!!r&&s.some(u=>yc(o[u]||{})!==null);return l`
    <div
      class="stp"
      role=${c?"group":"img"}
      aria-label=${i}
    >
      ${s.map(u=>Kf(u,o[u]||{},u===a,r))}
    </div>
  `}function Yf(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var vc=2;function Zf(e){if(!e)return[];let t=[];if(e.external){let r=e.reason?`\u23F8 blocked: ${e.reason}`:"\u23F8 blocked";t.push(l`<span class="ctl-chip ctl-chip--blocked">${r}</span>`)}let n=Array.isArray(e.blockers)?e.blockers:[];if(n.length>0){let r=n.slice(0,vc).join(", "),s=n.length-vc,o=`\u26D3 blocked: ${r}${s>0?` +${s}`:""}`;t.push(l`<span class="ctl-chip ctl-chip--blocked-dep">${o}</span>`)}return t}function Ma(e){return e==="delegated"?"\uC704\uC784":e==="main"?"\uBA54\uC778":null}function co(e){return e.effort?`${e.actor}:${e.effort}`:e.actor}function On(e){return`${e.kind}:${co(e)}@${e.sha}`}function uo(e,t){if(!e)return null;let n=Ma(e.kind),r=e.reason,s=e.kind==="delegated"?r===null:typeof r=="string"&&r.trim().length>0&&!/[\r\n]/.test(r);if(!n||!s)return null;let o=Ma(t?.kind),a=o!==null&&t?.kind!==e.kind,i=`\uACC4\uD68D \xB7 ${n}${a?` \u2192 ${o}`:""}`,c=`planned_execution ${e.kind}${typeof r=="string"?`:${r}`:""}`,u=t?` \xB7 exec_receipt ${On(t)}`:"";return{kind:e.kind,label:i,title:`${c}${u}`}}function wc(e,t){let n=uo(e,t);return n?l`<span
        class="ctl-chip ctl-chip--planned"
        data-kind=${n.kind}
        title=${n.title}
        >${n.label}</span
      >`:null}function Qf(e){if(!e)return null;let t=Ma(e.kind);return t?l`<span
    class="ctl-chip ctl-chip--exec-receipt"
    title=${`exec_receipt ${On(e)}`}
    >${`\uC2E4\uD589 \xB7 ${t}`}</span
  >`:null}function Xf(e,t){let n=t.policy||null,r=e.workflow&&e.workflow.chips||{},s=[];if(r.route&&zn(n,"route")){let i=r.route_source==="derived";s.push(l`<span
        class="ctl-chip ctl-chip--route${i?" is-derived":""}"
        title=${i?"route \uBBF8\uD540 (metadata unset)":"route"}
        >${i?"unset":r.route}</span
      >`)}if(r.fast_track&&zn(n,"fast_track")&&s.push(l`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),r.pr&&zn(n,"pr")){let i=r.pr.number;s.push(l`<span class="ctl-chip ctl-chip--pr"
        >${`PR${i!=null?` #${i}`:""}`}</span
      >`)}let o=wc(r.planned_execution,r.exec_receipt);if(o&&s.push(o),r.exec_receipt){let i=r.exec_receipt;s.push(l`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${On(i)}`}
        >${`exec ${i.kind==="delegated"?co(i):`main:${i.actor}`} \xB7 ${i.sha.slice(0,7)}`}</span
      >`)}if(r.impl_entry){let i=r.impl_entry;s.push(l`<span
        class="ctl-chip ctl-chip--impl-entry"
        title=${`impl_entry ${i.actor}@${i.sha}`}
        >${`impl ${i.actor} \xB7 ${i.sha.slice(0,7)}`}</span
      >`)}for(let i of mc(e.labels,n))s.push(l`<span class="ctl-chip ctl-chip--label">${i}</span>`);return e.from_id&&zn(n,"from")&&s.push(l`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${i=>{i.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(i,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),zn(n,"blocked")&&s.push(...Zf(e.blocked_info)),t.cleanupFailureFor&&t.cleanupFailureFor(e.id)&&zn(n,"blocked")&&s.push(l`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 멈춤</span>`),s.length===0?"":l`<div class="board-card__chips">${s}</div>`}function Jf(e){let t=an(e.created_at),n=an(e.updated_at);return!t&&!n?"":l`<span class="board-card__times">
    ${t?l`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${Wt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}
    ${t&&n?l`<span class="board-card__time-sep">·</span>`:""}
    ${n?l`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${Wt(e.updated_at)}`}
          >수정 ${n}</span
        >`:""}
  </span>`}function e_(e,t){let n=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]};return io(n,{parent_id:e.id,expanded:t.isExpanded?t.isExpanded(e.id):!0,trailing:Jf(e),empty_label:"children \uC5C6\uC74C",childChips:Da,onToggle:r=>t.onRollupToggle&&t.onRollupToggle(r,e.id),onChildClick:(r,s)=>t.onChildClick&&t.onChildClick(r,s)})}function Da(e){let t=e?.workflow?.chips?.planned_execution,n=e?.workflow?.chips?.exec_receipt;return uo(t,n)?l`<span class="board-card__roll-child-chips">
    ${wc(t,n)}
    ${Qf(n)}
  </span>`:null}function po(e,t){let n=Yf(e.priority);return l`
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
        ${n?l`<span class="board-card__pri">${n}</span>`:""}
      </div>
      <div class="board-card__title">${e.title||"(\uC81C\uBAA9 \uC5C6\uC74C)"}</div>
      ${Xf(e,t)}
      ${e.workflow&&zn(t.policy||null,"stepper")?lo(e.workflow,e.status,{onOpenDoc:t.onOpenDoc}):""}
      ${e_(e,t)}
    </article>
  `}function Cr(e,t){let n=Array.isArray(e.items)?e.items.length:0,r=e.is_closed===!0;return l`
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
        ${r?l`<select
              class="board-column__closed-range"
              aria-label="Closed period"
              @change=${t.onClosedRangeChange}
            >
              ${Wn.map(o=>l`<option
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
        ${e.items.map(o=>po(o,t))}
      </div>
    </section>
  `}function kc(e,t,n){return l`
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
          ${e.items.length===0?l`<div class="deferred-popup__empty">Deferred 이슈 없음</div>`:e.items.map(r=>po(r,t))}
        </div>
      </div>
    </dialog>
  `}var t_=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],n_=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],r_=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function s_(e,t,n){let r=e.labels.length,s=r>0?`\uB77C\uBCA8 ${r}`:"\uB77C\uBCA8";return l`
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
      ${n.label_menu_open?l`<div class="board-filter__label-menu" role="group">
            ${n.label_options.length===0?l`<div class="board-filter__label-empty">라벨 없음</div>`:n.label_options.map(o=>l`<label class="board-filter__label-row">
                      <input
                        type="checkbox"
                        .checked=${e.labels.includes(o)}
                        @change=${()=>t.onLabelToggle(o)}
                      />
                      <span>${o}</span>
                    </label>`)}
            ${r>0?l`<button
                  type="button"
                  class="board-filter__label-clear"
                  @click=${t.onLabelClear}
                >
                  선택 해제
                </button>`:""}
          </div>`:""}
    </div>
  `}function $c(e,t,n){return l`
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
        ${t_.map(r=>l`<option
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
        ${n_.map(r=>l`<option
              value=${r.value}
              ?selected=${e.type===r.value}
            >
              ${r.label}
            </option>`)}
      </select>
      ${s_(e,t,n)}
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
        ${r_.map(r=>l`<option
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
  `}var o_=200,a_={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},i_=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),xc="beads-ui.board.sort",Ac=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function l_(){try{let e=window.localStorage.getItem(xc);if(e&&Ac.has(e))return e}catch{}return"created_desc"}function Sc(e,t){let n=Lt("views:board"),r=t.gotoIssue,s=t.issueStores,o=t.transport,a=t.uiOrderStore,i=t.displayPolicyStore,c=t.workerQueueStore,u=t.onClosedRangeChange,d=t.onNewIssue,_=t.openDoc,h=t.closedRange||on,w=s?to(s,a):null,$=oo({transport:o,uiOrderStore:a}),P=[],z=[],Q=[],ae=[],N=[],M=[],q=!1,G=0,E=l_(),W=new Map,B=new Map,ve=new Map,fe=new Set,ge={search:"",priority:"",type:"",labels:[]},V=!1,Te=null;function Re(Z){return String(Z.status||"open")==="open"}function ie(Z){let ee=String(Z.status||"open");return ee==="open"||ee==="blocked"}function de(Z){let ee=ge.search.trim().toLowerCase(),Oe=ge.priority,S=ge.type,g=ge.labels;return Z.filter(k=>{if(ee){let j=String(k.id||"").toLowerCase(),se=String(k.title||"").toLowerCase();if(!j.includes(ee)&&!se.includes(ee))return!1}if(Oe!==""&&String(k.priority)!==Oe||S!==""&&String(k.issue_type||"")!==S)return!1;if(g.length>0){let j=Array.isArray(k.labels)?k.labels:[];if(!g.some(se=>j.includes(se)))return!1}return!0})}function Ae(){let Z=new Set;for(let ee of[P,z,Q,ae,N,M])for(let Oe of ee){let S=Array.isArray(Oe.labels)?Oe.labels:[];for(let g of S)typeof g=="string"&&g.length>0&&Z.add(g)}return Array.from(Z).sort()}function H(){return ge.search.trim()!==""||ge.priority!==""||ge.type!==""||ge.labels.length>0}function te(){try{if(w){let Z=w.selectBoardColumn("tab:board:in-progress","in_progress",E),ee=w.selectBoardColumn("tab:board:blocked","blocked",E).filter(ie),Oe=new Set(Z.map(_e=>_e.id)),S=w.selectBoardColumn("tab:board:ready","ready",E).filter(_e=>Re(_e)&&!Oe.has(_e.id)),g=w.selectBoardColumn("tab:board:resolved","resolved",E),k=w.selectBoardColumn("tab:board:deferred","deferred",E),j=w.selectBoardColumn("tab:board:closed","closed").slice(0,o_),se=[...ee,...S,...Z,...g,...j];ce(se);let re=new Set;for(let _e of se)_e&&_e.id&&!no(_e)&&re.add(_e.id);let ye=!H();P=ye?rs(ee,re):ee,z=ye?rs(S,re):S,Q=ye?rs(Z,re):Z,ae=ye?rs(g,re):g,N=k,G=k.length,M=ye?rs(j,re):j,W=new Map;for(let _e of P)W.set(_e.id,"open");for(let _e of z)W.set(_e.id,"open");for(let _e of Q)W.set(_e.id,"in_progress");for(let _e of ae)W.set(_e.id,"resolved");for(let _e of N)W.set(_e.id,"deferred");for(let _e of M)W.set(_e.id,"closed");B=new Map;for(let _e of P)B.set(_e.id,"blocked-col");for(let _e of z)B.set(_e.id,"ready-col");for(let _e of Q)B.set(_e.id,"in-progress-col");for(let _e of ae)B.set(_e.id,"resolved-col");for(let _e of M)B.set(_e.id,"closed-col")}kt()}catch{P=[],z=[],Q=[],ae=[],N=[],M=[],ve=new Map,kt()}}function ce(Z){ve=ro(Z)}function ke(Z){return so(ve,Z)}function be(Z){return!fe.has(Z)}function je(Z,ee){Z.preventDefault(),Z.stopPropagation(),fe.has(ee)?fe.delete(ee):fe.add(ee),kt()}function we(Z,ee){Z.preventDefault(),Z.stopPropagation(),r(ee)}function Je(Z,ee){Z.preventDefault(),Z.stopPropagation(),r(ee)}function it(Z,ee){Te||r(ee)}function I(Z,ee){Z.preventDefault(),Z.stopPropagation(),c_(ee).then(Oe=>{Oe&&ue("\uBCF5\uC0AC\uB428","success",1200)})}function me(Z,ee){Te=ee,Z.dataTransfer&&(Z.dataTransfer.setData("text/plain",ee),Z.dataTransfer.effectAllowed="move"),Z.target.classList.add("board-card--dragging")}function $e(Z){Z.target.classList.remove("board-card--dragging"),L(),setTimeout(()=>{Te=null},0)}function Se(Z){let ee=String(Z.target.value||"");!ee||ee===h||(h=ee,u&&u(ee),kt())}function Ge(){return i?i.get():null}function qe(Z){let ee=c?c.get():null,Oe=ee?ee.cleanup_failed:null;if(!Oe||typeof Oe!="object"||Array.isArray(Oe))return null;let S=Oe[Z];return!S||typeof S!="object"||Array.isArray(S)?null:S}let K={onCardClick:it,onCopyId:I,onDragStart:me,onDragEnd:$e,onClosedRangeChange:Se,rollupFor:ke,isExpanded:be,onRollupToggle:je,onChildClick:we,onFromChipClick:Je,onOpenDoc:_?(Z,ee)=>_(ee):void 0,cleanupFailureFor:qe,get policy(){return Ge()}};function X(Z,ee){Te||(dt(),r(ee))}function Me(Z,ee){Z.preventDefault(),Z.stopPropagation(),dt(),r(ee)}let et={...K,onCardClick:X,onChildClick:Me,onFromChipClick:Me,onOpenDoc:_?(Z,ee)=>{dt(),_(ee)}:void 0,get policy(){return Ge()}};function Ve(Z){let ee=Z.target,Oe=e.querySelector(".board-filter__labels");ee&&Oe&&Oe.contains(ee)||st()}function De(Z){Z.key==="Escape"&&st()}function Ke(){V||(V=!0,document.addEventListener("mousedown",Ve),document.addEventListener("keydown",De),kt())}function st(){V&&(V=!1,document.removeEventListener("mousedown",Ve),document.removeEventListener("keydown",De),kt())}function Ne(Z){Z.key==="Escape"&&dt()}function Be(){q||(q=!0,document.addEventListener("keydown",Ne),kt())}function dt(){q&&(q=!1,document.removeEventListener("keydown",Ne),kt())}let ht={onClose:dt,onOverlayClick(Z){Z.target===Z.currentTarget&&dt()}},bt={onSearchInput(Z){ge.search=String(Z.target.value||""),te()},onPriorityChange(Z){ge.priority=String(Z.target.value||""),te()},onTypeChange(Z){ge.type=String(Z.target.value||""),te()},onSortChange(Z){let ee=String(Z.target.value||"");if(!(!Ac.has(ee)||ee===E)){E=ee;try{window.localStorage.setItem(xc,ee)}catch{}te()}},onDeferredToggle(){q?dt():Be()},onLabelMenuToggle(){V?st():Ke()},onLabelToggle(Z){let ee=ge.labels.indexOf(Z);ee===-1?ge.labels.push(Z):ge.labels.splice(ee,1),te()},onLabelClear(){ge.labels.length!==0&&(ge.labels=[],te())},onNewIssue(){d&&d()}};function ft(){return l`
      <div class="board-view">
        ${$c(ge,bt,{sort_mode:E,deferred_popup_open:q,deferred_count:G,label_options:Ae(),label_menu_open:V})}
        <div class="board-root">
          ${Cr({title:"Blocked",id:"blocked-col",items:de(P)},K)}
          ${Cr({title:"Ready",id:"ready-col",items:de(z)},K)}
          ${Cr({title:"In progress",id:"in-progress-col",items:de(Q)},K)}
          ${Cr({title:"Resolved",id:"resolved-col",items:de(ae)},K)}
          ${Cr({title:"Closed",id:"closed-col",items:de(M),is_closed:!0,closed_range:h},K)}
        </div>
        ${q?kc({items:de(N),count:G},et,ht):""}
      </div>
    `}function kt(){Qe(ft(),e),Rt()}function Rt(){try{let Z=e.querySelector("#deferred-popup");Z&&!Z.open&&(typeof Z.showModal=="function"?Z.showModal():Z.setAttribute("open",""));let ee=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let Oe of ee)Array.from(Oe.querySelectorAll(".board-card")).forEach((g,k)=>{g.tabIndex=k===0?0:-1})}catch{}}async function $t(Z,ee){if(!o){ue("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:Z,status:ee}),ue("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(Oe){n("update-status failed: %o",Oe),ue("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function xt(Z){switch(Z){case"blocked-col":return P;case"ready-col":return z;case"in-progress-col":return Q;case"resolved-col":return ae;default:return[]}}function Ye(Z,ee,Oe){if(!o||!a)return;let S=xt(Z),g=S.find(ye=>ye.id===ee);if(!g)return;let k=S.filter(ye=>ye.id!==ee),j=Oe.closest?Oe.closest(".board-card"):null,se=k.length;if(j){let ye=j.getAttribute("data-issue-id");if(ye===ee)return;let _e=k.findIndex(nt=>nt.id===ye);_e>=0&&(se=_e)}let re=k.slice();re.splice(se,0,g),$.applyReorder(ee,re,se)}function L(){for(let Z of Array.from(e.querySelectorAll(".board-column--drag-over")))Z.classList.remove("board-column--drag-over")}let U=null;e.addEventListener("dragover",Z=>{Z.preventDefault(),Z.dataTransfer&&(Z.dataTransfer.dropEffect="move");let Oe=Z.target.closest(".board-column");Oe&&Oe!==U&&(U&&U.classList.remove("board-column--drag-over"),Oe.classList.add("board-column--drag-over"),U=Oe)}),e.addEventListener("dragleave",Z=>{let ee=Z.relatedTarget;(!ee||!e.contains(ee))&&U&&(U.classList.remove("board-column--drag-over"),U=null)}),e.addEventListener("drop",Z=>{Z.preventDefault(),U&&(U.classList.remove("board-column--drag-over"),U=null);let ee=Z.target,Oe=ee.closest(".board-column");if(!Oe)return;let S=Z.dataTransfer?.getData("text/plain")||"";if(!S)return;let g=Oe.id,k=B.get(S);if(k&&k===g){if(i_.has(g)){if(E!=="manual"){ue("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}Ye(g,S,ee)}return}let j=a_[g];if(!j){ue("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}W.get(S)!==j&&$t(S,j)}),e.addEventListener("keydown",Z=>{let ee=Z.target;if(!(ee instanceof HTMLElement))return;let Oe=String(ee.tagName||"").toLowerCase();if(Oe==="input"||Oe==="textarea"||Oe==="select"||Oe==="button"||Oe==="a"||ee.isContentEditable===!0)return;let S=ee.closest(".board-card");if(!S)return;let g=String(Z.key||"");if(g==="Enter"||g===" "){Z.preventDefault();let re=S.getAttribute("data-issue-id");re&&r(re);return}if(g!=="ArrowUp"&&g!=="ArrowDown"&&g!=="ArrowLeft"&&g!=="ArrowRight")return;Z.preventDefault();let k=S.closest(".board-column");if(!k)return;let j=Array.from(k.querySelectorAll(".board-card")),se=j.indexOf(S);if(g==="ArrowDown"&&se<j.length-1){Y(S,j[se+1]);return}if(g==="ArrowUp"&&se>0){Y(S,j[se-1]);return}if(g==="ArrowLeft"||g==="ArrowRight"){let re=Array.from(e.querySelectorAll(".board-column")),ye=re.indexOf(k),_e=g==="ArrowRight"?1:-1,nt=ye+_e;for(;nt>=0&&nt<re.length;){let _t=re[nt].querySelector(".board-card");if(_t){Y(S,_t);return}nt+=_e}}});function Y(Z,ee){try{Z.tabIndex=-1,ee.tabIndex=0,ee.focus()}catch{}}let ne=null;w&&w.subscribe&&(ne=w.subscribe(()=>{try{te()}catch{}}));let xe=null;i&&i.subscribe&&(xe=i.subscribe(()=>{try{te()}catch{}}));let He=null;return c&&c.subscribe&&(He=c.subscribe(()=>{kt()})),{async load(){n("load"),te()},clear(){st(),dt(),ne&&(ne(),ne=null),xe&&(xe(),xe=null),He&&(He(),He=null),e.replaceChildren(),P=[],z=[],Q=[],ae=[],N=[],M=[],W=new Map,B=new Map}}}function rs(e,t){return e.filter(n=>{let r=no(n);return!(r&&t.has(r))})}async function c_(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let n=!1;try{n=document.execCommand("copy")}finally{t.remove()}return n}catch{return!1}}async function ln(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let n=document.createElement("textarea");n.value=t,n.style.position="fixed",n.style.left="-9999px",document.body.appendChild(n),n.select();let r=!1;try{r=document.execCommand("copy")}finally{n.remove()}return r}catch{return!1}}function ur(e){return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,e.speed==="fast"?"Fast":null].filter(Boolean).join(" \xB7 ")}function ss(e){return typeof e.resumed_from!="string"||e.resumed_from.length===0?null:`${e.continuation_mode==="session"?"session \uC774\uC5B4\uBC1B\uC74C":e.continuation_mode==="fresh"?"\uC0C8 session\uC73C\uB85C \uC774\uC5B4\uBC1B\uC74C":"\uC774\uC804 attempt\uC5D0\uC11C \uC774\uC5B4\uBC1B\uC74C"} (from ${e.resumed_from})`}function u_(e,t=document){let n=t.createElement("dialog");n.className="continuation-dialog";let r=t.createElement("button"),s=t.createElement("button"),o=t.createElement("button"),a=t.createElement("h2"),i=t.createElement("p");return a.textContent="\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4",i.textContent=`${ur(e.prior||{})||"\uC774\uC804 \uC124\uC815"} \u2192 ${ur(e.current||{})||"\uD604\uC7AC \uC124\uC815"}`,r.type="button",r.textContent="\uAE30\uC874 session \uC774\uC5B4\uD558\uAE30",r.disabled=e.prior_available===!1,s.type="button",s.textContent="\uD604\uC7AC preset\uC73C\uB85C \uC0C8 session",o.type="button",o.textContent="\uCDE8\uC18C",n.append(a,i,r,s,o),t.body.append(n),new Promise(c=>{let u=d=>{typeof n.close=="function"&&n.close(),n.remove(),c(d)};r.addEventListener("click",()=>u("prior_session")),s.addEventListener("click",()=>u("fresh_current")),o.addEventListener("click",()=>u(null)),n.addEventListener("cancel",d=>{d.preventDefault(),u(null)}),typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")})}async function Ln(e,t,n={}){let r=e;for(n.onResult?.(r);r?.continuation_mismatch;){let s=r.continuation_mismatch,o=await u_(s);if(o===null)return r;r=await t(o,s.decision_token),n.onResult?.(r),r?.conflict&&n.refresh&&(r=await n.refresh(r),n.onResult?.(r))}return r}var d_=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed","quick_fix_impl_model","orchestration_model","orchestration_effort","orchestration_speed"],Ec={spec_review_effort:"spec_review_model",plan_review_effort:"plan_review_model",impl_review_effort:"impl_review_model"},p_=new Set(["native-fixed-posture","unsupported","claude-runner-model-default","catalog-validated","provider-tier-or-runtime-model-default","actual-effort"]);function Ft(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function It(e){return typeof e=="string"&&e.length>0?e:null}function Rr(e){return e.startsWith("gpt-")?e.slice(4):e}function Tt(e,t,n,r,s){return{value:e,source:t,display:n,full_value:r,resolution:s}}function Cc(e,t,n){let r=It(t[e]);if(r!==null)return{value:r,source:"pin"};let s=It(n[e]);return s===null?null:{value:s,source:"global"}}function os(e,t,n,r){return Cc(e,t,n)||{value:r,source:"base"}}function Na(e,t,n,r){let s=n?.implementation?.model_catalog;if(t&&Ft(s?.[t])){let a=It(s[t][e]);if(a!==null)return a}if(t&&Array.isArray(s?.[t])&&s[t].includes(e))return e;if(!t&&Ft(s)){for(let a of Object.values(s))if(Ft(a)){let i=It(a[e]);if(i!==null)return i}else if(Array.isArray(a)&&a.includes(e))return e}let o=r?.model_index?.[e];return It(r?.runners?.[o]?.models?.[e]?.id)||e}function f_(e,t){return It(t?.review?.reviewers?.[e]?.model)||e}function Or(e,t,n=!1){if(e==="default")return Tt(e,t,`default (\uC77C\uBC18 \xB7 ${t==="pin"?"\uD540":"\uC804\uC5ED \uACE0\uC815"})`,e,"explicit");let r=n?Rr(e):e;return Tt(e,t,r,e,"explicit")}function Rc(e,t,n){let r=t?.implementation?.model_catalog?.[e],s=[];Ft(r)?s.push(...Object.keys(r)):Array.isArray(r)&&s.push(...r.filter(a=>typeof a=="string"));let o=n?.runners?.[e]?.models;if(Ft(o))for(let a of Object.keys(o))s.includes(a)||s.push(a);return s}function __(e,t){let n=[],r=e?.implementation?.model_catalog;Ft(r)&&n.push(...Object.keys(r));let s=t?.runners;if(Ft(s))for(let o of Object.keys(s))n.includes(o)||n.push(o);return n}function m_(e,t,n){if(e===null)return{runtime:null,offered:!1};let r=!1;for(let s of __(t,n)){let o=Rc(s,t,n);if(o.length>0&&(r=!0),o.includes(e))return{runtime:s,offered:!0}}return{runtime:null,offered:r}}function qa(e){return Tt(e.value,e.source,`${e.value} (\uBE44\uD638\uD658)`,e.value,"incompatible")}function Tc(e,t,n){let r=Cc(e,t,n);return r?Or(r.value,r.source):Tt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable")}function tn(e){let t=Ft(e.pin)?e.pin:{},n=Ft(e.global)?e.global:{},r=Ft(e.execution_defaults)?e.execution_defaults:null,s=r?.supported===!0&&Ft(r.session)?r.session:null,o=r?.supported===!0&&Ft(r.orchestration)?r.orchestration:null,a=Ft(e.runner_catalog)?e.runner_catalog:null,i=It(n.quick_fix_impl_model),c=m_(i,s,a),u={};if(s){let d=os("workflow_mode",t,n,It(s.workflow_mode_default));u.workflow_mode=d.source==="base"?Tt(d.value,"base",d.value||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",d.value,"default"):Or(d.value,d.source);for(let N of["spec_review","plan_review","impl_review"]){let M=`${N}_model`,q=It(N==="plan_review"?d.value==="fast_track"?s.plan_review?.fast_track_default:s.plan_review?.standard_recommended:s.review?.default),G=os(M,t,n,q);if(G.value===null)u[M]=Tt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");else if(G.value!=="self"&&G.value!=="skip"&&!Ft(s.review?.reviewers?.[G.value]))u[M]=qa(Tt(G.value,G.source,"",null,"explicit"));else{let E=f_(G.value,s);u[M]=Tt(G.value,G.source,Rr(E),E,G.source==="base"?"default":"explicit")}}for(let[N,M]of Object.entries(Ec)){let q=u[M].value;if(q==="self"||q==="skip"){u[N]=Tt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable");continue}let G=It(s.review?.reviewers?.[q||""]?.effort),E=os(N,t,n,G);u[N]=E.value===null?Tt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):Tt(E.value,E.source,E.value,E.value,E.source==="base"?"default":"explicit")}let _=Ft(s.implementation?.default)?s.implementation.default:{},h=It(e.route),w=h!==null&&["quick_fix","spec_backed","full_plan"].includes(h),$=Ft(s.implementation?.route_defaults)?s.implementation.route_defaults:{},P=w&&Ft($[h])?$[h]:{};for(let N of["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]){let M=os(N,t,n,N==="impl_dispatch"?It(P.dispatch)||It(_.dispatch):It(_[N.replace("impl_","")]));u[N]=M.value===null?Tt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):Tt(M.value,M.source,M.value,M.value,M.source==="base"?"default":"explicit")}let z=It(t.impl_runtime),Q=z==="inherit"?It(e.controller_runtime):z,ae=h==="quick_fix"&&It(t.impl_dispatch)===null&&c.runtime!==null&&(z===null||Q===c.runtime);if(ae){let N=c.runtime,M=i;u.impl_dispatch=Tt("delegated","global","\uC704\uC784 (\uC804\uC5ED quick_fix)","delegated","explicit"),z===null&&(u.impl_runtime=Tt(N,"global",`${N} (\uC720\uB3C4)`,N,"explicit")),It(t.impl_model)===null&&(u.impl_model=Tt(M,"global",M,M,"explicit"))}if(u.impl_dispatch.value==="main"){u.impl_dispatch.display="\uBA54\uC778";for(let N of["impl_runtime","impl_model","impl_effort","impl_speed"])u[N]=Tt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else{if(u.impl_dispatch.value==="delegated"&&!ae&&(u.impl_dispatch.display="\uC704\uC784"),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_model.value!==null){let N=u.impl_runtime.value==="inherit"?It(e.controller_runtime):u.impl_runtime.value,M=N?Rc(N,s,a):[];if(u.impl_model.value!=="auto"&&M.length>0&&!M.includes(u.impl_model.value))u.impl_model=qa(u.impl_model);else{let q=Na(u.impl_model.value,N,s,a);u.impl_model.display=Rr(q),u.impl_model.full_value=q}}if(u.impl_effort.value==="auto"){let N=It(e.transport)||(u.impl_runtime.value==="codex"?"codex-native-spawn":u.impl_runtime.value==="claude"?"implement-claude":null),M=N?It(s.implementation?.effort_by_transport?.[N]?.auto):null;M&&!p_.has(M)?(u.impl_effort.display=`${M} (\uBE44\uD638\uD658)`,u.impl_effort.full_value=M,u.impl_effort.resolution="incompatible"):(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}u.impl_speed.value==="default"&&(u.impl_speed=u.impl_speed.source==="base"?Tt("default","base","default (\uC77C\uBC18)","default","default"):Or("default",u.impl_speed.source))}}else for(let d of d_.filter(_=>!_.startsWith("orchestration_")))u[d]=Tc(d,t,n);if(!s){for(let[d,_]of Object.entries(Ec))(u[_].value==="self"||u[_].value==="skip")&&(u[d]=Tt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable"));if(u.impl_dispatch.value==="main"){u.impl_dispatch.display="\uBA54\uC778";for(let d of["impl_runtime","impl_model","impl_effort","impl_speed"])u[d]=Tt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else u.impl_dispatch.value==="delegated"&&(u.impl_dispatch.display="\uC704\uC784"),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_effort.value==="auto"&&(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}for(let d of["orchestration_model","orchestration_effort","orchestration_speed"]){if(!o){u[d]=Tc(d,t,n);continue}let _=d.replace("orchestration_",""),h=It(o[_]),w=os(d,t,n,h);if(d==="orchestration_effort"&&w.source==="base"){u[d]=Tt(null,"base","CLI \uAE30\uBCF8 (\uBBF8\uC9C0\uC815)",null,"default");continue}if(w.value===null){u[d]=Tt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");continue}if(d==="orchestration_model"){let $=w.source==="base"?It(o.model_id)||w.value:Na(w.value,null,s,a);u[d]=Tt(w.value,w.source,Rr($),$,w.source==="base"?"default":"explicit");continue}if(w.value==="default"){u[d]=w.source==="base"?Tt("default","base","default (\uC77C\uBC18)","default","default"):Or("default",w.source);continue}u[d]=Or(w.value,w.source)}if(s)if(i===null){let d=u.orchestration_model.full_value;u.quick_fix_impl_model=Tt(null,"base",d===null?"\uBA54\uC778":`\uBA54\uC778 (orchestration ${Rr(d)})`,null,"default")}else if(c.runtime!==null){let d=Na(i,c.runtime,s,a);u.quick_fix_impl_model=Tt(i,"global",Rr(d),d,"explicit")}else c.offered?u.quick_fix_impl_model=qa(Tt(i,"global","",null,"explicit")):u.quick_fix_impl_model=Or(i,"global");return u}function g_(e,t){let n=t&&e.value==="default"?"default (\uC77C\uBC18)":e.display;if(!t||e.source==="pin")return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${e.display}`;let r=e.source==="global"?"\uC804\uC5ED":"harness";return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${n} (${r})`}function fo(e){let t=Ft(e.pin)?e.pin:{},n=Ft(e.global)?e.global:{},r=Ft(e.resolution_global)?{...e.resolution_global}:{};delete r[e.key];let s=_=>{let h={...r,..._};return tn({pin:e.layer==="pin"?h:t,global:e.layer==="pin"?n:h,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog,route:e.route,controller_runtime:e.controller_runtime})},o=e.layer==="pin"?t:n,a={...o};delete a[e.key];let i=s(a)[e.key],c=s(o)[e.key],u=It(o[e.key]),d=[...e.choices];return u!==null&&!d.includes(u)&&d.unshift(u),{unset_label:g_(i,e.layer==="pin"),full_value:i.full_value,unavailable:i.resolution==="unavailable",disabled:c?.resolution==="not_applicable",options:d.map(_=>{let h=s({...o,[e.key]:_})[e.key];return{value:_,label:h.display,full_value:h.full_value}})}}function Lr(e=document){let t=e.createElement("dialog");t.className="resume-instructions-dialog";let n=e.createElement("h2"),r=e.createElement("textarea"),s=e.createElement("div"),o=e.createElement("button"),a=e.createElement("button");return n.textContent="\uC138\uC158 \uC774\uC5B4\uD558\uAE30",r.placeholder="\uCD94\uAC00 \uC9C0\uCE68 (\uC120\uD0DD) \u2014 \uBE44\uC6CC\uB450\uBA74 \uAE30\uBCF8 \uC808\uCC28\uB85C \uC7AC\uAC1C",r.maxLength=4e3,s.className="resume-instructions-dialog__actions",o.type="button",o.textContent="\uC774\uC5B4\uD558\uAE30",a.type="button",a.textContent="\uCDE8\uC18C",s.append(o,a),t.append(n,r,s),e.body.append(t),new Promise(i=>{let c=!1,u=_=>{c||(c=!0,typeof t.close=="function"&&t.close(),t.remove(),i(_))},d=()=>u(r.value.trim());o.addEventListener("click",d),a.addEventListener("click",()=>u(null)),r.addEventListener("keydown",_=>{_.key==="Enter"&&(_.ctrlKey||_.metaKey)&&(_.preventDefault(),d())}),t.addEventListener("cancel",_=>{_.preventDefault(),u(null)}),typeof t.showModal=="function"?t.showModal():t.setAttribute("open",""),r.focus()})}var Mc="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function Ut(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var In=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],as=[...In,"reasoning_output_tokens"],h_={codex:["implementation","review-consult"],claude:["subagent"]};function Fa(e){let t=0;for(let n of In)t+=Ut(e?.[n]);return t}function b_(e){return!e||typeof e!="object"?!1:In.some(t=>Number.isFinite(e[t]))}function Oc(e){return!e||typeof e!="object"?!1:as.some(t=>Number.isFinite(e[t]))}function y_(e){let t={};for(let n of as)e&&Number.isFinite(e[n])&&(t[n]=e[n]);return t}function Lc(e){let t={};for(let n of as)Number.isFinite(e[n])&&(t[n]=e[n]);return e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function Ic(e,t){return e==="codex"?Ut(t.input_tokens)+Ut(t.output_tokens):Fa(t)}function v_(e){return e==="claude"?"Claude":"Codex"}function w_(e){return`\u03C4 ${Dc(e)}`}function k_(e,t){let n=t.breakdown||{},r=[`\uC785\uB825 ${Ut(n.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Ut(n.output_tokens).toLocaleString("en-US")}`];e==="claude"?r.push(`\uCE90\uC2DC\uC77D\uAE30 ${Ut(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Ut(n.cache_creation_input_tokens).toLocaleString("en-US")}`):(r.push(`\uCE90\uC2DC\uC77D\uAE30 ${Ut(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${Ut(n.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(n.reasoning_output_tokens)&&r.push(`\uCD94\uB860\uCD9C\uB825 ${Ut(n.reasoning_output_tokens).toLocaleString("en-US")}`));let o=[e==="claude"?"Claude subtotal = \uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"Codex subtotal = \uC785\uB825 + \uCD9C\uB825; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset",`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,r.join(" \xB7 ")];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&o.push(`$${t.total_cost_usd.toFixed(2)}`),t.replayed&&o.push(Mc),o.join(`
`)}function zt(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let n of["claude","codex"]){let r=e.providers[n];r&&t.push({provider:n,label:`${v_(n)} ${w_(r.subtotal)}${typeof r.total_cost_usd=="number"&&Number.isFinite(r.total_cost_usd)?` \xB7 $${r.total_cost_usd.toFixed(2)}`:""}`,tooltip:k_(n,r)})}return t}function mo(e){let t={},n={claude:!0,codex:!1},r={claude:0,codex:0};for(let s of e)if(!(!s||!s.providers))for(let o of["claude","codex"]){let a=s.providers[o];if(!a)continue;let i=t[o];i||(i={subtotal:0,breakdown:{}},t[o]=i),i.subtotal+=a.subtotal;for(let c of as)Number.isFinite(a.breakdown[c])&&(i.breakdown[c]=Ut(i.breakdown[c])+Ut(a.breakdown[c]));a.replayed&&(i.replayed=!0),o==="claude"&&(typeof a.total_cost_usd=="number"&&Number.isFinite(a.total_cost_usd)?r.claude+=a.total_cost_usd:n.claude=!1)}return t.claude&&n.claude&&(t.claude.total_cost_usd=r.claude),Object.keys(t).length===0?null:{providers:t,roles:{}}}function ja(e){return!e||typeof e!="object"?null:_n({attempt:{...e,bead_id:"__attempt__"}},"__attempt__")}function $_(e){return e==="codex"?"codex":"claude"}function Tn(){return{subtotal:0,breakdown:y_(null),legs:[],replayed:!1,outer_count:0,outer_cost:0,outer_cost_count:0}}function _o(e,t,n){e.subtotal+=t.subtotal;for(let r of as)Number.isFinite(t.usage[r])&&(e.breakdown[r]=Ut(e.breakdown[r])+Ut(t.usage[r]));e.legs.push(t),t.replayed===!0&&(e.replayed=!0),n&&(e.outer_count+=1,typeof t.usage.total_cost_usd=="number"&&Number.isFinite(t.usage.total_cost_usd)&&(e.outer_cost+=t.usage.total_cost_usd,e.outer_cost_count+=1))}function Pc(e,t){let n={subtotal:e.subtotal,breakdown:e.breakdown};return t&&(n.legs=e.legs),e.replayed&&(n.replayed=!0),n}function Dc(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function Ir(e){return b_(e)?`\u03C4 ${Dc(Fa(e))}`:null}function Pn(e){let t=Ir(e);if(!t)return null;let n=e?.total_cost_usd;return typeof n=="number"&&Number.isFinite(n)?`${t} \xB7 $${n.toFixed(2)}`:t}function is(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${Ut(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Ut(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${Ut(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Ut(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let n=[`\uCD1D ${Fa(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&n.push(Mc),n.join(`
`)}function _n(e,t){let n={claude:Tn(),codex:Tn()},r={orchestrator:{claude:Tn(),codex:Tn()},implementation:{claude:Tn(),codex:Tn()},"review-consult":{claude:Tn(),codex:Tn()},subagent:{claude:Tn(),codex:Tn()}},s=new Set;for(let i of Object.values(e||{})){if(!i||i.bead_id!==t)continue;let c=i.usage;if(Oc(c)){let d=$_(i.runner),_=Lc(c),h={provider:d,role:"orchestrator",attempt_id:String(i.attempt_id||""),usage:_,subtotal:Ic(d,_)};_.replayed===!0&&(h.replayed=!0),typeof i.model=="string"&&(h.model=i.model),typeof i.session_id=="string"&&(h.session_id=i.session_id),_o(n[d],h,!0),_o(r.orchestrator[d],h,!0)}let u=Array.isArray(i.usage_legs)?i.usage_legs:[];for(let d of u){let _=d&&d.provider==="claude"?"claude":"codex";if(!d||d.provider!=="codex"&&d.provider!=="claude"||!h_[_].includes(d.role)||!Oc(d.usage))continue;let h=typeof d.receipt_id=="string"&&d.receipt_id.length>0?d.receipt_id:null;if(!h||s.has(h))continue;s.add(h);let w=Lc(d.usage),$={provider:_,role:d.role,attempt_id:String(i.attempt_id||""),usage:w,subtotal:Ic(_,w)};$.receipt_id=h,typeof d.agent_type=="string"&&($.agent_type=d.agent_type),typeof d.agent_id=="string"&&($.agent_id=d.agent_id),typeof d.model=="string"&&($.model=d.model),typeof d.effort=="string"&&d.effort.trim().length>0&&($.effort=d.effort),typeof d.session_id=="string"?$.session_id=d.session_id:typeof d.thread_id=="string"&&($.session_id=d.thread_id),typeof d.turn_id=="string"&&($.turn_id=d.turn_id),(typeof d.completed_at=="string"||typeof d.completed_at=="number"&&Number.isFinite(d.completed_at))&&($.completed_at=d.completed_at),w.replayed===!0&&($.replayed=!0),_o(n[_],$,!1),_o(r[$.role][_],$,!1)}}let o={};for(let i of["claude","codex"]){let c=n[i];if(c.legs.length===0)continue;let u=Pc(c,!1);i==="claude"&&c.outer_count>0&&c.outer_cost_count===c.outer_count&&(u.total_cost_usd=c.outer_cost),o[i]=u}if(Object.keys(o).length===0)return null;let a={};for(let i of["orchestrator","implementation","review-consult","subagent"]){let c={};for(let u of["claude","codex"]){let d=r[i][u];d.legs.length>0&&(c[u]={...Pc(d,!0),legs:d.legs})}Object.keys(c).length>0&&(a[i]=c)}return{providers:o,roles:a}}var{entries:Hc,setPrototypeOf:Nc,isFrozen:x_,getPrototypeOf:A_,getOwnPropertyDescriptor:S_}=Object,{freeze:Yt,seal:mn,create:Va}=Object,{apply:Ka,construct:Ya}=typeof Reflect<"u"&&Reflect;Yt||(Yt=function(t){return t});mn||(mn=function(t){return t});Ka||(Ka=function(t,n){for(var r=arguments.length,s=new Array(r>2?r-2:0),o=2;o<r;o++)s[o-2]=arguments[o];return t.apply(n,s)});Ya||(Ya=function(t){for(var n=arguments.length,r=new Array(n>1?n-1:0),s=1;s<n;s++)r[s-1]=arguments[s];return new t(...r)});var go=Zt(Array.prototype.forEach),E_=Zt(Array.prototype.lastIndexOf),qc=Zt(Array.prototype.pop),ls=Zt(Array.prototype.push),T_=Zt(Array.prototype.splice),bo=Zt(String.prototype.toLowerCase),Ba=Zt(String.prototype.toString),Ua=Zt(String.prototype.match),cs=Zt(String.prototype.replace),C_=Zt(String.prototype.indexOf),R_=Zt(String.prototype.trim),vn=Zt(Object.prototype.hasOwnProperty),Kt=Zt(RegExp.prototype.test),us=O_(TypeError);function Zt(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,r=new Array(n>1?n-1:0),s=1;s<n;s++)r[s-1]=arguments[s];return Ka(e,t,r)}}function O_(e){return function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return Ya(e,n)}}function lt(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:bo;Nc&&Nc(e,null);let r=t.length;for(;r--;){let s=t[r];if(typeof s=="string"){let o=n(s);o!==s&&(x_(t)||(t[r]=o),s=o)}e[s]=!0}return e}function L_(e){for(let t=0;t<e.length;t++)vn(e,t)||(e[t]=null);return e}function Mn(e){let t=Va(null);for(let[n,r]of Hc(e))vn(e,n)&&(Array.isArray(r)?t[n]=L_(r):r&&typeof r=="object"&&r.constructor===Object?t[n]=Mn(r):t[n]=r);return t}function ds(e,t){for(;e!==null;){let r=S_(e,t);if(r){if(r.get)return Zt(r.get);if(typeof r.value=="function")return Zt(r.value)}e=A_(e)}function n(){return null}return n}var Fc=Yt(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Wa=Yt(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),za=Yt(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),I_=Yt(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Ha=Yt(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),P_=Yt(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),jc=Yt(["#text"]),Bc=Yt(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),Ga=Yt(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Uc=Yt(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),ho=Yt(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),M_=mn(/\{\{[\w\W]*|[\w\W]*\}\}/gm),D_=mn(/<%[\w\W]*|[\w\W]*%>/gm),N_=mn(/\$\{[\w\W]*/gm),q_=mn(/^data-[\-\w.\u00B7-\uFFFF]+$/),F_=mn(/^aria-[\-\w]+$/),Gc=mn(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),j_=mn(/^(?:\w+script|data):/i),B_=mn(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Vc=mn(/^html$/i),U_=mn(/^[a-z][.\w]*(-[.\w]+)+$/i),Wc=Object.freeze({__proto__:null,ARIA_ATTR:F_,ATTR_WHITESPACE:B_,CUSTOM_ELEMENT:U_,DATA_ATTR:q_,DOCTYPE_NAME:Vc,ERB_EXPR:D_,IS_ALLOWED_URI:Gc,IS_SCRIPT_OR_DATA:j_,MUSTACHE_EXPR:M_,TMPLIT_EXPR:N_}),ps={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},W_=function(){return typeof window>"u"?null:window},z_=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let r=null,s="data-tt-policy-suffix";n&&n.hasAttribute(s)&&(r=n.getAttribute(s));let o="dompurify"+(r?"#"+r:"");try{return t.createPolicy(o,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},zc=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Kc(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:W_(),t=Pe=>Kc(Pe);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==ps.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e,r=n,s=r.currentScript,{DocumentFragment:o,HTMLTemplateElement:a,Node:i,Element:c,NodeFilter:u,NamedNodeMap:d=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:_,DOMParser:h,trustedTypes:w}=e,$=c.prototype,P=ds($,"cloneNode"),z=ds($,"remove"),Q=ds($,"nextSibling"),ae=ds($,"childNodes"),N=ds($,"parentNode");if(typeof a=="function"){let Pe=n.createElement("template");Pe.content&&Pe.content.ownerDocument&&(n=Pe.content.ownerDocument)}let M,q="",{implementation:G,createNodeIterator:E,createDocumentFragment:W,getElementsByTagName:B}=n,{importNode:ve}=r,fe=zc();t.isSupported=typeof Hc=="function"&&typeof N=="function"&&G&&G.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:ge,ERB_EXPR:V,TMPLIT_EXPR:Te,DATA_ATTR:Re,ARIA_ATTR:ie,IS_SCRIPT_OR_DATA:de,ATTR_WHITESPACE:Ae,CUSTOM_ELEMENT:H}=Wc,{IS_ALLOWED_URI:te}=Wc,ce=null,ke=lt({},[...Fc,...Wa,...za,...Ha,...jc]),be=null,je=lt({},[...Bc,...Ga,...Uc,...ho]),we=Object.seal(Va(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Je=null,it=null,I=Object.seal(Va(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),me=!0,$e=!0,Se=!1,Ge=!0,qe=!1,K=!0,X=!1,Me=!1,et=!1,Ve=!1,De=!1,Ke=!1,st=!0,Ne=!1,Be="user-content-",dt=!0,ht=!1,bt={},ft=null,kt=lt({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),Rt=null,$t=lt({},["audio","video","img","source","image","track"]),xt=null,Ye=lt({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),L="http://www.w3.org/1998/Math/MathML",U="http://www.w3.org/2000/svg",Y="http://www.w3.org/1999/xhtml",ne=Y,xe=!1,He=null,Z=lt({},[L,U,Y],Ba),ee=lt({},["mi","mo","mn","ms","mtext"]),Oe=lt({},["annotation-xml"]),S=lt({},["title","style","font","a","script"]),g=null,k=["application/xhtml+xml","text/html"],j="text/html",se=null,re=null,ye=n.createElement("form"),_e=function(O){return O instanceof RegExp||O instanceof Function},nt=function(){let O=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(re&&re===O)){if((!O||typeof O!="object")&&(O={}),O=Mn(O),g=k.indexOf(O.PARSER_MEDIA_TYPE)===-1?j:O.PARSER_MEDIA_TYPE,se=g==="application/xhtml+xml"?Ba:bo,ce=vn(O,"ALLOWED_TAGS")?lt({},O.ALLOWED_TAGS,se):ke,be=vn(O,"ALLOWED_ATTR")?lt({},O.ALLOWED_ATTR,se):je,He=vn(O,"ALLOWED_NAMESPACES")?lt({},O.ALLOWED_NAMESPACES,Ba):Z,xt=vn(O,"ADD_URI_SAFE_ATTR")?lt(Mn(Ye),O.ADD_URI_SAFE_ATTR,se):Ye,Rt=vn(O,"ADD_DATA_URI_TAGS")?lt(Mn($t),O.ADD_DATA_URI_TAGS,se):$t,ft=vn(O,"FORBID_CONTENTS")?lt({},O.FORBID_CONTENTS,se):kt,Je=vn(O,"FORBID_TAGS")?lt({},O.FORBID_TAGS,se):Mn({}),it=vn(O,"FORBID_ATTR")?lt({},O.FORBID_ATTR,se):Mn({}),bt=vn(O,"USE_PROFILES")?O.USE_PROFILES:!1,me=O.ALLOW_ARIA_ATTR!==!1,$e=O.ALLOW_DATA_ATTR!==!1,Se=O.ALLOW_UNKNOWN_PROTOCOLS||!1,Ge=O.ALLOW_SELF_CLOSE_IN_ATTR!==!1,qe=O.SAFE_FOR_TEMPLATES||!1,K=O.SAFE_FOR_XML!==!1,X=O.WHOLE_DOCUMENT||!1,Ve=O.RETURN_DOM||!1,De=O.RETURN_DOM_FRAGMENT||!1,Ke=O.RETURN_TRUSTED_TYPE||!1,et=O.FORCE_BODY||!1,st=O.SANITIZE_DOM!==!1,Ne=O.SANITIZE_NAMED_PROPS||!1,dt=O.KEEP_CONTENT!==!1,ht=O.IN_PLACE||!1,te=O.ALLOWED_URI_REGEXP||Gc,ne=O.NAMESPACE||Y,ee=O.MATHML_TEXT_INTEGRATION_POINTS||ee,Oe=O.HTML_INTEGRATION_POINTS||Oe,we=O.CUSTOM_ELEMENT_HANDLING||{},O.CUSTOM_ELEMENT_HANDLING&&_e(O.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(we.tagNameCheck=O.CUSTOM_ELEMENT_HANDLING.tagNameCheck),O.CUSTOM_ELEMENT_HANDLING&&_e(O.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(we.attributeNameCheck=O.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),O.CUSTOM_ELEMENT_HANDLING&&typeof O.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(we.allowCustomizedBuiltInElements=O.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),qe&&($e=!1),De&&(Ve=!0),bt&&(ce=lt({},jc),be=[],bt.html===!0&&(lt(ce,Fc),lt(be,Bc)),bt.svg===!0&&(lt(ce,Wa),lt(be,Ga),lt(be,ho)),bt.svgFilters===!0&&(lt(ce,za),lt(be,Ga),lt(be,ho)),bt.mathMl===!0&&(lt(ce,Ha),lt(be,Uc),lt(be,ho))),O.ADD_TAGS&&(typeof O.ADD_TAGS=="function"?I.tagCheck=O.ADD_TAGS:(ce===ke&&(ce=Mn(ce)),lt(ce,O.ADD_TAGS,se))),O.ADD_ATTR&&(typeof O.ADD_ATTR=="function"?I.attributeCheck=O.ADD_ATTR:(be===je&&(be=Mn(be)),lt(be,O.ADD_ATTR,se))),O.ADD_URI_SAFE_ATTR&&lt(xt,O.ADD_URI_SAFE_ATTR,se),O.FORBID_CONTENTS&&(ft===kt&&(ft=Mn(ft)),lt(ft,O.FORBID_CONTENTS,se)),dt&&(ce["#text"]=!0),X&&lt(ce,["html","head","body"]),ce.table&&(lt(ce,["tbody"]),delete Je.tbody),O.TRUSTED_TYPES_POLICY){if(typeof O.TRUSTED_TYPES_POLICY.createHTML!="function")throw us('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof O.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw us('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');M=O.TRUSTED_TYPES_POLICY,q=M.createHTML("")}else M===void 0&&(M=z_(w,s)),M!==null&&typeof q=="string"&&(q=M.createHTML(""));Yt&&Yt(O),re=O}},_t=lt({},[...Wa,...za,...I_]),tt=lt({},[...Ha,...P_]),ot=function(O){let pe=N(O);(!pe||!pe.tagName)&&(pe={namespaceURI:ne,tagName:"template"});let Le=bo(O.tagName),ct=bo(pe.tagName);return He[O.namespaceURI]?O.namespaceURI===U?pe.namespaceURI===Y?Le==="svg":pe.namespaceURI===L?Le==="svg"&&(ct==="annotation-xml"||ee[ct]):!!_t[Le]:O.namespaceURI===L?pe.namespaceURI===Y?Le==="math":pe.namespaceURI===U?Le==="math"&&Oe[ct]:!!tt[Le]:O.namespaceURI===Y?pe.namespaceURI===U&&!Oe[ct]||pe.namespaceURI===L&&!ee[ct]?!1:!tt[Le]&&(S[Le]||!_t[Le]):!!(g==="application/xhtml+xml"&&He[O.namespaceURI]):!1},Ot=function(O){ls(t.removed,{element:O});try{N(O).removeChild(O)}catch{z(O)}},gt=function(O,pe){try{ls(t.removed,{attribute:pe.getAttributeNode(O),from:pe})}catch{ls(t.removed,{attribute:null,from:pe})}if(pe.removeAttribute(O),O==="is")if(Ve||De)try{Ot(pe)}catch{}else try{pe.setAttribute(O,"")}catch{}},dn=function(O){let pe=null,Le=null;if(et)O="<remove></remove>"+O;else{let yt=Ua(O,/^[\r\n\t ]+/);Le=yt&&yt[0]}g==="application/xhtml+xml"&&ne===Y&&(O='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+O+"</body></html>");let ct=M?M.createHTML(O):O;if(ne===Y)try{pe=new h().parseFromString(ct,g)}catch{}if(!pe||!pe.documentElement){pe=G.createDocument(ne,"template",null);try{pe.documentElement.innerHTML=xe?q:ct}catch{}}let St=pe.body||pe.documentElement;return O&&Le&&St.insertBefore(n.createTextNode(Le),St.childNodes[0]||null),ne===Y?B.call(pe,X?"html":"body")[0]:X?pe.documentElement:St},Bt=function(O){return E.call(O.ownerDocument||O,O,u.SHOW_ELEMENT|u.SHOW_COMMENT|u.SHOW_TEXT|u.SHOW_PROCESSING_INSTRUCTION|u.SHOW_CDATA_SECTION,null)},Dt=function(O){return O instanceof _&&(typeof O.nodeName!="string"||typeof O.textContent!="string"||typeof O.removeChild!="function"||!(O.attributes instanceof d)||typeof O.removeAttribute!="function"||typeof O.setAttribute!="function"||typeof O.namespaceURI!="string"||typeof O.insertBefore!="function"||typeof O.hasChildNodes!="function")},Gt=function(O){return typeof i=="function"&&O instanceof i};function qt(Pe,O,pe){go(Pe,Le=>{Le.call(t,O,pe,re)})}let Pt=function(O){let pe=null;if(qt(fe.beforeSanitizeElements,O,null),Dt(O))return Ot(O),!0;let Le=se(O.nodeName);if(qt(fe.uponSanitizeElement,O,{tagName:Le,allowedTags:ce}),K&&O.hasChildNodes()&&!Gt(O.firstElementChild)&&Kt(/<[/\w!]/g,O.innerHTML)&&Kt(/<[/\w!]/g,O.textContent)||O.nodeType===ps.progressingInstruction||K&&O.nodeType===ps.comment&&Kt(/<[/\w]/g,O.data))return Ot(O),!0;if(!(I.tagCheck instanceof Function&&I.tagCheck(Le))&&(!ce[Le]||Je[Le])){if(!Je[Le]&&Xt(Le)&&(we.tagNameCheck instanceof RegExp&&Kt(we.tagNameCheck,Le)||we.tagNameCheck instanceof Function&&we.tagNameCheck(Le)))return!1;if(dt&&!ft[Le]){let ct=N(O)||O.parentNode,St=ae(O)||O.childNodes;if(St&&ct){let yt=St.length;for(let v=yt-1;v>=0;--v){let b=P(St[v],!0);b.__removalCount=(O.__removalCount||0)+1,ct.insertBefore(b,Q(O))}}}return Ot(O),!0}return O instanceof c&&!ot(O)||(Le==="noscript"||Le==="noembed"||Le==="noframes")&&Kt(/<\/no(script|embed|frames)/i,O.innerHTML)?(Ot(O),!0):(qe&&O.nodeType===ps.text&&(pe=O.textContent,go([ge,V,Te],ct=>{pe=cs(pe,ct," ")}),O.textContent!==pe&&(ls(t.removed,{element:O.cloneNode()}),O.textContent=pe)),qt(fe.afterSanitizeElements,O,null),!1)},We=function(O,pe,Le){if(st&&(pe==="id"||pe==="name")&&(Le in n||Le in ye))return!1;if(!($e&&!it[pe]&&Kt(Re,pe))){if(!(me&&Kt(ie,pe))){if(!(I.attributeCheck instanceof Function&&I.attributeCheck(pe,O))){if(!be[pe]||it[pe]){if(!(Xt(O)&&(we.tagNameCheck instanceof RegExp&&Kt(we.tagNameCheck,O)||we.tagNameCheck instanceof Function&&we.tagNameCheck(O))&&(we.attributeNameCheck instanceof RegExp&&Kt(we.attributeNameCheck,pe)||we.attributeNameCheck instanceof Function&&we.attributeNameCheck(pe,O))||pe==="is"&&we.allowCustomizedBuiltInElements&&(we.tagNameCheck instanceof RegExp&&Kt(we.tagNameCheck,Le)||we.tagNameCheck instanceof Function&&we.tagNameCheck(Le))))return!1}else if(!xt[pe]){if(!Kt(te,cs(Le,Ae,""))){if(!((pe==="src"||pe==="xlink:href"||pe==="href")&&O!=="script"&&C_(Le,"data:")===0&&Rt[O])){if(!(Se&&!Kt(de,cs(Le,Ae,"")))){if(Le)return!1}}}}}}}return!0},Xt=function(O){return O!=="annotation-xml"&&Ua(O,H)},Vt=function(O){qt(fe.beforeSanitizeAttributes,O,null);let{attributes:pe}=O;if(!pe||Dt(O))return;let Le={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:be,forceKeepAttr:void 0},ct=pe.length;for(;ct--;){let St=pe[ct],{name:yt,namespaceURI:v,value:b}=St,x=se(yt),D=b,J=yt==="value"?D:R_(D);if(Le.attrName=x,Le.attrValue=J,Le.keepAttr=!0,Le.forceKeepAttr=void 0,qt(fe.uponSanitizeAttribute,O,Le),J=Le.attrValue,Ne&&(x==="id"||x==="name")&&(gt(yt,O),J=Be+J),K&&Kt(/((--!?|])>)|<\/(style|title|textarea)/i,J)){gt(yt,O);continue}if(x==="attributename"&&Ua(J,"href")){gt(yt,O);continue}if(Le.forceKeepAttr)continue;if(!Le.keepAttr){gt(yt,O);continue}if(!Ge&&Kt(/\/>/i,J)){gt(yt,O);continue}qe&&go([ge,V,Te],Ie=>{J=cs(J,Ie," ")});let he=se(O.nodeName);if(!We(he,x,J)){gt(yt,O);continue}if(M&&typeof w=="object"&&typeof w.getAttributeType=="function"&&!v)switch(w.getAttributeType(he,x)){case"TrustedHTML":{J=M.createHTML(J);break}case"TrustedScriptURL":{J=M.createScriptURL(J);break}}if(J!==D)try{v?O.setAttributeNS(v,yt,J):O.setAttribute(yt,J),Dt(O)?Ot(O):qc(t.removed)}catch{gt(yt,O)}}qt(fe.afterSanitizeAttributes,O,null)},at=function Pe(O){let pe=null,Le=Bt(O);for(qt(fe.beforeSanitizeShadowDOM,O,null);pe=Le.nextNode();)qt(fe.uponSanitizeShadowNode,pe,null),Pt(pe),Vt(pe),pe.content instanceof o&&Pe(pe.content);qt(fe.afterSanitizeShadowDOM,O,null)};return t.sanitize=function(Pe){let O=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},pe=null,Le=null,ct=null,St=null;if(xe=!Pe,xe&&(Pe="<!-->"),typeof Pe!="string"&&!Gt(Pe))if(typeof Pe.toString=="function"){if(Pe=Pe.toString(),typeof Pe!="string")throw us("dirty is not a string, aborting")}else throw us("toString is not a function");if(!t.isSupported)return Pe;if(Me||nt(O),t.removed=[],typeof Pe=="string"&&(ht=!1),ht){if(Pe.nodeName){let b=se(Pe.nodeName);if(!ce[b]||Je[b])throw us("root node is forbidden and cannot be sanitized in-place")}}else if(Pe instanceof i)pe=dn("<!---->"),Le=pe.ownerDocument.importNode(Pe,!0),Le.nodeType===ps.element&&Le.nodeName==="BODY"||Le.nodeName==="HTML"?pe=Le:pe.appendChild(Le);else{if(!Ve&&!qe&&!X&&Pe.indexOf("<")===-1)return M&&Ke?M.createHTML(Pe):Pe;if(pe=dn(Pe),!pe)return Ve?null:Ke?q:""}pe&&et&&Ot(pe.firstChild);let yt=Bt(ht?Pe:pe);for(;ct=yt.nextNode();)Pt(ct),Vt(ct),ct.content instanceof o&&at(ct.content);if(ht)return Pe;if(Ve){if(De)for(St=W.call(pe.ownerDocument);pe.firstChild;)St.appendChild(pe.firstChild);else St=pe;return(be.shadowroot||be.shadowrootmode)&&(St=ve.call(r,St,!0)),St}let v=X?pe.outerHTML:pe.innerHTML;return X&&ce["!doctype"]&&pe.ownerDocument&&pe.ownerDocument.doctype&&pe.ownerDocument.doctype.name&&Kt(Vc,pe.ownerDocument.doctype.name)&&(v="<!DOCTYPE "+pe.ownerDocument.doctype.name+`>
`+v),qe&&go([ge,V,Te],b=>{v=cs(v,b," ")}),M&&Ke?M.createHTML(v):v},t.setConfig=function(){let Pe=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};nt(Pe),Me=!0},t.clearConfig=function(){re=null,Me=!1},t.isValidAttribute=function(Pe,O,pe){re||nt({});let Le=se(Pe),ct=se(O);return We(Le,ct,pe)},t.addHook=function(Pe,O){typeof O=="function"&&ls(fe[Pe],O)},t.removeHook=function(Pe,O){if(O!==void 0){let pe=E_(fe[Pe],O);return pe===-1?void 0:T_(fe[Pe],pe,1)[0]}return qc(fe[Pe])},t.removeHooks=function(Pe){fe[Pe]=[]},t.removeAllHooks=function(){fe=zc()},t}var Yc=Kc();var Dn={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},yo=e=>(...t)=>({_$litDirective$:e,values:t}),Pr=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,n,r){this._$Ct=t,this._$AM=n,this._$Ci=r}_$AS(t,n){return this.update(t,n)}update(t,n){return this.render(...n)}};var fs=class extends Pr{constructor(t){if(super(t),this.it=Mt,t.type!==Dn.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===Mt||t==null)return this._t=void 0,this.it=t;if(t===pn)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let n=[t];return n.raw=n,this._t={_$litType$:this.constructor.resultType,strings:n,values:[]}}};fs.directiveName="unsafeHTML",fs.resultType=1;var Zc=yo(fs);function Ja(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var pr=Ja();function ru(e){pr=e}var hs={exec:()=>null};function mt(e,t=""){let n=typeof e=="string"?e:e.source,r={replace:(s,o)=>{let a=typeof o=="string"?o:o.source;return a=a.replace(Qt.caret,"$1"),n=n.replace(s,a),r},getRegex:()=>new RegExp(n,t)};return r}var H_=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),Qt={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},G_=/^(?:[ \t]*(?:\n|$))+/,V_=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,K_=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,bs=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Y_=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,ei=/(?:[*+-]|\d{1,9}[.)])/,su=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,ou=mt(su).replace(/bull/g,ei).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Z_=mt(su).replace(/bull/g,ei).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),ti=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Q_=/^[^\n]+/,ni=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,X_=mt(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",ni).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),J_=mt(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,ei).getRegex(),Ao="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",ri=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,em=mt("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",ri).replace("tag",Ao).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),au=mt(ti).replace("hr",bs).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ao).getRegex(),tm=mt(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",au).getRegex(),si={blockquote:tm,code:V_,def:X_,fences:K_,heading:Y_,hr:bs,html:em,lheading:ou,list:J_,newline:G_,paragraph:au,table:hs,text:Q_},Qc=mt("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",bs).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ao).getRegex(),nm={...si,lheading:Z_,table:Qc,paragraph:mt(ti).replace("hr",bs).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Qc).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ao).getRegex()},rm={...si,html:mt(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",ri).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:hs,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:mt(ti).replace("hr",bs).replace("heading",` *#{1,6} *[^
]`).replace("lheading",ou).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},sm=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,om=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,iu=/^( {2,}|\\)\n(?!\s*$)/,am=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,So=/[\p{P}\p{S}]/u,oi=/[\s\p{P}\p{S}]/u,lu=/[^\s\p{P}\p{S}]/u,im=mt(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,oi).getRegex(),cu=/(?!~)[\p{P}\p{S}]/u,lm=/(?!~)[\s\p{P}\p{S}]/u,cm=/(?:[^\s\p{P}\p{S}]|~)/u,um=mt(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",H_?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),uu=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,dm=mt(uu,"u").replace(/punct/g,So).getRegex(),pm=mt(uu,"u").replace(/punct/g,cu).getRegex(),du="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",fm=mt(du,"gu").replace(/notPunctSpace/g,lu).replace(/punctSpace/g,oi).replace(/punct/g,So).getRegex(),_m=mt(du,"gu").replace(/notPunctSpace/g,cm).replace(/punctSpace/g,lm).replace(/punct/g,cu).getRegex(),mm=mt("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,lu).replace(/punctSpace/g,oi).replace(/punct/g,So).getRegex(),gm=mt(/\\(punct)/,"gu").replace(/punct/g,So).getRegex(),hm=mt(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),bm=mt(ri).replace("(?:-->|$)","-->").getRegex(),ym=mt("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",bm).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),ko=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,vm=mt(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",ko).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),pu=mt(/^!?\[(label)\]\[(ref)\]/).replace("label",ko).replace("ref",ni).getRegex(),fu=mt(/^!?\[(ref)\](?:\[\])?/).replace("ref",ni).getRegex(),wm=mt("reflink|nolink(?!\\()","g").replace("reflink",pu).replace("nolink",fu).getRegex(),Xc=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,ai={_backpedal:hs,anyPunctuation:gm,autolink:hm,blockSkip:um,br:iu,code:om,del:hs,emStrongLDelim:dm,emStrongRDelimAst:fm,emStrongRDelimUnd:mm,escape:sm,link:vm,nolink:fu,punctuation:im,reflink:pu,reflinkSearch:wm,tag:ym,text:am,url:hs},km={...ai,link:mt(/^!?\[(label)\]\((.*?)\)/).replace("label",ko).getRegex(),reflink:mt(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",ko).getRegex()},Za={...ai,emStrongRDelimAst:_m,emStrongLDelim:pm,url:mt(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",Xc).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:mt(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",Xc).getRegex()},$m={...Za,br:mt(iu).replace("{2,}","*").getRegex(),text:mt(Za.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},vo={normal:si,gfm:nm,pedantic:rm},_s={normal:ai,gfm:Za,breaks:$m,pedantic:km},xm={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Jc=e=>xm[e];function Nn(e,t){if(t){if(Qt.escapeTest.test(e))return e.replace(Qt.escapeReplace,Jc)}else if(Qt.escapeTestNoEncode.test(e))return e.replace(Qt.escapeReplaceNoEncode,Jc);return e}function eu(e){try{e=encodeURI(e).replace(Qt.percentDecode,"%")}catch{return null}return e}function tu(e,t){let n=e.replace(Qt.findPipe,(o,a,i)=>{let c=!1,u=a;for(;--u>=0&&i[u]==="\\";)c=!c;return c?"|":" |"}),r=n.split(Qt.splitPipe),s=0;if(r[0].trim()||r.shift(),r.length>0&&!r.at(-1)?.trim()&&r.pop(),t)if(r.length>t)r.splice(t);else for(;r.length<t;)r.push("");for(;s<r.length;s++)r[s]=r[s].trim().replace(Qt.slashPipe,"|");return r}function ms(e,t,n){let r=e.length;if(r===0)return"";let s=0;for(;s<r;){let o=e.charAt(r-s-1);if(o===t&&!n)s++;else if(o!==t&&n)s++;else break}return e.slice(0,r-s)}function Am(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let r=0;r<e.length;r++)if(e[r]==="\\")r++;else if(e[r]===t[0])n++;else if(e[r]===t[1]&&(n--,n<0))return r;return n>0?-2:-1}function nu(e,t,n,r,s){let o=t.href,a=t.title||null,i=e[1].replace(s.other.outputLinkReplace,"$1");r.state.inLink=!0;let c={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:o,title:a,text:i,tokens:r.inlineTokens(i)};return r.state.inLink=!1,c}function Sm(e,t,n){let r=e.match(n.other.indentCodeCompensation);if(r===null)return t;let s=r[1];return t.split(`
`).map(o=>{let a=o.match(n.other.beginningSpace);if(a===null)return o;let[i]=a;return i.length>=s.length?o.slice(s.length):o}).join(`
`)}var $o=class{constructor(e){At(this,"options");At(this,"rules");At(this,"lexer");this.options=e||pr}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:ms(n,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let n=t[0],r=Sm(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:r}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){let r=ms(n,"#");(this.options.pedantic||!r||this.rules.other.endingSpaceChar.test(r))&&(n=r.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:ms(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let n=ms(t[0],`
`).split(`
`),r="",s="",o=[];for(;n.length>0;){let a=!1,i=[],c;for(c=0;c<n.length;c++)if(this.rules.other.blockquoteStart.test(n[c]))i.push(n[c]),a=!0;else if(!a)i.push(n[c]);else break;n=n.slice(c);let u=i.join(`
`),d=u.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");r=r?`${r}
${u}`:u,s=s?`${s}
${d}`:d;let _=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(d,o,!0),this.lexer.state.top=_,n.length===0)break;let h=o.at(-1);if(h?.type==="code")break;if(h?.type==="blockquote"){let w=h,$=w.raw+`
`+n.join(`
`),P=this.blockquote($);o[o.length-1]=P,r=r.substring(0,r.length-w.raw.length)+P.raw,s=s.substring(0,s.length-w.text.length)+P.text;break}else if(h?.type==="list"){let w=h,$=w.raw+`
`+n.join(`
`),P=this.list($);o[o.length-1]=P,r=r.substring(0,r.length-h.raw.length)+P.raw,s=s.substring(0,s.length-w.raw.length)+P.raw,n=$.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:r,tokens:o,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim(),r=n.length>1,s={type:"list",raw:"",ordered:r,start:r?+n.slice(0,-1):"",loose:!1,items:[]};n=r?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=r?n:"[*+-]");let o=this.rules.other.listItemRegex(n),a=!1;for(;e;){let c=!1,u="",d="";if(!(t=o.exec(e))||this.rules.block.hr.test(e))break;u=t[0],e=e.substring(u.length);let _=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,P=>" ".repeat(3*P.length)),h=e.split(`
`,1)[0],w=!_.trim(),$=0;if(this.options.pedantic?($=2,d=_.trimStart()):w?$=t[1].length+1:($=t[2].search(this.rules.other.nonSpaceChar),$=$>4?1:$,d=_.slice($),$+=t[1].length),w&&this.rules.other.blankLine.test(h)&&(u+=h+`
`,e=e.substring(h.length+1),c=!0),!c){let P=this.rules.other.nextBulletRegex($),z=this.rules.other.hrRegex($),Q=this.rules.other.fencesBeginRegex($),ae=this.rules.other.headingBeginRegex($),N=this.rules.other.htmlBeginRegex($);for(;e;){let M=e.split(`
`,1)[0],q;if(h=M,this.options.pedantic?(h=h.replace(this.rules.other.listReplaceNesting,"  "),q=h):q=h.replace(this.rules.other.tabCharGlobal,"    "),Q.test(h)||ae.test(h)||N.test(h)||P.test(h)||z.test(h))break;if(q.search(this.rules.other.nonSpaceChar)>=$||!h.trim())d+=`
`+q.slice($);else{if(w||_.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||Q.test(_)||ae.test(_)||z.test(_))break;d+=`
`+h}!w&&!h.trim()&&(w=!0),u+=M+`
`,e=e.substring(M.length+1),_=q.slice($)}}s.loose||(a?s.loose=!0:this.rules.other.doubleBlankLine.test(u)&&(a=!0)),s.items.push({type:"list_item",raw:u,task:!!this.options.gfm&&this.rules.other.listIsTask.test(d),loose:!1,text:d,tokens:[]}),s.raw+=u}let i=s.items.at(-1);if(i)i.raw=i.raw.trimEnd(),i.text=i.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let c of s.items){if(this.lexer.state.top=!1,c.tokens=this.lexer.blockTokens(c.text,[]),c.task){if(c.text=c.text.replace(this.rules.other.listReplaceTask,""),c.tokens[0]?.type==="text"||c.tokens[0]?.type==="paragraph"){c.tokens[0].raw=c.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),c.tokens[0].text=c.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let d=this.lexer.inlineQueue.length-1;d>=0;d--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[d].src)){this.lexer.inlineQueue[d].src=this.lexer.inlineQueue[d].src.replace(this.rules.other.listReplaceTask,"");break}}let u=this.rules.other.listTaskCheckbox.exec(c.raw);if(u){let d={type:"checkbox",raw:u[0]+" ",checked:u[0]!=="[ ]"};c.checked=d.checked,s.loose?c.tokens[0]&&["paragraph","text"].includes(c.tokens[0].type)&&"tokens"in c.tokens[0]&&c.tokens[0].tokens?(c.tokens[0].raw=d.raw+c.tokens[0].raw,c.tokens[0].text=d.raw+c.tokens[0].text,c.tokens[0].tokens.unshift(d)):c.tokens.unshift({type:"paragraph",raw:d.raw,text:d.raw,tokens:[d]}):c.tokens.unshift(d)}}if(!s.loose){let u=c.tokens.filter(_=>_.type==="space"),d=u.length>0&&u.some(_=>this.rules.other.anyLine.test(_.raw));s.loose=d}}if(s.loose)for(let c of s.items){c.loose=!0;for(let u of c.tokens)u.type==="text"&&(u.type="paragraph")}return s}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),r=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:r,title:s}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let n=tu(t[1]),r=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===r.length){for(let a of r)this.rules.other.tableAlignRight.test(a)?o.align.push("right"):this.rules.other.tableAlignCenter.test(a)?o.align.push("center"):this.rules.other.tableAlignLeft.test(a)?o.align.push("left"):o.align.push(null);for(let a=0;a<n.length;a++)o.header.push({text:n[a],tokens:this.lexer.inline(n[a]),header:!0,align:o.align[a]});for(let a of s)o.rows.push(tu(a,o.header.length).map((i,c)=>({text:i,tokens:this.lexer.inline(i),header:!1,align:o.align[c]})));return o}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;let o=ms(n.slice(0,-1),"\\");if((n.length-o.length)%2===0)return}else{let o=Am(t[2],"()");if(o===-2)return;if(o>-1){let a=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,a).trim(),t[3]=""}}let r=t[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(r);o&&(r=o[1],s=o[3])}else s=t[3]?t[3].slice(1,-1):"";return r=r.trim(),this.rules.other.startAngleBracket.test(r)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?r=r.slice(1):r=r.slice(1,-1)),nu(t,{href:r&&r.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let r=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[r.toLowerCase()];if(!s){let o=n[0].charAt(0);return{type:"text",raw:o,text:o}}return nu(n,s,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let r=this.rules.inline.emStrongLDelim.exec(e);if(!(!r||r[3]&&n.match(this.rules.other.unicodeAlphaNumeric))&&(!(r[1]||r[2])||!n||this.rules.inline.punctuation.exec(n))){let s=[...r[0]].length-1,o,a,i=s,c=0,u=r[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(u.lastIndex=0,t=t.slice(-1*e.length+s);(r=u.exec(t))!=null;){if(o=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!o)continue;if(a=[...o].length,r[3]||r[4]){i+=a;continue}else if((r[5]||r[6])&&s%3&&!((s+a)%3)){c+=a;continue}if(i-=a,i>0)continue;a=Math.min(a,a+i+c);let d=[...r[0]][0].length,_=e.slice(0,s+r.index+d+a);if(Math.min(s,a)%2){let w=_.slice(1,-1);return{type:"em",raw:_,text:w,tokens:this.lexer.inlineTokens(w)}}let h=_.slice(2,-2);return{type:"strong",raw:_,text:h,tokens:this.lexer.inlineTokens(h)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," "),r=this.rules.other.nonSpaceChar.test(n),s=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return r&&s&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let n,r;return t[2]==="@"?(n=t[1],r="mailto:"+n):(n=t[1],r=n),{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let n,r;if(t[2]==="@")n=t[0],r="mailto:"+n;else{let s;do s=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(s!==t[0]);n=t[0],t[1]==="www."?r="http://"+t[0]:r=t[0]}return{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},wn=class Qa{constructor(t){At(this,"tokens");At(this,"options");At(this,"state");At(this,"inlineQueue");At(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||pr,this.options.tokenizer=this.options.tokenizer||new $o,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let n={other:Qt,block:vo.normal,inline:_s.normal};this.options.pedantic?(n.block=vo.pedantic,n.inline=_s.pedantic):this.options.gfm&&(n.block=vo.gfm,this.options.breaks?n.inline=_s.breaks:n.inline=_s.gfm),this.tokenizer.rules=n}static get rules(){return{block:vo,inline:_s}}static lex(t,n){return new Qa(n).lex(t)}static lexInline(t,n){return new Qa(n).inlineTokens(t)}lex(t){t=t.replace(Qt.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){let r=this.inlineQueue[n];this.inlineTokens(r.src,r.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,n=[],r=!1){for(this.options.pedantic&&(t=t.replace(Qt.tabCharGlobal,"    ").replace(Qt.spaceLine,""));t;){let s;if(this.options.extensions?.block?.some(a=>(s=a.call({lexer:this},t,n))?(t=t.substring(s.raw.length),n.push(s),!0):!1))continue;if(s=this.tokenizer.space(t)){t=t.substring(s.raw.length);let a=n.at(-1);s.raw.length===1&&a!==void 0?a.raw+=`
`:n.push(s);continue}if(s=this.tokenizer.code(t)){t=t.substring(s.raw.length);let a=n.at(-1);a?.type==="paragraph"||a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.at(-1).src=a.text):n.push(s);continue}if(s=this.tokenizer.fences(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.heading(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.hr(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.blockquote(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.list(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.html(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.def(t)){t=t.substring(s.raw.length);let a=n.at(-1);a?.type==="paragraph"||a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.raw,this.inlineQueue.at(-1).src=a.text):this.tokens.links[s.tag]||(this.tokens.links[s.tag]={href:s.href,title:s.title},n.push(s));continue}if(s=this.tokenizer.table(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.lheading(t)){t=t.substring(s.raw.length),n.push(s);continue}let o=t;if(this.options.extensions?.startBlock){let a=1/0,i=t.slice(1),c;this.options.extensions.startBlock.forEach(u=>{c=u.call({lexer:this},i),typeof c=="number"&&c>=0&&(a=Math.min(a,c))}),a<1/0&&a>=0&&(o=t.substring(0,a+1))}if(this.state.top&&(s=this.tokenizer.paragraph(o))){let a=n.at(-1);r&&a?.type==="paragraph"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):n.push(s),r=o.length!==t.length,t=t.substring(s.raw.length);continue}if(s=this.tokenizer.text(t)){t=t.substring(s.raw.length);let a=n.at(-1);a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):n.push(s);continue}if(t){let a="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(a);break}else throw new Error(a)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){let r=t,s=null;if(this.tokens.links){let c=Object.keys(this.tokens.links);if(c.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(r))!=null;)c.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(r=r.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(r))!=null;)r=r.slice(0,s.index)+"++"+r.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(r))!=null;)o=s[2]?s[2].length:0,r=r.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+r.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);r=this.options.hooks?.emStrongMask?.call({lexer:this},r)??r;let a=!1,i="";for(;t;){a||(i=""),a=!1;let c;if(this.options.extensions?.inline?.some(d=>(c=d.call({lexer:this},t,n))?(t=t.substring(c.raw.length),n.push(c),!0):!1))continue;if(c=this.tokenizer.escape(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.tag(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.link(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(c.raw.length);let d=n.at(-1);c.type==="text"&&d?.type==="text"?(d.raw+=c.raw,d.text+=c.text):n.push(c);continue}if(c=this.tokenizer.emStrong(t,r,i)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.codespan(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.br(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.del(t)){t=t.substring(c.raw.length),n.push(c);continue}if(c=this.tokenizer.autolink(t)){t=t.substring(c.raw.length),n.push(c);continue}if(!this.state.inLink&&(c=this.tokenizer.url(t))){t=t.substring(c.raw.length),n.push(c);continue}let u=t;if(this.options.extensions?.startInline){let d=1/0,_=t.slice(1),h;this.options.extensions.startInline.forEach(w=>{h=w.call({lexer:this},_),typeof h=="number"&&h>=0&&(d=Math.min(d,h))}),d<1/0&&d>=0&&(u=t.substring(0,d+1))}if(c=this.tokenizer.inlineText(u)){t=t.substring(c.raw.length),c.raw.slice(-1)!=="_"&&(i=c.raw.slice(-1)),a=!0;let d=n.at(-1);d?.type==="text"?(d.raw+=c.raw,d.text+=c.text):n.push(c);continue}if(t){let d="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(d);break}else throw new Error(d)}}return n}},xo=class{constructor(e){At(this,"options");At(this,"parser");this.options=e||pr}space(e){return""}code({text:e,lang:t,escaped:n}){let r=(t||"").match(Qt.notSpaceStart)?.[0],s=e.replace(Qt.endingNewline,"")+`
`;return r?'<pre><code class="language-'+Nn(r)+'">'+(n?s:Nn(s,!0))+`</code></pre>
`:"<pre><code>"+(n?s:Nn(s,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}def(e){return""}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return`<hr>
`}list(e){let t=e.ordered,n=e.start,r="";for(let a=0;a<e.items.length;a++){let i=e.items[a];r+=this.listitem(i)}let s=t?"ol":"ul",o=t&&n!==1?' start="'+n+'"':"";return"<"+s+o+`>
`+r+"</"+s+`>
`}listitem(e){return`<li>${this.parser.parse(e.tokens)}</li>
`}checkbox({checked:e}){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox"> '}paragraph({tokens:e}){return`<p>${this.parser.parseInline(e)}</p>
`}table(e){let t="",n="";for(let s=0;s<e.header.length;s++)n+=this.tablecell(e.header[s]);t+=this.tablerow({text:n});let r="";for(let s=0;s<e.rows.length;s++){let o=e.rows[s];n="";for(let a=0;a<o.length;a++)n+=this.tablecell(o[a]);r+=this.tablerow({text:n})}return r&&(r=`<tbody>${r}</tbody>`),`<table>
<thead>
`+t+`</thead>
`+r+`</table>
`}tablerow({text:e}){return`<tr>
${e}</tr>
`}tablecell(e){let t=this.parser.parseInline(e.tokens),n=e.header?"th":"td";return(e.align?`<${n} align="${e.align}">`:`<${n}>`)+t+`</${n}>
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${Nn(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){let r=this.parser.parseInline(n),s=eu(e);if(s===null)return r;e=s;let o='<a href="'+e+'"';return t&&(o+=' title="'+Nn(t)+'"'),o+=">"+r+"</a>",o}image({href:e,title:t,text:n,tokens:r}){r&&(n=this.parser.parseInline(r,this.parser.textRenderer));let s=eu(e);if(s===null)return Nn(n);e=s;let o=`<img src="${e}" alt="${n}"`;return t&&(o+=` title="${Nn(t)}"`),o+=">",o}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:Nn(e.text)}},ii=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},kn=class Xa{constructor(t){At(this,"options");At(this,"renderer");At(this,"textRenderer");this.options=t||pr,this.options.renderer=this.options.renderer||new xo,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new ii}static parse(t,n){return new Xa(n).parse(t)}static parseInline(t,n){return new Xa(n).parseInline(t)}parse(t){let n="";for(let r=0;r<t.length;r++){let s=t[r];if(this.options.extensions?.renderers?.[s.type]){let a=s,i=this.options.extensions.renderers[a.type].call({parser:this},a);if(i!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(a.type)){n+=i||"";continue}}let o=s;switch(o.type){case"space":{n+=this.renderer.space(o);break}case"hr":{n+=this.renderer.hr(o);break}case"heading":{n+=this.renderer.heading(o);break}case"code":{n+=this.renderer.code(o);break}case"table":{n+=this.renderer.table(o);break}case"blockquote":{n+=this.renderer.blockquote(o);break}case"list":{n+=this.renderer.list(o);break}case"checkbox":{n+=this.renderer.checkbox(o);break}case"html":{n+=this.renderer.html(o);break}case"def":{n+=this.renderer.def(o);break}case"paragraph":{n+=this.renderer.paragraph(o);break}case"text":{n+=this.renderer.text(o);break}default:{let a='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return n}parseInline(t,n=this.renderer){let r="";for(let s=0;s<t.length;s++){let o=t[s];if(this.options.extensions?.renderers?.[o.type]){let i=this.options.extensions.renderers[o.type].call({parser:this},o);if(i!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){r+=i||"";continue}}let a=o;switch(a.type){case"escape":{r+=n.text(a);break}case"html":{r+=n.html(a);break}case"link":{r+=n.link(a);break}case"image":{r+=n.image(a);break}case"checkbox":{r+=n.checkbox(a);break}case"strong":{r+=n.strong(a);break}case"em":{r+=n.em(a);break}case"codespan":{r+=n.codespan(a);break}case"br":{r+=n.br(a);break}case"del":{r+=n.del(a);break}case"text":{r+=n.text(a);break}default:{let i='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return r}},wo,gs=(wo=class{constructor(e){At(this,"options");At(this,"block");this.options=e||pr}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?wn.lex:wn.lexInline}provideParser(){return this.block?kn.parse:kn.parseInline}},At(wo,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),At(wo,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),wo),Em=class{constructor(...e){At(this,"defaults",Ja());At(this,"options",this.setOptions);At(this,"parse",this.parseMarkdown(!0));At(this,"parseInline",this.parseMarkdown(!1));At(this,"Parser",kn);At(this,"Renderer",xo);At(this,"TextRenderer",ii);At(this,"Lexer",wn);At(this,"Tokenizer",$o);At(this,"Hooks",gs);this.use(...e)}walkTokens(e,t){let n=[];for(let r of e)switch(n=n.concat(t.call(this,r)),r.type){case"table":{let s=r;for(let o of s.header)n=n.concat(this.walkTokens(o.tokens,t));for(let o of s.rows)for(let a of o)n=n.concat(this.walkTokens(a.tokens,t));break}case"list":{let s=r;n=n.concat(this.walkTokens(s.items,t));break}default:{let s=r;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let a=s[o].flat(1/0);n=n.concat(this.walkTokens(a,t))}):s.tokens&&(n=n.concat(this.walkTokens(s.tokens,t)))}}return n}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{let r={...n};if(r.async=this.defaults.async||r.async||!1,n.extensions&&(n.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=t.renderers[s.name];o?t.renderers[s.name]=function(...a){let i=s.renderer.apply(this,a);return i===!1&&(i=o.apply(this,a)),i}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=t[s.level];o?o.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),r.extensions=t),n.renderer){let s=this.defaults.renderer||new xo(this.defaults);for(let o in n.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let a=o,i=n.renderer[a],c=s[a];s[a]=(...u)=>{let d=i.apply(s,u);return d===!1&&(d=c.apply(s,u)),d||""}}r.renderer=s}if(n.tokenizer){let s=this.defaults.tokenizer||new $o(this.defaults);for(let o in n.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let a=o,i=n.tokenizer[a],c=s[a];s[a]=(...u)=>{let d=i.apply(s,u);return d===!1&&(d=c.apply(s,u)),d}}r.tokenizer=s}if(n.hooks){let s=this.defaults.hooks||new gs;for(let o in n.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let a=o,i=n.hooks[a],c=s[a];gs.passThroughHooks.has(o)?s[a]=u=>{if(this.defaults.async&&gs.passThroughHooksRespectAsync.has(o))return(async()=>{let _=await i.call(s,u);return c.call(s,_)})();let d=i.call(s,u);return c.call(s,d)}:s[a]=(...u)=>{if(this.defaults.async)return(async()=>{let _=await i.apply(s,u);return _===!1&&(_=await c.apply(s,u)),_})();let d=i.apply(s,u);return d===!1&&(d=c.apply(s,u)),d}}r.hooks=s}if(n.walkTokens){let s=this.defaults.walkTokens,o=n.walkTokens;r.walkTokens=function(a){let i=[];return i.push(o.call(this,a)),s&&(i=i.concat(s.call(this,a))),i}}this.defaults={...this.defaults,...r}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return wn.lex(e,t??this.defaults)}parser(e,t){return kn.parse(e,t??this.defaults)}parseMarkdown(e){return(t,n)=>{let r={...n},s={...this.defaults,...r},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&r.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=e),s.async)return(async()=>{let a=s.hooks?await s.hooks.preprocess(t):t,i=await(s.hooks?await s.hooks.provideLexer():e?wn.lex:wn.lexInline)(a,s),c=s.hooks?await s.hooks.processAllTokens(i):i;s.walkTokens&&await Promise.all(this.walkTokens(c,s.walkTokens));let u=await(s.hooks?await s.hooks.provideParser():e?kn.parse:kn.parseInline)(c,s);return s.hooks?await s.hooks.postprocess(u):u})().catch(o);try{s.hooks&&(t=s.hooks.preprocess(t));let a=(s.hooks?s.hooks.provideLexer():e?wn.lex:wn.lexInline)(t,s);s.hooks&&(a=s.hooks.processAllTokens(a)),s.walkTokens&&this.walkTokens(a,s.walkTokens);let i=(s.hooks?s.hooks.provideParser():e?kn.parse:kn.parseInline)(a,s);return s.hooks&&(i=s.hooks.postprocess(i)),i}catch(a){return o(a)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let r="<p>An error occurred:</p><pre>"+Nn(n.message+"",!0)+"</pre>";return t?Promise.resolve(r):r}if(t)return Promise.reject(n);throw n}}},dr=new Em;function wt(e,t){return dr.parse(e,t)}wt.options=wt.setOptions=function(e){return dr.setOptions(e),wt.defaults=dr.defaults,ru(wt.defaults),wt};wt.getDefaults=Ja;wt.defaults=pr;wt.use=function(...e){return dr.use(...e),wt.defaults=dr.defaults,ru(wt.defaults),wt};wt.walkTokens=function(e,t){return dr.walkTokens(e,t)};wt.parseInline=dr.parseInline;wt.Parser=kn;wt.parser=kn.parse;wt.Renderer=xo;wt.TextRenderer=ii;wt.Lexer=wn;wt.lexer=wn.lex;wt.Tokenizer=$o;wt.Hooks=gs;wt.parse=wt;var Wv=wt.options,zv=wt.setOptions,Hv=wt.use,Gv=wt.walkTokens,Vv=wt.parseInline;var Kv=kn.parse,Yv=wn.lex;function Gn(e){let t=wt.parse(e),n=Yc.sanitize(t);return Zc(n)}function qn(e,t){return l`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function Mr(e){return e.loading?l`<div class="prompt-block__status">불러오는 중…</div>`:e.error?l`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function Eo(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=r=>String(r).padStart(2,"0");return`${t.getFullYear()}-${n(t.getMonth()+1)}-${n(t.getDate())} ${n(t.getHours())}:${n(t.getMinutes())}`}var mu={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",Agent:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},Tm={command_execution:"\uBA85\uB839 \uC2E4\uD589",file_change:"\uD30C\uC77C \uBCC0\uACBD",mcp_call:"MCP \uD638\uCD9C",web_search:"\uC6F9 \uAC80\uC0C9",plan:"\uACC4\uD68D"},Cm=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,Rm=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function Cn(e){return!!e&&typeof e=="object"}function li(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function ci(e,t){let n=li(e),r=li(t),s=new Map;for(let i of n)s.set(i,(s.get(i)||0)+1);let o=0;for(let i of r){let c=s.get(i)||0;c>0?s.set(i,c-1):o+=1}let a=0;for(let i of s.values())a+=i;return{added:o,removed:a}}function gu(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(s=>Cn(s)&&typeof s.text=="string"?s.text:"").join(""):Cn(e)&&typeof e.text=="string"&&(t=e.text);let r=(String(t).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return r.length>120?`${r.slice(0,117)}\u2026`:r}function Om(e){let t=String(e.name||""),n=e.input||{},r={kind:"tool",tool:t,icon:mu[t]||"\u{1F527}",input:n,expandable:!0};if((t==="Read"||t==="Write")&&(r.path=String(n.file_path||n.path||"")),t==="Write"&&(r.added=li(n.content).length),t==="Edit"){r.path=String(n.file_path||n.path||"");let{added:s,removed:o}=ci(n.old_string,n.new_string);r.added=s,r.removed=o}if(t==="MultiEdit"){r.path=String(n.file_path||n.path||"");let s=0,o=0,a=Array.isArray(n.edits)?n.edits:[];for(let i of a){let c=ci(Cn(i)?i.old_string:"",Cn(i)?i.new_string:"");s+=c.added,o+=c.removed}r.added=s,r.removed=o}return t==="Bash"&&(r.command=String(n.command||"")),(t==="Grep"||t==="Glob")&&(r.command=String(n.pattern||n.query||"")),t==="Agent"&&(typeof e.id=="string"&&e.id.length>0&&(r.launch_id=e.id),typeof n.description=="string"&&(r.command=n.description)),r}function ui(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}function di(e){let t=e.split(/\r?\n/).find(r=>r.trim().length>0)||"",n=Cm.exec(t);return n?{kind:"gate",gate:n[2]==="implementation"?"impl":n[2],reviewer:n[3],verdict:n[4],time:n[5]?n[5].trim():void 0,text:t.trim()}:Rm.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function Lm(e,t){if(e.subtype==="init"){let n=typeof e.model=="string"?e.model:"";return t.progress=null,[{kind:"thinking",text:n?`\uC138\uC158 \uC2DC\uC791 \xB7 ${n}`:"\uC138\uC158 \uC2DC\uC791"}]}if(e.subtype==="thinking_tokens"){let r=`\uC0DD\uAC01 \uC911\u2026 ${typeof e.estimated_tokens=="number"&&Number.isFinite(e.estimated_tokens)?Math.max(0,Math.round(e.estimated_tokens)):0} \uD1A0\uD070`;return t.progress?(t.progress.text=r,[]):(t.progress={kind:"thinking",text:r},[t.progress])}return[]}function Im(e,t){let n=typeof e.parent_tool_use_id=="string"&&e.parent_tool_use_id.length>0?e.parent_tool_use_id:null;if(e.type==="assistant"){let r=e.message,s=r&&Array.isArray(r.content)?r.content:[],o=[];for(let a of s)if(Cn(a)){if(a.type==="text"&&typeof a.text=="string")o.push(di(a.text));else if(a.type==="thinking"){let i=ui(a.thinking);i&&o.push(i)}else if(a.type==="tool_use"){let i=Om(a);typeof a.id=="string"&&t.set(a.id,i),o.push(i)}}return n?_u(o,n):o}if(e.type==="user"){let r=e.message,s=r&&Array.isArray(r.content)?r.content:[];for(let o of s)if(Cn(o)&&o.type==="tool_result"){let a=t.get(String(o.tool_use_id));if(a){let i=gu(o.content);a.result=i,a.output=typeof o.content=="string"?o.content:i,o.is_error===!0&&(a.is_error=!0)}}return[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success",s={kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""};return n?_u([s],n):[s]}return[]}function _u(e,t){for(let n of e)n.parent_tool_use_id=t;return e}function Pm(e){let t=typeof e.command=="string"?e.command:"",n=gu(e.aggregated_output===void 0?e.output:e.aggregated_output),s=[typeof e.exit_code=="number"&&Number.isFinite(e.exit_code)?`exit ${e.exit_code}`:typeof e.status=="string"&&e.status.length>0?e.status:"",n].filter(a=>a.length>0).join(" \xB7 "),o={kind:"tool",tool:"shell",icon:mu.Bash,command:t,input:{command:t},expandable:!0};return s.length>0&&(o.result=s),typeof e.aggregated_output=="string"&&(o.output=e.aggregated_output),o}function Mm(e){if(e.type==="item.completed"&&Cn(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[di(t.text)];if(t.type==="reasoning"){let n=ui(t.text);return n?[n]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:t.type==="command_execution"?[Pm(t)]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function Dm(e){if(e.schema!=="codex-delegation-monitor-v1"||!Cn(e.event))return[];let t=e.event;if(t.type==="session.started"||t.type==="turn.started")return[];if((t.type==="item.started"||t.type==="item.completed")&&Cn(t.item)){let n=t.item;if(typeof n.id!="string"||n.id.length===0)return[];if(t.type==="item.completed"&&n.kind==="agent_message"&&typeof n.text=="string"&&n.text.trim().length>0)return[di(n.text)];if(t.type==="item.completed"&&n.kind==="reasoning"){let i=ui(n.text);return i?[i]:[]}if(n.kind!=="activity"||typeof n.activity!="string")return[];let r=Tm[n.activity];if(!r)return[];let s="\uC2DC\uC791",o="\u2026",a={kind:"tool",tool:"",icon:o,expandable:!1};if(t.type==="item.completed"){if(n.status==="completed")s="\uC644\uB8CC",o="\u2713";else if(n.status==="failed")s="\uC2E4\uD328",o="\u2717";else return[];a.result=""}return a.tool=`${r} \xB7 ${s}`,a.icon=o,[a]}return t.type==="turn.completed"&&t.status==="completed"?[{kind:"result",success:!0,text:"DONE"}]:t.type==="turn.failed"&&(t.status==="failed"||t.status==="interrupted")&&typeof t.error_code=="string"&&t.error_code.length>0?[{kind:"error",text:t.error_code}]:[]}function Nm(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function qm(e){let t=e;if(typeof e=="string"){let n=e.trim();if(n.length===0)return null;try{t=JSON.parse(n)}catch{return null}}return Cn(t)?t:null}function hu(e={}){let t=e.skip_delegated===!0,n=new Map,r={progress:null};return{push(s){let o=qm(s);if(!o)return[];if(t&&typeof o.parent_tool_use_id=="string"&&o.parent_tool_use_id.length>0)return[];if(o.type==="system"&&o.schema!=="codex-delegation-monitor-v1")return Lm(o,r);let a=o.schema==="codex-delegation-monitor-v1"?Dm(o):Nm(o)?Mm(o):Im(o,n);return a.length>0&&(r.progress=null),a}}}function pi(e){let t=[],n=hu(),r=Array.isArray(e)?e:[];for(let s of r)for(let o of n.push(s))t.push(o);return t}var Fm=5,jm=10,Bm=/Task\s+#(\d+)/,Um=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,Wm=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function To(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function zm(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function Hm(e){for(let t=e.length-1;t>=0;t-=1){let n=e[t];if(n.kind==="phase"||n.kind==="gate")return n.text||null}return null}function Gm(e){let t=new Map,n=0;for(let s of e){if(s.kind!=="tool")continue;n+=1;let o=s.input||{};if(s.tool==="TaskCreate"){let c=Bm.exec(s.output||s.result||""),u=String(o.activeForm||o.subject||"").trim();if(!c||u.length===0)continue;t.set(c[1],{label:u,active:o.status==="in_progress"?n:0});continue}if(s.tool!=="TaskUpdate")continue;let a=t.get(String(o.taskId??""));if(!a)continue;let i=o.activeForm||o.subject;typeof i=="string"&&i.trim().length>0&&(a.label=i.trim()),typeof o.status=="string"&&(a.active=o.status==="in_progress"?n:0)}let r=null;for(let s of t.values())s.active>0&&(!r||s.active>r.active)&&(r=s);return r?r.label:null}function Vm(e){if(e.tool==="Bash"){let t=e.command||"";return Um.test(t)?"~ PR/\uAC8C\uC2DC \uC911":Wm.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function Km(e){let t=e.filter(s=>s.kind==="tool").slice(-jm),n=new Map;t.forEach((s,o)=>{let a=Vm(s);if(!a)return;let i=n.get(a)||{count:0,last:-1};i.count+=1,i.last=o,n.set(a,i)});let r=null;for(let[s,o]of n)(!r||o.count>r.count||o.count===r.count&&o.last>r.last)&&(r={label:s,count:o.count,last:o.last});return r?r.label:null}function Ym(e){let t=Hm(e);if(t)return{text:t,guess:!1};let n=Gm(e);if(n)return{text:n,guess:!1};let r=Km(e);return r?{text:r,guess:!0}:null}function Zm(e,t){if(typeof e!="number")return"";let n=Math.max(0,Math.floor((t-e)/1e3));return n<60?`${n}\uCD08 \uC804`:an(e,t)}function Dr(e,t={}){let{transport:n,sessionLogStore:r,onClose:s}=t,o=null,a=null,i=null,c=null,u=!1,d={},_=!0,h=new Set,w=new Set,$=null,P=null,z=!1,Q=!1,ae=!1,N=null,M=null;function q(){z=!1,Q=!1,ae=!1,N=null,M=null}async function G(K){if(n){Q=!0,ae=!1,we();try{let X=await Promise.resolve(n("get-attempt-prompt",{attempt_id:K,...c?{root_dir:c}:{}}));if(o!==K)return;!X||typeof X!="object"||Array.isArray(X)?ae=!0:(N=X,M=K)}catch{o===K&&(ae=!0)}finally{o===K&&(Q=!1,we())}}}function E(){if(z=!z,z&&o&&M!==o){G(o);return}we()}function W(){if(!z)return"";let K=Mr({loading:Q,error:ae});if(K)return l`<div class="sv__prompt" data-seam="attempt-prompt">
        ${K}
      </div>`;if(!N)return"";if(N.missing)return l`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let X=Eo(N.recorded_at);return l`<div class="sv__prompt" data-seam="attempt-prompt">
      ${X?l`<div class="prompt-block__meta">${X} 발송</div>`:""}
      ${typeof N.task_prompt=="string"?qn("\uACFC\uC5C5 (user)",N.task_prompt):""}
      ${typeof N.system_prompt=="string"?qn("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",N.system_prompt):""}
    </div>`}function B(){if(!i||!r)return[];let K=r.get(i);return pi(K?K.lines:[])}function ve(){if(!i||!r)return null;let K=r.get(i),X=K?K.last_event_at:null;return typeof X=="number"?X:null}function fe(){return d.status==="running"}function ge(){if(fe()&&o){P||(P=setInterval(()=>we(),1e3));return}V()}function V(){P&&(clearInterval(P),P=null)}function Te(K){let X=[],Me=0;for(;Me<K.length;){let{idx:et,line:Ve}=K[Me];if(Ve.kind==="tool"){let De=Me;for(;De<K.length&&K[De].line.kind==="tool"&&K[De].line.tool===Ve.tool;)De+=1;if(De-Me>=Fm&&!w.has(et)){X.push({kind:"group",idx:et,tool:Ve.tool||"",lines:K.slice(Me,De)}),Me=De;continue}}X.push({kind:"line",idx:et,line:Ve}),Me+=1}return X}function Re(K){let X=[],Me=new Map;for(let De=0;De<K.length;De+=1){let Ke=K[De],st=Ke.parent_tool_use_id;if(typeof st=="string"&&st.length>0){let Ne=Me.get(st);Ne||(Ne={kind:"subagent",idx:De,launch_id:st,agent_type:null,header:null,lines:[]},Me.set(st,Ne),X.push(Ne)),Ne.lines.push({idx:De,line:Ke});continue}if(Ke.kind==="tool"&&Ke.tool==="Agent"&&typeof Ke.launch_id=="string"&&Ke.launch_id.length>0){let Ne=ie(Ke),Be=Me.get(Ke.launch_id);if(Be){Be.header={idx:De,line:Ke},Be.agent_type=Ne;continue}let dt={kind:"subagent",idx:De,launch_id:Ke.launch_id,agent_type:Ne,header:{idx:De,line:Ke},lines:[]};Me.set(Ke.launch_id,dt),X.push(dt);continue}X.push({kind:"entry",idx:De,line:Ke})}let et=[],Ve=0;for(;Ve<X.length;){if(X[Ve].kind!=="entry"){et.push(X[Ve]),Ve+=1;continue}let De=Ve;for(;De<X.length&&X[De].kind==="entry";)De+=1;et.push(...Te(X.slice(Ve,De))),Ve=De}return et}function ie(K){let X=K.input;return X&&typeof X.subagent_type=="string"?X.subagent_type:null}function de(K){for(let X=K.length-1;X>=0;X-=1){let Me=K[X];if(Me.kind==="result"||Me.kind==="error")return null;if(Me.kind==="tool"&&!Object.hasOwn(Me,"result"))return Me}return null}function Ae(K){for(let X=K.length-1;X>=0;X-=1)if(K[X].kind==="thinking")return K[X];return null}function H(K,X){if(X.kind==="gate")return l`<div class="sv__gate">${X.text}</div>`;if(X.kind==="phase")return l`<div class="sv__phase">${X.text}</div>`;if(X.kind==="result")return l`<div
        class="sv__result${X.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${X.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${Gn(X.text||(X.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(X.kind==="thinking"){let Me=h.has(K);return l`<div
        class="sv__think${Me?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>it(K)}
      >
        <span class="sv__think-line">💭 ${To(X.text)}</span>
        ${Me?l`<pre class="sv__think-expand">${X.text}</pre>`:""}
      </div>`}if(X.kind==="error")return l`<div class="sv__error">⛔ ${X.text}</div>`;if(X.kind==="blocker")return l`<div class="sv__error">⛔ ${X.text}</div>`;if(X.kind==="tool"){let Me=h.has(K),et=X.tool==="Bash"?zm(X.command):0,Ve=X.tool==="Bash"?et>1?To(X.command):X.command:X.path||X.command||"";return l`<div
        class="sv__tool${Me?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>it(K)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${X.icon}</span>
          <span class="sv__tool-name">${X.tool}</span>
          ${Ve?l`<span class="sv__tool-detail">${Ve}</span>`:""}
          ${et>1?l`<span class="sv__tool-more">⋯ ${et}줄</span>`:""}
          ${typeof X.added=="number"?l`<span class="sv__diff-add">+${X.added}</span>`:""}
          ${typeof X.removed=="number"?l`<span class="sv__diff-del">−${X.removed}</span>`:""}
          ${X.result?l`<span class="sv__tool-ok">→ ${X.result}</span>`:""}
        </span>
        ${Me?l`<pre class="sv__tool-expand">${te(X)}</pre>`:""}
      </div>`}return l`<div class="sv__as">${Gn(X.text||"")}</div>`}function te(K){let X=[];if(K.tool==="Bash"&&typeof K.command=="string"&&K.command.length>0)X.push(K.command);else if(K.input!==void 0)try{X.push(`input: ${JSON.stringify(K.input,null,2)}`)}catch{}return typeof K.output=="string"&&K.output.length>0&&X.push(`output:
${K.output}`),X.join(`

`)}function ce(){if(!o)return l``;let K=B(),X=(a?[d.agent_type,d.model,d.effort]:[d.runner,d.model,d.effort]).filter(Boolean).join(" \xB7 "),Me=d.session_id||"",et=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${_?"ON":"OFF"}`,Ve=fe(),De=Ve?Zm(ve(),Date.now()):"",Ke=Ve?de(K):null,st=Ve?Ae(K):null,Ne=Ym(K);return l`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id">${a?d.role||"":o}</span>
        ${Ne?l`<span
              class="sv__stage${Ne.guess?" sv__stage--guess":""}"
              title=${Ne.text}
              >${Ne.text}</span
            >`:""}
        ${Ve?l`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${De?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${De}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${De?l`<span class="sv__live-ago">${De}</span>`:""}</span
            >`:""}
        ${Me?l`<button
              type="button"
              class="sv__session"
              title=${Me}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${Me}`}
              @click=${()=>me(Me)}
            >
              ⧉ ${Me.slice(0,8)}
            </button>`:""}
        ${X?l`<span class="sv__meta">${X}</span>`:""}
        ${d.worktree?l`<span class="sv__wt" title=${d.worktree}
              >${d.worktree}</span
            >`:""}
        ${a||u?"":l`<button
              type="button"
              class="sv__prompt-toggle${z?" sv__prompt-toggle--on":""}"
              data-seam="attempt-prompt-toggle"
              aria-pressed=${z?"true":"false"}
              aria-label="발송 프롬프트 보기"
              title="이 세션에 실제로 보낸 시스템·과업 프롬프트"
              @click=${E}
            >
              ✉ 프롬프트
            </button>`}
        <button
          type="button"
          class="sv__follow${_?" sv__follow--on":""}"
          aria-pressed=${_?"true":"false"}
          aria-label=${et}
          @click=${I}
        >
          <span class="sv__follow-full">⇣ ${et}</span>
          <span class="sv__follow-short">⇣ ${_?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>qe()}
        >
          ✕
        </button>
      </div>
      ${a||u?"":W()}
      <div class="sv__body">
        ${K.length===0?l`<div class="sv__empty">세션 로그 없음</div>`:Re(K).map(Be=>Be.kind==="subagent"?be(Be):Be.kind==="group"?ke(Be):H(Be.idx,Be.line))}
      </div>
      ${Ke||st?l`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${Ke?l`<span class="sv__now-icon">${Ke.icon}</span>
                  <span class="sv__now-name">${Ke.tool}</span>
                  <span class="sv__now-detail"
                    >${Ke.tool==="Bash"?To(Ke.command):Ke.path||Ke.command||""}</span
                  >`:""}
            ${st?l`<span class="sv__now-think"
                  >💭 ${To(st.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function ke(K){return l`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>je(K.idx)}
    >
      <span class="sv__group-icon">${K.lines[0].line.icon}</span>
      <span class="sv__group-name">${K.tool}</span>
      <span class="sv__group-count">${K.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function be(K){let X=w.has(K.idx),Me=K.header?K.header.line:null,et=Me?Me.is_error===!0?"\u2717":typeof Me.result=="string"?"\u2713":"\u27F3":"",Ve=Me&&Me.command?Me.command:"";return l`<div class="sv__sub${X?" sv__sub--open":""}">
      <div
        class="sv__sub-head"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>je(K.idx)}
      >
        <span class="sv__sub-icon" aria-hidden="true">🤖</span>
        <span class="sv__sub-name">${K.agent_type||"subagent"}</span>
        ${Ve?l`<span class="sv__sub-detail">${Ve}</span>`:""}
        <span class="sv__sub-count">${K.lines.length}줄</span>
        ${et?l`<span class="sv__sub-state">${et}</span>`:""}
        ${X?"":l`<span class="sv__sub-caret" aria-hidden="true">▸</span>`}
      </div>
      ${X?l`<div class="sv__sub-body">
            ${Te(K.lines).map(De=>De.kind==="group"?ke(De):H(De.idx,De.line))}
          </div>`:""}
    </div>`}function je(K){w.add(K),we()}function we(){Qe(ce(),e),ge(),_&&Je()}function Je(){let K=e.querySelector(".sv__body");K&&(K.scrollTop=K.scrollHeight)}function it(K){h.has(K)?h.delete(K):h.add(K),we()}function I(){_=!_,we()}function me(K){ln(K).then(X=>{X?ue("\uBCF5\uC0AC\uB428","success",1200):ue("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function $e(K){!o||!K||(d={...d,...K},we())}function Se(K){let X=K.target;if(!X||!X.classList||!X.classList.contains("sv__body"))return;!(X.scrollHeight-X.scrollTop-X.clientHeight<=4)&&_&&(_=!1,we())}e.addEventListener("scroll",Se,!0);function Ge(K){let X=K&&K.attempt_id;if(!X)return;let Me=i;o=X,a=typeof K.launch_id=="string"&&K.launch_id.length>0?K.launch_id:null,i=a?`session-log:${o}:${a}`:`session-log:${o}`,n&&Me&&Me!==i&&Promise.resolve(n("unsubscribe-session-log",{id:Me})).catch(()=>{}),c=typeof K.root_dir=="string"&&K.root_dir.length>0?K.root_dir:null,d=K.meta||{},u=K.hide_prompt===!0,_=!0,h.clear(),w.clear(),q(),!$&&r&&($=r.subscribe(we)),n&&Promise.resolve(n("subscribe-session-log",{id:i,attempt_id:o,...a?{launch_id:a}:{},...c?{root_dir:c}:{}})).catch(()=>{}),we()}function qe(){let K=i;o=null,a=null,i=null,c=null,u=!1,h.clear(),w.clear(),q(),V(),n&&K&&Promise.resolve(n("unsubscribe-session-log",{id:K})).catch(()=>{}),Qe(l``,e),s&&s()}return{open:Ge,updateMeta:$e,close:qe,isOpen(){return o!==null},destroy(){V(),$&&($(),$=null),e.removeEventListener("scroll",Se,!0),o=null,a=null,i=null,c=null,u=!1,Qe(l``,e)}}}function Co(e){let t=e&&typeof e=="object"?e:{},n=t.metadata&&typeof t.metadata=="object"?t.metadata:{},r=fi(t.spec_id),s=fi(n.spec_id);return r?{path:r,source:"native",conflict:s.length>0&&s!==r}:s?{path:s,source:"metadata",conflict:!1}:{path:"",source:"none",conflict:!1}}function fi(e){return typeof e=="string"?e.trim():""}function bu(e){let t=Co(e);if(t.path)return t;let n=fi(Qm(e).spec_path);return n?{path:n,source:"draft",conflict:!1}:t}function Qm(e){let t=e&&typeof e=="object"?e:{};return t.metadata&&typeof t.metadata=="object"?t.metadata:{}}function Xm(e){return["plan_review","plan_approval","plan_check"].some(t=>{let n=e[t];return typeof n=="string"&&n.trim().length>0})}function Jm(e){let t=e&&e.metadata||{},n=bu(e),r=[];return n.path&&r.push({kind:"spec",path:n.path,missing_state:n.source==="draft"?"spec_draft":null}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&r.push({kind:"plan",path:t.plan_path.trim(),missing_state:Xm(t)?null:"plan_pending"}),r}function yu(e,t){let n=Jm(e);return l`
    <div class="detail-section-label">Artifacts</div>
    ${n.length===0?l`<div class="detail-empty">산출물 없음</div>`:l`
          ${n.map(r=>l`<div class="detail-art">
                <span class="detail-art__ic" aria-hidden="true">▤</span>
                <button
                  type="button"
                  class="detail-art__path"
                  title=${`${r.path} \xB7 \uD074\uB9AD\uD558\uBA74 \uBCF5\uC0AC`}
                  @click=${s=>t.onCopyPath(s,r.path)}
                >
                  ${r.path}
                </button>
                ${r.missing_state==="spec_draft"?l`<span class="detail-art__badge">draft</span>`:null}
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
  `}var eg="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",tg=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,ng=/^\*\*결론\*\* — (.+)$/;function Ro(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==eg)return null;let n=tg.exec(t[1]||"");if(!n)return null;let r=n[1].split(" ")[0],s=n[2],o=n[3],a=2;for(;a<t.length&&t[a].trim().length===0;)a+=1;let i=a<t.length?ng.exec(t[a]):null,c=i?i[1].replace(/\s+/g," ").trim():"",u=i?a+1:a;return{lane:r,identifier:s,timestamp:o,conclusion:c,body:t.slice(u).join(`
`).trim()}}var vu=20;function wu(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let n=String(t.getMonth()+1).padStart(2,"0"),r=String(t.getDate()).padStart(2,"0"),s=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0");return`${n}-${r} ${s}:${o}`}function rg(e){return e.length>vu?`${e.slice(0,vu)}\u2026`:e}function sg(e,t,n,r){let s=`${t.lane} ${rg(t.identifier)}`;return l`<div class="detail-report">
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
        <span class="detail-report__time">${wu(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${r&&t.body.length>0?l`<div class="detail-report__body">
          ${Gn(t.body)}
        </div>`:""}
  </div>`}function og(e){return l`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${wu(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${Gn(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function ku(e,t={},n={}){let r=Array.isArray(e)?e.filter(Boolean):[],s=n.expanded||new Set,o=typeof n.draft=="string"?n.draft:"",a=n.sending===!0,i=r.slice().sort((c,u)=>String(u.created_at||"").localeCompare(String(c.created_at||"")));return l`
    <div class="detail-section-label">댓글 (${r.length})</div>
    ${n.error?l`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:i.length===0?l`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:l`<div class="detail-comments" data-seam="comments">
            ${i.map(c=>{let u=Ro(typeof c.text=="string"?c.text:"");return u?sg(c,u,t,s.has(c.id)):og(c)})}
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
  `}var{I:Rw}=Bl;var $u=e=>e.strings===void 0;var ag={},xu=(e,t=ag)=>e._$AH=t;var fr=yo(class extends Pr{constructor(e){if(super(e),e.type!==Dn.PROPERTY&&e.type!==Dn.ATTRIBUTE&&e.type!==Dn.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!$u(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===pn||t===Mt)return t;let n=e.element,r=e.name;if(e.type===Dn.PROPERTY){if(t===n[r])return pn}else if(e.type===Dn.BOOLEAN_ATTRIBUTE){if(!!t===n.hasAttribute(r))return pn}else if(e.type===Dn.ATTRIBUTE&&n.getAttribute(r)===t+"")return pn;return xu(e),t}});var Oo=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"],mi=[...Oo.filter(e=>e!=="impl_dispatch"),"quick_fix_impl_model"],Fn=["orchestration_model","orchestration_effort","orchestration_speed"],Lo=[...Oo,...Fn],ig=mi.filter(e=>Lo.includes(e)),Au=["delegated","main"],Io=["inherit","claude","codex"],ys=["default","fast"],vs=["standard","fast_track"],ws=["codex","opus","fable","self","skip"],Po=["codex","fable","skip"],Mo=["low","medium","high","xhigh"],un="auto";function cn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Su(e){if(!cn(e)||!cn(e.runners))return[];let t=[];for(let[n,r]of Object.entries(e.runners))cn(r)&&cn(r.models)&&t.push([n,Object.keys(r.models)]);return t}function Nr(e,t){let n=Su(e),r=t&&t!=="inherit"?n.filter(([s])=>s===t):n;return[un,...r.flatMap(([,s])=>s)]}function Eu(e,t,n,r){if(!cn(e)||!cn(e.runners))return[un];let s=[];for(let[o,a]of Object.entries(e.runners))if(!(!cn(a)||!cn(a.models))&&!(t&&t!=="inherit"&&o!==t))for(let[i,c]of Object.entries(a.models)){if(n&&n!==un&&i!==n)continue;let u=r(a,c);if(Array.isArray(u))for(let d of u)typeof d=="string"&&!s.includes(d)&&s.push(d)}return[un,...s]}function qr(e,t,n){return Eu(e,t,n,(r,s)=>cn(s)&&Array.isArray(s.efforts)?s.efforts:r.efforts)}function gi(e,t,n){return Eu(e,t,n,(r,s)=>cn(s)&&Array.isArray(s.orchestration_efforts)?s.orchestration_efforts:cn(s)&&Array.isArray(s.efforts)?s.efforts:r.efforts)}function ks(e,t){let n=Su(e);return(t?n.filter(([s])=>s===t):n).flatMap(([,s])=>s)}function Tu(e,t,n){let r={impl_runtime:e?.impl_runtime,impl_model:e?.impl_model,impl_effort:e?.impl_effort},s=r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:r.impl_runtime==="inherit"?n:null;return s&&(r.impl_model&&!Nr(t,s).includes(r.impl_model)&&(r.impl_model=void 0),r.impl_effort&&!qr(t,s,r.impl_model||un).includes(r.impl_effort)&&(r.impl_effort=void 0)),r}var lg={workflow_mode:"\uC6CC\uD06C\uD50C\uB85C \uBAA8\uB4DC",spec_review_model:"\uC2A4\uD399 \uB9AC\uBDF0\uC5B4",spec_review_effort:"\uC2A4\uD399 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0\uC5B4",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0\uC5B4",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uAD6C\uD604 \uBAA8\uB378",impl_effort:"\uAD6C\uD604 effort",impl_speed:"\uAD6C\uD604 \uC18D\uB3C4",orchestration_model:"\uC6CC\uCEE4 \uBAA8\uB378",orchestration_effort:"\uC6CC\uCEE4 effort",orchestration_speed:"\uC6CC\uCEE4 \uC18D\uB3C4"},_i=[...ig,...Fn],cg=[...Lo,...mi].filter((e,t,n)=>n.indexOf(e)===t&&!_i.includes(e));function Cu(e,t){let n=cn(e)?e:{},r=cn(t)?t:{},s=[];for(let a of _i){let i=n[a]??null,c=r[a]??null;i!==c&&s.push({key:a,label:lg[a]||a,before:i,after:c,kind:i===null?"added":c===null?"removed":"changed"})}let o=[];for(let a of[...cg,...Object.keys(r)])!_i.includes(a)&&!o.includes(a)&&Object.hasOwn(r,a)&&o.push(a);return{rows:s,ignored_keys:o}}function hi(e,t,n,r,s,o){return fo({key:e,choices:t,layer:"global",global:n,resolution_global:o,execution_defaults:r,runner_catalog:s})}function Ru(e,t){let n={};for(let r of mi){let s=e?.[r],o=t?.[r];s!==o&&(n[r]=typeof o=="string"&&o.length>0?o:null)}return n}function Ou(e,t){let n={};for(let r of Fn){let s=e?.[r]??null,o=t?.[r]??null;s!==o&&(n[r]=typeof o=="string"&&o.length>0?o:null)}return n}var bi=[{id:"workflow",label:"\uC6CC\uD06C\uD50C\uB85C\uC6B0",keys:["workflow_mode"]},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort"]},{id:"implementation",label:"\uAD6C\uD604",keys:["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]},{id:"worker",label:"Worker",keys:[...Fn]}],Vn={workflow_mode:"\uBAA8\uB4DC",spec_review_model:"\uC0AC\uC591 \uB9AC\uBDF0",spec_review_effort:"\uC0AC\uC591 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_dispatch:"\uC2E4\uD589 \uBC29\uC2DD",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uBAA8\uB378",impl_effort:"effort",impl_speed:"\uC18D\uB3C4",orchestration_model:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",orchestration_effort:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",orchestration_speed:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4"},Do={pin:"\uD540",global:"\uC804\uC5ED",base:"\uAE30\uBCF8"};function yi(e,t,n,r,s,o=null){let a=tn({pin:t,global:n,execution_defaults:r,runner_catalog:s,route:t&&typeof t.route=="string"?t.route:null,controller_runtime:o});return e.map(i=>({key:i,...a[i]}))}function Lu(e,t,n,r,s,o=null){let a={pin:0,global:0,base:0};for(let i of yi(e,t,n,r,s,o))a[i.source]+=1;return a}function Iu(e,t,n){return{id:e,key:t,value:typeof n=="string"?n:""}}function Pu(e,t,n){return typeof t!="string"||t.length===0?null:{id:e,preset_id:t,expected_revision:n}}var Bw=[...Oo,...Fn];var ug=[{id:"spec",label:"spec \uB9AC\uBDF0",receipt:"spec_review"},{id:"impl",label:"\uAD6C\uD604",receipt:null},{id:"impl_review",label:"impl \uB9AC\uBDF0",receipt:"impl_review"},{id:"pr",label:"PR",receipt:null}],dg={pin:"pin",global:"global",base:"base"};function pg(e){return l`<span
    class=${`detail-layer-rail detail-layer-rail--${dg[e]}`}
    data-source=${e}
    aria-hidden="true"
    ><i></i><i></i><i></i
  ></span>`}function fg(e,t,n){switch(e){case"workflow_mode":return vs;case"spec_review_model":case"impl_review_model":return ws;case"plan_review_model":return Po;case"spec_review_effort":case"plan_review_effort":case"impl_review_effort":return Mo;case"impl_dispatch":return Au;case"impl_runtime":return Io;case"impl_model":return Nr(n,t.impl_runtime);case"impl_effort":return qr(n,t.impl_runtime,t.impl_model);case"impl_speed":case"orchestration_speed":return ys;case"orchestration_model":return ks(n,null);case"orchestration_effort":return qr(n,void 0,t.orchestration_model||un).filter(r=>r!==un);default:return[]}}function _g(e,t){return l`<div class="detail-effective__row" data-key=${e.key}>
    ${pg(e.source)}
    <span class="detail-effective__k"
      >${Vn[e.key]||e.key}</span
    >
    <span
      class=${`detail-effective__v${e.source==="base"?" detail-effective__v--dim":""}`}
      title=${e.full_value||""}
      >${e.display}</span
    >
    <span
      class=${`detail-effective__badge detail-effective__badge--${e.source}`}
      >${Do[e.source]}</span
    >
    ${t.expanded?l`<select
          class="detail-effective__edit"
          data-edit-key=${e.key}
          aria-label=${`${Vn[e.key]||e.key} \uD3B8\uC9D1`}
          ?disabled=${e.resolution==="not_applicable"}
          @change=${n=>{let r=String(n.target.value);t.onEdit(e.key,r.length===0?null:r)}}
        >
          <option
            value=""
            title=${t.default_full_value||""}
            ?selected=${e.source!=="pin"}
          >
            ${t.default_label}
          </option>
          ${t.options.map(n=>l`<option
                value=${n.value}
                title=${n.full_value||""}
                ?selected=${e.source==="pin"&&e.value===n.value}
              >
                ${n.label}
              </option>`)}
        </select>`:""}
  </div>`}function Mu(e,t){let n=bi.flatMap(c=>c.keys),r=yi(n,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),s=Lu(n,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),o=Object.fromEntries(r.map(c=>[c.key,c])),a=Object.fromEntries(r.filter(c=>c.value!==null).map(c=>[c.key,c.value])),i=r.filter(c=>c.full_value&&c.display!==c.full_value).map(c=>c.full_value).join(" \xB7 ");return l`<details
    class=${`detail-effective${e.expanded?" detail-effective--open":""}`}
    data-seam="effective-settings"
    ?open=${e.expanded}
    @toggle=${c=>t.onToggle(c.currentTarget.open)}
  >
    <summary
      class="detail-effective__head"
      data-seam="effective-settings-toggle"
      @click=${c=>{c.preventDefault();let u=c.currentTarget.parentElement;t.onToggle(!u.open)}}
    >
      <span class="detail-effective__t">유효 실행 설정</span>
      <span class="detail-effective__summary" title=${i}
        >${mg(o)}</span
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
          ${bi.map(c=>l`
              <div class="detail-effective__subhead">${c.label}</div>
              ${r.filter(u=>c.keys.includes(u.key)).map(u=>{let d=fo({key:u.key,choices:fg(u.key,a,e.catalog),layer:"pin",pin:e.metadata,global:e.workspace_values,execution_defaults:e.execution_defaults,runner_catalog:e.catalog,route:typeof e.metadata?.route=="string"?e.metadata.route:null,controller_runtime:e.controller_runtime||null});return _g(u,{expanded:e.expanded,options:d.options,default_label:d.unset_label,default_full_value:d.full_value,onEdit:t.onEdit})})}
            `)}
          <div class="detail-effective__foot">
            <select
              data-impl-preset-select
              aria-label="실행 프리셋"
              .value=${fr(e.preset_id)}
              ?disabled=${e.preset_busy}
              @change=${c=>t.onPresetSelect(String(c.target.value))}
            >
              <option value="" ?selected=${e.preset_id===""}>
                실행 프리셋…
              </option>
              ${e.presets.map(c=>l`<option
                    value=${c.id}
                    ?selected=${c.id===e.preset_id}
                  >
                    ${c.name}${c.compatible===!1?" (\uBE44\uD638\uD658)":""}
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
  </details>`}function mg(e){let t=[];if(e.workflow_mode&&t.push(e.workflow_mode.display),e.impl_dispatch?.value==="main")t.push("\uBA54\uC778");else if(e.impl_dispatch?.value==="delegated"){let n=e.impl_runtime?` ${e.impl_runtime.display}`:"";t.push(`\uC704\uC784${n}`)}for(let n of["impl_model","impl_effort","impl_speed"])e[n]?.resolution!=="not_applicable"&&t.push(e[n]?.display||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00");return t.join(" \xB7 ")}function gg(e){if(!e||typeof e!="object")return null;let{kind:t,actor:n,effort:r,sha:s}=e;return typeof t!="string"||typeof n!="string"||typeof s!="string"?null:{kind:t,actor:n,effort:typeof r=="string"?r:null,sha:s}}function Du(e){let t=e&&typeof e.metadata=="object"&&e.metadata?e.metadata:{},n=e&&typeof e.workflow=="object"&&e.workflow?e.workflow:{},r=n.stages||{},s=n.route||t.route||null,o=typeof t.pr_url=="string"?t.pr_url:"",a=typeof t.exec_receipt=="string"?t.exec_receipt:"",i=gg(n.exec_receipt),c=i?On(i):a,u=i?`${i.kind}:${i.actor}`:a.split("@")[0],d=uo(n.planned_execution,n.exec_receipt);return l`<section class="detail-summary" data-seam="detail-summary">
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
      ${d?l`<span
            class="detail-summary__chip detail-summary__chip--planned ctl-chip--planned"
            data-kind=${d.kind}
            title=${d.title}
            >${d.label}</span
          >`:""}
      ${c?l`<span
            class="detail-summary__chip detail-summary__chip--receipt"
            title=${c}
            >${u}${i?.effort?l`${" "}<span
                    class="detail-summary__chip-effort"
                    data-seam="exec-receipt-effort"
                    >${i.effort}</span
                  >`:""}</span
          >`:""}
    </div>
    <div class="detail-summary__gates">
      ${ug.map(_=>{let h=_.receipt&&typeof t[_.receipt]=="string"?String(t[_.receipt]):"",w=r[_.id],$=h.length>0||w?.fill==="full",P=!$&&w?.fill==="dim",z=w?.stale===!0;return l`<span
          class=${`detail-summary__gate${$?" detail-summary__gate--on":""}${P?" detail-summary__gate--current":""}${z?" detail-summary__gate--stale":""}`}
          data-gate=${_.id}
        >
          <span class="detail-summary__gate-pill">${_.label}</span>
          ${h?l`<span class="detail-summary__gate-sha"
                >${h.split("@")[1]?.slice(0,7)||""}</span
              >`:""}
        </span>`})}
    </div>
  </section>`}function No(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Nu(e){return No(e)&&typeof e.key=="string"&&e.key.length>0&&typeof e.email=="string"&&e.email.length>0}function qu(e,t){let n=e&&e[t];if(!No(n)||!Array.isArray(n.accounts))return null;let r=n.accounts.filter(Nu),s=Nu(n.active)?n.active:null;return{accounts:r,active:s||r.find(o=>o.active===!0)||null}}function Bu(e){return typeof e.alias=="string"&&e.alias.length>0?` (${e.alias})`:""}function qo(e){let t=typeof e.status=="string"&&e.status!=="ok"?` \xB7 ${e.status}`:"";return`${e.email}${Bu(e)}${t}`}function Fr(e){let t=typeof e.plan=="string"&&e.plan.length>0?e.plan:"plan \uD655\uC778 \uBD88\uAC00";return`${e.email} \xB7 ${t}${Bu(e)}`}function hg(e,t,n){if(n!==null){let s=e==="claude"?qo:Fr,o=t?t.accounts.find(a=>a.key===n):void 0;return`\uB808\uD3EC \uAE30\uBCF8\uAC12 \uC0AC\uC6A9(${o?s(o):n})`}return t?t.active?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${e==="claude"?t.active.email:Fr({...t.active,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)":"(\uAE30\uBCF8)"}function Fu(e,t){if(!No(e)||e.state!=="usable"||!No(e.values))return null;let n=e.values[t];return typeof n=="string"&&n.length>0?n:null}function ju(e){let t=e.provider_key==="claude"?qo:Fr,n=!!e.provider?.accounts.some(r=>r.key===e.selected);return l`<div class="detail-kv" data-exec-account-row=${e.key}>
    <span class="detail-kv__k">${e.title}</span>
    <span class="detail-kv__vgroup">
      <select
        class=${e.selected?"detail-kv__v detail-kv__v--sel":"detail-kv__v"}
        aria-label=${e.title}
        data-exec-key=${e.key}
        @change=${r=>e.handlers.onExecChange(e.key,r.target.value)}
      >
        <option value="" ?selected=${e.selected.length===0}>
          ${hg(e.provider_key,e.provider,e.workspace_default)}
        </option>
        ${e.selected&&!n?l`<option value=${e.selected} selected>
              ${e.selected} (목록에 없음)
            </option>`:""}
        ${e.provider?.accounts.map(r=>l`<option
              value=${r.key}
              ?selected=${r.key===e.selected}
            >
              ${t(r)}
            </option>`)||""}
      </select>
      ${e.hint?l`<small class="detail-effective__hint">${e.hint}</small>`:""}
      ${e.provider?"":l`<small class="detail-effective__hint"
            >계정 목록을 불러올 수 없습니다</small
          >`}
    </span>
  </div>`}function Uu({md:e,catalog:t,workspace_defaults:n=null,handlers:r}){let s=typeof e.claude_account=="string"?e.claude_account:"",o=typeof e.codex_account=="string"?e.codex_account:"";return l`<section class="exec-accounts" data-exec-accounts>
    <div class="detail-section-label">실행 계정</div>
    <div class="exec-settings-core">
      ${ju({key:"claude_account",title:"Claude \uACC4\uC815",provider_key:"claude",provider:qu(t,"claude"),selected:s,workspace_default:Fu(n,"claude_account"),handlers:r,hint:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uB7F0\uD0C0\uC784\uC774 claude\uC77C \uB54C \uC801\uC6A9\uB429\uB2C8\uB2E4"})}
      ${ju({key:"codex_account",title:"Codex \uACC4\uC815",provider_key:"codex",provider:qu(t,"codex"),selected:o,workspace_default:Fu(n,"codex_account"),handlers:r})}
    </div>
  </section>`}var Wu=["orchestration_model","orchestration_effort","orchestration_speed","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_runtime","impl_model","impl_effort"];function $s(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Fo(e){if(!$s(e)||!$s(e.runners))return null;let t=Object.entries(e.runners).filter(([,n])=>$s(n)&&$s(n.models));return t.length>0?t:null}function $n(e,t){let n=Fo(e);if(!n||!t)return null;for(let[r,s]of n)if(Object.hasOwn(s.models,t))return r;return null}function zu(e,t){return $s(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function Hu(e,t){let n=Fo(e);if(!n||!t)return[];for(let[,r]of n)if(Object.hasOwn(r.models,t))return zu(r,r.models[t]);return[]}function bg(e){let t=Fo(e);if(!t)return[];let n=[];for(let[,r]of t)for(let s of Object.values(r.models))for(let o of zu(r,s))n.includes(o)||n.push(o);return n}function yg(e,t){if(!t)return bg(e);let r=Fo(e)?.find(([o])=>o===t)?.[1];if(!r)return[];let s=[];for(let o of Object.keys(r.models))for(let a of Hu(e,o))s.includes(a)||s.push(a);return s}function Gu(e,t,n){let r={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},s=r.impl_runtime==="inherit"?n:r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:null;if(r.impl_runtime==="inherit"&&!s)return r.impl_model="",r.impl_effort="",r;let o=$n(t,r.impl_model);if(r.impl_model&&(!s||o!==s))return r.impl_model="",r.impl_effort="",r;let a=r.impl_model?Hu(t,r.impl_model):yg(t,s);return r.impl_effort&&a.length>0&&!a.includes(r.impl_effort)&&(r.impl_effort=""),r}function vg(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function wg(e){let t=/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(e);if(!t)return{front:null,body:e};let n=t[1].trim();return{front:n.length>0?n:null,body:e.slice(t[0].length)}}function jo(e,t){let n=t.getWorkspacePath,r=t.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",a="",i=null,c="";function u(P){P.key==="Escape"&&s&&(P.preventDefault(),w())}document.addEventListener("keydown",u);function d(){return s?l`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>w()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${vg(s)}</span
            >
            <button
              type="button"
              class="mv__close"
              aria-label="닫기"
              @click=${()=>w()}
            >
              ✕
            </button>
          </div>
          <div class="mv__body">
            ${o==="loading"?l`<div class="mv__status">불러오는 중…</div>`:o==="pending"?l`<div class="mv__status">${c}</div>`:o==="error"?l`<div class="mv__status mv__status--error">
                      ${c||"\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}
                    </div>`:l`${i===null?null:l`<pre class="mv__front">
${i}</pre
                        >`}${Gn(a)}`}
          </div>
        </div>
      </div>
    `:l``}function _(){Qe(d(),e)}async function h(P,z={}){s=P,o="loading",a="",i=null,c="",_();let Q=z.workspace||(n?n():"");if(!Q){o="error",c="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",_();return}if(!r){o="error",c="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",_();return}let ae="/api/doc?workspace="+encodeURIComponent(Q)+"&path="+encodeURIComponent(P);try{let N=await r(ae),M=await N.json().catch(()=>({}));if(!N.ok||!M||M.ok!==!0){if(M?.error==="not_found"&&z.missing_state==="plan_pending"){o="pending",c="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",_();return}o="error",c="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(M&&M.error||N.status)+")",_();return}let q=wg(String(M.content||""));i=q.front,a=q.body,o="ready",_()}catch{o="error",c="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",_()}}function w(){s=null,Qe(l``,e)}function $(){document.removeEventListener("keydown",u),w()}return{open:h,close:w,destroy:$}}var kg=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],Yu="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",Bo=[{role:"implementation",provider:"codex"},{role:"review-consult",provider:"codex"},{role:"subagent",provider:"claude"}],$g=new Set(["codex-runner","Explore","Plan","advisor","advisor-xhigh","claude-code-guide","statusline-setup"]);function Vu(e){return typeof e=="string"&&$g.has(e)}var xg=["running","done","failed","interrupted"],Ag={running:"\u25CF",done:"\u2713",failed:"\u2717",interrupted:"\u26A0"};function Sg(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function Eg(e){let t=zt(e);if(t.length>0)return t.map(s=>l`<span class="detail-usage-total" title=${s.tooltip}
          >${s.label}</span
        >`);let n=Ir(e);if(!n||!e)return"";let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return l`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${n.replace(/^τ /,"\u03C4 \uCD1D ")}${r}</span
    >${e.replayed?l`<span class="detail-usage-partial" title=${Yu}
          >부분 집계</span
        >`:""}`}function Ku(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function ki(e){if(typeof e=="number")return Uo(e);if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?Uo(t):""}function Tg(e){return typeof e=="string"?e.replace(/-\d{8}$/,""):""}function Cg(e,t){if(e.provider!=="claude")return{text:e.session_id.slice(0,8),title:e.session_id};let n=t&&typeof t.agent_id=="string"?t.agent_id:"";return n.length>0?{text:n.slice(0,8),title:n}:{text:e.launch_id.slice(-8),title:e.launch_id}}function vi(e){return e===null||typeof e=="string"&&e.trim().length>0}function wi(e){return e===null||typeof e=="number"&&Number.isFinite(e)}function Rg(e){if(!e||typeof e!="object"||Array.isArray(e))return null;let t=e,n=t.provider==="claude";return typeof t.launch_id!="string"||t.launch_id.length===0||!Bo.some(r=>r.role===t.role&&r.provider===t.provider)||!(n?vi(t.model):typeof t.model=="string"&&t.model.length>0)||!(!("effort"in t)||vi(t.effort))||!(!("agent_type"in t)||vi(t.agent_type))||typeof t.session_id!="string"||t.session_id.length===0||!xg.includes(t.status)||!(t.turn_id===null||typeof t.turn_id=="string")?null:n?!wi(t.started_at)||!wi(t.last_event_at)||!wi(t.completed_at)?null:t:typeof t.started_at!="number"||!Number.isFinite(t.started_at)||typeof t.last_event_at!="number"||!Number.isFinite(t.last_event_at)||!(t.completed_at===null||typeof t.completed_at=="string"&&Number.isFinite(Date.parse(t.completed_at)))?null:t}function Og(e,t,n){let s=zt({providers:{[t]:{subtotal:n.subtotal,breakdown:n.usage,...n.replayed?{replayed:!0}:{}}},roles:{}})[0];return l`<div class="detail-session__leg detail-session__usage-detail">
    <span class="detail-session__leg-role detail-session__usage-label"
      >${e}</span
    >
    <span class="detail-session__leg-meta detail-session__usage-value"
      >${[n.provider,n.model,n.effort].filter(Boolean).join(" \xB7 ")}</span
    >
    ${n.session_id?l`<span
          class="detail-session__leg-sid detail-session__sid"
          title=${n.session_id}
          >${n.session_id.slice(0,8)}</span
        >`:""}
    ${ki(n.completed_at)?l`<span class="detail-session__leg-time detail-session__time"
          >${ki(n.completed_at)}</span
        >`:""}
    ${s?l`<span class="detail-session__usage" title=${s.tooltip}
          >${s.label}</span
        >`:""}
  </div>`}function Lg(e,t,n,r){let s=e.status==="running"?null:t,a=(s?zt({providers:{[e.provider]:{subtotal:s.subtotal,breakdown:s.usage,...s.replayed?{replayed:!0}:{}}},roles:{}}):[])[0],i=e.status==="running"?Uo(e.last_event_at):s?ki(s.completed_at):"",c=(e.provider==="claude"?["Claude",e.agent_type,Tg(e.model),e.effort]:["codex",e.model,e.effort]).filter(Boolean).join(" \xB7 "),u=Cg(e,s);return l`<button
    type="button"
    class="detail-session__leg detail-session__usage-detail detail-session__leg--${e.status}"
    data-launch-id=${e.launch_id}
    @click=${()=>r.onOpenDelegation&&r.onOpenDelegation(n,e.launch_id)}
  >
    <span class="detail-session__leg-glyph" aria-hidden="true"
      >${Ag[e.status]}</span
    >
    <span class="detail-session__leg-role detail-session__usage-label"
      >${e.role}</span
    >
    <span class="detail-session__leg-meta detail-session__usage-value"
      >${c}</span
    >
    <span
      class="detail-session__leg-sid detail-session__sid"
      title=${u.title}
      >${u.text}</span
    >
    ${i?l`<span class="detail-session__leg-time detail-session__time"
          >${i}</span
        >`:""}
    ${a?l`<span class="detail-session__usage" title=${a.tooltip}
          >${a.label}</span
        >`:""}
  </button>`}function Ig(e,t){return e.role===t.role&&(e.model===null||t.model===void 0||e.model===t.model)&&e.session_id===t.session_id}function Pg(e,t,n){let r=[],s=new Set,o=Array.isArray(e.delegation_sessions)?e.delegation_sessions:[];for(let d of o){let _=Rg(d);!_||s.has(_.launch_id)||Vu(_.agent_type)||(s.add(_.launch_id),r.push(_))}r.sort((d,_)=>(d.started_at||0)-(_.started_at||0));let a={};for(let{role:d,provider:_}of Bo){let h=t?t.roles[d]?.[_]:null;a[d]=h?[...h.legs]:[]}let i=Bo.flatMap(({role:d})=>a[d]),c=new Set,u=[];for(let{role:d,provider:_}of Bo){for(let h of r.filter(w=>w.role===d&&w.provider===_)){let w=i.find($=>$.receipt_id===h.launch_id)||null;w&&!Ig(h,w)||(w&&c.add(w.receipt_id),u.push(Lg(h,w,e.attempt_id,n)))}for(let h of a[d])!c.has(h.receipt_id)&&!Vu(h.agent_type)&&u.push(Og(d,_,h))}return u}function Mg(e,t){let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,r=[...kg,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return l`<div class="detail-session__usage-detail">
    ${r.map(s=>l`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${s.label}</span
          ><span class="detail-session__usage-value"
            >${Sg(e[s.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${n===null?"":l`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${n.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?l`<span class="detail-session__usage-note">${Yu}</span>`:""}
  </div>`}var Dg={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function Uo(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=String(t.getHours()).padStart(2,"0"),r=String(t.getMinutes()).padStart(2,"0");return`${n}:${r}`}function Ng(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,r])=>typeof r=="string"&&r.length>0).map(([r,s])=>`${r}=${s}`).join(" \xB7 "):"",n=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return l`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${n}</span>
    ${t?l`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}function Zu(e,t={},n={}){let r=Array.isArray(e)?e:[],s=n.expanded||new Set;if(r.length===0)return l`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let o=new Set;for(let u of r)u&&typeof u.resumed_from=="string"&&u.resumed_from.length>0&&o.add(u.resumed_from);let a=u=>{if(!(u.status==="failed"||u.status==="orphaned"))return"";let _=typeof u.session_id=="string"&&u.session_id.length>0,h=o.has(u.attempt_id),w=_&&!h,$=_?h?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return l`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${u.attempt_id}
      ?disabled=${!w}
      title=${$}
      @click=${P=>{P.stopPropagation(),w&&t.onResume&&t.onResume(u.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},i=u=>{if(!(u.status==="failed"||u.status==="orphaned")||typeof u.cause!="string"||u.cause==="")return"";let _=u.cause_detail,h=_&&typeof _.reason=="string"&&_.reason.length>0?typeof _.command=="string"&&_.command.length>0?`${_.reason} \xB7 ${_.command}`:_.reason:u.cause;return l`<div class="detail-session__cause" title=${h}>
      ${u.cause}
    </div>`},c=u=>{let d=Ku(ja(u));if(zt(d).length===0&&!Ir(u.usage))return"";let _=s.has(u.attempt_id);return l`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${u.attempt_id}
      aria-expanded=${_?"true":"false"}
      title=${_?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${h=>{h.stopPropagation(),t.onToggleUsage&&t.onToggleUsage(u.attempt_id)}}
    >
      τ 자세히
    </button>`};return l`
    <div class="detail-section-label">
      세션 이력${Eg(n.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${r.map(u=>{let d=ja(u),_=Ku(d),h=zt(_);return l`<div class="detail-session-row">
          <button
            type="button"
            class="detail-session detail-session--${u.status||"unknown"}"
            data-attempt-id=${u.attempt_id}
            @click=${()=>t.onOpen&&t.onOpen(u.attempt_id)}
          >
            <span class="detail-session__glyph"
              >${Dg[u.status||""]||"\xB7"}</span
            >
            <span class="detail-session__id">${u.attempt_id}</span>
            ${ss(u)?l`<span
                  class="detail-session__resumed"
                  title=${ss(u)}
                  >↻</span
                >`:""}
            <span class="detail-session__meta">${ur(u)}</span>
            ${h.length>0?l`<span class="detail-session__role">orchestrator</span>`:""}
            ${u.session_id?l`<span class="detail-session__sid" title=${u.session_id}
                  >${String(u.session_id).slice(0,8)}</span
                >`:""}
            ${h.length>0?h.map(w=>l`<span
                      class="detail-session__usage"
                      title=${w.tooltip}
                      >${w.label}</span
                    >`):Ir(u.usage)?l`<span class="detail-session__usage"
                    >${Ir(u.usage)}</span
                  >`:""}
            <span class="detail-session__time">${Uo(u.started_at)}</span>
          </button>
          ${c(u)} ${a(u)} ${i(u)} ${Ng(u)}
          ${s.has(u.attempt_id)&&u.usage?Mg(u.usage,u.runner==="codex"?"codex":"claude"):""}
          ${Pg(u,d,t)}
        </div>`})}
    </div>
  `}function Qu(e,t={}){return l`
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
          ${qg(e)}
        </div>`:""}
  `}function qg(e){let t=Mr(e);if(t)return t;let n=e.data;if(!n)return"";if(n.missing)return l`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof n.default_task_prompt=="string"?qn("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",n.default_task_prompt):""}`;let r=Eo(n.recorded_at);return l`<div class="detail-prompt__meta">
      ${n.attempt_id}${r?` \xB7 ${r}`:""}
    </div>
    ${typeof n.task_prompt=="string"?qn("\uACFC\uC5C5 (user)",n.task_prompt):""}
    ${typeof n.system_prompt=="string"?qn("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",n.system_prompt):""}`}var Fg=["open","in_progress","deferred","resolved","closed"],jg=[0,1,2,3,4];function Xu(e,t){let n=t.issueStores,r=t.onClose,s=t.transport,o=t.onNavigate,a=t.queueStore,i=t.execPresetStore,c=t.sessionLogStore,u=null,d=null,_={},h="",w=!1,$=[],P=!1,z={},Q={claude:null,codex:null},ae=null,N=null,M=0,q=!1,G=!1,E="",W="",B="";function ve(){q=!1,G=!1,E="",W="",B=""}function fe(){Q={claude:null,codex:null},ae=null,N=null,M+=1}async function ge(){if(!s)return null;try{let f=await Promise.resolve(s("get-workspace-accounts",{}));return f&&typeof f.state=="string"?f:null}catch{return null}}async function V(f){try{let C=await fetch(f);if(!C.ok)return null;let T=await C.json();if(!T||typeof T!="object"||!Array.isArray(T.accounts))return null;let le=T.accounts.filter(Ee=>Ee!==null&&typeof Ee=="object"&&!Array.isArray(Ee));return{accounts:le,active:le.find(Ee=>Ee.active===!0)||null}}catch{return null}}async function Te(f){N=f;let C=++M,[T,le,Ee]=await Promise.all([V("/api/claude-usage"),V("/api/codex-usage"),ge()]);C!==M||f!==u||(Q={claude:T,codex:le},ae=Ee,y())}let Re=[],ie=null,de=null,Ae=!1,H="",te=!1,ce=0,ke=new Set;function be(){Re=[],ie=null,de=null,Ae=!1,H="",te=!1,ce+=1,ke.clear()}async function je(f){if(!s)return;let C=++ce;try{let T=await Promise.resolve(s("get-comments",{id:f}));if(C!==ce||f!==u)return;Re=Array.isArray(T)?T:[],Ae=!1}catch{if(C!==ce||f!==u)return;Ae=!0}y()}function we(){if(!s||!u)return;let f=d&&typeof d.comment_count=="number"?d.comment_count:null;if(ie!==u){ie=u,de=f,je(u);return}f!==null&&f!==de&&(de=f,je(u))}function Je(f){ke.has(f)?ke.delete(f):ke.add(f),y()}function it(f){let C=H.trim().length===0;H=f,C!==(f.trim().length===0)&&y()}async function I(){let f=H.trim();if(!s||!u||f.length===0||te)return;let C=u;te=!0,y();let T=!1;try{let le=await Promise.resolve(s("add-comment",{id:C,text:f}));Array.isArray(le)&&le.length>0&&(T=!0,C===u&&(Re=le,Ae=!1,H="",de=le.length))}catch{T=!1}T||ue("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),C===u&&(te=!1),y()}let me={onToggle:Je,onDraftInput:it,onSubmit:I},$e=t.mdViewer||null,Se=null;$e||(Se=document.createElement("div"),Se.className="md-viewer-root",document.body.appendChild(Se));let Ge=$e||jo(Se,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),qe=document.createElement("div");qe.className="session-log-root",document.body.appendChild(qe);let K=Dr(qe,{transport:s?(f,C)=>Promise.resolve(s(f,C)):void 0,sessionLogStore:c}),X=!1,Me=!1,et=!1,Ve=null,De=null,Ke=0;function st(f){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${f}`}function Ne(){X=!1,Me=!1,et=!1,Ve=null,De=null,Ke+=1}async function Be(f){if(!s)return;let C=++Ke;Me=!0,et=!1,y();try{let T=await Promise.resolve(s("get-bead-prompt",{bead_id:f}));if(C!==Ke)return;!T||typeof T!="object"||Array.isArray(T)?et=!0:(Ve=T,De=st(f))}catch{C===Ke&&(et=!0)}finally{C===Ke&&(Me=!1,y())}}function dt(){if(X=!X,X&&u&&De!==st(u)){Ve=null,Be(u);return}y()}function ht(){if(!a||!u)return[];let f=a.get();return(f&&f.attempts?Object.values(f.attempts):[]).filter(T=>T&&T.bead_id===u).sort((T,le)=>(le.started_at||0)-(T.started_at||0)).map(T=>({attempt_id:T.attempt_id,bead_id:T.bead_id,status:T.status,started_at:typeof T.started_at=="number"?T.started_at:null,runner:T.runner||null,model:T.model||null,effort:T.effort||T.observed_effort||null,speed:T.speed||null,session_id:T.session_id||null,resumed_from:T.resumed_from||null,continuation_mode:T.continuation_mode||null,dismissed_at:typeof T.dismissed_at=="number"?T.dismissed_at:null,cause:typeof T.cause=="string"?T.cause:null,cause_detail:T.cause_detail||null,exec_default_preset_id:typeof T.exec_default_preset_id=="string"?T.exec_default_preset_id:null,exec_default_preset_revision:typeof T.exec_default_preset_revision=="number"?T.exec_default_preset_revision:null,exec_values:T.exec_values&&typeof T.exec_values=="object"?T.exec_values:null,usage:T.usage||null,usage_legs:Array.isArray(T.usage_legs)?T.usage_legs:[],delegation_sessions:Array.isArray(T.delegation_sessions)?T.delegation_sessions:[]}))}function bt(){if(!a||!u)return null;let f=a.get();return _n(f&&f.attempts||{},u)}let ft=new Set;function kt(f){ft.has(f)?ft.delete(f):ft.add(f),y()}function Rt(f){let C=a?a.get():null,T=C&&C.attempts?C.attempts[f]:null;K.open({attempt_id:f,meta:T?{runner:T.runner||void 0,model:T.model||void 0,effort:T.effort||void 0,status:T.status||void 0,session_id:T.session_id||void 0}:{}})}function $t(f,C){let T=a?a.get():null,le=T&&T.attempts?T.attempts[f]:null,Ue=(le&&Array.isArray(le.delegation_sessions)?le.delegation_sessions:[]).find(Xe=>Xe&&typeof Xe=="object"&&Xe.launch_id===C);Ue&&K.open({attempt_id:f,launch_id:C,meta:{runner:Ue.provider==="claude"?"claude":"codex",role:Ue.role,...typeof Ue.agent_type=="string"?{agent_type:Ue.agent_type}:{},model:Ue.model,effort:Ue.effort,session_id:Ue.session_id,status:Ue.status}})}async function xt(f){if(!s||!f)return;let C=await Lr();if(C===null)return;let T=()=>{let Xe=a?a.get():null;return Xe&&typeof Xe.revision=="number"?Xe.revision:0},le=async(Xe={},Ze=T())=>await s("worker-attempt-resume",{attempt_id:f,expected_revision:Ze,...C!==""?{instructions:C}:{},...Xe}),Ee=Xe=>{Xe?.queue&&a?.set&&a.set(Xe.queue)},Ue=await le();if(Ee(Ue),Ue&&Ue.conflict){let Xe=Ue.queue&&typeof Ue.queue.revision=="number"?Ue.queue.revision:T();Ue=await le({},Xe),Ee(Ue)}Ue=await Ln(Ue,(Xe,Ze)=>le({continuation:Xe,decision_token:Ze}),{onResult:Ee,refresh:()=>le()}),Ue&&Ue.resumed===!1&&!Ue.conflict&&Ue.reason&&ue(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${Ue.reason}`,"error",2400)}let Ye={onOpen:Rt,onOpenDelegation:$t,onResume:xt,onToggleUsage:kt};function L(){let f=a?a.get():null,C={...z};for(let T of["orchestration_model","orchestration_effort","orchestration_speed"]){let le=f&&f[T];typeof le=="string"&&(C[T]=le)}return C}async function U(){if(s){try{let f=await Promise.resolve(s("get-session-defaults",{}));z=f&&f.values&&typeof f.values=="object"?f.values:{}}catch{z={}}y()}}function Y(){let f=a?a.get():null;return f&&f.runner_catalog||null}function ne(){let f=a?a.get():null;return f&&typeof f.execution_defaults=="object"?f.execution_defaults:null}function xe(){let f=d?.metadata&&typeof d.metadata=="object"?d.metadata:{},T=tn({pin:{...f,..._},global:L(),execution_defaults:ne(),runner_catalog:Y(),route:typeof f.route=="string"?f.route:null}).orchestration_model.value||"";return $n(Y(),T)}function He(){let f=i?i.get():null;return!f||typeof f.revision!="number"?null:{revision:f.revision,presets:Array.isArray(f.presets)?f.presets:[]}}function Z(f){return f?.compatible===!1}function ee(f){i&&f&&typeof f.revision=="number"&&Array.isArray(f.presets)&&i.set({revision:f.revision,presets:f.presets})}async function Oe(){let f=He(),C=f?.presets.find(T=>T.id===h);if(!(!s||!u||!f||!C||Z(C)||w)){w=!0,$=[],y();try{let T=await Promise.resolve(s("apply-impl-preset",Pu(u,C.id,f.revision)));if(T&&T.conflict){ee(T),ue("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let le=T&&Array.isArray(T.issue)?T.issue[0]:T?.issue;if(T&&T.applied&&le&&typeof le=="object"){d=le,$=Array.isArray(T.skipped_orchestration_keys)?T.skipped_orchestration_keys.filter(Ee=>typeof Ee=="string"):[];for(let Ee of Wu)delete _[Ee];ue($.length>0?"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4. \uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 3\uD0A4\uB294 Bead\uC5D0 \uD540\uD560 \uC218 \uC5C6\uC5B4 \uAC74\uB108\uB6F0\uC5C8\uC2B5\uB2C8\uB2E4.":"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",4e3);return}T&&T.error==="bd_readback_failed"?ue("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):ue("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(T){T&&typeof T=="object"&&T.code==="bd_readback_failed"?ue("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):ue("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{w=!1,y()}}}let S=null;n&&n.subscribe&&(S=n.subscribe(()=>se()));let g=null;a&&typeof a.subscribe=="function"&&(g=a.subscribe(()=>{u&&y()}));let k=null;i&&typeof i.subscribe=="function"&&(k=i.subscribe(()=>{u&&y()}));function j(f){f.key==="Escape"&&u&&(f.preventDefault(),r())}document.addEventListener("keydown",j);function se(){if(u){if(n&&typeof n.snapshotFor=="function"){let f=n.snapshotFor("detail:"+u)||[];d=f.find(T=>T&&T.id===u)||f[0]||d}we(),y()}}function re(f){ln(f).then(C=>{C?ue("\uBCF5\uC0AC\uB428","success",1200):ue("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function ye(f){f.preventDefault(),f.stopPropagation(),u&&re(u)}function _e(f,C){f.preventDefault(),f.stopPropagation(),re(C)}function nt(f,C,T){f.preventDefault(),f.stopPropagation(),Ge.open(C,{missing_state:T})}function _t(f,C){_[f]=C,y(),!(!s||!u)&&Promise.resolve(s("update-exec-settings",Iu(u,f,C.length===0?null:C))).catch(()=>{ue("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}function tt(f,C){let T=d||{},le=T.metadata&&typeof T.metadata=="object"?T.metadata:{},Ee={};for(let Ze of["impl_runtime","impl_model","impl_effort"])Ee[Ze]=Object.hasOwn(_,Ze)?_[Ze]:typeof le[Ze]=="string"?le[Ze]:"";Ee[f]=C;let Ue=Gu(Ee,Y(),xe()),Xe={};for(let Ze of["impl_runtime","impl_model","impl_effort"])Xe[Ze]=_[Ze],_[Ze]=Ue[Ze]||"";y(),!(!s||!u)&&Promise.resolve(s("update-impl-target",{id:u,...Ue,orchestration_runtime:xe()})).then(Ze=>{let vt=Array.isArray(Ze)?Ze[0]:Ze;if(!vt||typeof vt!="object"||!vt.id)throw new Error("implementation target readback failed");d=vt;for(let rn of["impl_runtime","impl_model","impl_effort"])delete _[rn];y()}).catch(()=>{for(let Ze of["impl_runtime","impl_model","impl_effort"])Xe[Ze]===void 0?delete _[Ze]:_[Ze]=Xe[Ze];y(),ue("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error")})}async function ot(f,C,T){if(!s||!u)return!1;try{let le=await Promise.resolve(s(f,C)),Ee=Array.isArray(le)?le[0]:le;return Ee&&typeof Ee=="object"&&Ee.id?(d=Ee,!0):(ue(T,"error"),!1)}catch{return ue(T,"error"),!1}}function Ot(f){setTimeout(()=>{try{let C=e.querySelector(f);C&&typeof C.focus=="function"&&C.focus()}catch{}},0)}function gt(){q=!0,E=d&&d.title||"",y(),Ot('.detail-edit__input[data-edit="title"]')}function dn(f){E=f.target.value}function Bt(){q=!1,E="",y()}function Dt(){ot("edit-text",{id:u,field:"title",value:E},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(C=>{C&&(q=!1,E=""),y()})}function Gt(){G=!0,W=d&&d.description||"",y(),Ot('.detail-edit__textarea[data-edit="description"]')}function qt(f){W=f.target.value}function Pt(){G=!1,W="",y()}function We(){ot("edit-text",{id:u,field:"description",value:W},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(C=>{C&&(G=!1,W=""),y()})}function Xt(f,C,T,le){if(f.key==="Escape"){f.stopPropagation(),T();return}f.key==="Enter"&&(!le||f.ctrlKey||f.metaKey)&&(f.preventDefault(),C())}function Vt(f){let C=f.target.value;ot("update-status",{id:u,status:C},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>y())}function at(f){let C=Number(f.target.value);ot("update-priority",{id:u,priority:C},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>y())}function Pe(f){B=f.target.value}function O(){let f=B.trim();f.length!==0&&ot("label-add",{id:u,label:f},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(C=>{C&&(B=""),y()})}function pe(f){if(f.key==="Escape"){f.stopPropagation(),B="",y();return}f.key==="Enter"&&(f.preventDefault(),O())}function Le(f){ot("label-remove",{id:u,label:f},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>y())}let ct={onCopyPath:_e,onOpenDoc:nt};function St(f){return typeof f=="string"?f:f&&typeof f=="object"?String(f.id||f.to||f.issue_id||f.depends_on||""):""}function yt(f){switch(f&&typeof f=="object"?String(f.dependency_type||f.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function v(f){let T=(Array.isArray(f.dependencies)?f.dependencies:[]).map(le=>({id:St(le),icon:yt(le)})).filter(le=>le.id.length>0);return l`
      <div class="detail-section-label">의존성</div>
      ${T.length===0?l`<div class="detail-empty">의존성 없음</div>`:l`<div class="detail-deps">
            ${T.map(le=>o?l`<button
                    type="button"
                    class="detail-dep detail-dep--link"
                    @click=${()=>o(le.id)}
                  >
                    ${le.icon?`${le.icon} `:""}${le.id}
                  </button>`:l`<span class="detail-dep"
                    >${le.icon?`${le.icon} `:""}${le.id}</span
                  >`)}
          </div>`}
    `}function b(f){let C=f.metadata||{},T=f.workflow||{},le=T.stages||{},Ee=le.spec&&le.spec.stale,Ue=le.impl&&le.impl.stale,Xe=le.plan||null,Ze=T.route_source==="derived",vt=T.route||C.route||"\u2014";return l`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${Ze?" detail-kv__v--derived":""}"
          title=${Ze?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${Ze?"unset":vt}</span
        >
      </div>
      ${T.route!=="quick_fix"||Object.hasOwn(C,"spec_review")?l`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${C.spec_review||"\uC5C6\uC74C"}${Ee?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${T.route==="full_plan"?l`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${Xe?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${Xe?.approval_receipt||"\uC5C6\uC74C"}${Xe?.approval_state==="stale"?" \xB7 stale":Xe?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${T.route!=="quick_fix"||Object.hasOwn(C,"impl_review")?l`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${C.impl_review||"\uC5C6\uC74C"}${Ue?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${T.planned_execution?l`<div class="detail-kv">
              <span class="detail-kv__k">planned_execution</span>
              <span class="detail-kv__v">${T.planned_execution.kind}</span>
            </div>
            ${T.planned_execution.kind==="main"?l`<div class="detail-kv">
                  <span class="detail-kv__k">planned_execution_reason</span>
                  <span class="detail-kv__v detail-kv__v--wrap"
                    >${T.planned_execution.reason}</span
                  >
                </div>`:""}`:""}
      ${T.exec_receipt?l`<div class="detail-kv">
            <span class="detail-kv__k">exec_receipt</span>
            <span class="detail-kv__v detail-kv__v--wrap"
              >${On(T.exec_receipt)}</span
            >
          </div>`:""}
      ${T.impl_entry?l`<div class="detail-kv">
            <span class="detail-kv__k">impl_entry</span>
            <span class="detail-kv__v"
              >${`${T.impl_entry.actor}@${T.impl_entry.sha}`}</span
            >
          </div>`:""}
      ${C.pr_url?l`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${C.pr_url}</span>
          </div>`:""}
    `}let x={route:["quick_fix","spec_backed","full_plan"]};async function D(f,C){let T=C.target.value;if(f==="route"&&d&&d.metadata&&d.metadata.route==="full_plan"&&T!=="full_plan"&&!window.confirm(`full_plan \u2192 ${T||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){y();return}await ot("update-workflow-meta",{id:u,key:f,value:T},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),y()}function J(f){let C=f.metadata||{};return l` ${((le,Ee)=>{let Ue=x[le],Xe=typeof C[le]=="string"?C[le]:"";return l`<div class="detail-kv">
        <span class="detail-kv__k">${le}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${le}
          data-edit=${`wfmeta-${le}`}
          @change=${Ze=>D(le,Ze)}
        >
          <option value="" ?selected=${!Ue.includes(Xe)}>
            ${Ee}
          </option>
          ${Ue.map(Ze=>l`<option value=${Ze} ?selected=${Xe===Ze}>${Ze}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function he(f,C){return q?l`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${E}
            @input=${dn}
            @keydown=${T=>Xt(T,Dt,Bt,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${Dt}
            >
              저장
            </button>
            <button
              type="button"
              class="detail-edit__cancel"
              data-edit="title-cancel"
              @click=${Bt}
            >
              취소
            </button>
          </div>
        </div>
      `:l`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${f}</h2>
        ${zt(C).map(T=>l`<span class="detail-usage-total" title=${T.tooltip}
              >${T.label}</span
            >`)}
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${gt}
        >
          ✎
        </button>
      </div>
    `}function Ie(f){let C=Wt(f.created_at),T=Wt(f.updated_at);return!C&&!T?l``:l`
      ${C?l`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${C}</span>
          </div>`:""}
      ${T?l`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${T}</span>
          </div>`:""}
    `}function rt(f,C){return l`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${Vt}
        >
          ${Fg.map(T=>l`<option value=${T} ?selected=${T===f}>${T}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${at}
        >
          ${jg.map(T=>l`<option value=${String(T)} ?selected=${T===C}>
                P${T}
              </option>`)}
        </select>
      </div>
    `}function A(f){return l`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${G?"":l`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${Gt}
            >
              ✎
            </button>`}
      </div>
      ${G?l`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${W}
              @input=${qt}
              @keydown=${C=>Xt(C,We,Pt,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${We}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${Pt}
              >
                취소
              </button>
            </div>
          </div>`:l`<div class="detail-overlay__desc">
            ${f||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function R(f){let C=typeof f.notes=="string"?f.notes:"";return C.trim().length===0?l``:l`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${C}</div>
    `}function Ce(f){let C=Array.isArray(f.labels)?f.labels:[];return l`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${C.map(T=>l`<span class="detail-label-chip"
              >${T}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${T}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+T}
                @click=${()=>Le(T)}
              >
                ×
              </button></span
            >`)}
        <span class="detail-label-add">
          <input
            class="detail-label-add__input"
            aria-label="라벨 추가"
            placeholder="라벨 추가"
            .value=${B}
            @input=${Pe}
            @keydown=${pe}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${O}
          >
            추가
          </button>
        </span>
      </div>
    `}function p(){if(!u)return l``;let f=d||{},C=String(f.id||u),T=f.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",le=bt(),Ee=f.status||"open",Ue=typeof f.priority=="number"?Math.max(0,Math.min(4,f.priority)):"",Xe=f.description||"",Ze={...f,metadata:{...f.metadata||{},..._}};return l`
      <div class="detail-overlay" role="dialog" aria-modal="true">
        <div class="detail-overlay__backdrop" @click=${()=>r()}></div>
        <div class="detail-overlay__panel">
          <div class="detail-overlay__bar">
            <button
              type="button"
              class="detail-overlay__id"
              title="ID 복사"
              @click=${ye}
            >
              ${C}
            </button>
            <button
              type="button"
              class="detail-overlay__close"
              aria-label="닫기"
              @click=${()=>r()}
            >
              ✕
            </button>
          </div>
          ${he(T,le)}
          ${Du(Ze)}
          ${Mu({metadata:Ze.metadata,workspace_values:L(),catalog:Y(),execution_defaults:ne(),expanded:P,presets:He()?.presets||[],preset_id:h,preset_busy:w,skipped_orchestration_keys:$},{onToggle:vt=>{P=vt,y()},onEdit:(vt,rn)=>{if(vt==="impl_runtime"||vt==="impl_model"||vt==="impl_effort"){tt(vt,rn??"");return}_t(vt,rn??"")},onPresetSelect:vt=>{h=vt,$=[],y()},onPresetApply:()=>{Oe()}})}
          ${Uu({md:Ze.metadata,catalog:Q,workspace_defaults:ae,handlers:{onExecChange:_t}})}
          ${rt(Ee,Ue)} ${Ie(f)}
          ${A(Xe)}
          ${ku(Re,me,{expanded:ke,draft:H,sending:te,error:Ae})}
          ${R(f)} ${Ce(f)} ${v(f)}
          ${b(f)} ${J(f)}
          ${yu(f,ct)}
          ${Qu({expanded:X,loading:Me,error:et,data:Ve},{onToggle:dt})}
          ${Zu(ht(),Ye,{total:le,expanded:ft})}
        </div>
      </div>
    `}function y(){Qe(p(),e)}return{load(f){f!==u&&(_={},h="",$=[],P=!1,ve(),be(),Ne(),fe()),u=f,d=null,se(),U(),N!==f&&Te(f)},clear(){u=null,d=null,_={},h="",w=!1,$=[],P=!1,ve(),be(),Ne(),fe(),Ge.close(),K.close(),Qe(l``,e)},destroy(){S&&(S(),S=null),g&&(g(),g=null),k&&(k(),k=null),document.removeEventListener("keydown",j),$e||(Ge.destroy(),Se&&Se.parentNode&&Se.parentNode.removeChild(Se)),K.destroy(),qe.parentNode&&qe.parentNode.removeChild(qe),u=null,d=null,fe(),h="",w=!1,$=[],be(),Ne(),Qe(l``,e)}}}function Ju(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let n=t.querySelector("#fatal-error-title"),r=t.querySelector("#fatal-error-message"),s=t.querySelector("#fatal-error-detail"),o=t.querySelector("#fatal-error-reload"),a=t.querySelector("#fatal-error-close"),i=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},c=(u,d,_="")=>{n&&(n.textContent=u||"Unexpected Error"),r&&(r.textContent=d||"An unrecoverable error occurred.");let h=typeof _=="string"?_.trim():"";if(s&&(h.length>0?(s.textContent=h,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),a&&a.addEventListener("click",()=>i()),t.addEventListener("cancel",u=>{u.preventDefault(),i()}),{open:c,close:i,getElement(){return t}}}function zo(e){return typeof e=="string"&&e.length>=7?e.slice(0,7):"\u2014"}function As(e){if(typeof e!="number"||!Number.isFinite(e)||e<0)return"\u2014";if(e<1e3)return`${Math.round(e)}ms`;let t=e/1e3;if(t<60)return`${t.toFixed(1)}\uCD08`;let n=Math.floor(t/60);if(n<60)return`${n}\uBD84 ${Math.round(t-n*60)}\uCD08`;let r=Math.floor(n/60),s=n%60;return`${r}\uC2DC\uAC04 ${s}\uBD84`}function Ho(e,t){if(typeof e!="object"||e===null)return[];let n=new Map;for(let s of Object.values(e)){if(typeof s!="object"||s===null)continue;let o=s;if(o.bead_id!==t||o.kind!=="head_review"&&o.kind!=="head_repair")continue;let a=o.kind;n.set(a,(n.get(a)??!1)||o.origin==="auto")}let r=[];for(let[s,o]of[["head_review","\uB9AC\uBDF0"],["head_repair","\uC218\uB9AC"]]){let a=n.get(s);a!==void 0&&r.push(a?`${o} \xB7 \uC790\uB3D9`:o)}return r}function Go(e,t){if(typeof e!="object"||e===null)return null;let n=0,r=!1;for(let s of Object.values(e)){if(typeof s!="object"||s===null)continue;let o=s;if(o.bead_id!==t)continue;let a=o.started_at,i=o.finished_at;typeof a!="number"||typeof i!="number"||!Number.isFinite(a)||!Number.isFinite(i)||i<a||(n+=i-a,r=!0)}return r?n:null}function Vo(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";let t=new Date(e);return`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`}function Bg(e,t){let n=Array.isArray(e)?e:[],r=Array.isArray(t)?t:[];if(n.length===0&&r.length===0)return null;let s=null;for(let i of n)i.kind!=="deploy"||i.state!=="succeeded"||typeof i.target_sha!="string"||(!s||(typeof i.finished_at=="number"?i.finished_at:0)>(typeof s.finished_at=="number"?s.finished_at:0))&&(s=i);let o=n.filter(i=>i.state==="failed"&&!i.dismissed&&!i.superseded_by).length+r.length,a=n.some(i=>i.state==="repairing");return{deploy:s?{sha:zo(s.target_sha),at:typeof s.finished_at=="number"?s.finished_at:null,elapsed_ms:typeof s.elapsed_ms=="number"?s.elapsed_ms:null}:null,unresolved:o,repairing:a,badge:o>0?{tone:"act",label:`\uD574\uACB0 \uD544\uC694 ${o}`}:a?{tone:"live",label:"\uC790\uB3D9 \uD574\uACB0 \uC911"}:{tone:"quiet",label:"\uBAA8\uB450 \uC815\uC0C1"}}}function ed(e,t){let n=Bg(e,t);return n?l`<button
    type="button"
    class="worker-repo-strip"
    data-seam="repo-ops-strip"
    aria-label="저장소 작업 타임라인 열기"
  >
    <span class="worker-repo-strip__cue" aria-hidden="true">▸</span>
    <span class="worker-repo-strip__name">저장소 작업</span>
    ${n.deploy?l`<span class="worker-repo-strip__fact">
          배포
          <code class="worker-repo-strip__sha">${n.deploy.sha}</code>
          <span class="worker-repo-strip__ok">✓ 최신</span>
          <span
            class="worker-repo-strip__ago"
            title=${n.deploy.at?Wt(n.deploy.at):""}
            >${Vo(n.deploy.at)}${n.deploy.elapsed_ms!==null?` \xB7 ${As(n.deploy.elapsed_ms)}`:""}</span
          >
        </span>`:""}
    <span class="worker-repo-strip__spacer"></span>
    <span
      class="worker-repo-strip__badge worker-repo-strip__badge--${n.badge.tone}"
      >${n.badge.label}</span
    >
  </button>`:""}function jr(e){let t=an(e.created_at),n=an(e.updated_at);return!t&&!n?"":l`<div class="worker-mini__meta">
    ${t?l`<span title=${`\uC0DD\uC131 ${Wt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&n?l`<span>·</span>`:""}${n?l`<span title=${`\uC218\uC815 ${Wt(e.updated_at)}`}
          >수정 ${n}</span
        >`:""}
  </div>`}function Ug(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function Ss(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function Ko(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function xn(e,t,n={}){let s=Object.values(e&&typeof e=="object"?e:{}).filter(_=>_&&_.bead_id===t&&_.phase!=="done").sort((_,h)=>(_.requested_at||0)-(h.requested_at||0)).at(-1),o=typeof n.attempt_id=="string"&&n.attempt_id.length>0?n.attempt_id:typeof s?.attempt_id=="string"?s.attempt_id:null,a=n.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":n.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":n.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,i=typeof s?.last_error=="string"?s.last_error:null,c=s?Ug(s.phase):null,u=s?.kind==="stale_work_backup_fresh",d=n.merged||s?.mode==="merged_revert"?"merged":"unmerged";return{action:!n.external&&!n.done,enabled:!a&&(!s||!!i),label:u?i?"\uBC31\uC5C5 \uC815\uB9AC \uC7AC\uC2DC\uB3C4":"\uBC31\uC5C5 \uD6C4 \uC0C8\uB85C \uC2DC\uC791":i?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:a||(i?u?`\uBC31\uC5C5 \uB4A4 \uC815\uB9AC \uC2E4\uD328: ${i} \u2014 \uC6D0\uBCF8\uACFC \uAC80\uC99D \uC601\uC218\uC99D\uC744 \uBCF4\uC874\uD55C \uCC44 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:`\uD3D0\uAE30 \uC2E4\uD328: ${i} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:s?`${c||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:d==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:o,operation:s||null,progress:c,error:i,confirmation:d}}function xs(e){let t=e.discard;if(!t||!t.operation)return"";let n=t.operation,r=n.kind==="stale_work_backup_fresh"&&!t.error?null:n.backup?.path,s=n.original_pr,o=n.revert_pr;return l`<div
    class="worker-discard-receipt"
    role=${t.error?"alert":"status"}
  >
    <span>${t.progress}</span>
    ${t.error?l`<span>폐기 실패: ${t.error}</span>`:""}
    <code>작업: ${n.operation_id}</code>
    ${r?l`<code>백업: ${r}</code>`:t.error?l`<span>아직 아무것도 삭제하지 않음</span>`:""}
    ${s?.url?l`<a href=${s.url} target="_blank" rel="noreferrer noopener"
          >원본 PR #${s.number||"?"}</a
        >`:""}
    ${o?.url?l`<a href=${o.url} target="_blank" rel="noreferrer noopener"
          >revert PR #${o.number||"?"} ·
          ${o.state||"\uC0C1\uD0DC \uBBF8\uD655\uC778"}</a
        >`:""}
  </div>`}var Wg={dirty_unique:"\uCD5C\uC2E0 base\uC5D0 \uC5C6\uB294 \uB85C\uCEEC \uBCC0\uACBD\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",untracked_present:"\uCD94\uC801\uB418\uC9C0 \uC54A\uC740 \uD30C\uC77C\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",branch_ahead:"\uB85C\uCEEC branch\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",head_ahead:"worktree HEAD\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_not_contained:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 \uCD5C\uC2E0 base\uC5D0 \uD3EC\uD568\uB410\uC74C\uC744 \uC99D\uBA85\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ahead_merge_commit:"\uB85C\uCEEC branch\uC5D0 \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 merge commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_submodule_path:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 submodule \uACBD\uB85C\uB97C \uBCC0\uACBD\uD569\uB2C8\uB2E4",archive_failed:"\uACE0\uC720 commit \uBC31\uC5C5\uC744 \uC548\uC804\uD558\uAC8C \uAC80\uC99D\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ref_delete_failed:"\uD655\uC778\uB41C local branch\uB97C \uC548\uC804\uD558\uAC8C \uC0AD\uC81C\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",resume_available:"\uC774\uC5B4\uAC08 \uC218 \uC788\uB294 \uC774\uC804 Worker session\uC774 \uC788\uC2B5\uB2C8\uB2E4",observe_failed:"Git \uC0C1\uD0DC\uB97C \uC548\uC804\uD558\uAC8C \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",identity_changed:"\uD655\uC778 \uC911 worktree \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4",ownership_unknown:"Worker \uC18C\uC720 worktree\uC778\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"};function td(e,t=!1){if(!e||typeof e!="object")return null;let n=e;if(n.reason!=="worktree_stale_work"||!n.stale_work||typeof n.stale_work!="object")return null;let r=n.stale_work,s=r.residue==="branch"?"branch":"worktree",o=r.state==="unique"?"unique":"unknown",a=r.summary&&typeof r.summary=="object"?r.summary:{};function i(u){return Number.isInteger(a[u])?Number(a[u]):0}let c=typeof r.cause=="string"?r.cause:"observe_failed";return{residue:s,state:o,title:s==="branch"?"\uC774\uC804 \uBE0C\uB79C\uCE58 \uBCF4\uC874\uB428":o==="unique"?"\uC774\uC804 \uC791\uC5C5 \uBCF4\uC874\uB428":"\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",cause:Wg[c]||"\uC548\uC804\uD558\uAC8C \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 \uC774\uC804 \uC791\uC5C5\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",summary:s==="branch"?`\uACE0\uC720 commit ${i("branch_ahead")}`:[`staged ${i("staged_count")}`,`unstaged ${i("unstaged_count")}`,`untracked ${i("untracked_count")}`,`branch ahead ${i("branch_ahead")}`,`HEAD ahead ${i("head_ahead")}`].join(" \xB7 "),action_id:typeof r.action_id=="string"?r.action_id:"",can_resume:r.can_resume===!0,can_continue:r.can_continue===!0,can_backup_fresh:r.can_backup_fresh===!0,can_recheck:r.can_recheck===!0,locked:t}}function Yo(e,t={}){if(!e||!e.orchestration&&!e.worker)return"";let n=t.pin===!0?" exec-chip--pin":"",r=t.pin===!0?`
\uC774\uC288 \uD540 \u2014 \uB808\uD3EC \uAE30\uBCF8\uAC12\uACFC \uB2E4\uB984`:"";return l`${e.orchestration?l`<span
        class="exec-chip exec-chip--orch${n}"
        title=${`${e.orchestration.title}${r}`}
        ><span class="exec-chip__k">오케</span
        ><span class="exec-chip__v">${e.orchestration.text}</span></span
      >`:""}${e.worker?l`<span
        class="exec-chip exec-chip--worker${n}"
        title=${`${e.worker.title}${r}`}
        ><span class="exec-chip__k">워커</span
        ><span class="exec-chip__v">${e.worker.text}</span></span
      >`:""}`}var Wo=3;function zg(e){return l`<div
    class="mon-overlap__popover"
    role="dialog"
    aria-label="scope 겹침"
  >
    ${e.rows.map(t=>l`<div class="mon-overlap__row">
          <div class="mon-overlap__hd">
            <span class="mon-overlap__rid">${t.id}</span>
            <span class="mon-overlap__rtitle">${t.title}</span>
            <span class="mon-overlap__rwhere">${t.location_label}</span>
          </div>
          <ul class="mon-overlap__paths">
            ${t.prefixes.map(n=>l`<li>${n}</li>`)}
          </ul>
          ${t.action.kind==="note"?l`<p class="mon-overlap__note">${t.action.text}</p>`:l`<button
                type="button"
                class="mon-overlap__place"
                data-counterpart-id=${t.id}
                ?disabled=${t.action.kind==="disabled"}
                title=${t.action.title}
              >
                ${t.action.label}
              </button>`}
        </div>`)}
  </div>`}function Br(e,t={}){if(!e)return"";let n=Array.isArray(e.predecessors)?e.predecessors:[],r=Array.isArray(e.successors)?e.successors:[],s=Array.isArray(e.warnings)?e.warnings:[],o=Array.isArray(e.overlaps)?e.overlaps:[],a=e.scope_missing===!0&&t.lane!=="running",i=e.popover||null;if(n.length===0&&r.length===0&&s.length===0&&o.length===0&&!a)return"";let c=o.length>Wo,u=c?o.slice(0,Wo):o;return l`<div class="worker-deps">
    ${n.map(d=>l`<span class="worker-dep worker-dep--pred" title=${d.title||""}
          ><span class="worker-dep__label">${d.label}</span
          ><button
            type="button"
            class="worker-dep__remove"
            data-blocker-id=${d.id}
            aria-label=${`\uC120\uD589 ${d.id} \uC5F0\uACB0 \uD574\uC81C`}
            title="선행 연결 해제"
          >
            ✕
          </button></span
        >`)}${u.map(d=>l`<button
          type="button"
          class="worker-dep worker-dep--overlap mon-overlap__chip"
          data-overlap-id=${d.id}
          title=${d.prefixes.join(`
`)}
        >
          ⧉ 겹침 ${d.id} (${d.location_label})
        </button>`)}${c?l`<button
          type="button"
          class="worker-dep worker-dep--overlap mon-overlap__chip mon-overlap__chip--more"
          data-overlap-all="true"
          title=${o.slice(Wo).map(d=>`${d.id} (${d.location_label})`).join(`
`)}
        >
          +${o.length-Wo}
        </button>`:""}${a?l`<span
          class="worker-dep worker-dep--muted"
          title="겹침 판정 불가 — 아티팩트가 있으면 스펙/플랜 front-matter, 없으면 description \`## scope\`에 선언 필요"
          >scope 없음</span
        >`:""}${r.map(d=>l`<span class="worker-dep worker-dep--succ" title=${d.title||""}
          >${d.label}</span
        >`)}${s.map(d=>l`<span class="worker-dep worker-dep--warn">${d}</span>`)}${i?zg(i):""}
  </div>`}function Ur(e){if(!e)return"";let t=e.chips||{},n=t.route||e.route,r=t.route_source==="derived"||e.route_source==="derived";return n?l`<span
    class="ctl-chip ctl-chip--route${r?" is-derived":""}"
    title=${r?"route \uBBF8\uD540 (metadata unset)":"route"}
    >${r?"unset":n}</span
  >`:""}function nd(e){return e?l`<button
    type="button"
    class="ctl-chip ctl-chip--from"
    data-from-id=${e}
    title=${`\uCD9C\uCC98 ${e} \uC5F4\uAE30`}
  >
    ↩ from ${e}
  </button>`:""}function Zo(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=Math.max(0,Math.min(4,Math.trunc(e)));return l`<span class="worker-pri" title=${`\uC6B0\uC120\uC21C\uC704 P${t}`}
    >P${t}</span
  >`}function Hg(e){let t=Array.isArray(e.badges)?e.badges:[],n=zt(e.usage),r=Pn(e.usage),s=an(e.done_at);return l`<div
    class="worker-mini worker-mini--static worker-mini--done worker-mini--three-line"
    draggable="false"
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    <div class="worker-mini__row1">
      ${e.workspace_name?l`<span class="worker-mini__repo" title=${e.root_dir||""}
            >${e.workspace_name}</span
          >`:""}
      <span class="worker-mini__id" title="클릭하면 ID 복사">${e.id}</span>
      ${s?l`<span
            class="worker-mini__done-at"
            title=${`\uC644\uB8CC ${Wt(e.done_at)}`}
            >완료 ${s}</span
          >`:""}
      ${t.map(o=>l`<span
            class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
            >${o}</span
          >`)}
    </div>
    <div class="worker-mini__row2">
      <span class="worker-mini__title">${e.title}</span>
    </div>
    <div class="worker-mini__row3">
      ${n.length>0?n.map(o=>l`<span class="worker-usage" title=${o.tooltip}
                >${o.label}</span
              >`):r?l`<span class="worker-usage" title=${is(e.usage)}
              >${r}</span
            >`:""}
      ${typeof e.work_ms=="number"?l`<span
            class="worker-mini__work"
            title="attempt 실행 시간 합산 (재개 세션 포함)"
            >작업 ${As(e.work_ms)}</span
          >`:""}
    </div>
  </div>`}function Kn(e){if(e.lane==="done"&&e.done_layout==="three_line")return Hg(e);let t=e.draggable&&!e.done,n=Array.isArray(e.badges)?e.badges:[],r=zt(e.usage),s=Pn(e.usage),o=e.merge_step||null,a=e.lane==="pr_wait"||!!e.revise_action||!!e.stale_work,i=e.lane==="done"&&!a,c=i?an(e.done_at):"",u=t?l`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",d=typeof e.seq=="number"?l`<span class="worker-mini__seq" aria-hidden="true"
          >${e.seq}</span
        >`:"",_=e.worker_serial===!0?l`<span
          class="worker-mini__serial worker-mini__serial--legacy"
          title="legacy worker-serial 라벨 잔재 — 스케줄링에 사용되지 않습니다"
          >worker-serial</span
        >`:"",h=e.workspace_name?l`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",w=l`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,$=e.lane==="done"?"":Ur(e.workflow),P=nd(e.from_id),z=Zo(e.priority),Q=l`<span class="worker-mini__title">${e.title}</span>`,ae=e.pr_url&&e.pr_number?l`<a
          class="worker-mini__pr"
          href=${e.pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="PR 열기"
          >#${e.pr_number} ↗</a
        >`:"",N=e.completion_repair_pr_url&&e.completion_repair_pr_number?l`<a
          class="worker-mini__pr worker-mini__repair-pr"
          href=${e.completion_repair_pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="repair PR 열기"
          >repair #${e.completion_repair_pr_number} ↗</a
        >`:"",M=n.map(ce=>ce===e.live_badge?l`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${ce}</span
        >`:l`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${ce===e.completion_badge&&e.completion_title||""}
          >${ce}</span
        >`),q=e.reason?l`<span class="worker-mini__reason">${e.reason}</span>`:"",G=r.length>0?r.map(ce=>l`<span class="worker-usage" title=${ce.tooltip}
              >${ce.label}</span
            >`):s?l`<span class="worker-usage" title=${is(e.usage)}
            >${s}</span
          >`:"",E=o?l`<span
        class="merge-step${o.failed?" merge-step--failed":""}"
        style=${`--progress: ${o.percent}%`}
        >${o.label}${o.index>0?l`<span class="merge-step__n"
              >${o.index}/${o.total}</span
            >`:""}</span
      >`:"",W=e.merge_action?l`<button
        type="button"
        class="worker-mini__merge"
        data-bead-id=${e.id}
        ?disabled=${e.merge_enabled===!1}
        title=${e.merge_title||""}
      >
        ${e.merge_label||"\uBA38\uC9C0"}
      </button>`:"",B=e.cancel_action?l`<button
        type="button"
        class="worker-mini__merge-cancel"
        data-bead-id=${e.id}
        ?disabled=${e.cancel_enabled===!1}
        title=${e.cancel_title||""}
      >
        취소
      </button>`:"",ve=e.timeline_action?l`<button
        type="button"
        class="worker-mini__timeline"
        data-bead-id=${e.id}
        title="저장소 작업이 끝나지 않아 머지 액션이 잠겼습니다 — 타임라인에서 원인과 해결 버튼을 볼 수 있습니다"
      >
        저장소 작업 보기
      </button>`:"",fe=e.discard,ge=fe?.action||e.discard_action?l`<button
          type="button"
          class="worker-mini__discard"
          data-bead-id=${e.id}
          data-attempt-id=${fe?.attempt_id||""}
          data-operation-id=${fe?.operation?.operation_id||""}
          data-discard-mode=${fe?.confirmation||"unmerged"}
          ?disabled=${fe?!fe.enabled:e.discard_enabled===!1}
          title=${fe?fe.title:e.discard_enabled===!1?e.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
        >
          ${fe?.label||"\uD3D0\uAE30"}
        </button>`:"",V=e.stale_work||null,Te=V?l`${V.can_resume||V.can_continue?l`<button
            type="button"
            class="worker-mini__stale-continue"
            data-bead-id=${e.id}
            data-action-id=${V.action_id}
            ?disabled=${V.locked}
          >
            기존 작업 이어가기
          </button>`:""}${V.can_backup_fresh?l`<button
            type="button"
            class="worker-mini__stale-backup"
            data-bead-id=${e.id}
            data-action-id=${V.action_id}
            ?disabled=${V.locked}
          >
            백업 후 새로 시작
          </button>`:""}${V.can_recheck?l`<button
            type="button"
            class="worker-mini__stale-recheck"
            data-bead-id=${e.id}
            data-action-id=${V.action_id}
            ?disabled=${V.locked}
          >
            다시 확인
          </button>`:""}`:"",Re=V?l`<div class="worker-mini__stale">
        <strong>${V.title}</strong>
        <span>${V.summary}</span>
        <span>${V.cause}</span>
        ${V.can_backup_fresh?l`<small
              >Git-ignored dependency/build output은 archive에 포함되지
              않습니다</small
            >`:""}
      </div>`:"",ie=e.revise_action?l`<button
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
        </button>`:"",de=e.lane!=="pr_wait"&&!e.done&&e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)?l`<div class="worker-mini__exec">
          ${Yo(e.exec_chips,{pin:e.exec_chips_pinned===!0})}
        </div>`:"",Ae=Br(e.dependency_chips,{lane:e.lane}),H=xs(e),te=!!(s||o||e.merge_action||e.cancel_action||e.timeline_action||e.discard_action||fe?.operation||e.revise_action||V);return l`<div
    class="worker-mini${a?" worker-mini--card":""}${t?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${e.ghost?" worker-mini--ghost":""}${o?" worker-mini--merging":""}${o?.failed?" worker-mini--merge-failed":""}${e.external?" worker-mini--external":""}"
    style=${o?`--progress: ${o.percent}%`:""}
    draggable=${t?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${i?l`<div class="worker-mini__row1">
            ${h}${w}${z}${P}${Q}
          </div>
          <div class="worker-mini__row2">
            ${G}${c?l`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${Wt(e.done_at)}`}
                  >완료 ${c}</span
                >`:""}${typeof e.work_ms=="number"?l`<span
                  class="worker-mini__work"
                  title="attempt 실행 시간 합산 (재개 세션 포함)"
                  >작업 ${As(e.work_ms)}</span
                >`:""}${M}${E}
            <span class="worker-mini__actions"
              >${W}${B}${ve}${ge}</span
            >
            ${jr(e)}
          </div>`:a?l`<div class="worker-mini__head">
              ${u}${d}${h}${w}${z}${$}${P}${ae}${N}${M}${_}${q}
            </div>
            <div class="worker-mini__body">${Q}${Re}</div>
            ${Ae}${de}${te?l`<div class="worker-mini__foot">
                  ${G}${E}
                  <span class="worker-mini__actions"
                    >${W}${B}${ve}${ge}${ie}${Te}</span
                  >
                  ${xs(e)}
                </div>`:""}
            ${jr(e)}`:l`<div class="worker-mini__line">
              ${u}${d}${h}${w}${z}${$}${P}${Q}${ae}${N}${M}${_}${q}${G}${E}${W}${B}${ve}${ge}
            </div>
            ${Ae}${de}${H} ${jr(e)}`}
  </div>`}function $i(e,t=null,n={}){let r=e.worker_ineligible===!0,s=e.draggable&&!e.done&&!r,o=s&&t&&t.bead_id===e.id,a=e.workflow,i=typeof e.reason=="string"&&e.reason.split(" \xB7 ").includes("missing_description"),c=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),u=Br(e.dependency_chips,{lane:e.lane});return l`<div
    class="worker-card${s?"":" worker-card--static"}${r?" worker-card--ineligible":""}"
    draggable=${s?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    <div class="worker-card__head">
      ${s?l`<span class="worker-card__grip" aria-hidden="true">⠿</span>`:""}
      ${e.workspace_name?l`<span class="worker-card__repo" title=${e.root_dir||""}
            >${e.workspace_name}</span
          >`:""}
      <span class="worker-card__id" title="클릭하면 ID 복사">${e.id}</span
      >${Zo(e.priority)}
      ${Ur(a)}${r?l`<span
            class="ctl-chip ctl-chip--label worker-card__ineligible"
            title="worker-ineligible label이 붙어 워커 실행 대상이 아닙니다"
            >worker-ineligible</span
          >`:""}${nd(e.from_id)}
    </div>
    <div class="worker-card__title">${e.title}</div>
    ${a?lo(a,e.status,{onOpenDoc:n.onOpenDoc}):""}${u}
    ${e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)?l`<div class="worker-mini__exec">
          ${Yo(e.exec_chips,{pin:n.exec_chips_mode==="pinned_only"})}
        </div>`:""}
    <div
      class="worker-card__foot${e.reason?"":" worker-card__foot--actions-only"}"
    >
      ${o?l`<div class="worker-card__place-menu">
            ${t.lanes.map(d=>l`<button
                  type="button"
                  class="worker-card__place-lane"
                  data-bead-id=${e.id}
                  data-lane=${d.id}
                  title="${d.label} 대기 맨 뒤에 추가"
                >
                  <span>${d.label}</span>
                  <span class="worker-card__place-count">${d.count}</span>
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
                  class="worker-card__reason${c?" worker-card__reason--danger":""}"
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
              ?disabled=${!s}
              title=${s?"\uB300\uAE30 \uD050 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00":r?"worker-ineligible label\uB85C \uC6CC\uCEE4\uC5D0\uC11C \uC2E4\uD589\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":i?"description\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"spec\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}
            >
              대기로 ↴
            </button>`}
    </div>
    ${jr(e)}
  </div>`}function gn(e){let t=!!e.collapsible&&!!e.collapsed,n=l`<span
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
          ${n}
          <span class="worker-pane__caret" aria-hidden="true"
            >${t?"\u25B8":"\u25BE"}</span
          >
        </button>`:l`<header class="worker-pane__hd">
          ${n}${e.header_control?e.header_control:""}
        </header>`}
    ${t?"":l`${e.controls?e.controls:""}
          <div class="worker-pane__body">
            ${e.body?e.body:e.items.length===0?l`<div class="worker-pane__empty">
                    ${e.empty||""}
                  </div>`:e.items.map(r=>e.lane==="candidate"?$i(r,e.place_menu,{onOpenDoc:e.onOpenDoc}):Kn(r))}
          </div>`}
  </section>`}var rd={verify_failed:"\uAC80\uC99D \uC2E4\uD328",verify_cmd_failed:"\uAC80\uC99D \uC2E4\uD328",verify_script_failure:"\uAC80\uC99D \uC2E4\uD328",deploy_failed:"\uBC30\uD3EC \uC2E4\uD328",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328",interrupted_without_terminal_exit:"\uC911\uB2E8\uB428"},sd={repo_ops_worktree_unowned:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uAC00 \uC544\uC9C1 Worker \uC18C\uC720\uAC00 \uC544\uB2C8\uC5B4\uC11C \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804\uC5D0 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",verify_cmd_failed:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D \uBA85\uB839\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",gh_observation_failed:"GitHub\uC5D0\uC11C PR \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_script_failure:"\uAC80\uC99D \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",deploy_script_failure:"\uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",interrupted_without_terminal_exit:"\uC791\uC5C5\uC774 \uC885\uB8CC \uAE30\uB85D \uC5C6\uC774 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",base_unresolved:"PR\uC774 \uC5B4\uB290 base \uBE0C\uB79C\uCE58\uB85C \uBA38\uC9C0\uB418\uB294\uC9C0 \uD655\uC815\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ref_unobserved:"PR\uC758 base \uBE0C\uB79C\uCE58\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",merge_sha_unobserved:"\uBA38\uC9C0 \uCEE4\uBC0B SHA\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_fetch_failed:"\uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uB97C fetch\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_rev_unavailable:"fetch\uD55C \uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uC758 \uCEE4\uBC0B\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ff_diverged:"\uB85C\uCEEC base \uBE0C\uB79C\uCE58\uAC00 \uC6D0\uACA9\uACFC \uAC08\uB77C\uC838 fast-forward\uB85C \uC815\uB82C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",deployment_target_not_covering_merge:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",deployment_candidate_ancestry_check_failed:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uB294\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."};function od(e){return typeof e!="string"||e.length===0?[]:e.split(":").filter(t=>t.length>0)}function xi(e){for(let t of od(e))if(Object.hasOwn(rd,t))return rd[t];return null}function Ai(e){let t=null;for(let n of od(e))Object.hasOwn(sd,n)&&(t=sd[n]);return t}function Qo(e){let t=xi(e),n=Ai(e);return t&&n?`${t} \u2014 ${n}`:t||n?t||n:typeof e=="string"?e:""}function ad(e,t){let n=xi(e)??xi(t),r=Ai(t)??Ai(e);return n&&r?`${n} \u2014 ${r}`:n||r?n||r:typeof t=="string"?t:""}var id=160;function Gg(e){return e.length>id?`${e.slice(0,id)}\u2026`:e}function Vg(e){return!e||!e.reason?"":l`<div class="worker-banner__detail">
    가드:
    ${e.reason}${e.command?l` · <code>${Gg(e.command)}</code>`:""}
  </div>`}function Kg(e){return e?l`<details class="worker-banner__raw">
    <summary>세부</summary>
    <dl class="worker-banner__kv">
      <div>
        <dt>실패 코드</dt>
        <dd>${e}</dd>
      </div>
    </dl>
  </details>`:""}function Yg(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),n=Math.floor(t/60),r=t%60;return n>0?`${n}m ${String(r).padStart(2,"0")}s`:`${r}s`}function ld(e){let t=e.failure?Qo(e.failure.reason):"";return l`<div class="worker-banners">
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
          ${Vg(e.failure.cause_detail)}
          ${Kg(e.failure.reason)}
          ${xs({discard:e.failure.discard})}
        </div>`:""}
  </div>`}function Zg(e){return e?l`${e.repo?l`<span
        class="worker-card__repo rtile__repo"
        title=${e.root_dir||""}
        >${e.repo}</span
      >`:""}${e.serial_lane_id?l`<span class="rtile__lane">${e.serial_lane_id}</span>`:""}`:""}var Qg=new Set(["codex-runner"]);function Xg(e,t,n,r=null){if(!e)return"";let s=e.last_activity||null,o=s&&typeof s.text=="string"?s.text:"",a=s&&typeof s.at=="number"?s.at:null,i=(r||!Array.isArray(e.legs)?[]:e.legs).filter(h=>h&&!(typeof h.agent_type=="string"&&Qg.has(h.agent_type))),c=i.filter(h=>h&&h.state==="live"),u=i.filter(h=>h&&h.state!=="live"),d=Br(e.dependency_chips,{lane:"running"}),_=r?an(r.updated_at,t):"";return l`${o?l`<div class="rtile__activity${n?" is-paused":""}">
        <span class="rtile__activity-dot" aria-hidden="true"></span>
        <span class="rtile__activity-text">${o}</span>
        ${a!==null?l`<span class="rtile__activity-age"
              >${an(a,t)}</span
            >`:""}
      </div>`:_?l`<div class="rtile__activity rtile__activity--session">
          <span class="rtile__activity-dot" aria-hidden="true"></span>
          <span class="rtile__activity-text">갱신 ${_}</span>
        </div>`:""}${c.length>0||u.length>0?l`<div class="rtile__legs">
        ${c.map(h=>l`<span
              class="rtile__leg rtile__leg--live"
              title="이 세션이 띄운 서브에이전트/Codex 세션이 실행 중입니다"
              >위임 중 · ${h.label}</span
            >`)}${u.length>0?l`<span
              class="rtile__leg rtile__leg--done"
              title=${`\uC644\uB8CC\uB41C \uC704\uC784: ${u.map(h=>h.label).join(", ")}`}
              >위임 완료 ${u.length}</span
            >`:""}
      </div>`:""}${d}`}function Si(e,t,n=null,r={}){let s=e.kind==="session",o=e.failed===!0,a=!!e.paused,i=o?e.status_label||(e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):a?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?Yg(t-e.started_at):"\u2014",c=e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)?e.exec_chips:null,u=ss(e),d=zt(e.usage),_=Pn(e.usage),h=e.conflict_resolution?a?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,w=e.base_exception||null,$=e.landing,P=e.attempt_id&&e.attempt_id===n,z=r.monitor||null,Q=Zg(z),ae=Xg(z,t,a,s?{updated_at:e.updated_at??null}:null),N=s&&e.workflow?.chips?.exec_receipt||null,M=Ur(e.workflow),q=N?l`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${On(N)}`}
        >${`${N.kind}:${co(N)}`}</span
      >`:"",G=M||q?l`<div class="rtile__meta">
          ${M}${q}
        </div>`:"",E=s?"":jr(e),W=e.discard?.action?l`<button
        type="button"
        class="rtile__discard"
        data-operation-id=${e.discard.operation?.operation_id||""}
        ?disabled=${!e.discard.enabled}
        title=${e.discard.title}
        aria-label=${e.discard.label}
      >
        ${e.discard.label}
      </button>`:"";return l`<div
    class="rtile${P?" rtile--sel":""}${a?" rtile--paused":""}${o?" rtile--failed":""}${s?" rtile--session":""}"
    data-bead-id=${e.bead_id}
    data-attempt-id=${e.attempt_id||""}
  >
    <div class="rtile__hd">
      <span
        class="rtile__dot${s?" rtile__dot--session":""}"
        aria-hidden="true"
      ></span>
      <span class="rtile__id" title="클릭하면 ID 복사">${e.bead_id}</span>
      ${Zo(e.priority)}${Q}${u?l`<span class="rtile__resumed" title=${u}>↻</span>`:""}
      <div class="rtile__hd-actions">
        ${s?l`${typeof e.started_at=="number"?l`<span class="rtile__elapsed">${i}</span>`:""}<span
                class="rtile__session-badge"
                title="Worker가 아닌 세션이 in_progress로 잡은 이슈"
                >세션</span
              >`:l`<span class="rtile__elapsed">${i}</span>`}
        ${s?"":o?l`<button
                  type="button"
                  class="rtile__resume"
                  ?disabled=${e.resume_eligible===!1}
                  title=${e.resume_eligible===!1?e.resume_reason||"\uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uAC19\uC740 \uC138\uC158\uC73C\uB85C \uC774\uC5B4\uC11C \uC9C4\uD589"}
                  aria-label="이어하기"
                >
                  ↻ 이어하기
                </button>
                ${W}
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
                ${a?l`<button
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
                ${W}`}
      </div>
    </div>
    <div class="rtile__title">${e.title}</div>
    ${ae}${e.rollup?io(e.rollup,{parent_id:e.bead_id,expanded:e.rollup_expanded===!0,childChips:Da}):""}
    ${$?l`<div class="rtile__landing">
          <span
            class="merge-step${$.failed?" merge-step--failed":""}"
            style=${`--progress: ${$.percent}%`}
            >${$.label}${$.index>0?l`<span class="merge-step__n"
                  >${$.index}/${$.total}</span
                >`:""}</span
          >
        </div>`:""}
    ${s?G:M||c||d.length>0||_||h||w?l`<div class="rtile__meta">
            ${M}${h?l`<span class="worker-mini__badge">${h}</span>`:""}
            ${w?l`<span
                  class="worker-mini__badge"
                  title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
                  >${w}</span
                >`:""}
            ${Yo(e.exec_chips)}
            ${d.length>0?d.map(B=>l`<span class="worker-usage" title=${B.tooltip}
                      >${B.label}</span
                    >`):_?l`<span
                    class="worker-usage"
                    title=${is(e.usage)}
                    >${_}</span
                  >`:""}
          </div>`:""}
    ${E} ${xs(e)}
    <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일).
         quick_fix landing의 실제 진행은 위의 별도 진행 줄이 소유한다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
    ${o||a?"":l`<div class="rtile__accent" aria-hidden="true"></div>`}
  </div>`}function Ei(e,t=Date.now(),n=null,r=null){let s=Array.isArray(e)?e:[];return l`<div class="worker-rungrid" id="worker-rungrid">
    ${s.length===0?l`<div class="worker-rungrid__empty">실행 세션 없음</div>`:s.map(o=>Si(o,t,n,{monitor:r&&r.get(o.bead_id)||null}))}
  </div>`}var Ti=new Set(["unavailable","not_applicable"]);function Yn(e,t){if(typeof e!="object"||e===null)return null;let n=e[t];return typeof n=="object"&&n!==null?n:null}function cd(e){return e.filter(t=>t!==null).join(" \xB7 ")}function Zn(e,t){return t===null?null:`${Vn[e]}: ${t.display} (${Do[t.source]})`}function Ci(e){return e.filter(t=>t!==null).join(`
`)}function Es(e){if(typeof e!="object"||e===null)return null;let t=ur(e);if(t==="")return null;let n=(r,s)=>typeof s=="string"&&s.length>0?`${r}: ${s}`:null;return{text:t,title:Ci(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uC774 attempt\uC5D0 \uAE30\uB85D\uB41C \uC2E4\uD589\uAC12",n("runner",e.runner),n(Vn.orchestration_model,e.model),n(Vn.orchestration_effort,e.effort),n(Vn.orchestration_speed,e.speed)])}}function _r(e,t){let n=Yn(e,"orchestration_model");if(n===null||n.resolution==="unavailable")return null;let r=Yn(e,"orchestration_effort"),s=Yn(e,"orchestration_speed"),o=cd([$n(t,n.value??""),n.display,r!==null&&r.value!==null?r.display:null,s!==null&&s.value==="fast"?"Fast":null]);return o===""?null:{text:o,title:Ci(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uD050 \uAE30\uBCF8\uAC12)",Zn("orchestration_model",n),Zn("orchestration_effort",r),Zn("orchestration_speed",s)])}}function Jg(e,t){return e===null||e.value===null||Ti.has(e.resolution)?null:e.value!=="inherit"?e.value:t?`inherit\u2192${t}`:"inherit"}function eh(e){return e===null||Ti.has(e.resolution)?null:e.value==="auto"?"auto":e.display}function th(e){return e===null?null:e.value==="auto"?"auto":Ti.has(e.resolution)?null:e.display}function Qn(e,t){if(typeof e!="object"||e===null)return null;let n=Yn(e,"impl_dispatch"),r=Yn(e,"impl_runtime"),s=Yn(e,"impl_model"),o=Yn(e,"impl_effort"),a=Yn(e,"impl_speed"),i=n!==null&&n.value==="main"?"\uBA54\uC778":cd([Jg(r,t??null),eh(s),th(o),a!==null&&a.value==="fast"?"Fast":null]);return i===""?null:{text:i,title:Ci(["\uC6CC\uCEE4(\uAD6C\uD604 \uC704\uC784) \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uC804\uC5ED kv > \uAE30\uBCF8). \uC2E4\uD589 \uC911\uC774\uBA74 \uC138\uC158\uC774 \uC2DC\uC791 \uC2DC \uACE0\uC815\uD55C \uAC12\uACFC \uB2E4\uB97C \uC218 \uC788\uC74C",Zn("impl_dispatch",n),Zn("impl_runtime",r),Zn("impl_model",s),Zn("impl_effort",o),Zn("impl_speed",a)])}}var Ht="",nh=["impl_runtime","impl_model","impl_effort"],rh=5,Xo=1;function nn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Jo(e,t){let n=t.transport,r=typeof t.root_dir=="string"&&t.root_dir.length>0?t.root_dir:null,s=t.notify||(L=>ue(L,"error",4e3)),o={},a={},i=[],c=!1,u={state:"absent",values:{},warnings:[]},d={},_={claude:null,codex:null},h=!1,w=null,$={},P="",z="",Q=!1,ae=!1,N=!1,M=null,q=!1;function G(){let L=t.queue?t.queue():null;return nn(L)?L:null}function E(){let L=G();return L?L.runner_catalog:null}function W(){let L=G();return L&&nn(L.execution_defaults)?L.execution_defaults:null}function B(){let L=t.implPresetStore?.get();return nn(L)&&Array.isArray(L.presets)?L:null}function ve(){return r===null?{}:{root_dir:r}}async function fe(L,U){return q||!n?null:await n(L,U)}function ge(L){L&&nn(L.queue)&&t.onQueueAdopt?.(L.queue)}async function V(L,U){let Y=G();if(!Y||q)return null;let ne=await fe(L,{...U,...ve(),expected_revision:Y.revision});if(ge(ne),r!==null&&ne&&ne.conflict){let xe=ne.queue&&typeof ne.queue.revision=="number"?ne.queue.revision:G()?.revision??Y.revision;ne=await fe(L,{...U,...ve(),expected_revision:xe}),ge(ne)}return ne}async function Te(){c=!0,Ye();try{let L=await fe("get-session-defaults",{...ve()});o=nn(L?.values)?{...L.values}:{},a={...o},i=Array.isArray(L?.warnings)?L.warnings:[]}catch(L){i=["kv_read_failed"],s(`\uC138\uC158 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${L instanceof Error?L.message:String(L)}`)}finally{c=!1,Ye()}}async function Re(){let L=Ru(o,a);if(Object.keys(L).length!==0){try{let U=await fe("set-session-defaults",{values:L,...ve()});o=nn(U?.values)?{...U.values}:{},a={...o},i=Array.isArray(U?.warnings)?U.warnings:[]}catch(U){s(`\uC138\uC158 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${U instanceof Error?U.message:String(U)}`)}Ye()}}function ie(L){if(!nn(L))return;let U=L.state;u={state:U==="usable"||U==="unusable"||U==="absent"?U:"absent",values:nn(L.values)?{...L.values}:{},warnings:Array.isArray(L.warnings)?L.warnings:[]},d={...u.values}}async function de(){try{ie(await fe("get-workspace-accounts",{...ve()}))}catch(L){u={state:"unusable",values:{},warnings:["kv_read_failed"]},d={},s(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${L instanceof Error?L.message:String(L)}`)}Ye()}async function Ae(L){try{let U=await fetch(L);if(!U.ok)return null;let Y=await U.json();if(!nn(Y)||!Array.isArray(Y.accounts))return null;let ne=Y.accounts.filter(xe=>nn(xe)&&typeof xe.key=="string"&&xe.key.length>0&&typeof xe.email=="string"&&xe.email.length>0);return{accounts:ne,active:ne.find(xe=>xe.active===!0)||null}}catch{return null}}async function H(){h=!0;let[L,U]=await Promise.all([Ae("/api/claude-usage"),Ae("/api/codex-usage")]);q||(_={claude:L,codex:U},Ye())}async function te(L){let U=Object.hasOwn(d,L)?d[L]:null;try{ie(await fe("set-workspace-accounts",{values:{[L]:U},...ve()}))}catch(Y){s(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${Y instanceof Error?Y.message:String(Y)}`)}Ye()}function ce(L,U){U===Ht?delete d[L]:d[L]=U,Ye(),te(L)}function ke(L,U){if(nh.includes(L)){we(L,U);return}U===Ht?delete a[L]:a[L]=U,Ye(),Re()}function be(){let L=$t().orchestration_model,U=tn({global:{orchestration_model:L??void 0},execution_defaults:W(),runner_catalog:E()}).orchestration_model.value;return U?$n(E(),U):null}function je(L,U){typeof U=="string"&&U.length>0?a[L]=U:delete a[L]}function we(L,U){let Y=U===Ht?void 0:U,ne=Tu({impl_runtime:L==="impl_runtime"?Y:a.impl_runtime,impl_model:L==="impl_model"?Y:a.impl_model,impl_effort:L==="impl_effort"?Y:a.impl_effort},E(),be());je("impl_runtime",ne.impl_runtime),je("impl_model",ne.impl_model),je("impl_effort",ne.impl_effort),Ye(),Re()}async function Je(){let L=G();if(!L)return;let U={orchestration_model:L.orchestration_model??null,orchestration_effort:L.orchestration_effort??null,orchestration_speed:L.orchestration_speed??null},Y=Ou(U,{...U,...$});if(Object.keys(Y).length!==0){try{let ne=await V("worker-queue-set-orchestration-defaults",{values:Y});if(ne&&ne.applied===!1){s("Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC");return}$={}}catch(ne){s(`Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${ne instanceof Error?ne.message:String(ne)}`)}Ye()}}function it(L,U){$[L]=U===Ht?null:U,Ye(),Je()}function I(L){if(w=L,!L){Ye();return}let U=E(),Y=$t(),ne=Y.orchestration_model;ne&&!ks(U,L).includes(ne)&&($.orchestration_model=null,ne=null);let xe=Y.orchestration_effort;xe&&!gi(U,L,ne||un).includes(xe)&&($.orchestration_effort=null),Ye(),Je()}async function me(L){if(!(!G()||L<Xo)){try{await V("worker-queue-set-slots",{slots:L})}catch(U){s(`slots \uC800\uC7A5 \uC2E4\uD328: ${U instanceof Error?U.message:String(U)}`)}Ye()}}async function $e(L){if(!(!G()||L<Xo||L>rh)){try{await V("worker-queue-set-serial-lane-count",{count:L})}catch(U){s(`\uC9C1\uB82C \uB808\uC778 \uC800\uC7A5 \uC2E4\uD328: ${U instanceof Error?U.message:String(U)}`)}Ye()}}async function Se(L,U){let Y=L==="auto_advance"?"worker-automation-toggle":L==="auto_merge"?"worker-merge-auto-toggle":"worker-auto-repair-toggle";try{await V(Y,{on:U})}catch(ne){s(`\uC790\uB3D9\uD654 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${ne instanceof Error?ne.message:String(ne)}`)}Ye()}function Ge(){let L={},U=$t();for(let Y of Lo){let ne=Fn.includes(Y)?U[Y]:a[Y];typeof ne=="string"&&ne.length>0&&(L[Y]=ne)}return L}async function qe(){let L=B();if(!L)return;let U=Ge();if(Object.keys(U).length===0){s("\uC800\uC7A5\uD560 \uC2E4\uD589 \uC124\uC815\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uBA3C\uC800 \uC2E4\uD589 \uAC12\uC744 \uC120\uD0DD\uD558\uC138\uC694");return}let Y=(L.presets||[]).find(xe=>xe.id===P),ne=z.trim()||(Y?Y.name:"");if(!ne){s("\uD504\uB9AC\uC14B \uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694");return}try{let xe=Y?await fe("impl-preset-update",{expected_revision:L.revision,id:Y.id,name:ne,settings:U}):await fe("impl-preset-create",{expected_revision:L.revision,name:ne,settings:U});if(xe&&xe.applied){if(z="",!Y&&Array.isArray(xe.presets)){let He=xe.presets.find(Z=>Z.name===ne);P=He?He.id:P}Ye()}else s("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),Ye()}catch(xe){s(`\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: ${xe instanceof Error?xe.message:String(xe)}`)}}async function K(){let L=B();if(!(!L||P.length===0))try{let U=await fe("impl-preset-delete",{expected_revision:L.revision,id:P});U&&U.applied?(P="",Ye()):(s("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),Ye())}catch(U){s(`\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: ${U instanceof Error?U.message:String(U)}`)}}function X(L){o=nn(L.values)?{...L.values}:{},a={...o},i=Array.isArray(L.warnings)?L.warnings:[],nn(L.queue)&&(t.onQueueAdopt?.(L.queue),$={})}async function Me(){let L=B(),U=G();if(!L||!U||P.length===0)return;let Y=ne=>({preset_id:P,expected_revision:L.revision,expected_queue_revision:ne,...ve()});try{let ne=await fe("apply-impl-preset-global",Y(U.revision));if(ne&&ne.applied&&X(ne),r!==null&&ne&&ne.queue_applied===!1){let xe=ne.queue&&typeof ne.queue.revision=="number"?ne.queue.revision:G()?.revision??U.revision;ne=await fe("apply-impl-preset-global",Y(xe)),ne&&ne.applied&&X(ne)}ne&&ne.applied?ne.queue_applied===!1&&s("\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uAC12\uC740 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694"):ne&&ne.conflict&&s("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: \uD504\uB9AC\uC14B\uC774 \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4")}catch(ne){s(`\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: ${ne instanceof Error?ne.message:String(ne)}`)}Ye()}async function et(){ae=!0,N=!1,Ye();try{let L=await fe("get-worker-system-prompt",{});!L||typeof L!="object"||Array.isArray(L)?N=!0:M=L}catch{N=!0}finally{ae=!1,Ye()}}function Ve(){if(Q=!Q,Q&&!M){et();return}Ye()}function De(){let L=Mr({loading:ae,error:N});if(L)return L;if(!M)return"";let U=Array.isArray(M.variants)?M.variants:[];return l`<div class="settings-dialog__sp-body">
      ${M.target_base_placeholder?l`<div class="prompt-block__meta">
            \`${M.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${U.map(Y=>l`<div class="settings-dialog__sp-variant" data-variant=${Y.key}>
            <div class="settings-dialog__sp-cond">${Y.condition}</div>
            ${qn(Y.label,Y.system_prompt)}
          </div>`)}
    </div>`}function Ke(){return l`<section
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
        aria-expanded=${Q?"true":"false"}
        @click=${Ve}
      >
        ${Q?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
      </button>
      ${Q?De():""}
    </section>`}function st(L,U,Y,ne,xe,He,Z){let ee=xe[L]??Ht,Oe=hi(L,Y,xe,W(),E(),Z),S=Oe.options.find(k=>k.value===ee),g=ee===Ht?Oe.full_value:S?.full_value;return l`<select
        class=${ee===Ht?"settings-dialog__unset":""}
        data-key=${L}
        aria-label=${U}
        title=${g||""}
        ?disabled=${He===!0||Oe.disabled}
        .value=${fr(String(ee))}
        @change=${k=>ne(L,String(k.target.value))}
      >
        <option value=${Ht} ?selected=${ee===Ht}>
          ${Oe.unset_label}
        </option>
        ${Oe.options.map(k=>l`<option
              value=${k.value}
              title=${k.full_value||""}
              ?selected=${k.value===ee}
            >
              ${k.label}
            </option>`)}
      </select>
      ${ee===Ht?l`<span class="settings-dialog__source-badge">기본</span>`:""}`}function Ne(L,U,Y,ne,xe,He=!1,Z){return l`<div
      class=${`settings-dialog__row${He?" settings-dialog__row--off":""}`}
    >
      <span class="settings-dialog__row-label">${U}</span>
      <span class="settings-dialog__controls">
        ${st(L,U,Y,ne,xe,He,Z)}
      </span>
    </div>`}function Be(L,U){let Y=U?U.active:null;return nn(Y)?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${L==="claude"?Y.email:Fr({...Y,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)"}function dt(L,U,Y){let ne=_[Y],xe=Object.hasOwn(d,L)?d[L]:Ht,He=Y==="claude"?qo:Fr,Z=!!ne?.accounts.some(ee=>ee.key===xe);return l`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${U}</span>
      <span class="settings-dialog__controls">
        <select
          aria-label=${U}
          data-account-key=${L}
          @change=${ee=>ce(L,String(ee.target.value))}
        >
          <option value=${Ht} ?selected=${xe.length===0}>
            ${Be(Y,ne)}
          </option>
          ${xe.length>0&&!Z?l`<option value=${xe} selected>
                ${xe} (목록에 없음)
              </option>`:""}
          ${ne?.accounts.map(ee=>l`<option value=${ee.key} ?selected=${ee.key===xe}>
                ${He(ee)}
              </option>`)||""}
        </select>
        ${ne?"":l`<span class="settings-dialog__hint"
              >계정 목록을 불러올 수 없습니다</span
            >`}
      </span>
    </div>`}function ht(){let L=u.warnings.join(", ");return u.state==="unusable"?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uD574\uC11D\uD560 \uC218 \uC5C6\uC5B4 \uC774 \uB808\uD3EC\uC758 \uB514\uC2A4\uD328\uCE58\uAC00 \uAC70\uBD80\uB429\uB2C8\uB2E4 \u2014 ${L} \xB7 \uACC4\uC815\uC744 \uB2E4\uC2DC \uACE0\uB974\uBA74 \uD574\uC18C\uB429\uB2C8\uB2E4`:u.warnings.length>0?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC5D0 \uC54C \uC218 \uC5C6\uB294 \uD0A4\uAC00 \uC788\uC2B5\uB2C8\uB2E4 \u2014 ${L}`:null}function bt(L,U,Y,ne,xe){return l`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">
        <i
          class="settings-dialog__stage-dot"
          style=${`background: var(--stage-${U}-on)`}
        ></i>
        ${L}
      </span>
      <span class="settings-dialog__controls">
        ${st(Y,`${L} \uBAA8\uB378`,ne,ke,a,!1)}
        ${st(xe,`${L} effort`,Mo,ke,a,!1)}
      </span>
    </div>`}function ft(L,U,Y,ne){return l`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${U}</span>
      <span class="settings-dialog__controls">
        <button
          type="button"
          class=${`settings-dialog__toggle${ne?" is-on":""}`}
          data-automation=${L}
          aria-pressed=${ne?"true":"false"}
          aria-label=${U}
          @click=${()=>Se(L,!ne)}
        >
          ${ne?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}
        </button>
        <span class="settings-dialog__hint">${Y}</span>
      </span>
    </div>`}function kt(L,U,Y,ne){return l`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${U}</span>
      <span class="settings-dialog__controls">
        <span class="settings-dialog__stepper" data-stepper=${L}>
          <button
            type="button"
            aria-label=${`${U} \uAC10\uC18C`}
            @click=${()=>ne(Y-1)}
          >
            −
          </button>
          <span class="settings-dialog__stepper-value">${Y}</span>
          <button
            type="button"
            aria-label=${`${U} \uC99D\uAC00`}
            @click=${()=>ne(Y+1)}
          >
            +
          </button>
        </span>
      </span>
    </div>`}function Rt(L){return l`<div class="settings-dialog__preset-diff" data-preset-diff>
      <div class="settings-dialog__preset-diff-head">
        ${L.rows.length>0?`\uBCC0\uACBD ${L.rows.length}\uAC1C \xB7 \uC801\uC6A9\uD558\uBA74 \uC544\uB798\uC640 \uAC19\uC774 \uBC14\uB01D\uB2C8\uB2E4`:"\uD604\uC7AC \uC124\uC815\uACFC \uAC19\uC2B5\uB2C8\uB2E4 \u2014 \uC801\uC6A9\uD560 \uBCC0\uACBD\uC774 \uC5C6\uC2B5\uB2C8\uB2E4"}
      </div>
      ${L.rows.map(U=>l`<div
            class="settings-dialog__preset-diff-row"
            data-diff-kind=${U.kind}
          >
            <span class="settings-dialog__preset-diff-label">${U.label}</span>
            <span class="settings-dialog__preset-diff-value"
              >${U.before??"\uAE30\uBCF8"}</span
            >
            <span class="settings-dialog__preset-diff-arrow">→</span>
            <span
              class="settings-dialog__preset-diff-value settings-dialog__preset-diff-after"
              >${U.after??"\uAE30\uBCF8(\uD574\uC81C)"}</span
            >
          </div>`)}
      ${L.ignored_keys.length>0?l`<div class="settings-dialog__preset-diff-note">
            ${L.ignored_keys.join(", ")}은(는) 전역 적용이 쓰지 않는 키라
            무시됩니다
          </div>`:""}
    </div>`}function $t(){let L=G(),U={};for(let Y of Fn)U[Y]=Object.prototype.hasOwnProperty.call($,Y)?$[Y]:L&&typeof L[Y]=="string"?L[Y]:null;return U}function xt(){let L=E(),U=a.impl_runtime,Y=a.impl_model,ne=B(),xe=G(),He=$t(),Z=ks(L,w),ee=Nr(L,void 0).filter(_e=>_e!==un),Oe=gi(L,w,He.orchestration_model||un).filter(_e=>_e!==un),S=P?(ne?.presets||[]).find(_e=>_e.id===P):null,g=S?Cu(Ge(),nn(S.settings)?S.settings:{}):null,k=xe&&typeof xe.slots=="number"?xe.slots:Xo+1,j=xe&&typeof xe.serial_lane_count=="number"?xe.serial_lane_count:Xo,se=W()?.supported===!0,re=ht(),ye=hi("workflow_mode",vs,a,W(),L);return l`
      ${i.length>0?l`<div class="settings-dialog__banner" role="alert">
            워크스페이스 기본값을 일부 읽지 못했습니다 —
            ${i.join(", ")}
          </div>`:""}
      ${re?l`<div
            class="settings-dialog__banner"
            data-account-warning
            role="alert"
          >
            ${re}
          </div>`:""}
      ${se?"":l`<div
            class="settings-dialog__banner settings-dialog__banner--projection"
            data-execution-defaults-warning
            role="alert"
          >
            실행 기본값 projection을 확인할 수 없습니다 — 기본값 확인 불가
          </div>`}
      ${c?l`<div class="settings-dialog__empty">불러오는 중…</div>`:l`
            <div class="settings-dialog__preset-bar">
              <select
                aria-label="실행 프리셋"
                .value=${fr(P)}
                @change=${_e=>{P=String(_e.target.value),Ye()}}
              >
                <option value="" ?selected=${P===""}>
                  실행 프리셋…
                </option>
                ${(ne?.presets||[]).map(_e=>l`<option
                      value=${_e.id}
                      ?selected=${_e.id===P}
                    >
                      ${_e.name}
                    </option>`)}
              </select>
              <button
                type="button"
                class="settings-dialog__btn settings-dialog__btn--primary"
                data-preset-apply-global
                ?disabled=${!g||g.rows.length===0}
                @click=${Me}
              >
                적용
              </button>
              <input
                type="text"
                class="settings-dialog__preset-name"
                placeholder=${P?"\uC774\uB984 (\uBE44\uC6B0\uBA74 \uC720\uC9C0)":"\uC0C8 \uD504\uB9AC\uC14B \uC774\uB984"}
                aria-label="프리셋 이름"
                .value=${fr(z)}
                @input=${_e=>{z=String(_e.target.value)}}
              />
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-save
                title=${P?"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC774 \uD504\uB9AC\uC14B\uC5D0 \uC800\uC7A5\uD569\uB2C8\uB2E4 (\uD504\uB9AC\uC14B \u2192 \uC124\uC815 \uBC29\uD5A5\uC774 \uC544\uB2D8)":"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC0C8 \uD504\uB9AC\uC14B\uC73C\uB85C \uC800\uC7A5\uD569\uB2C8\uB2E4"}
                @click=${qe}
              >
                ${P?"\uD604\uC7AC \uC124\uC815\uC73C\uB85C \uB36E\uC5B4\uC4F0\uAE30":"\uC0C8 \uD504\uB9AC\uC14B \uC800\uC7A5"}
              </button>
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-delete
                ?disabled=${P.length===0}
                @click=${K}
              >
                삭제
              </button>
            </div>
            ${g?Rt(g):""}

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">오케스트레이션</div>
              <div class="settings-dialog__row">
                <span class="settings-dialog__row-label">런타임</span>
                <span class="settings-dialog__controls">
                  <select
                    aria-label="런타임"
                    data-key="orchestration_runtime_filter"
                    .value=${fr(w||Ht)}
                    @change=${_e=>{let nt=String(_e.target.value);I(nt===Ht?null:nt)}}
                  >
                    <option value=${Ht} ?selected=${!w}>
                      전체
                    </option>
                    <option
                      value="claude"
                      ?selected=${w==="claude"}
                    >
                      claude
                    </option>
                    <option
                      value="codex"
                      ?selected=${w==="codex"}
                    >
                      codex
                    </option>
                  </select>
                  <span class="settings-dialog__hint"
                    >모델 목록을 좁힙니다</span
                  >
                </span>
              </div>
              ${Ne("orchestration_model","\uBAA8\uB378",Z,it,He)}
              ${Ne("orchestration_effort","effort",Oe,it,He)}
              ${Ne("orchestration_speed","\uC18D\uB3C4",ys,it,He)}
            </div>

            <div class="settings-dialog__group" data-exec-accounts-group>
              <div class="settings-dialog__group-title">실행 계정</div>
              ${dt("claude_account","Claude","claude")}
              ${dt("codex_account","Codex","codex")}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">워크플로우</div>
              <div class="settings-dialog__row">
                <span class="settings-dialog__row-label">모드</span>
                <span class="settings-dialog__controls">
                  <span class="settings-dialog__seg" role="group">
                    <button
                      type="button"
                      data-mode=${Ht}
                      aria-pressed=${String(!a.workflow_mode)}
                      @click=${()=>ke("workflow_mode",Ht)}
                    >
                      ${ye.unset_label}
                    </button>
                    ${a.workflow_mode?"":l`<span class="settings-dialog__source-badge"
                          >기본</span
                        >`}
                    ${vs.map(_e=>l`<button
                          type="button"
                          data-mode=${_e}
                          aria-pressed=${String(a.workflow_mode===_e)}
                          @click=${()=>ke("workflow_mode",_e)}
                        >
                          ${_e}
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
              ${bt("\uC0AC\uC591 \uB9AC\uBDF0","spec","spec_review_model",ws,"spec_review_effort")}
              ${bt("\uACC4\uD68D \uB9AC\uBDF0","plan","plan_review_model",Po,"plan_review_effort")}
              ${bt("\uAD6C\uD604 \uB9AC\uBDF0","impl","impl_review_model",ws,"impl_review_effort")}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                구현
                <span class="settings-dialog__hint"
                  >이슈 핀이 있으면 핀이 우선합니다</span
                >
              </div>
              ${Ne("impl_runtime","\uC704\uC784 \uB300\uC0C1",Io,ke,a)}
              ${Ne("impl_model","\uBAA8\uB378",Nr(L,U),ke,a)}
              ${Ne("impl_effort","effort",qr(L,U,Y),ke,a)}
              ${Ne("impl_speed","\uC18D\uB3C4",ys,ke,a)}
              ${Ne("quick_fix_impl_model","quick_fix \uAD6C\uD604 \uBAA8\uB378",ee,ke,a,!1,{...a,...He})}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                자동화
                <span class="settings-dialog__hint"
                  >이 레포의 워커 큐가 스스로 진행하는 범위</span
                >
              </div>
              ${ft("auto_advance","\uC790\uB3D9\uD654","\uC2AC\uB86F\uC774 \uBE44\uBA74 \uB300\uAE30 \uC55E \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4",xe?.auto_advance===!0)}
              ${ft("auto_merge","\uBA38\uC9C0","\uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4",xe?.auto_merge===!0)}
              ${ft("auto_repair","\uC790\uB3D9 \uD574\uACB0","\uC2E4\uD328\uD55C \uC800\uC7A5\uC18C \uC791\uC5C5\uC744 \uC138\uC158\uC774 \uC790\uB3D9\uC73C\uB85C \uBCF5\uAD6C\uD569\uB2C8\uB2E4",xe?.auto_repair===!0)}
              ${kt("slots","\uB3D9\uC2DC \uC2E4\uD589",k,_e=>me(_e))}
              ${kt("serial-lane-count","\uC9C1\uB82C \uB808\uC778",j,_e=>$e(_e))}
            </div>
            ${Ke()}
          `}
    `}function Ye(){q||Qe(xt(),e)}return{load(){$={};let L=[Te(),de()];return h||L.push(H()),Promise.all(L).then(()=>{})},render:Ye,sessionDraft:()=>({...a}),destroy(){q=!0,Qe(l``,e)}}}function Ts(e){return l`<svg
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
  </svg>`}function ud(){return Ts(xr`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function dd(){return Ts(xr`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function pd(){return Ts(xr`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function fd(){return Ts(xr`<rect x="2.6" y="2.6" width="7.4" height="7.4" rx="1.2" />
    <path d="M6 13.4h6a1.4 1.4 0 0 0 1.4-1.4V6" />`)}function _d(){return Ts(xr`<circle cx="8" cy="8" r="2.1" />
    <path
      d="M8 1.9v1.8M8 12.3v1.8M1.9 8h1.8M12.3 8h1.8M3.7 3.7l1.3 1.3M11 11l1.3 1.3M12.3 3.7 11 5M5 11l-1.3 1.3"
    />`)}function md(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function gd(e){let t=(Array.isArray(e)?e:[]).map(i=>i&&i.usage).filter(i=>i&&typeof i=="object"&&"providers"in i);if(t.length>0)return zt(mo(t));let n={};for(let i of In)n[i]=0;let r=!1,s=0,o=0,a=0;for(let i of Array.isArray(e)?e:[]){let c=i&&i.usage;if(c&&typeof c=="object"){let u=!1;for(let d of In){let _=c[d];typeof _=="number"&&Number.isFinite(_)&&(n[d]+=_,r=!0,u=!0)}if(u){o+=1;let d=c.total_cost_usd;typeof d=="number"&&Number.isFinite(d)&&(s+=d,a+=1)}}}return o>0&&a===o&&(n.total_cost_usd=s),r?Pn(n):null}function An(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Wr(e,t){let n=An(e?.counts)?e.counts:null,r=n?n[t]:null;return typeof r=="number"&&Number.isFinite(r)?r:0}function sh(e,t){if(!An(t))return e;let n={...e};for(let[r,s]of Object.entries(t))s!==void 0&&(n[r]=s);return n}function oh(e){if(!An(e)||!An(e.execution_defaults)||!An(e.runner_catalog)||!An(e.session_defaults))return null;let t={...e.session_defaults};for(let a of["orchestration_model","orchestration_effort","orchestration_speed"])typeof e[a]=="string"&&e[a].length>0&&(t[a]=e[a]);let n=tn({global:t,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog}),r=$n(e.runner_catalog,n.orchestration_model.value??""),s=_r(n,e.runner_catalog),o=Qn(n,r);return s===null&&o===null?null:{orchestration:s,worker:o}}function hd(e,t){let n=t.notify||(H=>ue(H,"error",4e3)),r=document.createElement("div");r.className="mon2-deck__main",e.appendChild(r);let s=document.createElement("div");s.className="mon2-deck__panel",s.hidden=!0;let o=document.createElement("div");o.className="mon2-deck__panel-hd";let a=document.createElement("span");a.className="mon2-deck__panel-title";let i=document.createElement("button");i.type="button",i.className="mon2-deck__panel-close",i.setAttribute("aria-label","\uC2E4\uD589 \uC124\uC815 \uB2EB\uAE30"),i.textContent="\u2715",o.append(a,i);let c=document.createElement("div");c.className="mon2-deck__panel-body",s.append(o,c),e.appendChild(s);let u=null,d=null,_=null,h=new Map;function w(){let H=t.workspacesState?t.workspacesState():[];return Array.isArray(H)?H.filter(te=>An(te)):[]}function $(H){return w().find(te=>te.root_dir===H)||null}function P(H){return sh($(H),h.get(H))}function z(){for(let H of w()){let te=h.get(H.root_dir);te&&typeof te.revision=="number"&&typeof H.revision=="number"&&H.revision>=te.revision&&h.delete(H.root_dir)}}async function Q(H,te,ce){let ke=t.transport,be=P(te);if(!(!ke||!An(be))){try{let je=await ke(H,{...ce,root_dir:te,expected_revision:be.revision});if(An(je?.queue)&&h.set(te,je.queue),je&&je.conflict){let we=An(je.queue)&&typeof je.queue.revision=="number"?je.queue.revision:P(te)?.revision;je=await ke(H,{...ce,root_dir:te,expected_revision:we}),An(je?.queue)&&h.set(te,je.queue)}}catch(je){n(`\uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${je instanceof Error?je.message:String(je)}`)}ie()}}function ae(H){u!==H&&(u=H,t.onFocusChange?.(u),ie())}function N(H){ae(u===H?null:H)}function M(H){if(d===H){G();return}q(),d=H;let te=$(H);a.textContent=`${te?.name||H} \uC2E4\uD589 \uC124\uC815 \xB7 Worker \uD0ED \u2699 \uC2E4\uD589 \uD0ED\uACFC \uAC19\uC740 \uC800\uC7A5\uC18C`,s.hidden=!1,_=Jo(c,{root_dir:H,queue:()=>P(H),transport:t.transport,implPresetStore:t.implPresetStore,notify:n,onQueueAdopt:ce=>{h.set(H,ce),ie()}}),_.load(),ie()}function q(){_?.destroy(),_=null}function G(H){q(),d=null,s.hidden=!0,a.textContent="",H!==!0&&ie()}let E=()=>G();i.addEventListener("click",E);function W(H){H.key==="Escape"&&u!==null&&ae(null)}document.addEventListener("keydown",W);function B(H,te){let ce=Math.max(te,H,1);return l`<span
      class="mon2-deck__rail"
      role="img"
      aria-label=${`\uC2AC\uB86F ${te}\uAC1C \uC911 ${H}\uAC1C \uC2E4\uD589 \uC911`}
    >
      ${Array.from({length:ce},(ke,be)=>be<H?l`<i class="mon2-deck__slot is-run"></i>`:l`<i class="mon2-deck__slot"></i>`)}
    </span>`}function ve(H){let te=H.auto_advance===!0,ce=H.auto_merge===!0;return l`<button
        type="button"
        class=${`mon2-deck__op mon2-deck__auto${te?" is-on":""}`}
        data-act="auto"
        aria-pressed=${te?"true":"false"}
        aria-label=${`${H.name} \uC790\uB3D9\uD654`}
        title=${te?"\uC790\uB3D9\uD654 \uCF1C\uC9D0 \u2014 \uC2AC\uB86F\uC774 \uBE44\uBA74 \uB2E4\uC74C \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4":"\uC790\uB3D9\uD654 \uAEBC\uC9D0 \u2014 \uB2E4\uC74C \uD589\uC740 \uC218\uB3D9\uC73C\uB85C\uB9CC \uCD9C\uBC1C\uD569\uB2C8\uB2E4"}
      >
        ${te?dd():ud()}
        <span class="mon2-deck__op-label">자동화</span>
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__merge${ce?" is-on":""}`}
        data-act="merge"
        aria-pressed=${ce?"true":"false"}
        aria-label=${`${H.name} \uC790\uB3D9 \uBA38\uC9C0`}
        title=${ce?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0"}
      >
        ${pd()}
        <span class="mon2-deck__op-label">머지</span>
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__gear${d===H.root_dir?" is-on":""}`}
        data-act="gear"
        aria-expanded=${d===H.root_dir?"true":"false"}
        aria-label=${`${H.name} \uC2E4\uD589 \uC124\uC815`}
        title="이 레포의 실행 설정"
      >
        ${_d()}
      </button>`}function fe(H){let te=oh(H);return te?l`<div class="mon2-deck__chips">
      ${te.orchestration?l`<span class="mon2-deck__chip" title=${te.orchestration.title}
            >오케 ${te.orchestration.text}</span
          >`:""}
      ${te.worker?l`<span class="mon2-deck__chip" title=${te.worker.title}
            >워커 ${te.worker.text}</span
          >`:""}
    </div>`:""}function ge(H){let te=Wr(H,"running"),ce=typeof H.slots=="number"?H.slots:1;return l`<div
      class=${`mon2-deck__tile${u===H.root_dir?" is-focus":""}`}
      role="button"
      tabindex="0"
      data-root-dir=${H.root_dir}
      aria-pressed=${u===H.root_dir?"true":"false"}
      title="클릭하면 이 레포만 선명하게 봅니다 (Esc로 해제)"
    >
      <div class="mon2-deck__tile-hd">
        <span class="mon2-deck__name" title=${H.root_dir}>${H.name}</span>
        <button
          type="button"
          class="mon2-deck__worker"
          data-act="worker"
          title="이 레포의 Worker 탭으로 이동"
        >
          Worker ↗
        </button>
      </div>
      <div class="mon2-deck__slots">
        ${fd()} ${B(te,ce)}
        <span class="mon2-deck__counts"
          >${te}/${ce} 실행 · 대기 ${Wr(H,"queue")} · PR
          ${Wr(H,"pr_wait")}${Wr(H,"session_active")>0?` \xB7 \uC138\uC158 ${Wr(H,"session_active")}`:""}</span
        >
      </div>
      <div class="mon2-deck__ops">${ve(H)}</div>
      ${fe(H)}
    </div>`}function V(H){let te=t.doneItems?t.doneItems():[],ce=t.rangeLabel?t.rangeLabel():"",ke=gd(Array.isArray(te)?te:[]),be=je=>H.reduce((we,Je)=>we+Wr(Je,je),0);return l`<div
      class="mon2-deck__total"
      title=${`visible \uB808\uD3EC ${H.length}\uACF3\uC758 \uD569\uACC4\uC785\uB2C8\uB2E4 \u2014 \uC2E4\uD589\xB7\uB300\uAE30\xB7PR\uC740 \uC9C0\uAE08, \uC644\uB8CC\uB294 ${ce}`}
    >
      <div class="mon2-deck__total-counts">
        실행 ${be("running")} · 대기 ${be("queue")} · PR
        ${be("pr_wait")}${be("session_active")>0?` \xB7 \uC138\uC158 ${be("session_active")}`:""}
        · ${ce} 완료
        ${Array.isArray(te)?te.length:0}
      </div>
      ${ke===null?"":l`<div class="mon2-deck__total-tokens">
            ${typeof ke=="string"?l`<span
                  class="mon2-deck__tok"
                  title=${md(ce)}
                  >τ ${ke}</span
                >`:ke.map(je=>l`<span
                      class="mon2-deck__tok"
                      data-provider=${je.provider}
                      title=${je.tooltip}
                      >τ ${je.label}</span
                    >`)}
          </div>`}
    </div>`}function Te(){let H=w();return H.length===0?"":l`<div class="mon2-deck__row">
      ${V(H)}
      <div class="mon2-deck__strip">
        ${H.map(te=>ge(te))}
      </div>
    </div>`}function Re(){u!==null&&!$(u)&&(u=null,t.onFocusChange?.(null))}function ie(){z(),Re(),d!==null&&!$(d)&&G(!0),Qe(Te(),r),_?.render()}function de(H){let te=H.target;if(!te||typeof te.closest!="function")return;let ce=te.closest("[data-root-dir]");if(!ce)return;let ke=ce.getAttribute("data-root-dir")||"",be=te.closest("[data-act]")?.getAttribute("data-act");if(be==="worker"){t.gotoWorkerTab?.(ke);return}if(be==="auto"){Q("worker-automation-toggle",ke,{on:P(ke)?.auto_advance!==!0});return}if(be==="merge"){Q("worker-merge-auto-toggle",ke,{on:P(ke)?.auto_merge!==!0});return}if(be==="gear"){M(ke);return}N(ke)}function Ae(H){if(H.key!=="Enter"&&H.key!==" ")return;let te=H.target;if(!te||typeof te.closest!="function")return;let ce=te.closest('[data-root-dir][role="button"]');!ce||ce!==te||(H.preventDefault(),N(ce.getAttribute("data-root-dir")||""))}return r.addEventListener("click",de),r.addEventListener("keydown",Ae),{render:ie,focusRoot:()=>u,panelRoot:()=>d,destroy(){document.removeEventListener("keydown",W),r.removeEventListener("click",de),r.removeEventListener("keydown",Ae),i.removeEventListener("click",E),q(),Qe(l``,r),e.replaceChildren()}}}var ah="\uB2E4\uB978 \uB808\uD3EC \uC774\uC288\uB294 \uC774 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",ih="Worker \uD0ED \uC9C1\uB82C \uB808\uC778\uC5D0\uC11C \uBA3C\uC800 \uBE7C \uC8FC\uC138\uC694";function Ri(e,t){return`${e}\0${t}`}function lh(e){return`${e}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`}function ch(e){let t=new Map;for(let[n,r]of e)t.set(n,r.slice());return t}function uh(e,t,n){let r=new Set([t]),s=[t];for(;s.length>0;){let o=s.pop();for(let a of e.get(o)||[]){if(a===n)return!0;r.has(a)||(r.add(a),s.push(a))}}return!1}function dh(e,t){let n=new Set(t),r=new Map,s=new Map;for(let i of n){let c=Array.from(new Set((e.get(i)||[]).filter(u=>u!==i&&n.has(u))));r.set(i,c.length);for(let u of c){let d=s.get(u);d?d.push(i):s.set(u,[i])}}let o=[],a=Array.from(n).filter(i=>r.get(i)===0).sort();for(;a.length>0;){let i=a.shift();o.push(i);for(let c of(s.get(i)||[]).slice().sort()){let u=(r.get(c)||0)-1;r.set(c,u),u===0&&a.push(c)}}for(let i of t)o.includes(i)||o.push(i);return o}function ph(e,t){let n=new Set;for(let[a,i]of t)for(let c of i)n.add(Ri(a,c));let r=new Map,s=new Map;for(let a of e){let i=Ri(a.a,a.b);r.set(i,a),s.set(i,a.type==="dep-add")}let o=[];for(let a of e){let i=Ri(a.a,a.b);r.get(i)===a&&s.get(i)!==n.has(i)&&o.push(a)}return o}function fh(e,t,n){let r=e.parallel_rows,s=Math.max(0,Math.min(r.length,n)),o=r[s];if(o&&o.root_dir===t)return o.queue_index;for(let a=s-1;a>=0;a--)if(r[a].root_dir===t)return r[a].queue_index+1;for(let a=s;a<r.length;a++)if(r[a].root_dir===t)return r[a].queue_index;return e.parallel_raw_length.get(t)??0}function _h(e,t){return e.parallel_rows.some(n=>n.root_dir===t)}function Oi(e,t,n,r){return{type:"worker-queue-place",payload:{bead_id:e,...r?{lane:r}:{},index:n},root_dir:t}}function bd(e,t,n){let r=ch(n.blocked_by_map),s=[],o=null,a=w=>{let $=n.owner_of.get(w);return typeof $!="string"||$.length===0?(o=lh(w),null):$},i=(w,$)=>{if(o!==null||w===$)return;let P=r.get(w)||[];if(!P.includes($))return;let z=a(w);z!==null&&(r.set(w,P.filter(Q=>Q!==$)),s.push({type:"dep-remove",a:w,b:$,root_dir:z}))},c=(w,$)=>{if(o!==null||w===$)return;let P=r.get(w)||[];if(P.includes($))return;let z=a(w);if(z!==null){if(uh(r,$,w)){o=`\uC758\uC874 \uC0AC\uC774\uD074\uC774 \uC0DD\uAE41\uB2C8\uB2E4 \u2014 ${w}\uAC00 \uC774\uBBF8 ${$}\uB97C \uB9C9\uACE0 \uC788\uC2B5\uB2C8\uB2E4`;return}r.set(w,[...P,$]),s.push({type:"dep-add",a:w,b:$,root_dir:z})}},u=()=>{let w=n.lane_order.get(e.lane_id||"")||[],$=new Set(w),P=(r.get(e.bead_id)||[]).filter(Q=>$.has(Q)),z=w.filter(Q=>(r.get(Q)||[]).includes(e.bead_id));for(let Q of P)i(e.bead_id,Q);for(let Q of z)i(Q,e.bead_id);for(let Q of P)for(let ae of z)c(ae,Q);return w.filter(Q=>Q!==e.bead_id)},d=(w,$)=>{let P=n.lane_order.get(w)||[],z=P.indexOf(e.bead_id),Q=dh(r,P.filter(q=>q!==e.bead_id)),ae=w.startsWith("pending:")?Q.length:Math.max(0,Math.min(Q.length,z>=0&&$>z?$-1:$)),N=ae>0?Q[ae-1]:null,M=ae<Q.length?Q[ae]:null;if(N===null){M!==null&&c(M,e.bead_id);return}c(e.bead_id,N),M!==null&&(r.get(M)||[]).includes(N)&&(i(M,N),c(M,e.bead_id))},_=typeof e.queue_index=="number"?e.queue_index:n.queue_index_of.get(e.bead_id);if(t.kind==="repo-serial"&&e.root_dir!==t.root_dir)return{refused:ah};if(t.kind==="chain"&&e.kind==="repo-serial")return{refused:ih};if(e.kind==="chain"&&u(),t.kind==="chain"&&d(t.lane_id,t.marker_index),o!==null)return{refused:o};let h=[];if(t.kind==="candidate")e.kind!=="candidate"&&h.push({type:"worker-queue-remove",payload:{bead_id:e.bead_id},root_dir:e.root_dir});else if(t.kind==="parallel"){let w=fh(n,e.root_dir,t.marker_index);if(e.kind==="candidate"||e.kind==="repo-serial")h.push(Oi(e.bead_id,e.root_dir,w));else if(e.kind==="parallel"){let $=n.parallel_rows,P=$[Math.max(0,Math.min($.length,t.marker_index))];if(!(!!P&&P.bead_id===e.bead_id)&&_h(n,e.root_dir)&&_!==void 0){let Q=_>w?w:w-1;Q>=0&&Q!==_&&h.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,to_index:Q},root_dir:e.root_dir})}}}else if(t.kind==="chain")e.kind==="candidate"&&h.push(Oi(e.bead_id,e.root_dir,n.parallel_raw_length.get(e.root_dir)??0));else if(e.kind==="repo-serial"&&e.lane_id===t.lane_id){if(_!==void 0&&t.index!==_){let w=_>t.index?t.index:t.index-1;w>=0&&w!==_&&h.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,lane:t.lane_id,to_index:w},root_dir:e.root_dir})}}else h.push(Oi(e.bead_id,e.root_dir,t.index,t.lane_id));return{ops:[...ph(s,n.blocked_by_map),...h]}}var yd={running:3,paused:2,failed:1};function zr(e){if(!e||typeof e!="object")return!1;let t=e.kind;return t==null||t==="implementation"}function vd(e){let t=Object.values(e||{}),n=new Map;for(let r of t){if(!r||typeof r.bead_id!="string"||r.bead_id.length===0||r.kind!=="head_review"&&r.kind!=="head_repair"||r.status!=="running")continue;let s=typeof r.started_at=="number"?r.started_at:null,o=n.get(r.bead_id);o&&(o.started_at??0)>(s??0)||n.set(r.bead_id,{attempt:r,kind:r.kind,origin:r.origin==="click"||r.origin==="auto"?r.origin:null,started_at:s})}return n}function wd(e,t){let n=Object.values(e||{}),r=new Set,s=new Map;for(let a of n)!a||typeof a.bead_id!="string"||(typeof a.resumed_from=="string"&&a.resumed_from.length>0&&r.add(a.resumed_from),zr(a)&&s.set(a.bead_id,a.attempt_id));let o=new Map;for(let a of n){if(!a||typeof a.bead_id!="string"||a.bead_id.length===0||!zr(a))continue;let i=null;if(a.status==="running")i="running";else if(a.status==="paused"&&!r.has(a.attempt_id))i="paused";else if(a.status==="failed"||a.status==="orphaned"){let d=t.get(a.bead_id),_=typeof d=="number"&&d>0&&typeof a.finished_at=="number"&&d>=a.finished_at;s.get(a.bead_id)===a.attempt_id&&!_&&typeof a.dismissed_at!="number"&&(i="failed")}if(!i)continue;let c=typeof a.started_at=="number"?a.started_at:null,u=o.get(a.bead_id);if(u){let d=yd[u.run_state],_=yd[i];if(d>_||d===_&&(u.started_at??0)>(c??0))continue}o.set(a.bead_id,{attempt:a,run_state:i,started_at:c})}return{winners:o,resumed_from_ids:r}}function ea(e){return e.replace(/\/+$/,"")}function mh(e,t){let n=ea(e),r=ea(t);return n===r||r.startsWith(`${n}/`)||n.startsWith(`${r}/`)}function ta(e,t){let n=new Set;for(let r of e)for(let s of t){if(!mh(r,s))continue;let o=ea(r),a=ea(s);n.add(o.length>=a.length?o:a)}return[...n].sort()}var kd=[{step:"merge",label:"\uBA38\uC9C0",index:1},{step:"base",label:"base",index:2},{step:"verify",label:"\uAC80\uC99D",index:3},{step:"deploy",label:"\uBC30\uD3EC",index:4},{step:"child",label:"\uC790\uC2DD",index:5},{step:"branch",label:"\uBE0C\uB79C\uCE58",index:6},{step:"close",label:"close",index:7}],Cs=[{step:"base_containment",label:"base \uD3EC\uD568 \uD655\uC778"},{step:"repo_operations",label:"\uC800\uC7A5\uC18C \uC791\uC5C5"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"}];function na(e,t){let n=kd.find(s=>s.step===e);if(!n)return null;let r=kd.length;return{step:n.step,label:t,index:n.index,total:r,percent:Math.round(n.index/r*100)}}function $d(e){let t=Cs.findIndex(n=>n.step===e);return Cs.map((n,r)=>({step:n.step,label:n.label,state:t<0?"todo":r<t?"done":r===t?"stall":"todo"}))}function mr(e){let t=Cs.find(n=>n.step===e);return t?t.label:typeof e=="string"?e:""}function gh(e){let t=Cs.findIndex(n=>n.step===e);return t<0?null:{index:t+1,total:Cs.length}}function ra(e){let t=gh(e);return t?`\uBA38\uC9C0 \uC644\uB8CC \xB7 \uC815\uB9AC ${t.total}\uB2E8\uACC4 \uC911 ${t.index}\uB2E8\uACC4\uC5D0\uC11C \uBA48\uCDA4`:"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644"}var Ii=new Set(["queued","running","retry_pending","repairing"]),xd=new Set(["failed","succeeded"]),hh={queued:"\uB300\uAE30",running:"\uC911",retry_pending:"\uC7AC\uC2DC\uB3C4 \uB300\uAE30",repairing:"\uC790\uB3D9 \uD574\uACB0 \uC911",failed:"\uC2E4\uD328",succeeded:"\uC644\uB8CC \xB7 \uC815\uB9AC \uC7AC\uAC1C \uB300\uAE30"},Rs={base_containment:{step:"base",label:"base \uD655\uC778 \uC911"},child_sweep:{step:"child",label:"\uC790\uC2DD \uC815\uB9AC \uC911"},branch_cleanup:{step:"branch",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC \uC911"},parent_close:{step:"close",label:"\uBD80\uBAA8 close \uC911"}},bh={merging:{step:"merge",label:"\uBA38\uC9C0 \uC911"},base_containment:Rs.base_containment,child_sweep:Rs.child_sweep,branch_cleanup:Rs.branch_cleanup,parent_close:Rs.parent_close};function yh(e){return typeof e=="string"&&/^[0-9a-f]{40}$/.test(e)}function vh(e,t,n){return!["verify","deploy"].includes(e.kind)||![...Ii,...xd].includes(e.state)||![null,void 0,""].includes(e.superseded_by)||!Array.isArray(e.subjects)?!1:e.subjects.some(r=>r&&typeof r=="object"&&r.bead_id===t&&r.merged_sha===n)}function wh(e,t){let n=(t.kind==="deploy"?2:1)-(e.kind==="deploy"?2:1);if(n!==0)return n;let r=u=>u.state==="succeeded"?1:2,s=r(t)-r(e);if(s!==0)return s;let o=typeof e.requested_at=="number"?e.requested_at:0,a=typeof t.requested_at=="number"?t.requested_at:0;if(o!==a)return a-o;let i=typeof e.operation_id=="string"?e.operation_id:"",c=typeof t.operation_id=="string"?t.operation_id:"";return i.localeCompare(c)}function Li(e,t=!1){let n=e.kind,r=n==="verify"?"\uAC80\uC99D":"\uBC30\uD3EC",s=t?"failed":e.state,o=hh[s];if(!o)return null;let a=na(n,`${r} ${o}`);return a?{...a,active:Ii.has(s),failed:s==="failed"}:null}function kh(e){return!e||typeof e!="object"?null:bh[e.step]||null}function Os(e){if(!e||typeof e.bead_id!="string")return null;let t=e.bead_id,n=e.merge_progress&&typeof e.merge_progress=="object"?e.merge_progress:{},r=kh(n),s=e.cleanup_failed&&typeof e.cleanup_failed=="object"?e.cleanup_failed:null,o=["child_sweep","branch_cleanup","parent_close"].includes(typeof e.cleanup_cursor=="string"?e.cleanup_cursor:""),a=!o&&(e.cleanup_cursor==="repo_operations"||n.step==="repo_operations"),i=yh(e.merge_sha)?e.merge_sha:null,c=!o&&i&&Array.isArray(e.repo_operations)?e.repo_operations.filter($=>$&&typeof $=="object"&&vh($,t,i)).sort(wh):[],u=a?c:[],d=u.find($=>Ii.has($.state));if(d)return Li(d);if(s)return s.step==="repo_operations"&&c[0]?Li(c[0],!0):null;let _=u.find($=>xd.has($.state)?$.state!=="succeeded"||e.cleanup_cursor==="repo_operations":!1);if(_)return Li(_);if(r){let $=na(r.step,r.label);return $?{...$,active:!0,failed:!1}:null}let h=typeof e.cleanup_cursor=="string"?Rs[e.cleanup_cursor]:null;if(!h)return null;let w=na(h.step,h.label);return w?{...w,active:!0,failed:!1}:null}function sa(e){return!!e&&e.step!=="merge"&&e.failed!==!0}function Pi(e,t){return`${e}\0${t}`}function Ad(e){let t=new Map;for(let n of Array.isArray(e?.running)?e.running:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"running",state:"running"});for(let n of Array.isArray(e?.pr_wait)?e.pr_wait:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"pr_wait",state:"pr_wait"});for(let n of Array.isArray(e?.queue_groups)?e.queue_groups:[]){let r=Array.isArray(n.sublanes?.parallel)?n.sublanes.parallel:Array.isArray(n.items)?n.items:[];for(let s of r)t.set(s.id,{root_dir:s.root_dir,workspace_name:s.workspace_name,lane:"parallel",position:s.queue_position});for(let s of Array.isArray(n.sublanes?.serial)?n.sublanes.serial:[])for(let o of s.items)t.set(o.id,{root_dir:o.root_dir,workspace_name:o.workspace_name,lane:s.id,position:o.queue_position})}for(let n of Array.isArray(e?.runnable)?e.runnable:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"runnable",state:"runnable"});for(let n of Array.isArray(e?.done)?e.done:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"done",state:"done"});return t}function Mi(e,t){let n=Array.isArray(t)?t:[],r=e.indexOf("-"),s=r>0?e.slice(0,r):e;return n.some(o=>typeof o?.issue_prefix=="string"&&o.issue_prefix===s)?"internal":n.length>0&&n.every(o=>typeof o?.issue_prefix=="string")?"external":"unknown"}function $h(e,t){return e==="internal"&&t===void 0}function Hr(e){if(e.state==="running")return"\uC2E4\uD589\uC911";if(e.state==="pr_wait")return"PR \uB300\uAE30";if(e.state==="runnable")return"\uC2E4\uD589\uAC00\uB2A5";if(e.state==="done")return"\uC644\uB8CC";let t=e.lane==="parallel"?"\uBCD1\uB82C":e.lane;return`${e.workspace_name} \xB7 ${t} #${e.position}`}function Sd(e,t,n,r){let s=n.get(e);if(!!(s&&t&&s.root_dir===t.root_dir&&s.lane===t.lane&&typeof s.position=="number"&&typeof t.position=="number"&&s.position<t.position))return{id:e,label:`\u{1F512} ${e} (\uAC19\uC740 \uB808\uC778 \uC55E)`,location_label:"\uAC19\uC740 \uB808\uC778 \uC55E",scope:null,same_lane_ahead:!0,missing_internal:!1};if(s)return{id:e,label:`\u{1F512} ${e} (${Hr(s)})`,location_label:Hr(s),scope:null,same_lane_ahead:!1,missing_internal:!1};let a=Mi(e,r),i=a==="internal"?"\uBBF8\uC801\uC7AC":a==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778";return{id:e,label:`\u{1F512} ${e} (${i})`,location_label:i,scope:a,same_lane_ahead:!1,missing_internal:$h(a,s)}}function Ed(e){let t=Array.isArray(e)?e:[],n=new Map,r=new Map,s=new Map;for(let i of t)for(let c of Array.isArray(i.sublanes?.serial)?i.sublanes.serial:[]){let u=Pi(i.root_dir,c.id);n.set(u,{root_dir:i.root_dir,workspace_name:i.name,lane:c.id}),s.set(u,[]);for(let d of Array.isArray(c.items)?c.items:[])r.set(d.id,u)}for(let i of t)for(let c of Array.isArray(i.sublanes?.serial)?i.sublanes.serial:[]){let u=Pi(i.root_dir,c.id),d=Array.isArray(c.items)?c.items[0]:null,h=!!d&&d.queue_index===0&&(!Array.isArray(c.occupied_by)||c.occupied_by.length===0)&&Array.isArray(d.blocked_by)?d.blocked_by:[],w=s.get(u);if(w)for(let $ of h){let P=r.get($);P&&P!==u&&!w.includes(P)&&w.push(P)}}let o=(i,c)=>{let u=new Set,d=[i];for(;d.length>0;){let _=d.pop();if(_===c)return!0;!_||u.has(_)||(u.add(_),d.push(...s.get(_)||[]))}return!1},a=new Map;for(let[i,c]of s){let u=[];for(let d of c){let _=n.get(d);o(d,i)&&_&&u.push(_)}u.length>0&&a.set(i,u)}return a}function Td(e,t){return Pi(e,t)}var Cd=1,Ls=[{value:"repo_spec",label:"\uB808\uD3EC \xB7 spec \uC6B0\uC120"},{value:"repo_updated",label:"\uB808\uD3EC \xB7 \uCD5C\uC2E0 \uC218\uC815"},{value:"updated_flat",label:"\uCD5C\uC2E0 \uC218\uC815(\uB808\uD3EC \uBB34\uC2DC)"}],Ni=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],Gr={show_blocked:!0,spec:"all"},Rd={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328"};function xh(e,t){let n=null,r=-1/0;for(let s of Object.values(e)){if(!s||s.bead_id!==t||s.status==="running"||!zr(s))continue;let o=typeof s.finished_at=="number"?s.finished_at:typeof s.started_at=="number"?s.started_at:0;o>=r&&(r=o,n=s)}return n}function Ah(e,t){let{winners:n,resumed_from_ids:r}=wd(e,t),s=new Map;for(let[o,a]of n){let i=a.attempt,c=a.run_state,u=a.started_at,d=typeof i.session_id=="string"&&i.session_id.length>0;s.set(o,{attempt_id:typeof i.attempt_id=="string"?i.attempt_id:"",run_state:c,started_at:u,last_event_at:typeof i.last_event_at=="number"?i.last_event_at:null,last_activity:i.last_activity&&typeof i.last_activity=="object"?i.last_activity:null,legs:Array.isArray(i.legs)?i.legs:[],runner:typeof i.runner=="string"?i.runner:null,model:typeof i.model=="string"?i.model:null,effort:typeof i.effort=="string"?i.effort:null,speed:typeof i.speed=="string"?i.speed:null,resumed_from:typeof i.resumed_from=="string"?i.resumed_from:null,continuation_mode:i.continuation_mode==="session"||i.continuation_mode==="fresh"?i.continuation_mode:null,status:typeof i.status=="string"?i.status:null,usage:_n(e,i.bead_id),can_pause:c==="running"&&d,can_resume:c!=="running"&&d&&!r.has(i.attempt_id)})}return s}function Od(e,t){let n=e[t];if(!n)return"";if(n.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let r=typeof n.reason=="string"?n.reason:"",s=r.indexOf(":");return s>0&&s<r.length-1?`\u26D4 ${r.slice(0,s)} (${r.slice(s+1)})`:`\u26D4 ${r}`}function Ct(e){return e&&typeof e=="object"?e:{}}function Sh(e,t,n){let r=Ct(t);if(Object.keys(r).length===0)return null;let s=e.execution_defaults,o=e.runner_catalog,a=e.session_defaults;if(!s||!o||!a)return null;let i=h=>tn({pin:h,global:a,execution_defaults:s,runner_catalog:o,route:n}),c,u;try{c=i(r),u=i(null)}catch{return null}let d=Ld(_r(c,o),_r(u,o)),_=Ld(Qn(c,null),Qn(u,null));return d||_?{orchestration:d,worker:_}:null}function Ld(e,t){return!e||t&&t.text===e.text?null:e}function Eh(e){return{id:e.id,label:`\u{1F512} \uC120\uD589 ${e.id} (${e.location_label})`,title:`\uC774 \uC774\uC288\uB294 ${e.id}\uAC00 close\uB420 \uB54C\uAE4C\uC9C0 \uCD9C\uBC1C\uD558\uC9C0 \uC54A\uB294\uB2E4`}}function Th(e,t){let n=t.get(e);return n?{id:e,label:`\u2192 \uD6C4\uC18D ${e} (${Hr(n)})`,title:`\uC774 \uC774\uC288\uAC00 close\uB418\uBA74 ${e}\uAC00 \uC790\uAE30 \uB808\uD3EC \uD050\uC5D0\uC11C \uCD9C\uBC1C\uD55C\uB2E4`}:null}function Ch(e,t,n){let r=new Map;for(let c of e)r.set(c,Array.from(n.get(c)||[]).filter(u=>e.includes(u)).length);let s=[],o=new Map,a=e.filter(c=>(r.get(c)||0)===0).sort();for(let c of a)o.set(c,0);let i=[...a];for(;i.length>0;){let c=i.shift();s.push(c);let u=Array.from(t.get(c)||[]).filter(_=>e.includes(_)).sort(),d=(o.get(c)||0)+(u.length>1?1:0);for(let _ of u){let h=(r.get(_)||0)-1;r.set(_,h);let w=o.get(_);o.set(_,w===void 0?d:Math.min(w,d)),h===0&&i.push(_)}}return{order:s,indent:o,cycle:s.length!==e.length}}function Rh(e,t,n){let r=new Map,s=new Map,o=new Set,a=(d,_,h)=>{let w=d.get(_);w?w.add(h):d.set(_,new Set([h]))},i=d=>t.get(d)?.lane==="done";for(let[d,_]of e)if(!i(d))for(let h of _)h===d||i(h)||(o.add(h),o.add(d),a(r,h,d),a(s,d,h));let c=new Set,u=[];for(let d of Array.from(o).sort()){if(c.has(d))continue;let _=[],h=[d];for(c.add(d);h.length>0;){let N=h.pop();_.push(N);for(let M of[...r.get(N)||[],...s.get(N)||[]])c.has(M)||(c.add(M),h.push(M))}if(_.length<2)continue;let w=_.map(N=>t.get(N));if(w.every(N=>!!N&&/^s[1-5]$/.test(N.lane||""))&&w.every(N=>N&&w[0]&&N.root_dir===w[0].root_dir&&N.lane===w[0].lane))continue;let{order:P,indent:z,cycle:Q}=Ch(_.slice().sort(),r,s),ae=Q?_.slice().sort():P;u.push({key:_.slice().sort().join("\0"),cycle:Q,nodes:ae.map(N=>{let M=t.get(N);return{id:N,workspace_name:M?M.workspace_name:"",root_dir:M?M.root_dir:"",location_label:M?Hr(M):Id(N,n),indent:Q?0:z.get(N)||0}})})}return u}function Id(e,t){let n=Mi(e,t);return n==="internal"?"\uBBF8\uC801\uC7AC":n==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778"}function Pd(e,t,n){let r=t.get(e);if(!r)return Id(e,n);if(typeof r.position=="number"){if(r.lane==="parallel")return`#${r.position}`;if(/^s[1-5]$/.test(r.lane))return`${r.lane} #${r.position}`}return Hr(r)}function Oh(e,t,n){let r=[];for(let s of n.get(e)||[])s!==e&&t.has(s)&&!r.includes(s)&&r.push(s);return r}function Lh(e,t,n,r,s,o,a){let i=(_,h,w,$,P=!1)=>{let z=r.get(_),Q=z&&z.lane==="parallel"&&typeof z.position=="number"?z.position-1:null;return{id:_,title:o.get(_)||_,workflow:a.get(_)||null,root_dir:z?z.root_dir:"",workspace_name:z?z.workspace_name:"",seq:h,indent:w,predecessors:$,location_label:Pd(_,r,s),draggable:!P&&Q!==null,...Q!==null?{queue_index:Q}:{}}},c=[];for(let _ of e.slice().sort((h,w)=>h.key<w.key?-1:1)){let h=new Set(_.nodes.map(w=>w.id));c.push({lane_id:`chain:${_.key}`,label:"",pending:!1,cycle:_.cycle,rows:_.nodes.map((w,$)=>i(w.id,$+1,_.cycle?0:w.indent,_.cycle?[]:Oh(w.id,h,n),_.cycle))})}let u=new Set;for(let _ of c)for(let h of _.rows)u.add(h.id);let d=[];return t.forEach((_,h)=>{let w=_&&typeof _.seed=="string"&&_.seed.length>0?_.seed:null;w!==null&&u.has(w)||(d.push(h),c.push({lane_id:`pending:${h}`,label:"",pending:!0,cycle:!1,rows:w===null?[]:[i(w,1,0,[])]}))}),c.forEach((_,h)=>{_.label=`\uC5F0\uACB0 ${h+1} \xB7 \uB808\uD3EC \uAC04`}),{chain_lanes:c,pending_lanes_kept:d}}function Ih(e,t,n){if(e.lane==="runnable"){let a=n.get(e.id);return a?a.length===0?{scope:[],state:"missing"}:{scope:a,state:"declared"}:{scope:[],state:void 0}}let r=t.get(e.root_dir),s=r?r[e.id]:void 0;if(!s||!Array.isArray(s.scope))return{scope:[],state:void 0};let o=s.scope.filter(a=>typeof a=="string"&&a.length>0);return{scope:o,state:o.length===0?"missing":"declared"}}function Ph(e,t,n,r,s){let o=new Map;for(let i of[...e.running,...e.queue,...e.runnable]){if(!t.has(i.root_dir))continue;let{scope:c,state:u}=Ih(i,t,n);if(u!==void 0&&(i.scope_state=u),c.length===0)continue;let d=o.get(i.root_dir);d?d.push({item:i,scope:c}):o.set(i.root_dir,[{item:i,scope:c}])}let a=(i,c,u)=>{let d={id:c.id,title:c.title,location_label:Pd(c.id,r,s),prefixes:u};i.overlap_chips?i.overlap_chips.push(d):i.overlap_chips=[d]};for(let i of o.values())for(let c=0;c<i.length;c+=1)for(let u=c+1;u<i.length;u+=1){let d=ta(i[c].scope,i[u].scope);d.length!==0&&(a(i[c].item,i[u].item,d),a(i[u].item,i[c].item,d))}}function Di(e){if(typeof e=="number")return Number.isFinite(e)?e:null;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:null}return null}function oa(e){if(typeof e=="number"&&Number.isFinite(e))return e;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function qi(e,t,n){let r=Array.isArray(e)?e:[],s=Array.isArray(t)?t:[],o=n&&typeof n.done_since=="number"?n.done_since:void 0,a={...Gr,...n&&n.candidate_filter?n.candidate_filter:{}},i=n&&Ls.some(I=>I.value===n.candidate_sort)?n.candidate_sort:"repo_spec",c=new Map;for(let I of s)I&&typeof I.root_dir=="string"&&c.set(I.root_dir,I);let u=[],d=[],_=[],h=[],w=[],$=[],P=new Map,z=new Map,Q=new Map,ae=new Map,N=new Map,M=new Map,q=new Map,G=new Map,E=new Map;for(let I of r){if(!I||typeof I.root_dir!="string")continue;let me=I.root_dir,$e=I.name||me,Se=c.get(me),Ge=Se&&typeof Se.revision=="number"?Se.revision:typeof I.revision=="number"?I.revision:0,qe=Ct(I.attempts),K=Ct(I.bead_titles);for(let[g,k]of Object.entries(K))typeof k=="string"&&k.length>0&&G.set(g,k);let X=Ct(I.bead_times),Me=Ct(I.pr_observations),et=Ct(I.admission),Ve=Ct(I.revise_parked),De=Ct(I.merge_queue_state),Ke=Ct(I.cleanup_failed),st=Ct(I.discard_operations),Ne=Ct(I.bead_blocked_by);Object.hasOwn(I,"bead_scope")&&M.set(me,Ct(I.bead_scope));let Be=Ct(I.bead_workflow);for(let[g,k]of Object.entries(Be))k&&typeof k=="object"&&E.set(g,k);let dt=Ct(I.pr_activity),ht=Array.isArray(I.repo_operations)?I.repo_operations:[],bt=Array.isArray(I.merge_queue)?I.merge_queue:[],ft=new Set(bt.filter(g=>g&&typeof g.bead_id=="string").map(g=>g.bead_id)),kt=new Map(bt.filter(g=>g&&typeof g.bead_id=="string").map(g=>[g.bead_id,g])),Rt=Array.isArray(I.queue)?I.queue:[],$t=(Array.isArray(I.serial_lanes)?I.serial_lanes:[]).filter(g=>g&&/^s[1-5]$/.test(g.id)&&Array.isArray(g.entries)),xt=Ct(I.lane_states),Ye=typeof I.serial_lane_count=="number"?Math.max(0,Math.min(5,Math.floor(I.serial_lane_count))):Math.min(5,$t.length);Q.set(me,Ye),ae.set(me,Rt.length);let L=new Map($t.map(g=>[g.id,g])),U=new Map;for(let g of $t)for(let k of g.entries)k&&typeof k.bead_id=="string"&&U.set(k.bead_id,g.id);for(let[g,k]of Object.entries(Ne))Array.isArray(k)&&N.set(g,k.filter(j=>typeof j=="string"&&j.length>0));let Y=Array.isArray(I.done)?I.done:[];for(let g of Y)g&&typeof g.bead_id=="string"&&$.push({id:g.bead_id,root_dir:me,workspace_name:$e});let ne=new Map;for(let g of Y)g&&typeof g.bead_id=="string"&&typeof g.added_at=="number"&&ne.set(g.bead_id,g.added_at);let xe=g=>({id:g,title:K[g]||g,root_dir:me,workspace_name:$e,expected_revision:Ge,draggable:!1,...Ct(X[g]).created_at?{created_at:Ct(X[g]).created_at}:{},...Ct(X[g]).updated_at?{updated_at:Ct(X[g]).updated_at}:{}}),He=new Set;for(let[g,k]of Ah(qe,ne))He.add(g),d.push({...xe(g),lane:"running",...U.has(g)?{serial_lane_id:U.get(g)}:{},attempt_id:k.attempt_id,run_state:k.run_state,status:k.status||void 0,workflow:Be[g]||null,can_pause:k.can_pause,can_resume:k.can_resume,started_at:k.started_at,last_event_at:k.last_event_at,last_activity:k.last_activity,legs:k.legs,runner:k.runner,model:k.model,effort:k.effort,speed:k.speed,resumed_from:k.resumed_from,continuation_mode:k.continuation_mode,usage:k.usage,exec_chips:{orchestration:Es(k),worker:null},discard:xn(st,g,{attempt_id:k.attempt_id}),badges:k.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:k.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:[],alert:k.run_state==="failed"});for(let[g,k]of vd(qe)){if(d.some(re=>re.id===g))continue;let j=k.attempt,se=k.kind==="head_review"?"\uB9AC\uBDF0":"\uC218\uB9AC";d.push({...xe(g),lane:"running",kind:"session",attempt_id:typeof j.attempt_id=="string"?j.attempt_id:"",run_state:"running",status:"running",non_occupying:!0,workflow:Be[g]||null,can_pause:!1,can_resume:!1,started_at:k.started_at,last_event_at:typeof j.last_event_at=="number"?j.last_event_at:null,last_activity:j.last_activity&&typeof j.last_activity=="object"?j.last_activity:null,legs:Array.isArray(j.legs)?j.legs:[],runner:typeof j.runner=="string"?j.runner:null,model:typeof j.model=="string"?j.model:null,effort:typeof j.effort=="string"?j.effort:null,speed:typeof j.speed=="string"?j.speed:null,resumed_from:null,continuation_mode:null,usage:j.usage&&typeof j.usage=="object"?j.usage:null,exec_chips:{orchestration:Es(j),worker:null},discard:xn(st,g,{merge_queued:!0}),badges:[k.origin==="auto"?`${se} \xB7 \uC790\uB3D9`:se],alert:!1})}for(let g of Array.isArray(I.session_active)?I.session_active:[]){let k=g&&g.bead_id;typeof k!="string"||He.has(k)||(He.add(k),Array.isArray(g.blocked_by)&&g.blocked_by.length>0&&N.set(k,g.blocked_by.filter(j=>typeof j=="string"&&j.length>0)),typeof g.title=="string"&&g.title.length>0&&G.set(k,g.title),g.workflow&&typeof g.workflow=="object"&&E.set(k,g.workflow),d.push({...xe(k),title:g.title||K[k]||k,lane:"running",kind:"session",status:"in_progress",started_at:Di(g.started_at)??Di(g.updated_at)??void 0,updated_at:Di(g.updated_at)??void 0,workflow:g.workflow||null,labels:Array.isArray(g.labels)?g.labels:[],spec_id:typeof g.spec_id=="string"?g.spec_id:"",blocked:g.blocked===!0,...Array.isArray(g.blocked_by)?{blocked_by:g.blocked_by.filter(j=>typeof j=="string"&&j.length>0)}:{},draggable:!1,can_pause:!1,can_resume:!1,exec_chips:null,usage:null,legs:[],last_activity:null,badges:[],alert:!1}))}for(let g of Array.isArray(I.pr_wait)?I.pr_wait:[]){let k=g&&g.bead_id;if(typeof k!="string"||He.has(k))continue;He.add(k);let j=Ct(Me[k]),se=Ct(j.pr),re=j.gate?Ct(j.gate):null,ye=ft.has(k),_e=kt.get(k)?.continuation_action||null,nt=!!_e&&_e.continuation===null,_t=De.active===k,tt=g.external===!0,ot=Ke[k]||null,Ot=Ct(dt[k]),gt=Os({bead_id:k,merge_sha:g.merge_sha,cleanup_cursor:g.cleanup_cursor,merge_progress:Ot.merge_progress||null,cleanup_failed:ot,repo_operations:ht}),dn=sa(gt),Bt=!!re&&re.base_badge==="\uCDA9\uB3CC",Dt=!!ot&&["child_sweep","branch_cleanup","parent_close"].includes(ot.step)&&!!re&&re.tier==="merged",Gt=tt&&!!ot&&!!re&&re.tier==="merged",qt=!!re&&["closed_unmerged","review","undecidable"].includes(re.tier),Pt=xn(st,k,{external:tt,merge_active:_t||gt?.step==="merge",merge_queued:ye,cleanup_active:dn,merged:!!ot||re?.tier==="merged"}),We=!!Pt.operation;_.push({...xe(k),lane:"pr_wait",workflow:Be[k]||null,pr_number:typeof se.number=="number"?se.number:null,pr_url:typeof se.url=="string"?se.url:void 0,external:tt,usage:_n(qe,k),merge_step:gt,badges:nt?["\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"]:gt?[re?.tier==="merged"?"\uBA38\uC9C0\uB428":"\uBA38\uC9C0 \uC911"]:ot?[mr(ot.step)?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${mr(ot.step)}`:"\uC815\uB9AC \uBA48\uCDA4"]:typeof re?.gate_badge=="string"&&re.gate_badge.length>0?[re.gate_badge]:[],alert:gt?gt.failed===!0:!!ot||qt,reason:ot&&gt?.active!==!0?ra(ot.step):"PR \uB300\uAE30",merge_action:re?.tier==="merged"&&!Dt&&!Gt?!1:!ye||nt,merge_enabled:!We&&(nt||re?.enabled===!0||Bt||Dt||Gt),merge_label:nt?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":Gt||Dt?"\uC815\uB9AC \uC7AC\uAC1C":Bt&&!Dt?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:nt?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":We?Pt.error?`\uD3D0\uAE30 \uC2E4\uD328: ${Pt.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${Pt.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:Gt?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Dt?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Bt?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":re?.enabled===!0?`\uBA38\uC9C0 (${re.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${re?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:ye&&!nt,cancel_enabled:!_t,continuation_mismatch:_e?.mismatch||null,discard:Pt,discard_action:Pt.action,discard_enabled:Pt.enabled,discard_title:Pt.title})}let Z=(g,k,j,se)=>{let re=g&&g.bead_id;if(typeof re!="string"||He.has(re))return null;He.add(re);let ye=Ve[re],_e=xn(st,re),nt=_e.operation?_e:null,_t={...xe(re),lane:k,workflow:Be[re]||null,draggable:!nt,discard:nt||void 0,reason:Od(et,re),seq:j+1,queue_position:j+1,queue_index:j,queue_length:se,badges:ye?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!ye,revise_action:!!ye,revise_enabled:!!ye&&!nt,revise_title:ye?ye.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${ye.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""};return Object.hasOwn(Ne,re)&&(_t.blocked_by=Array.isArray(Ne[re])?Ne[re].filter(tt=>typeof tt=="string"&&tt.length>0):[]),_t};for(let g=0;g<Rt.length;g++){let k=Z(Rt[g],"queue",g,Rt.length);if(!k)continue;h.push(k);let j=P.get(me);j?j.push(k):P.set(me,[k])}let ee=g=>{let k=_.find(re=>re.id===g&&re.root_dir===me);if(k)return{id:g,title:k.title,badge:"PR \uB300\uAE30 \xB7 \uC810\uC720"};let j=d.find(re=>re.id===g&&re.root_dir===me),se=j&&j.run_state==="failed"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":j&&j.run_state==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720";return{id:g,title:j?j.title:xe(g).title,badge:se}},Oe=[];for(let g=0;g<Math.max(Ye,$t.length);g++){let k=`s${g+1}`,j=L.get(k),se=j&&Array.isArray(j.entries)?j.entries:[],re=[];for(let nt=0;nt<se.length;nt++){let _t=Z(se[nt],k,nt,se.length);_t&&(re.push(_t),h.push(_t))}let ye=Ct(xt[k]),_e=Array.isArray(ye.occupied_by)?ye.occupied_by.filter(nt=>typeof nt=="string"):[];re.length===0&&_e.length===0&&(Ye<=1||g>=Ye)||Oe.push({id:k,index:g,items:re,raw_length:se.length,occupied_by:_e,occupants:_e.map(nt=>ee(nt)),corrections:Array.isArray(ye.corrections)?ye.corrections.length:0,cycle:ye.cycle===!0,...re.length===0&&_e.length===0?{empty:!0}:{}})}z.set(me,Oe);let S=Array.from({length:Ye},(g,k)=>{let j=`s${k+1}`,se=L.get(j),re=se&&Array.isArray(se.entries)?se.entries:[],ye=Ct(xt[j]);return{id:j,index:re.length,length:re.length,occupied_by:Array.isArray(ye.occupied_by)?ye.occupied_by.filter(_e=>typeof _e=="string"):[]}});for(let g of Array.isArray(I.runnable)?I.runnable:[]){let k=g&&g.bead_id;if(typeof k!="string"||He.has(k))continue;He.add(k);let j=g.workflow&&typeof g.workflow=="object"?g.workflow:null,se=j&&typeof j.route=="string"&&j.route||(typeof g.route=="string"?g.route:null),re=Sh(Ct(Se),g.exec_pins,se);Array.isArray(g.blocked_by)&&g.blocked_by.length>0&&N.set(k,g.blocked_by.filter(ye=>typeof ye=="string"&&ye.length>0)),typeof g.title=="string"&&g.title.length>0&&G.set(k,g.title),j&&E.set(k,j),Array.isArray(g.scope)&&q.set(k,g.scope.filter(ye=>typeof ye=="string"&&ye.length>0)),u.push({...xe(k),title:g.title||K[k]||k,lane:"runnable",draggable:!0,reason:Od(et,k),created_at:g.created_at??void 0,updated_at:g.updated_at??void 0,status:typeof g.status=="string"?g.status:void 0,labels:Array.isArray(g.labels)?g.labels:[],spec_id:typeof g.spec_id=="string"?g.spec_id:"",workflow:j||(se?{route:se,chips:{route:se}}:null),...re?{exec_chips:re}:{},blocked:g.blocked===!0,...Array.isArray(g.blocked_by)?{blocked_by:g.blocked_by.filter(ye=>typeof ye=="string"&&ye.length>0)}:{},place_index:Rt.length,place_lanes:S})}for(let g of Y){let k=g&&g.bead_id;if(typeof k!="string"||He.has(k)||(He.add(k),o!==void 0&&typeof g.added_at=="number"&&g.added_at<o))continue;let j=xh(qe,k),se=j&&typeof j.done_kind=="string"?j.done_kind:null;w.push({...xe(k),lane:"done",done:!0,done_layout:"three_line",usage:_n(qe,k),work_ms:Go(qe,k),done_at:typeof g.added_at=="number"?g.added_at:void 0,done_kind:se,badges:[...se&&Rd[se]?[Rd[se]]:[],...Ho(qe,k)]})}}let W=new Map;s.forEach((I,me)=>{I&&typeof I.root_dir=="string"&&W.set(I.root_dir,me)});let B=n&&n.running_sort==="repo"?"repo":"started";d.sort((I,me)=>{let $e=I.kind==="session",Se=me.kind==="session";if($e!==Se)return $e?1:-1;if($e&&Se){let K=oa(me.updated_at)-oa(I.updated_at);return K!==0?K:I.id.localeCompare(me.id)}if(B==="repo"){let K=W.get(I.root_dir)??Number.MAX_SAFE_INTEGER,X=W.get(me.root_dir)??Number.MAX_SAFE_INTEGER;if(K!==X)return K-X}let Ge=typeof I.started_at=="number"&&Number.isFinite(I.started_at)?I.started_at:null,qe=typeof me.started_at=="number"&&Number.isFinite(me.started_at)?me.started_at:null;return Ge!==null&&qe!==null&&Ge!==qe?Ge-qe:Ge===null&&qe!==null?1:Ge!==null&&qe===null?-1:I.id.localeCompare(me.id)}),w.sort((I,me)=>(me.done_at??0)-(I.done_at??0));let ve=s.length>0?s:r.map(I=>({root_dir:I&&I.root_dir,name:I&&I.name,auto_advance:I&&I.auto_advance,auto_merge:I&&I.auto_merge,slots:I&&I.slots,revision:I&&I.revision,runner_catalog:I&&I.runner_catalog})),fe=new Set(u.map(I=>I.root_dir)),ge=[];for(let I of ve){if(!I||typeof I.root_dir!="string")continue;let me=P.get(I.root_dir)||[],$e=z.get(I.root_dir)||[];!(me.length>0||$e.some(Ge=>Ge.items.length>0||Ge.occupied_by.length>0))&&!fe.has(I.root_dir)||ge.push({root_dir:I.root_dir,name:I.name||I.root_dir,auto_advance:I.auto_advance===!0,auto_merge:I.auto_merge===!0,slots:typeof I.slots=="number"&&I.slots>=Cd?I.slots:Cd,revision:typeof I.revision=="number"?I.revision:0,runner_catalog:Ct(I.runner_catalog),items:me,sublanes:{parallel:me,serial:$e},serial_lane_count:Q.get(I.root_dir)||0,raw_queue_length:ae.get(I.root_dir)||0})}let V={runnable:u,runnable_hidden:{blocked:0,spec:0},runnable_sections:[],runnable_flat:i==="updated_flat",queue:h,queue_groups:ge,running:d,pr_wait:_,done:w,chains:[],parallel_rows:[],chain_lanes:[],parallel_raw_length:Object.fromEntries(ae),owner_of:{},pending_lanes_kept:[]},Te=Ad(V);for(let I of $)Te.has(I.id)||Te.set(I.id,{root_dir:I.root_dir,workspace_name:I.workspace_name,lane:"done",state:"done"});let Re=new Map;for(let[I,me]of N)for(let $e of me){let Se=Re.get($e);Se?Se.includes(I)||Se.push(I):Re.set($e,[I])}for(let I of[...V.queue,...V.runnable]){if(!Object.hasOwn(I,"blocked_by"))continue;let me=Te.get(I.id);I.blockers=(I.blocked_by||[]).map($e=>Sd($e,me,Te,s)),I.blocker_warnings=I.blockers.filter($e=>$e.missing_internal).map($e=>`\u26A0 \uC120\uD589 ${$e.id}\uAC00 \uC5B4\uB290 \uB808\uC778\uC5D0\uB3C4 \uC5C6\uACE0 \uC2E4\uD589 \uC911\uB3C4 \uC544\uB2D8 \u2014 \uC218\uB3D9 \uAC1C\uC785 \uC804\uAE4C\uC9C0 \uC774 \uC790\uB9AC\uC5D0\uC11C \uC815\uC9C0`),I.blocker_warnings.length>0&&(I.alert=!0)}for(let I of[...V.queue,...V.runnable,...V.running,...V.pr_wait]){let me=I.lane==="running"||I.lane==="pr_wait"?[]:(I.blockers||[]).map(Eh),$e=[];for(let qe of Re.get(I.id)||[]){let K=Th(qe,Te);K&&$e.push(K)}let Se=I.lane==="running"||I.lane==="pr_wait"?[]:I.blocker_warnings||[];if(me.length===0&&$e.length===0&&Se.length===0)continue;let Ge={predecessors:me,successors:$e,warnings:Se};I.dependency_chips=Ge}Ph(V,M,q,Te,s),V.chains=Rh(N,Te,s);let ie=Ed(V.queue_groups);for(let I of V.queue_groups)for(let me of I.sublanes.serial){let $e=ie.get(Td(I.root_dir,me.id));$e&&(me.cross_wait_peers=$e)}let de=Lh(V.chains,Array.isArray(n?.pending_lanes)?n.pending_lanes:[],N,Te,s,G,E);V.chain_lanes=de.chain_lanes,V.pending_lanes_kept=de.pending_lanes_kept;let Ae=new Map;for(let I of[...V.running,...V.queue,...V.runnable])Ae.has(I.id)||Ae.set(I.id,I);let H=new Set;for(let I of V.chain_lanes)for(let me of I.rows){H.add(me.id);let $e=Ae.get(me.id);$e&&($e.overlap_chips&&(me.overlap_chips=$e.overlap_chips),$e.scope_state&&(me.scope_state=$e.scope_state))}let te=[];for(let I of P.values())for(let me of I)H.has(me.id)||te.push(me);te.sort((I,me)=>{let $e=I.workspace_name.localeCompare(me.workspace_name);return $e!==0?$e:(I.queue_index??0)-(me.queue_index??0)}),V.parallel_rows=te;let ce={};for(let[I,me]of Te)typeof me.root_dir=="string"&&me.root_dir.length>0&&(ce[I]=me.root_dir);V.owner_of=ce;let ke=V.runnable.length,be=V.runnable;a.show_blocked||(be=be.filter(I=>I.blocked!==!0));let je=be.length;a.spec==="with"?be=be.filter(I=>!!I.spec_id):a.spec==="without"&&(be=be.filter(I=>!I.spec_id)),V.runnable_hidden={blocked:ke-je,spec:je-be.length};let we=(I,me)=>{let $e=oa(me.updated_at)-oa(I.updated_at);return $e!==0?$e:I.id.localeCompare(me.id)},it=i==="repo_spec"?(I,me)=>{let $e=I.spec_id?0:1,Se=me.spec_id?0:1;return $e!==Se?$e-Se:we(I,me)}:we;if(i==="updated_flat")V.runnable=be.slice().sort(we),V.runnable_sections=[];else{let I=new Map;for(let Se of be){let Ge=I.get(Se.root_dir);Ge?Ge.push(Se):I.set(Se.root_dir,[Se])}let me=[],$e=[];for(let Se of ve){if(!Se||typeof Se.root_dir!="string")continue;let Ge=(I.get(Se.root_dir)||[]).slice().sort(it);I.delete(Se.root_dir),Ge.length!==0&&(me.push({root_dir:Se.root_dir,name:Se.name||Se.root_dir,items:Ge.map(qe=>({...qe,workspace_name:""}))}),$e.push(...Ge))}for(let[Se,Ge]of I){let qe=Ge.slice().sort(it);me.push({root_dir:Se,name:qe[0]?.workspace_name||Se,items:qe.map(K=>({...K,workspace_name:""}))}),$e.push(...qe)}V.runnable=$e,V.runnable_sections=me}return V}var Md="\uAC19\uC740 \uC9C1\uB82C \uB808\uC778\uC73C\uB85C";function Dd(e){return typeof e.lane=="string"&&/^s[1-5]$/.test(e.lane)?e.lane:e.lane==="running"&&e.serial_lane_id?e.serial_lane_id:null}function Nd(e){return e.lane==="runnable"||e.lane==="queue"||typeof e.lane=="string"&&/^s[1-5]$/.test(e.lane)}var Bd="bdui.monitor.done-range",Ud="bdui.monitor.running_sort",Wd="bdui.monitor.candidate_sort",zd="beads-ui.monitor.candidate-filter",Hd="beads-ui.monitor.sections";function Mh(){try{let e=window.localStorage.getItem(zd);if(!e)return{...Gr};let t=JSON.parse(e);return!t||typeof t!="object"?{...Gr}:{show_blocked:typeof t.show_blocked=="boolean"?t.show_blocked:Gr.show_blocked,spec:Ni.some(n=>n.value===t.spec)?t.spec:"all"}}catch{return{...Gr}}}function qd(e){try{window.localStorage.setItem(zd,JSON.stringify({show_blocked:e.show_blocked,spec:e.spec}))}catch{}}function Dh(){try{let e=window.localStorage.getItem(Wd);return Ls.some(t=>t.value===e)?e:"repo_spec"}catch{return"repo_spec"}}function Nh(e){try{window.localStorage.setItem(Wd,e)}catch{}}function qh(){try{let e=window.localStorage.getItem(Hd);if(!e)return{};let t=JSON.parse(e);return t&&typeof t=="object"?t:{}}catch{return{}}}function Fd(e){try{window.localStorage.setItem(Hd,JSON.stringify(e))}catch{}}function Fh(){try{let e=window.localStorage.getItem(Bd);return fn(e)?e:on}catch{return on}}function jh(e){try{window.localStorage.setItem(Bd,e)}catch{}}function Bh(){try{return window.localStorage.getItem(Ud)==="repo"?"repo":"started"}catch{return"started"}}function Uh(e){try{window.localStorage.setItem(Ud,e)}catch{}}var Gd="tab:monitor:pipeline",Wh=1e3,zh=[{lane:"runnable",pane:"candidate",title:"\uC2E4\uD589\uAC00\uB2A5",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589\uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}],jd="\u2460\u2461\u2462\u2463\u2464\u2465\u2466\u2467\u2468\u2469\u246A\u246B\u246C\u246D\u246E\u246F\u2470\u2471\u2472\u2473";function Hh(e){return e>=1&&e<=jd.length?jd[e-1]:`(${e})`}function Vd(e,t){let n=Lt("views:monitor"),r=t.gotoIssue,s=t.pipelineStore,o=t.transport,a=t.getWorkspacePath,i=t.openDoc,c=t.switchWorkspace,u=t.router,d=t.now||(()=>Date.now()),_=t.confirm||(v=>typeof globalThis.confirm!="function"||globalThis.confirm(v)),h=Fh(),w=Bh(),$=Mh(),P=Dh(),z=qh(),Q=null,ae=null,N=null,M=[],q=null;function G(){let v=Wn.find(b=>b.value===h);return v?v.label:""}let E=document.createElement("div");E.className="mon",e.appendChild(E);let W=document.createElement("div");W.className="mon2-drawer",e.appendChild(W);let B=qi(null,null),ve=new Map,fe=new Map,ge=null,V=null,Te=null,Re=Dr(W,{transport:o,sessionLogStore:t.sessionLogStore,onClose:()=>{Q=null,Y()}});async function ie(v,b,x,D,J=!0){if(!o||!x)return null;let he=await o(v,{...b,root_dir:x,expected_revision:D});if(he&&he.conflict&&J){he.queue&&fe.set(x,he.queue);let Ie=he.queue&&typeof he.queue.revision=="number"?he.queue.revision:D;he=await o(v,{...b,root_dir:x,expected_revision:Ie})}return he&&he.queue&&x&&fe.set(x,he.queue),he}function de(v,b){let x=fe.get(v),D=s&&s.get?s.get():null,J=(Array.isArray(D)?D:[]).find(Ie=>Ie?.root_dir===v);return(x||J)?.merge_queue?.find(Ie=>Ie.bead_id===b)?.continuation_action}async function Ae(v,b,x,D){let J=await ie(v,b,x,D),he=fe.get(x)?.revision??J?.queue?.revision??D;return Ln(J,(Ie,rt)=>ie(v,{...b,continuation:Ie,decision_token:rt},x,he,!1),{refresh:Ie=>ie(v,b,x,Ie?.queue?.revision??fe.get(x)?.revision??he,!1)})}async function H(v,b,x,D){let J=await Ln({continuation_mismatch:D},(Ie,rt)=>ie("worker-merge-queue-add",{bead_id:b,continuation:Ie,decision_token:rt},v,x,!1)),he=J?.queue?.merge_queue?.find(Ie=>Ie.bead_id===b)?.continuation_action;J?.applied!==!0&&he?.continuation===null&&he.mismatch&&await H(v,b,J.queue.revision,he.mismatch)}async function te(v,b,x){let D=await ie("worker-discard",v,b,x);if(D&&D.discarded===!0){ue(Ko(D),"success",5e3);return}if(D&&D.reason){ue(`\uD3D0\uAE30 \uC2E4\uD328: ${D.reason}`,"error");return}if(D&&D.accepted&&D.pending==="merged_revert"){ue("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if(D&&D.accepted){ue(`\uD3D0\uAE30 \uC9C4\uD589: ${D.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}D&&!D.conflict&&ue("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function ce(v,b,x){return!o||!x?null:await o(v,{...b,root_dir:x})}async function ke(){let v=new Map;for(let b of B.pr_wait)v.has(b.root_dir)||v.set(b.root_dir,b.expected_revision);for(let[b,x]of v)await ie("worker-merge-queue-add-all",{},b,x)}function be(v){let b=z[v];return!!(b&&b.runnable===!0)}function je(v){let b={...z[v]||{}};b.runnable=!b.runnable,z={...z,[v]:b},Fd(z),Y()}function we(v){return z[v]===!0}function Je(v){z={...z,[v]:z[v]!==!0},Fd(z),Y()}function it(v){let b=B.queue_groups.find(x=>x.root_dir===v);if(!b)return null;for(let x=0;x<b.serial_lane_count;x+=1){let D=`s${x+1}`,J=b.sublanes.serial.find(he=>he.id===D);if(!J||J.raw_length===0&&J.occupied_by.length===0)return D}return null}function I(v,b){let x=B.queue_groups.find(J=>J.root_dir===v),D=x?x.sublanes.serial.find(J=>J.id===b):void 0;return D?D.raw_length:0}function me(v,b){let x=ve.get(v),D=ve.get(b);if(!x||!D)return{kind:"note",text:"\uC0C1\uB300\uC758 \uD604\uC7AC \uC704\uCE58\uB97C \uC54C \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"};let J=Dd(x),he=Dd(D);if(J!==null&&J===he&&x.root_dir===D.root_dir)return{kind:"note",text:"\uC774\uBBF8 \uAC19\uC740 \uC9C1\uB82C \uB808\uC778 \u2014 \uC21C\uC11C\uAC00 \uC788\uC2B5\uB2C8\uB2E4"};let Ie=Nd(x),rt=Nd(D);if(Ie&&he!==null){let A=he;return{kind:"ops",title:`${A} \uB05D\uC5D0 ${v}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,root_dir:D.root_dir,ops:[{bead_id:v,lane:A,index:I(D.root_dir,A)}]}}if(J!==null&&rt&&he===null){let A=J;return{kind:"ops",title:`${A} \uB05D\uC5D0 ${b}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,root_dir:x.root_dir,ops:[{bead_id:b,lane:A,index:I(x.root_dir,A)}]}}if(Ie&&J===null&&rt&&he===null){let A=it(x.root_dir);return A===null?{kind:"disabled",title:"\uBE48 \uC9C1\uB82C \uB808\uC778 \uC5C6\uC74C \u2014 Worker \uD0ED\uC5D0\uC11C \uB808\uC778 \uC218 \uC870\uC808"}:{kind:"ops",title:`${A} \uB808\uC778\uC5D0 ${b} \u2192 ${v} \uC21C\uC11C\uB85C \uB123\uC2B5\uB2C8\uB2E4`,root_dir:x.root_dir,ops:[{bead_id:b,lane:A,index:0},{bead_id:v,lane:A,index:1}]}}return!Ie&&!rt?{kind:"note",text:"\uB458 \uB2E4 \uC2E4\uD589 \uC911 \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}:Ie?{kind:"note",text:"\uC2E4\uD589 \uC911 \u2014 \uC885\uB8CC \uD6C4 \uCD9C\uBC1C\uD558\uB824\uBA74 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694"}:{kind:"note",text:"\uC2E4\uD589 \uC911 \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4\uB824\uBA74 \uC0C1\uB300\uB97C \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694"}}function $e(v,b){let x=me(v,b.id);return{id:b.id,title:b.title,location_label:b.location_label,prefixes:b.prefixes,action:x.kind==="note"?{kind:"note",text:x.text}:x.kind==="disabled"?{kind:"disabled",label:Md,title:x.title}:{kind:"place",label:Md,title:x.title}}}function Se(v,b){if(!N||N.bead_id!==v)return null;let x=N.counterpart_id,D=x===null?b:b.filter(J=>J.id===x);return D.length===0?null:{rows:D.map(J=>$e(v,J))}}function Ge(v){let b=v.dependency_chips||null,x=v.overlap_chips||[],D=v.scope_state==="missing";if(!b&&x.length===0&&!D)return null;let J=Se(v.id,x);return{...b||{},...x.length>0?{overlaps:x}:{},...D?{scope_missing:!0}:{},...J?{popover:J}:{}}}function qe(v){let b=Ge(v);return b?{...v,dependency_chips:b}:v}async function K(v,b){let x=me(v,b);if(N=null,x.kind!=="ops"){Y();return}let D=re(x.root_dir,x.ops[0].bead_id);for(let J of x.ops){let he=await X(J,x.root_dir,D);if(he===null)break;D=he}Y()}async function X(v,b,x){try{let D=await ie("worker-queue-place",v,b,x,!1);if(D&&D.conflict)return ue("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null;if(!D||D.applied!==!0)return ue(D&&typeof D.admission_reason=="string"?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${D.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null;let J=D.queue?D.queue.revision:void 0;return typeof J!="number"?(ue("\uD050 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),null):J}catch(D){return ue(g(D),"error"),null}}function Me(v){let b=be(v.root_dir);return l`<header class="mon2-sec__hd">
      <button
        type="button"
        class="mon2-sec__toggle"
        data-root-dir=${v.root_dir}
        data-section="runnable"
        aria-expanded=${b?"false":"true"}
        aria-label=${`${v.name} \uC139\uC158 ${b?"\uD3BC\uCE58\uAE30":"\uC811\uAE30"}`}
      >
        ${b?"\u25B8":"\u25BE"}
      </button>
      <span class="mon2-sec__name" title=${v.root_dir}>${v.name}</span>
      <span class="mon2-sec__count">${v.count}</span>
      <button
        type="button"
        class="mon2-sec__worker"
        data-root-dir=${v.root_dir}
        title="이 레포의 Worker 탭으로 이동"
      >
        Worker ↗
      </button>
    </header>`}function et(v,b){return l`<div
      class="mon2-item"
      data-bead-id=${v.id}
      data-drag-kind="candidate"
      data-root-dir=${v.root_dir}
    >
      ${b}
    </div>`}function Ve(v){if(ae!==v.id)return null;let b=B.queue_groups.find(D=>D.root_dir===v.root_dir),x=v.place_lanes||[];return{bead_id:v.id,lanes:[{id:"parallel",label:"\uBCD1\uB82C",count:v.place_index??0},...B.chain_lanes.map((D,J)=>({id:`lane:${J}`,label:`\uC5F0\uACB0 ${J+1} \uB05D\uC5D0`,count:D.rows.length})),{id:"new-lane",label:"\uC0C8 \uC5F0\uACB0 \uB808\uC778",count:0},...x.map(D=>({id:`serial:${D.id}`,label:`${b?b.name:""} \uC9C1\uB82C ${Number(D.id.slice(1))}`,count:D.length}))]}}function De(v){return et(v,$i(qe(v),Ve(v),{exec_chips_mode:"pinned_only",onOpenDoc:i?(b,x)=>i(x,v.root_dir):void 0}))}function Ke(){return B.runnable_flat?l`<div class="mon2-flat" data-drop="candidate">
        ${B.runnable.map(v=>De(v))}
      </div>`:l`${B.runnable_sections.map(v=>{let b=be(v.root_dir);return l`<section
        class="mon2-sec${b?" is-collapsed":""}"
        data-root-dir=${v.root_dir}
        data-section="runnable"
      >
        ${Me({root_dir:v.root_dir,name:v.name,count:v.items.length})}
        ${b?"":l`<div
              class="mon2-sec__body"
              data-lane="candidate"
              data-drop="candidate"
            >
              ${v.items.map(x=>De(x))}
            </div>`}
      </section>`})}`}function st(v,b){return l`<div
      class="mon2-item"
      data-bead-id=${v.id}
      data-drag-kind="parallel"
      data-root-dir=${v.root_dir}
      data-row-index=${b}
      data-queue-index=${String(v.queue_index??0)}
    >
      ${Kn(qe(v))}
      <span class="mon2-rowops">
        <button
          type="button"
          class="mon2-rowops__up"
          data-bead-id=${v.id}
          title="같은 레포 안에서 한 칸 위로"
          aria-label="한 칸 위로"
        >
          ↑
        </button>
        <button
          type="button"
          class="mon2-rowops__down"
          data-bead-id=${v.id}
          title="같은 레포 안에서 한 칸 아래로"
          aria-label="한 칸 아래로"
        >
          ↓
        </button>
        <button
          type="button"
          class="mon2-rowops__remove"
          data-bead-id=${v.id}
          title="대기에서 빼기"
          aria-label="대기에서 빼기"
        >
          ✕
        </button>
      </span>
    </div>`}function Ne(){let v=we("parallel");return l`<section
      class="mon2-area mon2-parallel${v?" is-collapsed":""}"
      data-area="parallel"
    >
      <header class="mon2-area__hd">
        <button
          type="button"
          class="mon2-area__toggle"
          data-area="parallel"
          aria-expanded=${v?"false":"true"}
          aria-label=${`\uBCD1\uB82C \uC601\uC5ED ${v?"\uD3BC\uCE58\uAE30":"\uC811\uAE30"}`}
        >
          ${v?"\u25B8":"\u25BE"}
        </button>
        <span class="mon2-area__name">병렬 영역</span>
        <span class="mon2-area__count">${B.parallel_rows.length}</span>
      </header>
      ${v?"":l`<div class="mon2-area__body" data-drop="parallel">
            ${B.parallel_rows.length===0?l`<div class="worker-pane__empty">
                  비어 있음 — 드래그로 배치
                </div>`:B.parallel_rows.map((b,x)=>st(b,x))}
          </div>`}
    </section>`}function Be(v,b,x){return l`<div
      class="mon2-crow"
      style=${`--indent: ${b.indent}`}
      draggable=${b.draggable?"true":"false"}
      data-bead-id=${b.id}
      data-drag-kind="chain"
      data-root-dir=${b.root_dir}
      data-lane-id=${v.lane_id}
      data-row-index=${x}
      data-queue-index=${typeof b.queue_index=="number"?String(b.queue_index):""}
    >
      ${v.cycle?"":l`<span class="mon2-crow__seq" aria-hidden="true"
            >${Hh(b.seq)}</span
          >`}
      ${b.workspace_name?l`<span class="worker-mini__repo" title=${b.root_dir}
            >${b.workspace_name}</span
          >`:""}
      <span class="worker-mini__id" title="클릭하면 ID 복사">${b.id}</span>
      ${Ur(b.workflow)}
      <span class="mon2-crow__title">${b.title}</span>
      ${b.predecessors.map(D=>l`<span class="worker-dep worker-dep--pred"
            ><span class="worker-dep__label">← ${D}</span></span
          >`)}
      <span class="mon2-crow__where"
        >${b.location_label==="\uC2E4\uD589\uC911"?`\u25CF ${b.location_label}`:b.location_label}</span
      >
      ${b.draggable?l`<button
            type="button"
            class="mon2-crow__detach"
            data-bead-id=${b.id}
            title="연결에서 빼고 앞뒤를 이어 붙입니다"
            aria-label="연결에서 빼기"
          >
            ✕
          </button>`:""}
      ${Br(Ge(b),{lane:ve.get(b.id)?.lane})}
    </div>`}function dt(v){return l`<div class="mon2-clane" data-lane-id=${v.lane_id}>
      <header class="mon2-clane__hd">
        <span class="mon2-clane__name">${v.label}</span>
        <span class="mon2-clane__count">${v.rows.length}</span>
      </header>
      <div
        class="mon2-clane__body"
        data-drop="chain"
        data-lane-id=${v.lane_id}
      >
        ${v.cycle?l`<div class="mon2-lane__cycle">
              ⛔ 의존 사이클 — 자동 교정 불가
            </div>`:""}
        ${v.rows.length===0?l`<div class="mon2-clane__hint">
              여기로 끌어다 놓으면 연결이 시작됩니다
            </div>`:v.rows.map((b,x)=>Be(v,b,x))}
      </div>
    </div>`}function ht(v,b,x){return l`<div
      class="mon2-item"
      data-bead-id=${b.id}
      data-drag-kind="repo-serial"
      data-root-dir=${b.root_dir}
      data-lane-id=${v.id}
      data-row-index=${x}
      data-queue-index=${String(b.queue_index??0)}
    >
      ${Kn(qe(b))}
    </div>`}function bt(v){if(v.length===0)return"";let b=v.length-1;return`${v[0].id} \uC810\uC720${b>0?` +${b}`:""}`}function ft(v){return l`<div
      class="mon2-item mon2-item--ghost"
      data-bead-id=${v.id}
    >
      ${Kn({id:v.id,title:v.title,lane:"running",draggable:!1,ghost:!0,badges:[v.badge]})}
    </div>`}function kt(v,b){return l`<div
      class="mon2-lane${b.empty?" mon2-lane--empty":""}"
      data-root-dir=${v.root_dir}
      data-lane-length=${String(b.raw_length)}
    >
      ${gn({id:"",lane:b.id,title:`${v.name} \xB7 \uC9C1\uB82C ${b.index+1}`,items:b.items,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uB4DC\uB798\uADF8\uB85C \uBC30\uCE58",body:l`<div
          class="mon2-lane__rows"
          data-drop="repo-serial"
          data-root-dir=${v.root_dir}
          data-lane-id=${b.id}
          data-lane-length=${String(b.raw_length)}
        >
          ${b.occupants.map(x=>ft(x))}
          ${b.items.length>0?b.items.map((x,D)=>ht(b,x,D)):b.occupants.length>0?"":l`<div class="worker-pane__empty">
                  비어 있음 — 드래그로 배치
                </div>`}
        </div>`,header_control:l`<span
            class="mon2-lane__badge${b.occupants.length>0?" mon2-lane__badge--held":""}"
            title=${b.occupants.length>0?b.occupants.map(x=>`${x.id} \u2014 ${x.badge}`).join(`
`):""}
            >${bt(b.occupants)}</span
          ><button
            type="button"
            class="mon2-sec__worker"
            data-root-dir=${v.root_dir}
            title="이 레포의 Worker 탭으로 이동"
          >
            Worker ↗
          </button>`})}
      ${b.empty?l`<div class="mon2-lane__hint">
            ${v.name} 직렬 ${b.index+1} 비어 있음
          </div>`:""}
      ${b.cycle?l`<div class="mon2-lane__cycle">
            ⛔ 의존 사이클 — 자동 교정 불가
          </div>`:""}
      ${(b.cross_wait_peers||[]).map(x=>l`<div class="mon2-lane__cross-wait">
            ⚠ 상호 정지 — ${x.workspace_name}·${x.lane}과 교차 대기
          </div>`)}
    </div>`}function Rt(){let v=we("serial"),b=B.chain_lanes.some(x=>x.pending&&x.rows.length===0);return l`<section
      class="mon2-area mon2-serial${v?" is-collapsed":""}"
      data-area="serial"
    >
      <header class="mon2-area__hd">
        <button
          type="button"
          class="mon2-area__toggle"
          data-area="serial"
          aria-expanded=${v?"false":"true"}
          aria-label=${`\uC9C1\uB82C \uC601\uC5ED ${v?"\uD3BC\uCE58\uAE30":"\uC811\uAE30"}`}
        >
          ${v?"\u25B8":"\u25BE"}
        </button>
        <span class="mon2-area__name">직렬 영역</span>
        <button
          type="button"
          class="mon2-newlane"
          ?disabled=${b}
          title=${b?"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC774 \uC774\uBBF8 \uC788\uC2B5\uB2C8\uB2E4":"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC744 \uD558\uB098 \uB9CC\uB4ED\uB2C8\uB2E4 \u2014 \uC0C8\uB85C\uACE0\uCE68\uD558\uBA74 \uC0AC\uB77C\uC9D1\uB2C8\uB2E4"}
        >
          + 연결 레인
        </button>
      </header>
      ${v?"":l`<div class="mon2-area__body">
            ${B.chain_lanes.map(x=>dt(x))}
            ${B.queue_groups.map(x=>x.sublanes.serial.map(D=>kt(x,D)))}
          </div>`}
    </section>`}function $t(){return l`<div class="mon2-wait">${Ne()}${Rt()}</div>`}function xt(v){return l`<div class="worker-rungrid">
      ${B.running.length===0?l`<div class="worker-rungrid__empty">실행 세션 없음</div>`:B.running.map(b=>Si({bead_id:b.id,attempt_id:b.attempt_id||"",title:b.title,runner:b.runner??null,model:b.model??null,effort:b.effort??null,speed:b.speed??null,started_at:b.started_at??null,kind:b.kind,...b.kind==="session"?{updated_at:b.updated_at}:{},workflow:b.workflow||null,resumed_from:b.resumed_from??null,continuation_mode:b.continuation_mode??null,paused:b.run_state==="paused",failed:b.run_state==="failed",status:b.status,status_label:b.run_state==="failed"?"\uC2E4\uD328":void 0,resume_eligible:b.can_resume!==!1,can_pause:b.can_pause!==!1,exec_chips:b.exec_chips||null,usage:b.usage||null,discard:b.discard},v,Q,{monitor:{repo:b.workspace_name,root_dir:b.root_dir,serial_lane_id:b.serial_lane_id,last_activity:b.last_activity||null,legs:b.legs||[],dependency_chips:Ge(b)}}))}
    </div>`}function Ye(v){let b={runnable:B.runnable,queue:B.queue,running:B.running,pr_wait:B.pr_wait,done:B.done};return l`<div class="mon2-deck"></div>
      <div class="worker-lanes mon2-lanes">
        ${zh.map(x=>{let D=b[x.lane],J=x.lane==="runnable"?B.runnable_flat?D.length>0?Ke():void 0:B.runnable_sections.length>0?Ke():void 0:x.lane==="queue"?B.queue_groups.length>0||B.chain_lanes.length>0||B.parallel_rows.length>0?$t():void 0:x.lane==="running"?xt(v):D.length>0?l`${D.map(he=>Kn(he))}`:void 0;return gn({id:`monitor-${x.lane}`,lane:x.pane,title:x.lane==="done"?`\uC644\uB8CC\xB7${G()}`:x.title,items:D,empty:x.empty,body:J,live:x.lane==="running"&&D.length>0,controls:x.lane==="runnable"?L():void 0,header_control:U(x.lane,D.length)})})}
      </div>`}function L(){return l`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시">
        <input
          type="checkbox"
          class="mon-filter__blocked"
          .checked=${$.show_blocked}
        />
        🔒
        blocked${B.runnable_hidden.blocked>0?` ${B.runnable_hidden.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${Ni.map(v=>l`<button
              type="button"
              class="mon-filter__spec worker-filter__chip${$.spec===v.value?" is-active":""}"
              data-spec=${v.value}
              aria-pressed=${$.spec===v.value?"true":"false"}
            >
              ${v.label}
            </button>`)}
        ${B.runnable_hidden.spec>0?l`<span class="worker-filter__hidden"
              >숨김 ${B.runnable_hidden.spec}</span
            >`:""}
      </div>
    </div>`}function U(v,b){return v==="runnable"?l`<select
        class="mon-candidate-sort worker-sort"
        aria-label="후보 정렬"
        title="후보 정렬"
        .value=${P}
      >
        ${Ls.map(x=>l`<option
              value=${x.value}
              ?selected=${P===x.value}
            >
              ${x.label}
            </option>`)}
      </select>`:v==="running"?l`<select
        class="mon-running-sort worker-sort"
        aria-label="실행중 정렬"
        title="실행중 정렬"
        .value=${w}
      >
        <option value="started" ?selected=${w==="started"}>
          시작순
        </option>
        <option value="repo" ?selected=${w==="repo"}>
          레포순
        </option>
      </select>`:v==="pr_wait"&&b>0?l`<button
        type="button"
        class="mon-lane-op mon-merge-all"
        title="자격이 생기는 PR을 각 레포의 머지 큐에 한 번에 넣습니다"
      >
        일괄 머지
      </button>`:v==="done"?l`<select
        class="mon-done-range worker-sort"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${h}
      >
        ${Wn.map(x=>l`<option value=${x.value} ?selected=${h===x.value}>
              ${x.label}
            </option>`)}
      </select>`:""}function Y(){let v=s&&s.get?s.get():null,b=s&&s.getWorkspacesState?s.getWorkspacesState():[],x=d(),D=()=>qi(v,b,{done_since:ir(h,x),running_sort:w,candidate_filter:$,candidate_sort:P,pending_lanes:M});B=D(),B.pending_lanes_kept.length!==M.length&&(M=B.pending_lanes_kept.map(J=>M[J]),B=D()),ve=new Map;for(let J of[...B.runnable,...B.queue,...B.running,...B.pr_wait,...B.done])!J.non_occupying&&!ve.has(J.id)&&ve.set(J.id,J);Qe(Ye(x),E),xe()?.render(),ne(),He()}function ne(){let v=new Map;for(let b of B.queue_groups)v.set(b.root_dir,b.auto_advance);for(let b of Array.from(E.querySelectorAll(".mon2-parallel .worker-mini__repo"))){let x=b.closest(".mon2-item")?.getAttribute("data-root-dir")||"",D=v.get(x);typeof D=="boolean"&&b.setAttribute("title",`${b.textContent||""} \xB7 ${D?"\uC790\uB3D9\uD654 \uCF1C\uC9D0":"\uC790\uB3D9\uD654 \uAEBC\uC9D0"}`)}}function xe(){if(Te)return Te;let v=E.querySelector(".mon2-deck");return v?(Te=hd(v,{workspacesState:()=>s&&s.getWorkspacesState?s.getWorkspacesState():[],doneItems:()=>B.done,rangeLabel:G,transport:o,implPresetStore:t.execPresetStore,gotoWorkerTab:ee,onFocusChange:b=>{q=b,He()}}),Te):null}function He(){E.classList.toggle("has-focus",q!==null);for(let v of Array.from(E.querySelectorAll(".mon2-sec[data-root-dir]")))v.classList.toggle("is-focus",q!==null&&v.getAttribute("data-root-dir")===q);for(let v of Array.from(E.querySelectorAll(".mon2-item[data-bead-id], .rtile[data-bead-id], .worker-mini[data-bead-id], .worker-card[data-bead-id]"))){let b=ve.get(v.getAttribute("data-bead-id")||"");v.classList.toggle("is-focus",q!==null&&!!b&&b.root_dir===q)}for(let v of Array.from(E.querySelectorAll(".mon2-crow[data-root-dir]")))v.classList.toggle("is-focus",q!==null&&v.getAttribute("data-root-dir")===q)}function Z(v,b){let x=a?a():void 0;if(!b||!x||b===x||!c){r(v);return}c(b).then(()=>{r(v)}).catch(D=>{n("workspace switch for %s failed: %o",b,D)})}function ee(v){if(!v)return;let b=a?a():void 0,x=()=>{try{u?.gotoView("worker")}catch(D){n("gotoView(worker) failed: %o",D)}};if(!c||b&&b===v){x();return}c(v).then(x).catch(D=>{n("workspace switch for %s failed: %o",v,D),ue("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error")})}function Oe(v){ln(v).then(b=>{ue(b?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",b?"success":"error",1400)})}function S(v){let b=ve.get(v)||null;return{item:b,root_dir:b?b.root_dir:"",revision:b?b.expected_revision:0}}function g(v){if(typeof v=="string"&&v.length>0)return v;if(v&&typeof v=="object"){let b=v;if(typeof b.message=="string"&&b.message.length>0)return b.message;if(typeof b.error=="string"&&b.error.length>0)return b.error;if(b.error&&typeof b.error=="object"&&typeof b.error.message=="string")return b.error.message}return"\uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4"}async function k(v,b,x){let{root_dir:D}=S(b);if(!(!b||!x||x===b))try{await ce(v,{a:b,b:x},D)}catch(J){ue(g(J),"error")}}function j(){let v=new Map,b=s&&s.get?s.get():null,x=D=>Array.isArray(D)?D.filter(J=>typeof J=="string"&&J.length>0):[];for(let D of Array.isArray(b)?b:[]){if(!D||typeof D!="object")continue;let J=D.bead_blocked_by&&typeof D.bead_blocked_by=="object"?D.bead_blocked_by:{};for(let[he,Ie]of Object.entries(J))Array.isArray(Ie)&&v.set(he,x(Ie));for(let he of[...Array.isArray(D.runnable)?D.runnable:[],...Array.isArray(D.session_active)?D.session_active:[]])he&&typeof he.bead_id=="string"&&Array.isArray(he.blocked_by)&&he.blocked_by.length>0&&v.set(he.bead_id,x(he.blocked_by))}return v}function se(){let v=new Map;for(let x of B.chain_lanes)v.set(x.lane_id,x.rows.map(D=>D.id));let b=new Map;for(let x of B.parallel_rows)typeof x.queue_index=="number"&&b.set(x.id,x.queue_index);for(let x of B.queue_groups)for(let D of x.sublanes.serial)for(let J of D.items)typeof J.queue_index=="number"&&b.set(J.id,J.queue_index);return{blocked_by_map:j(),owner_of:new Map(Object.entries(B.owner_of)),lane_order:v,parallel_rows:B.parallel_rows.map(x=>({bead_id:x.id,root_dir:x.root_dir,queue_index:x.queue_index??0})),parallel_raw_length:new Map(Object.entries(B.parallel_raw_length)),queue_index_of:b}}function re(v,b){let x=ve.get(b);if(x&&x.root_dir===v)return x.expected_revision;let D=B.queue_groups.find(J=>J.root_dir===v);return D?D.revision:0}async function ye(v,b){try{if(v.type==="worker-queue-place"||v.type==="worker-queue-reorder"||v.type==="worker-queue-remove"){let x=await ie(v.type,v.payload,v.root_dir,re(v.root_dir,b));return x&&x.conflict?(ue("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),!1):x&&x.applied===!1?(ue(x.admission_reason?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${x.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),!1):!0}return(v.type==="dep-add"||v.type==="dep-remove")&&await ce(v.type,{a:v.a,b:v.b},v.root_dir),!0}catch(x){return ue(g(x),"error"),!1}}async function _e(v,b){let x=bd(v,b,se());if("refused"in x){ue(x.refused,"error");return}if(b.kind==="chain"){let D=B.chain_lanes.find(he=>he.lane_id===b.lane_id),J=D&&D.pending&&D.rows.length===0?Number(D.lane_id.slice(8)):-1;J>=0&&M[J]&&(M=M.map((he,Ie)=>Ie===J?{seed:v.bead_id}:he))}for(let D of x.ops)if(!await ye(D,v.bead_id))break;Y()}async function nt(v,b){let x=ve.get(v);if(!x){Y();return}let D={kind:"candidate",bead_id:v,root_dir:x.root_dir};if(b==="new-lane"){M.some(he=>he.seed===null)||(M=[...M,{seed:null}]),Y();let J=B.chain_lanes.find(he=>he.pending&&he.rows.length===0);if(!J)return;await _e(D,{kind:"chain",lane_id:J.lane_id,marker_index:0});return}if(b.startsWith("lane:")){let J=B.chain_lanes[Number(b.slice(5))];if(!J){Y();return}await _e(D,{kind:"chain",lane_id:J.lane_id,marker_index:J.rows.length});return}if(b.startsWith("serial:")){let J=b.slice(7),he=(x.place_lanes||[]).find(Ie=>Ie.id===J);await _e(D,{kind:"repo-serial",root_dir:x.root_dir,lane_id:J,index:he?he.index:0});return}await _e(D,{kind:"parallel",marker_index:B.parallel_rows.length})}async function _t(v,b){let x=B.parallel_rows,D=x.findIndex(R=>R.id===v);if(D<0)return;let J=x[D].root_dir,he=[];x.forEach((R,Ce)=>{R.root_dir===J&&he.push(Ce)});let Ie=he.indexOf(D),rt=he[Ie+b];if(typeof rt!="number")return;let A=b===-1?rt:he[Ie+2]??Math.min(x.length,rt+1);await _e({kind:"parallel",bead_id:v,root_dir:J,queue_index:x[D].queue_index??0},{kind:"parallel",marker_index:A})}async function tt(v){for(let b of B.chain_lanes){let x=b.rows.find(D=>D.id===v);if(!(!x||!x.draggable)){await _e({kind:"chain",bead_id:v,root_dir:x.root_dir,lane_id:b.lane_id,...typeof x.queue_index=="number"?{queue_index:x.queue_index}:{}},{kind:"parallel",marker_index:B.parallel_rows.length});return}}}let ot=null,Ot=!1,gt=null;function dn(){gt!==null&&clearTimeout(gt),gt=setTimeout(()=>{gt=null,Ot=!1},0)}function Bt(v,b){let x=b&&typeof b.closest=="function"?b.closest("[data-row-index]"):null;if(x&&v.contains(x)){let D=Number(x.getAttribute("data-row-index"));return Number.isFinite(D)?D:0}return v.querySelectorAll("[data-row-index]").length}function Dt(v){let b=v.target,x=typeof b?.closest=="function"?b.closest("[data-drop]"):null;if(!x||!ot)return null;let D=x.getAttribute("data-drop");if(D==="candidate")return{zone:x,target:{kind:"candidate"}};if(D==="parallel")return{zone:x,target:{kind:"parallel",marker_index:Bt(x,b)}};if(D==="chain")return{zone:x,target:{kind:"chain",lane_id:x.getAttribute("data-lane-id")||"",marker_index:Bt(x,b)}};if(D==="repo-serial"){let J=x.getAttribute("data-root-dir")||"";if(J!==ot.root_dir)return null;let he=typeof b?.closest=="function"?b.closest("[data-queue-index]"):null,Ie=he&&x.contains(he)?he.getAttribute("data-queue-index"):x.getAttribute("data-lane-length"),rt=Number(Ie);return{zone:x,target:{kind:"repo-serial",root_dir:J,lane_id:x.getAttribute("data-lane-id")||"",index:Number.isFinite(rt)?rt:0}}}return null}function Gt(){for(let v of Array.from(E.querySelectorAll(".is-drop-over")))v.classList.remove("is-drop-over")}function qt(v){let b=v.target,x=typeof b?.closest=="function"?b.closest('[draggable="true"][data-bead-id]'):null,D=x?x.closest("[data-drag-kind]"):null;if(!D)return;let J=D.getAttribute("data-bead-id")||"",he=D.getAttribute("data-drag-kind")||"",Ie=D.getAttribute("data-root-dir")||"";if(!J||!he||!Ie)return;let rt=D.getAttribute("data-queue-index")||"",A=Number(rt),R=D.getAttribute("data-lane-id")||"";ot={kind:he,bead_id:J,root_dir:Ie,...rt!==""&&Number.isFinite(A)?{queue_index:A}:{},...R?{lane_id:R}:{}},Ot=!0,ae=null,E.classList.add("is-dragging");try{v.dataTransfer?.setData("text/plain",J),v.dataTransfer&&(v.dataTransfer.effectAllowed="move")}catch{}}function Pt(v){let b=Dt(v);b&&(v.preventDefault(),v.dataTransfer&&(v.dataTransfer.dropEffect="move"),b.zone.classList.add("is-drop-over"))}function We(v){let b=v.target;typeof b?.closest=="function"&&b.closest("[data-drop]")?.classList.remove("is-drop-over")}function Xt(){ot=null,Gt(),E.classList.remove("is-dragging"),dn()}function Vt(v){let b=Dt(v),x=ot;ot=null,Gt(),E.classList.remove("is-dragging"),!(!b||!x)&&(v.preventDefault(),_e(x,b.target))}function at(v){return{runner:v.runner||void 0,model:v.model||void 0,effort:v.effort||void 0,status:v.run_state==="running"?"running":v.run_state,worktree:v.root_dir}}function Pe(v,b){let{item:x,root_dir:D,revision:J}=S(b),he=x?.attempt_id||"",Ie=v.classList;if(Ie.contains("worker-dep__remove")){k("dep-remove",b,v.dataset.blockerId||"");return}if(Ie.contains("mon2-rowops__up")||Ie.contains("mon2-rowops__down")){_t(b,Ie.contains("mon2-rowops__up")?-1:1);return}if(Ie.contains("mon2-rowops__remove")){ie("worker-queue-remove",{bead_id:b},D,J);return}if(Ie.contains("mon2-crow__detach")){tt(b);return}if(Ie.contains("mon-overlap__chip")){let rt=v.getAttribute("data-overlap-all")==="true"?null:v.getAttribute("data-overlap-id")||"";N=!!N&&N.bead_id===b&&N.counterpart_id===rt?null:{bead_id:b,counterpart_id:rt},Y();return}if(Ie.contains("mon-overlap__place")){K(b,v.getAttribute("data-counterpart-id")||"");return}if(Ie.contains("worker-card__place")){ae=ae===b?null:b,Y();return}if(Ie.contains("worker-card__place-cancel")){ae=null,Y();return}if(Ie.contains("worker-card__place-lane")){let rt=v.getAttribute("data-lane")||"parallel";ae=null,nt(b,rt);return}if(Ie.contains("rtile__session")){Q=he,he&&x&&Re.open({attempt_id:he,root_dir:D,meta:at(x)}),Y();return}if(Ie.contains("rtile__pause")){ce("worker-attempt-pause",{attempt_id:he},D);return}if(Ie.contains("rtile__resume")){Lr().then(rt=>{if(rt!==null)return Ae("worker-attempt-resume",{attempt_id:he,...rt!==""?{instructions:rt}:{}},D,J)});return}if(Ie.contains("rtile__dismiss")){ie("worker-attempt-dismiss",{attempt_id:he},D,J);return}if(Ie.contains("rtile__discard")){if(!_(Ss(b,"unmerged")))return;te({bead_id:b,...he?{attempt_id:he}:{},...v.dataset.operationId?{operation_id:v.dataset.operationId}:{}},D,J);return}if(Ie.contains("worker-mini__merge")){let rt=de(D,b);rt?.mismatch&&rt.continuation===null?H(D,b,J,rt.mismatch):ie("worker-merge-queue-add",{bead_id:b},D,J);return}if(Ie.contains("worker-mini__merge-cancel")){ie("worker-merge-queue-remove",{bead_id:b},D,J);return}if(Ie.contains("worker-mini__discard")){let rt=v.dataset.discardMode==="merged"?"merged":"unmerged";if(!_(Ss(b,rt)))return;te({bead_id:b,...v.dataset.attemptId?{attempt_id:v.dataset.attemptId}:{},...v.dataset.operationId?{operation_id:v.dataset.operationId}:{}},D,J);return}if(Ie.contains("worker-mini__revise-fix")){Ae("worker-revise-fix",{bead_id:b},D,J);return}Ie.contains("worker-mini__revise-approve")&&ie("worker-revise-approve",{bead_id:b},D,J)}function O(v){let b=Ot;Ot=!1;let x=v.target;if(!x||typeof x.closest!="function"||x.closest("dialog")||x.closest(".mon2-drawer")||x.closest("a"))return;let D=x.closest(".worker-card__id, .worker-mini__id, .rtile__id");if(D){v.preventDefault();let y=x.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini")?.getAttribute("data-bead-id")||D.textContent?.trim()||"";y&&Oe(y);return}let J=x.closest(".worker-mini__repo, .worker-card__repo, .mon2-sec__worker");if(J){v.preventDefault();let p=J.getAttribute("data-root-dir")||ve.get(x.closest(".mon2-item, .rtile, .worker-mini")?.getAttribute("data-bead-id")||"")?.root_dir||J.getAttribute("title")||"";ee(p);return}let he=x.closest(".mon2-sec__toggle");if(he){v.preventDefault(),je(he.getAttribute("data-root-dir")||"");return}let Ie=x.closest(".mon2-area__toggle");if(Ie){v.preventDefault(),Je(Ie.getAttribute("data-area")||"parallel");return}if(x.closest(".mon2-newlane")){v.preventDefault(),M=[...M,{seed:null}],Y();return}if(x.closest(".mon-merge-all")){v.preventDefault(),ke();return}let rt=x.closest(".mon-filter__spec");if(rt){v.preventDefault(),$={...$,spec:rt.getAttribute("data-spec")||"all"},qd($),Y();return}let A=x.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini, .worker-card");if(!A)return;let R=A.getAttribute("data-bead-id")||"",Ce=x.closest("button");if(Ce){v.preventDefault(),Pe(Ce,R);return}R&&!b&&(v.preventDefault(),Z(R,A.getAttribute("data-root-dir")||S(R).root_dir))}function pe(v){let b=v.target;if(!b||typeof b.closest!="function")return;let x=b.closest(".mon-filter__blocked");if(x){$={...$,show_blocked:x.checked},qd($),Y();return}let D=b.closest(".mon-candidate-sort");if(D){P=Ls.some(Ie=>Ie.value===D.value)?D.value:"repo_spec",Nh(P),Y();return}let J=b.closest(".mon-running-sort");if(J){w=J.value==="repo"?"repo":"started",Uh(w),Y();return}let he=b.closest(".mon-done-range");he&&(h=fn(he.value)?he.value:on,jh(h),Y())}function Le(v){if(!N)return;let b=v.target;b&&typeof b.closest=="function"&&b.closest(".mon-overlap__popover, .mon-overlap__chip")||(N=null,Y())}function ct(v){v.key!=="Escape"||!N||(N=null,Y())}e.addEventListener("click",O),e.addEventListener("change",pe),document.addEventListener("click",Le),document.addEventListener("keydown",ct),e.addEventListener("dragstart",qt),e.addEventListener("dragover",Pt),e.addEventListener("dragleave",We),e.addEventListener("drop",Vt),e.addEventListener("dragend",Xt),s&&typeof s.subscribe=="function"&&(ge=s.subscribe(()=>{try{fe.clear(),Y()}catch{}}));function St(){V!==null&&(clearInterval(V),V=null)}function yt(){gt!==null&&(clearTimeout(gt),gt=null)}return{load(){n("load"),Y(),V===null&&(V=setInterval(()=>{try{Y()}catch{}},Wh))},pause(){St()},clear(){St(),yt(),ge&&(ge(),ge=null),Re.destroy(),Te?.destroy(),Te=null,e.removeEventListener("click",O),e.removeEventListener("change",pe),document.removeEventListener("click",Le),document.removeEventListener("keydown",ct),e.removeEventListener("dragstart",qt),e.removeEventListener("dragover",Pt),e.removeEventListener("dragleave",We),e.removeEventListener("drop",Vt),e.removeEventListener("dragend",Xt),e.replaceChildren()}}}function Kd(e,t,n){let r=Lt("views:nav"),{global_element:s,repo_element:o}=e,a=null;function i(h){return w=>{w.preventDefault(),r("click tab %s",h),n.gotoView(h)}}function c(){let h=t.getState();return h.view==="worker"||h.view==="monitor"?h.view:"board"}function u(){let h=c();return l`
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
    `}function d(){let h=c();return l`
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
    `}function _(){s&&Qe(u(),s),o&&Qe(d(),o)}return _(),a=t.subscribe(()=>_()),{destroy(){a&&(a(),a=null),s&&Qe(l``,s),o&&Qe(l``,o)}}}var Yd=["bug","feature","task","epic","chore"];function Zd(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var Qd=["Critical","High","Medium","Low","Backlog"];function Xd(e,t){let n=document.createElement("dialog");n.id="new-issue-dialog",n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true"),n.innerHTML=`
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
  `,e.appendChild(n);let r=n.querySelector("#new-issue-form"),s=n.querySelector("#new-title"),o=n.querySelector("#new-type"),a=n.querySelector("#new-priority"),i=n.querySelector("#new-labels"),c=n.querySelector("#new-description"),u=n.querySelector("#new-issue-error"),d=n.querySelector("#btn-cancel"),_=n.querySelector("#btn-create"),h=n.querySelector(".new-issue__close");function w(){o.replaceChildren();let q=document.createElement("option");q.value="",q.textContent="\u2014 Select \u2014",o.appendChild(q);for(let G of Yd){let E=document.createElement("option");E.value=G,E.textContent=Zd(G),o.appendChild(E)}a.replaceChildren();for(let G=0;G<=4;G+=1){let E=document.createElement("option");E.value=String(G);let W=Qd[G]||"Medium";E.textContent=`${G} \u2013 ${W}`,a.appendChild(E)}}w();function $(){try{typeof n.close=="function"?n.close():n.removeAttribute("open")}catch{n.removeAttribute("open")}}function P(q){s.disabled=q,o.disabled=q,a.disabled=q,i.disabled=q,c.disabled=q,d.disabled=q,_.disabled=q,_.textContent=q?"Creating\u2026":"Create"}function z(){u.textContent=""}function Q(q){u.textContent=q}function ae(){try{let q=window.localStorage.getItem("beads-ui.new.type");q?o.value=q:o.value="";let G=window.localStorage.getItem("beads-ui.new.priority");G&&/^\d$/.test(G)?a.value=G:a.value="2"}catch{o.value="",a.value="2"}}function N(){let q=o.value||"",G=a.value||"";q.length>0&&window.localStorage.setItem("beads-ui.new.type",q),G.length>0&&window.localStorage.setItem("beads-ui.new.priority",G)}async function M(){z();let q=String(s.value||"").trim();if(q.length===0){Q("Title is required"),s.focus();return}let G=Number(a.value||"2");if(!(G>=0&&G<=4)){Q("Priority must be 0..4"),a.focus();return}let E=String(o.value||""),W=String(c.value||""),B={title:q};E.length>0&&(B.type=E),String(G).length>0&&(B.priority=G),W.length>0&&(B.description=W),P(!0);try{await t("create-issue",B)}catch{P(!1),Q("Failed to create issue");return}N(),P(!1),$()}return n.addEventListener("cancel",q=>{q.preventDefault(),$()}),h.addEventListener("click",()=>$()),d.addEventListener("click",()=>$()),n.addEventListener("keydown",q=>{q.key==="Enter"&&(q.ctrlKey||q.metaKey)&&(q.preventDefault(),M())}),r.addEventListener("submit",q=>{q.preventDefault(),M()}),{open(){r.reset(),z(),ae();try{"showModal"in n&&typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")}catch{n.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){$()}}}var Gh=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function Vh(e,t){return Pa(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function Jd(e,t,n){return l`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">라벨 표시</div>
      <p class="settings-dialog__hint-block">
        라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을 누르면
        그 라벨만 예외로 다시 표시됩니다.
      </p>
      ${t.length===0?l`<div class="settings-dialog__empty">라벨 없음</div>`:l`<div class="settings-dialog__pills">
            ${t.map(r=>{let s=Vh(r,e);return l`<button
                type="button"
                class=${`settings-dialog__pill settings-dialog__pill--${s}`}
                data-label=${r}
                data-state=${s}
                @click=${()=>n(r)}
              >
                ${r}
              </button>`})}
          </div>`}
    </section>
  `}function ep(e,t,n){return l`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">숨김 prefix</div>
      <div class="settings-dialog__prefixes">
        ${e.hidden_prefixes.map(r=>l`<span class="settings-dialog__prefix">
              ${r}
              <button
                type="button"
                class="settings-dialog__prefix-remove"
                aria-label=${`${r} \uADDC\uCE59 \uC81C\uAC70`}
                @click=${()=>n.onRemove(r)}
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
          @input=${r=>n.onDraft(String(r.target.value||""))}
        />
        <button
          type="button"
          class="settings-dialog__btn"
          @click=${n.onAdd}
        >
          추가
        </button>
      </div>
    </section>
  `}function tp(e,t){return l`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">카드 표시 요소</div>
      <div class="settings-dialog__toggles">
        ${Gh.map(([n,r])=>l`<label class="settings-dialog__toggle">
              <input
                type="checkbox"
                data-chip=${n}
                .checked=${e.chips[n]!==!1}
                @change=${()=>t(n)}
              />
              <span>${r}</span>
            </label>`)}
      </div>
    </section>
  `}var Kh=[{id:"execution",label:"\uC2E4\uD589",glyph:"\u25C6"},{id:"display",label:"\uD45C\uC2DC",glyph:"\u25EB"}];function np(e,t){let{transport:n,policyStore:r,labelOptions:s}=t,o=t.notify||(V=>ue(V,"error",4e3)),a=document.createElement("dialog");a.id="settings-dialog",a.className="settings-dialog",a.setAttribute("role","dialog"),a.setAttribute("aria-modal","true"),a.setAttribute("aria-label","\uC124\uC815"),e.appendChild(a);let i="execution",c=!1,u="",d=null;function _(){if(d)return d;let V=a.querySelector('[data-pane="execution"]');return V?(d=Jo(V,{root_dir:null,queue:()=>t.queueStore?.get()??null,transport:n,implPresetStore:t.implPresetStore,notify:o,onQueueAdopt:Te=>t.queueStore?.set?.(Te)}),d):null}function h(){return l`
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
        <div class="settings-dialog__pane-body" data-pane="execution"></div>
      </section>
    `}function w(){let V=r.get();return l`
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
        ${V?l`
              ${Jd(V,s(),Q)}
              ${ep(V,u,{onDraft:Te=>{u=Te},onAdd:ae,onRemove:N})}
              ${tp(V,M)}
            `:l`<div class="settings-dialog__empty">
              표시 정책을 불러오는 중…
            </div>`}
      </section>
    `}async function $(V){let Te=r.get();if(Te)try{let Re=await n("display-policy-set",{expected_revision:Te.revision,policy:V(Te)});P(Re),Re&&Re.conflict&&Re.policy&&(Re=await n("display-policy-set",{expected_revision:Re.policy.revision,policy:V(Re.policy)}),P(Re)),Re&&Re.conflict&&o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC")}catch{o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328")}}function P(V){V&&V.policy&&typeof V.policy=="object"&&r.set(V.policy)}function z(V){$(V)}function Q(V){let Te=r.get();if(!Te)return;let Re=!Yh(V,Te);z(ie=>Zh(V,ie,Re))}function ae(){let V=u.trim();V.length!==0&&(u="",z(Te=>Te.hidden_prefixes.includes(V)?{hidden_prefixes:Te.hidden_prefixes}:{hidden_prefixes:[...Te.hidden_prefixes,V]}),q())}function N(V){z(Te=>({hidden_prefixes:Te.hidden_prefixes.filter(Re=>Re!==V)}))}function M(V){let Te=r.get();if(!Te)return;let Re=Te.chips[V]===!1;z(()=>({chips:{[V]:Re}}))}function q(){Qe(l`
        <div class="settings-dialog__container">
          <nav
            class="settings-dialog__rail"
            role="tablist"
            aria-orientation="vertical"
          >
            <div class="settings-dialog__rail-title">설정</div>
            ${Kh.map(V=>l`<button
                  type="button"
                  class="settings-dialog__tab"
                  role="tab"
                  data-tab=${V.id}
                  aria-selected=${String(i===V.id)}
                  aria-controls=${`settings-pane-${V.id}`}
                  @click=${()=>G(V.id)}
                >
                  <span class="settings-dialog__glyph">${V.glyph}</span>
                  ${V.label}
                </button>`)}
            <button
              type="button"
              class="settings-dialog__close"
              aria-label="닫기"
              @click=${ge}
            >
              닫기
            </button>
          </nav>
          <div class="settings-dialog__panes">
            ${h()} ${w()}
          </div>
        </div>
      `,a),_()}function G(V){i=V,q()}let E=()=>{c=!1,t.onOpenChange?.(!1)};a.addEventListener("close",E),a.addEventListener("cancel",E);let W=V=>{V.target===a&&ge()};a.addEventListener("click",W);let B=null;r.subscribe&&(B=r.subscribe(()=>{c&&q()}));let ve=null;t.implPresetStore?.subscribe&&(ve=t.implPresetStore.subscribe(()=>{c&&d?.render()}));function fe(V="execution"){c||(c=!0,t.onOpenChange?.(!0),i=V,u="",q(),typeof a.showModal=="function"?a.showModal():a.setAttribute("open",""),_()?.load())}function ge(){c&&(c=!1,t.onOpenChange?.(!1),typeof a.close=="function"?a.close():a.removeAttribute("open"))}return{open:fe,close:ge,sessionDraft:()=>d?.sessionDraft()??{},destroy(){c=!1,a.removeEventListener("close",E),a.removeEventListener("cancel",E),a.removeEventListener("click",W),B&&(B(),B=null),ve&&(ve(),ve=null),d?.destroy(),d=null,a.remove()}}}function Yh(e,t){return t.visible_labels.includes(e)?!0:t.hidden_labels.includes(e)?!1:!t.hidden_prefixes.some(n=>n.length>0&&e.startsWith(n))}function Zh(e,t,n){if(!n)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(o=>o!==e)};let r=t.hidden_labels.filter(o=>o!==e);return t.hidden_prefixes.some(o=>o.length>0&&e.startsWith(o))?{hidden_labels:r,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:r}}var Qh=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],rp="usage-meter-card",Xh="usage-meter-layer",sp=600,Jh=["token_expired","relogin_required"];function op(e){return String(e).padStart(2,"0")}function eb(e,t){let n=Math.max(0,Math.ceil((e-t)/6e4)),r=Math.floor(n/1440),s=Math.floor(n%1440/60),o=n%60;return r>0?`${r}d${s>0?` ${s}h`:""}`:s>0?`${s}h${o>0?` ${o}m`:""}`:`${o}m`}function ap(e,t=Date.now()){let n=Date.parse(e);if(!Number.isFinite(n))return"";let r=new Date(n),s=new Date(t),o=`${op(r.getHours())}:${op(r.getMinutes())}`,i=r.getFullYear()===s.getFullYear()&&r.getMonth()===s.getMonth()&&r.getDate()===s.getDate()?o:`${Qh[r.getMonth()]} ${r.getDate()} ${o}`;return`${eb(n,t)} \xB7 ${i}`}function tb(e){let t=Math.max(0,Math.floor(e));return t<60?`${t}\uCD08 \uC804`:t<3600?`${Math.floor(t/60)}\uBD84 \uC804`:`${Math.floor(t/3600)}\uC2DC\uAC04 \uC804`}function ip(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}function lp(e){let t=typeof e=="number"&&Number.isFinite(e)?e:0;return Math.min(100,Math.max(0,t))}var cp=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage",switch_endpoint:"/api/claude-account/switch",tool:"cswap"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage",switch_endpoint:"/api/codex-account/switch",tool:"codex-auth"}];function dp(e){let t=[];for(let n of e){if(!n||typeof n!="object")continue;let r=n;typeof r.key!="string"||r.key.length===0||typeof r.pct!="number"||!Number.isFinite(r.pct)||t.push({key:r.key,pct:r.pct,resetsAt:typeof r.resetsAt=="string"?r.resetsAt:""})}return t}function nb(e){if(!e||typeof e!="object")return null;let t=e;return!Number.isInteger(t.number)||t.number<=0||typeof t.email!="string"||t.email.length===0||typeof t.status!="string"||t.status.length===0||typeof t.active!="boolean"||!Array.isArray(t.windows)?null:{number:t.number,email:t.email,alias:typeof t.alias=="string"&&t.alias.length>0?t.alias:null,plan:typeof t.plan=="string"&&t.plan.length>0?t.plan:null,active:t.active,status:t.status,windows:dp(t.windows),fetchedAt:typeof t.fetchedAt=="string"?t.fetchedAt:null,ageSeconds:typeof t.ageSeconds=="number"&&Number.isFinite(t.ageSeconds)?t.ageSeconds:null}}function rb(e){if(!e||typeof e!="object")return null;let t=e,n=[];if(Array.isArray(t.accounts))for(let s of t.accounts){let o=nb(s);o&&n.push(o)}let r=t.available===!0&&Array.isArray(t.windows);return!r&&n.length===0?null:{available:r,windows:r?dp(t.windows):[],ageSeconds:typeof t.ageSeconds=="number"&&Number.isFinite(t.ageSeconds)?t.ageSeconds:null,accounts:n}}function up(e,t){return`${e}:${t}`}function pp(e){let t=!1,n=null,r=new Map,s=null,o=new Map,a=new Map,i=0,c=null;function u(){Qe(l``,e),e.hidden=!0,_()}function d(){if(c===null){let ie=e.ownerDocument;c=ie.createElement("div"),c.id=Xh,c.className="usage-meter__layer",ie.body.appendChild(c)}return c}function _(){c!==null&&(Qe(l``,c),c.remove(),c=null)}function h(ie){n!==ie&&(n===null&&(document.addEventListener("mousedown",$),document.addEventListener("keydown",z),window.addEventListener("resize",P)),n=ie)}function w(){n!==null&&(n=null,document.removeEventListener("mousedown",$),document.removeEventListener("keydown",z),window.removeEventListener("resize",P))}function $(ie){let de=ie.target;de&&(e.contains(de)||c!==null&&c.contains(de))||(w(),ge())}function P(){ge()}function z(ie){ie.key==="Escape"&&(w(),ge())}function Q(ie){n===ie?w():h(ie),ge()}function ae(){w(),ge()}async function N(ie,de){if(r.has(ie.key))return;let Ae=up(ie.key,de);r.set(ie.key,de),a.delete(Ae),ge();let H=null;try{H=await(await fetch(ie.switch_endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({number:de})})).json()}catch{H=null}if(t)return;if(r.delete(ie.key),!H||H.ok!==!0){let ce=H&&typeof H.error=="string"&&H.error.length>0?H.error:"network_error";a.set(Ae,{kind:"error",text:`\uC804\uD658 \uC2E4\uD328 \u2014 ${ce}`}),ge();return}let te=Array.isArray(H.warnings)?H.warnings.filter(ce=>typeof ce=="string"&&ce.length>0):[];te.length>0&&a.set(Ae,{kind:"warn",text:te.join(" \xB7 ")}),ge(),await Re()}function M(ie,de,Ae,H){let te=lp(ie.pct),ke=`resets ${ap(ie.resetsAt,H)}${de?` \xB7 ${Ae}`:""}`;return l`<span
      class="usage-meter__window ${ip(te)}"
      style=${`--progress: ${te}%`}
      title=${ke}
    >
      <span class="usage-meter__label">${ie.key}</span>
      <span class="usage-meter__track" aria-hidden="true">
        <span class="usage-meter__fill"></span>
      </span>
      <span class="usage-meter__pct">${te}%</span>
    </span>`}function q(ie,de,Ae){let H=de.available&&typeof de.ageSeconds=="number"&&de.ageSeconds>sp,te=H&&typeof de.ageSeconds=="number"?`${Math.floor(de.ageSeconds/60)}\uBD84 \uC804 \uCE21\uC815`:"",ce=de.accounts.filter(we=>!we.active).length,ke=`usage-meter__group${H?" usage-meter__group--stale":""}`,be=l`<span class="usage-meter__provider"
        >${ie.label}</span
      >
      ${de.available?de.windows.map(we=>M(we,H,te,Ae)):l`<span class="usage-meter__empty">사용량 없음</span>`}
      ${ce>0?l`<span class="usage-meter__badge">+${ce}</span>`:""}`;if(de.accounts.length===0)return l`<span
        class=${ke}
        aria-label=${`${ie.label} usage`}
        >${be}</span
      >`;let je=n===ie.key;return l`<button
      type="button"
      class=${`usage-meter__toggle ${ke}`}
      aria-label=${`${ie.label} usage`}
      aria-expanded=${je?"true":"false"}
      aria-controls=${rp}
      @click=${()=>Q(ie.key)}
    >
      ${be}
    </button>`}function G(ie,de){return l`<span class="usage-meter" aria-label="Usage">
      ${ie.map(Ae=>q(Ae.provider,Ae.snapshot,de))}
    </span>`}function E(ie,de){let Ae=lp(ie.pct),H=ap(ie.resetsAt,de);return l`<span
      class="usage-meter__account-window ${ip(Ae)}"
      style=${`--progress: ${Ae}%`}
    >
      <span class="usage-meter__account-key">${ie.key}</span>
      <span class="usage-meter__account-track" aria-hidden="true">
        <span class="usage-meter__account-fill"></span>
      </span>
      <span class="usage-meter__account-pct">${Ae}%</span>
      <span class="usage-meter__account-reset"
        >${H.length>0?`\u21BB ${H}`:""}</span
      >
    </span>`}function W(ie,de){return Jh.includes(de)?`\uD1A0\uD070 \uB9CC\uB8CC \u2014 ${ie.tool} \uC7AC\uB85C\uADF8\uC778 \uD544\uC694`:"\uC0AC\uC6A9\uB7C9 \uC5C6\uC74C"}function B(ie,de,Ae){let H=de.status==="ok",te=typeof de.ageSeconds=="number"&&de.ageSeconds>sp,ce=a.get(up(ie.key,de.number)),ke=r.get(ie.key),be=ke!==void 0,je=ke===de.number,we=["usage-meter__account"];return de.active&&we.push("usage-meter__account--active"),H||we.push("usage-meter__account--unavailable"),te&&we.push("usage-meter__account--stale"),l`<div class=${we.join(" ")}>
      <div class="usage-meter__account-head">
        <span class="usage-meter__account-label" title=${de.email}
          >${de.alias===null?de.email:de.alias}</span
        >
        ${de.plan===null?"":l`<span class="usage-meter__account-tag">${de.plan}</span>`}
        ${de.active?l`<span
              class="usage-meter__account-tag usage-meter__account-tag--active"
              >active</span
            >`:""}
        ${de.ageSeconds===null?"":l`<span class="usage-meter__account-age"
              >${tb(de.ageSeconds)}</span
            >`}
        ${de.active?"":l`<button
              type="button"
              class="usage-meter__switch"
              ?disabled=${be}
              @click=${()=>{N(ie,de.number)}}
            >
              ${je?"\uC804\uD658 \uC911\u2026":"\uC804\uD658"}
            </button>`}
      </div>
      ${H?l`<div class="usage-meter__account-windows">
            ${de.windows.map(Je=>E(Je,Ae))}
          </div>`:l`<div class="usage-meter__account-status">
            ${W(ie,de.status)}
          </div>`}
      ${ce===void 0?"":l`<div
            class="usage-meter__account-message usage-meter__account-message--${ce.kind}"
          >
            ${ce.text}
          </div>`}
    </div>`}function ve(ie,de,Ae){let H=de.accounts.filter(te=>te.active).length;return l`<section class="usage-meter__section">
      <h2 class="usage-meter__section-title">
        ${ie.label} · 활성 ${H} / 전체
        ${de.accounts.length}
      </h2>
      ${de.accounts.map(te=>B(ie,te,Ae))}
    </section>`}function fe(ie,de){return l`<div
      class="usage-meter__card"
      id=${rp}
      role="dialog"
      aria-label=${`${ie.provider.label} \uACC4\uC815 \uC0AC\uC6A9\uB7C9`}
    >
      ${ve(ie.provider,ie.snapshot,de)}
      <p class="usage-meter__note">전환은 새로 시작하는 세션부터 적용됩니다.</p>
    </div>`}function ge(){let ie=[];for(let H of cp){let te=o.get(H.key);te&&ie.push({provider:H,snapshot:te})}if(ie.length===0){w(),u();return}let de=ie.find(H=>H.provider.key===n&&H.snapshot.accounts.length>0);de||w();let Ae=Date.now();Qe(G(ie,Ae),e),e.hidden=!1,de?V(de,Ae):_()}function V(ie,de){let Ae=d(),H=e.getBoundingClientRect(),te=e.ownerDocument.documentElement.clientWidth;Ae.style.setProperty("--usage-meter-anchor-top",`${H.bottom}px`),Ae.style.setProperty("--usage-meter-anchor-right",`${Math.max(0,te-H.right)}px`),Qe(l`<div
          class="usage-meter__scrim"
          aria-hidden="true"
          @mousedown=${ae}
        ></div>
        ${fe(ie,de)}`,Ae)}async function Te(ie){try{let de=await fetch(ie.endpoint);return de.ok?rb(await de.json()):null}catch{return null}}async function Re(){i+=1;let ie=i,de=await Promise.all(cp.map(async Ae=>({provider:Ae,snapshot:await Te(Ae)})));if(!(t||ie!==i)){for(let Ae of de)Ae.snapshot?o.set(Ae.provider.key,Ae.snapshot):o.delete(Ae.provider.key);ge()}}return u(),Re(),s=setInterval(()=>{Re()},6e4),{destroy(){t=!0,s!==null&&(clearInterval(s),s=null),w(),u()}}}function fp(e){let t=e.attempts?Object.values(e.attempts):[],n=new Map;for(let s of t)s&&(s.kind??"implementation")==="implementation"&&n.set(s.bead_id,s.attempt_id);let r=new Map;for(let s of e.done||[])s&&typeof s.bead_id=="string"&&typeof s.added_at=="number"&&r.set(s.bead_id,s.added_at);return s=>{let o=n.get(s.bead_id)!==s.attempt_id,a=r.get(s.bead_id),i=typeof a=="number"&&a>0&&typeof s.finished_at=="number"&&a>=s.finished_at;return!o&&!i&&typeof s.dismissed_at!="number"}}var sb="worker-ineligible";function Fi(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function _p(e){return Fi(e).includes(sb)}var ob="worker-serial";function ji(e){return Fi(e).includes(ob)}function Bi(e,t,n){if(typeof t!="string"||typeof n!="string")return[];let r=e?.runners;if(!r||!Object.hasOwn(r,t))return[];let s=r[t],o=s?.models;if(!o||!Object.hasOwn(o,n))return[];let a=o[n]?.efforts;return Array.isArray(a)?a.slice():Array.isArray(s.efforts)?s.efforts.slice():[]}var ab=new Set(["done","failed","orphaned","stopped","discarded"]),ib={spec_missing:"\uC2A4\uD399 \uC5C6\uC74C",route:"route \uBBF8\uB2EC",spec_review:"\uC2A4\uD399 \uB9AC\uBDF0 \uC5C6\uC74C",spec_conflict:"\uC2A4\uD399 \uCDA9\uB3CC",phase_child:"phase child",worker_ineligible:"worker \uC81C\uC678"},lb={running:"\uC2E4\uD589 \uC911",success:"\uC131\uACF5",failure:"\uC2E4\uD328",cancelled:"\uCDE8\uC18C",interrupted:"\uC911\uB2E8"},cb={running:"running",success:"done",failure:"failed",cancelled:"stopped",interrupted:"orphaned"};function Ui(e){return{runner:e.runner||void 0,model:e.model||void 0,effort:e.effort||void 0,status:cb[e.outcome]||(typeof e.job_id=="string"?"running":void 0),session_id:e.session_id||void 0}}function mp(e,t){let{queueStore:n,analysisStore:r,transport:s,getWorkspacePath:o,onOpenTranscript:a}=t,i=document.createElement("dialog");i.id="worker-parallel-analysis-dialog",i.className="pa",i.setAttribute("role","dialog"),i.setAttribute("aria-modal","true"),e.appendChild(i);let c=new Map,u=new Map,d=!1,_=null,h=null,w=null,$=new Set,P=!1,z=0,Q=null,ae=new Set;function N(){return n&&n.get()||{revision:0,queue:[],serial_lanes:[],serial_lane_count:0,attempts:{},pr_wait:[]}}function M(){return r&&r.get()||{settings:{revision:0,runner:null,model:null,effort:null},job:null,runs:[],last_good:null}}function q(){return o&&o()||""}async function G(){if(!s)return;let S=++z;P=!0,w=null,$.clear(),U();try{let g=await s("worker-parallel-analysis-targets",{root_dir:q()});if(S!==z||!Y)return;let k=Array.isArray(g?.qualified)?g.qualified:[],j=Array.isArray(g?.excluded)?g.excluded:[];w={qualified:k,excluded:j};for(let se of k)se&&typeof se.id=="string"&&$.add(se.id)}catch{S===z&&Y&&(w={qualified:[],excluded:[]},ue("\uBD84\uC11D \uB300\uC0C1\uC744 \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4","error",2800))}finally{S===z&&(P=!1,Y&&U())}}function E(S){return Array.isArray(S.runs)?S.runs:[]}function W(){let S=N(),g=new Set;for(let k of Object.values(S.attempts||{})){let j=k;j&&typeof j.bead_id=="string"&&!ab.has(j.status)&&g.add(j.bead_id)}for(let k of Array.isArray(S.pr_wait)?S.pr_wait:[])k&&typeof k.bead_id=="string"&&g.add(k.bead_id);for(let k of Object.values(S.discard_operations||{})){let j=k;j&&j.phase!=="done"&&typeof j.bead_id=="string"&&g.add(j.bead_id)}return g}function B(S){return S.filter(g=>ve(g)===null)}function ve(S){let g=N();for(let k of Array.isArray(g.serial_lanes)?g.serial_lanes:[])if(Array.isArray(k?.entries)&&k.entries.some(j=>j.bead_id===S))return k.id;return(Array.isArray(g.queue)?g.queue:[]).some(k=>k.bead_id===S)?"parallel":null}function fe(S,g){let k=c.get(S);return k||[...g.order]}function ge(S){if(S.length<2)return!1;let g=ve(S[0]);if(!g||g==="parallel")return!1;let k=N(),j=(Array.isArray(k.serial_lanes)?k.serial_lanes:[]).find(re=>re.id===g)?.entries.map(re=>re.bead_id);if(!Array.isArray(j))return!1;let se=S.map(re=>j.indexOf(re));return se.every(re=>re>=0)&&se.every((re,ye)=>ye===0||re>se[ye-1])}function V(){let S=N(),g=Array.isArray(S.serial_lanes)?S.serial_lanes:[],k=g.find(j=>Array.isArray(j.entries)&&j.entries.length===0);return k?k.id:g[0]?.id||"s1"}function Te(S){let g=N().bead_titles||{};return typeof g[S]=="string"?g[S]:S}async function Re(S,g){if(!s||d)return null;d=!0,U();try{return await s(S,g)}finally{d=!1,U()}}async function ie(S){r?.setPending?.(!0);try{let g=await Re("worker-parallel-analysis-start",{force:S,target_ids:Array.from($)});g&&g.applied===!1&&g.reason&&(g.reason==="target_not_qualified"&&Array.isArray(g.detail)?ue(`\uBD84\uC11D \uB300\uC0C1 \uC790\uACA9 \uBCC0\uACBD: ${g.detail.join(", ")}`,"error",3200):ue(`\uBD84\uC11D \uC2E4\uD328: ${g.reason}`,"error",2800))}finally{r?.setPending?.(!1)}}async function de(){let S=M().job;!s||!S||await s("worker-parallel-analysis-cancel",{job_id:S.job_id})}async function Ae(S){if(!(!s||ae.has(S))){ae.add(S),U();try{let g=await s("worker-parallel-analysis-prompt",{root_dir:q(),run_id:S});if(!Y)return;if(g?.ok===!0&&typeof g.prompt=="string"){Q={run_id:S,prompt:g.prompt};return}ue(g?.reason==="not_found"?"\uC800\uC7A5\uB41C \uBD84\uC11D \uD504\uB86C\uD504\uD2B8\uB97C \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBD84\uC11D \uD504\uB86C\uD504\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4","error",2800)}finally{ae.delete(S),U()}}}function H(){Q=null,U()}async function te(){if(!Q)return;let S=await ln(Q.prompt);ue(S?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",S?"success":"error",1400)}function ce(S,g){a&&a(S,Ui(g))}function ke(){return N().runner_catalog}function be(S){return Object.keys(ke()?.runners?.[S]?.models||{})}function je(S){let g=be(S),k=ke()?.runners?.[S]?.default_model;return typeof k=="string"&&g.includes(k)?k:g[0]||""}function we(){let S=M().settings,g=_||S.runner||"claude",k=be(g),j=_?je(g):S.model||k[0]||"",se=Bi(ke(),g,j),re=S.effort||"",ye=se.includes(re)?re:se[0]||"";return{runner:g,model:j,effort:ye,models:k,efforts:se}}async function Je(S){let g=M().settings,k=await Re("worker-parallel-analysis-settings-update",{expected_revision:g.revision,runner:S.runner,model:S.model,effort:S.effort});(!k||k.applied!==!0)&&(_=null,U(),k&&k.reason&&ue(`\uBD84\uC11D \uC124\uC815 \uAC70\uBD80: ${k.reason}`,"error",2800))}function it(S){_=S,U();let g=we();Je({runner:S,model:g.model,effort:g.effort})}function I(S){let g=we(),k=Bi(ke(),g.runner,S);Je({runner:g.runner,model:S,effort:k.includes(g.effort)?g.effort:k[0]||""})}function me(S){let g=we();Je({runner:g.runner,model:g.model,effort:S})}async function $e(S,g){if(!s||d)return;let k=fe(S,g),j=M();if(k.length<2||!j.last_good){ue("\uC81C\uCD9C\uD558\uB824\uBA74 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4","warning");return}let se=u.get(S)||V(),re=()=>({snapshot_digest:j.last_good.identity_digest,group_index:S,lane:se,ordered_bead_ids:k,expected_revision:N().revision});d=!0,U();try{let ye=await s("worker-parallel-analysis-submit",re());ye&&ye.queue&&n&&n.set(ye.queue),ye&&ye.applied!==!0&&ye.conflict===!0&&(ye=await s("worker-parallel-analysis-submit",re()),ye&&ye.queue&&n&&n.set(ye.queue)),ye&&ye.applied===!0?(c.delete(S),ue(`\uC9C1\uB82C \uB808\uC778 ${se}\uC5D0 ${k.length}\uAC1C \uBC30\uCE58`,"success")):ue(`\uC81C\uCD9C \uAC70\uBD80: ${ye?.reason||"conflict"} (\uD050 \uBB34\uBCC0\uACBD)`,"error",2800)}finally{d=!1,U()}}function Se(S,g,k){c.set(S,fe(S,g).filter(j=>j!==k)),U()}function Ge(S){c.delete(S),U()}function qe(S,g,k,j){let se=[...fe(S,g)],re=se.indexOf(k),ye=re+j;re<0||ye<0||ye>=se.length||(se.splice(ye,0,...se.splice(re,1)),c.set(S,se),U())}function K(){let S=M().settings,g=Object.keys(ke()?.runners||{}),k=we();return l`<div class="pa-settings">
      <label class="pa-settings__field"
        >러너
        <select
          class="pa-settings__runner"
          aria-label="분석 러너"
          @change=${j=>it(j.target.value)}
        >
          ${g.map(j=>l`<option
                value=${j}
                ?selected=${k.runner===j}
              >
                ${j}
              </option>`)}
        </select>
      </label>
      <label class="pa-settings__field"
        >분석 모델
        <select
          class="pa-settings__model"
          aria-label="분석 모델"
          @change=${j=>I(j.target.value)}
        >
          ${k.models.map(j=>l`<option
                value=${j}
                ?selected=${k.model===j}
              >
                ${j}
              </option>`)}
        </select>
      </label>
      <label class="pa-settings__field"
        >effort
        <select
          class="pa-settings__effort-select"
          aria-label="분석 effort"
          @change=${j=>me(j.target.value)}
        >
          ${k.efforts.map(j=>l`<option
                value=${j}
                ?selected=${k.effort===j}
              >
                ${j}
              </option>`)}
        </select>
      </label>
      ${X(S)}
    </div>`}function X(S){return!et(S)||Me(S)?l`<span class="pa-settings__unset">분석 모델 설정 필요</span>`:S.compatible===!1?l`<span class="pa-settings__incompatible"
        >설정 비호환 — 저장된 ${S.runner}/${S.model} · effort
        ${S.effort} 을(를) 카탈로그가 더는 제공하지 않습니다</span
      >`:S.is_default===!0?l`<span class="pa-settings__default">기본값</span>`:""}function Me(S){return S.is_default===!0&&S.compatible===!1}function et(S){return!!(S.runner&&S.model&&S.effort)}function Ve(S){return et(S)&&S.compatible!==!1}function De(S){let g=Math.max(0,Math.floor(S/1e3)),k=Math.floor(g/60),j=g%60;return`${k}:${String(j).padStart(2,"0")}`}function Ke(S){let g=S.job;if(g){let k=typeof g.started_at=="number"?g.started_at:0,j=`${g.runner||"?"}/${g.model||"?"}`,se=k?` \xB7 \uACBD\uACFC ${De(Date.now()-k)}`:"",re=typeof g.session_id=="string"?g.session_id:"",ye=E(S).find(_e=>_e.run_id===g.job_id);return l`<span class="pa-meta__progress">
        <span
          >분석 중 — ${j} · effort ${g.effort||"?"}${se}</span
        >
        ${re?l`<code class="pa-session-id" title=${re}
              >${re.slice(0,8)}</code
            >`:""}
        <button
          type="button"
          class="pa-monitor"
          @click=${()=>ce(g.job_id,ye||g)}
        >
          모니터링
        </button>
        <button
          type="button"
          class="pa-prompt-open"
          ?disabled=${ye?.prompt_saved!==!0||ae.has(g.job_id)}
          @click=${()=>{Ae(g.job_id)}}
        >
          프롬프트
        </button>
      </span>`}return Ne()?l`<span class="pa-meta__progress"
          >준비 중 — 대상과 아티팩트 수집 중</span
        >`:""}function st(S){let g=Ke(S);return g===""?"":l`<div class="pa__strip">${g}</div>`}function Ne(){return r?.isPending?.()===!0}function Be(S){let g=!!S.job,k=Ve(S.settings),j=w!==null&&$.size===0,se=g||d||Ne()||P;return l`<div class="pa-meta">
      ${S.last_good?l`<span class="pa-meta__at"
            >분석 ${new Date(S.last_good.at||0).toLocaleString()}</span
          >`:l`<span class="pa-meta__at">분석 결과 없음</span>`}
      <button
        type="button"
        class="pa-run"
        ?disabled=${!k||se||j}
        @click=${()=>{ie(!1)}}
      >
        ✳ 분석
      </button>
      <button
        type="button"
        class="pa-rerun"
        ?disabled=${!k||se||j}
        @click=${()=>{ie(!0)}}
      >
        재분석
      </button>
      <button
        type="button"
        class="pa-cancel"
        ?disabled=${!g}
        @click=${()=>{de()}}
      >
        취소
      </button>
    </div>`}function dt(S){return typeof S=="string"&&S.length>0?S:"\uBBF8\uBC30\uCE58"}function ht(S,g){g?$.add(S):$.delete(S),U()}function bt(S){let g=Array.isArray(S.scope)?S.scope:[],k=Array.isArray(S.overlaps)?S.overlaps:[];return g.length===0&&k.length===0?l``:l`<span class="pa-target__signals">
      ${g.length>0?l`<details class="pa-target__scope" title=${g.join(`
`)}>
            <summary>scope ${g.length}</summary>
            <ul>
              ${g.map(j=>l`<li><code>${j}</code></li>`)}
            </ul>
          </details>`:""}
      ${k.length>0?l`<span
            class="pa-target__overlaps"
            title=${`\uACB9\uCE68: ${k.join(", ")}`}
            >겹침 ${k.join(", ")}</span
          >`:""}
    </span>`}function ft(){let S=w?.qualified||[],g=w?.excluded||[];return l`<section class="pa-targets">
      <header class="pa-targets__header">
        <strong>분석 대상</strong>
        <span class="pa-targets__summary"
          >${P?"\uC870\uD68C \uC911\u2026":`\uC790\uACA9 ${S.length} \xB7 \uC81C\uC678 ${g.length}`}</span
        >
      </header>
      ${w&&S.length>0?l`<ul class="pa-targets__list">
            ${S.map(k=>l`<li class="pa-target">
                  <label class="pa-target__label">
                    <input
                      type="checkbox"
                      class="pa-target__check"
                      data-target-id=${k.id}
                      .checked=${$.has(k.id)}
                      @change=${j=>ht(k.id,j.target.checked)}
                    />
                    <span class="pa-target__title">${k.title}</span>
                  </label>
                  <span class="pa-target__meta">
                    ${bt(k)}
                    <span class="pa-target__route">${k.route}</span>
                    <span class="pa-target__lane"
                      >${dt(k.lane)}</span
                    >
                  </span>
                </li>`)}
          </ul>`:w&&S.length===0?l`<p class="pa-empty">자격 있는 분석 대상이 없습니다</p>`:""}
      ${w&&g.length>0?l`<details class="pa-targets__excluded">
            <summary>제외 대상 ${g.length}</summary>
            <ul class="pa-targets__list">
              ${g.map(k=>l`<li class="pa-target pa-target--excluded">
                    <label class="pa-target__label">
                      <input type="checkbox" disabled />
                      <span class="pa-target__title">${k.title}</span>
                    </label>
                    <span class="pa-target__meta">
                      <span class="pa-target__reason"
                        >${ib[k.reason]||k.reason}</span
                      >
                      <span class="pa-target__lane"
                        >${dt(k.lane)}</span
                      >
                    </span>
                  </li>`)}
            </ul>
          </details>`:""}
    </section>`}function kt(S){let g=typeof S.session_id=="string"&&S.session_id.length>0,k=g?S.session_id:"";return l`<li class="pa-run-row">
      <span class="pa-run-row__status pa-run-row__status--${S.outcome}"
        >${lb[S.outcome]||S.outcome}</span
      >
      <time class="pa-run-row__time"
        >${new Date(S.started_at||0).toLocaleString()}</time
      >
      <span class="pa-run-row__identity"
        >${S.runner||"?"} / ${S.model||"?"} / ${S.effort||"?"}</span
      >
      ${g?l`<code class="pa-session-id" title=${k}
            >${k.slice(0,8)}</code
          >`:l`<span class="pa-run-row__no-session">세션 없음</span>`}
      ${S.outcome==="failure"&&S.reason?l`<span class="pa-run-row__reason">${S.reason}</span>`:""}
      <span class="pa-run-row__actions">
        <button
          type="button"
          class="pa-run-row__monitor"
          @click=${()=>ce(S.run_id,S)}
        >
          모니터링
        </button>
        <button
          type="button"
          class="pa-run-row__prompt"
          ?disabled=${S.prompt_saved!==!0||ae.has(S.run_id)}
          @click=${()=>{Ae(S.run_id)}}
        >
          프롬프트
        </button>
      </span>
    </li>`}function Rt(S){return l`<section class="pa-runs">
      <header class="pa-runs__header"><strong>최근 실행</strong></header>
      ${S.length>0?l`<ul class="pa-runs__list">
            ${S.map(g=>kt(g))}
          </ul>`:l`<p class="pa-empty">실행 이력 없음</p>`}
    </section>`}function $t(){return Q?l`<div
      class="pa-prompt-popup"
      role="dialog"
      aria-modal="true"
      aria-label="분석 프롬프트"
    >
      <div class="pa-prompt-popup__backdrop" @click=${H}></div>
      <section class="pa-prompt-popup__panel">
        <header class="pa-prompt-popup__header">
          <div class="pa-prompt-popup__identity">
            <strong>분석 프롬프트</strong>
            <code>${Q.run_id}</code>
          </div>
          <div class="pa-prompt-popup__actions">
            <button type="button" @click=${()=>{te()}}>
              복사
            </button>
            <button
              type="button"
              class="pa-prompt-popup__close"
              aria-label="분석 프롬프트 팝업 닫기"
              @click=${H}
            >
              ✕
            </button>
          </div>
        </header>
        <pre class="pa-prompt-popup__content" tabindex="0">
${Q.prompt}</pre
        >
      </section>
    </div>`:""}function xt(S,g){let k=fe(S,g),j=W(),se=k.filter(tt=>j.has(tt)),re=B(k),ye=ge(k),_e=Array.isArray(N().serial_lanes)?N().serial_lanes:[],nt=u.get(S)||V(),_t=g.eligible!==!0||k.length<2||se.length>0||re.length>0||ye||d;return l`<section class="pa-group" data-group-index=${String(S)}>
      <header class="pa-group__head">
        <span class="pa-group__confidence">${g.confidence}</span>
        ${g.categories.map(tt=>l`<span class="pa-group__category">${tt}</span>`)}
        ${ye?l`<span class="pa-group__applied">✓ 이미 반영됨</span>`:""}
        ${g.eligible===!0?"":l`<span class="pa-group__weak">근거 부족 — 제출 불가</span>`}
        ${re.length>0?l`<span class="pa-group__stale"
              >stale — ${re.join(", ")} 대기 영역 이탈</span
            >`:""}
      </header>
      <p class="pa-group__reason">${g.reason}</p>
      <ol class="pa-group__members">
        ${k.map((tt,ot)=>l`<li class="pa-member" data-bead-id=${tt}>
              <span class="pa-member__seq">${ot+1}</span>
              <span class="pa-member__title">${Te(tt)}</span>
              ${j.has(tt)?l`<span class="pa-member__active">실행 중</span>`:""}
              <button
                type="button"
                class="pa-member__up"
                data-bead-id=${tt}
                ?disabled=${ot===0}
                aria-label=${`${tt} \uC704\uB85C`}
                @click=${()=>qe(S,g,tt,-1)}
              >
                ↑
              </button>
              <button
                type="button"
                class="pa-member__down"
                data-bead-id=${tt}
                ?disabled=${ot===k.length-1}
                aria-label=${`${tt} \uC544\uB798\uB85C`}
                @click=${()=>qe(S,g,tt,1)}
              >
                ↓
              </button>
              <button
                type="button"
                class="pa-member__exclude"
                data-bead-id=${tt}
                aria-label=${`${tt} \uC81C\uC678`}
                @click=${()=>Se(S,g,tt)}
              >
                ✕
              </button>
            </li>`)}
      </ol>
      <ul class="pa-group__evidence">
        ${g.evidence.map(tt=>l`<li class="pa-evidence">
              <code>${tt.path}</code>
              <span class="pa-evidence__locator">${tt.locator}</span>
            </li>`)}
      </ul>
      <footer class="pa-group__foot">
        <button
          type="button"
          class="pa-group__restore"
          @click=${()=>Ge(S)}
        >
          제안으로 되돌리기
        </button>
        <label class="pa-group__lane-field"
          >제출
          <select
            class="pa-group__lane"
            aria-label="제출 대상 레인"
            @change=${tt=>{u.set(S,tt.target.value),U()}}
          >
            ${_e.map((tt,ot)=>l`<option
                  value=${tt.id}
                  ?selected=${nt===tt.id}
                >
                  직렬 ${ot+1}
                </option>`)}
          </select>
        </label>
        <button
          type="button"
          class="pa-group__submit"
          ?disabled=${_t}
          @click=${()=>{$e(S,g)}}
        >
          제출
        </button>
      </footer>
    </section>`}function Ye(S){let g=Array.isArray(S.issues)?S.issues:[],k=g.filter(se=>se.verdict==="parallel_ok").length,j=g.filter(se=>se.verdict==="uncertain").length;return l`<div class="pa-summary">
      <span>parallel_ok ${k}</span>
      <span>uncertain ${j}</span>
    </div>`}function L(){let S=Y&&!!M().job;if(S&&h===null){h=setInterval(()=>U(),1e3);return}!S&&h!==null&&(clearInterval(h),h=null)}function U(){let S=M();_&&S.settings.runner===_&&(_=null);let g=S.last_good?.result;L(),Qe(l`
        <div class="pa__container">
          <header class="pa__header">
            <div class="pa__title">병렬성 분석</div>
            <button
              type="button"
              class="pa__close"
              aria-label="닫기"
              @click=${Oe}
            >
              ×
            </button>
          </header>
          ${st(S)}
          <div class="pa__body">
            ${K()} ${Be(S)} ${ft()}
            ${g?l`${g.groups.map((k,j)=>xt(j,k))}
                ${g.groups.length===0?l`<p class="pa-empty">직렬 권장 그룹 없음</p>`:""}
                ${Ye(g)}`:l`<p class="pa-empty">
                  아직 분석 결과가 없습니다 — [✳ 분석]을 눌러 시작하세요
                </p>`}
            ${Rt(E(S))}
          </div>
        </div>
        ${$t()}
      `,i)}let Y=!1,ne=()=>{Y=!1,Q=null,z+=1,L()},xe=S=>{S.target===S.currentTarget&&Oe()};i.addEventListener("close",ne),i.addEventListener("cancel",ne),i.addEventListener("click",xe);let He=null;n&&n.subscribe&&(He=n.subscribe(()=>{Y&&U()}));let Z=null;r&&r.subscribe&&(Z=r.subscribe(()=>{Y&&U()}));function ee(){Y||(Y=!0,U(),G(),typeof i.showModal=="function"?i.showModal():i.setAttribute("open",""))}function Oe(){Y&&(Y=!1,Q=null,z+=1,L(),typeof i.close=="function"?i.close():i.removeAttribute("open"))}return{open:ee,close:Oe,destroy(){Y=!1,h!==null&&(clearInterval(h),h=null),i.removeEventListener("close",ne),i.removeEventListener("cancel",ne),i.removeEventListener("click",xe),He&&(He(),He=null),Z&&(Z(),Z=null),i.remove()}}}function gp(e,t){let n=new Map;if(!e||typeof e!="object")return n;let r=e,s=[],o=new Set;for(let a of t){if(o.has(a.id))continue;o.add(a.id);let i=r[a.id];if(!i||!Array.isArray(i.scope))continue;let c=i.scope.filter(u=>typeof u=="string"&&u.length>0);if(c.length===0){n.set(a.id,{overlaps:[],scope_missing:!0});continue}n.set(a.id,{overlaps:[],scope_missing:!1}),s.push({member:a,scope:c})}for(let a=0;a<s.length;a+=1)for(let i=a+1;i<s.length;i+=1){let c=ta(s[a].scope,s[i].scope);if(c.length===0)continue;let u=s[a].member,d=s[i].member;n.get(u.id)?.overlaps.push({id:d.id,title:d.title,location_label:d.location_label,prefixes:c}),n.get(d.id)?.overlaps.push({id:u.id,title:u.title,location_label:u.location_label,prefixes:c})}return n}function Wi(e,t,n){let r=n.members_by_id.get(e),s=n.members_by_id.get(t);if(!r||!s)return{kind:"note",text:"\uC0C1\uB300\uC758 \uD604\uC7AC \uC704\uCE58\uB97C \uC54C \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"};let o=r.lane_id,a=s.lane_id;if(o!==null&&o===a)return{kind:"note",text:"\uC774\uBBF8 \uAC19\uC740 \uC9C1\uB82C \uB808\uC778 \u2014 \uC21C\uC11C\uAC00 \uC788\uC2B5\uB2C8\uB2E4"};let i=r.kind!=="running",c=s.kind!=="running";if(i&&a!==null)return{kind:"ops",title:`${a} \uB05D\uC5D0 ${e}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,ops:[{bead_id:e,lane:a,index:n.serial_raw_lengths[a]||0}]};if(o!==null&&c&&a===null)return{kind:"ops",title:`${o} \uB05D\uC5D0 ${t}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,ops:[{bead_id:t,lane:o,index:n.serial_raw_lengths[o]||0}]};if(i&&o===null&&c&&a===null){let u=ub(n);return u===null?{kind:"disabled",title:"\uBE48 \uC9C1\uB82C \uB808\uC778 \uC5C6\uC74C \u2014 \uC9C1\uB82C \uB808\uC778 \uC218\uB97C \uC870\uC808\uD558\uC138\uC694"}:{kind:"ops",title:`${u} \uB808\uC778\uC5D0 ${t} \u2192 ${e} \uC21C\uC11C\uB85C \uB123\uC2B5\uB2C8\uB2E4`,ops:[{bead_id:t,lane:u,index:0},{bead_id:e,lane:u,index:1}]}}return!i&&!c?{kind:"note",text:"\uB458 \uB2E4 \uC2E4\uD589 \uC911 \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}:i?{kind:"note",text:"\uC2E4\uD589 \uC911 \u2014 \uC885\uB8CC \uD6C4 \uCD9C\uBC1C\uD558\uB824\uBA74 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694"}:{kind:"note",text:"\uC2E4\uD589 \uC911 \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4\uB824\uBA74 \uC0C1\uB300\uB97C \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694"}}function ub(e){for(let t=0;t<e.serial_lane_count;t+=1){let n=`s${t+1}`;if((e.serial_raw_lengths[n]||0)===0&&!e.occupied_lanes.has(n))return n}return null}var hp=new Set(["sh","bash","zsh","dash","ksh"]),bp=/('(?:[^']*)'|"(?:\\.|[^"\\])*"|#.*|\$(?:\{[^}\n]*\}|[A-Za-z_][A-Za-z0-9_]*|[?#@*!$0-9-])|\b(?:if|then|else|elif|fi|for|while|until|do|done|case|esac|in|function|select|time)\b)/g;function yp(e){let t=e.split("/");return t[t.length-1]||""}function db(e){let t=e.split(`
`,1)[0];if(!t.startsWith("#!"))return!1;let n=t.slice(2).trim().split(/\s+/).filter(Boolean);if(n.length===0)return!1;let r=yp(n[0]);if(r!=="env")return hp.has(r);let s=n.slice(1).find(o=>!o.startsWith("-")&&!o.includes("="));return s!==void 0&&hp.has(yp(s))}function pb(e){return e.startsWith("#")?"comment":e.startsWith("'")||e.startsWith('"')?"string":e.startsWith("$")?"variable":"keyword"}function fb(e){let t=[],n=0;bp.lastIndex=0;for(let r of e.matchAll(bp)){let s=r.index;s>n&&t.push({text:e.slice(n,s),kind:"plain"}),t.push({text:r[0],kind:pb(r[0])}),n=s+r[0].length}return n<e.length&&t.push({text:e.slice(n),kind:"plain"}),t.length===0&&t.push({text:e,kind:"plain"}),t}function _b(e){return{bad_request:"\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",forbidden:"\uB4F1\uB85D\uB418\uC9C0 \uC54A\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB294 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",lane_not_declared:"\uD604\uC7AC \uACE0\uC815 \uC120\uC5B8\uC5D0 \uD574\uB2F9 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",stale_declaration:"\uC800\uC7A5\uC18C \uC791\uC5C5 \uC120\uC5B8\uC774 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uD654\uBA74\uC5D0\uC11C \uB2E4\uC2DC \uC5F4\uC5B4 \uC8FC\uC138\uC694.",too_large:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uB108\uBB34 \uCEE4\uC11C \uD654\uBA74\uC5D0 \uD45C\uC2DC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",unsupported_content:"\uD14D\uC2A4\uD2B8 \uD615\uC2DD\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB9CC \uD45C\uC2DC\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",unreadable:"\uACE0\uC815\uB41C \uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."}[e]||"\uC2A4\uD06C\uB9BD\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."}function vp(e){let t=e.getWorkspacePath,n=e.fetchImpl||globalThis.fetch?.bind(globalThis),r=document.createElement("div");r.className="repo-ops-script-viewer-root",document.body.appendChild(r);let s=null,o="loading",a="",i="",c=0,u=null,d=!1;function _(q,G){return G?fb(q).map(E=>E.kind==="plain"?E.text:l`<span
            class="repo-ops-script-viewer__token repo-ops-script-viewer__token--${E.kind}"
            >${E.text}</span
          >`):q}function h(){if(!s)return l``;let q=o==="ready"&&db(a),G=o==="ready"?a.split(`
`):[];return l`<div
      class="repo-ops-script-viewer"
      role="dialog"
      aria-modal="true"
      aria-label=${`\uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9: ${s.path}`}
    >
      <div
        class="repo-ops-script-viewer__backdrop"
        @click=${()=>N()}
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
              @click=${()=>{$()}}
            >
              복사
            </button>
            <button
              type="button"
              class="repo-ops-script-viewer__close"
              aria-label="스크립트 팝업 닫기"
              @click=${()=>N()}
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
                  ${G.map((E,W)=>l`<div class="repo-ops-script-viewer__row">
                        <span
                          class="repo-ops-script-viewer__line-number"
                          aria-hidden="true"
                          >${W+1}</span
                        ><code class="repo-ops-script-viewer__code-line"
                          >${_(E,q)}</code
                        >
                      </div>`)}
                </div>`}
        </div>
      </section>
    </div>`}function w(){Qe(h(),r)}async function $(){if(o!=="ready")return;let q=await ln(a);ue(q?"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC\uB428":"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC \uC2E4\uD328",q?"success":"error")}function P(q){q.key==="Escape"&&s&&(q.preventDefault(),N())}function z(){d||(document.addEventListener("keydown",P),d=!0)}function Q(){d&&(document.removeEventListener("keydown",P),d=!1)}async function ae(q,G=null){let E=++c;z(),s={...q},u=G||(document.activeElement instanceof HTMLElement?document.activeElement:null),o="loading",a="",i="",w(),r.querySelector(".repo-ops-script-viewer__close")?.focus();let B=t?t():"";if(!B){o="error",i="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",w();return}if(!n){o="error",i="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD \uAE30\uB2A5\uC744 \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",w();return}let ve="/api/repo-ops-script?workspace="+encodeURIComponent(B)+"&lane="+encodeURIComponent(q.lane)+"&base_sha="+encodeURIComponent(q.base_sha);try{let fe=await n(ve),ge=await fe.json().catch(()=>({}));if(E!==c)return;if((t?t():"")!==B){N();return}if(!fe.ok||!ge||ge.ok!==!0){o="error",i=_b(ge&&typeof ge.error=="string"?ge.error:""),w();return}s={lane:ge.lane,base_sha:ge.base_sha,path:ge.path,base_ref:ge.base_ref},a=String(ge.content),o="ready",w()}catch{if(E!==c)return;o="error",i="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",w()}}function N(){c+=1,Q(),s=null,a="",w();let q=u;u=null,q?.isConnected&&q.focus()}function M(){N(),r.remove()}return{open:ae,close:N,destroy:M}}function wp(e){let t=e.queueStore,n=e.transport,r=e.onChanged||(()=>{}),s=e.onOpenScript;function o(){return t&&t.get()||{}}function a(){let E=o();return typeof E.revision=="number"?E.revision:0}function i(E){t&&E&&E.queue&&typeof E.queue=="object"&&t.set(E.queue)}function c(){let E=o().workspace_info;return E&&typeof E=="object"?E:{}}function u(E,W){return l`<span
      class="worker-repo-ops__vd-badge worker-repo-ops__vd-badge--${E}"
      >${W}</span
    >`}function d(E){if(typeof E!="number"||!Number.isFinite(E))return"";let W=E/6e4;return Number.isInteger(W)?`timeout ${W}\uBD84`:`timeout ${Math.round(E/1e3)}\uCD08`}function _(E){let W=d(E);return W?u("config",W):""}function h(E,W,B){return l`<button
      type="button"
      class="worker-repo-ops__vd-cmd worker-repo-ops__vd-cmd--link"
      .textContent=${B.script}
      @click=${ve=>{s&&s({lane:E,base_sha:W.base_sha,path:B.script,base_ref:W.base_ref},ve.currentTarget)}}
    ></button>`}function w(){let E=o().repo_ops_opt_out;return{verify:E?.verify===!0,deploy:E?.deploy===!0}}function $(E,W){return l`<label class="worker-repo-ops__lane-run">
      <input
        type="checkbox"
        .checked=${!W}
        @change=${B=>{ae(E,!B.target.checked)}}
      />
      이 workspace에서 실행
    </label>`}function P(E){let W=typeof E.base_sha=="string"?E.base_sha:"",B=`${E.source_path||"repo-ops/config.toml"} @ ${E.base_ref||"?"}${W?`@${W.slice(0,7)}`:""}`,ve=w(),fe=!!E.verify&&ve.verify,ge=!!E.deploy&&ve.deploy;return l`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">
        저장소 작업 선언
        <span class="worker-repo-ops__vd-src">${B}</span>
      </p>
      <div
        class="worker-repo-ops__lane${fe?" worker-repo-ops__lane--skipped":""}"
        data-lane="verify"
      >
        <span class="worker-repo-ops__lane-k">머지 전 검증</span>
        <span class="worker-repo-ops__lane-v"
          >${E.verify?l`${h("verify",E,E.verify)}
              ${_(E.verify.timeout_ms)}
              ${fe?u("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):""}`:l`선언 없음${u("absent","verify \uC5C6\uC774 \uD310\uC815")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${fe?"\uC774 workspace\uC5D0\uC11C\uB294 \uAC80\uC99D \uC5C6\uC774 \uD310\uC815\uD569\uB2C8\uB2E4.":E.verify?"\uBA38\uC9C0 \uC804\uC5D0 \uC774 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uD1B5\uACFC\uD574\uC57C \uC790\uACA9\uC744 \uC5BB\uC2B5\uB2C8\uB2E4.":"\uBA38\uC9C0 \uC790\uACA9\uC740 PR/base/head \uC2E0\uC120\uB3C4\xB7mergeability\xB7\uB9AC\uBDF0 \uC601\uC218\uC99D\uC73C\uB85C\uB9CC \uD310\uC815\uD569\uB2C8\uB2E4."}</span
        >
        ${E.verify?$("verify",ve.verify):""}
      </div>
      <div
        class="worker-repo-ops__lane${ge?" worker-repo-ops__lane--skipped":""}"
        data-lane="deploy"
      >
        <span class="worker-repo-ops__lane-k">머지 후 배포</span>
        <span class="worker-repo-ops__lane-v"
          >${E.deploy?l`${h("deploy",E,E.deploy)}
              ${_(E.deploy.timeout_ms)}
              ${ge?u("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):""}`:l`선언 없음${u("absent","\uBC30\uD3EC \uC5C6\uC74C")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${ge?"\uC774 workspace\uC5D0\uC11C\uB294 \uBC30\uD3EC \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4.":E.deploy?l`Worker가 <code>.worktrees/.repo-ops-deploy</code>에서 대상
                  SHA로 정렬한 뒤 1회 실행합니다.`:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC \uB2E8\uACC4 \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4."}</span
        >
        ${E.deploy?$("deploy",ve.deploy):""}
      </div>
    </section>`}function z(E){let W=E.repo_ops&&typeof E.repo_ops=="object"?E.repo_ops:null;return W&&(W.status==="resolved"||W.status==="absent")?P(W):W&&(W.status==="pending"||W.status==="error")?l`<section class="worker-repo-ops__vd" data-seam="repo-ops">
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
          ${W.status==="pending"?"\uC120\uC5B8 \uD655\uC778 \uC911":l`선언 읽기
              실패${W.error_code?l` — <code>${W.error_code}</code>`:""}`}
        </div>
      </section>`:l`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">저장소 작업 선언</p>
      <div class="worker-repo-ops__vd-line worker-repo-ops__vd-absent">
        선언 확인 중
      </div>
    </section>`}async function Q(E){if(!n)return;let W=await n("worker-auto-repair-toggle",{on:E,expected_revision:a()});if(i(W),W&&W.conflict){let B=await n("worker-auto-repair-toggle",{on:E,expected_revision:a()});i(B)}r()}async function ae(E,W){if(!n)return;let B=await n("worker-repo-ops-opt-out-toggle",{kind:E,opted_out:W,expected_revision:a()});if(i(B),B&&B.conflict){let ve=await n("worker-repo-ops-opt-out-toggle",{kind:E,opted_out:W,expected_revision:a()});i(ve)}r()}let N={owned_deploy_worktree_fetch_detached_alignment_recreate:"\uC804\uC6A9 \uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC \uC815\uB82C\xB7\uBCF5\uAD6C",recovered_pre_execution_fetch_timeout_retry_once:"fetch \uD0C0\uC784\uC544\uC6C3 1\uD68C \uBCF5\uAD6C",repo_serial_lock_wait:"\uC800\uC7A5\uC18C \uC21C\uCC28 \uC2E4\uD589 \uB300\uAE30",restart_operation_adoption:"\uC7AC\uC2DC\uC791 \uD6C4 \uC791\uC5C5 \uC778\uACC4",exact_input_exit_zero_evidence_adoption:"\uB3D9\uC77C \uC785\uB825 \uC131\uACF5 \uC99D\uAC70 \uC778\uACC4",descendant_success_covers_ancestor_rows:"\uCD5C\uC2E0 SHA \uC131\uACF5\uC774 \uC774\uC804 \uD589 \uCEE4\uBC84",owned_verify_candidate_cleanup:"\uAC80\uC99D \uC784\uC2DC \uCCB4\uD06C\uC544\uC6C3 \uC815\uB9AC",script_retry:"\uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4",auto_repair_session:"\uC790\uB3D9 \uD574\uACB0 \uC138\uC158",user_triggered_session:"\uC0AC\uC6A9\uC790 \uD574\uACB0 \uC138\uC158",automatic:"\uC790\uB3D9",user_action_only:"\uC0AC\uC6A9\uC790 \uD074\uB9AD",script_identity_present:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC788\uC744 \uB54C\uB9CC",per_completion_chain:"\uC644\uB8CC \uCCB4\uC778\uB2F9",unbounded:"\uD69F\uC218 \uC81C\uD55C \uC5C6\uC74C",bounded_single_script_retry_exceeded:"\uB2E8\uC77C \uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4 \uD55C\uB3C4 \uCD08\uACFC",baseline_failure_ignore:"\uAE30\uC874 \uC2E4\uD328 \uBB34\uC2DC",config_or_script_deletion_to_bypass_gate:"\uC124\uC815\xB7\uC2A4\uD06C\uB9BD\uD2B8 \uC0AD\uC81C\uB85C \uAC8C\uC774\uD2B8 \uC6B0\uD68C",credential_entry:"\uC790\uACA9\uC99D\uBA85 \uC785\uB825\xB7\uCD9C\uB825",destructive_action:"\uD30C\uAD34\uC801 \uC791\uC5C5",history_rewrite:"\uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131",agent_self_report_as_success:"\uC138\uC158 \uC790\uAE30\uBCF4\uACE0\uB97C \uC131\uACF5 \uCC98\uB9AC",unbounded_repair_session_retry:"\uBB34\uD55C \uD574\uACB0 \uC138\uC158 \uBC18\uBCF5"};function M(E,W,B){return l`<div class="worker-repo-ops__policy-group" data-policy=${B}>
      <div class="worker-repo-ops__policy-label">${E}</div>
      <ul class="worker-repo-ops__policy-list">
        ${W.map(ve=>l`<li data-token=${ve}>
              ${N[ve]||ve}
            </li>`)}
      </ul>
    </div>`}function q(E){return l`<div
      class="worker-repo-ops__policy-group"
      data-policy="resolution-ladder"
    >
      <div class="worker-repo-ops__policy-label">해결 사다리</div>
      <ol class="worker-repo-ops__policy-list">
        ${E.map(W=>{let B=[N[W.trigger]||W.trigger];return Number.isInteger(W.attempts_per_operation_attempt)?B.push(`operation\uB2F9 ${W.attempts_per_operation_attempt}\uD68C`):Number.isInteger(W.attempts)?B.push(`${N[W.budget]||W.budget} ${W.attempts}\uD68C`):Number.isInteger(W.sessions_per_user_action)&&B.push(`${W.sessions_per_user_action}\uD68C`,N[W.user_actions]||W.user_actions),W.applies_when&&B.push(N[W.applies_when]||W.applies_when),l`<li data-token=${W.id}>
            <strong>${N[W.id]||W.id}</strong>
            <span>${B.filter(Boolean).join(" \xB7 ")}</span>
          </li>`})}
      </ol>
    </div>`}function G(){let E=o(),W=E.auto_repair!==!1,B=E.repo_operation_policy&&typeof E.repo_operation_policy=="object"?E.repo_operation_policy:null,ve=Array.isArray(E.repo_operations)?E.repo_operations:[],fe=ve.find(Re=>Re.state==="repairing"),ge=ve.filter(Re=>Re.state==="failed"||Re.state==="repairing"),V=ge.length?Math.min(...ge.map(Re=>typeof Re.repair?.remaining=="number"?Re.repair.remaining:0)):B?.auto_repair?.resolution_ladder?.find(Re=>Re.id==="auto_repair_session")?.attempts??1,Te=Array.isArray(B?.auto_repair?.resolution_ladder)?B.auto_repair.resolution_ladder:[];return l`<section
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
          .checked=${W}
          @change=${Re=>{Q(Re.target.checked)}}
        />
        검증·배포 실패를 자동으로 해결 시도
      </label>
      <div class="worker-repo-ops__repair-state">
        <span
          class="worker-repo-ops__repair-value"
          data-seam="auto-repair-value"
          >${W?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}</span
        >
        <span
          class="worker-repo-ops__repair-budget"
          data-seam="auto-repair-budget"
          >남은 자동 해결 ${V}회</span
        >
        <span
          class="worker-repo-ops__repair-session"
          data-seam="auto-repair-session"
          >${fe?`\uD574\uACB0 \uC138\uC158 \uC2E4\uD589 \uC911 \xB7 ${fe.repair?.owner_bead||fe.operation_id}`:"\uC2E4\uD589 \uC911\uC778 \uD574\uACB0 \uC138\uC158 \uC5C6\uC74C"}</span
        >
      </div>
      ${B?l`<details
            class="worker-repo-ops__policy"
            data-seam="policy-lists"
          >
            <summary>
              Worker 자동 처리 기준
              <span class="worker-repo-ops__policy-count"
                >자동 ${(B.worker_automatic||[]).length} · 해결 사다리
                ${Te.length} · 금지
                ${(B.never_automatic||[]).length}</span
              >
            </summary>
            ${M("Worker\uAC00 \uC790\uB3D9 \uCC98\uB9AC",B.worker_automatic||[],"worker-automatic")}
            ${B.supported===!1||B.schema_version!==2?l`<div
                  class="worker-repo-ops__policy-group"
                  data-policy="resolution-ladder"
                >
                  ${`\uACC4\uC57D \uC2A4\uD0A4\uB9C8 \uBD88\uC77C\uCE58 \u2014 \uC790\uB3D9 \uD574\uACB0\uC774 \uC815\uC9C0\uB418\uC5C8\uC2B5\uB2C8\uB2E4 (v${B.schema_version})`}
                </div>`:q(Te)}
            ${M("\uC790\uB3D9\uC73C\uB85C \uD558\uC9C0 \uC54A\uC74C",B.never_automatic||[],"never-automatic")}
          </details>`:""}
    </section>`}return{template(){return l`<details class="worker-repo-ops-settings">
        <summary class="worker-repo-ops-settings__summary">
          저장소 작업 · 검증/배포 선언 · 자동 해결
        </summary>
        ${z(c())} ${G()}
      </details>`}}}var Ap=20,mb=5,gb=new Set(["failed","repairing","running","queued","retry_pending"]),kp={verify:"\uBA38\uC9C0 \uC804 \uAC80\uC99D",deploy:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC"},$p={verify_script_failure:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0",verify_script_failure_pre_merge:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0 \uD6C4 \uBA38\uC9C0",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328 \uD574\uACB0",interrupted_without_terminal_exit:"\uC911\uB2E8\uB41C \uC791\uC5C5 \uC9C4\uB2E8"};function hb(e,t,n=Ap){let r=[];for(let s of Array.isArray(e)?e:[])!s||typeof s!="object"||r.push({type:"operation",id:s.operation_id,at:typeof s.finished_at=="number"?s.finished_at:typeof s.requested_at=="number"?s.requested_at:null,operation:s});for(let s of Array.isArray(t)?t:[])!s||typeof s!="object"||r.push({type:"cleanup",id:s.bead_id,at:typeof s.at=="number"?s.at:null,cleanup:s});return r.sort((s,o)=>s.at===null&&o.at===null?String(s.id||"").localeCompare(String(o.id||"")):s.at===null?1:o.at===null?-1:o.at-s.at),r.slice(0,Math.max(0,n))}function bb(e){if(e.type==="cleanup")return!0;let t=e.operation;return gb.has(t.state)&&!t.dismissed&&!t.superseded_by}function yb(e,t,n={}){let r=hb(e,t,1/0),s=n.expanded===!0?Ap:mb,o=new Set(r.slice(0,s)),a=r.filter(i=>o.has(i)||bb(i));return{visible:a,hidden:r.length-a.length}}function xp(e){if(e.type==="cleanup")return"warn";let t=e.operation.state;return t==="succeeded"?"ok":t==="failed"?"fail":"live"}function vb(e){if(e.type==="cleanup")return"\uBA48\uCDA4";switch(e.operation.state){case"succeeded":return"\uC131\uACF5";case"failed":return"\uC2E4\uD328";case"repairing":return"\uC790\uB3D9 \uD574\uACB0 \uC911";case"retry_pending":return"\uC7AC\uC2DC\uB3C4 \uC911";case"running":return"\uC2E4\uD589 \uC911";default:return"\uB300\uAE30"}}function Sp(e){let t=e.filter(n=>n.value);return t.length===0?"":l`<details class="worker-ev__details">
    <summary>세부</summary>
    <dl class="worker-ev__kv">
      ${t.map(n=>l`<div>
            <dt>${n.term}</dt>
            <dd>${n.value}</dd>
          </div>`)}
    </dl>
  </details>`}function Ep(e,t="",n=!1){return!e&&!t?"":l`<p
    class="worker-ev__explain${n?" worker-ev__explain--warn":""}"
  >
    <span class="worker-ev__cause">${e}</span>${t?l`<br />${t}`:""}
  </p>`}function wb(e){if(e.state!=="failed"||e.superseded_by)return"";let t=e.repair||{},n=typeof t.remaining=="number"?t.remaining:0,r=e.failure_kind==="verify_script_failure"&&e.verify_stage==="pre_merge"?"verify_script_failure_pre_merge":e.failure_kind||"",s=n<=0;return l`<div class="worker-ev__acts">
    <button
      type="button"
      class="worker-ev__btn worker-ev__btn--primary worker-repo-op__resolve"
      data-operation-id=${e.operation_id}
      data-failure-kind=${e.failure_kind||""}
      title="해결 세션을 엽니다"
    >
      ${Object.hasOwn($p,r)?$p[r]:"\uC2E4\uD328 \uD574\uACB0 \uC138\uC158 \uC2DC\uC791"}
    </button>
    <span class="worker-ev__btn-sub"
      >${s?"\uC790\uB3D9 \uD574\uACB0\uC744 \uB2E4 \uC37C\uC2B5\uB2C8\uB2E4 \xB7 \uB20C\uB7EC\uC11C \uD574\uACB0 \uC138\uC158\uC744 \uC5FD\uB2C8\uB2E4":`\uC790\uB3D9 \uD574\uACB0 ${n}\uD68C\uAC00 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4`}</span
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
  </div>`}function kb(e){let t=e.operation,n=t.state==="failed",r=t.failure?t.failure.code:"";return l`<li
    class="worker-ev"
    data-operation-id=${t.operation_id}
    data-state=${t.state}
  >
    <span
      class="worker-ev__t"
      title=${e.at?Wt(e.at):""}
      >${Vo(e.at)||"\u2014"}</span
    >
    <span class="worker-ev__node" aria-hidden="true"
      ><span class="worker-ev__dot worker-ev__dot--${xp(e)}"></span
    ></span>
    <div class="worker-ev__body">
      <div class="worker-ev__line1">
        <span class="worker-ev__what"
          >${Object.hasOwn(kp,t.kind)?kp[t.kind]:t.kind}</span
        >
        <span class="worker-ev__meta"
          >${t.target_base}@${zo(t.target_sha)}${typeof t.elapsed_ms=="number"?` \xB7 ${As(t.elapsed_ms)}`:""}</span
        >
        <span class="worker-ev__st worker-ev__st--${xp(e)}"
          >${vb(e)}</span
        >
        ${t.dismissed?l`<span class="worker-ev__st worker-ev__st--quiet">접수됨</span>`:""}
        ${t.superseded_by?l`<span class="worker-ev__st worker-ev__st--quiet">덮임</span>`:""}
      </div>
      ${n?Ep(ad(t.failure_kind,r)):""}
      ${wb(t)}
      ${Sp([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:n?r:""},{term:"script",value:[t.script_path||"",t.script_blob_sha?`blob ${zo(t.script_blob_sha)}`:"",Number.isInteger(t.exit_code)?`exit ${t.exit_code}`:""].filter(Boolean).join(" \xB7 ")},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function $b(e){let t=e.cleanup,n=mr(t.step);return l`<li
    class="worker-ev"
    data-bead-id=${t.bead_id}
    data-state="cleanup_stalled"
  >
    <span
      class="worker-ev__t"
      title=${e.at?Wt(e.at):""}
      >${Vo(e.at)||"\u2014"}</span
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
        ${$d(t.step).map(r=>l`<li
              class="worker-step worker-step--${r.state}"
              data-step=${r.step}
            >
              <span class="worker-step__pip" aria-hidden="true"></span>
              <span class="worker-step__lb">${r.label}</span>
            </li>`)}
      </ol>
      ${Ep(Qo(t.reason),typeof t.retry_count=="number"&&t.retry_count>0?`${t.retry_count}\uD68C \uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uD6C4\uC5D0\uB3C4 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.`:"\uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.",!0)}
      <div class="worker-ev__acts">
        <button
          type="button"
          class="worker-ev__btn worker-ev__btn--warn worker-cleanup__resume"
          data-bead-id=${t.bead_id}
        >
          정리 재개${n?` \u2014 ${n} \uB2E8\uACC4\uBD80\uD130`:""}
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
      ${Sp([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:t.reason||""},{term:"\uC9C4\uB2E8",value:t.detail||""},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function xb(e){let t=typeof e.hidden=="number"?e.hidden:0,n=e.expanded===!0;return l`<section class="worker-repo-drawer" data-seam="repo-ops-timeline">
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
          ${e.events.map(r=>r.type==="cleanup"?$b(r):kb(r))}
        </ul>`}
    ${t>0||n?l`<div class="worker-repo-drawer__more">
          <button
            type="button"
            class="worker-ev__btn"
            data-seam="repo-ops-more"
          >
            ${n?"\uC811\uAE30":`\uC774\uC804 ${t}\uAC1C \uB354 \uBCF4\uAE30`}
          </button>
        </div>`:""}
  </section>`}function Tp(e,t={}){let n=null;function r(){if(n===null){Qe(l``,e);return}let a=yb(n.operations,n.cleanup_failures,{expanded:n.expanded});Qe(xb({events:a.visible,hidden:a.hidden,expanded:n.expanded,repo:n.repo}),e)}e.addEventListener("click",a=>{let i=a.target;if(i?.closest?.('[data-seam="repo-ops-close"]')){o();return}i?.closest?.('[data-seam="repo-ops-more"]')&&n&&(n.expanded=!n.expanded,r())});function s(a){n={operations:a.operations,cleanup_failures:a.cleanup_failures,repo:a.repo||"",expanded:!1},r()}function o(){n!==null&&(n=null,r(),t.onClose&&t.onClose())}return{open:s,close:o,isOpen:()=>n!==null,refresh(a){n&&(n={operations:a.operations,cleanup_failures:a.cleanup_failures,repo:a.repo||"",expanded:n.expanded},r())}}}var Ab=Lt("views:worker"),Sb="tab:worker:ready",Eb="tab:worker:blocked",Tb="tab:worker:in-progress",Cb="tab:worker:resolved",Rb="tab:worker:closed",aa=1,Cp=5;function Rp(e){return Co(e).path.length>0}var Ob=new Set(["quick_fix","spec_backed","full_plan"]);function Op(e){return typeof e=="string"&&Ob.has(e)}var Mp="beads-ui.worker.candidate-filter",zi={show_blocked:!1,spec:"all"};function Lb(){try{let e=window.localStorage.getItem(Mp);if(!e)return{...zi};let t=JSON.parse(e);if(!t||typeof t!="object")return{...zi};let n=t.spec;return{show_blocked:t.show_blocked===!0,spec:n==="with"||n==="without"?n:"all"}}catch{return{...zi}}}function Ib(e){try{window.localStorage.setItem(Mp,JSON.stringify(e))}catch{}}function Pb(e,t){let n=i=>t.show_blocked||!i.blocked,r=i=>t.spec==="all"||(t.spec==="with"?i.has_spec:!i.has_spec),s=[],o=0,a=0;for(let i of e){let c=n(i),u=r(i);c&&u?s.push(i):!c&&u?o+=1:c&&!u&&(a+=1)}return{visible:s,hidden_blocked:o,hidden_spec:a}}var Mb=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],Dp="bdui.worker.candidate_sort",Db=[{value:"spec",label:"spec \uC6B0\uC120"},{value:"board",label:"Board \uC21C\uC11C"},{value:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131\uC21C"}],ia="spec";function Nb(){try{let e=window.localStorage.getItem(Dp);return e==="board"||e==="created"||e==="spec"?e:ia}catch{return ia}}function qb(e){try{window.localStorage.setItem(Dp,e)}catch{}}var Np="bdui.worker.done-range";function Fb(){try{let e=window.localStorage.getItem(Np);return fn(e)?e:on}catch{return on}}function jb(e){try{window.localStorage.setItem(Np,e)}catch{}}var Bb="(max-width: 640px)",qp="beads-ui.worker.lane-collapsed",Is={queue:!0,done:!0};function Ub(){try{let e=window.localStorage.getItem(qp);if(!e)return{...Is};let t=JSON.parse(e);return!t||typeof t!="object"?{...Is}:{queue:typeof t.queue=="boolean"?t.queue:Is.queue,done:typeof t.done=="boolean"?t.done:Is.done}}catch{return{...Is}}}function Wb(e){try{window.localStorage.setItem(qp,JSON.stringify(e))}catch{}}function Lp(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let n=typeof t.title=="string"?t.title:t.id||"";return n.length>22?`${n.slice(0,22)}\u2026`:n}function zb(e,t,n){let r=Array.isArray(e)?e.slice():[];return t==="created"?r.sort(cr):(r.sort(Js(n)),t==="board"?r:[...r.filter(Rp),...r.filter(s=>!Rp(s))])}function Hb(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function Gb(e){let t=e?.blocked_info;if(t&&typeof t=="object"){let s=Array.isArray(t.blockers)?t.blockers.filter(o=>typeof o=="string"&&o.length>0):[];return s.length>0?`\u{1F512} ${s.join(", ")}`:"\u{1F512} blocked"}let r=(Array.isArray(e?.dependencies)?e.dependencies:[]).map(s=>{if(typeof s=="string")return s;if(!s||typeof s!="object")return"";let o=s.type??s.dependency_type;return o!==void 0&&o!=="blocks"?"":s.depends_on_id||s.id||""}).filter(Boolean);return r.length>0?`\u{1F512} ${r.join(", ")}`:"\u{1F512} blocked"}function Ip(e){if(e.startsWith("receipt_unbacked:"))return`\uC2E4\uD589 \uC601\uC218\uC99D \uC790\uB3D9 \uAC80\uC99D \uBD88\uAC00(${e.slice(17)}) \u2014 [\uBA38\uC9C0] \uD074\uB9AD\uC73C\uB85C \uC218\uB3D9 \uC9C4\uD589 \uAC00\uB2A5`;switch(e){case"not_in_pr_wait":return"PR \uB300\uAE30 \uC0C1\uD0DC \uB3D9\uAE30\uD654 \uC2E4\uD328";case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";case"spec_id_missing":return"\uC2A4\uD399 ID \uAE30\uB85D \uC5C6\uC74C";default:return e}}function Vb(e){let t=typeof e=="string"?e:"";return t==="review_failed"||t==="review_verdict_malformed"?{label:"\uB9AC\uBDF0\uC5B4 \uAC70\uBD80",action:"\uB9AC\uBDF0\uC5B4\uAC00 \uC2B9\uC778\uD558\uC9C0 \uC54A\uC558\uAC70\uB098 \uD310\uC815\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uCF54\uB4DC\uB97C \uACE0\uCE5C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:t==="reviewer_selection_invalid"?{label:"\uB9AC\uBDF0\uC5B4 \uC124\uC815 \uC624\uB958",action:"\uB9AC\uBDF0\uC5B4 \uC120\uD0DD(Bead\xB7\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\xB7harness)\uC774 \uC720\uD6A8\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4 \u2014 \uC124\uC815\uC744 \uACE0\uCE5C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:t.startsWith("repair_")?{label:"\uC218\uB9AC \uC2E4\uD328",action:"REVISE \uB4A4 1\uD68C \uC790\uB3D9 \uC218\uB9AC\uAC00 \uC2E4\uD328\uD588\uAC70\uB098 \uC608\uC0B0\uC744 \uB2E4 \uC37C\uC2B5\uB2C8\uB2E4 \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uACE0\uCE5C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:t.endsWith("_drift")||t.endsWith("_mismatch")||t==="head_drift_during_receipt"||t==="resolver_self_review_not_approved"?{label:"head \uBD88\uC77C\uCE58",action:"\uB9AC\uBDF0\uD55C head\uC640 \uD604\uC7AC head\uAC00 \uB2E4\uB985\uB2C8\uB2E4 \u2014 \uB204\uAC00 \uBE0C\uB79C\uCE58\uB97C \uBC14\uAFE8\uB294\uC9C0 \uD655\uC778\uD55C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:{label:"\uC9C4\uD589 \uBD88\uAC00",action:"\uB9AC\uBDF0 \uC9C4\uD589\uC744 \uC774\uC5B4\uAC08 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uC0AC\uC720\uB97C \uD655\uC778\uD55C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}}function Kb(e){if(e==="lane_occupied")return"\uC2E4\uD589 \uB808\uC778\uC5D0 \uB0A8\uC544 \uC788\uC5B4 \uBA38\uC9C0 \uB300\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4";let t="\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)";return typeof e=="string"&&e.length>0?`${t}: ${e}`:t}function Yb(e,t=null){if(e==="worker_sessions_busy")return"\uD574\uC18C \uB300\uAE30 \u2014 \uC2E4\uD589 \uC2AC\uB86F \uB300\uAE30 \uC911";if(typeof e!="string"||!e.startsWith("completion_waiting:"))return null;let n=e.slice(19);if(n.length===0)return null;switch(n){case"gating":{let r=t?.repair_sessions_used;return typeof r=="number"&&r>0?"\uC218\uC815 \uACB0\uACFC \uC7AC\uD655\uC778 \uC911":"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911"}case"repairing":return"\uC790\uB3D9 \uC218\uC815 \uC911";case"waiting_repair_pr":return"\uC218\uC815 PR \uB300\uAE30 \uC911";case"merging":return"\uBA38\uC9C0 \uC911";case"cleaning":return"\uB9C8\uBB34\uB9AC \uC911";case"paused":return"\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";case"needs_human":return"\uD655\uC778 \uD544\uC694";default:return null}}function Zb(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}function Qb(e){if(!e||typeof e!="object")return null;switch(e.state){case"pending":return{badge:"implementation review \uB300\uAE30",live:!1,alert:!1};case"reviewing":return{badge:"implementation review \uC911",live:!0,alert:!1};case"revising":return{badge:"review \uC218\uC815 \uC911 \xB7 1\uD68C",live:!0,alert:!1};case"failed":{let n=(typeof e.failure_reason=="string"?e.failure_reason:"").replace(/[\u0000-\u001f\u007f]/g," ").slice(0,120);return{badge:n.trim().length>0?`review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328: ${n.trim()}`:"review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328",live:!1,alert:!0}}default:return null}}function Hi(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}var Xb=new Set(["paused","needs_human","waiting_metadata","reviewing","retrying"]),Jb=new Set(["waiting_metadata","reviewing","retrying"]);function ey(e,t){let n=e&&typeof e=="object"?e.auto_resolution:null,r=n&&typeof n=="object"&&!Array.isArray(n)?n:null;if(!r||!e)return null;let s=typeof r.origin_reason=="string"&&r.origin_reason.length>0?`\uC6D0 \uC0AC\uC720: ${r.origin_reason}`:"";switch(e.phase){case"waiting_metadata":return{label:"\uC815\uC815 \uB300\uAE30",details:[s,"\uBA54\uD0C0\uB370\uC774\uD130 \uC815\uC815\uC774 \uAD00\uCE21\uB418\uBA74 \uC790\uB3D9 \uC7AC\uAC1C"].filter(Boolean),live:!1};case"reviewing":{let o=typeof t?.reviewer=="string"?t.reviewer:"",a=typeof t?.effort=="string"?t.effort:"",i=t?.reviewer_source==="bead"||t?.reviewer_source==="harness"?t.reviewer_source:"";return{label:"\uC790\uB3D9 \uB9AC\uBDF0 \uC911",details:[o?`\uB9AC\uBDF0\uC5B4 ${o}${a?` \xB7 effort ${a}`:""}`:"",i?`\uB9AC\uBDF0\uC5B4 \uCD9C\uCC98 ${i}`:"",s].filter(Boolean),live:!0}}case"retrying":{let o=Number.isInteger(r.attempts)?Math.max(0,Number(r.attempts)):0,a=Number.isInteger(r.attempt_cap)&&Number(r.attempt_cap)>0?Number(r.attempt_cap):0,i=typeof r.next_at=="number"?Wt(r.next_at):"",c=typeof r.last_error=="string"&&r.last_error.length>0?r.last_error:"";return{label:a>0?`\uC7AC\uC2DC\uB3C4 ${Math.min(o,a)}/${a}`:`\uC7AC\uC2DC\uB3C4 ${o}`,details:[s,i?`\uB2E4\uC74C \uC2DC\uAC01 ${i}`:"",c?`\uB9C8\uC9C0\uB9C9 \uC624\uB958: ${c}`:""].filter(Boolean),live:!0}}default:return null}}function ty(e){if(typeof e!="string")return"";for(let t of["retry_exhausted:","auto_review_exhausted:"])if(e.startsWith(t))return e.slice(t.length);return""}function ny(e,t=null){if(!e||typeof e!="object")return null;let n=Number.isInteger(e.repair_sessions_used)?Math.max(0,e.repair_sessions_used):0,r=Number.isInteger(e.repair_session_cap)?Math.max(0,e.repair_session_cap):0,s=e.current_repair&&typeof e.current_repair=="object"?e.current_repair:null,o=s&&typeof s.pr_number=="number"?s.pr_number:null,a="";switch(e.phase){case"gating":a=n>0?"\uC218\uC815 \uACB0\uACFC \uC7AC\uD655\uC778 \uC911":"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";break;case"repairing":a="\uC790\uB3D9 \uC218\uC815 \uC911";break;case"waiting_repair_pr":a=o?`\uC218\uC815 PR #${o} \uB300\uAE30 \uC911`:"\uC218\uC815 PR \uB300\uAE30 \uC911";break;case"merging":a=e.subject_role==="repair"?o?`\uC218\uC815 PR #${o} \uBA38\uC9C0 \uC911`:"\uC218\uC815 PR \uBA38\uC9C0 \uC911":"\uBA38\uC9C0 \uC911";break;case"cleaning":a="\uB9C8\uBB34\uB9AC \uC911";break;case"waiting_metadata":case"reviewing":case"retrying":if(!t)return null;a=t.label;break;case"paused":a="\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":a="\uD655\uC778 \uD544\uC694";break;case"completed":return null;default:return null}let i=[a,`\uC790\uB3D9 \uC218\uC815 \uD69F\uC218 ${n}/${r}`];e.head_sha&&i.push(`head ${e.head_sha}`),e.base_sha&&i.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&i.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`);let c=ty(e.terminal_reason);c&&i.push(`\uC6D0 \uC0AC\uC720: ${c}`);for(let u of t?t.details:[])i.push(u);return e.active_attempt_id&&i.push(`attempt ${e.active_attempt_id}`),s&&typeof s.bead_id=="string"&&i.push(`repair ${s.bead_id}`),e.evidence&&i.push(e.evidence),e.log_path&&i.push(e.log_path),{badge:a,title:i.join(`
`),alert:e.phase==="needs_human",lock_actions:!Xb.has(e.phase),repair_pr_url:s&&typeof s.pr_url=="string"?s.pr_url:"",repair_pr_number:o}}function Pp(e){if(!e||typeof e!="object")return[];let t=e.blocking_codes;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function ry(e){let t=e.queue_failure?`\uBA38\uC9C0 \uC2E4\uD328 \uC6D0\uBB38: ${e.queue_failure}`:e.auto_skip?`\uC790\uB3D9 \uC81C\uC678 \uC6D0\uBB38: ${e.auto_skip}`:"",n=(r,s={})=>{let o=[s.title||"",t].filter(Boolean);return{label:r,title:o.join(`
`),live:s.live===!0,alert:s.alert===!0}};if(e.continuation_required)return n("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694",{alert:!0});if(e.merge_step)return e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428",{title:e.merge_step.label,alert:e.merge_step.failed===!0}):n("\uBA38\uC9C0 \uC911",{title:e.merge_step.label,live:!0});if(e.conflict_badge)return n(e.conflict_badge,{live:e.conflict_live===!0});if(e.auto_resolution)return n(e.auto_resolution.label,{title:e.auto_resolution.details.join(`
`),live:e.auto_resolution.live===!0});if(e.head_review&&e.head_review.state!=="failed")return n("\uB9AC\uBDF0 \uC9C4\uD589 \uC911",{title:e.head_review.badge,live:e.head_review.live===!0});if(e.recovery?.lock_actions)return n(e.recovery.badge,{title:e.recovery.title,live:!0});if(e.cleanup_failed)return n(e.cleanup_label?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${e.cleanup_label}`:"\uC815\uB9AC \uBA48\uCDA4",{title:e.cleanup_failed.reason||"",alert:!0});if(e.base_exception)return n("\uB2E4\uB978 base \uB300\uC0C1",{title:e.base_exception,alert:!0});if(e.conflicting)return n("\uCDA9\uB3CC \uD574\uACB0 \uD544\uC694",{alert:!0});if(e.gate?.reason==="base_behind")return n("base \uAC31\uC2E0 \uD544\uC694",{alert:!0});if(e.gate?.reason==="review_receipt_missing"||e.gate?.reason==="review_receipt_stale")return n("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694",{title:e.gate.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2C8\uAC70\uB098 \uC870\uC0C1 \uD655\uC778\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131\xB7\uBE0C\uB79C\uCE58 \uB9AC\uC14B \uBCF5\uAD6C \uACBD\uB85C\uB85C, \uAD00\uCE21\uB41C \uCD5C\uC885 head \uC804\uCCB4\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uD569\uB2C8\uB2E4":"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uAD00\uCE21\uB41C \uCD5C\uC885 head \uC804\uCCB4\uB97C \uB9AC\uBDF0\uD574\uC57C \uBA38\uC9C0\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4",alert:!0});if(e.gate?.reason==="spec_id_missing")return n("\uC2A4\uD399 ID \uB204\uB77D",{title:"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id \uD544\uC694",alert:!0});if(e.gate?.reason==="review_receipt_invalid")return n("\uB9AC\uBDF0 \uAE30\uB85D \uC624\uB958",{title:"review_receipt_invalid",alert:!0});if(Pp(e.receipt_check).length>0)return n("\uC601\uC218\uC99D \uD655\uC778 \uD544\uC694",{title:`\uC131\uB9BD\uD558\uC9C0 \uC54A\uB294 \uC2E4\uD589 \uC601\uC218\uC99D \u2014 ${Pp(e.receipt_check).join(", ")}`,alert:!0});if(e.head_review?.state==="failed"){let r=Vb(e.head_review.failure_reason);return n(`\uB9AC\uBDF0 \uC2E4\uD328: ${r.label}`,{title:e.head_review.failure_reason?`${r.action} (${e.head_review.failure_reason})`:r.action,alert:!0})}return e.recovery?n(e.recovery.badge,{title:e.recovery.title,alert:!0}):e.gate?.tier==="verify"&&e.gate.gate_badge==="\uAC80\uC99D \uC2E4\uD328"?n("\uAC80\uC99D \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.queue_failure?n(`\uBA38\uC9C0 \uC2E4\uD328 \u2014 ${Ip(e.queue_failure)}`,{title:e.queue_failure,alert:!0}):e.auto_skip?n(`\uC790\uB3D9 \uC81C\uC678 \u2014 ${Ip(e.auto_skip)}`,{title:e.auto_skip,alert:!0}):e.queued&&!e.queue_active?n(`\uBA38\uC9C0 \uB300\uAE30 #${e.queue_position}`):e.gate?.enabled===!0?n("\uBA38\uC9C0 \uAC00\uB2A5"):e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428"):e.gate?.tier==="closed_unmerged"?n("\uB2EB\uD798",{alert:!0}):e.activity?n("\uD655\uC778 \uC911",{live:!0}):e.gate?.tier==="undecidable"||e.gate?.reason==="mergeability_unknown"?n("\uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.gate?.tier==="unobserved"||e.gate?.tier==="verify"||e.gate?.gate_badge==="\uAD00\uCE21 \uB300\uAE30"?n("\uD655\uC778 \uC911"):e.gate?.gate_badge?n(e.gate.gate_badge,{title:e.gate.reason||"",alert:e.gate.enabled!==!0}):null}function sy(e,t,n,r,s=null,o=null,a=null,i=!1,c=null,u=!0,d=null,_=null,h=null,w={},$=!1,P=!1,z={}){let Q=!!c&&c.position>0,ae=!!c?.continuation_action&&c.continuation_action.continuation===null,N=!!c&&c.active===!0,M=c&&c.failure||null,q=Yb(c?c.waiting:null,h),G=n[e]||null,E=G&&G.gate?G.gate:null,W=G&&G.pr?G.pr:null,B=Zb(c?c.resolution:null),ve=Qb(c?c.head_review:null),fe=c&&c.head_review||null,ge=ey(h,fe),V=ny(h,ge),Te=c&&c.authority||null,Re=!!fe&&["pending","reviewing","revising"].includes(fe.state),ie=!!h&&typeof h=="object"&&Jb.has(h.phase),de=Q&&!N&&(fe?.state==="failed"||!Te||ie||Te.source==="automatic"&&!P),Ae=a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":B?B.badge:a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":q,H=!!E&&E.base_badge==="\uCDA9\uB3CC",te=!!E&&E.enabled===!0,ce=Os({bead_id:e,merge_sha:z.merge_sha,cleanup_cursor:z.cleanup_cursor,merge_progress:o&&o.merge_progress?o.merge_progress:null,cleanup_failed:r,repo_operations:z.repo_operations}),ke=sa(ce),be=!!r&&["child_sweep","branch_cleanup","parent_close"].includes(r.step)&&!!E&&E.tier==="merged",je=i&&!!r&&!!E&&E.tier==="merged",we=de&&(te||H||E?.reason==="base_behind"||E?.reason==="review_receipt_missing"||E?.reason==="review_receipt_stale"||be||je),Je=i&&H&&u===!1,it=xn(w,e,{external:i,merge_active:N||ce?.step==="merge",merge_queued:Q,conflict_active:!!a,cleanup_active:ke,merged:!!r||E?.tier==="merged"}),I=!!it.operation,me=!be&&!!r&&r.step==="repo_operations",$e=ry({continuation_required:ae,merge_step:ce,conflict_badge:Ae,conflict_live:B?.live===!0||a==="running",head_review:fe&&ve?{...ve,state:fe.state,failure_reason:fe.failure_reason}:null,auto_resolution:ge,recovery:V,cleanup_failed:r,cleanup_label:r?mr(r.step):null,base_exception:_,conflicting:H,gate:E,receipt_check:G&&G.receipt_check?G.receipt_check:null,queue_failure:M,auto_skip:d,queued:Q,queue_active:N,queue_position:c?c.position:0,activity:Ae?null:o&&o.activity||null}),Se=$e?.live===!0&&$e.title?l`<span title=${$e.title}>${$e.label}</span>`:$e?.label||null;return{id:e,title:i?l`${t}<span class="muted"> · 세션</span>`:t,reason:r&&ce?.active!==!0?ra(r.step):"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",worker_serial:$,external:i,pr_number:W&&typeof W.number=="number"?W.number:null,pr_url:W&&typeof W.url=="string"?W.url:"",completion_badge:$e?.live!==!0&&$e?.title?$e.label:null,completion_title:$e?.title||"",completion_repair_pr_url:V?V.repair_pr_url:"",completion_repair_pr_number:V?V.repair_pr_number:null,badges:Se?[Se]:[],live_badge:$e?.live===!0?Se:null,usage:s,alert:$e?.alert===!0,merge_action:E?.tier==="merged"&&!be&&!je||me?!1:!Q||ae||de,timeline_action:me,cancel_action:Q&&!ae,cancel_enabled:(!N||Re)&&!(V&&V.lock_actions),cancel_title:V&&V.lock_actions?`${V.badge} \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694`:N&&!Re?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":Re?"review \uC9C4\uD589\uC744 \uCDE8\uC18C\uD558\uACE0 \uBA38\uC9C0 \uAD8C\uD55C\uC744 \uD3D0\uAE30\uD569\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:it,discard_action:it.action,merge_step:ce,discard_enabled:it.enabled,discard_title:it.title,merge_enabled:!ce&&!a&&!I&&!_&&!(V&&V.lock_actions)&&!Je&&!me&&(te||H||E?.reason==="base_behind"||E?.reason==="review_receipt_missing"||E?.reason==="review_receipt_stale"||be||je||we||ie&&!N),merge_label:ae?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":be||je?"\uC815\uB9AC \uC7AC\uAC1C":H&&!ce&&!be?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":E?.reason==="base_behind"?"base \uAC31\uC2E0 \uD6C4 \uBA38\uC9C0":E?.reason==="review_receipt_missing"||E?.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0":de?"\uB2E4\uC2DC \uBA38\uC9C0":void 0,merge_title:I?it.error?`\uD3D0\uAE30 \uC2E4\uD328: ${it.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${it.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:ae?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":ce?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${ce.label}`:je?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Je?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":be?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":H?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":E?.reason==="base_behind"?"base\uB97C \uC790\uB3D9 \uAC31\uC2E0\uD55C \uB4A4 \uBA38\uC9C0\uD569\uB2C8\uB2E4":E?.reason==="review_receipt_missing"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uC5C6\uC74C \u2014 \uC790\uB3D9 \uB9AC\uBDF0 \uC138\uC158 \uD6C4 \uC2B9\uC778\uB418\uBA74 \uBA38\uC9C0\uD569\uB2C8\uB2E4":E?.reason==="review_receipt_stale"?"head \uC7AC\uC791\uC131\uB428(\uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D8) \u2014 \uC790\uB3D9 \uC7AC\uB9AC\uBDF0 \uC138\uC158 \uD6C4 \uC2B9\uC778\uB418\uBA74 \uBA38\uC9C0\uD569\uB2C8\uB2E4":E?.reason==="spec_id_missing"?"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id\uB85C \uAE30\uB85D\uD55C \uB4A4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":te?`\uBA38\uC9C0 (${E.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:E&&E.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${E&&E.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function Gi(e,t={}){let{transport:n,issueStores:r,queueStore:s,analysisStore:o,sessionLogStore:a,uiOrderStore:i,gotoIssue:c,getWorkspacePath:u,openDoc:d,doneRange:_,onDoneRangeChange:h}=t,w=r?to(r,i):null,$=oo({transport:n,uiOrderStore:i}),P=null,z=[],Q=Lb(),ae=null,N=null,M={members_by_id:new Map,serial_raw_lengths:{},serial_lane_count:0,occupied_lanes:new Set},q=Nb(),G=fn(_)?_:Fb(),E=new Map;function W(){let p=Wn.find(y=>y.value===G);return p?p.label:"\uC624\uB298"}let B=Ub(),ve=!1,fe=new Set,ge=new Set,V=new Set,Te=new Set,Re=new Set,ie={},de=null,Ae=0,H=null,te=[];function ce(p){return de===p?ie:{}}async function ke(){if(!n)return;let p=u?.()||"";if(de===p||H&&H.key===p&&H.generation===Ae)return;let y=++Ae;H={key:p,generation:y};let f=null;try{f=await Promise.resolve(n("get-session-defaults",{}))}catch(C){if(y!==Ae)return;H=null,Ab("get-session-defaults failed: %o",C),We();return}y===Ae&&(ie=f&&typeof f.values=="object"&&f.values!==null?{...f.values}:{},de=p,H=null,We())}function be(){de=null,Ae+=1,ke()}let je=document.createElement("div");je.className="worker-console";let we=document.createElement("div");we.className="worker-top";let Je=document.createElement("div");Je.className="worker-drawer-overlay",Je.hidden=!0;let it=document.createElement("div");it.className="worker-drawer-overlay__backdrop";let I=document.createElement("div");I.className="worker-drawer-host";let me=document.createElement("div");me.className="worker-drawer-host",me.hidden=!0,Je.append(it,I,me);let $e=document.createElement("div");$e.className="worker-lanes-host",je.append(we,Je,$e),e.appendChild(je);let Se=null,Ge=null,qe=Dr(I,{transport:n,sessionLogStore:a,onClose:()=>{Se=null,Ge=null,Je.hidden=!0,We()}}),K=Tp(me,{onClose:()=>{me.hidden=!0,Je.hidden=!0,We()}}),X=vp({getWorkspacePath:u||(()=>"")}),Me=u&&u()||"",et=wp({queueStore:s,transport:n,onChanged:()=>We(),onOpenScript:(p,y)=>{X.open(p,y)}}),Ve=o?mp(je,{queueStore:s,analysisStore:o,transport:n,getWorkspacePath:u,onOpenTranscript:(p,y)=>Ie(p,y)}):null;function De(){return s&&s.get()||{revision:0,auto_advance:!1,auto_merge:!1,slots:aa,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]}}function Ke(){let p=De(),y=typeof p.serial_lane_count=="number"&&Number.isInteger(p.serial_lane_count)&&p.serial_lane_count>0?Math.min(p.serial_lane_count,5):0,f=Array.isArray(p.serial_lanes)?p.serial_lanes:[],C=[];for(let le of f){if(C.length>=y)break;!le||typeof le.id!="string"||!/^s[1-5]$/.test(le.id)||!Array.isArray(le.entries)||C.push({id:le.id,label:`\uC9C1\uB82C ${le.id.slice(1)}`,count:le.entries.length})}return C.length===0?null:[{id:"parallel",label:"\uBCD1\uB82C",count:(Array.isArray(p.queue)?p.queue:[]).length},...C]}function st(p){if(!ae||!p.some(f=>f.id===ae))return null;let y=Ke();return y?{bead_id:ae,lanes:y}:null}function Ne(){let p=De();return typeof p.revision=="number"?p.revision:0}function Be(p){p&&p.queue&&s&&s.set(p.queue)}function dt(){let p=De().queue;return Array.isArray(p)?p.length:0}async function ht(p,y,f){if(!n)return;let C=()=>({bead_id:p,...y==="parallel"?{}:{lane:y},...f===void 0?{}:{index:f},expected_revision:Ne()}),T=await n("worker-queue-place",C());Be(T),T&&T.conflict&&await n("worker-queue-place",C()).then(Be)}async function bt(p,y,f){if(!n)return;let C=()=>({bead_id:p,...y==="parallel"?{}:{lane:y},to_index:f,expected_revision:Ne()}),T=await n("worker-queue-reorder",C());Be(T),T&&T.conflict&&await n("worker-queue-reorder",C()).then(Be)}async function ft(p){if(!n)return;let y=await n("worker-queue-remove",{bead_id:p,expected_revision:Ne()});Be(y),y&&y.conflict&&await n("worker-queue-remove",{bead_id:p,expected_revision:Ne()}).then(Be)}async function kt(p){if(!n||!p)return;let y=await n("worker-attempt-pause",{attempt_id:p});y&&y.paused===!1&&y.reason&&ue(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${y.reason}`,"error",2400)}async function Rt(p){if(!n||!p)return;let y=await Lr();if(y===null)return;let f=async(T={})=>await n("worker-attempt-resume",{attempt_id:p,expected_revision:Ne(),...y!==""?{instructions:y}:{},...T}),C=await f();Be(C),C&&C.conflict&&(C=await f(),Be(C)),C=await Ln(C,(T,le)=>f({continuation:T,decision_token:le}),{onResult:Be,refresh:()=>f()}),C&&C.resumed===!1&&!C.conflict&&C.reason&&ue(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${C.reason}`,"error",2400)}async function $t(p){if(!n||!p)return;let y=await n("worker-attempt-dismiss",{attempt_id:p,expected_revision:Ne()});Be(y),y&&y.conflict&&(y=await n("worker-attempt-dismiss",{attempt_id:p,expected_revision:Ne()}),Be(y)),y&&y.dismissed===!1&&!y.conflict&&y.reason&&ue(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${y.reason}`,"error",2400)}async function xt(p,y,f=!0){if(!n)return null;let C=n,T=await C(p,{...y,expected_revision:Ne()});return Be(T),T&&T.conflict&&f&&(T=await C(p,{...y,expected_revision:Ne()}),Be(T)),T}async function Ye(p){if(!n||!p)return;let y=De().merge_queue?.find(C=>C.bead_id===p)?.continuation_action;if(y?.mismatch&&y.continuation===null){await U(p,y.mismatch);return}fe.add(p),We();let f;try{f=await xt("worker-merge-queue-add",{bead_id:p})}catch{ue("\uBA38\uC9C0 \uD074\uB9AD\uC774 \uC11C\uBC84\uC5D0 \uC804\uB2EC\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4(\uC5F0\uACB0 \uBB38\uC81C) \u2014 \uC5F0\uACB0 \uBCF5\uAD6C \uD6C4 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",3200);return}finally{fe.delete(p),We()}if(!(!f||f.applied)){if(f.conflict){ue("\uD050\uAC00 \uBC14\uB00C\uC5B4 \uBA38\uC9C0 \uD074\uB9AD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",2400);return}ue(Kb(f.reason),"error",2400)}}async function L(p){if(!(!n||!p||ge.has(p))){ge.add(p),We();try{let y=await n("worker-cleanup-retry",{bead_id:p,expected_revision:Ne()});Be(y),y&&!y.retried&&!y.conflict&&y.reason&&ue(`\uC815\uB9AC \uC7AC\uAC1C \uAC70\uBD80: ${y.reason}`,"error",2400)}finally{ge.delete(p),We()}}}async function U(p,y){let f=await Ln({continuation_mismatch:y},(T,le)=>xt("worker-merge-queue-add",{bead_id:p,continuation:T,decision_token:le},!1)),C=f?.queue?.merge_queue?.find(T=>T.bead_id===p)?.continuation_action;if(f?.applied!==!0&&C?.continuation===null&&C.mismatch){await U(p,C.mismatch);return}f&&f.applied===!1&&!f.conflict&&ue("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD\uC774 \uCD5C\uC2E0 \uC0C1\uD0DC\uC640 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4","error",2800)}async function Y(p){if(!n)return;let y=await xt("worker-merge-auto-toggle",{on:p});!y||y.conflict||ue(p?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",p?"success":"info",2400)}async function ne(p){if(!n||!p)return;let y=await xt("worker-merge-queue-remove",{bead_id:p});y&&!y.conflict&&!y.applied&&y.reason==="merge_active"&&ue("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function xe(){await xt("worker-merge-queue-remove",{all:!0})}async function He(p,y=null,f="unmerged",C=null){if(!n||!p)return;let T=Ss(p,f);if(!(!!C||typeof globalThis.confirm!="function"||globalThis.confirm(T)))return;let Ee=await n("worker-discard",{bead_id:p,...y?{attempt_id:y}:{},...C?{operation_id:C}:{},expected_revision:Ne()});if(Be(Ee),Ee&&Ee.conflict&&(Ee=await n("worker-discard",{bead_id:p,...y?{attempt_id:y}:{},...C?{operation_id:C}:{},expected_revision:Ne()}),Be(Ee)),Ee&&Ee.discarded===!0){ue(Ko(Ee),"success",5e3);return}if(Ee&&Ee.reason){ue(`\uD3D0\uAE30 \uC2E4\uD328: ${Ee.reason}`,"error",2800);return}if(Ee&&Ee.accepted&&Ee.pending==="merged_revert"){ue("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(Ee&&Ee.accepted&&!Ee.discarded){ue(`\uD3D0\uAE30 \uC9C4\uD589: ${Ee.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}Ee&&!Ee.conflict&&ue("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function Z(p,y,f){if(!(!n||!y||!f||Te.has(y))){Te.add(y),We();try{let C=await n(p,{bead_id:y,action_id:f,expected_revision:Ne()});Be(C),C?.conflict?ue("\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694.","error",2800):!C?.ok&&C?.reason&&ue(`\uC774\uC804 \uC791\uC5C5 \uCC98\uB9AC \uAC70\uBD80: ${String(C.reason)}`,"error",2800)}finally{Te.delete(y),We()}}}async function ee(p,y){if(!n||!y||V.has(y))return;V.add(y),We();let f;try{let C=async(T={})=>await n(p,{bead_id:y,expected_revision:Ne(),...T});f=await C(),Be(f),f&&f.conflict&&(f=await n(p,{bead_id:y,expected_revision:Ne()}),Be(f)),p==="worker-revise-fix"&&(f=await Ln(f,(T,le)=>C({continuation:T,decision_token:le}),{onResult:Be,refresh:()=>C()}))}finally{V.delete(y),We()}if(!(!f||f.conflict)){if(f.ok){ue(p==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}ue(`\uCC98\uBD84 \uAC70\uBD80: ${f.reason||""}`,"error",3e3)}}async function Oe(p){if(!n)return;let y=await n("worker-automation-toggle",{on:p,expected_revision:Ne()});Be(y),y&&y.conflict&&await n("worker-automation-toggle",{on:p,expected_revision:Ne()}).then(Be)}async function S(p){if(!n||!p)return;let y=await n("worker-repo-operation-repair",{operation_id:p});if(Be(y),y&&y.ok===!1){ue(`\uD574\uACB0 \uC138\uC158 \uAC70\uBD80: ${y.reason||""}`,"error",3e3);return}y&&y.ok===!0&&ue("\uD574\uACB0 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4","success",2400)}async function g(p){if(!n||!p)return;let y=await n("worker-repo-operation-dismiss",{operation_id:p});Be(y),y&&y.ok===!1&&ue(`\uAE30\uB85D \uB2EB\uAE30 \uAC70\uBD80: ${y.reason||""}`,"error",3e3)}async function k(p){if(!n||!Number.isFinite(p))return;let y=Math.max(aa,Math.floor(p)),f=await n("worker-queue-set-slots",{slots:y,expected_revision:Ne()});Be(f),f&&f.conflict&&await n("worker-queue-set-slots",{slots:y,expected_revision:Ne()}).then(Be)}async function j(p){if(!n||!Number.isInteger(p)||p<1||p>Cp)return;let y=De(),f=(Array.isArray(y.serial_lanes)?y.serial_lanes:[]).slice(p).reduce((le,Ee)=>le+(Array.isArray(Ee?.entries)?Ee.entries.length:0),0),C=()=>({count:p,expected_revision:Ne()}),T=await n("worker-queue-set-serial-lane-count",C());Be(T),T&&T.conflict&&(T=await n("worker-queue-set-serial-lane-count",C()),Be(T)),T&&T.applied&&f>0&&ue(`\uC9C1\uB82C \uB808\uC778 \uCD95\uC18C \u2014 ${f}\uAC1C \uD56D\uBAA9\uC774 \uBCD1\uB82C \uB300\uAE30\uB85C \uC774\uB3D9`)}let se="\uAC19\uC740 \uC9C1\uB82C \uB808\uC778\uC73C\uB85C";function re(p,y){let f=Wi(p,y.id,M);return{id:y.id,title:y.title,location_label:y.location_label,prefixes:y.prefixes,action:f.kind==="note"?{kind:"note",text:f.text}:f.kind==="disabled"?{kind:"disabled",label:se,title:f.title}:{kind:"place",label:se,title:f.title}}}function ye(p,y){if(!N||N.bead_id!==p)return null;let f=N.counterpart_id,C=f===null?y:y.filter(T=>T.id===f);return C.length===0?null:{rows:C.map(T=>re(p,T))}}async function _e(p,y){let f=Wi(p,y,M);if(N=null,f.kind!=="ops"){We();return}let C=Ne();for(let T of f.ops){let le=await nt(T,C);if(le===null)break;C=le}We()}async function nt(p,y){if(!n)return null;try{let f=await n("worker-queue-place",{bead_id:p.bead_id,lane:p.lane,index:p.index,expected_revision:y});if(Be(f),f&&f.conflict)return ue("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null;if(!f||f.applied!==!0)return ue(f&&typeof f.admission_reason=="string"?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${f.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null;let C=f.queue?f.queue.revision:void 0;return typeof C!="number"?(ue("\uD050 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),null):C}catch(f){return ue(f instanceof Error&&f.message?f.message:"\uD050 \uC694\uCCAD \uC2E4\uD328","error"),null}}function _t(){let p=De(),y=w?w.selectBoardColumn(Sb,"ready"):[],f=w?w.selectBoardColumn(Eb,"blocked"):[],C=w?w.selectBoardColumn(Rb,"closed"):[],T=w?w.selectBoardColumn(Tb,"in_progress"):[],le=w?w.selectBoardColumn(Cb,"resolved"):[],Ee=ro([...y,...f,...T,...le,...C]),Ue=new Map;for(let m of[...y,...f,...T])m&&m.id&&!Ue.has(m.id)&&Ue.set(m.id,m);let Xe={...ce(u?.()||"")};for(let m of["orchestration_model","orchestration_effort","orchestration_speed"]){let F=p[m];typeof F=="string"&&(Xe[m]=F)}function Ze(m,F){let oe=Ue.get(m);if(!oe)return null;let ze=oe.metadata&&typeof oe.metadata=="object"?oe.metadata:{},ut=oe.workflow?.route,jt=ze.route,Nt=Op(ut)?ut:Op(jt)?jt:null;return tn({pin:ze,global:Xe,execution_defaults:p.execution_defaults??null,runner_catalog:p.runner_catalog??null,route:Nt,controller_runtime:F})}function vt(m){let F=m.runner||null,oe=Ze(m.bead_id,F),ze=Es(m),ut=oe?Qn(oe,F):null;return ze||ut?{orchestration:ze,worker:ut}:null}let rn=new Map;function Vr(m){if(rn.has(m))return rn.get(m)??null;let F=Ze(m,null),oe=null;if(F){let ze=$n(p.runner_catalog??null,F.orchestration_model.value??""),ut=ze===null?F:Ze(m,ze),jt=_r(ut,p.runner_catalog??null),Nt=Qn(ut,ze);oe=jt||Nt?{orchestration:jt,worker:Nt}:null}return rn.set(m,oe),oe}function gr(m){let F=so(Ee,m);return F.total===0?null:F}let Zi=p.bead_titles||{},Jt=new Map;for(let[m,F]of Object.entries(Zi))typeof F=="string"&&F.length>0&&Jt.set(m,F);for(let m of[...y,...f])Jt.set(m.id,m.title||m.id);let Kr=new Map;for(let m of[...y,...f,...T,...le,...C])m&&m.id&&typeof m.from_id=="string"&&Kr.set(m.id,m.from_id);let Sn=new Map;for(let m of[...y,...f,...T,...le,...C])m&&m.id&&typeof m.priority=="number"&&Sn.set(m.id,m.priority);let Ps=p.bead_times&&typeof p.bead_times=="object"&&!Array.isArray(p.bead_times)?p.bead_times:{},er=p.bead_labels&&typeof p.bead_labels=="object"&&!Array.isArray(p.bead_labels)?p.bead_labels:{},jn=p.bead_workflow&&typeof p.bead_workflow=="object"&&!Array.isArray(p.bead_workflow)?p.bead_workflow:{},Bn=new Map;for(let[m,F]of Object.entries(er))Array.isArray(F)&&Bn.set(m,ji(F));for(let m of[...y,...f]){let F=m.labels;Array.isArray(F)&&!Bn.has(m.id)&&Bn.set(m.id,ji(F))}let hr=new Map,Yr=o?.get()?.last_good?.result?.groups;for(let m of Array.isArray(Yr)?Yr:[]){if(m?.eligible!==!0||!Array.isArray(m.members))continue;let F=m.members.map(ze=>{let ut=(Array.isArray(p.serial_lanes)?p.serial_lanes:[]).find(jt=>jt.entries.some(Nt=>Nt.bead_id===ze));return ut?ut.id:null});if(!(F.every(ze=>ze!==null)&&new Set(F).size===1))for(let ze of m.members)hr.set(ze,m.members.filter(ut=>ut!==ze))}let Ms=p.bead_blocked_by&&typeof p.bead_blocked_by=="object"&&!Array.isArray(p.bead_blocked_by)?p.bead_blocked_by:{},br=new Map;for(let[m,F]of Object.entries(Ps))F&&typeof F=="object"&&br.set(m,F);for(let m of[...y,...f])br.set(m.id,{created_at:m.created_at,updated_at:m.updated_at});let tr=m=>br.get(m)||{},Un=p.pr_wait||[],Zr=p.pr_observations||{},Fe=p.pr_activity||{},pt=p.cleanup_failed||{},sn=Object.entries(pt).map(([m,F])=>({bead_id:m,step:F&&F.step?F.step:"",reason:F&&F.reason?F.reason:"",at:F&&typeof F.at=="number"?F.at:null,detail:F&&typeof F.detail=="string"?F.detail:null,output_tail:F&&typeof F.output_tail=="string"&&F.output_tail?F.output_tail:void 0,log_path:F&&typeof F.log_path=="string"&&F.log_path?F.log_path:void 0,retry_count:F&&typeof F.retry_count=="number"&&Number.isInteger(F.retry_count)&&F.retry_count>0?F.retry_count:0,failure_code:F&&typeof F.failure_code=="string"?F.failure_code:void 0,subject_id:F&&typeof F.subject_id=="string"?F.subject_id:void 0,repair_eligible:!!(F&&F.repair_eligible),repair:F&&F.repair?F.repair:void 0})),la=p.queue||[],Qp=new Set([...la.map(m=>m.bead_id),...(Array.isArray(p.serial_lanes)?p.serial_lanes:[]).flatMap(m=>(Array.isArray(m?.entries)?m.entries:[]).map(F=>F.bead_id)),...Un.map(m=>m.bead_id),...p.done.map(m=>m.bead_id)]),Xp=new Set(f.map(m=>m.id)),Jp=i?i.get()?.order||{}:{},Qi=new Set,Xi=[];for(let m of[...y,...f])Qp.has(m.id)||Qi.has(m.id)||Hb(m)||(Qi.add(m.id),Xi.push(m));z=zb(Xi,q,Jp);let ef=p.admission||{},Ji=m=>{let F=ef[m];if(!F)return"";if(F.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let oe=typeof F.reason=="string"?F.reason:"",ze=oe.indexOf(":");return ze>0&&ze<oe.length-1?`\u26D4 ${oe.slice(0,ze)} (${oe.slice(ze+1)})`:`\u26D4 ${oe}`},tf=z.map(m=>{let F=Co(m),oe=F.path.length>0,ze=m.workflow?.route==="quick_fix"||m.metadata&&m.metadata.route==="quick_fix",ut=!Object.hasOwn(m,"description")||typeof m.description=="string"&&m.description.trim().length>0,jt=Object.hasOwn(m,"labels")&&_p(m.labels),Nt=!jt&&(ze?ut:oe&&!F.conflict),Et=Xp.has(m.id),bn=[];Et&&bn.push(Gb(m)),ze&&!ut?bn.push("missing_description"):!ze&&F.conflict?bn.push("spec_id_conflict"):!ze&&!oe&&bn.push("spec \uC5C6\uC74C");let zs=Ji(m.id);return zs&&bn.push(zs),{id:m.id,title:m.title||m.id,reason:bn.join(" \xB7 "),draggable:Nt,lane:"candidate",created_at:m.created_at,updated_at:m.updated_at,workflow:m.workflow,is_quick_fix:ze,status:m.status,worker_ineligible:jt,blocked:Et,has_spec:oe,exec_chips:Vr(m.id),from_id:m.from_id||void 0,priority:Sn.get(m.id)}}),ca=Pb(tf,Q),ua=ca.visible,nf=p.revise_parked||{},Ds=p.discard_operations&&typeof p.discard_operations=="object"&&!Array.isArray(p.discard_operations)?p.discard_operations:{},da=(m,F)=>m.map((oe,ze)=>{let ut=F!=="done",jt=F!=="done"&&F!=="queue",Nt=ut?nf[oe.bead_id]:null,Et=ut?xn(Ds,oe.bead_id):null,bn=Et?.operation?Et:null,zs=ut&&Bn.get(oe.bead_id)===!0,Cl=Ms[oe.bead_id]||[],va=p.admission&&typeof p.admission=="object"?p.admission[oe.bead_id]:null,wa=ut?td(va,!!bn||Te.has(oe.bead_id)):null,ff=ut&&!wa?Ji(oe.bead_id):null,_f=ut?[ff]:[],Rl=ut&&Cl.length>0&&typeof va?.reason=="string"&&va.reason.startsWith("not_ready")?[`\u23F8 ${Cl.join(", ")} \uC644\uB8CC \uB300\uAE30 (blocks)`]:[],ka=ut?hr.get(oe.bead_id):void 0;return ka&&ka.length>0&&Rl.push(`\u2733 serial \uAD8C\uC7A5 \xB7 ${ka.join(", ")}\uC640`),{id:oe.bead_id,title:Jt.get(oe.bead_id)||oe.bead_id,reason:_f.filter(Boolean).join(" \xB7 "),draggable:ut&&!bn&&!wa,done:F==="done",lane:F,seq:jt?ze+1:void 0,worker_serial:zs,discard:bn,stale_work:wa,badges:[...Rl,...Nt?["\u23F8 REVISE \uD30C\uD0B9"]:[],...F==="done"?Ho(p.attempts||{},oe.bead_id):[]],alert:!!Nt,revise_action:!!Nt,revise_enabled:!!Nt&&!bn&&!V.has(oe.bead_id),revise_title:Nt?Nt.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${Nt.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":"",usage:F==="done"?_n(p.attempts||{},oe.bead_id):null,work_ms:F==="done"?Go(p.attempts||{},oe.bead_id):null,done_at:F==="done"&&typeof oe.added_at=="number"?oe.added_at:void 0,exec_chips:ut?Vr(oe.bead_id):null,workflow:ut&&jn[oe.bead_id]||null,from_id:Kr.get(oe.bead_id)||void 0,priority:Sn.get(oe.bead_id),...tr(oe.bead_id)}}),yr=p.attempts?Object.values(p.attempts).filter(zr):[],pa=new Set;for(let m of yr)m&&typeof m.resumed_from=="string"&&m.resumed_from.length>0&&pa.add(m.resumed_from);let el=new Map;for(let m of yr)el.set(m.bead_id,m.attempt_id);let Ns=new Map;for(let m of yr)Ns.set(m.attempt_id,m);function fa(m){let F=new Set,oe=m;for(;oe&&!F.has(oe.attempt_id);){if(oe.conflict_resolution===!0)return!0;F.add(oe.attempt_id),oe=typeof oe.resumed_from=="string"&&oe.resumed_from.length>0&&Ns.get(oe.resumed_from)||null}return!1}let qs=typeof p.declared_base=="string"?p.declared_base:null;function rf(m){let F=null;for(let oe of yr)!oe||oe.bead_id!==m||fa(oe)||(F===null||(typeof oe.started_at=="number"?oe.started_at:0)>=(typeof F.started_at=="number"?F.started_at:0))&&(F=oe);return F&&typeof F.target_base=="string"?F.target_base:null}let _a=[],Fs=[],sf=fp(p),tl=m=>{let F=typeof m.session_id=="string"&&m.session_id.length>0,oe=pa.has(m.attempt_id);return{eligible:F&&!oe,reason:F?oe?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}},hn=null;for(let m of yr){let F=m.status==="paused"&&!pa.has(m.attempt_id);if(m.status==="running"||F)Fs.push({bead_id:m.bead_id,attempt_id:m.attempt_id,title:Jt.get(m.bead_id)||m.bead_id,runner:m.runner||null,model:m.model||null,effort:m.effort||null,speed:m.speed||null,continuation_mode:m.continuation_mode||null,started_at:typeof m.started_at=="number"?m.started_at:null,resumed_from:m.resumed_from||null,paused:F,conflict_resolution:fa(m),base_exception:Hi(qs,m.target_base),can_pause:typeof m.session_id=="string"&&m.session_id.length>0,discard:xn(Ds,m.bead_id,{attempt_id:m.attempt_id}),workflow:jn[m.bead_id]||null,priority:Sn.get(m.bead_id),usage:_n(p.attempts||{},m.bead_id),rollup:gr(m.bead_id),rollup_expanded:Re.has(m.bead_id),exec_chips:vt(m),...tr(m.bead_id)});else if((m.status==="failed"||m.status==="orphaned")&&sf(m)){let oe=tl(m);_a.push({bead_id:m.bead_id,attempt_id:m.attempt_id,title:Jt.get(m.bead_id)||m.bead_id,runner:m.runner||null,model:m.model||null,effort:m.effort||null,speed:m.speed||null,continuation_mode:m.continuation_mode||null,started_at:typeof m.started_at=="number"?m.started_at:null,resumed_from:m.resumed_from||null,failed:!0,status:m.status,status_label:m.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328",discard:xn(Ds,m.bead_id,{attempt_id:m.attempt_id}),resume_eligible:oe.eligible,resume_reason:oe.reason,conflict_resolution:fa(m),base_exception:Hi(qs,m.target_base),workflow:jn[m.bead_id]||null,priority:Sn.get(m.bead_id),usage:_n(p.attempts||{},m.bead_id),rollup:gr(m.bead_id),rollup_expanded:Re.has(m.bead_id),exec_chips:vt(m),...tr(m.bead_id)}),hn=m}}let nl=new Set([..._a,...Fs].map(m=>m.bead_id));for(let m of Array.isArray(p.session_active)?p.session_active:[]){let F=m&&m.bead_id;typeof F!="string"||F.length===0||nl.has(F)||(nl.add(F),Fs.push({bead_id:F,attempt_id:null,kind:"session",title:m.title||Jt.get(F)||F,status:"in_progress",started_at:En(m.started_at)??En(m.updated_at),updated_at:En(m.updated_at),workflow:m.workflow||null,priority:Sn.get(F),runner:null,model:null,effort:null,speed:null,continuation_mode:null,resumed_from:null,paused:!1,can_pause:!1,conflict_resolution:!1,base_exception:null,discard:null,exec_chips:null,usage:null,rollup:null,rollup_expanded:!1}))}let vr=[..._a,...Fs].map(m=>{let F=Ns.get(m.attempt_id),oe=F?.quickfix_landing;if(F?.quickfix_lane!==!0||!oe||typeof oe!="object")return m;let ze=typeof oe.reason=="string"&&oe.reason.length>0?oe.reason:null,ut=Os({bead_id:F.bead_id,merge_sha:oe.head_sha,cleanup_cursor:oe.cursor,cleanup_failed:ze?{step:oe.cursor,reason:ze}:null,repo_operations:Array.isArray(p.repo_operations)?p.repo_operations:[]});return ut?{...m,landing:ut}:m}),rl=null;if(hn){let m=tl(hn),F=hn.cause_detail;rl={bead_id:hn.bead_id,repo:hn.repo||"",reason:hn.cause||hn.status,cause_detail:F&&typeof F.reason=="string"?{reason:F.reason,command:typeof F.command=="string"?F.command:null}:null,resume_attempt_id:hn.attempt_id,resume_eligible:m.eligible,resume_reason:m.reason,discard:xn(Ds,hn.bead_id,{attempt_id:hn.attempt_id})}}let sl=new Set(vr.map(m=>m.bead_id)),ma=Array.isArray(p.merge_queue)?p.merge_queue:[],ol=new Map,al=new Map,il=new Map,ll=new Map,cl=new Map;ma.forEach((m,F)=>{m&&typeof m.bead_id=="string"&&(ol.set(m.bead_id,F+1),al.set(m.bead_id,m.resolution),il.set(m.bead_id,m.continuation_action||null),ll.set(m.bead_id,m.head_review||null),cl.set(m.bead_id,m.authority||null))});let wr=p.merge_queue_state||{active:null,failures:{}},of=wr.failures||{},ul=wr.waiting&&typeof wr.waiting.bead_id=="string"&&typeof wr.waiting.reason=="string"?wr.waiting:null,af=p.auto_merge_skips||{},dl=m=>{let F=af[m];if(!F)return null;let oe=Zr[m],ze=oe&&oe.pr?oe.pr.head_sha:null;return ze&&ze===F.head_sha?F.reason||"":null},js=new Map;for(let m of vr)m.failed!==!0&&m.conflict_resolution&&(m.paused?js.has(m.bead_id)||js.set(m.bead_id,"paused"):js.set(m.bead_id,"running"));let pl=vr.filter(m=>m.kind!=="session"&&!m.paused&&m.failed!==!0).length,fl=(p.workspace_info||{}).slots,_l=typeof fl=="number"?fl:typeof p.slots=="number"?p.slots:aa,lf=pl>_l,Bs=ir(G),cf=(Array.isArray(p.done)?p.done.slice():[]).filter(m=>Bs===void 0||typeof m.added_at!="number"||m.added_at>=Bs).sort((m,F)=>(F.added_at||0)-(m.added_at||0)),Qr=da(cf,"done"),uf=new Set((Array.isArray(p.done)?p.done:[]).map(m=>m?.bead_id).filter(m=>typeof m=="string")),ml=[],df=u?.()||"";for(let m of C){let F=En(m.closed_at);if(typeof m.id!="string"||uf.has(m.id)||F===null||Bs!==void 0&&F<Bs||typeof m.comment_count!="number"||m.comment_count<=0)continue;let oe=`${df}\0${m.id}\0${String(m.updated_at)}\0${m.comment_count}`,ze=E.get(oe);ze===void 0&&n&&(E.set(oe,"pending"),Promise.resolve(n("get-comments",{id:m.id})).then(ut=>{let jt=Array.isArray(ut)&&ut.some(Nt=>Ro(typeof Nt?.text=="string"?Nt.text:"")?.lane==="session");E.set(oe,jt?"session":"not-session"),We()}).catch(()=>{E.set(oe,"failed"),We()})),ze==="session"&&ml.push({id:m.id,title:m.title||m.id,reason:"",draggable:!1,done:!0,lane:"done",selectable:!1,selected:!1,worker_serial:!1,badges:["\uC138\uC158 \uC791\uC5C5"],alert:!1,usage:null,work_ms:null,done_at:F,created_at:m.created_at,updated_at:m.updated_at})}Qr.push(...ml),Qr.sort((m,F)=>(F.done_at||0)-(m.done_at||0));let Us={};for(let m of In)Us[m]=0;let gl=!1,hl=0,ga=0,bl=0;for(let m of Qr){let F=m.usage;if(F&&typeof F=="object"){let oe=!1;for(let ze of In)Number.isFinite(F[ze])&&(Us[ze]+=F[ze],gl=!0,oe=!0);oe&&(ga+=1,Number.isFinite(F.total_cost_usd)&&(hl+=F.total_cost_usd,bl+=1))}}ga>0&&bl===ga&&(Us.total_cost_usd=hl);let yl=Qr.map(m=>m.usage).filter(m=>m&&typeof m=="object"&&m.providers),pf=yl.length>0?zt(mo(yl)):gl?Pn(Us):null,vl=p.lane_states&&typeof p.lane_states=="object"&&!Array.isArray(p.lane_states)?p.lane_states:{},wl=Array.isArray(p.serial_lanes)?p.serial_lanes:[],kl=m=>{if(Un.some(ze=>ze.bead_id===m))return"PR \uB300\uAE30 \xB7 \uC810\uC720";let F=yr.filter(ze=>ze&&ze.bead_id===m),oe=F.length>0?F[F.length-1].status:null;return oe==="failed"||oe==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":oe==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720"},Ws=wl.filter(m=>m&&typeof m.id=="string"&&Array.isArray(m.entries)).map((m,F)=>{let oe=vl[m.id]||{},ze=new Map((Array.isArray(oe.corrections)?oe.corrections:[]).filter(Et=>Et&&typeof Et.bead_id=="string"&&typeof Et.after=="string").map(Et=>[Et.bead_id,Et.after])),ut=da(m.entries.filter(Et=>!sl.has(Et.bead_id)),m.id).map(Et=>ze.has(Et.id)?{...Et,badges:[`\u{1F517} ${ze.get(Et.id)} \uB4A4 (blocks \uC790\uB3D9)`,...Et.badges]}:Et),jt=Array.isArray(oe.occupied_by)?oe.occupied_by.filter(Et=>typeof Et=="string"):[],Nt=jt.map(Et=>({id:Et,title:Jt.get(Et)||Et,draggable:!1,lane:m.id,ghost:!0,badges:[kl(Et)]}));return{id:m.id,index:F+1,rows:[...Nt,...ut],occupied:jt.length>0,badge:jt.length>0?kl(jt[0]):"\uB300\uAE30",cycle:oe.cycle===!0}}),$l=typeof p.serial_lane_count=="number"?p.serial_lane_count:Ws.length,ha=da(la.filter(m=>!sl.has(m.bead_id)),"queue"),xl=new Map,Al=new Set;for(let[m,F]of Object.entries(vl)){if(!/^s[1-5]$/.test(m))continue;let oe=F&&Array.isArray(F.occupied_by)?F.occupied_by:[];for(let ze of oe)typeof ze=="string"&&xl.set(ze,m);oe.length>0&&Al.add(m)}let kr=[];for(let m of vr)typeof m.bead_id=="string"&&kr.push({id:m.bead_id,title:Jt.get(m.bead_id)||m.bead_id,location_label:"\uC2E4\uD589\uC911",kind:"running",lane_id:xl.get(m.bead_id)??null});for(let m of Ws)for(let F of m.rows)F.ghost!==!0&&kr.push({id:F.id,title:F.title,location_label:`${m.id} #${F.seq??""}`.trim(),kind:"serial",lane_id:m.id});ha.forEach((m,F)=>{kr.push({id:m.id,title:m.title,location_label:`#${F+1}`,kind:"parallel",lane_id:null})});for(let m of ua)kr.push({id:m.id,title:m.title,location_label:"\uD6C4\uBCF4",kind:"candidate",lane_id:null});let Sl={};for(let m of wl)m&&typeof m.id=="string"&&Array.isArray(m.entries)&&(Sl[m.id]=m.entries.length);let ba=new Map;for(let m of kr)ba.has(m.id)||ba.set(m.id,m);M={members_by_id:ba,serial_raw_lengths:Sl,serial_lane_count:$l,occupied_lanes:Al};let El=gp(p.bead_scope,kr),ya=(m,F)=>{let oe=El.get(m.id);if(!oe||oe.overlaps.length===0&&!oe.scope_missing)return m;let ze=ye(m.id,oe.overlaps);return m.dependency_chips={...m.dependency_chips||{},...oe.overlaps.length>0?{overlaps:oe.overlaps}:{},...oe.scope_missing&&F!=="running"?{scope_missing:!0}:{},...ze?{popover:ze}:{}},m};for(let m of ha)ya(m,"queue");for(let m of Ws)for(let F of m.rows)F.ghost!==!0&&ya(F,m.id);for(let m of ua)ya(m,"candidate");let Tl=new Map;for(let m of vr){let F=typeof m.bead_id=="string"?El.get(m.bead_id):void 0;if(!F||F.overlaps.length===0)continue;let oe=ye(m.bead_id,F.overlaps);Tl.set(m.bead_id,{dependency_chips:{overlaps:F.overlaps,...oe?{popover:oe}:{}}})}return{queue:p,idToTitle:Jt,candidates:ua,candidate_hidden:{blocked:ca.hidden_blocked,spec:ca.hidden_spec},running:vr,live_count:pl,slots:_l,over_cap:lf,failure:rl,waiting:ha,serial_lanes:Ws,serial_lane_count:$l,running_overlays:Tl,pr_wait:Un.map(m=>sy(m.bead_id,Jt.get(m.bead_id)||m.bead_id,Zr,pt[m.bead_id]||null,_n(p.attempts||{},m.bead_id),Fe[m.bead_id]||(fe.has(m.bead_id)||ge.has(m.bead_id)?{activity:null,merge_progress:{step:"merging"}}:null),js.get(m.bead_id)||null,m.external===!0,{position:ol.get(m.bead_id)||0,active:wr.active===m.bead_id,failure:of[m.bead_id]||null,waiting:ul?.bead_id===m.bead_id?ul.reason:null,resolution:al.get(m.bead_id),continuation_action:il.get(m.bead_id),head_review:ll.get(m.bead_id)||null,authority:cl.get(m.bead_id)||null},m.wt_present!==!1,p.auto_merge===!0?dl(m.bead_id):null,Hi(qs,rf(m.bead_id)),p.completion_status&&typeof p.completion_status=="object"&&!Array.isArray(p.completion_status)&&p.completion_status[m.bead_id]||null,p.discard_operations&&typeof p.discard_operations=="object"&&!Array.isArray(p.discard_operations)?p.discard_operations:{},Ns.get(el.get(m.bead_id)||"")?.worker_serial===!0,p.auto_merge===!0,{merge_sha:m.merge_sha,cleanup_cursor:m.cleanup_cursor,repo_operations:Array.isArray(p.repo_operations)?p.repo_operations:[]})).map(m=>({...m,workflow:jn[m.id]||null,priority:Sn.get(m.id),...tr(m.id)})),merge_queue_length:ma.length,merge_queue_running:ma.length>0,auto_excluded:Un.map(m=>m.bead_id).filter(m=>dl(m)!==null),declared_base:qs,done:Qr,token_total:pf,cleanup_failures:sn,repo_operations:Array.isArray(p.repo_operations)?p.repo_operations:[]}}function tt(){let y=!!o?.get()?.job,f=!y&&o?.isPending?.()===!0,C=y?"\uBD84\uC11D \uC911":f?"\uC900\uBE44 \uC911":"";return l`<button
      type="button"
      class=${C?"worker-analysis-btn worker-analysis-btn--running":"worker-analysis-btn"}
      aria-busy=${C?"true":"false"}
      title="대기 이슈의 병렬 실행 가능성을 분석해 직렬 그룹을 제안합니다 (클릭할 때만 실행)"
    >
      ✳ 병렬성
      분석${C?l`<span class="worker-analysis-btn__badge">${C}</span>`:""}
    </button>`}function ot(p){let y=p.waiting.length>0?p.waiting[0].id:"\u2014",f=l`<button
      type="button"
      class="worker-play${p.queue.auto_advance?" is-active":""}"
    >
      ${p.queue.auto_advance?"\u23F8 \uC790\uB3D9\uD654 \uBA48\uCDA4":"\u25B6 \uC790\uB3D9\uD654"}
    </button>`,C=Gt(p),T=p.over_cap?l`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",le=l`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${p.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${p.pr_wait.length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${W()} 완료 <b>${p.done.length}</b></span
      >`,Ee=l`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${p.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${p.declared_base||"?"}</span
    >`,Ue=l`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${aa}
          step="1"
          .value=${String(p.slots)}
          title="동시에 실행할 세션 수 (최소 1 = 순차 실행)"
      /></label>
      <label
        class="worker-tgl worker-serial-lanes"
        title="고정 직렬 레인 수 (1~5). 축소 시 잘린 레인의 대기 항목은 병렬 대기로 돌아갑니다"
        >직렬 레인
        <select class="worker-serial-lane-count" aria-label="직렬 레인 수">
          ${Array.from({length:Cp},(vt,rn)=>rn+1).map(vt=>l`<option
                value=${String(vt)}
                ?selected=${p.serial_lane_count===vt}
              >
                ${vt}
              </option>`)}
        </select>
      </label>
      ${o?tt():""} `,Xe=ld({failure:p.failure}),Ze=ed(p.repo_operations,p.cleanup_failures);return ve?l`<div class="worker-ribbon">
          ${f} ${C}
          <div class="worker-kpi worker-kpi--ribbon">${T}${le}</div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${Ue}</div>
          <div class="worker-kpi">${Ee}</div>
        </div>
        ${Ze}${et.template()}${Xe}`:l`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${f}${C}${Ue}</div>
        <div class="worker-kpi">
          ${T}${le}${Ee}
          ${(Array.isArray(p.token_total)?p.token_total:p.token_total?[{label:p.token_total,tooltip:`${W()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(vt=>l`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${vt.tooltip}
                >${W()} 완료 · 누적 ${vt.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${y}</b></span
          >
        </div>
      </div>
      ${Ze}${et.template()}${Xe}`}function Ot(p){if(p.running.length===0&&p.pr_wait.length===0)return"";let y=p.running.some(f=>f.kind!=="session"&&!f.paused&&f.failed!==!0);return l`<section
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
      ${p.running.length>0?Ei(p.running,Date.now(),Se,p.running_overlays):""}
      ${p.pr_wait.map(f=>Kn(f))}
    </section>`}function gt(p){let y=p.candidate_hidden;return l`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${Q.show_blocked}
        />
        🔒 blocked${y.blocked>0?` ${y.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${Mb.map(f=>l`<button
              type="button"
              class="worker-filter__chip${Q.spec===f.value?" is-active":""}"
              data-spec=${f.value}
              aria-pressed=${Q.spec===f.value?"true":"false"}
            >
              ${f.label}
            </button>`)}
        ${y.spec>0?l`<span class="worker-filter__hidden">숨김 ${y.spec}</span>`:""}
      </div>
    </div>`}function dn(){return l`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${q}
    >
      ${Db.map(p=>l`<option value=${p.value} ?selected=${q===p.value}>
            ${p.label}
          </option>`)}
    </select>`}function Bt(){return l`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${G}
      >
        ${Wn.map(p=>l`<option value=${p.value} ?selected=${G===p.value}>
              ${p.label}
            </option>`)}
      </select>
    </div>`}function Dt(p){let y=l`<span
      class="worker-lane__badge${p.occupied?" worker-lane__badge--held":""}"
      >${p.badge}</span
    >`,f=p.cycle?l`<div class="worker-lane__cycle">
          ⚠ blocks 순환 감지 — 자동 정렬을 생략했습니다
        </div>`:"";return gn({id:`worker-pane-lane-${p.id}`,lane:p.id,title:`\uC9C1\uB82C ${p.index}`,items:p.rows,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uD589\uC744 \uC5EC\uAE30\uB85C \uB4DC\uB798\uADF8",header_control:y,controls:f})}function Gt(p){let y=p.queue.auto_merge===!0;if(p.merge_queue_running)return l`<button
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
      </button>`;let f=new Set(p.auto_excluded),C=p.pr_wait.filter(T=>T.merge_action&&T.merge_enabled&&!f.has(T.id)).length;return l`<button
      type="button"
      class="worker-merge-all"
      title="켜 두면 자격이 생기는 PR을 계속 큐에 넣어 순서대로 충돌 해소·머지합니다"
    >
      ▶ 자동 머지${C>0?` ${C}`:""}
    </button>`}function qt(p){let y=gn({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:p.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:dn(),controls:gt(p),place_menu:st(p.candidates),onOpenDoc:d?(f,C)=>d(C):void 0});return ve?l`<div class="worker-lanes worker-lanes--mobile">
        ${Ot(p)}
        ${gn({id:"worker-pane-queue",lane:"queue",title:"\uBCD1\uB82C \uB300\uAE30",items:p.waiting,empty:"\uB4DC\uB798\uADF8 \uB610\uB294 [\uB300\uAE30\uB85C \u21B4]\uB85C \uBC30\uCE58",collapsible:!0,collapsed:B.queue,preview:Lp(p.waiting)})}
        ${p.serial_lanes.map(f=>Dt(f))}
        ${y}
        ${gn({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:p.done,empty:`${W()} \uC644\uB8CC \uC5C6\uC74C`,controls:Bt(),collapsible:!0,collapsed:B.done,preview:Array.isArray(p.token_total)?p.token_total.map(f=>f.label).join(" \xB7 "):p.token_total||Lp(p.done)})}
      </div>`:l`<div class="worker-lanes">
      ${y}
      <div class="worker-wait">
        ${gn({id:"worker-pane-queue",lane:"queue",title:"\uBCD1\uB82C \uB300\uAE30",items:p.waiting,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58"})}
        ${p.serial_lanes.map(f=>Dt(f))}
      </div>
      ${gn({id:"worker-pane-running",lane:"running",title:`\uC2E4\uD589 \uC911 \xB7 \uC2AC\uB86F ${p.slots}`,items:p.running,live:p.running.some(f=>f.kind!=="session"&&!f.paused&&f.failed!==!0),body:Ei(p.running,Date.now(),Se,p.running_overlays)})}
      ${gn({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:p.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C"})}
      ${gn({id:"worker-pane-done",lane:"done",title:`\uC644\uB8CC \xB7 ${W()} ${p.done.length}`,items:p.done,empty:`${W()} \uC644\uB8CC \uC5C6\uC74C`,controls:Bt()})}
    </div>`}function Pt(p){B={...B,[p]:!B[p]},Wb(B),We()}function We(){let p=_t();Qe(ot(p),we),Qe(qt(p),$e)}function Xt(){if(typeof window.matchMedia!="function")return;let p=window.matchMedia(Bb);ve=!!p.matches;let y=f=>{let C=!!(f&&typeof f.matches=="boolean"?f.matches:p.matches);C!==ve&&(ve=C,We())};typeof p.addEventListener=="function"?(p.addEventListener("change",y),te.push(()=>p.removeEventListener("change",y))):typeof p.addListener=="function"&&(p.addListener(y),te.push(()=>p.removeListener(y)))}let Vt=null;function at(p){Vt=p.target instanceof Element?p.target:null}function Pe(p){let f=p.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!f)return;if(Vt&&f.contains(Vt)&&Vt.closest("input, button, a")){p.preventDefault();return}let C=f.dataset.beadId||"",T=f.dataset.lane||"";P={bead_id:C,from_lane:T};try{p.dataTransfer?.setData("text/plain",C),p.dataTransfer&&(p.dataTransfer.effectAllowed="move")}catch{}}function O(p){let y=p.target?.closest?.(".worker-pane");if(!y)return;let f=y.dataset.lane||"";f!=="candidate"&&f!=="queue"&&!/^s[1-5]$/.test(f)||(p.preventDefault(),p.dataTransfer&&(p.dataTransfer.dropEffect="move"),y.classList.add("worker-pane--drag-over"))}function pe(p){p.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function Le(p,y){let f=z.find(Ee=>Ee.id===p);if(!f)return;let C=z.filter(Ee=>Ee.id!==p),T=C.length;if(y){let Ee=y.dataset.beadId;if(Ee===p)return;let Ue=C.findIndex(Xe=>Xe.id===Ee);Ue>=0&&(T=Ue)}let le=C.slice();le.splice(T,0,f),$.applyReorder(p,le,T)}function ct(p){let y=p.target?.closest?.(".worker-pane");if(!y)return;p.preventDefault(),y.classList.remove("worker-pane--drag-over");let f=y.dataset.lane||"",C=P?.bead_id||p.dataTransfer?.getData("text/plain")||"",T=P?.from_lane||"";if(P=null,!C)return;let le=p.target?.closest?.(".worker-mini, .worker-card"),Ee=Array.from(y.querySelectorAll(".worker-mini, .worker-card")),Ue=Ee.length;if(le){let Xe=Ee.indexOf(le);Xe>=0&&(Ue=Xe)}if(Ue=Math.max(0,Ue-y.querySelectorAll(".worker-mini--ghost").length),y.classList.contains("worker-pane--collapsed")&&(Ue=dt()),f==="candidate"){if(T==="candidate"){Le(C,le);return}(T==="queue"||/^s[1-5]$/.test(T))&&ft(C);return}if(f==="queue"||/^s[1-5]$/.test(f)){let Xe=f==="queue"?"parallel":f;T===f?bt(C,Xe,Ue):ht(C,Xe)}}function St(p){Q=p,Ib(p),We()}function yt(p){q=p==="board"||p==="created"||p==="spec"?p:ia,qb(q),We()}function v(p){G=fn(p)?p:on,jb(G),h?.(G),We()}function b(p){let y=p.target?.closest?.(".worker-serial-lane-count");if(y){let Ue=Number.parseInt(y.value,10);Number.isFinite(Ue)&&j(Ue).then(We);return}let f=p.target?.closest?.(".worker-filter__blocked");if(f){St({...Q,show_blocked:f.checked});return}let C=p.target?.closest?.(".worker-done-range");if(C){v(C.value);return}let T=p.target?.closest?.(".worker-sort");if(T){yt(T.value||ia);return}let le=p.target?.closest?.(".worker-slots__input");if(!le)return;let Ee=Number.parseInt(le.value,10);if(!Number.isFinite(Ee)){We();return}k(Ee).then(We)}function x(p){return p?{runner:p.runner||void 0,model:p.model||void 0,effort:p.effort||void 0,worktree:p.worktree||void 0,status:p.status||void 0,session_id:p.session_id||void 0}:{}}function D(){let p=_t();return{operations:p.repo_operations,cleanup_failures:p.cleanup_failures,repo:u&&u()||""}}function J(){Se&&qe.close(),me.hidden=!1,Je.hidden=!1,K.open(D()),We()}function he(p){let y=De(),f=y.attempts?y.attempts[p]:null;Se=p,Ge=null,K.close(),me.hidden=!0,Je.hidden=!1,qe.open({attempt_id:p,meta:x(f)}),We()}function Ie(p,y){Se=null,Ge=p,K.close(),me.hidden=!0,Je.hidden=!1,qe.open({attempt_id:p,meta:y,hide_prompt:!0}),We()}function rt(){if(K.isOpen()&&K.refresh(D()),Ge){let f=(o?.get()?.runs||[]).find(C=>C.run_id===Ge);f?qe.updateMeta(Ui(f)):qe.close();return}if(!Se)return;let p=De(),y=p.attempts?p.attempts[Se]:null;if(y){qe.updateMeta(x(y));return}qe.close()}function A(p){let y=p.target;if(y?.closest?.(".worker-mini__serial, .worker-mini__grip")||y?.closest?.("#worker-parallel-analysis-dialog"))return;let f=y?.closest?.(".mon-overlap__chip");if(f){let Fe=f.closest("[data-bead-id]"),pt=Fe&&Fe.getAttribute("data-bead-id")||"";if(pt){let sn=f.getAttribute("data-overlap-all")==="true"?null:f.getAttribute("data-overlap-id")||"";N=!!N&&N.bead_id===pt&&N.counterpart_id===sn?null:{bead_id:pt,counterpart_id:sn},We()}return}let C=y?.closest?.(".mon-overlap__place");if(C){let Fe=C.closest("[data-bead-id]"),pt=Fe&&Fe.getAttribute("data-bead-id")||"";pt&&_e(pt,C.getAttribute("data-counterpart-id")||"");return}if(y?.closest?.(".mon-overlap__popover"))return;if(y?.closest?.(".worker-analysis-btn")){Ve?.open();return}if(y?.closest?.(".worker-repo-strip")||y?.closest?.(".worker-mini__timeline")){J();return}let T=y?.closest?.(".worker-repo-op__session");if(T){let Fe=T.dataset.attemptId;Fe&&he(Fe);return}let le=y?.closest?.(".worker-repo-op__resolve");if(le){S(le.dataset.operationId||"");return}let Ee=y?.closest?.(".worker-repo-op__dismiss");if(Ee){g(Ee.dataset.operationId||"");return}let Ue=y?.closest?.(".worker-cleanup__resume");if(Ue){let Fe=Ue.dataset.beadId;Fe&&L(Fe);return}let Xe=y?.closest?.(".worker-banner__resume");if(Xe){let Fe=Xe.dataset.attemptId;Fe&&Rt(Fe);return}let Ze=y?.closest?.(".worker-banner__discard");if(Ze){let Fe=Ze.dataset.confirmation==="merged"?"merged":"unmerged";He(Ze.dataset.beadId||"",Ze.dataset.attemptId||null,Fe,Ze.dataset.operationId||null);return}let vt=y?.closest?.(".worker-banner__dismiss");if(vt){let Fe=vt.dataset.attemptId;Fe&&$t(Fe);return}if(y?.closest?.(".worker-play")){Oe(!De().auto_advance);return}let rn=y?.closest?.(".worker-merge-all");if(rn){rn.classList.contains("worker-merge-all--stop")?De().auto_merge===!0?Y(!1):xe():Y(!0);return}let Vr=y?.closest?.(".worker-pane__hd--toggle");if(Vr){let Fe=Vr.dataset.lane;(Fe==="queue"||Fe==="done")&&Pt(Fe);return}let gr=y?.closest?.(".worker-card__place-lane");if(gr){let Fe=gr.dataset.beadId,pt=gr.dataset.lane;Fe&&(pt==="parallel"||/^s[1-5]$/.test(pt||""))&&(ae=null,We(),ht(Fe,pt));return}if(y?.closest?.(".worker-card__place-cancel")){ae=null,We();return}let Jt=y?.closest?.(".worker-card__place");if(Jt){let Fe=Jt.dataset.beadId;Fe&&!Jt.disabled&&(Ke()?(ae=Fe,We()):ht(Fe,"parallel"));return}let Kr=y?.closest?.(".worker-filter__chip");if(Kr){let Fe=Kr.dataset.spec;(Fe==="all"||Fe==="with"||Fe==="without")&&St({...Q,spec:Fe});return}let Sn=y?.closest?.(".worker-mini__merge");if(Sn){let Fe=Sn.dataset.beadId||"";De().cleanup_failed?.[Fe]?L(Fe):Ye(Fe);return}let Ps=y?.closest?.(".worker-mini__merge-cancel");if(Ps){ne(Ps.dataset.beadId||"");return}let er=y?.closest?.(".worker-mini__discard");if(er){He(er.dataset.beadId||"",er.dataset.attemptId||null,er.dataset.discardMode==="merged"?"merged":"unmerged",er.dataset.operationId||null);return}let jn=y?.closest?.(".worker-mini__stale-continue");if(jn){Z("worker-stale-work-continue",jn.dataset.beadId||"",jn.dataset.actionId||"");return}let Bn=y?.closest?.(".worker-mini__stale-backup");if(Bn){Z("worker-stale-work-backup-fresh",Bn.dataset.beadId||"",Bn.dataset.actionId||"");return}let hr=y?.closest?.(".worker-mini__stale-recheck");if(hr){Z("worker-stale-work-recheck",hr.dataset.beadId||"",hr.dataset.actionId||"");return}let Yr=y?.closest?.(".worker-mini__revise-fix");if(Yr){ee("worker-revise-fix",Yr.dataset.beadId||"");return}let Ms=y?.closest?.(".worker-mini__revise-approve");if(Ms){ee("worker-revise-approve",Ms.dataset.beadId||"");return}if(y?.closest?.(".worker-mini__pr"))return;if(y?.closest?.(".rtile__discard")){let Fe=y?.closest?.(".rtile"),pt=Fe?.dataset?.beadId,sn=Fe?.dataset?.attemptId;pt&&He(pt,sn||null,"unmerged",y?.closest?.(".rtile__discard")?.dataset.operationId||null);return}if(y?.closest?.(".rtile__dismiss")){let pt=y?.closest?.(".rtile")?.dataset?.attemptId;pt&&$t(pt);return}if(y?.closest?.(".rtile__pause")){let pt=y?.closest?.(".rtile")?.dataset?.attemptId;pt&&kt(pt);return}if(y?.closest?.(".rtile__resume")){let pt=y?.closest?.(".rtile")?.dataset?.attemptId;pt&&Rt(pt);return}if(y?.closest?.(".rtile__session")){let pt=y?.closest?.(".rtile")?.dataset?.attemptId;pt&&he(pt);return}if(y?.closest?.(".worker-drawer-overlay__backdrop")){K.close(),qe.close();return}if(y?.closest?.(".worker-drawer-host"))return;let br=y?.closest?.(".rtile .board-card__roll-toggle");if(br){let Fe=br.dataset.rollParent;Fe&&(Re.has(Fe)?Re.delete(Fe):Re.add(Fe),We());return}let tr=y?.closest?.(".rtile .board-card__roll-child");if(tr){let Fe=tr.dataset.childId;Fe&&c&&c(Fe);return}let Un=y?.closest?.(".rtile");if(Un){if(y?.closest?.(".rtile__id")){let pt=Un.dataset.beadId;pt&&ln(pt).then(sn=>{sn?ue("\uBCF5\uC0AC\uB428","success",1200):ue("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let Fe=Un.dataset.beadId;Fe&&c&&c(Fe);return}let Zr=y?.closest?.(".worker-mini, .worker-card");if(Zr){let Fe=Zr.dataset.beadId;if(y?.closest?.(".worker-mini__id, .worker-card__id")){Fe&&ln(Fe).then(sn=>{sn?ue("\uBCF5\uC0AC\uB428","success",1200):ue("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let pt=y?.closest?.(".ctl-chip--from");if(pt){let sn=pt.dataset.fromId;sn&&c&&c(sn);return}Fe&&c&&c(Fe)}}e.addEventListener("pointerdown",at),e.addEventListener("dragstart",Pe),e.addEventListener("dragover",O),e.addEventListener("dragleave",pe),e.addEventListener("drop",ct),e.addEventListener("click",A),e.addEventListener("change",b);function R(p){if(!N)return;let y=p.target;y&&typeof y.closest=="function"&&y.closest(".mon-overlap__popover, .mon-overlap__chip")||(N=null,We())}function Ce(p){p.key!=="Escape"||!N||(N=null,We())}return document.addEventListener("click",R),document.addEventListener("keydown",Ce),te.push(()=>{document.removeEventListener("click",R),document.removeEventListener("keydown",Ce)}),Xt(),w&&te.push(w.subscribe(()=>{for(let[p,y]of E)y==="failed"&&E.delete(p);We()})),s&&te.push(s.subscribe(()=>{let p=u&&u()||"";p!==Me&&(Me=p,X.close()),We(),rt()})),o&&typeof o.subscribe=="function"&&te.push(o.subscribe(()=>{rt(),We()})),We(),{load(){ke(),We()},refreshSessionDefaults:be,destroy(){for(let p of te.splice(0))try{p()}catch{}e.removeEventListener("pointerdown",at),e.removeEventListener("dragstart",Pe),e.removeEventListener("dragover",O),e.removeEventListener("dragleave",pe),e.removeEventListener("drop",ct),e.removeEventListener("click",A),e.removeEventListener("change",b);try{qe.destroy()}catch{}Je.hidden=!0;try{Ve?.destroy()}catch{}try{X.destroy()}catch{}Qe(l``,e)}}}function Vi(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function Fp(e,t,n,r=async()=>{},s=async()=>{}){let o=Lt("views:workspace-picker"),a=null,i=!1,c=!1,u=!1;async function d(G){let W=G.target.value,ve=t.getState().workspace?.current?.path||"";if(W&&W!==ve){o("switching workspace to %s",W),i=!0,q();try{await n(W)}catch(fe){o("workspace switch failed: %o",fe)}finally{i=!1,q()}}}async function _(){let G=t.getState(),E=G.workspace?.current?.path||G.workspace?.available?.[0]?.path||"";if(!(!E||c)){o("git-pulling workspace %s",E),c=!0,q();try{await r(E)}catch(W){o("workspace git pull failed: %o",W)}finally{c=!1,q()}}}function h(G){let E=G.target;E&&e.contains(E)||P()}function w(G){G.key==="Escape"&&P()}function $(){u||(u=!0,document.addEventListener("mousedown",h),document.addEventListener("keydown",w),q())}function P(){u&&(u=!1,document.removeEventListener("mousedown",h),document.removeEventListener("keydown",w),q())}function z(){u?P():$()}async function Q(G){let E=G.target,W=E.value,B=E.checked;o("toggling visibility %s \u2192 %s",W,String(B));try{await s(W,B)}catch(ve){o("workspace visibility toggle failed: %o",ve)}}function ae(G){return G?l`
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
    `:l``}function N(G,E){return l`
      <div class="workspace-picker__manage">
        <button
          type="button"
          class="workspace-picker__manage-button"
          @click=${z}
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
                ${G.map(W=>l`
                    <label
                      class="workspace-picker__manage-row"
                      title="${W.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${W.path}"
                        .checked=${!E.has(W.path)}
                        @change=${Q}
                      />
                      <span class="workspace-picker__manage-name"
                        >${Vi(W.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function M(){let G=t.getState(),E=G.workspace?.current,W=G.workspace?.available||[],B=new Set(G.workspace?.hidden||[]),ve=E?.path||W[0]?.path||"";if(W.length===0)return l``;let fe=W.filter(ge=>!B.has(ge.path)||ge.path===ve);if(fe.length<=1){let ge=fe[0]||W[0],V=Vi(ge.path);return l`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${ge.path}"
            >${V}</span
          >
          ${N(W,B)}
          ${ae(ve)}
          ${c?l`<span
                class="workspace-picker__loading"
                aria-hidden="true"
              ></span>`:""}
        </div>
      `}return l`
      <div class="workspace-picker">
        <select
          class="workspace-picker__select"
          @change=${d}
          ?disabled=${i||c}
          aria-label="Select project workspace"
        >
          ${fe.map(ge=>l`
              <option
                value="${ge.path}"
                ?selected=${ge.path===ve}
                title="${ge.path}"
              >
                ${Vi(ge.path)}
              </option>
            `)}
        </select>
        ${N(W,B)}
        ${ae(ve)}
        ${i||c?l`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function q(){Qe(M(),e)}return q(),a=t.subscribe(()=>q()),{destroy(){a&&(a(),a=null),document.removeEventListener("mousedown",h),document.removeEventListener("keydown",w),Qe(l``,e)}}}var jp=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","get-session-defaults","set-session-defaults","get-workspace-accounts","set-workspace-accounts","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-automation-toggle","worker-auto-repair-toggle","worker-repo-ops-opt-out-toggle","worker-repo-operation-repair","worker-repo-operation-dismiss","worker-queue-set-slots","worker-queue-set-serial-lane-count","subscribe-worker-parallel-analysis","unsubscribe-worker-parallel-analysis","worker-parallel-analysis-snapshot","worker-parallel-analysis-targets","worker-parallel-analysis-prompt","worker-parallel-analysis-start","worker-parallel-analysis-cancel","worker-parallel-analysis-settings-update","worker-parallel-analysis-submit","worker-queue-set-orchestration-defaults","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-cleanup-retry","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-stale-work-continue","worker-stale-work-backup-fresh","worker-stale-work-recheck","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-worker-system-prompt","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-impl-presets","unsubscribe-impl-presets","impl-presets-snapshot","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","monitor-auto-toggle"];function Ki(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function Bp(e,t,n=Ki()){return{id:n,type:e,payload:t}}function Up(e={}){let t=Lt("ws"),n={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},r=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",a=0,i=null,c=!0,u=new Map,d=[],_=new Map,h=new Set;function w(M){for(let q of Array.from(h))try{q(M)}catch{}}function $(){if(!c||i)return;o="reconnecting",t("ws reconnecting\u2026"),w(o);let M=Math.min(n.maxMs||0,(n.initialMs||0)*Math.pow(n.factor||1,a)),q=(n.jitterRatio||0)*M,G=Math.max(0,Math.round(M+(Math.random()*2-1)*q));t("ws retry in %d ms (attempt %d)",G,a+1),i=setTimeout(()=>{i=null,N()},G)}function P(M){try{s?.send(JSON.stringify(M))}catch(q){t("ws send failed",q)}}function z(){for(o="open",t("ws open"),w(o),a=0;d.length;){let M=d.shift();M&&P(M)}}function Q(M){let q;try{q=JSON.parse(String(M.data))}catch{t("ws received non-JSON message");return}if(!q||typeof q.id!="string"||typeof q.type!="string"){t("ws received invalid envelope");return}if(u.has(q.id)){let E=u.get(q.id);u.delete(q.id),q.ok?E?.resolve(q.payload):E?.reject(q.error||new Error("ws error"));return}let G=_.get(q.type);if(G&&G.size>0)for(let E of Array.from(G))try{E(q.payload)}catch(W){t("ws event handler error",W)}else t("ws received unhandled message type: %s",q.type)}function ae(){o="closed",t("ws closed"),w(o);for(let[M,q]of u.entries())q.reject(new Error("ws disconnected")),u.delete(M);a+=1,$()}function N(){if(!c)return;let M=r();try{s=new WebSocket(M),t("ws connecting %s",M),o="connecting",w(o),s.addEventListener("open",z),s.addEventListener("message",Q),s.addEventListener("error",()=>{}),s.addEventListener("close",ae)}catch(q){t("ws connect failed %o",q),$()}}return N(),{send(M,q){if(!jp.includes(M))return Promise.reject(new Error(`unknown message type: ${M}`));let G=Ki(),E=Bp(M,q,G);return t("send %s id=%s",M,G),new Promise((W,B)=>{u.set(G,{resolve:W,reject:B,type:M}),s&&s.readyState===s.OPEN?P(E):(t("queue %s id=%s (state=%s)",M,G,o),d.push(E))})},on(M,q){_.has(M)||_.set(M,new Set);let G=_.get(M);return G?.add(q),()=>{G?.delete(q)}},onConnection(M){return h.add(M),()=>{h.delete(M)}},reconnect(){c=!0,i&&(clearTimeout(i),i=null),a=0,N()},close(){c=!1,i&&(clearTimeout(i),i=null);try{s?.close()}catch{}},getState(){return o}}}function oy(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function ay(e,t){try{let r=await(await fetch("/api/config")).json();e.setState({config:r})}catch(n){t("config refresh failed",n)}}var Yi=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],Wp=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"],["tab:worker:resolved","resolved-issues"],["tab:worker:closed","closed-issues"]],Xn="tab:worker:closed",iy="bdui.worker.done-range",zp=Gd,Hp="worker:queue",Gp="worker:parallel-analysis",Vp="ui:order",Kp="ui:display-policy",Yp="exec:presets",Jn="tab:board:closed",Zp="beads-ui.board.closed-range";function ly(e){let t=Lt("main");t("bootstrap start");let n=l`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;Qe(n,e);let r=document.getElementById("global-nav"),s=document.getElementById("top-nav"),o=document.getElementById("repo-scope"),a=document.getElementById("usage-meter"),i=document.getElementById("board-root"),c=document.getElementById("worker-root"),u=document.getElementById("monitor-root"),d=document.getElementById("detail-panel");if(a&&pp(a),i&&c&&u&&d){let ce=function(A,R){let Ce="Request failed",p="";if(A&&typeof A=="object"){let f=A;if(typeof f.message=="string"&&f.message.length>0&&(Ce=f.message),typeof f.details=="string")p=f.details;else if(f.details&&typeof f.details=="object")try{p=JSON.stringify(f.details,null,2)}catch{p=""}}else typeof A=="string"&&A.length>0&&(Ce=A);let y=R&&R.length>0?`Failed to load ${R}`:"Request failed";te.open(y,Ce,p)},st=function(A){return`${at.getState().workspace.current?.path||""}\0${A}`},Ne=function(){qe&&(qe().catch(()=>{}),qe=null),K=null,X=null},dt=function(A){Me=A;let R=()=>{Me!==A||at.getState().selected_id!==A||(Me=null,Be(A))};if(!De){Ve.then(R);return}R()},kt=function(A,R,Ce,p,y){return Ce!==ft[R]?(y().catch(()=>{}),!1):(A.set(p,y),!0)},$t=function(){let A=at.getState();Y(A.view==="board"),Oe(A.view==="worker"),se(A.view==="monitor"),g(A.view==="board"||A.view==="worker"||Rt||!!A.selected_id)},L=function(){let A=ir(xt);return A===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:A}}},U=function(){let A=ir(Ye);return A===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:A}}},Y=function(A){if(A)for(let[R,Ce]of Yi){if(ht.has(R)||bt.has(R))continue;let p=R===Jn?L():{type:Ce};try{we.register(R,p)}catch(C){t("register %s store failed: %o",R,C)}bt.add(R);let y=ft.board,f=!1;je.subscribeList(R,p).then(C=>{f=!kt(ht,"board",y,R,C)}).catch(C=>{t("subscribe %s failed: %o",R,C),ce(C,"board")}).finally(()=>{bt.delete(R),f&&$t()})}else He()},He=function(){ft.board+=1;for(let[A]of Yi){let R=ht.get(A);R&&(R().catch(()=>{}),ht.delete(A));try{we.unregister(A)}catch(Ce){t("unregister %s failed: %o",A,Ce)}}},Oe=function(A){if(!A){S();return}for(let[R,Ce]of Wp){if(Z.has(R)||bt.has(R))continue;let p=R===Xn?U():{type:Ce};try{we.register(R,p)}catch(C){t("register %s store failed: %o",R,C)}bt.add(R);let y=ft.worker,f=!1;je.subscribeList(R,p).then(C=>{f=!kt(Z,"worker",y,R,C)}).catch(C=>{t("subscribe %s failed: %o",R,C),ce(C,"worker")}).finally(()=>{bt.delete(R),f&&$t()})}},S=function(){ft.worker+=1;for(let[A]of Wp){let R=Z.get(A);R&&(R().catch(()=>{}),Z.delete(A));try{we.unregister(A)}catch(Ce){t("unregister %s failed: %o",A,Ce)}}},g=function(A){if(!A){k();return}ee||(be("subscribe-worker-queue",{id:Hp}).catch(R=>{t("subscribe-worker-queue failed: %o",R)}),be("subscribe-worker-parallel-analysis",{id:Gp}).catch(R=>{t("subscribe-worker-parallel-analysis failed: %o",R)}),ee=()=>(be("unsubscribe-worker-parallel-analysis",{id:Gp}),be("unsubscribe-worker-queue",{id:Hp})))},k=function(){ee&&(ee().catch(()=>{}),ee=null),it.clear()},se=function(A){if(!A){re();return}j||(be("subscribe-monitor-pipeline",{id:zp}).catch(R=>{t("subscribe-monitor-pipeline failed: %o",R)}),j=()=>be("unsubscribe-monitor-pipeline",{id:zp}))},re=function(){j&&(j().catch(()=>{}),j=null)},_e=function(){ye||(be("subscribe-ui-order",{id:Vp}).catch(A=>{t("subscribe-ui-order failed: %o",A)}),ye=()=>be("unsubscribe-ui-order",{id:Vp}))},nt=function(){ye&&(ye().catch(()=>{}),ye=null),me.clear()},tt=function(){_t||(be("subscribe-display-policy",{id:Kp}).catch(A=>{t("subscribe-display-policy failed: %o",A)}),_t=()=>be("unsubscribe-display-policy",{id:Kp}))},ot=function(){_t&&(_t().catch(()=>{}),_t=null),$e.clear()},gt=function(){Ot||(be("subscribe-impl-presets",{id:Yp}).catch(A=>{t("subscribe-impl-presets failed: %o",A)}),Ot=()=>be("unsubscribe-impl-presets",{id:Yp}))},Pt=function(A){if(!A)return"Unknown";let R=A.split("/").filter(Boolean);return R.length>0?R[R.length-1]:"Unknown"},b=function(A,R){v.open(A.path,{missing_state:A.missing_state,...R?{workspace:R}:{}})};var _=ce,h=st,w=Ne,$=dt,P=kt,z=$t,Q=L,ae=U,N=Y,M=He,q=Oe,G=S,E=g,W=k,B=se,ve=re,fe=_e,ge=nt,V=tt,Te=ot,Re=gt,ie=Pt,de=b;let Ae=document.getElementById("header-loading"),H=fc(Ae),te=Ju(e),ke=Up(),be=H.wrapSend((A,R)=>ke.send(A,R)),je=oc(be),we=ac(),Je=cc(),it=lc(),I=zl(),me=ic(),$e=Ul(),Se=Wl(),Ge=Hl();ke.on("impl-presets-snapshot",A=>{let R=A;R&&typeof R.revision=="number"&&Array.isArray(R.presets)&&Se.set({revision:R.revision,presets:R.presets})}),ke.on("monitor-pipeline-snapshot",A=>{let R=A;if(!(!R||!Array.isArray(R.workspaces)))try{I.set(R.workspaces,R.workspaces_state)}catch{}}),ke.on("ui-order-snapshot",A=>{let R=A;if(R&&typeof R.revision=="number")try{me.set({revision:R.revision,order:R.order&&typeof R.order=="object"?R.order:{}})}catch{}}),ke.on("display-policy-snapshot",A=>{let R=A;if(R&&R.policy&&typeof R.policy=="object")try{$e.set(R.policy)}catch{}}),ke.on("session-log-snapshot",A=>{let R=A;if(R&&typeof R.id=="string")try{Ge.set(R.id,Array.isArray(R.lines)?R.lines:[],typeof R.last_event_at=="number"?R.last_event_at:null)}catch{}}),ke.on("session-log-append",A=>{let R=A;if(R&&typeof R.id=="string")try{Ge.append(R.id,R.event)}catch{}}),ke.on("snapshot",A=>{let R=A,Ce=R&&typeof R.id=="string"?R.id:"",p=Ce?we.getStore(Ce):null;if(p&&R&&R.type==="snapshot")try{p.applyPush(R)}catch{}}),ke.on("upsert",A=>{let R=A,Ce=R&&typeof R.id=="string"?R.id:"",p=Ce?we.getStore(Ce):null;if(p&&R&&R.type==="upsert")try{p.applyPush(R)}catch{}}),ke.on("delete",A=>{let R=A,Ce=R&&typeof R.id=="string"?R.id:"",p=Ce?we.getStore(Ce):null;if(p&&R&&R.type==="delete")try{p.applyPush(R)}catch{}});let qe=null,K=null,X=null,Me=null,et=()=>{},Ve=new Promise(A=>{et=()=>A(void 0)}),De=!1,Ke=!1;async function Be(A){let R=st(A);if(R===K||R===X)return;X=R;let Ce=`detail:${A}`,p={type:"issue-detail",params:{id:A}};try{we.register(Ce,p)}catch(y){t("register detail store failed: %o",y)}try{let y=await je.subscribeList(Ce,p);if(at.getState().selected_id!==A||st(A)!==R){await y().catch(()=>{});return}qe&&await qe().catch(()=>{}),qe=y,K=R}catch(y){t("detail subscribe failed: %o",y),ce(y,"issue details")}finally{X===R&&(X=null)}}let ht=new Map,bt=new Set,ft={board:0,worker:0},Rt=!1,xt=on;try{let A=window.localStorage.getItem(Zp);fn(A)&&(xt=A)}catch{}let Ye=on;try{let A=window.localStorage.getItem(iy);fn(A)&&(Ye=A)}catch{}async function ne(A){if(!fn(A)||A===xt)return;xt=A;try{window.localStorage.setItem(Zp,A)}catch{}let R=ht.get(Jn);if(!R)return;ht.delete(Jn),await R().catch(()=>{});let Ce=L();try{we.register(Jn,Ce)}catch(p){t("register %s store failed: %o",Jn,p)}try{let p=await je.subscribeList(Jn,Ce);ht.set(Jn,p)}catch(p){t("re-subscribe %s failed: %o",Jn,p),ce(p,"board")}}async function xe(A){if(!fn(A)||A===Ye)return;Ye=A;let R=Z.get(Xn);if(!R)return;Z.delete(Xn),await R().catch(()=>{});let Ce=U();try{we.register(Xn,Ce)}catch(p){t("register %s store failed: %o",Xn,p)}try{let p=await je.subscribeList(Xn,Ce);Z.set(Xn,p)}catch(p){t("re-subscribe %s failed: %o",Xn,p),ce(p,"worker")}}let Z=new Map,ee=null,j=null,ye=null,_t=null,Ot=null;async function dn(){_t=null,$e.clear(),Ot=null,Se.clear(),ee=null,j=null,ht.clear(),Z.clear(),ft.board+=1,ft.worker+=1,gt();let A=at.getState().workspace.current?.path;if(A)try{await ke.send("set-workspace",{path:A})}catch(Ce){t("workspace restore after reconnect failed: %o",Ce);return}tt();let R=at.getState();Y(R.view==="board"),Oe(R.view==="worker"),se(R.view==="monitor"),g(R.view==="board"||R.view==="worker"||!!R.selected_id)}async function Bt(){t("clearing all subscriptions for workspace switch"),He(),S(),k(),Je.clear(),nt(),_e(),ot(),tt(),Ne();let A=at.getState();if(A.selected_id)try{we.unregister(`detail:${A.selected_id}`)}catch{}let R=at.getState();Y(R.view==="board"),Oe(R.view==="worker"),se(R.view==="monitor"),g(R.view==="board"||R.view==="worker"||!!R.selected_id),R.selected_id&&dt(R.selected_id)}async function Dt(A){t("requesting workspace switch to %s",A),Ke=!0;try{let R=await ke.send("set-workspace",{path:A});t("workspace switch result: %o",R),R&&R.workspace&&(at.setState({workspace:{current:{path:R.workspace.root_dir,database:R.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",A),R.changed&&(await Bt(),ue("Switched to "+Pt(A),"success",2e3)))}catch(R){throw t("workspace switch failed: %o",R),ue("Failed to switch workspace","error",3e3),R}finally{Ke=!1}}async function Gt(A){t("requesting workspace git pull for %s",A);try{let R=await ke.send("git-pull-workspace",{});t("workspace git pull result: %o",R);let Ce=R?.status;if(Ce==="up_to_date"){ue("Already up to date","success",2e3);return}if(Ce==="stash_pop_conflict"){ue("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}ue("Git pulled "+Pt(A),"success",2e3)}catch(R){t("workspace git pull failed: %o",R);let Ce=R?.code,p=R?.message;if(Ce==="rebase_conflict"){ue("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(Ce==="rebase_conflict_abort_failed"){ue("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(Ce==="busy"){ue("Git pull skipped: another operation is running","warning",3e3);return}let y=p?`: ${p}`:"";throw ue(`Git pull failed${y}`,"error",3e3),R}}async function qt(A,R){t("setting workspace visibility %s \u2192 %s",A,String(R));try{await ke.send("set-workspace-visibility",{path:A,visible:R}),await We()}catch(Ce){t("workspace visibility update failed: %o",Ce),ue("Failed to update project visibility","error",3e3)}}async function We(){try{let A=await ke.send("list-workspaces",{});if(t("workspaces loaded: %o",A),A&&Array.isArray(A.workspaces)){let R=A.workspaces.map(f=>({path:f.path,database:f.database,pid:f.pid,version:f.version})),Ce=A.current?{path:A.current.root_dir,database:A.current.db_path}:null,p=Array.isArray(A.hidden)?A.hidden.filter(f=>typeof f=="string"):[];at.setState({workspace:{current:Ce,available:R,hidden:p}});let y=window.localStorage.getItem("beads-ui.workspace");y&&(!R.some(C=>C.path===y)||p.includes(y)?window.localStorage.removeItem("beads-ui.workspace"):Ce&&y!==Ce.path&&(t("restoring saved workspace preference: %s",y),await Dt(y)))}}catch(A){t("failed to load workspaces: %o",A)}}ke.on("workspace-changed",A=>{t("workspace-changed event: %o",A),A&&A.root_dir&&(at.setState({workspace:{current:{path:A.root_dir,database:A.db_path}}}),We(),Bt())});let Xt=!1;if(typeof ke.onConnection=="function"){let A=R=>{t("ws state %s",R),R==="reconnecting"||R==="closed"?(Xt=!0,ue("Connection lost. Reconnecting\u2026","error",4e3)):R==="open"&&Xt&&(Xt=!1,ue("Reconnected","success",2200),ay(at,(Ce,p)=>{t(`${Ce}: %o`,p)}),dn())};ke.onConnection(A)}let Vt="board";try{let A=window.localStorage.getItem("beads-ui.view");(A==="board"||A==="worker"||A==="monitor")&&(Vt=A)}catch(A){t("view parse error: %o",A)}let at=pc({config:oy(),view:Vt});ke.on("worker-queue-snapshot",A=>{let R=A;if(!R||!R.queue)return;let Ce=at.getState().workspace.current?.path;if(typeof Ce=="string"&&Ce.length>0&&R.root_dir!==Ce){t("dropping worker-queue snapshot for %s",String(R.root_dir));return}try{Je.set(R.queue)}catch{}}),ke.on("worker-parallel-analysis-snapshot",A=>{let R=A;if(!R)return;let Ce=at.getState().workspace.current?.path;if(!(typeof Ce=="string"&&Ce.length>0&&typeof R.root_dir=="string"&&R.root_dir!==Ce))try{it.set({settings:R.settings,job:R.job??null,runs:Array.isArray(R.runs)?R.runs:[],last_good:R.last_good??null})}catch{}});let Pe=uc(at);Pe.start();let O=new Set(["get-comments","dep-add","dep-remove","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","get-session-defaults","set-session-defaults"]),pe=async(A,R)=>{try{return await be(A,R)}catch(Ce){if(O.has(A))throw Ce;return[]}};Kd({global_element:r,repo_element:s},at,Pe);let Le=document.getElementById("workspace-picker");Le&&Fp(Le,at,Dt,Gt,qt);let ct=Xd(e,(A,R)=>be(A,R));try{let A=document.getElementById("new-issue-btn");A&&A.addEventListener("click",()=>ct.open())}catch{}let St=np(e,{policyStore:$e,queueStore:Je,implPresetStore:Se,transport:(A,R)=>be(A,R),onOpenChange:A=>{let R=Rt;Rt=A,$t(),R&&A===!1&&D.refreshSessionDefaults()},labelOptions:()=>{let A=new Set;for(let[R]of Yi)for(let Ce of we.snapshotFor(R)||[]){let p=Ce.labels;if(Array.isArray(p))for(let y of p)typeof y=="string"&&y.length>0&&A.add(y)}return Array.from(A).sort()}});try{let A=document.getElementById("display-settings-btn");A&&(A.setAttribute("aria-label","\uC124\uC815"),A.setAttribute("title","\uC124\uC815"),A.addEventListener("click",()=>St.open()))}catch{}let yt=document.createElement("div");yt.className="md-viewer-root",document.body.appendChild(yt);let v=jo(yt,{getWorkspacePath:()=>at.getState().workspace.current?.path}),x=Sc(i,{gotoIssue:A=>Pe.gotoIssue(A),issueStores:we,transport:pe,workerQueueStore:Je,uiOrderStore:me,displayPolicyStore:$e,closedRange:xt,onClosedRangeChange:A=>{ne(A)},onNewIssue:()=>ct.open(),openDoc:b}),D=Gi(c,{transport:pe,issueStores:we,queueStore:Je,analysisStore:it,sessionLogStore:Ge,uiOrderStore:me,gotoIssue:A=>at.setState({selected_id:A}),getWorkspacePath:()=>at.getState().workspace.current?.path,openDoc:b,doneRange:Ye,onDoneRangeChange:A=>{xe(A)}}),J=Vd(u,{transport:pe,pipelineStore:I,execPresetStore:Se,sessionLogStore:Ge,router:Pe,gotoIssue:A=>Pe.gotoIssue(A),getWorkspacePath:()=>at.getState().workspace.current?.path,switchWorkspace:A=>Dt(A),openDoc:b}),he=Xu(d,{issueStores:we,transport:pe,queueStore:Je,execPresetStore:Se,sessionLogStore:Ge,getWorkspacePath:()=>at.getState().workspace.current?.path,mdViewer:v,onNavigate:A=>{at.getState().view==="worker"?at.setState({selected_id:A}):Pe.gotoIssue(A)},onClose:()=>{let A=at.getState();at.setState({selected_id:null});try{Pe.gotoView(A.view==="worker"||A.view==="monitor"?A.view:"board")}catch{}},onOpenExecPresets:()=>{St.open("execution")}}),Ie=at.getState().selected_id;Ie&&(d.hidden=!1,he.load(Ie),dt(Ie)),at.subscribe(A=>{let R=A.selected_id;R?(d.hidden=!1,he.load(R),Ke||dt(R)):(he.clear(),d.hidden=!0,Ne())});let rt=A=>{i.hidden=A.view!=="board",c.hidden=A.view!=="worker",u.hidden=A.view!=="monitor",o&&o.classList.toggle("is-quiet",A.view==="monitor"),Y(A.view==="board"),Oe(A.view==="worker"),se(A.view==="monitor"),g(A.view==="board"||A.view==="worker"||Rt||!!A.selected_id),!A.selected_id&&A.view==="board"&&x.load(),A.view==="worker"&&D.load(),A.view==="monitor"?J.load():J.pause(),window.localStorage.setItem("beads-ui.view",A.view)};at.subscribe(rt),rt(at.getState()),_e(),tt(),gt(),We().finally(()=>{De=!0,et()}),window.addEventListener("keydown",A=>{let R=A.ctrlKey||A.metaKey,Ce=String(A.key||"").toLowerCase(),p=A.target,y=p&&p.tagName?String(p.tagName).toLowerCase():"",f=y==="input"||y==="textarea"||y==="select"||p&&typeof p.isContentEditable=="boolean"&&p.isContentEditable;R&&Ce==="n"&&(f||(A.preventDefault(),ct.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let n=window.localStorage.getItem("beads-ui.theme"),r=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=n==="dark"||n==="light"?n:r?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let n=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",n),window.localStorage.setItem("beads-ui.theme",n)});let t=document.getElementById("app");t&&ly(t)});export{ly as bootstrap,oy as readBootstrapConfig,ay as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
