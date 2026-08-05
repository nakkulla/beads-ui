var Ai=Object.create;var Tr=Object.defineProperty;var Ti=Object.getOwnPropertyDescriptor;var Ei=Object.getOwnPropertyNames;var Ci=Object.getPrototypeOf,Ri=Object.prototype.hasOwnProperty;var Ii=(e,t,n)=>t in e?Tr(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var Er=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var Li=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of Ei(t))!Ri.call(e,s)&&s!==n&&Tr(e,s,{get:()=>t[s],enumerable:!(r=Ti(t,s))||r.enumerable});return e};var Di=(e,t,n)=>(n=e!=null?Ai(Ci(e)):{},Li(t||!e||!e.__esModule?Tr(n,"default",{value:e,enumerable:!0}):n,e));var Pe=(e,t,n)=>Ii(e,typeof t!="symbol"?t+"":t,n);var oo=Er((bu,so)=>{var dn=1e3,un=dn*60,pn=un*60,Xt=pn*24,Fi=Xt*7,qi=Xt*365.25;so.exports=function(e,t){t=t||{};var n=typeof e;if(n==="string"&&e.length>0)return Bi(e);if(n==="number"&&isFinite(e))return t.long?zi(e):Ui(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function Bi(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var n=parseFloat(t[1]),r=(t[2]||"ms").toLowerCase();switch(r){case"years":case"year":case"yrs":case"yr":case"y":return n*qi;case"weeks":case"week":case"w":return n*Fi;case"days":case"day":case"d":return n*Xt;case"hours":case"hour":case"hrs":case"hr":case"h":return n*pn;case"minutes":case"minute":case"mins":case"min":case"m":return n*un;case"seconds":case"second":case"secs":case"sec":case"s":return n*dn;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return n;default:return}}}}function Ui(e){var t=Math.abs(e);return t>=Xt?Math.round(e/Xt)+"d":t>=pn?Math.round(e/pn)+"h":t>=un?Math.round(e/un)+"m":t>=dn?Math.round(e/dn)+"s":e+"ms"}function zi(e){var t=Math.abs(e);return t>=Xt?Zn(e,t,Xt,"day"):t>=pn?Zn(e,t,pn,"hour"):t>=un?Zn(e,t,un,"minute"):t>=dn?Zn(e,t,dn,"second"):e+" ms"}function Zn(e,t,n,r){var s=t>=n*1.5;return Math.round(e/n)+" "+r+(s?"s":"")}});var io=Er((vu,ao)=>{function Hi(e){n.debug=n,n.default=n,n.coerce=i,n.disable=a,n.enable=s,n.enabled=c,n.humanize=oo(),n.destroy=d,Object.keys(e).forEach(f=>{n[f]=e[f]}),n.names=[],n.skips=[],n.formatters={};function t(f){let _=0;for(let v=0;v<f.length;v++)_=(_<<5)-_+f.charCodeAt(v),_|=0;return n.colors[Math.abs(_)%n.colors.length]}n.selectColor=t;function n(f){let _,v=null,y,$;function g(...R){if(!g.enabled)return;let W=g,H=Number(new Date),Y=H-(_||H);W.diff=Y,W.prev=_,W.curr=H,_=H,R[0]=n.coerce(R[0]),typeof R[0]!="string"&&R.unshift("%O");let N=0;R[0]=R[0].replace(/%([a-zA-Z%])/g,(S,M)=>{if(S==="%%")return"%";N++;let x=n.formatters[M];if(typeof x=="function"){let j=R[N];S=x.call(W,j),R.splice(N,1),N--}return S}),n.formatArgs.call(W,R),(W.log||n.log).apply(W,R)}return g.namespace=f,g.useColors=n.useColors(),g.color=n.selectColor(f),g.extend=r,g.destroy=n.destroy,Object.defineProperty(g,"enabled",{enumerable:!0,configurable:!1,get:()=>v!==null?v:(y!==n.namespaces&&(y=n.namespaces,$=n.enabled(f)),$),set:R=>{v=R}}),typeof n.init=="function"&&n.init(g),g}function r(f,_){let v=n(this.namespace+(typeof _>"u"?":":_)+f);return v.log=this.log,v}function s(f){n.save(f),n.namespaces=f,n.names=[],n.skips=[];let _=(typeof f=="string"?f:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let v of _)v[0]==="-"?n.skips.push(v.slice(1)):n.names.push(v)}function o(f,_){let v=0,y=0,$=-1,g=0;for(;v<f.length;)if(y<_.length&&(_[y]===f[v]||_[y]==="*"))_[y]==="*"?($=y,g=v,y++):(v++,y++);else if($!==-1)y=$+1,g++,v=g;else return!1;for(;y<_.length&&_[y]==="*";)y++;return y===_.length}function a(){let f=[...n.names,...n.skips.map(_=>"-"+_)].join(",");return n.enable(""),f}function c(f){for(let _ of n.skips)if(o(f,_))return!1;for(let _ of n.names)if(o(f,_))return!0;return!1}function i(f){return f instanceof Error?f.stack||f.message:f}function d(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return n.enable(n.load()),n}ao.exports=Hi});var lo=Er((mt,Xn)=>{mt.formatArgs=Gi;mt.save=ji;mt.load=Yi;mt.useColors=Wi;mt.storage=Vi();mt.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();mt.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function Wi(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function Gi(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+Xn.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let n=0,r=0;e[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(n++,s==="%c"&&(r=n))}),e.splice(r,0,t)}mt.log=console.debug||console.log||(()=>{});function ji(e){try{e?mt.storage.setItem("debug",e):mt.storage.removeItem("debug")}catch{}}function Yi(){let e;try{e=mt.storage.getItem("debug")||mt.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function Vi(){try{return localStorage}catch{}}Xn.exports=io()(mt);var{formatters:Ki}=Xn.exports;Ki.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var kn=globalThis,Kn=kn.trustedTypes,Gs=Kn?Kn.createPolicy("lit-html",{createHTML:e=>e}):void 0,Xs="$lit$",Ut=`lit$${Math.random().toFixed(9).slice(2)}$`,Qs="?"+Ut,Oi=`<${Qs}>`,Kt=document,yn=()=>Kt.createComment(""),$n=e=>e===null||typeof e!="object"&&typeof e!="function",Mr=Array.isArray,Mi=e=>Mr(e)||typeof e?.[Symbol.iterator]=="function",Cr=`[ 	
\f\r]`,wn=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,js=/-->/g,Ys=/>/g,Yt=RegExp(`>|${Cr}(?:([^\\s"'>=/]+)(${Cr}*=${Cr}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Vs=/'/g,Ks=/"/g,Js=/^(?:script|style|textarea|title)$/i,Nr=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),l=Nr(1),Dt=Nr(2),pu=Nr(3),Zt=Symbol.for("lit-noChange"),Ve=Symbol.for("lit-nothing"),Zs=new WeakMap,Vt=Kt.createTreeWalker(Kt,129);function eo(e,t){if(!Mr(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return Gs!==void 0?Gs.createHTML(t):t}var Ni=(e,t)=>{let n=e.length-1,r=[],s,o=t===2?"<svg>":t===3?"<math>":"",a=wn;for(let c=0;c<n;c++){let i=e[c],d,f,_=-1,v=0;for(;v<i.length&&(a.lastIndex=v,f=a.exec(i),f!==null);)v=a.lastIndex,a===wn?f[1]==="!--"?a=js:f[1]!==void 0?a=Ys:f[2]!==void 0?(Js.test(f[2])&&(s=RegExp("</"+f[2],"g")),a=Yt):f[3]!==void 0&&(a=Yt):a===Yt?f[0]===">"?(a=s??wn,_=-1):f[1]===void 0?_=-2:(_=a.lastIndex-f[2].length,d=f[1],a=f[3]===void 0?Yt:f[3]==='"'?Ks:Vs):a===Ks||a===Vs?a=Yt:a===js||a===Ys?a=wn:(a=Yt,s=void 0);let y=a===Yt&&e[c+1].startsWith("/>")?" ":"";o+=a===wn?i+Oi:_>=0?(r.push(d),i.slice(0,_)+Xs+i.slice(_)+Ut+y):i+Ut+(_===-2?c:y)}return[eo(e,o+(e[n]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),r]},xn=class e{constructor({strings:t,_$litType$:n},r){let s;this.parts=[];let o=0,a=0,c=t.length-1,i=this.parts,[d,f]=Ni(t,n);if(this.el=e.createElement(d,r),Vt.currentNode=this.el.content,n===2||n===3){let _=this.el.content.firstChild;_.replaceWith(..._.childNodes)}for(;(s=Vt.nextNode())!==null&&i.length<c;){if(s.nodeType===1){if(s.hasAttributes())for(let _ of s.getAttributeNames())if(_.endsWith(Xs)){let v=f[a++],y=s.getAttribute(_).split(Ut),$=/([.?@])?(.*)/.exec(v);i.push({type:1,index:o,name:$[2],strings:y,ctor:$[1]==="."?Ir:$[1]==="?"?Lr:$[1]==="@"?Dr:ln}),s.removeAttribute(_)}else _.startsWith(Ut)&&(i.push({type:6,index:o}),s.removeAttribute(_));if(Js.test(s.tagName)){let _=s.textContent.split(Ut),v=_.length-1;if(v>0){s.textContent=Kn?Kn.emptyScript:"";for(let y=0;y<v;y++)s.append(_[y],yn()),Vt.nextNode(),i.push({type:2,index:++o});s.append(_[v],yn())}}}else if(s.nodeType===8)if(s.data===Qs)i.push({type:2,index:o});else{let _=-1;for(;(_=s.data.indexOf(Ut,_+1))!==-1;)i.push({type:7,index:o}),_+=Ut.length-1}o++}}static createElement(t,n){let r=Kt.createElement("template");return r.innerHTML=t,r}};function an(e,t,n=e,r){if(t===Zt)return t;let s=r!==void 0?n._$Co?.[r]:n._$Cl,o=$n(t)?void 0:t._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(e),s._$AT(e,n,r)),r!==void 0?(n._$Co??(n._$Co=[]))[r]=s:n._$Cl=s),s!==void 0&&(t=an(e,s._$AS(e,t.values),s,r)),t}var Rr=class{constructor(t,n){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:n},parts:r}=this._$AD,s=(t?.creationScope??Kt).importNode(n,!0);Vt.currentNode=s;let o=Vt.nextNode(),a=0,c=0,i=r[0];for(;i!==void 0;){if(a===i.index){let d;i.type===2?d=new Sn(o,o.nextSibling,this,t):i.type===1?d=new i.ctor(o,i.name,i.strings,this,t):i.type===6&&(d=new Or(o,this,t)),this._$AV.push(d),i=r[++c]}a!==i?.index&&(o=Vt.nextNode(),a++)}return Vt.currentNode=Kt,s}p(t){let n=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,n),n+=r.strings.length-2):r._$AI(t[n])),n++}},Sn=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,n,r,s){this.type=2,this._$AH=Ve,this._$AN=void 0,this._$AA=t,this._$AB=n,this._$AM=r,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,n=this._$AM;return n!==void 0&&t?.nodeType===11&&(t=n.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,n=this){t=an(this,t,n),$n(t)?t===Ve||t==null||t===""?(this._$AH!==Ve&&this._$AR(),this._$AH=Ve):t!==this._$AH&&t!==Zt&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Mi(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==Ve&&$n(this._$AH)?this._$AA.nextSibling.data=t:this.T(Kt.createTextNode(t)),this._$AH=t}$(t){let{values:n,_$litType$:r}=t,s=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=xn.createElement(eo(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===s)this._$AH.p(n);else{let o=new Rr(s,this),a=o.u(this.options);o.p(n),this.T(a),this._$AH=o}}_$AC(t){let n=Zs.get(t.strings);return n===void 0&&Zs.set(t.strings,n=new xn(t)),n}k(t){Mr(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,s=0;for(let o of t)s===n.length?n.push(r=new e(this.O(yn()),this.O(yn()),this,this.options)):r=n[s],r._$AI(o),s++;s<n.length&&(this._$AR(r&&r._$AB.nextSibling,s),n.length=s)}_$AR(t=this._$AA.nextSibling,n){for(this._$AP?.(!1,!0,n);t!==this._$AB;){let r=t.nextSibling;t.remove(),t=r}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},ln=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,n,r,s,o){this.type=1,this._$AH=Ve,this._$AN=void 0,this.element=t,this.name=n,this._$AM=s,this.options=o,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=Ve}_$AI(t,n=this,r,s){let o=this.strings,a=!1;if(o===void 0)t=an(this,t,n,0),a=!$n(t)||t!==this._$AH&&t!==Zt,a&&(this._$AH=t);else{let c=t,i,d;for(t=o[0],i=0;i<o.length-1;i++)d=an(this,c[r+i],n,i),d===Zt&&(d=this._$AH[i]),a||(a=!$n(d)||d!==this._$AH[i]),d===Ve?t=Ve:t!==Ve&&(t+=(d??"")+o[i+1]),this._$AH[i]=d}a&&!s&&this.j(t)}j(t){t===Ve?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Ir=class extends ln{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Ve?void 0:t}},Lr=class extends ln{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==Ve)}},Dr=class extends ln{constructor(t,n,r,s,o){super(t,n,r,s,o),this.type=5}_$AI(t,n=this){if((t=an(this,t,n,0)??Ve)===Zt)return;let r=this._$AH,s=t===Ve&&r!==Ve||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,o=t!==Ve&&(r===Ve||s);s&&this.element.removeEventListener(this.name,this,r),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Or=class{constructor(t,n,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=n,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){an(this,t)}};var Pi=kn.litHtmlPolyfillSupport;Pi?.(xn,Sn),(kn.litHtmlVersions??(kn.litHtmlVersions=[])).push("3.3.1");var Ce=(e,t,n)=>{let r=n?.renderBefore??t,s=r._$litPart$;if(s===void 0){let o=n?.renderBefore??null;r._$litPart$=s=new Sn(t.insertBefore(yn(),o),o,void 0,n??{})}return s._$AI(e),s};var wt="today",Ct=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}];function Ot(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function cn(e,t=Date.now()){switch(e){case"today":{let n=new Date(t);return n.setHours(0,0,0,0),n.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function to(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function no(){let e=null,t=[],n=new Set;function r(){for(let s of Array.from(n))try{s()}catch{}}return{get(){return e},getWorkspacesState(){return t},set(s,o){e=Array.isArray(s)?s:null,t=Array.isArray(o)?o:[],r()},clear(){e=null,t=[],r()},subscribe(s){return n.add(s),()=>n.delete(s)}}}function ro(){let e=new Map,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{set(r,s,o=null){e.set(r,{lines:Array.isArray(s)?[...s]:[],last_event_at:typeof o=="number"?o:null}),n()},append(r,s){let o=e.get(r)||{lines:[],last_event_at:null};o.lines=[...o.lines,s],o.last_event_at=Date.now(),e.set(r,o),n()},get(r){return e.get(r)||null},clear(r){typeof r=="string"?e.delete(r):e.clear(),n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}var co=Di(lo(),1);function Ue(e){return(0,co.default)(`beads-ui:${e}`)}function yt(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function Qt(e,t){let n=yt(e.created_at),r=yt(t.created_at);if(n!==r)return n<r?1:-1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,c=t.id;return a<c?-1:a>c?1:0}function fo(e,t){let n=yt(e.created_at),r=yt(t.created_at);if(n!==r)return n<r?-1:1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,c=t.id;return a<c?-1:a>c?1:0}function _o(e,t){let n=yt(e.updated_at),r=yt(t.updated_at);if(n!==r)return n<r?1:-1;let s=e.id,o=t.id;return s<o?-1:s>o?1:0}function ho(e,t){let n=e.priority??2,r=t.priority??2;if(n!==r)return n-r;let s=yt(e.created_at),o=yt(t.created_at);if(s!==o)return s<o?1:-1;let a=e.id,c=t.id;return a<c?-1:a>c?1:0}function mo(e,t){let n=e.closed_at??0,r=t.closed_at??0;if(n!==r)return n<r?1:-1;let s=e?.id,o=t?.id;return s<o?-1:s>o?1:0}var Zi=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function uo(e){let t=e&&e.metadata,n=t?t.task_order:void 0;if(n==null||n==="")return Number.POSITIVE_INFINITY;let r=Number(n);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function po(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let n=Zi.exec(t);if(!n)return Number.POSITIVE_INFINITY;let r=Number(n[1]);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function go(e,t){let n=uo(e),r=uo(t);if(n!==r)return n<r?-1:1;let s=po(e),o=po(t);if(s!==o)return s<o?-1:1;let a=yt(e&&e.created_at),c=yt(t&&t.created_at);if(a!==c)return a<c?-1:1;let i=e&&e.id,d=t&&t.id;return i===d?0:String(i)<String(d)?-1:1}var Pr=2**20;function fn(e,t){let n=e&&e.id;return t&&typeof n=="string"&&Object.prototype.hasOwnProperty.call(t,n)&&typeof t[n]=="number"&&Number.isFinite(t[n])?t[n]:-yt(e&&e.created_at)}function Qn(e){return(t,n)=>{let r=fn(t,e),s=fn(n,e);if(r!==s)return r<s?-1:1;let o=t?.id,a=n?.id;return o<a?-1:o>a?1:0}}function Fr(e,t,n){let r=Array.isArray(e)?e:[],s=r.length,o=Math.max(0,Math.min(t,s-1)),a=o-1>=0?r[o-1]:null,c=o+1<s?r[o+1]:null;if(!a&&!c)return{rank:0};if(!a)return{rank:fn(c,n)-Pr};if(!c)return{rank:fn(a,n)+Pr};let i=fn(a,n),d=fn(c,n),f=(i+d)/2;return i<f&&f<d?{rank:f}:{renormalize:r.map((_,v)=>({bead_id:_.id,rank:v*Pr}))}}function qr(e,t={}){let n=Ue(`issue-store:${e}`),r=new Map,s=[],o=0,a=new Set,c=!1,i=t.sort||Qt;function d(){for(let v of Array.from(a))try{v()}catch{}}function f(){s=Array.from(r.values()).sort(i)}function _(v){if(c||!v||v.id!==e)return;let y=Number(v.revision)||0;if(n("apply %s rev=%d",v.type,y),!(y<=o&&v.type!=="snapshot")){if(v.type==="snapshot"){if(y<=o)return;r.clear();let $=Array.isArray(v.issues)?v.issues:[];for(let g of $)g&&typeof g.id=="string"&&g.id.length>0&&r.set(g.id,g);f(),o=y,d();return}if(v.type==="upsert"){let $=v.issue;if($&&typeof $.id=="string"&&$.id.length>0){let g=r.get($.id);if(!g)r.set($.id,$);else{let R=Number.isFinite(g.updated_at)?g.updated_at:0,W=Number.isFinite($.updated_at)?$.updated_at:0;if(R<=W){for(let H of Object.keys(g))H in $||delete g[H];for(let[H,Y]of Object.entries($))g[H]=Y}}f()}o=y,d()}else if(v.type==="delete"){let $=String(v.issue_id||"");$&&(r.delete($),f()),o=y,d()}}}return{id:e,subscribe(v){return a.add(v),()=>{a.delete(v)}},applyPush:_,snapshot(){return s},size(){return r.size},getById(v){return r.get(v)},dispose(){c=!0,r.clear(),s=[],a.clear(),o=0}}}function Jn(e){let t=String(e.type||"").trim(),n={};if(e.params&&typeof e.params=="object"){let s=Object.keys(e.params).sort();for(let o of s){let a=e.params[o];n[o]=String(a)}}let r=new URLSearchParams(n).toString();return r.length>0?`${t}?${r}`:t}function bo(e){let t=Ue("subs"),n=new Map,r=new Map;function s(c,i){t("applyDelta %s +%d ~%d -%d",c,(i.added||[]).length,(i.updated||[]).length,(i.removed||[]).length);let d=r.get(c);if(!d||d.size===0)return;let f=Array.isArray(i.added)?i.added:[],_=Array.isArray(i.updated)?i.updated:[],v=Array.isArray(i.removed)?i.removed:[];for(let y of Array.from(d)){let $=n.get(y);if(!$)continue;let g=$.itemsById;for(let R of f)typeof R=="string"&&R.length>0&&g.set(R,!0);for(let R of _)typeof R=="string"&&R.length>0&&g.set(R,!0);for(let R of v)typeof R=="string"&&R.length>0&&g.delete(R)}}async function o(c,i){let d=Jn(i);if(t("subscribe %s key=%s",c,d),!n.has(c))n.set(c,{key:d,itemsById:new Map});else{let _=n.get(c);if(_&&_.key!==d){let v=r.get(_.key);v&&(v.delete(c),v.size===0&&r.delete(_.key)),n.set(c,{key:d,itemsById:new Map})}}r.has(d)||r.set(d,new Set);let f=r.get(d);f&&f.add(c);try{await e("subscribe-list",{id:c,type:i.type,params:i.params})}catch(_){let v=n.get(c)||null;if(v){let y=r.get(v.key);y&&(y.delete(c),y.size===0&&r.delete(v.key))}throw n.delete(c),_}return async()=>{t("unsubscribe %s key=%s",c,d);try{await e("unsubscribe-list",{id:c})}catch{}let _=n.get(c)||null;if(_){let v=r.get(_.key);v&&(v.delete(c),v.size===0&&r.delete(_.key))}n.delete(c)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:Jn,selectors:{getIds(c){let i=n.get(c);return i?Array.from(i.itemsById.keys()):[]},has(c,i){let d=n.get(c);return d?d.itemsById.has(i):!1},count(c){let i=n.get(c);return i?i.itemsById.size:0},getItemsById(c){let i=n.get(c),d={};if(!i)return d;for(let f of i.itemsById.keys())d[f]=!0;return d}}}}function vo(){let e=Ue("issue-stores"),t=new Map,n=new Map,r=new Set,s=new Map;function o(){for(let i of Array.from(r))try{i()}catch{}}function a(i,d,f){let _=d?Jn(d):"",v=n.get(i)||"",y=t.has(i);if(e("register %s key=%s (prev=%s)",i,_,v),y&&v&&_&&v!==_){let $=t.get(i);if($)try{$.dispose()}catch{}let g=s.get(i);if(g){try{g()}catch{}s.delete(i)}let R=qr(i,f);t.set(i,R);let W=R.subscribe(()=>o());s.set(i,W)}else if(!y){let $=qr(i,f);t.set(i,$);let g=$.subscribe(()=>o());s.set(i,g)}return n.set(i,_),()=>c(i)}function c(i){e("unregister %s",i),n.delete(i);let d=t.get(i);d&&(d.dispose(),t.delete(i));let f=s.get(i);if(f){try{f()}catch{}s.delete(i)}}return{register:a,unregister:c,getStore(i){return t.get(i)||null},snapshotFor(i){let d=t.get(i);return d?d.snapshot().slice():[]},subscribe(i){return r.add(i),()=>r.delete(i)}}}function wo(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function ko(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Br(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function Xi(e){let t=String(e||""),n=t.startsWith("#")?t.slice(1):t,r=n.indexOf("?"),s=r>=0?n.slice(r+1):"";if(s){let c=new URLSearchParams(s).get("issue");if(c)return decodeURIComponent(c)}let o=/^\/issue\/([^\s?#]+)/.exec(n);return o&&o[1]?decodeURIComponent(o[1]):null}function Qi(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function yo(e){let t=Ue("router"),n=()=>{let r=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(r),o=s&&s[1]?decodeURIComponent(s[1]):Xi(r),a=Qi(r);if(t("hash change \u2192 view=%s id=%s",a,o),e.setState({selected_id:a==="worker"?null:o,view:a,worker:{selected_parent_id:a==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(r)){let i=o?`#/${a}?issue=${encodeURIComponent(o)}`:`#/${a}`;window.location.hash!==i&&(window.location.hash=i)}};return{start(){window.addEventListener("hashchange",n),n()},stop(){window.removeEventListener("hashchange",n)},gotoIssue(r){let s=e.getState?e.getState():{view:"board"},o=s.view==="worker"||s.view==="monitor"?s.view:"board",a=Br(o,r);t("goto issue %s (view=%s)",r,o),window.location.hash!==a?window.location.hash=a:e.setState({selected_id:o==="worker"?null:r,view:o,worker:{selected_parent_id:o==="worker"?r:null}})},gotoView(r){let s=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},o=r==="worker"?s.worker?.selected_parent_id:s.selected_id,a=o?Br(r,o):`#/${r}`;t("goto view %s (id=%s)",r,o||""),window.location.hash!==a?window.location.hash=a:e.setState({view:r,selected_id:r==="worker"?null:s.selected_id})}}}var Ji=Object.freeze({workspace_config:{default_workspace:null}});function $o(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:Ji.workspace_config.default_workspace}}}function xo(e={}){let t=Ue("state"),n={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:$o(e.config)},r=new Set;function s(){for(let o of Array.from(r))try{o(n)}catch{}}return{getState(){return n},setState(o){let a={...n,...o,filters:{...n.filters,...o.filters||{}},board:{...n.board,...o.board||{}},worker:{...n.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:n.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:n.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:n.workspace.hidden},config:o.config!==void 0?$o(o.config):n.config},c=a.workspace.current?.path!==n.workspace.current?.path||a.workspace.available.length!==n.workspace.available.length||a.workspace.hidden.length!==n.workspace.hidden.length||a.workspace.hidden.some((d,f)=>d!==n.workspace.hidden[f]),i=a.config.workspace_config.default_workspace!==n.config.workspace_config.default_workspace;a.selected_id===n.selected_id&&a.view===n.view&&a.filters.status===n.filters.status&&a.filters.search===n.filters.search&&a.filters.type===n.filters.type&&a.board.closed_filter===n.board.closed_filter&&a.worker.selected_parent_id===n.worker.selected_parent_id&&a.worker.show_closed_children.length===n.worker.show_closed_children.length&&a.worker.show_closed_children.every((d,f)=>d===n.worker.show_closed_children[f])&&!c&&!i||(n=a,t("state change %o",{selected_id:n.selected_id,view:n.view,filters:n.filters,board:n.board,worker:n.worker,workspace:n.workspace.current?.path,config:{default_workspace:n.config.workspace_config.default_workspace}}),s())},subscribe(o){return r.add(o),()=>r.delete(o)}}}function So(e){let t=Ue("activity"),n=0,r=new Map,s=1;function o(){if(!e)return;let d=n>0;e.toggleAttribute("hidden",!d),e.setAttribute("aria-busy",d?"true":"false")}function a(){n+=1,t("start count=%d",n),o()}function c(){let d=n;n=Math.max(0,n-1),d<=0?t("done called but count was already %d",d):t("done count=%d\u2192%d",d,n),o()}function i(d){return async(_,v)=>{let y=s++,$=Date.now();r.set(y,{type:_,start_ts:$}),t("request start id=%d type=%s count=%d",y,_,n+1),a();let g=!1,R=()=>{g||(g=!0,r.delete(y),c())},W=setTimeout(()=>{g||(t("request TIMEOUT id=%d type=%s elapsed=%dms",y,_,Date.now()-$),R())},3e4);try{let H=await d(_,v),Y=Date.now()-$;return t("request done id=%d type=%s elapsed=%dms",y,_,Y),H}catch(H){let Y=Date.now()-$;throw t("request error id=%d type=%s elapsed=%dms err=%o",y,_,Y,H),H}finally{clearTimeout(W),R()}}}return o(),{wrapSend:i,start:a,done:c,getCount:()=>n,getActiveRequests:()=>{let d=Date.now();return Array.from(r.entries()).map(([f,_])=>({id:f,type:_.type,elapsed_ms:d-_.start_ts}))}}}function se(e,t="info",n=2800){let r=document.createElement("div");r.className="toast",r.textContent=e,r.style.position="fixed",r.style.right="12px",r.style.bottom="12px",r.style.zIndex="1000",r.style.color="#fff",r.style.padding="8px 10px",r.style.borderRadius="4px",r.style.fontSize="12px",t==="success"?r.style.background="#156d36":t==="warning"?r.style.background="#a36a00":t==="error"?r.style.background="#9f2011":r.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(r),setTimeout(()=>{try{r.remove()}catch{}},n)}function er(e=void 0,t=void 0){function n(){if(!t||typeof t.get!="function")return null;let o=t.get();return o&&o.order?o.order:{}}function r(o,a,c){let i=e&&e.snapshotFor?e.snapshotFor(o).slice():[];if(a==="closed")return i.sort(mo),i;switch(c){case"created_desc":return i.sort(Qt),i;case"created_asc":return i.sort(fo),i;case"updated_desc":return i.sort(_o),i;case"priority":return i.sort(ho),i;case"manual":default:{let d=n();return d?i.sort(Qn(d)):i.sort(Qt),i}}}function s(o){let a=[];return e&&typeof e.subscribe=="function"&&a.push(e.subscribe(o)),t&&typeof t.subscribe=="function"&&a.push(t.subscribe(o)),()=>{for(let c of a)try{c()}catch{}}}return{selectBoardColumn:r,subscribe:s}}function An(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function ot(e){let t=An(e);if(t===null)return"";let n=new Date(t),r=s=>String(s).padStart(2,"0");return`${n.getFullYear()}-${r(n.getMonth()+1)}-${r(n.getDate())} ${r(n.getHours())}:${r(n.getMinutes())}`}function vt(e,t){let n=An(e);if(n===null)return"";let s=(typeof t=="number"?t:Date.now())-n;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let a=Math.floor(s/36e5);if(a<24)return`${a}\uC2DC\uAC04 \uC804`;let c=Math.floor(s/864e5);if(c<7)return`${c}\uC77C \uC804`;let i=Math.floor(c/7);if(c<30)return`${i}\uC8FC \uC804`;let d=Math.floor(c/30);return d<12?`${d}\uAC1C\uC6D4 \uC804`:`${Math.floor(c/365)}\uB144 \uC804`}function tr(e){if(!Array.isArray(e))return null;let t=null,n=-1;for(let r of e){if(!r||r.status!=="in_progress")continue;let s=An(r.updated_at)??0;if(t===null||s>n){t=r,n=s;continue}s===n&&String(r.id)<String(t.id)&&(t=r)}return t}function nr(e){let t=e.transport,n=e.uiOrderStore;function r(a,c){return"renormalize"in a?a.renormalize:[{bead_id:c,rank:a.rank}]}function s(a,c){let i={...a.order};for(let d of c)i[d.bead_id]=d.rank;n&&n.set({revision:a.revision,order:i})}async function o(a,c,i){if(!t||!n)return;let d=n.get()||{revision:0,order:{}},f=r(Fr(c,i,d.order),a);s(d,f);let _=await t("ui-order-set",{expected_revision:d.revision,entries:f});if(_&&_.conflict){let v={revision:typeof _.revision=="number"?_.revision:0,order:_.order||{}};n.set(v);let y=r(Fr(c,i,v.order),a);s(v,y);let $=await t("ui-order-set",{expected_revision:v.revision,entries:y});$&&$.applied&&n.set({revision:typeof $.revision=="number"?$.revision:0,order:$.order||{}})}else _&&_.applied&&n.set({revision:typeof _.revision=="number"?_.revision:0,order:_.order||{}})}return{applyReorder:o}}function rr(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Ur(e,t){return!t||typeof e!="string"||e.length===0||rr(t.visible_labels).includes(e)?!0:rr(t.hidden_labels).includes(e)?!1:!rr(t.hidden_prefixes).some(n=>n.length>0&&e.startsWith(n))}function sr(e,t){return rr(e).filter(n=>Ur(n,t))}function Jt(e,t){let n=e&&e.chips?e.chips[t]:void 0;return typeof n=="boolean"?n:!0}var el={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg"},Ao={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge"},tl={spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},nl={review:"\u2713",skip:"\u2298"},_n={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function rl(e,t,n){if(!(n==="in_progress"||n==="resolved"))return null;for(let s of e){let o=t[s];if(o&&o.fill==="dim"&&o.stale!==!0)return s}return null}function sl(e){let t=e&&e.fill||"none";return t==="none"?_n.none:e&&e.stale===!0?_n.stale:t==="dim"?_n.dim:e&&e.glyph==="review"?_n.review:e&&e.glyph==="skip"?_n.skip:_n.done}function ol(e,t,n){let r=el[e]||e,s=t&&t.fill||"none",o=!!t&&t.stale===!0,a=nl[t&&t.glyph||""]||"",c="bar";s==="dim"?c+=` b-${r} dim`:s==="full"&&(c+=` b-${r} full`),o&&(c+=" stale"),n&&(c+=" cur");let i=s==="none"?"lbl":`lbl l-${r} on`,d=n?`color: var(--stage-${r}-on)`:"";return l`
    <div class="seg">
      <div class=${c} style=${d}>${a}</div>
      <div class=${i}>
        ${Ao[e]||e}
      </div>
    </div>
  `}function or(e,t){if(!e||!e.stages)return"";let n=e.route==="full_plan"?"full_plan":"spec_backed",r=tl[n],s=e.stages,o=rl(r,s,String(t||"open")),a=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${r.map(c=>`${Ao[c]||c} ${sl(s[c]||{})}`).join(" \xB7 ")}`;return l`
    <div class="stp" role="img" aria-label=${a}>
      ${r.map(c=>ol(c,s[c]||{},c===o))}
    </div>
  `}function al(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var To=2;function il(e){if(!e)return[];let t=[];if(e.external){let r=e.reason?`\u23F8 blocked: ${e.reason}`:"\u23F8 blocked";t.push(l`<span class="ctl-chip ctl-chip--blocked">${r}</span>`)}let n=Array.isArray(e.blockers)?e.blockers:[];if(n.length>0){let r=n.slice(0,To).join(", "),s=n.length-To,o=`\u26D3 blocked: ${r}${s>0?` +${s}`:""}`;t.push(l`<span class="ctl-chip ctl-chip--blocked-dep">${o}</span>`)}return t}function ll(e,t){let n=t.policy||null,r=e.workflow&&e.workflow.chips||{},s=[];if(r.route&&Jt(n,"route")){let o=r.route_source==="derived";s.push(l`<span
        class="ctl-chip ctl-chip--route${o?" is-derived":""}"
        title=${o?"route \uCD94\uB860\uAC12 (metadata \uBBF8\uD540)":"route"}
        >${o?`${r.route} ?`:r.route}</span
      >`)}if(r.fast_track&&Jt(n,"fast_track")&&s.push(l`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),r.pr&&Jt(n,"pr")){let o=r.pr.number;s.push(l`<span class="ctl-chip ctl-chip--pr"
        >${`PR${o!=null?` #${o}`:""}`}</span
      >`)}for(let o of sr(e.labels,n))s.push(l`<span class="ctl-chip ctl-chip--label">${o}</span>`);return e.from_id&&Jt(n,"from")&&s.push(l`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${o=>{o.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(o,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),Jt(n,"blocked")&&s.push(...il(e.blocked_info)),s.length===0?"":l`<div class="board-card__chips">${s}</div>`}function cl(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function dl(e){let t=vt(e.created_at),n=vt(e.updated_at);return!t&&!n?"":l`<span class="board-card__times">
    ${t?l`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${ot(e.created_at)}`}
          >생성 ${t}</span
        >`:""}
    ${t&&n?l`<span class="board-card__time-sep">·</span>`:""}
    ${n?l`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${ot(e.updated_at)}`}
          >수정 ${n}</span
        >`:""}
  </span>`}function ul(e,t){let n=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]},r=n.total||0,s=t.isExpanded?t.isExpanded(e.id):!0,o=r>0?n.children.slice().sort(go):n.children;return l`
    <div class="board-card__roll">
      <div class="board-card__roll-meta">
        ${r>0?l`<button
              type="button"
              class="board-card__roll-toggle"
              aria-expanded=${s?"true":"false"}
              @click=${a=>t.onRollupToggle&&t.onRollupToggle(a,e.id)}
            >
              children ${n.count}/${r} ${s?"\u25B4":"\u25BE"}
            </button>`:l`<span class="board-card__roll-none">children 없음</span>`}
        ${dl(e)}
      </div>
      ${r>0&&n.current?l`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${n.current.title||n.current.id}</span
            >
          </div>`:""}
      ${s&&r>0?l`<div class="board-card__roll-list">
            ${o.map((a,c)=>l`<button
                  type="button"
                  class="board-card__roll-child"
                  @click=${i=>t.onChildClick&&t.onChildClick(i,a.id)}
                >
                  <span class=${cl(a.status)}>●</span>
                  <span class="board-card__roll-child-ord">${c+1}</span>
                  <span class="board-card__roll-child-title"
                    >${a.title||a.id}</span
                  >
                </button>`)}
          </div>`:""}
    </div>
  `}function ar(e,t){let n=al(e.priority);return l`
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
      ${ll(e,t)}
      ${e.workflow&&Jt(t.policy||null,"stepper")?or(e.workflow,e.status):""}
      ${ul(e,t)}
    </article>
  `}function hn(e,t){let n=Array.isArray(e.items)?e.items.length:0,r=e.is_closed===!0;return l`
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
              ${Ct.map(o=>l`<option
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
        ${e.items.map(o=>ar(o,t))}
      </div>
    </section>
  `}function Eo(e,t,n){return l`
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
          ${e.items.length===0?l`<div class="deferred-popup__empty">Deferred 이슈 없음</div>`:e.items.map(r=>ar(r,t))}
        </div>
      </div>
    </dialog>
  `}var pl=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],fl=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],_l=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function hl(e,t,n){let r=e.labels.length,s=r>0?`\uB77C\uBCA8 ${r}`:"\uB77C\uBCA8";return l`
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
  `}function Co(e,t,n){return l`
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
        ${pl.map(r=>l`<option
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
        ${fl.map(r=>l`<option
              value=${r.value}
              ?selected=${e.type===r.value}
            >
              ${r.label}
            </option>`)}
      </select>
      ${hl(e,t,n)}
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
        ${_l.map(r=>l`<option
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
  `}var ml=200,gl={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},bl=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),Ro="beads-ui.board.sort",Io=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function vl(){try{let e=window.localStorage.getItem(Ro);if(e&&Io.has(e))return e}catch{}return"created_desc"}function Lo(e,t){let n=Ue("views:board"),r=t.gotoIssue,s=t.issueStores,o=t.transport,a=t.uiOrderStore,c=t.displayPolicyStore,i=t.onClosedRangeChange,d=t.onNewIssue,f=t.closedRange||wt,_=s?er(s,a):null,v=nr({transport:o,uiOrderStore:a}),y=[],$=[],g=[],R=[],W=[],H=[],Y=!1,N=0,E=vl(),S=new Map,M=new Map,x=new Map,j=new Set,V={search:"",priority:"",type:"",labels:[]},X=!1,oe=null;function De(D){return String(D.status||"open")==="open"}function We(D){let F=String(D.status||"open");return F==="open"||F==="blocked"}function Se(D){let F=V.search.trim().toLowerCase(),re=V.priority,ae=V.type,le=V.labels;return D.filter(ge=>{if(F){let u=String(ge.id||"").toLowerCase(),b=String(ge.title||"").toLowerCase();if(!u.includes(F)&&!b.includes(F))return!1}if(re!==""&&String(ge.priority)!==re||ae!==""&&String(ge.issue_type||"")!==ae)return!1;if(le.length>0){let u=Array.isArray(ge.labels)?ge.labels:[];if(!le.some(b=>u.includes(b)))return!1}return!0})}function J(){let D=new Set;for(let F of[y,$,g,R,W,H])for(let re of F){let ae=Array.isArray(re.labels)?re.labels:[];for(let le of ae)typeof le=="string"&&le.length>0&&D.add(le)}return Array.from(D).sort()}function te(){return V.search.trim()!==""||V.priority!==""||V.type!==""||V.labels.length>0}function A(){try{if(_){let D=_.selectBoardColumn("tab:board:in-progress","in_progress",E),F=_.selectBoardColumn("tab:board:blocked","blocked",E).filter(We),re=new Set(D.map(Z=>Z.id)),ae=_.selectBoardColumn("tab:board:ready","ready",E).filter(Z=>De(Z)&&!re.has(Z.id)),le=_.selectBoardColumn("tab:board:resolved","resolved",E),ge=_.selectBoardColumn("tab:board:deferred","deferred",E),u=_.selectBoardColumn("tab:board:closed","closed").slice(0,ml),b=[...F,...ae,...D,...le,...u];T(b);let I=new Set;for(let Z of b)Z&&Z.id&&!zr(Z)&&I.add(Z.id);let ee=!te();y=ee?Tn(F,I):F,$=ee?Tn(ae,I):ae,g=ee?Tn(D,I):D,R=ee?Tn(le,I):le,W=ge,N=ge.length,H=ee?Tn(u,I):u,S=new Map;for(let Z of y)S.set(Z.id,"open");for(let Z of $)S.set(Z.id,"open");for(let Z of g)S.set(Z.id,"in_progress");for(let Z of R)S.set(Z.id,"resolved");for(let Z of W)S.set(Z.id,"deferred");for(let Z of H)S.set(Z.id,"closed");M=new Map;for(let Z of y)M.set(Z.id,"blocked-col");for(let Z of $)M.set(Z.id,"ready-col");for(let Z of g)M.set(Z.id,"in-progress-col");for(let Z of R)M.set(Z.id,"resolved-col");for(let Z of H)M.set(Z.id,"closed-col")}ke()}catch{y=[],$=[],g=[],R=[],W=[],H=[],x=new Map,ke()}}function T(D){let F=new Map;for(let ae of D)ae&&ae.id&&!F.has(ae.id)&&F.set(ae.id,ae);let re=new Map;for(let ae of F.values()){let le=zr(ae);if(!le)continue;let ge=re.get(le);ge||(ge=[],re.set(le,ge)),ge.push({id:ae.id,title:ae.title,status:ae.status,metadata:ae.metadata,created_at:ae.created_at,updated_at:ae.updated_at})}x=re}function Q(D){let F=x.get(D)||[],re=0;for(let le of F)(le.status==="resolved"||le.status==="closed")&&(re+=1);let ae=tr(F);return{total:F.length,count:re,current:ae,children:F}}function ne(D){return!j.has(D)}function ce(D,F){D.preventDefault(),D.stopPropagation(),j.has(F)?j.delete(F):j.add(F),ke()}function fe(D,F){D.preventDefault(),D.stopPropagation(),r(F)}function Re(D,F){D.preventDefault(),D.stopPropagation(),r(F)}function he(D,F){oe||r(F)}function Ee(D,F){D.preventDefault(),D.stopPropagation(),wl(F).then(re=>{re&&se("\uBCF5\uC0AC\uB428","success",1200)})}function Fe(D,F){oe=F,D.dataTransfer&&(D.dataTransfer.setData("text/plain",F),D.dataTransfer.effectAllowed="move"),D.target.classList.add("board-card--dragging")}function Oe(D){D.target.classList.remove("board-card--dragging"),gt(),setTimeout(()=>{oe=null},0)}function Ge(D){let F=String(D.target.value||"");!F||F===f||(f=F,i&&i(F),ke())}function at(){return c?c.get():null}let P={onCardClick:he,onCopyId:Ee,onDragStart:Fe,onDragEnd:Oe,onClosedRangeChange:Ge,rollupFor:Q,isExpanded:ne,onRollupToggle:ce,onChildClick:fe,onFromChipClick:Re,get policy(){return at()}};function G(D,F){oe||(ze(),r(F))}function O(D,F){D.preventDefault(),D.stopPropagation(),ze(),r(F)}let de={...P,onCardClick:G,onChildClick:O,onFromChipClick:O,get policy(){return at()}};function ue(D){let F=D.target,re=e.querySelector(".board-filter__labels");F&&re&&re.contains(F)||$e()}function be(D){D.key==="Escape"&&$e()}function pe(){X||(X=!0,document.addEventListener("mousedown",ue),document.addEventListener("keydown",be),ke())}function $e(){X&&(X=!1,document.removeEventListener("mousedown",ue),document.removeEventListener("keydown",be),ke())}function Ie(D){D.key==="Escape"&&ze()}function nt(){Y||(Y=!0,document.addEventListener("keydown",Ie),ke())}function ze(){Y&&(Y=!1,document.removeEventListener("keydown",Ie),ke())}let Ke={onClose:ze,onOverlayClick(D){D.target===D.currentTarget&&ze()}},it={onSearchInput(D){V.search=String(D.target.value||""),A()},onPriorityChange(D){V.priority=String(D.target.value||""),A()},onTypeChange(D){V.type=String(D.target.value||""),A()},onSortChange(D){let F=String(D.target.value||"");if(!(!Io.has(F)||F===E)){E=F;try{window.localStorage.setItem(Ro,F)}catch{}A()}},onDeferredToggle(){Y?ze():nt()},onLabelMenuToggle(){X?$e():pe()},onLabelToggle(D){let F=V.labels.indexOf(D);F===-1?V.labels.push(D):V.labels.splice(F,1),A()},onLabelClear(){V.labels.length!==0&&(V.labels=[],A())},onNewIssue(){d&&d()}};function lt(){return l`
      <div class="board-view">
        ${Co(V,it,{sort_mode:E,deferred_popup_open:Y,deferred_count:N,label_options:J(),label_menu_open:X})}
        <div class="board-root">
          ${hn({title:"Blocked",id:"blocked-col",items:Se(y)},P)}
          ${hn({title:"Ready",id:"ready-col",items:Se($)},P)}
          ${hn({title:"In progress",id:"in-progress-col",items:Se(g)},P)}
          ${hn({title:"Resolved",id:"resolved-col",items:Se(R)},P)}
          ${hn({title:"Closed",id:"closed-col",items:Se(H),is_closed:!0,closed_range:f},P)}
        </div>
        ${Y?Eo({items:Se(W),count:N},de,Ke):""}
      </div>
    `}function ke(){Ce(lt(),e),rt()}function rt(){try{let D=e.querySelector("#deferred-popup");D&&!D.open&&(typeof D.showModal=="function"?D.showModal():D.setAttribute("open",""));let F=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let re of F)Array.from(re.querySelectorAll(".board-card")).forEach((le,ge)=>{le.tabIndex=ge===0?0:-1})}catch{}}async function Qe(D,F){if(!o){se("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:D,status:F}),se("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(re){n("update-status failed: %o",re),se("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function st(D){switch(D){case"blocked-col":return y;case"ready-col":return $;case"in-progress-col":return g;case"resolved-col":return R;default:return[]}}function ct(D,F,re){if(!o||!a)return;let ae=st(D),le=ae.find(ee=>ee.id===F);if(!le)return;let ge=ae.filter(ee=>ee.id!==F),u=re.closest?re.closest(".board-card"):null,b=ge.length;if(u){let ee=u.getAttribute("data-issue-id");if(ee===F)return;let Z=ge.findIndex(me=>me.id===ee);Z>=0&&(b=Z)}let I=ge.slice();I.splice(b,0,le),v.applyReorder(F,I,b)}function gt(){for(let D of Array.from(e.querySelectorAll(".board-column--drag-over")))D.classList.remove("board-column--drag-over")}let Be=null;e.addEventListener("dragover",D=>{D.preventDefault(),D.dataTransfer&&(D.dataTransfer.dropEffect="move");let re=D.target.closest(".board-column");re&&re!==Be&&(Be&&Be.classList.remove("board-column--drag-over"),re.classList.add("board-column--drag-over"),Be=re)}),e.addEventListener("dragleave",D=>{let F=D.relatedTarget;(!F||!e.contains(F))&&Be&&(Be.classList.remove("board-column--drag-over"),Be=null)}),e.addEventListener("drop",D=>{D.preventDefault(),Be&&(Be.classList.remove("board-column--drag-over"),Be=null);let F=D.target,re=F.closest(".board-column");if(!re)return;let ae=D.dataTransfer?.getData("text/plain")||"";if(!ae)return;let le=re.id,ge=M.get(ae);if(ge&&ge===le){if(bl.has(le)){if(E!=="manual"){se("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}ct(le,ae,F)}return}let u=gl[le];if(!u){se("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}S.get(ae)!==u&&Qe(ae,u)}),e.addEventListener("keydown",D=>{let F=D.target;if(!(F instanceof HTMLElement))return;let re=String(F.tagName||"").toLowerCase();if(re==="input"||re==="textarea"||re==="select"||re==="button"||re==="a"||F.isContentEditable===!0)return;let ae=F.closest(".board-card");if(!ae)return;let le=String(D.key||"");if(le==="Enter"||le===" "){D.preventDefault();let I=ae.getAttribute("data-issue-id");I&&r(I);return}if(le!=="ArrowUp"&&le!=="ArrowDown"&&le!=="ArrowLeft"&&le!=="ArrowRight")return;D.preventDefault();let ge=ae.closest(".board-column");if(!ge)return;let u=Array.from(ge.querySelectorAll(".board-card")),b=u.indexOf(ae);if(le==="ArrowDown"&&b<u.length-1){dt(ae,u[b+1]);return}if(le==="ArrowUp"&&b>0){dt(ae,u[b-1]);return}if(le==="ArrowLeft"||le==="ArrowRight"){let I=Array.from(e.querySelectorAll(".board-column")),ee=I.indexOf(ge),Z=le==="ArrowRight"?1:-1,me=ee+Z;for(;me>=0&&me<I.length;){let Ae=I[me].querySelector(".board-card");if(Ae){dt(ae,Ae);return}me+=Z}}});function dt(D,F){try{D.tabIndex=-1,F.tabIndex=0,F.focus()}catch{}}let je=null;_&&_.subscribe&&(je=_.subscribe(()=>{try{A()}catch{}}));let Je=null;return c&&c.subscribe&&(Je=c.subscribe(()=>{try{A()}catch{}})),{async load(){n("load"),A()},clear(){$e(),ze(),je&&(je(),je=null),Je&&(Je(),Je=null),e.replaceChildren(),y=[],$=[],g=[],R=[],W=[],H=[],S=new Map,M=new Map}}}function zr(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function Tn(e,t){return e.filter(n=>{let r=zr(n);return!(r&&t.has(r))})}async function wl(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let n=!1;try{n=document.execCommand("copy")}finally{t.remove()}return n}catch{return!1}}async function en(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let n=document.createElement("textarea");n.value=t,n.style.position="fixed",n.style.left="-9999px",document.body.appendChild(n),n.select();let r=!1;try{r=document.execCommand("copy")}finally{n.remove()}return r}catch{return!1}}var kl="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function tn(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var Mt=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"];function Do(e){let t=0;for(let n of Mt)t+=tn(e?.[n]);return t}function Oo(e){return!e||typeof e!="object"?!1:Mt.some(t=>Number.isFinite(e[t]))}function yl(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function mn(e){return Oo(e)?`\u03C4 ${yl(Do(e))}`:null}function $t(e){let t=mn(e);if(!t)return null;let n=e?.total_cost_usd;return typeof n=="number"&&Number.isFinite(n)?`${t} \xB7 $${n.toFixed(2)}`:t}function gn(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${tn(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${tn(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${tn(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${tn(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let n=[`\uCD1D ${Do(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&n.push(kl),n.join(`
`)}function Rt(e,t){let n={input_tokens:0,output_tokens:0,cache_read_input_tokens:0,cache_creation_input_tokens:0},r=0,s=0,o=0,a=!1;for(let c of Object.values(e||{})){if(!c||c.bead_id!==t)continue;let i=c.usage;if(Oo(i)){r+=1;for(let d of Mt)n[d]=tn(n[d])+tn(i[d]);typeof i.total_cost_usd=="number"&&Number.isFinite(i.total_cost_usd)&&(s+=i.total_cost_usd,o+=1),i.replayed===!0&&(a=!0)}}return r===0?null:(o===r&&(n.total_cost_usd=s),a&&(n.replayed=!0),n)}var{entries:Ho,setPrototypeOf:Mo,isFrozen:$l,getPrototypeOf:xl,getOwnPropertyDescriptor:Sl}=Object,{freeze:pt,seal:kt,create:Kr}=Object,{apply:Zr,construct:Xr}=typeof Reflect<"u"&&Reflect;pt||(pt=function(t){return t});kt||(kt=function(t){return t});Zr||(Zr=function(t,n){for(var r=arguments.length,s=new Array(r>2?r-2:0),o=2;o<r;o++)s[o-2]=arguments[o];return t.apply(n,s)});Xr||(Xr=function(t){for(var n=arguments.length,r=new Array(n>1?n-1:0),s=1;s<n;s++)r[s-1]=arguments[s];return new t(...r)});var ir=ft(Array.prototype.forEach),Al=ft(Array.prototype.lastIndexOf),No=ft(Array.prototype.pop),En=ft(Array.prototype.push),Tl=ft(Array.prototype.splice),cr=ft(String.prototype.toLowerCase),Hr=ft(String.prototype.toString),Wr=ft(String.prototype.match),Cn=ft(String.prototype.replace),El=ft(String.prototype.indexOf),Cl=ft(String.prototype.trim),xt=ft(Object.prototype.hasOwnProperty),ut=ft(RegExp.prototype.test),Rn=Rl(TypeError);function ft(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,r=new Array(n>1?n-1:0),s=1;s<n;s++)r[s-1]=arguments[s];return Zr(e,t,r)}}function Rl(e){return function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return Xr(e,n)}}function ye(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:cr;Mo&&Mo(e,null);let r=t.length;for(;r--;){let s=t[r];if(typeof s=="string"){let o=n(s);o!==s&&($l(t)||(t[r]=o),s=o)}e[s]=!0}return e}function Il(e){for(let t=0;t<e.length;t++)xt(e,t)||(e[t]=null);return e}function Nt(e){let t=Kr(null);for(let[n,r]of Ho(e))xt(e,n)&&(Array.isArray(r)?t[n]=Il(r):r&&typeof r=="object"&&r.constructor===Object?t[n]=Nt(r):t[n]=r);return t}function In(e,t){for(;e!==null;){let r=Sl(e,t);if(r){if(r.get)return ft(r.get);if(typeof r.value=="function")return ft(r.value)}e=xl(e)}function n(){return null}return n}var Po=pt(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Gr=pt(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),jr=pt(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Ll=pt(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Yr=pt(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Dl=pt(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Fo=pt(["#text"]),qo=pt(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),Vr=pt(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Bo=pt(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),lr=pt(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Ol=kt(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Ml=kt(/<%[\w\W]*|[\w\W]*%>/gm),Nl=kt(/\$\{[\w\W]*/gm),Pl=kt(/^data-[\-\w.\u00B7-\uFFFF]+$/),Fl=kt(/^aria-[\-\w]+$/),Wo=kt(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),ql=kt(/^(?:\w+script|data):/i),Bl=kt(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Go=kt(/^html$/i),Ul=kt(/^[a-z][.\w]*(-[.\w]+)+$/i),Uo=Object.freeze({__proto__:null,ARIA_ATTR:Fl,ATTR_WHITESPACE:Bl,CUSTOM_ELEMENT:Ul,DATA_ATTR:Pl,DOCTYPE_NAME:Go,ERB_EXPR:Ml,IS_ALLOWED_URI:Wo,IS_SCRIPT_OR_DATA:ql,MUSTACHE_EXPR:Ol,TMPLIT_EXPR:Nl}),Ln={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},zl=function(){return typeof window>"u"?null:window},Hl=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let r=null,s="data-tt-policy-suffix";n&&n.hasAttribute(s)&&(r=n.getAttribute(s));let o="dompurify"+(r?"#"+r:"");try{return t.createPolicy(o,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},zo=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function jo(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:zl(),t=L=>jo(L);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==Ln.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e,r=n,s=r.currentScript,{DocumentFragment:o,HTMLTemplateElement:a,Node:c,Element:i,NodeFilter:d,NamedNodeMap:f=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:_,DOMParser:v,trustedTypes:y}=e,$=i.prototype,g=In($,"cloneNode"),R=In($,"remove"),W=In($,"nextSibling"),H=In($,"childNodes"),Y=In($,"parentNode");if(typeof a=="function"){let L=n.createElement("template");L.content&&L.content.ownerDocument&&(n=L.content.ownerDocument)}let N,E="",{implementation:S,createNodeIterator:M,createDocumentFragment:x,getElementsByTagName:j}=n,{importNode:V}=r,X=zo();t.isSupported=typeof Ho=="function"&&typeof Y=="function"&&S&&S.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:oe,ERB_EXPR:De,TMPLIT_EXPR:We,DATA_ATTR:Se,ARIA_ATTR:J,IS_SCRIPT_OR_DATA:te,ATTR_WHITESPACE:A,CUSTOM_ELEMENT:T}=Uo,{IS_ALLOWED_URI:Q}=Uo,ne=null,ce=ye({},[...Po,...Gr,...jr,...Yr,...Fo]),fe=null,Re=ye({},[...qo,...Vr,...Bo,...lr]),he=Object.seal(Kr(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Ee=null,Fe=null,Oe=Object.seal(Kr(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),Ge=!0,at=!0,P=!1,G=!0,O=!1,de=!0,ue=!1,be=!1,pe=!1,$e=!1,Ie=!1,nt=!1,ze=!0,Ke=!1,it="user-content-",lt=!0,ke=!1,rt={},Qe=null,st=ye({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),ct=null,gt=ye({},["audio","video","img","source","image","track"]),Be=null,dt=ye({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),je="http://www.w3.org/1998/Math/MathML",Je="http://www.w3.org/2000/svg",D="http://www.w3.org/1999/xhtml",F=D,re=!1,ae=null,le=ye({},[je,Je,D],Hr),ge=ye({},["mi","mo","mn","ms","mtext"]),u=ye({},["annotation-xml"]),b=ye({},["title","style","font","a","script"]),I=null,ee=["application/xhtml+xml","text/html"],Z="text/html",me=null,Ae=null,Me=n.createElement("form"),Ye=function(p){return p instanceof RegExp||p instanceof Function},we=function(){let p=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(Ae&&Ae===p)){if((!p||typeof p!="object")&&(p={}),p=Nt(p),I=ee.indexOf(p.PARSER_MEDIA_TYPE)===-1?Z:p.PARSER_MEDIA_TYPE,me=I==="application/xhtml+xml"?Hr:cr,ne=xt(p,"ALLOWED_TAGS")?ye({},p.ALLOWED_TAGS,me):ce,fe=xt(p,"ALLOWED_ATTR")?ye({},p.ALLOWED_ATTR,me):Re,ae=xt(p,"ALLOWED_NAMESPACES")?ye({},p.ALLOWED_NAMESPACES,Hr):le,Be=xt(p,"ADD_URI_SAFE_ATTR")?ye(Nt(dt),p.ADD_URI_SAFE_ATTR,me):dt,ct=xt(p,"ADD_DATA_URI_TAGS")?ye(Nt(gt),p.ADD_DATA_URI_TAGS,me):gt,Qe=xt(p,"FORBID_CONTENTS")?ye({},p.FORBID_CONTENTS,me):st,Ee=xt(p,"FORBID_TAGS")?ye({},p.FORBID_TAGS,me):Nt({}),Fe=xt(p,"FORBID_ATTR")?ye({},p.FORBID_ATTR,me):Nt({}),rt=xt(p,"USE_PROFILES")?p.USE_PROFILES:!1,Ge=p.ALLOW_ARIA_ATTR!==!1,at=p.ALLOW_DATA_ATTR!==!1,P=p.ALLOW_UNKNOWN_PROTOCOLS||!1,G=p.ALLOW_SELF_CLOSE_IN_ATTR!==!1,O=p.SAFE_FOR_TEMPLATES||!1,de=p.SAFE_FOR_XML!==!1,ue=p.WHOLE_DOCUMENT||!1,$e=p.RETURN_DOM||!1,Ie=p.RETURN_DOM_FRAGMENT||!1,nt=p.RETURN_TRUSTED_TYPE||!1,pe=p.FORCE_BODY||!1,ze=p.SANITIZE_DOM!==!1,Ke=p.SANITIZE_NAMED_PROPS||!1,lt=p.KEEP_CONTENT!==!1,ke=p.IN_PLACE||!1,Q=p.ALLOWED_URI_REGEXP||Wo,F=p.NAMESPACE||D,ge=p.MATHML_TEXT_INTEGRATION_POINTS||ge,u=p.HTML_INTEGRATION_POINTS||u,he=p.CUSTOM_ELEMENT_HANDLING||{},p.CUSTOM_ELEMENT_HANDLING&&Ye(p.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(he.tagNameCheck=p.CUSTOM_ELEMENT_HANDLING.tagNameCheck),p.CUSTOM_ELEMENT_HANDLING&&Ye(p.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(he.attributeNameCheck=p.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),p.CUSTOM_ELEMENT_HANDLING&&typeof p.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(he.allowCustomizedBuiltInElements=p.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),O&&(at=!1),Ie&&($e=!0),rt&&(ne=ye({},Fo),fe=[],rt.html===!0&&(ye(ne,Po),ye(fe,qo)),rt.svg===!0&&(ye(ne,Gr),ye(fe,Vr),ye(fe,lr)),rt.svgFilters===!0&&(ye(ne,jr),ye(fe,Vr),ye(fe,lr)),rt.mathMl===!0&&(ye(ne,Yr),ye(fe,Bo),ye(fe,lr))),p.ADD_TAGS&&(typeof p.ADD_TAGS=="function"?Oe.tagCheck=p.ADD_TAGS:(ne===ce&&(ne=Nt(ne)),ye(ne,p.ADD_TAGS,me))),p.ADD_ATTR&&(typeof p.ADD_ATTR=="function"?Oe.attributeCheck=p.ADD_ATTR:(fe===Re&&(fe=Nt(fe)),ye(fe,p.ADD_ATTR,me))),p.ADD_URI_SAFE_ATTR&&ye(Be,p.ADD_URI_SAFE_ATTR,me),p.FORBID_CONTENTS&&(Qe===st&&(Qe=Nt(Qe)),ye(Qe,p.FORBID_CONTENTS,me)),lt&&(ne["#text"]=!0),ue&&ye(ne,["html","head","body"]),ne.table&&(ye(ne,["tbody"]),delete Ee.tbody),p.TRUSTED_TYPES_POLICY){if(typeof p.TRUSTED_TYPES_POLICY.createHTML!="function")throw Rn('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof p.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Rn('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');N=p.TRUSTED_TYPES_POLICY,E=N.createHTML("")}else N===void 0&&(N=Hl(y,s)),N!==null&&typeof E=="string"&&(E=N.createHTML(""));pt&&pt(p),Ae=p}},h=ye({},[...Gr,...jr,...Ll]),q=ye({},[...Yr,...Dl]),B=function(p){let C=Y(p);(!C||!C.tagName)&&(C={namespaceURI:F,tagName:"template"});let U=cr(p.tagName),xe=cr(C.tagName);return ae[p.namespaceURI]?p.namespaceURI===Je?C.namespaceURI===D?U==="svg":C.namespaceURI===je?U==="svg"&&(xe==="annotation-xml"||ge[xe]):!!h[U]:p.namespaceURI===je?C.namespaceURI===D?U==="math":C.namespaceURI===Je?U==="math"&&u[xe]:!!q[U]:p.namespaceURI===D?C.namespaceURI===Je&&!u[xe]||C.namespaceURI===je&&!ge[xe]?!1:!q[U]&&(b[U]||!h[U]):!!(I==="application/xhtml+xml"&&ae[p.namespaceURI]):!1},K=function(p){En(t.removed,{element:p});try{Y(p).removeChild(p)}catch{R(p)}},qe=function(p,C){try{En(t.removed,{attribute:C.getAttributeNode(p),from:C})}catch{En(t.removed,{attribute:null,from:C})}if(C.removeAttribute(p),p==="is")if($e||Ie)try{K(C)}catch{}else try{C.setAttribute(p,"")}catch{}},_e=function(p){let C=null,U=null;if(pe)p="<remove></remove>"+p;else{let He=Wr(p,/^[\r\n\t ]+/);U=He&&He[0]}I==="application/xhtml+xml"&&F===D&&(p='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+p+"</body></html>");let xe=N?N.createHTML(p):p;if(F===D)try{C=new v().parseFromString(xe,I)}catch{}if(!C||!C.documentElement){C=S.createDocument(F,"template",null);try{C.documentElement.innerHTML=re?E:xe}catch{}}let et=C.body||C.documentElement;return p&&U&&et.insertBefore(n.createTextNode(U),et.childNodes[0]||null),F===D?j.call(C,ue?"html":"body")[0]:ue?C.documentElement:et},ve=function(p){return M.call(p.ownerDocument||p,p,d.SHOW_ELEMENT|d.SHOW_COMMENT|d.SHOW_TEXT|d.SHOW_PROCESSING_INSTRUCTION|d.SHOW_CDATA_SECTION,null)},tt=function(p){return p instanceof _&&(typeof p.nodeName!="string"||typeof p.textContent!="string"||typeof p.removeChild!="function"||!(p.attributes instanceof f)||typeof p.removeAttribute!="function"||typeof p.setAttribute!="function"||typeof p.namespaceURI!="string"||typeof p.insertBefore!="function"||typeof p.hasChildNodes!="function")},jt=function(p){return typeof c=="function"&&p instanceof c};function ht(L,p,C){ir(L,U=>{U.call(t,p,C,Ae)})}let Ft=function(p){let C=null;if(ht(X.beforeSanitizeElements,p,null),tt(p))return K(p),!0;let U=me(p.nodeName);if(ht(X.uponSanitizeElement,p,{tagName:U,allowedTags:ne}),de&&p.hasChildNodes()&&!jt(p.firstElementChild)&&ut(/<[/\w!]/g,p.innerHTML)&&ut(/<[/\w!]/g,p.textContent)||p.nodeType===Ln.progressingInstruction||de&&p.nodeType===Ln.comment&&ut(/<[/\w]/g,p.data))return K(p),!0;if(!(Oe.tagCheck instanceof Function&&Oe.tagCheck(U))&&(!ne[U]||Ee[U])){if(!Ee[U]&&Bt(U)&&(he.tagNameCheck instanceof RegExp&&ut(he.tagNameCheck,U)||he.tagNameCheck instanceof Function&&he.tagNameCheck(U)))return!1;if(lt&&!Qe[U]){let xe=Y(p)||p.parentNode,et=H(p)||p.childNodes;if(et&&xe){let He=et.length;for(let Ze=He-1;Ze>=0;--Ze){let bt=g(et[Ze],!0);bt.__removalCount=(p.__removalCount||0)+1,xe.insertBefore(bt,W(p))}}}return K(p),!0}return p instanceof i&&!B(p)||(U==="noscript"||U==="noembed"||U==="noframes")&&ut(/<\/no(script|embed|frames)/i,p.innerHTML)?(K(p),!0):(O&&p.nodeType===Ln.text&&(C=p.textContent,ir([oe,De,We],xe=>{C=Cn(C,xe," ")}),p.textContent!==C&&(En(t.removed,{element:p.cloneNode()}),p.textContent=C)),ht(X.afterSanitizeElements,p,null),!1)},qt=function(p,C,U){if(ze&&(C==="id"||C==="name")&&(U in n||U in Me))return!1;if(!(at&&!Fe[C]&&ut(Se,C))){if(!(Ge&&ut(J,C))){if(!(Oe.attributeCheck instanceof Function&&Oe.attributeCheck(C,p))){if(!fe[C]||Fe[C]){if(!(Bt(p)&&(he.tagNameCheck instanceof RegExp&&ut(he.tagNameCheck,p)||he.tagNameCheck instanceof Function&&he.tagNameCheck(p))&&(he.attributeNameCheck instanceof RegExp&&ut(he.attributeNameCheck,C)||he.attributeNameCheck instanceof Function&&he.attributeNameCheck(C,p))||C==="is"&&he.allowCustomizedBuiltInElements&&(he.tagNameCheck instanceof RegExp&&ut(he.tagNameCheck,U)||he.tagNameCheck instanceof Function&&he.tagNameCheck(U))))return!1}else if(!Be[C]){if(!ut(Q,Cn(U,A,""))){if(!((C==="src"||C==="xlink:href"||C==="href")&&p!=="script"&&El(U,"data:")===0&&ct[p])){if(!(P&&!ut(te,Cn(U,A,"")))){if(U)return!1}}}}}}}return!0},Bt=function(p){return p!=="annotation-xml"&&Wr(p,T)},m=function(p){ht(X.beforeSanitizeAttributes,p,null);let{attributes:C}=p;if(!C||tt(p))return;let U={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:fe,forceKeepAttr:void 0},xe=C.length;for(;xe--;){let et=C[xe],{name:He,namespaceURI:Ze,value:bt}=et,Lt=me(He),sn=bt,Xe=He==="value"?sn:Cl(sn);if(U.attrName=Lt,U.attrValue=Xe,U.keepAttr=!0,U.forceKeepAttr=void 0,ht(X.uponSanitizeAttribute,p,U),Xe=U.attrValue,Ke&&(Lt==="id"||Lt==="name")&&(qe(He,p),Xe=it+Xe),de&&ut(/((--!?|])>)|<\/(style|title|textarea)/i,Xe)){qe(He,p);continue}if(Lt==="attributename"&&Wr(Xe,"href")){qe(He,p);continue}if(U.forceKeepAttr)continue;if(!U.keepAttr){qe(He,p);continue}if(!G&&ut(/\/>/i,Xe)){qe(He,p);continue}O&&ir([oe,De,We],Gn=>{Xe=Cn(Xe,Gn," ")});let on=me(p.nodeName);if(!qt(on,Lt,Xe)){qe(He,p);continue}if(N&&typeof y=="object"&&typeof y.getAttributeType=="function"&&!Ze)switch(y.getAttributeType(on,Lt)){case"TrustedHTML":{Xe=N.createHTML(Xe);break}case"TrustedScriptURL":{Xe=N.createScriptURL(Xe);break}}if(Xe!==sn)try{Ze?p.setAttributeNS(Ze,He,Xe):p.setAttribute(He,Xe),tt(p)?K(p):No(t.removed)}catch{qe(He,p)}}ht(X.afterSanitizeAttributes,p,null)},w=function L(p){let C=null,U=ve(p);for(ht(X.beforeSanitizeShadowDOM,p,null);C=U.nextNode();)ht(X.uponSanitizeShadowNode,C,null),Ft(C),m(C),C.content instanceof o&&L(C.content);ht(X.afterSanitizeShadowDOM,p,null)};return t.sanitize=function(L){let p=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},C=null,U=null,xe=null,et=null;if(re=!L,re&&(L="<!-->"),typeof L!="string"&&!jt(L))if(typeof L.toString=="function"){if(L=L.toString(),typeof L!="string")throw Rn("dirty is not a string, aborting")}else throw Rn("toString is not a function");if(!t.isSupported)return L;if(be||we(p),t.removed=[],typeof L=="string"&&(ke=!1),ke){if(L.nodeName){let bt=me(L.nodeName);if(!ne[bt]||Ee[bt])throw Rn("root node is forbidden and cannot be sanitized in-place")}}else if(L instanceof c)C=_e("<!---->"),U=C.ownerDocument.importNode(L,!0),U.nodeType===Ln.element&&U.nodeName==="BODY"||U.nodeName==="HTML"?C=U:C.appendChild(U);else{if(!$e&&!O&&!ue&&L.indexOf("<")===-1)return N&&nt?N.createHTML(L):L;if(C=_e(L),!C)return $e?null:nt?E:""}C&&pe&&K(C.firstChild);let He=ve(ke?L:C);for(;xe=He.nextNode();)Ft(xe),m(xe),xe.content instanceof o&&w(xe.content);if(ke)return L;if($e){if(Ie)for(et=x.call(C.ownerDocument);C.firstChild;)et.appendChild(C.firstChild);else et=C;return(fe.shadowroot||fe.shadowrootmode)&&(et=V.call(r,et,!0)),et}let Ze=ue?C.outerHTML:C.innerHTML;return ue&&ne["!doctype"]&&C.ownerDocument&&C.ownerDocument.doctype&&C.ownerDocument.doctype.name&&ut(Go,C.ownerDocument.doctype.name)&&(Ze="<!DOCTYPE "+C.ownerDocument.doctype.name+`>
`+Ze),O&&ir([oe,De,We],bt=>{Ze=Cn(Ze,bt," ")}),N&&nt?N.createHTML(Ze):Ze},t.setConfig=function(){let L=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};we(L),be=!0},t.clearConfig=function(){Ae=null,be=!1},t.isValidAttribute=function(L,p,C){Ae||we({});let U=me(L),xe=me(p);return qt(U,xe,C)},t.addHook=function(L,p){typeof p=="function"&&En(X[L],p)},t.removeHook=function(L,p){if(p!==void 0){let C=Al(X[L],p);return C===-1?void 0:Tl(X[L],C,1)[0]}return No(X[L])},t.removeHooks=function(L){X[L]=[]},t.removeAllHooks=function(){X=zo()},t}var Yo=jo();var Vo={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Ko=e=>(...t)=>({_$litDirective$:e,values:t}),dr=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,n,r){this._$Ct=t,this._$AM=n,this._$Ci=r}_$AS(t,n){return this.update(t,n)}update(t,n){return this.render(...n)}};var Dn=class extends dr{constructor(t){if(super(t),this.it=Ve,t.type!==Vo.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===Ve||t==null)return this._t=void 0,this.it=t;if(t===Zt)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let n=[t];return n.raw=n,this._t={_$litType$:this.constructor.resultType,strings:n,values:[]}}};Dn.directiveName="unsafeHTML",Dn.resultType=1;var Zo=Ko(Dn);function ts(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var rn=ts();function ra(e){rn=e}var Pn={exec:()=>null};function Te(e,t=""){let n=typeof e=="string"?e:e.source,r={replace:(s,o)=>{let a=typeof o=="string"?o:o.source;return a=a.replace(_t.caret,"$1"),n=n.replace(s,a),r},getRegex:()=>new RegExp(n,t)};return r}var Wl=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),_t={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},Gl=/^(?:[ \t]*(?:\n|$))+/,jl=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Yl=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,Fn=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Vl=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,ns=/(?:[*+-]|\d{1,9}[.)])/,sa=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,oa=Te(sa).replace(/bull/g,ns).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Kl=Te(sa).replace(/bull/g,ns).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),rs=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Zl=/^[^\n]+/,ss=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,Xl=Te(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",ss).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Ql=Te(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,ns).getRegex(),mr="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",os=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Jl=Te("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",os).replace("tag",mr).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),aa=Te(rs).replace("hr",Fn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",mr).getRegex(),ec=Te(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",aa).getRegex(),as={blockquote:ec,code:jl,def:Xl,fences:Yl,heading:Vl,hr:Fn,html:Jl,lheading:oa,list:Ql,newline:Gl,paragraph:aa,table:Pn,text:Zl},Xo=Te("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",Fn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",mr).getRegex(),tc={...as,lheading:Kl,table:Xo,paragraph:Te(rs).replace("hr",Fn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Xo).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",mr).getRegex()},nc={...as,html:Te(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",os).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Pn,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:Te(rs).replace("hr",Fn).replace("heading",` *#{1,6} *[^
]`).replace("lheading",oa).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},rc=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,sc=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,ia=/^( {2,}|\\)\n(?!\s*$)/,oc=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,gr=/[\p{P}\p{S}]/u,is=/[\s\p{P}\p{S}]/u,la=/[^\s\p{P}\p{S}]/u,ac=Te(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,is).getRegex(),ca=/(?!~)[\p{P}\p{S}]/u,ic=/(?!~)[\s\p{P}\p{S}]/u,lc=/(?:[^\s\p{P}\p{S}]|~)/u,cc=Te(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",Wl?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),da=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,dc=Te(da,"u").replace(/punct/g,gr).getRegex(),uc=Te(da,"u").replace(/punct/g,ca).getRegex(),ua="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",pc=Te(ua,"gu").replace(/notPunctSpace/g,la).replace(/punctSpace/g,is).replace(/punct/g,gr).getRegex(),fc=Te(ua,"gu").replace(/notPunctSpace/g,lc).replace(/punctSpace/g,ic).replace(/punct/g,ca).getRegex(),_c=Te("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,la).replace(/punctSpace/g,is).replace(/punct/g,gr).getRegex(),hc=Te(/\\(punct)/,"gu").replace(/punct/g,gr).getRegex(),mc=Te(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),gc=Te(os).replace("(?:-->|$)","-->").getRegex(),bc=Te("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",gc).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),fr=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,vc=Te(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",fr).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),pa=Te(/^!?\[(label)\]\[(ref)\]/).replace("label",fr).replace("ref",ss).getRegex(),fa=Te(/^!?\[(ref)\](?:\[\])?/).replace("ref",ss).getRegex(),wc=Te("reflink|nolink(?!\\()","g").replace("reflink",pa).replace("nolink",fa).getRegex(),Qo=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,ls={_backpedal:Pn,anyPunctuation:hc,autolink:mc,blockSkip:cc,br:ia,code:sc,del:Pn,emStrongLDelim:dc,emStrongRDelimAst:pc,emStrongRDelimUnd:_c,escape:rc,link:vc,nolink:fa,punctuation:ac,reflink:pa,reflinkSearch:wc,tag:bc,text:oc,url:Pn},kc={...ls,link:Te(/^!?\[(label)\]\((.*?)\)/).replace("label",fr).getRegex(),reflink:Te(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",fr).getRegex()},Qr={...ls,emStrongRDelimAst:fc,emStrongLDelim:uc,url:Te(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",Qo).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:Te(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",Qo).getRegex()},yc={...Qr,br:Te(ia).replace("{2,}","*").getRegex(),text:Te(Qr.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},ur={normal:as,gfm:tc,pedantic:nc},On={normal:ls,gfm:Qr,breaks:yc,pedantic:kc},$c={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Jo=e=>$c[e];function Pt(e,t){if(t){if(_t.escapeTest.test(e))return e.replace(_t.escapeReplace,Jo)}else if(_t.escapeTestNoEncode.test(e))return e.replace(_t.escapeReplaceNoEncode,Jo);return e}function ea(e){try{e=encodeURI(e).replace(_t.percentDecode,"%")}catch{return null}return e}function ta(e,t){let n=e.replace(_t.findPipe,(o,a,c)=>{let i=!1,d=a;for(;--d>=0&&c[d]==="\\";)i=!i;return i?"|":" |"}),r=n.split(_t.splitPipe),s=0;if(r[0].trim()||r.shift(),r.length>0&&!r.at(-1)?.trim()&&r.pop(),t)if(r.length>t)r.splice(t);else for(;r.length<t;)r.push("");for(;s<r.length;s++)r[s]=r[s].trim().replace(_t.slashPipe,"|");return r}function Mn(e,t,n){let r=e.length;if(r===0)return"";let s=0;for(;s<r;){let o=e.charAt(r-s-1);if(o===t&&!n)s++;else if(o!==t&&n)s++;else break}return e.slice(0,r-s)}function xc(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let r=0;r<e.length;r++)if(e[r]==="\\")r++;else if(e[r]===t[0])n++;else if(e[r]===t[1]&&(n--,n<0))return r;return n>0?-2:-1}function na(e,t,n,r,s){let o=t.href,a=t.title||null,c=e[1].replace(s.other.outputLinkReplace,"$1");r.state.inLink=!0;let i={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:o,title:a,text:c,tokens:r.inlineTokens(c)};return r.state.inLink=!1,i}function Sc(e,t,n){let r=e.match(n.other.indentCodeCompensation);if(r===null)return t;let s=r[1];return t.split(`
`).map(o=>{let a=o.match(n.other.beginningSpace);if(a===null)return o;let[c]=a;return c.length>=s.length?o.slice(s.length):o}).join(`
`)}var _r=class{constructor(e){Pe(this,"options");Pe(this,"rules");Pe(this,"lexer");this.options=e||rn}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:Mn(n,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let n=t[0],r=Sc(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:r}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){let r=Mn(n,"#");(this.options.pedantic||!r||this.rules.other.endingSpaceChar.test(r))&&(n=r.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:Mn(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let n=Mn(t[0],`
`).split(`
`),r="",s="",o=[];for(;n.length>0;){let a=!1,c=[],i;for(i=0;i<n.length;i++)if(this.rules.other.blockquoteStart.test(n[i]))c.push(n[i]),a=!0;else if(!a)c.push(n[i]);else break;n=n.slice(i);let d=c.join(`
`),f=d.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");r=r?`${r}
${d}`:d,s=s?`${s}
${f}`:f;let _=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(f,o,!0),this.lexer.state.top=_,n.length===0)break;let v=o.at(-1);if(v?.type==="code")break;if(v?.type==="blockquote"){let y=v,$=y.raw+`
`+n.join(`
`),g=this.blockquote($);o[o.length-1]=g,r=r.substring(0,r.length-y.raw.length)+g.raw,s=s.substring(0,s.length-y.text.length)+g.text;break}else if(v?.type==="list"){let y=v,$=y.raw+`
`+n.join(`
`),g=this.list($);o[o.length-1]=g,r=r.substring(0,r.length-v.raw.length)+g.raw,s=s.substring(0,s.length-y.raw.length)+g.raw,n=$.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:r,tokens:o,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim(),r=n.length>1,s={type:"list",raw:"",ordered:r,start:r?+n.slice(0,-1):"",loose:!1,items:[]};n=r?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=r?n:"[*+-]");let o=this.rules.other.listItemRegex(n),a=!1;for(;e;){let i=!1,d="",f="";if(!(t=o.exec(e))||this.rules.block.hr.test(e))break;d=t[0],e=e.substring(d.length);let _=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,g=>" ".repeat(3*g.length)),v=e.split(`
`,1)[0],y=!_.trim(),$=0;if(this.options.pedantic?($=2,f=_.trimStart()):y?$=t[1].length+1:($=t[2].search(this.rules.other.nonSpaceChar),$=$>4?1:$,f=_.slice($),$+=t[1].length),y&&this.rules.other.blankLine.test(v)&&(d+=v+`
`,e=e.substring(v.length+1),i=!0),!i){let g=this.rules.other.nextBulletRegex($),R=this.rules.other.hrRegex($),W=this.rules.other.fencesBeginRegex($),H=this.rules.other.headingBeginRegex($),Y=this.rules.other.htmlBeginRegex($);for(;e;){let N=e.split(`
`,1)[0],E;if(v=N,this.options.pedantic?(v=v.replace(this.rules.other.listReplaceNesting,"  "),E=v):E=v.replace(this.rules.other.tabCharGlobal,"    "),W.test(v)||H.test(v)||Y.test(v)||g.test(v)||R.test(v))break;if(E.search(this.rules.other.nonSpaceChar)>=$||!v.trim())f+=`
`+E.slice($);else{if(y||_.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||W.test(_)||H.test(_)||R.test(_))break;f+=`
`+v}!y&&!v.trim()&&(y=!0),d+=N+`
`,e=e.substring(N.length+1),_=E.slice($)}}s.loose||(a?s.loose=!0:this.rules.other.doubleBlankLine.test(d)&&(a=!0)),s.items.push({type:"list_item",raw:d,task:!!this.options.gfm&&this.rules.other.listIsTask.test(f),loose:!1,text:f,tokens:[]}),s.raw+=d}let c=s.items.at(-1);if(c)c.raw=c.raw.trimEnd(),c.text=c.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let i of s.items){if(this.lexer.state.top=!1,i.tokens=this.lexer.blockTokens(i.text,[]),i.task){if(i.text=i.text.replace(this.rules.other.listReplaceTask,""),i.tokens[0]?.type==="text"||i.tokens[0]?.type==="paragraph"){i.tokens[0].raw=i.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),i.tokens[0].text=i.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let f=this.lexer.inlineQueue.length-1;f>=0;f--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[f].src)){this.lexer.inlineQueue[f].src=this.lexer.inlineQueue[f].src.replace(this.rules.other.listReplaceTask,"");break}}let d=this.rules.other.listTaskCheckbox.exec(i.raw);if(d){let f={type:"checkbox",raw:d[0]+" ",checked:d[0]!=="[ ]"};i.checked=f.checked,s.loose?i.tokens[0]&&["paragraph","text"].includes(i.tokens[0].type)&&"tokens"in i.tokens[0]&&i.tokens[0].tokens?(i.tokens[0].raw=f.raw+i.tokens[0].raw,i.tokens[0].text=f.raw+i.tokens[0].text,i.tokens[0].tokens.unshift(f)):i.tokens.unshift({type:"paragraph",raw:f.raw,text:f.raw,tokens:[f]}):i.tokens.unshift(f)}}if(!s.loose){let d=i.tokens.filter(_=>_.type==="space"),f=d.length>0&&d.some(_=>this.rules.other.anyLine.test(_.raw));s.loose=f}}if(s.loose)for(let i of s.items){i.loose=!0;for(let d of i.tokens)d.type==="text"&&(d.type="paragraph")}return s}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),r=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:r,title:s}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let n=ta(t[1]),r=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===r.length){for(let a of r)this.rules.other.tableAlignRight.test(a)?o.align.push("right"):this.rules.other.tableAlignCenter.test(a)?o.align.push("center"):this.rules.other.tableAlignLeft.test(a)?o.align.push("left"):o.align.push(null);for(let a=0;a<n.length;a++)o.header.push({text:n[a],tokens:this.lexer.inline(n[a]),header:!0,align:o.align[a]});for(let a of s)o.rows.push(ta(a,o.header.length).map((c,i)=>({text:c,tokens:this.lexer.inline(c),header:!1,align:o.align[i]})));return o}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;let o=Mn(n.slice(0,-1),"\\");if((n.length-o.length)%2===0)return}else{let o=xc(t[2],"()");if(o===-2)return;if(o>-1){let a=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,a).trim(),t[3]=""}}let r=t[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(r);o&&(r=o[1],s=o[3])}else s=t[3]?t[3].slice(1,-1):"";return r=r.trim(),this.rules.other.startAngleBracket.test(r)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?r=r.slice(1):r=r.slice(1,-1)),na(t,{href:r&&r.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let r=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[r.toLowerCase()];if(!s){let o=n[0].charAt(0);return{type:"text",raw:o,text:o}}return na(n,s,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let r=this.rules.inline.emStrongLDelim.exec(e);if(!(!r||r[3]&&n.match(this.rules.other.unicodeAlphaNumeric))&&(!(r[1]||r[2])||!n||this.rules.inline.punctuation.exec(n))){let s=[...r[0]].length-1,o,a,c=s,i=0,d=r[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(d.lastIndex=0,t=t.slice(-1*e.length+s);(r=d.exec(t))!=null;){if(o=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!o)continue;if(a=[...o].length,r[3]||r[4]){c+=a;continue}else if((r[5]||r[6])&&s%3&&!((s+a)%3)){i+=a;continue}if(c-=a,c>0)continue;a=Math.min(a,a+c+i);let f=[...r[0]][0].length,_=e.slice(0,s+r.index+f+a);if(Math.min(s,a)%2){let y=_.slice(1,-1);return{type:"em",raw:_,text:y,tokens:this.lexer.inlineTokens(y)}}let v=_.slice(2,-2);return{type:"strong",raw:_,text:v,tokens:this.lexer.inlineTokens(v)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," "),r=this.rules.other.nonSpaceChar.test(n),s=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return r&&s&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let n,r;return t[2]==="@"?(n=t[1],r="mailto:"+n):(n=t[1],r=n),{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let n,r;if(t[2]==="@")n=t[0],r="mailto:"+n;else{let s;do s=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(s!==t[0]);n=t[0],t[1]==="www."?r="http://"+t[0]:r=t[0]}return{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},St=class Jr{constructor(t){Pe(this,"tokens");Pe(this,"options");Pe(this,"state");Pe(this,"inlineQueue");Pe(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||rn,this.options.tokenizer=this.options.tokenizer||new _r,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let n={other:_t,block:ur.normal,inline:On.normal};this.options.pedantic?(n.block=ur.pedantic,n.inline=On.pedantic):this.options.gfm&&(n.block=ur.gfm,this.options.breaks?n.inline=On.breaks:n.inline=On.gfm),this.tokenizer.rules=n}static get rules(){return{block:ur,inline:On}}static lex(t,n){return new Jr(n).lex(t)}static lexInline(t,n){return new Jr(n).inlineTokens(t)}lex(t){t=t.replace(_t.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){let r=this.inlineQueue[n];this.inlineTokens(r.src,r.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,n=[],r=!1){for(this.options.pedantic&&(t=t.replace(_t.tabCharGlobal,"    ").replace(_t.spaceLine,""));t;){let s;if(this.options.extensions?.block?.some(a=>(s=a.call({lexer:this},t,n))?(t=t.substring(s.raw.length),n.push(s),!0):!1))continue;if(s=this.tokenizer.space(t)){t=t.substring(s.raw.length);let a=n.at(-1);s.raw.length===1&&a!==void 0?a.raw+=`
`:n.push(s);continue}if(s=this.tokenizer.code(t)){t=t.substring(s.raw.length);let a=n.at(-1);a?.type==="paragraph"||a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.at(-1).src=a.text):n.push(s);continue}if(s=this.tokenizer.fences(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.heading(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.hr(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.blockquote(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.list(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.html(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.def(t)){t=t.substring(s.raw.length);let a=n.at(-1);a?.type==="paragraph"||a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.raw,this.inlineQueue.at(-1).src=a.text):this.tokens.links[s.tag]||(this.tokens.links[s.tag]={href:s.href,title:s.title},n.push(s));continue}if(s=this.tokenizer.table(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.lheading(t)){t=t.substring(s.raw.length),n.push(s);continue}let o=t;if(this.options.extensions?.startBlock){let a=1/0,c=t.slice(1),i;this.options.extensions.startBlock.forEach(d=>{i=d.call({lexer:this},c),typeof i=="number"&&i>=0&&(a=Math.min(a,i))}),a<1/0&&a>=0&&(o=t.substring(0,a+1))}if(this.state.top&&(s=this.tokenizer.paragraph(o))){let a=n.at(-1);r&&a?.type==="paragraph"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):n.push(s),r=o.length!==t.length,t=t.substring(s.raw.length);continue}if(s=this.tokenizer.text(t)){t=t.substring(s.raw.length);let a=n.at(-1);a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):n.push(s);continue}if(t){let a="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(a);break}else throw new Error(a)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){let r=t,s=null;if(this.tokens.links){let i=Object.keys(this.tokens.links);if(i.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(r))!=null;)i.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(r=r.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(r))!=null;)r=r.slice(0,s.index)+"++"+r.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(r))!=null;)o=s[2]?s[2].length:0,r=r.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+r.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);r=this.options.hooks?.emStrongMask?.call({lexer:this},r)??r;let a=!1,c="";for(;t;){a||(c=""),a=!1;let i;if(this.options.extensions?.inline?.some(f=>(i=f.call({lexer:this},t,n))?(t=t.substring(i.raw.length),n.push(i),!0):!1))continue;if(i=this.tokenizer.escape(t)){t=t.substring(i.raw.length),n.push(i);continue}if(i=this.tokenizer.tag(t)){t=t.substring(i.raw.length),n.push(i);continue}if(i=this.tokenizer.link(t)){t=t.substring(i.raw.length),n.push(i);continue}if(i=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(i.raw.length);let f=n.at(-1);i.type==="text"&&f?.type==="text"?(f.raw+=i.raw,f.text+=i.text):n.push(i);continue}if(i=this.tokenizer.emStrong(t,r,c)){t=t.substring(i.raw.length),n.push(i);continue}if(i=this.tokenizer.codespan(t)){t=t.substring(i.raw.length),n.push(i);continue}if(i=this.tokenizer.br(t)){t=t.substring(i.raw.length),n.push(i);continue}if(i=this.tokenizer.del(t)){t=t.substring(i.raw.length),n.push(i);continue}if(i=this.tokenizer.autolink(t)){t=t.substring(i.raw.length),n.push(i);continue}if(!this.state.inLink&&(i=this.tokenizer.url(t))){t=t.substring(i.raw.length),n.push(i);continue}let d=t;if(this.options.extensions?.startInline){let f=1/0,_=t.slice(1),v;this.options.extensions.startInline.forEach(y=>{v=y.call({lexer:this},_),typeof v=="number"&&v>=0&&(f=Math.min(f,v))}),f<1/0&&f>=0&&(d=t.substring(0,f+1))}if(i=this.tokenizer.inlineText(d)){t=t.substring(i.raw.length),i.raw.slice(-1)!=="_"&&(c=i.raw.slice(-1)),a=!0;let f=n.at(-1);f?.type==="text"?(f.raw+=i.raw,f.text+=i.text):n.push(i);continue}if(t){let f="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(f);break}else throw new Error(f)}}return n}},hr=class{constructor(e){Pe(this,"options");Pe(this,"parser");this.options=e||rn}space(e){return""}code({text:e,lang:t,escaped:n}){let r=(t||"").match(_t.notSpaceStart)?.[0],s=e.replace(_t.endingNewline,"")+`
`;return r?'<pre><code class="language-'+Pt(r)+'">'+(n?s:Pt(s,!0))+`</code></pre>
`:"<pre><code>"+(n?s:Pt(s,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}def(e){return""}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return`<hr>
`}list(e){let t=e.ordered,n=e.start,r="";for(let a=0;a<e.items.length;a++){let c=e.items[a];r+=this.listitem(c)}let s=t?"ol":"ul",o=t&&n!==1?' start="'+n+'"':"";return"<"+s+o+`>
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${Pt(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){let r=this.parser.parseInline(n),s=ea(e);if(s===null)return r;e=s;let o='<a href="'+e+'"';return t&&(o+=' title="'+Pt(t)+'"'),o+=">"+r+"</a>",o}image({href:e,title:t,text:n,tokens:r}){r&&(n=this.parser.parseInline(r,this.parser.textRenderer));let s=ea(e);if(s===null)return Pt(n);e=s;let o=`<img src="${e}" alt="${n}"`;return t&&(o+=` title="${Pt(t)}"`),o+=">",o}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:Pt(e.text)}},cs=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},At=class es{constructor(t){Pe(this,"options");Pe(this,"renderer");Pe(this,"textRenderer");this.options=t||rn,this.options.renderer=this.options.renderer||new hr,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new cs}static parse(t,n){return new es(n).parse(t)}static parseInline(t,n){return new es(n).parseInline(t)}parse(t){let n="";for(let r=0;r<t.length;r++){let s=t[r];if(this.options.extensions?.renderers?.[s.type]){let a=s,c=this.options.extensions.renderers[a.type].call({parser:this},a);if(c!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(a.type)){n+=c||"";continue}}let o=s;switch(o.type){case"space":{n+=this.renderer.space(o);break}case"hr":{n+=this.renderer.hr(o);break}case"heading":{n+=this.renderer.heading(o);break}case"code":{n+=this.renderer.code(o);break}case"table":{n+=this.renderer.table(o);break}case"blockquote":{n+=this.renderer.blockquote(o);break}case"list":{n+=this.renderer.list(o);break}case"checkbox":{n+=this.renderer.checkbox(o);break}case"html":{n+=this.renderer.html(o);break}case"def":{n+=this.renderer.def(o);break}case"paragraph":{n+=this.renderer.paragraph(o);break}case"text":{n+=this.renderer.text(o);break}default:{let a='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return n}parseInline(t,n=this.renderer){let r="";for(let s=0;s<t.length;s++){let o=t[s];if(this.options.extensions?.renderers?.[o.type]){let c=this.options.extensions.renderers[o.type].call({parser:this},o);if(c!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){r+=c||"";continue}}let a=o;switch(a.type){case"escape":{r+=n.text(a);break}case"html":{r+=n.html(a);break}case"link":{r+=n.link(a);break}case"image":{r+=n.image(a);break}case"checkbox":{r+=n.checkbox(a);break}case"strong":{r+=n.strong(a);break}case"em":{r+=n.em(a);break}case"codespan":{r+=n.codespan(a);break}case"br":{r+=n.br(a);break}case"del":{r+=n.del(a);break}case"text":{r+=n.text(a);break}default:{let c='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(c),"";throw new Error(c)}}}return r}},pr,Nn=(pr=class{constructor(e){Pe(this,"options");Pe(this,"block");this.options=e||rn}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?St.lex:St.lexInline}provideParser(){return this.block?At.parse:At.parseInline}},Pe(pr,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),Pe(pr,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),pr),Ac=class{constructor(...e){Pe(this,"defaults",ts());Pe(this,"options",this.setOptions);Pe(this,"parse",this.parseMarkdown(!0));Pe(this,"parseInline",this.parseMarkdown(!1));Pe(this,"Parser",At);Pe(this,"Renderer",hr);Pe(this,"TextRenderer",cs);Pe(this,"Lexer",St);Pe(this,"Tokenizer",_r);Pe(this,"Hooks",Nn);this.use(...e)}walkTokens(e,t){let n=[];for(let r of e)switch(n=n.concat(t.call(this,r)),r.type){case"table":{let s=r;for(let o of s.header)n=n.concat(this.walkTokens(o.tokens,t));for(let o of s.rows)for(let a of o)n=n.concat(this.walkTokens(a.tokens,t));break}case"list":{let s=r;n=n.concat(this.walkTokens(s.items,t));break}default:{let s=r;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let a=s[o].flat(1/0);n=n.concat(this.walkTokens(a,t))}):s.tokens&&(n=n.concat(this.walkTokens(s.tokens,t)))}}return n}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{let r={...n};if(r.async=this.defaults.async||r.async||!1,n.extensions&&(n.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=t.renderers[s.name];o?t.renderers[s.name]=function(...a){let c=s.renderer.apply(this,a);return c===!1&&(c=o.apply(this,a)),c}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=t[s.level];o?o.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),r.extensions=t),n.renderer){let s=this.defaults.renderer||new hr(this.defaults);for(let o in n.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let a=o,c=n.renderer[a],i=s[a];s[a]=(...d)=>{let f=c.apply(s,d);return f===!1&&(f=i.apply(s,d)),f||""}}r.renderer=s}if(n.tokenizer){let s=this.defaults.tokenizer||new _r(this.defaults);for(let o in n.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let a=o,c=n.tokenizer[a],i=s[a];s[a]=(...d)=>{let f=c.apply(s,d);return f===!1&&(f=i.apply(s,d)),f}}r.tokenizer=s}if(n.hooks){let s=this.defaults.hooks||new Nn;for(let o in n.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let a=o,c=n.hooks[a],i=s[a];Nn.passThroughHooks.has(o)?s[a]=d=>{if(this.defaults.async&&Nn.passThroughHooksRespectAsync.has(o))return(async()=>{let _=await c.call(s,d);return i.call(s,_)})();let f=c.call(s,d);return i.call(s,f)}:s[a]=(...d)=>{if(this.defaults.async)return(async()=>{let _=await c.apply(s,d);return _===!1&&(_=await i.apply(s,d)),_})();let f=c.apply(s,d);return f===!1&&(f=i.apply(s,d)),f}}r.hooks=s}if(n.walkTokens){let s=this.defaults.walkTokens,o=n.walkTokens;r.walkTokens=function(a){let c=[];return c.push(o.call(this,a)),s&&(c=c.concat(s.call(this,a))),c}}this.defaults={...this.defaults,...r}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return St.lex(e,t??this.defaults)}parser(e,t){return At.parse(e,t??this.defaults)}parseMarkdown(e){return(t,n)=>{let r={...n},s={...this.defaults,...r},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&r.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=e),s.async)return(async()=>{let a=s.hooks?await s.hooks.preprocess(t):t,c=await(s.hooks?await s.hooks.provideLexer():e?St.lex:St.lexInline)(a,s),i=s.hooks?await s.hooks.processAllTokens(c):c;s.walkTokens&&await Promise.all(this.walkTokens(i,s.walkTokens));let d=await(s.hooks?await s.hooks.provideParser():e?At.parse:At.parseInline)(i,s);return s.hooks?await s.hooks.postprocess(d):d})().catch(o);try{s.hooks&&(t=s.hooks.preprocess(t));let a=(s.hooks?s.hooks.provideLexer():e?St.lex:St.lexInline)(t,s);s.hooks&&(a=s.hooks.processAllTokens(a)),s.walkTokens&&this.walkTokens(a,s.walkTokens);let c=(s.hooks?s.hooks.provideParser():e?At.parse:At.parseInline)(a,s);return s.hooks&&(c=s.hooks.postprocess(c)),c}catch(a){return o(a)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let r="<p>An error occurred:</p><pre>"+Pt(n.message+"",!0)+"</pre>";return t?Promise.resolve(r):r}if(t)return Promise.reject(n);throw n}}},nn=new Ac;function Le(e,t){return nn.parse(e,t)}Le.options=Le.setOptions=function(e){return nn.setOptions(e),Le.defaults=nn.defaults,ra(Le.defaults),Le};Le.getDefaults=ts;Le.defaults=rn;Le.use=function(...e){return nn.use(...e),Le.defaults=nn.defaults,ra(Le.defaults),Le};Le.walkTokens=function(e,t){return nn.walkTokens(e,t)};Le.parseInline=nn.parseInline;Le.Parser=At;Le.parser=At.parse;Le.Renderer=hr;Le.TextRenderer=cs;Le.Lexer=St;Le.lexer=St.lex;Le.Tokenizer=_r;Le.Hooks=Nn;Le.parse=Le;var Ip=Le.options,Lp=Le.setOptions,Dp=Le.use,Op=Le.walkTokens,Mp=Le.parseInline;var Np=At.parse,Pp=St.lex;function zt(e){let t=Le.parse(e),n=Yo.sanitize(t);return Zo(n)}var Tc={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},Ec=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,Cc=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function Ht(e){return!!e&&typeof e=="object"}function ds(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function _a(e,t){let n=ds(e),r=ds(t),s=new Map;for(let c of n)s.set(c,(s.get(c)||0)+1);let o=0;for(let c of r){let i=s.get(c)||0;i>0?s.set(c,i-1):o+=1}let a=0;for(let c of s.values())a+=c;return{added:o,removed:a}}function Rc(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(s=>Ht(s)&&typeof s.text=="string"?s.text:"").join(""):Ht(e)&&typeof e.text=="string"&&(t=e.text);let r=(String(t).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return r.length>120?`${r.slice(0,117)}\u2026`:r}function Ic(e){let t=String(e.name||""),n=e.input||{},r={kind:"tool",tool:t,icon:Tc[t]||"\u{1F527}",input:n,expandable:!0};if((t==="Read"||t==="Write")&&(r.path=String(n.file_path||n.path||"")),t==="Write"&&(r.added=ds(n.content).length),t==="Edit"){r.path=String(n.file_path||n.path||"");let{added:s,removed:o}=_a(n.old_string,n.new_string);r.added=s,r.removed=o}if(t==="MultiEdit"){r.path=String(n.file_path||n.path||"");let s=0,o=0,a=Array.isArray(n.edits)?n.edits:[];for(let c of a){let i=_a(Ht(c)?c.old_string:"",Ht(c)?c.new_string:"");s+=i.added,o+=i.removed}r.added=s,r.removed=o}return t==="Bash"&&(r.command=String(n.command||"")),(t==="Grep"||t==="Glob")&&(r.command=String(n.pattern||n.query||"")),r}function ha(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}function ma(e){let t=e.split(/\r?\n/).find(r=>r.trim().length>0)||"",n=Ec.exec(t);return n?{kind:"gate",gate:n[2]==="implementation"?"impl":n[2],reviewer:n[3],verdict:n[4],time:n[5]?n[5].trim():void 0,text:t.trim()}:Cc.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function Lc(e,t){if(e.type==="assistant"){let n=e.message,r=n&&Array.isArray(n.content)?n.content:[],s=[];for(let o of r)if(Ht(o)){if(o.type==="text"&&typeof o.text=="string")s.push(ma(o.text));else if(o.type==="thinking"){let a=ha(o.thinking);a&&s.push(a)}else if(o.type==="tool_use"){let a=Ic(o);typeof o.id=="string"&&t.set(o.id,a),s.push(a)}}return s}if(e.type==="user"){let n=e.message,r=n&&Array.isArray(n.content)?n.content:[];for(let s of r)if(Ht(s)&&s.type==="tool_result"){let o=t.get(String(s.tool_use_id));if(o){let a=Rc(s.content);o.result=a,o.output=typeof s.content=="string"?s.content:a}}return[]}if(e.type==="result"){let n=e.is_error===!1&&e.subtype==="success";return[{kind:"result",success:n,text:typeof e.result=="string"?e.result:n?"DONE":""}]}return[]}function Dc(e){if(e.type==="item.completed"&&Ht(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[ma(t.text)];if(t.type==="reasoning"){let n=ha(t.text);return n?[n]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function Oc(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function ga(e){let t=[],n=new Map,r=Array.isArray(e)?e:[];for(let s of r){let o=s;if(typeof s=="string"){let c=s.trim();if(c.length===0)continue;try{o=JSON.parse(c)}catch{continue}}if(!Ht(o))continue;let a=Oc(o)?Dc(o):Lc(o,n);for(let c of a)t.push(c)}return t}var Mc=5,Nc=10,Pc=/Task\s+#(\d+)/,Fc=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,qc=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function br(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function Bc(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function Uc(e){for(let t=e.length-1;t>=0;t-=1){let n=e[t];if(n.kind==="phase"||n.kind==="gate")return n.text||null}return null}function zc(e){let t=new Map,n=0;for(let s of e){if(s.kind!=="tool")continue;n+=1;let o=s.input||{};if(s.tool==="TaskCreate"){let i=Pc.exec(s.output||s.result||""),d=String(o.activeForm||o.subject||"").trim();if(!i||d.length===0)continue;t.set(i[1],{label:d,active:o.status==="in_progress"?n:0});continue}if(s.tool!=="TaskUpdate")continue;let a=t.get(String(o.taskId??""));if(!a)continue;let c=o.activeForm||o.subject;typeof c=="string"&&c.trim().length>0&&(a.label=c.trim()),typeof o.status=="string"&&(a.active=o.status==="in_progress"?n:0)}let r=null;for(let s of t.values())s.active>0&&(!r||s.active>r.active)&&(r=s);return r?r.label:null}function Hc(e){if(e.tool==="Bash"){let t=e.command||"";return Fc.test(t)?"~ PR/\uAC8C\uC2DC \uC911":qc.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function Wc(e){let t=e.filter(s=>s.kind==="tool").slice(-Nc),n=new Map;t.forEach((s,o)=>{let a=Hc(s);if(!a)return;let c=n.get(a)||{count:0,last:-1};c.count+=1,c.last=o,n.set(a,c)});let r=null;for(let[s,o]of n)(!r||o.count>r.count||o.count===r.count&&o.last>r.last)&&(r={label:s,count:o.count,last:o.last});return r?r.label:null}function Gc(e){let t=Uc(e);if(t)return{text:t,guess:!1};let n=zc(e);if(n)return{text:n,guess:!1};let r=Wc(e);return r?{text:r,guess:!0}:null}function jc(e,t){if(typeof e!="number")return"";let n=Math.max(0,Math.floor((t-e)/1e3));return n<60?`${n}\uCD08 \uC804`:vt(e,t)}function vr(e,t={}){let{transport:n,sessionLogStore:r,onClose:s}=t,o=null,a={},c=!0,i=new Set,d=new Set,f=null,_=null;function v(){if(!o||!r)return[];let A=r.get(o);return ga(A?A.lines:[])}function y(){if(!o||!r)return null;let A=r.get(o),T=A?A.last_event_at:null;return typeof T=="number"?T:null}function $(){return a.status==="running"}function g(){if($()&&o){_||(_=setInterval(()=>j(),1e3));return}R()}function R(){_&&(clearInterval(_),_=null)}function W(A){let T=[],Q=0;for(;Q<A.length;){let ne=A[Q];if(ne.kind==="tool"){let ce=Q;for(;ce<A.length&&A[ce].kind==="tool"&&A[ce].tool===ne.tool;)ce+=1;if(ce-Q>=Mc&&!d.has(Q)){T.push({kind:"group",idx:Q,tool:ne.tool||"",lines:A.slice(Q,ce).map((fe,Re)=>({idx:Q+Re,line:fe}))}),Q=ce;continue}}T.push({kind:"line",idx:Q,line:ne}),Q+=1}return T}function H(A){for(let T=A.length-1;T>=0;T-=1){let Q=A[T];if(Q.kind==="result"||Q.kind==="error")return null;if(Q.kind==="tool"&&!Object.hasOwn(Q,"result"))return Q}return null}function Y(A){for(let T=A.length-1;T>=0;T-=1)if(A[T].kind==="thinking")return A[T];return null}function N(A,T){if(T.kind==="gate")return l`<div class="sv__gate">${T.text}</div>`;if(T.kind==="phase")return l`<div class="sv__phase">${T.text}</div>`;if(T.kind==="result")return l`<div
        class="sv__result${T.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${T.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${zt(T.text||(T.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(T.kind==="thinking"){let Q=i.has(A);return l`<div
        class="sv__think${Q?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>X(A)}
      >
        <span class="sv__think-line">💭 ${br(T.text)}</span>
        ${Q?l`<pre class="sv__think-expand">${T.text}</pre>`:""}
      </div>`}if(T.kind==="error")return l`<div class="sv__error">⛔ ${T.text}</div>`;if(T.kind==="blocker")return l`<div class="sv__error">⛔ ${T.text}</div>`;if(T.kind==="tool"){let Q=i.has(A),ne=T.tool==="Bash"?Bc(T.command):0,ce=T.tool==="Bash"?ne>1?br(T.command):T.command:T.path||T.command||"";return l`<div
        class="sv__tool${Q?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>X(A)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${T.icon}</span>
          <span class="sv__tool-name">${T.tool}</span>
          ${ce?l`<span class="sv__tool-detail">${ce}</span>`:""}
          ${ne>1?l`<span class="sv__tool-more">⋯ ${ne}줄</span>`:""}
          ${typeof T.added=="number"?l`<span class="sv__diff-add">+${T.added}</span>`:""}
          ${typeof T.removed=="number"?l`<span class="sv__diff-del">−${T.removed}</span>`:""}
          ${T.result?l`<span class="sv__tool-ok">→ ${T.result}</span>`:""}
        </span>
        ${Q?l`<pre class="sv__tool-expand">${E(T)}</pre>`:""}
      </div>`}return l`<div class="sv__as">${zt(T.text||"")}</div>`}function E(A){let T=[];if(A.tool==="Bash"&&typeof A.command=="string"&&A.command.length>0)T.push(A.command);else if(A.input!==void 0)try{T.push(`input: ${JSON.stringify(A.input,null,2)}`)}catch{}return typeof A.output=="string"&&A.output.length>0&&T.push(`output:
${A.output}`),T.join(`

`)}function S(){if(!o)return l``;let A=v(),T=[a.runner,a.model,a.effort].filter(Boolean).join(" \xB7 "),Q=a.session_id||"",ne=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${c?"ON":"OFF"}`,ce=$(),fe=ce?jc(y(),Date.now()):"",Re=ce?H(A):null,he=ce?Y(A):null,Ee=Gc(A);return l`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id">${o}</span>
        ${Ee?l`<span
              class="sv__stage${Ee.guess?" sv__stage--guess":""}"
              title=${Ee.text}
              >${Ee.text}</span
            >`:""}
        ${ce?l`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${fe?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${fe}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${fe?l`<span class="sv__live-ago">${fe}</span>`:""}</span
            >`:""}
        ${Q?l`<button
              type="button"
              class="sv__session"
              title=${Q}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${Q}`}
              @click=${()=>De(Q)}
            >
              ⧉ ${Q.slice(0,8)}
            </button>`:""}
        ${T?l`<span class="sv__meta">${T}</span>`:""}
        ${a.worktree?l`<span class="sv__wt" title=${a.worktree}
              >${a.worktree}</span
            >`:""}
        <button
          type="button"
          class="sv__follow${c?" sv__follow--on":""}"
          aria-pressed=${c?"true":"false"}
          aria-label=${ne}
          @click=${oe}
        >
          <span class="sv__follow-full">⇣ ${ne}</span>
          <span class="sv__follow-short">⇣ ${c?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>te()}
        >
          ✕
        </button>
      </div>
      <div class="sv__body">
        ${A.length===0?l`<div class="sv__empty">세션 로그 없음</div>`:W(A).map(Fe=>Fe.kind==="group"?M(Fe):N(Fe.idx,Fe.line))}
      </div>
      ${Re||he?l`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${Re?l`<span class="sv__now-icon">${Re.icon}</span>
                  <span class="sv__now-name">${Re.tool}</span>
                  <span class="sv__now-detail"
                    >${Re.tool==="Bash"?br(Re.command):Re.path||Re.command||""}</span
                  >`:""}
            ${he?l`<span class="sv__now-think"
                  >💭 ${br(he.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function M(A){return l`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>x(A.idx)}
    >
      <span class="sv__group-icon">${A.lines[0].line.icon}</span>
      <span class="sv__group-name">${A.tool}</span>
      <span class="sv__group-count">${A.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function x(A){d.add(A),j()}function j(){Ce(S(),e),g(),c&&V()}function V(){let A=e.querySelector(".sv__body");A&&(A.scrollTop=A.scrollHeight)}function X(A){i.has(A)?i.delete(A):i.add(A),j()}function oe(){c=!c,j()}function De(A){en(A).then(T=>{T?se("\uBCF5\uC0AC\uB428","success",1200):se("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function We(A){!o||!A||(a={...a,...A},j())}function Se(A){let T=A.target;if(!T||!T.classList||!T.classList.contains("sv__body"))return;!(T.scrollHeight-T.scrollTop-T.clientHeight<=4)&&c&&(c=!1,j())}e.addEventListener("scroll",Se,!0);function J(A){let T=A&&A.attempt_id;T&&(o=T,a=A.meta||{},c=!0,i.clear(),d.clear(),!f&&r&&(f=r.subscribe(j)),n&&Promise.resolve(n("subscribe-session-log",{id:`session-log:${o}`,attempt_id:o})).catch(()=>{}),j())}function te(){let A=o;o=null,i.clear(),d.clear(),R(),n&&A&&Promise.resolve(n("unsubscribe-session-log",{id:`session-log:${A}`})).catch(()=>{}),Ce(l``,e),s&&s()}return{open:J,updateMeta:We,close:te,isOpen(){return o!==null},destroy(){R(),f&&(f(),f=null),e.removeEventListener("scroll",Se,!0),o=null,Ce(l``,e)}}}function Yc(e){let t=e&&e.metadata||{},n=[];return typeof t.spec_id=="string"&&t.spec_id.trim().length>0&&n.push({kind:"spec",path:t.spec_id.trim()}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&n.push({kind:"plan",path:t.plan_path.trim()}),n}function ba(e,t){let n=Yc(e);return l`
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
                <button
                  type="button"
                  class="detail-art__op"
                  @click=${s=>t.onOpenDoc(s,r.path)}
                >
                  열기
                </button>
              </div>`)}
          <div class="detail-art__cap">경로 클릭 = 복사 · 열기 = 뷰어</div>
        `}
  `}var Vc="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",Kc=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,Zc=/^\*\*결론\*\* — (.+)$/;function va(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==Vc)return null;let n=Kc.exec(t[1]||"");if(!n)return null;let r=n[1].split(" ")[0],s=n[2],o=n[3],a=2;for(;a<t.length&&t[a].trim().length===0;)a+=1;let c=a<t.length?Zc.exec(t[a]):null,i=c?c[1].replace(/\s+/g," ").trim():"",d=c?a+1:a;return{lane:r,identifier:s,timestamp:o,conclusion:i,body:t.slice(d).join(`
`).trim()}}var wa=20;function ka(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let n=String(t.getMonth()+1).padStart(2,"0"),r=String(t.getDate()).padStart(2,"0"),s=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0");return`${n}-${r} ${s}:${o}`}function Xc(e){return e.length>wa?`${e.slice(0,wa)}\u2026`:e}function Qc(e,t,n,r){let s=`${t.lane} ${Xc(t.identifier)}`;return l`<div class="detail-report">
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
        <span class="detail-report__time">${ka(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${r&&t.body.length>0?l`<div class="detail-report__body">
          ${zt(t.body)}
        </div>`:""}
  </div>`}function Jc(e){return l`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${ka(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${zt(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function ya(e,t={},n={}){let r=Array.isArray(e)?e.filter(Boolean):[],s=n.expanded||new Set,o=typeof n.draft=="string"?n.draft:"",a=n.sending===!0,c=r.slice().sort((i,d)=>String(d.created_at||"").localeCompare(String(i.created_at||"")));return l`
    <div class="detail-section-label">댓글 (${r.length})</div>
    ${n.error?l`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:c.length===0?l`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:l`<div class="detail-comments" data-seam="comments">
            ${c.map(i=>{let d=va(typeof i.text=="string"?i.text:"");return d?Qc(i,d,t,s.has(i.id)):Jc(i)})}
          </div>`}
    <div class="detail-comment-compose">
      <textarea
        class="detail-comment-compose__input"
        aria-label="댓글 추가"
        placeholder="댓글 추가"
        rows="3"
        ?disabled=${a}
        .value=${o}
        @input=${i=>t.onDraftInput&&t.onDraftInput(i.target.value)}
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
  `}var us=["opus","sonnet","haiku","fable"],ps=["low","medium","high","xhigh"],fs=["codex","opus","fable","self","skip"],_s=["opus","fable","sonnet","haiku"],ed=["standard","fast_track"],hs={orchestration_model:"(\uAE30\uBCF8: opus)",orchestration_effort:"(\uAE30\uBCF8: CLI \uAE30\uBCF8)",review_model:"(\uAE30\uBCF8: codex)",impl_model:"(\uAE30\uBCF8: \uD2F0\uC5B4 \uC790\uB3D9)"};function wr(e,t){let n=t&&t[e];return typeof n=="string"&&n.length>0?`(\uAE30\uBCF8: ${n} \u2014 \uC804\uC5ED)`:hs[e]||"(\uAE30\uBCF8)"}function qn(e,t,n,r,s,o){return l`
    <div class="detail-kv">
      <span class="detail-kv__k">${t}</span>
      <select
        class=${s?"detail-kv__v detail-kv__v--sel":"detail-kv__v"}
        aria-label=${t}
        data-key=${e}
        @change=${a=>o.onChange(e,a.target.value)}
      >
        ${n.map(a=>l`<option value=${a.value} ?selected=${a.value===r}>
              ${a.label}
            </option>`)}
      </select>
    </div>
  `}function Bn(e,t){let n=e.map(r=>({value:r,label:r}));return typeof t=="string"?[{value:"",label:t},...n]:n}function $a(e,t,n){let r=e&&e.metadata||{},s=n&&typeof n=="object"?n:{},o=r.workflow_mode==="fast_track"?"fast_track":"standard";return l`
    <div class="detail-section-label">실행 설정 (수정 가능)</div>
    ${qn("orchestration_model","orchestration_model",Bn(us,wr("orchestration_model",s)),r.orchestration_model||"",!1,t)}
    ${qn("orchestration_effort","orchestration_effort",Bn(ps,wr("orchestration_effort",s)),r.orchestration_effort||"",!1,t)}
    ${qn("review_model","review_model",Bn(fs,wr("review_model",s)),r.review_model||"",!1,t)}
    ${qn("impl_model","impl_model",Bn(_s,wr("impl_model",s)),r.impl_model||"",!1,t)}
    ${qn("workflow_mode","workflow_mode",Bn(ed),o,r.workflow_mode==="fast_track",t)}
  `}function td(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function xa(e,t){let n=t.getWorkspacePath,r=t.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",a="",c="";function i($){$.key==="Escape"&&s&&($.preventDefault(),v())}document.addEventListener("keydown",i);function d(){return s?l`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>v()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${td(s)}</span
            >
            <button
              type="button"
              class="mv__close"
              aria-label="닫기"
              @click=${()=>v()}
            >
              ✕
            </button>
          </div>
          <div class="mv__body">
            ${o==="loading"?l`<div class="mv__status">불러오는 중…</div>`:o==="error"?l`<div class="mv__status mv__status--error">
                    ${c||"\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}
                  </div>`:zt(a)}
          </div>
        </div>
      </div>
    `:l``}function f(){Ce(d(),e)}async function _($){s=$,o="loading",a="",c="",f();let g=n?n():"";if(!g){o="error",c="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",f();return}if(!r){o="error",c="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",f();return}let R="/api/doc?workspace="+encodeURIComponent(g)+"&path="+encodeURIComponent($);try{let W=await r(R),H=await W.json().catch(()=>({}));if(!W.ok||!H||H.ok!==!0){o="error",c="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(H&&H.error||W.status)+")",f();return}a=String(H.content||""),o="ready",f()}catch{o="error",c="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",f()}}function v(){s=null,Ce(l``,e)}function y(){document.removeEventListener("keydown",i),v()}return{open:_,close:v,destroy:y}}var nd=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"},{key:"cache_creation_input_tokens",label:"\uCE90\uC2DC \uC0DD\uC131"}],Sa="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function rd(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function sd(e){let t=mn(e);if(!t||!e)return"";let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return l`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${t.replace(/^τ /,"\u03C4 \uCD1D ")}${n}</span
    >${e.replayed?l`<span class="detail-usage-partial" title=${Sa}
          >부분 집계</span
        >`:""}`}function od(e){let t=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null;return l`<div class="detail-session__usage-detail">
    ${nd.map(n=>l`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${n.label}</span
          ><span class="detail-session__usage-value"
            >${rd(e[n.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${t===null?"":l`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${t.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?l`<span class="detail-session__usage-note">${Sa}</span>`:""}
  </div>`}var ad={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function id(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=String(t.getHours()).padStart(2,"0"),r=String(t.getMinutes()).padStart(2,"0");return`${n}:${r}`}function Aa(e,t={},n={}){let r=Array.isArray(e)?e:[],s=n.expanded||new Set;if(r.length===0)return l`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let o=new Set;for(let d of r)d&&typeof d.resumed_from=="string"&&d.resumed_from.length>0&&o.add(d.resumed_from);let a=d=>{if(!(d.status==="failed"||d.status==="orphaned"))return"";let _=typeof d.session_id=="string"&&d.session_id.length>0,v=o.has(d.attempt_id),y=_&&!v,$=_?v?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return l`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${d.attempt_id}
      ?disabled=${!y}
      title=${$}
      @click=${g=>{g.stopPropagation(),y&&t.onResume&&t.onResume(d.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},c=d=>{if(!(d.status==="failed"||d.status==="orphaned")||typeof d.cause!="string"||d.cause==="")return"";let _=d.cause_detail,v=_&&typeof _.reason=="string"&&_.reason.length>0?typeof _.command=="string"&&_.command.length>0?`${_.reason} \xB7 ${_.command}`:_.reason:d.cause;return l`<div class="detail-session__cause" title=${v}>
      ${d.cause}
    </div>`},i=d=>{if(!mn(d.usage))return"";let f=s.has(d.attempt_id);return l`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${d.attempt_id}
      aria-expanded=${f?"true":"false"}
      title=${f?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${_=>{_.stopPropagation(),t.onToggleUsage&&t.onToggleUsage(d.attempt_id)}}
    >
      τ 자세히
    </button>`};return l`
    <div class="detail-section-label">
      세션 이력${sd(n.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${r.map(d=>l`<div class="detail-session-row">
            <button
              type="button"
              class="detail-session detail-session--${d.status||"unknown"}"
              data-attempt-id=${d.attempt_id}
              @click=${()=>t.onOpen&&t.onOpen(d.attempt_id)}
            >
              <span class="detail-session__glyph"
                >${ad[d.status||""]||"\xB7"}</span
              >
              <span class="detail-session__id">${d.attempt_id}</span>
              ${d.resumed_from?l`<span
                    class="detail-session__resumed"
                    title=${`\uC774\uC5B4\uBC1B\uC740 \uC138\uC158 (from ${d.resumed_from})`}
                    >↻</span
                  >`:""}
              <span class="detail-session__meta"
                >${[d.runner,d.model].filter(Boolean).join(" \xB7 ")}</span
              >
              ${d.session_id?l`<span class="detail-session__sid" title=${d.session_id}
                    >${String(d.session_id).slice(0,8)}</span
                  >`:""}
              ${mn(d.usage)?l`<span class="detail-session__usage"
                    >${mn(d.usage)}</span
                  >`:""}
              <span class="detail-session__time"
                >${id(d.started_at)}</span
              >
            </button>
            ${i(d)} ${a(d)} ${c(d)}
            ${s.has(d.attempt_id)&&d.usage?od(d.usage):""}
          </div>`)}
    </div>
  `}var ld=["open","in_progress","deferred","resolved","closed"],cd=[0,1,2,3,4];function Ta(e,t){let n=t.issueStores,r=t.onClose,s=t.transport,o=t.onNavigate,a=t.queueStore,c=t.sessionLogStore,i=null,d=null,f={},_=!1,v=!1,y="",$="",g="";function R(){_=!1,v=!1,y="",$="",g=""}let W=[],H=null,Y=null,N=!1,E="",S=!1,M=0,x=new Set;function j(){W=[],H=null,Y=null,N=!1,E="",S=!1,M+=1,x.clear()}async function V(h){if(!s)return;let q=++M;try{let B=await Promise.resolve(s("get-comments",{id:h}));if(q!==M||h!==i)return;W=Array.isArray(B)?B:[],N=!1}catch{if(q!==M||h!==i)return;N=!0}we()}function X(){if(!s||!i)return;let h=d&&typeof d.comment_count=="number"?d.comment_count:null;if(H!==i){H=i,Y=h,V(i);return}h!==null&&h!==Y&&(Y=h,V(i))}function oe(h){x.has(h)?x.delete(h):x.add(h),we()}function De(h){let q=E.trim().length===0;E=h,q!==(h.trim().length===0)&&we()}async function We(){let h=E.trim();if(!s||!i||h.length===0||S)return;let q=i;S=!0,we();let B=!1;try{let K=await Promise.resolve(s("add-comment",{id:q,text:h}));Array.isArray(K)&&K.length>0&&(B=!0,q===i&&(W=K,N=!1,E="",Y=K.length))}catch{B=!1}B||se("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),q===i&&(S=!1),we()}let Se={onToggle:oe,onDraftInput:De,onSubmit:We},J=document.createElement("div");J.className="md-viewer-root",document.body.appendChild(J);let te=xa(J,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),A=document.createElement("div");A.className="session-log-root",document.body.appendChild(A);let T=vr(A,{transport:s?(h,q)=>Promise.resolve(s(h,q)):void 0,sessionLogStore:c});function Q(){if(!a||!i)return[];let h=a.get();return(h&&h.attempts?Object.values(h.attempts):[]).filter(B=>B&&B.bead_id===i).sort((B,K)=>(K.started_at||0)-(B.started_at||0)).map(B=>({attempt_id:B.attempt_id,bead_id:B.bead_id,status:B.status,started_at:typeof B.started_at=="number"?B.started_at:null,runner:B.runner||null,model:B.model||null,session_id:B.session_id||null,resumed_from:B.resumed_from||null,dismissed_at:typeof B.dismissed_at=="number"?B.dismissed_at:null,cause:typeof B.cause=="string"?B.cause:null,cause_detail:B.cause_detail||null,usage:B.usage||null}))}function ne(){if(!a||!i)return null;let h=a.get();return Rt(h&&h.attempts||{},i)}let ce=new Set;function fe(h){ce.has(h)?ce.delete(h):ce.add(h),we()}function Re(h){let q=a?a.get():null,B=q&&q.attempts?q.attempts[h]:null;T.open({attempt_id:h,meta:B?{runner:B.runner||void 0,model:B.model||void 0,effort:B.effort||void 0,status:B.status||void 0,session_id:B.session_id||void 0}:{}})}async function he(h){if(!s||!h)return;let q=()=>{let K=a?a.get():null;return K&&typeof K.revision=="number"?K.revision:0},B=await s("worker-attempt-resume",{attempt_id:h,expected_revision:q()});if(B&&B.conflict){let K=B.queue&&typeof B.queue.revision=="number"?B.queue.revision:q();B=await s("worker-attempt-resume",{attempt_id:h,expected_revision:K})}B&&B.resumed===!1&&!B.conflict&&B.reason&&se(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${B.reason}`,"error",2400)}let Ee={onOpen:Re,onResume:he,onToggleUsage:fe};function Fe(){let h=a?a.get():null,q=h&&h.exec_defaults;return q&&typeof q=="object"?q:{}}let Oe=null;n&&n.subscribe&&(Oe=n.subscribe(()=>P()));let Ge=null;a&&typeof a.subscribe=="function"&&(Ge=a.subscribe(()=>{i&&we()}));function at(h){h.key==="Escape"&&i&&(h.preventDefault(),r())}document.addEventListener("keydown",at);function P(){if(i){if(n&&typeof n.snapshotFor=="function"){let h=n.snapshotFor("detail:"+i)||[];d=h.find(B=>B&&B.id===i)||h[0]||d}X(),we()}}function G(h){en(h).then(q=>{q?se("\uBCF5\uC0AC\uB428","success",1200):se("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function O(h){h.preventDefault(),h.stopPropagation(),i&&G(i)}function de(h,q){h.preventDefault(),h.stopPropagation(),G(q)}function ue(h,q){h.preventDefault(),h.stopPropagation(),te.open(q)}function be(h,q){f[h]=q,we(),!(!s||!i)&&Promise.resolve(s("update-exec-settings",{id:i,key:h,value:q})).catch(()=>{se("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}async function pe(h,q,B){if(!s||!i)return!1;try{let K=await Promise.resolve(s(h,q)),qe=Array.isArray(K)?K[0]:K;return qe&&typeof qe=="object"&&qe.id?(d=qe,!0):(se(B,"error"),!1)}catch{return se(B,"error"),!1}}function $e(h){setTimeout(()=>{try{let q=e.querySelector(h);q&&typeof q.focus=="function"&&q.focus()}catch{}},0)}function Ie(){_=!0,y=d&&d.title||"",we(),$e('.detail-edit__input[data-edit="title"]')}function nt(h){y=h.target.value}function ze(){_=!1,y="",we()}function Ke(){pe("edit-text",{id:i,field:"title",value:y},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(q=>{q&&(_=!1,y=""),we()})}function it(){v=!0,$=d&&d.description||"",we(),$e('.detail-edit__textarea[data-edit="description"]')}function lt(h){$=h.target.value}function ke(){v=!1,$="",we()}function rt(){pe("edit-text",{id:i,field:"description",value:$},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(q=>{q&&(v=!1,$=""),we()})}function Qe(h,q,B,K){if(h.key==="Escape"){h.stopPropagation(),B();return}h.key==="Enter"&&(!K||h.ctrlKey||h.metaKey)&&(h.preventDefault(),q())}function st(h){let q=h.target.value;pe("update-status",{id:i,status:q},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>we())}function ct(h){let q=Number(h.target.value);pe("update-priority",{id:i,priority:q},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>we())}function gt(h){g=h.target.value}function Be(){let h=g.trim();h.length!==0&&pe("label-add",{id:i,label:h},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(q=>{q&&(g=""),we()})}function dt(h){if(h.key==="Escape"){h.stopPropagation(),g="",we();return}h.key==="Enter"&&(h.preventDefault(),Be())}function je(h){pe("label-remove",{id:i,label:h},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>we())}let Je={onCopyPath:de,onOpenDoc:ue},D={onChange:be};function F(h){return typeof h=="string"?h:h&&typeof h=="object"?String(h.id||h.to||h.issue_id||h.depends_on||""):""}function re(h){switch(h&&typeof h=="object"?String(h.dependency_type||h.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function ae(h){let B=(Array.isArray(h.dependencies)?h.dependencies:[]).map(K=>({id:F(K),icon:re(K)})).filter(K=>K.id.length>0);return l`
      <div class="detail-section-label">의존성</div>
      ${B.length===0?l`<div class="detail-empty">의존성 없음</div>`:l`<div class="detail-deps">
            ${B.map(K=>o?l`<button
                    type="button"
                    class="detail-dep detail-dep--link"
                    @click=${()=>o(K.id)}
                  >
                    ${K.icon?`${K.icon} `:""}${K.id}
                  </button>`:l`<span class="detail-dep"
                    >${K.icon?`${K.icon} `:""}${K.id}</span
                  >`)}
          </div>`}
    `}function le(h){let q=h.metadata||{},B=h.workflow||{},K=B.stages||{},qe=K.spec&&K.spec.stale,_e=K.impl&&K.impl.stale,ve=B.route_source==="derived",tt=B.route||q.route||"\u2014";return l`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${ve?" detail-kv__v--derived":""}"
          title=${ve?"route \uCD94\uB860\uAC12 (metadata \uBBF8\uD540)":"route"}
          >${ve&&B.route?`${tt} ? (\uCD94\uB860)`:tt}</span
        >
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">spec_review</span>
        <span class="detail-kv__v"
          >${q.spec_review||"\uC5C6\uC74C"}${qe?" \xB7 stale":""}</span
        >
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">impl_review</span>
        <span class="detail-kv__v"
          >${q.impl_review||"\uC5C6\uC74C"}${_e?" \xB7 stale":""}</span
        >
      </div>
      ${q.pr_url?l`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${q.pr_url}</span>
          </div>`:""}
    `}let ge={route:["spec_backed","full_plan"]};async function u(h,q){let B=q.target.value;if(h==="route"&&d&&d.metadata&&d.metadata.route==="full_plan"&&B!=="full_plan"&&!window.confirm(`full_plan \u2192 ${B||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){we();return}await pe("update-workflow-meta",{id:i,key:h,value:B},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),we()}function b(h){let q=h.metadata||{};return l` ${((K,qe)=>{let _e=ge[K],ve=typeof q[K]=="string"?q[K]:"";return l`<div class="detail-kv">
        <span class="detail-kv__k">${K}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${K}
          data-edit=${`wfmeta-${K}`}
          @change=${tt=>u(K,tt)}
        >
          <option value="" ?selected=${!_e.includes(ve)}>
            ${qe}
          </option>
          ${_e.map(tt=>l`<option value=${tt} ?selected=${ve===tt}>${tt}</option>`)}
        </select>
      </div>`})("route","(\uBBF8\uC124\uC815 \xB7 \uCD94\uB860)")} `}function I(h){return _?l`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${y}
            @input=${nt}
            @keydown=${q=>Qe(q,Ke,ze,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${Ke}
            >
              저장
            </button>
            <button
              type="button"
              class="detail-edit__cancel"
              data-edit="title-cancel"
              @click=${ze}
            >
              취소
            </button>
          </div>
        </div>
      `:l`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${h}</h2>
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${Ie}
        >
          ✎
        </button>
      </div>
    `}function ee(h){let q=ot(h.created_at),B=ot(h.updated_at);return!q&&!B?l``:l`
      ${q?l`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${q}</span>
          </div>`:""}
      ${B?l`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${B}</span>
          </div>`:""}
    `}function Z(h,q){return l`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${st}
        >
          ${ld.map(B=>l`<option value=${B} ?selected=${B===h}>${B}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${ct}
        >
          ${cd.map(B=>l`<option value=${String(B)} ?selected=${B===q}>
                P${B}
              </option>`)}
        </select>
      </div>
    `}function me(h){return l`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${v?"":l`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${it}
            >
              ✎
            </button>`}
      </div>
      ${v?l`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${$}
              @input=${lt}
              @keydown=${q=>Qe(q,rt,ke,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${rt}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${ke}
              >
                취소
              </button>
            </div>
          </div>`:l`<div class="detail-overlay__desc">
            ${h||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function Ae(h){let q=typeof h.notes=="string"?h.notes:"";return q.trim().length===0?l``:l`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${q}</div>
    `}function Me(h){let q=Array.isArray(h.labels)?h.labels:[];return l`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${q.map(B=>l`<span class="detail-label-chip"
              >${B}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${B}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+B}
                @click=${()=>je(B)}
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
            @input=${gt}
            @keydown=${dt}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${Be}
          >
            추가
          </button>
        </span>
      </div>
    `}function Ye(){if(!i)return l``;let h=d||{},q=String(h.id||i),B=h.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",K=h.status||"open",qe=typeof h.priority=="number"?Math.max(0,Math.min(4,h.priority)):"",_e=h.description||"",ve={...h,metadata:{...h.metadata||{},...f}};return l`
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
            @click=${O}
          >
            ${q}
          </button>
          ${I(B)} ${Z(K,qe)}
          ${ee(h)} ${me(_e)}
          ${ya(W,Se,{expanded:x,draft:E,sending:S,error:N})}
          ${Ae(h)} ${Me(h)} ${ae(h)}
          ${le(h)} ${b(h)}
          ${ba(h,Je)}
          ${$a(ve,D,Fe())}
          ${Aa(Q(),Ee,{total:ne(),expanded:ce})}
        </div>
      </div>
    `}function we(){Ce(Ye(),e)}return{load(h){h!==i&&(f={},R(),j()),i=h,d=null,P()},clear(){i=null,d=null,f={},R(),j(),te.close(),T.close(),Ce(l``,e)},destroy(){Oe&&(Oe(),Oe=null),Ge&&(Ge(),Ge=null),document.removeEventListener("keydown",at),te.destroy(),J.parentNode&&J.parentNode.removeChild(J),T.destroy(),A.parentNode&&A.parentNode.removeChild(A),i=null,d=null,j(),Ce(l``,e)}}}var dd=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function Ea(e,t){return Ur(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function ud(e,t,n){if(!n)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(o=>o!==e)};let r=t.hidden_labels.filter(o=>o!==e);return t.hidden_prefixes.some(o=>o.length>0&&e.startsWith(o))?{hidden_labels:r,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:r}}function Ca(e,t){let{policyStore:n,transport:r,labelOptions:s}=t,o=document.createElement("dialog");o.id="display-settings-dialog",o.className="display-settings",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),e.appendChild(o);let a="";async function c(S){let M=n.get();if(M)try{let x=await r("display-policy-set",{expected_revision:M.revision,policy:S(M)});i(x),x&&x.conflict&&x.policy&&(x=await r("display-policy-set",{expected_revision:x.policy.revision,policy:S(x.policy)}),i(x)),x&&x.conflict&&se("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC","error",4e3)}catch{se("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function i(S){S&&S.policy&&typeof S.policy=="object"&&n.set(S.policy)}function d(S){let M=n.get();if(!M)return;let x=Ea(S,M)!=="shown";c(j=>ud(S,j,x))}function f(){let S=a.trim();S.length!==0&&(a="",c(M=>M.hidden_prefixes.includes(S)?{hidden_prefixes:M.hidden_prefixes}:{hidden_prefixes:[...M.hidden_prefixes,S]}),R())}function _(S){c(M=>({hidden_prefixes:M.hidden_prefixes.filter(x=>x!==S)}))}function v(S){let M=n.get();if(!M)return;let x=M.chips[S]===!1;c(()=>({chips:{[S]:x}}))}function y(S){let M=s();return l`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">라벨 표시</h3>
        <p class="display-settings__hint">
          라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을
          누르면 그 라벨만 예외로 다시 표시됩니다.
        </p>
        ${M.length===0?l`<div class="display-settings__empty">라벨 없음</div>`:l`<div class="display-settings__pills">
              ${M.map(x=>{let j=Ea(x,S);return l`<button
                  type="button"
                  class=${`display-settings__pill display-settings__pill--${j}`}
                  data-label=${x}
                  data-state=${j}
                  @click=${()=>d(x)}
                >
                  ${x}
                </button>`})}
            </div>`}
      </section>
    `}function $(S){return l`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">숨김 prefix</h3>
        <div class="display-settings__prefixes">
          ${S.hidden_prefixes.map(M=>l`<span class="display-settings__prefix">
                ${M}
                <button
                  type="button"
                  class="display-settings__prefix-remove"
                  aria-label=${`${M} \uADDC\uCE59 \uC81C\uAC70`}
                  @click=${()=>_(M)}
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
            @input=${M=>{a=String(M.target.value||"")}}
          />
          <button type="button" @click=${f}>추가</button>
        </div>
      </section>
    `}function g(S){return l`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">카드 표시 요소</h3>
        <div class="display-settings__toggles">
          ${dd.map(([M,x])=>l`<label class="display-settings__toggle">
                <input
                  type="checkbox"
                  data-chip=${M}
                  .checked=${S.chips[M]!==!1}
                  @change=${()=>v(M)}
                />
                <span>${x}</span>
              </label>`)}
        </div>
      </section>
    `}function R(){let S=n.get();Ce(l`
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
            ${S?l`${y(S)} ${$(S)}
                ${g(S)}`:l`<div class="display-settings__empty">
                  표시 정책을 불러오는 중…
                </div>`}
          </div>
        </div>
      `,o)}let W=!1,H=()=>{W=!1};o.addEventListener("close",H),o.addEventListener("cancel",H);let Y=null;n.subscribe&&(Y=n.subscribe(()=>{W&&R()}));function N(){W||(a="",W=!0,R(),typeof o.showModal=="function"?o.showModal():o.setAttribute("open",""))}function E(){W&&(W=!1,typeof o.close=="function"?o.close():o.removeAttribute("open"))}return{open:N,close:E,destroy(){W=!1,o.removeEventListener("close",H),o.removeEventListener("cancel",H),Y&&(Y(),Y=null),o.remove()}}}function Ra(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let n=t.querySelector("#fatal-error-title"),r=t.querySelector("#fatal-error-message"),s=t.querySelector("#fatal-error-detail"),o=t.querySelector("#fatal-error-reload"),a=t.querySelector("#fatal-error-close"),c=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},i=(d,f,_="")=>{n&&(n.textContent=d||"Unexpected Error"),r&&(r.textContent=f||"An unrecoverable error occurred.");let v=typeof _=="string"?_.trim():"";if(s&&(v.length>0?(s.textContent=v,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),a&&a.addEventListener("click",()=>c()),t.addEventListener("cancel",d=>{d.preventDefault(),c()}),{open:i,close:c,getElement(){return t}}}function Ia(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";if(e<6e4)return`${Math.round(e/1e3)}\uCD08`;let t=e/6e4;return`${Number.isInteger(t)?t:Math.round(t*10)/10}\uBD84`}function La(e){return Array.isArray(e)?e.filter(t=>typeof t=="string").join(" "):""}var pd={deployed:{modifier:"ok",label:"\uC131\uACF5"},launched:{modifier:"launched",label:"\uBC1C\uC0AC\uB428 \xB7 \uACB0\uACFC \uBBF8\uAD00\uCE21"},failed:{modifier:"fail",label:"\uC2E4\uD328"}},Da=160;function fd(e){return e.length>Da?`${e.slice(0,Da)}\u2026`:e}var _d=[{key:"orchestration_model",values:()=>us},{key:"orchestration_effort",values:()=>ps},{key:"review_model",values:()=>fs},{key:"impl_model",values:()=>_s}];function kr(e,t){let{queueStore:n,transport:r,getWorkspacePath:s}=t,o=document.createElement("dialog");o.id="worker-exec-defaults-dialog",o.className="exec-defaults",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),e.appendChild(o);function a(){return n&&n.get()||{revision:0,exec_defaults:{}}}function c(){let x=a();return typeof x.revision=="number"?x.revision:0}function i(){let x=a().exec_defaults;return x&&typeof x=="object"?x:{}}function d(x){x&&x.queue&&n&&n.set(x.queue)}async function f(x,j){if(!r)return;let V={key:x,value:j||null};try{let X=await r("worker-queue-set-exec-default",{...V,expected_revision:c()});d(X),X&&X.conflict&&(X=await r("worker-queue-set-exec-default",{...V,expected_revision:c()}),d(X)),X&&X.conflict&&se("\uC804\uC5ED \uC2E4\uD589 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC","error",4e3)}catch{se("\uC804\uC5ED \uC2E4\uD589 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function _(x,j,V){let X=!!V&&!j.includes(V);return l`<div class="exec-defaults__row">
      <span class="exec-defaults__k">${x}</span>
      <select
        class="exec-defaults__sel"
        aria-label=${`\uC804\uC5ED ${x}`}
        data-key=${x}
        @change=${oe=>{f(x,oe.target.value)}}
      >
        <option value="" ?selected=${!V}>
          ${hs[x]||"(\uAE30\uBCF8)"}
        </option>
        ${X?l`<option value=${V} ?selected=${!0}>
              ${V} (비호환)
            </option>`:""}
        ${j.map(oe=>l`<option value=${oe} ?selected=${V===oe}>${oe}</option>`)}
      </select>
    </div>`}function v(){let x=a().workspace_info;return x&&typeof x=="object"?x:{}}function y(x,j){return l`<span
      class="exec-defaults__vd-badge exec-defaults__vd-badge--${x}"
      >${j}</span
    >`}function $(x){let j=x?La(x.cmd):"",V=x?Ia(x.timeout_ms):"",X=s&&s()||"<workspace \uACBD\uB85C>";return l`<div class="exec-defaults__vd-group" data-vd="verify">
      <div class="exec-defaults__vd-label">머지 전 검증 (verify)</div>
      ${j?l`<div class="exec-defaults__vd-line">
            <span class="exec-defaults__vd-cmd">${j}</span>
            ${y("config","config")}
            ${V?l`<span class="exec-defaults__vd-meta"
                  >timeout ${V}</span
                >`:""}
          </div>`:l`<div class="exec-defaults__vd-line exec-defaults__vd-absent">
            검증 없음 —
            <span class="exec-defaults__vd-cmd"
              >[worker.verify."${X}"]</span
            >
            섹션으로 정의
          </div>`}
    </div>`}function g(x){let j=x?La(x.cmd):"",V=x?Ia(x.timeout_ms):"",X=V?`timeout ${V} \xB7 verify \uD1B5\uACFC \uC2DC\uC5D0\uB9CC \uC2E4\uD589`:"verify \uD1B5\uACFC \uC2DC\uC5D0\uB9CC \uC2E4\uD589",oe=s&&s()||"<workspace \uACBD\uB85C>";return l`<div class="exec-defaults__vd-group" data-vd="deploy">
      <div class="exec-defaults__vd-label">머지 후 배포 (deploy)</div>
      ${j?l`<div class="exec-defaults__vd-line">
            <span class="exec-defaults__vd-cmd">${j}</span>
            ${y("config","config")}
            ${x.detached===!0?y("detached","detached"):""}
            <span class="exec-defaults__vd-meta">${X}</span>
          </div>`:l`<div class="exec-defaults__vd-line exec-defaults__vd-absent">
            배포 없음 —
            <span class="exec-defaults__vd-cmd"
              >[worker.deploy."${oe}"]</span
            >
            섹션으로 정의
          </div>`}
    </div>`}function R(x){if(!x||typeof x!="object")return"";let j=pd[String(x.outcome)];if(!j)return"";let V=x.outcome==="failed"&&x.reason?`${j.label} \xB7 ${x.reason}`:j.label,X=[ot(x.at),typeof x.bead_id=="string"?x.bead_id:"",typeof x.base_sha=="string"?x.base_sha.slice(0,7):""].filter(We=>We.length>0).join(" \xB7 "),oe=typeof x.detail=="string"&&x.detail.length>0?fd(x.detail):"",De=typeof x.log_path=="string"&&x.log_path.length>0?x.log_path:"";return l`<div class="exec-defaults__vd-group" data-vd="last-deploy">
      <div class="exec-defaults__vd-label">마지막 배포</div>
      <div class="exec-defaults__vd-line">
        ${y(j.modifier,V)}
        ${X?l`<span class="exec-defaults__vd-meta">${X}</span>`:""}
      </div>
      ${oe?l`<div class="exec-defaults__vd-line" data-vd-part="detail">
            <code class="exec-defaults__vd-cmd">${oe}</code>
          </div>`:""}
      ${De?l`<div class="exec-defaults__vd-line" data-vd-part="log-path">
            전체 로그:
            <code class="exec-defaults__vd-cmd">${De}</code>
          </div>`:""}
    </div>`}function W(x){return l`<section class="exec-defaults__vd">
      <p class="exec-defaults__vd-title">
        검증·배포 설정
        <span class="exec-defaults__vd-ro"
          >읽기 전용 — config.toml에서 정의</span
        >
      </p>
      ${$(x.verify_cmd)} ${g(x.deploy_cmd)}
      ${R(x.last_deploy)}
    </section>`}function H(){let x=i();Ce(l`
        <div class="exec-defaults__container">
          <header class="exec-defaults__header">
            <div class="exec-defaults__title">전역 실행 설정</div>
            <button
              type="button"
              class="exec-defaults__close"
              aria-label="닫기"
              @click=${M}
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
            ${_d.map(j=>_(j.key,j.values(),x[j.key]||""))}
            ${W(v())}
          </div>
        </div>
      `,o)}let Y=!1,N=()=>{Y=!1};o.addEventListener("close",N),o.addEventListener("cancel",N);let E=null;n&&n.subscribe&&(E=n.subscribe(()=>{Y&&H()}));function S(){Y||(Y=!0,H(),typeof o.showModal=="function"?o.showModal():o.setAttribute("open",""))}function M(){Y&&(Y=!1,typeof o.close=="function"?o.close():o.removeAttribute("open"))}return{open:S,close:M,destroy(){Y=!1,o.removeEventListener("close",N),o.removeEventListener("cancel",N),E&&(E(),E=null),o.remove()}}}function bn(e){let t=vt(e.created_at),n=vt(e.updated_at);return!t&&!n?"":l`<div class="worker-mini__meta">
    ${t?l`<span title=${`\uC0DD\uC131 ${ot(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&n?l`<span>·</span>`:""}${n?l`<span title=${`\uC218\uC815 ${ot(e.updated_at)}`}
          >수정 ${n}</span
        >`:""}
  </div>`}function ms(e){let t=e.draggable&&!e.done,n=Array.isArray(e.badges)?e.badges:[],r=$t(e.usage),s=e.merge_step||null,o=e.lane==="pr_wait"||!!e.revise_action,a=e.lane==="done"&&!o,c=a?vt(e.done_at):"",i=t?l`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",d=e.workspace_name?l`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",f=l`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,_=l`<span class="worker-mini__title">${e.title}</span>`,v=e.pr_url&&e.pr_number?l`<a
          class="worker-mini__pr"
          href=${e.pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="PR 열기"
          >#${e.pr_number} ↗</a
        >`:"",y=n.map(S=>S===e.live_badge?l`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${S}</span
        >`:l`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          >${S}</span
        >`),$=e.reason?l`<span class="worker-mini__reason">${e.reason}</span>`:"",g=r?l`<span class="worker-usage" title=${gn(e.usage)}
        >${r}</span
      >`:"",R=s?l`<span class="merge-step"
        >${s.label}<span class="merge-step__n"
          >${s.index}/${s.total}</span
        ></span
      >`:"",W=e.merge_action?l`<button
        type="button"
        class="worker-mini__merge"
        data-bead-id=${e.id}
        ?disabled=${e.merge_enabled===!1}
        title=${e.merge_title||""}
      >
        ${e.merge_label||"\uBA38\uC9C0"}
      </button>`:"",H=e.cancel_action?l`<button
        type="button"
        class="worker-mini__merge-cancel"
        data-bead-id=${e.id}
        ?disabled=${e.cancel_enabled===!1}
        title=${e.cancel_title||""}
      >
        취소
      </button>`:"",Y=e.discard_action?l`<button
        type="button"
        class="worker-mini__discard"
        data-bead-id=${e.id}
        ?disabled=${e.discard_enabled===!1}
        title=${e.discard_enabled===!1?e.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
      >
        폐기
      </button>`:"",N=e.revise_action?l`<button
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
        </button>`:"",E=!!(r||s||e.merge_action||e.cancel_action||e.discard_action||e.revise_action);return l`<div
    class="worker-mini${o?" worker-mini--card":""}${t?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${s?" worker-mini--merging":""}${e.external?" worker-mini--external":""}"
    style=${s?`--progress: ${s.percent}%`:""}
    draggable=${t?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${a?l`<div class="worker-mini__row1">${d}${f}${_}</div>
          <div class="worker-mini__row2">
            ${g}${c?l`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${ot(e.done_at)}`}
                  >완료 ${c}</span
                >`:""}${y}${R}
            <span class="worker-mini__actions"
              >${W}${H}${Y}</span
            >
            ${bn(e)}
          </div>`:o?l`<div class="worker-mini__head">
              ${i}${d}${f}${v}${y}${$}
            </div>
            <div class="worker-mini__body">${_}</div>
            ${E?l`<div class="worker-mini__foot">
                  ${g}${R}
                  <span class="worker-mini__actions"
                    >${W}${H}${Y}${N}</span
                  >
                </div>`:""}
            ${bn(e)}`:l`<div class="worker-mini__line">
              ${i}${d}${f}${_}${v}${y}${$}${g}${R}${W}${H}${Y}
            </div>
            ${bn(e)}`}
  </div>`}function hd(e){let t=e.draggable&&!e.done,n=e.workflow,r=n&&n.chips||{},s=r.route||n&&n.route,o=r.route_source==="derived"||!!(n&&n.route_source==="derived"),a=typeof e.reason=="string"&&e.reason.startsWith("\u26D4");return l`<div
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
      ${n&&s?l`<span
            class="ctl-chip ctl-chip--route${o?" is-derived":""}"
            title=${o?"route \uCD94\uB860\uAC12 (metadata \uBBF8\uD540)":"route"}
            >${o?`${s} ?`:s}</span
          >`:""}
    </div>
    <div class="worker-card__title">${e.title}</div>
    ${n?or(n,e.status):""}
    <div
      class="worker-card__foot${e.reason?"":" worker-card__foot--actions-only"}"
    >
      ${e.reason?l`<span
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
    ${bn(e)}
  </div>`}function It(e){let t=!!e.collapsible&&!!e.collapsed,n=l`<span
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
                  </div>`:e.items.map(r=>e.lane==="candidate"?hd(r):ms(r))}
          </div>`}
  </section>`}var Oa=160;function gs(e){return e.length>Oa?`${e.slice(0,Oa)}\u2026`:e}function md(e){return!e||!e.reason?"":l`<div class="worker-banner__detail">
    가드:
    ${e.reason}${e.command?l` · <code>${gs(e.command)}</code>`:""}
  </div>`}function gd(e){return e?l`<details class="worker-banner__tail">
    <summary>출력 tail</summary>
    <pre>${e}</pre>
  </details>`:""}function bd(e){return e?l`<div class="worker-banner__log-path">
    전체 로그: <code>${e}</code>
  </div>`:""}function bs(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),n=Math.floor(t/60),r=t%60;return n>0?`${n}m ${String(r).padStart(2,"0")}s`:`${r}s`}function vd(e){if(!e||!e.reason)return"";let t=e.reason.startsWith("export_removal_failed:");return l`<div
    class="worker-banner worker-banner--ship"
    role="alert"
    data-bead-id=${e.bead_id||""}
  >
    ⚠ ${e.bead_id||"(bead \uBBF8\uC0C1)"} 머지 완료 — capability 발행이
    실패했습니다 (${e.reason}). bead는 closed지만
    ${t?l`취소 처분된 자손의 <code>export:</code> 라벨이 남아 있어 다음
          스윕이 이를 다시 발행 대상으로 읽습니다.`:l`<code>provides:</code> 라벨이 없어 이 capability에 걸린 external
          의존은 계속 막혀 있습니다.`}
    ${e.detail?l`<div class="worker-banner__detail">
          남은 작업: <code>${gs(e.detail)}</code>
        </div>`:""}
    <div class="worker-banner__detail">
      ${t?l`수동 복구:
            <code
              >bd -C &lt;워크스페이스&gt; label remove &lt;id&gt;
              export:&lt;capability&gt;</code
            >
            실행 후 <code>bd show &lt;id&gt; --json</code>으로 라벨이 사라졌는지
            확인하세요 — 이 자손은 ship하지 마세요.`:l`수동 복구:
            <code>bd -C &lt;워크스페이스&gt; ship &lt;capability&gt;</code> 실행
            후 <code>bd show &lt;id&gt; --json</code>으로
            <code>provides:</code> 라벨을 확인하세요.`}
    </div>
    ${e.pr_url?l`<div class="worker-banner__detail">
          <code>${e.pr_url}</code>
        </div>`:""}
  </div>`}function Ma(e){let t=Array.isArray(e.cleanupFailures)?e.cleanupFailures:[];return l`<div class="worker-banners">
    ${e.failure?l`<div class="worker-banner worker-banner--failure" role="alert">
          ⛔ ${e.failure.repo||"repo"} 세션 실패 —
          ${e.failure.reason||""}. 자동 진행을 껐습니다, 수동 ▶ 필요.
          ${e.failure.resume_attempt_id?l`<button
                type="button"
                class="worker-banner__resume"
                data-attempt-id=${e.failure.resume_attempt_id}
                ?disabled=${!e.failure.resume_eligible}
                title=${e.failure.resume_eligible?"\uCD5C\uADFC \uC2E4\uD328 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":e.failure.resume_reason||"\uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}
              >
                ↻ 이어하기
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
          ${md(e.failure.cause_detail)}
        </div>`:""}
    ${t.map(n=>l`<div
          class="worker-banner worker-banner--cleanup"
          role="alert"
          data-bead-id=${n.bead_id}
        >
          ⚠ ${n.bead_id} 머지 완료 — 머지 후 정리가 <b>${n.step}</b> 단계에서
          멈췄습니다 (${n.reason}).
          <!-- capability 발행은 close 뒤에 오는 유일한 단계라 실패해도 close를
               롤백하지 않는다 (UI-4ii4). "resolved로 남아 있다"는 다른 모든
               단계에만 참이므로 여기서만 문안을 바꾼다. -->
          ${n.step==="ship_exported_capabilities"?"bead\uB294 closed\uB85C \uB0A8\uC544 \uC788\uACE0(close\uB294 \uB864\uBC31\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4)":"bead\uB294 resolved\uB85C \uB0A8\uC544 \uC788\uACE0"}
          자동 재시도는 하지 않습니다 — 정리를 사람이 마무리하세요.
          ${n.detail?l`<div class="worker-banner__detail">
                <code>${gs(n.detail)}</code>
              </div>`:""}
          ${bd(n.log_path)} ${gd(n.output_tail)}
        </div>`)}
    ${vd(e.shipFailure)}
  </div>`}function wd(e,t,n=null){let r=!!e.paused,s=r?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?bs(t-e.started_at):"\u2014",o=[e.runner,e.model].filter(Boolean).join(" \xB7 "),a=$t(e.usage),c=e.conflict_resolution?r?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,i=e.base_exception||null,d=e.attempt_id&&e.attempt_id===n;return l`<div
    class="rtile${d?" rtile--sel":""}${r?" rtile--paused":""}"
    data-bead-id=${e.bead_id}
    data-attempt-id=${e.attempt_id||""}
  >
    <div class="rtile__hd">
      <span class="rtile__dot" aria-hidden="true"></span>
      <span class="rtile__id" title="클릭하면 ID 복사">${e.bead_id}</span>
      ${e.resumed_from?l`<span
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
      ${r?l`<button
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
      <button type="button" class="rtile__stop" title="폐기" aria-label="폐기">
        ■
      </button>
    </div>
    <div class="rtile__title">${e.title}</div>
    ${e.current_child?l`<div class="rtile__child" title="현재 진행중 child">
          └ ${e.current_child}
        </div>`:""}
    ${o||a||c||i?l`<div class="rtile__meta">
          ${c?l`<span class="worker-mini__badge">${c}</span>`:""}
          ${i?l`<span
                class="worker-mini__badge"
                title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
                >${i}</span
              >`:""}
          ${o?l`<span class="rtile__runner">${o}</span>`:""}
          ${a?l`<span class="worker-usage" title=${gn(e.usage)}
                >${a}</span
              >`:""}
        </div>`:""}
    ${bn(e)}
    <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일): 큐
         스냅샷에는 페이즈명도 진행률도 없으므로 진행 바는 만들지 않는다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
    ${r?"":l`<div class="rtile__accent" aria-hidden="true"></div>`}
  </div>`}function vs(e,t=Date.now(),n=null){let r=Array.isArray(e)?e:[];return l`<div class="worker-rungrid" id="worker-rungrid">
    ${r.length===0?l`<div class="worker-rungrid__empty">실행 세션 없음</div>`:r.map(s=>wd(s,t,n))}
  </div>`}function Wt(e){return l`<svg
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
  </svg>`}function ws(){return Wt(Dt`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function ks(){return Wt(Dt`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function ys(){return Wt(Dt`<rect x="4.3" y="4.3" width="7.4" height="7.4" rx="1.2" />`)}function Na(){return Wt(Dt`<path d="M4.4 4.4 11.6 11.6M11.6 4.4 4.4 11.6" />`)}function Pa(){return Wt(Dt`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function Fa(){return Wt(Dt`<rect x="2.6" y="2.6" width="7.4" height="7.4" rx="1.2" />
    <path d="M6 13.4h6a1.4 1.4 0 0 0 1.4-1.4V6" />`)}function qa(){return Wt(Dt`<circle cx="8" cy="8" r="2.1" />
    <path
      d="M8 1.9v1.8M8 12.3v1.8M1.9 8h1.8M12.3 8h1.8M3.7 3.7l1.3 1.3M11 11l1.3 1.3M12.3 3.7 11 5M5 11l-1.3 1.3"
    />`)}function Ba(){return Wt(Dt`<path d="M3 3.6 8.2 8 3 12.4z" />
    <path d="M8.8 3.6 14 8l-5.2 4.4z" />`)}var Un=1,kd=6e4,yd={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328"},$d=new Set(["auto_merge","merged","merge","done"]),Ua={running:3,paused:2,failed:1};function xd(e,t){let n=null,r=-1/0;for(let s of Object.values(e)){if(!s||s.bead_id!==t||s.status==="running")continue;let o=typeof s.finished_at=="number"?s.finished_at:typeof s.started_at=="number"?s.started_at:0;o>=r&&(r=o,n=s)}return n}function Sd(e,t){let n=Object.values(e||{}),r=new Set,s=new Map;for(let a of n)!a||typeof a.bead_id!="string"||(typeof a.resumed_from=="string"&&a.resumed_from.length>0&&r.add(a.resumed_from),s.set(a.bead_id,a.attempt_id));let o=new Map;for(let a of n){if(!a||typeof a.bead_id!="string"||a.bead_id.length===0)continue;let c=null;if(a.status==="running")c="running";else if(a.status==="paused"&&!r.has(a.attempt_id))c="paused";else if(a.status==="failed"||a.status==="orphaned"){let _=t.get(a.bead_id),v=typeof _=="number"&&_>0&&typeof a.finished_at=="number"&&_>=a.finished_at;s.get(a.bead_id)===a.attempt_id&&!v&&typeof a.dismissed_at!="number"&&(c="failed")}if(!c)continue;let i=typeof a.started_at=="number"?a.started_at:null,d=o.get(a.bead_id);if(d){let _=Ua[d.run_state],v=Ua[c];if(_>v||_===v&&(d.started_at??0)>(i??0))continue}let f=typeof a.session_id=="string"&&a.session_id.length>0;o.set(a.bead_id,{attempt_id:typeof a.attempt_id=="string"?a.attempt_id:"",run_state:c,started_at:i,last_event_at:typeof a.last_event_at=="number"?a.last_event_at:null,model:typeof a.model=="string"?a.model:null,usage:Rt(e,a.bead_id),can_pause:c==="running"&&f,can_resume:c!=="running"&&f&&!r.has(a.attempt_id)})}return o}function za(e,t){let n=e[t];if(!n)return"";if(n.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let r=typeof n.reason=="string"?n.reason:"",s=r.indexOf(":");return s>0&&s<r.length-1?`\u26D4 ${r.slice(0,s)} (${r.slice(s+1)})`:`\u26D4 ${r}`}function Tt(e){return e&&typeof e=="object"?e:{}}function $s(e,t,n){let r=Array.isArray(e)?e:[],s=Array.isArray(t)?t:[],o=n&&typeof n.done_since=="number"?n.done_since:void 0,a=new Map;for(let g of s)g&&typeof g.root_dir=="string"&&a.set(g.root_dir,g);let c=[],i=[],d=[],f=[],_=[],v=new Map;for(let g of r){if(!g||typeof g.root_dir!="string")continue;let R=g.root_dir,W=g.name||R,H=a.get(R),Y=H&&typeof H.revision=="number"?H.revision:typeof g.revision=="number"?g.revision:0,N=Tt(g.attempts),E=Tt(g.bead_titles),S=Tt(g.pr_observations),M=Tt(g.admission),x=Tt(g.revise_parked),j=Tt(g.merge_queue_state),V=Tt(g.cleanup_failed),X=Array.isArray(g.merge_queue)?g.merge_queue:[],oe=new Set(X.filter(A=>A&&typeof A.bead_id=="string").map(A=>A.bead_id)),De=Array.isArray(g.queue)?g.queue:[],We=Array.isArray(g.done)?g.done:[],Se=new Map;for(let A of We)A&&typeof A.bead_id=="string"&&typeof A.added_at=="number"&&Se.set(A.bead_id,A.added_at);let J=A=>({id:A,title:E[A]||A,root_dir:R,workspace_name:W,expected_revision:Y,draggable:!1}),te=new Set;for(let[A,T]of Sd(N,Se))te.add(A),i.push({...J(A),lane:"running",attempt_id:T.attempt_id,run_state:T.run_state,can_pause:T.can_pause,can_resume:T.can_resume,started_at:T.started_at,last_event_at:T.last_event_at,model:T.model,usage:T.usage,badges:T.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:T.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:[],alert:T.run_state==="failed"});for(let A of Array.isArray(g.pr_wait)?g.pr_wait:[]){let T=A&&A.bead_id;if(typeof T!="string"||te.has(T))continue;te.add(T);let Q=Tt(S[T]),ne=Tt(Q.pr),ce=Q.gate?Tt(Q.gate):null,fe=oe.has(T),Re=j.active===T,he=A.external===!0,Ee=V[T]||null,Fe=!!ce&&ce.base_badge==="\uCDA9\uB3CC",Oe=!!Ee&&!!ce&&ce.tier==="merged",Ge=he&&!!ce&&ce.tier==="merged";d.push({...J(T),lane:"pr_wait",pr_number:typeof ne.number=="number"?ne.number:null,pr_url:typeof ne.url=="string"?ne.url:void 0,external:he,usage:Rt(N,T),badges:Ee?["\uC815\uB9AC \uC2E4\uD328"]:[],alert:!!Ee,reason:Ee?"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644":"PR \uB300\uAE30",merge_action:!fe,merge_enabled:ce?.enabled===!0||Fe||Oe||Ge,merge_label:Ge?"\uC815\uB9AC":Fe&&!Oe?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:Ge?"\uBA38\uC9C0\uB428 \u2014 \uD074\uB9AD\uD558\uBA74 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC\uB97C \uC218\uD589\uD569\uB2C8\uB2E4":Oe?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uCC98\uC74C\uBD80\uD130 \uB2E4\uC2DC \uC218\uD589\uD569\uB2C8\uB2E4":Fe?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":ce?.enabled===!0?`\uBA38\uC9C0 (${ce.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${ce?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:fe,cancel_enabled:!Re,discard_action:!he&&!Ee&&!(ce&&ce.tier==="merged"),discard_enabled:!Re&&!fe,discard_title:fe?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":void 0})}for(let A=0;A<De.length;A++){let T=De[A],Q=T&&T.bead_id;if(typeof Q!="string"||te.has(Q))continue;te.add(Q);let ne=x[Q],ce={...J(Q),lane:"queue",reason:za(M,Q),queue_position:A+1,queue_index:A,queue_length:De.length,badges:ne?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!ne,revise_action:!!ne,revise_enabled:!!ne,revise_title:ne?ne.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${ne.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""};f.push(ce);let fe=v.get(R);fe?fe.push(ce):v.set(R,[ce])}for(let A of Array.isArray(g.runnable)?g.runnable:[]){let T=A&&A.bead_id;typeof T!="string"||te.has(T)||(te.add(T),c.push({...J(T),title:A.title||E[T]||T,lane:"runnable",draggable:!0,reason:za(M,T),created_at:A.created_at??void 0,updated_at:A.updated_at??void 0,labels:Array.isArray(A.labels)?A.labels:[],workflow:A.route?{route:A.route,chips:{route:A.route}}:null,place_index:De.length}))}for(let A of We){let T=A&&A.bead_id;if(typeof T!="string"||te.has(T)||(te.add(T),o!==void 0&&typeof A.added_at=="number"&&A.added_at<o))continue;let Q=xd(N,T);_.push({...J(T),lane:"done",done:!0,usage:Rt(N,T),done_at:typeof A.added_at=="number"?A.added_at:void 0,done_kind:Q&&typeof Q.done_kind=="string"?Q.done_kind:null})}}i.sort((g,R)=>(R.last_event_at??0)-(g.last_event_at??0)),_.sort((g,R)=>(R.done_at??0)-(g.done_at??0));let y=s.length>0?s:r.map(g=>({root_dir:g&&g.root_dir,name:g&&g.name,auto_advance:g&&g.auto_advance,auto_merge:g&&g.auto_merge,slots:g&&g.slots,revision:g&&g.revision,exec_defaults:g&&g.exec_defaults})),$=[];for(let g of y)!g||typeof g.root_dir!="string"||$.push({root_dir:g.root_dir,name:g.name||g.root_dir,auto_advance:g.auto_advance===!0,auto_merge:g.auto_merge===!0,slots:typeof g.slots=="number"&&g.slots>=Un?g.slots:Un,revision:typeof g.revision=="number"?g.revision:0,exec_defaults:Tt(g.exec_defaults),items:v.get(g.root_dir)||[]});return{runnable:c,queue:f,queue_groups:$,running:i,pr_wait:d,done:_,automation:{total:$.length,both_on:$.filter(g=>g.auto_advance&&g.auto_merge).length}}}function Ad(e,t){if(typeof e!="number"||!Number.isFinite(e))return"";let r=t-e<kd;return l`<span
    class="mon-beat${r?" mon-beat--live":""}"
    title=${`\uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${ot(e)}`}
    ><span class="mon-beat__dot" aria-hidden="true"></span>${r?"":l`<span class="mon-beat__age"
          >${vt(e,t)}</span
        >`}</span
  >`}function zn(e){return l`<div class="mon-c__title">${e.title}</div>`}function Hn(e){return l`<span class="mon-c__id" title="클릭하면 상세로 이동"
    >${e.id}</span
  >`}function yr(e){return e.workspace_name?l`<span class="mon-c__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:""}function xs(e){let t=$t(e.usage);return t?l`<span class="mon-c__usage" title=${gn(e.usage)}
        >${t}</span
      >`:""}function Ss(e){return(Array.isArray(e.badges)?e.badges:[]).map(n=>l`<span class="mon-c__badge${e.alert?" mon-c__badge--alert":""}"
        >${n}</span
      >`)}function Td(e){return l`<span class="mon-c__ops">
    ${e.run_state==="running"?l`<button
          type="button"
          class="mon-op mon-op--pause"
          ?disabled=${e.can_pause===!1}
          aria-label="일시정지"
          title="일시정지 — 세션을 끊고 이어하기 가능 상태로 둡니다"
        >
          ${ks()}
        </button>`:l`<button
          type="button"
          class="mon-op mon-op--resume"
          ?disabled=${e.can_resume===!1}
          aria-label="이어하기"
          title="이어하기"
        >
          ${ws()}
        </button>`}
    <button
      type="button"
      class="mon-op mon-op--stop"
      aria-label="중단"
      title="중단 — 세션을 죽이고 대기 큐에서 뺍니다"
    >
      ${ys()}
    </button>
    ${e.run_state==="failed"?l`<button
          type="button"
          class="mon-op mon-op--dismiss"
          aria-label="실패 기록 닫기"
          title="실패 기록 닫기"
        >
          ${Na()}
        </button>`:""}
  </span>`}function Ed(e,t){let n=typeof e.started_at=="number"?bs(t-e.started_at):"";return l`${zn(e)}
    <div class="mon-c__meta">
      ${Ss(e)}${Ad(e.last_event_at,t)}${Hn(e)}${yr(e)}
      ${e.model?l`<span class="mon-c__model">${e.model}</span>`:""}
      ${n?l`<span class="mon-live__elapsed">${n}</span>`:""}
      ${xs(e)}${Td(e)}
    </div>`}function Cd(e){let t=e.workflow,r=(t&&t.chips||{}).route||t&&t.route,s=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),o=vt(e.updated_at);return l`${zn(e)}
    <div class="mon-c__meta">
      <span class="mon-c__grip" aria-hidden="true">⠿</span>${Hn(e)}
      ${r?l`<span class="ctl-chip ctl-chip--route">${r}</span>`:""}
      ${sr(e.labels,null).map(a=>l`<span class="ctl-chip ctl-chip--label">${a}</span>`)}
      ${yr(e)}
      ${o?l`<span title=${`\uC218\uC815 ${ot(e.updated_at)}`}
            >수정 ${o}</span
          >`:""}
      ${e.reason?l`<span
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
    </div>`}function Rd(e){return l`${zn(e)}
    <div class="mon-c__meta">
      <span class="mon-c__grip" aria-hidden="true">⠿</span>
      <span class="mon-live__pos">#${e.queue_position}</span>${Hn(e)}
      ${Ss(e)}
      ${e.reason?l`<span class="mon-c__reason">${e.reason}</span>`:""}
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
        </div>`:""}`}function Id(e){let t=!!($t(e.usage)||e.merge_action||e.cancel_action||e.discard_action);return l`${zn(e)}
    <div class="mon-c__meta">
      ${Hn(e)}${yr(e)}
      ${e.pr_url&&e.pr_number?l`<a
            class="mon-c__pr"
            href=${e.pr_url}
            target="_blank"
            rel="noreferrer noopener"
            title="PR 열기"
            >#${e.pr_number} ↗</a
          >`:""}
      ${Ss(e)}
      ${e.reason?l`<span class="mon-c__reason">${e.reason}</span>`:""}
    </div>
    ${t?l`<div class="mon-c__tail">
          ${xs(e)}
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
                ?disabled=${e.discard_enabled===!1}
                title=${e.discard_enabled===!1?e.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C)"}
              >
                폐기
              </button>`:""}
        </div>`:""}`}function Ld(e,t){let n=e.done_kind||"",r=n?yd[n]||n:"",s=vt(e.done_at,t);return l`${zn(e)}
    <div class="mon-c__meta">
      ${Hn(e)}${yr(e)}
      ${r?l`<span
            class="mon-live__kind${$d.has(n)?" mon-live__kind--ok":" mon-live__kind--warn"}"
            >${r}</span
          >`:""}
      ${xs(e)}
      ${s?l`<span title=${`\uC644\uB8CC ${ot(e.done_at)}`}
            >완료 ${s}</span
          >`:""}
    </div>`}function Ha(e,t){return e.lane==="running"?Ed(e,t):e.lane==="runnable"?Cd(e):e.lane==="queue"?Rd(e):e.lane==="pr_wait"?Id(e):Ld(e,t)}function Wa(e){let t=String(e.revision);return l`<header
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
        ${e.auto_advance?ks():ws()}
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
        ${Pa()}
        <span class="mon-ctl__label">머지</span>
      </button>
      <label class="mon-ctl mon-ctl--slots" title="동시에 실행할 세션 수">
        ${Fa()}
        <span class="mon-ctl__label">슬롯</span>
        <input
          type="number"
          class="mon-slots__input"
          min=${Un}
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
        ${qa()}
        <span class="mon-ctl__label">설정</span>
      </button>
    </span>
  </header>`}function Ga(e){let{total:t,both_on:n}=e.automation,r=t>0&&n===t,s=Ct.find(o=>o.value===e.done_range)?.label||"";return l`<div class="mon-top">
    <button
      type="button"
      class="mon-auto-all${r?" is-active":""}"
      data-on=${r?"false":"true"}
      aria-pressed=${r?"true":"false"}
      ?disabled=${t===0}
      title=${r?"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uB055\uB2C8\uB2E4 (\uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4)":"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uCF2D\uB2C8\uB2E4"}
    >
      ${r?ys():Ba()}
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
        ${Ct.map(o=>l`<option
              value=${o.value}
              ?selected=${e.done_range===o.value}
            >
              ${o.label}
            </option>`)}
      </select>
      ${e.token_total?l`<span
            class="mon-kpi__chip mon-kpi__chip--tokens"
            title=${e.token_tooltip}
            >${s} 완료 · 누적 ${e.token_total}</span
          >`:""}
    </div>
  </div>`}function ja(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function Ya(e){let t={};for(let a of Mt)t[a]=0;let n=!1,r=0,s=0,o=0;for(let a of Array.isArray(e)?e:[]){let c=a&&a.usage;if(c&&typeof c=="object"){let i=!1;for(let d of Mt){let f=c[d];typeof f=="number"&&Number.isFinite(f)&&(t[d]+=f,n=!0,i=!0)}if(i){s+=1;let d=c.total_cost_usd;typeof d=="number"&&Number.isFinite(d)&&(r+=d,o+=1)}}}return s>0&&o===s&&(t.total_cost_usd=r),n?$t(t):null}var Ka="bdui.monitor.done-range";function Dd(){try{let e=window.localStorage.getItem(Ka);return Ot(e)?e:wt}catch{return wt}}function Od(e){try{window.localStorage.setItem(Ka,e)}catch{}}var Za="tab:monitor:pipeline",Md=1e3,Nd=[{lane:"runnable",pane:"candidate",title:"\uC2E4\uD589\uAC00\uB2A5",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589\uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}];function Va(e,t){let n=e.lane==="runnable"||e.lane==="queue";return l`<div
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
    ${Ha(e,t)}
  </div>`}function Xa(e,t){let n=Ue("views:monitor"),r=t.gotoIssue,s=t.pipelineStore,o=t.transport,a=t.getWorkspacePath,c=t.switchWorkspace,i=t.now||(()=>Date.now()),d=t.confirm||(P=>typeof globalThis.confirm!="function"||globalThis.confirm(P)),f=Dd();function _(){let P=Ct.find(G=>G.value===f);return P?P.label:""}let v=document.createElement("div");v.className="mon",e.appendChild(v);let y=$s(null,null),$=null,g=new Map,R=new Set;function W(P){return y.queue_groups.find(G=>G.root_dir===P)||null}let Y=kr(e,{queueStore:{get(){if(!$)return{revision:0,exec_defaults:{}};let P=g.get($);if(P)return P;let G=W($),O=s&&s.get?s.get():null,de=(Array.isArray(O)?O:[]).find(ue=>ue&&ue.root_dir===$);return{revision:G?G.revision:0,exec_defaults:G?G.exec_defaults:{},workspace_info:de?de.workspace_info:void 0}},set(P){$&&g.set($,P);for(let G of Array.from(R))G()},subscribe(P){return R.add(P),()=>R.delete(P)}},transport:o?(P,G)=>o(P,{...G||{},root_dir:$}):void 0,getWorkspacePath:()=>$||void 0}),N=null,E=null;async function S(P,G,O,de){if(!o||!O)return null;let ue=await o(P,{...G,root_dir:O,expected_revision:de});if(ue&&ue.conflict){let be=ue.queue&&typeof ue.queue.revision=="number"?ue.queue.revision:de;ue=await o(P,{...G,root_dir:O,expected_revision:be})}return ue&&ue.queue&&O&&g.set(O,ue.queue),ue}async function M(P,G,O){return!o||!O?null:await o(P,{...G,root_dir:O})}async function x(P){if(!o||!P&&!d("\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB055\uB2C8\uB2E4. \uAC01 \uB808\uD3EC\uC758 \uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uD568\uAED8 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?"))return;let G=await o("monitor-auto-toggle",{on:P}),O=G&&Array.isArray(G.failed)?G.failed:[];O.length>0&&se(`\uC790\uB3D9\uD654 ${P?"\uCF1C\uAE30":"\uB044\uAE30"} \uC77C\uBD80 \uC2E4\uD328: ${O.map(de=>de.root_dir).join(", ")}`,"error",3200)}async function j(){let P=new Map;for(let G of y.pr_wait)P.has(G.root_dir)||P.set(G.root_dir,G.expected_revision);for(let[G,O]of P)await S("worker-merge-queue-add-all",{},G,O)}let V=null,X=!1,oe=null;function De(){oe!==null&&clearTimeout(oe),oe=setTimeout(()=>{oe=null,X=!1},0)}function We(P){let G=P.target;return typeof G?.closest=="function"?G.closest(".mon-group"):null}function Se(P){let G=We(P);return!G||!V?null:(G.getAttribute("data-root-dir")||"")===V.root_dir?G:null}function J(){for(let P of Array.from(v.querySelectorAll(".mon-group--drag-over")))P.classList.remove("mon-group--drag-over")}function te(P){let G=P.target,O=typeof G?.closest=="function"?G.closest('.mon-card[draggable="true"]'):null;if(O){V={bead_id:O.getAttribute("data-issue-id")||"",lane:O.getAttribute("data-lane")||"",root_dir:O.getAttribute("data-root-dir")||"",revision:Number(O.getAttribute("data-revision")||0)||0,queue_index:Number(O.getAttribute("data-queue-index")),queue_length:Number(O.getAttribute("data-queue-length")),place_index:Number(O.getAttribute("data-place-index"))},X=!0;try{P.dataTransfer?.setData("text/plain",V.bead_id),P.dataTransfer&&(P.dataTransfer.effectAllowed="move")}catch{}}}function A(P){let G=Se(P);G&&(P.preventDefault(),P.dataTransfer&&(P.dataTransfer.dropEffect="move"),G.classList.add("mon-group--drag-over"))}function T(P){We(P)?.classList.remove("mon-group--drag-over")}function Q(){V=null,J(),De()}function ne(P){let G=Se(P),O=V;if(V=null,J(),!G||!O||!O.bead_id)return;P.preventDefault();let de=P.target,ue=typeof de?.closest=="function"?de.closest('.mon-card[data-lane="queue"]'):null,be=ue&&G.contains(ue)?Number(ue.getAttribute("data-queue-index")):NaN;if(O.lane==="runnable"){let Ie=Number.isFinite(be)?be:O.place_index;if(!Number.isFinite(Ie))return;S("worker-queue-place",{bead_id:O.bead_id,index:Ie},O.root_dir,O.revision);return}if(O.lane!=="queue"||ue&&ue.getAttribute("data-issue-id")===O.bead_id)return;let pe=O.queue_index,$e=Number.isFinite(be)?pe>be?be:be-1:O.queue_length-1;!Number.isFinite($e)||$e<0||$e===pe||S("worker-queue-reorder",{bead_id:O.bead_id,to_index:$e},O.root_dir,O.revision)}function ce(P){let G={runnable:y.runnable,queue:y.queue,running:y.running,pr_wait:y.pr_wait,done:y.done};return l`${Ga({automation:y.automation,counts:{running:y.running.length,queue:y.queue.length,pr_wait:y.pr_wait.length},done_range:f,token_total:Ya(y.done),token_tooltip:ja(_())})}
      <div class="worker-lanes mon-lanes">
        ${Nd.map(O=>{let de=G[O.lane],ue=O.lane==="queue"?y.queue_groups.length>0?l`${y.queue_groups.map(be=>l`<div
                        class="mon-group"
                        data-root-dir=${be.root_dir}
                      >
                        ${Wa(be)}
                        <div class="mon-group__list">
                          ${be.items.map(pe=>Va(pe,P))}
                        </div>
                      </div>`)}`:void 0:de.length>0?l`${de.map(be=>Va(be,P))}`:void 0;return It({id:`monitor-${O.lane}`,lane:O.pane,title:O.lane==="done"?`\uC644\uB8CC\xB7${_()}`:O.title,items:de,empty:O.empty,body:ue,live:O.lane==="running"&&de.length>0,header_control:O.lane==="pr_wait"&&de.length>0?l`<button
                    type="button"
                    class="mon-lane-op mon-merge-all"
                    title="자격이 생기는 PR을 각 레포의 머지 큐에 한 번에 넣습니다"
                  >
                    일괄 머지
                  </button>`:""})})}
      </div>`}function fe(){let P=s&&s.get?s.get():null,G=s&&s.getWorkspacesState?s.getWorkspacesState():[],O=i();y=$s(P,G,{done_since:cn(f,O)}),Ce(ce(O),v)}function Re(P,G){let O=a?a():void 0;if(!G||!O||G===O||!c){r(P);return}c(G).then(()=>{r(P)}).catch(de=>{n("workspace switch for %s failed: %o",G,de)})}function he(P){return{root_dir:P.getAttribute("data-root-dir")||"",revision:Number(P.getAttribute("data-revision")||0)||0}}function Ee(P,G){let{root_dir:O,revision:de}=he(P),ue=P.getAttribute("data-issue-id")||"",be=P.getAttribute("data-attempt-id")||"",pe=G.classList;if(pe.contains("worker-card__place")){S("worker-queue-place",{bead_id:ue,index:Number(P.getAttribute("data-place-index")||0)||0},O,de);return}if(pe.contains("mon-op--up")||pe.contains("mon-op--down")){let $e=Number(P.getAttribute("data-queue-index")||0)||0,Ie=pe.contains("mon-op--up")?$e-1:$e+1;if(Ie<0)return;S("worker-queue-reorder",{bead_id:ue,to_index:Ie},O,de);return}if(pe.contains("mon-op--remove")){S("worker-queue-remove",{bead_id:ue},O,de);return}if(pe.contains("mon-op--pause")){M("worker-attempt-pause",{attempt_id:be},O);return}if(pe.contains("mon-op--stop")){M("worker-attempt-stop",{attempt_id:be},O);return}if(pe.contains("mon-op--resume")){S("worker-attempt-resume",{attempt_id:be},O,de);return}if(pe.contains("mon-op--dismiss")){S("worker-attempt-dismiss",{attempt_id:be},O,de);return}if(pe.contains("worker-mini__merge")){S("worker-merge-queue-add",{bead_id:ue},O,de);return}if(pe.contains("worker-mini__merge-cancel")){S("worker-merge-queue-remove",{bead_id:ue},O,de);return}if(pe.contains("worker-mini__discard")){if(!d(`${ue}: PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4. \uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`))return;S("worker-pr-discard",{bead_id:ue},O,de);return}if(pe.contains("worker-mini__revise-fix")){S("worker-revise-fix",{bead_id:ue},O,de);return}pe.contains("worker-mini__revise-approve")&&S("worker-revise-approve",{bead_id:ue},O,de)}function Fe(P){let G=X;X=!1;let O=P.target;if(!O||typeof O.closest!="function"||O.closest("dialog")||O.closest("a"))return;let de=O.closest(".mon-auto-all");if(de){P.preventDefault(),x(de.getAttribute("data-on")==="true");return}if(O.closest(".mon-merge-all")){P.preventDefault(),j();return}let be=O.closest(".mon-ctl--advance");if(be){P.preventDefault();let{root_dir:Ke,revision:it}=he(be);S("worker-queue-toggle",{on:be.getAttribute("data-on")==="true"},Ke,it);return}let pe=O.closest(".mon-ctl--merge-auto");if(pe){P.preventDefault();let{root_dir:Ke,revision:it}=he(pe);S("worker-merge-auto-toggle",{on:pe.getAttribute("data-on")==="true"},Ke,it);return}let $e=O.closest(".mon-ctl--exec");if($e){P.preventDefault(),$=$e.getAttribute("data-root-dir")||null,g.delete($||""),Y.open();return}let Ie=O.closest(".mon-card");if(!Ie)return;let nt=O.closest("button");if(nt){P.preventDefault(),Ee(Ie,nt);return}let ze=Ie.getAttribute("data-issue-id");ze&&!G&&(P.preventDefault(),Re(ze,Ie.getAttribute("data-root-dir")||""))}function Oe(P){let G=P.target;if(!G||typeof G.closest!="function")return;let O=G.closest(".mon-done-range");if(O){f=Ot(O.value)?O.value:wt,Od(f),fe();return}let de=G.closest(".mon-slots__input");if(!de)return;let{root_dir:ue,revision:be}=he(de),pe=Number(de.value);if(!Number.isFinite(pe))return;let $e=Math.max(Un,Math.floor(pe));S("worker-queue-set-slots",{slots:$e},ue,be)}e.addEventListener("click",Fe),e.addEventListener("change",Oe),e.addEventListener("dragstart",te),e.addEventListener("dragover",A),e.addEventListener("dragleave",T),e.addEventListener("drop",ne),e.addEventListener("dragend",Q),s&&typeof s.subscribe=="function"&&(N=s.subscribe(()=>{try{g.clear(),fe();for(let P of Array.from(R))P()}catch{}}));function Ge(){E!==null&&(clearInterval(E),E=null)}function at(){oe!==null&&(clearTimeout(oe),oe=null)}return{load(){n("load"),fe(),E===null&&(E=setInterval(()=>{try{fe()}catch{}},Md))},pause(){Ge()},clear(){Ge(),at(),N&&(N(),N=null),e.removeEventListener("click",Fe),e.removeEventListener("change",Oe),e.removeEventListener("dragstart",te),e.removeEventListener("dragover",A),e.removeEventListener("dragleave",T),e.removeEventListener("drop",ne),e.removeEventListener("dragend",Q),Y.destroy(),R.clear(),e.replaceChildren()}}}function Qa(e,t,n){let r=Ue("views:nav"),s=null;function o(i){return d=>{d.preventDefault(),r("click tab %s",i),n.gotoView(i)}}function a(){let i=t.getState(),d=i.view==="worker"||i.view==="monitor"?i.view:"board";return l`
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
    `}function c(){Ce(a(),e)}return c(),s=t.subscribe(()=>c()),{destroy(){s&&(s(),s=null),Ce(l``,e)}}}var Ja=["bug","feature","task","epic","chore"];function ei(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var ti=["Critical","High","Medium","Low","Backlog"];function ni(e,t){let n=document.createElement("dialog");n.id="new-issue-dialog",n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true"),n.innerHTML=`
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
  `,e.appendChild(n);let r=n.querySelector("#new-issue-form"),s=n.querySelector("#new-title"),o=n.querySelector("#new-type"),a=n.querySelector("#new-priority"),c=n.querySelector("#new-labels"),i=n.querySelector("#new-description"),d=n.querySelector("#new-issue-error"),f=n.querySelector("#btn-cancel"),_=n.querySelector("#btn-create"),v=n.querySelector(".new-issue__close");function y(){o.replaceChildren();let E=document.createElement("option");E.value="",E.textContent="\u2014 Select \u2014",o.appendChild(E);for(let S of Ja){let M=document.createElement("option");M.value=S,M.textContent=ei(S),o.appendChild(M)}a.replaceChildren();for(let S=0;S<=4;S+=1){let M=document.createElement("option");M.value=String(S);let x=ti[S]||"Medium";M.textContent=`${S} \u2013 ${x}`,a.appendChild(M)}}y();function $(){try{typeof n.close=="function"?n.close():n.removeAttribute("open")}catch{n.removeAttribute("open")}}function g(E){s.disabled=E,o.disabled=E,a.disabled=E,c.disabled=E,i.disabled=E,f.disabled=E,_.disabled=E,_.textContent=E?"Creating\u2026":"Create"}function R(){d.textContent=""}function W(E){d.textContent=E}function H(){try{let E=window.localStorage.getItem("beads-ui.new.type");E?o.value=E:o.value="";let S=window.localStorage.getItem("beads-ui.new.priority");S&&/^\d$/.test(S)?a.value=S:a.value="2"}catch{o.value="",a.value="2"}}function Y(){let E=o.value||"",S=a.value||"";E.length>0&&window.localStorage.setItem("beads-ui.new.type",E),S.length>0&&window.localStorage.setItem("beads-ui.new.priority",S)}async function N(){R();let E=String(s.value||"").trim();if(E.length===0){W("Title is required"),s.focus();return}let S=Number(a.value||"2");if(!(S>=0&&S<=4)){W("Priority must be 0..4"),a.focus();return}let M=String(o.value||""),x=String(i.value||""),j={title:E};M.length>0&&(j.type=M),String(S).length>0&&(j.priority=S),x.length>0&&(j.description=x),g(!0);try{await t("create-issue",j)}catch{g(!1),W("Failed to create issue");return}Y(),g(!1),$()}return n.addEventListener("cancel",E=>{E.preventDefault(),$()}),v.addEventListener("click",()=>$()),f.addEventListener("click",()=>$()),n.addEventListener("keydown",E=>{E.key==="Enter"&&(E.ctrlKey||E.metaKey)&&(E.preventDefault(),N())}),r.addEventListener("submit",E=>{E.preventDefault(),N()}),{open(){r.reset(),R(),H();try{"showModal"in n&&typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")}catch{n.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){$()}}}var Pd="tab:worker:ready",Fd="tab:worker:blocked",qd="tab:worker:in-progress",$r=1;function Es(e){let t=e&&e.metadata;return!!(t&&typeof t=="object"&&t.spec_id)}var ai="beads-ui.worker.candidate-filter",As={show_blocked:!1,spec:"all"};function Bd(){try{let e=window.localStorage.getItem(ai);if(!e)return{...As};let t=JSON.parse(e);if(!t||typeof t!="object")return{...As};let n=t.spec;return{show_blocked:t.show_blocked===!0,spec:n==="with"||n==="without"?n:"all"}}catch{return{...As}}}function Ud(e){try{window.localStorage.setItem(ai,JSON.stringify(e))}catch{}}function zd(e,t){let n=c=>t.show_blocked||!c.blocked,r=c=>t.spec==="all"||(t.spec==="with"?c.has_spec:!c.has_spec),s=[],o=0,a=0;for(let c of e){let i=n(c),d=r(c);i&&d?s.push(c):!i&&d?o+=1:i&&!d&&(a+=1)}return{visible:s,hidden_blocked:o,hidden_spec:a}}var Hd=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],ii="bdui.worker.candidate_sort",Wd=[{value:"spec",label:"spec \uC6B0\uC120"},{value:"board",label:"Board \uC21C\uC11C"},{value:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131\uC21C"}],xr="spec";function Gd(){try{let e=window.localStorage.getItem(ii);return e==="board"||e==="created"||e==="spec"?e:xr}catch{return xr}}function jd(e){try{window.localStorage.setItem(ii,e)}catch{}}var li="bdui.worker.done-range";function Yd(){try{let e=window.localStorage.getItem(li);return Ot(e)?e:wt}catch{return wt}}function Vd(e){try{window.localStorage.setItem(li,e)}catch{}}var Kd="(max-width: 640px)",ci="beads-ui.worker.lane-collapsed",Wn={queue:!0,done:!0};function Zd(){try{let e=window.localStorage.getItem(ci);if(!e)return{...Wn};let t=JSON.parse(e);return!t||typeof t!="object"?{...Wn}:{queue:typeof t.queue=="boolean"?t.queue:Wn.queue,done:typeof t.done=="boolean"?t.done:Wn.done}}catch{return{...Wn}}}function Xd(e){try{window.localStorage.setItem(ci,JSON.stringify(e))}catch{}}function ri(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let n=typeof t.title=="string"?t.title:t.id||"";return n.length>22?`${n.slice(0,22)}\u2026`:n}function Qd(e,t,n){let r=Array.isArray(e)?e.slice():[];return t==="created"?r.sort(Qt):(r.sort(Qn(n)),t==="board"?r:[...r.filter(Es),...r.filter(s=>!Es(s))])}function Jd(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function eu(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function tu(e){let n=(Array.isArray(e?.dependencies)?e.dependencies:[]).map(r=>typeof r=="string"?r:r&&r.id).filter(Boolean);return n.length>0?`\u{1F512} ${n.join(", ")}`:"\u{1F512} blocked"}var nu=["closed_unmerged","undecidable"],ru=[{from:"\uAD00\uCE21 \uB300\uAE30",activity:"checking",to:"\uD655\uC778\uC911"},{from:"\uB85C\uCEEC\uAC80\uC99D \uB300\uAE30",activity:"verifying",to:"\uB85C\uCEEC\uAC80\uC99D \uC2E4\uD589 \uC911"}];function su(e,t){for(let n of ru)if(e===n.from&&t===n.activity)return{label:n.to,live:!0};return{label:e,live:!1}}var Ts=[{step:"merging",label:"\uBA38\uC9C0 \uC911"},{step:"base_sync",label:"base \uB3D9\uAE30\uD654"},{step:"post_merge_verify",label:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D"},{step:"deploy",label:"\uBC30\uD3EC"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"},{step:"ship_exported_capabilities",label:"capability \uBC1C\uD589"}];function ou(e){if(typeof e!="string"||e.length===0)return null;let t=Ts.length,n=Ts.findIndex(r=>r.step===e);return n<0?{label:e,index:0,total:t,percent:0}:{label:Ts[n].label,index:n+1,total:t,percent:Math.round((n+1)/t*100)}}function si(e){switch(e){case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";default:return e}}function oi(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}function au(e,t,n,r,s=null,o=null,a=null,c=!1,i=null,d=!0,f=null,_=null){let v=!!i&&i.position>0,y=!!i&&i.active===!0,$=i&&i.failure||null,g=n[e]||null,R=g&&g.gate?g.gate:null,W=g&&g.pr?g.pr:null,H=[];c&&H.push("\uC138\uC158");let Y=a?a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":null,N=su(c&&R&&R.tier==="closed_unmerged"?"\uB2EB\uD798":R&&R.gate_badge||"",Y?null:o&&o.activity||null);Y&&H.push(Y),N.label&&H.push(N.label),R&&R.base_badge&&R.base_badge!==R.gate_badge&&H.push(R.base_badge),_&&H.push(_),r&&H.push("\uC815\uB9AC \uC2E4\uD328"),v&&!y&&H.push(`\uBA38\uC9C0 \uB300\uAE30 #${i.position}`),$&&H.push(`\uC77C\uAD04 \uBA38\uC9C0 \uC2E4\uD328: ${si($)}`),f&&H.push(`\uC790\uB3D9 \uC81C\uC678: ${si(f)}`);let E=!!R&&R.base_badge==="\uCDA9\uB3CC",S=!!R&&R.enabled===!0,M=ou(o&&o.merge_progress?o.merge_progress.step:null),x=!!r&&!!R&&R.tier==="merged",j=c&&!!R&&R.tier==="merged",V=c&&E&&d===!1;return{id:e,title:t,reason:r?"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644":"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",external:c,pr_number:W&&typeof W.number=="number"?W.number:null,pr_url:W&&typeof W.url=="string"?W.url:"",badges:H,live_badge:a==="running"?Y:Y?null:N.live?N.label:null,usage:s,alert:!!R&&nu.includes(R.tier)||!!r||!!$,merge_action:!v,cancel_action:v,cancel_enabled:!y,cancel_title:y?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard_action:!c&&!r&&!(R&&R.tier==="merged"),merge_step:M,discard_enabled:!M&&!a&&!v,discard_title:a?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":v?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":void 0,merge_enabled:!M&&!a&&!V&&(S||E||x||j),merge_label:j?"\uC815\uB9AC":E&&!M&&!x?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:M?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${M.label}`:j?"\uBA38\uC9C0\uB428 \u2014 \uD074\uB9AD\uD558\uBA74 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC\uB97C \uC218\uD589\uD569\uB2C8\uB2E4":V?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":x?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uCC98\uC74C\uBD80\uD130 \uB2E4\uC2DC \uC218\uD589\uD569\uB2C8\uB2E4":E?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":S?`\uBA38\uC9C0 (${R.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:R&&R.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${R&&R.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function Cs(e,t={}){let{transport:n,issueStores:r,queueStore:s,sessionLogStore:o,uiOrderStore:a,gotoIssue:c,getWorkspacePath:i}=t,d=r?er(r,a):null,f=nr({transport:n,uiOrderStore:a}),_=null,v=[],y=Bd(),$=Gd(),g=Yd();function R(){let u=Ct.find(b=>b.value===g);return u?u.label:"\uC624\uB298"}let W=Zd(),H=!1,Y=new Set,N=new Set,E=[],S=document.createElement("div");S.className="worker-console";let M=document.createElement("div");M.className="worker-top";let x=document.createElement("div");x.className="worker-drawer-overlay",x.hidden=!0;let j=document.createElement("div");j.className="worker-drawer-overlay__backdrop";let V=document.createElement("div");V.className="worker-drawer-host",x.append(j,V);let X=document.createElement("div");X.className="worker-lanes-host",S.append(M,x,X),e.appendChild(S);let oe=null,De=vr(V,{transport:n,sessionLogStore:o,onClose:()=>{oe=null,x.hidden=!0,ke()}}),We=kr(S,{queueStore:s,transport:n,getWorkspacePath:i});function Se(){return s&&s.get()||{revision:0,auto_advance:!1,auto_merge:!1,slots:$r,queue:[],pr_wait:[],done:[]}}function J(){let u=Se();return typeof u.revision=="number"?u.revision:0}function te(u){u&&u.queue&&s&&s.set(u.queue)}function A(){let u=Se().queue;return Array.isArray(u)?u.length:0}async function T(u,b){if(!n)return;let I=await n("worker-queue-place",{bead_id:u,index:b,expected_revision:J()});te(I),I&&I.conflict&&await n("worker-queue-place",{bead_id:u,index:b,expected_revision:J()}).then(te)}async function Q(u,b){if(!n)return;let I=await n("worker-queue-reorder",{bead_id:u,to_index:b,expected_revision:J()});te(I),I&&I.conflict&&await n("worker-queue-reorder",{bead_id:u,to_index:b,expected_revision:J()}).then(te)}async function ne(u){if(!n)return;let b=await n("worker-queue-remove",{bead_id:u,expected_revision:J()});te(b),b&&b.conflict&&await n("worker-queue-remove",{bead_id:u,expected_revision:J()}).then(te)}async function ce(u){!n||!u||await n("worker-attempt-stop",{attempt_id:u})}async function fe(u){if(!n||!u)return;let b=await n("worker-attempt-pause",{attempt_id:u});b&&b.paused===!1&&b.reason&&se(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${b.reason}`,"error",2400)}async function Re(u){if(!n||!u)return;let b=await n("worker-attempt-resume",{attempt_id:u,expected_revision:J()});te(b),b&&b.conflict&&(b=await n("worker-attempt-resume",{attempt_id:u,expected_revision:J()}),te(b)),b&&b.resumed===!1&&!b.conflict&&b.reason&&se(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${b.reason}`,"error",2400)}async function he(u){if(!n||!u)return;let b=await n("worker-attempt-dismiss",{attempt_id:u,expected_revision:J()});te(b),b&&b.conflict&&(b=await n("worker-attempt-dismiss",{attempt_id:u,expected_revision:J()}),te(b)),b&&b.dismissed===!1&&!b.conflict&&b.reason&&se(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${b.reason}`,"error",2400)}async function Ee(u,b){if(!n)return null;let I=n,ee=await I(u,{...b,expected_revision:J()});return te(ee),ee&&ee.conflict&&(ee=await I(u,{...b,expected_revision:J()}),te(ee)),ee}async function Fe(u){if(!n||!u)return;Y.add(u),ke();let b;try{b=await Ee("worker-merge-queue-add",{bead_id:u})}finally{Y.delete(u),ke()}!b||b.conflict||b.applied||se("\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)","error",2400)}async function Oe(u){if(!n)return;let b=await Ee("worker-merge-auto-toggle",{on:u});!b||b.conflict||se(u?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",u?"success":"info",2400)}async function Ge(u){if(!n||!u)return;let b=await Ee("worker-merge-queue-remove",{bead_id:u});b&&!b.conflict&&!b.applied&&b.reason==="merge_active"&&se("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function at(){await Ee("worker-merge-queue-remove",{all:!0})}async function P(u){if(!n||!u||!(typeof globalThis.confirm!="function"||globalThis.confirm(`${u}: PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4. \uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694. \uACC4\uC18D\uD560\uAE4C\uC694?`)))return;let I=await n("worker-pr-discard",{bead_id:u,expected_revision:J()});if(te(I),I&&I.conflict&&(I=await n("worker-pr-discard",{bead_id:u,expected_revision:J()}),te(I)),I&&I.discarded===!0){se("\uD3D0\uAE30 \uC644\uB8CC \u2014 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB2E4\uC2DC \uC2E4\uD589\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4","success",2400);return}I&&I.discarded===!1&&!I.conflict&&se(`\uD3D0\uAE30 \uAC70\uBD80: ${I.reason||""}`,"error",2800)}async function G(u,b){if(!n||!b||N.has(b))return;N.add(b),ke();let I;try{I=await n(u,{bead_id:b,expected_revision:J()}),te(I),I&&I.conflict&&(I=await n(u,{bead_id:b,expected_revision:J()}),te(I))}finally{N.delete(b),ke()}if(!(!I||I.conflict)){if(I.ok){se(u==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}se(`\uCC98\uBD84 \uAC70\uBD80: ${I.reason||""}`,"error",3e3)}}async function O(u){if(!n)return;let b=await n("worker-queue-toggle",{on:u,expected_revision:J()});te(b),b&&b.conflict&&await n("worker-queue-toggle",{on:u,expected_revision:J()}).then(te)}async function de(u){await O(u),await Oe(u)}async function ue(u){if(!n||!Number.isFinite(u))return;let b=Math.max($r,Math.floor(u)),I=await n("worker-queue-set-slots",{slots:b,expected_revision:J()});te(I),I&&I.conflict&&await n("worker-queue-set-slots",{slots:b,expected_revision:J()}).then(te)}function be(){let u=Se(),b=d?d.selectBoardColumn(Pd,"ready"):[],I=d?d.selectBoardColumn(Fd,"blocked"):[],ee=d?d.selectBoardColumn(qd,"in_progress"):[],Z=new Map;for(let k of ee){let z=eu(k);if(!z)continue;let ie=Z.get(z);ie?ie.push(k):Z.set(z,[k])}let me=k=>{let z=tr(Z.get(k)||[]);return z?z.title||z.id:null},Ae=u.bead_titles||{},Me=new Map;for(let[k,z]of Object.entries(Ae))typeof z=="string"&&z.length>0&&Me.set(k,z);for(let k of[...b,...I])Me.set(k.id,k.title||k.id);let Ye=u.bead_times||{},we=new Map;for(let[k,z]of Object.entries(Ye))z&&typeof z=="object"&&we.set(k,z);for(let k of[...b,...I])we.set(k.id,{created_at:k.created_at,updated_at:k.updated_at});let h=k=>we.get(k)||{},q=u.pr_wait||[],B=u.pr_observations||{},K=u.pr_activity||{},qe=u.cleanup_failed||{},_e=Object.entries(qe).map(([k,z])=>({bead_id:k,step:z&&z.step?z.step:"",reason:z&&z.reason?z.reason:"",detail:z&&typeof z.detail=="string"?z.detail:null,output_tail:z&&typeof z.output_tail=="string"&&z.output_tail?z.output_tail:void 0,log_path:z&&typeof z.log_path=="string"&&z.log_path?z.log_path:void 0})),ve=u.ship_failure||null,tt=ve&&typeof ve.reason=="string"&&ve.reason?{bead_id:typeof ve.bead_id=="string"?ve.bead_id:"",reason:ve.reason,detail:typeof ve.detail=="string"?ve.detail:null,pr_url:typeof ve.pr_url=="string"?ve.pr_url:null}:null,jt=u.queue||[],ht=new Set([...jt.map(k=>k.bead_id),...q.map(k=>k.bead_id),...u.done.map(k=>k.bead_id)]),Ft=new Set(I.map(k=>k.id)),qt=a?a.get()?.order||{}:{},Bt=new Set,m=[];for(let k of[...b,...I])ht.has(k.id)||Bt.has(k.id)||Jd(k)||(Bt.add(k.id),m.push(k));v=Qd(m,$,qt);let w=u.admission||{},L=k=>{let z=w[k];if(!z)return"";if(z.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let ie=typeof z.reason=="string"?z.reason:"",Ne=ie.indexOf(":");return Ne>0&&Ne<ie.length-1?`\u26D4 ${ie.slice(0,Ne)} (${ie.slice(Ne+1)})`:`\u26D4 ${ie}`},p=v.map(k=>{let z=Es(k),ie=Ft.has(k.id),Ne=[];ie&&Ne.push(tu(k)),z||Ne.push("spec \uC5C6\uC74C");let Vn=L(k.id);return Vn&&Ne.push(Vn),{id:k.id,title:k.title||k.id,reason:Ne.join(" \xB7 "),draggable:z,lane:"candidate",created_at:k.created_at,updated_at:k.updated_at,workflow:k.workflow,status:k.status,blocked:ie,has_spec:z}}),C=zd(p,y),U=C.visible,xe=u.revise_parked||{},et=(k,z)=>k.map(ie=>{let Ne=z==="queue"?xe[ie.bead_id]:null;return{id:ie.bead_id,title:Me.get(ie.bead_id)||ie.bead_id,reason:z==="done"?"":L(ie.bead_id),draggable:z!=="done",done:z==="done",lane:z,badges:Ne?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!Ne,revise_action:!!Ne,revise_enabled:!!Ne&&!N.has(ie.bead_id),revise_title:Ne?Ne.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${Ne.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":"",usage:z==="done"?Rt(u.attempts||{},ie.bead_id):null,done_at:z==="done"&&typeof ie.added_at=="number"?ie.added_at:void 0,...h(ie.bead_id)}}),He=new Map;for(let k of u.done)k&&typeof k.bead_id=="string"&&typeof k.added_at=="number"&&He.set(k.bead_id,k.added_at);let Ze=u.attempts?Object.values(u.attempts):[],bt=new Set;for(let k of Ze)k&&typeof k.resumed_from=="string"&&k.resumed_from.length>0&&bt.add(k.resumed_from);let Lt=new Map;for(let k of Ze)Lt.set(k.bead_id,k.attempt_id);let sn=new Map;for(let k of Ze)sn.set(k.attempt_id,k);function Xe(k){let z=new Set,ie=k;for(;ie&&!z.has(ie.attempt_id);){if(ie.conflict_resolution===!0)return!0;z.add(ie.attempt_id),ie=typeof ie.resumed_from=="string"&&ie.resumed_from.length>0&&sn.get(ie.resumed_from)||null}return!1}let on=typeof u.declared_base=="string"?u.declared_base:null;function Gn(k){let z=null;for(let ie of Ze)!ie||ie.bead_id!==k||Xe(ie)||(z===null||(typeof ie.started_at=="number"?ie.started_at:0)>=(typeof z.started_at=="number"?z.started_at:0))&&(z=ie);return z&&typeof z.target_base=="string"?z.target_base:null}let vn=[],Et=null;for(let k of Ze){let z=k.status==="paused"&&!bt.has(k.attempt_id);if(k.status==="running"||z)vn.push({bead_id:k.bead_id,attempt_id:k.attempt_id,title:Me.get(k.bead_id)||k.bead_id,runner:k.runner||null,model:k.model||null,effort:k.effort||null,started_at:typeof k.started_at=="number"?k.started_at:null,resumed_from:k.resumed_from||null,paused:z,conflict_resolution:Xe(k),base_exception:oi(on,k.target_base),can_pause:typeof k.session_id=="string"&&k.session_id.length>0,usage:Rt(u.attempts||{},k.bead_id),current_child:me(k.bead_id),...h(k.bead_id)});else if(k.status==="failed"||k.status==="orphaned"){let ie=Lt.get(k.bead_id)!==k.attempt_id,Ne=He.get(k.bead_id),Vn=typeof Ne=="number"&&Ne>0&&typeof k.finished_at=="number"&&Ne>=k.finished_at;!ie&&!Vn&&typeof k.dismissed_at!="number"&&(Et=k)}}let Ds=null;if(Et){let k=typeof Et.session_id=="string"&&Et.session_id.length>0,z=bt.has(Et.attempt_id),ie=Et.cause_detail;Ds={repo:Et.repo||"",reason:Et.cause||Et.status,cause_detail:ie&&typeof ie.reason=="string"?{reason:ie.reason,command:typeof ie.command=="string"?ie.command:null}:null,resume_attempt_id:Et.attempt_id,resume_eligible:k&&!z,resume_reason:k?z?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}}let wi=new Set(vn.map(k=>k.bead_id)),Sr=Array.isArray(u.merge_queue)?u.merge_queue:[],Os=new Map;Sr.forEach((k,z)=>{k&&typeof k.bead_id=="string"&&Os.set(k.bead_id,z+1)});let Ms=u.merge_queue_state||{active:null,failures:{}},ki=Ms.failures||{},yi=u.auto_merge_skips||{},Ns=k=>{let z=yi[k];if(!z)return null;let ie=B[k],Ne=ie&&ie.pr?ie.pr.head_sha:null;return Ne&&Ne===z.head_sha?z.reason||"":null},jn=new Map;for(let k of vn)k.conflict_resolution&&(k.paused?jn.has(k.bead_id)||jn.set(k.bead_id,"paused"):jn.set(k.bead_id,"running"));let Ps=vn.filter(k=>!k.paused).length,Fs=(u.workspace_info||{}).slots,qs=typeof Fs=="number"?Fs:typeof u.slots=="number"?u.slots:$r,$i=Ps>qs,Bs=cn(g),xi=(Array.isArray(u.done)?u.done.slice():[]).filter(k=>Bs===void 0||typeof k.added_at!="number"||k.added_at>=Bs).sort((k,z)=>(z.added_at||0)-(k.added_at||0)),Us=et(xi,"done"),Yn={};for(let k of Mt)Yn[k]=0;let zs=!1,Hs=0,Ar=0,Ws=0;for(let k of Us){let z=k.usage;if(z&&typeof z=="object"){let ie=!1;for(let Ne of Mt)Number.isFinite(z[Ne])&&(Yn[Ne]+=z[Ne],zs=!0,ie=!0);ie&&(Ar+=1,Number.isFinite(z.total_cost_usd)&&(Hs+=z.total_cost_usd,Ws+=1))}}Ar>0&&Ws===Ar&&(Yn.total_cost_usd=Hs);let Si=zs?$t(Yn):null;return{queue:u,idToTitle:Me,candidates:U,candidate_hidden:{blocked:C.hidden_blocked,spec:C.hidden_spec},running:vn,live_count:Ps,slots:qs,over_cap:$i,failure:Ds,waiting:et(jt.filter(k=>!wi.has(k.bead_id)),"queue"),pr_wait:q.map(k=>au(k.bead_id,Me.get(k.bead_id)||k.bead_id,B,qe[k.bead_id]||null,Rt(u.attempts||{},k.bead_id),K[k.bead_id]||(Y.has(k.bead_id)?{activity:null,merge_progress:{step:"merging"}}:null),jn.get(k.bead_id)||null,k.external===!0,{position:Os.get(k.bead_id)||0,active:Ms.active===k.bead_id,failure:ki[k.bead_id]||null},k.wt_present!==!1,u.auto_merge===!0?Ns(k.bead_id):null,oi(on,Gn(k.bead_id)))).map(k=>({...k,...h(k.id)})),merge_queue_length:Sr.length,merge_queue_running:Sr.length>0,auto_excluded:q.map(k=>k.bead_id).filter(k=>Ns(k)!==null),verify_cmd_present:!!(u.workspace_info||{}).verify_cmd,declared_base:on,done:Us,token_total:Si,cleanup_failures:_e,ship_failure:tt}}function pe(u){let b=u.waiting.length>0?u.waiting[0].id:"\u2014",I=l`<button
      type="button"
      class="worker-play${u.queue.auto_advance?" is-active":""}"
    >
      ${u.queue.auto_advance?"\u23F8 \uC77C\uC2DC\uC815\uC9C0":"\u25B6 \uC790\uB3D9 \uC9C4\uD589"}
    </button>`,ee=u.queue.auto_advance===!0&&u.queue.auto_merge===!0,Z=l`<button
      type="button"
      class="worker-auto-all${ee?" is-active":""}"
      title=${ee?"\uC790\uB3D9 \uC9C4\uD589\uACFC \uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uB055\uB2C8\uB2E4":"\uC790\uB3D9 \uC9C4\uD589\uACFC \uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uCF2D\uB2C8\uB2E4"}
      aria-pressed=${ee?"true":"false"}
    >
      ${ee?"\u23F9 \uC804\uCCB4 \uC790\uB3D9\uD654":"\u23F5\u23F5 \uC804\uCCB4 \uC790\uB3D9\uD654"}
    </button>`,me=u.over_cap?l`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",Ae=l`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${u.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${u.pr_wait.length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${R()} 완료 <b>${u.done.length}</b></span
      >`,Me=l`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${u.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${u.declared_base||"?"}</span
    >`,Ye=l`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${$r}
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
      </button>`,we=Ma({failure:u.failure,cleanupFailures:u.cleanup_failures,shipFailure:u.ship_failure});return H?l`<div class="worker-ribbon">
          ${I}
          <div class="worker-kpi worker-kpi--ribbon">${me}${Ae}</div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${Z}${Ye}</div>
          <div class="worker-kpi">${Me}</div>
        </div>
        ${we}`:l`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${I}${Z}${Ye}</div>
        <div class="worker-kpi">
          ${me}${Ae}${Me}
          ${u.token_total?l`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${`${R()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}
                >${R()} 완료 · 누적 ${u.token_total}</span
              >`:""}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${b}</b></span
          >
        </div>
      </div>
      ${we}`}function $e(u){if(u.running.length===0&&u.pr_wait.length===0)return"";let b=u.running.some(I=>!I.paused);return l`<section
      class="worker-now${b?" worker-pane--live":""}"
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
        ${Ke(u)}
      </header>
      ${u.running.length>0?vs(u.running,Date.now(),oe):""}
      ${u.pr_wait.map(I=>ms(I))}
    </section>`}function Ie(u){let b=u.candidate_hidden;return l`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${y.show_blocked}
        />
        🔒 blocked${b.blocked>0?` ${b.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${Hd.map(I=>l`<button
              type="button"
              class="worker-filter__chip${y.spec===I.value?" is-active":""}"
              data-spec=${I.value}
              aria-pressed=${y.spec===I.value?"true":"false"}
            >
              ${I.label}
            </button>`)}
        ${b.spec>0?l`<span class="worker-filter__hidden">숨김 ${b.spec}</span>`:""}
      </div>
    </div>`}function nt(){return l`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${$}
    >
      ${Wd.map(u=>l`<option value=${u.value} ?selected=${$===u.value}>
            ${u.label}
          </option>`)}
    </select>`}function ze(){return l`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${g}
      >
        ${Ct.map(u=>l`<option value=${u.value} ?selected=${g===u.value}>
              ${u.label}
            </option>`)}
      </select>
    </div>`}function Ke(u){let b=u.queue.auto_merge===!0;if(u.merge_queue_running)return l`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop${b?" is-active":""}"
        title=${b?"\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB044\uACE0 \uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)":"\uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)"}
      >
        ${b?"\u23F8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8":"\uC77C\uAD04 \uBA38\uC9C0 \uC911\uB2E8"} ${u.merge_queue_length}
      </button>`;if(b)return l`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop is-active"
        title="자동 머지 켜짐 — 자격이 생기는 PR을 계속 큐에 넣습니다. 클릭하면 끕니다"
      >
        ⏸ 자동 머지
      </button>`;let I=new Set(u.auto_excluded),ee=u.pr_wait.filter(Z=>Z.merge_action&&Z.merge_enabled&&!I.has(Z.id)).length;return l`<button
      type="button"
      class="worker-merge-all"
      title=${u.verify_cmd_present?"\uCF1C \uB450\uBA74 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uCDA9\uB3CC \uD574\uC18C\xB7\uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uCF1C \uB450\uBA74 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uCDA9\uB3CC \uD574\uC18C\xB7\uBA38\uC9C0\uD569\uB2C8\uB2E4 \u2014 \uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uB294 \uAC80\uC99D \uC2E0\uD638\uAC00 \uC5C6\uC5B4 CI\xB7\uB85C\uCEEC\uAC80\uC99D \uC5C6\uC774 \uBA38\uC9C0\uB429\uB2C8\uB2E4"}
    >
      ▶ 자동 머지${ee>0?` ${ee}`:""}
    </button>`}function it(u){let b=It({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:u.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:nt(),controls:Ie(u)});return H?l`<div class="worker-lanes worker-lanes--mobile">
        ${$e(u)}
        ${It({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:u.waiting,empty:"\uB4DC\uB798\uADF8 \uB610\uB294 [\uB300\uAE30\uB85C \u21B4]\uB85C \uBC30\uCE58",collapsible:!0,collapsed:W.queue,preview:ri(u.waiting)})}
        ${b}
        ${It({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:u.done,empty:`${R()} \uC644\uB8CC \uC5C6\uC74C`,controls:ze(),collapsible:!0,collapsed:W.done,preview:u.token_total||ri(u.done)})}
      </div>`:l`<div class="worker-lanes">
      ${b}
      ${It({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:u.waiting,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58"})}
      ${It({id:"worker-pane-running",lane:"running",title:`\uC2E4\uD589 \uC911 \xB7 \uC2AC\uB86F ${u.slots}`,items:u.running,live:u.running.some(I=>!I.paused),body:vs(u.running,Date.now(),oe)})}
      ${It({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:u.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C",header_control:Ke(u)})}
      ${It({id:"worker-pane-done",lane:"done",title:`\uC644\uB8CC \xB7 ${R()} ${u.done.length}`,items:u.done,empty:`${R()} \uC644\uB8CC \uC5C6\uC74C`,controls:ze()})}
    </div>`}function lt(u){W={...W,[u]:!W[u]},Xd(W),ke()}function ke(){let u=be();Ce(pe(u),M),Ce(it(u),X)}function rt(){let u=document.querySelector(".app-header");if(!u)return;let b=()=>{let I=Math.round(u.getBoundingClientRect().height);S.style.setProperty("--worker-ribbon-top",`${I}px`)};if(b(),typeof ResizeObserver=="function"){let I=new ResizeObserver(b);I.observe(u),E.push(()=>I.disconnect())}else window.addEventListener("resize",b),E.push(()=>window.removeEventListener("resize",b))}function Qe(){if(typeof window.matchMedia!="function")return;let u=window.matchMedia(Kd);H=!!u.matches;let b=I=>{let ee=!!(I&&typeof I.matches=="boolean"?I.matches:u.matches);ee!==H&&(H=ee,ke())};typeof u.addEventListener=="function"?(u.addEventListener("change",b),E.push(()=>u.removeEventListener("change",b))):typeof u.addListener=="function"&&(u.addListener(b),E.push(()=>u.removeListener(b)))}function st(u){let b=u.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!b)return;let I=b.dataset.beadId||"",ee=b.dataset.lane||"";_={bead_id:I,from_lane:ee};try{u.dataTransfer?.setData("text/plain",I),u.dataTransfer&&(u.dataTransfer.effectAllowed="move")}catch{}}function ct(u){let b=u.target?.closest?.(".worker-pane");if(!b)return;let I=b.dataset.lane||"";I!=="candidate"&&I!=="queue"||(u.preventDefault(),u.dataTransfer&&(u.dataTransfer.dropEffect="move"),b.classList.add("worker-pane--drag-over"))}function gt(u){u.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function Be(u,b){let I=v.find(Ae=>Ae.id===u);if(!I)return;let ee=v.filter(Ae=>Ae.id!==u),Z=ee.length;if(b){let Ae=b.dataset.beadId;if(Ae===u)return;let Me=ee.findIndex(Ye=>Ye.id===Ae);Me>=0&&(Z=Me)}let me=ee.slice();me.splice(Z,0,I),f.applyReorder(u,me,Z)}function dt(u){let b=u.target?.closest?.(".worker-pane");if(!b)return;u.preventDefault(),b.classList.remove("worker-pane--drag-over");let I=b.dataset.lane||"",ee=_?.bead_id||u.dataTransfer?.getData("text/plain")||"",Z=_?.from_lane||"";if(_=null,!ee)return;let me=u.target?.closest?.(".worker-mini, .worker-card"),Ae=Array.from(b.querySelectorAll(".worker-mini, .worker-card")),Me=Ae.length;if(me){let Ye=Ae.indexOf(me);Ye>=0&&(Me=Ye)}if(b.classList.contains("worker-pane--collapsed")&&(Me=A()),I==="candidate"){if(Z==="candidate"){Be(ee,me);return}Z==="queue"&&ne(ee);return}I==="queue"&&(Z==="queue"?Q(ee,Me):T(ee,Me))}function je(u){y=u,Ud(u),ke()}function Je(u){$=u==="board"||u==="created"||u==="spec"?u:xr,jd($),ke()}function D(u){g=Ot(u)?u:wt,Vd(g),ke()}function F(u){let b=u.target?.closest?.(".worker-filter__blocked");if(b){je({...y,show_blocked:b.checked});return}let I=u.target?.closest?.(".worker-done-range");if(I){D(I.value);return}let ee=u.target?.closest?.(".worker-sort");if(ee){Je(ee.value||xr);return}let Z=u.target?.closest?.(".worker-slots__input");if(!Z)return;let me=Number.parseInt(Z.value,10);if(!Number.isFinite(me)){ke();return}ue(me).then(ke)}function re(u){return u?{runner:u.runner||void 0,model:u.model||void 0,effort:u.effort||void 0,worktree:u.worktree||void 0,status:u.status||void 0,session_id:u.session_id||void 0}:{}}function ae(u){let b=Se(),I=b.attempts?b.attempts[u]:null;oe=u,x.hidden=!1,De.open({attempt_id:u,meta:re(I)}),ke()}function le(){if(!oe)return;let u=Se(),b=u.attempts?u.attempts[oe]:null;if(b){De.updateMeta(re(b));return}De.close()}function ge(u){let b=u.target;if(b?.closest?.("#worker-exec-defaults-dialog"))return;if(b?.closest?.(".worker-exec-defaults-btn")){We.open();return}let I=b?.closest?.(".worker-banner__resume");if(I){let _e=I.dataset.attemptId;_e&&Re(_e);return}let ee=b?.closest?.(".worker-banner__dismiss");if(ee){let _e=ee.dataset.attemptId;_e&&he(_e);return}if(b?.closest?.(".worker-play")){O(!Se().auto_advance);return}if(b?.closest?.(".worker-auto-all")){let _e=Se();de(!(_e.auto_advance===!0&&_e.auto_merge===!0));return}let Z=b?.closest?.(".worker-merge-all");if(Z){Z.classList.contains("worker-merge-all--stop")?Se().auto_merge===!0?Oe(!1):at():Oe(!0);return}let me=b?.closest?.(".worker-pane__hd--toggle");if(me){let _e=me.dataset.lane;(_e==="queue"||_e==="done")&&lt(_e);return}let Ae=b?.closest?.(".worker-card__place");if(Ae){let _e=Ae.dataset.beadId;_e&&!Ae.disabled&&T(_e,A());return}let Me=b?.closest?.(".worker-filter__chip");if(Me){let _e=Me.dataset.spec;(_e==="all"||_e==="with"||_e==="without")&&je({...y,spec:_e});return}let Ye=b?.closest?.(".worker-mini__merge");if(Ye){Fe(Ye.dataset.beadId||"");return}let we=b?.closest?.(".worker-mini__merge-cancel");if(we){Ge(we.dataset.beadId||"");return}let h=b?.closest?.(".worker-mini__discard");if(h){P(h.dataset.beadId||"");return}let q=b?.closest?.(".worker-mini__revise-fix");if(q){G("worker-revise-fix",q.dataset.beadId||"");return}let B=b?.closest?.(".worker-mini__revise-approve");if(B){G("worker-revise-approve",B.dataset.beadId||"");return}if(b?.closest?.(".worker-mini__pr"))return;if(b?.closest?.(".rtile__stop")){let ve=b?.closest?.(".rtile")?.dataset?.attemptId;ve&&ce(ve);return}if(b?.closest?.(".rtile__pause")){let ve=b?.closest?.(".rtile")?.dataset?.attemptId;ve&&fe(ve);return}if(b?.closest?.(".rtile__resume")){let ve=b?.closest?.(".rtile")?.dataset?.attemptId;ve&&Re(ve);return}if(b?.closest?.(".rtile__session")){let ve=b?.closest?.(".rtile")?.dataset?.attemptId;ve&&ae(ve);return}if(b?.closest?.(".worker-drawer-overlay__backdrop")){De.close();return}if(b?.closest?.(".worker-drawer-host"))return;let K=b?.closest?.(".rtile");if(K){if(b?.closest?.(".rtile__id")){let ve=K.dataset.beadId;ve&&en(ve).then(tt=>{tt?se("\uBCF5\uC0AC\uB428","success",1200):se("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let _e=K.dataset.beadId;_e&&c&&c(_e);return}let qe=b?.closest?.(".worker-mini, .worker-card");if(qe){let _e=qe.dataset.beadId;if(b?.closest?.(".worker-mini__id, .worker-card__id")){_e&&en(_e).then(ve=>{ve?se("\uBCF5\uC0AC\uB428","success",1200):se("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}_e&&c&&c(_e)}}return e.addEventListener("dragstart",st),e.addEventListener("dragover",ct),e.addEventListener("dragleave",gt),e.addEventListener("drop",dt),e.addEventListener("click",ge),e.addEventListener("change",F),Qe(),rt(),d&&E.push(d.subscribe(ke)),s&&E.push(s.subscribe(()=>{ke(),le()})),ke(),{load(){ke()},destroy(){for(let u of E.splice(0))try{u()}catch{}e.removeEventListener("dragstart",st),e.removeEventListener("dragover",ct),e.removeEventListener("dragleave",gt),e.removeEventListener("drop",dt),e.removeEventListener("click",ge),e.removeEventListener("change",F);try{De.destroy()}catch{}x.hidden=!0;try{We.destroy()}catch{}Ce(l``,e)}}}function Rs(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function di(e,t,n,r=async()=>{},s=async()=>{}){let o=Ue("views:workspace-picker"),a=null,c=!1,i=!1,d=!1;async function f(S){let x=S.target.value,V=t.getState().workspace?.current?.path||"";if(x&&x!==V){o("switching workspace to %s",x),c=!0,E();try{await n(x)}catch(X){o("workspace switch failed: %o",X)}finally{c=!1,E()}}}async function _(){let S=t.getState(),M=S.workspace?.current?.path||S.workspace?.available?.[0]?.path||"";if(!(!M||i)){o("git-pulling workspace %s",M),i=!0,E();try{await r(M)}catch(x){o("workspace git pull failed: %o",x)}finally{i=!1,E()}}}function v(S){let M=S.target;M&&e.contains(M)||g()}function y(S){S.key==="Escape"&&g()}function $(){d||(d=!0,document.addEventListener("mousedown",v),document.addEventListener("keydown",y),E())}function g(){d&&(d=!1,document.removeEventListener("mousedown",v),document.removeEventListener("keydown",y),E())}function R(){d?g():$()}async function W(S){let M=S.target,x=M.value,j=M.checked;o("toggling visibility %s \u2192 %s",x,String(j));try{await s(x,j)}catch(V){o("workspace visibility toggle failed: %o",V)}}function H(S){return S?l`
      <button
        type="button"
        class="workspace-picker__git-pull-button"
        @click=${_}
        ?disabled=${c||i}
        aria-label="Git Pull"
        title="Git Pull"
      >
        <span aria-hidden="true">⬇</span>
      </button>
    `:l``}function Y(S,M){return l`
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
        ${d?l`
              <div
                class="workspace-picker__manage-popover"
                role="menu"
                aria-label="프로젝트 표시 선택"
              >
                ${S.map(x=>l`
                    <label
                      class="workspace-picker__manage-row"
                      title="${x.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${x.path}"
                        .checked=${!M.has(x.path)}
                        @change=${W}
                      />
                      <span class="workspace-picker__manage-name"
                        >${Rs(x.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function N(){let S=t.getState(),M=S.workspace?.current,x=S.workspace?.available||[],j=new Set(S.workspace?.hidden||[]),V=M?.path||x[0]?.path||"";if(x.length===0)return l``;let X=x.filter(oe=>!j.has(oe.path)||oe.path===V);if(X.length<=1){let oe=X[0]||x[0],De=Rs(oe.path);return l`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${oe.path}"
            >${De}</span
          >
          ${Y(x,j)}
          ${H(V)}
          ${i?l`<span
                class="workspace-picker__loading"
                aria-hidden="true"
              ></span>`:""}
        </div>
      `}return l`
      <div class="workspace-picker">
        <select
          class="workspace-picker__select"
          @change=${f}
          ?disabled=${c||i}
          aria-label="Select project workspace"
        >
          ${X.map(oe=>l`
              <option
                value="${oe.path}"
                ?selected=${oe.path===V}
                title="${oe.path}"
              >
                ${Rs(oe.path)}
              </option>
            `)}
        </select>
        ${Y(x,j)}
        ${H(V)}
        ${c||i?l`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function E(){Ce(N(),e)}return E(),a=t.subscribe(()=>E()),{destroy(){a&&(a(),a=null),document.removeEventListener("mousedown",v),document.removeEventListener("keydown",y),Ce(l``,e)}}}var ui=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-queue-set-slots","worker-queue-set-exec-default","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","monitor-auto-toggle"];function Is(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function pi(e,t,n=Is()){return{id:n,type:e,payload:t}}function fi(e={}){let t=Ue("ws"),n={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},r=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",a=0,c=null,i=!0,d=new Map,f=[],_=new Map,v=new Set;function y(N){for(let E of Array.from(v))try{E(N)}catch{}}function $(){if(!i||c)return;o="reconnecting",t("ws reconnecting\u2026"),y(o);let N=Math.min(n.maxMs||0,(n.initialMs||0)*Math.pow(n.factor||1,a)),E=(n.jitterRatio||0)*N,S=Math.max(0,Math.round(N+(Math.random()*2-1)*E));t("ws retry in %d ms (attempt %d)",S,a+1),c=setTimeout(()=>{c=null,Y()},S)}function g(N){try{s?.send(JSON.stringify(N))}catch(E){t("ws send failed",E)}}function R(){for(o="open",t("ws open"),y(o),a=0;f.length;){let N=f.shift();N&&g(N)}}function W(N){let E;try{E=JSON.parse(String(N.data))}catch{t("ws received non-JSON message");return}if(!E||typeof E.id!="string"||typeof E.type!="string"){t("ws received invalid envelope");return}if(d.has(E.id)){let M=d.get(E.id);d.delete(E.id),E.ok?M?.resolve(E.payload):M?.reject(E.error||new Error("ws error"));return}let S=_.get(E.type);if(S&&S.size>0)for(let M of Array.from(S))try{M(E.payload)}catch(x){t("ws event handler error",x)}else t("ws received unhandled message type: %s",E.type)}function H(){o="closed",t("ws closed"),y(o);for(let[N,E]of d.entries())E.reject(new Error("ws disconnected")),d.delete(N);a+=1,$()}function Y(){if(!i)return;let N=r();try{s=new WebSocket(N),t("ws connecting %s",N),o="connecting",y(o),s.addEventListener("open",R),s.addEventListener("message",W),s.addEventListener("error",()=>{}),s.addEventListener("close",H)}catch(E){t("ws connect failed %o",E),$()}}return Y(),{send(N,E){if(!ui.includes(N))return Promise.reject(new Error(`unknown message type: ${N}`));let S=Is(),M=pi(N,E,S);return t("send %s id=%s",N,S),new Promise((x,j)=>{d.set(S,{resolve:x,reject:j,type:N}),s&&s.readyState===s.OPEN?g(M):(t("queue %s id=%s (state=%s)",N,S,o),f.push(M))})},on(N,E){_.has(N)||_.set(N,new Set);let S=_.get(N);return S?.add(E),()=>{S?.delete(E)}},onConnection(N){return v.add(N),()=>{v.delete(N)}},reconnect(){i=!0,c&&(clearTimeout(c),c=null),a=0,Y()},close(){i=!1,c&&(clearTimeout(c),c=null);try{s?.close()}catch{}},getState(){return o}}}function iu(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function lu(e,t){try{let r=await(await fetch("/api/config")).json();e.setState({config:r})}catch(n){t("config refresh failed",n)}}var Ls=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],_i=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"]],hi=Za,mi="worker:queue",gi="ui:order",bi="ui:display-policy",Gt="tab:board:closed",vi="beads-ui.board.closed-range";function cu(e){let t=Ue("main");t("bootstrap start");let n=l`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;Ce(n,e);let r=document.getElementById("top-nav"),s=document.getElementById("board-root"),o=document.getElementById("worker-root"),a=document.getElementById("monitor-root"),c=document.getElementById("detail-panel");if(s&&o&&a&&c){let Se=function(m,w){let L="Request failed",p="";if(m&&typeof m=="object"){let U=m;if(typeof U.message=="string"&&U.message.length>0&&(L=U.message),typeof U.details=="string")p=U.details;else if(U.details&&typeof U.details=="object")try{p=JSON.stringify(U.details,null,2)}catch{p=""}}else typeof m=="string"&&m.length>0&&(L=m);let C=w&&w.length>0?`Failed to load ${w}`:"Request failed";We.open(C,L,p)},O=function(m){return`${h.getState().workspace.current?.path||""}\0${m}`},de=function(){he&&(he().catch(()=>{}),he=null),Ee=null,Fe=null},be=function(m){Oe=m;let w=()=>{Oe!==m||h.getState().selected_id!==m||(Oe=null,ue(m))};if(!P){at.then(w);return}w()},nt=function(m,w,L,p,C){return L!==Ie[w]?(C().catch(()=>{}),!1):(m.set(p,C),!0)},ze=function(){let m=h.getState().view;lt(m==="board"),ct(m==="worker"),Je(m==="monitor"),Be(m==="worker")},it=function(){let m=cn(Ke);return m===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:m}}},lt=function(m){if(m)for(let[w,L]of Ls){if(pe.has(w)||$e.has(w))continue;let p=w===Gt?it():{type:L};try{T.register(w,p)}catch(xe){t("register %s store failed: %o",w,xe)}$e.add(w);let C=Ie.board,U=!1;A.subscribeList(w,p).then(xe=>{U=!nt(pe,"board",C,w,xe)}).catch(xe=>{t("subscribe %s failed: %o",w,xe),Se(xe,"board")}).finally(()=>{$e.delete(w),U&&ze()})}else rt()},rt=function(){Ie.board+=1;for(let[m]of Ls){let w=pe.get(m);w&&(w().catch(()=>{}),pe.delete(m));try{T.unregister(m)}catch(L){t("unregister %s failed: %o",m,L)}}},ct=function(m){if(!m){gt();return}for(let[w,L]of _i){if(Qe.has(w)||$e.has(w))continue;try{T.register(w,{type:L})}catch(U){t("register %s store failed: %o",w,U)}$e.add(w);let p=Ie.worker,C=!1;A.subscribeList(w,{type:L}).then(U=>{C=!nt(Qe,"worker",p,w,U)}).catch(U=>{t("subscribe %s failed: %o",w,U),Se(U,"worker")}).finally(()=>{$e.delete(w),C&&ze()})}},gt=function(){Ie.worker+=1;for(let[m]of _i){let w=Qe.get(m);w&&(w().catch(()=>{}),Qe.delete(m));try{T.unregister(m)}catch(L){t("unregister %s failed: %o",m,L)}}},Be=function(m){if(!m){dt();return}st||(te("subscribe-worker-queue",{id:mi}).catch(w=>{t("subscribe-worker-queue failed: %o",w)}),st=()=>te("unsubscribe-worker-queue",{id:mi}))},dt=function(){st&&(st().catch(()=>{}),st=null)},Je=function(m){if(!m){D();return}je||(te("subscribe-monitor-pipeline",{id:hi}).catch(w=>{t("subscribe-monitor-pipeline failed: %o",w)}),je=()=>te("unsubscribe-monitor-pipeline",{id:hi}))},D=function(){je&&(je().catch(()=>{}),je=null)},re=function(){F||(te("subscribe-ui-order",{id:gi}).catch(m=>{t("subscribe-ui-order failed: %o",m)}),F=()=>te("unsubscribe-ui-order",{id:gi}))},ae=function(){F&&(F().catch(()=>{}),F=null),ce.clear()},ge=function(){le||(te("subscribe-display-policy",{id:bi}).catch(m=>{t("subscribe-display-policy failed: %o",m)}),le=()=>te("unsubscribe-display-policy",{id:bi}))},u=function(){le&&(le().catch(()=>{}),le=null),fe.clear()},Ae=function(m){if(!m)return"Unknown";let w=m.split("/").filter(Boolean);return w.length>0?w[w.length-1]:"Unknown"};var i=Se,d=O,f=de,_=be,v=nt,y=ze,$=it,g=lt,R=rt,W=ct,H=gt,Y=Be,N=dt,E=Je,S=D,M=re,x=ae,j=ge,V=u,X=Ae;let oe=document.getElementById("header-loading"),De=So(oe),We=Ra(e),J=fi(),te=De.wrapSend((m,w)=>J.send(m,w)),A=bo(te),T=vo(),Q=ko(),ne=no(),ce=wo(),fe=to(),Re=ro();J.on("monitor-pipeline-snapshot",m=>{let w=m;if(!(!w||!Array.isArray(w.workspaces)))try{ne.set(w.workspaces,w.workspaces_state)}catch{}}),J.on("ui-order-snapshot",m=>{let w=m;if(w&&typeof w.revision=="number")try{ce.set({revision:w.revision,order:w.order&&typeof w.order=="object"?w.order:{}})}catch{}}),J.on("display-policy-snapshot",m=>{let w=m;if(w&&w.policy&&typeof w.policy=="object")try{fe.set(w.policy)}catch{}}),J.on("session-log-snapshot",m=>{let w=m;if(w&&typeof w.attempt_id=="string")try{Re.set(w.attempt_id,Array.isArray(w.lines)?w.lines:[],typeof w.last_event_at=="number"?w.last_event_at:null)}catch{}}),J.on("session-log-append",m=>{let w=m;if(w&&typeof w.attempt_id=="string")try{Re.append(w.attempt_id,w.event)}catch{}}),J.on("snapshot",m=>{let w=m,L=w&&typeof w.id=="string"?w.id:"",p=L?T.getStore(L):null;if(p&&w&&w.type==="snapshot")try{p.applyPush(w)}catch{}}),J.on("upsert",m=>{let w=m,L=w&&typeof w.id=="string"?w.id:"",p=L?T.getStore(L):null;if(p&&w&&w.type==="upsert")try{p.applyPush(w)}catch{}}),J.on("delete",m=>{let w=m,L=w&&typeof w.id=="string"?w.id:"",p=L?T.getStore(L):null;if(p&&w&&w.type==="delete")try{p.applyPush(w)}catch{}});let he=null,Ee=null,Fe=null,Oe=null,Ge=()=>{},at=new Promise(m=>{Ge=()=>m(void 0)}),P=!1,G=!1;async function ue(m){let w=O(m);if(w===Ee||w===Fe)return;Fe=w;let L=`detail:${m}`,p={type:"issue-detail",params:{id:m}};try{T.register(L,p)}catch(C){t("register detail store failed: %o",C)}try{let C=await A.subscribeList(L,p);if(h.getState().selected_id!==m||O(m)!==w){await C().catch(()=>{});return}he&&await he().catch(()=>{}),he=C,Ee=w}catch(C){t("detail subscribe failed: %o",C),Se(C,"issue details")}finally{Fe===w&&(Fe=null)}}let pe=new Map,$e=new Set,Ie={board:0,worker:0},Ke=wt;try{let m=window.localStorage.getItem(vi);Ot(m)&&(Ke=m)}catch{}async function ke(m){if(!Ot(m)||m===Ke)return;Ke=m;try{window.localStorage.setItem(vi,m)}catch{}let w=pe.get(Gt);if(!w)return;pe.delete(Gt),await w().catch(()=>{});let L=it();try{T.register(Gt,L)}catch(p){t("register %s store failed: %o",Gt,p)}try{let p=await A.subscribeList(Gt,L);pe.set(Gt,p)}catch(p){t("re-subscribe %s failed: %o",Gt,p),Se(p,"board")}}let Qe=new Map,st=null,je=null,F=null,le=null;async function b(){le=null,fe.clear(),st=null,je=null,pe.clear(),Qe.clear(),Ie.board+=1,Ie.worker+=1;let m=h.getState().workspace.current?.path;if(m)try{await J.send("set-workspace",{path:m})}catch(L){t("workspace restore after reconnect failed: %o",L);return}ge();let w=h.getState().view;lt(w==="board"),ct(w==="worker"),Je(w==="monitor"),Be(w==="worker")}async function I(){t("clearing all subscriptions for workspace switch"),rt(),gt(),dt(),Q.clear(),ae(),re(),u(),ge(),de();let m=h.getState();if(m.selected_id)try{T.unregister(`detail:${m.selected_id}`)}catch{}let w=h.getState();lt(w.view==="board"),ct(w.view==="worker"),Je(w.view==="monitor"),Be(w.view==="worker"),w.selected_id&&be(w.selected_id)}async function ee(m){t("requesting workspace switch to %s",m),G=!0;try{let w=await J.send("set-workspace",{path:m});t("workspace switch result: %o",w),w&&w.workspace&&(h.setState({workspace:{current:{path:w.workspace.root_dir,database:w.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",m),w.changed&&(await I(),se("Switched to "+Ae(m),"success",2e3)))}catch(w){throw t("workspace switch failed: %o",w),se("Failed to switch workspace","error",3e3),w}finally{G=!1}}async function Z(m){t("requesting workspace git pull for %s",m);try{let w=await J.send("git-pull-workspace",{});t("workspace git pull result: %o",w);let L=w?.status;if(L==="up_to_date"){se("Already up to date","success",2e3);return}if(L==="stash_pop_conflict"){se("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}se("Git pulled "+Ae(m),"success",2e3)}catch(w){t("workspace git pull failed: %o",w);let L=w?.code,p=w?.message;if(L==="rebase_conflict"){se("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(L==="rebase_conflict_abort_failed"){se("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(L==="busy"){se("Git pull skipped: another operation is running","warning",3e3);return}let C=p?`: ${p}`:"";throw se(`Git pull failed${C}`,"error",3e3),w}}async function me(m,w){t("setting workspace visibility %s \u2192 %s",m,String(w));try{await J.send("set-workspace-visibility",{path:m,visible:w}),await Me()}catch(L){t("workspace visibility update failed: %o",L),se("Failed to update project visibility","error",3e3)}}async function Me(){try{let m=await J.send("list-workspaces",{});if(t("workspaces loaded: %o",m),m&&Array.isArray(m.workspaces)){let w=m.workspaces.map(U=>({path:U.path,database:U.database,pid:U.pid,version:U.version})),L=m.current?{path:m.current.root_dir,database:m.current.db_path}:null,p=Array.isArray(m.hidden)?m.hidden.filter(U=>typeof U=="string"):[];h.setState({workspace:{current:L,available:w,hidden:p}});let C=window.localStorage.getItem("beads-ui.workspace");C&&(!w.some(xe=>xe.path===C)||p.includes(C)?window.localStorage.removeItem("beads-ui.workspace"):L&&C!==L.path&&(t("restoring saved workspace preference: %s",C),await ee(C)))}}catch(m){t("failed to load workspaces: %o",m)}}J.on("workspace-changed",m=>{t("workspace-changed event: %o",m),m&&m.root_dir&&(h.setState({workspace:{current:{path:m.root_dir,database:m.db_path}}}),Me(),I())});let Ye=!1;if(typeof J.onConnection=="function"){let m=w=>{t("ws state %s",w),w==="reconnecting"||w==="closed"?(Ye=!0,se("Connection lost. Reconnecting\u2026","error",4e3)):w==="open"&&Ye&&(Ye=!1,se("Reconnected","success",2200),lu(h,(L,p)=>{t(`${L}: %o`,p)}),b())};J.onConnection(m)}let we="board";try{let m=window.localStorage.getItem("beads-ui.view");(m==="board"||m==="worker"||m==="monitor")&&(we=m)}catch(m){t("view parse error: %o",m)}let h=xo({config:iu(),view:we});J.on("worker-queue-snapshot",m=>{let w=m;if(!w||!w.queue)return;let L=h.getState().workspace.current?.path;if(typeof L=="string"&&L.length>0&&w.root_dir!==L){t("dropping worker-queue snapshot for %s",String(w.root_dir));return}try{Q.set(w.queue)}catch{}});let q=yo(h);q.start();let B=new Set(["get-comments"]),K=async(m,w)=>{try{return await te(m,w)}catch(L){if(B.has(m))throw L;return[]}};r&&Qa(r,h,q);let qe=document.getElementById("workspace-picker");qe&&di(qe,h,ee,Z,me);let _e=ni(e,(m,w)=>te(m,w));try{let m=document.getElementById("new-issue-btn");m&&m.addEventListener("click",()=>_e.open())}catch{}let ve=Ca(e,{policyStore:fe,transport:(m,w)=>te(m,w),labelOptions:()=>{let m=new Set;for(let[w]of Ls)for(let L of T.snapshotFor(w)||[]){let p=L.labels;if(Array.isArray(p))for(let C of p)typeof C=="string"&&C.length>0&&m.add(C)}return Array.from(m).sort()}});try{let m=document.getElementById("display-settings-btn");m&&m.addEventListener("click",()=>ve.open())}catch{}let tt=Lo(s,{gotoIssue:m=>q.gotoIssue(m),issueStores:T,transport:K,uiOrderStore:ce,displayPolicyStore:fe,closedRange:Ke,onClosedRangeChange:m=>{ke(m)},onNewIssue:()=>_e.open()}),jt=Cs(o,{transport:K,issueStores:T,queueStore:Q,sessionLogStore:Re,uiOrderStore:ce,gotoIssue:m=>h.setState({selected_id:m}),getWorkspacePath:()=>h.getState().workspace.current?.path}),ht=Xa(a,{transport:K,pipelineStore:ne,gotoIssue:m=>q.gotoIssue(m),getWorkspacePath:()=>h.getState().workspace.current?.path,switchWorkspace:m=>ee(m)}),Ft=Ta(c,{issueStores:T,transport:K,queueStore:Q,sessionLogStore:Re,getWorkspacePath:()=>h.getState().workspace.current?.path,onNavigate:m=>{h.getState().view==="worker"?h.setState({selected_id:m}):q.gotoIssue(m)},onClose:()=>{let m=h.getState();h.setState({selected_id:null});try{q.gotoView(m.view==="worker"||m.view==="monitor"?m.view:"board")}catch{}}}),qt=h.getState().selected_id;qt&&(c.hidden=!1,Ft.load(qt),be(qt)),h.subscribe(m=>{let w=m.selected_id;w?(c.hidden=!1,Ft.load(w),G||be(w)):(Ft.clear(),c.hidden=!0,de())});let Bt=m=>{s.hidden=m.view!=="board",o.hidden=m.view!=="worker",a.hidden=m.view!=="monitor",lt(m.view==="board"),ct(m.view==="worker"),Je(m.view==="monitor"),Be(m.view==="worker"),!m.selected_id&&m.view==="board"&&tt.load(),m.view==="worker"&&jt.load(),m.view==="monitor"?ht.load():ht.pause(),window.localStorage.setItem("beads-ui.view",m.view)};h.subscribe(Bt),Bt(h.getState()),re(),ge(),Me().finally(()=>{P=!0,Ge()}),window.addEventListener("keydown",m=>{let w=m.ctrlKey||m.metaKey,L=String(m.key||"").toLowerCase(),p=m.target,C=p&&p.tagName?String(p.tagName).toLowerCase():"",U=C==="input"||C==="textarea"||C==="select"||p&&typeof p.isContentEditable=="boolean"&&p.isContentEditable;w&&L==="n"&&(U||(m.preventDefault(),_e.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let n=window.localStorage.getItem("beads-ui.theme"),r=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=n==="dark"||n==="light"?n:r?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let n=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",n),window.localStorage.setItem("beads-ui.theme",n)});let t=document.getElementById("app");t&&cu(t)});export{cu as bootstrap,iu as readBootstrapConfig,lu as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
